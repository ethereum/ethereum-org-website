---
title: "İlk akıllı sözleşmeni dağıtma"
description: "Bir Ethereum test ağında ilk akıllı sözleşmeni dağıtmaya giriş"
author: "jdourlens"
tags: [ "akıllı kontratlar", "remix", "katılık", "dağıtma" ]
skill: beginner
lang: tr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Sanırım sen de Ethereum blokzincirinde ilk [akıllı sözleşmeni](/developers/docs/smart-contracts/) [dağıtmaya](/developers/docs/smart-contracts/deploying/) ve onunla etkileşime geçmeye bizim kadar heveslisin.

Endişelenme, bu ilk akıllı sözleşmemiz olduğu için onu [yerel bir test ağında](/developers/docs/networks/) dağıtacağız, böylece dağıtmak ve onunla dilediğince oynamak sana hiçbir maliyeti olmayacak.

## Sözleşmemizi yazma {#writing-our-contract}

İlk adım olarak [Remix'i ziyaret edip](https://remix.ethereum.org/) yeni bir dosya oluştur. Remix arayüzünün sol üst kısmından yeni bir dosya ekle ve istediğin dosya adını gir.

![Remix arayüzünde yeni bir dosya ekleme](./remix.png)

Yeni dosyaya aşağıdaki kodu yapıştıracağız.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Sayım sayısını tutmak için işaretsiz tamsayı türünde herkese açık değişken
    uint256 public count = 0;

    // Sayacımızı artıran fonksiyon
    function increment() public {
        count += 1;
    }

    // Sayım değerini almak için gerekli olmayan alıcı
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Programlamaya aşinaysan bu programın ne yaptığını kolayca tahmin edebilirsin. Satır satır açıklaması şöyledir:

- 4. Satır: `Counter` adıyla bir sözleşme tanımlıyoruz.
- 7. Satır: Sözleşmemiz, 0'dan başlayan `count` adında işaretsiz bir tamsayı depolar.
- 10. Satır: İlk fonksiyon, sözleşmenin durumunu değiştirir ve `count` değişkenimizi artırır.
- 15. Satır: İkinci fonksiyon, akıllı sözleşmenin dışından `count` değişkeninin değerini okuyabilmek için kullanılan bir alıcıdır. `count` değişkenimizi herkese açık (public) olarak tanımladığımız için bunun gerekli olmadığını, yalnızca örnek olarak gösterildiğini unutma.

İlk basit akıllı sözleşmemiz için hepsi bu kadar. Bilebileceğin üzere, bu Java veya C++ gibi OOP (Nesne Yönelimli Programlama) dillerindeki bir sınıfa benziyor. Şimdi sözleşmemizle oynama zamanı.

## Sözleşmemizi dağıtma {#deploying-our-contract}

İlk akıllı sözleşmemizi yazdığımıza göre, şimdi onunla oynayabilmek için blokzincirine dağıtacağız.

[Akıllı sözleşmeyi blokzincirinde dağıtmak](/developers/docs/smart-contracts/deploying/), aslında derlenmiş akıllı sözleşmenin kodunu içeren bir işlemi herhangi bir alıcı belirtmeden göndermekten ibarettir.

Önce, sol taraftaki derleme simgesine tıklayarak [sözleşmeyi derleyeceğiz](/developers/docs/smart-contracts/compiling/):

![Remix araç çubuğundaki derleme simgesi](./remix-compile-button.png)

Ardından derle düğmesine tıkla:

![Remix Solidity derleyicisindeki derle düğmesi](./remix-compile.png)

İçeriği metin düzenleyiciye kaydettiğinde sözleşmenin her zaman derlenmesi için “Otomatik derle” seçeneğini tercih edebilirsin.

Ardından "Dağıt ve işlemleri çalıştır" ekranına git:

![Remix araç çubuğundaki dağıtma simgesi](./remix-deploy.png)

"Dağıt ve işlemleri çalıştır" ekranına geldiğinde, sözleşme adının göründüğünü kontrol et ve Dağıt'a tıkla. Sayfanın üst kısmında görebileceğin gibi, mevcut ortam “JavaScript VM”dir. Bu, daha hızlı ve hiçbir ücret ödemeden test edebilmek için akıllı sözleşmemizi yerel bir test blokzincirinde dağıtacağımız ve etkileşime gireceğimiz anlamına gelir.

![Remix Solidity derleyicisindeki dağıt düğmesi](./remix-deploy-button.png)

“Dağıt” düğmesine tıkladıktan sonra sözleşmenin en altta belirdiğini göreceksin. Sözleşmemizin içeriğini görmek için solundaki oka tıklayarak genişlet. Bu bizim `counter` değişkenimiz, `increment()` fonksiyonumuz ve `getCounter()` alıcımızdır.

`count` veya `getCount` düğmesine tıklarsan sözleşmenin `count` değişkeninin içeriğini alır ve görüntüler. Henüz `increment` fonksiyonunu çağırmadığımız için 0 göstermesi gerekir.

![Remix Solidity derleyicisindeki fonksiyon düğmesi](./remix-function-button.png)

Şimdi düğmeye tıklayarak `increment` fonksiyonunu çağıralım. Pencerenin en altında, yapılan işlemlerin kayıtlarının belirdiğini göreceksin. `increment` düğmesi yerine veriyi almak için olan düğmeye bastığında kayıtların farklı olduğunu göreceksin. Bunun nedeni, blokzincirinden veri okumanın herhangi bir işlem (yazma) veya ücret gerektirmemesidir. Çünkü sadece blokzincirinin durumunu değiştirmek bir işlem yapmayı gerektirir:

![İşlemlerin bir kaydı](./transaction-log.png)

`increment()` fonksiyonumuzu çağırmak için bir işlem oluşturan increment düğmesine bastıktan sonra `count` veya `getCount` düğmelerine tekrar tıkladığımızda, akıllı sözleşmemizin yeni güncellenmiş durumunu `count` değişkeni 0'dan büyük olacak şekilde okuyacağız.

![Akıllı sözleşmenin yeni güncellenmiş durumu](./updated-state.png)

Bir sonraki öğreticide, [akıllı sözleşmelerinize nasıl olay ekleyebileceğinizi](/developers/tutorials/logging-events-smart-contracts/) ele alacağız. Olayları kaydetmek, akıllı sözleşmendeki hataları ayıklamak ve bir fonksiyonu çağırırken neler olduğunu anlamak için uygun bir yoldur.
