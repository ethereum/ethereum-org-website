---
title: Birleşim ETH arzını nasıl etkiledi
description: Birleşim'in ETH arzını nasıl etkilediğinin analizi
lang: tr
---

# Birleşim ETH arzını nasıl etkiledi {#how-the-merge-impacts-ETH-supply}

Birleşim, Ethereum ağının iş ispatından hisse ispatına geçişini teslim eder, bu olay Eylül 2022'de gerçekleşmiştir. ETH'nin dağıtım methodu bu geçişten sonra değişmiştir. Öncesinde ETH iki kaynaktan dağıtılıyordu: yürütüm katmanı (ör. Ana Ağ) ve fikir birliği katmanı (ör. İşaret Zinciri). Birleşim'den beri yürütüm katmanındaki dağıtım yapılmamaktadır. Hadi açıklayalım.

## ETH dağıtımının bileşenleri {#components-of-eth-issuance}

ETH arzını iki parçaya ayırabiliriz: dağıtma ve yakma.

ETH **dağıtımı**, daha önce var olmayan ETH'in oluşturulma sürecidir. ETH **yakımı**, var olan ETH'in yok edilmesi ve kullanımdan kaldırılmasıdır. Dağıtım ve yakım oranları belirli parametreler kullanılarak hesaplanır ve aralarındaki denge, ortaya çıkan Ether enflasyon/deflasyon oranını belirler.

<Card
emoji=":chart_decreasing:"
title="ETH dağıtımı &quot;çok uzun, okumadım&quot;">

- Hisse ispatına geçilmeden önce madenciler günlük ortalama 13.000 ETH dağıtıyordu
- Paydaşlar, 14 milyon hisselenmiş ETH'e dayalı olarak günlük ortalama 1.700 ETH dağıtıyor
- Kesin dağıtım miktarı hisselenmiş ETH miktarına göre dalgalanıyor
- Birleşim'den beri günde yaklaşık 1.700 ETH dağıtılıyor, yani üretim nerdeyse %88 oranında düşük
- Yakma: Ağdaki talebe göre dalgalanıyor. _Eğer_ belirli bir gündeki ortalama gaz ücreti en az 16 gwei ise, bu durum doğrulayıcılara dağıtılan ortalama 1.700 ETH'yi dengeler ve ETH enflasyonunu sıfıra da ya daha aza indirir.

</Card>

## Birleşim öncesi (tarihsel) {#pre-merge}

### Yürütüm katmanı dağıtımı {#el-issuance-pre-merge}

İş ispatı bünyesinde madenciler sadece yürütüm katmanıyla etkileşime girerdi ve bir sonraki bloku çözen ilk madenci blok ödülüyle ödüllendirilirdi. 2019'da gerçekleşen [Constantinople yükseltmesinden](/history/#constantinople) beri bu ödül blok başına 2 ETH idi. Madenciler en uzun/kurallı zincirde yer almayan geçerli [ommer](/glossary/#ommer) blokların yayınlanması sonucunda da ödüllendirilirdi. Bu ödüller ommer blok başına en fazla 1.75 ETH idi ve kurallı bloka verilen ödüle _ek olarak_ verilirdi. Madencilik süreci ekonomik olarak maliyetliydi ve sürdürülebilmesi zamanında yüksek düzeyde ETH dağıtımı gerekliydi.

### Fikir birliği katmanı dağıtımı {#cl-issuance-pre-merge}

[İşaret Zinciri](/history/#beacon-chain-genesis) 2020'de yürürlüğe girdi. Madenciler yerine hisseleme ispatı kullanan doğrulayıcılar tarafından güvence altına alındı. Zincir, Ana Ağ'da (yürütüm katmanında) akıllı kontratlara tek yönlü ETH yatıran Ethereum kullanıcıları tarafından önyüklendi. İşaret Zinciri Ana Ağı dinleyerek kullanıcılara yeni zincirde aynı miktarda ETH yatırdı. Birleşim gerçekleşene kadar İşaret Zinciri'nin doğrulayıcıları işlemleri işlemiyordu, doğrulayıcı havuzunun durumu hakkındaki mutabakata varıyordu.

İşaret Zincirindeki doğrulayıcılar zincirin durumunu onayladıklarına ve blok önerdiklerinde ETH ile ödüllendirilir. Ödüller (veya cezalar) doğrulayıcı performansına dayanarak her dönemde (6,4 dakikada bir) hesaplanır ve dağıtılır. Doğrulayıcı ödülleri eskiden iş ispatı üzerine dağıtılan madenci ödüllerine kıyasla **çok** düşüktür (her 13,5 saniyede 2 ETH).

### Birleşim öncesi dağıtım analizi {#pre-merge-issuance-breakdown}

Toplam ETH arzı: **~120.520.000 ETH** (Birleşim gerçekleştiğinde Eylül 2022'deki veriler)

**Yürütüm katmanı dağıtımı:**

- Tahmini her 13,3 saniyede 2,08 ETH \*: bir yılda dağıtılan **~4.930.000** ETH
- **Nerdeyse %4,09** enflasyon oranı ile sonuçlandı (yılda 4,93M/toplam 120,5M)
- \* Buna her kurallı blokta 2 ETH ve ek olarak ommer bloklardan zaman içinde ortalama 0,08 ETH dahildir. Hehangi bir [bomba değeri](/glossary/#difficulty-bomb) etkisi olmadan temel blok zaman hedefi 13,3 saniyedir. ([Kaynağı görüntüle](https://bitinfocharts.com/ethereum/))

**Fikir birliği katmanı dağıtımı:**

- Toplam hisselenen 14.000.000 ETH ile ETH dağıtım oranı ortalama günlük 1700 ETH'dir. ([Kaynağı görüntüle](https://ultrasound.money/))
- Yıllık **~620.500** dağıtımı ile sonuçlanır
- **Yaklaşık %0.52** enflasyon oranı ile sonuçlanır (yıllık 620,5K/toplam 119,3M)

<InfoBanner>
<strong>Toplam yıllık dağıtım oranı (Birleşim öncesi): ~%4,61</strong> (%4,09 + %0,52)<br/><br/>
Dağıtımın <strong>~%88,7'i</strong> yürütüm katmanındaki madencilere gidiyordu (4,09/4,61 * 100)<br/><br/>
<strong>~%11,3'i</strong> fikir birliği katmanındaki paydaşlara dağıtılıyordu (0,52/4,61 * 100)
</InfoBanner>

## Birleşim sonrası (günümüz) {#post-merge}

### Yürütüm katmanı dağıtımı {#el-issuance-post-merge}

Birleşimden sonra yürütüm katmanı dağıtımı sıfırdır. Güncel mutabakat kuralları çerçevesinde iş ispatı artık geçerli bir blok üretim yöntemi olmaktan çıkmıştır. Tüm yürütüm katmanı aktiviteleri, hisse ispatı doğrulayıcıları tarafından yayınlanan ve kanıtlanan işaret blokları altında toplanmıştır. Kanıtlama ve işaret blokları yayınlama ödülleri fikir birliği katmanında ayrıca hesaplanır.

### Fikir birliği katmanı dağıtımı {#cl-issuance-post-merge}

Fikir birliği katmanı dağıtımı, Birleşim öncesinde olduğu gibi, blok öneren ve kanıtlayan doğrulayıcılara küçük ödüller vererek devam eder. Doğrulayıcı ödülleri, fikir birliği katmanında yönetilen _doğrulayıcı bakiyelerinde_ birikmeye devam eder. Bu Ethereum hesapları ayrıdır ve Ana Ağ üzerinde işlem yapabilen diğer hesapların aksine ("uygulama" hesapları) bunlar diğer Ethereum adresleriyle özgürce işlem yapamaz. Bu hesaplardaki fonlar yalnızca belirlenmiş bir yürütme adresine çekilebilir.

Nisan 2023'te gerçekleşen Shanghai/Capella yükseltmesinden beri bu para çekme işlemleri paydaşlar için etkinleştirilmiştir. Paydaşlar _kazançlarını/ödüllerini (32 ETH üzerindeki bakiye)_ kaldırmak üzere teşvik edilir çünkü bu fonlar hisse ağırlıklarına katkıda bulunmazlar (32 maksimum değerdir).

Paydaşlar aynı zamanda çıkmayı ve tüm doğrulayıcı bakiyelerini geri çekmeyi seçebilir. Ethereum'un stabil olduğundan emin olmak için aynı anda sistemi terk eden doğrulayıcı sayısı sınırlanmıştır.

Toplam doğrulayıcıların nerdeyse %0,33'ü belirli bir gün içerisinde çıkabilir. Varsayım olarak her dönemde dört (4) doğrulayıcı çıkabilir (her 6,4 dakikada bir ya da her gün 900). 262.144 (2<sup>18</sup>) üzerindeki her ek 65.536 (2<sup>16</sup>) doğrulayıcı için fazladan bir (1) doğrulayıcının çıkmasına izin verilir. Örneğin 327.680 doğrulayıcı ile her dönemde beş (5) kişi ayrılabilir (günde 1.125). Bu kurala dayalı olarak doğrulayıcı sayısının 393.216 olması durumunda altı (6) kişinin çıkmasına izin verilir.

Daha fazla doğrulayıcı parasını çektikçe, hisselenmiş yüksek miktarda ETH'nin kasıtlı ve eş zamanlı olarak çekilmesini ve istikrar bozulmasını önlemek için mevcut doğrulayıcı sayısı minimum 4 olacak şekilde git gide düşecektir.

### Birleşim sonrası enflasyon analizi {#post-merge-inflation-breakdown}

- Toplam ETH arzı: **~120.520.000 ETH** (Birleşim gerçekleştiğinde Eylül 2022'deki veriler)
- Yürütüm katmanı dağıtımı: **0**
- Fikir birliği katmanı dağıtımı: Yukardakiyle aynı şekilde %**~0,52** yıllıklaştırılmış dağıtım oranı (toplam 14 millyon hisselenmiş ETH)

<InfoBanner>
Toplam yıllıklaştırılmış dağıtım oranı: <strong>~%0,52</strong><br/><br/>
ETH dağıtımındaki net azalma: <strong>~%88,7</strong> ((%4,61 - %0,52)/%4,61 * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" />Yakma {#the-burn}

ETH dağıtımının karşısındaki güç ETH yakma oranıdır. Ethereum üzerinde bir işlemin gerçekleştirilebilmesi için, bir minimum ücret (ana ücret) ödenmelidir ve bu fiyat ağ aktivitesine bağlı olarak sürekli olarak dalgalanır (bloktan bloka). Bu ücret ETH olarak ödenir ve işlemin geçerli olarak kabul edilmesi için _zorunludur_. Bu ücret, işlem sırasında _yakılır_ ve dolaşımdan kaldırılır.

<InfoBanner>
Ücret yakımı Ağustos 2021'de <a href="/history/#london">London yükseltmesi</a> ile yürürlüğe girmiştir ve Birleşim'den bu yana değişmemiştir.
</InfoBanner>

London yükseltmesinde uygulanan ücret yakımına ek olarak doğrulayıcılar çevrimdışı olmaları sebebiyle ceza alabilir, hatta daha kötüsü, belirli kurallara uymayarak ağın güvenliğini tehdit ettikleri için paralarının bir kısmını kaybedebilir ve atılabilirler. Bu cezalar doğrulayıcı bakiyelerinde azaltma ile sonuçlanabilir ve bu bakiyeler başka hesaplara ödül olarak verilmeden yakılır/dolaşımdan kaldırılır.

### Deflasyon için ortalama gaz ücretinin hesaplanması {#calculating-average-gas-price-for-deflation}

Yukarıda da bahsedildiği gibi, belirli bir günde dağıtılan ETH miktarı, hisselenmiş toplam ETH miktarına bağlıdır. Bu yazı yazıldığı sırada bu miktar ortalama günlük 1700 ETH idi.

24 saatlik periyotta bu dağıtımı tamamen dengelemek için gerekli gaz ücretini belirlemek için bir gün içindeki toplam blokları hesaplayarak başlayacağız, bir blok zamanını 12 saniye kabul edeceğiz:

- `(1 blok/12 saniye) * (60 saniye/dakika) = 5 blok/dakika`
- `(5 blok/dakika) * (60 dakika/saat) = 300 blok/saat`
- `(300 blok/saat) * (24 saat/gün) = 7200 blok/gün`

Tüm bloklar `15x10^6 gaz/blok` değerini hedefler ([daha fazla gaz](/developers/docs/gas/)). Bunu kullanarak ve günlük ETH dağıtımını 1700 ETH kabul ederek dağıtımı dengelemek için gereken ortalama gaz ücretini (gwei/gaz birimi olarak) hesaplayabiliriz:

- `7200 blok/gün * 15x10^6 gaz/blok *`**`Y gwei/gaz`**`* 1 ETH/ 10^9 gwei = 1700 ETH/gün`

`Y` için çözersek:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (yalnızca iki anlamlı basamağa yuvarlandığında)

Sondaki basamağı farklı şekilde düzenlemek için `1700`, günlük ETH dağıtımını temsil edecek `X` değişkeni ile değiştirilebilir ve aşağıdaki gibi basitleştirilebilir:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Bunu basitçe `X`'in fonksiyonu olarak yazabiliriz:

- `X`'i günlük ETH dağıtımı olarak kabul edersek `f(X) = X/108` ifadesindeki `f(X)` yeni dağıtılan tüm ETH'in dengelenmesi için gereken gwei/gas fiyatını temsil eder.

Örneğin `X` (günlük ETH dağıtımı), toplamda hisselenmiş ETH'ye bağlı olarak 1800'e çıkarsa, `f(X)` (dağıtımı dengelemek için gereken gwei) `17 gwei ` olacaktır (2 anlamlı basamak kullanılarak)

## Daha fazla bilgi {#further-reading}

- [Birleşim](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Gerçek zamanlı ETH dağıtımını ve yakımını gösteren tablolara erişebilirsiniz_
- [Ethereum Dağıtımı Grafikleri](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
