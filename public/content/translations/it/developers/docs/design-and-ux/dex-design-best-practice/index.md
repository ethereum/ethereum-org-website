---
title: Buone pratiche di progettazione di borse decentralizzate (DEX)
description: Una guida che spiega le decisioni UX/UI per lo scambio di token.
lang: it
---

Dal lancio di Uniswap nel 2018, sono state lanciate centinaia di borse decentralizzate in decine di catene differenti.
Molte di queste hanno introdotto nuovi elementi o aggiunto i propri tocchi, ma l'interfaccia è rimasta per lo più la stessa.

Una delle ragioni è la [Legge di Jakob](https://lawsofux.com/jakobs-law/):

> Gli utenti trascorrono la maggior parte del tempo su altri siti. Ciò significa che gli utenti preferiscono che il tuo sito funzioni proprio come gli altri che già conoscono.

Grazie ai primi innovatori come Uniswap, Pancakeswap e Sushiswap, gli utenti della DeFi hanno un'idea collettiva dell'aspetto di una DEX.
Per questo motivo adesso sta emergendo qualcosa di simile alle "buone pratiche". Osserviamo una sempre maggiore standardizzazione delle decisioni di progettazione nei vari siti. L'evoluzione delle DEX può essere visto come un grande esempio di test in corso d'opera. Le cose che hanno funzionato rimangono, mentre quelle che non hanno funzionato vengono scartate. C'è ancora spazio per la personalità, ma ci sono alcuni standard a cui una DEX si deve conformare.

Questo articolo è il riassunto di:

- cosa includere
- come renderlo utilizzabile e possibile
- i modi principali di personalizzare la progettazione

Tutti i wireframe di esempio sono stati realizzati specificatamente per questo articolo, anche se si basano su progetti reali.

In fondo è incluso anche il kit di Figma: puoi usarlo liberamente per velocizzare i tuoi wireframe!

## Anatomia di base di uan DEX {#basic-anatomy-of-a-dex}

L'interfaccia utente (UI) in genere contiene tre elementi:

1. Modulo principale
2. Pulsante
3. Pannello dei dettagli

![UI di DEX generica, che mostra i tre elementi principali](./1.png)

## Varianti {#variations}

Questo sarà un tema ricorrente in questo articolo, ma ci sono modi diversi con i quali questi elementi possono essere organizzati. I "pannello dei dettagli" può essere:

- Sopra il pulsante
- Sotto il pulsante
- Nascosto in un pannello accordion
- E/o in una finestra modale “anteprima”

N.B. Una finestra modale "anteprima" è facoltativa ma diventa essenziale se si stanno mostrando pochissimi dettagli sull'UI principale.

## Struttura del modulo principale {#structure-of-the-main-form}

Questo è il riquadro dove si sceglie di fatto quale token scambiare. Il componente consiste in un campo di input e un piccolo pulsante sulla stessa riga.

Le DEX di solito mostrano ulteriori dettagli su una riga sopra e una sotto, anche se questo può essere configurato diversamente.

![Riga di input, con una riga di dettaglio sopra e una sotto](./2.png)

## Varianti {#variations2}

Qui sono mostrate due varianti della UI: una senza bordi, creando un design molto aperto, e una dove la riga di input ha un bordo, creando un focus su quell'elemento.

![Due varianti della UI del modulo principale](./3.png)

Questa struttura di base permette di visualizzare **quattro informazioni chiave** nel design: una in ogni angolo. Se c'è solo una riga sopra/sotto, allora ci sono solo due punti focali.

Durante l'evoluzione della DeFi, qui sono stati inclusi molti elementi diversi.

## Informazioni chiave da includere {#key-info-to-include}

- Saldo nel portafoglio
- Pulsante max
- Equivalente in valuta legale
- Impatto del prezzo sull'importo "ricevuto"

Agli albori della DeFi, l'equivalente in valuta legale era spesso mancante. Se si sta costruendo qualsiasi progetto Web3, è essenziale che sia mostrato un equivalente in valuta legale. Gli utenti pensano ancora in termini di valuta locale, quindi questo dato dovrebbe essere incluso per adeguarsi ai modelli mentali del mondo reale.

Nel secondo campo (quello dove si sceglie il token per il quale effettuare lo scambio), vicino all'importo in valuta legale è possibile includere anche l'impatto del prezzo, calcolando la differenza tra l'importo dell'input e la stima dell'importo dell'output. Questo è un dettaglio piuttosto utile da includere.

I pulsanti di percentuale (ad es. 25%, 50%, 75%) possono essere una funzione utile, ma occupano più spazio, aggiungono più chiamate all'azione e aumentano il carico mentale. Lo stesso vale per i cursori percentuali. Alcune di queste decisioni sulla UI dipendono dal proprio brand e dal proprio tipo di utente.

Sotto il modulo principale possono essere visualizzati dettagli extra. Dato che questo tipo di informazione è soprattutto per gli utenti avanzati, ha senso:

- tenerli il più minimali possibile, oppure;
- nasconderli nel pannello accordion

![Dettagli visualizzati negli angoli del modulo principale](./4.png)

## Informazioni extra da includere {#extra-info-to-include}

- Prezzo dei token
- Scivolamento
- Minimo ricevuto
- Output previsto
- Impatto del prezzo
- Stima del costo del gas
- Altre commissioni
- Instradamento degli ordini

Probabilmente alcuni di questi dettagli potrebbero essere facoltativi.

L'instradamento degli ordini è interessante, ma non fa molta differenza per la maggior parte degli utenti.

Altri dettagli ripetono semplicemente la stessa cosa in modi diversi. Per esempio "minimo ricevuto" e "scivolamento" sono due facce della stessa medaglia. Se si ha lo scivolamento fissato all'1%, allora il minimo che ci si può aspettare di ricevere = output previsto -1%. Alcune UI visualizzeranno la quantità prevista, la quantità minima e lo scivolamento… Il che è utile ma forse eccessivo.

Molti utenti lasceranno in ogni caso lo scivolamento predefinito.

L'"impatto del prezzo" è spesso visualizzato tra parentesi vicino all'equivalente in valuta legale nel campo "a". Questo è un fantastico dettaglio UX da aggiungere – ma se viene visualizzato qui, occorre davvero che sia mostrato di nuovo anche sotto? E poi ancora una volta su una schermata di anteprima?

A molti utenti (specialmente quelli che scambiano piccole cifre) non interessano questi dettagli; vogliono semplicemente immettere un numero e cliccare su scambia.

![Alcuni dettagli mostrano la stessa cosa](./5.png)

I dettagli precisi che saranno visualizzati dipenderà dal proprio pubblico e dall'impatto che si vuole abbia la propria applicazione.

Se si decide di includere la tolleranza di scivolamento nel pannello dei dettagli, dovrebbe anche essere resa modificabile direttamente da lì. Questo è un buon esempio di "acceleratore"; un trucco per una UX pulita che può velocizzare il flusso degli utenti esperti senza inficiare l'usabilità generale dell'applicazione.

![Lo scivolamento può essere controllato dal pannello dei dettagli](./6.png)

È una buona idea pensare attentamente non solo a un'informazione specifica in una schermata, ma all'intero flusso come segue:
Immettere numeri nel Modulo principale → Rivedere i dettagli → Fare clic sulla Schermata di anteprima (se prevista).
Il pannello dei dettagli dev'essere sempre visibile o l'utente deve cliccare per ampliarlo?
Andrebbe creata frizione aggiungendo una schermata di anteprima? Questo obbliga l'utente a rallentare e valutare lo scambio, il che può essere utile. Ma desidera vedere di nuovo le stesse informazioni? Qual è la più importante a questo punto?

## Opzioni di progettazione {#design-options}

Come detto, molto di tutto ciò dipende dal proprio stile personale
Chi è il proprio utente?
Qual è il proprio marchio?
Si desidera un'interfaccia avanzata che visualizzi ogni dettaglio o qualcosa di minimalista?
Anche se si mira agli utenti avanzati che vogliono tutte le informazioni possibili, non bisogna dimenticare le parole sagge di Alan Cooper:

> Non importa quanto bella o di tendenza sia la tua interfaccia, sarebbe ancora più bella se fosse ridotta.

### Struttura {#structure}

- token sulla sinistra, o token sulla destra
- 2 righe o 3
- dettagli sopra o sotto il pulsante
- dettagli ampliati, ridotti a icona o non visualizzati

### Stile dei componenti {#component-style}

- vuoto
- bordato
- pieno

Da un punto di vista puramente UX, lo stile della UI è meno importante di quanto si pensi. Le tendenze vanno e vengono ciclicamente e molte preferenze sono soggettive.

Il modo più facile per farsi un'idea – e pensare alle varie configurazioni diverse – è dare un'occhiata ad alcuni esempi e poi sperimentare.

Il kit di Figma incluso contiene componenti vuoti, bordati e pieni.

Dai un'occhiata ai seguenti esempi per vedere modi diversi per combinarli:

![3 righe in uno stile pieno](./7.png)

![3 righe in uno stile bordato](./8.png)

![2 righe in uno stile vuoto](./9.png)

![3 righe in uno stile bordato, con un pannello dei dettagli](./10.png)

![3 righe con la riga di input in uno stile bordato](./11.png)

![2 righe in uno stile pieno](./12.png)

## Ma da quale parte dovrebbe andare il token? {#but-which-side-should-the-token-go-on}

Il punto è che probabilmente non farà molta differenza in quanto a usabilità. Ci sono alcune cose da tenere comunque presenti che potrebbero influenzarti in un modo o nell'altro.

È abbastanza interessante vedere come la moda cambia con il tempo. Uniswap inizialmente aveva il token sulla sinistra ma lo ha poi spostato sulla destra. Anche Sushiswap fece questo cambiamento durante un aggiornamento di design. Molti ma non tutti i protocolli hanno fatto altrettanto.

La convenzione finanziaria mette tradizionalmente il simbolo della valuta prima del numero, ad es. $50, €50, £50, ma _diciamo_ 50 dollari, 50 euro, 50 sterline.

Per l'utente generico – specialmente qualcuno che legge da sinistra a destra, dall'alto al basso – il token sulla destra risulta probabilmente più naturale.

![Una UI con i token sulla sinistra](./13.png)

Mettere il token sulla sinistra e tutti i numeri sulla destra dà un aspetto piacevolmente simmetrico, il che è un vantaggio, ma c'è un altro lato negativo in questa disposizione.

La legge della prossimità dice che gli elementi vicini sono percepiti come correlati. Di conseguenza vogliamo mettere gli elementi correlati gli uni vicini agli altri. Il saldo del token è direttamente correlato al token stesso e cambierà ogni volta che viene selezionato un nuovo token. Ha quindi più senso che il saldo dei token sia vicino al pulsante per selezionare il token. Potrebbe essere spostato sotto il token, ma in questo modo si romperebbe la simmetria della disposizione.

In definitiva ci sono pro e contro in entrambe le opzioni, ma è interessante come il trend sembri andare verso il token sulla destra.

# Comportamento del pulsante {#button-behavior}

Non inserire un pulsante separato per Approva. Inoltre, non prevedere clic separati per Approva. L'utente vuole Scambiare, quindi basta indicare "scambia" sul pulsante e avviare l'approvazione come primo passaggio. Una finestra modale può mostrare il progresso con uno stepper o con una semplice notifica che dica "tx 1 di 2 - approvazione in corso".

![Una UI con pulsanti separati per approvare e scambiare](./14.png)

![Una UI con un pulsante che indica approva](./15.png)

## Pulsanti come aiuto contestuale {#button-as-contextual-help}

Il pulsante può svolgere il doppio compito di avviso!

Questo è infatti un modello di progettazione abbastanza insolito fuori dal Web3, ma è diventato la norma al suo interno. Si tratta di un'ottima innovazione che fa risparmiare spazio e tiene focalizzata l'attenzione.

Se l'azione principale – SCAMBIO – non è disponibile a causa di un errore, la ragione può essere spiegata attraverso il pulsante, ad es.:

- cambia rete
- connetti portafoglio
- errori vari

Il pulsante può anche venire **mappato all'azione** che deve essere eseguita. Per esempio, se un utente non può effettuare lo scambio perché è nella rete sbagliata, il pulsante dovrebbe dire "passa a Ethereum", e quando l'utente clicca sul pulsante la rete dovrebbe passare a Ethereum. Questo velocizza il flusso dell'utente in maniera significativa.

![Azioni chiave avviate dalla CTA principale](./16.png)

![Messaggio di errore visualizzato nella CTA principale](./17.png)

## Costruisci la tua con questo file di Figma {#build-your-own-with-this-figma-file}

Grazie al duro lavoro di vari protocolli, la progettazione delle DEX è migliorata parecchio. Sappiamo di quali informazioni ha bisogno l'utente, come dobbiamo visualizzarle e come far andare più liscio possibile il flusso.
Speriamo che questo articolo ti abbia dato una solida panoramica dei principi UX.

Se desideri sperimentare, sentiti libero di utilizzare il kit wireframe di Figma. È tenuto il più semplice possibile ma ha abbastanza flessibilità per costruire la struttura di base in vari modi.

[Kit wireframe di Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

La DeFi continuerà a evolversi e ci sarà sempre margine di miglioramento.

Buona fortuna!
