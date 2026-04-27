---
title: "以太坊上的後量子密碼學"
description: "以太坊如何為後量子時代做準備、哪些部分容易受到攻擊，以及正在建立哪些保護措施。"
lang: zh-tw
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - 量子電腦最終將威脅以太坊目前使用的密碼學
  - 以太坊基金會擁有專門的後量子研究團隊，並制定了結構化的「精簡以太坊 (Lean Ethereum)」路線圖，目標在 2029 年實現全面的後量子保護
  - 您的資金目前是安全的，錢包軟體將引導您完成未來的遷移
---

量子電腦最終將能夠破解保護以太坊及當今大多數其他數位系統的密碼學方法。本頁面將解釋這意味著什麼、網路如何主動開發改進措施以減輕此風險，以及您需要了解的內容。

## 為什麼後量子密碼學很重要 {#why-post-quantum-matters}

以太坊依賴多種形式的[密碼學](/glossary/#cryptography)來保持網路安全並保護使用者資金。最重要的包括：

- **橢圓曲線數位簽章演算法 (ECDSA)**：用於簽署交易的密碼學。您的以太坊帳戶安全取決於此。
- **BLS 簽章**：由[驗證者](/glossary/#validator)用於對網路狀態達成[共識](/glossary/#consensus)。
- **KZG 多項式承諾**：用於以太坊擴容路線圖中的[資料可用性](/glossary/#data-availability)。
- **零知識證明 (ZK-proof) 系統**：由匯總 (rollups) 和其他應用程式用於驗證鏈下計算。

所有這些都依賴於數學結構（例如阿貝爾群），這些結構對傳統電腦來說很難破解，但量子電腦可以使用[秀爾演算法 (Shor's algorithm)](https://en.wikipedia.org/wiki/Shor%27s_algorithm)高效地解決。

### 量子電腦何時會威脅以太坊？ {#when-will-quantum-computers-threaten-ethereum}

2026 年 3 月，Google Quantum AI 發布的研究估計，破解 256 位元橢圓曲線密碼學（以太坊用於帳戶簽章的類型）大約需要 1,200 個邏輯量子位元。之前的估計數字要高得多。Google 已將 2029 年設定為將其自身系統遷移至後量子密碼學的內部期限。

目前的量子硬體遠未達到這種規模，僅能以數千個含雜訊的物理量子位元運行。邏輯量子位元（用於糾正錯誤並執行可靠計算）每個都需要許多物理量子位元。**目前的硬體與破解以太坊密碼學所需的硬體之間仍存在巨大差距，但縮小的速度比許多人預期的要快。**值得注意的是，美國國家標準暨技術研究院 (NIST) 預計在 2030 年棄用 ECDSA，並在 2035 年禁用它。

這不是迫在眉睫的威脅。但密碼學的過渡需要數年時間，而以太坊的安全模型旨在持續數個世紀。以太坊的應對措施是**精簡以太坊 (Lean Ethereum)** 路線圖，這是一項經過深思熟慮的多年任務，旨在圍繞能夠抵禦任何密碼學威脅的原語來重建以太坊。

## 容易受到量子攻擊的四個領域 {#four-vulnerable-areas}

2026 年 2 月，Vitalik Buterin [發布了一份路線圖](https://x.com/VitalikButerin/status/2027075026378543132)，指出了以太坊密碼學中需要進行後量子升級的四個不同領域。每個領域都有不同的挑戰和不同的解決路徑。

### 1. 共識層 BLS 簽章 {#consensus-bls}

**它的作用**：以太坊的[權益證明 (PoS)](/glossary/#pos)協定使用 BLS 簽章來聚合來自數十萬個驗證者的投票。BLS 允許將許多簽章組合成一個，從而保持網路的高效。

**為什麼它很脆弱**：BLS 簽章依賴於橢圓曲線配對，而量子電腦可以破解它。

**解決方法**：精簡共識 (Lean Consensus) 路線圖包括開發兩個互補的工具：
- **leanXMSS**：以太坊將用 leanXMSS（一種為驗證者設計的基於雜湊的簽章方案）取代 BLS 簽章。基於雜湊的簽章被認為是量子安全的，因為它們僅依賴於雜湊函數的安全性，量子電腦會削弱但不會破解雜湊函數。
- **leanVM**：一個用於基於 SNARK 的簽章聚合的極簡 zkVM（零知識虛擬機）。因為基於雜湊的簽章要大得多（大約 3,000 位元組，而 BLS 為 96 位元組），切換到 leanXMSS 將在每個時槽產生多得多的資料。為了解決這個問題，leanVM 充當聚合引擎，將資料壓縮 250 倍。這保留了將許多簽章組合成一個的效率優勢，即使在切換到量子安全方案之後也是如此。

<ExpandableCard title="為什麼以太坊不能直接用量子安全方案取代 BLS？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

使 BLS 高效的聚合特性（將數十萬個簽章組合成一個）並沒有明顯的量子安全等效方案。後量子簽章也比 BLS 簽章大得多。簡單地將一個替換為另一個會使以太坊的共識層變得明顯更慢且更昂貴。這就是為什麼團隊正在構建 leanVM，這是一個使用零知識證明來高效聚合量子安全簽章的工具。

</ExpandableCard>

### 2. 資料可用性：KZG 承諾 {#data-availability-kzg}

**它的作用**：KZG 多項式承諾確保資料（特別是來自匯總的[資料塊](/glossary/#blob)資料）在網路上可用，而不需要每個節點下載所有資料。

**為什麼它很脆弱**：KZG 承諾依賴於橢圓曲線配對，這正是量子電腦可以攻擊的數學結構。

**目前的緩解措施**：KZG 承諾使用「可信設置」，其中許多參與者貢獻了隨機性。只要至少有一位參與者是誠實的並丟棄了他們的秘密，該設置就是安全的，即使面對試圖在事後對其進行逆向工程的量子電腦也是如此。

**長期解決方案**：用量子安全的承諾方案取代 KZG。兩個主要的候選方案是：
- **基於 STARK 的承諾**：依賴於雜湊函數而不是橢圓曲線。已在一些 ZK 匯總 (ZK-rollups) 中使用。
- **基於晶格的承諾**：依賴於晶格問題的難度，這被認為是抗量子的。

這兩種方法仍在針對以太坊規模的效率和實用性進行研究。

### 3. 帳戶簽章：ECDSA {#eoa-signatures}

**它的作用**：每個標準的以太坊帳戶（外部擁有帳戶，或 [EOA](/glossary/#eoa)）都使用 secp256k1 曲線上的 ECDSA 來簽署交易。這就是保護您資金的機制。

**為什麼它很脆弱**：對於任何發送過交易的帳戶，其公鑰都會暴露在鏈上。量子電腦可以從這些暴露的公鑰資料中推導出私鑰。

**重要的細微差別**：只接收過以太幣而從未發送過交易的帳戶尚未暴露其公鑰。只有地址（公鑰的雜湊）是可見的，這提供了一些額外的保護。

**解決方法**：以太坊不打算進行單一的、全協定範圍的遷移，而是計劃使用[帳戶抽象化](/roadmap/account-abstraction/)（特別是 EIP-8141，正在考慮在 2026 年下半年的 Hegotá 升級中引入），為使用者提供**簽章敏捷性**。個別帳戶可以切換到後量子簽章方案，而無需等待整個協定發生改變。

這是一種務實的方法。希望儘早獲得後量子保護的使用者和錢包可以自願採用它，而更廣泛的遷移則會隨著時間的推移而發生。

### 4. 應用層零知識證明 (ZK-proofs) {#zk-proofs}

**它的作用**：零知識證明系統被第二層 (L2) 匯總和其他應用程式用於驗證計算，而無需揭露底層資料。

**為什麼它很脆弱**：許多流行的零知識證明系統（使用橢圓曲線配對的 SNARK）依賴於易受量子攻擊的假設。

**解決方法**：依賴於雜湊函數而不是橢圓曲線的 STARK 已經具備抗量子性，並被多個匯總所使用。生態系統對基於 STARK 系統的自然採用，已經在應用層提供了後量子安全。

## NIST 標準 {#nist-standards}

2024 年 8 月，美國國家標準暨技術研究院 (NIST) [已定案了三項後量子密碼學標準](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)。這些標準很重要，因為它們為包括以太坊在內的整個科技產業提供了一套共享的、經過審查的演算法基礎，而不是讓每個專案都發明自己的演算法。

| 標準 | 名稱 | 類型 | 使用案例 |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | 基於晶格 | 金鑰封裝（金鑰交換） |
| FIPS 204 | ML-DSA (Dilithium) | 基於晶格 | 數位簽章 |
| FIPS 205 | SLH-DSA (SPHINCS+) | 基於雜湊 | 數位簽章 |

這些標準為更廣泛產業的後量子過渡提供了基礎。以太坊的工作建立在這些標準之上並對其進行了擴展，特別關注去中心化網路中效率和聚合至關重要的獨特挑戰。

## 以太坊基金會的方法 {#ef-approach}

以太坊基金會於 2026 年 1 月成立了專門的後量子安全團隊，由 Thomas Coratger 領導。該團隊的工作在 [pq.ethereum.org](https://pq.ethereum.org) 上公開追蹤。

### 目前活動（截至 2026 年 4 月） {#current-activity}

- **每週互操作性開發者網路 (devnets)**：超過 10 個客戶端團隊參與定期的後量子互操作性測試，包括萊特豪斯 (Lighthouse)、Grandine、Zeam、Ream Labs 和 PierTwo。
- **波塞冬獎 (Poseidon Prize)**：一項 100 萬美元的研究獎金，旨在改進基於雜湊的密碼學原語。
- **開源實作**：leanXMSS、leanVM、leanSpec (Python)、leanSig (Rust) 和 leanMultisig 均可在 [leanEthereum GitHub 組織](https://github.com/leanEthereum)下取得。
- **第二屆年度後量子研究靜修會 (PQ Research Retreat)**：計劃於 2026 年 10 月 9 日至 10 月 12 日在英國劍橋舉行。
- **與 NIST 保持一致**：以太坊的工作建立在 NIST 於 2024 年 8 月已定案的後量子密碼學標準（如 ML-KEM、ML-DSA 和 SLH-DSA）之上。

### 遷移里程碑 {#migration-milestones}

團隊概述了一系列協定升級，以逐步將後量子密碼學引入以太坊。這些是規劃中的里程碑，而非保證的承諾。名稱和順序可能會發生變化。

| 里程碑 | 引入內容 |
|-----------|--------------------|
| I* | 後量子 (PQ) 金鑰註冊表。驗證者可以在現有 BLS 金鑰旁邊註冊後量子公鑰。 |
| J* | 後量子簽章驗證預編譯。智慧合約和錢包可以原生驗證後量子簽章。 |
| L* | 透過 leanVM 進行後量子證明和即時共識層證明。驗證者開始使用後量子簽章達成共識。 |
| M* | 完整的後量子簽章聚合和後量子安全的資料塊承諾。 |

**目標**：結構化的分叉里程碑目標是在大約 2029 年完成核心後量子基礎設施。完整的執行層和生態系統遷移將延續到那之後。

## 使用者需要做什麼？ {#what-users-need-to-do}

**現在：什麼都不用做。** 您的資金是安全的。當今沒有任何量子電腦可以威脅以太坊的密碼學。

**未來**：一旦以太坊廣泛支援後量子簽章方案（預計在 Hegotá 硬分叉和 EIP-8141 實施之後），您將需要將您的帳戶遷移到量子安全簽章。錢包軟體將引導您完成此過渡。

如果您的帳戶從未發送過交易（這意味著您的公鑰尚未暴露在鏈上），它將擁有一層額外的保護。但所有帳戶最終都應該遷移。

如何處理休眠錢包（其擁有者可能不知道需要遷移的帳戶）是一個開放的治理話題。以太坊社群尚未對此達成共識。

## 常見問題 {#faq}

<ExpandableCard title="量子電腦現在能竊取我的 ETH 嗎？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**不。** 當今沒有任何量子電腦可以破解以太坊的密碼學。目前的量子硬體遠未達到所需的規模。本頁面描述的工作是為未來做準備，而不是對活躍威脅的反應。

</ExpandableCard>

<ExpandableCard title="量子電腦何時會成為威脅？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

估計各不相同。Google 2026 年 3 月的研究表明，破解 256 位元橢圓曲線密碼學所需的硬體最早可能在本世紀末左右出現，但仍存在重大的工程挑戰。大多數研究人員認為，現實的威脅至少還有幾年的時間。誠實的答案是沒有人知道確切的時間表，這正是為什麼現在做準備很重要的原因。

</ExpandableCard>

<ExpandableCard title="我需要做些什麼來保護我的錢包嗎？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

最終是的。一旦以太坊上提供了後量子簽章方案，使用者將需要遷移他們的帳戶。錢包軟體可能會為您處理此過渡。目前，您不需要做任何事情。當需要採取行動時，以太坊社群和錢包開發者將提供明確的指導和工具。

</ExpandableCard>

<ExpandableCard title="那我的代幣、NFT 和 DeFi 部位呢？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

以太坊上的資產由帳戶簽章控制。一旦您的帳戶遷移到量子安全簽章方案，該帳戶中的所有內容都會受到保護。您不需要單獨遷移每項資產。持有資金的智慧合約（如去中心化金融 (DeFi) 協定）可能需要根據其內部使用的密碼學原語進行自身的升級。

</ExpandableCard>

<ExpandableCard title="在這方面，以太坊落後於其他區塊鏈嗎？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

不是。以太坊擁有所有區塊鏈中最結構化的後量子計劃之一：專門的團隊、受資助的研究、每週的開發者網路以及已發布的遷移路線圖，將量子計算視為一等設計約束。目前還沒有任何區塊鏈完成全面的後量子過渡。根據以太坊基金會的估計，以太坊易受量子攻擊的休眠資金風險約為 0.1%，遠低於其他主要區塊鏈網路。

</ExpandableCard>

<ExpandableCard title="什麼是「現在收集，日後解密」？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

「現在收集，以後解密 (Harvest now, decrypt later)」是一種攻擊方式，即有人現在記錄加密資料或暴露的公鑰，然後在未來存在足夠強大的量子電腦時破解加密。對於以太坊來說，這與公鑰已經暴露在鏈上的帳戶（任何發送過交易的帳戶）最為相關。這也是為什麼社群將後量子遷移視為具有時間敏感性的原因之一，即使量子威脅尚未迫在眉睫。

</ExpandableCard>

## 進一步閱讀 {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _以太坊基金會_
- [後量子密碼學專案](https://pse.dev/projects/post-quantum-cryptography) - _以太坊隱私守護者 (PSE)_
- [NIST 後量子密碼學標準](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [透過負責任地揭露量子漏洞來保護加密貨幣](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [量子前沿可能比看起來更近](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG 與可信設置](/roadmap/danksharding/#what-is-kzg)
- [劍橋精簡週 (2025) leanVM + PQ 工作坊資源](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _精簡以太坊 (Lean Ethereum)_
- [後量子交易簽章 ACD 分組會議](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _以太坊基金會_
- [後量子互操作性 ACD 分組會議](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _以太坊基金會_
- [精簡以太坊與後量子安全 YouTube 播放清單](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _以太坊基金會_
- [後量子抗性小組訪談](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [以太坊上的帳戶抽象化](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _以太坊基金會架構 (EF Architecture)_
- [疊加態：量子計算產業分析](https://www.superpositioned.co/) - _Saneel Sreeni_