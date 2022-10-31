---
title: Ethereum Enerji Tüketimi
description: Ethereum'un enerji tüketimini anlamak için ihtiyacınız olan temel bilgiler.
lang: tr
---

# Ethereum enerji tüketimi {#introduction}

Ethereum'un [iş ispatı](/developers/docs/consensus-mechanisms/#proof-of-work) ile mevcut enerji harcaması çok yüksek ve sürdürülemez. Enerji harcaması sorunlarını güvenlik ve merkeziyetsizleşmeden ödün vermeden çözmek kayda değer bir teknik zorluktur ve bu zorluk, yıllardır araştırma ve geliştirmenin odağı olmuştur. Ethereum'un oluşumunun neden yüksek bir çevresel etkiye yol açtığını ve yaklaşan [hisse ispatı](/developers/docs/consensus-mechanisms/pos) ağ yükseltmesinin bunu önemli ölçüde nasıl değiştirebileceğini keşfedelim.

## Enerji, ağı korur {#energy-secures-the-network}

Ethereum blok zincirindeki işlemler [madenciler](/developers/docs/consensus-mechanisms/pow/mining) tarafından doğrulanır. Madenciler, işlemleri sıralı bloklar hâlinde bir araya toplar ve bunları Ethereum blok zincirine ekler. Yeni bloklar, işlemleri bağımsız olarak yürüten ve geçerli olduklarını doğrulayan diğer tüm düğüm operatörlerine yayınlanır. Herhangi bir sahtekârlık, farklı düğümler arasında bir tutarsızlık olarak ortaya çıkar. Dürüst bloklar blok zincirine eklenir ve tarihinin değişmez bir parçası hâline gelir.

Herhangi bir madencinin yeni blok ekleme kabiliyeti, yalnızca madencilikle ilgili bir maliyet varsa ve hangi düğümün bir sonraki bloğu gönderdiğine ilişkin öngörülemezlik varsa işe yarar. Bu koşullar, iş ispatı (PoW) uygulanarak karşılanır. Bir işlem bloğu göndermeye uygun olmak için bir madenci, saymaca bir hesaplama bulmacasını başka bir madenciden daha hızlı bir şekilde çözmelidir. Bu bulmacayı çözmek, enerji harcaması şeklinde madenciler ve maliyetler arasında rekabet yaratır. Blok zincirini başarılı bir şekilde dolandırmak için, dürüst olmayan bir madenci, pek olası olmayan ve aşırı derecede pahalı olan iş ispatı yarışını sürekli olarak kazanmak zorundadır.

Ethereum başlangıçtan itibaren iş ispatını kullandı. İş ispatından hisse ispatına geçmek, her zaman Ethereum'un esas bir amacı olmuştur. Ancak, Ethereum'un temel prensipleri olan güvenlik ve merkeziyetsizliğe uyan bir hisse ispatı sistemi geliştirmek kolay değildir. Geçişin mümkün olduğu noktaya ulaşmak; kriptografide, kriptoekonomide ve mekanizma dizaynında birçok araştırma ve ilerleme gerektirdi.

## İş ispatı enerji harcaması {#proof-of-work}

İş ispatı, ağı güvenli kılmak ve blok zincirine güvenilir değişiklikler uygulamak için sağlam bir yoldur ancak birkaç sebepten dolayı sıkıntılıdır. Bir bloğu çıkartma hakkı rastlantısal bir hesaplama yapbozu çözmeyi gerektirdiği için madenciler başarı ihtimallerini daha güçlü donanımlara yatırım yaparak artırabilirler. Bu durum, madencilerin daha da enerjiye aç madencilik ekipmanları alarak bir silahlanma yarışına girmesine neden olur. Şu anda Ethereum'un iş ispatı protokolünün toplam yıllık güç tüketimi ortalama olarak Finlandiya'nınkine eşittir <sup>[^1]</sup> ve karbon ayak izi İsviçre'ninkine benzer seviyededir <sup>[^1]</sup>.

## Hisse ispatı {#proof-of-stake}

Ethereum için daha yeşil bir gelecek, şu anda zaten bir [**hisse ispatı (PoS)** zinciri](/upgrades/beacon-chain/) şeklinde inşa ediliyor. [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/) altında, saymaca yapbozlar çözmek gereksizdir. Yapboz çözümünün kaldırılması ağı korumak için gereken enerji miktarını büyük miktarda azaltmaktadır. Madencilerin yerini, aynı fonksiyonu gerçekleştiren ama varlıklarını hesaplama işi aracılığıyla tüketmek yerine sahtekâr davranışlara karşı teminat olarak ETH stake eden doğrulayıcılar alır. Eğer doğrulayıcı tembelse (doğrulayıcı görevini yerine getirmesi gerekirken çevrimdışıysa) stake ettikleri ETH yavaşça tükenebilir, bu sırada kanıtlanabilir biçimde sahtekâr davranışlar, stake edilmiş varlıkların "kesilmesi" ile sonuçlanır. Bu, ağı korumak için aktif ve dürüst katılımı fazlasıyla teşvik eder.

İş ispatına benzer bir şekilde, kötü niyetli bir oluşum [%51 saldırısı](/glossary/#51-attack) gerçekleştirebilmek için ağda stake edilmiş ETH'nin en az %51'ine ihtiyaç duyar. Ancak, başarısız bir saldırıdaki potansiyel kaybın sadece madencilik yapmak için gereken hash gücünü yaratma maliyeti olduğu iş ispatının aksine hisse ispatında, bir saldırıda olabilecek muhtemel kayıp, teminat olarak kullanılan tüm ETH miktarıdır. Bu caydırıcı yapı, hisse ispatı ile ağ güvenliğine olanak sağlar ve saymaca hesaplamalarla tüketilen enerjiye duyulan ihtiyacı yok eder. Hisse ispatı altında ağ güvenliği hakkında detaylı açıklamalara [buradan](/developers/docs/consensus-mechanisms/pos/) ve [buradan](https://vitalik.ca/general/2017/12/31/pos_faq.html) erişebilirsiniz.

## Birleştirme {#the-merge}

Hisse ispatı protokolünün uygulanabilirliğini gösteren [İşaret Zinciri](/upgrades/beacon-chain/) isimli fonksiyonel hisse ispatı zinciri, Aralık 2020'den beri çalışmaktadır. Birleştirme, Ethereum'un iş ispatını geride bıraktığı ve hisse ispatını tamamen benimsediği zamandır. Birleşmenin 2022'nin üçüncü veya dördüncü çeyreğinde gerçekleşmesi bekleniyor. [Birleştirme hakkında daha fazla bilgi](/upgrades/merge/).

## Hisse ispatı enerji harcaması {#proof-of-stake-energy}

İşaret Zinciri, hisse ispatı mekanizmasına güven inşa etmesinin yanında, Ethereum'un birleştirme sonrası enerji kullanımı için tahminlere da olanak verir. [Yakın zamandaki bir tahminde](https://blog.ethereum.org/2021/05/18/country-power-no-more/), hisse ispatının iş ispatından enerji bakımından 2000 kat daha tasarruflu olduğu için, hisse ispatı ile yapılacak bir birleştirmenin toplam enerji kullanımında %99,95'lik bir düşüş sağlayabileceğini öne sürdü. Ethereum'un enerji harcaması, yaklaşık olarak ağdaki her bir düğüm için bir ev bilgisayarı çalıştırmanın maliyetine eşit olacak.

![resim](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>Figürde kullanılan işlem başına iş ispatı enerji tüketimi için <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">Mayıs 2021 verileri</a> temel alınmıştır; aynı kaynak, yazım sırasında bu değerin <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 Kwh</a> olduğunu öne sürmektedir</i></small></p>

Bu sayıları Visa gibi bir hizmetle karşılaştıralım. 100.000 Visa işlemi, 149 kWh enerji kullanır<sup>[^2]</sup>. Parçalamanın yürürlüğe konulduğunu varsayarsak, Ethereum'un mevcut işlem oranı (saniyede 15 işlem) toplamalardan gelen ek optimizasyonlar hariç en az 64 kat artacak (parça sayısı). Birleştirme sonrası için gerçekçi bir tahmin olarak, toplamalarla birlikte parçalanmış Ethereum ile saniyede [25.000 ila 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) işlem olacağı söylenebilir. Bu bilgiyi 100.000 işlem başına maksimum ve minimum enerji harcamasını tahmin etmek için kullanabiliriz.

- Saniyede 25.000 işlem.
- 100.000 işlemi işlemek, `100,000 / 25,000 = 4` saniye alır.

Ağın teminatı olarak 10.000 aktif doğrulayıcı olduğunu düşünüp makul bir tahmin yaparak da Ethereum'un saniye başına enerji harcamasını tahmin edebiliriz. (Şu anda [İşaret Zincirinde 250.000 doğrulayıcı](https://beaconscan.com/) bulunmaktadır ancak doğrulayıcıların çoğu tek bir düğüm üzerinde çalışabilir. Şu anda 3.000 ila 4.000 arası bireysel düğüm olduğu tahmin edildiği için 10.000, birleştirme sonrası için makul bir tahmindir):

Günlük `1.44kWh daily usage * 10,000 network nodes = 14,400kWh`. Bir günde 86.400 saniye bulunmaktadır, yani saniye başına `14,400 / 86,400 = 0.1667 kWh` eder.

Eğer bunu 100.000 işlemi gerçekleştirmenin aldığı süreyle çarparsak: `0.1667 * 4 = 0.667 kWh`.

Bu, Visa tarafından aynı sayıda işlem için kullanılan enerjinin yaklaşık %0,4'ü, veya Ethereum'un mevcut iş ispatı ağıyla karşılaştırıldığında yaklaşık 225 kat değerinde bir enerji harcaması düşüşüdür.

Hesabı saniye başına maksimum işlemle tekrar etmek, saniyede 0,1667 kWh sonucunu ortaya çıkartır, bu da Visa'nın harcadığı enerjinin %0,1'i veya 894 kat aşağısıdır.

_Not: Ethereum'un enerji kullanımı zaman tabanlı olduğu için işlem sayılarına göre karşılaştırma yapmak tamamen isabetli bir sonuç vermez. Ethereum'un 1 dakikada kullandığı enerji miktarı, 1 işlem de yapsa 1.000 işlem de yapsa aynıdır._

_Ayrıca Ethereum'un basit mali işlemlerle sınırlı olmadığını ve akıllı sözleşmeler ile merkeziyetsiz uygulamalar için inşa edilmiş tam bir platform olduğunu da hesaba katmalıyız._

## Daha yeşil bir Ethereum {#green-ethereum}

Ethereum'un enerji tüketimi tarihsel olarak önemli olsa da, enerjiye aç bir blok doğrulamadan enerji açısından verimli bir blok doğrulamaya geçiş için büyük miktarda geliştirici zamanı ve zekası da harcandı. [Bankless](http://podcast.banklesshq.com/)'a göre, iş ispatı tarafından tüketilen enerjiyi azaltmanın en iyi yolu, en basit hâliyle iş ispatını "kapatmaktır", Ethereum da bu yaklaşımı benimsemiştir.

<InfoBanner emoji=":evergreen_tree:">
  Eğer bu istatistiklerin yanlış olduğunu veya daha isabetli olabileceğini düşünüyorsanız, lütfen bir PR veya konu açın. Bunlar, ethereum.org ekibi tarafından herkese açık bilgiler ve mevcut Ethereum yol haritası kullanılarak yapılan tahminlerdir. Bu ifadeler, Ethereum Vakfı'nın resmi bir vaadini temsil etmiyor. 
</InfoBanner>

## Daha fazla okuma {#further-reading}

- [Artık bir ülkeyle eş güç harcanmıyor](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 Mayıs 2021_
- [Ethereum'un enerji tüketimi](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum Emisyonları: Toplu bir Tahmin](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Enerji Tüketimi Endeksi](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*

## İlgili konular {#related-topics}

- [Ethereum'un vizyonu](/upgrades/vision/)
- [İşaret Zinciri](/upgrades/beacon-chain)
- [Birleştirme](/upgrades/merge/)
- [Parçalama](/upgrades/beacon-chain/)

### Dipnotlar ve kaynaklar {#footnotes-and-sources}

#### 1. Ethereum iş ispatı enerji tüketimi {#fn-1}

[Ethereum Dahil Ülke Başına Enerji Tüketimi (Yıllık hesaplanmış TWh)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Visa enerji tüketimi {#fn-2}

[2020 itibarı ile Bitcoin ağının işlem başına ortalama enerji tüketiminin VISA ağı ile karşılaştırılması, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Visa finans raporu 4. Çeyrek 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
