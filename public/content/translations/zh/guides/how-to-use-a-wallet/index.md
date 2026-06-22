---
title: 如何使用钱包
metaTitle: 如何使用以太坊钱包 | 逐步指南
description: 解释如何发送、接收代币以及连接到 Web3 项目的指南。
lang: zh
---

了解如何操作钱包的所有基本功能。如果你还没有钱包，请查看我们的[如何创建以太坊账户](/guides/how-to-create-an-ethereum-account/)。

## 打开你的钱包 {#open-your-wallet}

你应该会看到一个仪表板，它可能会显示你的余额，并包含发送和接收代币的按钮。

## 接收加密货币 {#receive-cryptocurrency}

你想在钱包中接收加密货币吗？

每个以太坊账户都有自己的接收地址，这是一串由数字和字母组成的唯一序列。地址的功能类似于银行账号。以太坊地址始终以“0x”开头。你可以与任何人分享这个地址：这样做是安全的。

你的地址就像你的家庭住址：你需要告诉别人它是什么，以便他们能找到你。这样做是安全的，因为你仍然可以用只有你控制的另一把密钥锁上前门，这样即使别人知道你住在哪里，也无法进入。

你需要向任何想给你汇款的人提供你的公开地址。许多钱包应用允许你复制地址或显示二维码供扫描，以便更轻松地使用。避免手动输入任何以太坊地址。这很容易导致笔误并造成资金丢失。

不同的应用可能会有所不同或使用不同的语言，但如果你尝试转账资金，它们应该会引导你完成类似的过程。

1. 打开你的钱包应用。
2. 点击“接收”（或类似措辞的选项）。
3. 将你的以太坊地址复制到剪贴板。
4. 向发送方提供你的接收以太坊地址。

## 发送加密货币 {#send-cryptocurrency}

你想向另一个钱包发送 ETH 吗？

1. 打开你的钱包应用。
2. 获取接收地址，并确保你连接到与接收方相同的网络。
3. 输入接收地址或用相机扫描二维码，这样你就不必手动输入地址。
4. 点击钱包中的“发送”按钮（或类似措辞的替代选项）。

![Send field for crypto address](./send.png)
<br/>

5. 许多资产（如 DAI 或 USDC）存在于多个网络上。在转账加密货币代币时，请确保接收方使用的是与你相同的网络，因为它们不可互换。
6. 确保你的钱包有足够的 ETH 来支付交易费，该费用因网络状况而异。大多数钱包会自动将建议的费用添加到交易中，然后你可以进行确认。
7. 一旦你的交易被处理，相应的加密货币金额将显示在接收方的账户中。这可能需要几秒钟到几分钟不等，具体取决于当前网络的使用情况。

## 连接到项目 {#connecting-to-projects}

你的地址在所有以太坊项目中都是相同的。你不需要在任何项目上单独注册。一旦你有了钱包，你就可以连接到任何以太坊项目，而无需任何额外信息。不需要电子邮件或任何其他个人信息。

1. 访问任何项目的网站。
2. 如果项目的登录页面只是对项目的静态描述，你应该能够点击菜单中的“打开应用”按钮，这将导航到实际的 Web 应用。
3. 进入应用后，点击“连接”。

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. 从提供的选项列表中选择你的钱包。如果你看不到你的钱包，它可能隐藏在“WalletConnect”选项下。

![Selecting from a list of wallets to connect with](./connect2.png)

5. 在你的钱包中确认签名请求以建立连接。**签名此消息不应要求花费任何 ETH**。
6. 就是这样！开始使用该应用吧。你可以在我们的[去中心化应用 (dapp) 页面](/apps/#explore)上找到一些有趣的项目。
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>想了解更多吗？</div>
  <ButtonLink href="/guides/">
    查看我们的其他指南
  </ButtonLink>
</AlertContent>
</Alert>

## 常见问题 {#frequently-asked-questions}

### 如果我拥有一个 ETH 地址，我在其他区块链上是否拥有相同的地址？ {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

你可以在所有兼容 EVM 的区块链上使用相同的地址（如果你拥有带有恢复短语的钱包类型）。此[列表](https://chainlist.org/)将向你显示可以在哪些区块链上使用相同的地址。某些区块链（如比特币）实施了一套完全独立的网络规则，你将需要一个不同格式的不同地址。如果你有一个智能合约钱包，你应该查看其产品网站，以获取有关支持哪些区块链的更多信息。

### 我可以在多台设备上使用相同的地址吗？ {#can-i-use-the-same-address-on-multiple-devices}

是的，你可以在多台设备上使用相同的地址。从技术上讲，钱包只是一个向你显示余额和进行交易的界面，你的账户并不存储在钱包内，而是存储在区块链上。

### 我还没有收到加密货币，我在哪里可以查看交易状态？ {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

你可以使用[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)实时查看任何交易的状态。你只需搜索你的钱包地址或交易 ID 即可。

### 我可以取消或退回交易吗？ {#can-i-cancel-or-return-transactions}

不可以，一旦交易被确认，你就无法取消该交易。
