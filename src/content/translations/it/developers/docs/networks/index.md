---
title: Reti
description: Panoramica delle reti Ethereum e indicazioni su dove ottenere ether (ETH) per le reti di test per testare le applicazioni.
lang: it
---

Le reti sono ambienti Ethereum diversi ai quali si può accedere per sviluppare, testare o produrre. Poiché Ethereum è un protocollo, possono esistere diverse "reti" indipendenti conformi al protocollo senza che interagiscano tra loro.

Il tuo conto di Ethereum opererà su reti diverse, ma il saldo del tuo conto e lo storico delle transazioni non saranno riportati dalla Rete Principale di Ethereum. Per utilizzi di test è utile sapere quali reti sono disponibili e come ottenere ETH per le reti di prova per poter sperimentare. In generale, per considerazioni di sicurezza, è sconsigliato riutilizzare i conti della rete principale sulle reti di prova e viceversa.

## Prerequisiti {#prerequisites}

È consigliabile conoscere [le basi di Ethereum](/developers/docs/intro-to-ethereum/) prima di informarsi sulle diverse reti. Le reti di prova rappresentano una versione semplificata e sicura di Ethereum nella quale è possibile sperimentare.

## Reti pubbliche {#public-networks}

Le reti pubbliche sono accessibili da chiunque nel mondo abbia una connessione internet. Chiunque può leggere o creare transazioni su una blockchain pubblica e convalidare le transazioni che vengono eseguite. Il consenso tra peer decide sull'inclusione delle transazioni e lo stato della rete.

### Rete principale di Ethereum {#ethereum-mainnet}

La rete principale è la blockchain di produzione Ethereum pubblica primaria, dove le transazioni con valore reale vengono eseguite sul libro mastro distribuito.

Quando per persone e scambi si parla di prezzi in ETH, si parla di ETH della rete principale.

### Rete di prova di Ethereum {#ethereum-testnets}

Oltre alla rete principale, sono disponibili reti di test pubbliche. Queste, sono reti usate dagli sviluppatori di protocolli o contratti intelligenti per testare sia gli aggiornamenti del protocollo che i potenziali contratti intelligenti, in un ambiente simile a quello di produzione prima della distribuzione alla Rete Principale. In pratica, è analogo ad ambiente di produzione rispetto a server di staging.

Dovresti testare il codice di ogni contratto che scrivi su una rete di prova prima di distribuirlo alla rete principale. Tra le dApp che si integrano con contratti intelligenti esistenti, gran parte dei progetti hanno copie distribuite alle reti di prova.

La maggior parte delle reti di prova è partita utilizzando un meccanismo di consenso proof-of-authority autorizzato. Significa che viene scelto un ristretto numero di nodi per convalidare le transazioni e creare nuovi blocchi, e questi fanno staking con la propria identità in questo processo. In alternativa, alcune reti di prova presentano un meccanismo di consenso proof-of-stake aperto, in cui tutti possono fare prove di esecuzione di un validatore, proprio come sulla Rete Principale di Ethereum.

Gli ETH sulle reti di prova non hanno valore reale, quindi non c'è un mercato per gli ETH delle reti di prova. Siccome serviranno ETH per interagire con Ethereum, molti ottengono ETH delle reti di prova da faucet. La maggior parte dei faucet sono webapp dove è possibile inserire un indirizzo al quale verranno inviati gli ETH.

#### Quale rete di prova dovrei usare?

Le due reti di prova pubbliche che gli sviluppatori di client stanno mantenendo al momento sono Sepolia e Goerli. Sepolia è una rete per gli sviluppatori di contratti e applicazioni per testare le proprie applicazioni. La rete Goerli consente agli sviluppatori di protocolli di testare gli aggiornamenti della rete e agli staker di fare prove di esecuzione dei validatori.

#### Sepolia {#sepolia}

**Sepolia è la rete di prova predefinita consigliata per lo sviluppo di applicazioni**. La rete Sepolia utilizza una serie di validatori autorizzata. È abbastanza nuova, il che significa che sia il suo stato che la sua storia sono molto ridotti. Ciò significa che la rete è rapida da sincronizzare e che eseguire un nodo su di essa richiede una minore quantità d'archiviazione. Ciò è utile per gli utenti che desiderano avviare rapidamente un nodo e interagire direttamente con la rete.

- Serie di validatori chiusa, controllata dai team del client e di test
- Nuova rete di prova, meno applicazioni distribuite rispetto ad altre reti di prova
- Veloce da sincronizzare e l'esecuzione di un nodo richiede uno spazio minimo su disco

##### Risorse

- [Sito Web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Faucet

- [Faucet Sepolia QuickNode](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet Sepolia](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)
- [Faucet Coinbase Wallet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Faucet Alchemy Sepolia](https://sepoliafaucet.com/)
- [Faucet Infura Sepolia](https://www.infura.io/faucet)

#### Goerli _(supporto a lungo termine)_ {#goerli}

_Nota: [la rete di prova Goerli è obsoleta](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) e sarà sostituita da [Holesovice](https://github.com/eth-clients/holesovice) nel 2023. Sei pregato di considerare la migrazione delle tue applicazioni a Sepolia._

Goerli è la rete di prova per testare la convalida e lo staking. La rete Goerli è aperta per gli utenti che vogliono eseguire un validatore della rete di prova. Gli staker che desiderano testare gli aggiornamenti del protocollo prima che siano distribuiti sulla rete principale dovrebbero quindi utilizzare Goerli.

- Insieme di validatori aperto, gli staker possono testare gli aggiornamenti di rete
- Grandi dimensioni di stato, utile per testare complesse interazioni tra contratti intelligenti
- Più tempo per la sincronizzazione e richiede maggiore archiviazione per eseguire un nodo

##### Risorse

- [Sito web](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)

##### Faucet

- [Faucet Goerli QuickNode](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet PoW](https://goerli-faucet.pk910.de/)
- [Faucet Goerli](https://faucet.goerli.mudit.blog/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Alchemy Goerli](https://goerlifaucet.com/)
- [Faucet All That Node Goerli](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Faucet Coinbase Wallet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)

Per lanciare un Validatore sulla rete di prova Goerli, usa il ["cheap goerli validator" launchpad](https://goerli.launchpad.ethstaker.cc/en/) di ethstaker.

#### Rinkeby _(deprecata)_ {#rinkeby}

_Nota: [la rete di prova Rinkeby è obsoleta](https://blog.ethereum.org/2022/11/30/ropsten-shutdown-announcement) e non riceverà più aggiornamenti del protocollo. Sei pregato di considerare la migrazione delle tue applicazioni a Sepolia._

Una rete di prova proof-of-authority per coloro che eseguono versioni meno recenti del client di Geth.

##### Faucet

- [FaucETH](https://fauceth.komputing.org) (Faucet multi-catena che non necessita di un profilo social)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)

### Rete di prova del livello 2 {#layer-2-testnets}

[Livello 2 (Layer 2 – L2)](/layer-2/) è un termine collettivo per descrivere un insieme specifico di soluzioni di ridimensionamento di Ethereum. Un livello 2 è una blockchain separata che estende Ethereum ed eredita le garanzie di sicurezza di Ethereum. Solitamente le reti di prova di Livello 2 sono strettamente accoppiate alle reti di prova pubbliche di Ethereum.

#### Arbitrum Goerli {#arbitrum-goerli}

Una rete di prova per [Arbitrum](https://arbitrum.io/).

##### Faucet

- [Faucet Chainlink](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

Una rete di prova per [Optimism](https://www.optimism.io/).

##### Faucet

- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Coinbase Wallet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

## Reti private {#private-networks}

Una rete Ethereum è una rete privata se i relativi nodi non sono connessi a una rete pubblica (ossia Rete principale o una rete di prova). In questo contesto, privato significa solo riservato o isolato, e non protetto o sicuro.

### Reti di sviluppo {#development-networks}

Per sviluppare un'applicazione Ethereum, è consigliabile eseguirla prima su una rete privata per vedere come funziona prima di distribuirla. Come quando si crea un server locale sul computer per lo sviluppo web, è possibile creare un'istanza locale della blockchain per testare una dapp. Questo offre un'iterazione molto più veloce rispetto a una rete di prova pubblica.

Ci sono progetti e strumenti dedicati a questo scopo. Scopri di più sulle [reti di sviluppo](/developers/docs/development-networks/).

### Reti di consorzio {#consortium-networks}

Il processo di consenso è controllato da una serie predefinita di nodi considerati attendibili. Un esempio può essere una rete privata di istituti accademici noti, dove ogni istituto controlla un singolo nodo e i blocchi vengono convalidati da una soglia di firmatari all'interno della rete.

Se una rete Ethereum pubblica è come la rete Internet pubblica, una rete di consorzio è come una Intranet privata.

## Strumenti correlati {#related-tools}

- [Chainlist](https://chainlist.org/) _Elenco di reti EVM per connettere portafogli e fornitori all'ID della Catena e ID di Rete appropriati._
- [Catene basate su EVM](https://github.com/ethereum-lists/chains) _Repository di GitHub di metadati della catena che alimentano Chainlist._

## Letture consigliate {#further-reading}

- [Proposta: ciclo di vita prevedibile delle reti di prova di Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'evoluzione delle reti di prova di Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
