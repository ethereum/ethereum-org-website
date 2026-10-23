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

Este tutorial es la Parte 3/3 de la serie de tutoriales sobre NFT, donde vemos nuestro token no fungible (NFT) recién acuñado. Sin embargo, puede usar el tutorial general para cualquier token ERC-721 usando MetaMask, incluso en la Red principal o en cualquier red de prueba. Si desea aprender cómo acuñar su propio NFT en Ethereum, ¡debería consultar la [Parte 1 sobre cómo escribir y desplegar un contrato inteligente de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

¡Felicidades! Ha llegado a la parte más corta y sencilla de nuestra serie de tutoriales sobre NFT: cómo ver su NFT recién acuñado en una billetera virtual. Usaremos MetaMask para este ejemplo, ya que es lo que usamos en las dos partes anteriores.

Como requisito previo, ya debería tener MetaMask instalado, ya sea la extensión del navegador o la aplicación móvil, y debería incluir la cuenta en la que acuñó su NFT. Puede obtener MetaMask de forma gratuita desde la [página de descargas de MetaMask](https://metamask.io/download).

## Paso 1: Configure su red a Sepolia {#set-network-to-sepolia}

Como nuestro token no fungible (NFT) se acuñó en la red de prueba Sepolia, querrá seleccionar Sepolia como su red. MetaMask oculta las redes de prueba por defecto, así que primero actívelas:

1. Abra el menú en la esquina superior derecha y seleccione "Networks" (Redes).
2. Desplácese hacia abajo hasta el final de la lista de redes y active "Show test networks" (Mostrar redes de prueba).
3. Seleccione "Sepolia" en la lista de redes.

Consulte la [guía de MetaMask para ver redes de prueba](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) si los menús se ven diferentes en su versión de MetaMask.

## Paso 2: Agregue su coleccionable a MetaMask {#add-nft-to-metamask}

MetaMask detecta los tokens no fungibles (NFT) automáticamente solo en algunas redes, que no incluyen Sepolia, por lo que deberá importar su NFT manualmente. Para ello, necesita la dirección del contrato inteligente del NFT y el ID del token ERC-721 de su NFT, que debería poder encontrar en Etherscan basándose en el hash de transacción de su NFT acuñado en la Parte II de nuestro tutorial. Si usó el contrato de la Parte 1, su primer NFT tiene el ID de token 1.

![Cómo encontrar su hash de transacción y el ID del token ERC-721](./findNFTEtherscan.png)

Luego, en MetaMask (extensión o móvil):

1. Vaya a la sección "NFTs" de la pantalla de inicio y seleccione "Import NFT" (Importar NFT).
2. Seleccione Sepolia como la red y pegue la dirección del contrato inteligente de su NFT en el cuadro "Address" (Dirección).
3. Ingrese su ID de token en el cuadro "Token ID" (ID de token) y seleccione "Import" (Importar).

Es posible que deba actualizar un par de veces para ver su NFT, ¡pero estará allí <Emoji text="😄" size={1} />! Si MetaMask dice que no es el propietario del NFT, verifique que seleccionó la cuenta en la que acuñó el NFT. Para obtener más ayuda, consulte la [guía de MetaMask sobre NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

¡Felicidades! ¡Ha acuñado con éxito un NFT y ahora puede verlo! ¡Estamos ansiosos por ver cómo arrasará en el mundo de los NFT!
