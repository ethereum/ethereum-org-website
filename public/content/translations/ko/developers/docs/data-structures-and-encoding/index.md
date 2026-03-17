---
title: "데이터 구조 및 인코딩"
description: "기본적인 이더리움 데이터 구조에 대한 개요입니다."
lang: ko
sidebarDepth: 2
---

이더리움은 대량의 데이터를 생성, 저장 및 전송합니다. 누구나 비교적 평범한 소비자 수준의 하드웨어에서 [노드를 실행](/run-a-node/)할 수 있도록 이 데이터는 표준화되고 메모리 효율적인 방식으로 형식화되어야 합니다. 이를 위해 이더리움 스택에서는 몇 가지 특정 데이터 구조가 사용됩니다.

## 필수 구성 요소 {#prerequisites}

이더리움의 기본 사항과 [클라이언트 소프트웨어](/developers/docs/nodes-and-clients/)를 이해해야 합니다. 네트워킹 레이어와 [이더리움 백서](/whitepaper/)에 익숙해지는 것을 권장합니다.

## 데이터 구조 {#data-structures}

### 패트리샤 머클 트라이 {#patricia-merkle-tries}

패트리샤 머클 트라이는 키-값 쌍을 결정론적이고 암호학적으로 인증된 트라이로 인코딩하는 구조입니다. 이는 이더리움의 실행 레이어 전반에 걸쳐 광범위하게 사용됩니다.

[패트리샤 머클 트라이에 대해 더 알아보기](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 재귀 길이 접두어 {#recursive-length-prefix}

재귀 길이 접두어(RLP)는 이더리움의 실행 레이어 전반에 걸쳐 광범위하게 사용되는 직렬화 방법입니다.

[RLP에 대해 더 알아보기](/developers/docs/data-structures-and-encoding/rlp)

### 단순 직렬화 {#simple-serialize}

단순 직렬화(SSZ)는 머클화와의 호환성으로 인해 이더리움의 합의 레이어에서 주로 사용되는 직렬화 형식입니다.

[SSZ에 대해 더 알아보기](/developers/docs/data-structures-and-encoding/ssz)
