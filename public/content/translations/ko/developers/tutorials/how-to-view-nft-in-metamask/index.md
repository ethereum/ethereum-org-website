---
title: 지갑에서 NFT를 보는 방법 (NFT 튜토리얼 시리즈 3/3부)
description: 이 튜토리얼에서는 메타마스크에서 기존 NFT를 보는 방법을 설명합니다!
author: "수미 무드길"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: 지갑에서 NFT 보기
lang: ko
published: 2021-04-22
---

이 튜토리얼은 NFT 튜토리얼 시리즈의 3/3부로, 새로 발행된 NFT를 확인해 봅니다. 하지만 메인넷이나 테스트넷을 포함하여 메타마스크를 사용하는 모든 ERC-721 토큰에 대해 이 일반적인 튜토리얼을 사용할 수 있습니다. 이더리움에서 자신만의 NFT를 발행하는 방법을 배우고 싶다면, [NFT 스마트 컨트랙트 작성 및 배포 방법에 대한 1부](/developers/tutorials/how-to-write-and-deploy-an-nft)를 확인해 보세요!

축하합니다! NFT 튜토리얼 시리즈 중 가장 짧고 간단한 부분인 가상 지갑에서 갓 발행된 NFT를 보는 방법에 도달하셨습니다. 이전 두 부분에서 사용했던 메타마스크를 이 예제에서도 사용할 것입니다.

사전 준비 사항으로 모바일에 메타마스크가 이미 설치되어 있어야 하며, NFT를 발행한 계정이 포함되어 있어야 합니다. 이 앱은 [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) 또는 [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US)에서 무료로 다운로드할 수 있습니다.

## 1단계: 네트워크를 Sepolia로 설정하기 {#set-network-to-sepolia}

앱 상단에서 "지갑(Wallet)" 버튼을 누르면 네트워크를 선택하라는 메시지가 표시됩니다. 우리의 NFT는 Sepolia 네트워크에서 발행되었으므로, 네트워크로 Sepolia를 선택해야 합니다.

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## 2단계: 메타마스크에 수집품 추가하기 {#add-nft-to-metamask}

Sepolia 네트워크에 접속한 후, 오른쪽에 있는 "수집품(Collectibles)" 탭을 선택하고 NFT 스마트 컨트랙 주소와 NFT의 ERC-721 토큰 ID를 추가합니다. 이는 튜토리얼 2부에서 배포한 NFT의 트랜잭션 해시를 기반으로 Etherscan에서 찾을 수 있습니다.

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

NFT를 보려면 몇 번 새로고침해야 할 수도 있지만, 곧 나타날 것입니다 <Emoji text="😄" size={1} />!

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

축하합니다! 성공적으로 NFT를 발행했으며, 이제 이를 확인할 수 있습니다! 여러분이 NFT 세계에 어떤 돌풍을 일으킬지 무척 기대됩니다!