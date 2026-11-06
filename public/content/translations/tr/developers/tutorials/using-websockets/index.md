---
title: WebSocket'leri Kullanmak
description: "Herhangi bir Ethereum düğüm sağlayıcısıyla JSON-RPC istekleri yapmak ve olaylara abone olmak için WebSocket'leri kullanma rehberi."
author: "Elan Halpern"
lang: tr
tags: ["Alchemy", "websocket'ler", "sorgulama", "JavaScript"]
skill: beginner
breadcrumb: WebSocket'ler
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Bu, Ethereum blokzincirine istek yapmak için WebSocket'leri kullanmaya yönelik giriş seviyesinde bir rehberdir. Örnekler standart JSON-RPC yöntemlerini kullanır, bu nedenle Alchemy dahil olmak üzere bir WebSocket uç noktası sunan herhangi bir düğüm veya düğüm sağlayıcısıyla çalışırlar.

## WebSocket'ler ve HTTP {#websockets-vs-http}

HTTP'nin aksine, WebSocket'lerde belirli bir bilgi istediğinizde sürekli olarak istek yapmanıza gerek yoktur. WebSocket'ler sizin için bir ağ bağlantısını sürdürür (doğru yapılırsa) ve değişiklikleri dinler.

Herhangi bir ağ bağlantısında olduğu gibi, bir WebSocket'in kesintisiz olarak sonsuza kadar açık kalacağını varsaymamalısınız, ancak kopan bağlantıları ve yeniden bağlanmayı manuel olarak doğru bir şekilde yönetmek zor olabilir. WebSocket'lerin bir diğer dezavantajı, yanıtta HTTP durum kodlarını değil, yalnızca hata mesajını almanızdır.

İstemci kütüphaneleri bunu sizin için halledebilir. Örneğin, [Viem'in WebSocket aktarımı](https://viem.sh/docs/clients/transports/websocket) soket hatasında yeniden bağlanır ve varsayılan olarak bağlantıyı canlı tutma (keep-alive) ping'leri gönderir.

## Deneyin {#try-it-out}

Bir Ethereum düğümü için bir WebSocket URL'sine ihtiyacınız vardır. Düğüm sağlayıcıları, bir uygulama programlama arayüzü (API) anahtarı oluşturduğunuzda size genellikle `wss://<provider-host>/<your-api-key>` biçiminde bir tane verir. Örneğin, bir Alchemy Ethereum Ana Ağı URL'si `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` şeklindedir ([ücretsiz bir Alchemy hesabı için kaydolun](https://auth.alchemy.com/signup)). Diğer sağlayıcılar için [hizmet olarak düğümlere](/developers/docs/nodes-and-clients/nodes-as-a-service/) bakın veya [kendi düğümünüzün](/developers/docs/nodes-and-clients/run-a-node/) WebSocket uç noktasını kullanın. `wss://ethereum-rpc.publicnode.com` gibi genel uç noktalar da hızlı denemeler için işe yarar, ancak bunlar hız sınırlamalıdır ve her abonelik türünü desteklemeyebilir.

WebSocket'leri test etmenin en kolay yolu, [wscat](https://github.com/websockets/wscat) gibi WebSocket istekleri yapmak için bir komut satırı aracı yüklemektir. wscat kullanarak aşağıdaki gibi istekler gönderebilirsiniz:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>` ile başlayan satırlar sizin yazdıklarınızdır ve `<` ile başlayan satırlar düğümün geri gönderdikleridir.

## WebSocket'ler nasıl kullanılır {#how-to-use-websockets}

Başlamak için, sağlayıcınızın WebSocket URL'sini kullanarak bir WebSocket açın. Alchemy ile, uygulamanızı [kontrol panelinde](https://dashboard.alchemy.com/) açıp uygulama programlama arayüzü (API) anahtarını görüntüleyerek bulabilirsiniz. Çoğu sağlayıcı her ikisi için de aynı API anahtarını kullansa da, WebSocket'ler için URL'nin (`wss://`) HTTP istekleri için URL'den (`https://`) farklı olduğunu unutmayın.

![Alchemy kontrol panelinizde WebSocket URL'nizi nerede bulabilirsiniz](./use-websockets.mp4#602x280)

Sağlayıcınızın desteklediği [JSON-RPC yöntemlerinden](/developers/docs/apis/json-rpc/) herhangi biri WebSocket üzerinden kullanılabilir. Bunu yapmak için, bir HTTP POST isteğinin gövdesi olarak gönderilecek olan aynı yükü kullanın, ancak bunun yerine bu yükü WebSocket üzerinden gönderin.

## Web3 ile {#with-web3}

[Viem](https://viem.sh/) gibi bir istemci kütüphanesi kullanırken WebSocket'lere geçiş yapmak basittir. `http` aktarımı yerine WebSocket URL'nizle `webSocket` aktarımını kullanın. Örneğin, `npm install viem` komutundan sonra bunu `index.mjs` olarak kaydedin ve `node index.mjs` komutunu çalıştırın:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Aynı WebSocket üzerinden yeni bloklara abone ol
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## Abonelik API'si {#subscription-api}

Bir WebSocket üzerinden bağlandığınızda, iki ek yöntem kullanabilirsiniz: `eth_subscribe` ve `eth_unsubscribe`. Bu yöntemler, belirli olayları dinlemenize ve anında bildirim almanıza olanak tanır.

### `eth_subscribe` {#eth-subscribe}

Belirtilen olaylar için yeni bir abonelik oluşturur. [`eth_subscribe` hakkında daha fazla bilgi edinin](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

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

1. `newHeads`

Zincire yeni bir başlık eklendiğinde, bir zincir yeniden düzenlemesi (reorg) sırasında da dahil olmak üzere bir olay yayınlar.

Bir zincir yeniden düzenlemesi meydana geldiğinde, bu abonelik yeni zincir için tüm yeni başlıkları içeren bir olay yayınlayacaktır. Özellikle bu, aynı yüksekliğe sahip birden fazla başlığın yayınlandığını görebileceğiniz anlamına gelir ve bu gerçekleştiğinde, yeniden düzenlemeden sonraki başlık doğru olan olarak kabul edilmelidir.

Örnek:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Belirtilen filtre kriterleriyle eşleşen, yeni eklenen blokların parçası olan günlükleri (log) yayınlar.

Bir zincir yeniden düzenlemesi meydana geldiğinde, eski zincirdeki blokların parçası olan günlükler, `removed` özelliği `true` olarak ayarlanarak tekrar yayınlanacaktır. Ayrıca, yeni zincirdeki blokların parçası olan günlükler yayınlanır, bu da bir yeniden düzenleme durumunda aynı işlem için günlükleri birden çok kez görmenin mümkün olduğu anlamına gelir.

Parametreler

1. Aşağıdaki alanlara sahip bir nesne:
   - `address` (isteğe bağlı): bir adresi temsil eden bir dize veya bu tür dizelerden oluşan bir dizi.
     - Yalnızca bu adreslerden birinden oluşturulan günlükler yayınlanacaktır.
   - `topics`: konu belirleyicilerinden oluşan bir dizi.
     - Her konu belirleyici ya `null`, bir konuyu temsil eden bir dize ya da dizelerden oluşan bir dizidir.
     - Dizide `null` olmayan her konum, yayınlanan günlükleri yalnızca o konumda verilen konulardan birine sahip olanlarla sınırlar.

Konu belirlemelerine bazı örnekler:

- `[]`: Herhangi bir konuya izin verilir.
- `[A]`: İlk konumda A (ve sonrasında herhangi bir şey).
- `[null, B]`: İlk konumda herhangi bir şey ve ikinci konumda B (ve sonrasında herhangi bir şey).
- `[A, B]`: İlk konumda A ve ikinci konumda B (ve sonrasında herhangi bir şey).
- `[[A, B], [A, B]]`: İlk konumda (A veya B) ve ikinci konumda (A veya B) (ve sonrasında herhangi bir şey).

Örnek:

Bu örnek, Ethereum Ana Ağı üzerindeki [WETH sözleşmesinden](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) gelen `Deposit` olaylarını dinler:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Düğümün beklemedeki durumuna (bellek havuzuna) eklenen her işlemin hash'ini yayınlar.

Örnek:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Bazı sağlayıcılar kendi abonelik türlerini de sunar. Örneğin, Alchemy'nin [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) aboneliği yalnızca hash'ler yerine _tam işlem nesneleri_ yayınlar ve isteğe bağlı `fromAddress`, `toAddress` ve `hashesOnly` filtrelerini kabul eder. Bunlar standart JSON-RPC uygulama programlama arayüzünün (API) bir parçası değildir, bu nedenle yalnızca o sağlayıcıyla çalışırlar.

### `eth_unsubscribe` {#eth-unsubscribe}

Daha fazla olay gönderilmemesi için mevcut bir aboneliği iptal eder.

Parametreler

1. Daha önce bir `eth_subscribe` çağrısından döndürülen Abonelik Kimliği (ID).

Döndürülenler

Bir abonelik başarıyla iptal edildiyse `true`, verilen kimliğe sahip bir abonelik yoksa `false`.

Bir abonelik yalnızca onu oluşturan WebSocket bağlantısında mevcuttur, bu nedenle `eth_unsubscribe` aynı bağlantı üzerinden gönderilmelidir. Ayrı bir HTTP isteği olarak gönderilemez. Bağlantının kapatılması, tüm aboneliklerini de iptal eder.

Örnek:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

Ücretsiz olarak [Alchemy'ye kaydolun](https://auth.alchemy.com), [Alchemy'nin belgelerine](https://www.alchemy.com/docs/) göz atın ve en son haberler için Alchemy'yi [Twitter'da](https://x.com/Alchemy) takip edin.
