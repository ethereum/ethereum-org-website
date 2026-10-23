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

NFT가 블록체인을 대중의 관심사로 끌어올리고 있는 지금, 이더리움 블록체인에 자신만의 NFT 컨트랙트(ERC-721 토큰)를 게시하여 그 열기를 직접 이해해 볼 수 있는 절호의 기회입니다!

이 튜토리얼에서는 [메타마스크](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) 및 [Alchemy](https://alchemy.com/signup/eth)를 사용하여 Sepolia 테스트넷에 ERC-721 스마트 컨트랙트를 생성하고 배포하는 과정을 살펴볼 것입니다(이 용어들이 무엇을 의미하는지 아직 모르더라도 걱정하지 마세요. 모두 설명해 드릴 것입니다!).

이 튜토리얼의 2부에서는 스마트 컨트랙트를 사용하여 NFT를 발행하는 방법을 살펴보고, 3부에서는 메타마스크에서 NFT를 보는 방법을 설명합니다.

물론 진행 중 언제든지 궁금한 점이 있다면 주저하지 말고 [Alchemy 디스코드](https://discord.gg/gWuC7zB)에 문의하거나 [Alchemy의 NFT API 문서](https://www.alchemy.com/docs/reference/nft-api-quickstart)를 방문해 보세요!

## 1단계: 이더리움 네트워크에 연결하기 {#connect-to-ethereum}

이더리움 블록체인에 요청을 보내는 방법은 여러 가지가 있지만, 쉽게 진행하기 위해 자체 노드를 실행하지 않고도 이더리움 체인과 통신할 수 있게 해주는 블록체인 개발자 플랫폼이자 API인 [Alchemy](https://alchemy.com/signup/eth)의 무료 계정을 사용하겠습니다.

이 튜토리얼에서는 스마트 컨트랙트 배포 과정에서 내부적으로 어떤 일이 일어나는지 이해하기 위해 모니터링 및 분석을 위한 Alchemy의 개발자 도구도 활용할 것입니다. 아직 Alchemy 계정이 없다면 [여기](https://alchemy.com/signup/eth)에서 무료로 가입할 수 있습니다.

## 2단계: 앱(및 API 키) 생성하기 {#make-api-key}

Alchemy 계정을 생성했다면, 앱을 생성하여 API 키를 생성할 수 있습니다. 이를 통해 Sepolia 테스트넷에 요청을 보낼 수 있습니다. 테스트넷에 대해 더 자세히 알고 싶다면 [이 가이드](https://www.alchemy.com/docs/choosing-a-web3-network)를 확인해 보세요.

1. 내비게이션 바에서 "Select an app"을 선택하고 "Create new app"을 클릭하여 Alchemy 대시보드의 "Create new app" 페이지로 이동합니다.

![Create your app](./alchemy-create-new-app.png)

2. 앱의 이름을 지정하고(여기서는 "My First NFT!"를 선택했습니다), 짧은 설명을 제공한 다음 사용 사례를 선택합니다. 다음으로 "Ethereum"을 검색하고 네트워크를 선택합니다. 애플리케이션 개발에 권장되는 테스트넷인 Sepolia를 사용할 것입니다([이더리움 네트워크](/developers/docs/networks/#ethereum-testnets) 참조).

3. "Next"를 클릭하여 진행한 다음 "Create app"을 클릭하면 끝입니다! 내비게이션 바의 드롭다운 메뉴에 앱이 나타나며, 복사할 수 있는 API 키가 제공됩니다.

## 3단계: 이더리움 계정(주소) 생성하기 {#create-eth-address}

트랜잭션을 보내고 받으려면 이더리움 계정이 필요합니다. 이 튜토리얼에서는 이더리움 계정 주소를 관리하는 데 사용되는 브라우저 내 가상 지갑인 메타마스크를 사용할 것입니다. 이더리움에서 트랜잭션이 어떻게 작동하는지 더 자세히 이해하고 싶다면 이더리움 재단의 [이 페이지](/developers/docs/transactions/)를 확인해 보세요.

[여기](https://metamask.io/download)에서 메타마스크 계정을 무료로 다운로드하고 생성할 수 있습니다. 계정을 생성할 때, 또는 이미 계정이 있는 경우 네트워크 선택 메뉴를 사용하여 "Sepolia" 테스트넷으로 전환해야 합니다(실제 돈을 다루지 않기 위함입니다). Sepolia가 목록에 보이지 않는다면, 오른쪽 상단의 메뉴를 열고 "Networks"를 선택한 다음 "Show test networks"를 켜세요([테스트넷 보기에 대한 메타마스크의 가이드](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) 참조).

![Set Sepolia as your network](./metamask-sepolia.png)

## 4단계: 퍼싯에서 이더 추가하기 {#step-4-add-ether-from-a-faucet}

스마트 컨트랙트를 테스트넷에 배포하려면 가짜 ETH가 필요합니다. Sepolia ETH를 얻으려면 [Sepolia 네트워크 세부 정보](/developers/docs/networks/#sepolia)에 나열된 퍼싯 중 하나를 선택하고 계정 주소를 입력하세요. 하나가 작동하지 않으면 다른 것을 시도해 보세요. 때로는 고갈될 수 있으며, 일부는 자격 요건이 있습니다. 예를 들어, [Alchemy Sepolia 퍼싯](https://www.alchemy.com/faucets/ethereum-sepolia)은 수신 주소가 이더리움 메인넷에 최소 0.001 ETH를 보유하고 있어야 합니다. 곧 메타마스크 계정에서 ETH를 확인할 수 있을 것입니다!

## 5단계: 잔액 확인하기 {#check-balance}

잔액이 제대로 들어왔는지 다시 확인하기 위해, [Alchemy의 샌드박스 도구](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)를 사용하여 [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) 요청을 보내보겠습니다. 이 요청은 지갑에 있는 ETH의 양을 반환합니다. 메타마스크 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답을 볼 수 있습니다.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **참고** 이 결과는 ETH가 아니라 Wei 단위입니다. Wei는 이더의 가장 작은 단위로 사용됩니다. Wei에서 ETH로의 변환 비율은 1 ETH = 10<sup>18</sup> Wei입니다. 따라서 0xde0b6b3a7640000을 십진수로 변환하면 1\*10<sup>18</sup> Wei가 되며, 이는 1 ETH와 같습니다.

휴! 가짜 돈이 모두 잘 들어왔네요.

## 6단계: 프로젝트 초기화하기 {#initialize-project}

먼저 프로젝트를 위한 폴더를 생성해야 합니다. 명령줄로 이동하여 다음을 입력하세요.

```sh
mkdir my-nft
cd my-nft
```

이제 프로젝트 폴더 안에 있으므로, `npm init`을 사용하여 프로젝트를 초기화하겠습니다. 아직 npm이 설치되어 있지 않다면 [Node.js 설치 지침](https://nodejs.org/en/download/)을 따르세요(이 튜토리얼에서는 Node.js와 npm이 필요합니다).

```sh
npm init
```

설치 질문에 어떻게 대답하든 크게 상관없습니다. 참고를 위해 우리가 작성한 방식은 다음과 같습니다.

```text
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

`package.json`을 승인합니다. 다음에 설치할 Hardhat 3는 ES 모듈 프로젝트만 지원하므로, 프로젝트를 ES 모듈로 표시합니다.

```sh
npm pkg set type=module
```

이제 준비가 완료되었습니다!

## 7단계: [Hardhat](https://hardhat.org/docs/getting-started) 설치하기 {#install-hardhat}

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버깅하기 위한 개발 환경입니다. 개발자가 라이브 체인에 배포하기 전에 로컬에서 스마트 컨트랙트와 탈중앙화 애플리케이션 (dapp)을 구축할 때 도움을 줍니다.

Hardhat 3는 Node.js v22.13.0 이상이 필요합니다. `my-nft` 프로젝트 내에서 다음을 실행하세요.

```sh
npm install --save-dev hardhat
```

[설치 지침](https://hardhat.org/docs/getting-started)에 대한 자세한 내용은 이 페이지를 확인하세요.

## 8단계: Hardhat 프로젝트 생성하기 {#create-hardhat-project}

`npx hardhat --init`을 실행하면 완전한 샘플 프로젝트가 생성되지만, 이 튜토리얼에서는 모든 요소를 볼 수 있도록 수동으로 설정하겠습니다. 프로젝트 폴더의 루트에 다음 내용으로 `hardhat.config.js`라는 파일을 생성하세요.

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

이곳은 프로젝트의 모든 설정을 지정할 곳입니다(13단계에서 진행). 지금은 Hardhat에 사용할 Solidity 컴파일러 버전을 알려주는 역할만 합니다.

## 9단계: 프로젝트 폴더 추가하기 {#add-project-folders}

프로젝트를 체계적으로 유지하기 위해 두 개의 새 폴더를 생성하겠습니다. 명령줄에서 프로젝트의 루트 디렉터리로 이동하여 다음을 입력하세요.

```sh
mkdir contracts
mkdir scripts
```

- `contracts/`는 NFT 스마트 컨트랙트 코드를 보관할 곳입니다.

- `scripts/`는 스마트 컨트랙트를 배포하고 상호작용하기 위한 스크립트를 보관할 곳입니다.

## 10단계: 컨트랙트 작성하기 {#write-contract}

이제 환경 설정이 완료되었으니, 더 흥미로운 작업인 <em>스마트 컨트랙트 코드 작성</em>으로 넘어가 보겠습니다!

선호하는 편집기(우리는 [VSCode](https://code.visualstudio.com/)를 좋아합니다)에서 `my-nft` 프로젝트를 엽니다. 스마트 컨트랙트는 Solidity라는 언어로 작성되며, 이를 사용하여 `MyNFT.sol` 스마트 컨트랙트를 작성할 것입니다.‌

1. `contracts` 폴더로 이동하여 `MyNFT.sol`이라는 새 파일을 생성합니다.

2. 아래는 [오픈제플린](https://docs.openzeppelin.com/contracts/5.x/erc721) 라이브러리의 ERC-721 구현을 기반으로 한 우리의 NFT 스마트 컨트랙트 코드입니다. 아래 내용을 복사하여 `MyNFT.sol` 파일에 붙여넣으세요.

   ```solidity
   // https://docs.openzeppelin.com/contracts/5.x/erc721 기반 컨트랙트
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. 오픈제플린 컨트랙트 라이브러리에서 클래스를 상속받고 있으므로, 명령줄에서 `npm install @openzeppelin/contracts`를 실행하여 폴더에 라이브러리를 설치합니다. 이 튜토리얼에서는 Solidity 0.8.24 이상이 필요한 오픈제플린 컨트랙트 5.x를 사용합니다.

그렇다면 이 코드는 정확히 _무엇을_ 할까요? 한 줄씩 분석해 보겠습니다.

스마트 컨트랙트의 맨 위에서 세 개의 [오픈제플린](https://openzeppelin.com/) 스마트 컨트랙트 클래스를 가져옵니다.

- `@openzeppelin/contracts/token/ERC721/ERC721.sol`에는 우리의 NFT 스마트 컨트랙트가 상속할 ERC-721 표준의 구현이 포함되어 있습니다. (유효한 NFT가 되려면 스마트 컨트랙트가 ERC-721 표준의 모든 메서드를 구현해야 합니다.) 상속된 ERC-721 함수에 대해 자세히 알아보려면 [여기](https://eips.ethereum.org/EIPS/eip-721)에서 인터페이스 정의를 확인하세요.

- `@openzeppelin/contracts/access/Ownable.sol`은 스마트 컨트랙트에 [접근 제어](https://docs.openzeppelin.com/contracts/5.x/access-control)를 설정하여 스마트 컨트랙트의 소유자(여러분)만 NFT를 발행할 수 있도록 합니다. 소유자는 생성자에 전달된 `initialOwner` 주소입니다. (참고로, 접근 제어를 포함하는 것은 전적으로 선택 사항입니다. 누구나 스마트 컨트랙트를 사용하여 NFT를 발행할 수 있게 하려면 컨트랙트 정의와 생성자에서 `Ownable` 및 `Ownable(initialOwner)`를 제거하고 `mintNFT` 함수에서 `onlyOwner`를 제거하세요.)

- `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol`은 ERC-721을 확장하여 각 토큰이 발행 시 설정하는 자체 메타데이터 URI를 저장할 수 있도록 합니다.

가져오기 문 뒤에는 사용자 정의 NFT 스마트 컨트랙트가 있는데, 놀랍게도 매우 짧습니다. 카운터, 생성자, 단일 함수만 포함되어 있습니다! 이는 NFT를 생성하는 데 필요한 대부분의 메서드(예: NFT의 소유자를 반환하는 `ownerOf`, 한 계정에서 다른 계정으로 NFT의 소유권을 이전하는 `transferFrom`)를 구현하는 상속된 오픈제플린 컨트랙트 덕분입니다.

카운터인 `_nextTokenId`는 발행된 NFT의 총 개수를 추적하고 새 NFT에 고유 ID를 설정합니다. (스마트 컨트랙트를 사용하여 발행된 각 NFT에는 고유 ID가 할당되어야 합니다. 여기서 고유 ID는 존재하는 NFT의 총 개수에 의해 결정됩니다. `++_nextTokenId`는 사용되기 전에 카운터를 증가시키므로, 스마트 컨트랙트로 발행하는 첫 번째 NFT의 ID는 "1", 두 번째 NFT의 ID는 "2"가 됩니다.)

ERC-721 생성자에서 "MyNFT"와 "NFT"라는 2개의 문자열을 전달하는 것을 볼 수 있습니다. 첫 번째 변수는 스마트 컨트랙트의 이름이고 두 번째는 기호입니다. 이 변수들의 이름은 원하는 대로 지정할 수 있습니다!

마지막으로 NFT를 발행할 수 있게 해주는 `mintNFT(address recipient, string memory tokenURI)` 함수가 있습니다! 이 함수는 두 개의 변수를 사용합니다.

- `address recipient`는 새로 발행된 NFT를 받을 주소를 지정합니다.

- `string memory tokenURI`는 NFT의 메타데이터를 설명하는 JSON 문서로 확인되어야 하는 문자열입니다. NFT의 메타데이터는 이름, 설명, 이미지 및 기타 속성과 같은 구성 가능한 속성을 가질 수 있게 하여 NFT에 생명력을 불어넣는 요소입니다. 이 튜토리얼의 2부에서는 이 메타데이터를 구성하는 방법을 설명합니다.

`mintNFT`는 상속된 ERC-721 라이브러리에서 일부 메서드를 호출하고, 궁극적으로 새로 발행된 NFT의 ID를 나타내는 숫자를 반환합니다.

## 11단계: 프로젝트에 메타마스크 및 Alchemy 연결하기 {#connect-metamask-and-alchemy}

이제 메타마스크 지갑, Alchemy 계정을 생성하고 스마트 컨트랙트를 작성했으므로 이 세 가지를 연결할 차례입니다.

가상 지갑에서 전송되는 모든 트랜잭션에는 고유한 개인 키를 사용한 서명이 필요합니다. 프로그램에 이 권한을 제공하기 위해 개인 키(및 Alchemy API 키)를 환경 파일에 안전하게 저장할 수 있습니다.

트랜잭션 전송에 대해 자세히 알아보려면 [트랜잭션 문서](/developers/docs/transactions/)를 확인하세요.

프로젝트의 루트 디렉터리에 `.env` 파일을 생성하고 메타마스크 개인 키와 HTTP Alchemy API URL을 추가합니다.

- 메타마스크에서 개인 키를 내보내려면 [이 지침](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)을 따르세요.

- HTTP Alchemy API URL을 가져와 클립보드에 복사하려면 아래를 참조하세요.

![Copy your Alchemy API URL](./copy-alchemy-api-url.mp4#842x480)

이제 `.env` 파일은 다음과 같아야 합니다.

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

이들을 코드에 실제로 연결하기 위해 13단계의 `hardhat.config.js` 파일에서 이 변수들을 참조할 것입니다. Node.js는 자체적으로 `.env` 파일을 읽을 수 있으므로 추가 패키지를 설치할 필요가 없습니다.

<EnvWarningBanner />

## 12단계: Ethers.js 설치하기 {#install-ethers}

Ethers.js는 [표준 JSON-RPC 메서드](/developers/docs/apis/json-rpc/)를 더 사용자 친화적인 메서드로 래핑하여 이더리움과 상호작용하고 요청을 보내는 것을 더 쉽게 만들어주는 라이브러리입니다.

Hardhat은 추가 도구 및 확장된 기능을 위해 [플러그인](https://hardhat.org/docs/plugins/official-plugins)을 통합하는 것을 매우 쉽게 만들어줍니다. 컨트랙트 배포를 위해 [Ethers 플러그인](https://hardhat.org/docs/plugins/hardhat-ethers)을 활용할 것입니다([Ethers.js](https://docs.ethers.org/v6/)에는 매우 깔끔한 컨트랙트 배포 메서드가 있습니다).

프로젝트 디렉터리에서 다음을 입력하세요.

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

다음 단계에서 `hardhat.config.js`에 플러그인을 추가할 것입니다.

## 13단계: hardhat.config.js 업데이트하기 {#update-hardhat-config}

지금까지 여러 종속성과 플러그인을 추가했으므로, 이제 프로젝트가 이 모든 것을 알 수 있도록 `hardhat.config.js`를 업데이트해야 합니다.

`hardhat.config.js`를 다음과 같이 업데이트하세요.

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// .env 파일이 존재하는 경우, 해당 파일에서 API_URL과 PRIVATE_KEY를 process.env로 불러옵니다
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable`은 Hardhat에게 필요할 때만 환경 변수에서 각 값을 읽도록 지시하므로, 값이 설정되기 전에도 `compile`과 같은 명령이 작동합니다. 개인 키를 일반 텍스트 파일에 보관하고 싶지 않다면, Hardhat은 [암호화된 키스토어에서 구성 변수](https://hardhat.org/docs/guides/configuration-variables)를 읽을 수도 있습니다.

## 14단계: 컨트랙트 컴파일하기 {#compile-contract}

지금까지 모든 것이 제대로 작동하는지 확인하기 위해 컨트랙트를 컴파일해 보겠습니다. 컴파일 작업은 내장된 Hardhat 작업 중 하나입니다.

명령줄에서 다음을 실행하세요.

```sh
npx hardhat compile
```

처음 컴파일할 때 Hardhat은 Solidity 컴파일러를 다운로드합니다. 그런 다음 `Compiled 1 Solidity file with solc 0.8.34`와 같은 메시지가 표시되어야 합니다. 그렇지 않은 경우 언제든지 [Alchemy 디스코드](https://discord.gg/gWuC7zB)에 메시지를 남길 수 있습니다.

## 15단계: 배포 스크립트 작성하기 {#write-deploy}

이제 컨트랙트가 작성되었고 구성 파일이 준비되었으므로 컨트랙트 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 생성하고 다음 내용을 추가하세요.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// 배포를 시작하고, 컨트랙트 객체로 리졸브되는 프로미스를 반환합니다
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

이 코드의 각 줄이 무엇을 하는지 살펴보겠습니다.

```js
const { ethers } = await network.create()
```

Hardhat 3에서 스크립트는 네트워크에 대한 연결을 명시적으로 엽니다. `network.create()`는 스크립트를 실행할 때 `--network` 옵션으로 선택한 네트워크에 연결하며, `hardhat-ethers` 플러그인은 해당 연결에 `ethers` 객체를 추가합니다.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()`는 네트워크에 구성된 계정을 반환합니다. Sepolia에서는 `.env`에 개인 키를 넣은 계정입니다. 여러분이 컨트랙트의 소유자가 되도록 해당 주소를 생성자에 전달합니다.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Ethers.js의 ContractFactory는 새로운 스마트 컨트랙트를 배포하는 데 사용되는 추상화이므로, 여기서 MyNFT는 우리의 NFT 컨트랙트 인스턴스를 위한 팩토리입니다. hardhat-ethers 플러그인을 사용할 때 ContractFactory 및 Contract 인스턴스는 기본적으로 첫 번째 서명자에 연결됩니다.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

ContractFactory에서 deploy()를 호출하면 배포가 시작되고 Contract로 확인되는 Promise를 반환합니다. 이것은 스마트 컨트랙트 함수의 각 메서드를 가진 객체입니다. deploy()에 전달하는 인수는 컨트랙트의 생성자, 여기서는 `initialOwner` 주소로 이동합니다.

`waitForDeployment()`는 배포 트랜잭션이 블록에 포함될 때까지 기다리며, `getAddress()`는 새 컨트랙트의 주소를 반환합니다. 자세한 내용은 [Ethers.js 컨트랙트 문서](https://docs.ethers.org/v6/api/contract/)를 참조하세요.

## 16단계: 컨트랙트 배포하기 {#deploy-contract}

드디어 스마트 컨트랙트를 배포할 준비가 되었습니다! 프로젝트 디렉터리의 루트로 돌아가서 명령줄에 다음을 실행하세요.

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

그러면 다음과 같은 내용이 표시되어야 합니다.

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

[Sepolia Etherscan](https://sepolia.etherscan.io/)으로 이동하여 컨트랙트 주소를 검색하면 성공적으로 배포되었음을 확인할 수 있습니다. 즉시 보이지 않는다면 시간이 조금 걸릴 수 있으므로 잠시 기다려 주세요. 트랜잭션은 다음과 같이 보일 것입니다.

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From 주소는 메타마스크 계정 주소와 일치해야 하며 To 주소에는 "Contract Creation"이라고 표시됩니다. 트랜잭션을 클릭하면 To 필드에서 컨트랙트 주소를 볼 수 있습니다.

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

야호! 방금 이더리움(테스트넷) 체인에 NFT 스마트 컨트랙트를 배포했습니다!

내부적으로 어떤 일이 일어나고 있는지 이해하려면 [Alchemy 대시보드](https://dashboard.alchemy.com/)에서 앱이 받은 요청을 살펴볼 수 있습니다.

거기서 `.deploy()` 함수를 호출했을 때 Hardhat/Ethers가 내부적으로 수행한 몇 가지 JSON-RPC 호출을 볼 수 있습니다. 여기서 주목해야 할 두 가지 중요한 호출은 스마트 컨트랙트를 Sepolia 체인에 실제로 기록하라는 요청인 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)과 해시가 주어졌을 때 트랜잭션에 대한 정보를 읽으라는 요청인 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)입니다(트랜잭션을 보낼 때의 일반적인 패턴). 트랜잭션 전송에 대해 자세히 알아보려면 [트랜잭션 문서](/developers/docs/transactions/)를 확인하세요.

이것으로 이 튜토리얼의 1부를 마칩니다. [2부에서는 NFT를 발행하여 스마트 컨트랙트와 실제로 상호작용해 보고](/developers/tutorials/how-to-mint-an-nft/), [3부에서는 이더리움 지갑에서 NFT를 보는 방법을 보여드리겠습니다](/developers/tutorials/how-to-view-nft-in-metamask/)!
