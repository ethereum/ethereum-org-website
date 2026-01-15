---
title: 以太坊安全和预防欺诈措施
description: 在以太坊上保持安全
lang: zh
---

# 以太坊安全与欺诈预防 {#introduction}

随着人们对加密货币的兴趣日益浓厚，黑客和骗子带来的风险也随之增加。 本文罗列了一些降低此类风险的最佳做法。

**请记住：ethereum.org 的工作人员绝不会主动联系您。** **请勿回复声称来自以太坊官方支持的电子邮件。**

<Divider />

## 加密安全入门 {#crypto-security}

### 提升您的知识水平 {#level-up-your-knowledge}

对加密货币运作方式的误解可能会造成重大过失。 例如，如果有人冒充客服人员，声称可以归还你损失的以太币以换取你的私钥，他们是在试图利用人们不了解以太坊是一个去中心化网络，并不具备此类功能这一事实。 了解以太坊如何运作是一项值得的投资。

<DocLink href="/what-is-ethereum/">
  什么是以太坊？
</DocLink>

<DocLink href="/eth/">
  什么是以太币？
</DocLink>
<Divider />

## 钱包安全 {#wallet-security}

### 不要泄露您的私钥 {#protect-private-keys}

**无论何种原因，切勿与他人分享您的私钥！**

钱包私钥就是你的以太坊钱包的密码。 这是阻止知道你的钱包地址的人榨干你帐户中所有资产的唯一方法。

<DocLink href="/wallets/">
  什么是以太坊钱包？
</DocLink>

#### 不要为您的助记词/私钥截图 {#screenshot-private-keys}

如果将你的助记词或私钥截图，就有可能将它们同步到云端数据提供商，这意味着它们可能会被黑客获取。 从云端获取私钥是常见的黑客攻击向量。

### 使用硬件钱包 {#use-hardware-wallet}

硬件钱包为私钥提供离线存储。 它们被认为是用来存储私钥的最安全的钱包选项：私钥永远不能放到互联网上，它们只能完全保存在本地设备中。

即使黑客控制了你的电脑，将私钥保持在离线状态，可以大大降低被黑客攻击的风险。

#### 试用硬件钱包：{#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 发送前请仔细检查交易 {#double-check-transactions}

不小心将加密货币发送到错误的钱包地址是一个常见的错误。 \*\*在以太坊上发送的交易是不可逆的。\*\*除非您认识地址所有者并能说服他们将资金退还给您，否则您将无法找回资金。

在发送交易之前，请务必确保你发送的地址与接收人的地址完全匹配。
当你与智能合约进行交互时，在签名之前检查交易信息是一种好习惯。

### 设置智能合约支出限额 {#spend-limits}

与智能合约进行交互时，不得允许无限制支出限额。 无支出限额可以让智能合约掏空你的钱包。 相反，只将支出限额设置为交易所需金额。

许多以太坊钱包提供限额保护，以防止帐户被掏空。

[如何撤销智能合约对您加密资金的访问权限](/guides/how-to-revoke-token-access/)

<Divider />

## 常见骗局 {#common-scams}

完全阻止诈骗是不可能的，但如果我们了解骗子最常用的伎俩，就可以降低他们的成功率。 虽然骗术层出不穷，但是它们的本质却大体相同。 最重要的是，请记住：

- 始终保持怀疑态度
- 没有人会给你免费或打折的以太币
- 没有人需要获取你的私钥或个人信息

### Twitter 广告钓鱼 {#ad-phishing}

![Twitter 链接钓鱼](./twitterPhishingScam.png)

有一种仿冒推特（也被称为 X）链接预览功能（展开）的方法，可能会让用户误以为他们正在访问一个合法网站。 这种技术利用了 Twitter 为推文中所分享的 URL 生成预览的机制，并显示_来自 ethereum.org_ 等示例（如上所示），而实际上，用户会被重定向至一个恶意网站。

务必检查你是否处于正确的域，尤其是在点击链接以后。

[点击此处了解更多信息](https://harrydenley.com/faking-twitter-unfurling)。

### 赠送骗局 {#giveaway}

加密货币领域中最常见的一种骗局是赠品诈骗。 赠品诈骗有多种形式，但总体思路是：如果你把以太币发送到指定的钱包地址，你将会收到双倍的以太币。_因此，这种骗局也被称为“2 送 1”骗局。_

这些骗局往往规定领取赠品的时间有限，制造出一种虚假的紧迫感。

### 社交媒体黑客攻击 {#social-media-hacks}

最出名的一次发生在 2020 年 7 月，当时很多知名人士和组织的 Twitter 帐户被黑。 黑客使用被盗的帐户发布了一个比特币赠送活动。 尽管这些欺骗性的推文很快就被发现并删除，但黑客们还是成功骗走了 11 个比特币（截至 2021年 9 月，这些比特币价值 50 万美元）。

![Twitter 上的一个骗局](./appleTwitterScam.png)

### 名人赠送骗局 {#celebrity-giveaway}

名人派发赠品是另一种常见形式的赠品诈骗。 诈骗者会盗用名人录制好的视频采访或会议演讲，然后在 YouTube 上进行直播，让它看起来好像是名人在进行视频直播，为加密货币赠送活动站台。

在这类骗局中，Vitalik Buterin 的形象最常被盗用，但许多其他加密货币领域的知名人士也常被盗用（例如，Elon Musk 或 Charles Hoskinson）。 加入一位知名人士会让骗子的直播看起来有一种合法性（这看起来有点牵强，但 Vitalik 参与其中，所以肯定没问题！）。

**赠送活动都是骗局。** **如果您将资金发送到这些帐户，您将永远失去它们。**

![YouTube 上的一个骗局](./youtubeScam.png)

### 冒充客服骗局 {#support-scams}

加密货币是一种相对新颖且常被误解的技术。 利用这一点的一种常见骗局是技术支持诈骗，骗子会冒充受热门加密货币钱包、交易所或区块链的支持人员。

很多关于以太坊的讨论都发生在 Discord 上。 骗子通常会通过在公开的 Discord 频道中搜索寻求支持的问题，以此找到诈骗对象，然后冒充支持人员向询问者发送私人信息以提供技术支持。 通过建立信任，冒充支持人员的骗子试图诱使你透露私钥或将资金发送到他们的钱包。

![Discord 上的一个冒充客服骗局](./discordScam.png)

一般来说，员工永远不会通过私人的非官方渠道与你交流。 在处理支持问题时，要牢记一些简单的事情：

- 永远不要分享你的私钥、助记词或密码
- 绝不允许任何人远程访问你的电脑
- 切勿通过官方指定以外的渠道沟通

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    注意：尽管冒充客服的骗局通常发生在 Discord 上，但它们也可能在任何讨论加密货币的聊天应用程序（包括电子邮件）中普遍存在。
</AlertDescription>
</AlertContent>
</Alert>

### 'Eth2' 代币骗局 {#eth2-token-scam}

在[合并](/roadmap/merge/)之前，诈骗者利用人们对“Eth2”一词的困惑，试图让用户将他们的 ETH 兑换成“ETH2”代币。 不存在“以太坊 2”代币，而且合并没有产生任何其他合法代币。 你在合并之前拥有的以太币与现在的是同一个以太币。 **为适应从工作量证明到权益证明的转换，您的 ETH 无需进行任何操作**。

骗子可能会以“技术支持”的面貌出现，告诉你如果存入以太币，将收到“以太坊 2”代币。 没有[官方以太坊支持](/community/support/)，也没有新代币。 永远不要与任何人分享你的钱包助记词。

_注意：有一些衍生代币/代码代表质押的 ETH（即 Rocket Pool 的 rETH、Lido 的 stETH、Coinbase 的 ETH2），但这些代币都不是您需要“迁移”的。_

### 网络钓鱼骗局 {#phishing-scams}

网络钓鱼诈骗是另一种越来越常见的诈骗手段，骗子利用这种手段试图窃取你钱包中的资金。

一些网络钓鱼电子邮件要求用户点击链接，将其重新定向到仿冒网站，并要求用户输入助记词、重置密码或发送以太币。 还有一些可能会让你在不知情的情况下安装恶意软件以便感染你的电脑，并让骗子能够访问你的电脑文件。

如果你收到一封来历不明的电子邮件，请记住：

- 永远不要打开你不认识的电子邮件地址中的链接或附件
- 切勿将你的个人信息或密码泄露给任何人
- 删除来历不明的电子邮件

[更多关于避免网络钓鱼骗局的信息](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 加密货币交易经纪人骗局 {#broker-scams}

在加密货币交易经纪人骗局中，骗子自称是专业的加密货币经纪人，会拿着你的钱帮你进行投资。 骗子收到你的钱后，他们可能会诱骗你，让你拿出更多资金，这样你就不会错过更高的投资收益，或者他们也可能就完全消失了。

这些骗子往往利用 YouTube 上的虚假帐户，进行看似自然的有关“经纪人”的对话，以此来寻找他们的目标。 这些对话通常会收到很多点赞，以增加真实性，但这些“赞”都是来自机器人帐户。

**不要相信网络陌生人会代您投资。** **您将失去您的加密货币。**

![YouTube 上的交易经纪人骗局](./brokerScam.png)

### 加密货币矿池骗局 {#mining-pool-scams}

自 2022 年 9 月起，以太坊上已经不存在挖矿。 但是，矿池骗局仍然存在。 在矿池骗局中会有人主动联系你，并声称你可以通过加入以太坊矿池获得丰厚回报。 骗子会提出要求，并一直与你保持联系。 本质上讲，骗子会试图让你相信，在加入一个以太坊矿池后，你的加密货币将用于创建以太币，而且你将获得以太币红利。 然后你会发现你的加密货币正在赚取微薄的回报。 这只是为了引诱你投入更多的资金。 最终，你的所有资金将被发送到一个未知地址，骗子要么消失，要么在某些情况下会继续保持联系，就像最近发生的一个案例一样。

底线是，提防那些在社交媒体上与你联系并要求你加入矿池的人。 一旦你失去你的加密货币，就永远回不来了。

有些事情要记住：

- 警惕任何与你联系，告诉你如何使用加密货币赚钱的人
- 做好关于赌注、流动性池或其他加密货币投资方式的调研
- 这种计划即使有，也很少是合法的。 如果是的话，它们会成为主流，你会听说过它们。

[一名男子因矿池骗局损失 20 万美元](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 空投骗局 {#airdrop-scams}

空投骗局通常是先构建一个诈骗项目，并向你的钱包空投一种资产（非同质化代币、其他代币），给你发送一个诈骗网站，让你领取这些空投的资产。 当你试图领取资产时，网站会要求你使用自己的以太坊钱包登录，并“批准”一笔交易。 实际上，这个交易会将你帐户的公钥私钥都发给骗子。 这种骗局的另一种方式是让你确认一笔可以把资金转移到骗子帐户的交易。

[更多关于空投骗局的信息](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 网络安全入门 {#web-security}

### 使用强密码 {#use-strong-passwords}

[超过 80% 的帐户被盗是由于密码弱或密码被盗所致](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/)。 一串很长的字符、数字和符号组合可帮助保护你的帐户安全。

一种常见错误是使用一些常见的、有关联的单词组合。 像这样的密码是不安全的，因为它们很容易被称为字典攻击的简单黑客技术攻击。

```md
弱密码示例：CuteFluffyKittens!

强密码示例：ymv\*azu.EAC8eyp8umf
```

另一个常见错误是使用容易通过[社会工程学](https://wikipedia.org/wiki/Social_engineering_\(security\))猜出或发现的密码。 在密码中加入母亲的婚前姓氏、孩子或宠物的名字或出生日期，会增加密码被黑客攻击的风险。

#### 良好密码习惯：{#good-password-practices}

- 在密码生成器或你所填写的表格允许的范围内，将密码设得越长越好
- 混合使用大写字母、小写字母、数字和符号
- 不要在密码中使用个人详细资料，如姓氏
- 避免使用常见的单词

[更多关于创建强密码的信息](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 为所有帐户使用独特的密码 {#use-unique-passwords}

数据泄露中外泄的强密码不再是强密码。 [Have I Been Pwned](https://haveibeenpwned.com) 网站可让您检查自己的帐户是否涉及任何公共数据泄露事件。 如果发生过，请**立即更改这些密码**。 为每个帐户设置独立的密码，可以在你的一个密码被破解时降低黑客访问你所有帐户的风险。

### 使用密码管理器 {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    使用密码管理器可以创建唯一的强密码并记住它们！ 我们<strong>强烈</strong>建议使用，而且它们大部分是免费的！
</AlertDescription>
</AlertContent>
</Alert>

记住为每个帐户设置的唯一强密码并不现实。 密码管理器为你的所有密码提供了一个安全、加密的存储空间，你可以通过一个强主密码进行访问。 他们还在注册新服务时生成建议使用的强密码，这样你就不必自行创建密码了。 许多密码管理器也会告诉你是否涉及数据泄露，让你在任何恶意攻击之前更改密码。

![密码管理器使用示例](./passwordManager.png)

#### 试用密码管理器：{#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- 或查看其他[推荐的密码管理器](https://www.privacytools.io/secure-password-manager)

### 使用双重身份验证 {#two-factor-authentication}

有时可能会要求你通过提供特有的证明来验证你的身份。 这些被称为**因素**。 下面是三类重要因素：

- 你知道的信息（例如密码或安全问题）
- 生理特征（如指纹或虹膜/面部识别）
- 你私有的（安全密钥或你手机上的认证程序）

使用**双重身份验证 (2FA)** 可为您的在线帐户提供额外的_安全因素_。 双重身份验证确保仅仅有你的密码还不足以访问你的帐户。 最常见的情况是，第二个因素是一个随机的 6 位数代码，称为**基于时间的一次性密码 (TOTP)**，您可以通过 Google Authenticator 或 Authy 等身份验证器应用访问。 这是一种“你私有的”，因为生成随机时间密码的种子文件存储在你的设备上。

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    注意：基于短信的双重身份验证容易受到 <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM 卡劫持</a>攻击，并不安全。 为获得最佳安全性，请使用 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> 或 <a href="https://authy.com/">Authy</a> 等服务。
</AlertDescription>
</AlertContent>
</Alert>

#### 安全密钥 {#security-keys}

安全密匙是一种更高级、更安全的双重身份验证。 安全密钥是物理硬件身份验证设备，其工作方式与身份验证程序应用程序相似。 使用安全密钥是最安全的 2FA 使用方式。 这些密钥中有许多采用了 FIDO 通用第二因素 (U2F) 标准。 [详细了解 FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/)。

观看以下视频，了解更多关于双重身份验证的信息：

<YouTube id="m8jlnZuV1i4" start="3479" />

### 卸载浏览器扩展程序 {#uninstall-browser-extensions}

Chrome 扩展程序或 Firefox 插件等浏览器扩展程序可以增强浏览器的功能，但它们也会带来风险。 大多数浏览器扩展程序默认请求获得“读取和更改网站数据”的权限，几乎允许它们对你的数据做任何事情。 Chrome 扩展程序总是自动更新，因此旧版本安全的扩展程序可能会在更新后被加入恶意代码。 大多数浏览器扩展程序都不会试图窃取你的数据，但你应该知道它们可以。

#### 通过以下方式保持安全：{#browser-extension-safety}

- 只安装来自受信任来源的浏览器扩展程序
- 删除不使用的浏览器扩展程序
- 在本地安装 Chrome 扩展程序以停止自动更新（高级）

[更多关于浏览器扩展程序风险的信息](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 扩展阅读{#further-reading}

### 网络安全 {#reading-web-security}

- [高达 300 万台设备感染了含有恶意软件的 Chrome 和 Edge 附加组件](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [如何创建不会忘记的强密码](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [什么是安全密钥？](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### 加密安全 {#reading-crypto-security}

- [保护您自己和您的资金](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [常见加密通信软件中的安全问题](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [安全指南：傻瓜和聪明人都适用](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [加密安全：密码和身份验证](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 防骗教育 {#reading-scam-education}

- [指南：如何识别诈骗代币](/guides/how-to-id-scam-tokens/)
- [确保安全：常见骗局](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [避免诈骗](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [关于常见加密网络钓鱼电子邮件和消息的 Twitter 帖子](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
