---
title: "Blokzincir — ETH.BUILD"
description: "Blokzincir madenciliğinin nasıl çalıştığına, blokların birbirine nasıl zincirlendiğine, iş kanıtının blokzincirleri nasıl güvence altına aldığına ve birisi verileri kurcalamaya çalıştığında ne olduğuna dair bir gösterim."
lang: tr
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "madencilik"
  - "blokzincir"
format: tutorial
author: Austin Griffith
breadcrumb: "Blokzincir (ETH.BUILD)"
---

**Austin Griffith** tarafından hazırlanan ve ETH.BUILD görsel programlama aracını kullanarak blokzincir madenciliğinin nasıl çalıştığını gösteren bir eğitim. Austin; İş Kanıtı (PoW) mutabakatı, blok zincirleme, madencilik zorluğu, blok ödülleri ve zincir değişmezliği konularını ele alıyor.

*Bu transkript, Austin Griffith tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Koordinasyon sorunu (0:00) {#the-problem-of-coordination-000}

Günaydın, mutlu Papyon Cumaları! Bu ETH.BUILD, blokzincire odaklanıyor — gerçekten harika bir şey. Bu palyaço teknesindeyiz, bunun için Bitcoin papyonumuzu taktık. Başlıyoruz.

Müfredatta şu ana kadar anahtar çiftlerini, hash'leri ve defterleri hızlıca inceledik. Merkezi olmayan, dağıtık bir ağ üzerinde karşılıklı değer işlemleri yapmak istediğimizde koordinasyon sorunlarıyla karşılaştığımızı gördük. Farklı taraflar arasında mutabakat sağlayamama sorunu yaşıyoruz çünkü hepsi farklı işlemleri farklı zamanlarda alıyor. Bunu çözmenin birçok farklı yolu var, ancak İş Kanıtı (PoW) ortaya çıkana kadar hiçbiri yeterince iyi değildi.

Bizans generallerini bir yan görev olarak ele aldık ve orada öğrendiğimiz şey, generallerin güvensiz bir ağ üzerinden mesaj gönderdiklerinde bir orduları olduğunu kanıtlamaları gerektiğiydi. Böylece alıcı taraf, o kişinin gerçekten saldıracak bir ordusu olan bir general olduğunu anlayabilir ve koordinasyon sağlayabilirlerdi.

#### Bloklar ve nonce (1:04) {#blocks-and-the-nonce-104}

Yani bu defterle, ağdan gelen işlemleri içeri pompalıyoruz. Her bir kullanıcının kendi işini kanıtlaması yerine, iş kanıtını bir işlem bloğuna soyutlayacağız ve bir madencinin bunun üzerinde çalışmasına izin vereceğiz.

İşlemleri tutan bir blok getiriyoruz — ağ üzerinden ne geliyorsa bu bloğa yüklüyoruz. Bu bloğun yapısına bakarsak, aynı zamanda bir nonce'a sahip olduğunu görürüz. Bu nonce, hash'i ayarlamamıza olanak tanır. Tüm bu bloğu alıp dizeye dönüştürürsek ve hashlersek, bir hash elde ederiz. İşlemler değiştikçe bu hash de değişir, ancak nonce'u değiştirdiğimizde de hash değişir.

Burada biraz iş yapıyoruz — rastgele bir işlem kümemiz var ve hash'in başında bir sıfır olana kadar nonce'u değiştiriyoruz. Bizans generalleri hakkındaki yan görevi izlediyseniz, bu baştaki sıfırı kanıtlanacak rastgele bir iş miktarı olarak seçmiştik. Yani nonce her sayıyı tek tek dener — bir, iki, üç, dört — ve baştaki sıfırı elde ettiğimizde şöyle deriz: bu geçerli bir blok.

#### İş Kanıtı (PoW) iş başında (3:00) {#proof-of-work-in-action-300}

Eğer madenciliği yapılmış bir bloğu alır, hash'ini çıkarır ve bir hash fonksiyonuna atarsak, başında bir sıfır olduğunu kanıtlayabiliriz — bu bloğun üzerinde çalışıldığını kanıtlayabiliriz.

Hash fonksiyonu, sınırlı bir kaynak olan CPU tüketir. Başında sıfırlar olan bir hash bulmaya çalışarak tüm CPU gücümüzü ortaya koyuyoruz. Bunu yaptığımızda, geçerli bir bloğumuz olur — blok temel olarak dondurulmuştur. O sırada içinde hangi işlemler varsa artık bu bloğun içindedir, herkes buna saygı duyar ve bir sonraki bloğa geçebiliriz.

#### Blokları birbirine zincirleme (3:56) {#chaining-blocks-together-356}

İşin püf noktası şu: eski bloğu alıp yeni bloğa bağlıyoruz. Yapıya bakarsak, yeni bloğun işlemleri yoktur ve nonce'u boştur, ancak işlemleri olan bir ebeveyni vardır. Önceki blok, bir sonraki bloğun bir parçası olacak, böylece tam bir zincir elde edeceğiz.

Havuzdan en son işlemleri ekliyoruz ve bir nonce bulmak için çalışıyoruz. İki numaralı bloğun madenciliği yapıldı — bu işlemleri geçerli kılmak için on değerinde bir nonce'a ihtiyacımız vardı. Sonra aynı şeyi yapıyoruz: eski bloğu bağlıyoruz, yenisini getiriyoruz, en son işlemler neyse onları ekliyoruz ve üzerinde tekrar çalışıyoruz. Yeterli denemeden sonra üçüncü blok için bir nonce bulduk. Dördüncü blok — aynı süreç ve bu şekilde ilerlemeye devam ediyoruz.

#### Madencilik zorluğu (5:02) {#mining-difficulty-502}

Bu çok kolay — çok hızlı bir şekilde geçerli bir blok bulabiliyoruz ve bunun daha zor olmasını istiyoruz. Zorluğu ikiye çıkaracağım. Beşinci bloğu bağlıyoruz, en son işlemleri getiriyoruz ve bir sayacın çalışmasını sağlıyoruz. Şimdi madencilik yapıyoruz — zorluk artırıldığı için, başında iki sıfır olan bir hash bulana kadar buna rastgele hash'ler atmak için sınırlı CPU gücümüzü kullanıyoruz. Bu biraz zaman alacak.

Şimdi beş bloktan oluşan bu blokzincire sahibiz. Bu bloklar işlemleri tutar ve her biri bir öncekini referans alır. Her bir bloğu üretmek rastgele bir miktar iş gerektirdi ve bu iş miktarı zorluk tarafından kontrol ediliyor.

#### Madenci (6:46) {#the-miner-646}

Bir madencinin ne olduğuna bakalım. Bizans generalleri probleminde, "şafakta saldır" demek isteyen generalin askerlere ihtiyacı vardı. Her bir askerin içinde olup biten şey, tam olarak burada madencimizle yaptığımız şeydir — bir mesajı ve bir nonce'u alıp olabildiğince hızlı bir şekilde bir hash fonksiyonuna atıyoruz ve o baştaki sıfırları elde etmeye çalışıyoruz. Baştaki sıfırlar hepimizin üzerinde anlaştığı rastgele bir şeydir — bu, bir asker olduğunuzu veya savaş açabileceğinizi kanıtlamak için yeterli bir iştir.

Bir madenci getireyim ve bunu biraz daha hızlı yapayım. Madenci aynı şeyi bloklarımız için de yapacak — havuzdan gelen işlemleri alır, bloğa pompalar ve geçerli bir hash bulana kadar üzerinde çalışır.

Madenci biraz daha verimlidir. Madenciliğe daha fazla odaklanmıştır. Rastgele hash'ler atıyor — bu tam olarak madencimizin daha önce yaptığı şeydi, sadece soyutlanmış hali. Arka planda çalıştığını, hash'ler üzerinde durmaksızın işlem yaptığını görebiliriz. Buldu — altıncı bloğun madenciliği yapıldı.

#### Çifte harcamalar ve ağ yayılımı (10:00) {#double-spends-and-network-propagation-1000}

Şimdi bu çifte harcama sorunundan ve hatta ağ yayılımı sorunundan bahsettik. Bir defterimiz ve dağıtık bir ağımız olduğunda ve biri bir işlem gönderdiğinde, bu farklı insanlara farklı zamanlarda ulaşır. Bu nedenle, ağda aynı anda bir bloğun madenciliğini yapan ve içlerinde farklı işlemler bulunan iki madencimiz olabilir.

O an için her ikisi de geçerlidir — ikisi de iş kanıtını yaptı, ikisinin de başında sıfırlar var. Ancak her ikisi de kurallara uygun (kanonik) olamaz. İkisi birden doğru olamaz. Bu yüzden ağın hangisinin gerçek zincir olduğu konusunda mutabakata varması için bir yola ihtiyacımız var.

#### Birden fazla madenci ve mutabakat (12:27) {#multiple-miners-and-consensus-1227}

Şu bloğu alıp buraya taşıyayım. İstediğim şey, aynı problem üzerinde çalışan, bir nevi aynı işlem havuzunu dinleyen ve birbirinden bağımsız olarak bloklar üreten iki farklı madenci. İki madencimiz var: Mallory ve Mike. Zorluğu üçe çıkardım ve her ikisi de başında üç sıfır olan bir hash bulmak için çalışıyor.

Mallory ilk bloğu buldu! Harika. Şimdi ne olacak — dağıtık bir ağda olduğumuz için Mike, Mallory'nin bloğundan henüz haberdar bile olmayabilir. Hâlâ kendi versiyonu üzerinde çalışıyor olabilir. Ve şimdi Mike da bir tane buldu. Yani iki geçerli yolumuz var.

Ağdaki bir eş iseniz ve önce Mallory'nin bloğunu görürseniz, ana bloğun o olduğunu düşünürsünüz. Daha sonra Mike'ın bloğu gelir. İçlerinden birinin en uzun zincir olma ihtimaline karşı her ikisini de elinizde tutarsınız. Ve kural şudur: en uzun geçerli zinciri takip et.

#### Coinbase ve blok ödülleri (15:33) {#coinbase-and-block-rewards-1533}

Bir madenci bir bloğun madenciliğini yaptığında şöyle deriz: işte istediğimiz tüm işlemler, işte nonce, işte ebeveyn — ama aynı zamanda o bloğun madenciliğini yapan kişi de burada diyeceğiz. Buna coinbase deniyor — sanırım artık bu isimde bir şirket var ama bu farklı. Biz buna sadece "madenci" diyeceğiz. Yani bloklarımız artık bir madenci alanı gerektiriyor.

Yani Mike az önce bloğu buldu ve Mike da bundan on değerinde bir kazanç elde edecek. Madencileri tüm bu işleri yapmaları için teşvik etmeliyiz, değil mi? Temel olarak ağı güvenli hale getirmek için bu teçhizatları satın almaya para harcıyorlar. Bu madenciler, tüm hash güçleriyle — tüm madenciler birleştiğinde belki on binlercesiyle — ağı güvence altına almak için para harcıyorlar. Bu hash'ler üzerinde çalışan teçhizatlar kurmak için iyi para ödüyorlar ve onları teşvik etmek için madenciliğini yaptıkları her bloktan blok ödülü adı verilen bir pay veriyoruz.

#### Blok ödülleri ve teşvikler (16:52) {#block-rewards-and-incentives-1652}

Yani bloğun bu versiyonunda Mallory'nin on doları var, ancak bu versiyonda Mike'ın on doları var. Bu iki oyuncunun her biri kendi zincirlerinde ilerlemeye devam etmeye teşvik ediliyor ve ağın geri kalanının bir mutabakat bulması gerekiyor. Temel olarak olay, kimin en uzun geçerli zincire sahip olduğuna dayanıyor.

Mike kendi bloğunu ebeveyn olarak ayarlayacak ve bir sonraki blok üzerinde çalışmaya başlayacak. Mallory de aynı şeyi yapacak. Ve iş, ağdaki diğer kişilerin kimin tarafını seçeceğine kalıyor. Kötü ağ bağlantısına sahip insanları cezalandırmak istemediğimizden, eminim ki Ethereum'da amca bloklara (uncle blocks) — en uzun zincire giremeyen geçerli bloklara — ödeme yapıyoruz, çünkü onlar hâlâ ağın güvenliğini sağlamaya yardımcı oluyorlar.

Bu koordinasyon ve mutabakat sorunumuz vardı ve bunu, işlemleri geçerli kılmak için dahil edilmesi gereken bu rastgele iş miktarını koyarak çözdük. Mallory, tüm bu işlemlerin ve önceki bloğun hash'inin başında üç sıfır bulmak için sürekli hashleme yaparak tüm bu işi yaptı.

#### Blokzinciri sorgulama (18:30) {#querying-the-blockchain-1830}

En uzun zincir hangisiyse onunla iletişim kurabiliriz. Mike henüz yediye geçmedi, bu yüzden buradaki yüksekliğin hâlâ altı olduğunu görebiliriz. Ve insanların bakiyelerini sorgulamak gibi şeyler yapabiliriz. Yani bakiyeye basıyoruz — ne elde ediyoruz? Beş yüz yirmi dört. Yani Heidi 524'te veya bu zincirin yerel Token'ı her neyse onda oturuyor. Onun nonce'unu görebiliriz, defterle yapabileceğimiz her şeyi yapabiliriz, ancak şimdi blokları üst üste yığıyoruz ve bu bloklar işlemleri tutuyor.

Sadece para gönderen kullanıcılardan işi soyutlayıp madencilere verdik ve onlara bu blok ödülünü vererek onları teşvik ettik. Ayrıca her kişinin işlem başına ödeyeceği küçük bir miktar da olacak, ancak buna sonraki bir bölümde değineceğiz. Şu anda Gaz hakkında konuşmak istemiyoruz, ancak sadece bir bloğun madenciliğini yapmak için değil, aynı zamanda çok sayıda işlem içeren dolu bir bloğun madenciliğini yapmak için de bir teşvik olduğunu bilmek faydalıdır. Ancak bu daha küçük bir teşvik — eninde sonunda buna da geleceğiz.

#### Zincir değişmezliği (19:51) {#chain-immutability-1951}

Blokların madenciliği yapıldıkça, giderek daha güvenli hale gelirler. Ne demek istediğimi size göstereyim. Yani Mike bir bloğun madenciliğini yaptı, Mallory ise burada bir gösteri yapıyordu ve bir bloğun madenciliğini yapamadı. Yani şimdi Mike'ın zinciri en uzunu olacak ve ağ boyunca yayılacak. Herkes bunu görecek ve şöyle diyecek: tamam, bu zincirde yedi blok var, hepsi geçerli — takip edeceğimiz zincir bu. Oynadığımız kuralların değişeceği ve farklı insan gruplarının farklı zincirleri takip etmek isteyeceği sert çatallanmalar (hard forks), tartışmalı çatallanmalar yaşayabilirsiniz. Harika şeyler.

Tamam son olarak, eğer üçüncü bloğa geri döner ve bir şeyi değiştirirsek — herhangi küçük bir detayı değiştirirsek — buraya gireceğim. Frank'e giden bir işlem var. Diyelim ki Frank yerine bunu Eve olarak değiştiriyoruz. Şimdi tamama bastığımda ne olacağını izleyin: şuna bakın. Üçüncü bloğun küçücük bir parçasını değiştirdim ve aniden tüm zincir darmadağın oldu. Artık geçerli değil. Bunu ağ üzerinden yayınlasaydım, insanlar bana gülüp geçerdi.

Bir bloğun madenciliği yapıldıktan sonra, geri dönüp değişen şeylerin yeniden madenciliğini yapmadığınız sürece hiçbir şeyi değiştiremezsiniz. Temel olarak madenciyi buraya tekrar bağlamam ve yedi blokla buralara kadar gelmiş olan Mike'a yetişmek için yeterli güce sahip olmaya çalışmam gerekirdi. Bu çok ama çok zor olurdu. Bir blok ne kadar derindeyse, ondan geri dönmek o kadar zordur. Carlos'un Bob'a 84 gönderdiği buradaki üçüncü bloğun gerçeği — Bob, birden fazla blok derinliğinde o paranın kesinlikle orada olduğunu bilerek oldukça güvende olabilir. Burada tartışmalı bir çatallanma olma ihtimali yok — yerim sağlam. İşte buna kesinlik diyoruz.

#### Özet (22:00) {#summary-2200}

Bir deftere ve bu mutabakat sorununa sahip olmak yerine, bir bloğu doğrulamak amacıyla bir hash üzerinde çalışmak için İş Kanıtı (PoW) kullanıyoruz — ve "geçerli", başında rastgele sayıda sıfır olması anlamına gelir. Blok zincirini oluştururken, madenciliği yapılmış blokların aslında farklı yerlere farklı zamanlarda ulaşabilmesi gibi sorunlarla karşılaşmaya devam edeceğiz. Bu yüzden şöyle diyen daha ileri bir mutabakat algoritmamız var: geçerli olan ve katılmak istediğiniz kural setini takip eden en uzun zinciri takip edin.

Pekâlâ, mutlu Papyon Cumaları! ETH.BUILD üzerinde blokzincir böyleydi. Bunu kaydedip oraya koyacağım, böylece sadece "yükle"ye basıp oynayabileceğiniz bir zincire sahip olabilirsiniz. Mutlu Cumalar!