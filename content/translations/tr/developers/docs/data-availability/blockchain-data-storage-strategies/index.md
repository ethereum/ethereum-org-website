---
title: Blokzincir Veri Depolama Stratejileri
description: Blokzincir kullanarak veri dopalamanın birçok yolu vardır. Bu makalede farklı stratejiler, bu stratejilerin maliyetleri, artıları ve eksileri ve bu stratejileri güvenli bir şekilde kullanmak için gerekenler karşılaştırılacaktır.
lang: tr
---

Blokzincirde ya da blokzincir tarafından güvence altına alınan bir şekilde bilgi depolamanın birçok yolu vardır:

- EIP-4844 blob'ları
- Calldata
- L1 mekanizmalarıyla zincir dışında
- Sözleşme "kodu"
- Olaylar
- EVM depolaması

Hangi yöntemin kullanılacağı çeşitli ölçütlere bağlıdır:

- Bilginin kaynağı. Calldata'daki bilgi direkt olarak blokzincirin kendisinden gelemez.
- Bilginin varış noktası. Calldata yalnızca başlattığı işlemde kullanılabilir. Olaylar zincir üstünde hiçbir zaman erişilebilir değildir.
- Ne kadar zorluğa katlanılabilir? Tam ölçekli bir düğüm çalıştıran bilgisayarlar, tarayıcıda çalışan bir uygulamada hafif bir istemciden daha fazla işlem gerçekleştirebilir.
- Bilgiye her düğümden kolayca ulaşılabilmesi gerekli midir?
- Güvenlik gereklilikleri.

## Güvenlik gereklilikleri {#security-requirements}

Bilgi güvenliği genel olarak üç özellikten oluşur:

- _Gizlilik_, yetkisi olmayan kişilerin bilgileri okumasına izin verilmez. Bu çoğu durumda önemlidir, ama burada değil. _Blokzincirde sır yoktur_. Blokzincirler, durum geçişlerini herkes doğrulayabildiği için işe yarar; dolayısıyla onları sırları doğrudan depolamak için kullanmak imkânsızdır. Gizli bilgileri blokzincirde saklamanın çeşitli yolları olsa da, bu yolların tümü en azından bir anahtarı saklamak için zincir dışında bir bileşene ihtiyaç duyar.

- _Bütünlük_, bilgi doğrudur, yetkisiz kişiler tarafından, ya da yetkisiz yollarla değiştirilemez (örneğin bir `Transfer` olayı olmadan [ERC-20 jetonlarını](https://eips.ethereum.org/EIPS/eip-20#events) transfer etmek gibi). Blokzincirde her düğüm her durum değişikliğini doğrular, bu da bütünlüğü sağlar.

- _Erişilebilirlik_, bilgiye yetkisi olan herkes tarafından erişilebilir. Blokzincirde bu genellikle her [tam düğümde](https://ethereum.org/developers/docs/nodes-and-clients#full-node) bilginin mevcut olmasıyla sağlanır.

Karmalar L1'e gönderildiği için buradaki farklı çözümlerin hepsi mükemmel bütünlüğe sahiptir. Fakat bunların farklı kullanılabilirlik garantileri vardır.

## Ön Koşullar {#prerequisites}

[Blokzincirin temellerini](/developers/docs/intro-to-ethereum/) iyi anlamış olmanız gerekir. Bu sayfa okuyucunun ayrıca [bloklar](/developers/docs/blocks/), [işlemler](/developers/docs/transactions/) ve ilgili diğer konulara da aşina olduğunu varsayar.

## EIP-4844 blob'ları {#eip-4844-blobs}

[Dencun sert çatallanmasından](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) itibaren Ethereum blokzinciri, Ethereum veri blob'larına sınırlı bir kullanım ömrü (başlangıçta yaklaşık [18 gün](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)) ekleyen [EIP-4844'ü](https://eips.ethereum.org/EIPS/eip-4844) içerir. Bu blob'lar, benzer bir mekanizma kullanmalarına rağmen [yürütüm gazından](/developers/docs/gas) ayrı olarak fiyatlandırılır. Blob'lar geçici veri göndermenin ucuz bir yoludur.

EIP-4844 blob'larının temel kullanım alanı, toplamaların işlemlerini yayınlamasıdır. [İyimser toplamaların](/developers/docs/scaling/optimistic-rollups) işlemleri kendi blokzincirlerinde yayımlaması gerekir. Bu işlemler, toplamanın [sıralayıcısının](https://docs.optimism.io/connect/resources/glossary#challenge-period) hatalı bir durum kökü göndermesi halinde [doğrulayıcıların](https://docs.optimism.io/connect/resources/glossary#validator) hatayı düzeltmelerini mümkün kılmak için [itiraz süresi](https://docs.optimism.io/connect/resources/glossary#challenge-period) boyunca herkese açık olmalıdır.

Bununla birlikte, itiraz süresi geçtikten ve durum kökü kesinleştirildikten sonra bu işlemleri bilmenin tek amacı, zincirin mevcut durumunu kopyalamaktır. Bu durum, çok daha az işleme gerektiren zincir düğümlerinden de alınabilir. Bu nedenle işlem bilgileri yine de [blok arayıcıları](/developers/docs/data-and-analytics/block-explorers) gibi birkaç yerde saklanmalıdır ancak Ethereum'un sunduğu sansür direnci seviyesi için ödeme yapmaya gerek yoktur.

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/#data-availability), diğer düğümlerin mevcut durumu çoğaltmasını ve doğruluk kanıtlarını doğrulamasını sağlamak için işlem verilerini de yayınlar ancak bu yine kısa vadeli bir gerekliliktir.

EIP-4844'te yazım gönderimi, bayt başına bir wei'ye (10<sup>-18</sup> ETH) mal olur; bu da [blob gönderme işlemi de dahil olmak üzere herhangi bir işlemin maliyeti olan 21.000 yürütüm gazına](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index) kıyasla ihmal edilebilir düzeydedir. Güncel EIP-4844 fiyatını [blobscan.com](https://blobscan.com/blocks) adresinden görebilirsiniz.

İşte bazı ünlü toplamaların gönderdiği blob'ları görebileceğiniz adresler.

| Toplama                              | Posta adresi                                                                                                            |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata, işlemin bir parçası olarak gönderilen baytları ifade eder. İşlemi içeren blokta, blokzincirin kalıcı kaydının bir parçası olarak saklanır.

Bu, blokzincire kalıcı olarak veri yerleştirmenin en ucuz yoludur. Bayt başına maliyet, 4 yürütüm gazı (bayt sıfırsa) veya 16 gazdır (başka herhangi bir değer). Standart uygulamaya uygun olarak veriler sıkıştırılmışsa, her bayt değeri eşit olasılıkla olacaktır; dolayısıyla ortalama maliyet, bayt başına yaklaşık 15,95 gazdır.

Yazım anında fiyatlar 12 gwei/gaz ve 2300 $/ETH'dir, bu da kilobayt başına maliyetin yaklaşık 45 sent olduğu anlamına gelir. EIP-4844 öncesinde en ucuz yöntem olduğundan bu, toplamaların [hata zorlukları](https://docs.optimism.io/stack/protocol/overview#fault-proofs) için kullanılabilir olması gereken, ancak doğrudan zincir üstünde erişilebilir olması gerekmeyen işlem bilgilerini depolamak için kullanıldığı yöntemdir.

İşte bazı ünlü toplamaların gönderdiği işlemleri görebileceğiniz adresler.

| Toplama                              | Posta adresi                                                                                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## L1 mekanizmalarıyla zincir dışında {#offchain-with-l1-mechs}

Güvenlikten ne kadar ödün vermek isteyeceğinize bağlı olarak, bilgileri başka bir yere yerleştirmeniz ve ihtiyaç duyulduğunda verilere erişilebilmesini sağlayacak bir mekanizma kullanmanız kabul edilebilir. Bunun işe yaraması için iki gereklilik vardır:

1. Verilerin _giriş taahhüdü_ adı verilen bir [karmasını](https://en.wikipedia.org/wiki/Cryptographic_hash_function) blokzincire gönderin. Bu 32 baytlık tek bir kelime olabilir, dolayısıyla pahalı değildir. Giriş taahhüdü mevcut olduğu sürece bütünlük güvence altındadır. Çünkü aynı değere karma yapacak başka veri bulmak makul değildir. Yani yanlış veri sağlanırsa tespit edilebilir.

2. Kullanılabilirliği sağlayan bir mekanizmaya sahip olunmalıdır. Örneğin, [Redstone'da](https://redstone.xyz/docs/what-is-redstone) herhangi bir düğüm kullanılabilirlik itirazı başlatabilir. Sıralayıcının son tarihe kadar zincir üstünde yanıt vermemesi halinde giriş taahhüdü atılır, böylece bilginin hiç gönderilmediği kabul edilir.

Bu, iyimser toplamalarda kabul edilebilirdir çünkü durum kökü için en az bir doğrulayıcının dürüst olduğunu kabul ederiz. Dürüst bir doğrulayıcı aynı zamanda blokları işlemek için gerekli verilere sahip olduğundan emin olur ve bilgiler zincir dışında mevcut değilse bir kullanılabilirlik itirazında bulunur. Bu tip iyimser toplamalar [plazma](/developers/docs/scaling/plasma/) olarak adlandırılır.

## Sözleşme kodu {#contract-code}

Sadece bir kez yazılması gereken, asla üzerine yazılamayan ve zincir üstünde erişilebilir olması gereken bilgiler, sözleşme kodu olarak saklanabilir. Bu, verilerle bir "akıllı sözleşme" oluşturduktan sonra bilgileri okumak için [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) kullandığımız anlamına gelir. Bunun avantajı, kod kopyalamanın nispeten ucuz olmasıdır.

`EXTCODECOPY`, bellek genişletme maliyetinin dışında bir sözleşmeye ilk erişim için ("soğukken") 2600 gaz ve aynı sözleşmeden sonraki kopyalar için 100 gaz artı 32 bayt kelime başına 3 gaz maliyetine sahiptir. Bayt başına maliyeti 15,95 olan calldata ile karşılaştırıldığında, yaklaşık 200 bayttan itibaren daha ucuzdur. [Bellek genişletme maliyeti formülüne](https://www.evm.codes/about#memoryexpansion) göre bellek genişletme maliyeti, 4MB'tan fazla belleğe ihtiyaç duymadığınız sürece calldata ekleme maliyetinden daha azdır.

Elbette bu sadece veriyi _okuma_ maliyetidir. Sözleşmeyi oluşturma maliyeti yaklaşık 32.000 gaz + 200 gaz/bayt'tır. Bu yöntem, sadece aynı bilginin farklı işlemlerde birçok kez okunması gerektiği zaman ekonomiktir.

Sözleşme kodu, `0xEF` ile başlamadığı sürece anlamsız olabilir. `0xEF` ile başlayan sözleşmeler, çok daha katı gereksinimlere sahip olan [ethereum nesne formatı](https://notes.ethereum.org/@ipsilon/evm-object-format-overview) olarak yorumlanır.

## Olaylar {#events}

[Olaylar](https://docs.alchemy.com/docs/solidity-events), akıllı sözleşmeler tarafından yayılır ve zincir dışı yazılımla okunur.
Avantajları, zincir dışı kodun olayları dinleyebiliyor olmasıdır. Maliyeti, [gaz](https://www.evm.codes/#a0?fork=cancun), 375 artı veri baytı başına 8 gazdır. 12 gwei/gaz ve 2300 $/ETH üzerinden hesaplandığında bir sent artı kilobayt başına 22 sent anlamına gelir.

## Depolama {#storage}

Akıllı sözleşmelerin [kalıcı depolamaya](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory) erişimi vardır. Ancak, bu çok pahalıdır. Önceden boş olan bir depolama yuvasına 32 baytlık bir kelime yazmak [22.100 gaza mal olabilir](https://www.evm.codes/#55?fork=cancun). 12 gwei/gaz ve 2300 $/ETH'de, yazma işlemi başına yaklaşık 61 sent veya kilobayt başına 19,5 $ anlamına gelir.

Bu, Ethereum'daki en pahalı depolama yöntemidir.

## Özet {#summary}

Bu tabloda farklı seçenekler, bu seçenekleri avantajları ve dezavantajları özetlenmiştir.

| Depolama türü                      | Veri kaynağı                        | Kullanılabilirlik garantisi                                                                                                                             | Zincir üstünde kullanılabilirlik                                | Ek sınırlamalar                                                       |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| EIP-4844 blob'ları                 | Zincir dışında                      | [~18 gün](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) süresince Ethereum garantili | Sadece karma kullanılabilir                                     |                                                                       |
| Calldata                           | Zincir dışında                      | Sonsuz Ethereum garantisi (blokzincirin bir parçası)                                                                                 | Sadece bir sözleşmeye yazıldıysa ve o işlemdeyse kullanılabilir |                                                                       |
| L1 mekanizmalarıyla zincir dışında | Zincir dışında                      | İtiraz dönemi boyunca "bir dürüst doğrulayıcı" garantisi                                                                                                | Sadece karma                                                    | Sadece itiraz döneminde, itiraz mekanizması tarafından garanti edilir |
| Sözleşme kodu                      | Zincir üstünde ya da zincir dışında | Sonsuz Ethereum garantisi (blokzincirin bir parçası)                                                                                 | Evet                                                            | "Rastgele" bir adrese yazılır, `0xEF` ile başlayamaz                  |
| Olaylar                            | Zincir üstünde                      | Sonsuz Ethereum garantisi (blokzincirin bir parçası)                                                                                 | Hayır                                                           |                                                                       |
| Depolama                           | Zincir üstünde                      | Sonsuz Ethereum garantisi (blokzincirin bir parçası ve üzerine yazılana kadar mevcut durum)                                          | Evet                                                            |                                                                       |
