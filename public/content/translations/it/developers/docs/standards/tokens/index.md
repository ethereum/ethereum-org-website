---
title: Standard dei token
description: Esplora gli standard dei token di Ethereum, inclusi ERC-20, ERC-721 ed ERC-1155 per token fungibili e non fungibili.
lang: it
incomplete: true
---

## Introduzione {#introduction}

Molti standard di sviluppo di [Ethereum](/) si concentrano sulle interfacce dei token. Questi standard aiutano a garantire che gli smart contract rimangano componibili, in modo che quando un nuovo progetto emette un token, questo resti compatibile con gli exchange e le applicazioni decentralizzate esistenti.

Gli standard dei token definiscono come i token si comportano e interagiscono nell'ecosistema di Ethereum. Rendono più facile per gli sviluppatori costruire senza reinventare la ruota, garantendo che i token funzionino senza problemi con portafogli, exchange e piattaforme di finanza decentralizzata (DeFi). Che si tratti di gaming, governance o altri casi d'uso, questi standard forniscono coerenza e rendono Ethereum più interconnesso.

## Prerequisiti {#prerequisites}

- [Standard di sviluppo di Ethereum](/developers/docs/standards/)
- [Smart contract](/developers/docs/smart-contracts/)

## Standard dei token {#token-standards}

Ecco alcuni degli standard dei token più popolari su Ethereum:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Un'interfaccia standard per token fungibili (intercambiabili), come i token di voto, i token di staking o le valute virtuali.

### Standard degli NFT {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Un'interfaccia standard per token non fungibili, come un atto di proprietà per un'opera d'arte o una canzone.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - L'ERC-1155 consente scambi più efficienti e il raggruppamento delle transazioni, risparmiando così sui costi. Questo standard dei token consente di creare sia utility token (come $BNB o $BAT) sia token non fungibili come i CryptoPunks.

L'elenco completo delle proposte [ERC](https://eips.ethereum.org/erc).

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [Lista di controllo per l'integrazione dei token](/developers/tutorials/token-integration-checklist/) _– Una lista di controllo delle cose da considerare quando si interagisce con i token._
- [Comprendere lo smart contract del token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Un'introduzione alla distribuzione del tuo primo smart contract su una rete di prova di Ethereum._
- [Trasferimenti e approvazione di token ERC20 da uno smart contract in Solidity](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Come usare uno smart contract per interagire con un token usando il linguaggio Solidity._
- [Implementare un mercato ERC721 [una guida pratica]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Come mettere in vendita oggetti tokenizzati su una bacheca di annunci decentralizzata._