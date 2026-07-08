---
title: 常見問題
description: 關於錢包、交易、質押等常見的以太坊問題。
lang: zh-tw
---

## 我將加密貨幣發送到了錯誤的地址 {#wrong-wallet}

在以太坊上發送的交易是不可逆的。遺憾的是，如果您將 ETH 或代幣發送到了錯誤的錢包，將無法撤銷該交易。

**您可以採取的行動：**

- **如果您認識該地址的所有者**，請直接與他們聯繫並要求退還資金
- **如果該地址屬於某個交易所或已知服務**，請聯繫他們的客服團隊，他們或許能提供協助
- **如果您將代幣發送到了合約地址**，請檢查該合約是否具有提款或恢復功能（這種情況很少見）

在大多數情況下，資金是無法找回的。沒有任何中央組織、實體或個人擁有以太坊，這意味著沒有人可以撤銷交易。在確認之前，請務必仔細檢查收款人地址。

## 我失去了對錢包的存取權限 {#lost-wallet-access}

您的恢復選項取決於您使用的錢包類型。

### 如果您有助記詞（恢復詞） {#if-you-have-your-seed-phrase-recovery-phrase}

您可以使用助記詞在任何相容的錢包應用程式中恢復您的錢包。這就是為什麼將助記詞安全地離線儲存至關重要。請查看您的錢包提供商的文件以獲取恢復指示。

### 如果您遺失了助記詞 {#if-you-have-lost-your-seed-phrase}

如果沒有助記詞或私鑰，您的資金將無法恢復。沒有任何人（包括 ethereum.org）可以重設您的密碼或恢復對自行託管錢包的存取權限。

### 如果您的帳戶在交易所 {#if-your-account-is-on-an-exchange}

如果您的帳戶在 Coinbase、幣安或 Kraken 等中心化交易所，請直接聯繫該交易所的客服團隊。他們控制著其平台上的帳戶，或許能協助重設密碼或恢復帳戶。

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**絕對不要與任何聲稱能幫助您恢復錢包的人分享您的助記詞**。這是最常見的詐騙手法之一。任何合法的服務都不會要求您提供助記詞。

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  如何使用錢包
</DocLink>

## 我的交易卡住或處於待處理狀態 {#stuck-transaction}

當您設定的 Gas 費低於網路當前所需的費用時，以太坊上的交易可能會卡住。大多數錢包都允許您解決這個問題：

- **加速：** 使用更高的 Gas 費重新提交相同的交易
- **取消：** 使用與待處理交易相同的隨機數，向您自己的地址發送一筆 0 ETH 的交易

### 實用指南 {#helpful-guides}

- [如何在 MetaMask 上加速或取消待處理交易](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [如何取消待處理的以太坊交易](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## 我該如何申領以太坊贈品？ {#giveaway-scam}

以太坊贈品是旨在竊取您 ETH 的騙局。不要被那些好得令人難以置信的提議所誘惑。如果您將 ETH 發送到贈品地址，您將不會收到任何贈品，也無法找回您的資金。

[更多關於防範詐騙的資訊](/security/#common-scams)

## 我該如何質押 ETH？ {#how-to-stake}

要成為驗證者，您必須在以太坊存款合約中質押 32 個 ETH，並設定一個驗證者節點。您也可以透過質押池以較少的 ETH 參與。

更多資訊請見我們的[質押頁面](/staking/)以及[質押啟動板](https://launchpad.ethereum.org/)。

## 我該如何進行以太坊挖礦？ {#mining-ethereum}

以太坊挖礦已不再可行。在 2022 年 9 月的[合併](/roadmap/merge/)期間，當以太坊從[工作量證明 (PoW)](/glossary/#pow)過渡到[權益證明 (PoS)](/glossary/#pos)時，挖礦就已被關閉。現在，以太坊由驗證者取代了礦工。任何人都可以[質押](/glossary/#staking) ETH，並透過執行驗證者軟體來保護網路安全，從而獲得質押獎勵。