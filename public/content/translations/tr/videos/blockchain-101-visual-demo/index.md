---
title: "Blokzincir 101: görsel bir demo"
description: "Blokzincir kavramlarını somut ve sezgisel hale getirmek için hashleme, bloklar, zincirler, dağıtık defterler ve token'ları kapsayan, blokzincir teknolojisinin nasıl çalıştığına dair bir gösterim."
lang: tr
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "cryptography"
format: presentation
author: Anders Brownworth
breadcrumb: "Blokzincir 101"
---

Anders Brownworth'un SHA-256 hashleme, bloklar, madencilik, blokzincirler, dağıtık defterler, token'lar ve daha fazlasını kapsayan bir anlatım içeren, blokzincir teknolojisinin nasıl çalıştığına dair görsel gösterimi.

*Bu transkript, Anders Brownworth tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=_160oMzblY8) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### SHA-256 hash (0:01) {#sha-256-hash-001}

Bu bir blokzincir demosudur. Bunu çok görsel bir şekilde yapacağız — bir blokzincirin ne olduğunun temel parçalarını adım adım inceleyerek anlaşılmasını çok kolaylaştıracağız.

Başlamadan önce, SHA-256 hash adı verilen bu şeye bir göz atmamız gerekiyor. Bir hash, bir dizi rastgele sayı gibi görünür ve temelde bazı dijital verilerin parmak izidir. Tesadüf o ki, bu kutuya ne yazarsam onun parmak izi oluyor. Bu kutuya adım olan "Anders" yazarsam, hash'in değiştiğini görürsünüz. Aslına bakarsanız, her harf yazdığımda değişti.

Yani bu, tamamı küçük harflerle "Anders" adının hash'idir — `19ea` ile başlar. Bunu silip tekrar "Anders" yazarsam, `19ea` ile başladığını görebilirsiniz — tamamen aynı hash. Bu anlamda, bu verinin dijital bir parmak izidir. Burada hangi veri olursa olsun, tamamen aynı veriyi her yazdığınızda tamamen aynı hash'i elde edersiniz.

İstediğim her şeyi yazabilirim. Hiçbir şey yazmayabilirsiniz — `e3b0` — bu hiçbir şeyin hash'idir. Veya tonlarca şey yazabilirsiniz. Aslına bakarsanız, Kongre Kütüphanesi'ni buraya koysanız bile bir hash elde edersiniz. İlginç olan şu ki, çok az miktarda bilgi, hiç bilgi olmaması veya tüm Kongre Kütüphanesi olması fark etmeksizin, her zaman bu uzunlukta bir hash elde edeceksiniz. Bunun ne olacağını önceden tahmin edemezsiniz — hash'in ne olduğunu bulmak için veriyi girmeniz gerekir, ancak tamamen aynı bilgiyi kaç kez girerseniz girin her zaman tamamen aynı hash'i elde edersiniz.

#### Blok (2:10) {#block-210}

Yapacağım şey, bu hash fikrini blok adını vereceğimiz bir şeye genişletmek. Bir blok tıpkı hash gibidir, ancak veri bölümü üç kısma ayrılmıştır: "blok" adı verilen bir kısım — sadece bir sayı, bu 1 numaralı bloktur — sadece başka bir sayı olan bir "nonce" ve ardından tıpkı daha önce sahip olduğumuz gibi bazı veriler.

Tüm bu bilgilerin hash'i aşağıdadır ve dört sıfırla başlar. Bu nispeten alışılmadık bir hash'tir — çoğu bu şekilde dört sıfırla başlamaz. Ancak bu başlıyor ve başladığı için, tamamen keyfi olarak, bu bloğun "imzalandığını" söyleyeceğim.

Bu bilgilerin herhangi bir parçasını değiştirseydim ne olurdu? Diyelim ki buraya bir şey yazdım — hash değişecek ve dört sıfırla başlama ihtimali nedir? Oldukça düşük. Sadece "merhaba" diyeceğim — şuna bakın, bu hash dört sıfırla başlamıyor ve arka plan kırmızıya döndü. Yani artık içinde bu bilgilerin bulunduğu bu bloğun geçerli veya imzalı bir blok olmadığını biliyorsunuz.

İşte nonce burada devreye giriyor. Nonce, hash'in tekrar dört sıfırla başlamasını sağlayan bir değer bulmaya çalışmak için ayarlayabileceğiniz bir sayıdır. Bütün gün burada oturup sayılar yazabilirdim ama bu küçük "Mine" (Madencilik Yap) düğmem var. Buna bastığımda olacak şey, hash'in dört sıfırla başladığı bir sayıyı bulmaya çalışmak için 1'den yukarı doğru tüm sayıları denemesidir. Bu işleme madencilik denir.

59.396'da durdu — ve bu sayı tesadüfen dört sıfırla başlayan bir hash üretiyor. İmzalı bir bloğun ne olduğuna dair tanımımı karşılıyor.

#### Blokzincir (5:16) {#blockchain-516}

Peki bana bir blokzincirin ne olduğunu söyleyebilir misiniz? Muhtemelen sadece bu blokların bir zinciridir. İşte benim blokzincirim — bir numaralı bloğun tıpkı önceki gibi bir nonce'u, bir veri alanı var, ancak daha sonra bir dizi sıfırdan oluşan bu "önceki" (previous) alanına sahip. İleriye doğru gidersek, bu ikinci blok, üçüncü blok, dördüncü blok — bu blokzincirde beş blok var.

Her blok için "önceki" alanı, kendinden önceki bloğun hash'idir. Her bloğun geriye doğru kendinden öncekini işaret ettiğini görebilirsiniz. O ilk bloğun bir öncekisi yoktur, bu yüzden sadece bir dizi sıfırdır.

Burada bazı bilgileri değiştirirsem ne olur? Bu bloğun hash'ini değiştirecek ve onu geçersiz kılacaktır. Peki ya daha önceki bir blokta bir şeyi değiştirirsem? O hash'i değiştirecek, ancak o hash bir sonraki bloğun "önceki" alanına kopyalanır, bu yüzden her iki bloğu da bozar. Geçmişte istediğimiz kadar geriye gidip o bloğu bozabiliriz ve o andan itibaren tüm blokları bozacaktır. Ondan önceki her şey hala yeşildir, ancak ondan sonraki her şey kırmızıya döner.

Gidip son bloğu değiştirirsem, tek yapmam gereken o tek bloğun madenciliğini yeniden yapmaktır. Zamanda çok geriye gidip bir değişiklik yaparsam, bunun, bunun, bunun ve bunun madenciliğini yapmam gerekir. Ne kadar çok blok geçerse, bir değişiklik yapmak o kadar zorlaşır. Bir blokzincir mutasyona — değişime — bu şekilde direnir.

#### Dağıtık blokzincir (9:18) {#distributed-blockchain-918}

Peki blokzincirimin yeniden madenciliğinin yapılıp yapılmadığını nasıl bilebilirim? Artık dağıtık bir blokzincirimiz var. Tıpkı son blokzincire benziyor, ancak bu Eş A. Buraya inerseniz, Eş B'yi görebilirsiniz ve blokzincirin tam bir kopyasına sahiptir. Ayrıca bir Eş C de var — bu sonsuza kadar gidebilir. İnternette birçok eş vardır ve hepsinde blokzincirin tam bir kopyası bulunur.

Bu hash'e bakarsam, `e4b` olduğunu görürüm. Bir sonrakine inersem, onda da `e4b` var. Tamamen aynı olmalılar. Şimdi buraya gidip bir şey yazarsam, bu bloğun madenciliğini yeniden yaparsam ve ardından sonraki blokların madenciliğini yaparsam — tüm zincirler yeşil olur. Ancak, bu zincir son hash'in `e4b` olduğunu söylüyor, en alttaki de `e4b` diyor ve bu ortadaki `4cae` diyor.

Yani sadece bu küçük hash'e göz atarak bu blokzincirde bir şeylerin yanlış olduğunu biliyorum. Tüm hash'ler dört sıfırla başlasa bile, bu farklı. Temelde ikiye karşı bir — burada küçük bir demokrasiyiz. Yani `e4b` kazanır. Birçok farklı bilgisayarda tamamen dağıtık bir kopyaya sahip olmak, tüm blokların aynı olup olmadığını hızlıca görmenizi bu şekilde sağlar.

Blokzincirler çok kolay bir şekilde 400.000 veya 500.000 bloğa sahip olabilir. Hepsini tek tek kontrol etmek yerine, tek yapmanız gereken en sonuncusunun hash'ine bakmaktır ve geçmişte herhangi bir şeyin değiştirilip değiştirilmediğini görebilirsiniz.

#### Token'lar (12:17) {#tokens-1217}

Tüm olay bu — bundan daha fazlası yok. Ancak pek de yararlı değil çünkü veri alanında anlam ifade eden hiçbir şeyimiz yok. Asıl istediğimiz şey bir Token.

Şimdi bu token'lara sahibim — tamamen keyfi olarak onlara dolar diyorum. Darcy'den Bingley'e yirmi beş dolarımız, Elizabeth'ten Jane'e dört dolar yirmi yedi sentimiz var — ana fikri anladınız. Gerçekleşen tüm bu işlemler var ve ben sadece verileri bu işlemlerle değiştirdim. Tıpkı daha önce olduğu gibi, aşağı inersek aynı blokzincirin diğer tüm kopyalarına sahip olduğumuzu fark ederiz.

İşte değişmezliğin önemli olduğu yer burasıdır. Burada geriye dönük bir şeyi değiştirirsem, hash diğer kopyalardakinden farklı olacaktır. Zamanda geriye gidip bir değeri değiştirirseniz, bunu fark etmemiz çok önemlidir. Parayla ilgili olarak ipin ucunu kaçırmamanız çok önemlidir ve bir blokzincir kullanmanın tüm amacı da budur — geçmişte olan şeylerdeki her türlü değişikliğe direnmek.

Belirtmek istediğim bir şey var: "Darcy'nin yüz doları var ve Bingley'e 25 veriyor" diye listelemiyoruz. Banka hesap bakiyelerini değil, yalnızca para hareketlerini hatırlıyoruz. Bu da şu soruyu akla getiriyor — Darcy'nin 25 doları var mı?

#### Coinbase işlemi (14:34) {#coinbase-transaction-1434}

Blokzincirin bu sürümünde bir sorunumuz var: Darcy'nin 25 doları olup olmadığını aslında bilmiyoruz. O halde bir Coinbase işlemine bakalım. Bloklarımıza bir Coinbase işlemi ekliyoruz — havadan yüz dolar icat edip Anders'e vereceğimizi söylüyor. Bu blokta başka hiçbir işlem yok çünkü bundan önce kimsenin parası yoktu.

Bir sonraki blokta, yine havadan yüz dolar geliyor ve Anders'e gidiyor. Artık bazı işlemlerimiz var — hepsi Anders'ten çünkü bu noktada parası olan tek kişi benim. On dolarımı Sophie'ye gönderiyorum. On dolarım var mı? Evet — geriye bakıyorum ve Coinbase işleminin bana yüz dolar verdiğini görüyorum, yani en az on dolarım var.

Tüm bunları topladığınızda yüzü geçmiyorlar. Para biriminin temel bir kuralını izler: havadan para yaratamazsınız ve dağılımı kontrol altındadır.

Zamanda ileriye doğru gidersek, Jackson'ın Alexa'ya iki dolar verdiğini görürüz. Jackson'ın gerçekten iki doları var mı? Bir blok geriye gidiyoruz ve Emily'nin Anders'ten on dolar aldığını ve Jackson'a on dolar verdiğini görüyoruz. Yani Jackson'ın parası var. Geriye gidip bunu öğrenebiliriz — bu, "önceki" alanına sahip olmanın faydalarından biridir.

#### Kapanış (16:30) {#closing-1630}

Bu, üzerinde bir para birimi çalışan temel bir blokzincirdir. Bildiğiniz gibi, blokzincirlerin birçok kopyası vardır — herkeste bir kopya bulunur. Bir şeyi mutasyona uğratıp altı dolar yaparsak, bloklar geçersiz hale gelir ve diğer kopyalarla uyuşmaz. Bu, bir para birimi için isteyeceğiniz şey olan kurcalanmaya karşı direnç gösterir. Küçük ve işlemsel şeyler için çok iyi çalışır.

Blokzincirler, geçmişte ne olduğu konusunda anlaşmaya varmanın çok verimli bir yoludur — zamanla ilerleyen bu değişmez tarih. Bazı ana noktaları yüzeysel geçiyoruz, ancak demoyu inceler, bu şeylere tıklar ve onunla oynarsanız, bunun nasıl çalıştığına dair giderek daha iyi bir fikir edineceksiniz.