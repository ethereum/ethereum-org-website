---
title: Reti
description: Panoramica delle reti Ethereum e indicazioni su dove ottenere ether (ETH) per le reti di test per testare le applicazioni.
lang: it
sidebar: true
---

Ethereum è un protocollo, pertanto ci possono essere diverse reti indipendenti conformi a questo protocollo che non interagiscono tra di loro.

Le reti sono ambienti Ethereum diversi ai quali si può accedere per sviluppare, testare o produrre. Un account Ethereum funzionerà su reti diverse ma il saldo dell'account e la cronologia delle transazioni non verranno riportati dalla rete Ethereum principale. Per utilizzi di test è utile sapere quali reti sono disponibili e come ottenere ETH per le reti di prova per poter sperimentare.

## Prerequisiti {#prerequisites}

È consigliabile conoscere le basi di Ethereum prima di informarsi sulle diverse reti. Le reti di test rappresentano una versione semplificata e sicura di Ethereum nella quale è possibile sperimentare. Consulta la nostra [introduzione ad Ethereum](/developers/docs/intro-to-ethereum/).

## Reti pubbliche {#public-networks}

Le reti pubbliche sono accessibili da chiunque nel mondo abbia una connessione internet. Chiunque può leggere o creare transazioni su una blockchain pubblica e convalidare le transazioni che vengono eseguite. L'accordo sulle transazioni e sullo stato della rete è deciso tramite un consenso tra pari.

### Rete principale {#mainnet}

La rete principale è la blockchain di produzione Ethereum pubblica primaria, dove le transazioni con valore reale vengono eseguite sul libro mastro distribuito.

Quando per persone e scambi si parla di prezzi in ETH, si parla di ETH della rete principale.

### Reti di test {#testnets}

Oltre alla rete principale, sono disponibili reti di test pubbliche. Si tratta di reti utilizzate da sviluppatori di protocolli o di Smart Contract per testare sia gli aggiornamenti del protocollo che potenziali Smart Contract in un ambiente simile a quello di produzione prima della distribuzione sulla rete principale. In pratica, è analogo ad ambiente di produzione rispetto a server di staging.

In genere è importante testare il codice di un contratto su una rete di prova prima di distribuirlo sulla rete principale. Se crei dapp che si integrano con gli Smart Contract esistenti, la maggior parte dei progetti ha copie distribuite sulle reti di prova con le quali è possibile interagire.

La maggior parte delle reti di prova utilizza un meccanismo di consenso proof-of-authority. Significa che viene scelto un ristretto numero di nodi per convalidare le transazioni e creare nuovi blocchi, e questi fanno staking con la propria identità in questo processo. È difficile incentivare il mining su una rete di prova con meccanismo proof-of-work, e questo potrebbe renderla vulnerabile.

#### Görli {#goerli}

Rete di prova di tipo proof-of-authority che funziona su client.

#### Kovan {#kovan}

Rete di prova proof-of-authority per client che eseguono OpenEthereum.

#### Rinkeby {#rinkeby}

Rete di prova proof-of-authority per chi esegue client Geth.

#### Ropsten {#ropsten}

Rete di prova proof-of-work. Significa che è la rappresentazione più simile a Ethereum.

### Faucet della rete di prova {#testnet-faucets}

Gli ETH sulle reti di prova non hanno valore reale, quindi non c'è un mercato per gli ETH delle reti di prova. Siccome serviranno ETH per interagire con Ethereum, molti ottengono ETH delle reti di prova da faucet. La maggior parte dei faucet sono webapp dove è possibile inserire un indirizzo al quale verranno inviati gli ETH.

- [Faucet Görli](https://faucet.goerli.mudit.blog/)
- [Faucet Kovan](https://faucet.kovan.network/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)
- [Faucet Ropsten](https://faucet.ropsten.be/)

## Reti private {#private-networks}

Una rete Ethereum è una rete privata se i relativi nodi non sono collegati a una rete pubblica (ad esempio la rete principale o una rete di prova). In questo contesto, privato significa solo riservato o isolato, e non protetto o sicuro.

### Reti di sviluppo {#development-networks}

Per sviluppare un'applicazione Ethereum, è consigliabile eseguirla prima su una rete privata per vedere come funziona prima di distribuirla. Analogamente a come si crea un server locale sul computer per lo sviluppo Web, è possibile creare un'istanza locale della blockchain per testare una dapp. Questo offre un'interazione molto più veloce rispetto a una rete di prova pubblica.

Ci sono progetti e strumenti dedicati a questo scopo. Scopri di più sulle [reti di sviluppo](/developers/docs/development-networks/).

### Reti di consorzio {#consortium-networks}

Il processo di consenso è controllato da un set di nodi predefinito considerati attendibili. Un esempio può essere una rete privata di istituti accademici noti, dove ogni istituto controlla un nodo singolo e i blocchi vengono convalidati da una soglia di firmatari all'interno della rete.

Se una rete Ethereum pubblica è come la rete Internet pubblica, un consorzio può essere paragonato a una Intranet privata.

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
