---
title: İlk akıllı sözleşmenizi dağıtın
description: Ethereum test ağında ilk akıllı sözleşmenizi nasıl dağıtacağınızı öğrenin
author: "jdourlens"
tags:
  - "akıllı kontratlar"
  - "karışım"
  - "katılık"
  - "başlarken"
  - "dağıtma"
skill: beginner
lang: tr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum blok zincirinde ilk [akıllı sözleşmenizi](/developers/docs/smart-contracts/) [dağıtmak](/developers/docs/smart-contracts/deploying/) ve onunla etkileşimde bulunmak için eminiz ki siz de en az bizim kadar heyecanlısınızdır.

Endişelenmeyin; bu sözleşmeyi [yerel test ağında](/developers/docs/networks/) yayınlayacağımız için size herhangi bir bedele mal olmayacak. Üzerinde dilediğiniz şekilde oynayabilirsiniz.

## Sözleşmemizi yazmaya başlayalım {#writing-our-contract}

İlk adım olarak [Remix'e](https://remix.ethereum.org/) gidin ve yeni bir dosya oluşturun. Remix arayüzünün sol üst köşesinde yer alan yeni dosya simgesini kullanarak yeni bir dosya oluşturun ve dosyanıza isim verin.

![Remix arayüzünde yeni dosya oluşturma](./remix.png)

Bu yeni dosyaya aşağıdaki kodu yapıştırıyoruz.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Temel programlama bilgisi olanlar bu kod parçasının ne yaptığını tahmin edeceklerdir. Satır satır açıklayacak olursak:

- Satır 3: `Counter` adında yeni bir sözleşme tanımlıyoruz.
- Satır 6: Sözleşmemiz ilk değeri sıfır olan `count` adında pozitif tam sayı değişkenini içeriyor.
- Satır 9: İlk fonksiyon `increment()` değişkenimiz `count` değerini değiştirir ve sözleşmemizin durumu günceller.
- Satır 14: İkinci fonksiyon, basitçe `count` değerini akıllı sözleşmenin dışından okumamızı sağlayan bir alıcıdır. Aslında `count` değişkenini zaten herkesin erişime açık (public) tanımladığımız için bunu yapmamıza gerek yoktu ama sadece örnek olarak göstermek istedik.

İlk akıllı sözleşmemiz için hepsi bu kadar. Bilenler tahmin edecektir ki bu Java veya C++ dillerindeki sınıflara benziyor. Şimdi sözleşmemizle oynamaya başlayalım.

## Sözleşmemizi dağıtma {#deploying-our-contract}

Sözleşmemizle etkileşimde bulunabilmek için öncelikle onu blok zincirinde dağıtacağız.

Bir [sözleşmeyi blok zincirinde dağıtmak](/developers/docs/smart-contracts/deploying/), aslında sadece sözleşme kodunun derlenmiş halini, herhangi bir alıcı belirtmeden, işlem olarak ağa göndermekten ibarettir.

Öncelikle sol tarafta yer alan derle simgesini kullanarak [sözleşmemizi derleyeceğiz](/developers/docs/smart-contracts/compiling/):

![Remix araç çubuğundaki derleme simgesi](./remix-compile-button.png)

Ardından Compile butonuna tıklayın:

![Remix solidity derleyicisindeki compile (derle) düğmesi](./remix-compile.png)

Dilerseniz "Auto compile" seçeneğini seçebilirsiniz. Böylece sözleşmenizi güncellediğiniz zaman sözleşmeinz otomatik olarak derlenir.

Ardından "deploy and run transactions" ekranına gidin:

![Remix araç çubuğundaki yayınla simgesi](./remix-deploy.png)

Bu ekranda öncelikle sözleşmeye verdiğimiz ismin göründüğünden emin olmalısınız. Sözleşme adını görüyorsanız Deploy butonuna tıklayın. Sayfanın üst kısmında görebileceğiniz gibi, mevcut ortam “JavaScript VM”, yani bu daha hızlı ve herhangi bir ücret ödemeden test edebilmek için akıllı sözleşmemizi yerel bir test blok zincirinde dağıtıp etkileşime geçeceğimiz anlamına geliyor.

![Remix solidity derleyicisindeki deploy (dağıt) düğmesi](./remix-deploy-button.png)

"Deploy" düğmesine tıkladıktan sonra akıllı sözleşmemiz alt kısımda görünecek. Sol başındaki ok simgesini kullanarak sözleşmemizin içeriğini görüntüleyebiliriz. Bu, değişken `counter`'ımız (sayaç), `increment()` (artış) fonksiyonumuz ve alıcımız `getCounter()`'dır.

Burada `count` veya `getCount` düğmelerine tıklarsanız, sözleşmede tanımlamış olduğumuz `count` değişkeninin içeriğini alıp görüntüleyebilirsiniz. Şu ana dek `increment` fonksiyonunu hiç çağırmadığımız için göreceğimiz değer 0 olmalı.

![Remix solidity derleyicisindeki function (fonksiyon) düğmesi](./remix-function-button.png)

Şimdi de düğmeye tıklayarak `increment` fonksiyonunu çağıralım. Ekranın alt kısmında gerçekleşmekte olan işleme ait işlem dökümlerini göreceksiniz. `increment` düğmesi yerine verileri alma düğmesine tıkladığınızda kayıtların farklı olduğunu göreceksiniz. Bunun sebebi, blok zincirindeki herhangi bir veriyi okumanın masrafsız ve işlem gerektirmeyen (kaydetmek anlamında) olmasıdır. Sadece blok zincirinin durumunu güncelleyen eylemler işlem olarak nitelendirilir:

![İşlemlerin kaydı](./transaction-log.png)

`increment()` fonksiyonumuzu çağırmak için bir işlem oluşturan increment düğmesine bastıktan sonra tekrar count veya getCount düğmelerine basarsak akıllı sözleşmemizin yeni güncellenmiş durumunu count değişkeninin 0'dan büyük olduğu hâliyle görebiliriz.

![Akıllı sözleşmenin yeni güncellenmiş durumu](./updated-state.png)

Sonraki öğreticimizde [akıllı sözleşmelere nasıl olay ekleyebileceğimizden](/developers/tutorials/logging-events-smart-contracts/) bahsedeceğiz. Olayları kayıt altına alarak akıllı sözleşmemizin hata ayıklamasını yapabilir ve fonksiyonları çağırdığımızda neler olduğunu ayrıntılı bir şekilde görebiliriz.
