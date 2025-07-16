---
title: Danksharding
description: 瞭解 Proto-Danksharding 和 Danksharding - 兩種依序完成以太坊擴容的升級方案。
lang: zh-tw
summaryPoints:
  - Danksharding 是一項多階段升級，旨在提升以太坊的可擴容性和容量。
  - 在第一階段 Proto-Danksharding，將資料二進位大型物件新增到區塊中
  - 資料二進位大型物件為卷軸提供了一種更便宜的方式來將資料發佈到以太坊，這些成本可以作為較低的交易費用轉嫁給使用者。
  - 隨後，完整的 Danksharding 將在部分節點之間分攤驗證資料二進制大對象的責任，進一步將以太坊擴容至每秒處理超過 100,000 筆交易。
---

# Danksharding {#danksharding}

**Danksharding** 可讓以太坊成為真正可擴容的區塊鏈，但需要進行一些協定升級才能實現這一目標。 **Proto-Danksharding** 是該過程中的一個中間步驟。 兩者的目標都是讓二層網路上的交易對使用者來說盡可能便宜，並且應該將以太坊擴容到每秒處理 >100,000 筆交易。

## 什麼是 Proto-Danksharding？ {#what-is-protodanksharding}

Proto-Danksharding 又稱 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，是一種供[卷軸](/layer-2/#rollups)新增較低成本的資料到區塊的方法。 這個名稱來自提出這個想法的兩位研究人員：Protolambda 和 Dankrad Feist。 在歷史上，透過卷軸節省使用者交易的成本受到了限制，因為它們實際上會將其交易發佈到 `CALLDATA` 中。

該成本非常高，因為資料由所有以太坊節點處理並永遠存在鏈上，即使卷軸只需要短暫使用這些資料。 Proto-Danksharding 引入了可傳送並附加到區塊的資料二進位大型物件。 這些二進位大型物件中的資料無法被以太坊虛擬機存取，並且會在一段固定時間（撰文時為 4096 個時期，或約 18 天）後自動刪除。 這表示卷軸可以更實惠地傳送資料，並以更實惠的交易形式將節省的費用轉給終端使用者。

<ExpandableCard title="為什麼二進位大型物件能夠降低卷軸成本？" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

卷軸是指在鏈下批次處理交易，然後將結果發佈到以太坊以實現以太坊擴容。 卷軸有兩個必要元件：資料與執行檢查。 資料指卷軸處理的完整交易序列，用於產生發佈到以太坊的狀態變更。 執行檢查指讓某些誠實的參與者（「證明者」）重新執行這些交易，以確保提出的狀態變更正確無誤。 要完成執行檢查，交易資料可供使用的時間必須夠長，以讓任何人都能下載並檢查。 這意味著證明者可以識別並質疑卷軸排序者的任何不誠實行為。 然而，資料並不需要永久可用。

</ExpandableCard>

<ExpandableCard title="為什麼可以刪除二進位大型物件資料？" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

卷軸在鏈上發佈對其交易資料的承諾，並在資料二進位大型物件中提供實際資料。 這表示證明者可以確認承諾是否有效，或質疑其認為錯誤的資料。 在節點層面，資料的二進位大型物件儲存在共識用戶端中。 共識用戶端證明自己已經看過資料，且資料已在網路上傳播。 如果永久儲存資料，這些用戶端會膨脹並導致對運行節點的硬體要求過高。 反之，資料每 18 天會從節點中自動刪除。 共識用戶端的證明顯示證明者有足夠的機會驗證資料。 實際資料可由卷軸運營商、使用者或其他人儲存在鏈下。

</ExpandableCard>

### 如何驗證二進位大型物件資料？ {#how-are-blobs-verified}

卷軸會將它們執行的交易發佈在資料二進位大型物件中。 它們還會發佈一則對資料的「承諾」。 它們透過將多項式函式與資料擬合來做到這一點。 之後可在任意點計算此函式。 舉例來說，若我們定義一個非常簡單的函式 `f(x) = 2x-1`，則可以計算出 `x = 1`、`x = 2`、`x = 3` 時對應的結果分別為 `1、3、5`。 證明者會將相同的函式套用到資料上，並在相同的點進行計算。 如果原始資料改變，函式將不相同，因此每個點的計算結果值也會不同。 事實上，承諾和證明會更複雜，因為它們被包裝到加密函式中。

### 什麼是 KZG？ {#what-is-kzg}

KZG 代表 Kate-Zaverucha-Goldberg，這是一種方案的三位[原作者](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11)名字縮寫，該方案將二進位大型物件資料縮小至不大的[加密「承諾」](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)。 卷軸提交的資料二進位大型物件必須經過驗證，以確保卷軸不會出錯。 這涉及證明者重新執行二進位大型物件中的交易，以檢查承諾是否有效。 這與執行客戶端使用梅克爾證明來檢查一層網路上的以太坊交易是否有效，在概念上是相同的。 KZG 是將多項式方程與資料擬合的另一種證明。 承諾會在一些保密資料點計算多項式。 證明者將對資料擬合相同的多項式，並以相同數值進行計算，以確認結果是否相同。 這是一種驗證資料的方法，與某些卷軸所用的以及最終由以太坊協定的其他部分使用的零知識技術相容。

### 什麼是 KZG 儀式？ {#what-is-a-kzg-ceremony}

KZG 儀式提供了一種方法，讓以太坊社群中的許多人一起產生可用於驗證某些資料的秘密隨機數字字串。 此數字字串是未知的，且任何人都無法重新建立，這一點很重要。 為了確保這點，每位儀式參與者都會收到前一位參與者傳來的字串。 接著他們會建立一些新的隨機值（例如，透過允許瀏覽器測量滑鼠的移動），並將其與先前收到的值進行混合。 然後他們會把新值傳給下一位參與者，並從本地機器中銷毀這個值。 只要其中一個儀式參與者是誠實的，那麼攻擊者就無法知道最終的值。

EIP-4844 KZG 儀式已向公眾開放，有數萬人參與並新增自己的隨機變量不確定性（隨機性）。 總共收到了超過 14 萬份貢獻，使其成為全球同類型儀式中規模最大的一次。 全部參與者都進行不誠實的行為，才可能破壞這個儀式。 站在參與者的視角，如果他們知道自己是誠實的，則不需要信任任何人，因為他們知道自己可確保儀式安全（他們自己已滿足 n 分之一誠實參與者的要求）。

<ExpandableCard title="KZG 儀式的隨機數字有什麼用？" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

當卷軸在二進位大型物件中發佈資料時，會提供一則在鏈上發佈的「承諾」。 這項承諾是在某些點對資料進行多項式擬合計算的結果。 這些點由 KZG 儀式中產生的隨機數字定義。 然後，證明者可以在相同點計算多項式以驗證資料；如果得出的值相同，則資料是正確的。

</ExpandableCard>

<ExpandableCard title="為什麼 KZG 隨機資料必須保密？" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

如果有人知道用於承諾的隨機位置，他們就很容易產生能在這些特定點擬合的新多項式（即「碰撞」）。 這表示他們可以從二進位大型物件新增或移除資料，並且仍然提供有效的證明。 為了避免這種情況，實際上不是向證明者提供實際的秘密位置，證明者實際收到的是使用橢圓曲線包裝在加密「黑盒子」中的位置。 這些方法有效地擾亂了這些值，使原始值無法被逆向工程，但透過一些聰明的代數方法，證明者和驗證者仍然可以在其代表的點上計算多項式。

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Danksharding 和 Proto-Danksharding 都不遵循傳統的「分片」模型，此模型旨在將區塊鏈分成多個部分。 分片鏈不再是以太坊開發藍圖的一部分。 相反，Danksharding 使用跨二進位大型物件的分散式資料採樣來實現以太坊擴容。 這在實作上容易很多。 此模型有時又稱「資料分片」。
</InfoBanner>

## Danksharding 是什麼？ {#what-is-danksharding}

Danksharding 完全實現了從 Proto-Danksharding 開始的卷軸擴容。 Danksharding 將在以太坊上為卷軸提供大量空間，用於轉存壓縮的交易資料。 這表示以太坊可以輕鬆支援數百個獨立的卷軸，並實現每秒處理數百萬筆交易。

它的運作方式是將附加到區塊的二進位大型物件從 Proto-Danksharding 中的六 (6) 個擴展到完整 Danksharding 中的 64 個。 所需的其餘變更都是對共識用戶端操作方式的更新，使得它們能夠處理新的大二進位大型物件。 這些變更有部分已在開發藍圖上，用於獨立於 Danksharding 的其他目的。 舉例來說，Danksharding 要求先實作提交者-建置者分離。 這是一個升級，它將不同驗證者建置區塊和提出區塊的工作分開。 同樣，Danksharding 需要資料可用性採樣，但開發不儲存太多歷史資料的輕量級用戶端（「無狀態用戶端」）也需要資料可用性採樣。

<ExpandableCard title="為什麼 Danksharding 需要提交者-建置者分離？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

提交者-建置者分離是為了防止單一驗證者必須為 32MB 的二進位大型物件資料產生昂貴的承諾和證明。 這為家庭質押者帶來很大的壓力，因為他們需要花費更多資金購買更強大的硬體，這會降低去中心化程度。 相反，專門的區塊建置者會負責這項昂貴的計算工作。 之後，區塊提交者即可廣播他們的區塊。 區塊提交者會直接選擇收益最大的區塊。 所有人都能經濟快速地驗證二進位大型物件，表示所有普通驗證者皆可檢查區塊建置者的行為是否誠實。 這允許在不犧牲去中心化的情況下處理大型二進位大型物件。 錯誤行事的區塊建置者可能被強制退出網路並罰沒，其他人會補上他的位置，因為區塊建置是高收益的活動。

</ExpandableCard>

<ExpandableCard title="為什麼 Danksharding 需要資料可用性採樣？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

驗證者需要進行資料可用性採樣才能快速有效地驗證二進位大型物件資料。 透過資料可用性採樣，驗證者可以非常確定二進位大型物件資料可用且正確提交。 每個驗證者都可以隨機採樣幾個資料點並建立證明，這意味著驗證者無需檢查整個二進位大型物件。 任何資料缺漏的情況都可被快速發現且二進位大型物件會遭拒。

</ExpandableCard>

### 目前進度 {#current-progress}

完整的 Danksharding 還需要幾年的時間才會實作。 在此期間，KZG 儀式已經結束，收到了超過 140,000 份貢獻，Proto-Danksharding 的[以太坊改善提案](https://eips.ethereum.org/EIPS/eip-4844)業已成熟。 此提案已在所有測試網上充分實作，並在 2024 年 3 月的 Cancun-Deneb（「坎昆」）網路升級中在主網上線。

### 了解更多 {#further-reading}

- [Proto-Danksharding 筆記](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad 的 Danksharding 筆記](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad、Proto 和 Vitalik 討論 Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG 儀式](https://ceremony.ethereum.org/)
- [Carl Beekhuizen 在 Devcon 的可信任設定演講](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [關於二進位大型物件資料可用性採樣的更多資訊](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist 的 KZG 承諾和證明演講](https://youtu.be/8L2C6RDMV9Q)
- [KZG 多項式承諾](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
