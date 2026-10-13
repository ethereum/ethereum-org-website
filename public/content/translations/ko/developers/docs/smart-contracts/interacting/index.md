---
title: 스마트 컨트랙트와 상호작용하기
description: 이더리움에 이미 배포된 스마트 컨트랙트에서 데이터를 읽고 쓰는 방법을 알아보세요.
lang: ko
---

항상 직접 스마트 컨트랙트를 작성하고 배포해야 하는 것은 아닙니다. 개발자로서 대부분의 경우 다른 사람들이 이더리움 네트워크에 이미 배포한 스마트 컨트랙트와 상호작용하게 될 것입니다.

이 페이지에서는 스마트 컨트랙트와 상호작용하는 두 가지 기본 방법인 데이터 **읽기**와 데이터 **쓰기**, 그리고 이 두 가지를 수행하는 데 필요한 도구에 대해 다룹니다.

## 전제 조건 {#prerequisites}

다음 내용을 이해하고 있어야 합니다.

- [스마트 컨트랙트 작동 방식](/developers/docs/smart-contracts/)
- [이더리움 계정과 트랜잭션에 서명하는 방법](/developers/docs/accounts/)
- [트랜잭션이란 무엇인가](/developers/docs/transactions/)

## 스마트 컨트랙트와 상호작용하는 두 가지 방법 {#two-ways}

스마트 컨트랙트와의 상호작용은 두 가지 범주로 나뉩니다.

### 컨트랙트에서 읽기 {#reading-from-a-contract}

읽기는 트랜잭션을 생성하지 않고 블록체인의 어떤 상태도 변경하지 않는 **무료** 작업입니다.

컨트랙트에서 읽을 때는 단순히 이미 존재하는 데이터를 조회하는 것입니다. 예를 들면 다음과 같습니다.

- ERC-20 토큰 잔액 확인
- 탈중앙화 거래소에서 현재 가격 읽기
- NFT 소유자 가져오기

읽기는 상태를 수정하지 않으므로 [가스](/developers/docs/gas/) 비용이 들지 않으며, ETH가 없어도 누구나 수행할 수 있습니다.

### 컨트랙트에 쓰기 {#writing-to-a-contract}

쓰기는 트랜잭션이 필요하고 가스 비용이 드는 **상태 변경** 작업입니다.

컨트랙트에 쓸 때는 블록체인 상태를 수정하는 함수를 트리거하는 것입니다. 예를 들면 다음과 같습니다.

- 토큰 전송
- 탈중앙화 거래소에서 토큰 스왑
- NFT 발행

쓰기에는 항상 다음이 필요합니다.

1. 가스 비용을 지불할 충분한 ETH가 있는 [외부 소유 계정(EOA)](/developers/docs/accounts/#types-of-account)
2. 계정의 개인 키로 서명된 트랜잭션
3. 채굴되어 블록에 포함될 트랜잭션

[계정 추상화](/roadmap/account-abstraction/)를 사용하면 스마트 컨트랙트 계정도 쓰기를 시작할 수 있으며, 페이마스터가 사용자를 대신하여 가스를 지불할 수 있으므로 ETH를 보유한 EOA가 반드시 필요한 것은 아닙니다.

## 컨트랙트 ABI 이해하기 {#understanding-contract-abis}

스마트 컨트랙트와 상호작용하려면 애플리케이션이 컨트랙트가 *무엇을* 할 수 있는지 알아야 합니다. 이때 **애플리케이션 바이너리 인터페이스(ABI)**가 필요합니다.

ABI는 다음을 설명하는 JSON 문서입니다.

- 컨트랙트가 노출하는 모든 함수(이름, 입력, 출력)
- 컨트랙트가 발생시킬 수 있는 모든 이벤트
- 컨트랙트와 통신할 때 데이터를 인코딩하고 디코딩하는 방법

ABI를 컨트랙트의 사용 설명서라고 생각하세요. ABI가 없으면 애플리케이션은 어떤 함수가 존재하는지, 어떤 매개변수를 예상하는지 알 수 없습니다.

### 컨트랙트 ABI를 찾을 수 있는 곳 {#where-to-find-abis}

- **Etherscan의 검증된 컨트랙트** - [Etherscan](https://etherscan.io)은 검증된 소스 코드에 대한 ABI를 자동으로 노출합니다.
- **개발자로부터** - 많은 프로젝트가 문서나 npm 패키지에 ABI를 게시합니다.
- **소스에서 생성** - Solidity 소스 코드가 있는 경우, 이를 [컴파일하여](/developers/docs/smart-contracts/compiling/) ABI를 생성할 수 있습니다.

## 컨트랙트와 상호작용하기 위한 도구 및 라이브러리 {#tools-and-libraries}

개발자는 일반적으로 웹 앱, 백엔드 또는 스크립트에서 컨트랙트와 상호작용하기 위해 JavaScript/TypeScript 라이브러리를 사용합니다.

### 클라이언트 라이브러리(JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - 최고 수준의 타입 안정성을 갖춘 이더리움용 최신 경량 TypeScript 인터페이스
- **[ethers.js](https://docs.ethers.org/)** - 이더리움 블록체인과 상호작용하기 위해 실전에서 검증된 라이브러리
- **[Web3.js](https://web3js.org/)** - 오리지널 이더리움 JavaScript API

### 백엔드 라이브러리 {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - 서버 측 스크립트 및 봇을 위해 Node.js에서도 작동합니다.
- **[Web3.py](https://web3py.readthedocs.io/)** - 이더리움 상호작용을 위한 Python 라이브러리
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Geth 팀의 공식 Go 라이브러리

### 예시: Viem으로 토큰 잔액 읽기 {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC 컨트랙트 주소 및 ABI (balanceOf용 일부)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC는 소수점 6자리를 가집니다
```

### 예시: ethers.js로 트랜잭션 보내기 {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 transfer ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // 트랜잭션이 채굴되기를 기다립니다
console.log(`Transferred! TX: ${tx.hash}`)
```

## 이벤트 및 로그 {#events-and-logs}

스마트 컨트랙트는 무언가 발생했음을 알리기 위해 **이벤트**를 발생시킬 수 있습니다. 애플리케이션은 이러한 이벤트를 수신하여 실시간으로 반응할 수 있습니다.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC Transfer 이벤트를 감시합니다
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## 트랜잭션 시뮬레이션 {#simulating}

트랜잭션을 보내기 전에 가스를 소비하지 않고도 트랜잭션이 성공할지 확인하고 반환 값을 보기 위해 **시뮬레이션**할 수 있습니다. 이는 오류를 조기에 발견하고 결과를 미리 보는 데 유용합니다.

대부분의 클라이언트 라이브러리는 `eth_call`를 통해 이를 지원합니다.

```ts
// Viem 사용
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## 지갑 및 서명하기 {#wallets-and-signing}

탈중앙화 애플리케이션(dapp)에서는 사용자의 지갑(메타마스크, Rainbow 또는 WalletConnect 등)이 서명하기를 처리합니다. 개인 키를 직접 관리하지 않습니다.

[지갑 라이브러리 및 연결 도구](/developers/docs/apis/javascript/)는 이를 추상화하므로 애플리케이션 로직을 구축하는 데 집중할 수 있습니다.

## 관련 튜토리얼 {#related-tutorials}

- [JavaScript에서 스마트 컨트랙트 호출하기](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Web3.js 및 Alchemy를 사용하여 트랜잭션 보내기](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [지갑에서 NFT를 보는 방법](/developers/tutorials/how-to-view-nft-in-metamask/)

## 더 읽을거리 {#further-reading}

- [Viem 문서: 컨트랙트 읽기 및 쓰기](https://viem.sh/docs/contract/readContract)
- [ethers.js 문서: 컨트랙트](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI 사양](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI란 무엇인가? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## 관련 주제 {#related-topics}

- [스마트 컨트랙트 컴파일링](/developers/docs/smart-contracts/compiling/)
- [스마트 컨트랙트 배포하기](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [백엔드 API](/developers/docs/apis/backend/)