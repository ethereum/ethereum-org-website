---
title: Ethereum Sözlüğü
description: Ethereum ile ilgili teknik ve teknik olmayan, tamamlanmamış bir sözlük
lang: tr
sidebar: true
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

### assert {#assert}

[Solidity](#solidity)'de, `assert(false)`, kalan tüm [gazı](#gas) kullanan geçersiz bir işlem kodu olan `0xfe` olarak derlenir ve tüm değişiklikleri geri alır. Bir `assert()` ifadesi başarısız olduğunda, çok yanlış ve beklenmedik bir şey oluyor demektir ve kodunuzu düzeltmeniz gerekir. Asla ama asla olmaması gereken koşullardan kaçınmak için `assert()` kullanmalısınız.

<DocLink to="/developers/docs/smart-contracts/security/">
  Akıllı sözleşme güvenliği
</DocLink>

### tasdik {#attestation}

Bir [İşaret Zinciri](#beacon-chain) veya [parça](#shard) [bloğu](#block) için doğrulayıcı oy. Doğrulayıcılar, blok tarafından önerilen durumla aynı fikirde olduklarını belirterek blokları onaylamalıdır.

<Divider />

## B {#section-b}

### Taban Ücret {#base-fee}

Her [blok](#block), "taban ücret" olarak bilinen bir rezerv fiyatına sahiptir. Bir kullanıcının sonraki bloğa bir işlemi dahil etmesi için ödemesi gereken minimum [gaz](#gas) ücretidir.

<DocLink to="/developers/docs/gas/">
  Gaz ve ücretler
</DocLink>

### İşaret Zinciri {#beacon-chain}

Tüm Ethereum ağının koordinatörü olacak yeni bir mutabakat katmanı sunan bir ağ yükseltmesi. Ethereum'a [hisse ispatı](#pos) ve [doğrulayıcılar](#validator) sunar. Sonunda [Mainnet](#mainnet) ile birleştirilecektir.

<DocLink to="/upgrades/beacon-chain/">
  İşaret Zinciri
</DocLink>

### big-endian {#big-endian}

En önemli basamağın bellekte ilk olduğu konumsal sayı gösterimi. En az anlamlı basamağın ilk olduğu küçük endian'ın tersi.

### blok {#block}

Oluşturulan [işlemler](#transaction) hakkında gerekli bilgiler topluluğu (bir blok başlığı) ve [ommer](#ommer) olarak bilinen bir dizi başka blok başlığı. Bloklar, Ethereum ağına [madenciler](#miner) tarafından eklenir.

<DocLink to="/developers/docs/blocks/">
  Bloklar
</DocLink>

### blok zinciri {#blockchain}

Ethereum'da, [başlangıç bloğuna](#genesis-block) kadar her biri bir öncekine bağlanan, [iş ispatı](#pow) sistemi tarafından doğrulanan bir dizi [blok](#block). Blok boyutu sınırı yoktur; bunun yerine değişen [gaz sınırı](#gas-limit)nı kullanır.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Blok zinciri nedir?
</DocLink>

### bayt kodu {#bytecode}

Bir yazılım yorumlayıcısı veya bir sanal makine tarafından verimli bir şekilde yürütülmesi için tasarlanmış soyut bir talimat seti. İnsan tarafından okunabilen kaynak kodun aksine, bayt kodu sayısal biçimde ifade edilir.

### Bizans çatalı {#byzantium-fork}

[Metropolis](#metropolis) geliştirme aşaması için iki [sert çatalın](#hard-fork) ilki. EIP-649 Metropolis [Zorluk Bombası](#difficulty-bomb) Gecikmesi ve Blok Ödülü Azaltma içeriyordu, burada [Buz Devri](#ice-age) 1 yıl ertelendi ve blok ödülü 5'ten 3 ethere düşürüldü.

<Divider />

## C {#section-c}

### kontrol noktası {#checkpoint}

[İşaret Zinciri](#beacon-chain), yuva (12 saniye) ve dönem (32 yuva) olarak ayrılmış bir tempoya sahiptir. Her dönemdeki ilk yuva bir kontrol noktasıdır. Doğrulayıcıların [süper çoğunluğu](#supermajority), iki kontrol noktası arasındaki bağlantıyı tasdik ettiğinde, bu kontrol noktaları [doğrulanabilir](#justification) ve ardından başka bir kontrol noktası bunlardan sonra doğrulanırsa [kesinleştirilebilirler](#finality).

### derleme {#compiling}

Yüksek seviyeli bir programlama dilinde yazılmış kodu (ör. [Solidity](#solidity)) daha düşük seviyeli bir dile dönüştürme (ör. EVM [bayt kodu](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Akıllı Sözleşmeleri Derleme
</DocLink>

### komite {#committee}

[İşaret Zinciri](#beacon-chain) tarafından rastgele işaret ve parça bloklarına atanan en az 128 [doğrulayıcı](#validator) grubu.

### mutabakat {#consensus}

Çok sayıda düğüm (genellikle ağdaki çoğu düğüm) yerel olarak doğrulanmış en iyi blok zincirlerinde aynı bloklara sahip olduğunda. [Mutabakat kuralları](#consensus-rules) ile karıştırılmamalıdır.

### mutabakat istemcisi {#consensus-client}

Mutabakat istemcileri (Prysm, Teku, Nimbus, Lighthouse, Lodestar gibi) Ethereum'un [hisse ispatı](#pos) mutabakat algoritmasını çalıştırarak ağın İşaret Zincirinin başı hakkında anlaşmaya varmasını sağlar. Mutabakat istemcileri, işlemlerin doğrulanmasına/yayınlanmasına veya durum geçişlerinin yürütülmesine katılmazlar. Bu, [yürütüm istemcileri](#execution-client) tarafından yapılır.

### mutabakat katmanı {#consensus-layer}

Ethereum'un mutabakat katmanı, [mutabakat istemcileri ağıdır](#consensus-client).

### mutabakat kuralları {#consensus-rules}

Diğer düğümlerle mutabakat içinde kalmak için tam düğümlerin izlediği blok doğrulama kuralları. [Mutabakat](#consensus) ile karıştırılmamalıdır.

### Konstantinopolis çatalı {#constantinople-fork}

[Metropolis](#metropolis) aşamasının ikinci kısmı, başlangıçta 2018 ortası için planlandı. Diğer değişikliklerin yanı sıra karma bir [iş ispatı](#pow)/[hisse ispatı](#pos) mutabakat algoritmasına geçişi içermesi bekleniyor.

### sözleşme hesabı {#contract-account}

Başka bir [hesaptan](#account) ([EOA](#eoa) veya [sözleşme](#contract-account)) bir [işlem](#transaction) aldığında yürütülen kodu içeren bir hesap.

### sözleşme oluşturma işlemi {#contract-creation-transaction}

Alıcı olarak [sıfır adres](#zero-address) olan ve bir [sözleşme](#contract-account) kaydetmek ve bunu Ethereum blok zincirine kaydetmek için kullanılan özel bir [işlem](#transaction).

### çapraz bağlantı {#crosslink}

Bir çapraz bağlantı, parçanın durumunun bir özetini sağlar. [Parça](#shard) zincirleri, parçalı [hisse ispatı sisteminde](#proof-of-stake) [İşaret Zinciri](#beacon-chain) aracılığıyla birbirleriyle bu şekilde iletişim kurar.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

<Divider />

## D {#section-d}

### Merkeziyetsiz Otonom Organizasyon (DAO) {#dao}

Hiyerarşik yönetim olmaksızın çalışan bir şirket veya başka bir organizasyon. DAO, 30 Nisan 2016'da başlatılan ve daha sonra Haziran 2016'da saldırıya uğrayan "DAO" adlı bir sözleşmeye de atıfta bulunabilir; bu, sonuçta 1.192.000 blokta bir [sert çatallanmayı](#hard-fork) (kod adı DAO) teşvik etti ve bu, saldırıya uğramış DAO sözleşmesini tersine çevirdi, nihayetinde Ethereum ile Ethereum Classic'in iki rakip sisteme bölünmesine neden oldu.

<DocLink to="/dao/">
  Merkeziyetsiz Otonom Organizasyonlar (DAO'lar)
</DocLink>

### Dapp {#dapp}

Merkeziyetsiz uygulama. En düşük seviyede, bir [akıllı sözleşme](#smart-contract) ve bir web kullanıcı arayüzüdür. Daha geniş anlamda bir Dapp, açık, merkeziyetsiz, eşler arası altyapı hizmetleri üzerine inşa edilmiş bir web uygulamasıdır. Ek olarak birçok Dapp, merkeziyetsiz depolama ve/veya bir mesaj protokolü ve platformu içerir.

<DocLink to="/developers/docs/dapps/">
  Dapps'e giriş
</DocLink>

### merkeziyetsiz borsa (DEX) {#dex}

Ağdaki eşler ile token'ları değiştirmenize olanak tanıyan bir tür [dapp](#dapp). Bunlardan birini kullanmak için [ether](#ether) gerekir ([işlem ücretlerini](#transaction-fee) ödemek için) ancak bunlar merkezileştirilmiş borsalar gibi coğrafi kısıtlamalara tabi değildir: Herkes katılabilir.

<DocLink to="/get-eth/#dex">
  Merkeziyetsiz borsalar
</DocLink>

### telif {#deed}

[Değiştirilemez token (NFT)](#nft) kısmına bakın

### DeFi {#defi}

"Merkeziyetsiz finans"ın kısaltması, herhangi bir aracı olmadan blok zinciri tarafından desteklenen finansal hizmetler sunmayı amaçlayan geniş bir [dapp](#dapp) kategorisidir, internet bağlantısı olan herkes katılabilir.

<DocLink to="/defi/">
  Merkeziyetsiz Finans (DeFi)
</DocLink>

### zorluk {#difficulty}

Bir [iş ispatı](#pow) üretmek için ne kadar hesaplama gerektiğini kontrol eden ağ çapında bir ayar.

### zorluk bombası {#difficulty-bomb}

[iş ispatı](#pow) [zorluk](#difficulty) ayarında planlı üstel artış, [hisse ispatına](#pos) geçişi tevşik etmek için tasarlanmıştır, bu da [çatallanma](#hard-fork) olasılığını azaltır

### dijital imza {#digital-signatures}

Bir kullanıcının [özel anahtar](#private-key) kullanarak bir belge için ürettiği kısa bir veri dizisi. Karşılık gelen [açık anahtar](#public-key), imza ve belgeye sahip olan herkes şunları doğrulayabilir: (1) söz konusu özel anahtarın sahibi tarafından "imzalandığını" ve (2) imzalandıktan sonra belgenin değiştirilmediğini.

<Divider />

## E {#section-e}

### eliptik eğri dijital imza algoritması (ECDSA) {#ecdsa}

Ethereum tarafından fonların yalnızca sahipleri tarafından harcanabilmesini sağlamak için kullanılan bir kriptografik algoritma. Açık ve özel anahtarlar oluşturmak için tercih edilen yöntemdir. Hesap [adresi](#address) oluşturma ve [işlem](#transaction) doğrulaması ile ilgilidir.

### dönem {#epoch}

[İşaret Zinciri](#beacon-chain)-koordineli sistemde 32 [yuvalık](#slot) (6,4 dakika) bir periyot. [Doğrulayıcı](#validator) [komiteleri](#committee), güvenlik nedenleriyle her dönem karıştırılır. Zincirin [kesinleştirilmesi](#finality) için her dönemde bir fırsat vardır.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

### Eth1 {#eth1}

"Eth1", mevcut iş ispatı blok zinciri olan Mainnet Ethereum'a atıfta bulunan bir terimdir. Artık bu terim yerine "yürütüm katmanı" kullanıldığı için kullanımdan kaldırılmıştır. [Bu ad değişikliği hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Ethereum yükseltmeleri hakkında daha fazla bilgi
</DocLink>

### Eth2 {#eth2}

"Eth2", Ethereum'un hisse ispatına geçişi de dahil olmak üzere bir dizi Ethereum protokolü yükseltmesine atıfta bulunan bir terimdir. Artık bu terim yerine "mutabakat katmanı" kullanıldığı için kullanımdan kaldırılmıştır. [Bu ad değişikliği hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Ethereum yükseltmeleri hakkında daha fazla bilgi
</DocLink>

### Ethereum İyileştirme Önerisi (EIP) {#eip}

Önerilen yeni bir özelliği veya süreçlerini veya ortamını açıklayan, Ethereum topluluğuna bilgi sağlayan bir tasarım belgesi (bkz. [ERC](#erc)).

<DocLink to="/eips/">
  EIP'lere giriş
</DocLink>

### Ethereum İsim Servisi (ENS) {#ens}

ENS kaydı, [EIP](#eip) 137'de açıklandığı gibi, alan adlarından sahiplere ve çözümleyicilere eşleştirme sağlayan tek bir merkezi [sözleşmedir](#smart-contract).

[Bkz. ens.domains](https://ens.domains)

### entropi {#entropy}

Kriptografi bağlamında, öngörülebilirlik eksikliği veya rastgelelik düzeyi. [Özel anahtarlar](#private-key) gibi gizli bilgiler üretirken, algoritmalar çıktının tahmin edilemez olmasını sağlamak için genellikle yüksek entropi kaynağına güvenir.

### yürütüm istemcisi {#execution-client}

Besu, Erigon, go-ethereum, Nethermind gibi yürütüm istemcileri (eski adıyla "Eth1 istemcileri"), işlemleri işlemek ve yayınlamakla ve ayrıca Ethereum'un durumunu yönetmekle görevlidir. Protokol kurallarına uyulmasını sağlamak için [Ethereum Sanal Makinesi](#evm)'ndeki her işlem için hesaplamaları çalıştırırlar. Bugün aynı zamanda [iş ispatı](#pow) mutakabatını da ele alıyorlar. [Hisse ispatına](#pos) geçişten sonra, bunu mutabakat istemcilerine devredecekler.

### yürütüm katmanı {#execution-layer}

Ethereum'un yürütüm katmanı, [yürütüm istemcilerinin](#execution-client) ağıdır.

### harici olarak sahiplenilmiş hesap (EOA) {#eoa}

Ethereum ağının insan kullanıcıları tarafından veya onlar için oluşturulmuş bir [hesap](#account).

### Ethereum Yorum Talebi (ERC) {#erc}

Belirli bir Ethereum kullanım standardını tanımlamaya çalışan bazı [EIP'lere](#eip) verilen bir etiket.

<DocLink to="/eips/">
  EIP'lere giriş
</DocLink>

### Ethash {#ethash}

Ethereum 1.0 için [iş ispatı](#pow) algoritması.

[Bkz. eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

İşlemler yürütülürken [gaz](#gas) maliyetlerini kapsayan, Ethereum ekosistemi tarafından kullanılan yerel kripto para birimi. ETH veya Yunanca büyük harfle Xi karakteri olan Ξ sembolü olarak da yazılır.

<DocLink to="/eth/">
  Dijital geleceğimiz için para birimi
</DocLink>

### olaylar {#events}

[EVM](#evm) kayıt olanaklarının kullanımına izin verir. [Dapp'ler](#dapp), olayları dinleyebilir ve bunları kullanıcı arayüzünde JavaScript geri aramalarını tetiklemek için kullanabilir.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Olaylar ve Kayıtlar
</DocLink>

### Ethereum Sanal Makinesi (EVM) {#evm}

[Bayt kodu](#bytecode) yürüten yığın tabanlı bir sanal makine. Ethereum'da yürütüm modeli, bir dizi bayt kodu talimatı ve küçük bir çevresel veri demeti söz konusu olduğunda sistem durumunun nasıl değiştirildiğini belirtir. Bu, bir sanal durum makinesinin resmi modeli aracılığıyla belirtilir.

<DocLink to="/developers/docs/evm/">
  Ethereum Sanal Makinesı
</DocLink>

### EVM derleyici dili {#evm-assembly-language}

İnsan tarafından okunabilir bir EVM [bayt kodu](#bytecode) biçimi.

<Divider />

## F {#section-f}

### fallback fonksiyonu {#fallback-function}

Veri ve beyan edilen işlev adı olmadığı durumlarda çağrılan temel fonksiyon.

### musluk {#faucet}

[Akıllı sözleşme](#smart-contract) aracılığıyla gerçekleştirilen ve bir test ağında kullanılabilen ücretsiz test etheri biçiminde fon dağıtan bir hizmet.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Test Ağı Muslukları
</DocLink>

### kesinlik {#finality}

Kesinlik, belirli bir zamandan önce yapılan bir dizi işlemin değişmeyeceğinin ve geri alınamayacağının garantisidir.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  İş ispatı kesinliği
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Hisse ispatı kesinliği
</DocLink>

### finney {#finney}

[Ether](#ether)'in bir değeri. 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### çatal {#fork}

Madencilik sırasında alternatif bir zincir oluşturulmasına veya iki potansiyel blok yolunda zamansal bir farklılığa neden olan protokol değişikliği.

### çatal-seçim algoritması {#fork-choice-algorithm}

Blok zincirinin başını tanımlamak için kullanılan algoritma. Yürütüm katmanında zincirin başı, arkasında en büyük toplam zorluğa sahip olan parça ile belirlenir. Bu, zincirin gerçek başının, onu çıkarmak için en çok çalışmayı gerektiren baş olduğu anlamına gelir. Mutabakat katmanında algoritma, doğrulayıcılardan toplanan tasdikleri gözlemler ([LMD_GHOST](#lmd-ghost)).

### dolandırıcılık kanıtı {#fraud-proof}

Belirli [katman 2](#layer-2) çözümleri için, hızı artırmak amacıyla işlemlerin gruplar hâlinde [toplandığı](#rollups) ve tek bir işlemde Ethereum'a gönderildiği bir güvenlik modeli. Geçerli oldukları varsayılır, ancak dolandırıcılıktan şüpheleniliyorsa meydan okunabilir. Bir dolandırıcılık kanıtı, dolandırıcılığın gerçekleşip gerçekleşmediğini görmek için işlemi çalıştırır. Bu yöntem, güvenliği korurken mümkün olan işlem miktarını artırır. Bazı [toplamalar](#rollups), [doğruluk ispatlarını](#validity-proof) kullanır.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  İyimser toplamalar
</DocLink>

### frontier {#frontier}

Temmuz 2015'ten Mart 2016'ya kadar süren Ethereum'un ilk test geliştirme aşaması.

<Divider />

## G {#section-g}

### gaz {#gas}

Akıllı sözleşmeleri yürütmek için Ethereum'da kullanılan sanal bir yakıt. [EVM](#evm), gaz tüketimini ölçmek ve bilgi işlem kaynaklarının tüketimini sınırlamak için bir muhasebe mekanizması kullanır (bkz. [Turing tam](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gaz ve Ücretler
</DocLink>

### gaz limiti {#gas-limit}

Bir [işlem](#transaction) veya [bloğun](#block) tüketebileceği maksimum [gaz](#gas) miktarı.

### başlangıç bloğu {#genesis-block}

Belirli bir ağı ve onun kripto parasını başlatmak için kullanılan bir [blok zinciri](#blockchain) içindeki ilk blok.

### geth {#geth}

Go Ethereum. Go ile yazılmış, Ethereum protokolünün en belirgin uygulamalarından biri.

[Bkz. geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei'nin kısaltması; genellikle [gaz](#gas)'ı fiyatlandırmak için kullanılan [ether](#ether) birimi. 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### sert çatal {#hard-fork}

[Blok zincirinde](#blockchain) kalıcı bir farklılık; sert çatallı değişiklik olarak da bilinir. Yükseltilmemiş düğümler, yeni [mutabakat kurallarına](#consensus-rules) uyan yükseltilmiş düğümler tarafından oluşturulan blokları doğrulayamadığında yaygın olarak ortaya çıkar. Çatal, yumuşak çatal, yazılım çatalı veya Git çatalı ile karıştırılmamalıdır.

### hash {#hash}

Bir hash fonksiyonu tarafından üretilen, değişken boyutlu girdinin sabit uzunluktaki parmak izi. (Bkz. [keccak-256](#keccak-256))

### HD cüzdan {#hd-wallet}

Hiyerarşik deterministik (HD) anahtar oluşturma ve aktarma protokolünü kullanan bir [cüzdan](#wallet).

[Bkz. github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD cüzdan tohumu {#hd-wallet-seed}

Bir HD [cüzdan](#wallet) için ana [özel anahtarı](#private-key) ve ana zincir kodunu oluşturmak için kullanılan bir değer. Cüzdan tohumu, insanların özel anahtarları kopyalamasını, yedeklemesini ve geri yüklemesini kolaylaştıran anımsatıcı kelimelerle temsil edilebilir.

### homestead {#homestead}

Ethereum'un ikinci geliştirme aşaması, Mart 2016'da 1.150.000. blokta başlatıldı.

<Divider />

## I {#section-i}

### indeks {#index}

Depolama kaynağına verimli bir yol sağlayarak [blok zinciri](#blockchain) genelinde bilgi sorgulamasını optimize etmeyi amaçlayan bir ağ yapısı.

### Değişimler Arası İstemci Adresi Protokolü (ICAP) {#icap}

Uluslararası Banka Hesap Numarası (IBAN) kodlamasıyla kısmen uyumlu olan ve Ethereum adresleri için çok yönlü, sağlama toplamı ve birlikte çalışabilir bir kodlama sunan bir Ethereum adres kodlamasıdır. ICAP adresleri, yargı yetkisi dışındaki para birimlerinde (örneğin XBT, XRP ve XCP) kullanıldığı gibi, "eXtended Ethereum" (Genişletilmiş Ethereum) anlamına gelen yeni IBAN sözde ülke kodu XE'yi kullanır.

### Buz Devri {#ice-age}

Üstel bir [zorluk](#difficulty) artışı (diğer adıyla [zorluk bombası](#difficulty-bomb)) getirmek için 200.000. blokta Ethereum'un [sert çatallanma yapması](#hard-fork), [hisse ispatına](#pos) geçişi teşvik ediyor.

### tümleşik geliştirme ortamı (IDE) {#ide}

Genellikle bir kod düzenleyici, derleyici, program ve hata ayıklayıcıyı birleştiren bir kullanıcı arayüzü.

<DocLink to="/developers/docs/ides/">
  Tümleşik Geliştirme Ortamları
</DocLink>

### değiştirilemez dağıtılmış kod problemi {#immutable-deployed-code-problem}

Bir [sözleşmenin](#smart-contract) (veya [kütüphanenin](#library)) kodu, dağıtıldığında değişmez hâle gelir. Standart yazılım geliştirme uygulamaları, olası hataları düzeltmeye ve yeni özellikler eklemeye dayanır, bu nedenle bu, akıllı sözleşme geliştirme için bir zorluk teşkil eder.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Akıllı Sözleşmeleri Dağıtma
</DocLink>

### iç işlem {#internal-transaction}

Bir [sözleşme hesabından](#contract-account) başka bir sözleşme hesabına veya [EOA](#eoa)'ya gönderilen [işlem](#transaction) (bkz. [mesaj](#message)).

<Divider />

## K {#section-k}

### anahtar türetme fonksiyonu (KDF) {#kdf}

"Parola genişletme algoritması" olarak da bilinir, [anahtar deposu](#keystore-file) biçimleri tarafından, parola şifrelemesine yönelik kaba kuvvet, sözlük ve gökkuşağı tablosu saldırılarına karşı sürekli olarak parolayı hash ederek koruma sağlamak için kullanılır.

<DocLink to="/developers/docs/smart-contracts/security/">
  Akıllı sözleşme güvenliği
</DocLink>

### keccak-256 {#keccak-256}

Ethereum'da kullanılan kriptografik [hash](#hash) fonksiyonu. Keccak-256, [SHA](#sha)-3 olarak standartlaştırıldı.

### anahtar depolama dosyası {#keystore-file}

Ekstra güvenlik için bir parola ile şifrelenmiş, tek bir (rastgele oluşturulmuş) [özel anahtar](#private-key) içeren JSON kodlu bir dosya.

<Divider />

## L {#section-l}

### katman 2 {#layer-2}

Ethereum protokolünün üstünde katman iyileştirmelerine odaklanan bir geliştirme alanı. Bu iyileştirmeler, [işlem](#transaction) hızları, daha ucuz [işlem ücretleri](#transaction-fee) ve işlem gizliliği ile ilgilidir.

<DocLink to="/developers/docs/scaling/#layer-2-scaling">
  Katman 2
</DocLink>

### LevelDB {#level-db}

Hafif, tek amaçlı bir [kütüphane](#library) olarak uygulanan ve birçok platforma bağlanan açık kaynaklı bir disk üzerinde anahtar-değer deposu.

### kütüphane {#library}

payable fonksiyonları, fallback fonksiyonu ve veri depolaması olmayan özel bir [sözleşme](#smart-contract) türü. Bu nedenle, ether alamaz, tutamaz veya veri depolayamaz. Bir kütüphane, diğer sözleşmelerin salt okunur hesaplama için çağırabileceği önceden konuşlandırılmış kod görevi görür.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Akıllı Sözleşme Kütüphaneleri
</DocLink>

### hafif istemci {#lightweight-client}

[Blok zincirinin](#blockchain) yerel bir kopyasını saklamayan veya bloklar ile [işlemleri](#transaction) doğrulamayan bir Ethereum istemcisi. Bir [cüzdanın](#wallet) fonksiyonlarını sunar ve işlemler oluşturup yayınlayabilir.

<Divider />

### LMD_GHOST {#lmd-ghost}

Ethereum'un mutabakat istemcileri tarafından zincirin başını belirlemek için kullanılan [çatal-seçim algoritması](#fork-choice-algorithm). LMD-GHOST, "Latest Message Driven Greediest Heaviest Observed SubTree" ifadesinin kısaltmasıdır; bu, zincirin başının, tarihindeki en büyük [tasdik](#attestation) birikimine sahip blok olduğu anlamına gelir.

## M {#section-m}

### Mainnet {#mainnet}

"Main network"ün (Ana Ağ) kısaltması olan, ana herkese açık Ethereum [blok zinciridir](#blockchain). Gerçek ETH, gerçek değer ve gerçek sonuçlar. [Katman 2](#layer-2) ölçeklendirme çözümlerini tartışırken katman 1 olarak da bilinir. (Ayrıca bkz. [test ağı](#testnet))

### Merkle Patricia ağacı {#merkle-patricia-tree}

Anahtar-değer çiftlerini verimli bir şekilde depolamak için Ethereum'da kullanılan bir veri yapısı.

### mesaj {#message}

Hiçbir zaman seri hâline getirilmeyen ve yalnızca [EVM](#evm) içinde gönderilen [dâhilî işlem](#internal-transaction).

### mesaj çağrısı {#message-call}

Bir hesaptan diğerine [mesaj](#message) geçirme eylemi. Hedef hesap [EVM](#evm) koduyla ilişkilendirilmişse, sanal makine o nesnenin durumuyla ve iletiye göre hareket edilerek başlatılır.

### Metropolis {#metropolis}

Ekim 2017'de başlatılan Ethereum'un üçüncü geliştirme aşaması.

### madenci {#miner}

Tekrarlanan geçiş hash işlemiyle yeni bloklar için geçerli [iş ispatı](#pow) bulan bir ağ [düğümü](#node) (bkz. [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Madencilik
</DocLink>

### Basım {#mint}

Basmak, yeni token'lar yaratma ve bunları kullanılabilecekleri şekilde dolaşıma sokma sürecidir. Merkezi otoritenin katılımı olmadan yeni bir token oluşturmak için kullanılan merkeziyetsiz bir mekanizmadır.

<Divider />

## N {#section-n}

### ağ {#network}

İşlemleri ve blokları her Ethereum düğümüne (ağ katılımcısı) yayan eşler arası bir ağ olan Ethereum ağına atıfta bulunur.

<DocLink to="/developers/docs/networks/">
  Ağlar
</DocLink>

### değiştirilemez token (NFT) {#nft}

"Telif" olarak da bilinen, ERC-721 teklifi tarafından getirilmiş bir token standardıdır. NFT'ler izlenebilir ve takas edilebilir, ancak her bir token benzersiz ve farklıdır; ETH ve [ERC-20 token'ları](#token-standard) gibi değiştirilemezler. NFT'ler, dijital veya fiziksel varlıkların sahipliğini temsil edebilir.

<DocLink to="/nft/">
  Değiştirilemez Token'lar (NFT'ler)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Değiştirilemez Token Standardı
</DocLink>

### düğüm {#node}

Ağa katılan bir yazılım istemcisi.

<DocLink to="/developers/docs/nodes-and-clients/">
  Düğümler ve İstemciler
</DocLink>

### nonce {#nonce}

Kriptografide, bir değer yalnızca bir kez kullanılabilir. Ethereum'da kullanılan iki tür nonce vardır: hesap nonce'u, her hesapta tekrar saldırılarını önlemek için kullanılan bir işlem sayacıdır; [iş ispatı](#pow) nonce'u, [iş ispatını](#pow) karşılamak için kullanılan bir bloktaki rastgele değerdir.

<Divider />

## O {#section-o}

### ommer (amca) bloğu {#ommer}

Bir [madenci](#miner) geçerli bir [blok](#block) bulduğunda, başka bir madenci önceden blok zincirinin ucuna eklenen rakip bir blok yayınlamış olabilir. Bu geçerli ancak eski blok, daha yeni bloklar tarafından _ommer_ olarak dahil edilebilir ve kısmi blok ödülü alabilir. "Ommer" terimi, bir ebeveyn bloğunun kardeşi için tercih edilen cinsiyetten bağımsız bir terimdir, ancak buna bazen "amca" da denir.

### İyimser toplama {#optimistic-rollup}

[Mainnet](#mainnet) (katman 1) tarafından sağlanan güvenliği kullanırken artan [katman 2](#layer-2) işlem hacmi sunmak için [dolandırıcılık kanıtlarını](#fraud-proof) kullanan işlemlerin [toplanması](#rollups). Benzer bir katman 2 çözümü olan [Plazma](#plasma)'dan farklı olarak, İyimser toplamalar daha karmaşık işlem türlerini işleyebilir: Yani [EVM](#evm)'de mümkün olan her şey. [Sıfır-bilgi toplamalarına](#zk-rollups) kıyasla gecikme sorunları vardır çünkü bir işleme dolandırıcılık kanıtı yoluyla meydan okunabilir.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  İyimser Toplamalar
</DocLink>

### Kâhin {#oracle}

Bir kâhin, [blok zinciri](#blockchain) ile gerçek dünya arasında bir köprüdür. Bilgi için sorgulanabilen ve [akıllı sözleşmelerde](#smart-contract) kullanılabilen zincir üstündeki [API'ler](#api) gibi davranırlar.

<DocLink to="/developers/docs/oracles/">
  Kâhinler
</DocLink>

<Divider />

## P {#section-p}

### eşlik {#parity}

Ethereum istemci yazılımının en belirgin birlikte çalışabilir uygulamalarından biri.

### Plazma {#plasma}

[İyimser toplamalar](#optimistic-rollups) gibi [dolandırıcılık kanıtlarını](#fraud-proof) kullanan zincir dışı bir ölçeklendirme çözümü. Plazma, temel token transferleri ve takasları gibi basit işlemlerle sınırlıdır.

<DocLink to="/developers/docs/scaling/plasma">
  Plazma
</DocLink>

### özel anahtar (gizli anahtar) {#private-key}

Ethereum kullanıcılarının dijital bir imza üreterek bir hesabın veya sözleşmenin sahipliğini kanıtlamasına olanak tanıyan gizli bir numara (bkz. [açık anahtar](#public-key), [adres](#address), [ECDSA](#ecdsa)).

### Hisse ispatı (PoS) {#pos}

Bir kripto para blok zinciri protokolünün dağıtılmış [mutabakata](#consensus) ulaşmayı amaçladığı bir yöntem. PoS, işlemlerin onaylanmasına katılabilmek için kullanıcılardan belirli bir miktarda kripto paranın (ağdaki "stake ettikleri" miktar) sahipliğini kanıtlamalarını ister.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Hisse ispatı
</DocLink>

### İş ispatı (PoW) {#pow}

Bulmak için büyük miktarda hesaplama gerektiren bir veri parçası (ispat). Ethereum'da [madenciler](#miner), ağ çapında bir [zorluk](#difficulty) hedefini karşılayan [Ethash](#ethash) algoritmasına sayısal bir çözüm bulmalıdır.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  İş İspatı
</DocLink>

### açık anahtar {#public-key}

[Özel anahtardan](#private-key) tek yönlü bir işlev aracılığıyla türetilen, herkese açık olarak paylaşılabilen ve ilgili özel anahtarla yapılan dijital imzayı doğrulamak için herkes tarafından kullanılabilen bir sayı.

<Divider />

## R {#section-r}

### makbuz {#receipt}

Belirli bir [işlemin](#transaction) sonucunu temsil etmek için bir Ethereum istemcisi tarafından döndürülen veriler, işlemin [hash](#hash)kayıtlarını, [blok](#block) numarasını, kullanılan [gaz](#gas) miktarını ve bir [akıllı sözleşmenin](#smart-contract) uygulanması durumunda, sözleşmenin [adresi](#address)ni tutar.

### yeniden giriş saldırısı {#re-entrancy-attack}

Bir saldırgan sözleşmenin, yürütüm sırasında kurbanın sözleşmesini yinelemeli olarak yeniden çağırmasını sağlayacak şekilde bir kurban sözleşmesi fonksiyonu içeren bir saldırıdır. Örneğin bu, mağdur sözleşmesinin bakiyeleri güncelleyen veya para çekme miktarlarını sayan kısımlarını atlayarak fonların çalınmasıyla sonuçlanabilir.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Yeniden giriş
</DocLink>

### ödül {#reward}

Ağ tarafından [iş ispatı](#pow) çözümünü bulan [madenciye](#miner) ödül olarak verilen, her yeni bloğa eklenen bir miktar ether.

### Tekrarlamalı Uzunluk Öneki (RLP) {#rlp}

Ethereum geliştiricileri tarafından rastgele karmaşıklık ve uzunluktaki nesneleri (veri yapılarını) kodlamak ve seri hâle getirmek için tasarlanmış bir kodlama standardı.

### toplamalar {#rollups}

Birden çok işlemi gruplandıran ve bunları tek bir işlemde [Ethereum ana zincirine](#mainnet) gönderen bir tür [katman 2](#layer-2) ölçeklendirme çözümü. Bu, [gaz](#gas) maliyetlerinde azalmaya ve [işlem](#transaction) çıktısında artışa olanak tanır. Bu ölçeklenebilirlik kazanımlarını sunmak için farklı güvenlik yöntemleri kullanan İyimser ve Sıfır-bilgi toplamaları bulunur.

<DocLink to="/developers/docs/scaling/#rollups">
  Toplamalar
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Daha önce "Ethereum 2.0" veya "Eth2" olarak bilinen bir dizi ölçeklendirme ve sürdürülebilirlik yükseltmesini başlatan Ethereum geliştirme aşaması.

<DocLink to="/upgrades/">
  Ethereum yükseltmeleri
</DocLink>

### Güvenli Hash Algoritması (SHA) {#sha}

Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) tarafından yayınlanan bir kriptografik hash fonksiyonları ailesi.

### parça / parça zinciri {#shard}

[İşaret Zinciri](#beacon-chain) tarafından koordine edilen ve [doğrulayıcılar](#validator) tarafından güvence altına alınan bir [hisse ispatı](#pos) zinciri. Parça zinciri yükseltmesinin bir parçası olarak ağa 64 tanesi eklenecektir. Parça zincirleri, [katman 2](#layer-2) çözümlerine [iyimser toplamalar](#optimistic-rollups) ve [ZK-toplamaları](#zk-rollups) gibi ek veriler sağlayarak Ethereum için artan işlem hacmi sunacak.

<DocLink to="/upgrades/sharding">
  Parça zincirleri
</DocLink>

### yan zincir {#sidechain}

Farklı, genellikle daha hızlı [mutabakat kurallarına](#consensus-rules) sahip ayrı bir zincir kullanan bir ölçeklendirme çözümü. Bu yan zincirleri [Mainnet](#mainnet)'e bağlamak için bir köprü gereklidir. [Toplamalar](#rollups) da yan zincirler kullanır, ancak bunun yerine [Mainnet](#mainnet) ile iş birliği içinde çalışırlar.

<DocLink to="/developers/docs/scaling/sidechains/">
  Yan zincirler
</DocLink>

### singleton {#singleton}

Yalnızca tek bir örneğinin bulunabileceği bir nesneyi tanımlayan bir bilgisayar programlama terimi.

### yuva {#slot}

Yeni bir [İşaret Zinciri](#beacon-chain) ve [parça](#shard) zinciri bloğunun [doğrulayıcı](#validator) tarafından [hisse ispatı](#pos) sistemi içinde önerilebileceği bir süre (12 saniye). Bir yuva boş olabilir. 32 yuva bir [dönem](#epoch) oluşturur.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Hisse ispatı
</DocLink>

### akıllı sözleşme {#smart-contract}

Ethereum bilgi işlem altyapısında çalışan bir program.

<DocLink to="/developers/docs/smart-contracts/">
  Akıllı Sözleşmelere Giriş
</DocLink>

### SNARK {#snark}

"Succinct non-interactive argument of knowledge"ın (Öz ve interaktif olmayan bilgi argümanı) kısaltması olan SNARK, bir tür [sıfır-bilgi ispatıdır](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### Solidity {#solidity}

JavaScript, C++ veya Java'ya benzer söz dizimine sahip prosedürel (zorunlu) bir programlama dili. Ethereum [akıllı sözleşmeleri](#smart-contract) için en popüler ve en sık kullanılan dil. Dr. Gavin Wood tarafından yaratıldı.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity sıralı derleyicisi {#solidity-inline-assembly}

Bir [Solidity](#solidity) programında [EVM](#evm) derleme dili. Solidity'nin satır içi derleme desteği, belirli işlemleri yazmayı kolaylaştırır.

### Spurious Dragon {#spurious-dragon}

Daha fazla hizmet reddi saldırı vektörü ve net durumu ele almak için 2.675.000. blokta meydana gelen Ethereum blok zincirinin bir [sert çatalı](#hard-fork) (bkz. [Tangerine Whistle](#tangerine-whistle)). Ayrıca, bir tekrar saldırı koruma mekanizması (bkz. [nonce](#nonce)).

### sabit para {#stablecoin}

Değeri başka bir varlığın değerine sabitlenmiş bir [ERC-20 token'ı](#token-standard). Dolar gibi fiat para birimi, altın gibi değerli metaller ve Bitcoin gibi diğer kripto paralar tarafından desteklenen sabit paralar vardır.

<DocLink to="/eth/#tokens">
  ETH, Ethereum'daki tek kripto değildir
</DocLink>

### stake etme {#staking}

Doğrulayıcı olmak ve [ağı](#network) güvence altına almak için bir miktar [ether](#ether) (stake ettiğiniz miktar) yatırmak. Doğrulayıcı, [işlemleri](#transaction) kontrol eder ve bir [hisse ispatı](#pos) mutabakat modeli altında [bloklar](#block) önerir. Stake etme, ağın çıkarları doğrultusunda hareket etmeniz için size ekonomik bir teşvik sağlar. [Doğrulayıcı](#validator) görevlerinizi yerine getirdiğiniz için ödüller alacaksınız, ancak yapmazsanız değişen miktarlarda ETH kaybedeceksiniz.

<DocLink to="/staking/">
  Ethereum doğrulayıcısı olmak için ETH'nizi stake edin
</DocLink>

### STARK {#stark}

"Scalable transparent argument of knowledge"ın (Ölçeklenebilir şeffaf bilgi argümanı) kısaltması olan STARK, bir tür [sıfır-bilgi ispatıdır](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### durum kanalları {#state-channels}

Katılımcılar arasında özgürce ve ucuza işlem yapabilecekleri bir kanalın kurulduğu bir [katman 2](#layer-2) çözümü. [Mainnet](#mainnet)'e yalnızca kanalı kurmak ve kanalı kapatmak için bir [işlem](#transaction) gönderilir. Bu, çok yüksek işlem hacmine izin verir ancak katılımcı sayısının önceden bilinmesine ve fonların kilitlenmesine dayanır.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Durum kanalları
</DocLink>

### süper çoğunluk {#supermajority}

Süper çoğunluk, [İşaret Zincirinde toplamda stake edilen etherin 2/3'ünü (%66) aşan bir miktar için kullanılan terimdir](#beacon-chain). İşaret Zincirinde blokların [kesinleştirilmesi](#finality) için bir süper çoğunluk oyu gereklidir.

### senkronizasyon komitesi {#sync-committee}

Senkronizasyon komitesi, [İşaret Zinciri](#beacon-chain) üzerinde ortalama her 27 saatte bir yenilenen rastgele seçilmiş [doğrulayıcılar](#validator) grubudur. Amaçları, imzalarını geçerli blok başlıklarına eklemektir. Senkronizasyon komiteleri, [hafif istemcilerin](#lightweight-client) tüm doğrulayıcı setine erişmek zorunda kalmadan blok zincirinin başını takip etmesine olanak tanır.

### szabo {#szabo}

[Ether](#ether)'in bir değeri. 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Belirli G/Ç (Girdi/Çıktı) yoğun işlemler için [gaz](#gas) hesaplamasını değiştirmek ve bu işlemlerin düşük gaz maliyetini suistimal eden bir hizmet reddi saldırısının birikmiş durumunu temizlemek için 2.463.000. blokta meydana gelmiş bir Ethereum [sert çatalı](#hard-fork).

### testnet {#testnet}

"Test network"ün (Test ağı) kısaltması, ana Ethereum ağının (bkz. [Mainnet](#mainnet)). davranışını simüle etmek için kullanılan bir ağ.

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Test Ağları
</DocLink>

### token standardı {#token-standard}

ERC-20 teklifiyle sunulan bu standart, değiştirilebilir token'lar için standartlaştırılmış bir [akıllı sözleşme](#smart-contract) yapısı sağlar. [NFT'lerin](#nft) aksine, aynı sözleşmeye ait token'lar izlenebilir, takas edilebilir ve değiştirilebilir.

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20 Token Standardı
</DocLink>

### işlem {#transaction}

Belirli bir [adresi](#address) hedefleyen, başlangıç [hesabı](#account) tarafından imzalanan Ethereum Blok Zincirine taahhüt edilen veriler. İşlem, söz konusu işlem için [gaz sınırı](#gas-limit) gibi meta verileri içerir.

<DocLink to="/developers/docs/transactions/">
  İşlemler
</DocLink>

### işlem ücreti {#transaction-fee}

Ethereum ağını her kullandığınızda ödemeniz gereken bir ücret. [Cüzdanınızdan](#wallet) para gönderme veya token takası ile koleksiyon öğesi satın alma gibi bir [dapp](#dapp) etkileşimi buna örnek gösterilebilir. Bunu bir hizmet bedeli gibi düşünebilirsiniz. Bu ücret, ağın ne kadar meşgul olduğuna bağlı olarak değişecektir. Bunun nedeni, işleminizi gerçekleştirmekten sorumlu kişiler olan [madencilerin](#miner) daha yüksek ücretli işlemlere öncelik vermesidir: Bu nedenle tıkanıklık, fiyatı yukarı çeker.

Teknik düzeyde işlem ücretiniz, işleminizin ne kadar [gaz](#gas) gerektirdiğiyle ilgilidir.

İşlem ücretlerinin düşürülmesi şu sıralar yoğun ilgi gören bir konudur. Bkz. [Katman 2](#layer-2)

### Turing tam {#turing-complete}

İsmini İngiliz matematikçi ve bilgisayar bilimcisi Alan Turing'den alan bir veri işleme kuralları sistemi olan (bir bilgisayarın komut seti, programlama dili veya hücresel otomasyon gibi) bu kavram, eğer herhangi bir Turing makinesini simüle etmek için kullanılabilirse, bunun "Turing tam" veya "hesaplama açısından evrensel" olduğu söylenir.

<Divider />

## V {#section-v}

### doğrulayıcı {#validator}

Verileri depolamaktan, işlemleri işlemekten ve blok zincirine yeni bloklar eklemekten sorumlu [hisse ispatı](#pos) sistemindeki bir [düğüm](#node). Doğrulayıcı yazılımı etkinleştirmek için 32 ETH'yi [stake edebilmeniz](#staking) gerekir.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Hisse ispatı
</DocLink>
<DocLink to="/staking/">
  Ethereum'da stake etme
</DocLink>

### Doğruluk ispatı {#validity-proof}

Belirli [katman 2](#layer-2) çözümleri için, hızı artırmak için işlemlerin gruplar halinde [toplandığı](/#rollups) ve tek bir işlemde Ethereum'a gönderildiği bir güvenlik modeli. İşlem hesaplaması zincir dışında yapılır ve daha sonra doğruluklarının bir ispatı ile ana zincire sağlanır. Bu yöntem, güvenliği korurken mümkün olan işlem miktarını artırır. Bazı [toplamalar](#rollups), [dolandırıcılık kanıtlarını](#fraud-proof) kullanır.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### Validium {#validium}

İşlem hacmini iyileştirmek için [doğruluk ispatlarını](#validity-proof) kullanan zincir dışı bir çözüm. [Sıfır-bilgi toplamalarının](#zk-rollup) aksine, Validium verileri katman 1 [Mainnet](#mainnet)'te depolanmaz.

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

[Özel anahtar](#private-key)ları tutan yazılım. Ethereum [hesaplarına](#account) erişmek ve kontrol etmek ve [akıllı sözleşmelerle](#smart-contract) etkileşim kurmak için kullanılır. Anahtarların bir cüzdanda saklanması gerekmez ve geliştirilmiş güvenlik için çevrimdışı depolamadan (yani bir hafıza kartı veya kağıttan) alınabilir. İsmine rağmen, cüzdanlar asla gerçek paraları veya token'ları saklamaz.

<DocLink to="/wallets/">
  Ethereum Cüzdanları
</DocLink>

### Web3 {#web3}

Web'in üçüncü versiyonu. İlk olarak Dr. Gavin Wood tarafından önerilen Web3, merkezi olarak sahip olunan ve yönetilen uygulamalardan merkezi olmayan protokoller üzerine kurulu uygulamalara kadar web uygulamaları için yeni bir vizyonu ve odağı temsil eder (bkz. [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 ve Web3
</DocLink>

### wei {#wei}

[Ether](#ether)'in en küçük değeri. 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### sıfır adres {#zero-address}

Bir [sözleşme oluşturma işleminin](#contract-creation-transaction) hedef adresi olarak belirtilen, tamamen sıfırlardan oluşan özel bir Ethereum adresi.

### Sıfır-bilgi ispatı {#zk-proof}

Sıfır-bilgi ispatı, bir kişinin herhangi bir ek bilgi aktarmadan bir ifadenin doğru olduğunu kanıtlamasına izin veren kriptografik bir yöntemdir.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi toplamaları
</DocLink>

### Sıfır-bilgi toplaması {#zk-rollup}

[Mainnet](#mainnet) (katman 1) tarafından sağlanan güvenliği kullanırken artan [katman 2](#layer-2) işlem hacmi sunmak için [doğruluk ispatlarını](#validity-proof) kullanan işlemlerin [toplanması](#rollups). [İyimser toplamalar](#optimistic-rollups) gibi karmaşık işlem türlerini işleyemeseler de, işlemler gönderildiklerinde kanıtlanabilir şekilde geçerli olduklarından gecikme sorunları yaşamazlar.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Sıfır-bilgi Toplamaları
</DocLink>

<Divider />

## Kaynaklar {#sources}

_CC-BY-SA kapsamında bir kısmı [Andreas M. Antonopoulos ve Gavin Wood](https://ethereumbook.info)'un [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) eserinden sağlanmıştır_

<Divider />

## Bu sayfaya katkıda bulunun {#contribute-to-this-page}

Gözden kaçırdığımız bir şey mi var? Yanlış bir şey mi var? GitHub'daki bu sözlüğe katkıda bulunarak gelişmemize yardımcı olun!

[Nasıl katkıda bulunacağınız hakkında daha fazla bilgi edinin](/contributing/adding-glossary-terms)
