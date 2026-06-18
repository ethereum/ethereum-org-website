---
title: "네트워크 주소"
description: "네트워크 주소에 대한 소개입니다."
lang: ko
sidebarDepth: 2
---

[이더리움](/) 노드는 피어와 연결하기 위해 몇 가지 기본 정보로 자신을 식별해야 합니다. 잠재적인 피어가 이 정보를 해석할 수 있도록, 이 정보는 모든 이더리움 노드가 이해할 수 있는 세 가지 표준화된 형식 중 하나로 전달됩니다: multiaddr, enode, 또는 이더리움 노드 레코드(ENR). ENR은 현재 이더리움 네트워크 주소의 표준입니다.

## 전제 조건 {#prerequisites}

이 페이지를 이해하려면 이더리움의 [네트워킹 계층](/developers/docs/networking-layer/)에 대한 어느 정도의 이해가 필요합니다.

## Multiaddr {#multiaddr}

초기 이더리움 노드 주소 형식은 'multiaddr'('multi-addresses'의 약자)이었습니다. Multiaddr은 피어 투 피어 네트워크를 위해 설계된 범용 형식입니다. 주소는 키와 값이 슬래시로 구분된 키-값 쌍으로 표시됩니다. 예를 들어, TCP 포트 `33000`에서 수신 대기하는 IPv4 주소 `192.168.22.27`를 가진 노드의 multiaddr은 다음과 같습니다:

`/ip4/192.168.22.27/tcp/33000`

이더리움 노드의 경우, multiaddr에는 노드 ID(공개키의 해시)가 포함됩니다:

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

enode는 URL 주소 형식을 사용하여 이더리움 노드를 식별하는 방법입니다. 16진수 노드 ID는 URL의 사용자 이름 부분에 인코딩되며 @ 기호를 사용하여 호스트와 구분됩니다. 호스트 이름은 IP 주소로만 지정할 수 있으며 DNS 이름은 허용되지 않습니다. 호스트 이름 섹션의 포트는 TCP 수신 대기 포트입니다. TCP와 UDP(디스커버리) 포트가 다른 경우, UDP 포트는 쿼리 매개변수 "discport"로 지정됩니다.

다음 예시에서 노드 URL은 IP 주소 `10.3.58.6`, TCP 포트 `30303` 및 UDP 디스커버리 포트 `30301`를 가진 노드를 설명합니다.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## 이더리움 노드 레코드(ENR) {#enr}

이더리움 노드 레코드(ENR)는 이더리움의 네트워크 주소에 대한 표준화된 형식입니다. 이는 multiaddr 및 enode를 대체합니다. 노드 간에 더 많은 정보를 교환할 수 있게 해주기 때문에 특히 유용합니다. ENR에는 서명, 시퀀스 번호, 그리고 서명을 생성하고 검증하는 데 사용되는 신원 체계를 자세히 설명하는 필드가 포함되어 있습니다. 또한 ENR은 키-값 쌍으로 구성된 임의의 데이터로 채워질 수 있습니다. 이러한 키-값 쌍에는 노드의 IP 주소와 노드가 사용할 수 있는 하위 프로토콜에 대한 정보가 포함됩니다. 합의 클라이언트는 부트 노드를 식별하기 위해 [특정 ENR 구조](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)를 사용하며, 현재 이더리움 포크 및 증명 가십 서브넷(이는 증명이 함께 집계되는 특정 피어 집합에 노드를 연결합니다)에 대한 정보를 포함하는 `eth2` 필드도 포함합니다.

## 더 읽어보기 {#further-reading}

- [EIP-778: 이더리움 노드 레코드(ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [libp2p: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)