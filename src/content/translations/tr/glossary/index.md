---
title: Ethereum Sözlüğü
description: Ethereum ile ilgili teknik ve teknik olmayan, tamamlanmamış bir sözlük
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

<DocLink to="/developers/docs/accounts">
  Ethereum Hesapları
</DocLink>

### adres {#address}

En genel olarak bu, blok zincirinde [işlemleri](#transaction) alabilen (varış adresi) veya gönderebilen (kaynak adresi) bir [EOA](#eoa)'yı veya [sözleşmeyi](#contract-accouint) temsil eder. Daha spesifik olarak, bir [ECDSA](#ecdsa) [açık anahtarının](#public-key) [Keccak hash değerinin](#keccak-256) en sağdaki 160 bitidir.

### uygulama ikili arayüzü (ABI) {#abi}

Ethereum ekosisteminde [sözleşmeler](#contract-account) ile etkileşim kurmanın standart yolu, hem blok zincirinin dışından hem de sözleşmeden sözleşmeye etkileşimler içindir.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### uygulama programlama arayüzü {#api}

Bir Uygulama Programlama Arayüzü (API), bir yazılım parçasının nasıl kullanılacağına ilişkin bir dizi tanımdır. Bir API, bir uygulama ile bir web sunucusu arasında yer alır ve bunlar arasında veri aktarımını kolaylaştırır.

### ASIC {#asic}

Uygulamaya Özel Entegre Devre. Bu genellikle kripto para madenciliği için özel olarak oluşturulmuş entegre bir devre anlamına gelir.

### öne sürmek {#assert}

[Solidity](#solidity)'de, `assert(false)`, kalan tüm [gazı](#gas) kullanan geçersiz bir işlem kodu olan `0xfe`'e derler ve tüm değişiklikleri geri alır. Bir `assert()` ifadesi başarısız olduğunda, çok yanlış ve beklenmedik bir şey olduğunda, kodunuzu düzeltmeniz gerekecek. Asla ve asla olmaması gereken koşullardan kaçınmak için `assert()` kullanmalısınız.

<DocLink to="/developers/docs/smart-contracts/security/">
  Akıllı sözleşme güvenliği
</DocLink>

### tasdikleme {#attestation}

Bir [İşaret Zinciri](#beacon-chain) veya [parça](#shard) [blok](#block) için doğrulayıcı oy. Doğrulayıcılar, blok tarafından önerilen durumla aynı fikirde olduklarını belirterek blokları onaylamalıdır.

<Divider />

## B {#section-b}

### Taban Ücret {#base-fee}

Her [blok](#block), "taban ücret" olarak bilinen bir rezerv fiyatına sahiptir. Bir kullanıcının sonraki bloğa bir işlemi dahil etmesi için ödemesi gereken minimum [gaz](#gas) ücretidir.

<DocLink to="/developers/docs/gas/">
  Gaz ve ücretler
</DocLink>

### İşaret Zinciri {#beacon-chain}

Tüm Ethereum ağının koordinatörü olacak yeni bir konsensus katmanı sunan bir ağ yükseltmesi. Ethereum'a [hisse kanıtı](#pos) ve [doğrulayıcılar](#validator) sunar. Sonunda [Ana Ağ](#mainnet) ile birleştirilecektir.

<DocLink to="/upgrades/beacon-chain/">
  İşaret Zinciri
</DocLink>

### düşük son haneli (big-endian) {#big-endian}

En önemli basamağın, bellekte ilk olduğu konumsal sayı gösterimi. En az anlamlı basamağın ilk olduğu küçük endian'ın tersi.

### blok {#block}

Oluşturulan [işlemler](#transaction) hakkında gerekli bilgiler (bir blok başlığı) ve [ommerler](#ommer) olarak bilinen bir dizi başka blok başlığı. Bloklar, Ethereum ağına [madenciler](#miner) tarafından eklenir.

<DocLink to="/developers/docs/blocks/">
  Bloklar
</DocLink>

### blok arayıcısı {#block-explorer}

Kullanıcının bir blok zincirinden ve blok zinciri hakkında bilgi aramasına olanak sağlayan bir arayüz. Bu, bireysel işlemlerin, belirli adreslerle ilişkili etkinliklerin ve ağ hakkındaki bilgilerin alınmasını içerir.

### blok başlığı {#block-header}

Bir bloktaki içeriğine ve oluşturulduğu koşullara özgü veriler. Önceki bloğun başlığının karmasını, bloğun çıkarıldığı yazılımın sürümünü, zaman damgasını ve bloğun içeriğinin merkle kök karmasını içerir.

### blok yayılımı {#block-propagation}

Onaylanmış bir bloğu ağdaki tüm diğer düğümlere iletme süreci.

### blok ödülü {#block-reward}

Yeni bir geçerli bloğun üreticisine verilen ether miktarı.

### blok süresi {#block-time}

Blok zincirine eklenen bloklar arasındaki ortalama zaman aralığı.

### blok doğrulama {#block-validation}

Tüm blok zincirinde saklanan geçmiş ile bloğun kriptografik imzasının tutarlılığının kontrol edilmesi.

### blokzincir {#blockchain}

Ethereum'da, [iş kanıtı](#pow) sistemi tarafından doğrulanan bir dizi [blok](#block), her biri bir önceki [genesis blok](#genesis-block) una giden yol. Blok boyutu sınırı yoktur; bunun yerine değişen [gaz sınırı](#gas-limit) nı kullanır.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Blok zinciri nedir?
</DocLink>

### bootnode {#bootnode}

Bir düğüm çalıştırılırken keşif sürecini başlatmak için kullanılabilecek düğümler. Bu düğümlerin uç noktaları, Ethereum kaynak koduna kaydedilir.

### bitkod {#bytecode}

Bir yazılım yorumlayıcısı veya bir sanal makine tarafından verimli bir şekilde yürütülmesi için tasarlanmış soyut bir talimat seti. İnsan tarafından okunabilen kaynak kodun aksine, bayt kodu sayısal biçimde ifade edilir.

### Bizans çatalı {#byzantium-fork}

[Metropolis](#metropolis) geliştirme aşaması için iki [sert çatalın](#hard-fork) ilki. EIP-649 Metropolis [Zorluk Bombası](#difficulty-bomb) Gecikmesi ve Blok Ödül Azaltma içeriyordu, burada [Buz Devri](#ice-age) 1 yıl ertelendi ve blok ödülü 5'ten 3 ethere düşürüldü.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG, [LMD-GHOST](#lmd-ghost) çatal seçim algoritması ile birlikte kullanılan, [konsensüs istemcileri](#consensus-client) Beacon Chain'in başında anlaşmaya varmaları için için bir hisse kanıtı protokolüdür.

### kontrol noktası {#checkpoint}

[İşaret Zinciri](#beacon-chain), yuva (12 saniye) ve dönem (32 yuva) olarak ayrılmış bir tempoya sahiptir. Her dönemdeki ilk yuva bir kontrol noktasıdır. Doğrulayıcıların [süper çoğunluğu](#supermajority), iki kontrol noktası arasındaki bağlantıyı tasdik ettiğinde, bu kontrol noktaları [doğrulanabilir](#justification) ve ardından başka bir kontrol noktası da bunlardan sonra doğrulanırsa [kesinleştirilebilirler](#finality).

### derleme {#compiling}

Yüksek seviyeli bir programlama dilinde yazılmış kodu (ör., [Solidity](#solidity)) daha düşük seviyeli bir dile dönüştürme (ör., EVM [bayt kodu](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Akıllı Sözleşmeleri Derleme
</DocLink>

### komite {#committee}

[İşaret Zinciri](#beacon-chain) tarafından rastgele işaret ve parça bloklarına atanan en az 128 [doğrulayıcı](#validator) grubu.

### hesaplamalı fizibilite {#computational-infeasibility}

Bir süreç, onu gerçekleştirmeye ilgi duyabilecek herhangi biri için uygulanamayacak kadar uzun bir zaman (örneğin milyarlarca yıl) alacaksa, hesaplama açısından olanaksızdır.

### konsensus {#consensus}

Çok sayıda düğüm (genellikle ağdaki çoğu düğüm) yerel olarak doğrulanmış en iyi blok zincirlerinde aynı bloklara sahip olduğunda. [Konsensus kuralları](#consensus-rules) ile karıştırılmamalıdır.

### konsensus istemcisi {#consensus-client}

Konsensus istemcileri (Prysm, Teku, Nimbus, Lighthouse, Lodestar gibi) Ethereum'un [hisse ispatı](#pos) konsensus algoritmasını çalıştırarak ağın İşaret Zincirinin başı hakkında anlaşmaya varmasını sağlar. Konsensus istemcileri, işlemlerin doğrulanmasına/yayınlanmasına veya durum geçişlerinin yürütülmesine katılmazlar. Bu, [yürütüm istemcileri](#execution-client) tarafından yapılır.

### konsensus katmanı {#consensus-layer}

Ethereum'un konsensus katmanı, [konsensus istemcileri ağıdır](#consensus-client).

### konsensus kuralları {#consensus-rules}

Diğer düğümlerle konsensus sağlamak için tam düğümlerin izlediği blok doğrulama kuralları. [konsensus](#consensus) ile karıştırılmamalıdır.

### Konstantinopolis çatalı {#constantinople-fork}

[Metropolis](#metropolis) etabının ikinci kısmı, başlangıçta 2018 ortası için planlanmıştı. Diğer değişikliklerin yanı sıra hibrid bir [iş kanıtı](#pow)/[hisse kanıtı](#pos) konsensus algoritmasına geçişi içermesi bekleniyor.

### kontrat hesabı {#contract-account}

Başka bir [hesaptan](#account) ([EOA](#eoa) veya [sözleşme](#contract-account)) bir [işlem](#transaction) aldığında yürütülen kodu içeren bir hesap.

### kontrat oluşturma işlemi {#contract-creation-transaction}

Alıcı olarak [sıfır adres](#zero-address) olan ve bir [sözleşme](#contract-account) kaydetmek ve bunu Ethereum blok zincirine kaydetmek için kullanılan özel bir [işlem](#transaction).

### çapraz bağlantı {#crosslink}

Bir çapraz bağlantı, parçanın durumunun bir özetini sağlar. [Parçacık](#shard) zincirleri, parçalı [pay kanıtlama sisteminde](#proof-of-stake) [İşaret Zinciri](#beacon-chain) aracılığıyla birbirleriyle bu şekilde iletişim kurar.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

<Divider />

### kriptoekonomi {#cryptoeconomics}

Kripto para birimlerinin ekonomisi.

## D {#section-d}

### Đ {#D-with-stroke}

Đ (d darbeli), Eski İngilizce, Orta İngilizce, İzlandaca ve Faroece'de büyük harf “Eth” için kullanılır. Đ'nin İskandinav harfi "eth" olduğu ĐEV veya Đapp (merkeziyetsiz uygulama) gibi kelimelerde kullanılır. Büyük harf eth (Ð) ayrıca kripto para birimi Dogecoin'i sembolize etmek için kullanılır. Bu genellikle eski Ethereum literatüründe görülür ancak günümüzde daha az kullanılmaktadır.

### DAG {#DAG}

DAG, Yönlendirilmiş Döngüsel Grafik anlamına gelir. Düğümler ve aralarındaki bağlantılardan oluşan bir veri yapısıdır. Ethereum, [iş kanıtı](#proof-of-work) algoritmasında [Ethash](#ethash) bir DAG kullanır.

### Mapp {#dapp}

Merkeziyetsiz aplikasyon. En azından bir [akıllı sözleşme](#smart-contract) ve bir web kullanıcı arayüzüdür. Daha geniş anlamda dapp açık, merkeziyetsiz, eşler arası altyapı hizmetleri üzerine inşa edilmiş bir web uygulamasıdır. Ek olarak birçok dapp merkeziyetsiz depolama ve/veya bir mesaj protokolü ve platformu içerir.

<DocLink to="/developers/docs/dapps/">
  Dapp'lere giriş
</DocLink>

### veri mevcudiyeti {#data-availability}

Bir durumun özelliği, ağa bağlı herhangi bir düğümün, durumun herhangi bir belirli bölümünü dilediği şekilde indirebilmesidir.

### merkeziyetsizlik {#decentralization}

Süreçlerin kontrolünü ve yürütülmesini merkezi bir varlıktan uzaklaştırma kavramı.

### merkeziyetsiz otonom organizasyonlar (DAO'lar) {#dao}

Hiyerarşik yönetim olmaksızın çalışan bir şirket veya başka bir organizasyon. DAO, 30 Nisan 2016'da başlatılan ve daha sonra Haziran 2016'da saldırıya uğrayan "DAO" adlı bir sözleşmeye de atıfta bulunabilir; bu sonuçta 1,192.000 blokta bir [hard fork](#hard-fork) (kod adı DAO)'yu motive etti ve bu, saldırıya uğramış DAO sözleşmesini tersine çevirdi, nihayetinde Ethereum ile Ethereum Classic'in iki rakip sisteme bölünmesine neden oldu.

<DocLink to="/dao/">
  Merkeziyetsiz otonom organizasyonlar (DAO'lar)
</DocLink>

### merkeziyetsiz borsa (DEX) {#dex}

Ağdaki eşler ile belirteçleri değiştirmenize olanak tanıyan bir tür [dapp](#dapp). ([işlem ücretlerini](#transaction-fee) ödemek için) [ether](#ether)'e ihtiyacınız vardır, ancak bunlar merkezileştirilmiş borsalar gibi coğrafi kısıtlamalara tabi değildir – herkes katılabilir.

<DocLink to="/get-eth/#dex">
  Merkeziyetsiz borsalar
</DocLink>

### deed {#deed}

Değiştirilemez tokenı görün (NFT)

### DeFi {#defi}

"Merkeziyetsiz finans"ın kısaltması, herhangi bir aracı olmadan blok zinciri tarafından desteklenen finansal hizmetler sunmayı amaçlayan geniş bir [dapps](#dapp) kategorisidir, internet bağlantısı olan herkes katılabilir.

<DocLink to="/defi/">
  Merkeziyetsiz Finans (DeFi)
</DocLink>

### zorluk {#difficulty}

Bir [iş kanıtı](#pow) üretmek için ne kadar hesaplama gerektiğini kontrol eden ağ çapında bir ayar.

### zorluk bombası {#difficulty-bomb}

[İş kanıtı](#pow) [zorluk](#difficulty) ayarında planlı üstel artış, [hisse kanıtı](#pos)'na geçişi motive etmek için tasarlanmıştır, bu da [çatal](#hard-fork) olma olasılığını azaltır

### dijital imza {#digital-signatures}

Bir kullanıcının [özel anahtar](#private-key) kullanarak bir belge için ürettiği kısa bir veri dizisi, öyle ki karşılık gelen [ortak anahtar](#public-key), imza ve belgeye sahip olan herkes şunu doğrulayabilir: (1) söz konusu özel anahtarın sahibi tarafından "imzalanmıştır" ve (2) imzalandıktan sonra değiştirilmemiştir belgesi.

<Divider />

### keşif {#discovery}

Bir Ethereum düğümünün bağlanacak diğer düğümleri bulma süreci.

### dağıtılmış hash tablosu (DHT) {#distributed-hash-table}

Bağlanılacak eşleri tanımlamak ve iletişim kurmak için hangi protokollerin kullanılacağını belirlemek için Ethereum düğümleri tarafından kullanılan `(anahtar, değer)` çiftlerini içeren bir veri yapısı.

### çifte harcama {#double-spend}

Yeterince büyük miktarda madencilik gücüne/payına sahip bir kullanıcının, bir miktar para birimini zincir dışı hareket ettiren bir işlem gönderdiği (örneğin fiat paraya çıkmak veya zincir dışı bir satın alma yapmak) ve ardından bu işlemi kaldırmak için blok zincirini yeniden düzenlediği kasıtlı bir blok zinciri çatalı. Başarılı bir çifte harcama, saldırganı hem zincir içi hem de zincir dışı varlıklarıyla baş başa bırakır.

## E {#section-e}

### eliptik eğri dijital imza algoritması (ECDSA) {#ecdsa}

Ethereum tarafından fonların yalnızca sahipleri tarafından harcanabilmesini sağlamak için kullanılan bir kriptografik algoritma. Genel ve özel anahtarlar oluşturmak için tercih edilen yöntemdir. Hesap [adresi](#address) oluşturma ve [işlem](#transaction) doğrulaması için önemlidir.

### şifreleme {#encryption}

Şifreleme, elektronik verilerin, doğru şifre çözme anahtarının sahibi dışında hiç kimse tarafından okunamayacak bir forma dönüştürülmesidir.

### entropi {#entropy}

Kriptografi bağlamında, öngörülebilirlik eksikliği veya rastgelelik düzeyi. [Özel anahtar](#private-key)lar gibi gizli bilgiler üretirken, algoritmalar çıktının tahmin edilemez olmasını sağlamak için genellikle yüksek entropi kaynağına güvenir.

### dönem {#epoch}

[İşaret Zinciri](#beacon-chain)-koordineli sistemde 32 [yuvalık](#slot) (6,4 dakika) bir periyot. [Doğrulayıcı](#validator) [komiteler](#committee), her dönem, güvenlik nedenleriyle karıştırılır. Zincirin [sonlandırılması](#finality) için her çağda bir fırsat vardır. Terim ayrıca [yürütme katmanında](#execution-layer) kullanılır ve <a href= iş kanıtı algoritması [Ethash](#Ethash) tarafından tohum olarak kullanılan veritabanının her yenilenmesi arasındaki aralık anlamına gelir. Dönem, 30000 blok olarak belirtilmiştir.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

### belirsizlik {#equivocation}

Birbiriyle çelişen iki mesaj gönderen bir doğrulayıcı. NonceBasit bir örnek, aynı nonce ile iki işlem gönderen bir işlem göndericisidir. Bir diğeri, aynı blok yüksekliğinde (veya aynı yuva için) iki blok öneren bir blok teklifçisidir.

### Eth1 {#eth1}

"Eth1", mevcut iş kanıtı blok zinciri olan Ethereum Anaağı'na atıfta bulunan bir terimdir. Artık bu terim, yerine "yürütüm katmanı" kullanıldığı için kullanımdan kaldırılmıştır. [Bu ad değişikliği hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Ethereum yükseltmeleri hakkında daha fazla bilgi
</DocLink>

### Eth2 {#eth2}

"Eth2", Ethereum'un hisse ispatına geçişi de dahil olmak üzere bir dizi Ethereum protokolü yükseltmesine atıfta bulunan bir terimdir. Artık bu terim, yerine "konsensus katmanı" kullanıldığı için kullanımdan kaldırılmıştır. [Bu ad değişikliği hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Ethereum yükseltmeleri hakkında daha fazla bilgi
</DocLink>

### etherbase {#etherbase}

Bir Ethereum istemcisindeki birincil hesabın varsayılan adı. Madencilik ödülleri bu hesaba yatırılır. Bu, diğer kripto para birimleri için geçerli olan "coinbase"in, Ethereum'a özgü bir sürümüdür.

### Ethereum İyileştirme Önerisi (EIP) {#eip}

Önerilen yeni bir özelliği veya süreçlerini veya ortamını açıklayan, Ethereum topluluğuna bilgi sağlayan bir tasarım belgesi (bkz. [ERC](#erc)).

<DocLink to="/eips/">
  EIP'lere giriş
</DocLink>

### Ethereum İsim Servisi (ENS) {#ens}

ENS kaydı, [EIP](#eip) 137'de açıklandığı gibi, alan adlarından sahiplere ve çözümleyicilere eşleştirme sağlayan tek bir merkezi [sözleşmedir](#smart-contract).

[Bkz. ens.domains](https://ens.domains)

### yürütüm istemcisi {#execution-client}

Yürütüm istemcileri (f.k.a. "Eth1 istemcileri"), işlemleri işlemek ve yayınlamakla ve ayrıca Ethereum'un durumunu yönetmekle görevlidir. Protokol kurallarına uyulmasını sağlamak için [Ethereum Sanal Makinesi](#evm)'ndeki her işlem için hesaplamaları çalıştırırlar. Bugün aynı zamanda [iş kanıtı](#pow) konsensusunu da ele alıyorlar. [Hisse kanıtına](#pos) geçişten sonra, bunu konsensus istemcilerine devredecekler.

### yürütüm katmanı {#execution-layer}

Ethereum'un yürütüm katmanı, [yürütüm istemcilerinin](#execution-client) ağıdır.

### dışarıdan sahip olunan hesap (EOA) {#eoa}

Harici olarak sahiplenilmiş hesaplar (EOA'lar), bir hesaptaki tipik olarak bir [güvenlik kelimesi](#hd-wallet-seed) kullanılarak oluşturulan [özel anahtarları](#private-key) kontrol eden kullanıcılar tarafından kullanılan [hesaplardır](#account). Harici olarak sahiplenilmiş hesaplar, herhangi bir kodla bağlantılı değildir. Bu hesaplar tipik olarak bir [cüzdan](#wallet) ile kullanılır.

### Ethereum Yorum Talebi (ERC) {#erc}

Belirli bir Ethereum kullanım standardını tanımlamaya çalışan bazı [EIP'lere](#eip) verilen bir etiket.

<DocLink to="/eips/">
  EIP'lere giriş
</DocLink>

### Ethash {#ethash}

Ethereum 1.0 için [iş kanıtı](#pow) algoritması.

[Bkz. eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

İşlemler yürütülürken, [gaz](#gas) maliyetlerini kapsayan, Ethereum ekosistemi tarafından kullanılan yerel kripto para birimi. ETH veya sembolü Ξ, Yunanca büyük Xi karakteri olarak da yazılır.

<DocLink to="/eth/">
  Dijital geleceğimiz için para birimi
</DocLink>

### etkinlikler {#events}

[EVM](#evm) günlük kaydı olanaklarının kullanımına izin verir. [Dapps](#dapp), olayları dinleyebilir ve bunları kullanıcı arayüzünde JavaScript geri aramalarını tetiklemek için kullanabilir.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Olaylar ve Kayıtlar
</DocLink>

### Ethereum Sanal Makinası (EVM) {#evm}

[Bytecode](#bytecode) yürüten yığın tabanlı bir sanal makine. Ethereum'da yürütme modeli, bir dizi bayt kodu talimatı ve küçük bir çevresel veri demeti verildiğinde, sistem durumunun nasıl değiştirildiğini belirtir. Bu, bir sanal durum makinesinin resmi modeli aracılığıyla belirtilir.

<DocLink to="/developers/docs/evm/">
  Ethereum Sanal Makinesı
</DocLink>

### ESM derleyici dili {#evm-assembly-language}

İnsan tarafından okunabilir bir EVM [bytecode](#bytecode) biçimi.

<Divider />

## F {#section-f}

### geri çekilim fonksiyonu {#fallback-function}

Veri ve beyan edilen işlev adının yokluğu durumunda çağrılan temel fonksiyon.

### sebil {#faucet}

[Akıllı sözleşme](#smart-contract) aracılığıyla gerçekleştirilen ve bir test ağında kullanılabilen ücretsiz test etheri biçiminde fon dağıtan bir hizmet.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Test Ağı Muslukları
</DocLink>

### nihayet {#finality}

Kesinlik, belirli bir zamandan önce yapılan bir dizi işlemin değişmeyeceğinin ve geri alınamayacağının garantisidir.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  İş kanıtı nihayeti
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Hisse kanıtı nihayeti
</DocLink>

### finney {#finney}

[ether](#ether)'in bir değeri. 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### çatal {#fork}

Madencilik sırasında alternatif bir zincir oluşturulmasına veya iki potansiyel blok yolunda zamansal bir farklılığa neden olan protokol değişikliği.

### çatal-seçim algoritması {#fork-choice-algorithm}

Blok zincirinin başını tanımlamak için kullanılan algoritma. Yürütüm katmanında zincirin başı, arkasında en büyük toplam zorluğa sahip olan parça ile belirlenir. Bu, zincirin gerçek başının, madencilik için en çok çalışmayı gerektiren blok başı olduğu anlamına gelir. Konsensus katmanında algoritma, doğrulayıcılardan toplanan tasdikleri gözlemler ([LMD_GHOST](#lmd-ghost)).

### dolandırıcılık kanıtı {#fraud-proof}

Belirli [katman 2](#layer-2) çözümleri için, hızı artırmak amacıyla işlemlerin gruplar halinde [toplandığı](#rollups) ve tek bir işlemde Ethereum'a gönderildiği bir güvenlik modeli. Geçerli oldukları varsayılır, ancak dolandırıcılıktan şüpheleniliyorsa itiraz edilebilir. Bir dolandırıcılık kanıtı, dolandırıcılığın gerçekleşip gerçekleşmediğini görmek için işlemi çalıştırır. Bu yöntem, güvenliği korurken mümkün olan işlem miktarını artırır. Bazı [toplamalar](#rollups), [geçerlilik kanıtlarını](#validity-proof) kullanır.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  İyimser toplamalar
</DocLink>

### sınır {#frontier}

Temmuz 2015'ten Mart 2016'ya kadar süren Ethereum'un ilk test geliştirme aşaması.

<Divider />

## G {#section-g}

### gaz {#gas}

Akıllı sözleşmeleri yürütmek için Ethereum'da kullanılan sanal bir yakıt. [ESM](#evm), gaz tüketimini ölçmek ve bilgi işlem kaynaklarının tüketimini sınırlamak için bir muhasebe mekanizması kullanır (bkz. [Turing complete](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gaz ve Ücretler
</DocLink>

### gaz limiti {#gas-limit}

Bir [blok](#block) veya [işlem](#transaction)'in tüketebileceği maksimum [gaz](#gas) miktarı.

### gaz fiyatı {#gas-price}

Bir işlemde belirtilen bir gaz biriminin ether cinsinden fiyatı.

### başlangıç bloğu {#genesis-block}

Belirli bir ağı ve onun kripto para birimini başlatmak için kullanılan bir [blockchain](#blockchain) içindeki ilk blok.

### geth {#geth}

Go Ethereum. Go ile yazılmış, Ethereum protokolünün en belirgin uygulamalarından biri.

[Bkz. geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei'nin kısaltması, genellikle [gaz](#gas)'ı fiyatlandırmak için kullanılan [ether](#ether) birimi. 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### sert çatal {#hard-fork}

[Blockchain](#blockchain)'de kalıcı bir farklılık; sert çatallı değişiklik olarak da bilinir. Güncellenmemiş düğümler, daha yeni [konsensus kurallarına](#consensus-rules) uyan yükseltilmiş düğümler tarafından oluşturulan blokları doğrulayamadığında yaygın olarak ortaya çıkar. Çatal, yumuşak çatal, yazılım çatalı veya Git çatalı ile karıştırılmamalıdır.

### hash {#hash}

Bir karma işlevi tarafından üretilen, değişken boyutlu girdinin sabit uzunluktaki parmak izi. (Bkz. [keccak-256](#keccak-256)).

### karmahızı {#hash-rate}

Madencilik yazılımı çalıştıran bilgisayarlar tarafından saniyede yapılan karma hesaplama sayısı.

### HD cüzdanı {#hd-wallet}

Hiyerarşik deterministik (HD) anahtar oluşturma ve aktarma protokolünü kullanan bir [cüzdan](#wallet).

[Github.com'da daha fazlasını okuyun](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD cüzdan tohumu {#hd-wallet-seed}

Bir HD [cüzdan](#wallet) için ana [özel anahtarı](#private-key) ve ana zincir kodunu oluşturmak için kullanılan bir değer. Cüzdan tohumu, insanların özel anahtarları kopyalamasını, yedeklemesini ve geri yüklemesini kolaylaştıran anımsatıcı kelimelerle temsil edilebilir.

### homestead {#homestead}

Ethereum'un ikinci geliştirme aşaması, Mart 2016'da 1.150.000 blokta başlatıldı.

<Divider />

## I {#section-i}

### dizin {#index}

Depolama kaynağına verimli bir yol sağlayarak [blokzincir](#blockchain) genelinde bilgi sorgulamasını optimize etmeyi amaçlayan bir ağ yapısı.

### Değişimler Arası İstemci Adresi Protokolü (ICAP) {#icap}

Uluslararası Banka Hesap Numarası (IBAN) kodlamasıyla kısmen uyumlu olan ve Ethereum adresleri için çok yönlü, sağlama toplamı ve birlikte çalışabilir bir kodlama sunan bir Ethereum adres kodlamasıdır. ICAP adresleri, yargı yetkisi olmayan para birimlerinde (örneğin, XBT, XRP, XCP) kullanıldığı gibi, "genişletilmiş Ethereum" anlamına gelen yeni IBAN sözde ülke kodu-XE kullanır.

### Buz Devri {#ice-age}

Üstel bir [zorluk](#difficulty) artışı (diğer adıyla [zorluk bombası](#difficulty-bomb)) getirmek için 200.000 blokta Ethereum'un [hard fork'u](#hard-fork), [hisse kanıta geçişi](#pos) motive ediyor.

### tümleşik geliştirme ortamı (IDE) {#ide}

Genellikle bir kod düzenleyici, derleyici, çalışma zamanı ve hata ayıklayıcıyı birleştiren bir kullanıcı arabirimi.

<DocLink to="/developers/docs/ides/">
  Tümleşik Geliştirme Ortamları
</DocLink>

### değiştirilemez olarak konuşlandırılmış kod problemi {#immutable-deployed-code-problem}

Bir [sözleşmenin](#smart-contract) (veya [kütüphanenin](#library)) kodu dağıtıldığında, değişmez hale gelir. Standart yazılım geliştirme uygulamaları, olası hataları düzeltmeye ve yeni özellikler eklemeye dayanır, bu nedenle bu, akıllı sözleşme geliştirme için bir zorluk teşkil eder.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Akıllı Sözleşmeleri Dağıtma
</DocLink>

### iç işlem {#internal-transaction}

Bir [sözleşme hesabından](#contract-account) başka bir sözleşme hesabına veya [EOA](#eoa)'ya gönderilen [işlem](#transaction) (bkz. [mesaj](#message)).

<Divider />

### ihraç

Blok teklifini, tasdik ve ihbarı ödüllendirmek için yeni etherin basımı.

## K {#section-k}

### anahtar türetme fonksiyonu (KDF) {#kdf}

"Parola genişletme algoritması" olarak da bilinir, [anahtar deposu](#keystore-file) biçimleri tarafından, parola şifrelemesine yönelik kaba kuvvet, sözlük ve gökkuşağı tablosu saldırılarına karşı, sürekli olarak parolayı karma yaparak koruma sağlamak için kullanılır.

<DocLink to="/developers/docs/smart-contracts/security/">
  Akıllı sözleşme güvenliği
</DocLink>

### anahtar deposu {#keyfile}

Her hesabın özel anahtar/adres çifti, bir Ethereum istemcisinde tek bir anahtar dosya olarak bulunur. Bunlar, yalnızca hesap oluşturma sırasında girilen parola ile şifresi çözülebilen, hesabın şifrelenmiş özel anahtarını içeren JSON metin dosyalarıdır.

### keccak-256 {#keccak-256}

Ethereum'da kullanılan kriptografik [karma](#hash) işlevi. Keccak-256, [SHA](#sha)-3 olarak standardize edildi.

<Divider />

## L {#section-l}

### katman 2 {#layer-2}

Ethereum protokolünün üstündeki katman iyileştirmelerine odaklanan bir geliştirme alanı. Bu iyileştirmeler, [işlem](#transaction) hızları, daha ucuz [işlem ücretleri](#transaction-fee) ve işlem gizliliği ile ilgilidir.

<DocLink to="/layer-2/">
  Katman 2
</DocLink>

### SeviyeDB {#level-db}

Hafif, tek amaçlı bir [kütüphane](#library) olarak uygulanan ve birçok platforma bağlanan açık kaynaklı bir disk üzerinde anahtar/değer deposu.

### kütüphane {#library}

Ödenecek işlevleri, geri dönüş işlevi ve veri depolaması olmayan özel bir [sözleşme](#smart-contract) türü. Bu nedenle, ether alamaz, tutamaz veya veri depolayamaz. Bir kitaplık, diğer sözleşmelerin salt okunur hesaplama için çağırabileceği, önceden konuşlandırılmış kod olarak hizmet eder.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Akıllı Sözleşme Kütüphaneleri
</DocLink>

### hafif istemci {#lightweight-client}

[Blokzincir](#blockchain)'in yerel bir kopyasını saklamayan veya blokları ve [işlemleri](#transaction) doğrulamayan bir Ethereum istemcisi. Bir [cüzdan](#wallet) fonksiyonu gösterir ve işlemler oluşturup yayınlayabilir.

<Divider />

### LMD_GHOST {#lmd-ghost}

Ethereum'un konsensus istemcileri tarafından zincirin başını belirlemek için kullanılan [çatal-seçim algoritması](#fork-choice-algorithm). LMD-GHOST, "Latest Message Driven Greediest Heaviest Observed SubTree" ifadesinin kısaltmasıdır; bu, zincirin başının, tarihindeki en büyük [tasdik](#attestation) birikimine sahip blok olduğu anlamına gelir.

## M {#section-m}

### Anaağ {#mainnet}

"Ana ağ"ın kısaltması olan, genel Ethereum [blockchain](#blockchain)'dir. Gerçek ETH, gerçek değer ve gerçek sonuçlar. [Katman 2](#layer-2) ölçekleme çözümlerini tartışırken katman 1 olarak da bilinir. (Ayrıca, [testnet](#testnet)'e bakın)

<DocLink to="/developers/docs/networks/">
  Ethereum ağları
</DocLink>

### hafıza-zorlar {#memory-hard}

Sabit bellek işlevleri, kullanılabilir bellek miktarı biraz bile azaldığında, hızda veya fizibilitede ciddi bir düşüş yaşayan işlemlerdir. Örnek bir kimlik, Ethereum madencilik algoritması [Ethash](#ethash).

### Merkle Patricia ağacı {#merkle-patricia-tree}

Anahtar/değer çiftlerini verimli bir şekilde depolamak için Ethereum'da kullanılan bir veri yapısı.

### mesaj {#message}

Hiçbir zaman serileştirilmeyen ve yalnızca [Ethereum Sanal Makinesi](#evm) içinde gönderilen [dahili işlem](#internal-transaction).

### mesaj çağrısı {#message-call}

Bir hesaptan diğerine [mesaj](#message) geçirme eylemi. Hedef hesap [Ethereum Sanal Makinesi](#evm) koduyla ilişkilendirilmişse, Sanal Makine o nesnenin durumuyla ve iletiye göre hareket edilerek başlatılır.

### Metropolis {#metropolis}

Ekim 2017'de başlatılan Ethereum'un üçüncü geliştirme aşaması.

### madencilik {#mining}

Her bloğun madenciliği ile etherde bir ödül karşılığında Ethereum blok zincirinde işlemlerin ve sözleşmenin yürütülmesinin doğrulanması süreci.

### madencilik havuzu {#mining-pool}

İşlem güçlerini paylaşan ve [blok ödüllerini](#block-reward) bölen madenciler tarafından kaynakların bir havuzda toplanması.

### madenci {#miner}

Tekrarlanan geçiş karma işlemiyle yeni bloklar için geçerli [iş kanıtı](#pow) bulan bir ağ [düğümü](#node) (bkz. [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Madencilik
</DocLink>

### basım {#mint}

Token basmak, yeni token'lar yaratma ve bunları kullanılabilecekleri şekilde dolaşıma sokma sürecidir. Merkezi otoritenin katılımı olmadan yeni bir token oluşturmak için kullanılan merkeziyetsiz bir mekanizmadır.

<Divider />

## N {#section-n}

### ağ {#network}

İşlemleri ve blokları her Ethereum düğümüne (ağ katılımcısı) yayan eşler arası bir ağ olan Ethereum ağına atıfta bulunur.

<DocLink to="/developers/docs/networks/">
  Ağlar
</DocLink>

### ağ karma hızı {#network-hashrate}

Tüm Ethereum madencilik ağı tarafından üretilen toplu [hash oranı](#hashrate).

### değiştirilemez token (NFT) {#nft}

"Tapu" olarak da bilinen LMD-GHOST, ERC-721 teklifi tarafından tanıtılan bir belirteç standardıdır. NFT'ler izlenebilir ve takas edilebilir, ancak her bir token benzersiz ve farklıdır; ETH ve [ERC-20 jetonları](#token-standard) gibi değiştirilemezler. NFT'ler, dijital veya fiziksel varlıkların sahipliğini temsil edebilir.

<DocLink to="/nft/">
  Değiştirilemeyen tokenler (NFT'ler)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Değiştirilemeyen Token Standardı
</DocLink>

### boğum {#node}

Ağa katılan bir yazılım istemcisi.

<DocLink to="/developers/docs/nodes-and-clients/">
  Düğümler ve İstemciler
</DocLink>

### nonce {#nonce}

Kriptografide, bir değer, yalnızca bir kez kullanılabilinir. Ethereum'da kullanılan iki tür nonce vardır- hesap nonce, her hesapta tekrar saldırılarını önlemek için kullanılan bir işlem sayacıdır; [iş kanıtı](#pow) nonce ise [iş kanıtı](#pow)'nı karşılamak için kullanılan bir bloktaki rastgele değerdir.

<Divider />

## O {#section-o}

### ommer (amca) blok {#ommer}

Bir [madenci](#miner) geçerli bir [blok](#block) bulduğunda, başka bir madenci önce blok zincirinin ucuna eklenen rakip bir blok yayınlamış olabilir. Bu geçerli, ancak eski blok, daha yeni bloklar tarafından _ommers_ olarak dahil edilebilir ve kısmi blok ödülü alabilir. "Ommer" terimi, bir ebeveyn bloğunun kardeşi için tercih edilen cinsiyetten bağımsız terimdir, ancak buna bazen "amca" da denir.

### i̇yimser toplama {#optimistic-rollup}

[Anaağ](#mainnet) tarafından sağlanan güvenliği kullanırken, artan [katman 2](#layer-2) işlem verimi sunmak için [dolandırıcılık kanıtlarını](#fraud-proof) kullanan işlemlerin [toplaması](#rollups) (katman 1). Benzer bir katman 2 çözümü olan [Plazma](#plasma)'dan farklı olarak, İyimser özetler daha karmaşık işlem türlerini işleyebilir - [Ethereum Sanal Makinesi](#evm)'nde mümkün olan her şey. [Sıfır bilgi toplamaları](#zk-rollups)na kıyasla gecikme sorunları vardır, çünkü bir işleme dolandırıcılık kanıtı yoluyla itiraz edilebilir.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  İyimser Toplamalar
</DocLink>

### Kahin {#oracle}

Oracle, [blockchain](#blockchain) ile gerçek dünya arasında bir köprüdür. Bilgi için sorgulanabilen ve [akıllı sözleşmelerde](#smart-contract) kullanılabilen zincir üstündeki [API'ler](#api) gibi davranırlar.

<DocLink to="/developers/docs/oracles/">
  Kâhinler
</DocLink>

<Divider />

## P {#section-p}

### eşlik {#parity}

Ethereum istemci yazılımının en belirgin birlikte çalışabilir uygulamalarından biri.

### eş {#peer}

[Blockchain](#blockchain)'in aynı kopyalarına sahip, Ethereum istemci yazılımı çalıştıran bağlı bilgisayarlar.

### eşler arası ağ {#peer-to-peer-network}

Merkezi, sunucu tabanlı hizmetlere ihtiyaç duymadan işlevleri toplu olarak gerçekleştirebilen bir bilgisayar ağı ([eşler](#peer)).

### Plazma {#plasma}

[İyimser toplamalar](#optimistic-rollups) gibi [dolandırıcılık kanıtlarını](#fraud-proof) kullanan zincir dışı bir ölçeklendirme çözümü. Plazma, temel token transferleri ve takasları gibi basit işlemlerle sınırlıdır.

<DocLink to="/developers/docs/scaling/plasma">
  Plazma
</DocLink>

### özel anahtar (gizli anahtar) {#private-key}

Ethereum kullanıcılarının dijital bir imza üreterek bir hesabın veya sözleşmenin sahipliğini kanıtlamasına olanak tanıyan gizli bir numara (bkz. [genel anahtar](#public-key), [adres](#address), [ECDSA](#ecdsa)).

### özel zincir {#private-chain}

Tamamen özel bir blok zinciri, izinli erişime sahip olan ve herkesin kullanımına açık olmayan bir blok zinciridir.

### hisse kanıtı (PoS) {#pos}

Bir kripto para birimi blok zinciri protokolünün dağıtılmış [konsensusa](#consensus) ulaşmayı amaçladığı bir yöntem. Hisse kanıtı, işlemlerin onaylanmasına katılabilmek için kullanıcılardan belirli bir miktarda kripto para biriminin (ağdaki "payları") sahipliğini kanıtlamalarını ister.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Hisse ispatı
</DocLink>

### i̇ş kanıtı (PoW) {#pow}

Bulmak için önemli hesaplama gerektiren bir veri parçası (kanıt). Ethereum'da, [madenciler](#miner), ağ çapında bir [zorluk](#difficulty) hedefini karşılayan [Ethash](#ethash) algoritmasına sayısal bir çözüm bulmalıdır.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  İş ispatı
</DocLink>

### genel anahtar {#public-key}

[özel anahtardan](#private-key) tek yönlü bir işlev aracılığıyla türetilen, herkese açık olarak paylaşılabilen ve ilgili özel anahtarla yapılan dijital imzayı doğrulamak için herkes tarafından kullanılabilen bir sayı.

<Divider />

## R {#section-r}

### makbuz {#receipt}

Belirli bir [işlemin](#transaction) sonucunu temsil etmek için bir Ethereum istemcisi tarafından döndürülen veriler, işlemin [karma](#hash)kayıtlarını, [blok](#block) numarasını, kullanılan [gaz](#gas) miktarını ve bir [akıllı sözleşmenin](#smart-contract) uygulanması durumunda, sözleşmenin [adres](#address)ini tutar.

### yeniden giriş saldırısı {#re-entrancy-attack}

Bir saldırgan sözleşmenin, yürütme sırasında kurbanın sözleşmesini yinelemeli olarak yeniden çağırmasını sağlayacak şekilde bir kurban sözleşmesi işlevi içeren bir saldırıdır. Örneğin bu, mağdur sözleşmesinin bakiyeleri güncelleyen veya para çekme miktarlarını sayan kısımlarını atlayarak fonların çalınmasıyla sonuçlanabilir.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Yeniden giriş
</DocLink>

### ödül {#reward}

Ağ tarafından [iş kanıtı](#pow) çözümünü bulan [madenciye](#miner) ödül olarak verilen, her yeni bloğa eklenen bir miktar ether.

### Tekrarlamalı Uzunluk Öneki (RLP) {#rlp}

Ethereum geliştiricileri tarafından rastgele karmaşıklık ve uzunluktaki nesneleri (veri yapılarını) kodlamak ve seri hale getirmek için tasarlanmış bir kodlama standardı.

### toplama {#rollups}

Birden çok işlemi gruplandıran ve bunları tek bir işlemde [Ethereum ana zincirine](#mainnet) gönderen bir tür [katman 2](#layer-2) ölçeklendirme çözümü. Bu, [gaz](#gas) maliyetlerinde azalmaya ve [işlem](#transaction) çıktısında artışa olanak tanır. Bu ölçeklenebilirlik kazanımlarını sunmak için farklı güvenlik yöntemleri kullanan İyimser ve Sıfır bilgi toplamaları vardır.

<DocLink to="/developers/docs/scaling/#rollups">
  Toplamalar
</DocLink>

<Divider />

### RPC {#rpc}

**Uzaktan prosedür çağrısı (RPC)**, bir programın ağdaki başka bir bilgisayarda bulunan bir programdan ağ ayrıntılarını anlamak zorunda kalmadan hizmet istemek için kullandığı bir protokoldür.

## S {#section-s}

### Güvenli Karma Algoritması (SHA) {#sha}

Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) tarafından yayınlanan bir şifreleme karma işlevleri ailesi.

### Sükunet {#serenity}

Daha önce 'Ethereum 2.0' veya 'Eth2' olarak bilinen bir dizi ölçeklendirme ve sürdürülebilirlik yükseltmesini başlatan Ethereum geliştirme aşaması.

<DocLink to="/upgrades/">
  Ethereum yükseltmeleri
</DocLink>

### serileştirme {#serialization}

Veri yapısını bir bayt dizisine dönüştürme işlemi.

### parça / parça zinciri {#shard}

[İşaret Zinciri](#beacon-chain), bir [hisse kanıtı](#pos) zinciri tarafından koordine edilir ve [doğrulayıcılar](#validator) tarafından güvence altına alınır. Parça zinciri yükseltmesinin bir parçası olarak, ağa 64 tanesi eklenecektir. Parça zincirleri, [katman 2](#layer-2) çözümlerine [iyimser toplamalar](#optimistic-rollups) ve [ZK-rollups](#zk-rollups) gibi ek veriler sağlayarak Ethereum için artan işlem hacmi sunacak.

<DocLink to="/upgrades/shard-chains">
  Parça Zincirleri
</DocLink>

### yanzincir {#sidechain}

Farklı, genellikle daha hızlı [konsensus kurallarına](#consensus-rules) sahip, ayrı bir zincir kullanan, bir ölçeklendirme çözümü. Bu yan zincirleri [Anaağ](#mainnet)'a bağlamak için bir köprü gereklidir. [Toplamalar](#rollups) da yan zincirler kullanır ancak bunun yerine [Ana Ağ](#mainnet) ile işbirliği içinde çalışırlar.

<DocLink to="/developers/docs/scaling/sidechains/">
  Yan zincirler
</DocLink>

### imzalama {#signing}

Bir işlemin belirli bir özel anahtarın sahibi tarafından onaylandığını kriptografik olarak gösterme.

### tekil {#singleton}

Yalnızca tek bir örneğinin bulunabileceği bir nesneyi tanımlayan bir bilgisayar programlama terimi.

### yuva {#slot}

Yeni bir [İşaret Zinciri](#beacon-chain) ve [parça](#shard) zincir bloğunun [doğrulayıcı](#validator) tarafından [ içinde önerilebileceği bir süre (12 saniye) Proof-of-stake](#pos) sistemi. Bir yuva boş olabilir. 32 yuva bir [dönem](#epoch) oluşturur.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

### akıllı sözleşme {#smart-contract}

Ethereum bilgi işlem altyapısında çalışan bir program.

<DocLink to="/developers/docs/smart-contracts/">
  Akıllı Sözleşmelere Giriş
</DocLink>

### SNARK {#snark}

"Öz ve etkileşimli olmayan bilgi argümanı"nın kısaltması olan SNARK, bir tür [sıfır bilgi kanıtıdır](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### yumuşak çatallanma {#soft-fork}

[Mutabakat kuralları](#consensus-rules) değiştiğinde bir [blokzincirde](#blockchain) meydana gelen bir farklılıktır. [Sert çatallanmanın](#hard-fork) aksine yumuşak çatallanma geriye dönük olarak uyumludur; yükseltilmiş düğümler yeni mutabakat kurallarına uyduğu sürece yükseltilmemiş düğümler tarafından oluşturulan blokları doğrulayabilir.

### Solidity {#solidity}

JavaScript, C++ veya Java'ya benzer söz dizimine sahip prosedürel (zorunlu) bir programlama dili. Ethereum [akıllı sözleşmeleri](#smart-contract) için en popüler ve en sık kullanılan dil. Dr. Gavin Wood tarafından yaratıldı.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity sıralı derleyicisi {#solidity-inline-assembly}

Bir [Solidity](#solidity) programında [EVM](#evm) derleme dili. Solidity'nin satır içi derleme desteği, belirli işlemleri yazmayı kolaylaştırır.

### Sahte Ejderha {#spurious-dragon}

Daha fazla hizmet reddi saldırı vektörü ve net durumu ele almak için 2.675.000 blokta meydana gelen Ethereum blok zincirinin bir [sert çatallanma](#hard-fork) (bkz. [Mandalina Düdüğü](#tangerine-whistle)). Ayrıca, bir tekrar saldırı koruma mekanizması (bkz. [nonce](#nonce)).

### sabit para {#stablecoin}

Değeri başka bir varlığın değerine sabitlenmiş bir [ERC-20 tokenı](#token-standard). Dolar gibi bir resmi para birimi, altın gibi değerli metaller ve Bitcoin gibi diğer kripto paralar tarafından desteklenen sabit paralar vardır.

<DocLink to="/eth/#tokens">
  ETH, Ethereum'daki tek kripto değildir
</DocLink>

### hisseleme {#staking}

Doğrulayıcı olmak ve [ağı](#network) güvence altına almak için bir miktar [ether](#ether) (payınız) yatırmak. Doğrulayıcı, [işlemleri](#transaction) kontrol eder ve bir [pay kanıtı](#pos) mutabakat modeli altında [bloklar](#block) önerir. Hisseleme, ağın çıkarları doğrultusunda hareket etmeniz için size ekonomik bir teşvik sağlar. [Doğrulayıcı](#validator) görevlerinizi yerine getirdiğiniz için ödüller alacaksınız, ancak yapmazsanız değişen miktarlarda ETH kaybedeceksiniz.

<DocLink to="/staking/">
  Ethereum doğrulayıcısı olmak için ETH'nizi hisseleyin
</DocLink>

### STARK {#stark}

"Scalable transparent argument of knowledge"ın (Ölçeklenebilir şeffaf bilgi argümanı) kısaltması olan STARK, bir tür [sıfır bilgili ispattır](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### durum {#state}

Normalde belirli bir bloktaki duruma atıfta bulunarak blok zincirde belirli bir zaman noktasındaki tüm bakiyelerin ve verilerin anlık görüntüsü.

### özel kanallar {#state-channels}

Katılımcılar arasında özgürce ve ucuza işlem yapabilecekleri bir kanalın kurulduğu bir [katman 2](#layer-2) çözümü. [Ana ağ](#mainnet)'a yalnızca kanalı kurmak ve kanalı kapatmak için bir [işlem](#transaction) gönderilir. Bu, çok yüksek işlem hacmine izin verir, ancak katılımcı sayısının önceden bilinmesine ve fonların kilitlenmesine dayanır.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Özel kanallar
</DocLink>

### süper çoğunluk {#supermajority}

Süper çoğunluk, [İşaret Zincirindeki toplam hisselenen etherin 2/3'ünü (%66) aşan bir miktar için verilen terimdir](#beacon-chain). İşaret Zincirinde blokların [sonlandırılması](#finality) için bir süper çoğunluk oyu gereklidir.

### senkronize etme {#syncing}

Bir blok zincirin en son sürümünün tamamını bir düğüme indirme işlemi.

### senkronizasyon kurulu {#sync-committee}

Senkronizasyon kurulu, [İşaret Zinciri](#beacon-chain) üzerinde ortalama her 27 saatte bir yenilenen rastgele seçilmiş [doğrulayıcılar](#validator) grubudur. Amaçları, imzalarını geçerli blok başlıklarına eklemektir. Senkronizasyon kurulları, [hafif istemcilerin](#lightweight-client) tüm doğrulayıcı setine erişmek zorunda kalmadan blok zincirin başını takip etmesine olanak tanır.

### szabo {#szabo}

[Ether](#ether)'in bir değeri. 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Mandalina Düdüğü {#tangerine-whistle}

Belirli G/Ç yoğun işlemler için [gaz](#gas) hesaplamasını değiştirmek ve düşük gaz maliyetinden yararlanan hizmet dışı bir saldırı olan birikmiş durumu bir reddetme durumundan temizlemek için 2,463.000 blokta meydana gelen Ethereum blok zincirinin bir [sert çatallanması](#hard-fork).

### terminal toplam zorluk (TTD) {#terminal-total-difficulty}

Toplam zorluk, blok zincirde belirli bir noktaya kadar olan tüm bloklar için Ethash madencilik zorluğunun toplamıdır. Terminal toplam zorluğu, yürütüm istemcilerinin madenciliklerini kapatmaları ve dedikodu işlevlerini bloke etmeleri için tetikleyici olarak kullanılacak toplam zorluk için belirli bir değerdir, böylece ağın hisse ispatına geçiş yapabilmesi sağlanır.

### test ağı {#testnet}

"Test ağı"nın kısaltması, ana Ethereum ağının davranışını simüle etmek için kullanılan bir ağ (bkz. [Ana ağ](#mainnet)).

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Test ağları
</DocLink>

### token {#token}

Ethereum blok zincirindeki akıllı sözleşmelerde tanımlanan ticarete açık bir sanal mal.

### token standardı {#token-standard}

ERC-20 teklifiyle sunulan bu standart, değiştirilebilir tokenlar için standartlaştırılmış bir [akıllı sözleşme](#smart-contract) yapısı sağlar. [NFT'lerin](#nft) aksine, aynı sözleşmeye ait tokenlar izlenebilir, takas edilebilir ve değiştirilebilir.

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20 Token Standardı
</DocLink>

### işlem {#transaction}

Belirli bir [adresi](#address) hedefleyen, bir başlangıç [hesabı](#account) tarafından imzalanan Ethereum Blok Zincirine taahhüt edilen veriler. İşlem, söz konusu işlem için [gaz limiti](#gas-limit) gibi meta verileri içerir.

<DocLink to="/developers/docs/transactions/">
  İşlemler
</DocLink>

### işlem ücreti {#transaction-fee}

Ethereum ağını her kullandığınızda ödemeniz gereken bir ücret. Örnekler arasında, [cüzdanınızdan](#wallet) para gönderme veya token takası ya da koleksiyon satın alma gibi bir [dapp](#dapp) etkileşimi sayılabilir. Bunu bir hizmet bedeli gibi düşünebilirsiniz. Bu ücret, ağın ne kadar meşgul olduğuna bağlı olarak değişecektir. Bunun nedeni, işleminizi gerçekleştirmekten sorumlu kişiler olan [madencilerin](#miner) daha yüksek ücretli işlemlere öncelik vermesidir: Bu nedenle tıkanıklık, fiyatı yukarı çeker.

Teknik düzeyde işlem ücretiniz, işleminizin ne kadar [gaz](#gas) gerektirdiğiyle ilgilidir.

İşlem ücretlerinin düşürülmesi şu sıralar yoğun ilgi gören bir konudur. Bkz. [Katman 2](#layer-2)

### güvensizlik {#trustlessness}

Bir ağın, ilgili tarafların herhangi birinin üçüncü bir tarafa güvenmesine gerek kalmadan işlemlere aracılık etme yeteneği

### Turing tamamlığı {#turing-complete}

İsmini İngiliz matematikçi ve bilgisayar bilimcisi Alan Turing'den alan bir veri işleme kuralları sistemi olan (bir bilgisayarın komut seti, programlama dili veya hücresel otomasyon gibi) bu kavram, eğer herhangi bir Turing makinesini simüle etmek için kullanılabilirse bunun "Turing tamamlığı" veya "hesaplama açısından evrensel" olduğu söylenir.

<Divider />

## V {#section-v}

### doğrulayıcı {#validator}

Verileri depolamaktan, işlemleri işlemekten ve blok zincire yeni bloklar eklemekten sorumlu [hisse ispatı](#pos) sistemindeki bir [düğüm](#node). Doğrulayıcı yazılımını etkinleştirmek için, 32 ETH'yi [paylaşabilmeniz](#staking) gerekir.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Hisse ispatı
</DocLink>
<DocLink to="/staking/">
  Ethereum'da hisseleme
</DocLink>

### doğruluk kanıtı {#validity-proof}

Belirli [katman 2](#layer-2) çözümleri için, hızı artırmak üzere işlemlerin gruplar halinde [toplandığı](/#rollups) ve tek bir işlemde Ethereum'a gönderildiği bir güvenlik modeli. İşlem hesaplaması zincir dışında yapılır ve daha sonra doğruluklarının bir ispatı ile ana zincire sağlanır. Bu yöntem, güvenliği korurken mümkün olan işlem miktarını artırır. Bazı [toplamalar](#rollups), [sahtecilik kanıtlarını](#fraud-proof) kullanır.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### validium {#validium}

İşlem hacmini iyileştirmek için [doğruluk kanıtlarını](#validity-proof) kullanan zincir dışında bir çözüm. [Sıfır-bilgi toplamalarının](#zk-rollup) aksine, Validium verileri katman 1 [Ana Ağda](#mainnet) depolanmaz.

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Python benzeri söz dizimine sahip üst düzey bir programlama dili. Saf işlevsel bir dile yaklaşmak amaçlanmıştır. Vitalik Buterin tarafından yaratıldı.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### cüzdan {#wallet}

[Özel anahtarları](#private-key) tutan yazılım. Ethereum [hesaplarına](#account) erişmek, kontrol etmek ve [akıllı sözleşmelerle](#smart-contract) etkileşim kurmak için kullanılır. Anahtarların bir cüzdanda saklanması gerekmez ve geliştirilmiş güvenlik için çevrimdışı depolamadan (yani bir hafıza kartı veya kağıttan) alınabilir. İsmine rağmen, cüzdanlar asla gerçek paraları veya tokenları saklamaz.

<DocLink to="/wallets/">
  Ethereum Cüzdanları
</DocLink>

### Web3 {#web3}

Web'in üçüncü versiyonu. İlk olarak Dr. Gavin Wood tarafından önerilen Web3, merkezi olarak sahip olunan ve yönetilen uygulamalardan merkeziyetsiz protokoller üzerine kurulu uygulamalara kadar web uygulamaları için yeni bir vizyonu ve odağı temsil eder (bkz. [dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 ve Web3
</DocLink>

### wei {#wei}

[Ether](#ether)'in en küçük değeri. 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### sıfır adres {#zero-address}

Bir [sözleşme oluşturma işleminin](#contract-creation-transaction) hedef adresi olarak belirtilen, tamamen sıfırlardan oluşan özel bir Ethereum adresi.

### sıfır bilgili ispat {#zk-proof}

Sıfır bilgili ispat, bir kişinin herhangi bir ek bilgi aktarmadan bir ifadenin doğru olduğunu kanıtlamasına izin veren kriptografik bir yöntemdir.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### sıfır-bilgi toplaması {#zk-rollup}

[Ana ağ](#mainnet) tarafından sağlanan güvenliği kullanırken artan [katman 2](#layer-2) işlem verimi sunmak için [doğruluk kanıtlarını](#validity-proof) kullanan işlemlerin [toplanması](#rollups) (katman 1). [İyimser toplamalar](#optimistic-rollups) gibi karmaşık işlem türlerini işleyemeseler de, işlemler gönderildiklerinde kanıtlanabilir şekilde geçerli olduklarından gecikme sorunları yaşamazlar.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-Bilgi Toplamaları
</DocLink>

<Divider />

## Kaynaklar {#sources}

_CC-BY-SA kapsamında bir kısmı [Andreas M. Antonopoulos ve Gavin Wood](https://ethereumbook.info)'un [Ethereum'da Uzmanlaşma](https://github.com/ethereumbook/ethereumbook) eserinden sağlanmıştır_

<Divider />

## Bu sayfaya katkıda bulunun {#contribute-to-this-page}

Gözden kaçırdığımız bir şey mi var? Yanlış bir şey mi var? GitHub'daki bu sözlüğe katkıda bulunarak gelişmemize yardımcı olun!

[Nasıl katkıda bulunacağınız hakkında daha fazla bilgi edinin](/contributing/adding-glossary-terms)
