---
title: Hisse ispatı ödülleri ve cezaları
description: Hisse ispatı Ethereum'da protokol içi teşvikler hakkında bilgi edinin.
lang: tr
---

Ethereum kendi kripto parası olan ether (ETH) ile güvenli hale getirilir. Blokları doğrulamaya ve zincirin başını belirlemeye katılmak isteyen düğüm operatörleri, Ethereum'daki [depozito sözleşmesine](/staking/deposit-contract/) ether yatırır. Sonrasında ise eşler arası ağ üzerinde alınan yeni blokların geçerliliğini kontrol eden ve zincirin başını tespit etmek için çatal seçim algoritmasını kullanan doğrulayıcı yazılımını çalıştırmak için ether cinsinden ödeme alırlar.

Bir doğrulayıcı için iki ana rol vardır: 1) yeni blokları kontrol etmek ve eğer geçerli iseler onları "tasdik etmek", 2) tüm doğrulayıcı havuzundan rastgele olarak seçildiğinde yeni bloklar önermek. Eğer doğrulayıcı bu görevlerin ikisini de istendiğinde yapmakta başarısız olursa ether ödemesini kaçıracaktır. Doğrulayıcılar ayrıca bazen imza toplamak ve senkronizasyon kurullarına katılım sağlamak ile görevlendirilirler.

Bunun dışında kazara yapması aşırı zor olan ve kötü niyet belli eden bazı davranışlar vardır, bunlara örnekler aynı yuva için birden çok blok önermek veya aynı yuvada birden fazla bloku tasdik etmek olabilir. Bunlar 36 gün içinde doğrulayıcı ağdan çıkarılana kadar doğrulayıcının etherlerinin bir miktarının (1 ETH'ye kadar) yakılabileceği "cezalandırılabilir" davranışlardır. Kesilen doğrulayıcının etherleri çıkış süreci boyunca yavaşça akıp gider, ancak daha çok doğrulayıcının kesildiği 18. Gün civarında daha büyük olan bir "korelasyon cezası" alırlar. Yani mutabakat mekanizmasının teşvik yapısı dürüstlük için ödeme yapar ve kötü aktörleri cezalandırır.

Tüm ödüller ve cezalar dönem başına bir defa uygulanmaktadır.

Daha fazla ayrıntı için okumaya devam edin...

## Ödüller ve cezalar {#rewards}

### Ödüller {#rewards}

Doğrulayıcılar diğer doğrulayıcıların çoğunluğu ile uyumlu oylar verdiklerinde, bloklar önerdiklerinde ve senkronizasyon kurullarına katıldıklarında ödüller alırlar. Her bir dönemdeki ödüllerin değeri `base_reward` ile hesaplanır. Bu diğer ödüllerin hesaplandığı ana birimdir. `base_reward` bir dönem altındaki ideal şartlar altında bir doğrulayıcı tarafından alınan ortalama ödülü temsil etmektedir. Bu, doğrulayıcının geçerli bakiyesi ve toplam doğrulayıcı sayısından yola çıkılarak şu şekilde hesaplanır:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

Burada `base_reward_factor` 64, `base_rewards_per_epoch` 4 ve `sum(active balance)` diğer tüm doğrulayıcılar tarafından hisselenmiş toplam ether miktarıdır.

Bu ana ödülün doğrulayıcının geçerli bakiyesi ile doğru orantılı ve ağdaki doğrulayıcı sayısı ile ters orantılı olduğu anlamına gelir. Daha fazla doğrulayıcı olduğunda, genel olarak çıkarılan miktar artar (`sqrt(N)` olarak), ancak başına düşen her bir doğrulayıcı için `base_reward` daha küçük olur (`1/sqrt(N)` olarak). Bu faktörler bir hisseleme düğümünün APR'sini etkiler. Bunun mantıklı bir açıklamasını [Vitalik'in notlarında](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards) okuyabilirsiniz.

Sonrasında toplam ödül her bir bileşenin toplam ödüle ne kadar eklediğini belirten bir ağırlığa sahip olduğu beş bileşenin toplamı olarak hesaplanır. Bileşenler şunlardır:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Her bileşenin ağırlığı şunlardır:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

Bu bileşenin toplamı 64'tür. Toplam uygulanabilir ağırlıklarının toplamının 64'e bölümü olarak hesaplanır. Zamanında kaynak, hedef ve baş oyları vermiş olan, bir blok önermiş olan ve bir senkronizasyon kuruluna katılmış olan bir doğrulayıcı `64/64 * base_reward == base_reward` alabilir. Ancak, bir doğrulayıcı normal olarak bir blok önericisi değildir, yani alabilecekleri maksimum ödül `64-8 /64 * base_reward == 7/8 * base_reward` olacaktır. Ne blok önericisi ne de bir senkronizasyon kurulunda olmayan doğrulayıcılar `64-8-2 / 64 * base_reward == 6.75/8 * base_reward` alabilir.

Hızlı tasdikleri teşvik etmek için ek bir ödül eklenmiştir. Bu `inclusion_delay_reward` olmaktadır. Bu, `base_reward` ile çarpılan `1/delay` şeklinde hesaplanan bir değere sahiptir, burada `delay`, blok önerisinin ve tasdiklemenin ayrıldığı yuva sayısını ifade eder. Örnek olarak, tasdik eğer ki blok önerisinin bir yuvası içinde verilirse tasdikleyici `base_reward * 1/1 == base_reward` alır. Tasdik bir sonraki yuvada gelirse, tasdikleyen `base_reward*1/2` alır ve böyle devam eder.

Blok önericileri bloka dahil edilen ** her geçerli tasdik** için `8 / 64 * base_reward` almaktadır, yani ödülün gerçek değeri tasdik eden doğrulayıcıların sayısına göre ölçeklenir. Blok önericileri ayrıca önerdikleri blokta diğer doğrulayıcılar tarafından kötü davranışların kanıtını ekleyerek de ödüllerini artırabilirler. Bu ödüller doğrulayıcı dürüstlüğünü destekleyen "havuçlar"dır. Kesimi dahil eden bir blok önericisi `slashed_validators_effective_balance/512` ile ödüllendirilecektir.

### Cezalar {#penalties}

Şimdiye kadar mükemmel davranışlar sergileyen doğrulayıcıları düşündük ama zamanında baş, kaynak veya hedef oyları vermeyen veya bunu aşırı yavaş şekilde yapan doğrulayıcılara ne olacak?

Hedef ve kaynak oylamalarını kaçırmanın cezası tasdik edicinin onları verseydi kazanacağı ödüllere eşittir. Bu ödülün bakiyelerine eklenmesi yerine, eşit bir miktarın bakiyelerinden silindiği anlamına gelir. Baş oylamasını kaçırma için bir ceza yoktur (yani baş oylamaları sadece ödüllendilir, asla cezalandırılmaz). `inclusion_delay` ile ilgili herhangi bir ceza yoktur - ödül sadece doğrulayıcının bakiyesine eklenmeyecektir. Ayrıca blok önermekte başarısız olunması için de bir ceza yoktur.

[Mutabakat özelliklerinde](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md) ödüller ve cezalar hakkında daha fazlasını okuyun. Ödüller ve cezalar Bellatrix yükseltmesinde değiştirilmiştir - Danny Ryan ve Vitalik'in bunu [Peep an EIP videosunda](https://www.youtube.com/watch?v=iaAEGs1DMgQ) tartışmasını izleyin.

## Ceza {#slashing}

Ceza bir doğrulayıcının ağdan zorla çıkarılmasına ve buna bağlantılı olarak hisselenmiş etherlerinin kaybına sebep olan daha sert bir eylemdir. Bir doğrulayıcının kesilebileceği, hepsinin ya aldatıcı öneri ya da blok tasdikine dayandığı üç yol vardır:

- Aynı yuva için iki farklı blok önermek ve imzalamak
- Bir başkasını "saran" bir bloku tasdik etmek (etkili bir şekilde geçmişi değiştirir)
- Aynı blok için iki adayı tasdik edip "çifte oy kullanarak"

Eğer bu hareketler tespit edilirse, doğrulayıcı kesilir. Bu hisselenmiş etherlerinin 1/32'sinin (maksimum 1 ethere kadar) anında yakılması ve sonrasında 36 günlük kaldırma sürecinin başlaması anlamına gelir. Bu kaldırma sürecinde doğrulayıcının hissesi zamanla akıp dereceli olarak akıp gider. Orta noktada (18. Gün) kesim etkinliğinden 36 gün öncesine kadarki dönemde cezalandırılan tüm doğrulayıcıların toplam hisselenmiş ether miktarı ile ölçeklenen bir büyüklüğü olan ek bir ceza uygulanır. Bu kesilen doğrulayıcı sayısı arttıkça, cezanın büyüklüğünün artması anlamına gelir. Maksimum ceza tüm cezalandırılan doğrulayıcıların toplam etkili bakiyesidir (yani eğer çok fazla cezalandırılan doğrulayıcı olur ise tüm hisselerini kaybedebilirler). Diğer bir yandan, tekil, izole bir ceza etkinliği doğrulayıcının hissesinin sadece küçük bir kısmını yakar. Cezalandırılan doğrulayıcı sayısı ile ölçeklendirilen bu orta nokta cezasına "korelasyon cezası" denir.

## Hareketsizlik sızıntısı {#inactivity-leak}

Eğer fikir birliği katmanı kesinleşmeden dört dönemden uzun süre giderse, "hareketsizlik sızıntısı" denilen acil bir protokol aktifleştirilir. Hareketsizlik sızıntısının asıl amacı zincirinin kesinliği kurtarması için gerekli olan ortamı oluşturmaktır. Yukarıda açıklandığı gibi, kesinlik kaynak ve hedef kontrol noktaları üzerinde anlaşmak için toplam hisselenen ether miktarının 2/3'lük çoğunluğuna ihtiyaç duyar. Eğer toplam doğrulayıcıların 1/3'ünden fazlasını temsil eden sayıda doğrulayıcı çevrimdışı olursa ya da doğru tasdikler vermeyi başaramazsa 2/3'lük bir çoğunluğun kontrol noktalarını kesinleştirebilmesi mümkün değildir. Hareketsizlik sızıntısı aktif olmayan doğrulayıcılara ait hissenin toplam hisselerin 1/3'ünden azını kontrol edene kadar zamanla akıp gitmesine izin verir, bu da kalan aktif doğrulayıcıların zinciri kesinleştirebilmesini sağlar. Aktif olmayan doğrulayıcıların havuzu ne kadar büyük olursa olsun, kalan aktif doğrulayıcılar eninde sonunda hisselerin 2/3'ünden fazlasını kontrol edecektir. Bir hissenin kaybı aktif olmayan doğrulayıcıların en kısa sürede yeniden aktifleşmesi için güçlü bir teşviktir! Bir hareketsizlik sızıntısı senaryosu Medalla test ağında aktif doğrulayıcıların %66'dan az bir kısmı mevcut blok zincirin başı üzerinde mutabakata vardığında görülmüştü. Hareketsizlik sızıntısı aktifleştirilmişti ve kesinlik nihayet geri kazanılmıştı!

Mutabakat mekanizmasının ödül, ceza ve ceza mekanizması tekil doğrulayıcıları doğru davranmaya yönlendirir. Ancak, bu tasarım seçimlerinden doğrulayıcıların birden çok istemci arasında eşit biçimde dağılımını güçlü bir şekilde teşvik eden ve tekil istemci baskınlığından güçlü bir şekilde caydırmaya çalışan bir sistem ortaya çıkmıştır.

## Daha fazla okuma {#further-reading}

- [Ethereum'u Yükseltmek: Teşvik katmanı](https://eth2book.info/altair/part2/incentives)
- [Ethereum'un hibrit Casper protokolünde teşvikler](https://arxiv.org/pdf/1903.04205.pdf)
- [Açıklamalı özellikler, Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Eth2 Cezadan Kaçınma Tüyoları](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_Kaynaklar_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
