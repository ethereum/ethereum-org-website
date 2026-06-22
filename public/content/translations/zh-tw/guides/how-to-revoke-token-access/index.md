---
title: 如何撤銷智能合約對你加密貨幣資金的存取權限
description: 關於如何撤銷惡意智能合約代幣存取權限的指南
lang: zh-tw
---

本指南將教你如何檢視所有已獲准存取你資金的[智能合約](/glossary/#smart-contract)清單，以及如何取消這些權限。

有時，惡意開發者會在智能合約中建立後門，讓他們能夠存取與該智能合約互動且不知情使用者的資金。通常發生的情況是，這類平台會要求使用者授權花費**無上限數量的代幣**，試圖在未來節省少量的[燃料](/glossary/#gas)，但這會帶來更高的風險。

一旦平台對你[錢包](/glossary/#wallet)中的代幣擁有無上限的存取權限，即使你已將資金從他們的平台提取到你的錢包中，他們仍然可以花費所有這些代幣。惡意行為者依然可以存取你的資金並將其提取到他們的錢包中，讓你沒有任何恢復資金的選擇。

唯一的保護措施是避免使用未經測試的新專案、只授權你需要的額度，或者定期撤銷存取權限。那麼，你該怎麼做呢？

## 步驟 1：使用撤銷存取權限工具 {#step-1-use-revoke-access-tools}

有幾個網站可以讓你檢視並撤銷與你地址連接的智能合約。造訪這些網站並連接你的錢包：

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (以太坊)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (以太坊)
- [Revoke](https://revoke.cash/) (多個網路)
- [Unrekt](https://app.unrekt.net/) (多個網路)
- [EverRevoke](https://everrise.com/everrevoke/) (多個網路)

## 步驟 2：連接你的錢包 {#step-2-connect-your-wallet}

進入網站後，點擊「連接錢包 (Connect wallet)」。網站應該會提示你連接你的錢包。

確保你在錢包和網站中使用相同的網路。你只會看到與所選網路相關的智能合約。例如，如果你連接到以太坊主網，你只會看到以太坊合約，而不會看到來自其他鏈（如 Polygon）的合約。

## 步驟 3：選擇你想要撤銷的智能合約 {#step-3-select-a-smart-contract-you-wish-to-revoke}

你應該會看到所有獲准存取你代幣的合約及其花費上限。找到你想要終止的合約。

如果你不知道該選擇哪個合約，你可以撤銷所有合約。這不會為你帶來任何問題，但下次你與這些合約中的任何一個互動時，你將必須授予一組新的權限。

## 步驟 4：撤銷對你資金的存取權限 {#step-4-revoke-access-to-your-funds}

點擊撤銷後，你應該會在錢包中看到一個新的交易建議。這是預期中的情況。你必須支付交易手續費才能成功取消。根據網路的不同，這可能需要一分鐘到幾分鐘的時間來處理。

我們建議你在幾分鐘後重新整理撤銷工具，並再次連接你的錢包，以再次確認被撤銷的合約是否已從清單中消失。

<mark>我們建議你永遠不要允許專案無上限地存取你的代幣，並定期撤銷所有代幣授權額度的存取權限。撤銷代幣存取權限絕不應導致資金損失，特別是如果你使用上述列出的工具。</mark>

 <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>想了解更多嗎？</div>
  <ButtonLink href="/guides/">
    查看我們的其他指南
  </ButtonLink>
</AlertContent>
</Alert>

## 常見問題 {#frequently-asked-questions}

### 撤銷代幣存取權限是否也會終止質押、資金池、借貸等操作？ {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

不會，這不會影響你的任何[去中心化金融 (DeFi)](/glossary/#defi)策略。你將保留你的倉位並繼續獲得獎勵等。

### 將錢包與專案中斷連接，是否等同於移除使用我資金的權限？ {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

不是，如果你將錢包與專案中斷連接，但你已經授予了代幣授權額度權限，他們仍然可以使用這些代幣。你需要撤銷該存取權限。

### 合約權限何時會過期？ {#when-will-the-contract-permission-expire}

合約權限沒有到期日。如果你授予了合約權限，即使在授予數年後，它們仍然可以使用。

### 為什麼專案會設定無上限的代幣授權額度？ {#why-do-projects-set-unlimited-token-allowance}

專案通常這樣做是為了盡可能減少所需的請求次數，這意味著使用者只需授權一次並支付一次交易手續費。雖然方便，但如果使用者在未經時間考驗或未經審計的網站上粗心大意地授權，這可能會很危險。有些錢包允許你手動限制被授權的代幣數量以降低風險。請向你的錢包提供商查詢以獲取更多資訊。
