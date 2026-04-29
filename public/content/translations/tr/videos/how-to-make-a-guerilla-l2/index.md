---
title: "Gerilla bir l2 nasıl yapılır"
description: "Fatemeh Fannizadeh ve Melanie Premsyl, gizlilik, özgürlük ve direniş araçları olarak Katman 2 ağları oluşturmayı, Blokzincir altyapısını bir cypherpunk ve aktivist merceğinden yeniden hayal etmeyi anlatıyor."
lang: tr
youtubeId: "WlsICV2OPAE"
uploadDate: 2025-11-23
duration: "0:15:55"
educationLevel: intermediate
topic:
  - "gizlilik-ve-güvenlik"
  - "ölçeklendirme-ve-katman-2"
  - "gizlilik"
  - "katman-2"
format: interview
author: Web3Privacy Now
breadcrumb: "Gerilla l2"
---

**Fatemeh Fannizadeh** ve **Melanie Premsyl**, Buenos Aires'teki Ethereum Cypherpunk Kongresi'nde (ECC#2), anarşist felsefe ile Blokzincir mimarisinin kesişimine derinlemesine bir bakış sunarak, Blokzincir altyapısını bir cypherpunk ve aktivist merceğinden yeniden hayal edip, gizlilik, özgürlük ve direniş araçları olarak katman 2 (l2) ağları oluşturma üzerine bir sunum yapıyor.

*Bu döküm, Web3Privacy Now tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=WlsICV2OPAE) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş ve anarşist felsefe (0:05) {#introduction-and-anarchist-philosophy-005}

**Fatemeh Fannizadeh:** [Alkışlar] Burada olduğunuz için teşekkürler. Biliyorum şu an Vitalik konuşuyor. Birkaçınızın oradaki matcha sırasında değil de burada olması gerçekten bir onur. Bugün gerilla l2'ler hakkında bir sohbet gerçekleştireceğiz ve sanırım o konuya gireceğiz, ancak size burada bize katılma onurunu bahşeden Fransız filozof ve anarşist Melanie Premsyl'i takdim ediyorum. Kendinden biraz bahsetmek ister misin?

**Melanie Premsyl:** Evet. Herkese merhaba. Ben Fransız bir filozofum. Anarşi ve teknoloji üzerine çalışıyorum ve başlangıçta daha çok bölge tarafındaydım. Örneğin Fransa'nın merkezinde, Tarnac'ı veya daha şiddet yanlısı olan o tür grupları bilir misiniz bilmiyorum. Karşılaştığım temel sorun, dünyadaki diğer insanlarla bağlantı kurmamız gerektiğiydi ve birçok anarşist grup çok kısıtlı. Amerika veya Güney Amerika'dan daha fazla insanla iletişim kurabileceğimiz bir yola ihtiyacımız var. İşte bu yüzden şimdi kripto ile ve gizlilik eksikliğine, özgürlük eksikliğine ve devletin şiddetine karşı savaşmak için yeni yollar bulmaya çalışan herkesle bir köprü kurmaya çalışıyoruz.

#### MEV kardeşler davası (1:52) {#the-mev-brothers-trial-152}

**Fatemeh Fannizadeh:** Harika. Temel olarak, birkaç hafta önce New York'ta tanıştık. İkimiz de Manhattan'da görülen ve MEV kardeşler olarak bilinen bu iki kardeşin bazı sandviç botlarını sandviçledikleri için yargılandıkları bir davaya katılıyorduk. Davayı izlemek için mahkemeye gittim ve buradaki bu kişinin Fransızca Spinoza okuduğunu gördüm ve neler olduğunu gerçekten merak ettim. İzleyiciler arasında ikimizden başka kimse yoktu! Bu yüzden, bir teknoloji uzmanından ziyade her şeyden önce bir anarşist ve filozof olarak sizi bu özel davaya katılmaya, aynı zamanda Ethereum'un yönetişim yapısını, tüm doğrulama sistemini ve New York'ta gerçekleşen davayı düşünmeye iten şeyin ne olduğunu gerçekten merak ettim. 

**Melanie Premsyl:** Sanırım sadece Amerika Birleşik Devletleri'nin Ethereum'u kontrol etmeye çalışıp çalışmadığını anlamaya çalışıyordum. Çünkü Avrupa'da, bir mevzuatımız olmaması nedeniyle kripto konusunda oyunun çok dışındayız ve ben de sadece durumu kontrol ediyordum. 

**Fatemeh Fannizadeh:** Peki Amerika Birleşik Devletleri'nin Ethereum'u kontrol etmeye çalıştığını düşünüyor musun? 

**Melanie Premsyl:** Bence bu büyük bir soru. Bence Amerika Birleşik Devletleri herkesi kontrol etmeye çalışıyor. 

**Fatemeh Fannizadeh:** Tamam. Evet, bu oldukça makul. Davayı takip etmeyenler için, yaklaşık üç veya dört hafta sonra dava düştü. Jüri oybirliğiyle bir karara varamadı ve bu iki kardeşin Blokzincir kurallarını ihlal etmekten suçlu olup olmadığına karar veremedi; bence bu kripto için oldukça olumlu bir sonuç, bir mahkemenin veya jürinin zincir içi neyin doğru neyin yanlış olduğuna karar vermemesi. 

#### Blokzincir ile diğer topluluklar arasında köprü kurmak (4:06) {#bridging-blockchain-with-other-communities-406}

**Fatemeh Fannizadeh:** Ama tamam, anarşistlerin temel olarak farklı gruplar arasında köprü kurmak amacıyla bu teknolojiyi incelemesi hakkında söylediklerine bir adım geri dönersek. 

**Melanie Premsyl:** Evet. Sanırım burada sadece tek bir amaç için bulunuyorum. Ben bir teknoloji kızı değilim veya kripto oyununun bir parçası değilim, ancak başka bir bakış açısıyla izlediğim şey, Blokzincir'in gerçekten yıkıcı bir güce sahip olduğu ancak daha bölgeselleşmiş diğer topluluklara ulaşamadığıdır. Bence amaçlardan biri renkli bir Blokzincir yaratmak, örneğin neden l2'ler hakkında konuşmak istiyoruz, diğer geçmişlere, diğer hayal güçlerine ve imgelere sahip yeni toplulukların nasıl yaratılacağı gibi.

**Fatemeh Fannizadeh:** Dürüst olmak gerekirse, Devconnect'te olman benim için gerçekten harika, çünkü bu topluluğa, yaptıklarımıza ve etkinliklerimize taze bir bakış açısı getiriyorsun. Dün etkinlikten etkinliğe atlayarak çok zaman geçirdik ve senin geri bildirimlerini aldım; bu benim artık görebilecek donanıma sahip olmadığım bir şey, çünkü yıllardır temel olarak bu tiyatroyla uğraşıyoruz. Hepimiz arkadaşız, bu yüzden birbirimize karşı çok nazik davranıyoruz. Ancak bu eleştirel bakış açısı harika. Bence bundan faydalanabiliriz, özellikle de anarşistlerin veya belki de daha solcu insanların teknolojimizle hala ilgilendiğini görmek beni gerçekten heyecanlandırdı. Her ne kadar kripto Twitter kavgaları olsa da, belki de topluluğun bu yönünden haberdar olmaman daha iyidir. Ancak Ethereum'un komünist bir teknoloji olduğuna dair tartışmalar... Bu sana doğru geliyor mu? Sence Ethereum'un komünist bir teknoloji olduğunu söylemek doğru mu? 

**Melanie Premsyl:** Evet, bunu söylemek isterdim ama emin değilim, çünkü biliyorsun para kazanması gereken çok insan var, yani bunun temel amacı da bu. Ancak bence onu sadece net bir komünist gibi kullanabiliriz, sadece bir kısmı böyle bir hayal olabilir. Bence bu yapılabilecek rüya gibi bir pasta, ancak insanların neye benzediğini anlamaları için teknik, çok mühendislik odaklı düşünce tarzından çıkmalarına yardımcı olacak araçlara ve tasarıma ihtiyacımız var.

#### Merkeziyetsizlik ve Katman 2'ler (6:55) {#decentralization-and-layer-2s-655}

**Fatemeh Fannizadeh:** Bu bana birkaç yıl önceki DAO'ları çok hatırlatıyor. Sizi bilmem ama ben gerçekten heyecanlıydım, DAO'ların zincir içi gruplar ve topluluklar olarak örgütlenme şeklimizde ve sahip olduğumuz özgürlükte devrim yarattığını düşünüyordum. Ve sonunda, tüm bunlar suya düştü. Bence hiç de gerçekleşmedi. Sadece oylama sistemiyle ilgili bir hale geldi, gerçekten demokratik değil, tamamen kar elde etmekle ilgili. DAO'ları sosyal bir araç olarak gördüğümüz bu fikrin tamamı pek de hayata geçmedi. 

**Fatemeh Fannizadeh:** Ancak bence son zamanlarda Blokzincir'in bize sunduğu bu araçlar ve Blokzincir'in beş ila on yıl içinde nasıl evrileceğini nasıl hayal edebileceğimiz hakkında çok konuştuk ve Ethereum'un gizli hale gelmesi hakkında pek çok konuşma yapılıyor. Bence önümüzdeki yol kesinlikle bu: katman 1 (l1)'in gizlilik odaklı bir l1 olması. Ve ayrıca Rollup odaklı yol haritası var. Yani l2'lerin ve toplamaların son kullanıcılardan ziyade Ethereum'un ana kullanıcıları haline nasıl geleceği. Son kullanıcılar daha sonra l1'deki DAO'ların bir parçası olmak yerine çeşitli toplamaların veya l2'lerin bir parçası olmaya geçecekler. Peki, bahsettiğiniz bu alt komünist anarşist özgürlük alanını inşa etmek için hayal gücümüzü Ethereum'un bu tür bir geleceğine temelde nasıl yansıtabiliriz? 

**Melanie Premsyl:** Ben Fransızım. Bu büyük bir sorun. Fransız olduğumuz için çok devletçi bir milletiz. Bu yüzden her zaman pedagojik ve çok yukarıdan aşağıya bir şekilde düşünüyorum. Ve bence l2, herkesin mini Blokzincir'ler yaratabileceği ve bunların katman 1 (l1) tarafından güvence altına alındığı bir yol yaratıyor. İnsanların ücretsiz bir şey için herkese pedagojik yardım yaratıp yaratamayacağını görmek isterim. Bence dernekler gibi pek çok grup kendi Blokzincir'ini yaratabilir ve bu bir yol olacaktır; bilirsiniz, federalizm anarşizmin en büyük ana konusudur. İnsanların belki birbirlerinden nefret etmeyi ama yine de birbirleriyle konuşmayı nasıl başarabilecekleri. Bu yüzden Blokzincir'de bu tür bir federalizme ihtiyacımız var. Herkesin kendi değerine sahip bir katman 2 (l2)'si var ve böylece aynı altyapı ile konuşuyoruz. 

#### Anarşi, özgürlük ve araçlar inşa etmek (9:53) {#anarchy-freedom-and-building-tooling-953}

**Fatemeh Fannizadeh:** Evet, temelde birbirimizden nefret edip yine de iletişim kurmak, yani farklılıklarımıza rağmen toksik olmamak hakkında söylediklerini gerçekten sevdim. Ve bu senaryoda Ethereum olacak tek bir l1 olması gerçeği de sıklıkla faşist olarak adlandırılıyor çünkü hepimizin bu tek kurallar bütünüyle hemfikir olması gerekiyor. Yani herkes için eşit olan tek bir sistem var ve temelde bu l1'e boyun eğmek zorundasınız ya da uzaklaşabilirsiniz, bu tamamen başka bir soru. Ancak bunu çeşitli küçük Rollup l2 ekosistemlerine doğru merkeziyetsizleştirebilirsek, o zaman bu ortak altyapı içinde uyumsuzluğu ve anlaşmazlığı geri getirebiliriz. 

**Melanie Premsyl:** Evet, kesinlikle. Bence harikasınız. Doğru bir düşünce tarzına sahip teknoloji insanlarına büyük bir sorumluluk düştüğünü düşünüyorum. Bugünlerde iyi bir şeyler yapmaya çalışan tek kişiler sizlersiniz ve bu yüzden sadece kendi hayal dünyanızda kalamazsınız. Ve dediğin gibi, belki de faşizm sorunu; sanki sadece bir taneyiz, büyük bir sorumluluğunuz var. Bu sadece Ethereum'u kullanmak veya sadece gizlilik değil, sanki yeni teknolojik dünyayı yaratıyoruz ve sadece teknoloji insanlarının mı olacağı, yoksa teknoloji insanlarının daha fazla özgürlük isteyen herkesle bağlantılı mı olacağı arasında seçim yapmak zorundayız.

**Fatemeh Fannizadeh:** Komünizm ve anarşizmden çok bahsettik ve bunlar kripto dünyasında neredeyse küfür gibi hissettiriyor. Biliyorsun, çok lekelenmiş durumda ve bu kavramdan bahsedersen anında eleştiri alıyorsun. Ve bilmiyorum, belki yanılıyorum ama ben kriptoya katıldığımda daha fazla hacker vardı ve anarşist estetik daha belirgindi. Atmosfer daha çok... böyle olmak havalıydı, bu yüzden pek çok insan kendini bununla özdeşleştiriyordu. Bugünlerde etrafta hala çok var gibi hissediyorum ama belki daha çok gizlenmiş durumdalar. Mesela, odada gizli bir anarşist var mı? Bilmiyorum! Bence varlar. Bu yüzden belki bir adım geri atalım diyorum, komünizm veya anarşizmin aslında ne olduğunu tanımlayabilir misin?

**Melanie Premsyl:** Evet. Hayır, bence anarşizm çok basit olması yönüyle pek iyi bilinmiyor. Sadece kendi kendine örgütlenmeye ulaştığımız zamandır. Yani özgürlük cepleri, anarşi cepleri olduğunda, örneğin insanlar sadece arkadaşlarıyla, bir dernekle, işte de birlikte konuştuklarında ve anlamak ve karar vermek için bir şefe, bir başkana ihtiyaç duymadıklarında. Çünkü eninde sonunda insan sorunu, insanların bir şefe sahip olmak istemesidir. Anarşizm sadece başkası tarafından kontrol edilmeye yönelik o derin arzuya karşı savaşmaya çalışıyor. Gerçekten özgür olmak istiyor muyuz? Soru bu ve bunu birlikte yapmayı nasıl başarabiliriz? 

**Fatemeh Fannizadeh:** Dün söylediğin ve bence çok yerinde olan bir şey de herkesin hayatında anarşiyi yaşadığıydı. Bazı insanlar, "Ah, anarşi, ondan çok uzağız. Siz sadece gericisiniz, düzen karşıtısınız, devlet karşıtısınız," diyor. Ama aslında herkes, ister ailesinde, ister arkadaşlığında, isterse bir tür ilişkisinde olsun, kuralların kişilerarası dinamik aracılığıyla yaratıldığı bir tür kuralsızlık, anarşi aleminde geziniyor. Yani herkesin hayatında bir düzeyde anarşi var ve bence oradan başlamak, belki de bu konuda konuşmayı daha somut hale getiriyor.

**Melanie Premsyl:** Evet. Evet. İşte bu yüzden Blokzincir'in bu düşünce tarzıyla gerçekten anarşist olduğunu düşünüyorum. 

**Fatemeh Fannizadeh:** Tamam. Harika. Bence bu belki de bitirmek için mükemmel bir cümle. Blokzincir anarşisttir. Ve ayrıca bunu toparlamak gerekirse, bence gerçekten önemli olan veya Blokzincir'de görmeyi gerçekten çok isteyeceğim şey daha fazla araçtır. Çünkü anarşist grupların veya daha otonom egemen grupların gelip sadece bir ürünün kullanıcıları olmasını hayal etmek benim için zor. Bu anlamda illa ki bir pazar uyumu yok. Tamamen hazır bir ürünü öylece benimsemeleri pek olası değil. Aksine, onlara kendi ürünlerini inşa etmeleri için hammadde verirseniz. Yani daha çok kendin yap (DIY) gibi, kendi araçlarınızı, kendi l2 Rollup'ınızı, adına ne derseniz deyin, onu inşa edin. Bence bu, kriptoyu bizimle daha da uyumlu hale getirecektir. Merci beaucoup. [Alkışlar]