---
title: 以太坊词汇表
description: 以太坊相关的技术和非技术术语不完全清单
lang: zh
sidebar: true
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

通常情况下，地址代表一个[外部账户](#eoa)或[合约账户](#contract-accouint)，可以在区块链上接收（目标地址）或发送（源地址）[交易](#transaction)。 更具体地说，它是 [ECDSA](#ecdsa) 的 [Keccak 哈希值](#keccak-256)[公钥](#public-key)的最右边 160 位。

### 应用程序二进制接口 (ABI) {#abi}

与以太坊生态系统中[合约](#contract-account)进行交互的标准方法，均来自区块链外部，用于合约间交互。

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  应用程序二进制接口
</DocLink>

### 应用程序接口 {#api}

应用程序接口 (API) 是关于如何使用软件的一组定义。 应用程序接口位于应用程序和 Web 服务器之间，有助于它们之间数据的传输。

### assert 断言 {#assert}

在 [Solidity](#solidity) 中，`assert(false)` 编译为 `0xfe`，这是一个无效的操作码，会消耗所有剩余[燃料](#gas)并撤销所有更改。 `assert()` 语句失败时，会发生一些非常错误且意想不到的问题，这时您需要修复代码。 您应该使用 `assert()` 来避免这种情况发生。

<DocLink to="/developers/docs/smart-contracts/security/">
  智能合约安全性
</DocLink>

### 认证 {#attestation}

验证者对[信标链](#beacon-chain)或[分片](#shard)[区块](#block)投票。 验证者必须向区块证明，表明他们同意区块提出的状态。

<Divider />

## B {#section-b}

### 基础费 {#base-fee}

每个[区块](#block)都有一个称为“基础费”的底价。 用户必须支付此最低[燃料](#gas)费用，交易才能打包进入下一个区块。

<DocLink to="/developers/docs/gas/">
  燃料和费用
</DocLink>

### 信标链 {#beacon-chain}

引入新共识层的网络升级，将成为整个以太坊网络的协调者。 它为以太坊引入[权益证明](#pos)和[验证者](#validator)。 它最终将并入[主网](#mainnet)。

<DocLink to="/upgrades/beacon-chain/">
  信标链
</DocLink>

### 大端序 {#big-endian}

一种按位计数的表示方式，其中高位字节保存在内存的低位地址中。 与小端序相反，小端序是低位字节保存在内存的低位地址中。

### 区块 {#block}

一个关于所包含[交易](#transaction)的所需信息的集合（其中一个块头），以及称为[叔块](#ommer)的一组其他块头。 区块由[矿工](#miner)添加到以太坊网络。

<DocLink to="/developers/docs/blocks/">
  区块
</DocLink>

### 区块链 {#blockchain}

在以太坊中，由[工作量证明](#pow)系统验证的一系列[区块](#block)，每个区块都链接到它的前任区块，一直到[创世区块](#genesis-block)。 没有区块大小限制；改为使用变动的[燃料限制](#gas-limit)。

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  什么是区块链？
</DocLink>

### 字节码 {#bytecode}

为软件解释程序或虚拟机的高效执行而设计的抽象指令集。 与人类可读源代码不同，字节码以数字格式表示。

### 拜占庭分叉 {#byzantium-fork}

是[大都市](#hard-fork)开发阶段两个[硬分叉](#metropolis)中的第一个。 内容包括 EIP-649 大都市[难度炸弹](#difficulty-bomb)延迟和区块奖励减少，其中[冰河世纪](#ice-age)延迟了 1 年，区块奖励从 5 ETH 减少到 3 ETH。

<Divider />

## C {#section-c}

### 检查点 {#checkpoint}

[信标链](#beacon-chain)的节奏分为时隙（12 秒）和时段（32 个时隙）。 每个时段的第一个时隙即为检查点。 [绝大多数](#supermajority)验证者证明两个检查点之间的联系时，就可以说它们[被合理化](#justification)了，然后当另一个检查点在这之上被合理化时，就可以说它们[被最终确定](#finality)了。

### 编译 {#compiling}

把用高级编程语言（例如，[Solidity](#solidity)）编写的代码转换为低级语言（例如，以太坊虚拟机[字节码](#bytecode)）。

<DocLink to="/developers/docs/smart-contracts/compiling/">
  编译智能合约
</DocLink>

### 委员会 {#committee}

[信标链](#beacon-chain)随机分配给信标和分片块的一组至少 128 位[验证者](#validator)。

### 共识 {#consensus}

当网络中的许多节点，通常是大部分节点，都拥有相同的本地验证的最长区块时，称为共识。 请勿与[共识机制](#consensus-rules)混淆。

### 共识客户端 {#consensus-client}

共识客户端（例如 Prysm、Teku、Nimbus、Lighthouse、Lodestar）运行以太坊的[权益证明](#pos)共识算法，使网络能够就信标链的开头达成一致。 共识客户端不参与验证/广播交易或执行状态转换。 这由[执行客户端](#execution-client)完成。

### 共识层 {#consensus-layer}

以太坊的共识层是[共识客户端](#consensus-client)的网络。

### 共识机制 {#consensus-rules}

全节点与其他节点保持共识的区块验证规则。 不要与[共识](#consensus)混淆。

### 君士坦丁堡分叉 {#constantinople-fork}

这是升级[大都会](#metropolis)的第二部分，一开始计划在 2018 年中进行。 预期除了其他的变更，还会转而采用组合了[工作量证明](#pow)/[权益证明](#pos)的共识算法。

### 合约帐户 {#contract-account}

一个包含代码的帐号，在从另一个[帐号](#account)（[外部帐号](#eoa)或[合约](#contract-account)）收到[交易](#transaction)时执行该代码。

### 合约创建交易 {#contract-creation-transaction}

一项特殊的[交易](#transaction)，以[零地址](#zero-address)作为接收者，用于注册[合约](#contract-account)并将其记录在以太坊区块链上。

### 交叉链接 {#crosslink}

交叉链接提供分片状态的概览。 即[分片](#shard)链如何通过[权益证明系统](#proof-of-stake)中的[信标链](#beacon-chain)相互通信。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  权益证明
</DocLink>

<Divider />

## D {#section-d}

### 去中心化自治组织 (DAO) {#dao}

不以等级体系管理来运作的公司或其他组织。 DAO 也可能指 2016 年 4 月 30 日推出的名为“The DAO”的合约，该合约于 2016 年 6 月被黑客入侵；最终在 1,192,000 区块引发了一次[硬分叉](#hard-fork)（代号为 DAO），逆转了被黑客入侵的 DAO 合约，并导致以太坊和以太坊经典分裂成两个相互竞争的系统。

<DocLink to="/dao/">
  去中心化自治组织 (DAO)
</DocLink>

### Dapp {#dapp}

去中心化应用程序。 最基本的定义是，它是一个[智能合约](#smart-contract)和一个网络用户界面。 更广泛地说，去中心化应用程序是建立在开放、去中心化、点对点基础设施服务之上的 Web 应用程序。 此外，很多去中心化应用程序还包括去中心化存储和/或一个通信协议以及平台。

<DocLink to="/developers/docs/dapps/">
  去中心化应用程序介绍
</DocLink>

### 去中心化交易所 (DEX) {#dex}

一种[去中心化应用程序](#dapp)，使人们可以在网络上交换代币。 您需要持有[以太币](#ether)才能使用去中心化交易所（以支付[交易费](#transaction-fee)），但它们不像中心化交易所那样受地理限制——任何人都可以参与。

<DocLink to="/get-eth/#dex">
  去中心化交易所
</DocLink>

### 契约 {#deed}

请参阅[非同质化代币 (NFT)](#nft)

### DeFi {#defi}

去中心化金融的缩写，旨在通过区块链提供金融服务的一类[去中心化应用程序](#dapp)，无需中介，任何人只需要联网就可以参与。

<DocLink to="/defi/">
  去中心化金融 (DeFi)
</DocLink>

### 难度 {#difficulty}

是一项全网范围的设置，控制产生一份[工作量证明](#pow)所需的算力。

### 难度炸弹 {#difficulty-bomb}

计划好的设定，让[工作量证明](#pow)的[难度](#difficulty)呈指数增长，旨在促进向[权益证明](#pos)过渡，减少[分叉](#hard-fork)

### 数字签名 {#digital-signatures}

用户使用[私钥](#private-key)为文件产生的一串短数据，这样任何有对应[公钥](#public-key)、签名和文档的人都能验证 (1) 文档由该特定私钥的所有者“签名”，以及 (2) 文档签名后不能再修改。

<Divider />

## E {#section-e}

### 椭圆曲线数字签名算法 (ECDSA) {#ecdsa}

以太坊使用的一种加密算法，用于确保资金只能被其所有者使用。 这是创建公钥和私钥的首选方法。 与账户[地址](#address)生成和[交易](#transaction)验证有关。

### 时段 {#epoch}

在[信标链](#beacon-chain)协作系统里，每 32 个[时隙](#slot)（6.4 分钟）组成的时间间隔称作为一个时段。 为了确保安全，每个时段都会对[验证者](#validator)[委员会](#committee)进行打乱。 每个时段都有机会[最终确定](#finality)一条链。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  权益证明
</DocLink>

### 以太坊 1 {#eth1}

“以太坊 1”是指主网以太坊，即现有的工作量证明区块链。 此后，该术语已弃用，取而代之的是“执行层”。 [详细了解名称更改](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)。

<DocLink to="/upgrades/">
  有关以太坊升级的更多信息
</DocLink>

### 以太坊 2 {#eth2}

“以太坊 2”指以太坊协议的一系列升级，包括以太坊过渡至权益证明。 此后，该术语已弃用，取而代之的是“共识层”。 [详细了解名称更改](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)。

<DocLink to="/upgrades/">
  有关以太坊升级的更多信息
</DocLink>

### 以太坊改进提案 (EIP) {#eip}

为以太坊社区提供信息的一种设计文档，说明一个提议的新功能或它的流程或环境（请参见[以太坊意见征求](#erc)）。

<DocLink to="/eips/">
  以太坊改进提案介绍
</DocLink>

### 以太坊域名服务 (ENS) {#ens}

以太坊域名服务注册表是一个单一的中心[合约](#smart-contract)，提供从域名到所有者和解析器的映射，如 [EIP](#eip) 137 中所述。

[更多信息请参考 ens.domains](https://ens.domains)

### 熵 {#entropy}

在加密学里，缺乏可预测性或某种水平的随机性。 在生成私密信息时，例如[私钥](#private-key)，算法经常需要依赖于提供高熵的信源以确保其输出的不可预测性。

### 执行客户端 {#execution-client}

执行客户端（又称 “以太坊 1 客户端”），如 Besu、Erigon、go-ethereum、Nethermind，负责处理和广播交易以及管理以太坊的状态。 它们为[以太坊虚拟机](#evm)中的每笔交易运行计算，以确保遵守协议规则。 今天，它们还要处理[工作量证明](#pow)共识。 过渡到[权益证明](#pos)之后，它们会将此委托给共识客户端。

### 执行层 {#execution-layer}

以太坊的执行层是[执行客户端](#execution-client)的网络。

### 外部帐户 (EOA) {#eoa}

以太坊网络中由人类用户创建或为用户使用的[帐户](#account)。

### 以太坊征求意见征求 (ERC) {#erc}

为尝试定义以太坊使用标准的一些[以太坊改进提案](#eip)赋予的标签。

<DocLink to="/eips/">
  以太坊改进提案介绍
</DocLink>

### Ethash {#ethash}

Ethereum 1.0 的[工作量证明](#pow)算法。

[更多信息请参考 eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### 以太币 {#ether}

以太坊生态系统中使用的原生加密货币，用来支付执行事务时的[燃料](#gas)费用。 也被写作 ETH 或符号形式 Ξ，这是希腊字母 Xi 的大写。

<DocLink to="/eth/">
  我们数字未来的货币
</DocLink>

### 事件 {#events}

允许使用[以太坊虚拟机](#evm)日志记录工具。 [去中心化应用程序](#dapp)可以监听事件，并在用户界面使用它们来触发 JavaScript 回调。

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  事件和日志
</DocLink>

### 以太坊虚拟机 (EVM) {#evm}

可执行[字节码](#bytecode)的基于堆栈的虚拟机。 在以太坊中，执行模型指定如何在给定一系列字节码指令和一小部分环境数据的情况下更改系统状态。 这通过虚拟状态机的正式模型指定。

<DocLink to="/developers/docs/evm/">
  以太坊虚拟机
</DocLink>

### 以太坊虚拟机汇编语言 {#evm-assembly-language}

人类可读的以太坊虚拟机[字节码](#bytecode)的一种形式。

<Divider />

## F {#section-f}

### 回退函数 {#fallback-function}

在缺失数据或无法匹配函数名称时的默认函数调用。

### 水龙头 {#faucet}

通过[智能合约](#smart-contract)执行的一项服务，该合约以免费测试币（可在测试网上使用）的形式分配资金。

<DocLink to="/developers/docs/networks/#testnet-faucets">
  测试网水龙头
</DocLink>

### 确定性 {#finality}

确定性是指保证在指定时间之前，一组交易不会被改变且无法撤销。

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  工作量证明的终局性
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  权益证明的确定性
</DocLink>

### finney {#finney}

[以太币](#ether)的一种计量单位。 1 finney = 10<sup>15</sup> [wei](#wei)。 10<sup>3</sup> finney = 1 个以太币。

### 分叉 {#fork}

协议层面的一次改动，可能会产生一条竞争链，或造成在挖矿中对未来区块路径的暂时性分歧。

### 分叉选择算法 {#fork-choice-algorithm}

用于识别区块链开头的算法。 在执行层上，链头被确定为其后面总难度最大的那一条。 这意味着真正的链头需要最多工作才能挖掘这条链。 在共识层，算法观察来自验证者的累积证明 ([LMD_GHOST](#lmd-ghost))。

### 欺诈证明 {#fraud-proof}

[第二层](#layer-2)解决方案的安全模型，为了提高交易速度，交易成批[卷叠](#rollups)，以单笔交易提交至以太坊。 交易默认为有效，但如果怀疑有欺诈行为，可以对它们提出质疑。 然后，对交易进行欺诈证明，以确定是否发生欺诈。 这种方法提升了交易量，同时保证安全性。 部分[卷叠](#rollups)使用的是[有效性证明](#validity-proof)。

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  乐观卷叠
</DocLink>

### 边境 {#frontier}

以太坊的初始测试开发阶段，从 2015 年 7 月持续到 2016 年 3 月。

<Divider />

## G {#section-g}

### 燃料 {#gas}

以太坊网络中为执行智能合约所消耗的虚拟燃料。 以太坊[虚拟机](#evm)使用一种记账方法来衡量燃料用量，以限制消耗的算力资源（参见[图灵完备](#turing-complete)）。

<DocLink to="/developers/docs/gas/">
  燃料和费用
</DocLink>

### 燃料限制 {#gas-limit}

一笔[交易](#transaction)或一个[区块](#block)允许消耗的最大[燃料](#gas)量。

### 创世区块 {#genesis-block}

[区块链](#blockchain)上的第一个区块，用于初始化特定的区块链以及原生加密货币。

### geth {#geth}

Go Ethereum。 以太坊协议最重要的实现之一，使用 Go 语言编写。

[更多信息请参考 geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei 的缩写，[以太币](#ether)的货币单位，通常用于计算[燃料](#gas)价格。 1 gwei = 10<sup>9</sup> [wei](#wei)。 10<sup>9</sup> gwei = 1 个以太币。

<Divider />

## H {#section-h}

### 硬分叉 {#hard-fork}

[区块链](#blockchain)中的永久性分歧；硬分叉也叫硬分叉改变。 当未升级的节点无法验证遵循更新[共识机制](#consensus-rules)的已升级节点所创建的区块时，通常会发生这种情况。 请不要与分叉、软分叉、软件分叉或 Git 分叉混淆。

### 哈希 {#hash}

将长度可变的输入通过哈希函数生成固定长度的数字指纹。 （参见 [keccak-256](#keccak-256)）

### 身份钱包（HD 钱包） {#hd-wallet}

使用分层确定性 (HD) 密钥创建和传输协议的[钱包](#wallet)。

[在 github.com 上阅读更多信息](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### 身份钱包种子 {#hd-wallet-seed}

用来生成身份[钱包](#wallet)主[私钥](#private-key)与主链码的值。 钱包种子可以用助记词表示，方便大家复制、备份及恢复私钥。

### 家园 {#homestead}

以太坊的第二个开发阶段，于 2016 年 3 月在区块 1,150,000 上启动。

<Divider />

## I {#section-i}

### 索引 {#index}

一个网络结构，旨在通过提供指向存储源的有效路径，优化对整个[区块链](#blockchain)的信息查询。

### 可交换客户端地址协议 (ICAP) {#icap}

以太坊地址编码，与国际银行账号 (IBAN) 编码部分兼容，为以太坊地址提供多用途、可校验和可操作的编码。 可交换客户端地址协议 (ICAP) 地址使用一个新的国际银行账号 (IBAN) 伪国家代码 - XE，全称是“eXended Ethereum”，用于非管辖货币（如 XBT、XRP、XCP）。

### 冰河世纪 {#ice-age}

以太坊在区块 200,000 的[硬分叉](#hard-fork)，旨在引入指数级[难度](#difficulty)增加（又名[难度炸弹](#difficulty-bomb)），从而促使过渡到[权益证明](#pos)。

### 集成开发环境 (IDE) {#ide}

将代码编辑器、编译器、运行时和调试器合并的用户界面。

<DocLink to="/developers/docs/ides/">
  集成开发环境
</DocLink>

### 已部署代码不可变的问题 {#immutable-deployed-code-problem}

[合约](#smart-contract)（或[程序库](#library)）的代码一旦部署，便不可变更。 传统标准软件开发习惯于能够修复可能的缺陷并增加新的功能，但这是对智能合约的开发是一个挑战。

<DocLink to="/developers/docs/smart-contracts/deploying/">
  部署智能合约
</DocLink>

### 内部交易 {#internal-transaction}

[交易](#transaction)是从一个[合约账户](#contract-account)发送到另一个合约账户或一个[外部账户](#eoa)（请参阅[信息](#message)）。

<Divider />

## K {#section-k}

### 密钥导出函数 (KDF) {#kdf}

也称为“密码拉伸算法”。[密钥库](#keystore-file)格式使用该算法，通过反复散列密码短语，防止针对密码短语加密的暴力破解、字典和彩虹表攻击。

<DocLink to="/developers/docs/smart-contracts/security/">
  智能合约安全性
</DocLink>

### keccak-256 {#keccak-256}

以太坊协议使用的加密[哈希](#hash)函数。 Keccak-256 经标准化后形成 [SHA](#sha)-3。

### 密钥存储文件 {#keystore-file}

一个 JSON 编码文件，其中包含单个（随机生成）[私钥](#private-key)，已经过密码加密以获取额外安全性。

<Divider />

## L {#section-l}

### 第二层 {#layer-2}

一个专注于在以太坊协议之上进行分层改进的开发领域。 这些改进与[交易](#transaction)速度、削减[交易费用](#transaction-fee)和交易隐私有关。

<DocLink to="/developers/docs/scaling/#layer-2-scaling">
  第二层
</DocLink>

### LevelDB {#level-db}

一个开源的磁盘键值存储库，可作为单一用途的轻量级[程序库](#library)，绑定到众多平台。

### 程序库 {#library}

一种特殊类型的[合约](#smart-contract)，没有可支付的函数，没有回退函数，也没有数据存储。 因此，它不能接收或持有以太币，也不能存储数据。 程序库代表以前部署的代码，其他合约只能进行只读调用。

<DocLink to="/developers/docs/smart-contracts/libraries/">
  智能合约库
</DocLink>

### 轻量级客户端 {#lightweight-client}

一个以太坊客户端，不存储[区块链](#blockchain)的本地副本，不验证区块和[交易](#transaction)。 它提供[钱包](#wallet)的功能，可以创建和广播交易。

<Divider />

### LMD_GHOST {#lmd-ghost}

以太坊的共识客户端用于识别链头的[分叉选择算法](#fork-choice-algorithm)。 LMD-GHOST 是“Latest Message Driven Greediest Heaviest Observed SubTree”（最新消息驱动的最贪婪、最重的被观察子树）的首字母缩写词，意思是链头是其创建以来[认证](#attestation)积累最多的区块。

## M {#section-m}

### Mainnet（主网） {#mainnet}

“main network”（主网）的缩写，是主要的公共以太坊[区块](#blockchain)。 它是真正的以太币、真正的价值和真正的共识。 在讨论[第二层](#layer-2)扩容解决方案时，主网也被称为“第一层”。 （另请参阅[测试网](#testnet)）

### 默克尔帕特里夏树 {#merkle-patricia-tree}

以太坊中使用的一种数据结构，用于高效存储键值对。

### 消息 {#message}

一笔[内部交易](#internal-transaction)，永不会被序列化，且仅在[以太坊虚拟机](#evm)内发送。

### 消息调用 {#message-call}

将[消息](#message)从一个帐户传递到另一个帐户的行为。 如果目标帐户与[以太坊虚拟机](#evm)代码相关联，虚拟机将从对象和消息作用所依据的状态开始。

### 大都市 {#metropolis}

以太坊的第三个开发阶段，于 2017 年 10 月启动。

### 矿工 {#miner}

通过重复传递哈希，为新区块找到有效[工作量证明](#pow)的网络[节点](#node)（请参阅 [Ethash](#ethash)）。

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  挖矿
</DocLink>

### 铸币 {#mint}

铸币是创建新代币并将其投入流通以供使用的过程。 这是一种去中心化的机制，可以在没有中央机构参与的情况下创建新代币。

<Divider />

## N {#section-n}

### 网络 {#network}

指以太坊网络，一个向每个以太坊节点（网络参与者）推广交易和区块的对等网络。

<DocLink to="/developers/docs/networks/">
  网络
</DocLink>

### 非同质化代币 (NFT) {#nft}

也称为“契约”，是 ERC721 提案中提出的代币标准。 非同质化代币既能够跟踪也可以交易，每个代币都是独一无二的，不可互换，这与以太币和 [ERC-20 代币](#token-standard)不同。 非同质化代币能够代表数字或实物资产的所有权。

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

在密码学中，随机数是指只能使用一次的值。 以太坊中用到了两种随机数：帐户随机数，用来统计每个帐户的交易数，防止重放攻击；[工作量证明](#pow)随机数，即区块中用于满足[工作量证明](#pow)的随机值。

<Divider />

## O {#section-o}

### 叔块 {#ommer}

当一位[矿工](#miner)找到一个有效的[区块](#block)时，另一位矿工可能已经发布了一个竞争区块，这个区块将首先添加到区块链顶端。 这个更早出现的有效区块可以被后来的更新区块归为*叔块*，此时可以领取部分区块奖励。 对于父区块的同级区块来说，“ommer”一词是首选的中性词，但有时也称为“uncle”。

### 乐观卷叠 {#optimistic-rollup}

交易[卷叠](#rollups)使用[欺诈证明](#fraud-proof)增加[第二层](#layer-2)的交易吞吐量，同时使用[主网](#mainnet)（第一层）提供的安全保障。 与[以太坊 Plasma 扩容解决方案](#plasma)（一个类似的第二层解决方案）不同，乐观卷叠可以处理更复杂的交易类型 – [以太坊虚拟机](#evm)中任何可能出现的类型。 与[零知识卷叠](#zk-rollups)相比，它们确实有延迟问题，因为可以通过欺诈证据质疑交易。

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  乐观卷叠
</DocLink>

### 预言机 {#oracle}

预言机是[区块链](#blockchain)与真实世界之间的桥梁。 它们就像是链上[应用程序接口](#api)，可用于查询信息，并用于[智能合约](#smart-contract)中。

<DocLink to="/developers/docs/oracles/">
  预言机
</DocLink>

<Divider />

## P {#section-p}

### 奇偶校验 {#parity}

以太坊客户端软件最重要的可互操作实现之一。

### 以太坊 Plasma 扩容解决方案 {#plasma}

使用[欺诈证明](#fraud-proof)的链下扩容解决方案，例如[乐观卷叠](#optimistic-rollups)。 以太坊 Plasma 扩容解决方案仅限于简单交易，例如基本的代币转账和交换。

<DocLink to="/developers/docs/scaling/plasma">
  以太坊 Plasma 扩容解决方案
</DocLink>

### 私钥（密钥） {#private-key}

一个密码，供以太坊用户通过生成数字签名来证明对某个帐户或合约的所有权（请参阅[公钥](#public-key)、[地址](#address)、[椭圆曲线数字签名算法](#ecdsa)）。

### 权益证明 (PoS) {#pos}

加密货币区块链协议用于实现分布式[共识](#consensus)的方法。 权益证明要求用户证明自己拥有一定数量的加密货币（在网络中的“质押”），以便能够参与交易验证。

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  权益证明
</DocLink>

### 工作量证明 (PoW) {#pow}

需要大量计算才能得出的数据（证明）。 在以太坊中，[矿工](#miner)必须为 [Ethash](#ethash) 算法找到一个符合全网[难度](#difficulty)目标的数值解。

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  工作量证明
</DocLink>

### 公钥 {#public-key}

通过[私钥](#private-key)的单向函数派生的数字，可以公开共享，任何人都可以用它来验证用相应私钥生成的数字签名。

<Divider />

## R {#section-r}

### 收据 {#receipt}

收据是由以太坊客户端返回的数据，用来表示特定[交易](#transaction)的结果，数据包含交易[哈希值](#hash)、[区块](#block)数量、实际[燃料](#gas)消耗量；部署[智能合约](#smart-contract)时，还会返回该合约的[地址](#address)。

### 重入攻击 {#re-entrancy-attack}

这种攻击包含调用受害者合约函数的攻击者合约，在调用执行过程中，受害者合约会循环调用攻击者合约。 其结果可能是，跳过受害者合约中更新余额或计算提款金额的部分，从而达到盗窃资金的目的。

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  重入攻击
</DocLink>

### 奖励 {#reward}

以太坊网络给予找到相应[工作量证明](#pow)的[矿工](#miner)的奖励，该奖励用以太币计价并纳入每个新区块中。

### 递归长度前缀编码 (RLP) {#rlp}

以太坊开发者设计的编码标准，用于编码和序列化具有任意复杂性和长度的对象（数据结构）。

### 卷叠 {#rollups}

一种[第二层](#layer-2)扩容解决方案，将多笔交易组合为一笔，然后提交到[以太坊主链](#mainnet)。 这样可以减少[燃料](#gas)成本，增加[交易](#transaction)吞吐量。 卷叠包含乐观卷叠和零知识卷叠，它们使用不同的安全保障方法来提供这些扩容能力。

<DocLink to="/developers/docs/scaling/#rollups">
  卷叠
</DocLink>

<Divider />

## S {#section-s}

### 宁静 {#serenity}

以前称为“以太坊 2.0”或“Eth2”，指启动了一系列扩容升级和可持续性升级的以太坊开发阶段。

<DocLink to="/upgrades/">
  以太坊升级
</DocLink>

### 安全哈希算法 (SHA) {#sha}

国家标准和技术研究所 (NIST) 推出的加密哈希函数库。

### 分片/分片链 {#shard}

由[信标链](#beacon-chain)协调并由[验证者](#validator)保护的[权益证明](#pos)链。 分片链升级将包含将 64 个分片链添加至网络。 分片链为[第二层](#layer-2)解决方案提供额外数据，例如[乐观卷叠](#optimistic-rollups)和[零知识卷叠](#zk-rollups)，从而提高交易吞吐量。

<DocLink to="/upgrades/sharding">
  分片链
</DocLink>

### 侧链 {#sidechain}

一种使用不同链的扩容解决方案，该链通常具有更快的[共识机制](#consensus-rules)。 需要桥才能将这些侧链连接到[主网](#mainnet)。 [卷叠](#rollups)也使用侧链，但它们可以与[主网](#mainnet)进行协作。

<DocLink to="/developers/docs/scaling/sidechains/">
  侧链
</DocLink>

### 单例 {#singleton}

一种计算机编程术语，指只能存在一个实例的对象。

### 时隙 {#slot}

一段时间（12 秒），在这段时间内，[验证者](#validator)可以在[权益证明](#pos)系统中提出一个新的[信标链](#beacon-chain)和[分片](#shard)链区块。 时隙可以为空。 32 个时隙构成一个[时段](#epoch)。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  权益证明
</DocLink>

### 智能合约 {#smart-contract}

在以太坊计算基础框架上执行的程序。

<DocLink to="/developers/docs/smart-contracts/">
  智能合约介绍
</DocLink>

### SNARK {#snark}

“简洁的非交互式知识论证”的缩写，SNARK 是一种[零知识证明](#zk-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### Solidity {#solidity}

一种语法类似 JavaScript、C++ 或 Java 的程序化（命令式）编程语言， 是用于编写以太坊[智能合约](#smart-contract)的最流行也最常用的编程语言。 由 Gavin Wood 博士创造。

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

存入一定量的[以太币](#ether)（质押金）成为验证者并参与维护[以太坊网络](#network)。 在[权益证明](#pos)共识模型中，验证者检查[交易](#transaction)并推举[区块](#block)。 质押能够为符合网络最佳利益的行为提供经济激励。 您将会因为履行[验证者](#validator)义务而获得奖励，反之将损失一定量的以太币。

<DocLink to="/staking/">
  质押您的以太币并成为以太坊验证者
</DocLink>

### STARK {#stark}

“可扩展的透明知识论证”的缩写，STARK 是一种[零知识证明](#zk-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### 状态通道 {#state-channels}

一种[第二层](#layer-2)解决方案，在参与者之间设置一个通道，以便他们自由交易且成本低廉。 只有开设和关闭通道的[交易](#transaction)才会发送到[主网](#mainnet)。 如此可容纳非常高的交易吞吐量，但依赖于已知的前端参与者人数和锁定资金。

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  状态通道
</DocLink>

### 绝对多数 {#supermajority}

绝对多数是指超过[信标链](#beacon-chain)上质押以太币总量的 2/3 (66%)。 要在信标链上[最终确定](#finality)区块，需要绝对多数投票。

### 同步委员会 {#sync-committee}

同步委员会是[信标链](#beacon-chain)上随机选择的一组[验证者](#validator)，约每 27 小时刷新一次。 目的是将他们的签名添加到有效的区块头中。 同步委员会允许[轻量级客户端](#lightweight-client)跟踪区块链的链头，无需访问整个验证者集。

### szabo {#szabo}

[以太币](#ether)的一种计量单位。 1 szabo = 10<sup>12</sup> [wei](#wei)，10<sup>6</sup> szabo = 1 个以太币。

<Divider />

## T {#section-t}

### 橘子口哨 {#tangerine-whistle}

以太坊区块链的一个[硬分叉](#hard-fork)，发生在 2,463,000 区块，更改了某些需要密集输入/输出操作的[燃料](#gas)计算，并清除拒绝服务攻击造成的累积状态。拒绝服务攻击利用了相关操作的低燃料成本。

### 测试网 {#testnet}

"测试网络"的简称，用于模拟以太坊主网行为的网络（请参阅[主网](#mainnet)）。

<DocLink to="/developers/docs/networks/#testnets">
  测试网
</DocLink>

### 代币标准 {#token-standard}

由 ERC-20 提案引入，为同质化代币提供标准化[智能合约](#smart-contract)结构。 与[非同质化代币](#nft)不同，来自相同合约的代币可以追踪、交易和互相兑换。

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20 代币标准
</DocLink>

### 交易 {#transaction}

提交到以太坊区块链的数据，由一个原始[帐户](#account)签署并以一个特定的[地址](#address)为目标。 该交易包含交易的[燃料限制](#gas-limit)等元数据。

<DocLink to="/developers/docs/transactions/">
  交易
</DocLink>

### 交易费 {#transaction-fee}

每次使用以太坊网络时需要支付的费用。 包括从您的[钱包](#wallet)发送资金或与[去中心化应用程序](#dapp)交互，例如兑换代币或购买收藏品。 可以将其看作是服务费。 这笔费用取决于网络的使用率。 这是因为[矿工](#miner)，即负责处理您的交易的人，可能会优先考虑费用较高的交易——因此拥堵迫使价格上涨。

从技术层面来讲，您的交易费用与相应交易需要的[燃料](#gas)量相关。

降低交易费用目前非常受关注。 请参阅[第二层](#layer-2)

### 图灵完备 {#turing-complete}

如果一系列数据操作规则（如计算机指令集、编程语言或细胞自动机）可以用来模拟任何图灵机，就可以说是“图灵完备的”或“计算通用的”。这个名字来源于英国数学家和计算机科学家艾伦图灵 (Alan Turing)。

<Divider />

## V {#section-v}

### 验证者 {#validator}

[权益证明](#pos)系统中的[节点](#node)，负责存储数据、处理交易并且在区块链中添加新区块。 要激活验证者软件，需要[质押](#staking) 32 ETH。

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  权益证明（PoS)
</DocLink>
<DocLink to="/staking/">
  以太坊中的质押
</DocLink>

### 有效性证明 {#validity-proof}

某些[第二层](#layer-2)解决方案的安全模型，用以提高速度，将交易[卷叠](/#rollups)为交易批，并作为单笔交易提交到以太坊。 交易计算在链下进行，然后提交给主链，并附带有效性证明。 这种方法提升了交易量，同时保证了安全性。 一些[卷叠](#rollups)使用[欺诈证明](#fraud-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### Validium {#validium}

使用[有效性证明](#validity-proof)来提高交易吞吐量的链下解决方案。 与[零知识卷叠](#zk-rollup)不同，Validium 的数据没有存储在第一层[主网](#mainnet)中。

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

高级编程语言，语法与 Python 类似。 Vyper 旨在更接近纯函数式语言， 由 Vitalik Buterin 创造。

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### 钱包 {#wallet}

持有[私钥](#private-key)的软件。 用来访问和管理以太坊[帐户](#account)，并与[智能合约](#smart-contract)交互。 密钥无需存储在钱包中，为了提高安全性，可以离线存储（如，存储卡或纸张）。 虽然称其为“钱包”，但它并不存储货币或代币。

<DocLink to="/wallets/">
  以太坊钱包
</DocLink>

### Web3 {#web3}

万维网的第三个版本。 由 Gavin Wood 博士首次提出，代表了对网络应用的新愿景与新焦点：从中心化所有并管理的应用程序，转为用去中心化协议构建的应用程序（请参阅[去中心化应用程序](#dapp)）。

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 对比 Web3
</DocLink>

### wei {#wei}

[以太币](#ether)的最小计量单位。 10<sup>18</sup> wei = 1 ETH。

<Divider />

## Z {#section-z}

### 零地址 {#zero-address}

一个特殊的以太坊地址，地址的所有字节都为 0，作为[合约创建交易](#contract-creation-transaction)的目标地址。

### 零知识证明 {#zk-proof}

零知识证明是一种加密方法，它允许个人在不传达任何额外信息的情况下证明陈述是真实的。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

### 零知识卷叠 {#zk-rollup}

使用[有效性证明](#validity-proof)的交易[卷叠](#rollups)，在使用[主网](#mainnet)（第一层）安全性的同时，提高[第二层](#layer-2)的交易吞吐量。 虽然无法处理复杂的交易类型，如[乐观卷叠](#optimistic-rollups)，但没有延迟问题，因为提交交易时就可以证明有效性。

<DocLink to="/developers/docs/scaling/zk-rollups/">
  零知识卷叠
</DocLink>

<Divider />

## 来源 {#sources}

_摘自 [Andreas M. Antonopoulos、Gavin Wood](https://ethereumbook.info) 的 [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)（依据 CC-BY-SA）_

<Divider />

## 完善本页面 {#contribute-to-this-page}

我们是否还有所遗漏？ 是否有不正确之处？ 请在 GitHub 上为此词汇表贡献力量，帮助我们改进！

[详细了解如何为我们提供帮助](/contributing/adding-glossary-terms)
