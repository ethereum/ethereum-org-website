---
title: "초보자를 위한 Hello World 스마트 계약 - 풀스택"
description: "이더리움에 간단한 스마트 계약을 작성하고 배포하는 방법에 대한 입문 튜토리얼입니다."
author: "nstrike2"
tags:
  [
    "솔리디티",
    "hardhat",
    "alchemy",
    "스마트 계약",
    "배포하기",
    "블록 탐색기",
    "프론트엔드",
    "트랜잭션"
  ]
skill: beginner
lang: ko
published: 2021-10-25
---

이 가이드는 블록체인 개발을 처음 접하시거나 스마트 계약을 배포하고 상호 작용하는 방법을 모르는 분들을 위한 것입니다. [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), [Alchemy](https://alchemy.com/eth)를 사용하여 Goerli 테스트 네트워크에 간단한 스마트 계약을 생성하고 배포하는 과정을 안내합니다.

이 튜토리얼을 완료하려면 Alchemy 계정이 필요합니다. [무료 계정으로 가입하세요](https://www.alchemy.com/).

궁금한 점이 있으면 언제든지 [Alchemy Discord](https://discord.gg/gWuC7zB)에 문의하세요!

## 1부 - Hardhat을 사용하여 스마트 계약 생성 및 배포하기 {#part-1}

### 이더리움 네트워크에 연결하기 {#connect-to-the-ethereum-network}

이더리움 체인에 요청을 보내는 방법은 여러 가지가 있습니다. 간단하게 하기 위해, 자체적으로 노드를 실행하지 않고도 이더리움 체인과 통신할 수 있게 해주는 블록체인 개발자 플랫폼이자 API인 Alchemy의 무료 계정을 사용하겠습니다. Alchemy는 모니터링 및 분석을 위한 개발자 도구도 제공합니다. 이 튜토리얼에서 이러한 도구를 활용하여 스마트 계약 배포 시 내부적으로 어떤 일이 일어나는지 이해해 보겠습니다.

### 앱과 API 키 만들기 {#create-your-app-and-api-key}

Alchemy 계정을 생성한 후에는 앱을 만들어 API 키를 생성할 수 있습니다. 이를 통해 Goerli 테스트넷에 요청을 보낼 수 있습니다. 테스트넷에 익숙하지 않은 경우 [네트워크 선택에 대한 Alchemy 가이드](https://www.alchemy.com/docs/choosing-a-web3-network)를 읽어보세요.

Alchemy 대시보드의 탐색 모음에서 **Apps** 드롭다운을 찾아 **Create App**을 클릭합니다.

![Hello world create app](./hello-world-create-app.png)

앱 이름을 '_Hello World_'로 지정하고 간단한 설명을 작성합니다. 환경으로 **Staging**을, 네트워크로 **Goerli**를 선택합니다.

![create app view hello world](./create-app-view-hello-world.png)

_참고: **Goerli**를 반드시 선택해야 합니다. 그렇지 않으면 이 튜토리얼이 작동하지 않습니다._

**앱 만들기**를 클릭하세요. 생성한 앱이 아래 표에 나타납니다.

### 이더리움 계정 만들기 {#create-an-ethereum-account}

트랜잭션을 보내고 받으려면 이더리움 계정이 필요합니다. 브라우저에서 이더리움 계정 주소를 관리할 수 있는 가상 지갑인 MetaMask를 사용하겠습니다.

[여기](https://metamask.io/download)에서 MetaMask 계정을 무료로 다운로드하고 생성할 수 있습니다. 계정을 생성하거나 이미 계정이 있는 경우, 오른쪽 상단에서 'Goerli 테스트 네트워크'로 전환했는지 확인하세요(실제 돈을 다루지 않기 위함입니다).

### 4단계: 파우셋에서 이더 추가하기 {#step-4-add-ether-from-a-faucet}

테스트 네트워크에 스마트 계약을 배포하려면 가짜 ETH가 필요합니다. Goerli 네트워크에서 ETH를 받으려면, Goerli 파우셋으로 이동하여 Goerli 계정 주소를 입력하세요. 최근 Goerli 파우셋이 약간 불안정할 수 있습니다. [테스트 네트워크 페이지](/developers/docs/networks/#goerli)에서 시도해 볼 수 있는 옵션 목록을 확인하세요.

_참고: 네트워크 혼잡으로 인해 시간이 다소 걸릴 수 있습니다._
``

### 5단계: 잔액 확인하기 {#step-5-check-your-balance}

지갑에 ETH가 있는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)를 사용하여 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 요청을 보냅니다. 이것은 지갑에 있는 ETH의 양을 반환할 것입니다. 더 자세한 내용은 [컴포저 도구 사용법에 대한 Alchemy의 짧은 튜토리얼](https://youtu.be/r6sjRxBZJuU)을 확인하세요.

MetaMask 계정 주소를 입력하고 **요청 보내기**를 클릭하세요. 아래 코드 스니펫과 같은 응답을 보게 될 것입니다.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _참고: 이 결과는 ETH가 아닌 wei 단위입니다. Wei는 ether의 가장 작은 단위로 사용됩니다._

휴! 우리의 가짜 돈이 다 있군요.

### 6단계: 프로젝트 초기화하기 {#step-6-initialize-our-project}

먼저 프로젝트를 위한 폴더를 만들어야 합니다. 명령줄로 이동하여 다음을 입력하세요.

```
mkdir hello-world
cd hello-world
```

이제 프로젝트 폴더 안으로 들어왔으니, `npm init`을 사용하여 프로젝트를 초기화하겠습니다.

> 아직 npm이 설치되지 않았다면 [Node.js 및 npm 설치 지침](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)을 따르세요.

이 튜토리얼에서는 초기화 질문에 어떻게 대답하든 상관없습니다. 참고를 위해 다음과 같이 진행했습니다.

```
패키지 이름: (hello-world)
버전: (1.0.0)
설명: hello world 스마트 계약
진입점: (index.js)
테스트 명령어:
git 저장소:
키워드:
작성자:
라이선스: (ISC)

/Users/.../.../.../hello-world/package.json에 쓰기 직전:

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

### 7단계: Hardhat 다운로드하기 {#step-7-download-hardhat}

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버그하기 위한 개발 환경입니다. 실제 블록체인에 배포하기 전에 로컬에서 스마트 컨트랙트 및 dApp을 구축할 때 사용됩니다.

`hello-world` 프로젝트 내부에서 다음을 실행하세요:

```
npm install --save-dev hardhat
```

설치 지침에 대한 자세한 내용은 [이 페이지](https://hardhat.org/getting-started/#overview)를 확인하세요.

### 8단계: Hardhat 프로젝트 생성하기 {#step-8-create-hardhat-project}

`hello-world` 프로젝트 폴더 안에서 다음을 실행합니다:

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

👷 Hardhat v2.0.11에 오신 것을 환영합니다 👷‍

무엇을 하시겠습니까? …
샘플 프로젝트 생성
❯ 빈 hardhat.config.js 생성
종료
```

이렇게 하면 프로젝트에 `hardhat.config.js` 파일이 생성됩니다. 튜토리얼의 뒷부분에서 이 파일을 사용하여 프로젝트 설정을 지정할 것입니다.

### 9단계: 프로젝트 폴더 추가하기 {#step-9-add-project-folders}

프로젝트를 체계적으로 정리하기 위해 두 개의 새 폴더를 만들겠습니다. 명령줄에서 `hello-world` 프로젝트의 루트 디렉토리로 이동하여 다음을 입력합니다.

```
mkdir contracts
mkdir scripts
```

- `contracts/`는 hello world 스마트 계약 코드 파일을 보관할 곳입니다.
- `scripts/`는 계약을 배포하고 상호작용하기 위한 스크립트를 보관할 곳입니다.

### 10단계: 계약 작성하기 {#step-10-write-our-contract}

언제 코드를 작성하게 될지 궁금하실 겁니다. 바로 지금입니다!

선호하는 편집기에서 hello-world 프로젝트를 여세요. 스마트 계약은 대부분 Solidity로 작성되며, 저희도 스마트 계약을 작성하는 데 Solidity를 사용할 것입니다.‌

1. `contracts` 폴더로 이동하여 `HelloWorld.sol`이라는 새 파일을 만듭니다.
2. 아래는 이 튜토리얼에서 사용할 샘플 Hello World 스마트 계약입니다. 아래 내용을 `HelloWorld.sol` 파일에 복사하세요.

_참고: 이 계약이 어떤 역할을 하는지 이해하려면 주석을 꼭 읽어보세요._

```
// 시맨틱 버저닝을 사용하여 Solidity 버전을 지정합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// 'HelloWorld'라는 계약을 정의합니다.
// 계약은 함수와 데이터(그 상태)의 모음입니다. 배포되면, 계약은 이더리움 블록체인의 특정 주소에 위치하게 됩니다. 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //업데이트 함수가 호출될 때 발생합니다
   //스마트 계약 이벤트는 계약이 블록체인에서 발생한 일을 앱 프론트엔드에 전달하는 방법으로, 특정 이벤트를 '수신'하고 이벤트가 발생할 때 조치를 취할 수 있습니다.
   event UpdatedMessages(string oldStr, string newStr);

   // 'string' 타입의 상태 변수 `message`를 선언합니다.
   // 상태 변수는 값이 계약 스토리지에 영구적으로 저장되는 변수입니다. `public` 키워드는 변수를 계약 외부에서 액세스할 수 있도록 하고 다른 계약이나 클라이언트가 값을 액세스하기 위해 호출할 수 있는 함수를 생성합니다.
   string public message;

   // 많은 클래스 기반 객체 지향 언어와 마찬가지로 생성자는 계약 생성 시에만 실행되는 특수 함수입니다.
   // 생성자는 계약의 데이터를 초기화하는 데 사용됩니다. 자세히 알아보기:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 문자열 인수 `initMessage`를 수락하고 계약의 `message` 스토리지 변수에 값을 설정합니다).
      message = initMessage;
   }

   // 문자열 인수를 허용하고 `message` 스토리지 변수를 업데이트하는 공개 함수입니다.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

이것은 생성 시 메시지를 저장하는 기본적인 스마트 계약입니다. `update` 함수를 호출하여 업데이트할 수 있습니다.

### 11단계: MetaMask와 Alchemy를 프로젝트에 연결하기 {#step-11-connect-metamask-alchemy-to-your-project}

MetaMask 지갑, Alchemy 계정을 만들고 스마트 계약을 작성했습니다. 이제 이 세 가지를 연결할 차례입니다.

지갑에서 전송되는 모든 트랜잭션은 고유한 개인 키를 사용한 서명이 필요합니다. 프로그램에 이 권한을 제공하기 위해, 개인 키를 환경 파일에 안전하게 저장할 수 있습니다. 여기에 Alchemy용 API 키도 저장할 것입니다.

> 트랜잭션 전송에 대해 더 알아보려면 web3를 사용한 트랜잭션 전송에 관한 [이 튜토리얼](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project)을 확인하세요.

먼저 프로젝트 디렉터리에 dotenv 패키지를 설치합니다.

```
npm install dotenv --save
```

그런 다음, 프로젝트의 루트 디렉터리에 `.env` 파일을 생성합니다. 여기에 MetaMask 개인 키와 HTTP Alchemy API URL을 추가합니다.

환경 파일의 이름은 `.env`여야 합니다. 그렇지 않으면 환경 파일로 인식되지 않습니다.

`process.env`나 `.env-custom` 또는 다른 이름으로 지정하지 마세요.

- 개인 키를 내보내려면 [다음 지침](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)을 따르세요.
- HTTP Alchemy API URL을 얻으려면 아래를 참조하세요.

![](./get-alchemy-api-key.gif)

`.env` 파일은 다음과 같아야 합니다:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

이를 실제로 코드에 연결하기 위해 13단계의 `hardhat.config.js` 파일에서 이러한 변수를 참조합니다.

### 12단계: Ethers.js 설치하기 {#step-12-install-ethersjs}

Ethers.js는 [표준 JSON-RPC 메서드](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)를 보다 사용자 친화적인 메서드로 래핑하여 이더리움과 더 쉽게 상호 작용하고 요청할 수 있도록 하는 라이브러리입니다.

Hardhat은 추가적인 툴링 및 확장된 기능을 위해 [플러그인](https://hardhat.org/plugins/)을 통합할 수 있게 해줍니다. 계약 배포를 위해 [Ethers 플러그인](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)을 활용할 것입니다.

프로젝트 디렉토리에 다음을 입력합니다.

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### 13단계: hardhat.config.js 업데이트하기 {#step-13-update-hardhat-configjs}

지금까지 여러 종속성과 플러그인을 추가했습니다. 이제 프로젝트가 이 모든 것을 인식할 수 있도록 `hardhat.config.js`를 업데이트해야 합니다.

`hardhat.config.js`를 다음과 같이 업데이트하세요:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### 14단계: 계약 컴파일하기 {#step-14-compile-our-contract}

지금까지 모든 것이 제대로 작동하는지 확인하기 위해 스마트 컨트랙트를 컴파일해 보겠습니다. `compile` 작업은 hardhat에 내장된 작업 중 하나입니다.

명령줄에서 다음을 실행합니다.

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file`에 대한 경고가 표시될 수 있지만 걱정할 필요는 없습니다. 다른 모든 것이 잘 보이기를 바랍니다! 그렇지 않은 경우 언제든지 [Alchemy discord](https://discord.gg/u72VCg3)로 메시지를 보내주세요.

### 15단계: 배포 스크립트 작성하기 {#step-15-write-our-deploy-script}

이제 스마트 컨트랙트가 작성되고 설정 파일을 사용할 수 있으므로 스마트 컨트랙트 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 만들고 다음 내용을 추가하세요.

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // 배포를 시작하고, 계약 객체로 확인되는 프라미스를 반환합니다
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("계약이 배포된 주소:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat은 [계약 튜토리얼](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)에서 각 코드 라인이 무엇을 하는지 훌륭하게 설명하고 있으며, 저희는 그 설명을 여기에 채택했습니다.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js의 `ContractFactory`는 새로운 스마트 계약을 배포하는 데 사용되는 추상화이므로, 여기서 `HelloWorld`는 [팩토리](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) 계약 인스턴스를 위한 팩토리입니다. `hardhat-ethers` 플러그인을 사용할 때 `ContractFactory` 및 `Contract` 인스턴스는 기본적으로 첫 번째 서명자(소유자)에게 연결됩니다.

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory`에서 `deploy()`를 호출하면 배포가 시작되고, `Contract` 객체로 확인되는 `Promise`를 반환합니다. 이것은 각 스마트 컨트랙트 기능에 대한 메소드가 있는 개체입니다.

### 16단계: 계약 배포하기 {#step-16-deploy-our-contract}

마침내 스마트 컨트랙트를 배포할 준비가 되었습니다! 명령줄로 이동하여 다음을 실행하세요:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

그러면 다음과 같은 내용이 표시됩니다.

```bash
계약이 배포된 주소: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**이 주소를 저장해주세요**. 튜토리얼 뒷부분에서 사용할 것입니다.

[Goerli Etherscan](https://goerli.etherscan.io)으로 이동하여 계약 주소를 검색하면 성공적으로 배포된 것을 볼 수 있습니다. 트랜잭션은 다음과 같습니다.

![](./etherscan-contract.png)

`From` 주소는 MetaMask 계정 주소와 일치해야 하며, `To` 주소는 **계약 생성**이라고 표시됩니다. 트랜잭션을 클릭하면 `To` 필드에 계약 주소가 표시됩니다.

![](./etherscan-transaction.png)

축하해요! 방금 이더리움 테스트넷에 스마트 계약을 배포했습니다.

내부적으로 어떤 일이 일어나고 있는지 이해하기 위해 [Alchemy 대시보드](https://dashboard.alchemy.com/explorer)의 Explorer 탭으로 이동해 보겠습니다. 여러 개의 Alchemy 앱이 있는 경우 앱별로 필터링하고 **Hello World**를 선택해야 합니다.

![](./hello-world-explorer.png)

여기에서 `.deploy()` 함수를 호출했을 때 Hardhat/Ethers가 내부적으로 수행한 몇 가지 JSON-RPC 메서드를 볼 수 있습니다. 여기서 중요한 두 가지 메서드는 계약을 Goerli 체인에 작성하는 요청인 [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)과, 해시가 주어졌을 때 트랜잭션에 대한 정보를 읽는 요청인 [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)입니다. 트랜잭션 전송에 대해 더 자세히 알아보려면 [Web3를 사용한 트랜잭션 전송 튜토리얼](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)을 확인하세요.

## 2부: 스마트 계약과 상호작용하기 {#part-2-interact-with-your-smart-contract}

이제 Goerli 네트워크에 스마트 계약을 성공적으로 배포했으니, 이와 상호 작용하는 방법을 알아보겠습니다.

### interact.js 파일 생성하기 {#create-a-interactjs-file}

이 파일은 상호 작용 스크립트를 작성할 파일입니다. 1부에서 이전에 설치한 Ethers.js 라이브러리를 사용할 것입니다.

`scripts/` 폴더 안에 `interact.js`라는 새 파일을 만들고 다음 코드를 추가합니다.

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### .env 파일 업데이트하기 {#update-your-env-file}

새로운 환경 변수를 사용할 것이므로 [이전에 생성한](#step-11-connect-metamask-&-alchemy-to-your-project) `.env` 파일에 정의해야 합니다.

Alchemy `API_KEY`와 스마트 계약이 배포된 `CONTRACT_ADDRESS`에 대한 정의를 추가해야 합니다.

`.env` 파일은 다음과 같아야 합니다.

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### 계약 ABI 가져오기 {#grab-your-contract-ABI}

계약 [ABI(애플리케이션 바이너리 인터페이스)](/glossary/#abi)는 스마트 계약과 상호 작용하기 위한 인터페이스입니다. Hardhat은 자동으로 ABI를 생성하여 `HelloWorld.json`에 저장합니다. ABI를 사용하려면 `interact.js` 파일에 다음 코드 줄을 추가하여 내용을 구문 분석해야 합니다.

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

ABI를 보려면 콘솔에 출력할 수 있습니다.

```javascript
console.log(JSON.stringify(contract.abi))
```

ABI가 콘솔에 출력되는 것을 보려면 터미널로 이동하여 다음을 실행하세요.

```bash
npx hardhat run scripts/interact.js
```

### 계약 인스턴스 생성하기 {#create-an-instance-of-your-contract}

계약과 상호 작용하려면 코드에서 계약 인스턴스를 생성해야 합니다. Ethers.js로 이를 수행하려면 세 가지 개념을 다루어야 합니다.

1. 제공자 - 블록체인에 대한 읽기 및 쓰기 접근 권한을 제공하는 노드 제공자
2. 서명자 - 트랜잭션에 서명할 수 있는 이더리움 계정을 나타냅니다
3. 계약 - 온체인에 배포된 특정 계약을 나타내는 Ethers.js 객체

이전 단계의 계약 ABI를 사용하여 계약 인스턴스를 생성합니다.

```javascript
// interact.js

// 제공자
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// 서명자
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// 계약
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

제공자, 서명자, 계약에 대한 자세한 내용은 [ethers.js 개발문서](https://docs.ethers.io/v5/)에서 알아보세요.

### 초기 메시지 읽기 {#read-the-init-message}

`initMessage = "Hello world!"`로 계약을 배포했던 것을 기억하시나요? 이제 스마트 계약에 저장된 메시지를 읽어 콘솔에 출력할 것입니다.

JavaScript에서는 네트워크와 상호 작용할 때 비동기 함수가 사용됩니다. 비동기 함수에 대해 더 알아보려면 [이 미디엄 기사](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)를 읽어보세요.

아래 코드를 사용하여 스마트 계약에서 `message` 함수를 호출하고 초기 메시지를 읽으세요.

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("메시지는: " + message)
}
main()
```

터미널에서 `npx hardhat run scripts/interact.js`를 사용하여 파일을 실행한 후 다음과 같은 응답을 볼 수 있어야 합니다.

```
메시지는: Hello world!
```

축하해요! 이더리움 블록체인에서 스마트 계약 데이터를 성공적으로 읽었습니다. 잘하셨습니다!

### 메시지 업데이트하기 {#update-the-message}

단순히 메시지를 읽는 대신, `update` 함수를 사용하여 스마트 계약에 저장된 메시지를 업데이트할 수도 있습니다! 꽤 멋지죠?

메시지를 업데이트하려면 인스턴스화된 계약 객체에서 `update` 함수를 직접 호출할 수 있습니다.

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("메시지는: " + message)

  console.log("메시지 업데이트 중...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

11번째 줄에서 반환된 트랜잭션 객체에 대해 `.wait()`를 호출하는 것을 주목하세요. 이를 통해 스크립트가 함수를 종료하기 전에 트랜잭션이 블록체인에서 채굴될 때까지 기다리게 됩니다. `.wait()` 호출이 포함되지 않으면 스크립트가 계약에서 업데이트된 `message` 값을 보지 못할 수 있습니다.

### 새 메시지 읽기 {#read-the-new-message}

[이전 단계](#read-the-init-message)를 반복하여 업데이트된 `message` 값을 읽을 수 있어야 합니다. 잠시 시간을 내어 새 값을 출력하는 데 필요한 변경 사항을 적용해 보세요!

힌트가 필요하다면, 이 시점에서 `interact.js` 파일은 다음과 같아야 합니다.

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// 제공자 - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// 서명자 - 당신
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// 계약 인스턴스
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("메시지는: " + message)

  console.log("메시지 업데이트 중...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("새 메시지는: " + newMessage)
}

main()
```

이제 스크립트를 실행하면 이전 메시지, 업데이트 상태, 그리고 새 메시지가 터미널에 출력되는 것을 볼 수 있습니다!

`npx hardhat run scripts/interact.js --network goerli`

```
메시지: Hello World!
메시지 업데이트 중...
새 메시지: This is the new message.
```

스크립트를 실행하는 동안, 새 메시지가 로드되기 전에 `메시지 업데이트 중...` 단계가 로드되는 데 시간이 걸리는 것을 알 수 있습니다. 이는 채굴 과정 때문입니다. 채굴 중인 트랜잭션을 추적하는 데 관심이 있다면 [Alchemy 멤풀](https://dashboard.alchemyapi.io/mempool)을 방문하여 트랜잭션 상태를 확인하세요. 트랜잭션이 중단된 경우, [Goerli Etherscan](https://goerli.etherscan.io)을 확인하고 트랜잭션 해시를 검색하는 것도 도움이 됩니다.

## 3부: Etherscan에 스마트 계약 게시하기 {#part-3-publish-your-smart-contract-to-etherscan}

스마트 계약을 현실로 만드는 힘든 작업을 모두 마쳤습니다. 이제 세상과 공유할 시간입니다!

Etherscan에서 스마트 계약을 확인하면 누구나 소스 코드를 보고 스마트 계약과 상호 작용할 수 있습니다. 시작해 보겠습니다!

### 1단계: Etherscan 계정에서 API 키 생성하기 {#step-1-generate-an-api-key-on-your-etherscan-account}

게시하려는 스마트 계약을 소유하고 있음을 확인하려면 Etherscan API 키가 필요합니다.

아직 Etherscan 계정이 없다면 [계정을 등록하세요](https://etherscan.io/register).

로그인한 후 탐색 모음에서 사용자 이름을 찾아 마우스를 올리고 **내 프로필** 버튼을 선택합니다.

프로필 페이지에 측면 탐색 모음이 표시됩니다. 측면 탐색 모음에서 **API 키**를 선택합니다. 다음으로 '추가' 버튼을 눌러 새 API 키를 만들고, 앱 이름을 **hello-world**로 지정한 다음 **새 API 키 만들기** 버튼을 누릅니다.

새로운 API 키가 API 키 표에 나타납니다. API 키를 클립보드에 복사합니다.

다음으로 Etherscan API 키를 `.env` 파일에 추가해야 합니다.

추가한 후 `.env` 파일은 다음과 같아야 합니다.

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat 배포 스마트 계약 {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan 설치하기 {#install-hardhat-etherscan}

Hardhat을 사용하여 Etherscan에 계약을 게시하는 것은 간단합니다. 시작하려면 먼저 `hardhat-etherscan` 플러그인을 설치해야 합니다. `hardhat-etherscan`은 Etherscan에서 스마트 계약의 소스 코드와 ABI를 자동으로 확인합니다. 이를 추가하려면 `hello-world` 디렉터리에서 다음을 실행합니다.

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

설치되면 `hardhat.config.js` 상단에 다음 문을 포함하고 Etherscan 구성 옵션을 추가합니다.

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan용 API 키
    // https://etherscan.io/에서 하나를 얻으십시오.
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan에서 스마트 계약 확인하기 {#verify-your-smart-contract-on-etherscan}

모든 파일이 저장되고 모든 `.env` 변수가 올바르게 구성되었는지 확인하세요.

`verify` 작업을 실행하여 계약 주소와 배포된 네트워크를 전달합니다.

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS`가 Goerli 테스트 네트워크에 배포된 스마트 계약의 주소인지 확인하세요. 또한 마지막 인수(`'Hello World!'`)는 [1부의 배포 단계](#write-our-deploy-script)에서 사용한 문자열 값과 동일해야 합니다.

모든 것이 순조롭게 진행되면 터미널에 다음 메시지가 표시됩니다.

```text
계약 소스 코드가 성공적으로 제출되었습니다
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
Etherscan에서 확인을 위해 대기 중... 확인 결과를 기다리는 중...


Etherscan에서 HelloWorld 계약을 성공적으로 확인했습니다.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

축하해요! 스마트 계약 코드가 Etherscan에 있습니다!

### Etherscan에서 스마트 계약을 확인하세요! {#check-out-your-smart-contract-on-etherscan}

터미널에 제공된 링크로 이동하면 Etherscan에 게시된 스마트 계약 코드와 ABI를 볼 수 있습니다!

**와우, 해내셨군요!** 이제 누구나 당신의 스마트 계약을 호출하거나 쓸 수 있습니다! **다음에 무엇을 만들지 기대됩니다!**

## 4부 - 스마트 계약을 프런트엔드와 통합하기 {#part-4-integrating-your-smart-contract-with-the-frontend}

이 튜토리얼을 마치면 다음을 알게 될 것입니다.

- MetaMask 지갑을 탈중앙화앱에 연결
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API를 사용하여 스마트 계약에서 데이터 읽기
- MetaMask를 사용하여 이더리움 트랜잭션 서명하기

이 탈중앙화앱에서는 프런트엔드 프레임워크로 [React](https://react.dev/)를 사용할 것입니다. 하지만 저희는 주로 프로젝트에 웹3 기능을 도입하는 데 중점을 둘 것이므로 React의 기초를 자세히 다루지는 않을 것입니다.

전제 조건으로 React에 대한 초급 수준의 이해가 있어야 합니다. 그렇지 않은 경우 공식 [React 소개 튜토리얼](https://react.dev/learn)을 완료하는 것이 좋습니다.

### 스타터 파일 복제하기 {#clone-the-starter-files}

먼저 [hello-world-part-four GitHub 저장소](https://github.com/alchemyplatform/hello-world-part-four-tutorial)로 이동하여 이 프로젝트의 시작 파일을 가져오고 이 저장소를 로컬 컴퓨터에 복제합니다.

복제된 저장소를 로컬에서 엽니다. 두 개의 폴더, 즉 `starter-files`와 `completed`가 포함되어 있음을 알 수 있습니다.

- `starter-files` - **이 디렉토리에서 작업할 것입니다**. UI를 이더리움 지갑과 [3부](#part-3)에서 Etherscan에 게시한 스마트 계약에 연결할 것입니다.
- `completed`는 전체 튜토리얼을 포함하며 막혔을 경우에만 참고용으로 사용해야 합니다.

다음으로, `starter-files` 사본을 즐겨 사용하는 코드 편집기에서 열고 `src` 폴더로 이동합니다.

우리가 작성할 모든 코드는 `src` 폴더 아래에 위치하게 됩니다. 프로젝트에 웹3 기능을 부여하기 위해 `HelloWorld.js` 구성 요소와 `util/interact.js` JavaScript 파일을 편집할 것입니다.

### 시작 파일 확인하기 {#check-out-the-starter-files}

코딩을 시작하기 전에 시작 파일에 무엇이 제공되는지 살펴보겠습니다.

#### React 프로젝트 실행하기 {#get-your-react-project-running}

먼저 브라우저에서 React 프로젝트를 실행해 봅시다. React의 장점은 일단 브라우저에서 프로젝트가 실행되면, 저장하는 모든 변경 사항이 브라우저에 실시간으로 업데이트된다는 것입니다.

프로젝트를 실행하려면 `starter-files` 폴더의 루트 디렉터리로 이동하고 터미널에서 `npm install`을 실행하여 프로젝트의 종속성을 설치합니다.

```bash
cd starter-files
npm install
```

설치가 완료되면 터미널에서 `npm start`를 실행합니다:

```bash
npm start
```

이렇게 하면 브라우저에서 [http://localhost:3000/](http://localhost:3000/)이 열리고 프로젝트의 프런트엔드가 표시됩니다. 하나의 필드(스마트 계약에 저장된 메시지를 업데이트하는 곳), "지갑 연결" 버튼, "업데이트" 버튼으로 구성되어야 합니다.

두 버튼 중 하나를 클릭해 보면 작동하지 않는 것을 알 수 있습니다. 아직 해당 기능을 프로그래밍해야 하기 때문입니다.

#### `HelloWorld.js` 구성 요소 {#the-helloworld-js-component}

편집기에서 `src` 폴더로 다시 돌아가 `HelloWorld.js` 파일을 엽니다. 이 파일은 우리가 작업할 기본 React 컴포넌트이므로 파일의 모든 내용을 이해하는 것이 매우 중요합니다.

이 파일의 맨 위에는 React 라이브러리, useEffect 및 useState 후크, `./util/interact.js`의 일부 항목(곧 자세히 설명하겠습니다!), 그리고 Alchemy 로고를 포함하여 프로젝트를 실행하는 데 필요한 여러 가져오기 문이 있습니다.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

다음으로, 특정 이벤트 후에 업데이트할 상태 변수가 있습니다.

```javascript
// HelloWorld.js

//상태 변수
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("네트워크에 연결되지 않았습니다.")
const [newMessage, setNewMessage] = useState("")
```

각 변수가 나타내는 내용은 다음과 같습니다.

- `walletAddress` - 사용자의 지갑 주소를 저장하는 문자열
- `status`- 사용자가 탈중앙화앱과 상호 작용하는 방법을 안내하는 유용한 메시지를 저장하는 문자열
- `message` - 스마트 계약의 현재 메시지를 저장하는 문자열
- `newMessage` - 스마트 계약에 작성될 새 메시지를 저장하는 문자열

상태 변수 다음에는 아직 구현되지 않은 다섯 개의 함수가 보입니다: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed`, `onUpdatePressed`. 각 함수의 역할은 다음과 같습니다.

```javascript
// HelloWorld.js

//한 번만 호출됨
useEffect(async () => {
  //TODO: 구현
}, [])

function addSmartContractListener() {
  //TODO: 구현
}

function addWalletListener() {
  //TODO: 구현
}

const connectWalletPressed = async () => {
  //TODO: 구현
}

const onUpdatePressed = async () => {
  //TODO: 구현
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 컴포넌트가 렌더링된 후 호출되는 React 후크입니다. 빈 배열 `[]` 속성이 전달되었기 때문에(4번째 줄 참조), 컴포넌트의 _첫 번째_ 렌더링에서만 호출됩니다. 여기에서는 스마트 계약에 저장된 현재 메시지를 로드하고, 스마트 계약 및 지갑 리스너를 호출하며, 지갑이 이미 연결되었는지 여부를 반영하도록 UI를 업데이트합니다.
- `addSmartContractListener` - 이 함수는 HelloWorld 계약의 `UpdatedMessages` 이벤트를 감시하고 스마트 계약의 메시지가 변경될 때 UI를 업데이트하는 리스너를 설정합니다.
- `addWalletListener` - 이 함수는 사용자가 지갑을 연결 해제하거나 주소를 전환하는 등 사용자의 MetaMask 지갑 상태 변경을 감지하는 리스너를 설정합니다.
- `connectWalletPressed` - 이 함수는 사용자의 MetaMask 지갑을 탈중앙화앱에 연결할 때 호출됩니다.
- `onUpdatePressed` - 이 함수는 사용자가 스마트 계약에 저장된 메시지를 업데이트하고 싶을 때 호출됩니다.

이 파일의 끝부분에는 컴포넌트의 UI가 있습니다.

```javascript
// HelloWorld.js

//컴포넌트의 UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "연결됨: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>지갑 연결</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>현재 메시지:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>새 메시지:</h2>

    <div>
      <input
        type="text"
        placeholder="스마트 계약의 메시지를 업데이트하세요."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        업데이트
      </button>
</div>
 
</div>
)
```

이 코드를 자세히 살펴보면 UI에서 다양한 상태 변수를 사용하는 위치를 알 수 있습니다.

- 6-12줄에서 사용자의 지갑이 연결된 경우(즉, `walletAddress.length > 0`), ID가 "walletButton"인 버튼에 사용자의 `walletAddress`의 축약된 버전을 표시하고, 그렇지 않으면 "지갑 연결"이라고만 표시합니다.
- 17번 줄에는 `message` 문자열에 캡처된 스마트 계약에 저장된 현재 메시지를 표시합니다.
- 23-26줄에서는 [제어된 컴포넌트](https://legacy.reactjs.org/docs/forms.html#controlled-components)를 사용하여 텍스트 필드의 입력이 변경될 때 `newMessage` 상태 변수를 업데이트합니다.

상태 변수 외에도 `publishButton` 및 `walletButton` ID를 가진 버튼을 각각 클릭하면 `connectWalletPressed` 및 `onUpdatePressed` 함수가 호출되는 것을 볼 수 있습니다.

마지막으로, 이 `HelloWorld.js` 컴포넌트가 어디에 추가되는지 알아보겠습니다.

React의 메인 컴포넌트로 다른 모든 컴포넌트의 컨테이너 역할을 하는 `App.js` 파일로 이동하면, 7번째 줄에 `HelloWorld.js` 컴포넌트가 주입된 것을 볼 수 있습니다.

마지막으로, 제공된 또 다른 파일인 `interact.js` 파일을 확인해 보겠습니다.

#### `interact.js` 파일 {#the-interact-js-file}

[M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 패러다임을 따르기 위해, 탈중앙화앱의 로직, 데이터, 규칙을 관리하는 모든 함수를 포함하는 별도의 파일을 원할 것입니다. 그리고 이 함수들을 프런트엔드(`HelloWorld.js` 컴포넌트)로 내보낼 수 있어야 합니다.

👆🏽이것이 바로 `interact.js` 파일의 정확한 목적입니다!

`src` 디렉터리의 `util` 폴더로 이동하면, 모든 스마트 계약 상호 작용 및 지갑 함수와 변수를 포함할 `interact.js`라는 파일이 포함된 것을 볼 수 있습니다.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

파일 상단에서 `helloWorldContract` 객체가 주석 처리된 것을 볼 수 있습니다. 이 튜토리얼의 뒷부분에서 이 객체의 주석을 해제하고 이 변수에 스마트 계약을 인스턴스화한 다음, `HelloWorld.js` 컴포넌트로 내보낼 것입니다.

`helloWorldContract` 객체 뒤에 있는 네 개의 미구현 함수는 다음을 수행합니다.

- `loadCurrentMessage` - 이 함수는 스마트 계약에 저장된 현재 메시지를 로드하는 로직을 처리합니다. [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)를 사용하여 Hello World 스마트 계약에 _읽기_ 호출을 합니다.
- `connectWallet` - 이 함수는 사용자의 MetaMask를 탈중앙화앱에 연결합니다.
- `getCurrentWalletConnected` - 이 함수는 페이지 로드 시 이더리움 계정이 이미 탈중앙화앱에 연결되어 있는지 확인하고 그에 따라 UI를 업데이트합니다.
- `updateMessage` - 이 함수는 스마트 계약에 저장된 메시지를 업데이트합니다. Hello World 스마트 계약에 _쓰기_ 호출을 하므로, 사용자의 MetaMask 지갑은 메시지를 업데이트하기 위해 이더리움 트랜잭션에 서명해야 합니다.

이제 무엇을 다루고 있는지 이해했으니, 스마트 계약에서 어떻게 읽어오는지 알아봅시다!

### 3단계: 스마트 계약에서 데이터 읽기 {#step-3-read-from-your-smart-contract}

스마트 계약에서 읽으려면 다음을 성공적으로 설정해야 합니다.

- 이더리움 체인에 대한 API 연결
- 로드된 스마트 계약 인스턴스
- 스마트 계약 함수를 호출하는 함수
- 스마트 계약에서 읽고 있는 데이터가 변경될 때 업데이트를 감시하는 리스너

많은 단계처럼 들릴 수 있지만, 걱정하지 마세요! 각 단계를 하나씩 안내해 드리겠습니다! :\)

#### 이더리움 체인에 API 연결 설정하기 {#establish-an-api-connection-to-the-ethereum-chain}

이 튜토리얼 2부에서 [Alchemy Web3 키를 사용하여 스마트 계약에서 읽어왔던](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) 것을 기억하시나요? 체인에서 읽기 위해 탈중앙화앱에서도 Alchemy 웹3 키가 필요합니다.

아직 설치하지 않았다면, `starter-files`의 루트 디렉터리로 이동하여 터미널에서 다음을 실행하여 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)를 설치하세요.

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)는 [Web3.js](https://docs.web3js.org/)의 래퍼로, 향상된 API 메서드와 기타 중요한 이점을 제공하여 웹3 개발자로서의 삶을 더 쉽게 만듭니다. 최소한의 구성만으로 바로 앱에서 사용할 수 있도록 설계되었습니다!

그런 다음 프로젝트 디렉터리에 [dotenv](https://www.npmjs.com/package/dotenv) 패키지를 설치하여 가져온 후 API 키를 안전하게 보관할 수 있도록 합니다.

```text
npm install dotenv --save
```

탈중앙화앱에서는 HTTP API 키 대신 **웹소켓 API 키를 사용할 것**입니다. 이를 통해 스마트 계약에 저장된 메시지가 변경될 때 감지하는 리스너를 설정할 수 있습니다.

API 키를 받으면 루트 디렉터리에 `.env` 파일을 만들고 Alchemy 웹소켓 URL을 추가하세요. 그 후 `.env` 파일은 다음과 같이 보일 것입니다.

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

이제 탈중앙화앱에서 Alchemy 웹3 엔드포인트를 설정할 준비가 되었습니다! 이제 `util` 폴더 안에 있는 `interact.js`로 돌아가서 파일 상단에 다음 코드를 추가합니다.

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

위에서는 먼저 `.env` 파일에서 Alchemy 키를 가져온 다음 `alchemyKey`를 `createAlchemyWeb3`에 전달하여 Alchemy 웹3 엔드포인트를 설정했습니다.

이 엔드포인트가 준비되었으니, 이제 스마트 계약을 로드할 시간입니다!

#### Hello World 스마트 계약 로드하기 {#loading-your-hello-world-smart-contract}

Hello World 스마트 계약을 로드하려면 계약 주소와 ABI가 필요하며, [이 튜토리얼 3부](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)를 완료했다면 두 가지 모두 Etherscan에서 찾을 수 있습니다.

#### Etherscan에서 계약 ABI를 가져오는 방법 {#how-to-get-your-contract-abi-from-etherscan}

이 튜토리얼의 3부를 건너뛰었다면 [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) 주소의 HelloWorld 계약을 사용할 수 있습니다. ABI는 [여기](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)에서 찾을 수 있습니다.

계약 ABI는 계약이 어떤 함수를 호출할지 지정하고, 함수가 예상하는 형식으로 데이터를 반환하도록 보장하는 데 필요합니다. 계약 ABI를 복사한 후, `src` 디렉터리에 `contract-abi.json`이라는 JSON 파일로 저장합니다.

contract-abi.json은 src 폴더에 저장되어야 합니다.

계약 주소, ABI, Alchemy 웹3 엔드포인트를 사용하여 [contract 메서드](https://docs.web3js.org/api/web3-eth-contract/class/Contract)를 통해 스마트 계약 인스턴스를 로드할 수 있습니다. `interact.js` 파일에 계약 ABI를 가져오고 계약 주소를 추가합니다.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

이제 드디어 `helloWorldContract` 변수의 주석을 해제하고 AlchemyWeb3 엔드포인트를 사용하여 스마트 계약을 로드할 수 있습니다.

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

요약하자면, `interact.js`의 첫 12줄은 이제 다음과 같아야 합니다.

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

이제 계약이 로드되었으니 `loadCurrentMessage` 함수를 구현할 수 있습니다!

#### `interact.js` 파일에 `loadCurrentMessage` 구현하기 {#implementing-loadCurrentMessage-in-your-interact-js-file}

이 함수는 매우 간단합니다. 간단한 비동기 웹3 호출을 하여 계약에서 읽어올 것입니다. 함수는 스마트 계약에 저장된 메시지를 반환합니다.

`interact.js` 파일의 `loadCurrentMessage`를 다음과 같이 업데이트합니다.

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

이 스마트 계약을 UI에 표시하고 싶으므로, `HelloWorld.js` 컴포넌트의 `useEffect` 함수를 다음과 같이 업데이트합시다.

```javascript
// HelloWorld.js

//한 번만 호출됨
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

컴포넌트의 첫 번째 렌더링 중에 `loadCurrentMessage`가 한 번만 호출되기를 원합니다. 곧 `addSmartContractListener`를 구현하여 스마트 계약의 메시지가 변경된 후 UI를 자동으로 업데이트할 것입니다.

리스너에 대해 자세히 알아보기 전에, 지금까지의 결과를 확인해 봅시다! `HelloWorld.js`와 `interact.js` 파일을 저장한 다음 [http://localhost:3000/](http://localhost:3000/)으로 이동하세요.

현재 메시지가 더 이상 "네트워크에 연결되지 않았습니다."라고 표시되지 않는 것을 볼 수 있습니다. 대신 스마트 계약에 저장된 메시지를 반영합니다. 멋져요!

#### 이제 UI가 스마트 계약에 저장된 메시지를 반영해야 합니다. {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

이제 그 리스너에 대해 이야기해 봅시다...

#### `addSmartContractListener` 구현하기 {#implement-addsmartcontractlistener}

[이 튜토리얼 시리즈의 1부](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)에서 작성한 `HelloWorld.sol` 파일을 다시 생각해 보면, 스마트 계약의 `update` 함수가 호출된 후 `UpdatedMessages`라는 스마트 계약 이벤트가 발생한다는 것을 기억할 것입니다(9번과 27번 줄 참조).

```javascript
// HelloWorld.sol

// 시맨틱 버저닝을 사용하여 Solidity 버전을 지정합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// 'HelloWorld'라는 계약을 정의합니다.
// 계약은 함수와 데이터(그 상태)의 모음입니다. 배포되면, 계약은 이더리움 블록체인의 특정 주소에 위치하게 됩니다. 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //업데이트 함수가 호출될 때 발생합니다
   //스마트 계약 이벤트는 계약이 블록체인에서 발생한 일을 앱 프론트엔드에 전달하는 방법으로, 특정 이벤트를 '수신'하고 이벤트가 발생할 때 조치를 취할 수 있습니다.
   event UpdatedMessages(string oldStr, string newStr);

   // 'string' 타입의 상태 변수 `message`를 선언합니다.
   // 상태 변수는 값이 계약 스토리지에 영구적으로 저장되는 변수입니다. `public` 키워드는 변수를 계약 외부에서 액세스할 수 있도록 하고 다른 계약이나 클라이언트가 값을 액세스하기 위해 호출할 수 있는 함수를 생성합니다.
   string public message;

   // 많은 클래스 기반 객체 지향 언어와 마찬가지로 생성자는 계약 생성 시에만 실행되는 특수 함수입니다.
   // 생성자는 계약의 데이터를 초기화하는 데 사용됩니다. 자세히 알아보기:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 문자열 인수 `initMessage`를 수락하고 계약의 `message` 스토리지 변수에 값을 설정합니다).
      message = initMessage;
   }

   // 문자열 인수를 허용하고 `message` 스토리지 변수를 업데이트하는 공개 함수입니다.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

스마트 계약 이벤트는 블록체인에서 어떤 일이 일어났음(즉, _이벤트_가 발생했음)을 계약이 프런트엔드 애플리케이션에 전달하는 방법으로, 특정 이벤트를 '수신'하고 해당 이벤트가 발생하면 조치를 취할 수 있습니다.

`addSmartContractListener` 함수는 특별히 Hello World 스마트 계약의 `UpdatedMessages` 이벤트를 수신하고, UI를 업데이트하여 새 메시지를 표시합니다.

`addSmartContractListener`를 다음과 같이 수정합니다.

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 메시지가 업데이트되었습니다!")
    }
  })
}
```

리스너가 이벤트를 감지할 때 어떤 일이 발생하는지 분석해 보겠습니다.

- 이벤트가 발생할 때 오류가 발생하면 `status` 상태 변수를 통해 UI에 반영됩니다.
- 그렇지 않으면 반환된 `data` 객체를 사용합니다. `data.returnValues`는 0부터 인덱싱된 배열로, 배열의 첫 번째 요소는 이전 메시지를 저장하고 두 번째 요소는 업데이트된 메시지를 저장합니다. 전체적으로, 성공적인 이벤트 발생 시 `message` 문자열을 업데이트된 메시지로 설정하고, `newMessage` 문자열을 지우고, `status` 상태 변수를 업데이트하여 스마트 계약에 새 메시지가 게시되었음을 반영합니다.

마지막으로, `HelloWorld.js` 컴포넌트의 첫 렌더링 시 초기화되도록 `useEffect` 함수에서 리스너를 호출합니다. 전체적으로 `useEffect` 함수는 다음과 같아야 합니다.

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

이제 스마트 계약에서 읽을 수 있게 되었으니, 쓰는 방법도 알아보면 좋겠습니다! 하지만 탈중앙화앱에 쓰려면 먼저 이더리움 지갑이 연결되어 있어야 합니다.

따라서 다음으로 이더리움 지갑(MetaMask)을 설정하고 탈중앙화앱에 연결하는 방법을 다루겠습니다!

### 4단계: 이더리움 지갑 설정하기 {#step-4-set-up-your-ethereum-wallet}

이더리움 체인에 무엇이든 쓰려면 사용자는 가상 지갑의 개인 키를 사용하여 트랜잭션에 서명해야 합니다. 이 튜토리얼에서는 최종 사용자에게 이 트랜잭션 서명을 매우 쉽게 만들어주는 브라우저 내 가상 지갑인 [MetaMask](https://metamask.io/)를 사용하여 이더리움 계정 주소를 관리합니다.

이더리움의 트랜잭션 작동 방식에 대해 더 자세히 알아보려면 이더리움 재단의 [이 페이지](/developers/docs/transactions/)를 확인하세요.

#### MetaMask 다운로드하기 {#download-metamask}

[여기](https://metamask.io/download)에서 MetaMask 계정을 무료로 다운로드하고 생성할 수 있습니다. 계정을 생성하거나 이미 계정이 있는 경우, 오른쪽 상단에서 'Goerli 테스트 네트워크'로 전환했는지 확인하세요(실제 돈을 다루지 않기 위함입니다).

#### 파우셋에서 이더 추가하기 {#add-ether-from-a-faucet}

이더리움 블록체인에서 트랜잭션에 서명하려면 가짜 Eth가 필요합니다. Eth를 얻으려면 [FaucETH](https://fauceth.komputing.org)로 이동하여 Goerli 계정 주소를 입력하고 '자금 요청'을 클릭한 다음, 드롭다운에서 '이더리움 테스트넷 Goerli'를 선택하고 마지막으로 '자금 요청' 버튼을 다시 클릭하세요. 곧 MetaMask 계정에서 Eth를 볼 수 있을 것입니다!

#### 잔액 확인하기 {#check-your-balance}

잔액이 있는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)를 사용하여 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 요청을 해봅시다. 그러면 지갑에 있는 Eth의 양이 반환됩니다. MetaMask 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답이 표시됩니다.

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**참고:** 이 결과는 eth가 아닌 wei 단위입니다. Wei는 ether의 최소 단위로 사용됩니다. wei에서 eth로의 변환은 1 eth = 10¹⁸ wei입니다. 따라서 0xde0b6b3a7640000을 10진수로 변환하면 1\*10¹⁸이 되고 이는 1eth와 같습니다.

휴! 우리의 가짜 돈이 다 있군요! 🤑

### 5단계: MetaMask를 UI에 연결하기 {#step-5-connect-metamask-to-your-UI}

이제 MetaMask 지갑이 설정되었으니, 탈중앙화앱을 연결해 봅시다!

#### `connectWallet` 함수 {#the-connectWallet-function}

`interact.js` 파일에서 `connectWallet` 함수를 구현한 다음, `HelloWorld.js` 컴포넌트에서 호출할 수 있습니다.

`connectWallet`을 다음과 같이 수정합시다.

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 위 텍스트 필드에 메시지를 작성하세요.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              브라우저에 가상 이더리움 지갑인 MetaMask를 설치해야 합니다.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

이 거대한 코드 블록은 정확히 무엇을 하는 걸까요?

먼저, 브라우저에서 `window.ethereum`이 활성화되어 있는지 확인합니다.

`window.ethereum`은 MetaMask 및 기타 지갑 제공업체에서 주입하는 글로벌 API로, 웹사이트가 사용자의 이더리움 계정을 요청할 수 있도록 합니다. 승인되면 사용자가 연결된 블록체인에서 데이터를 읽고, 사용자에게 메시지 및 트랜잭션 서명을 제안할 수 있습니다. 자세한 내용은 [MetaMask 문서](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)를 확인하세요!

`window.ethereum`이 _없으면_ MetaMask가 설치되지 않았다는 의미입니다. 그러면 `address`가 빈 문자열로 반환되고 `status` JSX 객체는 사용자가 MetaMask를 설치해야 한다는 것을 전달하는 JSON 객체가 반환됩니다.

이제 `window.ethereum`이 _있으면_ 상황이 흥미로워집니다.

try/catch 루프를 사용하여 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)를 호출하여 MetaMask에 연결을 시도합니다. 이 함수를 호출하면 브라우저에서 MetaMask가 열리고 사용자에게 지갑을 탈중앙화앱에 연결하라는 메시지가 표시됩니다.

- 사용자가 연결하기로 선택하면 `method: "eth_requestAccounts"`는 탈중앙화앱에 연결된 모든 사용자의 계정 주소를 포함하는 배열을 반환합니다. 전체적으로 `connectWallet` 함수는 이 배열의 _첫 번째_ `address`\(9번째 줄 참조\)와 사용자에게 스마트 계약에 메시지를 작성하라는 `status` 메시지를 포함하는 JSON 객체를 반환합니다.
- 사용자가 연결을 거부하면 JSON 객체는 반환된 `address`에 대해 빈 문자열을 포함하고 사용자가 연결을 거부했음을 반영하는 `status` 메시지를 포함합니다.

이제 이 `connectWallet` 함수를 작성했으므로 다음 단계는 `HelloWorld.js` 컴포넌트에서 호출하는 것입니다.

#### `connectWallet` 함수를 `HelloWorld.js` UI 컴포넌트에 추가하기 {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js`의 `connectWalletPressed` 함수로 이동하여 다음과 같이 업데이트하세요.

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

`interact.js` 파일에서 대부분의 기능이 `HelloWorld.js` 컴포넌트에서 어떻게 추상화되었는지 주목하세요. 이것은 M-V-C 패러다임을 준수하기 위함입니다!

`connectWalletPressed`에서 가져온 `connectWallet` 함수를 await 호출하고, 그 응답을 사용하여 상태 훅을 통해 `status` 및 `walletAddress` 변수를 업데이트합니다.

이제 두 파일(`HelloWorld.js` 및 `interact.js`)을 모두 저장하고 지금까지의 UI를 테스트해 보겠습니다.

[http://localhost:3000/](http://localhost:3000/) 페이지에서 브라우저를 열고 페이지 오른쪽 상단의 "지갑 연결" 버튼을 누르세요.

MetaMask가 설치되어 있다면, 지갑을 탈중앙화앱에 연결하라는 메시지가 표시됩니다. 연결 초대를 수락합니다.

이제 지갑 버튼에 주소가 연결되었음이 반영되는 것을 볼 수 있습니다! 좋아요 🔥

다음으로, 페이지를 새로고침해 보세요... 이상하네요. 지갑이 이미 연결되어 있음에도 불구하고 지갑 버튼은 MetaMask에 연결하라는 메시지를 표시합니다...

하지만 두려워하지 마세요! 이 주소 문제를 쉽게 해결할 수 있습니다(이해하셨나요?) `getCurrentWalletConnected`를 구현하여 주소가 이미 탈중앙화앱에 연결되어 있는지 확인하고 그에 따라 UI를 업데이트하면 됩니다!

#### `getCurrentWalletConnected` 함수 {#the-getcurrentwalletconnected-function}

`interact.js` 파일의 `getCurrentWalletConnected` 함수를 다음과 같이 업데이트하세요.

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 위 텍스트 필드에 메시지를 작성하세요.",
        }
      } else {
        return {
          address: "",
          status: "🦊 오른쪽 상단 버튼을 사용하여 MetaMask에 연결하세요.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              브라우저에 가상 이더리움 지갑인 MetaMask를 설치해야 합니다.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

이 코드는 이전 단계에서 작성한 `connectWallet` 함수와 _매우_ 유사합니다.

주요 차이점은 사용자가 지갑을 연결하기 위해 MetaMask를 여는 `eth_requestAccounts` 메서드를 호출하는 대신, 여기서는 현재 탈중앙화앱에 연결된 MetaMask 주소를 포함하는 배열을 반환하는 `eth_accounts` 메서드를 호출한다는 것입니다.

이 함수가 작동하는 것을 보려면 `HelloWorld.js` 컴포넌트의 `useEffect` 함수에서 호출해 봅시다.

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

`getCurrentWalletConnected` 호출의 응답을 사용하여 `walletAddress`와 `status` 상태 변수를 업데이트하는 것을 확인하세요.

이제 이 코드를 추가했으니 브라우저 창을 새로고침해 봅시다.

좋아요! 버튼에는 연결되었다고 표시되고 연결된 지갑 주소의 미리보기가 표시되어야 합니다 - 새로고침 후에도 말이죠!

#### `addWalletListener` 구현하기 {#implement-addwalletlistener}

탈중앙화앱 지갑 설정의 마지막 단계는 사용자가 연결을 끊거나 계정을 전환할 때와 같이 지갑의 상태가 변경될 때 UI가 업데이트되도록 지갑 리스너를 구현하는 것입니다.

`HelloWorld.js` 파일에서 `addWalletListener` 함수를 다음과 같이 수정하세요.

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 위 텍스트 필드에 메시지를 작성하세요.")
      } else {
        setWallet("")
        setStatus("🦊 오른쪽 상단 버튼을 사용하여 MetaMask에 연결하세요.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          브라우저에 가상 이더리움 지갑인 MetaMask를 설치해야 합니다.
        </a>
      </p>
    )
  }
}
```

이 시점에서는 여기서 무슨 일이 일어나고 있는지 이해하는 데 도움이 필요 없을 것이라고 확신하지만, 철저함을 위해 간단히 분석해 보겠습니다.

- 먼저, 함수는 `window.ethereum`이 활성화되어 있는지(즉, MetaMask가 설치되어 있는지) 확인합니다.
  - 그렇지 않다면, `status` 상태 변수를 사용자가 MetaMask를 설치하도록 유도하는 JSX 문자열로 설정합니다.
  - 활성화된 경우, 3번째 줄에서 `window.ethereum.on("accountsChanged")` 리스너를 설정하여 사용자가 탈중앙화앱에 추가 계정을 연결하거나 계정을 전환하거나 계정 연결을 끊는 등 MetaMask 지갑의 상태 변화를 수신합니다. 연결된 계정이 하나 이상 있는 경우, `walletAddress` 상태 변수는 리스너가 반환한 `accounts` 배열의 첫 번째 계정으로 업데이트됩니다. 그렇지 않으면 `walletAddress`는 빈 문자열로 설정됩니다.

마지막으로 `useEffect` 함수에서 호출해야 합니다.

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

이것으로 끝입니다! 모든 지갑 기능을 성공적으로 프로그래밍했습니다! 이제 마지막 작업인 스마트 계약에 저장된 메시지 업데이트로 넘어갑시다!

### 6단계: `updateMessage` 함수 구현하기 {#step-6-implement-the-updateMessage-function}

자, 이제 마지막 단계에 도착했습니다! `interact.js` 파일의 `updateMessage`에서 다음을 수행할 것입니다.

1. 스마트 계약에 게시하려는 메시지가 유효한지 확인합니다
2. MetaMask를 사용하여 트랜잭션에 서명합니다
3. `HelloWorld.js` 프런트엔드 컴포넌트에서 이 함수를 호출합니다

오래 걸리지 않을 것입니다. 이 탈중앙화앱을 완성합시다!

#### 입력 오류 처리 {#input-error-handling}

당연히 함수 시작 부분에 일종의 입력 오류 처리를 하는 것이 합리적입니다.

MetaMask 확장 프로그램이 설치되지 않았거나, 지갑이 연결되지 않았거나(즉, 전달된 `주소`가 빈 문자열인 경우), `메시지`가 빈 문자열인 경우 함수가 조기에 반환되도록 하고 싶을 것입니다. `updateMessage`에 다음 오류 처리를 추가합시다.

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 블록체인에서 메시지를 업데이트하려면 MetaMask 지갑을 연결하세요.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ 메시지는 빈 문자열이 될 수 없습니다.",
    }
  }
}
```

이제 적절한 입력 오류 처리가 있으니, MetaMask를 통해 트랜잭션에 서명할 시간입니다!

#### 트랜잭션 서명하기 {#signing-our-transaction}

전통적인 웹3 이더리움 트랜잭션에 이미 익숙하다면 다음에 작성할 코드는 매우 친숙할 것입니다. 입력 오류 처리 코드 아래에 `updateMessage`에 다음을 추가합니다.

```javascript
// interact.js

//트랜잭션 매개변수 설정
const transactionParameters = {
  to: contractAddress, // 계약 게시 중을 제외하고 필수입니다.
  from: address, // 사용자의 활성 주소와 일치해야 합니다.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//트랜잭션 서명
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          Etherscan에서 트랜잭션 상태 보기!
        </a>
        <br />
        ℹ️ 트랜잭션이 네트워크에 의해 확인되면 메시지가
        자동으로 업데이트됩니다.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

어떤 일이 일어나는지 분석해 봅시다. 먼저, 트랜잭션 매개변수를 설정합니다. 여기서:

- `to`는 수신자 주소(우리의 스마트 계약)를 지정합니다.
- `from`은 트랜잭션의 서명자, 즉 함수에 전달된 `주소` 변수를 지정합니다.
- `data`는 Hello World 스마트 계약의 `update` 메서드에 대한 호출을 포함하며, `message` 문자열 변수를 입력으로 받습니다.

그런 다음, `window.ethereum.request`라는 await 호출을 통해 MetaMask에 트랜잭션 서명을 요청합니다. 11번과 12번 줄에서 eth 메서드 `eth_sendTransaction`을 지정하고 `transactionParameters`를 전달하는 것을 주목하세요.

이 시점에서 MetaMask가 브라우저에서 열리고 사용자에게 트랜잭션에 서명하거나 거부하라는 메시지를 표시합니다.

- 트랜잭션이 성공하면, 함수는 `status` JSX 문자열이 사용자에게 트랜잭션에 대한 자세한 정보를 Etherscan에서 확인하도록 안내하는 JSON 객체를 반환합니다.
- 트랜잭션이 실패하면, 함수는 `status` 문자열이 오류 메시지를 전달하는 JSON 객체를 반환합니다.

전체적으로 `updateMessage` 함수는 다음과 같아야 합니다.

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //입력 오류 처리
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 블록체인에서 메시지를 업데이트하려면 MetaMask 지갑을 연결하세요.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ 메시지는 빈 문자열이 될 수 없습니다.",
    }
  }

  //트랜잭션 매개변수 설정
  const transactionParameters = {
    to: contractAddress, // 계약 게시 중을 제외하고 필수입니다.
    from: address, // 사용자의 활성 주소와 일치해야 합니다.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //트랜잭션 서명
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            Etherscan에서 트랜잭션 상태 보기!
          </a>
          <br />
          ℹ️ 트랜잭션이 네트워크에 의해 확인되면 메시지가
          자동으로 업데이트됩니다.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

마지막으로, `updateMessage` 함수를 `HelloWorld.js` 컴포넌트에 연결해야 합니다.

#### `updateMessage`를 `HelloWorld.js` 프런트엔드에 연결하기 {#connect-updatemessage-to-the-helloworld-js-frontend}

`onUpdatePressed` 함수는 가져온 `updateMessage` 함수에 대한 await 호출을 하고 `status` 상태 변수를 수정하여 트랜잭션이 성공했는지 실패했는지를 반영해야 합니다.

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

매우 깔끔하고 간단합니다. 그리고 그거 아시나요... 탈중앙화앱이 완성되었습니다!!!

**업데이트** 버튼을 테스트해 보세요!

### 나만의 맞춤형 탈중앙화앱 만들기 {#make-your-own-custom-dapp}

와, 튜토리얼 끝까지 오셨네요! 요약하자면, 다음을 배웠습니다.

- MetaMask 지갑을 탈중앙화앱 프로젝트에 연결하기
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API를 사용하여 스마트 계약에서 데이터 읽기
- MetaMask를 사용하여 이더리움 트랜잭션 서명하기

이제 이 튜토리얼에서 배운 기술을 적용하여 자신만의 맞춤형 탈중앙화앱 프로젝트를 구축할 준비가 되었습니다! 언제나 그렇듯이 질문이 있으시면 [Alchemy Discord](https://discord.gg/gWuC7zB)에서 주저하지 말고 도움을 요청하세요. 🧙‍♂️

이 튜토리얼을 완료한 후, Twitter에서 [@alchemyplatform](https://twitter.com/AlchemyPlatform)을 태그하여 경험이 어땠는지 또는 피드백이 있는지 알려주세요!
