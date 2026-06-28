---
title: "JavaScript에서 스마트 컨트랙트 호출하기"
description: "DAI 토큰 예제를 사용하여 JavaScript에서 스마트 컨트랙트 함수를 호출하는 방법"
author: jdourlens
tags: ["트랜잭션", "프론트엔드", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "JS에서 컨트랙트 호출하기"
lang: ko
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이 튜토리얼에서는 JavaScript에서 [스마트 컨트랙트](/developers/docs/smart-contracts/) 함수를 호출하는 방법을 알아봅니다. 먼저 스마트 컨트랙트의 상태(예: ERC-20 보유자의 잔액)를 읽은 다음, 토큰 전송을 통해 블록체인의 상태를 수정해 보겠습니다. 여러분은 이미 [블록체인과 상호작용하기 위한 JS 환경 설정](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)에 익숙해야 합니다.

이 예제에서는 DAI 토큰을 다루며, 테스트 목적으로 ganache-cli를 사용하여 블록체인을 포크하고 이미 많은 DAI를 보유하고 있는 주소를 잠금 해제할 것입니다:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

스마트 컨트랙트와 상호작용하려면 해당 주소와 ABI가 필요합니다:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

이 프로젝트에서는 전체 ERC-20 ABI에서 `balanceOf` 및 `transfer` 함수만 유지하도록 축소했지만, [여기에서 전체 ERC-20 ABI](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)를 확인할 수 있습니다.

그런 다음 스마트 컨트랙트를 인스턴스화해야 합니다:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

또한 두 개의 주소를 설정합니다:

- 전송을 받을 주소와
- 전송을 보낼, 이미 잠금 해제된 주소:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

다음 부분에서는 `balanceOf` 함수를 호출하여 두 주소가 보유한 현재 토큰 양을 가져오겠습니다.

## Call: 스마트 컨트랙트에서 값 읽기 {#call-reading-value-from-a-smart-contract}

첫 번째 예제에서는 "상수(constant)" 메서드를 호출하고 트랜잭션을 보내지 않은 채 EVM에서 스마트 컨트랙트 메서드를 실행합니다. 이를 위해 주소의 ERC-20 잔액을 읽어보겠습니다. [ERC-20 토큰에 대한 문서 읽기](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

ABI를 제공하여 인스턴스화된 스마트 컨트랙트 메서드에는 다음과 같이 접근할 수 있습니다: `yourContract.methods.methodname`. `call` 함수를 사용하면 함수 실행 결과를 받게 됩니다.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAI ERC-20은 18자리의 소수점을 가지므로, 올바른 금액을 얻으려면 18개의 0을 제거해야 한다는 점을 기억하세요. JavaScript는 큰 숫자 값을 처리하지 못하므로 uint256은 문자열로 반환됩니다. [JS에서 큰 숫자를 다루는 방법](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)을 잘 모르겠다면 bignumber.js에 대한 튜토리얼을 확인하세요.

## Send: 스마트 컨트랙트 함수에 트랜잭션 보내기 {#send-sending-a-transaction-to-a-smart-contract-function}

두 번째 예제에서는 DAI 스마트 컨트랙트의 전송(transfer) 함수를 호출하여 두 번째 주소로 10 DAI를 전송해 보겠습니다. 전송 함수는 수신자 주소와 전송할 토큰 양이라는 두 가지 매개변수를 받습니다:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

호출(call) 함수는 블록체인에 채굴될 트랜잭션의 해시를 반환합니다. 이더리움에서 트랜잭션 해시는 예측 가능합니다. 이것이 트랜잭션이 실행되기 전에 트랜잭션의 해시를 얻을 수 있는 이유입니다([여기에서 해시가 계산되는 방법을 알아보세요](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

이 함수는 트랜잭션을 블록체인에 제출하기만 하므로, 트랜잭션이 언제 채굴되어 블록체인에 포함되는지 알기 전까지는 결과를 볼 수 없습니다. 다음 튜토리얼에서는 [해시를 통해 블록체인에서 트랜잭션이 실행되기를 기다리는 방법](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)을 알아보겠습니다.