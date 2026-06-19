---
title: WebSocket'leri Kullanmak
description: JSON-RPC istekleri yapmak ve olaylara abone olmak için WebSocket'leri ve Alchemy'yi kullanma rehberi.
author: "Elan Halpern"
lang: tr
tags: ["alchemy", "websocket'ler", "sorgulama", "javascript"]
skill: beginner
breadcrumb: WebSocket'ler
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Bu, Ethereum Blokzincirine istekler yapmak için WebSocket'leri ve Alchemy'yi kullanmaya yönelik giriş seviyesinde bir rehberdir.

## WebSocket'ler ve HTTP {#websockets-vs-http}

HTTP'nin aksine, WebSocket'ler ile belirli bir bilgi istediğinizde sürekli olarak istek yapmanıza gerek yoktur. WebSocket'ler sizin için bir ağ bağlantısını sürdürür (doğru yapılırsa) ve değişiklikleri dinler.

Herhangi bir ağ bağlantısında olduğu gibi, bir WebSocket'in kesintisiz olarak sonsuza kadar açık kalacağını varsaymamalısınız, ancak kopan bağlantıları ve yeniden bağlanmayı manuel olarak doğru bir şekilde ele almak zor olabilir. WebSocket'lerin bir diğer dezavantajı, yanıtta HTTP durum kodlarını değil, yalnızca hata mesajını almanızdır.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview), hiçbir yapılandırma gerektirmeden WebSocket hataları ve yeniden denemeler için otomatik olarak işleme ekler.

## Deneyin {#try-it-out}

WebSocket'leri test etmenin en kolay yolu, [wscat](https://github.com/websockets/wscat) gibi WebSocket istekleri yapmak için bir komut satırı aracı yüklemektir. wscat kullanarak istekleri aşağıdaki gibi gönderebilirsiniz:

_Not: Bir Alchemy hesabınız varsa `demo` kısmını kendi API anahtarınızla değiştirebilirsiniz. [Buradan ücretsiz bir Alchemy hesabına kaydolun!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## WebSocket'ler nasıl kullanılır {#how-to-use-websockets}

Başlamak için, uygulamanızın WebSocket URL'sini kullanarak bir WebSocket açın. Uygulamanızın WebSocket URL'sini, [kontrol panelinizde](https://dashboard.alchemy.com/) uygulamanın sayfasını açıp "View Key" (Anahtarı Görüntüle) seçeneğine tıklayarak bulabilirsiniz. Uygulamanızın WebSocket'ler için olan URL'sinin HTTP istekleri için olan URL'sinden farklı olduğunu, ancak her ikisinin de "View Key" seçeneğine tıklanarak bulunabileceğini unutmayın.

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

[Alchemy API Referansı](https://www.alchemy.com/docs/reference/api-overview) içinde listelenen API'lerin herhangi biri WebSocket aracılığıyla kullanılabilir. Bunu yapmak için, bir HTTP POST isteğinin gövdesi olarak gönderilecek olan aynı yükü kullanın, ancak bu yükü bunun yerine WebSocket üzerinden gönderin.

## Web3 ile {#with-web3}

Web3 gibi bir istemci Kütüphanesi kullanırken WebSocket'lere geçiş yapmak basittir. Web3 istemcinizi başlatırken HTTP URL'si yerine WebSocket URL'sini iletmeniz yeterlidir. Örneğin:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## Abonelik API'si {#subscription-api}

Bir WebSocket üzerinden bağlandığınızda, iki ek yöntem kullanabilirsiniz: `eth_subscribe` ve `eth_unsubscribe`. Bu yöntemler, belirli olayları dinlemenize ve anında bildirim almanıza olanak tanır.

### `eth_subscribe` {#eth-subscribe}

Belirtilen olaylar için yeni bir abonelik oluşturur. [`eth_subscribe` hakkında daha fazla bilgi edinin](https://docs.alchemy.com/reference/eth-subscribe).

#### Parametreler {#parameters}

1. Abonelik türleri
2. İsteğe bağlı parametreler

İlk argüman, dinlenecek olayın türünü belirtir. İkinci argüman, ilk argümana bağlı olan ek seçenekler içerir. Farklı açıklama türleri, seçenekleri ve olay yükleri aşağıda açıklanmıştır.

#### Döndürülenler {#returns}

Abonelik kimliği (ID): Bu kimlik, alınan tüm olaylara eklenecektir ve ayrıca `eth_unsubscribe` kullanılarak aboneliği iptal etmek için de kullanılabilir.

#### Abonelik olayları {#subscription-events}

Abonelik aktifken, aşağıdaki alanlara sahip nesneler olan olaylar alacaksınız:

- `jsonrpc`: Her zaman "2.0"
- `method`: Her zaman "eth_subscription"
- `params`: Aşağıdaki alanlara sahip bir nesne:
  - `subscription`: Bu aboneliği oluşturan `eth_subscribe` çağrısı tarafından döndürülen abonelik kimliği.
  - `result`: İçeriği abonelik türüne bağlı olarak değişen bir nesne.

#### Abonelik türleri {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Bekleyen duruma eklenen tüm işlemler için işlem bilgilerini döndürür. Bu abonelik türü, standart Web3 çağrısı `web3.eth.subscribe("pendingTransactions")`'a benzer şekilde bekleyen işlemlere abone olur, ancak yalnızca işlem karmaları (hash) yerine _tam işlem bilgilerini_ yayması bakımından farklılık gösterir.

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

Bir Zincir yeniden düzenleme süreci de dahil olmak üzere, Zincire yeni bir başlık eklendiğinde her zaman bir olay yayar.

Bir Zincir yeniden düzenleme gerçekleştiğinde, bu abonelik yeni Zincir için tüm yeni başlıkları içeren bir olay yayacaktır. Özellikle bu, aynı yükseklikte yayılan birden fazla başlık görebileceğiniz anlamına gelir ve bu gerçekleştiğinde, yeniden düzenleme sonrasında daha sonraki başlık doğru olan olarak kabul edilmelidir.

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

Belirtilen filtre kriterleriyle eşleşen yeni eklenen blokların parçası olan günlükleri (log) yayar.

Bir Zincir yeniden düzenleme gerçekleştiğinde, eski Zincirdeki blokların parçası olan günlükler, `removed` özelliği `true` olarak ayarlanmış şekilde tekrar yayılacaktır. Ayrıca, yeni Zincirdeki blokların parçası olan günlükler yayılır, bu da bir yeniden düzenleme durumunda aynı işlem için günlükleri birden çok kez görmenin mümkün olduğu anlamına gelir.

Parametreler

1. Aşağıdaki alanlara sahip bir nesne:
   - `address` (isteğe bağlı): bir Adresi temsil eden bir dize veya bu tür dizelerden oluşan bir dizi.
     - Yalnızca bu Adreslerden birinden oluşturulan günlükler yayılacaktır.
   - `topics`: konu belirleyicilerinden oluşan bir dizi.
     - Her konu belirleyicisi ya `null`, bir konuyu temsil eden bir dize ya da dizelerden oluşan bir dizidir.
     - Dizide `null` olmayan her konum, yayılan günlükleri yalnızca o konumda verilen konulardan birine sahip olanlarla sınırlar.

Konu belirlemelerine bazı örnekler:

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

Daha fazla olay gönderilmemesi için mevcut bir aboneliği iptal eder.

Parametreler

1. Daha önce bir `eth_subscribe` çağrısından döndürülen Abonelik kimliği.

Döndürülenler

Bir abonelik başarıyla iptal edildiyse `true`, veya verilen kimliğe sahip bir abonelik yoksa `false`.

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

Ücretsiz olarak [Alchemy'ye kaydolun](https://auth.alchemy.com), [belgelerimize](https://www.alchemy.com/docs/) göz atın ve en son haberler için bizi [Twitter](https://x.com/AlchemyPlatform) üzerinden takip edin.