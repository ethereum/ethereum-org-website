---
title: Software obsoleto
description: Software che è stato abbandonato dai suoi manutentori
lang: it
sidebarDepth: 2
---

# Software obsoleto {#summary-deprecated-software}

Questo è un elenco dei progetti e delle risorse chiave relativi ad Ethereum che sono diventati obsoleti o che non sono più mantenuti. È importante mettere in evidenza il lavoro obsoleto così che gli utenti possano trovare alternative valide e per evitare che vengano distribuite versioni malevoli.

Questo elenco è curato dalla nostra comunità. Se c'è qualcosa di mancante o incorretto, si prega di modificare la pagina!

## Proof of Work {#pow}

[Proof of work ](/developers/docs/consensus-mechanisms/pow) è il motore di consenso che è stato implementato in Ethereum fino a settembre 2022. È diventato obsoleto quando Ethereum è passato al meccanismo di consenso basato su [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Questo è stato raggiunto abbandonando le parti del software del client relative al mining in proof-of-work, incluso [Ethhash](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethhash) (l'algoritmo di mining) e tutta la logica di consenso e la funzionalità di gossip del blocco che era stata originariamente integrata nei client di esecuzione. I client stessi non sono diventati obsoleti ma lo sono molti dei loro componenti principali. Il concetto di proof-of-work è stato abbandonato come effetto globale della rimozione delle relative componenti del software del client.

## Software {#software}

Questa sezione è dedicata ai software per desktop, per riga di comando o per server che sono diventati obsoleti. I tipi principali sono portafogli, ambienti di sviluppo integrati, linguaggi e client Ethereum. È assolutamente necessario fare attenzione a non installare software obsoleto a meno che non si sia certi che provenga dalla fonte originale, per esempio: un repository contenuto all'interno di https://github.com/ethereum.

### OpenEthereum {#open-ethereum}

Obsoleto dal luglio 2021

**Riepilogo**

OpenEthereum è stata la seconda implementazione principale di Ethereum per numero di nodi. OpenEthereum ha svolto un ruolo importante come infrastruttura chiave per alcuni dei maggiori utenti di Ethereum come Etherscan e Gnosis Safe. La sua capacità di tracciamento lo distinguono dagli altri client, garantendo una sincronizzazione affidabile e veloce per i fornitori di dati.

**Archivi**

[Repo Github archiviati](https://github.com/openethereum/openethereum)

**Storia**

OpenEthereum è stata costruita da miner, fornitori di servizi e borse che necessitano di una sincronizzazione veloce e un tempo di attività massimo. OpenEthereum ha fornito l'infrastruttura di base essenziale per servizi veloci ed affidabili.

**Alternative**

[Confronta tutte le opzioni del client di esecuzione di Ethereum](/developers/docs/nodes-and-clients/#execution-clients).

### Grid {#grid}

Obsoldeto dal 10 dicembre 2020

**Riepilogo**

Grid era una applicazione desktop basata su JavaScript che permetteva di accedere in modo sicuro ad Ethereum, IPFS e ad altre reti decentralizzate. Ha fornito un'interfaccia intuitiva per aiutare un pubblico meno tecnico ad interagire in modo sicuro con le dapp, aumentando l'accessibilità per tutti.

**Archivi**

[Repo Github archiviati](https://github.com/ethereum/grid)

**Storia**

Grid potrebbe essere visto come il successore di Mist, anche essa un'applicazione desktop standalone basata su JavaScript che includeva un nodo Geth. Grid ha rimosso l'aspetto del portafoglio e ha aggiunto un approccio in stile plugin per l'esecuzione di diversi tipi di nodi.

**Alternative**

[DAppNode](https://dappnode.io/) è una piattaforma per distribuire e ospitare dapp, client P2P e nodi blockchain.

### Ethereum Studio {#ethereum-studio}

Obsoleto dal 7 dicembre 2020

**Riepilogo**

Ethereum Studio era un IDE basato sul web che permetteva agli utenti di creare e testare contratti intelligenti, così come di costruire i front-end per essi.

**Archivi**

[Repo Github archiviati](https://github.com/SuperblocksHQ/ethereum-studio)

**Storia**

Ethereum Studio è stato sviluppato per fornire agli utenti un IDE con una blockchain Ethereum ed un compilatore Solidity integrati. In aggiunta a questo ha fornito la possibilità di modificare il codice in tempo reale e di esportare dapp complete senza bisogno di un terminale.

**Alternative**

[Remix](https://remix.ethereum.org/) è un IDE web alternativo per lo sviluppo in Solidity. Inoltre il [Portale per sviluppatori](/developers/) ha strumenti per lo sviluppo su web e in locale, documentazione e molto altro.

### Portafoglio Meteor Dapp {#meteor-dapp-wallet}

Obsoleto dal 27 marzo 2019

**Riepilogo**

Il portafoglio Meteor Dapp era un componente di Mist, un portafoglio di Ethereum per gestire i conti di Ethereum ed interagire con i contratti intelligenti. Per tanti anni l'interfaccia utente web del portafoglio Mereor Dapp è stata ospitata come sottodominio, "wallet.ethereum.org".

Era incluso anche il contratto multifirma di Mist (codice Solidity), e il portafoglio Meteor Dapp presentava un'interfaccia utente per la sua configurazione e distribuzione.

**Non obsoleto: multifirma di Mist distribuiti**

Il contratto multifirma di Mist - distribuito come bytecode sulla Rete Principale di Ethereum da migliaia di utenti - continua ad essere usato per memorizzare e gestire valore senza incidenti. [Come interagire con un contratto multifirma di Mist](https://support.mycrypto.com/how-to/sending/how-to-interact-with-a-multisig-contract) fornisce una buona panoramica su come usare i contratti intelligenti.

**Archivi**

[Repo Github archiviati](https://github.com/ethereum/meteor-dapp-wallet)

**Storia**

Vedi Mist qui sotto.

**Alternative**

Visita la pagina dei [Portafogli di Ethereum](/wallets/) su ethereum.org.

### Mist {#mist}

Obsoleto dal 27 marzo 2019

**Riepilogo**

Mist era un browser specializzato costruito con Electron che permetteva agli utenti di gestire conti di Ethereum e di interagire con dapp ospitate nel web tradizionale.

**Archivi**

[Repo Github archiviati](https://github.com/ethereum/mist)

**Storia**

Mist è stato un importante esperimento iniziale perché ha esplorato come gestire le chiavi di Ethereum, ha fatto conoscere agli utenti gli strumenti finanziari, come i contratti multifirma, e ha dimostrato com avrebbe funzionato il Web3. Ha anche mostrato agli utenti innovazioni come i blockies, grafiche carine e memorabili in stile 8-bit che rappresentano le chiavi di Ethereum.

**Alternative**

[MetaMask](https://metamask.io/) è un portafoglio nel browser che permette di gestire le chiavi di Ethereum e di interagire con le dapp. È disponibile come un'estensione per Google Chrome e Firefox ed è incluso nel [Browser Brave](https://brave.com/).

### Mix {#mix}

Obsoleto dall'11 agosto 2016

**Riepilogo**

Mix era un IDE sviluppato in C++ che permetteva agli sviluppatori di costruire e distribuire contratti intelligenti su Ethrerum.

**Archivi**

[Repo Github archiviati](https://github.com/ethereum/mix)

**Storia**

Mix è stato la prima delle applicazioni legate ad Ethereum. Guarda questa [presentazione di Gavin Wood al Devcon0](https://www.youtube.com/watch?v=hcP_z_wBlaM).

**Alternative**

[Remix](https://remix.ethereum.org/) è un IDE ospitato su browser per lo sviluppo, il testing e la distribuzione di contratti intelligenti in Solidity. Ha anche una soluzione desktop.

### Minimal {#minimal}

Obsoleto dal 2020.

**Riepilogo**

Minimal era un'implementazione modulare della blockchain di Ethereum scritta in Go.

**Archivi**

[Repo Github archiviati](https://github.com/umbracle/minimal)

**Storia**

Minimal è stato sostituito da [polgon-sdk](https://github.com/0xPolygon/polygon-edge)

### Hyperledger Burrow {#hyperledger-burrow}

Obsoleto dal 2022.

**Riepilogo**

Hyperledger Burrow era un nodo blockchain autorizzato di contratti intelligenti di Ethereum. Eseguiva il codice dei contratti intelligenti dell'EVM di Ethereum e di WASM su macchine virtuali autorizzate.

**Archivi**

[Repo Github archiviati](https://github.com/hyperledger/burrow)

### Mana-Ethereum {#mana-ethereum}

**Riepilogo**

Mana-Ethereum era un client Ethereum costruito usando Elixir.

**Archivi**

[Repo Github archiviati](https://github.com/mana-ethereum/mana)

**Storia**

Il repository GitHub di Mana-Ethereum non è stato esplicitamente archiviato, ma l'ultimo commit è del 2019.

### Aleth (cpp-ethereum) {#aleth}

Obsoleto dal 6 ottobre 2021

**Riepilogo**

Aleth (precedentemente noto come cpp-ethereum) era un client di Ethereum scritto in C++.

**Archivi**

[Repo Github archiviati](https://github.com/ethereum/aleth)

**Storia**

Aleth è stato il terzo client più popolare per Ethereum prima di essere abbandonato il 6 ottobre 2021.

**Alternative**

[Geth](https://geth.ethereum.org/) è un noto client Ethereum alternativo.

### Ethereum-H {#ethereum-h}

**Archivi**

Gli archivi di Ethereum-H sono stati rimossi da GitHub.

**Storia**

Ethereum-H era un client Ethereum scritto in Haskell. È stato abbandonato intorno al 2015.

**Alternative**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) e [Erigon](https://github.com/ledgerwatch/erigon) sono valide alternative di client Ethereum - non esiste attualmente un client in Haskell.

### ruby-ethereum {#ruby-ethereum}

**Archivi**

[Repo GitHib di ruby-ethereum](https://github.com/cryptape/ruby-ethereum)

**Storia**

ruby-ethereum era un client Ethereum scritto in Ruby. È stato abbandonato intorno al 2018.

**Alternative**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) e [Erigon](https://github.com/ledgerwatch/erigon) sono valide alternative di client Ethereum. Non esiste più un client in Ruby attivo.

### Parity {#parity}

Obsoleto dal 2 giugno 2020

**Riepilogo**

Parity era un client Ethereum scritto in Rust.

**Archivi**

[Repo Github archiviati](https://github.com/openethereum/parity-ethereum)

**Storia**

Essendo uno dei due principali client validi nei primi anni di Ethereum (l'altro era Geth), Parity costituiva una parte fondamentale dell'ecosistema. Durante gli attacchi di Shanghai del 2016, Parity ha permesso alla rete di Ethereum di continuare a operare mentre il funzionamento di client come Geth era stato interrotto dall'attacco, dimostrando l'importanza della diverstià dei client.

**Alternative**

[Erigon](https://github.com/ledgerwatch/erigon) Erigon (precedentemente chiamato Turbo-Geth) è un client Ethereum di nuova generazione sulla frontiera dell'efficienza scritto in Go.

**Nota:** _il progetto successore al client Ethereum Parity era [OpenEthereum](https://github.com/openethereum/openethereum) **che intanto diventato obsoleto.**_

La risorsa ["Avvia il tuo nodo di Ethereum"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) su ethereum.org include una sezione per scaricare, installare ed eseguire un client Ethereum.

### Trinity {#trinity}

Obsoleto dal 1° luglio 2021

**Riepilogo**

Trinity era un client Ethereum basato su python che fungeva da strumento di ricerca e di formazione per la community. Un elevato numero di moduli basati su python legati a Trinity continuano ad essere mantenuti dallo stesso team, incluso [Py-EVM](https://github.com/ethereum/py-evm).

**Archivi**

[Repo Github archiviati](https://github.com/ethereum/trinity)

**Storia**

Trinity è stato il progetto successivo a [pyethereum](https://github.com/ethereum/pyethereum/tree/b704a5c6577863edc539a1ec3d2620a443b950fb), un client Ethereum iniziale basato su python.

**Alternative**

La risorsa ["Avvia il tuo nodo di Ethereum"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) su ethereum.org include una sezione per scaricare, installare ed eseguire un client Ethereum.

Il progetto [EthereumJS](https://github.com/ethereumjs) ha uno scopo di ricerca e formazione simile a Trinity.

## Dapp e Servizi {#dapps-and-services}

Questa sezione riguarda i servizi distribuiti sulla Rete Principale di Ethereum e su altre reti baste sull'EVM. Si tenga presente che le dapp e i servizi qui elencati potrebbero includere applicazioni DeFi che sono state hackerate o che potrebbero soffrire di vulnerabilità di sicurezza dovute alla mancanza di manutenzione, di cambiamenti nel protocollo, ecc.

### Protocollo Cover {#cover-protocol}

Chiuso nell'autunno del 2021

**Riepilogo**

Cover era un protocollo assicurativo Defi che funziona su Ethereum e altre reti basate sull'EVM.

**Archivi**

[Sito Web](https://wayback.archive-it.org/17679/20211004074635/https://www.coverprotocol.com/)

[Articoli Medium](https://wayback.archive-it.org/17679/20211004074633/https://coverprotocol.medium.com/)

[Repo GitHub](https://github.com/CoverProtocol/cover-core-v1)

[Documentazione](https://wayback.archive-it.org/17679/20211004074634/https://docs.coverprotocol.com/)

### The DAO {#the-dao}

Hackerato e chiuso nell'estate del 2016

**Riepilogo**

The DAO era un contratto intelligente, una dapp e un forum per organizzare il finanziamento di progetti. Sfruttando una vulnerabilità, è stato svuotato della maggior parte degli ETH, portando ad una biforcazione dura organizzata dalla community per restituire gli ETH a chi li aveva depositati in The DAO. Il front-end della UX e il forum sono stati dismessi.

**Archivi**

[Archivio internet di "daohub.org" del 14 maggio 2016](https://web.archive.org/web/20160514105232/https://daohub.org/)

**Storia**

Sebbene The DAO sia fallito, il concetto è sopravvissuto. L'innovativo modello tecnico, sociale e di governance di base di The DAO è ampiamente utilizzato nelle community Defi, NFT e di progetti di finanziamento.

["Biforcazione DAO" su ethereum.org](/history/#dao-fork)

[Voce Wikipedia per "The DAO"](<https://wikipedia.org/wiki/The_DAO_(organization)>)

**Alternative**

["DAO" su ethereum.org](/dao/)

[MolochDAO](https://www.molochdao.com/)

[Gitcoin Grants](https://gitcoin.co/grants/)

### SparkPool {#sparkpool}

Chiuso nell'autunno del 2021

**Riepilogo**

Con sede a Hangzhou, il servizio e la community di SparkPool sono stati uno dei più grandi pool di mining incentrati su Ethereum al mondo.

**Archivi**

**Storia**

Associato alla community EthFans, il servizio è stato lanciato nel 2015. SparkPool è stato smantellato nell'autunno del 2021 a causa di norme giuridiche più rigorose.

**Alternative**

[Ethermine](https://ethermine.org/)

## Documentazione e fonti informative {#documentation-and-information-sources}

Esistono numerose fonti di documentazione, articoli, tutorial e forum che sono stati rimossi o ancora online ma non più mantenuti. Ne abbiamo selezionati alcuni che sono significativi o il cui attuale stato di "obsoleto" potrebbe portare a confusione o tentativi di truffe.

### Legacy Wiki ed eth.wiki {#eth-wiki}

**Riepilogo**

Legacy Wiki ed eth.wiki erano wiki mantenute dalla Ethereum Foundation per la community più ampia. Erano principalmente orientate ad ospitare descrizioni dettagliate degli aspetti chiave della piattaforma Ethereum e al riepilogo delle tabelle di marcia tecniche.

**Archivi**

[Repo Github archiviato per eth.wiki](https://github.com/ethereum/eth-wiki)

[Repo Github archiviato per Legacy Wiki](https://github.com/ethereum/wiki/wiki)

**Storia**

Legacy Wiki era un wiki GitHub ed un primissimo centro di contenuti tecnici (incluso il Whitepaper originale di Ethereum). Nel corso del tempo, gli sviluppatori di Ethereum hanno migrato la loro documentazione, le specifiche e le descrizioni tecniche ad altre piattaforme quali [Leggi la documentazione](https://readthedocs.org/) e i contenuti ospitati su GitHub.

Nel 2019 e nel 2020, eth.wiki è divenuto il successore di Legacy Wiki, ma non si è creata una community duratura di collaboratori.

**Alternative**

Contenuto basato sulla community: [sito web Ethereum.org](/)

I progetti software di Ethereum spesso ospitano la loro documentazione in [Leggi la documentazione](https://readthedocs.org/)

Specifiche tecniche ospitate su GitHub: [EIP](https://github.com/ethereum/EIPs), [Specifiche di esecuzione](https://github.com/ethereum/execution-specs), [Specifiche di consenso](https://github.com/ethereum/consensus-specs)

### forum.ethereum.org {#forum-ethereum-org}

**Riepilogo**

Il Forum della Community di Ethereum era un forum di discussione mantenuto dalla Ethereum Foundation ed ospitato su forum Vanilla. Usava il sottodominio "forum.ethereum.org".

**Archivi**

URL dell'archivio: [https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/](https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/)

**Storia**

Questo Forum è stato il primo forum "ufficiale" di discussione per la community di Ethereum. Insieme a [/r/ethereum](https://reddit.com/r/ethereum) e ad alcuni canali Skype, è stato un importante punto di coordinamento per sviluppatori, progettisti e organizzatori. Nel corso degli anni i partecipanti al Forum si sono spostati ed è divenuto più un posto per la community dei miner.

**Alternative**

[/r/ethereum](https://reddit.com/r/ethereum), e un gran numero di forum di DAO e di server Discord.

## Canali Gitter {#gitter-channels}

### AllCoreDevs {#allcorewdevs-gitter}

**Riepilogo**

AllCoreDevs su Gitter era il principale canale di comunicazione pubblico di coordinamento per gli [sviluppatori del nucleo dei client Ethereum](https://github.com/ethereum/pm/).

**Archivi**

[Canale ethereum/AllCoreDevs su Gitter](https://gitter.im/ethereum/AllCoreDevs)

**Alternative**

Si prega di utilizzare il canale "allcoredevs" sul [server Discord in EthR&D](https://discord.gg/qHv7AjTDuK)

### EthereumJS {#ethereumjs-gitter}

**Riepilogo**

EthereumJS su Gitter era il principale canale di comunicazione pubblico di coordinamento per il [progetto EthereumJS](https://ethereumjs.github.io/).

**Archivi**

[canale ethereum/EthereumJS su Gitter](https://gitter.im/ethereum/ethereumjs)

**Alternative**

Utilizzare il [server Discord di EthereumJS](https://discord.gg/TNwARpR)
