const { ethers } = require('hardhat');
const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const setup = require('./setup');
const {
  utils: { parseEther },
} = ethers;

describe('recoverAsset', function () {
  let fixture;
  beforeEach(async function () {
    fixture = await loadFixture(setup);
  });

  it('recovers enzyme vault shares', async function () {
    const { swapOperator, enzymeV4Vault, pool } = fixture.contracts;

    const [governance] = fixture.accounts.governanceAccounts;
    const [receiver] = fixture.accounts.nonMembers;

    await pool.connect(governance).setSwapDetails(
      enzymeV4Vault.address,
      parseEther('100'), // asset minimum
      parseEther('1000'), // asset maximum
      '100', // 1% max slippage
    );

    const amountInPool = parseEther('2000');
    await enzymeV4Vault.mint(pool.address, amountInPool);

    const amountInSwapOperator = parseEther('10');
    await enzymeV4Vault.mint(swapOperator.address, amountInSwapOperator);

    await swapOperator.recoverAsset(enzymeV4Vault.address, receiver.address);

    const balanceAfter = await enzymeV4Vault.balanceOf(pool.address);

    expect(balanceAfter.sub(amountInPool)).to.be.equal(amountInSwapOperator);
  });

  it('recovers arbitrary unknown asset', async function () {
    const { swapOperator } = fixture.contracts;

    const [receiver] = fixture.accounts.nonMembers;

    const ERC20Mock = await ethers.getContractFactory('ERC20Mock');
    const arbitraryAsset = await ERC20Mock.deploy();

    const amountInSwapOperator = parseEther('10');
    await arbitraryAsset.mint(swapOperator.address, amountInSwapOperator);

    await swapOperator.recoverAsset(arbitraryAsset.address, receiver.address);

    const balanceAfter = await arbitraryAsset.balanceOf(receiver.address);

    expect(balanceAfter).to.be.equal(amountInSwapOperator);
  });

  it('recovers ETH', async function () {
    const { swapOperator, pool } = this.contracts;

    const [receiver] = this.accounts.nonMembers;

    const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

    const amountInPool = parseEther('2000');
    await this.accounts.defaultSender.sendTransaction({ to: swapOperator.address, value: amountInPool });

    const amountInSwapOperator = parseEther('10');

    await this.accounts.defaultSender.sendTransaction({ to: swapOperator.address, value: amountInSwapOperator });

    await swapOperator.recoverAsset(ETH, receiver.address);

    const balanceAfter = await ethers.provider.getBalance(pool.address);

    expect(balanceAfter.sub(amountInPool)).to.be.equal(amountInSwapOperator);
  });
});
