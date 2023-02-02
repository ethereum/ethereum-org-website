---
title: 以太坊词汇表
description: 以太坊相关的技术和非技术术语不完全清单
lang: zh
sidebarDepth: 2
---

# 词汇表 {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### 51% 攻击 {#51-attack}

一种对去中心化[网络](#network)的攻击方式，一个群体获得了大多数[节点](#node)的控制权。 这将使他们能够通过逆转[交易](#transaction)和加倍花费 [ETH](#ether) 和其他 token 来欺诈区块链。

## A {#section-a}

### account 帐户 {#account}

帐户是一个对象，它包含[地址](#address)、余额、[nonce](#nonce)，并且存储了状态和代码（皆可为空）。 一个帐户可以是[合约帐户](#contract-account)，也可以是[外部帐户（EOA）](#eoa)。

<DocLink to="/developers/docs/accounts">
  以太坊帐户
</DocLink>

### 地址 {#address}

通常情况下，地址代表一个[外部账户](#eoa)或[合约账户](#contract-account)，可以在区块链上接收（目标地址）或发送（源地址）[交易](#transaction)。 更具体地说，它是 [ECDSA](#ecdsa) 的 [Keccak 哈希值](#keccak-256)[公钥](#public-key)的最右边 160 位。

### 应用程序二进制接口 (ABI) {#abi}

与以太坊生态系统中[合约](#contract-account)进行交互的标准方法，均来自区块链外部，用于合约间交互。

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  应用程序二进制接口
</DocLink>

### 应用程序接口 {#api}

应用程序接口 (API) 是关于如何使用软件的一组定义。 应用程序接口位于应用程序和 Web 服务器之间，有助于它们之间数据的传输。

### 专用集成电路 {#asic}

专用集成电路。 这通常指为加密货币挖矿定制的一种集成电路。

### assert 断言 {#assert}

在 [Solidity 语言里](#solidity)，`assert(false)` 被编译为 `0xfe`，这是一个无效操作码，会消耗完剩下的[燃料](#gas)并回滚所有变更。 当有 `assert()` 语句失效时，表明出现了非常严重且没有预料到的问题，你将需要修复代码。 应该使用 `assert()` 以避免此类永远不应发生的情况。

<DocLink to="/developers/docs/smart-contracts/security/">
  智能合约安全性
</DocLink>

### 认证 {#attestation}

验证者为[区块](#block)投票。 验证者必须证明区块，表明他们同意区块提出的状态。

<DocLink to="/developers/docs/consensus-mechanisms/pos/attestations/">
  认证
</DocLink>

<Divider />

## B {#section-b}

### 基础费 {#base-fee}

每个[区块](#block)都有一个称为“基础费”的底价。 用户必须支付此最低[燃料](#gas)费用，交易才能打包进入下一个区块。

<DocLink to="/developers/docs/gas/">
  燃料和费用
</DocLink>

### 信标链 {#beacon-chain}

信标链是为以太坊引入[权益证明](#pos)和[验证者](#validator)的区块链。 从 2020 年 11 月起，它和工作量证明模式下的以太坊主网并行运行，直到 2022 年 9 月两条链合并，形成现如今的以太坊。

<DocLink to="/upgrades/beacon-chain/">
  信标链
</DocLink>

### 大端序 {#big-endian}

一种按位计数的表示方式，其中高位字节保存在内存的低位地址中。 与之相反的是小端序，即低位字节保存在内存的低位地址中。

### 区块 {#block}

区块是一个由[区块提议者](#block-proposer)创建并通过点对点网络发送至其它节点的信息单元。 区块包含了要执行的交易列表和供[验证者](#validator)检查区块内数据是否有效的共识相关信息。 这使得节点可以更新它们对于以太坊状态的态势感知。

<DocLink to="/developers/docs/blocks/">
  区块
</DocLink>

### 区块浏览器 {#block-explorer}

一个界面，供用户搜索来自和有关区块链的信息， 包括检索个人交易、与特定地址相关的活动，以及有关网络的信息。

### 区块头 {#block-header}

区块头是一个包含区块本身以及区块内包含的交易摘要的元数据集合。

### 区块传播 {#block-propagation}

将经确认的区块传递到网络中所有其他节点的过程。

### 区块提议者 {#block-proposer}

被选中在特定[时隙](#slot)内创建一个区块的特定验证者。

### 区块奖励 {#block-reward}

奖励给新有效区块生产者的一定量以太币。

### 区块状态 {#block-status}

区块可以处于的状态。 可能的状态包括：

- 被提议：区块被一个验证者提议
- 被提上日程：验证者正在提交数据
- 被错过/跳过：提议者没有在有效的时间范围内提议一个区块
- 被抛弃：区块被分叉选择机制移出

### 区块时间 {#block-time}

相邻两个区块被添加进区块链的时间间隔。

### 区块验证 {#block-validation}

检查一个新区块包含的交易是否合法以及区块是否处于最长合法链上的过程。

### 区块链 {#blockchain}

一个由许多[区块](#block)组成的序列，每个区块都链接至它的前一个区块，直至[创世区块](#genesis-block)。 区块链的完整性由基于权益证明共识机制通过经济的加密方式提供保证。

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  什么是区块链？
</DocLink>

### 引导节点 {#bootnode}

可以在运行节点时用来启动发现过程的节点。 这些节点的端点记录在以太坊源代码中。

### 字节码 {#bytecode}

由软件解释程序或虚拟机为实现高效执行而设计的抽象指令集。 与人类可读源代码不同，字节码以数字格式表示。

### 拜占庭分叉 {#byzantium-fork}

[大都市](#hard-fork)开发阶段的头两次[硬分叉](#metropolis)。 拜占庭分叉包含了 EIP-649 大都市[难度炸弹](#difficulty-bomb)延迟和区块奖励减额，其中，[冰河世纪](#ice-age)被延迟了 1 年，区块奖励从 5 个以太币减少为 3 个。

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG 是一种权益证明共识协议，与 [LMD-GHOST](#lmd-ghost) 分叉选择算法一起使用，使[共识客户端](#consensus-client)能够就信标链头达成一致。

### 检查点 {#checkpoint}

[信标链](#beacon-chain)的节奏分为时隙（12 秒）和时段（32 个时隙）， 每个时段的第一个时隙即为检查点。 当[绝大多数](#supermajority)验证者对两个检查点之间的联系加以证明时，即可认为这两个检查点[合理](#justification)。之后，当另一个检查点也被认为合理后，就可以[最终确定](#finality)这些检查点。

### 编译 {#compiling}

将用高级编程语言（例如，[Solidity](#solidity)）编写的代码转换为低级语言（例如，以太坊虚拟机[字节码](#bytecode)）。

<DocLink to="/developers/docs/smart-contracts/compiling/">
  编译智能合约
</DocLink>

### 委员会 {#committee}

在每个时隙中被分配用于验证区块的一组[验证者](#validator)（至少 128 个）。 委员会中的验证者之一是聚合者，负责聚合委员会中所有其他同意某项认证的验证者的签名。

### 计算不可行性 {#computational-infeasibility}

如果一个过程对任何可能有兴趣实施它的人来说需要不切实际的漫长时间（例如数十亿年），那么这个过程在计算上就是不可行的。

### 共识 {#consensus}

当网络中绝大多数节点经本地验证的最长区块链都具有相同的区块时，称为共识。 请勿与[共识机制](#consensus-rules)混淆。

### 共识客户端 {#consensus-client}

共识客户端（例如 Prysm、Teku、Nimbus、Lighthouse、Lodestar）运行以太坊的[权益证明](#pos)共识算法，使网络能够就信标链头达成一致。 共识客户端不参与验证/广播交易或执行状态转换。 这些操作由[执行客户端](#execution-client)完成。

### 共识层 {#consensus-layer}

以太坊的共识层是[共识客户端](#consensus-client)网络。

### 共识机制 {#consensus-rules}

全节点遵循的与其他节点保持共识的区块验证规则。 请勿与[共识](#consensus)混淆。

### 君士坦丁堡分叉 {#constantinople-fork}

这是[大都市](#metropolis)阶段的第二部分，最初计划在 2018 年中进行。 除了其他的变更以外，预计还包含转而采用[工作量证明](#pow)/[权益证明](#pos)混合共识算法。

### 合约帐户 {#contract-account}

一个包含代码的帐户，只要接收到来自其他[帐户](#account)（[外部帐户](#eoa)或[合约](#contract-account)）的[交易](#transaction)，就会执行该代码。

### 合约创建交易 {#contract-creation-transaction}

一种特殊的[交易](#transaction)，用于注册[合约](#contract-account)并将其记录在以太坊区块链上，而交易的接收者为[零地址](#zero-address)。

### 加密经济学 {#cryptoeconomics}

加密货币经济学。

## D {#section-d}

### Đ {#D-with-stroke}

Đ（D 加一笔）在古英语、中世纪英语、冰岛语和法罗语中代表大写字母“Eth”。 Đ 用于 ĐEV 或 Đapp（去中心化应用程序）等词，其中 Đ 是古挪威语字母“eth”。 大写的 eth (Ð) 也用于表示加密货币 Dogecoin（狗狗币）。 这种用法在较早的以太坊文献中很常见，但如今很少使用。

### 有向无环图 {#DAG}

DAG 代表有向无环图。 它是由节点和节点之间的链接组成的数据结构。 以太坊在其[工作量证明](#proof-of-work)算法 [Ethash](#ethash) 中使用了有向无环图。

### 去中心化应用程序 {#dapp}

Dapp 是去中心化应用程序。 从狭义上来说，去中心化应用程序是一个[智能合约](#smart-contract)和一个网页用户界面。 从广义上来讲，它是建立在开放、去中心化、点对点基础设施服务之上的网页应用程序。 此外，许多去中心化应用程序包括去中心化存储和/或报文协议及平台。

<DocLink to="/developers/docs/dapps/">
  去中心化应用程序简介
</DocLink>

### 数据可用性 {#data-availability}

一种状态属性，任何连接到网络的节点都可以下载它们所期望状态的任何特定部分。

### 去中心化 {#decentralization}

取消由中心实体控制和执行流程的概念。

### 去中心化自治组织 (DAO) {#dao}

不采用分级管理来运作的公司或其他组织。 DAO 可能还指一份名为“The DAO”的合约。该合约在 2016 年 4 月 30 日发布，后来在 2016 年 6 月遭受黑客攻击；这件事最终在 1,192,000 区块引发了一次[硬分叉](#hard-fork)（代码名称为 DAO）。此次分叉回滚了被攻击的 DAO 合约，并导致分为以太坊和以太坊经典两个互相竞争的系统。

<DocLink to="/dao/">
  去中心化自治组织 (DAO)
</DocLink>

### 去中心化交易所 (DEX) {#dex}

一种[去中心化应用程序](#dapp)，让人们可以在网络上交换代币。 你需要有[以太币](#ether)才能使用去中心化交易所（以支付[交易费](#transaction-fee)），但它们不像中心化交易所那样受地理限制，而是任何人都可以参与。

<DocLink to="/get-eth/#dex">
  去中心化交易所
</DocLink>

### 契约 {#deed}

请参见[非同质化代币 (NFT)](#nft)

### 存款合约 {#deposit-contract}

在以太坊上的质押门户。 存款合约是以太坊上的智能合约，它接受以太币存款并管理验证者余额。 验证者如果不将以太币存入该合约，便无法激活。 合约需要提供以太币和输入数据。 该输入数据包括由验证者私钥签名的验证者公钥和提款公钥。 [权益证明](#pos)网络需要这些数据来识别和批准验证者。

### 去中心化金融 {#defi}

DeFi 是“去中心化金融”的缩写，是一种广义的[去中心化应用程序](#dapp)，旨在提供由区块链提供支持的金融服务，无需中介，任何人只需要互联网连接就可以参与。

<DocLink to="/defi/">
  去中心化金融 (DeFi)
</DocLink>

### 难度 {#difficulty}

一项涉及全网的设置，用来控制在[工作量证明](#pow)网络中产生一个有效随机数所需的计算量。

### 难度炸弹 {#difficulty-bomb}

计划的使[工作量证明](#pow)[难度](#difficulty)呈指数级别增长的设置，旨在促进向[权益证明](#pos)的过渡，并减少发生[分叉](#hard-fork)的几率。 难度炸弹在[合并](/upgrades/merge/)时被移除。

### 数字签名 {#digital-signatures}

用户使用[私钥](#private-key)为文档生成的一串短数据，这样任何有对应[公钥](#public-key)、签名和文档的人都能验证 (1) 文档由该特定私钥的所有者“签名”，以及 (2) 文档在签名后未作修改。

<Divider />

### 发现 {#discovery}

以太坊节点查找其他节点进行连接的过程。

### 分布式哈希表 (DHT) {#distributed-hash-table}

包含 `(key, value)` 对的数据结构，以太坊节点使用该数据对来识别要连接的对等方，并确定使用哪些协议进行通信。

### 双重支付 {#double-spend}

一个蓄意的区块链分叉，其中拥有足够多挖矿算力/质押的用户会发送交易，将一些货币转移到链下（例如退出进行法币交易或进行链下购买），然后重组区块链以删除该交易。 成功的双重支付让攻击者同时拥有链上和链下资产。

## E {#section-e}

### 椭圆曲线数字签名算法 (ECDSA) {#ecdsa}

以太坊使用的一种加密算法，用于确保资金只能被其所有者使用， 是创建公钥和私钥的首选方法。 该算法与帐户[地址](#address)的生成和[交易](#transaction)验证有关。

### 加密 {#encryption}

加密是指将电子数据转换为除正确的解密密钥所有者以外，任何人都无法读取的形式。

### 熵 {#entropy}

在加密学里，是指缺乏可预测性或随机性水平。 在生成密钥信息，例如[私钥](#private-key)时，算法经常需要依赖于提供高熵的信源，以确保其输出具有不可预测性。

### 时段 {#epoch}

32 个[时隙](#slot)（6.4 分钟）的周期。 为了确保安全，每个时段会将[验证者](#validator)[委员会](#committee)打乱重组。 每个时段都有机会让链[最终确定](#finality)。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  权益证明
</DocLink>

### 模棱两可 {#equivocation}

验证者发送两条相互矛盾的消息。 一个简单的例子是交易发送者发送两笔具有相同随机数的交易。 另一个示例是区块提议者在相同的区块高度（或为相同的时隙）提议两个区块。

### 以太坊 1 {#eth1}

“以太坊 1”是指主网以太坊，即现有的工作量证明区块链。 该术语已弃用，取而代之的是“执行层”。 [详细了解此名称更改](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)。

<DocLink to="/upgrades/">
  有关以太坊升级的更多信息
</DocLink>

### 以太坊 2 {#eth2}

“以太坊 2”是指以太坊协议的一系列升级，包括以太坊到权益证明的过渡。 该术语已弃用，取而代之的是“共识层”。 [详细了解此名称更改](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)。

<DocLink to="/upgrades/">
  有关以太坊升级的更多信息
</DocLink>

### 以太坊改进提案 (EIP) {#eip}

为以太坊社区提供信息的一种设计文档，描述提议的新功能，或者其流程或环境（请参见[以太坊意见征求](#erc)）。

<DocLink to="/eips/">
  以太坊改进提案介绍
</DocLink>

### 以太坊域名服务 (ENS) {#ens}

以太坊域名服务注册表是一个中心[合约](#smart-contract)，提供从域名到所有者和解析器的映射，如 [EIP](#eip) 137 中所述。

[更多信息请参考 ens.domains](https://ens.domains)

### 执行客户端 {#execution-client}

执行客户端（以前称为“以太坊 1 客户端”），例如 Besu、Erigon、go-ethereum、Nethermind，负责处理和广播交易以及管理以太坊的状态。 执行客户端为[以太坊虚拟机](#evm)中的每笔交易运行计算，以确保遵守协议规则。

### 执行层 {#execution-layer}

以太坊的执行层是[执行客户端](#execution-client)网络。

### 外部帐户 (EOA) {#eoa}

外部帐户 (EOA) 是由控制帐户[私钥](#private-key)的用户所管理的[帐户](#account)，通常使用[助记词](#hd-wallet-seed)生成。 外部帐户是没有任何关联代码的帐户。 通常，这些帐户与[钱包](#wallet)一起使用。

### 以太坊征求意见 (ERC) {#erc}

一种标签，应用于一些试图定义以太坊具体使用标准的[以太坊改进提案](#eip)。

<DocLink to="/eips/">
  以太坊改进提案介绍
</DocLink>

### Ethash {#ethash}

一个在以太坊转换为[权益证明](#pos)之前应用于以太坊的[工作量证明](#pow)算法。

[了解更多](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash)

### 以太币 {#ether}

以太坊生态系统中使用的原生加密货币，用来支付执行交易时的[燃料](#gas)开销。 以太币也写作 ETH 或符号形式 Ξ，这是希腊字母 Xi 的大写。

<DocLink to="/eth/">
  我们数字未来的货币
</DocLink>

### 事件 {#events}

允许使用[以太坊虚拟机](#evm)日志记录工具。 [去中心化应用程序](#dapp)可以监听事件，并在用户界面使用事件触发 JavaScript 回调。

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  事件和日志
</DocLink>

### 以太坊虚拟机 (EVM) {#evm}

可执行[字节码](#bytecode)的基于堆栈的虚拟机。 在以太坊，执行模型指定了在给定一系列字节码指令和一小组环境数据的情况下如何改变系统状态。 这一操作通过虚拟状态机的形式模型指定。

<DocLink to="/developers/docs/evm/">
  以太坊虚拟机
</DocLink>

### 以太坊虚拟机汇编语言 {#evm-assembly-language}

以太坊虚拟机[字节码](#bytecode)的一种人类可读形式。

<Divider />

## F {#section-f}

### 回退函数 {#fallback-function}

在缺失数据或无法匹配函数名称时调用的默认函数。

### 水龙头 {#faucet}

通过[智能合约](#smart-contract)执行的服务，免费提供测试网可用的测试以太币。

<DocLink to="/developers/docs/networks/#testnet-faucets">
  测试网水龙头
</DocLink>

### 最终确定性 {#finality}

最终确定性是在给定时间之前，一组交易不会变更且无法回滚的保证。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  权益证明最终确定性
</DocLink>

### Finney {#finney}

[以太币](#ether)的一种计量单位。 1 finney = 10<sup>15</sup> [wei](#wei)。 10<sup>3</sup> finney = 1 个以太币。

### 分叉 {#fork}

由于协议更改而引发另一条链的生成，或由于时间差异而产生两条潜在的区块路径。

### 分叉选择算法 {#fork-choice-algorithm}

用于识别区块链头的算法。 在执行层，链头为其后总难度最大的一条。 这意味着真正的链头需要最多工作才能开采。 在共识层，该算法会观察来自验证者的累积认证 ([LMD_GHOST](#lmd-ghost))。

### 欺诈证明 {#fraud-proof}

特定[二层网络](#layer-2)解决方案的安全模型。在此模型中，为了加快交易速度，交易成批[卷叠](#rollups)，并在单笔交易中提交给以太坊。 交易默认有效，但如果怀疑有欺诈行为，可以对它们提出质疑。 之后，欺诈证明会运行交易，以确定是否发生欺诈。 这种方法在保证安全性的同时可能增加交易量。 部分[卷叠](#rollups)采用的是[有效性证明](#validity-proof)。

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  乐观卷叠
</DocLink>

### 边境 {#frontier}

以太坊的初始测试开发阶段，从 2015 年 7 月持续到 2016 年 3 月。

<Divider />

## G {#section-g}

### 燃料 {#gas}

以太坊中为执行智能合约所消耗的虚拟“燃料”。 [以太坊虚拟机](#evm)使用一种记账机制来衡量燃料用量，以限制算力资源的消耗（参见[图灵完备](#turing-complete)）。

<DocLink to="/developers/docs/gas/">
  燃料和费用
</DocLink>

### 燃料限制 {#gas-limit}

一笔[交易](#transaction)或一个[区块](#block)所能消耗的最大[燃料](#gas)量。

### 燃料价格 {#gas-price}

交易中指定的一单位燃料的以太币价格。

### 创世区块 {#genesis-block}

[区块链](#blockchain)上第一个区块，用于初始化特定的网络及其加密货币。

### Geth {#geth}

Go Ethereum， 以太坊协议最重要的实现之一，使用 Go 语言编写。

[更多信息请访问 geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei 的缩写，[以太币](#ether)的一种计量单位，通常用于[燃料](#gas)价格。 1 gwei = 10<sup>9</sup> [wei](#wei)。 10<sup>9</sup> gwei = 1 个以太币。

<Divider />

## H {#section-h}

### 硬分叉 {#hard-fork}

[区块链](#blockchain)中的永久性分歧；也称为硬分叉变化。 当未升级节点无法验证由遵循更新[共识机制](#consensus-rules)的已升级节点所创建的区块时，通常会发生硬分叉。 请勿与分叉、软分叉、软件分叉或 Git 分叉相混淆。

### 哈希 {#hash}

可变长度输入的固定长度数字指纹，由哈希函数生成。 （参见 [keccak-256](#keccak-256)）。

### 哈希率 {#hash-rate}

运行挖矿软件的计算机每秒进行的哈希计算次数。

### 身份钱包 {#hd-wallet}

使用分层确定性 (HD) 密钥创建和转账协议的[钱包](#wallet)。

[更多信息请访问 github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### 身份钱包种子 {#hd-wallet-seed}

用来生成身份[钱包](#wallet)的主[私钥](#private-key)与主链代码的值。 钱包种子可以用助记词表示，方便大家复制、备份及恢复私钥。

### 家园 {#homestead}

以太坊的第二个开发阶段，于 2016 年 3 月在区块 1,150,000 上启动。

<Divider />

## I {#section-i}

### 索引 {#index}

一种网络结构，旨在通过提供其存储源的高效路径来优化跨[区块链](#blockchain)的信息查询。

### 可交换客户端地址协议 (ICAP) {#icap}

一种以太坊地址编码方式，与国际银行账号 (IBAN) 编码部分兼容，为以太坊地址提供经过校验和校验、可互操作的多用途编码。 ICAP 地址使用一个新的 IBAN 伪国家代码-XE（全称是“扩展以太坊”），如非管辖货币中的 XE（如 XBT、XRP、XCP）。

### 冰河世纪 {#ice-age}

以太坊在区块 200,000 的[硬分叉](#hard-fork)，此分叉引入了指数级[难度](#difficulty)增加（又称为[难度炸弹](#difficulty-bomb)），促进了到[权益证明](#pos)的过渡。

### 集成开发环境 (IDE) {#ide}

通常将代码编辑器、编译器、运行时和调试器合并在一起的用户界面。

<DocLink to="/developers/docs/ides/">
  集成开发环境
</DocLink>

### 部署代码不可改变问题 {#immutable-deployed-code-problem}

[合约](#smart-contract)（或[库](#library)）的代码一经部署，便不可更改。 标准软件开发实践依赖于能够修复可能的错误并增加新的功能，但这对智能合约的开发而言是一个挑战。

<DocLink to="/developers/docs/smart-contracts/deploying/">
  部署智能合约
</DocLink>

### 内部交易 {#internal-transaction}

[交易](#transaction)从一个[合约帐户](#contract-account)发送到另一个合约帐户或一个[外部帐户](#eoa)（参见[消息](#message)）。

<Divider />

### 发行

铸造新的以太币以奖励区块提议、认证和举报。

## K {#section-k}

### 密钥导出函数 (KDF) {#kdf}

也称为“密码拉伸算法”。[密钥库](#keystore-file)格式使用该算法，通过反复散列密码短语，防范针对密码短语加密的暴力破解、字典和彩虹表攻击。

<DocLink to="/developers/docs/smart-contracts/security/">
  智能合约安全性
</DocLink>

### 密钥库 {#keyfile}

每个帐户的私钥/地址对作为单个密钥文件存在于以太坊客户端中。 这些是 JSON 文本文件，其中包含帐户的加密私钥，只能使用在帐户创建期间输入的密码进行解密。

### keccak-256 {#keccak-256}

以太坊中使用的加密[哈希](#hash)函数。 Keccak-256 是从 [SHA](#sha)-3 标准演化而来。

<Divider />

## L {#section-l}

### 二层网络 {#layer-2}

一个开发领域，专注于以太坊协议上的分层改进。 这些改进关系到[交易](#transaction)速度、[交易费](#transaction-fee)的削减以及交易隐私。

<DocLink to="/layer-2/">
  二层网络
</DocLink>

### LevelDB {#level-db}

实现为轻量级单用途[库](#library)的开源磁盘键值对存储库，可以绑定到多个平台。

### 库 {#library}

一种特殊类型的[合约](#smart-contract)，没有可支付函数，没有回退函数，也没有数据存储。 因此，它不能接收或持有以太币，也不能存储数据。 库可用作之前部署的代码，其他合约可以调用此代码以用于只读计算。

<DocLink to="/developers/docs/smart-contracts/libraries/">
  智能合约库
</DocLink>

### 轻量客户端 {#light-client}

一种以太坊客户端，不存储[区块链](#blockchain)的本地副本，也不验证区块和[交易](#transaction)。 它提供[钱包](#wallet)的功能，并可以创建和广播交易。

<Divider />

### LMD_GHOST {#lmd-ghost}

以太坊共识客户端用于识别链头的[分叉选择算法](#fork-choice-algorithm)。 LMD-GHOST 是“Latest Message Driven Greediest Heaviest Observed SubTree”（最新消息驱动的最贪婪、最重的被观察子树）的首字母缩写，这意味着链头是其创建以来[认证](#attestation)积累最多的区块。

## M {#section-m}

### 主网 {#mainnet}

"main network"（主网）的缩写，是主要的公共以太坊[区块链](#blockchain)。 它具有真正的以太币、真正的价值和真正的共识。 在讨论[二层网络](#layer-2)扩容解决方案时，主网也被称为一层网络。 （另请参见[测试网](#testnet)）

<DocLink to="/developers/docs/networks/">
  以太坊网络
</DocLink>

### 内存困难 {#memory-hard}

内存困难函数是指当可用内存量略微减少时，速度或可行性便会急剧下降的进程。 以太坊挖矿算法 [Ethash](#ethash) 就是一个例子。

### 默克尔帕特里夏树 {#merkle-patricia-tree}

以太坊用于高效存储键值对的数据结构。

### 消息 {#message}

一种[内部交易](#internal-transaction)，永不会被序列化，且仅在[以太坊虚拟机](#evm)中发送。

### 消息调用 {#message-call}

将[消息](#message)从一个帐户传递到另一个帐户的行为。 如果目标帐户与[以太坊虚拟机](#evm)代码相关联，则将根据该对象的状态和要处理的消息启动虚拟机。

### 大都市 {#metropolis}

以太坊的第三个开发阶段，于 2017 年 10 月启动。

### 挖矿 {#mining}

在以太坊区块链上验证交易和合同执行的过程，以换取开采每个区块的以太币奖励。 这是以太坊在迁移到[权益证明](#pos)之前用来保障安全性的方法。

### 矿池 {#mining-pool}

一个由[工作量证明](#pow)机制下的矿工组成的资源池，这些矿工共享他们的处理算力，并瓜分所获得的[区块奖励](#block-reward)。

### 矿工 {#miner}

通过不断执行哈希算法，为新区块找到有效[工作量证明](#pow)的网络[节点](#node)（参见 [Ethash](#ethash)）。 矿工不再是以太坊的一部分，在以太坊迁移至[权益证明](#pos)后他们已被验证者所取代。

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  挖矿
</DocLink>

### 铸币 {#mint}

铸币是创建新代币并将其投入流通以供使用的过程。 这是一种去中心化机制，可以在没有中央机构参与的情况下创建新代币。

<Divider />

## N {#section-n}

### 网络 {#network}

指以太坊网络，一种向每个以太坊节点（网络参与者）传播交易和区块的对等网络。

<DocLink to="/developers/docs/networks/">
  网络
</DocLink>

### 网络哈希率 {#network-hashrate}

整个以太坊挖矿网络产生的总[哈希率](#hashrate)。 在以太坊迁移至[权益证明](#pos)后，以太坊上的挖矿活动也已被停止。

### 非同质化代币 (NFT) {#nft}

也叫“契约”，是由 ERC-721 提案提出的代币标准。 非同质化代币既能跟踪也可以交易，但每个代币都是独一无二的，不可互换，这与以太币和 [ERC-20 代币](#token-standard)不同。 非同质化代币能够代表数字或物理资产的所有权。

<DocLink to="/nft/">
  非同质化代币 (NFT)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  ERC-721 非同质化代币标准
</DocLink>

### 节点 {#node}

参与网络的软件客户端。

<DocLink to="/developers/docs/nodes-and-clients/">
  节点和客户端
</DocLink>

### 随机数 {#nonce}

在密码学中，是指只能使用一次的值。 帐户随机数是每个帐户中的交易计数器，用于防范重放攻击。

<Divider />

## O {#section-o}

### 叔块 {#ommer}

当工作量证明下的[矿工](#miner)找到一个合法的[区块](#block)时，其它矿工可能已经发布了一个竞争区块并首先添加到了区块链的末端。 这个有效但已过时的区块可以被更新的区块纳为*叔块*，并可以领取部分区块奖励。 对于父区块的同级区块来说，“ommer”一词不分性别，因而为首选，但有时也被称为“uncle”（叔）。 叔块仅在[工作量证明](pow)下的以太坊网络中有意义，在[权益证明](#pos)下的以太坊中不存在，因为后者在每个时隙中有且仅有一个区块提议者会被选中。

### 乐观卷叠 {#optimistic-rollup}

使用[欺诈证明](#rollups)的交易的[卷叠](#fraud-proof)，在使用[主网](#layer-2)（一层网络）提供的安全性的同时，提供了更高的[二层网络](#mainnet)交易吞吐量。 与[以太坊 Plasma 扩容解决方案](#plasma)（一种相似的二层网络解决方案）不同，乐观卷叠可以处理更复杂的交易类型 -- [以太坊虚拟机](#evm)中任何可能的交易。 与[零知识卷叠](#zk-rollups)相比，乐观卷叠确实存在延迟问题，因为可以通过欺诈证明来质疑交易。

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  乐观卷叠
</DocLink>

### 预言机 {#oracle}

预言机是[区块链](#blockchain)与真实世界之间的桥梁。 预言机起到链上[应用程序接口](#api)的作用，可以向其查询信息，也可在[智能合约](#smart-contract)中使用。

<DocLink to="/developers/docs/oracles/">
  预言机
</DocLink>

<Divider />

## P {#section-p}

### 奇偶校验 {#parity}

以太坊客户端软件最棒的可互操作实现之一。

### 对等体 {#peer}

运行具有相同[区块链](#blockchain)副本的以太坊客户端软件的联网计算机。

### 对等网络 {#peer-to-peer-network}

一个由计算机（[对等体](#peer)）组成，无需基于服务器的中心服务即可共同执行功能的网络。

### 以太坊 Plasma 扩容解决方案 {#plasma}

使用[欺诈证明](#fraud-proof)的链下扩容解决方案，例如[乐观卷叠](#optimistic-rollups)。 以太坊 Plasma 扩容解决方案仅限于简单交易，例如基本的代币转账和交换。

<DocLink to="/developers/docs/scaling/plasma">
  以太坊 Plasma 扩容解决方案
</DocLink>

### 私钥（密钥） {#private-key}

一个密码，可使以太坊用户通过生成数字签名来证明对某个帐户或合约的所有权（参见[公钥](#public-key)、[地址](#address)、[椭圆曲线数字签名算法](#ecdsa)）。

### 私有链 {#private-chain}

完全私有的区块链是一种需要访问权限的区块链，不能公开使用。

### 权益证明 (PoS) {#pos}

加密货币区块链协议用以实现分布式[共识](#consensus)的方法。 权益证明要求用户证明自己拥有一定数量的加密货币（他们在网络中的“质押”），以便能够参与交易的验证。

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  权益证明
</DocLink>

### 工作量证明 (PoW) {#pow}

需要大量计算才能得出的数据（证明）。

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  工作量证明
</DocLink>

### 公钥 {#public-key}

通过[私钥](#private-key)的单向函数派生的数字。公钥可以公开共享，并被任何人用于验证使用相应私钥签署的数字签名。

<Divider />

## R {#section-r}

### 收据 {#receipt}

收据是以太坊客户端返回的数据，用来表示特定[交易](#transaction)的结果，其中包含交易的[哈希](#hash)、交易的[区块](#block)号、实际[燃料](#gas)消耗量；如果部署了[智能合约](#smart-contract)，则还会返回该合约的[地址](#address)。

### 重入攻击 {#re-entrancy-attack}

此攻击包含一种攻击者合约，该合约会调用受害者合约函数，使得在执行期间，受害者会再次调用攻击者合约，如此循环往复。 这可能导致的结果包括：通过跳过受害者合约中更新余额或计算提款金额的部分来盗窃资金。

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  重入攻击
</DocLink>

### 奖励 {#reward}

每个新区块中包含的以太币奖励，由以太坊网络奖励给找到相应[工作量证明](#pow)解决方案的[矿工](#miner)。

### 递归长度前缀编码 (RLP) {#rlp}

以太坊开发者设计的编码标准，用于对具有任意复杂性和长度的对象（数据结构）进行编码和序列化。

### 卷叠 {#rollups}

一种[二层网络](#layer-2)扩容解决方案，将多笔交易分批提交到[以太坊主链](#mainnet)的单笔交易中。 这样可以降低[燃料](#gas)成本，增加[交易](#transaction)吞吐量。 部分乐观卷叠和零知识卷叠使用不同的安全方法来提供这些扩容效益。

<DocLink to="/developers/docs/scaling/#rollups">
  卷叠
</DocLink>

<Divider />

### 远程过程调用 {#rpc}

**远程过程调用 (RPC) **是一种协议，供程序用于向位于网络中另一台计算机上的程序请求服务，而无需了解网络的详细信息。

## S {#section-s}

### 安全哈希算法 (SHA) {#sha}

由美国国家标准和技术研究所 (NIST) 推出的系列加密哈希函数。

### 宁静 {#serenity}

启动了一组扩容和可持续性升级的以太坊开发阶段，以前称为“以太坊 2.0”或“以太坊 2”。

<DocLink to="/upgrades/">
  以太坊升级
</DocLink>

### 序列化 {#serialization}

将数据结构转换为字节序列的过程。

### 分片/分片链 {#shard}

分片链是整个区块链中验证者的子集可以负责的离散部分。 这将为以太坊提供更高的交易吞吐量，并提高[二层网络](#layer-2)解决方案（如[乐观卷叠](#optimistic-rollups)和[零知识卷叠](#zk-rollups)）的数据可用性。

<DocLink to="/upgrades/shard-chains">
  分片链
</DocLink>

### 侧链 {#sidechain}

一种扩容解决方案，使用具有不同[共识机制](#consensus-rules)（通常速度更快）的单独链。 要将这些侧链连接到[主网](#mainnet)，需要用到链桥。 [卷叠](#rollups)也使用侧链，但是它们可以与[主网](#mainnet)协作运行。

<DocLink to="/developers/docs/scaling/sidechains/">
  侧链
</DocLink>

### 签署 {#signing}

以加密方式证明交易已获得特定私钥持有者的批准。

### 单例 {#singleton}

一种计算机编程术语，描述只能存在一个实例的对象。

### 惩罚者 {#slasher}

惩罚者是一个实体，它会扫描认证以搜索可惩罚的罪行。 惩罚被广播到网络，下一个区块提议者将证明添加到区块中。 然后，区块提议者会因惩罚恶意验证者而获得奖励。

### 时隙 {#slot}

[权益证明](#pos)系统中的[验证者](#validator)可以提议新区块的时间段（12 秒）。 时隙有可能为空， 32 个时隙构成一个[时段](#epoch)。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  权益证明
</DocLink>

### 智能合约 {#smart-contract}

在以太坊计算基础框架上执行的程序。

<DocLink to="/developers/docs/smart-contracts/">
  智能合约简介
</DocLink>

### 简洁的非交互式知识论证 (SNARK) {#snark}

SNARK 是“succinct non-interactive argument of knowledge”（简洁的非交互式知识论证）的缩写，是一种[零知识证明](#zk-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### 软分叉 {#soft-fork}

当[共识机制](#consensus-rules)发生变化时，[区块链](#blockchain)所出现的分歧。 与[硬分叉](#hard-fork)相反，软分叉是可向后兼容的；升级后的节点只要遵循新的共识机制，就可以验证未升级节点创建的区块。

### Solidity {#solidity}

一种语法类似 JavaScript、C++ 或 Java 的程序化（命令式）编程语言， 是用于编写以太坊[智能合约](#smart-contract)的最流行也最常用的编程语言。 该语言由 Gavin Wood 博士创造。

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity 内联汇编 {#solidity-inline-assembly}

[Solidity](#solidity) 程序中的[以太坊虚拟机](#evm)汇编语言。 Solidity 对内联汇编的支持使得写入某些操作变得更加容易。

### 伪龙 {#spurious-dragon}

以太坊区块链在 2,675,000 区块的一个[硬分叉](#hard-fork)，用以解决更多拒绝服务攻击向量问题和清除状态（请参见[橘子口哨](#tangerine-whistle)）。 另外，还有一个重放攻击保护机制（请参见[随机数](#nonce)）。

### 稳定币 {#stablecoin}

一种 [ERC-20 代币](#token-standard)，其价值与另一种资产的价值挂钩。 有的稳定币受美元等法定货币、黄金等贵金属以及比特币等其他加密货币的支持。

<DocLink to="/eth/#tokens">
  以太币不是以太坊唯一的加密货币
</DocLink>

### 质押 {#staking}

存入一定量的[以太币](#ether)（质押金）成为验证者，并参与维护[以太坊网络](#network)。 在[权益证明](#pos)共识模型中，验证者检查[交易](#transaction)并提议[区块](#block)。 质押能够为符合网络最佳利益的行为提供经济激励。 你将会因为履行[验证者](#validator)义务而获得奖励，反之将损失一定量的以太币。

<DocLink to="/staking/">
  质押你的以太币，成为以太坊验证者
</DocLink>

### 可扩展的透明知识论证 (STARK) {#stark}

STARK 是“scalable transparent argument of knowledge”（可扩展的透明知识论证）的缩写，是一种[零知识证明](#zk-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### 状态 {#state}

区块链上特定时间点的所有余额和数据的快照，通常指特定区块的状况。

### 状态通道 {#state-channels}

一种[二层网络](#layer-2)解决方案，在参与者之间设置一个通道，以便他们以较低的成本自由交易。 只有开设和关闭通道的[交易](#transaction)才会发送到[主网](#mainnet)。 如此可容纳非常高的交易吞吐量，但依赖于已知的前端参与者人数和锁定资金。

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  状态通道
</DocLink>

### 绝对多数 {#supermajority}

绝对多数是指超过 2/3 (66%) 的总质押以太币数量以保护以太坊的安全。 要在信标链上[最终确定](#finality)区块，需要绝对多数投票。

### 同步 {#syncing}

将区块链的整个最新版本下载到节点的过程。

### 同步委员会 {#sync-committee}

同步委员会是随机选择的一组[验证者](#validator)，每约 27 小时刷新一次。 同步委员会的目的是将他们的签名添加到有效的区块头中。 同步委员会允许[轻量客户端](#light-client)跟踪区块链头，而无需访问整个验证者集。

### Szabo {#szabo}

[以太币](#ether)的一种计量单位。 1 szabo = 10<sup>12</sup> [wei](#wei)，10<sup>6</sup> szabo = 1 个以太币。

<Divider />

## T {#section-t}

### 橘子口哨 {#tangerine-whistle}

以太坊区块链的一个[硬分叉](#hard-fork)，发生在 2,463,000 区块，更改了某些需要密集输入/输出操作的[燃料](#gas)计算，并清除拒绝服务攻击造成的累积状态。拒绝服务攻击利用了相关操作的低燃料成本。

### 终端总难度 (TTD) {#terminal-total-difficulty}

总难度是区块链中某个特定点之前所有区块的 Ethash 挖矿难度之和。 终端总难度是一个特定的总难度值，它被用来触发执行客户端关闭其挖矿和区块广播功能，使网络能够过渡到权益证明。

### 测试网 {#testnet}

“测试网络”的简称，用于模拟以太坊主网行为的网络（请参阅[主网](#mainnet)）。

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  测试网
</DocLink>

### 代币 {#token}

以太坊区块链智能合约中定义的可交易虚拟商品。

### 代币标准 {#token-standard}

由 ERC-20 提案引入，为同质化代币提供标准化[智能合约](#smart-contract)结构。 与[非同质化代币](#nft)不同，来自相同合约的代币可以追踪、交易和互相兑换。

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20 代币标准
</DocLink>

### 交易 {#transaction}

提交到以太坊区块链的数据，由一个原始[帐户](#account)签名，并以一个特定的[地址](#address)为目标。 该交易包含交易的[燃料限制](#gas-limit)等元数据。

<DocLink to="/developers/docs/transactions/">
  交易
</DocLink>

### 交易费 {#transaction-fee}

每次使用以太坊网络时需要支付的费用。 示例包括从你的[钱包](#wallet)或[去中心化应用程序](#dapp)交互中发送资金，例如交换代币或购买收藏品。 交易费可以看作服务费， 具体取决于网络的使用率。 这是因为[验证者](#validator)，负责处理你的交易的人，可能会优先考虑费用较高的交易 — 因此拥堵会迫使价格上涨。

从技术层面来讲，交易费用与相应交易需要的[燃料](#gas)消耗量有关。

降低交易费用目前非常受关注。 请参阅[二层网络](#layer-2)

### 免信任 {#trustlessness}

所涉任何关联方无需信任第三方即可进行交易调解的网络能力

### 图灵完备 {#turing-complete}

如果一系列数据操作规则（如计算机指令集、编程语言或细胞自动机）可以用来模拟任何图灵机，就可以说这些规则为“图灵完备”或“计算通用”。这个名字来源于英国数学家和计算机科学家艾伦图灵 (Alan Turing)。

<Divider />

## V {#section-v}

### 验证者 {#validator}

[权益证明](#pos)系统中的[节点](#node)，负责存储数据、处理交易并且在区块链中添加新区块。 要激活验证者软件，需要[质押](#staking) 32 个以太币。

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  权益证明
</DocLink>
<DocLink to="/staking/">
  以太坊中的质押
</DocLink>

### 验证者的生命周期 {#validator-lifecycle}

验证者可以处于的状态序列。 这包括：

- 已存款：验证者已将至少 32 个以太币存入[存款合约](#deposit-contract)中
- 待处理：验证者正在激活队列中等待已存在的验证者投票决定其能否进入网络
- 活跃：当前正在证明和提议区块
- 惩罚中：验证者存在不当行为并正在被惩罚
- 退出中：验证者被标记为退出网络，无论他们是自愿的还是被强制驱逐的

### 有效性证明 {#validity-proof}

特定[二层网络](#layer-2)解决方案的安全模型。为了加快交易速度，交易成批[卷叠](/#rollups)，在单笔交易中提交给以太坊。 交易计算在链下进行，然后提交给主链，并附带有效性证明。 这种方法在保证安全性的同时可能增加交易量。 部分[卷叠](#rollups)使用[欺诈证明](#fraud-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### Validium {#validium}

使用[有效性证明](#validity-proof)来提高交易吞吐量的链下解决方案。 与[零知识卷叠](#zk-rollup)不同，Validium 的数据没有存储在一层网络[主网](#mainnet)中。

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

一种高级编程语言，语法与 Python 类似。 但 Vyper 更接近纯函数式语言， 其创造者为 Vitalik Buterin。

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### 钱包 {#wallet}

持有[私钥](#private-key)的软件。 钱包用来访问和管理以太坊[帐户](#account)，并与[智能合约](#smart-contract)交互。 密钥无需存储在钱包中，为了提高安全性，可以从离线存储（如，存储卡或纸张）检索。 虽然称其为“钱包”，但它并不存储货币或代币。

<DocLink to="/wallets/">
  以太坊钱包
</DocLink>

### Web3 {#web3}

万维网的第三个版本。 Web3 最初由 Gavin Wood 博士提出，代表了网页应用程序的新愿景和关注点 — 从集中拥有和管理的应用程序转为基于去中心化协议的应用程序（参见[去中心化应用程序](#dapp)）。

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 与 Web3 的对比
</DocLink>

### wei {#wei}

[以太币](#ether)的最小计量单位。 10<sup>18</sup> wei = 1 个以太币。

<Divider />

## Z {#section-z}

### 零地址 {#zero-address}

一个特殊的以太坊地址，地址的所有字节都为 0，被指定为[合约创建交易](#contract-creation-transaction)的目标地址。

### 零知识证明 {#zk-proof}

零知识证明是一种加密方法，使个人在不传达任何额外信息的情况下证明陈述是真实的。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### 零知识卷叠 {#zk-rollup}

使用[有效性证明](#validity-proof)的交易[卷叠](#rollups)，在使用[主网](#mainnet)（一层网络）安全性的同时，提高了[二层网络](#layer-2)的交易吞吐量。 虽然无法像[乐观卷叠](#optimistic-rollups)那样处理复杂的交易类型，但没有延迟问题，因为交易在提交时就可以证明其有效性。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

<Divider />

## 来源 {#sources}

_摘自 [Andreas M. Antonopoulos、Gavin Wood](https://ethereumbook.info) 的[《精通以太坊》](https://github.com/ethereumbook/ethereumbook)（CC-BY-SA 下）_

<Divider />

## 完善本页面 {#contribute-to-this-page}

我们是否还有所遗漏？ 是否有不正确之处？ 请在 GitHub 上为此词汇表贡献力量，帮助我们改进！

[详细了解如何为我们提供帮助](/contributing/adding-glossary-terms)
