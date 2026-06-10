---
title: 以太坊上的隐私
description: 在以太坊上保护隐私的工具和技术
lang: zh
---

隐私不仅对个人安全至关重要，它还是自由的基石，也是[去中心化的关键保障](https://vitalik.eth.limo/general/2025/04/14/privacy.html)。隐私赋予人们自由表达、与他人交易以及自由组织社区的能力。但与所有区块链一样，以太坊的公共账本让隐私保护面临挑战。

以太坊在设计上是透明的。每一个链上操作对任何人都是可见的。虽然以太坊通过将你的活动与[公钥](/decentralized-identity/#public-key-cryptography)而不是现实世界的身份相关联来提供假名性，但活动模式仍可能被分析，从而泄露敏感信息并识别出用户。

在以太坊中构建隐私保护工具可以帮助个人、组织和机构安全地进行交互，同时限制不必要的暴露。这使得生态系统更加安全，并且在更广泛的用例中更具实用性。

<VideoWatch slug="privacy-is-existential" />

## 写入隐私 {#privacy-of-writes}

默认情况下，写入以太坊的每笔交易都是公开且永久的。这不仅包括发送 ETH，还包括注册 ENS 名称、收集 POAP 或交易 NFT。支付、投票或身份验证等日常操作可能会向意外的第三方泄露你的信息。有几种工具和技术可以帮助提高这些操作的隐私性：

### 混币协议（或“混币器”） {#mixing-protocols}

混币器通过将许多用户的交易放入一个共享的“池”中，然后让人们稍后提款到一个新地址，从而打破发送者和接收者之间的联系。由于存款和提款混合在一起，观察者很难将它们联系起来。

_示例：[PrivacyPools](https://docs.privacypools.com/)、[Tornado Cash](https://tornado.cash/)_

### 屏蔽池 {#shielded-pools}

屏蔽池类似于混币器，但它们允许用户在池内私密地持有和转账资金。屏蔽池不仅仅是掩盖存款和提款之间的联系，而是维持一个持续的私密状态，通常由零知识证明来保障安全。这使得构建私密转账、私密余额等成为可能。

_示例：[Railgun](https://www.railgun.org/)、[Aztec](https://aztec.network/)、Nightfall_

### 隐形地址 {#stealth-addresses}

[隐形地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html)就像是给每个发送者一个只有你能打开的、独一无二的一次性邮政信箱。每次有人向你发送加密货币时，它都会进入一个新地址，因此没有其他人能看出所有这些付款都属于你。这使你的付款历史保持私密，并且更难被追踪。

_示例：[UmbraCash](https://app.umbra.cash/faq)、[FluidKey](https://www.fluidkey.com/)_

### 其他用例 {#other-use-cases}

探索私密写入的其他项目包括 [PlasmaFold](https://pse.dev/projects/plasma-fold)（私密支付）以及 [MACI](https://pse.dev/projects/maci) 和 [Semaphore](https://pse.dev/projects/semaphore) 等系统（私密投票）。

这些工具扩展了在以太坊上进行私密写入的选项，但每种工具都有其权衡。一些方法仍处于实验阶段，一些会增加成本或复杂性，而像混币器这样的工具可能会根据其使用方式面临法律或监管审查。

## 读取隐私 {#privacy-of-reads}

在以太坊上读取或检查任何信息（例如你的钱包余额）通常需要通过钱包提供商、节点提供商或区块浏览器等服务。因为你依赖它们为你读取区块链，它们也能看到你的请求以及你的 IP 地址或位置等元数据。如果你不断检查同一个账户，这些信息就可以被拼凑起来，将你的身份与你的活动联系起来。

运行你自己的以太坊节点可以防止这种情况，但存储和同步完整的区块链对于大多数用户来说仍然成本高昂且不切实际，尤其是在移动设备上。

探索私密读取的一些项目包括 [私有信息检索](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)（PIR，在不泄露你正在查找的内容的情况下获取数据）、[zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)（使用零知识证明进行私密身份检查）、[vOPRF](https://pse.dev/projects/voprf)（在 Web3 中以假名方式使用 Web2 账户）、[vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1)（对加密数据进行计算）以及 [MachinaIO](https://pse.dev/projects/machina-io)（在保持功能的同时隐藏程序细节）。

## 证明隐私 {#privacy-of-proving}

隐私保护证明是你可以用在以太坊上的工具，用于证明某事是真实的，而无需透露不必要的细节。例如，你可以：

- 证明你已年满 18 岁，而无需分享你的完整出生日期
- 证明你拥有某个 NFT 或代币，而无需暴露你的整个钱包
- 证明你有资格获得会员资格、奖励或参与投票，而无需暴露其他个人数据

大多数此类工具依赖于零知识证明等密码学技术，但面临的挑战是使它们足够高效以在日常设备上运行、可移植到任何平台并且安全。

探索证明隐私的一些项目包括 [客户端证明](https://pse.dev/projects/client-side-proving)（ZK 证明系统）、[TLSNotary](https://tlsnotary.org/)（网络上任何数据的真实性证明）、[Mopro](https://pse.dev/projects/mopro)（移动客户端证明）、[私有证明委托](https://pse.dev/projects/private-proof-delegation)（避免信任假设的委托框架）以及 [Noir](https://noir-lang.org/)（用于私密和可验证计算的语言）。

## 隐私术语表 {#privacy-glossary}

**匿名 (Anonymous)**：在交互时从你的数据中永久移除所有标识符，使得信息无法追溯到个人

**加密 (Encryption)**：一种将数据打乱的过程，使得只有拥有正确密钥的人才能读取它

**[全同态加密](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**：一种直接对加密数据执行计算而无需解密的方法

**[不可区分混淆](https://pse.dev/projects/machina-io) (iO)**：使程序或数据难以理解但仍可使用的隐私技术

**[多方计算](https://pse.dev/blog/secure-multi-party-computation) (MPC)**：允许多方共同计算结果而不暴露其私有输入的方法

**可编程密码学 (Programmable Cryptography)**：灵活的、规则驱动的密码学，可以在软件中进行定制，以控制数据共享、验证或揭示的方式和时间

**假名 (Pseudonymous)**：使用唯一的代码或数字（如以太坊地址）代替个人标识符

**选择性披露 (Selective Disclosure)**：仅分享所需内容的能力（例如，证明你拥有某个 NFT 而不泄露你的整个钱包历史记录）

**不可链接性 (Unlinkability)**：确保区块链上的独立操作无法追溯到同一个地址

**可验证性 (Verifiability)**：确保其他人可以确认某项声明是真实的，例如在以太坊上验证交易或证明

**可验证委托 (Verifiable Delegation)**：将任务（如生成证明）分配给另一方（例如，移动钱包使用服务器进行繁重的密码学计算），同时仍然能够验证其是否正确完成

**[零知识证明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**：允许某人证明信息是真实的而不泄露底层数据的密码学协议

**ZK Rollup**：一种可扩展性系统，它在链下批量处理交易并在链上提交有效性证明——默认情况下不具备隐私性，但它们通过降低成本实现了高效的隐私系统（如屏蔽池）

## 资源 {#resources}

- [以太坊隐私守护者](https://pse.dev/) (PSE)，一个专注于生态系统隐私的以太坊基金会研发实验室
- [Web3PrivacyNow](https://web3privacy.info/)，一个由保护和推进在线人权的个人、项目和结盟组织组成的网络
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/)，一个以太坊钱包评级网站，旨在提供钱包的全面列表、其功能、实践以及对特定标准的支持情况。
- [Zk-kit](https://zkkit.pse.dev/)：一组可在不同项目和零知识协议中重复使用的库（算法、实用函数和数据结构）。
- [隐私应用 (Privacy Apps)](/apps/categories/privacy/) - 探索在以太坊上运行的精选隐私应用程序列表。