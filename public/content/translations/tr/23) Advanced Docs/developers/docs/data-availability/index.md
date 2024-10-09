---
title: Veri kullanılabilirliği
description: Ethereum'da veri kullanılabilirliği ile ilgili sorunlara ve çözümlerine genel bakış
lang: tr
---

"Güvenme, doğrula'" Ethereum'da yaygın bir slogandır. Ardındaki fikir, düğümünüzün aldığı bilgilerin doğru olduğunu bağımsız bir şekilde doğrulayabilmesidir. Düğüm, aldığı bloklardaki tüm işlemleri gerçekleştirerek önerilen değişikliklerin düğüm tarafından bağımsız olarak hesaplananlarla tam olarak eşleşip eşleşmediğini kontrol edebilir. Bu durum, düğümlerin bloğu gönderenlerin dürüst olduğuna güvenmek zorunda olmadığı anlamına gelir. Veri eksikse bu mümkün değildir.

**Veri kullanılabilirliği**, bir kullanıcının bir bloğu doğrulamak için gereken verinin gerçekten tüm ağ katılımcıları için kullanılabilir olduğu konusundaki güvencesini ifade eder. Ethereum'un 1. katmanındaki tam düğümler için bu nispeten basittir; tam düğüm her bloğun içindeki verinin bir kopyasını indirir - indirmenin _mümkün_ olabilmesi için veri kullanılabilir olmalıdır. Verileri eksik olan bir blok, blokzincire eklenmek yerine reddedilir. Bu "zincir üstünde veri kullanılabilirliği" olarak adlandırılır ve monolitik blokzincirlerin bir özelliğidir. Tam düğümler, her işlemi indirir ve kendi kendilerine gerçekleştirir, bu nedenle bunları kandırıp geçersiz işlemleri kabul ettirmek mümkün değildir. Ancak modüler blokzincirler, katman 2 toplamaları ve hafif istemciler için veri kullanılabilirliği daha karmaşıktır ve daha sofistike doğrulama prosedürleri gerektirebilir.

## Ön koşullar {#prerequisites}

Özellikle [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) başta olmak üzere, [blokzincirin temellerine](/developers/docs/intro-to-ethereum/) hakim olmanız gerekir. Ayrıca, bu sayfa okuyucunun [bloklar](/developers/docs/blocks/), [işlemler](/developers/docs/transactions/), [düğümler](/developers/docs/nodes-and-clients/), [ölçeklendirme çözümleri](/developers/docs/scaling/) ve diğer ilgili konular hakkında bilgi sahibi olduğunu kabul eder.

## Veri Kullanılabilirliği Sorunu {#the-data-availability-problem}

Veri kullanılabilirliği sorunu, blokzincire eklenen bazı işlem verilerinin özetlenmiş şeklinin gerçekten geçerli işlemler kümesini temsil ettiğini tüm ağa kanıtlama ihtiyacını ifade eder, ancak tüm düğümlerin tüm verileri indirmesi gerekmeksizin bunu yapma ihtiyacını ortadan kaldırır. Tam işlem verileri blokları bağımsız olarak doğrulamak için gereklidir ancak tüm düğümlerin tüm işlem verilerini indirmesi, ölçeklendirme açısından bir engel oluşturur. Veri kullanılabilirliği sorununun çözümleri, tüm işlem verilerinin kendileri için veriyi indirip depolamayan ağ katılımcılarına doğrulama için mevcut olduğuna dair yeterli güvence sağlamayı hedefler.

[Açık düğümler](/developers/docs/nodes-and-clients/light-clients) ve [Katman 2 toplamaları](/developers/docs/scaling), kendileri için işlem verilerini indiremeyen ancak güçlü veri kullanılabilirliği güvencelerine ihtiyaç duyan ağ katılımcılarının önemli örnekleridir. İşlem verilerini indirmekten kaçınma, açık düğümleri açık kılan ve toplamaların etkili ölçeklendirme çözümleri olmasını sağlayan unsurdur.

Veri kullanılabilirliği ayrıca ["durumsuz"](/roadmap/statelessness) Ethereum istemcileri için de kritik bir endişedir. Bu istemciler, blokları doğrulamak için durum verilerini indirmek ve depolamak zorunda olmadıklarından veri kullanılabilirliği önemlidir. Durumsuz istemciler yine de verilerin _bir şekilde_ kullanılabilir olduğundan ve doğru şekilde işlendiğinden emin olmak zorundadır.

## Veri Kullanılabilirliği Çözümleri {#data-availability-solutions}

### Veri kullanılabilirliği örneklemesi (DAS) {#data-availability-sampling}

Veri Kullanılabilirliği Örneklemesi (DAS), ağ için herhangi bir düğüme çok fazla yük bindirmeden verilerin kullanılabilir olup olmadığını kontrol etmenin bir yoludur. Her düğüm (hisseleme yapmayan düğümler dahil), toplam verinin küçük, rastgele seçilmiş bir alt kümesini indirir. Örneklerin başarıyla indirilmesi, tüm verilerin mevcut olduğu konusunda yüksek bir güvence sağlar. Bu, veri kümesini gereksiz bilgiyle genişleten (bu işlem, verinin üzerinde bir polinom olarak bilinen bir işlevi sığdırmak ve bu _polinomu_ ek noktalarda değerlendirmek yoluyla yapılır) veri silme kodlamasına dayanır. Bu, gerektiğinde orijinal verinin gereksiz veriden geri kazanılmasına olanak tanır. Bu veri oluşturma sürecinin bir sonucu, orijinal verilerden _herhangi_ biri mevcut değilse, genişletilmiş verinin _yarısının_ eksik olmasıdır! Her düğüm tarafından indirilen veri örneklerinin miktarı, her bir istemcinin örnekleme yoluyla örneklenen veri parçalarının en az yarısının gerçekten mevcut olmadığı durumlarda _bile_ eksik olması olasılığı _son derece yüksek_ olacak şekilde ayarlanabilir.

DAS, [Tam Danksharding](/roadmap/danksharding/#what-is-danksharding) uygulanmaya alındıktan sonra toplama operatörlerinin işlem verilerini kullanılabilir tutmasını sağlamak için kullanılacaktır. Ethereum düğümleri, tüm verilerin mevcut olmasını sağlamak için yukarıda açıklanan yedekleme şemasını kullanarak örneklemelerle sağlanan işlem verilerini rastgele örnekleyecektir. Aynı teknik, blok üreticilerinin tüm verilerini güvenli açık istemcilerin kullanımına açık hale getirmek için kullanılabilir. Benzer şekilde, [önerici-oluşturucu ayrımı](/roadmap/pbs) altında, sadece blok oluşturucunun tüm bloğu işlemesi gerekecek, diğer doğrulayıcılar veri kullanılabilirliği örneklemesi kullanarak doğrulama yapacaklardır.

### Veri kullanılabilirliği kurulları {#data-availability-committees}

Veri Kullanılabilirliği Kurulları (DAC'ler), veri kullanılabilirliğini sağlayan veya onaylayan güvenilir taraflardır. DAC'ler, DAS'ın yerine veya DAS [ile birlikte](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) kullanılabilir. Kurullarla birlikte gelen güvenlik güvenceleri, belirli bir yapılandırmaya dayalıdır. Ethereum, örneğin açık istemciler için veri kullanılabilirliğini doğrulamak üzere rastgele örneklenmiş doğrulayıcı alt kümelerini kullanır.

Bazı validiumlar da DAC'leri kullanır. DAC, verilerin kopyalarını çevrimdışı olarak depolayan güvenilir bir düğüm kümesidir. DAC, bir anlaşmazlık durumunda verileri kullanıma sunmak zorundadır. DAC üyeleri, bahsi geçen verinin gerçekten mevcut olduğunu kanıtlamak için zincir üstünde tasdikler yayımlar. Bazı validiumlar, DAC'leri bir hisse ispatı (PoS) doğrulayıcı sistemiyle değiştirir. Burada, herkes bir doğrulayıcı olabilir ve veriyi zincir dışında depolayabilir. Ancak bir "bono" sağlamaları gerekmektedir, bu da bir akıllı sözleşmeye yatırılır. Doğrulayıcının verileri saklaması gibi bir kötü niyetli davranış durumunda bono kesilebilir. Hisse ispatı veri kullanılabilirliği kurulları, dürüst davranışı doğrudan teşvik ettikleri için normal DAC'lere göre daha güvenlidir.

## Veri kullanılabilirliği ve hafif düğümler {#data-availability-and-light-nodes}

[Hafif düğümler](/developers/docs/nodes-and-clients/light-clients), aldıkları blok başlıklarını blok verilerini indirmeden doğrulamak zorundadır. Bu hafifliğin maliyeti, tam düğümlerin yaptığı gibi yerel olarak işlemleri yeniden çalıştırarak blok başlıklarını bağımsız olarak doğrulayamamalarıdır.

Ethereum hafif düğümleri, bir _senkronizasyon kuruluna_ atanmış rastgele 512 doğrulayıcının rastgele kümelerine güvenmektedir. Senkronizasyon kurulu, başlıktaki verilerin doğru olduğunu hafif düğümlere kriptografik bir imza kullanarak sinyal veren bir DAC gibi hareket eder. Senkronizasyon kurulu her gün yenilenir. Her blok başlığı, hangi doğrulayıcılardan _sonraki_ bloğu onaylamasının beklendiği konusunda hafif düğümleri uyararak gerçek senkronizasyon kurulunu taklit eden kötü niyetli bir grup tarafından aldatılmasını önler.

Pekala, bir saldırgan hafif düğümlere kötü niyetli bir blok başlığı aktarmayı bir şekilde _başarırsa_ ve onları dürüst bir senkronizasyon kurulu tarafından onaylandığına ikna ederse ne olur? Bu durumda, saldırgan geçersiz işlemleri sürece dahil edebilir ve hafif istemci, blok başlığında özetlenen tüm durum değişikliklerini bağımsız olarak kontrol etmediği için bu işlemleri körü körüne kabul edebilir. Bundan korunmak için hafif istemci sahtecilik kanıtlarını kullanabilir.

Bu sahtecilik kanıtlarının çalışma şekli, ağda dolaşan geçersiz bir durum geçişi gören bir tam düğümün, önerilen bir durum geçişinin belirli bir işlem kümesinden kesinlikle kaynaklanamayacağını gösteren küçük bir veri parçası oluşturup bu veriyi taraflara yayımlamasıdır. Hafif düğümler bu sahtecilik kanıtlarını alıp kötü blok başlıklarını atmak için kullanabilir ve bu sayede tam düğümlerle aynı dürüst zincir üzerinde kalabilirler.

Bu, tam düğümlerin tüm işlem verilerine erişiminin olmasına dayalıdır. Kötü bir blok başlığını yayımlayan ve aynı zamanda işlem verilerinin kullanıma açık olmasını sağlamayan bir saldırgan, tam düğümlerin sahtecilik kanıtları üretmesini engelleyebilir. Tam düğümler, kötü bir blok hakkında bir uyarı işareti gönderebilse de bu uyarıyı kanıtlarla destekleyemezler, çünkü kanıt üretmek için veri sağlanmamıştır!

Bu veri erişilebilirlik sorununun çözümü DAS'dir. Hafif düğümler, tam durum verilerinin çok küçük rastgele parçalarını indirir ve örnekleri kullanarak tüm veri setinin mevcut olduğunu doğrularlar. N sayıda rastgele parça indirdikten sonra hatalı şekilde tam veri kullanılabilirliğinin kabul edilme olasılığı hesaplanabilir ([örneğin 100 parça için olasılık 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)'dur, yani son derece düşüktür).

Bu senaryoda bile, yalnızca birkaç baytı saklayan saldırılar, rastgele veri taleplerinde bulunan istemcilerin gözünden kaçabilir. Silme kodlaması, önerilen durum değişikliklerini kontrol etmek için kullanılabilecek kayıp küçük veri parçalarını yeniden oluşturarak bu sorunu çözer. Ardından yeniden oluşturulan veri kullanılarak bir sahtecilik kanıtı oluşturulabilir ve bu sayede hafif düğümlerin kötü başlıkları kabul etmesi engellenebilir.

**Not:** DAS ve sahtecilik kanıtları hisse ispatı Ethereum hafif istemcileri için henüz uygulanmamıştır ancak bunlar yol haritasında bulunmaktadır ve muhtemelen ZK-SNARK tabanlı kanıtlar şeklinde gerçekleşecektir. Günümüzdeki hafif istemciler, bir tür DAC'ye dayalıdır: senkronizasyon kurulunun kimliklerini doğrular ve ardından aldıkları imzalı blok başlıklarına güvenirler.

## Veri kullanılabilirliği ve katman 2 toplamaları {#data-availability-and-layer-2-rollups}

[Toplamalar](/glossary/#rollups) gibi [katman 2 ölçeklendirme çözümleri](/layer-2/), işlemleri zincir dışında işleyerek Ethereum'un işlem maliyetlerini azaltır ve işlem hacmini artırır. Toplama işlemleri, sıkıştırılıp yığınlar halinde Ethereum'da yayımlanır. Yığınlar, zincir dışındaki binlerce ayrı işlemi Ethereum'da tek bir işlemi olarak gösterir. Bu, temel katman üzerindeki sıkışıklığı azaltır ve kullanıcılar için ücretleri düşürür.

Ancak, Ethereum'da yayımlanan "özet" işlemlere, sadece önerilen durum değişikliği bağımsız olarak doğrulanabiliyor ve zincir dışındaki tüm ayrı işlemlerinin uygulanmasının sonucu olduğu onaylanabiliyorsa güvenmek mümkündür. Toplama operatörleri bu doğrulama için işlem verilerini kullanılabilir hale getirmezlerse, yanlış verileri Ethereum'a gönderebilirler.

[İyimser toplamalar](/developers/docs/scaling/optimistic-rollups/), sıkıştırılmış işlem verilerini Ethereum'a gönderir ve bağımsız doğrulayıcıların verileri kontrol etmelerine izin vermek için belirli bir süre (genellikle 7 gün) bekler. Herhangi bir sorun tespit eden kişi, sahtecilik kanıtı üretip bu kanıtı toplamaya itiraz etmek için kullanabilir. Bu, zinciri geriye döndürüp geçersiz bloğu çıkartır. Bu, sadece verilerin kullanılabilir olduğu durumda mümkündür. Şu anda, iyimser toplamaların işlem verilerini L1'e göndermesinin 2 yolu vardır. Bazı toplamalar, verileri kalıcı olarak zincir üstünde bulunan `CALLDATA` olarak kalıcı şekilde kullanılabilir hale getirir. EIP-4844'ün uygulamaya alınması sonrası bazı toplamalar, işlem verilerini bunun yerine daha ucuz blob depolama alanına gönderiyor. Bu, kalıcı bir depolama değildir. Bağımsız doğrulayıcıların, veriler Ethereum katman 1'den silinmeden önce yaklaşık 18 gün içinde blob'ları sorgulayıp itirazlarını iletmeleri gerekir. Verilerin kullanılabilirliği, Ethereum protokolü tarafından yalnızca bu kısa zaman aralığı için garanti edilir. Bunun ardından, Ethereum ekosistemindeki diğer varlıkların sorumluluğuna girer. Herhangi bir düğüm, DAS kullanarak, yani blob verilerinin küçük, rastgele örneklerini indirerek veri kullanılabilirliğini doğrulayabilir.

[Sıfır bilgili (ZK) toplamalar](/developers/docs/scaling/zk-rollups), durum geçişlerinin doğruluğunu garanti eden [sıfır bilgili doğruluk kanıtları](/glossary/#zk-proof) nedeniyle işlem verilerini yayımlamaya ihtiyaç duymaz. Ancak, durum verilerine erişimiz olmadan ZK toplamasının işlevselliğini garanti edemeyeceğimiz (veya etkileşime giremeyeceğimiz) için veri kullanılabilirliği hala bir sorundur. Örneğin, bir operatör toplamanın durumu hakkındaki ayrıntıları saklarsa, kullanıcılar bakiyelerini bilemezler. Ayrıca, yeni eklenen bir bloktaki bilgileri kullanarak durum güncellemeleri gerçekleştiremezler.

## Veri kullanılabilirliği ile veri alınabilirliği karşılaştırması {#data-availability-vs-data-retrievability}

Veri kullanılabilirliği ile veri alınabilirliği farklı kavramlardır. Veri kullanılabilirliği, tam düğümlerin belirli bir blokla ilişkilendirilen tam işlem kümesine erişebildiği ve doğrulayabildiğine ilişkin güvenceye verilen isimdir. Ancak bu, verilerin sonsuza dek kullanılabilir olduğu anlamına gelmez.

Veri alınabilirliği, düğümlerin blokzincirden _geçmişe ilişkin bilgileri_ alabilme yeteneğidir. Geçmişe ilişkin veriler, yeni blokları doğrulamak için değil, yalnızca tam düğümleri başlangıç bloğundan senkronize etmek veya geçmişteki belirli istekleri karşılamak için gereklidir.

Çekirdek Ethereum protokolü, veri alınabilirliği yerine daha çok veri kullanılabilirliği ile ilgilidir. Veri alınabilirliği, üçüncü taraflar tarafından işletilen küçük bir arşiv düğümleri popülasyonu tarafından sağlanabilir veya [Portal Ağı](https://www.ethportal.net/) gibi merkezi olmayan dosya depolama kullanılarak ağa yayılabilir.

## Daha fazla okuma {#further-reading}

- [Veri Kullanılabilirliği nedir?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Veri Kullanılabilirliği nedir?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [Ethereum Zincir Dışında Veri Kullanılabilirliği Görünümü](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
- [Veri kullanılabilirliği kontrolleri hakkında temel bilgiler](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Parçalama + DAS önerisine ilişkin açıklama](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Veri kullanılabilirliği ve silme kodlaması hakkında bir not](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Veri kullanılabilirliği kurulları.](https://medium.com/starkware/data-availability-e5564c416424)
- [Hisse ispatı veri kullanılabilirliği kurulları.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Veri alınabilirliği sorununa yönelik çözümler](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Veri Kullanılabilirliği veya: Toplamalar Endişelenmeyi Bırakıp Ethereum'u Sevmeyi Nasıl Öğrendi?](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups) 
