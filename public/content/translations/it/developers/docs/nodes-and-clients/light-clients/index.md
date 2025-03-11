---
title: Client leggeri
description: Introduzione ai client leggeri di Ethereum.
lang: it
---

Eseguire un nodo completo è il metodo più privato, decentralizzato, senza fiducia e resistente alle censura per interagire con Ethereum. Con un nodo completo mantieni la tua copia della blockchain che può essere interrogata istantaneamente e ottieni l'accesso diretto alla rete peer-to-peer di Ethereum. Tuttavia, eseguire un nodo completo richiede una significativa quantità di memoria, archiviazione e CPU. Ciò significa che non è fattibile per tutti eseguire il proprio nodo. Esistono diverse soluzioni sulla tabella di marcia di Ethereum, inclusa l'assenza di stato, ma mancano diversi anni alla loro implementazione. La risposta nel breve termine è barattare alcuni dei vantaggi dell'esecuzione di un nodo completo per grandi miglioramenti delle prestazioni che consentono l'esecuzione di nodi con requisiti hardware molto ridotti. I nodi che permettono tale compromesso sono noti come nodi leggeri.

## Cos'è un client leggero {#what-is-a-light-client}

Un nodo leggero è un nodo che esegue il software di un client leggero. Invece di mantenere copie locali dei dati della blockchain e verificare in modo indipendente tutte le modifiche, richiedono i dati necessari a qualche fornitore. Il fornitore potrebbe essere una connessione diretta a un nodo completo o tramite qualche server RPC centralizzato. I dati sono quindi verificati dal nodo leggero, consentendogli di tenere il passo con la testa della catena. Il nodo leggero elabora soltanto le intestazioni del blocco, scaricando solo occasionalmente i contenuti effettivi del blocco. I nodi possono variare nella propria leggerezza, a seconda delle combinazioni di software del client leggero e completo che eseguono. Ad esempio, la configurazione più leggera sarebbe eseguire un client di esecuzione leggero e un client di consenso leggero. È inoltre probabile che molti nodi sceglieranno di eseguire client di consenso leggeri con client di esecuzione completi, o viceversa.

## Come funzionano i client leggeri? {#how-do-light-clients-work}

Quando Ethereum ha iniziato a utilizzare il meccanismo di consenso basato sul proof-of-stake, è stata introdotta una nuova struttura specificamente per supportare i client leggeri. Opera selezionando casualmente un sottoinsieme di 512 validatori ogni 1,1 giorni affinché agisca da **commissione di sincronizzazione**. La commissione di sincronizzazione firma l'intestazione dei blocchi recenti. L'intestazione di ogni blocco contiene la firma aggregata dei validatori nella commissione di sincronizzazione e un "bitfield" che mostra quali validatori hanno firmato e quali no. Ogni intestazione, inoltre, include un elenco dei validatori che si prevede parteciperanno alla firma del blocco successivo. Ciò significa che un client leggero può vedere rapidamente se la commissione di sincronizzazione abbia autorizzato i dati ricevuti, nonché verificare che la commissione di sincronizzazione sia quella autentica confrontando quella da cui riceve l'autorizzazione con quella che avrebbe dovuto aspettarsi secondo il blocco precedente. Così, il client leggero può continuare ad aggiornare la propria conoscenza dell'ultimo blocco di Ethereum senza scaricare effettivamente il blocco, ma soltanto l'intestazione contenente le informazioni sintetiche.

Sul livello di esecuzione non esiste un'unica specifica per un client di esecuzione leggero. La portata di un client di esecuzione leggero può variare da una "modalità leggera" di un client di esecuzione completo, dotato di tutte le funzionalità di rete e dell'EVM di un nodo completo ma che verifica soltanto le intestazioni del blocco, senza scaricare i dati associati, o può essere un client più ridotto che fa fortemente affidamento sull'inoltro delle richieste a un fornitore RPC per interagire con Ethereum.

## Perché i client leggeri sono importanti? {#why-are-light-clients-important}

I client leggeri sono importanti perché consentono agli utenti di verificare i dati in entrata piuttosto che fidarsi ciecamente del fatto che il fornitore dei dati sia corretto e onesto, utilizzando soltanto una minuscola frazione delle risorse di calcolo di un nodo completo. I dati ricevuti dai client leggeri sono controllabili rispetto alle intestazioni dei blocchi che sanno essere stati firmati da almeno 2/3 di un insieme casuale di 512 validatori di Ethereum. Questa è una prova molto forte del fatto che i dati siano corretti.

Il client leggero utilizza soltanto una minuscola quantità di potenza di calcolo, memoria e archiviazione, così che sia eseguibile su uno smartphone, incorporato in un'app o come parte di un browser. I client leggeri sono un modo per rendere l'accesso a fiducia minimizzata a Ethereum tanto privo di attrito quanto lo sarebbe fidandosi di un fornitore terzo.

Facciamo un semplice esempio. Immagina di voler controllare il saldo del tuo conto. Per farlo, devi effettuare una richiesta a un nodo di Ethereum. Quel nodo controllerà la propria copia locale dello stato di Ethereum in cerca del tuo saldo, e te lo restituirà. Se non hai accesso diretto a un nodo, esistono degli operatori centralizzati che forniscono tali dati come servizio. Puoi inviare loro una richiesta, loro controllano il proprio nodo e ti inviano i risultati. Il problema, in questo caso, è che devi fidarti del fatto che il fornitore ti restituisca le informazioni corrette. Non puoi mai sapere davvero se le informazioni siano corrette se non puoi verificarle da solo.

Un client leggero affronta tale problema. Anche in questo caso richiedi i dati a qualche fornitore esterno, ma quando li ricevi sono dotati di una prova che il tuo nodo leggero può verificare rispetto alle informazioni ricevute nell'intestazione del blocco. Ciò significa che Ethereum sta verificando la correttezza dei tuoi dati invece di quelli di qualche operatore fidato.

## Quali innovazioni sono consentite dai client leggeri? {#what-innovations-do-light-clients-enable}

Il principale vantaggio dei client leggeri è che consentono a più persone di accedere a Ethereum in modo indipendente, con requisiti di hardware trascurabili e minima dipendenza da terze parti. Ciò è un bene per gli utenti, poiché possono verificare i propri dati, ed è un bene per la rete poiché aumenta il numero e la diversità dei nodi che verificano la catena.

La capacità di eseguire nodi di Ethereum su dispositivi con archiviazione, memoria e potenza di elaborazione molto ridotte è una delle aree principali d'innovazione sbloccate dai client leggeri. Laddove i nodi odierni di Ethereum richiedono molte risorse di calcolo, i client leggeri potrebbero essere incorporati nei browser, essere eseguiti su smartphone e forse persino su dispositivi più piccoli come smartwatch. Ciò significa che i portafogli di Ethereum con client incorporati potrebbero essere eseguiti su uno smartphone. Ciò significa che i portafogli mobili potrebbero essere molto più decentralizzati, non dovendosi fidare di fornitori di dati centralizzati per i propri dati.

Un'estensione di ciò è abilitare i dispositivi **IoT (Internet delle Cose)**. Un client leggero potrebbe essere utilizzato per provare rapidamente la proprietà del saldo di qualche token o NFT, con tutte le garanzie di sicurezza fornite dalle commissioni di sincronizzazione, innescando qualche azione su una rete IoT. Immagina un [servizio di noleggio di biciclette](https://youtu.be/ZHNrAXf3RDE?t=929) che utilizza un'app con un client leggero incorporato per verificare rapidamente che tu possieda l'NFT del servizio di noleggio e, in tal caso, sblocca una bici che tu possa utilizzare subito!

Anche i rollup di Ethereum beneficerebbero dei client leggeri. Uno dei grandi problemi dei rollup sono state le hack mirate ai ponti che consentono il trasferimento di fondi dalla Rete Principale di Ethereum a un rollup. Una vulnerabilità è data dagli oracoli utilizzati dai rollup per rilevare che un utente ha effettuato un deposito nel ponte. Se un oracolo alimenta dati malevoli, potrebbe indurre il rollup a pensare che si sia verificato un deposito al ponte e a rilasciare erroneamente dei fondi. Un client leggero incorporato nel rollup potrebbe essere utilizzato per proteggere dagli oracoli corrotti, poiché il deposito nel ponte potrebbe essere dotato di una prova verificabile dal rollup prima del rilascio di qualsiasi token. Lo stesso concetto potrebbe anche applicarsi ad altri ponti inter-catena.

I client leggeri potrebbero essere anche utilizzati per aggiornare i portafogli di Ethereum. Invece di fidarsi dei dati forniti da un fornitore RPC, il tuo portafoglio potrebbe verificare direttamente i dati presentati a te utilizzando un client leggero incorporato. Ciò aggiungerebbe sicurezza al tuo portafoglio. Se il tuo fornitore RPC è stato disonesto e ti ha fornito dei dati errati, il client leggero incorporato potrebbe dirtelo!

## Qual è lo stato attuale dello sviluppo dei client leggeri? {#current-state-of-development}

Esistono vari client leggeri in via di sviluppo, tra cui client leggeri di esecuzione, di consenso e combinati di esecuzione/consenso. Queste sono le implementazioni di client leggeri note nel momento in cui viene scritta questa pagina:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): client leggero di consenso in TypeScript
- [Helios](https://github.com/a16z/helios): client leggero combinato di esecuzione e consenso in Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): modalità leggera per il client di esecuzione (in via di sviluppo) in Go
- [Nimbus](https://nimbus.guide/el-light-client.html): client leggero di consenso in Nim

Per quanto ne sappiamo, nessuno è ancora considerato pronto alla produzione.

Inoltre, c'è molto lavoro da fare per migliorare il modo in cui i client leggeri possono accedere ai dati di Ethereum. Al momento, i client leggeri si affidano alle richieste RPC ai nodi completi utilizzando un modello client/server, ma in futuro i dati potrebbero essere richiesti in un modo più decentralizzato utilizzando una rete dedicata come la [Portal Network](https://www.ethportal.net/), che potrebbe servire i dati ai client leggeri utilizzando un protocollo di gossip peer-to-peer.

Altri punti della [tabella di marcia](/roadmap/) come gli [alberi di Verkle](/roadmap/verkle-trees/) e l'[assenza di stato](/roadmap/statelessness/) renderanno infine le garanzie di sicurezza dei client leggeri equivalenti a quelle dei client completi.

## Letture consigliate {#further-reading}

- [Zsolt Felfodhi sui client leggeri di Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sull'interconnessione dei client leggeri](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sui client leggeri dopo La Fusione](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: La strada tortuosa verso i client leggeri funzionali](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
