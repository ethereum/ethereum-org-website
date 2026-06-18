---
title: "Proof-of-stake ödülleri ve cezaları"
description: "Proof-of-stake Ethereum'daki protokol içi teşvikler hakkında bilgi edinin."
lang: tr
---

[Ethereum](/), kendi yerel kripto parası olan Ether (ETH) kullanılarak güvence altına alınır. Blokları doğrulamaya ve zincirin başını belirlemeye katılmak isteyen düğüm operatörleri, Ethereum'daki [yatırma sözleşmesine](/staking/deposit-contract/) Ether yatırırlar. Daha sonra, eşler arası ağ üzerinden alınan yeni blokların geçerliliğini kontrol eden ve zincirin başını belirlemek için çatallanma seçimi algoritmasını uygulayan doğrulayıcı yazılımını çalıştırmaları karşılığında Ether ile ödeme alırlar.

Bir doğrulayıcı için iki temel rol vardır: 1) yeni blokları kontrol etmek ve geçerliyseler onları "onaylamak", 2) toplam doğrulayıcı havuzundan rastgele seçildiklerinde yeni bloklar teklif etmek. Doğrulayıcı, istendiğinde bu görevlerden herhangi birini yerine getiremezse Ether ödemesini kaçırır. Doğrulayıcılar ayrıca bazen imza toplama ve senkronizasyon komitelerine katılma görevlerini de üstlenirler.

Aynı slot için birden fazla blok teklif etmek veya aynı slot için birden fazla bloğu onaylamak gibi, yanlışlıkla yapılması çok zor olan ve kötü niyet gösteren bazı eylemler de vardır. Bunlar, doğrulayıcının ağdan çıkarılmasından (ki bu 36 gün sürer) önce bir miktar Ether'inin (1 ETH'ye kadar) yakılmasıyla sonuçlanan "ceza kesintisi" gerektiren davranışlardır. Ceza kesintisine uğrayan doğrulayıcının Ether'i çıkış süresi boyunca yavaş yavaş tükenir, ancak 18. günde, aynı anda daha fazla doğrulayıcı ceza kesintisine uğradığında daha büyük olan bir "korelasyon cezası" alırlar. Bu nedenle mutabakat mekanizmasının teşvik yapısı dürüstlüğü ödüllendirir ve kötü aktörleri cezalandırır.

Tüm ödüller ve cezalar her dönemde bir kez uygulanır.

Daha fazla detay için okumaya devam edin...

## Ödüller ve cezalar {#rewards}

### Ödüller {#rewards-2}

Doğrulayıcılar, diğer doğrulayıcıların çoğunluğuyla tutarlı oylar verdiklerinde, blok teklif ettiklerinde ve senkronizasyon komitelerine katıldıklarında ödül alırlar. Her dönemdeki ödüllerin değeri bir `base_reward` üzerinden hesaplanır. Bu, diğer ödüllerin hesaplandığı temel birimdir. `base_reward`, bir doğrulayıcının her dönemde optimal koşullar altında aldığı ortalama ödülü temsil eder. Bu, doğrulayıcının etkin bakiyesi ve aktif doğrulayıcıların toplam sayısından aşağıdaki gibi hesaplanır:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

burada `base_reward_factor` 64, `base_rewards_per_epoch` 4 ve `sum(active balance)` tüm aktif doğrulayıcılar genelinde stake edilen toplam Ether'dir.

Bu, temel ödülün doğrulayıcının etkin bakiyesiyle doğru orantılı ve ağdaki doğrulayıcı sayısıyla ters orantılı olduğu anlamına gelir. Ne kadar çok doğrulayıcı olursa, genel ihraç o kadar büyük olur (`sqrt(N)` olduğu için) ancak doğrulayıcı başına düşen `base_reward` o kadar küçük olur (`1/sqrt(N)` olduğu için). Bu faktörler, bir staking düğümü için APR'yi etkiler. Bunun mantığını [Vitalik'in notlarında](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards) okuyun.

Toplam ödül daha sonra, her bir bileşenin toplam ödüle ne kadar katkıda bulunacağını belirleyen bir ağırlığa sahip olduğu beş bileşenin toplamı olarak hesaplanır. Bileşenler şunlardır:

```
1. kaynak oyu: doğrulayıcı doğru kaynak kontrol noktası için zamanında oy vermiştir
2. hedef oyu: doğrulayıcı doğru hedef kontrol noktası için zamanında oy vermiştir
3. baş oyu: doğrulayıcı doğru baş blok için zamanında oy vermiştir
4. senkronizasyon komitesi ödülü: doğrulayıcı bir senkronizasyon komitesine katılmıştır
5. teklifçi ödülü: doğrulayıcı doğru slotta bir blok teklif etmiştir
```

Her bir bileşen için ağırlıklar aşağıdaki gibidir:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Bu ağırlıkların toplamı 64'tür. Ödül, geçerli ağırlıkların toplamının 64'e bölünmesiyle hesaplanır. Zamanında kaynak, hedef ve baş oyları veren, bir blok teklif eden ve bir senkronizasyon komitesine katılan bir doğrulayıcı `64/64 * base_reward == base_reward` alabilir. Ancak, bir doğrulayıcı genellikle bir blok teklifçisi değildir, bu nedenle maksimum ödülleri `64-8 /64 * base_reward == 7/8 * base_reward` olur. Ne blok teklifçisi olan ne de bir senkronizasyon komitesinde yer alan doğrulayıcılar `64-8-2 / 64 * base_reward == 6.75/8 * base_reward` alabilir.

Hızlı onayları teşvik etmek için ek bir ödül eklenir. Bu, `inclusion_delay_reward` ödülüdür. Bunun değeri, `base_reward` ile `1/delay` çarpımına eşittir; burada `delay`, blok teklifi ile onay arasındaki slot sayısıdır. Örneğin, onay blok teklifinden sonraki bir slot içinde sunulursa, onaylayan `base_reward * 1/1 == base_reward` alır. Onay bir sonraki slotta ulaşırsa, onaylayan `base_reward * 1/2` alır ve bu böyle devam eder.

Blok teklifçileri, bloğa dahil edilen **her geçerli onay** için `8 / 64 * base_reward` alırlar, bu nedenle ödülün gerçek değeri onaylayan doğrulayıcıların sayısıyla orantılı olarak artar. Blok teklifçileri ayrıca, teklif ettikleri bloğa diğer doğrulayıcıların kötü davranışlarına dair kanıtlar ekleyerek ödüllerini artırabilirler. Bu ödüller, doğrulayıcı dürüstlüğünü teşvik eden "havuçlardır". Ceza kesintisi içeren bir blok teklifçisi `slashed_validators_effective_balance / 512` ile ödüllendirilecektir.

### Cezalar {#penalties}

Şimdiye kadar mükemmel davranan doğrulayıcıları ele aldık, peki ya zamanında baş, kaynak ve hedef oyları vermeyen veya bunu yavaş yapan doğrulayıcılar ne olacak?

Hedef ve kaynak oylarını kaçırmanın cezaları, onaylayanın bunları sunmuş olsaydı alacağı ödüllere eşittir. Bu, ödülün bakiyelerine eklenmesi yerine, eşit bir değerin bakiyelerinden çıkarıldığı anlamına gelir. Baş oyunu kaçırmanın bir cezası yoktur (yani, baş oyları sadece ödüllendirilir, asla cezalandırılmaz). `inclusion_delay` ile ilişkili bir ceza yoktur - ödül sadece doğrulayıcının bakiyesine eklenmeyecektir. Ayrıca bir blok teklif edememenin de bir cezası yoktur.

Ödüller ve cezalar hakkında daha fazla bilgiyi [mutabakat spesifikasyonlarında](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md) okuyun. Ödüller ve cezalar Bellatrix yükseltmesinde ayarlandı - Danny Ryan ve Vitalik'in bunu tartıştığı bu [Peep an EIP videosunu](https://www.youtube.com/watch?v=iaAEGs1DMgQ) izleyin.

## Ceza kesintisi {#slashing}

Ceza kesintisi, bir doğrulayıcının ağdan zorla çıkarılmasına ve buna bağlı olarak stake ettikleri Ether'in kaybına neden olan daha ciddi bir eylemdir. Bir doğrulayıcının ceza kesintisine uğramasının üç yolu vardır ve bunların tümü blokların dürüst olmayan bir şekilde teklif edilmesi veya onaylanması anlamına gelir:

- Aynı slot için iki farklı blok teklif edip imzalayarak
- Başka bir bloğu "çevreleyen" bir bloğu onaylayarak (etkili bir şekilde tarihi değiştirerek)
- Aynı blok için iki adayı onaylayarak "çifte oy" vererek

Bu eylemler tespit edilirse, doğrulayıcıya ceza kesintisi uygulanır. Bu, 32 ETH'lik bir doğrulayıcı için 0.0078125'in (etkin bakiye ile doğrusal olarak ölçeklenir) derhal yakıldığı ve ardından 36 günlük bir çıkarma süresinin başladığı anlamına gelir. Bu çıkarma süresi boyunca doğrulayıcının stake'i yavaş yavaş erir. Orta noktada (18. Gün), büyüklüğü ceza kesintisi olayından önceki 36 gün içinde ceza kesintisine uğrayan tüm doğrulayıcıların toplam stake edilen Ether'i ile ölçeklenen ek bir ceza uygulanır. Bu, daha fazla doğrulayıcı ceza kesintisine uğradığında, kesintinin büyüklüğünün arttığı anlamına gelir. Maksimum kesinti, ceza kesintisine uğrayan tüm doğrulayıcıların tam etkin bakiyesidir (yani, ceza kesintisine uğrayan çok sayıda doğrulayıcı varsa tüm stake'lerini kaybedebilirler). Öte yandan, tek ve izole bir ceza kesintisi olayı, doğrulayıcının stake'inin yalnızca küçük bir kısmını yakar. Ceza kesintisine uğrayan doğrulayıcıların sayısıyla ölçeklenen bu orta nokta cezasına "korelasyon cezası" denir.

## Hareketsizlik sızıntısı {#inactivity-leak}

Mutabakat katmanı kesinlik kazanmadan dört dönemden fazla geçerse, "hareketsizlik sızıntısı" adı verilen bir acil durum protokolü etkinleştirilir. Hareketsizlik sızıntısının nihai amacı, zincirin kesinliği yeniden kazanması için gereken koşulları yaratmaktır. Yukarıda açıklandığı gibi kesinlik, toplam stake edilen Ether'in 2/3 çoğunluğunun kaynak ve hedef kontrol noktaları üzerinde anlaşmasını gerektirir. Toplam doğrulayıcıların 1/3'ünden fazlasını temsil eden doğrulayıcılar çevrimdışı olursa veya doğru onayları sunamazsa, 2/3'lük bir süper çoğunluğun kontrol noktalarını kesinleştirmesi mümkün değildir. Hareketsizlik sızıntısı, aktif olmayan doğrulayıcılara ait stake'in, toplam stake'in 1/3'ünden daha azını kontrol edene kadar yavaş yavaş erimesine izin vererek, kalan aktif doğrulayıcıların zinciri kesinleştirmesine olanak tanır. Aktif olmayan doğrulayıcı havuzu ne kadar büyük olursa olsun, kalan aktif doğrulayıcılar eninde sonunda stake'in >2/3'ünü kontrol edecektir. Stake kaybı, aktif olmayan doğrulayıcıların mümkün olan en kısa sürede yeniden aktif hale gelmeleri için güçlü bir teşviktir! Medalla test ağında, aktif doğrulayıcıların %66'sından azı Blokzincir'in mevcut başı üzerinde mutabakata varabildiğinde bir hareketsizlik sızıntısı senaryosuyla karşılaşılmıştı. Hareketsizlik sızıntısı etkinleştirildi ve sonunda kesinlik yeniden kazanıldı!

Mutabakat mekanizmasının ödül, ceza ve ceza kesintisi tasarımı, bireysel doğrulayıcıları doğru davranmaya teşvik eder. Ancak, bu tasarım seçimlerinden, doğrulayıcıların birden fazla istemciye eşit dağılımını güçlü bir şekilde teşvik eden ve tek istemci hakimiyetini güçlü bir şekilde caydırması gereken bir sistem ortaya çıkar.

## Daha fazla bilgi {#further-reading}

- [Ethereum'u Yükseltmek: Teşvik katmanı](https://eth2book.info/altair/part2/incentives)
- [Ethereum'un hibrit Casper protokolündeki teşvikler](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalik'in açıklamalı spesifikasyonu](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Eth2 Ceza Kesintisini Önleme İpuçları](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [EIP-7251 kapsamında ceza kesintilerinin analizi](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Kaynaklar_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_