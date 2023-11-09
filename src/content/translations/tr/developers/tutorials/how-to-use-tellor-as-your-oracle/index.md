---
title: Tellor Kâhininiz olarak nasıl kurulur
description: Tellor kâhinini protokolünüze entegre etmeye başlamak için bir rehber
author: "Tellor"
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "kâhinler"
skill: beginner
published: 2021-06-29
source: Tellor Belgeleri
sourceUrl: https://docs.tellor.io/tellor/
---

Hızlı Soru: Protokolünüz tamamlanmak üzere ancak zincir dışı verilere erişmek için bir kâhine ihtiyacı var... Ne yaparsınız?

## (Hafif) Ön Koşullar {#soft-prerequisites}

Bu gönderi, bir kâhin akışına erişmeyi mümkün olduğunca basit ve anlaşılır hâle getirmeyi amaçlamaktadır. Bununla birlikte, kâhin yönüne odaklanmak için kodlama beceri seviyeniz hakkında aşağıdakileri varsayıyoruz.

Varsayımlar:

- bir terminalde gezinebildiğiniz,
- npm'yi kurduğunuz
- bağımlılıkları yönetmek için npm'yi nasıl kullanacağınızı bildiğiniz

Tellor, uygulamaya hazır yayınlanmış ve açık kaynaklı bir kâhindir. Bu başlangıç rehberi, projenize tamamen merkeziyetsiz ve sansüre dayanıklı bir kâhin sağlayarak Tellor ile çalışmaya başlamanın kolaylığını gösterme amacı taşır.

## Genel Bakış {#overview}

Tellor, tarafların zincir dışı bir veri noktasının (örneğin BTC/USD) değerini talep edebildiği ve raporlayıcıların bu değeri tüm Ethereum akıllı sözleşmeleri tarafından erişilebilen zincir üstü bir veri bankasına eklemek için rekabet ettiği bir kâhin sistemidir. Bu veri bankasına yapılan girdiler, stake edilmiş muhabirlerden oluşan bir ağ tarafından güvence altına alınmıştır. Tellor, raporlayıcılar tarafından sağlanan dürüst veri kayıtlarını ödüllendiren, Tributes (TRB) Tellor jetonunun piyasaya sürülmesi ve uyuşmazlık mekanizması aracılığıyla kötü niyetli davrananları cezalandıran kripto ekonomik teşvik mekanizmalarını kullanır.

Bu öğreticide şunların üzerinden geçeceğiz:

- Kurup çalıştırmanız gereken başlangıç araç setinin kurulumu.
- Basit bir örneğe genel bakış.
- Şu anda Tellor'ı test edebileceğiniz ağların test ağlarının adreslerini listelemek.

## UsingTellor {#usingtellor}

Yapmak isteyeceğiniz ilk şey, Tellor'ı kâhininiz olarak kullanmak için gerekli olan temel araçları kurmaktır. Tellor Kullanıcı Sözleşmelerini yüklemek için [bu paketi](https://github.com/tellor-io/usingtellor) kullanın:

`npm install usingtellor`

Kurulduktan sonra bu, sözleşmelerinizin "UsingTellor" sözleşmesinden fonksiyonları devralmasına olanak tanır.

Harika! Artık araçları hazırladığınıza göre, bitcoin fiyatını alacağımız basit bir alıştırmadan geçelim:

### BTC/USD Örneği {#btcusd-example}

UsingTellor sözleşmesini kalıtım yoluya alarak Tellor adresini bir yapıcı argüman olarak geçirmek:

İşte bir örnek:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

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

Kullanım kolaylığı sağlamak adına, UsingTellor deposu kolay entegrasyon için [Tellor Playground](https://github.com/tellor-io/TellorPlayground) sözleşmesiyle birlikte sunulur. Yardımcı işlevlerin bir listesini görmek için [buraya](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) bakın.

Tellor kâhininin daha sağlam bir uygulaması için mevcut fonksiyonların tam listesine [buradan](https://github.com/tellor-io/usingtellor/blob/master/README.md) göz atın.
