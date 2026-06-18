---
title: JavaScript에서 이더리움 블록체인을 사용하기 위한 Web3.js 설정
description: JavaScript 애플리케이션에서 이더리움 블록체인과 상호작용하기 위해 Web3.js 라이브러리를 설정하고 구성하는 방법을 배워보세요.
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
breadcrumb: Web3.js 설정
lang: ko
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이 튜토리얼에서는 이더리움 블록체인과 상호작용하기 위해 [Web3.js](https://web3js.readthedocs.io/)를 시작하는 방법을 알아보겠습니다. Web3.js는 프론트엔드와 백엔드 모두에서 블록체인의 데이터를 읽거나 트랜잭션을 생성하고, 스마트 컨트랙트를 배포하는 데 사용할 수 있습니다.

첫 번째 단계는 프로젝트에 Web3.js를 포함하는 것입니다. 웹 페이지에서 사용하려면 JSDeliver와 같은 CDN을 사용하여 라이브러리를 직접 가져올 수 있습니다.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

백엔드나 빌드를 사용하는 프론트엔드 프로젝트에서 사용하기 위해 라이브러리를 설치하는 것을 선호한다면, npm을 사용하여 설치할 수 있습니다:

```bash
npm install web3 --save
```

그런 다음 Node.js 스크립트나 Browserify 프론트엔드 프로젝트로 Web3.js를 가져오려면, 다음 JavaScript 코드를 사용할 수 있습니다:

```js
const Web3 = require("web3")
```

이제 프로젝트에 라이브러리를 포함했으므로 이를 초기화해야 합니다. 프로젝트는 블록체인과 통신할 수 있어야 합니다. 대부분의 이더리움 라이브러리는 RPC 호출을 통해 [노드](/developers/docs/nodes-and-clients/)와 통신합니다. Web3 프로바이더(provider)를 시작하기 위해, 프로바이더의 URL을 생성자로 전달하여 Web3 인스턴스를 생성할 것입니다. 컴퓨터에서 노드나 [Ganache 인스턴스를 실행 중](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)이라면 다음과 같이 작성합니다:

```js
const web3 = new Web3("http://localhost:8545")
```

호스팅된 노드에 직접 접근하고 싶다면 [서비스형 노드(nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service)에서 옵션을 찾을 수 있습니다.

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3 인스턴스를 올바르게 구성했는지 테스트하기 위해, `getBlockNumber` 함수를 사용하여 최신 블록 번호를 가져와 보겠습니다. 이 함수는 콜백을 매개변수로 받아 블록 번호를 정수로 반환합니다.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

이 프로그램을 실행하면 블록체인의 최상단인 최신 블록 번호가 간단히 출력됩니다. 코드에서 콜백이 중첩되는 것을 피하기 위해 `await/async` 함수 호출을 사용할 수도 있습니다:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3 인스턴스에서 사용할 수 있는 모든 함수는 [공식 Web3.js 문서](https://docs.web3js.org/)에서 확인할 수 있습니다.

대부분의 Web3 라이브러리는 비동기식입니다. 백그라운드에서 라이브러리가 노드에 JSON-RPC 호출을 보내고, 노드가 그 결과를 다시 보내주기 때문입니다.

<Divider />

브라우저에서 작업하는 경우, 일부 지갑은 Web3 인스턴스를 직접 주입(inject)합니다. 특히 트랜잭션을 생성하기 위해 사용자의 이더리움 주소와 상호작용할 계획이라면 가능한 한 이를 사용해야 합니다.

다음은 메타마스크 지갑을 사용할 수 있는지 감지하고, 사용 가능하다면 활성화를 시도하는 코드 스니펫입니다. 이를 통해 나중에 사용자의 잔액을 읽을 수 있으며, 이더리움 블록체인에서 실행하고자 하는 트랜잭션을 사용자가 검증하도록 할 수 있습니다:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 필요한 경우 계정 접근 권한 요청
    await window.ethereum.enable()
    // 이제 계정이 노출됨
  } catch (error) {
    // 사용자가 계정 접근을 거부함...
  }
}
```

Web3.js의 대안으로 [Ethers.js](https://docs.ethers.io/)와 같은 라이브러리도 존재하며 널리 사용됩니다. 다음 튜토리얼에서는 [블록체인에 새로 들어오는 블록을 쉽게 수신하고 그 내용을 확인하는 방법](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)을 알아보겠습니다.