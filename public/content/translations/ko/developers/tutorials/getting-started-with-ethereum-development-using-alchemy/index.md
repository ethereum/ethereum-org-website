---
title: 이더리움 개발 시작하기
description: "이더리움 개발을 시작하기 위한 초보자용 가이드입니다. API 엔드포인트 생성부터 명령줄 요청, 첫 Web3 스크립트 작성까지 안내해 드립니다! 블록체인 개발 경험이 없어도 괜찮습니다!"
author: "엘란 할펀"
tags: ["javascript", "ethers.js", "노드", "쿼리", "alchemy"]
skill: beginner
breadcrumb: 시작하기
lang: ko
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

이 문서는 이더리움 개발을 시작하기 위한 초보자용 가이드입니다. 이 튜토리얼에서는 Maker, 0x, MyEtherWallet, Dharma, Kyber를 포함한 상위 블록체인 앱의 70%에서 수백만 명의 사용자에게 서비스를 제공하는 선도적인 블록체인 개발자 플랫폼인 [Alchemy](https://alchemyapi.io/)를 사용할 것입니다. Alchemy는 트랜잭션을 읽고 쓸 수 있도록 이더리움 체인의 API 엔드포인트에 대한 접근 권한을 제공합니다.

Alchemy 가입부터 첫 Web3 스크립트 작성까지 안내해 드립니다! 블록체인 개발 경험이 없어도 괜찮습니다!

## 1. 무료 Alchemy 계정 가입하기 {#sign-up-for-a-free-alchemy-account}

Alchemy 계정 생성은 간단합니다. [여기에서 무료로 가입하세요](https://auth.alchemy.com/).

## 2. Alchemy 앱 생성하기 {#create-an-alchemy-app}

이더리움 체인과 통신하고 Alchemy의 제품을 사용하려면 요청을 인증할 API 키가 필요합니다.

[대시보드에서 API 키를 생성](https://dashboard.alchemy.com/)할 수 있습니다. 새 키를 만들려면 아래와 같이 “Create App(앱 생성)”으로 이동하세요.

대시보드를 보여줄 수 있게 허락해 준 [_ShapeShift_](https://shapeshift.com/)_에 특별히 감사드립니다!_

![Alchemy dashboard](./alchemy-dashboard.png)

“Create App” 아래에 세부 정보를 입력하여 새 키를 받으세요. 이전에 만든 앱과 팀에서 만든 앱도 여기에서 볼 수 있습니다. 앱의 “View Key(키 보기)”를 클릭하여 기존 키를 가져올 수 있습니다.

![Create app with Alchemy screenshot](./create-app.png)

“Apps(앱)” 위에 마우스를 올리고 하나를 선택하여 기존 API 키를 가져올 수도 있습니다. 여기에서 “View Key”를 할 수 있을 뿐만 아니라, “Edit App(앱 편집)”을 통해 특정 도메인을 화이트리스트에 추가하고, 여러 개발자 도구를 확인하며, 분석 데이터를 볼 수 있습니다.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. 명령줄에서 요청하기 {#make-a-request-from-the-command-line}

JSON-RPC와 curl을 사용하여 Alchemy를 통해 이더리움 블록체인과 상호작용합니다.

수동 요청의 경우, `POST` 요청을 통해 `JSON-RPC`와 상호작용하는 것을 권장합니다. `Content-Type: application/json` 헤더를 전달하고, 다음 필드를 포함하여 쿼리를 `POST` 본문으로 전달하기만 하면 됩니다.

- `jsonrpc`: JSON-RPC 버전입니다. 현재는 `2.0`만 지원됩니다.
- `method`: ETH API 메서드입니다. [API 참조를 확인하세요.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: 메서드에 전달할 매개변수 목록입니다.
- `id`: 요청의 ID입니다. 응답이 어떤 요청에 속하는지 추적할 수 있도록 응답에 의해 반환됩니다.

다음은 현재 가스 가격을 검색하기 위해 명령줄에서 실행할 수 있는 예제입니다.

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**참고:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo)를 자신의 API 키 `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`로 교체하세요._

**결과:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Web3 클라이언트 설정하기 {#set-up-your-web3-client}

**기존 클라이언트가 있는 경우,** 현재 노드 공급자 URL을 API 키가 포함된 Alchemy URL로 변경하세요: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_참고:_** 아래 스크립트는 명령줄에서 실행하는 것이 아니라 **노드 컨텍스트**에서 실행하거나 **파일에 저장**해야 합니다. Node나 npm이 아직 설치되어 있지 않다면, 이 간단한 [Mac용 설정 가이드](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)를 확인하세요.

Alchemy와 통합할 수 있는 수많은 [Web3 라이브러리](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)가 있지만, Alchemy와 원활하게 작동하도록 구축 및 구성된 Web3.js의 드롭인(drop-in) 대체품인 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)를 사용하는 것을 권장합니다. 이는 자동 재시도 및 강력한 WebSocket 지원과 같은 여러 가지 이점을 제공합니다.

AlchemyWeb3.js를 설치하려면 **프로젝트 디렉터리로 이동**하여 다음을 실행하세요.

**Yarn 사용 시:**

```
yarn add @alch/alchemy-web3
```

**NPM 사용 시:**

```
npm install @alch/alchemy-web3
```

Alchemy의 노드 인프라와 상호작용하려면 NodeJS에서 실행하거나 JavaScript 파일에 다음을 추가하세요.

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 첫 Web3 스크립트 작성하기! {#write-your-first-web3-script}

이제 본격적인 Web3 프로그래밍을 위해 이더리움 메인넷에서 최신 블록 번호를 출력하는 간단한 스크립트를 작성해 보겠습니다.

**1. 아직 하지 않았다면, 터미널에서 새 프로젝트 디렉터리를 만들고 해당 디렉터리로 이동(cd)합니다:**

```
mkdir web3-example
cd web3-example
```

**2. 아직 설치하지 않았다면, 프로젝트에 Alchemy Web3(또는 다른 Web3) 종속성을 설치합니다:**

```
npm install @alch/alchemy-web3
```

**3. `index.js`라는 이름의 파일을 만들고 다음 내용을 추가합니다:**

> 최종적으로 `demo`를 자신의 Alchemy HTTP API 키로 교체해야 합니다.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

비동기(async) 처리가 익숙하지 않으신가요? 이 [Medium 게시물](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)을 확인해 보세요.

**4. 터미널에서 node를 사용하여 실행합니다**

```
node index.js
```

**5. 이제 콘솔에 최신 블록 번호가 출력되는 것을 볼 수 있습니다!**

```
The latest block number is 11043912
```

**와우! 축하합니다! Alchemy를 사용하여 첫 Web3 스크립트를 작성하셨습니다 🎉**

다음에 무엇을 해야 할지 모르시겠나요? [Hello World 스마트 컨트랙트 가이드](https://www.alchemy.com/docs/hello-world-smart-contract)에서 첫 스마트 컨트랙트를 배포하고 Solidity 프로그래밍을 직접 경험해 보거나, [대시보드 데모 앱](https://docs.alchemyapi.io/tutorials/demo-app)으로 대시보드 지식을 테스트해 보세요!

_[Alchemy에 무료로 가입](https://auth.alchemy.com/)하고, [문서](https://www.alchemy.com/docs/)를 확인하며, 최신 소식을 보려면 [Twitter](https://twitter.com/AlchemyPlatform)를 팔로우하세요._