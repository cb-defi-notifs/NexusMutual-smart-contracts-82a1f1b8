const { ethers } = require('hardhat');
const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

const setup = require('./setup');
const { getTokenSpotPrice } = require('../utils').tokenPrice;
const { BigNumber } = ethers;
const { parseEther } = ethers.utils;

describe('calculateTokenSpotPrice', function () {
  it('calculates token spot price correctly', async function () {
    const fixture = await loadFixture(setup);
    const { pool } = fixture;

    const mcrEth = parseEther('162424');
    const totalAssetValue = parseEther('200000');

    const expectedPrice = getTokenSpotPrice(totalAssetValue, mcrEth);
    const price = await pool.calculateTokenSpotPrice(totalAssetValue, mcrEth);
    expect(BigNumber.from(expectedPrice.toString()).sub(price).lte(BigNumber.from(1))).to.be.equal(
      true,
      `expectedPrice ${expectedPrice.toFixed()} - price ${price.toString()} > 1 wei`,
    );
  });

  it('calculates token spot price correctly for totalAssetValue = 0', async function () {
    const fixture = await loadFixture(setup);
    const { pool } = fixture;

    // in the mock ramm, 1 NXM = 1 ETH
    const price = await pool.calculateTokenSpotPrice(0, 0); // old signature
    expect(price).to.equal(parseEther('1'));
  });

  it('should revert when mcrEth = 0', async function () {
    const fixture = await loadFixture(setup);
    const { pool } = fixture;
    const mcrEth = parseEther('0');
    const totalAssetValue = parseEther('200000');

    await expect(pool.calculateTokenSpotPrice(totalAssetValue, mcrEth)).to.be.revertedWithPanic();
  });
});
