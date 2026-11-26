---
title: Really decentralized account abstraction
description: Move the gasless proxy off a single relay by submitting an ERC-4337 user operation that any bundler can include and a paymaster can sponsor.
author: Rishi Jambagi
tags: ["gasless", "erc-20", "account abstraction"]
skill: intermediate
breadcrumb: Decentralized account abstraction
lang: en
published: 2026-11-26
---

## Introduction {#introduction}

The [gasless token tutorial](/developers/tutorials/gasless-token/) gives a user a smart contract proxy. The owner can call that proxy directly, or sign a request that your server submits. That second path is the gasless one, and it has one relay: your server. If the server is down, the user needs ETH to reach the assets.

[ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) splits that job. The user signs a `UserOperation`. Any bundler can put it into a normal transaction that calls the shared `EntryPoint`. A paymaster can deposit ETH and agree to cover the gas. The user still does not need ETH, and they are not stuck if your server disappears. They send the same signed operation to a different bundler.

This tutorial uses EntryPoint v0.7, the interfaces in the [v0.7.0 release](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.7.0). The same EntryPoint address is deployed on Sepolia and mainnet: `0x0000000071727De22E5E9d8BAf0edAc6f37da032`.

This is not production wallet code. A paymaster that sponsors arbitrary calls will be drained. The sample below only sponsors proxies the application deployed, and it does not stake itself for the bundler whitelist. Read the validation rules in the EIP before you take a deposit.

## Changes in the smart contract {#contract}

Keep `signedAccess` from `UserProxy` for the old relay. Add two things beside it: the account check the EntryPoint calls, and a paymaster that holds the gas deposit.

### The account {#account}

`validateUserOp` must revert unless `msg.sender` is the EntryPoint. A bad signature returns `1` (`SIG_VALIDATION_FAILED`) so a bundler can simulate the call. Any other failure reverts. When a paymaster is set, `missingAccountFunds` is zero and the account does not need ETH.

```solidity
address constant ENTRY_POINT = 0x0000000071727De22E5E9d8BAf0edAc6f37da032;
uint256 constant SIG_VALIDATION_FAILED = 1;

function validateUserOp(
    PackedUserOperation calldata userOp,
    bytes32 userOpHash,
    uint256 missingAccountFunds
) external returns (uint256 validationData) {
    require(msg.sender == ENTRY_POINT, "Not entry point");
    require(userOp.signature.length == 65, "Bad signature");

    bytes32 digest = keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32", userOpHash)
    );
    address signer = ecrecover(
        digest,
        uint8(userOp.signature[64]),
        bytes32(userOp.signature[0:32]),
        bytes32(userOp.signature[32:64])
    );
    if (signer != OWNER) return SIG_VALIDATION_FAILED;

    if (missingAccountFunds > 0) {
        (bool ok, ) = payable(msg.sender).call{value: missingAccountFunds}("");
        require(ok, "Deposit failed");
    }
    return 0;
}
```

`PackedUserOperation` is the struct from that v0.7 release. The signature covers `userOpHash`, which already includes the call, the nonce, and the paymaster fields, so a bundler cannot swap the destination after the user signs.

The EntryPoint later calls the account with `userOp.callData`. Point that at a function only the EntryPoint may use:

```solidity
function execute(address target, bytes calldata data) external returns (bytes memory) {
    require(msg.sender == ENTRY_POINT, "Not entry point");
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
    emit CallResult(target, returnData);
    return returnData;
}
```

`directAccess` stays as it is. An owner who has ETH can still call the proxy with no bundler and no paymaster.

### The paymaster {#paymaster}

The paymaster's EntryPoint deposit pays the bundler. `validatePaymasterUserOp` must also reject every caller except the EntryPoint. Returning empty `context` means `postOp` is not required. Returning `0` means the signature check passed and there is no time window.

A paymaster that writes storage during validation is rejected by bundlers unless they have staked it. This check only reads `knownProxy`, which you set in a separate transaction when you deploy a proxy.

```solidity
function validatePaymasterUserOp(
    PackedUserOperation calldata userOp,
    bytes32,
    uint256
) external view returns (bytes memory context, uint256 validationData) {
    require(msg.sender == ENTRY_POINT, "Not entry point");
    require(knownProxy[userOp.sender], "Unknown account");
    return ("", 0);
}
```

Fund it once, from an account that has ETH:

```solidity
function deposit() external payable {
    IEntryPoint(ENTRY_POINT).depositTo{value: msg.value}(address(this));
}
```

If this paymaster is empty or refuses the account, the user operation does not vanish. The owner can call `directAccess`, or another paymaster can sponsor the same kind of operation.

## Changes in the user interface {#ui}

The v0.7 JSON that `eth_sendUserOperation` takes is not the packed struct. Paymaster fields are separate. `factory` and `factoryData` stay null when the proxy is already deployed.

```javascript
const userOp = {
  sender: proxyAddress,
  nonce,
  factory: null,
  factoryData: null,
  callData,
  callGasLimit,
  verificationGasLimit,
  preVerificationGas,
  maxFeePerGas,
  maxPriorityFeePerGas,
  paymaster: PAYMASTER,
  paymasterVerificationGasLimit,
  paymasterPostOpGasLimit,
  paymasterData: "0x",
  signature
}

await window.ethereum.request({
  method: "eth_sendUserOperation",
  params: [userOp, ENTRY_POINT]
})
```

Put the bundler URL in a text field. Your server can be the default. If that request fails, the user pastes another bundler that speaks the same method and sends the same signed object. They do not sign a new request, and they do not need ETH, as long as some paymaster still accepts the account.

The wallet still has to show the user what `callData` will do. ERC-4337 does not fix the opaque-signature problem from the previous tutorial. Prefer a named function such as `transfer` when the action is an ERC-20 transfer, and let the wallet display that.

## Conclusion {#conclusion}

The proxy, the owner check, and the direct call stay. What changes is the path that used to belong to one server. The signed operation can be bundled by anyone, and the gas can be paid from a deposit instead of the user's balance.

That is still a promise you have to back with ETH in the paymaster, and with a bundler that is willing to include the operation. It is a wider set of promises than a single relay, which is the point.
