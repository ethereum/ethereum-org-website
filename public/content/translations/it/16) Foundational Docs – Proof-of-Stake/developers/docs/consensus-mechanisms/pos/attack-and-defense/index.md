---
title: Attacco e difesa del proof-of-stake di Ethereum
description: Scopri di più sui vettori di attacco noti sul proof-of-stake di Ethereum e come sono difesi.
lang: it
---

Ladri e sabotatori sono costantemente alla ricerca di opportunità per attaccare i software dei client di Ethereum. Questa pagina delinea i vettori di attacco noti sul livello di consenso di Ethereum, definendo come possono essere difesi.

## Prerequisiti {#prerequisites}

##  {#what-is-pos}

Spesso si crede erroneamente che un utente malevolo di successo possa generare altro ether, o drenarlo da conti arbitrari. Nessuna delle due cose è possibile, poiché tutte le transazioni sono eseguite da tutti i client di esecuzione sulla rete. Devono soddisfare delle condizioni di validità di base (es. le transazioni sono firmate dalla chiave privata del mittente, il mittente ha un saldo sufficiente, ecc.), altrimenti sono semplicemente annullate. Esistono tre classi di risultati che un utente malevolo potrebbe realisticamente ottenere: riorganizzazioni, doppia finalità o ritardo della finalità.

##  {#validators}

Una **"riorganizzazione"** è un rimescolamento dei blocchi in un nuovo ordine, magari con l'aggiunta o la sottrazione di blocchi nella catena canonica. Una riorganizzazione malevola potrebbe assicurare l'inclusione o esclusione di blocchi specifici, consentendo la doppia spesa o l'estrazione di valore da transazioni di front-running e back-running (MEV). Le riorganizzazioni, inoltre, potrebbero essere utilizzate per impedire l'inclusione di certe transazioni nella catena canonica: una forma di censura. La forma più estrema di riorganizzazione è detta "inversione di finalità", che rimuove o sostituisce dei blocchi precedentemente finalizzati. Questa è possibile soltanto se più di ⅓ dell'ether in staking totale è distrutto dall'utente malevolo; questa garanzia è nota come "finalità economica" – maggiori informazioni al riguardo sono riportate in seguito.

La **doppia finalità** è l'improbabile ma grave condizione in cui due diramazioni riescono a finalizzarsi simultaneamente, creando uno scisma permanente nella catena. Ciò è teoricamente possibile per un utente malevolo disposto a rischiare il 34% dell'ether in staking totale. La community sarebbe obbligata a coordinarsi all'esterno della catena e accordarsi su quale catena seguire, il che richiederebbe forza al livello sociale.

##  {#transaction-execution-ethereum-pos}

1.
2.
3.
4.
5.
6.

Un attacco al livello sociale potrebbe mirare a minare la fiducia pubblica in Ethereum, svalutare l'ether, ridurne l'adozione o indebolire la community di Ethereum per complicare la coordinazione fuori banda.

##  {#finality}

Prima di tutto, gli individui che non partecipano attivamente a Ethereum (eseguendo un software del client), possono attaccarlo prendendo di mira il livello sociale (Livello 0). Il Livello 0 è la base su cui è costruito Ethereum e, come tale, rappresenta una potenziale superficie per gli attacchi, con conseguenze che si propagano sul resto dello stack. Alcuni esempi potrebbero includere:

##  {#crypto-economic-security}

Ciò che rende particolarmente pericolosi questi attacchi è che in molti casi è necessario disporre di pochissimo capitale o conoscenze tecniche. Un attacco al Livello 0 potrebbe essere un moltiplicatore di un attacco cripto-economico. Ad esempio, se la censura o l'inversione della finalità fossero ottenute da uno stakeholder attivo di maggioranza, minare il livello sociale potrebbe complicare la coordinazione di una risposta fuori banda della community.

Difendersi dagli attacchi di Livello 0 probabilmente non è semplice, ma possono essere stabiliti dei principi fondamentali. Uno di questi è mantenere un rapporto complessivamente elevato tra segnale e rumore per le informazioni pubbliche su Ethereum, create e diffuse da membri onesti della community tramite blog, server Discord, specifiche annotate, libri, podcast e YouTube. Qui su ethereum.org cerchiamo di mantenere informazioni accurate e di tradurle in quante più lingue possibili. Inondare uno spazio di informazioni di alta qualità e meme è una difesa efficiente contro la disinformazione.

##  {#fork-choice}

Un'altra fortificazione importante contro gli attacchi al livello sociale è una chiara dichiarazione di missione e un chiaro protocollo di governance. Ethereum si è posizionato come il campione di decentralizzazione e sicurezza tra i livelli 1 dei contratti intelligenti, dando anche un elevato valore a scalabilità e sostenibilità. A prescindere dall'insorgere di divergenze nella community di Ethereum, questi principi essenziali sono minimamente compromessi. Valutare una narrativa basata su tali principi essenziali ed esaminarli tramite tranche successive di revisioni nel processo di EIP (proposta di miglioramento di Ethereum) potrebbe aiutare la community a distinguere gli utenti buoni da quelli "cattivi" e a limitare l'ambito di influenza degli utenti malevoli nella direzione futura di Ethereum.

##  {#pos-and-security}

Infine, è fondamentale che la community di Ethereum resti aperta e accogliente per tutti i partecipanti. Una community con guardiani ed esclusività è una community specialmente vulnerabile agli attacchi sociali, poiché è facile costruire narrative "noi e loro". Il tribalismo e il massimalismo tossico feriscono la community ed erodono la sicurezza del Livello 0. Gli utenti di Ethereum con un interesse acquisito nella sicurezza della rete dovrebbero vedere la propria condotta online e nel mondo reale come un contributo diretto alla sicurezza del Livello 0 di Ethereum.

-
-
-
- L'infiltrazione di utenti esperti ma malevoli nella community di sviluppatori il cui obiettivo è rallentare il progresso con discussioni futili, ritardare le decisioni fondamentali, creare spam, ecc.

##  {#pros-and-cons}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#comparison-to-proof-of-work}

Svariati documenti hanno spiegato gli attacchi a Ethereum che ottengono riorganizzazioni o ritardi di finalità con soltanto una piccola quota dell'ether in staking totale. Questi, generalmente, si affidano al fatto che l'utente malevolo trattenga alcune informazioni da altri validatori per poi rilasciarle in modo sfumato e/o in un momento opportuno.

-
-
-
-
-
-

##  {#further-reading}

-
-
-
-
-
- []()
-
- []()

##  {#related-topics}

- []()
- []()
