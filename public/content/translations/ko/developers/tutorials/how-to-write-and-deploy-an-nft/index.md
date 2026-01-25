---
title: NFT 작성 및 배포 방법(NFT 튜토리얼 시리즈 1/3부)
description: 이 튜토리얼은 NFT 시리즈의 1부이며, 이더리움과 IPFS(Inter Planetary File System)를 사용하여 대체 불가능 토큰(ERC-721 토큰) 스마트 계약을 작성하고 배포하는 방법을 단계별로 안내합니다.
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "솔리디티", "스마트 컨트랙트" ]
skill: beginner
lang: ko
published: 2021-04-22
---

NFT 덕분에 블록체인이 대중의 주목을 받게 되면서, 이제 이더리움 블록체인에 자신만의 NFT 계약(ERC-721 토큰)을 게시하여 직접 그 열풍을 이해해 볼 아주 좋은 기회입니다!

Alchemy는 Makersplace(최근 크리스티 경매에서 6,900만 달러에 디지털 아트워크 판매 기록을 세움), Dapper Labs(NBA Top Shot & Crypto Kitties 제작사), OpenSea(세계 최대 NFT 마켓플레이스), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable 등 NFT 분야의 가장 큰 기업들을 지원하는 것을 매우 자랑스럽게 생각합니다.

이 튜토리얼에서는 [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) 및 [Alchemy](https://alchemy.com/signup/eth)를 사용하여 Sepolia 테스트넷에 ERC-721 스마트 계약을 생성하고 배포하는 과정을 안내합니다(아직 이 내용이 무엇을 의미하는지 이해하지 못하더라도 걱정하지 마세요. 저희가 설명해 드릴 것입니다!).

이 튜토리얼 2부에서는 스마트 계약을 사용해 NFT를 발행하는 방법을 살펴보고, 3부에서는 MetaMask에서 자신의 NFT를 확인하는 방법을 설명합니다.

물론, 언제든지 질문이 있으시면 주저하지 마시고 [Alchemy Discord](https://discord.gg/gWuC7zB)에 문의하시거나 [Alchemy의 NFT API 문서](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)를 방문해주세요!

## 1단계: 이더리움 네트워크에 연결하기 {#connect-to-ethereum}

이더리움 블록체인에 요청하는 방법은 여러 가지가 있지만, 편의를 위해 블록체인 개발자 플랫폼 및 API인 [Alchemy](https://alchemy.com/signup/eth)의 무료 계정을 사용하겠습니다. 이를 통해 자체 노드를 실행하지 않고도 이더리움 체인과 통신할 수 있습니다.

또한 이 튜토리얼에서는 스마트 계약 배포의 내부에서 어떤 일이 일어나는지 이해하기 위해 Alchemy의 모니터링 및 분석용 개발자 도구를 활용할 것입니다. 아직 Alchemy 계정이 없다면 [여기](https://alchemy.com/signup/eth)에서 무료로 가입할 수 있습니다.

## 2단계: 앱(및 API 키) 만들기 {#make-api-key}

Alchemy 계정을 생성한 후에는 앱을 생성하여 API 키를 생성할 수 있습니다. 이를 통해 Sepolia 테스트넷에 요청을 보낼 수 있습니다. 테스트넷에 대해 더 자세히 알고 싶으시면 [이 가이드](https://docs.alchemyapi.io/guides/choosing-a-network)를 확인하세요.

1. 네비게이션 바의 "Apps" 위에 마우스를 놓고 "Create App"을 클릭하여 Alchemy 대시보드의 "Create App" 페이지로 이동합니다.

![앱 만들기](./create-your-app.png)

2. 앱 이름을 지정하고(저희는 “My First NFT!”로 정했습니다), 간단한 설명을 입력한 다음, 체인으로 “Ethereum”을, 네트워크로 “Sepolia”를 선택하세요. 병합 이후 다른 테스트넷은 지원이 중단되었습니다.

![앱 구성 및 게시](./alchemy-explorer-sepolia.png)

3. "Create app" 을 클릭하세요. 당신의 앱이 아래 테이블에 나타날겁니다!

## 3단계: 이더리움 계정 생성(주소) {#create-eth-address}

거래를 보내고 받기 위해서는 이더리움 계정이 필요합니다. 이 튜토리얼에서는 이더리움 계정 주소를 관리하는 데 사용되는 브라우저의 가상 지갑인 MetaMask를 사용합니다. 이더리움의 트랜잭션 작동 방식에 대해 더 자세히 알아보려면 이더리움 재단의 [이 페이지](/developers/docs/transactions/)를 확인하세요.

[여기](https://metamask.io/download)에서 MetaMask 계정을 무료로 다운로드하고 생성할 수 있습니다. 계정을 생성하거나 이미 계정이 있는 경우, 오른쪽 상단의 “Sepolia 테스트넷”으로 전환해야 합니다(실제 돈을 다루지 않도록 하기 위함입니다).

![Sepolia를 네트워크로 설정](./metamask-goerli.png)

## 4단계: 파우셋에서 이더 추가하기 {#step-4-add-ether-from-a-faucet}

스마트 컨트랙트를 테스트 네트워크에 배포하려면 가짜 ETH가 필요합니다. ETH를 받으려면 Alchemy에서 호스팅하는 [Sepolia 파우셋](https://sepoliafaucet.com/)으로 이동하여 로그인하고 계정 주소를 입력한 다음 “Send Me ETH”를 클릭하세요. 조금만 기다리면 곧 MetaMask 계정에 ETH가 표시됩니다!

## 5단계: 잔액 확인하기 {#check-balance}

잔액이 있는지 다시 확인하기 위해 [Alchemy의 composer 도구](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)를 사용하여 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 요청을 해봅시다. 이것은 지갑에 있는 ETH의 양을 반환할 것입니다. MetaMask 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답이 표시됩니다.

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **참고** 이 결과는 ETH가 아닌 wei 단위입니다. Wei는 ether의 최소 단위로 사용됩니다. wei에서 ETH로 변환하면 1 eth = 10<sup>18</sup> wei입니다. 따라서 0xde0b6b3a7640000을 10진수로 변환하면 1\*10<sup>18</sup> wei, 즉 1 ETH가 됩니다.

휴! 우리의 가짜 돈이 다 있군요.

## 6단계: 프로젝트 초기화하기 {#initialize-project}

먼저 프로젝트를 위한 폴더를 만들어야 합니다. 커맨드 라인으로 이동하여 다음을 입력합니다.

    ```
    mkdir my-nft
    cd my-nft
    ```

이제 프로젝트 폴더 안에 있으므로 npm init를 사용하여 프로젝트를 초기화합니다. npm이 아직 설치되지 않았다면 [이 지침](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)을 따르세요([Node.js](https://nodejs.org/en/download/)도 필요하니 함께 다운로드하세요!).

    ```
    npm init
    ```

설치 질문에 어떻게 답하는지는 중요하지 않습니다. 참고로 저희는 다음과 같이 진행했습니다.

```json
    package name: (my-nft)
    version: (1.0.0)
    description: 나의 첫 NFT!
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
      "description": "나의 첫 NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

package.json을 승인하면 준비가 끝납니다!

## 7단계: [Hardhat](https://hardhat.org/getting-started/#overview) 설치하기 {#install-hardhat}

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버그하기 위한 개발 환경입니다. 실제 블록체인에 배포하기 전에 로컬에서 스마트 컨트랙트 및 dApp을 구축할 때 사용됩니다.

my-nft 프로젝트 내에서 다음을 실행합니다.

    ```
    npm install --save-dev hardhat
    ```

설치 지침에 대한 자세한 내용은 [이 페이지](https://hardhat.org/getting-started/#overview)를 확인하세요.

## 8단계: Hardhat 프로젝트 생성하기 {#create-hardhat-project}

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
    👷 Hardhat v2.0.11에 오신 것을 환영합니다 👷‍
    ? 무엇을 하시겠습니까? …
    샘플 프로젝트 생성
    ❯ 빈 hardhat.config.js 생성
    종료
    ```

그러면 hardhat.config.js 파일이 생성되며, 여기에 프로젝트의 모든 설정을 명시할 것입니다(13단계에서).

## 9단계: 프로젝트 폴더 추가하기 {#add-project-folders}

프로젝트를 체계적으로 정리하기 위해 두 개의 새 폴더를 만들겠습니다. 명령줄에서 프로젝트의 루트 디렉터리로 이동하고 다음을 입력합니다.

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/는 NFT 스마트 계약 코드를 보관할 곳입니다.

- scripts/는 스마트 계약을 배포하고 상호 작용하는 스크립트를 보관할 곳입니다.

## 10단계: 계약 작성하기 {#write-contract}

이제 환경 설정이 끝났으니 더 흥미로운 작업, 즉 _스마트 계약 코드 작성_을 시작하겠습니다!

자주 사용하는 편집기에서 my-nft 프로젝트를 여세요(저희는 [VSCode](https://code.visualstudio.com/)를 선호합니다). 스마트 계약은 MyNFT.sol 스마트 계약을 작성하는 데 사용할 Solidity라는 언어로 작성됩니다.‌

1. `contracts` 폴더로 이동하여 MyNFT.sol이라는 새 파일을 만듭니다.

2. 아래는 [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) 라이브러리의 ERC-721 구현을 기반으로 한 저희의 NFT 스마트 계약 코드입니다. 아래 내용을 복사하여 MyNFT.sol 파일에 붙여넣습니다.

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) 기반 계약
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

3. OpenZeppelin 계약 라이브러리에서 클래스를 상속하므로, 명령줄에서 `npm install @openzeppelin/contracts^4.0.0`을 실행하여 라이브러리를 우리 폴더에 설치합니다.

그렇다면 이 코드는 정확히 어떤 역할을 할까요? 한 줄씩 분석해 보겠습니다.

스마트 계약의 맨 위에서 세 개의 [OpenZeppelin](https://openzeppelin.com/) 스마트 계약 클래스를 가져옵니다.

- @openzeppelin/contracts/token/ERC721/ERC721.sol은 우리의 NFT 스마트 계약이 상속할 ERC-721 표준의 구현을 포함합니다. (유효한 NFT가 되려면 스마트 계약이 ERC-721 표준의 모든 메서드를 구현해야 합니다.) 상속된 ERC-721 함수에 대해 더 자세히 알아보려면 [여기](https://eips.ethereum.org/EIPS/eip-721)에서 인터페이스 정의를 확인하세요.

- @openzeppelin/contracts/utils/Counters.sol은 1씩만 증가하거나 감소할 수 있는 카운터를 제공합니다. 우리의 스마트 계약은 카운터를 사용하여 발행된 총 NFT 수를 추적하고 새로운 NFT에 고유 ID를 설정합니다. (스마트 계약을 사용하여 발행된 각 NFT에는 고유 ID가 할당되어야 합니다. 여기서 우리의 고유 ID는 단순히 현존하는 총 NFT 수에 따라 결정됩니다. 예를 들어, 스마트 계약으로 발행하는 첫 번째 NFT의 ID는 "1"이고, 두 번째 NFT의 ID는 "2"가 되는 식입니다.)

- @openzeppelin/contracts/access/Ownable.sol은 스마트 계약에 [접근 제어](https://docs.openzeppelin.com/contracts/3.x/access-control)를 설정하여, 스마트 계약의 소유자(사용자 본인)만 NFT를 발행할 수 있도록 합니다. (참고로, 접근 제어를 포함하는 것은 전적으로 선택 사항입니다. 누구나 스마트 계약을 사용하여 NFT를 발행할 수 있게 하려면 10행의 Ownable과 17행의 onlyOwner를 제거하세요.)

가져오기(import)문 다음에는 우리의 맞춤형 NFT 스마트 계약이 있는데, 이는 놀랍도록 짧습니다. 카운터, 생성자, 그리고 단일 함수만 포함되어 있습니다! 이는 우리가 상속한 OpenZeppelin 계약 덕분인데, 여기에는 NFT 소유자를 반환하는 `ownerOf`, 한 계정에서 다른 계정으로 NFT 소유권을 이전하는 `transferFrom`과 같이 NFT를 생성하는 데 필요한 대부분의 메서드가 구현되어 있습니다.

ERC-721 생성자에서 “MyNFT”와 “NFT”라는 두 개의 문자열을 전달하는 것을 볼 수 있습니다. 첫 번째 변수는 스마트 계약의 이름이고 두 번째 변수는 심볼입니다. 이 변수들의 이름은 원하는 대로 지정할 수 있습니다!

마지막으로 NFT를 발행할 수 있게 해주는 `mintNFT(address recipient, string memory tokenURI)` 함수가 있습니다! 이 함수는 두 개의 변수를 사용합니다.

- `address recipient`는 새로 발행된 NFT를 받을 주소를 지정합니다.

- `string memory tokenURI`는 NFT의 메타데이터를 설명하는 JSON 문서로 확인되어야 하는 문자열입니다. NFT의 메타데이터는 이름, 설명, 이미지 및 기타 속성과 같은 구성 가능한 속성을 가질 수 있도록 하여 생명을 불어넣는 역할을 합니다. 이 튜토리얼 2부에서는 이 메타데이터를 구성하는 방법을 설명합니다.

`mintNFT`는 상속된 ERC-721 라이브러리에서 일부 메서드를 호출하며, 궁극적으로 새로 발행된 NFT의 ID를 나타내는 숫자를 반환합니다.

## 11단계: MetaMask 및 Alchemy를 프로젝트에 연결하기 {#connect-metamask-and-alchemy}

이제 MetaMask 지갑과 Alchemy 계정을 만들고 스마트 계약을 작성했으니, 이 세 가지를 연결할 차례입니다.

디지털 지갑에서 전송되는 모든 거래에는 고유한 개인 키를 사용하는 서명이 필요합니다. 프로그램에 이 권한을 제공하기 위해 개인 키(및 Alchemy API 키) 를 환경 파일에 안전하게 저장할 수 있습니다.

트랜잭션 전송에 대해 더 자세히 알아보려면 web3를 사용하여 트랜잭션을 전송하는 [이 튜토리얼](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)을 확인하세요.

먼저 프로젝트 디렉터리에 dotenv 패키지를 설치합니다.

    ```
    npm install dotenv --save
    ```

그런 다음 프로젝트의 루트 디렉터리에 `.env` 파일을 만들고 여기에 MetaMask 개인 키와 HTTP Alchemy API URL을 추가합니다.

- MetaMask에서 개인 키를 내보내려면 [이 지침](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)을 따르세요.

- 아래에서 HTTP Alchemy API URL을 확인하고 클립보드에 복사하세요.

![Alchemy API URL 복사](./copy-alchemy-api-url.gif)

이제 `.env`는 다음과 같이 보일 것입니다.

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

이것들을 코드에 실제로 연결하기 위해 13단계에서 hardhat.config.js 파일의 이 변수들을 참조할 것입니다.

<EnvWarningBanner />

## 12단계: Ethers.js 설치하기 {#install-ethers}

Ethers.js는 [표준 JSON-RPC 메서드](/developers/docs/apis/json-rpc/)를 더 사용자 친화적인 메서드로 래핑하여 이더리움과 더 쉽게 상호 작용하고 요청할 수 있게 해주는 라이브러리입니다.

Hardhat을 사용하면 추가 도구 및 확장된 기능을 위해 [플러그인](https://hardhat.org/plugins/)을 매우 쉽게 통합할 수 있습니다. 계약 배포를 위해 [Ethers 플러그인](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)을 활용할 것입니다([Ethers.js](https://github.com/ethers-io/ethers.js/)는 매우 깔끔한 계약 배포 방법을 제공합니다).

프로젝트 디렉토리에 다음을 입력합니다.

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

다음 단계에서 hardhat.config.js에도 ether가 필요합니다.

## 13단계: hardhat.config.js 업데이트하기 {#update-hardhat-config}

지금까지 여러 종속성 및 플러그인을 추가했습니다. 이제 프로젝트에서 모든 항목에 대해 알 수 있도록 hardhat.config.js를 업데이트해야 합니다.

hardhat.config.js를 다음과 같이 업데이트합니다.

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

## 14단계: 계약 컴파일하기 {#compile-contract}

지금까지 모든 것이 제대로 작동하는지 확인하기 위해 스마트 컨트랙트를 컴파일해 보겠습니다. compile 작업은 내장된 hardhat 작업 중 하나입니다.

명령줄에서 다음을 실행합니다.

    ```
    npx hardhat compile
    ```

PDX license identifier not provided in source file 에 대한 경고가 표시될 수 있지만 그것에 대해 걱정할 필요는 없습니다. 그 외의 것들은 잘 보이길 바랍니다! 그렇지 않은 경우 언제든지 [Alchemy discord](https://discord.gg/u72VCg3)로 메시지를 보내주세요.

## 15단계: 배포 스크립트 작성하기 {#write-deploy}

이제 스마트 컨트랙트가 작성되고 설정 파일을 사용할 수 있으므로 스마트 컨트랙트 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 만들고 다음 내용을 추가합니다.

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // 배포를 시작하고, 계약 객체로 확인되는 프로미스를 반환합니다.
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

Hardhat은 [계약 튜토리얼](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)에서 각 코드 라인이 무엇을 하는지 훌륭하게 설명하고 있으며, 저희는 그 설명을 여기에 채택했습니다.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ethers.js의 ContractFactory는 새로운 스마트 계약을 배포하는 데 사용되는 추상화이므로, 여기서 MyNFT는 NFT 계약 인스턴스를 위한 팩토리입니다. hardhat-ethers 플러그인을 사용할 때 ContractFactory 및 Contract 인스턴스는 기본적으로 첫 번째 서명자에게 연결됩니다.

    ```
    const myNFT = await MyNFT.deploy();
    ```

ContractFactory에서 deploy()를 호출하면 배포가 시작되고 Contract로 해석되는 Promise가 반환됩니다. 이것은 각 스마트 컨트랙트 기능에 대한 메소드가 있는 개체입니다.

## 16단계: 계약 배포하기 {#deploy-contract}

마침내 스마트 컨트랙트를 배포할 준비가 되었습니다! 프로젝트 디렉터리의 루트로 다시 이동하여 명령줄에서 다음을 실행합니다.

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

그러면 다음과 같은 내용이 표시됩니다.

    ```
    배포된 계약 주소: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

[Sepolia etherscan](https://sepolia.etherscan.io/)으로 이동하여 계약 주소를 검색하면 성공적으로 배포되었음을 확인할 수 있습니다. 바로 보이지 않으면 시간이 걸릴 수 있으니 잠시 기다려주세요. 트랜잭션은 다음과 같습니다.

![Etherscan에서 트랜잭션 주소 보기](./etherscan-sepoila-contract-creation.png)

From 주소는 MetaMask 계정 주소와 일치해야 하며 To 주소는 “Contract Creation”이라고 표시됩니다. 트랜잭션을 클릭하면 To 필드에 계약 주소가 표시됩니다.

![Etherscan에서 계약 주소 보기](./etherscan-sepolia-tx-details.png)

성공입니다! 방금 이더리움(테스트넷) 체인에 NFT 스마트 계약을 배포했습니다!

내부에서 무슨 일이 일어나고 있는지 이해하기 위해 [Alchemy 대시보드](https://dashboard.alchemyapi.io/explorer)의 Explorer 탭으로 이동해 보겠습니다. Alchemy 앱이 여러 개 있는 경우 앱별로 필터링하고 “MyNFT”를 선택해야 합니다.

![Alchemy의 Explorer 대시보드를 통해 “내부적으로” 이루어진 호출 보기](./alchemy-explorer-goerli.png)

여기에서 우리가 .deploy() 함수를 호출할 때 Hardhat/Ethers가 우리를 위해 만든 여러 개의 JSON-RPC 호출을 볼 수 있습니다. 여기서 주목해야 할 두 가지 중요한 것은 실제로 Sepolia 체인에 스마트 계약을 작성하는 요청인 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)과 해시가 주어졌을 때 트랜잭션에 대한 정보를 읽는 요청인 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)입니다(트랜잭션을 보낼 때의 일반적인 패턴). 트랜잭션 전송에 대해 더 자세히 알아보려면 [Web3를 사용하여 트랜잭션 전송하기](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)에 대한 이 튜토리얼을 확인하세요.

이것으로 이 튜토리얼의 1부를 마칩니다. [2부에서는 NFT를 발행하여 스마트 계약과 실제로 상호 작용하고](/developers/tutorials/how-to-mint-an-nft/), [3부에서는 이더리움 지갑에서 NFT를 확인하는 방법을 보여드립니다](/developers/tutorials/how-to-view-nft-in-metamask/)!
