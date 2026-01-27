---
title: Validium
description: "Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak Validium'a giriş."
lang: tr
sidebarDepth: 3
---

Validium, [ZK-toplamalar](/developers/docs/scaling/zk-rollups/) gibi geçerlilik kanıtları kullanarak işlemlerin bütünlüğünü sağlayan ancak işlem verilerini Ethereum Ana Ağı'nda saklamayan bir [ölçeklendirme çözümüdür](/developers/docs/scaling/). Zincir dışı veri kullanılabilirliği bazı ödünleri beraberinde getirse de, ölçeklenebilirlikte büyük gelişmelere yol açabilir (validium'lar saniyede [~9.000 veya daha fazla işlem](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263) işleyebilir).

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2) hakkındaki sayfamızı okuyup anlamış olmalısınız.

## Validium nedir? {#what-is-validium}

Validium'lar, Ethereum Ana Ağı'ndaki işlemleri zincir dışı veri kullanılabilirliği ve hesaplama yoluyla işleyerek çıktı hacmini artırmak için tasarlanmış ölçeklendirme çözümleridir. Sıfır bilgili toplamalar (ZK-toplamalar) gibi, validium'lar da Ethereum'daki zincir dışı işlemleri doğrulamak için [sıfır bilgili ispatlar](/glossary/#zk-proof) yayımlar. Bu da geçersiz durum geçişlerini önler ve validium zincirinin güvenlik garantisini artırır.

Bu "doğruluk kanıtları", ZK-SNARK'lar (Sıfır Bilgi Öz ve Etkileşimli Olmayan Bilgi Argümanı) ya da ZK-STARK'lar (Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanı) şeklinde olabilir. [Sıfır bilgili ispatlar](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/) hakkında daha fazla bilgi.

Validium kullanıcılarına ait fonlar, Ethereum üzerinde akıllı bir sözleşme ile kontrol edilir. Validium'lar, ZK-toplamaları gibi neredeyse anında para çekme olanağı sunar; bir para çekme talebi için geçerlilik kanıtı Ana Ağ'da doğrulandıktan sonra, kullanıcılar [Merkle kanıtları](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sağlayarak fonlarını çekebilirler. Merkle kanıtı, kullanıcının para çekme işleminin doğrulanmış bir işlem grubuna dahil edildiğini doğrulayarak zincir üstü sözleşmenin para çekme işlemini yapmasına olanak tanır.

Ancak validium kullanıcıları fonlarını dondurabilir ve çekme işlemlerini kısıtlayabilir. Validium zincirindeki veri kullanılabilirliğini yönetenler, kullanıcılardan zincir dışı durum verilerini saklarsa bu durum meydana gelebilir. Kullanıcılar, işlem verilerine erişimleri olmadan fonların sahipliğini kanıtlamak ve para çekme işlemlerini gerçekleştirmek için gereken Merkle kanıtını hesaplayamazlar.

Validium'lar ve ZK toplamaları arasındaki en büyük fark, veri kullanılabilirliği spektrumundaki konumlarıdır. Her iki çözüm de veri depolamaya farklı açılardan yaklaşırken bunun güvenlik ve güven gerektirmezlik üzerinde farklı etkileri vardır.

## Validium'lar Ethereum ile nasıl etkileşime girer? {#how-do-validiums-interact-with-ethereum}
Validium'lar, mevcut Ethereum zinciri üzerine inşa edilmiş ölçeklendirme protokolleridir. İşlemleri zincir dışında yürütmesine rağmen bir validium zinciri, aşağıdakiler de dahil olmak üzere Ana Ağ'da dağıtılan bir dizi akıllı sözleşme tarafından yönetilir:

1. **Doğrulayıcı sözleşmesi**: Doğrulayıcı sözleşmesi, durum güncellemeleri yapılırken validium operatörü tarafından sunulan kanıtların geçerliliğini doğrular. Bu, zincir dışı işlemlerin doğruluğunu tasdik eden geçerlilik kanıtlarını ve zincir dışı işlem verilerinin varlığını doğrulayan veri kullanılabilirliği kanıtlarını içerir.

2. **Ana sözleşme**: Ana sözleşme, blok üreticileri tarafından sunulan durum taahhütlerini (Merkle köklerini) depolar ve bir geçerlilik kanıtı zincir üstünde doğrulandıktan sonra validium'un durumunu günceller. Bu sözleşme, aynı zamanda validium zincirine para yatırma ve çekme işlemlerini de gerçekleştirir.

Validium'lar, aşağıdaki konularda Ethereum ana zincirine bağımlıdır:

### Uzlaşma {#settlement}

Validium üzerinde gerçekleştirilen işlemler, bir üst incir geçerliliklerini doğrulayana kadar tam olarak doğrulanamaz. Bir validium üzerinde yürütülen tüm işler sonunda Ana Ağ'da uzlaştırılmalıdır. Ethereum blokzinciri ayrıca validium kullanıcıları için "uzlaşma garantileri" sağlar; bu, zincir dışı işlemlerin zincir üzerinde gerçekleştirildikten sonra geri alınamayacağı veya değiştirilemeyeceği anlamına gelir.

### Güvenlik {#security}

Uzlaşma katmanı görevi gören Ethereum, validium üzerindeki durum geçişlerinin geçerliliğini de garanti eder. Validium zincirinde yürütülen zincir dışı işlemler, temel Ethereum katmanındaki bir akıllı sözleşme aracılığıyla doğrulanır.

Zincir üstü doğrulayıcı sözleşmesi kanıtı geçersiz bulursa işlemler reddedilir. Bu da, operatörlerin validium'un durumunu güncellemeden önce Ethereum protokolü tarafından uygulanan geçerlilik koşullarının karşılanması gerektiği anlamına gelir.

## Validium nasıl çalışır? {#how-does-validium-work}
### İşlemler {#transactions}

Kullanıcılar, validium zincirinde işlemleri yürütmekten sorumlu bir düğüm olan operatöre işlemleri gönderir. Bazı validium'lar zinciri yürütmek için tek bir operatör kullanabilir veya operatörleri döndürmek için [hisse ispatı (PoS)](/developers/docs/consensus-mechanisms/pos/) mekanizmasına güvenebilir.

Operatör, işlemleri bir yığın halinde toplar ve kanıtlanmak üzere bir kanıtlama devresine gönderir. Kanıtlama devresi, işlem yığınını (ve diğer ilgili verileri) girdi olarak kabul eder ve işlemlerin doğru şekilde gerçekleştirildiğini doğrulayan bir doğruluk kanıtı sunar.

### Durum taahhütleri {#state-commitments}

Validium'un durumu, kökü Ethereum'daki ana sözleşmede saklanacak şekilde bir Merkle ağacı olarak karma hale getirilir. Durum kökü olarak da bilinen Merkle kökü, validium üzerindeki hesapların ve bakiyelerin mevcut durumu hakkında kriptografik bir taahhüt görevi görür.

Bir durum güncellemesi gerçekleştirmek için operatörün (işlemleri yürüttükten sonra) yeni bir durum kökü hesaplaması ve bunu zincir üstü sözleşmeye göndermesi gerekir. Doğruluk kanıtı doğrulanırsa önerilen durum kabul edilir ve validium yeni durum köküne geçer.

### Yatırma ve çekme işlemleri {#deposits-and-withdrawals}

Kullanıcılar, zincir üstü sözleşmeye ETH (veya herhangi bir ERC uyumlu jeton) yatırarak fonları Ethereum'dan validium'a taşırlar. Sözleşme, kullanıcının yatırdığı miktar ile eşit miktarda varlığı kullanıcının zincir dışı validium'daki adresine aktarır. Operatör ayrıca bu yatırma işlemini yeni bir partiye dahil eder.

Bir validium kullanıcısı, fonları Ana Ağ'a geri çekmek için bir çekme işlemi başlatır ve bunu, çekme talebini doğrulayan ve bir partiye dahil eden operatöre gönderir. Kullanıcının validium zincirindeki varlıkları da sistemden çıkarılmadan önce yok edilir. Kullanıcı, Ana Ağ'a gönderilen işlem grubuyla ilişkili doğruluk kanıtı doğrulandıktan sonra ana sözleşmeden ilk yatırdığı miktarın geri kalanını çekebilir.

Validium protokolü, sansür karşıtı bir mekanizma olarak kullanıcıların operatöre başvurmadan doğrudan validium sözleşmesinden çekilmelerine olanak tanır. Bu durumda, kullanıcıların doğrulayıcı sözleşmesine hesabın durum köküne dahil edildiğini gösteren bir Merkle kanıtı sunması gerekir. Kanıt kabul edilirse, kullanıcı fonlarını validium'dan çıkarmak için ana sözleşmenin çekme işlevini çağırabilir.

### Toplu gönderim {#batch-submission}

Operatör, toplu işlemler gerçekleştirdikten sonra ilişkili doğruluk kanıtını doğrulayıcı sözleşmesine gönderir ve ana sözleşmeye yeni bir durum kökü önerir. Kanıt geçerliyse, ana sözleşme validium'un durumunu günceller ve partideki işlemlerin sonucunu nihai hale getirir.

Bir ZK toplamasının aksine, validium'daki blok üreticilerinin işlem partileri (yalnızca blok başlıkları) için işlem verilerini yayımlamaları gerekmez. Bu, ana Ethereum zincirinde blob verileri, `calldata` veya her ikisinin bir kombinasyonunu kullanarak durum verilerini yayımlayan "hibrit" ölçeklendirme protokollerinin (yani, [katman 2](/layer-2/)) aksine, validium'u tamamen zincir dışı bir ölçeklendirme protokolü yapar.

### Veri kullanılabilirliği {#data-availability}

Belirtildiği gibi, validium'lar, operatörlerin tüm işlem verilerini Ethereum Ana Ağı'nın dışında sakladığı zincir dışı bir veri kullanılabilirliği modeli kullanır. Validium'un düşük zincir üstü veri kaplama alanı, ölçeklenebilirliği artırır (verim, Ethereum'un veri işleme kapasitesiyle sınırlı değildir) ve kullanıcı ücretlerini azaltır (zincir üstünde veri yayımlama maliyeti daha düşüktür).

Ancak zincir dışı veri kullanılabilirliği bir sorun teşkil eder: Merkle kanıtları oluşturmak veya doğrulamak için gerekli olan veriler kullanılamayabilir. Bu, operatörlerin kötü niyetli davranması durumunda kullanıcıların zincir üstü sözleşmeden fon çekemeyebileceği anlamına gelir.

Çeşitli validium çözümleri, bu sorunu durum verilerinin tutulduğu depolamayı merkeziyetsizleştirerek çözmeyi amaçlar. Bu, blok üreticilerini zincir dışı verileri depolamaktan ve istek üzerine kullanıcılara sunmaktan sorumlu "veri kullanılabilirliği yöneticilerine" veri göndermeye zorlamayı içerir.

Validium'daki veri kullanılabilirliği yöneticileri, her validium partisini imzalayarak zincir dışı işlemler için verilerin kullanılabilirliğini tasdik eder. Bu imzalar, zincir üstü doğrulayıcı sözleşmesinin durum güncellemelerini onaylamadan önce kontrol ettiği "kullanılabilirlik kanıtının" bir biçimini teşkil eder.

Validium'lar, veri kullanılabilirliği yönetimine yaklaşımları açısından farklılıklar gösterirler. Bazıları durum verilerini depolamak için güvenilir tarafları kullanırken bazıları da görev için rastgele atanmış doğrulayıcıları kullanır.

#### Veri kullanılabilirliği kurulu (DAC) {#data-availability-committee}

Bazı validium çözümleri, zincir dışı verilerin kullanılabilirliğini garanti altına almak için durumun kopyalarını depolamak ve veri kullanılabilirliği kanıtı sağlamak üzere toplu olarak veri kullanılabilirliği kurulu (DAC) olarak da bilinen bir grup güvenilir kuruluşu kullanır. DAC'lerin uygulanması daha kolaydır ve üyelik düşük olduğu için daha az koordinasyon gerektirir.

Bununla birlikte kullanıcılar, gerektiğinde (örneğin, Merkle kanıtları oluşturmak için) verileri kullanılabilir hale getirmesi için DAC'ye güvenmek zorundadır. Veri kullanılabilirliği kurullarının üyelerinin, daha sonra zincir dışı verileri alıkoyabilecek [kötü niyetli bir aktör tarafından ele geçirilme](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) olasılığı vardır.

[Validium'lardaki veri kullanılabilirliği kurulları hakkında daha fazla bilgi](https://medium.com/starkware/data-availability-e5564c416424).

#### Teminatlı veri kullanılabilirliği {#bonded-data-availability}

Diğer validium'lar, katılımcıların rollerini üstlenmeden önce jetonları akıllı bir sözleşmede kilitlemek için çevrimdışı veri depolamakla yükümlü olmalarını gerektirir. Bu kilit, veri kullanılabilirliği yöneticileri arasında dürüst davranışı garanti altına almak için bir "teminat" görevi görür ve güven varsayımlarını azaltır. Bu katılımcılar veri kullanılabilirliğini kanıtlayamazlarsa, teminat kesilir.

Teminatlı bir veri kullanılabilirliği şemasında, gerekli kilidi sağlayan herkes zincir dışı verileri tutmakla görevlendirilebilir. Bu, uygun veri kullanılabilirliği yöneticileri havuzunu genişleterek veri kullanılabilirliği kurullarını (DAC'ler) etkileyen merkezileşmeyi azaltır. Daha da önemlisi, bu yaklaşım, validium'da çevrimdışı verileri güvence altına almak için güvenilir taraflar atamaktan çok daha güvenli olan kötü amaçlı faaliyetleri önlemek için kripto ekonomik teşviklere dayanır.

[Validium'larda teminatlı veri kullanılabilirliği hakkında daha fazla bilgi](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## İstemler ve validium {#volitions-and-validium}

Validium birçok avantaj sunsa da bunları elde ederken başka şeylerden vazgeçmeniz gerekir (en önemlisi, veri kullanılabilirliğidir). Birçok ölçeklendirme çözümünde olduğu gibi validiumlar da belirli kullanım durumlarına uygundur ve istemler işte bu nedenle oluşturulmuştur.

İstemler, ZK toplamaları ile validium'ları bir araya getirerek kullanıcıların bu iki ölçeklendirme çözümü arasında geçişler yapmasını sağlar. İstemler sayesinde kullanıcılar, belirli işlemler için validium'un zincir dışı veri kullanılabilirliğinden yararlanabilirken gerektiğinde zincir içi veri kullanılabilirliği çözümlerine (ZK-toplama) geçme özgürlüğünü de korur. Bu, kullanıcılara aslında kendi özel durumlarına göre neyi tercih edip neyden vazgeçeceklerini tercih etme özgürlüğü verir.

Merkeziyetsiz bir borsa (DEX), yüksek miktarlı işlemler için validium'un ölçeklenebilir ve özel altyapısını kullanmayı tercih edebilir. Ayrıca ZK toplamalarının daha yüksek güvenlik garantilerini ve güven gerektirmezliğini isteyen kullanıcılar için ZK toplamaları da kullanabilir.

## Validium'lar ve EVM uyumluluğu {#validiums-and-evm-compatibility}

ZK toplamaları gibi validium'lar da en çok jeton takasları ve ödemeler gibi basit uygulamalar için uygundur. Bir sıfır bilgili ispat devresinde [EVM](/developers/docs/evm/) talimatlarını kanıtlamanın getirdiği önemli ek yük göz önüne alındığında, validium'lar arasında genel hesaplamayı ve akıllı sözleşme yürütmeyi desteklemek zordur.

Bazı validium projeleri, EVM uyumlu dilleri (örn. Solidity, Vyper) verimli kanıtlama için optimize edilmiş özel bayt kodu oluşturmak üzere derleyerek bu sorunu aşmaya çalışır. Bu yaklaşımın dezavantajlarından biri, yeni sıfır bilgili ispat dostu VM'lerin önemli EVM işlem kodlarını desteklememe olasılığı ve aynı zamanda geliştiricilerin en iyi deneyim için doğrudan üst düzey dilde yazmaları gerekliliğidir. Bu da, daha fazla sorun yaratır: geliştiricileri tamamen yeni bir geliştirme yığınıyla uygulamalar oluşturmaya zorlar ve mevcut Ethereum altyapısıyla uyumluluğu bozar.

Ancak bazı ekipler, ZK ispatlı devreler için mevcut EVM işlem kodlarını optimize etmeye çalışıyor. Bu, program yürütmenin doğruluğunu doğrulamak için kanıtlar üreten EVM uyumlu bir VM olan sıfır bilgili bir Ethereum Sanal Makinası'nın (zkEVM) geliştirilmesiyle sonuçlanacaktır. zkEVM ile validium zincirleri, akıllı sözleşmeleri zincir dışında yürütebilir ve Ethereum üzerinde bir zincir dışı hesaplamayı (yeniden yürütmek zorunda kalmadan) doğrulamak için geçerlilik kanıtları sunabilir.

[zkEVM'ler hakkında daha fazla bilgi](https://www.alchemy.com/overviews/zkevm).

## Validium'lar Ethereum'u nasıl ölçeklendirir? Ethereum'u validium'larla ölçeklendirme {#scaling-ethereum-with-validiums}

### 1. Zincir dışı veri depolama {#offchain-data-storage}

İyimser toplamalar ve ZK-toplamalar gibi Katman 2 ölçeklendirme projeleri, L1'de bazı işlem verilerini yayımlayarak, saf zincir dışı ölçeklendirme protokollerinin (ör. [Plazma](/developers/docs/scaling/plasma/)) sonsuz ölçeklenebilirliğini güvenlikle takas eder. Ancak bu, toplamaların ölçeklenebilirlik özelliklerinin Ethereum Ana Ağı'ndaki veri bant genişliğiyle sınırlı olduğu anlamına gelir (bu nedenle [veri parçalama](/roadmap/danksharding/), Ethereum'un veri depolama kapasitesini iyileştirmeyi önerir).

Validium'lar, tüm işlem verilerini zincir dışında tutarak ve durum güncellemelerini ana Ethereum zincirine aktarırken yalnızca durum taahhütlerini (ve geçerlilik kanıtlarını) göndererek ölçeklenebilirlik sağlar. Ancak geçerlilik kanıtlarının varlığı, validium'lara Plazma ve [yan zincirler](/developers/docs/scaling/sidechains/) de dâhil olmak üzere diğer saf zincir dışı ölçeklendirme çözümlerinden daha yüksek güvenlik garantileri verir. Validium tasarımları, Ethereum'un zincir dışı işlemleri doğrulamadan önce işlemesi gereken veri miktarını azaltarak Ana Ağ'da verimi büyük ölçüde artırır.

### 2. Özyinelemeli kanıtlar {#recursive-proofs}

Özyinelemeli kanıt, diğer kanıtların geçerliliğini doğrulayan bir doğruluk kanıtıdır. Bu "kanıt kanıtları", önceki tüm kanıtları doğrulayan son bir kanıt oluşturulana kadar birden çok kanıtın özyinelemeli olarak toplanmasıyla oluşturulur. Özyinelemeli kanıtlar, doğruluk kanıtı başına doğrulanabilecek işlem sayısını artırarak blokzincirlerin işleme hızlarını ölçeklendirir.

Genellikle, validium operatörünün doğrulama için Ethereum'a sunduğu her doğruluk kanıtı tek bir bloğun bütünlüğünü doğrular. Tek bir özyinelemeli kanıt, aynı anda birkaç validium bloğunun geçerliliğini doğrulamak için kullanılabilir; bu mekanizma, kanıtlama devresi birkaç blok kanıtını tekrarlı bir şekilde tek bir son kanıtta toplayabildiği için mümkündür. Zincir üstü doğrulayıcı sözleşmesi özyinelemeli kanıtı kabul ederse, altındaki tüm bloklar hemen sonuçlandırılır.

## Validium'un artıları ve eksileri {#pros-and-cons-of-validium}

| Artıları                                                                                                                                                            | Eksileri                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Geçerlilik kanıtları, zincir dışı işlemlerin bütünlüğünü zorunlu kılar ve operatörlerin geçersiz durum güncellemelerini sonuçlandırmasını engeller. | Doğruluk kanıtları üretmek özel donanım gerektirir ve bu durum, merkezileştirme açısından risk teşkil eder.                                                                          |
| Kullanıcılar için sermaye verimliliğini artırır (fonları Ethereum'a geri çekmede gecikme olmaz)                                                  | Akıllı sözleşmeler/genel hesaplamalar için sınırlı destek; geliştirme için özel diller gereklidir.                                                                                   |
| Yüksek değere sahip uygulamalarda kullanılan sahtecilik kanıtı tabanlı sistemler gibi belirli ekonomik saldırılara karşı savunmasız değillerdir.    | ZK kanıtları oluşturmak için gereken yüksek hesaplama gücü; düşük verimli uygulamalar için uygun maliyetli değildir.                                                                 |
| Ethereum Ana Ağı'na calldata göndermeyerek kullanıcılar için gaz ücretlerini düşürür.                                                               | Öznel kesinlik süresi (bir ZK kanıtı oluşturmak 10-30 dakika alır) daha yavaştır ancak uyuşmazlık süresi gecikmesi olmadığı için tam kesinliğe daha hızlı ulaşır. |
| İşlem gizliliğini ve ölçeklenebilirliği ön planda tutan alım satım ya da blokzincir oyunları gibi belirli kullanım durumları için uygundur.         | Merkle sahiplik kanıtlarının oluşturulması, zincir dışı verilerin her zaman kullanılabilir olmasını gerektirdiğinden kullanıcıların fon çekmeleri engellenebilir.                    |
| Zincir dışında veri kullanılabilirliği, daha yüksek düzeyde verim sağlar ve ölçeklenebilirliği artırır.                                             | Güvenlik modeli, tamamen kriptografik güvenlik mekanizmalarına dayanan ZK toplamalarının aksine, güven varsayımlarına ve kriptoekonomik teşviklere dayanır.                          |

### Validium/İstemleri kullanın {#use-validium-and-volitions}

Merkeziyetsiz uygulamalarınıza entegre edebileceğiniz Validium ve istemlere ilişkin uygulamalar sağlayan birden çok proje mevcuttur:

**StarkWare StarkEx** - _StarkEx, geçerlilik kanıtlarına dayalı bir Ethereum Katman 2 (L2) ölçeklenebilirlik çözümüdür._ ZK Toplamalarında ya da Validium veri kullanılabilirlik modlarında çalışabilir._

- [Belgeler](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Web sitesi](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter, zkRollup ve parçalama fikirlerini birleştiren hibrit bir yaklaşımla veri kullanılabilirliğini ele alan bir Katman 2 ölçeklendirme protokolüdür._ Her biri kendi veri kullanılabilirliği politikasına sahip, keyfi çok sayıda parçayı destekleyebilir._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Belgeler](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Web sitesi](https://zksync.io/)

## Daha fazla kaynak {#further-reading}

- [Validium ve Katman 2 Karşılaştırması — Sayı No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-toplamalar ve Validium karşılaştırması](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [İstem ve Gelişmekte Olan Veri Kullanılabilirliği Spektrumu](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Toplamalar, Validium'lar ve İstemler: En Popüler Ethereum Ölçeklendirme Çözümleri Hakkında Bilgi Edinin](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Ethereum Toplamaları için Pratik Kılavuz](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
