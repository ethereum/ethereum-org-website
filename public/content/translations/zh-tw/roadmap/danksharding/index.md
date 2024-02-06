---
title: Danksharding
description: 瞭解 Proto-Danksharding 和 Danksharding - 兩種依序完成以太坊擴容的升級方案。
lang: zh-tw
summaryPoints:
  - Danksharding 是一項多階段升級，旨在提升以太坊的可擴容性和容量。
  - 在第一階段 Proto-Danksharding，將資料 blob 新增到區塊中
  - 資料 blob 為卷軸提供了一種更便宜的方式來將資料發佈到以太坊，這些成本可以作為較低的交易費用轉嫁給使用者。
  - 隨後，完整的 Danksharding 將在部分節點之間分散驗證資料 blob 的責任，進一步將以太坊擴容至每秒超過 100,000 筆交易。
---

# Danksharding {#danksharding}

**Danksharding** 可讓以太坊成為真正可擴容的區塊鏈，但需要進行一些協定升級才能實現這一目標。 **Proto-Danksharding** 是該過程中的一個中間步驟。 兩者的目標都是讓二層網路上的交易對使用者來說盡可能便宜，並且應該將以太坊擴容到每秒 >100,000 筆交易。

## Proto-Danksharding 是什麼？ {#what-is-protodanksharding}

Proto-Danksharding 又稱 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，是使[卷軸](/layer2/#rollups)新增資料到區塊更便宜的方法。 這個名稱來自提出這個想法的兩位研究人員：Protolambda 和 Dankrad Feist。 目前，由於卷軸在 `CALLDATA` 中發佈交易，因此卷軸的使用者交易成本受到限制。 這個成本很高，因其由所有以太坊節點處理並永遠存在於鏈上，即使卷軸只需要短暫使用這些資料。 Proto-Danksharding 引入了可傳送並附加到區塊的資料 blob（註：二進位大型物件）。 這些 blob 中的資料無法被以太坊虛擬機存取，並且會在一段固定時間（1 到 3 個月）後自動刪除。 這表示卷軸可以更便宜地傳送資料，並以更便宜的交易形式將節省的費用轉給最終使用者。

<ExpandableCard title="為什麼 blob 能夠降低卷軸成本？" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

卷軸是指批次鏈下處理交易，然後將結果發佈到以太坊以實現以太坊擴容。 卷軸有兩個必要元件：資料與執行檢查。 資料指卷軸處理的完整交易序列，用於產生發佈到以太坊的狀態改變。 執行檢查指讓某些誠實的參與者（「證明者」）重新執行這些交易，以確保提出的狀態改變正確無誤。 要完成執行檢查，交易資料必須存在夠長時間，以便任何人都可以下載並檢查。 這意味著證明者可以識別並質疑卷軸排序者的任何不誠實行為。 然而，它並不需要永久可用。

</ExpandableCard>

<ExpandableCard title="為什麼可以刪除 blob 資料？" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

卷軸在鏈上發佈對其交易資料的承諾，並在資料 blob 中提供實際資料。 這表示證明者可以確認承諾是否有效，或質疑其認為錯誤的資料。 在節點層面，資料的 blob 儲存在共識用戶端中。 共識用戶端證明自己已經看過資料，且資料已在網路上傳播。 如果永久儲存資料，這些用戶端會膨脹並導致對運行節點的硬體要求過高。 反之，資料每 1 到 3 個月會從節點中自動刪除。 共識用戶端證明顯示證明者有足夠的機會驗證資料。 實際資料可由卷軸操作者、使用者或其他人儲存在鏈下。

</ExpandableCard>

### 如何驗證 blob 資料？ {#how-are-blobs-verified}

卷軸會將它們執行的交易發佈在資料 blob 中。 它們還會發佈一則對資料的「承諾」。 它們透過將多項式函式擬合到資料來做到這一點。 之後可在任意點計算此函式。 舉例來說，若我們定義一個非常簡單的函式 `f(x) = 2x-1`，可以計算出 `x = 1`、`x = 2`、`x = 3` 時對應的結果分別為 `1, 3, 5`。 證明者會將相同的函式套用到資料上，並在相同的點進行計算。 如果原始資料改變，函式將不相同，因此每個點的計算結果值也會不同。 事實上，承諾和證明會更複雜，因為它們被套用在加密函式中。

### KZG 是什麼？ {#what-is-kzg}

KZG 代表 Kate-Zaverucha-Goldberg，這是三位將資料 blob 縮小至[加密「承諾」](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)的[原始創作者名字的縮寫](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11)。 必須驗證卷軸提交的資料 blob，以確保卷軸不會出錯。 這涉及證明者重新執行 blob 中的交易以檢查承諾是否有效。 這與執行用戶端使用 Merkle 證明檢查一層網路上的以太坊交易是否有效，概念上相同。 KZG 是將多項式方程與資料擬合的另一種證明。 承諾會在一些保密資料點計算多項式。 證明者將對資料擬合相同的多項式，並以相同數值進行計算，以確認結果是否相同。 這是一種驗證資料的方法，與某些卷軸以及最終由以太坊協定的其他部分使用的零知識技術相容。

### KZG 儀式是什麼？ {#what-is-a-kzg-ceremony}

KZG 儀式是以太坊社群中許多人共同產生秘密隨機數字字串的一種方式，可用於驗證某些資料。 這非常重要，此字串或數字是未知的，且任何人都無法重新建立。 為了確保這點，每個儀式參與者都會收到前一位參與者傳來的字串。 接著他們將建立一些新的隨機值（例如允許瀏覽器測量滑鼠的移動），並將其與先前收到的字串混合。 然後他們會把新的值傳給下一位參與者，接著從本地機器中銷毀這個值。 只要其中一個儀式參與者是誠實的，那麼最終的值對攻擊者來說就是未知。 EIP-4844 KZG 儀式向公眾開放，數萬人參加新增自己的熵（指一種隨機值）。 參與者 100% 不誠實的行動，才可能破壞這個儀式。 站在參與者的視角，如果他們知道自己是誠實的，則不需要信任任何人，因為他們知道自己可確保儀式安全（他們自己已滿足 n 分之一誠實參與者的要求）。

<ExpandableCard title="KZG 儀式的隨機數字有什麼用？" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

當卷軸在 blob 中發佈資料時，會提供在鏈上發佈的「承諾」。 這項承諾是在某些點對資料進行多項式擬合計算的結果。 這些點由 KZG 儀式中產生的隨機數字定義。 然後，證明者可以在相同點計算多項式以驗證資料；如果得出的值相同，則資料是正確的。

</ExpandableCard>

<ExpandableCard title="為什麼 KZG 隨機資料必須保密？" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

如果有人知道用於承諾的隨機位置，他們就很容易產生能在這些特定點擬合的新多項式（即「碰撞」）。 這表示他們可以從 blob 新增或移除資料，並且仍然提供有效的證明。 為了避免這種事，他們實際上不是向證明者提供實際的秘密位置，而是使用橢圓曲線接收包裹在加密「黑盒子」中的位置。 這些方法有效地擾亂了這些值，使原始值無法被逆向工程，但透過一些聰明的代數證明者和驗證者，仍然可以在其代表的點上計算多項式。

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Danksharding 和 Proto-Danksharding 都不遵循傳統的「分片」模型，旨在將區塊鏈分成多個部分。 分片鏈不再是以太坊開發藍圖的一部分。 相反，Danksharding 使用跨 blob 的分散式資料採樣來實現以太坊擴容。 這在實作上容易很多。 此模型有時又稱「資料分片」。
</InfoBanner>

## Danksharding 是什麼？ {#what-is-danksharding}

Danksharding 完全實現了從 Proto-Danksharding 開始的卷軸擴容。 Danksharding 將在以太坊上為卷軸提供大量空間，用於轉存壓縮的交易資料。 這表示以太坊可以輕鬆支援數百個獨立的卷軸，並實現每秒數百萬筆交易。

其工作原理是將附加到區塊的 blob 從 Proto-Danksharding 中的 1 個擴展到完整 Danksharding 中的 64 個。 所需的其餘變更都是對共識用戶端操作方式的更新，使得它們能夠處理新的大 blob。 這些變更有部分已在開發藍圖上，用於獨立於 Danksharding 的其他目的。 舉例來說，Danksharding 要求先實作提交者-建置者分離。 這是一個升級，它將跨不同驗證者建置區塊和提交區塊的任務分開。 同樣，Danksharding 需要資料可用性採樣，但開發不儲存太多歷史資料的輕量級用戶端（「無狀態用戶端」）也需要資料可用性採樣。

<ExpandableCard title="為什麼 Danksharding 需要提交者-建置者分離？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

提交者-建置者分離是為了防止單一驗證者必須為 32MB 的 blob 資料產生昂貴的承諾和證明。 這對個人質押者很傷，因為他們需要花費更多資金購買更強大的硬體，將降低去中心化程度。 相反，專門的區塊建置者會負責這項昂貴的計算工作。 之後，區塊提交者即可廣播他們的區塊。 區塊提交者會直接選擇收益最大的區塊。 所有人都能經濟快速地驗證 blob，表示所有一般驗證者皆可檢查區塊建置者的行為是否誠實。 這允許在不犧牲去中心化的情況下處理大型 blob。 錯誤行事的區塊建置者可能被強制退出網路並罰沒，其他人會補上他的位置，因為區塊建置是高收益的活動。

</ExpandableCard>

<ExpandableCard title="為什麼 Danksharding 需要資料可用性採樣？" eventCateogry="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

驗證者需要進行資料可用性採樣才能快速有效地驗證 blob 資料。 透過資料可用性採樣，驗證者可以非常確定 blob 資料可用且正確提交。 每個驗證者都可以隨機採樣幾個資料點並建立證明，這意味著驗證者無需檢查整個 blob。 任何資料缺漏的情況都可被快速發現且 blob 會遭拒。

</ExpandableCard>

### 目前進度 {#current-progress}

完整的 Danksharding 還需要幾年的時間。 不過，Proto-Danksharding 應該很快就會實作。 截至本文撰寫時止（2023 年 2 月），KZG 儀式仍然保持開放並且已吸引 50,000 多位貢獻者。 Proto-Danksharding 的 [EIP](https://eips.ethereum.org/EIPS/eip-4844) 已經成熟，規範已達成一致，客戶已經實作原型，目前正在測試並準備投入生產。 下一步是在公共測試網上實作這些變更。 可以透過 [EIP 4844 準備狀態檢查清單](https://github.com/ethereum/pm/blob/master/Breakout-Room/4844-readiness-checklist.md#client-implementation-status)取得最新資訊。

### 了解更多 {#further-reading}

- [Proto-Danksharding 筆記](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad 的 Danksharding 筆記](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad、Proto 和 Vitalik 討論 Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG 儀式](https://ceremony.ethereum.org/)
- [Carl Beekhuizen 在 Devcon 的可信任設定演講](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [關於 blob 資料可用性採樣的更多資訊](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist 的 KZG 承諾和證明演講](https://youtu.be/8L2C6RDMV9Q)
- [KZG 多項式承諾](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
