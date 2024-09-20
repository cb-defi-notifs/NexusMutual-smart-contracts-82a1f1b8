// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.18;

import "../../interfaces/IMemberRoles.sol";

contract MemberRolesMock {

  enum Role { Unassigned, AdvisoryBoard, Member, Owner }

  mapping(address => Role) roles;

  function memberAtIndex(uint, uint) external pure returns (address, bool) {
    revert("Unexpected MemberRolesMock call");
  }

  function membersLength(uint) external pure returns (uint) {
    return 0;
  }

  function checkRole(address memberAddress, uint roleId) external view returns (bool) {
    return uint(roles[memberAddress]) == roleId;
  }

  function setRole(address memberAddress, uint roleId) public {
    roles[memberAddress] = Role(uint8(roleId));
  }

}
