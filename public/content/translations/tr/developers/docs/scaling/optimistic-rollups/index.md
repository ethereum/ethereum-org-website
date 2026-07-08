---
title: "İyimser Rolluplar"
description: "Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olan iyimser rolluplara giriş."
lang: tr
---

İyimser rolluplar, Ethereum'un temel katmanının işlem kapasitesini artırmak için tasarlanmış katman 2 (l2) protokolleridir. İşlemleri zincir dışı işleyerek ana [Ethereum](/) zincirindeki hesaplamayı azaltırlar ve işlem hızlarında önemli iyileştirmeler sunarlar. İyimser rolluplar, [yan zincirler](/developers/docs/scaling/sidechains/) gibi diğer ölçeklendirme çözümlerinden farklı olarak işlem sonuçlarını zincir içi yayınlayarak güvenliğini Ana Ağdan alırlar; veya işlemleri Ethereum üzerinde sahtekarlık kanıtlarıyla doğrulayan ancak işlem verilerini başka bir yerde depolayan [Plasma zincirlerinden](/developers/docs/scaling/plasma/) de ayrılırlar.

Hesaplama, Ethereum kullanmanın yavaş ve pahalı kısmı olduğundan, iyimser rolluplar ölçeklenebilirlikte 10-100 kata kadar iyileştirme sunabilir. İyimser rolluplar ayrıca işlemleri Ethereum'a `calldata` olarak veya [bloblar](/roadmap/danksharding/) içinde yazarak kullanıcılar için gaz maliyetlerini düşürür.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2/) hakkındaki sayfalarımızı okumuş ve anlamış olmalısınız.

## İyimser rollup nedir? {#what-is-an-optimistic-rollup}

İyimser rollup, hesaplama ve durum depolamasını zincir dışına taşımayı içeren bir Ethereum ölçeklendirme yaklaşımıdır. İyimser rolluplar işlemleri Ethereum dışında yürütür, ancak işlem verilerini Ana Ağa `calldata` olarak veya [bloblar](/roadmap/danksharding/) içinde gönderir.

İyimser rollup operatörleri, Ethereum'a göndermeden önce birden fazla zincir dışı işlemi büyük partiler halinde bir araya getirir. Bu yaklaşım, sabit maliyetlerin her partideki birden fazla işleme dağıtılmasını sağlayarak son kullanıcılar için ücretleri düşürür. İyimser rolluplar ayrıca Ethereum'da yayınlanan veri miktarını azaltmak için sıkıştırma teknikleri kullanır.

İyimser rolluplar, zincir dışı işlemlerin geçerli olduğunu varsaydıkları ve zincir içi yayınlanan işlem partileri için geçerlilik kanıtları yayınlamadıkları için "iyimser" olarak kabul edilir. Bu, iyimser rollupları zincir dışı işlemler için kriptografik [geçerlilik kanıtları](/glossary/#validity-proof) yayınlayan [sıfır bilgi rolluplarından](/developers/docs/scaling/zk-rollups) ayırır.

Bunun yerine iyimser rolluplar, işlemlerin doğru hesaplanmadığı durumları tespit etmek için bir sahtekarlık kanıtlama şemasına güvenir. Ethereum'a bir rollup partisi gönderildikten sonra, herkesin bir [sahtekarlık kanıtı](/glossary/#fraud-proof) hesaplayarak bir rollup işleminin sonuçlarına itiraz edebileceği bir zaman penceresi (itiraz süresi olarak adlandırılır) vardır.

Sahtekarlık kanıtı başarılı olursa, rollup protokolü işlemi/işlemleri yeniden yürütür ve rollup'ın durumunu buna göre günceller. Başarılı bir sahtekarlık kanıtının diğer etkisi, yanlış yürütülen işlemi bir bloğa dahil etmekten sorumlu olan sıralayıcının bir ceza almasıdır.

İtiraz süresi geçtikten sonra rollup partisine itiraz edilmezse (yani tüm işlemler doğru bir şekilde yürütülmüşse), geçerli kabul edilir ve Ethereum'da onaylanır. Diğerleri onaylanmamış bir rollup bloğu üzerine inşa etmeye devam edebilir, ancak bir uyarı ile: işlem sonuçları, daha önce yayınlanan yanlış yürütülmüş bir işleme dayanıyorsa geri alınacaktır.

## İyimser rolluplar Ethereum ile nasıl etkileşime girer? {#optimistic-rollups-and-ethereum}

İyimser rolluplar, Ethereum üzerinde çalışmak üzere inşa edilmiş [zincir dışı ölçeklendirme çözümleridir](/developers/docs/scaling/#offchain-scaling). Her iyimser rollup, Ethereum ağında dağıtılan bir dizi akıllı sözleşme tarafından yönetilir. İyimser rolluplar işlemleri ana Ethereum zinciri dışında işler, ancak zincir dışı işlemleri (partiler halinde) zincir içi bir rollup sözleşmesine gönderir. Ethereum blokzinciri gibi, bu işlem kaydı da değişmezdir ve "iyimser rollup zincirini" oluşturur.

Bir iyimser rollup'ın mimarisi aşağıdaki parçalardan oluşur:

**Zincir içi sözleşmeler**: İyimser rollup'ın çalışması, Ethereum üzerinde çalışan akıllı sözleşmeler tarafından kontrol edilir. Bu, rollup bloklarını depolayan, rollup üzerindeki durum güncellemelerini izleyen ve kullanıcı mevduatlarını takip eden sözleşmeleri içerir. Bu anlamda Ethereum, iyimser rolluplar için temel katman veya "katman 1" olarak hizmet eder.

**Zincir dışı sanal makine (VM)**: İyimser rollup protokolünü yöneten sözleşmeler Ethereum üzerinde çalışsa da, rollup protokolü hesaplama ve durum depolamasını [Ethereum Sanal Makinesi](/developers/docs/evm/)'nden ayrı başka bir sanal makinede gerçekleştirir. Zincir dışı VM, uygulamaların yaşadığı ve durum değişikliklerinin yürütüldüğü yerdir; iyimser bir rollup için üst katman veya "katman 2" olarak hizmet eder.

İyimser rolluplar, EVM için yazılmış veya derlenmiş programları çalıştırmak üzere tasarlandığından, zincir dışı VM birçok EVM tasarım spesifikasyonunu içerir. Ek olarak, zincir içi hesaplanan sahtekarlık kanıtları, Ethereum ağının zincir dışı VM'de hesaplanan durum değişikliklerinin geçerliliğini zorlamasına olanak tanır.

İyimser rolluplar 'hibrit ölçeklendirme çözümleri' olarak tanımlanır çünkü ayrı protokoller olarak var olsalar da güvenlik özelliklerini Ethereum'dan alırlar. Diğer şeylerin yanı sıra Ethereum, bir rollup'ın zincir dışı hesaplamasının doğruluğunu ve hesaplamanın arkasındaki verilerin kullanılabilirliğini garanti eder. Bu, iyimser rollupları güvenlik için Ethereum'a güvenmeyen saf zincir dışı ölçeklendirme protokollerinden (örn. [yan zincirler](/developers/docs/scaling/sidechains/)) daha güvenli hale getirir.

İyimser rolluplar aşağıdakiler için ana Ethereum protokolüne güvenir:

### Veri kullanılabilirliği {#data-availability}

Belirtildiği gibi, iyimser rolluplar işlem verilerini Ethereum'a `calldata` veya [bloblar](/roadmap/danksharding/) olarak gönderir. Rollup zincirinin yürütülmesi gönderilen işlemlere dayandığından, herkes Ethereum'un temel katmanına sabitlenmiş bu bilgiyi rollup'ın durumunu yürütmek ve durum geçişlerinin doğruluğunu doğrulamak için kullanabilir.

[Veri kullanılabilirliği](/developers/docs/data-availability/) kritiktir çünkü durum verilerine erişim olmadan, itirazcılar geçersiz rollup işlemlerine itiraz etmek için sahtekarlık kanıtları oluşturamazlar. Ethereum'un veri kullanılabilirliği sağlamasıyla, rollup operatörlerinin kötü niyetli eylemlerden (örn. geçersiz bloklar göndermek) paçayı sıyırma riski azalır.

### Sansür direnci {#censorship-resistance}

İyimser rolluplar ayrıca sansür direnci için Ethereum'a güvenir. İyimser bir rollup'ta merkezi bir varlık (operatör), işlemleri işlemekten ve rollup bloklarını Ethereum'a göndermekten sorumludur. Bunun bazı sonuçları vardır:

- Rollup operatörleri tamamen çevrimdışı olarak veya belirli işlemleri içeren bloklar üretmeyi reddederek kullanıcıları sansürleyebilir.

- Rollup operatörleri, sahipliğin Merkle kanıtları için gerekli durum verilerini saklayarak kullanıcıların rollup sözleşmesine yatırılan fonları çekmesini engelleyebilir. Durum verilerini saklamak ayrıca rollup'ın durumunu kullanıcılardan gizleyebilir ve rollup ile etkileşime girmelerini engelleyebilir.

İyimser rolluplar, operatörleri durum güncellemeleriyle ilişkili verileri Ethereum'da yayınlamaya zorlayarak bu sorunu çözer. Rollup verilerini zincir içi yayınlamanın aşağıdaki faydaları vardır:

- İyimser bir rollup operatörü çevrimdışı olursa veya işlem partileri üretmeyi durdurursa, başka bir düğüm mevcut verileri kullanarak rollup'ın son durumunu yeniden üretebilir ve blok üretimine devam edebilir.

- Kullanıcılar, fonların sahipliğini kanıtlayan Merkle kanıtları oluşturmak ve varlıklarını rollup'tan çekmek için işlem verilerini kullanabilir.

- Kullanıcılar ayrıca işlemlerini sıralayıcı yerine L1'e gönderebilirler, bu durumda sıralayıcı geçerli bloklar üretmeye devam etmek için işlemi belirli bir süre sınırı içinde dahil etmek zorundadır.

### Uzlaşma {#settlement}

Ethereum'un iyimser rolluplar bağlamında oynadığı bir diğer rol de uzlaşma katmanı rolüdür. Bir uzlaşma katmanı tüm blokzincir ekosistemini sabitler, güvenliği sağlar ve tahkim gerektiren başka bir zincirde (bu durumda iyimser rolluplar) bir anlaşmazlık meydana gelirse nesnel kesinlik sağlar.

Ethereum Ana Ağı, iyimser rollupların sahtekarlık kanıtlarını doğrulaması ve anlaşmazlıkları çözmesi için bir merkez sağlar. Dahası, rollup üzerinde gerçekleştirilen işlemler yalnızca rollup bloğu Ethereum'da kabul edildikten _sonra_ kesinleşir. Bir rollup işlemi Ethereum'un temel katmanına işlendikten sonra geri alınamaz (son derece düşük ihtimalli bir zincir yeniden düzenleme durumu hariç).

## İyimser rolluplar nasıl çalışır? {#how-optimistic-rollups-work}

### İşlem yürütme ve toplama {#transaction-execution-and-aggregation}

Kullanıcılar işlemlerini, iyimser rollup üzerinde işlemleri işlemekten sorumlu düğümler olan "operatörlere" gönderir. "Doğrulayıcı" veya "toplayıcı" olarak da bilinen operatör, işlemleri toplar, temel verileri sıkıştırır ve bloğu Ethereum'da yayınlar.

Herkes bir doğrulayıcı olabilse de, iyimser rollup doğrulayıcıları, tıpkı bir [Hisse Kanıtı (PoS) sistemi](/developers/docs/consensus-mechanisms/pos/) gibi blok üretmeden önce bir teminat sağlamalıdır. Doğrulayıcı geçersiz bir blok yayınlarsa veya eski ama geçersiz bir blok üzerine inşa ederse (kendi bloğu geçerli olsa bile) bu teminatta kesinti yapılabilir. Bu şekilde iyimser rolluplar, doğrulayıcıların dürüst davranmasını sağlamak için kriptoekonomik teşvikleri kullanır.

İyimser rollup zincirindeki diğer doğrulayıcıların, rollup durumunun kendi kopyalarını kullanarak gönderilen işlemleri yürütmeleri beklenir. Bir doğrulayıcının son durumu operatörün önerdiği durumdan farklıysa, bir itiraz başlatabilir ve bir sahtekarlık kanıtı hesaplayabilir.

Bazı iyimser rolluplar izinsiz bir doğrulayıcı sisteminden vazgeçebilir ve zinciri yürütmek için tek bir "sıralayıcı" kullanabilir. Bir doğrulayıcı gibi, sıralayıcı da işlemleri işler, rollup blokları üretir ve rollup işlemlerini L1 zincirine (Ethereum) gönderir.

Sıralayıcı, işlemlerin sıralanması üzerinde daha fazla kontrole sahip olduğu için normal bir rollup operatöründen farklıdır. Ayrıca, sıralayıcı rollup zincirine öncelikli erişime sahiptir ve zincir içi sözleşmeye işlem göndermeye yetkili tek varlıktır. Sıralayıcı olmayan düğümlerden veya normal kullanıcılardan gelen işlemler, sıralayıcı bunları yeni bir partiye dahil edene kadar ayrı bir gelen kutusunda sıraya alınır.

#### Rollup bloklarını Ethereum'a gönderme {#submitting-blocks-to-ethereum}

Belirtildiği gibi, iyimser bir rollup operatörü zincir dışı işlemleri bir parti halinde bir araya getirir ve onaylanması için Ethereum'a gönderir. Bu süreç, işlemle ilgili verileri sıkıştırmayı ve Ethereum'da `calldata` olarak veya bloblar içinde yayınlamayı içerir.

`calldata`, akıllı bir sözleşmede çoğunlukla [bellek](/developers/docs/smart-contracts/anatomy/#memory) gibi davranan, değiştirilemeyen, kalıcı olmayan bir alandır. `calldata`, blokzincirin [geçmiş günlüklerinin](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) bir parçası olarak zincir içi kalıcı olsa da, Ethereum'un durumunun bir parçası olarak depolanmaz. `calldata` Ethereum'un durumunun hiçbir kısmına dokunmadığı için, verileri zincir içi depolamak için durumdan daha ucuzdur.

`calldata` anahtar kelimesi ayrıca Solidity'de yürütme zamanında bir akıllı sözleşme işlevine argümanlar geçirmek için kullanılır. `calldata`, bir işlem sırasında çağrılan işlevi tanımlar ve işleve yönelik girdileri rastgele bir bayt dizisi biçiminde tutar.

İyimser rolluplar bağlamında, `calldata` sıkıştırılmış işlem verilerini zincir içi sözleşmeye göndermek için kullanılır. Rollup operatörü, rollup sözleşmesindeki gerekli işlevi çağırarak ve sıkıştırılmış verileri işlev argümanları olarak geçirerek yeni bir parti ekler. Rollupların maruz kaldığı maliyetlerin çoğu verileri zincir içi depolamaktan kaynaklandığından, `calldata` kullanmak kullanıcı ücretlerini düşürür.

İşte bu kavramın nasıl çalıştığını göstermek için bir rollup partisi gönderiminin [bir örneği](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591). Sıralayıcı `appendSequencerBatch()` yöntemini çağırdı ve sıkıştırılmış işlem verilerini `calldata` kullanarak girdi olarak geçirdi.

Bazı rolluplar artık işlem partilerini Ethereum'a göndermek için blobları kullanıyor.

Bloblar değiştirilemez ve kalıcı değildir (tıpkı `calldata` gibi) ancak yaklaşık 18 gün sonra geçmişten budanırlar. Bloblar hakkında daha fazla bilgi için bkz. [danksharding](/roadmap/danksharding).

### Durum taahhütleri {#state-commitments}

Herhangi bir zamanda, iyimser rollup'ın durumu (hesaplar, bakiyeler, sözleşme kodu vb.) "durum ağacı" adı verilen bir [Merkle ağacı](/whitepaper/#merkle-trees) olarak düzenlenir. Rollup'ın en son durumuna referans veren bu Merkle ağacının kökü (durum kökü), hashlenir ve rollup sözleşmesinde saklanır. Zincirdeki her durum geçişi, bir operatörün yeni bir durum kökü hesaplayarak taahhüt ettiği yeni bir rollup durumu üretir.

Operatörün partileri gönderirken hem eski durum köklerini hem de yeni durum köklerini sunması gerekir. Eski durum kökü zincir içi sözleşmedeki mevcut durum köküyle eşleşirse, ikincisi atılır ve yeni durum köküyle değiştirilir.

Rollup operatörünün ayrıca işlem partisinin kendisi için bir Merkle kökü taahhüt etmesi gerekir. Bu, herkesin bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sunarak bir işlemin partiye (L1'de) dahil edildiğini kanıtlamasına olanak tanır.

Durum taahhütleri, özellikle durum kökleri, iyimser bir rollup'ta durum değişikliklerinin doğruluğunu kanıtlamak için gereklidir. Rollup sözleşmesi, operatörlerden gelen yeni durum köklerini yayınlandıktan hemen sonra kabul eder, ancak daha sonra rollup'ı doğru durumuna geri yüklemek için geçersiz durum köklerini silebilir.

### Sahtekarlık kanıtlama {#fraud-proving}

Açıklandığı gibi, iyimser rolluplar herkesin geçerlilik kanıtı sunmadan blok yayınlamasına olanak tanır. Ancak zincirin güvende kalmasını sağlamak için iyimser rolluplar, herkesin bir durum geçişine itiraz edebileceği bir zaman penceresi belirler. Bu nedenle, herkes geçerliliklerine itiraz edebileceği için rollup bloklarına "iddialar" denir.

Birisi bir iddiaya itiraz ederse, rollup protokolü sahtekarlık kanıtı hesaplamasını başlatır. Her tür sahtekarlık kanıtı etkileşimlidir; başka bir kişinin itiraz edebilmesi için birinin bir iddia yayınlaması gerekir. Fark, sahtekarlık kanıtını hesaplamak için kaç etkileşim turunun gerektiğinde yatar.

Tek turlu etkileşimli kanıtlama şemaları, geçersiz iddiaları tespit etmek için itiraz edilen işlemleri L1'de yeniden oynatır. Rollup protokolü, bir doğrulayıcı sözleşmesi kullanarak itiraz edilen işlemin L1'de (Ethereum) yeniden yürütülmesini taklit eder ve hesaplanan durum kökü itirazı kimin kazanacağını belirler. İtirazcının rollup'ın doğru durumu hakkındaki talebi doğruysa, operatör teminatında kesinti yapılarak cezalandırılır.

Ancak, sahtekarlığı tespit etmek için işlemleri L1'de yeniden yürütmek, bireysel işlemler için durum taahhütleri yayınlamayı gerektirir ve rollupların zincir içi yayınlaması gereken verileri artırır. İşlemleri yeniden oynatmak ayrıca önemli gaz maliyetlerine neden olur. Bu nedenlerle, iyimser rolluplar aynı hedefe (yani geçersiz rollup işlemlerini tespit etmeye) daha fazla verimlilikle ulaşan çok turlu etkileşimli kanıtlamaya geçiyor.

#### Çok turlu etkileşimli kanıtlama {#multi-round-interactive-proving}

Çok turlu etkileşimli kanıtlama, iddia sahibi ile itirazcı arasında, nihayetinde yalan söyleyen tarafa karar veren bir L1 doğrulayıcı sözleşmesi tarafından denetlenen karşılıklı bir protokolü içerir. Bir L2 düğümü bir iddiaya itiraz ettikten sonra, iddia sahibinin itiraz edilen iddiayı iki eşit yarıya bölmesi gerekir. Bu durumda her bir bireysel iddia, diğeri kadar hesaplama adımı içerecektir.

İtirazcı daha sonra hangi iddiaya itiraz etmek istediğini seçecektir. Bölme işlemi ("ikiye bölme protokolü" olarak adlandırılır), her iki taraf da _tek_ bir yürütme adımı hakkındaki bir iddiayı tartışana kadar devam eder. Bu noktada L1 sözleşmesi, sahtekar tarafı yakalamak için talimatı (ve sonucunu) değerlendirerek anlaşmazlığı çözecektir.

İddia sahibinin, itiraz edilen tek adımlı hesaplamanın geçerliliğini doğrulayan "tek adımlı bir kanıt" sunması gerekir. İddia sahibi tek adımlı kanıtı sunamazsa veya L1 doğrulayıcısı kanıtı geçersiz sayarsa, itirazı kaybeder.

Bu tür sahtekarlık kanıtı hakkında bazı notlar:

1. Çok turlu etkileşimli sahtekarlık kanıtlama verimli kabul edilir çünkü L1 zincirinin anlaşmazlık tahkiminde yapması gereken işi en aza indirir. Tüm işlemi yeniden oynatmak yerine, L1 zincirinin rollup'ın yürütülmesinde yalnızca bir adımı yeniden yürütmesi gerekir.

2. İkiye bölme protokolleri zincir içi yayınlanan veri miktarını azaltır (her işlem için durum taahhütleri yayınlamaya gerek yoktur). Ayrıca, iyimser rollup işlemleri Ethereum'un gaz limiti ile kısıtlanmaz. Buna karşılık, işlemleri yeniden yürüten iyimser rolluplar, tek bir Ethereum işlemi içinde yürütülmesini taklit etmek için bir L2 işleminin daha düşük bir gaz limitine sahip olduğundan emin olmalıdır.

3. Kötü niyetli iddia sahibinin teminatının bir kısmı itirazcıya verilirken, diğer kısmı yakılır. Yakım, doğrulayıcılar arasında gizli anlaşmayı önler; iki doğrulayıcı sahte itirazlar başlatmak için gizli anlaşma yaparsa, yine de tüm stake'in önemli bir bölümünü kaybederler.

4. Çok turlu etkileşimli kanıtlama, her iki tarafın da (iddia sahibi ve itirazcı) belirtilen zaman penceresi içinde hamle yapmasını gerektirir. Son teslim tarihinden önce harekete geçilmemesi, temerrüde düşen tarafın itirazı kaybetmesine neden olur.

#### Sahtekarlık kanıtları iyimser rolluplar için neden önemlidir? {#fraud-proof-benefits}

Sahtekarlık kanıtları önemlidir çünkü iyimser rolluplarda _güven gerektirmeyen kesinliği_ kolaylaştırırlar. Güven gerektirmeyen kesinlik, iyimser rollupların bir işlemin (geçerli olduğu sürece) eninde sonunda onaylanacağını garanti eden bir özelliğidir.

Kötü niyetli düğümler, sahte itirazlar başlatarak geçerli bir rollup bloğunun onaylanmasını geciktirmeye çalışabilir. Ancak sahtekarlık kanıtları eninde sonunda rollup bloğunun geçerliliğini kanıtlayacak ve onaylanmasına neden olacaktır.

Bu aynı zamanda iyimser rollupların başka bir güvenlik özelliğiyle de ilgilidir: zincirin geçerliliği _bir_ dürüst düğümün varlığına dayanır. Dürüst düğüm, geçerli iddialar yayınlayarak veya geçersiz iddialara itiraz ederek zinciri doğru bir şekilde ilerletebilir. Durum ne olursa olsun, dürüst düğümle anlaşmazlığa giren kötü niyetli düğümler, sahtekarlık kanıtlama sürecinde stake'lerini kaybedeceklerdir.

### L1/L2 birlikte çalışabilirliği {#l1-l2-interoperability}

İyimser rolluplar, Ethereum Ana Ağı ile birlikte çalışabilirlik için tasarlanmıştır ve kullanıcıların L1 ile L2 arasında mesajları ve rastgele verileri geçirmesine olanak tanır. Ayrıca EVM ile uyumludurlar, böylece mevcut [merkeziyetsiz uygulamaları (dapp)](/developers/docs/dapps/) iyimser rolluplara taşıyabilir veya Ethereum geliştirme araçlarını kullanarak yeni dapp'ler oluşturabilirsiniz.

#### 1. Varlık hareketi {#asset-movement}

##### Rollup'a giriş

İyimser bir rollup kullanmak için kullanıcılar ETH, ERC-20 token'ları ve kabul edilen diğer varlıkları L1'deki rollup'ın [köprü](/developers/docs/bridges/) sözleşmesine yatırırlar. Köprü sözleşmesi işlemi L2'ye iletecek, burada eşdeğer miktarda varlık basılacak ve iyimser rollup üzerinde kullanıcının seçtiği adrese gönderilecektir.

Kullanıcı tarafından oluşturulan işlemler (L1 > L2 para yatırma gibi) genellikle sıralayıcı bunları rollup sözleşmesine yeniden gönderene kadar sıraya alınır. Ancak sansür direncini korumak için iyimser rolluplar, izin verilen maksimum süreyi aşacak şekilde gecikmişse kullanıcıların doğrudan zincir içi rollup sözleşmesine bir işlem göndermesine olanak tanır.

Bazı iyimser rolluplar, sıralayıcıların kullanıcıları sansürlemesini önlemek için daha basit bir yaklaşım benimser. Burada bir blok, rollup zincirinde işlenen işlemlere ek olarak önceki bloktan bu yana L1 sözleşmesine gönderilen tüm işlemlerle (örn. para yatırma işlemleri) tanımlanır. Bir sıralayıcı bir L1 işlemini görmezden gelirse, (kanıtlanabilir şekilde) yanlış durum kökünü yayınlayacaktır; bu nedenle sıralayıcılar, L1'de yayınlandıktan sonra kullanıcı tarafından oluşturulan mesajları geciktiremezler.

##### Rollup'tan çıkış

İyimser bir rollup'tan Ethereum'a çekim yapmak, sahtekarlık kanıtlama şeması nedeniyle daha zordur. Bir kullanıcı L1'de emanet edilen fonları çekmek için bir L2 > L1 işlemi başlatırsa, kabaca yedi gün süren itiraz süresinin geçmesini beklemelidir. Yine de çekim işleminin kendisi oldukça basittir.

Çekim talebi L2 rollup'ında başlatıldıktan sonra işlem bir sonraki partiye dahil edilirken, kullanıcının rollup üzerindeki varlıkları yakılır. Parti Ethereum'da yayınlandıktan sonra kullanıcı, çıkış işleminin bloğa dahil edildiğini doğrulayan bir Merkle kanıtı hesaplayabilir. Daha sonra, işlemi L1'de kesinleştirmek ve fonları Ana Ağa çekmek için gecikme süresi boyunca beklemek meselesidir.

Fonları Ethereum'a çekmeden önce bir hafta beklemekten kaçınmak için iyimser rollup kullanıcıları bir **likidite sağlayıcı** (LP) kullanabilir. Bir likidite sağlayıcı, bekleyen bir L2 çekim işleminin sahipliğini üstlenir ve kullanıcıya L1'de (bir ücret karşılığında) ödeme yapar.

Likidite sağlayıcılar, fonları serbest bırakmadan önce (zinciri kendileri yürüterek) kullanıcının çekim talebinin geçerliliğini kontrol edebilirler. Bu şekilde işlemin eninde sonunda onaylanacağına dair güvenceleri olur (yani güven gerektirmeyen kesinlik).

#### 2. EVM uyumluluğu {#evm-compatibility}

Geliştiriciler için iyimser rollupların avantajı, [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) ile uyumlulukları veya daha iyisi eşdeğerlikleridir. EVM uyumlu rolluplar, [Ethereum Sarı Bülten](https://ethereum.github.io/yellowpaper/paper.pdf) içindeki spesifikasyonlara uyar ve EVM'yi baytkod düzeyinde destekler.

İyimser rolluplarda EVM uyumluluğunun aşağıdaki faydaları vardır:

i. Geliştiriciler, kod tabanlarını kapsamlı bir şekilde değiştirmek zorunda kalmadan Ethereum'daki mevcut akıllı sözleşmeleri iyimser rollup zincirlerine taşıyabilirler. Bu, Ethereum akıllı sözleşmelerini L2'de dağıtırken geliştirme ekiplerine zaman kazandırabilir.

ii. İyimser rollupları kullanan geliştiriciler ve proje ekipleri Ethereum'un altyapısından yararlanabilir. Buna programlama dilleri, kod kütüphaneleri, test araçları, istemci yazılımı, dağıtım altyapısı vb. dahildir.

Mevcut araçları kullanmak önemlidir çünkü bu araçlar yıllar içinde kapsamlı bir şekilde denetlenmiş, hatalardan arındırılmış ve geliştirilmiştir. Ayrıca Ethereum geliştiricilerinin tamamen yeni bir geliştirme yığınıyla nasıl inşa edeceklerini öğrenme ihtiyacını da ortadan kaldırır.

#### 3. Zincirler arası sözleşme çağrıları {#cross-chain-contract-calls}

Kullanıcılar (harici olarak sahip olunan hesaplar), rollup sözleşmesine bir işlem göndererek veya bunu onlar için bir sıralayıcı veya doğrulayıcıya yaptırarak L2 sözleşmeleriyle etkileşime girerler. İyimser rolluplar ayrıca Ethereum'daki sözleşme hesaplarının, L1 ve L2 arasında mesajları iletmek ve veri geçirmek için köprüleme sözleşmelerini kullanarak L2 sözleşmeleriyle etkileşime girmesine olanak tanır. Bu, Ethereum Ana Ağındaki bir L1 sözleşmesini, bir L2 iyimser rollup'ındaki sözleşmelere ait işlevleri çağıracak şekilde programlayabileceğiniz anlamına gelir.

Zincirler arası sözleşme çağrıları eşzamansız olarak gerçekleşir; yani çağrı önce başlatılır, ardından daha sonraki bir zamanda yürütülür. Bu, çağrının hemen sonuç ürettiği Ethereum'daki iki sözleşme arasındaki çağrılardan farklıdır.

Zincirler arası sözleşme çağrısına bir örnek, daha önce açıklanan token yatırma işlemidir. L1'deki bir sözleşme kullanıcının token'larını emanete alır ve rollup üzerinde eşit miktarda token basmak için eşleştirilmiş bir L2 sözleşmesine bir mesaj gönderir.

Zincirler arası mesaj çağrıları sözleşme yürütülmesiyle sonuçlandığından, gönderenin genellikle hesaplama için [gaz maliyetlerini](/developers/docs/gas/) karşılaması gerekir. İşlemin hedef zincirde başarısız olmasını önlemek için yüksek bir gaz limiti belirlemeniz önerilir. Token köprüleme senaryosu iyi bir örnektir; işlemin L1 tarafı (token'ları yatırma) çalışırsa, ancak L2 tarafı (yeni token'lar basma) düşük gaz nedeniyle başarısız olursa, yatırılan miktar kurtarılamaz hale gelir.

Son olarak, sözleşmeler arasındaki L2 > L1 mesaj çağrılarının gecikmeleri hesaba katması gerektiğini belirtmeliyiz (L1 > L2 çağrıları tipik olarak birkaç dakika sonra yürütülür). Bunun nedeni, iyimser rollup'tan Ana Ağa gönderilen mesajların itiraz penceresi sona erene kadar yürütülememesidir.

## İyimser rollup ücretleri nasıl çalışır? {#how-do-optimistic-rollup-fees-work}

İyimser rolluplar, kullanıcıların işlem başına ne kadar ödediğini belirtmek için tıpkı Ethereum gibi bir gaz ücreti şeması kullanır. İyimser rolluplarda alınan ücretler aşağıdaki bileşenlere bağlıdır:

1. **Durum yazma**: İyimser rolluplar işlem verilerini ve blok başlıklarını (önceki blok başlığı hash'i, durum kökü, parti kökünden oluşur) Ethereum'a bir `blob` veya "ikili büyük nesne" (binary large object) olarak yayınlar. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), verileri zincir içi dahil etmek için uygun maliyetli bir çözüm sundu. Bir `blob`, rollupların sıkıştırılmış durum geçiş verilerini Ethereum L1'e göndermesine olanak tanıyan yeni bir işlem alanıdır. Kalıcı olarak zincir içi kalan `calldata`'nın aksine, bloblar kısa ömürlüdür ve [4096 dönem](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (yaklaşık 18 gün) sonra istemcilerden budanabilir. Sıkıştırılmış işlem partilerini göndermek için blobları kullanarak, iyimser rolluplar işlemleri L1'e yazma maliyetini önemli ölçüde azaltabilir.

2. **Kullanılan blob gazı**: Blob taşıyan işlemler, [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) tarafından sunulana benzer dinamik bir ücret mekanizması kullanır. Tip-3 işlemler için gaz ücreti, blob alanı talebine ve gönderilen işlemin blob alanı kullanımına bağlı olarak ağ tarafından belirlenen bloblar için taban ücreti hesaba katar.

3. **L2 operatör ücretleri**: Bu, tıpkı Ethereum'daki gaz ücretleri gibi, işlemleri işlerken ortaya çıkan hesaplama maliyetlerinin telafisi olarak rollup düğümlerine ödenen miktardır. L2'ler daha yüksek işlem kapasitelerine sahip olduğundan ve Ethereum'daki doğrulayıcıları daha yüksek ücretli işlemlere öncelik vermeye zorlayan ağ tıkanıklıklarıyla karşılaşmadığından, rollup düğümleri daha düşük işlem ücretleri talep eder.

İyimser rolluplar, veri yayınlama maliyetlerini azaltmak için işlemleri toplu işleme ve `calldata`'yı sıkıştırma dahil olmak üzere kullanıcılar için ücretleri düşürmek amacıyla çeşitli mekanizmalar uygular. Ethereum tabanlı iyimser rollupları kullanmanın ne kadara mal olduğuna dair gerçek zamanlı bir genel bakış için [L2 ücret izleyicisini](https://l2fees.info/) kontrol edebilirsiniz.

## İyimser rolluplar Ethereum'u nasıl ölçeklendirir? {#scaling-ethereum-with-optimistic-rollups}

Açıklandığı gibi, iyimser rolluplar veri kullanılabilirliğini garanti etmek için sıkıştırılmış işlem verilerini Ethereum'da yayınlar. Zincir içi yayınlanan verileri sıkıştırma yeteneği, iyimser rolluplarla Ethereum'daki işlem kapasitesini ölçeklendirmek için çok önemlidir.

Ana Ethereum zinciri, gaz birimleri cinsinden ifade edilen blokların ne kadar veri tutabileceğine dair sınırlar koyar ([ortalama blok boyutu](/developers/docs/blocks/#block-size) 15 milyon gazdır). Bu, her işlemin ne kadar gaz kullanabileceğini kısıtlarken, aynı zamanda işlemle ilgili verileri azaltarak blok başına işlenen işlemleri artırabileceğimiz anlamına gelir; bu da ölçeklenebilirliği doğrudan iyileştirir.

İyimser rolluplar, işlem verisi sıkıştırmasını sağlamak ve TPS oranlarını iyileştirmek için çeşitli teknikler kullanır. Örneğin, bu [makale](https://vitalik.eth.limo/general/2021/01/05/rollup.html) temel bir kullanıcı işleminin (Ether gönderme) Ana Ağda ürettiği verilerle aynı işlemin bir rollup üzerinde ne kadar veri ürettiğini karşılaştırmaktadır:

| Parametre | Ethereum (L1) | Rollup (L2) |
| --------- | ---------------------- | ------------- |
| Nonce | ~3 | 0 |
| Gaz fiyatı | ~8 | 0-0.5 |
| Gaz | 3 | 0-0.5 |
| Alıcı (To) | 21 | 4 |
| Değer | 9 | ~3 |
| İmza | ~68 (2 + 33 + 33) | ~0.5 |
| Gönderen (From) | 0 (imzadan kurtarıldı) | 4 |
| **Toplam** | **\~112 bayt** | **\~12 bayt** |

Bu rakamlar üzerinde bazı kaba hesaplamalar yapmak, iyimser bir rollup'ın sağladığı ölçeklenebilirlik iyileştirmelerini göstermeye yardımcı olabilir:

1. Her blok için hedef boyut 15 milyon gazdır ve bir bayt veriyi doğrulamak 16 gaza mal olur. Ortalama blok boyutunu 16 gaza bölmek (15.000.000/16), ortalama bloğun **937.500 bayt veri** tutabileceğini gösterir.
2. Temel bir rollup işlemi 12 bayt kullanıyorsa, ortalama Ethereum bloğu **78.125 rollup işlemi** (937.500/12) veya **39 rollup partisi** (her parti ortalama 2.000 işlem tutuyorsa) işleyebilir.
3. Ethereum'da her 15 saniyede bir yeni bir blok üretilirse, rollup'ın işlem hızları saniyede kabaca **5.208 işleme** ulaşır. Bu, bir Ethereum bloğunun tutabileceği temel rollup işlem sayısını (**78.125**) ortalama blok süresine (**15 saniye**) bölerek yapılır.

İyimser rollup işlemlerinin Ethereum'daki tüm bir bloğu oluşturamayacağı göz önüne alındığında, bu oldukça iyimser bir tahmindir. Ancak, iyimser rollupların Ethereum kullanıcılarına ne kadar ölçeklenebilirlik kazancı sağlayabileceği konusunda kaba bir fikir verebilir (mevcut uygulamalar 2.000 TPS'ye kadar sunar).

Ethereum'da [veri parçalamanın (data sharding)](/roadmap/danksharding/) kullanıma sunulmasının iyimser rolluplarda ölçeklenebilirliği iyileştirmesi bekleniyor. Rollup işlemleri blok alanını rollup olmayan diğer işlemlerle paylaşmak zorunda olduğundan, işlem kapasiteleri ana Ethereum zincirindeki veri işlem kapasitesi ile sınırlıdır. Danksharding, pahalı, kalıcı `CALLDATA` yerine daha ucuz, kalıcı olmayan "blob" depolamayı kullanarak L2 zincirlerinin blok başına veri yayınlaması için mevcut alanı artıracaktır.

### İyimser rollupların artıları ve eksileri {#optimistic-rollups-pros-and-cons}

| Artıları | Eksileri |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Güvenlikten veya güven gereksinimsizliğinden ödün vermeden ölçeklenebilirlikte muazzam iyileştirmeler sunar. | Olası sahtekarlık itirazları nedeniyle işlem kesinliğinde gecikmeler. |
| İşlem verileri katman 1 zincirinde depolanarak şeffaflığı, güvenliği, sansür direncini ve merkeziyetsizliği artırır. | Merkezi rollup operatörleri (sıralayıcılar) işlem sıralamasını etkileyebilir. |
| Sahtekarlık kanıtlama, güven gerektirmeyen kesinliği garanti eder ve dürüst azınlıkların zinciri güvence altına almasına olanak tanır. | Dürüst düğüm yoksa, kötü niyetli bir operatör geçersiz bloklar ve durum taahhütleri yayınlayarak fonları çalabilir. |
| Sahtekarlık kanıtlarını hesaplamak, özel donanım gerektiren geçerlilik kanıtlarının (ZK-rolluplarında kullanılan) aksine normal L2 düğümlerine açıktır. | Güvenlik modeli, rollup işlemlerini yürüten ve geçersiz durum geçişlerine itiraz etmek için sahtekarlık kanıtları sunan en az bir dürüst düğüme dayanır. |
| Rolluplar "güven gerektirmeyen canlılıktan" yararlanır (herkes işlemleri yürüterek ve iddialar yayınlayarak zinciri ilerlemeye zorlayabilir) | Kullanıcılar fonları Ethereum'a geri çekmeden önce bir haftalık itiraz süresinin dolmasını beklemelidir. |
| İyimser rolluplar, zincirdeki güvenliği artırmak için iyi tasarlanmış kriptoekonomik teşviklere güvenir. | Rolluplar tüm işlem verilerini zincir içi yayınlamalıdır, bu da maliyetleri artırabilir. |
| EVM ve Solidity ile uyumluluk, geliştiricilerin Ethereum'a özgü akıllı sözleşmeleri rolluplara taşımasına veya yeni dapp'ler oluşturmak için mevcut araçları kullanmasına olanak tanır. |

### İyimser rollupların görsel bir açıklaması {#optimistic-video}

Daha çok görsel olarak mı öğreniyorsunuz? Finematics'in iyimser rollupları açıklamasını izleyin:

## İyimser rolluplar hakkında daha fazla okuma {#further-reading-on-optimistic-rollups}

- [İyimser rolluplar nasıl çalışır (Tam rehber)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Temel Arbitrum Rehberi](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Ethereum Rollupları İçin Pratik Rehber](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Ethereum L2'lerinde Sahtekarlık Kanıtlarının Durumu](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Optimism'in Rollup'ı gerçekte nasıl çalışır?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [OVM Derinlemesine İnceleme](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [İyimser Sanal Makine nedir?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
## Eğitimler: Ethereum'da iyimser rolluplar ve köprüler {#tutorials}

- [Optimism standart köprü sözleşmesi incelemesi](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Varlıkları L1 ve L2 arasında taşımak için Optimism standart köprüsünün açıklamalı bir kod incelemesi._
