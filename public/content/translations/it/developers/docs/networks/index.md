---
title: Reti
description: Una panoramica delle reti di Ethereum e dove ottenere ether (ETH) della rete di test per testare la tua applicazione.
lang: it
---

Le reti di [Ethereum](/) sono gruppi di computer connessi che comunicano utilizzando il protocollo di Ethereum. Esiste una sola rete principale (Mainnet) di Ethereum, ma possono essere create reti indipendenti conformi alle stesse regole del protocollo per scopi di test e sviluppo. Esistono molte "reti" indipendenti che si conformano al protocollo senza interagire tra loro. Puoi persino avviarne una localmente sul tuo computer per testare i tuoi contratti intelligenti e le tue app web3.

Il tuo account di Ethereum funzionerà su diverse reti, ma il saldo del tuo account e la cronologia delle transazioni non verranno trasferiti dalla rete principale di Ethereum. A scopo di test, è utile sapere quali reti sono disponibili e come ottenere ETH della rete di test per fare delle prove. In generale, per motivi di sicurezza, non è consigliato riutilizzare gli account della rete principale sulle reti di test o viceversa.

## Prerequisiti {#prerequisites}

Dovresti comprendere le [basi di Ethereum](/developers/docs/intro-to-ethereum/) prima di informarti sulle diverse reti, poiché le reti di test ti forniranno una versione economica e sicura di Ethereum con cui fare delle prove.

## Reti pubbliche {#public-networks}

Le reti pubbliche sono accessibili a chiunque nel mondo disponga di una connessione internet. Chiunque può leggere o creare transazioni su una blockchain pubblica e validare le transazioni in esecuzione. Il consenso tra i pari decide sull'inclusione delle transazioni e sullo stato della rete.

### Rete principale di Ethereum {#ethereum-mainnet}

La rete principale è la blockchain di produzione pubblica primaria di Ethereum, dove avvengono transazioni di valore reale sul registro distribuito.

Quando le persone e gli exchange discutono dei prezzi dell'ETH, parlano dell'ETH della rete principale.

### Reti di test di Ethereum {#ethereum-testnets}

Oltre alla rete principale, esistono reti di test pubbliche. Queste sono reti utilizzate dagli sviluppatori del protocollo o dagli sviluppatori di contratti intelligenti per testare sia gli aggiornamenti del protocollo sia i potenziali contratti intelligenti in un ambiente simile a quello di produzione prima della distribuzione sulla rete principale. Pensalo come un analogo dei server di produzione rispetto a quelli di staging.

Dovresti testare qualsiasi codice di contratto che scrivi su una rete di test prima di distribuirlo sulla rete principale. Tra le dApp che si integrano con i contratti intelligenti esistenti, la maggior parte dei progetti ha copie distribuite sulle reti di test.

La maggior parte delle reti di test è iniziata utilizzando un meccanismo di consenso proof-of-authority autorizzato. Ciò significa che un piccolo numero di nodi viene scelto per validare le transazioni e creare nuovi blocchi, mettendo in staking la propria identità nel processo. In alternativa, alcune reti di test presentano un meccanismo di consenso di prova di stake aperto in cui tutti possono testare l'esecuzione di un validatore, proprio come nella rete principale di Ethereum.

Si suppone che l'ETH sulle reti di test non abbia alcun valore reale; tuttavia, sono stati creati mercati per alcuni tipi di ETH della rete di test che sono diventati scarsi o difficili da ottenere. Poiché hai bisogno di ETH per interagire effettivamente con Ethereum (anche sulle reti di test), la maggior parte delle persone ottiene gratuitamente ETH della rete di test dai rubinetti. La maggior parte dei rubinetti sono app web in cui puoi inserire un indirizzo a cui richiedere l'invio di ETH.

#### Quale rete di test dovrei usare?

Le due reti di test pubbliche che gli sviluppatori di client stanno attualmente mantenendo sono Sepolia e Hoodi. Sepolia è una rete per gli sviluppatori di contratti e applicazioni per testare le loro applicazioni. La rete Hoodi consente agli sviluppatori del protocollo di testare gli aggiornamenti della rete e agli staker di testare l'esecuzione dei validatori.

#### Sepolia {#sepolia}

**Sepolia è la rete di test predefinita consigliata per lo sviluppo di applicazioni**. La rete Sepolia utilizza un set di validatori autorizzato controllato dai team di client e di test.

##### Risorse

- [Sito web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Rubinetti

- [Rubinetto Sepolia di Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Rubinetto Sepolia di Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Rubinetto Sepolia di Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Rubinetto dell'Ecosistema Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Rubinetto Sepolia di ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Rubinetto Sepolia Web3 di Google Cloud](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Rubinetto Sepolia di Infura](https://www.infura.io/faucet)
- [Rubinetto PoW](https://sepolia-faucet.pk910.de/)
- [Rubinetto Sepolia di QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi è una rete di test per testare la validazione e lo staking. La rete Hoodi è aperta agli utenti che desiderano eseguire un validatore della rete di test. Gli staker che desiderano testare gli aggiornamenti del protocollo prima che vengano distribuiti sulla rete principale dovrebbero quindi utilizzare Hoodi.

- Set di validatori aperto, gli staker possono testare gli aggiornamenti della rete
- Stato di grandi dimensioni, utile per testare interazioni complesse di contratti intelligenti
- Più lungo da sincronizzare e richiede più spazio di archiviazione per eseguire un nodo

##### Risorse

- [Sito web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Esploratore](https://explorer.hoodi.ethpandaops.io/)
- [Sincronizzazione Checkpoint](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Rubinetti

- [Rubinetto Hoodi di Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Rubinetto Hoodi](https://hoodi.ethpandaops.io/)
- [Rubinetto PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery è un tipo unico di rete di test che si ripristina completamente ogni mese. Lo stato di esecuzione e di consenso ritorna alla genesi ogni 28 giorni, il che significa che tutto ciò che accade sulla rete di test è effimero. Questo la rende ideale per test a breve termine, avvio rapido dei nodi e applicazioni di tipo 'hello world' che non necessitano di permanenza.

- Stato sempre nuovo, test a breve termine di validatori e app
- Include solo un set di base di contratti
- Set di validatori aperto e facile accesso a grandi quantità di fondi
- Requisiti del nodo minimi e sincronizzazione più rapida, &lt;5GB in media

##### Risorse

- [Sito web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat della community](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Esploratore Beacon](https://beaconlight.ephemery.dev/)
- [Sincronizzazione Checkpoint](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Rubinetti

- [Rubinetto Bordel](https://faucet.bordel.wtf/)
- [Rubinetto PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (deprecata) {#holesky}

La rete di test Holesky è deprecata a partire da settembre 2025. Gli operatori di staking e i fornitori di infrastrutture dovrebbero invece utilizzare Hoodi per i test dei validatori.

- [Annuncio della chiusura della rete di test Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1 settembre 2025_
- [Aggiornamenti sulle reti di test Holesky e Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog EF, 18 marzo 2025_

### Reti di test di livello 2 {#layer-2-testnets}

[Livello 2 (L2)](/layer-2/) è un termine collettivo per descrivere un insieme specifico di soluzioni di scalabilità di Ethereum. Un livello 2 è una blockchain separata che estende Ethereum e ne eredita le garanzie di sicurezza. Le reti di test di livello 2 sono solitamente strettamente accoppiate alle reti di test pubbliche di Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Una rete di test per [Arbitrum](https://arbitrum.io/).

##### Risorse

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Rubinetti

- [Rubinetto Arbitrum Sepolia di Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Rubinetto Arbitrum Sepolia di Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Rubinetto Arbitrum Sepolia di ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Rubinetto Arbitrum Sepolia di QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Una rete di test per [Optimism](https://www.optimism.io/).

##### Risorse

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Rubinetti

- [Rubinetto di Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Rubinetto di Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Rubinetto Optimism Sepolia di ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Rubinetto della rete di test](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Una rete di test per [Starknet](https://www.starknet.io).

##### Risorse

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Rubinetti

- [Rubinetto di Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Rubinetto Starknet Sepolia di Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Rubinetto di Starknet](https://starknet-faucet.vercel.app/)

## Reti private {#private-networks}

Una rete di Ethereum è una rete privata se i suoi nodi non sono connessi a una rete pubblica (ovvero, la rete principale o una rete di test). In questo contesto, privato significa solo riservato o isolato, piuttosto che protetto o sicuro.

### Reti di sviluppo {#development-networks}

Per sviluppare un'applicazione di Ethereum, vorrai eseguirla su una rete privata per vedere come funziona prima di distribuirla. Similmente a come crei un server locale sul tuo computer per lo sviluppo web, puoi creare un'istanza locale della blockchain per testare la tua dApp. Questo consente un'iterazione molto più rapida rispetto a una rete di test pubblica.

Ci sono progetti e strumenti dedicati per assistere in questo. Scopri di più sulle [reti di sviluppo](/developers/docs/development-networks/).

### Reti di consorzio {#consortium-networks}

Il processo di consenso è controllato da un set predefinito di nodi considerati attendibili. Ad esempio, una rete privata di istituzioni accademiche note che governano ciascuna un singolo nodo, e i blocchi vengono validati da una soglia di firmatari all'interno della rete.

Se una rete pubblica di Ethereum è come l'internet pubblico, una rete di consorzio è come un'intranet privata.

## <Emoji text="🚉" /> Perché le reti di test di Ethereum prendono il nome dalle stazioni della metropolitana? {#why-naming}

Molte reti di test di Ethereum prendono il nome da stazioni della metropolitana o dei treni del mondo reale. Questa tradizione di denominazione è iniziata presto e riflette le città globali in cui i contributori hanno vissuto o lavorato. È simbolica, memorabile e pratica. Proprio come le reti di test sono isolate dalla rete principale di Ethereum, le linee della metropolitana corrono separatamente dal traffico di superficie.

### <Emoji text="🚧" /> Reti di test comunemente usate e legacy {#common-and-legacy-testnets}

- **Sepolia** - Un quartiere collegato alla metropolitana ad Atene, in Grecia. Attualmente utilizzata per i test di contratti intelligenti e dApp.
- **Hoodi** - Prende il nome dalla stazione della metropolitana Hoodi a Bengaluru, in India. Utilizzata per i test dei validatori e degli aggiornamenti del protocollo.
- **Goerli** _(deprecata)_ - Prende il nome dalla Görlitzer Bahnhof a Berlino, in Germania.
- **Rinkeby** _(deprecata)_ - Prende il nome da un sobborgo di Stoccolma con una stazione della metropolitana.
- **Ropsten** _(deprecata)_ - Si riferisce a un'area e a un ex terminal di traghetti/metropolitana a Stoccolma.
- **Kovan** _(deprecata)_ - Prende il nome da una stazione MRT di Singapore.
- **Morden** _(deprecata)_ - Prende il nome da una stazione della metropolitana di Londra. La prima rete di test pubblica di Ethereum.

### <Emoji text="🧪" /> Altre reti di test specializzate {#other-testnets}

Alcune reti di test sono state create per test a breve termine o specifici per gli aggiornamenti e non sono necessariamente a tema metropolitana:

- **Holesky** _(deprecata)_ - Prende il nome dalla stazione di Holešovice a Praga. Utilizzata per i test dei validatori; deprecata nel 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tutte deprecate)_ ed **Ephemery** - Costruite appositamente per simulazioni di aggiornamenti come The Merge, Shanghai o esperimenti sui validatori. Alcuni nomi sono regionali o tematici piuttosto che basati sulla metropolitana.

L'uso dei nomi delle stazioni della metropolitana aiuta gli sviluppatori a identificare e ricordare rapidamente le reti di test senza dover fare affidamento su ID di catena numerici. Riflette anche la cultura di Ethereum: pratica, globale e incentrata sull'uomo.

## Strumenti correlati {#related-tools}

- [Chainlist](https://chainlist.org/) _elenco di reti EVM per connettere portafogli e provider all'ID di catena e all'ID di rete appropriati_
- [Catene basate su EVM](https://github.com/ethereum-lists/chains) _repository GitHub di metadati delle catene che alimenta Chainlist_

## Letture consigliate {#further-reading}

- [Proposta: Ciclo di vita prevedibile delle reti di test di Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'evoluzione delle reti di test di Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)