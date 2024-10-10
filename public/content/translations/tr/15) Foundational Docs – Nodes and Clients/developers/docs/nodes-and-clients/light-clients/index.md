---
title: Hafif istemciler
description: Ethereum hafif istemcilerine giriş.
lang: tr
---

Tam düğüm çalıştırmak Ethereum ile etkileşime girmenin en güven gerektirmeyen, gizli, merkeziyetsiz ve sansüre dirençli yoludur. Tam bir düğüm ile blok zincirin kendinize ait bir kopyasını tutarsınız ve bu şekilde anında sorgu yapabilir ve Ethereum'un eşler arası ağına direkt erişim alabilirsiniz. Ancak, tam düğüm çalıştırmak yüksek miktarda bellek, saklama alanı ve CPU gerektirir. Bu da demektir ki kendi düğümlerini çalıştırmak herkes için uygulanabilir değildir. Ethereum yol haritasında, durumsuzluk da dahil olmak üzere bazı çözümler vardır fakat bu çözümlerin uygulanması birkaç yıl alacaktır. Kısa vadede çözüm, düğümlerin düşük donanım gereksinimleriyle çalışmasına izin veren büyük performans iyileştirmeleri için tam bir düğüm çalıştırmanın bazı faydalarından ödün vermektir. Bu seçimi mümkün kılan düğümler hafif düğümlerdir.

## Hafif istemci nedir? {#what-is-a-light-client}

Hafif düğüm, açık istemci yazılımını çalıştıran bir düğümdür. Blok zincirdeki tüm yerel verilerin kopyasını tutmak ve bağımsız bir şekilde hepsini doğrulamak yerine sadece gerekli verileri bazı sağlayıcılardan isterler. Sağlayıcı, tam bir düğümden veya merkezi bir RPC sunucusundan direkt bir bağlantı olabilir. Veriler daha sonra hafif düğüm tarafından doğrulanarak zincirin başına ayak uydurmasına izin verilir. Hafif düğümler yalnızca blok başlıklarını işler, sadece ara sıra gerçek blok içeriğini de indirir. Düğümlerin hafifliği, çalıştırdığı hafif ve tam istemci yazılımı kombinasyonuna bağlı olarak değişiklik gösterebilir. Örneğin, hem hafif yürütüm istemcisi hem de hafif fikir birliği istemcisi çalıştıran bir düğüm en açık yapılandırmaya sahip olabilir. Ayrıca birçok düğümün, tam yürütüm istemcileriyle birlikte hafif fikir birliği istemcilerini çalıştırmayı seçmesi veya bunun tam tersi de olasıdır.

## Hafif istemciler nasıl çalışır? {#how-do-light-clients-work}

Ethereum'un hisse ispatı temelli mutabakat mekanizması kullanmaya başlamasıyla beraber özellikle hafif istemcileri desteklemek için yeni bir altyapı tanıtıldı. Çalışma şekli ise; **sekronizasyon kurulu** olarak hareket etmeleri için her 1,1 günde bir 512 doğrulayıcıdan oluşan bir alt kümeyi rastgele seçmektir. Sekronizasyon kurulu son blokların başlıklarını imzalar. Her blok başlığı, senkronizasyon kurulundaki doğrulayıcıların toplu imzasını ve hangi doğrulayıcıların imzalayıp imzalamadığını gösteren bir "bit alanı" içerir. Her başlık ayrıca bir sonraki blokun imzalanmasına katılması beklenen doğrulayıcıların bir listesini de içerir. Yani hafif bir istemcinin, senkronizasyon kurulunun aldıkları verileri imzaladığını hızlı bir şekilde görebileceği ve ayrıca senkronizasyon kurulunun doğru olup olmadığını; kendilerine beklemeleri söylenenden önceki aldıkları blok ile karşılaştırarak kontrol edebileceği anlamına gelir. Bu şekilde hafif istemci, blokun kendisini indirmeden sadece özet bilgilerini içeren blok başlıklarını indirerek Ethereum bloku hakkındaki bilgilerini güncellemeye devam edebilir.

Yürütüm katmanında ise hafif düğümler için bir tane bile özellik yoktur. Hafif bir yürütüm istemcisinin kapsamı, tüm EVM ve ağ kurma fonsiyonuna sahip tam bir düğümün "hafif modu"nu kapsayacak kadar değişkenlik gösterebilir, ancak alakalı veriyi yüklemeden ve sadece blok başlarını onaylayabilecek şekilde. Yahut, Ethereum ile etkileşime girmek için bir RPC sağlayıcısına gelen taleplere fazlasıyla bağlı olan sadeleştirilmiş bir istemci olabilir.

## Hafif istemciler neden önemlidir? {#why-are-light-clients-important}

Kullanıcıların kör bir şekilde veri sağlayıcılarına güvenmesindense tüm düğüme kıyasla sadece küçük bir hesaplama kaynağı kullanarak gelen veriyi doğrulamalarını sağladığı için hafif istemciler önemlidir. Hafif istemcilerin aldığı veri, rastgele seçilmiş bir küme olan 512 Ethereum doğrulayıcısının en az 2/3'ü tarafından imzalandığı bilindiği için blok başlıklarına göre kontrol edilebilir. Bu, verilerin doğru olduğuna dair çok sağlam bir kanıttır.

Hafif istemci, çok az miktarda işlem gücü, bellek ve depolama kullanır; böylece bir cep telefonunda, bir uygulamanın içinde ya da bir tarayıcının parçası olarak çalıştırılabilir. Hafif istemciler, üçüncü taraf bir sağlayıcıya güvenmek kadar Ethereum'a güveni en aza indirilmiş erişimi sorunsuz hale getirmenin bir yoludur.

Basit bir örnek ele alalım. Hesap bakiyenizi kontrol etmek istediğinizi hayal edin. Bunu yapmak için bir Ethereum düğümüne istekte bulunmanız gerekir. Bu düğüm, bakiyeniz için Ethereum durumunun yerel kopyasını kontrol edecek ve bunu size verecektir. Eğer bir düğüme doğrudan erişiminiz yoksa bu verileri hizmet olarak sunan merkezi operatörler vardır. Onlara bir istek gönderebilirsiniz, düğümlerini kontrol ederler ve sonucu size geri gönderirler. Buradaki sorun, sağlayıcının size doğru bilgileri vereceğine güvenmeniz gerekmesidir. Bilgileri eğer kendiniz doğrulayamıyorsanız, hiçbir zaman o bilgilerin doğru olup olmadığından emin olamazsınız.

Hafif istemci işte bu sorunu giderir. Hâlâ bazı harici sağlayıcılardan veri talep edebilirsiniz, ancak verileri aldığınızda; hafif düğümünüzün blok başlığından aldığı bilgilerle kontrol edebileceğine dair bir kanıtla birlikte gelir. Yani Ethereum'un güvenilir bir operatör yerine verilerinizin doğruluğunu doğruladığı anlamına gelir.

## Hafif istemciler hangi yenilikleri mümkün kılar? {#what-innovations-do-light-clients-enable}

Hafif istemcinin birincil faydası; önemsiz bir donanım gereksinimi ile Ethereum'a daha fazla insanın bağımsız olarak erişimini sağlaması ve üçüncü taraflara daha az bel bağlaması. Bu kullanıcılar için iyidir çünkü kendi verilerini onayalayabilir. Aynı zamanda bu, düğüm sayısını arttırdığı ve ağı onaylayan düğüm çeşitliliğini arttırması nedenleriyle ağ için de iyidir.

Ethereum düğümlerini çok küçük depolama, bellek ve işlem gücü olan cihazlarda yürütebilmek hafif istemcilerle açılan ana yenlilk alanlarından biridir. Günümüzde Ethereum düğümleri çok fazla işlem kaynağı gerektirirken; hafif istemciler tarayıcılara gömülebilir, cep telefonlarında ya da belki de akıllı saatler gibi daha küçük cihazlarda çalıştırılabilir. Bu da gömülü istemcilere sahip Ethereum cüzdanlarının bir cep telefonunda çalışabileceği anlamına gelir. Yani mobil cüzdanlar merkezi veri sağlayıcılarına veri için ihtiyaç duymaları gerekmediğinden daha merkeziyetsiz hale gelebilirler.

Bunun bir uzantısı ise **nesnelerin interneti (IoT)** cihazlarını etkinleştirmektir. Bir hafif istemci, senkronizasyon kurullarının sağladığı tüm güvenlik garantileriyle birlikte, IoT ağında bazı eylemleri tetikleyerek, bazı token bakiyelerinin veya değiştirilemez token'ların (NFT) sahipliğini hızlıca kanıtlamak için kullanılabilir. Kiralama servisinin değiştirilemez NFT'sine sahip olup olmadığınızı hızlı bir şekilde doğrulayacak ve sahipseniz bisikleti kullanmanız için bir tanesinin kilidini açacak gömülü hafif istemcili bir uygulama kullanan bir [bisiklet kiralama servisi](https://youtu.be/ZHNrAXf3RDE?t=929) düşünün.

Ethereum toplamaları da hafif istemcilerden yararlanacaktır. Toplamaların en büyük sorunlarından biri, Ethereum Ana Ağı'ndan toplamaya fon aktarımı sağlayan köprüleri hedef alan saldırılardır. Toplamaların bir kullanıcının köprüye para yatırıp yatırmadığını tespit etmek için kullandığı kahinler bir zayıflıktır. Eğer bir kahin kötü veri aktarırsa, toplamayı yanıltıp köprüye fon aktarıldığını düşündürerek fonların yanlış bir şekilde serbest bırakılmasına sebep olabilir. Toplamada gömülü bir hafif istemci, kötü niyetli kahinlere karşı koruma sağlayabilir çünkü köprüye gidecek olan fonlar, herhangi bir token'ı serbest bırakmadan önce toplama tarafından doğrulanabilecek bir kanıt ile birlikte gelebilir. Aynı konsept diğer zincirler arası köprülere de uygulanabilir.

Hafif istemciler ayrıca Ethereum cüzdanlarına yapılacak yükseltmelerde de kullanılabilir. RPC sağlayıcısı tarafından temin edilen veri yerine, cüzdanınız size sunulan veriyi direkt olarak gömülü bir hafif istemci kullanarak onaylayabilir. Bu cüzdanınızı daha güvenli hale getirir. Eğer RPC sağlayıcınız bir sahtekardıysa ve size yanlış veri sağladıysa, gömülü hafif istemci bunu size söyleyebilir!

## Hafif istemci geliştirilmesinde mevcut durum nedir? {#current-state-of-development}

Bu geliştirme süreci içinde birkaç hafif istemci vardır, bunlar yürütme, mutabakat ve ikisinin birleşiminden oluşan yürütüm/fikir birliği istemcilerini kapsar. Bunlar, bu sayfayı yazarken güncel olarak bildiğimiz hafif istemci uygulamalarıdır:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): Typescript'te hafif fikir birliği istemcisi
- [Helios](https://github.com/a16z/helios): Rust'ta hafif yürütüm ve fikir birliği istemcisi birleşimi
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/light): Go'da (hâlâ geliştirme sürecinde) yürütüm istemcisi için hafif mod
- [Nimbus](https://nimbus.guide/el-light-client.html): Nim'de bulunan hafif fikir birliği istemcisi

Bildiğimiz kadarıyla bunların hiçbiri henüz üretime hazır değil.

Ayrıca hafif istemcilerin Ethereum verisine erişebilme yollarını geliştirmek için yapılan oldukça fazla iş var. Şu anda, hafif istemciler tam düğümlere bir istemci/sunucu modeli kullanılarak gönderilen RPC taleplerine dayanmakta, ancak gelecekte veri bu amaca yönelik bir ağ ["Portal Network"](https://www.ethportal.net/) kullanılarak daha merkeziyetsiz bir yöntemle talep edilebilir ve bu da hafif istemcilere veriyi eşler arası bir dedikodu protokolü kullanarak sunabilir.

[Yol haritasında bulunan](/roadmap/) [Verkle Ağaçları](/roadmap/verkle-trees/) ve [durumsuzluk](/roadmap/statelessness/) gibi bazı öğeler ise eninde sonunda hafif istemcilerin güvenlik garantisini tam düğümlere verilen güvenlik garantisiyle eşitleyecek.

## Daha fazla bilgi {#further-reading}

- [Geth hafif istemcileri üzerine, Zsolt Felfodhi](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Hafif istemci ağları kurma üzerine, Etan Kissling](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Birleşim'den sonraki hafif istemciler üzerine, Etan Kissling](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Fonksiyonel hafif istemcilere giden dönemeçli yol](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
