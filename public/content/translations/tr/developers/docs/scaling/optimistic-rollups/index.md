---
title: "İyimser Toplamalar"
description: "Ethereum topluluğu tarafından kullanılmakta olan bir ölçeklendirme çözümü sunan iyimser toplamalara giriş."
lang: tr
---

İyimser toplamalar, Ethereum temel katmanının işlem hacmini genişletmek üzere tasarlanmış katman 2 (L2) protokolleridir. Ana Ethereum zincirindeki hesaplamayı, işlemleri zincir dışında işleyerek azaltır ve işleme hızlarında önemli iyileştirmeler sunarlar. [Yan zincirler](/developers/docs/scaling/sidechains/) veya işlemleri Ethereum'da sahtekarlık kanıtları ile doğrulayıp işlem verilerini başka bir yerde saklayan [plazma zincirleri](/developers/docs/scaling/plasma/) gibi diğer ölçeklendirme çözümlerinin aksine, iyimser toplamalar işlem sonuçlarını zincir üstünde yayımlayarak güvenliği Ana Ağ'dan alır.

Hesaplama, Ethereum'u kullanmanın yavaş ve pahalı kısmı olduğundan iyimser toplamalar ölçeklenebilirlikte 10-100x'lik iyileştirmeler sunabilir. İyimser toplamalar ayrıca işlemleri Ethereum'a `calldata` veya [bloblar](/roadmap/danksharding/) halinde yazarak kullanıcılar için gaz maliyetlerini azaltır.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2/) sayfalarımızı okumuş ve anlamış olmalısınız.

## İyimser toplama nedir? {#what-is-an-optimistic-rollup}

İyimser toplama, hesaplama ve durum depolamayı zincir dışına taşıyan bir Ethereum ölçeklendirme yaklaşımıdır. İyimser toplamalar, işlemleri Ethereum'un dışında yürütür ancak işlem verilerini Ana Ağ'a `calldata` veya [bloblar](/roadmap/danksharding/) halinde gönderir.

İyimser toplama operatörleri, Ethereum'a göndermeden önce birden fazla zincir dışı işlemi büyük gruplar halinde bir araya getirir. Bu yaklaşım, sabit maliyetlerin her paket içerisindeki birden çok işlem arasında paylaştırarak son kullanıcılar için ücretleri azaltmaya olanak tanır. İyimser toplamalar ayrıca Ethereum'da yayımlanan veri miktarını azaltmak için sıkıştırma tekniklerini kullanır.

İyimser toplamalar, zincir dışı işlemlerin geçerli olduğunu varsaydıkları ve zincir üstünde yayımlanan işlem grupları için geçerlilik kanıtları yayımlamadıkları için “iyimser” olarak kabul edilir. Bu, iyimser toplamaları, zincir dışı işlemler için kriptografik [geçerlilik kanıtları](/glossary/#validity-proof) yayımlayan [sıfır bilgi toplamalarından](/developers/docs/scaling/zk-rollups) ayırır.

İyimser toplamalar, işlemlerin doğru şekilde hesaplanmadığı durumları tespit etme konusunda bir sahtekarlık kanıtlama şemasına güvenir. Bir toplama grubu Ethereum'a gönderildikten sonra, herhangi birinin bir [sahtekarlık kanıtı](/glossary/#fraud-proof) hesaplayarak bir toplama işleminin sonuçlarına itiraz edebileceği bir zaman aralığı (meydan okuma süresi olarak adlandırılır) vardır.

Eğer sahtecilik kanıtı başarılı olursa, toplama protokolü işlemi/işlemleri yeniden yürütür ve toplamanın durumunu buna göre günceller. Başarılı bir sahtecilik kanıtının bir diğer etkisi, yanlış gerçekleştirilmiş işlemi bir bloğa dahil etmekten sorumlu sıralayıcının ceza almasıdır.

Toplama partisinin itiraz süresi sona erdikten sonra hala itiraz edilmemişse (yani tüm işlemler doğru bir şekilde yürütülmüşse), parti geçerli sayılır ve Ethereum'da kabul edilir. Diğerleri, doğrulanmamış bir toplama bloğu üzerine inşa etmeye devam edebilir, ancak bir uyarı söz konusudur: işlem sonuçları, önceden yayınlanmış ve yanlış gerçekleştirilmiş bir işleme dayanıyorsa sonuçlar tersine çevrilecektir.

## İyimser toplamalar Ethereum ile nasıl etkileşime girer? İyimser toplamalar ve Ethereum {#optimistic-rollups-and-Ethereum}

İyimser toplamalar, Ethereum üzerinde çalışmak üzere oluşturulmuş [zincir dışı ölçeklendirme çözümleridir](/developers/docs/scaling/#offchain-scaling). Her iyimser toplama, Ethereum ağına dağıtılmış bir dizi akıllı sözleşme tarafından yönetilir. İyimser toplamalar, işlemleri ana Ethereum zincirinin dışında işler, ancak zincir dışı işlemleri (gruplar halinde) zincir üstü bir toplama sözleşmesine gönderir. Ethereum blokzincirinde olduğu gibi, bu işlem kaydı da değiştirilemezdir ve "iyimser toplama zincirini" oluşturur.

Bir iyimser toplamanın mimarisi şu bölümlerden oluşur:

**Zincir üstü sözleşmeler**: İyimser toplamanın işleyişi, Ethereum üzerinde çalışan akıllı sözleşmeler tarafından kontrol edilir. Bu, toplama bloklarını depolayan, toplamada durum güncellemelerini izleyen ve kullanıcı tarafından yapılan yatırma işlemlerini takip eden sözleşmeleri içerir. Bu anlamda Ethereum, iyimser toplamalar için temel katman veya "katman 1" olarak hizmet verir.

**Zincir dışı sanal makine (VM)**: İyimser toplama protokolünü yöneten sözleşmeler Ethereum'da çalışsa da, toplama protokolü hesaplama ve durum depolamayı [Ethereum Sanal Makinesi](/developers/docs/evm/)'nden ayrı başka bir sanal makinede gerçekleştirir. Zincir dışı VM, uygulamaların yaşadığı ve durum değişikliklerinin yürütüldüğü yerdir; bir iyimser toplama için üst katman veya "katman 2" olarak hizmet eder.

İyimser toplamalar EVM için yazılmış veya derlenmiş programları çalıştırmak üzere tasarlandığından, zincir dışı VM birçok EVM tasarım özelliğini içerir. Ayrıca, zincir üstünde hesaplanan sahtekarlık kanıtları, Ethereum ağının zincir dışı VM'de hesaplanan durum değişikliklerinin geçerliliğini zorunlu kılmasına olanak tanır.

İyimser toplamalar "hibrit ölçeklendirme çözümleri" olarak tanımlanmaktadır. Çünkü ayrı protokoller olarak var olmalarına rağmen güvenlik özellikleri Ethereum'dan türetilmiştir. Ethereum, diğer şeylerin yanı sıra, bir toplamanın zincir dışı hesaplamasının doğruluğunu ve hesaplamanın arkasındaki verilerin kullanılabilirliğini garanti eder. Bu, iyimser toplamaları güvenlik için Ethereum'a dayanmayan saf zincir dışı ölçeklendirme protokollerinden (ör. [yan zincirler](/developers/docs/scaling/sidechains/)) daha güvenli hale getirir.

İyimser toplamalar aşağıdakiler için ana Ethereum protokolüne güvenir:

### Veri kullanılabilirliği {#data-availability}

Belirtildiği gibi, iyimser toplamalar işlem verilerini Ethereum'a `calldata` veya [bloblar](/roadmap/danksharding/) olarak gönderir. Toplama zincirinin yürütülmesi gönderilen işlemlere dayandığından, herkes Ethereum'un temel katmanında bulunan bu bilgileri kullanarak toplamanın durumunu yürütebilir ve durum geçişlerinin doğruluğunu teyit edebilir.

[Veri kullanılabilirliği](/developers/docs/data-availability/) kritik öneme sahiptir çünkü durum verilerine erişim olmadan, meydan okuyanlar geçersiz toplama işlemlerine itiraz etmek için sahtekarlık kanıtları oluşturamazlar. Ethereum'un veri mevcudiyeti ve kullanılabilirliği sağlaması sayesinde, toplama operatörlerinin kötü niyetli hareketlerden (ör. geçersiz bloklar gönderme) paçayı sıyırma riski azalır.

### Sansür direnci {#censorship-resistance}

İyimser toplamalar da sansüre karşı direnç konusunda Ethereum'a güvenir. Bir iyimser toplamada işlemleri işlemekten ve Ethereum'a toplama blokları göndermekten merkezi bir varlık (operatör) sorumludur. Bunun bazı sonuçları vardır:

- Toplama operatörleri tamamen çevrimdışı kalarak ya da belirli işlemleri içeren blokları üretmeyi reddederek kullanıcıları sansürleyebilir.

- Toplama operatörleri, Merkle sahiplik kanıtları için gerekli olan durum verilerini tutarak kullanıcıların toplama sözleşmesinde depoladıkları fonları çekmelerini engelleyebilir. Durum verilerinin tutulması, toplamanın durumunu kullanıcılardan gizleyebilir ve toplama ile etkileşime girmelerini engelleyebilir.

İyimser toplamalar, bu sorunu operatörleri Ethereum'da durum güncellemeleriyle ilişkilendirilmiş verileri yayınlamaya zorlayarak çözer. Toplama verilerini zincir üstünde yayımlamanın aşağıdaki faydaları vardır:

- İyimser toplama operatörü çevrimdışı olursa veya işlem gruplarını üretmeyi durdurursa, başka bir düğüm mevcut verileri kullanarak toplamanın son durumunu yeniden oluşturabilir ve blok üretimine devam edebilir.

- Kullanıcılar, fonların sahipliğini kanıtlayan Merkle kanıtları oluşturmak ve varlıklarını toplamadan çekmek için işlem verilerini kullanabilir.

- Kullanıcılar, işlemlerini sıralayıcı yerine L1 üzerinden de gönderebilirler; bu durumda sıralayıcı, geçerli bloklar üretmeye devam etmek için işlemi belirli bir zaman sınırı içinde dahil etmek zorundadır.

### Uzlaşma {#settlement}

Ethereum'un iyimser toplamalar bağlamında oynadığı bir diğer rol de, uzlaşma katmanı olmasıdır. Bir uzlaşma katmanı tüm blokzincir ekosistemi için çıpa görevi görür, güvenliği tesis eder ve başka bir zincirde (bu durumda iyimser toplamalar) hakemlik gerektiren bir anlaşmazlık meydana gelirse nesnel kesinlik sağlar.

Ethereum Ana Ağı, iyimser toplamaların sahtecilik kanıtlarını doğrulaması ve anlaşmazlıkları çözmesi için bir merkez sunar. Ayrıca, toplama üzerinde yürütülen işlemler ancak toplama bloğu Ethereum'da kabul _edildikten sonra_ kesinleşir. Bir toplama işlemi Ethereum'un temel katmanına işlendikten sonra geri alınamaz (zincirin yeniden düzenlenmesi gibi gerçekleşme olasılığı çok az olan bir durum hariç).

## İyimser toplamalar nasıl çalışır? {#how-optimistic-rollups-work}

### İşlem yürütme ve birleştirme {#transaction-execution-and-aggregation}

Kullanıcılar işlemleri "operatörlere" gönderir; bu operatörler, iyimser toplamalar üzerinde işlemleri gerçekleştirmekten sorumlu olan düğümlerdir. Aynı zamanda "doğrulayıcı" veya "birleştirici" olarak da bilinen operatör, işlemleri birleştirir, temel veriyi sıkıştırır ve bloğu Ethereum'da yayımlar.

Herkes doğrulayıcı olabilse de, iyimser toplama doğrulayıcıları, tıpkı bir [hisse ispatı sistemi](/developers/docs/consensus-mechanisms/pos/) gibi, blok üretmeden önce bir teminat sağlamalıdır. Doğrulayıcı geçersiz bir blok yayınlarsa veya eski ancak geçersiz bir blok üzerine inşa ederse (bloğu geçerli olsa bile) bu teminattan kesinti yapılabilir. İyimser toplamalar, bu şekilde doğrulayıcıların dürüst davranmasını sağlamak için kriptoekonomik teşvikleri kullanır.

İyimser toplama zincirindeki diğer doğrulayıcıların, toplama durumunun kendilerine ait kopyalarını kullanarak gönderilen işlemleri yürütmesi beklenir. Bir doğrulayıcının nihai durumu operatörün önerdiği durumdan farklıysa, bir itiraz başlatabilir ve bir sahtecilik kanıtı hesaplayabilir.

Bazı iyimser toplamalar izin gerektirmeyen bir doğrulayıcı sisteminden feragat edebilir ve zinciri yürütmek için tek bir "sıralayıcı" kullanabilir. Bir doğrulayıcı gibi sıralayıcı da işlemleri işler, toplama blokları üretir ve toplama işlemlerini L1 zincirine (Ethereum) gönderir.

Sıralayıcı, işlemlerin sıralanması üzerinde daha fazla kontrole sahip olduğu için normal bir toplama operatöründen farklıdır. Ayrıca, sıralayıcı toplama zincirine öncelikli erişime sahiptir ve zincir üstü sözleşmeye işlem gönderme yetkisine sahip tek varlıktır. Sıralayıcı olmayan düğümlerden veya normal kullanıcılardan gelen işlemler, sıralayıcı bunları yeni bir partiye dahil edene kadar ayrı bir gelen kutusunda bekletilir.

#### Toplama bloklarını Ethereum'a gönderme {#submitting-blocks-to-ethereum}

Belirtildiği gibi, bir iyimser toplama operatörü, zincir dışı işlemleri bir grup halinde toplar ve noter onayı için Ethereum'a gönderir. Bu süreç, işlemle ilgili verilerin sıkıştırılmasını ve Ethereum üzerinde `calldata` veya blob olarak yayımlanmasını içerir.

`calldata`, bir akıllı sözleşmede çoğunlukla [bellek](/developers/docs/smart-contracts/anatomy/#memory) gibi davranan, değiştirilemez, kalıcı olmayan bir alandır. `calldata`, blokzincirin [geçmiş günlüklerinin](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) bir parçası olarak zincir üstünde kalıcı olsa da, Ethereum'un durumunun bir parçası olarak saklanmaz. `calldata`, Ethereum durumunun hiçbir bölümüne dokunmadığı için, verileri zincir üstünde depolamak için durumdan daha ucuzdur.

`calldata` anahtar sözcüğü, yürütme zamanında bir akıllı sözleşme işlevine argümanlar geçirmek için Solidity'de de kullanılır. `calldata` bir işlem sırasında çağrılan işlevi tanımlar ve işlevin girdilerini rastgele bir bayt dizisi biçiminde tutar.

İyimser toplamalar bağlamında `calldata`, sıkıştırılmış işlem verilerini zincir üstü sözleşmeye göndermek için kullanılır. Toplama operatörü, toplama sözleşmesinde gerekli fonksiyonu çağırarak ve sıkıştırılmış verileri fonksiyon argümanları olarak geçirerek yeni bir toplu iş ekler. `calldata` kullanmak, toplamaların maruz kaldığı maliyetlerin çoğu verileri zincir üstünde depolamaktan geldiği için kullanıcı ücretlerini düşürür.

Bu konseptin nasıl çalıştığını göstermek için bir toplama grubu gönderimine [bir örnek](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) aşağıda verilmiştir. Sıralayıcı, `appendSequencerBatch()` yöntemini çağırdı ve sıkıştırılmış işlem verilerini `calldata` kullanarak girdi olarak geçti.

Bazı toplamalar işlem gruplarını Ethereum'a göndermek için artık blob'ları kullanıyor.

Bloblar (tıpkı `calldata` gibi) değiştirilemez ve kalıcı değildir ancak yaklaşık 18 gün sonra geçmişten budanır. Bloblar hakkında daha fazla bilgi için bkz. [Danksharding](/roadmap/danksharding).

### Durum taahhütleri {#state-commitments}

Herhangi bir zamanda, iyimser toplamanın durumu (hesaplar, bakiyeler, sözleşme kodu vb.) “durum ağacı” olarak adlandırılan bir [Merkle ağacı](/whitepaper/#merkle-trees) olarak düzenlenir. Toplamanın en son durumuna başvuran bu Merkle ağacının kökü (durum kökü) karma hale getirilir ve toplama sözleşmesinde saklanır. Zincir üstündeki her durum geçişi, operatörün yeni bir durum kökü hesaplayarak taahhüt ettiği yeni bir toplama durumu üretir.

Operatörün partileri gönderirken hem eski durum köklerini hem de yeni durum köklerini göndermesi gerekir. Eski durum kökü, zincir üstü sözleşmedeki mevcut durum köküyle eşleşirse, ikincisi atılır ve yeni durum köküyle değiştirilir.

Toplama operatörünün ayrıca işlem yığınının kendisi için bir Merkle kökü taahhüt etmesi gerekir. Bu, herhangi birinin bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sunarak bir işlemin gruba (L1'de) dahil olduğunu kanıtlamasına olanak tanır.

Durum taahhütleri, özellikle de durum kökleri, iyimser toplamada durum değişikliklerinin doğruluğunu kanıtlamak için gereklidir. Toplama sözleşmesi, gönderildikten hemen sonra operatörlerden yeni durum köklerini kabul eder ancak daha sonra toplamayı doğru durumuna geri getirmek için geçersiz durum köklerini silebilir.

### Sahtekarlık kanıtlama {#fraud-proving}

Açıklandığı üzere, iyimser toplamalar isteyen herkesin geçerlilik kanıtları sunmadan blokları yayımlamasına izin verir. Bununla birlikte, zincirin güvenli kalmasını sağlamak için iyimser toplamalar, herhangi birinin bir durum geçişine itiraz edebileceği bir zaman aralığı belirtir. Bu nedenle, isteyen herkes doğruluklarına itiraz edebileceğinden toplama bloklarına "savlar" denir.

Birisi bir sava itiraz ederse, toplama protokolü sahtekarlık kanıtı hesaplamasını başlatır. Her tür sahtecilik kanıtı etkileşimlidir; başka bir kişinin buna itiraz edebilmesi için önce birinin bir sav yayımlaması gerekir. Aradaki fark, sahtecilik kanıtını hesaplamak için kaç tur etkileşim gerektiğidir.

Tek turlu etkileşimli kanıtlama şemaları, geçersiz savları tespit etmek için itiraz edilen işlemleri L1'de tekrar oynatır. Toplama protokolü, bir doğrulayıcı sözleşme kullanarak L1 (Ethereum) üzerinde ihtilaflı işlemin yeniden yürütülmesini taklit eder ve hesaplanan durum kökü itirazı kimin kazandığını belirler. Eğer itiraz edenin, toplamanın doğruluk durumuyla ilgili savı geçerliyse, operatör teminatının kesilmesiyle cezalandırılır.

Ancak, sahtekarlığı tespit etmek için L1'deki işlemleri yeniden yürütmek, bireysel işlemler için durum taahhütleri yayımlamayı gerektirir ve toplamaların zincir üstünde yayımlaması gereken veriyi artırır. İşlemlerin tekrarlanması, önemli gaz maliyetlerine neden olur. Bu nedenlerle, iyimser toplamalar aynı hedefe (yani geçersiz toplama işlemlerini tespit etme) daha verimli bir şekilde ulaşmak için çok turlu etkileşimli kanıtlamaya geçmektedir.

#### Çok turlu etkileşimli kanıtlama {#multi-round-interactive-proving}

Çok turlu etkileşimli kanıtlama, bir sav sahibi ile itiraz eden arasında bir L1 doğrulayıcı sözleşmesi tarafından denetlenen ileri geri bir protokol içerir ve yalan söyleyen tarafı bu protokol belirler. Bir L2 düğümü bir sava itiraz ederse, sav sahibinin itiraza konu savı iki eşit yarıya bölmesi gerekir. Bu durumda her bir bireysel sav, diğerinde olduğu kadar çok hesaplama adımı içerecektir.

İtiraz eden daha sonra hangi sava itiraz etmek istediğini seçer. Bölme süreci (“ikiye bölme protokolü” olarak adlandırılır), her iki taraf da yürütmenin _tek bir_ adımı hakkındaki bir iddiayı tartışana kadar devam eder. Bu noktada L1 sözleşmesi, talimatı (ve sonucunu) değerlendirerek hile yapan tarafı tespit eder ve ihtilafı çözer.

Sav sahibi, ihtilaflı tek adımlı hesaplamanın geçerliliğini doğrulayan bir "tek adım kanıtı" sağlamak zorundadır. Sav sahibi, tek adım kanıtını sunamazsa veya L1 doğrulayıcı kanıtı geçersiz bulursa meydan okumayı kaybeder.

Bu tür bir sahtecilik kanıtı hakkında bazı notlar:

1. Çok turlu etkileşimli sahtecilik kanıtlama, L1 zincirinin ihtilaf arabuluculuğu sırasında yapması gereken işi en aza indirgediği için verimli kabul edilir. L1 zincirinin tüm işlemi yeniden gerçekleştirmek yerine sadece toplamanın yürütülmesinde bir adımı yeniden yürütmesi gerekir.

2. İkiye bölme protokolleri, zincir üstünde yayımlanan veri miktarını azaltır (her işlem için durum taahhütleri yayımlamaya gerek yoktur). Ayrıca, iyimser toplama işlemleri Ethereum'un gaz limiti ile kısıtlı değildir. Tersine, işlemleri yeniden yürüten iyimser toplamalar, bir L2 işleminin yürütümünü tek bir Ethereum işlemi içinde taklit etmek için daha düşük bir gaz limitine sahip olmasını sağlamalıdır.

3. Kötü niyetli sav sahibinin teminatının bir kısmı itiraz edene verilirken diğer kısmı yakılır. Yakma işlemi, doğrulayıcılar arasında danışıklı dövüşü engeller; iki doğrulayıcı sahte itirazlar başlatmak için iş birliği yaparsa, hala tüm hisse miktarının önemli bir kısmını kaybedeceklerdir.

4. Çok turlu etkileşimli kanıtlama, her iki tarafın da (sav sahibi ve itiraz eden) belirtilen zaman penceresi içinde hamle yapmasını gerektirir. Son tarih öncesinde harekete geçmemek, temerrüde düşen tarafın itirazı kaybetmesine neden olur.

#### Sahtekarlık kanıtları iyimser toplamalar için neden önemlidir {#fraud-proof-benefits}

Sahtekarlık kanıtları, iyimser toplamlarda _güven gerektirmeyen kesinliği_ kolaylaştırdıkları için önemlidir. Güven gerektirmeyez kesinlik, iyimser toplamaların bir niteliğidir ve bir işlemin, geçerli olduğu sürece sonunda kesinlikle onaylanacağını garanti eder.

Kötü niyetli düğümler, sahte itirazlar başlatarak geçerli bir toplama bloğunun onaylanmasını geciktirmeye çalışabilir. Ancak sahtecilik kanıtları, eninde sonunda toplama bloğunun geçerliliğini kanıtlayacak ve onaylanmasını sağlayacaktır.

Bu aynı zamanda iyimser toplamaların başka bir güvenlik özelliğiyle de ilgilidir: zincirin geçerliliği _tek bir_ dürüst düğümün varlığına bağlıdır. Dürüst düğüm, geçerli savları yayımlayarak veya geçersiz savlara itiraz ederek zinciri doğru bir şekilde ilerletebilir. Her durumda, dürüst düğümle ihtilafa düşen kötü niyetli düğümler, sahtecilik kanıtlama süreci sırasında hisselerini kaybeder.

### L1/L2 birlikte çalışabilirliği {#l1-l2-interoperability}

İyimser toplamalar, Ethereum Ana Ağı ile birlikte çalışacak şekilde tasarlanmıştır ve kullanıcıların L1 ile L2 arasında mesaj ve keyfi veri iletimine izin verir. Ayrıca EVM ile de uyumludurlar, bu nedenle mevcut [merkeziyetsiz uygulamaları](/developers/docs/dapps/) iyimser toplamlara taşıyabilir veya Ethereum geliştirme araçlarını kullanarak yeni merkeziyetsiz uygulamalar oluşturabilirsiniz.

#### 1. Varlık hareketi {#asset-movement}

##### Toplamaya giriş

Bir iyimser toplamayı kullanmak için, kullanıcılar L1'deki toplamanın [köprü](/developers/docs/bridges/) sözleşmesine ETH, ERC-20 tokenleri ve diğer kabul edilen varlıkları yatırır. Köprü sözleşmesi, işlemi L2'ye iletir; burada eşdeğer bir miktar varlık üretilir ve iyimser toplamada kullanıcının seçtiği adrese gönderilir.

Kullanıcı tarafından oluşturulan işlemler (L1 > L2 para yatırma gibi) genellikle sıralayıcı bunları toplama sözleşmesine yeniden gönderene kadar sıraya alınır. Ancak, sansür direncini korumak için, iyimser toplamalar, izin verilen maksimum süreyi aşacak şekilde gecikmesi durumunda kullanıcıların işlemi doğrudan zincir üstü toplama sözleşmesine göndermesine olanak tanır.

Bazı iyimser toplamalar, sıralayıcıların kullanıcıları sansürlemesini önlemek için daha basit bir yaklaşım benimser. Burada bir blok, toplama zincirinde işlenen işlemlere ek olarak önceki bloktan bu yana L1 sözleşmesine gönderilen tüm işlemler (örneğin, yatırımlar) tarafından tanımlanır. Eğer bir sıralayıcı bir L1 işlemini görmezden gelirse, (kanıtlanabilir şekilde) yanlış durum kökünü yayımlar; bu nedenle sıralayıcılar, L1 üzerinde yayımlandıktan sonra kullanıcı tarafından oluşturulan mesajları geciktiremezler.

##### Toplamadan çıkış

İyimser toplamadan Ethereum'a çekilmek, sahtecilik kanıtlama şeması nedeniyle daha zordur. Bir kullanıcı L1'de emanet edilen fonları çekmek için bir L2 > L1 işlemi başlatırsa, yaklaşık yedi gün süren meydan okuma süresinin sona ermesini beklemelidir. Bununla birlikte, çekilme süreci oldukça basittir.

L2 toplaması üzerinde çekilme isteği başlatıldıktan sonra işlem, bir sonraki partiye dahil edilirken, kullanıcının toplamada bulunan varlıkları yakılır. Parti Ethereum üzerinde yayımlandıktan sonra kullanıcı, bir Merkle kanıtını hesaplayarak çıkış işleminin bloğa dahil edilmesini doğrulayabilir. Sonrasında ise işlemi L1'de tamamlamak ve fonları Ana Ağa çekmek için gecikme süresini beklemek gereklidir.

Fonları Ethereum'a çekmeden önce bir hafta beklemekten kaçınmak için iyimser toplama kullanıcıları bir **likidite sağlayıcı** (LP) kullanabilir. Bir likidite sağlayıcısı, bekleyen bir L2 çekme işleminin sahipliğini üstlenir ve kullanıcıya L1 üzerinde ödeme yapar (bir ücret karşılığında).

Likidite sağlayıcıları, fonları serbest bırakmadan önce kullanıcının çekme isteğinin geçerliliğini (zinciri kendileri yürüterek) kontrol edebilir. Bu şekilde, işlemin nihayetinde onaylanacağına dair güvenceleri olur (yani, güven gerektirmeyen kesinlik).

#### 2. EVM uyumluluğu {#evm-compatibility}

Geliştiriciler için iyimser toplamaların avantajı, [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) ile uyumlulukları veya daha da iyisi eşdeğerlikleridir. EVM uyumlu toplamalar, [Ethereum Sarı Bülteni](https://ethereum.github.io/yellowpaper/paper.pdf)'ndeki spesifikasyonlara uyar ve EVM'yi bayt kodu düzeyinde destekler.

İyimser toplamalardaki EVM uyumluluğunun aşağıdaki avantajları vardır:

i. Geliştiriciler, Ethereum'daki mevcut akıllı sözleşmeleri geniş kapsamlı kod değişiklikleri yapmadan iyimser toplams zincirlerine taşıyabilir. Bu, Ethereum akıllı sözleşmelerini L2'ye dağıtırken geliştirme ekiplerine zaman kazandırabilir.

ii. İyimser toplamaları kullanan geliştiriciler ve proje ekipleri, Ethereum altyapısından faydalanabilirler. Bu; programlama dilleri, kod kütüphaneleri, test araçları, istemci yazılımları, dağıtım altyapısı ve benzerlerini içerir.

Mevcut araçları kullanmak, bu araçların yıllar boyunca kapsamlı şekilde denetlendiği, hata ayıkladığı ve geliştirildiği göz önünde bulunduruldduğunda önemlidir. Aynı zamanda Ethereum geliştiricilerinin tamamen yeni bir geliştirme yığınıyla geliştirme yapacaklarını öğrenme ihtiyaçlarını ortadan kaldırır.

#### 3. Zincirler arası sözleşme çağrıları {#cross-chain-contract-calls}

Kullanıcılar (dışarıdan sahip olunan hesaplar), bir işlemi toplama sözleşmesine göndererek veya bunu bir sıralayıcı veya doğrulayıcıya yaptırarak L2 sözleşmeleriyle etkileşime geçerler. İyimser toplamalar ayrıca, Ethereum'daki sözleşme hesaplarının L1 ile L2 arasında mesaj iletimi ve veri aktarımı yapmak için köprüleme sözleşmeleri kullanarak L2 sözleşmeleri ile etkileşime geçmesine olanak tanır. Bu, Ethereum Ana Ağı'nda bir L1 sözleşmesinin, bir L2 iyimser toplaması üzerindeki sözleşmelere ait fonksiyonları çağırmak üzere programlanabileceği anlamına gelir.

Çapraz zincir sözleşme çağrıları, asenkronize olarak gerçekleşir; yani çağrı önce başlatılır, daha sonraki bir zamanda ise yürütülür. Bu, çağrının sonuçları hemen ürettiği Ethereum'daki iki sözleşme arasındaki çağrılardan farklıdır.

Çapraz zincir sözleşme çağrısının bir örneği, daha önce açıklanan jeton yatırımıdır. L1'deki bir sözleşme, kullanıcının jetonlarını emanete koyar ve eşlenen bir L2 sözleşmesine toplamada eşdeğer bir miktar jetonun üretilmesi yönünde bir mesaj gönderir.

Zincirler arası mesaj çağrıları sözleşmenin yürütülmesiyle sonuçlandığından, göndericinin genellikle hesaplama için [gaz maliyetlerini](/developers/docs/gas/) karşılaması gerekir. İşlemin hedef zincirde başarısız olmasını önlemek için yüksek bir gaz limiti belirlenmesi önerilir. Jeton köprüleme senaryosu bunun iyi bir örneğidir; işlemin L1 tarafı (jetonları yatırmak) çalışıyorsa ancak L2 tarafı (yeni jetonlar üretme) düşük gaz nedeniyle başarısız olursa, yatırım geri alınamaz hale gelir.

Son olarak, sözleşmeler arasındaki L2 > L1 mesaj çağrılarının gecikmeleri hesaba katması gerektiğini unutmamalıyız (L1 > L2 çağrıları genellikle birkaç dakika sonra yürütülür). Bunun nedeni, iyimser toplamadan Ana Ağ'a gönderilen mesajların itiraz dönemi sona erene kadar yürütülememesidir.

## İyimser toplamalar nasıl çalışır? İyimser toplama ücretleri nasıl çalışır? {#how-do-optimistic-rollup-fees-work}

İyimser toplamalar, tıpkı Ethereum gibi kullanıcıların işlem başına ne kadar ödeyeceğini belirtmek için bir gaz ücreti şeması kullanır. İyimser toplamlarda alınan ücretler aşağıdaki bileşenlere bağlıdır:

1. **Durum yazma**: İyimser toplamalar, işlem verilerini ve blok başlıklarını (önceki blok başlığı karması, durum kökü, grup kökünden oluşan) Ethereum'a bir `blob` veya "ikili büyük nesne" olarak yayımlar. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) verileri zincir üstünde dahil etmek için uygun maliyetli bir çözüm getirdi. `blob`, toplamaların sıkıştırılmış durum geçiş verilerini Ethereum L1'e göndermesine olanak tanıyan yeni bir işlem alanıdır. Kalıcı olarak zincir üstünde kalan `calldata`'nın aksine, bloblar kısa ömürlüdür ve [4096 dönemden](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (yaklaşık 18 gün) sonra istemcilerden budanabilir. İyimser toplamalar, sıkıştırılmış işlemlerin toplu halde gönderilmesinde blob'ları kullanarak L1'e işlem yazma maliyetini önemli ölçüde azaltabilir.

2. **Kullanılan blob gazı**: Blob taşıyan işlemler, [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) tarafından getirilen mekanizmaya benzer dinamik bir ücret mekanizması kullanır. Tip-3 işlemleri için gaz ücreti hesaplanırken ağ tarafından blob alanı talebine ve gönderilen işlemin blob alanı kullanımına bağlı olarak belirlenen blob'lar için ana ücret göz önünde bulundurulur.

3. **L2 operatör ücretleri**: Bu, tıpkı Ethereum'daki gaz ücretleri gibi, işlemleri işlerken ortaya çıkan hesaplama maliyetlerinin telafisi olarak toplama düğümlerine ödenen tutardır. L2'ler daha yüksek işleme kapasitelerine sahip olduğundan ve Ethereum'daki doğrulayıcıları daha yüksek ücretli işlemlere öncelik vermeye zorlayan ağ tıkanıklıklarıyla karşılaşmadığından, toplama düğümleri daha düşük işlem ücretleri alır.

İyimser toplamalar, veri yayımlama maliyetlerini azaltmak için işlemleri gruplama ve `calldata`'yı sıkıştırma da dahil olmak üzere, kullanıcılar için ücretleri azaltmaya yönelik çeşitli mekanizmalar uygular. Ethereum tabanlı iyimser toplamaları kullanmanın ne kadara mal olduğuna dair gerçek zamanlı bir genel bakış için [L2 ücret izleyicisini](https://l2fees.info/) kontrol edebilirsiniz.

## İyimser toplamalar Ethereum'u nasıl ölçeklendirir? Ethereum'u iyimser toplamalarla ölçeklendirme {#scaling-ethereum-with-optimistic-rollups}

Açıklandığı gibi, iyimser toplamalar, veri erişilebilirliğini garanti etmek için Ethereum'a sıkıştırılmış işlem verileri yayımlar. Zincir üstünde yayımlanan verileri sıkıştırma yeteneği, iyimser toplamalarla Ethereum'da verimi ölçeklendirmek için çok önemlidir.

Ana Ethereum zinciri, blokların ne kadar veri tutabileceğine dair, gaz birimleri cinsinden ifade edilen sınırlar koyar ([ortalama blok boyutu](/developers/docs/blocks/#block-size) 15 milyon gazdır). Bu, her işlemin ne kadar gaz kullanabileceğini kısıtlasa da, aynı zamanda her işlemle ilişkili veriyi azaltarak blok başına işlenen işlem sayısını artırabileceğimiz anlamına gelir ve bu durum ölçeklenebilirliği doğrudan artırır.

İyimser toplamalar, işlem verisi sıkıştırmasını gerçekleştirmek ve TPS oranlarını artırmak için birkaç teknik kullanır. Örneğin, bu [makale](https://vitalik.eth.limo/general/2021/01/05/rollup.html), temel bir kullanıcı işleminin (ether gönderme) Ana Ağ'da ürettiği veriyi, aynı işlemin bir toplamada ürettiği veriyle karşılaştırır:

| Parametre  | Ethereum (L1)                     | Toplama (L2) |
| ---------- | ---------------------------------------------------- | ------------------------------- |
| Nonce      | ~3                                   | 0                               |
| Gaz fiyatı | ~8                                   | 0-0,5                           |
| Gaz        | 3                                                    | 0-0,5                           |
| Kime       | 21                                                   | 4                               |
| Değer      | 9                                                    | ~3              |
| İmza       | ~68 (2 + 33 + 33) | ~0,5            |
| Kimden     | 0 (imzadan kurtarılmış)           | 4                               |
| **Toplam** | **~112 bayt**                        | **~12 bayt**    |

Bu veriler üzerinde yapılan yaklaşık hesaplamalar, iyimser toplamanın sağladığı ölçeklenebilirlik iyileştirmelerini göstermeye yardımcı olabilir:

1. Her blok için hedeflenen boyut 15 milyon gaz ve bir bayt veriyi doğrulamanın maliyeti 16 gazdır. Ortalama blok boyutunu 16 gaza bölmek (15.000.000/16), ortalama bir bloğun **937.500 bayt veri** tutabileceğini gösterir.
2. Temel bir toplama işlemi 12 bayt kullanıyorsa, ortalama bir Ethereum bloğu **78.125 toplama işlemi** (937.500/12) veya **39 toplama grubu** (her grup ortalama 2.000 işlem içeriyorsa) işleyebilir.
3. Ethereum'da her 15 saniyede bir yeni bir blok üretilirse, toplamanın işlem hızı kabaca **saniyede 5.208 işlem** olur. Bu, bir Ethereum bloğunun tutabileceği temel toplama işlemlerinin sayısını (**78.125**) ortalama blok süresine (**15 saniye**) bölerek yapılır.

Bu, iyimser toplama işlemlerinin asla tam bir Ethereum bloğunu oluşturamayacağı göz önüne alındığında, oldukça iyimser bir tahmindir. Bununla birlikte, iyimser toplamaların Ethereum kullanıcılarına ne kadar ölçeklenebilirlik kazancı sağlayabileceği hakkında yaklaşık bir fikir verebilir (mevcut uygulamalar 2.000 TPS'ye kadar sunar).

Ethereum'da [veri parçalamanın](/roadmap/danksharding/) getirilmesinin, iyimser toplamlarda ölçeklenebilirliği iyileştirmesi beklenmektedir. Toplama işlemleri, blok alanını toplama olmayan diğer işlemlerle paylaşmak zorunda olduğundan işleme kapasiteleri, ana Ethereum zincirindeki veri hacmiyle sınırlıdır. Danksharding, pahalı ve kalıcı `CALLDATA` yerine daha ucuz, geçici "blob" depolamayı kullanarak L2 zincirlerinin blok başına veri yayımlaması için mevcut alanı artıracaktır.

### İyimser toplamaların artıları ve eksileri {#optimistic-rollups-pros-and-cons}

| Artıları                                                                                                                                                                                                                  | Eksileri                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Güvenlikten veya güven gerektirmezlikten ödün vermeden ölçeklenebilirlikte büyük iyileştirmeler sunar.                                                                                                    | Potansiyel sahtecilik zorlukları nedeniyle işlemin kesinleştirilmesinde gecikmeler.                                                                      |
| İşlem verileri katman 1 zincirinde depolanır, bu da şeffaflığı, güvenliği, sansür direncini ve merkeziyetsizliği artırır.                                                                                 | Merkezi toplama operatörleri (sıralayıcılar), işlem sıralamasını etkileyebilir.                                                       |
| Sahteciliğin kanıtlanması, güven gerektirmez kesinliği garanti eder ve dürüst azınlıkların zinciri güvence altına almasına olanak tanır.                                                                  | Dürüst düğüm yoksa, kötü niyetli bir operatör geçersiz bloklar ve durum taahhütleri yayımlayarak fonları çalabilir.                                      |
| Sahtecilik kanıtlarının hesaplanması, özel donanım gerektiren doğruluk kanıtlarının (ZK toplamalarında kullanılan) aksine, normal L2 düğümüne açıktır.                                 | Güvenlik modeli, en az bir dürüst düğümün toplama işlemlerini yürütmesine ve geçersiz durum geçişlerine karşı sahtekarlık kanıtlarını sunmasına dayanır. |
| Toplamalar "güvenilmez canlılıktan" yararlanır (herkes işlemleri yürüterek ve savlar yayımlayarak zinciri ilerlemeye zorlayabilir)                                                                     | Kullanıcılar, fonları Ethereum'a geri çekmek için bir haftalık itiraz süresinin sona ermesini beklemelidir.                                              |
| İyimser toplamalar, zincirdeki güvenliği artırmak için iyi tasarlanmış kriptoekonomik teşviklere güvenir.                                                                                                 | Toplamaların tüm işlem verilerini zincir üstünde yayımlaması gerekir, bu da maliyetleri artırabilir.                                                     |
| EVM ve Solidity ile uyumluluk, geliştiricilerin Ethereum'a özgü akıllı sözleşmeleri toplamalara taşımasına veya yeni merkeziyetsiz uygulamalar oluşturmak için mevcut araçları kullanmasına olanak tanır. |                                                                                                                                                                          |

### İyimser toplamaların görsel bir açıklaması {#optimistic-video}

Görerek öğrenmeyi mi tercih ediyorsunuz? Finematics'in iyimser toplamalar hakkındaki açıklamasını izleyin:

<YouTube id="7pWxCklcNsU" start="263" />

## İyimser toplamalara dair daha fazlası

- [İyimser toplamalar nasıl çalışır (Kapsamlı rehber)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Blokzincir Toplaması nedir? Teknik Bir Giriş](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Arbitrum için Temel Rehber](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Ethereum Toplamaları için Pratik Rehber](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Ethereum L2'lerinde Sahtekarlık Kanıtlarının Durumu](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Optimism'in Toplaması Gerçekten Nasıl Çalışır?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [OVM Derinlemesine İnceleme](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [İyimser Sanal Makine Nedir?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
