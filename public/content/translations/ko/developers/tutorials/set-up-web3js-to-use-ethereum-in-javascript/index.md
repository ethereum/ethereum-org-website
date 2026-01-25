---
title: "자바스크립트에서 이더리움 블록체인을 사용하기 위한 web3.js 설정하기"
description: "자바스크립트 애플리케이션에서 이더리움 블록체인과 상호작용하기 위해 web3.js 라이브러리를 설정하고 구성하는 방법을 알아보세요."
author: "jdourlens"
tags: [ "web3.js", "자바스크립트" ]
skill: beginner
lang: ko
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이 튜토리얼에서는 이더리움 블록체인과 상호작용하기 위해 [web3.js](https://web3js.readthedocs.io/)를 시작하는 방법을 알아봅니다. Web3.js는 프론트엔드와 백엔드 모두에서 블록체인의 데이터를 읽거나, 트랜잭션을 만들거나, 스마트 계약을 배포하는 데 사용할 수 있습니다.

첫 번째 단계는 프로젝트에 web3.js를 포함하는 것입니다. 웹페이지에서 사용하려면 JSDeliver와 같은 CDN을 사용하여 라이브러리를 직접 가져올 수 있습니다.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

백엔드 또는 빌드 시스템을 사용하는 프론트엔드 프로젝트에서 사용하기 위해 라이브러리를 설치하려는 경우, npm으로 설치할 수 있습니다:

```bash
npm install web3 --save
```

그 다음, Web3.js를 Node.js 스크립트나 Browserify 프론트엔드 프로젝트로 가져오려면 다음 자바스크립트 코드를 사용할 수 있습니다:

```js
const Web3 = require("web3")
```

이제 프로젝트에 라이브러리를 포함했으니 초기화해야 합니다. 프로젝트가 블록체인과 통신할 수 있어야 합니다. 대부분의 이더리움 라이브러리는 RPC 호출을 통해 [노드](/developers/docs/nodes-and-clients/)와 통신합니다. Web3 공급자를 초기화하려면 공급자의 URL을 생성자에 전달하여 Web3 인스턴스를 생성합니다. 컴퓨터에서 실행 중인 노드나 [ganache 인스턴스](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)가 있다면 코드는 다음과 같을 것입니다.

```js
const web3 = new Web3("http://localhost:8545")
```

호스팅된 노드에 직접 액세스하려면 [서비스형 노드](/developers/docs/nodes-and-clients/nodes-as-a-service)에서 옵션을 찾을 수 있습니다.

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3 인스턴스가 올바르게 구성되었는지 테스트하기 위해 `getBlockNumber` 함수를 사용하여 최신 블록 번호를 가져오겠습니다. 이 함수는 콜백을 매개변수로 받아 블록 번호를 정수로 반환합니다.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

이 프로그램을 실행하면 블록체인의 맨 위인 최신 블록 번호가 출력됩니다. 코드에서 콜백 중첩을 피하기 위해 `await/async` 함수 호출을 사용할 수도 있습니다.

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

[web3.js 공식 문서](https://docs.web3js.org/)에서 Web3 인스턴스에 사용 가능한 모든 함수를 확인할 수 있습니다.

대부분의 Web3 라이브러리는 비동기식입니다. 이는 라이브러리가 백그라운드에서 노드에 JSON-RPC 호출을 하고, 노드가 그 결과를 다시 보내주기 때문입니다.

<Divider />

브라우저에서 작업하는 경우 일부 지갑은 Web3 인스턴스를 직접 주입하며, 특히 사용자의 이더리움 주소와 상호 작용하여 트랜잭션을 생성하려는 경우 가능하면 항상 이 인스턴스를 사용하는 것이 좋습니다.

다음은 MetaMask 지갑을 사용할 수 있는지 감지하고, 가능한 경우 활성화를 시도하는 코드 스니펫입니다. 이를 통해 나중에 사용자의 잔액을 읽고 이더리움 블록체인에서 사용자가 트랜잭션을 검증하도록 할 수 있습니다:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 필요한 경우 계정 접근 요청
    await window.ethereum.enable()
    // 이제 계정이 노출됨
  } catch (error) {
    // 사용자가 계정 접근을 거부함...
  }
}
```

[Ethers.js](https://docs.ethers.io/)와 같은 web3.js의 대안도 존재하며 일반적으로 사용됩니다. 다음 튜토리얼에서는 [블록체인에서 새로 들어오는 블록을 쉽게 수신하고 그 내용을 확인하는 방법](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)을 알아볼 것입니다.
