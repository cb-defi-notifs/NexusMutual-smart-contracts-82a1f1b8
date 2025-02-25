const { takeSnapshot, revertToSnapshot } = require('../utils').evm;
const setup = require('./setup');

describe('TokenController', function () {
  before(setup);

  beforeEach(async function () {
    this.snapshotId = await takeSnapshot();
  });

  afterEach(async function () {
    await revertToSnapshot(this.snapshotId);
  });

  require('./totalBalanceOf');
  require('./createStakingPoolOwnershipOffer');
  require('./acceptStakingPoolOwnershipOffer');
  require('./assignStakingPoolManager');
  require('./cancelStakingPoolOwnershipOffer');
  require('./transferStakingPoolOwnership');
  require('./withdrawGovernanceRewards');
  require('./withdrawGovernanceRewardsTo');
  require('./withdrawPendingRewards');
  require('./depositStakedNXM');
  require('./mintStakingPoolNXMRewards');
  require('./burnStakingPoolNXMRewards');
  require('./burnStakedNXM');
  require('./withdrawNXMStakeAndRewards');
  require('./changeOperator');
  require('./operatorTransfer');
  require('./mint');
  require('./burnFrom');
});
