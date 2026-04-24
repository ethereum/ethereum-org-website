---
title: "가스비 후원하기: 사용자의 트랜잭션 비용을 대신 지불하는 방법"
description: 개인 키와 주소를 생성하는 것은 쉽습니다. 적절한 소프트웨어를 실행하기만 하면 됩니다. 하지만 전 세계에는 트랜잭션을 전송하기 위해 ETH를 구하는 것이 훨씬 더 어려운 곳이 많습니다. 이 튜토리얼에서는 사용자가 서명한 오프체인 구조화된 데이터를 스마트 컨트랙트에서 실행하기 위한 온체인 가스 비용을 대신 지불하는 방법을 배웁니다. 사용자가 트랜잭션 정보가 포함된 구조체에 서명하게 하고, 오프체인 코드가 이를 블록체인에 트랜잭션으로 제출합니다.
author: 오리 포메란츠
tags: ["가스리스", "Solidity", "eip-712", "메타 트랜잭션"]
skill: intermediate
breadcrumb: 가스 후원
lang: ko
published: 2026-02-27
---

## 소개 {#introduction}

이더리움이 [10억 명 이상의 사람들에게](https://blog.ethereum.org/category/next-billion) 서비스를 제공하려면, 마찰을 줄이고 최대한 사용하기 쉽게 만들어야 합니다. 이러한 마찰의 원인 중 하나는 가스비를 지불하기 위해 ETH가 필요하다는 점입니다.

사용자로부터 수익을 창출하는 탈중앙화 애플리케이션 (dapp)이 있다면, 사용자가 서버를 통해 트랜잭션을 제출하도록 하고 트랜잭션 수수료를 직접 지불하는 것이 합리적일 수 있습니다. 사용자는 여전히 지갑에서 [EIP-712 승인 메시지](https://eips.ethereum.org/EIPS/eip-712)에 서명하므로, 이더리움의 무결성 보장을 유지할 수 있습니다. 가용성은 트랜잭션을 중계하는 서버에 의존하므로 더 제한적입니다. 하지만 사용자가 (ETH를 구한 경우) 스마트 컨트랙트에 직접 접근할 수 있도록 설정할 수 있으며, 트랜잭션을 후원하고자 하는 다른 사람들이 자체 서버를 구축하도록 허용할 수도 있습니다.

이 튜토리얼의 기법은 여러분이 스마트 컨트랙트를 제어할 수 있을 때만 작동합니다. 다른 스마트 컨트랙트로의 트랜잭션을 후원할 수 있게 해주는 [계정 추상화](https://eips.ethereum.org/EIPS/eip-4337)를 포함한 다른 기법들도 있으며, 이는 향후 튜토리얼에서 다루고자 합니다.

참고: 이것은 프로덕션 수준의 코드가 _아닙니다_. 심각한 공격에 취약하며 주요 기능이 부족합니다. 자세한 내용은 [이 가이드의 취약점 섹션](#vulnerabilities)에서 알아보세요.

### 전제 조건 {#prerequisites}

이 튜토리얼을 이해하려면 다음 사항에 이미 익숙해야 합니다.

- Solidity
- JavaScript
- React 및 WAGMI. 이러한 사용자 인터페이스 도구에 익숙하지 않다면, [관련 튜토리얼을 참고하세요](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## 샘플 애플리케이션 {#sample-app}

여기서 다루는 샘플 애플리케이션은 Hardhat의 `Greeter` 컨트랙트의 변형입니다. [GitHub에서](https://github.com/qbzzt/260301-gasless) 확인할 수 있습니다. 스마트 컨트랙트는 이미 [Sepolia](https://sepolia.dev/)의 [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA) 주소에 배포되어 있습니다.

실제 작동 방식을 보려면 다음 단계를 따르세요.

1. 리포지토리를 클론하고 필요한 소프트웨어를 설치합니다.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. `.env` 파일을 편집하여 `PRIVATE_KEY`를 Sepolia에 ETH가 있는 지갑으로 설정합니다. Sepolia ETH가 필요하다면 [퍼싯을 사용하세요](/developers/docs/networks/#sepolia). 이상적으로 이 개인 키는 브라우저 지갑에 있는 것과 달라야 합니다.

3. 서버를 시작합니다.

   ```sh
   npm run dev
   ```

4. [`http://localhost:5173`](http://localhost:5173) URL에서 애플리케이션에 접속합니다.

5. **Connect with Injected**를 클릭하여 지갑에 연결합니다. 지갑에서 승인하고, 필요한 경우 Sepolia로의 변경을 승인합니다.

6. 새로운 인사말을 작성하고 **Update greeting via sponsor**를 클릭합니다.

7. 메시지에 서명합니다.

8. 약 12초(Sepolia의 블록 타임)를 기다립니다. 기다리는 동안 서버 콘솔의 URL을 통해 트랜잭션을 확인할 수 있습니다.

9. 인사말이 변경되었고, 마지막으로 업데이트한 주소 값이 이제 브라우저 지갑의 주소로 변경된 것을 확인합니다.

이것이 어떻게 작동하는지 이해하려면, 사용자 인터페이스에서 메시지가 어떻게 생성되는지, 서버에서 어떻게 중계되는지, 그리고 스마트 컨트랙트가 이를 어떻게 처리하는지 살펴봐야 합니다.

### 사용자 인터페이스 {#ui-changes}

사용자 인터페이스는 [WAGMI](https://wagmi.sh/)를 기반으로 합니다. 이에 대한 자세한 내용은 [이 튜토리얼](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)에서 읽어볼 수 있습니다.

메시지에 서명하는 방법은 다음과 같습니다.

```js
const signGreeting = useCallback(
```

React 훅인 [`useCallback`](https://react.dev/reference/react/useCallback)를 사용하면 컴포넌트가 다시 그려질 때 동일한 함수를 재사용하여 성능을 향상시킬 수 있습니다.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

계정이 없으면 오류를 발생시킵니다. 이 경우 `signGreeting`를 호출하는 프로세스를 시작하는 UI 버튼이 비활성화되므로 이런 일은 절대 발생하지 않아야 합니다. 하지만 미래의 프로그래머가 해당 안전장치를 제거할 수도 있으므로, 여기서도 이 조건을 확인하는 것이 좋습니다.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[도메인 구분자(domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)를 위한 매개변수입니다. 이 값은 상수이므로, 더 최적화된 구현에서는 함수가 호출될 때마다 다시 계산하는 대신 한 번만 계산할 수 있습니다.

- `name`는 서명을 생성하는 dapp의 이름과 같이 사용자가 읽을 수 있는 이름입니다.
- `version`는 버전입니다. 다른 버전과는 호환되지 않습니다.
- `chainId`는 [WAGMI에서 제공하는](https://wagmi.sh/react/api/hooks/useChainId) 우리가 사용 중인 체인입니다.
- `verifyingContract`는 이 서명을 검증할 컨트랙트 주소입니다. 여러 개의 `Greeter` 컨트랙트가 있고 각각 다른 인사말을 갖게 하려는 경우, 동일한 서명이 여러 컨트랙트에 적용되는 것을 원치 않기 때문입니다.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

우리가 서명하는 데이터 유형입니다. 여기서는 단일 매개변수인 `greeting`만 있지만, 실제 시스템에서는 일반적으로 더 많은 매개변수가 있습니다.

```js
        const message = { greeting }
```

우리가 서명하고 전송하려는 실제 메시지입니다. `greeting`는 필드 이름이자 이를 채우는 변수의 이름입니다.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

실제로 서명을 가져옵니다. 사용자가 데이터에 서명하는 데 (컴퓨터의 관점에서) 오랜 시간이 걸리기 때문에 이 함수는 비동기적입니다.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

이 함수는 단일 16진수 값을 반환합니다. 여기서는 이를 여러 필드로 나눕니다.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

이러한 변수 중 하나라도 변경되면 함수의 새 인스턴스를 생성합니다. `account` 및 `chainId` 매개변수는 사용자가 지갑에서 변경할 수 있습니다. `contractAddr`는 체인 ID의 함수입니다. `signTypedDataAsync`는 변경되지 않아야 하지만, [훅](https://wagmi.sh/react/api/hooks/useSignTypedData)에서 가져오기 때문에 확신할 수 없으므로 여기에 추가하는 것이 가장 좋습니다.

이제 새로운 인사말에 서명했으므로, 이를 서버로 전송해야 합니다.

```js
  const sponsoredGreeting = async () => {
    try {
```

이 함수는 서명을 받아 서버로 전송합니다.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

우리가 접속한 서버의 `/server/sponsor` 경로로 전송합니다.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

`POST`를 사용하여 정보를 JSON으로 인코딩하여 전송합니다.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

응답을 출력합니다. 프로덕션 시스템에서는 사용자에게도 응답을 보여줄 것입니다.

### 서버 {#server}

저는 프론트엔드로 [Vite](https://vite.dev/)를 사용하는 것을 좋아합니다. React 라이브러리를 자동으로 제공하고 프론트엔드 코드가 변경될 때 브라우저를 업데이트해 줍니다. 하지만 Vite에는 백엔드 도구가 포함되어 있지 않습니다.

해결책은 [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js)에 있습니다.

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // 나머지는 Vite가 처리하도록 둡니다
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

먼저 우리가 직접 처리할 요청(`/server/sponsor`에 대한 `POST`)에 대한 핸들러를 등록합니다. 그런 다음 Vite 서버를 생성하고 사용하여 다른 모든 URL을 처리합니다.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

이것은 단지 표준 [viem](https://viem.sh/) 블록체인 호출일 뿐입니다.

### 스마트 컨트랙트 {#smart-contract}

마지막으로, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol)는 서명을 검증해야 합니다.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

생성자는 위의 사용자 인터페이스 코드와 유사하게 [도메인 구분자](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)를 생성합니다. 블록체인 실행은 훨씬 더 비용이 많이 들기 때문에 한 번만 계산합니다.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

이것은 서명되는 구조체입니다. 여기에는 단 하나의 필드만 있습니다.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

이것은 [구조체 식별자](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct)입니다. 사용자 인터페이스에서 매번 계산됩니다.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

이 함수는 서명된 요청을 받아 인사말을 업데이트합니다.

```solidity
        // EIP-712 다이제스트 계산
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

[EIP 712](https://eips.ethereum.org/EIPS/eip-712)에 따라 다이제스트를 생성합니다.

```solidity
        // 서명자 복구
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

[`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01)를 사용하여 서명자 주소를 가져옵니다. 잘못된 서명이라도 유효한 주소(단지 무작위 주소일 뿐)를 반환할 수 있다는 점에 유의하세요.

```solidity
        // 서명자가 호출한 것처럼 인사말 적용
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

인사말을 업데이트합니다.

## 취약점 {#vulnerabilities}

이것은 프로덕션 수준의 코드가 _아닙니다_. 심각한 공격에 취약하며 주요 기능이 부족합니다. 다음은 몇 가지 취약점과 그 해결 방법입니다.

이러한 공격 중 일부를 확인하려면 _Attacks_ 제목 아래의 버튼을 클릭하여 어떤 일이 일어나는지 살펴보세요. **Invalid signature** 버튼의 경우, 서버 콘솔을 확인하여 트랜잭션 응답을 볼 수 있습니다.

### 서버에 대한 서비스 거부(DoS) 공격 {#dos-on-server}

가장 쉬운 공격은 서버에 대한 [서비스 거부(DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack) 공격입니다. 서버는 인터넷 어디에서나 요청을 받고 그 요청을 기반으로 트랜잭션을 전송합니다. 공격자가 유효하든 유효하지 않든 수많은 서명을 발행하는 것을 막을 방법은 전혀 없습니다. 각각의 서명은 트랜잭션을 유발할 것입니다. 결국 서버는 가스비를 지불할 ETH가 고갈될 것입니다.

이 문제에 대한 한 가지 해결책은 블록당 하나의 트랜잭션으로 속도를 제한하는 것입니다. 목적이 [외부 소유 계정(EOA)](/developers/docs/accounts/#key-differences)에 인사말을 보여주는 것이라면, 어차피 블록 중간에 인사말이 무엇인지는 중요하지 않습니다.

또 다른 해결책은 주소를 추적하고 유효한 고객의 서명만 허용하는 것입니다.

### 잘못된 인사말 서명 {#wrong-greeting-sigs}

**Signature for wrong greeting**을 클릭하면, 특정 주소(`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`)와 인사말(`Hello`)에 대한 유효한 서명을 제출합니다. 하지만 다른 인사말과 함께 제출됩니다. 이는 `ecrecover`를 혼란스럽게 만들어, 인사말은 변경되지만 잘못된 주소를 갖게 됩니다.

이 문제를 해결하려면 [서명된 구조체](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124)에 주소를 추가하세요. 이렇게 하면 `ecrecover`의 무작위 주소가 서명의 주소와 일치하지 않게 되어, 스마트 컨트랙트가 메시지를 거부할 것입니다.

### 리플레이 공격 {#replay-attack}

**Replay attack**을 클릭하면, 동일한 "나는 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e이고, 인사말이 `Hello`가 되기를 원한다"는 서명을 제출하지만, 올바른 인사말과 함께 제출합니다. 결과적으로 스마트 컨트랙트는 (여러분의 것이 아닌) 해당 주소가 인사말을 다시 `Hello`로 변경했다고 믿게 됩니다. 이를 수행하기 위한 정보는 [트랜잭션 정보](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1)에 공개적으로 제공됩니다.

이것이 문제라면, 한 가지 해결책은 [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce)를 추가하는 것입니다. 주소와 숫자 간의 [매핑](https://docs.soliditylang.org/en/latest/types.html#mapping-types)을 만들고, 서명에 논스 필드를 추가합니다. 논스 필드가 해당 주소의 매핑과 일치하면 서명을 수락하고 다음 번을 위해 매핑 값을 증가시킵니다. 일치하지 않으면 트랜잭션을 거부합니다.

또 다른 해결책은 서명된 데이터에 타임스탬프를 추가하고, 해당 타임스탬프 이후 몇 초 동안만 서명을 유효한 것으로 수락하는 것입니다. 이는 더 간단하고 저렴하지만, 시간 창(time window) 내에서 리플레이 공격이 발생할 위험이 있으며, 시간 창을 초과할 경우 합법적인 트랜잭션이 실패할 수 있습니다.

## 기타 누락된 기능 {#other-missing-features}

프로덕션 환경에서 추가해야 할 기능들이 더 있습니다.

### 다른 서버에서의 접근 {#other-servers}

현재 우리는 모든 주소가 `sponsorSetGreeting`를 제출할 수 있도록 허용하고 있습니다. 탈중앙화의 관점에서는 이것이 정확히 우리가 원하는 것일 수 있습니다. 또는 후원되는 트랜잭션이 반드시 _우리의_ 서버를 거치도록 보장하고 싶을 수도 있으며, 이 경우 스마트 컨트랙트에서 `msg.sender`를 확인해야 합니다.

어느 쪽이든, 이는 단순히 문제에 대해 생각하지 않은 결과가 아니라 의식적인 설계 결정이어야 합니다.

### 오류 처리 {#error-handling}

사용자가 인사말을 제출합니다. 다음 블록에서 업데이트될 수도 있고, 그렇지 않을 수도 있습니다. 오류는 보이지 않습니다. 프로덕션 시스템에서는 사용자가 다음 경우를 구별할 수 있어야 합니다.

- 새로운 인사말이 아직 제출되지 않음
- 새로운 인사말이 제출되었으며, 처리 중임
- 새로운 인사말이 거부됨

## 결론 {#conclusion}

이 시점에서 여러분은 약간의 중앙화를 감수하더라도 dapp 사용자에게 가스리스(gasless) 경험을 제공할 수 있을 것입니다.

하지만 이는 ERC-712를 지원하는 스마트 컨트랙트에서만 작동합니다. 예를 들어 ERC-20 토큰을 전송하려면, 단순한 메시지가 아니라 소유자가 트랜잭션에 서명해야 합니다. 이에 대한 해결책은 [계정 추상화(ERC-4337)](https://docs.erc4337.io/index.html)입니다. 향후 이에 대한 튜토리얼을 작성할 수 있기를 바랍니다.

[제 작업물은 여기에서 더 확인하실 수 있습니다](https://cryptodocguy.pro/).