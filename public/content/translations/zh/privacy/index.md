---
title: 以太坊上的隐私
description: 在以太坊上保护隐私的工具和技术
lang: zh
---

# 以太坊上的隐私 {#introduction}

隐私不仅对个人安全至关重要，它也是自由的基石和[去中心化](https://vitalik.eth.limo/general/2025/04/14/privacy.html)的关键保障。 隐私赋予人们自由表达、与他人交易和自由组织社区的能力。 但与所有区块链一样，以太坊的公共账本让隐私保护变得充满挑战。

以太坊在设计上是透明的。 每项链上操作对任何查看者都是可见的。 虽然以太坊通过将您的活动与[公钥](/decentralized-identity/#public-key-cryptography)而非真实世界的身份相关联来提供假名性，但活动模式仍可能被分析，从而泄露敏感信息并识别用户。

将隐私保护工具内置于以太坊可以帮助个人、组织和机构在限制不必要信息暴露的情况下安全地进行交互。 这使得生态系统更安全、更实用，适用于更广泛的用例。

## 写入隐私 {#privacy-of-writes}

默认情况下，在以太坊上写入的每笔交易都是公开且永久的。 这不仅包括发送 ETH，还包括注册 ENS 名称、收集 POAP 或交易 NFT。 支付、投票或身份验证等日常行为可能会将您的信息泄露给无关方。 有几种工具和技术可以帮助提高这些操作的私密性：

### 混合协议（或“混币器”）{#mixing-protocols}

混币器将多个用户的交易放入一个共享“池”中，然后让人们稍后提款到一个新地址，从而打破发送方和接收方之间的联系。 由于存款和取款混在一起，观察者很难将它们关联起来。

_示例：[PrivacyPools](https://docs.privacypools.com/)、[Tornado Cash](https://tornado.cash/)_

### 屏蔽池 {#shielded-pools}

屏蔽池与混币器类似，但它们允许用户在池内私密地持有和转移资金。 屏蔽池不仅混淆存款和取款之间的联系，还维持一个持续的私密状态，通常用零知识证明来保障安全。 这使得构建私密转账、私密余额等成为可能。

_示例：[Railgun](https://www.railgun.org/)、[Aztec](https://aztec.network/)、Nightfall_

### 隐身地址 {#stealth-addresses}

一个[隐身地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html)就像给每个发件人一个独特的、一次性的邮政信箱， 只有您才能打开。 每当有人向您发送加密货币时，它都会进入一个新地址，所以其他人无法看出所有这些付款都属于您。 这能让您的支付历史保持私密且更难追踪。

_示例：[UmbraCash](https://app.umbra.cash/faq)、[FluidKey](https://www.fluidkey.com/)_

### 其他用例 {#other-use-cases}

其他探索私密写入的项目包括 [PlasmaFold](https://pse.dev/projects/plasma-fold)（私密支付）以及像 [MACI](https://pse.dev/projects/maci) 和 [Semaphore](https://pse.dev/projects/semaphore)（私密投票）这样的系统。

这些工具扩展了在以太坊上进行私密写入的选项，但每种工具都有其权衡之处。 一些方法仍处于实验阶段，一些会增加成本或复杂性，而像混币器这样的一些工具可能会根据其使用方式面临法律或监管审查。

## 读取隐私 {#privacy-of-reads}

在以太坊上读取或检查任何信息（例如，你的钱包余额）通常需要通过你的钱包提供商、节点提供商或区块浏览器等服务进行。 因为您依赖他们为您读取区块链，他们也能看到您的请求以及 IP 地址或位置等元数据。 如果您持续查看同一个帐户，这些信息就可能被拼凑起来，从而将您的身份与您的活动关联起来。

运行自己的以太坊节点可以防止这种情况，但对于大多数用户来说，存储和同步整个区块链的成本高昂且不切实际，尤其是在移动设备上。

一些探索私密读取的项目包括[私密信息检索](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR，在不透露您查询内容的情况下获取数据)、[zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)（使用零知识证明进行私密身份检查）、[vOPRF](https://pse.dev/projects/voprf)（在 Web3 中假名使用 Web2 帐户）、[vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1)（对加密数据进行计算）和 [MachinaIO](https://pse.dev/projects/machina-io)（在保留功能的同时隐藏程序细节）。

## 证明隐私 {#privacy-of-proving}

隐私保护证明是您可以在以太坊上使用的工具，可以在不泄露不必要细节的情况下证明某事为真。 例如，您可以：

- 证明您已年满 18 岁，而无需分享您的完整出生日期
- 证明您拥有一个 NFT 或代币，而无需泄露您的整个钱包
- 证明您有资格获得会员资格、奖励或投票，而无需暴露其他个人数据

实现这些功能的大多数工具都依赖于零知识证明等加密技术，但挑战在于如何使它们足够高效，以便在日常设备上运行、可移植到任何平台且安全。

一些探索证明隐私的项目包括[客户端证明](https://pse.dev/projects/client-side-proving)（ZK 证明系统）、[TLSNotary](https://tlsnotary.org/)（网络上任何数据的真实性证明）、[Mopro](https://pse.dev/projects/mopro)（移动客户端证明）、[私密证明委托](https://pse.dev/projects/private-proof-delegation)（避免信任假设的委托框架）和 [Noir](https://noir-lang.org/)（用于私密和可验证计算的语言）。

## 隐私术语表 {#privacy-glossary}

**匿名**：交互时永久删除数据中的所有标识符，使信息无法追溯到个人

**加密**：一种对数据进行加扰处理，只有拥有正确密钥的人才能读取数据的过程

**[全同态加密](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**：一种直接在加密数据上执行计算，而无需对其进行解密的方法

**[不可区分混淆](https://pse.dev/projects/machina-io) (iO)**：一种隐私技术，使程序或数据在保持可用的同时变得难以理解

**[多方计算](https://pse.dev/blog/secure-multi-party-computation) (MPC)**：允许多方在不暴露各自私密输入的情况下共同计算结果的方法

**可编程密码学**：灵活、由规则驱动的密码学，可在软件中定制，以控制数据共享、验证或披露的方式和时间

**假名**：使用唯一的代码或数字（如以太坊地址）来代替个人标识符

**选择性披露**：只分享必要信息的能力（例如，在不泄露整个钱包历史记录的情况下，证明你拥有某个 NFT）

**不可关联性**：确保区块链上的不同操作无法关联到同一个地址

**可验证性**：确保他人可以确认一项声明为真，例如在以太坊上验证交易或证明

**可验证委托**：将任务（例如生成证明）分配给另一方（例如，移动钱包使用服务器进行繁重的密码学计算），同时仍然能够验证任务是否正确完成

**[零知识证明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**：一种加密协议，能让某人在不泄露基础数据的情况下证明信息为真

**ZK Rollup**：一种扩容系统，它在链下批量处理交易并在链上提交有效性证明——默认情况下不是私密的，但它们通过降低成本来支持高效的隐私系统（如屏蔽池）

## 资源{#resources}

- [以太坊隐私管理者](https://pse.dev/) (PSE) 是以太坊基金会的一个研发实验室，专注于生态系统的隐私保护
- [Web3PrivacyNow](https://web3privacy.info/)，一个由个人、项目和志同道合的组织组成的网络，致力于保护和促进线上人权
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/)，一个以太坊钱包评级网站，旨在提供一份全面的钱包列表，内容涵盖其功能、实践以及对某些标准的支持。
- [Zk-kit](https://zkkit.pse.dev/)：一套可在不同项目和零知识协议中重用的程序库（算法、实用函数和数据结构）。
- [隐私应用程序](/apps/categories/privacy/) - 发现一系列在以太坊上运行的精选隐私应用程序。
