---
title: "Sıfır-bilgi toplamaları"
description: "Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olan sıfır-bilgi toplamaları'na giriş."
lang: tr
---

Sıfır bilgi toplamaları (ZK-toplamaları), hesaplamayı ve durum depolamayı zincir dışına taşıyarak Ethereum Ana Ağı'ndaki iş hacmini artıran katman 2 [ölçeklendirme çözümleridir](/developers/docs/scaling/). ZK-toplamaları, bir gruptaki binlerce işlemi gerçekleştirip sonrasında asgari büyüklükte bir özetini Ana Ağ'a aktarabilir. Bu özet veriler, Ethereum durumunda yapılması gereken değişiklikleri ve bu değişikliklerin doğru olduğuna dair bazı kriptografik kanıtları tanımlar.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2) hakkındaki sayfamızı okuyup anlamış olmalısınız.

## Sıfır-Bilgi Toplamaları nedir? {#what-are-zk-rollups}

**Sıfır bilgi toplamaları (ZK-toplamaları)**, zincir dışında yürütülen işlemleri gruplar halinde bir araya getirir (veya 'toplar'). Zincir dışı hesaplamalar, blokzincire gönderilmesi gereken veri miktarını azaltır. SB-toplamaları tüm işlemleri ayrı ayrı göndermek yerine bütün işlemleri temsil eden bir özet yığını gönderir. Ayrıca değişikliklerinin doğruluğunu kanıtlamak için [doğruluk kanıtları](/glossary/#validity-proof) üretirler.

ZK-toplamasının durumu, Ethereum ağına dağıtılmış bir akıllı sözleşme ile sürdürülür. Bu durumu güncellemek için ZK-toplama düğümleri doğrulama amaçlı bir doğruluk kanıtı sunmak zorundadır. Bahsedildiği üzere doğruluk kanıtı, toplama tarafından önerilen durum değişikliğinin gerçekten verilen toplu işlemin yürütülmesinin sonucu olduğuna dair kriptografik bir güvencedir. Bu, ZK-toplamalarının, [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi tüm işlem verilerini zincir üstünde yayımlamak yerine, Ethereum'daki işlemleri sonuçlandırmak için yalnızca doğruluk kanıtları sağlaması gerektiği anlamına gelir.

Fonları ZK-toplamasından Ethereum'a taşırken gecikme olmaz; çünkü çıkış işlemleri, ZK-toplama sözleşmesi doğruluk kanıtını doğruladıktan sonra yürütülür. Tersine, iyimser toplamlardan para çekme, herhangi birinin çıkış işlemine bir [sahtecilik kanıtı](/glossary/#fraud-proof) ile itiraz etmesine izin vermek için bir gecikmeye tabidir.

ZK-toplamaları işlemleri Ethereum'a `calldata` olarak yazar. `calldata`, akıllı sözleşme işlevlerine yapılan harici çağrılara dahil edilen verilerin depolandığı yerdir. `calldata` içindeki bilgiler, blokzincirde yayımlanır ve herkesin toplamanın durumunu bağımsız olarak yeniden yapılandırmasına olanak tanır. ZK-toplamaları işlem verilerini azaltmak için sıkıştırma teknikleri kullanır. Örneğin hesaplar adres yerine bir indeksle temsil edilir ve bu işlem 28 baytlık veri tasarrufu sağlar. Zincir üstü veri yayımlama, toplamalar için önemli bir maliyettir, bu nedenle veri sıkıştırması kullanıcı ücretlerini azaltabilir.

## ZK-toplamaları Ethereum ile nasıl etkileşime girer? ZK-toplamaları ve Ethereum {#zk-rollups-and-ethereum}

Bir ZK-toplama zinciri, Ethereum blokzincirinin üzerinde çalışan ve zincir üstü Ethereum akıllı sözleşmeleri tarafından yönetilen zincir dışı bir protokoldür. ZK-toplamaları işlemleri Ana Ağ'ın dışında gerçekleştirir, fakat zincir dışı işlem gruplarını periyodik olarak bir zincir üstü toplama sözleşmesine işler. Bu işlem kaydı, Ethereum blokzinciri gibi değişmezdir ve ZK-toplama zincirini oluşturur.

ZK-toplamaların ana mimarisi şu bileşenlerden oluşur:

1. **Zincir üstü sözleşmeler**: Bahsedildiği gibi, ZK-toplama protokolü, Ethereum'da çalışan akıllı sözleşmeler tarafından kontrol edilir. Bu, toplama bloklarını depolayan, yatırımları takip eden ve durum güncellemelerini gözlemleyen ana sözleşmeyi içerir. Başka bir zincir üstü sözleşme (doğrulayıcı sözleşmesi), blok üreticileri tarafından gönderilen sıfır bilgi kanıtlarını doğrular. Böylece Ethereum, ZK-toplaması için ana katman veya "katman 1" olarak hizmet verir.

2. **Zincir dışı sanal makine (VM)**: ZK-toplama protokolü Ethereum üzerinde var olsa da, işlem yürütme ve durum depolaması, [EVM](/developers/docs/evm/)'den bağımsız ayrı bir sanal makinede gerçekleşir. Bu zincir dışı VM, ZK-toplaması üzerindeki işlemler için yürütme ortamıdır ve ZK-toplama protokolü için ikincil katman veya "katman 2" olarak hizmet verir. Ethereum Ana Ağı'nda doğrulanan doğruluk kanıtları, zincir dışı VM'deki durum geçişlerinin doğruluğunu garanti eder.

ZK-toplamaları, bağımsız çalışan ancak güvenliğini Ethereum'dan alan zincir dışı protokoller olan "hibrit ölçeklendirme çözümleri"dir. Özel olarak, Ethereum ağı ZK-toplamasındaki durum güncellemelerinin doğruluğunu şart koşar ve toplamanın durumuna yapılacak her güncellemenin arkasındaki verinin kullanılabilirliğini garanti eder. Sonuç olarak ZK-toplamaları, kendi güvenlik özelliklerinden sorumlu olan [yan zincirler](/developers/docs/scaling/sidechains/) veya Ethereum'daki işlemleri doğruluk kanıtlarıyla doğrulayan ancak işlem verilerini başka bir yerde depolayan [validium'lar](/developers/docs/scaling/validium/) gibi tamamen zincir dışı ölçeklendirme çözümlerinden oldukça daha güvenlidir.

ZK-toplamaları aşağıdaki hususlarda ana Ethereum protokolüne dayalıdır:

### Veri kullanılabilirliği {#data-availability}

ZK-toplamaları, zincir dışında işlenen her işlemin durum verilerini Ethereum'da yayımlar. Bu veriyle, birey ve şirketlerin toplamanın durumunu yeniden oluşturmaları ve zinciri kendileri doğrulamaları mümkün olur. Ethereum, bu verileri ağdaki tüm katılımcıların kullanımına `calldata` olarak sunar.

Doğruluk kanıtları, durum geçişlerinin özgünlüğünü zaten doğruladığı için ZK-toplamalarının zincir üstünde çok fazla işlem verisi yayımlamasına gerek yoktur. Bununla birlikte, verileri zincir üstünde depolamak hala önemlidir çünkü bu, L2 zincirinin durumunun izinsiz, bağımsız olarak doğrulanmasına olanak tanır ve bu da, kötü niyetli operatörlerin zinciri sansürlemesini veya dondurmasını önleyerek herkesin işlem grupları göndermesine olanak tanır.

Kullanıcıların toplama ile etkileşime girmesi için zincir üstü gereklidir. Durum verisine erişim olmadan kullanıcılar hesap bakiyelerini sorgulayamaz ya da durum bilgisine (çekim işlemleri gibi) dayanan işlemleri başlatamazlar.

### İşlem kesinliği {#transaction-finality}

Ethereum ZK-toplamaları için bir uzlaşma katmanı gibi hareket eder: K2 işlemleri ancak K1 sözleşmesi doğruluk kanıtını kabul ederse kesinleşir. Bu, her işlemin Ana Ağ'da onaylanması gerektiği için kötü niyetli operatörlerin zinciri bozması (örn. toplama fonlarını çalmak) riskini ortadan kaldırır. Ayrıca Ethereum, L1'de sonlandırıldıktan sonra kullanıcı işlemlerinin geri alınamayacağını garanti eder.

### Sansür direnci {#censorship-resistance}

Çoğu ZK-toplaması, işlemleri yürüten, grupları üreten ve blokları L1'e gönderen bir "üst düğüm" (operatör) kullanır. Bu, verimliliği sağlarken sansür riskini de artırır: kötü niyetli ZK-toplaması operatörleri, işlemlerini gruplara dahil etmeyi reddederek kullanıcıları sansürleyebilir.

Bir güvenlik tedbiri olarak ZK-toplamaları, operatör tarafından sansürlendiklerini düşünen kullanıcıların işlemlerini doğrudan Ana Ağ'daki toplama sözleşmesine göndermelerini sağlar. Bu, kullanıcıların operatörün iznine ihtiyaç duymadan ZK-toplamasından Ethereum'a çıkışı zorlamalarına olanak sağlar.

## ZK-toplamaları nasıl çalışır? {#how-do-zk-rollups-work}
### İşlemler {#transactions}

ZK-toplamasındaki kullanıcılar, işlemleri imzalar ve işleme ve sonraki gruba dahil edilmeleri için L2 operatörlerine gönderir. Bazı durumlarda operatör, sıralayıcı olarak adlandırılan merkezileşmiş bir varlıktır ve işlemleri yürütür, gruplara toplar ve L1'e gönderir. Sıralayıcı, bu sistemde L2 bloğu oluşturmaya ve ZK-toplama sözleşmesine toplama işlemleri eklemeye izinli tek varlıktır.

Diğer ZK-toplamaları, bir [hisse ispatı](/developers/docs/consensus-mechanisms/pos/) doğrulayıcı seti kullanarak operatör rolünü döndürebilir. Potansiyel operatörler, toplama sözleşmesine fon yatırır; her payın büyüklüğü, paydaşın bir sonraki toplama grubunu oluşturmak için seçilme şansını etkiler. Operatörün payı eğer kötü niyetli davranması halinde kesilebilir, bu da geçerli bloklar göndermeleri için onları teşvik eder.

#### ZK-toplamaları Ethereum'da işlem verilerini nasıl yayınlar {#how-zk-rollups-publish-transaction-data-on-ethereum}

Açıklandığı gibi, işlem verileri Ethereum'da `calldata` olarak yayınlanır. `calldata`, bir akıllı sözleşmede bir fonksiyona argümanlar aktarmak için kullanılan ve [belleğe](/developers/docs/smart-contracts/anatomy/#memory) benzer şekilde davranan bir veri alanıdır. `calldata`, Ethereum'un durumunun bir parçası olarak saklanmaz, Ethereum zincirinin [geçmiş günlüklerinin](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) bir parçası olarak zincir üstünde kalıcıdır. `calldata`, Ethereum'un durumunu etkilemediği için zincir üstünde veri depolamanın ucuz bir yoludur.

`calldata` anahtar kelimesi genellikle bir işlem tarafından çağrılan akıllı sözleşme yöntemini tanımlar ve yönteme yapılan girdileri rastgele bir bayt dizisi şeklinde tutar. ZK-toplamaları sıkıştırılmış işlem verilerini zincir üstünde yayımlamak için `calldata` kullanır; toplama operatörü, toplama sözleşmesindeki gerekli işlevi çağırarak yeni bir grup ekler ve sıkıştırılmış verileri işlev argümanları olarak geçirir. Toplama ücretlerinin büyük bir kısmı işlem verilerini zincir üstünde depolamaya gittiğinden bu, kullanıcılar için maliyetlerin azaltılmasına yardımcı olur.

### Durum taahhütleri {#state-commitments}

L2 hesaplarını ve bakiyelerini içeren ZK-toplamasının durumu, bir [Merkle ağacı](/whitepaper/#merkle-trees) olarak temsil edilir. Merkle ağacının kökünün (Merkle kökü) kriptografik bir karması zincir üstü sözleşmede saklanır ve bu da toplama protokolünün ZK-toplamasının durumundaki değişiklikleri izlemesine olanak tanır.

Toplama, yeni bir işlem grubunun yürütülmesinin ardından yeni bir duruma geçer. Durum geçişini başlatan operatörün yeni bir durum kökü hesaplaması ve bunu zincir üstü sözleşmeye göndermesi gerekir. Grupla ilgili olan doğruluk kanıtının geçerliliği, doğrulayıcı sözleşmesi tarafından ispatlanmışsa, yeni Merkle kökü ZK-toplamasının meşru durum kökü olur.

ZK-toplaması operatörü, durum köklerini hesaplamak dışında, bir gruptaki tüm işlemleri içeren ve Merkle ağacının kökü olangrup kökü de oluşturur. Yeni bir grup gönderildiğinde toplama sözleşmesi grup kökünü saklar, böylece kullanıcılar bir işlemin (örneğin, bir çekme talebi) gruba dahil edildiğini kanıtlayabilir. Kullanıcıların işlem ayrıntılarını, grup kökünü ve dahil etme yolunu gösteren bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sağlaması gerekir.

### Doğruluk kanıtları {#validity-proofs}

ZK-toplama operatörünün Ethereum L1 sözleşmesine gönderdiği yeni durum kökü, toplamanın durumundaki güncellemelerin sonucudur. Diyelim ki Alice, Bob'a 10 jeton gönderiyor, operatör sadece Alice'in bakiyesini 10 azaltır ve Bob'un bakiyesini 10 artırır. Operatör daha sonra güncellenmiş hesap verilerini karma hale getirir, toplamanın Merkle ağacını yeniden oluşturur ve yeni Merkle kökünü zincir üstü sözleşmeye gönderir.

Ancak toplama sözleşmesi, operatörün önerilen durum taahhüdünü, operatör yeni Merkle kökünün toplama durumunun doğru güncellemelerinden kaynaklandığını kanıtlayana kadar otomatik olarak kabul etmez. ZK-toplama operatörü bunu, gruplanmış işlemlerin doğruluğunu onaylayan kısa bir kriptografik taahhüt olan doğruluk kanıtı üreterek yapar.

Doğruluk kanıtları, tarafların ifadenin kendisi açıklamadan ifadenin doğruluğunu kanıtlamasına olanak tanır; bu nedenle, bunlara aynı zamanda sıfır bilgili ispatlar denir. ZK-toplamaları, işlemleri Ethereum'da yeniden yürütmek zorunda kalmadan zincir dışı durum geçişlerinin doğruluğunu onaylamak için doğruluk kanıtlarını kullanır. Bu kanıtlar, bir [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Sıfır Bilgi Kısa Etkileşimsiz Bilgi Argümanı) veya [ZK-STARK](https://eprint.iacr.org/2018/046) (Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanı) biçiminde olabilir.

Her kanıt türünün kendine özgü özellikleri olmasına rağmen, hem SNARK'lar hem de STARK'lar ZK-toplamalarındaki zincir dışı hesaplamanın bütünlüğünü doğrulamaya yardımcı olur.

**ZK-SNARK'lar**

ZK-SNARK protokolünün çalışabilmesi için Ortak Referans Dizesi (CRS) oluşturmak şarttır: CRS, doğruluk kanıtlarını kanıtlamaya ve doğrulamaya yönelik herkese açık parametreler sağlar. Kanıtlama sisteminin güvenliği, CRS kurulumuna bağlıdır; eğer herkese açık parametreleri oluşturmak için kullanılan bilgiler kötü niyetli aktörlerin eline geçerse, bu kişiler sahte doğruluk kanıtları oluşturabilir.

Bazı ZK-toplamaları, ZK-SNARK devresi için genel parametreler oluşturmak üzere güvenilir kişileri içeren bir [çok taraflı hesaplama töreni (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) kullanarak bu sorunu çözmeye çalışır. Tarafların her biri, CRS'yi oluşturmak için bazı rastgele veriler ( "zararlı atık" olarak adlandırılır) sağlar ve bunları hemen yok etmeleri gerekir.

Güvenilen kurulumlar, CRS kurulumunun güvenliğini artırdığı için kullanılır. En az bir dürüst katılımcı kendi girdisini yok ettiği sürece, ZK-SNARK sisteminin güvenliği garanti altındadır. Ancak bu yaklaşım, sistemin güvenliğini zayıflatmamaları ve örnek rastgele verilerini silmeleri konusunda sürece dahil olan kişilere güvenmeyi gerektirir.

Güven varsayımlarını bir yana bırakırsak, ZK-SNARK'lar küçük kanıt boyutları ve de sabit zamanlı doğrulamaları nedeniyle popülerdir. L1'de kanıt doğrulaması, bir ZK-toplaması çalıştırmanın maliyetinin büyük kısmını teşkil ettiğinden L2'ler, Ana Ağ'da hızlı ve ucuz bir şekilde doğrulanabilen kanıtlar oluşturmak için ZK-Snark'ları kullanır.

**ZK-STARK'lar**

ZK-SNARK'lar gibi ZK-STARK'lar da girdileri açıklamadan zincir dışı hesaplamanın geçerliliğini kanıtlar. Bununla birlikte, ZK-STARK'lar ölçeklenebilirlikleri ve şeffaflıkları nedeniyle ZK-SNARK'lara göre daha gelişmiş olarak kabul edilir.

ZK-STARK'lar, bir Ortak Referans Dizesinin (CRS) güvenilir kurulumu olmadan çalışabildikleri için "şeffaftır". Bunun yerine ZK-STARK'lar, kanıtları oluşturmak ve doğrulamak için parametreler oluşturmak üzere herkese açık olarak doğrulanabilir rastgeleliğe güvenir.

ZK-STARK'lar ayrıca daha fazla ölçeklenebilirlik sağlar çünkü doğruluk kanıtlarını kanıtlamak ve doğrulamak için gereken süre, temel hesaplamanın karmaşıklığına bağlı olarak _yarı doğrusal_ olarak artar. ZK-SNARK'larda, kanıtlama ve doğrulama süreleri, temel hesaplamanın boyutuyla ilişkili olarak _doğrusal_ olarak ölçeklenir. Bu, ZK-STARK'ların büyük veri kümelerinin söz konusu olduğu durumlarda, kanıtlama ve doğrulama için ZK-SNARK'lara göre daha az zamana ihtiyaç duyduğu anlamına gelir ve bu nedenle yüksek hacimli uygulamalar için kullanışlıdır.

ZK-STARK'lar ayrıca kuantum bilgisayarlarına karşı güvenlidir, oysa ZK-SNARK'ların kullanıldığı Elips Eğrisi Kriptografisi'nin (ECC) kuantum bilgisayar saldırılarına karşı savunmasız olduğuna yaygın olarak inanılmaktadır. ZK-STARK'ların dezavantajı, daha büyük ispat boyutları üretmeleridir ve bu boyutları Ethereum üzerinde doğrulamak daha pahalıdır.

#### Doğruluk kanıtları ZK-toplamalarında nasıl çalışır? ZK-toplamalarında doğruluk kanıtları {#validity-proofs-in-zk-rollups}

##### Kanıt oluşturma

Operatör, işlemleri kabul etmeden önce her zamanki kontrolleri gerçekleştirir. Bu, aşağıdakileri doğrulamayı içerir:

- Gönderici ve alıcı hesapların durum ağacının bir parçası olduğunu onaylamak.
- Göndericinin işlemi gerçekleştirmek için yeterli fonu olduğunu onaylamak.
- İşlemin doğru ve göndericinin toplamadaki açık anahtarı ile uyumlu olduğunu onaylamak.
- Göndericinin nonce'unun doğru olduğunu onaylamak vb.

ZK-toplaması düğümü yeterli işleme sahip olduğunda, bunları bir grup haline getirir ve kanıtlama devresinin kısa ve öz bir ZK kanıtı oluşturması için girdileri derler. Bunlar dahildir:

- Grup içindeki tüm işlemleri içeren bir Merkle ağacı kökü.
- İşlemlerin grubun içinde bulunduğunu kanıtlamak için kullanılan Merkle kanıtları.
- İşlemlerdeki her gönderici-alıcı çifti için bu hesapların toplamanın durum ağacının bir parçası olduğunu kanıtlayan Merkle kanıtları.
- Her işlem için durum güncellemeleri uygulandıktan sonra durum kökünü güncelleyerek elde edilen ara durum köklerini kümesi (yani, gönderici hesapları azaltılırken alıcı hesapları artırılır).

Kanıtlama devresi, doğruluk kanıtını her bir işlem üzerinde "döngü" ile hesaplar ve operatörün işlemi işleme almadan önce tamamladığı kontrolleri gerçekleştirir. İlk olarak, sağlanan Merkle kanıtını kullanarak gönderici hesabının mevcut durum kökünün bir parçası olduğunu doğrular. Ardından, göndericinin bakiyesini azaltır, nonce'unu artırır, güncellenmiş hesap verisini karma hale getirir ve bu veriyi Merkle kanıtıyla birleştirerek yeni bir Merkle kökü oluşturur.

Bu Merkle kökü, ZK-toplamalarının durumundaki tek değişikliği yansıtır: göndericinin bakiyesinde ve nonce'unda bir değişiklik. Bu, hesabın varlığını kanıtlamak için kullanılan Merkle kanıtının, yeni durum kökünün türetilmesinde kullanılması sayesinde mümkündür.

Kanıtlama devresi, alıcının hesabında da aynı süreci gerçekleştirir. Kanıtlama devresi, alıcının hesabının ara durum kökü altında var olup olmadığını kontrol eder (Merkle kanıtını kullanarak), bakiyesini artırır, hesap verisini tekrar karma hale getirir ve bu veriyi Merkle kanıtıyla birleştirerek yeni bir durum kökü oluşturur.

Her işlem için süreç tekrarlanır; her "döngü", göndericinin hesabını güncelleyerek yeni bir durum kökü oluşturur ve ardından alıcının hesabını güncelleyerek yeni bir kök oluşturur. Açıklandığı gibi, durum kökünde yapılan her güncelleme, toplamanın durum ağacının bir bölümünün değiştiğini gösterir.

ZK-kanıtlama devresi, tüm işlem grubunu tekrarlar ve son işlem yürütüldükten sonra nihai durum köküne yol açan güncelleme dizisini doğrular. En son hesaplanan Merkle kökü, ZK-toplamasının en yeni meşru durum kökü haline gelir.

##### Kanıt doğrulaması

Kanıtlama devresi durum güncellemelerinin doğruluğunu onayladıktan sonra, L2 operatörü hesaplanan doğruluk kanıtını L1 üzerindeki doğrulayıcı sözleşmesine gönderir. Sözleşmenin doğrulama devresi, kanıtın geçerliliğini doğrular ve kanıtın bir parçası olan genel girdileri kontrol eder:

- **Durum öncesi kök**: ZK-toplamasının, L2 zincirinin son bilinen geçerli durumunu yansıtan eski durum köküdür (yani gruplanmış işlemler yürütülmeden önceki).

- **Durum sonrası kök**: ZK-toplamasının, L2 zincirinin en yeni durumunu yansıtan yeni durum köküdür (yani gruplanmış işlemler yürütüldükten sonraki). Durum sonrası kök, kanıtlama devresindeki durum güncellemeleri uygulandıktan sonra elde edilen son köktür.

- **Grup kökü**: Grubun, grup içindeki işlemlere merkle uygulanması ve ağacın kökünün karma hale getirilmesiyle elde edilen Merkle köküdür.

- **İşlem girdileri**: Gönderilen grubun bir parçası olarak yürütülen işlemlerle ilişkili veriler.

Bu, ispatın devreyi karşılaması (yani, geçerli kabul etmesi) durumunda, toplamanın önceki durumdan (durum öncesi kök tarafından kriptografik olarak parmak izi alınan) yeni bir duruma (durum sonrası kök tarafından kriptografik olarak parmak izi alınan) geçiş yapmasını sağlayan bir geçerli işlemler dizisinin mevcut olduğu anlamına gelir. Durum öncesi kök, toplama sözleşmesinde depolanan kökle eşleşiyorsa ve ispat geçerli ise, toplama sözleşmesi ispattan durum sonrası kökü alır ve durum ağacını, toplamanın değişen durumunu yansıtacak şekilde günceller.

### Girişler ve çıkışlar {#entries-and-exits}

Kullanıcılar, jetonları L1 zincirine dağıtılan toplamanın sözleşmesine yatırarak ZK-toplamasına girer. Bu işlem, toplama sözleşmesine sadece operatörlerin işlem gönderebilmesi nedeniyle sıraya alınır.

Bekleyen yatırma kuyruğu dolmaya başlarsa, ZK-toplama operatörü yatırma işlemlerini alıp toplama sözleşmesine gönderir. Kullanıcının fonları toplamada olduğunda, işlemleri işlenmek üzere operatöre göndererek işlem yapmaya başlayabilir. Kullanıcılar, hesap verilerini karma yaparak toplama sözleşmesine göndermek ve mevcut durum kökünü doğrulamak üzere bir Merkle ispatı sağlamak suretiyle bakiyeyi toplamada doğrulayabilir.

ZK-toplamadan L1'e çekim işlemi basittir. Kullanıcı, toplamadaki varlıklarını belirtilen bir hesaba yakmak üzere göndererek çıkış işlemini başlatır. Operatör işlemi bir sonraki gruba dahil ederse, kullanıcı zincir üstü sözleşmeye bir para çekme talebi gönderebilir. Bu çekme isteği aşağıdakileri içerir:

- Kullanıcı işleminin bir işlem grubundaki yakma hesabına eklendiğini kanıtlayan Merkle kanıtı

- İşlem verileri

- Grup kökü

- Yatırılan fonların alınacağı L1 adresi

Toplama sözleşmesi işlem verilerini karma hale getirir, grup kökünün mevcut olup olmadığını kontrol eder ve ardından Merkle ispatını kullanarak işlem karmasının grup kökünün bir parçası olup olmadığını kontrol eder. Sonrasında sözleşme, çıkış işlemini yürütür ve fonları kullanıcının L1'deki seçilen adresine gönderir.

## ZK-toplamaları ve EVM uyumluluğu {#zk-rollups-and-evm-compatibility}

İyimser toplamaların aksine, ZK-toplamaları [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) ile kolayca uyumlu değildir. Genel amaçlı EVM hesaplamalarını devrelerde kanıtlamak, (önceden açıklanan jeton transferi gibi) basit hesaplamaları kanıtlamaktan daha zordur ve daha fazla kaynak gerektirir.

Ancak, [sıfır bilgi teknolojisindeki gelişmeler](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now), EVM hesaplamasını sıfır bilgi kanıtlarına sarmalamaya yönelik ilgiyi yeniden alevlendiriyor. Bu çabaların hedefi, program yürütmesinin doğruluğunu verimli bir şekilde doğrulayabilen bir sıfır bilgili EVM (zkEVM) uygulaması oluşturmaktır. Bir zkEVM, devrelerde kanıtlama/doğrulama için mevcut EVM işlem kodlarını yeniden oluşturarak akıllı sözleşmelerin yürütülmesine olanak tanır.

Tıpkı EVM gibi zkEVM de bazı girdilerde hesaplama yapıldıktan sonra durumlar arasında geçiş yapar. Aradaki fark, zkEVM'nin ayrıca programın yürütmesinin her adımının doğruluğunu onaylamak için sıfır bilgili ispatlar oluşturmasıdır. Doğruluk kanıtları, VM'nin durumunu (bellek, yığın, depolama) etkileyen işlemlerin doğruluğunu ve işlemin kendisini (yani işlem doğru işlem kodlarını çağırıp bunları doğru şekilde yürüttü mü?) doğrulayabilir.

Geliştiricilerin sıfır bilgili ispatların ölçeklenebilirlik ve güvenlik garantilerinden yararlanmalarına yardımcı olmak amacıyla EVM uyumlu ZK-toplamalarının devreye alınması beklenmektedir. Daha da önemlisi, yerel Ethereum altyapısıyla uyumluluk, geliştiricilerin tanıdık (ve sınamadan geçmiş) araçlar ve diller kullanarak ZK dostu merkeziyetsiz uygulamalar geliştirmelerine olanak tanır.

## ZK-toplama ücretleri nasıl çalışır? {#how-do-zk-rollup-fees-work}

Kullanıcıların ZK-toplamalarında işlemler için ödedikleri ücret, Ethereum Ana Ağı'ndaki gibi gaz ücretine bağlıdır. Ancak gaz ücretleri L2'de farklı şekilde işler ve aşağıdaki maliyetlerden etkilenir:

1. **Durum yazma**: Ethereum'un durumuna yazmanın (yani Ethereum blokzincirinde bir işlem göndermenin) sabit bir maliyeti vardır. ZK-toplamaları, işlemleri gruplayarak ve sabit maliyetleri birden fazla kullanıcıya yayarak bu maliyeti azaltır.

2. **Veri yayımlama**: ZK-toplamaları, her işlem için durum verilerini Ethereum'a `calldata` olarak yayımlar. `calldata` maliyetleri şu anda, sırasıyla sıfır olmayan baytlar için 16 gaz ve sıfır baytlar için 4 gaz `calldata` maliyeti öngören [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) tarafından yönetilmektedir. Her işlemde ödenen maliyet, onun için ne kadar `calldata`'nın zincir üstünde yayımlanması gerektiğine göre etkilenir.

3. **L2 operatör ücretleri**: Bu, Ethereum Ana Ağı'ndaki [işlem "öncelik ücretlerine (bahşişler)"](/developers/docs/gas/#how-are-gas-fees-calculated) benzer şekilde, işlemleri işlerken ortaya çıkan hesaplama maliyetlerinin telafisi olarak toplama operatörüne ödenen tutardır.

4. **Kanıt üretimi ve doğrulaması**: ZK-toplama operatörleri, işlem grupları için doğruluk kanıtları üretmek zorundadır ve bu, yüksek kaynak gerektiren bir işlemdir. Ana Ağ'daki sıfır bilgili ispatları doğrulamanın da gaz maliyeti (~ 500.000 gaz) vardır.

ZK-toplamaları, işlemleri gruplamanın yanı sıra işlem verilerini sıkıştırarak da kullanıcılar için ücretleri azaltır. Ethereum ZK-toplamalarını kullanmanın ne kadara mal olduğuna dair [gerçek zamanlı bir genel bakışı görebilirsiniz](https://l2fees.info/).

## ZK-toplamaları Ethereum'u nasıl ölçeklendirir? ZK-toplamaları ile Ethereum'u ölçeklendirme {#scaling-ethereum-with-zk-rollups}

### İşlem verisi sıkıştırma {#transaction-data-compression}

ZK-toplamaları, hesaplamayı zincir dışına taşıyarak Ethereum'un temel katmanındaki iş hacmini artırır, ancak ölçeklendirme için asıl destek, işlem verilerinin sıkıştırılmasından gelir. Ethereum'un [blok boyutu](/developers/docs/blocks/#block-size), her bloğun tutabileceği veri miktarını ve dolayısıyla blok başına işlenen işlem sayısını sınırlar. ZK-toplamaları, işlemle ilgili verileri sıkıştırarak her blokta işlenen işlem sayısını önemli ölçüde artırır.

ZK-toplamaları, her bir işlemi doğrulamak için gereken tüm veriyi göndermek zorunda olmadıklarından işlem verilerini iyimser toplamalara göre daha iyi sıkıştırabilir. Sadece toplamadaki hesapların ve bakiyelerin son durumunu yeniden oluşturabilmek için gerekli olan minimal veriyi göndermeleri gerekir.

### Özyinelemeli kanıtlar {#recursive-proofs}

Sıfır-bilgili ispatların bir avantajı, ispatların diğer ispatları doğrulayabiliyor olmasıdır. Örneğin, tek bir ZK-SNARK diğer ZK-SNARK'ları doğrulayabilir. Bunun gibi "kanıtların-kanıtları"na, tekrarlanan kanıtlar denir ve bunlar, ZK-toplamalarındaki verimliliği önemli ölçüde artırırlar.

Güncel olarak, doğruluk kanıtları bloktan bloğa temelinde oluşturur ve doğrulama için L1 sözleşmesine gönderilir. Bununla birlikte, tekli blok kanıtlarını onaylamak ZK-toplamalarının ulaşabileceği verimliliği sınırlar; çünkü operatör bir kanıt gönderdiğinde sadece tek bir blok sonlandırılabilir.

Öte yandan tekrarlanabilir kanıtlar, bir doğruluk kanıtıyla birkaç bloğu sonlandırmayı mümkün kılar. Bunun sebebi, kanıtlama döngüsünün son bir kanıt oluşturulana kadar çoklu blok kanıtlarını toplamasıdır. L2 operatörü, bu tekrarlanan kanıtı gönderir ve sözleşmenin bunun kabul etmesi durumunda ilgili blokların tümü anında sonlandırılır. Tekrarlanan kanıtlar sayesinde, Ethereum'da zaman aralıklarıyla sonlandırılabilecek olan ZK-toplamalarının sayısı artar.

### ZK-toplamalarının artıları ve eksileri {#zk-rollups-pros-and-cons}

| Artıları                                                                                                                                                                                                                                        | Eksileri                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Doğruluk kanıtları, zincir dışı işlemlerin doğruluğunu sağlar ve operatörlerin geçersiz durum geçişleri yürütmesini engeller.                                                                                                   | Programlama ve doğruluk kanıtlarıyla ilgili olan masraflar azımsanamayacak kadar fazladır ve bunlar, toplama kullanıcıları için ücretleri artırabilir.                                                                            |
| Doğruluk kanıtları L1'de doğrulandığında, durum güncellemeleri de onaylandığı için daha hızlı işlem kesinliği sunar.                                                                                                            | EVM uyumlu ZK-toplamaları geliştirmek, sıfır-bilgi teknolojisinin karmaşıklığı sebebiyle zordur.                                                                                                                                  |
| [İyimser toplamalarda](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons) olduğu gibi teşvik edilmiş aktörlerin dürüstlüğüne değil, güvenlik için güvene dayalı olmayan kriptografik mekanizmalara dayanır. | Doğruluk kanıtlarının üretilmesi özelleştirilmiş donanım gerektirdiğinden zincirin birkaç tarafça merkezi şekilde kontrol edilmesini teşvik edebilir.                                                                             |
| Zincir dışı durumu kurtarmak için gereken verileri L1'de depolar, bu da güvenliği, sansür direncini ve merkeziyetsizliği garanti eder.                                                                                          | Merkezi operatörler (sıralayıcılar) işlem sırasını etkileyebilir.                                                                                                                                              |
| Kullanıcılar daha iyi sermaye verimliliğinden faydalanabilir ve L2'den gecikme olmadan fon çekebilir.                                                                                                                           | Donanım gereksinimleri, zinciri gelişim göstermeye zorlayan katılımcıların sayısında azalmaya sebep olarak kötü niyetli operatörlerin toplamanın durumunu dondurması ve kullanıcıları sansürlemesi riskini artırır.               |
| Canlılık varsayımlarına bağımlı değildir ve kullanıcıların fonlarını koruyabilmek için zinciri doğrulamaları gerekmez.                                                                                                          | Bazı kanıtlama sistemleri (örn. ZK-SNARK) güvenilir bir kurulum gerektirir. Bu kurulum yanlış ele alınırsa ZK-toplamasının güvenlik modelinden taviz verilmesine yol açabilir. |
| Daha iyi veri sıkıştırma, Ethereum'da `calldata` yayımlama maliyetlerini düşürmeye ve kullanıcılar için toplama ücretlerini en aza indirmeye yardımcı olabilir.                                                                 |                                                                                                                                                                                                                                                   |

### ZK-toplamalarının görsel açıklaması {#zk-video}

Finematics'in ZK-toplaması hakkındaki açıklamasını izleyin:

<YouTube id="7pWxCklcNsU" start="406" />

## zkEVM üzerinde kimler çalışıyor? zkEVM projeleri {#zkevm-projects}

Şunlar zkEVM'ler üzerinde çalışan projeler arasındadır:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM, EVM uyumlu bir ZK-toplaması ve Ethereum blokları için doğruluk kanıtları oluşturmaya yönelik bir mekanizma geliştirmek için Ethereum Foundation tarafından finanse edilen bir projedir._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _sıfır bilgi kanıtı doğrulamaları olan akıllı sözleşmeler de dahil olmak üzere Ethereum işlemlerini şeffaf bir şekilde yürüten, sıfır bilgili bir Ethereum Sanal Makinesi (zkEVM) üzerinde çalışan, Ethereum ana ağında merkeziyetsiz bir ZK Toplamasıdır._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll, Ethereum için yerel bir zkEVM Katman 2 Çözümü oluşturmaya çalışan, teknoloji odaklı bir şirkettir._

- **[Taiko](https://taiko.xyz)** - _Taiko, merkeziyetsiz, Ethereum'a eşdeğer bir ZK-toplamasıdır ([Tip 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era, Matter Labs tarafından oluşturulan ve kendi zkEVM'i tarafından desteklenen EVM uyumlu bir ZK Toplamasıdır._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet, StarkWare tarafından oluşturulmuş EVM uyumlu bir katman 2 ölçeklendirme çözümüdür._

- **[Morph](https://www.morphl2.io/)** - _Morph, Katman 2 durum sınaması sorununu ele almak için zk-kanıtı kullanan hibrit bir toplama ölçeklendirme çözümüdür._

- **[Linea](https://linea.build)** - _Linea, Consensys tarafından oluşturulmuş, Ethereum ekosistemiyle tam uyumlu, Ethereum'a eşdeğer bir zkEVM Katman 2'dir._

## ZK-toplamaları hakkında daha fazla bilgi {#further-reading-on-zk-rollups}

- [Sıfır Bilgi Toplamaları Nedir?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Sıfır bilgi toplamaları nedir?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Ethereum Toplamaları için Pratik Rehber](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK'lar ve SNARK'lar](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM nedir?](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM türleri: Ethereum eşdeğeri, EVM eşdeğeri, Tip 1, Tip 4 ve diğer şifreli popüler sözcükler](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [zkEVM'e Giriş](https://hackmd.io/@yezhang/S1_KMMbGt)
- [ZK-EVM L2'ler nedir?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Harika zkEVM kaynakları](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARK'ların iç yüzü](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [SNARK'lar nasıl mümkün oldu?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
