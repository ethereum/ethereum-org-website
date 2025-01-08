---
title: 單獨質押以太幣
description: 如何開始單獨質押以太幣的概覽
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-withdrawal.png
alt: 萊斯利犀牛在她自己的電腦晶片上。
sidebarDepth: 2
summaryPoints:
  - 直接從協定中獲得最大酬勞，以保持你的驗證者正常運作和上線
  - 執行家用硬體，親自貢獻於以太坊網路的安全和去中心化
  - 消除信任依賴，永遠不需放棄對資金金鑰的控制權
---

## 單獨質押是什麼？ {#what-is-solo-staking}

單獨質押指的是[運行連接到網際網路的以太坊節點](/run-a-node/)並存入 32 個以太幣以啟用[驗證者](#faq)的行動，這使你可以直接參與網路共識。

**單獨質押提高了以太坊網路的去中心化程度**，使以太坊在抵抗審查及攻擊上更加穩健。 其他質押方法可能無法以同樣的方式協助網路。 單獨質押是保護以太坊的最佳質押方案。

以太坊節點由執行層 (EL) 用戶端和共識層 (CL) 用戶端組成。 這類用戶端是一套共同運作的軟體加上一組有效的簽名金鑰，可驗證交易和區塊、證明正確的區塊鏈頭、匯總證明並提交區塊。

單獨質押者需要負責運作執行這些用戶端所需的硬體。 強烈建議你使用專用機器在家操作，這對網路健康非常有益。

單獨質押者直接獲得來自協議的獎勵，負責讓驗證者持續上線且正常運作。

## 為什麼選擇單獨質押？ {#why-stake-solo}

單獨質押需要承擔更多責任，但能助你最大程度上控制你的資金和質押設定。

<CardGrid>
  <Card title="賺取以太幣" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="完全控制" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="網路安全" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## 單獨質押前的考量事項 {#considerations-before-staking-solo}

雖然我們希望每個人都能輕鬆無風險地進行單獨質押，但現實並非如此。 在選擇單獨質押以太幣之前，你需要謹慎考慮一些重要的實際因素。

<InfoGrid>
<ExpandableCard title="必讀事項" eventCategory="SoloStaking" eventName="clicked required reading">
在操作自己的節點時，你應該花一些時間學習如何使用你選擇的軟體。 包括閱讀相關文件，以及了解這些開發團隊的溝通管道。

越是了解你在執行的軟體以及權益證明的運作原理，你作為質押者的風險就越小，也越容易解決節點運作過程中可能出現的問題。
</ExpandableCard>

<ExpandableCard title="熟悉電腦" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
設定節點仍然需要對電腦有一定程度的掌握，不過隨著時間經過，新工具會越來越容易使用。 了解命令列介面會有幫助，但不是必要的。

設定節點也需要設置非常基本的硬體，以及對最低建議規格有一些了解。
</ExpandableCard>

<ExpandableCard title="安全的金鑰管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像以私密金鑰保護以太坊地址一樣，你還需要專門為驗證者生成金鑰。 你必須了解如何確保你的種子助記詞或私密金鑰的安全。{' '}

<a href="/security/">以太坊安全及詐騙預防</a>
</ExpandableCard>

<ExpandableCard title="維護" eventCategory="SoloStaking" eventName="clicked maintenance">
硬體偶爾會出現故障，網路連線會中斷，用戶端軟體偶爾也需要升級。 節點維護是不可避免的，你偶爾需要留意。 最好能隨時掌握預期的網路升級或其他重要的用戶端升級。
</ExpandableCard>

<ExpandableCard title="可靠的運行時間" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的酬勞與你的驗證者上線並提供正確證明的時間成正比。 停機會導致一定程度的罰金，這和有多少其他驗證者同時離線成正比，但<a href="#faq">不會導致罰沒</a>。 頻寬也很重要，因為如果沒有及時收到證明，酬勞就會減少。 要求可能有所差異，但建議上傳和下載速率至少都要有 10 Mb/s。
</ExpandableCard>

<ExpandableCard title="罰沒風險" eventCategory="SoloStaking" eventName="clicked slashing risk">
與離線的怠工罰金不同，<em>罰沒</em>是針對惡意犯罪的更嚴重的懲罰。 如果同一個時間只在一台電腦上載入金鑰來執行非主流用戶端，遭到罰沒的風險微乎其微。 話雖如此，所有質押者都必須意識到罰沒的風險。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">關於罰沒和驗證者生命週期的更多資訊</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## 運作原理 {#how-it-works}

<StakingHowSoloWorks />

在活躍期間，你將獲得以太幣獎勵，這些獎勵將定期存入你的提款地址。

如果需要，你可以退出驗證者，如此一來就不必一直上線，但也不會再有任何酬勞。 然後，你的餘額將被提取到你在設置過程中指定的提款地址。

[更多關於提取質押代幣的資訊](/staking/withdrawals/)

## 開始使用質押啟動面板 {#get-started-on-the-staking-launchpad}

質押啟動面板是一個開放原始碼應用程式，可以幫助你成為質押者。 它會指引你選擇用戶端、產生金鑰，並將你的以太幣存入質押存款合約。 它會提供一份檢查清單，確認你已完成所有內容，可安全地設定驗證者。

<StakingLaunchpadWidget />

## 使用節點和用戶端設定工具時需要考量的事項 {#node-tool-considerations}

現在有愈來愈多工具和服務助你單獨質押以太幣，但每種方式都有不同的風險和優點。

以下屬性指標可以用來衡量所列質押工具可能具備的顯著優勢或劣勢。 在選擇工具，展開質押之旅之際，請將本節作為參考，了解我們如何定義這些屬性。

<StakingConsiderations page="solo" />

## 探索節點和用戶端設定工具 {#node-and-client-tools}

有多種方案可以幫你完成設定。 請運用上述指標來幫助你了解以下工具。

<ProductDisclaimer />

### 節點工具

<StakingProductsCardGrid category="nodeTools" />

切記，選擇[非主流用戶端](/developers/docs/nodes-and-clients/client-diversity/)極為重要，因為這可以提高網路的安全性，降低你的風險。 可讓你設定非主流使用者端的工具稱為<em style={{ textTransform: "uppercase" }}>「多重使用者端」</em>。

### 金鑰產生器

這些工具可以代替[質押存款命令列介面](https://github.com/ethereum/staking-deposit-cli/)，幫助你生成金鑰。

<StakingProductsCardGrid category="keyGen" />

關於我們遺漏的質押工具，你有要推薦的嗎？ 請參閱我們的[產品刊登政策](/contributing/adding-staking-products/)，如果合適，請提交以供審核。

## 閱讀單獨質押指南 {#staking-guides}

<StakingGuides />

## 常見問題 {#faq}

以下是關於質押的一些最常見問題，建議仔細閱讀。

<ExpandableCard title="什麼是驗證者？">

<em>驗證者</em>是一個存在於以太坊並參與以太坊協議共識的虛擬實體。 驗證者由餘額、公鑰和其他屬性表示。 <em>驗證者用戶端</em>是通過持有和使用私密金鑰代表驗證者進行操作的軟體。 一個驗證者用戶端可以持有多組金鑰，控制許多驗證者。

</ExpandableCard>

<ExpandableCard title="我可以存入超過 32 個以太幣嗎？">
與驗證者相關聯的每組金鑰都需要 32 個以太幣才能啟用。 將更多以太幣存入一組金鑰不會增加潛在的酬勞，因為一個驗證者的<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有效餘額</a>以 32 個以太幣為限。 這意味著質押是以 32 個以太幣為遞增單位，每個單位都有自己的一組金鑰和餘額。

請勿為一個驗證者存入超過 32 個以太幣。 這並不會增加你的酬勞。 如果為驗證者設置了提現地址，超過 32 個以太幣的多餘資金將在下一次<a href="/staking/withdrawals/#validator-sweeping">驗證者掃描</a>時自動提款到該地址。

如果單獨質押對你來說要求太高，可以考慮使用<a href="/staking/saas/">質押即服務</a>提供者，或者如果你持有的以太幣少於 32 個，可以了解下<a href="/staking/pools/">質押池</a>。
</ExpandableCard>

<ExpandableCard title="如果離線，會被罰沒嗎？ （簡單的說：不會）">
如果你在網路正確進行最終確認時離線，則不會發生罰沒。 如果你的驗證者無法在特定時期內（每個時期 6.4 分鐘）完成證明，則會產生少量的<em>怠工罰金</em>，但這與<em>罰沒</em>完全不同。 這些罰金略低於你在驗證者可以完成證明的情況下獲得的酬勞，因此只要讓驗證者再次上線，經過差不多相同的時間就能賺回來。

請注意，怠工罰金與同時離線的驗證者數量成正比。 如果大部分網路同時離線，則每個驗證者承擔的罰金將大於單一驗證者怠工時的罰金。

在極端情況下，如果有超過三分之一的驗證者同時離線導致網路停止最終確認，那麼這些使用者會遭受所謂的<em>二次怠工罰金</em>，離線驗證者帳戶中的以太幣將受到指數級別的損失。 這時以太坊網路會消耗怠工驗證者的以太幣來進行自我修復，直到其餘額達到 16 個以太幣為止，此時它們將自動被踢出驗證者池。 最後還在線上的剩餘驗證者將再次超過網路的三分之二，滿足再次最終確認區塊鏈所需的絕對多數要求。
</ExpandableCard>

<ExpandableCard title="如何確保我不會被罰沒？">
簡而言之，雖然我們永遠無法完全保證你不會被罰沒，但如果你真誠行事，執行非主流用戶端，而且一次只將簽名金鑰保存在一台電腦上，那麼遭到罰沒的風險微乎其微。

只有幾個特定的狀況會導致驗證者遭到罰沒並被踢出網路。 截止撰寫本文為止，發生過的罰沒事件完全是因為事主設置了冗餘硬體，同時間將簽名金鑰儲存在兩台不同的電腦上。 這可能導致你的金鑰在無意中出現<em>雙重投票</em>，這是一種可被罰沒的違規行為。

執行絕對主流用戶端（任何超過三分之二的網路所使用的用戶端）也有潛在的罰沒風險，例如該用戶端出現錯誤，導致一個區塊鏈分叉。 這可能會導致最終確認的是有問題的分叉。 要修正回預期的區塊鏈，需要提交<em>環繞投票</em>，嘗試撤銷最終確認的區塊。 這也是一種可被罰沒的行爲，但執行非主流用戶端即可避免。

<em>非主流用戶端絕對不會最終確認</em>相同的錯誤，因此也不會導致環繞投票，只可能產生怠工罰金，<em>而不會遭到罰沒</em>。

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">詳細了解執行非主流用戶端的重要性。</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">詳細了解如何避免罰沒</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪一個用戶端最好？">
各用戶端的效能和使用者介面可能略有不同，因為每個用戶端都是由不同的團隊使用不同程式語言開發的。 這表示沒有「最好的」用戶端。 所有生產環境的用戶端都是優秀的軟體，會執行相同的核心功能來與區塊鏈同步和互動。

由於所有生產環境用戶端的基本功能都相同，因此選擇<strong>非主流用戶端</strong>其實非常重要；「非主流」意指網路上大多數驗證者都「沒」使用該用戶端。 這聽起來可能有悖直覺，但執行主流或絕對主流用戶端會使你在該用戶端出現錯誤時面臨更高的罰沒風險。 執行非主流用戶端可以大幅降低這些風險。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">詳細了解為什麼用戶端多元化如此重要</a>
</ExpandableCard>

<ExpandableCard title="我可以只用 VPS（虛擬私人伺服器）嗎？">
雖然虛擬私人伺服器 (VPS) 可以作為家用硬體的替代品，但驗證者用戶端的實體存取和位置<em>有其重要性</em>。 Amazon Web Services 或 Digital Ocean 等集中式雲端解決方案提供了不必擁有和運作硬體的便利，但代價是網路集中化。

在一個集中式雲端儲存解決方案上執行的驗證者用戶端越多，對這些使用者而言就越危險。 如果發生任何事件導致這些供應商離線，無論是由於攻擊、監管要求，抑或僅因為電源/網際網路中斷，都將導致依賴此伺服器的所有驗證者用戶端同時離線。

離線罰金與同時離線的其他驗證者數量成正比。 使用虛擬私人伺服器會大幅提高承受更嚴重的離線罰金的風險，甚至如果發生大量當機，還會增加二次懲罰或罰沒的風險。 為了將你自己的風險和網路風險降至最低，我們強烈鼓勵使用者取得並操作自己的硬體。
</ExpandableCard>

<ExpandableCard title="如何解鎖我的酬勞或取回我的以太幣？">

在信標鏈中進行任何類型的提款都需要設置提款憑證。

新質押者在生成金鑰和存款時就設置了提款憑證。 尚未設置此憑證的現有質押者可以升級其金鑰以支援此功能。

設置提款憑證後，酬勞支付（扣除初始 32 個以太幣後的累積以太幣）將定期自動分配到提款地址。

要解鎖並拿回全部餘額，你還必須完成退出驗證者的過程。

<ButtonLink href="/staking/withdrawals/">更多關於提取質押代幣的資訊</ButtonLink>
</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [以太坊質押目錄](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [以太坊用戶端的多元化問題](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [幫助用戶端多元化](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共識層的用戶端多元化](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [如何購買以太坊驗證者硬體](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [按部就班：如何加入以太坊 2.0 測試網](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [以太坊 2 罰沒預防技巧](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020 年_

<QuizWidget quizKey="staking-solo" />
