---
title: "如何使用 Echidna 测试智能合约"
description: "如何使用 Echidna 自动测试智能合约"
author: "Trailofbits"
lang: zh
tags: [ "Solidity", "智能合同", "安全性。", "测试", "模糊测试" ]
skill: advanced
breadcrumb: "Echidna"
published: 2020-04-10
source: "构建安全的合约"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 安装 {#installation}

Echidna 可以通过 docker 安装，或使用预编译的二进制文件安装。

### 通过 docker 安装 Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最后一个命令在一个可访问你当前目录的 docker 中运行 eth-security-toolbox。 你可以从主机更改文件，并在 docker 中对文件运行工具_

在 docker 中运行：

```bash
solc-select 0.5.11
cd /home/training
```

### 二进制文件 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 基于属性的模糊测试简介 {#introduction-to-property-based-fuzzing}

Echidna 是一款基于属性的模糊测试工具，我们在之前的博文（[1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)）中介绍过它。

### 模糊测试 {#fuzzing}

[模糊测试](https://wikipedia.org/wiki/Fuzzing)是安全领域众所周知的一项技术。 它通过生成或多或少随机的输入来查找程序中的漏洞。 用于传统软件的模糊测试工具（例如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)）是公认的高效查漏洞工具。

除了纯粹随机地生成输入外，还有许多技术和策略可用于生成优质输入，其中包括：

- 从每次执行中获取反馈，并用其指导生成。 例如，如果新生成的输入导致发现一条新路径，那么生成与其相近的新输入就是有意义的。
- 根据结构化约束生成输入。 例如，如果你的输入包含一个带校验和的标头，那么让模糊测试工具生成能够验证该校验和的输入就是有意义的。
- 使用已知输入生成新输入：如果你有权访问一个有效输入的大型数据集，你的模糊测试工具可以从中生成新的输入，而不是从头开始生成。 这些通常称为_种子_。

### 基于属性的模糊测试 {#property-based-fuzzing}

Echidna 属于一种特定的模糊测试工具：基于属性的模糊测试，其深受 [QuickCheck](https://wikipedia.org/wiki/QuickCheck) 的启发。 与试图查找程序崩溃的传统模糊测试工具不同，Echidna 试图破坏用户定义的不变量。

在智能合约中，不变量是 Solidity 函数，可以表示合约可能达到的任何不正确或无效状态，包括：

- 访问控制不正确：攻击者成为合约的所有者。
- 状态机不正确：合约暂停时仍可转移代币。
- 算法不正确：用户可以下溢其余额并获得无限的免费代币。

### 用 Echidna 测试属性 {#testing-a-property-with-echidna}

我们将了解如何使用 Echidna 测试智能合约。 目标是以下智能合约 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

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

我们假设此代币必须具有以下属性：

- 任何人最多可以持有 1000 个代币
- 该代币不能转移（它不是 ERC20 代币）

### 编写属性 {#write-a-property}

Echidna 属性是 Solidity 函数。 一个属性必须：

- 没有参数
- 如果成功，返回 `true`
- 名称以 `echidna` 开头

Echidna 将：

- 自动生成任意交易来测试属性。
- 报告导致属性返回 `false` 或抛出错误的任何交易。
- 调用属性时放弃副作用（即，如果该属性更改了状态变量，该更改将在测试后被放弃）

以下属性检查调用者持有的代币不超过 1000 个：

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

使用继承将合约与属性分开：

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) 实现了该属性并继承自该代币。

### 初始化合约 {#initiate-a-contract}

Echidna 需要一个没有参数的[构造函数](/developers/docs/smart-contracts/anatomy/#constructor-functions)。 如果你的合约需要特定初始化，你需要在构造函数中完成。

Echidna 中有一些特定地址：

- 调用构造函数的地址是 `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`。
- 随机调用其他函数的地址是 `0x10000`、`0x20000` 和 `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`。

在我们当前的示例中，我们不需要任何特定的初始化，因此我们的构造函数是空的。

### 运行 Echidna {#run-echidna}

启动 Echidna 的命令是：

```bash
echidna-test contract.sol
```

如果 contract.sol 包含多个合约，你可以指定目标：

```bash
echidna-test contract.sol --contract MyContract
```

### 总结：测试属性 {#summary-testing-a-property}

下面总结了我们示例中 Echidna 的运行情况：

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

Echidna 发现如果调用 `backdoor`，就会违反该属性。

## 在模糊测试活动期间筛选要调用的函数 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我们将了解如何筛选要进行模糊测试的函数。
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

这个小例子迫使 Echidna 找到一个特定的交易序列来改变状态变量。
这对模糊测试工具来说很困难（建议使用符号执行工具，例如 [Manticore](https://github.com/trailofbits/manticore)）。
我们可以运行 Echidna 来验证这一点：

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 筛选函数 {#filtering-functions}

Echidna 难以找到测试此合约的正确序列，因为两个重置函数（`reset1` 和 `reset2`）会将所有状态变量设置为 `false`。
但是，我们可以使用一项特殊的 Echidna 功能，将重置函数列入黑名单，或者只将 `f`、`g`、
`h` 和 `i` 函数列入白名单。

要将函数列入黑名单，我们可以使用此配置文件：

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

筛选函数的另一种方法是列出白名单中的函数。 为此，我们可以使用此配置文件：

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- 默认情况下，`filterBlacklist` 为 `true`。
- 筛选将仅按名称执行（不带参数）。 如果你有 `f()` 和 `f(uint256)`，过滤器 `"f"` 将同时匹配这两个函数。

### 运行 Echidna {#run-echidna-1}

使用配置文件 `blacklist.yaml` 运行 Echidna：

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

Echidna 几乎会立即找到可证伪该属性的交易序列。

### 总结：筛选函数 {#summary-filtering-functions}

在模糊测试活动期间，Echidna 可以使用以下命令将函数列入黑名单或白名单：

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna 开始模糊测试活动，根据 `filterBlacklist` 布尔值，它要么将 `f1`、`f2` 和 `f3` 列入黑名单，要么只调用这些函数。

## 如何用 Echidna 测试 Solidity 的 assert {#how-to-test-soliditys-assert-with-echidna}

在这个简短教程中，我们将演示如何使用 Echidna 测试合约中的断言检查。 假设我们有这样一个合约：

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

我们希望确保在 `tmp` 返回其差值之后，它小于或等于 `counter`。 我们可以编写一个
Echidna 属性，但需要将 `tmp` 值存储在某个地方。 相反，我们可以使用如下断言：

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

### 运行 Echidna {#run-echidna-2}

要启用断言失败测试，请创建 [Echidna 配置文件](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
checkAsserts: true
```

当我们在 Echidna 中运行此合约时，会获得预期结果：

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

如你所见，Echidna 在 `inc` 函数中报告了一些断言失败。 每个函数可以添加多个断言，但 Echidna 无法判断哪个断言失败了。

### 何时以及如何使用断言 {#when-and-how-use-assertions}

断言可以用作显式属性的替代方法，尤其是在待检查条件与某个操作 `f` 的正确使用直接相关时。 在某些代码之后添加断言将强制在该代码执行后立即进行检查：

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

相反，使用显式的 Echidna 属性将随机执行交易，并且无法轻松地强制在何时检查。 但还是可以做以下变通的：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

但是，也存在一些问题：

- 如果 `f` 声明为 `internal` 或 `external`，则会失败。
- 不清楚应该使用哪些参数来调用 `f`。
- 如果 `f` 回滚，该属性将会失败。

通常，我们建议遵循 [John Regehr 的建议](https://blog.regehr.org/archives/1091) 来使用断言：

- 在进行断言检查时不要强制任何副作用。 例如： `assert(ChangeStateAndReturn() == 1)`
- 不要断言明显的语句。 例如 `assert(var >= 0)`，其中 `var` 声明为 `uint`。

最后，请**不要用** `require` 代替 `assert`，因为 Echidna 无法检测到它（但合约仍会回滚）。

### 总结：断言检查 {#summary-assertion-checking}

下面总结了我们示例中 Echidna 的运行情况：

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

Echidna 发现，如果使用大参数多次调用此函数，`inc` 中的断言可能会失败。

## 收集和修改 Echidna 语料库 {#collecting-and-modifying-an-echidna-corpus}

我们将了解如何用 Echidna 收集和使用交易语料库。 目标是以下智能合约 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

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

这个小例子迫使 Echidna 找到特定值来改变状态变量。 这对模糊测试工具来说很困难
（建议使用符号执行工具，例如 [Manticore](https://github.com/trailofbits/manticore)）。
我们可以运行 Echidna 来验证这一点：

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

但是，在运行此模糊测试活动时，我们仍然可以使用 Echidna 来收集语料库。

### 收集语料库 {#collecting-a-corpus}

要启用语料库收集，请创建一个语料库目录：

```bash
mkdir corpus-magic
```

以及一个 [Echidna 配置文件](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
coverage: true
corpusDir: "corpus-magic"
```

现在，我们可以运行工具并检查收集到的语料库：

```bash
echidna-test magic.sol --config config.yaml
```

Echidna 仍然找不到正确的 magic 值，但我们可以查看它收集的语料库。
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

显然，此输入不会触发我们属性中的失败。 但是，在下一步中，我们将了解如何为此修改它。

### 为语料库提供种子 {#seeding-a-corpus}

Echidna 需要一些帮助才能处理 `magic` 函数。 我们将复制并修改输入以使用其
合适的参数：

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

我们将修改 `new.txt` 来调用 `magic(42,129,333,0)`。 现在，我们可以重新运行 Echidna：

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

这一次，它立即发现违反了该属性。

## 查找高燃料消耗的交易 {#finding-transactions-with-high-gas-consumption}

我们将了解如何使用 Echidna 查找高燃料消耗的交易。 目标是以下智能合约：

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

这里的 `expensive` 可能有很大的燃料消耗。

目前，Echidna 总是需要一个属性来测试：这里 `echidna_test` 总是返回 `true`。
我们可以运行 Echidna 来验证这一点：

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 测量燃料消耗 {#measuring-gas-consumption}

要使用 Echidna 测量燃料消耗，请创建配置文件 `config.yaml`：

```yaml
estimateGas: true
```

在这个例子中，我们还将减少交易序列的大小，以使结果更易于理解：

```yaml
seqLen: 2
estimateGas: true
```

### 运行 Echidna {#run-echidna-3}

创建好配置文件之后，我们就可以这样运行 Echidna：

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

- 所示燃料是由 [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) 提供的估算值。

### 筛选出减少燃料的调用 {#filtering-out-gas-reducing-calls}

上面关于**在模糊测试活动中筛选要调用的函数**的教程介绍了如何从测试中移除某些函数。  
这对于获得准确的燃料估算至关重要。
请考虑下面的示例：

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

如果 Echidna 可以调用所有函数，它将无法轻松找到消耗大量燃料的交易：

```
echidna-test pushpop.sol --config config.yaml
...
pop 最多使用 10746 燃料
...
check 最多使用 23730 燃料
...
clear 最多使用 35916 燃料
...
push 最多使用 40839 燃料
```

这是因为成本取决于 `addrs` 的大小，而随机调用往往会使数组几乎为空。
将 `pop` 和 `clear` 加入黑名单却给我们带来了更好的结果:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push 最多使用 40839 燃料
...
check 最多使用 1484472 燃料
```

### 总结：查找高燃料消耗的交易 {#summary-finding-transactions-with-high-gas-consumption}

Echidna 可以使用 `estimateGas` 配置选项找到消耗大量燃料的交易：

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

模糊测试结束后，Echidna 将报告每个函数中消耗燃料最多的交易。
