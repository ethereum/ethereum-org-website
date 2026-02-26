---
title: "웹소켓 사용하기"
description: "WebSockets와 Alchemy를 사용해 JSON-RPC를 요청하고 이벤트를 구독하는 가이드."
author: "Elan Halpern"
lang: ko
tags: ["alchemy", "websockets", "querying", "javascript"]
skill: beginner
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

이 가이드는 WebSockets 및 Alchemy를 사용하여 이더리움 블록체인에 요청하는 방법에 대한 입문자용 가이드입니다.

## WebSockets와 HTTP 비교 {#websockets-vs-http}

HTTP와 달리, WebSockets를 사용하면 특정 정보를 원할 때마다 지속적으로 요청할 필요가 없습니다. WebSockets는 (올바르게 설정된 경우) 네트워크 연결을 유지하고 변경 사항을 수신합니다.

모든 네트워크 연결과 마찬가지로 WebSocket이 중단 없이 영원히 열려 있다고 가정해서는 안 되며, 끊어진 연결을 처리하고 직접 재연결하는 것은 올바르게 구현하기 어려울 수 있습니다. WebSockets의 또 다른 단점은 응답에서 HTTP 상태 코드를 받지 못하고 오류 메시지만 받는다는 것입니다.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)는 별도의 구성 없이 WebSocket 오류 및 재시도에 대한 처리를 자동으로 추가합니다.

## 직접 해보기 {#try-it-out}

WebSockets를 테스트하는 가장 쉬운 방법은 [wscat](https://github.com/websockets/wscat)과 같은 WebSocket 요청을 보내기 위한 명령줄 도구를 설치하는 것입니다. wscat을 사용하여 다음과 같이 요청을 보낼 수 있습니다.

_참고: Alchemy 계정이 있는 경우 `demo`를 자신의 API 키로 바꿀 수 있습니다._ [여기에서 무료 Alchemy 계정에 가입하세요!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## WebSockets 사용 방법 {#how-to-use-websockets}

시작하려면 앱의 WebSocket URL을 사용하여 WebSocket을 여세요. [대시보드](https://dashboard.alchemy.com/)에서 앱의 페이지를 열고 "View Key"를 클릭하면 앱의 WebSocket URL을 찾을 수 있습니다. WebSockets용 앱의 URL은 HTTP 요청용 URL과 다르지만, 둘 다 "View Key"를 클릭하여 찾을 수 있습니다.

![Alchemy 대시보드에서 WebSocket URL을 찾는 위치](./use-websockets.gif)

[Alchemy API 참조](https://www.alchemy.com/docs/reference/api-overview)에 나열된 모든 API는 WebSocket을 통해 사용할 수 있습니다. 이렇게 하려면 HTTP POST 요청의 본문으로 전송되는 것과 동일한 페이로드를 WebSocket을 통해 전송하면 됩니다.

## 웹3 사용 {#with-web3}

웹3와 같은 클라이언트 라이브러리를 사용하면서 WebSockets로 전환하는 것은 간단합니다. 웹3 클라이언트를 인스턴스화할 때 HTTP URL 대신 WebSocket URL을 전달하기만 하면 됩니다. 예를 들어,

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## 구독 API {#subscription-api}

WebSocket을 통해 연결하면 `eth_subscribe`와 `eth_unsubscribe`라는 두 가지 추가 메서드를 사용할 수 있습니다. 이 메서드를 사용하면 특정 이벤트를 수신하고 즉시 알림을 받을 수 있습니다.

### `eth_subscribe` {#eth-subscribe}

지정된 이벤트에 대한 새 구독을 생성합니다. [`eth_subscribe`에 대해 자세히 알아보기](https://docs.alchemy.com/reference/eth-subscribe).

#### 파라미터 {#parameters}

1. 구독 유형
2. 선택적 매개변수

첫 번째 인수는 수신할 이벤트 유형을 지정합니다. 두 번째 인수에는 첫 번째 인수에 따라 달라지는 추가 옵션이 포함됩니다. 다양한 구독 유형, 옵션 및 이벤트 페이로드는 아래에 설명되어 있습니다.

#### 반환값 {#returns}

구독 ID: 이 ID는 수신된 모든 이벤트에 첨부되며, `eth_unsubscribe`를 사용하여 구독을 취소하는 데에도 사용할 수 있습니다.

#### 구독 이벤트 {#subscription-events}

구독이 활성화되어 있는 동안에는 다음 필드를 포함하는 객체인 이벤트를 받게 됩니다.

- `jsonrpc`: 항상 "2.0"
- `method`: 항상 "eth_subscription"
- `params`: 다음 필드를 포함하는 객체:
  - `subscription`: 이 구독을 생성한 `eth_subscribe` 호출에서 반환된 구독 ID.
  - `result`: 구독 유형에 따라 내용이 달라지는 객체.

#### 구독 유형 {#subscription-types}

1. `alchemy_newFullPendingTransactions`

보류 상태에 추가된 모든 트랜잭션의 정보를 반환합니다. 이 구독 유형은 표준 웹3 호출 `web3.eth.subscribe("pendingTransactions")`와 유사하게 보류 중인 트랜잭션에 대해 구독하지만, 트랜잭션 해시만이 아닌 _전체 트랜잭션 정보_를 내보낸다는 점에서 차이가 있습니다.

예시:

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
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe00000000000000000000000000000000000000000000015b1111266cfca100000",
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

체인 재구성을 포함하여 체인에 새 헤더가 추가될 때마다 이벤트를 발생시킵니다.

체인 재구성이 발생하면 이 구독은 새 체인에 대한 모든 새 헤더를 포함하는 이벤트를 발생시킵니다. 특히, 이는 동일한 높이의 여러 헤더가 발생하는 것을 볼 수 있음을 의미하며, 이 경우 재구성 후에는 더 늦게 나온 헤더를 올바른 헤더로 간주해야 합니다.

예시:

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

지정된 필터 기준과 일치하고 새로 추가된 블록의 일부인 로그를 발생시킵니다.

체인 재구성이 발생하면 이전 체인의 블록에 포함된 로그가 `removed` 속성이 `true`로 설정된 채로 다시 발생합니다. 또한, 새 체인의 블록에 포함된 로그가 발생하므로 재구성이 발생한 경우 동일한 트랜잭션에 대한 로그가 여러 번 표시될 수 있습니다.

매개변수

1. 다음 필드를 포함하는 객체:
   - `address` (선택 사항): 주소를 나타내는 문자열 또는 그러한 문자열의 배열.
     - 이러한 주소 중 하나에서 생성된 로그만 발생됩니다.
   - `topics`: 주제 지정자의 배열.
     - 각 주제 지정자는 `null`이거나, 주제를 나타내는 문자열이거나, 문자열의 배열입니다.
     - 배열에서 `null`이 아닌 각 위치는 해당 위치에 주어진 주제 중 하나를 갖는 로그만 발생하도록 제한합니다.

주제 사양의 몇 가지 예시:

- `[]`: 모든 주제 허용.
- `[A]`: 첫 번째 위치에 A(그리고 그 이후는 무엇이든).
- `[null, B]`: 첫 번째 위치에는 무엇이든, 두 번째 위치에는 B(그리고 그 이후는 무엇이든).
- `[A, B]`: 첫 번째 위치에 A, 두 번째 위치에 B(그리고 그 이후는 무엇이든).
- `[[A, B], [A, B]]`: 첫 번째 위치에 (A 또는 B), 두 번째 위치에 (A 또는 B)(그리고 그 이후는 무엇이든).

예시:

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

기존 구독을 취소하여 더 이상 이벤트가 전송되지 않도록 합니다.

매개변수

1. 이전에 `eth_subscribe` 호출에서 반환된 구독 ID입니다.

반환 값

구독이 성공적으로 취소되면 `true`이고, 지정된 ID를 가진 구독이 없으면 `false`입니다.

예시:

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

무료로 [Alchemy에 가입](https://auth.alchemy.com)하고, [개발문서](https://www.alchemy.com/docs/)를 확인하고, 최신 소식을 보려면 [Twitter](https://x.com/AlchemyPlatform)에서 팔로우하세요.
