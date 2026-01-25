---
title: 오프라인 데이터 무결성을 위한 머클 증명
description: 대부분 오프체인에 저장되는 데이터의 온체인 데이터 무결성 보장
author: Ori Pomerantz
tags: [ "저장 공간" ]
skill: advanced
lang: ko
published: 2021-12-30
---

## 소개 {#introduction}

이상적으로는 모든 것을 수천 대의 컴퓨터에 저장되고 가용성이 매우 높으며(데이터 검열 불가) 무결성을(권한 없는 방식으로 데이터 수정 불가) 갖춘 이더리움 저장 공간에 저장하고 싶겠지만, 32바이트 워드를 저장하는 데는 일반적으로 20,000 가스가 소요됩니다. 이 글을 쓰는 시점에서 그 비용은 6.60달러에 해당합니다. 바이트당 21센트의 비용은 많은 용도로 사용하기에는 너무 비쌉니다.

이 문제를 해결하기 위해 이더리움 생태계는 [탈중앙화된 방식으로 데이터를 저장하는 다양한 대체 방법](/developers/docs/storage/)을 개발했습니다. 일반적으로 가용성과 가격 간의 절충이 필요합니다. 하지만 무결성은 일반적으로 보장됩니다.

이 글에서는 [머클 증명](https://computersciencewiki.org/index.php/Merkle_proof)을 사용하여 블록체인에 데이터를 저장하지 않고 데이터 무결성을 보장하는 **방법**을 배웁니다.

## 어떻게 작동하나요? {#how-does-it-work}

이론적으로 데이터의 해시를 온체인에 저장하고, 데이터가 필요한 트랜잭션에 모든 데이터를 보낼 수 있습니다. 하지만 이 방법 역시 비용이 너무 많이 듭니다. 트랜잭션에 1바이트의 데이터를 전송하는 데는 약 16가스가 소모되며, 이는 현재 약 0.5센트, 킬로바이트당 약 5달러에 해당합니다. 메가바이트당 5,000달러의 비용은 데이터를 해싱하는 추가 비용을 고려하지 않더라도 여전히 많은 용도로 사용하기에 너무 비쌉니다.

해결책은 데이터의 여러 하위 집합을 반복적으로 해시하여, 보낼 필요가 없는 데이터에 대해서는 해시만 보내는 것입니다. 이는 각 노드가 그 아래 노드들의 해시인 트리 데이터 구조인 머클 트리를 사용하여 수행합니다.

![머클 트리](tree.png)

루트 해시는 온체인에 저장해야 하는 유일한 부분입니다. 특정 값을 증명하기 위해, 그 값과 결합하여 루트를 얻는 데 필요한 모든 해시를 제공해야 합니다. 예를 들어, `C`를 증명하려면 `D`, `H(A-B)`, `H(E-H)`를 제공합니다.

![C 값의 증명](proof-c.png)

## 구현 {#implementation}

[샘플 코드는 여기에서 제공됩니다](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### 오프체인 코드 {#offchain-code}

이 글에서는 오프체인 계산에 JavaScript를 사용합니다. 대부분의 탈중앙화 애플리케이션은 JavaScript로 된 오프체인 구성 요소를 가지고 있습니다.

#### 머클 루트 생성 {#creating-the-merkle-root}

먼저 머클 루트를 체인에 제공해야 합니다.

```javascript
const ethers = require("ethers")
```

[ethers 패키지의 해시 함수를 사용합니다](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// 무결성을 검증해야 하는 원시 데이터입니다. 처음 두 바이트는
// 사용자 식별자이고, 마지막 두 바이트는 현재 사용자가 소유한 토큰의
// 양입니다.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

각 항목을 단일 256비트 정수로 인코딩하면 예를 들어 JSON을 사용하는 것보다 코드 가독성이 떨어집니다. 하지만 이는 컨트랙트에서 데이터를 검색하기 위한 처리가 훨씬 적어짐을 의미하므로 가스 비용이 훨씬 저렴해집니다. [온체인에서 JSON을 읽을 수 있지만](https://github.com/chrisdotn/jsmnSol) 피할 수 있다면 좋은 생각은 아닙니다.

```javascript
// BigInts로서의 해시 값 배열
const hashArray = dataArray
```

이 경우 데이터는 처음부터 256비트 값이므로 처리가 필요하지 않습니다. 문자열과 같이 더 복잡한 데이터 구조를 사용하는 경우 해시 배열을 얻으려면 먼저 데이터를 해시해야 합니다. 이는 또한 사용자가 다른 사용자의 정보를 아는 것을 신경 쓰지 않기 때문입니다. 그렇지 않았다면 사용자 1이 사용자 0의 값을 알지 못하도록, 사용자 2가 사용자 3의 값을 알지 못하도록 하는 등 해시를 해야 했을 것입니다.

```javascript
// 해시 함수가 예상하는 문자열과
// 다른 모든 곳에서 사용하는 BigInt 사이를 변환합니다.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ethers 해시 함수는 `0x60A7`과 같은 16진수 숫자가 포함된 JavaScript 문자열을 예상하며 동일한 구조의 다른 문자열로 응답합니다. 하지만 나머지 코드에서는 `BigInt`를 사용하는 것이 더 쉬우므로 16진수 문자열로 변환했다가 다시 되돌립니다.

```javascript
// 순서가 바뀌어도 상관없도록 쌍의 대칭 해시입니다.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

이 함수는 대칭적입니다(a와 b의 [xor](https://en.wikipedia.org/wiki/Exclusive_or) 해시). 이는 머클 증명을 확인할 때 증명의 값을 계산된 값의 앞이나 뒤에 놓을지 걱정할 필요가 없다는 것을 의미합니다. 머클 증명 확인은 온체인에서 수행되므로 거기서 해야 할 일이 적을수록 좋습니다.

경고:
암호학은 보기보다 어렵습니다.
이 글의 초기 버전에는 `hash(a^b)` 해시 함수가 있었습니다.
이는 `a`와 `b`의 정당한 값을 알고 있다면 `b' = a^b^a'`를 사용하여 원하는 `a'` 값을 증명할 수 있다는 것을 의미했기 때문에 **나쁜** 생각이었습니다.
이 함수를 사용하면 `hash(a') ^ hash(b')`가 알려진 값(루트로 가는 다음 분기)과 같도록 `b'`를 계산해야 하는데, 이는 훨씬 더 어렵습니다.

```javascript
// 특정 분기가 비어 있고 값이 없음을
// 나타내는 값
const empty = 0n
```

값의 개수가 2의 정수 거듭제곱이 아닐 때 빈 분기를 처리해야 합니다. 이 프로그램은 0을 자리 표시자로 사용하여 이를 처리합니다.

![분기가 누락된 머클 트리](merkle-empty-hash.png)

```javascript
// 각 쌍을 순서대로 해시하여 해시 배열의 트리에서 한 수준 위를
// 계산합니다.
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // 입력을 덮어쓰는 것을 방지하기 위해 // 필요한 경우 빈 값을 추가합니다(모든 리프가 // 쌍을 이루어야 함)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

이 함수는 현재 레이어의 값 쌍을 해시하여 머클 트리에서 한 수준을 "올라갑니다". 이는 가장 효율적인 구현이 아닙니다. 입력을 복사하는 대신 루프에서 적절할 때 `hashEmpty`를 추가할 수 있었지만 이 코드는 가독성을 위해 최적화되었습니다.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // 값이 하나만 남을 때까지 트리를 올라갑니다. 그것이 // 루트입니다. // // 레이어에 홀수 개의 항목이 있으면 // oneLevelUp의 코드가 빈 값을 추가하므로 예를 들어, // 10개의 리프가 있으면 두 번째 레이어에 5개의 분기, 세 번째에 3개, // 네 번째에 2개의 분기가 있고 루트가 다섯 번째가 됩니다.

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

루트를 얻으려면 값이 하나만 남을 때까지 올라갑니다.

#### 머클 증명 생성 {#creating-a-merkle-proof}

머클 증명은 증명되는 값과 함께 해시하여 머클 루트를 다시 얻는 값입니다. 증명할 값은 종종 다른 데이터에서 사용할 수 있으므로 코드의 일부가 아닌 별도로 제공하는 것을 선호합니다.

```javascript
// 머클 증명은 함께 해시할 항목 목록의
// 값으로 구성됩니다. 대칭 해시 함수를 사용하므로 증명을
// 확인하기 위해 항목의 위치가 필요하지 않으며 생성할 때만 필요합니다.
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // 맨 위에 도달할 때까지
    while (currentLayer.length > 1) {
        // 홀수 길이 레이어 없음
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // currentN이 홀수이면 이전 값을 증명에 추가합니다.
            ? currentLayer[currentN-1]
               // 짝수이면 다음 값을 추가합니다.
            : currentLayer[currentN+1])

```

`(v[0],v[1])`, `(v[2],v[3])` 등을 해시합니다. 따라서 짝수 값에는 다음 값이 필요하고 홀수 값에는 이전 값이 필요합니다.

```javascript
        // 다음 상위 레이어로 이동
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### 온체인 코드 {#onchain-code}

마지막으로 증명을 확인하는 코드가 있습니다. 온체인 코드는 [Solidity](https://docs.soliditylang.org/en/v0.8.11/)로 작성되었습니다. 가스가 상대적으로 비싸기 때문에 여기서는 최적화가 훨씬 더 중요합니다.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

저는 [Hardhat 개발 환경](https://hardhat.org/)을 사용하여 이것을 작성했으며, 이를 통해 개발 중에 [Solidity에서 콘솔 출력](https://hardhat.org/docs/cookbook/debug-logs)을 할 수 있습니다.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // 매우 안전하지 않으므로, 프로덕션 코드에서 이 함수에 대한
    // 접근은 소유자에게로
    // 엄격히 제한되어야 합니다.
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

머클 루트를 위한 설정 및 가져오기 함수입니다. 모든 사람이 머클 루트를 업데이트할 수 있도록 하는 것은 프로덕션 시스템에서 _매우 나쁜 생각_입니다. 여기서는 샘플 코드의 단순성을 위해 그렇게 합니다. **데이터 무결성이 실제로 중요한 시스템에서는 그렇게 하지 마세요**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

이 함수는 쌍 해시를 생성합니다. 이는 `hash` 및 `pairHash`에 대한 JavaScript 코드의 Solidity 번역일 뿐입니다.

**참고:** 이것은 가독성을 위한 최적화의 또 다른 경우입니다. [함수 정의](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)에 따르면 데이터를 [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) 값으로 저장하고 변환을 피할 수 있습니다.

```solidity
    // 머클 증명 확인
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

수학적 표기법에서 머클 증명 확인은 다음과 같습니다: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))\`. 이 코드는 이를 구현합니다.

## 머클 증명과 롤업은 잘 맞지 않습니다 {#merkle-proofs-and-rollups}

머클 증명은 [롤업](/developers/docs/scaling/#rollups)과 잘 작동하지 않습니다. 그 이유는 롤업이 모든 트랜잭션 데이터를 L1에 기록하지만 L2에서 처리하기 때문입니다. 트랜잭션으로 머클 증명을 보내는 비용은 레이어당 평균 638 가스입니다(현재 호출 데이터의 바이트는 0이 아니면 16 가스, 0이면 4 가스가 소요됩니다). 1024 단어의 데이터가 있는 경우 머클 증명에는 10개의 레이어가 필요하며 총 6380 가스가 소요됩니다.

예를 들어 [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)을 보면, L1 가스 작성 비용은 약 100gwei이고 L2 가스 비용은 0.001gwei입니다(이는 정상 가격이며 혼잡에 따라 상승할 수 있습니다). 따라서 1 L1 가스 비용으로 L2 처리에서 10만 가스를 사용할 수 있습니다. 저장 공간을 덮어쓰지 않는다고 가정하면, 이는 1 L1 가스 가격으로 L2의 저장 공간에 약 5개의 단어를 쓸 수 있다는 의미입니다. 단일 머클 증명의 경우, (처음부터 트랜잭션으로 제공되는 것이 아니라 온체인에서 계산될 수 있다고 가정하면) 1024 단어 전체를 저장 공간에 쓸 수 있으며 그래도 대부분의 가스가 남습니다.

## 결론 {#conclusion}

실생활에서 직접 머클 트리를 구현할 일은 없을 수도 있습니다. 사용할 수 있는 잘 알려져 있고 감사된 라이브러리가 있으며, 일반적으로 암호화 기본 요소를 직접 구현하지 않는 것이 가장 좋습니다. 하지만 이제 머클 증명을 더 잘 이해하고 언제 사용할 가치가 있는지 결정할 수 있기를 바랍니다.

머클 증명은 _무결성_은 보존하지만 _가용성_은 보존하지 않는다는 점에 유의하세요. 다른 사람이 내 자산을 가져갈 수 없다는 것을 아는 것은 데이터 저장 공간이 접근을 허용하지 않기로 결정하고 자산에 접근하기 위해 머클 트리를 구성할 수도 없다면 작은 위안에 불과합니다. 따라서 머클 트리는 IPFS와 같은 일종의 탈중앙화 저장 공간과 함께 사용하는 것이 가장 좋습니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
