/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface TokenControllerContract
  extends Truffle.Contract<TokenControllerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<TokenControllerInstance>;
}

export interface Burned {
  name: "Burned";
  args: {
    member: string;
    lockedUnder: string;
    amount: BN;
    0: string;
    1: string;
    2: BN;
  };
}

export interface Locked {
  name: "Locked";
  args: {
    _of: string;
    _reason: string;
    _amount: BN;
    _validity: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
  };
}

export interface Unlocked {
  name: "Unlocked";
  args: {
    _of: string;
    _reason: string;
    _amount: BN;
    0: string;
    1: string;
    2: BN;
  };
}

type AllEvents = Burned | Locked | Unlocked;

export interface TokenControllerInstance extends Truffle.ContractInstance {
  addToWhitelist: {
    (_member: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _member: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  burnFrom: {
    (
      _of: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _of: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  burnLockedTokens: {
    (
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeDependentContractAddress: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  changeMasterAddress: {
    (_masterAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _masterAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _masterAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _masterAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeOperator: {
    (_newOperator: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _newOperator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newOperator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newOperator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  extendLock: {
    (
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  extendLockOf: {
    (
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getLockedTokensValidity(
    _of: string,
    reason: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getUnlockableTokens(
    _of: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  increaseLockAmount: {
    (
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  lock: {
    (
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  lockForMemberVote: {
    (
      _of: string,
      _days: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _days: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _of: string,
      _days: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _days: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  lockOf: {
    (
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  lockReason(
    arg0: string,
    arg1: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  locked(
    arg0: string,
    arg1: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, boolean]>;

  minCALockTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  mint: {
    (
      _member: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _member: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  ms(txDetails?: Truffle.TransactionDetails): Promise<string>;

  nxMasterAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

  operatorTransfer: {
    (
      _from: string,
      _to: string,
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _from: string,
      _to: string,
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _from: string,
      _to: string,
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _from: string,
      _to: string,
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  pooledStaking(txDetails?: Truffle.TransactionDetails): Promise<string>;

  reduceLock: {
    (
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  releaseLockedTokens: {
    (
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _reason: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeEmptyReason: {
    (
      _of: string,
      _reason: string,
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _of: string,
      _reason: string,
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _of: string,
      _reason: string,
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      _reason: string,
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeFromWhitelist: {
    (_member: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _member: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeMultipleEmptyReasons: {
    (
      _members: string[],
      _reasons: string[],
      _indexes: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _members: string[],
      _reasons: string[],
      _indexes: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _members: string[],
      _reasons: string[],
      _indexes: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _members: string[],
      _reasons: string[],
      _indexes: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  token(txDetails?: Truffle.TransactionDetails): Promise<string>;

  tokensLocked(
    _of: string,
    _reason: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  tokensLockedAtTime(
    _of: string,
    _reason: string,
    _time: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  tokensUnlockable(
    _of: string,
    _reason: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  totalBalanceOf(
    _of: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  totalLockedBalance(
    _of: string,
    _time: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  unlock: {
    (_of: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_of: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
    sendTransaction(
      _of: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _of: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  updateUintParameters: {
    (
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    addToWhitelist: {
      (_member: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _member: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _member: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _member: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    burnFrom: {
      (
        _of: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _of: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    burnLockedTokens: {
      (
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeDependentContractAddress: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    changeMasterAddress: {
      (_masterAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _masterAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _masterAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _masterAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeOperator: {
      (_newOperator: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _newOperator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newOperator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newOperator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    extendLock: {
      (
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    extendLockOf: {
      (
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getLockedTokensValidity(
      _of: string,
      reason: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getUnlockableTokens(
      _of: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    increaseLockAmount: {
      (
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    lock: {
      (
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    lockForMemberVote: {
      (
        _of: string,
        _days: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _days: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _of: string,
        _days: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _days: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    lockOf: {
      (
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    lockReason(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    locked(
      arg0: string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, boolean]>;

    minCALockTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    mint: {
      (
        _member: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _member: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _member: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _member: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    ms(txDetails?: Truffle.TransactionDetails): Promise<string>;

    nxMasterAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

    operatorTransfer: {
      (
        _from: string,
        _to: string,
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _from: string,
        _to: string,
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _from: string,
        _to: string,
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _from: string,
        _to: string,
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    pooledStaking(txDetails?: Truffle.TransactionDetails): Promise<string>;

    reduceLock: {
      (
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _reason: string,
        _time: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    releaseLockedTokens: {
      (
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _reason: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeEmptyReason: {
      (
        _of: string,
        _reason: string,
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _of: string,
        _reason: string,
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _of: string,
        _reason: string,
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        _reason: string,
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeFromWhitelist: {
      (_member: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _member: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _member: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _member: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeMultipleEmptyReasons: {
      (
        _members: string[],
        _reasons: string[],
        _indexes: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _members: string[],
        _reasons: string[],
        _indexes: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _members: string[],
        _reasons: string[],
        _indexes: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _members: string[],
        _reasons: string[],
        _indexes: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    token(txDetails?: Truffle.TransactionDetails): Promise<string>;

    tokensLocked(
      _of: string,
      _reason: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    tokensLockedAtTime(
      _of: string,
      _reason: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    tokensUnlockable(
      _of: string,
      _reason: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    totalBalanceOf(
      _of: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    totalLockedBalance(
      _of: string,
      _time: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    unlock: {
      (_of: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_of: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
      sendTransaction(
        _of: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _of: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    updateUintParameters: {
      (
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
