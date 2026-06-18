---
title: JavaScript API 라이브러리
description: 애플리케이션에서 블록체인과 상호 작용할 수 있게 해주는 JavaScript 클라이언트 라이브러리에 대한 소개입니다.
lang: ko
---

웹 앱이 이더리움 블록체인과 상호 작용(예: 블록체인 데이터 읽기 및/또는 네트워크에 트랜잭션 전송)하려면 이더리움 노드에 연결해야 합니다.

이를 위해 모든 이더리움 클라이언트는 [JSON-RPC](/developers/docs/apis/json-rpc/) 사양을 구현하므로, 애플리케이션이 의존할 수 있는 일관된 [메서드](/developers/docs/apis/json-rpc/#json-rpc-methods) 세트가 존재합니다.

JavaScript를 사용하여 이더리움 노드에 연결하려는 경우 바닐라 JavaScript를 사용할 수도 있지만, 생태계 내에는 이를 훨씬 쉽게 만들어주는 여러 편의 라이브러리가 존재합니다. 개발자는 이러한 라이브러리를 사용하여 이더리움과 상호 작용하는 JSON-RPC 요청을 (내부적으로) 초기화하는 직관적인 한 줄짜리 메서드를 작성할 수 있습니다.

[머지](/roadmap/merge/) 이후에는 노드를 실행하기 위해 실행 클라이언트와 합의 클라이언트라는 두 가지 연결된 이더리움 소프트웨어가 필요합니다. 노드에 실행 클라이언트와 합의 클라이언트가 모두 포함되어 있는지 확인하세요. 노드가 로컬 머신에 있지 않은 경우(예: 노드가 AWS 인스턴스에서 실행 중인 경우) 튜토리얼의 IP 주소를 그에 맞게 업데이트하세요. 자세한 내용은 [노드 실행](/developers/docs/nodes-and-clients/run-a-node/) 페이지를 참조하세요.

## 전제 조건 {#prerequisites}

JavaScript를 이해하는 것 외에도 [이더리움 스택](/developers/docs/ethereum-stack/) 및 [이더리움 클라이언트](/developers/docs/nodes-and-clients/)를 이해하면 도움이 될 수 있습니다.

## 라이브러리를 사용하는 이유 {#why-use-a-library}

이러한 라이브러리는 이더리움 노드와 직접 상호 작용하는 복잡성을 대부분 추상화합니다. 또한 유틸리티 함수(예: ETH를 Gwei로 변환)를 제공하므로 개발자는 이더리움 클라이언트의 복잡성을 다루는 데 드는 시간을 줄이고 애플리케이션의 고유한 기능에 더 많은 시간을 집중할 수 있습니다.

## 라이브러리 기능 {#library-features}

### 이더리움 노드에 연결 {#connect-to-ethereum-nodes}

이러한 라이브러리는 프로바이더(provider)를 사용하여 JSON-RPC, Infura, Etherscan, Alchemy 또는 메타마스크를 통해 이더리움에 연결하고 데이터를 읽을 수 있게 해줍니다.

> **경고:** Web3.js는 2025년 3월 4일에 보관(archive) 처리되었습니다. [공지사항 읽기](https://blog.chainsafe.io/web3-js-sunset/). 새로운 프로젝트의 경우 [ethers.js](https://ethers.또는g) 또는 [viem](https://viem.sh)과 같은 대체 라이브러리 사용을 고려하세요.

**Ethers 예시**

```js
// BrowserProvider는 표준 Web3 공급자를 래핑하며, 이는
// 메타마스크가 각 페이지에 window.ethereum으로 주입하는 것입니다.
const provider = new ethers.BrowserProvider(window.ethereum)

// 메타마스크 플러그인은 또한 트랜잭션 서명을 허용하여
// 이더를 전송하고 블록체인 내의 상태를 변경하기 위해 지불할 수 있게 합니다.
// 이를 위해 계정 서명자가 필요합니다...
const signer = provider.getSigner()
```

**Web3js 예시**

```js
var web3 = new Web3("http://localhost:8545")
// 또는
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// 공급자 변경
web3.setProvider("ws://localhost:8546")
// 또는
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js에서 IPC 공급자 사용
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os 경로
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os 경로
// windows에서 경로는 다음과 같습니다: "\\\\.\\pipe\\geth.ipc"
// linux에서 경로는 다음과 같습니다: "/users/myuser/.ethereum/geth.ipc"
```

설정이 완료되면 블록체인에 다음을 쿼리할 수 있습니다.

- 블록 번호
- 가스 추정치
- 스마트 컨트랙트 이벤트
- 네트워크 ID
- 기타 등등...

### 지갑 기능 {#wallet-functionality}

이러한 라이브러리는 지갑을 생성하고, 키를 관리하며, 트랜잭션에 서명하는 기능을 제공합니다.

다음은 Ethers의 예시입니다.

```js
// 니모닉에서 지갑 인스턴스 생성...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...또는 프라이빗 키에서
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API에 따른 Promise 형태의 주소
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// 지갑 주소는 동기식으로도 사용할 수 있습니다.
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// 내부 암호화 구성 요소
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// 지갑 니모닉
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// 참고: 프라이빗 키로 생성된 지갑은
//       니모닉을 가지지 않습니다 (파생으로 인해 방지됨)
walletPrivateKey.mnemonic
// null

// 메시지 서명
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// 트랜잭션 서명
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect 메서드는 다음의 새 인스턴스를 반환합니다.
// 공급자에 연결된 지갑
wallet = walletMnemonic.connect(provider)

// 네트워크 쿼리
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// 이더 전송
wallet.sendTransaction(tx)
```

[전체 문서 읽기](https://docs.ethers.io/v5/api/signer/#Wallet)

설정이 완료되면 다음을 수행할 수 있습니다.

- 계정 생성
- 트랜잭션 전송
- 트랜잭션 서명
- 기타 등등...

### 스마트 컨트랙트 함수와 상호 작용 {#interact-with-smart-contract-functions}

JavaScript 클라이언트 라이브러리를 사용하면 애플리케이션이 컴파일된 컨트랙트의 애플리케이션 바이너리 인터페이스(ABI)를 읽어 스마트 컨트랙트 함수를 호출할 수 있습니다.

ABI는 기본적으로 컨트랙트의 함수를 JSON 형식으로 설명하며, 이를 일반적인 JavaScript 객체처럼 사용할 수 있게 해줍니다.

따라서 다음 Solidity 컨트랙트는:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

다음과 같은 JSON 결과를 생성합니다.

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

이는 다음을 수행할 수 있음을 의미합니다.

- 스마트 컨트랙트에 트랜잭션을 전송하고 해당 메서드 실행
- EVM에서 실행될 때 메서드 실행에 소요되는 가스를 추정하기 위해 호출
- 컨트랙트 배포
- 기타 등등...

### 유틸리티 함수 {#utility-functions}

유틸리티 함수는 이더리움 기반 개발을 조금 더 쉽게 만들어주는 유용한 단축 기능을 제공합니다.

ETH 값은 기본적으로 Wei 단위입니다. 1 ETH = 1,000,000,000,000,000,000 Wei이므로, 매우 큰 숫자를 다루게 됩니다! `web3.utils.toWei`는 이더를 Wei로 변환해 줍니다.

그리고 Ethers에서는 다음과 같습니다.

```js
// 계정의 잔액 가져오기 (주소 또는 ENS 이름으로)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// 종종 사용자를 위해 출력을 포맷해야 할 필요가 있습니다.
// 사용자는 (Wei 대신) 이더로 값을 보는 것을 선호합니다.
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js 유틸리티 함수](https://docs.web3js.org/api/web3-utils)
- [Ethers 유틸리티 함수](https://docs.ethers.org/v6/api/utils/)

## 사용 가능한 라이브러리 {#available-libraries}

**Web3.js -** **_이더리움 JavaScript API._**

- [문서](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript 및 TypeScript로 작성된 완전한 이더리움 지갑 구현 및 유틸리티._**

- [Ethers.js 홈](https://ethers.org/)
- [문서](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_이더리움 및 IPFS 데이터를 인덱싱하고 GraphQL을 사용하여 쿼리하기 위한 프로토콜._**

- [The Graph](https://thegraph.com)
- [Graph 탐색기](https://thegraph.com/explorer)
- [문서](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [디스코드](https://thegraph.com/discord)

**Alchemy SDK -** **_향상된 API를 제공하는 Ethers.js 래퍼(Wrapper)._**

- [문서](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_이더리움을 위한 TypeScript 인터페이스._**

- [문서](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_수십 개의 체인에 걸친 실시간의 풍부한 블록체인 데이터 API._**

- [문서](https://docs.codex.io)
- [탐색기](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [디스코드](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_캐싱, 훅(hooks), 테스트 모의 객체(mocks)가 내장된 TypeScript 메타 라이브러._**

- [문서](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## 더 읽을거리 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
- [개발 프레임워크](/developers/docs/frameworks/)

## 관련 튜토리얼 {#related-tutorials}

- [JavaScript에서 이더리움 블록체인을 사용하기 위한 Web3js 설정](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 프로젝트에 Web3.js를 설정하는 방법에 대한 지침입니다._
- [JavaScript에서 스마트 컨트랙트 호출하기](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI 토큰을 사용하여 JavaScript로 컨트랙트 함수를 호출하는 방법을 알아봅니다._
- [Web3 및 Alchemy를 사용하여 트랜잭션 전송하기](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– 백엔드에서 트랜잭션을 전송하기 위한 단계별 가이드입니다._

## 튜토리얼: 이더리움의 JavaScript API 및 웹소켓(WebSockets) {#tutorials}

- [웹소켓 사용하기](/developers/tutorials/using-websockets/) _– Alchemy와 함께 웹소켓을 사용하여 이더리움 이벤트를 구독하고 실시간 JSON-RPC 요청을 수행하는 방법입니다._