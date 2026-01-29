---
title: "Web3를 사용하여 트랜잭션 전송하기"
description: "이 문서는 Web3를 사용하여 이더리움 트랜잭션을 전송하는 초보자용 가이드입니다. 이더리움 블록체인으로 트랜잭션을 전송하려면 생성, 서명, 브로드캐스트의 세 가지 주요 단계가 있습니다. 이 세 가지를 모두 살펴보겠습니다."
author: "엘란 할펜"
tags: [ "트랜잭션", "web3.js", "alchemy" ]
skill: beginner
lang: ko
published: 2020-11-04
source: "Alchemy 문서"
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

이 문서는 Web3를 사용하여 이더리움 트랜잭션을 전송하는 초보자용 가이드입니다. 이더리움 블록체인으로 트랜잭션을 전송하려면 생성, 서명, 브로드캐스트의 세 가지 주요 단계가 있습니다. 이 세 가지를 모두 살펴보면서 궁금한 점에 대해 답변해 드리겠습니다! 이 튜토리얼에서는 [Alchemy](https://www.alchemy.com/)를 사용하여 이더리움 체인에 트랜잭션을 전송합니다. [여기에서 무료 Alchemy 계정을 만들 수 있습니다](https://auth.alchemyapi.io/signup).

**참고:** 이 가이드는 앱의 _백엔드_에서 트랜잭션에 서명하기 위한 것입니다. 프런트엔드에서 트랜잭션 서명을 통합하려면 [브라우저 공급자와 Web3 통합](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)을 확인하세요.

## 기본 사항 {#the-basics}

대부분의 블록체인 개발자들이 처음 시작할 때처럼, 여러분도 (매우 간단해야 할) 트랜잭션 전송 방법에 대해 조사를 하다가 서로 다른 내용을 담은 수많은 가이드를 접하고 다소 압도되고 혼란스러웠을 수 있습니다. 만약 그렇다면 걱정하지 마세요. 우리 모두 한때는 그랬으니까요! 따라서 시작하기 전에 몇 가지 사항을 명확히 짚고 넘어가겠습니다.

### 1. Alchemy는 개인 키를 저장하지 않습니다 {#alchemy-does-not-store-your-private-keys}

- 이는 Alchemy가 여러분을 대신하여 트랜잭션에 서명하고 전송할 수 없음을 의미합니다. 이는 보안상의 이유 때문입니다. Alchemy는 절대로 여러분의 개인 키를 공유하도록 요청하지 않으며, 호스팅된 노드(또는 다른 누구에게도)와 개인 키를 공유해서는 안 됩니다.
- Alchemy의 핵심 API를 사용하여 블록체인에서 데이터를 읽을 수는 있지만, 쓰기 위해서는 Alchemy를 통해 트랜잭션을 보내기 전에 다른 것을 사용하여 서명해야 합니다(이는 다른 [노드 서비스](/developers/docs/nodes-and-clients/nodes-as-a-service/)에서도 마찬가지입니다).

### 2. “서명자(signer)”란 무엇인가요? {#what-is-a-signer}

- 서명자는 여러분의 개인 키를 사용하여 트랜잭션에 서명합니다. 이 튜토리얼에서는 [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)를 사용하여 트랜잭션에 서명하지만, 다른 web3 라이브러리를 사용할 수도 있습니다.
- 프런트엔드에서 서명자의 좋은 예는 [MetaMask](https://metamask.io/)이며, 여러분을 대신하여 트랜잭션에 서명하고 전송합니다.

### 3. 트랜잭션에 서명해야 하는 이유는 무엇인가요? {#why-do-i-need-to-sign-my-transactions}

- 이더리움 네트워크에서 트랜잭션을 보내려는 모든 사용자는 트랜잭션의 출처가 주장하는 바와 동일하다는 것을 검증하기 위해 (개인 키를 사용하여) 트랜잭션에 서명해야 합니다.
- 이 개인 키를 보호하는 것은 매우 중요합니다. 개인 키에 대한 액세스 권한이 있으면 이더리움 계정을 완전히 제어할 수 있게 되어, 여러분(또는 액세스 권한이 있는 모든 사람)이 대신해서 트랜잭션을 수행할 수 있기 때문입니다.

### 4. 개인 키는 어떻게 보호하나요? {#how-do-i-protect-my-private-key}

- 개인 키를 보호하고 트랜잭션을 보내는 데 사용하는 방법에는 여러 가지가 있습니다. 이 튜토리얼에서는 `.env` 파일을 사용할 것입니다. 하지만 개인 키를 저장하는 별도의 공급자를 사용하거나, 키스토어(keystore) 파일을 사용하거나, 다른 옵션을 사용할 수도 있습니다.

### 5. `eth_sendTransaction`과 `eth_sendRawTransaction`의 차이점은 무엇인가요? {#difference-between-send-and-send-raw}

`eth_sendTransaction`과 `eth_sendRawTransaction`은 모두 트랜잭션을 이더리움 네트워크에 브로드캐스트하여 향후 블록에 추가되도록 하는 이더리움 API 함수입니다. 이 둘은 트랜잭션 서명을 처리하는 방식에서 차이가 있습니다.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction)은 _서명되지 않은_ 트랜잭션을 보내는 데 사용됩니다. 이는 전송 대상 노드가 개인 키를 관리하여 체인에 브로드캐스트하기 전에 트랜잭션에 서명할 수 있어야 함을 의미합니다. Alchemy는 사용자의 개인 키를 보관하지 않으므로 이 메서드를 지원하지 않습니다.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)은 이미 서명된 트랜잭션을 브로드캐스트하는 데 사용됩니다. 이는 먼저 [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)를 사용한 다음, 그 결과를 `eth_sendRawTransaction`에 전달해야 함을 의미합니다.

web3를 사용할 때 `eth_sendRawTransaction`은 [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) 함수를 호출하여 액세스합니다.

이것이 이 튜토리얼에서 사용할 방법입니다.

### 6. web3 라이브러리란 무엇인가요? {#what-is-the-web3-library}

- Web3.js는 이더리움 개발에 흔히 사용되는 표준 JSON-RPC 호출을 감싸는 래퍼 라이브러리입니다.
- 다양한 언어를 위한 여러 web3 라이브러리가 있습니다. 이 튜토리얼에서는 JavaScript로 작성된 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)를 사용할 것입니다. [ethers.js](https://docs.ethers.org/v5/)와 같은 다른 옵션은 [여기](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)에서 확인할 수 있습니다.

자, 이제 몇 가지 질문들을 해결했으니 튜토리얼로 넘어가겠습니다. 언제든지 Alchemy [디스코드](https://discord.gg/gWuC7zB)에서 질문해주세요!

### 7. 안전하고, 가스가 최적화되었으며, 비공개인 트랜잭션을 보내는 방법은 무엇인가요? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy에는 Transact API 제품군이 있습니다](https://docs.alchemy.com/reference/transact-api-quickstart). 이를 사용하여 강화된 트랜잭션을 보내고, 트랜잭션이 발생하기 전에 시뮬레이션하고, 비공개 트랜잭션을 보내고, 가스가 최적화된 트랜잭션을 보낼 수 있습니다.
- 또한 [Notify API](https://docs.alchemy.com/docs/alchemy-notify)를 사용하여 트랜잭션이 멤풀(mempool)에서 나와 체인에 추가될 때 알림을 받을 수 있습니다.

**참고:** 이 가이드를 따르려면 Alchemy 계정, 이더리움 주소 또는 MetaMask 지갑, Node.js 및 npm이 설치되어 있어야 합니다. 그렇지 않은 경우 다음 단계를 따르세요.

1. [무료 Alchemy 계정 만들기](https://auth.alchemyapi.io/signup)
2. [MetaMask 계정 만들기](https://metamask.io/)(또는 이더리움 주소 받기)
3. [다음 단계에 따라 Node.js와 NPM을 설치하세요](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## 트랜잭션 전송 단계 {#steps-to-sending-your-transaction}

### 1. Sepolia 테스트넷에 Alchemy 앱 만들기 {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemy 대시보드](https://dashboard.alchemyapi.io/)로 이동하여 새 앱을 만들고 네트워크로 Sepolia(또는 다른 테스트넷)를 선택하세요.

### 2. Sepolia 파우셋에서 ETH 요청하기 {#request-eth-from-sepolia-faucet}

[Alchemy Sepolia 파우셋](https://www.sepoliafaucet.com/)의 지침에 따라 ETH를 받으세요. 다른 네트워크가 아닌 **Sepolia** 이더리움 주소(MetaMask에서)를 포함해야 합니다. 지침을 따른 후 지갑에 ETH를 받았는지 다시 확인하세요.

### 3. 새 프로젝트 디렉터리를 만들고 `cd`로 이동하기 {#create-a-new-project-direction}

명령줄(mac의 경우 터미널)에서 새 프로젝트 디렉터리를 만들고 그 안으로 이동합니다.

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Alchemy Web3 (또는 다른 web3 라이브러리) 설치하기 {#install-alchemy-web3}

프로젝트 디렉터리에서 다음 명령을 실행하여 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)를 설치합니다.

참고로, ethers.js 라이브러리를 사용하고 싶다면 [여기 있는 지침을 따르세요](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. dotenv 설치하기 {#install-dotenv}

`.env` 파일을 사용하여 API 키와 개인 키를 안전하게 저장할 것입니다.

```
npm install dotenv --save
```

### 6. `.env` 파일 생성하기 {#create-the-dotenv-file}

프로젝트 디렉터리에 `.env` 파일을 만들고 다음을 추가합니다( “`your-api-url`"과 "`your-private-key`"를 대체).

- Alchemy API URL을 찾으려면 대시보드에서 방금 만든 앱의 세부 정보 페이지로 이동하여 오른쪽 상단의 '키 보기'를 클릭하고 HTTP URL을 가져옵니다.
- MetaMask를 사용하여 개인 키를 찾으려면 이 [가이드](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)를 확인하세요.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>를 커밋하지 마세요! <code>.env</code> 파일을 다른 사람과 공유하거나 노출하지 마세요. 그렇게 하면 민감한 정보가 노출될 수 있습니다. 버전 관리 시스템을 사용하는 경우 <code>.env</code>를 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 파일에 추가하세요.
</AlertDescription>
</AlertContent>
</Alert>

### 7. `sendTx.js` 파일 만들기 {#create-sendtx-js}

좋습니다. 이제 민감한 데이터를 `.env` 파일에 안전하게 보관했으니 코딩을 시작하겠습니다. 트랜잭션 전송 예시에서는 ETH를 Sepolia 파우셋으로 다시 보낼 것입니다.

예제 트랜잭션을 구성하고 전송할 `sendTx.js` 파일을 만들고 다음 코드 줄을 추가하세요.

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: 이 주소를 자신의 공개 주소로 바꾸세요

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce는 0부터 카운트를 시작합니다

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // eth를 반환할 파우셋 주소
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // 메시지를 보내거나 스마트 계약을 실행하기 위한 선택적 데이터 필드
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 트랜잭션의 해시는 다음과 같습니다: ", hash, "\n Alchemy의 멤풀에서 트랜잭션 상태를 확인하세요!");
    } else {
      console.log("❗트랜잭션을 제출하는 동안 문제가 발생했습니다:", error)
    }
   });
}

main();
```

**6번째 줄**의 주소를 자신의 공개 주소로 바꾸세요.

이제 이 코드를 실행하기 전에 여기에 있는 몇 가지 구성 요소에 대해 이야기해 보겠습니다.

- `nonce`: 논스(nonce) 명세는 주소에서 보낸 트랜잭션 수를 추적하는 데 사용됩니다. 이는 보안 목적과 [재전송 공격(replay attack)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)을 방지하기 위해 필요합니다. 주소에서 보낸 트랜잭션 수를 얻으려면 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)를 사용합니다.
- `transaction`: 트랜잭션 객체에는 지정해야 할 몇 가지 측면이 있습니다.
  - `to`: ETH를 보내고자 하는 주소입니다. 이 경우, 처음에 요청했던 [Sepolia 파우셋](https://sepoliafaucet.com/)으로 ETH를 다시 보내고 있습니다.
  - `value`: 보내고자 하는 금액이며, 웨이(Wei) 단위로 지정됩니다(10^18 Wei = 1 ETH).
  - `gas`: 트랜잭션에 포함할 적절한 가스 양을 결정하는 방법에는 여러 가지가 있습니다. Alchemy에는 가스 가격이 특정 임계값 내로 떨어질 때 알려주는 [가스 가격 웹훅](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1)도 있습니다. 메인넷 트랜잭션의 경우, [ETH Gas Station](https://ethgasstation.info/)과 같은 가스 추정기를 확인하여 포함할 적절한 가스 양을 결정하는 것이 좋습니다. 21000은 이더리움에서 작업이 사용할 최소 가스 양이므로, 트랜잭션이 실행되도록 보장하기 위해 여기서는 30000을 넣습니다.
  - `nonce`: 위의 논스(nonce) 정의를 참조하세요. 논스(Nonce)는 0부터 카운트를 시작합니다.
  - [선택 사항] data: 전송 시 추가 정보를 보내거나 스마트 계약을 호출하는 데 사용되며, 잔액 전송에는 필요하지 않습니다. 아래 참고 사항을 확인하세요.
- `signedTx`: 트랜잭션 객체에 서명하기 위해 `PRIVATE_KEY`와 함께 `signTransaction` 메서드를 사용합니다.
- `sendSignedTransaction`: 서명된 트랜잭션이 있으면 `sendSignedTransaction`을 사용하여 후속 블록에 포함되도록 보낼 수 있습니다.

**데이터에 대한 참고 사항**
이더리움에서 보낼 수 있는 트랜잭션에는 두 가지 주요 유형이 있습니다.

- 잔액 전송: 한 주소에서 다른 주소로 ETH를 보냅니다. 데이터 필드는 필요하지 않지만, 트랜잭션과 함께 추가 정보를 보내고 싶다면 이 필드에 해당 정보를 16진수(HEX) 형식으로 포함할 수 있습니다.
  - 예를 들어, 불변의 타임스탬프를 부여하기 위해 IPFS 문서의 해시를 이더리움 체인에 기록하고 싶다고 가정해 보겠습니다. 그러면 데이터 필드는 `data: web3.utils.toHex('IPFS 해시')`와 같이 보일 것입니다. 이제 누구나 체인을 쿼리하여 해당 문서가 언제 추가되었는지 볼 수 있습니다.
- 스마트 계약 트랜잭션: 체인에서 스마트 계약 코드를 실행합니다. 이 경우 데이터 필드에는 실행하려는 스마트 함수와 모든 매개변수가 포함되어야 합니다.
  - 실용적인 예는 이 [Hello World 튜토리얼](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)의 8단계를 확인하세요.

### 8. `node sendTx.js`를 사용하여 코드 실행하기 {#run-the-code-using-node-sendtx-js}

터미널이나 명령줄로 돌아가서 실행합니다.

```
node sendTx.js
```

### 9. 멤풀에서 트랜잭션 확인하기 {#see-your-transaction-in-the-mempool}

Alchemy 대시보드에서 [멤풀 페이지](https://dashboard.alchemyapi.io/mempool)를 열고 생성한 앱으로 필터링하여 트랜잭션을 찾으세요. 여기에서 트랜잭션이 보류(pending) 상태에서 채굴(mined) 상태(성공한 경우) 또는 중단(dropped) 상태(실패한 경우)로 전환되는 것을 볼 수 있습니다. '채굴됨(mined)', '보류 중(pending)', '삭제됨(dropped)' 트랜잭션을 모두 포착하려면 '전체(All)'로 설정해야 합니다. 주소 `0x31b98d14007bdee637298086988a0bbd31184523`으로 전송된 트랜잭션을 찾아 트랜잭션을 검색할 수도 있습니다.

트랜잭션을 찾은 후 세부 정보를 보려면 트랜잭션 해시(tx hash)를 선택하면 다음과 같은 화면으로 이동합니다.

![멤풀 감시자 스크린샷](./mempool.png)

거기에서 빨간색으로 동그라미 친 아이콘을 클릭하여 Etherscan에서 트랜잭션을 볼 수 있습니다!

**야호! 방금 Alchemy를 사용하여 첫 이더리움 트랜잭션을 보냈습니다 🎉**

_이 가이드에 대한 피드백이나 제안이 있으시면 Alchemy의 [디스코드](https://discord.gg/A39JVCM)에서 Elan에게 메시지를 보내주세요!_

_원문 게시처: [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
