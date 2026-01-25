---
title: 초보자용 Hello World 스마트 컨트랙트
description: 이더리움에 간단한 스마트 계약을 작성하고 배포하는 방법에 대한 입문 튜토리얼입니다.
author: "elanh"
tags: [ "솔리디티", "hardhat", "alchemy", "스마트 계약", "배포하기" ]
skill: beginner
lang: ko
published: 2021-03-31
---

블록체인 개발이 처음이라 어디서부터 시작해야 할지 모르거나, 스마트 계약을 배포하고 상호작용하는 방법을 이해하고 싶다면 이 가이드가 도움이 될 것입니다. 가상 지갑 [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) 및 [Alchemy](https://www.alchemy.com/eth)를 사용하여 Sepolia 테스트 네트워크에 간단한 스마트 계약을 만들고 배포하는 과정을 안내합니다(아직 이 내용이 무엇을 의미하는지 이해하지 못하더라도 걱정하지 마세요. 앞으로 설명해 드릴 것입니다).

이 튜토리얼의 [2부](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)에서는 스마트 계약이 배포된 후 상호작용하는 방법을 살펴보고, [3부](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)에서는 Etherscan에 게시하는 방법을 다룹니다.

궁금한 점이 있으면 언제든지 [Alchemy Discord](https://discord.gg/gWuC7zB)에 문의하세요!

## 1단계: 이더리움 네트워크에 연결하기 {#step-1}

이더리움 체인에 요청을 보내는 방법은 여러 가지가 있습니다. 간단하게 설명하기 위해, 자체 노드를 실행하지 않고도 이더리움 체인과 통신할 수 있는 블록체인 개발자 플랫폼 및 API인 Alchemy의 무료 계정을 사용하겠습니다. 이 플랫폼에는 모니터링 및 분석을 위한 개발자 도구도 있습니다. 이 튜토리얼에서는 이 도구를 활용하여 스마트 계약 배포 시 내부적으로 어떤 일이 일어나는지 이해해 보겠습니다. Alchemy 계정이 아직 없다면 [여기서 무료로 가입할 수 있습니다](https://dashboard.alchemy.com/signup).

## 2단계: 앱 만들기(및 API 키) {#step-2}

Alchemy 계정을 생성한 후에는 앱을 생성하여 API 키를 생성할 수 있습니다. 이를 통해 Sepolia 테스트넷에 요청을 보낼 수 있습니다. 테스트넷에 익숙하지 않다면 [이 페이지](/developers/docs/networks/)를 확인하세요.

1. Alchemy 대시보드에서 탐색 모음의 "Select an app"을 선택하고 "Create new app"을 클릭하여 "Create new app" 페이지로 이동하세요.

![Hello world create app](./hello-world-create-app.png)

2. 앱 이름을 “Hello World”로 지정하고, 간단한 설명을 제공한 다음, 사용 사례(예: "Infra & Tooling")를 선택하세요. 다음으로 "Ethereum"을 검색하고 네트워크를 선택하세요.

![create app view hello world](./create-app-view-hello-world.png)

3. "Next"를 클릭하여 진행한 다음, “Create app”을 클릭하면 완료됩니다! 앱이 탐색 모음 드롭다운 메뉴에 나타나며, API 키를 복사할 수 있습니다.

## 3단계: 이더리움 계정(주소) 생성하기 {#step-3}

거래를 보내고 받기 위해서는 이더리움 계정이 필요합니다. 이 튜토리얼에서는 이더리움 계정 주소를 관리하는 데 사용되는 브라우저의 가상 지갑인 MetaMask를 사용합니다. [트랜잭션](/developers/docs/transactions/)에 대해 자세히 알아보기.

[여기](https://metamask.io/download)에서 MetaMask를 다운로드하고 이더리움 계정을 무료로 만들 수 있습니다. 계정을 만들 때나 이미 계정이 있는 경우, 네트워크 드롭다운 메뉴를 사용하여 "Sepolia" 테스트 네트워크로 전환해야 합니다(실제 돈을 다루지 않도록 하기 위함입니다).

Sepolia가 목록에 표시되지 않으면 메뉴로 이동한 다음 '고급'으로 가서 아래로 스크롤하여 "테스트 네트워크 표시"를 켜세요. 네트워크 선택 메뉴에서 "사용자 지정" 탭을 선택하여 테스트넷 목록을 찾고 "Sepolia"를 선택하세요.

![metamask sepolia example](./metamask-sepolia-example.png)

## 4단계: 파우셋에서 이더 추가하기 {#step-4}

스마트 계약을 테스트넷에 배포하려면 가짜 Eth가 필요합니다. Sepolia ETH를 얻으려면 [Sepolia 네트워크 세부 정보](/developers/docs/networks/#sepolia)로 이동하여 다양한 파우셋 목록을 볼 수 있습니다. 하나가 작동하지 않으면 다른 것을 시도해 보세요. 때때로 고갈될 수 있습니다. 네트워크 트래픽으로 인해 가짜 ETH를 받는 데 시간이 걸릴 수 있습니다. 곧 MetaMask 계정에서 ETH를 확인할 수 있습니다!

## 5단계: 잔액 확인하기 {#step-5}

잔액이 있는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)를 사용하여 [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) 요청을 해보겠습니다. 이것은 지갑에 있는 ETH의 양을 반환할 것입니다. MetaMask 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답이 표시됩니다.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **참고:** 이 결과는 ETH가 아닌 wei 단위입니다. Wei는 ether의 최소 단위로 사용됩니다. wei를 ETH로 변환하면 다음과 같습니다: 1 eth = 10<sup>18</sup> wei. 따라서 0x2B5E3AF16B1880000을 10진수로 변환하면 5\*10¹⁸이 되며 이는 5 ETH와 같습니다.
>
> 휴! 가짜 돈이 모두 준비되었습니다 <Emoji text=":money_mouth_face:" size={1} />.

## 6단계: 프로젝트 초기화하기 {#step-6}

먼저 프로젝트를 위한 폴더를 만들어야 합니다. 커맨드 라인으로 이동하여 다음을 입력합니다.

```
mkdir hello-world
cd hello-world
```

이제 프로젝트 폴더 안으로 들어왔으니, `npm init`을 사용하여 프로젝트를 초기화하겠습니다. npm이 아직 설치되어 있지 않다면 [이 지침](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)을 따르세요(Node.js도 필요하니 함께 다운로드하세요!).

```
npm init
```

설치 질문에 어떻게 답하든 크게 상관없습니다. 참고용으로 저희가 진행한 방식은 다음과 같습니다:

```
package name: (hello-world)
version: (1.0.0)
description: hello world 스마트 계약
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
/Users/.../.../.../hello-world/package.json에 쓸 내용:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world 스마트 계약",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json을 승인하면 준비 완료입니다!

## 7단계: [Hardhat](https://hardhat.org/getting-started/#overview) 다운로드하기 {#step-7}

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버그하기 위한 개발 환경입니다. 실제 블록체인에 배포하기 전에 로컬에서 스마트 컨트랙트 및 dApp을 구축할 때 사용됩니다.

`hello-world` 프로젝트 내부에서 다음을 실행하세요:

```
npm install --save-dev hardhat
```

설치 지침에 대한 자세한 내용은 [이 페이지](https://hardhat.org/getting-started/#overview)를 확인하세요.

## 8단계: Hardhat 프로젝트 생성하기 {#step-8}

프로젝트 폴더 내에서 다음을 실행합니다.

```
npx hardhat
```

그러면 환영 메시지와 원하는 작업을 선택할 수 있는 옵션이 표시됩니다. "create an empty hardhat.config.js"를 선택합니다.

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.11에 오신 것을 환영합니다 👷‍?

무엇을 하시겠습니까? …
샘플 프로젝트 생성
❯ 빈 hardhat.config.js 생성
종료
```

이렇게 하면 `hardhat.config.js` 파일이 생성되며, 여기에 프로젝트에 대한 모든 설정을 지정하게 됩니다(13단계).

## 9단계: 프로젝트 폴더 추가하기 {#step-9}

프로젝트를 체계적으로 관리하기 위해 두 개의 새 폴더를 만들겠습니다. 명령줄에서 프로젝트의 루트 디렉터리로 이동하고 다음을 입력합니다.

```
mkdir contracts
mkdir scripts
```

- `contracts/`는 hello world 스마트 계약 코드 파일을 보관할 곳입니다.
- `scripts/`는 계약을 배포하고 상호작용하기 위한 스크립트를 보관할 곳입니다.

## 10단계: 스마트 컨트랙트 작성하기 {#step-10}

도대체 언제 코드를 작성하는 거지? 라고 자문하고 있을지도 모릅니다. 자, 이제 10단계입니다.

선호하는 편집기(저희는 [VSCode](https://code.visualstudio.com/)를 좋아합니다)에서 hello-world 프로젝트를 여세요. 스마트 계약은 Solidity라는 언어로 작성되며, HelloWorld.sol 스마트 계약을 작성하는 데 이 언어를 사용할 것입니다.‌

1. “contracts” 폴더로 이동하여 HelloWorld.sol이라는 새 파일을 만드세요.
2. 아래는 이 튜토리얼에서 사용할 이더리움 재단의 샘플 Hello World 스마트 계약입니다. 아래 내용을 복사하여 HelloWorld.sol 파일에 붙여넣고, 주석을 읽고 이 계약이 어떤 역할을 하는지 이해하세요:

```solidity
// 시맨틱 버저닝을 사용하여 Solidity 버전을 지정합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld`라는 이름의 계약을 정의합니다.
// 계약은 함수와 데이터(상태)의 모음입니다. 배포되면 계약은 이더리움 블록체인의 특정 주소에 상주하게 됩니다. 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` 타입의 상태 변수 `message`를 선언합니다.
   // 상태 변수는 그 값이 계약 저장소에 영구적으로 저장되는 변수입니다. `public` 키워드는 변수를 계약 외부에서 접근할 수 있게 만들고, 다른 계약이나 클라이언트가 값을 접근하기 위해 호출할 수 있는 함수를 생성합니다.
   string public message;

   // 많은 클래스 기반 객체 지향 언어와 유사하게, 생성자는 계약 생성 시에만 실행되는 특별한 함수입니다.
   // 생성자는 계약의 데이터를 초기화하는 데 사용됩니다. 자세히 알아보기:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 문자열 인수 `initMessage`를 받아 계약의 `message` 저장 변수에 값을 설정합니다.
      message = initMessage;
   }

   // 문자열 인수를 받아 `message` 저장 변수를 업데이트하는 public 함수입니다.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

이것은 생성 시 메시지를 저장하고 `update` 함수를 호출하여 업데이트할 수 있는 매우 간단한 스마트 계약입니다.

## 11단계: MetaMask와 Alchemy를 프로젝트에 연결하기 {#step-11}

MetaMask 지갑, Alchemy 계정을 만들고 스마트 계약을 작성했습니다. 이제 이 세 가지를 연결할 차례입니다.

디지털 지갑에서 전송되는 모든 거래에는 고유한 개인 키를 사용하는 서명이 필요합니다. 프로그램에 이 권한을 제공하기 위해 개인 키(및 Alchemy API 키) 를 환경 파일에 안전하게 저장할 수 있습니다.

> 트랜잭션 전송에 대해 더 자세히 알아보려면 web3를 사용하여 트랜잭션을 전송하는 [이 튜토리얼](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)을 확인하세요.

먼저 프로젝트 디렉터리에 dotenv 패키지를 설치합니다.

```
npm install dotenv --save
```

그런 다음 프로젝트의 루트 디렉터리에 `.env` 파일을 만들고 여기에 MetaMask 개인 키와 HTTP Alchemy API URL을 추가합니다.

- 개인 키를 내보내려면 [이 지침](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)을 따르세요.
- HTTP Alchemy API URL을 얻으려면 아래를 참조하세요.

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL 복사하세요.

`.env` 파일은 다음과 같아야 합니다:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

이를 실제로 코드에 연결하기 위해 13단계의 `hardhat.config.js` 파일에서 이러한 변수를 참조합니다.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>를 커밋하지 마세요! <code>.env</code> 파일을 다른 사람과 공유하거나 노출하지 마세요. 그렇게 하면 민감한 정보가 노출될 수 있습니다. 버전 관리 시스템을 사용하는 경우 <code>.env</code>를 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 파일에 추가하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 12단계: Ethers.js 설치하기 {#step-12-install-ethersjs}

Ethers.js는 [표준 JSON-RPC 메서드](/developers/docs/apis/json-rpc/)를 더 사용자 친화적인 메서드로 래핑하여 이더리움과 더 쉽게 상호 작용하고 요청할 수 있게 해주는 라이브러리입니다.

Hardhat을 사용하면 추가 도구 및 확장된 기능을 위해 [플러그인](https://hardhat.org/plugins/)을 매우 쉽게 통합할 수 있습니다. 계약 배포를 위해 [Ethers 플러그인](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)을 활용할 것입니다([Ethers.js](https://github.com/ethers-io/ethers.js/)는 매우 깔끔한 계약 배포 방법을 제공합니다).

프로젝트 디렉토리에 다음을 입력합니다.

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

다음 단계에서 `hardhat.config.js`에 ethers를 추가해야 합니다.

## 13단계: hardhat.config.js 업데이트하기 {#step-13-update-hardhatconfigjs}

지금까지 여러 종속성과 플러그인을 추가했습니다. 이제 프로젝트가 이 모든 것을 인식할 수 있도록 `hardhat.config.js`를 업데이트해야 합니다.

`hardhat.config.js`를 다음과 같이 업데이트하세요:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## 14단계: 계약 컴파일하기 {#step-14-compile-our-contracts}

지금까지 모든 것이 제대로 작동하는지 확인하기 위해 스마트 컨트랙트를 컴파일해 보겠습니다. `compile` 작업은 hardhat에 내장된 작업 중 하나입니다.

명령줄에서 다음을 실행합니다.

```
npx hardhat compile
```

`SPDX license identifier not provided in source file`에 대한 경고가 표시될 수 있지만, 걱정할 필요는 없습니다. 나머지는 모두 정상일 것입니다! 그렇지 않은 경우 언제든지 [Alchemy discord](https://discord.gg/u72VCg3)로 메시지를 보내주세요.

## 15단계: 배포 스크립트 작성하기 {#step-15-write-our-deploy-scripts}

이제 스마트 컨트랙트가 작성되고 설정 파일을 사용할 수 있으므로 스마트 컨트랙트 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 만들고 다음 내용을 추가하세요.

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // 배포를 시작하고, 계약 객체로 확인되는 프로미스를 반환합니다.
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat은 [계약 튜토리얼](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)에서 각 코드 라인이 무엇을 하는지 훌륭하게 설명하고 있으며, 저희는 그 설명을 여기에 채택했습니다.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js의 `ContractFactory`는 새 스마트 계약을 배포하는 데 사용되는 추상화이므로, 여기서 `HelloWorld`는 우리의 hello world 계약 인스턴스를 위한 팩토리입니다. `hardhat-ethers` 플러그인을 사용할 때 `ContractFactory` 및 `Contract` 인스턴스는 기본적으로 첫 번째 서명자에 연결됩니다.

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory`에서 `deploy()`를 호출하면 배포가 시작되고, `Contract`로 해석되는 `Promise`가 반환됩니다. 이것은 각 스마트 컨트랙트 기능에 대한 메소드가 있는 개체입니다.

## 16단계: 계약 배포하기 {#step-16-deploy-our-contract}

마침내 스마트 컨트랙트를 배포할 준비가 되었습니다! 명령줄로 이동하여 다음을 실행하세요:

```
npx hardhat run scripts/deploy.js --network sepolia
```

그러면 다음과 같은 내용이 표시됩니다.

```
계약이 배포된 주소: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Sepolia etherscan](https://sepolia.etherscan.io/)으로 이동하여 계약 주소를 검색하면 성공적으로 배포되었음을 확인할 수 있습니다. 트랜잭션은 다음과 같습니다.

![etherscan contract](./etherscan-contract.png)

`From` 주소는 MetaMask 계정 주소와 일치해야 하며 `To` 주소는 "Contract Creation"이라고 표시됩니다. 하지만 트랜잭션을 클릭하면 `To` 필드에 우리의 계약 주소가 표시됩니다:

![etherscan transaction](./etherscan-transaction.png)

축하해요! 이더리움 체인에 스마트 계약을 성공적으로 배포했습니다 🎉

내부에서 무슨 일이 일어나고 있는지 이해하기 위해 [Alchemy 대시보드](https://dashboard.alchemyapi.io/explorer)의 Explorer 탭으로 이동해 보겠습니다. Alchemy 앱이 여러 개 있는 경우, 앱별로 필터링하고 “Hello World”를 선택하세요.
![hello world explorer](./hello-world-explorer.png)

여기서 `.deploy()` 함수를 호출했을 때 Hardhat/Ethers가 내부적으로 수행한 몇 가지 JSON-RPC 호출을 볼 수 있습니다. 여기서 주목해야 할 두 가지 중요한 호출은 실제로 Sepolia 체인에 계약을 작성하는 요청인 [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)과, 해시가 주어졌을 때 트랜잭션에 대한 정보를 읽는 요청인 [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash)입니다(트랜잭션 시 일반적인 패턴). 트랜잭션 전송에 대해 더 알아보려면 [Web3를 사용한 트랜잭션 전송](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)에 대한 이 튜토리얼을 확인하세요.

이것으로 이 튜토리얼의 1부를 마칩니다. 2부에서는 초기 메시지를 업데이트하여 [스마트 계약과 실제로 상호작용](https://www.alchemy.com/docs/interacting-with-a-smart-contract)하고, 3부에서는 모든 사람이 상호작용 방법을 알 수 있도록 [스마트 계약을 Etherscan에 게시](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)할 것입니다.

**Alchemy에 대해 더 자세히 알고 싶으신가요?** 저희 [웹사이트](https://www.alchemy.com/eth)를 확인해 보세요. 업데이트를 놓치고 싶지 않으신가요? [여기](https://www.alchemy.com/newsletter)에서 뉴스레터를 구독하세요! 저희 [Discord](https://discord.gg/u72VCg3)에도 꼭 참여하세요.\*\*.
