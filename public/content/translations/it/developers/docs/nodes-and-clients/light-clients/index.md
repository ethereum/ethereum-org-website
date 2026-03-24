---
title: Client leggeri
description: Introduzione ai client leggeri di Ethereum.
lang: it
---

Eseguire un nodo completo è il modo più trustless (senza bisogno di fiducia), privato, decentralizzato e resistente alla censura per interagire con [Ethereum](/). Con un nodo completo mantieni la tua copia della blockchain che puoi interrogare istantaneamente e ottieni accesso diretto alla rete peer-to-peer di Ethereum. Tuttavia, eseguire un nodo completo richiede una quantità significativa di memoria, spazio di archiviazione e CPU. Ciò significa che non è fattibile per tutti eseguire il proprio nodo. Ci sono diverse soluzioni a questo nel piano d'azione di Ethereum, inclusa l'assenza di stato (statelessness), ma mancano ancora diversi anni alla loro implementazione. La risposta a breve termine è scendere a compromessi su alcuni dei vantaggi dell'esecuzione di un nodo completo in cambio di grandi miglioramenti delle prestazioni che consentono ai nodi di funzionare con requisiti hardware molto bassi. I nodi che accettano questo compromesso sono noti come nodi leggeri (light node).

## Cos'è un client leggero {#what-is-a-light-client}

Un nodo leggero è un nodo che esegue un software client leggero. Invece di mantenere copie locali dei dati della blockchain e verificare in modo indipendente tutte le modifiche, richiedono i dati necessari a un fornitore. Il fornitore potrebbe essere una connessione diretta a un nodo completo o tramite un server RPC centralizzato. I dati vengono poi verificati dal nodo leggero, consentendogli di stare al passo con la testa della catena. Il nodo leggero elabora solo le intestazioni dei blocchi, scaricando solo occasionalmente i contenuti effettivi del blocco. I nodi possono variare nella loro leggerezza, a seconda delle combinazioni di software client leggero e completo che eseguono. Ad esempio, la configurazione più leggera consisterebbe nell'eseguire un client di esecuzione leggero e un client di consenso leggero. È anche probabile che molti nodi sceglieranno di eseguire client di consenso leggeri con client di esecuzione completi, o viceversa.

## Come funzionano i client leggeri? {#how-do-light-clients-work}

Quando Ethereum ha iniziato a utilizzare un meccanismo di consenso basato sulla prova di stake, è stata introdotta una nuova infrastruttura specificamente per supportare i client leggeri. Il modo in cui funziona è selezionando casualmente un sottoinsieme di 512 validatori ogni 1,1 giorni per agire come **comitato di sincronizzazione** (sync committee). Il comitato di sincronizzazione firma l'intestazione dei blocchi recenti. Ogni intestazione del blocco contiene la firma aggregata dei validatori nel comitato di sincronizzazione e un "bitfield" che mostra quali validatori hanno firmato e quali no. Ogni intestazione include anche un elenco di validatori che dovrebbero partecipare alla firma del blocco successivo. Ciò significa che un client leggero può vedere rapidamente che il comitato di sincronizzazione ha approvato i dati che riceve, e può anche verificare che il comitato di sincronizzazione sia quello autentico confrontando quello che riceve con quello che gli era stato detto di aspettarsi nel blocco precedente. In questo modo, il client leggero può continuare ad aggiornare la sua conoscenza dell'ultimo blocco di Ethereum senza scaricare effettivamente il blocco stesso, ma solo l'intestazione che contiene informazioni riassuntive.

Sul livello di esecuzione non esiste una singola specifica per un client di esecuzione leggero. L'ambito di un client di esecuzione leggero può variare da una "modalità leggera" di un client di esecuzione completo che ha tutte le funzionalità EVM e di rete di un nodo completo ma verifica solo le intestazioni dei blocchi, senza scaricare i dati associati, oppure può essere un client più ridotto che si affida pesantemente all'inoltro delle richieste a un fornitore RPC per interagire con Ethereum.

## Perché i client leggeri sono importanti? {#why-are-light-clients-important}

I client leggeri sono importanti perché consentono agli utenti di verificare i dati in entrata piuttosto che fidarsi ciecamente che il loro fornitore di dati sia corretto e onesto, pur utilizzando solo una minima frazione delle risorse computazionali di un nodo completo. I dati che i client leggeri ricevono possono essere verificati rispetto alle intestazioni dei blocchi che sanno essere state firmate da almeno 2/3 di un insieme casuale di 512 validatori di Ethereum. Questa è una prova molto forte che i dati sono corretti.

Il client leggero utilizza solo una minima quantità di potenza di calcolo, memoria e spazio di archiviazione, quindi può essere eseguito su un telefono cellulare, incorporato in un'app o come parte di un browser. I client leggeri sono un modo per rendere l'accesso a Ethereum con minimizzazione della fiducia (trust-minimized) altrettanto privo di attriti quanto fidarsi di un fornitore di terze parti.

Facciamo un semplice esempio. Immagina di voler controllare il saldo del tuo account. Per farlo devi fare una richiesta a un nodo di Ethereum. Quel nodo controllerà la sua copia locale dello stato di Ethereum per il tuo saldo e te lo restituirà. Se non hai accesso diretto a un nodo, ci sono operatori centralizzati che forniscono questi dati come servizio. Puoi inviare loro una richiesta, loro controllano il loro nodo e ti inviano il risultato. Il problema è che poi devi fidarti che il fornitore ti stia dando le informazioni corrette. Non puoi mai sapere veramente se le informazioni sono corrette se non puoi verificarle da solo.

Un client leggero affronta questo problema. Richiedi ancora i dati a un fornitore esterno, ma quando ricevi i dati indietro, questi sono accompagnati da una prova che il tuo nodo leggero può verificare rispetto alle informazioni che ha ricevuto nell'intestazione del blocco. Ciò significa che Ethereum sta verificando la correttezza dei tuoi dati invece di un operatore fidato.

## Quali innovazioni abilitano i client leggeri? {#what-innovations-do-light-clients-enable}

Il vantaggio principale dei client leggeri è consentire a più persone di accedere a Ethereum in modo indipendente con requisiti hardware trascurabili e una dipendenza minima da terze parti. Questo è un bene per gli utenti perché possono verificare i propri dati ed è un bene per la rete perché aumenta il numero e la diversità dei nodi che stanno verificando la catena.

La capacità di eseguire nodi di Ethereum su dispositivi con spazio di archiviazione, memoria e potenza di elaborazione molto ridotti è una delle principali aree di innovazione sbloccate dai client leggeri. Mentre oggi i nodi di Ethereum richiedono molte risorse di calcolo, i client leggeri potrebbero essere incorporati nei browser, eseguiti su telefoni cellulari e forse anche su dispositivi più piccoli come gli smartwatch. Ciò significa che i portafogli di Ethereum con client incorporati potrebbero funzionare su un telefono cellulare. Ciò significa che i portafogli mobili potrebbero essere molto più decentralizzati in quanto non dovrebbero fidarsi di fornitori di dati centralizzati per i loro dati.

Un'estensione di questo è l'abilitazione dei dispositivi dell'**internet delle cose (IoT)**. Un client leggero potrebbe essere utilizzato per dimostrare rapidamente la proprietà di un saldo di token o di un NFT, con tutte le garanzie di sicurezza fornite dai comitati di sincronizzazione, innescando qualche azione su una rete IoT. Immagina un [servizio di noleggio biciclette](https://youtu.be/ZHNrAXf3RDE?t=929) che utilizza un'app con un client leggero incorporato per verificare rapidamente che possiedi l'NFT del servizio di noleggio e, in tal caso, sblocca una bicicletta per farti fare un giro!

Anche i rollup di Ethereum trarrebbero vantaggio dai client leggeri. Uno dei grandi problemi per i rollup sono stati gli attacchi informatici mirati ai ponti che consentono il trasferimento di fondi dalla rete principale di Ethereum a un rollup. Una vulnerabilità sono gli oracoli che i rollup utilizzano per rilevare che un utente ha effettuato un deposito nel ponte. Se un oracolo fornisce dati errati, potrebbe ingannare il rollup facendogli credere che ci sia stato un deposito nel ponte e rilasciare fondi in modo errato. Un client leggero incorporato nel rollup potrebbe essere utilizzato per proteggersi da oracoli corrotti perché il deposito nel ponte potrebbe essere accompagnato da una prova che può essere verificata dal rollup prima di rilasciare qualsiasi token. Lo stesso concetto potrebbe essere applicato anche ad altri ponti inter-catena.

I client leggeri potrebbero anche essere utilizzati per aggiornare i portafogli di Ethereum. Invece di fidarsi dei dati forniti da un fornitore RPC, il tuo portafoglio potrebbe verificare direttamente i dati che ti vengono presentati utilizzando un client leggero incorporato. Questo aggiungerebbe sicurezza al tuo portafoglio. Se il tuo fornitore RPC fosse disonesto e ti fornisse dati errati, il client leggero incorporato potrebbe dirtelo!

## Qual è lo stato attuale dello sviluppo dei client leggeri? {#current-state-of-development}

Ci sono diversi client leggeri in fase di sviluppo, inclusi client leggeri di esecuzione, di consenso e combinati di esecuzione/consenso. Queste sono le implementazioni di client leggeri di cui siamo a conoscenza al momento della stesura di questa pagina:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): client di consenso leggero in TypeScript
- [Helios](https://github.com/a16z/helios): client leggero combinato di esecuzione e consenso in Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): modalità leggera per il client di esecuzione (in sviluppo) in Go
- [Nimbus](https://nimbus.guide/el-light-client.html): client di consenso leggero in Nim

Per quanto ne sappiamo, nessuno di questi è ancora considerato pronto per la produzione.

Si sta anche lavorando molto per migliorare i modi in cui i client leggeri possono accedere ai dati di Ethereum. Attualmente, i client leggeri si affidano a richieste RPC ai nodi completi utilizzando un modello client/server, ma in futuro i dati potrebbero essere richiesti in modo più decentralizzato utilizzando una rete dedicata come la [Portal Network](https://www.ethportal.net/) che potrebbe servire i dati ai client leggeri utilizzando un protocollo di gossip peer-to-peer.

Altri elementi del [piano d'azione](/roadmap/) come gli [alberi di Verkle](/roadmap/verkle-trees/) e l'[assenza di stato](/roadmap/statelessness/) porteranno infine le garanzie di sicurezza dei client leggeri a essere pari a quelle dei client completi.

## Letture consigliate {#further-reading}

- [Zsolt Felfodhi sui client leggeri di Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sul networking dei client leggeri](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sui client leggeri dopo Il Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: La strada tortuosa verso client leggeri funzionali](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)