---
title: How to use Echidna to test smart contracts
description: How to use Echidna to automatically test smart contracts
author: "Trailofbits"
lang: en
tags: ["solidity", "smart contracts", "security", "testing", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installation {#installation}

Echidna can be installed through docker, Homebrew or using the pre-compiled binary. The examples in this tutorial were tested with Echidna 2.3.3 and solc 0.8.37.

### Echidna through docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_The last command runs the Echidna image in a docker that has access to your current directory. You can change the files from your host, and run the tools on the files from the docker. The image also ships with [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) and [solc-select](https://github.com/crytic/solc-select)._

Inside docker, run:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binary {#binary}

Download the latest release for your platform from [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). On macOS or Linux you can also run `brew install echidna`, which installs Slither and crytic-compile along with it.

When using the release binary, install [Slither](https://github.com/crytic/slither) and [solc-select](https://github.com/crytic/solc-select) yourself (for example `pip3 install slither-analyzer solc-select` in a Python virtual environment) and select a compiler version:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna runs without Slither, but Slither extracts constants such as the magic numbers used in `require` statements, and several examples below depend on it to find bugs quickly.

## Introduction to property-based fuzzing {#introduction-to-property-based-fuzzing}

Echidna is a property-based fuzzer, we described in our previous blogposts ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) is a well-known technique in the security community. It consists of generating inputs that are more or less random to find bugs in the program. Fuzzers for traditional software (such as [AFL](http://lcamtuf.coredump.cx/afl/) or [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) are known to be efficient tools to find bugs.

Beyond the purely random generation of inputs, there are many techniques and strategies to generate good inputs, including:

- Obtain feedback from each execution and guide generation using it. For example, if a newly generated input leads to the discovery of a new path, it can make sense to generate new inputs closes to it.
- Generating the input respecting a structural constraint. For example, if your input contains a header with a checksum, it will make sense to let the fuzzer generates input validating the checksum.
- Using known inputs to generate new inputs: if you have access to a large dataset of valid input, your fuzzer can generate new inputs from them, rather than starting from scratch its generation. These are usually called _seeds_.

### Property-based fuzzing {#property-based-fuzzing}

Echidna belongs to a specific family of fuzzer: property-based fuzzing heavily inspired by [QuickCheck](https://wikipedia.org/wiki/QuickCheck). In contrast to classic fuzzer that will try to find crashes, Echidna will try to break user-defined invariants.

In smart contracts, invariants are Solidity functions, that can represent any incorrect or invalid state that the contract can reach, including:

- Incorrect access control: the attacker became the owner of the contract.
- Incorrect state machine: the tokens can be transferred while the contract is paused.
- Incorrect arithmetic: the user can underflow its balance and get unlimited free tokens.

### Testing a property with Echidna {#testing-a-property-with-echidna}

We will see how to test a smart contract with Echidna. The target is the following smart contract [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

We will make the assumption that this token must have the following properties:

- Anyone can have at maximum 1000 tokens
- The token cannot be transferred (it is not an ERC20 token)

### Write a property {#write-a-property}

Echidna properties are Solidity functions. A property must:

- Have no argument
- Return `true` if it is successful
- Have its name starting with `echidna`

Echidna will:

- Automatically generate arbitrary transactions to test the property.
- Report any transactions leading a property to return `false` or throw an error.
- Discard side-effect when calling a property (i.e., if the property changes a state variable, it is discarded after the test)

The following property checks that the caller has no more than 1000 tokens:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Use inheritance to separate your contract from your properties:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implements the property and inherits from the token.

### Initiate a contract {#initiate-a-contract}

Echidna needs a [constructor](/developers/docs/smart-contracts/anatomy/#constructor-functions) without argument. If your contract needs a specific initialization, you need to do it in the constructor.

There are some specific addresses in Echidna:

- `0x30000` which calls the constructor.
- `0x10000`, `0x20000`, and `0x30000` which randomly call the other functions.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` where the contract under test is deployed.

We do not need any particular initialization in our current example, as a result our constructor is empty.

### Run Echidna {#run-echidna}

Echidna is launched with:

```sh
echidna contract.sol
```

If contract.sol contains multiple contracts, you can specify the target:

```sh
echidna contract.sol --contract MyContract
```

When run in a terminal, Echidna shows an interactive UI. Add `--format text` to get plain text output like the examples below.

### Summary: Testing a property {#summary-testing-a-property}

The following summarizes the run of echidna on our example:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna found that the property is violated if `backdoor` is called.

## Filtering functions to call during a fuzzing campaign {#filtering-functions-to-call-during-a-fuzzing-campaign}

We will see how to filter the functions to be fuzzed.
The target is the following smart contract:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

This small example forces Echidna to find a certain sequence of transactions to change a state variable.
This is hard for a fuzzer.
We can run Echidna to verify this:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtering functions {#filtering-functions}

Echidna has trouble finding the correct sequence to test this contract because the two reset functions (`reset1` and `reset2`) will set all the state variables to `false`.
However, we can use a special Echidna feature to either blacklist the reset function or to whitelist only the `f`, `g`,
`h` and `i` functions.

To blacklist functions, we can use this configuration file:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Another approach to filter functions is to list the whitelisted functions. To do that, we can use this configuration file:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` is `true` by default.
- Filtering is performed on the full function name: the contract name, a `.`, and the ABI signature (for example `C.f(uint256)`). If you have `f()` and `f(uint256)`, you can pick exactly which one to filter. A bare name such as `"reset1"` matches nothing.

### Run Echidna {#run-echidna-1}

To run Echidna with a configuration file `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna will find the sequence of transactions to falsify the property almost immediately.

### Summary: Filtering functions {#summary-filtering-functions}

Echidna can either blacklist or whitelist functions to call during a fuzzing campaign using:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna starts a fuzzing campaign either blacklisting `C.f1()`, `C.f2()` and `C.f3()` or only calling these, according
to the value of the `filterBlacklist` boolean.

## How to test Solidity's assert with Echidna {#how-to-test-soliditys-assert-with-echidna}

In this short tutorial, we are going to show how to use Echidna to test assertion checking in contracts. Let's suppose we have a contract like this one:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Since Solidity 0.8, arithmetic overflows revert by default. The `unchecked` block restores the wrapping behavior so that `counter` can overflow, which is the bug we want Echidna to find.

### Write an assertion {#write-an-assertion}

We want to make sure that `tmp` is less or equal than `counter` after returning its difference. We could write an
Echidna property, but we will need to store the `tmp` value somewhere. Instead, we could use an assertion like this one:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Run Echidna {#run-echidna-2}

To enable the assertion failure testing, pass `--test-mode assertion` on the command line, or create an [Echidna configuration file](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

When we run this contract in Echidna, we obtain the expected results:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

As you can see, Echidna reports some assertion failure in the `inc` function. Adding more than one assertion per function is possible, but Echidna cannot tell which assertion failed.

### When and how use assertions {#when-and-how-use-assertions}

Assertions can be used as alternatives to explicit properties, specially if the conditions to check are directly related with the correct use of some operation `f`. Adding assertions after some code will enforce that the check will happen immediately after it was executed:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

On the contrary, using an explicit echidna property will randomly execution transactions and there is no easy way to enforce exactly when it will be checked. It is still possible to do this workaround:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

However, there are some issues:

- It fails if `f` is declared as `internal` or `external`.
- It is unclear which arguments should be used to call `f`.
- If `f` reverts, the property will fail.

In general, we recommend following [John Regehr's recommendation](https://blog.regehr.org/archives/1091) on how to use assertions:

- Do not force any side effect during the assertion checking. For instance: `assert(ChangeStateAndReturn() == 1)`
- Do not assert obvious statements. For instance `assert(var >= 0)` where `var` is declared as `uint`.

Finally, please **do not use** `require` instead of `assert`, since Echidna will not be able to detect it (but the contract will revert anyway).

### Summary: Assertion Checking {#summary-assertion-checking}

The following summarizes the run of echidna on our example:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna found that the assertion in `inc` can fail if this function is called multiple times with large arguments.

## Collecting and modifying an Echidna corpus {#collecting-and-modifying-an-echidna-corpus}

We will see how to collect and use a corpus of transactions with Echidna. The target is the following smart contract [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

This small example forces Echidna to find certain values to change a state variable. This is hard for a fuzzer.
We can run Echidna to verify this:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

However, we can still use Echidna to collect corpus when running this fuzzing campaign.

### Collecting a corpus {#collecting-a-corpus}

To enable the corpus collection, create a corpus directory:

```sh
mkdir corpus-magic
```

And an [Echidna configuration file](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Now we can run our tool and check the collected corpus:

```sh
echidna magic.sol --config config.yaml
```

Echidna still cannot find the correct magic values. To see where it gets stuck, look at the `corpus-magic/covered.*.txt` coverage report:

```text
  7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

The `r` label means Echidna reached the line but the execution reverted there, and the lines after the last `require` are never executed.

The transaction sequences Echidna collected are stored as JSON files in `corpus-magic/coverage/`. For instance, the first transaction of one of these files was:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Clearly, this input will not trigger the failure in our property. However, in the next step, we will see how to modify it for that.

### Seeding a corpus {#seeding-a-corpus}

Echidna needs some help in order to deal with the `magic` function. We are going to copy and modify the input to use suitable
parameters for it (the file names are random, so use one from your own `corpus-magic/coverage/` directory):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

We will modify `new.txt` so that it contains a single transaction calling `magic(42,129,333,0)`. Now, we can re-run Echidna:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

This time, it found that the property is violated immediately.

## Finding transactions with high gas consumption {#finding-transactions-with-high-gas-consumption}

We will see how to find the transactions with high gas consumption with Echidna. Older versions of Echidna had an `estimateGas` option for this; it was removed in Echidna 2.3.0. Instead, we measure gas with `gasleft()` and let Echidna's [optimization mode](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) maximize it. The target is the following smart contract:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Here `expensive` can have a large gas consumption.

### Measuring Gas Consumption {#measuring-gas-consumption}

In optimization mode, Echidna looks for functions starting with `echidna_` that take no argument and return an `int256`, and tries to find the sequence of transactions that maximizes the returned value. We add a test contract that calls `f`, records the gas it used, and exposes the maximum (save both contracts in `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

To enable optimization mode, create a configuration file `config.yaml`. In this example, we will also reduce the size of the transaction sequence to make the results easier to understand:

```yaml
testMode: optimization
seqLen: 2
```

### Run Echidna {#run-echidna-3}

Once we have the configuration file created, we can run Echidna like this:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- The gas shown is measured by the EVM implementation Echidna runs on, [hevm](https://github.com/argotorg/hevm), and includes the overhead of the internal call from `measureF`.
- The maximum is not unique: each campaign is random, and longer campaigns (for example `--test-limit 200000`) tend to find larger values.

### Filtering Out Gas-Reducing Calls {#filtering-out-gas-reducing-calls}

The tutorial on **filtering functions to call during a fuzzing campaign** above shows how to
remove some functions from your testing.  
This can be critical for getting an accurate gas estimate.
Consider the following example:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` calls `check` and returns its gas cost. Like every Echidna test function, its state changes are discarded afterwards.

If Echidna can call all the functions, it won't easily find transactions with high gas cost:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

That's because the cost depends on the size of `addrs` and random calls tend to leave the array almost empty.
Blacklisting `pop` and `clear`, however, gives us much better results:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Shrinking the call sequence for this result takes several minutes, because every replay calls the expensive `check` function.

### Summary: Finding transactions with high gas consumption {#summary-finding-transactions-with-high-gas-consumption}

Echidna can find transactions with high gas consumption by measuring gas with `gasleft()` in an `echidna_` function that returns an `int256`, and running in optimization mode:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna will report the maximum value found and the sequence of transactions that produced it, once the fuzzing campaign is over.
