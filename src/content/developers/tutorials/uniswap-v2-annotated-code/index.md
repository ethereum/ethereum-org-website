---
title: "Uniswap-v2 Contract Walk-Through"
description: How does the Uniswap-v2 contract work? Why is it written that way?
author: Ori Pomerantz
lang: en
sidebar: true
tags: ["solidity", "uniswap"]
skill: intermediate
published: 2021-05-01
---

## Introduction {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) can create an exchange market between any two ERC-20 tokens. In this
article we will go over the source code for the contracts that implement this protocol and see why they are written
this way.


### What Does Uniswap Do? {#what-does-uniswap-do}

Basically, there are two types of users: *liquidity providers* and *traders*. 

The liquidity providers provide the pool with the two tokens that can be exchanged (we'll call them
**Token0** and **Token1**). In return, they receive a third token that represents partial ownership of
the pool.

Trades send one type of token to the pool and receive the other (for example, send **Token0** and receive
**Token1**) out of the pool provided by the liquidity providers. The exchange rate is determined by the 
relative number of **Token0**s and **Token1**s that the pool has. In addition, the pool takes a small 
percent as a reward for the liquidity pool.

When liquidity providers want their assets back they can burn the pool tokens and receive back their tokens, 
including their share of the rewards.

[Click here for a fuller description](https://uniswap.org/docs/v2/core-concepts/swaps/).


### Why v2? Why not v3? {#why-v2}

As I'm writing this, [Uniswap v3](https://uniswap.org/whitepaper-v3.pdf) is almost ready. However, it is an upgrade
that is much more complicated than the original. It is easier to first learn v2, which is simpler, and then go to v3.


### Core Contracts vs Periphery Contracts  {#contract-types}

Uniswap v2 is divided into two components, a core and a periphery. This division allows the core contracts,
which hold the assets in the market and therefore *have* to be secure, to be simpler and easier to audit. 
All the extra functionality required by traders can then be provided by periphery contracts. 



## The Core Contracts {#core-contracts}

These are the secure contracts which hold the liquidity. 


### UniswapV2Pair.sol   {#UniswapV2Pair}

[This contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implements an
actual pool that exchanges tokens. It is the core Uniswap functionality.


```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

These are all the interfaces that the contract needs to know about, either because the contract implements them
(`IUniswapV2Pair` and `UniswapV2ERC20`) or because it calls contracts that implement them.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
    using SafeMath  for uint;
```

The [SafeMath library](https://docs.openzeppelin.com/contracts/2.x/api/math) is used to avoid overflows and 
underflows. This is important because otherwise we might end up with a situation where a value should be `-1`,
but is instead `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

A lot of calculations in the pool contract require fractions. However, fractions are not supported by the EVM.
The solution that Uniswap found is to use 224 bit values, with 112 bits for the integer part, and 112 bits 
for the fraction. So `1.0` is represented as `2^112`, `1.5` is represented as `2^112 + 2^111`, etc.

#### Variables {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```    

To avoid cases of division by zero, there is a minimum number of liquidity tokens that always
exist (but are owned by account zero). That number is **MINIMUM_LIQUIDITY**, a thousand.

    
```solidity    
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

This is the ABI selector for the ERC-20 transfer function. It is used to transfer ERC-20 tokens
in the two token accounts.

```solidity
    address public factory;
```

This is the factory contract that created this pool. Every pool is an exchange between two ERC-20 
tokens, the factory is a central point that connects all of these pools.
    
```solidity    
    address public token0;
    address public token1;
```

There are the addresses of the contracts for the two types of ERC-20 tokens that can be exchanged 
by this pool.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

The reserves the pool has for each token type.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

The timestamp for the last block in which an exchange occured, used to track exchange rates across time.

One of the biggest gas expenses of Ethereum contracts is storage, which persists from one call of the contract
to the next. Each storage cell is 256 bits long. These three variables are allocated in such a way a single
storage value can include all three of them (112+112+32=256).
    
```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

These variables hold the cumulative costs for each token (each in term of the other). They can be used to calculate
the average exchange rate over a period of time.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

The way the pool decides on the exchange rate between token0 and token1 is to keep the multiple of 
the two reserves constant during trades. `kLast` is this value. It changes when a liquidity provider
deposits or withdraws tokens.


Here is a simple example. Note that for the sake of simplicity the table only has has three digits after the decimal point, so the
numbers are not accurate.

| Event                                                    |  reserve0  | reserve1 | reserve0 * reserve1 | Average exchange rate (token1 / token0) |
| -------------------------------------------------------- |       --------: |      ----------: |       ----------------: | -----------------------  |
| Initial setup                                            |     1,000.000   |        1,000.000 | 1,000,000               |                          |
| Trader A deposits 50 token0 and gets 47.619  token1 back |     1,050.000   |          952.381 | 1,000,000               | 0.952                    |
| Trader B deposits 10 token0 and gets  8.984  token1 back |     1,060.000   |          943.396 | 1,000,000               | 0.898                    |
| Trader C deposits 40 token0 and gets 34.305  token1 back |     1,100.000   |          909.090 | 1,000,000               | 0.858                    |
| Trader D deposits 100 token1 and gets 109.01 token0 back |       990.990   |        1,009.090 | 1,000,000               | 0.917                    |
| Trader E deposits 10 token0 and gets 10.079 token1 back  |     1,000.990   |          999.010 | 1,000,000               | 1.008                    |

As you can see, as traders provide more of token0, the relative value of token1 increases, and vice versa, implementing supply and demand.

#### Lock   {#pair-lock}

```solidity
    uint private unlocked = 1;
```

There is a class of security vulnerabilities that are based on 
[reentrancy abuse](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14).
Uniswap needs to transfer arbitrary ERC-20 tokens, which means calling ERC-20 contracts that may attempt to abuse the Uniswap market that calls them. 
By having an `unlocked` variable as part of the contract, we can prevent functions from being called while they are running (within the same 
transaction).

```solidity
    modifier lock() {
```

This function is a [modifier](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), a function that wraps around a 
normal function to change its behavior is some way.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

If `unlocked` is equal to one, set it to zero. If it is already zero revert the call, make it fail.

```solidity
        _;
```

In a modifier `_;` is the original function call (with all the parameters). Here it means that the function call only happens if 
`unlocked` was one when it was called, and while it is running the value of `unlocked` is zero.

```solidity
        unlocked = 1;
    }
```

After the main function returns, release the lock.


#### Misc. functions {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

This function provides callers with the current state of the exchange. Notice that Solidity functions [can return multiple
values](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

This internal function transfers an amount of ERC20 tokens from the exchange to somebody else. `SELECTOR` specifies
the function was are calling is `transfer(address,uint)` (see defintion above). 

To avoid having to import an interface for the token function, we "manually" create the call using one of the 
[ABI functions](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

There are two ways in which this call can fail:

1. Revert. If a call to an external contract reverts than the boolean return value is `false`
2. End normally but report a failure. In that case the return value buffer has a non-zero length, and when decoded as a boolean value it is `false`

If either of these conditions happen, revert.

#### {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

These two events are emitted when a liquidity provider either deposits liquidity (`Mint`) or withdraws it (`Burn`). In
either case, the amounts of token0 and token1 that are deposited or withdrawn are part of the event, as well as the identity
of the account that called us (`sender`). In the case of a withdrawal, the event also includes the target that received
the tokens (`to`), which may not be the same as the sender.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

This event is emitted when a trader swaps one token for the other. Again, the sender and the destination may not be the same.
Each token may be either sent to the exchange, or received from it.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Finally, `Sync` is emitted every time tokens are added or withdrawn, regardless of the reason, to provide the latest reserve information.


#### Setup Functions {#pair-setup}

These functions are supposed to be called once when the new pair exchange is set up.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

The constructor makes sure we'll keep track of the address of the factory that created the pair. This
information is required for `initialize` and for the factory fee (if one exists)

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

This function allows the factory (and only the factory) to specify the two ERC-20 tokens that this pair will exchange.


#### Update Functions {#pair-update}

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```    

This function is called every time tokens are deposited or withdrawn.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

If the update makes either balance higher than 2^111 (so it would be interpreted as a negative number) refuse
to do it to prevent overflows. With a normal token that can be subdivided into 10^18 units, this means each
exchange is limited to about 2.5\*10^15 of each tokens. So far that has not been a problem.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {        
```

If the time elapsed is not zero, it means we are the first exchange transaction on this block. In that case,
we need to update the cost accumulators. 

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Each cost accumulator is updated with the latest cost (<reserve of the other token>/<reserve of this token>) times the elapsed time
in seconds. To get an average price you read the cumulative price is two points in time, and divide by the time difference
between them. For example, assume this sequence of events:


| Event                                                    |  reserve0       | reserve1         | timestamp | Marginal exchange rate (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- |       --------: |      ----------: | --------- | ----: | ---: |
| Initial setup                                            |     1,000.000   |        1,000.000 | 5,000 | 1.000 |  0 |
| Trader A deposits 50 token0 and gets 47.619  token1 back |     1,050.000   |          952.381 | 5,020 | 0.907 | 20 |
| Trader B deposits 10 token0 and gets  8.984  token1 back |     1,060.000   |          943.396 | 5,030 | 0.890 | 20+10\*0.907 = 29.07 | 
| Trader C deposits 40 token0 and gets 34.305  token1 back |     1,100.000   |          909.090 | 5,100 | 0.826 | 29.07+70\*0.890 = 91.37 |
| Trader D deposits 100 token1 and gets 109.01 token0 back |       990.990   |        1,009.090 | 5,110 | 1.018 | 91.37+10\*0.826 = 99.63 |
| Trader E deposits 10 token0 and gets 10.079 token1 back  |     1,000.990   |          999.010 | 5,150 | 0.998 | 99.63+40\*1.1018 = 143.702 |

Lets say we want to calculate the average price of **Token0** between the timestamps 5,030 and 5,150. The difference in the value of
`price0Culumative` is 143.702-29.07=114.632. However, this is the average across two minutes (120 seconds). So the average price is
114.632/120 = 0.955.

This price calculation is the reason we need to know the old reserve sizes.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Finally, update the global variables and emit a `Sync` event.


```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
        uint _kLast = kLast; // gas savings
        if (feeOn) {
            if (_kLast != 0) {
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }

    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
        address _token0 = token0;
        address _token1 = token1;
        require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
        if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
        if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
        if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));
        }
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
        uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
        uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
        require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }

    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol  {#UniswapV2Factory}
### UniswapV2ERC20.sol    {#UniswapV2ERC20}


## The Periphery Contracts {#periphery-contracts}

### UniswapV2Migrator.sol  {#UniswapV2Migrator}
### UniswapV2Router01.sol  {#UniswapV2Router01}
### UniswapV2Router02.sol  {#UniswapV2Router02} 


## The Libraries {#libraries}

The [SafeMath library](https://docs.openzeppelin.com/contracts/2.x/api/math) is well documented, so there's no need
to document it here.


### Math {#Math}

This library contains some math functions that are not normally needed in Solidity code.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}
```


### Fixed Point Fractions (UQ112x112)    {#FixedPoint}

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://en.wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;

    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }

    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```


## Conclusion {#Conclusion}
