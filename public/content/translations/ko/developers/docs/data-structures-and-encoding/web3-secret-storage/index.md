---
title: "Web3 비밀 저장소 정의"
description: "웹3 비밀 저장 공간에 대한 공식적인 정의"
lang: ko
sidebarDepth: 2
---

앱이 이더리움에서 작동하도록 하려면 web3.js 라이브러리에서 제공하는 웹3 객체를 사용할 수 있습니다. 내부적으로 RPC 호출을 통해 로컬 노드와 통신합니다. [web3](https://github.com/ethereum/web3.js/)는 RPC 레이어를 노출하는 모든 이더리움 노드와 함께 작동합니다.

`web3`는 `eth` 객체(web3.eth)를 포함합니다.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** result
 *               [ 'web3', 3 ]   웹3(v3) 키 파일
 *  [ 'ethersale', undefined ]   Ethersale 키 파일
 *                        null     잘못된 키 파일
 */
```

이 문서는 웹3 비밀 저장 공간 정의의 **버전 3**에 대한 내용입니다.

## 정의 {#definition}

파일의 실제 인코딩 및 디코딩은 버전 1과 거의 동일하지만, 암호화 알고리즘이 더 이상 AES-128-CBC로 고정되지 않는다는 점이 다릅니다(현재는 AES-128-CTR이 최소 요구 사항임). 대부분의 의미/알고리즘은 버전 1과 유사하지만 `mac`은 예외입니다. `mac`은 파생된 키의 왼쪽에서 두 번째 16바이트와 전체 `ciphertext`를 연결한 것의 SHA3(keccak-256)으로 지정됩니다.

비밀 키 파일은 `~/.web3/keystore`(유닉스 계열 시스템의 경우) 및 `~/AppData/Web3/keystore`(윈도우의 경우)에 직접 저장됩니다. 이름은 무엇이든 될 수 있지만, `<uuid>.json`이 좋은 규칙입니다. 여기서 `<uuid>`는 비밀 키에 부여된 128비트 UUID(비밀 키 주소에 대한 개인정보 보호 프록시)입니다.

이러한 모든 파일에는 연결된 비밀번호가 있습니다. 주어진 `.json` 파일의 비밀 키를 파생시키려면 먼저 파일의 암호화 키를 파생시켜야 합니다. 이 작업은 파일의 비밀번호를 가져와 `kdf` 키에 설명된 대로 키 파생 함수를 통해 전달하여 수행됩니다. KDF 함수에 대한 KDF 종속 정적 및 동적 파라미터는 `kdfparams` 키에 설명되어 있습니다.

최소 준수 구현은 모두 PBKDF2를 지원해야 하며, 다음과 같이 표시됩니다.

- `kdf`: `pbkdf2`

PBKDF2의 경우, kdfparams는 다음을 포함합니다.

- `prf`: `hmac-sha256`이어야 합니다(향후 확장될 수 있음).
- `c`: 반복 횟수,
- `salt`: PBKDF에 전달된 솔트,
- `dklen`: 파생된 키의 길이. 32 이상이어야 합니다.

파일의 키가 파생되면 MAC 파생을 통해 확인해야 합니다. MAC은 파생된 키의 왼쪽에서 두 번째 16바이트와 `ciphertext` 키의 내용을 연결하여 형성된 바이트 배열의 SHA3(keccak-256) 해시로 계산되어야 합니다. 즉,

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(여기서 `++`는 연결 연산자입니다)

이 값은 `mac` 키의 내용과 비교해야 합니다. 만약 값이 다르면 다른 비밀번호를 요청하거나 작업을 취소해야 합니다.

파일의 키가 확인된 후, `cipher` 키로 지정되고 `cipherparams` 키를 통해 매개변수화된 대칭 암호화 알고리즘을 사용하여 암호문(`ciphertext` 키)을 복호화할 수 있습니다. 파생된 키 크기와 알고리즘의 키 크기가 일치하지 않는 경우, 파생된 키의 0으로 채워진 가장 오른쪽 바이트가 알고리즘의 키로 사용되어야 합니다.

모든 최소 준수 구현은 AES-128-CTR 알고리즘을 지원해야 하며, 다음과 같이 표시됩니다.

- `cipher: aes-128-ctr`

이 암호는 cipherparams 키에 대한 키로 지정된 다음 매개변수를 사용합니다.

- `iv`: 암호에 대한 128비트 초기화 벡터.

암호의 키는 파생된 키의 가장 왼쪽 16바이트입니다(예: `DK[0..15]`)

비밀 키의 생성/암호화는 기본적으로 이러한 지침의 역순이어야 합니다. `uuid`, `salt` 및 `iv`가 실제로 무작위인지 확인하십시오.

버전의 "하드" 식별자 역할을 해야 하는 `version` 필드 외에도, 구현은 형식에 대한 더 작고 호환성을 깨뜨리지 않는 변경 사항을 추적하기 위해 `minorversion`을 사용할 수도 있습니다.

## 테스트 벡터 {#test-vectors}

세부 정보:

- `주소`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `비밀번호`: `testpassword`
- `비밀`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

`AES-128-CTR` 및 `PBKDF2-SHA-256`을 사용한 테스트 벡터:

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`의 파일 내용:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**중간값**:

`파생된 키`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC 본문`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`암호 키`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

AES-128-CTR 및 Scrypt를 사용한 테스트 벡터:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**중간값**:

`파생된 키`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC 본문`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`암호 키`: `7446f59ecc301d2d79bc3302650d8a5c`

## 버전 1의 변경 사항 {#alterations-from-v2}

이 버전은 [여기](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)에 게시된 버전 1의 몇 가지 불일치를 수정합니다. 간단히 말해 다음과 같습니다.

- 대소문자 사용이 부적절하고 일관성이 없습니다(scrypt는 소문자, Kdf는 혼합 대/소문자, MAC은 대문자).
- 주소는 불필요하며 개인 정보를 침해합니다.
- `Salt`는 본질적으로 키 파생 함수의 매개변수이므로 일반적인 암호화가 아닌 해당 함수와 연결되어야 합니다.
- _SaltLen_은 불필요합니다(Salt에서 파생하면 됨).
- 키 파생 함수는 주어지지만, 암호화 알고리즘은 하드코딩되어 있습니다.
- `Version`은 본질적으로 숫자이지만 문자열입니다(문자열로 구조화된 버전 관리가 가능하지만, 거의 변경되지 않는 구성 파일 형식의 범위를 벗어난 것으로 간주될 수 있습니다).
- `KDF`와 `cipher`는 개념적으로 형제 개념이지만 다르게 구성되어 있습니다.
- `MAC`은 공백에 영향을 받지 않는 데이터 조각을 통해 계산됩니다(!).

이전에 링크된 페이지의 예시와 기능적으로 동일한 다음 파일을 제공하기 위해 형식이 변경되었습니다.

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## 버전 2의 변경 사항 {#alterations-from-v2}

버전 2는 여러 버그가 있는 초기 C++ 구현이었습니다. 모든 필수 요소는 그대로 유지됩니다.
