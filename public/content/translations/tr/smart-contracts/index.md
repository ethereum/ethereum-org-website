---
title: Akıllı sözleşmeler
metaTitle: "Akıllı sözleşmeler: Nedir ve yararları nelerdir?"
description: Akıllı sözleşmelere teknik olmayan bir giriş
lang: tr
---

# Akıllı sözleşmelere giriş {#introduction-to-smart-contracts}

<div className="mt-4">
<ListenToPlayer slug="/smart-contracts/" />
</div>

Akıllı sözleşmeler, Ethereum'un uygulama katmanının temel taşlarıdır. Bunlar, "eğer buysa o zaman şu" mantığını izleyen, kodunda tanımlanan kurallara göre yürütüleceği garanti edilen ve oluşturulduktan sonra değiştirilemeyen, [blokzincirde](/glossary/#blockchain) depolanan bilgisayar programlarıdır.

"Akıllı sözleşme" terimini Nick Szabo ortaya atmıştır. 1994'te [kavrama bir giriş](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) yazdı ve 1996'da [akıllı sözleşmelerin neler yapabileceğine dair bir keşif](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) yazısı kaleme aldı.

Szabo, otomatik, [kriptografik olarak güvenli](/glossary/#cryptography) süreçlerin, güvenilir aracılar olmadan işlemlerin ve ticari fonksiyonların gerçekleşmesini sağladığı dijital bir pazar yeri tasavvur etmiştir. Ethereum üzerindeki akıllı sözleşmeler bu vizyonu hayata geçirdi.

Finematics'in akıllı sözleşmeleri açıklamasını izleyin:

<YouTube id="pWGLtjG-F5c" />

## Geleneksel sözleşmelerde güven {#trust-and-contracts}

Geleneksel sözleşmelerle ilgili en büyük sıkıntılardan biri sözleşmenin sonuçlarını harfiyen gerçekleştirecek şahıslara duyulan ihtiyaçtır.

İşte bir örnek:

Alice ve Bob bisiklet yarışı yapıyorlar. Diyelim ki Alice, Bob'la yarışı kazanacağına dair 10 dolar bahse girdi. Bob kazanacağından emindir ve bahsi kabul eder. Sonunda Alice yarışı Bob'un çok önünde bitirir ve açık ara kazanan olur. Ama Bob, Alice'in hile yaptığını iddia ederek bahsi ödemeyi reddeder.

Bu küçük örnek, akıllı olmayan anlaşmalarla ilgili sorunu göstermektedir. Anlaşmanın koşulları karşılansa bile (yani, yarışın galibi siz olsanız bile), anlaşmayı yerine getirmesi (yani, bahsin ödemesini yapması) için hâlâ başka birine güvenmeniz gerekir.

## Dijital otomat {#vending-machine}

Akıllı sözleşmeler için basit bir metafor akıllı sözleşmeye benzer sayılabilecek şekilde çalışan otomatlardır; belirli girdiler önceden belirlenmiş çıktıları garantiler.

- Bir ürün seçersiniz
- Otomat fiyatı gösterir
- Fiyatı ödersiniz
- Otomat, doğru miktarı ödediğinizi onaylar
- Otomat size ürünü verir

Otomat istediğiniz ürünü sadece tüm gereksinimler karşılandığında verecektir. Eğer ürün seçmezseniz veya yeterli parayı girmezseniz otomat ürününüzü vermeyecektir.

## Otomatik yürütme {#automation}

Akıllı sözleşmenin asıl yararı, belirli şartlar sağlandığında anlamı açık olmayan kodu kesin bir şekilde yürütmesidir. Bir insanın sonucu yorumlamasını veya sonucun sağlamasını yapmasına gerek yoktur. Bu, güvenilir aracılara olan ihtiyacı ortadan kaldırır.

Örneğin, bir çocuk için fonu bloke altında tutan ve onun belirli bir tarih sonrasında fonu çekmesine izin veren bir akıllı sözleşme hazırlayabilirsiniz. Eğer bu tarihten önce para çekmeye çalışırlarsa, akıllı sözleşme yürütülmeyecektir. Yahut bir galericiye ödeme yaptığınızda arabanın tapusunun dijital halini size otomatik olarak veren bir sözleşme hazırlayabilirsiniz.

## Öngörülebilir sonuçlar {#predictability}

Geleneksel sözleşmeler belirsizdir çünkü yorumlama ve uygulama için insanlara dayanırlar. Örnek olarak, iki hakim bir sözleşmeyi farklı yorumlayabilir, bu da tutarsız seçimler ve eşit olmayan sonuçlara yol açabilir. Akıllı sözleşmeler bu ihtimali ortadan kaldırır. Bunun yerine, akıllı sözleşmeler sözleşmenin kodu dahilindeki koşullara bağlı olarak eksiksiz şekilde yürütülür. Bu kesinlik, aynı şartlar sağlandığında akıllı sözleşmenin aynı sonucu ortaya çıkaracağı anlamına gelir.

## Halka açık kayıt {#public-record}

Akıllı sözleşmeler denetim ve takip için kullanışlıdır. Ethereum akıllı sözleşmeleri herkese açık bir blok zincir üzerinde olduğu için herkes varlık aktarımlarını ve diğer bağlantılı bilgileri anında takip edebilir. Örnek olarak, birisinin sizin adresinize para gönderip göndermediğini kontrol edebilirsiniz.

## Gizliliğin korunması {#privacy-protection}

Akıllı sözleşmeler ayrıca gizliliğinizi de korur. Ethereum takma adlı bir ağ olduğu için (işlemleriniz herkese açık olarak eşsiz kriptografik bir adrese bağlıdır, kimliğinize değil) gizliliğinizi gözlemleyicilerden koruyabilirsiniz.

## Görünür şartlar {#visible-terms}

Son olarak, tıpkı geleneksel sözleşmelerde olduğu gibi bir akıllı sözleşmeyi imzalamadan (ya da etkileşime geçmeden) önce içinde ne olup olmadığını kontrol edebilirsiniz. Bir akıllı sözleşmenin şeffaflığı herhangi birinin onu inceleyebileceğini garanti eder.

## Akıllı sözleşme kullanım alanları {#use-cases}

Akıllı sözleşmeler temel olarak bilgisayar programlarının yaptığı her şeyi yapabilir.

Hesaplama yapabilir, para birimi oluşturabilir, veri depolayabilir, [NFT](/glossary/#nft) basabilir, iletişim gönderebilir ve hatta grafikler üretebilirler. İşte gerçek dünyadan bazı popüler örnekler:

- [Stabilcoin'ler](/stablecoins/)
- [Benzersiz dijital varlıklar oluşturma ve dağıtma](/nft/)
- [Otomatik, açık para birimi borsası](/get-eth/#dex)
- [Merkeziyetsiz oyunlar](/apps/categories/gaming)
- [Otomatik olarak ödeme yapan bir sigorta poliçesi](https://etherisc.com/)
- [İnsanların özelleştirilmiş, birlikte çalışabilir para birimleri oluşturmasına olanak tanıyan bir standart](/developers/docs/standards/tokens/)

## Daha fazla kaynak {#further-reading}

- [Akıllı Sözleşmeler Dünyayı Nasıl Değiştirecek](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Geliştiriciler için akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Akıllı sözleşme yazmayı öğrenin](/developers/learning-tools/)
- [Mastering Ethereum - Akıllı Sözleşme Nedir?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />
