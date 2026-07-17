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

Ce tutoriel est la partie 3/3 de la série de tutoriels sur les NFT, où nous affichons notre NFT nouvellement frappé. Cependant, vous pouvez utiliser le tutoriel général pour n'importe quel jeton ERC-721 en utilisant MetaMask, y compris sur le Réseau principal ou n'importe quel réseau de test. Si vous souhaitez apprendre comment frapper votre propre NFT sur Ethereum, vous devriez consulter la [Partie 1 sur la façon d'écrire et de déployer un contrat intelligent de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft) !

Félicitations ! Vous êtes arrivé à la partie la plus courte et la plus simple de notre série de tutoriels sur les NFT : comment afficher votre NFT fraîchement frappé sur un portefeuille virtuel. Nous utiliserons MetaMask pour cet exemple puisque c'est ce que nous avons utilisé dans les deux parties précédentes.

Comme prérequis, vous devriez déjà avoir installé MetaMask sur mobile, et il devrait inclure le compte sur lequel vous avez frappé votre NFT — vous pouvez obtenir l'application gratuitement sur [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) ou [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Étape 1 : Définissez votre réseau sur Sepolia {#set-network-to-sepolia}

En haut de l'application, appuyez sur le bouton « Portefeuille », après quoi vous serez invité à sélectionner un réseau. Comme notre NFT a été frappé sur le réseau Sepolia, vous devrez sélectionner Sepolia comme réseau.

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## Étape 2 : Ajoutez votre objet de collection à MetaMask {#add-nft-to-metamask}

Une fois que vous êtes sur le réseau Sepolia, sélectionnez l'onglet « Objets de collection » sur la droite et ajoutez l'adresse du contrat intelligent du NFT et l'ID du jeton ERC-721 de votre NFT — que vous devriez pouvoir trouver sur Etherscan en vous basant sur le hachage de transaction de votre NFT déployé dans la Partie II de notre tutoriel.

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

Vous devrez peut-être rafraîchir la page quelques fois pour afficher votre NFT — mais il sera là <Emoji text="😄" size={1} /> !

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

Félicitations ! Vous avez frappé un NFT avec succès, et vous pouvez maintenant l'afficher ! Nous avons hâte de voir comment vous allez conquérir le monde des NFT !