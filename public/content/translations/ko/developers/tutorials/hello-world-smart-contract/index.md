---
title: "초보자를 위한 Hello World 스마트 컨트랙트"
description: "이더리움에서 간단한 스마트 컨트랙트를 작성하고 배포하는 방법에 대한 입문 튜토리얼입니다."
author: elanh
tags:
  - solidity
  - hardhat
  - alchemy
  - 스마트 컨트랙트
  - 배포
skill: beginner
breadcrumb: "Hello World 컨트랙트"
lang: ko
published: 2021-03-31
---

블록체인 개발이 처음이라 어디서부터 시작해야 할지 모르거나, 스마트 컨트랙트를 배포하고 상호작용하는 방법을 이해하고 싶다면 이 가이드가 도움이 될 것입니다. 가상 지갑인 [메타마스크](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), 그리고 [Alchemy](https://www.alchemy.com/eth)를 사용하여 Sepolia 테스트 네트워크에 간단한 스마트 컨트랙트를 생성하고 배포하는 과정을 살펴보겠습니다(이 용어들이 아직 무슨 뜻인지 몰라도 걱정하지 마세요. 차근차근 설명해 드릴 것입니다).

이 튜토리얼의 [파트 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)에서는 스마트 컨트랙트가 배포된 후 상호작용하는 방법을 알아보고, [파트 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)에서는 Etherscan에 게시하는 방법을 다룹니다.

진행 중 궁금한 점이 있다면 언제든지 [Alchemy 디스코드](https://discord.gg/gWuC7zB)에 문의해 주세요!

## 1단계: 이더리움 네트워크에 연결하기 {#step-1}

이더리움 체인에 요청을 보내는 방법은 여러 가지가 있습니다. 여기서는 간단하게 진행하기 위해 자체 노드를 실행하지 않고도 이더리움 체인과 통신할 수 있게 해주는 블록체인 개발자 플랫폼이자 API인 Alchemy의 무료 계정을 사용하겠습니다. 이 플랫폼에는 모니터링 및 분석을 위한 개발자 도구도 포함되어 있으며, 이 튜토리얼에서는 스마트 컨트랙트 배포 과정에서 내부적으로 어떤 일이 일어나는지 이해하기 위해 이 도구를 활용할 것입니다. 아직 Alchemy 계정이 없다면 [여기에서 무료로 가입할 수 있습니다](https://dashboard.alchemy.com/signup).

## 2단계: 앱(및 API 키) 생성하기 {#step-2}

Alchemy 계정을 생성한 후에는 앱을 생성하여 API 키를 발급받을 수 있습니다. 이를 통해 Sepolia 테스트 네트워크에 요청을 보낼 수 있습니다. 테스트넷에 익숙하지 않다면 [이 페이지](/developers/docs/networks/)를 확인해 보세요.

1.  Alchemy 대시보드의 내비게이션 바에서 "Select an app"을 선택하고 "Create new app"을 클릭하여 "Create new app" 페이지로 이동합니다.

![Hello world create app](./hello-world-create-app.png)

2. 앱 이름을 "Hello World"로 지정하고, 간단한 설명을 추가한 뒤 사용 사례(예: "Infra & Tooling")를 선택합니다. 다음으로 "Ethereum"을 검색하고 네트워크를 선택합니다.

![create app view hello world](./create-app-view-hello-world.png)

3. "Next"를 클릭하여 진행한 다음 "Create app"을 클릭하면 완료됩니다! 내비게이션 바의 드롭다운 메뉴에 앱이 표시되며, 복사할 수 있는 API 키가 제공됩니다.

## 3단계: 이더리움 계정(주소) 생성하기 {#step-3}

트랜잭션을 보내고 받으려면 이더리움 계정이 필요합니다. 이 튜토리얼에서는 브라우저에서 이더리움 계정 주소를 관리하는 데 사용되는 가상 지갑인 메타마스크를 사용하겠습니다. [트랜잭션](/developers/docs/transactions/)에 대해 더 알아보세요.

[여기](https://metamask.io/download)에서 메타마스크를 다운로드하고 이더리움 계정을 무료로 생성할 수 있습니다. 계정을 생성할 때나 이미 계정이 있는 경우, 네트워크 드롭다운 메뉴를 사용하여 "Sepolia" 테스트 네트워크로 전환해야 합니다(실제 돈을 다루지 않기 위함입니다).

Sepolia가 목록에 보이지 않는다면, 메뉴에서 Advanced(고급)로 이동한 후 아래로 스크롤하여 "Show test networks(테스트 네트워크 보기)"를 켜세요. 네트워크 선택 메뉴에서 "Custom(사용자 지정)" 탭을 선택하여 테스트넷 목록을 찾고 "Sepolia"를 선택합니다.

![metamask sepolia example](./metamask-sepolia-example.png)

## 4단계: 퍼싯에서 이더 추가하기 {#step-4}

테스트 네트워크에 스마트 컨트랙트를 배포하려면 가짜 ETH가 필요합니다. Sepolia ETH를 얻으려면 [Sepolia 네트워크 세부 정보](/developers/docs/networks/#sepolia)로 이동하여 다양한 퍼싯 목록을 확인할 수 있습니다. 하나가 작동하지 않으면 퍼싯이 고갈되었을 수 있으므로 다른 것을 시도해 보세요. 네트워크 트래픽에 따라 가짜 ETH를 받는 데 시간이 걸릴 수 있습니다. 곧 메타마스크 계정에서 ETH를 확인할 수 있을 것입니다!

## 5단계: 잔액 확인하기 {#step-5}

잔액이 제대로 들어왔는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)를 사용하여 [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) 요청을 보내보겠습니다. 이 요청은 지갑에 있는 ETH의 양을 반환합니다. 메타마스크 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답을 볼 수 있습니다.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **참고:** 이 결과는 ETH가 아니라 Wei 단위입니다. Wei는 이더의 가장 작은 단위로 사용됩니다. Wei에서 ETH로의 변환은 1 eth = 10<sup>18</sup> Wei입니다. 따라서 0x2B5E3AF16B1880000을 십진수로 변환하면 5\*10¹⁸이 되며, 이는 5 ETH와 같습니다.
>
> 휴! 가짜 돈이 모두 무사히 들어왔네요 <Emoji text=":money_mouth_face:" size={1} />.

## 6단계: 프로젝트 초기화하기 {#step-6}

먼저 프로젝트를 위한 폴더를 만들어야 합니다. 명령줄로 이동하여 다음을 입력하세요.

```
mkdir hello-world
cd hello-world
```

이제 프로젝트 폴더 안에 있으므로 `npm init`를 사용하여 프로젝트를 초기화하겠습니다. 아직 npm이 설치되어 있지 않다면 [이 지침](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)을 따르세요(Node.js도 필요하므로 함께 다운로드하세요!).

```
npm init
```

설치 질문에 어떻게 대답하든 크게 상관없지만, 참고를 위해 저희가 입력한 내용을 보여드립니다.

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json을 승인하면 준비가 완료됩니다!

## 7단계: [Hardhat](https://hardhat.org/getting-started/#overview) 다운로드하기 {#step-7}

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버깅하기 위한 개발 환경입니다. 개발자가 라이브 체인에 배포하기 전에 로컬에서 스마트 컨트랙트와 탈중앙화 애플리케이션(dapp)을 구축할 때 도움을 줍니다.

`hello-world` 프로젝트 내에서 다음을 실행합니다.

```
npm install --save-dev hardhat
```

[설치 지침](https://hardhat.org/getting-started/#overview)에 대한 자세한 내용은 이 페이지를 확인하세요.

## 8단계: Hardhat 프로젝트 생성하기 {#step-8}

프로젝트 폴더 내에서 다음을 실행합니다.

```
npx hardhat
```

그러면 환영 메시지와 함께 수행할 작업을 선택하는 옵션이 표시됩니다. "create an empty hardhat.config.js"를 선택하세요.

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

이렇게 하면 `hardhat.config.js` 파일이 생성되며, 이 파일에 프로젝트의 모든 설정을 지정하게 됩니다(13단계에서 진행).

## 9단계: 프로젝트 폴더 추가하기 {#step-9}

프로젝트를 체계적으로 관리하기 위해 두 개의 새 폴더를 만들겠습니다. 명령줄에서 프로젝트의 루트 디렉터리로 이동하여 다음을 입력하세요.

```
mkdir contracts
mkdir scripts
```

- `contracts/`는 hello world 스마트 컨트랙트 코드 파일을 보관할 곳입니다.
- `scripts/`는 컨트랙트를 배포하고 상호작용하기 위한 스크립트를 보관할 곳입니다.

## 10단계: 컨트랙트 작성하기 {#step-10}

도대체 코드는 언제 작성하는 건지 궁금하셨을 텐데요. 드디어 10단계에서 코드를 작성합니다.

즐겨 사용하는 에디터(저희는 [VSCode](https://code.visualstudio.com/)를 선호합니다)에서 hello-world 프로젝트를 엽니다. 스마트 컨트랙트는 Solidity라는 언어로 작성되며, 이를 사용하여 HelloWorld.sol 스마트 컨트랙트를 작성할 것입니다.‌

1.  "contracts" 폴더로 이동하여 HelloWorld.sol이라는 새 파일을 만듭니다.
2.  아래는 이 튜토리얼에서 사용할 이더리움 재단의 Hello World 스마트 컨트랙트 샘플입니다. 아래 내용을 복사하여 HelloWorld.sol 파일에 붙여넣고, 주석을 읽어 이 컨트랙트가 어떤 역할을 하는지 이해해 보세요.

```solidity
// 시맨틱 버저닝을 사용하여 Solidity의 버전을 지정합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld`라는 이름의 컨트랙트를 정의합니다.
// 컨트랙트는 함수와 데이터(상태)의 모음입니다. 배포된 후, 컨트랙트는 이더리움 블록체인의 특정 주소에 상주합니다. 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` 타입의 상태 변수 `message`를 선언합니다.
   // 상태 변수는 그 값이 컨트랙트 스토리지에 영구적으로 저장되는 변수입니다. `public` 키워드는 컨트랙트 외부에서 변수에 접근할 수 있게 하며, 다른 컨트랙트나 클라이언트가 값에 접근하기 위해 호출할 수 있는 함수를 생성합니다.
   string public message;

   // 많은 클래스 기반 객체 지향 언어와 유사하게, 생성자는 컨트랙트 생성 시에만 실행되는 특수한 함수입니다.
   // 생성자는 컨트랙트의 데이터를 초기화하는 데 사용됩니다. 자세히 알아보기:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 문자열 인수 `initMessage`를 받아 컨트랙트의 `message` 스토리지 변수에 값을 설정합니다).
      message = initMessage;
   }

   // 문자열 인수를 받아 `message` 스토리지 변수를 업데이트하는 public 함수입니다.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

이것은 생성 시 메시지를 저장하고 `update` 함수를 호출하여 업데이트할 수 있는 아주 간단한 스마트 컨트랙트입니다.

## 11단계: 프로젝트에 메타마스크 및 Alchemy 연결하기 {#step-11}

메타마스크 지갑과 Alchemy 계정을 생성하고 스마트 컨트랙트를 작성했으니, 이제 이 세 가지를 연결할 차례입니다.

가상 지갑에서 전송되는 모든 트랜잭션에는 고유한 개인 키를 사용한 서명이 필요합니다. 프로그램에 이 권한을 부여하기 위해 환경 파일에 개인 키(및 Alchemy API 키)를 안전하게 저장할 수 있습니다.

> 트랜잭션 전송에 대해 더 자세히 알아보려면 Web3를 사용하여 트랜잭션을 전송하는 방법에 대한 [이 튜토리얼](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)을 확인하세요.

먼저 프로젝트 디렉터리에 dotenv 패키지를 설치합니다.

```
npm install dotenv --save
```

그런 다음 프로젝트의 루트 디렉터리에 `.env` 파일을 만들고, 메타마스크 개인 키와 HTTP Alchemy API URL을 추가합니다.

- 개인 키를 내보내려면 [이 지침](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)을 따르세요.
- HTTP Alchemy API URL을 가져오는 방법은 아래를 참조하세요.

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL 복사

`.env` 파일은 다음과 같아야 합니다.

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

이를 코드에 실제로 연결하기 위해 13단계에서 `hardhat.config.js` 파일의 이 변수들을 참조할 것입니다.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> 파일을 커밋하지 마세요! <code>.env</code> 파일을 다른 사람과 공유하거나 노출하면 비밀 정보가 유출될 수 있으므로 절대 공유하지 않도록 주의하세요. 버전 관리를 사용하는 경우 <code>.env</code>를 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 파일에 추가하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 12단계: Ethers.js 설치하기 {#step-12-install-ethersjs}

Ethers.js는 [표준 JSON-RPC 메서드](/developers/docs/apis/json-rpc/)를 더 사용자 친화적인 메서드로 래핑하여 이더리움과 상호작용하고 요청을 보내기 쉽게 만들어주는 라이브러리입니다.

Hardhat을 사용하면 추가 도구 및 확장된 기능을 위한 [플러그인](https://hardhat.org/plugins/)을 아주 쉽게 통합할 수 있습니다. 컨트랙트 배포를 위해 [Ethers 플러그인](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)을 활용할 것입니다([Ethers.js](https://github.com/ethers-io/ethers.js/)에는 매우 깔끔한 컨트랙트 배포 메서드가 있습니다).

프로젝트 디렉터리에서 다음을 입력합니다.

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

다음 단계에서 `hardhat.config.js` 파일에 ethers를 require문으로 불러올 것입니다.

## 13단계: hardhat.config.js 업데이트하기 {#step-13-update-hardhatconfigjs}

지금까지 여러 종속성과 플러그인을 추가했으므로, 이제 프로젝트가 이 모든 것을 알 수 있도록 `hardhat.config.js` 파일을 업데이트해야 합니다.

`hardhat.config.js` 파일을 다음과 같이 업데이트합니다.

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

## 14단계: 컨트랙트 컴파일하기 {#step-14-compile-our-contracts}

지금까지 모든 것이 제대로 작동하는지 확인하기 위해 컨트랙트를 컴파일해 보겠습니다. `compile` 작업은 내장된 hardhat 작업 중 하나입니다.

명령줄에서 다음을 실행합니다.

```
npx hardhat compile
```

`SPDX license identifier not provided in source file`에 대한 경고가 표시될 수 있지만 걱정할 필요는 없습니다. 다른 모든 것이 정상적으로 보이길 바랍니다! 그렇지 않다면 언제든지 [Alchemy 디스코드](https://discord.gg/u72VCg3)에 메시지를 남겨주세요.

## 15단계: 배포 스크립트 작성하기 {#step-15-write-our-deploy-scripts}

이제 컨트랙트가 작성되었고 구성 파일도 준비되었으니, 컨트랙트 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 만들고 다음 내용을 추가합니다.

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // 배포를 시작하고 컨트랙트 객체로 리졸브되는 프로미스를 반환합니다.
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat은 [컨트랙트 튜토리얼](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)에서 이 코드의 각 줄이 어떤 역할을 하는지 아주 잘 설명하고 있으며, 여기서는 그 설명을 채택했습니다.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js의 `ContractFactory`는 새로운 스마트 컨트랙트를 배포하는 데 사용되는 추상화이므로, 여기서 `HelloWorld`는 hello world 컨트랙트 인스턴스를 위한 팩토리입니다. `hardhat-ethers` 플러그인을 사용할 때 `ContractFactory` 및 `Contract` 인스턴스는 기본적으로 첫 번째 서명자에 연결됩니다.

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory`에서 `deploy()`를 호출하면 배포가 시작되고, `Contract`로 리졸브되는 `Promise`가 반환됩니다. 이것은 스마트 컨트랙트의 각 함수에 대한 메서드를 가지고 있는 객체입니다.

## 16단계: 컨트랙트 배포하기 {#step-16-deploy-our-contract}

드디어 스마트 컨트랙트를 배포할 준비가 되었습니다! 명령줄로 이동하여 다음을 실행합니다.

```
npx hardhat run scripts/deploy.js --network sepolia
```

그러면 다음과 같은 내용이 표시될 것입니다.

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Sepolia Etherscan](https://sepolia.etherscan.io/)으로 이동하여 컨트랙트 주소를 검색하면 성공적으로 배포되었음을 확인할 수 있습니다. 트랜잭션은 다음과 같이 보일 것입니다.

![etherscan contract](./etherscan-contract.png)

`From` 주소는 메타마스크 계정 주소와 일치해야 하며, To 주소에는 "Contract Creation"이라고 표시되지만 트랜잭션을 클릭해 보면 `To` 필드에서 컨트랙트 주소를 볼 수 있습니다.

![etherscan transaction](./etherscan-transaction.png)

축하합니다! 방금 이더리움 체인에 스마트 컨트랙트를 배포하셨습니다 🎉

내부적으로 어떤 일이 일어나고 있는지 이해하기 위해 [Alchemy 대시보드](https://dashboard.alchemyapi.io/explorer)의 Explorer 탭으로 이동해 보겠습니다. 여러 개의 Alchemy 앱이 있는 경우 앱별로 필터링하여 "Hello World"를 선택하세요.
![hello world explorer](./hello-world-explorer.png)

여기에서 `.deploy()` 함수를 호출했을 때 Hardhat/Ethers가 내부적으로 수행한 몇 가지 JSON-RPC 호출을 볼 수 있습니다. 여기서 주목해야 할 두 가지 중요한 호출은 실제로 Sepolia 체인에 컨트랙트를 기록하라는 요청인 [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)와, 해시가 주어졌을 때 트랜잭션에 대한 정보를 읽어오라는 요청인 [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash)입니다(트랜잭션을 보낼 때의 일반적인 패턴입니다). 트랜잭션 전송에 대해 더 자세히 알아보려면 [Web3를 사용하여 트랜잭션을 전송하는 방법](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)에 대한 이 튜토리얼을 확인하세요.

이것으로 이 튜토리얼의 파트 1을 마칩니다. 파트 2에서는 초기 메시지를 업데이트하여 실제로 [스마트 컨트랙트와 상호작용](https://www.alchemy.com/docs/interacting-with-a-smart-contract)해 보고, 파트 3에서는 모든 사람이 상호작용하는 방법을 알 수 있도록 [Etherscan에 스마트 컨트랙트를 게시](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)해 보겠습니다.

**Alchemy에 대해 더 알고 싶으신가요? 저희 [웹사이트](https://www.alchemy.com/eth)를 확인해 보세요. 업데이트 소식을 놓치고 싶지 않으시다면 [여기](https://www.alchemy.com/newsletter)에서 뉴스레터를 구독하세요! 저희 [디스코드](https://discord.gg/u72VCg3)에도 꼭 참여해 주세요.**