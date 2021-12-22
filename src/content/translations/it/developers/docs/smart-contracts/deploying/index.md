---
title: Distribuzione di Smart Contract
description:
lang: it
sidebar: true
incomplete: true
---

Uno Smart Contract deve essere distribuito per essere a disposizione degli utenti di una rete Ethereum.

Per distribuire uno Smart Contract, si invia una transazione Ethereum che contiene il codice dello Smart Contract compilato senza specificare alcun destinatario.

## Prerequisiti {#prerequisites}

È necessario conoscere le [reti Ethereum](/developers/docs/networks/), le [transazioni](/developers/docs/transactions/) e l'[anatomia degli Smart Contract](/developers/docs/smart-contracts/anatomy/) prima di distribuire Smart Contract.

Distribuire un contratto costa inoltre ETH, quindi è necessario avere familiarità con [carburante e commissioni](/developers/docs/gas/) su Ethereum.

Infine, è necessario compilare il contratto prima di distribuirlo, quindi assicurati di aver letto le informazioni sulla [compilazione degli Smart Contract](/developers/docs/smart-contracts/compiling/).

## Come distribuire uno Smart Contract

Dovrai pagare una commissione sulla transazione, quindi assicurati di avere ETH.

### Cosa ti serve {#what-youll-need}

- bytecode del tuo contratto - viene generato attraverso la [compilazione](/developers/docs/smart-contracts/compiling/).
- Ether per il carburante – imposterai il limite di carburante come altre transazioni, quindi sappi che la distribuzione del contratto richiede molto più carburante di un semplice trasferimento di ETH.
- uno script o un plugin di distribuzione.
- accesso a un [nodo Ethereum](/developers/docs/nodes-and-clients/) tramite esecuzione di un nodo personalizzato, connessione a un nodo pubblico o utilizzando una chiave API con un servizio come Infura o Alchemy

Una volta distribuito, il contratto avrà un indirizzo Ethereum come gli altri [account](/developers/docs/accounts/).

## Strumenti correlati {#related-tools}

**Remix -** **_L'IDE Remix permette di sviluppare, distribuire e amministrare Smart Contract per la blockchain Ethereum._**

- [Remix](https://remix.ethereum.org)

** Tenderly -** **_Piattaforma per monitorare gli Smart Contract con rilevamento degli errori, avvisi, metriche delle prestazioni e dettagliate analisi dei contratti_**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

## Tutorial correlati {#related-tutorials}

- [Deploying your first smart contract](/developers/tutorials/deploying-your-first-smart-contract/)_– Introduzione alla distribuzione del primo Smart Contract su una rete di test Ethereum._
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire uno Smart Contract da un contratto esistente e interagirvi._
- [How to downsize your contract size](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Come ridurre le dimensioni del contratto per mantenerlo sotto il limite e risparmiare carburante_

## Letture consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati

- [Framework di sviluppo](/developers/docs/frameworks/)
