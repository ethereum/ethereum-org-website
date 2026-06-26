---
title: "NFT 작성 및 배포 방법 (NFT 튜토리얼 시리즈 1/3부)"
description: "이 튜토리얼은 이더리움과 IPFS(Inter Planetary File System)를 사용하여 대체 불가능한 토큰(ERC-721 토큰) 스마트 컨트랙트를 작성하고 배포하는 방법을 단계별로 안내하는 NFT 시리즈의 1부입니다."
author: "수미 무드길"
tags:
  - ERC-721
  - Alchemy
  - Solidity
  - 스마트 컨트랙트
skill: beginner
breadcrumb: "NFT 작성 및 배포"
lang: ko
published: 2021-04-22
---

NFT가 블록체인을 대중의 관심사로 끌어올리면서, 이더리움 블록체인에 자신만의 NFT 컨트랙트(ERC-721 토큰)를 배포하여 이러한 열풍을 직접 이해해 볼 수 있는 절호의 기회가 왔습니다!

Alchemy는 Makersplace(최근 크리스티 경매에서 6,900만 달러의 디지털 아트워크 판매 기록을 세움), Dapper Labs(NBA Top Shot 및 Crypto Kitties 제작사), 오픈씨(세계 최대 NFT 마켓플레이스), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable 등 NFT 분야의 가장 유명한 기업들을 지원하고 있다는 사실을 매우 자랑스럽게 생각합니다.

이 튜토리얼에서는 [메타마스크](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) 및 [Alchemy](https://alchemy.com/signup/eth)를 사용하여 Sepolia 테스트 네트워크에 ERC-721 스마트 컨트랙트를 생성하고 배포하는 과정을 살펴볼 것입니다(이 용어들이 아직 무슨 뜻인지 모르더라도 걱정하지 마세요. 차근차근 설명해 드릴 것입니다!).

이 튜토리얼의 2부에서는 스마트 컨트랙트를 사용하여 NFT를 발행하는 방법을 살펴보고, 3부에서는 메타마스크에서 NFT를 확인하는 방법을 설명합니다.

물론 진행 중에 궁금한 점이 있다면 언제든지 [Alchemy 디스코드](https://discord.gg/gWuC7zB)에 문의하거나 [Alchemy의 NFT API 문서](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)를 방문해 주세요!

## 1단계: 이더리움 네트워크에 연결하기 {#connect-to-ethereum}

이더리움 블록체인에 요청을 보내는 방법은 여러 가지가 있지만, 쉽게 진행하기 위해 자체 노드를 실행하지 않고도 이더리움 체인과 통신할 수 있게 해주는 블록체인 개발자 플랫폼이자 API인 [Alchemy](https://alchemy.com/signup/eth)의 무료 계정을 사용하겠습니다.

이 튜토리얼에서는 스마트 컨트랙트 배포 과정에서 내부적으로 어떤 일이 일어나는지 이해하기 위해 모니터링 및 분석을 위한 Alchemy의 개발자 도구도 활용할 것입니다. 아직 Alchemy 계정이 없다면 [여기](https://alchemy.com/signup/eth)에서 무료로 가입할 수 있습니다.

## 2단계: 앱(및 API 키) 생성하기 {#make-api-key}

Alchemy 계정을 생성한 후에는 앱을 생성하여 API 키를 발급받을 수 있습니다. 이를 통해 Sepolia 테스트 네트워크에 요청을 보낼 수 있습니다. 테스트 네트워크에 대해 더 자세히 알고 싶다면 [이 가이드](https://docs.alchemyapi.io/guides/choosing-a-network)를 확인해 보세요.

1. 내비게이션 바의 "Apps"에 마우스를 올리고 "Create App"을 클릭하여 Alchemy 대시보드의 "Create App" 페이지로 이동합니다.

![Create your app](./create-your-app.png)

2. 앱 이름을 지정하고(여기서는 "My First NFT!"로 지정했습니다), 간단한 설명을 추가한 다음, 체인(Chain)으로 "Ethereum"을 선택하고 네트워크로 "Sepolia"를 선택합니다. 머지 이후 다른 테스트넷은 더 이상 사용되지 않습니다.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. "Create app"을 클릭하면 완료됩니다! 아래 표에 앱이 나타날 것입니다.

## 3단계: 이더리움 계정(주소) 생성하기 {#create-eth-address}

트랜잭션을 보내고 받으려면 이더리움 계정이 필요합니다. 이 튜토리얼에서는 이더리움 계정 주소를 관리하는 데 사용되는 브라우저 내 가상 지갑인 메타마스크를 사용합니다. 이더리움에서 트랜잭션이 어떻게 작동하는지 더 자세히 이해하고 싶다면 이더리움 재단의 [이 페이지](/developers/docs/transactions/)를 확인해 보세요.

[여기](https://metamask.io/download)에서 메타마스크를 다운로드하고 계정을 무료로 생성할 수 있습니다. 계정을 생성할 때나 이미 계정이 있는 경우, 우측 상단에서 "Sepolia Test Network"로 전환했는지 확인하세요(실제 돈을 다루지 않기 위함입니다).

![Set Sepolia as your network](./metamask-goerli.png)

## 4단계: 퍼싯에서 이더 추가하기 {#step-4-add-ether-from-a-faucet}

테스트 네트워크에 스마트 컨트랙트를 배포하려면 가짜 ETH가 필요합니다. ETH를 얻으려면 Alchemy에서 호스팅하는 [Sepolia 퍼싯](https://sepoliafaucet.com/)으로 이동하여 로그인한 후 계정 주소를 입력하고 "Send Me ETH"를 클릭하세요. 곧 메타마스크 계정에서 ETH를 확인할 수 있을 것입니다!

## 5단계: 잔액 확인하기 {#check-balance}

잔액이 제대로 들어왔는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)를 사용하여 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 요청을 보내보겠습니다. 이 요청은 지갑에 있는 ETH의 양을 반환합니다. 메타마스크 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답을 볼 수 있습니다.

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **참고** 이 결과는 ETH가 아니라 Wei 단위입니다. Wei는 이더의 가장 작은 단위로 사용됩니다. Wei에서 ETH로의 변환 비율은 1 ETH = 10<sup>18</sup> Wei입니다. 따라서 0xde0b6b3a7640000을 십진수로 변환하면 1\*10<sup>18</sup> Wei가 되며, 이는 1 ETH와 같습니다.

휴! 가짜 돈이 모두 들어왔습니다.

## 6단계: 프로젝트 초기화하기 {#initialize-project}

먼저 프로젝트를 위한 폴더를 생성해야 합니다. 명령줄로 이동하여 다음을 입력하세요.

    mkdir my-nft
    cd my-nft

이제 프로젝트 폴더 안에 있으므로 npm init을 사용하여 프로젝트를 초기화하겠습니다. 아직 npm이 설치되어 있지 않다면 [이 지침](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)을 따르세요([Node.js](https://nodejs.org/en/download/)도 필요하므로 함께 다운로드하세요!).

    npm init

설치 질문에 어떻게 대답하든 크게 상관없습니다. 참고를 위해 저희가 입력한 내용은 다음과 같습니다.

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

package.json을 승인하면 준비가 완료됩니다!

## 7단계: [Hardhat](https://hardhat.org/getting-started/#overview) 설치하기 {#install-hardhat}

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버깅하기 위한 개발 환경입니다. 개발자가 라이브 체인에 배포하기 전에 로컬에서 스마트 컨트랙트와 탈중앙화 애플리케이션(dapp)을 구축할 때 도움을 줍니다.

my-nft 프로젝트 안에서 다음을 실행합니다.

    npm install --save-dev hardhat

[설치 지침](https://hardhat.org/getting-started/#overview)에 대한 자세한 내용은 이 페이지를 확인하세요.

## 8단계: Hardhat 프로젝트 생성하기 {#create-hardhat-project}

프로젝트 폴더 안에서 다음을 실행합니다.

    npx hardhat

그러면 환영 메시지와 함께 수행할 작업을 선택하는 옵션이 표시됩니다. "create an empty hardhat.config.js"를 선택하세요.

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

이렇게 하면 프로젝트의 모든 설정을 지정할 hardhat.config.js 파일이 생성됩니다(13단계에서 진행).

## 9단계: 프로젝트 폴더 추가하기 {#add-project-folders}

프로젝트를 체계적으로 관리하기 위해 두 개의 새 폴더를 생성하겠습니다. 명령줄에서 프로젝트의 루트 디렉터리로 이동하여 다음을 입력하세요.

    mkdir contracts
    mkdir scripts

- contracts/는 NFT 스마트 컨트랙트 코드를 보관할 곳입니다.

- scripts/는 스마트 컨트랙트를 배포하고 상호작용하기 위한 스크립트를 보관할 곳입니다.

## 10단계: 컨트랙트 작성하기 {#write-contract}

이제 환경 설정이 완료되었으니 더 흥미로운 작업인 <em>스마트 컨트랙트 코드 작성</em>으로 넘어가 보겠습니다!

선호하는 편집기(저희는 [VSCode](https://code.visualstudio.com/)를 추천합니다)에서 my-nft 프로젝트를 엽니다. 스마트 컨트랙트는 Solidity라는 언어로 작성되며, 이를 사용하여 MyNFT.sol 스마트 컨트랙트를 작성할 것입니다.‌

1. `contracts` 폴더로 이동하여 MyNFT.sol이라는 새 파일을 생성합니다.

2. 아래는 [오픈제플린](https://docs.openzeppelin.com/contracts/3.x/erc721) 라이브러리의 ERC-721 구현을 기반으로 한 NFT 스마트 컨트랙트 코드입니다. 아래 내용을 복사하여 MyNFT.sol 파일에 붙여넣으세요.

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) 기반 컨트랙트
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. 오픈제플린 컨트랙트 라이브러리에서 클래스를 상속받고 있으므로, 명령줄에서 `npm install @openzeppelin/contracts^4.0.0`를 실행하여 폴더에 라이브러리를 설치합니다.

그렇다면 이 코드는 정확히 <em>어떤 역할</em>을 할까요? 한 줄씩 분석해 보겠습니다.

스마트 컨트랙트의 맨 위에서 세 개의 [오픈제플린](https://openzeppelin.com/) 스마트 컨트랙트 클래스를 가져옵니다(import).

- @openzeppelin/contracts/token/ERC721/ERC721.sol에는 NFT 스마트 컨트랙트가 상속받을 ERC-721 표준의 구현이 포함되어 있습니다. (유효한 NFT가 되려면 스마트 컨트랙트가 ERC-721 표준의 모든 메서드를 구현해야 합니다.) 상속된 ERC-721 함수에 대해 더 자세히 알아보려면 [여기](https://eips.ethereum.org/EIPS/eip-721)에서 인터페이스 정의를 확인하세요.

- @openzeppelin/contracts/utils/Counters.sol은 1씩만 증가하거나 감소할 수 있는 카운터를 제공합니다. 스마트 컨트랙트는 카운터를 사용하여 발행된 NFT의 총 개수를 추적하고 새 NFT에 고유 ID를 설정합니다. (스마트 컨트랙트를 사용하여 발행된 각 NFT에는 고유 ID가 할당되어야 합니다. 여기서 고유 ID는 단순히 존재하는 NFT의 총 개수에 의해 결정됩니다. 예를 들어, 스마트 컨트랙트로 발행하는 첫 번째 NFT의 ID는 "1"이고, 두 번째 NFT의 ID는 "2"가 됩니다.)

- @openzeppelin/contracts/access/Ownable.sol은 스마트 컨트랙트에 [접근 제어](https://docs.openzeppelin.com/contracts/3.x/access-control)를 설정하여 스마트 컨트랙트의 소유자(본인)만 NFT를 발행할 수 있도록 합니다. (참고로 접근 제어를 포함하는 것은 전적으로 선택 사항입니다. 누구나 스마트 컨트랙트를 사용하여 NFT를 발행할 수 있게 하려면 10번째 줄의 Ownable과 17번째 줄의 onlyOwner를 제거하세요.)

가져오기(import) 구문 다음에는 커스텀 NFT 스마트 컨트랙트가 있는데, 놀랍게도 매우 짧습니다. 카운터, 생성자, 그리고 단일 함수만 포함되어 있습니다! 이는 NFT의 소유자를 반환하는 `ownerOf`나 한 계정에서 다른 계정으로 NFT의 소유권을 이전하는 `transferFrom`와 같이 NFT를 생성하는 데 필요한 대부분의 메서드를 구현하는 오픈제플린 컨트랙트를 상속받았기 때문입니다.

ERC-721 생성자에서 "MyNFT"와 "NFT"라는 두 개의 문자열을 전달하는 것을 볼 수 있습니다. 첫 번째 변수는 스마트 컨트랙트의 이름이고, 두 번째는 그 심볼입니다. 이 변수들의 이름은 원하는 대로 지정할 수 있습니다!

마지막으로 NFT를 발행할 수 있게 해주는 `mintNFT(address recipient, string memory tokenURI)` 함수가 있습니다! 이 함수는 두 개의 변수를 받습니다.

- `address recipient`는 새로 발행된 NFT를 받을 주소를 지정합니다.

- `string memory tokenURI`는 NFT의 메타데이터를 설명하는 JSON 문서로 확인되어야 하는 문자열입니다. NFT의 메타데이터는 이름, 설명, 이미지 및 기타 속성과 같이 구성 가능한 속성을 가질 수 있게 하여 NFT에 생명력을 불어넣는 핵심 요소입니다. 이 튜토리얼의 2부에서는 이 메타데이터를 구성하는 방법을 설명합니다.

`mintNFT`는 상속된 ERC-721 라이브러리에서 일부 메서드를 호출하며, 최종적으로 새로 발행된 NFT의 ID를 나타내는 숫자를 반환합니다.

## 11단계: 프로젝트에 메타마스크 및 Alchemy 연결하기 {#connect-metamask-and-alchemy}

이제 메타마스크 지갑과 Alchemy 계정을 생성하고 스마트 컨트랙트를 작성했으므로, 이 세 가지를 연결할 차례입니다.

가상 지갑에서 전송되는 모든 트랜잭션에는 고유한 개인 키를 사용한 서명이 필요합니다. 프로그램에 이 권한을 제공하기 위해 환경 파일에 개인 키(및 Alchemy API 키)를 안전하게 저장할 수 있습니다.

트랜잭션 전송에 대해 더 자세히 알아보려면 Web3를 사용하여 트랜잭션을 전송하는 방법에 대한 [이 튜토리얼](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)을 확인하세요.

먼저 프로젝트 디렉터리에 dotenv 패키지를 설치합니다.

    npm install dotenv --save

그런 다음 프로젝트의 루트 디렉터리에 `.env` 파일을 생성하고, 여기에 메타마스크 개인 키와 HTTP Alchemy API URL을 추가합니다.

- 메타마스크에서 개인 키를 내보내려면 [이 지침](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)을 따르세요.

- HTTP Alchemy API URL을 가져와 클립보드에 복사하려면 아래를 참조하세요.

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

이제 `.env` 파일은 다음과 같은 모습이어야 합니다.

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

이들을 실제 코드에 연결하기 위해 13단계의 hardhat.config.js 파일에서 이 변수들을 참조할 것입니다.

<EnvWarningBanner />

## 12단계: Ethers.js 설치하기 {#install-ethers}

Ethers.js는 [표준 JSON-RPC 메서드](/developers/docs/apis/json-rpc/)를 더 사용자 친화적인 메서드로 래핑하여 이더리움과 상호작용하고 요청을 보내는 것을 더 쉽게 만들어주는 라이브러리입니다.

Hardhat은 추가 도구 및 확장된 기능을 위해 [플러그인](https://hardhat.org/plugins/)을 통합하는 것을 매우 쉽게 만들어줍니다. 컨트랙트 배포를 위해 [Ethers 플러그인](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)을 활용할 것입니다([Ethers.js](https://github.com/ethers-io/ethers.js/)에는 매우 깔끔한 컨트랙트 배포 메서드가 있습니다).

프로젝트 디렉터리에서 다음을 입력하세요.

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

다음 단계에서 hardhat.config.js에 ethers를 요구(require)할 것입니다.

## 13단계: hardhat.config.js 업데이트하기 {#update-hardhat-config}

지금까지 여러 종속성과 플러그인을 추가했으므로, 이제 프로젝트가 이 모든 것을 알 수 있도록 hardhat.config.js를 업데이트해야 합니다.

hardhat.config.js를 다음과 같이 업데이트하세요.

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## 14단계: 컨트랙트 컴파일하기 {#compile-contract}

지금까지 모든 것이 제대로 작동하는지 확인하기 위해 컨트랙트를 컴파일해 보겠습니다. 컴파일 작업은 내장된 Hardhat 작업 중 하나입니다.

명령줄에서 다음을 실행합니다.

    npx hardhat compile

소스 파일에 SPDX 라이선스 식별자가 제공되지 않았다는 경고가 나타날 수 있지만 걱정할 필요는 없습니다. 다른 모든 것은 정상적으로 보일 것입니다! 그렇지 않다면 언제든지 [Alchemy 디스코드](https://discord.gg/u72VCg3)에 메시지를 남겨주세요.

## 15단계: 배포 스크립트 작성하기 {#write-deploy}

이제 컨트랙트 작성이 완료되었고 구성 파일도 준비되었으므로, 컨트랙트 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 생성하고 다음 내용을 추가합니다.

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // 배포를 시작하여 컨트랙트 객체로 이행되는 프로미스를 반환합니다.
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat은 [컨트랙트 튜토리얼](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)에서 이 코드의 각 줄이 어떤 역할을 하는지 훌륭하게 설명하고 있으며, 여기서는 그 설명을 채택했습니다.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Ethers.js의 ContractFactory는 새로운 스마트 컨트랙트를 배포하는 데 사용되는 추상화이므로, 여기서 MyNFT는 NFT 컨트랙트 인스턴스를 위한 팩토리입니다. hardhat-ethers 플러그인을 사용할 때 ContractFactory와 Contract 인스턴스는 기본적으로 첫 번째 서명자에 연결됩니다.

    const myNFT = await MyNFT.deploy();

ContractFactory에서 deploy()를 호출하면 배포가 시작되고 Contract로 확인되는 Promise를 반환합니다. 이것은 스마트 컨트랙트 함수의 각 메서드를 가지고 있는 객체입니다.

## 16단계: 컨트랙트 배포하기 {#deploy-contract}

드디어 스마트 컨트랙트를 배포할 준비가 되었습니다! 프로젝트 디렉터리의 루트로 다시 이동하여 명령줄에서 다음을 실행합니다.

    npx hardhat --network sepolia run scripts/deploy.js

그러면 다음과 같은 내용이 표시될 것입니다.

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

[Sepolia Etherscan](https://sepolia.etherscan.io/)으로 이동하여 컨트랙트 주소를 검색하면 성공적으로 배포된 것을 확인할 수 있습니다. 즉시 보이지 않더라도 시간이 조금 걸릴 수 있으니 잠시 기다려 주세요. 트랜잭션은 다음과 같은 모습일 것입니다.

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From 주소는 메타마스크 계정 주소와 일치해야 하며 To 주소에는 "Contract Creation"이라고 표시됩니다. 트랜잭션을 클릭하면 To 필드에서 컨트랙트 주소를 볼 수 있습니다.

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

야호! 방금 이더리움(테스트넷) 체인에 NFT 스마트 컨트랙트를 배포했습니다!

내부적으로 어떤 일이 일어나고 있는지 이해하기 위해 [Alchemy 대시보드](https://dashboard.alchemyapi.io/explorer)의 Explorer 탭으로 이동해 보겠습니다. 여러 개의 Alchemy 앱이 있는 경우 앱별로 필터링하여 "MyNFT"를 선택하세요.

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

여기서 .deploy() 함수를 호출했을 때 Hardhat/Ethers가 내부적으로 수행한 몇 가지 JSON-RPC 호출을 볼 수 있습니다. 여기서 주목해야 할 두 가지 중요한 호출은 실제로 Sepolia 체인에 스마트 컨트랙트를 기록하라는 요청인 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)과 해시가 주어졌을 때 트랜잭션에 대한 정보를 읽어오라는 요청인 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)(트랜잭션을 보낼 때의 일반적인 패턴)입니다. 트랜잭션 전송에 대해 더 자세히 알아보려면 [Web3를 사용하여 트랜잭션을 전송하는 방법](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)에 대한 이 튜토리얼을 확인하세요.

이것으로 이 튜토리얼의 1부를 마칩니다. [2부에서는 NFT를 발행하여 스마트 컨트랙트와 실제로 상호작용해 보고](/developers/tutorials/how-to-mint-an-nft/), [3부에서는 이더리움 지갑에서 NFT를 확인하는 방법을 보여드리겠습니다](/developers/tutorials/how-to-view-nft-in-metamask/)!