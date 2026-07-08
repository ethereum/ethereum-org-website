---
title: "데이터 구조 및 인코딩"
description: "기본적인 이더리움 데이터 구조에 대한 개요입니다."
lang: ko
sidebarDepth: 2
---

이더리움은 대량의 데이터를 생성, 저장 및 전송합니다. 누구나 비교적 평범한 소비자용 하드웨어에서 [노드를 실행](/run-a-node/)할 수 있도록, 이 데이터는 표준화되고 메모리 효율적인 방식으로 포맷되어야 합니다. 이를 달성하기 위해 이더리움 스택에서는 몇 가지 특정한 데이터 구조가 사용됩니다.

## 전제 조건 {#prerequisites}

이더리움의 기초와 [클라이언트 소프트웨어](/developers/docs/nodes-and-clients/)를 이해하고 있어야 합니다. 네트워킹 레이어와 [이더리움 백서](/whitepaper/)에 익숙해지는 것을 권장합니다.

## 데이터 구조 {#data-structures}

### 패트리샤 머클 트라이 (Patricia Merkle Tries) {#patricia-merkle-tries}

패트리샤 머클 트라이(Patricia Merkle Tries)는 키-값 쌍을 결정론적이고 암호학적으로 인증된 트라이(trie)로 인코딩하는 구조입니다. 이 구조는 이더리움의 실행 계층 전반에 걸쳐 광범위하게 사용됩니다.

[패트리샤 머클 트라이에 대해 더 알아보기](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### RLP (Recursive Length Prefix) {#recursive-length-prefix}

RLP(Recursive Length Prefix)는 이더리움의 실행 계층 전반에 걸쳐 광범위하게 사용되는 직렬화 방식입니다.

[RLP에 대해 더 알아보기](/developers/docs/data-structures-and-encoding/rlp)

### SSZ (Simple Serialize) {#simple-serialize}

SSZ(Simple Serialize)는 머클화(merklelization)와의 호환성 덕분에 이더리움의 합의 레이어에서 주로 사용되는 직렬화 형식입니다.

[SSZ에 대해 더 알아보기](/developers/docs/data-structures-and-encoding/ssz)