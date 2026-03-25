---
title: "이더리움 개발 시작하기"
description: "이더리움 개발을 시작하는 입문자를 위한 가이드입니다. API 엔드포인트를 구동하는 것부터 명령줄 요청을 보내고, 첫 웹3 스크립트를 작성하는 것까지 안내해 드립니다! 사전 블록체인 개발 경험은 필요 없어요!"
author: "Elan Halpern"
tags: [ "JavaScript", "ethers.js", "노드", "요청", "Alchemy" ]
skill: beginner
breadcrumb: "시작 가이드"
lang: ko
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![이더리움과 Alchemy 로고](./ethereum-alchemy.png)

이더리움 개발을 시작하는 입문자를 위한 가이드입니다. 이번 튜토리얼에서는 Maker, 0x, MyEtherWallet, Dharma, Kyber를 비롯한 상위 블록체인 앱 70%가 사용하는 수백만 명의 사용자를 지원하는 선도적인 블록체인 개발자 플랫폼인 [Alchemy](https://alchemyapi.io/)를 사용합니다. Alchemy는 이더리움 체인의 API 엔드포인트에 대한 액세스를 제공하여 트랜잭션을 읽고 쓸 수 있도록 합니다.

Alchemy에 가입하는 것부터 첫 웹3 스크립트를 작성하는 것까지 안내해 드립니다! 사전 블록체인 개발 경험은 필요 없어요!

## 1. 무료 Alchemy 계정 가입하기 {#sign-up-for-a-free-alchemy-account}

Alchemy 계정 생성은 간단합니다. [여기에서 무료로 가입하세요](https://auth.alchemy.com/).

## 2. Alchemy 앱 만들기 {#create-an-alchemy-app}

이더리움 체인과 통신하고 Alchemy 제품을 사용하려면 요청을 인증할 API 키가 필요합니다.

[대시보드에서 API 키를 생성](https://dashboard.alchemy.com/)할 수 있습니다. 새 키를 생성하려면 아래와 같이 “앱 만들기” 로 이동합니다.

[_ShapeShift_](https://shapeshift.com/)가 _대시보드를 보여주도록 허락해준 것에 대해 특별히 감사드립니다!_

![Alchemy 대시보드](./alchemy-dashboard.png)

“앱 만들기” 밑의 입력란을 채워 새 키를 얻으세요. 여기에서 이전에 만들었던 앱을 보거나 팀에서 만든 앱을 볼 수 있습니다. 아무 앱에서나 '키 보기'를 클릭하여 기존 키를 가져올 수 있습니다.

![Alchemy로 앱 만들기 스크린샷](./create-app.png)

'앱' 위에 마우스를 올리고 하나를 선택하여 기존 API 키를 가져올 수도 있습니다. 여기에서 '키 보기'를 하거나, '앱 편집'에서 특정 도메인을 화이트리스트에 추가하고, 여러 개발자 도구를 확인하며, 분석을 볼 수 있습니다.

![사용자에게 API 키를 가져오는 방법을 보여주는 Gif](./pull-api-keys.gif)

## 3. 명령줄에서 요청하기 {#make-a-request-from-the-command-line}

JSON-RPC와 curl을 사용하여 Alchemy를 통해 이더리움 블록체인과 상호작용합니다.

수동 요청의 경우 `POST` 요청을 통해 `JSON-RPC`와 상호작용하는 것을 권장합니다. 다음 필드와 함께 `Content-Type: application/json` 헤더와 쿼리를 `POST` 본문으로 전달하기만 하면 됩니다:

- `jsonrpc`: JSON-RPC 버전—현재는 `2.0`만 지원됩니다.
- `method`: ETH API 메서드. [API 참조 보기](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: 메서드에 전달할 파라미터 목록입니다.
- `id`: 요청의 ID입니다. 응답에 의해 반환되므로 어떤 요청에 대한 응답인지 추적할 수 있습니다.

다음은 명령줄에서 실행하여 현재 가스 가격을 검색하는 예제입니다:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**참고:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo)를 본인의 API 키 `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`로 바꾸세요._

**결과:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. 웹3 클라이언트 설정하기 {#set-up-your-web3-client}

**기존 클라이언트가 있는 경우,** 현재 노드 공급자 URL을 API 키가 포함된 Alchemy URL로 변경하세요: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_참고:_** 아래 스크립트는 명령줄에서 실행하는 것이 아니라 <strong>노드 컨텍스트</strong>에서 실행하거나 <strong>파일에 저장</strong>해야 합니다. Node나 npm이 아직 설치되지 않았다면, 이 빠른 [mac용 설정 가이드](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)를 확인하세요.

Alchemy와 통합할 수 있는 [웹3 라이브러리](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)는 많지만, web3.js를 바로 대체할 수 있으며 Alchemy와 원활하게 작동하도록 빌드 및 구성된 [Alchemy 웹3](https://docs.alchemy.com/reference/api-overview) 사용을 권장합니다. 이는 자동 재시도 및 강력한 WebSocket 지원과 같은 여러 이점을 제공합니다.

AlchemyWeb3.js를 설치하려면 <strong>프로젝트 디렉터리로 이동</strong>하고 다음을 실행하세요:

**Yarn 사용 시:**

```
yarn add @alch/alchemy-web3
```

**NPM 사용 시:**

```
npm install @alch/alchemy-web3
```

Alchemy의 노드 인프라와 상호작용하려면 NodeJS에서 실행하거나 이 코드를 JavaScript 파일에 추가하세요:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 첫 웹3 스크립트 작성하기! {#write-your-first-web3-script}

이제 웹3 프로그래밍을 본격적으로 시작해보기 위해 이더리움 메인넷에서 최신 블록 번호를 출력하는 간단한 스크립트를 작성해 보겠습니다.

**1.** 아직 하지 않았다면, 터미널에서 새 프로젝트 디렉터리를 만들고 그 안으로 이동(cd)하세요:\*\*

```
mkdir web3-example
cd web3-example
```

**2.** 아직 설치하지 않았다면 프로젝트에 Alchemy 웹3(또는 다른 웹3) 의존성을 설치하세요:\*\*

```
npm install @alch/alchemy-web3
```

**3.** `index.js`라는 이름의 파일을 만들고 다음 내용을 추가하세요:\*\*

> `demo`는 본인의 Alchemy HTTP API 키로 교체해야 합니다.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("최신 블록 번호는 " + blockNumber)
}
main()
```

비동기와 관련된 것들이 낯선가요? 이 [Medium 게시물](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)을 확인해보세요.

**4. node를 사용하여 터미널에서 실행하세요**

```
node index.js
```

**5. 이제 콘솔에 최신 블록 번호 출력이 표시될 것입니다!**

```
최신 블록 번호는 11043912
```

**수고하셨어요!** 축하해요! Alchemy를 사용하여 첫 번째 웹3 스크립트를 작성했습니다 🎉\*\*

다음으로 해야 될 걸 모르겠나요? [Hello World 스마트 계약 가이드](https://www.alchemy.com/docs/hello-world-smart-contract)에서 첫 스마트 계약을 배포하고 솔리디티 프로그래밍을 직접 해보거나, [대시보드 데모 앱](https://docs.alchemyapi.io/tutorials/demo-app)으로 대시보드 지식을 테스트해보세요!

_[무료로 Alchemy에 가입](https://auth.alchemy.com/)하고, [개발문서](https://www.alchemy.com/docs/)를 확인하고, 최신 소식을 보려면 [Twitter](https://twitter.com/AlchemyPlatform)에서 저희를 팔로우하세요_.
