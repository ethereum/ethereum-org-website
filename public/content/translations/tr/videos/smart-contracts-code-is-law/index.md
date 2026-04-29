---
title: "Kod kanun mudur? Akıllı sözleşmeler açıklandı"
description: "Ethereum ve DeFi üzerindeki akıllı sözleşmeler merceğinden 'kod kanundur' kavramını keşfetmek. Bu video, akıllı sözleşmelerin ne olduğunu, nasıl çalıştığını ve kodun nihai hakem olup olmaması gerektiğine dair felsefi soruyu ele alıyor."
lang: tr
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "akıllı sözleşmeler"
format: explainer
author: Finematics
breadcrumb: "Akıllı Sözleşmeler"
---

**Finematics** tarafından hazırlanan, Ethereum üzerindeki akıllı sözleşmeler merceğinden "kod kanundur" kavramını inceleyen; akıllı sözleşmelerin ne olduğunu, nasıl çalıştıklarını, geleneksel sözleşmelere göre avantajlarını ve neden merkeziyetsiz finansın yapı taşları olduklarını kapsayan bir açıklayıcı video.

*Bu transkript, Finematics tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=pWGLtjG-F5c) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş (0:00) {#introduction-000}

Teknolojinin kuralları uygulamak için kullanıldığı "kod kanundur" ifadesini hiç duydunuz mu? Bu durumda, avukatlara ihtiyacımız var mı? Ya da belki de kodun ne yapıp ne yapamayacağımızı dikte ettiği tamamen otomatikleştirilmiş bir dünyada yaşayabiliriz. Akıllı sözleşmelerin mevcut gelişimiyle, bu fütüristik senaryo düşündüğümüzden daha yakın olabilir.

Akıllı sözleşme, otomatik olarak ve deterministik bir şekilde yürütülebilen bir kod parçasıdır. Akıllı sözleşme kodu, onu güven gerektirmeyen ve güvenli hale getirmek için genellikle blokzincir üzerinde depolanır ve yürütülür. Akıllı sözleşmeler ayrıca fon alma, saklama ve gönderme, hatta diğer akıllı sözleşmeleri çağırma yeteneğine de sahiptir. Programlanmalarını oldukça kolaylaştıran "eğer-öyleyse" (if-then) mantığını izlerler.

Akıllı sözleşmeler, karar verme sürecinden insan faktörünü çıkarmayı amaçlar. İnsan faktörünün, standart geleneksel sözleşmelerin en çok hataya açık ve güvenilmez unsuru olduğu sıklıkla kanıtlanmıştır.

Bir otomat makinesi, bazı benzerlikler taşıdığı için akıllı sözleşmeye iyi bir analoji olarak sıklıkla karşımıza çıkar. Tipik bir otomat makinesi, girdiye dayalı olarak belirli eylemlere ve durum geçişlerine izin verecek şekilde programlanmıştır. Ayrıca tamamen deterministik bir şekilde çalışır. Örneğin, iki dolar değerinde bir kutu kola almak istiyorsanız ve sadece bir dolarınız varsa, kaç kez denerseniz deneyin içeceği alamazsınız. Öte yandan, üç dolar atarsanız, makine size bir kutu kola ve uygun para üstünü verecektir. Verilen para üstü bile, hangi madeni paraların mevcut olduğuna ve makinenin ilk olarak hangi madeni paralardan kurtulmak istediğine bağlı olarak önceden tanımlanmış ve programlanmış bir şekilde seçilir.

Bir akıllı sözleşme tamamen blokzincir üzerinde mevcut olan bilgilere dayanabilir; örneğin, "bana on adet A token'ı verirsen, sana on adet B token'ı veririm." Veya harici bir veri kaynağına, örneğin ETH veya S&P 500 fiyatına dayanabilir. İkinci örnek, gerçek dünya verilerine güvenmeleri gerektiğinden akıllı sözleşmeleri daha zor hale getirir. Gerekli güven, kâhin hizmetleri kullanılarak en aza indirilebilir, ancak kâhin hizmetlerine bile güvenilmesi gerekir. Belirli teşvikler kullanarak kâhinlerin doğru veri sağlama olasılığını artıran birkaç proje halihazırda mevcuttur. Chainlink, bu kategoride açıkça öne çıkan bir projedir.

#### Ethereum akıllı sözleşmeleri (3:09) {#ethereum-smart-contracts-309}

Ethereum, akıllı sözleşmeleri destekleyen ve bir programcının kendi akıllı sözleşmelerini uygulamasına olanak tanıyan bir blokzincirdir. Bir akıllı sözleşme, bu amaç için özel olarak oluşturulmuş Solidity adlı bir programlama dilinde yazılabilir. Ethereum'da, dağıtılan tüm akıllı sözleşmeler değişmezdir; bu, bir kez dağıtıldıktan sonra değiştirilemeyecekleri anlamına gelir ve bu da daha sonra tartışacağımız belirli riskler yaratır.

Ethereum üzerindeki akıllı sözleşmeler aynı zamanda merkeziyetsizdir, bu da sözleşmeyi kontrol eden tek bir makine olmadığı anlamına gelir. Aslında, Ethereum ağındaki tüm düğümler aynı sözleşmeyi tam olarak aynı durumla depolar. Ethereum şu anda en popüler genel amaçlı akıllı sözleşme platformu olsa da, tek platform değildir ve Cardano, Tezos, EOS ve Tron dahil olmak üzere birkaç rakibi vardır; ancak bunların hepsi aynı özellikleri paylaşmaz.

#### Akıllı sözleşme tanımı (4:23) {#smart-contract-definition-423}

"Akıllı sözleşme" terimi, 1990'ların başında tanınmış kriptograf Nick Szabo tarafından ortaya atılmıştır. İsim, en açıklayıcı isim olmasa da kalıcı oldu ve özellikle blokzincir endüstrisinde yaygın olarak kullanılıyor. Akıllı sözleşmelerin faydalarını görmek için, varsayımsal bir akıllı sözleşmeyi geleneksel alandaki eşdeğeriyle karşılaştıralım.

#### Akıllı sözleşme örneği (4:46) {#smart-contract-example-446}

Diyelim ki şu sözleşmeyi yazmak istiyoruz: Eğer Alice X sayıda A token'ı gönderirse ve Bob aynı sayıda B token'ı gönderirse, token'lar takas edilecektir; Alice Bob'un token'larını alacak ve Bob da Alice'in token'larını alacaktır.

Akıllı sözleşmelerin olmadığı bir dünyada, Alice'in Bob'a ve Bob'un Alice'e güvenmek zorunda kalmadan bunu başarmanın bir yolu, üçüncü bir tarafla bir emanet sözleşmesi oluşturmak olacaktır. Üçüncü taraf, Alice'ten A token'larını toplayacak, Bob'dan aynı sayıda B token'ını bekleyecek ve Alice ile Bob'a ilgili takas edilmiş token'ları gönderecektir.

#### Akıllı sözleşme sorunları (5:45) {#smart-contract-problems-545}

Bu yaklaşım, Alice ve Bob'un karşılaşabileceği birkaç sorunu şimdiden göstermektedir:

- **Aracılara güvenmek** — üçüncü tarafın Alice ve Bob'dan fonları aldıktan sonra token'larla kaçmayacağının bir garantisi yoktur. Aracının itibarına ve potansiyel sigortaya güvenmek zorundayız.
- **Deterministik olmayan sonuçlar** — bir şeyler ters giderse, potansiyel bir davanın çözüleceği yargı yetkisi de dahil olmak üzere birden fazla faktöre bağlı olarak farklı çıktılara sahip olabilir.

Öte yandan, bir akıllı sözleşme tamamen otomatik ve deterministik bir şekilde çalışarak, her iki tarafın da token yatırma konusundaki başlangıç kriterlerini karşıladıklarında fon almalarını sağlar. Akıllı sözleşmeler ayrıca fonları kendi içlerinde tutabilirler ki bu geleneksel dünyada başarılması mümkün olmayan bir şeydir.

#### Hız (6:47) {#speed-647}

Aracıya bağlı olarak, Alice ve Bob token geçişini tamamlamak için birkaç gün veya hafta bile beklemek zorunda kalabilirler. Ya pazar günü token takas etmek isterlerse ve aracı çalışmıyorsa? Akıllı sözleşmelerle bu tür sorunlar ortadan kalkar ve sözleşme, başlangıç kriterleri karşılandıktan saniyeler sonra yerine getirilebilir.

#### Maliyet (7:16) {#cost-716}

Geleneksel sözleşmeler sadece kâr etmesi gereken aracı nedeniyle pahalı değildir; sözleşmeyle ilgili herhangi bir sorun olması durumunda tahkim ve icra gibi şeyler için gizli maliyetlerin ortaya çıkması gibi büyük bir risk de vardır.

Yeniden kullanılabilirlik bir diğer avantajdır: Alice ve Bob'un token'larını takas etmekten sorumlu olan aynı akıllı sözleşme, token takas etmek isteyen herkes tarafından kullanılabilir. Geleneksel dünyada, hepsinin ayrı sözleşmeler imzalaması ve aracıya ilgili ücretleri ödemesi gerekirdi.

#### Dolandırıcılık (7:58) {#fraud-758}

Dolandırıcılık, bu kez aracının kendisi için bir başka gizli maliyettir. Aracı, bir takas başlatmadan önce hem Alice'in hem de Bob'un token'larının meşru olduğundan emin olmak zorundadır. Geleneksel finansta dolandırıcılık çok yaygındır ve çoğu şirketin sadece dolandırıcılığı önlemek üzerine çalışan devasa ekipleri vardır. Akıllı sözleşmelerle, token'lar blokzincir üzerinde doğrulanabilir ve dijital imzalarla, hem Alice'in hem de Bob'un token'larını harcamaya uygun olup olmadığı anında anlaşılır.

#### Kullanım durumları (8:42) {#use-cases-842}

Akıllı sözleşmelerin ödemelerden ve merkeziyetsiz finanstan tedarik zincirine ve kitle fonlamasına kadar uzanan, giderek artan sayıda kullanım durumu vardır. Akıllı sözleşmeler aynı zamanda merkeziyetsiz uygulamalar (dapp) için temel yapı taşlarıdır.

#### DeFi (9:07) {#defi-907}

Merkeziyetsiz finans (DeFi), büyük ölçüde akıllı sözleşmelere dayanan yeni endüstrilerden biridir. Bu alanda halihazırda inşa edilmiş olan bazı şeyler şunlardır:

- **Merkeziyetsiz sabitcoin'ler** — akıllı sözleşmelerin ve belirli teşviklerin akıllıca kullanımıyla, gerçek dünyada dolar depolamak zorunda kalmadan ABD dolarına sabitlenmiş bir sabitcoin yaratabiliriz. MakerDAO, bunu mümkün kılan projelerden biridir.
- **Otomatik likidite sağlama** — bir dizi akıllı sözleşme, kullanıcıların tamamen izinsiz ve merkeziyetsiz bir şekilde likidite sağlamasına ve token takas etmesine olanak tanıyabilir. Uniswap ve Kyber Network bu tür protokollere iyi örneklerdir.

#### Kitle fonlaması ve tedarik zincirleri (10:05) {#crowdfunding-and-supply-chains-1005}

Bir başka kullanım durumu, OriginTrail gibi protokollerin devreye girdiği tedarik zincirlerine daha fazla şeffaflık sağlamaktır. Kitle fonlaması söz konusu olduğunda, belirli hedeflere ulaşılır ulaşılmaz ve topluluk tarafından doğrulanır doğrulanmaz fonların kilidini açan bir sözleşme hayal edebilirsiniz.

#### Geleceğin akıllı sözleşmeleri (10:29) {#future-smart-contracts-1029}

Ya akıllı sözleşmeler araç paylaşımı, daire kiralama ve çok daha fazlası gibi şeyleri kolaylaştırabilseydi? Peki ya hayır kurumları? Herhangi bir aracı olmadan, parayı doğrudan en çok ihtiyacı olan kişilere gönderecek tamamen otomatik bir fon hayal edebilirsiniz. Örneğin fon, belirli bir bölgenin kasırgadan etkilendiğini belirleyebilir ve fonları dünyanın o bölgesine yönlendirebilir. Şimdilik kulağa oldukça imkansız geliyor, ancak böyle bir şeyin gerçekleşmesi için gerekli tüm unsurlar şu anda inşa ediliyor.

Akıllı sözleşmelerin kullanım durumları neredeyse sonsuzdur, ancak tüm bunları başarmadan önce birkaç sorunun üstesinden gelmemiz gerekiyor:

- **Hatalar (Bugs)** — akıllı sözleşmeler söz konusu olduğunda ana risklerden biri, diğer tüm yazılımların da peşini bırakmayan bir şeydir. En iyi örnek, saldırganın akıllı sözleşmeden fonları boşaltabilmesi nedeniyle milyonlarca dolar değerinde Ether kaybıyla sonuçlanan DAO hack'idir. Bu, Ethereum'un sert çatallanma yaşamasına neden oldu ve Ethereum topluluğunda pek çok anlaşmazlık yarattı. DAO hack'inden bu yana, Ethereum topluluğu birçok ekstra güvenlik önlemi geliştirdi. Bugünlerde, popüler akıllı sözleşmelerin neredeyse tamamı, genellikle birden fazla ekip tarafından bir güvenlik denetiminden geçmektedir. Ayrıca, belirli sözleşmelerin her zaman beklenen şekilde davranacağını kanıtlamak için biçimsel doğrulama yöntemlerini kullanma eğilimi de vardır.
- **Protokol değişiklikleri** — bir akıllı sözleşmede hiçbir hata olmasa ve denetlenmiş olsa bile, platform düzeyindeki bir değişikliğin sorunlara yol açmayacağını yine de garanti edemeyiz. Protokolün kendisine yapılan bir yükseltme, belirli akıllı sözleşmelerin beklenenden farklı davranmaya başlamasına neden olabilir.
- **Gerçek dünya verileri** — kâhin hizmetleri, gerçek dünyadan blokzincire bilgi aktarmanın güvenilir bir yolunu sağlayabilir. Ancak bir daire veya araba kiraladığınızı ve kazara bir hasar verdiğinizi düşünün. Bir akıllı sözleşme, herhangi bir insan müdahalesi olmadan bunu nasıl bilebilir? Gerçek dünyada meydana gelen beklenmedik bir şeyin bir akıllı sözleşme tarafından nasıl görülebileceğini hayal etmenin zor olduğu birçok örnek vardır.

Yukarıdakilerin yanı sıra, düzenleme ve vergi ile ilgili riskler de vardır, ancak bunların hepsi eninde sonunda çözülebilir.

#### Avukatların yerini alabilir miyiz? (13:58) {#can-we-replace-lawyers-1358}

Peki avukatların yerini gerçekten kodla değiştirebilir miyiz? Tam olarak değil; en azından şu an için. Gelecekte, özellikle finansta giderek daha fazla sözleşme muhtemelen otomatikleştirilecektir. Ancak tamamen otomatikleştirilmiş bir dünyada bile avukatlar, koda dönüştürülebilecek değerli bilgiler sağlayabilirler. Ayrıca kripto endüstrisi etrafında avukatları bir süre daha çok meşgul edecek pek çok düzenleyici zorluk bulunmaktadır. Yine de, bir avukat olsaydım, gelecekte büyük bir rol oynayacakları için akıllı sözleşmeler ve kodlama hakkında bilgi edinmeye başlardım.

#### Özet (14:53) {#summary-1453}

Akıllı sözleşme artıları:

- Tamamen otomatik
- Deterministik sonuçlar
- Güven gerektirmeyen
- Hızlı, kesin ve güvenli
- Uygun maliyetli ve şeffaf

Akıllı sözleşme eksileri:

- Yazılım hataları
- Protokol değişiklikleri
- Düzenleyici ve vergisel belirsizlik

Akıllı sözleşmeler belirli riskler taşısa da, henüz çok başındayız ve mevcut sorunların çoğu çözülebilir niteliktedir.