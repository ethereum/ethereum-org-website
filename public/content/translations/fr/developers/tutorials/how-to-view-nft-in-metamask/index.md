---
title: "Comment afficher votre NFT dans votre portefeuille (Partie 3/3 de la série de tutoriels sur les NFT)"
description: "Ce tutoriel décrit comment afficher un NFT existant sur MetaMask !"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Afficher un NFT dans un portefeuille
lang: fr
published: 2021-04-22
---

Ce tutoriel est la partie 3/3 de la série de tutoriels sur les jetons non fongibles (NFT), où nous visualisons notre NFT nouvellement frappé. Cependant, vous pouvez utiliser le tutoriel général pour n'importe quel jeton ERC-721 en utilisant MetaMask, y compris sur le Réseau principal ou n'importe quel réseau de test. Si vous souhaitez apprendre à frapper votre propre NFT sur Ethereum, vous devriez consulter la [Partie 1 sur la façon d'écrire et de déployer un contrat intelligent de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft) !

Félicitations ! Vous êtes arrivé à la partie la plus courte et la plus simple de notre série de tutoriels sur les NFT : comment afficher votre NFT fraîchement frappé sur un portefeuille virtuel. Nous utiliserons MetaMask pour cet exemple, car c'est ce que nous avons utilisé dans les deux parties précédentes.

Comme prérequis, vous devriez déjà avoir installé MetaMask, soit l'extension de navigateur, soit l'application mobile, et il devrait inclure le compte sur lequel vous avez frappé votre NFT. Vous pouvez obtenir MetaMask gratuitement sur la [page de téléchargement de MetaMask](https://metamask.io/download).

## Étape 1 : Configurez votre réseau sur Sepolia {#set-network-to-sepolia}

Comme notre jeton non fongible (NFT) a été frappé sur le réseau de test Sepolia, vous voudrez sélectionner Sepolia comme réseau. MetaMask masque les réseaux de test par défaut, alors activez-les d'abord :

1. Ouvrez le menu dans le coin supérieur droit et sélectionnez « Networks » (Réseaux).
2. Faites défiler jusqu'en bas de la liste des réseaux et activez « Show test networks » (Afficher les réseaux de test).
3. Sélectionnez « Sepolia » dans la liste des réseaux.

Consultez le [guide de MetaMask pour afficher les réseaux de test](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) si les menus semblent différents dans votre version de MetaMask.

## Étape 2 : Ajoutez votre objet de collection à MetaMask {#add-nft-to-metamask}

MetaMask détecte automatiquement les jetons non fongibles (NFT) uniquement sur certains réseaux, qui n'incluent pas Sepolia, vous devrez donc importer votre NFT manuellement. Pour cela, vous avez besoin de l'adresse du contrat intelligent du NFT et de l'ID de jeton ERC-721 de votre NFT — que vous devriez pouvoir trouver sur Etherscan en fonction du hachage de transaction de votre NFT frappé dans la partie II de notre tutoriel. Si vous avez utilisé le contrat de la partie 1, votre premier NFT a l'ID de jeton 1.

![Comment trouver votre hachage de transaction et votre ID de jeton ERC-721](./findNFTEtherscan.png)

Ensuite, dans MetaMask (extension ou mobile) :

1. Allez dans la section « NFTs » de l'écran d'accueil et sélectionnez « Import NFT » (Importer un NFT).
2. Sélectionnez Sepolia comme réseau, et collez l'adresse du contrat intelligent de votre NFT dans la case « Address » (Adresse).
3. Entrez votre ID de jeton dans la case « Token ID » (ID de jeton) et sélectionnez « Import » (Importer).

Vous devrez peut-être actualiser quelques fois pour voir votre NFT — mais il sera là <Emoji text="😄" size={1} /> ! Si MetaMask indique que vous n'êtes pas le propriétaire du NFT, vérifiez que vous avez sélectionné le compte sur lequel vous avez frappé le NFT. Pour plus d'aide, consultez le [guide de MetaMask sur les NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Félicitations ! Vous avez frappé un NFT avec succès, et vous pouvez maintenant le voir ! Nous avons hâte de voir comment vous allez prendre d'assaut le monde des NFT !
