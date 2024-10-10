---
title: Validium
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak Validium'a giriş.
lang: tr
sidebarDepth: 3
---

Validium, [ZK toplamalar](/developers/docs/scaling/zk-rollups/) gibi geçerlilik kanıtlarını kullanarak işlemlerin bütünlüğünü sağlamaya çalışan ancak işlem verilerini Ethereum ana ağında saklamayan bir [ölçeklendirme çözümü](/developers/docs/scaling/)dür. Zincir dışı veri kullanılabilirliği birtakım artı ve eksileri içinde barındırırken ölçeklenebilirlik tarafında büyük gelişmelere yol açabilir (validium'lar saniyede [~9000 veya daha fazla işlem yapabilir](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Ön Koşullar {#prerequisites}

Bu konuyu anlamak için [Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2) sayfalarını daha önce okumuş olmalısınız.

## Validium nedir? {#what-is-validium}

Validium'lar, Ethereum Ana Ağı'ndaki işlemleri zincir dışı veri kullanılabilirliği ve hesaplama yoluyla işleyerek çıktı hacmini artırmak için tasarlanmış ölçeklendirme çözümleridir. Sıfır bilgi toplamaları (ZK toplamaları) gibi validium'lar da Ethereum'daki zincir dışı işlemleri doğrulamak için [sıfır bilgi kanıtları](/glossary/#zk-proof) yayımlar. Bu da geçersiz durum geçişlerini önler ve validium zincirinin güvenlik garantisini artırır.

Bu "doğruluk kanıtları", ZK-SNARK'lar (Sıfır Bilgi Öz ve Etkileşimli Olmayan Bilgi Argümanı) ya da ZK-STARK'lar (Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanı) şeklinde olabilir. [Sıfır bilgi kanıtları](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/) hakkında daha fazla bilgi.

Validium kullanıcılarına ait fonlar, Ethereum üzerinde akıllı bir sözleşme ile kontrol edilir. Validiumlar, ZK toplamaları gibi neredeyse anında para çekme olanağı sunar; para çekme talebinin geçerlilik kanıtı ana ağda doğrulandıktan sonra, kullanıcılar işlemin [Merkle kanıtını](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sağlayarak para çekebilirler. Merkle kanıtı, kullanıcının para çekme işleminin doğrulanmış bir işlem grubuna dahil edildiğini doğrulayarak zincir üstü sözleşmenin para çekme işlemini yapmasına olanak tanır.

Ancak validium kullanıcıları fonlarını dondurabilir ve çekme işlemlerini kısıtlayabilir. Validium zincirindeki veri kullanılabilirliğini yönetenler, kullanıcılardan zincir dışı durum verilerini saklarsa bu durum meydana gelebilir. Kullanıcılar, işlem verilerine erişimleri olmadan fonların sahipliğini kanıtlamak ve para çekme işlemlerini gerçekleştirmek için gereken Merkle kanıtını hesaplayamazlar.

Validium'lar ve ZK toplamaları arasındaki en büyük fark, veri kullanılabilirliği spektrumundaki konumlarıdır. Her iki çözüm de veri depolamaya farklı açılardan yaklaşırken bunun güvenlik ve güven gerektirmezlik üzerinde farklı etkileri vardır.

## Validium'lar Ethereum ile nasıl etkileşime girer? {#how-do-validiums-interact-with-ethereum}

Validium'lar, mevcut Ethereum zinciri üzerine inşa edilmiş ölçeklendirme protokolleridir. İşlemleri zincir dışında yürütmesine rağmen bir validium zinciri, aşağıdakiler de dahil olmak üzere Ana Ağ'da dağıtılan bir dizi akıllı sözleşme tarafından yönetilir:

1. **Doğrulayıcı sözleşmesi**: Doğrulayıcı sözleşmesi, durum güncellemeleri yapılırken validium operatörü tarafından sunulan kanıtların geçerliliğini doğrular. Bu doğrulama, zincir dışı işlemlerin doğruluğunu tasdik eden doğruluk kanıtlarını ve zincir dışı işlem verilerinin varlığını doğrulayan veri kullanılabilirliği kanıtlarını içerir.

2. **Ana sözleşme **: Ana sözleşme, blok üreticileri tarafından sunulan durum taahhütlerini (Merkle köklerini) depolar ve doğruluk kanıtı zincir üzerinde doğrulandıktan sonra validium'un durumunu günceller. Bu sözleşme, aynı zamanda validium zincirine para yatırma ve çekme işlemlerini de gerçekleştirir.

Validium'lar, aşağıdaki konularda Ethereum ana zincirine bağımlıdır:

### Uzlaşma {#settlement}

Validium üzerinde gerçekleştirilen işlemler, bir üst incir geçerliliklerini doğrulayana kadar tam olarak doğrulanamaz. Bir validium üzerinde yürütülen tüm işler sonunda Ana Ağ'da uzlaştırılmalıdır. Ethereum blokzinciri ayrıca validium kullanıcıları için "uzlaşma garantileri" sağlar; bu, zincir dışı işlemlerin zincir üzerinde gerçekleştirildikten sonra geri alınamayacağı veya değiştirilemeyeceği anlamına gelir.

### Güvenlik {#security}

Uzlaşma katmanı görevi gören Ethereum, validium üzerindeki durum geçişlerinin geçerliliğini de garanti eder. Validium zincirinde yürütülen zincir dışı işlemler, Ethereum üzerinde bir akıllı sözleşme aracılığıyla doğrulanır.

Zincir üstü doğrulayıcı sözleşmesi kanıtı geçersiz bulursa işlemler reddedilir. Bu da, operatörlerin validium'un durumunu güncellemeden önce Ethereum protokolü tarafından uygulanan geçerlilik koşullarının karşılanması gerektiği anlamına gelir.

## Validium nasıl çalışır? {#how-does-validium-work}

### İşlemler {#transactions}

Kullanıcılar, validium zincirinde işlemleri yürütmekten sorumlu bir düğüm olan operatöre işlemleri gönderir. Validium'ların bazıları, zinciri yürütmek için tek bir operatör kullanabilir veya dönüşümlü operatörler için bir [hisse ispatı (PoS)](/developers/docs/consensus-mechanisms/pos/) mekanizmasına güvenebilir.

Operatör, işlemleri bir yığın halinde toplar ve kanıtlanmak üzere bir kanıtlama devresine gönderir. Kanıtlama devresi, işlem yığınını (ve diğer ilgili verileri) girdi olarak kabul eder ve işlemlerin doğru şekilde gerçekleştirildiğini doğrulayan bir doğruluk kanıtı sunar.

### Durum taahhütleri {#state-commitments}

Validium'un durumu, kökü Ethereum'daki ana sözleşmede saklanacak şekilde bir Merkle ağacı olarak karma hale getirilir. Durum kökü olarak da bilinen Merkle kökü, validium üzerindeki hesapların ve bakiyelerin mevcut durumu hakkında kriptografik bir taahhüt görevi görür.

Bir durum güncellemesi gerçekleştirmek için operatörün (işlemleri yürüttükten sonra) yeni bir durum kökü hesaplaması ve bunu zincir üstü sözleşmeye göndermesi gerekir. Doğruluk kanıtı doğrulanırsa önerilen durum kabul edilir ve validium yeni durum köküne geçer.

### Yatırma ve çekme işlemleri {#deposits-and-withdrawals}

Kullanıcılar, zincir üstü sözleşmeye ETH (veya herhangi bir ERC uyumlu jeton) yatırarak fonları Ethereum'dan validium'a taşırlar. Sözleşme, kullanıcının yatırdığı miktar ile eşit miktarda varlığı kullanıcının zincir dışı validium'daki adresine aktarır. Operatör ayrıca bu yatırma işlemini yeni bir partiye dahil eder.

Bir validium kullanıcısı, fonları Ana Ağ'a geri çekmek için bir çekme işlemi başlatır ve bunu, çekme talebini doğrulayan ve bir partiye dahil eden operatöre gönderir. Kullanıcının validium zincirindeki varlıkları da sistemden çıkarılmadan önce yok edilir. Kullanıcı, Ana Ağ'a gönderilen işlem grubuyla ilişkili doğruluk kanıtı doğrulandıktan sonra ana sözleşmeden ilk yatırdığı miktarın geri kalanını çekebilir.

Validium protokolü, sansür karşıtı bir mekanizma olarak kullanıcıların operatöre başvurmadan doğrudan validium sözleşmesinden çekilmelerine olanak tanır. Bu durumda, kullanıcıların doğrulayıcı sözleşmesine hesabın durum köküne dahil edildiğini gösteren bir Merkle kanıtı sunması gerekir. Kanıt kabul edilirse, kullanıcı fonlarını validium'dan çıkarmak için ana sözleşmenin çekme işlevini çağırabilir.

### Toplu gönderme {#batch-submission}

Operatör, toplu işlemler gerçekleştirdikten sonra ilişkili doğruluk kanıtını doğrulayıcı sözleşmesine gönderir ve ana sözleşmeye yeni bir durum kökü önerir. Kanıt geçerliyse, ana sözleşme validium'un durumunu günceller ve partideki işlemlerin sonucunu nihai hale getirir.

Bir ZK toplamasının aksine, validium'daki blok üreticilerinin işlem partileri (yalnızca blok başlıkları) için işlem verilerini yayımlamaları gerekmez. Bu da validium'u, ana Ethereum zincirindeki durum verilerini `calldata` olarak yayımlayan "hibrit" ölçeklendirme protokollerinin (yani [katman 2](/layer-2/)) aksine tamamen zincir dışı bir ölçekleme protokolü yapar.

### Veri uygunluğu {#data-availability}

Validium operatörleri, belirtildiği gibi Ethereum Ana Ağı'nın tüm işlem verilerinin depoladığı bir zincir dışı veri kullanılabilirliği modeli ile çalışır. Validium'un zincir üstündeki verilerinin kapladığı düşük alan, ölçeklenebilirliği artırır (verim, Ethereum'un veri işleme kapasitesiyle sınırlı değildir) ve kullanıcı ücretlerini azaltır (`calldata` yayımlama maliyeti daha düşüktür).

Ancak zincir dışı veri kullanılabilirliği bir sorun teşkil eder: Merkle kanıtları oluşturmak veya doğrulamak için gerekli olan veriler kullanılamayabilir. Operatörlerin kötü niyetli davranması durumunda kullanıcılar zincir üstündeki sözleşmeden fon çekemeyebilir.

Çeşitli validium çözümleri, bu sorunu durum verilerinin tutulduğu depolamayı merkeziyetsizleştirerek çözmeyi amaçlar. Bu, blok üreticilerini zincir dışı verileri depolamaktan ve istek üzerine kullanıcılara sunmaktan sorumlu "veri kullanılabilirliği yöneticilerine" veri göndermeye zorlamayı içerir.

Validium'daki veri kullanılabilirliği yöneticileri, her validium partisini imzalayarak zincir dışı işlemler için verilerin kullanılabilirliğini tasdik eder. Bu imzalar, zincir üstü doğrulayıcı sözleşmesinin durum güncellemelerini onaylamadan önce kontrol ettiği "kullanılabilirlik kanıtının" bir biçimini teşkil eder.

Validium'lar, veri kullanılabilirliği yönetimine yaklaşımları açısından farklılıklar gösterirler. Bazıları durum verilerini depolamak için güvenilir tarafları kullanırken bazıları da görev için rastgele atanmış doğrulayıcıları kullanır.

#### Veri kullanılabilirliği kurulu (DAC) {#data-availability-committee}

Bazı validium çözümleri, zincir dışı verilerin kullanılabilirliğini garanti altına almak için durumun kopyalarını depolamak ve veri kullanılabilirliği kanıtı sağlamak üzere toplu olarak veri kullanılabilirliği kurulu (DAC) olarak da bilinen bir grup güvenilir kuruluşu kullanır. DAC'lerin uygulanması daha kolaydır ve üyelik düşük olduğu için daha az koordinasyon gerektirir.

Bununla birlikte kullanıcılar, gerektiğinde (örneğin, Merkle kanıtları oluşturmak için) verileri kullanılabilir hale getirmesi için DAC'ye güvenmek zorundadır. Veri kullanılabilirliği kurullarının üyelerinin sonrasında zincir dışı verileri saklayabilen [kötü niyetli bir aktör tarafından ele geçirilmesi](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) olasılığı vardır.

[Validium'lardaki veri kullanılabilirliği kurulları hakkında daha fazla bilgi](https://medium.com/starkware/data-availability-e5564c416424).

#### Teminatlı veri kullanılabilirliği {#bonded-data-availability}

Diğer validium'lar, katılımcıların rollerini üstlenmeden önce jetonları akıllı bir sözleşmede kilitlemek için çevrimdışı veri depolamakla yükümlü olmalarını gerektirir. Bu kilit, veri kullanılabilirliği yöneticileri arasında dürüst davranışı garanti altına almak için bir "teminat" görevi görür ve güven varsayımlarını azaltır. Bu katılımcılar veri kullanılabilirliğini kanıtlayamazlarsa, teminat kesilir.

Teminatlı bir veri kullanılabilirliği şemasında, gerekli kilidi sağlayan herkes zincir dışı verileri tutmakla görevlendirilebilir. Bu, uygun veri kullanılabilirliği yöneticileri havuzunu genişleterek veri kullanılabilirliği kurullarını (DAC'ler) etkileyen merkezileşmeyi azaltır. Daha da önemlisi, bu yaklaşım, validium'da çevrimdışı verileri güvence altına almak için güvenilir taraflar atamaktan çok daha güvenli olan kötü amaçlı faaliyetleri önlemek için kripto ekonomik teşviklere dayanır.

[Validium'larda teminatlı veri kullanılabilirliği konusunda daha fazla bilgi](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## İstemler ve validium {#volitions-and-validium}

Validium birçok avantaj sunsa da bunları elde ederken başka şeylerden vazgeçmeniz gerekir (en önemlisi, veri kullanılabilirliğidir). Birçok ölçeklendirme çözümünde olduğu gibi validiumlar da belirli kullanım durumlarına uygundur ve istemler işte bu nedenle oluşturulmuştur.

İstemler, ZK toplamaları ile validium'ları bir araya getirerek kullanıcıların bu iki ölçeklendirme çözümü arasında geçişler yapmasını sağlar. İstemler sayesinde kullanıcılar, belirli işlemler için validium'un zincir dışı veri kullanılabilirliğinden yararlanabilirken gerektiğinde zincir içi veri kullanılabilirliği çözümlerine (zk toplamaları) geçme özgürlüğünü de korur. Bu, kullanıcılara aslında kendi özel durumlarına göre neyi tercih edip neyden vazgeçeceklerini tercih etme özgürlüğü verir.

Merkeziyetsiz bir borsa (DEX), yüksek miktarlı işlemler için validium'un ölçeklenebilir ve özel altyapısını kullanmayı tercih edebilir. Ayrıca ZK toplamalarının daha yüksek güvenlik garantilerini ve güven gerektirmezliğini isteyen kullanıcılar için ZK toplamaları da kullanabilir.

## Validium'lar ve EVM uyumluluğu {#validiums-and-evm-compatibility}

ZK toplamaları gibi validium'lar da en çok jeton takasları ve ödemeler gibi basit uygulamalar için uygundur. Sıfır bilgili ispat kullanan bir devrede [EVM](/developers/docs/evm/) talimatlarını kanıtlamanın önemli yükü göz önüne alındığında, validium'lar arasında genel hesaplamayı ve akıllı sözleşme yürütmeyi desteklemek zordur.

Bazı validium projeleri, EVM uyumlu dilleri (örn. Solidity, Vyper) verimli kanıtlama için optimize edilmiş özel bayt kodu oluşturmak üzere derleyerek bu sorunu aşmaya çalışır. Bu yaklaşımın dezavantajlarından biri, yeni sıfır bilgili ispat dostu VM'lerin önemli EVM işlem kodlarını desteklememe olasılığı ve aynı zamanda geliştiricilerin en iyi deneyim için doğrudan üst düzey dilde yazmaları gerekliliğidir. Bu da, daha fazla sorun yaratır: geliştiricileri tamamen yeni bir geliştirme yığınıyla uygulamalar oluşturmaya zorlar ve mevcut Ethereum altyapısıyla uyumluluğu bozar.

Ancak bazı ekipler, ZK ispatlı devreler için mevcut EVM işlem kodlarını optimize etmeye çalışıyor. Bu, program yürütmenin doğruluğunu doğrulamak için kanıtlar üreten EVM uyumlu bir VM olan sıfır bilgili bir Ethereum Sanal Makinası'nın (zkEVM) geliştirilmesiyle sonuçlanacaktır. Validium zincirleri zkEVM sayesinde akıllı sözleşmeleri zincir dışında yürütebilir ve Ethereum üzerinde zincir dışı bir hesaplamayı (yeniden yürütmek zorunda kalmadan) doğrulamak için doğruluk kanıtları sunabilir.

[zkEVM'ler hakkında daha fazla bilgi](https://www.alchemy.com/overviews/zkevm).

## Validium'lar Ethereum'u nasıl ölçeklendirir? {#scaling-ethereum-with-validiums}

### 1. Zincir dışında veri depolama {#off-chain-data-storage}

İyimser toplamalar ve ZK toplamaları gibi katman 2 ölçeklendirme projeleri, bazı işlem verilerini L1'de yayımlayarak saf zincir dışında ölçeklendirme protokollerinin (örneğin [Plazma](/developers/docs/scaling/plasma/)) sonsuz ölçeklenebilirliğini güvenlik için takas ederler. Bu da toplamaların ölçeklenebilirlik özelliklerinin Ethereum Ana Ağı üzerindeki veri bant genişliği ile sınırlı olduğu anlamına gelir ([veri parçalama](/roadmap/danksharding/) tam da bu nedenle Ethereum'un veri depolama kapasitesini geliştirmeyi önerir).

Validium'lar, tüm işlem verilerini zincir dışında tutarak ve sadece durum güncellemelerini ana Ethereum zincirine aktarmak için durum taahhütlerini (ve doğruluk kanıtlarını) göndererek ölçeklenebilirliğe ulaşır. Bununla birlikte doğruluk kanıtlarının varlığı, validium'lara Plazma ve [yan zincirler](/developers/docs/scaling/sidechains/) dahil olmak üzere diğer saf zincir dışı ölçeklendirme çözümlerinden daha yüksek güvenlik garantileri sağlar. Validium tasarımları, Ethereum'un zincir dışı işlemleri doğrulamadan önce işlemesi gereken veri miktarını azaltarak Ana Ağ'da verimi büyük ölçüde artırır.

### 2. Özyinelemeli kanıtlar {#recursive-proofs}

Özyinelemeli kanıt, diğer kanıtların geçerliliğini doğrulayan bir doğruluk kanıtıdır. Bu "kanıt kanıtları", önceki tüm kanıtları doğrulayan son bir kanıt oluşturulana kadar birden çok kanıtın özyinelemeli olarak toplanmasıyla oluşturulur. Özyinelemeli kanıtlar, doğruluk kanıtı başına doğrulanabilecek işlem sayısını artırarak blokzincirlerin işleme hızlarını ölçeklendirir.

Genellikle, validium operatörünün doğrulama için Ethereum'a sunduğu her doğruluk kanıtı tek bir bloğun bütünlüğünü doğrular. Tek bir özyinelemeli kanıt, aynı anda birkaç validium bloğunun geçerliliğini doğrulamak için kullanılabilir; bu mekanizma, kanıtlama devresi birkaç blok kanıtını tekrarlı bir şekilde tek bir son kanıtta toplayabildiği için mümkündür. Zincir üstü doğrulayıcı sözleşmesi özyinelemeli kanıtı kabul ederse, altındaki tüm bloklar hemen sonuçlandırılır.

## Validium'un artıları ve eksileri {#pros-and-cons-of-validium}

| Artıları                                                                                                                                         | Eksileri                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Doğruluk kanıtları, zincir dışı işlemlerin bütünlüğünü şart koşar ve operatörlerin geçersiz durum güncellemelerini sonuçlandırmasını engeller.   | Doğruluk kanıtları üretmek özel donanım gerektirir ve bu durum, merkezileştirme açısından risk teşkil eder.                                                       |
| Kullanıcılar için sermaye verimliliğini artırır (fonları Ethereum'a geri çekmede gecikme olmaz)                                                  | Akıllı sözleşmeler/genel hesaplamalar için sınırlı destek; geliştirme için özel diller gereklidir.                                                                |
| Yüksek değere sahip uygulamalarda kullanılan sahtecilik kanıtı tabanlı sistemler gibi belirli ekonomik saldırılara karşı savunmasız değillerdir. | ZK kanıtları oluşturmak için gereken yüksek hesaplama gücü; düşük verimli uygulamalar için uygun maliyetli değildir.                                              |
| Ethereum Ana Ağı'na calldata göndermeyerek kullanıcılar için gaz ücretlerini düşürür.                                                            | Öznel kesinlik süresi (bir ZK kanıtı oluşturmak 10-30 dakika alır) daha yavaştır ancak uyuşmazlık süresi gecikmesi olmadığı için tam kesinliğe daha hızlı ulaşır. |
| İşlem gizliliğini ve ölçeklenebilirliği ön planda tutan alım satım ya da blokzincir oyunları gibi belirli kullanım durumları için uygundur.      | Merkle sahiplik kanıtlarının oluşturulması, zincir dışı verilerin her zaman kullanılabilir olmasını gerektirdiğinden kullanıcıların fon çekmeleri engellenebilir. |
| Zincir dışında veri kullanılabilirliği, daha yüksek düzeyde verim sağlar ve ölçeklenebilirliği artırır.                                          | Güvenlik modeli, tamamen kriptografik güvenlik mekanizmalarına dayanan ZK toplamalarının aksine, güven varsayımlarına ve kriptoekonomik teşviklere dayanır.       |

### Validium/İstemler kullanın {#use-validium-and-volitions}

Merkeziyetsiz uygulamalarınıza entegre edebileceğiniz Validium ve istemlere ilişkin uygulamalar sağlayan birden çok proje mevcuttur:

**StarkWare StarkEx** - _StarkEx doğruluk kanıtlarını kullanan bir Ethereum Katman 2 (L2) ölçeklenebilirlik çözümüdür. ZK Toplamalarında ya da Validium veri kullanılabilirlik modlarında çalışabilir._

- [Belgeler](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Web sitesi](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter, zkRollup ve parçalama fikirlerini birleştirerek veri kullanılabilirliğini hibrit bir yaklaşımla ele alan bir Katman 2 ölçeklendirme protokolüdür. Her biri kendi veri kullanılabilirliği politikasına sahip, keyfi çok sayıda parçayı destekleyebilir._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Belgeler](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [Web sitesi](https://zksync.io/)

## Daha fazla okuma {#further-reading}

- [Validium ve Katman 2 Yan Yana - Sayı No: 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK toplamaları ve Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [İstem ve Yükselen Veri Kullanılabilirliği spektrumu](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Toplamalar, Validium'lar ve İstemler: En Yeni Ethereum Ölçeklendirme Çözümleri Hakkında Bilgi Edinin](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
