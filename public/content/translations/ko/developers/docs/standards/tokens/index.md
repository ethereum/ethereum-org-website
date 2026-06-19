---
title: "토큰 표준"
description: "대체 가능 및 대체 불가능 토큰을 위한 ERC-20, ERC-721, ERC-1155를 포함한 이더리움 토큰 표준을 살펴봅니다."
lang: ko
incomplete: true
---

## 소개 {#introduction}

많은 [이더리움](/) 개발 표준은 토큰 인터페이스에 중점을 둡니다. 이러한 표준은 스마트 컨트랙트가 조합 가능한 상태를 유지하도록 도와주어, 새로운 프로젝트가 토큰을 발행할 때 기존의 탈중앙화된 거래소 및 애플리케이션과 호환성을 유지할 수 있게 합니다.

토큰 표준은 이더리움 생태계 전반에서 토큰이 어떻게 작동하고 상호작용하는지 정의합니다. 개발자가 불필요한 중복 작업 없이 더 쉽게 개발할 수 있도록 하며, 토큰이 지갑, 거래소, DeFi 플랫폼과 원활하게 작동하도록 보장합니다. 게임, 거버넌스 또는 기타 사용 사례에 관계없이 이러한 표준은 일관성을 제공하고 이더리움을 더욱 상호 연결되게 만듭니다.

## 전제 조건 {#prerequisites}

- [이더리움 개발 표준](/developers/docs/standards/)
- [스마트 컨트랙트](/developers/docs/smart-contracts/)

## 토큰 표준 {#token-standards}

다음은 이더리움에서 가장 인기 있는 토큰 표준 중 일부입니다:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 투표 토큰, 스테이킹 토큰 또는 가상 통화와 같은 대체 가능(상호 교환 가능) 토큰을 위한 표준 인터페이스입니다.

### NFT 표준 {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 예술 작품이나 노래의 소유권 증명서와 같은 대체 불가능 토큰을 위한 표준 인터페이스입니다.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155는 더 효율적인 거래와 트랜잭션 묶음을 가능하게 하여 비용을 절감합니다. 이 토큰 표준을 사용하면 유틸리티 토큰($BNB 또는 $BAT 등)과 CryptoPunks와 같은 대체 불가능 토큰을 모두 생성할 수 있습니다.

[ERC](https://eips.ethereum.org/erc) 제안의 전체 목록입니다.

## 더 읽어보기 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 튜토리얼 {#related-tutorials}

- [토큰 통합 체크리스트](/developers/tutorials/token-integration-checklist/) _– 토큰과 상호작용할 때 고려해야 할 사항들의 체크리스트입니다._
- [ERC20 토큰 스마트 컨트랙트 이해하기](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– 이더리움 테스트 네트워크에 첫 스마트 컨트랙트를 배포하는 방법에 대한 소개입니다._
- [Solidity 스마트 컨트랙트에서 ERC20 토큰 전송 및 승인](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Solidity 언어를 사용하여 스마트 컨트랙트로 토큰과 상호작용하는 방법입니다._
- [ERC721 마켓 구현하기 [방법 안내]](/developers/tutorials/how-to-implement-an-erc721-market/) _– 탈중앙화된 광고 게시판에 토큰화된 아이템을 판매용으로 올리는 방법입니다._