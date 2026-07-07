---
title: "Cómo ver su NFT en su billetera (Parte 3/3 de la serie de tutoriales sobre NFT)"
description: "¡Este tutorial describe cómo ver un NFT existente en MetaMask!"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Ver NFT en la billetera
lang: es
published: 2021-04-22
---

Este tutorial es la Parte 3/3 de la serie de tutoriales sobre NFT, donde vemos nuestro NFT recién acuñado. Sin embargo, puede usar el tutorial general para cualquier token ERC-721 usando MetaMask, incluso en la Red principal o en cualquier red de prueba. Si desea aprender cómo acuñar su propio NFT en Ethereum, ¡debería consultar la [Parte 1 sobre cómo escribir y desplegar un contrato inteligente de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

¡Felicidades! Ha llegado a la parte más corta y sencilla de nuestra serie de tutoriales sobre NFT: cómo ver su NFT recién acuñado en una billetera virtual. Usaremos MetaMask para este ejemplo, ya que es lo que usamos en las dos partes anteriores.

Como requisito previo, ya debería tener instalado MetaMask en su dispositivo móvil, y debería incluir la cuenta en la que acuñó su NFT; puede obtener la aplicación de forma gratuita en [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) o [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Paso 1: Configure su red en Sepolia {#set-network-to-sepolia}

En la parte superior de la aplicación, presione el botón «Billetera» (Wallet), después de lo cual se le pedirá que seleccione una red. Como nuestro NFT se acuñó en la red Sepolia, querrá seleccionar Sepolia como su red.

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## Paso 2: Agregue su coleccionable a MetaMask {#add-nft-to-metamask}

Una vez que esté en la red Sepolia, seleccione la pestaña «Coleccionables» (Collectibles) a la derecha y agregue la dirección del contrato inteligente del NFT y el ID del token ERC-721 de su NFT, que debería poder encontrar en Etherscan según el hash de transacción de su NFT desplegado en la Parte II de nuestro tutorial.

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

Es posible que deba actualizar un par de veces para ver su NFT, ¡pero estará allí <Emoji text="😄" size={1} />!

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

¡Felicidades! Ha acuñado con éxito un NFT y ahora puede verlo. ¡Estamos ansiosos por ver cómo arrasará en el mundo de los NFT!