---
title: Blokzincir Veri Depolama Stratejileri
description: "Blokzincir kullanarak veri depolamanın birkaç yolu vardır. Bu makale, farklı stratejileri, bunların maliyetlerini ve ödünleşimlerini ve ayrıca güvenli bir şekilde kullanmak için gerekenleri karşılaştıracaktır."
lang: tr
---

Bilgileri doğrudan blokzincir üzerinde veya blokzincir tarafından güvence altına alınacak şekilde depolamanın birden fazla yolu vardır:

- EIP-4844 blob'ları
- Çağrı verisi
- Katman 1 (L1) mekanizmalarıyla zincir dışı
- Sözleşme "kodu"
- Olaylar
- EVM depolaması

Hangi yöntemin kullanılacağının seçimi birkaç kritere dayanır:

- Bilginin kaynağı. Çağrı verisindeki bilgiler doğrudan blokzincirin kendisinden gelemez.
- Bilginin hedefi. Çağrı verisi yalnızca onu içeren işlemde mevcuttur. Olaylara zincir içi olarak hiçbir şekilde erişilemez.
- Ne kadar zorluk kabul edilebilir? Tam ölçekli bir düğüm çalıştıran bilgisayarlar, tarayıcıda çalışan bir uygulamadaki hafif istemciden daha fazla işlem gerçekleştirebilir.
- Bilgiye her düğümden kolay erişimi kolaylaştırmak gerekli mi?
- Güvenlik gereksinimleri.

## Güvenlik gereksinimleri {#security-requirements}

Genel olarak, bilgi güvenliği üç özellikten oluşur:

- _Gizlilik_, yetkisiz varlıkların bilgileri okumasına izin verilmez. Bu birçok durumda önemlidir, ancak burada değil. _Blokzincirde sır yoktur_. Blokzincirler, herkesin durum geçişlerini doğrulayabilmesi sayesinde çalışır, bu nedenle onları doğrudan sırları depolamak için kullanmak imkansızdır. Blokzincirde gizli bilgileri depolamanın yolları vardır, ancak bunların hepsi en azından bir anahtar depolamak için bazı zincir dışı bileşenlere dayanır.

- _Bütünlük_, bilgi doğrudur, yetkisiz varlıklar tarafından veya yetkisiz yollarla değiştirilemez (örneğin, bir `Transfer` olayı olmadan [ERC-20 token'larını](https://eips.ethereum.org/EIPS/eip-20#events) transfer etmek). Blokzincirde, her düğüm her durum değişikliğini doğrular, bu da bütünlüğü sağlar.

- _Erişilebilirlik_, bilgi yetkili herhangi bir varlık için mevcuttur. Blokzincirde bu, genellikle bilginin her [tam düğümde](https://ethereum.org/developers/docs/nodes-and-clients/#full-node) mevcut olmasıyla elde edilir.

Buradaki farklı çözümlerin tümü mükemmel bütünlüğe sahiptir, çünkü hash'ler L1'de yayınlanır. Ancak, farklı erişilebilirlik garantilerine sahiptirler.

## Ön koşullar {#prerequisites}

[Blokzincir temellerini](/developers/docs/intro-to-ethereum/) iyi anlamış olmalısınız. Bu sayfa ayrıca okuyucunun [bloklara](/developers/docs/blocks/), [işlemlere](/developers/docs/transactions/) ve diğer ilgili konulara aşina olduğunu varsayar.

## EIP-4844 blob'ları {#eip-4844-blobs}

[Dencun sert çatallanmasıyla (hardfork)](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md) başlayarak Ethereum blokzinciri, Ethereum'a sınırlı bir ömre (başlangıçta yaklaşık [18 gün](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)) sahip veri blob'ları ekleyen [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)'ü içerir. Bu blob'lar, benzer bir mekanizma kullanmalarına rağmen [yürütme gazından](/developers/docs/gas) ayrı olarak fiyatlandırılır. Geçici verileri yayınlamanın ucuz bir yoludur.

EIP-4844 blob'larının ana kullanım durumu, toplamaların işlemlerini yayınlaması içindir. [İyimser rollup'ların](/developers/docs/scaling/optimistic-rollups) işlemleri kendi blokzincirlerinde yayınlaması gerekir. Bu işlemler, rollup'ın [sıralayıcısı](https://docs.optimism.io/connect/resources/glossary#sequencer) yanlış bir durum kökü yayınlarsa [doğrulayıcıların](https://docs.optimism.io/connect/resources/glossary#validator) hatayı düzeltmesini sağlamak için [itiraz süresi](https://docs.optimism.io/connect/resources/glossary#challenge-period) boyunca herkesin erişimine açık olmalıdır.

Ancak, itiraz süresi geçtikten ve durum kökü kesinleşmiş olduktan sonra, bu işlemleri bilmenin geriye kalan amacı zincirin mevcut durumunu kopyalamaktır. Bu durum, çok daha az işlem gerektirerek zincir düğümlerinden de elde edilebilir. Bu nedenle işlem bilgileri [blok gezginleri](/developers/docs/data-and-analytics/block-explorers) gibi birkaç yerde hala korunmalıdır, ancak Ethereum'un sağladığı sansür direnci seviyesi için ödeme yapmaya gerek yoktur.

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/#data-availability) da diğer düğümlerin mevcut durumu kopyalamasını ve geçerlilik kanıtlarını doğrulamasını sağlamak için işlem verilerini yayınlar, ancak bu yine kısa vadeli bir gereksinimdir.

Yazının yazıldığı sırada EIP-4844'te yayın yapmanın maliyeti bayt başına bir Wei'dir (10<sup>-18</sup> ETH), bu da [blob'ları yayınlayanlar da dahil olmak üzere herhangi bir işlemin maliyeti olan 21.000 yürütme gazına](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index) kıyasla ihmal edilebilir düzeydedir. Mevcut EIP-4844 fiyatını [blobscan.com](https://blobscan.com/blocks) adresinde görebilirsiniz.

İşte bazı ünlü toplamalar tarafından yayınlanan blob'ları görebileceğiniz adresler.

| Rollup                               | Posta kutusu adresi                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Çağrı verisi {#calldata}

Çağrı verisi, işlemin bir parçası olarak gönderilen baytları ifade eder. O işlemi içeren blokta, blokzincirin kalıcı kaydının bir parçası olarak saklanır.

Bu, verileri blokzincire kalıcı olarak koymanın en ucuz yöntemidir. Bayt başına maliyet 4 yürütme gazı (bayt sıfırsa) veya 16 gazdır (diğer herhangi bir değer). Veriler sıkıştırılmışsa (ki bu standart bir uygulamadır), her bayt değerinin olasılığı eşittir, bu nedenle ortalama maliyet bayt başına yaklaşık 15,95 gazdır.

Yazının yazıldığı sırada fiyatlar 12 Gwei/gaz ve 2300 $/ETH'dir, bu da maliyetin kilobayt başına yaklaşık 45 sent olduğu anlamına gelir. EIP-4844'ten önce en ucuz yöntem bu olduğu için, toplamaların [hata itirazları](https://docs.optimism.io/stack/protocol/overview#fault-proofs) için erişilebilir olması gereken ancak doğrudan zincir içi erişilebilir olması gerekmeyen işlem bilgilerini depolamak için kullandığı yöntem buydu.

İşte bazı ünlü toplamalar tarafından yayınlanan işlemleri görebileceğiniz adresler.

| Rollup                               | Posta kutusu adresi                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Katman 1 (L1) mekanizmalarıyla zincir dışı {#offchain-with-l1-mechs}

Güvenlik ödünleşimlerinize bağlı olarak, bilgileri başka bir yere koymak ve gerektiğinde verilerin kullanılabilir olmasını sağlayan bir mekanizma kullanmak kabul edilebilir olabilir. Bunun çalışması için iki gereksinim vardır:

1. Blokzincirde verilerin _girdi taahhüdü_ adı verilen bir [hash'ini](https://en.wikipedia.org/wiki/Cryptographic_hash_function) yayınlayın. Bu tek bir 32 baytlık kelime olabilir, bu nedenle pahalı değildir. Girdi taahhüdü mevcut olduğu sürece bütünlük sağlanır çünkü aynı değere hash'lenecek başka bir veri bulmak mümkün değildir. Bu nedenle yanlış veri sağlanırsa tespit edilebilir.

2. Erişilebilirliği sağlayan bir mekanizmaya sahip olun. Örneğin, [Redstone](https://redstone.xyz/docs/what-is-redstone)'da herhangi bir düğüm bir erişilebilirlik itirazı sunabilir. Sıralayıcı son tarihe kadar zincir içi yanıt vermezse, girdi taahhüdü atılır, bu nedenle bilginin hiç yayınlanmadığı kabul edilir.

Bu, iyimser bir rollup için kabul edilebilirdir çünkü durum kökü için zaten en az bir dürüst doğrulayıcıya sahip olmaya güveniyoruz. Böyle dürüst bir doğrulayıcı, blokları işlemek için verilere sahip olduğundan da emin olacak ve bilgi zincir dışı mevcut değilse bir erişilebilirlik itirazı yayınlayacaktır. Bu tür iyimser rollup'a [Plasma](/developers/docs/scaling/plasma/) denir.

## Sözleşme kodu {#contract-code}

Yalnızca bir kez yazılması gereken, üzerine asla yazılmayan ve zincir içi erişilebilir olması gereken bilgiler sözleşme kodu olarak saklanabilir. Bu, verilerle bir "akıllı sözleşme" oluşturduğumuz ve ardından bilgileri okumak için [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) kullandığımız anlamına gelir. Avantajı, kod kopyalamanın nispeten ucuz olmasıdır.

Bellek genişletme maliyeti dışında, `EXTCODECOPY` bir sözleşmeye ilk erişim için ("soğuk" olduğunda) 2600 gaz ve aynı sözleşmeden sonraki kopyalar için 100 gaz artı 32 baytlık kelime başına 3 gaz maliyetindedir. Bayt başına 15,95 maliyeti olan çağrı verisiyle karşılaştırıldığında, bu yaklaşık 200 bayttan itibaren daha ucuzdur. [Bellek genişletme maliyetleri formülüne](https://www.evm.codes/about#memoryexpansion) dayanarak, 4 MB'tan fazla belleğe ihtiyacınız olmadığı sürece, bellek genişletme maliyeti çağrı verisi ekleme maliyetinden daha küçüktür.

Elbette bu sadece verileri _okumanın_ maliyetidir. Sözleşmeyi oluşturmak yaklaşık 32.000 gaz + 200 gaz/bayt maliyetindedir. Bu yöntem yalnızca aynı bilginin farklı işlemlerde birçok kez okunması gerektiğinde ekonomiktir.

Sözleşme kodu, `0xEF` ile başlamadığı sürece anlamsız olabilir. `0xEF` ile başlayan sözleşmeler, çok daha katı gereksinimleri olan [Ethereum nesne formatı](https://notes.ethereum.org/@ipsilon/evm-object-format-overview) olarak yorumlanır.

## Olaylar {#events}

[Olaylar](https://docs.alchemy.com/docs/solidity-events) akıllı sözleşmeler tarafından yayınlanır ve zincir dışı yazılımlar tarafından okunur.
Avantajları, zincir dışı kodun olayları dinleyebilmesidir. Maliyeti [gazdır](https://www.evm.codes/#a0?fork=cancun), 375 artı veri baytı başına 8 gaz. 12 Gwei/gaz ve 2300 $/ETH'de bu, bir sent artı kilobayt başına 22 sente karşılık gelir.

## Depolama {#storage}

Akıllı sözleşmelerin [kalıcı depolamaya](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory) erişimi vardır. Ancak bu çok pahalıdır. Daha önce boş olan bir depolama slotuna 32 baytlık bir kelime yazmak [22.100 gaza mal olabilir](https://www.evm.codes/#55?fork=cancun). 12 Gwei/gaz ve 2300 $/ETH'de bu, yazma işlemi başına yaklaşık 61 sent veya kilobayt başına 19,5 $'dır.

Bu, Ethereum'daki en pahalı depolama biçimidir.

## Özet {#summary}

Bu tablo farklı seçenekleri, bunların avantajlarını ve dezavantajlarını özetlemektedir.

| Depolama türü               | Veri kaynağı        | Erişilebilirlik garantisi                                                                                                          | Zincir içi erişilebilirlik                                       | Ek sınırlamalar                                                         |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| EIP-4844 blob'ları          | Zincir dışı         | [\~18 gün](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) için Ethereum garantisi | Yalnızca hash mevcuttur                                          |                                                                         |
| Çağrı verisi                | Zincir dışı         | Sonsuza kadar Ethereum garantisi (blokzincirin bir parçası)                                                                        | Yalnızca bir sözleşmeye yazılmışsa ve o işlemde mevcuttur        |                                                                         |
| Katman 1 (L1) mekanizmalarıyla zincir dışı | Zincir dışı         | İtiraz süresi boyunca "bir dürüst doğrulayıcı" garantisi                                                                           | Yalnızca hash                                                    | İtiraz mekanizması tarafından garanti edilir, yalnızca itiraz süresi boyunca |
| Sözleşme kodu               | Zincir içi veya zincir dışı | Sonsuza kadar Ethereum garantisi (blokzincirin bir parçası)                                                                        | Evet                                                             | "Rastgele" bir adrese yazılır, `0xEF` ile başlayamaz    |
| Olaylar                     | Zincir içi          | Sonsuza kadar Ethereum garantisi (blokzincirin bir parçası)                                                                        | Hayır                                                            |                                                                         |
| Depolama                    | Zincir içi          | Sonsuza kadar Ethereum garantisi (blokzincirin ve üzerine yazılana kadar mevcut durumun bir parçası)                               | Evet                                                             |                                                                         |