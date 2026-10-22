---
title: "Short ABIs for Calldata Optimization"
description: Optimizing smart contracts for Optimistic Rollups
author: Ori Pomerantz
lang: en
tags: ["layer 2"]
skill: intermediate
breadcrumb: Short ABIs
published: 2022-04-01
---

## Introduction {#introduction}

In this article, you learn about [optimistic rollups](/developers/docs/scaling/optimistic-rollups), the cost of transactions on them, and how that different cost structure requires us to optimize for different things than on the Ethereum Mainnet.
You also learn how to implement this optimization.

### Full disclosure {#full-disclosure}

I'm a full time [Optimism](https://www.optimism.io/) employee, so examples in this article will run on Optimism.
However, the technique explained here should work just as well for other rollups.

### Terminology {#terminology}

When discussing rollups, the term 'layer 1' (L1) is used for Mainnet, the production Ethereum network.
The term 'layer 2' (L2) is used for the rollup or any other system that relies on L1 for security but does most of its processing offchain.

## How can we further reduce the cost of L2 transactions? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups) have to preserve a record of every historical transaction so that anybody will be able to go through them and verify that the current state is correct.
When this article was written, the cheapest way to get data into the Ethereum Mainnet was to write it as calldata.
This solution was chosen by both [Optimism](https://docs.optimism.io/op-stack/protocol/overview) and [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
Since the Dencun upgrade (March 2024), rollups can post this data in [blobs](/roadmap/danksharding/) instead, which are a lot cheaper.

### Cost of L2 transactions {#cost-of-l2-transactions}

The cost of L2 transactions is composed of two components:

1. L2 processing, which is usually extremely cheap
2. L1 storage, which is tied to Mainnet gas costs

When I wrote this article in 2022, on Optimism the cost of L2 gas was 0.001 [Gwei](/developers/docs/gas/#pre-london).
The cost of L1 gas, on the other hand, was approximately 40 gwei.

A byte of calldata costs either 4 gas (if it is zero) or 16 gas (if it is any other value).
One of the most expensive operations on the EVM is writing to storage.
The maximum cost of writing a 32-byte word to storage on L2 is 22100 gas. At the time, this was 22.1 gwei.
So if we could save a single zero byte of calldata, we'd be able to write about 200 bytes to storage and still come out ahead.

#### How L2 costs changed in 2024 {#how-l2-costs-changed-in-2024}

The OP Stack [L1 data fee](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) formula has changed twice since this article was written:

- With the [Ecotone upgrade](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (March 2024), OP Stack chains started posting transaction data to blobs, which are priced by a separate (and usually much lower) blob base fee.
- With the [Fjord upgrade](https://docs.optimism.io/op-stack/transactions/fees#fjord) (July 2024), the L1 data fee is based on an estimate of the size of the transaction after [FastLZ](https://github.com/ariya/FastLZ) compression, with a minimum of 100 bytes per transaction ([see the specification](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

This changes the analysis in the rest of this article in three ways:

1. Zero bytes compress well, so they are nearly free.
   The 4 and 16 gas per byte figures below are the cost of L1 calldata, not what you pay for transaction data on an OP Stack chain today.
2. Below the 100-byte minimum, shorter calldata does not save anything.
   For example, in October 2026 on OP Mainnet a standard ERC-20 `transfer` (68 bytes of calldata) and the 23-byte short version in this article would have paid exactly the same L1 data fee, the minimum, about 1 gwei (10<sup>-9</sup> ETH).
3. Because blob space is cheap, the L2 execution fee is now often larger than the L1 data fee.
   At an L2 gas price of 0.001 gwei, 1000 gas cost 1 gwei, the same as that entire L1 data fee, so the extra execution gas of going through a proxy contract can cost more than the bytes it saves.

The principle still holds: fewer compressed bytes mean a lower L1 data fee.
Short ABIs make the most sense for transactions with a lot of data that does not compress well, and on chains or at times when L1 data is expensive.
To see what a specific transaction would pay, call `getL1Fee` on the [`GasPriceOracle` predeploy](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) with the unsigned transaction.
For example, using [Foundry](https://getfoundry.sh/introduction/installation/)'s `cast`:

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

The result is in wei.

### The ABI {#the-abi}

The vast majority of transactions access a contract from an externally-owned account.
Most contracts are written in Solidity and interpret their data field per [the application binary interface (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

However, the ABI was designed for L1, where a byte of calldata costs approximately the same as four arithmetic operations, not L2 where (at 2022 prices) a byte of calldata costs more than a thousand arithmetic operations.
The calldata is divided like this:

| Section             | Length | Bytes | Wasted bytes | Wasted gas | Necessary bytes | Necessary gas |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Function selector   |      4 |   0-3 |            3 |         48 |               1 |            16 |
| Zeroes              |     12 |  4-15 |           12 |         48 |               0 |             0 |
| Destination address |     20 | 16-35 |            0 |          0 |              20 |           320 |
| Amount              |     32 | 36-67 |           17 |         68 |              15 |           240 |
| Total               |     68 |       |              |        164 |                 |           576 |

Explanation:

- **Function selector**: The contract has less than 256 functions, so we can distinguish them with a single byte.
  These bytes are typically non-zero and therefore [cost sixteen gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeroes**: These bytes are always zero because a twenty-byte address does not require a thirty-two-byte word to hold it.
  Bytes that hold zero cost four gas ([see the yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Appendix G,
  p. 27, the value for `G`<sub>`txdatazero`</sub>).
- **Amount**: If we assume that in this contract `decimals` is eighteen (the normal value) and the maximum amount of tokens we transfer will be 10<sup>18</sup>, we get a maximum amount of 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, so fifteen bytes are enough.

A waste of 164 gas on L1 is normally negligible. A transaction costs at least [21,000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), so an extra 0.8% doesn't matter.
However, on L2 in 2022, things were different. Almost the entire cost of the transaction was writing it to L1.
In addition to the transaction calldata, there are 109 bytes of transaction header (destination address, signature, etc.).
The total cost is therefore `109*16+576+164=2484`, and we are wasting about 6.6% of that.

## Reducing costs when you don't control the destination {#reducing-costs-when-you-dont-control-the-destination}

Assuming that you do not have control over the destination contract, you can still use a solution similar to [this one](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

To run it, you need [Node.js](https://nodejs.org/) and git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

The test deploys the contracts to Hardhat's built-in local network, so you don't need any ETH.
The repository uses Hardhat 2.9, so on current versions of Node.js it warns that your Node.js version is not supported, but the test still passes.

Let's go over the relevant files.

### Token.sol {#token-sol}

[This is the destination contract](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
It is a standard ERC-20 contract, with one additional feature.
This `faucet` function lets any user get some token to use.
It would make a production ERC-20 contract useless, but it makes life easier when an ERC-20 exists only to facilitate testing.

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[This is the contract that transactions are supposed to call with shorter calldata](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Let's go over it line by line.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

We need the token function to know how to call it.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

The address of the token for which we are a proxy.

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

The token address is the only parameter we need to specify.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Read a value from the calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

We are going to load a single 32-byte (256-bit) word to memory and remove the bytes that aren't part of the field we want.
This algorithm doesn't work for values longer than 32 bytes, and of course we can't read past the end of the calldata.
On L1 it might be necessary to skip these tests to save on gas, but on L2 gas is extremely cheap, which enables whatever sanity checks we can think of.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

We could have copied the data from the call to `fallback()` (see below), but it is easier to use [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), the assembly language of the EVM.

Here we use [the CALLDATALOAD opcode](https://www.evm.codes/#35) to read bytes `startByte` to `startByte+31` into the stack.
In general, the syntax of an opcode in Yul is `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Only the most significant `length` bytes are part of the field, so we [right-shift](https://en.wikipedia.org/wiki/Logical_shift) to get rid of the other values.
This has the added advantage of moving the value to the right of the field, so it is the value itself rather than the value times 256<sup>something</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

When a call to a Solidity contract does not match any of the function signatures, it calls [the `fallback()` function](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (assuming there is one).
In the case of `CalldataInterpreter`, _any_ call gets here because there are no other `external` or `public` functions.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Read the first byte of the calldata, which tells us the function.
There are two reasons why a function would not be available here:

1. Functions that are `pure` or `view` don't change the state and don't cost gas (when called offchain).
   It makes no sense to try to reduce their gas cost.
2. Functions that rely on [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   The value of `msg.sender` is going to be `CalldataInterpreter`'s address, not the caller.

Unfortunately, [looking at the ERC-20 specifications](https://eips.ethereum.org/EIPS/eip-20), this leaves only one standard function, `transfer` (because we can call `transferFrom`).
Our test token also has `faucet`, which we can support because we can transfer the tokens back to whoever called us.

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

A call to `faucet()`, which doesn't have parameters.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

After we call `token.faucet()` we get tokens. However, as the proxy contract, we do not **need** tokens.
The EOA (externally owned account) or contract that called us does.
So we transfer all of our tokens to whoever called us.

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

Transferring tokens requires two parameters: the destination address and the amount.

```solidity
            token.transferFrom(
                msg.sender,
```

We only allow callers to transfer tokens they own

```solidity
                address(uint160(calldataVal(1, 20))),
```

The destination address starts at byte #1 (byte #0 is the function).
As an address, it is 20-bytes long.

```solidity
                calldataVal(21, 2)
```

For this particular contract we assume that the maximum number of tokens anybody would want to transfer fits in two bytes (less than 65536).

```solidity
            );
        }
```

Overall, a transfer takes 23 bytes of calldata:

| Section             | Length | Bytes |
| ------------------- | -----: | ----: |
| Function selector   |      1 |     0 |
| Destination address |     20 |  1-20 |
| Amount              |      2 | 21-22 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[This JavaScript unit test](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) shows us how to use this mechanism (and how to verify it works correctly).
I am going to assume you understand [chai](https://www.chaijs.com/) and [ethers](https://docs.ethers.org/v5/) and only explain the parts that specifically apply to the contract.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

We start by deploying both contracts.

```javascript
    // Get tokens to play with
    const faucetTx = {
```

We can't use the high-level functions we'd normally use (such as `token.faucet()`) to create transactions, because we do not follow the ABI.
Instead, we have to build the transaction ourselves and then send it.

```javascript
      to: cdi.address,
      data: "0x01"
```

There are two parameters we need to provide for the transaction:

1. `to`, the destination address.
   This is the calldata interpreter contract.
2. `data`, the calldata to send.
   In the case of a faucet call, the data is a single byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

We call [the signer's `sendTransaction` method](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) because we already specified the destination (`faucetTx.to`) and we need the transaction to be signed.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Here we verify the balance.
There is no need to save gas on `view` functions, so we just run them normally.

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Give the calldata interpreter an allowance to be able to do transfers.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Create a transfer transaction. The first byte is "0x02", followed by the destination address, and finally the amount (0x0100, which is 256 in decimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Reducing the cost when you do control the destination contract {#reducing-the-cost-when-you-do-control-the-destination-contract}

If you do have control over the destination contract you can create functions that bypass the `msg.sender` checks because they trust the calldata interpreter.
[You can see an example of how this works here, in the `control-contract` branch](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
To run it, switch to that branch in the repository you cloned earlier and run the test again:

```sh
git checkout control-contract
npx hardhat test
```

If the contract were responding only to external transactions, we could get by with having just one contract.
However, that would break [composability](/developers/docs/smart-contracts/composability/).
It is much better to have a contract that responds to normal ERC-20 calls, and another contract that responds to transactions with short call data.

### Token.sol {#token-sol-2}

In this example we can modify `Token.sol`.
This lets us have a number of functions that only the proxy may call.
Here are the new parts:

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

The ERC-20 contract needs to know the identity of the authorized proxy.
However, we cannot set this variable in the constructor, because we don't know the value yet.
This contract is instantiated first because the proxy expects the token's address in its constructor.

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

The address of the creator (called `owner`) is stored here because that is the only address allowed to set the proxy.

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

The proxy has privileged access, because it can bypass security checks.
To make sure we can trust the proxy we only let `owner` call this function, and only once.
Once `proxy` has a real value (not zero), that value cannot change, so even if the owner decides to become rogue, or the mnemonic for it is revealed, we are still safe.

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

This is a [`modifier` function](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), it modifies the way other functions work.

```solidity
      require(msg.sender == proxy);
```

First, verify we got called by the proxy and nobody else.
If not, `revert`.

```solidity
      _;
    }
```

If so, run the function which we modify.

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

These are three operations that normally require the message to come directly from the entity transferring tokens or approving an allowance.
Here we have a proxy version these operations which:

1. Is modified by `onlyProxy()` so nobody else is allowed to control them.
2. Gets the address that would normally be `msg.sender` as an extra parameter.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

The calldata interpreter is nearly identical to the one above, except that the proxied functions receive a `msg.sender` parameter and there is no need for an allowance for `transfer`.

```solidity
        // transfer (no need for allowance)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

There are a few changes between the previous testing code and this one.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

We need to tell the ERC-20 contract which proxy to trust

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

To check `approve()` and `transferFrom()` we need a second signer.
We call it `poorSigner` because it does not get any of our tokens (it does need to have ETH, of course).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Because the ERC-20 contract trusts the proxy (`cdi`), we don't need an allowance to relay transfers.

```js
// approval and transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Test the two new functions.
Note that `transferFromTx` requires two address parameters: the giver of the allowance and the receiver.

## Conclusion {#conclusion}

Both [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) and [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) now compress the data they write to L1, and charge each transaction based on its compressed size, to reduce the cost of transactions.
However, as infrastructure providers looking for generic solutions, our abilities are limited.
As the dapp developer, you have application-specific knowledge, which lets you optimize your calldata much better than we could in a generic solution.
Hopefully, this article helps you find the ideal solution for your needs.

[See here for more of my work](https://cryptodocguy.pro/).

