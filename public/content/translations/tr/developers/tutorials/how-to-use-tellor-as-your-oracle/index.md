---
title: "Tellor'u Kâhininiz Olarak Nasıl Kurarsınız?"
description: "Tellor kâhinini protokolünüze entegre etmeye başlamak için bir rehber"
author: "Tellor"
lang: tr
tags: [ "katılık", "akıllı kontratlar", "kâhinler" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Hızlı Soru: Protokolünüz tamamlanmak üzere, ancak zincir dışı verilere erişmek için bir kâhine ihtiyacı var... Ne yaparsınız?

## (Yumuşak) Ön Koşullar {#soft-prerequisites}

Bu gönderi, bir kâhin akışına erişmeyi mümkün olduğunca basit ve anlaşılır hâle getirmeyi amaçlamaktadır. Bununla birlikte, kâhin yönüne odaklanmak için kodlama beceri seviyeniz hakkında aşağıdakileri varsayıyoruz.

Varsayımlar:

- bir terminalde gezinebilmeniz
- npm'nin kurulu olması
- bağımlılıkları yönetmek için npm'yi nasıl kullanacağınızı bilmeniz

Tellor, uygulamaya hazır, canlı ve açık kaynaklı bir kâhindir. Bu başlangıç kılavuzu, projenize tamamen merkeziyetsiz ve sansüre dayanıklı bir kâhin sağlayarak Tellor'u kullanmaya başlamanın ne kadar kolay olduğunu göstermek için hazırlanmıştır.

## Genel Bakış {#overview}

Tellor, tarafların zincir dışı bir veri noktasının (ör. BTC/USD) değerini talep edebildiği ve raporlayıcıların bu değeri tüm Ethereum akıllı sözleşmeleri tarafından erişilebilen, zincir üstü bir veri bankasına eklemek için rekabet ettiği bir kâhin sistemidir. Bu veri bankasına yapılan girdiler, stake edilmiş raporlayıcılardan oluşan bir ağ tarafından güvence altına alınır. Tellor; raporlayıcılar tarafından dürüst veri gönderimlerini ödüllendiren ve Tellor'un jetonu olan Tributes (TRB) ihracı ve bir uyuşmazlık mekanizması aracılığıyla kötü niyetli aktörleri cezalandıran, kripto-ekonomik teşvik mekanizmalarından yararlanır.

Bu öğreticide şunları ele alacağız:

- Çalışmaya başlamak için ihtiyacınız olacak ilk araç setinin kurulumu.
- Basit bir örnek üzerinden ilerleme.
- Tellor'ı şu anda test edebileceğiniz ağların test ağı adreslerini listeleme.

## UsingTellor Kullanımı {#usingtellor}

Yapmak isteyeceğiniz ilk şey, Tellor'u kâhininiz olarak kullanmak için gerekli temel araçları kurmaktır. Tellor Kullanıcı Sözleşmelerini kurmak için [bu paketi](https://github.com/tellor-io/usingtellor) kullanın:

`npm install usingtellor`

Kurulduktan sonra bu, sözleşmelerinizin 'UsingTellor' sözleşmesinden fonksiyonları devralmasına olanak tanır.

Harika! Artık araçlar hazır olduğuna göre, bitcoin fiyatını aldığımız basit bir alıştırma yapalım:

### BTC/USD Örneği {#btcusd-example}

Tellor adresini bir yapıcı argümanı olarak geçirerek UsingTellor sözleşmesini kalıtın:

İşte bir örnek:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Bu Sözleşme artık UsingTellor'daki tüm fonksiyonlara erişebilir

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Sözleşme adreslerinin tam listesi için [buraya](https://docs.tellor.io/tellor/the-basics/contracts-reference) bakın.

Kullanım kolaylığı için UsingTellor deposu, daha kolay entegrasyon için [Tellor Playground](https://github.com/tellor-io/TellorPlayground) sözleşmesinin bir sürümünü içerir. Yardımcı fonksiyonların listesi için [buraya](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) bakın.

Tellor kâhininin daha sağlam bir uygulaması için mevcut fonksiyonların tam listesine [buradan](https://github.com/tellor-io/usingtellor/blob/master/README.md) göz atın.
