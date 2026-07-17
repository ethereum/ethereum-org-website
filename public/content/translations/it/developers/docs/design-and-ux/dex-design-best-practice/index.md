---
title: Migliori pratiche di progettazione per gli exchange decentralizzati (DEX)
description: Una guida che spiega le decisioni di UX/UI per lo swap di token.
lang: it
---

Dal lancio di Uniswap nel 2018, sono stati lanciati centinaia di exchange decentralizzati su dozzine di catene diverse.
Molti di questi hanno introdotto nuovi elementi o aggiunto il proprio tocco personale, ma l'interfaccia è rimasta generalmente la stessa.

Una delle ragioni è la [Legge di Jakob](https://lawsofux.com/jakobs-law/):

> Gli utenti trascorrono la maggior parte del loro tempo su altri siti. Ciò significa che gli utenti preferiscono che il tuo sito funzioni allo stesso modo di tutti gli altri siti che già conoscono.

Grazie ai primi innovatori come Uniswap, Pancakeswap e Sushiswap, gli utenti della finanza decentralizzata (DeFi) hanno un'idea collettiva di come sia fatto un DEX.
Per questo motivo, sta ora emergendo qualcosa di simile a una "migliore pratica". Vediamo sempre più decisioni di progettazione standardizzate tra i vari siti. Puoi vedere l'evoluzione dei DEX come un gigantesco esempio di test dal vivo. Le cose che hanno funzionato sono rimaste, quelle che non hanno funzionato sono state scartate. C'è ancora spazio per la personalità, ma ci sono determinati standard a cui un DEX dovrebbe conformarsi.

Questo articolo è un riassunto di:
- cosa includere
- come renderlo il più utilizzabile possibile
- i modi principali per personalizzare il design

Tutti i wireframe di esempio sono stati realizzati appositamente per questo articolo, sebbene siano tutti basati su progetti reali.

Il kit Figma è incluso anche in fondo: sentiti libero di usarlo e velocizzare i tuoi wireframe!

## Anatomia di base di un DEX {#basic-anatomy-of-a-dex}

L'interfaccia utente (UI) contiene generalmente tre elementi:
1. Modulo principale
2. Pulsante
3. Pannello dei dettagli

![Generic DEX UI, showing the three main elements](./1.png)


## Variazioni {#variations}

Questo sarà un tema ricorrente in questo articolo, ma ci sono vari modi diversi in cui questi elementi possono essere organizzati. Il "pannello dei dettagli" può essere:
- Sopra il pulsante
- Sotto il pulsante
- Nascosto in un pannello a fisarmonica
- E/o su un modale di "anteprima"
  
N.B. Un modale di "anteprima" è opzionale, ma se stai mostrando pochissimi dettagli nell'interfaccia utente principale, diventa essenziale.

## Struttura del modulo principale {#structure-of-the-main-form}

Questo è il riquadro in cui scegli effettivamente quale token vuoi scambiare (swap). Il componente è costituito da un campo di input e da un piccolo pulsante in una riga.

I DEX in genere mostrano dettagli aggiuntivi in una riga sopra e una riga sotto, sebbene questo possa essere configurato diversamente.

![Input row, with a details row above and below](./2.png)

## Variazioni {#variations2}

Qui sono mostrate due variazioni dell'interfaccia utente; una senza alcun bordo, creando un design molto aperto, e una in cui la riga di input ha un bordo, creando un focus su quell'elemento.

![Two UI variations of the main form](./3.png)

Questa struttura di base consente di mostrare **quattro informazioni chiave** nel design: una in ogni angolo. Se c'è solo una riga superiore/inferiore, allora ci sono solo due posti.

Durante l'evoluzione della finanza decentralizzata (DeFi), qui sono state incluse molte cose diverse.

## Informazioni chiave da includere {#key-info-to-include}

- Saldo nel portafoglio
- Pulsante Max
- Equivalente in valuta fiat
- Impatto sul prezzo sull'importo "ricevuto"

Agli albori della DeFi, l'equivalente in valuta fiat era spesso assente. Se stai costruendo qualsiasi tipo di progetto Web3, è essenziale che venga mostrato un equivalente in valuta fiat. Gli utenti pensano ancora in termini di valute locali, quindi per corrispondere ai modelli mentali del mondo reale, questo dovrebbe essere incluso.

Nel secondo campo (quello in cui scegli il token verso cui stai effettuando lo swap) puoi anche includere l'impatto sul prezzo accanto all'importo in valuta fiat, calcolando la differenza tra l'importo di input e gli importi di output stimati. Questo è un dettaglio piuttosto utile da includere.

I pulsanti percentuali (ad es. 25%, 50%, 75%) possono essere una funzionalità utile, ma occupano più spazio, aggiungono più inviti all'azione e aumentano il carico mentale. Lo stesso vale per gli slider percentuali. Alcune di queste decisioni sull'interfaccia utente dipenderanno dal tuo marchio e dal tuo tipo di utente.

Dettagli extra possono essere mostrati sotto il modulo principale. Poiché questo tipo di informazioni è principalmente per utenti professionisti, ha senso:
- mantenerlo il più minimale possibile, oppure;
- nasconderlo in un pannello a fisarmonica

![Details shown in the corners of that main form](./4.png)

## Informazioni extra da includere {#extra-info-to-include}

- Prezzo del token
- Slittamento
- Minimo ricevuto
- Output previsto
- Impatto sul prezzo
- Stima del costo del gas
- Altre commissioni
- Instradamento dell'ordine

Probabilmente, alcuni di questi dettagli potrebbero essere opzionali.

L'instradamento dell'ordine è interessante, ma non fa molta differenza per la maggior parte degli utenti.

Alcuni altri dettagli stanno semplicemente ribadendo la stessa cosa in modi diversi. Ad esempio, "minimo ricevuto" e "slittamento" sono due facce della stessa medaglia. Se hai lo slittamento impostato all'1%, il minimo che puoi aspettarti di ricevere = output previsto - 1%. Alcune interfacce utente mostreranno l'importo previsto, l'importo minimo e lo slittamento... Il che è utile ma forse eccessivo. 

La maggior parte degli utenti lascerà comunque lo slittamento predefinito.

L'"impatto sul prezzo" è spesso mostrato tra parentesi accanto all'equivalente in valuta fiat nel campo "verso". Questo è un ottimo dettaglio di UX da aggiungere, ma se viene mostrato qui, ha davvero bisogno di essere mostrato di nuovo sotto? E poi di nuovo in una schermata di anteprima?

A molti utenti (specialmente quelli che effettuano lo swap di piccoli importi) non importerà di questi dettagli; inseriranno semplicemente un numero e premeranno swap.

![Some details show the same thing](./5.png)

Esattamente quali dettagli vengono mostrati dipenderà dal tuo pubblico e dall'atmosfera che vuoi che l'app abbia.

Se includi la tolleranza allo slittamento nel pannello dei dettagli, dovresti anche renderla modificabile direttamente da qui. Questo è un buon esempio di "acceleratore"; un trucco di UX pulito che può velocizzare i flussi degli utenti esperti, senza influire sull'usabilità generale dell'app.

![Slippage can be controlled from the details panel](./6.png)

È una buona idea pensare attentamente non solo a una singola informazione su una schermata, ma all'intero flusso:
Inserimento dei numeri nel Modulo Principale → Scansione dei Dettagli → Clic sulla Schermata di Anteprima (se hai una schermata di anteprima). 
Il pannello dei dettagli dovrebbe essere sempre visibile o l'utente deve cliccarci sopra per espanderlo?
Dovresti creare attrito aggiungendo una schermata di anteprima? Questo costringe l'utente a rallentare e considerare il proprio scambio, il che può essere utile. Ma vogliono vedere di nuovo tutte le stesse informazioni? Cosa è più utile per loro a questo punto?

## Opzioni di design {#design-options}

Come accennato, molto di questo si riduce al tuo stile personale
Chi è il tuo utente?
Qual è il tuo marchio?
Vuoi un'interfaccia "pro" che mostri ogni dettaglio o vuoi essere minimalista?
Anche se punti agli utenti professionisti che vogliono tutte le informazioni possibili, dovresti comunque ricordare le sagge parole di Alan Cooper:

> Non importa quanto sia bella, non importa quanto sia fantastica la tua interfaccia, sarebbe meglio se ce ne fosse di meno.

### Struttura {#structure}

- token a sinistra o token a destra
- 2 righe o 3
- dettagli sopra o sotto il pulsante
- dettagli espansi, ridotti a icona o non mostrati

### Stile del componente {#component-style}

- vuoto
- contornato
- riempito

Da un punto di vista puramente di UX, lo stile dell'interfaccia utente conta meno di quanto pensi. Le tendenze visive vanno e vengono in cicli e gran parte delle preferenze è soggettiva.

Il modo più semplice per farsi un'idea di questo - e pensare alle varie configurazioni diverse - è dare un'occhiata ad alcuni esempi e poi fare qualche esperimento da soli.

Il kit Figma incluso contiene componenti vuoti, contornati e riempiti.

Dai un'occhiata agli esempi seguenti per vedere i diversi modi in cui puoi mettere tutto insieme:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Ma da che parte dovrebbe andare il token? {#but-which-side-should-the-token-go-on}

Il punto è che probabilmente non fa un'enorme differenza per l'usabilità. Ci sono alcune cose da tenere a mente, tuttavia, che potrebbero farti propendere da una parte o dall'altra.

È stato moderatamente interessante vedere la moda cambiare nel tempo. Uniswap inizialmente aveva il token a sinistra, ma da allora lo ha spostato a destra. Anche Sushiswap ha apportato questa modifica durante un aggiornamento del design. La maggior parte dei protocolli, ma non tutti, ha seguito l'esempio.

La convenzione finanziaria tradizionalmente mette il simbolo della valuta prima del numero, ad es. $50, €50, £50, ma noi *diciamo* 50 dollari, 50 euro, 50 sterline.

Per l'utente generico, specialmente per chi legge da sinistra a destra, dall'alto verso il basso, il token a destra probabilmente sembra più naturale.

![A UI with tokens on the left](./13.png)

Mettere il token a sinistra e tutti i numeri a destra sembra piacevolmente simmetrico, il che è un vantaggio, ma c'è un altro svantaggio in questo layout.

La legge della prossimità afferma che gli elementi vicini tra loro sono percepiti come correlati. Di conseguenza, vogliamo posizionare gli elementi correlati uno accanto all'altro. Il saldo del token è direttamente correlato al token stesso e cambierà ogni volta che viene selezionato un nuovo token. Ha quindi leggermente più senso che il saldo del token si trovi accanto al pulsante di selezione del token. Potrebbe essere spostato sotto il token, ma ciò rompe la simmetria del layout.

In definitiva, ci sono pro e contro per entrambe le opzioni, ma è interessante come la tendenza sembri essere verso il token a destra.

## Comportamento del pulsante {#button-behavior}

Non avere un pulsante separato per Approvare. Inoltre, non avere un clic separato per Approvare. L'utente vuole effettuare lo Swap, quindi scrivi semplicemente "swap" sul pulsante e avvia l'approvazione come primo passaggio. Un modale può mostrare i progressi con uno stepper o una semplice notifica "tx 1 di 2 - approvazione in corso".

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Pulsante come aiuto contestuale {#button-as-contextual-help}

Il pulsante può svolgere una doppia funzione come avviso!

Questo è in realtà un modello di progettazione piuttosto insolito al di fuori del Web3, ma è diventato standard al suo interno. Questa è una buona innovazione in quanto fa risparmiare spazio e mantiene l'attenzione focalizzata.

Se l'azione principale - SWAP - non è disponibile a causa di un errore, il motivo può essere spiegato con il pulsante, ad es.:

- cambia rete
- connetti portafoglio
- vari errori

Il pulsante può anche essere **mappato all'azione** che deve essere eseguita. Ad esempio, se l'utente non può effettuare lo swap perché si trova sulla rete sbagliata, il pulsante dovrebbe dire "passa a Ethereum" e, quando l'utente fa clic sul pulsante, dovrebbe cambiare la rete in Ethereum. Questo accelera notevolmente il flusso dell'utente.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Costruisci il tuo con questo file Figma {#build-your-own-with-this-figma-file}

Grazie al duro lavoro di molteplici protocolli, il design dei DEX è migliorato molto. Sappiamo di quali informazioni ha bisogno l'utente, come dovremmo mostrarle e come rendere il flusso il più fluido possibile.
Speriamo che questo articolo fornisca una solida panoramica dei principi di UX. 

Se vuoi sperimentare, sentiti libero di usare il kit di wireframe Figma. È mantenuto il più semplice possibile, ma ha abbastanza flessibilità per costruire la struttura di base in vari modi.

[Kit di wireframe Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

La finanza decentralizzata (DeFi) continuerà a evolversi e c'è sempre spazio per migliorare. 

Buona fortuna!