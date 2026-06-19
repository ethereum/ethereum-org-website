---
title: İlk akıllı sözleşmenizi dağıtmak
description: Bir Ethereum test ağında ilk akıllı sözleşmenizi dağıtmaya giriş
author: "jdourlens"
tags: ["akıllı sözleşmeler", "remix", "solidity", "dağıtmak"]
skill: beginner
breadcrumb: İlk sözleşmeyi dağıt
lang: tr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Sanırım siz de Ethereum blokzincirinde ilk [akıllı sözleşmenizi](/developers/docs/smart-contracts/) [dağıtmak](/developers/docs/smart-contracts/deploying/) ve onunla etkileşime geçmek için bizim kadar heyecanlısınız.

Endişelenmeyin, bu bizim ilk akıllı sözleşmemiz olduğu için onu [yerel bir test ağında](/developers/docs/networks/) dağıtacağız, böylece dağıtmak ve onunla dilediğiniz kadar oynamak size hiçbir şeye mal olmayacak.

## Sözleşmemizi yazmak {#writing-our-contract}

İlk adım [Remix'i ziyaret etmek](https://remix.ethereum.org/) ve yeni bir dosya oluşturmaktır. Remix arayüzünün sol üst kısmında yeni bir dosya ekleyin ve istediğiniz dosya adını girin.

![Adding a new file in the Remix interface](./remix.png)

Yeni dosyaya aşağıdaki kodu yapıştıracağız.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Sayım sayısını tutmak için unsigned int türünde herkese açık değişken
    uint256 public count = 0;

    // Sayacımızı artıran fonksiyon
    function increment() public {
        count += 1;
    }

    // Sayım değerini almak için gerekli olmayan getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Eğer programlamaya aşinaysanız, bu programın ne yaptığını kolayca tahmin edebilirsiniz. İşte satır satır açıklaması:

- 4. Satır: `Counter` adında bir sözleşme tanımlıyoruz.
- 7. Satır: Sözleşmemiz, 0'dan başlayan `count` adında işaretsiz bir tam sayı (unsigned integer) saklar.
- 10. Satır: İlk işlev, sözleşmenin durumunu değiştirecek ve `count` değişkenimizi artıracaktır (`increment()`).
- 15. Satır: İkinci işlev, `count` değişkeninin değerini akıllı sözleşmenin dışında okuyabilmek için sadece bir alıcıdır (getter). `count` değişkenimizi public (genel) olarak tanımladığımız için bunun gerekli olmadığını, ancak bir örnek olarak gösterildiğini unutmayın.

İlk basit akıllı sözleşmemiz için hepsi bu kadar. Bildiğiniz gibi, Java veya C++ gibi NYP (Nesne Yönelimli Programlama) dillerindeki bir sınıfa benziyor. Şimdi sözleşmemizle oynama zamanı.

## Sözleşmemizi dağıtmak {#deploying-our-contract}

İlk akıllı sözleşmemizi yazdığımıza göre, şimdi onunla oynayabilmek için onu blokzincirine dağıtacağız.

[Akıllı sözleşmeyi blokzincirinde dağıtmak](/developers/docs/smart-contracts/deploying/), aslında sadece derlenmiş akıllı sözleşmenin kodunu içeren bir işlemi herhangi bir alıcı belirtmeden göndermektir.

Öncelikle sol taraftaki derleme (compile) simgesine tıklayarak [sözleşmeyi derleyeceğiz](/developers/docs/smart-contracts/compiling/):

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Ardından derleme (compile) düğmesine tıklayın:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Metin düzenleyicide içeriği kaydettiğinizde sözleşmenin her zaman derlenmesi için "Auto compile" (Otomatik derle) seçeneğini seçebilirsiniz.

Ardından "deploy and run transactions" (işlemleri dağıt ve çalıştır) ekranına gidin:

![The deploy icon in the Remix toolbar](./remix-deploy.png)

"deploy and run transactions" ekranına geldiğinizde, sözleşme adınızın göründüğünü iki kez kontrol edin ve Deploy (Dağıt) düğmesine tıklayın. Sayfanın üst kısmında görebileceğiniz gibi, mevcut ortam "JavaScript VM"dir; bu, daha hızlı ve herhangi bir ücret ödemeden test yapabilmek için akıllı sözleşmemizi yerel bir test blokzincirinde dağıtacağımız ve onunla etkileşime gireceğimiz anlamına gelir.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

"Deploy" düğmesine tıkladığınızda, sözleşmenizin alt kısımda belirdiğini göreceksiniz. Sözleşmemizin içeriğini görmek için soldaki oka tıklayarak genişletin. Burada `counter` değişkenimiz, `increment()` işlevimiz ve alıcı (getter) `getCounter()` işlevimiz bulunmaktadır.

`count` veya `getCount` düğmesine tıklarsanız, sözleşmenin `count` değişkeninin içeriğini alacak ve görüntüleyecektir. Henüz `increment` işlevini çağırmadığımız için 0 göstermelidir.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Şimdi düğmeye tıklayarak `increment` işlevini çağıralım. Yapılan işlemlerin günlüklerinin pencerenin alt kısmında belirdiğini göreceksiniz. `increment` düğmesi yerine verileri almak için düğmeye bastığınızda günlüklerin farklı olduğunu göreceksiniz. Bunun nedeni, blokzincirindeki verileri okumanın herhangi bir işlem (yazma) veya ücret gerektirmemesidir. Çünkü yalnızca blokzincirinin durumunu değiştirmek bir işlem yapmayı gerektirir:

![A log of transactions](./transaction-log.png)

`increment()` işlevimizi çağırmak için bir işlem oluşturacak olan increment (artırma) düğmesine bastıktan sonra, count veya getCount düğmelerine tekrar tıklarsak, count değişkeninin 0'dan büyük olduğu akıllı sözleşmemizin yeni güncellenmiş durumunu okuruz.

![Newly updated state of the smart contract](./updated-state.png)

Bir sonraki eğitimde, [akıllı sözleşmelerinize nasıl olaylar ekleyebileceğinizi](/developers/tutorials/logging-events-smart-contracts/) ele alacağız. Olayları günlüğe kaydetmek, akıllı sözleşmenizde hata ayıklamanın ve bir işlevi çağırırken neler olduğunu anlamanın uygun bir yoludur.