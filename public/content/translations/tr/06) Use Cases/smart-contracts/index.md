---
title: Akıllı sözleşmeler
description: Akıllı sözleşmelere teknik olmayan bir giriş
lang: tr
---

# Akıllı sözleşmelere giriş {#introduction-to-smart-contracts}

Akıllı sözleşmeler, Ethereum'un uygulama katmanının temel taşlarıdır. Bunlar, "eğer buysa o zaman şu" mantığını izleyen, kodunda tanımlanan kurallar çerçevesinde çalışacağı garanti edilen ve [blokzincirde](/glossary/#blockchain) saklanan bilgisayar programlarıdır.

"Akıllı sözleşme" terimini Nick Szabo ortaya atmıştır. 1994'te [akıllı sözleşme kavramına giriş](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), 1996'da ise [akıllı sözleşmelerin neler yapabileceğinin keşfi](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) adlı iki yazısı vardır.

Szabo; otomatik ve [kriptografik açıdan güvenli](/glossary/#cryptography) süreçlerin, işlem ve işletme fonksiyonlarının, güvenilir aracılar olmadan gerçekleşmesini mümkün kıldığı bir dijital pazar öngörmüştür. Ethereum üzerindeki akıllı sözleşmeler bu vizyonu hayata geçirdi.

Finematics'in akıllı sözleşmeleri açıklamasını izleyin:

<YouTube id="pWGLtjG-F5c" />

## Geleneksel sözleşmelere güven {#trust-and-contracts}

Geleneksel sözleşmelerle ilgili en büyük sıkıntılardan biri sözleşmenin sonuçlarını harfiyen gerçekleştirecek şahıslara duyulan ihtiyaçtır.

İşte bir örnek:

Alice ve Bob bisiklet yarışı yapıyorlar. Diyelim ki Alice, Bob'la yarışı kazanacağına dair 10 dolar bahse girdi. Bob kazanacağından emindir ve bahsi kabul eder. Sonunda Alice yarışı Bob'un çok önünde bitirir ve açık ara kazanan olur. Ama Bob, Alice'in hile yaptığını iddia ederek bahsi ödemeyi reddeder.

Bu küçük örnek, akıllı olmayan anlaşmalarla ilgili sorunu göstermektedir. Anlaşmanın koşulları sağlansa bile (yani yarışmanın kazananı siz olsanız bile) hâlâ anlaşmayı yerine getirmesi için (yani bahis ödemesinin yapılması için) başka bir kişiye güvenmelisiniz.

## Dijital bir otomat {#vending-machine}

Akıllı sözleşmeler için basit bir metafor akıllı sözleşmeye benzer sayılabilecek şekilde çalışan otomatlardır; belirli girdiler önceden belirlenmiş çıktıları garantiler.

- Bir ürün seçersiniz
- Otomat fiyatı gösterir
- Fiyatı ödersiniz
- Otomat, doğru miktarı ödediğinizi onaylar
- Otomat size ürünü verir

Otomat istediğiniz ürünü sadece tüm gereksinimler karşılandığında verecektir. Eğer ürün seçmezseniz veya yeterli parayı girmezseniz otomat ürününüzü vermeyecektir.

## Otomatik yürütüm {#automation}

Akıllı sözleşmenin asıl yararı, belirli şartlar sağlandığında anlamı açık olmayan kodu kesin bir şekilde yürütmesidir. Bir insanın sonucu yorumlamasını veya sonucun sağlamasını yapmasına gerek yoktur. Bu, güvenilir aracılara olan ihtiyacı ortadan kaldırır.

Örneğin, bir çocuk için fonu bloke altında tutan ve onun belirli bir tarih sonrasında fonu çekmesine izin veren bir akıllı sözleşme hazırlayabilirsiniz. Eğer bu tarihten önce para çekmeye çalışırlarsa, akıllı sözleşme yürütülmeyecektir. Yahut bir galericiye ödeme yaptığınızda arabanın tapusunun dijital halini size otomatik olarak veren bir sözleşme hazırlayabilirsiniz.

## Tahmin edilebilir sonuçlar {#predictability}

Geleneksel sözleşmeler belirsizdir çünkü yorumlama ve uygulama için insanlara dayanırlar. Örnek olarak, iki hakim bir sözleşmeyi farklı yorumlayabilir, bu da tutarsız seçimler ve eşit olmayan sonuçlara yol açabilir. Akıllı sözleşmeler bu ihtimali ortadan kaldırır. Bunun yerine, akıllı sözleşmeler sözleşmenin kodu dahilindeki koşullara bağlı olarak eksiksiz şekilde yürütülür. Bu kesinlik, aynı şartlar sağlandığında akıllı sözleşmenin aynı sonucu ortaya çıkaracağı anlamına gelir.

## Herkese açık kayıt {#public-record}

Akıllı sözleşmeler denetim ve takip için kullanışlıdır. Ethereum akıllı sözleşmeleri herkese açık bir blok zincir üzerinde olduğu için herkes varlık aktarımlarını ve diğer bağlantılı bilgileri anında takip edebilir. Örnek olarak, birisinin sizin adresinize para gönderip göndermediğini kontrol edebilirsiniz.

## Gizlilik koruması {#privacy-protection}

Akıllı sözleşmeler ayrıca gizliliğinizi de korur. Ethereum takma adlı bir ağ olduğu için (işlemleriniz herkese açık olarak eşsiz kriptografik bir adrese bağlıdır, kimliğinize değil) gizliliğinizi gözlemleyicilerden koruyabilirsiniz.

## Açık koşullar {#visible-terms}

Son olarak, tıpkı geleneksel sözleşmelerde olduğu gibi bir akıllı sözleşmeyi imzalamadan (ya da etkileşime geçmeden) önce içinde ne olup olmadığını kontrol edebilirsiniz. Bir akıllı sözleşmenin şeffaflığı herhangi birinin onu inceleyebileceğini garanti eder.

## Akıllı sözleşme kullanım senaryoları {#use-cases}

Akıllı sözleşmeler temel olarak bilgisayar programlarının yaptığı her şeyi yapabilir.

Hesaplamalar gerçekleştirebilir, para birimleri yaratabilir, veri depolayabilir, [NFT](/glossary/#nft) basabilir, iletişim gönderebilir, hatta grafikler oluşturabilir. İşte gerçek dünyadan bazı popüler örnekler:

- [Sabit coinler](/stablecoins/)
- [Eşsiz dijital varlıkların oluşturulması ve dağıtılması](/nft/)
- [Otomatik, açık bir para birimi borsası](/get-eth/#dex)
- [Merkezi olmayan oyun](/dapps/?category=gaming#explore)
- [Otomatik olarak ödeme yapan bir sigorta poliçesi](https://etherisc.com/)
- [İnsanların özel, uyumlu para birimleri oluşturmasını sağlayan bir standart](/developers/docs/standards/tokens/)

## Daha fazla bilgi {#further-reading}

- [Akıllı Sözleşmeler Dünya'yı Nasıl Değiştirecek?](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Akıllı Sözleşmeler: Avukatların Yerine Geçecek Olan Blokzincir Teknolojisi](https://blockgeeks.com/guides/smart-contracts/)
- [Geliştiriciler için akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Akıllı sözleşmeler yazmayı öğrenin](/developers/learning-tools/)
- [Ethereum'da Ustalaşma: Akıllı Sözleşme Nedir?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
