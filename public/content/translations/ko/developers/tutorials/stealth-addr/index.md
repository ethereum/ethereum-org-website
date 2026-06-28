---
title: "스텔스 주소 사용하기"
description: "스텔스 주소를 사용하면 사용자가 익명으로 자산을 전송할 수 있습니다. 이 글을 읽고 나면 스텔스 주소가 무엇이고 어떻게 작동하는지 설명하고, 익명성을 유지하는 방식으로 스텔스 주소를 사용하는 방법을 이해하며, 스텔스 주소를 사용하는 웹 기반 애플리케이션을 작성할 수 있게 됩니다."
author: "오리 포메란츠"
tags: ["스텔스 주소", "프라이버시", "암호학", "Rust", "wasm"]
skill: intermediate
breadcrumb: "스텔스 주소"
published: 2025-11-30
lang: ko
sidebarDepth: 3
---

당신은 빌(Bill)입니다. 자세한 이유는 생략하겠지만, 당신은 "세계의 여왕 앨리스(Alice)" 캠페인에 기부하고 싶어 하며, 앨리스가 승리할 경우 보상을 받을 수 있도록 그녀가 당신의 기부 사실을 알기를 원합니다. 안타깝게도 그녀의 승리가 보장된 것은 아닙니다. 경쟁 캠페인인 "태양계의 여제 캐롤(Carol)"이 있습니다. 만약 캐롤이 승리하고 당신이 앨리스에게 기부했다는 사실을 알게 된다면, 당신은 곤경에 처할 것입니다. 따라서 당신의 계정에서 앨리스의 계정으로 200 ETH를 그냥 전송할 수는 없습니다.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)에 해결책이 있습니다. 이 ERC는 익명 전송을 위해 [스텔스 주소](https://nerolation.github.io/stealth-utils)를 사용하는 방법을 설명합니다.

**경고**: 스텔스 주소의 기반이 되는 암호학은 우리가 아는 한 안전합니다. 하지만 잠재적인 부채널 공격(side-channel attack)이 존재할 수 있습니다. [아래](#go-wrong)에서 이 위험을 줄이기 위해 할 수 있는 조치를 확인할 수 있습니다.

## 스텔스 주소의 작동 방식 {#how}

이 글에서는 스텔스 주소를 두 가지 방식으로 설명하고자 합니다. 첫 번째는 [사용 방법](#how-use)입니다. 이 부분만으로도 글의 나머지 내용을 이해하는 데 충분합니다. 그다음에는 [그 이면에 있는 수학적 원리에 대한 설명](#how-math)이 이어집니다. 암호학에 관심이 있다면 이 부분도 읽어보시기 바랍니다. 

### 간단한 버전 (스텔스 주소 사용 방법) {#how-use}

앨리스는 두 개의 개인 키를 생성하고 그에 대응하는 공개키를 게시합니다(이 공개키들은 결합되어 두 배 길이의 단일 메타 주소가 될 수 있습니다). 빌 또한 개인 키를 생성하고 그에 대응하는 공개키를 게시합니다.

한 당사자의 공개키와 다른 당사자의 개인 키를 사용하면, 앨리스와 빌만 아는 공유 비밀(shared secret)을 도출할 수 있습니다(공개키만으로는 도출할 수 없습니다). 이 공유 비밀을 사용하여 빌은 스텔스 주소를 얻고 그곳으로 자산을 전송할 수 있습니다.

앨리스 역시 공유 비밀에서 주소를 얻지만, 자신이 게시한 공개키에 대한 개인 키를 알고 있기 때문에 해당 주소에서 자산을 출금할 수 있는 개인 키도 얻을 수 있습니다.

### 수학적 원리 (스텔스 주소가 이렇게 작동하는 이유) {#how-math}

표준 스텔스 주소는 동일한 수준의 보안을 유지하면서 더 적은 키 비트로 더 나은 성능을 얻기 위해 [타원곡선 암호학(ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor)을 사용합니다. 하지만 대부분의 경우 이를 무시하고 일반적인 산술 연산을 사용한다고 가정해도 무방합니다.

모두가 아는 숫자 <em>G</em>가 있습니다. <em>G</em>를 곱할 수는 있지만, ECC의 특성상 <em>G</em>로 나누는 것은 사실상 불가능합니다. 이더리움에서 공개키 암호학이 일반적으로 작동하는 방식은 개인 키 <em>P<sub>priv</sub></em>를 사용하여 트랜잭션에 서명하고, 이를 공개키 <em>P<sub>pub</sub> = GP<sub>priv</sub></em>로 검증하는 것입니다. 

앨리스는 두 개의 개인 키 <em>K<sub>priv</sub></em>와 <em>V<sub>priv</sub></em>를 생성합니다. <em>K<sub>priv</sub></em>는 스텔스 주소에서 자금을 지출하는 데 사용되고, <em>V<sub>priv</sub></em>는 앨리스 소유의 주소를 조회하는 데 사용됩니다. 그런 다음 앨리스는 공개키 <em>K<sub>pub</sub> = GK<sub>priv</sub></em>와 <em>V<sub>pub</sub> = GV<sub>priv</sub></em>를 게시합니다.

빌은 세 번째 개인 키 <em>R<sub>priv</sub></em>를 생성하고, <em>R<sub>pub</sub> = GR<sub>priv</sub></em>를 중앙 레지스트리에 게시합니다(빌이 이를 앨리스에게 직접 보낼 수도 있었지만, 캐롤이 엿듣고 있다고 가정합니다).

빌은 <em>R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub></em>를 계산하며, 앨리스도 이 값을 알 것이라고 예상합니다(아래에서 설명). 이 값을 공유 비밀인 <em>S</em>라고 부릅니다. 이를 통해 빌은 공개키 *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*를 얻습니다. 이 공개키로부터 그는 주소를 계산하고 원하는 자원을 전송할 수 있습니다. 나중에 앨리스가 승리하면, 빌은 그녀에게 <em>R<sub>priv</sub></em>를 알려주어 그 자원이 자신으로부터 왔음을 증명할 수 있습니다.

앨리스는 <em>R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></em>를 계산합니다. 이를 통해 그녀는 동일한 공유 비밀 <em>S</em>를 얻습니다. 그녀는 개인 키 <em>K<sub>priv</sub></em>를 알고 있으므로 <em>P<sub>priv</sub> = K<sub>priv</sub>+hash(S)</em>를 계산할 수 있습니다. 이 키를 사용하면 *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*의 결과로 생성된 주소의 자산에 접근할 수 있습니다.

앨리스가 데이브(Dave)의 세계 정복 캠페인 서비스에 하청을 줄 수 있도록 별도의 조회 키(viewing key)가 존재합니다. 앨리스는 데이브가 공개 주소를 알고 더 많은 자금이 들어왔을 때 자신에게 알려주는 것은 허용하지만, 그가 캠페인 자금을 사용하는 것은 원하지 않습니다.

조회와 지출에 별도의 키를 사용하기 때문에, 앨리스는 데이브에게 <em>V<sub>priv</sub></em>를 줄 수 있습니다. 그러면 데이브는 <em>S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></em>를 계산하여 공개키(*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*)를 얻을 수 있습니다. 하지만 <em>K<sub>priv</sub></em>가 없으면 데이브는 개인 키를 얻을 수 없습니다.

요약하자면, 다음은 각 참여자가 알고 있는 값들입니다.

| 앨리스 | 게시됨 | 빌 | 데이브 |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Address=f(P<sub>pub</sub>)* | - | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## 스텔스 주소에 문제가 생기는 경우 {#go-wrong}

*블록체인에는 비밀이 없습니다*. 스텔스 주소가 프라이버시를 제공할 수는 있지만, 그 프라이버시는 트래픽 분석에 취약합니다. 사소한 예를 들자면, 빌이 한 주소에 자금을 조달하고 즉시 *R<sub>pub</sub>* 값을 게시하는 트랜잭션을 보낸다고 상상해 보십시오. 앨리스의 <em>V<sub>priv</sub></em>가 없다면 이것이 스텔스 주소라고 확신할 수는 없지만, 정황상 그렇게 추측할 수 있습니다. 그런 다음 해당 주소의 모든 ETH를 앨리스의 캠페인 자금 주소로 전송하는 또 다른 트랜잭션이 발생합니다. 증명할 수는 없겠지만, 빌이 방금 앨리스의 캠페인에 기부했을 가능성이 높습니다. 캐롤은 분명히 그렇게 생각할 것입니다.

빌이 <em>R<sub>pub</sub></em>의 게시와 스텔스 주소로의 자금 조달을 분리하는 것은 쉽습니다(서로 다른 시간에, 서로 다른 주소에서 수행). 하지만 그것만으로는 충분하지 않습니다. 캐롤이 찾는 패턴은 빌이 한 주소에 자금을 조달하고, 그 후 앨리스의 캠페인 자금이 그곳에서 출금되는 것입니다. 

한 가지 해결책은 앨리스의 캠페인이 자금을 직접 출금하지 않고 제3자에게 지불하는 데 사용하는 것입니다. 앨리스의 캠페인이 데이브의 세계 정복 캠페인 서비스에 10 ETH를 보낸다면, 캐롤은 빌이 데이브의 고객 중 한 명에게 기부했다는 사실만 알게 됩니다. 데이브에게 충분히 많은 고객이 있다면, 캐롤은 빌이 자신과 경쟁하는 앨리스에게 기부했는지, 아니면 자신이 신경 쓰지 않는 아담(Adam), 알버트(Albert), 아비게일(Abigail)에게 기부했는지 알 수 없을 것입니다. 앨리스는 지불 시 해시된 값을 포함하고 데이브에게 프리이미지(preimage)를 제공하여 그것이 자신의 기부금임을 증명할 수 있습니다. 또는 위에서 언급했듯이 앨리스가 데이브에게 자신의 <em>V<sub>priv</sub></em>를 주면, 그는 이미 지불금이 누구로부터 왔는지 알 수 있습니다.

이 해결책의 주요 문제점은 그 비밀 유지가 빌에게 이익이 될 때 앨리스가 비밀 유지에 신경을 써야 한다는 것입니다. 앨리스는 빌의 친구 밥(Bob)도 자신에게 기부하도록 평판을 유지하고 싶어 할 수 있습니다. 하지만 그녀가 빌을 노출시키는 것을 개의치 않을 수도 있는데, 그렇게 되면 빌은 캐롤이 이겼을 때 일어날 일을 두려워하게 될 것이기 때문입니다. 결국 빌은 앨리스에게 더 많은 지원을 제공하게 될지도 모릅니다.

### 다중 스텔스 계층 사용하기 {#multi-layer}

빌의 프라이버시 보호를 앨리스에게 의존하는 대신, 빌이 직접 할 수도 있습니다. 그는 가상의 인물인 밥과 벨라(Bella)를 위해 여러 개의 메타 주소를 생성할 수 있습니다. 그런 다음 빌은 밥에게 ETH를 보내고, "밥"(실제로는 빌)은 그것을 벨라에게 보냅니다. "벨라"(역시 빌)는 그것을 앨리스에게 보냅니다.

캐롤은 여전히 트래픽 분석을 통해 빌-밥-벨라-앨리스로 이어지는 파이프라인을 볼 수 있습니다. 하지만 "밥"과 "벨라"가 다른 목적으로도 ETH를 사용한다면, 앨리스가 스텔스 주소에서 알려진 캠페인 주소로 즉시 출금하더라도 빌이 앨리스에게 무언가를 전송한 것처럼 보이지 않을 것입니다.

## 스텔스 주소 애플리케이션 작성하기 {#write-app}

이 글에서는 [GitHub에서 사용할 수 있는](https://github.com/qbzzt/251022-stealth-addresses.git) 스텔스 주소 애플리케이션을 설명합니다. 

### 도구 {#tools}

우리가 사용할 수 있는 [TypeScript 스텔스 주소 라이브러리](https://github.com/ScopeLift/stealth-address-sdk)가 있습니다. 하지만 암호학 연산은 CPU 집약적일 수 있습니다. 저는 [Rust](https://rust-lang.org/)와 같은 컴파일 언어로 이를 구현하고, 브라우저에서 코드를 실행하기 위해 [WASM](https://webassembly.org/)을 사용하는 것을 선호합니다.

우리는 [Vite](https://vite.dev/)와 [React](https://react.dev/)를 사용할 것입니다. 이들은 업계 표준 도구이며, 익숙하지 않다면 [이 튜토리얼](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)을 참고할 수 있습니다. Vite를 사용하려면 Node가 필요합니다.

### 스텔스 주소의 실제 작동 확인하기 {#in-action}

1. 필요한 도구인 [Rust](https://rust-lang.org/tools/install/)와 [Node](https://nodejs.org/en/download)를 설치합니다.

2. GitHub 리포지토리를 클론합니다.

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

5. [애플리케이션](http://localhost:5173/)으로 이동합니다. 이 애플리케이션 페이지에는 두 개의 프레임이 있습니다. 하나는 앨리스의 사용자 인터페이스이고 다른 하나는 빌의 사용자 인터페이스입니다. 두 프레임은 통신하지 않으며, 편의상 같은 페이지에 있을 뿐입니다.

6. 앨리스의 입장에서 <strong>Generate a Stealth Meta-Address(스텔스 메타 주소 생성)</strong>를 클릭합니다. 그러면 새로운 스텔스 주소와 그에 대응하는 개인 키가 표시됩니다. 스텔스 메타 주소를 클립보드에 복사합니다.

7. 빌의 입장에서 새로운 스텔스 메타 주소를 붙여넣고 <strong>Generate an address(주소 생성)</strong>를 클릭합니다. 이를 통해 앨리스를 위해 자금을 조달할 주소를 얻게 됩니다. 

8. 주소와 빌의 공개키를 복사하여 앨리스의 사용자 인터페이스에 있는 "Private key for address generated by Bill(빌이 생성한 주소의 개인 키)" 영역에 붙여넣습니다. 해당 필드가 채워지면 그 주소의 자산에 접근할 수 있는 개인 키가 표시됩니다.

9. [온라인 계산기](https://iancoleman.net/ethereum-private-key-to-address/)를 사용하여 개인 키가 주소와 일치하는지 확인할 수 있습니다.

### 프로그램 작동 방식 {#how-the-program-works}

#### WASM 컴포넌트 {#wasm}

WASM으로 컴파일되는 소스 코드는 [Rust](https://rust-lang.org/)로 작성되었습니다. [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs)에서 확인할 수 있습니다. 이 코드는 주로 JavaScript 코드와 [`eth-stealth-addresses` 라이브러리](https://github.com/kassandraoftroy/eth-stealth-addresses) 사이의 인터페이스 역할을 합니다.

**`Cargo.toml`**

Rust의 [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html)는 JavaScript의 [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)와 유사합니다. 패키지 정보, 의존성 선언 등을 포함합니다.

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) 패키지는 무작위 값을 생성해야 합니다. 이는 순수한 알고리즘적 수단으로는 불가능하며, 엔트로피 소스로서 물리적 프로세스에 대한 접근이 필요합니다. 이 정의는 우리가 실행 중인 브라우저에 요청하여 해당 엔트로피를 얻을 것임을 명시합니다.

```toml
console_error_panic_hook = "0.1.7"
```

[이 라이브러리](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)는 WASM 코드가 패닉 상태에 빠져 계속할 수 없을 때 더 의미 있는 오류 메시지를 제공합니다.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM 코드를 생성하는 데 필요한 출력 타입입니다.

**`lib.rs`**

실제 Rust 코드입니다.

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

[`eth-stealth-addresses` 라이브러리](https://github.com/kassandraoftroy/eth-stealth-addresses)에서 필요한 함수들입니다.

```rust
use hex::{decode,encode};
```

Rust는 일반적으로 값을 위해 바이트 [배열](https://doc.rust-lang.org/std/primitive.array.html)(`[u8; <size>]`)을 사용합니다. 하지만 JavaScript에서는 일반적으로 16진수 문자열을 사용합니다. [`hex` 라이브러리](https://docs.rs/hex/latest/hex/)는 한 표현에서 다른 표현으로 변환해 줍니다.

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

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html)는 세 가지 필드를 반환합니다.

- 메타 주소 (*K<sub>pub</sub>* 및 *V<sub>pub</sub>*)
- 조회 개인 키 (*V<sub>priv</sub>*)
- 지출 개인 키 (*K<sub>priv</sub>*)

[튜플(tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) 구문을 사용하면 해당 값들을 다시 분리할 수 있습니다.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

[`format!`](https://doc.rust-lang.org/std/fmt/index.html) 매크로를 사용하여 JSON으로 인코딩된 문자열을 생성합니다. 배열을 16진수 문자열로 변경하려면 [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html)를 사용합니다.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

이 함수는 (JavaScript에서 제공된) 16진수 문자열을 바이트 배열로 변환합니다. JavaScript 코드에서 제공된 값을 파싱하는 데 사용합니다. 이 함수는 Rust가 배열과 벡터를 처리하는 방식 때문에 복잡합니다.

`<const N: usize>` 표현식은 [제네릭(generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html)이라고 부릅니다. `N`는 반환되는 배열의 길이를 제어하는 매개변수입니다. 이 함수는 실제로 `str_to_array::<n>`로 호출되며, 여기서 `n`은 배열의 길이입니다.

반환 값은 `Option<[u8; N]>`이며, 이는 반환되는 배열이 [선택적(optional)](https://doc.rust-lang.org/std/option/)임을 의미합니다. 이는 실패할 수 있는 함수에 대한 Rust의 전형적인 패턴입니다.

예를 들어 `str_to_array::10("bad060a7")`를 호출하면 함수는 10개의 값으로 구성된 배열을 반환해야 하지만, 입력은 4바이트에 불과합니다. 함수는 실패해야 하며, `None`을 반환하여 이를 수행합니다. `str_to_array::4("bad060a7")`의 반환 값은 `Some<[0xba, 0xd0, 0x60, 0xa7]>`가 됩니다.

```rust
    // decode는 Result<Vec<u8>, _>를 반환합니다
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) 함수는 `Result<Vec<u8>, FromHexError>`를 반환합니다. [`Result`](https://doc.rust-lang.org/std/result/) 타입은 성공적인 결과(`Ok(value)`) 또는 오류(`Err(error)`)를 포함할 수 있습니다.

`.ok()` 메서드는 `Result`를 `Option`으로 변환하며, 그 값은 성공 시 `Ok()` 값이고 그렇지 않으면 `None`입니다. 마지막으로 [물음표 연산자](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)는 `Option`이 비어 있는 경우 현재 함수를 중단하고 `None`을 반환합니다. 그렇지 않으면 값을 언랩(unwrap)하여 반환합니다(이 경우 `vec`에 값을 할당하기 위해).

오류를 처리하는 방식이 이상하게 복잡해 보일 수 있지만, `Result`와 `Option`는 어떤 식으로든 모든 오류가 처리되도록 보장합니다.

```rust
    if vec.len() != N { return None; }
```

바이트 수가 올바르지 않으면 실패이며, `None`을 반환합니다.

```rust
    // try_into는 vec를 소비하여 [u8; N]을 생성하려고 시도합니다
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust에는 두 가지 배열 타입이 있습니다. [배열(Array)](https://doc.rust-lang.org/std/primitive.array.html)은 고정된 크기를 가집니다. [벡터(Vector)](https://doc.rust-lang.org/std/vec/index.html)는 크기가 늘어나거나 줄어들 수 있습니다. `hex::decode`는 벡터를 반환하지만, `eth_stealth_addresses` 라이브러리는 배열을 받기를 원합니다. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods)는 값을 다른 타입으로 변환합니다(예: 벡터를 배열로 변환).

```rust
    Some(array)
}
```

Rust는 함수의 끝에서 값을 반환할 때 [`return`](https://doc.rust-lang.org/std/keyword.return.html) 키워드를 사용할 필요가 없습니다.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

이 함수는 <em>V<sub>pub</sub></em>와 <em>K<sub>pub</sub></em>를 모두 포함하는 공개 메타 주소를 받습니다. 그리고 스텔스 주소, 게시할 공개키(*R<sub>pub</sub>*), 게시된 주소 중 어느 것이 앨리스의 것인지 식별하는 속도를 높여주는 1바이트 스캔 값을 반환합니다.

스캔 값은 공유 비밀(*S = GR<sub>priv</sub>V<sub>priv</sub>*)의 일부입니다. 이 값은 앨리스가 사용할 수 있으며, 이를 확인하는 것이 *f(K<sub>pub</sub>+G\*hash(S))*가 게시된 주소와 같은지 확인하는 것보다 훨씬 빠릅니다.

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

이 함수는 라이브러리의 [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html)를 사용하여 주소에서 출금할 개인 키(*R<sub>priv</sub>*)를 계산합니다. 이 계산에는 다음 값들이 필요합니다.

- 주소 (*Address=f(P<sub>pub</sub>)*)
- 빌이 생성한 공개키 (*R<sub>pub</sub>*)
- 조회 개인 키 (*V<sub>priv</sub>*)
- 지출 개인 키 (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html)는 WASM 코드가 초기화될 때 함수가 실행되도록 지정합니다.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

이 코드는 패닉 출력이 JavaScript 콘솔로 전송되도록 지정합니다. 실제 작동을 확인하려면 애플리케이션을 사용하고 빌에게 유효하지 않은 메타 주소를 제공해 보십시오(16진수 숫자 하나만 변경). JavaScript 콘솔에서 다음 오류를 볼 수 있습니다.

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

이어서 스택 트레이스가 나타납니다. 그런 다음 빌에게 유효한 메타 주소를 제공하고, 앨리스에게는 유효하지 않은 주소나 유효하지 않은 공개키를 제공해 보십시오. 다음 오류가 표시됩니다.

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

마찬가지로 스택 트레이스가 이어집니다.

#### 사용자 인터페이스 {#ui}

사용자 인터페이스는 [React](https://react.dev/)를 사용하여 작성되었으며 [Vite](https://vite.dev/)를 통해 제공됩니다. [이 튜토리얼](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)을 통해 이에 대해 배울 수 있습니다. 여기서는 블록체인이나 지갑과 직접 상호작용하지 않으므로 [Wagmi](https://wagmi.sh/)가 필요하지 않습니다.

사용자 인터페이스에서 유일하게 직관적이지 않은 부분은 WASM 연결입니다. 작동 방식은 다음과 같습니다.

**`vite.config.js`**

이 파일은 [Vite 구성](https://vite.dev/config/)을 포함합니다.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

두 개의 Vite 플러그인이 필요합니다: [react](https://www.npmjs.com/package/@vitejs/plugin-react)와 [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

이 파일은 애플리케이션의 메인 컴포넌트입니다. 해당 사용자들을 위한 사용자 인터페이스인 `Alice`와 `Bill` 두 컴포넌트를 포함하는 컨테이너입니다. WASM과 관련된 부분은 초기화 코드입니다.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

[`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/)를 사용하면 여기서 사용할 두 개의 파일이 생성됩니다. 실제 코드가 포함된 wasm 파일(여기서는 `src/rust-wasm/pkg/rust_wasm_bg.wasm`)과 이를 사용하기 위한 정의가 포함된 JavaScript 파일(여기서는 `src/rust_wasm/pkg/rust_wasm.js`)입니다. 해당 JavaScript 파일의 기본 내보내기(default export)는 WASM을 초기화하기 위해 실행해야 하는 코드입니다.

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

[`useEffect` 훅(hook)](https://react.dev/reference/react/useEffect)을 사용하면 상태 변수가 변경될 때 실행되는 함수를 지정할 수 있습니다. 여기서는 상태 변수 목록이 비어 있으므로(`[]`), 이 함수는 페이지가 로드될 때 한 번만 실행됩니다.

effect 함수는 즉시 반환되어야 합니다. WASM `init`(`.wasm` 파일을 로드해야 하므로 시간이 걸림)과 같은 비동기 코드를 사용하기 위해, 내부 [`async`](https://en.wikipedia.org/wiki/Async/await) 함수를 정의하고 `await` 없이 실행합니다.

**`Bill.jsx`**

빌을 위한 사용자 인터페이스입니다. 앨리스가 제공한 스텔스 메타 주소를 기반으로 주소를 생성하는 단일 작업이 있습니다.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

기본 내보내기 외에도 `wasm-pack`에 의해 생성된 JavaScript 코드는 WASM 코드의 모든 함수에 대한 함수를 내보냅니다.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM 함수를 호출하려면 `wasm-pack`가 생성한 JavaScript 파일에서 내보낸 함수를 호출하기만 하면 됩니다.

**`Alice.jsx`**

`Alice.jsx`의 코드는 앨리스에게 두 가지 작업이 있다는 점을 제외하면 유사합니다.

- 메타 주소 생성
- 빌이 게시한 주소에 대한 개인 키 가져오기

## 결론 {#conclusion}

스텔스 주소는 만병통치약이 아니며 [올바르게 사용](#go-wrong)되어야 합니다. 하지만 올바르게 사용된다면 퍼블릭 블록체인에서 프라이버시를 실현할 수 있습니다.

[제 작업물은 여기에서 더 확인하실 수 있습니다](https://cryptodocguy.pro/).