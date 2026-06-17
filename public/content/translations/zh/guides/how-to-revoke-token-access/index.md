---
title: 如何撤销智能合约对你加密资金的访问权限
description: 关于如何撤销恶意智能合约代币访问权限的指南
lang: zh
---

本指南将教你如何查看已允许访问你资金的所有[智能合约](/glossary/#smart-contract)列表，以及如何取消这些授权。

有时，恶意开发者会在智能合约中植入后门，从而能够访问与该智能合约交互的不知情用户的资金。通常发生的情况是，此类平台会要求用户授权使用**无限数量的代币**，试图在未来节省少量的 [Gas](/glossary/#gas)，但这会带来更高的风险。

一旦平台对你[钱包](/glossary/#wallet)中的代币拥有无限访问权限，即使你已将资金从他们的平台提取到你的钱包中，他们也可以花费所有这些代币。恶意行为者仍然可以访问你的资金并将其提取到他们的钱包中，让你没有任何恢复的余地。

唯一的保护措施是避免使用未经测试的新项目，仅授权你需要的额度，或者定期撤销访问权限。那么，你该怎么做呢？

## 第 1 步：使用撤销访问权限工具 {#step-1-use-revoke-access-tools}

有几个网站可以让你查看和撤销连接到你地址的智能合约。访问这些网站并连接你的钱包：

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (以太坊)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (以太坊)
- [Revoke](https://revoke.cash/) (多个网络)
- [Unrekt](https://app.unrekt.net/) (多个网络)
- [EverRevoke](https://everrise.com/everrevoke/) (多个网络)

## 第 2 步：连接你的钱包 {#step-2-connect-your-wallet}

进入网站后，点击“连接钱包 (Connect wallet)”。网站应提示你连接你的钱包。

确保你在钱包和网站中使用相同的网络。你将只能看到与所选网络相关的智能合约。例如，如果你连接到以太坊主网，你将只能看到以太坊合约，而看不到来自其他链（如 Polygon）的合约。

## 第 3 步：选择你希望撤销的智能合约 {#step-3-select-a-smart-contract-you-wish-to-revoke}

你应该能看到所有被允许访问你代币的合约及其支出限额。找到你希望终止授权的那个合约。

如果你不知道该选择哪个合约，你可以撤销所有合约。这不会给你带来任何问题，但下次你与这些合约中的任何一个交互时，你将必须授予一组新的权限。

## 第 4 步：撤销对你资金的访问权限 {#step-4-revoke-access-to-your-funds}

点击撤销后，你应该会在钱包中看到一个新的交易建议。这是正常现象。你必须支付交易费才能成功取消授权。根据网络的不同，这可能需要一分钟到几分钟的时间来处理。

我们建议你在几分钟后刷新撤销工具并再次连接你的钱包，以仔细检查被撤销的合约是否已从列表中消失。

<mark>我们建议你永远不要允许项目对你的代币拥有无限访问权限，并定期撤销所有代币授权额度访问权限。撤销代币访问权限绝不会导致资金损失，特别是如果你使用上面列出的工具。</mark>

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

### 撤销代币访问权限是否也会终止质押、资金池、借贷等操作？ {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

不会，它不会影响你的任何[去中心化金融 (DeFi)](/glossary/#defi)策略。你将保留你的头寸并继续获得奖励等。

### 断开钱包与项目的连接是否等同于移除使用我资金的权限？ {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

不是，如果你断开钱包与项目的连接，但你已经授予了代币授权额度权限，他们仍然可以使用这些代币。你需要撤销该访问权限。

### 合约权限何时到期？ {#when-will-the-contract-permission-expire}

合约权限没有到期日。如果你授予了合约权限，即使在授予数年之后，它们仍然可以使用。

### 为什么项目会设置无限的代币授权额度？ {#why-do-projects-set-unlimited-token-allowance}

项目通常这样做是为了尽量减少所需的请求次数，这意味着用户只需授权一次并仅支付一次交易费。虽然方便，但如果用户在未经时间检验或未经过审计的网站上粗心大意地进行授权，这可能会很危险。一些钱包允许你手动限制被授权的代币数量以降低风险。请咨询你的钱包提供商以获取更多信息。