---
title: "如何使用埃基德纳测试智能合约"
description: "如何使用埃基德纳自动测试智能合约"
author: "Trailofbits"
lang: zh
tags: ["Solidity", "智能合约", "安全", "测试", "模糊测试"]
skill: advanced
breadcrumb: "埃基德纳"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 安装 {#installation}

可以通过 Docker、Homebrew 或使用预编译的二进制文件来安装埃基德纳。本教程中的示例已在埃基德纳 2.3.3 和 solc 0.8.37 环境下进行了测试。

### 通过 Docker 安装埃基德纳 {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_最后一条命令在 Docker 中运行埃基德纳镜像，并允许其访问当前目录。你可以在主机上修改文件，并在 Docker 中对这些文件运行工具。该镜像还附带了 [斯莱瑟](https://github.com/crytic/slither)、[crytic-compile](https://github.com/crytic/crytic-compile) 和 [solc-select](https://github.com/crytic/solc-select)。_

在 Docker 内部，运行：

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### 二进制文件 {#binary}

从 [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) 下载适用于你平台的最新版本。在 macOS 或 Linux 上，你也可以运行 `brew install echidna`，这会一并安装斯莱瑟和 crytic-compile。

当使用发布版的二进制文件时，请自行安装 [斯莱瑟](https://github.com/crytic/slither) 和 [solc-select](https://github.com/crytic/solc-select)（例如在 Python 虚拟环境中运行 `pip3 install slither-analyzer solc-select`），并选择一个编译器版本：

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

埃基德纳可以在没有斯莱瑟的情况下运行，但斯莱瑟能够提取常量（例如 `require` 语句中使用的魔术数字），并且下面的一些示例依赖它来快速发现漏洞。

## 基于属性的模糊测试简介 {#introduction-to-property-based-fuzzing}

埃基德纳是一个基于属性的模糊测试工具，我们在之前的博客文章中对其进行了描述（[1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)）。

### 模糊测试 {#fuzzing}

[模糊测试](https://wikipedia.org/wiki/Fuzzing) 是安全社区中一项众所周知的技术。它通过生成或多或少随机的输入来发现程序中的漏洞。用于传统软件的模糊测试工具（如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)）被公认为是发现漏洞的高效工具。

除了纯粹随机生成输入之外，还有许多技术和策略可以生成高质量的输入，包括：

- 从每次执行中获取反馈，并利用它来指导生成。例如，如果新生成的输入导致了新路径的发现，那么生成与其相近的新输入是有意义的。
- 遵循结构约束生成输入。例如，如果你的输入包含带有校验和的标头，那么让模糊测试工具生成能够验证校验和的输入是有意义的。
- 使用已知输入生成新输入：如果你可以访问大量有效输入的数据集，你的模糊测试工具可以从中生成新输入，而不是从头开始生成。这些通常被称为*种子*。

### 基于属性的模糊测试 {#property-based-fuzzing}

埃基德纳属于一个特定的模糊测试工具家族：深受 [QuickCheck](https://wikipedia.org/wiki/QuickCheck) 启发的基于属性的模糊测试。与试图寻找崩溃的经典模糊测试工具不同，埃基德纳将尝试打破用户定义的不变量。

在智能合约中，不变量是 Solidity 函数，它可以表示合约可能达到的任何不正确或无效的状态，包括：

- 不正确的访问控制：攻击者成为了合约的所有者。
- 不正确的状态机：在合约暂停时可以转移代币。
- 不正确的算术运算：用户的余额可能发生下溢，从而获得无限的免费代币。

### 使用埃基德纳测试属性 {#testing-a-property-with-echidna}

我们将了解如何使用埃基德纳测试智能合约。目标是以下智能合约 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

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

我们假设该代币必须具备以下属性：

- 任何人最多只能拥有 1000 个代币
- 该代币不能被转移（它不是 ERC-20 代币）

### 编写属性 {#write-a-property}

埃基德纳属性是 Solidity 函数。一个属性必须：

- 没有参数
- 如果成功，则返回 `true`
- 名称以 `echidna` 开头

埃基德纳将：

- 自动生成任意交易来测试该属性。
- 报告任何导致属性返回 `false` 或抛出错误的交易。
- 在调用属性时丢弃副作用（即，如果属性更改了状态变量，则在测试后将其丢弃）

以下属性检查调用者拥有的代币是否不超过 1000 个：

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

使用继承将你的合约与属性分开：

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) 实现了该属性并继承自代币合约。

### 初始化合约 {#initiate-a-contract}

埃基德纳需要一个没有参数的[构造函数](/developers/docs/smart-contracts/anatomy/#constructor-functions)。如果你的合约需要特定的初始化，你需要在构造函数中进行。

埃基德纳中有一些特定的地址：

- `0x30000` 调用构造函数。
- `0x10000`、`0x20000` 和 `0x30000` 随机调用其他函数。
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` 是被测合约部署的地址。

在我们当前的示例中，不需要任何特定的初始化，因此我们的构造函数是空的。

### 运行埃基德纳 {#run-echidna}

启动埃基德纳的命令如下：

```sh
echidna contract.sol
```

如果 contract.sol 包含多个合约，你可以指定目标：

```sh
echidna contract.sol --contract MyContract
```

在终端中运行时，埃基德纳会显示一个交互式用户界面。添加 `--format text` 可以获得如下例所示的纯文本输出。

### 总结：测试属性 {#summary-testing-a-property}

以下总结了埃基德纳在我们示例上的运行情况：

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

埃基德纳发现，如果调用 `backdoor`，该属性就会被破坏。

## 在模糊测试活动中过滤要调用的函数 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我们将了解如何过滤要进行模糊测试的函数。
目标是以下智能合约：

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

这个小示例迫使埃基德纳找到特定的交易序列来更改状态变量。
这对模糊测试工具来说很困难。
我们可以运行埃基德纳来验证这一点：

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### 过滤函数 {#filtering-functions}

埃基德纳很难找到正确的序列来测试此合约，因为两个重置函数（`reset1` 和 `reset2`）会将所有状态变量设置为 `false`。
但是，我们可以使用埃基德纳的一个特殊功能，将重置函数列入黑名单，或者仅将 `f`、`g`、
`h` 和 `i` 函数列入白名单。

要将函数列入黑名单，我们可以使用此配置文件：

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

过滤函数的另一种方法是列出白名单函数。为此，我们可以使用此配置文件：

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` 默认为 `true`。
- 过滤是基于完整的函数名称执行的：合约名称、一个 `.` 以及应用程序二进制接口 (ABI) 签名（例如 `C.f(uint256)`）。如果你有 `f()` 和 `f(uint256)`，你可以准确选择要过滤哪一个。像 `"reset1"` 这样的裸名称不匹配任何内容。

### 运行埃基德纳 {#run-echidna-1}

要使用配置文件 `blacklist.yaml` 运行埃基德纳：

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

埃基德纳几乎会立即找到证伪该属性的交易序列。

### 总结：过滤函数 {#summary-filtering-functions}

埃基德纳可以在模糊测试活动中使用以下配置将要调用的函数列入黑名单或白名单：

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

埃基德纳启动模糊测试活动时，会根据 `filterBlacklist` 布尔值，将 `C.f1()`、`C.f2()` 和 `C.f3()` 列入黑名单，或者仅调用这些函数。

## 如何使用埃基德纳测试 Solidity 的断言 {#how-to-test-soliditys-assert-with-echidna}

在这个简短的教程中，我们将展示如何使用埃基德纳测试合约中的断言检查。假设我们有这样一个合约：

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

从 Solidity 0.8 开始，算术溢出默认会回退。 `unchecked` 块恢复了环绕行为，使得 `counter` 能够发生溢出，这正是我们希望埃基德纳发现的漏洞。

### 编写断言 {#write-an-assertion}

我们希望确保在返回差值后，`tmp` 小于或等于 `counter`。我们可以编写一个埃基德纳属性，但我们需要将 `tmp` 的值存储在某个地方。相反，我们可以使用如下断言：

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

### 运行埃基德纳 {#run-echidna-2}

要启用断言失败测试，请在命令行中传递 `--test-mode assertion`，或创建一个[埃基德纳配置文件](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`：

```yaml
testMode: assertion
```

当我们在埃基德纳中运行此合约时，我们获得了预期的结果：

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

如你所见，埃基德纳报告了 `inc` 函数中的一些断言失败。每个函数可以添加多个断言，但埃基德纳无法分辨是哪个断言失败了。

### 何时以及如何使用断言 {#when-and-how-use-assertions}

断言可以用作显式属性的替代方案，特别是当要检查的条件与某些操作 `f` 的正确使用直接相关时。在某些代码之后添加断言将强制在代码执行后立即进行检查：

```solidity
function f(..) public {
    // 一些复杂的代码
    ...
    assert (condition);
    ...
}

```

相反，使用显式的埃基德纳属性将随机执行交易，并且没有简单的方法来强制准确地在何时进行检查。不过仍然可以采用这种变通方法：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

然而，存在一些问题：

- 如果 `f` 被声明为 `internal` 或 `external`，它将失败。
- 不清楚应该使用哪些参数来调用 `f`。
- 如果 `f` 回退，该属性将失败。

通常，我们建议遵循 [John Regehr 关于如何使用断言的建议](https://blog.regehr.org/archives/1091)：

- 在断言检查期间不要强制产生任何副作用。例如：`assert(ChangeStateAndReturn() == 1)`
- 不要断言显而易见的语句。例如 `assert(var >= 0)`，其中 `var` 被声明为 `uint`。

最后，请**不要使用** `require` 代替 `assert`，因为埃基德纳将无法检测到它（但合约无论如何都会回退）。

### 总结：断言检查 {#summary-assertion-checking}

以下总结了埃基德纳在我们示例上的运行情况：

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

埃基德纳发现，如果使用大参数多次调用 `inc` 函数，其中的断言可能会失败。

## 收集和修改埃基德纳语料库 {#collecting-and-modifying-an-echidna-corpus}

我们将了解如何使用埃基德纳收集和使用交易语料库。目标是以下智能合约 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

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

这个小示例迫使埃基德纳找到特定的值来更改状态变量。这对模糊测试工具来说很困难。
我们可以运行埃基德纳来验证这一点：

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

但是，在运行此模糊测试活动时，我们仍然可以使用埃基德纳来收集语料库。

### 收集语料库 {#collecting-a-corpus}

要启用语料库收集，请创建一个语料库目录：

```sh
mkdir corpus-magic
```

以及一个[埃基德纳配置文件](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`：

```yaml
corpusDir: "corpus-magic"
```

现在我们可以运行我们的工具并检查收集到的语料库：

```sh
echidna magic.sol --config config.yaml
```

埃基德纳仍然无法找到正确的魔术值。要查看它卡在哪里，请查看 `corpus-magic/covered.*.txt` 覆盖率报告：

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` 标签表示埃基德纳到达了该行，但执行在那里回退了，并且最后一个 `require` 之后的行从未被执行。

埃基德纳收集的交易序列作为 JSON 文件存储在 `corpus-magic/coverage/` 中。例如，其中一个文件的第一笔交易是：

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

显然，此输入不会触发我们属性中的失败。但是，在下一步中，我们将了解如何对其进行修改以实现该目的。

### 播种语料库 {#seeding-a-corpus}

埃基德纳需要一些帮助才能处理 `magic` 函数。我们将复制并修改输入，为其使用合适的参数（文件名是随机的，因此请使用你自己 `corpus-magic/coverage/` 目录中的文件）：

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

我们将修改 `new.txt`，使其包含调用 `magic(42,129,333,0)` 的单笔交易。现在，我们可以重新运行埃基德纳：

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

这一次，它立即发现该属性被破坏了。

## 寻找高 Gas 消耗的交易 {#finding-transactions-with-high-gas-consumption}

我们将了解如何使用埃基德纳寻找高 Gas 消耗的交易。旧版本的埃基德纳有一个 `estimateGas` 选项用于此目的；它在埃基德纳 2.3.0 中被移除了。相反，我们使用 `gasleft()` 测量 Gas，并让埃基德纳的[优化模式](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html)将其最大化。目标是以下智能合约：

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

在这里，`expensive` 可能会有很大的 Gas 消耗。

### 测量 Gas 消耗 {#measuring-gas-consumption}

在优化模式下，埃基德纳会寻找以 `echidna_` 开头、不带参数且返回 `int256` 的函数，并尝试找到使返回值最大化的交易序列。我们添加一个测试合约，它调用 `f`，记录其使用的 Gas，并暴露最大值（将两个合约保存在 `gas.sol` 中）：

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

要启用优化模式，请创建一个配置文件 `config.yaml`。在这个示例中，我们还将减小交易序列的大小，以使结果更容易理解：

```yaml
testMode: optimization
seqLen: 2
```

### 运行埃基德纳 {#run-echidna-3}

创建配置文件后，我们可以像这样运行埃基德纳：

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- 显示的 Gas 是由埃基德纳运行的以太坊虚拟机 (EVM) 实现 [hevm](https://github.com/argotorg/hevm) 测量的，并且包含了来自 `measureF` 的内部调用的开销。
- 最大值不是唯一的：每次活动都是随机的，更长的活动（例如 `--test-limit 200000`）往往会找到更大的值。

### 过滤掉减少 Gas 的调用 {#filtering-out-gas-reducing-calls}

上面关于**在模糊测试活动中过滤要调用的函数**的教程展示了如何从测试中移除某些函数。
这对于获得准确的 Gas 估算至关重要。
考虑以下示例：

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

`echidna_opt_gas_check` 调用 `check` 并返回其 Gas 成本。像每个埃基德纳测试函数一样，它的状态更改随后会被丢弃。

如果埃基德纳可以调用所有函数，它将不容易找到具有高 Gas 成本的交易：

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

这是因为成本取决于 `addrs` 的大小，而随机调用往往会使数组几乎为空。
然而，将 `pop` 和 `clear` 列入黑名单，会给我们带来更好的结果：

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

缩小此结果的调用序列需要几分钟时间，因为每次重放都会调用昂贵的 `check` 函数。

### 总结：寻找高 Gas 消耗的交易 {#summary-finding-transactions-with-high-gas-consumption}

埃基德纳可以通过在返回 `int256` 的 `echidna_` 函数中使用 `gasleft()` 测量 Gas，并在优化模式下运行，来寻找高 Gas 消耗的交易：

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

模糊测试活动结束后，埃基德纳将报告找到的最大值以及产生该值的交易序列。
