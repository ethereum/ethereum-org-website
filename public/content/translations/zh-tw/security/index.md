---
title: 以太坊安全與防詐騙
description: 在以太坊上保持安全
lang: zh-tw
---

對加密貨幣日益增長的興趣，也帶來了詐騙者和駭客日益增加的風險。本文列出了一些減輕這些風險的最佳實踐。

**請記住：ethereum.org 的任何人都絕不會主動聯絡你。請勿回覆聲稱來自以太坊官方支援的電子郵件。**

<Divider />

## 加密貨幣安全基礎知識 {#crypto-security}

### 提升你的知識 {#level-up-your-knowledge}

對加密貨幣運作方式的誤解可能會導致代價高昂的錯誤。例如，如果有人假冒客服人員，聲稱可以找回遺失的 ETH 以換取你的私鑰，他們就是在利用人們不了解[以太坊](/)是一個缺乏此類功能的去中心化網路。自我教育以了解以太坊的運作方式是一項值得的投資。

<DocLink href="/what-is-ethereum/">
  什麼是以太坊？
</DocLink>

<DocLink href="/what-is-ether/">
  什麼是以太幣？
</DocLink>
<Divider />

## 錢包安全 {#wallet-security}

### 絕對不要分享你的助記詞 {#protect-private-keys}

**無論出於任何原因，絕對不要分享你的助記詞或私鑰！**

你的恢復詞（也稱為秘密恢復詞或助記詞）是你錢包的主金鑰。任何擁有它的人都可以存取你的所有帳戶並轉走所有資產。私鑰對於單一帳戶的運作方式也是如此。任何合法的服務、支援人員或網站都絕不會向你索取這些資訊。

<DocLink href="/wallets/">
  什麼是以太坊錢包？
</DocLink>

#### 不要對你的助記詞/私鑰進行螢幕截圖 {#screenshot-private-keys}

對你的助記詞或私鑰進行螢幕截圖可能會將它們同步到雲端資料提供商，這可能會讓駭客有機可乘。從雲端獲取私鑰是駭客常見的攻擊媒介。

### 使用硬體錢包 {#use-hardware-wallet}

硬體錢包為私鑰提供離線儲存。它們被認為是儲存私鑰最安全的錢包選項：你的私鑰永遠不會接觸網際網路，並完全保留在你的裝置本機上。

將私鑰保持離線狀態可大幅降低被駭客攻擊的風險，即使駭客控制了你的電腦也是如此。

#### 嘗試使用硬體錢包： {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 發送前仔細檢查交易 {#double-check-transactions}

不小心將加密貨幣發送到錯誤的錢包地址是一個常見的錯誤。**在以太坊上發送的交易是不可逆的。** 除非你認識該地址的所有者並能說服他們將資金退還給你，否則你將無法取回你的資金。

在發送交易之前，請務必確保你發送的地址與預期接收者的地址完全相符。
在與智能合約互動時，在簽署之前閱讀交易訊息是一個好習慣。

### 設定智能合約支出上限 {#spend-limits}

在與智能合約互動時，請勿允許無上限的支出額度。無上限的支出可能會讓智能合約轉空你的錢包。相反地，請將支出上限設定為僅限於該筆交易所需的金額。

許多以太坊錢包提供上限保護，以防止帳戶被轉空。

[如何撤銷智能合約對你加密貨幣資金的存取權限](/guides/how-to-revoke-token-access/)

<Divider />

## 常見詐騙 {#common-scams}

要完全阻止詐騙者是不可能的，但我們可以透過了解他們最常用的手法來降低其得逞的機率。這些詐騙有許多變種，但它們通常遵循相同的高階模式。如果沒有別的，請記住：

- 始終保持懷疑態度
- 沒有人會給你免費或打折的 ETH
- 沒有人需要存取你的私鑰或個人資訊

### 推特廣告網路釣魚 {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

有一種方法可以偽造推特（也稱為 X）的連結預覽功能（展開），從而可能欺騙使用者，讓他們以為自己正在造訪一個合法的網站。這種技術利用了推特為推文中分享的 URL 產生預覽的機制，例如顯示 _來自 ethereum.org_（如上所示），而實際上他們正被重新導向到一個惡意網站。

始終檢查你是否在正確的網域上，尤其是在點擊連結之後。

[在此了解更多資訊](https://harrydenley.com/faking-twitter-unfurling)。

### 贈品詐騙 {#giveaway}

加密貨幣中最常見的詐騙之一是贈品詐騙。贈品詐騙可以有多種形式，但總體概念是，如果你將 ETH 發送到提供的錢包地址，你將收回雙倍的 ETH。*因此，它也被稱為買一送一詐騙。*

這些詐騙通常會規定一個申領贈品的有限時間，以製造虛假的緊迫感。

### 社群媒體駭客攻擊 {#social-media-hacks}

2020 年 7 月發生了一起備受矚目的此類事件，當時知名名人和組織的推特帳戶遭到駭客攻擊。駭客同時在被駭的帳戶上發布了比特幣贈品活動。儘管這些欺騙性的推文很快被發現並刪除，但駭客仍然成功捲走了 11 枚比特幣（截至 2021 年 9 月價值 50 萬美元）。

![A scam on Twitter](./appleTwitterScam.png)

### 名人贈品 {#celebrity-giveaway}

名人贈品是贈品詐騙的另一種常見形式。詐騙者會拿名人錄製的影片採訪或會議演講，並在 YouTube 上進行直播——使其看起來像是名人正在進行現場影片採訪，為加密貨幣贈品活動背書。

維塔利克·布特林 (Vitalik Buterin) 最常被用於這種詐騙，但許多其他參與加密貨幣的知名人士也常被利用（例如伊隆·馬斯克或查爾斯·霍斯金森）。加入知名人士會讓詐騙者的直播產生一種合法感（這看起來很可疑，但維塔利克參與其中，所以應該沒問題！）。

**贈品活動永遠都是詐騙。如果你將資金發送到這些帳戶，你將永遠失去它們。**

![A scam on YouTube](./youtubeScam.png)

### 支援詐騙 {#support-scams}

加密貨幣是一項相對年輕且容易被誤解的技術。利用這一點的一種常見詐騙是支援詐騙，詐騙者會冒充熱門錢包、交易所或區塊鏈的支援人員。

關於以太坊的許多討論都發生在 Discord 上。支援詐騙者通常會透過在公開的 Discord 頻道中搜尋支援問題來尋找目標，然後向詢問者發送私人訊息提供支援。透過建立信任，支援詐騙者試圖欺騙你洩露你的私鑰或將你的資金發送到他們的錢包。

![A support scam on Discord](./discordScam.png)

作為一般規則，工作人員絕不會透過私人的、非官方的管道與你溝通。在處理支援問題時，請記住以下幾點簡單的事項：

- 絕對不要分享你的私鑰、助記詞或密碼
- 絕對不要允許任何人遠端存取你的電腦
- 絕對不要在組織指定的管道之外進行溝通

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    請注意：雖然支援類型的詐騙通常發生在 Discord 上，但它們也可能普遍存在於任何發生加密貨幣討論的聊天應用程式中，包括電子郵件。
</AlertDescription>
</AlertContent>
</Alert>

### 「Eth2」代幣詐騙 {#eth2-token-scam}

在[合併](/roadmap/merge/)的準備階段，詐騙者利用了圍繞「Eth2」一詞的混淆，試圖讓使用者將他們的 ETH 兌換成「ETH2」代幣。根本沒有「ETH2」，合併也沒有引入任何其他合法的代幣。你在合併前擁有的 ETH 與現在的 ETH 是相同的。**你不需要對你的 ETH 採取任何行動來應對從工作量證明 (PoW) 到權益證明 (PoS) 的轉換**。

詐騙者可能會以「支援人員」的身分出現，告訴你如果存入你的 ETH，你將收到「ETH2」。沒有[官方的以太坊支援](/community/support/)，也沒有新的代幣。絕對不要與任何人分享你的錢包助記詞。

_注意：有一些衍生代幣/代號可能代表已質押的 ETH（例如 Rocket Pool 的 rETH、Lido 的 stETH、Coinbase 的 ETH2），但這些都不是你需要「遷移」過去的對象。_

### 網路釣魚詐騙 {#phishing-scams}

網路釣魚詐騙是詐騙者用來試圖竊取你錢包資金的另一個日益常見的手法。

一些網路釣魚電子郵件會要求使用者點擊連結，將他們重新導向到仿冒網站，要求他們輸入助記詞、重設密碼或發送 ETH。其他電子郵件可能會要求你在不知情的情況下安裝惡意軟體來感染你的電腦，並讓詐騙者存取你電腦的檔案。

如果你收到來自未知寄件者的電子郵件，請記住：

- 絕對不要開啟來自你不認識的電子郵件地址的連結或附件
- 絕對不要向任何人洩露你的個人資訊或密碼
- 刪除來自未知寄件者的電子郵件

[更多關於避免網路釣魚詐騙的資訊](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 加密貨幣交易經紀人詐騙 {#broker-scams}

詐騙的加密貨幣交易經紀人聲稱自己是專業的加密貨幣經紀人，會主動提出拿你的錢代你投資。在詐騙者收到你的資金後，他們可能會繼續欺騙你，要求你發送更多資金，以免錯過進一步的投資收益，或者他們可能會完全消失。

這些騙子通常透過在 YouTube 上使用假帳號來尋找目標，開始關於「經紀人」的看似自然的對話。這些對話通常會獲得大量按讚以增加合法性，但這些按讚都來自機器人帳號。

**不要相信網路上的陌生人代你投資。你會失去你的加密貨幣。**

![A trading broker scam on YouTube](./brokerScam.png)

### 加密貨幣礦池詐騙 {#mining-pool-scams}

截至 2022 年 9 月，在以太坊上挖礦已不再可能。然而，礦池詐騙仍然存在。礦池詐騙涉及有人主動聯絡你，聲稱你可以透過加入以太坊礦池獲得高額回報。詐騙者會做出承諾，並盡可能長時間地與你保持聯絡。從本質上講，詐騙者會試圖說服你，當你加入以太坊礦池時，你的加密貨幣將用於創建 ETH，並且你將獲得 ETH 分紅。然後你會看到你的加密貨幣正在產生小額回報。這只是為了誘餌你投資更多。最終，你的所有資金都將被發送到一個未知的地址，詐騙者要麼消失，要麼在某些情況下會繼續保持聯絡，就像最近發生的一個案例一樣。

總結：要警惕在社群媒體上聯絡你並要求你加入礦池的人。一旦你失去了你的加密貨幣，它就永遠消失了。

需要記住的一些事項：

- 警惕任何聯絡你並提供從你的加密貨幣中賺錢方法的人
- 對質押、流動性池或其他投資加密貨幣的方式進行自己的研究
- 這種計畫很少（如果有的話）是合法的。如果它們是合法的，它們可能已經成為主流，而且你早就聽說過它們了。

[男子在礦池詐騙中損失 20 萬美元](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 空投詐騙 {#airdrop-scams}

空投詐騙涉及一個詐騙專案將資產（NFT、代幣）空投到你的錢包中，並引導你到一個詐騙網站去申領空投的資產。當你嘗試申領時，系統會提示你使用以太坊錢包登入並「授權」一筆交易。這筆交易會將你的公鑰和私鑰發送給詐騙者，從而危及你的帳戶。這種詐騙的另一種形式可能會讓你確認一筆將資金發送到詐騙者帳戶的交易。

[更多關於空投詐騙的資訊](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 網路安全基礎知識 {#web-security}

### 使用強密碼 {#use-strong-passwords}

[超過 80% 的帳戶被駭是由於密碼薄弱或被盜所致](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/)。字元、數字和符號的長組合將有助於確保你的帳戶安全。

一個常見的錯誤是使用幾個常見的、相關的單字組合。像這樣的密碼是不安全的，因為它們很容易受到稱為字典攻擊的駭客技術的攻擊。

```md
弱密碼範例：CuteFluffyKittens!

強密碼範例：ymv\*azu.EAC8eyp8umf
```

另一個常見的錯誤是使用容易被猜到或透過[社交工程](<https://wikipedia.org/wiki/Social_engineering_(security)>)發現的密碼。在密碼中包含你母親的娘家姓氏、你的孩子或寵物的名字，或出生日期，將會增加被駭客攻擊的風險。

#### 良好的密碼實踐： {#good-password-practices}

- 盡可能讓密碼達到密碼產生器或你正在填寫的表單所允許的最大長度
- 混合使用大寫字母、小寫字母、數字和符號
- 不要在密碼中使用個人詳細資訊，例如姓氏
- 避免使用常見單字

[更多關於建立強密碼的資訊](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 為所有東西使用獨特的密碼 {#use-unique-passwords}

在資料外洩中被洩露的強密碼就不再是強密碼了。網站 [Have I Been Pwned](https://haveibeenpwned.com) 允許你檢查你的帳戶是否涉及任何公開的資料外洩事件。如果有，**請立即更改這些密碼**。為每個帳戶使用獨特的密碼可以降低在其中一個密碼被盜用時，駭客存取你所有帳戶的風險。

### 使用密碼管理員 {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    使用密碼管理員可以幫你建立強大、獨特的密碼並記住它們！我們<strong>強烈</strong>建議使用密碼管理員，而且它們大多數都是免費的！
</AlertDescription>
</AlertContent>
</Alert>

記住你擁有的每個帳戶的強大、獨特密碼並不理想。密碼管理員為你的所有密碼提供了一個安全、加密的儲存空間，你可以透過一個強大的主密碼來存取。當你註冊新服務時，它們還會建議強密碼，因此你不必自己建立。許多密碼管理員還會告訴你是否捲入了資料外洩事件，讓你在任何惡意攻擊發生之前更改密碼。

![Example of using a password manager](./passwordManager.png)

#### 嘗試使用密碼管理員： {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- 或查看其他[推薦的密碼管理員](https://www.privacytools.io/secure-password-manager)

### 使用雙重驗證 {#two-factor-authentication}

你有時可能會被要求透過獨特的證明來驗證你的身分。這些被稱為**因素**。三個主要因素是：

- 你知道的東西（例如密碼或安全問題）
- 你本身的特徵（例如指紋或虹膜/臉部掃描器）
- 你擁有的東西（安全金鑰或手機上的驗證應用程式）

使用**雙重驗證 (2FA)** 為你的線上帳戶提供了額外的*安全因素*。2FA 確保僅僅擁有你的密碼不足以存取帳戶。最常見的情況是，第二個因素是一個隨機的 6 位數代碼，稱為**基於時間的一次性密碼 (TOTP)**，你可以透過 Google Authenticator 或 Authy 等驗證應用程式存取。這些作為「你擁有的東西」因素發揮作用，因為產生定時碼的種子儲存在你的裝置上。

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    注意：使用基於簡訊的 2FA 容易受到 <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM 卡劫持</a> 的攻擊，並不安全。為了獲得最佳安全性，請使用 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> 或 <a href="https://authy.com/">Authy</a> 等服務。
</AlertDescription>
</AlertContent>
</Alert>

#### 安全金鑰 {#security-keys}

安全金鑰是一種更進階、更安全的 2FA 類型。安全金鑰是實體硬體驗證裝置，其運作方式類似於驗證應用程式。使用安全金鑰是最安全的 2FA 方式。許多此類金鑰利用了 FIDO 通用第二因素 (U2F) 標準。[了解更多關於 FIDO U2F 的資訊](https://www.yubico.com/resources/glossary/fido-u2f/)。

觀看更多關於 2FA 的影片：

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### 解除安裝瀏覽器擴充功能 {#uninstall-browser-extensions}

瀏覽器擴充功能（例如 Chrome 擴充功能或 Firefox 附加元件）可以改善瀏覽器功能，但也伴隨著風險。預設情況下，大多數瀏覽器擴充功能會要求「讀取和變更網站資料」的存取權限，這允許它們對你的資料執行幾乎任何操作。Chrome 擴充功能總是自動更新，因此以前安全的擴充功能稍後可能會更新以包含惡意程式碼。大多數瀏覽器擴充功能並不是試圖竊取你的資料，但你應該意識到它們有能力這麼做。

#### 透過以下方式保持安全： {#browser-extension-safety}

- 僅從受信任的來源安裝瀏覽器擴充功能
- 移除未使用的瀏覽器擴充功能
- 在本機安裝 Chrome 擴充功能以停止自動更新（進階）

[更多關於瀏覽器擴充功能風險的資訊](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 進一步閱讀 {#further-reading}

### 網路安全 {#reading-web-security}

- [多達 300 萬台裝置感染了帶有惡意軟體的 Chrome 和 Edge 附加元件](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [如何建立一個你不會忘記的強密碼](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [什麼是安全金鑰？](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### 加密貨幣安全 {#reading-crypto-security}

- [保護你自己和你的資金](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [常見加密貨幣通訊軟體中的安全問題](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [給新手和聰明人的安全指南](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [加密貨幣安全：密碼與驗證](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 防詐騙教育 {#reading-scam-education}

- [指南：如何識別詐騙代幣](/guides/how-to-id-scam-tokens/)
- [保持安全：常見詐騙](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [避免詐騙](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [關於常見加密貨幣網路釣魚電子郵件和訊息的推特討論串](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />