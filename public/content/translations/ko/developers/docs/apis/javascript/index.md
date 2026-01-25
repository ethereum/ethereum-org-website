---
title: 자바스크립트 API 라이브러리
description: 애플리케이션에서 블록체인과 상호작용할 수 있는 자바스크립트 클라이언트 라이브러리를 소개합니다.
lang: ko
---

웹 앱이 이더리움 블록체인과 상호작용하려면(즉, 블록체인 데이터를 읽거나 네트워크에 트랜잭션을 보내려면) 이더리움 노드에 연결해야 합니다.

이를 위해 모든 이더리움 클라이언트는 [JSON-RPC](/developers/docs/apis/json-rpc/) 사양을 구현하므로 애플리케이션이 의존할 수 있는 통일된 [메서드](/developers/docs/apis/json-rpc/#json-rpc-methods) 집합이 있습니다.

자바스크립트를 사용하여 이더리움 노드에 연결하려는 경우, 바닐라 자바스크립트를 사용할 수도 있지만, 생태계 내에 이를 훨씬 쉽게 만들어주는 여러 편의 라이브러리가 존재합니다. 개발자는 이러한 라이브러리를 사용하여 이더리움과 상호작용하는 JSON-RPC 요청(후드 아래)을 초기화하는 직관적인 단일 방법을 작성할 수 있습니다.

[병합](/roadmap/merge/) 이후, 노드를 실행하려면 실행 클라이언트와 합의 클라이언트라는 두 개의 연결된 이더리움 소프트웨어가 필요하다는 점에 유의하세요. 노드에 실행 클라이언트와 합의 클라이언트가 모두 포함되어 있는지 확인하세요. 노드가 로컬 컴퓨터에 없는 경우(예: AWS 인스턴스에서 노드가 실행되는 경우), 튜토리얼의 IP 주소를 적절하게 업데이트하세요. 자세한 내용은 [노드 실행하기](/developers/docs/nodes-and-clients/run-a-node/) 페이지를 참조하세요.

## 필수 구성 요소 {#prerequisites}

자바스크립트를 이해하는 것 외에도 [이더리움 스택](/developers/docs/ethereum-stack/)과 [이더리움 클라이언트](/developers/docs/nodes-and-clients/)를 이해하는 것이 도움이 될 수 있습니다.

## 라이브러리를 왜 사용할까요? {#why-use-a-library}

이러한 라이브러리는 이더리움 노드와 직접적으로 상호작용하는 많은 복잡성을 일반화합니다. 또한 유틸리티 함수(예: ETH를 Gwei로 변환)도 제공하므로 개발자는 이더리움 클라이언트의 복잡성을 처리하는 데 시간을 덜 들이고 애플리케이션의 고유 기능에 더 집중할 수 있습니다.

## 라이브러리 기능 {#library-features}

### 이더리움 노드에 연결 {#connect-to-ethereum-nodes}

이 라이브러리는 공급자를 사용하여 JSON-RPC, INFURA, Etherscan, Alchemy 또는 MetaMask를 통해 이더리움에 연결하고 데이터를 읽을 수 있게 해줍니다.

> **경고:** Web3.js는 2025년 3월 4일에 아카이브되었습니다. [공지 사항 읽기](https://blog.chainsafe.io/web3-js-sunset/). 새로운 프로젝트에는 [ethers.js](https://ethers.org) 또는 [viem](https://viem.sh)과 같은 대체 라이브러리를 사용하는 것을 고려해 보세요.

**Ethers 예시**

```js
// BrowserProvider는 표준 Web3 공급자를 래핑하며,
// 이는 MetaMask가 각 페이지에 window.ethereum으로 주입하는 것입니다
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask 플러그인을 사용하면 트랜잭션에 서명하여
// 이더를 전송하고 블록체인 내 상태를 변경하기 위해 지불할 수 있습니다.
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
// 또는
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os 경로
// windows에서의 경로는 다음과 같습니다: "\\\\.\\pipe\\geth.ipc"
// linux에서의 경로는 다음과 같습니다: "/users/myuser/.ethereum/geth.ipc"
```

설정이 완료되면 블록체인에 다음을 쿼리할 수 있습니다.

- 블록 번호
- 가스 추정치
- 스마트 계약 이벤트
- 네트워크 ID
- 그 이상 많은것들...

### 지갑 기능 {#wallet-functionality}

이 라이브러리들은 지갑을 만들고, 키를 관리하고, 트랜잭션에 서명하는 기능을 제공합니다.

다음은 Ethers의 예시입니다

```js
// 니모닉으로 지갑 인스턴스를 생성합니다...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...또는 개인 키로 생성합니다
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// 참

// 서명자 API에 따른 Promise로서의 주소
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// 지갑 주소는 동기적으로도 사용할 수 있습니다
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

// 참고: 개인 키로 생성된 지갑은
//       니모닉을 가지지 않습니다(파생 과정에서 이를 방지함)
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

// connect 메서드는 공급자에 연결된
// 지갑의 새 인스턴스를 반환합니다
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
- 그 이상 많은것들...

### 스마트 계약 함수와 상호작용하기 {#interact-with-smart-contract-functions}

자바스크립트 클라이언트 라이브러리를 사용하면 애플리케이션에서 컴파일된 계약의 애플리케이션 바이너리 인터페이스(ABI)를 읽어 스마트 계약 함수를 호출할 수 있습니다.

ABI는 기본적으로 계약의 함수를 JSON 형식으로 설명하며, 이를 일반적인 자바스크립트 객체처럼 사용할 수 있게 해줍니다.

따라서 다음 솔리디티 계약은:

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

다음과 같은 JSON이 생성됩니다.

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

즉, 다음을 수행할 수 있습니다.

- 스마트 계약에 트랜잭션을 보내고 메서드를 실행합니다
- EVM에서 실행될 때 메서드 실행에 소요될 가스를 추정하기 위해 호출합니다
- 계약 배포
- 기타 등등...

### 유틸리티 함수 {#utility-functions}

유틸리티 함수는 이더리움 기반의 빌드를 좀 더 쉽게 만들어주는 편리한 단축 기능을 제공합니다.

ETH 값은 기본적으로 Wei 단위입니다. 1 ETH = 1,000,000,000,000,000,000 WEI – 이는 매우 큰 숫자를 다룬다는 의미입니다! `web3.utils.toWei`는 이더를 Wei로 변환해 줍니다.

그리고 ethers에서는 다음과 같습니다.

```js
// 계정의 잔액을 가져옵니다(주소 또는 ENS 이름으로)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// 종종 사용자에게 보여주기 위해 출력을 포맷해야 합니다
// 사용자는 wei 대신 이더 단위의 값을 선호합니다
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js 유틸리티 함수](https://docs.web3js.org/api/web3-utils)
- [Ethers 유틸리티 함수](https://docs.ethers.org/v6/api/utils/)

## 사용 가능한 라이브러리 {#available-libraries}

**Web3.js -** **_이더리움 자바스크립트 API._**

- [개발문서](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_자바스크립트 및 타입스크립트의 완전한 이더리움 지갑 구현 및 유틸리티._**

- [Ethers.js 홈](https://ethers.org/)
- [개발문서](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_이더리움 및 IPFS 데이터를 인덱싱하고 GraphQL을 사용하여 쿼리하기 위한 프로토콜입니다._**

- [The Graph](https://thegraph.com)
- [그래프 탐색기](https://thegraph.com/explorer)
- [개발문서](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_향상된 API가 포함된 Ethers.js 래퍼._**

- [개발문서](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_이더리움을 위한 타입스크립트 인터페이스._**

- [개발문서](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_내장 캐싱, 후크, 테스트 목(mock)이 포함된 타입스크립트 메타 라이브러리._**

- [개발문서](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
- [개발 프레임워크](/developers/docs/frameworks/)

## 관련 튜토리얼 {#related-tutorials}

- [JavaScript에서 이더리움 블록체인을 사용하도록 Web3js 설정하기](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 프로젝트에 web3.js를 설정하는 방법에 대한 안내입니다._
- [JavaScript에서 스마트 계약 호출하기](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI 토큰을 사용하여 JavaScript로 계약 함수를 호출하는 방법을 알아보세요._
- [web3와 Alchemy를 사용하여 트랜잭션 보내기](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– 백엔드에서 트랜잭션을 보내는 단계별 안내입니다._
