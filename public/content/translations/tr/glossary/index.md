---
title: Ethereum Terimler Sözlüğü
description: Ethereum ile ilgili teknik ve teknik olmayan terimlere ilişkin tamamlanmamış bir sözlük
lang: tr
sidebarDepth: 2
---

# Sözlük {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### %51 saldırısı {#51-attack}

Merkeziyetsiz bir [ağa](#network) yapılan, bir grubun [düğümlerin](#node) çoğunluğunun kontrolünü ele geçirdiği bir saldırı türü. Bu, [işlemleri](#transaction) tersine çevirerek ve [ether](#ether) ile diğer token'ları iki katına çıkararak blok zincirini dolandırmalarına olanak tanır.

## A {#section-a}

### hesap {#account}

[Adres](#address), bakiye, [nonce](#nonce) ve isteğe bağlı depolama ve kod içeren bir nesne. Bir hesap, [bir sözleşme hesabı](#contract-account) veya [harici olarak sahiplenilmiş hesap (EOA)](#eoa) olabilir.

<DocLink href="/developers/docs/accounts">
  Ethereum Hesapları
</DocLink>

### adres {#address}

En genel olarak bu, blok zincirde [işlemleri](#transaction) alabilen (varış adresi) veya gönderebilen (kaynak adresi) bir [EOA](#eoa)'yı veya [sözleşmeyi](#contract-account) temsil eder. Daha spesifik olarak, bir [ECDSA](#ecdsa) [açık anahtarının](#public-key) [Keccak hash değerinin](#keccak-256) en sağdaki 160 bitidir.

### uygulama ikili arayüzü (ABI) {#abi}

Ethereum ekosisteminde [sözleşmeler](#contract-account) ile etkileşim kurmanın standart yolu, hem blok zincirinin dışından hem de sözleşmeden sözleşmeye etkileşimler içindir.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### uygulama programlama arayüzü {#api}

Bir Uygulama Programlama Arayüzü (API), bir yazılım parçasının nasıl kullanılacağına ilişkin bir dizi tanımdır. Bir API, bir uygulama ile bir web sunucusu arasında yer alır ve bunlar arasında veri aktarımını kolaylaştırır.

### ASIC {#asic}

Uygulamaya Özel Entegre Devre. Bu genellikle kripto para madenciliği için özel olarak oluşturulmuş entegre bir devre anlamına gelir.

### öne sürmek {#assert}

[Solidity](#solidity)'de, `assert(false)`, kalan tüm [gazı](#gas) kullanan geçersiz bir işlem kodu olan `0xfe`'e derler ve tüm değişiklikleri geri alır. Bir `assert()` ifadesi başarısız olduğunda, çok yanlış ve beklenmedik bir şey olduğunda, kodunuzu düzeltmeniz gerekecek. Asla ve asla olmaması gereken koşullardan kaçınmak için `assert()` kullanmalısınız.

<DocLink href="/developers/docs/smart-contracts/security/">
  Akıllı sözleşme güvenliği
</DocLink>

### tasdikleme {#attestation}

Bir varlık tarafından bir şeyin doğru olduğuna dair yapılan iddiadır. Ethereum açısından bakıldığında mutabakat doğrulayıcıları, zincirin inandıkları durumunun ne olduğuna dair iddia ortaya atmak zorundadır. Her doğrulayıcı belirli zamanlarda doğrulayıcının, kesinleşmiş son kontrol noktası ve zincirin o andaki başını içeren zincir hakkındaki görüşünü resmi olarak açıklayan farklı tasdikler yayımlamak ile yükümlüdür.

<DocLink href="/developers/docs/consensus-mechanisms/pos/attestations/">
  Tasdikler
</DocLink>

<Divider />

## B {#section-b}

### Ana Ücret {#base-fee}

Her [blok](#block), "ana ücret" olarak bilinen bir rezerv fiyatına sahiptir. Bir kullanıcının sonraki bloka bir işlemi dahil etmesi için ödemesi gereken minimum [gaz](#gas) ücretidir.

<DocLink href="/developers/docs/gas/">
  Gaz ve ücretler
</DocLink>

### İşaret Zinciri {#beacon-chain}

İşaret Zinciri, Ethereum'a [hisse ispatı](#pos) ve [doğrulayıcıları](#validator) getiren blokzincirdir. Aralık 2020'den iki zincirin birleştirildiği Eylül 2022'ye dek iş ispatı Ethereum ana ağını oluşturmak için birlikte çalışarak günümüxün Ethereum'nu kurmuştur.

<DocLink href="/roadmap/beacon-chain/">
  İşaret Zinciri
</DocLink>

### düşük son haneli (big-endian) {#big-endian}

En önemli basamağın, bellekte ilk olduğu konumsal sayı gösterimi. En az anlamlı basamağın ilk olduğu küçük endian'ın tersi.

### blok {#block}

Bir blok, sıralı bir işlem listesi ve mutabakatla ilgili bilgileri içeren birleştirilmiş bir bilgi birimidir. Bloklar, hisse ispatı doğrulayıcıları tarafından önerilir ve bu noktada bloklar tüm eşler arası ağ boyunca paylaşılır; bu ağda tüm diğer düğümler tarafından bağımsız olarak doğrulanabilir. Mutabakat kuralları, bir bloğun hangi içeriklerinin geçerli kabul edileceğini belirler ve geçersiz bloklar ağ tarafından göz ardı edilir. Bu blokların sıralanması ve içerdikleri işlemler, belirleyici bir olay zinciri oluşturur ve sonu, ağın güncel durumunu temsil eder.

<DocLink href="/developers/docs/blocks/">
  Bloklar
</DocLink>

### blok arayıcısı {#block-explorer}

Kullanıcının bir blok zincirinden ve blok zinciri hakkında bilgi aramasına olanak sağlayan bir arayüz. Bu, bireysel işlemlerin, belirli adreslerle ilişkili etkinliklerin ve ağ hakkındaki bilgilerin alınmasını içerir.

### blok başlığı {#block-header}

Blok başlığı, bir blok hakkındaki meta veriler ile yürütme yükündeki işlemlerin özetinin toplamıdır.

### blok yayılımı {#block-propagation}

Onaylanmış bir bloğu ağdaki tüm diğer düğümlere iletme süreci.

### blok önerici {#block-proposer}

Belirli bir [yuvada](#slot) bir blok oluşturmak için seçilen spesifik doğrulayıcı.

### blok ödülü {#block-reward}

Yeni bir geçerli bloğu önerene ödül olarak verilen ether miktarı.

### blok durumu {#block-status}

Bir bloğun var olabileceği durumlar. Olası durumlar şunlardır:

- önerilen: blok, bir doğrulayıcı tarafından önerilmiştir
- zamanlanmış: doğrulayıcılar şu anda veri göndermektedir
- kaçırılmış/atlanmış: öneren, uygun zaman aralığında bir blok önermemiştir.
- bırakılmış: blok, [çatallanma seçim algoritması](#fork-choice-algorithm) tarafından yeniden organize edilmiştir

### blok süresi {#block-time}

Blokzincire eklenen bloklar arasındaki ortalama zaman aralığı.

### blok doğrulaması {#block-validation}

Yeni bir bloğun geçerli işlemler ve imzalar içerdiğini, en ağır tarihsel zinciri temel aldığını ve diğer tüm mutabakat kurallarına uyduğunu teyit etme sürecidir. Geçerli bloklar zincirin sonuna eklenir ve ağdaki diğerlerine yayılır. Geçersiz bloklar göz ardı edilir.

### blokzincir {#blockchain}

Her biri önceki bloğun karmasına başvuruda bulunarak [başlangıç bloğuna](#genesis-block) dek kendinden öncekine bağlantı veren bir [bloklar](#block) dizisidir. Blok zincirinin bütünlüğü, hisse ispatı tabanlı bir mutabakat mekanizması kullanılarak kripto-ekonomik açıdan güvence altına alınır.

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Blok zincir nedir?
</DocLink>

### başlangıç düğümü {#bootnode}

Bir düğüm çalıştırılırken keşif sürecini başlatmak için kullanılabilecek düğümler. Bu düğümlerin uç noktaları, Ethereum kaynak koduna kaydedilir.

### bit kodu {#bytecode}

Bir yazılım yorumlayıcısı veya bir sanal makine tarafından verimli bir şekilde yürütülmesi için tasarlanmış soyut bir talimat seti. İnsan tarafından okunabilen kaynak kodunun aksine, bit kodu sayısal biçimde ifade edilir.

### Bizans çatalı {#byzantium-fork}

[Metropolis](#metropolis) geliştirme aşamasının iki [sert çatalanmasının](#hard-fork) ilki. [Buz Devri](#ice-age)'nin 1 yıl ertelendiği ve blok ödülünün 5'ten 3 ether'e düşürüldüğü EIP-649 Metropolis [Bomba Değeri](#difficulty-bomb) Gecikmesi ve Blok Ödülü Azaltmasını içermiştir.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG, [fikir birliği istemcilerinin](#consensus-client) İşaret Zinciri'nin başı konusunda anlaşmaya varmaları için [LMD-GHOST](#lmd-ghost) çatallanma seçim algoritması ile birlikte kullanılan bir hisse ispatı mutabakat protokolüdür.

### kontrol noktası {#checkpoint}

[İşaret Zinciri](#beacon-chain), yuva (12 saniye) ve dönem (32 yuva) olarak ayrılmış bir tempoya sahiptir. Her dönemdeki ilk yuva bir kontrol noktasıdır. Doğrulayıcıların [nitelikli çoğunluğu](#supermajority) iki kontrol noktası arasındaki bağlantıyı tasdik ettiğinde, bu kontrol noktaları [doğrulanabilir](#justification) ve ardından başka bir kontrol noktası da bunlardan sonra doğrulanırsa bağlantı [kesinleştirilebilir](#finality).

### derleme {#compiling}

Yüksek seviyeli bir programlama dilinde yazılmış kodu (örn. [Solidity](#solidity)) daha düşük seviyeli bir dile dönüştürme (örn. Ethereum Sanal Makinesi [bit kodu](#bytecode)).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Akıllı Sözleşmeleri Derleme
</DocLink>

### kurul {#committee}

Her bir yuvada blok doğrulamak üzere atanmış en az 128 [doğrulayıcıdan](#validator) oluşan grup. Kuruldaki doğrulayıcılardan biri, kurulun tasdikte fikir birliğine varan diğer tüm doğrulayıcılarının imzalarını toplamakla yükümlü olan toplayıcıdır. [Senkronizasyon kurulu](#sync-committee) ile karıştırılmamalıdır.

### hesaplamaya uygun olmama {#computational-infeasibility}

Bir süreç, onu gerçekleştirmeye ilgi duyabilecek herhangi biri için uygulanamayacak kadar uzun bir zaman (örneğin milyarlarca yıl) alacaksa hesaplama açısından uygunsuzdur.

### mutabakat {#consensus}

Ağdaki düğümlerin nitelikli çoğunluğunun tümü kendi yerel doğrulanmış en iyi blokzincirlerinde aynı bloklara sahip oldukları durumdur. [Mutabakat kuralları](#consensus-rules) ile karıştırılmamalıdır.

### fikir birliği istemcisi {#consensus-client}

Fikir birliği istemcileri (Prysm, Teku, Nimbus, Lighthouse, Lodestar gibi) Ethereum'un [hisse ispatı](#pos) mutabakat algoritmasını çalıştırarak ağın İşaret Zincirinin başı hakkında anlaşmaya varmasını sağlar. Fikir birliği istemcileri, işlemlerin doğrulanmasına/yayımlanmasına veya durum geçişlerinin yürütülmesine katılmazlar. Bu, [yürütüm istemcileri](#execution-client) tarafından yapılır.

### konsensus katmanı {#consensus-layer}

Ethereum'un fikir birliği katmanı, bir [fikir birliği istemcileri](#consensus-client) ağıdır.

### mutabakat kuralları {#consensus-rules}

Tam düğümlerin diğer düğümlerle mutabakat sağlamak için izlediği blok doğrulama kurallarıdır. [Mutabakat](#consensus) ile karıştırılmamalıdır.

### Dahil Edilmek Üzere Değerlendirilmiş (CFI) {#cfi}

Henüz Ana Ağ üzerinde aktif olmayan bir Temel [EIP](#eip)'dir ve istemci geliştiricileri genellikle fikre olumlu bakar. Ana ağın dahil edilmesi adına tüm gereksinimleri karşıladığını varsayarsak potansiyel olarak bir ağ yükseltmesinde (mutlaka bir sonrakinde olmak zorunda değil) yer alabilir.

### Konstantinopolis çatalı {#constantinople-fork}

[Metropolis](#metropolis) aşamasının ikinci kısmıdır, başlangıçta 2018 ortası için planlanmıştır. Diğer değişikliklerin yanı sıra hibrit bir [iş ispatı](#pow)/[hisse kanıtı](#pos) mutabakat algoritmasına geçişi içermesi bekleniyor.

### sözleşme hesabı {#contract-account}

Başka bir [hesap](#account)tan ([EOA](#eoa) veya [sözleşme](#contract-account)) bir [işlem](#transaction) aldığında yürütülen kodu içeren bir hesaptır.

### sözleşme oluşturma işlemi {#contract-creation-transaction}

Bir sözleşmenin başlatma kodunu içeren özel bir [işlem](#transaction)dir. Alıcı `null` olarak ayarlanmıştır ve sözleşme, kullanıcı adresi ile `nonce`'tan oluşturulan bir adrese dağıtılır. Bir [sözleşmeyi](#contract-account) kaydetmek ve Ethereum blokzinciri üzerinde belgelemek için kullanılır.

### kriptoekonomi {#cryptoeconomics}

Kripto paraların ekonomisidir.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (d darbeli), Eski İngilizce, Orta İngilizce, İzlandaca ve Faroece'de büyük harf "Eth" için kullanılır. Đ'nin İskandinav harfi "eth" olduğu ĐEV veya Đapp (merkeziyetsiz uygulama) gibi kelimelerde kullanılır. Büyük harf eth (Ð) ayrıca kripto para birimi Dogecoin'i sembolize etmek için kullanılır. Bu, genellikle eski Ethereum literatüründe görülür ve günümüzde daha az kullanılmaktadır.

### DAG {#dag}

DAG, Yönlendirilmiş Döngüsüz Grafik anlamına gelir. Düğümler ve aralarındaki bağlantılardan oluşan bir veri yapısıdır. Birleşim'den önce Ethereum, kendi [iş ispatı](#pow) algoritması olan [Ethash](#ethash)'te bir DAG kullanırdı ancak artık [hisse ispatı](#pos)nda kullanılmamaktadır.

### Dapp {#dapp}

Merkeziyetsiz uygulamadır. En düşük seviyede, bir [akıllı sözleşme](#smart-contract) ile bir web kullanıcı arayüzüdür. Daha geniş seviyede ise dapp; açık, merkeziyetsiz, eşler arası altyapı hizmetleri üzerine inşa edilmiş bir web uygulamasıdır. Ek olarak birçok dapp, merkeziyetsiz depolama ve/veya bir mesaj protokolü ve platformu içerir.

<DocLink href="/developers/docs/dapps/">
  Dapp'lere giriş
</DocLink>

### veri kullanılabilirliği {#data-availability}

Bir durumun, ağa bağlı herhangi bir düğümün, durumun dilediği herhangi bir bölümünü indirebilmesine yönelik özelliğidir.

### merkeziyetsizlik {#decentralization}

Süreçlerin kontrolünü ve yürütülmesini merkezi bir varlıktan uzaklaştırma kavramıdır.

### merkeziyetsiz otonom organizasyon (DAO) {#dao}

Hiyerarşik yönetim olmaksızın çalışan bir şirket veya başka bir organizasyondur. DAO, 30 Nisan 2016'da başlatılan ve daha sonra Haziran 2016'da saldırıya uğrayan "DAO" adlı bir sözleşmeye de atıfta bulunabilir; nihayetinde 1.192.000 numaralı blokta bir [sert çatallanma](#hard-fork) (kod adı DAO) gerçekleştirilmesini sağlamış ve bu işlem, saldırıya uğrayan DAO sözleşmesini tersine çevirerek Ethereum ile Ethereum Classic'in birbirine rakip iki sisteme bölünmesine neden olmuştur.

<DocLink href="/dao/">
  Merkeziyetsiz otonom organizasyonlar (DAO'lar)
</DocLink>

### merkeziyetsiz borsa (DEX) {#dex}

Ağdaki eşler ile jeton takas etmenize olanak tanıyan bir tür [dapp](#dapp). Bunlardan birini kullanmak için [ether](#ether) gerekir ([işlem ücretlerini](#transaction-fee) ödemek için) ancak bunlar merkezi borsalar gibi coğrafi kısıtlamalara tabi değildir; yani herkes katılabilir.

<DocLink href="/get-eth/#dex">
  Merkeziyetsiz borsalar
</DocLink>

### tapu {#deed}

[Değiştirilemez token (NFT)](#nft) kısmına bakın.

### mevduat sözleşmesi {#deposit-contract}

Ethereum üzerinde hisseleme için geçit yoludur. Mevduat sözleşmesi, Ethereum üzerinde, ETH yatırımlarını kabul eden ve doğrulayıcı bakiyelerini yöneten bir akıllı sözleşmedir. Bu sözleşmeye ETH yatırmayan bir doğrulayıcı etkinleştirilemez. Sözleşme, ETH ve girdi verilerine ihtiyaç duyar. Bu girdi verileri, doğrulayıcı açık anahtarını ve doğrulayıcı özel anahtarı ile imzalanmış çekim açık anahtarını içerir. Bu veriler, [hisse ispatı](#pos) ağı tarafından doğrulayıcının kimliğinin belirlenmesi ve onaylanması için gereklidir.

### MeFi {#defi}

"Merkeziyetsiz finans"ın kısaltması, herhangi bir aracı olmadan blok zinciri tarafından desteklenen finansal hizmetler sunmayı amaçlayan geniş bir [merkeziyetsiz uygulama](#dapp) kategorisidir, internet bağlantısı olan herkes katılabilir.

<DocLink href="/defi/">
  Merkeziyetsiz Finans (DeFi)
</DocLink>

### zorluk {#difficulty}

Geçerli bir nonce değeri bulmak için gereken ortalama hesaplama miktarını kontrol eden, [iş ispatı](#pow) ağlarındaki bir ağ çapında ayar. Zorluk, süreç sonunda ortaya çıkan blok karmasında geçerli kabul edilmesi için bulunması gereken öndeki sıfırların sayısı ile belirtilir. Bu konsept, hisse ispatına geçiş sonrası Ethereum'da kullanım dışı bırakılmıştır.

### bomba değeri {#difficulty-bomb}

[İş ispatı](#pow) [zorluk](#difficulty) ayarında, [hisse ispatına](#pos) geçişi desteklemek üzere tasarlanmış ve [çatallanma](#hard-fork) olasılığını azaltan planlı üstel artıştır. Bomba değeri, [hisse ispatına geçiş](/roadmap/merge) ile kullanımdan kaldırılmıştır.

### dijital imza {#digital-signatures}

Bir kullanıcının [özel anahtar](#private-key) kullanarak bir belge için ürettiği kısa bir veri dizisidir. Karşılık gelen [açık anahtar](#public-key), imza ve belgeye sahip olan herkes şunları doğrulayabilir: (1) söz konusu özel anahtarın sahibi tarafından "imzalandığını" ve (2) imzalandıktan sonra belgenin değiştirilmediğini.

<Divider />

### keşif {#discovery}

Bir Ethereum düğümünün bağlanacağı diğer düğümleri bulma sürecidir.

### dağıtılmış karma tablosu (DHT) {#distributed-hash-table}

Bağlanılacak eşleri tanımlamak ve iletişim kurarken hangi protokollerin kullanılacağını belirlemek için Ethereum düğümleri tarafından kullanılan `(key, value)` çiftlerini içeren bir veri yapısıdır.

### çifte harcama {#double-spend}

Yeterli miktarda madencilik gücüne/paya sahip bir kullanıcının, bir miktar kripto para birimini zincir dışına taşıyan bir işlem (örn. itibari paraya dönüştürmek veya zincir dışında satın alım yapmak) gönderdiği ve ardından bu işlemi kaldırmak için blokzinciri yeniden düzenlediği kasıtlı bir blokzincir çatallanmasıdır. Başarılı bir çifte harcama, saldırganı hem zincir içindeki hem de zincir dışındaki varlıklarıyla baş başa bırakır.

## E {#section-e}

### eliptik eğri dijital imza algoritması (ECDSA) {#ecdsa}

Ethereum tarafından fonların yalnızca sahipleri tarafından harcanabilmesini sağlamak için kullanılan bir kriptografik algoritmadır. Açık ve özel anahtarlar oluşturmak için tercih edilen yöntemdir. Hesap [adresi](#address) oluşturma ve [işlem](#transaction) doğrulaması için kullanılır.

### şifreleme {#encryption}

Şifreleme, elektronik verilerin, doğru şifre çözme anahtarının sahibi dışında hiç kimse tarafından okunamayacak bir forma dönüştürülmesidir.

### entropi {#entropy}

Kriptografi bağlamında, öngörülebilirlik eksikliği veya rastgelelik düzeyidir. Algoritmalar, [özel anahtarlar](#private-key) gibi gizli bilgiler üretirken çıktının tahmin edilemez olmasını sağlamak için genellikle yüksek entropi kaynağını temel alır.

### dönem {#epoch}

Her yuvanın 12 saniye olduğu toplamda 6,4 dakikaya karşılık gelen 32 [yuvalık](#slot) bir periyottur. Güvenlik nedenleriyle her dönemde doğrulayıcı [kurulları](#committee) karıştırılır. Her dönem, zincirin [sonlandırılması](#finality) için bir fırsata sahiptir. Her bir dönemin başlangıcında her bir doğrulayıcıya yeni sorumluluklar atanır.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

### belirsizlik {#equivocation}

Birbiriyle çelişen iki mesaj gönderen bir doğrulayıcıdır. Basit bir örneği, aynı nonce ile iki işlem gönderen bir işlem göndericisidir. Bir diğeri, aynı blok yüksekliğinde (veya aynı yuva için) iki blok öneren bir blok önericidir.

### Eth1 {#eth1}

"Eth1", mevcut iş ispatı blokzinciri olan Ethereum Ana Ağı'nı ifade eden bir terimdir. Artık bu terim, yerine "yürütüm katmanı" kullanıldığı için kullanımdan kaldırılmıştır. [Bu ad değişikliği hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Ethereum yükseltmeleri hakkında daha fazla bilgi
</DocLink>

### Eth2 {#eth2}

"Eth2", Ethereum'un hisse ispatına geçişi de dahil olmak üzere bir dizi Ethereum protokolü yükseltmesini ifade eden bir terimdir. Artık bu terim, yerine "fikir birliği katmanı" kullanıldığı için kullanımdan kaldırılmıştır. [Bu ad değişikliği hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Ethereum yükseltmeleri hakkında daha fazla bilgi
</DocLink>

### Ethereum Geliştirme Önerisi (EIP) {#eip}

Önerilen yeni bir özelliği veya süreçlerini veya ortamını açıklayan, Ethereum topluluğuna bilgi sağlayan bir tasarım belgesidir (bkz. [ERC](#erc)).

<DocLink href="/eips/">
  EIP'lere giriş
</DocLink>

### Ethereum İsim Servisi (ENS) {#ens}

ENS kaydı, [EIP](#eip) 137'de açıklandığı gibi, alan adlarından sahiplere ve çözümleyicilere eşleştirme sağlayan tek bir merkezi [sözleşmedir](#smart-contract).

[ens.domains adresinden daha fazla bilgi edinin](https://ens.domains)

### yürütüm istemcisi {#execution-client}

Besu, Erigon, Go-Ethereum (Geth), Nethermind gibi yürütüm istemcilerinin (daha önce ''Eth1 istemcileri'' olarak bilinen) görevi, işlemleri işlemek, yayımlamak ve Ethereum'un durumunu yönetmektir. Protokol kurallarının takip edildiğinden emin olmak amacıyla [Ethereum Sanal Makinası](#evm)'nı kullanarak her bir işlem için hesaplamaları yürütürler.

### yürütüm katmanı {#execution-layer}

Ethereum'un yürütüm katmanı, [yürütüm istemcileri](#execution-client) ağıdır.

### dışarıdan sahip olunan hesap (EOA) {#eoa}

Dışarıdan sahip olunan hesaplar (EOA'lar), genelde [güvenlik kelimeleri](#hd-wallet-seed) kullanılarak oluşturulmuş, [özel anahtarlar](#private-key) tarafından kontrol edilen [hesaplar](#account)dır. Dışarıdan sahip olunan hesaplar, akıllı sözleşmelerin aksine kendileriyle ilişkili herhangi bir kodun olmadığı hesaplardır. Genelde bu hesaplar, bir [cüzdan](#wallet) ile yönetilir.

### Ethereum Yorum Talebi (ERC) {#erc}

Belirli bir Ethereum kullanım standardını tanımlamaya çalışan bazı [EIP'lere](#eip) verilen bir etikettir.

<DocLink href="/eips/">
  EIP'lere giriş
</DocLink>

### Ethash {#ethash}

[Hisse ispatına](#pos) dönüşmeden önce Ethereum'da kullanılmış bir [iş ispatı](#pow) algoritmasıdır.

[Daha fazla bilgi edinin](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### ether {#ether}

Ethereum ekosisteminin, işlemler yürütülürken ortaya çıkan [gaz](#gas) maliyetlerini karşılayan yerel kripto para birimidir. ETH veya Yunanca büyük harfle Xi karakteri olan Ξ sembolü şeklinde de yazılır.

<DocLink href="/eth/">
  Dijital geleceğimiz için para birimi
</DocLink>

### olaylar {#events}

[EVM](#evm) günlük kaydı olanaklarının kullanılmasını mümkün kılar. [Merkeziyetsiz uygulamalar](#dapp), olayları dinleyip kullanıcı arayüzünde JavaScript geri aramalarını tetiklemek için kullanabilir.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Olaylar ve Kayıtlar
</DocLink>

### Ethereum Sanal Makinesi (EVM) {#evm}

[Bit kodu](#bytecode) yürüten yığın tabanlı bir sanal makinedir. Ethereum'da yürütme modeli, bir dizi bit kodu talimatı ve küçük bir çevresel veri demeti verildiğinde, sistem durumunun nasıl değiştirildiğini belirtir. Bu, bir sanal durum makinesinin resmi modeli aracılığıyla belirtilir.

<DocLink href="/developers/docs/evm/">
  Ethereum Sanal Makinesı
</DocLink>

### EVM derleyici dili {#evm-assembly-language}

İnsan tarafından okunabilir bir EVM [bit kodu](#bytecode) biçimidir.

<Divider />

## F {#section-f}

### fallback fonksiyonu {#fallback-function}

Veri veya beyan edilen bir fonksiyon adının olmadığı durumlarda çağrılan varsayılan fonksiyondur.

### musluk {#faucet}

[Akıllı sözleşme](#smart-contract) aracılığıyla gerçekleştirilen ve bir test ağında kullanılabilen ücretsiz test etheri biçiminde fon dağıtan bir hizmettir.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Test ağı muslukları
</DocLink>

### kesinlik {#finality}

Kesinlik, belirli bir zamandan önce yapılan bir dizi işlemin değişmeyeceğinin ve geri alınamayacağının garantisidir.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Hisse ispatı kesinliği
</DocLink>

### finney {#finney}

[ether](#ether)'in bir değeridir. 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### çatallanma {#fork}

Protokolde, alternatif bir zincirin yaratılmasına ya da geçici olarak iki potansiyel blok yoluna ayrılmaya neden olan değişimdir.

### çatallanma-seçim algoritması {#fork-choice-algorithm}

Blokzincirin başını tanımlamak için kullanılan algoritmadır. Yürütüm katmanında zincirin başı, arkasında en büyük toplam zorluk bulunan parça olarak belirlenir. Bu, zincirin gerçek başının, madencilik için en çok çalışmayı gerektiren blok başı olduğu anlamına gelir. Fikir birliği katmanında algoritma, doğrulayıcılardan toplanan tasdikleri takip eder ([LMD_GHOST](#lmd-ghost)).

### sahtecilik kanıtı {#fraud-proof}

Belirli [katman 2](#layer-2) çözümlerine yönelik, hızı artırmak amacıyla işlemlerin gruplar halinde [toplandığı](#rollups) ve tek bir işlemde Ethereum'a gönderildiği bir güvenlik modelidir. Geçerli oldukları varsayılır ancak sahtecilikten şüpheleniliyorsa itiraz edilebilir. Bunun ardından sahtecilik kanıtı, bir sahtecilik gerçekleşip gerçekleşmediğini görmek için işlemi çalıştırır. Bu yöntem, bir yandan güvenliği sürdürürken diğer yandan olası işlem miktarını artırır. Bazı [toplamalar](#rollups)da [doğruluk kanıtları](#validity-proof) kullanılır.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Optimistic rollups
</DocLink>

### sınır {#frontier}

Ethereum'un Temmuz 2015'ten Mart 2016'ya kadar süren ilk test geliştirme aşamasıdır.

<Divider />

## G {#section-g}

### gaz {#gas}

Ethereum'da akıllı sözleşmeleri yürütmek için kullanılan bir sanal yakıttır. [Ethereum Sanal Makinesi](#evm), gaz tüketimini ölçmek ve bilgi işlem kaynaklarının tüketimini sınırlamak (bkz. [Turing tamamlığı](#turing-complete)) için bir muhasebe mekanizması kullanır.

<DocLink href="/developers/docs/gas/">
  Gaz ve Ücretler
</DocLink>

### gaz limiti {#gas-limit}

Bir [işlem](#transaction) veya [blok](#block) tarafından tüketilebilecek maksimum [gaz](#gas) miktarıdır.

### gaz fiyatı {#gas-price}

Bir işlemde belirtilen bir gaz biriminin ether cinsinden fiyatıdır.

### başlangıç bloğu {#genesis-block}

Belirli bir ağı ve onun kripto para birimini başlatmak için kullanılan bir [blokzincir](#blockchain) içindeki ilk bloktur.

### geth {#geth}

Go Ethereum. Ethereum protokolünün Go ile yazılmış en öne çıkan uygulamalarından biridir.

[Bkz. geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Genellikle [gaz](#gas)ı fiyatlandırmak için kullanılan ve [ether](#ether) birimi olan gigawei'nin kısaltmasıdır. 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### sert çatallanma {#hard-fork}

[Blokzincirde](#blockchain) kalıcı bir ayrılmadır; sert çatallı değişim olarak da bilinir. Yükseltilmemiş düğümlerin daha yeni [mutabakat kurallarına](#consensus-rules) uyan yükseltilmiş düğümler tarafından oluşturulmuş blokları doğrulayamadığı zamanlarda yaygın olarak görülür. Çatallanma, yumuşak çatallanma, yazılım çatallanması veya Git çatallanması ile karıştırılmamalıdır.

### karma {#hash}

Bir karma işlevi tarafından üretilen, değişken boyutlu girdinin sabit uzunluktaki parmak izidir. (Bkz. [keccak-256](#keccak-256)).

### karma hızı {#hash-rate}

Madencilik yazılımı çalıştıran bilgisayarlar tarafından saniye başına yapılan karma hesaplamalarının sayısıdır.

### HD cüzdanı {#hd-wallet}

Hiyerarşik belirleyici (HD) anahtar oluşturma ve transfer protokolünü kullanan bir [cüzdan](#wallet)dır.

[Github.com'da daha fazlasını okuyun](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD cüzdanı tohumu {#hd-wallet-seed}

Bir HD [cüzdanı](#wallet) için ana [özel anahtarı](#private-key) ve ana zincir kodunu oluşturmak için kullanılan değerdir. Cüzdan tohumu, insanların özel anahtarları kopyalamasını, yedeklemesini ve geri yüklemesini kolaylaştıran anımsatıcı kelimelerle temsil edilebilir.

### homestead {#homestead}

Ethereum'un Mart 2016'da 1.150.000 numaralı blokta başlatılan ikinci geliştirme aşamasıdır.

<Divider />

## I {#section-i}

### indeks {#index}

Depolama kaynağına giden verimli bir yol sağlayarak [blokzincir](#blockchain) genelinde bilgi sorgulamasını optimize etmeyi amaçlayan bir ağ yapısıdır.

### Değişimler Arası İstemci Adresi Protokolü (ICAP) {#icap}

Uluslararası Banka Hesap Numarası (IBAN) kodlamasıyla kısmen uyumlu olan ve Ethereum adresleri için çok yönlü, sağlama toplamlı ve birlikte çalışabilir bir kodlama sunan bir Ethereum adres kodlamasıdır. ICAP adresleri, yargı yetkisi altında olmayan para birimlerinde (örneğin, XBT, XRP, XCP) kullanıldığı gibi, "genişletilmiş Ethereum" anlamına gelen yeni bir IBAN sözde ülke kodu (XE) kullanır.

### Buz Devri {#ice-age}

Üstel bir [zorluk](#difficulty) artışı (diğer adıyla [bomba değeri](#difficulty-bomb)) getirme amaçlı Ethereum'un 200.000 numaralı bloktaki [sert çatallanması](#hard-fork) olup [hisse ispatına](#pos) geçişi desteklemiştir.

### tümleşik geliştirme ortamı (IDE) {#ide}

Genellikle bir kod düzenleyici, derleyici, çalışma zamanı ve hata ayıklayıcıyı bir araya getiren bir kullanıcı arayüzüdür.

<DocLink href="/developers/docs/ides/">
  Tümleşik Geliştirme Ortamları
</DocLink>

### değiştirilemez konuşlandırılmış kod problemi {#immutable-deployed-code-problem}

Bir [sözleşmenin](#smart-contract) (veya [kütüphanenin](#library)) kodu dağıtıldığında değiştirilemez hale gelir. Standart yazılım geliştirme uygulamaları, olası hataları düzeltmeye ve yeni özellikler eklemeye dayandığı için bu, akıllı sözleşme geliştirme için bir zorluk teşkil eder.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Akıllı Sözleşmeleri Dağıtma
</DocLink>

### iç işlem {#internal-transaction}

Bir [sözleşme hesabından](#contract-account) başka bir sözleşme hesabına veya [EOA](#eoa)'ya gönderilen [işlem](#transaction)dir (bkz. [mesaj](#message)).

<Divider />

### ihraç

Blok teklifini, tasdik ve ihbarı ödüllendirmek amacıyla yeni ether basımıdır.

## K {#section-k}

### anahtar türetme fonksiyonu (KDF) {#kdf}

"Parola genişletme algoritması" olarak da bilinir ve [anahtar deposu](#keystore-file) biçimleri tarafından parola şifrelemesine yönelik kaba kuvvet, sözlük ve gökkuşağı tablosu saldırılarına karşı, sürekli olarak parolayı karma yaparak koruma sağlamak için kullanılır.

<DocLink href="/developers/docs/smart-contracts/security/">
  Akıllı sözleşme güvenliği
</DocLink>

### anahtar deposu {#keyfile}

Her hesabın özel anahtar/adres çifti, bir Ethereum istemcisinde tek bir anahtar dosya olarak bulunur. Bunlar, yalnızca hesap oluşturma sırasında girilen parola ile şifresi çözülebilen, hesabın şifrelenmiş özel anahtarını içeren JSON metin dosyalarıdır.

### keccak-256 {#keccak-256}

Ethereum'da kullanılan kriptografik [karma](#hash) fonksiyonudur. Keccak-256, [SHA](#sha)-3 olarak standardize edilmiştir.

<Divider />

## L {#section-l}

### katman 2 {#layer-2}

Ethereum protokolünün üstündeki katman iyileştirmelerine odaklanan bir geliştirme alanıdır. Bu iyileştirmeler, [işlem](#transaction) hızları, daha ucuz [işlem ücretleri](#transaction-fee) ve işlem gizliliği ile ilgilidir.

<DocLink href="/layer-2/">
  Katman 2
</DocLink>

### LevelDB {#level-db}

Hafif, tek amaçlı bir [kütüphane](#library) olarak uygulanan ve birçok platforma bağlanan açık kaynaklı bir disk üzerindeki anahtar değer deposudur.

### kütüphane {#library}

Ödenecek fonksiyonları, geri dönüş fonksiyonu ve veri depolaması olmayan özel bir [sözleşme](#smart-contract) türüdür. Bu nedenle, ether alamaz, tutamaz veya veri depolayamaz. Bir kitaplık, diğer sözleşmelerin salt okunur hesaplama için çağrabileceği, önceden dağıtılmış kod görevi görür.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Akıllı Sözleşme Kütüphaneleri
</DocLink>

### hafif istemci {#light-client}

[Blokzincir](#blockchain)in yerel bir kopyasını saklamayan veya blokları ve [işlemleri](#transaction) doğrulamayan bir Ethereum istemcisidir. Bir [cüzdanın](#wallet) fonksiyonlarını sunar ve işlemler oluşturup yayımlayabilir.

<Divider />

### LMD_GHOST {#lmd-ghost}

Ethereum'un fikir birliği istemcileri tarafından zincirin başını belirlemek için kullanılan [çatallanma seçim algoritması](#fork-choice-algorithm)dır. LMD-GHOST, "Mesaja Dayalı En Son En Açgözlü En Ağır Gözlemlenen Alt Ağaç" ifadesinin kısaltmasıdır. Bu, zincirin başının, geçmişindeki en büyük [tasdik](#attestation) birikimine sahip olan blok olduğu anlamına gelir.

## M {#section-m}

### Ana Ağ {#mainnet}

"Ana ağ"ın kısaltmasıdır ve herkese açık ana Ethereum [blokzinciri](#blockchain)dir. Gerçek ETH, gerçek değer ve gerçek sonuçlar. [Katman 2](#layer-2) ölçeklendirme çözümlerini tartışırken katman 1 olarak da bilinir. (Ayrıca bkz. [test ağı](#testnet)).

<DocLink href="/developers/docs/networks/">
  Ethereum ağları
</DocLink>

### hafıza-zorlar {#memory-hard}

Sabit bellek işlevleri, kullanılabilir bellek miktarı biraz bile azaldığında, hızda veya fizibilitede ciddi bir düşüş yaşayan işlemlerdir. Bunun bir örneği, Ethereum madencilik algoritması olan [Ethash](#ethash)'tir.

### Merkle Patricia ağacı {#merkle-patricia-tree}

Ethereum'da anahtar değer çiftlerini verimli bir şekilde depolamak için kullanılan bir veri yapısıdır.

### mesaj {#message}

Hiçbir zaman serileştirilmeyen ve yalnızca [Ethereum Sanal Makinesi](#evm) içinde gönderilen [dahili işlem](#internal-transaction)dir.

### mesaj çağrısı {#message-call}

Bir [mesajı](#message) bir hesaptan diğerine geçirme eylemidir. Hedef hesap [Ethereum Sanal Makinesi](#evm) koduyla ilişkilendirilmişse, Sanal Makine o nesnenin durumuyla ve iletiye göre hareket edilerek başlatılır.

### Metropolis {#metropolis}

Ethereum'un Ekim 2017'de başlatılan üçüncü geliştirme aşamasıdır.

### madencilik {#mining}

Sonuç, öndeki ikili tabanda sıfırlardan isteğe bağlı sayıda içerene kadar [nonce](#nonce) artırımı yapılırken bir blok başlığını defalarca karma sürecidir. Bu, yeni [blokların](#block) iş ispatı [blokzincirine](#blockchain) eklendiği süreçtir. Ethereum, [hisse ispatına](#pos) geçirilmeden önce işte bu şekilde güvence altına alınmıştır.

### madenci {#miner}

Tekrarlanan geçiş karma işlemiyle yeni bloklar için geçerli [iş ispatı](#pow) bulan bir ağ [düğümü](#node)dür (bkz. [Ethash](#ethash)). Madenciler artık Ethereum'un bir parçası değildir; Ethereum [hisse ispatına](#pos) geçtikten sonra onların yerini doğrulayıcılar almıştır.

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Madencilik
</DocLink>

### mint {#mint}

Jeton basmak, yeni jetonlar yaratma ve bu jetonları kullanılabilmeleri için dolaşıma sokma sürecidir. Merkezi otoritenin katılımı olmadan yeni bir jeton oluşturmak için kullanılan merkeziyetsiz bir mekanizmadır.

<Divider />

## N {#section-n}

### ağ {#network}

Ethereum ağına atıfla, işlemleri ve blokları her Ethereum düğümüne (ağ katılımcısı) yayan eşler arası bir ağdır.

<DocLink href="/developers/docs/networks/">
  Ağlar
</DocLink>

### ağ karma hızı {#network-hashrate}

Tüm madencilik ağı tarafından üretilen toplam [karma hızı](#hashrate)dır. Ethereum [hisse ispatına](#pos) geçirildikten sonra Ethereum üzerinde madencilik sonlandırılmıştır.

### değiştirilemez token (NFT) {#nft}

"Tapu" olarak da bilinen ve ERC-721 teklifi tarafından getirilmiş bir jeton standardıdır. NFT'ler izlenebilir ve takas edilebilir, ancak her bir jeton benzersiz ve farklıdır; ETH ve [ERC-20 jetonları](#token-standard) gibi birbiri ile değiştirilebilir değildir. NFT'ler, dijital veya fiziksel varlıklara sahip olmayı temsil edebilir.

<DocLink href="/nft/">
  Değiştirilemez Token'lar (NFT'ler)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Değiştirilemez Token Standardı
</DocLink>

### düğüm {#node}

Ağa katılan bir yazılım istemcisidir.

<DocLink href="/developers/docs/nodes-and-clients/">
  Düğümler ve İstemciler
</DocLink>

### nonce {#nonce}

Kriptografide sadece bir kez kullanılabilen bir değerdir. Bir hesap nonce'u, tekrar saldırılarından korunmak için kullanılan ve her hesapta bulunan işlem sayacıdır.

<Divider />

## O {#section-o}

### ommer (amca) bloğu {#ommer}

Bir iş ispatı [madencisi](#miner) geçerli bir [blok](#block) bulduğu zaman başka bir madenci, blokzincirin ucuna ilk olarak eklenmiş rakip bir blok yayımlamış olabilir. Bu geçerli ancak eski blok, daha yeni bloklar tarafından _ommer'ler_ olarak dahil edilebilir ve kısmi blok ödülü alabilir. "Ommer" terimi, bir ebeveyn bloğunun kardeşi için tercih edilen cinsiyetsiz bir terimdir ancak buna bazen "amca" da denir. Bu, bir [iş ispatı](#pow) ağıyken Ethereum ile ilgiliydi ancak ommer'ler, her bir yuvada tam olarak bir adet blok önerici seçildiğinden [hisse ispatı](#pos) Ethereum'un bir özelliği değildir.

### i̇yimser toplama {#optimistic-rollup}

[Ana ağ](#mainnet) (katman 1) tarafından sağlanan güvenliği kullanırken daha yüksek [katman 2](#layer-2) işlem verimi sunmak için [sahtecilik kanıtlarını](#fraud-proof) kullanan bir işlemler [toplaması](#rollups)dır. Benzer bir katman 2 çözümü olan [Plazma](#plasma)'dan farklı olarak, İyimser toplamalar daha karmaşık işlem türlerini, yani [Ethereum Sanal Makinesi](#evm)'nde mümkün olan her şeyi işleyebilir. Bir işleme sahtecilik kanıtı yoluyla itiraz edilebileceği için [Sıfır-bilgi toplamalarına](#zk-rollups) kıyasla gecikme sorunları olması muhtemeldir.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  İyimser Toplamalar
</DocLink>

### Kâhin {#oracle}

Kâhin, [blokzincir](#blockchain) ile gerçek dünya arasında bir köprüdür. Bilgi sorgusu yapılabilen ve [akıllı sözleşmelerde](#smart-contract) kullanılabilen zincir üstündeki [API'ler](#api) gibi davranırlar.

<DocLink href="/developers/docs/oracles/">
  Kâhinler
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Ethereum istemci yazılımının en öne çıkan birlikte çalışabilir uygulamalarından biridir.

### eş {#peer}

[Blokzincir](#blockchain)in aynı kopyalarına sahip, Ethereum istemci yazılımı çalıştıran bağlı bilgisayarlardır.

### eşler arası ağ {#peer-to-peer-network}

Merkezi, sunucu tabanlı hizmetlere ihtiyaç duymadan işlevleri toplu olarak gerçekleştirebilen bir bilgisayar ağıdır ([eşler](#peer)).

### Plazma {#plasma}

[İyimser toplamalar](#optimistic-rollups) gibi [sahtecilik kanıtlarını](#fraud-proof) kullanan zincir dışında bir ölçeklendirme çözümüdür. Plazma, temel jeton transferleri ve takasları gibi basit işlemlerle sınırlıdır.

<DocLink href="/developers/docs/scaling/plasma">
  Plazma
</DocLink>

### özel anahtar (gizli anahtar) {#private-key}

Ethereum kullanıcılarının dijital bir imza üreterek bir hesabın veya sözleşmelerin sahibi olduklarını kanıtlamasına olanak tanıyan gizli bir numaradır (bkz. [açık anahtar](#public-key), [adres](#address), [ECDSA](#ecdsa)).

### özel zincir {#private-chain}

Tamamen özel bir blokzincir, herkesin kullanımına açık olan değil, izinli erişime sahip olandır.

### hisse ispatı (PoS) {#pos}

Bir kripto para blokzinciri protokolünün dağıtılmış [mutabakata](#consensus) ulaşmayı amaçladığı bir yöntemdir. PoS, işlemlerin doğrulanmasına katılabilmek için kullanıcılardan belirli bir miktarda kripto paraya (ağdaki "hisseleri") sahip olduklarını kanıtlamalarını ister.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Hisse ispatı
</DocLink>

### iş ispatı (PoW) {#pow}

Bulmak için büyük miktarda hesaplama gereken bir veridir (ispat).

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  İş İspatı
</DocLink>

### açık anahtar {#public-key}

[Özel anahtardan](#private-key) tek yönlü bir işlev aracılığıyla türetilen, herkese açık olarak paylaşılabilen ve ilgili özel anahtarla yapılan dijital imzayı doğrulamak için herkes tarafından kullanılabilen bir sayıdır.

<Divider />

## R {#section-r}

### makbuz {#receipt}

Belirli bir [işlemin](#transaction) sonucunu temsil etmek için bir Ethereum istemcisi tarafından döndürülen, işlemin bir [karmasını](#hash), [blok](#block) numarasını, kullanılan [gaz](#gas) miktarını ve bir [akıllı sözleşmenin](#smart-contract) dağıtılması durumunda da sözleşmenin [adres](#address)ini içeren verilerdir.

### yeniden giriş saldırısı {#re-entrancy-attack}

Bir saldırgan sözleşmenin, yürütüm sırasında kurbanın sözleşmesini yinelemeli olarak yeniden çağırmasını sağlayacak şekilde bir kurban sözleşmesi fonksiyonu içeren bir saldırıdır. Örneğin bu, mağdur sözleşmenin bakiyeleri güncelleyen veya para çekme miktarlarını sayan kısımlarını atlayarak fonların çalınmasıyla sonuçlanabilir.

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Yeniden giriş
</DocLink>

### ödül {#reward}

Ağ tarafından [iş ispatı](#pow) çözümünü bulan [madenciye](#miner) ödül olarak verilen, her yeni bloğa eklenen bir miktar ether'i ifade eder.

### Tekrarlamalı Uzunluk Öneki (RLP) {#rlp}

Ethereum geliştiricileri tarafından rastgele karmaşıklık ve uzunluktaki nesneleri (veri yapılarını) kodlamak ve seri hâle getirmek için tasarlanmış bir kodlama standardıdır.

### toplamalar {#rollups}

Birden çok işlemi gruplandıran ve bunları tek bir işlemde [Ethereum ana zincirine](#mainnet) gönderen bir tür [katman 2](#layer-2) ölçeklendirme çözümüdür. Bu, [gaz](#gas) maliyetlerinde azalmaya ve [işlem](#transaction) çıktısında artışa olanak tanır. Bu ölçeklenebilirlik kazanımlarını sunmak için farklı güvenlik yöntemleri kullanan İyimser toplamalar ve Sıfır-bilgi toplamaları mevcuttur.

<DocLink href="/developers/docs/scaling/#rollups">
  Toplamalar
</DocLink>

<Divider />

### RPC {#rpc}

**Uzak prosedür çağrısı (RPC)**, bir programın ağdaki başka bir bilgisayarda bulunan bir programdan ağ ayrıntılarını anlamak zorunda kalmadan hizmet istemek için kullandığı bir protokoldür.

## S {#section-s}

### Güvenli Hash Algoritması (SHA) {#sha}

Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) tarafından yayınlanan bir kriptografik karma fonksiyonları ailesidir.

### Serenity {#serenity}

Daha önce "Ethereum 2.0" veya "Eth2" olarak bilinen bir dizi ölçeklendirme ve sürdürülebilirlik yükseltmesini başlatan Ethereum geliştirme aşamasıdır.

<DocLink href="/roadmap/">
  Ethereum yükseltmeleri
</DocLink>

### serileştirme {#serialization}

Bir veri yapısını baytlar dizisine dönüştürme işlemidir.

### parça / parça zinciri {#shard}

Parça zincirleri, toplam blok zincirin doğrulayıcıların alt kümelerinin sorumlu tutulabilecekleri ayrık bölümleridir. Ethereum için daha yüksek işlem verimi sunar ve [iyimser toplamalar](#optimistic-rollups) ile [ZK-toplamaları](#zk-rollups) gibi [katman 2](#layer-2) çözümleri için veri kullanılabilirliğini iyileştirir.

<DocLink href="/roadmap/danksharding">
  Danksharding
</DocLink>

### yan zincir {#sidechain}

Farklı, genellikle daha hızlı [mutabakat kurallarına](#consensus-rules) sahip ayrı bir zincir kullanan bir ölçeklendirme çözümüdür. Bu yan zincirleri [Ana Ağ](#mainnet)'a bağlamak için bir köprü gereklidir. [Toplamalar](#rollups) da yan zincirleri kullanır ancak bunun yerine [Ana Ağ](#mainnet) ile işbirliği içinde çalışırlar.

<DocLink href="/developers/docs/scaling/sidechains/">
  Yan zincirler
</DocLink>

### imzalama {#signing}

Bir işlemin belirli bir özel anahtarın sahibi tarafından onaylandığını kriptografik olarak göstermeyi ifade eder.

### tekil {#singleton}

Yalnızca tek bir örneğinin mevcut olabileceği bir nesneyi tanımlayan bir bilgisayar programlama terimidir.

### kesici {#slasher}

Kesici, iptal edilebilir saldırıları arayan tasdikleri tarayan bir varlıktır. Kesikler ağa yayımlanır ve sonraki blok önereni kanıtı bloğa ekler. Sonrasında blok öneren, kötü niyetli doğrulayıcıyı kestiği için ödül alır.

### yuva {#slot}

[Hisse ispatı](#pos) sisteminde bir [doğrulayıcı](#validator) tarafından yeni blokların önerilebileceği zaman periyodudur (12 saniye). Bir yuva boş olabilir. 32 yuva bir [dönem](#epoch) oluşturur.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

### akıllı sözleşme {#smart-contract}

Ethereum bilgi işlem altyapısında çalışan bir programdır.

<DocLink href="/developers/docs/smart-contracts/">
  Akıllı Sözleşmelere Giriş
</DocLink>

### SNARK {#snark}

"Öz ve etkileşimli olmayan bilgi argümanı"nın kısaltması olan SNARK, bir tür [sıfır bilgili ispat](#zk-proof)tır.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamalar
</DocLink>

### yumuşak çatallanma {#soft-fork}

[Blokzincirde](#blockchain) [mutabakat kuralları](#consensus-rules) değiştiğinde gerçekleşen bir ayrışmadır. [Sert çatallanmanın](#hard-fork) aksine yumuşak çatallanma geriye dönük olarak uyumludur; yükseltilmiş düğümler yeni mutabakat kurallarına uyduğu sürece yükseltilmemiş düğümler tarafından oluşturulan blokları doğrulayabilir.

### Solidity {#solidity}

JavaScript, C++ veya Java'ya benzer söz dizimine sahip prosedürel (zorunlu) bir programlama dilidir. Ethereum [akıllı sözleşmeleri](#smart-contract) için en popüler ve en sık kullanılan dildir. Dr. Gavin Wood tarafından yaratılmıştır.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity sıralı derleyicisi {#solidity-inline-assembly}

Bir [Solidity](#solidity) programındaki [Ethereum Sanal Makinesi](#evm) derleme dilidir. Solidity'nin sıralı derleyici desteği, belirli işlemleri yazmayı kolaylaştırır.

### Sahte Ejderha {#spurious-dragon}

Daha fazla hizmet reddi saldırı vektörünü ve net durumu ele almak için 2.675.000 numaralı blokta meydana gelen bir Ethereum blok zinciri [sert çatallanma](#hard-fork)sıdır (bkz. [Mandalina Düdüğü](#tangerine-whistle)). Ayrıca, bir tekrar saldırı koruma mekanizmasıdır (bkz. [nonce](#nonce)).

### sabit para {#stablecoin}

Değeri, başka bir varlığın değerine sabitlenmiş bir [ERC-20 jetonu](#token-standard)dur. Dolar gibi bir resmi para birimi, altın gibi değerli metaller ve Bitcoin gibi diğer kripto paralar tarafından desteklenen sabit paralar mevcuttur.

<DocLink href="/eth/#tokens">
  ETH, Ethereum'daki tek kripto değildir
</DocLink>

### staking {#staking}

Doğrulayıcı olmak ve [ağı](#network) güvence altına almak için bir miktar [ether](#ether) (payınız) yatırmayı ifade eder. Doğrulayıcı, [işlemleri](#transaction) kontrol eder ve bir [hisse ispatı](#pos) mutabakat modeli altında [bloklar](#block) önerir. Hisseleme, ağın çıkarları doğrultusunda hareket etmeniz için size ekonomik bir teşvik sağlar. [Doğrulayıcı](#validator) görevlerinizi yerine getirdiğiniz için ödüller alır, yerine getirmezseniz değişen miktarlarda ETH kaybedersiniz.

<DocLink href="/staking/">
  ETH'nizi hisseleyin ve Ethereum doğrulayıcısı olun
</DocLink>

### paydaşlık havuzu {#staking-pool}

Bir doğrulayıcı anahtar setini etkinleştirmek için gereken 32 ETH'ye ulaşmak amacıyla kullanılan tek bir Ethereum paydaşından daha fazlasına ait birleşik ETH'dir. Bir düğüm operatörü mutabakatta yer almak için bu anahtarları kullanır ve [blok ödülleri](#block-reward) katkı veren paydaşlar arasında bölüştürülür. Havuzları hisseleme veya hisseleme dağıtma, Ethereum protokolüne özgü olmasa da çözümlerin çoğu topluluk tarafından geliştirilmiştir.

<DocLink href="/staking/pools/">
  Havuzlanmış hisseleme
</DocLink>

### STARK {#stark}

"Scalable transparent argument of knowledge" (Ölçeklenebilir şeffaf bilgi argümanı) ifadesinin kısaltması olan STARK, bir tür [sıfır bilgili ispattır](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamalar
</DocLink>

### durum {#state}

Normalde belirli bir bloktaki duruma atıfta bulunan, blok zincirde belirli bir zaman noktasındaki tüm bakiyelerin ve verilerin anlık görüntüsüdür.

### özel kanallar {#state-channels}

Katılımcılar arasında özgürce ve ucuza işlem yapabilecekleri bir kanal kurulan bir [katman 2](#layer-2) çözümüdür. [Ana ağ](#mainnet)'a yalnızca kanalı kurmak ve kanalı kapatmak için bir [işlem](#transaction) gönderilir. Bu, işlem veriminin çok yüksek olmasına olanak tanısa da, katılımcı sayısının önceden bilinmesine ve fonların kilitlenmesine dayalıdır.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Özel kanallar
</DocLink>

### nitelikli çoğunluk {#supermajority}

Nitelikli çoğunluk, Ethereum'u güvence altına alan hisselenmiş toplam ether'in 2/3'ünü (66%) aşan miktarları ifade eden terimdir. İşaret Zincirinde blokların [sonlandırılması](#finality) için nitelikli çoğunluk oyu gereklidir.

### senkronize etme {#syncing}

Bir blokzincirin en son sürümünün tamamını bir düğüme indirme işlemidir.

### senkronizasyon kurulu {#sync-committee}

Senkronizasyon kurulu, yaklaşık olarak ortalama her 27 saatte bir yenilenen rastgele seçilmiş bir [doğrulayıcılar](#validator) grubudur. Amaçları, imzalarını geçerli blok başlıklarına eklemektir. Senkronizasyon kurulları, [hafif istemcilerin](#light-client) tüm doğrulayıcı setine erişmek zorunda kalmadan blokzincirin başını takip etmesine olanak tanır.

### szabo {#szabo}

[Ether](#ether)'in bir değeri. 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Mandalina Düdüğü {#tangerine-whistle}

Belirli G/Ç yoğun işlemler için [gaz](#gas) hesaplamasını değiştirmek ve düşük gaz maliyetinden yararlanan hizmet dışı bir saldırı olan birikmiş durumu bir reddetme durumundan temizlemek için 2.463.000 numaralı blokta meydana gelen bir Ethereum blok zinciri [sert çatallanması](#hard-fork)dır.

### terminal toplam zorluk (TTD) {#terminal-total-difficulty}

Toplam zorluk, blok zincirde belirli bir noktaya kadar olan tüm bloklar için Ethash madencilik zorluğunun toplamıdır. Terminal toplam zorluk, yürütüm istemcilerinin madenciliklerini kapatmaları ve dedikodu işlevlerini bloke etmeleri için tetikleyici olarak kullanılan toplam zorluk için belirli bir değerdir, böylece ağın hisse ispatına geçiş yapabilmesi sağlanmıştır.

### test ağı {#testnet}

Ana Ethereum ağının davranışını simüle etmek için kullanılan bir ağdır (bkz. [Ana ağ](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Test ağları
</DocLink>

### jeton {#token}

Ethereum blokzincirindeki akıllı sözleşmelerde tanımlanan, alım satıma açık bir sanal maldır.

### jeton standardı {#token-standard}

ERC-20 teklifiyle birlikte kullanıma sunulan bu standart, değiştirilebilir jetonlar için standartlaştırılmış bir [akıllı sözleşme](#smart-contract) yapısı sağlar. [NFT'lerin](#nft) aksine, aynı sözleşmeye ait jetonlar izlenebilir, alınıp satılabilir ve değiştirilebilir.

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  ERC-20 Token Standardı
</DocLink>

### işlem {#transaction}

Belirli bir [adresi](#address) hedefleyen, bir başlangıç [hesabı](#account) tarafından imzalanan Ethereum Blokzincirine girilmiş verilerdir. İşlem, söz konusu işlemin [gaz limiti](#gas-limit) gibi meta verileri içerir.

<DocLink href="/developers/docs/transactions/">
  İşlemler
</DocLink>

### işlem ücreti {#transaction-fee}

Ethereum ağını her kullandığınızda ödemeniz gereken bir ücrettir. Örneklerinin arasında [cüzdanınızdan](#wallet) fon gönderimi ya da jeton takası veya koleksiyon parçası satın alımı gibi [merkeziyetsiz uygulama](#dapp) etkileşimleri yer alır. Bunu bir hizmet bedeli gibi düşünebilirsiniz. Bu ücret, ağın ne kadar meşgul olduğuna bağlı olarak değişir. Bunun nedeni, işleminizi gerçekleştirmekten sorumlu kişiler olan [doğrulayıcıların](#validator) muhtemelen daha yüksek ücretli işlemlere öncelik vermesidir: Bu nedenle tıkanıklık, fiyatı yukarı çeker.

Teknik düzeyde işlem ücretiniz, işleminizin ne kadar [gaz](#gas) gerektirdiğiyle ilgilidir.

İşlem ücretlerinin düşürülmesi şu sıralar yoğun ilgi gören bir konudur. Bkz. [Katman 2](#layer-2).

### güven gerektirmezlik {#trustlessness}

Bir ağın, ilgili tarafların herhangi birinin üçüncü bir tarafa güvenmesine gerek kalmadan işlemlere aracılık etme yeteneğidir.

### Turing tamamlığı {#turing-complete}

İsmini İngiliz matematikçi ve bilgisayar bilimcisi Alan Turing'den alan ve bir veri işleme kuralları sisteminin (bir bilgisayarın komut seti, programlama dili veya hücresel otomasyon gibi), herhangi bir Turing makinesini simüle etmek için kullanılabilmesi durumunda "Turing tamamlığı" veya "hesaplama açısından evrensel" olduğunu ifade eden bir kavramdır.

<Divider />

## V {#section-v}

### doğrulayıcı {#validator}

Verileri depolamaktan, işlemleri işlemekten ve blokzincire yeni bloklar eklemekten sorumlu [hisse ispatı](#pos) sisteminde bulunan bir [düğüm](#node)dür. Doğrulayıcı yazılımı etkinleştirmek için 32 ETH'yi [hisseleyebilmeniz](#staking) gerekir.

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Hisse ispatı
</DocLink>
<DocLink href="/staking/">
  Ethereum'da hisseleme
</DocLink>

### doğrulayıcı yaşam döngüsü {#validator-lifecycle}

Bir doğrulayıcının var olabileceği durumlar sekansıdır. Şunları içerir:

- yatırılmış: Doğrulayıcı tarafından [mevduat sözleşmesine](#deposit-contract) en az 32 ETH yatırılmıştır
- beklemede: Doğrulayıcı, halihazırda var olan doğrulayıcılar tarafından ağa oylanması için aktivasyon kuyruğunda beklemektedir
- aktif: Bloklar tasdik ve önerilme aşamasındadır
- kesiliyor: Doğrulayıcı kötü niyetle davranmıştır ve kesilmektedir
- ayrılıyor: Doğrulayıcı ya kendi isteğiyle ya da çıkarıldığı için ağdan ayrılıyor olarak işaretlenmiştir.

### doğruluk kanıtı {#validity-proof}

Belirli [katman 2](#layer-2) çözümleri için hızı artırmak üzere işlemlerin gruplar halinde [toplandığı](/#rollups) ve tek bir işlemde Ethereum'a gönderildiği bir güvenlik modelidir. İşlem hesaplaması, zincir dışında yapılır ve daha sonra doğruluk kanıtı ile ana zincire sağlanır. Bu yöntem, güvenliği korurken mümkün olan işlem miktarını artırır. Bazı [toplamalar](#rollups), [sahtecilik kanıtlarını](#fraud-proof) kullanır.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamalar
</DocLink>

### validium {#validium}

İşlem hacmini iyileştirmek için [doğruluk kanıtlarını](#validity-proof) kullanan zincir dışında bir çözümdür. [Sıfır-bilgi toplamalarının](#zk-rollup) aksine, validium verileri katman 1 [Ana Ağı](#mainnet)'nda depolanmaz.

<DocLink href="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Python benzeri söz dizimine sahip üst düzey bir programlama dilidir. Saf işlevsel dile yakın bir dil oluşturma amacı taşır. Vitalik Buterin tarafından yaratılmıştır.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### cüzdan {#wallet}

[Özel anahtarları](#private-key) tutan yazılımdır. Ethereum [hesaplarına](#account) erişmek, kontrol etmek ve [akıllı sözleşmelerle](#smart-contract) etkileşim kurmak için kullanılır. Anahtarların bir cüzdanda saklanması gerekmez ve geliştirilmiş güvenlik için çevrimdışı depolamadan (yani bir hafıza kartı veya kağıttan) alınabilir. İsmine rağmen, cüzdanlar asla gerçek para veya jeton depolamaz.

<DocLink href="/wallets/">
  Ethereum Cüzdanları
</DocLink>

### Web3 {#web3}

Web'in üçüncü versiyonudur. İlk olarak Dr. Gavin Wood tarafından önerilen Web3, merkezi olarak sahip olunan ve yönetilen uygulamalardan merkeziyetsiz protokoller (bkz. [dapp](#dapp)) üzerine inşa edilmiş uygulamalara kadar çeşitli web uygulamaları için yeni bir odak ve vizyonu temsil eder.

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 ve Web3
</DocLink>

### wei {#wei}

[Ether](#ether)'in en küçük değeridir. 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### sıfır adres {#zero-address}

Tamamen sıfırlardan oluşan, sahipli dolaşımdan jeton çıkarmak amacıyla sıklıkla kullanılan bir Ethereum adresidir. Ayrım, bir akıllı sözleşmenin endeksinden yakım() yöntemiyle resmi olarak çıkarılan jetonlar ile bu adrese gönderilen jetonlar arasında çizilir.

### sıfır bilgili ispat {#zk-proof}

Sıfır bilgili ispat, bir kişinin herhangi bir ek bilgi aktarmadan bir ifadenin doğru olduğunu kanıtlamasına izin veren kriptografik bir yöntemdir.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamalar
</DocLink>

### sıfır bilgili toplama {#zk-rollup}

[Ana ağ](#mainnet) tarafından sağlanan güvenliği kullanırken artan [katman 2](#layer-2) işlem verimi sunmak için [doğruluk kanıtlarını](#validity-proof) kullanan işlemlerin [toplanması](#rollups)dır (katman 1). [İyimser toplamalar](#optimistic-rollups) gibi karmaşık işlem türlerini işleyemeseler de, işlemler gönderildiklerinde kanıtlanabilir şekilde geçerli olduklarından gecikme sorunları yaşamazlar.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Sıfır-Bilgi Toplamaları
</DocLink>

<Divider />

## Kaynaklar {#sources}

_CC-BY-SA kapsamında kısmen [Andreas M. Antonopoulos ve Gavin Wood](https://ethereumbook.info)'un [Ethereum'da Uzmanlaşma](https://github.com/ethereumbook/ethereumbook) eserinden alınmıştır_

<Divider />

## Bu sayfaya katkıda bulunun {#contribute-to-this-page}

Gözden kaçırdığımız bir şey mi oldu? Yanlış bir şey mi var? GitHub'daki bu sözlüğe katkıda bulunarak gelişmemize yardımcı olun!

[Nasıl katkıda bulunacağınız hakkında daha fazla bilgi edinin](/contributing/adding-glossary-terms)
