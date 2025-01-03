---
title: İyimser Toplamalar
description: Ethereum topluluğu tarafından kullanılmakta olan bir ölçeklendirme çözümü sunan iyimser toplamalara giriş.
lang: tr
---

İyimser toplamalar, Ethereum temel katmanının işlem hacmini genişletmek üzere tasarlanmış katman 2 (L2) protokolleridir. Ana Ethereum zincirindeki hesaplama yükünü, işlemleri zincir dışında yürüterek azaltarak işleme hızlarında önemli iyileştirmeler sunarlar. Diğer ölçeklendirme çözümleri olan [yan zincirlerin](/developers/docs/scaling/sidechains/) aksine iyimser toplamalar, işlem sonuçlarını zincir üstünde yayımlayarak Ana ağ'dan güvenlik alırken; [plazma zincirleri](/developers/docs/scaling/plasma/) ise Ethereum'da sahtecilik kanıtları ile işlemleri doğrular ancak işlem verilerini farklı bir yerde saklarlar.

Hesaplama, Ethereum'u kullanmanın yavaş ve pahalı kısmı olduğundan iyimser toplamalar ölçeklenebilirlikte 10-100x'lik iyileştirmeler sunabilir. İyimser toplamalar ayrıca işlemleri Ethereum'a çağrı verisi `calldata` ya da [blobs](/roadmap/danksharding/) olarak yazar, bu da kullanıcılar için gaz maliyetlerini azaltır.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2/) hakkındaki sayfalarımızı okumuş ve anlamış olmalısınız.

## İyimser toplama nedir? {#what-is-an-optimistic-rollup}

Bir iyimser toplama, Ethereum'u ölçeklendirmek amacıyla hesaplama ve durum depolamayı zincir dışına taşımayı içeren bir çözüm yaklaşımıdır. İyimser toplamalar, işlemleri Ethereum dışında yürütür ancak işlem verilerini Ana Ağa `calldata` veya [blobs](/roadmap/danksharding/) olarak gönderir.

İyimser toplama operatörleri, Ethereum'a göndermeden önce birden fazla zincir dışı işlemi büyük paketler halinde bir araya getirir. Bu yaklaşım, sabit maliyetlerin her paket içerisindeki birden çok işlem arasında paylaştırarak son kullanıcılar için ücretleri azaltmaya olanak tanır. İyimser toplamalar ayrıca Ethereum'da yayımlanan veri miktarını azaltmak için sıkıştırma tekniklerini kullanır.

İyimser toplamalar, zincir dışı işlemlerin geçerli olduğunu varsaydıkları ve zincir üstünde yayımlanan işlem paketleri için geçerlilik kanıtları yayımlamadıkları için "iyimser" olarak adlandırılır. Bu durum, iyimser toplamaları zincir dışı işlemler için kriptografik [geçerlilik kanıtları](/glossary/#validity-proof) yayımlayan [sıfır-bilgi toplamaları](/developers/docs/scaling/zk-rollups)ndan ayırır.

İyimser toplamalar, işlemlerin doğru şekilde hesaplanmadığı durumları tespit etme konusunda bir sahtekarlık kanıtlama şemasına güvenir. Bir toplama partisi Ethereum'a gönderildikten sonra, isteyen herkesin bir [sahtecilik kanıtı](/glossary/#fraud-proof)nı hesaplayarak bir toplama işleminin sonuçlarına itiraz edebileceği bir zaman penceresi (itiraz dönemi olarak adlandırılır) bulunmaktadır.

Eğer sahtecilik kanıtı başarılı olursa, toplama protokolü işlemi/işlemleri yeniden yürütür ve toplamanın durumunu buna göre günceller. Başarılı bir sahtecilik kanıtının bir diğer etkisi, yanlış gerçekleştirilmiş işlemi bir bloğa dahil etmekten sorumlu sıralayıcının ceza almasıdır.

Toplama partisinin itiraz süresi sona erdikten sonra hala itiraz edilmemişse (yani tüm işlemler doğru bir şekilde yürütülmüşse), parti geçerli sayılır ve Ethereum'da kabul edilir. Diğerleri, doğrulanmamış bir toplama bloğu üzerine inşa etmeye devam edebilir, ancak bir uyarı söz konusudur: işlem sonuçları, önceden yayınlanmış ve yanlış gerçekleştirilmiş bir işleme dayanıyorsa sonuçlar tersine çevrilecektir.

## İyimser toplamalar Ethereum ile nasıl etkileşime girer? {#optimistic-rollups-and-Ethereum}

İyimser toplamalar, Ethereum üzerinde çalışacak şekilde inşa edilmiş [zincir dışı ölçeklendirme çözümleri](/developers/docs/scaling/#off-chain-scaling)dir. Her iyimser toplama, Ethereum ağına dağıtılmış bir dizi akıllı sözleşme tarafından yönetilir. İyimser toplamalar, işlemleri ana Ethereum zinciri dışında gerçekleştirir ancak zincir dışındaki işlemleri (toplu halde) zincir üzerindeki bir toplama sözleşmesine gönderir. Ethereum blokzincirinde olduğu gibi, bu işlem kaydı da değiştirilemezdir ve "iyimser toplama zincirini" oluşturur.

Bir iyimser toplamanın mimarisi şu bölümlerden oluşur:

**Zincir üstü sözleşmeler**: İyimser toplamaların çalışması, Ethereum üzerinde çalışan akıllı sözleşmeler tarafından kontrol edilir. Bu, toplama bloklarını depolayan, toplamada durum güncellemelerini izleyen ve kullanıcı tarafından yapılan yatırma işlemlerini takip eden sözleşmeleri içerir. Bu anlamda Ethereum, iyimser toplamalar için temel katman veya "katman 1" olarak hizmet verir.

**Zincir dışı sanal makine (VM)**: İyimser toplama protokolünü yöneten sözleşmeler Ethereum üzerinde çalışsa da, toplama protokolü hesaplama ve durum depolamayı [Ethereum Sanal Makinası](/developers/docs/evm/)'ndan ayrı, başka bir sanal makinede gerçekleştirir. Zincir dışı VM yani sanal makine, uygulamaların yaşadığı ve durum değişikliklerinin yürütüldüğü yerdir; bu, bir iyimser toplama için üst katman veya "katman 2" olarak hizmet eder.

İyimser toplamalar EVM için yazılmış ya da derlenmiş programları çalıştırmak üzere tasarlandığından, zincir dışı sanal makine birçok EVM tasarım özelliğini içerir. Ek olarak, zincir içinde hesaplanan sahtecilik kanıtları, Ethereum ağının durum değişikliklerinin geçerliliğinin zincir dışı VM'de hesaplanmasını koşul olarak koymasına olanak tanır.

İyimser toplamalar "hibrit ölçeklendirme çözümleri" olarak tanımlanmaktadır. Çünkü ayrı protokoller olarak var olmalarına rağmen güvenlik özellikleri Ethereum'dan türetilmiştir. Ethereum, bir toplamanın zincir dışı hesaplamasının doğruluğunu ve hesaplamanın arkasındaki verilerin kullanılabilirliğini garanti eder. Bu, iyimser toplamaları güvenlik için Ethereum'a güvenmeyen saf zincir dışı ölçeklendirme protokollerinden (örneğin, [yan zincirler](/developers/docs/scaling/sidechains/)) daha güvenli hale getirir.

İyimser toplamalar aşağıdakiler için ana Ethereum protokolüne güvenir:

### Veri mevcudiyeti {#data-availability}

Belirtildiği üzere iyimser toplamalar, işlem verilerini Ethereum'a `calldata` veya [blobs](/roadmap/danksharding/) olarak gönderir. Toplama zincirinin yürütülmesi gönderilen işlemlere dayandığından, herkes Ethereum'un temel katmanında bulunan bu bilgileri kullanarak toplamanın durumunu yürütebilir ve durum geçişlerinin doğruluğunu teyit edebilir.

[Veri kullanılabilirliği](/developers/docs/data-availability/) kritiktir; çünkü itiraz eden kişiler, durum verilerine erişim olmadan geçersiz toplama işlemlerine itiraz etmek için sahtecilik kanıtları oluşturamazlar. Ethereum'un veri mevcudiyeti ve kullanılabilirliği sağlaması sayesinde, toplama operatörlerinin kötü niyetli hareketlerden (ör. geçersiz bloklar gönderme) paçayı sıyırma riski azalır.

### Sansüre dayanıklılık {#censorship-resistance}

İyimser toplamalar da sansüre karşı direnç konusunda Ethereum'a güvenir. Bir iyimser toplamada işlemleri işlemekten ve Ethereum'a toplama blokları göndermekten merkezi bir varlık (operatör) sorumludur. Bunun bazı sonuçları vardır:

- Toplama operatörleri tamamen çevrimdışı kalarak ya da belirli işlemleri içeren blokları üretmeyi reddederek kullanıcıları sansürleyebilir.

- Toplama operatörleri, Merkle sahiplik kanıtları için gerekli olan durum verilerini tutarak kullanıcıların toplama sözleşmesinde depoladıkları fonları çekmelerini engelleyebilir. Durum verilerinin tutulması, toplamanın durumunu kullanıcılardan gizleyebilir ve toplama ile etkileşime girmelerini engelleyebilir.

İyimser toplamalar, bu sorunu operatörleri Ethereum'da durum güncellemeleriyle ilişkilendirilmiş verileri yayınlamaya zorlayarak çözer. Toplama verilerini zincir üstünde yayımlamanın aşağıdaki faydaları vardır:

- İyimser toplama operatörü çevrimdışı olursa veya işlem gruplarını üretmeyi durdurursa, başka bir düğüm mevcut verileri kullanarak toplamanın son durumunu yeniden oluşturabilir ve blok üretimine devam edebilir.

- Kullanıcılar, fonların sahipliğini kanıtlayan Merkle kanıtları oluşturmak ve varlıklarını toplamadan çekmek için işlem verilerini kullanabilir.

- Kullanıcılar, işlemlerini sıralayıcı yerine L1 üzerinden de gönderebilirler; bu durumda sıralayıcı, geçerli bloklar üretmeye devam etmek için işlemi belirli bir zaman sınırı içinde dahil etmek zorundadır.

### Uzlaşma {#settlement}

Ethereum'un iyimser toplamalar bağlamında oynadığı bir diğer rol de, uzlaşma katmanı olmasıdır. Bir uzlaşma katmanı tüm blokzincir ekosistemi için çıpa görevi görür, güvenliği tesis eder ve başka bir zincirde (bu durumda iyimser toplamalar) hakemlik gerektiren bir anlaşmazlık meydana gelirse nesnel kesinlik sağlar.

Ethereum Ana Ağı, iyimser toplamaların sahtecilik kanıtlarını doğrulaması ve anlaşmazlıkları çözmesi için bir merkez sunar. Dahası, toplama üzerinde gerçekleştirilen işlemler, ancak toplama bloğu Ethereum'da kabul edildikten _sonra_ nihai hale gelir. Bir toplama işlemi Ethereum'un temel katmanına işlendikten sonra geri alınamaz (zincirin yeniden düzenlenmesi gibi gerçekleşme olasılığı çok az olan bir durum hariç).

## İyimser toplamalar nasıl çalışır? {#how-optimistic-rollups-work}

### İşlem yürütme ve birleştirme {#transaction-execution-and-aggregation}

Kullanıcılar işlemleri "operatörlere" gönderir; bu operatörler, iyimser toplamalar üzerinde işlemleri gerçekleştirmekten sorumlu olan düğümlerdir. Aynı zamanda "doğrulayıcı" veya "birleştirici" olarak da bilinen operatör, işlemleri birleştirir, temel veriyi sıkıştırır ve bloğu Ethereum'da yayımlar.

Herkes doğrulayıcı olabilse de, iyimser toplama doğrulayıcıları blok üretmeden önce [hisse ispatı sistemi](/developers/docs/consensus-mechanisms/pos/) gibi bir teminat sağlamalıdır. Doğrulayıcı geçersiz bir blok yayınlarsa veya eski ancak geçersiz bir blok üzerine inşa ederse (bloğu geçerli olsa bile) bu teminattan kesinti yapılabilir. İyimser toplamalar, bu şekilde doğrulayıcıların dürüst davranmasını sağlamak için kriptoekonomik teşvikleri kullanır.

İyimser toplama zincirindeki diğer doğrulayıcıların, toplama durumunun kendilerine ait kopyalarını kullanarak gönderilen işlemleri yürütmesi beklenir. Bir doğrulayıcının nihai durumu operatörün önerdiği durumdan farklıysa, bir itiraz başlatabilir ve bir sahtecilik kanıtı hesaplayabilir.

Bazı iyimser toplamalar izin gerektirmeyen bir doğrulayıcı sisteminden feragat edebilir ve zinciri yürütmek için tek bir "sıralayıcı" kullanabilir. Bir doğrulayıcı gibi sıralayıcı da işlemleri işler, toplama blokları üretir ve toplama işlemlerini L1 zincirine (Ethereum) gönderir.

Sıralayıcı, işlemlerin sıralanması üzerinde daha fazla kontrole sahip olduğu için normal bir toplama operatöründen farklıdır. Sıralayıcı ayrıca, toplama zincirine öncelikli erişime sahiptir ve zincir üstündeki sözleşmeye işlem gönderme yetkisine sahip tek varlıktır. Sıralayıcı olmayan düğümlerden veya normal kullanıcılardan gelen işlemler, sıralayıcı bunları yeni bir partiye dahil edene kadar ayrı bir gelen kutusunda bekletilir.

#### Toplama bloklarını Ethereum'a gönderme {#submitting-blocks-to-ethereum}

Belirtildiği gibi, bir iyimser toplamanın operatörü zincir dışı işlemleri bir yığın halinde toplar ve onay için Ethereum'a gönderir. Bu süreç, işlemle ilgili verilerin sıkıştırılmasını ve Ethereum üzerinde `calldata` veya blob olarak yayımlanmasını içerir.

`calldata`, akıllı bir sözleşmede çoğunlukla [bellek](/developers/docs/smart-contracts/anatomy/#memory) gibi davranan, değiştirilemeyen, kalıcı olmayan bir alandır. `calldata` blokzincirin [geçmiş günlüklerinin](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) bir parçası olarak zincir üzerinde kalırken, Ethereum'un durumunun bir parçası olarak saklanmaz. Çünkü `calldata`, Ethereum'un durumunun herhangi bir bölümüne müdahale etmediğinden zincir üstünde veri saklamak için duruma göre daha ucuzdur.

`calldata` anahtar sözcüğü Solidity'de yürütme zamanında bir akıllı sözleşme fonksiyonuna argüman aktarmak için de kullanılır. `calldata` bir işlem sırasında çağrılan fonksiyonu tanımlar ve fonksiyonun girdilerini rastgele bir bayt dizisi şeklinde tutar.

İyimser toplamalar bağlamında `calldata`, sıkıştırılmış işlem verilerini zincir üstündeki sözleşmeye göndermek için kullanılır. Toplama operatörü, toplama sözleşmesinde gerekli fonksiyonu çağırarak ve sıkıştırılmış verileri fonksiyon argümanları olarak geçirerek yeni bir toplu iş ekler. Toplamaların maliyetlerinin çoğu verilerin zincir üstünde depolanmasından kaynaklandığı için `calldata` kullanımı kullanıcı ücretlerini azaltır.

İşte bu konseptin nasıl çalıştığını göstermek için toplama partisi gönderimine [bir örnek](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591). Sıralayıcı `appendSequencerBatch()` yöntemini çağırmış ve sıkıştırılmış işlem verilerini `calldata` kullanarak girdi olarak geçirmiştir.

Bazı toplamalar işlem gruplarını Ethereum'a göndermek için artık blob'ları kullanıyor.

Blob'lar değiştirilemez ve geçicilerdir (aynı `calldata` gibi), geçmişten ~18 gün içinde silinirler. Blob'lar hakkında daha fazla bilgi için [Danksharding](/roadmap/danksharding)'e göz atın.

### Durum taahhütleri {#state-commitments}

Herhangi bir zamanda, iyimser toplamanın durumu (hesaplar, bakiyeler, sözleşme kodu, vb.) "durum ağacı" adı verilen bir [Merkle ağacı](/whitepaper/#merkle-trees) olarak düzenlenir. Toplamanın en son durumuna başvuran bu Merkle ağacının kökü (durum kökü) karma hale getirilir ve toplama sözleşmesinde saklanır. Zincir üstündeki her durum geçişi, operatörün yeni bir durum kökü hesaplayarak taahhüt ettiği yeni bir toplama durumu üretir.

Operatörün partileri gönderirken hem eski durum köklerini hem de yeni durum köklerini göndermesi gerekir. Eski durum kökü zincir üstündeki sözleşmede mevcut durum kökü ile eşleşirse, mevcut durum kökü atılır ve yeni durum kökü ile değiştirilir.

Toplama operatörünün ayrıca işlem yığınının kendisi için bir Merkle kökü taahhüt etmesi gerekir. Bu, isteyen herkesin bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sunarak bir işlemin yığına, yani toplama kümesine dahil olduğunu (L1 üzerinde) kanıtlamasına olanak tanır.

Durum taahhütleri, özellikle de durum kökleri, iyimser toplamada durum değişikliklerinin doğruluğunu kanıtlamak için gereklidir. Toplama sözleşmesi, gönderildikten hemen sonra operatörlerden yeni durum köklerini kabul eder ancak daha sonra toplamayı doğru durumuna geri getirmek için geçersiz durum köklerini silebilir.

### Sahteciliği kanıtlama {#fraud-proving}

Açıklandığı üzere, iyimser toplamalar isteyen herkesin geçerlilik kanıtları sunmadan blokları yayımlamasına izin verir. Bununla birlikte, zincirin güvenli kalmasını sağlamak için iyimser toplamalar, herhangi birinin bir durum geçişine itiraz edebileceği bir zaman aralığı belirtir. Bu nedenle, isteyen herkes doğruluklarına itiraz edebileceğinden toplama bloklarına "savlar" denir.

Birisi bir sava itiraz ederse, toplama protokolü sahtekarlık kanıtı hesaplamasını başlatır. Her tür sahtecilik kanıtı etkileşimlidir; başka bir kişinin buna itiraz edebilmesi için önce birinin bir sav yayımlaması gerekir. Aradaki fark, sahtecilik kanıtını hesaplamak için kaç tur etkileşim gerektiğidir.

Tek turlu etkileşimli kanıtlama şemaları, geçersiz savları tespit etmek için itiraz edilen işlemleri L1'de tekrar oynatır. Toplama protokolü, bir doğrulayıcı sözleşme kullanarak L1 (Ethereum) üzerinde ihtilaflı işlemin yeniden yürütülmesini taklit eder ve hesaplanan durum kökü itirazı kimin kazandığını belirler. Eğer itiraz edenin, toplamanın doğruluk durumuyla ilgili savı geçerliyse, operatör teminatının kesilmesiyle cezalandırılır.

Bununla birlikte, sahtekarlığı tespit etmek için L1'deki işlemlerin yeniden yürütülmesi, bireysel işlemler için durum taahhütlerinin yayımlanmasını gerektirir ve toplamaların zincir üstünde yayımlanması gereken veri miktarını artırır. İşlemlerin tekrarlanması, önemli gaz maliyetlerine neden olur. Bu nedenlerle, iyimser toplamalar aynı hedefe (yani geçersiz toplama işlemlerini tespit etme) daha verimli bir şekilde ulaşmak için çok turlu etkileşimli kanıtlamaya geçmektedir.

#### Çok turlu etkileşimli kanıtlama {#multi-round-interactive-proving}

Çok turlu etkileşimli kanıtlama, bir sav sahibi ile itiraz eden arasında bir L1 doğrulayıcı sözleşmesi tarafından denetlenen ileri geri bir protokol içerir ve yalan söyleyen tarafı bu protokol belirler. Bir L2 düğümü bir sava itiraz ederse, sav sahibinin itiraza konu savı iki eşit yarıya bölmesi gerekir. Bu durumda her bir bireysel sav, diğerinde olduğu kadar çok hesaplama adımı içerecektir.

İtiraz eden daha sonra hangi sava itiraz etmek istediğini seçer. Bölme süreci ("ikiye bölme protokolü" adı verilir), her iki taraf da yürütmenin _tek_ bir adımı hakkında bir sav üzerinde ihtilafa düşene kadar devam eder. Bu noktada L1 sözleşmesi, talimatı (ve sonucunu) değerlendirerek hile yapan tarafı tespit eder ve ihtilafı çözer.

Sav sahibi, ihtilaflı tek adımlı hesaplamanın geçerliliğini doğrulayan bir "tek adım kanıtı" sağlamak zorundadır. Sav sahibi, tek adım kanıtını sunamazsa veya L1 doğrulayıcı kanıtı geçersiz bulursa meydan okumayı kaybeder.

Bu tür bir sahtecilik kanıtı hakkında bazı notlar:

1. Çok turlu etkileşimli sahtecilik kanıtlama, L1 zincirinin ihtilaf arabuluculuğu sırasında yapması gereken işi en aza indirgediği için verimli kabul edilir. L1 zincirinin tüm işlemi yeniden gerçekleştirmek yerine sadece toplamanın yürütülmesinde bir adımı yeniden yürütmesi gerekir.

2. İkiye bölme protokolleri, zincir üstünde gönderilen veri miktarını azaltır (her işlem için durum taahhütleri yayımlama ihtiyacı olmaz). Ayrıca, iyimser toplama işlemleri Ethereum'un gaz limiti ile kısıtlı değildir. Tersine, işlemleri yeniden yürüten iyimser toplamalar, bir L2 işleminin yürütümünü tek bir Ethereum işlemi içinde taklit etmek için daha düşük bir gaz limitine sahip olmasını sağlamalıdır.

3. Kötü niyetli sav sahibinin teminatının bir kısmı itiraz edene verilirken diğer kısmı yakılır. Yakma işlemi, doğrulayıcılar arasında danışıklı dövüşü engeller; iki doğrulayıcı sahte itirazlar başlatmak için iş birliği yaparsa, hala tüm hisse miktarının önemli bir kısmını kaybedeceklerdir.

4. Çok turlu etkileşimli kanıtlama, her iki tarafın da (sav sahibi ve itiraz eden) belirtilen zaman penceresi içinde hamle yapmasını gerektirir. Son tarih öncesinde harekete geçmemek, temerrüde düşen tarafın itirazı kaybetmesine neden olur.

#### Sahtecilik kanıtları iyimser toplamalar için neden önemlidir? {#fraud-proof-benefits}

Sahtecilik kanıtları, iyimser toplamalarda _güven gerektirmeyen kesinliği_ kolaylaştırdığı için önemlidir. Güven gerektirmeyez kesinlik, iyimser toplamaların bir niteliğidir ve bir işlemin, geçerli olduğu sürece sonunda kesinlikle onaylanacağını garanti eder.

Kötü niyetli düğümler, sahte itirazlar başlatarak geçerli bir toplama bloğunun onaylanmasını geciktirmeye çalışabilir. Ancak sahtecilik kanıtları, eninde sonunda toplama bloğunun geçerliliğini kanıtlayacak ve onaylanmasını sağlayacaktır.

Bu, iyimser toplamaların başka bir güvenlik özelliği ile de ilgilidir: zincirin geçerliliği, dürüst _bir_ düğümün varlığına bağlıdır. Dürüst düğüm, geçerli savları yayımlayarak veya geçersiz savlara itiraz ederek zinciri doğru bir şekilde ilerletebilir. Her durumda, dürüst düğümle ihtilafa düşen kötü niyetli düğümler, sahtecilik kanıtlama süreci sırasında hisselerini kaybeder.

### L1/L2 birlikte çalışabilirliği {#l1-l2-interoperability}

İyimser toplamalar, Ethereum Ana Ağı ile birlikte çalışacak şekilde tasarlanmıştır ve kullanıcıların L1 ile L2 arasında mesaj ve keyfi veri iletimine izin verir. Ayrıca Ethereum Sanal Makinesi ile de uyumludurlar. Bu sayede mevcut [merkeziyetsiz uygulamaları](/developers/docs/dapps/) iyimser toplamalara taşıyabilir veya Ethereum geliştirme araçlarını kullanarak yeni merkeziyetsiz uygulamalar oluşturabilirsiniz.

#### 1. Varlık hareketi {#asset-movement}

##### Toplamaya giriş

Kullanıcılar, bir iyimser toplamayı kullanmak için ETH, ERC-20 jetonları ve diğer kabul edilen varlıkları toplamanın L1 üzerindeki [köprü](/developers/docs/bridges/) sözleşmesine yatırır. Köprü sözleşmesi, işlemi L2'ye iletir; burada eşdeğer bir miktar varlık üretilir ve iyimser toplamada kullanıcının seçtiği adrese gönderilir.

Kullanıcı tarafından oluşturulan işlemler (örneğin, L1 >> L2 yatırımı gibi) genellikle sıralayıcı bunları toplama sözleşmesine yeniden gönderene kadar sıraya alınır. Ancak sansür direncini korumak için iyimser toplamalar kullanıcılara, eğer işlem izin verilen maksimum sürenin ötesine taşınmışsa, işlemi doğrudan zincir üzerindeki toplama sözleşmesine gönderme imkanı sunar.

Bazı iyimser toplamalar, sıralayıcıların kullanıcıları sansürlemesini önlemek için daha basit bir yaklaşım benimser. Burada bir blok, toplama zincirinde işlenen işlemlere ek olarak önceki bloktan bu yana L1 sözleşmesine gönderilen tüm işlemler (örneğin, yatırımlar) tarafından tanımlanır. Eğer bir sıralayıcı bir L1 işlemini görmezden gelirse, (kanıtlanabilir şekilde) yanlış durum kökünü yayımlar; bu nedenle sıralayıcılar, L1 üzerinde yayımlandıktan sonra kullanıcı tarafından oluşturulan mesajları geciktiremezler.

##### Toplamadan çıkış

İyimser toplamadan Ethereum'a çekilmek, sahtecilik kanıtlama şeması nedeniyle daha zordur. Bir kullanıcı, L1'de emanet edilen fonları çekmek için L2 >> L1 işlemi başlattığında, yaklaşık yedi gün süren itiraz süresinin geçmesini beklemesi gerekir. Bununla birlikte, çekilme süreci oldukça basittir.

L2 toplaması üzerinde çekilme isteği başlatıldıktan sonra işlem, bir sonraki partiye dahil edilirken, kullanıcının toplamada bulunan varlıkları yakılır. Parti Ethereum üzerinde yayımlandıktan sonra kullanıcı, bir Merkle kanıtını hesaplayarak çıkış işleminin bloğa dahil edilmesini doğrulayabilir. Sonrasında ise işlemi L1'de tamamlamak ve fonları Ana Ağa çekmek için gecikme süresini beklemek gereklidir.

Ethereum'a fonları çekmeden önce bir hafta beklememek için iyimser toplama kullanıcıları bir **likidite sağlayıcısı** (LP) kullanabilir. Bir likidite sağlayıcısı, bekleyen bir L2 çekme işleminin sahipliğini üstlenir ve kullanıcıya L1 üzerinde ödeme yapar (bir ücret karşılığında).

Likidite sağlayıcıları, fonları serbest bırakmadan önce kullanıcının çekme isteğinin geçerliliğini (zinciri kendileri yürüterek) kontrol edebilir. Bu şekilde, işlemin nihayetinde onaylanacağına dair güvenceleri olur (yani, güven gerektirmeyen kesinlik).

#### 2. ESM uyumluluğu {#evm-compatibility}

Geliştiriciler için iyimser toplamaların avantajı, [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) ile uyumlulukları veya daha da iyi bir ifadeyle eşdeğerlikleridir. EVM uyumlu toplamalar, [Ethereum Sarı Kağıdı](https://ethereum.github.io/yellowpaper/paper.pdf)'ndaki spesifikasyonlara uyar ve EVM'yi bit kodu seviyesinde destekler.

İyimser toplamalardaki EVM uyumluluğunun aşağıdaki avantajları vardır:

i. Geliştiriciler, Ethereum'daki mevcut akıllı sözleşmeleri geniş kapsamlı kod değişiklikleri yapmadan iyimser toplams zincirlerine taşıyabilir. Bu, Ethereum akıllı sözleşmelerini L2'ye dağıtırken geliştirme ekiplerine zaman kazandırabilir.

ii. İyimser toplamaları kullanan geliştiriciler ve proje ekipleri, Ethereum altyapısından faydalanabilirler. Bu; programlama dilleri, kod kütüphaneleri, test araçları, istemci yazılımları, dağıtım altyapısı ve benzerlerini içerir.

Mevcut araçları kullanmak, bu araçların yıllar boyunca kapsamlı şekilde denetlendiği, hata ayıkladığı ve geliştirildiği göz önünde bulunduruldduğunda önemlidir. Aynı zamanda Ethereum geliştiricilerinin tamamen yeni bir geliştirme yığınıyla geliştirme yapacaklarını öğrenme ihtiyaçlarını ortadan kaldırır.

#### 3. Çapraz zincir sözleşme çağrıları {#cross-chain-contract-calls}

Kullanıcılar (dışarıdan sahip olunan hesaplar), bir işlemi toplama sözleşmesine göndererek veya bunu bir sıralayıcı veya doğrulayıcıya yaptırarak L2 sözleşmeleriyle etkileşime geçerler. İyimser toplamalar ayrıca, Ethereum'daki sözleşme hesaplarının L1 ile L2 arasında mesaj iletimi ve veri aktarımı yapmak için köprüleme sözleşmeleri kullanarak L2 sözleşmeleri ile etkileşime geçmesine olanak tanır. Bu, Ethereum Ana Ağı'nda bir L1 sözleşmesinin, bir L2 iyimser toplaması üzerindeki sözleşmelere ait fonksiyonları çağırmak üzere programlanabileceği anlamına gelir.

Çapraz zincir sözleşme çağrıları, asenkronize olarak gerçekleşir; yani çağrı önce başlatılır, daha sonraki bir zamanda ise yürütülür. Bu, çağrının sonuçları hemen ürettiği Ethereum'daki iki sözleşme arasındaki çağrılardan farklıdır.

Çapraz zincir sözleşme çağrısının bir örneği, daha önce açıklanan jeton yatırımıdır. L1'deki bir sözleşme, kullanıcının jetonlarını emanete koyar ve eşlenen bir L2 sözleşmesine toplamada eşdeğer bir miktar jetonun üretilmesi yönünde bir mesaj gönderir.

Çapraz zincir mesaj çağrıları sözleşme yürütümüne yol açtığı için hesaplamanın [gaz masraflarını](/developers/docs/gas/) genellikle göndericinin karşılaması gerekir. İşlemin hedef zincirde başarısız olmasını önlemek için yüksek bir gaz limiti belirlenmesi önerilir. Jeton köprüleme senaryosu bunun iyi bir örneğidir; işlemin L1 tarafı (jetonları yatırmak) çalışıyorsa ancak L2 tarafı (yeni jetonlar üretme) düşük gaz nedeniyle başarısız olursa, yatırım geri alınamaz hale gelir.

Son olarak, sözleşmeler arasındaki L2 > L1 mesaj çağrıları, gecikmeleri de hesaba katılmalıdır (L1 > L2 çağrıları tipik olarak birkaç dakika sonra yürütülür). Bunun nedeni, iyimser toplamadan Ana Ağ'a gönderilen mesajların itiraz dönemi sona erene kadar yürütülememesidir.

## İyimser toplamalar nasıl çalışır? {#how-do-optimistic-rollup-fees-work}

İyimser toplamalar, tıpkı Ethereum gibi kullanıcıların işlem başına ne kadar ödeyeceğini belirtmek için bir gaz ücreti şeması kullanır. İyimser toplamalarda tahsil edilen ücretler aşağıdaki bileşenlere bağlıdır:

1. **Durum yazımı:** İyimser toplamalar, işlem verilerini ve blok başlıklarını (önceki blok başlığı karması, durum kökü, parti kökünden oluşur) Ethereum'da `blob` veya "ikili büyük nesne" olarak yayımlar. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), verileri zincir üstünde bulundurmaya yarayan uygun maliyetli bir çözümü piyasaya sundu. `Blob`, toplamaların sıkıştırılmış durum geçiş verilerini Ethereum L1'e göndermesine olanak tanıyan yeni bir işlem alanıdır. Blob'lar, sonsuza kadar zincir üstünde kalan`calldata`'nın aksine kısa ömürlüdür ve istemcilerden [4096 dönem](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (yaklaşık 18 gün) sonra temizlenir. İyimser toplamalar, sıkıştırılmış işlemlerin toplu halde gönderilmesinde blob'ları kullanarak L1'e işlem yazma maliyetini önemli ölçüde azaltabilir.

2. **Blob'ların harcadığı gaz**: Blob'lu işlemlerde, [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) tarafından tanıtılan mekanizmaya benzer dinamik bir ücret mekanizması kullanılır. Tip-3 işlemleri için gaz ücreti hesaplanırken ağ tarafından blob alanı talebine ve gönderilen işlemin blob alanı kullanımına bağlı olarak belirlenen blob'lar için ana ücret göz önünde bulundurulur.

3. **L2 operatör ücretleri**: Bu, Ethereum'daki gaz ücretleri gibi işlem gerçekleştirirken ortaya çıkan bilgi işlem maliyetleri karşılığında toplama düğümlerine ödenen miktarı ifade eder. L2'ler daha yüksek işleme kapasitelerine sahip olduğundan ve Ethereum'daki doğrulayıcıları daha yüksek ücretli işlemlere öncelik vermeye zorlayan ağ tıkanıklıklarıyla karşılaşmadığından, toplama düğümleri daha düşük işlem ücretleri alır.

İyimser toplamalar, kullanıcıların ödeyeceği ücretleri azaltmak için işlemleri birleştirme ve `calldata`'yı sıkıştırarak veri yayımlama maliyetlerini düşürme gibi birkaç mekanizma uygular. Ethereum tabanlı iyimser toplamaları kullanmanın maliyetine ilişkin gerçek zamanlı bir genel bakış için [L2 ücret izleyici](https://l2fees.info/)ye göz atabilirsiniz.

## İyimser toplamalar Ethereum'u nasıl ölçeklendirir? {#scaling-ethereum-with-optimistic-rollups}

Açıklandığı gibi, iyimser toplamalar, veri erişilebilirliğini garanti etmek için Ethereum'a sıkıştırılmış işlem verileri yayımlar. Zincir üstünde yayımlanan verileri sıkıştırabilme yeteneği, iyimser toplamalar ile Ethereum'da ölçeklendirme hacmini artırmak açısından önemlidir.

Ana Ethereum zinciri, blokların ne kadar veriyi tutabileceğine dair sınırlamalar getirir ve bu, gaz birimleriyle ifade edilir ([ortalama blok boyutu](/developers/docs/blocks/#block-size) 15 milyon gazdır). Bu, her işlemin ne kadar gaz kullanabileceğini kısıtlasa da, aynı zamanda her işlemle ilişkili veriyi azaltarak blok başına işlenen işlem sayısını artırabileceğimiz anlamına gelir ve bu durum ölçeklenebilirliği doğrudan artırır.

İyimser toplamalar, işlem verisi sıkıştırmasını gerçekleştirmek ve TPS oranlarını artırmak için birkaç teknik kullanır. Örneğin [bu makale](https://vitalik.eth.limo/general/2021/01/05/rollup.html), temel bir kullanıcı işleminin (ether gönderme) Ana Ağda ürettiği veri miktarı ile aynı işlemin bir toplamada ürettiği veri miktarını karşılaştırıyor:

| Parametre  | Ethereum (L1)           | Toplama (L2) |
| ---------- | ----------------------- | ------------ |
| Nonce      | ~3                      | 0            |
| Gaz fiyatı | ~8                      | 0-0,5        |
| Gaz        | 3                       | 0-0,5        |
| Kime       | 21                      | 4            |
| Değer      | 9                       | ~3           |
| İmza       | ~68 (2 + 33 + 33)       | ~0,5         |
| Kimden     | 0 (imzadan kurtarılmış) | 4            |
| **Toplam** | **~112 bayt**           | **~12 bayt** |

Bu veriler üzerinde yapılan yaklaşık hesaplamalar, iyimser toplamanın sağladığı ölçeklenebilirlik iyileştirmelerini göstermeye yardımcı olabilir:

1. Her blok için hedeflenen boyut 15 milyon gaz ve bir bayt veriyi doğrulamanın maliyeti 16 gazdır. Ortalama blok boyutunu 16 gaza bölmek (15.000.000/16), ortalama bir bloğun **937.500 bayt veri** tutabileceğini gösterir.
2. Temel bir toplama işlemi 12 bayt kullanıyorsa, ortalama bir Ethereum bloğu **78.125 toplama işlemi ** (937.500/12) veya (her parti ortalama 2,000 işlem içeriyorsa) **39 toplama partisi** işleyebilir.
3. Ethereum'da her 15 saniyede bir yeni bir blok üretilirse, toplamanın işleme hızı yaklaşık olarak **saniyede 5.208 işlem** olur. Bu, bir Ethereum bloğunun tutabileceği toplama işlemlerinin sayısını (**78.125**) ortalama blok süresine (**15 saniye**) bölerek hesaplanır.

Bu, iyimser toplama işlemlerinin asla tam bir Ethereum bloğunu oluşturamayacağı göz önüne alındığında, oldukça iyimser bir tahmindir. Bununla birlikte, iyimser toplamaların Ethereum kullanıcılarına ne kadar ölçeklenebilirlik kazancı sağlayabileceği hakkında yaklaşık bir fikir verebilir (mevcut uygulamalar 2.000 TPS'ye kadar sunar).

[Veri parçalamanın](/roadmap/danksharding/) Ethereum'da iyimser toplamalarda ölçeklenebilirliği artırması beklenmektedir. Toplama işlemleri, blok alanını toplama olmayan diğer işlemlerle paylaşmak zorunda olduğundan işleme kapasiteleri, ana Ethereum zincirindeki veri hacmiyle sınırlıdır. Danksharding, L2 zincirlerinin veri yayımlamak için kullanabileceği blok başına alanı artırırken pahalı, kalıcı `CALLDATA` yerine daha ucuz, geçici "blob" depolama kullanacaktır.

### İyimser toplamaların artıları ve eksileri {#optimistic-rollups-pros-and-cons}

| Artıları                                                                                                                                                                                                  | Eksileri                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Güvenlikten veya güven gerektirmezlikten ödün vermeden ölçeklenebilirlikte büyük iyileştirmeler sunar.                                                                                                    | Potansiyel sahtecilik zorlukları nedeniyle işlemin kesinleştirilmesinde gecikmeler.                                                                      |
| İşlem verileri katman 1 zincirinde depolanır, bu da şeffaflığı, güvenliği, sansür direncini ve merkeziyetsizliği artırır.                                                                                 | Merkezi toplama operatörleri (sıralayıcılar), işlem sıralamasını etkileyebilir.                                                                          |
| Sahteciliğin kanıtlanması, güven gerektirmez kesinliği garanti eder ve dürüst azınlıkların zinciri güvence altına almasına olanak tanır.                                                                  | Dürüst düğüm yoksa, kötü niyetli bir operatör geçersiz bloklar ve durum taahhütleri yayımlayarak fonları çalabilir.                                      |
| Sahtecilik kanıtlarının hesaplanması, özel donanım gerektiren doğruluk kanıtlarının (ZK toplamalarında kullanılan) aksine, normal L2 düğümüne açıktır.                                                    | Güvenlik modeli, en az bir dürüst düğümün toplama işlemlerini yürütmesine ve geçersiz durum geçişlerine karşı sahtekarlık kanıtlarını sunmasına dayanır. |
| Toplamalar "güvenilmez canlılıktan" yararlanır (herkes işlemleri yürüterek ve savlar yayımlayarak zinciri ilerlemeye zorlayabilir)                                                                        | Kullanıcılar, fonları Ethereum'a geri çekmek için bir haftalık itiraz süresinin sona ermesini beklemelidir.                                              |
| İyimser toplamalar, zincirdeki güvenliği artırmak için iyi tasarlanmış kriptoekonomik teşviklere güvenir.                                                                                                 | Toplamaların tüm işlem verilerini zincir üzerinde yayımlaması gerekir, bu da maliyetleri artırabilir.                                                    |
| EVM ve Solidity ile uyumluluk, geliştiricilerin Ethereum'a özgü akıllı sözleşmeleri toplamalara taşımasına veya yeni merkeziyetsiz uygulamalar oluşturmak için mevcut araçları kullanmasına olanak tanır. |                                                                                                                                                          |

### İyimser toplamaların görsel açıklaması {#optimistic-video}

Görerek öğrenmeyi mi tercih ediyorsunuz? Finematics'in iyimser toplamalar hakkındaki açıklamasını izleyin:

<YouTube id="7pWxCklcNsU" start="263" />

## İyimser toplamalara dair daha fazlası

- [İyimser toplamalar nasıl çalışır? (Tam klavuz)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Blokzincir Toplaması nedir? Teknik Giriş](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Temel Arbitrum Rehberi](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Optimism'in Toplaması aslında nasıl çalışıyor?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [İyimser Sanal Makine nedir?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
