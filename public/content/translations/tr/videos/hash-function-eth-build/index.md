---
title: "Hash fonksiyonu — ETH.BUILD"
description: "ETH.BUILD eğitim aracını kullanarak kriptografik hash fonksiyonlarının bir gösterimi. Hash fonksiyonlarının nasıl çalıştığını ve Ethereum'un hesap ve veri bütünlüğü modeli için neden temel olduklarını öğrenin."
lang: tr
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Hash Fonksiyonları (ETH.BUILD)"
---

**Austin Griffith** tarafından hazırlanan, ETH.BUILD görsel programlama aracını kullanarak kriptografik hash fonksiyonlarının nasıl çalıştığını gösteren; determinizm, sabit uzunluklu çıktı, tek yönlülük özellikleri ve Merkle ağaçlarını kapsayan bir eğitim.

*Bu transkript, Austin Griffith tarafından yayınlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=QJ010l-pBpE) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

### Hash fonksiyonlarına giriş (0:00) {#introduction-to-hash-functions-000}

Bu, ETH.BUILD adlı serinin ilk videosudur. Bu aracı kullanmak için eth.build adresine gidebilirsiniz, ancak bu sadece biraz deneme yapmak ve Ethereum üzerinde geliştirme yaparken işlerin nasıl yürüdüğüne dair bir fikir edinmek içindir.

İnceleyeceğimiz ilk modül bir hash fonksiyonudur. Hash fonksiyonu da nedir? Aslında bir parmak izi gibidir. Bir girdiniz vardır — bu herhangi bir şey olabilir — ancak şimdilik sadece "hello world" metniyle ilerleyeceğiz. Diğer tarafta bir çıktınız olacak ve bu çıktı 64 karakterlik onaltılık (hexadecimal) bir dizedir. "0x" öneki nedeniyle 66 karakter diyor, ancak aslında 64 karakterlik bir hex dizesidir.

### Hash'leri renkler olarak görselleştirme (0:50) {#visualizing-hashes-as-colors-050}

Eğer hex'e bakıyorsanız, biraz bir renge benzer ve burada gördüğümüz şeyi sadece renk haline getirirsek tanımlamak daha kolay olabilir. Bu yüzden yapacağımız şey, dize ne olursa olsun ilk altı karakterini almak ve onu bir renk olarak göstermektir. Buna baktığımızda, güzel bir mor renk olduğunu görüyoruz.

Bakalım benim adım ne renkmiş — işte oldu, güzel bir orman yeşili. Şimdi "hello world"e geri dönelim — yine o mor renk.

### Determinizm ve sabit uzunluklu çıktı (1:38) {#determinism-and-fixed-length-output-138}

Az önce keşfettiğimiz şey, bunun deterministik olduğudur. Temel olarak, girdi olarak ne koyarsak koyalım, diğer tarafta her zaman aynı şeyi elde edeceğiz.

İkinci özellik, herhangi bir boyutta herhangi bir şey koyabilmenizdir. Klavyeye rastgele basıp rengin değiştiğini görebilirim, ancak o dize 66 karakter uzunluğunda kalır. Buraya ne koyarsanız koyun — bir dosya bile olsa — oğlum Leo'nun bu dosyasını bırakıp onu bir hash olarak koyabilir ve güzel bir turuncu renk elde edebilirim. Sonra bir BIP kelime listesi metin belgesi bırakabilirim ve bu güzel bir açık mavi olur. Leo'yu geri getirirsem, bilin bakalım ne renk olacak? O turuncu olacağını biliyoruz. Koyduğunuz şeyin bu deterministik parmak izini elde edersiniz.

### Tek yönlülük özelliği (2:37) {#one-directional-property-237}

Bir sonraki en önemli özellik tek yönlü olmasıdır. Tekrar "hello world" koyarsam, bu "4717" hash'ini elde edeceğiz. Eğer bu hash'i alıp birine gönderirsek ve "işte sırrımın hash'i — eğer sırrımı tahmin edebilirsen sana yüz papel vereceğim" dersek, yaklaşamayacaklar bile.

Diyelim ki hash "4717" ile başlıyor ve bir eşleşme bulmaya çalışarak etrafı kurcalamaya başlıyorlar. Sadece küçük karakterleri değiştirip yaklaşamazsınız — ya bulursunuz ya da bulamazsınız. Temel olarak kaba kuvvet (brute-force) ile tahmin etmeniz gerekir. Eğer tesadüfen "hello world"ü tahmin ederlerse cevabı bulurlar, ancak tahmin edemezlerse asla bulamayacaklar. Yaklaşıp yaklaşmadığınızı anlamanın bir yolu yoktur.

Kriptografi ile uğraşırken bir geliştirici olarak bazen sinir bozucu olduğunu göreceksiniz çünkü ya çalışır ya da çalışmaz — yaklaşıp yaklaşmadığınıza dair hiçbir ipucu almazsınız. Ama bu iyi bir şeydir. Bir hash fonksiyonundan istediğimiz özellik budur.

### Hash fonksiyonu özelliklerinin özeti (3:43) {#summary-of-hash-function-properties-343}

Yani elimizde şunlar var: herhangi bir boyuttaki herhangi bir şey bir hash fonksiyonuna beslenebilir ve o verinin ne olduğuna dair tam olarak 64 karakterlik onaltılık bir parmak izi çıkaracaktır. Deterministiktir. Tek yönlüdür — diğer yöne geri dönemezsiniz. Bir hash oluşturmak gerçekten kolaydır, ancak hash'in sırrını tahmin etmek gerçekten zordur.

### Merkle ağaçları ve hash'leri birleştirme (4:06) {#merkle-trees-and-combining-hashes-406}

Bununla yapabileceğimiz gerçekten harika şeyler var, örneğin bir Merkle ağacı. Üç girdimiz var ve bunları birleştirebiliriz. Tüm bu hash'leri birleştirebilir ve ardından bu kombinasyonun hash'ini alabiliriz.

İşte buradaki bu renk — o mor — tüm bu hash'lerin hash'ini temsil eder. Eğer "hello world"ü "hello world one" olarak değiştirirsem, o mor renk değişecektir. Bu girdilerden herhangi birindeki küçük bir değişiklik, nihai hash'in değişmesine neden olacaktır. Her türlü veriyi çok farklı şekillerde getirebilirsiniz — hatta bir hash ağacına, bir Merkle ağacına sahip olabilirsiniz — veya arka arkaya bir sürü bloğunuz olabilir ve bu nihai hash tüm bunlara dayanacaktır. Yol boyunca herhangi bir yerde küçük bir şey değişirse, nihai hash de değişecektir.

### Temel çıkarım (5:53) {#key-takeaway-553}

Temel çıkarım, bir hash fonksiyonunun temelde bir parmak izi gibi olduğudur. Bir şey yazarsam, bana deterministik olarak beklediğim çıktıyı verecektir. İşte bu bir hash fonksiyonudur — ETH.BUILD'e hoş geldiniz. Hadi harika şeyler yapalım ve bu süreçte çok şey öğrenelim.