---
title: 如何使用 Echidna 测试智能合约
description: 如何使用 Echidna 自动测试智能合约
author: "Trailofbits"
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "安全性"
  - "测试"
  - "模糊测试"
skill: intermediate
published: 2020-04-10
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 安装 {#installation}

Echidna 可以通过 docker 或使用预编译的二进制程序安装。

### 通过 docker 安装 Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最后一个命令在有权访问当前目录的 docker 中运行 eth-security-toolbox。 您可以从主机更改文件，并在 docker 中对文件运行工具_

在 docker 中，运行：

```bash
solc-select 0.5.11
cd /home/training
```

### 通过二进制程序安装 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 基于属性的模糊测试简介 {#introduction-to-property-based-fuzzing}

Echidna 是一个模糊测试工具，我们在之前的博客中描述过（[1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)）。

### 模糊测试 {#fuzzing}

[模糊测试](https://wikipedia.org/wiki/Fuzzing)是一项在安全技术领域广为人知的技术。 它依靠生成或多或少数量的随机输入值来测试程序中的错误。 传统软件中的模糊测试工具（例如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)）是发现错误的有效工具。

除了完全随机生成输入值外，还有很多其他的技巧和策略来生成足够好的输入，包括：

- 从每次执行中获取反馈，并使用反馈来指导输入的生成。 例如，如果新生成的输入导致发现一条新的路径，那么，生成接近该路径的新输入是有意义的。
- 根据结构限制生成输入。 例如，如果您的输入包含一个带有校验和的报文头，则让模糊测试工具生成能够验证校验和的输入将会是很有意义的。
- 使用已知输入生成新输入：如果您有权访问一个有效输入的大型数据集， 则模糊测试工具可以从中生成新的输入，而不是从头开始生成。 这些通常称为 _种子_。

### 基于属性的模糊测试 {#property-based-fuzzing}

Echidna 属于一种特定的模糊测试工具系列：基于属性的模糊测试，很大程度上受到了 [QuickCheck](https://wikipedia.org/wiki/QuickCheck) 的启发。 与尝试查找崩溃的经典模糊测试工具不同，Echedna 会试图去改变用户定义的不变量。

在智能合约中，不变量是 Solidity 函数，可以表示合约可能达到的任何错误或无效状态，包括：

- 不正确的访问控制：攻击者变成了合约的所有者。
- 不正确的状态机：合约暂停时代币仍然可以传输。
- 不正确的算法：用户可以余额不足的情况下获得无限的免费代币。

### 使用 Echidna 测试属性 {#testing-a-property-with-echidna}

我们来看看如何使用 Echidna 测试智能合约。 目标是以下智能合约 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

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

我们假定此代币必须具有以下属性：

- 任何人最多可以持有 1000 代币
- 代币不能转移（它不是 ERC20 代币）

### 写入属性 {#write-a-property}

Echidna 的属性是 Solidity 函数。 一个属性必须：

- 没有任何参数
- 如果成功就返回 `true`
- 其名字以 `echidna` 开头

Echidna 将：

- 自动生成任意交易来测试属性。
- 报告导致属性返回 `false` 或引发错误的任何交易。
- 调用属性时丢弃负面影响（即，如果属性改变了一个状态变量，则在测试后会被丢弃）

以下属性会检查调用者持有的代币是否不超过 1000 个：

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

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) 实现了这个属性并继承了代币。

### 初始化合约 {#initiate-a-contract}

Echidna 需要一个无参 [构造函数](/developers/docs/smart-contracts/anatomy/#constructor-functions)。 如果您的合约需要特定的初始化，则需要相应地改变构造函数。

Echidna 中有一些特定的地址：

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` 用于调用构造函数。
- `0x10000`、`0x20000` 和 `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` 用于随机调用其他函数。

在当前的示例中，我们不需要进行任何特定的初始化，因为我们的构造函数是空的。

### 运行 Echidna {#run-echidna}

用此命令启动 Echidna：

```bash
echidna-test contract.sol
```

如果 contract.sol 包含多个合约，您可以指定目标合约：

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

如果 `backdoor` 被调用，Echidna 会发现与该属性发生冲突。

## 过滤在模糊测试期间要调用的函数 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我们来了解如何过滤要进行模糊测试的函数。 目标是以下智能合约：

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

这个小例子迫使 Echidna 找到特定的交易序列来改变一个状态变量。 这对一个模糊测试工具来说很困难（建议使用符号执行工具，比如 [Manticore](https://github.com/trailofbits/manticore)）。 我们可以运行 Echidna 对此进行验证：

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 过滤函数 {#filtering-functions}

Echidna 很难找到测试此合约的正确序列，因为两个重置函数（`reset1` 和 `reset2`）会将所有状态变量设置为 `false`。 但是，我们可以使用特殊的 Echidna 功能将重置函数列入黑名单，或者仅将 `f`、`g`、`h` 和 `i` 列入白名单。

要将函数列入黑名单，我们可以使用下面这个配置文件：

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

过滤函数的另一个方法是列出白名单里的函数。 为此，我们可以使用下面这个配置文件：

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- 默认情况下，`filterBlacklist` 为 `true`。
- 只能通过名字进行过滤（不带参数）。 如果您有 `f()` 和 `f(uint256)` 两个函数，则过滤器 `"f"` 会匹配出这两个函数。

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

Echidna 几乎立刻就可以找到伪造属性的交易序列。

### 总结：过滤函数 {#summary-filtering-functions}

在模糊测试期间，Echidna 可以将要调用的黑名单或白名单函数列入黑名单或白名单，方法是：

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

根据 `filterBlacklist` 布尔值的不同，Echidna 开始进行模糊测试时，要么将 `f1`、`f2` 和 `f3` 列入黑名单，要么只调用它们。

## 如何使用 Echidna 测试 Solidity 的断言 {#how-to-test-soliditys-assert-with-echidna}

在这个简短的教程中，我们将演示如何使用 Echidna 测试合约中的断言检查。 假设我们有这样一个合约：

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

### 写一个断言： {#write-an-assertion}

我们要确保 `tmp` 返回其差值之后，小于或等于 `counter`。 我们可以写一个 Echidna 属性，但我们需要将 `tmp` 值保存某处。 相反，我们可以使用如下断言：

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

当我们在 Echidna 上运行这个合约时，我们会获得预期的结果：

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

正如您所见，Echidna 在 `inc` 函数中报告了一些断言失败。 每个函数可以添加多个断言，但 Echidna 无法判断哪个断言失败了。

### 使用断言的时机和方式 {#when-and-how-use-assertions}

断言可以用作显示属性的替代项，特别是如果要检查的条件与某些操作 `f` 的正确使用直接相关。 在某些代码之后添加断言将强制在代码执行后立即进行检查：

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

相反， 使用显式的 Echidna 属性将随机执行交易，无法轻松地强制要求何时对其进行检查。 但还是可以做以下变通的：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

但是，也存在一些问题：

- 如果 `f` 被声明为 `internal` 或 `external` 则失败.
- 不清楚应该使用哪些参数来调用 `f`。
- 如果 `f` 回滚，属性将会失败。

一般来说，我们建议遵循 [John Regehr 关于如何使用断言的建议](https://blog.regehr.org/archives/1091)：

- 在进行断言检查时不要强制任何负面影响。 例如： `assert(ChangeStateAndReturn() == 1)`
- 不要断言明显的语句。 例如， 在 `assert(var >= 0)` 中，`var` 被声明为 `uint`。

最后，请**不要使用** `require` 代替 `assert`，因为 Echidna 将无法检测到它（但合约仍将回滚）。

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

## 收集和修改 Echidna 预料库 {#collecting-and-modifying-an-echidna-corpus}

我们来了解如何用 Echidna 收集和使用交易语料库。 目标是以下智能合约 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

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

这个小例子迫使 Echidna 找到一系列交易来改变一个状态变量。 这对一个模糊测试工具来说很困难（建议使用符号执行工具，比如 [Manticore](https://github.com/trailofbits/manticore)）。 我们可以运行 Echidna 对此进行验证：

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

然而，当我们运行该模糊测试活动时，我们仍然可以使用 Echidna 来收集语料库。

### 收集语料库 {#collecting-a-corpus}

为了启用语料库的收集，请创建一个语料目录：

```bash
mkdir corpus-magic
```

和一个 [Echidna 配置文件](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

现在，我们可以运行工具并检查收集到的语料库：

```bash
echidna-test magic.sol --config config.yaml
```

Echidna 仍然找不到正确的 magic 值，但我们可以看一看它收集到的语料库。 例如，其中一个文件是：

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

显然，此输入不会触发我们属性中的故障。 但是，在下一步，我们将看到如何对此进行修改。

### 为语料库生成种子 {#seeding-a-corpus}

Echidna 需要一些帮助才能处理 `magic` 函数。 我们将复制和修改输入以使用其合适的参数：

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

这一次，它立即发现与该属性发生了冲突。

## 查找消耗大量 gas 的交易 {#finding-transactions-with-high-gas-consumption}

我们来看看如何使用 Echidna 查找燃料消耗大的交易。 目标是以下智能合约：

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

这里的 `expensive` 可能会消耗大量 gas。

目前，Echidna 总是需要一个属性来测试：这里 `echidna_test` 始终返回 `true`。 我们可以运行 Echidna 对此进行验证：

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 测量 gas 消耗 {#measuring-gas-consumption}

要使用 Echidna 测量燃料消耗，请创建配置文件 `config.yaml`：

```yaml
estimateGas: true
```

在这个例子中，我们还将减少交易序列的大小，以使结果更易于理解：

```yaml
seqLen: 2
estimateGas: true
```

### Run Echidna {#run-echidna-3}

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

- 显示的 gas 是由 [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) 提供的估值。

### 过滤掉 gas 消耗减少的调用 {#filtering-out-gas-reducing-calls}

以上关于**在模糊测试活动期间过滤要调用的函数**的教程展示了如何从测试中删除一些函数。  
这对于获得准确的 gas 消耗至关重要。 请考虑下面的示例：

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

如果 Echidna 可以调用所有函数，它将无法轻松找到消耗大量 gas 的交易：

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

这是因为成本取决于 `addrs` 的大小，而随机调用往往会使数组几乎为空。 将 `pop` 和 `clear` 加入黑名单却给我们带来了更好的结果:

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

### 总结：查找消耗大量 gas 的交易 {#summary-finding-transactions-with-high-gas-consumption}

Echidna 可以使用 `estimateGas` 配置选项找到消耗大量 gas 的交易：

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

模糊测试结束后，Echidna 将报告每个函数中消耗 gas 最多的交易。
