---
title: "Web3를 사용하여 트랜잭션 전송하기"
description: "Web3를 사용하여 이더리움 트랜잭션을 전송하는 초보자용 가이드입니다. 이더리움 블록체인에 트랜잭션을 전송하려면 생성, 서명, 브로드캐스트라는 세 가지 주요 단계를 거쳐야 합니다. 이 세 가지 단계를 모두 살펴보겠습니다."
author: "엘란 할펀"
tags:
  - 트랜잭션
  - web3.js
  - alchemy
skill: beginner
breadcrumb: "트랜잭션 전송하기"
lang: ko
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

이 문서는 Web3를 사용하여 이더리움 트랜잭션을 전송하는 초보자용 가이드입니다. 이더리움 블록체인에 트랜잭션을 전송하려면 생성, 서명, 브로드캐스트라는 세 가지 주요 단계를 거쳐야 합니다. 이 세 가지 단계를 모두 살펴보며 여러분이 가질 수 있는 궁금증을 해결해 드리겠습니다! 이 튜토리얼에서는 [Alchemy](https://www.alchemy.com/)를 사용하여 이더리움 체인에 트랜잭션을 전송할 것입니다. [여기에서 무료 Alchemy 계정을 생성](https://auth.alchemy.com/signup)할 수 있습니다.

**참고:** 이 가이드는 앱의 <em>백엔드</em>에서 트랜잭션에 서명하기 위한 것입니다. 프론트엔드에서 트랜잭션 서명하기를 통합하려면 [브라우저 공급자와 Web3](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) 통합을 확인하세요.

## 기본 사항 {#the-basics}

처음 시작하는 대부분의 블록체인 개발자들처럼, 여러분도 트랜잭션을 전송하는 방법(매우 간단해야 할 작업)에 대해 조사하다가 서로 다른 내용을 말하는 수많은 가이드를 접하고 다소 압도되거나 혼란스러웠을 수 있습니다. 만약 그렇다면 걱정하지 마세요. 우리 모두 한때는 그랬으니까요! 그러니 시작하기 전에 몇 가지 사항을 명확히 짚고 넘어가겠습니다.

### 1\. Alchemy는 개인 키를 저장하지 않습니다 {#alchemy-does-not-store-your-private-keys}

- 이는 Alchemy가 여러분을 대신하여 트랜잭션에 서명하고 전송할 수 없음을 의미합니다. 그 이유는 보안 목적 때문입니다. Alchemy는 절대 개인 키 공유를 요구하지 않으며, 여러분도 호스팅된 노드(또는 그 누구와도)와 개인 키를 공유해서는 안 됩니다.
- Alchemy의 핵심 API를 사용하여 블록체인에서 데이터를 읽을 수는 있지만, 데이터를 쓰려면 Alchemy를 통해 트랜잭션을 전송하기 전에 다른 도구를 사용하여 트랜잭션에 서명해야 합니다(이는 다른 모든 [노드 서비스](/developers/docs/nodes-and-clients/nodes-as-a-service/)에서도 마찬가지입니다).

### 2\. "서명자(signer)"란 무엇인가요?
- 서명자는 개인 키를 사용하여 여러분을 대신해 트랜잭션에 서명합니다. 이 튜토리얼에서는 트랜잭션에 서명하기 위해 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)를 사용할 것이지만, 다른 Web3 라이브러리를 사용할 수도 있습니다.
- 프론트엔드에서 서명자의 좋은 예로는 여러분을 대신해 트랜잭션에 서명하고 전송하는 [메타마스크](https://metamask.io/)가 있습니다.
### 3\. 왜 트랜잭션에 서명해야 하나요? {#why-do-i-need-to-sign-my-transactions}

- 이더리움 네트워크에서 트랜잭션을 전송하려는 모든 사용자는 트랜잭션의 출처가 본인임을 검증하기 위해 (개인 키를 사용하여) 트랜잭션에 서명해야 합니다.
- 개인 키에 접근하면 이더리움 계정에 대한 모든 권한을 얻게 되어 여러분(또는 접근 권한이 있는 누구나)을 대신해 트랜잭션을 수행할 수 있으므로, 이 개인 키를 보호하는 것은 매우 중요합니다.

### 4\. 개인 키는 어떻게 보호하나요? {#how-do-i-protect-my-private-key}

- 개인 키를 보호하고 이를 사용해 트랜잭션을 전송하는 방법에는 여러 가지가 있습니다. 이 튜토리얼에서는 `.env` 파일을 사용할 것입니다. 하지만 개인 키를 저장하는 별도의 공급자를 사용하거나, 키스토어 파일을 사용하는 등 다른 옵션을 선택할 수도 있습니다.

### 5\. `eth_sendTransaction`와 `eth_sendRawTransaction`의 차이점은 무엇인가요? {#difference-between-send-and-send-raw}

`eth_sendTransaction`와 `eth_sendRawTransaction`는 모두 트랜잭션을 이더리움 네트워크에 브로드캐스트하여 향후 블록에 추가되도록 하는 이더리움 API 함수입니다. 두 함수는 트랜잭션 서명하기를 처리하는 방식에서 차이가 있습니다.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction)는 _서명되지 않은_ 트랜잭션을 전송하는 데 사용됩니다. 즉, 트랜잭션을 전송받는 노드가 체인에 브로드캐스트하기 전에 트랜잭션에 서명할 수 있도록 여러분의 개인 키를 관리해야 합니다. Alchemy는 사용자의 개인 키를 보관하지 않으므로 이 메서드를 지원하지 않습니다.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction)는 이미 서명된 트랜잭션을 브로드캐스트하는 데 사용됩니다. 즉, 먼저 [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)를 사용한 다음, 그 결과를 `eth_sendRawTransaction`에 전달해야 합니다.

Web3를 사용할 때 `eth_sendRawTransaction`는 [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) 함수를 호출하여 접근합니다.

이 튜토리얼에서는 이 함수를 사용할 것입니다.

### 6\. Web3 라이브러리란 무엇인가요? {#what-is-the-web3-library}

- Web3.js는 이더리움 개발에서 매우 흔하게 사용되는 표준 JSON-RPC 호출을 감싸는 래퍼(wrapper) 라이브러리입니다.
- 다양한 언어를 위한 여러 Web3 라이브러리가 있습니다. 이 튜토리얼에서는 JavaScript로 작성된 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)를 사용할 것입니다. [Ethers.js](https://docs.ethers.org/v5/)와 같은 다른 옵션은 [여기](/developers/docs/apis/javascript/)에서 확인할 수 있습니다.

좋습니다. 이제 몇 가지 궁금증을 해결했으니 튜토리얼로 넘어가 보겠습니다. 언제든지 Alchemy [디스코드](https://discord.gg/gWuC7zB)에서 자유롭게 질문해 주세요!

### 7\. 안전하고 가스가 최적화된 비공개 트랜잭션을 전송하는 방법은 무엇인가요?
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

[Alchemy Sepolia 퍼싯](https://www.sepoliafaucet.com/)의 지침에 따라 ETH를 받으세요. 다른 네트워크가 아닌 (메타마스크의) **Sepolia** 이더리움 주소를 입력해야 합니다. 지침을 따른 후 지갑에 ETH가 들어왔는지 다시 한번 확인하세요.

### 3\. 새 프로젝트 디렉터리를 생성하고 해당 디렉터리로 `cd` 하기 {#create-a-new-project-direction}

명령줄(Mac의 경우 터미널)에서 새 프로젝트 디렉터리를 생성하고 해당 디렉터리로 이동합니다.

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Alchemy Web3(또는 다른 Web3 라이브러리) 설치하기 {#install-alchemy-web3}

프로젝트 디렉터리에서 다음 명령을 실행하여 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)를 설치합니다.

참고로 Ethers.js 라이브러리를 사용하려면 [여기의 지침을 따르세요](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. dotenv 설치하기 {#install-dotenv}

API 키와 개인 키를 안전하게 저장하기 위해 `.env` 파일을 사용할 것입니다.

```
npm install dotenv --save
```

### 6\. `.env` 파일 생성하기 {#create-the-dotenv-file}

프로젝트 디렉터리에 `.env` 파일을 생성하고 다음 내용을 추가합니다("`your-api-url`" 및 "`your-private-key`"를 대체하세요).

- Alchemy API URL을 찾으려면 대시보드에서 방금 생성한 앱의 세부 정보 페이지로 이동하여 오른쪽 상단의 "View Key"를 클릭하고 HTTP URL을 복사합니다.
- 메타마스크를 사용하여 개인 키를 찾는 방법은 이 [가이드](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)를 확인하세요.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> 파일을 커밋하지 마세요! <code>.env</code> 파일을 다른 사람과 공유하거나 노출하면 비밀 정보가 유출될 수 있으므로 절대 공유하지 않도록 주의하세요. 버전 관리를 사용하는 경우 <code>.env</code>를 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 파일에 추가하세요.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js` 파일 생성하기
좋습니다. 이제 `.env` 파일에 민감한 데이터를 안전하게 보호했으니 코딩을 시작해 보겠습니다. 트랜잭션 전송 예제에서는 Sepolia 퍼싯으로 ETH를 다시 전송할 것입니다.

예제 트랜잭션을 구성하고 전송할 `sendTx.js` 파일을 생성하고, 다음 코드 줄을 추가합니다.

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: 이 주소를 본인의 공개 주소로 대체하세요

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // 논스는 0부터 계산을 시작합니다

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // ETH를 반환할 퍼싯 주소
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // 메시지를 전송하거나 스마트 컨트랙트를 실행하기 위한 선택적 데이터 필드
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

**6번째 줄**의 주소를 본인의 공개 주소로 대체해야 합니다.

이제 이 코드를 실행하기 전에 여기에 있는 몇 가지 구성 요소에 대해 이야기해 보겠습니다.

- `nonce` : 논스 사양은 주소에서 전송된 트랜잭션 수를 추적하는 데 사용됩니다. 보안 목적과 리플레이 공격(replay attack)을 방지하기 위해 이것이 필요합니다. 주소에서 전송된 트랜잭션 수를 가져오려면 [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)를 사용합니다.
- `transaction`: 트랜잭션 객체에는 지정해야 할 몇 가지 측면이 있습니다.
  - `to`: ETH를 전송하려는 주소입니다. 이 경우, 처음에 요청했던 [Sepolia 퍼싯](https://sepoliafaucet.com/)으로 ETH를 다시 전송합니다.
  - `value`: 전송하려는 금액으로, 10^18 Wei = 1 ETH인 Wei 단위로 지정됩니다.
  - `gas`: 트랜잭션에 포함할 적절한 가스 양을 결정하는 방법에는 여러 가지가 있습니다. Alchemy는 온체인 활동에 대해 알림을 줄 수 있는 [웹훅](https://www.alchemy.com/docs/reference/webhooks-overview)을 지원합니다. 메인넷 트랜잭션의 경우, 현재 가스 상태를 확인하여 포함할 적절한 가스 양을 결정하는 것이 좋은 관행입니다. 21000은 이더리움에서 작업이 사용할 최소 가스 양이므로, 트랜잭션이 실행되도록 보장하기 위해 여기에 30000을 입력합니다.
  - `nonce`: 위의 논스 정의를 참조하세요. 논스는 0부터 계산을 시작합니다.
  - [선택 사항] data: 전송과 함께 추가 정보를 보내거나 스마트 컨트랙트를 호출하는 데 사용되며, 잔액 전송에는 필요하지 않습니다. 아래의 참고 사항을 확인하세요.
- `signedTx`: 트랜잭션 객체에 서명하기 위해 `PRIVATE_KEY`와 함께 `signTransaction` 메서드를 사용합니다.
- `sendSignedTransaction`: 서명된 트랜잭션이 있으면 `sendSignedTransaction`을 사용하여 후속 블록에 포함되도록 전송할 수 있습니다.

**데이터(data)에 대한 참고 사항**
이더리움에서 전송할 수 있는 트랜잭션에는 두 가지 주요 유형이 있습니다.

- 잔액 전송: 한 주소에서 다른 주소로 ETH를 전송합니다. 데이터 필드는 필요하지 않지만, 트랜잭션과 함께 추가 정보를 전송하려면 이 필드에 해당 정보를 HEX 형식으로 포함할 수 있습니다.
  - 예를 들어, 불변의 타임스탬프를 부여하기 위해 IPFS 문서의 해시를 이더리움 체인에 기록하고 싶다고 가정해 보겠습니다. 그러면 데이터 필드는 data: `web3.utils.toHex(‘IPFS hash‘)`와 같아야 합니다. 이제 누구나 체인을 쿼리하여 해당 문서가 언제 추가되었는지 확인할 수 있습니다.
- 스마트 컨트랙트 트랜잭션: 체인에서 일부 스마트 컨트랙트 코드를 실행합니다. 이 경우 데이터 필드에는 실행하려는 스마트 함수와 매개변수가 포함되어야 합니다.
  - 실용적인 예제는 [Hello World 스마트 컨트랙트 튜토리얼](/developers/tutorials/hello-world-smart-contract/)을 확인하세요.
### 8\. `node sendTx.js`를 사용하여 코드 실행하기 {#run-the-code-using-node-sendtx-js}

터미널이나 명령줄로 돌아가서 다음을 실행합니다.

```
node sendTx.js
```

### 9\. 멤풀에서 트랜잭션 확인하기
Alchemy 대시보드에서 [멤풀 페이지](https://dashboard.alchemy.com/mempool)를 열고 생성한 앱으로 필터링하여 트랜잭션을 찾습니다. 여기서 트랜잭션이 대기(pending) 상태에서 채굴(mined) 상태(성공 시) 또는 삭제(dropped) 상태(실패 시)로 전환되는 것을 지켜볼 수 있습니다. "채굴됨(mined)", "대기 중(pending)", "삭제됨(dropped)" 트랜잭션을 모두 포착할 수 있도록 "All(모두)"로 유지하세요. 주소 `0x31b98d14007bdee637298086988a0bbd31184523`으로 전송된 트랜잭션을 검색하여 트랜잭션을 찾을 수도 있습니다.

트랜잭션을 찾은 후 세부 정보를 보려면 tx 해시를 선택하세요. 그러면 다음과 같은 화면으로 이동합니다.

![멤풀 감시자 스크린샷](./mempool.png)

거기서 빨간색으로 동그라미 친 아이콘을 클릭하여 Etherscan에서 트랜잭션을 볼 수 있습니다!

**야호! 방금 Alchemy를 사용하여 첫 번째 이더리움 트랜잭션을 전송했습니다 🎉**

_이 가이드에 대한 피드백과 제안이 있다면 Alchemy의 [디스코드](https://discord.gg/A39JVCM)에서 Elan에게 메시지를 보내주세요!_

_원래 Alchemy에서 게시했습니다._
