---
title: Olaylar ile akıllı sözleşmelerden verileri günlüğe kaydetme
description: Akıllı sözleşme olaylarına ve bunları verileri günlüğe kaydetmek için nasıl kullanabileceğinize dair bir giriş
author: "jdourlens"
tags: ["akıllı sözleşmeler", "remix", "solidity", "olaylar"]
skill: intermediate
breadcrumb: Olay günlüğü oluşturma
lang: tr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidity'de, [olaylar](/developers/docs/smart-contracts/anatomy/#events-and-logs) akıllı sözleşmelerin tetikleyebileceği gönderilen sinyallerdir. Merkeziyetsiz uygulamalar (dapp'ler) veya Ethereum JSON-RPC API'sine bağlı herhangi bir şey bu olayları dinleyebilir ve buna göre hareket edebilir. Bir olay, olay geçmişinin daha sonra aranabilmesi için dizine de eklenebilir.

## Olaylar {#events}

Bu makalenin yazıldığı sırada Ethereum blokzincirindeki en yaygın olay, birisi token transfer ettiğinde ERC-20 token'ları tarafından yayımlanan Transfer olayıdır.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Olay imzası, sözleşme kodunun içinde bildirilir ve emit anahtar kelimesi ile yayımlanabilir. Örneğin, transfer olayı transferi kimin gönderdiğini (_from_), kime gönderildiğini (_to_) ve ne kadar token transfer edildiğini (_value_) günlüğe kaydeder.

Counter akıllı sözleşmemize geri dönersek ve değer her değiştiğinde günlüğe kaydetmeye karar verirsek. Bu sözleşme dağıtılmak üzere değil, genişletilerek başka bir sözleşme oluşturmak için bir temel olarak hizmet etmek üzere tasarlandığından: buna soyut sözleşme denir. Sayaç örneğimizde bu şu şekilde görünür:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Sayım adedini tutmak için unsigned int türünde özel değişken
    uint256 private count = 0;

    // Sayacımızı artıran fonksiyon
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Sayım değerini almak için getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Şunlara dikkat edin:

- **Satır 5**: Olayımızı ve neleri içerdiğini, eski değeri ve yeni değeri bildiriyoruz.

- **Satır 13**: count değişkenimizi artırdığımızda olayı yayımlıyoruz.

Şimdi sözleşmeyi dağıtır ve increment işlevini çağırırsak, logs (günlükler) adlı bir dizi içindeki yeni işleme tıkladığınızda Remix'in bunu otomatik olarak görüntülediğini göreceğiz.

![Remix screenshot](./remix-screenshot.png)

Günlükler, akıllı sözleşmelerinizde hata ayıklamak için gerçekten yararlıdır, ancak farklı kişiler tarafından kullanılan uygulamalar oluşturuyorsanız da önemlidir ve akıllı sözleşmenizin nasıl kullanıldığını izlemek ve anlamak için analiz yapmayı kolaylaştırır. İşlemler tarafından oluşturulan günlükler popüler blok gezginlerinde görüntülenir ve örneğin bunları belirli olayları dinlemek ve meydana geldiklerinde harekete geçmek üzere zincir dışı betikler oluşturmak için de kullanabilirsiniz.