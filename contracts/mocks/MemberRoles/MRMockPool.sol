// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.9;

contract MRMockPool {
  constructor() public { }

  fallback() external payable {}

  receive() external payable {}

}
