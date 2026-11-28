---
title: Really decentralized account abstraction
description: Submit the gasless proxy as an ERC-4337 user operation so any bundler can include it and a paymaster deposit can cover the gas.
author: Rishi Jambagi
tags: ["gasless", "erc-20", "account abstraction"]
skill: intermediate
breadcrumb: Decentralized account abstraction
lang: en
published: 2026-11-26
---

## Introduction {#introduction}

The [gasless token tutorial](/developers/tutorials/gasless-token/) deploys a proxy that holds the user's tokens. The owner can call that proxy directly, which costs ETH, or sign a request that one server submits. The second path is the gasless one. It also means one server decides whether the request is included.

[ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) separates those jobs. The user signs a user operation. A bundler wraps one or more user operations in an ordinary transaction to a shared EntryPoint contract. A paymaster can deposit ETH with that EntryPoint and agree to pay the gas. If your server is offline, the user sends the same signed operation to another bundler. The user still does not need ETH, as long as a paymaster deposit still covers the operation.

This page uses EntryPoint v0.7 from the [v0.7.0 release](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.7.0). That release publishes one EntryPoint address on Sepolia and on mainnet: `0x0000000071727De22E5E9d8BAf0edAc6f37da032`. Ask the bundler which EntryPoint it supports before you send anything. The method is `eth_supportedEntryPoints`.

The sample below is teaching code. It is not a wallet. A paymaster that sponsors every call will lose its deposit.

## Why a shared pool helps {#why}

Your relay and an ERC-4337 bundler both submit a transaction and both can refuse one. The difference is how many independent operators can accept the same signed payload.

| | One relay | ERC-4337 |
| --- | --- | --- |
| Who may submit | The server that holds your key | Any bundler that speaks `eth_sendUserOperation` |
| Who pays gas | That server, per transaction | The paymaster deposit, or the account deposit |
| If that operator is down | The user needs ETH for `directAccess` | The user retries another bundler with the same signature |
| What the user signs | Your EIP-712 digest | The EntryPoint user-operation hash |

The paymaster deposit is still a pool of ETH that someone has to fill. ERC-4337 does not make gas free. It stops one process from being the only way to get a sponsored transaction included.

## Changes in the smart contract {#contract}

Keep `signedAccess` and `directAccess` on `UserProxy`. They serve the old relay and the owner who already has ETH. Add the account method the EntryPoint calls, and a paymaster that holds the deposit.

Two nonces are in play. `UserProxy.nonce` still stops a relay from replaying `signedAccess`. The EntryPoint keeps its own nonce for user operations. Read that one with `getNonce(proxy, 0)`. Do not reuse the proxy nonce in the user operation.

### The account {#account}

`validateUserOp` reverts unless `msg.sender` is the EntryPoint. A bad signature returns `1` (`SIG_VALIDATION_FAILED`) so a bundler can simulate the operation. Every other failure reverts.

When the operation names a paymaster, the EntryPoint passes `missingAccountFunds` as 0. The proxy does not need ETH for that path. The check below matches `SimpleAccount._validateSignature` in the v0.7 samples: hash the user-operation hash with the Ethereum signed-message prefix, then recover the signer. Some wallets return `v` as 0 or 1. Add 27 before `ecrecover`, which only accepts 27 or 28.

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
    uint8 v = uint8(userOp.signature[64]);
    if (v < 27) v += 27;
    address signer = ecrecover(
        digest,
        v,
        bytes32(userOp.signature[0:32]),
        bytes32(userOp.signature[32:64])
    );
    if (signer == address(0) || signer != OWNER) return SIG_VALIDATION_FAILED;

    if (missingAccountFunds > 0) {
        (bool ok, ) = payable(msg.sender).call{value: missingAccountFunds}("");
        missingAccountFunds = 0;
        require(ok, "Deposit failed");
    }
    return 0;
}
```

`userOpHash` already commits to the call, the nonce, the gas fields, the paymaster, and the chain. A bundler that changes the target after the user signs produces a different hash, and this check fails.

After validation, the EntryPoint calls `userOp.callData` on the proxy. Restrict that function to the EntryPoint. `directAccess` remains the owner's own path.

```solidity
function execute(address target, uint256 value, bytes calldata data) external returns (bytes memory) {
    require(msg.sender == ENTRY_POINT, "Not entry point");
    (bool success, bytes memory returnData) = target.call{value: value}(data);
    require(success, "Call failed");
    emit CallResult(target, returnData);
    return returnData;
}
```

### The paymaster {#paymaster}

A paymaster has two balances at the EntryPoint, and they are not interchangeable.

| Balance | What it is for | What happens if it is missing |
| --- | --- | --- |
| Deposit | Pays gas. The EntryPoint debits it before the call and refunds the unused part. | The EntryPoint reverts with `AA31 paymaster deposit too low`. |
| Stake | A bundler rule. It is not slashed. It unlocks after a delay you set. | The bundler can reject the operation with `paymaster stake too low`. |

On-chain, only the deposit is required. Stake matters when the bundler simulates validation and decides the paymaster may invalidate other operations. Reading your own `knownProxy` mapping is the paymaster's storage. Some bundlers still ask for stake before they keep that paymaster in the mempool. Fund the deposit either way. Add stake if the bundler returns code `-32505`.

`validatePaymasterUserOp` must revert for every caller except the EntryPoint. Return empty `context` when you do not need `postOp`. Return `0` when the check passed and you are not setting a time window. Do not write storage in this function. A write during validation is what forces the bundler to treat the paymaster as a staked global entity.

Record each proxy in `knownProxy` when your factory deploys it. That write happens in a normal transaction, not inside validation.

```solidity
function validatePaymasterUserOp(
    PackedUserOperation calldata userOp,
    bytes32,
    uint256 maxCost
) external view returns (bytes memory context, uint256 validationData) {
    require(msg.sender == ENTRY_POINT, "Not entry point");
    require(knownProxy[userOp.sender], "Unknown account");
    require(userOp.paymasterAndData.length >= 52, "Short paymaster data");
    maxCost;
    return ("", 0);
}

function deposit() external payable {
    IEntryPoint(ENTRY_POINT).depositTo{value: msg.value}(address(this));
}
```

`paymasterAndData` on the packed struct is the paymaster address (20 bytes), then `paymasterVerificationGasLimit` (16 bytes), then `paymasterPostOpGasLimit` (16 bytes), then any extra data. Fifty-two bytes is the header with empty extra data. The length check rejects a packed field that does not name this contract's gas limits.

`maxCost` is the most the EntryPoint may charge the deposit for this operation. This sample ignores the amount and sponsors any known proxy. A production paymaster compares `maxCost` with a policy, or returns a `context` and settles in `postOp`. If `postOp` reverts, the EntryPoint still charges the paymaster. The user is not the one who pays that bill.

If the deposit is empty, or this paymaster returns a revert, the signed operation is not lost. The owner calls `directAccess` after they have ETH, or another paymaster sponsors a new operation.

## Changes in the user interface {#ui}

The JSON for `eth_sendUserOperation` is not `PackedUserOperation`. Gas limits are separate numbers. Paymaster fields are four siblings, and you include all four or none. Factory fields are the same: both, or neither. For a proxy that is already on-chain, omit `factory` and `factoryData`. Empty bytes are `"0x"`, not null. Every integer is a hex quantity.

Estimate gas before you ask the user to sign. `eth_estimateUserOperationGas` ignores the signature for the inner call, but the signature must still be the right length or the simulation reverts in `validateUserOp`.

```javascript
const ENTRY_POINT = "0x0000000071727De22E5E9d8BAf0edAc6f37da032"

const unsigned = {
  sender: proxyAddress,
  nonce, // EntryPoint.getNonce(proxyAddress, 0)
  callData, // execute(target, value, data)
  callGasLimit: "0x0",
  verificationGasLimit: "0x0",
  preVerificationGas: "0x0",
  maxFeePerGas,
  maxPriorityFeePerGas,
  paymaster: PAYMASTER,
  paymasterVerificationGasLimit: "0x0",
  paymasterPostOpGasLimit: "0x0",
  paymasterData: "0x",
  signature: "0x" + "00".repeat(65)
}

const gas = await bundler.request({
  method: "eth_estimateUserOperationGas",
  params: [unsigned, ENTRY_POINT]
})
```

Copy the returned limits into the operation, then sign `userOpHash`. The hash is the EntryPoint's hash for that chain, not the EIP-712 digest from `signedAccess`. Send the signed object to the bundler URL in the text field. Your server can be the default URL. If the request fails, the user pastes another bundler and sends the same object.

```javascript
const opHash = await bundler.request({
  method: "eth_sendUserOperation",
  params: [signedOp, ENTRY_POINT]
})
```

A successful response is the user-operation hash, not a transaction hash. Poll `eth_getUserOperationReceipt` with that hash until the bundler includes it. The receipt's `receipt.transactionHash` is the bundle transaction, which may contain other users' operations.

| Bundler error | Meaning |
| --- | --- |
| `-32500`, message `AA31 paymaster deposit too low` | The deposit cannot cover `maxCost`. |
| `-32501` | `validatePaymasterUserOp` reverted. The proxy is probably not in `knownProxy`. |
| `-32505`, message `paymaster stake too low` | The bundler wants `addStake` before it will keep this paymaster. |
| `-32507` | The account or the paymaster rejected the signature. |

The wallet still has to show what `callData` will do. ERC-4337 does not fix the opaque signature from the previous tutorial. For an ERC-20 transfer, prefer a named function on the proxy so the wallet can display the token, the amount, and the recipient.

## Conclusion {#conclusion}

The proxy, the owner check, and `directAccess` stay. The path that used to end at one server now ends at any bundler that accepts the same signed user operation, paid from a deposit instead of the user's balance.

That holds only while the deposit covers `maxCost` and at least one bundler is willing to include the operation. If both fail, the owner who can get ETH still has `directAccess`. Widening the set of sponsors and bundlers is the gain. It is not a promise that a sponsored call will be included.

## Further reading {#further-reading}

- [ERC-4337: Account Abstraction Using Alt Mempool](https://eips.ethereum.org/EIPS/eip-4337)
- [EntryPoint v0.7.0, including SimpleAccount and BasePaymaster](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.7.0)
- [Account abstraction](/roadmap/account-abstraction/)
- [Letting your gasless users hold tokens and call contracts](/developers/tutorials/gasless-token/)
