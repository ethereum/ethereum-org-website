---
title: "웹소켓 사용하기"
description: "모든 이더리움 노드 제공자를 통해 웹소켓을 사용하여 JSON-RPC 요청을 보내고 이벤트에 구독하는 방법에 대한 가이드입니다."
author: "엘란 할펀"
lang: ko
tags: ["Alchemy", "웹소켓", "쿼리", "JavaScript"]
skill: beginner
breadcrumb: "웹소켓"
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

이 문서는 웹소켓을 사용하여 이더리움 블록체인에 요청을 보내는 방법에 대한 입문자용 가이드입니다. 예제에서는 표준 JSON-RPC 메서드를 사용하므로, Alchemy를 포함하여 웹소켓 엔드포인트를 제공하는 모든 노드 또는 노드 제공자와 함께 사용할 수 있습니다.

## 웹소켓과 HTTP 비교 {#websockets-vs-http}

HTTP와 달리 웹소켓을 사용하면 특정 정보를 원할 때 지속적으로 요청을 보낼 필요가 없습니다. 웹소켓은 (올바르게 구현된 경우) 네트워크 연결을 유지하고 변경 사항을 수신합니다.

다른 네트워크 연결과 마찬가지로 웹소켓이 중단 없이 영원히 열려 있을 것이라고 가정해서는 안 되지만, 끊어진 연결과 재연결을 수동으로 올바르게 처리하는 것은 까다로울 수 있습니다. 웹소켓의 또 다른 단점은 응답에서 HTTP 상태 코드를 받지 못하고 오류 메시지만 받는다는 것입니다.

클라이언트 라이브러리가 이를 대신 처리해 줄 수 있습니다. 예를 들어, [Viem의 웹소켓 전송(WebSocket transport)](https://viem.sh/docs/clients/transports/websocket)은 소켓 오류 시 재연결을 시도하고 기본적으로 연결 유지(keep-alive) 핑을 보냅니다.

## 직접 해보기 {#try-it-out}

이더리움 노드의 웹소켓 URL이 필요합니다. 노드 제공자는 API 키를 생성할 때 보통 `wss://<provider-host>/<your-api-key>` 형태의 URL을 제공합니다. 예를 들어, Alchemy 이더리움 메인넷 URL은 `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>`와 같습니다([무료 Alchemy 계정 가입하기](https://auth.alchemy.com/signup)). 다른 제공자에 대해서는 [서비스형 노드](/developers/docs/nodes-and-clients/nodes-as-a-service/)를 참조하거나, [자체 노드](/developers/docs/nodes-and-clients/run-a-node/)의 웹소켓 엔드포인트를 사용하세요. `wss://ethereum-rpc.publicnode.com`과 같은 퍼블릭 엔드포인트도 간단한 실험에 사용할 수 있지만, 속도 제한이 있으며 모든 구독 유형을 지원하지 않을 수 있습니다.

웹소켓을 테스트하는 가장 쉬운 방법은 [wscat](https://github.com/websockets/wscat)과 같은 웹소켓 요청용 명령줄 도구를 설치하는 것입니다. wscat을 사용하면 다음과 같이 요청을 보낼 수 있습니다.

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>`로 시작하는 줄은 사용자가 입력하는 내용이고, `<`로 시작하는 줄은 노드가 반환하는 내용입니다.

## 웹소켓 사용 방법 {#how-to-use-websockets}

시작하려면 제공자의 웹소켓 URL을 사용하여 웹소켓을 엽니다. Alchemy의 경우, [대시보드](https://dashboard.alchemy.com/)에서 앱을 열고 API 키를 확인하여 찾을 수 있습니다. 대부분의 제공자가 두 가지 모두에 동일한 API 키를 사용하지만, 웹소켓용 URL(`wss://`)은 HTTP 요청용 URL(`https://`)과 다릅니다.

![Alchemy 대시보드에서 웹소켓 URL을 찾는 위치](./use-websockets.mp4#602x280)

제공자가 지원하는 모든 [JSON-RPC 메서드](/developers/docs/apis/json-rpc/)는 웹소켓을 통해 사용할 수 있습니다. 이를 위해 HTTP POST 요청의 본문으로 전송될 페이로드와 동일한 페이로드를 사용하되, 해당 페이로드를 웹소켓을 통해 전송합니다.

## Web3와 함께 사용하기 {#with-web3}

[Viem](https://viem.sh/)과 같은 클라이언트 라이브러리를 사용하면서 웹소켓으로 전환하는 것은 간단합니다. `http` 전송 대신 웹소켓 URL과 함께 `webSocket` 전송을 사용하세요. 예를 들어, `npm install viem`을 실행한 후 다음 코드를 `index.mjs`로 저장하고 `node index.mjs`를 실행합니다.

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// 동일한 WebSocket을 통해 새 블록 구독
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## 구독 API {#subscription-api}

웹소켓을 통해 연결된 경우 `eth_subscribe` 및 `eth_unsubscribe`라는 두 가지 추가 메서드를 사용할 수 있습니다. 이 메서드들을 사용하면 특정 이벤트를 수신하고 즉시 알림을 받을 수 있습니다.

### `eth_subscribe` {#eth-subscribe}

지정된 이벤트에 대한 새 구독을 생성합니다. [`eth_subscribe`에 대해 자세히 알아보기](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

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

1. `newHeads`

체인 재구성을 포함하여 체인에 새 헤더가 추가될 때마다 이벤트를 발생시킵니다.

체인 재구성이 발생하면, 이 구독은 새 체인의 모든 새 헤더가 포함된 이벤트를 발생시킵니다. 특히, 이는 동일한 높이에서 여러 헤더가 발생되는 것을 볼 수 있음을 의미하며, 이러한 경우 나중에 발생한 헤더를 재구성 이후의 올바른 헤더로 간주해야 합니다.

예제:

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

지정된 필터 기준과 일치하는 새로 추가된 블록의 일부인 로그를 발생시킵니다.

체인 재구성이 발생하면, 이전 체인의 블록에 속했던 로그가 `removed` 속성이 `true`로 설정된 상태로 다시 발생합니다. 또한 새 체인의 블록에 속한 로그가 발생하므로, 재구성이 일어날 경우 동일한 트랜잭션에 대한 로그를 여러 번 볼 수 있습니다.

매개변수

1. 다음 필드가 있는 객체:
   - `address` (선택 사항): 주소를 나타내는 문자열 또는 이러한 문자열의 배열입니다.
     - 이 주소 중 하나에서 생성된 로그만 발생합니다.
   - `topics`: 주제(topic) 지정자 배열입니다.
     - 각 주제 지정자는 `null`, 주제를 나타내는 문자열 또는 문자열 배열 중 하나입니다.
     - 배열에서 `null`이 아닌 각 위치는 발생되는 로그를 해당 위치에 주어진 주제 중 하나를 가진 로그로만 제한합니다.

주제 지정의 몇 가지 예:

- `[]`: 모든 주제 허용.
- `[A]`: 첫 번째 위치에 A (그리고 그 이후의 모든 것).
- `[null, B]`: 첫 번째 위치에 아무거나, 두 번째 위치에 B (그리고 그 이후의 모든 것).
- `[A, B]`: 첫 번째 위치에 A, 두 번째 위치에 B (그리고 그 이후의 모든 것).
- `[[A, B], [A, B]]`: 첫 번째 위치에 (A 또는 B), 두 번째 위치에 (A 또는 B) (그리고 그 이후의 모든 것).

예제:

이 예제는 이더리움 메인넷의 [WETH 컨트랙트](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)에서 발생하는 `Deposit` 이벤트를 수신합니다.

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

노드의 대기 중인 상태(멤풀)에 추가되는 각 트랜잭션의 해시를 발생시킵니다.

예제:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

일부 제공자는 자체 구독 유형도 제공합니다. 예를 들어, Alchemy의 [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions)는 해시뿐만 아니라 <em>전체 트랜잭션 객체</em>를 발생시키며, 선택적인 `fromAddress`, `toAddress` 및 `hashesOnly` 필터를 허용합니다. 이는 표준 JSON-RPC API의 일부가 아니므로 해당 제공자에서만 작동합니다.

### `eth_unsubscribe` {#eth-unsubscribe}

기존 구독을 취소하여 더 이상 이벤트가 전송되지 않도록 합니다.

매개변수

1. 이전에 `eth_subscribe` 호출에서 반환된 구독 ID입니다.

반환값

구독이 성공적으로 취소된 경우 `true`, 주어진 ID의 구독이 존재하지 않는 경우 `false`를 반환합니다.

구독은 이를 생성한 웹소켓 연결에만 존재하므로, `eth_unsubscribe`는 동일한 연결을 통해 전송되어야 합니다. 별도의 HTTP 요청으로 전송할 수 없습니다. 연결을 닫으면 해당 연결의 모든 구독도 취소됩니다.

예제:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

무료로 [Alchemy에 가입](https://auth.alchemy.com)하고, [Alchemy의 문서](https://www.alchemy.com/docs/)를 확인해 보세요. 최신 소식은 [트위터](https://x.com/Alchemy)에서 Alchemy를 팔로우하여 확인할 수 있습니다.
