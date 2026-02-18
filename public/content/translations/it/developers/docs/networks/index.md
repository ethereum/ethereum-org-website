---
title: Reti
description: Panoramica delle reti Ethereum e indicazioni su dove ottenere ether (ETH) per le reti di prova per testare le applicazioni.
lang: it
---

Le reti di Ethereum sono gruppi di computer interconnessi che comunicano usando il protocollo di Ethereum. Esiste solo una Rete Principale di Ethereum, ma possono essere create delle reti indipendenti conformi alle stesse regole di protocollo per scopi di test e sviluppo. Esistono molte "reti" indipendenti conformi al protocollo che non interagiscono tra loro. Puoi perfino avviare una rete localmente sul tuo computer per testare i tuoi contratti intelligenti e le tue applicazioni web3.

Il tuo conto di Ethereum opererà su reti diverse, ma il saldo del tuo conto e lo storico delle transazioni non saranno riportati dalla Rete Principale di Ethereum. Per utilizzi di prova è utile sapere quali reti sono disponibili e come ottenere ETH per le reti di prova per poter sperimentare. In generale, per considerazioni di sicurezza, è sconsigliato riutilizzare i conti della rete principale sulle reti di prova e viceversa.

## Prerequisiti {#prerequisites}

Dovresti conoscere le [basi di Ethereum](/developers/docs/intro-to-ethereum/) prima di informarti sulle diverse reti, poiché le reti di test ti forniranno una versione economica e sicura di Ethereum con cui sperimentare.

## Reti pubbliche {#public-networks}

Le reti pubbliche sono accessibili da chiunque nel mondo abbia una connessione internet. Chiunque può leggere o creare transazioni su una blockchain pubblica e convalidare le transazioni che vengono eseguite. Il consenso tra peer decide sull'inclusione delle transazioni e lo stato della rete.

### Mainnet di Ethereum {#ethereum-mainnet}

La rete principale è la blockchain di produzione Ethereum pubblica primaria, dove le transazioni con valore reale vengono eseguite sul libro mastro distribuito.

Quando le persone e le piattaforme centralizzate parlano dei prezzi di ETH, essi parlano di ETH della rete principale.

### Reti di test di Ethereum {#ethereum-testnets}

Oltre alla rete principale, sono disponibili reti di prova pubbliche. Queste, sono reti usate dagli sviluppatori di protocolli o contratti intelligenti per testare sia gli aggiornamenti del protocollo che i potenziali contratti intelligenti, in un ambiente simile a quello di produzione prima della distribuzione alla Rete Principale. In pratica, è analogo ad ambiente di produzione rispetto a server di staging.

Dovresti testare il codice di ogni contratto che scrivi su una rete di prova prima di distribuirlo alla rete principale. Tra le dApp che si integrano con contratti intelligenti esistenti, gran parte dei progetti hanno copie distribuite alle reti di prova.

La maggior parte delle reti di prova è partita utilizzando un meccanismo di consenso proof-of-authority autorizzato. Significa che viene scelto un ristretto numero di nodi per convalidare le transazioni e creare nuovi blocchi, e questi fanno staking con la propria identità in questo processo. In alternativa, alcune reti di prova presentano un meccanismo di consenso proof-of-stake aperto, in cui tutti possono fare prove di esecuzione di un validatore, proprio come sulla Rete Principale di Ethereum.

Si presuppone che gli ETH sulla rete di prova non abbiano valore; tuttavia sono stati creati dei mercati per alcuni tipi di ETH su rete di prova che sono divenuti scarsi o difficili da ottenere. Poiché per interagire su Ethereum (anche sulle reti di prova) hai bisogno di ETH, la maggior parte delle persone prende gli ETH gratuitamente dai faucet. La maggior parte dei faucet sono webapp dove è possibile inserire un indirizzo al quale verranno inviati gli ETH.

#### Quale rete di prova dovrei usare?

Le due reti di test pubbliche che gli sviluppatori di client stanno attualmente mantenendo sono Sepolia e Hoodi. Sepolia è una rete per gli sviluppatori di contratti e applicazioni per testare le proprie applicazioni. La rete Hoodi consente agli sviluppatori di protocolli di testare gli aggiornamenti della rete e agli staker di provare l'esecuzione dei validatori.

#### Sepolia {#sepolia}

**Sepolia è la rete di prova predefinita consigliata per lo sviluppo di applicazioni**. La rete Sepolia usa un set di validatori autorizzati controllato dai team dei client e di testing.

##### Risorse

- [Sito web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucet

- [Faucet Sepolia di Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Faucet Sepolia di Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Faucet Sepolia di Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet dell'ecosistema Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Faucet Sepolia di ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet Sepolia Web3 di Google Cloud](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet Sepolia di Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet Sepolia di QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi è una rete di test per testare la validazione e lo staking. La rete Hoodi è aperta agli utenti che vogliono eseguire un validatore sulla rete di test. Gli staker che desiderano testare gli aggiornamenti del protocollo prima che vengano distribuiti sulla mainnet dovrebbero quindi usare Hoodi.

- Insieme di validatori aperto, gli staker possono testare gli aggiornamenti di rete
- Grandi dimensioni di stato, utile per testare complesse interazioni tra contratti intelligenti
- Più tempo per la sincronizzazione e richiede maggiore archiviazione per eseguire un nodo

##### Risorse

- [Sito web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Sincronizzazione checkpoint](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucet

- [Faucet Hoodi di Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet di Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery è un tipo unico di rete di test che si reimposta completamente ogni mese. Lo stato di esecuzione e di consenso torna alla genesi ogni 28 giorni, il che significa che tutto ciò che accade sulla rete di test è effimero. Questo la rende ideale per test a breve termine, bootstrap rapido dei nodi e applicazioni di tipo 'hello world' che non necessitano di permanenza.

- Stato sempre nuovo, test a breve termine di validatori e app
- Include solo un set di contratti di base
- Set di validatori aperto e facile accesso a grandi quantità di fondi
- Requisiti minimi per i nodi e sincronizzazione più rapida, &lt;5 GB in media

##### Risorse

- [Sito web](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat della community](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorer della Beacon](https://beaconlight.ephemery.dev/)
- [Sincronizzazione checkpoint](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucet

- [Faucet Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (deprecata) {#holesky}

La rete di test Holesky è deprecata da settembre 2025. Gli operatori di staking e i fornitori di infrastrutture dovrebbero invece utilizzare Hoodi per il test dei validatori.

- [Annuncio di chiusura della rete di test Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog di EF, 1 settembre 2025_
- [Aggiornamenti delle reti di test Holesky e Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _Blog di EF, 18 marzo 2025_

### Reti di test di livello 2 {#layer-2-testnets}

[Livello 2 (L2)](/layer-2/) è un termine collettivo per descrivere un insieme specifico di soluzioni di scalabilità di Ethereum. Un livello 2 è una blockchain separata che estende Ethereum ed eredita le garanzie di sicurezza di Ethereum. Solitamente le reti di prova di Livello 2 sono strettamente accoppiate alle reti di prova pubbliche di Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Una rete di test per [Arbitrum](https://arbitrum.io/).

##### Risorse

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucet

- [Faucet Arbitrum Sepolia di Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet Arbitrum Sepolia di Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet Arbitrum Sepolia di ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet Arbitrum Sepolia di QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Una rete di test per [Optimism](https://www.optimism.io/).

##### Risorse

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucet

- [Faucet di Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet di Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet Optimism Sepolia di ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet della rete di test](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Una rete di test per [Starknet](https://www.starknet.io).

##### Risorse

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucet

- [Faucet di Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet Starknet Sepolia di Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet di Starknet](https://starknet-faucet.vercel.app/)

## Reti private {#private-networks}

Una rete Ethereum è una rete privata se i suoi nodi non sono connessi a una rete pubblica (ad esempio, la Mainnet o una rete di test). In questo contesto, privato significa solo riservato o isolato, e non protetto o sicuro.

### Reti di sviluppo {#development-networks}

Per sviluppare un'applicazione Ethereum, è consigliabile eseguirla prima su una rete privata per vedere come funziona prima di distribuirla. Come quando si crea un server locale sul computer per lo sviluppo web, è possibile creare un'istanza locale della blockchain per testare una dapp. Questo offre un'iterazione molto più veloce rispetto a una rete di prova pubblica.

Ci sono progetti e strumenti dedicati a questo scopo. Scopri di più sulle [reti di sviluppo](/developers/docs/development-networks/).

### Reti di consorzio {#consortium-networks}

Il processo di consenso è controllato da una serie predefinita di nodi considerati attendibili. Un esempio può essere una rete privata di istituti accademici noti, dove ogni istituto controlla un singolo nodo e i blocchi vengono convalidati da una soglia di firmatari all'interno della rete.

Se una rete Ethereum pubblica è come la rete Internet pubblica, una rete di consorzio è come una Intranet privata.

## <Emoji text="🚉" /> Perché le reti di test di Ethereum prendono il nome dalle stazioni della metropolitana? {#why-naming}

Molte reti di test di Ethereum prendono il nome da stazioni della metropolitana o ferroviarie del mondo reale. Questa tradizione di denominazione è iniziata presto e riflette le città globali in cui i contributori hanno vissuto o lavorato. È simbolico, memorabile e pratico. Proprio come le reti di test sono isolate dalla mainnet di Ethereum, le linee della metropolitana sono separate dal traffico di superficie.

### <Emoji text="🚧" /> Reti di test di uso comune e legacy {#common-and-legacy-testnets}

- **Sepolia** - Un quartiere collegato alla metropolitana di Atene, in Grecia. Attualmente usata per il test di contratti intelligenti e dApp.
- **Hoodi** - Prende il nome dalla stazione della metropolitana Hoodi di Bangalore, in India. Usata per il test dei validatori e degli aggiornamenti del protocollo.
- **Goerli** _(deprecata)_ - Prende il nome da Görlitzer Bahnhof a Berlino, in Germania.
- **Rinkeby** _(deprecata)_ - Prende il nome da un sobborgo di Stoccolma con una stazione della metropolitana.
- **Ropsten** _(deprecata)_ - Si riferisce a un'area e a un ex terminal di traghetti/metropolitana di Stoccolma.
- **Kovan** _(deprecata)_ - Prende il nome da una stazione MRT di Singapore.
- **Morden** _(deprecata)_ - Prende il nome da una stazione della metropolitana di Londra. La prima rete di test pubblica di Ethereum.

### <Emoji text="🧪" /> Altre reti di test specializzate {#other-testnets}

Alcune reti di test sono state create per test a breve termine o specifici per gli aggiornamenti e non sono necessariamente a tema metropolitano:

- **Holesky** _(deprecata)_ - Prende il nome dalla stazione Holešovice di Praga. Usata per il test dei validatori; deprecata nel 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tutte deprecate)_ e **Ephemery** - Create appositamente per simulazioni di aggiornamenti come La Fusione, Shanghai o esperimenti sui validatori. Alcuni nomi sono regionali o tematici piuttosto che basati sulla metropolitana.

L'utilizzo dei nomi delle stazioni della metropolitana aiuta gli sviluppatori a identificare e ricordare rapidamente le reti di test senza dover fare affidamento su ID di catena numerici. Riflette anche la cultura di Ethereum: pratica, globale e incentrata sull'uomo.

## Strumenti correlati {#related-tools}

- [Chainlist](https://chainlist.org/) _elenco di reti EVM per connettere portafogli e provider all'ID Catena e all'ID Rete appropriati_
- [Catene basate su EVM](https://github.com/ethereum-lists/chains) _repository GitHub di metadati delle catene che alimenta Chainlist_

## Letture consigliate {#further-reading}

- [Proposta: ciclo di vita prevedibile della rete di test di Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'evoluzione delle reti di test di Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
