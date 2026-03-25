---
title: Distribuire i contratti intelligenti
description: Scopri come distribuire i contratti intelligenti sulle reti di Ethereum, inclusi i prerequisiti, gli strumenti e i passaggi per la distribuzione.
lang: it
---

Devi distribuire il tuo contratto intelligente affinché sia disponibile per gli utenti di una rete di Ethereum.

Per distribuire un contratto intelligente, devi semplicemente inviare una transazione di Ethereum contenente il codice compilato del contratto intelligente senza specificare alcun destinatario.

## Prerequisiti {#prerequisites}

Dovresti comprendere le [reti di Ethereum](/developers/docs/networks/), le [transazioni](/developers/docs/transactions/) e l'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/) prima di distribuire i contratti intelligenti.

Distribuire un contratto costa anche ether (ETH) poiché vengono archiviati sulla blockchain, quindi dovresti avere familiarità con il [gas e le commissioni](/developers/docs/gas/) su Ethereum.

Infine, dovrai compilare il tuo contratto prima di distribuirlo, quindi assicurati di aver letto la sezione sulla [compilazione dei contratti intelligenti](/developers/docs/smart-contracts/compiling/).

## Come distribuire un contratto intelligente {#how-to-deploy-a-smart-contract}

### Cosa ti servirà {#what-youll-need}

- Il bytecode del tuo contratto: viene generato tramite la [compilazione](/developers/docs/smart-contracts/compiling/)
- ETH per il gas: imposterai il tuo limite del gas come per le altre transazioni, quindi tieni presente che la distribuzione del contratto richiede molto più gas rispetto a un semplice trasferimento di ETH
- uno script o un plugin di distribuzione
- accesso a un [nodo di Ethereum](/developers/docs/nodes-and-clients/), eseguendone uno tuo, connettendoti a un nodo pubblico o tramite una chiave API utilizzando un [servizio di nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Passaggi per distribuire un contratto intelligente {#steps-to-deploy}

I passaggi specifici dipenderanno dal framework di sviluppo in questione. Ad esempio, puoi consultare la [documentazione di Hardhat sulla distribuzione dei tuoi contratti](https://hardhat.org/docs/tutorial/deploying) o la [documentazione di Foundry sulla distribuzione e verifica di un contratto intelligente](https://book.getfoundry.sh/forge/deploying). Una volta distribuito, il tuo contratto avrà un indirizzo di Ethereum come gli altri [account](/developers/docs/accounts/) e potrà essere verificato utilizzando [strumenti di verifica del codice sorgente](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Strumenti correlati {#related-tools}

**Remix - _L'IDE Remix consente di sviluppare, distribuire e amministrare contratti intelligenti per blockchain simili a Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Piattaforma di sviluppo web3 che fornisce debug, osservabilità e blocchi di costruzione dell'infrastruttura per sviluppare, testare, monitorare e gestire contratti intelligenti_**

- [tenderly.co](https://tenderly.co/)
- [Documentazione](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software per Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentazione sulla distribuzione dei tuoi contratti](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Distribuisci facilmente qualsiasi contratto su qualsiasi catena compatibile con l'EVM, utilizzando un singolo comando_**

- [Documentazione](https://portal.thirdweb.com/deploy/)

**Crossmint - _Piattaforma di sviluppo web3 di livello aziendale per distribuire contratti intelligenti, abilitare pagamenti con carta di credito e cross-chain, e utilizzare API per creare, distribuire, vendere, archiviare e modificare NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentazione](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutorial correlati {#related-tutorials}

- [Distribuire il tuo primo contratto intelligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Un'introduzione alla distribuzione del tuo primo contratto intelligente su una rete di test di Ethereum._
- [Hello World | tutorial sui contratti intelligenti](/developers/tutorials/hello-world-smart-contract/) _– Un tutorial facile da seguire per creare e distribuire un contratto intelligente di base su Ethereum._
- [Interagire con altri contratti da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire un contratto intelligente da un contratto esistente e interagirvi._
- [Come ridurre le dimensioni del tuo contratto](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Come ridurre le dimensioni del tuo contratto per mantenerlo sotto il limite e risparmiare sul gas_

## Letture consigliate {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Distribuire i tuoi contratti con Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)
- [Eseguire un nodo di Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodi come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service)