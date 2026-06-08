---
title: 以太坊安全与防骗指南
description: 在以太坊上保持安全
lang: zh
---

对加密货币日益增长的兴趣也带来了来自骗子和黑客的不断增加的风险。本文列出了一些缓解这些风险的最佳实践。

**请记住：ethereum.org 的任何人绝不会主动联系你。不要回复声称来自以太坊官方支持的电子邮件。**

<Divider />

## 加密货币安全基础知识 {#crypto-security}

### 提升你的知识水平 {#level-up-your-knowledge}

对加密货币工作原理的误解可能会导致代价高昂的错误。例如，如果有人假装是客服人员，声称可以用你的私钥换回丢失的 ETH，他们就是在利用人们不了解[以太坊](/)是一个缺乏此类功能的去中心化网络这一点。花时间学习以太坊的工作原理是一项值得的投资。

<DocLink href="/what-is-ethereum/">
  什么是以太坊？
</DocLink>

<DocLink href="/what-is-ether/">
  什么是以太币？
</DocLink>
<Divider />

## 钱包安全 {#wallet-security}

### 绝不分享你的恢复短语 {#protect-private-keys}

**无论出于何种原因，绝不分享你的恢复短语或私钥！**

你的恢复短语（也称为秘密恢复短语或助记词）是你钱包的主密钥。任何拥有它的人都可以访问你的所有账户并卷走所有资产。私钥对于单个账户的作用也是如此。任何合法的服务、支持人员或网站绝不会向你索要这些信息。

<DocLink href="/wallets/">
  什么是以太坊钱包？
</DocLink>

#### 不要对你的助记词/私钥进行截图 {#screenshot-private-keys}

对助记词或私钥进行截图可能会将它们同步到云数据提供商，这可能会让黑客有机可乘。从云端获取私钥是黑客常见的攻击手段。

### 使用硬件钱包 {#use-hardware-wallet}

硬件钱包为私钥提供离线存储。它们被认为是存储私钥最安全的钱包选项：你的私钥永远不会接触互联网，并完全保留在你的本地设备上。

将私钥保持离线状态可以极大地降低被黑客攻击的风险，即使黑客控制了你的计算机也是如此。

#### 尝试使用硬件钱包： {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 发送前仔细检查交易 {#double-check-transactions}

意外将加密货币发送到错误的钱包地址是一个常见的错误。**在以太坊上发送的交易是不可逆的。** 除非你认识该地址的所有者并能说服他们将资金退还给你，否则你将无法找回你的资金。

在发送交易之前，请务必确保你发送的地址与预期接收者的地址完全匹配。
在与智能合约交互时，在签名之前阅读交易消息是一个好习惯。

### 设置智能合约支出限额 {#spend-limits}

在与智能合约交互时，不要允许无限制的支出限额。无限制的支出可能会使智能合约卷走你钱包中的资金。相反，应将支出限额设置为仅满足交易所需的金额。

许多以太坊钱包提供限额保护，以防止账户资金被卷走。

[如何撤销智能合约对你加密货币资金的访问权限](/guides/how-to-revoke-token-access/)

<Divider />

## 常见骗局 {#common-scams}

完全阻止骗子是不可能的，但我们可以通过了解他们最常用的手段来降低其得逞的几率。这些骗局有许多变种，但它们通常遵循相同的总体模式。如果没有别的，请记住：

- 始终保持怀疑态度
- 没有人会给你免费或打折的 ETH
- 没有人需要访问你的私钥或个人信息

### 推特广告网络钓鱼 {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

有一种方法可以欺骗推特（也称为 X）的链接预览功能（展开），从而可能欺骗用户，让他们以为自己正在访问一个合法的网站。这种技术利用了推特为推文中分享的 URL 生成预览的机制，例如显示 _来自 ethereum.org_（如上所示），而实际上他们被重定向到了一个恶意网站。

始终检查你是否在正确的域名上，尤其是在点击链接之后。

[在此处了解更多信息](https://harrydenley.com/faking-twitter-unfurling)。

### 赠品骗局 {#giveaway}

加密货币中最常见的骗局之一是赠品骗局。赠品骗局可以采取多种形式，但总体思路是，如果你将 ETH 发送到提供的钱包地址，你将收回双倍的 ETH。*因此，它也被称为“买一送一”骗局。*

这些骗局通常规定申领赠品的时间有限，以制造一种虚假的紧迫感。

### 社交媒体黑客攻击 {#social-media-hacks}

2020 年 7 月发生了一起备受瞩目的此类事件，当时知名名人和组织的推特账户遭到黑客攻击。黑客同时在被黑账户上发布了比特币赠品活动。尽管这些欺骗性推文很快被发现并删除，但黑客仍然成功卷走了 11 个比特币（截至 2021 年 9 月价值 50 万美元）。

![A scam on Twitter](./appleTwitterScam.png)

### 名人赠品 {#celebrity-giveaway}

名人赠品是赠品骗局的另一种常见形式。骗子会截取名人录制的视频采访或会议演讲，并在 YouTube 上进行直播——使其看起来好像名人正在进行实时视频采访，为加密货币赠品活动背书。

维塔利克·布特林最常被用于这种骗局，但许多其他参与加密货币的知名人士也经常被利用（例如埃隆·马斯克或查尔斯·霍斯金森）。包含知名人士会给骗子的直播带来一种合法感（这看起来很可疑，但维塔利克参与其中，所以肯定没问题！）。

**赠品活动总是骗局。如果你将资金发送到这些账户，你将永远失去它们。**

![A scam on YouTube](./youtubeScam.png)

### 客服支持骗局 {#support-scams}

加密货币是一项相对年轻且容易被误解的技术。利用这一点的一个常见骗局是客服支持骗局，骗子会冒充流行钱包、交易所或区块链的客服支持人员。

许多关于以太坊的讨论都发生在 Discord 上。客服支持骗子通常会通过在公共 Discord 频道中搜索支持问题来寻找目标，然后向提问者发送私信提供支持。通过建立信任，客服支持骗子试图诱骗你泄露私钥或将资金发送到他们的钱包。

![A support scam on Discord](./discordScam.png)

作为一般规则，工作人员绝不会通过私人的、非官方的渠道与你沟通。在与客服支持人员打交道时，请记住以下几点：

- 绝不分享你的私钥、助记词或密码
- 绝不允许任何人远程访问你的计算机
- 绝不在组织指定的渠道之外进行沟通

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    当心：虽然客服支持类骗局通常发生在 Discord 上，但它们也可能在任何进行加密货币讨论的聊天应用程序（包括电子邮件）中盛行。
</AlertDescription>
</AlertContent>
</Alert>

### “Eth2”代币骗局 {#eth2-token-scam}

在[合并](/roadmap/merge/)的准备阶段，骗子利用了围绕“Eth2”一词的混乱，试图让用户将他们的 ETH 兑换成“ETH2”代币。根本不存在“ETH2”，合并也没有引入任何其他合法的代币。你在合并前拥有的 ETH 与现在的 ETH 是一样的。**无需对你的 ETH 采取任何行动来应对从工作量证明 (PoW) 到权益证明 (PoS) 的转换**。

骗子可能会伪装成“客服支持”，告诉你如果存入 ETH，你将收到“ETH2”。不存在[以太坊官方支持](/community/support/)，也没有新的代币。绝不与任何人分享你的钱包助记词。

_注意：存在可能代表已质押 ETH 的衍生代币/代码（即来自 Rocket Pool 的 rETH、来自 Lido 的 stETH、来自 Coinbase 的 ETH2），但这些并不是你需要“迁移”到的东西。_

### 网络钓鱼骗局 {#phishing-scams}

网络钓鱼骗局是骗子试图窃取你钱包资金的另一个日益常见的手段。

一些网络钓鱼电子邮件要求用户点击链接，这些链接会将他们重定向到仿冒网站，要求他们输入助记词、重置密码或发送 ETH。其他电子邮件可能会要求你在不知情的情况下安装恶意软件，以感染你的计算机并让骗子访问你计算机的文件。

如果你收到来自未知发件人的电子邮件，请记住：

- 绝不打开来自你不认识的电子邮件地址的链接或附件
- 绝不向任何人泄露你的个人信息或密码
- 删除来自未知发件人的电子邮件

[有关避免网络钓鱼骗局的更多信息](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 加密货币交易经纪人骗局 {#broker-scams}

诈骗性的加密货币交易经纪人声称自己是专业的加密货币经纪人，他们会提出拿走你的钱并代你投资。在骗子收到你的资金后，他们可能会继续欺骗你，要求你发送更多资金，以免错过进一步的投资收益，或者他们可能会完全消失。

这些骗子通常通过在 YouTube 上使用虚假账户发起关于“经纪人”的看似自然的对话来寻找目标。这些对话通常会获得大量点赞以增加合法性，但这些点赞都来自机器人账户。

**不要相信互联网上的陌生人代你投资。你会失去你的加密货币。**

![A trading broker scam on YouTube](./brokerScam.png)

### 加密货币矿池骗局 {#mining-pool-scams}

截至 2022 年 9 月，在以太坊上挖矿已不再可能。然而，矿池骗局依然存在。矿池骗局涉及有人主动联系你，声称加入以太坊矿池可以获得高额回报。骗子会做出承诺，并尽可能长时间地与你保持联系。从本质上讲，骗子会试图说服你，当你加入以太坊矿池时，你的加密货币将被用于创建 ETH，并且你将获得 ETH 分红。然后你会看到你的加密货币正在产生小额回报。这只是为了引诱你投资更多。最终，你的所有资金都将被发送到一个未知地址，骗子要么消失，要么在某些情况下会继续保持联系（正如最近的一个案例中所发生的那样）。

底线：警惕在社交媒体上联系你并要求你加入矿池的人。一旦你失去了加密货币，它就永远消失了。

需要记住的一些事情：

- 警惕任何联系你并提供利用你的加密货币赚钱方法的人
- 对质押、流动性池或其他投资加密货币的方式进行研究
- 此类计划很少（如果有的话）是合法的。如果它们是合法的，它们可能会成为主流，你早就听说过它们了。

[男子在矿池骗局中损失 20 万美元](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 空投骗局 {#airdrop-scams}

空投骗局涉及一个诈骗项目将资产（NFT、代币）空投到你的钱包中，并引导你到一个诈骗网站去申领空投的资产。在尝试申领时，系统会提示你使用以太坊钱包登录并“授权”一笔交易。这笔交易会将你的公钥和私钥发送给骗子，从而危及你的账户。这种骗局的另一种形式可能会让你确认一笔将资金发送到骗子账户的交易。

[有关空投骗局的更多信息](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 网络安全基础知识 {#web-security}

### 使用强密码 {#use-strong-passwords}

[超过 80% 的账户被黑客攻击是由于密码薄弱或被盗造成的](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/)。由字符、数字和符号组成的长组合将有助于确保你的账户安全。

一个常见的错误是使用几个常见的、相关的单词的组合。像这样的密码是不安全的，因为它们很容易受到一种称为字典攻击的黑客技术的攻击。

```md
弱密码示例：CuteFluffyKittens!

强密码示例：ymv\*azu.EAC8eyp8umf
```

另一个常见的错误是使用容易被猜到或通过[社会工程学](<https://wikipedia.org/wiki/Social_engineering_(security)）发现的密码。在密码中包含你母亲的娘家姓、你的孩子或宠物的名字，或者出生日期，都会增加被黑客攻击的风险。

#### 良好的密码习惯： {#good-password-practices}

- 尽可能使密码达到密码生成器或你正在填写的表单所允许的最大长度
- 混合使用大写字母、小写字母、数字和符号
- 不要在密码中使用个人详细信息，例如姓氏
- 避免使用常用词

[有关创建强密码的更多信息](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 为所有内容使用唯一的密码 {#use-unique-passwords}

在数据泄露中暴露的强密码不再是强密码。[Have I Been Pwned](https://haveibeenpwned.com) 网站允许你检查你的账户是否卷入了任何公共数据泄露事件。如果是，**请立即更改这些密码**。为每个账户使用唯一的密码可以降低在一个密码被泄露时黑客访问你所有账户的风险。

### 使用密码管理器 {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    使用密码管理器可以帮你创建强大、唯一的密码并记住它们！我们<strong>强烈</strong>建议使用密码管理器，而且它们大多数都是免费的！
</AlertDescription>
</AlertContent>
</Alert>

记住你拥有的每个账户的强大、唯一的密码并不理想。密码管理器为你所有的密码提供了一个安全的加密存储库，你可以通过一个强大的主密码来访问它。在注册新服务时，它们还会建议使用强密码，因此你无需自己创建。许多密码管理器还会告诉你是否卷入了数据泄露事件，从而允许你在任何恶意攻击发生之前更改密码。

![Example of using a password manager](./passwordManager.png)

#### 尝试使用密码管理器： {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- 或者查看其他[推荐的密码管理器](https://www.privacytools.io/secure-password-manager)

### 使用双重身份验证 {#two-factor-authentication}

有时你可能会被要求通过独特的证明来验证你的身份。这些被称为**因素**。三个主要因素是：

- 你知道的东西（例如密码或安全问题）
- 你本身的特征（例如指纹或虹膜/面部扫描仪）
- 你拥有的东西（安全密钥或手机上的身份验证应用程序）

使用**双重身份验证 (2FA)** 为你的在线账户提供了额外的*安全因素*。2FA 确保仅仅拥有密码不足以访问账户。最常见的是，第二个因素是一个随机的 6 位数代码，称为**基于时间的一次性密码 (TOTP)**，你可以通过 Google Authenticator 或 Authy 等身份验证器应用程序访问它。这些作为“你拥有的东西”因素发挥作用，因为生成定时代码的种子存储在你的设备上。

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    注意：使用基于短信的 2FA 容易受到<a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM 卡劫持</a>的攻击，并且不安全。为了获得最佳安全性，请使用 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> 或 <a href="https://authy.com/">Authy</a> 等服务。
</AlertDescription>
</AlertContent>
</Alert>

#### 安全密钥 {#security-keys}

安全密钥是一种更高级、更安全的 2FA 类型。安全密钥是物理硬件身份验证设备，其工作原理类似于身份验证器应用程序。使用安全密钥是最安全的 2FA 方式。许多此类密钥利用了 FIDO 通用第二因素 (U2F) 标准。[了解有关 FIDO U2F 的更多信息](https://www.yubico.com/resources/glossary/fido-u2f/)。

观看有关 2FA 的更多信息：

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### 卸载浏览器扩展程序 {#uninstall-browser-extensions}

浏览器扩展程序（如 Chrome 扩展程序或 Firefox 附加组件）可以改善浏览器功能，但也伴随着风险。默认情况下，大多数浏览器扩展程序会要求访问“读取和更改网站数据”的权限，从而允许它们对你的数据执行几乎任何操作。Chrome 扩展程序始终会自动更新，因此以前安全的扩展程序稍后可能会更新以包含恶意代码。大多数浏览器扩展程序并不试图窃取你的数据，但你应该意识到它们有这个能力。

#### 通过以下方式保持安全： {#browser-extension-safety}

- 仅从受信任的来源安装浏览器扩展程序
- 删除未使用的浏览器扩展程序
- 在本地安装 Chrome 扩展程序以停止自动更新（高级）

[有关浏览器扩展程序风险的更多信息](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 延伸阅读 {#further-reading}

### 网络安全 {#reading-web-security}

- [多达 300 万台设备感染了带有恶意软件的 Chrome 和 Edge 附加组件](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [如何创建你不会忘记的强密码](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [什么是安全密钥？](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### 加密货币安全 {#reading-crypto-security}

- [保护你自己和你的资金](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [常见加密货币通信软件中的安全问题](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [写给小白和聪明人的安全指南](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [加密货币安全：密码和身份验证](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 防骗教育 {#reading-scam-education}

- [指南：如何识别诈骗代币](/guides/how-to-id-scam-tokens/)
- [保持安全：常见骗局](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [避免骗局](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [关于常见加密货币网络钓鱼电子邮件和消息的推特长文](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />