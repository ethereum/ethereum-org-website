---
title: "Olaylar ile akıllı sözleşmelerden veri kaydetme"
description: "Akıllı sözleşme olaylarına giriş ve bunları veri kaydetmek için nasıl kullanabileceğiniz"
author: "jdourlens"
tags: [ "akıllı kontratlar", "remix", "katılık", "olaylar" ]
skill: intermediate
lang: tr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidity'de [olaylar](/developers/docs/smart-contracts/anatomy/#events-and-logs), akıllı sözleşmelerin tetikleyebileceği yayılan sinyallerdir. Merkeziyetsiz uygulamalar ya da Ethereum JSON-RPC API'sine bağlı herhangi bir şey, bu olayları dinleyip gerektiği şekilde hareket edebilir. Bir olay, olay geçmişinin daha sonra aranabilmesi için dizine de eklenebilir.

## Olaylar {#events}

Bu makalenin yazıldığı sırada Ethereum blokzincirindeki en yaygın olay, birisi jetonları transfer ettiğinde ERC20 jetonları tarafından yayılan Transfer olayıdır.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Olay imzası, sözleşme kodunun içinde bildirilir ve `emit` anahtar kelimesi ile yayılabilir. Örneğin, Transfer olayı; transferi kimin gönderdiğini (_from_), kime gönderildiğini (_to_) ve ne kadar jeton transfer edildiğini (_value_) kaydeder.

Eğer Counter akıllı sözleşmemize geri döner ve değer her değiştiğinde kaydetmeye karar verirsek. Bu sözleşmenin dağıtılması değil, onu genişleterek başka bir sözleşme oluşturmak için bir temel görevi görmesi amaçlandığından, buna soyut sözleşme denir. Counter örneğimizde şöyle görünür:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Sayım sayısını tutmak için işaretsiz tamsayı türünde özel değişken
    uint256 private count = 0;

    // Sayacımızı artıran işlev
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Sayım değerini almak için alıcı işlevi
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Şunlara dikkat edin:

- **5. Satır**: Olayımızı ve içerdiklerini, yani eski değeri ve yeni değeri, bildiririz.

- **13. Satır**: `count` değişkenimizi artırdığımızda, olayı yayarız.

Şimdi sözleşmeyi dağıtır ve `increment` işlevini çağırırsak, `logs` adlı dizinin içindeki yeni işleme tıkladığınızda Remix'in bunu otomatik olarak görüntülediğini göreceğiz.

![Remix ekran görüntüsü](./remix-screenshot.png)

Kayıtlar, akıllı sözleşmelerinizdeki hataları ayıklamak için çok kullanışlıdır. Ayrıca, farklı kişilerin kullandığı uygulamalar geliştiriyorsanız da önemlidirler; akıllı sözleşmenizin nasıl kullanıldığını izlemek ve anlamak üzere analizler yapmayı kolaylaştırırlar. İşlemler tarafından oluşturulan kayıtlar popüler blok arayıcılarında görüntülenir ve ayrıca bunları, örneğin belirli olayları dinlemek ve bu olaylar meydana geldiğinde eyleme geçmek için zincir dışı betikler oluşturmak amacıyla da kullanabilirsiniz.
