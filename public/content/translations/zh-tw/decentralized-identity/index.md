---
title: 去中心化身分
description: 什麼是去中心化身分，它為什麼很重要？
lang: zh-tw
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: 傳統身分系統對你的身分識別進行中心化發行、維護和控制。
summaryPoint2: 去中心化身分消除了對中心化第三方的依賴。
summaryPoint3: 多虧了加密技術，使用者現在擁有了再次發行、持有和控制自身身分識別和證明的工具。
---

現如今，身分幾乎支撐著我們生活的方方面面。 使用線上服務、開設銀行帳戶、選舉投票、購買房產、就業，所有這些事情都需要證明你的身分。

然而，傳統的身分管理系統長期以來一直仰賴中心化的中介機構來發行、持有和控制您的身分識別和[證明](/glossary/#attestation)。 這意味著你無法掌控自己身分的相關資訊，也無法決定誰能夠存取你的個人身分資訊 (PII)，以及各方擁有多大的訪問權限。

為了解決這些問題，我們在以太坊等公共區塊鏈上構建了去中心化身分系統。 去中心化身分允許每個人管理他們的身分相關資訊。 有了去中心化身分解決方案，_您_就可以建立身分識別、宣告並持有您的證明，而無需仰賴服務供應商或政府等中心化機構。

## 什麼是身分認同？ {#what-is-identity}

身分意味著個人的自我意識，由獨特的特徵定義。 身分指的是作為一個_個體_，即一個獨特的人類實體。 身分也可以是指其他非人類的實體，例如組織或機構。

<YouTube id="Ew-_F-OtDFI" />

## 什麼是身分識別？ {#what-are-identifiers}

身分識別是一些資訊，用來指向一個特定身分或多個身分。 常見的身分識別包含：

- 名稱
- 社會安全號碼/稅務識別號碼
- 手機號碼
- 出生日期和出生地點
- 數位身分憑證，例如：電子郵件地址、使用者名稱、頭像

這些傳統的身分識別範例，均由中央實體發行、持有和控制。 你需要獲得政府的許可才能更改你的姓名，或者需要獲得社交媒體平台的許可才能更改你的帳號。

## 去中心化身分的好處 {#benefits-of-decentralized-identity}

1. 去中心化身分增加了個人對身分識別資訊的掌握。 可以在無需依賴中心化機構和第三方服務的情況下，驗證去中心化身分識別和身分證明。

2. 去中心化身分解決方案為驗證和管理使用者身分，提供了一種無須信任、順暢且保護隱私的方法。

3. 去中心化身分利用區塊鏈技術，在不同方之間建立信任，並提供加密擔保來驗證身分證明的有效性。

4. 去中心化身分使得身分資料具有可便攜性。 使用者將證明和身分識別儲存在行動錢包中，並可與其選擇的任何一方分享。 去中心化身分識別和身分證明不會被鎖在發行組織的資料庫中。

5. 去中心化身分應能與新興的[零知識](/glossary/#zk-proof)技術良好地配合，使個人能夠證明他們擁有某物或做過某事，而無需揭露那是什麼。 這可以成為一種將信任與隱私結合在一起的強而有力方案，適用於投票等應用方面。

6. 去中心化身分能啟用[反女巫](/glossary/#anti-sybil)機制，以識別單一個人假冒成多人來濫用或向某個系統傳送垃圾訊息的情況。

## 去中心化身分使用案例 {#decentralized-identity-use-cases}

去中心化身分有許多潛在的使用案例：

### 1. 通用登入 {#universal-dapp-logins}

去中心化身分可以使用去中心化驗證，有助於替代基於密碼的登入方式。 服務提供商可以向使用者簽發身分證明，這些證明可以儲存在以太坊錢包中。 證明的一個範例是 [NFT](/glossary/#nft)，它能授予持有者存取線上社群的權限。

接著，[使用以太坊登入](https://siwe.xyz/)功能可讓伺服器確認使用者的以太坊帳戶，並從其帳戶地址擷取所需的證明。 這意味著使用者無需記住冗長的密碼，就能夠訪問平台和網站，進而改善使用者的線上體驗。

### 2. KYC 驗證 {#kyc-authentication}

許多線上服務的使用，需要提供個人的身分證明和憑證，例如駕駛執照或國家護照。 但這種方式是有問題的，因為使用者的私人資訊有可能會被洩露，並且服務提供商無法驗證身分證明的真實性。

去中心化身分讓公司可以跳過傳統的[了解你的客戶 (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) 流程，並透過可驗證憑證來驗證使用者身分。 這降低了身份管理的成本，並防止使用偽造文件。

### 3 投票和線上社群 {#voting-and-online-communities}

線上投票和社交媒體是去中心化身分的兩個新應用。 線上投票方案容易受到操縱，尤其是在惡意行為者創建虛假身分進行投票的情況下。 要求個人提供鏈上身分證明可以提高線上投票過程的完整性。

去中心化身分可以幫助創建沒有虛假帳戶的線上社群。 例如，每個用使用者可能必須使用鏈上身分系統，如以太坊名稱服務，來驗證他們的身分，從而減少機器人的可能性。

### 4 反女巫保護 {#sybil-protection}

使用[二次方投票](/glossary/#quadratic-voting)的補助金發放應用程式容易受到[女巫攻擊](/glossary/#sybil-attack)的影響，因為當越多人投票給某個補助金時，其價值就會增加，從而誘使使用者將其貢獻分散到許多身分中。 去中心化身分透過增加每位參與者的負擔來證明他們是真正的人，這有助於防止這種情況發生，而且通常也不必透露具體的私人資訊。

### 5 國家和政府 ID {#national-and-government-id}

政府可以利用去中心化身分的原則，將國民身分證、護照或駕照等基礎身分文件作為以太坊上的可驗證憑證發行，提供強大的密碼學真偽保證，以減少線上身分驗證中的詐欺和偽造。 公民可以將這些證明儲存在個人[錢包](/wallets/)中，並用來證明其身分、年齡或投票權。

此模型允許選擇性揭露，特別是在與[零知識證明 (ZKP)](/zero-knowledge-proofs/) 隱私技術結合時。 例如，公民可以透過密碼學證明自己已滿 18 歲，以存取有年齡限制的服務，而無需透露其確切的出生日期，這比傳統 ID 提供了更高的隱私性。

#### 💡案例研究：不丹在以太坊上的國家數位 ID (NDI) {#case-study-bhutan-ndi}

- 為不丹近 80 萬公民提供可驗證的身分憑證存取權限
- 於 2025 年 10 月從 Polygon 網路[遷移至以太坊主網](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)
- 截至 2025 年 3 月，已發行超過 [234,000 個數位 ID](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/)

不丹王國於 2025 年 10 月將其[國家數位身分 (NDI) 系統遷移](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)至以太坊。 不丹的 NDI 系統建構於去中心化身分和自主身分的原則之上，使用去中心化身分識別和可驗證憑證，將數位簽署的憑證直接發行到公民的個人錢包中。 透過將這些憑證的密碼學證明錨定在以太坊上，該系統確保它們是真實、防竄改的，並且任何一方都可以在不查詢中心機構的情況下進行驗證。

該系統的架構透過使用[零知識證明 (ZKP)](/zero-knowledge-proofs/) 技術來強調隱私。 這種「選擇性揭露」的實作允許公民證明特定事實 (例如「我已滿 18 歲」或「我是公民」) 以存取服務，而無需透露其完整的身分證號碼或確切的出生日期等底層個人資料。 這展示了以太坊在安全、以使用者為中心和保護隱私的國家 ID 系統方面的強大實際應用。

#### 💡案例研究：布宜諾斯艾利斯市在以太坊 [Layer 2](/layer-2/) ZKSync Era 上的 QuarkID {#case-study-buenos-aires-quarkid}

- 在推出時向超過 [360 萬名使用者](https://buenosaires.gob.ar/innovacionytransformaciondigital/miba-con-tecnologia-quarkid-la-ciudad-de-buenos-aires-incorporo)發行了去中心化身分憑證
- QuarkID 是一個開源協定，被聯合國永續發展目標認定為[數位公共財](https://www.digitalpublicgoods.net/r/quarkid)
- 強調「[政府即使用者](https://buenosaires.gob.ar/innovacionytransformaciondigital/miba-con-tecnologia-quarkid-la-ciudad-de-buenos-aires-incorporo)」模型，市政府不擁有該協定，賦予公民完整的資料所有權和隱私

2024 年，布宜諾斯艾利斯市政府 (GCBA) 將 QuarkID 整合到 miBA 中，QuarkID 是由 GCBA 創新和數位轉型秘書處建構的開源「數位信任框架」，而 miBA 則是該市居民用來存取政府服務和官方文件的官方應用程式。 推出時，miBA 的所有 360 萬以上使用者都獲得了去中心化數位身分，讓他們可以在鏈上管理和分享可驗證的數位文件和證書，包括公民身分憑證、出生、結婚和死亡證明、稅務記錄、疫苗接種記錄等。

QuarkID 系統建構於以太坊 [Layer 2](/layer-2/) 網路 ZKSync Era 之上，使用 ZKP 技術讓公民可以透過行動裝置對等驗證個人憑證，而無需揭露不必要的個人資料。 該計畫強調了「政府即使用者」模型，其中 GCBA 作為開源、可互通的 QuarkID 協定的一名使用者，而非中心化的擁有者。 這種支援 ZKP 的架構提供了一個關鍵的隱私功能：任何第三方，甚至 GCBA，都無法追蹤公民如何、何時或為何使用其憑證。 這個成功的計畫為公民提供了完整的自主身分和對其敏感資料的控制權，所有這些都由以太坊的全球分散式網路提供保護。

## 什麼是身分證明 {#what-are-attestations}

身分證明是由一個實體提出的關於另一個實體的聲明。 如果你居住在美國，你的駕駛執照是由機動車輛管理局（一個實體）發布，它證明你（另一個實體）在法律上允許駕駛汽車。

身分證明與身分識別不同。 證明_包含_用來指稱特定身分的身分識別，並對與此身分相關的屬性進行宣告。 因此，你的駕駛執照具有身分識別（姓名、出生日期、地址），但也是關於你合法駕駛權利的證明。

### 什麼是去中心化身分識別？ 什麼是去中心化身分識別？ {#what-are-decentralized-identifiers}

你的法定姓名或電子郵件地址等傳統身分識別依賴於第三方——政府和電子郵件提供商。 去中心化身分識別 (DID) 則不同－它們不由任何中央實體發行、管理或控制。

去中心化身分識別由個人發行、持有和控制。 一個[以太坊帳戶](/glossary/#account)就是去中心化身分識別的一個範例。 你可以根據需要建立任意數量的帳戶，無需任何人的許可，也無需將它們儲存在中央註冊系統中。

去中心化身分識別儲存在分散式帳本 ([區塊鏈](/glossary/#blockchain)) 或[對等式網路](/glossary/#peer-to-peer-network)上。 這使得 DID 具有[全球唯一性、高可用度的可解析性，並可透過密碼學驗證](https://w3c-ccg.github.io/did-primer/)。 去中心化身份識別可與不同的實體相關聯，包含個人、組織或政府機構。

## 什麼讓去中心化身分識別成為可能？ 是什麼讓去中心化身分識別成為可能？ {#what-makes-decentralized-identifiers-possible}

### 1. 公鑰密碼學 {#public-key-cryptography}

公鑰密碼學是一種資訊安全措施，它為一個實體產生[公鑰](/glossary/#public-key)和[私鑰](/glossary/#private-key)。 公鑰[密碼學](/glossary/#cryptography)用於區塊鏈網路中，以驗證使用者身分並證明數位資產的所有權。

一些去中心化身分識別，如以太坊帳戶，都有著公鑰與私鑰。 公鑰用於識別帳戶的控制者，而私鑰則可以簽署和解密此帳戶的訊息。 公鑰密碼學提供了驗證實體、防止冒名頂替和使用假身分所需的證明，它使用[密碼學簽章](https://andersbrownworth.com/blockchain/public-private-keys/)來驗證所有宣告。

### 2. 去中心化資料儲存庫 {#decentralized-datastores}

區塊鏈充當可驗證的資料註冊系統：一個開放、去信任和去中心化的資訊儲存庫。 公共區塊鏈的存在使得不再需要將身分識別儲存在中心化的註冊系統上。

如果任何人需要確認去中心化身分識別的有效性，他們可以在區塊鏈上查找相關的公鑰。 這與需要由第三方進行驗證的傳統身分識別不同。

## 去中心化身分識別和身分證明要如何實現去中心化身分? 去中心化身分識別和證明如何實現去中心化身分？ {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

去中心化身分的概念是，與身分有關的資訊應該由自己控制，且是私密和可移植的，以去中心化身分識別和身分證明為基本構建模塊。

在去中心化身分的脈絡中，證明 (也稱為[可驗證憑證](https://www.w3.org/TR/vc-data-model/)) 是由發行者所做出的防竄改、可透過密碼學驗證的宣告。 實體（如，組織）發行的每個身分證明或可驗證憑證都與它們的去中心化身分識別有關。

由於去中心化身分識別儲存在區塊鏈上，任何人都可以在以太坊上交叉驗證發行人的去中心化身分識別，來驗證身分證明的有效性。 實際上，以太坊就像是一個全球目錄，能夠驗證與某些實體相關的去中心化身分識別。

去中心化身分識別是讓身分證明能夠自行控制和驗證的原因。 即使發行者不再存在，持有者也始終能夠證明，其身分證明的出處和有效性。

透過去中心化身分，來使去中心化身分識別能夠保護個人隱私資訊也至關重要。 例如，如果某人提交一個身分證明（駕駛執照），則驗證方不需要檢查身分證明中資訊的有效性。 反之，驗證者只需要獲得身分證明真實性的加密擔保以及發證機構的身分，就足以確定此證明是否有效。

## 去中心化身分中的證明類型 {#types-of-attestations-in-decentralized-identity}

在基於以太坊的身分生態系統中，如何儲存和檢索身分證明資訊與傳統身分管理不同。 以下是在去中心化身分系統中發行、儲存和驗證身分證明的各種方法的概覽：

### 鏈下證明 {#offchain-attestations}

將身份證明儲存在鏈上的一個問題是，其中可能包含個人想要保密的資訊。 以太坊區塊鏈具有公開性，因此不適合用於儲存此類身分證明。

解決方案是發行身分證明，由使用者在數位錢包中鏈下持有，但使用儲存在鏈上的發行人的去中心化身分識別進行簽名。 這些證明會被編碼為 [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) 並包含發行者的數位簽章，以便輕鬆驗證鏈下宣告。

以下是解釋鏈下身分證明的假設場景：

1. 某大學（發行人）產生身分證明（數位學歷證書），用其金鑰簽署，然後將證書頒發給 Bob（身分持有者）。

2. Bob 申請了一份工作並想向雇主證明他的學歷，因此他分享了行動裝置錢包中的身分證明。 公司（驗證者）可以透過檢查發行人的去中心化身分識別（即，其在以太坊上的公鑰），來確認身分證明的有效性。

### 具備永久存取權限的鏈下證明 {#offchain-attestations-with-persistent-access}

在這種安排下，證明會被轉換成 JSON 檔案並儲存在鏈下 (最好是儲存在 [去中心化雲端儲存](/developers/docs/storage/) 平台，例如 IPFS 或 Swarm)。 然而，JSON 檔案的[哈希](/glossary/#hash)會儲存在鏈上，並透過鏈上登錄檔連結到 DID。 所關聯的去中心化身分識別可以是發行人或接收者的身分證明。

這種方法使身份證明能夠獲得基於區塊鏈的持久性，同時確保聲明資訊的加密性和可驗證性。 它還允許選擇性揭露，因為私鑰的持有者可以解密資訊。

### 鏈上證明 {#onchain-attestations}

鏈上證明保存在以太坊區塊鏈上的[智能合約](/glossary/#smart-contract)中。 智能合約（充當註冊系統）將身分證明對應到相關的鏈上去中心化身分識別（公開金鑰）。

以下範例展示了鏈上身分證明在實踐中的使用方式：

1. 一家公司（XYZ 公司）計畫使用智慧型合約出售所有權股份，但只想賣給那些已經完成背景調查的買家。

2. XYZ 公司可以讓執行背景調查的公司，在以太坊上發行鏈上身分證明。 此身分證明可以證實某人已經通過背景調查，但不會暴露任何個人資訊。

3. 出售股份的智慧型合約可以檢查註冊合約以獲得經篩選之買家的身分，從而使智慧型合約可以確定哪些人被允許購買股份。

### 靈魂綁定代幣與身分 {#soulbound}

[靈魂綁定代幣](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([不可轉移的 NFT](/glossary/#nft)) 可用於收集特定錢包的專屬資訊。 這有效地建立了一個與特定以太坊地址綁定的獨特鏈上身分，其中可包含代表成就 (例如，完成某個特定的線上課程或在遊戲中達到門檻分數) 或社群參與的代幣。

## 使用去中心化身分 {#use-decentralized-identity}

有許多雄心勃勃的專案使用以太坊作為去中心化身分解決方案基礎：

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _一種去中心化的鏈上命名系統，適用於機器可讀的身分識別，例如以太坊錢包地址、內容哈希和元資料。_
- **[使用以太坊登入 (SIWE)](https://siwe.xyz/)** - _使用以太坊帳戶進行驗證的開放標準。_
- **[SpruceID](https://www.spruceid.com/)** - _一個去中心化身分專案，讓使用者能用以太坊帳戶和 ENS 個人資料控制數位身分，而無需仰賴第三方服務。_
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - _一個去中心化的帳本/協定，可用於對任何事物進行鏈上或鏈下證明。_
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (或 PoH) 是建構在以太坊上的一套社會身分驗證系統。_
- **[BrightID](https://www.brightid.org/)** - _一個去中心化的開源社交身分網路，旨在透過建立和分析社交圖譜來改革身分驗證。_
- **[walt.id](https://walt.id)** — _開源的去中心化身分和錢包基礎設施，讓開發者和組織能夠利用自主身分和 NFT/SBT。_
- **[Veramo](https://veramo.io/)** - _一個 JavaScript 框架，讓任何人都能輕鬆地在其應用程式中使用可透過密碼學驗證的資料。_

## 延伸閱讀 {#further-reading}

### 文章 {#articles}

- [區塊鏈使用案例：數位身分中的區塊鏈](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [什麼是以太坊 ERC725？ 區塊鏈上的自主身分管理](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [區塊鏈如何解決數位身分問題](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [什麼是去中心化身分？為什麼您該關心？](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [去中心化身分簡介](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### 影片 {#videos}

- [去中心化身分 (直播加碼場)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Andreas Antonopolous 製作的絕佳去中心化身分說明影片_
- [使用以太坊登入和去中心化身分，搭配 Ceramic、IDX、React 和 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Nader Dabit 製作的 YouTube 教學，介紹如何使用使用者的以太坊錢包建置身分管理系統來建立、讀取和更新其個人資料_
- [BrightID - 以太坊上的去中心化身分](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Bankless 播客節目，討論 BrightID，一個以太坊的去中心化身分解決方案_
- [鏈下網際網路：去中心化身分與可驗證憑證](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen 在 2022 年 EthDenver 的演講
- [可驗證憑證說明](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann 附帶示範的 YouTube 說明影片

### 社群 {#communities}

- [GitHub 上的 ERC-725 聯盟](https://github.com/erc725alliance) — _支援在以太坊區塊鏈上管理身分的 ERC725 標準_
- [EthID Discord 伺服器](https://discord.com/invite/ZUyG3mSXFD) — _致力於「使用以太坊登入」和「以太坊追蹤協定」的愛好者與開發者社群_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _一個致力於為應用程式建置可驗證資料框架的開發者社群_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _一個由開發者和建構者組成的社群，致力於開發各行各業的去中心化身分使用案例_
