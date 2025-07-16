---
title: Distribuire i contratti intelligenti
description:
lang: it
---

Devi distribuire il tuo contratto intelligente, affinché sia disponibile agli utenti di una rete di Ethereum.

Per distribuire un contratto intelligente, invii una transazione di Ethereum contenente il codice compilato del contratto intelligente, senza specificare alcun destinatario.

## Prerequisiti {#prerequisites}

Dovresti comprendere le [reti di Ethereum](/developers/docs/networks/), le [transazioni](/developers/docs/transactions/) e l'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/), prima di distribuire i contratti intelligenti.

Distribuire un contratto, inoltre, costa ether (ETH), poiché questi sono memorizzati sulla blockchain, quindi dovresti avere familiarità con [carburante e commissioni](/developers/docs/gas/) su Ethereum.

Infine, dovrai compilare il tuo contratto prima di distribuirlo, quindi, assicurati di aver letto a riguardo della [compilazione dei contratti intelligenti](/developers/docs/smart-contracts/compiling/).

## Come distribuire un contratto intelligente {#how-to-deploy-a-smart-contract}

### Cosa ti serve {#what-youll-need}

- Il bytecode del tuo contratto: è generato tramite la [compilazione](/developers/docs/smart-contracts/compiling/)
- ETH per gas: imposterai il limite di gas come per altre transazioni, quindi, sappi che la distribuzione del contratto necessita di molto più gasi di un semplice trasferimento di ETH
- uno script o un plugin di distribuzione.
- accesso a un [nodo Ethereum](/developers/docs/nodes-and-clients/) tramite esecuzione di un nodo personalizzato, connessione a un nodo pubblico o utilizzando una chiave API con un [servizio di nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Passaggi per distribuire un contratto intelligente {#steps-to-deploy}

I passaggi specifici richiesti dipenderanno dal quadro di sviluppo in questione. Ad esempio, puoi consultare la [documentazione di Hardhat sulla distribuzione dei tuoi contratti](https://hardhat.org/guides/deploying.html) o la [documentazione di Foundry sulla distribuzione e verifica di un contratto intelligente](https://book.getfoundry.sh/forge/deploying). Una volta distribuito, il tuo contratto avrà un indirizzo di Ethereum, come gli altri [conti](/developers/docs/accounts/), e potrà essere verificato utilizzando gli [strumenti di verifica del codice sorgente](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Strumenti correlati {#related-tools}

**Remix - _Remix IDE consente di sviluppare, distribuire e amministrare i contratti intelligenti per Ethereum, come le blockchain_**

- [Remix](https://remix.ethereum.org)

**Tenderly: _Piattaforma di sviluppo in Web3 che fornisce debug, osservabilità e blocchi di costruzione dell'infrastruttura per sviluppare, testare, monitorare e gestire i contratti intelligenti_**

- [tenderly.co](https://tenderly.co/)
- [Documenti](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentazione sulla distribuzione dei tuoi contratti](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Distribuisci con facilità qualsiasi contratto a qualsiasi catena che sia compatibile con EVM, utilizzando un singolo comando_**

- [Documentazione](https://portal.thirdweb.com/deploy/)

**Crossmint - _Piattaforma di sviluppo Web3 per imprese per distribuire contratti intelligenti, consentire i pagamenti con carte di credito e tra catene, e utilizzare le API per creare, distribuire, vendere, memorizzare e modificare i NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentazione](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutorial correlati {#related-tutorials}

- [Deploying your first smart contract](/developers/tutorials/deploying-your-first-smart-contract/): _Un'introduzione alla distribuzione del primo contratto su una rete di prova di Ethereum._
- [Hello World | smart contract tutorial](/developers/tutorials/hello-world-smart-contract/): _Un tutorial facile da seguire per creare e distribuire un contratto intelligente di base su Ethereum._
- [Interagire con gli altri contratti da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/): _Come distribuire un contratto intelligente da un contratto esistente e interagirvi._
- [How to downsize your contract size](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/): _Come ridurre le dimensioni del tuo contratto per mantenerlo sotto il limite e risparmiare carburante_

## Letture consigliate {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Distribuire i tuoi contratti Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Quadri di sviluppo](/developers/docs/frameworks/)
- [Eseguire un nodo di Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-service](/developers/docs/nodes-and-clients/nodes-as-a-service)
