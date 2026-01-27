---
title: Birleşim ETH arzını nasıl etkiledi
description: Birleşim'in ETH arzını nasıl etkilediğinin analizi
lang: tr
---

# Birleşim, ETH arzını nasıl etkiledi {#how-the-merge-impacts-ETH-supply}

Birleşim, Ethereum ağının Eylül 2022'de gerçekleşen, iş ispatından hisse ispatına geçişini temsil ediyordu. ETH'nin dağıtım methodu bu geçişten sonra değişmiştir. Daha önce, yeni ETH iki kaynaktan ihraç ediliyordu: yürütüm katmanı (yani Ana Ağ) ve fikir birliği katmanı (yani İşaret Zinciri). Birleşim'den beri yürütüm katmanındaki dağıtım yapılmamaktadır. Hadi açıklayalım.

## ETH ihracının bileşenleri {#components-of-eth-issuance}

ETH arzını iki parçaya ayırabiliriz: dağıtma ve yakma.

ETH **ihracı**, daha önce var olmayan ETH'nin yaratılması sürecidir. ETH **yakımı**, mevcut ETH'nin yok edilerek dolaşımdan kaldırılmasıdır. Dağıtım ve yakım oranları belirli parametreler kullanılarak hesaplanır ve aralarındaki denge, ortaya çıkan Ether enflasyon/deflasyon oranını belirler.

<Card
emoji=":chart_decreasing:"
title="Kısaca ETH ihracı">

- Hisse ispatına geçmeden önce madencilere günde yaklaşık 13.000 ETH ihraç ediliyordu
- Paydaşlara, kilitlenmiş yaklaşık 14 milyon toplam ETH'ye dayalı olarak günde yaklaşık 1.700 ETH ihraç edilir
- Kesin hisseleme ihracı, kilitlenmiş toplam ETH miktarına göre dalgalanır
- **Birleşim'den bu yana, yalnızca günlük ~1.700 ETH kalmıştır ve bu da toplam yeni ETH ihracını ~%88 oranında düşürmüştür**
- Yakım: Bu, ağ talebine göre dalgalanır. _Eğer_ belirli bir gündeki ortalama gaz ücreti en az 16 gwei ise, bu durum doğrulayıcılara dağıtılan ortalama 1.700 ETH'yi dengeler ve ETH enflasyonunu sıfıra da ya daha aza indirir.

</Card>

## Birleşim öncesi (geçmiş) {#pre-merge}

### Yürütüm katmanı ihracı {#el-issuance-pre-merge}

İş ispatı bünyesinde madenciler sadece yürütüm katmanıyla etkileşime girerdi ve bir sonraki bloku çözen ilk madenci blok ödülüyle ödüllendirilirdi. 2019'daki [Constantinople yükseltmesinden](/ethereum-forks/#constantinople) bu yana bu ödül blok başına 2 ETH idi. Madenciler ayrıca, en uzun/kurallı zincirde yer almayan geçerli bloklar olan [ommer](/glossary/#ommer) blokları yayınladıkları için de ödüllendiriliyordu. Bu ödüller ommer başına en fazla 1,75 ETH idi ve kurallı bloktan verilen ödüle _ek olarak_ veriliyordu. Madencilik süreci ekonomik olarak maliyetliydi ve sürdürülebilmesi zamanında yüksek düzeyde ETH dağıtımı gerekliydi.

### Fikir birliği katmanı ihracı {#cl-issuance-pre-merge}

[İşaret Zinciri](/ethereum-forks/#beacon-chain-genesis) 2020'de yayına girdi. Madenciler yerine hisseleme ispatı kullanan doğrulayıcılar tarafından güvence altına alındı. Zincir, Ana Ağ'da (yürütüm katmanında) akıllı kontratlara tek yönlü ETH yatıran Ethereum kullanıcıları tarafından önyüklendi. İşaret Zinciri Ana Ağı dinleyerek kullanıcılara yeni zincirde aynı miktarda ETH yatırdı. Birleşim gerçekleşene kadar İşaret Zinciri'nin doğrulayıcıları işlemleri işlemiyordu, doğrulayıcı havuzunun durumu hakkındaki mutabakata varıyordu.

İşaret Zincirindeki doğrulayıcılar zincirin durumunu onayladıklarına ve blok önerdiklerinde ETH ile ödüllendirilir. Ödüller (veya cezalar) doğrulayıcı performansına dayanarak her dönemde (6,4 dakikada bir) hesaplanır ve dağıtılır. Doğrulayıcı ödülleri, daha önce iş ispatı altında verilen madencilik ödüllerinden (her ~13,5 saniyede 2 ETH) **önemli ölçüde** daha azdır çünkü bir doğrulama düğümü çalıştırmak ekonomik olarak o kadar yoğun değildir ve dolayısıyla bu kadar yüksek bir ödül gerektirmez veya garanti etmez.

### Birleşim öncesi ihraç dökümü {#pre-merge-issuance-breakdown}

Toplam ETH arzı: **~120.520.000 ETH** (Eylül 2022'deki Birleşim sırasında)

**Yürütüm katmanı dağıtımı:**

- 13,3 saniyede bir 2,08 ETH olarak tahmin ediliyordu\*: bir yılda **~4.930.000** ETH ihraç edildi
- **Yaklaşık %4,09**'luk bir enflasyon oranıyla sonuçlandı (yılda 4,93 milyon / toplam 120,5 milyon)
- \* Buna her kurallı blokta 2 ETH ve ek olarak ommer bloklardan zaman içinde ortalama 0,08 ETH dahildir. Ayrıca, bir [zorluk bombasının](/glossary/#difficulty-bomb) etkisi olmaksızın temel blok süresi hedefi olan 13,3 saniyeyi kullanır. ([Kaynağa bakın](https://bitinfocharts.com/ethereum/))

**Fikir birliği katmanı dağıtımı:**

- Kilitlenmiş toplam 14.000.000 ETH kullanıldığında, ETH ihraç oranı günde yaklaşık 1700 ETH'dir ([Kaynağa bakın](https://ultrasound.money/))
- Bir yılda **~620.500** ETH ihraç edilmesiyle sonuçlanır
- **Yaklaşık %0,52**'lik bir enflasyon oranıyla sonuçlandı (yılda 620,5 bin / toplam 119,3 milyon)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Toplam yıllık ihraç oranı (birleşim öncesi): ~%4,61** (%4,09 + %0,52)

İhracın **~%88,7**'si yürütüm katmanındaki madencilere gidiyordu (4,09 / 4,61 \* 100)

İhracın **~%11,3**'ü fikir birliği katmanındaki paydaşlara yapılıyordu (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Birleşim sonrası (günümüz) {#post-merge}

### Yürütüm katmanı ihracı {#el-issuance-post-merge}

Birleşim'den bu yana yürütüm katmanı ihracı sıfırdır. Güncel mutabakat kuralları çerçevesinde iş ispatı artık geçerli bir blok üretim yöntemi olmaktan çıkmıştır. Tüm yürütüm katmanı etkinliği, hisse ispatı doğrulayıcıları tarafından yayınlanan ve onaylanan "işaret blokları" halinde paketlenir. İşaret bloklarını onaylama ve yayınlama ödülleri, fikir birliği katmanında ayrıca hesaba katılır.

### Fikir birliği katmanı ihracı {#cl-issuance-post-merge}

Fikir birliği katmanı ihracı bugün de Birleşim'den önceki gibi, blokları onaylayan ve öneren doğrulayıcılar için küçük ödüllerle devam etmektedir. Doğrulayıcı ödülleri, fikir birliği katmanında yönetilen _doğrulayıcı bakiyelerinde_ birikmeye devam eder. Ana Ağ'da işlem yapabilen mevcut hesapların (\"yürütüm\" hesapları) aksine, bu ayrı Ethereum hesapları diğer Ethereum hesaplarıyla serbestçe işlem yapamaz. Bu hesaplardaki fonlar yalnızca belirtilen tek bir yürütme adresine çekilebilir.

Nisan 2023'te gerçekleşen Shanghai/Capella yükseltmesinden bu yana, bu para çekme işlemleri paydaşlar için etkinleştirilmiştir. Paydaşlar, aksi takdirde kilit ağırlıklarına katkıda bulunmadığı için (en fazla 32'dir) _kazançlarını/ödüllerini (32 ETH'nin üzerindeki bakiye)_ çekmeye teşvik edilir.

Paydaşlar ayrıca çıkış yapmayı ve tüm doğrulayıcı bakiyelerini çekmeyi de seçebilirler. Ethereum'un istikrarlı kalmasını sağlamak için, aynı anda ayrılan doğrulayıcıların sayısı sınırlandırılmıştır.

Toplam doğrulayıcı sayısının yaklaşık %0,33'ü belirli bir günde çıkış yapabilir. Varsayılan olarak, dönem başına dört (4) doğrulayıcı çıkış yapabilir (her 6,4 dakikada bir veya günde 900). 262.144 (2<sup>18</sup>) üzerindeki her 65.536 (2<sup>16</sup>) ek doğrulayıcı için ilave bir (1) doğrulayıcının çıkış yapmasına izin verilir. Örneğin, 327.680'den fazla doğrulayıcı ile dönem başına beş (5) doğrulayıcı ayrılabilir (günde 1.125). Toplam aktif doğrulayıcı sayısı 393.216'nın üzerine çıktığında altı (6) doğrulayıcıya izin verilecek ve bu şekilde devam edecektir.

Daha fazla doğrulayıcı para çektikçe, büyük, istikrarı bozan miktarlardaki kilitlenmiş ETH'nin aynı anda çekilmesini kasıtlı olarak önlemek için çıkış yapan doğrulayıcıların maksimum sayısı kademeli olarak minimum dörde düşürülecektir.

### Birleşim sonrası enflasyon dökümü {#post-merge-inflation-breakdown}

- Toplam ETH arzı: **~120.520.000 ETH** (Eylül 2022'deki Birleşim sırasında)
- Yürütüm katmanı ihracı: **0**
- Fikir birliği katmanı ihracı: Yukarıdakiyle aynı, **~%0,52** yıllık ihraç oranı (toplam 14 milyon kilitlenmiş ETH ile)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Toplam yıllık ihraç oranı: **~%0,52**

Yıllık ETH ihracında net düşüş: **~%88,7** ((%4,61 - %0,52) / %4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> Yakım {#the-burn}

ETH dağıtımının karşısındaki güç ETH yakma oranıdır. Ethereum üzerinde bir işlemin gerçekleştirilebilmesi için, bir minimum ücret (ana ücret) ödenmelidir ve bu fiyat ağ aktivitesine bağlı olarak sürekli olarak dalgalanır (bloktan bloka). Ücret ETH olarak ödenir ve işlemin geçerli sayılması için _gereklidir_. Bu ücret, işlem sürecinde _yakılır_ ve dolaşımdan kaldırılır.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Ücret yakma, Ağustos 2021'de [London yükseltmesiyle](/ethereum-forks/#london) yürürlüğe girdi ve Birleşim'den bu yana değişmeden kaldı. </AlertDescription> </AlertContent> </Alert>

London yükseltmesinde uygulanan ücret yakımına ek olarak doğrulayıcılar çevrimdışı olmaları sebebiyle ceza alabilir, hatta daha kötüsü, belirli kurallara uymayarak ağın güvenliğini tehdit ettikleri için paralarının bir kısmını kaybedebilir ve atılabilirler. Bu cezalar doğrulayıcı bakiyelerinde azaltma ile sonuçlanabilir ve bu bakiyeler başka hesaplara ödül olarak verilmeden yakılır/dolaşımdan kaldırılır.

### Deflasyon için ortalama gaz fiyatını hesaplama {#calculating-average-gas-price-for-deflation}

Yukarıda da bahsedildiği gibi, belirli bir günde dağıtılan ETH miktarı, hisselenmiş toplam ETH miktarına bağlıdır. Bu yazı yazıldığı sırada bu miktar ortalama günlük 1700 ETH idi.

24 saatlik periyotta bu dağıtımı tamamen dengelemek için gerekli gaz ücretini belirlemek için bir gün içindeki toplam blokları hesaplayarak başlayacağız, bir blok zamanını 12 saniye kabul edeceğiz:

- `(1 blok/12 saniye) * (60 saniye/dakika) = 5 blok/dakika`
- `(5 blok/dakika) * (60 dakika/saat) = 300 blok/saat`
- `(300 blok/saat) * (24 saat/gün) = 7200 blok/gün`

Her blok `15x10^6 gaz/blok` hedefler ([gaz hakkında daha fazlası](/developers/docs/gas/)). Bunu kullanarak ve günlük ETH dağıtımını 1700 ETH kabul ederek dağıtımı dengelemek için gereken ortalama gaz ücretini (gwei/gaz birimi olarak) hesaplayabiliriz:

- `7200 blok/gün * 15x10^6 gaz/blok * `**`Y gwei/gaz`**` * 1 ETH/ 10^9 gwei = 1700 ETH/gün`

`Y` için çözüm:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (yalnızca iki anlamlı basamağa yuvarlanır)

Bu son adımı yeniden düzenlemenin başka bir yolu, günlük ETH ihracını temsil eden bir `X` değişkeni ile `1700`'ü değiştirmek ve geri kalanını şu şekilde basitleştirmektir:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Bunu `X`'in bir fonksiyonu olarak basitleştirip yazabiliriz:

- `f(X) = X/108` burada `X` günlük ETH ihracıdır ve `f(X)` yeni ihraç edilen tüm ETH'yi dengelemek için gereken gwei/gaz fiyatını temsil eder.

Örneğin, toplam kilitlenmiş ETH'ye bağlı olarak `X` (günlük ETH ihracı) 1800'e yükselirse, `f(X)` (tüm ihracı dengelemek için gereken gwei) o zaman `17 gwei` olur (2 anlamlı basamak kullanılarak)

## Daha fazla kaynak {#further-reading}

- [Birleşim](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _ETH ihracını ve yakımını gerçek zamanlı olarak görselleştirmek için mevcut panolar_
- [Ethereum İhracını Grafikleme](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
