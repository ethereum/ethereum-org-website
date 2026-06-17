---
title: Merkeziyetsiz borsa (DEX) tasarımı en iyi uygulamaları
description: Token takası için UX/UI kararlarını açıklayan bir rehber.
lang: tr
---

2018'de Uniswap'ın piyasaya sürülmesinden bu yana, düzinelerce farklı zincirde yüzlerce merkeziyetsiz borsa başlatıldı.
Bunların birçoğu yeni unsurlar sundu veya kendi yorumlarını kattı, ancak arayüz genel olarak aynı kaldı.

Bunun bir nedeni [Jakob'un Yasası](https://lawsofux.com/jakobs-law/)'dır:

> Kullanıcılar zamanlarının çoğunu diğer sitelerde geçirirler. Bu, kullanıcıların sizin sitenizin de zaten bildikleri diğer tüm sitelerle aynı şekilde çalışmasını tercih ettiği anlamına gelir.

Uniswap, Pancakeswap ve Sushiswap gibi erken dönem yenilikçiler sayesinde, merkeziyetsiz finans (DeFi) kullanıcıları bir DEX'in neye benzediğine dair ortak bir fikre sahiptir.
Bu nedenle, artık "en iyi uygulama" gibi bir şey ortaya çıkıyor. Giderek daha fazla tasarım kararının siteler arasında standartlaştırıldığını görüyoruz. DEX'lerin evrimini, canlı test etmenin devasa bir örneği olarak görebilirsiniz. İşe yarayan şeyler kaldı, yaramayanlar ise çöpe atıldı. Kişiselleştirme için hala yer var, ancak bir DEX'in uyması gereken belirli standartlar da bulunuyor.

Bu makale şunların bir özetidir:
- nelerin dahil edileceği
- mümkün olduğunca nasıl kullanışlı hale getirileceği
- tasarımı özelleştirmenin temel yolları

Örnek tel kafeslerin (wireframe) tümü, gerçek projelere dayanmalarına rağmen bu makale için özel olarak hazırlanmıştır.

Figma kiti de alt kısımda yer almaktadır; kendi tel kafeslerinizi hızlandırmak için kullanmaktan çekinmeyin!

## Bir DEX'in temel anatomisi {#basic-anatomy-of-a-dex}

Kullanıcı arayüzü (UI) genellikle üç unsur içerir:
1. Ana form
2. Düğme
3. Ayrıntılar paneli

![Generic DEX UI, showing the three main elements](./1.png)


## Varyasyonlar {#variations}

Bu makalede yaygın bir tema olacak, ancak bu unsurların düzenlenebileceği çeşitli farklı yollar vardır. "Ayrıntılar paneli" şuralarda olabilir:
- Düğmenin üstünde
- Düğmenin altında
- Bir akordeon panelinde gizli
- Ve/veya bir "önizleme" kipselinde (modal)
  
Not: Bir "önizleme" kipseli isteğe bağlıdır, ancak ana kullanıcı arayüzünde çok az ayrıntı gösteriyorsanız bu zorunlu hale gelir.

## Ana formun yapısı {#structure-of-the-main-form}

Bu, aslında hangi token'ı takas etmek istediğinizi seçtiğiniz kutudur. Bileşen, bir girdi alanı ve aynı satırda küçük bir düğmeden oluşur.

DEX'ler genellikle ek ayrıntıları bir satır üstte ve bir satır altta gösterir, ancak bu farklı şekilde yapılandırılabilir.

![Input row, with a details row above and below](./2.png)

## Varyasyonlar {#variations2}

Burada iki kullanıcı arayüzü varyasyonu gösterilmektedir; biri hiç kenarlığı olmayan ve çok açık bir tasarım yaratan, diğeri ise girdi satırının bir kenarlığa sahip olduğu ve o unsura odaklanmayı sağlayan varyasyondur.

![Two UI variations of the main form](./3.png)

Bu temel yapı, tasarımda **dört temel bilgi parçasının** gösterilmesine olanak tanır: her köşede bir tane. Yalnızca bir üst/alt satır varsa, o zaman sadece iki nokta vardır.

Merkeziyetsiz finansın (DeFi) evrimi sırasında buraya pek çok farklı şey dahil edilmiştir.

## Dahil edilecek temel bilgiler {#key-info-to-include}

- Cüzdan bakiyesi
- Maksimum düğmesi
- İtibari para (fiat) karşılığı
- "Alınan" miktar üzerindeki fiyat etkisi

DeFi'nin ilk günlerinde, itibari para karşılığı genellikle eksikti. Herhangi bir tür Web3 projesi geliştiriyorsanız, itibari para karşılığının gösterilmesi çok önemlidir. Kullanıcılar hala yerel para birimleri cinsinden düşünmektedir, bu nedenle gerçek dünyadaki zihinsel modellerle eşleşmesi için bu dahil edilmelidir.

İkinci alanda (takas edeceğiniz token'ı seçtiğiniz alan), girdi miktarı ile tahmini çıktı miktarları arasındaki farkı hesaplayarak itibari para miktarının yanına fiyat etkisini de ekleyebilirsiniz. Bu, dahil edilmesi oldukça yararlı bir ayrıntıdır.

Yüzde düğmeleri (ör. %25, %50, %75) yararlı bir özellik olabilir, ancak daha fazla yer kaplar, daha fazla eylem çağrısı ekler ve zihinsel yükü artırır. Yüzde kaydırıcıları için de aynısı geçerlidir. Bu kullanıcı arayüzü kararlarından bazıları markanıza ve kullanıcı tipinize bağlı olacaktır.

Ek ayrıntılar ana formun altında gösterilebilir. Bu tür bilgiler çoğunlukla profesyonel kullanıcılar için olduğundan, şunlardan birini yapmak mantıklıdır:
- mümkün olduğunca minimal tutmak veya;
- bir akordeon panelinde gizlemek

![Details shown in the corners of that main form](./4.png)

## Dahil edilecek ek bilgiler {#extra-info-to-include}

- Token fiyatı
- Fiyat kayması
- Alınacak minimum miktar
- Beklenen çıktı
- Fiyat etkisi
- Tahmini gaz maliyeti
- Diğer ücretler
- Emir yönlendirme

Tartışmaya açık olsa da, bu ayrıntılardan bazıları isteğe bağlı olabilir.

Emir yönlendirme ilginçtir, ancak çoğu kullanıcı için pek bir fark yaratmaz.

Diğer bazı ayrıntılar ise aynı şeyi farklı şekillerde ifade etmekten ibarettir. Örneğin "alınacak minimum miktar" ve "fiyat kayması" aynı madalyonun iki yüzüdür. Fiyat kaymasını %1 olarak ayarladıysanız, almayı bekleyebileceğiniz minimum miktar = beklenen çıktı - %1'dir. Bazı kullanıcı arayüzleri beklenen miktarı, minimum miktarı ve fiyat kaymasını gösterir... Bu yararlıdır ancak muhtemelen gereğinden fazladır. 

Çoğu kullanıcı zaten varsayılan fiyat kaymasını olduğu gibi bırakacaktır.

"Fiyat etkisi" genellikle "alıcı" alanındaki itibari para karşılığının yanında parantez içinde gösterilir. Bu, eklemek için harika bir UX ayrıntısıdır, ancak burada gösteriliyorsa, aşağıda tekrar gösterilmesine gerçekten gerek var mı? Ve sonra bir önizleme ekranında tekrar?

Pek çok kullanıcı (özellikle küçük miktarlarda takas yapanlar) bu ayrıntıları umursamayacaktır; sadece bir sayı girip takas düğmesine basacaklardır.

![Some details show the same thing](./5.png)

Tam olarak hangi ayrıntıların gösterileceği, hedef kitlenize ve uygulamanın nasıl bir his vermesini istediğinize bağlı olacaktır.

Ayrıntılar paneline fiyat kayması toleransını dahil ederseniz, bunu doğrudan buradan düzenlenebilir hale de getirmelisiniz. Bu, bir "hızlandırıcı" için iyi bir örnektir; uygulamanın genel kullanılabilirliğini etkilemeden deneyimli kullanıcıların akışlarını hızlandırabilen akıllıca bir UX hilesidir.

![Slippage can be controlled from the details panel](./6.png)

Sadece bir ekrandaki belirli bir bilgi parçası hakkında değil, tüm akış hakkında dikkatlice düşünmek iyi bir fikirdir:
Ana Forma sayıları girmek → Ayrıntıları Taramak → Önizleme Ekranına Tıklamak (bir önizleme ekranınız varsa). 
Ayrıntılar paneli her zaman görünür mü olmalı, yoksa kullanıcının genişletmek için tıklaması mı gerekiyor?
Bir önizleme ekranı ekleyerek sürtünme yaratmalı mısınız? Bu, kullanıcıyı yavaşlamaya ve işlemlerini düşünmeye zorlar, ki bu yararlı olabilir. Ancak aynı bilgilerin tümünü tekrar görmek istiyorlar mı? Bu noktada onlar için en yararlı olan şey nedir?

## Tasarım seçenekleri {#design-options}

Belirtildiği gibi, bunların çoğu kişisel tarzınıza bağlıdır
Kullanıcınız kim?
Markanız nedir?
Her ayrıntıyı gösteren "profesyonel" bir arayüz mü istiyorsunuz, yoksa minimalist mi olmak istiyorsunuz?
Mümkün olan tüm bilgileri isteyen profesyonel kullanıcıları hedefliyor olsanız bile, Alan Cooper'ın şu bilgece sözlerini unutmamalısınız:

> Arayüzünüz ne kadar güzel, ne kadar havalı olursa olsun, daha azı olsaydı daha iyi olurdu.

### Yapı {#structure}

- token'lar solda veya token'lar sağda
- 2 satır veya 3 satır
- ayrıntılar düğmenin üstünde veya altında
- ayrıntılar genişletilmiş, küçültülmüş veya gösterilmiyor

### Bileşen stili {#component-style}

- boş
- dış hatlı
- dolu

Saf bir UX bakış açısından, UI stili düşündüğünüzden daha az önemlidir. Görsel trendler döngüler halinde gelir ve geçer ve tercihlerin çoğu özneldir.

Bunu hissetmenin - ve çeşitli farklı yapılandırmalar hakkında düşünmenin - en kolay yolu, bazı örneklere göz atmak ve ardından kendiniz biraz deneme yapmaktır.

Dahil edilen Figma kiti boş, dış hatlı ve dolu bileşenler içerir.

Tüm bunları bir araya getirmenin farklı yollarını görmek için aşağıdaki örneklere göz atın:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Peki token hangi tarafta olmalı? {#but-which-side-should-the-token-go-on}

Sonuç olarak, bunun kullanılabilirlik açısından muhtemelen büyük bir fark yaratmadığı söylenebilir. Ancak, sizi bir yöne veya diğerine çekebilecek akılda tutulması gereken birkaç şey vardır.

Zamanla modanın değiştiğini görmek biraz ilginç oldu. Uniswap başlangıçta token'ı solda tutuyordu, ancak o zamandan beri sağa taşıdı. Sushiswap da bir tasarım yükseltmesi sırasında bu değişikliği yaptı. Hepsi olmasa da çoğu protokol bu örneği izledi.

Finansal gelenekler genellikle para birimi sembolünü sayıdan önce koyar, örn. $50, €50, £50, ancak biz 50 dolar, 50 Euro, 50 sterlin *deriz*.

Genel kullanıcı için - özellikle soldan sağa, yukarıdan aşağıya okuyan biri için - token'ın sağda olması muhtemelen daha doğal hissettirir.

![A UI with tokens on the left](./13.png)

Token'ı sola ve tüm sayıları sağa koymak hoş bir şekilde simetrik görünür, ki bu bir artıdır, ancak bu düzenin başka bir dezavantajı vardır.

Yakınlık yasası, birbirine yakın olan öğelerin ilişkili olarak algılandığını belirtir. Buna göre, ilişkili öğeleri yan yana yerleştirmek isteriz. Token bakiyesi doğrudan token'ın kendisiyle ilişkilidir ve yeni bir token seçildiğinde değişecektir. Bu nedenle, token bakiyesinin token seçme düğmesinin yanında olması biraz daha mantıklıdır. Token'ın altına taşınabilir, ancak bu da düzenin simetrisini bozar.

Sonuçta, her iki seçeneğin de artıları ve eksileri vardır, ancak eğilimin token'ın sağda olmasına doğru görünmesi ilginçtir.

## Düğme davranışı {#button-behavior}

Onaylamak için ayrı bir düğmeniz olmasın. Ayrıca Onaylamak için ayrı bir tıklama da olmasın. Kullanıcı Takas yapmak istiyor, bu yüzden düğmede sadece "takas" deyin ve ilk adım olarak onayı başlatın. Bir kipsel (modal), bir adım göstergesiyle veya basit bir "işlem 1/2 - onaylanıyor" bildirimiyle ilerlemeyi gösterebilir.

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Bağlamsal yardım olarak düğme {#button-as-contextual-help}

Düğme bir uyarı olarak çifte görev yapabilir!

Bu aslında Web3 dışında oldukça alışılmadık bir tasarım modelidir, ancak kendi içinde standart hale gelmiştir. Yerden tasarruf sağladığı ve dikkati odaklanmış tuttuğu için bu iyi bir yeniliktir.

Ana eylem - TAKAS - bir hata nedeniyle kullanılamıyorsa, bunun nedeni düğme ile açıklanabilir, örn.:

- ağı değiştir
- cüzdanı bağla
- çeşitli hatalar

Düğme ayrıca gerçekleştirilmesi gereken **eylemle eşleştirilebilir**. Örneğin, kullanıcı yanlış ağda olduğu için takas yapamıyorsa, düğmede "Ethereum'a geç" yazmalı ve kullanıcı düğmeye tıkladığında ağı Ethereum olarak değiştirmelidir. Bu, kullanıcı akışını önemli ölçüde hızlandırır.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Bu figma dosyasıyla kendinizinkini oluşturun {#build-your-own-with-this-figma-file}

Birden fazla protokolün sıkı çalışması sayesinde, DEX tasarımı çok gelişti. Kullanıcının hangi bilgilere ihtiyacı olduğunu, bunları nasıl göstermemiz gerektiğini ve akışı mümkün olduğunca nasıl pürüzsüz hale getireceğimizi biliyoruz.
Umarız bu makale UX ilkelerine dair sağlam bir genel bakış sunar. 

Deneme yapmak isterseniz, lütfen Figma tel kafes kitini kullanmaktan çekinmeyin. Mümkün olduğunca basit tutulmuştur, ancak temel yapıyı çeşitli şekillerde oluşturmak için yeterli esnekliğe sahiptir.

[Figma tel kafes kiti](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi gelişmeye devam edecek ve her zaman iyileştirme için yer vardır. 

İyi şanslar!