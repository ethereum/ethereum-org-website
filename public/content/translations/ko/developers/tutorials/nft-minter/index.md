---
title: "NFT 민터 튜토리얼"
description: "이 튜토리얼에서는 NFT 민터를 구축하고 MetaMask 및 웹3 도구를 사용하여 스마트 계약을 React 프런트엔드에 연결하여 풀스택 탈중앙화앱을 만드는 방법을 알아봅니다."
author: "smudgil"
tags:
  [
    "솔리디티",
    "NFT",
    "alchemy",
    "스마트 컨트랙트",
    "프론트엔드",
    "Pinata"
  ]
skill: intermediate
lang: ko
published: 2021-10-06
---

Web2 배경을 가진 개발자에게 가장 큰 과제 중 하나는 스마트 계약을 프런트엔드 프로젝트에 연결하고 상호 작용하는 방법을 알아내는 것입니다.

디지털 자산에 대한 링크, 제목, 설명을 입력할 수 있는 간단한 UI인 NFT 민터를 구축하여 다음 방법을 배우게 됩니다.

- 프런트엔드 프로젝트를 통해 MetaMask에 연결하기
- 프런트엔드에서 스마트 계약 메서드 호출하기
- MetaMask를 사용하여 트랜잭션에 서명하기

이 튜토리얼에서는 프런트엔드 프레임워크로 [React](https://react.dev/)를 사용할 것입니다. 이 튜토리얼은 주로 웹3 개발에 중점을 두므로 React 기본 사항을 분석하는 데 많은 시간을 할애하지는 않을 것입니다. 대신, 프로젝트에 기능을 추가하는 데 중점을 둘 것입니다.

사전 조건으로 컴포넌트, props, useState/useEffect 및 기본 함수 호출이 어떻게 작동하는지 아는 등 React에 대한 초급 수준의 이해가 있어야 합니다. 이전에 이러한 용어를 들어본 적이 없다면, 이 [React 입문 튜토리얼](https://react.dev/learn/tutorial-tic-tac-toe)을 확인해 보세요. 시각적 학습자의 경우, Net Ninja의 우수한 [최신 React 전체 튜토리얼](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) 동영상 시리즈를 적극 권장합니다.

아직 계정이 없다면 이 튜토리얼을 완료하고 블록체인에서 무엇이든 빌드하려면 Alchemy 계정이 반드시 필요합니다. [여기](https://alchemy.com/)에서 무료 계정에 가입하세요.

자, 이제 시작해 봅시다!

## NFT 만들기 101 {#making-nfts-101}

코드를 살펴보기 전에 NFT가 어떻게 만들어지는지 이해하는 것이 중요합니다. 두 단계로 구성됩니다.

### 이더리움 블록체인에 NFT 스마트 계약 게시하기 {#publish-nft}

두 NFT 스마트 계약 표준의 가장 큰 차이점은 ERC-1155는 다중 토큰 표준이며 일괄 처리 기능을 포함하는 반면 ERC-721은 단일 토큰 표준이므로 한 번에 하나의 토큰만 전송할 수 있다는 점입니다.

### 민팅 함수 호출 {#minting-function}

일반적으로 이 민팅 함수는 두 개의 변수를 매개변수로 전달해야 합니다. 첫 번째는 새로 민팅된 NFT를 받을 주소를 지정하는 `recipient`이고, 두 번째는 NFT의 메타데이터를 설명하는 JSON 문서로 확인되는 문자열인 NFT의 `tokenURI`입니다.

NFT의 메타데이터는 이름, 설명, 이미지(또는 다른 디지털 자산) 및 기타 속성과 같은 속성을 갖도록 하여 NFT에 생명을 불어넣는 것입니다. 다음은 NFT의 메타데이터를 포함하는 [tokenURI의 예](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)입니다.

이 튜토리얼에서는 React UI를 사용하여 기존 NFT의 스마트 계약 민팅 함수를 호출하는 2부에 중점을 둘 것입니다.

이 튜토리얼에서 호출할 ERC-721 NFT 스마트 계약에 대한 [링크는 여기](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)에 있습니다. 어떻게 만들었는지 알고 싶다면 다른 튜토리얼인 ["NFT 만드는 방법"](https://www.alchemy.com/docs/how-to-create-an-nft)을 확인하는 것을 적극 권장합니다.

좋습니다. 이제 NFT가 어떻게 작동하는지 이해했으니 스타터 파일을 복제해 봅시다!

## 스타터 파일 복제하기 {#clone-the-starter-files}

먼저, [nft-minter-tutorial GitHub 저장소](https://github.com/alchemyplatform/nft-minter-tutorial)로 이동하여 이 프로젝트의 스타터 파일을 가져옵니다. 이 저장소를 로컬 환경에 복제하세요.

복제된 `nft-minter-tutorial` 저장소를 열면 `minter-starter-files`와 `nft-minter`라는 두 개의 폴더가 있는 것을 확인할 수 있습니다.

- `minter-starter-files`는 이 프로젝트의 스타터 파일(기본적으로 React UI)을 포함합니다. 이 튜토리얼에서는 이더리움 지갑과 NFT 스마트 계약에 연결하여 이 UI에 생명을 불어넣는 방법을 배우면서 **이 디렉터리에서 작업할 것입니다.**
- `nft-minter`는 전체 튜토리얼을 포함하며 **막혔을 때**를 위한 **참조**용입니다.

다음으로, 코드 편집기에서 `minter-starter-files` 사본을 열고 `src` 폴더로 이동합니다.

우리가 작성할 모든 코드는 `src` 폴더 아래에 위치하게 됩니다. `Minter.js` 컴포넌트를 편집하고 추가 자바스크립트 파일을 작성하여 프로젝트에 웹3 기능을 부여할 것입니다.

## 2단계: 스타터 파일 확인하기 {#step-2-check-out-our-starter-files}

코딩을 시작하기 전에 스타터 파일에 이미 제공된 내용을 확인하는 것이 중요합니다.

### React 프로젝트 실행하기 {#get-your-react-project-running}

먼저 브라우저에서 React 프로젝트를 실행해 봅시다. React의 장점은 일단 브라우저에서 프로젝트가 실행되면, 저장하는 모든 변경 사항이 브라우저에 실시간으로 업데이트된다는 것입니다.

프로젝트를 실행하려면 `minter-starter-files` 폴더의 루트 디렉터리로 이동한 다음 터미널에서 `npm install`을 실행하여 프로젝트의 종속성을 설치합니다:

```bash
cd minter-starter-files
npm install
```

설치가 완료되면 터미널에서 `npm start`를 실행합니다:

```bash
npm start
```

이렇게 하면 브라우저에서 http://localhost:3000/이 열리고 프로젝트의 프런트엔드가 표시됩니다. 3개의 필드로 구성되어야 합니다: NFT 자산 링크 입력, NFT 이름 입력, 설명 제공.

만약 "지갑 연결" 또는 "NFT 민팅" 버튼을 클릭해 보면 작동하지 않는 것을 알 수 있습니다. 이는 우리가 아직 그 기능을 프로그래밍해야 하기 때문입니다! :\)

### Minter.js 컴포넌트 {#minter-js}

**참고:** `nft-minter` 폴더가 아닌 `minter-starter-files` 폴더에 있는지 확인하세요!

편집기의 `src` 폴더로 돌아가서 `Minter.js` 파일을 엽시다. 이 파일은 우리가 작업할 기본 React 컴포넌트이므로 파일의 모든 내용을 이해하는 것이 매우 중요합니다.

이 파일의 맨 위에는 특정 이벤트 후에 업데이트할 상태 변수가 있습니다.

```javascript
//상태 변수
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React 상태 변수나 상태 훅에 대해 들어본 적이 없나요? [이](https://legacy.reactjs.org/docs/hooks-state.html) 문서를 확인해 보세요.

각 변수가 나타내는 내용은 다음과 같습니다:

- `walletAddress` - 사용자의 지갑 주소를 저장하는 문자열
- `status` - UI 하단에 표시할 메시지를 포함하는 문자열
- `name` - NFT의 이름을 저장하는 문자열
- `description` - NFT의 설명을 저장하는 문자열
- `url` - NFT의 디지털 자산에 대한 링크인 문자열

상태 변수 다음에는 `useEffect`, `connectWalletPressed`, `onMintPressed`라는 세 개의 미구현 함수가 표시됩니다. 이 모든 함수가 `async`라는 것을 알 수 있는데, 이는 우리가 그 안에서 비동기 API 호출을 할 것이기 때문입니다! 그 이름들은 기능과 동일한 이름입니다.

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 컴포넌트가 렌더링된 후 호출되는 React 훅입니다. 빈 배열 `[]` prop이 전달되므로(3번째 줄 참조), 컴포넌트의 _첫 번째_ 렌더링에서만 호출됩니다. 여기서는 지갑 리스너와 다른 지갑 함수를 호출하여 지갑이 이미 연결되었는지 여부를 UI에 반영하도록 업데이트합니다.
- `connectWalletPressed` - 이 함수는 사용자의 MetaMask 지갑을 탈중앙화앱에 연결하기 위해 호출됩니다.
- `onMintPressed` - 이 함수는 사용자의 NFT를 민팅하기 위해 호출됩니다.

이 파일의 끝부분에는 컴포넌트의 UI가 있습니다. 이 코드를 자세히 살펴보면 해당 텍스트 필드의 입력이 변경될 때 `url`, `name`, `description` 상태 변수를 업데이트하는 것을 알 수 있습니다.

또한 `mintButton` 및 `walletButton` ID가 있는 버튼을 각각 클릭하면 `connectWalletPressed` 및 `onMintPressed`가 호출되는 것을 볼 수 있습니다.

```javascript
//우리 컴포넌트의 UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "연결됨: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>지갑 연결</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT 민터</h1>
    <p>
      자산의 링크, 이름, 설명을 추가한 후 "민팅"을 누르세요.
    </p>
    <form>
      <h2>🖼 자산 링크: </h2>
      <input
        type="text"
        placeholder="예: https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 이름: </h2>
      <input
        type="text"
        placeholder="예: 나의 첫 NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ 설명: </h2>
      <input
        type="text"
        placeholder="예: 크립토키티보다 더 멋져요 ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      NFT 민팅
    </button>
    <p id="status">{status}</p>
</div>
)
```

마지막으로 이 Minter 컴포넌트가 어디에 추가되는지 살펴보겠습니다.

다른 모든 컴포넌트의 컨테이너 역할을 하는 React의 기본 컴포넌트인 `App.js` 파일로 이동하면 7번 줄에 Minter 컴포넌트가 삽입된 것을 볼 수 있습니다.

**이 튜토리얼에서는 `Minter.js 파일`을 편집하고 `src` 폴더에 파일을 추가하기만 합니다.**

이제 무엇을 다루는지 이해했으니 이더리움 지갑을 설정해 봅시다!

## 이더리움 지갑 설정하기 {#set-up-your-ethereum-wallet}

사용자가 스마트 계약과 상호 작용하려면 이더리움 지갑을 탈중앙화앱에 연결해야 합니다.

### MetaMask 다운로드하기 {#download-metamask}

이 튜토리얼에서는 이더리움 계정 주소를 관리하는 데 사용되는 브라우저의 가상 지갑인 MetaMask를 사용합니다. 이더리움의 트랜잭션 작동 방식에 대해 더 자세히 알아보려면 [이 페이지](/developers/docs/transactions/)를 확인하세요.

[여기](https://metamask.io/download)에서 MetaMask 계정을 무료로 다운로드하고 생성할 수 있습니다. 계정을 생성하거나 이미 계정이 있는 경우 오른쪽 상단에서 “Ropsten 테스트 네트워크”로 전환해야 합니다\(실제 돈을 다루지 않도록 하기 위함입니다\).

### 파우셋(Faucet)에서 이더 추가하기 {#add-ether-from-faucet}

NFT를 민팅하거나 이더리움 블록체인에서 트랜잭션에 서명하려면 가짜 Eth가 필요합니다. Eth를 받으려면 [Ropsten 파우셋](https://faucet.ropsten.be/)으로 이동하여 Ropsten 계정 주소를 입력한 다음 “Send Ropsten Eth”를 클릭하세요. 곧 MetaMask 계정에서 Eth를 볼 수 있을 것입니다!

### 잔액 확인하기 {#check-your-balance}

잔액이 있는지 다시 확인하기 위해 [Alchemy의 컴포저 도구](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)를 사용하여 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 요청을 해봅시다. 그러면 지갑에 있는 Eth의 양이 반환됩니다. MetaMask 계정 주소를 입력하고 "Send Request"를 클릭하면 다음과 같은 응답이 표시됩니다.

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**참고:** 이 결과는 eth가 아닌 wei 단위입니다. Wei는 ether의 최소 단위로 사용됩니다. wei에서 eth로의 변환은 1 eth = 10¹⁸ wei입니다. 따라서 0xde0b6b3a7640000을 10진수로 변환하면 1\*10¹⁸이 되고 이는 1eth와 같습니다.

휴! 우리의 가짜 돈이 다 있군요! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask를 UI에 연결하기 {#connect-metamask-to-your-UI}

이제 MetaMask 지갑이 설정되었으니, 탈중앙화앱을 연결해 봅시다!

우리는 [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 패러다임을 따르고자 하므로, 탈중앙화앱의 로직, 데이터, 규칙을 관리하는 함수를 포함하는 별도의 파일을 만들고, 그 함수들을 프런트엔드(Minter.js 컴포넌트)에 전달할 것입니다.

### `connectWallet` 함수 {#connect-wallet-function}

이를 위해 `src` 디렉터리에 `utils`라는 새 폴더를 만들고 그 안에 `interact.js`라는 파일을 추가합니다. 이 파일에는 모든 지갑 및 스마트 계약 상호 작용 함수가 포함됩니다.

`interact.js` 파일에 `connectWallet` 함수를 작성한 다음, `Minter.js` 컴포넌트에서 이 함수를 가져와 호출할 것입니다.

`interact.js` 파일에 다음을 추가하세요.

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 위 텍스트 필드에 메시지를 작성하세요.",
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
              브라우저에 가상 이더리움 지갑인 MetaMask를 설치해야 합니다.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

이 코드가 무엇을 하는지 분석해 봅시다:

먼저, 함수는 브라우저에서 `window.ethereum`이 활성화되어 있는지 확인합니다.

`window.ethereum`은 MetaMask 및 기타 지갑 제공업체에서 주입하는 글로벌 API로, 웹사이트가 사용자의 이더리움 계정을 요청할 수 있도록 합니다. 승인되면 사용자가 연결된 블록체인에서 데이터를 읽고 사용자에게 메시지 및 트랜잭션에 서명하도록 제안할 수 있습니다. 자세한 내용은 [MetaMask 문서](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)를 확인하세요!

`window.ethereum`이 _없으면_ MetaMask가 설치되지 않았다는 의미입니다. 그러면 `address`가 빈 문자열로 반환되고 `status` JSX 객체는 사용자가 MetaMask를 설치해야 한다는 것을 전달하는 JSON 객체가 반환됩니다.

**우리가 작성하는 대부분의 함수는 상태 변수와 UI를 업데이트하는 데 사용할 수 있는 JSON 객체를 반환할 것입니다.**

이제 `window.ethereum`이 _있으면_ 상황이 흥미로워집니다.

try/catch 루프를 사용하여 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)를 호출하여 MetaMask에 연결을 시도합니다. 이 함수를 호출하면 브라우저에서 MetaMask가 열리고 사용자에게 지갑을 탈중앙화앱에 연결하라는 메시지가 표시됩니다.

- 사용자가 연결을 선택하면 `method: "eth_requestAccounts"`는 탈중앙화앱에 연결된 사용자의 모든 계정 주소를 포함하는 배열을 반환합니다. 전체적으로 `connectWallet` 함수는 이 배열의 _첫 번째_ `address`\(9번째 줄 참조\)와 사용자에게 스마트 계약에 메시지를 작성하라는 `status` 메시지를 포함하는 JSON 객체를 반환합니다.
- 사용자가 연결을 거부하면 JSON 객체는 반환된 `address`에 대해 빈 문자열을 포함하고 사용자가 연결을 거부했음을 반영하는 `status` 메시지를 포함합니다.

### Minter.js UI 컴포넌트에 connectWallet 함수 추가하기 {#add-connect-wallet}

이제 `connectWallet` 함수를 작성했으므로 `Minter.js` 컴포넌트에 연결해 봅시다.

먼저 `Minter.js` 파일 상단에 `import { connectWallet } from "./utils/interact.js";`를 추가하여 함수를 `Minter.js` 파일로 가져와야 합니다. `Minter.js`의 처음 11줄은 이제 다음과 같아야 합니다.

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

그런 다음 `connectWalletPressed` 함수 내에서 가져온 `connectWallet` 함수를 다음과 같이 호출합니다.

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

`interact.js` 파일에서 `Minter.js` 컴포넌트의 기능 대부분이 추상화된 것을 눈치채셨나요? 이것은 M-V-C 패러다임을 준수하기 위함입니다!

`connectWalletPressed`에서 가져온 `connectWallet` 함수를 await 호출하고, 그 응답을 사용하여 상태 훅을 통해 `status` 및 `walletAddress` 변수를 업데이트합니다.

이제 `Minter.js`와 `interact.js` 두 파일을 모두 저장하고 지금까지의 UI를 테스트해 봅시다.

localhost:3000에서 브라우저를 열고 페이지 오른쪽 상단의 "지갑 연결" 버튼을 누릅니다.

MetaMask가 설치되어 있다면, 지갑을 탈중앙화앱에 연결하라는 메시지가 표시됩니다. 연결 초대를 수락합니다.

지갑 버튼에 주소가 연결되었음을 나타내는 것을 볼 수 있습니다.

다음으로, 페이지를 새로고침해 보세요... 이상하네요. 지갑이 이미 연결되어 있음에도 불구하고 지갑 버튼은 MetaMask에 연결하라는 메시지를 표시합니다...

하지만 걱정하지 마세요! 주소가 이미 탈중앙화앱에 연결되어 있는지 확인하고 그에 따라 UI를 업데이트하는 `getCurrentWalletConnected`라는 함수를 구현하여 이 문제를 쉽게 해결할 수 있습니다!

### getCurrentWalletConnected 함수 {#get-current-wallet}

`interact.js` 파일에 다음과 같은 `getCurrentWalletConnected` 함수를 추가하세요:

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
          status: "👆🏽 위 텍스트 필드에 메시지를 작성하세요.",
        }
      } else {
        return {
          address: "",
          status: "🦊 오른쪽 상단 버튼을 사용하여 MetaMask에 연결하세요.",
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
              브라우저에 가상 이더리움 지갑인 MetaMask를 설치해야 합니다.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

이 코드는 이전에 작성한 `connectWallet` 함수와 _매우_ 유사합니다.

주요 차이점은 사용자가 지갑을 연결하기 위해 MetaMask를 여는 `eth_requestAccounts` 메서드를 호출하는 대신, 여기서는 현재 탈중앙화앱에 연결된 MetaMask 주소를 포함하는 배열을 반환하는 `eth_accounts` 메서드를 호출한다는 것입니다.

이 함수가 어떻게 작동하는지 보려면, `Minter.js` 컴포넌트의 `useEffect` 함수에서 이 함수를 호출해 봅시다.

`connectWallet`에서 했던 것처럼 `interact.js` 파일에서 이 함수를 `Minter.js` 파일로 다음과 같이 가져와야 합니다.

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //여기서 가져오기
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

`getCurrentWalletConnected` 호출의 응답을 사용하여 `walletAddress`와 `status` 상태 변수를 업데이트하는 것을 확인하세요.

이 코드를 추가한 후 브라우저 창을 새로고침해 보세요. 버튼에는 연결되었다고 표시되고 연결된 지갑 주소의 미리보기가 표시되어야 합니다 - 새로고침 후에도 말이죠!

### addWalletListener 구현하기 {#implement-add-wallet-listener}

탈중앙화앱 지갑 설정의 마지막 단계는 사용자가 연결을 끊거나 계정을 전환할 때와 같이 지갑의 상태가 변경될 때 UI가 업데이트되도록 지갑 리스너를 구현하는 것입니다.

`Minter.js` 파일에 다음과 같은 `addWalletListener` 함수를 추가하세요:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 위 텍스트 필드에 메시지를 작성하세요.")
      } else {
        setWallet("")
        setStatus("🦊 오른쪽 상단 버튼을 사용하여 MetaMask에 연결하세요.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          브라우저에 가상 이더리움 지갑인 MetaMask를 설치해야 합니다.
        </a>
      </p>
    )
  }
}
```

여기서 무슨 일이 일어나는지 간단히 살펴보겠습니다.

- 먼저, 함수는 `window.ethereum`이 활성화되어 있는지(즉, MetaMask가 설치되어 있는지) 확인합니다.
  - 그렇지 않다면, `status` 상태 변수를 사용자가 MetaMask를 설치하도록 유도하는 JSX 문자열로 설정합니다.
  - 활성화된 경우, 3번째 줄에서 `window.ethereum.on("accountsChanged")` 리스너를 설정하여 사용자가 탈중앙화앱에 추가 계정을 연결하거나 계정을 전환하거나 계정 연결을 끊는 등 MetaMask 지갑의 상태 변화를 수신합니다. 연결된 계정이 하나 이상 있는 경우, `walletAddress` 상태 변수는 리스너가 반환한 `accounts` 배열의 첫 번째 계정으로 업데이트됩니다. 그렇지 않으면 `walletAddress`는 빈 문자열로 설정됩니다.

마지막으로 `useEffect` 함수에서 호출해야 합니다.

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

그리고 짜잔! 모든 지갑 기능 프로그래밍을 완료했습니다! 이제 지갑이 설정되었으니, NFT를 어떻게 민팅할지 알아봅시다!

## NFT 메타데이터 101 {#nft-metadata-101}

이 튜토리얼의 0단계에서 방금 이야기한 NFT 메타데이터를 기억하시나요? 이 메타데이터는 디지털 자산, 이름, 설명 및 기타 속성과 같은 속성을 가질 수 있도록 하여 NFT에 생명을 불어넣습니다.

이 메타데이터를 JSON 객체로 구성하여 저장해야 스마트 계약의 `mintNFT` 함수를 호출할 때 `tokenURI` 매개변수로 전달할 수 있습니다.

"자산 링크", "이름", "설명" 필드의 텍스트는 NFT 메타데이터의 다양한 속성을 구성합니다. 이 메타데이터를 JSON 객체로 포맷할 것이지만, 이 JSON 객체를 저장할 수 있는 몇 가지 옵션이 있습니다.

- 이더리움 블록체인에 저장할 수 있지만, 그렇게 하면 비용이 매우 많이 들 것입니다.
- AWS나 Firebase와 같은 중앙화된 서버에 저장할 수도 있습니다. 하지만 그것은 우리의 탈중앙화 정신에 어긋납니다.
- 분산 파일 시스템에서 데이터를 저장하고 공유하기 위한 탈중앙화 프로토콜 및 P2P 네트워크인 IPFS를 사용할 수 있습니다. 이 프로토콜은 탈중앙화되어 있고 무료이므로 최선의 선택입니다!

메타데이터를 IPFS에 저장하기 위해 편리한 IPFS API 및 툴킷인 [Pinata](https://pinata.cloud/)를 사용할 것입니다. 다음 단계에서 정확히 어떻게 하는지 설명하겠습니다!

## Pinata를 사용하여 메타데이터를 IPFS에 고정하기 {#use-pinata-to-pin-your-metadata-to-IPFS}

[Pinata](https://pinata.cloud/) 계정이 없다면 [여기](https://app.pinata.cloud/auth/signup)에서 무료 계정에 가입하고 이메일과 계정 확인 단계를 완료하세요.

### Pinata API 키 만들기 {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) 페이지로 이동한 다음 상단의 "새 키" 버튼을 선택하고 관리자 위젯을 활성화로 설정한 후 키의 이름을 지정합니다.

그러면 API 정보가 포함된 팝업이 표시됩니다. 안전한 곳에 보관해야 합니다.

이제 키가 설정되었으므로 프로젝트에 추가하여 사용할 수 있도록 합시다.

### .env 파일 만들기 {#create-a-env}

Pinata 키와 시크릿을 환경 파일에 안전하게 저장할 수 있습니다. 프로젝트 디렉터리에 [dotenv 패키지](https://www.npmjs.com/package/dotenv)를 설치해 봅시다.

터미널에서 새 탭을 열고(로컬 호스트를 실행하는 탭과 별개로) `minter-starter-files` 폴더에 있는지 확인한 다음 터미널에서 다음 명령을 실행합니다.

```text
npm install dotenv --save
```

다음으로, 명령줄에 다음을 입력하여 `minter-starter-files`의 루트 디렉터리에 `.env` 파일을 만듭니다.

```javascript
vim.env
```

이렇게 하면 vim(텍스트 편집기)에서 `.env` 파일이 열립니다. 저장하려면 키보드에서 "esc" + ":" + "q"를 순서대로 누릅니다.

다음으로, VSCode에서 `.env` 파일로 이동하여 다음과 같이 Pinata API 키와 API 시크릿을 추가합니다.

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

파일을 저장하면 JSON 메타데이터를 IPFS에 업로드하는 함수를 작성할 준비가 된 것입니다!

### pinJSONToIPFS 구현하기 {#pin-json-to-ipfs}

다행히 Pinata에는 [JSON 데이터를 IPFS에 업로드하기 위한 API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)와 약간의 수정을 통해 사용할 수 있는 편리한 axios가 포함된 JavaScript 예제가 있습니다.

`utils` 폴더에 `pinata.js`라는 다른 파일을 만들고 다음과 같이 .env 파일에서 Pinata 시크릿과 키를 가져옵시다.

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

다음으로 아래의 추가 코드를 `pinata.js` 파일에 붙여넣습니다. 걱정 마세요. 모든 것이 무엇을 의미하는지 설명해 드리겠습니다!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //axios POST 요청을 Pinata에 보내기 ⬇️
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

그래서 이 코드는 정확히 무엇을 할까요?

먼저, 브라우저와 node.js를 위한 프라미스 기반 HTTP 클라이언트인 [axios](https://www.npmjs.com/package/axios)를 가져옵니다. 이를 사용하여 Pinata에 요청할 것입니다.

그런 다음, 입력으로 `JSONBody`를, 헤더에 Pinata API 키와 시크릿을 받는 비동기 함수 `pinJSONToIPFS`가 있습니다. 이 모든 것은 `pinJSONToIPFS` API에 POST 요청을 하기 위한 것입니다.

- 이 POST 요청이 성공하면, 함수는 `success` 불리언이 true이고 메타데이터가 고정된 `pinataUrl`을 포함하는 JSON 객체를 반환합니다. 반환된 이 `pinataUrl`을 스마트 계약의 민팅 함수에 대한 `tokenURI` 입력으로 사용할 것입니다.
- 이 게시물 요청이 실패하면, 함수는 `success` 불리언이 false이고 오류를 전달하는 `message` 문자열을 포함하는 JSON 객체를 반환합니다.

`connectWallet` 함수 반환 유형과 마찬가지로, 매개변수를 사용하여 상태 변수와 UI를 업데이트할 수 있도록 JSON 객체를 반환합니다.

## 스마트 계약 로드하기 {#load-your-smart-contract}

이제 `pinJSONToIPFS` 함수를 통해 NFT 메타데이터를 IPFS에 업로드할 방법이 생겼으므로, `mintNFT` 함수를 호출할 수 있도록 스마트 계약의 인스턴스를 로드할 방법이 필요합니다.

앞서 언급했듯이 이 튜토리얼에서는 [기존 NFT 스마트 계약](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)을 사용할 것입니다. 그러나 어떻게 만들었는지 배우거나 직접 만들고 싶다면 다른 튜토리얼인 ["NFT 만드는 방법"](https://www.alchemy.com/docs/how-to-create-an-nft)을 확인하는 것을 적극 권장합니다.

### 계약 ABI {#contract-abi}

파일을 자세히 살펴보셨다면 `src` 디렉터리에 `contract-abi.json` 파일이 있다는 것을 눈치채셨을 것입니다. ABI는 계약이 어떤 함수를 호출할지 지정하고 함수가 예상하는 형식으로 데이터를 반환하도록 보장하는 데 필요합니다.

또한 이더리움 블록체인에 연결하고 스마트 계약을 로드하려면 Alchemy API 키와 Alchemy Web3 API가 필요합니다.

### Alchemy API 키 만들기 {#create-alchemy-api}

아직 Alchemy 계정이 없다면, [여기에서 무료로 가입하세요.](https://alchemy.com/?a=eth-org-nft-minter)

Alchemy 계정을 생성한 후에는 앱을 생성하여 API 키를 생성할 수 있습니다. 이를 통해 Ropsten 테스트 네트워크에 연결할 수 있습니다.

탐색 모음에서 “앱” 위로 마우스를 가져간 다음 “앱 만들기”를 클릭하여 Alchemy 대시보드에서 “앱 만들기” 페이지로 이동합니다.

앱 이름을 “My First NFT!”로 지정하고 간단한 설명을 제공한 다음, 앱 기록에 사용될 환경으로 “스테이징”을 선택하고 네트워크로 “Ropsten”을 선택합니다.

"Create app" 을 클릭하세요. 당신의 앱이 아래 테이블에 나타날겁니다!

좋습니다. 이제 HTTP Alchemy API URL을 만들었으니 클립보드에 복사하세요...

...그리고 `.env` 파일에 추가합시다. 전체적으로 .env 파일은 다음과 같아야 합니다.

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

이제 계약 ABI와 Alchemy API 키가 있으므로 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)을 사용하여 스마트 계약을 로드할 준비가 되었습니다.

### Alchemy Web3 엔드포인트 및 계약 설정하기 {#setup-alchemy-endpoint}

먼저, 아직 설치하지 않았다면, 터미널에서 홈 디렉터리 `nft-minter-tutorial`로 이동하여 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)을 설치해야 합니다:

```text
cd ..
npm install @alch/alchemy-web3
```

다음으로 `interact.js` 파일로 돌아갑시다. 파일 상단에 다음 코드를 추가하여 .env 파일에서 Alchemy 키를 가져오고 Alchemy Web3 엔드포인트를 설정합니다.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)는 [Web3.js](https://docs.web3js.org/)의 래퍼로, 향상된 API 메서드와 기타 중요한 이점을 제공하여 웹3 개발자로서의 삶을 더 쉽게 만듭니다. 최소한의 구성만으로 바로 앱에서 사용할 수 있도록 설계되었습니다!

다음으로, 계약 ABI와 계약 주소를 파일에 추가합시다.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

이 두 가지가 모두 준비되었으니 이제 민팅 함수 코딩을 시작할 준비가 되었습니다!

## mintNFT 함수 구현하기 {#implement-the-mintnft-function}

`interact.js` 파일 내에서 이름 그대로 NFT를 민팅할 `mintNFT` 함수를 정의해 봅시다.

Pinata에 메타데이터를 고정하고, Alchemy Web3으로 스마트 계약을 로드하며, MetaMask로 트랜잭션에 서명하는 등 수많은 비동기 호출을 할 것이므로, 우리 함수도 비동기적일 것입니다.

함수에 대한 세 가지 입력은 디지털 자산의 `url`, `name`, `description`입니다. `connectWallet` 함수 아래에 다음 함수 시그니처를 추가하세요.

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 입력 오류 처리 {#input-error-handling}

당연히 함수 시작 부분에 일종의 입력 오류 처리를 두어 입력 매개변수가 올바르지 않으면 이 함수를 종료하는 것이 합리적입니다. 함수 내에 다음 코드를 추가합시다.

```javascript
export const mintNFT = async (url, name, description) => {
  //오류 처리
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗민팅하기 전에 모든 필드가 완료되었는지 확인하세요.",
    }
  }
}
```

기본적으로 입력 매개변수 중 하나라도 빈 문자열이면 `success` 불리언이 false이고 `status` 문자열이 UI의 모든 필드가 완료되어야 함을 전달하는 JSON 객체를 반환합니다.

### 메타데이터를 IPFS에 업로드하기 {#upload-metadata-to-ipfs}

메타데이터가 올바르게 포맷되었음을 확인한 후, 다음 단계는 이를 JSON 객체로 래핑하고 우리가 작성한 `pinJSONToIPFS`를 통해 IPFS에 업로드하는 것입니다!

이를 위해 먼저 `pinJSONToIPFS` 함수를 `interact.js` 파일로 가져와야 합니다. `interact.js`의 맨 위에 다음을 추가합시다.

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`가 JSON 본문을 받는다는 것을 기억하세요. 따라서 호출하기 전에 `url`, `name`, `description` 매개변수를 JSON 객체로 포맷해야 합니다.

`metadata`라는 JSON 객체를 만들고 이 `metadata` 매개변수로 `pinJSONToIPFS`를 호출하도록 코드를 업데이트합시다.

```javascript
export const mintNFT = async (url, name, description) => {
  //오류 처리
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗민팅하기 전에 모든 필드가 완료되었는지 확인하세요.",
    }
  }

  //메타데이터 만들기
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata 호출 만들기
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 tokenURI를 업로드하는 동안 문제가 발생했습니다.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

`pinJSONToIPFS(metadata)` 호출의 응답을 `pinataResponse` 객체에 저장하는 것을 확인하세요. 그런 다음 이 객체에서 오류를 구문 분석합니다.

오류가 있으면 `success` 불리언이 false이고 `status` 문자열이 호출 실패를 전달하는 JSON 객체를 반환합니다. 그렇지 않으면 `pinataResponse`에서 `pinataURL`을 추출하여 `tokenURI` 변수로 저장합니다.

이제 파일 상단에서 초기화한 Alchemy Web3 API를 사용하여 스마트 계약을 로드할 시간입니다. `mintNFT` 함수 하단에 다음 코드 줄을 추가하여 `window.contract` 전역 변수에 계약을 설정하세요.

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT` 함수에 마지막으로 추가할 것은 이더리움 트랜잭션입니다.

```javascript
//이더리움 트랜잭션 설정
const transactionParameters = {
  to: contractAddress, // 계약 게시 중을 제외하고 필수입니다.
  from: window.ethereum.selectedAddress, // 사용자의 활성 주소와 일치해야 합니다.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT 스마트 계약 호출
}

//MetaMask를 통해 트랜잭션 서명
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Etherscan에서 트랜잭션을 확인하세요: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 문제가 발생했습니다: " + error.message,
  }
}
```

이미 이더리움 트랜잭션에 익숙하다면, 구조가 본 것과 매우 유사하다는 것을 알 수 있습니다.

- 먼저, 트랜잭션 매개변수를 설정합니다.
  - `to`는 수신자 주소(우리의 스마트 계약)를 지정합니다.
  - `from`은 트랜잭션의 서명자(사용자의 MetaMask에 연결된 주소: `window.ethereum.selectedAddress`)를 지정합니다.
  - `data`는 `tokenURI`와 사용자의 지갑 주소(`window.ethereum.selectedAddress`)를 입력으로 받는 스마트 계약의 `mintNFT` 메서드 호출을 포함합니다.
- 그런 다음, MetaMask에 트랜잭션 서명을 요청하는 `window.ethereum.request`를 await 호출합니다. 이 요청에서 우리는 eth 메서드(eth_SentTransaction)를 지정하고 `transactionParameters`를 전달하는 것을 확인하세요. 이 시점에서 MetaMask가 브라우저에서 열리고 사용자에게 트랜잭션에 서명하거나 거부하라는 메시지를 표시합니다.
  - 트랜잭션이 성공하면 함수는 불리언 `success`가 true로 설정되고 `status` 문자열이 사용자에게 트랜잭션에 대한 자세한 정보를 Etherscan에서 확인하도록 유도하는 JSON 객체를 반환합니다.
  - 트랜잭션이 실패하면 함수는 `success` 불리언이 false로 설정되고 `status` 문자열이 오류 메시지를 전달하는 JSON 객체를 반환합니다.

전체적으로 `mintNFT` 함수는 다음과 같아야 합니다.

```javascript
export const mintNFT = async (url, name, description) => {
  //오류 처리
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗민팅하기 전에 모든 필드가 완료되었는지 확인하세요.",
    }
  }

  //메타데이터 만들기
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata 핀 요청
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 tokenURI를 업로드하는 동안 문제가 발생했습니다.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //스마트 계약 로드
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //이더리움 트랜잭션 설정
  const transactionParameters = {
    to: contractAddress, // 계약 게시 중을 제외하고 필수입니다.
    from: window.ethereum.selectedAddress, // 사용자의 활성 주소와 일치해야 합니다.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT 스마트 계약 호출
  }

  //MetaMask를 통해 트랜잭션 서명
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Etherscan에서 트랜잭션을 확인하세요: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 문제가 발생했습니다: " + error.message,
    }
  }
}
```

정말 거대한 함수군요! 이제 `mintNFT` 함수를 `Minter.js` 컴포넌트에 연결하기만 하면 됩니다...

## mintNFT를 Minter.js 프런트엔드에 연결하기 {#connect-our-frontend}

`Minter.js` 파일을 열고 상단의 `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` 줄을 다음과 같이 업데이트하세요.

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

마지막으로 `onMintPressed` 함수를 구현하여 가져온 `mintNFT` 함수를 await 호출하고 트랜잭션 성공 여부를 반영하도록 `status` 상태 변수를 업데이트합니다.

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## NFT를 라이브 웹사이트에 배포하기 {#deploy-your-NFT}

사용자가 상호 작용할 수 있도록 프로젝트를 라이브로 만들 준비가 되셨나요? Minter를 라이브 웹사이트에 배포하는 방법은 [이 튜토리얼](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)을 확인하세요.

마지막 한 단계...

## 블록체인 세계를 강타하세요 {#take-the-blockchain-world-by-storm}

농담입니다. 튜토리얼의 끝까지 오셨습니다!

요약하자면, NFT 민터를 구축함으로써 다음을 성공적으로 배웠습니다.

- 프런트엔드 프로젝트를 통해 MetaMask에 연결하기
- 프런트엔드에서 스마트 계약 메서드 호출하기
- MetaMask를 사용하여 트랜잭션에 서명하기

아마도 탈중앙화앱을 통해 민팅된 NFT를 지갑에 표시하고 싶으실 것입니다. 그러니 [지갑에서 NFT를 보는 방법](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)에 대한 빠른 튜토리얼을 꼭 확인하세요!

그리고 언제나처럼 질문이 있으시면 [Alchemy Discord](https://discord.gg/gWuC7zB)에서 도와드리겠습니다. 이 튜토리얼의 개념을 향후 프로젝트에 어떻게 적용할지 기대됩니다!
