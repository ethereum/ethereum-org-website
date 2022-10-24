---
title: Distribuzione di Smart Contract
description:
lang: it
---

Uno Smart Contract deve essere distribuito per essere a disposizione degli utenti di una rete Ethereum.

Per distribuire uno Smart Contract, si invia una transazione Ethereum che contiene il codice dello Smart Contract compilato senza specificare alcun destinatario.

## Prerequisiti {#prerequisites}

È necessario conoscere le [reti Ethereum](/developers/docs/networks/), le [transazioni](/developers/docs/transactions/) e l'[anatomia degli Smart Contract](/developers/docs/smart-contracts/anatomy/) prima di distribuire Smart Contract.

Distribuire un contratto costa inoltre ETH, quindi è necessario avere familiarità con [carburante e commissioni](/developers/docs/gas/) su Ethereum.

Infine, è necessario compilare il contratto prima di distribuirlo, quindi assicurati di aver letto le informazioni sulla [compilazione degli Smart Contract](/developers/docs/smart-contracts/compiling/).

## Come distribuire uno Smart Contract {#how-to-deploy-a-smart-contract}

### Cosa ti serve {#what-youll-need}

- bytecode del tuo contratto - viene generato attraverso la [compilazione](/developers/docs/smart-contracts/compiling/).
- Ether per il carburante – imposterai il limite di carburante come altre transazioni, quindi sappi che la distribuzione del contratto richiede molto più carburante di un semplice trasferimento di ETH.
- uno script o un plugin di distribuzione.
- Accedi a un [nodo di Ethereum](/developers/docs/nodes-and-clients/), eseguendone tuo autonomamente, connettendoti a un nodo pubblico oppure tramite una chiave API usando un [nodo di servizio](/developers/docs/nodes-and-clients/nodes-as-a-service/) come Infura o Alchemy.

### Passaggi per distribuire uno smart contract {#steps-to-deploy}

I passaggi specifici dipenderanno dagli strumenti utilizzati. Per esempio, dai un'occhiata alla [documentazione di Hardhat sulla distribuzione dei tuoi contratti](https://hardhat.org/guides/deploying.html) o alla [documentazione di Truffle su reti e distribuzione delle app](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment). Sono i due strumenti più popolari per la distribuzione di smart contract, che coinvolgono la scrittura di uno script per gestire le fasi di distribuzione.

Una volta distribuito, il contratto avrà un indirizzo Ethereum come gli altri [account](/developers/docs/accounts/).

## Strumenti correlati {#related-tools}

**Remix - _Remix IDE consente di sviluppare, distribuire e amministrare gli smart contract per Ethereum come le blockchain_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Simula, esegui il debug e monitora qualunque cosa su catene compatibili con l’EVM, con dati in tempo reale_**

- [tenderly.co](https://tenderly.co/)
- [Documenti](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentazione sulla distribuzione dei tuoi contratti](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle:** **_ ambiente di sviluppo, framework di test, pipeline di sviluppo e altri strumenti_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [Documentazione sulle reti e la distribuzione delle app](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## Tutorial correlati {#related-tutorials}

- [Deploying your first smart contract](/developers/tutorials/deploying-your-first-smart-contract/)_– Introduzione alla distribuzione del primo Smart Contract su una rete di test Ethereum._
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire uno Smart Contract da un contratto esistente e interagirvi._
- [How to downsize your contract size](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Come ridurre le dimensioni del contratto per mantenerlo sotto il limite e risparmiare carburante_

## Letture consigliate {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Distribuire i tuoi contratti Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)
- [Eseguire un nodo di Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
