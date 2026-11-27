---
title: "Olaylar ile akıllı sözleşmelerden verileri günlüğe kaydetme"
description: "Akıllı sözleşme olaylarına ve bunları verileri günlüğe kaydetmek için nasıl kullanabileceğinize dair bir giriş"
author: "jdourlens"
tags: ["akıllı sözleşmeler", "Remix", "Solidity", "olaylar"]
skill: intermediate
breadcrumb: "Olay günlüğü oluşturma"
lang: tr
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidity'de, [olaylar](/developers/docs/smart-contracts/anatomy/#events-and-logs) akıllı sözleşmelerin tetikleyebileceği gönderilen sinyallerdir. Merkeziyetsiz uygulamalar (dapp'ler) veya Ethereum JSON-RPC API'sine bağlı herhangi bir şey bu olayları dinleyebilir ve buna göre hareket edebilir. Bir olay, olay geçmişinin daha sonra aranabilmesi için dizine de eklenebilir.

## Olaylar {#events}

Ethereum Blokzincirindeki en yaygın olaylardan biri, birisi token transfer ettiğinde ERC-20 token'ları tarafından yayınlanan `Transfer` olayıdır.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Olay imzası sözleşme kodunun içinde bildirilir ve emit anahtar kelimesi ile yayınlanabilir. Örneğin, transfer olayı transferi kimin gönderdiğini (_from_), kime gönderildiğini (_to_) ve ne kadar token transfer edildiğini (_value_) günlüğe kaydeder.

[İlk akıllı sözleşmenizi dağıtma](/developers/tutorials/deploying-your-first-smart-contract/) bölümündeki `Counter` akıllı sözleşmesine geri dönelim ve değer her değiştiğinde bunu günlüğe kaydedelim. Şöyle görünecektir:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Sayım miktarını tutmak için unsigned int türünde public değişken
    uint256 public count = 0;

    // Sayacımızı artıran fonksiyon
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Sayım değerini almak için gerekli olmayan getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Şunlara dikkat edin:

- **6. Satır**: olayımızı ve ne içerdiğini, eski değeri ve yeni değeri bildiriyoruz.

- **14. Satır**: count değişkenimizi artırdığımızda olayı yayınlıyoruz.

Şimdi sözleşmeyi dağıtır ve increment işlevini çağırırsak, logs adlı bir dizi içindeki yeni işleme tıkladığınızda Remix'in bunu otomatik olarak görüntülediğini göreceğiz.

![Remix ekran görüntüsü](./remix-screenshot.png)

Günlükler, akıllı sözleşmelerinizde hata ayıklamak için gerçekten yararlıdır ancak farklı kişiler tarafından kullanılan uygulamalar oluşturuyorsanız da önemlidir ve akıllı sözleşmenizin nasıl kullanıldığını izlemek ve anlamak için analiz yapmayı kolaylaştırır. İşlemler tarafından oluşturulan günlükler popüler blok gezginlerinde görüntülenir ve örneğin bunları belirli olayları dinlemek ve meydana geldiklerinde harekete geçmek için zincir dışı betikler oluşturmak amacıyla da kullanabilirsiniz.
