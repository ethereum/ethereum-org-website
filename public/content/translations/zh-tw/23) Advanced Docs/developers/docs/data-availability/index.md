---
title: 資料可用性
description: 以太坊中的資料可得性問題與解決方案概覽
lang: zh-tw
---

「不輕易相信，而是去驗證。」是以太坊盛行的座右銘， 意為你的節點可以通過執行從同行那裡接收的區塊中的所有交易，獨立驗證接收到的信息是否正確，以確保所提出的變更與節點獨立計算的變更完全相符， 這意味著節點不需要信任區塊的發送者是否為可信的， 如有任何資料缺失則這無法實現。

**資料可得性**指的是用戶可以對所需資料的可得性有多大的信心，以驗證該區塊的數據是否真的對所有網絡參與者皆可用。 相對於以太坊第一層的完整節點來說這很簡單；完整節點下載每個區塊中的所有資料副本 - 資料_必須_可用於下載。 有缺失資料的區塊將被捨棄，不會被添加到區塊鏈上。 這就是「鏈上資料可得性」，是大一統區塊鏈（相較於充滿了擴容方案如 rollups 的不太一統的區塊鏈）的功能之一。 完整節點不會被騙接受無效的交易，因為它們會下載並執行每個交易。 然而，對於模組化的區塊鏈、L2 rollups 和light clients，資料可用性的情境更為複雜，需要一些更為精密的驗證程序。

## 先備知識 {#prerequisites}

讀者應該對於區塊鏈具備足夠的基本知識，特別是共識機制。 本頁面還假設讀者熟悉區塊、交易、節點、擴展解決方案以及其他相關主題。

## 資料可得性問題 {#the-data-availability-problem}

資料可得性問題是，需要向整個網路證明正在添加到區塊鏈的某些交易資料的總結形式確實代表一組有效的交易，但不要求所有的節點都下載所有的資料。 為了獨立地驗證區塊，所有交易的資料是必要的，但要求所有節點都要下載全部的交易資料是個擴容的瓶頸。 因此，資料可得性問題的解決方案是希望向不下載、不儲存資料的網路參與者，提供足夠的保證來代表所有交易的資料是可得、可供取用於驗證的。

[輕節點](/developers/docs/nodes-and-clients/light-clients)和[L2 卷（rollups）](/developers/docs/scaling)就是需要強力的資料可得性保證、但不會自行下載與處理交易資料的經典案例。 畢竟，不下載交易資料才能稱作「輕」節點，而卷（rollups）才能有效的擴容。

資料可得性問題也對未來的[無狀態](/roadmap/statelessness)以太坊客戶端來說至關重要，這樣他們才不需要下載及儲存狀態的資料來驗證區塊。 無狀態的客戶端仍需要確信資料在_某處_是可取得的，而且有被正確地處理。

## 資料可得性解決方案 {#data-availability-solutions}

### 資料可得性採樣（DAS） {#data-availability-sampling}

資料可得性採樣（DAS）是指讓網路能檢查資料是可取得的，但同時不在任何的獨立節點上加諸太多要求。 每個節點（包含沒有質押的節點）下載所有交易資料的隨機一小部分， 若能成功地下載到採樣，我們就能高度相信所有資料都是可得的。 這要仰賴於糾刪碼，把一組原本的資料塞入冗余的資訊（其原理是把資料套上稱為_多項式_的函式（function），然後在該多項式上找出其他點來作為冗余的資訊）。 這讓原本的資料在必要時，可以透過冗余的資料來還原。 這種資料處理方式的結果是，如果有_任何_原本的資料不可得，那擴增資料的_一半_就也會遺失。 而每個節點下載的資料採樣樹可以被調整，來確保如果真的只有不到一半的資料是可得的，那每個客戶端至少會有一個資料片段是缺失的。

資料可得性採樣可以用以確保在[Full Danksharding](/roadmap/danksharding/#what-is-danksharding)上線後，卷的交易處理者需要讓交易的資料是可得的。 以太坊節點會隨機地向 blob 中的資料採樣，用前述提到的糾刪碼來確保所有資料真的都存在。 同樣的技術也可以用來確保區塊製造者會讓所有的資料都是可得的，來保障輕節點的安全性。 同樣的，在[區塊提議、製造者分離（PBS）](/roadmap/pbs)中，只有區塊製造者需要處理整個區塊，驗證者（提議者）只要驗證資料可得性的採樣。

### 資料可得性委員會 {#data-availability-committees}

Data Availability Committees (DACs) are trusted parties that provide, or attest to, data availability. DACs can be used instead of, [or in combination with](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. The security guarantees that come with committees depends on the specific set up. Ethereum uses randomly sampled subsets of validators to attest to data availability for light nodes, for example.

DACs are also used by some validiums. The DAC is a trusted set of nodes that stores copies of data offline. The DAC is required to make the data available in the event of a dispute. Members of the DAC also publish on-chain attestations to prove that the said data is indeed available. Some validiums replace DACs with a proof-of-stake (PoS) validator system. Here, anyone can become a validator and store data off-chain. However, they must provide a “bond”, which is deposited in a smart contract. In the event of malicious behavior, such as the validator withholding data, the bond can be slashed. 權益證明資料可用性委員會在安全性方面明顯優於一般資料可用性委員，因為它們直接激勵誠實的行為。

## 資料可用性與輕節點 {#data-availability-and-light-nodes}

[Light nodes](/developers/docs/nodes-and-clients/light-clients) need to validate the correctness of the block headers they receive without downloading the block data. 輕節點輕量化的代價就是無法像全節點一樣在本地獨立地重新執行交易以驗證區塊頭。

Ethereum light nodes trust random sets of 512 validators that have been assigned to a _sync committee_. 同步委員會充當數據可用性委員會，使用加密簽名向輕節點表明區塊頭中的數據是正確的。 同步委員會每天都會刷新。 Each block header alerts light nodes as to which validators to expect to sign off the _next_ block, so they can't be tricked into trusting a malicious group pretending to be the real sync-committee.

However, what happens if an attacker somehow _does_ manage to pass a malicious block header to light clients and convince them that it was signed off by an honest sync-committee? 在這種情況下，攻擊者可能會添加無效的交易，而輕節點將盲目地接受它們，因為輕節點無法獨立驗證匯總在區塊頭中的所有狀態變化。 為了防止這種情況，輕節點可以使用詐欺證明。

詐欺證明的工作原理如下：全節點發現一個無效狀態轉換在網路上廣播時，可以快速產生證明已提議狀態轉換不可能源自給定一組交易的一小段數據，並把這段數據廣播到對等節點。 輕節點可以選取這些詐欺證明並用來丟棄有害的區塊頭，確保它們和全節點留在相同的誠實區塊鏈上。

這仰仗於全節點能夠存取完整的交易資料。 廣播有害區塊頭並且不提供交易資料的攻擊者可能能夠阻止全節點產生詐欺證明。 全節點也許可以發出關於有害區塊的警告，但沒有證據來證明它們的警告，因為沒有可用於產生證明據的數據！

數據可用性採樣可以解決這個數據可用性問題。 輕節點下載完整狀態資料的小隨機片段，並使用這些樣本驗證完整資料集可用。 The actual likelihood of incorrectly assuming full data availability after downloading N random chunks can be calculated ([for 100 chunks the chance is 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), i.e. incredibly unlikely).

Even in this scenario, attacks that withhold just a few bytes could feasibly go unnoticed by clients making random data requests. Erasure coding fixes this by reconstructing small missing pieces of data that can be used to check proposed state changes. A fraud proof could then be constructed using the reconstructed data, preventing light nodes from accepting bad headers.

**Note:** DAS and fraud proofs have not yet been implemented for proof-of-stake Ethereum light clients, but they are on the roadmap, most likely taking the form of ZK-SNARK based proofs. Today's light clients rely on a form of DAC: they verify the identities of the sync-committee and then trust the signed block headers they receive.

## Data availability and layer 2 rollups {#data-availability-and-layer-2-rollups}

[Layer 2 scaling solutions](/layer-2/), such as [rollups](/glossary/#rollups), reduce transaction costs and increase Ethereum's throughput by processing transactions off-chain. Rollup transactions are compressed and posted on Ethereum in batches. Batches represent thousands of individual off-chain transactions in a single transaction on Ethereum. This reduces congestion on the base layer and reduces fees for users.

However, it is only possible to trust the 'summary' transactions posted to Ethereum if the state change proposed can be independently verified and confirmed to be the result of applying all the individual off-chain transactions. If rollup operators do not make the transaction data available for this verification, then they could send incorrect data to Ethereum.

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups/) post compressed transaction data to Ethereum and wait for some amount of time (typically 7 days) to allow independent verifiers to check the data. If anyone identifies a problem, they can generate a fraud-proof and use it to challenge the rollup. This would cause the chain to roll back and omit the invalid block. 只有在數據可用時，才能實現這一點。 目前，樂觀卷疊有兩種方式將交易資料發佈到一層網路。 Some rollups make data permanently available as `CALLDATA` which lives permanently on-chain. With the implementation of EIP-4844, some rollups post their transaction data to cheaper blob storage instead. This is not permanent storage. Independent verifiers have to query the blobs and raise their challenges within ~18 days before the data is deleted from Ethereum layer-1. Data availability is only guaranteed by the Ethereum protocol for that short fixed window. After that, it becomes the responsibility of other entities in the Ethereum ecosystem. Any node can verify data availability using DAS, i.e. by downloading small, random samples of the blob data.

[Zero-knowledge (ZK) rollups](/developers/docs/scaling/zk-rollups) don't need to post transaction data since [zero-knowledge validity proofs](/glossary/#zk-proof) guarantee the correctness of state transitions. However, data availability is still an issue because we can't guarantee the functionality of the ZK-rollup (or interact with it) without access to its state data. For example, users cannot know their balances if an operator withholds details about the rollup’s state. Also, they cannot perform state updates using information contained in a newly added block.

## Data availability vs. data retrievability {#data-availability-vs-data-retrievability}

Data availability is different from data retrievability. Data availability is the assurance that full nodes have been able to access and verify the full set of transactions associated with a specific block. It does not necessarily follow that the data is accessible forever.

Data retrievability is the ability of nodes to retrieve _historical information_ from the blockchain. This historical data is not needed for verifying new blocks, it is only required for syncing full nodes from the genesis block or serving specific historical requests.

核心以太坊協議主要關注數據可用性，而不是數據可檢索性。 資料可檢索性可以由第三方運行的少量存檔節點提供，也可以使用去中心化檔案儲存（例如 [入口網站）在網路上分散網路](https://www.ethportal.net/)。

## 延伸閱讀 {#further-reading}

- [WTF is Data Availability?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [What Is Data Availability?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [The Ethereum Off-Chain Data Availability Landscape](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
- [A primer on data availability checks](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [An explanation of the sharding + DAS proposal](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [A note on data availability and erasure coding](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Data availability committees.](https://medium.com/starkware/data-availability-e5564c416424)
- [Proof-of-stake data availability committees.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Solutions to the data retrievability problem](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups) 
