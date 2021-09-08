---
title: 以太坊词汇表
description: 以太坊相关的技术和非技术术语不完全清单
lang: zh
sidebar: true
sidebarDepth: 2
---

# 词汇表 {#ethereum-glossary}

<Divider />

## # {#section-numbers}

### 51% 攻击 {#51-attack}

一种对去中心化[网络](#network)的攻击方式，一个群体获得了大多数[节点](#node)的控制权。 这将使他们能够通过逆转[交易](#transaction)和加倍花费 [ETH](#ether) 和其他 token 来欺诈区块链。

## A {#section-a}

### account 帐户 {#account}

帐户是一个对象，它包含[地址](#address)、余额、[nonce](#nonce)，并且存储了状态和代码（皆可为空）。 一个帐户可以是[合约帐户](#contract-account)，也可以是[外部帐户（EOA）](#eoa)。

<DocLink to="/developers/docs/accounts" title="以太坊帐户" />

### address 地址 {#address}

通常来说，地址代表一个[外部帐户](#eoa)或[合约](#contract-accouint)，可以在区块链上接收（目标地址）或发送（源地址）[交易](#transaction)。 地址是 [ECDSA ](#ecdsa)[公钥](#public-key)的[ Keccak 哈希](#keccak-256)中最右的 160 位数。

### assert 断言 {#assert}

在 [Solidity 语言里](#solidity)，`assert(false)` 会被编译成 `0xfe`，这是一个无效的操作码，它会消耗完剩下的 [gas](#gas) 并复原所有的变更。 当一个 `assert()` 语句失效，表明出现了非常严重和没有预期的问题，你将需要修复你的代码。 你应该使用 `assert()` 以避免永远不应该发生的情况。

<DocLink to="/developers/docs/security/" title="安全性" />

### attestation 证明 {#attestation}

验证者对[信标链](#beacon-chain)或[分片](#shard) [区块](#block)投票。 验证者必须对区块做证明，示意他们认同区块提议的状态。

<Divider />

## B {#section-b}

### Beacon Chain 信标链 {#beacon-chain}

Eth2 升级的一部分，它将成为以太坊网络的协调者。 它会给以太坊引入[权益证明](#proof-of-stake)和[验证者](#validator) 。 它最终将并入[主网](#mainnet)。

<DocLink to="/eth2/beacon-chain/" title="信标链" />

### big-endian 大端模式 {#big-endian}

是指数据的高字节位保存在内存的低地址中。 与小端模式相反，小端模式是低位字节保存在内存的低地址中。

### block 区块 {#block}

一个关于其所包含[交易](#transaction)的所需信息（区块头）的集合，以及称为 [ommer（叔块）](#ommer)的一组其他区块头。 区块由以太坊网络中的[矿工](#miner)添加上链。

<DocLink to="/developers/docs/blocks/" title="区块" />

### blockchain 区块链 {#blockchain}

以太坊网络中由[工作量证明](#pow)验证的[区块](#block)序列，每个区块与其父块相连，可一直追溯到[创世纪块](#genesis-block)。 它没有区块大小限制，而使用 [ gas 上限](#gas-limit)来调整区块大小。

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain" title="什么是区块链？" />

### bytecode 字节码 {#bytecode}

为软件解释器或虚拟机的高效执行而设计的抽象指令集。 与人类可读的源代码不同，字节码以数字格式表示。

### Byzantium fork 拜占庭分叉 {#byzantium-fork}

指的是[大都会](#hard-fork) 阶段的头两次[硬分叉](#metropolis) 。 它纳入了 EIP-649 “大都会延迟[难度炸弹](#difficulty-bomb) 和减少区块奖励”，具体内容是[冰河时代](#ice-age)被延迟 1 年，区块奖励从 5 个 ETH 减少为 3 个。

<Divider />

## C {#section-c}

### compiling 编译 {#compiling}

把用高级编程语言 (例如，[Solidity](#solidity)) 写的代码转换为低级语言 (例如，EVM [“字节码”](#bytecode))。

<DocLink to="/developers/docs/smart-contracts/compiling/" title="编译智能合约" />

### committee 委员会 {#committee}

由至少 128 个[验证者](#validator)组成的集合，这个集合由[信标链](#beacon-chain)随机分配到信标区块和分片区块。

### consensus 共识 {#consensus}

当网络中的许多节点，通常是大部分节点，都拥有相同的本地验证的最长区块时，称为共识。 不要与[共识规则](#consensus-rules)混淆。

### consensus rules 共识规则 {#consensus-rules}

全节点与其他节点保持共识的区块验证规则。 不要与[共识](#consensus)混淆。

### Constantinople fork 君士坦丁堡分叉 {#constantinople-fork}

这是[大都会](#metropolis)阶段的第二部分，一开始计划在 2018 年中进行。 预期除了其他的变更，还会纳入一个提案是关于转为采用一个[工作量证明](#pow)/[权益证明](#pos)混合的共识算法。

### contract account 合约帐户 {#contract-account}

一个包含代码的帐户，只要接收到来自其他[帐户](#account)（[EOA ](#eoa)或[合约帐户](#contract-account)) [交易](#transaction)就会执行合约代码。

### contract creation transaction 创建合约交易 {#contract-creation-transaction}

一种为了注册一个[合约](#contract-account)并将其记录在以太坊区块链上的特殊[交易](#transaction)，其中接收者[地址 “为零”](#zero-address) 。

### crosslink 交叉链接 {#crosslink}

交叉链接提供一个分片状态的总结。 这是在实现分片的[权益证明系统](#proof-of-stake)里[分片](#shard)链通过[信标链](#beacon-chain)互相通信的方式。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="权益证明" />

<Divider />

## D {#section-d}

### Decentralized Autonomous Organization (DAO) 去中心化自治组织 {#dao}

不以等级体系管理来运作的公司或其他组织。 DAO 可能还指一份名为 "The DAO" 的合约，在 2016 年 4 月 30 日发布，它后来在 2016 年 6 月被攻击了；这件事最终引发了一次[硬分叉](#hard-fork)（代码名称为 DAO），分叉的区块高度是 1,192,000，这次分叉回滚了被攻击的 DAO 合约，并导致产生了以太坊和以太坊经典两个分开的、互相竞争的系统。

<DocLink to="/community/#decentralized-autonomous-organizations-daos" title="Decentralized Autonomous Organization (DAO) 去中心化自治组织" />

### DApp 去中心化应用 {#dapp}

去中心化应用。 最基本的定义是，它是一个[智能合约](#smart-contract)和一个网络用户界面。 从更广义来说，Dapp 是一个建在开放、去中心化、点对点的基础设施服务上的网络应用。 此外，很多 Dapp 还包括去中心化存储和/或一个通信协议以及平台。

<DocLink to="/developers/docs/dapps/" title="Dapp 介绍" />

### decentralized exchange (DEX) 去中心化交易所 {#dex}

是 [dapp](#dapp) 的一种类型，让人们可以在网络上与对等点交换代币。 你需要有 [ Eth](#ether) 才可以使用 Dex（以支付[交易费](#transaction-fee)），但它们不像中心化交易所那样受地理限制——任何人都可以参与。

<DocLink to="/get-eth/#dex" title="去中心化交易所" />

### deed {#deed}

请参阅 [非同质化代币 (NFT)](#nft)

### defi {#defi}

去中心化金融的缩写，旨在通过区块链提供金融服务的一类[去中心化应用](#dapp)，无需中介，任何连接互联网的人都可以参与。

<DocLink to="/dapps/#explore" title="Defi dapps" />

### difficulty 挖矿难度 {#difficulty}

是一个全网络的设置，控制产生一个[工作量证明](#pow)所需的计算。

### difficulty bomb 难度炸弹 {#difficulty-bomb}

计划中[工作量证明](#pow)系统里出块[难度](#difficulty)会呈指数增长，这样的设置旨在使转换到[权益证明](#pos)共识时，减少[分叉](#hard-fork)的变化。

### digital signature 数字签名 {#digital-signatures}

用户使用[私钥](#private-key)为文件产生的一串短数据，这样任何有对应[公钥](#public-key)、签名和文档的人都能验证 (1) 文档由该特定私钥的所有者“签名”，以及 (2) 文档签名后不能再被修改。

<Divider />

## E {#section-e}

### elliptic curve digital signature algorithm (ECDSA) 椭圆曲线数字签名算法 {#ecdsa}

以太坊使用的一种加密算法，用于确保资金只能被其所有者使用。

### epoch {#epoch}

在[信标链](#beacon-chain)协作系统里，每 32 个[slot](#slot)（6.4 分钟）组成的时间间隔称作为一个 epoch。 为了确保安全，每个 epoch 对会对[验证者](#validator)[委员会](#committee)进行混洗。 每个 epoch 里都有为链做[最终确定](#finality)的一次机会。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="权益证明（PoS)" />

### Ethereum Improvement Proposal (EIP) 以太坊改进提案 (EIP) {#eip}

为以太坊社区提供信息的一种设计文档，说明一个提议的新功能或它的流程或环境（请参阅 [ERC](#erc)）。

<DocLink to="/eips/" title="EIP 简介" />

### Ethereum Name Service (ENS) 以太坊域名服务 (ENS) {#ens}

ENS 注册表是一个单一总[合约](#smart-contract)，如 [EIP](#eip) 137 所说明的，它提供从域名到所有者和解析器的映射。

[在 github.com 上阅读更多信息](https://github.com/ethereum/ens)

### entropy 熵 {#entropy}

在加密学里，缺乏可预测性或某种水平的随机性。 在生成私密信息时，例如[私钥](#private-key)，算法经常需要依赖于提供高熵的信源以确保其输出的不可预测性。

### externally owned account (EOA) 外部帐户 (EOA) {#eoa}

以太坊网络中由人类用户创建或为人类用户使用的[帐户](#account)。

### Ethereum Request for Comments (ERC) 以太坊意见征求 (ERC) {#erc}

ERC 是部分试图定义以太坊具体使用标准的[ EIP ](#eip)贴上的标签。

<DocLink to="/eips/" title="EIP 简介" />

### Ethash {#ethash}

一个 Ethereum 1.0 的[工作量证明](#pow)算法。

[更多信息请参考 eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ETH {#ether}

以太坊生态系统中使用的原生加密货币，用来支付执行事务时的[ gas ](#gas)开销。 也被写作 ETH 或符号形式 Ξ，这是希腊字母 Xi 的大写。

<DocLink to="/eth/" title="我们数字未来的货币" />

### events 事件 {#events}

[EVM](#evm) 使用的日志工具。 [Dapps](#dapp) 可以监听事件，并在用户界面使用它们来触发 JavaScript 回调。

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs" title="事件（Events）和日志（Logs）" />

### Ethereum Virtual Machine (EVM) 以太坊虚拟机 {#evm}

可执行[字节码](#bytecode)的基于堆栈的虚拟机。 在以太坊，执行模型指定了在给定一系列字节码指令和一小组环境数据的情况下如何改变系统状态。 这是通过虚拟状态机的正式模型指定的。

<DocLink to="/developers/docs/evm/" title="以太坊虚拟机（Evm）" />

### EVM assembly language EVM 汇编语言 {#evm-assembly-language}

人类可读的以太坊虚拟机[字节码](#bytecode)的一种形式。

<Divider />

## F {#section-f}

### fallback function 回退函数 {#fallback-function}

在缺失数据或无法匹配函数名称时的默认函数调用。

### faucet 水龙头 {#faucet}

通过[智能合约](#smart-contract)，免费提供测试网可用的测试以太币的服务

<DocLink to="/developers/docs/networks/#testnet-faucets" title="测试网水龙头" />

### finality 终局性 {#finality}

终局性是保证在指定时间之前的一组交易不会被改变且无法撤销。

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality" title="工作量证明的终局性" /> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality" title="权益证明的终局性" />

### finney {#finney}

[ether](#ether) 的一种计量单位。 1 finney = 10<sup>15</sup> [wei](#wei)。 10<sup>3</sup> finney = 1 ether。

### fork 分叉 {#fork}

在协议层面的一次改动，可能会产生一条竞争链，或造成在挖矿中对未来区块路径的暂时性分歧。

### fraud proof 欺诈证明 {#fraud-proof}

[二层](#layer-2)解决方案的安全模型，为了提高交易速度，交易 [合并](#rollups) 在单笔交易中提交到以太坊中。 交易默认假定为是有效的，但如果怀疑有欺诈行为，可以对它们提出质疑。 然后，对交易进行欺诈证明，以确定是否发生欺诈。 这种方法提升了交易量，同时保证安全性。 一些 [rollup](#rollups) 使用的是 [欺诈证明](#validity-proof)。

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="Optimistic Rollup" />

### frontier {#frontier}

以太坊的初始测试开发阶段，从 2015 年 7 月持续到 2016 年 3 月。

<Divider />

## G {#section-g}

### gas {#gas}

以太坊网络中为执行智能合约所消耗的虚拟 “燃油”。 以太坊[虚拟机](#evm)使用一种记账方法来衡量 gas 用量，以限制算力资源（参见[图灵完备](#turing-complete)）的消耗。

<DocLink to="/developers/docs/gas/" title="Gas 和费用" />

### gas limit gas 上限 {#gas-limit}

一个[交易](#transaction)或一个[区块](#block)允许消耗的最大 [gas](#gas) 量。

### genesis block 创世区块 {#genesis-block}

[区块链](#blockchain)上的第一个区块，用于初始化特定的区块链以及原生加密货币。

### geth {#geth}

Go Ethereum。 以太坊协议最好的实现之一，使用 Go 语言编写。

[更多信息请参考 geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei 的缩写，[ether](#ether) 的一个货币单位，通常用于计算 [gas](#gas) 价格。 1 gwei = 10<sup>9</sup> [wei](#wei)。 10<sup>9</sup> gwei = 1 ether。

<Divider />

## H {#section-h}

### hard fork 硬分叉 {#hard-fork}

[区块链](#blockchain)中的永久性分歧；硬分叉也叫硬分叉改变。 通常发生在拒绝升级的节点无法验证遵循更新[共识机制](#consensus-rules)的已升级节点所创建的区块时。 请不要与分叉、软分叉、软件分叉或 Git 分叉相混淆。

### hash 哈希 {#hash}

由可变长度的输入，通过哈希函数（散列）生成固定长度的数字指纹。 （参见 [keccak-256](#keccak-256)）

### HD wallet HD 钱包 {#hd-wallet}

使用分层确定性创建密钥和转账的[钱包](#wallet)。

[更多信息请参考 github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD wallet seed HD 钱包种子 {#hd-wallet-seed}

用来生成 HD [钱包](#wallet)中主[私钥](#private-key)与主链码的短种子值。 可以用助记词表示，以便大家复制、备份及恢复私钥。

### homestead {#homestead}

以太坊的第二个开发阶段，于 2016 年 3 月在第 1,150,000 个区块上启动。

<Divider />

## I {#section-i}

### Inter-exchange Client Address Protocol (ICAP) 可交换客户端地址协议 (ICAP) {#icap}

以太坊地址编码，与国际银行帐户编号 (IBAN) 编码部分兼容，为以太坊地址提供多用途的、可校验的和可操作的编码。 ICAP 地址使用一个新的 IBAN 伪国家代码-XE，全称是“eXended Etherum”，代表非管辖货币（如 XBT、XRP、XCP）。

### Ice Age {#ice-age}

块高为 200,000 的 [硬分叉](#hard-fork) ， 增加了指数级[难度](#difficulty)增加（又称为[难度炸弹](#difficulty-bomb)），为过渡到[权益证明](#pos)做准备。

### integrated development environment (IDE) 集成开发环境 {#ide}

将代码编辑器、编译器、运行时和调试器合并的用户界面。

<DocLink to="/developers/docs/ides/" title="集成开发环境 (IDE）" />

### immutable deployed code problem 已部署代码不可变的问题 {#immutable-deployed-code-problem}

[合约](#smart-contract)（或[库](#library)）的代码一旦部署，它就不可变更了。 传统标准软件开发习惯于能够修复可能的缺陷并增加新的功能，但这是对智能合约的开发是一个挑战。

<DocLink to="/developers/docs/smart-contracts/deploying/" title="部署智能合约" />

### internal transaction 内部交易 {#internal-transaction}

从一个合约帐户发往另外一个[合约帐户](#contract-account)或者[外部帐户](#eoa)的[交易](#transaction)。

<Divider />

## K {#section-k}

### key derivation function (KDF) 密钥导出函数 {#kdf}

也称为密钥延伸算法，通过[密钥库](#keystore-file)文件格式来防止暴力破解，防止攻击者预先计算派生密钥的字典或 “彩虹表”，通过重复计算密令的哈希来实现。

<DocLink to="/developers/docs/security/" title="安全性" />

### keccak-256 {#keccak-256}

以太坊协议使用的加密[哈希](#hash)函数。 Keccak-256 是从 [SHA](#sha)-3 规范演化出来的。

### keystore file 密钥存储文件 {#keystore-file}

一个 JSON 编码文件，其中包含单个（随机生成）[私钥](#private-key)，用密码加密以获取额外安全性。

<Divider />

## L {#section-l}

### layer 2 二层 {#layer-2}

在以太坊协议之上的聚焦与分层优化的开发实现。 这些改进关系到 [交易](#transaction) 速度、更便宜的 [交易费](#transaction-fee)以及交易隐私。

<DocLink to="/developers/docs/layer-2-scaling/" title="二层" />

### LevelDB {#level-db}

开源的轻量级 k-v [存储库](#library)，可以在不同的平台中使用。

### library 存储库 {#library}

特殊类型的[合约](#smart-contract)， 没有 payable 函数，没有 fallback 函数，也没有数据存储。 因此，它不能接收或持有以太坊，也不能储存数据。 一个存储库代表以前部署的代码，其他合约只能进行只读调用。

<DocLink to="/developers/docs/smart-contracts/libraries/" title="智能合约库" />

### lightweight client 轻量级客户端 {#lightweight-client}

一个以太坊客户端，不存储[区块链](#blockchain)的本地副本，不验证区块和[交易](#transaction)。 它提供一个[钱包](#wallet)的功能，可以创建和广播交易。

<Divider />

## M {#section-m}

### mainnet 主网 {#mainnet}

"主网"的缩写，这是以太坊[区块链](#blockchain)的主网。 真正的的以太坊，真正的价值和真正的共识。 在讨论[二层](#layer-2)扩容解决方案时，主网也被称为一层。 （另见 [测试网](#testnet)）

### 梅克尔帕特里夏树 {#merkle-patricia-tree}

用于以太坊有效存储密钥对的数据结构。

### 消息 {#message}

一个[内部交易](#internal-transaction)， 永不会被序列化，且仅在 [EVM](#evm) 中发送。

### message call 消息调用 {#message-call}

将一个[消息](#message)从一个帐户传递到另一个帐户的行为。 如果目标帐户与 [EVM](#evm) 代码相关联，VM 将从消息依赖的状态开始执行。

### Metropolis {#metropolis}

以太坊的第三个开发阶段，于 2017 年 10 月启动。

### Miner 矿工 {#miner}

通过不断做哈希运算，找到新区块的有效[工作量证明](#pow)的网络节点。

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/" title="采矿" />

<Divider />

## N {#section-n}

### network 网络 {#network}

指以太坊网络，一个对等网络向每个以太坊节点（网络参与者）推广交易和块。

<DocLink to="/developers/docs/networks/" title="Networks 网络" />

### non-fungible token (NFT) 非同质化代币 {#nft}

也叫 “所有权证书” 或 “权证”，是由 ERC721 议案提出的代币标准。 NFT 能够被追溯也可以交易，每个代币是唯一且独一无二的，不像 ERC20 代币，每个 NFT 都是无法互换的。 NFT 能够代表数字或物理资产的所有权。

<DocLink to="/developers/docs/standards/tokens/erc-721/" title="ERC-721 非同质化代币标准" />

### node 节点 {#node}

参与点对点网络的软件客户端。

<DocLink to="/developers/docs/nodes-and-clients/" title="节点和客户端" />

<DocLink to="/developers/docs/nodes-and-clients/" title="节点和客户端" />

### nonce {#nonce}

在密码学中，nonce 指的是在加密过程中只能使用一次的值。 以太坊中有两类 nonce：帐户 nonce 值，用来统计每个帐户的交易数，防止重放攻击；[工作量证明](#pow) nonce，区块中用于满足[工作量证明](#pow)的随机值。

<Divider />

## O {#section-o}

### ommer (uncle) block 叔块 {#ommer}

当一个[矿工](#miner)找到一个有效的[块](#block)，另一个矿工可能已经发布了一个存在竞争的块，这个块将首先添加到区块链中。 这个有效但是之前的区块可以被更新的区块归为*叔块*，此时可以领取部分区块奖励。 对于父区块的相邻区块来说，“ommer”一词是首选的不分性别的词，但有时也被称为“uncle”。

### Optimistic rollup {#optimistic-rollup}

[Rollup](#rollups) 交易使用 [欺诈证明](#fraud-proof) 提供增加[二层](#layer-2)的交易吞吐量，同时使用[主网](#mainnet)（一层）提供的安全保障。 与 [Plasma](#plasma)（一个类似的二层的解决方案）不同， Optimistic rollup 可以处理更复杂的交易类型 -- [EVM](#evm) 中任何可能的事情。 与 [Zk Rollup](#zk-rollups) 相比，他们确实有延迟问题，因为交易可以通过欺诈证据被质疑。

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="Optimistic Rollup" />

<Divider />

## P {#section-p}

### parity {#parity}

以太坊客户端软件最棒的实现之一。

### Plasma 扩容解决方案 {#plasma}

[二层](#layer-2)使用[欺诈校验](#fraud-proof)的扩容解决方案，例如 [Optimistic rollup](#optimistic-rollups)。 Plasma 仅限于简单的交易，例如基本令牌传输和交换。

<DocLink to="/developers/docs/layer-2-scaling/#Plasma" title="以太坊 Plasma 扩容解决方案" />

### private key (secret key) 私钥（密钥） {#private-key}

用户证明对某一帐户或合约的所有权的字符序列，用来生成数字签名（见 [公钥](#public-key)、[地址](#address)、[ECDSA](#ecdsa)）。

### proof of stake (PoS) 权益证明 {#pos}

在区块链中实现分布式[共识](#consensus)的方法。 PoS 要求用户证明自己拥有一定数量的加密货币（在网络中“质押”），以便能够参与交易的验证。

<DocLink to="/developers/docs/consensus-mechanisms/pos/" title="权益证明（PoS）" />

### proof of work (PoW) 工作量证明 {#pow}

需要大量计算才能得出的数据（证明）。 在以太坊中， [矿工](#miner) 必须找到符合整个网络范围的 [算力难度](#difficulty) 目标的 [Ethash](#ethash) 算法的数值。

<DocLink to="/developers/docs/consensus-mechanisms/pow/" title="工作量证明（PoW)" />

### public key 公钥 {#public-key}

通过[私钥](#private-key)的单向函数派生的数字，可以公开共享，任何人都可以使用它来验证用其对应私钥进行的数字签名。

<Divider />

## R {#section-r}

### receipt 收据 {#receipt}

收据是由以太坊客户端返回的数据，用来表示特定[交易](#transaction)的结果，数据包含交易[哈希](#hash)、打包的[区块](#block)高度、实际 [gas ](#gas)消耗量，如果该交易用来部署[合约](#smart-contract)，则还会返回该合约[地址](#address)交易。

### re-entrancy attack 重放攻击 {#re-entrancy-attack}

攻击者合约调用受害者合约函数，使得在调用执行过程中受害者合约会循环调用攻击者合约。 这可能导致通过跳过受害者合约的余额更新或提款金额计算的部分来盗窃资金。

<DocLink to="/developers/docs/security/#re-entrancy" title="重入攻击" />

### reward 区块奖励 {#reward}

以太坊网络给予找到相应[工作量证明](#pow)的[矿工](#miner)的奖励，该奖励用以太币计价并纳入每个新区块中。

### Recursive Length Prefix (RLP) 递归长度前缀编码 {#rlp}

以太坊开发者设计的编码标准，用于编码和序列化具有任意复杂性和长度的对象（数据结构）。

### rollup {#rollups}

一种[二层](#layer-2)扩容解决方案，将多笔交易分批提交到[以太坊主链](#mainnet)的单笔交易中。 这就可以降低 [gas](#gas) 成本，增加[交易](#transaction)吞吐量。 有些 Optimistic 和 ZK Rollup 使用两种不同的安全方法来提供扩容能力。

<DocLink to="/developers/docs/layer-2-scaling/#rollups" title="Rollup" />

<Divider />

## S {#section-s}

### Serenity {#serenity}

以太坊第四个也是最后一个开发阶段。

<DocLink to="/eth2/" title="以太坊 2.0（Eth2）" />

### Secure Hash Algorithm (SHA) 安全哈希算法 {#sha}

国家标准和技术研究所（NIST）推出的加密散列函数库。

### shard / shard chain 分片/分片链 {#shard}

由[信标链](#beacon-chain)管理并由[验证者](#validator)保护的[权益证明](#proof-of-stake)链。 作为 Eth2 分片链升级的一部分，将有 64 个加入该网络。 分片链为[二层](#layer-2)解决方案提供额外数据，例如为 [optimistic rollup](#optimistic-rollups) 和 [ZK rollup](#zk-rollups) 提供额外的交易吞吐量。

<DocLink to="/eth2/shard-chains" title="分片链" />

### Sidechain 侧链 {#sidechain}

一个使用不同链、常常更快的[协商一致规则]{#consensus-rules} 的扩容解决方案。 需要桥来连接这些侧链到 [mainnet](#mainnet)。 [Rollup](#rollups) 也使用侧链，但是他们可以与[主网](#mainnet)进行操作。

<DocLink to="/developers/docs/layer-2-scaling/#sidechains" title="侧链" />

### singleton 单例 {#singleton}

一种计算机编程术语，指一个对象只能存在一个实例。

### slot 时隙 {#slot}

一个时间段（12 秒），在这个时间段内，[验证者](#validator)可以在[权益证明](#proof-of-stake)系统中提出一个新的[信标链](#beacon-chain)和[分片](#shard)链区块。 一个插槽有可能是空的。 32 个插槽构成一个 [epoch](#epoch)。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="权益证明" />

### smart contract 智能合约 {#smart-contract}

在以太坊计算基础框架上执行的程序。

<DocLink to="/developers/docs/smart-contracts/" title="智能合约简介" />

### Solidity {#solidity}

一种语法类似 JavaScript、C++ 或 Java 的程序化（命令式）编程语言， 是用于编写以太坊[智能合约](#smart-contract)的最流行也最常用的编程语言。 由 Gavin Wood 博士创建。

<DocLink to="/developers/docs/smart-contracts/languages/#solidity" title="Solidity" />

### Solidity 内联汇编 {#solidity-inline-assembly}

[EVM](#evm) [Solidity](#solidity) 的内联汇编语言。 Solidity 对内联汇编的支持使得写入某些操作变得更加容易。

### Spurious Dragon {#spurious-dragon}

以太坊区块链在块高为 2,675 一个[硬分叉](#hard-fork) ，解决拒绝服务攻击和状态清除的问题（见 [Tangerine Whistle](#tangerine-whistle)）。 另外，还有一个重放攻击保护机制（见 [nonce](#nonce)）。

### stablecoin 稳定币 {#stablecoin}

一种 [ERC-20 代币](#token-standard)，其价值与另一种资产的价值锚定。 稳定币的锚定资产包括法币（如美元），贵金属（如黄金）以及其他加密货币（如比特币）。

<DocLink to="/eth/#tokens" title="ETH 不是以太坊上唯一的加密货币" />

### staking 权益质押 {#staking}

存入一定量的 [ether](#ether)（质押金）成为验证者并参与维护[以太坊网络](#network)。 验证者在 [proof-of-stake（权益证明）](#pos) 共识模型中检查 [交易](#transaction) 并且提议 [区块](#block)。 质押能够为符合网络利益的行为提供经济激励。 你将会因为履行[验证者](#validator)义务而获得奖励，反之将损失一定量的 ETH。

<DocLink to="/eth2/staking/" title="质押您的 ETH 并成为以太坊验证者" />

### state channels 状态通道 {#state-channels}

一种[二层](#layer-2)解决方案，在参与者之间设置一个通道，他们可以在通道中自由交易且成本低廉。 只有开设和关闭通道的[交易](#transaction)被提交到 [主网](#mainnet)。 这使得交易吞吐量大幅提升，但依赖于已知的参与人数和锁定资金。

<DocLink to="/developers/docs/layer-2-scaling/#state-channels" title="状态通道" />

### szabo {#szabo}

[以太（ETH）](#ether)的一种计量单位。 1 szabo = 10<sup>12</sup> [wei](#wei)，10<sup>6</sup> szabo = 1 ETH。

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

以太坊区块链的一次[硬分叉](#hard-fork)，发生在区块高度 2,463,000 处，更改了某些 I/O 密集型操作的 [gas](#gas) 计算，并清除 DoS 攻击造成的累积状态，该攻击利用了相关操作的低 gas 消耗。

### testnet 测试网 {#testnet}

"测试网络"的简称，用于模拟以太坊主网行为的网络（参阅 [mainnet 主网](#mainnet)）。

<DocLink to="/developers/docs/networks/#testnets" title="测试网" />

### token standard 代币标准 {#token-standard}

由 ERC-20 提案引入，为同质化代币（fungible tokens）提供了标准化的 [智能合约](#smart-contract) 结构。 不同于 [NFT（非同质化代币）](#nft)，同一合约中的代币可以被追踪、交易及置换。

<DocLink to="/developers/docs/standards/tokens/erc-20/" title="ERC-20 代币标准" />

### transaction 交易 {#transaction}

由一个原始[帐户](#account)签署并以一个特定地址为目标的提交到以太坊区块链上的数据， 该交易包含交易[ gas 上限](#gas-limit)等元数据。

<DocLink to="/developers/docs/transactions/" title="交易" />

### transaction fee 交易费 {#transaction-fee}

每当你使用以太坊网络时需要支付的费用。 包括从你的[钱包发送资金](#wallet)或与 [dapp](#dapp) 交互，例如兑换代币或购买一件藏品。 可以将其看作是服务费。 这笔费用取决于网络的使用率。 这是因为 [矿工](#miner)（负责处理你的交易的人）很可能以手续费高低来对交易进行排序——因此拥堵情况下使得价格上涨。

从技术层面来说，你的交易费用与相应交易需要的 [gas](#gas) 数量相关。

降低交易费用目前非常受关注。 参阅[二层](#layer-2)

### Turing complete 图灵完备 {#turing-complete}

在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完备的。这个名字来源于英国数学家和计算机科学家艾伦・图灵。

<Divider />

## V {#section-v}

### Validator 验证者 {#validator}

[权益证明](#proof-of-stake)系统中的[节点](#node)，负责存储数据、处理交易并且在区块链中添加新区块。 要激活一名验证者，需要[质押](#staking) 32 ETH。

<DocLink to="/developers/docs/consensus-mechanisms/pos" title="权益证明" /> <DocLink to="/eth2/staking/" title="质押" />

### Validity proof 有效性证明 {#validity-proof}

某些[二层](#layer-2)解决方案的安全模型，以提高速度，交易 [合并](/#rollups)为交易批并在单次交易中提交到以太坊。 交易计算在链下进行，然后提交给主链，并附带有效性证明。 这种方法提升了交易量，同时保证安全性。 一些 [rollup](#rollups) 使用的是[欺诈证明](#fraud-proof)。

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="ZK Rollup" />

### Validium {#validium}

[二层](#layer-2)解决方案，使用[有效性证明](#validity-proof)来提高交易吞吐量。 与[ZK Rollup](#zk-rollup)不同，Validium 的数据没有存储在一层[主网](#mainnet)中。

<DocLink to="/developers/docs/layer-2-scaling/#validium" title="Validium" />

### Vyper {#vyper}

高层次的编程语言与，语法与 Python 类似。 旨在更接近纯函数式语言。 由 Vitalik Buterin 创造。

<DocLink to="/developers/docs/smart-contracts/languages/#vyper" title="Vyper" />

<Divider />

## W {#section-w}

### Wallet 钱包 {#wallets}

保存用户[密钥](#private-key)的软件， 可以用来访问并管理你的以太坊[帐户](#account)并与[智能合约](#smart-contract)交互。 密钥不一定要存储在钱包中，为了提高安全性，可以离线存储（如写在一张记忆卡或者纸上）。 虽然称其为 “钱包”，但它并不存储代币本身。

<DocLink to="/wallets/" title="以太坊钱包" />

### Web3 {#web3}

万维网的第三个版本。 由 Gavin Wood 博士首次提议，代表了对网络应用的新愿景与新焦点：从中心化所有并管理的应用转移到在[去中心化协议](#dapp))上构建的应用。

<DocLink to="/developers/docs/web2-vs-web3/" title="Web2 与 Web3 对比" />

### wei {#wei}

[以太（ETH）](#ether)的最小计量单位。 10<sup>18</sup> wei = 1 ETH。

<Divider />

## Z {#section-z}

### zero address 零地址 {#zero-address}

一个特殊的以太坊地址，地址的所有字节都为 0，作为[ “创建合约交易” ](#contract-creation-transaction)的目标地址。

### Zero-knowledge rollup ZK Rollup {#zk-rollup}

使用[有效性证明的交易[rollup](#rollups)](#validity-proof)以在使用[主网](#mainnet)（一层）安全性的同时提高[二层](#layer-2)交易吞吐量。 虽然他们无法处理复杂的交易类型，如 [Optimistic rollup](#optimistic-rollups)，但没有延迟问题，因为提交交易时可以证明有效。

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="ZK Rollup" />

<Divider />

## 来源 {#sources}

_部分由位于 [Andreas M. Antonopoulos，Gavin Wood](https://ethereumbook.info) 的 [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) 在 CC-BY-SA 下提供_

<Divider />

## 完善本页面 {#contribute-to-this-page}

我们错过了什么吗？ 有什么不正确吗？ 在 GitHub 上为这个词汇表贡献力量以帮助我们改进！

[了解更多关于如何贡献的信息](/contributing/adding-glossary-terms)
