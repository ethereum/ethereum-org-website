---
title: "Cüzdanınızda NFT'nizi Nasıl Görüntülersiniz (NFT Eğitim Serisi Bölüm 3/3)"
description: "Bu eğitim, MetaMask üzerinde mevcut bir NFT'nin nasıl görüntüleneceğini açıklamaktadır!"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "Cüzdanda NFT görüntüleme"
lang: tr
published: 2021-04-22
---

Bu eğitim, yeni bastığımız değiştirilemez token'ı (NFT) görüntülediğimiz NFT Eğitim Serisinin 3/3. Bölümüdür. Ancak, genel eğitimi Ana Ağ veya herhangi bir test ağı dahil olmak üzere MetaMask kullanan herhangi bir ERC-721 Token'ı için kullanabilirsiniz. Ethereum üzerinde kendi NFT'nizi nasıl basacağınızı öğrenmek isterseniz, [Bir NFT akıllı sözleşmesi Nasıl Yazılır ve Dağıtılır konulu 1. Bölüme](/developers/tutorials/how-to-write-and-deploy-an-nft) göz atmalısınız!

Tebrikler! NFT eğitim serimizin en kısa ve en basit kısmına ulaştınız: yeni bastığınız NFT'nizi sanal bir cüzdanda nasıl görüntüleyeceğiniz. Önceki iki bölümde kullandığımız için bu örnekte MetaMask kullanacağız.

Ön koşul olarak, tarayıcı uzantısı veya mobil uygulama olarak MetaMask'ın zaten yüklü olması ve NFT'nizi bastığınız hesabı içermesi gerekir. MetaMask'ı [MetaMask indirme sayfasından](https://metamask.io/download) ücretsiz olarak edinebilirsiniz.

## 1. Adım: Ağınızı Sepolia olarak ayarlayın {#set-network-to-sepolia}

NFT'miz Sepolia test ağında basıldığı için ağınız olarak Sepolia'yı seçmek isteyeceksiniz. MetaMask test ağlarını varsayılan olarak gizler, bu nedenle önce onları açın:

1. Sağ üst köşedeki menüyü açın ve "Ağlar"ı seçin.
2. Ağ listesinin en altına kaydırın ve "Test ağlarını göster" seçeneğini açın.
3. Ağ listesinden "Sepolia"yı seçin.

MetaMask sürümünüzde menüler farklı görünüyorsa [MetaMask'ın test ağlarını görüntüleme kılavuzuna](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) bakın.

## 2. Adım: Koleksiyon öğenizi MetaMask'a ekleyin {#add-nft-to-metamask}

MetaMask, NFT'leri yalnızca Sepolia'yı içermeyen bazı ağlarda otomatik olarak algılar, bu nedenle NFT'nizi manuel olarak içe aktarmanız gerekir. Bunun için NFT akıllı sözleşme adresine ve NFT'nizin ERC-721 Token kimliğine ihtiyacınız vardır; bunları, eğitimimizin II. Bölümünde bastığınız NFT'nizin işlem hash'ine dayanarak Etherscan'de bulabilmelisiniz. 1. Bölümdeki sözleşmeyi kullandıysanız, ilk NFT'nizin Token kimliği 1'dir.

![İşlem hash'inizi ve ERC-721 Token kimliğinizi nasıl bulabilirsiniz](./findNFTEtherscan.png)

Ardından, MetaMask'ta (uzantı veya mobil):

1. Ana ekranın "NFT'ler" bölümüne gidin ve "NFT'yi İçe Aktar"ı seçin.
2. Ağ olarak Sepolia'yı seçin ve NFT akıllı sözleşme adresinizi "Adres" kutusuna yapıştırın.
3. Token kimliğinizi "Token Kimliği" kutusuna girin ve "İçe Aktar"ı seçin.

NFT'nizi görüntülemek için birkaç kez yenilemeniz gerekebilir, ancak orada olacaktır <Emoji text="😄" size={1} />! MetaMask, NFT'nin sahibi olmadığınızı söylerse, NFT'yi bastığınız hesabı seçtiğinizi kontrol edin. Daha fazla yardım için [MetaMask'ın NFT'ler kılavuzuna](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/) bakın.

Tebrikler! Başarıyla bir NFT bastınız ve artık onu görüntüleyebilirsiniz! NFT dünyasını nasıl kasıp kavuracağınızı görmek için sabırsızlanıyoruz!
