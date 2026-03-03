---
title: "지갑에서 자신의 NFT를 보는 방법 (NFT 튜토리얼 시리즈 3/3부)"
description: "이 튜토리얼은 MetaMask에서 기존 NFT를 보는 방법을 설명합니다!"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity" ]
skill: beginner
breadcrumb: "지갑에서 NFT 보기"
lang: ko
published: 2021-04-22
---

이 튜토리얼은 NFT 튜토리얼 시리즈의 3부 중 3부로, 새로 민팅한 NFT를 확인하는 방법을 다룹니다. 하지만 메인넷이나 모든 테스트넷을 포함하여 MetaMask를 사용하는 모든 ERC-721 토큰에 이 일반 튜토리얼을 사용할 수 있습니다. 이더리움에서 자신만의 NFT를 민팅하는 방법을 배우고 싶다면 [1부: NFT 스마트 계약 작성 및 배포 방법](/developers/tutorials/how-to-write-and-deploy-an-nft)을 확인하세요!

축하해요! NFT 튜토리얼 시리즈에서 가장 짧고 간단한 부분에 도달했습니다. 바로 가상 지갑에서 새로 민팅한 NFT를 확인하는 방법입니다. 이전 두 파트에서 사용했던 MetaMask를 이 예시에서도 사용하겠습니다.

사전 조건으로, 모바일에 MetaMask가 이미 설치되어 있어야 하며 NFT를 민팅한 계정이 포함되어 있어야 합니다. [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) 또는 [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US)에서 앱을 무료로 다운로드할 수 있습니다.

## 1단계: 네트워크를 세폴리아(Sepolia)로 설정하기 {#set-network-to-sepolia}

앱 상단의 '지갑' 버튼을 누르면 네트워크를 선택하라는 메시지가 표시됩니다. NFT는 세폴리아(Sepolia) 네트워크에서 민팅되었으므로 네트워크로 세폴리아(Sepolia)를 선택해야 합니다.

![MetaMask 모바일에서 세폴리아(Sepolia)를 네트워크로 설정하는 방법](./goerliMetamask.gif)

## 2단계: MetaMask에 수집품 추가하기 {#add-nft-to-metamask}

세폴리아(Sepolia) 네트워크에 접속한 후, 오른쪽의 '수집품' 탭을 선택하고 NFT 스마트 계약 주소와 NFT의 ERC-721 토큰 ID를 추가하세요. 이 정보는 튜토리얼 2부에서 배포한 NFT의 트랜잭션 해시를 기반으로 Etherscan에서 찾을 수 있습니다.

![트랜잭션 해시와 ERC-721 토큰 ID를 찾는 방법](./findNFTEtherscan.png)

NFT를 보려면 몇 번 새로고침해야 할 수도 있습니다. 하지만 걱정마세요, 곧 나타날 겁니다 <Emoji text="😄" size={1} />!

![MetaMask에 NFT를 업로드하는 방법](./findNFTMetamask.gif)

축하해요! 이제 성공적으로 NFT를 민팅했으며, 바로 확인할 수 있습니다! 여러분이 NFT 세계를 어떻게 뒤흔들지 정말 기대됩니다!
