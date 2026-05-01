---
title: "Atomlar, kurumlar, blokzincirler"
description: "Josh Stark, blokzincirlerin ne olduğunu anlamak için yeni bir çerçeve öneriyor ve medeniyetin yapı malzemeleri olarak atomları, kurumları ve blokzincirleri birbirine bağlayan ortak özellik olarak 'sertlik' (hardness) kavramını tanıtıyor."
lang: tr
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "how-ethereum-works"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atomlar, Kurumlar, Blokzincirler"
---

Ethereum Vakfı'ndan **Josh Stark**'ın Pragma Denver 2024'te yaptığı, blokzincirleri anlamak için yeni bir çerçeve öneren felsefi bir açılış konuşması. Konuşma, medeniyetin yapı malzemeleri olarak atomları, kurumları ve blokzincirleri birbirine bağlayan ortak özellik olarak "sertlik" (hardness) kavramını tanıtıyor.

*Bu döküm, ETHGlobal tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=zI07mqNdxzA) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için ufak düzenlemeler yapılmıştır.*

#### Blokzincirleri neden açıklayamıyoruz? (0:00) {#why-cant-we-explain-blockchains-000}

Herkese merhaba, Denver'daki Pragma'da burada olduğunuz için teşekkür ederim. Benim adım Josh. Ethereum Vakfı'nda çalışıyorum — yaklaşık beş yıldır EF ile birlikteyim. İşimle ilgili, işimin ne olması gerektiğini bulmak olduğu ve bunun her altı ayda bir değiştiği şeklinde şaka yapmayı severim.

Kripto kariyerimde birçok farklı şey yaptım. Erken dönem bir Bitcoin cüzdanında çalıştım. Toronto'da bir Bitcoin ATM'si kurdum — daha doğrusu satın aldım — ve 2015'te yaklaşık bir yıl boyunca işlettim. 2017'de ETHGlobal'in ve erken dönem katman 2 (L2) ölçeklendirme çözümleri üzerinde çalışan L4 adlı bir şirketin kurucu ortağı oldum. Ve yıllar içinde bir sürü blog yazısı yazdım.

Tüm bunlara rağmen, ne yaptığımızı veya neden yaptığımızı hâlâ tam olarak açıklayamıyordum. Bunun çok önemli olduğu, dünyayı değiştireceği hissine sahiptim. Beni yanlış anlamayın — bireysel uygulamalar hakkında konuşabilirim. Bitcoin'i, NFT'leri, Uniswap'ı, ENS'yi açıklayabiliriz. Kendi küçük silolarındaki tüm bu şeyleri açıklamak o kadar da zor değil. Ancak büyük resimden — tüm bu şeyleri mümkün kılan tek bir teknolojinin olmasının ne anlama geldiğinden — bahsetmeye çalıştığımızda tökezlemeye başlıyoruz. İnsanlara havalı kelimeler savurarak, bir şeyleri açıklamaya çalışarak zihinsel jimnastik yapıyoruz.

Gerçekten işin özüne inmemiz gerekiyor ve buna o kadar da yakın olduğumuzu sanmıyorum. Bu bir sorun! Eğer bu bireysel uygulamalar hakkında konuşabiliyor ama ortak noktalarını ifade edemiyorsak, kaçırdığımız bir şey var demektir. Henüz bulunamamış bir açıklama düzeyi var ve bence bu önemli. Hissiyatım o ki, onu bulduğumuzda bize çok bariz gelecek.

Yani bu, aklımdaki çok spesifik bir soruyla başladı: Genel amaçlı teknoloji nedir? Bu temel kapasite nedir? Ve bu, benim çok daha ilginç bulduğum bir şeye dönüştü.

#### Claude Shannon ve bilgi fikri (4:00) {#claude-shannon-and-the-idea-of-information-400}

Size bir hikaye anlatayım. 1930'larda ve 40'larda Claude Shannon, yeni bir çağın başlangıcıyla çevriliydi. Bell Labs'te savaş sırasında atış kontrol sistemleri ve kriptografi üzerinde çalıştı ve bilgiye daha genel bir yaklaşım hakkında düşünmeye başladı. Başlangıçta buna bilgi (information) demedi — 1939'da bir meslektaşına "istihbaratın iletimi" hakkında düşündüğünü yazdı. Bilgi kelimesinin o zamanlar farklı bir anlamı vardı.

1948'de bilgi çağının yolunu açan temel bir makale olan "İletişimin Matematiksel Teorisi"ni yayımladı. Bizim için en önemlisi, ilk kez soyut bir bilgi fikrini — müziğe, konuşmaya, edebiyata veya kodlara bağlı olmayan bir tanımı — ortaya koymasıydı. Bu, herhangi bir bağlamda ölçebileceğiniz indirgenemez bilgi birimi olan bit'i tanıtan makaledir.

Bu andan önce, hiç kimse evrensel, genel bir şey olarak bu bilgi kavramına gerçekten sahip değildi. Bu şimdi kulağa delice gelebilir — binlerce yıldır bilgi teknolojisini kullanıyoruz. İnsan olmanın, konuşmayı ve dili kullanmanın ne anlama geldiğiyle ayrılmaz bir şekilde bağlantılıdır. Ancak tüm bu şeylerde ortak olan temel özelliği çok yakın zamana kadar isimlendirmemiştik.

Bundan çıkarmanızı istediğim şey şu: Bilgi fikrine sahip olmadan önceki bir zaman ve sonraki bir zaman vardı. Ya benzer şekilde bu kadar temel bir şeyi gözden kaçırıyorsak? Benim hipotezim bu.

#### Üç ipucu (7:00) {#three-clues-700}

Blokzincirleri açıklamakta zorlanırken, daha büyük bir şeye dair ipuçları olduğunu düşündüğüm bu tuhaf şeylerle sürekli karşılaşıyorum.

**Birinci ipucu** — blokzincirleri hem güven gerektirmeyen hem de güvenilir olarak tanımlıyoruz. Bu tuhaf. Satoshi'nin teknik incelemesinde güven ihtiyacını ortadan kaldırmaktan bahsediyoruz. Ancak Ethereum teknik incelemesinde, uygulamaları daha güvenilir hale getirmek için Ethereum'u kullanmaktan bahsediyoruz. The Economist, blokzincirleri bir "güven makinesi" olarak adlandırdı. Blokzincirlerin güven gerektirmeyen olduğunu söylediğimizde gerçek bir şeyi kastediyoruz ve güvenilir olduklarını söylediğimizde de gerçek bir şeyi kastediyoruz. Dilimiz henüz buna yetişemedi. Bu bariz çelişkiler her zaman dikkate değerdir — bazen soyutlamalarımızdaki bir boşluğu ortaya çıkarırlar.

**İkinci ipucu** — blokzincirlerin merkezi kurumlardan nasıl farklı olduğu hakkında çok konuşuyoruz — merkez bankalarına karşı Bitcoin, DNS'e karşı ENS. Ancak ortak noktaları hakkında nadiren konuşuyoruz. Birbirlerinin yerine geçebilirler. Eğer hiç itibari parayı Bitcoin ile takas ettiyseniz, onları birbirinin yerine koymuşsunuzdur. Bu ikamenin bu kadar düzenli gerçekleşmesi için ortak bir noktaları olmalı.

Arabalar söz konusu olduğunda "atsız arabalar"dan bahsettik, ama en azından ne olduklarını isimlendirebiliyorduk — araçlar. Dijital kayıtlar söz konusu olduğunda "kağıtsız" ortamlardan bahsettik, ama kategoriyi biliyorduk — bilgi. Görünüşe göre, ait olduğu kategoriyi icat etmeden önce bir teknoloji icat etmişiz.

**Üçüncü ipucu** — Satoshi'nin makalesi şu sözlerle başlıyor: "İnternet üzerindeki ticaret, neredeyse tamamen güvenilir üçüncü taraflar olarak hizmet veren finansal kurumlara dayanır hale geldi." Satoshi, Bitcoin'i diğer yazılımlarla değil, kurumlarla karşılaştırıyordu. Burada bir şey var.

#### Sertliğin (hardness) tanıtılması (11:00) {#introducing-hardness-1100}

İşte o kutuya neyin gireceğine dair cevabım. Ben buna **sertlik** diyorum. İşte beş basit adımda hikaye, sonrasında daha da derinlere ineceğiz.

Birincisi — medeniyetimiz para, hukuk ve daha pek çok sosyal altyapıya dayanır ve bunların güvenilir olması gerekir. Bizim için faydalı olabilmeleri için, en azından çoğu zaman, onlardan beklediğimiz gibi davranmaları gerekir. Aksi takdirde onlara güvenmezdik — bir para birimi haline gelemezlerdi.

İkincisi — bu gerekli güvenilirlik düzeyine ulaşmak çok zordur. Şimdiye kadar bunu yapabilmemizin gerçekten sadece üç yolu oldu: atomları kullanmak, kurumları kullanmak ve şimdi de blokzincirleri kullanmak.

Üçüncüsü — her üçünde de ortak olan ve benim sertlik dediğim, fark edilmemiş bir özellik var. Sertlik, karmaşık koordinasyon oyunları için ihtiyaç duyduğumuz gerçekten spesifik yollarla geleceği daha öngörülebilir kılmamızı sağlayan kapasitedir, güçtür.

Dördüncüsü — bu üç sertlik kaynağının her biri, onları farklı bağlamlarda faydalı kılan farklı özelliklere sahiptir.

Ve beşincisi — onları birlikte kullanabilir ve birbirlerinin yerine geçirebiliriz.

Altının enflasyon oranı, gezegenimizin fiziksel özellikleri nedeniyle güvenilirdir — atomik olarak serttir. Bir sözleşme güvenilirdir çünkü taahhütlerinize uymazsanız kurumlar gelip eşyalarınızı alır. Bir akıllı sözleşme çalışacaktır çünkü milyarlarca doların söz konusu olduğu kriptoekonomik bir protokol tarafından güvence altına alınmıştır.

Atomları, kurumları ve blokzincirleri yapı malzemeleri gibi düşünebilirsiniz — ahşap, beton ve çelik gibi. Farklıdırlar, ancak ortak bir kategorinin parçasıdırlar. Ve biz bu şeyleri binalar inşa etmek için değil, bir medeniyet inşa etmek için kullanıyoruz. Belki de daha iyi malzemelerle, şu an sahip olduğumuzdan daha büyük, daha iyi ve daha güçlü bir medeniyet inşa edebiliriz.

#### Sertlik nedir? (14:00) {#what-is-hardness-1400}

Sertlik derken neyi kastettiğimi daha kesin bir şekilde ifade edeyim. Bu, herhangi bir şeyin sahip olabileceği sıradan bir güvenilirlik değildir. Sertlik spesifik bir türdür. İlk dikkat edilmesi gereken şey, bunun sosyal koordinasyon için önemli olan bir güvenilirlik türü olduğudur. Sadece, bilirsiniz, bu masanın güvenilir bir şekilde masa olması değil — kiranızı ödeyebilmeniz, bir sözleşmenin uygulanacak olması, bir ekonominin güçlü olmasıdır. Sertlik işte bu tür şeyler içindir.

Peki sonuç tam olarak nedir? Maalesef burada **kalıp** (cast) adını verdiğim yeni bir kelime daha tanıtıyorum. Kalıp, sertlik kullanılarak kesin veya güvenli hale getirilen, dünyanın gelecekteki olası herhangi bir durumudur. Jargon için özür dilerim, ancak burada bir kelimeye sahip olmanın nedeni, tüm sertlik kaynakları genelinde genelleştirilebilecek bir kelimemiz olduğunu düşünmememdir. Belki de bit gibidir — birçok farklı bağlamda konuşabileceğimiz ve bunlardan birine bağlı kalmadan kaynaklar arasında geçiş yapabileceğimiz bir kavrama ihtiyacımız var.

Bir krediyle ilgili bir kalıp şu olabilir: Eğer Alice, Bob'a geri ödeme yapmazsa, yasal kurumlar onu buna zorlamak için giderek daha sert tehditler ve eylemler kullanacaktır. Bu kalıp, kurumsal sertlik kullanılarak sertleştirilmiştir. Altınla ilgili bir kalıp, önümüzdeki 20 yıl boyunca her yıl piyasaya belirli bir miktar altının gireceği olabilir — bu, Dünya'mızın fiziksel özellikleriyle güvenilir hale getirilmiştir. Ve Ethereum ile ilgili bir kalıp, varlıkların yalnızca belirli bir açık anahtara karşılık gelen özel anahtarı elinizde tuttuğunuzda transfer edilebileceği yönündeki bir talep olabilir — bu da blokzincir sertliği ile sertleştirilmiştir.

Uygulamada, genellikle birbirine dokunmuş bu şeylerin demetleriyle etkileşime gireriz. Eğer altınınız varsa ve onu bir bankada tutuyorsanız, sizin için pek çok şey önemlidir: gelecekteki altın arzıyla ilgili kalıplar, bankanın kasasının gücüyle ilgili kalıplar, bankanızla aranızdaki yasal sözleşmenin gücüyle ilgili kalıplar, bir şeyler ters gittiğinde bu kuralları uygulayacak olan ülkenizdeki hukuk sisteminin güvenilirliğiyle ilgili kalıplar.

İkinci olarak, sertlikten bir güvenlik ölçüsü olarak bahsedilebilir. Pratikte yapması zor olsa bile, teoride her zaman ölçülebilirdir. Önümüzdeki 20 yıl boyunca her yıl piyasaya belirli bir miktar altının gireceği kalıbı ne kadar serttir? Buna bakmanın bir yolu olasılıktır — tüm verilere bakar ve ihtimali tahmin etmeye çalışırsınız. Veya maliyet perspektifinden bakabilirsiniz: Birinin bu kalıbı kırmasının maliyeti ne olurdu? Eğer bir ulus devletseniz, savaşın ve uluslararası düzenlemelerin güçlerini kullanabilirsiniz. Ya da diğer yola sapıp, Dünya'nın fiziksel sınırlamalarını aşarak uzaydan içinde bolca altın bulunan bir asteroit getirebilirsiniz. Neredeyse her kalıbı kırmanın bir bedeli vardır.

Ve son olarak, sertlik belirli kaynaklardan gelir — atomlar, kurumlar ve blokzincirler. Her birinin, onları farklı bağlamlarda faydalı kılan farklı özellikleri vardır.

Bu çerçevenin sevdiğim yanı, daha derin sorular sormamıza olanak tanımasıdır — sadece blokzincirlerin belirli özellikleri hakkında konuşmakla kalmayıp, tüm bu farklı şeyleri karşılaştırmamıza ve nerede uygun olduklarını, onları nasıl ve hangi kombinasyonda kullandığımızı düşünmemize olanak tanır.

#### Atom sertliği (19:00) {#atom-hardness-1900}

Atom sertliği, etrafımızdaki doğada — kelimenin tam anlamıyla fiziksel atomlarda ve aynı zamanda doğal olarak oluşan diğer özelliklerde — güvenilirlik bulduğumuz zamanlarla ilgilidir. Bunu, para olarak altın boncuklar kullandığımızda, mülkiyet haklarını tanımlamak için fiziksel yapılar kullandığımızda veya mülkiyet haklarını tapu gibi fiziksel bir nesneye kaydettiğimizde yaparız.

Birçok avantajı vardır: otomatik uygulama, paylaşılan durum, evrensel bir kural seti. Fizik kurallarının, en azından bizim için en çok önem taşıyan makroskobik ölçeklerde, her yerde eşit olarak geçerli olması insan medeniyeti için çok uygundur.

Ancak zayıf yönleri de vardır. Dünyada bulabildiklerimizle sınırlıyız. Atom sertliği, evine bir kaya yüzeyi inşa etmek isteyen bir mimara benzer — işe yarayan bir tane bulmanız gerekir. Öylece bir kaya yüzeyi yapamazsınız. Onu biraz değiştirebilirsiniz, ancak özel ihtiyacınıza uyan doğal olarak oluşan bir özellik bulmaya bel bağlarsınız.

Ona yeni kurallar veremeyiz. Altınımız var, ancak evrenden bize daha düşük enflasyona, daha adil coğrafi dağılıma sahip yeni bir tür altın vermesini veya belki de ağırlık sorununu çözmesini isteyemeyiz. Bunu yapamayız. Ve çok sınırlı bir programlanabilirliği vardır — atom sertliğinden yapabileceğiniz yalnızca belirli türde sertleştirilmiş şeyler vardır, bunlar da temel olarak paralardır. Atomlardan bir evlilik sözleşmesi yapamazsınız. Bunu yapmak için bir kurum gibi daha karmaşık bir şeye ihtiyacınız vardır.

Ve kalıplar, doğa üzerindeki artan insan kontrolümüz tarafından sıklıkla zayıflatılır. Deniz kabuklarını para olarak kullanmak, deniz kabuğu enflasyonu hakkındaki beklentilerinizi kökten altüst edebilecek küresel bir ekonominin parçası olana kadar iyidir ve aniden ekonominiz yok olur. Altını bir değişim aracı olarak kullanmak, asteroit altını elde edip arz hakkındaki varsayımlarımızı değiştirebildiğimizde bir gün aynı sorunla karşılaşabilir.

Ancak durum bundan daha inceliklidir. Bazen var olduğunu bile fark etmediğimiz kalıplarımız olur, ancak sonra bir şeyler değiştiği için yok olurlar. Uzun bir süre boyunca finansal piyasalardaki ticaret hızı hakkında sert bir kalıp vardı — bu yalnızca belirli bir hızda, belki de birinin işlem salonunda birbirine bağırabileceği hızda yapılabilirdi. Bu kalıp atomik olarak sertti — bundan daha hızlı iletişim kuramıyorduk. Ancak yeni teknoloji bu varsayımları tamamen zayıflattı. Aslında o eski kalıbın bir versiyonunu sevdiğimizi fark ettik ve onu kurumlardan yeniden yarattık — ticaret hızını sınırlayan ve devre kesicileri uygulayan düzenlemeler getirdik.

#### Kurumsal sertlik (22:00) {#institutional-hardness-2200}

Kurumsal sertlik çok geniş bir kategoridir — medeniyet denilince aklımıza gelebilecek çoğu şeyi kapsar. Hukuk sistemlerimiz, yasama organlarımız, polis güçlerimiz, şirketlerimiz, her şey. Bir tür sertlik sağlayan tüm kurumlar. Toplumlarımıza düzen veren, antisosyal davranışları cezalandıran kalıplar yarattık. Belirli kurallara uyduğunuz takdirde herkesin kurumlar tarafından sertleştirilmiş kendi kalıplarını yaratmasına izin vererek sertliği bir platform olarak yarattık. Yeni varlıklar doğuran ve büyüyen ekonomilere kredi kaynakları sağlayan kalıplar yarattık.

Kurumsal sertliğin birçok avantajı vardır. Oldukça programlanabilirdir — organizasyonlar halinde gruplanmış insanlar gerçekten karmaşık veya ince talimatlar alabilirler. Bu, olası kalıplar için çok geniş bir tasarım alanıdır. Ve insanlardan oluşurlar ve insanlar iyidir. Belki de bazen birinin devreye girip "Bunu uygulamayacağım çünkü yanlış olduğunu düşünüyorum" diyebilmesi iyidir. Belki de bazen birinin bilgi uçuran veya isyankar olması için sistemde bir kırılma olması iyidir.

Ancak birçok zayıf yönü de vardır. Sınırlarla kısıtlıdır — yalnızca belirli ülkelerde hukukun üstünlüğünü uygulayan kurumlara gerçekten erişiminiz vardır. Siyasi veya devlet başarısızlığına maruz kalabilir — eğer hükümetiniz bir konularda anlaşamıyorsa veya savaşçı bir ulus tarafından işgal edilirseniz, para veya sözleşmeler için güvendiğiniz belirli kurumlar öylece çökebilir. Genellikle şeffaf değildirler — bir şeyler ters gidene kadar bir kurumun gerçekten sert olup olmadığını söylemek zordur. Yüksek bir başlangıç maliyetine sahiptirler — Fed veya hukuk sistemi ölçeğinde yeni kurumları, üzerlerinde yineleme yapmak için kolayca kuramayız. Sahip olduklarımıza bir nevi sıkışıp kalmış durumdayız.

Ve insanlardan oluşurlar ve insanlar kötüdür. Gerçek şu ki, bu ülkede ve diğer pek çok ülkede birçok insan kurumların sağladığı sertliğe gerçekten erişememiştir. İpotekli kredi alamadılar. Banka hesabı açamadılar. Çünkü bir kurumu insanlarla doldurduğunuzda, onların kötülüklerine, önyargılarına, ideolojilerine maruz kalır. Ve kurumsal sertliğe olan bağımlılığımız giderek artıyor. Yazılımın dünyayı yemesindeki sorun, çoğu yazılımın aslında sadece ekranın arkasındaki bir kurumdan ibaret olmasıdır ve sonuç olarak onlara giderek daha fazla güç veriyoruz.

#### Blokzincir sertliği (24:20) {#blockchain-hardness-2420}

Satoshi'nin icadı elbette sadece Bitcoin'den ibaret değildi — dijital bir ortamda dijital sertlik yaratmak için genel amaçlı bir tekniğin çekirdeğiydi. Birçok güçlü yönü vardır: evrensel küresel erişim, yazılımdan yapılmıştır ve herkes yazılım yazabilir, sertlik derecesi şeffaf ve denetlenebilir olabilir, düşük başlangıç maliyeti, yinelemesi kolaydır ve piyasa teşvikleriyle güvence altına alınmıştır — ve piyasalar rasyoneldir.

Ancak zayıf yönleri de vardır. Teknolojik bir medeniyet gerektirir — gereksinimler nedeniyle şu ana kadar blokzincirlere sahip olamazdık ve gelecekte bizim sahip olduklarımıza sahip olmayan bir medeniyet de onları kullanamayacaktır. Yazılımdan yapılmıştır ve yazılım kötü yazılabilir. Kalıpların kapsamı zincir içi ortamlarla sınırlıdır. Ve piyasa teşvikleriyle güvence altına alınmıştır — ve piyasalar irrasyoneldir.

#### Bu neden önemli (25:10) {#why-this-matters-2510}

Peki bu ne anlama geliyor? Bu bize ne kazandırıyor? Bu neden sadece akademik bir ilgiden ibaret değil?

Bu mercekten bakıldığında pek çok şey çok daha mantıklı gelmeye başlıyor. Bunlardan biri başladığımız sorudur: Neden blokzincirlerin hem güven gerektirmeyen hem de güvenilir olduğunu söylüyoruz? Açıklaması şudur — blokzincirlerin güven gerektirmeyen olduğunu söylediğimizde, aslında kastettiğimiz şey sertliklerinin bir kişiye veya kuruma bağlı olmadığıdır. Ve güvenilir olduklarını söylediğimizde, sadece sertliğe sahip olduklarını kastediyoruz — sadece farklı bir türde. Bu ayrımı yapamamamız, bu kafa karıştırıcı dile neden olan şeydir.

Özel veya merkezi blokzincirlerin neden ilginç olmadığını açıklıyor. Merkeziyetsiz olmayan bir blokzincir, sadece bir kurum olmaya geri döner. Eğer üç banka veya hepsi aynı organizasyon tarafından finanse edilen bir avuç doğrulayıcı tarafından kontrol ediliyorsa, o zaman sadece kurumsal sertlikle güvence altına alınmış bir EVM'dir. Blokzincirler hakkındaki en ilginç şey EVM değildir — kurumlarla aynı başarısızlıklara ve sınırlamalara tabi olmayan veya bunlarla ilişkili olmayan farklı bir sertlik kaynağının olmasıdır. Bu yüzden farklıdır. Bu yüzden önemlidir.

Ayrıca, olasılıklar yelpazesini ve insanların blokzincir alanında içine düştükleri varsayılan ideolojileri anlamaya yardımcı olur. Birçok insan, kurumsal sertlikle rekabet etmek veya onun yerini almak için blokzincir sertliğini kullanmaya çok odaklanmıştır — Bitcoin topluluğunun büyük bir kısmı bununla ilgilidir, merkeziyetsiz finansın (DeFi) büyük bir kısmı bununla ilgilidir. ENS bile bir şekilde DNS'in yerini almaya veya onunla rekabet etmeye çalışıyor. Ancak bir de blokzincir sertliğinin kurumsal sertliğin yapamadığı şeyleri yapabileceğini gören insanlar var — daha önce hiç kimsenin denemediği fikirler, çünkü bu kapasiteye, bu belirli sertlik türüne hiç sahip olmamıştık. Ve şimdi bu şeyleri keşfedebiliriz. Belki NFT'ler oradadır veya Dark Forest gibi oyunlar ya da otonom dünyalar etrafındaki hareket.

#### Hedeflerimizi yükseltmek (27:00) {#raising-our-ambitions-2700}

En önemlisi, bence bu çerçeve hedeflerimizi yükseltiyor. Kişisel olarak benim için önemli olan bu ve belki size de hitap ediyordur — ben sadece bu bireysel uygulamalar için burada değilim. Ben sadece tamamen Bitcoin veya tamamen DeFi veya tamamen NFT'lerle ilgilenen biri değilim. Belki siz de öylesinizdir. Burada daha büyük bir şeyler oluyor.

Dürüst olmak gerekirse gözümüzü paradan daha yükseğe dikebiliriz. Gözümüzü finanstan daha yükseğe dikebiliriz. Çok daha büyük bir resim var. Bence bu, karşılaştığımız zorluklara ve blokzincirlerin sunduğu fırsatlara ölçek olarak yeterli hissettiren bir vizyon tanımlamaya gerçekten yardımcı oluyor.

Misyon sadece Fed'in yerini almak değil. Misyon, medeniyetimizi inşa etmek için kullandığımız malzemeleri iyileştirmek ve genişletmektir — dünyadaki herkesin bunlara erişebilmesi için bu araçların maliyetini düşürmek, daha fazla değişimin gerçekleşmesine izin vermektir. Ve bu arada, bu maliyet yakında daha da düşecek.

Daha fazla insanın kuralları değiştirmesine izin vererek insanlığın bu sonsuz oyunu oynamaya devam etmesine yardımcı olmak. Çok az insan bir yasa çıkarabilir, ancak herkes bir akıllı sözleşme yazabilir. Bu kapasiteyi genişletiyoruz.

Bence birçok farklı ülkede ve birçok ideolojideki pek çok insan sıkışıp kaldığımızı hissediyor — oyunun kurallarının artık olması gerektiği gibi olmadığını, ancak onları değiştirmek için güçsüz olduğumuzu düşünüyorlar. Bu yerel maksimumda pek çok yönden sıkışıp kaldık ve bunun yanlış olduğunu seziyoruz. Blokzincirler bunu düzeltmez, ancak bence yardımcı olabilirler. Deneyler için yeni bir alan açıyorlar. Daha fazla insanın kuralları değiştirmesine, yeni kurallar yazmasına, o sonsuz oyuna katkıda bulunmasına izin veriyorlar. Yasalar yazamayız, ancak bir akıllı sözleşme yazabiliriz.

Şu notla bitirmek istiyorum: Eğer daha önce EF'teki insanların konuşmalarını izlediyseniz, *Sonlu ve Sonsuz Oyunlar* kitabına düşkün olduğumuzu bilirsiniz. Bu kitaptaki özdeyişlerden biri, yalnızca değişebilenin devam edebileceğidir. Bu yerel maksimumda sıkışıp kalamayız. Bir şeyleri değiştirmek zorundayız. Ve bence blokzincirler bunu yapmamıza yardımcı oluyor. Çok teşekkür ederim.