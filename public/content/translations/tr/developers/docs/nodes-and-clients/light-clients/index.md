---
title: Hafif istemciler
description: "Ethereum hafif istemcilerine giriş."
lang: tr
---

Bir tam düğüm çalıştırmak, [Ethereum](/) ile etkileşime girmenin en güven gerektirmeyen, özel, merkeziyetsiz ve sansüre dirençli yoludur. Bir tam düğüm ile, anında sorgulayabileceğiniz kendi blokzincir kopyanızı tutarsınız ve Ethereum'un eşler arası ağına doğrudan erişim elde edersiniz. Ancak, bir tam düğüm çalıştırmak önemli miktarda bellek, depolama ve CPU gerektirir. Bu, herkesin kendi düğümünü çalıştırmasının mümkün olmadığı anlamına gelir. Ethereum yol haritasında buna yönelik, durumsuzluk da dahil olmak üzere çeşitli çözümler vardır, ancak bunların uygulanmasına daha birkaç yıl vardır. Kısa vadedeki cevap, düğümlerin çok düşük donanım gereksinimleriyle çalışmasına olanak tanıyan büyük performans iyileştirmeleri için bir tam düğüm çalıştırmanın bazı faydalarından ödün vermektir. Bu ödünleşimi yapan düğümler hafif düğümler olarak bilinir.

## Hafif istemci nedir? {#what-is-a-light-client}

Bir hafif düğüm, hafif istemci yazılımı çalıştıran bir düğümdür. Blokzincir verilerinin yerel kopyalarını tutmak ve tüm değişiklikleri bağımsız olarak doğrulamak yerine, gerekli verileri bir sağlayıcıdan talep ederler. Sağlayıcı, bir tam düğüme doğrudan bağlantı veya merkezi bir RPC sunucusu aracılığıyla olabilir. Veriler daha sonra hafif düğüm tarafından doğrulanır ve zincirin başını takip etmesine olanak tanır. Hafif düğüm yalnızca blok başlıklarını işler, gerçek blok içeriklerini yalnızca ara sıra indirir. Düğümler, çalıştırdıkları hafif ve tam istemci yazılımı kombinasyonlarına bağlı olarak hafifliklerinde farklılık gösterebilir. Örneğin, en hafif yapılandırma bir hafif yürütme istemcisi ve bir hafif fikir birliği istemcisi çalıştırmak olacaktır. Ayrıca birçok düğümün tam yürütme istemcileriyle hafif fikir birliği istemcileri çalıştırmayı seçmesi veya tam tersi de muhtemeldir.

## Hafif istemciler nasıl çalışır? {#how-do-light-clients-work}

Ethereum, Hisse Kanıtı (PoS) tabanlı bir mutabakat mekanizması kullanmaya başladığında, özellikle hafif istemcileri desteklemek için yeni bir altyapı tanıtıldı. Çalışma şekli, bir **senkronizasyon komitesi** olarak hareket etmek üzere her 1,1 günde bir rastgele 512 doğrulayıcıdan oluşan bir alt küme seçmektir. Senkronizasyon komitesi son blokların başlığını imzalar. Her blok başlığı, senkronizasyon komitesindeki doğrulayıcıların birleştirilmiş imzasını ve hangi doğrulayıcıların imzaladığını, hangilerinin imzalamadığını gösteren bir "bit alanı" içerir. Her başlık ayrıca bir sonraki bloğun imzalanmasına katılması beklenen doğrulayıcıların bir listesini de içerir. Bu, bir hafif istemcinin senkronizasyon komitesinin aldıkları verileri onayladığını hızlıca görebileceği ve ayrıca aldıkları komiteyi önceki blokta beklemeleri söylenen komiteyle karşılaştırarak senkronizasyon komitesinin gerçek olup olmadığını kontrol edebileceği anlamına gelir. Bu şekilde hafif istemci, bloğun kendisini indirmeden, yalnızca özet bilgileri içeren başlığı indirerek en son Ethereum bloğu hakkındaki bilgisini güncellemeye devam edebilir.

Yürütme katmanında, bir hafif yürütme istemcisi için tek bir spesifikasyon yoktur. Bir hafif yürütme istemcisinin kapsamı, bir tam düğümün tüm EVM ve ağ işlevselliğine sahip olan ancak ilişkili verileri indirmeden yalnızca blok başlıklarını doğrulayan bir tam yürütme istemcisinin "hafif modundan" değişebilir veya Ethereum ile etkileşime girmek için istekleri bir RPC sağlayıcısına iletmeye büyük ölçüde dayanan daha sadeleştirilmiş bir istemci olabilir.

## Hafif istemciler neden önemlidir? {#why-are-light-clients-important}

Hafif istemciler önemlidir çünkü kullanıcıların, bir tam düğümün hesaplama kaynaklarının yalnızca çok küçük bir kısmını kullanırken, veri sağlayıcılarının doğru ve dürüst olduğuna körü körüne güvenmek yerine gelen verileri doğrulamalarına olanak tanır. Hafif istemcilerin aldığı veriler, 512 Ethereum doğrulayıcısından oluşan rastgele bir kümenin en az 2/3'ü tarafından imzalandığını bildikleri blok başlıklarına karşı kontrol edilebilir. Bu, verilerin doğru olduğuna dair çok güçlü bir kanıttır.

Hafif istemci yalnızca çok az miktarda hesaplama gücü, bellek ve depolama alanı kullanır, bu nedenle bir cep telefonunda çalıştırılabilir, bir uygulamaya gömülebilir veya bir tarayıcının parçası olabilir. Hafif istemciler, Ethereum'a güveni minimize edilmiş erişimi, üçüncü taraf bir sağlayıcıya güvenmek kadar sorunsuz hale getirmenin bir yoludur.

Basit bir örnek alalım. Hesap bakiyenizi kontrol etmek istediğinizi hayal edin. Bunu yapmak için bir Ethereum düğümüne istekte bulunmanız gerekir. Bu düğüm, bakiyeniz için Ethereum durumunun yerel kopyasını kontrol edecek ve size geri döndürecektir. Bir düğüme doğrudan erişiminiz yoksa, bu verileri bir hizmet olarak sağlayan merkezi operatörler vardır. Onlara bir istek gönderebilirsiniz, onlar düğümlerini kontrol eder ve sonucu size geri gönderirler. Bununla ilgili sorun, sağlayıcının size doğru bilgiyi verdiğine güvenmek zorunda olmanızdır. Kendiniz doğrulayamazsanız, bilginin doğru olduğunu asla gerçekten bilemezsiniz.

Bir hafif istemci bu sorunu ele alır. Hâlâ bazı harici sağlayıcılardan veri talep edersiniz, ancak verileri geri aldığınızda, hafif düğümünüzün blok başlığında aldığı bilgilere karşı kontrol edebileceği bir kanıtla birlikte gelir. Bu, güvenilir bir operatör yerine verilerinizin doğruluğunu Ethereum'un doğruladığı anlamına gelir.

## Hafif istemciler hangi yenilikleri mümkün kılar? {#what-innovations-do-light-clients-enable}

Hafif istemcilerin birincil faydası, daha fazla insanın göz ardı edilebilir donanım gereksinimleri ve üçüncü taraflara minimum bağımlılıkla Ethereum'a bağımsız olarak erişmesini sağlamaktır. Bu, kullanıcılar için iyidir çünkü kendi verilerini doğrulayabilirler ve ağ için iyidir çünkü zinciri doğrulayan düğümlerin sayısını ve çeşitliliğini artırır.

Çok küçük depolama, bellek ve işlem gücüne sahip cihazlarda Ethereum düğümlerini çalıştırabilme yeteneği, hafif istemciler tarafından kilidi açılan başlıca yenilik alanlarından biridir. Bugün Ethereum düğümleri çok fazla hesaplama kaynağı gerektirirken, hafif istemciler tarayıcılara gömülebilir, cep telefonlarında ve hatta akıllı saatler gibi daha küçük cihazlarda çalıştırılabilir. Bu, gömülü istemcilere sahip Ethereum cüzdanlarının bir cep telefonunda çalışabileceği anlamına gelir. Bu, mobil cüzdanların verileri için merkezi veri sağlayıcılarına güvenmek zorunda kalmayacakları için çok daha merkeziyetsiz olabileceği anlamına gelir.

Bunun bir uzantısı, **nesnelerin interneti (IoT)** cihazlarını etkinleştirmektir. Bir hafif istemci, senkronizasyon komiteleri tarafından sağlanan tüm güvenlik garantileriyle birlikte, bir Token bakiyesinin veya NFT'nin sahipliğini hızlı bir şekilde kanıtlamak ve bir IoT ağında bazı eylemleri tetiklemek için kullanılabilir. Kiralama hizmetinin NFT'sine sahip olduğunuzu hızlı bir şekilde doğrulamak için gömülü bir hafif istemciye sahip bir uygulama kullanan ve eğer öyleyse, binip gitmeniz için bir bisikletin kilidini açan bir [bisiklet kiralama hizmeti](https://youtu.be/ZHNrAXf3RDE?t=929) hayal edin!

Ethereum toplamaları da hafif istemcilerden faydalanacaktır. Toplamalar için büyük sorunlardan biri, fonların Ethereum Ana Ağı'ndan bir Rollup'a transfer edilmesini sağlayan köprüleri hedef alan hack'ler olmuştur. Bir güvenlik açığı, toplamaların bir kullanıcının köprüye para yatırdığını tespit etmek için kullandığı kâhinlerdir. Bir kâhin kötü veri beslerse, Rollup'ı köprüye bir para yatırma işlemi yapıldığını düşünmesi ve fonları yanlış bir şekilde serbest bırakması için kandırabilir. Rollup'a gömülü bir hafif istemci, bozuk kâhinlere karşı koruma sağlamak için kullanılabilir çünkü köprüye yatırılan para, herhangi bir Token serbest bırakılmadan önce Rollup tarafından doğrulanabilen bir kanıtla birlikte gelebilir. Aynı konsept diğer zincirler arası köprülere de uygulanabilir.

Hafif istemciler Ethereum cüzdanlarını yükseltmek için de kullanılabilir. Bir RPC sağlayıcısından sağlanan verilere güvenmek yerine, cüzdanınız gömülü bir hafif istemci kullanarak size sunulan verileri doğrudan doğrulayabilir. Bu, cüzdanınıza güvenlik katacaktır. RPC sağlayıcınız dürüst değilse ve size yanlış veriler sağladıysa, gömülü hafif istemci bunu size söyleyebilir!

## Hafif istemci geliştirmenin mevcut durumu nedir? {#current-state-of-development}

Yürütme, fikir birliği ve birleşik yürütme/fikir birliği hafif istemcileri de dahil olmak üzere geliştirilmekte olan birkaç hafif istemci vardır. Bu sayfayı yazdığımız sırada bildiğimiz hafif istemci uygulamaları şunlardır:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): TypeScript dilinde fikir birliği hafif istemcisi
- [Helios](https://github.com/a16z/helios): Rust dilinde birleşik yürütme ve fikir birliği hafif istemcisi
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): Go dilinde yürütme istemcisi için hafif mod (geliştirme aşamasında)
- [Nimbus](https://nimbus.guide/el-light-client.html): Nim dilinde fikir birliği hafif istemcisi

Bildiğimiz kadarıyla bunların hiçbiri henüz üretime hazır olarak değerlendirilmiyor.

Hafif istemcilerin Ethereum verilerine erişim yollarını iyileştirmek için de pek çok çalışma yapılıyor. Şu anda hafif istemciler, bir istemci/sunucu modeli kullanarak tam düğümlere yapılan RPC isteklerine güveniyor, ancak gelecekte veriler, eşler arası bir dedikodu protokolü kullanarak verileri hafif istemcilere sunabilen [Portal Ağı](https://www.ethportal.net/) gibi özel bir ağ kullanılarak daha merkeziyetsiz bir şekilde talep edilebilir.

[Verkle Ağaçları](/roadmap/verkle-trees/) ve [durumsuzluk](/roadmap/statelessness/) gibi diğer [yol haritası](/roadmap/) öğeleri, eninde sonunda hafif istemcilerin güvenlik garantilerini tam istemcilerinkine eşit hale getirecektir.

## Daha fazla bilgi {#further-reading}

- [Zsolt Felfodhi'nin Geth hafif istemcileri üzerine yazısı](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling'in hafif istemci ağları üzerine yazısı](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling'in Birleşme sonrası hafif istemciler üzerine yazısı](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: İşlevsel hafif istemcilere giden dolambaçlı yol](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)