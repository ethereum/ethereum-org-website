---
title: Reti
description: Panoramica delle reti Ethereum e indicazioni su dove ottenere ether (ETH) per le reti di test per testare le applicazioni.
lang: it
sidebar: true
preMergeBanner: true
---

Le reti sono ambienti Ethereum diversi ai quali si può accedere per sviluppare, testare o produrre. Poiché Ethereum è un protocollo, possono esistere diverse "reti" indipendenti conformi al protocollo senza che interagiscano tra loro.

Un account Ethereum funzionerà su reti diverse ma il saldo dell'account e la cronologia delle transazioni non verranno riportati dalla rete Ethereum principale. Per utilizzi di test è utile sapere quali reti sono disponibili e come ottenere ETH per le reti di prova per poter sperimentare.

## Prerequisiti {#prerequisites}

È consigliabile conoscere [le basi di Ethereum](/developers/docs/intro-to-ethereum/) prima di informarsi sulle diverse reti. Le reti di prova rappresentano una versione semplificata e sicura di Ethereum nella quale è possibile sperimentare.

## Reti pubbliche {#public-networks}

Le reti pubbliche sono accessibili da chiunque nel mondo abbia una connessione internet. Chiunque può leggere o creare transazioni su una blockchain pubblica e convalidare le transazioni che vengono eseguite. Il consenso tra peer decide sull'inclusione delle transazioni e lo stato della rete.

### Rete principale di Ethereum {#ethereum-mainnet}

La rete principale è la blockchain di produzione Ethereum pubblica primaria, dove le transazioni con valore reale vengono eseguite sul libro mastro distribuito.

Quando per persone e scambi si parla di prezzi in ETH, si parla di ETH della rete principale.

### Rete di prova di Ethereum {#ethereum-testnets}

Oltre alla rete principale, sono disponibili reti di test pubbliche. Si tratta di reti utilizzate da sviluppatori di protocolli o di Smart Contract per testare sia gli aggiornamenti del protocollo che potenziali Smart Contract in un ambiente simile a quello di produzione prima della distribuzione sulla rete principale. In pratica, è analogo ad ambiente di produzione rispetto a server di staging.

Dovresti testare il codice di ogni contratto che scrivi su una rete di prova prima di distribuirlo alla rete principale. Tra le dApp che si integrano con contratti intelligenti esistenti, gran parte dei progetti hanno copie distribuite alle reti di prova.

La maggior parte delle reti di prova utilizza un meccanismo di consenso Proof of Authority. Significa che viene scelto un ristretto numero di nodi per convalidare le transazioni e creare nuovi blocchi, e questi fanno staking con la propria identità in questo processo. Le reti di prova non incentivano il mining di proof-of-work, e questo può renderle vulnerabili.

All'avvicinarsi della [Fusione](/upgrades/merge), molte delle reti di prova proof-of-work e proof-of-authority stanno diventando proof-of-stake. Il cambiamento dei loro meccanismi di consenso serve come prova per la fusione della rete principale di Ethereum. Ropsten, Sepolia e Goerli dovrebbero divenire reti proof-of-stake per la fine dell'estate 2022, e Goerli sarà mantenuta a lungo termine.

Gli ETH sulle reti di prova non hanno valore reale, quindi, non esiste un mercato per gli ETH delle reti di prova. Siccome serviranno ETH per interagire con Ethereum, molti ottengono ETH delle reti di prova dai faucet. La maggior parte dei faucet sono webapp dove è possibile inserire un indirizzo al quale verranno inviati gli ETH.

#### Sepolia {#sepolia}

Una rete di prova proof-of-work; questo significa che è la rappresentazione più simile ad Ethereum. Sepolia dovrebbe subire La Fusione al proof-of-stake nell'estate 2022. Non è sicuro se sarà mantenuta a lungo termine.

- [Sito Web](https://sepolia.dev/)
- [GitHub](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Faucet di Sepolia

- [Faucet di Sepolia](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)

#### Goerli {#goerli}

Una rete di prova proof-of-authority trasversale ai client; una rete di prova ideale per gli sviluppatori di applicazioni. Goerli sarà la rete di prova finale fusa al proof-of-stake prima della fusione della rete principale di Ethereum. Questo dovrebbe avvenire nell'estate 2022. Goerli dovrebbe esser mantenuta a lungo termine come rete di prova proof-of-stake.

- [Sito Web](https://goerli.net/)
- [GitHub](https://github.com/goerli/testnet)
- [Etherscan](https://goerli.etherscan.io)

##### Faucet di Goerli

- [Faucet di Goerli](https://faucet.goerli.mudit.blog/)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Alchemy Goerli](https://goerlifaucet.com/)

#### Ropsten _(deprecata)_ {#ropsten}

_Nota, [la rete di prova di Ropsten è obsoleta](https://github.com/ethereum/pm/issues/460) e non riceverà più aggiornamenti del protocollo. Sei pregato di considerare la migrazione delle tue applicazioni a Sepolia o Goerli._

Ropsten era una rete di prova proof-of-work che ha subito La Fusione al proof-of-stake a maggio 2022. È utilizzabile per testare le applicazioni su una rete che ha subito la fusione, ma non dovrebbe esser mantenuta a lungo termine e potrebbe esser deprecata prima dell'estate 2023.

##### Faucet Ropsten

- [FaucETH](https://fauceth.komputing.org) (Faucet multi-catena che non necessita di un profilo social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Rinkeby _(deprecata)_ {#rinkeby}

_Nota: [la rete di prova di Rinkeby è obsoleta](https://github.com/ethereum/pm/issues/460) e non riceverà più aggiornamenti del protocollo. Sei pregato di considerare la migrazione delle tue applicazioni a Sepolia o Goerli._

Una rete di prova proof-of-authority per coloro che eseguono versioni meno recenti del client di Geth.

##### Faucet Rinkeby

- [FaucETH](https://fauceth.komputing.org) (Faucet multi-catena che non necessita di un profilo social)
- [Faucet Alchemy](https://RinkebyFaucet.com)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)

#### Kovan _(obsoleta)_ {#kovan}

_Nota, [la rete di prova di Kovan è obsoleta](https://github.com/ethereum/pm/issues/460) e non riceverà più aggiornamenti del protocollo. Sei pregato di considerare la migrazione delle tue applicazioni a Sepolia o Goerli._

Una rete di prova proof-of-authority molto vecchia per coloro che eseguono ancora client di OpenEthereum.

##### Faucet Kovan

- [FaucETH](https://fauceth.komputing.org) (Faucet multi-catena che non necessita di un profilo social)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

### Rete di prova del livello 2 {#layer-2-testnets}

[Livello 2 (Layer 2 – L2)](/layer-2/) è un termine collettivo per descrivere un insieme specifico di soluzioni di scalabilità di Ethereum. Un livello 2 è una blockchain separata che estende Ethereum ed eredita le garanzie di sicurezza di Ethereum. Solitamente le reti di prova di Livello 2 sono strettamente accoppiate alle reti di prova pubbliche di Ethereum.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

Una rete di prova per [Arbitrum](https://arbitrum.io/).

Faucet Arbitrum Rinkeby:

- [FaucETH](https://fauceth.komputing.org) (Faucet multi-catena che non necessita di un profilo social)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

Una rete di prova per [Optimism](https://www.optimism.io/).

Faucet Optimistic Kovan:

- [FaucETH](https://fauceth.komputing.org) (Faucet multi-catena che non necessita di un profilo social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

## Reti private {#private-networks}

Una rete di Ethereum è una rete privata se i relativi nodi non sono connessi a una rete pubblica (es. rete principale o una rete di prova). In questo contesto, privato significa solo riservato o isolato, e non protetto o sicuro.

### Reti di sviluppo {#development-networks}

Per sviluppare un'applicazione Ethereum, è consigliabile eseguirla prima su una rete privata per vedere come funziona prima di distribuirla. Come quando si crea un server locale sul computer per lo sviluppo web, è possibile creare un'istanza locale della blockchain per testare una dApp. Questo offre un'interazione molto più veloce rispetto a una rete di prova pubblica.

Ci sono progetti e strumenti dedicati a questo scopo. Scopri di più sulle [reti di sviluppo](/developers/docs/development-networks/).

### Reti di consorzio {#consortium-networks}

Il processo di consenso è controllato da un set di nodi predefinito considerati attendibili. Un esempio può essere una rete privata di istituti accademici noti, dove ogni istituto controlla un nodo singolo e i blocchi vengono convalidati da una soglia di firmatari all'interno della rete.

Se una rete pubblica di Ethereum è come l'Internet pubblico, una rete di consorzio è come una intranet privata.

## Strumenti correlati {#related-tools}

- [Chainlist](https://chainlist.org/) _Elenco di reti EVM per connettere portafogli e fornitori all'ID della Catena e ID di Rete appropriati._
- [Catene basate su EVM](https://github.com/ethereum-lists/chains) _Repository di GitHub di metadati della catena che alimentano Chainlist._

## Lettura consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
