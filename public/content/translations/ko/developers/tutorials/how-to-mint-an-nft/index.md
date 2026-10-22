---
title: "NFT 발행 방법 (NFT 튜토리얼 시리즈 2/3부)"
description: "이 튜토리얼에서는 스마트 컨트랙트, Hardhat 및 ethers.js를 사용하여 이더리움 블록체인에서 NFT를 발행하는 방법을 설명합니다."
author: "수미 무드길"
tags:
  - ERC-721
  - alchemy
  - solidity
  - 스마트 컨트랙트
skill: beginner
breadcrumb: "NFT 발행하기"
lang: ko
published: 2021-04-22
---

"NFT 발행"은 블록체인에 ERC-721 토큰의 고유한 인스턴스를 게시하는 행위입니다. [이 NFT 튜토리얼 시리즈의 1부](/developers/tutorials/how-to-write-and-deploy-an-nft/)에서 만든 스마트 컨트랙트를 사용하여 Web3 기술을 발휘해 NFT를 발행해 봅시다. 이 튜토리얼을 마치면 여러분이 (그리고 지갑이) 원하는 만큼 많은 NFT를 발행할 수 있게 될 것입니다!

시작해 봅시다!

## 1단계: 설정 확인 {#install-web3}

NFT 스마트 컨트랙트를 만드는 첫 번째 튜토리얼을 따랐다면, [Ethers 플러그인](https://hardhat.org/docs/plugins/hardhat-ethers)과 [이더리움](/) 블록체인에 대한 요청 생성을 더 쉽게 만들어주는 라이브러리인 [ethers.js](https://docs.ethers.org/v6/)가 포함된 Hardhat 3 프로젝트 등 필요한 모든 것을 이미 갖추고 있습니다. 발행 코드를 Hardhat 스크립트로 작성할 것이므로, 1부의 Sepolia 네트워크 설정과 `API_URL` 및 `PRIVATE_KEY` 값을 재사용하게 됩니다. 따라서 새로 설치할 것은 없습니다.

## 2단계: `mint-nft.js` 파일 생성 {#create-mintnftjs}

scripts 디렉터리 안에 `mint-nft.js` 파일을 만들고 다음 코드 줄을 추가합니다:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

배포 스크립트에서와 마찬가지로, `network.create()`는 스크립트를 실행할 때 `--network`로 선택한 네트워크에 연결하고, 해당 네트워크에 대한 `ethers` 객체를 제공합니다.

## 3단계: 컨트랙트 ABI 가져오기 {#contract-abi}

컨트랙트 ABI(애플리케이션 바이너리 인터페이스)는 스마트 컨트랙트와 상호 작용하기 위한 인터페이스입니다. [컨트랙트 ABI](/glossary/#abi)에 대해 자세히 알아볼 수 있습니다. Hardhat은 컨트랙트를 컴파일할 때 자동으로 ABI를 생성하여 `artifacts/contracts/MyNFT.sol/MyNFT.json` 파일에 저장합니다. 5단계에서 컨트랙트 인스턴스를 생성할 때 Hardhat Ethers 플러그인이 이 파일에서 ABI를 읽어오므로, 우리가 직접 로드할 필요는 없습니다.

ABI를 확인하고 싶다면 콘솔에 출력해 볼 수 있습니다. 프로젝트의 루트 디렉터리에서 다음을 실행하세요:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## 4단계: IPFS를 사용해 NFT의 메타데이터 구성하기 {#config-meta}

1부 튜토리얼에서 기억하시겠지만, 우리의 `mintNFT` 스마트 컨트랙트 함수는 NFT의 메타데이터를 설명하는 JSON 문서로 확인(resolve)되어야 하는 tokenURI 매개변수를 받습니다. 이는 이름, 설명, 이미지 및 기타 속성과 같은 구성 가능한 속성을 가질 수 있게 하여 NFT에 생명을 불어넣는 핵심 요소입니다.

> _IPFS(Interplanetary File System)는 분산 파일 시스템에서 데이터를 저장하고 공유하기 위한 탈중앙화된 프로토콜이자 피어 투 피어 네트워크입니다._

우리는 NFT가 진정으로 탈중앙화되도록 NFT 자산과 메타데이터를 저장하기 위해, 편리한 IPFS API이자 툴킷인 Pinata를 사용할 것입니다. Pinata 계정이 없다면 [여기](https://app.pinata.cloud)에서 무료 계정에 가입하고 이메일 인증 단계를 완료하세요.

계정을 생성한 후:

- [Files 페이지](https://app.pinata.cloud/ipfs/files)로 이동하여 페이지 오른쪽 상단의 "Add(추가)" 버튼을 클릭합니다.

- Pinata에 이미지를 업로드합니다. 이것이 NFT의 이미지 자산이 됩니다. 자산 이름은 원하는 대로 자유롭게 지정하세요. 공개 IPFS에 업로드해야 합니다. [비공개 IPFS(Private IPFS)](https://docs.pinata.cloud/files/private-ipfs)에 있는 파일은 NFT를 표시하는 지갑이나 마켓플레이스에서 가져올 수 없습니다.

- 업로드 후, Files 페이지에 파일과 함께 CID(콘텐츠 식별자)가 나열된 것을 볼 수 있습니다. CID를 복사하세요. 업로드한 파일은 `https://gateway.pinata.cloud/ipfs/<CID>`에서 확인하거나 Pinata 사이드바의 "Gateways" 아래에 나열된 전용 게이트웨이를 통해 볼 수 있습니다. 예를 들어, 우리가 IPFS에서 사용한 이미지는 [여기](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)에서 찾을 수 있습니다.

이제 Pinata에 문서를 하나 더 업로드해야 합니다. 하지만 그 전에 먼저 문서를 만들어야 합니다!

루트 디렉터리에 `nft-metadata.json`이라는 새 파일을 만들고 다음 json 코드를 추가합니다:

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

json의 데이터를 자유롭게 변경해 보세요. attributes(속성) 섹션의 내용을 제거하거나 추가할 수 있습니다. 가장 중요한 것은 image 필드가 `ipfs://<image-CID>` 형식으로 IPFS 이미지의 위치를 가리키도록 하는 것입니다. 그렇지 않으면 NFT에 (아주 귀여운!) 강아지 사진이 포함될 것입니다.

JSON 파일 편집을 마치면, 이미지를 업로드할 때와 동일한 단계에 따라 파일을 저장하고 Pinata에 업로드합니다. `nft-metadata.json`의 CID도 복사해 두세요. 9단계에서 필요합니다.

## 5단계: 컨트랙트 인스턴스 생성 {#instance-contract}

이제 컨트랙트와 상호 작용하기 위해 코드에 컨트랙트 인스턴스를 만들어야 합니다. 이를 위해서는 1부에서 배포 스크립트가 출력한 컨트랙트 주소가 필요합니다. 컨트랙트를 배포할 때 사용한 주소를 조회하여 [Etherscan](https://sepolia.etherscan.io/)이나 [Blockscout](https://eth-sepolia.blockscout.com/)에서도 찾을 수 있습니다.

![View your contract address on Etherscan](./view-contract-etherscan.png)

위의 예에서 컨트랙트 주소는 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778입니다.

다음으로 Hardhat Ethers 플러그인의 `getContractAt` 메서드를 사용하여 컨트랙트 이름(어떤 ABI를 사용할지 알려줌)과 주소로 컨트랙트를 생성할 것입니다. `mint-nft.js` 파일에 다음을 추가하되, 주소를 자신의 주소로 바꾸세요:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## 6단계: `.env` 파일 확인 {#update-env}

우리가 전송하는 모든 트랜잭션은 계정의 개인 키로 서명되어야 합니다. 튜토리얼의 1부를 완료했다면 `.env` 파일이 이미 다음과 같을 것입니다:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

공개 주소를 추가할 필요는 없습니다. ethers가 개인 키에서 이를 알아냅니다.

## 7단계: 트랜잭션 생성 {#create-txn}

먼저 `mintNFT(tokenURI)`라는 함수를 정의하고 다음을 수행하여 트랜잭션을 생성해 보겠습니다:

1. 트랜잭션을 전송할 계정을 가져옵니다. `ethers.getSigners()`는 네트워크에 구성된 계정들을 반환하며, Sepolia의 경우 `.env`에 개인 키가 있는 계정입니다. `mintNFT`는 `onlyOwner`이므로, 이는 컨트랙트를 배포한 계정과 동일해야 합니다.

1. 수신자를 우리 자신의 주소로 하고 메타데이터 URI를 포함하여 컨트랙트 인스턴스의 `mintNFT` 함수를 호출합니다. 이것이 이 트랜잭션에서 수행하고자 하는 연산이며, 이 경우에는 NFT를 발행하는 것입니다.

논스(재전송 공격을 방지하는, 주소에서 전송된 트랜잭션 수), 가스 한도 또는 수수료를 직접 계산할 필요는 없습니다. ethers가 트랜잭션을 전송하기 전에 이를 가져오거나 추정합니다.

이제 `mint-nft.js` 파일은 다음과 같아야 합니다:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // 트랜잭션을 전송합니다. ethers가 논스, 가스 한도 및 수수료를 대신 채워줍니다.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## 8단계: 트랜잭션 서명 {#sign-txn}

네트워크가 우리의 개인 키로 구성되어 있기 때문에, ethers는 트랜잭션을 전송하기 전에 자동으로 개인 키로 서명합니다.

`mintNFT`를 호출하면 트랜잭션이 전송된 후 반환되며, 트랜잭션 해시를 제공합니다. 이를 사용하여 트랜잭션이 채굴되었고 네트워크에서 누락되지 않았는지 확인할 수 있습니다. 그런 다음 `tx.wait()`는 트랜잭션이 블록에 포함될 때까지 기다립니다. 트랜잭션이 성공적으로 처리되었는지 알 수 있도록 오류 검사 코드도 추가했습니다.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // 트랜잭션을 전송합니다. ethers가 논스, 가스 한도 및 수수료를 대신 채워줍니다.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // 트랜잭션이 블록에 포함될 때까지 기다립니다.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## 9단계: `mintNFT` 호출 및 `mint-nft.js` 실행 {#call-mintnft-fn}

Pinata에 업로드한 `nft-metadata.json`을 기억하시나요? Pinata에서 해당 CID를 가져와 `ipfs://<metadata-CID>`를 `mintNFT` 함수의 매개변수로 전달합니다. 지갑과 마켓플레이스는 선택한 IPFS 게이트웨이를 통해 `ipfs://` URI를 확인하므로, NFT는 특정 단일 게이트웨이에 의존하지 않습니다.

> 새 창에서 `https://gateway.pinata.cloud/ipfs/<metadata-CID>`를 로드하여 복사한 CID가 <strong>nft-metadata.json</strong>에 연결되는지 다시 확인하세요. 페이지는 아래 스크린샷과 유사해야 합니다:

![Your page should display the json metadata](./metadataJSON.png)_Your page should display the json metadata_

전체적으로 코드는 다음과 같아야 합니다:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // 트랜잭션을 전송합니다. ethers가 논스, 가스 한도 및 수수료를 대신 채워줍니다.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // 트랜잭션이 블록에 포함될 때까지 기다립니다.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

이제 Sepolia에서 스크립트를 실행하여 NFT를 발행해 보세요:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

몇 초 후 터미널에 다음과 같은 응답이 표시되어야 합니다:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

트랜잭션의 세부 정보를 보려면 [Etherscan](https://sepolia.etherscan.io/)이나 [Blockscout](https://eth-sepolia.blockscout.com/)에서 해당 해시를 검색하세요.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_View your NFT transaction hash on Etherscan_

이것으로 끝입니다! 이제 이더리움 블록체인에 NFT를 배포하고 발행했습니다 <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`를 사용하면 여러분이 (그리고 지갑이) 원하는 만큼 많은 NFT를 발행할 수 있습니다! 단, NFT의 메타데이터를 설명하는 새로운 tokenURI를 전달해야 합니다(그렇지 않으면 ID만 다르고 똑같은 NFT를 여러 개 만들게 됩니다).

아마 지갑에서 NFT를 자랑하고 싶으실 텐데요. 그렇다면 [3부: 지갑에서 NFT를 보는 방법](/developers/tutorials/how-to-view-nft-in-metamask/)을 꼭 확인해 보세요!
