---
title: Reti
description: Una panoramica delle reti di Ethereum e dove ottenere ether (ETH) della testnet per testare la tua applicazione.
lang: it
---

Le reti di [Ethereum](/) sono gruppi di computer connessi che comunicano utilizzando il protocollo Ethereum. Esiste una sola Mainnet di Ethereum, ma è possibile creare reti indipendenti conformi alle stesse regole del protocollo per scopi di test e sviluppo. Esistono molte "reti" indipendenti che si conformano al protocollo senza interagire tra loro. Puoi persino avviarne una localmente sul tuo computer per testare i tuoi smart contract e le tue app Web3.

Il tuo account Ethereum funzionerà su diverse reti, ma il saldo del tuo account e la cronologia delle transazioni non verranno trasferiti dalla rete principale di Ethereum. A scopo di test, è utile sapere quali reti sono disponibili e come ottenere ETH della testnet per fare delle prove. In generale, per motivi di sicurezza, non è consigliabile riutilizzare gli account della Mainnet sulle testnet o viceversa.

## Prerequisiti {#prerequisites}

Dovresti comprendere le [basi di Ethereum](/developers/docs/intro-to-ethereum/) prima di informarti sulle diverse reti, poiché le reti di test ti forniranno una versione economica e sicura di Ethereum con cui fare pratica.

## Reti pubbliche {#public-networks}

Le reti pubbliche sono accessibili a chiunque nel mondo disponga di una connessione a Internet. Chiunque può leggere o creare transazioni su una blockchain pubblica e convalidare le transazioni in esecuzione. Il consenso tra i peer decide sull'inclusione delle transazioni e sullo stato della rete.

### Mainnet di Ethereum {#ethereum-mainnet}

La Mainnet è la principale blockchain di produzione pubblica di Ethereum, in cui le transazioni di valore reale avvengono sul registro distribuito.

Quando le persone e gli exchange discutono dei prezzi degli ETH, parlano degli ETH della Mainnet.

### Testnet di Ethereum {#ethereum-testnets}

Oltre alla Mainnet, esistono testnet pubbliche. Si tratta di reti utilizzate dagli sviluppatori del protocollo o dagli sviluppatori di smart contract per testare sia gli aggiornamenti del protocollo sia i potenziali smart contract in un ambiente simile a quello di produzione prima della distribuzione sulla Mainnet. Pensa a questo come a un'analogia tra server di produzione e server di staging.

Dovresti testare qualsiasi codice di contratto che scrivi su una testnet prima di distribuirlo sulla Mainnet. Tra le applicazioni decentralizzate (dapp) che si integrano con gli smart contract esistenti, la maggior parte dei progetti ha copie distribuite sulle testnet.

La maggior parte delle testnet è iniziata utilizzando un meccanismo di consenso di prova di autorità (PoA) autorizzata. Ciò significa che un piccolo numero di nodi viene scelto per convalidare le transazioni e creare nuovi blocchi, mettendo in gioco la propria identità nel processo. In alternativa, alcune testnet presentano un meccanismo di consenso Proof-of-Stake (PoS) aperto in cui tutti possono testare l'esecuzione di un validatore, proprio come sulla Mainnet di Ethereum.

Si suppone che gli ETH sulle testnet non abbiano alcun valore reale; tuttavia, sono stati creati mercati per determinati tipi di ETH della testnet che sono diventati scarsi o difficili da ottenere. Poiché hai bisogno di ETH per interagire effettivamente con Ethereum (anche sulle testnet), la maggior parte delle persone ottiene ETH della testnet gratuitamente dai faucet. La maggior parte dei faucet sono app web in cui puoi inserire un indirizzo a cui richiedere l'invio di ETH.

#### Quale testnet dovrei usare? {#which-testnet-should-i-use}

Le due testnet pubbliche che gli sviluppatori di client stanno attualmente mantenendo sono Sepolia e Hoodi. Sepolia è una rete per gli sviluppatori di contratti e applicazioni per testare le loro applicazioni. La rete Hoodi consente agli sviluppatori del protocollo di testare gli aggiornamenti della rete e consente agli staker di testare l'esecuzione dei validatori.

#### Sepolia {#sepolia}

**Sepolia è la testnet predefinita consigliata per lo sviluppo di applicazioni**. La rete Sepolia utilizza un set di validatori autorizzato controllato dai team dei client e di test.

##### Risorse {#} {#} {#} {#} {#}

- [Sito web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucet {#} {#} {#} {#}

- [Faucet di Sepolia di Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Faucet di Sepolia di Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Faucet di Sepolia di Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet dell'ecosistema Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Faucet di Sepolia di ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet di Sepolia di Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet di Sepolia di Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet di Sepolia di QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi è una testnet per testare la convalida e lo staking. La rete Hoodi è aperta agli utenti che desiderano eseguire un validatore della testnet. Gli staker che desiderano testare gli aggiornamenti del protocollo prima che vengano distribuiti sulla Mainnet dovrebbero quindi utilizzare Hoodi.

- Set di validatori aperto, gli staker possono testare gli aggiornamenti della rete
- Stato di grandi dimensioni, utile per testare interazioni complesse di smart contract
- Sincronizzazione più lunga e richiede più spazio di archiviazione per eseguire un nodo

##### Risorse

- [Sito web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Sincronizzazione del checkpoint](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucet

- [Faucet di Hoodi di Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet di Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery è un tipo unico di testnet che si ripristina completamente ogni mese. Lo stato di esecuzione e di consenso ritorna alla genesi ogni 28 giorni, il che significa che tutto ciò che accade sulla testnet è effimero. Questo la rende ideale per test a breve termine, avvio rapido dei nodi e applicazioni di tipo "hello world" che non necessitano di permanenza.

- Stato sempre nuovo, test a breve termine di validatori e app
- Include solo un set di base di contratti
- Set di validatori aperto e facile accesso a grandi quantità di fondi
- Requisiti minimi per i nodi e sincronizzazione più rapida, in media &lt;5GB

##### Risorse

- [Sito web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat della community](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorer della Beacon](https://beaconlight.ephemery.dev/)
- [Sincronizzazione del checkpoint](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucet {#faucets}

- [Faucet di Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW di Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (deprecata) {#holesky}

La testnet Holesky è deprecata da settembre 2025. Gli operatori di staking e i fornitori di infrastrutture dovrebbero invece utilizzare Hoodi per i test dei validatori.

- [Annuncio della chiusura della testnet Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog della EF, 1 settembre 2025_
- [Aggiornamenti sulle testnet Holesky e Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog della EF, 18 marzo 2025_

### Testnet di layer 2 {#layer-2-testnets}

Il [layer 2 (l2)](/layer-2/) è un termine collettivo per descrivere un insieme specifico di soluzioni di ridimensionamento di Ethereum. Un layer 2 è una blockchain separata che estende Ethereum ed eredita le garanzie di sicurezza di Ethereum. Le testnet di layer 2 sono solitamente strettamente accoppiate alle testnet pubbliche di Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Una testnet per [Arbitrum](https://arbitrum.io/).

##### Risorse

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucet

- [Faucet di Arbitrum Sepolia di Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet di Arbitrum Sepolia di Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet di Arbitrum Sepolia di ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet di Arbitrum Sepolia di QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Una testnet per [Optimism](https://www.optimism.io/).

##### Risorse

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucet

- [Faucet di Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet di Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet di Optimism Sepolia di ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet della testnet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Una testnet per [Starknet](https://www.starknet.io).

##### Risorse

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucet

- [Faucet di Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet di Starknet Sepolia di Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet di Starknet](https://starknet-faucet.vercel.app/)

## Reti private {#private-networks}

Una rete Ethereum è una rete privata se i suoi nodi non sono connessi a una rete pubblica (ovvero, la Mainnet o una testnet). In questo contesto, privato significa solo riservato o isolato, piuttosto che protetto o sicuro.

### Reti di sviluppo {#development-networks}

Per sviluppare un'applicazione Ethereum, vorrai eseguirla su una rete privata per vedere come funziona prima di distribuirla. Similmente a come crei un server locale sul tuo computer per lo sviluppo web, puoi creare un'istanza blockchain locale per testare la tua dapp. Ciò consente un'iterazione molto più rapida rispetto a una testnet pubblica.

Esistono progetti e strumenti dedicati per assistere in questo. Scopri di più sulle [reti di sviluppo](/developers/docs/development-networks/).

### Reti di consorzio {#consortium-networks}

Il processo di consenso è controllato da un insieme predefinito di nodi considerati attendibili. Ad esempio, una rete privata di istituzioni accademiche note che governano ciascuna un singolo nodo e i blocchi vengono convalidati da una soglia di firmatari all'interno della rete.

Se una rete pubblica di Ethereum è come l'Internet pubblico, una rete di consorzio è come una intranet privata.

## <Emoji text="🚉" /> Perché le testnet di Ethereum prendono il nome dalle stazioni della metropolitana? {#why-naming}

Molte testnet di Ethereum prendono il nome da stazioni della metropolitana o dei treni del mondo reale. Questa tradizione di denominazione è iniziata presto e riflette le città globali in cui i contributori hanno vissuto o lavorato. È simbolica, memorabile e pratica. Proprio come le testnet sono isolate dalla Mainnet di Ethereum, le linee della metropolitana corrono separatamente dal traffico di superficie.

### <Emoji text="🚧" /> Testnet comunemente usate e legacy {#common-and-legacy-testnets}

- **Sepolia** - Un quartiere collegato alla metropolitana ad Atene, in Grecia. Attualmente utilizzata per i test di smart contract e dapp.
- **Hoodi** - Prende il nome dalla stazione della metropolitana di Hoodi a Bengaluru, in India. Utilizzata per i test dei validatori e degli aggiornamenti del protocollo.
- **Goerli** _(deprecata)_ - Prende il nome dalla Görlitzer Bahnhof a Berlino, in Germania.
- **Rinkeby** _(deprecata)_ - Prende il nome da un sobborgo di Stoccolma con una stazione della metropolitana.
- **Ropsten** _(deprecata)_ - Si riferisce a un'area e a un ex terminal di traghetti/metropolitana a Stoccolma.
- **Kovan** _(deprecata)_ - Prende il nome da una stazione MRT di Singapore.
- **Morden** _(deprecata)_ - Prende il nome da una stazione della metropolitana di Londra. La prima testnet pubblica di Ethereum.

### <Emoji text="🧪" /> Altre testnet specializzate {#other-testnets}

Alcune testnet sono state create per test a breve termine o specifici per gli aggiornamenti e non sono necessariamente a tema metropolitana:

- **Holesky** _(deprecata)_ - Prende il nome dalla stazione di Holešovice a Praga. Utilizzata per i test dei validatori; deprecata nel 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tutte deprecate)_ ed **Ephemery** - Costruite appositamente per simulazioni di aggiornamenti come The Merge, Shanghai o esperimenti sui validatori. Alcuni nomi sono regionali o tematici piuttosto che basati sulla metropolitana.

L'utilizzo dei nomi delle stazioni della metropolitana aiuta gli sviluppatori a identificare e ricordare rapidamente le testnet senza dover fare affidamento su ID di catena numerici. Riflette anche la cultura di Ethereum: pratica, globale e incentrata sull'uomo.

## Strumenti correlati {#related-tools}

- [Chainlist](https://chainlist.org/) _elenco di reti EVM per connettere portafogli e provider all'ID di catena e all'ID di rete appropriati_
- [Catene basate su EVM](https://github.com/ethereum-lists/chains) _repository GitHub di metadati della catena che alimenta Chainlist_

## Letture consigliate {#further-reading}

- [Proposta: ciclo di vita prevedibile delle testnet di Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'evoluzione delle testnet di Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
