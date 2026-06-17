---
title: "如何使用埃基德纳 (Echidna) 测试智能合约"
description: "如何使用埃基德纳自动测试智能合约"
author: Trailofbits
lang: zh
tags:
  - Solidity
  - 智能合约
  - 安全
  - 测试
  - 模糊测试
skill: advanced
breadcrumb: "埃基德纳"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 安装 {#installation}

可以通过 Docker 或使用预编译的二进制文件来安装埃基德纳。

### 通过 Docker 安装埃基德纳 {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最后一条命令在 Docker 中运行 eth-security-toolbox，该 Docker 可以访问你当前的目录。你可以从主机更改文件，并在 Docker 中对这些文件运行工具_

在 Docker 内部，运行：

```bash
solc-select 0.5.11
cd /home/training
```

### 二进制文件 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 基于属性的模糊测试简介 {#introduction-to-property-based-fuzzing}

埃基德纳是一个基于属性的模糊测试工具，我们在之前的博客文章中对其进行了描述（[1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)）。

### 模糊测试 {#fuzzing}

[模糊测试](https://wikipedia.org/wiki/Fuzzing)是安全社区中一项众所周知的技术。它包括生成或多或少随机的输入，以发现程序中的错误。用于传统软件的模糊测试工具（例如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)）被认为是发现错误的有效工具。

除了纯粹随机生成输入之外，还有许多技术和策略可以生成良好的输入，包括：

- 从每次执行中获取反馈并利用它来指导生成。例如，如果新生成的输入导致了新路径的发现，那么生成接近它的新输入是有意义的。
- 遵循结构约束生成输入。例如，如果你的输入包含带有校验和的标头，那么让模糊测试工具生成验证校验和的输入是有意义的。
- 使用已知输入生成新输入：如果你可以访问大量有效输入的数据集，你的模糊测试工具可以从中生成新输入，而不是从头开始生成。这些通常被称为_种子 (seeds)_。

### 基于属性的模糊测试 {#property-based-fuzzing}

埃基德纳属于一个特定的模糊测试工具家族：深受 [QuickCheck](https://wikipedia.org/wiki/QuickCheck) 启发的基于属性的模糊测试。与试图寻找崩溃的经典模糊测试工具相反，埃基德纳将尝试打破用户定义的不变量。

在智能合约中，不变量是 Solidity 函数，它可以表示合约可能达到的任何不正确或无效的状态，包括：

- 不正确的访问控制：攻击者成为了合约的所有者。
- 不正确的状态机：在合约暂停时可以转移代币。
- 不正确的算术运算：用户的余额可能发生下溢，从而获得无限的免费代币。

### 使用埃基德纳测试属性 {#testing-a-property-with-echidna}

我们将了解如何使用埃基德纳测试智能合约。目标是以下智能合约 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

我们将假设该代币必须具有以下属性：

- 任何人最多只能拥有 1000 个代币
- 该代币不能被转移（它不是 ERC-20 代币）

### 编写属性 {#write-a-property}

埃基德纳属性是 Solidity 函数。一个属性必须：

- 没有参数
- 如果成功，则返回 `true`
- 其名称以 `echidna` 开头

埃基德纳将：

- 自动生成任意交易来测试该属性。
- 报告任何导致属性返回 `false` 或抛出错误的交易。
- 在调用属性时丢弃副作用（即，如果属性更改了状态变量，则在测试后将其丢弃）

以下属性检查调用者拥有的代币是否不超过 1000 个：

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

使用继承将你的合约与你的属性分开：

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) 实现了该属性并继承自该代币。

### 初始化合约 {#initiate-a-contract}

埃基德纳需要一个没有参数的[构造函数](/developers/docs/smart-contracts/anatomy/#constructor-functions)。如果你的合约需要特定的初始化，你需要在构造函数中进行。

埃基德纳中有一些特定的地址：

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` 调用构造函数。
- `0x10000`、`0x20000` 和 `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` 随机调用其他函数。

在我们当前的示例中，我们不需要任何特定的初始化，因此我们的构造函数是空的。

### 运行埃基德纳 {#run-echidna}

使用以下命令启动埃基德纳：

```bash
echidna-test contract.sol
```

如果 contract.sol 包含多个合约，你可以指定目标：

```bash
echidna-test contract.sol --contract MyContract
```

### 总结：测试属性 {#summary-testing-a-property}

以下总结了埃基德纳在我们示例上的运行情况：

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

埃基德纳发现，如果调用 `backdoor`，则该属性会被违反。

## 在模糊测试活动期间过滤要调用的函数 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我们将了解如何过滤要进行模糊测试的函数。
目标是以下智能合约：

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

这个小示例迫使埃基德纳找到特定的交易序列来更改状态变量。
这对于模糊测试工具来说很困难（建议使用像 [曼蒂科尔 (Manticore)](https://github.com/trailofbits/manticore) 这样的符号执行工具）。
我们可以运行埃基德纳来验证这一点：

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 过滤函数 {#filtering-functions}

埃基德纳很难找到正确的序列来测试此合约，因为两个重置函数（`reset1` 和 `reset2`）会将所有状态变量设置为 `false`。
但是，我们可以使用特殊的埃基德纳功能将重置函数列入黑名单，或者仅将 `f`、`g`、
`h` 和 `i` 函数列入白名单。

要将函数列入黑名单，我们可以使用此配置文件：

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

过滤函数的另一种方法是列出白名单函数。为此，我们可以使用此配置文件：

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` 默认为 `true`。
- 过滤将仅按名称执行（不带参数）。如果你有 `f()` 和 `f(uint256)`，则过滤器 `"f"` 将匹配这两个函数。

### 运行埃基德纳 {#run-echidna-1}

要使用配置文件 `blacklist.yaml` 运行埃基德纳：

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

埃基德纳将几乎立即找到证伪该属性的交易序列。

### 总结：过滤函数 {#summary-filtering-functions}

埃基德纳可以使用以下方法在模糊测试活动期间将要调用的函数列入黑名单或白名单：

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

根据 `filterBlacklist` 布尔值，埃基德纳启动模糊测试活动，要么将 `f1`、`f2` 和 `f3` 列入黑名单，要么仅调用这些函数。

## 如何使用埃基德纳测试 Solidity 的断言 {#how-to-test-soliditys-assert-with-echidna}

在这个简短的教程中，我们将展示如何使用埃基德纳来测试合约中的断言检查。假设我们有这样一个合约：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### 编写断言 {#write-an-assertion}

我们希望确保在返回差值后，`tmp` 小于或等于 `counter`。我们可以编写一个埃基德纳属性，但我们需要将 `tmp` 的值存储在某个地方。相反，我们可以使用像这样的断言：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### 运行埃基德纳 {#run-echidna-2}

要启用断言失败测试，请创建一个[埃基德纳配置文件](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
checkAsserts: true
```

当我们在埃基德纳中运行此合约时，我们获得了预期的结果：

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

如你所见，埃基德纳报告了 `inc` 函数中的一些断言失败。每个函数可以添加多个断言，但埃基德纳无法分辨哪个断言失败了。

### 何时以及如何使用断言 {#when-and-how-use-assertions}

断言可以用作显式属性的替代方案，特别是当要检查的条件与某些操作 `f` 的正确使用直接相关时。在某些代码之后添加断言将强制在执行后立即进行检查：

```solidity
function f(..) public {
    // 一些复杂的代码
    ...
    assert (condition);
    ...
}

```

相反，使用显式的埃基德纳属性将随机执行交易，并且没有简单的方法来强制准确地在何时进行检查。仍然可以采用这种变通方法：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

但是，存在一些问题：

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
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

埃基德纳发现，如果使用大参数多次调用此函数，`inc` 中的断言可能会失败。

## 收集和修改埃基德纳语料库 {#collecting-and-modifying-an-echidna-corpus}

我们将了解如何使用埃基德纳收集和使用交易语料库。目标是以下智能合约 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

这个小示例迫使埃基德纳找到某些值来更改状态变量。这对于模糊测试工具来说很困难
（建议使用像 [曼蒂科尔 (Manticore)](https://github.com/trailofbits/manticore) 这样的符号执行工具）。
我们可以运行埃基德纳来验证这一点：

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

但是，在运行此模糊测试活动时，我们仍然可以使用埃基德纳来收集语料库。

### 收集语料库 {#collecting-a-corpus}

要启用语料库收集，请创建一个语料库目录：

```bash
mkdir corpus-magic
```

以及一个[埃基德纳配置文件](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
coverage: true
corpusDir: "corpus-magic"
```

现在我们可以运行我们的工具并检查收集到的语料库：

```bash
echidna-test magic.sol --config config.yaml
```

埃基德纳仍然无法找到正确的魔法值，但我们可以查看它收集的语料库。
例如，其中一个文件是：

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

显然，此输入不会触发我们属性中的失败。但是，在下一步中，我们将了解如何对其进行修改以实现该目的。

### 为语料库提供种子 {#seeding-a-corpus}

埃基德纳需要一些帮助才能处理 `magic` 函数。我们将复制并修改输入，为其使用合适的参数：

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

我们将修改 `new.txt` 以调用 `magic(42,129,333,0)`。现在，我们可以重新运行埃基德纳：

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

这一次，它立即发现该属性被违反了。

## 寻找高 Gas 消耗的交易 {#finding-transactions-with-high-gas-consumption}

我们将了解如何使用埃基德纳寻找高 Gas 消耗的交易。目标是以下智能合约：

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

在这里，`expensive` 可能会有很大的 Gas 消耗。

目前，埃基德纳总是需要一个属性来测试：这里的 `echidna_test` 总是返回 `true`。
我们可以运行埃基德纳来验证这一点：

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 测量 Gas 消耗 {#measuring-gas-consumption}

要使用埃基德纳启用 Gas 消耗测量，请创建一个配置文件 `config.yaml`：

```yaml
estimateGas: true
```

在这个示例中，我们还将减小交易序列的大小，以使结果更容易理解：

```yaml
seqLen: 2
estimateGas: true
```

### 运行埃基德纳 {#run-echidna-3}

创建配置文件后，我们可以像这样运行埃基德纳：

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- 显示的 Gas 是由 [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) 提供的估算值。

### 过滤掉减少 Gas 的调用 {#filtering-out-gas-reducing-calls}

上面关于**在模糊测试活动期间过滤要调用的函数**的教程展示了如何从测试中移除某些函数。  
这对于获得准确的 Gas 估算至关重要。
考虑以下示例：

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

如果埃基德纳可以调用所有函数，它将不容易找到具有高 Gas 成本的交易：

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

这是因为成本取决于 `addrs` 的大小，而随机调用往往会使数组几乎为空。
然而，将 `pop` 和 `clear` 列入黑名单会给我们带来更好的结果：

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### 总结：寻找高 Gas 消耗的交易 {#summary-finding-transactions-with-high-gas-consumption}

埃基德纳可以使用 `estimateGas` 配置选项寻找高 Gas 消耗的交易：

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

一旦模糊测试活动结束，埃基德纳将报告每个函数具有最大 Gas 消耗的序列。