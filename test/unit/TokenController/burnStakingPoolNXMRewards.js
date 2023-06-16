const { ethers } = require('hardhat');
const { expect } = require('chai');
const { setEtherBalance } = require('../../utils/evm');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const setup = require('./setup');

const { AddressZero } = ethers.constants;
const { parseEther } = ethers.utils;

describe('burnStakingPoolNXMRewards', function () {
  let fixture;
  beforeEach(async function () {
    fixture = await loadFixture(setup);
    const { stakingPoolFactory, tokenController } = fixture.contracts;

    const createPoolTx = await stakingPoolFactory.create(AddressZero);
    const { events } = await createPoolTx.wait();
    const { poolId, stakingPoolAddress } = events[0].args;

    fixture.poolId = poolId;
    fixture.poolSigner = await ethers.getImpersonatedSigner(stakingPoolAddress);
    await setEtherBalance(stakingPoolAddress, parseEther('1'));

    const amount = parseEther('100');
    await tokenController.connect(fixture.poolSigner).mintStakingPoolNXMRewards(amount, fixture.poolId);
  });

  it('reverts if caller is not pool contract', async function () {
    const { tokenController } = fixture.contracts;

    const amount = parseEther('10');
    await expect(tokenController.burnStakingPoolNXMRewards(amount, fixture.poolId)).to.be.revertedWith(
      'TokenController: Caller not a staking pool',
    );
  });

  it('reduces staking pool rewards', async function () {
    const { tokenController } = fixture.contracts;

    const initialStakingPoolNXMBalances = await tokenController.stakingPoolNXMBalances(fixture.poolId);

    const amount = parseEther('10');
    await tokenController.connect(fixture.poolSigner).burnStakingPoolNXMRewards(amount, fixture.poolId);

    const stakingPoolNXMBalances = await tokenController.stakingPoolNXMBalances(fixture.poolId);
    expect(stakingPoolNXMBalances.rewards).to.equal(initialStakingPoolNXMBalances.rewards.sub(amount));
    expect(stakingPoolNXMBalances.deposits).to.equal(initialStakingPoolNXMBalances.deposits);
  });

  it('burns nxm from the contract', async function () {
    const { tokenController, nxm } = fixture.contracts;

    const initialTcBalance = await nxm.balanceOf(tokenController.address);
    const initialTotalSupply = await nxm.totalSupply();

    const amount = parseEther('10');
    await tokenController.connect(fixture.poolSigner).burnStakingPoolNXMRewards(amount, fixture.poolId);

    const tcBalance = await nxm.balanceOf(tokenController.address);
    const totalSupply = await nxm.totalSupply();

    expect(tcBalance).to.equal(initialTcBalance.sub(amount));
    expect(totalSupply).to.equal(initialTotalSupply.sub(amount));
  });
});
