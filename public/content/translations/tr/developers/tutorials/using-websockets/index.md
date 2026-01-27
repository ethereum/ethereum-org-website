---
title: WebSocket'leri Kullanmak
description: "JSON-RPC istekleri yapmak ve etkinliklere abone olmak için WebSocket'ler ve Alchemy kullanma kılavuzu."
author: "Elan Halpern"
lang: tr
tags: [ "alchemy", "websocket'ler", "sorgulama", "javascript" ]
skill: beginner
source: Alchemy belgeleri
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Bu, Ethereum blok zincirine talepte bulunmak için WebSocket'leri ve Alchemy'yi kullanmak için giriş seviyesinde bir kılavuzdur.

## WebSockets ve HTTP Karşılaştırması {#websockets-vs-http}

HTTP'den farklı olarak WebSocket'ler ile belirli bilgiler istediğinizde sürekli olarak istekte bulunmanız gerekmez. WebSocket'ler (doğru yapılırsa), sizin için bir ağ bağlantısı sağlar ve değişiklikleri dinler.

Herhangi bir ağ bağlantısında olduğu gibi, bir WebSocket'in kesintisiz olarak sonsuza kadar açık kalacağını varsaymamalısınız, ancak kopan bağlantıların doğru bir şekilde düzeltilmesi ve elle yeniden bağlantının düzgün yapılması zor olabilir. WebSocket'lerin bir diğer dezavantajı, yanıtta HTTP durum kodlarını değil, yalnızca hata mesajını almanızdır.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview), herhangi bir yapılandırma gerektirmeden WebSocket arızaları ve yeniden denemeler için otomatik olarak işleme ekler.

## Deneyin {#try-it-out}

WebSockets'i test etmenin en kolay yolu, [wscat](https://github.com/websockets/wscat) gibi WebSocket istekleri yapmak için bir komut satırı aracı yüklemektir. Şunlar gibi istekleri wscat kullanarak gönderebilirsiniz:

_Not: Bir Alchemy hesabınız varsa `demo`'yu kendi API anahtarınızla değiştirebilirsiniz. [Buradan ücretsiz bir Alchemy hesabı için kaydolun!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## WebSockets nasıl kullanılır {#how-to-use-websockets}

Başlamak için uygulamanızın WebSocket URL'sini kullanarak bir WebSocket açın. Uygulamanızın WebSocket URL'sini [gösterge panelinizde](https://dashboard.alchemy.com/) uygulamanın sayfasını açıp "Anahtarı Görüntüle"ye tıklayarak bulabilirsiniz. Uygulamanızın WebSocket URL'sinin, HTTP istekleri URL'sinden farklı olduğunu, ancak her ikisinin de "View Key"e tıklanarak bulunabileceğini unutmayın.

![Alchemy gösterge panelinizde WebSocket URL'nizi nerede bulabilirsiniz](./use-websockets.gif)

[Alchemy API Referansı'nda](https://www.alchemy.com/docs/reference/api-overview) listelenen API'lerden herhangi biri WebSocket aracılığıyla kullanılabilir. Bunu yapmak için, HTTP POST isteğinin gövdesi olarak gönderilecek yükün aynısını kullanın, bunun yerine bu yükü WebSocket aracılığıyla gönderin.

## Web3 ile {#with-web3}

Web3 gibi bir istemci kütüphanesi kullanırken WebSocket'lere geçiş yapmak basittir. Web3 istemcinizi başlatırken HTTP URL'si yerine WebSocket URL'sini iletin. Örneğin:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## Abonelik API'si {#subscription-api}

Bir WebSocket aracılığıyla bağlandığınızda, iki ek yöntem kullanabilirsiniz: `eth_subscribe` ve `eth_unsubscribe`. Bu yöntemler, belirli olayları dinlemenizi ve anında haberdar olmanızı sağlar.

### `eth_subscribe` {#eth-subscribe}

Belirtilen olaylar için yeni bir abonelik oluşturur. [`eth_subscribe` hakkında daha fazla bilgi edinin](https://docs.alchemy.com/reference/eth-subscribe).

#### Parametreler {#parameters}

1. Abonelik türleri
2. Opsiyonel parametreler

İlk argüman, dinlenecek olayın türünü belirtir. İkinci argüman, ilk argümana bağlı olan ek seçenekleri içerir. Farklı açıklama türleri, seçenekleri ve olay yükleri aşağıda açıklanmıştır.

#### Geri Dönüşler {#returns}

Abonelik ID'si: Bu ID, alınan tüm olaylara eklenecektir ve `eth_unsubscribe` kullanılarak aboneliği iptal etmek için de kullanılabilir.

#### Abonelik olayları {#subscription-events}

Abonelik aktifken, aşağıdaki alanlara sahip nesneler olan olayları alacaksınız:

- `jsonrpc`: Her zaman "2.0"
- `method`: Her zaman "eth_subscription"
- `params`: Şu alanları içeren bir nesne:
  - `subscription`: Bu aboneliği oluşturan `eth_subscribe` çağrısı tarafından döndürülen abonelik ID'si.
  - `result`: İçeriği abonelik türüne göre değişen bir nesne.

#### Abonelik türleri {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Bekleme durumuna eklenen tüm işlemler için işlem bilgilerini döndürür. Bu abonelik türü, standart Web3 çağrısı `web3.eth.subscribe("pendingTransactions")` ile benzer şekilde bekleyen işlemlere abone olur, ancak yalnızca işlem karmalarını değil, _tam işlem bilgilerini_ yayması bakımından farklılık gösterir.

Örnek:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Zincirin yeniden düzenlenmesi de dahil olmak üzere, zincire her yeni başlık eklendiğinde bir olay yayar.

Zincirin yeniden düzenlenmesi gerçekleştiğinde, bu abonelik yeni zincir için tüm yeni başlıkları içeren bir olay yayacaktır. Bu, özellikle aynı yükseklikte birden fazla başlık görebileceğiniz anlamına gelir ve bu olduğunda sonraki başlık, yeniden düzenlemeden sonra doğru olan olarak alınmalıdır.

Örnek:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Belirtilen filtre kriterleriyle eşleşen yeni eklenen blokların parçası olan kayıtları yayar.

Bir zincir yeniden düzenlemesi gerçekleştiğinde, eski zincirdeki blokların parçası olan günlükler, `removed` özelliği `true` olarak ayarlanmış bir şekilde yeniden yayınlanır. Ayrıca, yeni zincirdeki blokların parçası olan kayıtlar yayınlanır, yani yeniden düzenleme durumunda aynı işlem için kayıtları birden çok kez görmek mümkündür.

Parametreler

1. Aşağıdaki alanlara sahip bir nesne:
   - `address` (isteğe bağlı): bir adresi temsil eden bir dize veya bu tür dizelerin bir dizisi.
     - Yalnızca bu adreslerden birinden oluşturulan kayıtlar yayınlanacaktır.
   - `topics`: konu belirteçlerinden oluşan bir dizi.
     - Her konu belirteci `null`, bir konuyu temsil eden bir dize veya dizelerden oluşan bir dizi olabilir.
     - Dizide `null` olmayan her konum, yayılan günlükleri yalnızca o konumda verilen konulardan birine sahip olanlarla sınırlar.

Konu belirteçlerine ilişkin bazı örnekler:

- `[]`: Herhangi bir konuya izin verilir.
- `[A]`: İlk konumda A (ve sonrasında herhangi bir şey).
- `[null, B]`: İlk konumda herhangi bir şey ve ikinci konumda B (ve sonrasında herhangi bir şey).
- `[A, B]`: İlk konumda A ve ikinci konumda B (ve sonrasında herhangi bir şey).
- `[[A, B], [A, B]]`: İlk konumda (A veya B) ve ikinci konumda (A veya B) (ve sonrasında herhangi bir şey).

Örnek:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Başka bir olayın gönderilmemesi için mevcut bir aboneliği iptal eder.

Parametreler

1. Daha önce bir `eth_subscribe` çağrısından döndürülmüş olan Abonelik ID'si.

Dönüşler

Bir abonelik başarıyla iptal edildiyse `true`, verilen ID'ye sahip bir abonelik yoksa `false`.

Örnek:

**İstek**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Sonuç**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

Ücretsiz olarak [Alchemy'ye kaydolun](https://auth.alchemy.com), [dokümantasyonumuza](https://www.alchemy.com/docs/) göz atın ve en son haberler için bizi [Twitter'dan](https://x.com/AlchemyPlatform) takip edin.
