---
title: Olaylar ile akıllı sözleşmelerden veri toplama
description: Akıllı sözleşmelerde olayların ne olduğu ve veri toplamak için nasıl kullanıldığını öğrenin
author: "jdourlens"
tags:
  - "akıllı sözleşmeler"
  - "remix"
  - "solidity"
  - "olaylar"
skill: intermediate
lang: tr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidity'de [olaylar](/developers/docs/smart-contracts/anatomy/#events-and-logs), akıllı sözleşmenin gönderebileceği kaydedilmiş sinyallerdir. Merkeziyetsiz uygulamalar ya da Ethereum JSON-RPC API'sine bağlı herhangi bir şey, bu olayları dinleyip gerektiği şekilde hareket edebilir. Her bir olay endekslenir böylece olay tarihi sonrasında tekrar aranabilir olur.

## Olaylar {#events}

Bu makalenin yazıldığı sırada Ethereum blok zincirindeki en yaygın olay, biri token'ları transfer ettiğinde ERC20 token'ları tarafından yayılan Transfer olayıdır.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Olay imzası sözleşme kodu içerisinde tanımlanmıştır ve yayın anahtarıyla yayınlanabilir. Örneğin Transfer olayı, transferi kimin (_from_) gerçekleştirdiğini, kime yönelik (_to_) gerçekleştirdiğini ve ne kadar token (_value_) transfer edildiğini kayıt altına alır.

Counter (Sayaç) akıllı sözleşmemize geri dönersek ve değer her değiştiğinde oturum açmaya karar verirsek. Bu sözleşmenin dağıtılması değil, kendisini genişleterek başka bir sözleşme oluşturmak için bir temel görevi görmesi hedeflendiğinden buna soyut sözleşme denir. Sayaç örneğimizde şöyle görünür:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts
    uint256 private count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Şu satırlara dikkat:

- **Satır 5**: Olayımızı ve içeriğini, eski değeri ve yeni değeri beyan ederiz.

- **Satır 13**: Değişkenimiz count değeri değiştiğinde olayımızı yayınlıyoruz.

Şimdi sözleşmemizi tekrar yayınlar ve increment fonksiyonunu çağırırsak Remix'in kayıtlarında logs dizisi içinde olayımızın gerçekleştiğini görebiliriz.

![Remix ekran görüntüsü](./remix-screenshot.png)

Kayıtlar, sözleşmelerdeki hataları ayıklamak için çok kullanışlıdır ve aynı zamanda sözleşmenizi kullanacak olan kişilerin nasıl kullandıklarını gözlemleyebilmenizi sağlar. İşlemler tarafından oluşturulan kayıtlar popüler blok arayıcılarında gösterilir ve ayrıca bu kayıtları, örneğin belirli olayları dinlemek ve bu olaylar gerçekleştiğinde harekete geçmek amacıyla zincir dışı komut dosyaları yaratmak için kullanabilirsiniz.
