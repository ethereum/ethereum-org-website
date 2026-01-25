---
title: 루비 개발자를 위한 이더리움
description: 루비 기반 프로젝트와 툴링을 사용해 이더리움용으로 개발하는 방법을 알아보세요.
lang: ko
incomplete: false
---

<FeaturedText>루비 기반 프로젝트와 툴링을 사용해 이더리움용으로 개발하는 방법을 알아보세요.</FeaturedText>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 이러한 탈중앙화앱은 무신뢰성을 가질 수 있습니다. 즉, 이더리움에 배포되면 항상 프로그래밍된 대로 실행됩니다. 탈중앙화앱은 디지털 자산을 제어하여 새로운 종류의 금융 애플리케이션을 만들 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

## 스마트 계약 및 솔리디티 언어 시작하기 {#getting-started-with-smart-contracts-and-solidity}

**루비와 이더리움을 통합하기 위한 첫걸음을 내딛어 보세요**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 계약 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 스마트 계약 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 초급자용 아티클 {#beginner-articles}

- [드디어 이더리움 계정 이해하기](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [드디어 MetaMask로 Rails 사용자 인증하기](https://dev.to/q9/finally-authenticating-rails-users-with-metamask-3fj)
- [루비를 사용하여 이더리움 네트워크에 연결하는 방법](https://www.quicknode.com/guides/web3-sdks/how-to-connect-to-the-ethereum-network-using-ruby)
- [루비에서 새로운 이더리움 주소를 생성하는 방법](https://www.quicknode.com/guides/web3-sdks/how-to-generate-a-new-ethereum-address-in-ruby)

## 중급자용 아티클 {#intermediate-articles}

- [루비를 사용한 블록체인 앱](https://www.nopio.com/blog/blockchain-app-ruby/)
- [이더리움에 연결된 루비를 사용하여 스마트 계약 실행하기](https://titanwolf.org/Network/Articles/Article?AID=87285822-9b25-49d5-ba2a-7ad95fff7ef9)

## 루비 프로젝트 및 도구 {#ruby-projects-and-tools}

### 활성 {#active}

- [eth.rb](https://github.com/q9f/eth.rb) - _이더리움 계정, 메시지, 트랜잭션을 처리하기 위한 루비 라이브러리 및 RPC 클라이언트_
- [keccak.rb](https://github.com/q9f/keccak.rb) - _이더리움에서 사용되는 Keccak(SHA3) 해시_
- [siwe-ruby](https://github.com/signinwithethereum/siwe-ruby) - _이더리움으로 로그인(Sign-In with Ethereum)의 루비 구현_
- [siwe-rails](https://github.com/signinwithethereum/siwe-rails) - _SIWE 로컬 로그인 라우트를 추가하는 Rails gem_
- [siwe-rails-examples](https://github.com/signinwithethereum/siwe-rails-examples) - _커스텀 컨트롤러를 사용하여 Ruby on Rails를 이용한 SIWE 예제_
- [omniauth-siwe](https://github.com/signinwithethereum/omniauth-siwe) - _이더리움으로 로그인(SIWE)을 위한 OmniAuth 전략_
- [omniauth-nft](https://github.com/valthon/omniauth-nft) - _NFT 소유권을 통해 인증하기 위한 OmniAuth 전략_
- [ethereum-on-rails](https://github.com/q9f/ethereum-on-rails) - _MetaMask를 Ruby on Rails에 연결할 수 있는 Ethereum on Rails 템플릿_

### 보관됨 / 더 이상 유지 관리되지 않음 {#archived--no-longer-maintained}

- [web3-eth](https://github.com/spikewilliams/vtada-ethereum) - _루비를 사용하여 이더리움 노드의 RPC 메서드 호출_
- [ethereum_tree](https://github.com/longhoangwkm/ethereum_tree) - _BIP32 표준에 따라 계층적 결정적 지갑에서 ETH 주소를 생성하기 위한 루비 라이브러리_
- [etherlite](https://github.com/budacom/etherlite) - _Ruby on Rails를 위한 이더리움 통합_
- [ethereum.rb](https://github.com/EthWorks/ethereum.rb) - _트랜잭션 전송, 계약 생성 및 상호 작용을 위해 JSON-RPC 인터페이스를 사용하는 루비 이더리움 클라이언트이자 이더리움 노드와 함께 작동하는 유용한 툴킷_
- [omniauth-ethereum.rb](https://github.com/q9f/omniauth-ethereum.rb) - _OmniAuth를 위한 이더리움 공급자 전략 구현_

더 많은 참고 자료를 확인하고 싶으신가요? 저희 [개발자 홈](/developers/)을 확인해 보세요.

## 루비 커뮤니티 기여자 {#ruby-community-contributors}

[이더리움 루비 텔레그램 그룹](https://t.me/ruby_eth)은 빠르게 성장하는 커뮤니티의 장이며, 위에 언급된 모든 프로젝트 및 관련 주제에 대한 논의를 위한 전용 참고 자료입니다.
