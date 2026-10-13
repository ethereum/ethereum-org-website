---
title: 이더리움에서의 인증
description: 이더리움 애플리케이션에서 사용자 인증이 어떻게 작동하는지 알아보세요. 비밀번호 없이 지갑과 서명만으로 가능합니다.
lang: ko
---

전통적인 웹 개발에 익숙하다면 사용자 이름/비밀번호 로그인, OAuth 흐름, 세션 쿠키에 익숙할 것입니다. 이더리움에서의 인증은 다르게 작동하며, 여러 면에서 훨씬 더 간단합니다.

이더리움에서 사용자는 **지갑으로 메시지에 서명하기**를 통해 자신의 신원을 증명합니다. 저장할 비밀번호도 없고, 유출될 자격 증명 데이터베이스도 없습니다. 오직 암호학만이 존재합니다.

## 웹2와 어떻게 다른가요? {#how-is-it-different}

| 웹2 | 이더리움 |
| --------------------------------- | ------------------------------------------------ |
| 사용자 이름 + 비밀번호 | 지갑 주소 + 서명 |
| 서버가 자격 증명 저장 | 사용자가 개인 키 보유 |
| 쿠키 / JWT로 세션 관리 | 오프체인 지갑 서명으로 세션 시작 |
| "Google로 로그인" | "이더리움으로 로그인" |
| 비밀번호 재설정 흐름 | 시드 구문 복구 |

근본적인 변화: 웹2에서는 중앙화된 서버가 사용자를 인증합니다. 이더리움에서는 특정 주소를 제어한다는 것을 증명함으로써 **스스로를 인증**하며, 누구나 이를 독립적으로 검증할 수 있습니다.

## 전제 조건 {#prerequisites}

다음 내용을 이해하고 있는지 확인하세요.

- [이더리움 계정 및 작동 방식](/developers/docs/accounts/)
- [지갑이란 무엇이며 어떻게 연결하는지](/wallets/)
- [공개 키-개인 키 암호학 기초](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## 지갑 기반 인증 작동 방식 {#how-wallet-auth-works}

핵심 흐름은 간단합니다.

1. **탈중앙화 애플리케이션 (dapp)이 사용자에게 지갑 연결을 요청합니다** (메타마스크, Rainbow, WalletConnect 등을 통해)
2. **지갑이 사용자의 이더리움 주소를 공유합니다** - 이것이 사용자의 공개 식별자입니다
3. **dapp이 고유한 메시지를 생성합니다** (논스 또는 챌린지)
4. **사용자가 개인 키로 메시지에 서명합니다** (지갑 내부에서 발생)
5. **백엔드가 주장된 주소에 대해 서명을 검증합니다**
6. **유효한 경우 사용자가 인증됩니다**

비밀번호는 입력되거나, 저장되거나, 전송되지 않았습니다.

## 이더리움으로 로그인 (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361)은 일반적으로 **SIWE**(Sign-In with Ethereum)라고 불리는 이더리움 로그인을 위한 표준 메시지 형식을 정의합니다. 이는 임시방편적인 메시지 서명하기를 구조화되고 안전한 표준으로 대체합니다.

SIWE 메시지는 다음과 같습니다.

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

SIWE의 주요 특징:

- **도메인 바인딩** - 메시지에 도메인이 포함되어 피싱을 방지합니다
- **체인 ID** - 서명이 유효한 네트워크를 지정합니다
- **논스** - 재전송 공격을 방지합니다
- **만료** - 유효 기간을 제한하는 선택적 타임스탬프입니다
- **리소스** - 범위가 지정된 액세스를 위한 선택적 URI입니다

### SIWE 라이브러리 {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruce의 공식 TypeScript 구현체
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust 구현체
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go 구현체

### 예시: siwe를 사용한 클라이언트 측 로그인 {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. 백엔드에서 논스 가져오기
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE 메시지 생성 및 서명
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. 검증을 위해 백엔드로 전송
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### 예시: 서버 측 검증 (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// 논스를 발급하고 나중에 /verify에서 확인할 수 있도록 세션에 저장합니다
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address는 검증된 이더리움 주소입니다
      // 사용자를 위한 세션 또는 JWT를 생성합니다
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## 지갑 연결 라이브러리 {#wallet-connection-libraries}

인증하기 전에 사용자가 지갑을 연결해야 합니다. 다음 라이브러리들을 사용하면 쉽게 구현할 수 있습니다.

- **[RainbowKit](https://www.rainbowkit.com/)** - 아름다운 UI를 갖춘 바로 사용 가능한 React 컴포넌트
- **[ConnectKit](https://docs.family.co/connectkit)** - 드롭인(Drop-in) 지갑 연결 모달
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - SIWE가 내장된 멀티체인 지갑 연결
- **[Wagmi](https://wagmi.sh)** - `useAccount`, `useConnect`를 제공하는 React 훅(Hooks) 라이브러리

## 수동으로 서명 검증하기 {#verifying-manually}

SIWE를 사용하지 않으려면 서명을 직접 검증할 수 있습니다.

```ts
import { verifyMessage } from 'ethers'

// 사용자가 서명한 메시지
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// 서명에서 서명자의 주소를 복구합니다
const recoveredAddress = verifyMessage(message, signature)

// 주장하는 주소와 비교합니다
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // 인증 성공
}
```

### 중요 보안 참고 사항 {#security-notes}

- **항상 논스를 사용하세요** - 오래된 서명이 재사용되는 재전송 공격을 방지합니다
- **도메인을 포함하세요** - 서명이 다른 사이트에서 유효하게 사용되는 것을 방지합니다
- **만료를 확인하세요** - 서명은 제한된 유효 기간을 가져야 합니다
- **가능한 경우 SIWE(EIP-4361)를 사용하세요** - 위의 모든 사항을 대신 처리해 줍니다
- **개인 키를 절대 노출하지 마세요** - 서명은 지갑 내부에서 이루어지며, 앱은 결과만 확인합니다

## 세션 관리 {#session-management}

인증이 완료된 후에도 웹2와 마찬가지로 세션이 필요합니다. 일반적인 패턴은 다음과 같습니다.

- **JWT 토큰** - 서명을 검증한 후 JWT를 발급하여 API 요청에 사용합니다
- **서버 측 세션** - 검증된 주소를 세션 쿠키에 저장합니다
- **리소스를 포함한 SIWE** - 특정 URI에 연결된 범위가 지정된 액세스 토큰을 정의합니다

웹2와의 주요 차이점: 사용자의 이더리움 주소가 영구적인 신원이라는 점입니다. 사용자는 새 계정을 만들지 않고도 모든 dapp에서 이를 사용할 수 있습니다.

## 탈중앙화 신원증명 (DID) {#decentralized-identity}

이더리움 인증은 **자기 주권 신원(self-sovereign identity)**을 향한 더 광범위한 움직임의 일부입니다. 이 분야의 표준 및 프로젝트는 다음과 같습니다.

- **[이더리움 네임 서비스 (ENS)](https://ens.domains/)** - 주소로 확인되는 사람이 읽을 수 있는 이름 (예: `vitalik.eth`)
- **[이더리움 증명 서비스 (EAS)](https://attest.org/)** - 신원 및 자격 증명에 대한 온체인 증명
- **[W3C 탈중앙화 식별자 (DID)](https://www.w3.org/TR/did-core/)** - 검증 가능한 탈중앙화 신원증명 (DID)을 위한 글로벌 표준
- **[Ceramic 네트워크](https://ceramic.network/)** - DID에 연결된 탈중앙화된 데이터 스트림

## 더 읽어보기 {#further-reading}

- [EIP-4361: 이더리움으로 로그인](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE 문서](https://docs.login.xyz/)
- [Auth0에서의 이더리움으로 로그인](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit 인증 문서](https://docs.reown.com/appkit/authentication)
- [ENS 문서](https://docs.ens.domains/)

## 관련 주제 {#related-topics}

- [이더리움 계정](/developers/docs/accounts/)
- [JavaScript API 라이브러리](/developers/docs/apis/javascript/)
- [백엔드 API 라이브러리](/developers/docs/apis/backend/)
- [지갑](/wallets/)