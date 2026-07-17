---
title: Akıllı sözleşmelere giriş
metaTitle: "Akıllı sözleşmeler: Nedir ve faydaları nelerdir"
description: Akıllı sözleşmelere teknik olmayan bir giriş
lang: tr
---

Akıllı sözleşmeler, [Ethereum'un](/) uygulama katmanının temel yapı taşlarıdır. Bunlar, [Blokzincir](/glossary/#blockchain) üzerinde depolanan, "eğer bu olursa, o zaman şu olur" mantığını izleyen ve oluşturulduktan sonra değiştirilemeyen kodları tarafından tanımlanan kurallara göre yürütülmesi garanti edilen bilgisayar programlarıdır.

"Akıllı sözleşme" terimini Nick Szabo ortaya atmıştır. 1994 yılında [kavrama bir giriş](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) yazmış ve 1996 yılında [akıllı sözleşmelerin neler yapabileceğine dair bir inceleme](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) kaleme almıştır.

Szabo, otomatik ve [kriptografik olarak güvenli](/glossary/#cryptography) süreçlerin, işlemlerin ve işlevlerin güvenilir aracılar olmadan gerçekleşmesini sağladığı dijital bir pazar yeri hayal etmişti. Ethereum üzerindeki akıllı sözleşmeler bu vizyonu hayata geçirmektedir.

Finematics'in akıllı sözleşmeleri açıklamasını izleyin:

<VideoWatch slug="smart-contracts-code-is-law" />

## Geleneksel sözleşmelerde güven {#trust-and-contracts}

Geleneksel bir sözleşmeyle ilgili en büyük sorunlardan biri, sözleşmenin sonuçlarını yerine getirecek güvenilir kişilere duyulan ihtiyaçtır.

İşte bir örnek:

Alice ve Bob bir bisiklet yarışı yapıyor. Diyelim ki Alice, yarışı kazanacağına dair Bob ile 10 dolarlık bir iddiaya giriyor. Bob kazanacağından emin ve iddiayı kabul ediyor. Sonunda Alice yarışı Bob'un çok önünde bitiriyor ve açık ara kazanıyor. Ancak Bob, Alice'in hile yapmış olması gerektiğini iddia ederek iddiayı ödemeyi reddediyor.

Bu basit örnek, akıllı olmayan herhangi bir anlaşmadaki sorunu göstermektedir. Anlaşmanın koşulları yerine getirilse bile (yani yarışın kazananı siz olsanız bile), anlaşmayı yerine getirmesi (yani iddiayı ödemesi) için yine de başka bir kişiye güvenmeniz gerekir.

## Dijital bir otomat {#vending-machine}

Akıllı sözleşme için basit bir metafor, akıllı sözleşmeye biraz benzer şekilde çalışan bir otomattır; belirli girdiler önceden belirlenmiş çıktıları garanti eder.

- Bir ürün seçersiniz
- Otomat fiyatı gösterir
- Fiyatı ödersiniz
- Otomat doğru miktarı ödediğinizi doğrular
- Otomat size ürününüzü verir

Otomat, yalnızca tüm gereksinimler karşılandıktan sonra istediğiniz ürünü verecektir. Bir ürün seçmezseniz veya yeterli para atmazsanız, otomat ürününüzü vermez.

## Otomatik yürütme {#automation}

Bir akıllı sözleşmenin temel faydası, belirli koşullar karşılandığında net bir kodu deterministik olarak yürütmesidir. Bir insanın sonucu yorumlamasını veya müzakere etmesini beklemeye gerek yoktur. Bu, güvenilir aracılara olan ihtiyacı ortadan kaldırır.

Örneğin, bir çocuk için fonları emanette tutan ve belirli bir tarihten sonra fonları çekmelerine izin veren bir akıllı sözleşme yazabilirsiniz. O tarihten önce çekmeye çalışırlarsa, akıllı sözleşme yürütülmez. Veya satıcıya ödeme yaptığınızda size otomatik olarak bir arabanın ruhsatının dijital bir versiyonunu veren bir sözleşme yazabilirsiniz.

## Öngörülebilir sonuçlar {#predictability}

Geleneksel sözleşmeler belirsizdir çünkü yorumlanmaları ve uygulanmaları insanlara bağlıdır. Örneğin, iki yargıç bir sözleşmeyi farklı şekilde yorumlayabilir ve bu da tutarsız kararlara ve eşitsiz sonuçlara yol açabilir. Akıllı sözleşmeler bu olasılığı ortadan kaldırır. Bunun yerine, akıllı sözleşmeler tam olarak sözleşmenin kodunda yazılı koşullara göre yürütülür. Bu kesinlik, aynı koşullar altında akıllı sözleşmenin aynı sonucu üreteceği anlamına gelir.

## Herkese açık kayıt {#public-record}

Akıllı sözleşmeler denetimler ve izleme için faydalıdır. Ethereum akıllı sözleşmeleri herkese açık bir Blokzincir üzerinde olduğundan, herkes varlık transferlerini ve diğer ilgili bilgileri anında izleyebilir. Örneğin, birinin adresinize para gönderip göndermediğini kontrol edebilirsiniz.

## Gizlilik koruması {#privacy-protection}

Akıllı sözleşmeler ayrıca gizliliğinizi de korur. Ethereum takma adlı bir ağ olduğundan (işlemleriniz kimliğinize değil, herkese açık olarak benzersiz bir kriptografik adrese bağlıdır), gizliliğinizi gözlemcilerden koruyabilirsiniz.

## Görünür şartlar {#visible-terms}

Son olarak, geleneksel sözleşmelerde olduğu gibi, imzalamadan önce bir akıllı sözleşmenin içinde ne olduğunu kontrol edebilirsiniz. Geleneksel bir sözleşmenin aksine, bir akıllı sözleşmenin zincir içi şeffaflığı, herkesin onunla etkileşime girmeden önce onu incelemesine ve gözden geçirmesine olanak tanır. 

Ancak, herkes bir akıllı sözleşmenin şartlarını görüntüleyebilse de, ham işlem verileri insanlar tarafından değil, uygulamalar ve cüzdanlar tarafından yorumlanmak üzere tasarlanmıştır. Bu verilerin okunması çok zor olduğundan, kullanıcılar genellikle "kör imzalama" adı verilen büyük bir güvenlik riskiyle, yani bir akıllı sözleşmeyle etkileşime giren bir işlemi ne yapacağını tam olarak anlamadan onaylama riskiyle karşı karşıya kalırlar. 

Ethereum ekosistemi **[Açık İmzalama](https://clearsigning.org/)** standartlarına (özellikle [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)) geçiş yapmaktadır. Açık İmzalama, şeffaf olmayan akıllı sözleşme verilerini sade, insanların okuyabileceği işlem açıklamalarına dönüştürerek, herkesin imzalamadan önce bir sözleşmenin gerçek niyetini anlayabilmesini sağlar.

## Akıllı sözleşme kullanım durumları {#use-cases}

Akıllı sözleşmeler temel olarak bilgisayar programlarının yapabileceği her şeyi yapabilir.

Hesaplamalar yapabilir, para birimi oluşturabilir, veri depolayabilir, [NFT'ler](/glossary/#nft) basabilir, iletişim gönderebilir ve hatta grafikler oluşturabilirler. İşte bazı popüler, gerçek dünya örnekleri:

- [Sabit coinler](/stablecoins/)
- [Benzersiz dijital varlıklar oluşturma ve dağıtma](/nft/)
- [Otomatik, açık bir döviz borsası](/get-eth/#dex)
- [Merkeziyetsiz oyunlar](/apps/categories/gaming)
- [Otomatik olarak ödeme yapan bir sigorta poliçesi](https://etherisc.com/)
- [İnsanların özelleştirilmiş, birlikte çalışabilir para birimleri oluşturmasına olanak tanıyan bir standart](/developers/docs/standards/tokens/)

## Daha fazla bilgi {#further-reading}

- [Akıllı Sözleşmeler Dünyayı Nasıl Değiştirecek?](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Geliştiriciler için akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [Akıllı sözleşme yazmayı öğrenin](/developers/learning-tools/)
- [Mastering Ethereum - Akıllı Sözleşme Nedir?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />