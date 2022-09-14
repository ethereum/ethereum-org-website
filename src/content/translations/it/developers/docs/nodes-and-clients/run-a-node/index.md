---
title: Avvia il tuo nodo di Ethereum
description: Introduzione generale all'esecuzione della propria istanza di un client di Ethereum.
lang: it
sidebar: true
sidebarDepth: 2
preMergeBanner: true
---

Eseguire il tuo nodo ti offre vari benefici, apre nuove possibilità e aiuta a supportare l'ecosistema. Questa pagina ti guiderà verso l'avvio del tuo nodo e la partecipazione alla convalida delle transazioni di Ethereum.

Nota che dopo [La Fusione](/upgrades/merge), è necessaria l'esecuzione di un minimo di due client per eseguire un nodo di Ethereum. Si tratta di un client di esecuzione e un client di consenso. Questa pagina mostrerà come installare, configurare e connettere questi due client per formare un nodo di Ethereum.

## Prerequisiti {#prerequisites}

Dovresti sapere cos'è un nodo di Ethereum e per quali motivi potresti voler eseguire un client. Questo aspetto è trattato in [Nodi e client](/developers/docs/nodes-and-clients/).

Se sei nuovo al tema dell'esecuzione di un nodo, o stai cercando un percorso meno tecnico, ti consigliamo prima di dare un'occhiata alla nostra introduzione user-friendly su come [Eseguire un nodo di Ethereum](/run-a-node).

## Scegliere un approccio {#choosing-approach}

Il primo passo nell'avvio del tuo nodo è scegliere l’approccio che vuoi seguire. Devi scegliere il client (il software), l'ambiente e i parametri con cui vuoi cominciare. Questo include l'hardware (NUC, laptop, macchina virtuale, etc.), sistema operativo (Linux, Windows, macOS, etc.), implementazione e configurazione del client. Gli utenti avranno le proprie preferenze individuali per ogni opzione.

#### Impostazioni del client {#client-settings}

Le implementazioni del client consentono diverse modalità di sincronizzazione e varie altre opzioni. [Le modalità di sincronizzazione](/developers/docs/nodes-and-clients/#sync-modes) rappresentano metodi diversi di scaricare e convalidare i dati della blockchain. Prima di avviare il nodo, dovresti decidere quale rete e che modalità di sincronizzazione usare. Le cose più importanti da considerare sono lo spazio su disco e il tempo di sincronizzazione che il client necessiterà. Nota che dopo [La Fusione](/upgrades/merge), un client d'esecuzione leggero non funzionerà più, sarà necessario un nodo completo.

Tutte le funzionalità e opzioni si possono trovare nella documentazione del client. È possibile impostare varie configurazioni del client eseguendo il client con i corrispondenti flag. Puoi ottenere maggiori informazioni sui flag dalla documentazione del client.

Per scopi di prova, potrebbe essere preferibile eseguire un client su una delle reti di prova. [Visualizza la panoramica delle reti supportate](/developers/docs/nodes-and-clients/#execution-clients).

### Ambiente e Hardware {#environment-and-hardware}

#### Locale o su cloud {#local-vs-cloud}

I client di Ethereum possono funzionare su computer di livello consumer e non richiedono hardware speciale, come il mining, ad esempio. Dunque, per la distribuzione hai varie opzioni, a seconda delle tue esigenze. Per semplificare, pensiamo all'esecuzione di un nodo sia su una macchina fisica locale che su un server cloud:

- Cloud
  - I fornitori offrono tempi di disponibilità del server elevati, indirizzi IP pubblici statici
  - Ottenere un server dedicato o virtuale può esser più comodo che creare il proprio
  - Il compromesso è doversi affidare a una terza parte: il fornitore del server
  - A causa della dimensione d'archiviazione richiesta per l'intero nodo, il prezzo di un server affittato potrebbe essere alto
- Hardware proprio
  - Approccio più affidabile e autonomo
  - Investimento una tantum
  - Possibilità di acquistare macchine pre-configurate
  - Devi preparare, mantenere e potenzialmente risolvere i problemi della macchina fisicamente

entrambe le opzioni presentano vantaggi differenti, sopra riassunti. Se cerchi una soluzione su cloud, oltre a molti fornitori informatici di cloud tradizionali, esistono anche servizi incentrati sulla distribuzione dei nodi. Ad esempio:

- [QuickNode](https://www.quicknode.com/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Hardware {#hardware}

Tuttavia, una rete decentralizzata e resistente alla censura non dovrebbe affidarsi ai fornitori cloud. È preferibile per l'integrità dell'ecosistema se esegui il tuo nodo su hardware. Le opzioni più semplici sono delle macchine preconfigurate, come:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Controlla i [requisiti di spazio su disco minimi e consigliati per ogni client e modalità di sincronizzazione](/developers/docs/nodes-and-clients/#requirements). In genere, dovrebbe essere sufficiente una potenza di calcolo modesta. Il problema è solitamente la velocità dell'unità. Durante la sincronizzazione iniziale, i client di Ethereum eseguono molte operazioni di scrittura/lettura. Dunque, è vivamente consigliato un SSD. Un client potrebbe persino non essere [ in grado di sincronizzare lo stato corrente su HDD](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) e bloccarsi qualche blocco prima della rete principale. Puoi eseguire gran parte dei client su un [computer a scheda singola con ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). Puoi anche usare il sistema operativo [Ethbian](https://ethbian.org/index.html) per Raspberry Pi 4. Questo ti permette di [eseguire un client tramite flash della scheda SD](/developers/tutorials/run-node-raspberry-pi/). In base alle tue scelte software e hardware, il tempo di sincronizzazione iniziale e i requisiti di memoria potrebbero variare. Assicurati di [controllare i tempi di sincronizzazione e i requisiti di memoria](/developers/docs/nodes-and-clients/#recommended-specifications). Assicurati anche che la tua connessione a internet non sia limitata da un [limite di larghezza di banda](https://wikipedia.org/wiki/Data_cap). Si consiglia di non usare una connessione a consumo poiché la sincronizzazione iniziale e i dati trasmessi alla rete potrebbero superare il limite di traffico.

#### Sistema operativo {#operating-system}

Tutti i client supportano i principali sistemi operativi: Linux, MacOS, Windows. Questo significa che puoi eseguire i nodi su macchine desktop o server ordinarie, con il sistema operativo (OS) più adatto alle tue esigenze. Assicurati che il tuo OS sia aggiornato per evitare possibili problemi e vulnerabilità di sicurezza.

## Avviare il nodo {#spinning-up-node}

### Ottenere il software del client d'esecuzione {#getting-the-execution-client}

Per prima cosa, scarica il tuo [software del client d'esecuzione](/developers/docs/nodes-and-clients/#execution-clients) preferito.

Puoi semplicemente scaricare un'applicazione eseguibile o il pacchetto d'installazione più adatto al tuo sistema operativo e alla tua architettura. Verifica sempre firme e checksum dei pacchetti scaricati. Alcuni client offrono anche repository per facilitare l’installazione e gli aggiornamenti. Se preferisci, puoi compilare dal codice sorgente. Tutti i client sono open source, quindi, puoi compilarli dal codice sorgente con il compilatore adeguato.

I binari eseguibili per le implementazioni del client della rete principale stabili, sono scaricabili dalle pagine delle rispettive release:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

Vale anche la pena notare che la diversità dei client è un [problema sul livello d'esecuzione](https://clientdiversity.org/), e che la super maggioranza (>66%) di tutti i nodi di Ethereum esegue Geth. Si consiglia ai lettori su questa pagina di valutare l'esecuzione di un client d'esecuzione di minoranza.

**Sottolineiamo che OpenEthereum [è ormai superato](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non viene più mantenuto.** Usalo con cautela e preferibilmente passa ad un'altra implementazione del client.

### Avviare il client d'esecuzione {#starting-the-execution-client}

Prima di avviare il software del client di Ethereum, verifica che l'ambiente sia pronto. Ad esempio, assicurati:

- Che ci sia abbastanza spazio su disco considerando la rete e la modalità di sincronizzazione scelta.
- Che Memoria e CPU non siano bloccate da altri programmi.
- Che il sistema operativo sia aggiornato all'ultima versione.
- Che il sistema abbia l'ora e la data corrette.
- Che il tuo router e firewall accettino le connessioni sulle porte d'ascolto. Di default, i client di Ethereum usano una porta d'ascolto (TCP) e una porta di scoperta (UDP), entrambe di default su 30303.

esegui prima il tuo client su una rete di prova, per assicurarti che tutto funzioni correttamente. All'avvio devi dichiarare qualsiasi impostazione del client che non sia predefinita. Per potersi connettere a un client di consenso, il client d'esecuzione deve generare un `jwtsecret` a un percorso noto. Questo percorso deve essere noto da entrambi i client, essendo usato per autenticare una connessione RPC locale tra loro. Il client d'esecuzione deve anche definire una porta d'ascolto per le API autenticate.

**Si consiglia per ora di connettere un client di esecuzione e di consenso solo a una rete di prova (es. Kiln) e attendere le release dei client pronti alla fusione prima di replicare il processo sulla rete principale.**

Esistono molti modi per configurare il client d'esecuzione. Puoi usare i flag o il file di configurazione per dichiarare la tua configurazione preferita. Consulta la documentazione del tuo client per i dettagli specifici.

L'esecuzione del client avvierà le sue funzioni principali, gli endpoint scelti e inizierà la ricerca di peer. Dopo aver scoperto correttamente dei peer, il client avvia la sincronizzazione. I dati della blockchain correnti saranno disponibili una volta che il client si sia correttamente sincronizzato allo stato corrente.

### Ottenere il client di consenso {#getting-the-consensus-client}

Esistono attualmente cinque client di consenso tra cui scegliere. Questi sono:

- [Lighthouse](https://lighthouse-book.sigmaprime.io/): scritto in Rust
- [Nimbus](https://nimbus.team/): scritto in Nim
- [Prysm](https://docs.prylabs.network/docs/getting-started/): scritto in Go
- [Teku](https://pegasys.tech/teku): scritto in Java

Attualmente esiste un problema di [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/), dove una grande dominanza dei client di Prysm rappresenta un rischio all'integrità della rete. In risposta alla spinta iniziale a livellare la diversità dei client, molti nodi Prysm sono passati a Lighthouse, tanto che anch'esso presenta ora una quota di mercato problematica. Si consiglia dunque di considerare la scelta di un client di minoranza. [Visualizza l'uso più recente dei client nella rete](https://clientdiversity.org/)

Esistono diversi modi per scaricare e installare i client di consenso, tra cui i binari pre-compilati, i container docker o la compilazione da sorgente. Le istruzioni per ogni client sono fornite nell'associata documentazione nel sopracitato elenco di client. Gli utenti possono scegliere il metodo giusto per loro.

### Avviare il client di consenso {#starting-the-consensus-client}

Il client di consenso deve essere avviato con la giusta configurazione delle porte per stabilire una connessione RPC locale al client d'esecuzione. I client di consenso hanno tutti un comando simile a `--http-webprovider`, che prende la porta del client d'esecuzione come un argomento.

Il client di consenso necessita anche del percorso al `jwt-secret` del client d'esecuzione per poter autenticare la connessione RPC tra di essi. Ogni client di consenso ha un comando simile a `--jwt-secret` che prende il percorso del file come un argomento. Questo deve essere coerente con il percorso `jwtsecret` passato al client d'esecuzione.

**Consigliamo di attendere le release dei client pronti alla fusione prima di farlo sulla rete principale di Ethereum, limitandosi per ora a fare semplicemente pratica su una rete di prova come Kiln.**

### Aggiungere dei validatori {#adding-validators}

Ciascuno dei client di consenso ha il proprio software validatore, descritto in dettaglio nella rispettiva documentazione. Il modo più facile per iniziare con lo staking e la generazione della chiave del validatore è usare il [Launchpad di Staking della rete di prova di Goerli](https://goerli.launchpad.ethereum.org/), che consente di testare la configurazione. Quando sei pronto per la rete principale, puoi ripetere questi passaggi usando il [Launchpad di Staking della rete principale](https://launchpad.ethereum.org/).

### Usare il nodo {#using-the-node}

I client d'esecuzione offrono endpoint API RPC che puoi usare per inviare le transazioni, interagire con o distribuire gli smart contract sulla rete di Ethereum in vari modi:

- Effettuare una chiamata manuale con un protocollo adatto (es. usando `curl`)
- Allegare una console fornita (es. `geth attach`)
- Implementarle all'interno di applicazioni

Client diversi hanno implementazioni diverse degli endpoint RPC. Ma esiste uno standard JSON-RPC che si può usare con ogni client. Per una panoramica, [leggi la documentazione JSON-RPC](https://eth.wiki/json-rpc/API). Le applicazioni che necessitano di informazioni dalla rete di Ethereum possono usare questa RPC. Ad esempio, il popolare portafoglio MetaMask consente di [eseguire un'istanza della blockchain locale e connettersi a essa](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

I client di consenso espongono tutti l'[API Beacon](https://ethereum.github.io/beacon-APIs), utilizzabile per verificare lo stato del client di consenso o per scaricare blocchi e dati di consenso, inviando richieste usando strumenti come [Curl](https://curl.se). Maggiori informazioni a riguardo si possono trovare nella documentazione di ogni client di consenso.

#### Raggiungere le RPC {#reaching-rpc}

La porta predefinita per il client d'esecuzione JSON-RPC è `8545`, ma puoi modificare le porte degli endpoint locali nel file di configurazione. Di default, l'interfaccia RPC è raggiungibile solo sul localhost del tuo computer. Per renderla accessibile da remoto, dovresti esporla al pubblico cambiando l'indirizzo in `0.0.0.0`. Questo la renderà raggiungibile da indirizzi IP locali e pubblici. In gran parte dei casi, dovrai anche configurare il port forwarding sul router.

Devi farlo con cautela, poiché questo consentirà a chiunque su internet di controllare il tuo nodo. Degli attori malevoli potrebbero accedere al tuo nodo per far cadere il tuo sistema o rubare i tuoi fondi se stai usando il client come portafoglio.

Un modo per aggirare questo problema è impedire ai metodi RPC potenzialmente dannosi di essere modificati. Ad esempio, con Geth, puoi dichiarare i metodi modificabili con un flag: `--http.api web3,eth,txpool`.

Puoi anche ospitare l'accesso alla tua interfaccia RPC puntando il servizio del server web, come Nginx, all'indirizzo locale e alla porta del tuo client.

Il metodo più sicuro e semplice per configurare un endpoint raggiungibile pubblicamente è l'hosting in autonomia sul servizio onion di [Tor](https://www.torproject.org/). Questo ti consentirà di raggiungere l’RPC al di fuori della tua rete locale senza un indirizzo IP pubblico statico e senza aprire le porte. Per farlo:

- Installa `tor`
- Modifica la configurazione di `torrc` per abilitare il servizio nascosto con l'indirizzo e la porta RPC del tuo client
- Riavvia il servizio `tor`

Una volta riavviato Tor, riceverai le chiavi del servizio nascosto e un nome host nella cartella da te desiderata. Da questo momento, l’RPC sarà raggiungibile su un nome host `.onion`.

### Eseguire il nodo {#operating-the-node}

Devi monitorare regolarmente il tuo nodo per accertarti che funzioni correttamente. Occasionalmente potresti dover eseguire una manutenzione.

#### Mantenere il nodo online {#keeping-node-online}

Il tuo nodo non deve necessariamente essere sempre online, ma dovresti mantenerlo online il più possibile per mantenerlo sincronizzato con la rete. Puoi arrestarlo per poi riavviarlo, ma tieni a mente che:

- L'arresto può richiedere diversi minuti se lo stato recente è ancora in fase di scrittura sul disco.
- Gli arresti forzati possono danneggiare il database.
- Il tuo client perderà la sincronizzazione con la rete e dovrà risincronizzarsi al riavvio.

_Questo non vale per i nodi validatori del livello del consenso._ Mettere offline il tuo nodo influenzerà tutti i servizi che dipendono da esso. Se stai eseguendo un nodo per scopi di _staking_, dovresti cercare di ridurre al minimo i tempi di fermo.

#### Creare i servizi del client {#creating-client-services}

Valuta la possibilità di creare un servizio per eseguire automaticamente il tuo client all'avvio. Ad esempio, sui server Linux, è buona prassi creare un servizio che esegua il client con la configurazione corretta, sotto un utente con privilegi limitati e che si riavvii automaticamente.

#### Aggiornare i client {#updating-clients}

Devi mantenere aggiornato il software del tuo client con le ultime patch di sicurezza, funzionalità ed [EIP](/eips/). Specialmente prima delle [biforcazioni permanenti](/history/), assicurati che siano in esecuzione le versioni corrette dei client. Aggiornare i client è molto semplice. Ogni client ha istruzioni specifiche nella propria documentazione, ma solitamente il processo consiste semplicemente nell'interrompere il client, scaricare l'ultima versione e riavviarlo. Il client dovrebbe riprendere da dove si è fermato, ma con gli aggiornamenti applicati.

Ogni implementazione del client ha una stringa di versione leggibile da umani usata nel protocollo peer-to-peer, ma è anche accessibile dalla riga di comando. Questa stringa di versione consente agli utenti di verificare che è in esecuzione la versione corretta e consente agli esploratori di blocchi e ad altri strumenti analitici interessati di quantificare la distribuzione di client specifici sulla rete. Si rimanda alla documentazione del client individuale per maggiori informazioni sulle stringhe di versione.

#### Eseguire servizi aggiuntivi {#running-additional-services}

Eseguire il proprio nodo ti consente di usare servizi che richiedono l'accesso diretto alla RPC del client di Ethereum. Questi sono servizi basati su Ethereum come le [soluzioni di livello 2](/developers/docs/scaling/#layer-2-scaling) e altre infrastrutture di Ethereum.

#### Monitorare il nodo {#monitoring-the-node}

"Per monitorare correttamente il tuo nodo, valuta di raccogliere delle metriche. I client forniscono endpoint per le metriche, così che tu possa ottenere dati completi sul tuo nodo. Usa strumenti come [InfluxDB](https://www.influxdata.com/get-influxdb/) o [Prometheus](https://prometheus.io/) per creare database che puoi trasformare in visualizzazioni e grafici in software come [Grafana](https://grafana.com/). Esistono molte impostazioni per usare questo software e diversi pannelli di controllo di Grafana che ti consentono avere una visione completa sul tuo nodo e sulla tua rete. Nell’ambito del monitoraggio, assicurati di tenere d'occhio le prestazioni della tua macchina. Durante la sincronizzazione iniziale del tuo nodo, il software del client potrebbe essere molto gravoso su CPU e RAM. Oltre a Grafana, puoi usare gli strumenti che offre il tuo OS, come `htop` o `uptime`.

## Lettura consigliate {#further-reading}

- [Analizzare i requisiti hardware per poter essere un nodo convalidato e completo di Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 settembre 2018_
- [Eseguire nodi completi di Ethereum: una guida per i poco motivati](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novembre 2019_
- [Eseguire un nodo di Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, aggiornato spesso_
- [Eseguire un nodo di Hyperledger Besu sulla rete principale di Ethereum: benefici, requisiti e configurazione](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Maggio 2020_
- [Distribuire il client di Nethermind di Ethereum con stack di monitoraggio](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Luglio 2020_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Blocchi](/developers/docs/blocks/)
- [Reti](/developers/docs/networks/)
