---
title: Akıllı sözleşmeler
description: Akıllı sözleşmelere teknik olmayan bir giriş
lang: tr
---

# Akıllı sözleşmelere giriş {#introduction-to-smart-contracts}

Akıllı sözleşmeler [Ethereum uygulamalarının](/dapps/) temel yapı taşıdır. Bunlar, geleneksel sözleşmeleri dijital benzerlerine çevirmemizi sağlayan blokzincir üzerinde depolanan bilgisayar programlarıdır. Akıllı sözleşmeler gayet mantıksaldır; "bu olduysa şu olmalı" yapısını takip ederler. Bu, programlandıkları gibi davranacakları ve değiştirilemeyecekleri anlamına gelir.

"Akıllı sözleşme" terimini Nick Szabo ortaya atmıştır. 1994'te [konsepte bir giriş](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) ve 1996'da [akıllı sözleşmelerin neler yapabildiğiyle ilgili bir inceleme](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) yazdı.

Nick Szabo bu otomatik, kriptografik olarak güvenli süreçler üzerine inşa edilmiş dijital bir pazar öngördü. İşlemlerin ve iş fonksiyonlarının güven sorunu ortadan kaldırılarak, aracılar olmadan gerçekleşebildiği bir yer. Ethereum üzerindeki akıllı sözleşmeler bu vizyonu hayata geçirdi.

## Sözleşme nedir? {#what-are-contracts}

Şöyle düşünüyor olabilirsiniz: _"Ben avukat değilim! Neden sözleşmeleri umursayayım?"_. Çoğu insan için sözleşmeler, gereksizce uzun koşul ve şart anlaşmalarını veya sıkıcı yasal belgeleri akla getirir.

Sözleşmeler anlaşmalardan ibarettir. Yani her türden anlaşma bir sözleşmenin koşullarıyla özetlenebilir. Sözlü anlaşmalar veya kâğıt-kalemle yapılan sözleşmeler birçok şey için kabul edilebilirdir, ancak bu yöntemler kusursuz değildir.

### Güven ve sözleşmeler {#trust-and-contracts}

Geleneksel sözleşmelerle ilgili en büyük sıkıntılardan biri sözleşmenin sonuçlarını harfiyen gerçekleştirecek şahıslara duyulan ihtiyaçtır.

İşte bir örnek:

Alice ve Bob bisiklet yarışı yapıyorlar. Diyelim ki Alice, Bob'la yarışı kazanacağına dair 10 dolar bahse girdi. Bob kazanacağından emindir ve bahsi kabul eder. Sonunda Alice yarışı Bob'un çok önünde bitirir ve açık ara kazanan olur. Ama Bob, Alice'in hile yaptığını iddia ederek bahsi ödemeyi reddeder.

Bu küçük örnek, akıllı olmayan anlaşmalarla ilgili sorunu göstermektedir. Anlaşmanın koşulları sağlansa bile (yani yarışmanın kazananı siz olsanız bile) hâlâ anlaşmayı yerine getirmesi için (yani bahis ödemesinin yapılması için) başka bir kişiye güvenmelisiniz.

## Akıllı sözleşmeler {#smart-contracts}

Akıllı sözleşmeler, sözleşme koşulları sağlandığında bir anlaşmanın koşullarını otomatik olarak yürütülecek bilgisayar koduna çevirerek anlaşmaları sayısallaştırırlar.

### Dijital bir otomat {#vending-machine}

Akıllı sözleşmeler için basit bir metafor akıllı sözleşmeye benzer sayılabilecek şekilde çalışan otomatlardır; belirli girdiler önceden belirlenmiş çıktıları garantiler.

- Bir ürün seçersiniz
- Otomat ürünün satın alımı için gereken miktarı döndürür
- Doğru miktarı girersiniz
- Otomat doğru miktarı girdiğinizi doğrular
- Otomat seçilen ürünü verir

Otomat istediğiniz ürünü sadece tüm gereksinimler karşılandığında verecektir. Eğer ürün seçmezseniz veya yeterli parayı girmezseniz otomat ürününüzü vermeyecektir.

### Otomatik yürütüm {#automation}

Akıllı sözleşmelerin sıradan sözleşmelere göre sahip olduğu en önemli yararlardan biri, sonucun sadece sözleşme koşulları gerçekleştiğinde otomatik olarak yürütülmesidir. Bir insanın sonucu gerçekleştirmesi için beklemeye gerek yoktur. Başka bir deyişle, akıllı sözleşmeler güvene duyulan ihtiyacı ortadan kaldırır.

Örneğin, bir çocuk için fonu bloke altında tutan ve onun belirli bir tarih sonrasında fonu çekmesine izin veren bir akıllı sözleşme hazırlayabilirsiniz. Eğer fonu belirlenen tarihin öncesinde çekmeye çalışırsa akıllı sözleşme yürütülmeyecektir. Ya da bir galericiye ödeme yaptığınızda arabanın tapusunun dijital halini size otomatik olarak veren bir sözleşme hazırlayabilirsiniz.

### Tahmin edilebilir sonuçlar {#predictability}

Geleneksel sözleşmelerin en büyük eksikliklerinden biri insan faktörüdür. Örneğin, iki farklı hakim geleneksel bir sözleşmeyi farklı şekillerde yorumlayabilir. Yorumları farklı kararların verilmesine ve alakasız sonuçların ortaya çıkmasına sebep olabilir. Akıllı sözleşmeler farklı yorum olasılığını ortadan kaldırır. Bunun yerine, akıllı sözleşmeler sözleşmenin kodu dahilindeki koşullara bağlı olarak eksiksiz şekilde yürütülür. Bu kesinlik, aynı şartlar sağlandığında akıllı sözleşmenin aynı sonucu ortaya çıkaracağı anlamına gelir.

### Herkese açık kayıt {#public-record}

Akıllı sözleşmeler denetim ve takip için de kullanışlıdır. Ethereum akıllı sözleşmeleri herkese açık bir blokzincir üzerinde olduğu için herkes varlık aktarımlarını ve diğer bağlantılı bilgileri anında takip edebilir. Örneğin, birinin adresinize para gönderip göndermediğini görmek için kontrol edebilirsiniz.

### Gizlilik koruması {#privacy-protection}

Akıllı sözleşmeler ayrıca gizliliğinizi de koruyabilir. Ethereum takma adlı bir ağ olduğu için (işlemleriniz herkese açık olarak eşsiz kriptografik bir adrese bağlıdır, kimliğinize değil) gizliliğinizi gözlemleyicilerden koruyabilirsiniz.

### Açık koşullar {#visible-terms}

Son olarak, geleneksel sözleşmelerde olduğu gibi akıllı sözleşmelerin içeriğini de imzalamadan önce (veya başka şekillerde etkileşime geçmeden önce) kontrol edebilirsiniz. Daha da iyisi, sözleşmedeki koşulların herkese açık şeffaflığı herkesin sözleşmeyi inceleyebileceği anlamına gelir.

## Akıllı sözleşme kullanım durumları {#use-cases}

Yani akıllı sözleşmeler blokzincir üzerinde yaşayan bilgisayar programlarıdır. Otomatik olarak yürütebilirler. İşlemlerini takip edebilir, nasıl davrandıklarını tahmin edebilir ve hatta takma adla kullanabilirsiniz. Çok havalı. Ama ne işe yarar? Akıllı sözleşmeler aslında diğer bilgisayar programlarının yaptığı her şeyi yapabilirler.

Hesaplamalar gerçekleştirebilir, para birimleri oluşturabilir, veri tutabilir, NFT'ler basabilir, iletişim gönderebilir, hatta grafikler oluşturabilirler. İşte gerçek dünyadan bazı popüler örnekler:

- [Sabit coinler](/stablecoins/)
- [Eşsiz dijital varlıkların oluşturulması ve dağıtılması](/nft/)
- [Otomatik, açık bir para birimi borsası](/get-eth/#dex)
- [Merkezi olmayan oyun](/dapps/?category=gaming)
- [Otomatik olarak ödeme yapan bir sigorta poliçesi](https://etherisc.com/)
- [İnsanların özel, uyumlu para birimleri oluşturmasını sağlayan bir standart](/developers/docs/standards/tokens/)

## Görerek öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Finematics'in akıllı sözleşmeleri açıklamasını izleyin:

<YouTube id="pWGLtjG-F5c" />

## Daha fazla bilgi {#further-reading}

- [Akıllı Sözleşmeler Dünya'yı Nasıl Değiştirecek?](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Akıllı Sözleşmeler: Avukatların Yerine Geçecek Olan Blokzincir Teknolojisi](https://blockgeeks.com/guides/smart-contracts/)
- [Geliştiriciler için akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Akıllı sözleşmeler yazmayı öğrenin](/developers/learning-tools/)
- [Ethereum'da Ustalaşma: Akıllı Sözleşme Nedir?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
