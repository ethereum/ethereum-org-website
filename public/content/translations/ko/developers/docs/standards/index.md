---
title: 이더리움 개발 표준
description: EIP, ERC-20, ERC-721과 같은 토큰 표준, 개발 컨벤션을 포함한 이더리움 표준에 대해 알아보세요.
lang: ko
incomplete: true
---

## 표준 개요 {#standards-overview}

이더리움 커뮤니티는 [이더리움 클라이언트](/developers/docs/nodes-and-clients/) 및 지갑과 같은 프로젝트가 여러 구현에서 상호 운용성을 유지하고 스마트 계약과 탈중앙화앱이 구성 가능하도록 유지하는 데 도움이 되는 많은 표준을 채택했습니다.

일반적으로 표준은 [이더리움 개선 제안](/eips/)(EIP)으로 도입되며, 이는 [표준 절차](https://eips.ethereum.org/EIPS/eip-1)를 통해 커뮤니티 구성원들이 논의합니다.

- [EIP 소개](/eips/)
- [EIP 목록](https://eips.ethereum.org/)
- [EIP GitHub 리포지토리](https://github.com/ethereum/EIPs)
- [EIP 토론 게시판](https://ethereum-magicians.org/c/eips)
- [이더리움 거버넌스 소개](/governance/)
- [이더리움 거버넌스 개요](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019년 3월 31일 - Boris Mann_
- [이더리움 프로토콜 개발 거버넌스 및 네트워크 업그레이드 조정](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020년 3월 23일 - Hudson Jameson_
- [모든 이더리움 코어 개발자 회의 재생목록](https://www.youtube.com/@EthereumProtocol) _(YouTube 재생목록)_

## 표준의 유형 {#types-of-standards}

EIP에는 3가지 유형이 있습니다:

- 표준 트랙: 대부분 또는 모든 이더리움 구현에 영향을 미치는 변경 사항을 설명합니다
- [메타 트랙](https://eips.ethereum.org/meta): 이더리움 관련 프로세스를 설명하거나 프로세스 변경을 제안합니다
- [정보 트랙](https://eips.ethereum.org/informational): 이더리움 설계 문제를 설명하거나 이더리움 커뮤니티에 일반적인 가이드라인이나 정보를 제공합니다

또한 표준 트랙은 4가지 카테고리로 세분화됩니다:

- [코어](https://eips.ethereum.org/core): 합의 포크가 필요한 개선 사항
- [네트워킹](https://eips.ethereum.org/networking): devp2p 및 라이트 이더리움 하위 프로토콜 관련 개선 사항, 그리고 위스퍼 및 스웜의 네트워크 프로토콜 사양에 대한 제안된 개선 사항.
- [인터페이스](https://eips.ethereum.org/interface): 클라이언트 API/RPC 사양 및 표준 관련 개선 사항, 그리고 메서드 이름 및 계약 ABI와 같은 특정 언어 수준 표준.
- [ERC](https://eips.ethereum.org/erc): 애플리케이션 수준의 표준 및 관례

이러한 다양한 유형 및 카테고리에 대한 자세한 정보는 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)에서 확인할 수 있습니다

### 토큰 표준 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 투표 토큰, 스테이킹 토큰 또는 가상 화폐와 같은 대체 가능한(상호 교환 가능한) 토큰을 위한 표준 인터페이스입니다.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - 토큰이 이더와 동일하게 작동하도록 하고 수신자 측에서 토큰 전송 처리를 지원하는 대체 가능한 토큰 표준입니다.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - 단일 트랜잭션에서 수신자 계약에 대한 콜백 실행을 지원하는 ERC-20 토큰의 확장 인터페이스입니다.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 예술품이나 노래의 증서와 같은 대체 불가능한 토큰을 위한 표준 인터페이스입니다.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - 연속적인 토큰 식별자를 사용하여 하나 또는 여러 개의 대체 불가능한 토큰을 생성/전송할 때 방출되는 표준화된 이벤트입니다.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 소비자 역할을 위한 인터페이스 확장입니다.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721 토큰에 제한된 권한을 가진 시간 제한 역할을 추가합니다.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(권장되지 않음)** ERC-20을 개선한 토큰 표준입니다.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 대체 가능한 자산과 대체 불가능한 자산을 모두 포함할 수 있는 토큰 표준입니다.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 수익률 생성 볼트의 기술적 파라미터를 최적화하고 통합하도록 설계된 토큰화된 볼트 표준입니다.

[토큰 표준](/developers/docs/standards/tokens/)에 대해 더 자세히 알아보세요.

## 더 읽어보기 {#further-reading}

- [이더리움 개선 제안(EIP)](/eips/)

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_
