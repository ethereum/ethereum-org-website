---
title: Blok gezginleri
description: "İşlemler, hesaplar, sözleşmeler ve daha fazlası hakkında bilgi sorgulayabileceğiniz, blokzincir verileri dünyasına açılan portalınız olan blok gezginlerine bir giriş."
lang: tr
sidebarDepth: 3
---

Blok gezginleri, Ethereum'un verilerine açılan portalınızdır. Bunları bloklar, işlemler, doğrulayıcılar, hesaplar ve diğer zincir içi etkinlikler hakkında gerçek zamanlı verileri görmek için kullanabilirsiniz.

## Ön koşullar {#prerequisites}

Bir blok gezgininin size verdiği verileri anlamlandırabilmek için Ethereum'un temel kavramlarını anlamalısınız. [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) ile başlayın.

## Açık kaynaklı araçlar {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Veri kümelerinin indirilmesine olanak tanıyan reklamsız bir Ethereum gezgini (açık çekirdek: çekirdek modüller açık kaynaktır)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Hizmetler {#services}

- [Blockchair](https://blockchair.com/ethereum) - Özel Ethereum gezgini. Ayrıca (bellek havuzu) verilerini sıralamak ve filtrelemek içindir. İspanyolca, Fransızca, İtalyanca, Felemenkçe, Portekizce, Rusça, Çince ve Farsça dillerinde mevcuttur
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Blok Gezgini](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Ayrıca Çince, Korece, Rusça ve Japonca dillerinde mevcuttur
- [Ethplorer](https://ethplorer.io/) - Token odaklı bir blok gezgini. Ayrıca Çince, İspanyolca, Fransızca, Türkçe, Rusça, Korece ve Vietnamca dillerinde mevcuttur
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Veri {#data}

Ethereum tasarımı gereği şeffaftır, bu nedenle her şey doğrulanabilir. Blok gezginleri bu bilgileri almak için bir arayüz sağlar. Ve bu, söz konusu verilere ihtiyaç duymanız halinde hem ana Ethereum ağı hem de test ağları içindir. Veriler, yürütme verileri ve mutabakat verileri olarak ikiye ayrılır. Yürütme verileri, belirli bir blokta yürütülen işlemleri ifade eder. Mutabakat verileri, blokların kendilerini ve onları teklif eden doğrulayıcıları ifade eder.

İşte bir blok gezgininden alabileceğiniz veri türlerinin bir özeti.

### Yürütme verileri {#execution-data}

Ethereum'a her 12 saniyede bir yeni bloklar eklenir (bir blok teklifçisi sırasını kaçırmadığı sürece), bu nedenle blok gezginlerine neredeyse sabit bir veri akışı eklenir. Bloklar, yararlı bulabileceğiniz birçok önemli veri içerir:

**Standart veriler**

- Blok yüksekliği - Mevcut bloğun oluşturulması sırasındaki blok numarası ve blokzincirin (blok cinsinden) uzunluğu
- Zaman damgası - Bir bloğun teklif edildiği zaman
- İşlemler - Bloğa dahil edilen işlem sayısı
- Ücret alıcısı - İşlemlerden gaz ücreti bahşişlerini alan adres
- Blok Ödülü - Bloğu teklif eden doğrulayıcıya verilen ETH miktarı
- Boyut - Blok içindeki verilerin boyutu (bayt cinsinden ölçülür)
- Kullanılan gaz - Bloktaki işlemler tarafından kullanılan toplam gaz birimi
- Gaz limiti - Bloktaki işlemler tarafından belirlenen toplam gaz limitleri
- Gaz başına taban ücret - Bir işlemin bir bloğa dahil edilmesi için gereken minimum çarpan
- Yakılan ücretler - Blokta ne kadar ETH yakıldığı
- Ekstra veri - Oluşturucunun bloğa dahil ettiği herhangi bir ekstra veri

**Gelişmiş veriler**

- Hash - Blok başlığını temsil eden kriptografik hash (bloğun benzersiz tanımlayıcısı)
- Ebeveyn hash'i - Mevcut bloktan önce gelen bloğun hash'i
- StateRoot - Sistemin tüm durumunu depolayan Merkle ağacının kök hash'i

### Gaz {#gas}

Blok gezginleri size yalnızca işlem ve bloklardaki Gaz kullanımı hakkında veri vermekle kalmaz, aynı zamanda bazıları ağın mevcut gas fiyatları hakkında da bilgi verir. Bu, ağ kullanımını anlamanıza, güvenli işlemler göndermenize ve gaz için gereğinden fazla harcama yapmamanıza yardımcı olacaktır. Bu bilgileri ürününüzün arayüzüne almanıza yardımcı olabilecek API'lere göz atın. Gaza özgü veriler şunları kapsar:

- Güvenli ancak yavaş bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre)
- Ortalama bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre)
- Hızlı bir işlem için gereken tahmini gaz birimi (+ tahmini fiyat ve süre)
- Gas fiyatına dayalı ortalama onay süresi
- Gaz tüketen sözleşmeler - başka bir deyişle, ağda çok fazla kullanım gören popüler ürünler
- Gaz harcayan hesaplar - başka bir deyişle, sık ağ kullanıcıları

### İşlemler {#transactions}

Blok gezginleri, insanların işlemlerinin ilerlemesini takip etmeleri için yaygın bir yer haline gelmiştir. Bunun nedeni, elde edebileceğiniz ayrıntı düzeyinin ekstra kesinlik sağlamasıdır. İşlem verileri şunları içerir:

**Standart veriler**

- İşlem hash'i - İşlem gönderildiğinde oluşturulan bir hash
- Durum - İşlemin beklemede, başarısız veya başarılı olup olmadığının bir göstergesi
- Blok - İşlemin dahil edildiği blok
- Zaman damgası - Bir işlemin bir doğrulayıcı tarafından teklif edilen bir bloğa dahil edildiği zaman
- Gönderen - İşlemi gönderen hesabın adresi
- Alıcı - İşlemin etkileşime girdiği alıcının veya akıllı sözleşmenin adresi
- Transfer edilen token'lar - İşlemin bir parçası olarak transfer edilen token'ların bir listesi
- Değer - Transfer edilen toplam ETH değeri
- İşlem ücreti - İşlemi gerçekleştirmesi için doğrulayıcıya ödenen miktar (gas fiyatı\*kullanılan gaz ile hesaplanır)

**Gelişmiş veriler**

- Gaz limiti - Bu işlemin tüketebileceği maksimum gaz birimi sayısı
- Kullanılan gaz - İşlemin tükettiği gerçek gaz birimi miktarı
- Gas fiyatı - Gaz birimi başına belirlenen fiyat
- Nonce - `from` adresi için işlem numarası (bunun 0'dan başladığını unutmayın, bu nedenle `100` değerindeki bir nonce aslında bu hesap tarafından gönderilen 101. işlem olacaktır)
- Girdi verisi - İşlem tarafından gereksinim duyulan herhangi bir ekstra bilgi

### Hesaplar {#accounts}

Bir hesap hakkında erişebileceğiniz çok fazla veri vardır. Bu nedenle, varlıklarınızın ve değerinizin kolayca takip edilememesi için genellikle birden fazla hesap kullanılması önerilir. Ayrıca işlemleri ve hesap etkinliğini daha gizli hale getirmek için geliştirilmekte olan bazı çözümler de vardır. Ancak hesaplar için mevcut olan veriler şunlardır:

**Kullanıcı hesapları**

- Hesap adresi - Fon göndermek için kullanabileceğiniz açık adres
- ETH bakiyesi - O hesapla ilişkili ETH miktarı
- Toplam ETH değeri - ETH'nin değeri
- Token'lar - Hesapla ilişkili token'lar ve değerleri
- İşlem geçmişi - Bu hesabın gönderici veya alıcı olduğu tüm işlemlerin bir listesi

**Akıllı sözleşmeler**

Akıllı sözleşme hesapları, bir kullanıcı hesabının sahip olacağı tüm verilere sahiptir, ancak bazı blok gezginleri bazı kod bilgilerini bile görüntüler. Örnekler şunları içerir:

- Sözleşme oluşturucu - Sözleşmeyi Ana Ağ'a dağıtan adres
- Oluşturma işlemi - Ana Ağ'a dağıtımı içeren işlem
- Kaynak kodu - Akıllı sözleşmenin Solidity veya Vyper kodu
- Sözleşme ABI'si - Sözleşmenin Uygulama İkili Arayüzü (Application Binary Interface)—sözleşmenin yaptığı çağrılar ve alınan veriler
- Sözleşme oluşturma kodu - Akıllı sözleşmenin derlenmiş baytkodu—Solidity veya Vyper vb. ile yazılmış bir akıllı sözleşmeyi derlediğinizde oluşturulur.
- Sözleşme olayları - Akıllı sözleşmede çağrılan yöntemlerin bir geçmişi—temel olarak sözleşmenin nasıl ve ne sıklıkla kullanıldığını görmenin bir yolu

### Token'lar {#tokens}

Token'lar bir sözleşme türüdür, bu nedenle akıllı bir sözleşmeye benzer verilere sahip olacaklardır. Ancak değerleri olduğu ve alınıp satılabildikleri için ek veri noktalarına sahiptirler:

- Tür - ERC-20, ERC-721 veya başka bir token standardı olup olmadıkları
- Fiyat - Eğer bir ERC-20 iseler mevcut bir piyasa değerine sahip olacaklardır
- Piyasa değeri - Eğer bir ERC-20 iseler bir piyasa değerine sahip olacaklardır (fiyat\*toplam arz ile hesaplanır)
- Toplam arz - Dolaşımdaki token sayısı
- Sahipler - Token'ı elinde bulunduran adreslerin sayısı
- Transferler - Token'ın hesaplar arasında transfer edilme sayısı
- İşlem geçmişi - Token'ı içeren tüm işlemlerin bir geçmişi
- Sözleşme adresi - Ana Ağ'a dağıtılan token'ın adresi
- Ondalıklar - ERC-20 token'ları bölünebilirdir ve ondalık basamaklara sahiptir

### Ağ {#network}

Bazı blok verileri, Ethereum'un sağlığıyla daha bütünsel olarak ilgilenir.

- Toplam işlemler - Ethereum oluşturulduğundan beri yapılan işlem sayısı
- Saniye başına işlem - Bir saniye içinde işlenebilen işlem sayısı
- ETH fiyatı - 1 ETH'nin mevcut değerlemeleri
- Toplam ETH arzı - Dolaşımdaki ETH sayısı—her bloğun oluşturulmasıyla blok ödülleri şeklinde yeni ETH yaratıldığını unutmayın
- Piyasa değeri - Fiyat\*arz hesaplaması

## Mutabakat katmanı verileri {#consensus-layer-data}

### Dönem {#epoch}

Güvenlik nedenleriyle, her dönemin sonunda (her 6,4 dakikada bir) rastgele doğrulayıcı komiteleri oluşturulur. Dönem verileri şunları içerir:

- Dönem numarası
- Kesinleşmiş durum - Dönemin kesinleşmiş olup olmadığı (Evet/Hayır)
- Zaman - Dönemin sona erdiği zaman
- Onaylar - Dönemdeki onay sayısı (slotlar içindeki bloklar için oylar)
- Depozitolar - Döneme dahil edilen ETH depozitolarının sayısı (doğrulayıcıların doğrulayıcı olmak için ETH stake etmesi gerekir)
- Kesintiler (Slashings) - Blok teklifçilerine veya onaylayıcılara verilen cezaların sayısı
- Oy katılımı - Blokları onaylamak için kullanılan stake edilmiş ETH miktarı
- Doğrulayıcılar - Dönem için aktif olan doğrulayıcı sayısı
- Ortalama Doğrulayıcı bakiyesi - Aktif doğrulayıcılar için ortalama bakiye
- Slotlar - Döneme dahil edilen slot sayısı (slotlar bir geçerli blok içerir)

### Slot {#slot}

Slotlar blok oluşturma fırsatlarıdır, her slot için mevcut veriler şunları içerir:

- Dönem - Slotun geçerli olduğu dönem
- Slot numarası
- Durum - Slotun durumu (Teklif Edildi/Kaçırıldı)
- Zaman - Slot zaman damgası
- Teklif edici - Slot için bloğu teklif eden doğrulayıcı
- Blok kökü - İşaret bloğunun (BeaconBlock) hash ağacı kökü
- Ebeveyn kökü - Önceki bloğun hash'i
- Durum kökü - İşaret durumunun (BeaconState) hash ağacı kökü
- İmza
- RANDAO ifşası
- Grafiti - Bir blok teklifçisi, blok teklifine 32 bayt uzunluğunda bir mesaj ekleyebilir
- Yürütme Verileri
  - Blok hash'i
  - Depozito sayısı
  - Depozito kökü
- Onaylar - Bu slottaki blok için onay sayısı
- Depozitolar - Bu slot sırasındaki depozito sayısı
- Gönüllü çıkışlar - Slot sırasında ayrılan doğrulayıcı sayısı
- Kesintiler (Slashings) - Blok teklifçilerine veya onaylayıcılara verilen cezaların sayısı
- Oylar - Bu slottaki blok için oy veren doğrulayıcılar

### Bloklar {#blocks-1}

Hisse Kanıtı (PoS) zamanı slotlara ve dönemlere böler. Bu da yeni veriler anlamına gelir!

- Teklif edici - Yeni bloğu teklif etmek için algoritmik olarak seçilen doğrulayıcı
- Dönem - Bloğun teklif edildiği dönem
- Slot - Bloğun teklif edildiği slot
- Onaylar - Slota dahil edilen onay sayısı—onaylar, bloğun İşaret zincirine gitmeye hazır olduğunu gösteren oylar gibidir

### Doğrulayıcılar {#validators}

Doğrulayıcılar, blokları teklif etmekten ve slotlar içinde onları onaylamaktan sorumludur.

- Doğrulayıcı numarası - Doğrulayıcıyı temsil eden benzersiz numara
- Mevcut bakiye - Doğrulayıcının ödüller dahil bakiyesi
- Etkin bakiye - Doğrulayıcının staking için kullanılan bakiyesi
- Gelir - Doğrulayıcı tarafından alınan ödüller veya cezalar
- Durum - Doğrulayıcının şu anda çevrimiçi ve aktif olup olmadığı
- Onay etkinliği - Doğrulayıcının onaylarının zincire dahil edilmesi için geçen ortalama süre
- Etkinleştirme uygunluğu - Doğrulayıcının doğrulamaya uygun hale geldiği tarih (ve dönem)
- Aktif olma tarihi - Doğrulayıcının aktif hale geldiği tarih (ve dönem)
- Teklif edilen bloklar - Doğrulayıcının teklif ettiği blok
- Onaylar - Doğrulayıcının sağladığı onaylar
- Depozitolar - Doğrulayıcı tarafından yapılan staking depozitosunun gönderen adresi, işlem hash'i, blok numarası, zaman damgası, miktarı ve durumu

### Onaylar {#attestations}

Onaylar, blokları zincire dahil etmek için verilen "evet" oylarıdır. Verileri, onayın ve onaylayan doğrulayıcıların bir kaydıyla ilgilidir

- Slot - Onayın gerçekleştiği slot
- Komite endeksi - Verilen slottaki komitenin endeksi
- Toplama bitleri - Onaya katılan tüm doğrulayıcıların toplanmış onayını temsil eder
- Doğrulayıcılar - Onay sağlayan doğrulayıcılar
- İşaret bloğu kökü - Doğrulayıcıların onayladığı bloğu işaret eder
- Kaynak - En son gerekçelendirilmiş dönemi işaret eder
- Hedef - En son dönem sınırını işaret eder
- İmza

### Ağ {#network-1}

Mutabakat katmanı üst düzey verileri şunları içerir:

- Mevcut dönem
- Mevcut slot
- Aktif doğrulayıcılar - Aktif doğrulayıcı sayısı
- Bekleyen doğrulayıcılar - Aktif hale getirilmeyi bekleyen doğrulayıcı sayısı
- Stake edilmiş ETH - Ağda stake edilen ETH miktarı
- Ortalama bakiye - Doğrulayıcıların ortalama ETH bakiyesi

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [İşlemler](/developers/docs/transactions/)
- [Hesaplar](/developers/docs/accounts/)
- [Ağlar](/developers/docs/networks/)