---
title: Fulu-Osaka (Fusaka)
description: "Fusaka protokol yükseltmesi hakkında bilgi edinin"
lang: tr
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Ethereum'un merakla beklenen Fusaka yükseltmesi 3 Aralık 2025'te canlıya geçti**

Fusaka ağ yükseltmesi, [Pectra](/roadmap/pectra/) yükseltmesini takip eder ve her Ethereum kullanıcısı ve geliştiricisi için daha fazla yeni özellik getirerek deneyimi iyileştirir. Bu isim, Osaka adlı yürütüm katmanı yükseltmesinden ve Fulu yıldızının adını taşıyan fikir birliği katmanı sürümünden oluşur. Ethereum'un her iki parçası da Ethereum ölçeklendirmesini, güvenliğini ve kullanıcı deneyimini geleceğe taşıyan bir yükseltme alır.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Fusaka yükseltmesi, Ethereum'un uzun vadeli gelişim hedeflerindeki adımlardan sadece biridir. [Protokol yol haritası](/roadmap/) ve [önceki yükseltmeler](/ethereum-forks/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

## Fusaka'daki iyileştirmeler {#improvements-in-fusaka}

### Blob'ları ölçeklendirme {#scale-blobs}

#### PeerDAS {#peerdas}

Bu, Fusaka çatallanmasının _öne çıkan_ unsurudur, bu yükseltmede eklenen ana özelliktir. Katman 2'ler şu anda verilerini, özellikle katman 2'ler için oluşturulmuş geçici veri türü olan blob'lar halinde Ethereum'a gönderir. Fusaka öncesinde, her tam düğüm, verilerin mevcut olduğundan emin olmak için her blob'u depolamak zorundaydı. Blob iş hacmi arttıkça, tüm bu verileri indirmek sürdürülemez derecede kaynak yoğun hale gelir.

[Veri kullanılabilirliği örneklemesi](https://notes.ethereum.org/@fradamt/das-fork-choice) ile, tüm blob verilerini depolamak yerine, her düğüm blob verilerinin bir alt kümesinden sorumlu olacaktır. Blob'lar, ağdaki düğümler arasında tekdüze rastgele dağıtılır ve her tam düğüm verilerin yalnızca 1/8'ini tutar, bu da teorik olarak 8 kata kadar ölçeklenmeyi mümkün kılar. Verilerin kullanılabilirliğini sağlamak için, verilerin herhangi bir kısmı, yanlış veya eksik veri olasılığını kriptografik olarak ihmal edilebilir bir seviyeye (~10<sup>20</sup>'de bir ila 10<sup>24</sup>'te bir) düşüren yöntemlerle bütünün mevcut herhangi bir %50'sinden yeniden oluşturulabilir.

Bu, katman 2'ler için daha küçük ücretlerle daha fazla ölçeklendirme sağlayan blob ölçeklendirmesini mümkün kılarken, düğümler için donanım ve bant genişliği gereksinimlerini sürdürülebilir tutar.

[PeerDAS hakkında daha fazla bilgi edinin](/roadmap/fusaka/peerdas/)

**Kaynaklar**:

- [EIP-7594 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7594)
- [PeerDAS üzerine DappLion: Günümüzde Ethereum'u Ölçeklendirme | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademik: Ethereum’un PeerDAS’ının Dokümantasyonu (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Yalnızca Blob Parametresi çatallanmaları {#blob-parameter-only-forks}

Katman 2'ler Ethereum'u ölçeklendirir - ağları büyüdükçe Ethereum'a daha fazla veri göndermeleri gerekir. Bu, Ethereum'un zamanla kendilerine sunulan blob sayısını artırması gerekeceği anlamına gelir. PeerDAS, blob verilerinin ölçeklendirilmesini sağlasa da, bunun kademeli ve güvenli bir şekilde yapılması gerekir.

Ethereum, aynı kurallar üzerinde anlaşma gerektiren binlerce bağımsız düğümde çalışan bir kod olduğundan, bir web sitesi güncellemesi dağıtır gibi blob sayısını artırma gibi değişiklikleri basitçe sunamayız. Herhangi bir kural değişikliği, her düğüm, istemci ve doğrulayıcı yazılımının önceden belirlenmiş aynı bloktan önce yükseltildiği koordineli bir yükseltme olmalıdır.

Bu koordineli yükseltmeler genellikle birçok değişiklik içerir, çok fazla test gerektirir ve bu da zaman alır. Katman 2 blob ihtiyaçlarının değişmesine daha hızlı uyum sağlamak için, yalnızca blob parametresi çatallanmaları, bu yükseltme takvimini beklemek zorunda kalmadan blob'ları artırmak için bir mekanizma sunar.

Yalnızca blob parametresi çatallanmaları, gaz limiti gibi diğer yapılandırmalara benzer şekilde istemciler tarafından ayarlanabilir. Büyük Ethereum yükseltmeleri arasında istemciler, `hedef` ve `maksimum` blob sayısını örneğin 9 ve 12'ye çıkarmak için anlaşabilir ve ardından düğüm operatörleri bu küçük çatallanmaya katılmak için güncelleme yapar. Bu yalnızca blob parametresi çatallanmaları herhangi bir zamanda yapılandırılabilir.

Blob'lar Dencun yükseltmesinde ağa ilk eklendiğinde hedef 3'tü. Bu sayı Pectra'da 6'ya çıkarıldı ve Fusaka'dan sonra artık bu büyük ağ yükseltmelerinden bağımsız olarak sürdürülebilir bir oranda artırılabilir.

![Blok başına ortalama blob sayısını ve yükseltmelerle artan hedefleri gösteren grafik](./average-blob-count-per-block.webp)

Grafik kaynağı: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Kaynaklar**: [EIP-7892 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7892)

#### Yürütüm maliyetleriyle sınırlanan blob temel ücreti {#blob-base-fee-bounded-by-execution-costs}

Katman 2'ler veri gönderdiklerinde iki fatura öderler: blob ücreti ve bu blob'ları doğrulamak için gereken yürütüm gazı. Yürütüm gazı baskın olursa, blob ücreti müzayedesi 1 wei'ye kadar düşebilir ve bir fiyat sinyali olmaktan çıkabilir.

EIP-7918, her blob'un altına orantılı bir rezerv fiyatı sabitler. Rezerv, nominal blob temel ücretinden daha yüksek olduğunda, ücret ayarlama algoritması bloku hedef üstü olarak değerlendirir ve ücreti aşağı çekmeyi durdurarak normal şekilde artmasına izin verir. Sonuç olarak:

- blob ücreti piyasası her zaman sıkışıklığa tepki verir
- katman 2'ler, düğümlere zorladıkları hesaplamanın en azından anlamlı bir kısmını öder
- Yürütüm Katmanındaki temel ücret artışları artık blob ücretini 1 wei'de mahsur bırakamaz

**Kaynaklar**:

- [EIP-7918 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7918)
- [Storybook açıklayıcısı](https://notes.ethereum.org/@anderselowsson/AIG)

### K1'i Ölçeklendirme {#scale-l1}

#### Geçmişin sona ermesi ve daha basit makbuzlar {#history-expiry}

Temmuz 2025'te, Ethereum yürütüm istemcileri [kısmi geçmişin sona ermesini desteklemeye başladı](https://blog.ethereum.org/2025/07/08/partial-history-exp). Bu, Ethereum büyümeye devam ederken düğüm operatörleri için gereken disk alanını azaltmak amacıyla [Birleşim](https://ethereum.org/roadmap/merge/) öncesi geçmişi sildi.

Bu EIP, "Çekirdek EIP'ler"den ayrı bir bölümde yer almaktadır çünkü çatallanma aslında herhangi bir değişiklik uygulamamaktadır - bu, istemci ekiplerinin Fusaka yükseltmesine kadar geçmişin sona ermesini desteklemesi gerektiğine dair bir bildirimdir. Pratikte, istemciler bunu herhangi bir zamanda uygulayabilirler, ancak bunu yükseltmeye eklemek, somut bir şekilde yapılacaklar listesine koydu ve bu özellik ile birlikte Fusaka değişikliklerini test etmelerini sağladı.

**Kaynaklar**: [EIP-7642 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7642)

#### MODEXP için üst sınırlar belirleme {#set-upper-bounds-for-modexp}

Şimdiye kadar, MODEXP ön derlemesi neredeyse her boyutta sayıyı kabul ediyordu. Bu durum test etmeyi zorlaştırıyor, kötüye kullanımı kolaylaştırıyor ve istemci kararlılığı için riskli hale getiriyordu. EIP-7823 net bir sınır koyar: her giriş sayısı en fazla 8192 bit (1024 bayt) uzunluğunda olabilir. Daha büyük olan her şey reddedilir, işlemin gazı yakılır ve hiçbir durum değişikliği gerçekleşmez. Gaz limiti planlamasını ve güvenlik incelemelerini karmaşıklaştıran uç durumları ortadan kaldırırken gerçek dünya ihtiyaçlarını çok rahat bir şekilde karşılar. Bu değişiklik, kullanıcı veya geliştirici deneyimini etkilemeden daha fazla güvenlik ve DoS koruması sağlar.

**Kaynaklar**: [EIP-7823 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7823)

#### İşlem Gaz Limiti Üst Sınırı {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825), işlem başına 16.777.216 (2^24) gazlık bir üst sınır ekler. Blok gaz limitini yükseltirken herhangi bir tek işlemin en kötü durum maliyetini sınırlayarak proaktif bir DoS sağlamlaştırmasıdır. Doğrulamayı ve yayılımı modellemeyi kolaylaştırarak gaz limitini yükselterek ölçeklendirmeyi ele almamızı sağlar.

Neden tam olarak 2^24 gaz? Günümüzün gaz limitinden rahatlıkla daha küçüktür, gerçek sözleşme dağıtımları ve ağır ön derlemeler için yeterince büyüktür ve 2'nin bir kuvveti olması, istemciler arasında uygulanmasını kolaylaştırır. Bu yeni maksimum işlem boyutu, Pectra öncesi ortalama blok boyutuna benzer olup Ethereum üzerindeki herhangi bir işlem için makul bir sınır haline getirir.

**Kaynaklar**: [EIP-7825 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7825)

#### `MODEXP` gaz maliyeti artışı {#modexp-gas-cost-increase}

MODEXP, RSA imza doğrulaması ve kanıt sistemlerinde kullanılan bir tür büyük sayı matematiği olan modüler üs almayı hesaplayan yerleşik bir ön derleme işlevidir. Sözleşmelerin bu hesaplamaları kendileri uygulamak zorunda kalmadan doğrudan çalıştırmalarını sağlar.

Geliştiriciler ve istemci ekipleri, mevcut gaz fiyatlandırmasının belirli girdilerin ne kadar bilgi işlem gücü gerektirdiğini genellikle hafife alması nedeniyle MODEXP'i blok gaz limitini artırmanın önündeki büyük bir engel olarak tanımladılar. Bu, MODEXP kullanan bir işlemin, tüm bir bloku işlemek için gereken sürenin çoğunu alabileceği ve ağı yavaşlatabileceği anlamına gelir.

Bu EIP, fiyatlandırmayı gerçek hesaplama maliyetleriyle eşleştirmek için şu şekilde değiştirir:

- minimum ücreti 200'den 500 gaza yükseltmek ve genel maliyet hesaplamasında EIP-2565'ten gelen üçte birlik indirimi kaldırmak
- üssü girdisi çok uzun olduğunda maliyeti daha keskin bir şekilde artırmak. eğer üs (ikinci argüman olarak geçtiğiniz "kuvvet" sayısı) 32 bayt / 256 bitten daha uzunsa, gaz ücreti her ek bayt için çok daha hızlı artar
- büyük taban veya modülü de ek olarak ücretlendirmek. Diğer iki sayının (taban ve modül) en az 32 bayt olduğu varsayılır - eğer biri daha büyükse, maliyet boyutuna orantılı olarak artar

Maliyetleri gerçek işlem süresiyle daha iyi eşleştirerek, MODEXP artık bir blokun doğrulanmasının çok uzun sürmesine neden olamaz. Bu değişiklik, gelecekte Ethereum’un blok gaz limitini artırmayı güvenli hale getirmeyi amaçlayan birkaç değişiklikten biridir.

**Kaynaklar**: [EIP-7883 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7883)

#### RLP Yürütüm Bloku Boyut Limiti {#rlp-execution-block-size-limit}

Bu, bir blokun ne kadar büyük olabileceğine dair bir tavan oluşturur - bu, ağ üzerinden _gönderilen_ şeye bir sınırdır ve bir blok içindeki _işi_ sınırlayan gaz limitinden ayrıdır. Blok boyutu üst sınırı 10 MiB'dir ve her şeyin sığması ve temiz bir şekilde yayılması için fikir birliği verilerine ayrılmış küçük bir pay (2 MiB) bulunur. Bundan daha büyük bir blok gelirse, istemciler onu reddeder.
Buna ihtiyaç vardır çünkü çok büyük blokların ağ genelinde yayılması ve doğrulanması daha uzun sürer ve fikir birliği sorunları yaratabilir veya bir DoS vektörü olarak kötüye kullanılabilir. Ayrıca, fikir birliği katmanının dedikodu protokolü zaten ~10 MiB üzerindeki blokları iletmez, bu nedenle yürütme katmanını bu sınıra hizalamak, garip “bazıları tarafından görüldü, diğerleri tarafından atıldı” durumlarını önler.

İşin incelikleri: bu, [RLP](/developers/docs/data-structures-and-encoding/rlp/) ile kodlanmış yürütüm bloku boyutunda bir üst sınırdır. Toplam 10 MiB, işaret zinciri bloğu çerçevelemesi için ayrılmış 2 MiB güvenlik payı ile. Pratikte, istemciler şöyle tanımlar

`MAX_BLOCK_SIZE = 10.485.760` bayt ve

`SAFETY_MARGIN = 2.097.152` bayt,

ve RLP yükü aşağıdaki değeri aşan herhangi bir yürütüm blokunu reddeder

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Amaç, en kötü durum yayılma/doğrulama süresini sınırlamak ve fikir birliği katmanı dedikodu davranışıyla uyumlu hale gelmek, gaz muhasebesini değiştirmeden yeniden düzenleme/DoS riskini azaltmaktır.

**Kaynaklar**: [EIP-7934 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7934)

#### Varsayılan gaz limitini 60 milyona ayarlama {#set-default-gas-limit-to-60-million}

Gaz limitinin Şubat 2025'te 30M'den 36M'ye (ve ardından 45M'ye) yükseltilmesinden önce, bu değer Birleşim'den (Eylül 2022) bu yana değişmemişti. Bu EIP, tutarlı ölçeklendirmeyi bir öncelik haline getirmeyi amaçlamaktadır.

EIP-7935, YK istemci ekiplerini Fusaka için varsayılan gaz limitini bugünün 45M'sinin üzerine çıkarmak üzere koordine eder. Bu bir Bilgilendirici EIP'dir, ancak istemcilerden açıkça geliştirme ağlarında daha yüksek limitleri test etmelerini, güvenli bir değer üzerinde birleşmelerini ve bu sayıyı Fusaka sürümlerinde göndermelerini ister.

Geliştirme ağı planlaması, ~60M stresi (sentetik yük ile dolu bloklar) ve tekrarlayan artışları hedefler; araştırma, en kötü durum blok boyutu patolojilerinin ~150M'nin altında bağlayıcı olmaması gerektiğini söylüyor. Dağıtım, işlem gaz limiti üst sınırı (EIP-7825) ile eşleştirilmelidir, böylece sınırlar yükseldikçe hiçbir tek işlem baskın olamaz.

**Kaynaklar**: [EIP-7935 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7935)

### KD'yi iyileştirme {#improve-ux}

#### Deterministik teklifçi ileriye bakışı {#deterministic-proposer-lookahead}

EIP-7917 ile İşaret Zinciri, bir sonraki dönem için gelecek blok teklifçilerinden haberdar olacaktır. Gelecekteki blokları hangi doğrulayıcıların teklif edeceğine dair deterministik bir görüşe sahip olmak, [ön onaylamaları](https://ethresear.ch/t/based-preconfirmations/17353) mümkün kılabilir - kullanıcı işleminin gerçek bloku beklemeden bloklarına dahil edileceğini garanti eden gelecek teklifçiyle bir taahhüt.

Bu özellik, doğrulayıcıların teklifçi programını manipüle edebileceği uç durumları önlediği için istemci uygulamalarına ve ağın güvenliğine fayda sağlar. İleriye bakış aynı zamanda uygulamanın daha az karmaşık olmasını sağlar.

**Kaynaklar**: [EIP-7917 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7917)

#### Baştaki sıfırları sayma (CLZ) işlem kodu {#count-leading-zeros-opcode}

Bu özellik, küçük bir EVM talimatı olan **baştaki sıfırları saymayı (CLZ)** ekler. EVM'deki hemen hemen her şey 256 bitlik bir değer olarak temsil edilir—bu yeni işlem kodu, önde kaç tane sıfır bit olduğunu döndürür. Bu, daha verimli aritmetik işlemleri mümkün kıldığı için birçok komut seti mimarisinde yaygın bir özelliktir. Pratikte bu, günümüzün elle hazırlanmış bit taramalarını tek bir adımda birleştirir, böylece ilk ayarlanmış biti bulmak, baytları taramak veya bit alanlarını ayrıştırmak daha basit ve daha ucuz hale gelir. İşlem kodu düşük, sabit maliyetlidir ve temel bir toplama ile aynı seviyede olduğu kıyaslanmıştır, bu da aynı iş için bayt kodunu kısaltır ve gaz tasarrufu sağlar.

**Kaynaklar**: [EIP-7939 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7939)

#### secp256r1 Eğri Desteği için Ön Derleme {#secp256r1-precompile}

Sabit `0x100` adresinde, birçok K2 tarafından zaten benimsenmiş olan aynı çağrı formatını kullanarak ve uç durumları düzelterek, geçiş anahtarı tarzı bir secp256r1 (P-256) imza denetleyicisi sunar, böylece bu ortamlar için yazılan sözleşmeler K1'de değişiklik yapmadan çalışır.

KD yükseltmesi! Kullanıcılar için bu, cihaza özgü imzalama ve geçiş anahtarlarının kilidini açar. Cüzdanlar doğrudan Apple Secure Enclave, Android Keystore, donanım güvenlik modüllerine (HSM'ler) ve FIDO2/WebAuthn'a erişebilir - güvenlik kelimeleri yok, daha sorunsuz katılım ve modern uygulamalar gibi hissettiren çok faktörlü akışlar. Bu, daha iyi KD, daha kolay kurtarma ve milyarlarca cihazın zaten yaptığı hesap soyutlama desenleri ile sonuçlanır.

Geliştiriciler için, 160 baytlık bir girdi alır ve 32 baytlık bir çıktı döndürür, bu da mevcut kütüphaneleri ve K2 sözleşmelerini taşımayı kolaylaştırır. Arka planda, geçerli çağrıcıları bozmadan zorlu uç durumları ortadan kaldırmak için sonsuzdaki nokta ve modüler karşılaştırma kontrolleri içerir.

**Kaynaklar**:

- [EIP-7951 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7951)
- [RIP-7212 hakkında daha fazla bilgi](https://www.alchemy.com/blog/what-is-rip-7212) _(Not: EIP-7951, RIP-7212'nin yerini almıştır)_

### Meta {#meta}

#### `eth_config` JSON-RPC yöntemi {#eth-config}

Bu, düğümünüze hangi çatallanma ayarlarını çalıştırdığınızı sormanıza olanak tanıyan bir JSON-RPC çağrısıdır. Doğrulayıcıların ve izleme araçlarının istemcilerin yaklaşan bir çatallanma için hizalandığını doğrulaması için `current` (mevcut), `next` (sonraki) ve `last` (son) olmak üzere üç anlık görüntü döndürür.

Pratik olarak, bu, Pectra çatallanması 2025'in başlarında Holesky test ağında canlıya geçtiğinde keşfedilen bir eksikliği ele almak içindir; küçük yanlış yapılandırmalar sonuçlanmayan bir duruma yol açmıştır. Bu, test ekiplerinin ve geliştiricilerin, geliştirme ağlarından test ağlarına ve test ağlarından Ana Ağa geçerken büyük çatallanmaların beklendiği gibi davranacağından emin olmalarına yardımcı olur.

Anlık görüntüler şunları içerir: `chainId`, `forkId`, planlanan çatallanma aktivasyon zamanı, hangi ön derlemelerin aktif olduğu, ön derleme adresleri, sistem sözleşmesi bağımlılıkları ve çatallanmanın blob programı.

Bu EIP, "Çekirdek EIP'ler"den ayrı bir bölümde yer almaktadır çünkü çatallanma aslında herhangi bir değişiklik uygulamamaktadır - bu, istemci ekiplerinin bu JSON-RPC yöntemini Fusaka yükseltmesine kadar uygulaması gerektiğine dair bir bildirimdir.

**Kaynaklar**: [EIP-7910 teknik belirtimi](https://eips.ethereum.org/EIPS/eip-7910)

## SSS {#faq}

### Bu yükseltme tüm Ethereum düğümlerini ve doğrulayıcılarını etkiliyor mu? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}
Evet, Fusaka yükseltmesi hem [yürütüm istemcileri hem de fikir birliği istemcileri](/developers/docs/nodes-and-clients/) için güncellemeler gerektirir. Tüm ana Ethereum istemcileri, yüksek öncelikli olarak işaretlenen sert çatallanmayı destekleyen sürümler yayımlayacak. Bu sürümlerin ne zaman mevcut olacağını istemci Github depolarından, [Discord kanallarından](https://ethstaker.org/support), [EthStaker Discord](https://dsc.gg/ethstaker)'dan veya protokol güncellemeleri için Ethereum bloguna abone olarak takip edebilirsiniz. Yükseltme sonrasında Ethereum ağı ile senkronizasyonu sürdürmek için düğüm operatörlerinin desteklenen bir istemci sürümü çalıştırdıklarından emin olmaları gerekir. İstemci sürümleri hakkındaki bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın.

### Sert çatallanma sonrasında ETH nasıl dönüştürülebilir? {#how-can-eth-be-converted-after-the-hardfork}

- **ETH'niz İçin Hiçbir İşlem Gerekmiyor**: Ethereum Fusaka yükseltmesinin ardından, ETH'nizi dönüştürmeniz ya da yükseltmeniz gerekmez. Hesap bakiyeleriniz aynı kalacak ve sert çatallanmanın ardından şu an sahip olduğunuz ETH mevcut biçiminde erişilebilir olacaktır.
- **Dolandırıcılıklara Karşı Dikkatli Olun!** <Emoji text="⚠️" /> **ETH'nizi "yükseltmenizi" söyleyen kişiler sizi dolandırmaya çalışıyor.** Bu yükseltmeyle ilgili yapmanız gereken hiçbir şey yok. Varlıklarınız hiçbir şekilde etkilenmeyecek. Unutmayın, bilgi sahibi olmak dolandırıcılıklardan korunmanın en iyi yoludur.

[Dolandırıcılığı tanıma ve dolandırıcılıktan kaçınma hakkında daha fazla bilgi](/güvenlik/)

### Zebraların olayı ne? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra, Fusaka'nın geliştiriciler tarafından seçilen "maskotudur" çünkü çizgileri, PeerDAS'ın sütun tabanlı veri kullanılabilirliği örneklemesini yansıtır; burada düğümler belirli sütun alt ağlarını muhafaza eder ve blob verilerinin mevcut olup olmadığını kontrol etmek için her bir eşin yuvasından birkaç başka sütunu örnekler.

2022'deki Birleşim, yürütüm ve fikir birliği katmanlarının birleşmesini belirtmek için [bir pandayı](https://x.com/hwwonx/status/1431970802040127498) maskot olarak kullanmıştı. O zamandan beri, her çatallanma için gayri resmi olarak maskotlar seçildi ve yükseltme zamanında istemci günlüklerinde ASCII sanatı olarak göründü. Bu sadece kutlamak için eğlenceli bir yol.

### K2 Ölçeklendirme için hangi iyileştirmeler dahil edildi? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas), çatallanmanın ana özelliğidir. Toplamalar için daha fazla ölçeklenebilirlik sağlayan veri kullanılabilirliği örneklemesini (DAS) uygular, teorik olarak blob alanını mevcut boyutunun 8 katına kadar ölçeklendirir. Blob ücreti piyasası ayrıca, sıkışıklığa verimli bir şekilde tepki vermek ve K2'lerin, blob'ların düğümlere yüklediği hesaplama ve alan için anlamlı bir ücret ödemesini garanti etmek üzere iyileştirilecektir.

### BPO çatallanmaları nasıl farklıdır? {#how-are-bpo-forks-different}

Yalnızca Blob Parametresi çatallanmaları, PeerDAS etkinleştirildikten sonra, tam bir koordineli yükseltmeyi beklemek zorunda kalmadan blob sayısını (hem hedef hem de maksimum) sürekli olarak artırmak için bir mekanizma sağlar. Her artış, Fusaka'yı destekleyen istemci sürümlerinde önceden yapılandırılacak şekilde sabit kodlanmıştır.

Kullanıcı veya doğrulayıcı olarak, her BPO için istemcilerinizi güncellemeniz gerekmez ve yalnızca Fusaka gibi büyük hardforkları takip ettiğinizden emin olmanız yeterlidir. Bu, öncekiyle aynı uygulamadır, özel bir eylem gerekmez. Yine de yükseltmeler ve BPO'lar etrafında istemcilerinizi izlemeniz ve hardfork'u takiben düzeltmeler veya optimizasyonlar gelebileceği için büyük sürümler arasında bile güncel tutmanız önerilir.

### BPO takvimi nedir? {#what-is-the-bpo-schedule}

BPO güncellemelerinin kesin takvimi Fusaka sürümleriyle belirlenecektir. Sürümler hakkında bilgi almak için [Protokol duyurularını](https://blog.ethereum.org/category/protocol) ve istemcilerinizin sürüm notlarını takip edin.

Nasıl görünebileceğine dair bir örnek:

- Fusaka'dan önce: hedef 6, maksimum 9
- Fusaka aktivasyonunda: hedef 6, maksimum 9
- BPO1, Fusaka aktivasyonundan birkaç hafta sonra: hedef 10, maksimum 15, üçte iki artışla
- BPO2, BPO1'den birkaç hafta sonra: hedef 14, maksimum 21

### Bu, Ethereum'daki (katman 1) ücretleri düşürecek mi? {#will-this-lower-gas}

Bu yükseltme, en azından doğrudan K1 üzerindeki gaz ücretlerini düşürmez. Ana odak noktası, toplama verileri için daha fazla blob alanı sağlamak, dolayısıyla katman 2 üzerindeki ücretleri düşürmektir. Bunun K1 ücret piyasasında bazı yan etkileri olabilir ancak önemli bir değişiklik beklenmemektedir.

### Bir staker olarak, yükseltme için ne yapmam gerekiyor? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Her ağ yükseltmesinde olduğu gibi, istemcilerinizi Fusaka desteğiyle işaretlenmiş en son sürümlere güncellediğinizden emin olun. Sürümler hakkında bilgi almak için posta listesindeki güncellemeleri ve [EF Blog'daki Protokol Duyurularını](https://blog.ethereum.org/category/protocol) takip edin.
Fusaka Ana Ağa etkinleştirilmeden önce kurulumunuzu doğrulamak için, test ağlarında bir doğrulayıcı çalıştırabilirsiniz. Fusaka, [test ağlarında daha erken etkinleştirilir](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), bu da her şeyin yolunda gittiğinden emin olmanız ve hataları bildirmeniz için size daha fazla alan tanır. Test ağı çatallanmaları da posta listesinde ve blogda duyurulur.

### "Deterministik Teklifçi İleriye Bakışı" (EIP-7917) doğrulayıcıları etkiler mi? {#does-7917-affect-validators}

Bu değişiklik, doğrulayıcı istemcinizin çalışma şeklini değiştirmez, ancak doğrulayıcı görevlerinizin geleceği hakkında daha fazla bilgi sağlayacaktır. Yeni özelliklere ayak uydurmak için izleme araçlarınızı güncellediğinizden emin olun.

### Fusaka, düğümler ve doğrulayıcılar için bant genişliği gereksinimlerini nasıl etkiler? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS, düğümlerin blob verilerini nasıl ilettiği konusunda önemli bir değişiklik yapar. Tüm veriler, 128 alt ağda sütun adı verilen parçalara bölünür ve düğümler bunlardan yalnızca bazılarına abone olur. Düğümlerin muhafaza etmesi gereken alt ağ sütunlarının miktarı, yapılandırmalarına ve bağlı doğrulayıcı sayısına bağlıdır. Gerçek bant genişliği gereksinimleri, ağda izin verilen blob miktarına ve düğümün türüne bağlı olacaktır. Fusaka aktivasyonu anında blob hedefi eskisi gibi kalır, ancak PeerDAS ile düğüm operatörleri blob'ların disk kullanımında ve ağ trafiğinde bir düşüş görebilirler. BPO'lar ağda daha yüksek sayıda blob yapılandırdıkça, gerekli bant genişliği her BPO ile artacaktır.

Düğüm gereksinimleri, Fusaka BPO'larından sonra bile [önerilen sınırlar](https://eips.ethereum.org/EIPS/eip-7870) dahilindedir.

#### Tam düğümler {#full-nodes}

Herhangi bir doğrulayıcısı olmayan normal düğümler yalnızca 4 alt ağa abone olacak ve orijinal verilerin 1/8'ini muhafaza edecektir. Bu, aynı miktarda blob verisiyle, düğümün bunları indirme bant genişliğinin sekiz (8) kat daha küçük olacağı anlamına gelir. Normal bir tam düğüm için blob'ların disk kullanımı ve indirme bant genişliği yaklaşık %80 azalarak yalnızca birkaç Mb'ye düşebilir.

#### Bireysel Paydaşlar {#solo-stakers}

Düğüm bir doğrulayıcı istemcisi için kullanılıyorsa, daha fazla sütun muhafaza etmesi ve dolayısıyla daha fazla veri işlemesi gerekir. Bir doğrulayıcı eklendiğinde, düğüm en az 8 sütun alt ağına abone olur ve bu nedenle normal düğümden iki kat daha fazla veri işler, ancak yine de Fusaka'dan daha azdır. Doğrulayıcı bakiyesi 287 ETH'nin üzerindeyse, giderek daha fazla alt ağa abone olunacaktır.

Tek başına bir staker için bu, disk kullanımının ve indirme bant genişliğinin yaklaşık %50 azalacağı anlamına gelir. Ancak, blokları yerel olarak oluşturmak ve tüm blob'ları ağa yüklemek için daha fazla yükleme bant genişliği gerekir. Yerel oluşturucuların, Fusaka zamanında eskisinden 2-3 kat daha yüksek yükleme bant genişliğine ihtiyacı olacak ve BPO2 hedefi olan 15/21 blob ile nihai gerekli yükleme bant genişliğinin yaklaşık 5 kat daha yüksek, 100Mbps civarında olması gerekecektir.

#### Büyük doğrulayıcılar {#large-validators}

Abone olunan alt ağların sayısı, düğüme eklenen daha fazla bakiye ve doğrulayıcı ile artar. Örneğin, yaklaşık 800 ETH bakiye ile düğüm 25 sütunu muhafaza eder ve eskisinden yaklaşık %30 daha fazla indirme bant genişliğine ihtiyaç duyar. Gerekli yükleme, normal düğümlere benzer şekilde artar ve en az 100Mbps gereklidir.

4096 ETH'de, 2 maksimum bakiye doğrulayıcı ile, düğüm tüm sütunları muhafaza eden bir 'süper düğüm' haline gelir, bu nedenle her şeyi indirir ve depolar. Bu düğümler, eksik verileri geri katkıda bulunarak ağı aktif olarak iyileştirir, ancak aynı zamanda çok daha fazla bant genişliği ve depolama gerektirir. Nihai blob hedefinin eskisinden 6 kat daha yüksek olmasıyla, süper düğümler yaklaşık 600 GB ek blob verisi depolamak ve yaklaşık 20 Mbps'de daha hızlı sürekli indirme bant genişliğine sahip olmak zorunda kalacak.

[Beklenen gereksinimler hakkında daha fazla ayrıntı okuyun.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Hangi EVM değişiklikleri uygulanmaktadır? {#what-evm-changes-are-implemented}

Fusaka, yeni küçük değişiklikler ve özelliklerle EVM'yi sağlamlaştırır.

- Ölçeklendirme sırasında güvenlik için, tek bir işlemin maksimum boyutu [16,7 milyon](https://eips.ethereum.org/EIPS/eip-7825) gaz birimi ile sınırlandırılacaktır.
- [Yeni işlem kodu baştaki sıfırları sayma (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) EVM'ye eklenir ve akıllı sözleşme dillerinin belirli işlemleri daha verimli bir şekilde gerçekleştirmesini sağlar.
- [`ModExp` ön derlemesinin maliyeti artırılacak](https://eips.ethereum.org/EIPS/eip-7883)—onu kullanan sözleşmeler yürütme için daha fazla gaz talep edecektir.

### Yeni 16M gaz limiti sözleşme geliştiricilerini nasıl etkiler? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka, [tek bir işlemin maksimum boyutunu 16,7 milyon](https://eips.ethereum.org/EIPS/eip-7825) (2^24) gaz birimiyle sınırlar. Bu, kabaca önceki bir ortalama blok boyutuna eşittir, bu da onu tüm bir bloku tüketecek kadar karmaşık işlemleri barındırmak için yeterince büyük kılar. Bu sınır, daha yüksek blok gaz limiti ile gelecekteki potansiyel DoS saldırılarını önleyerek istemciler için koruma oluşturur. Ölçeklendirmenin amacı, tek bir işlemin tüm bloku tüketmeden blokzincire daha fazla işlem girmesini sağlamaktır.

Normal kullanıcı işlemleri bu sınıra ulaşmaktan çok uzaktır. Büyük ve karmaşık DeFi işlemleri, büyük akıllı sözleşme dağıtımları veya birden çok sözleşmeyi hedefleyen toplu işlemler gibi belirli uç durumlar bu değişiklikten etkilenebilir. Bu işlemler daha küçük olanlara bölünmeli veya başka bir şekilde optimize edilmelidir. Potansiyel olarak sınıra ulaşan işlemleri göndermeden önce simülasyon kullanın.

RPC yöntemi `eth_call` sınırlı değildir ve gerçek blokzincir limitinden daha büyük işlemlerin simülasyonuna izin verecektir. RPC yöntemleri için gerçek limit, kötüye kullanımı önlemek için istemci operatörü tarafından yapılandırılabilir.

### CLZ geliştiriciler için ne anlama geliyor? {#what-clz-means-for-developers}

Solidity gibi EVM derleyicileri, arka planda sıfırları saymak için yeni işlevi uygulayacak ve kullanacaktır. Yeni sözleşmeler, bu tür işlemlere dayanıyorlarsa gaz tasarrufundan faydalanabilirler. Potansiyel tasarruflar hakkında dokümantasyon için akıllı sözleşme dilinin sürümlerini ve özellik duyurularını takip edin.

### Mevcut akıllı sözleşmelerim için herhangi bir değişiklik var mı? {#what-clz-means-for-developers}

Fusaka'nın, mevcut sözleşmeleri bozacak veya davranışlarını değiştirecek doğrudan bir etkisi yoktur. Yürütme katmanına getirilen değişiklikler geriye dönük uyumlulukla yapılır, ancak her zaman uç durumlara ve potansiyel etkilere dikkat edin.

[`ModExp` ön derlemesinin artan maliyetiyle](https://eips.ethereum.org/EIPS/eip-7883), ona bağlı olan sözleşmeler yürütme için daha fazla gaz tüketecektir. Sözleşmeniz buna büyük ölçüde dayanıyorsa ve kullanıcılar için daha pahalı hale geliyorsa, nasıl kullanıldığını yeniden gözden geçirin.

Sözleşmelerinizi yürüten işlemler benzer bir boyuta ulaşıyorsa [yeni 16,7 milyonluk limiti](https://eips.ethereum.org/EIPS/eip-7825) göz önünde bulundurun.

## Daha fazla kaynak {#further-reading}

- [Ethereum yol haritası](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Fusaka test ağı blog duyurusu](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Fusaka ve Pectra Ethereum'a Neler Getirecek](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereum'un Sonraki Yükseltmeleri: Preston Van Loon ile Fusaka, Glamsterdam ve Ötesi](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Fusaka Dosyaları](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIP'ler Açıklandı](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
