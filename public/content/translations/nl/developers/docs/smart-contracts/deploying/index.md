---
title: Smart contracts implementeren
description:
lang: nl
---

U moet uw smart contract inzetten om het beschikbaar te maken voor gebruikers van een Ethereum-netwerk.

Om een smart contract te implementeren, stuurt u gewoon een Ethereum-transactie die de gecompileerde code van het smart contract bevat zonder een ontvanger aan te geven.

## Vereisten {#prerequisites}

U moet [Ethereum-netwerken](/developers/docs/networks/), [transacties](/developers/docs/transactions/) en de [anatomie van smart contracts](/developers/docs/smart-contracts/anatomy/) begrijpen voordat u smart contracts inzet.

Het inzetten van een contract kost ook ether (ETH) omdat ze worden opgeslagen op de blockchain, dus u moet bekend zijn met [gas en kosten](/developers/docs/gas/) op Ethereum.

Ten slotte moet u uw contract compileren voordat u het inzet, dus zorg ervoor dat u zich heeft ingelezen over het [compileren van smart contracts](/developers/docs/smart-contracts/compiling/).

## Hoe een smart contract inzetten {#how-to-deploy-a-smart-contract}

### Wat je nodig hebt {#what-youll-need}

- De bytecode van uw contract: deze wordt gegenereerd door [compilatie](/developers/docs/smart-contracts/compiling/)
- ETH voor gas: u stelt uw gaslimiet in zoals bij andere transacties, dus wees u ervan bewust dat voor het inzetten van contracten veel meer gas nodig is dan voor een eenvoudige ETH-overdracht
- een inzettingsscript of plugin
- toegang tot een [Ethereum-node](/developers/docs/nodes-and-clients/), ofwel door uw eigen node uit te voeren, of verbinding te maken met een publieke node, of via een API-sleutel met behulp van een [node-service](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Stappen om een smart contract in te zetten {#steps-to-deploy}

De specifieke stappen zijn afhankelijk van het ontwikkelingskader in kwestie. U kunt bijvoorbeeld [Hardhat's documentatie over het inzetten van uw contracten](https://hardhat.org/guides/deploying.html) of [Foundry's documentatie over het inzetten en verifiëren van een smart contract bekijken](https://book.getfoundry.sh/forge/deploying). Eens ingezet, zal uw contract een Ethereum-adres hebben zoals andere [accounts](/developers/docs/accounts/) en kan het geverifieerd worden met [verificatietools voor de broncode](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Gerelateerde tools {#related-tools}

**Remix - _Met Remix IDE kunnen smart contracts voor Ethereum-achtige blockchains worden ontwikkeld, ingezet en beheerd_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3-ontwikkelingsplatform dat debugging, observeerbaarheid en infrastructuurbouwstenen biedt voor het ontwikkelen, testen, monitoren en beheren van smart contracts_**

- [tenderly.co](https://tenderly.co/)
- [Documentatie](https://docs.tenderly.co/)
- [Github](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Een ontwikkelomgeving om uw Ethereum-software te compileren, in te zetten, te testen en te debuggen_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentatie over het inzetten van uw contracten](https://hardhat.org/guides/deploying.html)
- [Github](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Zet een contract eenvoudig in op elke EVM-compatibele chain, met één commando_**

- [Documentatie](https://portal.thirdweb.com/deploy/)

**Crossmint - _Ontwikkelplatform voor web3 op bedrijfsniveau om smart contracts te implementeren, creditcard- en cross chain-betalingen mogelijk te maken en API's te gebruiken voor het maken, verspreiden, verkopen, opslaan en bewerken van NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentatie](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Gerelateerde tutorials {#related-tutorials}

- [Uw eerste smart contract inzetten](/developers/tutorials/deploying-your-first-smart-contract/) _– Een inleiding tot het inzetten van uw eerste smart contract op een Ethereum-testnetwerk._
- [Hello World | smart contract tutorial](/developers/tutorials/hello-world-smart-contract/) _– Een gemakkelijk te volgen tutorial voor het maken en implementeren van een standaard smart contract op Ethereum._
- [Interactie met andere contracten van Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- Hoe een smart contract van een bestaand contract inzetten en er interactie mee hebben._
- [Hoe de omvang van uw contract beperken](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Hoe u de omvang van uw contract kunt beperken om onder de limiet te blijven en gas te besparen_

## Verder lezen {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Deploying your contracts with Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_

## Verwante onderwerpen {#related-topics}

- [Ontwikkelingskaders](/developers/docs/frameworks/)
- [Draai een Ethereum-node](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-service](/developers/docs/nodes-and-clients/nodes-as-a-service)
