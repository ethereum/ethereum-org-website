---
title: Distribuire i contratti intelligenti
description: Impara a distribuire contratti intelligenti sulle reti Ethereum, inclusi prerequisiti, strumenti e passaggi di distribuzione.
lang: it
---

Devi distribuire il tuo contratto intelligente, affinché sia disponibile agli utenti di una rete di Ethereum.

Per distribuire un contratto intelligente, invii una transazione di Ethereum contenente il codice compilato del contratto intelligente, senza specificare alcun destinatario.

## Prerequisiti {#prerequisites}

Dovresti comprendere le [reti Ethereum](/developers/docs/networks/), le [transazioni](/developers/docs/transactions/) e [l'anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/) prima di distribuire i contratti intelligenti.

Anche la distribuzione di un contratto ha un costo in ether (ETH), poiché viene archiviato sulla blockchain, perciò dovresti avere familiarità con [gas e commissioni](/developers/docs/gas/) su Ethereum.

Infine, dovrai compilare il tuo contratto prima di distribuirlo, quindi assicurati di aver letto la documentazione sulla [compilazione dei contratti intelligenti](/developers/docs/smart-contracts/compiling/).

## Come distribuire un contratto intelligente {#how-to-deploy-a-smart-contract}

### Cosa ti servirà {#what-youll-need}

- Il bytecode del tuo contratto – questo è generato attraverso la [compilazione](/developers/docs/smart-contracts/compiling/)
- ETH per gas: imposterai il limite di gas come per altre transazioni, quindi, sappi che la distribuzione del contratto necessita di molto più gasi di un semplice trasferimento di ETH
- uno script o un plugin di distribuzione.
- accesso a un [nodo Ethereum](/developers/docs/nodes-and-clients/), eseguendone uno proprio, connettendosi a un nodo pubblico, o tramite una chiave API utilizzando un [servizio di nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Passaggi per distribuire un contratto intelligente {#steps-to-deploy}

I passaggi specifici richiesti dipenderanno dal quadro di sviluppo in questione. Ad esempio, puoi consultare la [documentazione di Hardhat sulla distribuzione dei tuoi contratti](https://hardhat.org/docs/tutorial/deploying) o la [documentazione di Foundry sulla distribuzione e la verifica di un contratto intelligente](https://book.getfoundry.sh/forge/deploying). Una volta distribuito, il contratto avrà un indirizzo Ethereum come gli altri [conti](/developers/docs/accounts/) e potrà essere verificato utilizzando gli [strumenti di verifica del codice sorgente](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Strumenti correlati {#related-tools}

**Remix - _Remix IDE consente di sviluppare, distribuire e amministrare contratti intelligenti per blockchain come Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Piattaforma di sviluppo Web3 che fornisce debugging, osservabilità e componenti di base dell'infrastruttura per sviluppare, testare, monitorare e gestire i contratti intelligenti_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentazione sulla distribuzione dei tuoi contratti](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Distribuisci con facilità qualsiasi contratto su qualsiasi catena compatibile con EVM, usando un singolo comando_**

- [Documentazione](https://portal.thirdweb.com/deploy/)

**Crossmint - _Piattaforma di sviluppo Web3 di livello enterprise per distribuire contratti intelligenti, abilitare pagamenti con carta di credito e cross-chain, e usare le API per creare, distribuire, vendere, memorizzare e modificare NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentazione](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Guide correlate {#related-tutorials}

- [Distribuzione del tuo primo contratto intelligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Un'introduzione alla distribuzione del tuo primo contratto intelligente su una rete di test di Ethereum._
- [Hello World | Guida sui contratti intelligenti](/developers/tutorials/hello-world-smart-contract/) _– Una guida facile da seguire per creare e distribuire un contratto intelligente di base su Ethereum._
- [Interagire con altri contratti da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire un contratto intelligente da un contratto esistente e interagire con esso._
- [Come ridurre le dimensioni del contratto](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Come ridurre le dimensioni del tuo contratto per mantenerlo al di sotto del limite e risparmiare sul gas_

## Letture consigliate {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Distribuire i tuoi contratti con Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)
- [Eseguire un nodo Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodi come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service)
