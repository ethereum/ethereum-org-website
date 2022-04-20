---
title: Domande frequenti (FAQ) del Programma di Traduzione
lang: it
description: Domande frequenti sul Programma di Traduzione di ethereum.org
sidebar: true
---

# Guida alla traduzione di ethereum.org {#translating-ethereum-guide}

Se sei nuovo nel Programma di Traduzione e non vedi l'ora di prendervi parte, ecco alcune FAQ che possono aiutarti a cominciare. Usa questa guida per trovare le risposte alle domande più comuni.

## Come tradurre le stringhe con `<HTML tags>`? {#tags}

Non tutte le stringhe sono scritte in forma di testo puro. Alcune stringhe sono composte da script misti, come tag HTML (`<0>`, `</0>`), utilizzati in genere per collegamenti ipertestuali o stile alternativo all'interno di una frase.

- Traduci il testo all'interno dei tag, ma non i tag stessi. Qualsiasi cosa racchiusa tra `<` e `>` non deve essere tradotta o rimossa.
- Per mantenere preservare l'integrità della stringa, si consiglia di fare clic sul pulsante "Copia sorgente" in basso a sinistra. Così facendo si copia la stringa originale e la si incolla nella casella di testo e si chiarisce dove sono i tag, evitando errori.

![Interfaccia Crowdin con il pulsante copia sorgente evidenziato](./html-tag-strings.png)

È possibile spostare la posizione dei tag all'interno della stringa per renderla più naturale nella propria lingua, basta essere sicuri di spostare l'intero tag.

## Dove vanno a finire le stringhe? {#strings}

Spesso le stringhe di origine da sole potrebbero non essere sufficienti per fornire una traduzione accurata.

- Dai un'occhiata a "screenshot" e "context" per maggiori informazioni. Nella sezione stringa sorgente, vedrai allegata l'immagine dello screenshot che mostra come viene utilizzata la stringa nel contesto.
- Se hai ancora dubbi, apri una segnalazione nella sezione dei commenti. [Non sai come inserire un commento?](#comment)

![Indicazione di come è possibile fornire il contesto per una stringa con uno screenshot](./source-string.png)

![Aggiunta di uno screenshot di esempio per il contesto](./source-string-2.png)

## Come posso lasciare commenti o fare domande? Vorrei segnalare un problema o errori di battitura... {#comment}

Se vuoi segnalare un problema su una particolare stringa che richiede attenzione, sentiti libero di inviare un commento.

- Fai clic sul secondo pulsante della barra in alto a destra. La scheda nascosta apparirà sulla tua destra. Lascia un nuovo commento e fai clic sulla casella "Issue" in basso. È possibile specificare il tipo di problema scegliendo una delle opzioni dal menu a discesa.
- Una volta inviato, verrà segnalato al nostro team. Risolveremo il problema e ti faremo sapere rispondendo al tuo commento e chiudendo la segnalazione.
- Se segnalate una traduzione non corretta, la traduzione e l'alternativa suggerita saranno esaminati da un madrelingua durante la prossima recensione.

![Indicazione di come inserire commenti e segnalare problemi](./comment-issue.png)

## Cos'è la Memoria di Traduzione (TM)? {#translation-memory}

La Memoria di Traduzione (TM) è una funzionalità di Crowdin che memorizza tutte le stringhe precedentemente tradotte su [ethereum.org](http://ethereum.org/). Quando una stringa viene tradotta, viene automaticamente salvata nella TM del progetto. Può essere uno strumento utile per aiutarti a risparmiare tempo!

- Guarda la sezione "TM and MT Suggestions" per scoprire come altri traduttori hanno tradotto la stessa stringa o un contenuto simile. Se trovi un suggerimento con una percentuale di corrispondenza elevata, non esitare a sfruttare la traduzione esistente facendovi clic sopra.
- Se non c'è nulla nella lista, puoi cercare nella TM tra le traduzioni precedenti e riutilizzarle per coerenza.

![Uno screenshot della memoria di traduzione](./translation-memory.png)

## Come usare il glossario di Crowdin? {#glossary}

La terminologia di Ethereum rappresenta un altro aspetto cruciale del nostro lavoro di traduzione, poiché spesso i nuovi termini tecnologici non sono ancora localizzati in molte lingue. Inoltre, ci sono termini che hanno significati diversi in contesti diversi. [Maggiori informazioni sulla traduzione della terminologia di Ethereum](#terminology)

Il glossario Crowdin è la risorsa migliore per chiarire termini e definizioni. Ci sono due modi per consultare il glossario.

- Quando trovi un termine sottolineato nella stringa sorgente, puoi passarci il mouse sopra e visualizzare una breve definizione.

![Un esempio di definizione del glossario](./glossary-definition.png)

- In alternativa, se vedi un termine che non è familiare ma non sottolineato, puoi cercare nella scheda del glossario (il terzo pulsante della colonna di destra). Troverai le spiegazioni dei termini specifici e di quelli frequentemente utilizzati nel progetto.

![Uno screenshot che mostra dove trovare la scheda del glossario in Crowdin](./glossary-tab.png)

- Se ancora non riesci a trovarlo, è la tua occasione per aggiungere un nuovo termine! Ti invitiamo a cercarlo su un motore di ricerca e aggiungere la descrizione al glossario. Sarà di grande aiuto ad altri traduttori per comprendere meglio il termine.

![Uno screenshot che mostra come aggiungere un termine del glossario in Crowdin](./add-glossary-term.png)

### Politica sulla traduzione della terminologia {#terminology}

_Per i nomi (marchi, aziende, persone) e i termini tecnologici nuovi (Eth2, beacon chain, ecc.)_

Ethereum presenta molti termini nuovi, che sono stati coniati di recente. Può succedere che alcuni termini varino da un traduttore all'altro, in ragione dell'assenza di una traduzione ufficiale nella rispettiva lingua. Tali incongruenze possono causare malintesi e ridurre la leggibilità.

A causa della diversità linguistica e delle diverse standardizzazioni in ogni lingua, è stato quasi impossibile elaborare una politica di traduzione terminologica unificata che possa essere adattata a tutte le lingue supportate.

Dopo un'attenta valutazione, abbiamo deciso di lasciare ai traduttori la libertà di optare per la terminologia più utilizzata.

Ecco quello che suggeriamo quando trovi un termine che non ti è familiare:

- Consulta il [Glossario dei termini](#glossary), dove potresti scoprire come altri traduttori hanno tradotto un particolare termine in precedenza. Se pensi che il termine precedentemente tradotto non sia appropriato, sentiti libero di ripristinare la tua traduzione aggiungendo un nuovo termine al Glossario Crowdin.
- Se non esistono traduzioni precedenti nel glossario, ti invitiamo a cercarla su un motore di ricerca o un articolo di stampa che mostri come il termine viene effettivamente utilizzato nella tua comunità.
- Se non trovi alcun riferimento, sentiti libero di fidarti della tua intuizione e suggerisci una nuova traduzione nella tua lingua!
- Se invece non ti senti sicuro, lascia il termine non tradotto. A volte, i termini inglesi sono più che adeguati per fornire definizioni accurate.

Ti consigliamo di non tradurre i nomi di marchi, aziende e personale poiché una traduzione potrebbe causare confusione inutile e difficoltà a livello di SEO.

## Come faccio ad aggiungere contenuti nella mia lingua? {#adding-foreign-language-content}

Attualmente, tutti i contenuti non in inglese sono tradotti direttamente dal contenuto della fonte inglese, e qualsiasi contenuto non esistente in inglese non può essere aggiunto ad altre lingue.

Per suggerire nuovi contenuti per ethereum.org, è possibile [aprire una segnalazione](https://github.com/ethereum/ethereum-org-website/issues) su GitHub. Se aggiunto, il contenuto sarà scritto in inglese e tradotto in altre lingue utilizzando Crowdin.

Abbiamo in programma di inserire il supporto per le aggiunte di contenuti non inglesi nel prossimo futuro.

## Contattaci {#contact}

Grazie per aver letto tutte queste informazioni. Speriamo che ti aiutino a muovere i primi passi nel nostro programma. Sentitevi liberi di unirvi al nostro [canale di traduzione Discord](https://discord.gg/XVepFu7sqR) per fare domande e collaborare con altri traduttori, o contattarci a translations@ethereum.org!
