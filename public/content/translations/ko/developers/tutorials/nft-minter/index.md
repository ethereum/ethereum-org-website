---
title: "NFT 발행기 튜토리얼"
description: "이 튜토리얼에서는 NFT 발행기를 구축하고 메타마스크 및 Web3 도구를 사용하여 스마트 컨트랙트를 React 프론트엔드에 연결하여 풀스택 탈중앙화 애플리케이션(dapp)을 만드는 방법을 배웁니다."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "스마트 컨트랙트", "프론트엔드", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "NFT 발행기 dapp"
lang: ko
published: 2021-10-06
---

웹2 배경을 가진 개발자들이 겪는 가장 큰 어려움 중 하나는 스마트 컨트랙트를 프론트엔드 프로젝트에 연결하고 상호작용하는 방법을 알아내는 것입니다.

디지털 자산에 대한 링크, 제목, 설명을 입력할 수 있는 간단한 UI인 NFT 발행기를 구축함으로써 다음을 배우게 됩니다.

- 프론트엔드 프로젝트를 통해 메타마스크에 연결하기
- 프론트엔드에서 스마트 컨트랙트 메서드 호출하기
- 메타마스크를 사용하여 트랜잭션 서명하기

이 튜토리얼에서는 프론트엔드 프레임워크로 [React](https://react.dev/)를 사용할 것입니다. 이 튜토리얼은 주로 Web3 개발에 초점을 맞추고 있으므로 React의 기본 개념을 설명하는 데 많은 시간을 할애하지는 않겠습니다. 대신 프로젝트에 기능을 구현하는 데 집중할 것입니다.

사전 지식으로 React에 대한 초급 수준의 이해가 필요합니다. 컴포넌트, props, useState/useEffect 및 기본 함수 호출이 어떻게 작동하는지 알아야 합니다. 이러한 용어를 처음 들어본다면 이 [React 소개 튜토리얼](https://react.dev/learn/tutorial-tic-tac-toe)을 확인해 보세요. 시각적인 학습을 선호하는 분들께는 Net Ninja의 훌륭한 [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) 비디오 시리즈를 강력히 추천합니다.

아직 계정이 없다면, 이 튜토리얼을 완료하고 블록체인에 무언가를 구축하기 위해 Alchemy 계정이 반드시 필요합니다. [여기](https://alchemy.com/)에서 무료 계정에 가입하세요.

거두절미하고, 바로 시작하겠습니다!

## NFT 만들기 101 {#making-nfts-101}

코드를 살펴보기 전에 NFT를 만드는 과정이 어떻게 작동하는지 이해하는 것이 중요합니다. 이는 두 단계로 이루어집니다.

### 이더리움 블록체인에 NFT 스마트 컨트랙트 게시하기 {#publish-nft}

두 NFT 스마트 컨트랙트 표준의 가장 큰 차이점은 ERC-1155는 다중 토큰 표준이며 일괄 처리 기능을 포함하는 반면, ERC-721은 단일 토큰 표준이므로 한 번에 하나의 토큰 전송만 지원한다는 것입니다.

### 발행 함수 호출하기 {#minting-function}

일반적으로 이 발행 함수는 두 개의 변수를 매개변수로 전달해야 합니다. 첫 번째는 새로 발행된 NFT를 받을 주소를 지정하는 `recipient`이고, 두 번째는 NFT의 메타데이터를 설명하는 JSON 문서로 확인되는 문자열인 NFT의 `tokenURI`입니다.

NFT의 메타데이터는 이름, 설명, 이미지(또는 다른 디지털 자산) 및 기타 속성과 같은 특성을 가질 수 있게 하여 NFT에 생명력을 불어넣는 핵심 요소입니다. 다음은 NFT의 메타데이터를 포함하는 [tokenURI의 예시](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)입니다.

이 튜토리얼에서는 React UI를 사용하여 기존 NFT의 스마트 컨트랙트 발행 함수를 호출하는 두 번째 부분에 집중할 것입니다.

이 튜토리얼에서 호출할 ERC-721 NFT 스마트 컨트랙트의 [링크는 여기](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)에 있습니다. 이를 어떻게 만들었는지 알고 싶다면 다른 튜토리얼인 ["NFT를 만드는 방법"](https://www.alchemy.com/docs/how-to-create-an-nft)을 확인해 보시기를 강력히 추천합니다.

좋습니다. 이제 NFT를 만드는 방법을 이해했으니 시작 파일을 클론해 보겠습니다!

## 시작 파일 클론하기 {#clone-the-starter-files}

먼저 [nft-minter-tutorial GitHub 리포지토리](https://github.com/alchemyplatform/nft-minter-tutorial)로 이동하여 이 프로젝트의 시작 파일을 가져옵니다. 이 리포지토리를 로컬 환경에 클론하세요.

클론한 `nft-minter-tutorial` 리포지토리를 열면 `minter-starter-files`와 `nft-minter`라는 두 개의 폴더가 있는 것을 확인할 수 있습니다.

- `minter-starter-files`에는 이 프로젝트의 시작 파일(기본적으로 React UI)이 포함되어 있습니다. 이 튜토리얼에서는 이 UI를 이더리움 지갑 및 NFT 스마트 컨트랙트에 연결하여 생명력을 불어넣는 방법을 배우게 되므로 **이 디렉토리에서 작업할 것입니다**.
- `nft-minter`에는 완료된 전체 튜토리얼이 포함되어 있으며, <strong>막혔을 때 참고용</strong>으로 제공됩니다.

다음으로 코드 편집기에서 `minter-starter-files` 복사본을 열고 `src` 폴더로 이동합니다.

우리가 작성할 모든 코드는 `src` 폴더 아래에 위치합니다. `Minter.js` 컴포넌트를 편집하고 추가 JavaScript 파일을 작성하여 프로젝트에 Web3 기능을 부여할 것입니다.

## 2단계: 시작 파일 확인하기 {#step-2-check-out-our-starter-files}

코딩을 시작하기 전에 시작 파일에 이미 제공된 내용을 확인하는 것이 중요합니다.

### React 프로젝트 실행하기 {#get-your-react-project-running}

브라우저에서 React 프로젝트를 실행하는 것으로 시작하겠습니다. React의 장점은 프로젝트가 브라우저에서 실행되면 저장하는 모든 변경 사항이 브라우저에 실시간으로 업데이트된다는 것입니다.

프로젝트를 실행하려면 `minter-starter-files` 폴더의 루트 디렉토리로 이동한 다음 터미널에서 `npm install`를 실행하여 프로젝트의 종속성을 설치합니다.

```bash
cd minter-starter-files
npm install
```

설치가 완료되면 터미널에서 `npm start`를 실행합니다.

```bash
npm start
```

이렇게 하면 브라우저에서 http://localhost:3000/ 이 열리고 프로젝트의 프론트엔드를 볼 수 있습니다. 이는 NFT 자산에 대한 링크를 입력하는 곳, NFT의 이름을 입력하는 곳, 설명을 제공하는 곳의 3가지 필드로 구성되어야 합니다.

"Connect Wallet" 또는 "Mint NFT" 버튼을 클릭해 보면 작동하지 않는 것을 알 수 있습니다. 아직 해당 기능을 프로그래밍해야 하기 때문입니다! :\)

### Minter.js 컴포넌트 {#minter-js}

**참고:** `nft-minter` 폴더가 아닌 `minter-starter-files` 폴더에 있는지 확인하세요!

편집기의 `src` 폴더로 돌아가서 `Minter.js` 파일을 엽니다. 이 파일은 우리가 작업할 주요 React 컴포넌트이므로 이 파일의 모든 내용을 이해하는 것이 매우 중요합니다.

이 파일의 맨 위에는 특정 이벤트 후에 업데이트할 상태 변수가 있습니다.

```javascript
//상태 변수
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React 상태 변수나 상태 훅에 대해 들어본 적이 없으신가요? [이](https://legacy.reactjs.org/docs/hooks-state.html) 문서를 확인해 보세요.

각 변수가 나타내는 의미는 다음과 같습니다.

- `walletAddress` - 사용자의 지갑 주소를 저장하는 문자열
- `status` - UI 하단에 표시할 메시지를 포함하는 문자열
- `name` - NFT의 이름을 저장하는 문자열
- `description` - NFT의 설명을 저장하는 문자열
- `url` - NFT의 디지털 자산에 대한 링크인 문자열

상태 변수 다음에는 구현되지 않은 세 가지 함수인 `useEffect`, `connectWalletPressed`, `onMintPressed`가 표시됩니다. 이 함수들은 모두 `async`인데, 그 안에서 비동기 API 호출을 할 것이기 때문입니다! 이들의 이름은 그 기능과 동일합니다.

```javascript
useEffect(async () => {
  //TODO: 구현
}, [])

const connectWalletPressed = async () => {
  //TODO: 구현
}

const onMintPressed = async () => {
  //TODO: 구현
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 컴포넌트가 렌더링된 후 호출되는 React 훅입니다. 빈 배열 `[]` prop이 전달되기 때문에(3번째 줄 참조) 컴포넌트의 _첫 번째_ 렌더링 시에만 호출됩니다. 여기에서 지갑 리스너와 다른 지갑 함수를 호출하여 지갑이 이미 연결되어 있는지 여부를 반영하도록 UI를 업데이트할 것입니다.
- `connectWalletPressed` - 이 함수는 사용자의 메타마스크 지갑을 탈중앙화 애플리케이션(dapp)에 연결하기 위해 호출됩니다.
- `onMintPressed` - 이 함수는 사용자의 NFT를 발행하기 위해 호출됩니다.

이 파일의 끝부분에는 컴포넌트의 UI가 있습니다. 이 코드를 주의 깊게 살펴보면 해당 텍스트 필드의 입력이 변경될 때 `url`, `name`, `description` 상태 변수를 업데이트한다는 것을 알 수 있습니다.

또한 ID가 `mintButton` 및 `walletButton`인 버튼을 각각 클릭할 때 `connectWalletPressed` 및 `onMintPressed`가 호출되는 것을 볼 수 있습니다.

```javascript
//컴포넌트의 UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

마지막으로 이 Minter 컴포넌트가 어디에 추가되는지 살펴보겠습니다.

다른 모든 컴포넌트의 컨테이너 역할을 하는 React의 메인 컴포넌트인 `App.js` 파일로 이동하면 7번째 줄에 Minter 컴포넌트가 주입된 것을 볼 수 있습니다.

**이 튜토리얼에서는 `Minter.js file`만 편집하고 `src` 폴더에 파일을 추가할 것입니다.**

이제 우리가 작업할 내용을 이해했으니 이더리움 지갑을 설정해 보겠습니다!

## 이더리움 지갑 설정하기 {#set-up-your-ethereum-wallet}

사용자가 스마트 컨트랙트와 상호작용하려면 이더리움 지갑을 dapp에 연결해야 합니다.

### 메타마스크 다운로드 {#download-metamask}

이 튜토리얼에서는 이더리움 계정 주소를 관리하는 데 사용되는 브라우저 내 가상 지갑인 메타마스크를 사용합니다. 이더리움의 트랜잭션 작동 방식에 대해 더 자세히 알고 싶다면 [이 페이지](/developers/docs/transactions/)를 확인하세요.

[여기](https://metamask.io/download)에서 메타마스크를 다운로드하고 무료로 계정을 만들 수 있습니다. 계정을 만들 때나 이미 계정이 있는 경우, 오른쪽 상단에서 "Ropsten Test Network"로 전환해야 합니다(실제 돈을 다루지 않기 위함입니다).

### 퍼싯에서 이더 추가하기 {#add-ether-from-faucet}

NFT를 발행하거나(또는 이더리움 블록체인에서 트랜잭션에 서명하려면) 가짜 ETH가 필요합니다. ETH를 얻으려면 [롭스텐 퍼싯](https://faucet.ropsten.be/)으로 이동하여 롭스텐 계정 주소를 입력한 다음 "Send Ropsten Eth"를 클릭하세요. 곧 메타마스크 계정에서 ETH를 확인할 수 있을 것입니다!

### 잔액 확인하기 {#check-your-balance}

잔액이 있는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)를 사용하여 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 요청을 해보겠습니다. 이는 지갑에 있는 ETH의 양을 반환합니다. 메타마스크 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답이 표시되어야 합니다.

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**참고:** 이 결과는 ETH가 아니라 Wei 단위입니다. Wei는 이더의 가장 작은 단위로 사용됩니다. Wei에서 ETH로의 변환은 1 ETH = 10¹⁸ Wei입니다. 따라서 0xde0b6b3a7640000을 십진수로 변환하면 1\*10¹⁸이 되어 1 ETH와 같습니다.

휴! 가짜 돈이 모두 들어왔습니다! <Emoji text=":money_mouth_face:" size={1} />

## UI에 메타마스크 연결하기 {#connect-metamask-to-your-ui}

이제 메타마스크 지갑이 설정되었으니 dapp에 연결해 보겠습니다!

[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 패러다임을 따르기 위해 dapp의 로직, 데이터 및 규칙을 관리하는 함수를 포함하는 별도의 파일을 만든 다음, 해당 함수를 프론트엔드(Minter.js 컴포넌트)에 전달할 것입니다.

### `connectWallet` 함수 {#connect-wallet-function}

이를 위해 `src` 디렉토리에 `utils`라는 새 폴더를 만들고 그 안에 모든 지갑 및 스마트 컨트랙트 상호작용 함수를 포함할 `interact.js`라는 파일을 추가해 보겠습니다.

`interact.js` 파일에 `connectWallet` 함수를 작성한 다음, 이를 `Minter.js` 컴포넌트에서 가져와 호출할 것입니다.

`interact.js` 파일에 다음을 추가합니다.

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

이 코드가 무엇을 하는지 분석해 보겠습니다.

먼저, 우리 함수는 브라우저에서 `window.ethereum`가 활성화되어 있는지 확인합니다.

`window.ethereum`는 메타마스크 및 기타 지갑 제공업체가 주입하는 전역 API로, 웹사이트가 사용자의 이더리움 계정을 요청할 수 있게 해줍니다. 승인되면 사용자가 연결된 블록체인에서 데이터를 읽고 사용자에게 메시지 및 트랜잭션 서명을 제안할 수 있습니다. 자세한 내용은 [메타마스크 문서](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)를 확인하세요!

`window.ethereum`가 _존재하지 않는다면_ 메타마스크가 설치되지 않았음을 의미합니다. 이 경우 반환되는 `address`가 빈 문자열이고 `status` JSX 객체가 사용자가 메타마스크를 설치해야 함을 전달하는 JSON 객체가 반환됩니다.

**우리가 작성하는 대부분의 함수는 상태 변수와 UI를 업데이트하는 데 사용할 수 있는 JSON 객체를 반환할 것입니다.**

이제 `window.ethereum`가 _존재한다면_ 흥미로운 일이 벌어집니다.

try/catch 루프를 사용하여 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)를 호출하여 메타마스크에 연결을 시도합니다. 이 함수를 호출하면 브라우저에서 메타마스크가 열리고 사용자에게 지갑을 dapp에 연결하라는 메시지가 표시됩니다.

- 사용자가 연결을 선택하면 `method: "eth_requestAccounts"`는 dapp에 연결된 사용자의 모든 계정 주소가 포함된 배열을 반환합니다. 결과적으로 `connectWallet` 함수는 이 배열의 _첫 번째_ `address`(9번째 줄 참조)와 사용자에게 스마트 컨트랙트에 메시지를 작성하라는 메시지를 표시하는 `status` 메시지가 포함된 JSON 객체를 반환합니다.
- 사용자가 연결을 거부하면 JSON 객체는 반환된 `address`에 대한 빈 문자열과 사용자가 연결을 거부했음을 반영하는 `status` 메시지를 포함하게 됩니다.

### Minter.js UI 컴포넌트에 connectWallet 함수 추가하기 {#add-connect-wallet}

이제 이 `connectWallet` 함수를 작성했으니 `Minter.js.` 컴포넌트에 연결해 보겠습니다.

먼저 `Minter.js` 파일의 맨 위에 `import { connectWallet } from "./utils/interact.js";`를 추가하여 함수를 `Minter.js` 파일로 가져와야 합니다. 이제 `Minter.js`의 처음 11줄은 다음과 같아야 합니다.

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //상태 변수
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

그런 다음 `connectWalletPressed` 함수 내부에서 가져온 `connectWallet` 함수를 다음과 같이 호출합니다.

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

대부분의 기능이 `interact.js` 파일에서 `Minter.js` 컴포넌트로부터 어떻게 추상화되었는지 확인하셨나요? 이는 M-V-C 패러다임을 준수하기 위함입니다!

`connectWalletPressed`에서는 가져온 `connectWallet` 함수에 대해 단순히 await 호출을 수행하고, 그 응답을 사용하여 상태 훅을 통해 `status` 및 `walletAddress` 변수를 업데이트합니다.

이제 `Minter.js` 및 `interact.js` 두 파일을 모두 저장하고 지금까지의 UI를 테스트해 보겠습니다.

브라우저에서 localhost:3000을 열고 페이지 오른쪽 상단의 "Connect Wallet" 버튼을 누릅니다.

메타마스크가 설치되어 있다면 지갑을 dapp에 연결하라는 메시지가 표시될 것입니다. 연결 초대를 수락하세요.

이제 지갑 버튼에 주소가 연결되었음이 반영되는 것을 볼 수 있습니다.

다음으로 페이지를 새로고침해 보세요... 이상합니다. 지갑이 이미 연결되어 있는데도 지갑 버튼이 메타마스크를 연결하라는 메시지를 표시하고 있습니다...

하지만 걱정하지 마세요! 주소가 이미 dapp에 연결되어 있는지 확인하고 그에 따라 UI를 업데이트하는 `getCurrentWalletConnected`라는 함수를 구현하여 이 문제를 쉽게 해결할 수 있습니다!

### getCurrentWalletConnected 함수 {#get-current-wallet}

`interact.js` 파일에 다음 `getCurrentWalletConnected` 함수를 추가합니다.

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

이 코드는 앞서 작성한 `connectWallet` 함수와 _매우_ 유사합니다.

주요 차이점은 사용자가 지갑을 연결할 수 있도록 메타마스크를 여는 `eth_requestAccounts` 메서드를 호출하는 대신, 여기서는 현재 dapp에 연결된 메타마스크 주소가 포함된 배열을 단순히 반환하는 `eth_accounts` 메서드를 호출한다는 것입니다.

이 함수가 작동하는 것을 보기 위해 `Minter.js` 컴포넌트의 `useEffect` 함수에서 호출해 보겠습니다.

`connectWallet`에서 했던 것처럼 다음과 같이 `interact.js` 파일에서 `Minter.js` 파일로 이 함수를 가져와야 합니다.

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //여기에 import
} from "./utils/interact.js"
```

이제 `useEffect` 함수에서 간단히 호출합니다.

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

`getCurrentWalletConnected` 호출의 응답을 사용하여 `walletAddress` 및 `status` 상태 변수를 업데이트한다는 점에 유의하세요.

이 코드를 추가한 후 브라우저 창을 새로고침해 보세요. 버튼에 연결되었다고 표시되고 연결된 지갑 주소의 미리보기가 표시되어야 합니다. 새로고침한 후에도 말이죠!

### addWalletListener 구현하기 {#implement-add-wallet-listener}

dapp 지갑 설정의 마지막 단계는 사용자가 연결을 끊거나 계정을 전환할 때와 같이 지갑의 상태가 변경될 때 UI가 업데이트되도록 지갑 리스너를 구현하는 것입니다.

`Minter.js` 파일에 다음과 같은 `addWalletListener` 함수를 추가합니다.

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

여기서 무슨 일이 일어나고 있는지 간단히 분석해 보겠습니다.

- 먼저, 우리 함수는 `window.ethereum`가 활성화되어 있는지(즉, 메타마스크가 설치되어 있는지) 확인합니다.
  - 그렇지 않다면 `status` 상태 변수를 사용자에게 메타마스크를 설치하라는 메시지를 표시하는 JSX 문자열로 설정합니다.
  - 활성화되어 있다면 3번째 줄에 메타마스크 지갑의 상태 변경을 수신하는 리스너 `window.ethereum.on("accountsChanged")`를 설정합니다. 여기에는 사용자가 dapp에 추가 계정을 연결하거나, 계정을 전환하거나, 계정 연결을 끊는 경우가 포함됩니다. 연결된 계정이 하나 이상 있는 경우 `walletAddress` 상태 변수는 리스너가 반환한 `accounts` 배열의 첫 번째 계정으로 업데이트됩니다. 그렇지 않으면 `walletAddress`는 빈 문자열로 설정됩니다.

마지막으로 `useEffect` 함수에서 이를 호출해야 합니다.

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

짜잔! 모든 지갑 기능 프로그래밍을 완료했습니다! 이제 지갑이 설정되었으니 NFT를 발행하는 방법을 알아보겠습니다!

## NFT 메타데이터 101 {#nft-metadata-101}

이 튜토리얼의 0단계에서 방금 이야기했던 NFT 메타데이터를 기억하시나요? 이는 디지털 자산, 이름, 설명 및 기타 속성과 같은 특성을 가질 수 있게 하여 NFT에 생명력을 불어넣습니다.

이 메타데이터를 JSON 객체로 구성하고 저장해야 스마트 컨트랙트의 `mintNFT` 함수를 호출할 때 `tokenURI` 매개변수로 전달할 수 있습니다.

"Link to Asset", "Name", "Description" 필드의 텍스트는 NFT 메타데이터의 다양한 속성을 구성합니다. 이 메타데이터를 JSON 객체로 포맷할 것이지만, 이 JSON 객체를 저장할 수 있는 몇 가지 옵션이 있습니다.

- 이더리움 블록체인에 저장할 수 있습니다. 하지만 그렇게 하면 비용이 매우 많이 듭니다.
- AWS나 Firebase와 같은 중앙화된 서버에 저장할 수 있습니다. 하지만 이는 우리의 탈중앙화 이념에 어긋납니다.
- 분산 파일 시스템에서 데이터를 저장하고 공유하기 위한 탈중앙화된 프로토콜이자 피어 투 피어 네트워크인 IPFS를 사용할 수 있습니다. 이 프로토콜은 탈중앙화되어 있고 무료이므로 가장 좋은 옵션입니다!

메타데이터를 IPFS에 저장하기 위해 편리한 IPFS API 및 툴킷인 [Pinata](https://pinata.cloud/)를 사용할 것입니다. 다음 단계에서 이를 수행하는 방법을 정확히 설명하겠습니다!

## Pinata를 사용하여 IPFS에 메타데이터 고정하기 {#use-pinata-to-pin-your-metadata-to-ipfs}

[Pinata](https://pinata.cloud/) 계정이 없다면 [여기](https://app.pinata.cloud/auth/signup)에서 무료 계정에 가입하고 이메일 및 계정 확인 단계를 완료하세요.

### Pinata API 키 생성하기 {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) 페이지로 이동한 다음 상단의 "New Key" 버튼을 선택하고 Admin 위젯을 활성화로 설정한 후 키의 이름을 지정합니다.

그러면 API 정보가 포함된 팝업이 표시됩니다. 이 정보를 안전한 곳에 보관하세요.

이제 키가 설정되었으니 프로젝트에 추가하여 사용할 수 있도록 해보겠습니다.

### .env 파일 생성하기 {#create-a-env}

환경 파일에 Pinata 키와 시크릿을 안전하게 저장할 수 있습니다. 프로젝트 디렉토리에 [dotenv 패키지](https://www.npmjs.com/package/dotenv)를 설치해 보겠습니다.

터미널에서 새 탭을 열고(로컬 호스트를 실행 중인 탭과 별개로) `minter-starter-files` 폴더에 있는지 확인한 다음 터미널에서 다음 명령을 실행합니다.

```text
npm install dotenv --save
```

다음으로 명령줄에 다음을 입력하여 `minter-starter-files`의 루트 디렉토리에 `.env` 파일을 만듭니다.

```javascript
vim.env
```

이렇게 하면 vim(텍스트 편집기)에서 `.env` 파일이 열립니다. 저장하려면 키보드에서 "esc" + ":" + "q"를 순서대로 누르세요.

다음으로 VSCode에서 `.env` 파일로 이동하여 다음과 같이 Pinata API 키와 API 시크릿을 추가합니다.

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

파일을 저장하면 JSON 메타데이터를 IPFS에 업로드하는 함수를 작성할 준비가 된 것입니다!

### pinJSONToIPFS 구현하기 {#pin-json-to-ipfs}

다행히도 Pinata에는 [JSON 데이터를 IPFS에 업로드하기 위한 전용 API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)와 약간의 수정만으로 사용할 수 있는 편리한 axios를 사용한 JavaScript 예제가 있습니다.

`utils` 폴더에 `pinata.js`라는 또 다른 파일을 만들고 다음과 같이 .env 파일에서 Pinata 시크릿과 키를 가져오겠습니다.

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

다음으로 아래의 추가 코드를 `pinata.js` 파일에 붙여넣습니다. 걱정하지 마세요. 모든 것이 무엇을 의미하는지 분석해 드릴 것입니다!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinata에 axios POST 요청 보내기 ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

그렇다면 이 코드는 정확히 무엇을 할까요?

먼저 브라우저 및 Node.js용 프로미스 기반 HTTP 클라이언트인 [axios](https://www.npmjs.com/package/axios)를 가져옵니다. 이를 사용하여 Pinata에 요청을 보낼 것입니다.

그런 다음 `JSONBody`를 입력으로 받고 헤더에 Pinata API 키와 시크릿을 사용하여 `pinJSONToIPFS` API에 POST 요청을 보내는 비동기 함수 `pinJSONToIPFS`가 있습니다.

- 이 POST 요청이 성공하면 우리 함수는 `success` 부울이 true이고 메타데이터가 고정된 `pinataUrl`가 포함된 JSON 객체를 반환합니다. 반환된 이 `pinataUrl`를 스마트 컨트랙트의 발행 함수에 대한 `tokenURI` 입력으로 사용할 것입니다.
- 이 POST 요청이 실패하면 우리 함수는 `success` 부울이 false이고 오류를 전달하는 `message` 문자열이 포함된 JSON 객체를 반환합니다.

`connectWallet` 함수의 반환 유형과 마찬가지로, 매개변수를 사용하여 상태 변수와 UI를 업데이트할 수 있도록 JSON 객체를 반환하고 있습니다.

## 스마트 컨트랙트 로드하기 {#load-your-smart-contract}

이제 `pinJSONToIPFS` 함수를 통해 NFT 메타데이터를 IPFS에 업로드하는 방법을 알았으니, 스마트 컨트랙트의 인스턴스를 로드하여 `mintNFT` 함수를 호출할 방법이 필요합니다.

앞서 언급했듯이 이 튜토리얼에서는 [이 기존 NFT 스마트 컨트랙트](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)를 사용할 것입니다. 하지만 이를 어떻게 만들었는지 알고 싶거나 직접 만들어보고 싶다면 다른 튜토리얼인 ["NFT를 만드는 방법"](https://www.alchemy.com/docs/how-to-create-an-nft)을 확인해 보시기를 강력히 추천합니다.

### 컨트랙트 ABI {#contract-abi}

파일을 자세히 살펴보았다면 `src` 디렉토리에 `contract-abi.json` 파일이 있다는 것을 눈치채셨을 것입니다. ABI는 컨트랙트가 호출할 함수를 지정하고 함수가 예상하는 형식으로 데이터를 반환하도록 보장하는 데 필요합니다.

또한 이더리움 블록체인에 연결하고 스마트 컨트랙트를 로드하려면 Alchemy API 키와 Alchemy Web3 API가 필요합니다.

### Alchemy API 키 생성하기 {#create-alchemy-api}

아직 Alchemy 계정이 없다면 [여기에서 무료로 가입하세요.](https://alchemy.com/?a=eth-org-nft-minter)

Alchemy 계정을 만들었으면 앱을 만들어 API 키를 생성할 수 있습니다. 이를 통해 롭스텐 테스트 네트워크에 요청을 보낼 수 있습니다.

내비게이션 바의 "Apps" 위로 마우스를 가져간 다음 "Create App"을 클릭하여 Alchemy 대시보드의 "Create App" 페이지로 이동합니다.

앱의 이름을 지정하고(우리는 "My First NFT!"를 선택했습니다), 짧은 설명을 제공하고, 앱 북키핑에 사용되는 환경으로 "Staging"을 선택하고, 네트워크로 "Ropsten"을 선택합니다.

"Create app"을 클릭하면 끝입니다! 아래 표에 앱이 나타날 것입니다.

멋집니다. 이제 HTTP Alchemy API URL을 만들었으니 클립보드에 복사하세요...

...그런 다음 `.env` 파일에 추가해 보겠습니다. 전체적으로 .env 파일은 다음과 같아야 합니다.

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

이제 컨트랙트 ABI와 Alchemy API 키가 있으므로 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)를 사용하여 스마트 컨트랙트를 로드할 준비가 되었습니다.

### Alchemy Web3 엔드포인트 및 컨트랙트 설정하기 {#setup-alchemy-endpoint}

먼저, 아직 설치하지 않았다면 터미널에서 홈 디렉토리인 `nft-minter-tutorial`로 이동하여 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)를 설치해야 합니다.

```text
cd ..
npm install @alch/alchemy-web3
```

다음으로 `interact.js` 파일로 돌아가 보겠습니다. 파일의 맨 위에 다음 코드를 추가하여 .env 파일에서 Alchemy 키를 가져오고 Alchemy Web3 엔드포인트를 설정합니다.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)는 [Web3.js](https://docs.web3js.org/)를 감싸는 래퍼(wrapper)로, 향상된 API 메서드와 기타 중요한 이점을 제공하여 Web3 개발자로서의 삶을 더 쉽게 만들어줍니다. 최소한의 구성만 필요하도록 설계되어 앱에서 바로 사용할 수 있습니다!

다음으로 컨트랙트 ABI와 컨트랙트 주소를 파일에 추가해 보겠습니다.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

이 두 가지가 모두 준비되면 발행 함수 코딩을 시작할 준비가 된 것입니다!

## mintNFT 함수 구현하기 {#implement-the-mintnft-function}

`interact.js` 파일 내부에 이름 그대로 NFT를 발행할 `mintNFT` 함수를 정의해 보겠습니다.

수많은 비동기 호출(메타데이터를 IPFS에 고정하기 위한 Pinata, 스마트 컨트랙트를 로드하기 위한 Alchemy Web3, 트랜잭션에 서명하기 위한 메타마스크)을 수행할 것이므로 우리 함수도 비동기식이어야 합니다.

우리 함수에 대한 세 가지 입력은 디지털 자산의 `url`, `name`, `description`가 될 것입니다. `connectWallet` 함수 아래에 다음 함수 서명을 추가합니다.

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 입력 오류 처리 {#input-error-handling}

당연히 함수의 시작 부분에 일종의 입력 오류 처리를 두어 입력 매개변수가 올바르지 않은 경우 이 함수를 종료하는 것이 합리적입니다. 함수 내부에 다음 코드를 추가해 보겠습니다.

```javascript
export const mintNFT = async (url, name, description) => {
  //에러 처리
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

기본적으로 입력 매개변수 중 하나라도 빈 문자열인 경우 `success` 부울이 false이고 `status` 문자열이 UI의 모든 필드를 완료해야 함을 전달하는 JSON 객체를 반환합니다.

### IPFS에 메타데이터 업로드하기 {#upload-metadata-to-ipfs}

메타데이터가 제대로 포맷되었음을 확인한 후 다음 단계는 이를 JSON 객체로 래핑하고 우리가 작성한 `pinJSONToIPFS`를 통해 IPFS에 업로드하는 것입니다!

이를 위해 먼저 `pinJSONToIPFS` 함수를 `interact.js` 파일로 가져와야 합니다. `interact.js`의 맨 위에 다음을 추가해 보겠습니다.

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`가 JSON 본문을 받는다는 것을 기억하세요. 따라서 이를 호출하기 전에 `url`, `name`, `description` 매개변수를 JSON 객체로 포맷해야 합니다.

코드를 업데이트하여 `metadata`라는 JSON 객체를 만든 다음 이 `metadata` 매개변수를 사용하여 `pinJSONToIPFS`를 호출해 보겠습니다.

```javascript
export const mintNFT = async (url, name, description) => {
  //에러 처리
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //메타데이터 생성
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata 호출
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

`pinJSONToIPFS(metadata)` 호출의 응답을 `pinataResponse` 객체에 저장한다는 점에 유의하세요. 그런 다음 이 객체를 파싱하여 오류가 있는지 확인합니다.

오류가 있는 경우 `success` 부울이 false이고 `status` 문자열이 호출에 실패했음을 전달하는 JSON 객체를 반환합니다. 그렇지 않으면 `pinataResponse`에서 `pinataURL`를 추출하여 `tokenURI` 변수로 저장합니다.

이제 파일 맨 위에서 초기화한 Alchemy Web3 API를 사용하여 스마트 컨트랙트를 로드할 차례입니다. `mintNFT` 함수의 맨 아래에 다음 코드 줄을 추가하여 `window.contract` 전역 변수에 컨트랙트를 설정합니다.

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT` 함수에 추가할 마지막 항목은 이더리움 트랜잭션입니다.

```javascript
//이더리움 트랜잭션 설정
const transactionParameters = {
  to: contractAddress, // 컨트랙트 배포 시를 제외하고 필수입니다.
  from: window.ethereum.selectedAddress, // 사용자의 활성 주소와 일치해야 합니다.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT 스마트 컨트랙트 호출
}

//메타마스크를 통해 트랜잭션 서명
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

이더리움 트랜잭션에 이미 익숙하다면 구조가 이전에 본 것과 매우 유사하다는 것을 알 수 있을 것입니다.

- 먼저 트랜잭션 매개변수를 설정합니다.
  - `to`는 수신자 주소(우리의 스마트 컨트랙트)를 지정합니다.
  - `from`는 트랜잭션의 서명자(메타마스크에 연결된 사용자의 주소: `window.ethereum.selectedAddress`)를 지정합니다.
  - `data`에는 `tokenURI`와 사용자의 지갑 주소인 `window.ethereum.selectedAddress`를 입력으로 받는 스마트 컨트랙트 `mintNFT` 메서드에 대한 호출이 포함되어 있습니다.
- 그런 다음 메타마스크에 트랜잭션 서명을 요청하는 await 호출인 `window.ethereum.request,`를 수행합니다. 이 요청에서 eth 메서드(eth_SentTransaction)를 지정하고 `transactionParameters`를 전달한다는 점에 유의하세요. 이 시점에서 브라우저에 메타마스크가 열리고 사용자에게 트랜잭션에 서명하거나 거부하라는 메시지가 표시됩니다.
  - 트랜잭션이 성공하면 함수는 부울 `success`가 true로 설정되고 `status` 문자열이 사용자에게 트랜잭션에 대한 자세한 정보를 위해 Etherscan을 확인하라는 메시지를 표시하는 JSON 객체를 반환합니다.
  - 트랜잭션이 실패하면 함수는 `success` 부울이 false로 설정되고 `status` 문자열이 오류 메시지를 전달하는 JSON 객체를 반환합니다.

전체적으로 `mintNFT` 함수는 다음과 같아야 합니다.

```javascript
export const mintNFT = async (url, name, description) => {
  //에러 처리
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //메타데이터 생성
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata 핀 요청
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //스마트 컨트랙트 불러오기
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //이더리움 트랜잭션 설정
  const transactionParameters = {
    to: contractAddress, // 컨트랙트 배포 시를 제외하고 필수입니다.
    from: window.ethereum.selectedAddress, // 사용자의 활성 주소와 일치해야 합니다.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT 스마트 컨트랙트 호출
  }

  //메타마스크를 통해 트랜잭션 서명
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

정말 거대한 함수네요! 이제 `mintNFT` 함수를 `Minter.js` 컴포넌트에 연결하기만 하면 됩니다...

## Minter.js 프론트엔드에 mintNFT 연결하기 {#connect-our-frontend}

`Minter.js` 파일을 열고 맨 위의 `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` 줄을 다음과 같이 업데이트합니다.

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

마지막으로 `onMintPressed` 함수를 구현하여 가져온 `mintNFT` 함수에 대해 await 호출을 수행하고 트랜잭션의 성공 또는 실패 여부를 반영하도록 `status` 상태 변수를 업데이트합니다.

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 라이브 웹사이트에 NFT 배포하기 {#deploy-your-nft}

사용자가 상호작용할 수 있도록 프로젝트를 라이브로 전환할 준비가 되셨나요? Minter를 라이브 웹사이트에 배포하려면 [이 튜토리얼](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)을 확인하세요.

마지막 단계...

## 블록체인 세계를 휩쓸어 보세요 {#take-the-blockchain-world-by-storm}

농담입니다. 튜토리얼의 끝까지 오셨군요!

요약하자면, NFT 발행기를 구축함으로써 다음 방법을 성공적으로 배웠습니다.

- 프론트엔드 프로젝트를 통해 메타마스크에 연결하기
- 프론트엔드에서 스마트 컨트랙트 메서드 호출하기
- 메타마스크를 사용하여 트랜잭션 서명하기

아마도 dapp을 통해 발행된 NFT를 지갑에서 자랑하고 싶으실 것입니다. 그렇다면 간단한 튜토리얼인 [지갑에서 NFT를 보는 방법](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)을 꼭 확인해 보세요!

그리고 언제나 그렇듯 질문이 있으시면 [Alchemy 디스코드](https://discord.gg/gWuC7zB)에서 도와드리겠습니다. 이 튜토리얼의 개념을 향후 프로젝트에 어떻게 적용할지 무척 기대됩니다!