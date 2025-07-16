---
title: 以太坊安全及詐騙預防
description: 維護以太坊安全
lang: zh-tw
---

# 以太坊安全性及詐騙防範 {#introduction}

人們對加密貨幣的興趣日益濃厚，詐騙者和駭客帶來的風險也隨之增加。 本文列出了一些降低此類風險的最佳案例。

**記住：ethereum.org 的人員絕不會主動聯絡你。 切勿回覆任何聲稱來自以太坊官方支援的電子郵件。**

<Divider />

## 加密貨幣安全性基本入門 {#crypto-security}

### 提升你的知識 {#level-up-your-knowledge}

不了解加密貨幣的運作方式，可能導致代價可觀的錯誤。 舉例來說，若是不了解以太坊是去中心化網路且未提供客服功能，當有人偽裝成客服人員，謊稱返還遺失的以太幣以藉機索取你的私密金鑰，便很容易落入圈套。 增加對以太坊運作方式的知識，是一項很值得的投資。

<DocLink href="/what-is-ethereum/">
  什麼是 Ethereum？
</DocLink>

<DocLink href="/eth/">
  甚麼是以太(以太幣)？
</DocLink>
<Divider />

## 錢包安全性 {#wallet-security}

### 不要洩露你的私密金鑰 {#protect-private-keys}

**無論任何原因，絕對不要分享你的私密金鑰！**

錢包的私密金鑰，就如同開啟以太坊錢包的密碼。 這是唯一阻止別人從你的錢包地址提領所有帳戶資產的方法！

<DocLink href="/wallets/">
  什麼是以太坊錢包?
</DocLink>

#### 不要拍攝你的種子助記詞/私密金鑰的螢幕擷取畫面 {#screenshot-private-keys}

拍攝種子助記詞或私密金鑰的螢幕擷取畫面，有同步到雲端資料提供者的風險，為駭客開方便之門。 從雲端獲取私密金鑰是駭客常用的攻擊手法。

### 使用硬體錢包 {#use-hardware-wallet}

硬體錢包讓人能離線儲存私密金鑰。 硬體錢包被視為儲存私密金鑰最安全的錢包選擇：私密金鑰永不連網且完全儲存在本機裝置上。

讓私密金鑰保持在離線狀態，即使駭客掌握你的電腦，也能大幅減少駭客入侵的風險。

#### 試試硬體錢包： {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 發送交易前仔細檢查 {#double-check-transactions}

不小心將加密貨幣發送到錯誤的錢包地址是一種常見錯誤。 **以太坊上傳送的交易是不可逆的。**除非你知道該地址的擁有者，並能說服他們將資金退回，否則你將無法找回你的資金。

發送交易之前，務必確保發送的地址與接收人的地址完全匹配。 此外，與智慧型合約進行互動時，在簽名前閱讀交易訊息是一種良好的實務。

### 設定智慧型合約支出限額 {#spend-limits}

與智慧型合約進行互動時，不允許無支出限額。 若無支出限額，智慧型合約將能掏空你的錢包。 相反，將支出限額僅設定為交易需要的金額。

許多以太坊錢包提供限額保護，以防止帳戶被掏空。

[如何撤銷授權智慧型合約與你的加密資產互動](/guides/how-to-revoke-token-access/)

<Divider />

## 常見的詐騙手法 {#common-scams}

完全阻止詐騙者是不可能的，但若了解其常用的手法，就能降低其成功率。 雖然騙局層出不窮，但通常本質相同。 唯一的應對方法是，請記住：

- 始終保持懷疑態度
- 沒有人會給你免費或打折的以太幣
- 沒有人需要獲取你的私密金鑰或個人資訊

### 推特廣告釣魚 {#ad-phishing}

![推特連結釣魚](./twitterPhishingScam.png)

有種方法可以騙過推特（現在叫 X）的連結預覽功能，潛在地欺騙使用者，讓他們誤以為存取的是正版官網。 此技術利用推特的機制來產生推文中的預覽超連結，並顯示_來自 ethereum.org_（如上例所示），但該連結事實上會重新導向到惡意網站。

請一律檢查網域是否正確，特別是點擊連結之後。

[點此查看更多資訊](https://harrydenley.com/faking-twitter-unfurling)。

### 贈獎詐騙 {#giveaway}

加密貨幣中最常見的騙局之一是贈獎詐騙。 贈獎詐騙有多種形式，但一般手法大概都是，如果你將以太幣傳送到提供的錢包地址，你會收到雙倍返還的以太幣。 *因此，它也稱為買一送一詐騙。*

這類詐騙通常會限制領取贈獎的時間，以製造一種虛假的緊迫感。

### 社交媒體駭客攻擊 {#social-media-hacks}

最出名的一次發生在 2020 年 7 月，當時很多知名人士和組織的 Twitter 帳戶被破解。 駭客同一時間使用被盜的帳戶發布了比特幣贈送活動。 雖然這些欺騙性推文很快被察覺並且刪除，但駭客仍僥倖逃脫，取走 11 個比特幣（或截至 2021 年 9 月的 500,000 美元）。

![Twitter 上的一個詐騙案例](./appleTwitterScam.png)

### 名人贈獎活動 {#celebrity-giveaway}

名人贈獎活動是贈獎詐騙的另一種常見形式。 詐騙者會錄製名人的採訪影片或會議演講，並在 YouTube 上進行直播 — 看起來好像名人正在接受直播採訪影片，支援加密貨幣贈送活動。

這類騙局中最常使用的是 Vitalik Buterin，但是也使用了加密貨幣相關的許多其他知名人士（例如 Elon Musk 或 Charles Hoskinson）。 在直播中加入知名人士，會讓騙局看起來感覺合法（雖然值得懷疑，但有 Vitalik 參與，肯定沒問題！）。

**贈獎活動從來都是一場騙局。 如果你把資金轉到這些帳戶，永遠要不回來。**

![YouTube 上的一個詐騙案例](./youtubeScam.png)

### 支援服務騙局 {#support-scams}

加密貨幣是一種相對年輕且被誤解的技術。 有一種常見的騙局就是利用這一點，稱為支援服務騙局，詐騙者針對受歡迎的加密貨幣錢包、交易所或區塊鏈，冒充成支援人員。

許多關於以太坊的討論，都在 Discord 上發生。 支援服務詐騙者發掘下手目標的方式，通常是在公開的 Discord 頻道中搜尋支援問題，然後向詢問者發送提供支援服務的私人訊息。 詐騙者會建立信任，試圖誘使你透露私密金鑰或將資金發送到他們的錢包。

![Discord 上的支援服務詐騙案例](./discordScam.png)

一般來說，員工絕不會透過非官方私人管道與你交流。 處理支援事宜時，記住幾個簡單的要點：

- 永遠不要分享私密金鑰、種子助記詞或密碼
- 絕不允許任何人遠端存取你的電腦
- 切勿以非官方指定管道來交流

<InfoBanner emoji=":lock:">
  <div>
    請注意：支援服務型騙局常發生在 Discord 平台上，但在任何討論加密貨幣的聊天應用程式上也可能很盛行，包括電子郵件。
  </div>
</InfoBanner>

### 「以太坊 2」代幣騙局 {#eth2-token-scam}

在[合併](/roadmap/merge/)的準備階段，詐騙者曾試圖利用「以太坊 2」這個詞製造混淆，讓使用者將以太幣兌換成「以太坊 2」代幣。 但根本沒有所謂的「以太坊 2」，合併後也未導入任何其他合法代幣。 合併前擁有的以太幣，和現在是同一個以太幣。 **在從工作量證明過渡到權益證明時，無需採取任何與以太幣有關的行動**。

詐騙者可能會佯裝成「支援團隊」，告訴你如果存入以太幣，將會收到「以太坊 2」代幣。 其實並沒有[以太坊官方支援團隊](/community/support/)，也沒有新的代幣。 切勿和任何人分享錢包的種子助記詞。

_注意：有些衍生的代幣/行情指示器可能代表被質押的以太幣（即 Rocket Pool 的 rETH、Lido 的 stETH、Coinbase 的 ETH2），但這些都不需要「遷移過去」。_

### 網路钓鱼詐騙 {#phishing-scams}

網路钓鱼詐騙是另一種越來越常見的詐騙手段，詐騙者會利用它試圖竊取錢包中的資金。

一些網路釣魚電子郵件要求使用者點選連結，將其重新定向至仿冒的網站，要求他們輸入種子助記詞、重設密碼或發送以太幣。 有些可能會要求你在不知情的情況下安裝惡意軟體，使電腦被感染，並使詐騙者能存取你的電腦文件。

如果你收到來歷不明的電子郵件，請記住：

- 對於不認識的電子郵件地址，切勿打開當中的連結或附件
- 切勿向任何人洩露你的個人資訊或密碼
- 刪除來路不明的電子郵件

[更多避免網路釣魚詐騙的相關資訊](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 加密貨幣交易經紀人詐騙 {#broker-scams}

假冒的加密貨幣交易經紀人自稱是專業的加密貨幣經紀人，他們會提議收取金錢並代表你投資。 詐騙者收到錢後可能會誘導你，要你拿出更多資金以免錯過更多投資收益，他們也可能完全銷聲匿跡。

這些騙子經常利用 YouTube 上的虛假帳戶尋找目標，然後開始看似自然地展開有關「經紀人」的交談。 這些對話通常會有很多按讚數，以增加真實性，但都是來自機器人帳戶。

**別相信網路上的陌生人、讓他們代你投資。 你的加密貨幣將付諸東流。**

![YouTube 上的交易經紀人詐騙案例](./brokerScam.png)

### 加密礦池詐騙 {#mining-pool-scams}

2022 年 9 月起，已再也無法在以太坊上挖礦。 但是，礦池騙局仍然存在。 礦池騙局中，有人會主動聯繫你，聲稱加入以太坊礦池就能獲得豐厚的回報。 詐騙者會提出要求，並一直與你保持聯繫，不善罷甘休。 基本上，詐騙者會試圖讓你相信，當你加入以太坊礦池時，你的加密貨幣將用來建立以太幣，而你將獲得以太幣形式的紅利。 接著你會發現你的加密貨幣獲得了微薄的回報。 這只是為了引誘你投入更多的資金。 最終，所有資金會傳送到不明的地址，詐騙者要嘛人間蒸發，要嘛在某些情況下繼續保持聯繫，就像最近一個案例一樣。

總之，務必警惕那些在社交媒體上聯絡你、要求你加入礦池的人。 一旦失去加密貨幣，就永遠回不來了。

牢記以下幾件事：

- 警惕任何與你聯繫、談及如何使用加密貨幣賺錢的人
- 針對質押、流動性池或其他加密貨幣投資方式做做功課
- 這種方式即使是合法的，也非常少見。 否則可能早就成為主流、為人所知。

[有人在礦池騙局中損失了 20 萬美元](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 空投騙局 {#airdrop-scams}

空投騙局是指詐騙者設局將某個資產（非同質化代幣、代幣）空投到你的錢包裡，然後發送一個詐騙性網站，讓你領取這些空投的資產。 當你嘗試領取資產，會提示你使用自己的以太坊錢包登入，並「核准」一筆交易。 但這筆交易會損害你的帳戶，將公開金鑰和私密金鑰都傳送給詐騙者。 另一種形式，可能是請你確認一筆能將資金轉移到詐騙者帳戶的交易。

[更多空投騙局相關資訊](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 網路安全基本入門 {#web-security}

### 使用強式密碼 {#use-strong-passwords}

[80%以上被駭客攻擊的帳戶，都由於密碼不夠强或密碼被盜用](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/)。 由字元、數字和符號組合成的足夠長度的密碼，能為你的帳戶提供足夠的安全性。

一個常見的錯誤是，使用幾個常見、相關字詞的組合做為密碼。 此類型的密碼是不安全的，因為容易受到一種被稱為字典攻擊的駭客技術所破解。

```md
弱密碼範例：CuteFluffyKittens!

強式密碼範例：ymv\*azu.EAC8eyp8umf
```

另一個常見的錯誤是，使用容易透過[社交工程](https://wikipedia.org/wiki/Social_engineering_(security))猜中或發現的密碼。 在密碼中使用母親娘家姓、子女或寵物的名字或出生日期，都會增加密碼遭駭的風險。

#### 良好密碼實務： {#good-password-practices}

- 只要密碼產生器或填寫的表單允許，密碼越長越好
- 混用大小寫字母、數字及符號
- 別在密碼中加入個人細節，例如姓氏
- 避免使用常見的字詞

[更多建立強式密碼的相關資訊](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 各帳戶使用不同的密碼 {#use-unique-passwords}

在資料外洩事件中被揭露的強式密碼，已不再是強式密碼。 [Have I Been Pwned](https://haveibeenpwned.com) 這個網站可以讓你查詢你的帳戶是否涉入任何公開的資料外洩事件。 若涉入資料外洩， **請立即更改你的密碼**。 為每個帳戶使用不同的密碼，這樣在其中一個密碼遭洩漏時，可降低駭客存取你所有帳戶的風險。

### 使用密碼管理器 {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    使用密碼管理器能幫你建立獨特的強式密碼，並且記住密碼！ 我們<strong>非常</strong>建議使用密碼管理器，而且大多數免費！
  </div>
</InfoBanner>

記住每個帳戶獨一的強式密碼，並不是最理想的方式。 密碼管理員為你所有的密碼提供一個安全的加密儲存位置，只要透過一個強效的主密碼就能取用。 註冊新的服務時，密碼管理器也會自行建議強式密碼，無需自己建立。 許多密碼管理器也會告知你是否涉入資料外洩事件，方便提早更換密碼，以免遭受惡意攻擊。

![使用密碼管理器的範例](./passwordManager.png)

#### 試試密碼管理員： {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- 或查看其他[推薦的密碼管理員](https://www.privacytools.io/secure-password-manager)

### 使用雙因素驗證 {#two-factor-authentication}

有時候，你可能被要求透過特別的證據來驗證你的身分。 這些證據被稱為**因素**。 主要有三種因素：

- 你知道的資料（例如密碼或安全性問題）
- 你的身份（例如指紋，或虹膜或臉部掃描器）
- 你擁有之物（安全金鑰，或手機上的驗證應用程式）

使用**雙因素驗證 (2FA)** 時，可以為你的線上帳戶提供一層額外的*安全因素*。 雙因素驗證保障了即使取得你的密碼，仍不足以存取你的帳戶。 最常見的是，第二組因素是一個隨機的 6 位數代碼，稱為**基於時間的一次性密碼 (TOTP)**，可透過 Google authenticator 或 Authy 等驗證工具應用程式來取得。 這些因素取材自「你擁有之物」，因為產生定時碼的種子，儲存在你的裝置上。

<InfoBanner emoji=":lock:">
  <div>
    注意：使用基於簡訊的雙因素驗證容易受到 <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM 卡交換攻擊</a>，因此並不安全。 為了獲得最佳安全性，請使用 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> 或 <a href="https://authy.com/">Authy</a> 等服務。
  </div>
</InfoBanner>

#### 安全金鑰 {#security-keys}

安全金鑰是雙因素驗證的進階版，且更加安全。 安全金鑰是一種實體硬體驗證裝置，運作方式與驗證工具應用程式相似。 使用安全金鑰是雙因素驗證最安全的方式。 許多這些金鑰都使用 FIDO 通用第二因素 (U2F) 標準。 [深入了解 FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/)。

觀賞影片，深入了解雙因素驗證：

<YouTube id="m8jlnZuV1i4" start="3479" />

### 解除安裝瀏覽器擴充功能 {#uninstall-browser-extensions}

瀏覽器擴充功能，如 Chrome 擴充功能或 Firefox 附加功能能增強瀏覽器功能，但也伴隨著風險。 大多數瀏覽器擴充功能，皆預設請求「讀取和變更網站資料」的存取權限，如此一來，其幾乎能對你的資料為所欲為。 Chrome 擴充功能總會自動更新，因此原本安全的擴充元件，之後可能會更新並加入惡意程式碼。 多數瀏覽器擴充功能都不會試圖竊取你的資料，但你應該知道它是辦得到的。

#### 使用以下方式維持安全性： {#browser-extension-safety}

- 安裝瀏覽器擴充功能時，只接受信任的來源
- 移除不使用的瀏覽器擴充功能
- 在本機安裝 Chrome 擴充功能，以停止自動更新（進階）

[更多瀏覽器擴充功能風險的相關資訊](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 衍生閱讀 {#further-reading}

### 網路安全 {#reading-web-security}

- [高達 3 百萬台裝置被含有惡意軟體的 Chrome 與 Edge 附加元件所感染](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [如何建立一個永遠記得住的強式密碼](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [什麼是安全金鑰？](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### 加密貨幣安全 {#reading-crypto-security}

- [保護自己，保護資金](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [幣圈通訊軟體之共同資安問題](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [全民必修安全指南](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [加密貨幣安全性：密碼與驗證](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 防詐騙指引 {#reading-scam-education}

- [指南：如何識別詐騙性代幣](/guides/how-to-id-scam-tokens/)
- [保障安全：常見騙局](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [防範詐騙](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [從 Twitter 對話一探常見的加密貨幣網路釣魚電郵與訊息](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
