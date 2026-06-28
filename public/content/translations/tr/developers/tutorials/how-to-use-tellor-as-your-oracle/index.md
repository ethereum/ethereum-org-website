---
title: "Tellor'u Kâhin Olarak Nasıl Kurarsınız"
description: "Tellor kâhinini protokolünüze entegre etmeye başlamak için bir rehber"
author: "Tellor"
lang: tr
tags: ["Solidity", "akıllı sözleşmeler", "kâhinler"]
skill: beginner
breadcrumb: "Tellor kâhini"
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Kısa Sınav: Protokolünüz neredeyse bitti, ancak zincir dışı verilere erişmek için bir kâhine ihtiyacı var... Ne yaparsınız?

## (Esnek) Ön Koşullar {#soft-prerequisites}

Bu yazı, bir kâhin akışına erişimi olabildiğince basit ve anlaşılır hâle getirmeyi amaçlamaktadır. Bununla birlikte, kâhin yönüne odaklanabilmek için kodlama beceri seviyeniz hakkında aşağıdakileri varsayıyoruz.

Varsayımlar:

- bir terminalde gezinebilirsiniz
- npm yüklü
- bağımlılıkları yönetmek için npm'i nasıl kullanacağınızı biliyorsunuz

Tellor, uygulamaya hazır, canlı ve açık kaynaklı bir kâhindir. Bu başlangıç rehberi, projenize tamamen merkeziyetsiz ve sansüre dirençli bir kâhin sağlayarak Tellor ile çalışmaya başlamanın ne kadar kolay olduğunu göstermek için buradadır.

## Genel Bakış {#overview}

Tellor, tarafların zincir dışı bir veri noktasının (ör. BTC/USD) değerini talep edebildiği ve raporlayıcıların bu değeri tüm Ethereum akıllı sözleşmeleri tarafından erişilebilen zincir içi bir veri bankasına eklemek için rekabet ettiği bir kâhin sistemidir. Bu veri bankasına yapılan girdiler, stake etmiş raporlayıcılardan oluşan bir ağ tarafından güvence altına alınır. Tellor, raporlayıcıların dürüst veri gönderimlerini ödüllendiren ve kötü niyetli aktörleri Tellor'un token'ı olan Tributes (TRB) ihracı ve bir itiraz mekanizması aracılığıyla cezalandıran kripto-ekonomik teşvik mekanizmalarından yararlanır.

Bu eğitimde şunların üzerinden geçeceğiz:

- Çalışmaya başlamak için ihtiyaç duyacağınız başlangıç araç setini kurmak.
- Basit bir örneği adım adım incelemek.
- Şu anda Tellor'u test edebileceğiniz ağların test ağı adreslerini listelemek.

## UsingTellor {#usingtellor}

Yapmak isteyeceğiniz ilk şey, Tellor'u kâhin olarak kullanmak için gerekli temel araçları yüklemektir. Tellor Kullanıcı Sözleşmelerini yüklemek için [bu paketi](https://github.com/tellor-io/usingtellor) kullanın:

`npm install usingtellor`

Kurulduktan sonra bu, sözleşmelerinizin 'UsingTellor' sözleşmesinden işlevleri devralmasına olanak tanıyacaktır.

Harika! Artık araçları hazırladığınıza göre, Bitcoin fiyatını aldığımız basit bir alıştırma yapalım:

### BTC/USD Örneği {#btcusd-example}

Tellor adresini bir kurucu argümanı olarak geçirerek UsingTellor sözleşmesini devralın:

İşte bir örnek:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Bu Sözleşme artık UsingTellor'daki tüm fonksiyonlara erişime sahiptir.

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

Sözleşme adreslerinin tam listesi için [buraya](https://docs.tellor.io/tellor/the-basics/contracts-reference) başvurun.

Kullanım kolaylığı açısından, UsingTellor deposu daha kolay entegrasyon için [Tellor Playground](https://github.com/tellor-io/TellorPlayground) sözleşmesinin bir sürümüyle birlikte gelir. Yararlı işlevlerin bir listesi için [buraya](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) bakın.

Tellor kâhinini daha sağlam bir şekilde uygulamak için mevcut işlevlerin tam listesine [buradan](https://github.com/tellor-io/usingtellor/blob/master/README.md) göz atın.