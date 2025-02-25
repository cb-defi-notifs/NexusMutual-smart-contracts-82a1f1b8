const { takeSnapshot, revertToSnapshot } = require('../utils').evm;
const setup = require('./setup');

describe('StakingPool unit tests', function () {
  before(setup);

  beforeEach(async function () {
    this.snapshotId = await takeSnapshot();
  });

  afterEach(async function () {
    await revertToSnapshot(this.snapshotId);
  });

  require('./burnStake');
  require('./calculateNewRewardShares');
  require('./calculatePremium');
  require('./constructor');
  require('./depositTo');
  require('./extendDeposit');
  require('./initialize');
  require('./multicall');
  require('./processExpirations');
  require('./requestAllocation');
  require('./setPoolFee');
  require('./setPoolPrivacy');
  require('./withdraw');
});
