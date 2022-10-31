---
title: Blok Arayıcıları
description: İşlemler, hesaplar, sözleşmeler ve daha fazlası hakkında bilgi sorgulayabileceğiniz blok zinciri verileri dünyasına açılan portalınız olan blok arayıcılarına giriş.
lang: tr
sidebarDepth: 3
---

Blok arayıcıları, Ethereum'un verilerine açılan portalınızdır. Bunları; bloklar, işlemler, madenciler, hesaplar ve diğer zincir üstü olaylarla ilgili gerçek zamanlı verileri görmek için kullanabilirsiniz.

## Ön koşullar {#prerequisites}

Bir blok arayıcısının size verdiği verileri anlamlandırabilmeniz için Ethereum'un temel kavramlarını anlamalısınız. [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) ile başlayın.

## Hizmetler {#services}

- [Etherscan](https://etherscan.io/) –_Çince, Korece, Rusça ve Japonca olarak da mevcuttur_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) –_Çince, İspanyolca, Fransızca, Türkçe, Rusça, Korece ve Vietnamca olarak da mevcuttur_
- [Blockchair](https://blockchair.com/ethereum) –_İspanyolca, Fransızca, İtalyanca, Felemenkçe, Portekizce, Rusça, Çince ve Farsça olarak da mevcuttur_
- [Blockscout](https://blockscout.com/)
- [Oklink](https://www.oklink.com/eth)

## Veri {#data}

Ethereum, tasarımı itibariyle şeffaf olduğu için yapılan her işlem doğrulanabilir. Blok arayıcıları bu bilgiyi almak için bir arayüz desteği sağlar. Ve bu, verilere ihtiyacınız olması durumunda hem ana Ethereum ağı hem de test ağları için kullanılabilir.

İşte bir blok arayıcısından alabileceğiniz veri türlerinin bir özeti.

### Bloklar {#blocks}

Yaklaşık her 12 saniyede bir Ethereum'a yeni bloklar eklenir (bu değişkenlik gösterebilir), bu nedenle blok arayıcılarına eklenen neredeyse sabit bir veri akışı vardır. Bloklar, yararlı bulabileceğiniz birçok önemli veri içerir:

**Standart veriler**

- Blok yüksekliği – Mevcut bloğun oluşturulduğu anda blok zincirinin (blok cinsinden) blok numarası ve uzunluğu.
- Zaman Damgası – Bir madencinin bloğu çıkardığı zaman.
- İşlemler – Blok içinde yer alan işlem sayısı.
- Madenci – Bloğu çıkaran madencinin adresi.
- Ödül – Madenciye blok eklemesi karşılığında verilen ETH miktarı (standart 2ETH ödülü + bloğa dahil olan işlemlerin işlem ücretleri).
- Zorluk – Blok madenciliği ile ilgili zorluk.
- Boyut – Blok içindeki verilerin boyutu (bayt olarak ölçülür).
- Kullanılan gaz – Bloktaki işlemler tarafından kullanılan toplam gaz birimleri.
- Gaz limiti – Bloktaki işlemler tarafından belirlenen toplam gaz limitleri.
- Ekstra veri – Madencinin bloğa dahil ettiği herhangi bir ekstra veri.

**Gelişmiş veriler**

- Hash – Blok başlığını temsil eden kriptografik hash değeri (bloğun benzersiz tanımlayıcısı).
- Üst hash – Mevcut bloktan önce gelen bloğun hash değeri.
- Sha3 Amcalar – Belirli bir üst bloğun tüm amcalarının birleşik hash değeri.
- StateRoot – Sistemin tüm durumunu saklayan Merkle ağacının kök hash değeri.
- Nonce – Madenci tarafından bir blok için iş ispatını göstermek için kullanılan bir değer.

**Amca blokları (Uncle block)**

Amca blokları, iki madenci aynı anda yeterince yakın bir zamanda blok oluşturduğunda oluşturulur: Düğümler arasında yalnızca bir blok doğrulanabilir. Dahil edilmezler ancak yine de yapılan iş için bir ödül alırlar.

Blok arayıcıları, amca blokları hakkında aşağıdakiler gibi bilgiler sağlar:

- Bir amca bloğu numarası.
- Gerçekleştikleri bir zaman.
- Oluşturuldukları blok yüksekliği.
- Madenciliğini yapan kişi.
- ETH ödülü.

### Gaz {#gas}

Blok araştırmacıları size işlemlerde ve bloklarda Gaz kullanımı hakkında bilgi vermekle kalmaz, bazıları size ağın mevcut gaz fiyatları hakkında bilgi verir. Bu, ağ kullanımını anlamanıza, güvenli işlemler göndermenize ve fazla gaz harcamamanıza yardımcı olacaktır. Bu bilgileri ürününüzün arayüzüne almanıza yardımcı olabilecek API'lere bakın. Gaza özgü veriler şunları kapsar:

- Güvenli ancak yavaş bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre).
- Ortalama bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre).
- Hızlı bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre).
- Gaz fiyatına dayalı ortalama onay süresi.
- Gaz tüketen sözleşmeler – diğer bir deyişle, ağda çokça kullanılan popüler ürünler.
- Gaz harcayan hesaplar – başka bir deyişle, ağı sık kullanan kullanıcılar.

### İşlemler {#transactions}

Blok arayıcıları, insanların işlemlerinin ilerlemesini takip etmeleri için ortak bir yer hâline geldi. Bunun nedeni, alabileceğiniz ayrıntı düzeyinin ekstra kesinlik sağlamasıdır. İşlem verileri şunları içerir:

**Standart veriler**

- İşlem hash'i – İşlem gönderildiğinde oluşturulan hash.
- Durum – İşlemin beklemede mi, başarısız mı yoksa başarılı mı olduğunun bir göstergesi.
- Blok – İşlemin dahil edildiği blok.
- Zaman Damgası – Bir madencinin işlemi çıkardığı zaman.
- Gönderen – İşlemi gönderen hesabın adresi.
- Alıcı - İşlemin etkileşimde bulunduğu alıcının veya akıllı sözleşmenin adresi.
- Aktarılan token'lar – İşlemin bir parçası olarak aktarılan tokenların listesi.
- Değer – Aktarılan toplam ETH değeri.
- İşlem ücreti – İşlemi gerçekleştirmek için madenciye ödenen miktar (gaz fiyatı\*kullanılan gaz ile hesaplanır).

**Gelişmiş veriler**

- Gaz limiti – Bu işlemin tüketebileceği maksimum gaz birimi sayısı.
- Kullanılan gaz – İşlemin tükettiği gerçek gaz birimi miktarı.
- Gaz fiyatı – Gaz birimi başına belirlenen fiyat.
- Nonce – `from` adresinin işlem numarası (bu değerin 0'dan başladığını, bu nedenle `100` olan bir nonce değerinin aslında bu hesap tarafından gönderilen 101. işlem olduğunu unutmayın).
- Girdi verileri – İşlemin gerektirdiği herhangi bir ek bilgi.

### Hesaplar {#accounts}

Bir hesap hakkında erişebileceğiniz çok fazla veri var. Bu nedenle, varlıklarınızın ve değerinizin kolayca izlenememesi için genellikle birden fazla hesap kullanmanız önerilir. İşlemleri ve hesap hareketlerini daha özel hâle getirmek için geliştirilmekte olan bazı çözümler de bulunmaktadır. Ancak işte hesaplar hakkında mevcut olan veriler:

**Kullanıcı hesapları**

- Hesap adresi – Fon göndermek için kullanabileceğiniz genel adres.
- ETH bakiyesi – Bu hesapla ilişkili ETH miktarı.
- Toplam ETH değeri – ETH'nin değeri.
- Token'lar – Hesapla ilişkili token'lar ve bunların değeri.
- İşlem geçmişi – Bu hesabın gönderen veya alıcı olduğu tüm işlemlerin listesi.

**Akıllı sözleşmeler**

Akıllı sözleşme hesapları, bir kullanıcı hesabının sahip olacağı tüm verilere sahiptir ancak bazı blok arayıcıları bazı kod bilgilerini de görüntüler. Örneğin:

- Sözleşme oluşturucu – Sözleşmeyi Mainnet'e dağıtan adres.
- Oluşturma işlemi – Mainnet'e dağıtımı içeren işlem.
- Kaynak kodu – Akıllı sözleşmenin solidity veya vyper kodu.
- Sözleşme ABI'si - Sözleşmenin Uygulama İkili Arayüzü - sözleşmenin yaptığı çağrılar ve alınan veriler.
- Sözleşme oluşturma kodu – Akıllı sözleşmenin derlenmiş bayt kodu – Solidity veya Vyper vb. ile yazılmış bir akıllı sözleşmeyi derlerken oluşturulur.
- Sözleşme olayları – Akıllı sözleşmede çağrılan yöntemlerin geçmişi. Temel olarak, sözleşmenin nasıl ve ne sıklıkla kullanıldığını görmenin bir yolu.

### Token'lar {#tokens}

Token'lar bir tür sözleşmedir, bu nedenle akıllı sözleşmlere benzer verilere sahip olurlar. Ancak değerli oldukları ve alınıp satılabildikleri için ek veri noktalarına sahiptirler:

- Tür – ERC-20, ERC-721 veya diğer token standartları arasında hangi türden oldukları bilgisi.
- Fiyat – Eğer bir ERC-20 ise, bir cari piyasa fiyatına sahip olurlar.
- Piyasa değeri – Eğer bir ERC-20 ise, bir piyasa değerine sahip olurlar (fiyat\*toplam arza göre hesaplanır).
- Toplam arz – Dolaşımdaki token sayısı.
- Sahipler – Token'ı tutan adreslerin sayısı.
- Transferler – Token'ın hesaplar arasında kaç kez transfer edildiği.
- İşlem geçmişi – Token dahil tüm işlemlerin geçmişi.
- Sözleşme adresi – Mainnet'e dağıtılan token'ın adresi.
- Ondalık Sayılar – ERC20 token'ları bölünebilirdir ve ondalık basamaklara sahiptir.

### Ağ {#network}

Tabii ki ağın sağlığı ile ilgili bazı veriler bulunuyor. Bunlar, Ethereum'un iş ispatı mutabakat mekanizmasına özgüdür. Ethereum, hisse ispatına geçtiğinde bu verilerin bir kısmı gereksiz olacaktır

- Zorluk – Mevcut madencilik zorluğu.
- Hash oranı – Mevcut Ethereum bloğunu veya herhangi bir bloğu çözmeye çalışan Ethereum madencileri tarafından kaç tane hash değeri üretildiğinin bir tahmini.
- Toplam işlem - Ethereum'un oluşturulmasından bu yana gerçekleşen işlem sayısı.
- Saniyedeki işlem sayısı - Bir saniye içinde işlenebilir işlem sayısı.
- ETH fiyatı – 1 ETH'nin mevcut değerlemeleri.
- Toplam ETH arzı – Dolaşımdaki ETH sayısı – her bloğun oluşumu ile blok ödülleri şeklinde yeni ETH oluşturulduğunu unutmayın.
- Piyasa değeri – Fiyat\*arz ile hesaplanır.

## Mutabakat katmanı verileri {#consensus-layer-data}

Ölçeklenebilirlik yükseltmeleri hâlâ geliştirilme aşamasında olsa da arayıcıların size sağlayabileceği bazı veri noktalarından bahsetmek faydalı olacaktır. Aslında, tüm bu veriler şu anda test ağları için mevcuttur.

Yol haritasına aşina değilseniz [Ethereum yükseltmelerine genel bakışımıza](/upgrades/) göz atın.

### Dönem {#epoch}

İşaret Zinciri, güvenlik nedenleriyle her dönemin sonunda (her 6,4 dakikada bir) rastgele seçilen doğrulayıcı komiteleri oluşturacaktır. Dönem verileri şunları içerir:

- Dönem numarası.
- Kesinleşmiş durum – Dönemin kesinleşmiş olup olmadığı (Evet/Hayır).
- Zaman – Dönemin sona erdiği zaman.
- Tasdikler – Dönemdeki tasdik sayısı (yuvalar içindeki bloklar için oy).
- Yatırmalar - Döneme dahil olan ETH yatırma işlemlerinin sayısı (doğrulayıcıların doğrulayıcı olmak için ETH stake etmeleri gerekir).
- Kesmeler – Blok önerenlere veya tasdik edenlere verilen cezaların sayısı.
- Oylama katılımı – Blokları tasdik etmek için kullanılan stake edilmiş ETH miktarı.
- Doğrulayıcılar – Dönem için aktif olan doğrulayıcıların sayısı.
- Ortalama Doğrulayıcı bakiyesi – Aktif doğrulayıcılar için ortalama bakiye.
- Yuvalar – Döneme dahil edilen yuva sayısı (yuvalar bir geçerli blok içerir).

### Yuva {#slot}

Yuvalar, blok oluşturma fırsatlarıdır; her yuva için mevcut veriler şunları içerir:

- Dönem – Yuvanın geçerli olduğu dönem.
- Yuva numarası.
- Durum – Yuvanın durumu (Önerilen/Kaçırılmış).
- Süre – Yuvanın süre damgası.
- Öneren – Yuva için bloğu öneren doğrulayıcı.
- Blok kökü – BeaconBlock'un hash ağaç kökü.
- Üst kök – Daha önce gelen bloğun hash değeri.
- Durum kökü – BeaconState'in hash ağaç kökü.
- İmza.
- Randao gösterimi.
- Graffiti – Blok öneren varlık, blok önerisine 32 bayt uzunluğunda bir mesaj ekleyebilir.
- Yürütüm Verisi.
  - Blok hash değeri.
  - Yatırma sayısı.
  - Yatırma kökü.
- Tasdikler – Bu yuvadaki blok için tasdik sayısı.
- Yatırmalar – Bu yuva sırasındaki yatırma sayısı.
- Gönüllü çıkışlar – Yuva sırasında çıkan doğrulayıcıların sayısı.
- Kesmeler – Blok önerenlere veya tasdik edenlere verilen cezaların sayısı.
- Oylar – Bu yuvadaki bloğa oy veren doğrulayıcılar.

### Bloklar {#blocks-1}

Madencilerin yerini doğrulayıcılar alacağı ve İşaret Zinciri, yuvaları ve dönemleri Ethereum'da kullanıma sokacağı için mutabakat katmanı blokları farklı çalışır. Yani bu yeni veriler demektir!

- Öneren – Yeni bloğu önermek için algoritmik olarak seçilen doğrulayıcı.
- Dönem – Bloğun önerildiği dönem.
- Yuva – Bloğun önerildiği yuva.
- Tasdikler – Yuvaya dahil edilen tasdik sayısı. Tasdikler, bloğun İşaret Zincirine gitmeye hazır olduğunu gösteren oylar gibidir.

### Doğrulayıcılar {#validators}

Doğrulayıcılar, bloklar önermekten ve bu blokları yuvalar içinde tasdik etmekten sorumludur.

- Doğrulayıcı numarası – Doğrulayıcıyı temsil eden benzersiz bir sayı.
- Mevcut bakiye – Ödüller dahil doğrulayıcının bakiyesi.
- Etkin bakiye – Doğrulayıcının stake etmek için kullanılan bakiyesi.
- Gelir – Doğrulayıcı tarafından alınan ödüller veya cezalar.
- Durum – Doğrulayıcının şu anda çevrimiçi ve aktif olup olmadığı.
- Tasdik etkinliği – Doğrulayıcının tasdiklerinin zincire dahil edilmesi için geçen ortalama süre.
- Aktivasyon için uygunluk – Doğrulayıcının doğrulamaya uygun hâle geldiği tarih (ve dönem).
- Aktif olunan tarih – Doğrulayıcının aktif hâle geldiği tarih (ve dönem).
- Önerilen bloklar – Doğrulayıcının önerdiği blok.
- Tasdikler – Doğrulayıcının sağladığı tasdikler.
- Yatırmalar – Gönderen adresi, işlemin hash değeri, blok numarası, zaman damgas ve doğrulayıcının stake yatırma miktarı ve durumu.

### Tasdikler {#attestations}

Tasdikler, zincire blok eklemek için verilen "evet" oylarıdır. Verileri, tasdikin kaydı ve tasdik eden doğrulayıcılarla ilgilidir.

- Yuva – Tasdikin gerçekleştiği yuva.
- Komite endeksi – Mevzubahis yuvadaki komitenin endeksi.
- Toplama bitleri – Tasdike katılan tüm doğrulayıcıların toplanmış tasdikini temsil eder.
- Doğrulayıcılar – Tasdik sağlayan doğrulayıcılar.
- İşaret bloğu kökü – Doğrulayıcıların tasdik ettiği bloğa işaret eder.
- Kaynak – En son gerekçelendirilmiş dönemi gösterir.
- Hedef – En son dönem sınırını gösterir.
- İmza.

### Ağ {#network-1}

Mutabakat katmanı üst düzey verileri şunları içerir:

- Mevcut dönem.
- Mevcut yuva.
- Aktif doğrulayıcılar – Aktif doğrulayıcıların sayısı.
- Bekleyen doğrulayıcılar – Etkinleştirilmeyi bekleyen doğrulayıcıların sayısı.
- Stake Edilmiş ETH – Ağda stake edilmiş ETH miktarı.
- Ortalama bakiye – Doğrulayıcıların ortalama ETH bakiyesi.

## Blok arayıcıları {#block-explorers}

- [Etherscan](https://etherscan.io/) – Ethereum Mainnet, Ropsten Test Ağı, Kovan Test Ağı, Rinkeby Test Ağı ve Goerli Test Ağı için veri almak amacıyla kullanabileceğiniz bir blok arayıcısı.
- [Blockscout](https://blockscout.com/) – aşağıdaki ağlara odaklanır:
  - xDai – MakerDAO'nun DAI sabit parası ile POA'nın yan zincir ve tokenbridge teknolojisinin zekice bir kombinasyonu.
  - POA – Bir grup güvenilir doğrulayıcı tarafından güvence altına alınan yan zincir ve otonom ağ. Ağdaki tüm doğrulayıcılar Amerika Birleşik Devletleri noterleridir ve bilgileri herkese açıktır.
  - POA Sokol Testnet.
  - ARTIS – Ethereum uyumlu bir blok zinciri.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – L14, LUKSO topluluğunun ortak bir altyapı oluşturmasına ve üzerinde test etmesine olanak sağlamak için ilk test ağı olarak işlev görür.
  - qDai.
- [Etherchain](https://www.etherchain.org/) – Ethereum Mainnet için bir blok arayıcısı.
- [Ethplorer](https://ethplorer.io/) – Ethereum Mainnet ve Kovan test ağı için token'lara odaklanan bir blok arayıcısı.
- [Blockchair](https://blockchair.com/ethereum) - en özel Ethereum arayıcısı. Ayrıca (bellek havuzu) verileri sıralamak ve filtrelemek için kullanılır.

## İşaret zinciri (mutabakat katmanı) blok arayıcıları {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://ethscan.org/](https://ethscan.org/) (beaconcha.in çatalı)

## Daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili Konular {#related-topics}

- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [İşlemler](/developers/docs/transactions/)
- [Hesaplar](/developers/docs/accounts/)
- [Ağlar](/developers/docs/networks/)
