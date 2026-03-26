---
title: 去中心化身分
description: 什麼是去中心化身分？為什麼它很重要？
lang: zh-tw
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: 傳統的身分系統將識別碼的發行、維護和控制集中化。
summaryPoint2: 去中心化身分消除了對中心化第三方的依賴。
summaryPoint3: 感謝加密技術，使用者現在再次擁有了發行、持有和控制自己識別碼與證明的工具。
---

如今，身分幾乎支撐著你生活的方方面面。使用線上服務、開立銀行帳戶、在選舉中投票、購買房產、獲得就業機會——所有這些都需要證明你的身分。

然而，傳統的身分管理系統長期以來一直依賴中心化的中介機構，由他們發行、持有和控制你的識別碼與[證明](/glossary/#attestation)。這意味著你無法控制與自己身分相關的資訊，也無法決定誰可以存取個人識別資訊 (PII) 以及這些機構擁有多少存取權限。

為了解決這些問題，我們在[以太坊](/ )等公共區塊鏈上建立了去中心化身分系統。去中心化身分允許個人管理其身分相關資訊。透過去中心化身分解決方案，*你*可以建立識別碼，並聲明和持有你的證明，而無需依賴服務供應商或政府等中央機構。

## 什麼是身分？ {#what-is-identity}

身分是指個人的自我意識，由獨特的特徵所定義。身分指的是作為一個*個體*，即一個獨特的人類實體。身分也可以指其他非人類實體，例如組織或機構。

<YouTube id="Ew-_F-OtDFI" />

## 什麼是識別碼？ {#what-are-identifiers}

識別碼是一段資訊，作為指向特定一個或多個身分的指標。常見的識別碼包括：

- 姓名
- 社會安全碼/納稅識別碼
- 手機號碼
- 出生日期與地點
- 數位身分憑證，例如電子郵件地址、使用者名稱、頭像

這些傳統的識別碼範例由中心化實體發行、持有和控制。你需要獲得政府的許可才能更改姓名，或者獲得社群媒體平台的許可才能更改你的使用者名稱。

## 去中心化身分的優勢 {#benefits-of-decentralized-identity}

1. 去中心化身分增加了個人對識別資訊的控制。去中心化識別碼和證明可以在不依賴中心化機構和第三方服務的情況下進行驗證。

2. 去中心化身分解決方案促進了一種無需信任、無縫且保護隱私的方法，用於驗證和管理使用者身分。

3. 去中心化身分利用區塊鏈技術，在不同參與者之間建立信任，並提供密碼學保證來證明其證明的有效性。

4. 去中心化身分使身分資料具有可攜性。使用者將證明和識別碼儲存在行動錢包中，並可以與他們選擇的任何一方分享。去中心化識別碼和證明不會被鎖定在發行組織的資料庫中。

5. 去中心化身分應能與新興的[零知識](/glossary/#zk-proof)技術良好結合，這將使個人能夠證明他們擁有或做過某事，而無需透露該事物的具體內容。這可能成為將信任與隱私結合的強大方式，適用於投票等應用程式。

6. 去中心化身分支援[反女巫攻擊](/glossary/#anti-sybil)機制，以識別何時有一個人假冒成多個人來操縱或向某個系統發送垃圾訊息。

## 去中心化身分使用案例 {#decentralized-identity-use-cases}

去中心化身分有許多潛在的使用案例：

### 1. 通用登入 {#universal-dapp-logins}

去中心化身分可以幫助以去中心化身分驗證取代基於密碼的登入。服務供應商可以向使用者發行證明，這些證明可以儲存在以太坊錢包中。證明的一個例子是授予持有者存取線上社群權限的 [NFT](/glossary/#nft)。

[使用以太坊登入 (Sign-In with Ethereum)](https://siwe.xyz/) 功能將使伺服器能夠確認使用者的以太坊帳戶，並從其帳戶地址獲取所需的證明。這意味著使用者無需記住長密碼即可存取平台和網站，從而改善了使用者的線上體驗。

### 2. KYC 身分驗證 {#kyc-authentication}

使用許多線上服務需要個人提供證明和憑證，例如駕照或國家護照。但這種方法存在問題，因為使用者的私人資訊可能會被洩露，且服務供應商無法驗證證明的真實性。

去中心化身分允許公司跳過傳統的[了解你的客戶 (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) 流程，並透過可驗證憑證 (Verifiable Credentials) 來驗證使用者身分。這降低了身分管理的成本，並防止使用偽造文件。

### 3. 投票與線上社群 {#voting-and-online-communities}

線上投票和社群媒體是去中心化身分的兩個新穎應用。線上投票方案容易受到操縱，特別是當惡意行為者建立虛假身分進行投票時。要求個人出示鏈上證明可以提高線上投票過程的完整性。

去中心化身分可以幫助建立沒有假帳號的線上社群。例如，每個使用者可能必須使用鏈上身分系統（如以太坊域名服務 ENS）來驗證其身分，從而降低機器人存在的可能性。

### 4. 反女巫攻擊保護 {#sybil-protection}

使用[平方投票法](/glossary/#quadratic-voting)的贈款應用程式容易受到[女巫攻擊](/glossary/#sybil-attack)，因為當更多人投票支持時，贈款的價值會增加，這會激勵使用者將其貢獻分散到多個身分中。去中心化身分有助於防止這種情況，透過提高每個參與者證明自己是真實人類的門檻，儘管通常無需透露特定的私人資訊。

### 5. 國家與政府身分證 {#national-and-government-id}

政府可以利用去中心化身分的原則，在以太坊上發行基礎身分文件（如國民身分證、護照或駕照）作為可驗證憑證，提供強大的密碼學真實性保證，以減少線上身分驗證中的詐欺和偽造。公民可以將這些證明儲存在他們的個人[錢包](/wallets/)中，並用它們來證明自己的身分、年齡或投票權。

這種模式允許選擇性揭露，特別是與[零知識證明 (ZKP)](/zero-knowledge-proofs/) 隱私技術結合時。例如，公民可以透過密碼學證明自己年滿 18 歲，以存取有年齡限制的服務，而無需透露確切的出生日期，從而提供比傳統身分證更高的隱私保護。

#### 💡案例研究：以太坊上的不丹國家數位身分 (NDI) {#case-study-bhutan-ndi}

- 為不丹近 80 萬公民提供可驗證憑證的存取權限
- 於 2025 年 10 月從 Polygon 網路遷移[至以太坊主網](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)
- 截至 2025 年 3 月，已發行超過 [234,000 個數位身分](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/)

不丹王國於 2025 年 10 月[將其國家數位身分 (NDI) 系統遷移](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)至以太坊。不丹的 NDI 系統建立在去中心化身分和自主身分的原則之上，使用去中心化識別碼和可驗證憑證，將數位簽署的憑證直接發行到公民的個人錢包中。透過將這些憑證的發行者結構描述 (schema) 錨定在以太坊上，該系統確保它們是真實的、防篡改的，並且可以由任何一方進行驗證，而無需向中央機構查詢。

## 什麼是證明？ {#what-are-attestations}

證明是一個實體對另一個實體所作的聲明。如果你住在美國，車輛管理局（一個實體）發給你的駕照證明了你（另一個實體）在法律上被允許開車。

證明與識別碼不同。證明*包含*用於參考特定身分的識別碼，並對與該身分相關的屬性作出聲明。因此，你的駕照具有識別碼（姓名、出生日期、地址），但同時也是關於你合法駕駛權利的證明。

### 什麼是去中心化識別碼？ {#what-are-decentralized-identifiers}

傳統的識別碼（如你的法定姓名或電子郵件地址）依賴第三方——政府和電子郵件供應商。去中心化識別碼 (DID) 則不同——它們不由任何中心化實體發行、管理或控制。

去中心化識別碼由個人發行、持有和控制。[以太坊帳戶](/glossary/#account)就是去中心化識別碼的一個例子。你可以建立任意數量的帳戶，無需任何人的許可，也無需將它們儲存在中央註冊表中。

去中心化識別碼儲存在分散式帳本（[區塊鏈](/glossary/#blockchain)）或[點對點網路](/glossary/#peer-to-peer-network)上。這使得 DID 具有[全球唯一性、高可用性解析以及密碼學可驗證性](https://w3c-ccg.github.io/did-primer/)。去中心化識別碼可以與不同的實體關聯，包括個人、組織或政府機構。

## 是什麼讓去中心化識別碼成為可能？ {#what-makes-decentralized-identifiers-possible}

### 1. 公鑰密碼學 {#public-key-cryptography}

公鑰密碼學是一種資訊安全措施，它為實體產生一個[公鑰](/glossary/#public-key)和一個[私鑰](/glossary/#private-key)。公鑰[密碼學](/glossary/#cryptography)在區塊鏈網路中用於驗證使用者身分並證明數位資產的所有權。

某些去中心化識別碼（例如以太坊帳戶）具有公鑰和私鑰。公鑰識別帳戶的控制者，而私鑰可以為該帳戶簽署和解密訊息。公鑰密碼學提供了驗證實體所需的證明，並防止冒充和使用虛假身分，使用[加密簽署](https://andersbrownworth.com/blockchain/public-private-keys/)來驗證所有聲明。

### 2. 去中心化資料儲存 {#decentralized-datastores}

區塊鏈作為一個可驗證的資料註冊表：一個開放、無需信任且去中心化的資訊庫。公共區塊鏈的存在消除了將識別碼儲存在中心化註冊表中的需求。

如果任何人需要確認去中心化識別碼的有效性，他們可以在區塊鏈上尋找關聯的公鑰。這與需要第三方進行驗證的傳統識別碼不同。

## 去中心化識別碼和證明如何實現去中心化身分？ {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

去中心化身分的理念是，與身分相關的資訊應該是自我控制、私密且可攜帶的，而去中心化識別碼和證明是其主要的組成部分。

在去中心化身分的背景下，證明（也稱為[可驗證憑證](https://www.w3.org/TR/vc-data-model/)）是由發行者作出的防篡改、密碼學可驗證的聲明。實體（例如組織）發行的每個證明或可驗證憑證都與其 DID 相關聯。

因為 DID 儲存在區塊鏈上，任何人都可以透過在以太坊上交叉比對發行者的 DID 來驗證證明的有效性。本質上，以太坊區塊鏈就像一個全球目錄，能夠驗證與特定實體相關聯的 DID。

去中心化識別碼是證明能夠自我控制和可驗證的原因。即使發行者不再存在，持有者始終擁有證明其來源和有效性的證據。

去中心化識別碼對於透過去中心化身分保護個人資訊隱私也至關重要。例如，如果個人提交了證明（駕照）的證據，驗證方不需要檢查證據中資訊的有效性。相反，驗證者只需要證明真實性的密碼學保證以及發行組織的身分，即可確定該證據是否有效。

## 去中心化身分中的證明類型 {#types-of-attestations-in-decentralized-identity}

在基於以太坊的身分生態系統中，證明資訊的儲存和檢索方式與傳統身分管理不同。以下是去中心化身分系統中發行、儲存和驗證證明的各種方法的概述：

### 鏈下證明 {#offchain-attestations}

將證明儲存在鏈上的一個擔憂是，它們可能包含個人希望保密的資訊。以太坊區塊鏈的公開性質使得儲存此類證明變得缺乏吸引力。

解決方案是發行證明，由使用者在鏈下的數位錢包中持有，但使用儲存在鏈上的發行者 DID 進行簽署。這些證明被編碼為 [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token)，並包含發行者的數位簽署——這使得鏈下聲明的驗證變得容易。

以下是一個假設場景，用於解釋鏈下證明：

1. 一所大學（發行者）產生一份證明（數位學歷證書），用其金鑰進行簽署，並將其發行給 Bob（身分擁有者）。

2. Bob 申請工作並希望向雇主證明他的學歷，因此他從行動錢包中分享了該證明。然後，公司（驗證者）可以透過檢查發行者的 DID（即其在以太坊上的公鑰）來確認證明的有效性。

### 具有持久存取權限的鏈下證明 {#offchain-attestations-with-persistent-access}

在這種安排下，證明被轉換為 JSON 檔案並儲存在鏈下（理想情況下是在[去中心化雲端儲存](/developers/docs/storage/)平台上，例如 IPFS 或 Swarm）。然而，JSON 檔案的[哈希](/glossary/#hash)儲存在鏈上，並透過鏈上註冊表連結到 DID。關聯的 DID 可以是證明的發行者或接收者的 DID。

這種方法使證明能夠獲得基於區塊鏈的持久性，同時保持聲明資訊加密和可驗證。它還允許選擇性揭露，因為私鑰的持有者可以解密該資訊。

### 鏈上證明 {#onchain-attestations}

鏈上證明保存在以太坊區塊鏈上的[智能合約](/glossary/#smart-contract)中。智能合約（作為註冊表）會將證明對應到相應的鏈上去中心化識別碼（公鑰）。

以下是一個範例，展示鏈上證明在實務中可能如何運作：

1. 一家公司 (XYZ Corp) 計劃使用智能合約出售所有權股份，但只希望已完成背景調查的買家參與。

2. XYZ Corp 可以讓執行背景調查的公司在以太坊上發行鏈上證明。該證明證明個人已通過背景調查，而不會暴露任何個人資訊。

3. 出售股份的智能合約可以檢查註冊表合約中經過篩選的買家身分，使智能合約能夠確定誰被允許購買股份。

### 靈魂綁定代幣與身分 {#soulbound}

[靈魂綁定代幣 (Soulbound tokens)](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)（[不可轉讓的非同質化代幣](/glossary/#nft)）可用於收集特定錢包獨有的資訊。這有效地建立了一個綁定到特定以太坊地址的獨特鏈上身分，其中可能包含代表成就（例如，完成某個特定的線上課程或在遊戲中達到門檻分數）或社群參與的代幣。

## 使用去中心化身分 {#use-decentralized-identity}

有許多雄心勃勃的專案使用以太坊作為去中心化身分解決方案的基礎：

- **[以太坊域名服務 (ENS)](https://ens.domains/)** - *一個去中心化的命名系統，用於鏈上、機器可讀的識別碼，例如以太坊錢包地址、內容哈希和元資料。*
- **[使用以太坊登入 (SIWE)](https://siwe.xyz/)** - *使用以太坊帳戶進行身分驗證的開放標準。*
- **[SpruceID](https://www.spruceid.com/)** - *一個去中心化身分專案，允許使用者使用以太坊帳戶和 ENS 個人資料來控制數位身分，而不是依賴第三方服務。*
- **[以太坊證明服務 (EAS)](https://attest.org/)** - *一個去中心化帳本/協議，用於對任何事物進行鏈上或鏈下證明。*
- **[Proof of Humanity](https://www.proofofhumanity.id)** - *Proof of Humanity（或 PoH）是建立在以太坊上的社交身分驗證系統。*
- **[Veramo](https://veramo.io/)** - *一個 JavaScript 框架，使任何人都能輕鬆地在其應用程式中使用密碼學可驗證的資料。*

## 進一步閱讀 {#further-reading}

### 文章 {#articles}

- [區塊鏈使用案例：數位身分中的區塊鏈](https://consensys.net/blockchain-use-cases/digital-identity/) — *ConsenSys*
- [什麼是以太坊 ERC725？區塊鏈上的自主身分管理](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — *Sam Town*
- [區塊鏈如何解決數位身分問題](https://time.com/6142810/proof-of-humanity/) — *Andrew R. Chow*
- [什麼是去中心化身分？為什麼你應該關心？](https://web3.hashnode.com/what-is-decentralized-identity) — *Emmanuel Awosika*
- [去中心化身分簡介](https://walt.id/white-paper/digital-identity) — *Dominik Beron*

### 影片 {#videos}

- [去中心化身分（額外直播環節）](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — *Andreas Antonopolous 關於去中心化身分的精彩解說影片*
- [使用以太坊登入以及使用 Ceramic、IDX、React 和 3ID Connect 的去中心化身分](https://www.youtube.com/watch?v=t9gWZYJxk7c) — *Nader Dabit 的 YouTube 教學，介紹如何建立一個身分管理系統，以使用使用者的以太坊錢包建立、讀取和更新其個人資料*
- [BrightID - 以太坊上的去中心化身分](https://www.youtube.com/watch?v=D3DbMFYGRoM) — *Bankless podcast 節目，討論以太坊的去中心化身分解決方案 BrightID*
- [鏈下網際網路：去中心化身分與可驗證憑證](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen 在 EthDenver 2022 的演講
- [可驗證憑證解說](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann 帶有示範的 YouTube 解說影片

### 社群 {#communities}

- [GitHub 上的 ERC-725 聯盟](https://github.com/erc725alliance) — *在以太坊區塊鏈上管理身分的 ERC725 標準支持者*
- [EthID Discord 伺服器](https://discord.com/invite/ZUyG3mSXFD) — *致力於使用以太坊登入和以太坊追蹤協議 (Ethereum Follow Protocol) 的愛好者和開發者社群*
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — *一個致力於為應用程式建立可驗證資料框架的開發者社群*
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — *一個致力於各行各業去中心化身分使用案例的開發者和建設者社群*