---
title: 以太坊安全和预防欺诈措施
description: 在以太坊上保持安全
lang: zh
---

# 以太坊安全和预防欺诈措施 {#introduction}

随着人们对加密货币的兴趣日益浓厚，黑客和骗子带来的风险也随之增加。 本文罗列了一些降低此类风险的最佳做法。

**请记住：ethereum.org 的人员永远不会主动联系你。 请不要回复声称来自以太坊官方支持的任何电子邮件。**

<Divider />

## 加密货币安全 101 {#crypto-security}

### 提升你的知识水平 {#level-up-your-knowledge}

对加密货币运作方式的误解可能会造成重大过失。 例如，如果有人冒充客服人员，声称可以归还你损失的以太币以换取你的私钥，他们是在试图利用人们不了解以太坊是一个去中心化网络，并不具备此类功能这一事实。 了解以太坊如何运作是一项值得的投资。

<DocLink href="/what-is-ethereum/">
  什么是以太坊？
</DocLink>

<DocLink href="/eth/">
  什么是以太币？
</DocLink>
<Divider />

## 钱包安全 {#wallet-security}

### 切勿泄漏你的私钥 {#protect-private-keys}

**无论何种原因，切勿与他人分享你的私钥！**

钱包私钥就是你的以太坊钱包的密码。 这是阻止知道你的钱包地址的人榨干你帐户中所有资产的唯一方法。

<DocLink href="/wallets/">
  什么是以太坊钱包？
</DocLink>

#### 不要将你的助记词/私钥截图 {#screenshot-private-keys}

如果将你的助记词或私钥截图，就有可能将它们同步到云端数据提供商，这意味着它们可能会被黑客获取。 从云端获取私钥是常见的黑客攻击向量。

### 使用硬件钱包 {#use-hardware-wallet}

硬件钱包为私钥提供离线存储。 它们被认为是用来存储私钥的最安全的钱包选项：私钥永远不能放到互联网上，它们只能完全保存在本地设备中。

即使黑客控制了你的电脑，将私钥保持在离线状态，可以大大降低被黑客攻击的风险。

#### 尝试以下硬件钱包: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 发送交易前仔细检查 {#double-check-transactions}

不小心将加密货币发送到错误的钱包地址是一个常见的错误。 **在以太坊上发送的交易是不可逆的。**除非你认识地址所有者并能说服他们把你的资金退回来，否则你将无法找回你的资金。

在发送交易之前，请务必确保你发送的地址与接收人的地址完全匹配。 当你与智能合约进行交互时，在签名之前检查交易信息是一种好习惯。

### 设置智能合约的支出限额 {#spend-limits}

与智能合约进行交互时，不得允许无限制支出限额。 无支出限额可以让智能合约掏空你的钱包。 相反，只将支出限额设置为交易所需金额。

许多以太坊钱包提供限额保护，以防止帐户被掏空。

[如何撤销智能合约访问你的加密资金](/guides/how-to-revoke-token-access/)

<Divider />

## 常见的骗术 {#common-scams}

完全阻止诈骗是不可能的，但如果我们了解骗子最常用的伎俩，就可以降低他们的成功率。 虽然骗术层出不穷，但是他们的本质相同。 最重要的是，请记住：

- 始终保持怀疑态度
- 没有人会给你免费或打折的以太币
- 没有人需要获取你的私钥或个人信息

### 推特广告钓鱼 {#ad-phishing}

![推特链接钓鱼](./twitterPhishingScam.png)

有一种仿冒推特（也被称为 X）链接预览功能（展开）的方法，可能会让用户误以为他们正在访问一个合法网站。 这种技术利用了推特为推文中分享的 URL 生成预览的机制，并显示诸如_来自 ethereum.org_ 的预览（如上所示），但实际上用户却被重定向到了一个恶意网站。

务必检查你是否处于正确的域，尤其是在点击链接以后。

[点击此处了解更多信息](https://harrydenley.com/faking-twitter-unfurling)。

### 赠品诈骗 {#giveaway}

加密货币中最常见的骗局之一是赠品诈骗。 赠品诈骗有多种形式，但总体思路是：如果你把以太币发送到指定的钱包地址，你将会收到双倍的以太币。 *因此，它也称为“买一送一”诈骗。*

这些骗局往往规定领取赠品的时间有限，制造出一种虚假的紧迫感。

### 社交媒体黑客攻击 {#social-media-hacks}

最出名的一次发生在 2020 年 7 月，当时很多知名人士和组织的 Twitter 帐户被黑。 黑客使用被盗的帐户发布了一个比特币赠送活动。 尽管这些欺骗性的推文很快就被发现并删除，但黑客们还是成功骗走了 11 个比特币（截至 2021年 9 月，这些比特币价值 50 万美元）。

![Twitter 上的诈骗案例](./appleTwitterScam.png)

### 名人的赠品 {#celebrity-giveaway}

名人的赠品是赠品诈骗的另一种常见形式。 骗子会录制名人的视频采访或会议演讲，并在 YouTube 上进行直播 - 看起来好像名人正在接受直播视频采访，为加密货币赠送活动背书。

除最常使用的 Vitalik Buterin 以外，此类骗局也使用了加密货币圈内许多其他知名人士（例如 Elon Musk 或 Charles Hoskinson）。 在直播中加入一位知名人士会让骗局看起来有一种合法性（这看起来有点牵强，但 Vitalik 参与其中，所以肯定没问题！）。

**赠品活动通常是骗局。 如果你把钱转到这些帐户，你将永远失去它们。**

![YouTube 上的诈骗案例](./youtubeScam.png)

### 技术支持诈骗 {#support-scams}

加密货币是一种相对年轻且常被误解的技术。 利用这一点的一种常见的骗局是技术支持诈骗，骗子会冒充受欢迎的加密货币钱包、交易所或区块链的支持人员。

很多关于以太坊的讨论都发生在 Discord 上。 骗子通常会通过在公开的 Discord 频道中搜索寻求支持的问题，以此找到诈骗对象，然后冒充支持人员向询问者发送私人信息以提供技术支持。 通过建立信任，冒充支持人员的骗子试图诱使你透露私钥或将资金发送到他们的钱包。

![Discord 上的技术支持诈骗案例](./discordScam.png)

一般来说，员工永远不会通过私人的非官方渠道与你交流。 在处理支持问题时，要牢记一些简单的事情：

- 永远不要分享你的私钥、助记词或密码
- 绝不允许任何人远程访问你的电脑
- 切勿通过官方指定以外的渠道沟通

<InfoBanner emoji=":lock:">
  <div>
    请注意：尽管支持类型的骗局通常发生在 Discord 上，但它们也在任何讨论加密货币聊天应用程序（包括电子邮件）上普遍存在。
  </div>
</InfoBanner>

### “以太坊 2”代币骗局 {#eth2-token-scam}

在[合并](/roadmap/merge/)的准备阶段，骗子利用“以太坊 2”这一术语的含糊不清，试图让用户将他们的以太币兑换成“以太坊 2”代币。 实际上合并并没有产生任何“以太坊 2”代币，或者任何其它合法代币。 你在合并之前拥有的以太币与现在是同一个以太币。 **从工作量证明切换到权益证明时，无需对帐户采取任何与以太币有关的操作**。

骗子可能会以“技术支持”的面貌出现，告诉你如果存入以太币，将收到“以太坊 2”代币。 实际上，并没有[官方的以太坊技术支持](/community/support/)，也没有新代币。 永远不要与任何人分享你的钱包助记词。

_注意：有一些衍生的代币/票据可能代表了被质押的以太币（比如：Rocket Pool 的 rETH，Lido 的 stETH，Coinbase 的 ETH2），但这些都不需要“迁移过去”。_

### 网络钓鱼诈骗 {#phishing-scams}

网络钓鱼诈骗是另一种越来越常见的诈骗手段，骗子利用这种手段试图窃取你钱包中的资金。

一些网络钓鱼电子邮件要求用户点击链接，将其重新定向到仿冒网站，并要求用户输入助记词、重置密码或发送以太币。 还有一些可能会让你在不知情的情况下安装恶意软件以便感染你的电脑，并让骗子能够访问你的电脑文件。

如果你收到一封来历不明的电子邮件，请记住：

- 永远不要打开你不认识的电子邮件地址中的链接或附件
- 切勿将你的个人信息或密码泄露给任何人
- 删除来历不明的电子邮件

[更多关于避免网络钓鱼骗局的信息](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 加密货币交易经纪人诈骗 {#broker-scams}

在加密货币交易经纪人骗局中，骗子自称是专业的加密货币经纪人，会拿着你的钱帮你进行投资。 骗子收到你的钱后，他们可能会诱骗你，让你拿出更多资金，这样你就不会错过更高的投资收益，或者他们也可能就完全消失了。

这些骗子往往利用 YouTube 上的虚假帐户，进行看似自然的有关“经纪人”的对话，以此来寻找他们的目标。 这些对话通常会收到很多点赞，以增加真实性，但这些“赞”都是来自机器人帐户。

**不要相信互联网上的陌生人，让他们代你投资。 你将失去你的加密货币。**

![YouTube 上的交易经纪人诈骗案例](./brokerScam.png)

### 加密货币矿池骗局 {#mining-pool-scams}

自 2022 年 9 月起，在以太坊上挖矿已不再可能。 但是，矿池骗局仍然存在。 在矿池骗局中会有人主动联系你，并声称你可以通过加入以太坊矿池获得丰厚回报。 骗子会提出要求，并一直与你保持联系。 本质上讲，骗子会试图让你相信，在加入一个以太坊矿池后，你的加密货币将用于创建以太币，而且你将获得以太币红利。 然后你会发现你的加密货币正在赚取微薄的回报。 这只是为了引诱你投入更多的资金。 最终，你的所有资金将被发送到一个未知地址，骗子要么消失，要么在某些情况下会继续保持联系，就像最近发生的一个案例一样。

底线是，提防那些在社交媒体上与你联系并要求你加入矿池的人。 一旦你失去你的加密货币，它就永远回不来了。

有些事情要记住：

- 警惕任何与你联系，告诉你如何使用加密货币赚钱的人
- 做好关于赌注、流动性池或其他加密货币投资方式的调研
- 这种计划即使有，也很少是合法的。 如果是的话，它们会成为主流，你会听说过它们。

[有人在矿池骗局中损失了 20 万美元](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 空投骗局 {#airdrop-scams}

空投骗局通常是先构建一个诈骗项目，并向你的钱包空投一种资产（非同质化代币、其他代币），给你发送一个诈骗网站，让你领取这些空投的资产。 当你试图领取资产时，网站会要求你使用自己的以太坊钱包登录，并“批准”一笔交易。 实际上，这个交易会将你帐户的公钥私钥都发给骗子。 这种骗局的另一种方式是让你确认一笔可以把资金转移到骗子帐户的交易。

[更多关于空投骗局的信息](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 网络安全 101 {#web-security}

### 使用强密码 {#use-strong-passwords}

[超过 80% 的帐户被黑客攻击是由于密码薄弱或被盗造成的](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/)。 一串很长的字符、数字和符号组合可帮助保护你的帐户安全。

一种常见错误是使用一些常见的、有关联的单词组合。 像这样的密码是不安全的，因为它们很容易被称为字典攻击的简单黑客技术攻击。

```md
弱密码示例：CuteFluffyKittens!

强密码示例：ymv\*azu.EAC8eyp8umf
```

另一种常见错误是使用容易通过[社会工程学](https://wikipedia.org/wiki/Social_engineering_(security))猜出或发现的密码。 在密码中加入母亲的婚前姓氏、孩子或宠物的名字或出生日期，会增加密码被黑客攻击的风险。

#### 强密码设置方法： {#good-password-practices}

- 在密码生成器或你所填写的表格允许的范围内，将密码设得越长越好
- 混合使用大写字母、小写字母、数字和符号
- 不要在密码中使用个人详细资料，如姓氏
- 避免使用常见的单词

[关于创建强密码的更多内容](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 使用独立的密码 {#use-unique-passwords}

数据泄露中外泄的强密码不再是强密码。 你可以在 [Have I Been Pwned](https://haveibeenpwned.com) 网站上检查你的帐户是否在任何公共数据泄露中被泄露。 如果是，**请立即更改被泄露的密码**。 为每个帐户设置独立的密码，可以在你的一个密码被破解时降低黑客访问你所有帐户的风险。

### 使用密码管理器 {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    使用密码管理器可以创建唯一的强密码并记住它们！ 我们<strong>强烈</strong>推荐使用它，而且它们大部分是免费的。
  </div>
</InfoBanner>

记住为每个帐户设置的唯一强密码并不现实。 密码管理器为你的所有密码提供了一个安全、加密的存储空间，你可以通过一个强主密码进行访问。 他们还在注册新服务时生成建议使用的强密码，这样你就不必自行创建密码了。 许多密码管理器也会告诉你是否涉及数据泄露，让你在任何恶意攻击之前更改密码。

![密码管理器使用示例](./passwordManager.png)

#### 尝试一个密码管理器： {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- 或查看其他[推荐的密码管理器](https://www.privacytools.io/secure-password-manager)

### 2FA（双重身份验证） {#two-factor-authentication}

有时可能会要求你通过提供特有的证明来验证你的身份。 这些证明称为**因素**。 下面是三类重要因素：

- 你知道的信息（例如密码或安全问题）
- 生理特征（如指纹或虹膜/面部识别）
- 你私有的（安全密钥或你手机上的认证程序）

使用**双重身份验证 (2FA) **将为你的在线帐户提供一个额外的*安全因素*。 双重身份验证确保仅仅有你的密码还不足以访问你的帐户。 最常见的是，双重验证是一个随机的6位数代码，被称为**基于时间的一次性密码（TOTP）**，你可以通过身份验证程序应用程序（如Google authenticator或Authy）生成。 这是一种“你私有的”，因为生成随机时间密码的种子文件存储在你的设备上。

<InfoBanner emoji=":lock:">
  <div>
    注意：使用基于短信的双重身份验证很容易遭受 <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM 卡盗用</a>，并不安全。 为了获得最佳安全性，请使用诸如 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google 身份验证器</a> 或 <a href="https://authy.com/">Authy</a> 之类的服务。
  </div>
</InfoBanner>

#### 安全密钥 {#security-keys}

安全密匙是一种更高级、更安全的双重身份验证。 安全密钥是物理硬件身份验证设备，其工作方式与身份验证程序应用程序相似。 使用安全密钥是最安全的 2FA 使用方式。 这些密钥中有许多采用了 FIDO 通用第二因素 (U2F) 标准。 [了解更多关于 FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/) 的信息。

观看以下视频，了解更多关于双重身份验证的信息：

<YouTube id="m8jlnZuV1i4" start="3479" />

### 卸载浏览器扩展程序 {#uninstall-browser-extensions}

Chrome 扩展程序或 Firefox 插件等浏览器扩展程序可以增强浏览器的功能，但它们也会带来风险。 大多数浏览器扩展程序默认请求获得“读取和更改网站数据”的权限，几乎允许它们对你的数据做任何事情。 Chrome 扩展程序总是自动更新，因此旧版本安全的扩展程序可能会在更新后被加入恶意代码。 大多数浏览器扩展程序都不会试图窃取你的数据，但你应该知道它们可以。

#### 通过以下方式保持安全： {#browser-extension-safety}

- 只安装来自受信任来源的浏览器扩展程序
- 删除不使用的浏览器扩展程序
- 在本地安装 Chrome 扩展程序以停止自动更新（高级）

[更多关于浏览器扩展程序的风险](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 延伸阅读 {#further-reading}

### 网络安全 {#reading-web-security}

- [多达 300 万台设备被带有恶意软件的 Chrome 和 Edge 插件感染](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [如何创建一个不会忘记的强密码](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [什么是安全密钥？](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### 加密货币安全 {#reading-crypto-security}

- [保护自己和资金](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [常见加密通信软件中的安全问题](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [任何人都适用的安全指南](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [加密货币安全：密码和身份验证](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 防诈骗指南 {#reading-scam-education}

- [指南：如何识别诈骗代币](/guides/how-to-id-scam-tokens/)
- [保持安全：常见骗局](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [避免骗局](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [关于常见加密货币网络钓鱼电子邮件和消息的 Twitter 线程](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
