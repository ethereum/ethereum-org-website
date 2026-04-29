---
title: "Anahtar çifti — ETH.BUILD"
description: "ETH.BUILD eğitim aracını kullanarak açık-özel anahtar çiftlerinin bir gösterimi. Kriptografik anahtar çiftlerinin Ethereum hesaplarını nasıl güvence altına aldığını ve işlem imzalamayı nasıl sağladığını anlayın."
lang: tr
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "hesaplar"
  - "kriptografi"
format: tutorial
author: Austin Griffith
breadcrumb: "Anahtar Çiftleri (ETH.BUILD)"
---

**Austin Griffith** tarafından hazırlanan, ETH.BUILD görsel programlama aracını kullanarak açık-özel anahtar çiftlerinin nasıl çalıştığını gösteren; özel anahtar oluşturma, açık anahtar türetme, mesaj imzalama ve imza kurtarma konularını kapsayan bir eğitim.

*Bu transkript, Austin Griffith tarafından yayınlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=9LtBDy67Tho) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

### Özel anahtar (0:00) {#the-private-key-000}

İlk videoda bir hash kullandık ve hash'ler ilerleyen süreçte önemli olacak. Ancak bir sonraki en önemli parça bir anahtar çiftidir. Bir anahtar çiftinin en önemli parçası özel anahtardır. Hadi bir tane oluşturalım — bu temelde, az önce üzerinde çalıştığımız hash ile aynı boyutta, rastgele 64 karakterlik onaltılık (hexadecimal) bir dizedir.

Bununla özel anahtarınız olarak başlarsınız ve ardından eliptik eğri kriptografisi kullanarak — yan görev olarak Wikipedia'dan inceleyebilirsiniz — bir açık anahtar türetiriz. Yani artık bir özel anahtarımız ve bir açık anahtarımız var. Az önce yoktan bir özel anahtar oluşturduk ve açık anahtar bize bir adres veriyor. Burası insanların gerçekten para gönderebileceği yerdir. Birisi "Ethereum adresime gönder" dediğinde, bahsettiği şey budur.

Eğer Wells Fargo'da bir hesap açmak isteseydim, bankaya kadar arabayla gitmem ve onlara bir sürü bilgi vermem gerekirdi. Bu biraz zaman alırdı. Ancak para gönderip alabileceğim böyle kriptografik bir sistemde bir hesap oluşturmak için sadece bu özel anahtarı oluşturmam yeterli. Bu 64 karakterlik onaltılık özel anahtar diğer her şeyi türetir.

### Mesajları imzalama ve kurtarma (1:54) {#signing-and-recovering-messages-154}

Bu anahtar çifti hakkında keşfetmemiz gereken gerçekten harika bir özellik var, o da mesajları imzalama ve kurtarmadır. Temel olarak, özel anahtarınızı alırsınız ve onu bir tür mesajı imzalamak için kullanırsınız. Bir mesaj yazalım — "ayı balla yapış yapış".

Bunu mesajımız olarak giriyoruz ve otomatik imzalama (auto-sign) etkinken bize bir imza döndürüyor. Tıpkı hash gibi, imzamız da temelde mesajı ve özel anahtarımızı alıp bir şeyi imzalamaktır. Buradan elde ettiğimiz şey bir imzadır.

Bunu dünyaya gönderebilirim — bunu herkese açık olarak gönderebilirim — bu imza dizesini mesajla birlikte. Herhangi birinin matematikle yapabileceği şey, bunu özellikle benim imzaladığımı doğrulamaktır.

### İmzalayanın adresini kurtarma (3:17) {#recovering-the-signers-address-317}

Bunun nasıl çalıştığını size göstereyim. Bir "kurtarma" (recover) yöntemi kullanıyoruz. İki girdiye ihtiyacımız var: mesaj — "ayı balla yapış yapış" — ve imza. Buradan çıkan sonuç, onu imzalamak için kullanılan adrestir. Blockie ikonlarını (identicons) kullanarak hesabın o mesajı imzaladığını görsel olarak görebiliriz.

Bunu kurcalamanın hiçbir yolu yoktur. Eğer birisi tek bir kelimeyi bile değiştirirse — örneğin "ayı" kelimesini "porsuk" ile değiştirmek gibi — her şey değişir. Aynı imza ile bile, farklı bir mesaj doğru olanı değil, farklı bir adresi ortaya çıkarır.

Bu mesaj kurcalanamaz. Oraya bir zaman damgası ekleyebiliriz — "bu günde bir şeyin olacağını tahmin ediyorum" diyebiliriz, imzalayabiliriz, imzayı ve mesajı yayınlayabiliriz ve zamanın sonuna kadar herkes o mesajı o zamanda imzaladığınızı matematiksel olarak kanıtlayabilir.

### Bir anahtar çiftinin temel özelliği (4:58) {#the-key-property-of-a-key-pair-458}

Bu, bir anahtar çiftinin temel özelliğidir. Sadece 64 karakterlik onaltılık rastgele bir dizeden oluşturulan bir anahtar çifti, bir mesajı imzalamak için kullanılabilir ve ardından bu mesaj kurtarılabilir.

- Özel anahtar + mesaj = imza
- İmza + mesaj = açık adres

Verileri özel anahtarımızla imzalayabiliriz ve insanlar onu imzalayanın biz olduğumuzu kanıtlayabilir. Bu, bir sonraki adım için önemli bir parça olacak.