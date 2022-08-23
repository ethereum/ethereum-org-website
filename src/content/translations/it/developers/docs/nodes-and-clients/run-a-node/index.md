---
title: Avvia il tuo nodo di Ethereum
description: Introduzione generale all'esecuzione della propria istanza di un client di Ethereum.
lang: it
sidebar: true
sidebarDepth: 2
---

Eseguire il tuo nodo ti offre vari benefici, apre nuove possibilità e aiuta a supportare l'ecosistema. Questa pagina ti guiderà verso l'avvio del tuo nodo e la partecipazione alla convalida delle transazioni di Ethereum.

## Prerequisiti {#prerequisites}

Dovresti sapere cos'è un nodo di Ethereum e per quali motivi potresti voler eseguire un client. Questo aspetto è trattato in [Nodi e client](/developers/docs/nodes-and-clients/).

## Scegliere un approccio {#choosing-approach}

Il primo passo nell'avvio del tuo nodo è scegliere l’approccio che vuoi seguire. Devi scegliere il client (il software), l'ambiente e i parametri con cui vuoi cominciare. Vedi tutti i [client della rete principale](/developers/docs/nodes-and-clients/#advantages-of-different-implementations) disponibili.

#### Impostazioni del client {#client-settings}

Le implementazioni del client consentono diverse modalità di sincronizzazione e varie altre opzioni. [Le modalità di sincronizzazione](/developers/docs/nodes-and-clients/#sync-modes) rappresentano metodi diversi di scaricare e convalidare i dati della blockchain. Prima di avviare il nodo, dovresti decidere quale rete e che modalità di sincronizzazione usare. Le cose più importanti da considerare sono lo spazio su disco e il tempo di sincronizzazione che il client necessiterà.

Tutte le funzionalità e opzioni si possono trovare nella documentazione del client. È possibile impostare varie configurazioni del client eseguendo il client con i corrispondenti flag. Per ulteriori informazioni sui flag leggere [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) o la documentazione del client. Per scopi di prova, potrebbe essere preferibile eseguire un client su una delle reti di prova. [Visualizza la panoramica delle reti supportate](/developers/docs/nodes-and-clients/#execution-clients).

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

Entrambe le opzioni presentano vantaggi differenti, sopra riassunti. Se cerchi una soluzione su cloud, oltre a molti fornitori informatici di cloud tradizionali, esistono anche servici incentrati sulla distribuzione dei nodi. Ad esempio:

- [QuikNode](https://www.quiknode.io/),
- [Blockdaemon](https://blockdaemon.com),
- [LunaNode](https://www.lunanode.com/).

#### Hardware {#hardware}

Tuttavia, una rete decentralizzata e resistente alla censura non dovrebbe affidarsi ai fornitori di cloud. È preferibile per l'ecosistema se esegui il tuo nodo su hardware. Le opzioni più semplici sono macchine preconfigurate, come:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/).

Controlla i [requisiti di spazio su disco minimi e consigliati per ogni client e modalità di sincronizzazione](/developers/docs/nodes-and-clients/#requirements). In genere, dovrebbe essere sufficiente una potenza di calcolo modesta. Il problema è solitamente la velocità dell'unità. Durante la sincronizzazione iniziale, i client di Ethereum eseguono molte operazioni di scrittura/lettura. Dunque è vivamente consigliato un SSD. Un client potrebbe persino non essere [ in grado di sincronizzare lo stato corrente su HDD](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) e bloccarsi qualche blocco prima della rete principale. Puoi eseguire gran parte dei client su un [computer a scheda singola con ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). Puoi anche usare il sistema operativo [Ethbian](https://ethbian.org/index.html) per Raspberry Pi 4. Questo ti permette di [[eseguire un client tramite flash della scheda SD](/developers/tutorials/run-node-raspberry-pi/). In base alle tue scelte software e hardware, il tempo di sincronizzazione iniziale e i requisiti d'archiviazione potrebbero variare. Assicurati di [controllare i tempi di sincronizzazione e i requisiti d'archiviazione](/developers/docs/nodes-and-clients/#recommended-specifications). Assicurati anche che la tua connessione a internet non sia limitata da un [limite di larghezza di banda](https://wikipedia.org/wiki/Data_cap). Si consiglia di usare una connessione non a consumo poiché la sincronizzazione iniziale e i dati trasmessi alla rete potrebbero eccedere il tuo limite.

#### Sistema operativo {#operating-system}

Tutti i client supportano i principali sistemi operativi: Linux, MacOS, Windows. Questo significa che puoi eseguire i nodi su macchine desktop o server ordinarie, con il sistema operativo (OS) più adatto alle tue esigenze. Assicurati che il tuo OS sia aggiornato per evitare potenziali problemi e vulnerabilità di sicurezza.

## Avviare il nodo {#spinning-up-node}

### Ottenere il software del client {#getting-the-client}

Prima, scarica il [software del client](/developers/docs/nodes-and-clients/#execution-clients) che preferisci.

Puoi semplicemente scaricare un'applicazione eseguibile o il pacchetto d'installazione più adatto tuo sistema operativo e architettura. Verifica sempre firme e checksum dei pacchetti scaricati. Alcuni client offrono anche repository per facilitare l’installazione e gli aggiornamenti. Se preferisci, puoi compilare dal codice sorgente. Tutti i client sono open source, quindi puoi compilarli dal codice sorgente con il compilatore adeguato.

I binari eseguibili per le implementazioni del client della rete principale stabili, sono scaricabili dalle pagine delle rispettive release:

- [Geth](https://geth.ethereum.org/downloads/),
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases),
- [Nethermind](https://downloads.nethermind.io/),
- [Besu](https://besu.hyperledger.org/en/stable/),
- [Erigon](https://github.com/ledgerwatch/erigon).

**Nota che OpenEthereum [è ormai obsoleto](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non più mantenuto.** Usalo con cautela e preferibilmente passa all'implementazione con un altro client.

### Avvio del client {#starting-the-client}

Prima di avviare il software del client di Ethereum, verifica che l'ambiente sia pronto. Ad esempio, assicurati:

- Che ci sia abbastanza spazio su disco considerando la rete e la modalità di sincronizzazione scelta.
- Che Memoria e CPU non siano bloccate da altri programmi.
- Che il sistema operativo sia aggiornato all'ultima versione.
- Che il sistema abbia l'ora e la data corrette.
- Che il tuo router e firewall accettino le connessioni sulle porte d'ascolto. Di default, i client di Ethereum usano una porta d'ascolto (TCP) e una porta di scoperta (UDP), entrambe di default su 30303.

Esegui prima il tuo client su una rete di prova, per assicurarti che tutto funzioni correttamente. [Potrebbe essere utile eseguire un nodo leggero di Geth](/developers/tutorials/run-light-node-geth/). All'avvio devi dichiarare qualsiasi impostazione del client che non sia predefinita. Puoi usare i flag o il file di configurazione per dichiarare la tua configurazione preferita. Dai un'occhiata alla documentazione del tuo client per le specifiche. L'esecuzione del client avvierà le sue funzioni principali, gli endpoint scelti e inizierà a cercare i peer. Dopo aver scoperto correttamente i peer, il client avvia la sincronizzazione. I dati della blockchain correnti saranno disponibili una volta che il client è correttamente sincronizzato allo stato corrente.

### Usare il client {#using-the-client}

I client offrono endpoint dell'API RPC che puoi usare per controllare il client e interagire con la rete di Ethereum in vari modi:

- Chiamarli manualmente con un protocollo adatto (es. usando `curl`)
- Allegare una console fornita (es. `geth attach`)
- Implementarlo nelle applicazioni

Client diversi hanno implementazioni diverse degli endpoint RPC. Ma esiste uno standard JSON-RPC che puoi usare con ogni client. Per una panoramica, [leggi la documentazione JSON-RPC](https://eth.wiki/json-rpc/API). Le applicazioni che necessitano di informazioni dalla rete di Ethereum possono usare questa RPC. Ad esempio, il popolare portafoglio MetaMask ti consente di [eseguire un'istanza della blockchain locale e connetterti a essa](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Raggiungere le RPC {#reaching-rpc}

La porta predefinita di JSON-RPC è `8545`, ma puoi modificare le porte degli endpoint locali nel file di configurazione. Di default, l'interfaccia RPC è raggiungibile solo sull'host locale del tuo computer. Per renderla accessibile da remoto, potresti esporla al pubblico cambiando l'indirizzo in `0.0.0.0`. Questo la renderà raggiungibile su indirizzi IP locali e pubblici. In gran parte dei casi, dovrai anche configurare il port forwarding sul tuo router.

Dovresti farlo con cautela, poiché questo consentirà a chiunque su internet di controllare il tuo nodo. Degli attori malevoli potrebbero accedere al tuo nodo per far cadere il tuo sistema o rubare i tuoi fondi se stai usando il tuo client come un portafoglio.

Un modo per aggirare questo problema è impedire ai metodi RPC potenzialmente dannosi di essere modificati. Ad esempio, con `geth`, puoi dichiarare i metodi modificabili con un flag: `--http.api web3,eth,txpool`.

Puoi anche ospitare l'accesso alla tua interfaccia RPC puntando il servizio del server web, come Nginx, all'indirizzo locale e la porta del tuo client.

Il metodo più sicuro e semplice per configurare un endpoint pubblicamente raggiungibile, puoi ospitarlo nel tuo servizio onion di [Tor](https://www.torproject.org/). Questo ti consentirà di raggiungere l’RPC al di fuori della tua rete locale senza un indirizzo IP pubblico statico o aprire le porte. Per farlo:

- Installa `tor`
- Modifica la configurazione di `torrc` per abilitare il servizio nascosto con l'indirizzo e la porta dell’RPC del tuo client
- Riavvia il servizio `tor`

Una volta riavviato Tor, riceverai chiavi di servizio nascoste e un nome dell'host nella cartella da te desiderata. Da allora, l’RPC sarà raggiungibile su un nome dell'host `.onion`.

### Operare il nodo {#operating-the-node}

Dovresti monitorare regolarmente il tuo nodo per assicurarti che operi correttamente. Occasionalmente potresti dover eseguire una manutenzione.

#### Mantenere il nodo online {#keeping-node-online}

Il tuo nodo non deve necessariamente essere sempre online, ma dovresti mantenerlo online il più possibile per mantenerlo sincronizzato con la rete. Puoi arrestarlo per riavviarlo, ma tieni a mente che:

- L'arresto può richiedere diversi minuti se lo stato recente è ancora in fase di scrittura sul disco.
- Gli arresti forzati possono danneggiare il database.
- Il tuo client perderà la sincronizzazione con la rete e dovrà risincronizzarsi al riavvio.

_Questo non vale per i nodi del validatore del livello del consenso._ Mettere offline il tuo nodo influenzerà tutti i servizi che ne dipendono. Se stai eseguendo un nodo per scopi di _staking_, dovresti provare a minimizzare i tempi di fermo il più possibile.

#### Creare il servizio del client {#creating-client-service}

Valuta la possibilità di creare un servizio per eseguire automaticamente il tuo client all'avvio. Ad esempio, sui server Linux, è buona prassi creare un servizio che esegua il client con la configurazione corretta, sotto utente con privilegi limitati e si riavvii automaticamente.

#### Aggiornare il client {#updating-client}

Devi mantenere aggiornato il software del tuo client con le ultime patch di sicurezza, funzionalità ed [EIP](/eips/). Specialmente prima di [diramazioni permanenti](/history/), assicurati che stai eseguendo la versione del client corretta.

#### Eseguire servizi aggiuntivi {#running-additional-services}

Eseguire il tuo nodo ti consente di usare servizi che richiedano accesso diretto all’RPC del client di Ethereum. Si tratta di servizi basati su Ethereum, come le [soluzioni di livello 2](/developers/docs/scaling/layer-2-rollups), i [client di consenso](/upgrades/get-involved/#clients) e altre infrastrutture di Ethereum.

#### Monitorare il nodo {#monitoring-the-node}

"Per monitorare correttamente il tuo nodo, valuta di raccogliere le metriche. I client forniscono endpoint per le metriche, così che tu possa ottenere dati completi sul tuo nodo. Usa strumenti come [InfluxDB](https://www.influxdata.com/get-influxdb/) o [Prometheus](https://prometheus.io/) per creare database che puoi trasformare in visualizzazioni e grafici in software come [Grafana](https://grafana.com/). Esistono molte impostazioni per usare questo software e diversi pannelli di controllo di Grafana che ti consentono avere una visione completa sul tuo nodo e sulla tua rete. Nell’ambito del monitoraggio, assicurati di tenere d'occhio le prestazioni della tua macchina. Durante la sincronizzazione iniziale del tuo nodo, il software del client potrebbe essere molto gravoso su CPU e RAM. Oltre a Grafana, puoi usare gli strumenti che il tuo OS offre come `htop` o `uptime`, per farlo.

## Lettura consigliate {#further-reading}

- [Analizzare i requisiti hardware per poter essere un nodo convalidato e completo di Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 settembre 2018_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 novembre 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, aggiornato spesso_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 maggio 2020_
- [Deploying Nethermind Ethereum Client with Monitoring Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 luglio 2020_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Blocchi](/developers/docs/blocks/)
- [Reti](/developers/docs/networks/)
