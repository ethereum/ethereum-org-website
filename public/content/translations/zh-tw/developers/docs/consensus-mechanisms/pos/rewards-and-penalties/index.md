---
title: 權益證明獎勵和懲罰
description: 瞭解權益證明以太坊的協定內激勵措施。
lang: zh-tw
---

以太坊是運用其原生加密貨幣以太幣 (ETH) 來保障安全的。 希望參與驗證區塊和識別鏈頭的節點營運商，需要將以太幣存入以太坊上的[存款合約](/staking/deposit-contract/)。 然後他們將獲得以太幣支付來運作驗證者軟體，檢查在點對點網絡上收到的新區塊的有效性，並套用分叉選擇演算法來辨識鏈頭。

驗證者有兩個主要角色：1) 檢查新區塊並證明它們的有效性，2) 從全體驗證者池中被隨機選取時提議新的區塊。 如果驗證者在被要求時無法執行上述工作中的任意一個，他們便無法取得以太幣支付。 驗證者有時也會被賦予彙總簽章和參與同步委員會的工作。

有些行爲很難無意爲之並表現出某種惡意企圖，例如在同一個時隙提議多個區塊或在同一個時隙證明多個區塊。 這些「可罰沒」的行為會導致驗證者一定數量的以太幣（多達 1 枚以太幣）被銷毀，之後將其從網絡中移除，此過程需時 36 天。 被罰沒驗證者的以太幣將在退出期間緩慢耗盡，但在第 18 天，他們會受到「相關性懲罰」，當更多的驗證者同時被罰沒時，該懲罰的力度也會更大。 共識機制的激勵結構以此方式獎賞誠實，同時也懲罰不良行為者。

所有獎勵和懲罰每個時期套用一次。

繼續閱讀，以瞭解更多詳情...

## 獎勵和懲罰 {#rewards}

### 酬勞 {#rewards}

驗證者獲得獎勵的情景有：當他們與大多數其他驗證者的投票結果一致時，當他們提議區塊時，以及當他們參與同步委員會時。 每個時期的獎勵價值按 `base_reward` 計算。 這是用來計算其他獎勵的基本單位。 `base_reward` 代表一個最佳狀況下的驗證者在每個時期收到的平均獎勵。 這是按以下公式，根據驗證者的有效餘額和活躍驗證者總數來計算的：

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

其中 `base_reward_factor` 為 64，`base_rewards_per_epoch` 為 4，`sum(active balance)` 為所有活躍驗證者質押的以太幣總數。

這意味著基本獎勵與驗證者的有效餘額成正比，與網路中的驗證者數量成反比。 驗證者越多，總體發行量越大（`sqrt(N)` 形式），但每個驗證者的 `base_reward` 越小（`1/sqrt(N)` 形式）。 這些因素會影響質押節點的年利率。 閲讀 [Vitalik 的筆記](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards)中與之有關的原理。

縂獎勵的計算方式為 5 個組成部分的總和，每個部分各有一個權重，決定該組成部分在縂獎勵中的加成。 組成部分包括：

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

每個組成部分的權重如下：

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

這些權重的總和為 64。 獎勵的計算方式為適用權重除以 64 的總和。 及時為來源、目標和鏈頭投票、提議區塊和參與同步委員會的驗證者，可以獲得 `64/64 * base_reward == base_reward`。 不過，驗證者通常不是區塊提議者，因此他們的最大獎勵為 `64-8 /64 * base_reward == 7/8 * base_reward`。 既不是區塊提議者，也沒有參與同步委員會的驗證者，可以獲得 `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`。

以太坊還新增了一個額外獎勵來激勵快速證明。 它就是 `inclusion_delay_reward`。 該獎勵的值等於 `base_reward` 乘以 `1/delay`，其中 `delay` 是分隔區塊提議和證明的時隙數。 例如，如果在區塊提議的一個時隙内提交證明，證明者就會獲得 `base_reward * 1/1 == base_reward`。 如果證明在下個時隙到達，證明者就會獲得 `base_reward * 1/2`，依此類推。

包含在區塊内的**每個有效證明**都會讓區塊提議者獲得 `8 / 64 * base_reward`，因此實際獎勵的價值與證明驗證者的數量成正比。 區塊提議者也可以透過在提議的區塊中包含其他驗證者不良行爲的證據來增加其獎勵。 這些獎勵是鼓勵驗證者保持誠實的「紅蘿蔔」。 包含罰沒的區塊提議者將獲得 `slashed_validators_effective_balance / 512`。

### 懲罰 {#penalties}

到目前爲止，我們已經考慮了行爲良好的驗證者，但對於那些沒有及時為鏈頭、來源和目標投票或投票速度非常慢的驗證者，應該怎樣做呢？

錯過目標和來源投票的懲罰等同於證明者提交它們時獲得的獎勵。 這意味不會有獎勵新增到他們的餘額中，反而會從餘額中移除相應的價值。 錯過鏈頭投票不會受到懲罰（即鏈頭投票只會獲得獎勵，不會受到懲罰）。 也沒有與 `inclusion_delay` 相關的懲罰 - 只是不會新增獎勵到驗證者的餘額中。 未能提議區塊也不會受到懲罰。

閱讀[共識規範](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md)中有關獎勵和懲罰的更多資訊。 獎勵和懲罰在 Bellatrix 升級中進行了調整 - 在[以太坊改善提議解讀視頻](https://www.youtube.com/watch?v=iaAEGs1DMgQ)中觀看 Danny Ryan 和 Vitalik 關於此話題的討論。

## 罰沒 {#slashing}

罰沒是一種更嚴厲的行為，會導致驗證者被強制逐出網路，同時損失其質押的以太幣。 導致驗證者被罰沒的情況有三種，以下所有行為都相當於不誠實地提議或證明區塊：

- 在同一個時隙提議並簽署兩個不同的區塊
- 證明一個「包圍」了另一個區塊的區塊（有效地改變歷史記錄）
- 透過證明同一區塊的兩個候選區塊進行「雙重投票」

如果偵測到這些行爲，驗證者將被罰沒。 這意味著他們質押的以太幣的 1/32（最多不超過 1 枚以太幣）將被立即銷毀，然後開始為期 36 天的驅逐期。 在驅逐期内，驗證者的質押會逐漸流失。 在中間點（第 18 天），會有一項額外的懲罰，其力度與罰沒事件前 36 天内所有被罰沒驗證者的縂質押以太幣成正比。 這意味著當有更多驗證者被罰沒時，罰沒的力度就會增加。 最大罰沒力度是所有被罰沒驗證者的全部有效餘額（即如果有很多驗證者被罰沒，他們將失去全部質押）。 另一方面，一次孤立的罰沒事件只會銷毀驗證者質押的一小部分。 這個與被罰沒驗證者的數量成正比的中間點懲罰稱爲「相關性懲罰」。

## 怠惰逐減懲罰 {#inactivity-leak}

如果共識層未能在四個時期内最終確定，一種稱爲「怠惰逐減懲罰」的應急協定將會啓用。 怠惰逐減懲罰的最終目標是為鏈恢復最終確定性創造條件。 如上所述，最終確定需要 2/3 的多數縂質押以太幣同意來源和目標檢查點。 如果超過 1/3 的總計驗證者離綫或未能提交正確的證明，就不可能有 2/3 的絕對多數來最終確定檢查點。 怠惰逐減懲罰使不活躍驗證者的質押逐漸流失，直至他們控制的質押少於質押縂量的 1/3，使剩餘的活躍驗證者可以最終確定鏈。 無論不活躍驗證者的池有多大，剩餘的活躍驗證者最終都會控制超過 2/3 的質押。 質押的損失是促使不活躍驗證者儘快重新活躍的强大激勵措施。 Medalla 測試網上曾出現過一個怠惰逐減懲罰案例，當時不到 66% 的活躍驗證者成功在最新區塊鏈鏈頭達成共識。 怠惰逐減懲罰被啟動，最後重新獲得了最終確定性！

共識機制中的獎勵、懲罰與罰沒設計，都是鼓勵個人驗證者正確行事。 然而，從這些設計選擇中形成了一個系統，强烈激勵在多個用戶端平等分配驗證者，並且强烈抑制單一用戶端取得主導地位。

## 衍生閱讀 {#further-reading}

- [升級以太坊：激勵層](https://eth2book.info/altair/part2/incentives)
- [以太坊混合 Casper 協定中的激勵措施](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalik 的規範註解](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [以太坊 2 罰沒預防技巧](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_資源_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
