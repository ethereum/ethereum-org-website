---
title: "Sıfır bilgi ispatları 5 zorluk seviyesinde açıklandı"
description: "Bir bilgisayar bilimcisi, sıfır bilgi ispatlarını bir çocuktan bir uzmana kadar beş farklı karmaşıklık seviyesinde açıklıyor."
lang: tr
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Sıfır Bilgi İspatları"
---

UCLA Samueli Mühendislik Okulu'nda profesör olan bilgisayar bilimcisi **Amit Sahai**, bu **WIRED** yapımında sıfır bilgi ispatlarını bir çocuktan bir uzmana kadar beş karmaşıklık seviyesinde açıklıyor. Kavram, fiziksel analojiler aracılığıyla gösteriliyor ve artan teknik derinlikte tartışılarak kriptografinin en önemli kavramlarından birini herkes için erişilebilir kılıyor.

*Bu döküm, WIRED tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=fOGdb1CTu5c) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için ufak düzenlemeler yapılmıştır.*

#### Giriş (0:00) {#introduction-000}

**Amit Sahai:** Merhaba, benim adım Amit Sahai ve UCLA Samueli Mühendislik Okulu'nda bilgisayar bilimi profesörüyüm. Bugün benden sıfır bilgi ispatlarını giderek artan beş karmaşıklık seviyesinde açıklamam istendi.

Sıfır bilgi ispatı, bir kanıtlayıcının bir doğrulayıcıyı bir ifadenin doğru olduğuna ikna etmesinin, ancak ifadenin doğru olduğu gerçeğinin ötesinde hiçbir ek bilgi ifşa etmemesinin bir yoludur. Sıfır bilgi ispatları Blokzincirlerde ve kripto paralarda kullanılıyor. Kriptograflar, şaşırtıcı matematiksel özellikleri ve aynı zamanda pek çok farklı senaryoya inanılmaz uygulanabilirliği nedeniyle sıfır bilgi konusunda heyecan duyuyorlar.

#### Seviye 1: çocuk (0:41) {#level-1-child-041}

**Amit Sahai:** En sevdiğin ders nedir?

**Chelsea:** Matematik diyebilirim. Bazı küçük problemler aslında gerçekten büyük ve karmaşık olabiliyor. Tıpkı bir bulmaca gibi.

**Amit Sahai:** Ben de aynı nedenden dolayı matematiği seviyorum. Bugün sana sıfır bilgi ispatı denen bir şeyden bahsedeceğim. Bir sıfır bilgi ispatında iki kişi vardır; bir kanıtlayıcı ve bir doğrulayıcı. Sana bir şeyin doğru olduğunu kanıtlamak istiyorum ama işin garip tarafı, sana bunun nedenlerini söylemeden doğru olduğunu kanıtlamak istiyorum. Bunu ilk duyduğum zamanı hatırlıyorum, "Bir dakika, ne? Bu nasıl mümkün olabilir?" demiştim.

Peki bu fotoğrafta ne görüyorsun?

**Chelsea:** Bir sürü penguen.

**Amit Sahai:** Evet. Tüm bu penguenlerin arasına gizlenmiş bir deniz papağanı var. Onu aramayı denemek ister misin? Nerede olduğunu görüyor musun? Ben nerede olduğunu biliyorum ama sana söylemek istemiyorum. Bana inanıyor musun?

**Chelsea:** Evet.

**Amit Sahai:** Peki ya sana deniz papağanının nerede olduğunu bildiğimi, yerini sana ifşa etmeden kanıtlayabilseydim? Sana göstereyim. O fotoğrafı aldım ve buradaki bu posterin arkasına koydum. Neden gidip şu delikten bir bakmıyorsun?

**Chelsea:** Deniz papağanını görüyorum.

**Amit Sahai:** Yani bu panoya baktığında fotoğrafın nerede olduğunu bilmiyoruz, değil mi? Fotoğrafın köşesi burada mıydı, ki bu durumda deniz papağanı tamamen bu tarafta olurdu? Yoksa fotoğrafın köşesi burada mıydı, ki bu durumda deniz papağanı diğer tarafta olurdu? İşte bu, sıfır bilgi ispatının gerçekten basit bir örneği. Seni deniz papağanının nerede olduğunu bildiğime ikna ettim ama sen başka hiçbir şey öğrenmedin.

**Chelsea:** Neden sıfır bilgi ispatı üzerine çalışıyorsun?

**Amit Sahai:** Onları ilk öğrendiğimde, sadece çok havalı olduklarını düşünmüştüm. Ancak sadece deniz papağanlarını bulmak için değil, aynı zamanda gerçekten çok faydalı oldukları ortaya çıktı. Sadece şifreni yazarsan ve bilgisayar korsanı bilgisayara sızarsa, şifreni kolayca ele geçirebilir. Bunun yerine, giriş yapmak için bir şekilde sıfır bilgi ispatı kullanabilseydik nasıl olurdu? Onlara hiçbir şey ifşa etmeden sadece Chelsea olduğunu kanıtlayabilirdin. Bunu yapabilseydin harika olurdu, çünkü bilgisayar korsanı bilgisayara sızsa bile hiçbir şey öğrenemezdi; çünkü bilgisayar bile hiçbir şey öğrenmiyor.

Peki Chelsea, kendi kelimelerinle, sıfır bilgi ispatı nedir?

**Chelsea:** Sıfır bilgi ispatı, bir ifadenin kanıtıdır. Onlara nedenini veya ne olduğunu göstermezsin. Sadece küçük bir bölümünü gösterirsin veya aslında sihir numarası olmayan garip bir sihir numarası yaparsın ve ikna olurlar. Ve onlara nedenini veya buna benzer bir şeyi göstermemiş olursun.

#### Seviye 2: genç (3:31) {#level-2-teen-331}

**Amit Sahai:** Daha önce hiç sıfır bilgi ispatı terimini duymuş muydun?

**Genç:** Hayır, duymadım.

**Amit Sahai:** Bu, bir kanıtlayıcının bir doğrulayıcıyı bir şeyin doğru olduğuna, neden doğru olduğu hakkında hiçbir şey ifşa etmeden ikna etmesinin bir yoludur ki bu kulağa tamamen tuhaf geliyor. Yapmak istediğim şey, sana bu şifreyi bildiğimi, şifreyi sana ifşa etmeden kanıtlamak. Senin yapabileceğin şey ise küçük bir not, kesinlikle bilemeyeceğim bir sır yazmak. Onu katla, buraya koy. Ve sonra, eğer şifreyi biliyorsam, onu açıp bana ne yazdığını söyleyebilmeliyim.

Pekâlâ. "Köpeğimin adı Doug."

**Genç:** Şifrenin ne olduğunu anladın mı?

**Amit Sahai:** Hayır. Yani bu etkileşimin hiçbir yerinde zaten bilmediğin bir bilgi görmedin. Ve yine de seni şifreyi bildiğime ikna ettim.

**Genç:** Peki sıfır bilgi ispatının tam amacı nedir? Bir şeyi kanıtlamak ama kanıtladığın şey her neyse onu tehlikeye atabilecek kadar bilgi vermemek gibi bir şey mi?

**Amit Sahai:** İnsanlar birbirlerine güvenmiyorlar. Ve eğer birine sırlarımı ifşa etmek zorunda kalmadan bir şeyi doğru yaptığımı kanıtlayabilseydim, o zaman o kişi bana daha çok güvenirdi.

**Genç:** Bunun bilgisayar teknolojisiyle nasıl bir ilgisi var? Bu yüz yüze bir etkileşim mi?

**Amit Sahai:** Diyelim ki tanıdığın biriyle mesajlaşmak istiyorsun. Muhtemelen önce bir araya gelip gizli bir kod bulurdunuz, değil mi? Ve sonra birbirinize o kodla mesajlar yazardınız. Peki ya o kişiyle daha önce hiç tanışmadıysan? Ya benimle gizli mesajlar alıp vermek istersen ve biz daha önce hiç tanışmadıysak? Bunu nasıl yapabiliriz?

**Genç:** Hiçbir fikrim yok.

**Amit Sahai:** Kulağa imkânsız geliyor, değil mi? Ama değil. Fiziksel bir kilit veya fiziksel bir kutu kullanmazdın. Bunun yerine bu tür şeyleri yapmak için matematiği kullanırdık. Bir mesajı alıp matematik kullanarak şifreleyebilirsin. Ve sonra sana anahtarı bildiğimi kanıtlayabilir, onu açabilir ve sana geri gönderebilirim. Bu şekilde sana matematiksel kilitli kutunun matematiksel anahtarını bildiğimi kanıtlamış olurum.

Peki bugün tartıştıklarımıza dayanarak, kendi kelimelerinle, sıfır bilgi ispatı nedir?

**Genç:** Birinin bilmesini istediğin gerçekten önemli bir sırrın varsa ama onlara her şeyi anlatmak istemiyorsan kullanabileceğin bir şey gibi. Onlara bu sırrı kanıtlamak için sıfır bilgi ispatını kullanabilirsin, ancak tamamını ele vermezsin.

#### Seviye 3: üniversite öğrencisi (6:13) {#level-3-college-student-613}

**Amit Sahai:** Ne okuyorsun?

**Üniversite Öğrencisi:** USC Viterbi'de birinci sınıf bilgisayar bilimi öğrencisiyim. Veri, internet, Blokzincir ve kripto para gibi her şeyle ilgileniyorum.

**Amit Sahai:** Hiç sıfır bilgi ispatlarını duydun mu?

**Üniversite Öğrencisi:** Sadece laf arasında.

**Amit Sahai:** Aslında, Blokzincir alanı sıfır bilgi ispatlarının uygulandığını gördüğümüz alanlardan biri ve bence bu sadece başlangıç. Özünde, sıfır bilgi ispatı iki kişi arasındaki bir etkileşimdir. Seni bir ifadenin doğru olduğuna ikna edebilmeliyim, ancak bunun neden doğru olduğu hakkında hiçbir fikrin olmayacak.

Buna NP-tamlığı (NP-completeness) adı verilen bir şey aracılığıyla yaklaşacağız. NP-tam bir problem, çözülmesi gerçekten zor olan bir problemdir. Ancak bunu çözebilirseniz, NP sınıfındaki herhangi bir problemi çözebilirsiniz ve bu çok sayıda problemi içerir. Aslında sıfır bilgi ispatı aracılığıyla inanılmaz çeşitlilikte ifadeleri kanıtlamak için NP-tam bir problem kullanacağız. İnceleyeceğimiz spesifik NP-tam problemine harita üç renklendirme (map three-coloring) deniyor.

Burada, aynı renge sahip hiçbir ülkenin sınır paylaşmayacağı şekilde düzenlenmiş bir grup ülkenin bulunduğu bir haritamız var. Böyle bir haritayı geçerli bir şekilde renklendirilmiş yapan şey budur. Bir haritanın bu şekilde üç renkle boyanıp boyanamayacağının NP-tam bir probleme örnek olduğu ortaya çıkıyor.

Belki de asıl yapmak istediğin şey, Hesabının Adresini ifşa etmeden en az 0.3 Bitcoin'e sahip olduğuna dair bir sıfır bilgi ispatı sunmaktır. Görünüşe göre bu ifadeyi alıp bir ülkeler haritasına dönüştürebilirim. Bu ülkeler haritası ancak en az 0.2 Bitcoin'in varsa üç renkle boyanabilir olacaktır.

**Üniversite Öğrencisi:** Böyle bir şeyi nasıl sıfır bilgi ispatına dönüştürebiliriz?

**Amit Sahai:** Elbette ilk adım olarak tüm renkleri silmemiz gerekiyor. Bu zarfların her birinin içine bir renk koydum. Peki, bunun geçerli bir renklendirme olduğunu nereden biliyorsun? Bilmiyorsun. Herhangi iki komşu ülkeyi seçmelisin; onları istediğin gibi, rastgele seçebilirsin.

**Üniversite Öğrencisi:** Bu ikisini alabilir miyim?

**Amit Sahai:** Burada yeşil var ve şurada mavi var. Gördüğün gibi, bunlar iki farklı renk. Yani bunu doğru bir şekilde renklendirmeyi başardığıma dair biraz güvenin var, ama o kadar da fazla güvenin yok, çünkü sana ülkelerden sadece ikisini gösterdim. Daha fazla güven elde etmenin bir yolu daha fazlasını açmaktır, ancak bu sana bilgi ifşa etmek olur. Bunu yapmak istemiyorum.

Bu yüzden bunun yerine, senden lütfen arkanı dönmeni isteyeceğim. Ve şimdi, bu renkleri değiştirelim.

Rastgele iki ülke seçebilir misin, böylece iki rengi tekrar ortaya çıkaracağız.

**Üniversite Öğrencisi:** Bunu ve bunu alacağım.

**Amit Sahai:** Zaten sahip olduğun aynı ülkeyle kontrol etmen akıllıca. Ama göreceğin gibi, artık yeşil değil, mavi. Ve diğer taraftaki bu ise yeşil. Sana geçen sefer gösterdiğim renkler bu yeni renklerle uyuşmuyor. Ancak şu anda sana gösterdiğim bu renklendirme için işe yarıyor. Yani yaptığımız şey, parçaları bir araya getirmeni imkânsız hâle getirmek oldu. Ve bunu bin kez yaparsan ve ben sana her seferinde farklı renkleri doğru bir şekilde gösterirsem, gerçekten ikna olursun. Ve işte bu kadar; tüm sıfır bilgi ispatı bundan ibaret.

**Üniversite Öğrencisi:** Yani bu olasılıksal bir kanıt gibi mi?

**Amit Sahai:** Evet. Gerçek uygulamalarda zarf kullanmazdık; şifreleme kullanırdın. Ancak Protokol bu şekildedir.

**Üniversite Öğrencisi:** Peki sıfır bilgi ispatlarının daha geniş kapsamlı etkileri nelerdir? Uygulama için daha pratik olmaları mı amaçlanıyor, yoksa yapısal olarak bir şeyi kanıtlamaları mı?

**Amit Sahai:** Bu, bir şeyi daha verimli hâle getirmekle ilgili değil. Bu, daha önce nasıl yapacağımızı bilmediğimiz şeyleri yapmakla ilgili. Aslında sana, sırlarımın hiçbirini ifşa etmeden dürüst davrandığımı kanıtlayabilirim. Şifrelenmiş bir belgeyi, o gizli belgenin ne olduğunu ifşa etmeden doğru bir şekilde imzaladığımı sana kanıtlayabilirim. Oyunu değiştirme yeteneği, yani yapabileceklerimizi gerçekten değiştirme yeteneği, sıfır bilginin masaya getirdiği şeydir.

**Üniversite Öğrencisi:** Sence sıfır bilgi ispatlarını kullanarak nerede daha fazla güven inşa edebiliriz?

**Amit Sahai:** Harika bir örnek seçimlerdir. Bir seçimin doğru bir şekilde yürütüldüğünü, yani her Oyun sayıldığını ve hepsinin belirli bir toplamla bir kişinin kazanmasını sağladığını sıfır bilgi ile kanıtlayabilseydiniz, o zaman herhangi bir kişinin gerçek Oylarından vazgeçmek zorunda kalmazdınız. Ve yine de herkes bunun doğru bir şekilde yapıldığını görebilirdi.

#### Seviye 4: yüksek lisans öğrencisi (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Senin burada olman ve seninle konuşmak çok harika, Eli. Bana biraz araştırmandan bahsedebilir misin?

**Eli:** Araştırmam kriptografi üzerine. Özellikle, bazı çok partili hesaplama (multi-party computation) protokolleri üzerinde çalışıyorum. Şu anda üzerinde çalıştığım şey, Google Chrome veya Tesla gibi hizmet sağlayıcıların bireysel kullanıcıların verileri hakkında hiçbir şey öğrenmeden bu istatistikleri toplayabilmesi için toplu istatistikleri hesaplamaya yönelik bir sistem. Ben bir kullanıcı olarak Firefox'a en sevdiğim web sitesinin mylittlepony.com olduğunu bildirmek zorunda değilim. Ancak her gün kaç kullanıcının mylittlepony.com'a girdiğini bilebilirler.

**Amit Sahai:** Bu harika. Çok partili hesaplama benim için çok değerli bir konudur. Açıkçası, sıfır bilgi ispatları, kanıtladığınız şeyin ayrıntılarını ifşa etmeden başka bir kişiye bir şeyler kanıtlamakla ilgilidir. Ancak benim düşünceme göre, sıfır bilgi aslında bunun da ötesine geçiyor. Bu, çok partili hesaplamada çokça görebileceğiniz, bir görevi tam olarak başarmak için ihtiyacınız olandan daha fazlasını ifşa etmeden o görevi başarmak istediğiniz kapsayıcı bir kavramdır.

**Eli:** Doğru ve bu, dürüst davranmak için kullandığınız sırların hiçbirini ifşa etmeden dürüst davrandığınızı kanıtlamanıza olanak tanır. NP-tam diller için sıfır bilgi ispatlarının kriptografide çok büyük bir rol oynadığını biliyoruz. NP-tamlığı ile ilk deneyiminiz nasıldı?

**Amit Sahai:** İlk karşılaşmam lisans öğrencisiyken aldığım ilk algoritmalar dersindeydi. NP-tam bir dil, sadece kendisi hakkında bilgi vermekle kalmayan, aynı zamanda bu problemi çözmenin size gerçekten ilginç problemlerden oluşan koca bir sınıf hakkında bilgi verebileceği bu şaşırtıcı problemdir.

**Eli:** İspatları ilk kez birbirimizle konuştuğumuz etkileşimli bir oyun olarak düşünmeye başladığınızda, bu sıfır bilgiyi mümkün kıldı mı?

**Amit Sahai:** Kesinlikle. Ve rastgeleliğin bir şeyi kanıtlamak için yararlı olabileceği fikri, bir ispatın platonik idealini düşündüğümüzde yine çok mantığa aykırı görünüyor. Orada hiçbir rastgelelik, hiçbir belirsizlik (non-determinism) mevcut değildir.

**Eli:** Bunun, bir ispatı tamamen tersine çevirme fikriyle ilgisi var. Eski klasik bir ispatta rastgelelik, yapmaya çalıştığınız şeyin amacına özellikle aykırıdır, çünkü her şeyi açık hâle getirmeye ve bilgi akışını ortaya çıkarmaya çalışırsınız. Ancak bunu tersine çevirdiğinizde ve artık bunu yapmaya çalışmadığınızda, aniden rastgeleliğin tüm kötü özellikleri iyi hâle gelir.

**Amit Sahai:** Kesinlikle. Rastgelelik öngörülemezdir ve bizim istediğimiz de budur. Bu öngörülemezliğin aslında saklamak istediğimiz bilgiyi saklamasını istiyoruz. Üzerinde çalıştığın projelerde sıfır bilgiyi nasıl kullandın? Karşılaştığın zorluklar neler?

**Eli:** Genellikle en zor kısım, onu kullanmak için en iyi yerin tam olarak neresi olduğunu bulmaktır. Sıfır bilgiyi daha teorik bir şekilde kullanan bazı makaleler yazdım, ancak uygulamalara gelince, şimdiye kadar gördüğüm en heyecan verici uygulamalardan bazıları Blokzincir alanındaydı.

**Amit Sahai:** Verimlilik darboğazlarından bazıları nelerdir?

**Eli:** Sıfır bilgi ispatlarıyla ilgili en havalı şeylerden biri, çok fazla çeşidinin olmasıdır; ben onlara tatlar demeyi seviyorum. Genel olarak, uygulamada sıfır bilgi ispatlarını kullanırken, ana darboğaz kanıtlayıcı üzerinde olma eğilimindedir.

**Amit Sahai:** Kanıtlayıcının işini alıp birçok paralel hesaplamaya bölebilir misin?

**Eli:** Bu çok eğlenceli bir soru. Bence bir alan olarak bunun cevabını hâlâ bilmiyoruz. Son üç veya dört yılda gördüğüm en havalı şeylerden biri teorikten uygulamaya geçiş oldu; insanların son 30 yılda düşündüğü tüm bu harika sistemlerin aslında yapılabilecek kadar verimli hâle gelmeye başladığını görmek.

**Amit Sahai:** Hiç şüphe yok. Ve özellikle bulut bilişim ile; sıfır bilgi ispatlarını etkinleştirmek için bulutun gücünden yararlanmak harika olurdu. Ayrıca Blokzincir alanında, ispatların oluşturulmasını hızlandırmak istiyorsanız, bu dağıtık bir şekilde yapılabilirse harika olurdu. Sahip olduğum umutlardan biri, çok partili hesaplamanın gücünün, birbirine güvenmeyen insanları bir araya getirmekle ilgili olmasıdır. Kriptografideki bu gücü alıp şu anda toplumda var olan muazzam düzeydeki güvensizliğe yardımcı olmak için kullanabilir miyiz?

**Eli:** Sanırım çok partili hesaplamaya bu kadar ilgi duymamın nedenlerinden biri de bu. Dünyadaki en önemli sorunlardan biri, pek çok insanın birbirine güvenmemesi gerçeğidir. İnsanların birbirlerine güvenmek zorunda kalmadan birlikte çalışmasına olanak tanıyan bir teknoloji yaratmak için matematiği kullanabilmek gerçekten harika ve muazzam bir görev.

#### Seviye 5: uzman (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, seni tekrar görmek çok güzel. Sanırım en son 2017'de falan görüşmüştük.

**Shang-Hua:** Sanırım pandemi sırasında bir kez Zoom üzerinden görüşmüştük ama seni yüz yüze görmek güzel. Aslında 86'da RSA'nın A'sı olan Profesör Leonard Adleman'dan bir kripto dersi alıyordum. Bana Goldwasser, Micali ve Charlie Rackoff'un sıfır bilgi ispatı üzerine yazdığı makaleyi ödev olarak vermişti. Yani bu gerçekten de bu ülkedeki ilk sunumumdu; sıfır bilgi hakkındaydı.

**Amit Sahai:** Bu harika. Neredeyse hipnotik bir kavram.

**Shang-Hua:** Bu kavramları matematiksel olarak nasıl formüle edeceğimiz de ilginç. Örneğin, elimizde veri var. Sonunda veriden, veri madenciliği yoluyla enformasyon elde edebilirsiniz. Ve sonra "bilgi" (knowledge) denen bu kelime var. Bilgi felsefede bile uzun zamandır tartışılmaktadır. Bilgi nedir? Ancak burada matematikçilerin veya bilgisayar bilimcilerin bu bilgiyi yakalamak istedikleri çok büyüleyici bir yol var. "Sıfır enformasyon ispatı" dememiş. Peki sence neden "enformasyon" veya "sıfır veri ispatı" yerine "bilgi"? Açıkçası orada veri var, bu yüzden sıfır veri olamaz.

**Amit Sahai:** Kesinlikle. Bu soruya hâlâ tamamen tatmin edici bir cevabımız olduğunu sanmıyorum. Bu kadar güzel bir içgörü olan şey, sıfır bilginin zaten tahmin edebileceğiniz bir şey olması fikridir. Eğer cevabı zaten tahmin edebiliyorsanız, o zaman bu etkileşimden hiçbir bilgi kazanmıyor olmalısınız. Geleceği doğru bir şekilde tahmin edebilme ve bunun yeni bir bilgi eksikliğinin kanıtı olması şeklindeki bu içgörü, çok güzel ve şaşırtıcı bir içgörüydü.

**Shang-Hua:** Şey, burada sıfır enformasyon yok. Temel olarak, bilişim ve güvenlik perspektifinden bakıldığında önemli olan, ne kadar enformasyon kazandığınızdan ve ne kadar veriye sahip olduğunuzdan ziyade ne kadar bilgi kazandığınızdır. Veri, anında bilgi anlamına gelmez. Ancak insanlar bunu her zaman ayırt edemezler.

**Amit Sahai:** Doğru. Örneğin tıbbi araştırmalarda; bir ilaca sahip olmak ve bileşiğin yapısını ifşa etmek zorunda kalmadan bu modelde işe yaradığını kanıtlamak ne kadar harika olurdu?

**Shang-Hua:** Bu alandaki bir sonraki yönelimlerin neler olduğunu söylerdin?

**Amit Sahai:** Bu sıfır bilgi programları kavramı, tamamen keyfi hesaplamaları hiçbir etkileşim olmadan sıfır bilgi yoluyla gerçekleştirmenize olanak tanır. Programı alıp sıfır bilgi programına veya karmaşıklaştırılmış (obfuscated) bir programa dönüştürebilir ve sonra sana gönderebilirim. Onu çalıştırabilir ve benimle bir daha konuşmak zorunda kalmadan o hesaplamanın faydasını elde edebilirsin.

**Shang-Hua:** Bu doğru. Etkileşimsiz bir doğası var. Ancak içinde doğrulanabilirlik de var. Blokzincirde de deftere daha genel bir sıfır bilgi ispatı dâhil etmeye başladılar.

**Amit Sahai:** Kesinlikle şu anda sıfır bilginin giderek daha fazla kullanılacağı bir noktadayız. Sıfır bilgi alanında senin ve benim davet edilmediğimiz o kadar çok konferans ve toplantı var ki; çünkü bunlar biz matematikçiler için değil, geliştiren insanlar, programlayan insanlar için. Ve bence bu bir işaret. Bu, bebeğimizin büyüdüğünün ve artık geliştirilme zamanının geldiğinin bir işareti.

**Shang-Hua:** Bence derinden, öğrenciler bana sık sık hem kripto, sıfır bilgi ispatı açısından hem de gerçek dünyada ve matematiksel hesaplamada gelecekteki yönelimlerin neler olduğunu soruyorlar.

**Amit Sahai:** Bu harika bir soru. Keşke geleceği görebilseydim. Göremiyorum ama denememe izin ver. Bence son birkaç on yılda kriptografide çok şey yaptık ama çok az şey anlıyoruz. En temel yönü zorluğu anlamaktır; zor problemleri nasıl elde ederiz? Daha sonra verimli sıfır bilgi programları ve ispatları oluşturmak için kullanabilmek adına matematiksel olarak zor problemleri aslında nasıl inşa ederiz?

**Shang-Hua:** Sanırım kuantum hesaplamada da daha da zor problemlere ihtiyacınız var.

**Amit Sahai:** Gerçekten de öyle. Artık üzerimize doğru gelen kuantum hesaplama hayaleti olduğuna göre, hepimiz kuantum bilgisayarların birçok kriptografik sistemi kırabileceğini biliyoruz. Bu derin bir zorluk. Peki kuantum dirençli olan, yani kuantum bilgisayarların bile kıramayacağı yeni zorluk kaynakları bulabilir miyiz? Bu, son birkaç yıldır üzerinde çalıştığım bir şey.

**Shang-Hua:** Ama eminim ki güzel matematiği motive edeceklerdir.

**Amit Sahai:** Evet, bu doğru. Gerçek dünyayla ilgili harika şeylerden biri, gerçek dünyadaki insanların taleplerinin olmasıdır. Ve bu talepler genellikle imkânsız gibi gelir. İşte biz burada devreye giriyoruz; imkânsızı mümkün kılmak bizim işimiz.