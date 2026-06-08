---
title: 我被骗了或丢失了资金
metaTitle: 诈骗求助与举报
description: 如果您遭遇诈骗该怎么办，如何保护您的剩余资产，以及在哪里举报欺诈行为。
lang: zh
---

加密货币诈骗针对所有经验水平的人，包括金融和技术领域的专业人士。您并不孤单，来到这里是正确的第一步。

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**没有人可以撤销区块链交易。** 如果有人联系您，声称他们可以收费帮您找回资金，这几乎肯定是二次诈骗。请参阅下文的[恢复资金诈骗](#scam-types)。

</AlertDescription>
</AlertContent>
</Alert>

## 保护您的剩余资产 {#secure-assets}

如果您与诈骗者有过互动，或者怀疑您的钱包已遭到入侵，请立即采取以下步骤：

1. **转移剩余资金**到一个诈骗者无法访问的新的安全钱包中
2. **撤销代币授权。** 诈骗者经常诱骗您授权无限制的代币支出。撤销这些权限可以防止您的钱包被进一步掏空
3. **更改任何可能关联的交易所账户的密码**
4. **在所有与加密货币相关的账户上启用双重身份验证 (2FA)**

### 如何撤销代币授权 {#revoke-approvals}

当您与去中心化应用 (dapp) 或智能合约交互时，您可能已经授予了它支出您代币的权限。如果诈骗者诱骗您授权了恶意合约，即使在最初的诈骗之后，他们也可以继续掏空您的代币。

使用以下工具检查并撤销授权：

- [Revoke.cash](https://revoke.cash/)：连接您的钱包以查看所有有效的授权并将其撤销
- [Revokescout](https://revoke.blockscout.com/)：通过 Blockscout 检查并撤销授权
- [Etherscan 代币授权检查器](https://etherscan.io/tokenapprovalchecker)：通过 Etherscan 检查并撤销授权

<DocLink href="/guides/how-to-revoke-token-access/">
  分步指南：如何撤销代币访问权限
</DocLink>

## 举报诈骗地址和网站 {#report}

举报有助于警告其他用户，并可能协助执法部门的调查。记录下一切：交易哈希、钱包地址、屏幕截图以及与诈骗者的任何通信。

### 举报诈骗地址 {#report-address}

- [Chainabuse](https://www.chainabuse.com/)：社区驱动的诈骗和欺诈举报数据库。提交举报并搜索已知的诈骗地址
- [Etherscan 举报](https://info.etherscan.com/report-address/)：在最常用的以太坊区块浏览器上标记地址
- [CryptoScamDB](https://cryptoscamdb.org/)：追踪加密货币诈骗的开源数据库

### 举报诈骗网站或社交媒体账户 {#report-website}

- [PhishTank](https://phishtank.org/)：提交并验证网络钓鱼 URL
- [Google 安全浏览](https://safebrowsing.google.com/safebrowsing/report_phish/)：向 Google 举报网络钓鱼网站，以便在 Chrome 和其他浏览器中将其屏蔽
- [Netcraft](https://report.netcraft.com/report/mistake)：举报恶意和欺诈网站
- 直接在发生诈骗的社交媒体平台上举报（推特/X、Discord、电报都有举报功能）

### 向执法部门报案 {#report-law-enforcement}

- **美国：** [FBI 互联网犯罪投诉中心 (IC3)](https://www.ic3.gov/)
- **英国：** [Action Fraud](https://www.actionfraud.police.uk/)
- **欧盟：** [欧洲刑警组织 (Europol)](https://www.europol.europa.eu/report-a-crime)
- **其他国家/地区：** 向当地警方报案。在大多数司法管辖区，加密货币欺诈都是犯罪行为

## 分析发生了什么 {#analyze}

了解您的资金去向有助于举报，如果资金最终流入中心化交易所，也可能有助于追回资金。

- [Blockscout](https://eth.blockscout.com/)：开源区块浏览器，可查找任何交易哈希或钱包地址，以查看资金被发送到了哪里
- [Etherscan](https://etherscan.io/)：查找任何交易哈希或钱包地址，以查看资金被发送到了哪里
- [Chainabuse 查询](https://www.chainabuse.com/)：检查某个地址是否已被其他受害者举报
- BlockSec 提供的 [MetaSleuth](https://metasleuth.io/)：绘制资金流向的可视化交易追踪工具

**如果资金被发送到了中心化交易所**（如 Coinbase、币安、Kraken），请立即联系他们的支持团队并提供交易详情。交易所通常可以冻结被标记为欺诈的账户。

## 残酷的真相 {#hard-truth}

由于以太坊是去中心化的，没有中央机构可以撤销交易或找回被盗资金。一旦交易在区块链上得到确认，它就是不可逆的。

举报仍然很有价值。举报有助于执法部门追踪有组织的欺诈团伙，在 Chainabuse 和 Etherscan 上标记地址可以警告未来的潜在受害者。

## 需要警惕的诈骗类型 {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

诈骗者会制造虚假的赠品活动，承诺让您的 ETH 翻倍或给您免费的代币。他们经常冒充维塔利克·布特林等知名人物。如果您将 ETH 发送到“赠品”地址，您将不会收到任何回报。

**请记住：** 维塔利克和其他知名人物绝不会要求您向他们发送 ETH。

[了解更多常见诈骗](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

诈骗者会在 Discord、电报和社交媒体上冒充以太坊团队成员、版主或支持人员。他们可能会给您发私信，提供帮助或声称您的账户存在问题。

**请记住：**

- 不存在“以太坊支持团队”
- 真正的版主绝不会主动给您发私信
- 无论出于何种原因，绝不要与任何人分享您的助记词或私钥
- 绝不要点击未经请求的消息中发送的链接

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

恢复资金诈骗专门针对已经损失资金的人。诈骗者会监控社交媒体上谈论被骗的人，然后冒充“区块链调查员”或“加密货币恢复专家”与他们联系。

他们承诺追踪并找回您被盗的加密货币，但需要预先收取费用。在您付款后，他们就会消失。

**没有任何合法的服务可以撤销区块链交易。** 任何承诺做到这一点的人都在撒谎。这是最常见的后续诈骗之一。

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

网络钓鱼网站看起来与真实的钱包应用、交易所或去中心化金融 (DeFi) 平台一模一样。它们诱骗您输入助记词或连接钱包，然后掏空您的资金。

**保护您自己：**

- 在连接钱包之前，务必验证 URL
- 将您经常使用的官方网站加入书签
- 绝不要在任何网站上输入您的助记词。合法的应用绝不会要求您提供助记词
- 使用 [PhishTank](https://phishtank.org/) 检查可疑的 URL

<DocLink href="/guides/how-to-id-scam-tokens/">
  如何识别诈骗代币
</DocLink>

</DocLink>

<DocLink href="/security/">
  以太坊安全与防骗完整指南
</DocLink>