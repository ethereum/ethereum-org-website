---
title: Blok arayıcıları
description: İşlemler, hesaplar, sözleşmeler ve daha fazlası hakkında bilgi sorgulayabileceğiniz blok zinciri verileri dünyasına açılan portalınız olan blok arayıcılarına giriş.
lang: tr
sidebarDepth: 3
---

Blok arayıcıları, Ethereum'un verilerine açılan portalınızdır. Bunları; bloklar, işlemler, doğrulayıcılar, hesaplar ve diğer zincir üstü olaylarla ilgili gerçek zamanlı verileri görmek için kullanabilirsiniz.

## Ön Koşullar {#prerequisites}

Bir blok arayıcısının size verdiği verileri anlamlandırabilmeniz için Ethereum'un temel kavramlarını anlamalısınız. [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) ile başlayın.

## Hizmetler {#services}

- [Etherscan](https://etherscan.io/) -_Ayrıca Çince, Korece, Rusça ve Japonca dillerinde de mevcut_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_Ayrıca İspanyolca, Fransızca, İtalyanca, Danca, Portekizce, Rusça, Çince ve Farsça olarak da mevcut_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Blok Arayıcısı](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethernow](https://www.ethernow.xyz/)
- [Ethplorer](https://ethplorer.io/) -_Ayrıca Çince, İspanyolca, Fransızca, Türkçe, Rusça, Korece ve Vietnamca dillerinde de mevcut_
- [EthVM](https://www.ethvm.com/)
- [Oklink](https://www.oklink.com/eth)
- [Rantom](https://rantom.app/)

## Açık kaynaklı araçlar {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Veri {#data}

Ethereum, tasarımı itibariyle şeffaf olduğu için yapılan her işlem doğrulanabilir. Blok arayıcıları bu bilgiyi almak için bir arayüz desteği sağlar. Ve bu, verilere ihtiyacınız olması durumunda hem ana Ethereum ağı hem de test ağları için kullanılabilir. Veri, yürütme ve mutabakat verisi olarak ayrılır. Yürütme verisi, spesifik bir blokta yürütülen işlemleri ifade eder. Mutabakat verisi, blokların kendilerini ve bunları öneren doğrulayıcıları ifade eder.

İşte bir blok arayıcısından alabileceğiniz veri türlerinin bir özeti.

### Yürütme verisi {#execution-data}

Her 12 saniyede bir Ethereum'a yeni bloklar eklenir (eğer ki bir blok önericisi kendi turunu kaçırmazsa), yani blok arayıcılarına eklenen neredeyse sabit bir veri akışı vardır. Bloklar, yararlı bulabileceğiniz birçok önemli veri içerir:

**Standart veriler**

- Blok yüksekliği - Mevcut blokun oluşturulduğu anda blok zincirinin (blok cinsinden) blok numarası ve uzunluğu
- Zaman damgası - Bir blokun önerildiği zaman
- İşlemler - Blok içinde yer alan işlem sayısı
- Ücret alıcısı - İşlemlerden gaz ücret bahşişleri alan adres
- Blok Ödülü - Bloku öneren doğrulayıcının ödüllendirildiği ETH miktarı
- Boyut - Blok içindeki verilerin boyutu (bayt olarak ölçülür)
- Kullanılan gaz - Bloktaki işlemler tarafından kullanılan toplam gaz birimleri
- Gaz limiti - Bloktaki işlemler tarafından belirlenen toplam gaz limitleri
- Gaz başına ana ücret - Bir işlemin bir bloka dahil edilmesi için gereken minimum katsayı
- Yakılmış ücretler - Blokta yakılan ETH miktarı
- Ekstra veri - Geliştiricinin bloğa dahil ettiği herhangi bir ekstra veri

**Gelişmiş veriler**

- Karma - Blok başlığını temsil eden kriptografik karma değeri (blokun benzersiz tanımlayıcısı)
- Üst karma – Mevcut bloktan önce gelen blokun karma değeri
- StateRoot - Sistemin tüm durumunu saklayan Merkle ağacının kök karma değeri

### Gaz {#gas}

Blok araştırmacıları size işlemlerde ve bloklarda Gaz kullanımı hakkında bilgi vermekle kalmaz, bazıları size ağın mevcut gaz fiyatları hakkında da bilgi verir. Bu, ağ kullanımını anlamanıza, güvenli işlemler göndermenize ve fazla gaz harcamamanıza yardımcı olacaktır. Bu bilgileri ürününüzün arayüzüne almanıza yardımcı olabilecek API'lara bakın. Gaza özgü veriler şunları kapsar:

- Güvenli ancak yavaş bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre)
- Ortalama bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre)
- Hızlı bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre)
- Gaz fiyatına dayalı ortalama onay süresi
- Gaz tüketen sözleşmeler - diğer bir deyişle, ağda çokça kullanılan popüler ürünler
- Gaz harcayan hesaplar - başka bir deyişle, ağı sık kullanan kullanıcılar

### İşlemler {#transactions}

Blok arayıcıları, insanların işlemlerinin ilerlemesini takip etmeleri için ortak bir yer haline geldi. Bunun nedeni, alabileceğiniz ayrıntı düzeyinin ekstra kesinlik sağlamasıdır. İşlem verileri şunları içerir:

**Standart veriler**

- İşlem karması - İşlem gönderildiğinde oluşturulan karma
- Durum - İşlemin beklemede mi, başarısız mı yoksa başarılı mı olduğunun bir göstergesi
- Blok - İşlemin dahil edildiği blok
- Timestamp - Bir işlemin doğrulayıcı tarafından önerilen bir bloğa dahil edildiği zaman
- Gönderen - İşlemi gönderen hesabın adresi
- Alıcı - İşlemin etkileşimde bulunduğu alıcının veya akıllı sözleşmenin adresi
- Transfer edilen token'lar - İşlemin bir parçası olarak transfer edilen token'ların listesi
- Değer - Transfer edilen toplam ETH değeri
- İşlem ücreti - İşlemi gerçekleştirmek için doğrulayıcıya ödenen miktar (gaz fiyatı\*kullanılan gaz ile hesaplanır)

**Gelişmiş veriler**

- Gaz limiti - Bu işlemin tüketebileceği maksimum gaz birimi sayısı
- Kullanılan gaz - İşlemin tükettiği gerçek gaz birimi miktarı
- Gaz fiyatı - Gaz birimi başına belirlenen fiyat
- Tek seferlik sayı - `başlangıç` adresinin işlem numarası (bu değerin 0'dan başladığını, bu nedenle `100` olan bir tek seferlik sayı değerinin aslında bu hesap tarafından gönderilen 101. işlem olduğunu unutmayın
- Giriş verisi – İşlemin gerektirdiği herhangi bir ek bilgi

### Hesaplar {#accounts}

Bir hesap hakkında erişebileceğiniz çok fazla veri var. Bu nedenle, varlıklarınızın ve değerinizin kolayca izlenememesi için genellikle birden fazla hesap kullanmanız önerilir. İşlemleri ve hesap hareketlerini daha özel hale getirmek için geliştirilmekte olan bazı çözümler de bulunmaktadır. Ancak, işte hesaplar hakkında mevcut olan veriler:

**Kullanıcı hesapları**

- Hesap adresi - Fon göndermek için kullanabileceğiniz herkese açık adres
- ETH bakiyesi - Bu hesapla ilişkili ETH miktarı
- Toplam ETH değeri - ETH'nin değeri
- Token'lar - Hesapla ilişkili token'lar ve bunların değeri
- İşlem geçmişi - Bu hesabın gönderen veya alıcı olduğu tüm işlemlerin listesi

**Akıllı sözleşmeler**

Akıllı sözleşme hesapları, bir kullanıcı hesabının sahip olacağı tüm verilere sahiptir ancak bazı blok arayıcıları bazı kod bilgilerini de görüntüler. Örneğin:

- Sözleşme yaratıcısı - Sözleşmeyi Ana Ağ'a dağıtan adres
- Yaratım işlemi - Ana Ağ'a dağıtımı içeren işlem
- Kaynak kodu - Akıllı sözleşmenin solidity veya vyper kodu
- Sözleşme ABI'sı - Sözleşmenin Uygulama İkili Arayüzü - sözleşmenin yaptığı çağrılar ve alınan veriler
- Sözleşme oluşturma kodu - Akıllı sözleşmenin derlenmiş bayt kodu - Solidity veya Vyper vb. ile yazılmış bir akıllı sözleşmeyi derlerken oluşturulur.
- Sözleşme olayları - Akıllı sözleşmede çağırılan metotların bir geçmişi - temelde sözleşmenin nasıl ve ne sıklıkla kullanıldığını görmek için bir yol

### Token'lar {#tokens}

Token'lar bir tür sözleşmedir, bu nedenle akıllı sözleşmelere benzer verilere sahip olurlar. Ancak değerli oldukları ve alınıp satılabildikleri için ek veri noktalarına sahiptirler:

- Tür - ERC-20, ERC-721 veya diğer token standartları arasında hangi türden oldukları bilgisi
- Fiyat - Eğer bir ERC-20 ise, mevcut piyasa fiyatına sahiptirler
- Piyasa değeri - Eğer bir ERC-20 ise, bir piyasa değerine sahip olurlar (fiyat\*toplam arza göre hesaplanır)
- Toplam arz - Dolaşımdaki token sayısı
- Sahipler - Token'ı tutan adreslerin sayısı
- Transferler - Token'ın hesaplar arasında kaç kez transfer edildiği
- İşlem geçmişi - Token dahil tüm işlemlerin geçmişi
- Sözleşme adresi - Ana Ağ'a dağıtılan token'ın adresi
- Ondalık Sayılar - ERC20 token'ları bölünebilirdir ve ondalık basamaklara sahiptir

### Ağ {#network}

Bazı blok verileri Ethereum'un durumu hakkında daha bütüncül olarak endişelidir.

- Toplam işlem - Ethereum'un oluşturulmasından bu yana gerçekleşen işlem sayısı
- Saniyedeki işlem sayısı - Bir saniye içinde işlenebilen işlem sayısı
- ETH fiyatı - 1 ETH'nin mevcut değerlemesi
- Toplam ETH arzı - Dolaşımdaki ETH sayısı–her bloğun oluşumu ile blok ödülleri şeklinde yeni ETH oluşturulduğunu unutmayın
- Piyasa değeri - Fiyat\*arz ile hesaplanır

## Mutabakat katmanı verileri {#consensus-layer-data}

### Dönem {#epoch}

Güvenlik sebeplerinden dolayı, her dönemin sonunda (her 6,4 dakikada bir) doğrulayıcılardan rastgele kurullar oluşturulmaktadır. Dönem verileri şunları içerir:

- Dönem numarası
- Kesinleşmiş durum - Dönemin kesinleşmiş olup olmadığı (Evet/Hayır)
- Zaman - Dönemin sona erdiği zaman
- Tasdikler - Dönemdeki tasdik sayısı (yuvalar içindeki bloklar için oy)
- Yatırmalar - Döneme dahil olan ETH yatırma işlemlerinin sayısı (doğrulayıcıların doğrulayıcı olmak için ETH hisselemeleri gerekir)
- Cezalar - Blok önerenlere veya tasdik edenlere verilen cezaların sayısı
- Oylama katılımı - Blokları tasdik etmek için kullanılan hisselenmiş ETH miktarı
- Doğrulayıcılar - Dönem için aktif olan doğrulayıcıların sayısı
- Ortalama Doğrulayıcı bakiyesi - Aktif doğrulayıcılar için ortalama bakiye
- Yuvalar - Döneme dahil edilen yuva sayısı (yuvalar bir geçerli blok içerir)

### Yuva {#slot}

Yuvalar, blok oluşturma fırsatlarıdır; her yuva için mevcut veriler şunları içerir:

- Dönem - Yuvanın geçerli olduğu dönem
- Yuva numarası
- Durum - Yuvanın durumu (Önerilen/Kaçırılmış)
- Süre - Yuvanın zaman damgası
- Önerici - Yuva için bloku öneren doğrulayıcı
- Blok kökü - BeaconBlock'un karma ağaç kökü
- Üst kök - Daha önce gelen blokun karma değeri
- Durum kökü - BeaconState'in karma ağaç kökü
- İmza
- Randao gösterimi
- Graffiti - Blok öneren varlık, blok önerisine 32 bayt uzunluğunda bir mesaj ekleyebilir
- Yürütme Verisi
  - Blok karması
  - Yatırma sayısı
  - Yatırma kökü
- Tasdikler - Bu yuvadaki blok için tasdik sayısı
- Yatırmalar - Bu yuva esnasındaki yatırma sayısı
- Gönüllü çıkışlar - Yuva esnasında çıkan doğrulayıcıların sayısı
- Cezalar - Blok önerenlere veya tasdik edenlere verilen cezaların sayısı
- Oylar - Bu yuvadaki bloka oy veren doğrulayıcılar

### Bloklar {#blocks-1}

Hisse ispatı, zamanı yuvalar ve dönemlere böler. Yani bu yeni veriler demektir!

- Önerici - Yeni bloku önermek için algoritmik olarak seçilen doğrulayıcı
- Dönem - Blokun önerildiği dönem
- Yuva - Blokun önerildiği yuva
- Tasdikler - Yuvaya dahil olan tasdiklerin sayısı - tasdikler blokun İşaret Zinciri'ne gitmeye hazır olduğunu gösteren oylar gibidirler

### Doğrulayıcılar {#validators}

Doğrulayıcılar, bloklar önermekten ve bu blokları yuvalar içinde tasdik etmekten sorumludur.

- Doğrulayıcı numarası - Doğrulayıcıyı temsil eden benzersiz bir sayı
- Mevcut bakiye - Ödüller dahil doğrulayıcının bakiyesi
- Etkin bakiye - Doğrulayıcının hisseleme için kullanılan bakiyesi
- Gelir - Doğrulayıcı tarafından alınan ödüller veya cezalar
- Durum - Doğrulayıcının şu anda çevrimiçi ve aktif olup olmadığı
- Tasdik etkililiği - Doğrulayıcının tasdiklerinin zincire dahil edilmesi için geçen ortalama süre
- Aktivasyon için uygunluk - Doğrulayıcının doğrulamaya uygun hale geldiği tarih (ve dönem)
- Şu zamandan beri aktif - Doğrulayıcının aktif hale geldiği tarih (ve dönem)
- Önerilen bloklar - Doğrulayıcının önerdiği blok
- Tasdikler - Doğrulayıcının sağladığı tasdikler
- Yatırımlar - Gönderen adresi, işlem karması, blok numarası, zaman damgası ve doğrulayıcının hisse yatırma miktarı ve durumu

### Tasdikler {#attestations}

Tasdikler, zincire blok eklemek için verilen "evet" oylarıdır. Verileri, tasdikin kaydı ve tasdik eden doğrulayıcılarla ilgilidir.

- Yuva - Tasdikin gerçekleştiği yuva
- Kurul endeksi - Verilen yuvadaki kurulun endeksi
- Toplama bitleri - Tasdike katılan tüm doğrulayıcıların toplanmış tasdikini temsil eder
- Doğrulayıcılar - Tasdik sağlayan doğrulayıcılar
- İşaret bloku kökü - Doğrulayıcıların tasdik ettiği bloka işaret eder
- Kaynak - En son gerekçelendirilmiş dönemi gösterir
- Hedef - En son dönem sınırını gösterir
- İmza

### Ağ {#network-1}

Fikir birliği katmanı üst düzey verileri şunları içerir:

- Mevcut dönem
- Mevcut yuva
- Aktif doğrulayıcılar - Aktif doğrulayıcıların sayısı
- Bekleyen doğrulayıcılar - Etkinleştirilmeyi bekleyen doğrulayıcıların sayısı
- Hisselenmiş ETH - Ağda hisselenmiş ETH miktarı
- Ortalama bakiye - Doğrulayıcıların ortalama ETH bakiyesi

## Blok arayıcıları {#block-explorers}

- [Etherscan](https://etherscan.io/) - Ethereum Ana Ağı ve Goerli Test Ağı'ndan veri çekmek için kullanabileceğiniz bir blok arayıcısı
- [3xpl](https://3xpl.com/ethereum) - veri kümelerini indirmeye izin veren reklamsız, açık kaynaklı bir Ethereum arayıcısı
- [Beaconcha.in](https://beaconcha.in/) - Ethereum Ana Ağı ve Goerli Test Ağı için açık kaynaklı bir blok arayıcısı
- [Blockchair](https://blockchair.com/ethereum) - en özel Ethereum arayıcısı. Ayrıca (bellek havuzu) verileri sıralamak ve filtrelemek için kullanılır
- [Etherchain](https://www.etherchain.org/) - Ethereum Ana Ağı için bir blok arayıcısı
- [Ethplorer](https://ethplorer.io/) - Ethereum Ana Ağı ve Kovan test ağı için token'lar üzerine odaklı bir blok arayıcısı
- [Rantom](https://rantom.app/) - Detaylı anlayış için kullanıcı dostu açık kaynaklı bir DeFi & NFT işlem görüntüleyicisi
- [Ethernow](https://www.ethernow.xyz/) - Ethereum ana ağı ön zincir katmanını görmenizi sağlayan gerçek zamanlı bir işlem kâşifi

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [İşlemler](/developers/docs/transactions/)
- [Hesaplar](/developers/docs/accounts/)
- [Ağlar](/developers/docs/networks/)
