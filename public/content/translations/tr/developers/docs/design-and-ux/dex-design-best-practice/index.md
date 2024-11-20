---
title: Merkeziyetsiz borsa (DEX) tasarımına ilişkin en iyi pratikler
description: Jeton takasına yönelik kullanıcı deneyimi/kullanıcı arayüzü kararlarını açıklayan bir rehber.
lang: tr
---

Uniswap'in 2018'de başlatılmasından beri onlarca farklı zincirde yüzlerce merkeziyetsiz borsa oluşturuldu.
Bunların çoğu, yeni özellikler ve kendine has yenilikler getirdi, ancak arayüz genel olarak aynı kaldı.

Bunun sebeplerinden biri [Jakob’s Law](https://lawsofux.com/jakobs-law/):

> Kullanıcıların çoğu zamanını diğer sitelerde geçirir. Bu, kullanıcıların sizin sitenizin kendi bildiği diğer sitelerle benzer şekilde çalışmasını tercih ediyor olduğu anlamına gelir.

Uniswap, Pancakeswap ve Sushiswap gibi yenilikçi projeler sayesinde DeFi kullanıcıları bir merkeziyetsiz borsanın nasıl göründüğü hakkında kolektif bir fikre sahiptir.
Bu nedenle "en iyi pratik" olarak adlandırabileceğimiz bir şey ortaya çıkıyor. Sitelerde giderek daha fazla tasarım kararının standart hale geldiğini görüyoruz. Merkeziyetsiz borsaların geçirdiği evrimi, onu canlı olarak test etmenin dev bir örneği olarak görebilirsiniz. İşe yarayan şeyler kaldı, yaramayanlar gözden düştü. Merkeziyetsiz borsalara belli bir karakter eklemek hala mümkün, ancak artık uymaları gereken kesin standartlar da var.

Bu makale aşağıdakilerin özetinden oluşuyor:

- dahil edilecek şeyler
- en kullanışlı hale getirme yöntemleri
- tasarımı özelleştirmenin başlıca yolları

Tüm örnek web sitesi şemaları bu makale için özel olarak hazırlanmıştır, ancak hepsi gerçek projelere dayanmaktadır.

Aşağıya Figma kitini de ekledik, kendi web sitesi şemalarınız için kullanmaktan çekinmeyin!

## Bir merkeziyetsiz borsanın temel anatomisi {#basic-anatomy-of-a-dex}

Kullanıcı Arayüzü genelde 3 parçadan oluşur:

1. Ana form
2. Buton
3. Ayrıntılar paneli

![3 temel parçayı gösteren genel merkeziyetsiz borsa kullanıcı arayüzü](./1.png)

## Varyasyonlar {#variations}

Burası, bu makalede ortak bir tema olacaktır ancak bu öğelerin organize edilmesinin birçok farklı yolu vardır. "Ayrıntılar paneli" aşağıdaki şekillerde olabilir:

- Butonun üstünde
- Butonun altında
- Akordiyon panelde gizlenmiş
- Ve/veya bir "önizleme" modunda

Not Bir "önizleme" modeli opsiyoneldir, fakat ana UI'da oldukça az detay gösteriyorsanız gerekli hale gelir.

## Ana formun yapısı {#structure-of-the-main-form}

Bu, aslında hangi jetonu takas etmek istediğinizi seçeceğiniz kısımdır. Bileşen bir satırın içinde bulunan bir giriş alanından ve küçük bir butondan oluşur.

Farklı şekilde yapılandırılabilse de merkeziyetsiz borsalar genelde ek detayları bir satır üstte ve bir satır altta gösterir.

![Üstünde ve altında ayrıntı satırı olan giriş satırı](./2.png)

## Varyasyonlar {#variations2}

Burada iki farklı kullanıcı arayüzü varyasyonu gösteriliyor; birincisi hiçbir sınırı olmayan ve oldukça açık bir tasarım oluşturan, diğeri ise giriş satırının sınırının olduğu ve bu sayede odak noktasının o öğeye çevrildiği bir arayüz.

![Ana formun iki UI varyasyonu](./3.png)

Bu temel yapı, tasarımda **dört temel bilginin** gösterilmesine olanak tanır: her köşede bir tane. Sadece bir üst/alt sıra varsa, o halde sadece iki nokta vardır.

DeFi'nin gelişimi sırasında buraya çok farklı şeyler dahil edildi.

## Dahil edilecek önemli bilgiler {#key-info-to-include}

- Cüzdandaki bakiye
- Maksimum butonu
- Fiat eşdeğeri
- Fiyatın "alınacak" tutar üzerinde olan etkisi

DeFi'nin ilk zamanlarında, fiat eşdeğerine genellikle yer verilmiyordu. Herhangi bir türden Web3 projesi oluşturuyorsanız, mutlaka fiat eşdeğerinin gösterilmesi gerekir. Kullanıcılar hala yerel para birimleri cinsinden düşünüyorlar, dolayısıyla gerçek dünyanın mental modelleriyle eşleşmesi için bunun da dahil edilmesi gerekiyor.

İkinci alanda (takas edeceğiniz jetonu seçtiğiniz alanda) girdi miktarı ile tahmini çıktı miktarları arasındaki farkı hesaplayarak fiat para miktarının yanına fiyat etkisini de ekleyebilirsiniz. Bu, dahil edilmesi oldukça işe yarayacak bir ayrıntıdır.

Yüzde butonları (örn. %25, %50, %75) kullanışlı bir özellik olabilir ancak daha fazla yer kaplar, daha fazla eylem çağrısı ekler ve daha fazla zihinsel yüke neden olur. Yüzde kaydırıcılar için de aynısı geçerlidir. Bu UI kararlarının bazıları markanıza ve kullanıcı tipinize bağlı olacaktır.

Ekstra ayrıntılar ana formun altında gösterilebilir. Bu tür bilgiler çoğunlukla profesyonel kullanıcılara yönelik olduğundan şunlardan birini yapmak mantıklı olur:

- mümkün olduğunca minimal tutun veya;
- bir akordiyon panelde gizleyin

![Ana formun köşelerinde gösterilen ayrıntılar](./4.png)

## Dahil edilecek ekstra bilgiler {#extra-info-to-include}

- Token fiyatı
- Slipaj
- Minimum alınan
- Beklenen çıktı
- Fiyat etkisi
- Tahmini gaz ücreti
- Diğer ücretler
- Sipariş yönlendirme

Bu ayrıntıların bir kısmının opsiyonel olabileceği iddia edilebilir.

Sipariş yönlendirme ilgi çekici olsa da çoğu kullanıcı için pek de fark yaratmaz.

Diğer bazı ayrıntılar ise aynı şeyin farklı şekillerde ifade edilmesinden ibarettir. Örneğin "minimum alınan" ve "slipaj" aynı paranın iki yüzüdür. Eğer slipajınız %1 olarak ayarlanmışsa, bekleyeceğiniz minimum alınacak miktar = beklenen çıktı-%1. Bazı kullanıcı arayüzleri beklenen miktarı, minimum miktarı ve slipajı gösterir… Bu, yararlı ama muhtemelen aşırıdır.

Çoğu kullanıcı yine de varsayılan slipajı bırakacaktır.

"Fiyat etkisi," genellikle "alınacak" alanında, fiat karşılığının yanında parantez içinde gösterilir. Bu eklenmesi gereken harika bir kullanıcı deneyimi detayıdır ancak burada gösteriliyorsa, aşağıda tekrar gösterilmesine gerçekten gerek var mı? Sonra da tekrar bir önizleme ekranında?

Çoğu kullanıcı (özellikle küçük miktarlar takas edenler) bu detaylarla ilgilenmeyecek, basitçe bir sayı girecek ve takasa tıklayacak.

![Bazı detaylar aynı şeyleri gösteriyor](./5.png)

Tam olarak hangi detayların gösterileceği, kitlenize ve uygulamanızın nelere sahip olmasını istediğinize bağlıdır.

Ayrıntılar paneline slipaj toleransını dahil edecekseniz, bu değerin buradan doğrudan düzenlenebilir olmasını da sağlamalısınız. Bu, uygulamanın genel kullanılabilirliğini etkilemeden deneyimli kullanıcıların akışlarını hızlandırabilen şık bir UX numarası olan "hızlandırıcı" için iyi bir örnek teşkil eder.

![Slipaj ayrıntılar panelinden kontrol edilebilir](./6.png)

Belirli bir ekranda tek bir bilgi parçası hakkında değil, tüm akış hakkında dikkatlice düşünmek iyi bir fikir: Ana Formda sayıların girilmesi → Detayların taranması → Önizleme Ekranına tıklanması (eğer bir önizleme ekranına sahipseniz).
Ayrıntılar paneli her zaman görünür mü olmalı yoksa genişletmek için kullanıcı mı üzerine tıklamalı?
Önizleme ekranı ekleyerek sürtüşme yaratmaya gerek var mı? Bu, kullanıcıyı yavaşlayıp işlemini gözden geçirmeye zorlar ve bu da yararlı olabilir. Ancak kullanıcılar tüm bu bilgileri tekrar görmek ister mi? Bu noktada onlar için en faydalı olan nedir?

## Tasarım seçenekleri {#design-options}

Daha önce de belirtildiği gibi, bunların çoğu kişisel tarzınıza bağlıdır.
Kullanıcınız kim?
Markanız ne?
Tüm ayrıntıları gösteren "pro" bir arayüz mü yoksa minimalist bir arayüz mü istiyorsunuz?
Mümkün olan tüm bilgileri isteyen profesyonel kullanıcıları hedefliyor olsanız bile Alan Cooper'ın bu dahiyane sözünü unutmamalısınız:

> Arayüzünüz ne kadar güzel, ne kadar havalı olursa olsun, daha azı daha iyi olurdu.

### Yapı {#structure}

- jetonların solda ya da sağda olması
- 2 satır veya 3
- ayrıntıların butonun üstünde ya da altında olması
- ayrıntıların genişletilmiş, küçültülmüş veya gösterilmiyor olması

### Bileşen stili {#component-style}

- boş
- taslağı çizilmiş
- doldurulmuş

Olaya tamamen kullanıcı deneyimi açısından bakarsak, kullanıcı arayüzü stilinin etkisinin sandığınızdan daha az olduğunu söyleyebiliriz. Görsel trendler döngüler halinde değişirler ve çoğu tercih subjektiftir.

Bunu hissedebilmenin -ve farklı ayarlamalar hakkında düşünebilmenin - en kolay yolu, birkaç örneğe bakıp deneysel bir şeyler yapmanızdır.

Dahil edilen Figma kiti boş, taslağı çizilmiş ve doldurulmuş bileşenlerden oluşmaktadır.

Aşağıdaki örneklere baktığınızda tümünü bir araya getirmenin farklı yollarını görebilirsiniz:

![doldurulmuş stilde 3 satır](./7.png)

![taslağı çizilmiş stilde 3 satır](./8.png)

![boş stilde 2 satır](./9.png)

![taslağı çizilmiş stilde, ayrıntılar paneline sahip 3 satır](./10.png)

![giriş satırı taslağı çizilmiş stilde olan 3 satır](./11.png)

![doldurulmuş stilde 2 satır](./12.png)

## Ama jeton hangi tarafta olmalı? {#but-which-side-should-the-token-go-on}

Sonuç olarak, kullanılabilirlik açısından büyük bir fark yaratmayacağı söylenebilir. Ancak aklınızda bulundurmanız gereken ve kararınızı etkileyebilecek birkaç şey var.

Modanın zamanla nasıl değiştiğini görmek biraz ilginç bir deneyim oldu. Uniswap başlangıçta jetonu solda tutuyordu, fakat artık sağa geçirdi. Sushiswap da bir tasarım güncellemesi sırasında bu değişikliğe gitti. Hepsi olmasa da çoğu protokol aynı yolu izledi.

Geleneksel finansta para biriminin simgesi genelde sayının önüne koyulur, örneğin $50, €50, £50 gibi, fakat biz 50 Dolar, 50 Euro, 50 pound _diyoruz_.

Ortalama kullanıcı -özellikle soldan sağa, üstten alta okuyan biri için- jetonu sağda gördüğünde muhtemelen daha doğal hisseder.

![jetonların solda olduğu bir UI](./13.png)

Jetonu sola yerleştirip tüm sayıları sağda tuttuğunuzda hoş bir simetrik görüntü oluşur, bu da bir artıdır, fakat bu düzenin de farklı bir olumsuz tarafı vardır.

Yakınlık yasası, birbirine yakın duran öğelerin birbiriyle alakalı olarak değerlendirildiğini ifade eder. Buna uyarak alakalı öğeleri yan yana koymamız daha iyi olacaktır. Jeton bakiyesi doğrudan jetonun kendisine bağlıdır ve yeni bir jeton seçildiğinde değişir. Bu yüzden jeton bakiyesinin jeton seçme butonunun yanında olması biraz daha mantıklıdır. Jetonun altına da koyulabilir, fakat bu da yerleşim simetrisini bozar.

Sonuç olarak, iki seçeneğin de artıları ve eksileri vardır fakat jetonun sağa yerleştirilmesi ilginç bir şekilde daha popülerdir.

# Buton davranışı {#button-behavior}

Onaylama için ayrı bir buton oluşturmayın. Onaylama için ayrı bir tıklamaya da gerek olmasın. Kullanıcı Takas yapmak istiyor, butona “swap” deyin ve ilk adım olarak onayı başlatın. Bir mod, bir adımlayıcı ile ilerlemeyi veya basit bir "tx 1/2 - onaylanıyor" bildirimini gösterebilir.

![Onay ve takas için ayrı butonları olan bir UI](./14.png)

![Onayla yazan tek bir butona sahip bir UI](./15.png)

## Bağlamsal yardım olarak buton {#button-as-contextual-help}

Bu buton bir uyarı görevi de görebilir!

Bu, aslında Web3 dışında oldukça sıra dışı bir tasarım desenidir, ancak Web3 içerisinde standart hale gelmiştir. Aslında yerden tasarruf ettiği ve odağı topladığı için iyi bir yeniliktir.

Eğer ana eylem - SWAP - (Takas) bir hata nedeniyle kullanılamıyorsa, bunun nedeni düğme ile açıklanabilir, örneğin:

- ağ değiştirin
- cüzdanı bağlayın
- çeşitli hatalar

Buton, aynı zamanda gerçekleştirilmesi gereken **eylemle de eşleştirilebilir**. Mesela, eğer bir kullanıcı takas işlemini yanlış ağda olduğu için gerçekleştiremiyorsa butonun "Ethereum'a geç" demesi gerekir ve kullanıcı butona tıkladığında Ethereum ağına geçmelidir. Bu, kullanıcı akışını önemli derecede hızlandırır.

![Ana CTA'dan başlatılan temel eylemler](./16.png)

![Ana CTA içinde gösterilen hata mesajı](./17.png)

## Bu figma dosyasıyla kendinizinkini oluşturun {#build-your-own-with-this-figma-file}

Birçok farklı protokolün sıkı çalışması sayesinde merkeziyetsiz borsa tasarımı oldukça ilerledi. Kullanıcının hangi bilgilere ihtiyacı olduğunu, bu bilgileri nasıl göstermemiz gerektiğini ve bu akışı nasıl mümkün olabildiğince düzgün yapabileceğimizi biliyoruz.
Bu makalenin UX prensipleriyle ilgili sağlam bir temel sunabildiğini umarız.

Eğer denemek isterseniz, lütfen Figma web sitesi şeması kitini kullanmaktan çekinmeyin. Olabildiğince basit tuttuk, fakat çeşitli yollarla temel yapıyı oluşturabilmeye yetecek kadar esnekliğe sahip.

[Figma web sitesi şeması kiti](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi evrimine devam edecek ve gelişime her zaman yer var.

İyi şanslar!
