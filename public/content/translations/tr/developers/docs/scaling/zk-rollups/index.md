---
title: "Sıfır bilgi toplamaları"
description: "Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olan sıfır bilgi toplamalarına (ZK-rollups) giriş."
lang: tr
---

Sıfır bilgi toplamaları (ZK-rollup'lar), hesaplama ve durum depolamayı zincir dışına taşıyarak [Ethereum](/) Ana Ağı üzerindeki işlem kapasitesini artıran katman 2 (L2) [ölçeklendirme çözümleridir](/developers/docs/scaling/). ZK-rollup'lar, binlerce işlemi bir toplu işlemde (batch) işleyebilir ve ardından Ana Ağ'a yalnızca minimum düzeyde özet veri gönderebilir. Bu özet veri, Ethereum durumunda yapılması gereken değişiklikleri ve bu değişikliklerin doğru olduğuna dair bazı kriptografik kanıtları tanımlar.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2) hakkındaki sayfamızı okumuş ve anlamış olmalısınız.

## Sıfır bilgi toplamaları nelerdir? {#what-are-zk-rollups}

**Sıfır bilgi toplamaları (ZK-rollup'lar)**, işlemleri zincir dışında yürütülen toplu işlemler (batch'ler) halinde bir araya getirir (veya 'toplar'). Zincir dışı hesaplama, blokzincire gönderilmesi gereken veri miktarını azaltır. ZK-rollup operatörleri, her bir işlemi ayrı ayrı göndermek yerine, bir toplu işlemdeki tüm işlemleri temsil etmek için gereken değişikliklerin bir özetini sunar. Ayrıca, değişikliklerinin doğruluğunu kanıtlamak için [geçerlilik kanıtları](/glossary/#validity-proof) üretirler.

ZK-rollup'ın durumu, Ethereum ağında dağıtılan bir akıllı sözleşme tarafından sürdürülür. Bu durumu güncellemek için, ZK-rollup düğümleri doğrulama için bir geçerlilik kanıtı sunmalıdır. Belirtildiği gibi, geçerlilik kanıtı, rollup tarafından önerilen durum değişikliğinin gerçekten verilen toplu işlemlerin yürütülmesinin bir sonucu olduğuna dair kriptografik bir güvencedir. Bu, ZK-rollup'ların işlemleri Ethereum'da kesinleştirmek için [iyimser toplamalar (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/) gibi tüm işlem verilerini zincir içine göndermek yerine yalnızca geçerlilik kanıtları sağlaması gerektiği anlamına gelir.

Bir ZK-rollup'tan Ethereum'a fon taşırken hiçbir gecikme yaşanmaz çünkü çıkış işlemleri, ZK-rollup sözleşmesi geçerlilik kanıtını doğruladığında yürütülür. Buna karşılık, iyimser toplamalardan fon çekim işlemi, herkesin çıkış işlemine bir [sahtekarlık kanıtı](/glossary/#fraud-proof) ile itiraz etmesine olanak tanımak için bir gecikmeye tabidir.

ZK-rollup'lar işlemleri Ethereum'a `calldata` olarak yazar. `calldata`, akıllı sözleşme işlevlerine yapılan harici çağrılara dahil edilen verilerin depolandığı yerdir. `calldata` içindeki bilgiler blokzincirde yayınlanır ve herkesin rollup'ın durumunu bağımsız olarak yeniden oluşturmasına olanak tanır. ZK-rollup'lar işlem verilerini azaltmak için sıkıştırma teknikleri kullanır; örneğin, hesaplar bir adres yerine bir endeks ile temsil edilir, bu da 28 bayt veri tasarrufu sağlar. Zincir içi veri yayını, rollup'lar için önemli bir maliyettir, bu nedenle veri sıkıştırma kullanıcılar için ücretleri azaltabilir.

## ZK-rollup'lar Ethereum ile nasıl etkileşime girer? {#zk-rollups-and-ethereum}

Bir ZK-rollup zinciri, Ethereum blokzincirinin üzerinde çalışan ve zincir içi Ethereum akıllı sözleşmeleri tarafından yönetilen zincir dışı bir protokoldür. ZK-rollup'lar işlemleri Ana Ağ dışında yürütür, ancak periyodik olarak zincir dışı toplu işlemleri zincir içi bir rollup sözleşmesine taahhüt eder. Bu işlem kaydı, tıpkı Ethereum blokzinciri gibi değişmezdir ve ZK-rollup zincirini oluşturur.

ZK-rollup'ın temel mimarisi aşağıdaki bileşenlerden oluşur:

1. **Zincir içi sözleşmeler**: Belirtildiği gibi, ZK-rollup protokolü Ethereum üzerinde çalışan akıllı sözleşmeler tarafından kontrol edilir. Bu, rollup bloklarını depolayan, yatırılan fonları izleyen ve durum güncellemelerini denetleyen ana sözleşmeyi içerir. Başka bir zincir içi sözleşme (doğrulayıcı sözleşmesi), blok üreticileri tarafından sunulan sıfır bilgi ispatlarını doğrular. Böylece Ethereum, ZK-rollup için temel katman veya "katman 1" olarak hizmet eder.

2. **Zincir dışı sanal makine (VM)**: ZK-rollup protokolü Ethereum üzerinde yaşarken, işlem yürütme ve durum depolama [EVM](/developers/docs/evm/)'den bağımsız ayrı bir sanal makinede gerçekleşir. Bu zincir dışı VM, ZK-rollup üzerindeki işlemler için yürütme ortamıdır ve ZK-rollup protokolü için ikincil katman veya "katman 2" olarak hizmet eder. Ethereum Ana Ağı'nda doğrulanan geçerlilik kanıtları, zincir dışı VM'deki durum geçişlerinin doğruluğunu garanti eder.

ZK-rollup'lar "hibrit ölçeklendirme çözümleridir"; bağımsız çalışan ancak güvenliğini Ethereum'dan alan zincir dışı protokollerdir. Özellikle, Ethereum ağı ZK-rollup üzerindeki durum güncellemelerinin geçerliliğini zorunlu kılar ve rollup'ın durumuna yapılan her güncellemenin arkasındaki verilerin kullanılabilirliğini garanti eder. Sonuç olarak, ZK-rollup'lar, kendi güvenlik özelliklerinden sorumlu olan [yan zincirler (sidechains)](/developers/docs/scaling/sidechains/) veya işlemleri Ethereum'da geçerlilik kanıtlarıyla doğrulayan ancak işlem verilerini başka bir yerde depolayan [validium'lar](/developers/docs/scaling/validium/) gibi tamamen zincir dışı ölçeklendirme çözümlerinden önemli ölçüde daha güvenlidir.

ZK-rollup'lar aşağıdakiler için ana Ethereum protokolüne güvenir:

### Veri kullanılabilirliği {#data-availability}

ZK-rollup'lar, zincir dışında işlenen her işlem için durum verilerini Ethereum'da yayınlar. Bu verilerle, bireylerin veya işletmelerin rollup'ın durumunu yeniden oluşturması ve zinciri kendilerinin doğrulaması mümkündür. Ethereum, bu verileri ağın tüm katılımcılarına `calldata` olarak sunar.

ZK-rollup'ların zincir içinde çok fazla işlem verisi yayınlamasına gerek yoktur çünkü geçerlilik kanıtları durum geçişlerinin gerçekliğini zaten doğrular. Yine de, verileri zincir içinde depolamak hala önemlidir çünkü L2 zincirinin durumunun izinsiz, bağımsız bir şekilde doğrulanmasına olanak tanır; bu da herkesin toplu işlemler sunmasına izin vererek kötü niyetli operatörlerin zinciri sansürlemesini veya dondurmasını engeller.

Kullanıcıların rollup ile etkileşime girmesi için zincir içi gereklidir. Durum verilerine erişim olmadan kullanıcılar hesap bakiyelerini sorgulayamaz veya durum bilgilerine dayanan işlemleri (ör. çekim işlemleri) başlatamazlar.

### İşlem kesinliği {#transaction-finality}

Ethereum, ZK-rollup'lar için bir uzlaşma katmanı görevi görür: L2 işlemleri yalnızca L1 sözleşmesi geçerlilik kanıtını kabul ederse kesinleşir. Bu, her işlemin Ana Ağ'da onaylanması gerektiğinden, kötü niyetli operatörlerin zinciri bozma (ör. rollup fonlarını çalma) riskini ortadan kaldırır. Ayrıca Ethereum, kullanıcı işlemlerinin L1'de kesinleştikten sonra geri alınamayacağını garanti eder.

### Sansür direnci {#censorship-resistance}

Çoğu ZK-rollup, işlemleri yürütmek, toplu işlemler üretmek ve L1'e bloklar sunmak için bir "süper düğüm" (operatör) kullanır. Bu verimlilik sağlasa da sansür riskini artırır: kötü niyetli ZK-rollup operatörleri, kullanıcıların işlemlerini toplu işlemlere dahil etmeyi reddederek onları sansürleyebilir.

Bir güvenlik önlemi olarak ZK-rollup'lar, kullanıcıların operatör tarafından sansürlendiklerini düşünmeleri halinde işlemleri doğrudan Ana Ağ'daki rollup sözleşmesine sunmalarına olanak tanır. Bu, kullanıcıların operatörün iznine güvenmek zorunda kalmadan ZK-rollup'tan Ethereum'a bir çıkış işlemini zorlamalarına olanak tanır.

## ZK-rollup'lar nasıl çalışır? {#how-do-zk-rollups-work}

### İşlemler {#transactions}

ZK-rollup'taki kullanıcılar işlemleri imzalar ve işlenmesi ve bir sonraki toplu işleme dahil edilmesi için L2 operatörlerine sunar. Bazı durumlarda operatör, işlemleri yürüten, bunları toplu işlemler halinde bir araya getiren ve L1'e sunan sıralayıcı adı verilen merkezi bir varlıktır. Bu sistemdeki sıralayıcı, L2 blokları üretmesine ve ZK-rollup sözleşmesine rollup işlemleri eklemesine izin verilen tek varlıktır.

Diğer ZK-rollup'lar, bir [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) doğrulayıcı seti kullanarak operatör rolünü dönüşümlü hale getirebilir. Gelecekteki operatörler rollup sözleşmesine fon yatırır ve her bir stake'in boyutu, stake edenin bir sonraki rollup toplu işlemini üretmek üzere seçilme şansını etkiler. Operatör kötü niyetli davranırsa stake'i kesintiye uğrayabilir (slash), bu da onları geçerli bloklar göndermeye teşvik eder.

#### ZK-rollup'lar işlem verilerini Ethereum'da nasıl yayınlar? {#how-zk-rollups-publish-transaction-data-on-ethereum}

Açıklandığı gibi, işlem verileri Ethereum'da `calldata` olarak yayınlanır. `calldata`, bir akıllı sözleşmede bir işleve argüman geçirmek için kullanılan bir veri alanıdır ve [belleğe (memory)](/developers/docs/smart-contracts/anatomy/#memory) benzer şekilde davranır. `calldata` Ethereum'un durumunun bir parçası olarak depolanmasa da, Ethereum zincirinin [geçmiş günlüklerinin](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) bir parçası olarak zincir içinde kalıcı olur. `calldata` Ethereum'un durumunu etkilemez, bu da onu verileri zincir içinde depolamanın ucuz bir yolu haline getirir.

`calldata` anahtar kelimesi genellikle bir işlem tarafından çağrılan akıllı sözleşme yöntemini tanımlar ve yönteme yönelik girdileri rastgele bir bayt dizisi biçiminde tutar. ZK-rollup'lar, sıkıştırılmış işlem verilerini zincir içinde yayınlamak için `calldata` kullanır; rollup operatörü, rollup sözleşmesindeki gerekli işlevi çağırarak yeni bir toplu işlem ekler ve sıkıştırılmış verileri işlev argümanları olarak geçirir. Rollup ücretlerinin büyük bir kısmı işlem verilerini zincir içinde depolamaya gittiğinden, bu durum kullanıcılar için maliyetleri azaltmaya yardımcı olur.

### Durum taahhütleri {#state-commitments}

L2 hesaplarını ve bakiyelerini içeren ZK-rollup'ın durumu, bir [Merkle ağacı](/whitepaper/#merkle-trees) olarak temsil edilir. Merkle ağacının kökünün (Merkle kökü) kriptografik bir hash'i zincir içi sözleşmede depolanır ve rollup protokolünün ZK-rollup'ın durumundaki değişiklikleri izlemesine olanak tanır.

Rollup, yeni bir işlem setinin yürütülmesinden sonra yeni bir duruma geçer. Durum geçişini başlatan operatörün yeni bir durum kökü hesaplaması ve zincir içi sözleşmeye sunması gerekir. Toplu işlemle ilişkili geçerlilik kanıtı doğrulayıcı sözleşmesi tarafından doğrulanırsa, yeni Merkle kökü ZK-rollup'ın kurallı durum kökü haline gelir.

Durum köklerini hesaplamanın yanı sıra, ZK-rollup operatörü ayrıca bir toplu işlem kökü (batch root) oluşturur; bu, bir toplu işlemdeki tüm işlemleri içeren bir Merkle ağacının köküdür. Yeni bir toplu işlem sunulduğunda, rollup sözleşmesi toplu işlem kökünü depolar ve kullanıcıların bir işlemin (ör. bir çekim talebi) toplu işleme dahil edildiğini kanıtlamasına olanak tanır. Kullanıcıların işlem ayrıntılarını, toplu işlem kökünü ve dahil edilme yolunu gösteren bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sağlaması gerekecektir.

### Geçerlilik kanıtları {#validity-proofs}

ZK-rollup operatörünün L1 sözleşmesine sunduğu yeni durum kökü, rollup'ın durumuna yapılan güncellemelerin sonucudur. Diyelim ki Alice Bob'a 10 Token gönderiyor, operatör sadece Alice'in bakiyesini 10 azaltır ve Bob'un bakiyesini 10 artırır. Operatör daha sonra güncellenen hesap verilerini hashler, rollup'ın Merkle ağacını yeniden oluşturur ve yeni Merkle kökünü zincir içi sözleşmeye sunar.

Ancak rollup sözleşmesi, operatör yeni Merkle kökünün rollup'ın durumuna yapılan doğru güncellemelerden kaynaklandığını kanıtlayana kadar önerilen durum taahhüdünü otomatik olarak kabul etmeyecektir. ZK-rollup operatörü bunu, toplu işlemlerin doğruluğunu doğrulayan kısa bir kriptografik taahhüt olan bir geçerlilik kanıtı üreterek yapar.

Geçerlilik kanıtları, tarafların bir ifadenin doğruluğunu ifadenin kendisini açıklamadan kanıtlamasına olanak tanır; bu nedenle bunlara sıfır bilgi ispatları da denir. ZK-rollup'lar, işlemleri Ethereum'da yeniden yürütmek zorunda kalmadan zincir dışı durum geçişlerinin doğruluğunu onaylamak için geçerlilik kanıtlarını kullanır. Bu kanıtlar bir [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Sıfır Bilgi Kısa Etkileşimsiz Bilgi Argümanı) veya [ZK-STARK](https://eprint.iacr.org/2018/046) (Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanı) biçiminde olabilir.

Her iki kanıt türünün de kendine özgü özellikleri olmasına rağmen, hem SNARK'lar hem de STARK'lar ZK-rollup'larda zincir dışı hesaplamanın bütünlüğünü doğrulamaya yardımcı olur.

**ZK-SNARK'lar**

ZK-SNARK protokolünün çalışması için bir Ortak Referans Dizisi (CRS) oluşturmak gereklidir: CRS, geçerlilik kanıtlarını kanıtlamak ve doğrulamak için açık parametreler sağlar. Kanıtlama sisteminin güvenliği CRS kurulumuna bağlıdır; açık parametreler oluşturmak için kullanılan bilgiler kötü niyetli aktörlerin eline geçerse, sahte geçerlilik kanıtları üretebilirler.

Bazı ZK-rollup'lar, ZK-SNARK devresi için açık parametreler oluşturmak amacıyla güvenilir bireyleri içeren bir [çok partili hesaplama seremonisi (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) kullanarak bu sorunu çözmeye çalışır. Her taraf, CRS'yi oluşturmak için derhal yok etmeleri gereken bir miktar rastgelelik ("toksik atık" olarak adlandırılır) katkısında bulunur.

Güvenilir kurulumlar, CRS kurulumunun güvenliğini artırdıkları için kullanılır. Dürüst bir katılımcı girdisini yok ettiği sürece, ZK-SNARK sisteminin güvenliği garanti altındadır. Yine de bu yaklaşım, dahil olanların örneklenmiş rastgeleliklerini sileceklerine ve sistemin güvenlik garantilerini zayıflatmayacaklarına güvenmeyi gerektirir.

Güven varsayımları bir yana, ZK-SNARK'lar küçük kanıt boyutları ve sabit zamanlı doğrulamaları nedeniyle popülerdir. L1'de kanıt doğrulaması bir ZK-rollup'ı çalıştırmanın daha büyük maliyetini oluşturduğundan, L2'ler Ana Ağ'da hızlı ve ucuz bir şekilde doğrulanabilen kanıtlar üretmek için ZK-SNARK'ları kullanır.

**ZK-STARK'lar**

ZK-SNARK'lar gibi, ZK-STARK'lar da girdileri açıklamadan zincir dışı hesaplamanın geçerliliğini kanıtlar. Ancak ZK-STARK'lar, ölçeklenebilirlikleri ve şeffaflıkları nedeniyle ZK-SNARK'lara göre bir gelişme olarak kabul edilir.

ZK-STARK'lar 'şeffaftır', çünkü bir Ortak Referans Dizisinin (CRS) güvenilir kurulumu olmadan çalışabilirler. Bunun yerine ZK-STARK'lar, kanıtlar üretmek ve doğrulamak için parametreler ayarlamak üzere herkese açık olarak doğrulanabilir rastgeleliğe güvenir.

ZK-STARK'lar ayrıca daha fazla ölçeklenebilirlik sağlar çünkü geçerlilik kanıtlarını kanıtlamak ve doğrulamak için gereken süre, temel hesaplamanın karmaşıklığına bağlı olarak _yarı doğrusal (quasilinearly)_ olarak artar. ZK-SNARK'larda, kanıtlama ve doğrulama süreleri temel hesaplamanın boyutuna bağlı olarak _doğrusal_ olarak ölçeklenir. Bu, büyük veri kümeleri söz konusu olduğunda ZK-STARK'ların kanıtlama ve doğrulama için ZK-SNARK'lardan daha az zaman gerektirdiği anlamına gelir ve bu da onları yüksek hacimli uygulamalar için kullanışlı hale getirir.

ZK-STARK'lar ayrıca kuantum bilgisayarlara karşı da güvenlidir, oysa ZK-SNARK'larda kullanılan Eliptik Eğri Kriptografisinin (ECC) kuantum hesaplama saldırılarına karşı duyarlı olduğuna yaygın olarak inanılmaktadır. ZK-STARK'ların dezavantajı, Ethereum'da doğrulanması daha pahalı olan daha büyük kanıt boyutları üretmeleridir.

#### ZK-rollup'larda geçerlilik kanıtları nasıl çalışır? {#validity-proofs-in-zk-rollups}

##### Kanıt üretimi
İşlemleri kabul etmeden önce operatör olağan kontrolleri gerçekleştirecektir. Bu, aşağıdakilerin onaylanmasını içerir:

- Gönderen ve alıcı hesaplarının durum ağacının bir parçası olduğu.
- Gönderenin işlemi gerçekleştirmek için yeterli fona sahip olduğu.
- İşlemin doğru olduğu ve rollup üzerindeki gönderenin açık anahtarıyla eşleştiği.
- Gönderenin nonce değerinin doğru olduğu vb.

ZK-rollup düğümü yeterli işleme sahip olduğunda, bunları bir toplu işlemde bir araya getirir ve kanıtlama devresinin kısa bir ZK-kanıtı halinde derlemesi için girdileri derler. Bu şunları içerir:

- Toplu işlemdeki tüm işlemleri içeren bir Merkle ağacı kökü.
- İşlemlerin toplu işleme dahil edildiğini kanıtlamak için Merkle kanıtları.
- Bu hesapların rollup'ın durum ağacının bir parçası olduğunu kanıtlamak için işlemlerdeki her gönderen-alıcı çifti için Merkle kanıtları.
- Her işlem için durum güncellemelerini uyguladıktan sonra (yani gönderen hesaplarını azaltmak ve alıcı hesaplarını artırmak) durum kökünün güncellenmesinden türetilen bir dizi ara durum kökü.

Kanıtlama devresi, her işlem üzerinde "döngü" yaparak ve operatörün işlemi işlemeden önce tamamladığı aynı kontrolleri gerçekleştirerek geçerlilik kanıtını hesaplar. İlk olarak, sağlanan Merkle kanıtını kullanarak gönderenin hesabının mevcut durum kökünün bir parçası olduğunu doğrular. Ardından gönderenin bakiyesini azaltır, nonce değerini artırır, güncellenen hesap verilerini hashler ve yeni bir Merkle kökü oluşturmak için bunu Merkle kanıtıyla birleştirir.

Bu Merkle kökü, ZK-rollup'ın durumundaki tek değişikliği yansıtır: gönderenin bakiyesinde ve nonce değerinde bir değişiklik. Bu mümkündür çünkü hesabın varlığını kanıtlamak için kullanılan Merkle kanıtı, yeni durum kökünü türetmek için kullanılır.

Kanıtlama devresi aynı işlemi alıcının hesabında da gerçekleştirir. Alıcının hesabının ara durum kökü altında var olup olmadığını (Merkle kanıtını kullanarak) kontrol eder, bakiyesini artırır, hesap verilerini yeniden hashler ve yeni bir durum kökü oluşturmak için bunu Merkle kanıtıyla birleştirir.

İşlem her işlem için tekrarlanır; her "döngü", gönderenin hesabının güncellenmesinden yeni bir durum kökü ve alıcının hesabının güncellenmesinden sonraki yeni bir kök oluşturur. Açıklandığı gibi, durum köküne yapılan her güncelleme, rollup'ın durum ağacının bir bölümünün değişmesini temsil eder.

ZK-kanıtlama devresi, son işlem yürütüldükten sonra nihai bir durum köküyle sonuçlanan güncelleme dizisini doğrulayarak tüm işlem toplu işlemi üzerinde yinelenir. Hesaplanan son Merkle kökü, ZK-rollup'ın en yeni kurallı durum kökü haline gelir.

##### Kanıt doğrulaması
Kanıtlama devresi durum güncellemelerinin doğruluğunu doğruladıktan sonra, L2 operatörü hesaplanan geçerlilik kanıtını L1'deki doğrulayıcı sözleşmesine sunar. Sözleşmenin doğrulama devresi kanıtın geçerliliğini doğrular ve ayrıca kanıtın bir parçasını oluşturan açık girdileri kontrol eder:

- **Ön durum kökü (Pre-state root)**: ZK-rollup'ın eski durum kökü (yani, toplu işlemler yürütülmeden önce), L2 zincirinin bilinen son geçerli durumunu yansıtır.

- **Son durum kökü (Post-state root)**: ZK-rollup'ın yeni durum kökü (yani, toplu işlemlerin yürütülmesinden sonra), L2 zincirinin en yeni durumunu yansıtır. Son durum kökü, kanıtlama devresinde durum güncellemeleri uygulandıktan sonra türetilen nihai köktür.

- **Toplu işlem kökü (Batch root)**: Toplu işlemdeki işlemlerin _merklelaştırılması_ ve ağacın kökünün hashlenmesiyle türetilen toplu işlemin Merkle kökü.

- **İşlem girdileri**: Sunulan toplu işlemin bir parçası olarak yürütülen işlemlerle ilişkili veriler.

Kanıt devreyi tatmin ederse (yani geçerliyse), bu, rollup'ı önceki durumdan (ön durum kökü tarafından kriptografik olarak parmak izi alınmış) yeni bir duruma (son durum kökü tarafından kriptografik olarak parmak izi alınmış) geçiren geçerli işlemler dizisinin var olduğu anlamına gelir. Ön durum kökü rollup sözleşmesinde depolanan kökle eşleşirse ve kanıt geçerliyse, rollup sözleşmesi kanıttan son durum kökünü alır ve rollup'ın değişen durumunu yansıtmak için durum ağacını günceller.

### Girişler ve çıkışlar {#entries-and-exits}

Kullanıcılar, L1 zincirinde dağıtılan rollup sözleşmesine Token yatırarak ZK-rollup'a girerler. Yalnızca operatörler rollup sözleşmesine işlem sunabildiğinden bu işlem sıraya alınır.

Bekleyen para yatırma kuyruğu dolmaya başlarsa, ZK-rollup operatörü para yatırma işlemlerini alacak ve bunları rollup sözleşmesine sunacaktır. Kullanıcının fonları rollup'a girdikten sonra, işlenmesi için operatöre işlemler göndererek işlem yapmaya başlayabilirler. Kullanıcılar, hesap verilerini hashleyerek, hash'i rollup sözleşmesine göndererek ve mevcut durum köküne karşı doğrulamak için bir Merkle kanıtı sağlayarak rollup üzerindeki bakiyeleri doğrulayabilirler.

Bir ZK-rollup'tan L1'e çekim işlemi basittir. Kullanıcı, rollup üzerindeki varlıklarını yakım için belirli bir hesaba göndererek çıkış işlemini başlatır. Operatör işlemi bir sonraki toplu işleme dahil ederse, kullanıcı zincir içi sözleşmeye bir çekim talebi sunabilir. Bu çekim talebi aşağıdakileri içerecektir:

- Kullanıcının yakım hesabına yaptığı işlemin bir işlem toplu işlemine dahil edildiğini kanıtlayan Merkle kanıtı

- İşlem verileri

- Toplu işlem kökü

- Yatırılan fonları alacak L1 adresi

Rollup sözleşmesi işlem verilerini hashler, toplu işlem kökünün var olup olmadığını kontrol eder ve işlem hash'inin toplu işlem kökünün bir parçası olup olmadığını kontrol etmek için Merkle kanıtını kullanır. Daha sonra sözleşme çıkış işlemini yürütür ve fonları kullanıcının L1'de seçtiği adrese gönderir.

## ZK-rollup'lar ve EVM uyumluluğu {#zk-rollups-and-evm-compatibility}

İyimser toplamaların aksine, ZK-rollup'lar [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) ile kolayca uyumlu değildir. Devrelerde genel amaçlı EVM hesaplamasını kanıtlamak, basit hesaplamaları (daha önce açıklanan Token transferi gibi) kanıtlamaktan daha zor ve kaynak yoğundur.

Bununla birlikte, [sıfır bilgi teknolojisindeki ilerlemeler](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now), EVM hesaplamasını sıfır bilgi ispatlarıyla sarmaya yönelik yenilenmiş bir ilgiyi ateşliyor. Bu çabalar, program yürütmesinin doğruluğunu verimli bir şekilde doğrulayabilen bir sıfır bilgi EVM (zkEVM) uygulaması oluşturmaya yöneliktir. Bir zkEVM, devrelerde kanıtlama/doğrulama için mevcut EVM işlem kodlarını (opcodes) yeniden oluşturarak akıllı sözleşmelerin yürütülmesine olanak tanır.

EVM gibi, bir zkEVM de bazı girdiler üzerinde hesaplama yapıldıktan sonra durumlar arasında geçiş yapar. Fark, zkEVM'nin programın yürütülmesindeki her adımın doğruluğunu doğrulamak için sıfır bilgi ispatları da oluşturmasıdır. Geçerlilik kanıtları, VM'nin durumuna (bellek, yığın, depolama) dokunan işlemlerin ve hesaplamanın kendisinin doğruluğunu doğrulayabilir (yani, işlem doğru işlem kodlarını çağırdı mı ve bunları doğru şekilde yürüttü mü?).

EVM uyumlu ZK-rollup'ların tanıtılmasının, geliştiricilerin sıfır bilgi ispatlarının ölçeklenebilirlik ve güvenlik garantilerinden yararlanmasına yardımcı olması beklenmektedir. Daha da önemlisi, yerel Ethereum altyapısıyla uyumluluk, geliştiricilerin tanıdık (ve savaşta test edilmiş) araçları ve dilleri kullanarak ZK dostu merkeziyetsiz uygulamalar (dapp'ler) oluşturabileceği anlamına gelir.

## ZK-rollup ücretleri nasıl çalışır? {#how-do-zk-rollup-fees-work}

Kullanıcıların ZK-rollup'lardaki işlemler için ne kadar ödeyeceği, tıpkı Ethereum Ana Ağı'nda olduğu gibi gaz ücretine bağlıdır. Ancak gaz ücretleri L2'de farklı çalışır ve aşağıdaki maliyetlerden etkilenir:

1. **Durum yazma**: Ethereum'un durumuna yazmanın (yani Ethereum blokzincirinde bir işlem sunmanın) sabit bir maliyeti vardır. ZK-rollup'lar, işlemleri toplu işleyerek ve sabit maliyetleri birden fazla kullanıcıya yayarak bu maliyeti azaltır.

2. **Veri yayını**: ZK-rollup'lar her işlem için durum verilerini Ethereum'da `calldata` olarak yayınlar. `calldata` maliyetleri şu anda, sıfır olmayan baytlar için 16 gaz ve sıfır baytlık `calldata` için 4 gaz maliyeti öngören [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) tarafından yönetilmektedir. Her işlemde ödenen maliyet, bunun için zincir içine ne kadar `calldata` gönderilmesi gerektiğinden etkilenir.

3. **L2 operatör ücretleri**: Bu, tıpkı Ethereum Ana Ağı'ndaki [işlem "öncelik ücretleri (bahşişler)"](/developers/docs/gas/#how-are-gas-fees-calculated) gibi, işlemleri işlerken ortaya çıkan hesaplama maliyetlerinin telafisi olarak rollup operatörüne ödenen miktardır.

4. **Kanıt üretimi ve doğrulaması**: ZK-rollup operatörleri, kaynak yoğun olan işlem toplu işlemleri için geçerlilik kanıtları üretmelidir. Ana Ağ'da sıfır bilgi ispatlarını doğrulamak da gaza mal olur (~ 500.000 gaz).

İşlemleri toplu işlemenin yanı sıra, ZK-rollup'lar işlem verilerini sıkıştırarak kullanıcılar için ücretleri azaltır. Ethereum ZK-rollup'larını kullanmanın ne kadara mal olduğuna dair [gerçek zamanlı bir genel bakış görebilirsiniz](https://l2fees.info/).

## ZK-rollup'lar Ethereum'u nasıl ölçeklendirir? {#scaling-ethereum-with-zk-rollups}

### İşlem verisi sıkıştırma {#transaction-data-compression}

ZK-rollup'lar hesaplamayı zincir dışına alarak Ethereum'un temel katmanındaki işlem kapasitesini genişletir, ancak ölçeklendirme için asıl artış işlem verilerini sıkıştırmaktan gelir. Ethereum'un [blok boyutu](/developers/docs/blocks/#block-size), her bloğun tutabileceği veriyi ve dolayısıyla blok başına işlenen işlem sayısını sınırlar. İşlemle ilgili verileri sıkıştırarak, ZK-rollup'lar blok başına işlenen işlem sayısını önemli ölçüde artırır.

ZK-rollup'lar, her işlemi doğrulamak için gereken tüm verileri göndermek zorunda olmadıkları için işlem verilerini iyimser toplamalardan daha iyi sıkıştırabilir. Yalnızca rollup üzerindeki hesapların ve bakiyelerin en son durumunu yeniden oluşturmak için gereken minimum veriyi göndermeleri gerekir.

### Özyinelemeli kanıtlar {#recursive-proofs}

Sıfır bilgi ispatlarının bir avantajı, kanıtların diğer kanıtları doğrulayabilmesidir. Örneğin, tek bir ZK-SNARK diğer ZK-SNARK'ları doğrulayabilir. Bu tür "kanıtların kanıtlarına" özyinelemeli kanıtlar denir ve ZK-rollup'lardaki işlem kapasitesini önemli ölçüde artırır.

Şu anda geçerlilik kanıtları blok blok üretilmekte ve doğrulama için L1 sözleşmesine sunulmaktadır. Ancak, tek blok kanıtlarını doğrulamak, operatör bir kanıt sunduğunda yalnızca bir blok kesinleşebileceğinden ZK-rollup'ların elde edebileceği işlem kapasitesini sınırlar.

Bununla birlikte, özyinelemeli kanıtlar, tek bir geçerlilik kanıtıyla birkaç bloğu kesinleştirmeyi mümkün kılar. Bunun nedeni, kanıtlama devresinin nihai bir kanıt oluşturulana kadar birden fazla blok kanıtını özyinelemeli olarak bir araya getirmesidir. L2 operatörü bu özyinelemeli kanıtı sunar ve sözleşme bunu kabul ederse, ilgili tüm bloklar anında kesinleşir. Özyinelemeli kanıtlarla, Ethereum'da aralıklarla kesinleştirilebilen ZK-rollup işlemlerinin sayısı artar.

### ZK-rollup'ların artıları ve eksileri {#zk-rollups-pros-and-cons}

| Artıları                                                                                                                                                                                                   | Eksileri                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Geçerlilik kanıtları, zincir dışı işlemlerin doğruluğunu sağlar ve operatörlerin geçersiz durum geçişleri yürütmesini engeller.                                                                           | Geçerlilik kanıtlarını hesaplama ve doğrulama ile ilişkili maliyet büyüktür ve rollup kullanıcıları için ücretleri artırabilir.                                                                            |
| Durum güncellemeleri L1'de geçerlilik kanıtları doğrulandıktan sonra onaylandığı için daha hızlı işlem kesinliği sunar.                                                                                              | Sıfır bilgi teknolojisinin karmaşıklığı nedeniyle EVM uyumlu ZK-rollup'lar oluşturmak zordur.                                                                                                    |
| Güvenlik için, [iyimser toplamalarda](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons) olduğu gibi teşvik edilen aktörlerin dürüstlüğüne değil, güven gerektirmeyen kriptografik mekanizmalara dayanır. | Geçerlilik kanıtları üretmek, zincirin birkaç tarafça merkezi kontrolünü teşvik edebilecek özel donanım gerektirir.                                                                    |
| L1'de zincir dışı durumu kurtarmak için gereken verileri depolar, bu da güvenliği, sansür direncini ve merkeziyetsizliği garanti eder.                                                                       | Merkezi operatörler (sıralayıcılar) işlemlerin sıralamasını etkileyebilir.                                                                                                                     |
| Kullanıcılar daha yüksek sermaye verimliliğinden yararlanır ve L2'den gecikme olmadan fon çekebilirler.                                                                                                           | Donanım gereksinimleri, zinciri ilerlemeye zorlayabilecek katılımcı sayısını azaltabilir, bu da kötü niyetli operatörlerin rollup'ın durumunu dondurma ve kullanıcıları sansürleme riskini artırır. |
| Canlılık varsayımlarına bağlı değildir ve kullanıcıların fonlarını korumak için zinciri doğrulaması gerekmez.                                                                                              | Bazı kanıtlama sistemleri (ör. ZK-SNARK), yanlış kullanıldığında bir ZK-rollup'ın güvenlik modelini potansiyel olarak tehlikeye atabilecek güvenilir bir kurulum gerektirir.                                                     |
| Daha iyi veri sıkıştırma, Ethereum'da `calldata` yayınlama maliyetlerini azaltmaya ve kullanıcılar için rollup ücretlerini en aza indirmeye yardımcı olabilir.                                                                             |                                                                                                                                                                                                    |

### ZK-rollup'ların görsel bir açıklaması {#zk-video}

Finematics'in ZK-rollup'ları açıklamasını izleyin:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Kimler bir zkEVM üzerinde çalışıyor? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>L2 ve L1 için zkEVM</AlertTitle>
<AlertDescription>
Aşağıdaki projeler, Katman 2 rollup'ları oluşturmak için zkEVM teknolojisini kullanır. Ayrıca, doğrulayıcıların işlemleri yeniden yürütmeden Ethereum bloklarını doğrulamasına olanak tanıyacak olan [L1 blok doğrulaması](/roadmap/zkevm/) için zkEVM kullanımına yönelik araştırmalar da bulunmaktadır.
</AlertDescription>
</AlertContent>
</Alert>

zkEVM'ler üzerinde çalışan projeler şunları içerir:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM, EVM uyumlu bir ZK-rollup ve Ethereum blokları için geçerlilik kanıtları üretmeye yönelik bir mekanizma geliştirmek üzere Ethereum Vakfı tarafından finanse edilen bir projedir._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _Ethereum ana ağında, sıfır bilgi ispatı doğrulamalarına sahip akıllı sözleşmeler de dahil olmak üzere Ethereum işlemlerini şeffaf bir şekilde yürüten bir sıfır bilgi Ethereum Sanal Makinesi (zkEVM) üzerinde çalışan merkeziyetsiz bir ZK Rollup'tır._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll, Ethereum için yerel bir zkEVM Katman 2 Çözümü oluşturmaya çalışan teknoloji odaklı bir şirkettir._

- **[Taiko](https://taiko.xyz)** - _Taiko, merkeziyetsiz, Ethereum eşdeğeri bir ZK-rollup'tır (bir [Tip 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era, Matter Labs tarafından oluşturulan ve kendi zkEVM'si tarafından desteklenen EVM uyumlu bir ZK Rollup'tır._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet, StarkWare tarafından oluşturulan EVM uyumlu bir katman 2 ölçeklendirme çözümüdür._

- **[Morph](https://www.morphl2.io/)** - _Morph, Katman 2 durum zorluğu sorununu ele almak için zk-kanıtı kullanan hibrit bir rollup ölçeklendirme çözümüdür._

- **[Linea](https://linea.build)** - _Linea, ConsenSys tarafından oluşturulan ve Ethereum ekosistemiyle tamamen uyumlu olan Ethereum eşdeğeri bir zkEVM Katman 2'dir._

## ZK-rollup'lar hakkında daha fazla okuma {#further-reading-on-zk-rollups}

- [Sıfır Bilgi Toplamaları Nelerdir?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Sıfır bilgi toplamaları nelerdir?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Ethereum Rollup'ları İçin Pratik Rehber](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK'lar ve SNARK'lar](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM nedir?](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM türleri: Ethereum eşdeğeri, EVM eşdeğeri, Tip 1, Tip 4 ve diğer şifreli moda sözcükler](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [zkEVM'ye Giriş](https://hackmd.io/@yezhang/S1_KMMbGt)
- [ZK-EVM L2'leri nelerdir?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Harika zkEVM kaynakları](https://github.com/LuozhuZhang/awesome-zkevm)
- [Teknik detaylarıyla ZK-SNARK'lar](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [SNARK'lar nasıl mümkün oluyor?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Eğiticiler: Ethereum'da gizlilik ve sıfır bilgi {#tutorials}

- [Gizli bir durum için sıfır bilgi kullanma](/developers/tutorials/secret-state/) _– Gizli oyun durumunu zincir içinde korumak için ZK kanıtları ve zincir dışı sunucu bileşenleri nasıl kullanılır._
- [Gizli Adresleri Kullanma](/developers/tutorials/stealth-addr/) _– ERC-5564 gizli adresleri, kriptografik anahtar türetme kullanarak anonim ETH transferlerini nasıl sağlar._
- [Web2 kimlik doğrulaması için Ethereum kullanma](/developers/tutorials/ethereum-for-web2-auth/) _– Ethereum cüzdan imzaları SAML tabanlı Web2 kimlik doğrulama sistemleriyle nasıl entegre edilir._