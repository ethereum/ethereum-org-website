---
title: "스텔스 주소 사용하기"
description: "스텔스 주소는 사용자가 자산을 익명으로 전송할 수 있게 해줍니다. 이 기사를 읽고 나면 스텔스 주소가 무엇이며 어떻게 작동하는지 설명하고, 익명성을 유지하는 방식으로 스텔스 주소를 사용하는 방법을 이해하며, 스텔스 주소를 사용하는 웹 기반 애플리케이션을 작성할 수 있게 됩니다."
author: Ori Pomerantz
tags: [ "스텔스 주소", "개인정보 보호", "암호학", "러스트", "wasm" ]
skill: intermediate
published: 2025-11-30
lang: ko
sidebarDepth: 3
---

당신은 빌입니다. 자세한 이유는 설명하지 않겠지만, 당신은 "세계의 여왕 앨리스" 캠페인에 기부하고 싶어 합니다. 앨리스가 당신이 기부했다는 것을 알게 되면, 그녀가 승리했을 때 당신에게 보상할 것입니다. 안타깝게도, 그녀의 승리는 보장되지 않았습니다. 경쟁 캠페인으로 "태양계의 여제 캐럴"이 있습니다. 만약 캐럴이 이기고, 그녀가 당신이 앨리스에게 기부한 사실을 알게 되면, 당신은 곤경에 처하게 될 것입니다. 그래서 당신은 당신의 계정에서 앨리스의 계정으로 200 ETH를 그냥 전송할 수 없습니다.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)에 해결책이 있습니다. 이 ERC는 익명 전송을 위해 [스텔스 주소](https://nerolation.github.io/stealth-utils)를 사용하는 방법을 설명합니다.

**경고**: 스텔스 주소의 기반이 되는 암호학은 우리가 아는 한 안전합니다. 하지만 잠재적인 사이드 채널 공격이 있을 수 있습니다. 이러한 위험을 줄이기 위해 무엇을 할 수 있는지 [아래](#go-wrong)에서 확인할 수 있습니다.

## 스텔스 주소 작동 방식 {#how}

이 기사에서는 스텔스 주소를 두 가지 방식으로 설명합니다. 첫 번째는 [사용 방법](#how-use)입니다. 이 부분만으로도 기사의 나머지 부분을 이해하는 데 충분합니다. 그다음은 [그 배경이 되는 수학에 대한 설명](#how-math)입니다. 암호학에 관심이 있다면 이 부분도 읽어보세요.

### 간단한 버전 (스텔스 주소 사용 방법) {#how-use}

앨리스는 두 개의 개인 키를 생성하고 해당 공개 키를 게시합니다(이 키들은 단일 이중 길이 메타 주소로 결합될 수 있습니다). 빌도 개인 키를 생성하고 해당 공개 키를 게시합니다.

한쪽의 공개 키와 다른 쪽의 개인 키를 사용하여 앨리스와 빌만 아는 공유 비밀을 도출할 수 있습니다(공개 키만으로는 도출할 수 없습니다). 이 공유 비밀을 사용하여 빌은 스텔스 주소를 얻고 그 주소로 자산을 보낼 수 있습니다.

앨리스도 공유 비밀로부터 주소를 얻지만, 그녀는 자신이 게시한 공개 키에 대한 개인 키를 알고 있기 때문에 해당 주소에서 인출할 수 있는 개인 키도 얻을 수 있습니다.

### 수학적 원리 (스텔스 주소가 이렇게 작동하는 이유) {#how-math}

표준 스텔스 주소는 [타원 곡선 암호학(ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor)을 사용하여 더 적은 키 비트로 더 나은 성능을 얻으면서도 동일한 수준의 보안을 유지합니다. 그러나 대부분의 경우 우리는 이를 무시하고 일반적인 산술을 사용한다고 가정할 수 있습니다.

모두가 아는 숫자, _G_가 있습니다. _G_를 곱할 수 있습니다. 하지만 ECC의 특성상 _G_로 나누는 것은 사실상 불가능합니다. 일반적으로 이더리움에서 공개 키 암호학이 작동하는 방식은 개인 키 \*P<sub>priv</sub>\*를 사용하여 트랜잭션에 서명하고, 그 후 공개 키 \*P<sub>pub</sub> = GP<sub>priv</sub>\*로 검증하는 것입니다.

앨리스는 두 개의 개인 키, \*K<sub>priv</sub>\*와 \*V<sub>priv</sub>\*를 생성합니다. \*K<sub>priv</sub>\*는 스텔스 주소에서 돈을 쓰는 데 사용되고, \*V<sub>priv</sub>\*는 앨리스에게 속한 주소를 보는 데 사용됩니다. 그다음 앨리스는 공개 키 \*K<sub>pub</sub> = GK<sub>priv</sub>\*와 \*V<sub>pub</sub> = GV<sub>priv</sub>\*를 게시합니다.

빌은 세 번째 개인 키 \*R<sub>priv</sub>\*를 생성하고 중앙 레지스트리에 \*R<sub>pub</sub> = GR<sub>priv</sub>\*를 게시합니다(빌이 앨리스에게 보냈을 수도 있지만, 우리는 캐럴이 엿듣고 있다고 가정합니다).

빌은 앨리스도 알 것이라고 예상하는 \*R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>\*를 계산합니다(아래 설명 참조). 이 값은 공유 비밀인 _S_라고 합니다. 이는 빌에게 공개 키 \*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)\*를 제공합니다. 이 공개 키로부터 그는 주소를 계산하고 원하는 모든 자원을 보낼 수 있습니다. 미래에 앨리스가 이기면, 빌은 그녀에게 \*R<sub>priv</sub>\*를 알려주어 자원이 자신에게서 왔음을 증명할 수 있습니다.

앨리스는 \*R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>\*를 계산합니다. 이는 그녀에게 동일한 공유 비밀인 _S_를 제공합니다. 그녀는 개인 키 \*K<sub>priv</sub>\*를 알고 있기 때문에 \*P<sub>priv</sub> = K<sub>priv</sub>+hash(S)\*를 계산할 수 있습니다. 이 키를 통해 그녀는 \*P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)\*에서 비롯된 주소에 있는 자산에 접근할 수 있습니다.

앨리스가 데이브의 세계 정복 캠페인 서비스에 하도급을 줄 수 있도록 별도의 보기 키가 있습니다. 앨리스는 데이브에게 공개 주소를 알리고 더 많은 돈이 생기면 알려주기를 원하지만, 그가 자신의 캠페인 자금을 쓰는 것은 원하지 않습니다.

보기와 지출에 별도의 키를 사용하기 때문에 앨리스는 데이브에게 \*V<sub>priv</sub>\*를 줄 수 있습니다. 그러면 데이브는 \*S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>\*를 계산하여 공개 키(_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_)를 얻을 수 있습니다. 하지만 \*K<sub>priv</sub>\*가 없으면 데이브는 개인 키를 얻을 수 없습니다.

요약하자면, 다음은 각 참여자가 알고 있는 값입니다.

| 앨리스                                                                       | 게시됨               | 빌                                                                         | 데이브                                                                         |                                            |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------ |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                            |
| _K<sub>priv</sub>_                                                        | -                 | -                                                                         | -                                                                           |                                            |
| _V<sub>priv</sub>_                                                        | -                 | -                                                                         | _V<sub>priv</sub>_                                                          |                                            |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                            |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                            |
| -                                                                         | -                 | _R<sub>priv</sub>_                                                        | -                                                                           |                                            |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                            |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | -                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                            |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | -                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                            |
| _주소=f(P<sub>pub</sub>)_                                | -                 | _주소=f(P<sub>pub</sub>)_                                | _주소=f(P<sub>pub</sub>)_                                  | _주소=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | -                 | -                                                                         | -                                                                           |                                            |

## 스텔스 주소가 잘못될 때 {#go-wrong}

_블록체인에는 비밀이 없습니다_. 스텔스 주소는 개인정보 보호를 제공할 수 있지만, 그 개인정보 보호는 트래픽 분석에 취약합니다. 사소한 예를 들어, 빌이 한 주소에 자금을 대고 즉시 트랜잭션을 보내 _R<sub>pub</sub>_ 값을 게시한다고 상상해 봅시다. 앨리스의 \*V<sub>priv</sub>\*가 없으면 이것이 스텔스 주소인지 확신할 수 없지만, 그렇게 추측하는 것이 합리적입니다. 그다음, 해당 주소에서 앨리스의 캠페인 기금 주소로 모든 ETH를 전송하는 또 다른 트랜잭션을 보게 됩니다. 증명할 수는 없지만, 빌이 앨리스의 캠페인에 막 기부했을 가능성이 높습니다. 캐럴은 분명 그렇게 생각할 것입니다.

빌이 스텔스 주소 자금 조달과 _R<sub>pub</sub>_ 게시를 분리하는 것은 쉽습니다(다른 시간에, 다른 주소에서 수행). 하지만 그것만으로는 충분하지 않습니다. 캐럴이 찾는 패턴은 빌이 한 주소에 자금을 대고, 그다음 앨리스의 캠페인 기금이 그 주소에서 인출하는 것입니다.

한 가지 해결책은 앨리스의 캠페인이 돈을 직접 인출하는 대신 제3자에게 지불하는 데 사용하는 것입니다. 앨리스의 캠페인이 데이브의 세계 정복 캠페인 서비스에 10 ETH를 보내면, 캐럴은 빌이 데이브의 고객 중 한 명에게 기부했다는 것만 알게 됩니다. 데이브에게 충분한 고객이 있다면, 캐럴은 빌이 자신과 경쟁하는 앨리스에게 기부했는지, 아니면 캐럴이 신경 쓰지 않는 아담, 앨버트, 애비게일에게 기부했는지 알 수 없을 것입니다. 앨리스는 지불금에 해시된 값을 포함시키고, 그다음 데이브에게 프리이미지를 제공하여 자신의 기부였음을 증명할 수 있습니다. 또는 위에서 언급했듯이 앨리스가 데이브에게 자신의 \*V<sub>priv</sub>\*를 주면, 그는 이미 그 지불이 누구로부터 왔는지 알고 있습니다.

이 해결책의 주된 문제점은 그 비밀 유지가 빌에게 이익이 될 때 앨리스가 비밀 유지에 신경 써야 한다는 것입니다. 앨리스는 자신의 평판을 유지하여 빌의 친구 밥도 그녀에게 기부하도록 하고 싶을 수 있습니다. 하지만 그녀가 빌을 폭로하는 것을 개의치 않을 수도 있습니다. 그러면 빌은 캐럴이 이길 경우 일어날 일을 두려워하게 될 것이기 때문입니다. 빌은 결국 앨리스에게 훨씬 더 많은 지원을 제공하게 될 수도 있습니다.

### 다중 스텔스 레이어 사용하기 {#multi-layer}

빌의 개인정보 보호를 앨리스에게 의존하는 대신, 빌이 직접 할 수 있습니다. 그는 가상의 인물인 밥과 벨라를 위해 여러 개의 메타 주소를 생성할 수 있습니다. 그러면 빌은 밥에게 ETH를 보내고, "밥"(실제로는 빌)은 벨라에게 보냅니다. "벨라"(역시 빌)는 앨리스에게 보냅니다.

캐럴은 여전히 트래픽 분석을 통해 빌-밥-벨라-앨리스 파이프라인을 볼 수 있습니다. 그러나 "밥"과 "벨라"가 다른 목적으로도 ETH를 사용한다면, 앨리스가 스텔스 주소에서 자신의 알려진 캠페인 주소로 즉시 인출하더라도 빌이 앨리스에게 무언가를 전송한 것처럼 보이지 않을 것입니다.

## 스텔스 주소 애플리케이션 작성하기 {#write-app}

이 기사에서는 [GitHub에서 사용할 수 있는](https://github.com/qbzzt/251022-stealth-addresses.git) 스텔스 주소 애플리케이션에 대해 설명합니다.

### 도구 {#tools}

[사용할 수 있는 타입스크립트 스텔스 주소 라이브러리](https://github.com/ScopeLift/stealth-address-sdk)가 있습니다. 그러나 암호화 작업은 CPU 집약적일 수 있습니다. 저는 [Rust](https://rust-lang.org/)와 같은 컴파일 언어로 구현하고 [WASM](https://webassembly.org/)을 사용하여 브라우저에서 코드를 실행하는 것을 선호합니다.

우리는 [Vite](https://vite.dev/)와 [React](https://react.dev/)를 사용할 것입니다. 이것들은 업계 표준 도구입니다. 익숙하지 않다면 [이 튜토리얼](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)을 사용할 수 있습니다. Vite를 사용하려면 Node가 필요합니다.

### 스텔스 주소 실제 작동 보기 {#in-action}

1. 필요한 도구 설치: [Rust](https://rust-lang.org/tools/install/) 및 [Node](https://nodejs.org/en/download).

2. GitHub 리포지토리를 복제합니다.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. 전제 조건을 설치하고 Rust 코드를 컴파일합니다.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. 웹 서버를 시작합니다.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [애플리케이션](http://localhost:5173/)으로 이동합니다. 이 애플리케이션 페이지에는 두 개의 프레임이 있습니다. 하나는 앨리스의 사용자 인터페이스용이고 다른 하나는 빌의 사용자 인터페이스용입니다. 두 프레임은 통신하지 않습니다. 편의를 위해 같은 페이지에 있을 뿐입니다.

6. 앨리스로서 **스텔스 메타 주소 생성**을 클릭합니다. 이렇게 하면 새 스텔스 주소와 해당 개인 키가 표시됩니다. 스텔스 메타 주소를 클립보드에 복사합니다.

7. 빌로서 새 스텔스 메타 주소를 붙여넣고 **주소 생성**을 클릭합니다. 이렇게 하면 앨리스를 위해 자금을 조달할 주소가 제공됩니다.

8. 주소와 빌의 공개 키를 복사하여 앨리스의 사용자 인터페이스에 있는 "빌이 생성한 주소의 개인 키" 영역에 붙여넣습니다. 해당 필드를 채우면 해당 주소의 자산에 접근할 수 있는 개인 키가 표시됩니다.

9. [온라인 계산기](https://iancoleman.net/ethereum-private-key-to-address/)를 사용하여 개인 키가 주소와 일치하는지 확인할 수 있습니다.

### 프로그램 작동 방식 {#how-the-program-works}

#### WASM 구성 요소 {#wasm}

WASM으로 컴파일되는 소스 코드는 [Rust](https://rust-lang.org/)로 작성되었습니다. [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs)에서 확인할 수 있습니다. 이 코드는 주로 JavaScript 코드와 [`eth-stealth-addresses` 라이브러리](https://github.com/kassandraoftroy/eth-stealth-addresses) 사이의 인터페이스입니다.

**`Cargo.toml`**

Rust의 [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html)은 JavaScript의 [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)과 유사합니다. 여기에는 패키지 정보, 종속성 선언 등이 포함됩니다.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) 패키지는 임의의 값을 생성해야 합니다. 이는 순수한 알고리즘적 수단으로는 수행될 수 없으며, 엔트로피 소스로서 물리적 프로세스에 대한 접근이 필요합니다. 이 정의는 우리가 실행 중인 브라우저에 요청하여 해당 엔트로피를 얻도록 지정합니다.

```toml
console_error_panic_hook = "0.1.7"
```

[이 라이브러리](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)는 WASM 코드가 패닉 상태에 빠져 계속할 수 없을 때 더 의미 있는 오류 메시지를 제공합니다.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM 코드를 생성하는 데 필요한 출력 유형입니다.

**`lib.rs`**

이것이 실제 Rust 코드입니다.

```rust
use wasm_bindgen::prelude::*;
```

Rust에서 WASM 패키지를 생성하기 위한 정의입니다. [여기](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)에 문서화되어 있습니다.

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

[`eth-stealth-addresses` 라이브러리](https://github.com/kassandraoftroy/eth-stealth-addresses)에서 필요한 함수입니다.

```rust
use hex::{decode,encode};
```

Rust는 일반적으로 값에 대해 바이트 [배열](https://doc.rust-lang.org/std/primitive.array.html)(`[u8; <size>]`)을 사용합니다. 그러나 JavaScript에서는 일반적으로 16진수 문자열을 사용합니다. [`hex` 라이브러리](https://docs.rs/hex/latest/hex/)는 한 표현에서 다른 표현으로 변환해 줍니다.

```rust
#[wasm_bindgen]
```

JavaScript에서 이 함수를 호출할 수 있도록 WASM 바인딩을 생성합니다.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

여러 필드가 있는 객체를 반환하는 가장 쉬운 방법은 JSON 문자열을 반환하는 것입니다.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html)는 세 개의 필드를 반환합니다.

- 메타 주소(_K<sub>pub</sub>_ 및 _V<sub>pub</sub>_)
- 보기 개인 키(_V<sub>priv</sub>_)
- 지출 개인 키(_K<sub>priv</sub>_)

[튜플](https://doc.rust-lang.org/std/primitive.tuple.html) 구문을 사용하면 해당 값들을 다시 분리할 수 있습니다.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

[`format!`](https://doc.rust-lang.org/std/fmt/index.html) 매크로를 사용하여 JSON으로 인코딩된 문자열을 생성합니다. [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html)를 사용하여 배열을 16진수 문자열로 변경합니다.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

이 함수는 16진수 문자열(JavaScript에서 제공)을 바이트 배열로 변환합니다. JavaScript 코드로 제공된 값을 파싱하는 데 사용합니다. 이 함수는 Rust가 배열과 벡터를 처리하는 방식 때문에 복잡합니다.

`<const N: usize>` 표현식은 [제네릭](https://doc.rust-lang.org/book/ch10-01-syntax.html)이라고 합니다. `N`은 반환되는 배열의 길이를 제어하는 매개변수입니다. 함수는 실제로는 `str_to_array::<n>`으로 호출되며, 여기서 `n`은 배열 길이입니다.

반환 값은 `Option<[u8; N]>`이며, 이는 반환되는 배열이 [선택 사항](https://doc.rust-lang.org/std/option/)임을 의미합니다. 이는 실패할 수 있는 함수에 대한 Rust의 일반적인 패턴입니다.

예를 들어, `str_to_array::10("bad060a7")`를 호출하면 함수는 10개 값의 배열을 반환해야 하지만 입력은 4바이트뿐입니다. 함수는 실패해야 하며, `None`을 반환하여 이를 수행합니다. `str_to_array::4("bad060a7")`의 반환 값은 `Some<[0xba, 0xd0, 0x60, 0xa7]>`입니다.

```rust
    // decode는 Result<Vec<u8>, _>를 반환합니다
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) 함수는 `Result<Vec<u8>, FromHexError>`를 반환합니다. [`Result`](https://doc.rust-lang.org/std/result/) 유형은 성공적인 결과(`Ok(value)`) 또는 오류(`Err(error)`)를 포함할 수 있습니다.

`.ok()` 메서드는 `Result`를 `Option`으로 변환하며, `Option`의 값은 성공하면 `Ok()` 값이 되고, 그렇지 않으면 `None`이 됩니다. 마지막으로 [물음표 연산자](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)는 `Option`이 비어 있는 경우 현재 함수를 중단하고 `None`을 반환합니다. 그렇지 않으면 값을 언래핑하여 반환합니다(이 경우 `vec`에 값을 할당하기 위해).

이것은 오류를 처리하는 이상하게 복잡한 방법처럼 보이지만, `Result`와 `Option`은 모든 오류가 어떤 식으로든 처리되도록 보장합니다.

```rust
    if vec.len() != N { return None; }
```

바이트 수가 올바르지 않으면 실패이므로 `None`을 반환합니다.

```rust
    // try_into는 vec를 소비하고 [u8; N]을 만들려고 시도합니다
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust에는 두 가지 배열 유형이 있습니다. [배열](https://doc.rust-lang.org/std/primitive.array.html)은 고정된 크기를 가집니다. [벡터](https://doc.rust-lang.org/std/vec/index.html)는 커지거나 작아질 수 있습니다. `hex::decode`는 벡터를 반환하지만, `eth_stealth_addresses` 라이브러리는 배열을 받기를 원합니다. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods)는 값을 다른 유형으로 변환합니다(예: 벡터를 배열로).

```rust
    Some(array)
}
```

Rust에서는 함수 끝에서 값을 반환할 때 [`return`](https://doc.rust-lang.org/std/keyword.return.html) 키워드를 사용할 필요가 없습니다.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

이 함수는 \*V<sub>pub</sub>\*와 \*K<sub>pub</sub>\*를 모두 포함하는 공개 메타 주소를 받습니다. 이 함수는 스텔스 주소, 게시할 공개 키(_R<sub>pub</sub>_), 그리고 게시된 주소 중 어떤 것이 앨리스에 속하는지 식별하는 속도를 높이는 1바이트 스캔 값을 반환합니다.

스캔 값은 공유 비밀(_S = GR<sub>priv</sub>V<sub>priv</sub>_)의 일부입니다. 이 값은 앨리스가 사용할 수 있으며, 이를 확인하는 것은 \*f(K<sub>pub</sub>+G\*hash(S))\*가 게시된 주소와 같은지 확인하는 것보다 훨씬 빠릅니다.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

라이브러리의 [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html)를 사용합니다.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSON으로 인코딩된 출력 문자열을 준비합니다.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

이 함수는 라이브러리의 [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html)를 사용하여 주소에서 인출할 개인 키(_R<sub>priv</sub>_)를 계산합니다. 이 계산에는 다음 값들이 필요합니다.

- 주소(_주소=f(P<sub>pub</sub>)_)
- 빌이 생성한 공개 키(_R<sub>pub</sub>_)
- 보기 개인 키(_V<sub>priv</sub>_)
- 지출 개인 키(_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html)는 WASM 코드가 초기화될 때 함수가 실행되도록 지정합니다.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

이 코드는 패닉 출력이 JavaScript 콘솔로 전송되도록 지정합니다. 실제 작동을 보려면 애플리케이션을 사용하고 빌에게 잘못된 메타 주소(16진수 숫자 하나만 변경)를 제공해 보세요. JavaScript 콘솔에서 다음 오류가 표시됩니다.

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

뒤이어 스택 추적이 나타납니다. 그다음 빌에게 유효한 메타 주소를 주고, 앨리스에게 잘못된 주소나 잘못된 공개 키를 주세요. 다음 오류가 표시됩니다.

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

다시 한 번 스택 추적이 이어집니다.

#### 사용자 인터페이스 {#ui}

사용자 인터페이스는 [React](https://react.dev/)를 사용하여 작성되었고 [Vite](https://vite.dev/)에 의해 제공됩니다. [이 튜토리얼](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)을 사용하여 배울 수 있습니다. 여기서는 블록체인이나 지갑과 직접 상호작용하지 않기 때문에 [WAGMI](https://wagmi.sh/)가 필요 없습니다.

사용자 인터페이스에서 명확하지 않은 유일한 부분은 WASM 연결입니다. 작동 방식은 다음과 같습니다.

**`vite.config.js`**

이 파일에는 [Vite 구성](https://vite.dev/config/)이 포함되어 있습니다.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

두 가지 Vite 플러그인이 필요합니다: [react](https://www.npmjs.com/package/@vitejs/plugin-react)와 [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

이 파일은 애플리케이션의 주요 구성 요소입니다. 이 컨테이너에는 `Alice`와 `Bill`이라는 두 가지 구성 요소, 즉 해당 사용자를 위한 사용자 인터페이스가 포함되어 있습니다. WASM과 관련된 부분은 초기화 코드입니다.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

[`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/)을 사용하면 여기서 사용하는 두 개의 파일이 생성됩니다: 실제 코드가 포함된 wasm 파일(여기서는 `src/rust-wasm/pkg/rust_wasm_bg.wasm`)과 이를 사용하기 위한 정의가 포함된 JavaScript 파일(여기서는 `src/rust-wasm/pkg/rust_wasm.js`). 해당 JavaScript 파일의 기본 내보내기는 WASM을 시작하기 위해 실행해야 하는 코드입니다.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect` 훅](https://react.dev/reference/react/useEffect)을 사용하면 상태 변수가 변경될 때 실행되는 함수를 지정할 수 있습니다. 여기서 상태 변수 목록은 비어 있으므로(`[]`) 이 함수는 페이지가 로드될 때 한 번만 실행됩니다.

이펙트 함수는 즉시 반환되어야 합니다. WASM `init`와 같은 비동기 코드를 사용하려면(이는 `.wasm` 파일을 로드해야 하므로 시간이 걸림) 내부 [`async`](https://en.wikipedia.org/wiki/Async/await) 함수를 정의하고 `await` 없이 실행합니다.

**`Bill.jsx`**

이것은 빌의 사용자 인터페이스입니다. 앨리스가 제공한 스텔스 메타 주소를 기반으로 주소를 생성하는 단일 작업이 있습니다.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

기본 내보내기 외에도 `wasm-pack`에서 생성된 JavaScript 코드는 WASM 코드의 모든 함수에 대해 함수를 내보냅니다.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM 함수를 호출하려면 `wasm-pack`이 생성한 JavaScript 파일에서 내보낸 함수를 호출하기만 하면 됩니다.

**`Alice.jsx`**

`Alice.jsx`의 코드는 유사하지만 앨리스에게는 두 가지 작업이 있습니다.

- 메타 주소 생성
- 빌이 게시한 주소의 개인 키 가져오기

## 결론 {#conclusion}

스텔스 주소는 만병통치약이 아니며, [올바르게 사용해야](#go-wrong) 합니다. 하지만 올바르게 사용하면 공개 블록체인에서 개인정보 보호를 가능하게 할 수 있습니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).