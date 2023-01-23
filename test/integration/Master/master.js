const { ethers } = require('hardhat');
const { assert, expect } = require('chai');
const { ProposalCategory, ContractTypes } = require('../utils').constants;
const { submitProposal } = require('../utils').governance;
const { hex } = require('../utils').helpers;
const { parseEther, defaultAbiCoder } = ethers.utils;
const { AddressZero } = ethers.constants;

async function assertNewAddresses(master, contractCodes, newAddresses, contractType) {
  for (let i = 0; i < contractCodes.length; i++) {
    const code = contractCodes[i];
    const expectedAddress = newAddresses[i];
    if (contractType(code) === ContractTypes.Replaceable) {
      const address = await master.getLatestAddress(hex(code));
      assert.equal(address, expectedAddress);
    } else {
      const proxyAddress = await master.getLatestAddress(hex(code));
      const proxy = await ethers.getContractAt('OwnedUpgradeabilityProxy', proxyAddress);
      const implementation = await proxy.implementation();
      assert.equal(
        implementation,
        expectedAddress,
        `Expected address ${expectedAddress} for ${code} does not match ${implementation}`,
      );
    }
  }
}

describe('master', function () {
  it('adds new replaceable contract which can execute internal functions', async function () {
    const { master, gv } = this.contracts;

    const code = hex('XX');

    const MMockNewContract = await ethers.getContractFactory('MMockNewContract');
    const newContract = await MMockNewContract.deploy();

    const actionData = defaultAbiCoder.encode(
      ['bytes2[]', 'address[]', 'uint[]'],
      [[code], [newContract.address], [ContractTypes.Replaceable]],
    );

    await submitProposal(gv, ProposalCategory.newContracts, actionData, [this.accounts.defaultSender]);

    const address = await master.getLatestAddress(code);
    assert.equal(address, newContract.address);

    // can perform onlyInternal action
    await newContract.mint(this.accounts.defaultSender.address, parseEther('1'));
  });

  it('adds new proxy contract which can execute internal functions', async function () {
    const { master, gv } = this.contracts;

    const MMockNewContract = await ethers.getContractFactory('MMockNewContract');
    const newContract = await MMockNewContract.deploy();

    const code = hex('XX');
    const actionData = defaultAbiCoder.encode(
      ['bytes2[]', 'address[]', 'uint[]'],
      [[code], [newContract.address], [ContractTypes.Proxy]],
    );
    await submitProposal(gv, ProposalCategory.newContracts, actionData, [this.accounts.defaultSender]);

    const address = await master.getLatestAddress(code);
    const proxy = await ethers.getContractAt('OwnedUpgradeabilityProxy', address);
    const implementation = await proxy.implementation();
    assert.equal(implementation, newContract.address);

    const newContractInstance = await ethers.getContractAt('MMockNewContract', address);
    // can perform onlyInternal action
    await newContractInstance.mint(this.accounts.defaultSender.address, parseEther('1'));
  });

  it('replace contract', async function () {
    const { master, gv } = this.contracts;
    const owner = this.accounts.defaultSender;

    const code = hex('MC');
    const MCR = await ethers.getContractFactory('MCR');
    const newMCR = await MCR.deploy(master.address);

    const contractCodes = [code];
    const newAddresses = [newMCR.address];

    const upgradeContractsData = defaultAbiCoder.encode(['bytes2[]', 'address[]'], [contractCodes, newAddresses]);

    await submitProposal(gv, ProposalCategory.upgradeMultipleContracts, upgradeContractsData, [owner]);

    const address = await master.getLatestAddress(code);
    assert.equal(address, newMCR.address);
  });

  it('upgrade proxy contract', async function () {
    const { master, gv, qd, lcr, spf } = this.contracts;
    const owner = this.accounts.defaultSender;

    const code = hex('TC');
    const TokenController = await ethers.getContractFactory('TokenController');
    const newTokenControllerImplementation = await TokenController.deploy(qd.address, lcr.address, spf.address);

    const contractCodes = [code];
    const newAddresses = [newTokenControllerImplementation.address];

    const upgradeContractsData = defaultAbiCoder.encode(['bytes2[]', 'address[]'], [contractCodes, newAddresses]);

    await submitProposal(gv, ProposalCategory.upgradeMultipleContracts, upgradeContractsData, [owner]);

    const address = await master.getLatestAddress(code);

    const proxy = await ethers.getContractAt('OwnedUpgradeabilityProxy', address);
    const implementation = await proxy.implementation();
    assert.equal(implementation, newTokenControllerImplementation.address);
  });

  it('upgrade proxies and replaceables', async function () {
    const { master, gv, qd, lcr, spf } = this.contracts;
    const owner = this.accounts.defaultSender;

    const mcrCode = hex('MC');
    const tcCode = hex('TC');

    const MCR = await ethers.getContractFactory('MCR');
    const newMCR = await MCR.deploy(master.address);
    const TokenController = await ethers.getContractFactory('TokenController');
    const newTokenControllerImplementation = await TokenController.deploy(qd.address, lcr.address, spf.address);

    const contractCodes = [mcrCode, tcCode];
    const newAddresses = [newMCR.address, newTokenControllerImplementation.address];

    const upgradeContractsData = defaultAbiCoder.encode(['bytes2[]', 'address[]'], [contractCodes, newAddresses]);

    await submitProposal(gv, ProposalCategory.upgradeMultipleContracts, upgradeContractsData, [owner]);

    const tcAddress = await master.getLatestAddress(tcCode);
    const proxy = await ethers.getContractAt('OwnedUpgradeabilityProxy', tcAddress);
    const implementation = await proxy.implementation();
    assert.equal(implementation, newTokenControllerImplementation.address);

    const address = await master.getLatestAddress(mcrCode);
    assert.equal(address, newMCR.address);
  });

  it('upgrades master', async function () {
    const { master, gv } = this.contracts;
    const owner = this.accounts.defaultSender;

    const NXMaster = await ethers.getContractFactory('NXMaster');
    const newMaster = await NXMaster.deploy();

    const upgradeContractsData = defaultAbiCoder.encode(['address'], [newMaster.address]);

    await submitProposal(gv, ProposalCategory.upgradeMaster, upgradeContractsData, [owner]);

    const proxy = await ethers.getContractAt('OwnedUpgradeabilityProxy', master.address);
    const implementation = await proxy.implementation();
    assert.equal(implementation, newMaster.address);
  });

  it('upgrades all contracts', async function () {
    const { master, gv, dai, priceFeedOracle, p1, tk, qd, lcr, spf, cover, productsV1, coverNFT } = this.contracts;
    const owner = this.accounts.defaultSender;

    const TokenController = await ethers.getContractFactory('TokenController');
    const CoverMigrator = await ethers.getContractFactory('CoverMigrator');
    const LegacyClaimsReward = await ethers.getContractFactory('LegacyClaimsReward');
    const MCR = await ethers.getContractFactory('MCR');
    const Pool = await ethers.getContractFactory('Pool');
    const Governance = await ethers.getContractFactory('Governance');
    const ProposalCategoryContract = await ethers.getContractFactory('ProposalCategory');
    const MemberRoles = await ethers.getContractFactory('MemberRoles');
    const LegacyGateway = await ethers.getContractFactory('LegacyGateway');
    const IndividualClaims = await ethers.getContractFactory('IndividualClaims');
    const LegacyPooledStaking = await ethers.getContractFactory('LegacyPooledStaking');

    const pool = await Pool.deploy(master.address, priceFeedOracle.address, AddressZero, dai.address, AddressZero);

    const contractCodes = ['TC', 'CL', 'CR', 'P1', 'MC', 'GV', 'PC', 'MR', 'PS', 'GW', 'IC'];
    const newAddresses = [
      await TokenController.deploy(qd.address, lcr.address, spf.address),
      await CoverMigrator.deploy(qd.address, productsV1.address),
      await LegacyClaimsReward.deploy(master.address, dai.address),
      pool,
      await MCR.deploy(master.address),
      await Governance.deploy(),
      await ProposalCategoryContract.deploy(),
      await MemberRoles.deploy(),
      await LegacyPooledStaking.deploy(cover.address, productsV1.address),
      await LegacyGateway.deploy(),
      await IndividualClaims.deploy(tk.address, coverNFT.address),
    ].map(c => {
      return c.address;
    });

    const upgradeContractsData = defaultAbiCoder.encode(
      ['bytes2[]', 'address[]'],
      [contractCodes.map(code => hex(code)), newAddresses],
    );

    const poolEthBalanceBefore = await ethers.provider.getBalance(p1.address);
    const poolDaiBalanceBefore = await dai.balanceOf(p1.address);

    // store tokens in ClaimsReward
    await tk.connect(owner).transfer(lcr.address, parseEther('10'));

    const claimsRewardNXMBalanceBefore = await tk.balanceOf(lcr.address);

    await submitProposal(gv, ProposalCategory.upgradeMultipleContracts, upgradeContractsData, [owner]);

    await assertNewAddresses(master, contractCodes, newAddresses, this.contractType);

    const newPoolAddress = await master.getLatestAddress(hex('P1'));

    const poolEthBalanceAfter = await ethers.provider.getBalance(newPoolAddress);
    const poolDaiBalanceAfter = await dai.balanceOf(newPoolAddress);

    expect(poolEthBalanceBefore).to.be.equal(poolEthBalanceAfter);
    expect(poolDaiBalanceBefore).to.be.equal(poolDaiBalanceAfter);

    const claimsRewardNXMBalanceAfter = await tk.balanceOf(await master.getLatestAddress(hex('CR')));
    expect(claimsRewardNXMBalanceAfter).to.be.equal(claimsRewardNXMBalanceBefore);
  });

  it('upgrades Governance, TokenController and MemberRoles 2 times in a row', async function () {
    const { master, gv, qd, lcr, spf } = this.contracts;
    const owner = this.accounts.defaultSender;

    const TokenController = await ethers.getContractFactory('TokenController');
    const MemberRoles = await ethers.getContractFactory('MemberRoles');
    const Governance = await ethers.getContractFactory('Governance');

    {
      const contractCodes = ['TC', 'GV', 'MR'];
      const newAddresses = [
        await TokenController.deploy(qd.address, lcr.address, spf.address),
        await Governance.deploy(),
        await MemberRoles.deploy(),
      ].map(c => c.address);

      const upgradeContractsData = defaultAbiCoder.encode(
        ['bytes2[]', 'address[]'],
        [contractCodes.map(code => hex(code)), newAddresses],
      );

      await submitProposal(gv, ProposalCategory.upgradeMultipleContracts, upgradeContractsData, [owner]);
      await assertNewAddresses(master, contractCodes, newAddresses, this.contractType);
    }

    {
      const contractCodes = ['TC', 'GV', 'MR'];
      const newAddresses = [
        await TokenController.deploy(qd.address, lcr.address, spf.address),
        await Governance.deploy(),
        await MemberRoles.deploy(),
      ].map(c => c.address);

      const upgradeContractsData = defaultAbiCoder.encode(
        ['bytes2[]', 'address[]'],
        [contractCodes.map(code => hex(code)), newAddresses],
      );

      await submitProposal(gv, ProposalCategory.upgradeMultipleContracts, upgradeContractsData, [owner]);
      await assertNewAddresses(master, contractCodes, newAddresses, this.contractType);
    }
  });

  it('removes newly added replaceable contract and existing contract', async function () {
    const { master, gv } = this.contracts;
    const owner = this.accounts.defaultSender;

    const code = hex('RE');
    const existingCode = hex('GW');
    const MMockNewContract = await ethers.getContractFactory('MMockNewContract');
    const newContract = await MMockNewContract.deploy();
    const actionData = defaultAbiCoder.encode(
      ['bytes2[]', 'address[]', 'uint[]'],
      [[code], [newContract.address], [ContractTypes.Replaceable]],
    );
    await submitProposal(gv, ProposalCategory.newContracts, actionData, [owner]);

    const address = await master.getLatestAddress(code);
    assert.equal(address, newContract.address);

    const actionDataRemove = defaultAbiCoder.encode(['bytes2[]'], [[code, existingCode]]);
    await submitProposal(gv, ProposalCategory.removeContracts, actionDataRemove, [owner]);

    {
      const addressAfterDeletion = await master.getLatestAddress(code);
      assert.equal(addressAfterDeletion, AddressZero);
      const isInternal = await master.isInternal(newContract.address);
      assert.equal(isInternal, false);
    }

    {
      const addressAfterDeletion = await master.getLatestAddress(existingCode);
      assert.equal(addressAfterDeletion, AddressZero);
      const isInternal = await master.isInternal(newContract.address);
      assert.equal(isInternal, false);
    }
  });
});
