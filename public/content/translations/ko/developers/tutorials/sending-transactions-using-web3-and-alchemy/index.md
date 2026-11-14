---
title: "Viem을 사용하여 트랜잭션 전송하기"
description: "Viem 라이브러리를 사용하여 이더리움 트랜잭션을 전송하는 초보자 친화적인 가이드입니다. 이더리움 블록체인에 트랜잭션을 전송하려면 생성, 서명, 브로드캐스트라는 세 가지 주요 단계가 필요합니다. 이 세 가지 단계를 모두 살펴보겠습니다."
author: "엘란 할펀"
tags:
  - 트랜잭션
  - viem
  - alchemy
skill: beginner
breadcrumb: "트랜잭션 전송하기"
lang: ko
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

이 문서는 [Viem](https://viem.sh/) 라이브러리를 사용하여 이더리움 트랜잭션을 전송하는 초보자 친화적인 가이드입니다. 이더리움 블록체인에 트랜잭션을 전송하려면 생성, 서명, 브로드캐스트라는 세 가지 주요 단계가 필요합니다. 이 세 가지 단계를 모두 살펴보며 여러분이 가질 수 있는 질문에 답해 보겠습니다! 이 튜토리얼에서는 [Alchemy](https://www.alchemy.com/)를 사용하여 이더리움 체인으로 트랜잭션을 전송할 것입니다. [여기에서 무료 Alchemy 계정을 생성](https://auth.alchemy.com/signup)할 수 있습니다.

**참고:** 이 가이드는 앱의 <em>백엔드</em>에서 트랜잭션에 서명하기 위한 것입니다. 프론트엔드에서 트랜잭션 서명을 통합하려면 [메타마스크 공급자 API](https://docs.metamask.io/wallet/reference/provider-api/)를 확인하세요.

## 기본 사항 {#the-basics}

처음 시작하는 대부분의 블록체인 개발자들처럼, 여러분도 트랜잭션을 전송하는 방법(매우 간단해야 할 작업)에 대해 조사하다가 서로 다른 내용을 말하는 수많은 가이드를 접하고 다소 압도되거나 혼란스러웠을 수 있습니다. 만약 그렇다면 걱정하지 마세요. 우리 모두 한때는 그랬으니까요! 그러니 시작하기 전에 몇 가지 사항을 명확히 짚고 넘어가겠습니다.

### 1\. Alchemy는 개인 키를 저장하지 않습니다 {#alchemy-does-not-store-your-private-keys}

- 이는 Alchemy가 여러분을 대신하여 트랜잭션에 서명하고 전송할 수 없음을 의미합니다. 그 이유는 보안 목적 때문입니다. Alchemy는 절대 개인 키 공유를 요구하지 않으며, 여러분도 호스팅된 노드(또는 그 누구와도)와 개인 키를 공유해서는 안 됩니다.
- Alchemy의 핵심 API를 사용하여 블록체인에서 데이터를 읽을 수는 있지만, 데이터를 쓰려면 Alchemy를 통해 트랜잭션을 전송하기 전에 다른 도구를 사용하여 트랜잭션에 서명해야 합니다(이는 다른 모든 [노드 서비스](/developers/docs/nodes-and-clients/nodes-as-a-service/)에서도 마찬가지입니다).

### 2\. '서명자(signer)'란 무엇인가요? {#what-is-a-signer}

- 서명자는 개인 키를 사용하여 여러분을 대신해 트랜잭션에 서명합니다. 이 튜토리얼에서는 트랜잭션에 서명하기 위해 [Viem](https://viem.sh/)을 사용할 것이지만, 다른 Web3 라이브러리를 사용할 수도 있습니다.
- 프론트엔드에서 서명자의 좋은 예로는 여러분을 대신해 트랜잭션에 서명하고 전송하는 [메타마스크](https://metamask.io/)가 있습니다.

### 3\. 왜 트랜잭션에 서명해야 하나요? {#why-do-i-need-to-sign-my-transactions}

- 이더리움 네트워크에서 트랜잭션을 전송하려는 모든 사용자는 트랜잭션의 출처가 본인임을 검증하기 위해 (개인 키를 사용하여) 트랜잭션에 서명해야 합니다.
- 개인 키에 접근하면 이더리움 계정에 대한 모든 권한을 얻게 되어 여러분(또는 접근 권한이 있는 누구나)을 대신해 트랜잭션을 수행할 수 있으므로, 이 개인 키를 보호하는 것은 매우 중요합니다.

### 4\. 개인 키는 어떻게 보호하나요? {#how-do-i-protect-my-private-key}

- 개인 키를 보호하고 이를 사용해 트랜잭션을 전송하는 방법에는 여러 가지가 있습니다. 이 튜토리얼에서는 `.env` 파일을 사용할 것입니다. 하지만 개인 키를 저장하는 별도의 공급자를 사용하거나, 키스토어 파일을 사용하는 등 다른 옵션을 선택할 수도 있습니다.

### 5\. `eth_sendTransaction`과 `eth_sendRawTransaction`의 차이점은 무엇인가요? {#difference-between-send-and-send-raw}

`eth_sendTransaction`과 `eth_sendRawTransaction`은 모두 트랜잭션을 이더리움 네트워크에 브로드캐스트하여 향후 블록에 추가되도록 하는 이더리움 API 함수입니다. 이 둘은 트랜잭션 서명을 처리하는 방식에서 차이가 있습니다.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction)은 _서명되지 않은_ 트랜잭션을 전송하는 데 사용됩니다. 즉, 트랜잭션을 전송받는 노드가 체인에 브로드캐스트하기 전에 트랜잭션에 서명할 수 있도록 여러분의 개인 키를 관리해야 합니다. Alchemy는 사용자의 개인 키를 보관하지 않으므로 이 메서드를 지원하지 않습니다.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction)은 이미 서명된 트랜잭션을 브로드캐스트하는 데 사용됩니다. 즉, 먼저 개인 키로 트랜잭션에 서명한 다음(Viem에서는 [로컬 계정](https://viem.sh/docs/accounts/local/privateKeyToAccount)과 함께 [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction)을 사용), 그 결과를 `eth_sendRawTransaction`에 전달해야 합니다.

Viem을 사용할 때 `eth_sendRawTransaction`은 [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction) 함수를 호출하여 접근합니다.

이 튜토리얼에서는 이 방법을 사용할 것입니다.

### 6\. Web3 라이브러리란 무엇인가요? {#what-is-the-web3-library}

- Web3 라이브러리는 이더리움 개발에서 매우 흔하게 사용되는 표준 [JSON-RPC 호출](/developers/docs/apis/json-rpc/)을 감싸는 래퍼(wrapper)입니다.
- 다양한 언어를 위한 여러 Web3 라이브러리가 있습니다. 이 튜토리얼에서는 TypeScript로 작성되었으며 모든 JavaScript 프로젝트에서 작동하는 [Viem](https://viem.sh/)을 사용할 것입니다. [여기](/developers/docs/apis/javascript/)에서 [Ethers.js](https://docs.ethers.org/v6/)와 같은 다른 옵션도 확인할 수 있습니다.

자, 이제 몇 가지 궁금증을 해결했으니 튜토리얼로 넘어가 보겠습니다. 언제든지 Alchemy [디스코드](https://discord.gg/gWuC7zB)에서 자유롭게 질문해 주세요!

### 7\. 안전하고 가스가 최적화된 비공개 트랜잭션을 전송하는 방법은 무엇인가요? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy는 트랜잭션 리소스 세트를 제공합니다](https://www.alchemy.com/docs/sending-transactions). 이를 사용하여 트랜잭션을 전송하고, 트랜잭션이 발생하기 전에 시뮬레이션하며, 비공개 트랜잭션을 전송하고, 가스가 최적화된 트랜잭션을 전송할 수 있습니다.
- 또한 [Alchemy 웹훅(webhook)](https://www.alchemy.com/docs/reference/webhooks-overview)을 사용하여 트랜잭션이 멤풀에서 가져와져 체인에 추가될 때 알림을 받을 수 있습니다.

**참고:** 이 가이드를 진행하려면 Alchemy 계정, 이더리움 주소 또는 메타마스크 지갑, Node.js 및 npm이 설치되어 있어야 합니다. 그렇지 않은 경우 다음 단계를 따르세요.

1.  [무료 Alchemy 계정 생성하기](https://auth.alchemy.com/signup)
2.  [메타마스크 계정 생성하기](https://metamask.io/) (또는 이더리움 주소 얻기)
3.  [Node.js 및 npm 설치하기](https://nodejs.org/en/download/)
## 트랜잭션 전송 단계 {#steps-to-sending-your-transaction}

### 1\. Sepolia 테스트넷에서 Alchemy 앱 생성하기 {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemy 대시보드](https://dashboard.alchemy.com/)로 이동하여 새 앱을 생성하고, 네트워크로 Sepolia(또는 다른 테스트넷)를 선택합니다.

### 2\. Sepolia 퍼싯에서 ETH 요청하기 {#request-eth-from-sepolia-faucet}

[Alchemy Sepolia 퍼싯](https://www.alchemy.com/faucets/ethereum-sepolia)의 지침에 따라 ETH를 받거나, 다른 [Sepolia 퍼싯](/developers/docs/networks/#sepolia) 중 하나를 사용하세요. 퍼싯은 소량의 ETH를 제공하며(Alchemy 퍼싯은 하루에 0.1 ETH 제공), 이는 이 튜토리얼을 진행하기에 충분한 양입니다. 다른 네트워크가 아닌 **Sepolia** 이더리움 주소(메타마스크에서 확인)를 입력해야 합니다. 지침을 따른 후 지갑에 ETH가 들어왔는지 다시 한번 확인하세요.

### 3\. 새 프로젝트 디렉터리를 생성하고 해당 디렉터리로 `cd` 하기 {#create-a-new-project-direction}

명령줄(Mac의 경우 터미널)에서 새 프로젝트 디렉터리를 생성하고 해당 디렉터리로 이동합니다.

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Viem(또는 다른 Web3 라이브러리) 설치하기 {#install-alchemy-web3}

프로젝트 디렉터리에서 다음 명령을 실행하여 [Viem](https://viem.sh/)을 설치합니다.

참고로 Ethers.js 라이브러리를 사용하려면 [여기 지침을 따르세요](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. dotenv 설치하기 {#install-dotenv}

API 키와 개인 키를 안전하게 저장하기 위해 `.env` 파일을 사용할 것입니다.

```sh
npm install dotenv
```

### 6\. `.env` 파일 생성하기 {#create-the-dotenv-file}

프로젝트 디렉터리에 `.env` 파일을 생성하고 다음 내용을 추가합니다('`your-api-url`'과 '`your-private-key`'를 대체하세요).

- Alchemy API URL을 찾으려면 대시보드에서 방금 생성한 앱의 세부 정보 페이지로 이동하여 오른쪽 상단의 'View Key'를 클릭하고 HTTP URL을 복사합니다.
- 메타마스크를 사용하여 개인 키를 찾으려면 이 [가이드](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)를 확인하세요. 테스트넷 ETH만 있는 계정을 사용하세요.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> 파일을 커밋하지 마세요! <code>.env</code> 파일을 다른 사람과 공유하거나 노출하면 비밀 정보가 유출될 수 있으므로 절대 공유하지 마세요. 버전 관리를 사용하는 경우 <code>.env</code>를 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 파일에 추가하세요.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js` 파일 생성하기 {#create-sendtx-js}

좋습니다. 이제 민감한 데이터를 `.env` 파일에 안전하게 보호했으니 코딩을 시작해 보겠습니다. 트랜잭션 전송 예제에서는 메타마스크의 두 번째 계정과 같이 여러분이 제어하는 다른 주소로 0.001 ETH를 전송할 것입니다.

예제 트랜잭션을 구성하고 전송할 `sendTx.js` 파일을 생성하고 다음 코드 줄을 추가합니다.

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // 논스는 0부터 카운트를 시작합니다

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: ETH를 전송할 주소로 변경하세요
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // 메시지를 전송하거나 스마트 컨트랙트를 실행하기 위한 선택적 데이터 필드
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

`0xYourSecondAddress`를 ETH를 전송할 주소로 반드시 변경하세요. 스크립트는 `PRIVATE_KEY`에서 여러분의 (전송하는) 주소를 도출하므로 직접 입력할 필요가 없습니다.

이제 이 코드를 실행하기 전에 여기에 있는 몇 가지 구성 요소에 대해 이야기해 보겠습니다.

- `account`: [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount)를 사용하여 개인 키로 생성된 로컬 계정입니다. 서명은 여러분의 컴퓨터에서 이루어지며 개인 키는 절대 Alchemy로 전송되지 않습니다.
- `publicClient` 및 `walletClient`: Alchemy URL로 JSON-RPC 요청을 보내는 Viem 클라이언트입니다. 퍼블릭 클라이언트는 체인에서 데이터를 읽고, 지갑 클라이언트는 계정을 위한 트랜잭션을 준비하고 서명합니다.
- `nonce`: 논스 사양은 주소에서 전송된 트랜잭션 수를 추적하는 데 사용됩니다. 보안 목적과 재전송 공격(replay attack)을 방지하기 위해 이것이 필요합니다. 주소에서 전송된 트랜잭션 수를 가져오기 위해 [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)를 사용합니다. Viem이 이를 자동으로 채워주기도 하지만, 여기서는 이것이 어디서 오는지 보여주기 위해 명시적으로 가져옵니다.
- `transaction`: 트랜잭션 객체에는 지정해야 할 몇 가지 측면이 있습니다. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest)는 현재 네트워크 상태를 기반으로 `chainId`와 [EIP-1559](/developers/docs/gas/) 수수료 필드인 `maxFeePerGas` 및 `maxPriorityFeePerGas`를 포함한 나머지 부분을 채워줍니다.
  - `to`: ETH를 전송할 주소입니다.
  - `value`: 전송하려는 금액으로, 10^18 Wei = 1 ETH인 Wei 단위로 지정됩니다. [`parseEther`](https://viem.sh/docs/utilities/parseEther)는 ETH 금액을 Wei로 변환해 줍니다. 가스 비용도 지불해야 하므로 계정에는 이보다 조금 더 많은 금액이 필요합니다.
  - `gas`: 트랜잭션에 포함할 적절한 가스 양을 결정하는 방법에는 여러 가지가 있습니다. Alchemy는 온체인 활동에 대해 알려줄 수 있는 [웹훅(webhook)](https://www.alchemy.com/docs/reference/webhooks-overview)을 지원합니다. 메인넷 트랜잭션의 경우, 현재 가스 상태를 확인하여 포함할 적절한 가스 양을 결정하는 것이 좋습니다. 일반 주소로의 단순한 ETH 전송은 항상 정확히 21000 가스를 사용하며 이는 모든 트랜잭션의 최소값이므로 여기에 21000을 입력합니다. `gas`를 생략하면 Viem이 이를 추정해 줍니다.
  - `nonce`: 위의 논스 정의를 참조하세요. 논스는 0부터 계산을 시작합니다.
  - [선택 사항] data: 전송과 함께 추가 정보를 보내거나 스마트 컨트랙트를 호출하는 데 사용되며, 잔액 전송에는 필요하지 않습니다. 아래 참고 사항을 확인하세요.
- `signedTx`: 트랜잭션 객체에 서명하기 위해 `signTransaction` 메서드를 사용하며, 이는 `PRIVATE_KEY`로 생성된 계정을 사용하여 로컬에서 서명합니다.
- `sendRawTransaction`: 서명된 트랜잭션이 있으면 `eth_sendRawTransaction`을 호출하는 `sendRawTransaction`을 사용하여 후속 블록에 포함되도록 전송할 수 있습니다.
- `waitForTransactionReceipt`: 트랜잭션이 블록에 포함될 때까지 기다렸다가 영수증을 반환합니다.

**data에 대한 참고 사항**
이더리움에서 전송할 수 있는 트랜잭션에는 두 가지 주요 유형이 있습니다.

- 잔액 전송: 한 주소에서 다른 주소로 ETH를 전송합니다. data 필드는 필요하지 않지만, 트랜잭션과 함께 추가 정보를 보내려면 이 필드에 16진수(HEX) 형식으로 해당 정보를 포함할 수 있습니다.
  - 예를 들어, 불변의 타임스탬프를 부여하기 위해 IPFS 문서의 해시를 이더리움 체인에 기록하려고 한다고 가정해 보겠습니다. 이 경우 data 필드는 Viem의 [`toHex`](https://viem.sh/docs/utilities/toHex)를 사용하여 `data: toHex("IPFS hash")`와 같은 형태가 되어야 합니다. 그러면 이제 누구나 체인을 쿼리하여 해당 문서가 언제 추가되었는지 확인할 수 있습니다.
- 스마트 컨트랙트 트랜잭션: 체인에서 스마트 컨트랙트 코드를 실행합니다. 이 경우 data 필드에는 실행하려는 스마트 함수와 매개변수가 포함되어야 합니다.
  - 실제 예제는 [Hello World 스마트 컨트랙트 튜토리얼](/developers/tutorials/hello-world-smart-contract/)을 확인하세요.

### 8\. `node sendTx.js`를 사용하여 코드 실행하기 {#run-the-code-using-node-sendtx-js}

터미널이나 명령줄로 돌아가서 다음을 실행합니다.

```sh
node sendTx.js
```

### 9\. 블록 탐색기에서 트랜잭션 확인하기 {#see-your-transaction-in-the-mempool}

스크립트는 노드가 트랜잭션을 수락하는 즉시 트랜잭션 해시를 출력한 다음, 블록에 포함될 때까지(일반적으로 몇 초 이내) 기다렸다가 결과를 출력합니다. 세부 정보를 보려면 해시를 [Sepolia Etherscan](https://sepolia.etherscan.io/)이나 [Blockscout](https://eth-sepolia.blockscout.com/)과 같은 Sepolia 블록 탐색기에 붙여넣으세요. 거기서 트랜잭션이 대기 중(pending) 상태에서 포함됨(included) 상태로 변경되는 것을 지켜볼 수 있으며, 금액, 수수료 및 트랜잭션이 포함된 블록을 확인할 수 있습니다.

대신 `insufficient funds` 오류가 표시되면 계정에 전송 금액과 가스를 충당할 만큼 충분한 Sepolia ETH가 없는 것입니다. 2단계로 돌아가서 퍼싯에서 더 많은 ETH를 요청하세요.

**야호! 방금 Alchemy를 사용하여 첫 번째 이더리움 트랜잭션을 전송했습니다 🎉**

_이 가이드에 대한 피드백이나 제안 사항이 있다면 Alchemy의 [디스코드](https://discord.gg/gWuC7zB)에서 Elan에게 메시지를 보내주세요!_

_원문은 Alchemy에서 발행되었습니다._
