const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { ethers } = require('hardhat');
const { expect } = require('chai');

const { increaseTime } = require('../utils').evm;
const { setup } = require('./setup');

const ONE_DAY_SECONDS = 24 * 60 * 60;
const BUCKET_DURATION = 28 * ONE_DAY_SECONDS;

async function getCurrentBucket() {
  const lastBlock = await ethers.provider.getBlock('latest');
  return Math.floor(lastBlock.timestamp / BUCKET_DURATION);
}

async function processExpirationsForSetup() {
  const fixture = await loadFixture(setup);
  const { stakingNFT } = fixture.contracts;
  const [manager] = fixture.accounts.members;

  const expectedPoolId = 1;
  await stakingNFT.mint(expectedPoolId, manager.address);

  return {
    ...fixture,
  };
}

describe('processExpirationsFor', function () {
  it('processExpirationsFor should return the correct staking pools for the manager', async function () {
    const fixture = await loadFixture(processExpirationsForSetup);
    const { stakingViewer, stakingPool, stakingNFT } = fixture.contracts;

    const firstActiveBucketIdBefore = await stakingPool.getFirstActiveBucketId();
    const initialCurrentBucket = await getCurrentBucket();
    expect(firstActiveBucketIdBefore).to.equal(initialCurrentBucket);

    // adjust time so that the bucket expires
    const increasedBuckets = 7;
    await increaseTime(BUCKET_DURATION * increasedBuckets);

    const tokenIds = [1, 2];
    for (const tokenId of tokenIds) {
      const poolId = await stakingNFT.stakingPoolOf(tokenId);
      expect(poolId.toString()).to.equal('1');
    }

    const processExpiration = stakingViewer.processExpirationsFor(tokenIds);
    await expect(processExpiration).to.emit(stakingPool, 'BucketExpired').withArgs(firstActiveBucketIdBefore);
  });
});
