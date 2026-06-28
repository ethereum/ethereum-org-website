---
title: Validium
description: "Ethereum topluluğu tarafından şu anda kullanılan bir ölçeklendirme çözümü olan Validium'a giriş."
lang: tr
sidebarDepth: 3
---

Validium, [ZK-toplamalar](/developers/docs/scaling/zk-rollups/) gibi geçerlilik kanıtları kullanarak işlemlerin bütünlüğünü zorunlu kılan, ancak işlem verilerini [Ethereum](/) Ana Ağı'nda depolamayan bir [ölçeklendirme çözümüdür](/developers/docs/scaling/). Zincir dışı veri kullanılabilirliği bazı ödünleşimler getirse de, ölçeklenebilirlikte devasa iyileştirmelere yol açabilir (Validium'lar [saniyede ~9.000 veya daha fazla işlem](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263) gerçekleştirebilir).

## Ön koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2 (l2)](/layer-2) hakkındaki sayfamızı okumuş ve anlamış olmalısınız.

## Validium nedir? {#what-is-validium}

Validium'lar, işlemleri Ethereum Ana Ağı dışında işleyerek işlem kapasitesini artırmak için tasarlanmış, zincir dışı veri kullanılabilirliği ve hesaplama kullanan ölçeklendirme çözümleridir. Sıfır bilgi toplamaları (ZK-toplamalar) gibi, Validium'lar da Ethereum üzerindeki zincir dışı işlemleri doğrulamak için [sıfır bilgi ispatları](/glossary/#zk-proof) yayınlar. Bu, geçersiz durum geçişlerini önler ve bir Validium zincirinin güvenlik garantilerini artırır.

Bu "geçerlilik kanıtları", ZK-SNARKs (Sıfır Bilgi Özlü Etkileşimsiz Bilgi Argümanı) veya ZK-STARKs (Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanı) biçiminde olabilir. [Sıfır bilgi ispatları](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/) hakkında daha fazla bilgi.

Validium kullanıcılarına ait fonlar, Ethereum üzerindeki bir akıllı sözleşme tarafından kontrol edilir. Validium'lar, tıpkı ZK-toplamalar gibi neredeyse anında çekim imkanı sunar; bir çekim talebi için geçerlilik kanıtı Ana Ağ'da doğrulandıktan sonra, kullanıcılar [Merkle kanıtları](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sağlayarak fonlarını çekebilirler. Merkle kanıtı, kullanıcının çekim işleminin doğrulanmış bir işlem grubuna dahil edildiğini onaylayarak zincir içi sözleşmenin çekim işlemini gerçekleştirmesine olanak tanır.

Ancak, Validium kullanıcılarının fonları dondurulabilir ve çekim işlemleri kısıtlanabilir. Bu durum, Validium zincirindeki veri kullanılabilirliği yöneticilerinin zincir dışı durum verilerini kullanıcılardan saklaması halinde meydana gelebilir. İşlem verilerine erişim olmadan, kullanıcılar fonların mülkiyetini kanıtlamak ve çekim işlemlerini gerçekleştirmek için gereken Merkle kanıtını hesaplayamazlar.

Validium'lar ile ZK-toplamalar arasındaki en büyük fark budur: veri kullanılabilirliği yelpazesindeki konumları. Her iki çözüm de veri depolamaya farklı yaklaşır ve bunun güvenlik ile güven gereksinimsizliği üzerinde etkileri vardır.

## Validium'lar Ethereum ile nasıl etkileşime girer? {#how-do-validiums-interact-with-ethereum}

Validium'lar, mevcut Ethereum zinciri üzerine inşa edilmiş ölçeklendirme protokolleridir. İşlemleri zincir dışı yürütmesine rağmen, bir Validium zinciri Ana Ağ'da dağıtılan ve aşağıdakileri içeren bir akıllı sözleşme koleksiyonu tarafından yönetilir:

1. **Doğrulayıcı sözleşme**: Doğrulayıcı sözleşme, durum güncellemeleri yaparken Validium operatörü tarafından sunulan kanıtların geçerliliğini doğrular. Bu, zincir dışı işlemlerin doğruluğunu tasdik eden geçerlilik kanıtlarını ve zincir dışı işlem verilerinin varlığını doğrulayan veri kullanılabilirliği kanıtlarını içerir.

2. **Ana sözleşme**: Ana sözleşme, blok üreticileri tarafından sunulan durum taahhütlerini (Merkle kökleri) depolar ve bir geçerlilik kanıtı zincir içi doğrulandıktan sonra Validium'un durumunu günceller. Bu sözleşme ayrıca Validium zincirine yapılan yatırma ve çekim işlemlerini de işler.

Validium'lar ayrıca aşağıdakiler için ana Ethereum zincirine güvenir:

### Uzlaşma {#settlement}

Bir Validium üzerinde yürütülen işlemler, ana zincir geçerliliklerini doğrulayana kadar tam olarak onaylanamaz. Bir Validium üzerinde yürütülen tüm işler eninde sonunda Ana Ağ'da uzlaşmaya varmalıdır. Ethereum blokzinciri ayrıca Validium kullanıcıları için "uzlaşma garantileri" sağlar, yani zincir dışı işlemler zincir içi taahhüt edildikten sonra geri alınamaz veya değiştirilemez.

### Güvenlik {#security}

Bir uzlaşma katmanı olarak hareket eden Ethereum, Validium üzerindeki durum geçişlerinin geçerliliğini de garanti eder. Validium zincirinde yürütülen zincir dışı işlemler, temel Ethereum katmanındaki bir akıllı sözleşme aracılığıyla doğrulanır.

Eğer zincir içi doğrulayıcı sözleşme kanıtı geçersiz bulursa, işlemler reddedilir. Bu, operatörlerin Validium'un durumunu güncellemeden önce Ethereum protokolü tarafından zorunlu kılınan geçerlilik koşullarını yerine getirmesi gerektiği anlamına gelir.

## Validium nasıl çalışır? {#how-does-validium-work}

### İşlemler {#transactions}

Kullanıcılar işlemleri, Validium zincirinde işlemleri yürütmekten sorumlu bir düğüm olan operatöre gönderir. Bazı Validium'lar zinciri yürütmek için tek bir operatör kullanabilir veya operatörleri dönüşümlü olarak değiştirmek için bir [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) mekanizmasına güvenebilir.

Operatör, işlemleri bir grupta toplar ve kanıtlama için bir kanıtlama devresine gönderir. Kanıtlama devresi, işlem grubunu (ve diğer ilgili verileri) girdi olarak kabul eder ve işlemlerin doğru bir şekilde gerçekleştirildiğini doğrulayan bir geçerlilik kanıtı çıktısı verir.

### Durum taahhütleri {#state-commitments}

Validium'un durumu, kökü Ethereum'daki ana sözleşmede depolanan bir Merkle ağacı olarak özetlenir. Durum kökü olarak da bilinen Merkle kökü, Validium'daki hesapların ve bakiyelerin mevcut durumuna yönelik kriptografik bir taahhüt görevi görür.

Bir durum güncellemesi gerçekleştirmek için, operatörün (işlemleri yürüttükten sonra) yeni bir durum kökü hesaplaması ve bunu zincir içi sözleşmeye sunması gerekir. Geçerlilik kanıtı doğrulanırsa, önerilen durum kabul edilir ve Validium yeni durum köküne geçer.

### Yatırma ve çekim işlemleri {#deposits-and-withdrawals}

Kullanıcılar, zincir içi sözleşmeye ETH (veya herhangi bir ERC uyumlu token) yatırarak fonlarını Ethereum'dan bir Validium'a taşırlar. Sözleşme, yatırma olayını zincir dışı Validium'a iletir ve burada kullanıcının adresine yatırdığı miktara eşit bir tutar alacak olarak kaydedilir. Operatör ayrıca bu yatırma işlemini yeni bir gruba dahil eder.

Fonları tekrar Ana Ağ'a taşımak için, bir Validium kullanıcısı bir çekim işlemi başlatır ve bunu, çekim talebini doğrulayan ve bir gruba dahil eden operatöre gönderir. Kullanıcının Validium zincirindeki varlıkları da sistemden çıkış yapmadan önce yok edilir. Grupla ilişkili geçerlilik kanıtı doğrulandıktan sonra, kullanıcı ilk yatırdığı tutarın kalanını çekmek için ana sözleşmeyi çağırabilir.

Sansür karşıtı bir mekanizma olarak Validium protokolü, kullanıcıların operatörden geçmeden doğrudan Validium sözleşmesinden çekim yapmasına olanak tanır. Bu durumda kullanıcıların, bir hesabın durum köküne dahil edildiğini gösteren bir Merkle kanıtını doğrulayıcı sözleşmeye sunmaları gerekir. Kanıt kabul edilirse, kullanıcı fonlarını Validium'dan çıkarmak için ana sözleşmenin çekim işlevini çağırabilir.

### Grup gönderimi {#batch-submission}

Bir grup işlemi yürüttükten sonra operatör, ilişkili geçerlilik kanıtını doğrulayıcı sözleşmeye sunar ve ana sözleşmeye yeni bir durum kökü önerir. Kanıt geçerliyse, ana sözleşme Validium'un durumunu günceller ve gruptaki işlemlerin sonuçlarını kesinleştirir.

Bir ZK-Rollup'ın aksine, bir Validium üzerindeki blok üreticilerinin işlem grupları için işlem verilerini yayınlaması gerekmez (yalnızca blok başlıkları). Bu, Validium'u, durum verilerini blob verileri, `calldata` veya her ikisinin bir kombinasyonunu kullanarak ana Ethereum zincirinde yayınlayan "hibrit" ölçeklendirme protokollerinin (yani [katman 2 (l2)](/layer-2/)) aksine, tamamen zincir dışı bir ölçeklendirme protokolü yapar.

### Veri kullanılabilirliği {#data-availability}

Belirtildiği gibi Validium'lar, operatörlerin tüm işlem verilerini Ethereum Ana Ağı dışında depoladığı zincir dışı bir veri kullanılabilirliği modeli kullanır. Validium'un düşük zincir içi veri ayak izi, ölçeklenebilirliği artırır (işlem kapasitesi Ethereum'un veri işleme kapasitesiyle sınırlı değildir) ve kullanıcı ücretlerini düşürür (verileri zincir içi yayınlamanın maliyeti daha düşüktür).

Ancak zincir dışı veri kullanılabilirliği bir sorun teşkil eder: Merkle kanıtları oluşturmak veya doğrulamak için gereken veriler mevcut olmayabilir. Bu, operatörlerin kötü niyetli davranması durumunda kullanıcıların zincir içi sözleşmeden fon çekemeyebileceği anlamına gelir.

Çeşitli Validium çözümleri, durum verilerinin depolanmasını merkeziyetsizleştirerek bu sorunu çözmeye çalışır. Bu, blok üreticilerini temel verileri, zincir dışı verileri depolamaktan ve talep üzerine kullanıcılara sunmaktan sorumlu "veri kullanılabilirliği yöneticilerine" göndermeye zorlamayı içerir.

Validium'daki veri kullanılabilirliği yöneticileri, her Validium grubunu imzalayarak zincir dışı işlemler için verilerin kullanılabilirliğini tasdik eder. Bu imzalar, zincir içi doğrulayıcı sözleşmenin durum güncellemelerini onaylamadan önce kontrol ettiği bir tür "kullanılabilirlik kanıtı" oluşturur.

Validium'lar veri kullanılabilirliği yönetimine yaklaşımlarında farklılık gösterir. Bazıları durum verilerini depolamak için güvenilir taraflara güvenirken, diğerleri bu görev için rastgele atanan doğrulayıcıları kullanır.

#### Veri kullanılabilirliği komitesi (DAC) {#data-availability-committee}

Zincir dışı verilerin kullanılabilirliğini garanti etmek için bazı Validium çözümleri, durumun kopyalarını depolamak ve veri kullanılabilirliği kanıtı sağlamak üzere topluca veri kullanılabilirliği komitesi (DAC) olarak bilinen bir grup güvenilir varlık atar. DAC'lerin uygulanması daha kolaydır ve üye sayısı düşük olduğu için daha az koordinasyon gerektirir.

Ancak kullanıcılar, gerektiğinde (örneğin Merkle kanıtları oluşturmak için) verileri kullanılabilir hale getirmesi konusunda DAC'ye güvenmelidir. Veri kullanılabilirliği komitelerinin üyelerinin, daha sonra zincir dışı verileri saklayabilecek [kötü niyetli bir aktör tarafından ele geçirilme](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) olasılığı vardır.

[Validium'lardaki veri kullanılabilirliği komiteleri hakkında daha fazla bilgi](https://medium.com/starkware/data-availability-e5564c416424).

#### Teminatlı veri kullanılabilirliği {#bonded-data-availability}

Diğer Validium'lar, çevrimdışı verileri depolamakla görevli katılımcıların rollerini üstlenmeden önce bir akıllı sözleşmeye token stake etmelerini (yani kilitlemelerini) gerektirir. Bu stake, veri kullanılabilirliği yöneticileri arasında dürüst davranışı garanti etmek için bir "teminat" görevi görür ve güven varsayımlarını azaltır. Bu katılımcılar veri kullanılabilirliğini kanıtlayamazlarsa, teminat kesintiye uğrar.

Teminatlı bir veri kullanılabilirliği şemasında, gerekli stake'i sağladıktan sonra herkes zincir dışı verileri tutmak üzere atanabilir. Bu, uygun veri kullanılabilirliği yöneticileri havuzunu genişleterek veri kullanılabilirliği komitelerini (DAC'ler) etkileyen merkezileşmeyi azaltır. Daha da önemlisi, bu yaklaşım kötü niyetli faaliyetleri önlemek için kriptoekonomik teşviklere dayanır; bu da Validium'da çevrimdışı verileri güvence altına almak için güvenilir tarafları atamaktan çok daha güvenlidir.

[Validium'larda teminatlı veri kullanılabilirliği hakkında daha fazla bilgi](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition'lar ve Validium {#volitions-and-validium}

Validium'lar birçok fayda sunar ancak ödünleşimlerle (en önemlisi veri kullanılabilirliği) birlikte gelir. Ancak, birçok ölçeklendirme çözümünde olduğu gibi, Validium'lar belirli kullanım durumlarına uygundur; Volition'ların yaratılmasının nedeni de budur.

Volition'lar, bir ZK-Rollup ve Validium zincirini birleştirir ve kullanıcıların iki ölçeklendirme çözümü arasında geçiş yapmasına olanak tanır. Volition'lar ile kullanıcılar, belirli işlemler için Validium'un zincir dışı veri kullanılabilirliğinden yararlanabilirken, gerektiğinde zincir içi bir veri kullanılabilirliği çözümüne (ZK-Rollup) geçme özgürlüğünü koruyabilirler. Bu, temel olarak kullanıcılara kendi benzersiz koşullarının gerektirdiği şekilde ödünleşimleri seçme özgürlüğü verir.

Merkeziyetsiz bir borsa (DEX), yüksek değerli işlemler için bir Validium'un ölçeklenebilir ve gizli altyapısını kullanmayı tercih edebilir. Ayrıca, bir ZK-Rollup'ın daha yüksek güvenlik garantilerini ve güven gereksinimsizliğini isteyen kullanıcılar için bir ZK-Rollup da kullanabilir.

## Validium'lar ve EVM uyumluluğu {#validiums-and-evm-compatibility}

ZK-toplamalar gibi, Validium'lar da çoğunlukla token takasları ve ödemeler gibi basit uygulamalar için uygundur. Bir sıfır bilgi ispatı devresinde [EVM](/developers/docs/evm/) talimatlarını kanıtlamanın önemli ek yükü göz önüne alındığında, Validium'lar arasında genel hesaplamayı ve akıllı sözleşme yürütülmesini desteklemek zordur.

Bazı Validium projeleri, EVM uyumlu dilleri (örneğin Solidity, Vyper) verimli kanıtlama için optimize edilmiş özel baytkod oluşturacak şekilde derleyerek bu sorunu aşmaya çalışır. Bu yaklaşımın bir dezavantajı, yeni sıfır bilgi ispatı dostu VM'lerin önemli EVM işlem kodlarını desteklemeyebilmesi ve geliştiricilerin en iyi deneyim için doğrudan üst düzey dilde yazmak zorunda kalmasıdır. Bu daha da fazla sorun yaratır: geliştiricileri tamamen yeni bir geliştirme yığınıyla merkeziyetsiz uygulamalar (dapp'ler) oluşturmaya zorlar ve mevcut Ethereum altyapısıyla uyumluluğu bozar.

Ancak bazı ekipler, mevcut EVM işlem kodlarını ZK kanıtlama devreleri için optimize etmeye çalışıyor. Bu, program yürütülmesinin doğruluğunu doğrulamak için kanıtlar üreten EVM uyumlu bir VM olan sıfır bilgi Ethereum Sanal Makinesi'nin (zkEVM) geliştirilmesiyle sonuçlanacaktır. Bir zkEVM ile Validium zincirleri, akıllı sözleşmeleri zincir dışı yürütebilir ve Ethereum üzerinde (yeniden yürütmek zorunda kalmadan) zincir dışı bir hesaplamayı doğrulamak için geçerlilik kanıtları sunabilir.

[zkEVM'ler hakkında daha fazla bilgi](https://www.alchemy.com/overviews/zkevm).

## Validium'lar Ethereum'u nasıl ölçeklendirir? {#scaling-ethereum-with-validiums}

### 1. Zincir dışı veri depolama {#offchain-data-storage}

İyimser toplamalar ve ZK-toplamalar gibi katman 2 ölçeklendirme projeleri, bazı işlem verilerini L1'de yayınlayarak güvenlik karşılığında tamamen zincir dışı ölçeklendirme protokollerinin (örneğin [Plasma](/developers/docs/scaling/plasma/)) sonsuz ölçeklenebilirliğinden ödün verir. Ancak bu, toplamaların ölçeklenebilirlik özelliklerinin Ethereum Ana Ağı'ndaki veri bant genişliği ile sınırlı olduğu anlamına gelir ([veri parçalama](/roadmap/danksharding/) bu nedenle Ethereum'un veri depolama kapasitesini iyileştirmeyi önerir).

Validium'lar, tüm işlem verilerini zincir dışı tutarak ve durum güncellemelerini ana Ethereum zincirine iletirken yalnızca durum taahhütlerini (ve geçerlilik kanıtlarını) göndererek ölçeklenebilirlik elde eder. Ancak geçerlilik kanıtlarının varlığı, Validium'lara Plasma ve [yan zincirler](/developers/docs/scaling/sidechains/) dahil olmak üzere diğer tamamen zincir dışı ölçeklendirme çözümlerinden daha yüksek güvenlik garantileri sağlar. Validium tasarımları, Ethereum'un zincir dışı işlemleri doğrulamadan önce işlemesi gereken veri miktarını azaltarak Ana Ağ'daki işlem kapasitesini büyük ölçüde artırır.

### 2. Özyineli kanıtlar {#recursive-proofs}

Özyineli bir kanıt, diğer kanıtların geçerliliğini doğrulayan bir geçerlilik kanıtıdır. Bu "kanıtların kanıtı", önceki tüm kanıtları doğrulayan son bir kanıt oluşturulana kadar birden fazla kanıtın özyineli olarak bir araya getirilmesiyle oluşturulur. Özyineli kanıtlar, geçerlilik kanıtı başına doğrulanabilen işlem sayısını artırarak blokzincir işlem hızlarını ölçeklendirir.

Tipik olarak, Validium operatörünün doğrulama için Ethereum'a sunduğu her geçerlilik kanıtı, tek bir bloğun bütünlüğünü doğrular. Oysa tek bir özyineli kanıt, aynı anda birkaç Validium bloğunun geçerliliğini onaylamak için kullanılabilir; bu, kanıtlama devresinin birkaç blok kanıtını özyineli olarak tek bir nihai kanıtta birleştirebilmesi sayesinde mümkündür. Zincir içi doğrulayıcı sözleşme özyineli kanıtı kabul ederse, altta yatan tüm bloklar anında kesinleşmiş olur.

## Validium'un artıları ve eksileri {#pros-and-cons-of-validium}

| Artıları                                                                                                                     | Eksileri                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Geçerlilik kanıtları, zincir dışı işlemlerin bütünlüğünü zorunlu kılar ve operatörlerin geçersiz durum güncellemelerini kesinleştirmesini önler. | Geçerlilik kanıtları üretmek özel donanım gerektirir, bu da bir merkezileşme riski oluşturur.                                                              |
| Kullanıcılar için sermaye verimliliğini artırır (fonları Ethereum'a geri çekerken gecikme olmaz).                                 | Genel hesaplama/akıllı sözleşmeler için sınırlı destek; geliştirme için özel diller gereklidir.                                             |
| Yüksek değerli uygulamalarda sahtekarlık kanıtı tabanlı sistemlerin karşılaştığı belirli ekonomik saldırılara karşı savunmasız değildir.                | ZK kanıtları oluşturmak için yüksek hesaplama gücü gerekir; düşük işlem kapasiteli uygulamalar için uygun maliyetli değildir.                                         |
| Çağrı verisini Ethereum Ana Ağı'na göndermeyerek kullanıcılar için gaz ücretlerini düşürür.                                                  | Daha yavaş öznel kesinlik süresi (bir ZK kanıtı oluşturmak için 10-30 dakika), ancak itiraz süresi gecikmesi olmadığı için tam kesinliğe daha hızlı ulaşılır.               |
| İşlem gizliliğine ve ölçeklenebilirliğe öncelik veren ticaret veya blokzincir oyunları gibi belirli kullanım durumları için uygundur.  | Mülkiyetin Merkle kanıtlarını oluşturmak, zincir dışı verilerin her zaman mevcut olmasını gerektirdiğinden, kullanıcıların fon çekmesi engellenebilir.      |
| Zincir dışı veri kullanılabilirliği, daha yüksek işlem kapasitesi seviyeleri sağlar ve ölçeklenebilirliği artırır.                              | Güvenlik modeli, tamamen kriptografik güvenlik mekanizmalarına dayanan ZK-toplamaların aksine, güven varsayımlarına ve kriptoekonomik teşviklere dayanır. |

### Validium/Volition'ları Kullanın {#use-validium-and-volitions}

Birden fazla proje, merkeziyetsiz uygulamalarınıza (dapp'lerinize) entegre edebileceğiniz Validium ve Volition uygulamaları sağlar:

**StarkWare StarkEx** - _StarkEx, geçerlilik kanıtlarına dayanan bir Ethereum Katman 2 (L2) ölçeklenebilirlik çözümüdür. ZK-Rollup veya Validium veri kullanılabilirliği modlarında çalışabilir._

- [Belgeler](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Web sitesi](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter, zkRollup ve parçalama fikirlerini birleştiren hibrit bir yaklaşımla veri kullanılabilirliğini ele alan bir Katman 2 ölçeklendirme protokolüdür. Her biri kendi veri kullanılabilirliği politikasına sahip, isteğe bağlı sayıda parçayı destekleyebilir._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Belgeler](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Web sitesi](https://zksync.io/)

## Daha fazla bilgi {#further-reading}

- [Validium ve Katman 2 İkiye İki — Sayı No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-toplamalar ve Validium Karşılaştırması](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition ve Gelişen Veri Kullanılabilirliği Yelpazesi](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Ethereum Toplamaları İçin Pratik Rehber](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)