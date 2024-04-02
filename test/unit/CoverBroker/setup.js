const { ethers } = require('hardhat');

const { setEtherBalance } = require('../utils').evm;
const { parseEther } = ethers.utils;

async function setup() {
  const coverBrokerOwner = ethers.Wallet.createRandom().connect(ethers.provider);
  await setEtherBalance(coverBrokerOwner.address, parseEther('100'));

  const dai = await ethers.deployContract('ERC20Mock');
  const cover = await ethers.deployContract('CMMockCover');
  const memberRoles = await ethers.deployContract('MemberRolesMock');
  const coverBroker = await ethers.deployContract('CoverBroker', [cover.address, memberRoles.address]);

  await memberRoles.setRole(coverBroker.address, 2);
  await coverBroker.transferOwnership(coverBrokerOwner.address);

  return {
    coverBrokerOwner,
    contracts: {
      dai,
      coverBroker,
    },
  };
}

module.exports = { setup };
