---
title: "웹3 앱을 위한 서버 컴포넌트 및 에이전트"
description: "이 튜토리얼을 읽고 나면 블록체인의 이벤트를 수신하고 그에 따라 자체 트랜잭션으로 응답하는 TypeScript 서버를 작성할 수 있습니다. 이를 통해 중앙화된 애플리케이션(서버가 단일 장애점이기 때문)을 작성하면서도 웹3 엔티티와 상호작용할 수 있습니다. 동일한 기술을 사용하여 사람의 개입 없이 온체인 이벤트에 응답하는 에이전트를 작성할 수도 있습니다."

author: "오리 포메란츠"
lang: ko
tags: ["에이전트", "서버", "오프체인", "디앱"]
skill: beginner
breadcrumb: "서버 컴포넌트"
published: 2024-07-15
---

## 소개 {#introduction}

대부분의 경우 탈중앙화 애플리케이션 (dapp)은 소프트웨어를 배포하기 위해 서버를 사용하지만, 실제 모든 상호작용은 클라이언트(일반적으로 웹 브라우저)와 블록체인 사이에서 발생합니다.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

하지만 애플리케이션이 독립적으로 실행되는 서버 컴포넌트를 가질 때 이점을 얻는 경우도 있습니다. 이러한 서버는 이벤트를 비롯해 API와 같은 다른 소스에서 오는 요청에 트랜잭션을 발행하여 응답할 수 있습니다.

![The interaction with the addition of a server](./fig-2.svg)

이러한 서버가 수행할 수 있는 몇 가지 작업이 있습니다.

- 비밀 상태 보유자. 게임에서는 게임이 알고 있는 모든 정보를 플레이어에게 공개하지 않는 것이 유용할 때가 많습니다. 하지만 _블록체인에는 비밀이 없으며_, 블록체인에 있는 모든 정보는 누구나 쉽게 알아낼 수 있습니다. 따라서 게임 상태의 일부를 비밀로 유지해야 한다면 다른 곳에 저장해야 합니다(그리고 [영지식 증명](/zero-knowledge-proofs)을 사용하여 해당 상태의 효과를 검증할 수도 있습니다).

- 중앙화된 오라클. 위험 부담이 충분히 낮다면, 온라인에서 일부 정보를 읽어 체인에 게시하는 외부 서버를 [오라클](/developers/docs/oracles/)로 사용하기에 충분할 수 있습니다.

- 에이전트. 블록체인에서는 이를 활성화하는 트랜잭션 없이는 아무 일도 일어나지 않습니다. 서버는 기회가 생겼을 때 사용자를 대신하여 [차익 거래](/developers/docs/mev/#mev-examples-dex-arbitrage)와 같은 작업을 수행할 수 있습니다.

## 샘플 프로그램 {#sample-program}

샘플 서버는 [GitHub에서](https://github.com/qbzzt/20240715-server-component) 확인할 수 있습니다. 이 서버는 Hardhat의 Greeter를 수정한 버전인 [이 컨트랙트](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)에서 발생하는 이벤트를 수신합니다. 인사말이 변경되면 원래대로 되돌립니다.

실행 방법:

1. 리포지토리를 클론합니다.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 필요한 패키지를 설치합니다. 아직 설치하지 않았다면 [Node.js를 먼저 설치하세요](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. `.env` 파일을 편집하여 홀스카이 테스트넷에 ETH가 있는 계정의 개인 키를 지정합니다. 홀스카이에 ETH가 없다면 [이 퍼싯을 사용](https://holesky-faucet.pk910.de/)할 수 있습니다.

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. 서버를 시작합니다.

   ```sh copy
   npm start
   ```

5. [블록 탐색기](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)로 이동하여, 개인 키를 가진 주소와 다른 주소를 사용하여 인사말을 수정합니다. 인사말이 자동으로 원래대로 수정되는지 확인합니다.

### 어떻게 작동하나요? {#how-it-works}

서버 컴포넌트를 작성하는 방법을 이해하는 가장 쉬운 방법은 샘플을 한 줄씩 살펴보는 것입니다.

#### `src/app.ts` {#src-app-ts}

프로그램의 대부분은 [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts)에 포함되어 있습니다.

##### 필수 객체 생성하기

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

이것들은 우리에게 필요한 [Viem](https://viem.sh/) 엔티티, 함수 및 [`Address` 타입](https://viem.sh/docs/glossary/types#address)입니다. 이 서버는 JavaScript의 확장으로 [강력한 타입 지정(strongly typed)](https://en.wikipedia.org/wiki/Strong_and_weak_typing)을 지원하는 [TypeScript](https://www.typescriptlang.org/)로 작성되었습니다.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[이 함수](https://viem.sh/docs/accounts/privateKey)를 사용하면 개인 키에 해당하는 주소를 포함한 지갑 정보를 생성할 수 있습니다.

```typescript
import { holesky } from "viem/chains"
```

Viem에서 블록체인을 사용하려면 해당 정의를 가져와야 합니다. 이 경우 [홀스카이](https://github.com/eth-clients/holesky) 테스트 블록체인에 연결하고자 합니다.

```typescript
// .env의 정의를 process.env에 추가하는 방법입니다.
import * as dotenv from "dotenv"
dotenv.config()
```

이것은 `.env` 파일을 환경으로 읽어오는 방법입니다. 개인 키를 위해 필요합니다(나중에 설명).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

컨트랙트를 사용하려면 해당 주소와 [ABI](/glossary/#abi)가 필요합니다. 여기에서 두 가지를 모두 제공합니다.

JavaScript(그리고 TypeScript)에서는 상수에 새 값을 할당할 수 없지만, 그 안에 저장된 객체는 수정할 수 _있습니다_. `as const` 접미사를 사용하여 TypeScript에 목록 자체가 상수이며 변경할 수 없음을 알려줍니다.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Viem [퍼블릭 클라이언트](https://viem.sh/docs/clients/public.html)를 생성합니다. 퍼블릭 클라이언트는 연결된 개인 키가 없으므로 트랜잭션을 보낼 수 없습니다. 대신 [`view` 함수](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)를 호출하거나 계정 잔액을 읽는 등의 작업을 수행할 수 있습니다.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

환경 변수는 [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env)에서 사용할 수 있습니다. 하지만 TypeScript는 강력한 타입 지정을 사용합니다. 환경 변수는 임의의 문자열이거나 비어 있을 수 있으므로 환경 변수의 타입은 `string | undefined`입니다. 그러나 Viem에서 키는 `0x${string}`(`0x` 뒤에 문자열이 옴)로 정의됩니다. 여기서는 TypeScript에 `PRIVATE_KEY` 환경 변수가 해당 타입이 될 것이라고 알려줍니다. 그렇지 않으면 런타임 오류가 발생합니다.

그런 다음 [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) 함수는 이 개인 키를 사용하여 전체 계정 객체를 생성합니다.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

다음으로 계정 객체를 사용하여 [지갑 클라이언트](https://viem.sh/docs/clients/wallet)를 생성합니다. 이 클라이언트는 개인 키와 주소를 가지고 있으므로 트랜잭션을 보내는 데 사용할 수 있습니다.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

이제 모든 전제 조건을 갖추었으므로 마침내 [컨트랙트 인스턴스](https://viem.sh/docs/contract/getContract)를 생성할 수 있습니다. 이 컨트랙트 인스턴스를 사용하여 온체인 컨트랙트와 통신할 것입니다.

##### 블록체인에서 읽기

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

읽기 전용인 컨트랙트 함수([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) 및 [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm))는 `read` 아래에서 사용할 수 있습니다. 이 경우 인사말을 반환하는 [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) 함수에 액세스하는 데 사용합니다.

JavaScript는 단일 스레드이므로 장기 실행 프로세스를 시작할 때 [비동기적으로 수행하도록 지정](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)해야 합니다. 읽기 전용 작업이라 하더라도 블록체인을 호출하려면 컴퓨터와 블록체인 노드 간의 왕복 통신이 필요합니다. 이것이 바로 코드에서 결과를 `await`(대기)해야 한다고 지정하는 이유입니다.

이것이 어떻게 작동하는지 관심이 있다면 [여기에서 읽어볼 수 있지만](https://www.w3schools.com/js/js_promise.asp), 실질적으로 알아야 할 것은 시간이 오래 걸리는 작업을 시작할 때 결과를 `await`해야 하며, 이를 수행하는 모든 함수는 `async`로 선언되어야 한다는 점입니다.

##### 트랜잭션 발행하기

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

이것은 인사말을 변경하는 트랜잭션을 발행하기 위해 호출하는 함수입니다. 이것은 긴 작업이므로 함수는 `async`로 선언됩니다. 내부 구현으로 인해 모든 `async` 함수는 `Promise` 객체를 반환해야 합니다. 이 경우 `Promise<any>`는 `Promise`에 정확히 무엇이 반환될지 지정하지 않음을 의미합니다.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

컨트랙트 인스턴스의 `write` 필드에는 [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)와 같이 블록체인 상태에 쓰는(트랜잭션 전송이 필요한) 모든 함수가 있습니다. 매개변수가 있는 경우 목록으로 제공되며, 함수는 트랜잭션의 해시를 반환합니다.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

트랜잭션의 해시를 (블록 탐색기에서 볼 수 있는 URL의 일부로) 보고하고 반환합니다.

##### 이벤트에 응답하기

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 함수](https://viem.sh/docs/actions/public/watchEvent)를 사용하면 이벤트가 발생할 때 실행할 함수를 지정할 수 있습니다. 한 가지 유형의 이벤트(이 경우 `SetGreeting`)에만 관심이 있다면 이 구문을 사용하여 해당 이벤트 유형으로 제한할 수 있습니다.

```typescript
    onLogs: logs => {
```

로그 항목이 있을 때 `onLogs` 함수가 호출됩니다. 이더리움에서 '로그'와 '이벤트'는 일반적으로 상호 교환적으로 사용됩니다.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

여러 이벤트가 있을 수 있지만, 단순성을 위해 첫 번째 이벤트에만 신경 씁니다. `logs[0].args`는 이벤트의 인수이며, 이 경우 `sender` 및 `greeting`입니다.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

발신자가 이 서버가 _아닌_ 경우, `setGreeting`를 사용하여 인사말을 변경합니다.

#### `package.json` {#package-json}

[이 파일](https://github.com/qbzzt/20240715-server-component/blob/main/package.json)은 [Node.js](https://nodejs.org/en) 구성을 제어합니다. 이 문서에서는 중요한 정의만 설명합니다.

```json
{
  "main": "dist/index.js",
```

이 정의는 실행할 JavaScript 파일을 지정합니다.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

스크립트는 다양한 애플리케이션 작업입니다. 이 경우 서버를 컴파일한 다음 실행하는 `start` 하나만 있습니다. `tsc` 명령은 `typescript` 패키지의 일부이며 TypeScript를 JavaScript로 컴파일합니다. 수동으로 실행하려면 `node_modules/.bin`에 있습니다. 두 번째 명령은 서버를 실행합니다.

```json
  "type": "module",
```

JavaScript 노드 애플리케이션에는 여러 유형이 있습니다. `module` 유형을 사용하면 최상위 코드에 `await`를 가질 수 있으며, 이는 느린(그리고 비동기적인) 작업을 수행할 때 중요합니다.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

이것들은 개발에만 필요한 패키지입니다. 여기서는 `typescript`가 필요하며, Node.js와 함께 사용하고 있으므로 `process`와 같은 노드 변수 및 객체의 타입도 가져옵니다. [`^<version>` 표기법](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004)은 해당 버전 또는 호환성을 깨는 변경 사항이 없는 더 높은 버전을 의미합니다. 버전 번호의 의미에 대한 자세한 내용은 [여기](https://semver.org)를 참조하세요.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

이것들은 `dist/app.js`를 실행할 때 런타임에 필요한 패키지입니다.

## 결론 {#conclusion}

여기서 만든 중앙화된 서버는 사용자를 위한 에이전트 역할을 하는 제 기능을 수행합니다. 탈중앙화 애플리케이션 (dapp)이 계속 작동하기를 원하고 가스를 기꺼이 지불할 의향이 있는 사람이라면 누구나 자신의 주소로 서버의 새 인스턴스를 실행할 수 있습니다.

하지만 이는 중앙화된 서버의 작업을 쉽게 검증할 수 있을 때만 작동합니다. 중앙화된 서버가 비밀 상태 정보를 가지고 있거나 어려운 계산을 실행하는 경우, 애플리케이션을 사용하기 위해 신뢰해야 하는 중앙화된 엔티티가 되며, 이는 블록체인이 피하고자 하는 바로 그 점입니다. 향후 문서에서는 [영지식 증명](/zero-knowledge-proofs)을 사용하여 이 문제를 해결하는 방법을 보여드릴 계획입니다.

[제 다른 작업물은 여기에서 확인하세요](https://cryptodocguy.pro/).