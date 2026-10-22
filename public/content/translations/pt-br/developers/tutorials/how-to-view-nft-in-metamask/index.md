---
title: "Como visualizar seu NFT na sua carteira (Parte 3/3 da série de tutoriais sobre NFT)"
description: Este tutorial descreve como visualizar um NFT existente na MetaMask!
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Visualizar NFT na carteira
lang: pt-br
published: 2021-04-22
---

Este tutorial é a Parte 3/3 da série de tutoriais sobre token não fungível (NFT), onde visualizamos nosso NFT recém-cunhado. No entanto, você pode usar o tutorial geral para qualquer token ERC-721 usando a MetaMask, inclusive na Mainnet ou em qualquer rede de teste. Se você quiser aprender como cunhar seu próprio NFT na Ethereum, confira a [Parte 1 sobre Como escrever e implantar um contrato inteligente de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Parabéns! Você chegou à parte mais curta e simples da nossa série de tutoriais sobre NFT — como visualizar seu NFT recém-cunhado em uma carteira virtual. Usaremos a MetaMask para este exemplo, pois foi o que usamos nas duas partes anteriores.

Como pré-requisito, você já deve ter a MetaMask instalada, seja a extensão do navegador ou o aplicativo móvel, e ela deve incluir a conta na qual você cunhou seu NFT. Você pode obter a MetaMask gratuitamente na [página de download da MetaMask](https://metamask.io/download).

## Passo 1: Defina sua rede para Sepolia {#set-network-to-sepolia}

Como nosso token não fungível (NFT) foi cunhado na rede de teste Sepolia, você vai querer selecionar Sepolia como sua rede. A MetaMask oculta as redes de teste por padrão, então primeiro ative-as:

1. Abra o menu no canto superior direito e selecione "Networks" (Redes).
2. Role para baixo até o final da lista de redes e ative "Show test networks" (Mostrar redes de teste).
3. Selecione "Sepolia" na lista de redes.

Consulte o [guia da MetaMask para visualizar redes de teste](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) se os menus parecerem diferentes na sua versão da MetaMask.

## Passo 2: Adicione seu colecionável à MetaMask {#add-nft-to-metamask}

A MetaMask detecta tokens não fungíveis (NFTs) automaticamente apenas em algumas redes, que não incluem a Sepolia, então você precisará importar seu NFT manualmente. Para isso, você precisa do endereço do contrato inteligente do NFT e do ID do token ERC-721 do seu NFT — que você deve conseguir encontrar no Etherscan com base no hash da transação do seu NFT cunhado na Parte II do nosso tutorial. Se você usou o contrato da Parte 1, seu primeiro NFT tem o ID de token 1.

![Como encontrar o hash da transação e o ID do token ERC-721](./findNFTEtherscan.png)

Em seguida, na MetaMask (extensão ou aplicativo móvel):

1. Vá para a seção "NFTs" da tela inicial e selecione "Import NFT" (Importar NFT).
2. Selecione Sepolia como a rede e cole o endereço do contrato inteligente do seu NFT na caixa "Address" (Endereço).
3. Insira o ID do seu token na caixa "Token ID" (ID do token) e selecione "Import" (Importar).

Você pode precisar atualizar algumas vezes para visualizar seu NFT — mas ele estará lá <Emoji text="😄" size={1} />! Se a MetaMask disser que você não é o proprietário do NFT, verifique se você selecionou a conta na qual cunhou o NFT. Para obter mais ajuda, consulte o [guia da MetaMask sobre NFTs](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Parabéns! Você cunhou com sucesso um NFT e agora pode visualizá-lo! Mal podemos esperar para ver como você vai conquistar o mundo dos NFTs!
