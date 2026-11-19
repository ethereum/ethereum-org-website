---
title: "Veri Gizliliği Günü özel - Meta veri gözetimi ve Nym"
description: "Meta veri gözetimi üzerine bir Veri Gizliliği Günü sohbeti: mesaj içerikleri şifrelenmiş olsa bile meta verilerin sizin hakkınızda neler ortaya çıkardığı ve Nym gibi ağ düzeyindeki gizlilik araçlarının onu korumak için nasıl çalıştığı."
lang: tr
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Gizlilik"
---

**Nym**'den, Nym Baş Bilim İnsanı Claudia Diaz ile meta verilerin işleyişini, modern gözetimdeki kritik rolünü, açığa çıkardığı kişisel ayrıntıları ve gizliliğimizi geri almak için atabileceğimiz adımları inceleyen bir sunum.

*Bu transkript, Nym tarafından yayınlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=QBX5AK3DXqw) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

### Giriş (0:04) {#intro-004}

İletişim meta verisi nedir? Bir iletişim hakkında, gerçekte söylenenlerin içeriği olmayan her şeyi ifade eder. Bu, örneğin iletişimin kaynağını, hedefini, bilginin gönderildiği zamanı, ne kadar bilgi gönderildiğini ve alınıp verilen paketlerin zamanlamaları ile boyutları da dahil olmak üzere tespit edilebilir tüm kalıpları içerir.

### İletişim meta verileri (0:27) {#communications-metadata-027}

İletişim meta verileri tüm internet protokollerinde varsayılan olarak açığa çıkar: TCP/IP, HTTP, UDP, FTP. İçeriği uçtan uca şifreleme ile koruyan TLS veya güvenli DNS gibi güvenli protokoller bile iletişim meta verilerini göstermeye devam eder: kaynak, hedef, zamanlama, uzunluk vb.

Peki bu bilgiler açığa çıkıyor ama kime? Bunları kim elde edebilir?

### Meta verilere kimler erişebilir (1:10) {#who-gets-access-to-metadata-110}

İnternet iletişiminde aracı olan ve bu iletişim meta verilerine erişebilen bir dizi varlık vardır. Buna internet servis sağlayıcıları, değişim noktaları, otonom sistemler, BGP yönlendiricileri ve genel olarak internet omurgası katılımcıları gibi internet altyapısındaki büyük oyuncular dahildir; bunlar birçok iletişim meta verisine erişebilirler. 

Ancak Wi-Fi yönlendiricisini veya yerel alan ağını çalıştıran herhangi biri veya yerel olarak gizlice dinleme yapabilen biri gibi küçük oyuncular bile iletişim meta verilerine erişebilir. Ve elbette, NSA gibi ulus-devlet düzeyindeki düşmanların büyük ölçekte meta veri topladığı ve her türlü istihbaratı çıkarmak için bunları analiz ettiği bilinmektedir.

### Meta veriler neden önemlidir (2:00) {#why-is-metadata-important-200}

Meta verilerin toplanması ve kullanılması için çok ilginç bir veri türü olmasının başka nedenleri de vardır. Makine tarafından okunabilirdir, çünkü bilgisayarların dilini konuşur; temelde bilgisayarların iletişimleri kaynağından hedefine uygun bir şekilde yönlendirebilmesi için bir dildir. Yani makine tarafından okunabilirdir ve bu, makinelerin onu büyük ölçekte çok kolay bir şekilde anlamlandırabileceği anlamına gelir; doğal insan dilinin aksine, yorumlanması çok daha zordur, çünkü belki insanlar kelimeleri belirli bir şekilde kullanıyorlardır veya nüansları vardır ve bunu yorumlamak çok daha zordur. Meta veriler ise gerçekten kolaydır.

Ayrıca içeriğe göre çok daha düşük bir hacme sahiptir. Örneğin bir YouTube videosunu düşünürseniz, içeriğin kendisi birden fazla gigabayt olabilir, ancak meta veriler yalnızca videonun URL'sinin ne olduğunu, kaç bayt içerdiğini ve saat kaçta izlendiğini içerir. Dolayısıyla gerçek içerikten çok daha az olabilir ve boyut açısından da yönetilebilirdir.

Meta veriler ayrıca içeriğe göre çok daha düşük bir korumaya sahiptir. İnsanların iletişimlerini öylece ele geçirmek ve içeriğine bakmak yasal değildir, bu yasalarla korunmaktadır. Ancak meta veriler, o kadar hassas kabul edilmediği için çok daha düşük bir korumaya sahiptir. Bu nedenle birçok kurum, insanların internette ne yaptığı hakkında bilgi edinmek için bu meta verileri yasal olarak toplayabilir ve analiz edebilir.

Peki bu büyük bir sorun mu? Şöyle diyebiliriz: "Eh, bu sadece meta veri. Ne söylediğimi bilmediğin sürece, kiminle ve ne zaman konuştuğumu bilmen konusunda gerçekten endişelenmeli miyim?" 

Meta verilerin aslında ne kadar son derece değerli kabul edildiğini gösteren birkaç alıntı var. NSA genel danışmanı Stewart Baker, meta verilerin size birinin hayatı hakkında kesinlikle her şeyi anlattığını söyledi; yeterince meta veriniz varsa, içeriğe gerçekten ihtiyacınız yoktur. Birinin neyle ilgilendiğini, sosyal ağının kim olduğunu, hobilerinin neler olduğunu, niyetlerinin neler olduğunu, ilgi alanlarının neler olduğunu anlayabilme konusunda işte bu kadar güçlüdür. Aslında ne söylediklerini duymanıza gerek yoktur; tüm meta verileri gözlemleyebilmeniz yeterlidir.

Ve Whitfield Diffie ve Susan Landau, *Privacy on the Line* adlı kitaplarında, iletişim istihbaratının omurgasının kriptanaliz değil, trafik analizi olduğunu söylüyorlar. Bunun nedeni, onu büyük ölçekte toplayabilmeniz, büyük ölçekte analiz edebilmenizdir ve size tüm büyük kalıpları, tüm büyük resmi verecektir, bu da daha sonra en ilginç bulduğunuz belirli hedeflere sızmak için onlara odaklanmanıza olanak tanır. Ancak onları önce meta veriler üzerindeki trafik analiziyle bulursunuz.

Meta verilerin trafik analizi, kriptografiyi kırmadan şifrelenmiş içeriği kurtarmak için bile kullanılabilir. Mükemmel bir kriptografiye sahip olduğumuzu varsayalım: hiçbir kriptanaliz çabasının onu kıramayacağını ve gizli anahtarların tamamen gizli olduğunu. Bu içeriğin korunduğuna ve bir düşmanın bu içerik hakkında bilgi edinemeyeceğine güvenmeliyiz. 

Ancak, iletişim meta verilerinin trafik analizinin bu şifrelenmiş içeriği ortaya çıkaran bir yan kanal olarak işlev görebileceği birçok durum vardır.

### Meta veri gözetimi (5:15) {#metadata-surveillance-515}

Bunun bir örneği, HTTPS ile bir web sitesinde gezindiğiniz zamandır. Prensip olarak, bu web sitesiyle iletişim şifrelenmiş olduğundan, iletişiminizi gözlemleyen biri web sitesinde hangi belirli sayfaya eriştiğinizi söyleyemez. Örneğin, hastalıkları kontrol etmek için WebMD'ye gidiyorsanız, bir gözlemci veya gizlice dinleyen kişi, "Tamam, WebMD tıbbi bilgilerini kontrol ediyorsun" diyebilir, ancak hangi belirli hastalığı aradığınızı söyleyemez.

Ancak, bu senaryoda birinin ne yaptığını öğrenmenin yolu, bir düşmanın önce sitedeki tüm sayfaları indirmesi ve her sayfa için iletişim hattında görülen paketlerin modelini kaydetmesidir. Temel olarak, hangi yöne kaç paket gittiği, bu paketlerin boyutlarının ne olduğu ve bir paket ile diğeri arasındaki paketler arası sürenin ne olduğu. 

Bunu yaparak, bu sayfaların her birinin bir parmak izini oluşturabilirsiniz, böylece hedef şifrelenmiş siteden bir sayfa indirdiğinde, web sayfasının kendisi şifrelenmiş olsa ve bu içeriği öğrenememeniz gerekse bile, hangi belirli web sayfasına baktıklarını tahmin etmek için her yöndeki paket sayısını ve boyutlarını eşleştirebilirsiniz.

Bu açıkça endişe vericidir. Uçtan uca şifrelemeye sahip olabilsek de, iletişimlerimizin gizliliğini koruma konusunda daha kat etmemiz gereken çok yol var.

### Özel iletişimler için bir dilek listesi (6:40) {#a-wish-list-for-private-communications-640}

Peki, mükemmel derecede güvenli bir iletişim ağının neler sunacağına dair bir dilek listemiz olmasını isteseydik, istediğimiz özellikler neler olurdu? 

Açıkçası, bir kullanıcının şifrelenmiş kanal üzerinden ne söylediğini korumak istiyoruz ve uçtan uca şifreleme bunu başarmak için zaten çok önemli bir adımdır. Ancak sadece bu değil, aynı zamanda kullanıcının kiminle iletişim kurduğunu, yani iletişim ortağının kim olduğunu, kimden paket aldığınızı veya kime paket gönderdiğinizi de gizlemek istiyoruz. Ayrıca konum, yani nereden iletişim kurduğunuz; ne zaman ve ne kadar süreyle iletişim kurduğunuz; kaç bayt veri alışverişinde bulunduğunuz; ve iletişimdeki diğer tüm kalıplar. Hatta birinin iletişim kurup kurmadığını bile gizlemek istediğimizi söyleyecek kadar ileri gidebilirsiniz.

Bunların hepsi anonim iletişim sistemlerinin sağlamayı amaçladığı özelliklerdir ve çözüm alanında, mixnet'ler bu tür özellikleri sağlamak için sahip olduğumuz en iyi çözümlerden biridir.