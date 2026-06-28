---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Fusaka protokol güncellemesi hakkında bilgi edinin
lang: tr
authors: ["Nixo", "Mario Havel"]
---

**Ethereum'un merakla beklenen Fusaka güncellemesi 3 Aralık 2025'te yayına girdi**

Fusaka ağ güncellemesi [Pectra](/roadmap/pectra/)'yı takip eder ve her [Ethereum](/) kullanıcısı ile geliştiricisi için daha fazla yeni özellik getirerek deneyimi iyileştirir. İsim, yürütme katmanı güncellemesi Osaka ve adını Fulu yıldızından alan mutabakat katmanı sürümünden oluşur. Ethereum'un her iki kısmı da Ethereum ölçeklendirmesini, güvenliğini ve kullanıcı deneyimini geleceğe taşıyan bir güncelleme alır.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Fusaka güncellemesi, Ethereum'un uzun vadeli geliştirme hedeflerinde yalnızca tek bir adımdır. [Protokol yol haritası](/roadmap/) ve [önceki güncellemeler](/ethereum-forks/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Fusaka'daki İyileştirmeler {#improvements-in-fusaka}

### Blob'ları ölçeklendirme {#scale-blobs}

#### PeerDAS {#peerdas}

Bu, Fusaka çatallanmasının _başrol oyuncusu_, bu güncellemede eklenen ana özelliktir. Katman 2'ler (L2) şu anda verilerini Ethereum'a, katman 2'ler için özel olarak oluşturulmuş geçici veri türü olan blob'lar halinde gönderir. Fusaka öncesinde, her tam düğüm verilerin var olduğundan emin olmak için her blob'u depolamak zorundadır. Blob işlem kapasitesi arttıkça, tüm bu verileri indirmek zorunda kalmak savunulamaz derecede kaynak yoğun hale gelir.

[Veri kullanılabilirliği örneklemesi (DAS)](https://notes.ethereum.org/@fradamt/das-fork-choice) ile, tüm blob verilerini depolamak zorunda kalmak yerine, her düğüm blob verilerinin bir alt kümesinden sorumlu olacaktır. Blob'lar ağdaki düğümler arasında tekdüze rastgele dağıtılır ve her tam düğüm verilerin yalnızca 1/8'ini tutar, böylece teorik olarak 8 kata kadar ölçeklendirme sağlanır. Verilerin kullanılabilirliğini sağlamak için, verilerin herhangi bir kısmı, yanlış veya eksik veri olasılığını kriptografik olarak ihmal edilebilir bir seviyeye (~10<sup>20</sup>'de bir ila 10<sup>24</sup>'te bir) düşüren yöntemlerle bütünün mevcut herhangi bir %50'sinden yeniden oluşturulabilir.

Bu, düğümler için donanım ve bant genişliği gereksinimlerini makul tutarken, katman 2'ler için daha küçük ücretlerle daha fazla ölçeklendirme sağlayan blob ölçeklendirmesini mümkün kılar.

[PeerDAS hakkında daha fazla bilgi edinin](/roadmap/fusaka/peerdas/)

**Kaynaklar**:

- [EIP-7594 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7594)
- [PeerDAS Üzerine DappLion: Ethereum'u Bugün Ölçeklendirmek | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademik: Ethereum'un PeerDAS Dokümantasyonu (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Yalnızca Blob Parametreli (BPO) çatallanmalar {#blob-parameter-only-forks}

Katman 2'ler Ethereum'u ölçeklendirir - ağları büyüdükçe Ethereum'a daha fazla veri göndermeleri gerekir. Bu, Ethereum'un zaman geçtikçe onlar için mevcut olan blob sayısını artırması gerekeceği anlamına gelir. PeerDAS blob verilerini ölçeklendirmeyi sağlasa da, bunun kademeli ve güvenli bir şekilde yapılması gerekir.

Ethereum, aynı kurallar üzerinde mutabakat gerektiren binlerce bağımsız düğüm üzerinde çalışan bir kod olduğu için, bir web sitesi güncellemesi dağıtır gibi blob sayısını artırmak gibi değişiklikleri basitçe sunamayız. Herhangi bir kural değişikliği, her düğümün, istemcinin ve doğrulayıcı yazılımının aynı önceden belirlenmiş bloktan önce güncellendiği koordineli bir güncelleme olmalıdır.

Bu koordineli güncellemeler genellikle birçok değişiklik içerir, çok fazla test gerektirir ve bu zaman alır. Değişen katman 2 blob ihtiyaçlarına daha hızlı uyum sağlamak için, yalnızca blob parametreli çatallanmalar, bu güncelleme takvimini beklemek zorunda kalmadan blob'ları artırmak için bir mekanizma sunar.

Yalnızca blob parametreli çatallanmalar, gaz limiti gibi diğer yapılandırmalara benzer şekilde istemciler tarafından ayarlanabilir. Büyük Ethereum güncellemeleri arasında, istemciler `target` ve `max` blob'larını örneğin 9 ve 12'ye çıkarmak için anlaşabilir ve ardından düğüm operatörleri bu küçük çatallanmada yer almak için güncelleme yapacaktır. Bu yalnızca blob parametreli çatallanmalar herhangi bir zamanda yapılandırılabilir.

Blob'lar Dencun güncellemesinde ağa ilk eklendiğinde hedef 3'tü. Bu, Pectra'da 6'ya çıkarıldı ve Fusaka'dan sonra, artık bu büyük ağ güncellemelerinden bağımsız olarak sürdürülebilir bir oranda artırılabilir.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Grafik kaynağı: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Kaynaklar**: [EIP-7892 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7892)

#### Yürütme maliyetleriyle sınırlandırılmış blob taban ücreti {#blob-base-fee-bounded-by-execution-costs}

Katman 2'ler veri gönderdiklerinde iki fatura öderler: blob ücreti ve bu blob'ları doğrulamak için gereken yürütme gazı. Yürütme gazı baskın gelirse, blob ücreti müzayedesi 1 Wei'ye kadar düşebilir ve bir fiyat sinyali olmaktan çıkabilir.

EIP-7918, her blob'un altına orantılı bir rezerv fiyatı sabitler. Rezerv, nominal blob taban ücretinden yüksek olduğunda, ücret ayarlama algoritması bloğu hedefin üzerinde olarak değerlendirir ve ücreti aşağı çekmeyi bırakarak normal şekilde artmasına izin verir. Sonuç olarak:

- blob ücreti piyasası her zaman tıkanıklığa tepki verir
- katman 2'ler, düğümlere dayattıkları hesaplamanın en azından anlamlı bir dilimini öderler
- yürütme katmanındaki (EL) taban ücret sıçramaları artık blob ücretini 1 Wei'de mahsur bırakamaz

**Kaynaklar**:

- [EIP-7918 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7918)
- [Storybook açıklayıcısı](https://notes.ethereum.org/@anderselowsson/AIG)

### Katman 1'i (L1) Ölçeklendirme {#scale-l1}

#### Geçmiş sonlanması ve daha basit makbuzlar {#history-expiry}

Temmuz 2025'te, Ethereum yürütme istemcileri [kısmi geçmiş sonlanmasını desteklemeye başladı](https://blog.ethereum.org/2025/07/08/partial-history-exp). Bu, Ethereum büyümeye devam ederken düğüm operatörlerinin ihtiyaç duyduğu disk alanını azaltmak amacıyla [Birleşme](https://ethereum.org/roadmap/merge/)'den daha eski geçmişi düşürdü.

Bu EIP, "Çekirdek EIP'ler"den ayrı bir bölümdedir çünkü çatallanma aslında herhangi bir değişiklik uygulamaz - bu, istemci ekiplerinin Fusaka güncellemesine kadar geçmiş sonlanmasını desteklemesi gerektiğine dair bir bildirimdir. Pratik olarak, istemciler bunu istedikleri zaman uygulayabilirler ancak bunu güncellemeye eklemek, somut olarak yapılacaklar listelerine koydu ve Fusaka değişikliklerini bu özellikle birlikte test etmelerini sağladı.

**Kaynaklar**: [EIP-7642 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7642)

#### MODEXP için üst sınırlar belirleme {#set-upper-bounds-for-modexp}

Şimdiye kadar, MODEXP ön derlemesi neredeyse her boyuttaki sayıları kabul ediyordu. Bu, test edilmesini zorlaştırdı, kötüye kullanılmasını kolaylaştırdı ve istemci kararlılığı için riskli hale getirdi. EIP-7823 net bir sınır koyar: her girdi numarası en fazla 8192 bit (1024 bayt) uzunluğunda olabilir. Daha büyük olan her şey reddedilir, işlemin gazı yakılır ve hiçbir durum değişikliği meydana gelmez. Gaz limiti planlamasını ve güvenlik incelemelerini karmaşıklaştıran aşırı durumları ortadan kaldırırken gerçek dünya ihtiyaçlarını çok rahat bir şekilde karşılar. Bu değişiklik, kullanıcı veya geliştirici deneyimini etkilemeden daha fazla güvenlik ve DoS koruması sağlar.

**Kaynaklar**: [EIP-7823 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7823)

#### İşlem Gaz Limiti Sınırı {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825), işlem başına 16.777.216 (2^24) gaz sınırı ekler. Blok gaz limitini yükseltirken herhangi bir tek işlemin en kötü durum maliyetini sınırlandırarak proaktif bir DoS güçlendirmesidir. Gaz limitini yükselterek ölçeklendirmeyle başa çıkmamıza olanak tanımak için doğrulama ve yayılımı modellemeyi kolaylaştırır.

Neden tam olarak 2^24 gaz? Günümüzün gaz limitinden rahatça daha küçüktür, gerçek sözleşme dağıtımları ve ağır ön derlemeler için yeterince büyüktür ve 2'nin bir kuvveti olması istemciler arasında uygulanmasını kolaylaştırır. Bu yeni maksimum işlem boyutu, Pectra öncesi ortalama blok boyutuna benzerdir ve bu da onu Ethereum'daki herhangi bir işlem için makul bir sınır haline getirir.

**Kaynaklar**: [EIP-7825 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7825)

#### `MODEXP` gaz maliyeti artışı {#modexp-gas-cost-increase}

MODEXP, RSA imza doğrulaması ve kanıt sistemlerinde kullanılan bir tür büyük sayı matematiği olan modüler üs almayı hesaplayan yerleşik bir ön derleme işlevidir. Sözleşmelerin bu hesaplamaları kendileri uygulamak zorunda kalmadan doğrudan çalıştırmalarına olanak tanır.

Geliştiriciler ve istemci ekipleri, mevcut gaz fiyatlandırmasının genellikle belirli girdilerin ne kadar hesaplama gücü gerektirdiğini hafife alması nedeniyle MODEXP'i blok gaz limitini artırmanın önünde büyük bir engel olarak belirlediler. Bu, MODEXP kullanan bir işlemin tüm bir bloğu işlemek için gereken sürenin çoğunu alabileceği ve ağı yavaşlatabileceği anlamına gelir.

Bu EIP, fiyatlandırmayı gerçek hesaplama maliyetleriyle eşleşecek şekilde şu yollarla değiştirir:

- minimum ücreti 200'den 500 gaza çıkarmak ve genel maliyet hesaplamasında EIP-2565'ten gelen üçte bir indirimini kaldırmak
- üs girdisi çok uzun olduğunda maliyeti daha keskin bir şekilde artırmak. Üs (ikinci argüman olarak ilettiğiniz "kuvvet" sayısı) 32 bayt / 256 bitten uzunsa, gaz ücreti her ekstra bayt için çok daha hızlı tırmanır
- büyük taban veya modül için de ekstra ücret almak. Diğer iki sayının (taban ve modül) en az 32 bayt olduğu varsayılır - eğer herhangi biri daha büyükse, maliyet boyutuyla orantılı olarak artar

Maliyetleri gerçek işlem süresiyle daha iyi eşleştirerek, MODEXP artık bir bloğun doğrulanmasının çok uzun sürmesine neden olamaz. Bu değişiklik, gelecekte Ethereum'un blok gaz limitini artırmayı güvenli hale getirmeyi amaçlayan birkaç değişiklikten biridir.

**Kaynaklar**: [EIP-7883 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7883)

#### RLP Yürütme Blok Boyutu Limiti {#rlp-execution-block-size-limit}

Bu, bir bloğun ne kadar büyük olmasına izin verildiğine dair bir tavan oluşturur - bu, ağ üzerinden _gönderilen_ şeyin bir sınırıdır ve bir bloğun içindeki _işi_ sınırlayan gaz limitinden ayrıdır. Blok boyutu sınırı 10 MiB'dir ve her şeyin temiz bir şekilde sığması ve yayılması için mutabakat verilerine ayrılmış küçük bir pay (2 MiB) vardır. Bir blok bundan daha büyük görünürse, istemciler onu reddeder.
Buna ihtiyaç vardır çünkü çok büyük blokların ağ genelinde yayılması ve doğrulanması daha uzun sürer ve mutabakat sorunları yaratabilir veya bir DoS vektörü olarak kötüye kullanılabilir. Ayrıca, mutabakat katmanının dedikodu (gossip) protokolü zaten ~10 MiB'nin üzerindeki blokları iletmez, bu nedenle yürütme katmanını bu limite hizalamak "bazıları tarafından görülen, diğerleri tarafından düşürülen" tuhaf durumlardan kaçınır.

İşin özü: bu, [RLP](/developers/docs/data-structures-and-encoding/rlp/) kodlu yürütme bloğu boyutu üzerinde bir sınırdır. İşaret zinciri bloğu çerçevelemesi için ayrılmış 2 MiB güvenlik marjı ile toplam 10 MiB. Pratik olarak, istemciler şunları tanımlar:

`MAX_BLOCK_SIZE = 10,485,760` bayt ve

`SAFETY_MARGIN = 2,097,152` bayt,

ve RLP yükü aşağıdakini aşan herhangi bir yürütme bloğunu reddeder:

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Amaç, en kötü durum yayılım/doğrulama süresini sınırlandırmak ve mutabakat katmanı dedikodu davranışıyla hizalanmak, gaz muhasebesini değiştirmeden yeniden düzenleme (re-org)/DoS riskini azaltmaktır.

**Kaynaklar**: [EIP-7934 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7934)

#### Varsayılan gaz limitini 60 milyona ayarlama {#set-default-gas-limit-to-60-million}

Şubat 2025'te gaz limitini 30 milyondan 36 milyona (ve ardından 45 milyona) yükseltmeden önce, bu değer Birleşme'den (Eylül 2022) bu yana değişmemişti. Bu EIP, tutarlı ölçeklendirmeyi bir öncelik haline getirmeyi amaçlamaktadır.

EIP-7935, yürütme katmanı (EL) istemci ekiplerini Fusaka için varsayılan gaz limitini bugünün 45 milyonunun üzerine çıkarmak üzere koordine eder. Bu Bilgilendirici bir EIP'dir, ancak istemcilerden geliştirici ağlarında daha yüksek limitleri test etmelerini, güvenli bir değerde birleşmelerini ve bu sayıyı Fusaka sürümlerinde göndermelerini açıkça ister.

Geliştirici ağı planlaması ~60 milyon stresi (sentetik yüklü tam bloklar) ve yinelemeli artışları hedefler; araştırmalar, en kötü durum blok boyutu patolojilerinin ~150 milyonun altında bağlanmaması gerektiğini söylüyor. Sunum, limitler yükseldikçe hiçbir tek işlemin baskın olamaması için işlem gaz limiti sınırı (EIP-7825) ile eşleştirilmelidir.

**Kaynaklar**: [EIP-7935 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7935)

### Kullanıcı Deneyimini (UX) İyileştirme {#improve-ux}

#### Belirlenimci teklif edici öngörüsü {#deterministic-proposer-lookahead}

EIP-7917 ile İşaret zinciri, bir sonraki dönem için yaklaşan blok teklif edicilerinin farkında olacaktır. Hangi doğrulayıcıların gelecekteki blokları teklif edeceğine dair belirlenimci bir görüşe sahip olmak, [ön onayları](https://ethresear.ch/t/based-preconfirmations/17353) - yaklaşan teklif edici ile kullanıcı işleminin gerçek bloğu beklemeden kendi bloklarına dahil edileceğini garanti eden bir taahhüt - mümkün kılabilir.

Bu özellik, doğrulayıcıların teklif edici programını manipüle edebileceği uç durumları önlediği için istemci uygulamalarına ve ağın güvenliğine fayda sağlar. Öngörü ayrıca uygulamanın daha az karmaşık olmasına da olanak tanır.

**Kaynaklar**: [EIP-7917 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7917)

#### Öndeki sıfırları sayma (CLZ) işlem kodu {#count-leading-zeros-opcode}

Bu özellik, küçük bir EVM talimatı olan **öndeki sıfırları sayma (CLZ)** ekler. EVM'deki hemen hemen her şey 256 bitlik bir değer olarak temsil edilir—bu yeni işlem kodu önde kaç tane sıfır biti olduğunu döndürür. Bu, daha verimli aritmetik işlemlere olanak tanıdığı için birçok komut seti mimarisinde yaygın bir özelliktir. Pratikte bu, günümüzün elle yazılmış bit taramalarını tek bir adıma indirger, böylece ilk ayarlanan biti bulmak, baytları taramak veya bit alanlarını ayrıştırmak daha basit ve daha ucuz hale gelir. İşlem kodu düşük, sabit maliyetlidir ve temel bir toplama işlemiyle aynı seviyede olduğu kıyaslanmıştır, bu da baytkodu kırpar ve aynı iş için gaz tasarrufu sağlar.

**Kaynaklar**: [EIP-7939 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7939)

#### secp256r1 Eğri Desteği için Ön Derleme {#secp256r1-precompile}

Sabit `0x100` adresinde, halihazırda birçok katman 2 (L2) tarafından benimsenen aynı çağrı formatını kullanan ve uç durumları düzelten yerleşik, geçiş anahtarı tarzı bir secp256r1 (P-256) imza denetleyicisi sunar, böylece bu ortamlar için yazılan sözleşmeler katman 1'de (L1) değişiklik yapılmadan çalışır.

Kullanıcı deneyimi (UX) güncellemesi! Kullanıcılar için bu, cihaza özgü imzalama ve geçiş anahtarlarının kilidini açar. Cüzdanlar doğrudan Apple Secure Enclave, Android Keystore (anahtar deposu), donanım güvenlik modülleri (HSM'ler) ve FIDO2/WebAuthn'den yararlanabilir - kurtarma ifadesi yok, daha sorunsuz sisteme katılım ve modern uygulamalar gibi hissettiren çok faktörlü akışlar. Bu, daha iyi UX, daha kolay kurtarma ve milyarlarca cihazın halihazırda yaptığıyla eşleşen hesap soyutlama kalıplarıyla sonuçlanır.

Geliştiriciler için, 160 baytlık bir girdi alır ve 32 baytlık bir çıktı döndürür, bu da mevcut kütüphaneleri ve L2 sözleşmelerini taşımayı kolaylaştırır. Arka planda, geçerli arayanları bozmadan zorlu uç durumları ortadan kaldırmak için sonsuzdaki nokta ve modüler karşılaştırma kontrollerini içerir.

**Kaynaklar**:

- [EIP-7951 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7951)
- [RIP-7212 hakkında daha fazlası](https://www.alchemy.com/blog/what-is-rip-7212) _(EIP-7951'in RIP-7212'nin yerini aldığını unutmayın)_

### Meta {#meta}

#### `eth_config` JSON-RPC yöntemi {#eth-config}

Bu, düğümünüze hangi çatallanma ayarlarını çalıştırdığınızı sormanıza olanak tanıyan bir JSON-RPC çağrısıdır. Doğrulayıcıların ve izleme araçlarının istemcilerin yaklaşan bir çatallanma için sıraya girdiğini doğrulayabilmesi için üç anlık görüntü döndürür: `current`, `next` ve `last`.

Pratik olarak konuşursak, bu, Pectra çatallanması 2025'in başlarında Holesky test ağında yayına girdiğinde, sonuçlanmayan bir duruma yol açan küçük yanlış yapılandırmalarla keşfedilen bir eksikliği gidermek içindir. Bu, test ekiplerinin ve geliştiricilerin, geliştirici ağlarından test ağlarına ve test ağlarından Ana Ağ'a geçerken büyük çatallanmaların beklendiği gibi davranmasını sağlamalarına yardımcı olur.

Anlık görüntüler şunları içerir: `chainId`, `forkId`, planlanan çatallanma etkinleştirme zamanı, hangi ön derlemelerin aktif olduğu, ön derleme adresleri, sistem sözleşmesi bağımlılıkları ve çatallanmanın blob programı.

Bu EIP, "Çekirdek EIP'ler"den ayrı bir bölümdedir çünkü çatallanma aslında herhangi bir değişiklik uygulamaz - bu, istemci ekiplerinin Fusaka güncellemesine kadar bu JSON-RPC yöntemini uygulaması gerektiğine dair bir bildirimdir.

**Kaynaklar**: [EIP-7910 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7910)

## SSS {#faq}

### Bu güncelleme tüm Ethereum düğümlerini ve doğrulayıcılarını etkiliyor mu? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Evet, Fusaka güncellemesi hem [yürütme istemcilerinde hem de mutabakat istemcilerinde](/developers/docs/nodes-and-clients/) güncellemeler gerektirir. Tüm ana Ethereum istemcileri, yüksek öncelikli olarak işaretlenmiş sert çatallanmayı destekleyen sürümler yayınlayacaktır. Bu sürümlerin ne zaman kullanıma sunulacağını istemci GitHub depolarından, [Discord kanallarından](https://ethstaker.org/support), [EthStaker Discord](https://dsc.gg/ethstaker)'undan veya protokol güncellemeleri için Ethereum bloguna abone olarak takip edebilirsiniz. Güncelleme sonrası Ethereum ağıyla senkronizasyonu sürdürmek için düğüm operatörleri desteklenen bir istemci sürümünü çalıştırdıklarından emin olmalıdır. İstemci sürümleri hakkındaki bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın.

### Sert çatallanmadan sonra ETH nasıl dönüştürülebilir? {#how-can-eth-be-converted-after-the-hardfork}

- **ETH'niz İçin Hiçbir İşlem Gerekmez**: Ethereum Fusaka güncellemesinin ardından ETH'nizi dönüştürmenize veya güncellemenize gerek yoktur. Hesap bakiyeleriniz aynı kalacak ve şu anda elinizde bulunan ETH, sert çatallanmadan sonra mevcut haliyle erişilebilir kalacaktır.
- **Dolandırıcılıklara Karşı Dikkatli Olun!** <Emoji text="⚠️" /> **Size ETH'nizi "güncellemenizi" söyleyen herkes sizi dolandırmaya çalışıyordur.** Bu güncellemeyle ilgili yapmanız gereken hiçbir şey yoktur. Varlıklarınız tamamen etkilenmeden kalacaktır. Unutmayın, bilgili kalmak dolandırıcılıklara karşı en iyi savunmadır.

[Dolandırıcılıkları tanıma ve bunlardan kaçınma hakkında daha fazlası](/security/)

### Zebraların olayı ne? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra, Fusaka'nın geliştiriciler tarafından seçilen "maskotudur" çünkü çizgileri, düğümlerin belirli sütun alt ağlarını koruduğu ve blob verilerinin mevcut olup olmadığını kontrol etmek için her eşin slotundan birkaç başka sütunu örneklediği PeerDAS'ın sütun tabanlı veri kullanılabilirliği örneklemesini yansıtır.

2022'deki Birleşme, yürütme ve mutabakat katmanlarının birleştiğini belirtmek için maskot olarak [bir panda kullandı](https://x.com/hwwonx/status/1431970802040127498). O zamandan beri, her çatallanma için gayri resmi olarak maskotlar seçildi ve güncelleme sırasında istemci günlüklerinde ASCII sanatı olarak göründü. Bu sadece kutlamanın eğlenceli bir yolu.

### L2 Ölçeklendirmesi için hangi iyileştirmeler dahil edilmiştir? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) çatallanmanın ana özelliğidir. Toplamalar (Rollup) için daha fazla ölçeklenebilirliğin kilidini açan ve teorik olarak blob alanını mevcut boyutun 8 katına kadar ölçeklendiren veri kullanılabilirliği örneklemesini (DAS) uygular. Blob ücreti piyasası da tıkanıklığa verimli bir şekilde tepki verecek ve L2'lerin blob'ların düğümlere dayattığı hesaplama ve alan için anlamlı bir ücret ödemesini garanti edecek şekilde iyileştirilecektir.

### BPO çatallanmaları nasıl farklıdır? {#how-are-bpo-forks-different}

Yalnızca Blob Parametreli (BPO) çatallanmalar, PeerDAS etkinleştirildikten sonra tam koordineli bir güncellemeyi beklemek zorunda kalmadan blob sayısını (hem hedef hem de maksimum) sürekli olarak artırmak için bir mekanizma sağlar. Her artış, Fusaka'yı destekleyen istemci sürümlerinde önceden yapılandırılacak şekilde kodlanmıştır.

Bir kullanıcı veya doğrulayıcı olarak, her BPO için istemcilerinizi güncellemeniz gerekmez ve yalnızca Fusaka gibi büyük sert çatallanmaları takip ettiğinizden emin olmanız gerekir. Bu öncekiyle aynı uygulamadır, özel bir eyleme gerek yoktur. Yine de güncellemeler ve BPO'lar civarında istemcilerinizi izlemeniz ve sert çatallanmayı düzeltmeler veya optimizasyonlar takip edebileceğinden büyük sürümler arasında bile güncel tutmanız önerilir.

### BPO takvimi nedir? {#what-is-the-bpo-schedule}

BPO güncellemelerinin kesin takvimi Fusaka sürümleriyle belirlenecektir. [Protokol duyurularını](https://blog.ethereum.org/category/protocol) ve istemcilerinizin sürüm notlarını takip edin.

Nasıl görünebileceğine dair örnek:

- Fusaka öncesi: hedef 6, maksimum 9
- Fusaka etkinleştirmesinde: hedef 6, maksimum 9
- BPO1, Fusaka etkinleştirmesinden birkaç hafta sonra: hedef 10, maksimum 15, üçte iki oranında artıyor
- BPO2, BPO1'den birkaç hafta sonra: hedef 14, maksimum 21

### Bu, Ethereum'daki (katman 1) ücretleri düşürecek mi? {#will-this-lower-gas}

Bu güncelleme, en azından doğrudan, L1'deki gaz ücretlerini düşürmez. Ana odak noktası, rollup verileri için daha fazla blob alanıdır, bu nedenle katman 2'deki ücretleri düşürür. Bunun L1 ücret piyasasında bazı yan etkileri olabilir ancak önemli bir değişiklik beklenmemektedir.

### Bir staker olarak güncelleme için ne yapmam gerekiyor? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Her ağ güncellemesinde olduğu gibi, istemcilerinizi Fusaka desteğiyle işaretlenmiş en son sürümlere güncellediğinizden emin olun. Sürümler hakkında bilgi almak için e-posta listesindeki güncellemeleri ve [EF Blogundaki Protokol Duyurularını](https://blog.ethereum.org/category/protocol) takip edin.
Fusaka Ana Ağ'da etkinleştirilmeden önce kurulumunuzu doğrulamak için test ağlarında bir doğrulayıcı çalıştırabilirsiniz. Fusaka [test ağlarında daha erken etkinleştirilir](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), bu da size her şeyin çalıştığından emin olmak ve hataları bildirmek için daha fazla alan sağlar. Test ağı çatallanmaları da e-posta listesinde ve blogda duyurulur.

### "Belirlenimci Teklif Edici Öngörüsü" (EIP-7917) doğrulayıcıları etkiler mi? {#does-7917-affect-validators}

Bu değişiklik doğrulayıcı istemcinizin nasıl çalıştığını değiştirmez, ancak doğrulayıcı görevlerinizin geleceği hakkında daha fazla içgörü sağlayacaktır. Yeni özelliklere ayak uydurmak için izleme araçlarınızı güncellediğinizden emin olun.

### Fusaka, düğümler ve doğrulayıcılar için bant genişliği gereksinimlerini nasıl etkiler? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS, düğümlerin blob verilerini nasıl ilettiği konusunda önemli bir değişiklik yapar. Tüm veriler, düğümlerin yalnızca bazılarına abone olduğu 128 alt ağ boyunca sütun adı verilen parçalara bölünür. Düğümlerin koruması gereken alt ağ sütunlarının miktarı, yapılandırmalarına ve bağlı doğrulayıcı sayısına bağlıdır. Gerçek bant genişliği gereksinimleri, ağda izin verilen blob miktarına ve düğümün türüne bağlı olacaktır. Fusaka etkinleştirildiği anda blob hedefi eskisi gibi kalır, ancak PeerDAS ile düğüm operatörleri blob disk kullanımlarında ve ağ trafiğinde bir azalma görebilirler. BPO'lar ağda daha yüksek sayıda blob yapılandırdıkça, gerekli bant genişliği her BPO ile artacaktır.

Düğüm gereksinimleri, Fusaka BPO'larından sonra bile hala [önerilen marjlar](https://eips.ethereum.org/EIPS/eip-7870) içindedir.

#### Tam düğümler {#full-nodes}

Herhangi bir doğrulayıcısı olmayan normal düğümler yalnızca 4 alt ağa abone olacak ve orijinal verilerin 1/8'i için koruma sağlayacaktır. Bu, aynı miktarda blob verisiyle, bunları indirmenin düğüm bant genişliğinin sekiz (8) kat daha küçük olacağı anlamına gelir. Normal bir tam düğüm için blob'ların disk kullanımı ve indirme bant genişliği yaklaşık %80 azalarak yalnızca birkaç Mb'a düşebilir.

#### Bireysel staker'lar {#solo-stakers}

Düğüm bir doğrulayıcı istemcisi için kullanılıyorsa, daha fazla sütunu koruması ve dolayısıyla daha fazla veri işlemesi gerekir. Bir doğrulayıcı eklendiğinde, düğüm en az 8 sütun alt ağına abone olur ve bu nedenle normal düğümden iki kat daha fazla veri işler ancak yine de Fusaka öncesinden daha azdır. Doğrulayıcı bakiyesi 287 ETH'nin üzerindeyse, giderek daha fazla alt ağa abone olunacaktır.

Bireysel bir staker için bu, disk kullanımlarının ve indirme bant genişliklerinin yaklaşık %50 azalacağı anlamına gelir. Ancak blokları yerel olarak oluşturmak ve tüm blob'ları ağa yüklemek için daha fazla yükleme bant genişliğine ihtiyaç vardır. Yerel oluşturucular, Fusaka zamanında eskisinden 2-3 kat daha yüksek yükleme bant genişliğine ihtiyaç duyacak ve 15/21 blob'luk BPO2 hedefiyle, nihai gerekli yükleme bant genişliğinin yaklaşık 5 kat daha yüksek, 100 Mbps civarında olması gerekecektir.

#### Büyük doğrulayıcılar {#large-validators}

Abone olunan alt ağların sayısı, düğüme daha fazla bakiye ve doğrulayıcı eklendikçe artar. Örneğin, yaklaşık 800 ETH bakiyesinde, düğüm 25 sütunu korur ve eskisinden yaklaşık %30 daha fazla indirme bant genişliğine ihtiyaç duyacaktır. Gerekli yükleme normal düğümlere benzer şekilde artar ve en az 100 Mbps gereklidir.

4096 ETH'de, 2 maksimum bakiye doğrulayıcısı ile düğüm, tüm sütunları koruyan, dolayısıyla her şeyi indiren ve depolayan bir 'süper düğüm' haline gelir. Bu düğümler eksik verileri geri katarak ağı aktif olarak iyileştirir ancak aynı zamanda çok daha fazla bant genişliği ve depolama gerektirir. Nihai blob hedefinin eskisinden 6 kat daha yüksek olmasıyla, süper düğümlerin yaklaşık 600 GB ekstra blob verisi depolaması ve yaklaşık 20 Mbps'de daha hızlı sürekli indirme bant genişliğine sahip olması gerekecektir.

[Beklenen gereksinimler hakkında daha fazla ayrıntı okuyun.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Hangi EVM değişiklikleri uygulandı? {#what-evm-changes-are-implemented}

Fusaka, yeni küçük değişiklikler ve özelliklerle EVM'yi sağlamlaştırır.

- Ölçeklendirme sırasında güvenlik için, tek bir işlemin maksimum boyutu 16,7 milyon gaz birimiyle [sınırlandırılacaktır](https://eips.ethereum.org/EIPS/eip-7825).
- [Yeni işlem kodu öndeki sıfırları sayma (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) EVM'ye eklenmiştir ve akıllı sözleşme dillerinin belirli işlemleri daha verimli bir şekilde gerçekleştirmesini sağlayacaktır.
- [`ModExp` ön derlemesinin maliyeti artırılacaktır](https://eips.ethereum.org/EIPS/eip-7883)—bunu kullanan sözleşmeler yürütme için daha fazla gaz talep edecektir.

### Yeni 16 milyon gaz limiti sözleşme geliştiricilerini nasıl etkiler? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka, [tek bir işlemin maksimum boyutuna 16,7 milyon](https://eips.ethereum.org/EIPS/eip-7825) (2^24) gaz birimi sınırı getirir. Bu, kabaca ortalama bir bloğun önceki boyutudur ve bu da onu tüm bir bloğu tüketecek karmaşık işlemleri barındıracak kadar büyük yapar. Bu sınır, istemciler için koruma sağlayarak gelecekte daha yüksek blok gaz limitiyle olası DoS saldırılarını önler. Ölçeklendirmenin amacı, tek bir işlemin tüm bloğu tüketmeden daha fazla işlemin blokzincire girmesini sağlamaktır.

Normal kullanıcı işlemleri bu sınıra ulaşmaktan çok uzaktır. Büyük ve karmaşık DeFi operasyonları, büyük akıllı sözleşme dağıtımları veya birden fazla sözleşmeyi hedefleyen toplu işlemler gibi belirli uç durumlar bu değişiklikten etkilenebilir. Bu işlemlerin daha küçük işlemlere bölünmesi veya başka bir şekilde optimize edilmesi gerekecektir. Potansiyel olarak sınıra ulaşan işlemleri göndermeden önce simülasyon kullanın.

`eth_call` RPC yöntemi sınırlı değildir ve gerçek blokzincir sınırından daha büyük işlemlerin simülasyonuna izin verecektir. RPC yöntemleri için gerçek sınır, kötüye kullanımı önlemek amacıyla istemci operatörü tarafından yapılandırılabilir.

### CLZ geliştiriciler için ne anlama geliyor? {#what-clz-means-for-developers}

Solidity gibi EVM derleyicileri, arka planda sıfırları saymak için yeni işlevi uygulayacak ve kullanacaktır. Yeni sözleşmeler, bu tür bir işleme dayanıyorlarsa gaz tasarrufundan faydalanabilirler. Potansiyel tasarruflara ilişkin dokümantasyon için akıllı sözleşme dilinin sürümlerini ve özellik duyurularını takip edin.

### Mevcut akıllı sözleşmelerim için herhangi bir değişiklik var mı? {#what-clz-means-for-developers-2}

Fusaka'nın mevcut sözleşmeleri bozacak veya davranışlarını değiştirecek doğrudan bir etkisi yoktur. Yürütme katmanına getirilen değişiklikler geriye dönük uyumlulukla yapılır, ancak her zaman uç durumlara ve olası etkilere dikkat edin.

[`ModExp` ön derlemesinin artan maliyetiyle](https://eips.ethereum.org/EIPS/eip-7883), buna bağlı olan sözleşmeler yürütme için daha fazla gaz tüketecektir. Sözleşmeniz büyük ölçüde buna dayanıyorsa ve kullanıcılar için daha pahalı hale geliyorsa, nasıl kullanıldığını yeniden gözden geçirin.

Sözleşmelerinizi yürüten işlemler benzer boyuta ulaşıyorsa [yeni 16,7 milyon sınırını](https://eips.ethereum.org/EIPS/eip-7825) göz önünde bulundurun.

## Daha fazla okuma {#further-reading}

- [Ethereum yol haritası](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Fusaka test ağı blog duyurusu](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Fusaka ve Pectra Ethereum'a Neler Getirecek](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereum'un Sonraki Güncellemeleri: Preston Van Loon ile Fusaka, Glamsterdam ve Ötesi](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Fusaka Dosyaları](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Açıklaması](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)