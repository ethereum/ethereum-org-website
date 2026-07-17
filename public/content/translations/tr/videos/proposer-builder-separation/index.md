---
title: "Ethereum protokolünün ötesinde: teklifçi-oluşturucu ayrımı"
description: "Ethereum'da blok oluşturma ve blok teklif etme rollerini ayıran bir tasarım deseni olan teklifçi-oluşturucu ayrımı (PBS) üzerine bir sunum."
lang: tr
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "PBS Açıklandı"
---

Bu sunum, Ethereum'un blok üretiminin basit bir modelden doğrulayıcıları, oluşturucuları, arayıcıları ve röleleri içeren karmaşık bir tedarik zincirine nasıl evrildiğini açıklamaktadır. Ethereum Vakfı'ndan Barnabé Monnot, teklifçi-oluşturucu ayrımının neden var olduğunu, MEV-Boost rölelerinin teklif ediciler ve oluşturucular arasındaki ilişkiye nasıl aracılık ettiğini ve güven bağımlılıklarını azaltmak, sansür direncini, MEV dağıtımını ve doğrulayıcı merkeziyetsizliğini iyileştirmek için protokol içi hangi çözümlerin araştırıldığını anlatıyor.

*Bu transkript, CBER Forum tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=u8XvkTrjITs) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### Giriş (0:00) {#introduction-000}

Benim adım Barnabé Monnot. Protokolün dışında neler olup bittiğinden ve özellikle teklifçi-oluşturucu ayrımı (PBS) kavramından ve bunun röleler ve birçok zincir dışı altyapı ile nasıl işletildiğinden biraz bahsedeceğim.

Protokolü belirli güçlere sahip soyut bir nesne olarak düşünmeyi seviyorum. Protokolün sahip olduğu güçlerden biri, belirli katılımcılara haklar verebilmesidir. Önceki konuşmada protokolün doğrulayıcıları mutabakat görevlerini yerine getirmeleri için yetkilendirdiğini gördük, ancak yaptıkları tek şey bu değil — aynı zamanda blokları işlemlerle doldurmamız gerekiyor. Buna yürütme görevleri diyoruz ve bu konuşmada odaklanmak istediğim şey de bu.

#### Doğrulayıcılar neden oluşturucuları kullanır (0:46) {#why-validators-use-builders-046}

İlginç olan şu ki, bu hakları ortaya çıkaran ve doğrulayıcılara veren protokol olmasına rağmen, pratikte gözlemlediğimiz şey birçok doğrulayıcının bu hakkı kendilerinin kullanmamayı seçmesidir. Bu hakkı kendi adlarına yerine getirmesi için başka birine vermeyi seçiyorlar. Ve bu "başka birini" Ethereum'da oluşturucular olarak biliyoruz.

Dolayısıyla gözlemlediğimiz şey, doğrulayıcıların bu mutabakat görevlerini kendileri yapmaya devam etmelerine rağmen, yürütme görevlerini oluşturuculara devretmeye karar vermeleridir. Bu aslında oldukça önemli bir pazar. Bugün blokların yaklaşık %90'ı harici oluşturucular tarafından oluşturuluyor ve bu durum Birleşme'den üç ay sonra, yaklaşık Aralık 2022'den beri böyle. Oluşturucudan doğrulayıcıya yapılan medyan ödeme blok başına yaklaşık 120 dolardır. Günlük olarak ödenen bir milyon dolar var ve her 12 saniyede bir bu pazarın bir teklif edici ile bir oluşturucu arasında bir tür anlaşmaya varma olasılığı var.

Bugün doğrulayıcıların neden oluşturucuları kullandığını, bu ilişkinin nereden geldiğini tartışmak istiyorum — bu arada MEV ve arayıcılar hakkında biraz bilgi vereceğim — sonra bu ilişkiye nasıl aracılık edildiğini anlatacağım ve bugün var olan röleler ile üzerinde düşündüğümüz protokol içi çözümlerden bahsedeceğim. Ayrıca biraz büyük resme bakmak istiyorum, çünkü bu resimleri görüp "oh bu çok korkutucu, peki ya merkeziyetsizlik?" diye düşünmek kolaydır. Bunların yapılan ödünleşimler olduğu, ancak bana göre doğru yönde yapıldığı hissini size vermek istiyorum.

#### Naif model ve MEV (3:04) {#the-naive-model-and-mev-304}

Doğrulayıcının bir lider seçimi sürecine göre seçildiği ve bellek havuzundan bir işlem listesi içeren bir blok oluşturmak zorunda olduğu naif bir blok üretimi modeli düşünebilirsiniz. En naif modelde, gerçekten sadece iki tarafınız vardır — bellek havuzunu dinleyen bir doğrulayıcı ve blok oluşturma sırası onlara geldiğinde, en çok ücret ödeyen işlemleri çıkarır ve genellikle çok karmaşık olmayan paketleme algoritmaları kullanarak bunları eklerler.

Son beş yılda oldukça çarpıcı bir şekilde gözlemlenen şey, bunun üreticiye çok fazla güç — özellikle de son bakış gücü — vermesidir. Kullanıcıların ne yapmak istediğini görürler, örneğin kullanıcının bir şeyi takas etmek istediğini görürler ve bu bilgiyi kendilerine kâr sağlamak için kullanabilirler.

En iyi durumda bu kâr, arbitraj gibi doğal piyasa işlevlerinden gelir. En kötü durumda ise, sandviç saldırılarında olduğu gibi doğrudan kullanıcının cebinden çıkabilir. Örneğin, bir kullanıcı Uniswap gibi bir piyasada Token B'ye karşı Token A için bir takas emri verir. Bu işlem, aynı zincir üzerinde dağıtılan başka bir piyasa ile bir fiyat dengesizliği yaratacaktır. Üretici, bekleyen işlemi görebilir ve farklı bir piyasada diğer yönde bir takas yapan kendi işlemini ekleyerek bu süreçte arbitrajı cebine indirebilir.

Bu gerçekten üreticiye çok fazla güç verir ve blok üreticisi olma konumunu son derece değerli kılar. Bu üretici ayrıcalığı, artık **maksimum çıkarılabilir değer (MEV)** olarak adlandırdığımız bir şeydir.

#### Arayıcıların rolü (5:43) {#the-role-of-searchers-543}

Pratikte, üreticiler değerin nerede olduğunu bilmeyebilir. Biraz deneyimsiz blok üreticileriniz olabilir — belirtildiği gibi, yeterli sermayeye sahip olduğu ve bir düğüm çalıştırabildiği sürece herkes doğrulayıcı olabilir. Pratikte, arbitrajın nasıl yapılacağını veya finansal piyasalar hakkında hiçbir şey bilmeyebilirim. İsteyeceğim şey, birinin bana bu fırsatların nerede olduğunu söylemesidir — blok üreticisi olarak yapılacak en iyi şeyin ne olduğunu bana söylemek için rekabet eden insanlardan oluşan bir pazar.

Fırsatları bulmada çok iyi olan bu varlıklara **arayıcılar** diyoruz. Blok üreticisine fırsatları sunarlar. Arayıcı, bir kullanıcının genel bellek havuzu, karanlık havuzlar veya özel kanallar aracılığıyla bir takas yaptığını gözlemleyebilir ve ardından doğrulayıcıya şunu iletebilir: "Bir takas gerçekleşiyor — bu takası bu arbitrajla birlikte atomik işlemlerden oluşan bir pakete koyar ve bu paketi dahil ederseniz, arbitrajdan para kazanabilirsiniz." Blok üreticisini ikna etmek için rekabet eden birçok arayıcınız olacaktır.

Bu model, arayıcı paketi atomik tutması konusunda üreticiye güvenirse pratikte iyi çalışır. Yakın zamanda Ethereum'da bir grup sandviçleyiciye 25 milyon dolara mal olan bir saldırı duymuş olabilirsiniz — temel neden, saldırganın paketlerin atomikliğini kırmayı başarması, içerikleri alması ve bunları yeniden düzenlemeye ve değiştirmeye çalışmasıydı. Bu, gerçekten yalnızca üreticinin bu atomikliği bozmayacağına güvenilebildiği sürece geçerli olan çok önemli bir özelliktir.

#### Neden oluşturuculara ihtiyacımız var (8:16) {#why-we-need-builders-816}

Bir üretici güvenilmezse ne yaparsınız? Ethereum'da Birleşme sonrasında, tanımadığımız solo staker'lar — ağın yaklaşık %6'sı — var. Arayıcılar bu blok teklif edicilere paket göndermek istemeyeceklerdir çünkü bu biraz fazla tehlikelidir.

Bu nedenle ulaşılan tasarım şudur: Arayıcıların, üreticinin bloğuna dahil edeceği paketleri iletmesi yerine, tüm bloğu sizin için biz yapacağız. Bu şekilde bloğu körü körüne imzalayabilirsiniz — içinde ne olduğunu bilmenize gerek yoktur, oluşturucunun size iyi bir blok verdiğine güvenirsiniz.

Artık daha da derin bir zinciriniz var: Bir uçta doğrulayıcı, diğer uçta kullanıcı ve arada zamanla daha da yoğunlaşmaya devam eden bu aracı zincirinin tamamı. Doğrulayıcı mutabakatı sağlarken oluşturucu yürütme kısmını yapar.

#### MEV-Boost röleleri nasıl çalışır (13:01) {#how-mev-boost-relays-work-1301}

Diyelim ki bir teklif edicisiniz ve bu pazara girmek istiyorsunuz. Bu blok üretim hizmeti klasik bir adil değişim problemidir — anlaşmaya varmaya çalışan ancak birbirine güvenmeyen iki taraf. Klasik literatür, güvenilir bir üçüncü taraf olmadan adil değişim yapamayacağınızı söyler.

Bugün güvenilir üçüncü taraf olarak kullandığımız şey **röle** dediğimiz şeydir — MEV-Boost rölesi. MEV-Boost, oluşturucular ve doğrulayıcılar arasındaki etkileşimlere aracılık eden protokolün adıdır. Röle, anlaşmanın her iki taraf için de şartlara uygun olmasını sağlamak üzere ortada yer alır.

Rölenin birkaç rolü vardır. İlk olarak, bir oluşturucunun yükünü doğrulaması gerekir — röle, oluşturucunun yaptığı bloğu açıkça görür ve geçerli olduğunu ve ağa teklif edilebileceğini kontrol edebilir. İyimser röle adı verilen bir varyasyon vardır; burada röle geçerliliği hemen kontrol etmez, ancak bloğun nihayetinde geçersiz olması ihtimaline karşı oluşturucudan teminat ister.

İkinci olarak, oluşturucular doğrulayıcı tarafından seçilen oluşturucu olmak için rekabet etmeye çalışarak teklifler verirler. Röle, teklifleri doğrulayıcıya göndererek bir teklif iletici görevi görür. Ardından son adımda, doğrulayıcı röleden gelen tekliflerden birini seçtiğinde — ve doğrulayıcı istediği kadar röleye bağlanabilir — blok içeriğinin ne olduğunu hala bilmeden bunu imzalar ve imzalanan teklifi röleye geri gönderir. Bu imzalı teklif verildiğinde, röle bloğu ağa yayınlayabilir.

Rölelerin ekonomisi karmaşıktır. Bazıları kamusal mallar gibi ücretsizdir. Diğerleri gelir modelleri geliştirmiştir — örneğin Ultrasound rölesi, en iyi teklif ile en iyi ikinci teklif arasındaki farkı gelir olarak aldıkları bir "teklif ayarlamasına" sahiptir.

#### Güven ve röle (17:01) {#trust-and-the-relay-1701}

Röle, sistemdeki güvenilir üçüncü taraftır. Diyelim ki bir röle geçersiz bir blok sunuyor — imzalı olduğu için insanlar bunu hemen görecek ve o röleyle bağlantılarını çok hızlı bir şekilde keseceklerdir. Hatta bir tür hata kanıtı dedikodusu bile yayabilirsiniz. Beş blok içinde, eğer röle iyi performans göstermezse, insanlar ona güvenmeyi bırakacak ve sadece bağlantıyı kesecektir.

Yani güvene dayanır, ancak bir şekilde hızlıca değiştirilebileceği varsayımıyla. Röleler doğrulayıcı değildir — mutlaka stake'leri olması gerekmez ve Ethereum ile hiçbir ilgileri olmak zorunda değildir. Bugün tanıdığımız ve sevdiğimiz insanlar olabilirler, ancak yarın herhangi biri olabilirler.

#### PBS'yi protokole yerleştirmek (20:01) {#enshrining-pbs-in-the-protocol-2001}

Rölenin güvenilir üçüncü taraf statüsünü ortadan kaldırmaya çalışıyoruz. Ethereum'da sevdiğimiz güvenilir bir üçüncü tarafımız var — ve bu Ethereum'un kendisidir. Temel olarak rölenin rolünü yerleştirmeye ve ona olan bağımlılığı isteğe bağlı hale getirmeye çalışan protokol içi çözümler tasarlayabilirsiniz.

Şu anda Ethereum protokolü, doğrulayıcıların ne yaptığının bir kısmını görüyor ancak oluşturucular ağına tamamen kör. Ethereum protokolünün teklif edici ve oluşturucu arasındaki etkileşimde güvenilir üçüncü taraf olmasını sağlamaya çalışıyoruz — bu anlamda artık röleye güvenmemize gerek kalmıyor.

#### Oluşturucuları kısıtlamak, merkeziyetsizliği artırmak (22:05) {#constraining-builders-amplifying-decentralization-2205}

Büyük resim önemlidir. Her katmanda farklı oyunlar oynanıyor ve farklı oyuncular birbirinden para alıyor gibi görünüyor — bu geleneksel finansın ta kendisi mi? Bu ödünleşimlerin kötü bir yerden gelmediğini savunmak istiyorum. Bunları ölçeklendirmeye ve daha kullanışlı hale getirmeye yardımcı olduğunu düşündüğümüz bu sistemlerin özelliklerine eğilmeye çalışıyorlar.

Vitalik, bir Blokzincir'in sunabileceği hizmetlerin temel bir asimetrisinden bahsetti. Mutabakat, kontrolü sağlayan çok büyük ve merkeziyetsiz bir insan grubunu gerektirir. Ancak bazı hizmetler gerçekten bir kişinin işi iyi yapmasını ve diğer herkesin işin iyi yapıldığını doğrulamasını gerektirir. Bir blok oluşturmak için sadece bir oluşturucuya ihtiyacımız var ve ardından herkes bunun geçerli olduğunu doğrulayabilir.

Bugün açıkça üç baskın oluşturucu var: Beaver Build, Titan ve rsync Builder. Bu iyi bir durum mu? Pek sayılmaz — daha iyisini yapabiliriz. Ancak doğrulayıcılar kadar çok oluşturucumuz olacağını hayal etmek gerçekçi mi? Muhtemelen hayır.

Gerçekte istediğimiz şey, dürüst çoğunluk varsayımları gerektirmeyen görevleri yerine getirebilecek yüksek güçlü tarafların ortada olduğu gerçeğini kısıtlayan ve bundan yararlanan bu ince doğrulayıcı katmanıdır.

Oluşturucuları kısıtlamak için bazı fikirler:

- **Dahil etme listeleri (Inclusion lists)** — doğrulayıcının oluşturucuya "bu işlemleri bloğunuza dahil etmelisiniz" dediği yer
- **Kısmi blok oluşturma** — oluşturucunun tüm alan üzerinde tekel sahibi olmaması için tam bloğu parçalara ayırmak
- **Üçüncü taraf bağımlılıklarını azaltmak** — röle rolünü protokole yerleştirmek

Doğrulayıcı merkeziyetsizliğini artırmak için:

- **Onaylayıcı-teklif edici ayrımı** — doğrulayıcıyı varsayılan olarak blok üreticisi yapmak yerine, blok üreticisi olmak için farklı bir insan grubu seçmek ve rolleri ayırmak
- **Geliştirilmiş staking mekanizmaları** — Ethereum'daki staking bugün biraz ilkeldir ve geliştirilebilir

#### Sorular ve kapanış (27:03) {#questions-and-closing-2703}

İzleyicilerden bir soru: Geleneksel finans dünyasında uzlaşma süresi iki günden bir güne indiriliyor. Uzlaşma süresini 12 saniyeden daha kısa bir aralığa indirmek, önden koşma sorunlarının bazılarıyla başa çıkabilir mi?

İnsanlar bunun hakkında konuşuyor — buna **ön onaylar (pre-confirmations)** diyorlar. Fikir şu ki, işleminizi gönderiyorsunuz ve birisi size "içeridesiniz, bu fiyattan, bu durum üzerinde" diyor. Sorun şu ki, protokolün çalıştığından daha hızlı uzlaşamazsınız. 12 dakikadan daha hızlı kesinlik uzlaşması elde edemezsiniz. Blok süresinden daha hızlı hareket edemezsiniz.

Blok süresini kısaltmak zordur çünkü doğrulayıcı katmanını olabildiğince merkeziyetsiz tutmak istiyoruz ve bunu kısaltmak sadece donanım gereksinimlerini artırır.