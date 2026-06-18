---
title: "Veri kullanılabilirliği"
description: "Ethereum'daki veri kullanılabilirliği ile ilgili sorunlara ve çözümlere genel bir bakış"
lang: tr
---

"Güvenme, doğrula", Ethereum'da yaygın bir özdeyiştir. Buradaki ana fikir, düğümünüzün eşlerden aldığı bloklardaki tüm işlemleri yürüterek, teklif edilen değişikliklerin düğüm tarafından bağımsız olarak hesaplananlarla tam olarak eşleştiğinden emin olması ve böylece aldığı bilgilerin doğru olduğunu bağımsız olarak doğrulayabilmesidir. Bu, düğümlerin blok göndericilerinin dürüst olduğuna güvenmek zorunda olmadığı anlamına gelir. Veriler eksikse bu mümkün değildir.

**Veri kullanılabilirliği**, bir kullanıcının bir bloğu doğrulamak için gereken verilerin tüm ağ katılımcıları için gerçekten kullanılabilir olduğuna dair duyabileceği güveni ifade eder. [Ethereum](/) katman 1 (L1) üzerindeki tam düğümler için bu nispeten basittir; tam düğüm her bloktaki tüm verilerin bir kopyasını indirir - indirmenin mümkün olması için verilerin kullanılabilir _olması gerekir_. Eksik veriye sahip bir blok, blokzincire eklenmek yerine reddedilir. Bu "zincir içi veri kullanılabilirliği"dir ve monolitik blokzincirlerin bir özelliğidir. Tam düğümler, her işlemi kendileri için indirip yürüttüklerinden geçersiz işlemleri kabul etmeleri için kandırılamazlar. Ancak modüler blokzincirler, katman 2 (L2) toplamalar ve hafif istemciler için veri kullanılabilirliği ortamı daha karmaşıktır ve daha gelişmiş doğrulama prosedürleri gerektirir.

## Ön koşullar {#prerequisites}

[Blokzincir temelleri](/developers/docs/intro-to-ethereum/), özellikle de [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) hakkında iyi bir anlayışa sahip olmalısınız. Bu sayfa ayrıca okuyucunun [bloklar](/developers/docs/blocks/), [işlemler](/developers/docs/transactions/), [düğümler](/developers/docs/nodes-and-clients/), [ölçeklendirme çözümleri](/developers/docs/scaling/) ve diğer ilgili konulara aşina olduğunu varsayar.

## Veri kullanılabilirliği sorunu {#the-data-availability-problem}

Veri kullanılabilirliği sorunu, blokzincire eklenen bazı işlem verilerinin özetlenmiş biçiminin gerçekten bir dizi geçerli işlemi temsil ettiğini tüm ağa kanıtlama ihtiyacıdır, ancak bunu tüm düğümlerin tüm verileri indirmesini gerektirmeden yapmaktır. Tam işlem verileri, blokları bağımsız olarak doğrulamak için gereklidir, ancak tüm düğümlerin tüm işlem verilerini indirmesini gerektirmek ölçeklendirme önünde bir engeldir. Veri kullanılabilirliği sorununa yönelik çözümler, verileri kendileri için indirmeyen ve depolamayan ağ katılımcılarına, tam işlem verilerinin doğrulama için kullanılabilir hale getirildiğine dair yeterli güvence sağlamayı amaçlar.

[Hafif düğümler](/developers/docs/nodes-and-clients/light-clients) ve [Katman 2 (L2) toplamalar](/developers/docs/scaling), güçlü veri kullanılabilirliği güvenceleri gerektiren ancak işlem verilerini kendileri için indirip işleyemeyen ağ katılımcılarının önemli örnekleridir. İşlem verilerini indirmekten kaçınmak, hafif düğümleri hafif yapan ve toplamaların etkili ölçeklendirme çözümleri olmasını sağlayan şeydir.

Veri kullanılabilirliği, blokları doğrulamak için durum verilerini indirmesi ve depolaması gerekmeyen gelecekteki ["durumsuz"](/roadmap/statelessness) Ethereum istemcileri için de kritik bir endişedir. Durumsuz istemcilerin yine de verilerin _bir yerlerde_ mevcut olduğundan ve doğru bir şekilde işlendiğinden emin olmaları gerekir.

## Veri kullanılabilirliği çözümleri {#data-availability-solutions}

### Veri kullanılabilirliği örneklemesi (DAS) {#data-availability-sampling}

Veri Kullanılabilirliği Örneklemesi (DAS), ağın herhangi bir bireysel düğüme çok fazla yük bindirmeden verilerin kullanılabilir olduğunu kontrol etmesinin bir yoludur. Her düğüm (staking yapmayan düğümler dahil), toplam verinin rastgele seçilmiş küçük bir alt kümesini indirir. Örneklerin başarıyla indirilmesi, tüm verilerin mevcut olduğunu yüksek bir güvenle doğrular. Bu, belirli bir veri kümesini yedekli bilgilerle genişleten veri silme kodlamasına dayanır (bunun yapılma şekli, veriler üzerine _polinom_ olarak bilinen bir fonksiyonu uydurmak ve bu polinomu ek noktalarda değerlendirmektir). Bu, gerektiğinde orijinal verilerin yedekli verilerden kurtarılmasını sağlar. Bu veri oluşturmanın bir sonucu, orijinal verilerin _herhangi biri_ kullanılamıyorsa, genişletilmiş verilerin _yarısının_ eksik olacağıdır! Her düğüm tarafından indirilen veri örneklerinin miktarı, verilerin yarısından daha azı gerçekten mevcut _ise_, her istemci tarafından örneklenen veri parçalarından en az birinin eksik olma ihtimali _son derece_ yüksek olacak şekilde ayarlanabilir.

DAS, [Tam Danksharding](/roadmap/danksharding/#what-is-danksharding) uygulandıktan sonra Rollup operatörlerinin işlem verilerini kullanılabilir hale getirmelerini sağlamak için kullanılacaktır. Ethereum düğümleri, tüm verilerin var olduğundan emin olmak için yukarıda açıklanan yedeklilik şemasını kullanarak blob'larda sağlanan işlem verilerini rastgele örnekleyecektir. Aynı teknik, blok üreticilerinin hafif istemcileri güvence altına almak için tüm verilerini kullanılabilir hale getirmelerini sağlamak için de kullanılabilir. Benzer şekilde, [teklifçi-oluşturucu ayrımı (PBS)](/roadmap/pbs) altında, yalnızca blok oluşturucunun tüm bir bloğu işlemesi gerekecektir - diğer doğrulayıcılar veri kullanılabilirliği örneklemesi kullanarak doğrulama yapacaktır.

### Veri kullanılabilirliği komiteleri {#data-availability-committees}

Veri Kullanılabilirliği Komiteleri (DAC'ler), veri kullanılabilirliğini sağlayan veya onaylayan güvenilir taraflardır. DAC'ler, DAS yerine [veya onunla birlikte](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) kullanılabilir. Komitelerle birlikte gelen güvenlik garantileri, belirli kuruluma bağlıdır. Örneğin Ethereum, hafif düğümler için veri kullanılabilirliğini onaylamak amacıyla rastgele örneklenmiş doğrulayıcı alt kümelerini kullanır.

DAC'ler bazı validium'lar tarafından da kullanılır. DAC, verilerin kopyalarını çevrimdışı olarak depolayan güvenilir bir düğüm kümesidir. Bir anlaşmazlık durumunda DAC'nin verileri kullanılabilir hale getirmesi gerekir. DAC üyeleri ayrıca söz konusu verilerin gerçekten mevcut olduğunu kanıtlamak için zincir içi onaylar yayınlarlar. Bazı validium'lar DAC'leri bir hisse kanıtı (PoS) doğrulayıcı sistemiyle değiştirir. Burada herkes doğrulayıcı olabilir ve verileri zincir dışı depolayabilir. Ancak, bir akıllı sözleşmeye yatırılan bir "teminat" sağlamaları gerekir. Doğrulayıcının verileri saklaması gibi kötü niyetli davranışlar durumunda, teminattan ceza kesintisi yapılabilir. Hisse kanıtı veri kullanılabilirliği komiteleri, dürüst davranışı doğrudan teşvik ettikleri için normal DAC'lerden önemli ölçüde daha güvenlidir.

## Veri kullanılabilirliği ve hafif düğümler {#data-availability-and-light-nodes}

[Hafif düğümler](/developers/docs/nodes-and-clients/light-clients), aldıkları blok başlıklarının doğruluğunu blok verilerini indirmeden doğrulamalıdır. Bu hafifliğin bedeli, tam düğümlerin yaptığı gibi işlemleri yerel olarak yeniden yürüterek blok başlıklarını bağımsız olarak doğrulayamamaktır.

Ethereum hafif düğümleri, bir _senkronizasyon komitesine_ atanmış 512 doğrulayıcıdan oluşan rastgele kümelere güvenir. Senkronizasyon komitesi, kriptografik bir imza kullanarak hafif istemcilere başlıktaki verilerin doğru olduğunu bildiren bir DAC görevi görür. Senkronizasyon komitesi her gün yenilenir. Her blok başlığı, hafif düğümleri _bir sonraki_ bloğu hangi doğrulayıcıların imzalamasını bekleyecekleri konusunda uyarır, böylece gerçek senkronizasyon komitesi gibi davranan kötü niyetli bir gruba güvenmeleri için kandırılamazlar.

Ancak, bir saldırgan bir şekilde kötü niyetli bir blok başlığını hafif istemcilere iletmeyi _başarır_ ve onları bunun dürüst bir senkronizasyon komitesi tarafından imzalandığına ikna ederse ne olur? Bu durumda, saldırgan geçersiz işlemleri dahil edebilir ve hafif istemci, blok başlığında özetlenen tüm durum değişikliklerini bağımsız olarak kontrol etmediği için bunları körü körüne kabul eder. Buna karşı korunmak için hafif istemci sahtekarlık kanıtları kullanabilir.

Bu sahtekarlık kanıtlarının çalışma şekli şöyledir: Ağ etrafında dedikodusu yapılan geçersiz bir durum geçişini gören tam bir düğüm, önerilen bir durum geçişinin belirli bir işlem kümesinden kaynaklanamayacağını gösteren küçük bir veri parçasını hızla oluşturabilir ve bu verileri eşlere yayınlayabilir. Hafif düğümler bu sahtekarlık kanıtlarını alabilir ve bunları kötü blok başlıklarını reddetmek için kullanarak tam düğümlerle aynı dürüst zincirde kalmalarını sağlayabilir.

Bu, tam düğümlerin tam işlem verilerine erişimi olmasına dayanır. Kötü bir blok başlığı yayınlayan ve aynı zamanda işlem verilerini kullanılabilir hale getirmeyen bir saldırgan, tam düğümlerin sahtekarlık kanıtları oluşturmasını engelleyebilir. Tam düğümler kötü bir blok hakkında bir uyarı sinyali verebilir, ancak uyarılarını kanıtla destekleyemezler, çünkü kanıtı oluşturmak için veriler kullanılabilir hale getirilmemiştir!

Bu veri kullanılabilirliği sorununun çözümü DAS'tır. Hafif düğümler, tam durum verilerinin çok küçük rastgele parçalarını indirir ve tam veri kümesinin mevcut olduğunu doğrulamak için örnekleri kullanır. N rastgele parça indirdikten sonra tam veri kullanılabilirliğini yanlış varsaymanın gerçek olasılığı hesaplanabilir ([100 parça için şans 10^-30'dur](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), yani inanılmaz derecede düşüktür).

Bu senaryoda bile, sadece birkaç baytı saklayan saldırılar, rastgele veri istekleri yapan istemciler tarafından fark edilmeyebilir. Silme kodlaması, önerilen durum değişikliklerini kontrol etmek için kullanılabilecek küçük eksik veri parçalarını yeniden oluşturarak bunu düzeltir. Daha sonra yeniden oluşturulan veriler kullanılarak bir sahtekarlık kanıtı oluşturulabilir ve hafif düğümlerin kötü başlıkları kabul etmesi engellenebilir.

**Not:** DAS ve sahtekarlık kanıtları, hisse kanıtı (PoS) Ethereum hafif istemcileri için henüz uygulanmamıştır, ancak yol haritasındadırlar ve büyük olasılıkla ZK-SNARK tabanlı kanıtlar şeklini alacaklardır. Günümüzün hafif istemcileri bir tür DAC'ye güvenir: senkronizasyon komitesinin kimliklerini doğrularlar ve ardından aldıkları imzalı blok başlıklarına güvenirler.

## Veri kullanılabilirliği ve katman 2 toplamalar {#data-availability-and-layer-2-rollups}

[Toplamalar](/glossary/#rollups) gibi [Katman 2 (L2) ölçeklendirme çözümleri](/layer-2/), işlemleri zincir dışı işleyerek işlem maliyetlerini düşürür ve Ethereum'un işlem kapasitesini artırır. Rollup işlemleri sıkıştırılır ve Ethereum'da gruplar halinde yayınlanır. Gruplar, Ethereum'daki tek bir işlemde binlerce bireysel zincir dışı işlemi temsil eder. Bu, temel katmandaki tıkanıklığı azaltır ve kullanıcılar için ücretleri düşürür.

Ancak, Ethereum'da yayınlanan 'özet' işlemlere güvenmek, yalnızca önerilen durum değişikliğinin bağımsız olarak doğrulanabilmesi ve tüm bireysel zincir dışı işlemlerin uygulanmasının bir sonucu olduğunun onaylanabilmesi durumunda mümkündür. Rollup operatörleri işlem verilerini bu doğrulama için kullanılabilir hale getirmezlerse, Ethereum'a yanlış veriler gönderebilirler.

[İyimser toplamalar](/developers/docs/scaling/optimistic-rollups/), sıkıştırılmış işlem verilerini Ethereum'da yayınlar ve bağımsız doğrulayıcıların verileri kontrol etmesine izin vermek için bir süre (genellikle 7 gün) bekler. Herhangi biri bir sorun tespit ederse, bir sahtekarlık kanıtı oluşturabilir ve bunu Rollup'a meydan okumak için kullanabilir. Bu, zincirin geri alınmasına ve geçersiz bloğun atlanmasına neden olur. Bu sadece veriler mevcutsa mümkündür. Şu anda, iyimser toplamaların işlem verilerini L1'e göndermesinin iki yolu vardır. Bazı toplamalar, verileri kalıcı olarak zincir içi yaşayan `CALLDATA` olarak kalıcı olarak kullanılabilir hale getirir. EIP-4844'ün uygulanmasıyla, bazı toplamalar işlem verilerini bunun yerine daha ucuz blob depolamasına gönderir. Bu kalıcı bir depolama değildir. Bağımsız doğrulayıcılar, veriler Ethereum katman 1'den (L1) silinmeden önce yaklaşık 18 gün içinde blob'ları sorgulamalı ve itirazlarını dile getirmelidir. Veri kullanılabilirliği, Ethereum protokolü tarafından yalnızca bu kısa sabit pencere için garanti edilir. Bundan sonra, Ethereum ekosistemindeki diğer varlıkların sorumluluğu haline gelir. Herhangi bir düğüm, DAS kullanarak, yani blob verilerinin küçük, rastgele örneklerini indirerek veri kullanılabilirliğini doğrulayabilir.

[Sıfır bilgi (ZK) toplamaları](/developers/docs/scaling/zk-rollups), [sıfır bilgi geçerlilik kanıtları](/glossary/#zk-proof) durum geçişlerinin doğruluğunu garanti ettiği için işlem verilerini yayınlamaya ihtiyaç duymaz. Ancak, durum verilerine erişim olmadan ZK-Rollup'ın işlevselliğini garanti edemeyeceğimiz (veya onunla etkileşime giremeyeceğimiz) için veri kullanılabilirliği hala bir sorundur. Örneğin, bir operatör Rollup'ın durumu hakkındaki ayrıntıları saklarsa kullanıcılar bakiyelerini bilemezler. Ayrıca, yeni eklenen bir blokta yer alan bilgileri kullanarak durum güncellemeleri gerçekleştiremezler.

## Veri kullanılabilirliği ve veri kurtarılabilirliği {#data-availability-vs-data-retrievability}

Veri kullanılabilirliği, veri kurtarılabilirliğinden farklıdır. Veri kullanılabilirliği, tam düğümlerin belirli bir blokla ilişkili tüm işlem kümesine erişebildiğinin ve doğrulayabildiğinin güvencesidir. Bu, verilerin sonsuza kadar erişilebilir olduğu anlamına gelmez.

Veri kurtarılabilirliği, düğümlerin blokzincirden _geçmiş bilgileri_ alabilme yeteneğidir. Bu geçmiş veriler yeni blokları doğrulamak için gerekli değildir, yalnızca tam düğümleri başlangıç bloğundan eşzamanlamak veya belirli geçmiş isteklere hizmet etmek için gereklidir.

Çekirdek Ethereum protokolü öncelikle veri kurtarılabilirliği ile değil, veri kullanılabilirliği ile ilgilenir. Veri kurtarılabilirliği, üçüncü taraflarca çalıştırılan küçük bir arşiv düğümü popülasyonu tarafından sağlanabilir veya [Portal Ağı](https://www.ethportal.net/) gibi merkeziyetsiz dosya depolama kullanılarak ağa dağıtılabilir.

## Daha fazla bilgi {#further-reading}

- [Veri Kullanılabilirliği Nedir?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Veri Kullanılabilirliği Nedir?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Veri kullanılabilirliği kontrollerine giriş](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Parçalama (sharding) + DAS teklifinin açıklaması](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Veri kullanılabilirliği ve silme kodlaması üzerine bir not](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Veri kullanılabilirliği komiteleri.](https://medium.com/starkware/data-availability-e5564c416424)
- [Hisse kanıtı veri kullanılabilirliği komiteleri.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Veri kurtarılabilirliği sorununa çözümler](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Veri Kullanılabilirliği Veya: Toplamalar Endişelenmeyi Bırakıp Ethereum'u Sevmeyi Nasıl Öğrendi](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Çağrı Verisi Maliyetini Artırma](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)