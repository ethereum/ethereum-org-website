---
title: JSON-RPC APIs
description: 이더리움 클라이언트를 위한, 무상태성 경량 RPC(원격 프로시저 호출) 프로토콜
lang: ko
---

소프트웨어 애플리케이션이 블록체인 데이터를 읽거나 네트워크에 트랜잭션을 전송하여 이더리움 블록체인과 상호작용하려면 이더리움 노드에 연결해야 합니다.

이를 위해 모든 [이더리움 클라이언트](/developers/docs/nodes-and-clients/#execution-clients)는 [JSON-RPC 사양](https://github.com/ethereum/execution-apis)을 구현하므로 애플리케이션은 특정 노드나 클라이언트 구현에 관계없이 의존할 수 있는 통일된 메서드 집합이 있습니다.

[JSON-RPC](https://www.jsonrpc.org/specification)는 무상태, 경량 원격 프로시저 호출(RPC) 프로토콜입니다. 여러 데이터 구조와 그 처리에 관한 규칙을 정의합니다. 소켓이나 HTTP 또는 다양한 메시지 전달 환경을 포함한 동일한 프로세스 내에서 개념을 사용할 수 있다는 점에서 전송의 추상화가 잘 이루어져 있습니다. (원문: agnostic; 불가지론자; 어떤 운영 체제나 프로세서의 조합에 대한 지식 없이도 기능을 수행할 수 있는, 여기에서는 추상화로 대체) 데이터 형식은 JSON(RFC 4627)으로 사용합니다.

## 클라이언트 구현 {#client-implementations}

이더리움 클라이언트는 JSON-RPC 사양을 구현할 때 각기 다른 프로그래밍 언어를 사용할 수 있습니다. 특정 프로그래밍 언어와 관련된 자세한 내용은 개별 [클라이언트 문서](/developers/docs/nodes-and-clients/#execution-clients)를 참조하세요. 최신 API 지원 정보는 각 클라이언트의 문서를 확인하는 게 좋습니다.

## 편의성 라이브러리 {#convenience-libraries}

JSON-RPC API를 통해 이더리움 클라이언트와 직접 상호 작용하는 방식을 선택할 수 있습니다. 그러나 dapp 개발자를 위한 더 쉬운 옵션도 있습니다. JSON-RPC API 위에 래퍼를 제공하기 위해 많은 [JavaScript](/developers/docs/apis/javascript/#available-libraries) 및 [백엔드 API](/developers/docs/apis/backend/#available-libraries) 라이브러리가 존재합니다. 개발자는 이런 라이브러리를 사용하여 이더리움과 상호 작용하는 JSON-RPC 요청을 초기화할 수 있습니다. 라이브러리를 잘 사용하면 개발을 위해 선택한 프로그래밍 언어로, 직관적인 한 줄 메서드를 작성할 수 있습니다.

## 합의 클라이언트 API {#consensus-clients}

이 페이지는 주로 이더리움 실행 클라이언트에서 사용하는 JSON-RPC API를 다룹니다. 그러나 합의 클라이언트에는 사용자가 노드에 대한 정보를 쿼리하고, 비콘 블록, 비콘 상태 및 기타 합의 관련 정보를 노드에서 직접 요청할 수 있는 RPC API도 있습니다. 이 API는 [Beacon API 웹페이지](https://ethereum.github.io/beacon-APIs/#/)에 문서화되어 있습니다.

내부 API는 노드 내의 클라이언트 간 통신에도 사용됩니다. 즉, 합의 클라이언트와 실행 클라이언트가 데이터를 교환할 수 있게 해줍니다. 이를 '엔진 API'라고 하며 사양은 [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)에서 확인할 수 있습니다.

## 실행 클라이언트 사양 {#spec}

[GitHub에서 전체 JSON-RPC API 사양 읽기](https://github.com/ethereum/execution-apis). 이 API는 [실행 API 웹페이지](https://ethereum.github.io/execution-apis/)에 문서화되어 있으며 사용 가능한 모든 방법을 시험해 볼 수 있는 검사기를 포함합니다.

## 규칙 {#conventions}

### 16진수 값 인코딩 {#hex-encoding}

형식이 지정되지 않은 바이트 배열과 수량이라는 두 가지 주요 데이터 유형이 JSON을 통해 전달됩니다. 둘 다 16진수 인코딩으로 전달되지만 형식 지정에 대한 요구 사항은 다릅니다.

#### 수량 {#quantities-encoding}

수량(정수, 숫자)을 인코딩할 때: 16진수로 인코딩하고, "0x"를 접두사로 붙이며, 가장 간결한 표현을 사용합니다(약간의 예외: 0은 "0x0"으로 표현해야 함).

몇 가지 예는 다음과 같습니다.

- 0x41 (10진수로 65)
- 0x400 (10진수로 1024)
- 잘못됨: 0x (항상 하나 이상의 숫자가 있어야 함 - 0은 "0x0")
- 잘못됨: 0x0400 (앞에 0을 붙일 수 없음)
- 잘못됨: ff (접두사 0x가 있어야 함)

### 형식 없는 데이터 {#unformatted-data-encoding}

형식 없는 데이터(바이트 배열, 계정 주소, 해시, 바이트코드 배열)를 인코딩할 때: 16진수로 인코딩하고, 접두사 "0x"를 붙이며, 바이트당 2개의 16진수 숫자를 사용합니다.

몇 가지 예는 다음과 같습니다.

- 0x41 (크기 1, "A")
- 0x004200 (크기 3, "0B0")
- 0x (크기 0, "")
- 잘못됨: 0xf0f0f (짝수 개의 숫자여야 함)
- 잘못됨: 004200 (접두사 0x가 있어야 함)

### 블록 매개변수 {#block-parameter}

다음 메서드에는 블록 매개변수가 있습니다:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

이더리움의 상태를 쿼리하는 요청이 이루어지면 제공된 블록 매개변수가 블록의 높이를 결정합니다.

블록 매개변수에 대해 다음 옵션을 사용할 수 있습니다:

- `16진수 문자열` - 정수 블록 번호
- `문자열 "earliest"` - 가장 오래된/제네시스 블록
- `문자열 "latest"` - 최신 제안 블록
- `문자열 "safe"` - 최신 안전 헤드 블록
- `문자열 "finalized"` - 최신 확정 블록
- `문자열 "pending"` - 보류 중인 상태/트랜잭션

## 예시

이 페이지에서는 명령줄 도구인 [curl](https://curl.se)을 사용하여 개별 JSON_RPC API 엔드포인트를 사용하는 방법에 대한 예를 제공합니다. 이러한 개별 엔드포인트 예는 아래의 [Curl 예제](#curl-examples) 섹션에서 찾을 수 있습니다. 페이지의 뒷부분에서는 Geth 노드, JSON_RPC API 및 curl을 사용하여 스마트 계약을 컴파일하고 배포하는 [엔드투엔드 예제](#usage-example)도 제공합니다.

## Curl 예제 {#curl-examples}

이더리움 노드에 [curl](https://curl.se) 요청을 하여 JSON_RPC API를 사용하는 예제가 아래에 제공됩니다. 각 예제에는
특정 엔드포인트에 대한 설명, 매개변수, 반환 유형 및 사용 방법에 대한 실제 예제가 포함됩니다.

curl 요청은 콘텐츠 유형과 관련된 오류 메시지를 반환할 수 있습니다. 이는 `--data` 옵션이 콘텐츠 유형을 `application/x-www-form-urlencoded`로 설정하기 때문입니다. 노드에서 이와 관련하여 불만을 제기하는 경우, 호출 시작 부분에 `-H "Content-Type: application/json"`을 배치하여 헤더를 수동으로 설정하세요. 예제에는 curl에 마지막 인수로 제공되어야 하는 URL/IP 및 포트 조합(예: `127.0.0.1:8545`)도 포함되어 있지 않습니다. 이러한 추가 데이터를 포함하는 전체 curl 요청은 다음 형식을 취합니다:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## 가십, 상태, 기록 {#gossip-state-history}

소수의 핵심 JSON-RPC 메서드는 이더리움 네트워크의 데이터가 필요하며, _가십, 상태, 기록_이라는 세 가지 주요 범주로 깔끔하게 분류됩니다. 이 섹션의 링크를 사용하여 각 메서드로 이동하거나 목차를 사용하여 전체 메서드 목록을 탐색하세요.

### 가십 메서드 {#gossip-methods}

> 이 메서드들은 체인의 헤드를 추적합니다. 이것이 트랜잭션이 네트워크를 돌아다니고, 블록으로 들어가며, 클라이언트가 새로운 블록에 대해 알게 되는 방식입니다.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### 상태 메서드 {#state_methods}

> 저장된 모든 데이터의 현재 상태를 보고하는 메서드입니다. '상태'는 하나의 큰 공유 RAM 조각과 같으며 계정 잔액, 계약 데이터 및 가스 추정치를 포함합니다.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### 기록 메서드 {#history_methods}

> 제네시스까지 모든 블록의 과거 기록을 가져옵니다. 이것은 하나의 큰 추가 전용 파일과 같으며 모든 블록 헤더, 블록 본문, 엉클 블록 및 트랜잭션 영수증을 포함합니다.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API 플레이그라운드

[플레이그라운드 도구](https://ethereum-json-rpc.com)를 사용하여 API 메서드를 검색하고 사용해 볼 수 있습니다. 또한 다양한 노드 제공업체에서 지원하는 메서드와 네트워크를 보여줍니다.

## JSON-RPC API 메서드 {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

현재 클라이언트의 버전을 반환합니다.

**매개변수**

없음

**반환 값**

`문자열` - 현재 클라이언트 버전

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// 결과
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

주어진 데이터의 Keccak-256(표준화된 SHA3-256이 _아님_)을 반환합니다.

**매개변수**

1. `DATA` - SHA3 해시로 변환할 데이터

```js
params: ["0x68656c6c6f20776f726c64"]
```

**반환 값**

`DATA` - 주어진 문자열의 SHA3 결과입니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// 결과
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

현재 네트워크 ID를 반환합니다.

**매개변수**

없음

**반환 값**

`문자열` - 현재 네트워크 ID입니다.

현재 네트워크 ID의 전체 목록은 [chainlist.org](https://chainlist.org)에서 확인할 수 있습니다. 일반적인 몇 가지 예는 다음과 같습니다:

- `1`: 이더리움 메인넷
- `11155111`: 세폴리아 테스트넷
- `560048` : Hoodi 테스트넷

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// 결과
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

클라이언트가 네트워크 연결을 활발하게 수신하고 있으면 `true`를 반환합니다.

**매개변수**

없음

**반환 값**

`부울` - 수신 중일 때는 `true`, 그렇지 않으면 `false`입니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// 결과
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

현재 클라이언트에 연결된 피어 수를 반환합니다.

**매개변수**

없음

**반환 값**

`QUANTITY` - 연결된 피어 수의 정수입니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// 결과
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

현재 이더리움 프로토콜 버전을 반환합니다. 이 메서드는 [Geth에서 사용할 수 없음](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)에 유의하세요.

**매개변수**

없음

**반환 값**

`문자열` - 현재 이더리움 프로토콜 버전

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// 결과
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

동기화 상태에 대한 데이터가 있는 객체 또는 `false`를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

정확한 반환 데이터는 클라이언트 구현에 따라 다릅니다. 모든 클라이언트는 노드가 동기화되지 않을 때 `False`를 반환하고, 모든 클라이언트는 다음 필드를 반환합니다.

`객체|부울`, 동기화 상태 데이터가 있는 객체 또는 동기화되지 않을 때 `FALSE`:

- `startingBlock`: `QUANTITY` - 가져오기가 시작된 블록(동기화가 헤드에 도달한 후에만 재설정됨)
- `currentBlock`: `QUANTITY` - 현재 블록, eth_blockNumber와 동일
- `highestBlock`: `QUANTITY` - 추정된 가장 높은 블록

그러나 개별 클라이언트는 추가 데이터를 제공할 수도 있습니다. 예를 들어 Geth는 다음을 반환합니다:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

반면에 Besu는 다음을 반환합니다:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

자세한 내용은 특정 클라이언트의 설명서를 참조하세요.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// 또는 동기화되지 않을 때
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

클라이언트 코인베이스 주소를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

> **참고:** 이 메서드는 **v1.14.0**부터 더 이상 사용되지 않으며 지원되지 않습니다. 이 메서드를 사용하려고 하면 "메서드가 지원되지 않음" 오류가 발생합니다.

**매개변수**

없음

**반환 값**

`DATA`, 20바이트 - 현재 코인베이스 주소.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// 결과
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

재생 보호 트랜잭션 서명에 사용되는 체인 ID를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

`chainId`, 현재 체인 ID의 정수를 나타내는 문자열로서의 16진수 값.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// 결과
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

클라이언트가 새 블록을 활발하게 채굴하는 경우 `true`를 반환합니다. 이것은 작업 증명 네트워크에 대해서만 `true`를 반환할 수 있으며 [병합](/roadmap/merge/) 이후 일부 클라이언트에서는 사용할 수 없을 수도 있습니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

`부울` - 클라이언트가 채굴 중이면 `true`, 그렇지 않으면 `false`를 반환합니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

노드가 채굴 중인 초당 해시 수를 반환합니다. 이것은 작업 증명 네트워크에 대해서만 `true`를 반환할 수 있으며 [병합](/roadmap/merge/) 이후 일부 클라이언트에서는 사용할 수 없을 수도 있습니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

`QUANTITY` - 초당 해시 수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// 결과
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

웨이 단위의 가스당 현재 가격 추정치를 반환합니다. 예를 들어, Besu 클라이언트는 마지막 100개 블록을 검사하고 기본적으로 중간 가스 단가를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

`QUANTITY` - 웨이 단위의 현재 가스 가격의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// 결과
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 웨이
}
```

### eth_accounts {#eth_accounts}

클라이언트가 소유한 주소 목록을 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

`DATA 배열`, 20바이트 - 클라이언트가 소유한 주소.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

가장 최신 블록의 번호를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

없음

**반환 값**

`QUANTITY` - 클라이언트가 있는 현재 블록 번호의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// 결과
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

지정된 주소에 있는 계정의 잔액을 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 20바이트 - 잔액을 확인할 주소.
2. `QUANTITY|TAG` - 정수 블록 번호 또는 문자열 `"latest"`, `"earliest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter) 참조

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**반환 값**

`QUANTITY` - 웨이 단위의 현재 잔액의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

지정된 주소의 스토리지 위치에서 값을 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 20바이트 - 스토리지 주소.
2. `QUANTITY` - 스토리지 내 위치의 정수.
3. `QUANTITY|TAG` - 정수 블록 번호 또는 문자열 `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter) 참조

**반환 값**

`DATA` - 이 스토리지 위치의 값.

**예제**
올바른 위치 계산은 검색할 스토리지에 따라 다릅니다. 주소 `0x391694e7e0b0cce554cb130d723a9d27458f9298`에 의해 `0x295a70b2de5e3953354a6a8344e616ed314d7251`에 배포된 다음 계약을 고려해 보세요.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

pos0의 값을 검색하는 것은 간단합니다.

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

맵의 요소를 검색하는 것은 더 어렵습니다. 맵에 있는 요소의 위치는 다음과 같이 계산됩니다:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

즉, pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]의 스토리지를 검색하려면 다음을 사용하여 위치를 계산해야 합니다:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

web3 라이브러리와 함께 제공되는 geth 콘솔을 사용하여 계산할 수 있습니다:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

이제 스토리지를 가져옵니다:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

주소에서 _보낸_ 트랜잭션 수를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 20바이트 - 주소.
2. `QUANTITY|TAG` - 정수 블록 번호 또는 문자열 `"latest"`, `"earliest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter) 참조

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // 최신 블록의 상태
]
```

**반환 값**

`QUANTITY` - 이 주소에서 보낸 트랜잭션 수의 정수입니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

주어진 블록 해시와 일치하는 블록의 트랜잭션 수를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 32바이트 - 블록의 해시

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**반환 값**

`QUANTITY` - 이 블록의 트랜잭션 수의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

주어진 블록 번호와 일치하는 블록의 트랜잭션 수를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `QUANTITY|TAG` - 블록 번호의 정수, 또는 문자열 `"earliest"`, `"latest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter)에서와 같이.

```js
params: [
  "0x13738ca", // 20396234
]
```

**반환 값**

`QUANTITY` - 이 블록의 트랜잭션 수의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

주어진 블록 해시와 일치하는 블록의 엉클 수를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 32바이트 - 블록의 해시

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**반환 값**

`QUANTITY` - 이 블록의 엉클 수의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

주어진 블록 번호와 일치하는 블록의 엉클 수를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `QUANTITY|TAG` - 정수 블록 번호, 또는 문자열 `"latest"`, `"earliest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter) 참조

```js
params: [
  "0xe8", // 232
]
```

**반환 값**

`QUANTITY` - 이 블록의 엉클 수의 정수.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

지정된 주소의 코드를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 20바이트 - 주소
2. `QUANTITY|TAG` - 정수 블록 번호 또는 문자열 `"latest"`, `"earliest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter) 참조

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**반환 값**

`DATA` - 지정된 주소의 코드.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

sign 메서드는 `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`로 이더리움 특정 서명을 계산합니다.

메시지에 접두사를 추가하면 계산된 서명을 이더리움 특정 서명으로 인식할 수 있습니다. 이를 통해 악의적인 탈중앙화앱이 임의의 데이터(예: 트랜잭션)에 서명하고 서명을 사용하여 피해자를 사칭하는 오용을 방지할 수 있습니다.

참고: 서명할 주소는 잠금 해제되어야 합니다.

**매개변수**

1. `DATA`, 20바이트 - 주소
2. `DATA`, N 바이트 - 서명할 메시지

**반환 값**

`DATA`: 서명

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

[eth_sendRawTransaction](#eth_sendrawtransaction)을 사용하여 나중에 네트워크에 제출할 수 있는 트랜잭션에 서명합니다.

**매개변수**

1. `객체` - 트랜잭션 객체

- `type`:
- `from`: `DATA`, 20바이트 - 트랜잭션이 전송된 주소.
- `to`: `DATA`, 20바이트 - (새 계약 생성 시 선택 사항) 트랜잭션이 보내지는 주소.
- `gas`: `QUANTITY` - (선택 사항, 기본값: 90000) 트랜잭션 실행을 위해 제공된 가스의 정수. 사용하지 않은 가스를 반환합니다.
- `gasPrice`: `QUANTITY` - (선택 사항, 기본값: 추후 결정) 지불된 각 가스에 사용되는 가스 가격의 정수(웨이 단위).
- `value`: `QUANTITY` - (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수(웨이 단위).
- `data`: `DATA` - 계약의 컴파일된 코드 또는 호출된 메서드 서명의 해시 및 인코딩된 매개변수.
- `nonce`: `QUANTITY` - (선택 사항) 논스의 정수. 이를 통해 동일한 논스를 사용하는 자신의 보류 중인 트랜잭션을 덮어쓸 수 있습니다.

**반환 값**

`DATA`, 지정된 계정으로 서명된 RLP 인코딩 트랜잭션 객체.

**예시**

```js
// 요청
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// 결과
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

데이터 필드에 코드가 포함된 경우 새 메시지 호출 트랜잭션 또는 계약 생성을 만들고 `from`에 지정된 계정을 사용하여 서명합니다.

**매개변수**

1. `객체` - 트랜잭션 객체

- `from`: `DATA`, 20바이트 - 트랜잭션이 전송된 주소.
- `to`: `DATA`, 20바이트 - (새 계약 생성 시 선택 사항) 트랜잭션이 보내지는 주소.
- `gas`: `QUANTITY` - (선택 사항, 기본값: 90000) 트랜잭션 실행을 위해 제공된 가스의 정수. 사용하지 않은 가스를 반환합니다.
- `gasPrice`: `QUANTITY` - (선택 사항, 기본값: 추후 결정) 지불된 각 가스에 사용되는 가스 가격의 정수.
- `value`: `QUANTITY` - (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수.
- `input`: `DATA` - 계약의 컴파일된 코드 또는 호출된 메서드 서명의 해시 및 인코딩된 매개변수.
- `nonce`: `QUANTITY` - (선택 사항) 논스의 정수. 이를 통해 동일한 논스를 사용하는 자신의 보류 중인 트랜잭션을 덮어쓸 수 있습니다.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**반환 값**

`DATA`, 32바이트 - 트랜잭션 해시, 또는 트랜잭션을 아직 사용할 수 없는 경우 0 해시.

계약을 생성했을 때 트랜잭션이 블록에 제안된 후 [eth_getTransactionReceipt](#eth_gettransactionreceipt)를 사용하여 계약 주소를 가져옵니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{위 참조}],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

서명된 트랜잭션에 대한 새 메시지 호출 트랜잭션 또는 계약 생성을 만듭니다.

**매개변수**

1. `DATA`, 서명된 트랜잭션 데이터.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**반환 값**

`DATA`, 32바이트 - 트랜잭션 해시, 또는 트랜잭션을 아직 사용할 수 없는 경우 0 해시.

계약을 생성했을 때 트랜잭션이 블록에 제안된 후 [eth_getTransactionReceipt](#eth_gettransactionreceipt)를 사용하여 계약 주소를 가져옵니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{위 참조}],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

블록체인에 트랜잭션을 생성하지 않고 즉시 새 메시지 호출을 실행합니다. ERC-20 계약의 `balanceOf`와 같이 읽기 전용 스마트 계약 함수를 실행하는 데 자주 사용됩니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `객체` - 트랜잭션 호출 객체

- `from`: `DATA`, 20바이트 - (선택 사항) 트랜잭션이 전송된 주소.
- `to`: `DATA`, 20바이트 - 트랜잭션이 보내지는 주소.
- `gas`: `QUANTITY` - (선택 사항) 트랜잭션 실행을 위해 제공된 가스의 정수. eth_call은 가스를 소비하지 않지만 일부 실행에서는 이 매개변수가 필요할 수 있습니다.
- `gasPrice`: `QUANTITY` - (선택 사항) 지불된 각 가스에 사용되는 가스 가격의 정수
- `value`: `QUANTITY` - (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수
- `input`: `DATA` - (선택 사항) 메서드 서명의 해시 및 인코딩된 매개변수. 자세한 내용은 [솔리디티 문서의 이더리움 계약 ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)를 참조하세요.

2. `QUANTITY|TAG` - 정수 블록 번호 또는 문자열 `"latest"`, `"earliest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter) 참조

**반환 값**

`DATA` - 실행된 계약의 반환 값.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{위 참조}],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

트랜잭션이 완료되는 데 필요한 가스 양에 대한 추정치를 생성하고 반환합니다. 트랜잭션은 블록체인에 추가되지 않습니다. EVM 메커니즘 및 노드 성능을 포함한 다양한 이유로 인해 추정치가 트랜잭션에서 실제로 사용된 가스 양보다 훨씬 많을 수 있다는 점에 유의하세요.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

모든 속성이 선택 사항이라는 점을 제외하고 [eth_call](#eth_call) 매개변수를 참조하세요. 가스 한도가 지정되지 않은 경우 geth는 보류 중인 블록의 블록 가스 한도를 상한으로 사용합니다. 결과적으로 가스 양이 보류 중인 블록 가스 한도보다 높을 경우 반환된 추정치가 호출/트랜잭션을 실행하기에 충분하지 않을 수 있습니다.

**반환 값**

`QUANTITY` - 사용된 가스의 양.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{위 참조}],"id":1}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

해시로 블록에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 32바이트 - 블록의 해시.
2. `부울` - `true`이면 전체 트랜잭션 객체를 반환하고, `false`이면 트랜잭션의 해시만 반환합니다.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**반환 값**

`객체` - 블록 객체, 또는 블록을 찾을 수 없는 경우 `null`:

- `number`: `QUANTITY` - 블록 번호. 보류 중인 블록인 경우 `null`.
- `hash`: `DATA`, 32바이트 - 블록의 해시. 보류 중인 블록인 경우 `null`.
- `parentHash`: `DATA`, 32바이트 - 부모 블록의 해시.
- `nonce`: `DATA`, 8바이트 - 생성된 작업 증명의 해시. 보류 중인 블록인 경우 `null`, 지분 증명 블록의 경우 `0x0`(병합 이후)
- `sha3Uncles`: `DATA`, 32바이트 - 블록에 있는 엉클 데이터의 SHA3.
- `logsBloom`: `DATA`, 256바이트 - 블록의 로그에 대한 블룸 필터. 보류 중인 블록인 경우 `null`.
- `transactionsRoot`: `DATA`, 32바이트 - 블록의 트랜잭션 트리의 루트.
- `stateRoot`: `DATA`, 32바이트 - 블록의 최종 상태 트리의 루트.
- `receiptsRoot`: `DATA`, 32바이트 - 블록의 영수증 트리의 루트.
- `miner`: `DATA`, 20바이트 - 블록 보상을 받은 수혜자의 주소.
- `difficulty`: `QUANTITY` - 이 블록의 난이도 정수.
- `totalDifficulty`: `QUANTITY` - 이 블록까지의 체인 총 난이도 정수.
- `extraData`: `DATA` - 이 블록의 "추가 데이터" 필드.
- `size`: `QUANTITY` - 이 블록의 크기(바이트) 정수.
- `gasLimit`: `QUANTITY` - 이 블록에서 허용되는 최대 가스.
- `gasUsed`: `QUANTITY` - 이 블록의 모든 트랜잭션에서 사용된 총 가스.
- `timestamp`: `QUANTITY` - 블록이 수집된 유닉스 타임스탬프.
- `transactions`: `배열` - 트랜잭션 객체의 배열, 또는 마지막으로 주어진 매개변수에 따라 32바이트 트랜잭션 해시.
- `uncles`: `배열` - 엉클 해시의 배열.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// 결과
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

블록 번호로 블록에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `QUANTITY|TAG` - 블록 번호의 정수, 또는 문자열 `"earliest"`, `"latest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter)에서와 같이.
2. `부울` - `true`이면 전체 트랜잭션 객체를 반환하고, `false`이면 트랜잭션의 해시만 반환합니다.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**반환 값**
[eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

결과는 [eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요

### eth_getTransactionByHash {#eth_gettransactionbyhash}

트랜잭션 해시로 요청된 트랜잭션에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 32바이트 - 트랜잭션의 해시

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**반환 값**

`객체` - 트랜잭션 객체, 또는 트랜잭션을 찾을 수 없는 경우 `null`:

- `blockHash`: `DATA`, 32바이트 - 이 트랜잭션이 포함된 블록의 해시. 보류 중일 때 `null`.
- `blockNumber`: `QUANTITY` - 이 트랜잭션이 포함된 블록 번호. 보류 중일 때 `null`.
- `from`: `DATA`, 20바이트 - 발신자의 주소.
- `gas`: `QUANTITY` - 발신자가 제공한 가스.
- `gasPrice`: `QUANTITY` - 발신자가 웨이 단위로 제공한 가스 가격.
- `hash`: `DATA`, 32바이트 - 트랜잭션의 해시.
- `input`: `DATA` - 트랜잭션과 함께 전송된 데이터.
- `nonce`: `QUANTITY` - 이 트랜잭션 이전에 발신자가 수행한 트랜잭션 수.
- `to`: `DATA`, 20바이트 - 수신자의 주소. 계약 생성 트랜잭션인 경우 `null`.
- `transactionIndex`: `QUANTITY` - 블록 내 트랜잭션 인덱스 위치의 정수. 보류 중일 때 `null`.
- `value`: `QUANTITY` - 웨이 단위로 전송된 값.
- `v`: `QUANTITY` - ECDSA 복구 ID
- `r`: `QUANTITY` - ECDSA 서명 r
- `s`: `QUANTITY` - ECDSA 서명 s

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// 결과
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

블록 해시 및 트랜잭션 인덱스 위치로 트랜잭션에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 32바이트 - 블록의 해시.
2. `QUANTITY` - 트랜잭션 인덱스 위치의 정수.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**반환 값**
[eth_getTransactionByHash](#eth_gettransactionbyhash)를 참조하세요

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

결과는 [eth_getTransactionByHash](#eth_gettransactionbyhash)를 참조하세요

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

블록 번호 및 트랜잭션 인덱스 위치로 트랜잭션에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `QUANTITY|TAG` - 블록 번호 또는 문자열 `"earliest"`, `"latest"`, `"pending"`, `"safe"` 또는 `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter)에서와 같이.
2. `QUANTITY` - 트랜잭션 인덱스 위치.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**반환 값**
[eth_getTransactionByHash](#eth_gettransactionbyhash)를 참조하세요

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

결과는 [eth_getTransactionByHash](#eth_gettransactionbyhash)를 참조하세요

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

트랜잭션 해시로 트랜잭션의 영수증을 반환합니다.

**참고** 보류 중인 트랜잭션에 대해서는 영수증을 사용할 수 없습니다.

**매개변수**

1. `DATA`, 32바이트 - 트랜잭션의 해시

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**반환 값**
`객체` - 트랜잭션 영수증 객체, 또는 영수증을 찾을 수 없는 경우 `null`:

- `transactionHash `: `DATA`, 32바이트 - 트랜잭션의 해시.
- `transactionIndex`: `QUANTITY` - 블록 내 트랜잭션 인덱스 위치의 정수.
- `blockHash`: `DATA`, 32바이트 - 이 트랜잭션이 포함된 블록의 해시.
- `blockNumber`: `QUANTITY` - 이 트랜잭션이 포함된 블록 번호.
- `from`: `DATA`, 20바이트 - 발신자의 주소.
- `to`: `DATA`, 20바이트 - 수신자의 주소. 계약 생성 트랜잭션인 경우 null.
- `cumulativeGasUsed` : `QUANTITY` - 이 트랜잭션이 블록에서 실행되었을 때 사용된 총 가스 양.
- `effectiveGasPrice` : `QUANTITY` - 가스 단위당 지불된 기본 수수료와 팁의 합계.
- `gasUsed `: `QUANTITY` - 이 특정 트랜잭션에서만 사용된 가스 양.
- `contractAddress `: `DATA`, 20바이트 - 트랜잭션이 계약 생성인 경우 생성된 계약 주소, 그렇지 않으면 `null`.
- `logs`: `배열` - 이 트랜잭션이 생성한 로그 객체의 배열.
- `logsBloom`: `DATA`, 256바이트 - 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있도록 하는 블룸 필터.
- `type`: `QUANTITY` - 트랜잭션 유형의 정수, 레거시 트랜잭션의 경우 `0x0`, 액세스 목록 유형의 경우 `0x1`, 동적 수수료의 경우 `0x2`.

또한 다음 _중 하나_를 반환합니다.

- `root` : `DATA` 트랜잭션 후 상태 루트의 32바이트(비잔티움 이전)
- `status`: `QUANTITY` `1`(성공) 또는 `0`(실패)

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// 결과
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // 생성된 경우 주소 문자열
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs 등이 반환한 로그
    }],
    "logsBloom": "0x00...0", // 256바이트 블룸 필터
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

해시 및 엉클 인덱스 위치로 블록의 엉클에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `DATA`, 32바이트 - 블록의 해시.
2. `QUANTITY` - 엉클의 인덱스 위치.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**반환 값**
[eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

결과는 [eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요

**참고**: 엉클은 개별 트랜잭션을 포함하지 않습니다.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

번호 및 엉클 인덱스 위치로 블록의 엉클에 대한 정보를 반환합니다.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  플레이그라운드에서 엔드포인트 시도하기
</ButtonLink>

**매개변수**

1. `QUANTITY|TAG` - 블록 번호 또는 문자열 `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, [블록 매개변수](/developers/docs/apis/json-rpc/#block-parameter)에서와 같이.
2. `QUANTITY` - 엉클의 인덱스 위치.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**반환 값**
[eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요

**참고**: 엉클은 개별 트랜잭션을 포함하지 않습니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

결과는 [eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요

### eth_newFilter {#eth_newfilter}

필터 옵션을 기반으로 필터 객체를 생성하여 상태가 변경될 때(로그) 알립니다.
상태가 변경되었는지 확인하려면 [eth_getFilterChanges](#eth_getfilterchanges)를 호출하세요.

**토픽 필터 지정에 대한 참고 사항:**
토픽은 순서에 따라 다릅니다. 토픽 [A, B]가 있는 로그가 포함된 트랜잭션은 다음 토픽 필터와 일치합니다:

- `[]` "모든 것"
- `[A]` "첫 번째 위치에 A(그리고 그 뒤에 모든 것)"
- `[null, B]` "첫 번째 위치에 모든 것 AND 두 번째 위치에 B(그리고 그 뒤에 모든 것)"
- `[A, B]` "첫 번째 위치에 A AND 두 번째 위치에 B(그리고 그 뒤에 모든 것)"
- `[[A, B], [A, B]]` "첫 번째 위치에 (A 또는 B) AND 두 번째 위치에 (A 또는 B)(그리고 그 뒤에 모든 것)"
- **매개변수**

1. `객체` - 필터 옵션:

- `fromBlock`: `QUANTITY|TAG` - (선택 사항, 기본값: `"latest"`) 정수 블록 번호 또는 `"latest"`(최신 제안 블록), `"safe"`(최신 안전 블록), `"finalized"`(최신 확정 블록), `"pending"`, `"earliest"`(아직 블록에 포함되지 않은 트랜잭션).
- `toBlock`: `QUANTITY|TAG` - (선택 사항, 기본값: `"latest"`) 정수 블록 번호 또는 `"latest"`(최신 제안 블록), `"safe"`(최신 안전 블록), `"finalized"`(최신 확정 블록), `"pending"`, `"earliest"`(아직 블록에 포함되지 않은 트랜잭션).
- `address`: `DATA|배열`, 20바이트 - (선택 사항) 로그가 발생해야 하는 계약 주소 또는 주소 목록.
- `topics`: `DATA 배열` - (선택 사항) 32바이트 `DATA` 토픽의 배열. 토픽은 순서에 따라 다릅니다. 각 토픽은 "or" 옵션이 있는 DATA 배열일 수도 있습니다.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**반환 값**
`QUANTITY` - 필터 ID.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

새 블록이 도착하면 알림을 보내도록 노드에 필터를 생성합니다.
상태가 변경되었는지 확인하려면 [eth_getFilterChanges](#eth_getfilterchanges)를 호출하세요.

**매개변수**
없음

**반환 값**
`QUANTITY` - 필터 ID.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// 결과
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

새로운 보류 중인 트랜잭션이 도착하면 알림을 보내도록 노드에 필터를 생성합니다.
상태가 변경되었는지 확인하려면 [eth_getFilterChanges](#eth_getfilterchanges)를 호출하세요.

**매개변수**
없음

**반환 값**
`QUANTITY` - 필터 ID.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// 결과
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

지정된 ID의 필터를 제거합니다. 감시가 더 이상 필요하지 않을 때 항상 호출해야 합니다.
또한 필터는 일정 기간 동안 [eth_getFilterChanges](#eth_getfilterchanges)로 요청되지 않으면 시간 초과됩니다.

**매개변수**

1. `QUANTITY` - 필터 ID.

```js
params: [
  "0xb", // 11
]
```

**반환 값**
`부울` - 필터가 성공적으로 제거되면 `true`, 그렇지 않으면 `false`입니다.

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// 결과
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

마지막 폴링 이후 발생한 로그 배열을 반환하는 필터용 폴링 메서드입니다.

**매개변수**

1. `QUANTITY` - 필터 ID.

```js
params: [
  "0x16", // 22
]
```

**반환 값**
`배열` - 로그 객체의 배열, 또는 마지막 폴링 이후 변경된 사항이 없는 경우 빈 배열.

- `eth_newBlockFilter`로 생성된 필터의 경우 반환값은 블록 해시(`DATA`, 32바이트)입니다. 예: `["0x3454645634534..."]`.

- `eth_newPendingTransactionFilter`로 생성된 필터의 경우 반환값은 트랜잭션 해시(`DATA`, 32바이트)입니다. 예: `["0x6345343454645..."]`.

- `eth_newFilter`로 생성된 필터의 경우 로그는 다음 매개변수가 있는 객체입니다:
  - `removed`: `TAG` - 체인 재구성으로 인해 로그가 제거된 경우 `true`입니다. 유효한 로그인 경우 `false`입니다.
  - `logIndex`: `QUANTITY` - 블록 내 로그 인덱스 위치의 정수. 보류 중인 로그일 때 `null`.
  - `transactionIndex`: `QUANTITY` - 로그가 생성된 트랜잭션 인덱스 위치의 정수. 보류 중인 로그일 때 `null`.
  - `transactionHash`: `DATA`, 32바이트 - 이 로그가 생성된 트랜잭션의 해시. 보류 중인 로그일 때 `null`.
  - `blockHash`: `DATA`, 32바이트 - 이 로그가 포함된 블록의 해시. 보류 중일 때 `null`. 보류 중인 로그일 때 `null`.
  - `blockNumber`: `QUANTITY` - 이 로그가 포함된 블록 번호. 보류 중일 때 `null`. 보류 중인 로그일 때 `null`.
  - `address`: `DATA`, 20바이트 - 이 로그가 시작된 주소.
  - `data`: `DATA` - 가변 길이의 인덱싱되지 않은 로그 데이터. (_solidity_에서: 0개 이상의 32바이트 비인덱싱 로그 인수.)
  - `topics`: `DATA 배열` - 인덱싱된 로그 인수의 0에서 4개의 32바이트 `DATA` 배열. (_solidity_에서: `anonymous` 지정자로 이벤트를 선언한 경우를 제외하고 첫 번째 토픽은 이벤트 서명의 _해시_입니다(예: `Deposit(address,bytes32,uint256)`).

- **예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// 결과
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

지정된 ID와 일치하는 필터의 모든 로그 배열을 반환합니다.

**매개변수**

1. `QUANTITY` - 필터 ID.

```js
params: [
  "0x16", // 22
]
```

**반환 값**
[eth_getFilterChanges](#eth_getfilterchanges)를 참조하세요

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

결과는 [eth_getFilterChanges](#eth_getfilterchanges)를 참조하세요

### eth_getLogs {#eth_getlogs}

지정된 필터 객체와 일치하는 모든 로그의 배열을 반환합니다.

**매개변수**

1. `객체` - 필터 옵션:

- `fromBlock`: `QUANTITY|TAG` - (선택 사항, 기본값: `"latest"`) 정수 블록 번호 또는 `"latest"`(최신 제안 블록), `"safe"`(최신 안전 블록), `"finalized"`(최신 확정 블록), `"pending"`, `"earliest"`(아직 블록에 포함되지 않은 트랜잭션).
- `toBlock`: `QUANTITY|TAG` - (선택 사항, 기본값: `"latest"`) 정수 블록 번호 또는 `"latest"`(최신 제안 블록), `"safe"`(최신 안전 블록), `"finalized"`(최신 확정 블록), `"pending"`, `"earliest"`(아직 블록에 포함되지 않은 트랜잭션).
- `address`: `DATA|배열`, 20바이트 - (선택 사항) 로그가 발생해야 하는 계약 주소 또는 주소 목록.
- `topics`: `DATA 배열` - (선택 사항) 32바이트 `DATA` 토픽의 배열. 토픽은 순서에 따라 다릅니다. 각 토픽은 "or" 옵션이 있는 DATA 배열일 수도 있습니다.
- `blockHash`: `DATA`, 32바이트 - (선택 사항, **향후**) EIP-234가 추가되면서 `blockHash`는 반환되는 로그를 32바이트 해시 `blockHash`가 있는 단일 블록으로 제한하는 새로운 필터 옵션이 될 것입니다. `blockHash`를 사용하는 것은 `fromBlock` = `toBlock` = 해시 `blockHash`가 있는 블록 번호와 동일합니다. 필터 기준에 `blockHash`가 있는 경우 `fromBlock`이나 `toBlock`은 허용되지 않습니다.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**반환 값**
[eth_getFilterChanges](#eth_getfilterchanges)를 참조하세요

**예시**

```js
// 요청
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

결과는 [eth_getFilterChanges](#eth_getfilterchanges)를 참조하세요

## 사용 예제 {#usage-example}

### JSON_RPC를 사용하여 계약 배포하기 {#deploying-contract}

이 섹션에서는 RPC 인터페이스만 사용하여 계약을 배포하는 방법에 대한 시연을 포함합니다. 이러한 복잡성이 추상화된 계약 배포를 위한 대체 경로가 있습니다. 예를 들어, [web3.js](https://web3js.readthedocs.io/) 및 [web3.py](https://github.com/ethereum/web3.py)와 같이 RPC 인터페이스 위에 구축된 라이브러리를 사용하는 것입니다. 이러한 추상화는 일반적으로 이해하기 쉽고 오류가 발생할 가능성이 적지만, 내부에서 어떤 일이 일어나고 있는지 이해하는 것은 여전히 유용합니다.

다음은 이더리움 노드에 JSON-RPC 인터페이스를 사용하여 배포될 `Multiply7`이라는 간단한 스마트 계약입니다. 이 튜토리얼은 독자가 이미 Geth 노드를 실행하고 있다고 가정합니다. 노드와 클라이언트에 대한 자세한 정보는 [여기](/developers/docs/nodes-and-clients/run-a-node)에서 확인할 수 있습니다. Geth가 아닌 클라이언트의 경우 HTTP JSON-RPC를 시작하는 방법을 보려면 개별 [클라이언트](/developers/docs/nodes-and-clients/) 문서를 참조하세요. 대부분의 클라이언트는 기본적으로 `localhost:8545`에서 제공됩니다.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

가장 먼저 할 일은 HTTP RPC 인터페이스가 활성화되었는지 확인하는 것입니다. 즉, 시작 시 Geth에 `--http` 플래그를 제공합니다. 이 예에서는 비공개 개발 체인에서 Geth 노드를 사용합니다. 이 방법을 사용하면 실제 네트워크에서 이더가 필요하지 않습니다.

```bash
geth --http --dev console 2>>geth.log
```

이렇게 하면 `http://localhost:8545`에서 HTTP RPC 인터페이스가 시작됩니다.

[curl](https://curl.se)을 사용하여 코인베이스 주소(계정 배열에서 첫 번째 주소를 가져옴)와 잔액을 검색하여 인터페이스가 실행 중인지 확인할 수 있습니다. 이 예제의 데이터는 로컬 노드에서 다를 수 있다는 점에 유의하세요. 이 명령을 사용해 보려면 두 번째 curl 요청의 요청 매개변수를 첫 번째 요청에서 반환된 결과로 바꾸세요.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

숫자는 16진수로 인코딩되므로 잔액은 웨이 단위의 16진수 문자열로 반환됩니다. 잔액을 이더 단위의 숫자로 갖고 싶다면 Geth 콘솔에서 web3를 사용할 수 있습니다.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

이제 비공개 개발 체인에 이더가 있으므로 계약을 배포할 수 있습니다. 첫 번째 단계는 Multiply7 계약을 EVM으로 보낼 수 있는 바이트 코드로 컴파일하는 것입니다. 솔리디티 컴파일러인 solc를 설치하려면 [솔리디티 문서](https://docs.soliditylang.org/en/latest/installing-solidity.html)를 따르세요. (예제에 사용된 컴파일러 버전](https://github.com/ethereum/solidity/releases/tag/v0.4.20)과 일치시키기 위해 이전 `solc` 릴리스를 사용하고 싶을 수도 있습니다.)

다음 단계는 Multiply7 계약을 EVM으로 보낼 수 있는 바이트 코드로 컴파일하는 것입니다.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

이제 컴파일된 코드가 있으므로 이를 배포하는 데 드는 가스 비용을 결정해야 합니다. RPC 인터페이스에는 추정치를 제공하는 `eth_estimateGas` 메서드가 있습니다.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

그리고 마지막으로 계약을 배포합니다.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

트랜잭션이 노드에 의해 수락되고 트랜잭션 해시가 반환됩니다. 이 해시는 트랜잭션을 추적하는 데 사용할 수 있습니다. 다음 단계는 계약이 배포된 주소를 결정하는 것입니다. 실행된 각 트랜잭션은 영수증을 생성합니다. 이 영수증에는 트랜잭션이 포함된 블록과 EVM에서 사용한 가스 양과 같은 트랜잭션에 대한 다양한 정보가 포함되어 있습니다. 트랜잭션이
계약을 생성하는 경우 계약 주소도 포함됩니다. `eth_getTransactionReceipt` RPC 메서드로 영수증을 검색할 수 있습니다.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

우리의 계약은 `0x4d03d617d700cf81935d7f797f4e2ae719648262`에서 생성되었습니다. 영수증 대신 null 결과가 나오면 트랜잭션이 아직 블록에 포함되지 않았다는 의미입니다. 잠시 기다린 후 합의 클라이언트가 실행 중인지 확인하고 다시 시도하십시오.

#### 스마트 계약과 상호작용하기 {#interacting-with-smart-contract}

이 예제에서는 `eth_sendTransaction`을 사용하여 `multiply` 계약의 메서드에 트랜잭션을 전송합니다.

`eth_sendTransaction`에는 `from`, `to`, `data`와 같은 여러 인수가 필요합니다. `From`은 우리 계정의 공개 주소이고 `to`는 계약 주소입니다. `data` 인수는 어떤 메서드를 어떤 인수로 호출해야 하는지를 정의하는 페이로드를 포함합니다. 이것이 [ABI(애플리케이션 바이너리 인터페이스)](https://docs.soliditylang.org/en/latest/abi-spec.html)가 사용되는 부분입니다. ABI는 EVM에 대한 데이터를 정의하고 인코딩하는 방법을 정의하는 JSON 파일입니다.

페이로드의 바이트는 계약에서 호출되는 메서드를 정의합니다. 이것은 함수 이름과 인수 유형에 대한 Keccak 해시의 처음 4바이트를 16진수로 인코딩한 것입니다. multiply 함수는 uint256의 별칭인 uint를 허용합니다. 그러면 다음과 같이 됩니다.

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

다음으로 인수를 인코딩해 보겠습니다. 값 6과 같은 uint256이 하나만 있습니다. ABI에는 uint256 유형을 인코딩하는 방법을 지정하는 섹션이 있습니다.

`int<M>: enc(X)`는 X의 빅엔디언 2의 보수 인코딩으로, 음수 X의 경우 상위(왼쪽)에 0xff를, 양수 X의 경우 0바이트를 채워 길이가 32바이트의 배수가 되도록 합니다.

이것은 `0000000000000000000000000000000000000000000000000000000000000006`으로 인코딩됩니다.

함수 선택기와 인코딩된 인수를 결합하면 데이터는 `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`이 됩니다.

이제 이것을 노드로 보낼 수 있습니다.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

트랜잭션이 전송되었으므로 트랜잭션 해시가 반환되었습니다. 영수증을 검색하면 다음과 같이 표시됩니다.

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

영수증에는 로그가 포함되어 있습니다. 이 로그는 트랜잭션 실행 시 EVM에 의해 생성되어 영수증에 포함되었습니다. `multiply` 함수는 입력값에 7을 곱한 값으로 `Print` 이벤트가 발생했음을 보여줍니다. `Print` 이벤트의 인수가 uint256이었으므로 ABI 규칙에 따라 디코딩하면 예상되는 10진수 42를 얻을 수 있습니다. 데이터 외에도 토픽을 사용하여 어떤 이벤트가 로그를 생성했는지 확인할 수 있다는 점에 주목할 가치가 있습니다.

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

이것은 JSON-RPC의 직접적인 사용을 보여주는 가장 일반적인 작업 중 일부에 대한 간략한 소개였습니다.

## 관련 주제 {#related-topics}

- [JSON-RPC 사양](http://www.jsonrpc.org/specification)
- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [백엔드 API](/developers/docs/apis/backend/)
- [실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients)
