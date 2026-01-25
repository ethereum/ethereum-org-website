---
title: NFT 발행 방법(NFT 튜토리얼 시리즈 2/3부)
description: 이 튜토리얼에서는 스마트 계약과 Web3를 사용하여 이더리움 블록체인에서 NFT를 발행하는 방법을 설명합니다.
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "솔리디티", "스마트 계약" ]
skill: beginner
lang: ko
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 6,900만 달러
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 1,100만 달러
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 600만 달러

이들 모두 Alchemy의 강력한 API를 사용하여 NFT를 발행했습니다. 이 튜토리얼에서는 10분 이내에 동일한 작업을 수행하는 방법을 알려드립니다.

'NFT 발행'은 블록체인에 ERC-721 토큰의 고유한 인스턴스를 게시하는 행위입니다. [이 NFT 튜토리얼 시리즈의 1부](/developers/tutorials/how-to-write-and-deploy-an-nft/)의 스마트 계약을 사용하여 Web3 기술을 발휘하고 NFT를 발행해 봅시다. 이 튜토리얼이 끝나면 여러분(과 여러분의 지갑)이 원하는 만큼 많은 NFT를 발행할 수 있게 될 것입니다!

이제 시작하겠습니다!

## 1단계: Web3 설치하기 {#install-web3}

NFT 스마트 계약 생성에 대한 첫 번째 튜토리얼을 따라오셨다면, 이미 Ethers.js를 사용해 본 경험이 있으실 것입니다. Web3는 이더리움 블록체인에 대한 요청 생성을 더 쉽게 만들어주는 라이브러리라는 점에서 Ethers와 비슷합니다. 이 튜토리얼에서는 자동 재시도와 강력한 WebSocket 지원을 제공하는 향상된 Web3 라이브러리인 [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)를 사용할 것입니다.

프로젝트 홈 디렉터리에서 다음을 실행하세요.

```
npm install @alch/alchemy-web3
```

## 2단계: `mint-nft.js` 파일 생성하기 {#create-mintnftjs}

scripts 디렉터리 내부에 `mint-nft.js` 파일을 만들고 다음 코드 줄을 추가하세요.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## 3단계: 계약 ABI 가져오기 {#contract-abi}

계약 ABI(애플리케이션 바이너리 인터페이스)는 스마트 계약과 상호 작용하기 위한 인터페이스입니다. 계약 ABI에 대해 [여기](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)에서 더 자세히 알아볼 수 있습니다. Hardhat은 자동으로 ABI를 생성하여 `MyNFT.json` 파일에 저장합니다. 이를 사용하려면 `mint-nft.js` 파일에 다음 코드 줄을 추가하여 내용을 파싱해야 합니다.

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABI를 보려면 콘솔에 출력할 수 있습니다.

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`를 실행하고 ABI가 콘솔에 출력되는 것을 보려면 터미널로 이동하여 다음을 실행하세요.

```js
node scripts/mint-nft.js
```

## 4단계: IPFS를 사용하여 NFT 메타데이터 구성하기 {#config-meta}

1부 튜토리얼에서 기억하시겠지만, `mintNFT` 스마트 계약 함수는 NFT의 메타데이터를 설명하는 JSON 문서로 확인되어야 하는 tokenURI 매개변수를 받습니다. 이 메타데이터는 이름, 설명, 이미지 및 기타 속성과 같은 구성 가능한 속성을 가질 수 있게 하여 NFT에 생명을 불어넣는 것입니다.

> _IPFS(Interplanetary File System)는 분산 파일 시스템에서 데이터를 저장하고 공유하기 위한 탈중앙화 프로토콜 및 P2P 네트워크입니다._

NFT가 진정으로 탈중앙화되도록 보장하기 위해, 편리한 IPFS API 및 툴킷인 Pinata를 사용하여 NFT 자산과 메타데이터를 저장할 것입니다. Pinata 계정이 없다면, [여기](https://app.pinata.cloud)에서 무료 계정에 가입하고 이메일 인증 절차를 완료하세요.

계정을 생성한 후:

- '파일' 페이지로 이동하여 페이지 왼쪽 상단의 파란색 '업로드' 버튼을 클릭합니다.

- Pinata에 이미지를 업로드합니다. 이 이미지가 NFT의 이미지 자산이 됩니다. 자산 이름은 원하는 대로 지정할 수 있습니다

- 업로드 후에는 '파일' 페이지의 표에서 파일 정보를 볼 수 있습니다. CID 열도 표시됩니다. CID 옆에 있는 복사 버튼을 클릭하여 CID를 복사할 수 있습니다. 업로드한 파일은 `https://gateway.pinata.cloud/ipfs/<CID>`에서 볼 수 있습니다. 예를 들어, 저희가 사용한 이미지는 IPFS [여기](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)에서 찾을 수 있습니다.

시각적 학습자를 위해 위 단계는 여기에 요약되어 있습니다.

![Pinata에 이미지 업로드 방법](./instructionsPinata.gif)

이제 Pinata에 문서를 하나 더 업로드해야 합니다. 하지만 그 전에 문서를 만들어야 합니다!

루트 디렉터리에서 `nft-metadata.json`이라는 새 파일을 만들고 다음 JSON 코드를 추가합니다.

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

JSON의 데이터는 자유롭게 변경할 수 있습니다. attributes 섹션을 제거하거나 추가할 수 있습니다. 가장 중요한 것은 `image` 필드가 여러분의 IPFS 이미지 위치를 가리키도록 하는 것입니다. 그렇지 않으면 여러분의 NFT에는 (아주 귀여운!) 강아지 사진이 포함될 것입니다.

JSON 파일 편집이 끝나면 저장한 다음, 이미지를 업로드할 때와 동일한 단계에 따라 Pinata에 업로드하세요.

![Pinata에 nft-metadata.json 업로드 방법](./uploadPinata.gif)

## 5단계: 계약 인스턴스 생성하기 {#instance-contract}

이제 계약과 상호 작용하려면 코드에서 계약의 인스턴스를 만들어야 합니다. 이를 위해 계약 주소가 필요하며, 이는 배포에서 얻거나 계약을 배포하는 데 사용한 주소를 [Blockscout](https://eth-sepolia.blockscout.com/)에서 조회하여 얻을 수 있습니다.

![Etherscan에서 계약 주소 보기](./view-contract-etherscan.png)

위 예시에서 계약 주소는 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778입니다.

다음으로 Web3 [contract 메서드](https://docs.web3js.org/api/web3-eth-contract/class/Contract)를 사용하여 ABI와 주소를 이용해 계약을 생성합니다. `mint-nft.js` 파일에 다음을 추가하세요:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## 6단계: `.env` 파일 업데이트하기 {#update-env}

이제 이더리움 체인에 트랜잭션을 생성하고 전송하기 위해, 여러분의 공개 이더리움 계정 주소를 사용하여 계정 논스(아래에서 설명)를 가져옵니다.

공개 키를 `.env` 파일에 추가하세요. 튜토리얼 1부를 완료했다면 `.env` 파일은 이제 다음과 같을 것입니다:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## 7단계: 트랜잭션 생성하기 {#create-txn}

먼저 `mintNFT(tokenData)`라는 이름의 함수를 정의하고 다음을 수행하여 트랜잭션을 생성해 보겠습니다.

1. `.env` 파일에서 _PRIVATE_KEY_와 _PUBLIC_KEY_를 가져옵니다.

2. 다음으로 계정 논스를 알아내야 합니다. 논스 사양은 여러분의 주소에서 보낸 트랜잭션 수를 추적하는 데 사용됩니다. 이는 보안 목적과 [재전송 공격](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)을 방지하기 위해 필요합니다. 주소에서 보낸 트랜잭션 수를 가져오려면 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)를 사용합니다.

3. 마지막으로 다음 정보로 트랜잭션을 설정합니다.

- `'from': PUBLIC_KEY` — 트랜잭션의 발신지는 공개 주소입니다

- `'to': contractAddress` — 상호 작용하고 트랜잭션을 보낼 계약입니다

- `'nonce': nonce` — 주소에서 보낸 트랜잭션 수가 포함된 계정 논스입니다

- `'gas': estimatedGas` — 트랜잭션을 완료하는 데 필요한 예상 가스입니다

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — 이 트랜잭션에서 수행하려는 계산으로, 이 경우 NFT를 발행하는 것입니다

이제 `mint-nft.js` 파일은 다음과 같아야 합니다:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //최신 논스 가져오기

   //트랜잭션
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## 8단계: 트랜잭션 서명하기 {#sign-txn}

이제 트랜잭션을 만들었으므로 전송하기 위해 서명해야 합니다. 여기서 개인 키를 사용합니다.

`web3.eth.sendSignedTransaction`은 트랜잭션 해시를 제공하며, 이를 사용하여 트랜잭션이 채굴되었는지, 네트워크에서 누락되지 않았는지 확인할 수 있습니다. 트랜잭션 서명 섹션에서 트랜잭션이 성공적으로 통과되었는지 알 수 있도록 몇 가지 오류 확인을 추가한 것을 알 수 있습니다.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //최신 논스 가져오기

  //트랜잭션
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "트랜잭션의 해시는 다음과 같습니다: ",
              hash,
              "\nAlchemy의 Mempool에서 트랜잭션 상태를 확인하세요!"
            )
          } else {
            console.log(
              "트랜잭션을 제출하는 동안 문제가 발생했습니다:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise 실패:", err)
    })
}
```

## 9단계: `mintNFT` 호출 및 `node mint-nft.js` 실행하기 {#call-mintnft-fn}

Pinata에 업로드한 `metadata.json`을 기억하시나요? Pinata에서 해시코드를 가져와 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`를 `mintNFT` 함수에 매개변수로 전달하세요.

해시코드를 찾는 방법은 아래와 같습니다.

![Pinata에서 NFT 메타데이터 해시코드 가져오는 방법](./metadataPinata.gif)_Pinata에서 NFT 메타데이터 해시코드를 가져오는 방법_

> 복사한 해시코드가 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`를 별도의 창에 로드하여 **metadata.json**에 연결되는지 다시 확인하세요. 페이지는 아래 스크린샷과 비슷하게 보일 것입니다.

![페이지에 json 메타데이터가 표시되어야 합니다](./metadataJSON.png)_페이지에 json 메타데이터가 표시되어야 합니다_

전체 코드는 다음과 같아야 합니다.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //최신 논스 가져오기

  //트랜잭션
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "트랜잭션의 해시는 다음과 같습니다: ",
              hash,
              "\nAlchemy의 Mempool에서 트랜잭션 상태를 확인하세요!"
            )
          } else {
            console.log(
              "트랜잭션을 제출하는 동안 문제가 발생했습니다:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise 실패:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

이제 `node scripts/mint-nft.js`를 실행하여 NFT를 배포하세요. 몇 초 후 터미널에 다음과 같은 응답이 표시되어야 합니다.

    ```
    트랜잭션의 해시는 다음과 같습니다: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Alchemy의 Mempool에서 트랜잭션 상태를 확인하세요!
    ```

다음으로 [Alchemy mempool](https://dashboard.alchemyapi.io/mempool)을 방문하여 트랜잭션 상태(대기 중, 채굴됨 또는 네트워크에서 누락됨)를 확인하세요. 트랜잭션이 누락된 경우, [Blockscout](https://eth-sepolia.blockscout.com/)에서 트랜잭션 해시를 검색해 보는 것도 도움이 됩니다.

![Etherscan에서 NFT 트랜잭션 해시 보기](./view-nft-etherscan.png)_Etherscan에서 NFT 트랜잭션 해시 보기_

이것으로 끝입니다! 이제 이더리움 블록체인에서 NFT를 배포하고 발행했습니다 <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`를 사용하면 여러분(과 여러분의 지갑)이 원하는 만큼 많은 NFT를 발행할 수 있습니다! NFT의 메타데이터를 설명하는 새로운 tokenURI를 전달해야 합니다(그렇지 않으면 ID만 다른 동일한 NFT를 여러 개 만들게 됩니다).

아마 여러분의 지갑에 있는 NFT를 자랑하고 싶을 것입니다. 그렇다면 [3부: 지갑에서 NFT를 보는 방법](/developers/tutorials/how-to-view-nft-in-metamask/)을 꼭 확인하세요!
