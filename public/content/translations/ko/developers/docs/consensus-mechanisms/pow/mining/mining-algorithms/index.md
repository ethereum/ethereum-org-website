---
title: 채굴 알고리즘
description: 이더리움 채굴에 사용되는 알고리즘에 대한 자세한 살펴보기입니다.
lang: ko
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
작업증명(PoW)은 더 이상 이더리움의 합의 메커니즘의 기반이 아니며, 이는 채굴이 중단되었음을 의미합니다. 대신, 이더리움은 ETH를 스테이킹하는 검증자들에 의해 보호됩니다. 오늘부터 ETH 스테이킹을 시작할 수 있습니다. <a href='/roadmap/merge/'>머지</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>지분 증명 (PoS)</a>, 그리고 <a href='/staking/'>스테이킹</a>에 대해 자세히 알아보세요. 이 페이지는 역사적 참고용으로만 제공됩니다.
</AlertDescription>
</AlertContent>
</Alert>

이더리움 채굴은 이더해시(Ethash)라는 알고리즘을 사용했습니다. 이 알고리즘의 기본 아이디어는 채굴자가 무차별 대입 연산(brute force computation)을 사용하여 논스(nonce) 입력값을 찾아내어, 그 결과로 생성된 해시가 계산된 난이도에 의해 결정된 임계값보다 작아지도록 하는 것입니다. 이 난이도 수준은 동적으로 조정될 수 있어, 블록 생성이 일정한 간격으로 이루어지도록 합니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [작업증명 (PoW) 합의](/developers/docs/consensus-mechanisms/pow)와 [채굴](/developers/docs/consensus-mechanisms/pow/mining)에 대해 읽어보시기를 권장합니다.

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto는 이더해시가 대체하기 전 이더리움 채굴을 위한 선행 연구 알고리즘이었습니다. 이는 Dagger와 Hashimoto라는 두 가지 다른 알고리즘의 결합체였습니다. 이는 연구용 구현체로만 존재했으며, 이더리움 메인넷이 출시될 무렵에는 이더해시로 대체되었습니다.

[Dagger](http://www.hashcash.org/papers/dagger.html)는 [방향성 비순환 그래프(Directed Acyclic Graph, DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph)의 생성을 포함하며, 이 그래프의 무작위 조각들이 함께 해시됩니다. 핵심 원리는 각 논스가 전체 대규모 데이터 트리의 작은 부분만을 필요로 한다는 것입니다. 각 논스에 대해 하위 트리를 다시 계산하는 것은 채굴에 있어 엄청난 비용이 들기 때문에 트리를 저장해야 하지만, 단일 논스에 대한 검증용으로는 괜찮습니다. Dagger는 Scrypt와 같은 기존 알고리즘의 대안으로 설계되었습니다. Scrypt는 메모리 집약적(memory-hard)이지만, 메모리 집약도가 진정으로 안전한 수준까지 증가할 경우 검증하기 어렵다는 단점이 있습니다. 그러나 Dagger는 공유 메모리 하드웨어 가속에 취약했기 때문에 다른 연구 방향을 위해 폐기되었습니다.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf)는 I/O 바운드(즉, 메모리 읽기가 채굴 과정의 제한 요소가 됨) 특성을 통해 ASIC 저항성을 추가하는 알고리즘입니다. 이 이론은 연산 능력보다 RAM이 더 쉽게 확보될 수 있다는 점에 기반합니다. 이미 수십억 달러 규모의 연구가 다양한 사용 사례에 맞게 RAM을 최적화하는 데 투자되었으며, 이러한 사례들은 종종 무작위에 가까운 접근 패턴(따라서 "랜덤 액세스 메모리(random access memory)"라고 함)을 포함합니다. 결과적으로 기존 RAM은 알고리즘을 평가하는 데 있어 최적에 상당히 가까울 가능성이 높습니다. Hashimoto는 블록체인을 데이터 소스로 사용하여 위의 (1)과 (3)을 동시에 충족합니다.

Dagger-Hashimoto는 Dagger와 Hashimoto 알고리즘의 수정된 버전을 사용했습니다. Dagger Hashimoto와 Hashimoto의 차이점은, 블록체인을 데이터 소스로 사용하는 대신 Dagger Hashimoto는 N개의 블록마다 블록 데이터를 기반으로 업데이트되는 맞춤 생성 데이터 세트를 사용한다는 것입니다. 이 데이터 세트는 Dagger 알고리즘을 사용하여 생성되며, 경량 클라이언트 검증 알고리즘을 위해 모든 논스에 특화된 하위 집합을 효율적으로 계산할 수 있게 해줍니다. Dagger Hashimoto와 Dagger의 차이점은, 원본 Dagger와 달리 블록을 쿼리하는 데 사용되는 데이터 세트가 반영구적이며 가끔씩(예: 일주일에 한 번)만 업데이트된다는 것입니다. 이는 데이터 세트를 생성하는 데 드는 노력의 비중이 0에 가깝다는 것을 의미하므로, 공유 메모리 속도 향상에 대한 Sergio Lerner의 주장은 무시할 수 있는 수준이 됩니다.

[Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto)에 대해 자세히 알아보기.

## 이더해시 {#ethash}

이더해시는 현재는 폐기된 작업증명(PoW) 아키텍처 하에서 실제 이더리움 메인넷에 사용되었던 채굴 알고리즘이었습니다. 이더해시는 알고리즘이 크게 업데이트된 후 특정 버전의 Dagger-Hashimoto에 부여된 새로운 이름이었으며, 이전 버전의 기본 원칙은 여전히 계승했습니다. 이더리움 메인넷은 오직 이더해시만을 사용했습니다. Dagger Hashimoto는 이더리움 메인넷에서 채굴이 시작되기 전에 대체된 채굴 알고리즘의 R&D 버전이었습니다.

[이더해시에 대해 자세히 알아보기](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## 더 읽어보기 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_