---
title: NFT'nizi Cüzdanınızda Nasıl Görüntüleyebilirsiniz (NFT Öğretici Serisi Bölüm 3/3)
description: Bu öğretici, MetaMask'ta mevcut bir NFT'nin nasıl görüntüleneceğini açıklar!
author: "Sumi Mudgil"
tags:
  - "NFT'ler"
  - "ERC-721"
  - "Alchemy"
  - "MetaMask"
  - "değiştirilemez token'lar"
  - "Solidity"
skill: beginner
lang: tr
published: 2021-04-22
---

Bu öğretici, yeni basılmış NFT'mizi görüntülediğimiz NFT Öğretici serisinin Bölüm 3/3'üdür. Ancak, Mainnet veya herhangi bir test ağı dahil olmak üzere MetaMask kullanan herhangi bir ERC-721 token'ı için genel öğreticiyi kullanabilirsiniz. Ethereum üzerinde kendi NFT'nizi nasıl basacağınızı öğrenmek istiyorsanız, [Bir NFT Nasıl Yazılır ve Dağıtılır](/developers/tutorials/how-to-write-and-deploy-an-nft) kısmına göz atmalısınız!

Tebrikler! NFT öğretici serimizin en kısa ve en basit kısmına geldiniz: Yeni basılmış NFT'nizi sanal bir cüzdanda görüntüleme. Önceki iki bölümde onu kullandığımızdan dolayı bu örnek için MetaMask kullanacağız.

Bir ön koşul olarak, MetaMask'in mobil cihazınızda zaten kurulu olması ve NFT'nizi bastığınız hesabı içermesi gerekir: Uygulamayı [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) veya [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US) üzerinden ücretsiz edinebilirsiniz.

## Adım 1: Ağınızı Ropsten olarak ayarlayın {#set-network-to-ropsten}

Uygulamanın üst kısmındaki "Wallet" (Cüzdan) düğmesine basın, ardından bir ağ seçmeniz istenecektir. NFT'miz Ropsten ağında basıldığından, ağ olarak Ropsten'i seçmelisiniz.

![MetaMask Mobile üzerinde ağınız nasıl Ropsten olarak ayarlanır](./ropstenMetamask.gif)

## Adım 2: Koleksiyon öğenizi MetaMask'e ekleyin {#add-nft-to-metamask}

Ropsten ağına girdikten sonra, sağdaki "Collectibles" (Koleksiyon Öğeleri) sekmesini seçin ve NFT akıllı sözleşme adresini ve NFT'nizin ERC-721 token kimliğini ekleyin: Bunu, öğreticimizin 2. Bölümünde dağıtılan NFT'nizin işlem hash değerine göre Etherscan'de bulabilirsiniz.

![İşlem hash değerinizi ve ERC-721 token kimliğinizi nasıl bulabilirsiniz](./findNFTEtherscan.png)

NFT'nizi görüntülemek için birkaç kez yenilemeniz gerekebilir ancak kesinle orada olacaktır<Emoji text="😄" size={1} />!

![NFT'nizi MetaMask'e nasıl yüklersiniz](./findNFTMetamask.gif)

Tebrikler! Bir NFT'yi başarıyla bastınız ve şimdi onu görüntüleyebilirsiniz! NFT dünyasını nasıl kasıp kavuracağınızı görmek için sabırsızlanıyoruz!
