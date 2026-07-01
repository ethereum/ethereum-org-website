---
title: "Birleşme ETH arzını nasıl etkiledi"
description: "Birleşme'nin ETH arzını nasıl etkilediğinin dökümü"
lang: tr
---

Birleşme, [Ethereum](/) ağının Eylül 2022'de gerçekleşen İş Kanıtı'ndan (PoW) Hisse Kanıtı'na (PoS) geçişini temsil ediyordu. ETH'nin ihraç edilme şekli bu geçiş sırasında değişikliklere uğradı. Önceden, yeni ETH iki kaynaktan ihraç ediliyordu: yürütme katmanı (yani Ana Ağ) ve mutabakat katmanı (yani İşaret Zinciri). Birleşme'den bu yana, yürütme katmanındaki ihraç artık sıfırdır. Bunu ayrıntılı olarak inceleyelim.

## ETH ihracının bileşenleri {#components-of-eth-issuance}

ETH arzını iki temel güce ayırabiliriz: ihraç ve yakım.

ETH **ihracı**, daha önce var olmayan ETH'yi yaratma sürecidir. ETH **yakımı**, mevcut ETH'nin yok edilerek dolaşımdan çıkarılmasıdır. İhraç ve yakım oranı çeşitli parametrelere göre hesaplanır ve aralarındaki denge, Ether'in ortaya çıkan enflasyon/deflasyon oranını belirler.

<Card
emoji=":chart_decreasing:"
title="ETH ihracı özeti">

- Hisse Kanıtı'na (PoS) geçmeden önce, madencilere günde yaklaşık 13.000 ETH ihraç ediliyordu
- Stake edilen toplam yaklaşık 14 milyon ETH'ye dayanarak, staker'lara günde yaklaşık 1.700 ETH ihraç edilmektedir
- Kesin staking ihracı, stake edilen toplam ETH miktarına bağlı olarak dalgalanır
- **Birleşme'den bu yana, yalnızca günlük ~1.700 ETH kalmıştır ve bu da toplam yeni ETH ihracını ~%88 oranında düşürmüştür**
- Yakım: Bu, ağ talebine göre dalgalanır. Belirli bir gün için en az 16 Gwei'lik ortalama bir gas fiyatı gözlemlenirse, bu durum doğrulayıcılara ihraç edilen ~1.700 ETH'yi etkili bir şekilde dengeler ve o gün için net ETH enflasyonunu sıfıra veya daha altına düşürür.

</Card>

## Birleşme öncesi (tarihsel) {#pre-merge}

### Yürütme katmanı ihracı {#el-issuance-pre-merge}

İş Kanıtı (PoW) altında, madenciler yalnızca yürütme katmanıyla etkileşime giriyordu ve bir sonraki bloğu çözen ilk madenci olmaları durumunda blok ödülleriyle ödüllendiriliyorlardı. 2019'daki [Konstantinopolis yükseltmesinden](/ethereum-forks/#constantinople) bu yana bu ödül blok başına 2 ETH idi. Madenciler ayrıca, en uzun/kurallı zincirde yer almayan geçerli bloklar olan [ommer](/glossary/#ommer) bloklarını yayınladıkları için de ödüllendiriliyordu. Bu ödüller ommer başına en fazla 1,75 ETH'ye ulaşıyordu ve kurallı bloktan ihraç edilen ödüle _ek olarak_ veriliyordu. Madencilik süreci, tarihsel olarak sürdürülmesi için yüksek seviyelerde ETH ihracı gerektiren ekonomik açıdan yoğun bir faaliyetti.

### Mutabakat katmanı ihracı {#cl-issuance-pre-merge}

[İşaret Zinciri](/ethereum-forks/#beacon-chain-genesis) 2020'de yayına girdi. Madenciler yerine, Hisse Kanıtı (PoS) kullanan doğrulayıcılar tarafından güvence altına alınır. Bu zincir, Ethereum kullanıcılarının Ana Ağ'daki (yürütme katmanı) bir akıllı sözleşmeye tek yönlü olarak ETH yatırmasıyla başlatıldı; İşaret Zinciri bu sözleşmeyi dinleyerek kullanıcıya yeni zincirde eşit miktarda ETH tanımladı. Birleşme gerçekleşene kadar, İşaret Zinciri'nin doğrulayıcıları işlemleri işlemiyordu ve esasen doğrulayıcı havuzunun kendi durumu üzerinde mutabakata varıyorlardı.

İşaret Zinciri'ndeki doğrulayıcılar, zincirin durumunu onayladıkları ve bloklar önerdikleri için ETH ile ödüllendirilir. Ödüller (veya cezalar), doğrulayıcı performansına dayalı olarak her dönemde (her 6,4 dakikada bir) hesaplanır ve dağıtılır. Doğrulayıcı ödülleri, daha önce İş Kanıtı (PoW) altında ihraç edilen madencilik ödüllerinden (her ~13,5 saniyede 2 ETH) **önemli ölçüde** daha azdır, çünkü bir doğrulayıcı düğüm çalıştırmak ekonomik olarak o kadar yoğun değildir ve bu nedenle bu kadar yüksek bir ödül gerektirmez veya haklı çıkarmaz.

### Birleşme öncesi ihraç dökümü {#pre-merge-issuance-breakdown}

Toplam ETH arzı: **\~120.520.000 ETH** (Eylül 2022'deki Birleşme sırasında)

**Yürütme katmanı ihracı:**

- 13,3 saniyede bir 2,08 ETH olarak tahmin ediliyordu\*: Yılda **\~4.930.000** ETH ihraç edildi
- **Yaklaşık %4,09'luk** bir enflasyon oranıyla sonuçlandı (yılda 4,93M / toplam 120,5M)
- \*Bu, kurallı blok başına 2 ETH'yi ve ommer bloklarından zaman içinde ortalama 0,08 ETH'yi içerir. Ayrıca, bir [zorluk bombası](/glossary/#difficulty-bomb) etkisi olmayan temel blok süresi hedefi olan 13,3 saniyeyi kullanır. ([Kaynağa bakın](https://bitinfocharts.com/ethereum/))

**Mutabakat katmanı ihracı:**

- Stake edilen toplam 14.000.000 ETH kullanıldığında, ETH ihraç oranı yaklaşık 1700 ETH/gündür ([Kaynağa bakın](https://ultrasound.money/))
- Yılda **\~620.500** ETH ihracıyla sonuçlanır
- **Yaklaşık %0,52'lik** bir enflasyon oranıyla sonuçlandı (yılda 620,5B / toplam 119,3M)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Toplam yıllık ihraç oranı (birleşme öncesi): ~%4,61** (%4,09 + %0,52)

İhracın **\~%88,7'si** yürütme katmanındaki madencilere gidiyordu (4,09 / 4,61 * 100)

**\~%11,3'ü** mutabakat katmanındaki staker'lara ihraç ediliyordu (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Birleşme sonrası (günümüz) {#post-merge}

### Yürütme katmanı ihracı {#el-issuance-post-merge}

Birleşme'den bu yana yürütme katmanı ihracı sıfırdır. İş Kanıtı (PoW), yükseltilmiş mutabakat kuralları altında artık geçerli bir blok üretim aracı değildir. Tüm yürütme katmanı etkinliği, Hisse Kanıtı (PoS) doğrulayıcıları tarafından yayınlanan ve onaylanan "işaret blokları" halinde paketlenir. İşaret bloklarını onaylama ve yayınlama ödülleri, mutabakat katmanında ayrı olarak hesaba katılır.

### Mutabakat katmanı ihracı {#cl-issuance-post-merge}

Mutabakat katmanı ihracı, blokları onaylayan ve öneren doğrulayıcılar için küçük ödüllerle Birleşme öncesinde olduğu gibi bugün de devam etmektedir. Doğrulayıcı ödülleri, mutabakat katmanı içinde yönetilen _doğrulayıcı bakiyelerinde_ birikmeye devam eder. Ana Ağ'da işlem yapabilen mevcut hesapların ("yürütme" hesapları) aksine, bunlar diğer Ethereum hesaplarıyla serbestçe işlem yapamayan ayrı Ethereum hesaplarıdır. Bu hesaplardaki fonlar yalnızca belirtilen tek bir yürütme adresine çekilebilir.

Nisan 2023'te gerçekleşen Şanghay/Capella yükseltmesinden bu yana, bu para çekme işlemleri staker'lar için etkinleştirildi. Staker'lar, _kazançlarını/ödüllerini (32 ETH üzerindeki bakiye)_ çekmeye teşvik edilir, çünkü bu fonlar aksi takdirde stake ağırlıklarına (maksimum 32'dir) katkıda bulunmaz.

Staker'lar ayrıca çıkış yapmayı ve tüm doğrulayıcı bakiyelerini çekmeyi de seçebilirler. Ethereum'un istikrarlı olmasını sağlamak için aynı anda ayrılan doğrulayıcı sayısı sınırlandırılmıştır.

Belirli bir günde toplam doğrulayıcı sayısının yaklaşık %0,33'ü çıkış yapabilir. Varsayılan olarak, dönem başına (her 6,4 dakikada bir veya günde 900) dört (4) doğrulayıcı çıkış yapabilir. 262.144'ün (2<sup>18</sup>) üzerindeki her 65.536 (2<sup>16</sup>) ek doğrulayıcı için ek bir (1) doğrulayıcının çıkış yapmasına izin verilir. Örneğin, 327.680'den fazla doğrulayıcı ile dönem başına beş (5) kişi ayrılabilir (günde 1.125). Toplam aktif doğrulayıcı sayısı 393.216'nın üzerinde olduğunda altı (6) kişiye izin verilecektir ve bu böyle devam eder.

Daha fazla doğrulayıcı para çektikçe, stake edilen büyük miktarlardaki ETH'nin aynı anda çekilerek istikrarı bozmasını kasıtlı olarak önlemek için çıkan maksimum doğrulayıcı sayısı kademeli olarak en az dörde düşürülecektir.

### Birleşme sonrası enflasyon dökümü {#post-merge-inflation-breakdown}

- [Toplam ETH arzı](/eth/supply/): **\~120.520.000 ETH** (Eylül 2022'deki Birleşme sırasında)
- Yürütme katmanı ihracı: **0**
- Mutabakat katmanı ihracı: Yukarıdakiyle aynı, **\~%0,52** yıllık ihraç oranı (toplam 14 milyon ETH stake edilmiş halde)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Toplam yıllık ihraç oranı: **\~%0,52**

Yıllık ETH ihracındaki net azalma: **\~%88,7** ((%4,61 - %0,52) / %4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Yakım {#the-burn}

ETH ihracına zıt olan güç, ETH'nin yakılma oranıdır. Ethereum'da bir işlemin yürütülmesi için, ağ etkinliğine bağlı olarak sürekli (bloktan bloğa) dalgalanan minimum bir ücretin ("taban ücret" olarak bilinir) ödenmesi gerekir. Ücret ETH cinsinden ödenir ve işlemin geçerli sayılması için _gereklidir_. Bu ücret işlem süreci sırasında _yakılır_ ve dolaşımdan çıkarılır.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Ücret yakımı, Ağustos 2021'de [Londra yükseltmesi](/ethereum-forks/#london) ile yayına girdi ve Birleşme'den bu yana değişmeden kaldı.
</AlertDescription>
</AlertContent>
</Alert>

Londra yükseltmesi tarafından uygulanan ücret yakımına ek olarak, doğrulayıcılar çevrimdışı oldukları için cezalara çarptırılabilir veya daha kötüsü, ağ güvenliğini tehdit eden belirli kuralları ihlal ettikleri için kesintiye uğrayabilirler. Bu cezalar, söz konusu doğrulayıcının bakiyesinden ETH'nin azalmasıyla sonuçlanır ve bu miktar doğrudan başka hiçbir hesaba ödül olarak verilmez, böylece etkili bir şekilde yakılır/dolaşımdan çıkarılır.

### Deflasyon için ortalama gas fiyatını hesaplama {#calculating-average-gas-price-for-deflation}

Yukarıda tartışıldığı gibi, belirli bir günde ihraç edilen ETH miktarı, stake edilen toplam ETH'ye bağlıdır. Yazının yazıldığı sırada bu miktar yaklaşık 1700 ETH/gündür.

Belirli bir 24 saatlik dönemde bu ihracı tamamen dengelemek için gereken ortalama gas fiyatını belirlemek amacıyla, 12 saniyelik bir blok süresi göz önüne alındığında, bir gündeki toplam blok sayısını hesaplayarak başlayacağız:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Her blok `15x10^6 gas/block` hedefler ([Gaz hakkında daha fazlası](/developers/docs/gas/)). Bunu kullanarak, günlük toplam 1700 ETH ihracı göz önüne alındığında, ihracı dengelemek için gereken ortalama gas fiyatını (Gwei/Gaz birimi cinsinden) bulabiliriz:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

`Y` için çözüldüğünde:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (yalnızca iki anlamlı basamağa yuvarlanmıştır)

Bu son adımı yeniden düzenlemenin başka bir yolu, `1700` değerini günlük ETH ihracını temsil eden bir `X` değişkeniyle değiştirmek ve geri kalanını şu şekilde basitleştirmek olacaktır:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Bunu basitleştirebilir ve `X`'nin bir fonksiyonu olarak yazabiliriz:

- `f(X) = X/108` burada `X` günlük ETH ihracıdır ve `f(X)`, yeni ihraç edilen tüm ETH'yi dengelemek için gereken Gwei/gas fiyatını temsil eder.

Yani, örneğin, `X` (günlük ETH ihracı) stake edilen toplam ETH'ye bağlı olarak 1800'e çıkarsa, `f(X)` (tüm ihracı dengelemek için gereken Gwei) o zaman `17 gwei` olacaktır (2 anlamlı basamak kullanılarak)

## Daha fazla bilgi {#further-reading}

- [Birleşme](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _ETH ihracını ve yakımını gerçek zamanlı olarak görselleştirmek için kullanılabilen panolar_
- [Ethereum İhracının Grafiğini Çıkarma](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
