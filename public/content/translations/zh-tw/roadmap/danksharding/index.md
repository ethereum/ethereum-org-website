---
title: 丹克分片
description: 了解原始 Danksharding 與丹克分片：這兩個用於擴展以太坊的連續升級。
lang: zh-tw
summaryPoints:
  - 丹克分片是一個多階段升級，旨在改善以太坊的擴展性與容量。
  - 第一階段為原始 Danksharding，將資料塊新增至區塊中。
  - 資料塊為匯總提供了一種更便宜的方式，將資料發布到以太坊，而這些成本可以透過較低的交易費用轉嫁給使用者。
  - 隨後，完整的丹克分片會將驗證資料塊的責任分散到節點子集，進一步將以太坊擴展至每秒超過 100,000 筆交易。
---

**丹克分片**是[以太坊](/)成為真正可擴展區塊鏈的方式，但要實現這一目標需要進行幾次協定升級。**原始 Danksharding** 是過程中的一個中間步驟。兩者的目標都是讓第二層 (L2) 上的交易對使用者來說盡可能便宜，並應將以太坊擴展至每秒超過 100,000 筆交易。

## 什麼是原始 Danksharding？ {#what-is-protodanksharding}

原始 Danksharding，也稱為 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，是[匯總](/layer-2/#rollups)將更便宜的資料新增至區塊的一種方式。這個名稱來自提出該想法的兩位研究人員：Protolambda 和 Dankrad Feist。從歷史上看，匯總在降低使用者交易成本方面一直受到限制，因為它們將交易發布在 `CALLDATA` 中。

這非常昂貴，因為它由所有以太坊節點處理並永遠存在於鏈上，即使匯總只需要這些資料很短的時間。原始 Danksharding 引入了可以發送並附加到區塊的資料塊。EVM 無法存取這些資料塊中的資料，並且會在固定時間段後自動刪除（在撰寫本文時設定為 4096 個 epoch，約 18 天）。這意味著匯總可以更便宜地發送其資料，並以更便宜的交易形式將節省的成本轉嫁給終端使用者。

<ExpandableCard title="為什麼資料塊能讓匯總變得更便宜？" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

匯總是一種透過在鏈下批次處理交易，然後將結果發布到以太坊來擴展以太坊的方式。匯總本質上由兩部分組成：資料和執行檢查。資料是匯總正在處理的完整交易序列，以產生發布到以太坊的狀態變更。執行檢查是由某個誠實的參與者（「證明者」）重新執行這些交易，以確保提議的狀態變更是正確的。為了執行執行檢查，交易資料必須可用足夠長的時間，以便任何人都可以下載和檢查。這意味著匯總定序器的任何不誠實行為都可以被證明者識別和挑戰。然而，它不需要永遠可用。

</ExpandableCard>

<ExpandableCard title="為什麼可以刪除資料塊資料？" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

匯總在鏈上發布對其交易資料的承諾，並在資料塊中提供實際資料。這意味著證明者可以檢查承諾是否有效，或挑戰他們認為錯誤的資料。在節點層級，資料塊保存在共識客戶端中。共識客戶端證明他們已經看到了資料，並且資料已經在網路中傳播。如果資料被永遠保存，這些客戶端將會膨脹，並導致運行節點的硬體要求大幅增加。相反，資料每 18 天會自動從節點中修剪。共識客戶端的證明表明，證明者有充分的機會來驗證資料。實際資料可以由匯總營運商、使用者或其他人儲存在鏈下。

</ExpandableCard>

### 如何驗證資料塊資料？ {#how-are-blobs-verified}

匯總將它們執行的交易發布在資料塊中。它們還發布對資料的「承諾」。它們透過將多項式函數擬合到資料來實現這一點。然後可以在各個點上評估此函數。例如，如果我們定義一個極其簡單的函數 `f(x) = 2x-1`，那麼我們可以針對 `x = 1`、`x = 2`、`x = 3` 評估此函數，得出結果 `1, 3, 5`。證明者將相同的函數應用於資料，並在相同的點上對其進行評估。如果原始資料被更改，函數將不相同，因此在每個點評估的值也不相同。實際上，承諾和證明更為複雜，因為它們被包裝在密碼學函數中。

### 什麼是 KZG？ {#what-is-kzg}

KZG 代表 Kate-Zaverucha-Goldberg，這是將資料塊縮減為小型[密碼學「承諾」](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)方案的三位[原作者](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11)的名字。必須驗證匯總提交的資料塊，以確保匯總沒有不當行為。這涉及證明者重新執行資料塊中的交易，以檢查承諾是否有效。這在概念上與執行客戶端使用默克爾證明 (Merkle proofs) 檢查第一層 (L1) 上以太坊交易有效性的方式相同。KZG 是一種將多項式方程式擬合到資料的替代證明。承諾在一些秘密資料點上評估多項式。證明者將在資料上擬合相同的多項式，並在相同的值上對其進行評估，檢查結果是否相同。這是一種驗證資料的方式，與某些匯總以及最終以太坊協定其他部分所使用的零知識技術相容。

### 什麼是 KZG 儀式？ {#what-is-a-kzg-ceremony}

KZG 儀式是以太坊社群中許多人共同產生一串可用於驗證某些資料的秘密隨機數字字串的一種方式。這串數字不為人知且無法被任何人重新建立，這一點非常重要。為了確保這一點，參與儀式的每個人都會收到來自前一位參與者的字串。然後，他們會建立一些新的隨機值（例如，透過允許他們的瀏覽器測量滑鼠的移動），並將其與前一個值混合。然後，他們將該值發送給下一位參與者，並從其本機機器中將其銷毀。只要儀式中有一人誠實地執行此操作，攻擊者就無法知道最終值。

EIP-4844 KZG 儀式向公眾開放，數以萬計的人參與其中以添加他們自己的熵（隨機性）。總共有超過 140,000 次貢獻，使其成為世界上同類儀式中規模最大的。要破壞該儀式，100% 的參與者必須主動不誠實。從參與者的角度來看，如果他們知道自己是誠實的，就不需要信任任何人，因為他們知道自己保護了儀式（他們各自滿足了 N 分之 1 誠實參與者的要求）。

<ExpandableCard title="KZG 儀式產生的隨機數有什麼用途？" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

當匯總在資料塊中發布資料時，它們會提供一個在鏈上發布的「承諾」。此承諾是在特定點上評估擬合資料的多項式的結果。這些點由 KZG 儀式中產生的隨機數定義。然後，證明者可以在相同的點上評估多項式以驗證資料——如果他們得出相同的值，則資料是正確的。

</ExpandableCard>

<ExpandableCard title="為什麼 KZG 隨機資料必須保密？" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

如果有人知道用於承諾的隨機位置，他們很容易產生一個在這些特定點上擬合的新多項式（即「碰撞」）。這意味著他們可以從資料塊中新增或移除資料，並且仍然提供有效的證明。為了防止這種情況，證明者不會獲得實際的秘密位置，而是收到使用橢圓曲線包裹在密碼學「黑盒子」中的位置。這些有效地打亂了值，使得原始值無法被逆向工程，但透過一些巧妙的代數，證明者和驗證者仍然可以在它們代表的點上評估多項式。

</ExpandableCard>

<Alert variant="warning">
  丹克分片和原始 Danksharding 都不遵循旨在將區塊鏈分成多個部分的傳統「分片」模型。分片鏈不再是路線圖的一部分。相反，丹克分片使用跨資料塊的分散式資料採樣來擴展以太坊。這在實作上要簡單得多。這種模型有時被稱為「資料分片」。
</Alert>

## 什麼是丹克分片？ {#what-is-danksharding}

丹克分片是從原始 Danksharding 開始的匯總擴展的完全實現。丹克分片將為以太坊帶來大量空間，供匯總傾倒其壓縮的交易資料。這意味著以太坊將能夠輕鬆支援數百個獨立的匯總，並使每秒數百萬筆交易成為現實。

其運作方式是將附加到區塊的資料塊從原始 Danksharding 中的六 (6) 個擴展到完整丹克分片中的 64 個。其餘所需的變更都是對共識客戶端運作方式的更新，以使其能夠處理新的大型資料塊。其中一些變更已經在路線圖上，用於獨立於丹克分片的其他目的。例如，丹克分片要求已實作提案者與建構者分離 (PBS)。這是一項將建構區塊和提案區塊的任務分離到不同驗證者的升級。同樣，丹克分片需要資料可用性採樣 (DAS)，但開發不儲存太多歷史資料的非常輕量級客戶端（「無狀態客戶端」）也需要它。

<ExpandableCard title="為什麼丹克分片要求提案者與建構者分離？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

需要提案者與建構者分離 (PBS)，以防止個別驗證者必須為 32MB 的資料塊資料產生昂貴的承諾和證明。這會給家庭質押者帶來太大的壓力，並要求他們投資更強大的硬體，這會損害去中心化。相反，專門的區塊建構者負責這項昂貴的運算工作。然後，他們將其區塊提供給區塊提案者進行廣播。區塊提案者只需選擇最有利可圖的區塊。任何人都可以廉價且快速地驗證資料塊，這意味著任何普通驗證者都可以檢查區塊建構者是否表現誠實。這允許在不犧牲去中心化的情況下處理大型資料塊。行為不當的區塊建構者可以簡單地從網路中被驅逐並被罰沒——其他人將取代他們的位置，因為區塊建構是一項有利可圖的活動。

</ExpandableCard>

<ExpandableCard title="為什麼丹克分片要求資料可用性取樣？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

驗證者需要資料可用性採樣 (DAS) 才能快速有效地驗證資料塊資料。使用資料可用性採樣，驗證者可以非常確定資料塊資料是可用的並且已正確承諾。每個驗證者可以隨機採樣幾個資料點並建立證明，這意味著沒有驗證者必須檢查整個資料塊。如果缺少任何資料，將會被快速識別並拒絕該資料塊。

</ExpandableCard>

### 目前進度 {#current-progress}

完整的丹克分片還需要幾年的時間。同時，KZG 儀式已經結束，有超過 140,000 次貢獻，而原始 Danksharding 的 [EIP](https://eips.ethereum.org/EIPS/eip-4844) 已經成熟。該提案已在所有測試網中完全實作，並於 2024 年 3 月隨著 Cancun-Deneb（「Dencun」）網路升級在主網上線。

### 進一步閱讀 {#further-reading}

- [原始 Danksharding 筆記](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad 關於丹克分片的筆記](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad、Proto 和 Vitalik 討論丹克分片](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG 儀式](https://ceremony.ethereum.org/)
- [Carl Beekhuizen 在 Devcon 上關於可信設定的演講](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [更多關於資料塊的資料可用性採樣](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist 談 KZG 承諾與證明](https://youtu.be/8L2C6RDMV9Q)
- [KZG 多項式承諾](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)