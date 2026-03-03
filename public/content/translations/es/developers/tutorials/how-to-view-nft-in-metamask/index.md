---
title: "Cómo ver su NFT en su billetera (Parte 3/3 de la serie de tutoriales de NFT)"
description: "¡Este tutorial describe cómo ver un NFT existente en MetaMask!"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity" ]
skill: beginner
breadcrumb: "Ver NFT en wallet"
lang: es
published: 2021-04-22
---

Este tutorial es la parte 3/3 de la serie de tutoriales de NFT, en la que vemos nuestro NFT recién acuñado. Sin embargo, puede utilizar el tutorial general para cualquier token ERC-721 usando MetaMask, incluso en la red principal o en cualquier red de prueba. Si le gustaría aprender a acuñar su propio NFT en Ethereum, ¡debería consultar la [Parte 1 sobre cómo escribir y desplegar un contrato inteligente de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

¡Enhorabuena! Ha llegado a la parte más corta y sencilla de nuestra serie de tutoriales de NFT: cómo ver su NFT recién acuñado en una billetera virtual. Utilizaremos MetaMask para este ejemplo, ya que es lo que usamos en las dos partes anteriores.

Como requisito previo, ya debería tener MetaMask instalado en su móvil, y este debería incluir la cuenta en la que acuñó su NFT. Puede obtener la aplicación de forma gratuita en [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) o [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Paso 1: Configure su red en Sepolia {#set-network-to-sepolia}

En la parte superior de la aplicación, pulse el botón «Billetera», tras lo cual se le pedirá que seleccione una red. Como nuestro NFT fue acuñado en la red Sepolia, deberá seleccionar Sepolia como su red.

![Cómo configurar la red Sepolia en MetaMask para móvil](./goerliMetamask.gif)

## Paso 2: Añada su coleccionable a MetaMask {#add-nft-to-metamask}

Una vez que esté en la red Sepolia, seleccione la pestaña «Coleccionables» a la derecha y añada la dirección del contrato inteligente del NFT y el ID del token ERC-721 de su NFT, que debería poder encontrar en Etherscan a partir del hash de la transacción de su NFT desplegado en la parte II de nuestro tutorial.

![Cómo encontrar el hash de su transacción y el ID del token ERC-721](./findNFTEtherscan.png)

Puede que necesite actualizar un par de veces la pantalla para ver su NFT, ¡pero estará ahí <Emoji text="😄" size={1} />!

![Cómo subir su NFT a MetaMask](./findNFTMetamask.gif)

¡Enhorabuena! ¡Ha acuñado con éxito un NFT y ya puede verlo! ¡Estamos deseando ver cómo arrasará en el mundo de los NFT!
