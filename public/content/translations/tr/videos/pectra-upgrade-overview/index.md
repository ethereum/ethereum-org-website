---
title: "Pectra yükseltmesine neler dahil ediliyor?"
description: "Christine Kim, Ethereum'un Pectra yükseltmesi hakkında konuşuyor; yükseltmeye dahil edilen EIP'leri, protokolde neleri değiştirdiklerini ve kullanıcılar, geliştiriciler ve doğrulayıcılar için neden önemli olduklarını ele alıyor."
lang: tr
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "yol haritası"
  - "pectra"
  - "yükseltmeler"
format: presentation
author: Ethereum Foundation
breadcrumb: "Pectra'ya Genel Bakış"
---

**Christine Kim**'in Devcon SEA'de yaptığı, Ethereum'un Pectra yükseltmesine dahil edilen EIP'leri, protokolde neleri değiştirdiklerini, Ana Ağ etkinleştirmesinin ne zaman beklendiğini ve hangi EIP'lerin kapsamdan çıkarıldığını ele alan bir sunum.

*Bu döküm, Ethereum Vakfı tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=ufIDBCgdGwY) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş (0:00) {#introduction-000}

Pectra yükseltmesine girecek olan tüm EIP'ler hakkında konuşacağız. Başlamadan önce kısa bir yasal uyarı: Söyleyeceğim her şey tamamen bilgi amaçlıdır ve finansal veya yatırım tavsiyesi olarak yorumlanmamalıdır.

#### Pectra Ana Ağı ne zaman (0:23) {#when-is-pectra-mainnet-023}

Pectra'ya nelerin dahil edileceğine geçmeden önce, bana en çok sorulan soru "Pectra Ana Ağ'a ne zaman geçecek?" oluyor. Bu yüzden teknik konulara girebilmemiz için önce bunu aradan çıkaracağım.

Bu çok taslak niteliğinde bir zaman çizelgesi analizidir. İnsanlar bana Pectra'nın ne zaman gerçekleşeceğini sorduklarında, söylemek için çok erken diyorum — çünkü bu doğru. Pectra henüz gelişiminin çok erken aşamalarında. Spesifikasyonlar değişiyor ve Pectra'nın kapsamı henüz tam anlamıyla kesinleşmiş değil.

Bu süreç boyunca öğrenebileceğiniz şeylerden biri, yükseltmelerin nasıl geliştirildiği, nasıl test edildiği ve nihayetinde Ana Ağ'a nasıl ulaştığıdır. Başlangıçta geliştiriciler, bir yükseltmeye dahil edilecek birkaç EIP'ye karar verirler ve ardından bu EIP'leri geliştirici ağı (devnet) adı verilen, geliştirici odaklı özel test ağlarında uygularlar. Geliştiriciler Pectra için halihazırda birkaç geliştirici ağı başlattılar, bu nedenle bu EIP'ler şimdiden birkaç uygulama turundan geçti. Geliştiriciler düzeltmek istedikleri uç durumları ve hataları fark ettiler ve yeni geliştirici ağları başlatarak bu EIP'ler üzerinde yinelemeler yapıyorlar. Devnet 4 geçen ay, Ekim'de başlatıldı.

Bu genellikle olmaz, ancak geliştiriciler — özellikle bu konferansın tamamı ve dinleyiciler arasındaki herkes için — bu ay ilk halka açık Pectra test ağını başlattılar. Adı Mekong, böylece gidip Pectra'da yer alacak bazı EIP'lerle erkenden etkileşime girebilirsiniz. Devnet 4 spesifikasyonlarına dayanıyor, ancak lütfen bu spesifikasyonların değişmekte olduğunu unutmayın.

Geliştiricilerin Pectra devnet 5'e dahil etmek istedikleri EIP'lerde yapılacak spesifikasyon değişikliklerinin bir listesi var — BLS ön derleme yeniden fiyatlandırması ve devnet 4'te uygulanmamış ancak geliştiricilerin devnet 5 veya gelecekteki bir yükseltme için uygulamayı hedefledikleri yeni bir EIP gibi şeyler. Yani Pectra spesifikasyonları değişiyor. Spesifikasyonların gerçekten dondurulabilmesi için önümüzde daha birçok geliştirici ağı olduğunu öngörüyorum.

Pectra yükseltmesinin Ana Ağ'a ilerleyişinde gerçekten önemli olan diğer kısım, kapsamın kesinleşmiş olmasıdır — Pectra'ya girecek tüm EIP'lerin kararlaştırılmasıdır. Bir EIP var — aslında henüz tam bir EIP değil — ancak geliştiricilerin henüz resmi olarak Pectra'ya dahil etmedikleri blob kapasitesi artışıdır, ancak görünüşe göre bir tür blob kapasitesi artışını dahil etmeleri muhtemel çünkü yakın zamanda, bu parametrelerin yürütme katmanı ve mutabakat katmanında sabit kodlanmış olması yerine, blob gaz hedefini ve maksimum blob gazını mutabakat katmanı aracılığıyla dinamik olarak güncellemek için bir mekanizma sunan bir EIP'yi dahil ettiler.

Kapsam kesinleşmiş olduğunda, uyguladığınız yeni EIP'leri — Pectra yükseltmesinin tam kapsamını — test etmeye başlarsınız ve birkaç geliştirici ağında daha zorlu testlerden geçirirsiniz. Belki devnet 6 veya 7'ye kadar süreceğini öngörüyorum. Ve ardından Pectra spesifikasyonları dondurulup hazır olduğunda — geliştiricilerin geliştirici ağlarında bulabileceği tüm uç durumlar bulunduğunda — Pectra yükseltmesini halka açık Ethereum test ağlarında yayınlayacaklar. Şu anda iki tane var: Sepolia ve Holesky.

Tarihsel olarak geliştiriciler, halka açık test ağı yükseltmeleri arasında yaklaşık iki haftalık bir süre ayırmışlardır. Nadir durumlarda geliştiriciler bu zaman çizelgesini test ağları arasında sadece bir haftaya indirdiler, ancak Pectra'nın boyutu nedeniyle geliştiricilerin tam süreyi kullanmak isteyeceklerini tahmin ediyorum. Sepolia ve Holesky için kabaca bir ay ayırıyorum ve bundan sonra nihayet Ana Ağ etkinleştirmesine sahip olabilirsiniz.

Şu anda bildiğim tüm bilgiler ve geliştiricilerin Pectra üzerinde şimdiye kadar kaydettikleri ilerleme göz önüne alındığında, en iyi analizim ve tahminim Pectra Ana Ağının gerçekçi olarak önümüzdeki Nisan 2025'te gerçekleşeceği yönünde. Tekrar ediyorum, bu çok taslak niteliğinde çünkü pek çok şey değişebilir. Geliştirme haftadan haftaya gerçekleşiyor — geliştiriciler bu ACD çağrılarında bu EIP'de beklemedikleri bir hata veya Pectra'ya eklemek istedikleri bu yeni EIP hakkında konuşuyorlar.

#### Yürütme katmanı EIP'leri (6:23) {#execution-layer-eips-623}

Gelelim bu konuşmanın asıl konusuna — Pectra yükseltmesine neler dahil ediliyor. Pectra'ya giren on EIP var ve bunlardan dördü yürütme katmanına odaklanıyor.

**EIP-2537**, EVM'ye yeni bir ön derlemedir — BLS12-381 eğri işlemleri. Bu, akıllı sözleşme geliştiricilerinin çok uzun zamandır istedikleri yeni bir kriptografik imza şemasıdır. Bu EIP 2020'de oluşturuldu ve o zamanlar merkeziyetsiz uygulama (dapp) geliştiricileri bunu gerçekten istediklerini söylüyorlardı çünkü sıfır bilgi kriptografisine dayanan belirli dapp'lere daha güçlü gizlilik garantileri, potansiyel olarak artırılmış güvenlik ve ölçeklenebilirlik sağlayacaktı. BLS imzaları aynı zamanda doğrulayıcı onayları için mutabakat katmanında gerçekleşen toplamadır. Bu EIP uzun zamandır bekleniyordu. Endişelerden biri şu: Hala BLS ön derlemesini bekleyen uygulamalar var mı ve yayına girdiğinde bunu kullanacaklar mı? Ancak bu dinleyiciler arasındaysanız ve BLS ön derlemesinin nihayet geldiğini bilmiyorsanız — geliyor.

**EIP-2935** — geçmiş blok özetlerini durumdan sunma. Bu, yürütme katmanında geçmiş blokların kanıtlarının durumdan üretilebilmesini sağlayacak bir değişiklik sunar. Hafif istemci eşzamanlaması ve doğrudan EVM aracılığıyla önceki bir bloğun durumu hakkındaki verileri kullanmak isteyebilecek akıllı sözleşmeler için bazı kısa vadeli faydaları vardır — şu anda bunu gerçekten yapamazsınız. Ancak bu kısa vadeli faydalar, bu EIP'nin Pectra'ya dahil edilmesinin ana nedeni değildir. Birincil neden, Ethereum'un durum veri yapısındaki büyük revizyon olan Verkle için bir ön koşul olmasıdır. Geliştiriciler bu geçişin Pectra'dan hemen sonra gerçekleşeceğini düşünmüşlerdi, ancak Verkle Fusaka'ya girmeyecek. Bunu başka bir yükseltmeye ertelediler, ancak bu atlama taşı şimdiden listeden işaretlendi.

**EIP-7685** — genel amaçlı yürütme katmanı istekleri. Bu EIP aslında Ethereum'a yeni özellikler getirmiyor — Pectra'daki diğer EIP'leri desteklemek için bir EIP'dir. Pectra'da, yürütme katmanının mutabakat katmanına daha önce yapamadığı kadar çok mesajı — farklı türde mesajları — iletebileceği birkaç EIP var. Yürütme katmanındaki akıllı sözleşmeler, doğrulayıcı çekim işlemlerini, birleştirmelerini ve yatırma işlemlerini tetikleyebilecek. Bu yeni iletişim kanallarını ayrı ve benzersiz bir şekilde uygulamak yerine, bu EIP bu istekleri barındırmak için genelleştirilmiş bir yapı — genelleştirilmiş bir veri yolu — oluşturur. Özellikle geliştiriciler yürütme katmanı tarafından tetiklenebilen yeni istek türleri sunmak isterlerse, test edilmesi, istemciler arasında uygulanması ve standartlaştırılması daha kolay olacaktır.

**EIP-7702** — harici olarak sahip olunan hesaplar için kod ayarlama. Ethereum'a yeni bir işlem türü geliyor. Bu işlem türü, geçici olarak bir EOA'nın daha fazla esnekliğe sahip olmasını sağlayarak işlem toplu işleme, sponsorlu işlemler, koşullu işlemler ve devredilmiş güvenlik gibi özellikleri mümkün kılacak. "Bu, Ethereum'da hesap soyutlama vizyonunun hayata geçmesi mi?" diye düşünüyor olabilirsiniz. Hayır, değil — bu küçük bir adım. Ethereum'da gerçek yerel hesap soyutlamasına giden gerçek yol haritasının nasıl görünebileceğini görmek için erken bir adım. Geliştiricilerin bu ilk adımı nasıl atması gerektiği konusunda epeyce tartışma oldu ve bunun dahil edilmesi ve tasarımı etrafında çok fazla anlaşmazlık yaşandı — ancak dahil edildi.

#### Mutabakat katmanı EIP'leri (12:00) {#consensus-layer-eips-1200}

Altı tane daha var — bunlar mutabakat katmanı EIP'leridir.

**EIP-7742** — mutabakat katmanı ile yürütme katmanı arasındaki blob sayısını ayırma. Bu, Pectra'ya dahil edilen en son EIP'dir. Şu anda blob kapasitesi, tüm farklı istemcilerde yürütme katmanına ve mutabakat katmanına sabit kodlanmıştır. Bu sabit kodlamayı güncellemek bazılarının düşündüğü kadar kolay değildir. Blob kapasitesini mutabakat katmanı aracılığıyla dinamik olarak ayarlamak için bir mekanizma oluşturmak, gelecekte geliştiricilerin Ethereum'un blob kapasitesini kolayca değiştirebilmesini ve böyle bir yükseltmenin her iki katmanda da değişiklik gerektirmeyip yalnızca mutabakat katmanı değişiklikleri gerektirmesini sağlayacaktır.

**EIP-6110** — doğrulayıcı yatırma işlemlerini zincir içi sağlama. Birleşme gerçekleşti ve Ethereum bir Hisse Kanıtı (PoS) blokzinciri olarak daha olgun. Belirli güvenlik varsayımları artık esnetilebilir. Bu EIP, yatırma sözleşmesine her 32 ETH yatırdığınızda mutabakat katmanı tarafında gerçekleşen ek bir oylama turunu kaldırarak tüm yatırma doğrulamasının yürütme katmanında gerçekleşmesini sağlar. Bunun doğrulayıcı kullanıcı deneyimi (UX) için faydaları vardır — 32 ETH'nizi yatırdığınız zaman ile doğrulayıcının işaret zincirinde gerçekten etkinleştirildiğini gördüğünüz zaman arasındaki süreyi kısaltacaktır.

**EIP-7002** — yürütme katmanı tarafından tetiklenebilen çekim işlemleri. Bu, staking havuzları için çok iyidir. Şu anda, bir doğrulayıcıyı tamamen çekmek istiyorsanız, o doğrulayıcıyı çalıştıran düğüm operatörünün doğrulayıcıdan tamamen çıkış yapmak için çekim anahtarını kullanması gerekir. Bu EIP sayesinde, akıllı sözleşmeler bu tam çekim işlemlerini başlatabilecek. Bu, artık staking havuzlarından kaldırabileceğiniz bir güven varsayımıdır — Lido, Rocket Pool ve diğer akıllı sözleşme tabanlı staking havuzları gibi platformlar artık isterlerse doğrulayıcıların tam çekim işlemlerini tetikleyebilir.

**EIP-7251** — maksimum efektif bakiyeyi artırma. Bu gerçekten bir sorun. Geliştiriciler işaret zinciri hakkında düşünürken, doğrulayıcı setinin bu kadar hızlı büyümesini beklemiyorlardı — yaklaşık 1,2 veya 1,3 milyon doğrulayıcıdayız. Çok sayıda aktif doğrulayıcı var, ağ katmanında çok sayıda mesaj dolaşıyor ve bu çok fazla. Düğümleri zorluyor ve kontrol edilmezse Ethereum'un sağlığı için büyük bir sorun olur. EIP-7251, doğrulayıcıları ETH'lerini birleştirmeye ve 32 ETH'den daha yüksek bir maksimum efektif bakiyeye sahip olmaya teşvik etmek ve Ethereum'daki aktif doğrulayıcı sayısını azaltmak için tasarlanmıştır.

**EIP-7549** — komite endeksini onayın dışına taşıma. Bu, Ethereum üzerindeki ağ yükünü azaltmak ve düğüm bant genişliğinden tasarruf etmek için onayların toplanma şeklinin yeniden yapılandırılması ve yeniden düzenlenmesidir. Geliştiriciler bunu Pectra'ya dahil ederken, harika faydaları olan harika ve kolay bir değişiklik olduğunu düşündüler — ancak pratikte uygulamasının beklenenden çok daha zor olduğu ortaya çıktı.

#### Özet (17:19) {#summary-1719}

Pectra, karışık bir güncellemeler paketidir. Üç şey yapacak: birincisi, bir Hisse Kanıtı (PoS) blokzinciri olarak Ethereum'un kritik eksikliklerini gidermek — MaxEB'yi düşünün, bu kritik bir düzeltmedir çünkü doğrulayıcı seti boyutu kontrolsüz bir şekilde büyümeye devam edebilir. İkincisi, kullanıcı deneyimini iyileştirmek — yeni işlem türü, daha esnek tasarımlar, staking havuzları için daha güven gerektirmeyen tasarımlara yönelik bazı iyileştirmeler. Ve üçüncüsü, Ethereum'un veri kullanılabilirliği kapasitesini artırmak — bu resmi olarak Pectra'ya dahil edilmedi ancak muhtemel görünüyor.

#### Pectra'dan çıkarılan EIP'ler (18:02) {#eips-removed-from-pectra-1802}

İşte Pectra'dan çıkarılan tüm EIP'ler. Bir yükseltmeden bu kadar çok EIP'nin çıkarılması bir ilk sayılır.

**PeerDAS** — başlangıçta Pectra'da veri kullanılabilirliği kapasitesinde çok daha büyük bir artış olacaktı. PeerDAS, geliştiricilerin bir Ethereum düğümü çalıştırmanın bant genişliği tüketimini ve hesaplama gereksinimlerini büyük ölçüde etkilemeden Ethereum'un blob hedefini kat kat artırmasına olanak tanıyacaktı. Ancak hala araştırma ve geliştirme aşamasında.

**EOF** — EVM Nesne Formatı. Bir paket halindeki bu on bir kod değişikliği, Ethereum EVM'si için büyük bir güncellemedir. Hem PeerDAS hem de EOF başlangıçta gerçekten Pectra'ya dahil edilmişti ancak ayrı geliştirici ağlarında test ediliyordu. Geliştiriciler, Ana Ağ etkinleştirmesine hazır olmaları için çok daha fazla zamana ihtiyaç duyacaklarını düşündüler ve diğer Pectra EIP'lerini geciktirmek istemediler. Bu yüzden PeerDAS ve EOF'nin açıkça daha fazla zamana ihtiyacı olduğunu söylediler — onları başka bir yükseltmeye itecekler ve diğer Pectra EIP'lerini Ana Ağ'dan alıkoymayacaklar.

Bunlar şimdi Fusaka'ya taşındı. Verkle başlangıçta Fusaka için planlanmıştı ancak o zamandan beri daha da ertelendi. EOF ve PeerDAS şimdilik Fusaka'da. Geliştiricilerin Fusaka'ya dahil etmeyi yeniden değerlendirecekleri başka EIP'ler de var — SSZ geçişi, dahil etme listeleri, ihraç değişiklikleri, geçmiş sonlanması, ePBS ve hesap soyutlama yönü.

#### Soru-Cevap (22:02) {#qa-2202}

**Sunucu:** EOF ne zaman?

**Christine Kim:** Kelimenin tam anlamıyla az önce geliştiricilerin onu Fusaka'ya koymaya çalışacaklarını söyledim. Bunun muhtemel olduğunu düşünüyor muyum? Muhtemelen hayır. Fusaka'nın 2025'te gerçekleşeceğini düşünüyor muyum? Kesinlikle hayır. Pectra'yı hazırlamak için geçen süre göz önüne alındığında — Fusaka daha uzun olmasa da benzer bir zaman alacaktır.

**Sunucu:** Şu an ile Pectra etkinleştirmesi arasında blob hedefini artırmak için acil bir yol var mı?

**Christine Kim:** Hayır. Blob hedefi, yürütme katmanı ve mutabakat katmanında sabit kodlanmış bir parametredir. Blob kapasitesinin değişmesi için geliştiricilerin bir sert çatallanma yapması gerekir. Şu an ile Pectra arasında sert çatallanma olmadan blob kapasitesinin artmasının herhangi bir yolu olduğunu düşünmüyorum.

**Sunucu:** Teklif sadece blob sınırını mı yoksa blob hedefini de mi değiştirmek yönünde?

**Christine Kim:** Harika bir soru. En muhafazakar artış üçten dörde — sadece hedefi değiştirmek, maksimumu hiç değiştirmemek. Ancak katman 2 (L2) geliştiricilerinin istediği bu değil. Base ekibinin — Coinbase'in Base ekibinin — bir temsilcisi var ve daha agresif artışlar için çabalıyor. Artışın Ethereum'un merkeziyetsizliğini olumsuz etkilemeyeceğini öne süren veriler gösterdi. Sadece hedefi değiştirmeye yönelik muhafazakar bir teklif var ve ardından hem maksimumu hem de hedefi değiştirmeye yönelik daha iddialı bir teklif var — sekiz ve dört veya altı ve on iki gibi. Değişen dereceler var.

**Sunucu:** İnsanları yönetişime daha fazla dahil olmaya teşvik ettiniz. Topluluk nasıl daha fazla dahil olabilir?

**Christine Kim:** ETH Research ve ETH Magicians, belirli EIP'leri desteklemek ve desteğinizi göstermek için gerçekten harika iki tartışma forumudur. ACD çağrıları muhtemelen en yüksek sinyalli yerdir — tek yapmanız gereken GitHub'daki ACD çağrısı gündemine bir yorum bırakmak ve bunun hakkında konuşmak veya sunmak istediğiniz bir EIP olduğunu söylemektir. Çağrının moderatörü genellikle size zaman ayırma konusunda çok uyumludur. Yine de çok fazla zaman almayın — söyleyeceklerinizi belirtmek için belki beş dakika yeterlidir.