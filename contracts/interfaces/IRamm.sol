// SPDX-License-Identifier: GPL-3.0-only

pragma solidity >=0.5.0;

import "./IPool.sol";
import "./INXMToken.sol";
import "./ITokenController.sol";

// storage structs

struct Slot0 {
  uint128 nxmReserveA;
  uint128 nxmReserveB;
}

struct Slot1 {
  uint128 ethReserve;
  uint96 budget;
  uint32 updatedAt;
}

struct Observation {
  uint32 timestamp;
  uint64 priceCumulativeAbove;
  uint64 priceCumulativeBelow;
}

// memory structs

struct State {
  uint nxmA;
  uint nxmB;
  uint eth;
  uint budget;
  uint ratchetSpeed;
  uint timestamp;
}

interface IRamm {

  struct CumulativePriceCalculationProps {
    uint previousEthReserve;
    uint currentEthReserve;
    uint previousNxmA;
    uint currentNxmA;
    uint previousNxmB;
    uint currentNxmB;
    uint previousTimestamp;
    uint observationTimestamp;
  }

  struct CumulativePriceCalculationTimes {
    uint secondsUntilBVAbove;
    uint secondsUntilBVBelow;
    uint timeElapsed;
    uint bvTimeBelow;
    uint bvTimeAbove;
    uint ratchetTimeAbove;
    uint ratchetTimeBelow;
  }

  /* ========== VIEWS ========== */

  function getReserves() external view returns (
    uint ethReserve,
    uint nxmA,
    uint nxmB,
    uint remainingBudget
  );

  function getSpotPrices() external view returns (uint spotPriceA, uint spotPriceB);

  function getBookValue() external view returns (uint bookValue);

  /* === MUTATIVE FUNCTIONS ==== */

  function updateTwap() external;

  function getInternalPriceAndUpdateTwap() external returns (uint internalPrice);

  function swap(uint nxmIn, uint minTokensOut, uint deadline) external payable;

  function removeBudget() external;

  /* ========== EVENTS ========== */

  // Input
  error OneInputOnly();
  error OneInputRequired();

  // Expiry
  error SwapExpired(uint deadline, uint blockTimestamp);

  // Minimum tokens out
  error NxmOutIsLessThanMinTokensOut(uint nxmOut, uint minTokensOut);
  error EthOutIsLessThanMinTokensOut(uint ethOut, uint minTokensOut);

  // Buffer Zone
  error NoSwapsInBufferZone();

  // Transfer
  error EthTransferFailed();
}
