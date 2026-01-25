---
title: 개인 정보를 보호하는 앱별 플라즈마 작성하기
description: 이 튜토리얼에서는 예금을 위한 반비밀 은행을 구축합니다. 은행은 중앙화된 구성 요소이며, 각 사용자의 잔액을 알고 있습니다. 하지만 이 정보는 온체인에 저장되지 않습니다. 대신 은행은 상태의 해시를 게시합니다. 트랜잭션이 발생할 때마다 은행은 새로운 해시를 게시하며, 해시 상태를 새로운 상태로 변경하는 서명된 트랜잭션이 있음을 증명하는 영지식 증명도 함께 게시합니다. 이 튜토리얼을 읽고 나면 영지식 증명을 사용하는 방법뿐만 아니라 영지식 증명을 사용하는 이유와 안전하게 사용하는 방법까지 이해하게 될 것입니다.
author: Ori Pomerantz
tags: [ "영지식", "서버", "오프체인", "개인정보 보호" ]
skill: advanced
lang: ko
published: 2025-10-15
---

## 소개 {#introduction}

[롤업](/developers/docs/scaling/zk-rollups/)과 달리 [플라즈마](/developers/docs/scaling/plasma)는 무결성을 위해 이더리움 메인넷을 사용하지만 가용성을 위해서는 사용하지 않습니다. 이 글에서는 이더리움이 무결성(무단 변경 없음)을 보장하지만 가용성(중앙화된 구성 요소가 다운되어 전체 시스템을 비활성화할 수 있음)은 보장하지 않는 플라즈마처럼 작동하는 애플리케이션을 작성합니다.

여기서 작성하는 애플리케이션은 개인 정보를 보호하는 은행입니다. 다른 주소에는 잔액이 있는 계정이 있으며, 다른 계정으로 돈(ETH)을 보낼 수 있습니다. 은행은 상태(계정 및 잔액) 및 트랜잭션의 해시를 게시하지만 실제 잔액은 비공개로 유지될 수 있는 오프체인에 보관합니다.

## 설계 {#design}

이는 프로덕션용 시스템이 아니라 교육용 도구입니다. 따라서 몇 가지 단순화된 가정을 바탕으로 작성되었습니다.

- 고정된 계정 풀. 특정 수의 계정이 있으며, 각 계정은 미리 정해진 주소에 속합니다. 영지식 증명에서는 가변 크기 데이터 구조를 처리하기 어렵기 때문에 시스템이 훨씬 더 간단해집니다. 프로덕션용 시스템의 경우, [머클 루트](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)를 상태 해시로 사용하고 필요한 잔액에 대한 머클 증명을 제공할 수 있습니다.

- 메모리 저장 공간. 프로덕션 시스템에서는 재시작 시 모든 계정 잔액을 보존하기 위해 디스크에 기록해야 합니다. 여기서는 정보가 단순히 손실되어도 괜찮습니다.

- 전송만 가능. 프로덕션 시스템에서는 은행에 자산을 입금하고 출금하는 방법이 필요합니다. 하지만 여기서는 개념을 설명하기 위한 것이므로 이 은행은 전송으로 제한됩니다.

### 영지식 증명 {#zero-knowledge-proofs}

근본적인 수준에서 영지식 증명은 일부 공개 데이터인 _Data<sub>public</sub>_과 _Data<sub>private</sub>_ 사이에 관계 _Relationship_이 존재하도록 증명자가 일부 데이터인 _Data<sub>private</sub>_를 알고 있음을 보여줍니다. 검증자는 _Relationship_과 _Data<sub>public</sub>_을 알고 있습니다.

개인정보를 보호하려면 상태와 트랜잭션을 비공개로 유지해야 합니다. 하지만 무결성을 보장하려면 상태의 [암호화 해시](https://en.wikipedia.org/wiki/Cryptographic_hash_function)를 공개해야 합니다. 트랜잭션을 제출하는 사람들에게 해당 트랜잭션이 실제로 발생했음을 증명하기 위해 트랜잭션 해시도 게시해야 합니다.

대부분의 경우 _Data<sub>private</sub>_은 영지식 증명 프로그램의 입력이고 _Data<sub>public</sub>_은 출력입니다.

다음은 _Data<sub>private</sub>_의 필드입니다.

- _State<sub>n</sub>_, 이전 상태
- _State<sub>n+1</sub>_, 새로운 상태
- _Transaction_, 이전 상태에서 새로운 상태로 변경하는 트랜잭션. 이 트랜잭션에는 다음 필드가 포함되어야 합니다.
  - _수신 주소_, 전송을 받는 주소
  - 전송되는 _금액_
  - 각 트랜잭션이 한 번만 처리되도록 보장하는 _Nonce_.
    발신 주소는 서명에서 복구할 수 있으므로 트랜잭션에 포함될 필요가 없습니다.
- _서명_, 트랜잭션 수행을 승인하는 서명. 이 경우 트랜잭션을 수행할 수 있는 유일한 권한이 있는 주소는 발신 주소입니다. 우리의 영지식 시스템이 작동하는 방식 때문에 이더리움 서명 외에도 계정의 공개 키가 필요합니다.

다음은 _Data<sub>public</sub>_의 필드입니다.

- _Hash(State<sub>n</sub>)_ 이전 상태의 해시
- _Hash(State<sub>n+1</sub>)_ 새로운 상태의 해시
- _Hash(Transaction)_, 상태를 _State<sub>n</sub>_에서 _State<sub>n+1</sub>_로 변경하는 트랜잭션의 해시.

관계는 여러 조건을 확인합니다.

- 공개 해시는 실제로 비공개 필드에 대한 올바른 해시입니다.
- 이전 상태에 적용된 트랜잭션은 새로운 상태를 생성합니다.
- 서명은 트랜잭션의 발신 주소에서 비롯됩니다.

암호화 해시 함수의 속성으로 인해 이러한 조건을 증명하는 것만으로도 무결성을 보장할 수 있습니다.

### 데이터 구조 {#data-structures}

기본 데이터 구조는 서버가 보유한 상태입니다. 모든 계정에 대해 서버는 계정 잔액과 [재전송 공격](https://en.wikipedia.org/wiki/Replay_attack)을 방지하는 데 사용되는 [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce)를 추적합니다.

### 구성 요소 {#components}

이 시스템에는 두 가지 구성 요소가 필요합니다.

- 트랜잭션을 수신하고 처리하며, 영지식 증명과 함께 해시를 체인에 게시하는 _서버_.
- 해시를 저장하고 영지식 증명을 검증하여 상태 전환이 합법적인지 확인하는 _스마트 계약_.

### 데이터 및 제어 흐름 {#flows}

다음은 다양한 구성 요소가 한 계정에서 다른 계정으로 전송하기 위해 통신하는 방법입니다.

1. 웹 브라우저는 서명자의 계정에서 다른 계정으로 전송을 요청하는 서명된 트랜잭션을 제출합니다.

2. 서버는 트랜잭션이 유효한지 확인합니다.

   - 서명자는 은행에 충분한 잔액이 있는 계정을 가지고 있습니다.
   - 수신자는 은행에 계정을 가지고 있습니다.

3. 서버는 서명자의 잔액에서 전송된 금액을 빼고 수신자의 잔액에 더하여 새로운 상태를 계산합니다.

4. 서버는 상태 변경이 유효하다는 영지식 증명을 계산합니다.

5. 서버는 다음을 포함하는 트랜잭션을 이더리움에 제출합니다.

   - 새로운 상태 해시
   - 트랜잭션 해시(트랜잭션 발신자가 처리되었는지 알 수 있도록)
   - 새로운 상태로의 전환이 유효함을 증명하는 영지식 증명

6. 스마트 계약은 영지식 증명을 검증합니다.

7. 영지식 증명이 확인되면 스마트 계약은 다음 작업을 수행합니다.
   - 현재 상태 해시를 새로운 상태 해시로 업데이트합니다.
   - 새로운 상태 해시와 트랜잭션 해시로 로그 항목을 내보냅니다.

### 도구 {#tools}

클라이언트 측 코드의 경우 [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), [Wagmi](https://wagmi.sh/)를 사용할 것입니다. 이것들은 업계 표준 도구입니다. 익숙하지 않다면 [이 튜토리얼](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)을 사용할 수 있습니다.

서버의 대부분은 [Node](https://nodejs.org/en)를 사용하는 JavaScript로 작성되었습니다. 영지식 부분은 [Noir](https://noir-lang.org/)로 작성되었습니다. `1.0.0-beta.10` 버전이 필요하므로 [지침에 따라 Noir를 설치](https://noir-lang.org/docs/getting_started/quick_start)한 후 다음을 실행합니다.

```
noirup -v 1.0.0-beta.10
```

우리가 사용하는 블록체인은 [Foundry](https://getfoundry.sh/introduction/installation)의 일부인 로컬 테스트 블록체인 `anvil`입니다.

## 구현 {#implementation}

복잡한 시스템이므로 단계적으로 구현하겠습니다.

### 1단계 - 수동 영지식 {#stage-1}

첫 번째 단계에서는 브라우저에서 트랜잭션에 서명한 다음 영지식 증명에 정보를 수동으로 제공합니다. 영지식 코드는 `server/noir/Prover.toml`([여기](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)에 문서화됨)에서 해당 정보를 얻을 것으로 예상합니다.

작동 모습을 보려면:

1. [Node](https://nodejs.org/en/download)와 [Noir](https://noir-lang.org/install)가 설치되어 있는지 확인합니다. macOS, Linux 또는 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)과 같은 UNIX 시스템에 설치하는 것이 좋습니다.

2. 1단계 코드를 다운로드하고 웹 서버를 시작하여 클라이언트 코드를 제공합니다.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   여기에 웹 서버가 필요한 이유는 특정 유형의 사기를 방지하기 위해 많은 지갑(예: MetaMask)이 디스크에서 직접 제공되는 파일을 허용하지 않기 때문입니다.

3. 지갑이 있는 브라우저를 엽니다.

4. 지갑에 새 암호 구문을 입력합니다. 이렇게 하면 기존 암호 구문이 삭제되므로 _반드시 백업해 두어야 합니다_.

   암호 구문은 `test test test test test test test test test test test junk`이며, anvil의 기본 테스트 암호 구문입니다.

5. [클라이언트 측 코드](http://localhost:5173/)로 이동합니다.

6. 지갑에 연결하고 수신 계정과 금액을 선택합니다.

7. **서명**을 클릭하고 트랜잭션에 서명합니다.

8. **Prover.toml** 제목 아래에 텍스트가 있습니다. `server/noir/Prover.toml`을 해당 텍스트로 바꿉니다.

9. 영지식 증명을 실행합니다.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   출력은 다음과 유사해야 합니다.

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. 마지막 두 값을 웹 브라우저에 표시되는 해시와 비교하여 메시지가 올바르게 해시되었는지 확인합니다.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[이 파일](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)은 Noir에서 예상하는 정보 형식을 보여줍니다.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

메시지는 텍스트 형식으로 되어 있어 사용자가 쉽게 이해할 수 있고(서명 시 필요함) Noir 코드가 구문 분석하기 쉽습니다. 금액은 피니 단위로 표시되어 한편으로는 소수점 단위의 전송을 가능하게 하고 다른 한편으로는 쉽게 읽을 수 있도록 합니다. 마지막 숫자는 [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce)입니다.

문자열의 길이는 100자입니다. 영지식 증명은 가변 크기 데이터를 잘 처리하지 못하므로 데이터를 패딩해야 하는 경우가 많습니다.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

이 세 가지 매개변수는 고정 크기 바이트 배열입니다.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

이는 구조체 배열을 지정하는 방법입니다. 각 항목에 대해 주소, 잔액(밀리ETH, 즉 [피니](https://cryptovalleyjournal.com/glossary/finney/)) 및 다음 논스 값을 지정합니다.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[이 파일](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx)은 클라이언트 측 처리를 구현하고 `server/noir/Prover.toml` 파일(영지식 매개변수를 포함하는 파일)을 생성합니다.

다음은 더 흥미로운 부분에 대한 설명입니다.

```tsx
export default attrs =>  {
```

이 함수는 다른 파일에서 가져올 수 있는 `Transfer` React 구성 요소를 만듭니다.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

이것은 계정 주소, 즉 `test ...`에 의해 생성된 주소입니다. test junk\` 암호 구문. 자신만의 주소를 사용하려면 이 정의를 수정하기만 하면 됩니다.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

이러한 [Wagmi 후크](https://wagmi.sh/react/api/hooks)를 통해 [viem](https://viem.sh/) 라이브러리와 지갑에 접근할 수 있습니다.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

이것은 공백으로 채워진 메시지입니다. [`useState`](https://react.dev/reference/react/useState) 변수 중 하나가 변경될 때마다 구성 요소가 다시 그려지고 `message`가 업데이트됩니다.

```tsx
  const sign = async () => {
```

이 함수는 사용자가 **서명** 버튼을 클릭할 때 호출됩니다. 메시지는 자동으로 업데이트되지만, 서명에는 지갑에서 사용자 승인이 필요하며, 필요하지 않은 경우에는 요청하고 싶지 않습니다.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

지갑에 [메시지 서명](https://viem.sh/docs/accounts/local/signMessage)을 요청합니다.

```tsx
    const hash = hashMessage(message)
```

메시지 해시를 가져옵니다. 디버깅(Noir 코드의)을 위해 사용자에게 제공하는 것이 도움이 됩니다.

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[공개 키 가져오기](https://viem.sh/docs/utilities/recoverPublicKey). 이는 [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) 함수에 필요합니다.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

상태 변수를 설정합니다. 이렇게 하면 구성 요소가 다시 그려지고 사용자에게 업데이트된 값이 표시됩니다.

```tsx
    let proverToml = `
```

`Prover.toml`의 텍스트입니다.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem은 65바이트 16진수 문자열로 공개 키를 제공합니다. 첫 번째 바이트는 버전 마커인 `0x04`입니다. 그 뒤에는 공개 키의 `x`에 대한 32바이트와 공개 키의 `y`에 대한 32바이트가 이어집니다.

그러나 Noir는 이 정보를 두 개의 바이트 배열, 즉 `x`용과 `y`용으로 받기를 기대합니다. 영지식 증명의 일부가 아닌 클라이언트에서 구문 분석하는 것이 더 쉽습니다.

이는 일반적으로 영지식에서 좋은 관행입니다. 영지식 증명 내부의 코드는 비용이 많이 들기 때문에 영지식 증명 외부에서 수행할 수 있는 모든 처리는 영지식 증명 외부에서 수행_해야 합니다_.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

서명은 65바이트 16진수 문자열로도 제공됩니다. 그러나 마지막 바이트는 공개 키를 복구하는 데만 필요합니다. 공개 키는 이미 Noir 코드에 제공될 것이므로 서명을 확인하는 데 필요하지 않으며 Noir 코드에서도 요구하지 않습니다.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

계정을 제공합니다.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>전송</h2>
```

이것은 구성 요소의 HTML(더 정확하게는 [JSX](https://react.dev/learn/writing-markup-with-jsx)) 형식입니다.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[이 파일](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr)은 실제 영지식 코드입니다.

```
use std::hash::pedersen_hash;
```

[페더슨 해시](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/)는 [Noir 표준 라이브러리](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)와 함께 제공됩니다. 영지식 증명은 일반적으로 이 해시 함수를 사용합니다. 표준 해시 함수에 비해 [산술 회로](https://rareskills.io/post/arithmetic-circuit) 내부에서 계산하기가 훨씬 쉽습니다.

```
use keccak256::keccak256;
use dep::ecrecover;
```

이 두 함수는 [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml)에 정의된 외부 라이브러리입니다. 이름 그대로 [keccak256 해시](https://emn178.github.io/online-tools/keccak_256.html)를 계산하는 함수와 이더리움 서명을 확인하고 서명자의 이더리움 주소를 복구하는 함수입니다.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir는 [Rust](https://www.rust-lang.org/)에서 영감을 받았습니다. 변수는 기본적으로 상수입니다. 이것이 전역 구성 상수를 정의하는 방법입니다. 특히 `ACCOUNT_NUMBER`는 우리가 저장하는 계정의 수입니다.

`u<number>`라는 이름의 데이터 유형은 해당 비트 수의 부호 없는 숫자입니다. 지원되는 유형은 `u8`, `u16`, `u32`, `u64` 및 `u128`뿐입니다.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

이 변수는 아래 설명된 대로 계정의 페더슨 해시에 사용됩니다.

```
global MESSAGE_LENGTH : u32 = 100;
```

위에서 설명한 것처럼 메시지 길이는 고정되어 있습니다. 여기에 지정되어 있습니다.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 서명](https://eips.ethereum.org/EIPS/eip-191)에는 26바이트 접두사, ASCII의 메시지 길이, 마지막으로 메시지 자체가 포함된 버퍼가 필요합니다.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

계정에 대해 저장하는 정보입니다. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields)는 일반적으로 최대 253비트의 숫자로, 영지식 증명을 구현하는 [산술 회로](https://rareskills.io/post/arithmetic-circuit)에서 직접 사용할 수 있습니다. 여기서는 `Field`를 사용하여 160비트 이더리움 주소를 저장합니다.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

전송 트랜잭션에 대해 저장하는 정보입니다.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

함수 정의. 매개변수는 `Account` 정보입니다. 결과는 길이가 `FLAT_ACCOUNT_FIELDS`인 `Field` 변수의 배열입니다.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

배열의 첫 번째 값은 계정 주소입니다. 두 번째 값에는 잔액과 논스가 모두 포함됩니다. `.into()` 호출은 숫자를 필요한 데이터 유형으로 변경합니다. `account.nonce`는 `u32` 값이지만, `u128` 값인 `account.balance << 32`에 더하려면 `u128`이어야 합니다. 이것이 첫 번째 `.into()`입니다. 두 번째는 `u128` 결과를 `Field`로 변환하여 배열에 맞도록 합니다.

```
    flat
}
```

Noir에서 함수는 끝에서만 값을 반환할 수 있습니다(조기 반환은 없음). 반환 값을 지정하려면 함수의 닫는 괄호 바로 앞에서 평가합니다.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

이 함수는 계정 배열을 Petersen 해시의 입력으로 사용할 수 있는 `Field` 배열로 바꿉니다.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

이것은 가변 변수, 즉 상수가 _아닌_ 변수를 지정하는 방법입니다. Noir의 변수는 항상 값을 가져야 하므로 이 변수를 모두 0으로 초기화합니다.

```
    for i in 0..ACCOUNT_NUMBER {
```

이것은 `for` 루프입니다. 경계는 상수입니다. Noir 루프는 컴파일 시간에 경계를 알아야 합니다. 그 이유는 산술 회로가 흐름 제어를 지원하지 않기 때문입니다. `for` 루프를 처리할 때 컴파일러는 각 반복에 대해 한 번씩 코드를 여러 번 넣습니다.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

마지막으로 계정 배열을 해시하는 함수에 도달했습니다.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

이 함수는 특정 주소를 가진 계정을 찾습니다. 이 함수는 주소를 찾은 후에도 모든 계정을 반복하기 때문에 표준 코드에서는 매우 비효율적입니다.

그러나 영지식 증명에는 흐름 제어가 없습니다. 조건을 확인해야 하는 경우 매번 확인해야 합니다.

`if` 문에서도 비슷한 일이 발생합니다. 위의 루프에 있는 `if` 문은 다음 수학적 문으로 변환됩니다.

_condition<sub>result</sub> = accounts[i].address == address_ // 같으면 1, 그렇지 않으면 0

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) 함수는 어설션이 거짓이면 영지식 증명을 충돌시킵니다. 이 경우 관련 주소를 가진 계정을 찾을 수 없습니다. 주소를 보고하려면 [서식 문자열](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)을 사용합니다.

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

이 함수는 전송 트랜잭션을 적용하고 새 계정 배열을 반환합니다.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Noir의 서식 문자열 내부에서는 구조 요소에 액세스할 수 없으므로 사용 가능한 복사본을 만듭니다.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

이들은 트랜잭션을 무효화할 수 있는 두 가지 조건입니다.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

새 계정 배열을 만들고 반환합니다.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

이 함수는 메시지에서 주소를 읽습니다.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

주소는 항상 20바이트(즉 16진수 40자리) 길이이며 7번째 문자에서 시작합니다.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

메시지에서 금액과 논스를 읽습니다.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

메시지에서 주소 뒤의 첫 번째 숫자는 전송할 피니(즉 ETH의 천분의 일)의 양입니다. 두 번째 숫자는 논스입니다. 그 사이의 텍스트는 무시됩니다.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

[튜플](https://noir-lang.org/docs/noir/concepts/data_types/tuples)을 반환하는 것은 Noir가 함수에서 여러 값을 반환하는 방법입니다.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

이 함수는 메시지를 바이트로 변환한 다음 금액을 `TransferTxn`으로 변환합니다.

```rust
// Viem의 hashMessage에 해당함
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

계정은 영지식 증명 내에서만 해시되므로 페더슨 해시를 사용할 수 있었습니다. 그러나 이 코드에서는 브라우저에서 생성된 메시지의 서명을 확인해야 합니다. 이를 위해 [EIP 191](https://eips.ethereum.org/EIPS/eip-191)의 이더리움 서명 형식을 따라야 합니다. 이는 표준 접두사, ASCII의 메시지 길이, 메시지 자체를 사용하여 결합된 버퍼를 만들고 이더리움 표준 keccak256을 사용하여 해시해야 함을 의미합니다.

```rust
    // ASCII 접두사
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

애플리케이션이 사용자에게 트랜잭션이나 다른 목적으로 사용될 수 있는 메시지에 서명하도록 요청하는 경우를 방지하기 위해 EIP 191에서는 모든 서명된 메시지가 0x19(유효한 ASCII 문자가 아님) 문자로 시작하고 그 뒤에 `Ethereum Signed Message:`와 줄 바꿈이 오도록 지정합니다.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

최대 999개의 메시지 길이를 처리하고 그보다 크면 실패합니다. 메시지 길이가 상수임에도 불구하고 이 코드를 추가한 이유는 변경하기가 더 쉽기 때문입니다. 프로덕션 시스템에서는 더 나은 성능을 위해 `MESSAGE_LENGTH`가 변경되지 않는다고 가정할 것입니다.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

이더리움 표준 `keccak256` 함수를 사용합니다.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

이 함수는 서명을 확인하며, 여기에는 메시지 해시가 필요합니다. 그런 다음 서명한 주소와 메시지 해시를 제공합니다. 메시지 해시는 바이트 배열보다 프로그램의 나머지 부분에서 사용하기 쉬운 두 개의 `Field` 값으로 제공됩니다.

필드 계산은 큰 숫자의 [나머지](https://en.wikipedia.org/wiki/Modulo)로 수행되지만 해당 숫자는 일반적으로 256비트보다 작기 때문에(그렇지 않으면 EVM에서 해당 계산을 수행하기 어려움) 두 개의 `Field` 값을 사용해야 합니다.

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1`과 `hash2`를 가변 변수로 지정하고 해시를 바이트 단위로 씁니다.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

이는 [솔리디티의 `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)와 유사하지만 두 가지 중요한 차이점이 있습니다.

- 서명이 유효하지 않으면 호출이 `assert`에 실패하고 프로그램이 중단됩니다.
- 공개 키는 서명과 해시에서 복구할 수 있지만, 이는 외부에서 수행할 수 있는 처리이므로 영지식 증명 내에서 수행할 가치가 없습니다. 여기서 누군가 우리를 속이려고 하면 서명 확인이 실패합니다.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

마지막으로 `main` 함수에 도달합니다. 계정 해시를 이전 값에서 새 값으로 유효하게 변경하는 트랜잭션이 있음을 증명해야 합니다. 또한 보낸 사람이 자신의 트랜잭션이 처리되었음을 알 수 있도록 특정 트랜잭션 해시가 있음을 증명해야 합니다.

```rust
{
    let mut txn = readTransferTxn(message);
```

메시지에서 발신 주소를 읽는 것이 아니라 서명에서 읽기 때문에 `txn`이 변경 가능해야 합니다.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### 2단계 - 서버 추가 {#stage-2}

두 번째 단계에서는 브라우저에서 전송 트랜잭션을 수신하고 구현하는 서버를 추가합니다.

작동 모습을 보려면:

1. Vite가 실행 중이면 중지합니다.

2. 서버가 포함된 브랜치를 다운로드하고 필요한 모든 모듈이 있는지 확인합니다.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir 코드를 컴파일할 필요는 없으며, 1단계에서 사용한 코드와 동일합니다.

3. 서버를 시작하세요.

   ```sh
   npm run start
   ```

4. 별도의 명령줄 창에서 Vite를 실행하여 브라우저 코드를 제공합니다.

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173)에서 클라이언트 코드로 이동합니다.

6. 트랜잭션을 실행하기 전에 보낼 수 있는 금액과 논스를 알아야 합니다. 이 정보를 얻으려면 **계정 데이터 업데이트**를 클릭하고 메시지에 서명합니다.

   여기에 딜레마가 있습니다. 한편으로 우리는 재사용될 수 있는 메시지에 서명하는 것을 원하지 않으며([재전송 공격](https://en.wikipedia.org/wiki/Replay_attack)), 이것이 우리가 애초에 논스를 원하는 이유입니다. 하지만 아직 논스가 없습니다. 해결책은 한 번만 사용할 수 있고 양쪽 모두에 이미 있는 논스(예: 현재 시간)를 선택하는 것입니다.

   이 해결책의 문제는 시간이 완벽하게 동기화되지 않을 수 있다는 것입니다. 따라서 대신 1분마다 변경되는 값에 서명합니다. 이는 재전송 공격에 대한 취약성 기간이 최대 1분임을 의미합니다. 프로덕션에서 서명된 요청은 TLS로 보호되고 터널의 다른 쪽(서버)이 이미 잔액과 논스를 공개할 수 있다는 점(작동하려면 알아야 함)을 고려할 때 이는 수용 가능한 위험입니다.

7. 브라우저가 잔액과 논스를 다시 받으면 전송 양식이 표시됩니다. 수신 주소와 금액을 선택하고 **전송**을 클릭합니다. 이 요청에 서명합니다.

8. 전송을 보려면 **계정 데이터 업데이트**를 하거나 서버를 실행하는 창을 확인하세요. 서버는 상태가 변경될 때마다 상태를 기록합니다.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[이 파일](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs)은 서버 프로세스를 포함하고 [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr)에서 Noir 코드와 상호 작용합니다. 다음은 흥미로운 부분에 대한 설명입니다.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) 라이브러리는 JavaScript 코드와 Noir 코드 간의 인터페이스입니다.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

산술 회로(이전 단계에서 만든 컴파일된 Noir 프로그램)를 로드하고 실행할 준비를 합니다.

```js
// 서명된 요청에 대한 응답으로만 계정 정보를 제공합니다.
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

계정 정보를 제공하려면 서명만 필요합니다. 메시지가 어떻게 될지 이미 알고 있으므로 메시지 해시도 알고 있기 때문입니다.

```js
const processMessage = async (message, signature) => {
```

메시지를 처리하고 인코딩하는 트랜잭션을 실행합니다.

```js
    // 공개 키 가져오기
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

이제 서버에서 JavaScript를 실행하므로 클라이언트가 아닌 서버에서 공개 키를 검색할 수 있습니다.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute`는 Noir 프로그램을 실행합니다. 매개변수는 [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)에 제공된 매개변수와 동일합니다. 긴 값은 Viem에서와 같이 단일 16진수 값(`0x60A7`)이 아닌 16진수 문자열 배열(`["0x60", "0xA7"]`)로 제공됩니다.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

오류가 발생하면 이를 포착한 다음 단순화된 버전을 클라이언트에 전달합니다.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

트랜잭션을 적용합니다. 이미 Noir 코드에서 수행했지만 거기에서 결과를 추출하는 것보다 여기에서 다시 수행하는 것이 더 쉽습니다.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

초기 `Accounts` 구조입니다.

### 3단계 - 이더리움 스마트 계약 {#stage-3}

1. 서버 및 클라이언트 프로세스를 중지합니다.

2. 스마트 계약이 포함된 브랜치를 다운로드하고 필요한 모든 모듈이 있는지 확인합니다.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. 별도의 명령줄 창에서 `anvil`을 실행합니다.

4. 검증 키와 솔리디티 검증기를 생성한 다음 검증기 코드를 솔리디티 프로젝트에 복사합니다.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. 스마트 계약으로 이동하여 `anvil` 블록체인을 사용하도록 환경 변수를 설정합니다.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol`을 배포하고 주소를 환경 변수에 저장합니다.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` 계약을 배포합니다.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` 값은 `Accounts` 초기 상태의 페더슨 해시입니다. `server/index.mjs`에서 이 초기 상태를 수정하면 트랜잭션을 실행하여 영지식 증명에서 보고된 초기 해시를 볼 수 있습니다.

8. 서버를 실행합니다.

   ```sh
   cd ../server
   npm run start
   ```

9. 다른 명령줄 창에서 클라이언트를 실행합니다.

   ```sh
   cd client
   npm run dev
   ```

10. 일부 트랜잭션을 실행합니다.

11. 상태가 온체인에서 변경되었는지 확인하려면 서버 프로세스를 다시 시작합니다. 트랜잭션의 원래 해시 값이 온체인에 저장된 해시 값과 다르기 때문에 `ZkBank`가 더 이상 트랜잭션을 수락하지 않는 것을 확인합니다.

    이것은 예상되는 오류 유형입니다.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

이 파일의 변경 사항은 주로 실제 증명을 만들고 온체인에 제출하는 것과 관련이 있습니다.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

온체인으로 보낼 실제 증명을 만들려면 [Barretenberg 패키지](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg)를 사용해야 합니다. 이 패키지는 명령줄 인터페이스(`bb`)를 실행하거나 [JavaScript 라이브러리인 `bb.js`](https://www.npmjs.com/package/@aztec/bb.js)를 사용하여 사용할 수 있습니다. JavaScript 라이브러리는 네이티브 코드를 실행하는 것보다 훨씬 느리므로 여기서는 [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)를 사용하여 명령줄을 사용합니다.

`bb.js`를 사용하기로 결정했다면 사용 중인 Noir 버전과 호환되는 버전을 사용해야 합니다. 작성 당시 현재 Noir 버전(1.0.0-beta.11)은 `bb.js` 버전 0.87을 사용합니다.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

여기 주소는 깨끗한 `anvil`로 시작하여 위 지침을 따를 때 얻는 주소입니다.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

이 개인 키는 `anvil`의 기본 사전 자금 지원 계정 중 하나입니다.

```js
const generateProof = async (witness, fileID) => {
```

`bb` 실행 파일을 사용하여 증명을 생성합니다.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

증인을 파일에 씁니다.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

실제로 증명을 만듭니다. 이 단계에서는 공개 변수가 있는 파일도 만들지만 필요하지 않습니다. 이미 `noir.execute`에서 해당 변수를 가져왔습니다.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

증명은 각각 16진수 값으로 표시되는 `Field` 값의 JSON 배열입니다. 그러나 Viem이 큰 16진수 문자열로 나타내는 단일 `bytes` 값으로 트랜잭션에서 보내야 합니다. 여기서는 모든 값을 연결하고 모든 `0x`를 제거한 다음 끝에 하나를 추가하여 형식을 변경합니다.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

정리하고 증명을 반환합니다.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

공개 필드는 32바이트 값의 배열이어야 합니다. 그러나 두 개의 `Field` 값 사이에 트랜잭션 해시를 분할해야 했기 때문에 16바이트 값으로 나타납니다. 여기서는 Viem이 실제로는 32바이트라는 것을 이해하도록 0을 추가합니다.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

각 주소는 각 논스를 한 번만 사용하므로 증인 파일과 출력 디렉터리의 고유 식별자로 `fromAddress`와 `nonce`의 조합을 사용할 수 있습니다.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

체인에 트랜잭션을 보냅니다.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

이것은 트랜잭션을 받는 온체인 코드입니다.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

온체인 코드는 검증기(`nargo`에서 만든 별도의 계약)와 현재 상태 해시라는 두 변수를 추적해야 합니다.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

상태가 변경될 때마다 `TransactionProcessed` 이벤트를 내보냅니다.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

이 함수는 트랜잭션을 처리합니다. 검증기가 요구하는 형식(온체인 처리 최소화 및 가스 비용 최소화)으로 증명(`bytes`)과 공개 입력(`bytes32` 배열)을 가져옵니다.

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

영지식 증명은 트랜잭션이 현재 해시에서 새 해시로 변경된다는 것이어야 합니다.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

검증자 계약을 호출하여 영지식 증명을 확인합니다. 이 단계는 영지식 증명이 잘못된 경우 트랜잭션을 되돌립니다.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

모든 것이 확인되면 상태 해시를 새 값으로 업데이트하고 `TransactionProcessed` 이벤트를 내보냅니다.

## 중앙화된 구성 요소에 의한 남용 {#abuses}

정보 보안은 세 가지 속성으로 구성됩니다.

- _기밀성_, 사용자는 읽을 권한이 없는 정보를 읽을 수 없습니다.
- _무결성_, 정보는 승인된 사용자에 의해 승인된 방식으로만 변경할 수 있습니다.
- _가용성_, 승인된 사용자는 시스템을 사용할 수 있습니다.

이 시스템에서는 영지식 증명을 통해 무결성이 제공됩니다. 은행이 각 계정의 잔액과 모든 트랜잭션을 알아야 하므로 가용성을 보장하기는 훨씬 더 어렵고 기밀성은 불가능합니다. 정보를 가진 주체가 해당 정보를 공유하는 것을 막을 방법은 없습니다.

[스텔스 주소](https://vitalik.eth.limo/general/2023/01/20/stealth.html)를 사용하여 진정으로 기밀인 은행을 만들 수 있을지 모르지만, 이는 이 글의 범위를 벗어납니다.

### 허위 정보 {#false-info}

서버가 무결성을 위반하는 한 가지 방법은 [데이터가 요청될 때](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) 허위 정보를 제공하는 것입니다.

이 문제를 해결하기 위해 계정을 비공개 입력으로 받고 정보가 요청된 주소를 공개 입력으로 받는 두 번째 Noir 프로그램을 작성할 수 있습니다. 출력은 해당 주소의 잔액과 논스, 그리고 계정의 해시입니다.

물론, 논스와 잔액을 온체인에 게시하고 싶지 않기 때문에 이 증명은 온체인에서 확인할 수 없습니다. 그러나 브라우저에서 실행되는 클라이언트 코드로 확인할 수 있습니다.

### 강제 트랜잭션 {#forced-txns}

L2에서 가용성을 보장하고 검열을 방지하는 일반적인 메커니즘은 [강제 트랜잭션](https://docs.optimism.io/stack/transactions/forced-transaction)입니다. 그러나 강제 트랜잭션은 영지식 증명과 결합되지 않습니다. 서버는 트랜잭션을 확인할 수 있는 유일한 주체입니다.

`smart-contracts/src/ZkBank.sol`을 수정하여 강제 트랜잭션을 수락하고 처리될 때까지 서버가 상태를 변경하지 못하도록 할 수 있습니다. 그러나 이것은 우리를 단순한 서비스 거부 공격에 노출시킵니다. 강제 트랜잭션이 유효하지 않아 처리할 수 없다면 어떻게 될까요?

해결책은 강제 트랜잭션이 유효하지 않다는 영지식 증명을 갖는 것입니다. 이렇게 하면 서버에 세 가지 옵션이 제공됩니다.

- 강제 트랜잭션을 처리하여 처리되었고 새 상태 해시임을 증명하는 영지식 증명을 제공합니다.
- 강제 트랜잭션을 거부하고 트랜잭션이 유효하지 않음(알 수 없는 주소, 잘못된 논스 또는 잔액 부족)을 계약에 대한 영지식 증명을 제공합니다.
- 강제 트랜잭션을 무시합니다. 서버가 실제로 트랜잭션을 처리하도록 강제할 방법은 없지만, 이는 전체 시스템을 사용할 수 없음을 의미합니다.

#### 가용성 채권 {#avail-bonds}

실제 구현에서는 서버를 계속 실행하기 위한某种 이윤 동기가 있을 것입니다. 강제 트랜잭션이 일정 기간 내에 처리되지 않으면 누구나 소각할 수 있는 가용성 채권을 서버가 게시하도록 하여 이 인센티브를 강화할 수 있습니다.

### 잘못된 Noir 코드 {#bad-noir-code}

일반적으로 사람들이 스마트 계약을 신뢰하도록 하려면 소스 코드를 [블록 탐색기](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)에 업로드합니다. 그러나 영지식 증명의 경우에는 이것으로 충분하지 않습니다.

`Verifier.sol`에는 Noir 프로그램의 함수인 검증 키가 포함되어 있습니다. 그러나 그 키는 우리에게 Noir 프로그램이 무엇이었는지 알려주지 않습니다. 실제로 신뢰할 수 있는 솔루션을 가지려면 Noir 프로그램(및 이를 만든 버전)을 업로드해야 합니다. 그렇지 않으면 영지식 증명이 백도어가 있는 다른 프로그램을 반영할 수 있습니다.

블록 탐색기에서 Noir 프로그램을 업로드하고 확인할 수 있게 될 때까지는 직접 수행해야 합니다(가급적이면 [IPFS](/developers/tutorials/ipfs-decentralized-ui/)에). 그런 다음 정교한 사용자는 소스 코드를 다운로드하고 직접 컴파일하고 `Verifier.sol`을 만들고 온체인에 있는 것과 동일한지 확인할 수 있습니다.

## 결론 {#conclusion}

플라즈마 유형 애플리케이션에는 정보 저장 공간으로 중앙화된 구성 요소가 필요합니다. 이는 잠재적인 취약점을 열지만, 그 대가로 블록체인 자체에서는 사용할 수 없는 방식으로 개인정보를 보호할 수 있습니다. 영지식 증명을 사용하면 무결성을 보장하고 중앙화된 구성 요소를 실행하는 사람이 가용성을 유지하는 것이 경제적으로 유리하도록 할 수 있습니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).

## 감사의 말 {#acknowledgements}

- Josh Crites는 이 글의 초안을 읽고 까다로운 Noir 문제를 해결하는 데 도움을 주었습니다.

남아있는 오류는 제 책임입니다.
