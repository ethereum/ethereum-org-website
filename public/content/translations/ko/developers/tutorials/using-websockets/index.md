---
title: "웹소켓 사용하기"
description: "웹소켓과 Alchemy를 사용하여 JSON-RPC 요청을 보내고 이벤트에 구독하는 방법에 대한 가이드입니다."
author: "엘란 할펀"
lang: ko
tags: ["Alchemy", "웹소켓", "쿼리", "JavaScript"]
skill: beginner
breadcrumb: "웹소켓"
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

이 문서는 웹소켓과 Alchemy를 사용하여 이더리움 블록체인에 요청을 보내는 방법을 다루는 초급 가이드입니다.

## 웹소켓과 HTTP 비교 {#websockets-vs-http}

HTTP와 달리 웹소켓을 사용하면 특정 정보를 원할 때 지속적으로 요청을 보낼 필요가 없습니다. 웹소켓은 (올바르게 구현된 경우) 네트워크 연결을 유지하며 변경 사항을 수신합니다.

다른 네트워크 연결과 마찬가지로 웹소켓이 중단 없이 영원히 열려 있을 것이라고 가정해서는 안 되지만, 끊어진 연결과 재연결을 수동으로 올바르게 처리하는 것은 까다로울 수 있습니다. 웹소켓의 또 다른 단점은 응답에서 HTTP 상태 코드를 받지 못하고 오류 메시지만 받는다는 것입니다.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)는 별도의 구성 없이도 웹소켓 실패 및 재시도 처리를 자동으로 추가합니다.

## 직접 해보기 {#try-it-out}

웹소켓을 테스트하는 가장 쉬운 방법은 [wscat](https://github.com/websockets/wscat)과 같은 웹소켓 요청용 명령줄 도구를 설치하는 것입니다. wscat을 사용하면 다음과 같이 요청을 보낼 수 있습니다.

_참고: Alchemy 계정이 있는 경우 `demo`를 자신의 API 키로 바꿀 수 있습니다. [여기에서 무료 Alchemy 계정에 가입하세요!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## 웹소켓 사용 방법 {#how-to-use-websockets}

시작하려면 앱의 웹소켓 URL을 사용하여 웹소켓을 엽니다. [대시보드](https://dashboard.alchemy.com/)에서 앱 페이지를 열고 "View Key"를 클릭하여 앱의 웹소켓 URL을 찾을 수 있습니다. 앱의 웹소켓 URL은 HTTP 요청용 URL과 다르지만, 두 URL 모두 "View Key"를 클릭하여 찾을 수 있습니다.

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

[Alchemy API 참조](https://www.alchemy.com/docs/reference/api-overview)에 나열된 모든 API는 웹소켓을 통해 사용할 수 있습니다. 이렇게 하려면 HTTP POST 요청의 본문으로 보낼 페이로드와 동일한 페이로드를 사용하되, 해당 페이로드를 웹소켓을 통해 보내면 됩니다.

## Web3와 함께 사용하기 {#with-web3}

Web3와 같은 클라이언트 라이브러리를 사용하면서 웹소켓으로 전환하는 것은 간단합니다. Web3 클라이언트를 인스턴스화할 때 HTTP URL 대신 웹소켓 URL을 전달하기만 하면 됩니다. 예:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## 구독 API {#subscription-api}

웹소켓을 통해 연결된 경우 `eth_subscribe` 및 `eth_unsubscribe`라는 두 가지 추가 메서드를 사용할 수 있습니다. 이 메서드들을 사용하면 특정 이벤트를 수신하고 즉시 알림을 받을 수 있습니다.

### `eth_subscribe` {#eth-subscribe}

지정된 이벤트에 대한 새 구독을 생성합니다. [`eth_subscribe`에 대해 자세히 알아보기](https://docs.alchemy.com/reference/eth-subscribe).

#### 매개변수 {#parameters}

1. 구독 유형
2. 선택적 매개변수

첫 번째 인수는 수신할 이벤트의 유형을 지정합니다. 두 번째 인수는 첫 번째 인수에 따라 달라지는 추가 옵션을 포함합니다. 다양한 구독 유형, 해당 옵션 및 이벤트 페이로드는 아래에 설명되어 있습니다.

#### 반환값 {#returns}

구독 ID: 이 ID는 수신된 모든 이벤트에 첨부되며, `eth_unsubscribe`를 사용하여 구독을 취소할 때도 사용할 수 있습니다.

#### 구독 이벤트 {#subscription-events}

구독이 활성화되어 있는 동안 다음 필드가 있는 객체인 이벤트를 수신하게 됩니다.

- `jsonrpc`: 항상 "2.0"
- `method`: 항상 "eth_subscription"
- `params`: 다음 필드가 있는 객체:
  - `subscription`: 이 구독을 생성한 `eth_subscribe` 호출에서 반환된 구독 ID입니다.
  - `result`: 구독 유형에 따라 내용이 달라지는 객체입니다.

#### 구독 유형 {#subscription-types}

1. `alchemy_newFullPendingTransactions`

대기 중(pending) 상태에 추가된 모든 트랜잭션에 대한 트랜잭션 정보를 반환합니다. 이 구독 유형은 표준 Web3 호출인 `web3.eth.subscribe("pendingTransactions")`와 유사하게 대기 중인 트랜잭션을 구독하지만, 트랜잭션 해시뿐만 아니라 <em>전체 트랜잭션 정보</em>를 내보낸다는 점에서 다릅니다.

예:

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

체인 재구성 중을 포함하여 체인에 새 헤더가 추가될 때마다 이벤트를 내보냅니다.

체인 재구성이 발생하면 이 구독은 새 체인의 모든 새 헤더가 포함된 이벤트를 내보냅니다. 특히, 이는 동일한 높이에서 여러 헤더가 내보내지는 것을 볼 수 있음을 의미하며, 이 경우 나중에 나온 헤더를 재구성 이후의 올바른 헤더로 간주해야 합니다.

예:

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

지정된 필터 기준과 일치하는 새로 추가된 블록의 일부인 로그를 내보냅니다.

체인 재구성이 발생하면 이전 체인의 블록에 속한 로그가 `removed` 속성이 `true`로 설정된 상태로 다시 내보내집니다. 또한 새 체인의 블록에 속한 로그가 내보내지므로, 재구성이 발생할 경우 동일한 트랜잭션에 대한 로그를 여러 번 볼 수 있습니다.

매개변수

1. 다음 필드가 있는 객체:
   - `address` (선택 사항): 주소를 나타내는 문자열 또는 이러한 문자열의 배열입니다.
     - 이 주소 중 하나에서 생성된 로그만 내보내집니다.
   - `topics`: 주제(topic) 지정자의 배열입니다.
     - 각 주제 지정자는 `null`, 주제를 나타내는 문자열 또는 문자열 배열 중 하나입니다.
     - 배열에서 `null`이 아닌 각 위치는 내보내지는 로그를 해당 위치에 주어진 주제 중 하나를 가진 로그로만 제한합니다.

주제 지정의 몇 가지 예:

- `[]`: 모든 주제 허용.
- `[A]`: 첫 번째 위치에 A (그리고 그 이후에는 무엇이든).
- `[null, B]`: 첫 번째 위치에 무엇이든, 두 번째 위치에 B (그리고 그 이후에는 무엇이든).
- `[A, B]`: 첫 번째 위치에 A, 두 번째 위치에 B (그리고 그 이후에는 무엇이든).
- `[[A, B], [A, B]]`: 첫 번째 위치에 (A 또는 B), 두 번째 위치에 (A 또는 B) (그리고 그 이후에는 무엇이든).

예:

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

더 이상 이벤트가 전송되지 않도록 기존 구독을 취소합니다.

매개변수

1. 이전에 `eth_subscribe` 호출에서 반환된 구독 ID입니다.

반환값

구독이 성공적으로 취소된 경우 `true`, 주어진 ID의 구독이 존재하지 않는 경우 `false`를 반환합니다.

예:

**요청**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**결과**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

무료로 [Alchemy에 가입](https://auth.alchemy.com)하고, [공식 문서](https://www.alchemy.com/docs/)를 확인해 보세요. 최신 소식은 [트위터](https://x.com/AlchemyPlatform)에서 팔로우할 수 있습니다.