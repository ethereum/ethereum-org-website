---
title: "資料可用性"
description: "以太坊中的資料可得性問題與解決方案概覽"
lang: zh-tw
---

「不輕易相信，而是去驗證。」是以太坊盛行的座右銘， 意為你的節點可以通過執行從同行那裡接收的區塊中的所有交易，獨立驗證接收到的信息是否正確，以確保所提出的變更與節點獨立計算的變更完全相符， 這意味著節點不需要信任區塊的發送者是否為可信的， 如有任何資料缺失則這無法實現。

**資料可得性**是指使用者對於驗證區塊所需的資料確實可供所有網路參與者使用的信心。 對於以太坊 layer 1 上的完整節點來說，這相對簡單；完整節點會下載每個區塊中所有資料的副本——資料_必須_是可得的，下載才可能進行。 有缺失資料的區塊將被捨棄，不會被添加到區塊鏈上。 這就是「資料可得性」，其為單體式區塊鏈（相較於模組化區塊鏈）的功能之一。 完整節點不會被騙接受無效的交易，因為它們會下載並執行每個交易。 然而，對於模組化的區塊鏈、L2 rollups 和light clients，資料可用性的情境更為複雜，需要一些更為精密的驗證程序。

## 先決條件 {#prerequisites}

您應該充分了解[區塊鏈基礎知識](/developers/docs/intro-to-ethereum/)，特別是[共識機制](/developers/docs/consensus-mechanisms/)。 本頁面也假設讀者熟悉[區塊](/developers/docs/blocks/)、[交易](/developers/docs/transactions/)、[節點](/developers/docs/nodes-and-clients/)、[擴展解決方案](/developers/docs/scaling/)及其他相關主題。

## 資料可得性問題 {#the-data-availability-problem}

資料可得性問題是，需要向整個網路證明正在添加到區塊鏈的某些交易資料的總結形式確實代表一組有效的交易，但不要求所有的節點都下載所有的資料。 為了獨立地驗證區塊，所有交易的資料是必要的，但要求所有節點都要下載全部的交易資料是個擴容的瓶頸。 因此，資料可得性問題的解決方案是希望向不下載、不儲存資料的網路參與者，提供足夠的保證來代表所有交易的資料是可得、可供取用於驗證的。

[輕量節點](/developers/docs/nodes-and-clients/light-clients)和 [Layer 2 卷軸](/developers/docs/scaling) 是網路參與者的重要範例，他們需要強大的資料可得性保證，但無法自行下載和處理交易資料。 畢竟，不下載交易資料才能稱作「輕」節點，而卷（rollups）才能有效的擴容。

資料可得性對於未來的 ["stateless"](/roadmap/statelessness) 以太坊用戶端來說也是一個關鍵問題，這些用戶端不需要下載和儲存狀態資料來驗證區塊。 無狀態用戶端仍需要確定資料在_某處_是可得的，並且已被正確處理。

## 資料可得性解決方案 {#data-availability-solutions}

### 資料可得性抽樣 (DAS) {#data-availability-sampling}

資料可得性採樣（DAS）是指讓網路能檢查資料是可取得的，但同時不在任何的獨立節點上加諸太多要求。 每個節點（包含沒有質押的節點）下載所有交易資料的隨機一小部分， 若能成功地下載到採樣，我們就能高度相信所有資料都是可得的。 這依賴於資料刪除編碼，它透過冗餘資訊來擴展給定的資料集 (做法是將一個稱為_多項式_的函數擬合到資料上，並在額外的點上評估該多項式)。 這讓原本的資料在必要時，可以透過冗余的資料來還原。 這種資料創建方式的後果是，如果_任何_原始資料不可用，那麼擴展資料的_一半_將會遺失！ 每個節點下載的資料樣本數量可以調整，以便在只有不到一半的資料真正可用的情況下，每個用戶端抽樣的資料片段中，_極有可能_至少有一個會遺失。

在 [Full Danksharding](/roadmap/danksharding/#what-is-danksharding) 實施後，DAS 將用於確保卷軸營運商使其交易資料可供使用。 以太坊節點會隨機地向 blob 中的資料採樣，用前述提到的糾刪碼來確保所有資料真的都存在。 同樣的技術也可以用來確保區塊製造者會讓所有的資料都是可得的，來保障輕節點的安全性。 同樣地，在[提議者-建構者分離](/roadmap/pbs)機制下，只有區塊建構者需要處理整個區塊——其他驗證者將使用資料可得性抽樣進行驗證。

### 資料可得性委員會 {#data-availability-committees}

資料可得性委員會（DAC）是提供或證明數據可用性的可信方。 資料可得性委員會 (DAC) 可以取代 DAS，或是[與其結合使用](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS)。 資料可用性委員會的安全保障取決於具體的設定。 例如，以太坊使用隨機抽樣一些驗證程式來證明節點的數據可用性。

validiums也在使用DACs。 DAC 是一組可信任的節點，離線儲存資料的副本。 DAC在發生爭議時需提供數據。 DAC 的成員也得發布鏈上證明來證實特定數據確實可用。 有些 validiums 以權益證明驗證者系統（PoS）來代替 DAC。 任何人都可成為驗證者並在鏈下儲存資訊。 然而，他們必須提供「保證金」並存款到智能合約中。 發生惡意行為時，如驗證者提供了欺騙性的資料，該保證金可能會受到罰沒。 權益證明資料可用性委員會在安全性方面明顯優於一般資料可用性委員，因為它們直接激勵誠實的行為。

## 資料可得性與輕量節點 {#data-availability-and-light-nodes}

[輕量節點](/developers/docs/nodes-and-clients/light-clients)需要在不下載區塊資料的情況下，驗證他們收到的區塊標頭的正確性。 輕節點輕量化的代價就是無法像全節點一樣在本地獨立地重新執行交易以驗證區塊頭。

以太坊輕量節點信任已被指派至一個_同步委員會_的 512 個隨機驗證者集合。 同步委員會充當數據可用性委員會，使用加密簽名向輕節點表明區塊頭中的數據是正確的。 同步委員會每天都會刷新。 每個區塊標頭都會提醒輕量節點，預期由哪些驗證者簽署_下一個_區塊，這樣他們就不會被冒充成真正同步委員會的惡意團體所欺騙。

然而，如果攻擊者以某種方式_真的_成功將惡意區塊標頭傳遞給輕量用戶端，並說服他們該標頭是由誠實的同步委員會簽署的，會發生什麼事呢？ 在這種情況下，攻擊者可能會添加無效的交易，而輕節點將盲目地接受它們，因為輕節點無法獨立驗證匯總在區塊頭中的所有狀態變化。 為了防止這種情況，輕節點可以使用詐欺證明。

詐欺證明的工作原理如下：全節點發現一個無效狀態轉換在網路上廣播時，可以快速產生證明已提議狀態轉換不可能源自給定一組交易的一小段數據，並把這段數據廣播到對等節點。 輕節點可以選取這些詐欺證明並用來丟棄有害的區塊頭，確保它們和全節點留在相同的誠實區塊鏈上。

這仰仗於全節點能夠存取完整的交易資料。 廣播有害區塊頭並且不提供交易資料的攻擊者可能能夠阻止全節點產生詐欺證明。 全節點也許可以發出關於有害區塊的警告，但沒有證據來證明它們的警告，因為沒有可用於產生證明據的數據！

數據可用性採樣可以解決這個數據可用性問題。 輕節點下載完整狀態資料的小隨機片段，並使用這些樣本驗證完整資料集可用。 下載 N 個隨機資料塊後，錯誤地假設資料完全可用的實際可能性是可以計算的 ([對於 100 個資料塊，機率是 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)，即機率極低)。

即使在這種情況下，僅保留幾個位元組的攻擊也可能被發出隨機資料請求的客戶端忽略。 刪除編碼透過重建缺失的小型資料片段來解決這個問題，這些片段可以用於檢查提交的狀態變更。 接著可以使用重建的資料建立欺詐證明，防止輕節點接受惡意的標頭。

**注意：** 資料可得性抽樣 (DAS) 和詐欺證明尚未為權益證明以太坊輕量用戶端實施，但它們已在發展藍圖上，最有可能採取基於 ZK-SNARK 的證明形式。 現有的輕量節點依賴 DAC 的形式：他們驗證同步委員會的身份，並信任接收到的經簽署區塊標頭。

## 資料可得性與 Layer 2 卷軸 {#data-availability-and-layer-2-rollups}

[Layer 2 擴展解決方案](/layer-2/)，例如[卷軸](/glossary/#rollups)，透過在鏈下處理交易來降低交易成本並提高以太坊的吞吐量。 卷軸交易是一批次一批次壓縮並上傳到以太坊上的。 批次為以太坊上一筆單獨的交易，其包含了數千筆獨立的鏈下交易。 這緩解了基礎層的擁塞情況，並降低了使用者所需支付的費用。

然而，只有當提交的狀態變化可被獨立驗證，並確認它確實是所有個別鏈下交易產出的結果時，我們才能信任這個上傳到以太坊的「總結」交易。 如果卷軸的營運者沒有在此驗證中提供交易資料，它們可能會發送錯誤的資料給以太坊。

[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)會將壓縮後的交易資料發布到以太坊，並等待一段時間 (通常為 7 天)，以允許獨立的驗證者檢查資料。 如果任何人發現有問題，他們可以產生欺詐證明並用來挑戰卷軸。 這會導致區塊鏈回滾並忽略不合法的區塊。 只有在數據可用時，才能實現這一點。 目前，樂觀卷疊有兩種方式將交易資料發佈到一層網路。 有些卷軸會將資料以 `CALLDATA` 的形式永久提供，這些資料會永久儲存在鏈上。 隨著 EIP-4844 的實現，一些卷軸將其交易資料發佈到更便宜的二進位大型物件存儲中。 這不是永久的儲存。 獨立驗證者必須在資料從以太坊一層網路刪除前約 18 天内查詢二進位大型文件並提出挑戰。 資料有效性只在一個短暫的固定窗口期内由以太坊協議得到保證。 在此之後，資料可用性成爲以太坊生態系統中其他實體的責任。 任何節點都可以使用 DAS 來驗證資料可得性，即透過下載 blob 資料的少量隨機樣本。

[零知識 (ZK) 卷軸](/developers/docs/scaling/zk-rollups) 不需要發布交易資料，因為[零知識有效性證明](/glossary/#zk-proof)保證了狀態轉換的正確性。 然而，資料可用性仍然是個問題，因為我們只有在存取狀態資料的情況下，才能確保零知識卷軸正常運作（或與其互動）。 例如，如果操作者扣留了卷軸的狀態，使用者就無法得知其餘額。 另外，使用者也無法使用新添加區塊中的資訊來執行狀態更新。

## 資料可得性與資料可擷取性 {#data-availability-vs-data-retrievability}

資料可用性與資料可檢索性不同。 資料可用性是一種保證，它確保全節點能夠訪問並驗證與特定區塊關聯的完整交易集。 這並不一定意味著數據能永遠被取出。

資料可擷取性是指節點從區塊鏈中擷取_歷史資訊_的能力。 驗證新區塊不需要歷史資料，歷史資料只用於從創世區塊同步全節點或滿足某些特定的歷史請求。

核心以太坊協議主要關注數據可用性，而不是數據可檢索性。 資料可擷取性可由第三方運行的少量封存節點提供，或者可以使用去中心化檔案儲存 (例如 [Portal Network](https://www.ethportal.net/)) 分散到整個網路上。

## 延伸閱讀 {#further-reading}

- [什麼是資料可得性 (Data Availability)？](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [什麼是資料可得性？](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [資料可得性檢查入門](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [分片 + DAS 提案的解釋](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [關於資料可得性與刪除編碼的說明](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [資料可得性委員會](https://medium.com/starkware/data-availability-e5564c416424)
- [權益證明的資料可得性委員會](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [資料可擷取性問題的解決方案](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [資料可得性，或：卷軸如何學會停止擔憂並愛上以太坊](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623：增加 Calldata 成本](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
