---
title: Guida di stile per la traduzione di ethereum.org
metaTitle: Guida per i traduttori
lang: it
description: Istruzioni e suggerimenti per i traduttori di ethereum.org
---

La guida di stile per la traduzione di ethereum.org contiene alcune delle linee guida, istruzioni e suggerimenti più importanti per i traduttori, aiutandoci a localizzare il sito web.

Questo documento funge da guida generale e non è specifico per una singola lingua.

Se hai domande, suggerimenti o feedback, non esitare a contattarci all'indirizzo translations@ethereum.org, inviare un messaggio a @ethdotorg su Crowdin, o [unirti al nostro Discord](https://discord.gg/ethereum-org), dove puoi scriverci nel canale #translations o contattare uno qualsiasi dei membri del team.

## Usare Crowdin {#using-crowdin}

Puoi trovare le istruzioni di base su come unirti al progetto su Crowdin e su come usare l'editor online di Crowdin nella [pagina del Programma di traduzione](/contributing/translation-program/#how-to-translate).

Se desideri saperne di più su Crowdin e sull'utilizzo di alcune delle sue funzionalità avanzate, la [knowledge base di Crowdin](https://support.crowdin.com/online-editor/) contiene molte guide approfondite e panoramiche di tutte le funzionalità di Crowdin.

## Catturare l'essenza del messaggio {#capturing-the-essence}

Quando traduci i contenuti di ethereum.org, evita le traduzioni letterali.

È importante che le traduzioni catturino l'essenza del messaggio. Ciò potrebbe significare riformulare alcune frasi o utilizzare traduzioni descrittive invece di tradurre il contenuto parola per parola.

Lingue diverse hanno regole grammaticali, convenzioni e ordine delle parole differenti. Durante la traduzione, fai attenzione a come sono strutturate le frasi nelle lingue di destinazione ed evita di tradurre letteralmente la fonte inglese, poiché ciò può portare a una struttura della frase e a una leggibilità scadenti.

Invece di tradurre il testo di origine parola per parola, ti consigliamo di leggere l'intera frase e adattarla per rispettare le convenzioni della lingua di destinazione.

## Formale vs. informale {#formal-vs-informal}

Utilizziamo la forma di cortesia (il "Lei"), che è sempre educata e appropriata per tutti i visitatori.

L'uso della forma di cortesia ci consente di evitare di sembrare non ufficiali o offensivi e funziona indipendentemente dall'età e dal sesso del visitatore.

La maggior parte delle lingue indoeuropee e afroasiatiche utilizza pronomi personali di seconda persona specifici per genere, che distinguono tra maschio e femmina. Quando ci rivolgiamo all'utente o utilizziamo pronomi possessivi, possiamo evitare di presumere il genere del visitatore, poiché la forma di cortesia è generalmente applicabile e coerente, indipendentemente da come si identifica.

## Vocabolario e significato semplici e chiari {#simple-vocabulary}

Il nostro obiettivo è rendere i contenuti del sito web comprensibili al maggior numero di persone possibile.

Nella maggior parte dei casi, questo può essere facilmente ottenuto utilizzando parole brevi e semplici che siano facilmente comprensibili. Se ci sono più traduzioni possibili per una certa parola nella tua lingua con lo stesso significato, l'opzione migliore è quasi sempre la parola più breve che riflette chiaramente il significato.

## Sistema di scrittura {#writing-system}

Ethereum.org è disponibile in diverse lingue, che utilizzano sistemi di scrittura (o alfabeti) alternativi a quello latino.

Tutti i contenuti dovrebbero essere tradotti utilizzando il sistema di scrittura corretto per la tua lingua e non dovrebbero includere parole scritte in caratteri latini.

Quando traduci i contenuti, dovresti assicurarti che le traduzioni siano coerenti e non includano caratteri latini.

Un malinteso comune è che Ethereum debba essere sempre scritto in caratteri latini. Questo è per lo più errato, ti preghiamo di utilizzare l'ortografia di Ethereum nativa della tua lingua (ad es. 以太坊 in cinese, إيثيريوم in arabo, ecc.).

**Quanto sopra non si applica alle lingue in cui i nomi propri non dovrebbero essere tradotti di regola.**

## Tradurre i metadati della pagina {#translating-metadata}

Alcune pagine contengono metadati, come 'title', 'lang', 'description', 'sidebar', ecc.

Nascondiamo i contenuti che i traduttori non dovrebbero mai tradurre quando carichiamo nuove pagine su Crowdin, il che significa che tutti i metadati visibili ai traduttori in Crowdin dovrebbero essere tradotti.

Fai particolare attenzione quando traduci stringhe in cui il testo di origine è 'en'. Questo rappresenta la lingua in cui è disponibile la pagina e dovrebbe essere tradotto nel [codice lingua ISO per la tua lingua](https://www.andiamo.co.uk/resources/iso-language-codes/). Queste stringhe dovrebbero sempre essere tradotte utilizzando caratteri latini, non il sistema di scrittura nativo della lingua di destinazione.

Se non sei sicuro di quale codice lingua utilizzare, puoi controllare la memoria di traduzione in Crowdin o trovare il codice lingua per la tua lingua nell'URL della pagina nell'editor online di Crowdin.

Alcuni esempi di codici lingua per le lingue più parlate:

- Arabo - ar
- Cinese semplificato - zh
- Francese - fr
- Hindi - hi
- Spagnolo - es

## Titoli di articoli esterni {#external-articles}

Alcune stringhe contengono titoli di articoli esterni. La maggior parte delle nostre pagine di documentazione per sviluppatori contiene link ad articoli esterni per ulteriori letture. Le stringhe contenenti i titoli degli articoli devono essere tradotte, indipendentemente dalla lingua dell'articolo, per garantire un'esperienza utente più coerente per i visitatori che visualizzano la pagina nella loro lingua.

Di seguito puoi trovare alcuni esempi di come appaiono queste stringhe per i traduttori e come identificarle (i link agli articoli si trovano per lo più in fondo a queste pagine, nella sezione "Letture di approfondimento"):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Avvisi di Crowdin {#crowdin-warnings}

Crowdin ha una funzionalità integrata che avvisa i traduttori quando stanno per commettere un errore. Crowdin ti avviserà automaticamente prima di salvare la tua traduzione se dimentichi di includere un tag dalla fonte, traduci elementi che non dovrebbero essere tradotti, aggiungi diversi spazi consecutivi, dimentichi la punteggiatura finale, ecc.
Se vedi un avviso di questo tipo, torna indietro e ricontrolla la traduzione suggerita.

**Non ignorare mai questi avvisi, poiché di solito significano che c'è qualcosa di sbagliato o che alla traduzione manca una parte chiave del testo di origine.**

Un esempio di avviso di Crowdin quando dimentichi di aggiungere un tag alla tua traduzione:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Gestire tag e frammenti di codice {#dealing-with-tags}

Gran parte del contenuto di origine contiene tag e variabili, che sono evidenziati in giallo nell'editor di Crowdin. Questi hanno funzioni diverse e dovrebbero essere affrontati correttamente.

**Impostazioni di Crowdin**

Per semplificare la gestione dei tag e copiarli direttamente dalla fonte, ti consigliamo di modificare le impostazioni nell'editor di Crowdin.

1. Apri le impostazioni
   ![How to open settings in the editor](./editor-settings.png)

2. Scorri verso il basso fino alla sezione "Visualizzazione tag HTML"

3. Seleziona 'Nascondi'
   ![Please select 'Hide'](./hide-tags.png)

4. Clicca su 'Salva'

Selezionando questa opzione, il testo completo del tag non verrà più mostrato e sarà sostituito da un numero.
Durante la traduzione, cliccando su questo tag verrà copiato automaticamente il tag esatto nel campo di traduzione.

**Link**

Potresti notare link completi a pagine su ethereum.org o altri siti web.

Questi dovrebbero essere identici alla fonte e non modificati o tradotti. Se traduci un link o lo modifichi in qualsiasi modo, anche solo rimuovendone una parte, come una barra (/), ciò porterà a link interrotti e inutilizzabili.

Il modo migliore per gestire i link è copiarli direttamente dalla fonte, cliccandoci sopra o utilizzando il pulsante 'Copia origine' (`Alt+C`).

![Example of link.png](./example-of-link.png)

I link appaiono anche nel testo di origine sotto forma di tag (es. `<0>` `</0>`). Se passi il mouse sul tag, l'editor mostrerà il suo contenuto completo: a volte questi tag rappresenteranno dei link.

È molto importante copiare i link dalla fonte e non cambiarne l'ordine.

Se l'ordine dei tag viene modificato, il link che rappresentano verrà interrotto.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Tag e variabili**

Il testo di origine contiene molti tipi diversi di tag, che dovrebbero sempre essere copiati dalla fonte e mai modificati. Analogamente a quanto sopra, anche l'ordine di questi tag nella traduzione dovrebbe rimanere lo stesso della fonte.

I tag contengono sempre un tag di apertura e uno di chiusura. Nella maggior parte dei casi, il testo tra i tag di apertura e chiusura dovrebbe essere tradotto.

Esempio: `<strong x-id="1">`Decentralizzato`</strong>`

`<strong x-id="1">` - _Tag di apertura che rende il testo in grassetto_

Decentralizzato - _Testo traducibile_

`</strong>` - _Tag di chiusura_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

I frammenti di codice dovrebbero essere affrontati in modo leggermente diverso rispetto agli altri tag, poiché contengono codice che non dovrebbe essere tradotto.

Esempio: `<code>`nonce`</code>`

`<code>` - _Tag di apertura, che contiene un frammento di codice_

nonce - _Testo non traducibile_

`</code>` - _Tag di chiusura_

![Example of code snippets.png](./example-of-code-snippets.png)

Il testo di origine contiene anche tag abbreviati, che contengono solo numeri, il che significa che la loro funzione non è immediatamente ovvia. Puoi passare il mouse su questi tag per vedere esattamente quale funzione svolgono.

Nell'esempio seguente, puoi vedere che passando il mouse sul tag `<0>` viene mostrato che rappresenta `<code>` e contiene un frammento di codice, pertanto il contenuto all'interno di questi tag non dovrebbe essere tradotto.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Forme brevi vs. forme complete/abbreviazioni {#short-vs-full-forms}

Ci sono molte abbreviazioni utilizzate sul sito web, ad es. dapp, NFT, DAO, DeFi, ecc. Queste abbreviazioni sono comunemente usate in inglese e la maggior parte dei visitatori del sito web ha familiarità con esse.

Poiché di solito non hanno traduzioni consolidate in altre lingue, il modo migliore per affrontare questi e termini simili è fornire una traduzione descrittiva della forma completa e aggiungere l'abbreviazione inglese tra parentesi.

Non tradurre queste abbreviazioni, poiché la maggior parte delle persone non le conoscerebbe e le versioni localizzate non avrebbero molto senso per la maggior parte dei visitatori.

Esempio di come tradurre dapp:

- Applicazioni decentralizzate (dapp) → _Forma completa tradotta (abbreviazione inglese tra parentesi)_

## Termini senza traduzioni consolidate {#terms-without-established-translations}

Alcuni termini potrebbero non avere traduzioni consolidate in altre lingue e sono ampiamente conosciuti con il termine originale inglese. Tali termini includono principalmente concetti più recenti, come Prova di lavoro (PoW), Proof-of-Stake (PoS), Beacon Chain, staking, ecc.

Sebbene tradurre questi termini possa sembrare innaturale, poiché la versione inglese è comunemente usata anche in altre lingue, si consiglia vivamente di tradurli.

Quando li traduci, sentiti libero di essere creativo, usa traduzioni descrittive o semplicemente traducili letteralmente.

**Il motivo per cui la maggior parte dei termini dovrebbe essere tradotta, invece di lasciarne alcuni in inglese, è il fatto che questa nuova terminologia diventerà più diffusa in futuro, man mano che sempre più persone inizieranno a utilizzare Ethereum e le tecnologie correlate. Se vogliamo avvicinare più persone da tutto il mondo a questo spazio, dobbiamo fornire una terminologia comprensibile nel maggior numero di lingue possibile, anche se dobbiamo crearla noi stessi.**

## Pulsanti e CTA {#buttons-and-ctas}

Il sito web contiene numerosi pulsanti, che dovrebbero essere tradotti in modo diverso rispetto ad altri contenuti.

Il testo dei pulsanti può essere identificato visualizzando gli screenshot di contesto, collegati alla maggior parte delle stringhe, o controllando il contesto nell'editor, che include la parola "button".

Le traduzioni per i pulsanti dovrebbero essere il più brevi possibile, per evitare problemi di formattazione. Inoltre, le traduzioni dei pulsanti dovrebbero essere all'imperativo, ovvero presentare un comando o una richiesta.

![How to find a button.png](./how-to-find-a-button.png)

## Tradurre per l'inclusività {#translating-for-inclusivity}

I visitatori di ethereum.org provengono da tutto il mondo e da contesti diversi. Il linguaggio sul sito web dovrebbe quindi essere neutrale, accogliente per tutti e non esclusivo.

Un aspetto importante di questo è la neutralità di genere. Questo può essere facilmente ottenuto utilizzando la forma di cortesia ed evitando qualsiasi parola specifica per genere nelle traduzioni.

Un'altra forma di inclusività è cercare di tradurre per un pubblico globale, non specifico per alcun paese, razza o regione.

Infine, il linguaggio dovrebbe essere adatto a tutti i tipi di pubblico e a tutte le età.

## Traduzioni specifiche per lingua {#language-specific-translations}

Durante la traduzione, è importante seguire le regole grammaticali, le convenzioni e la formattazione utilizzate nella tua lingua, invece di copiare dalla fonte. Il testo di origine segue le regole grammaticali e le convenzioni inglesi, che non sono applicabili a molte altre lingue.

Dovresti conoscere le regole della tua lingua e tradurre di conseguenza. Se hai bisogno di aiuto, contattaci e ti aiuteremo a trovare alcune risorse su come questi elementi dovrebbero essere utilizzati nella tua lingua.

Alcuni esempi di cosa prestare particolare attenzione:

### Punteggiatura, formattazione {#punctuation-and-formatting}

**Uso delle maiuscole**

- Ci sono grandi differenze nell'uso delle maiuscole nelle diverse lingue.
- In inglese, è comune scrivere in maiuscolo tutte le parole nei titoli e nei nomi, i mesi e i giorni, i nomi delle lingue, le festività, ecc. In molte altre lingue, questo è grammaticalmente scorretto, poiché hanno regole diverse per l'uso delle maiuscole.
- Alcune lingue hanno anche regole sulla capitalizzazione di pronomi personali, sostantivi e determinati aggettivi, che non sono in maiuscolo in inglese.

**Spaziatura**

- Le regole ortografiche definiscono l'uso degli spazi per ogni lingua. Poiché gli spazi sono usati ovunque, queste regole sono tra le più distinte e gli spazi sono tra gli elementi tradotti in modo più errato.
- Alcune differenze comuni nella spaziatura tra l'inglese e le altre lingue:
  - Spazio prima delle unità di misura e delle valute (ad es. USD, EUR, kB, MB)
  - Spazio prima dei simboli di grado (ad es. °C, ℉)
  - Spazio prima di alcuni segni di punteggiatura, in particolare i puntini di sospensione (…)
  - Spazio prima e dopo le barre (/)

**Elenchi**

- Ogni lingua ha un insieme vario e complesso di regole per la scrittura degli elenchi. Queste possono essere significativamente diverse dall'inglese.
- In alcune lingue, la prima parola di ogni nuova riga deve essere in maiuscolo, mentre in altre le nuove righe dovrebbero iniziare con lettere minuscole. Molte lingue hanno anche regole diverse sull'uso delle maiuscole negli elenchi, a seconda della lunghezza di ogni riga.
- Lo stesso vale per la punteggiatura delle voci. La punteggiatura finale negli elenchi può essere un punto (**.**), una virgola (**,**) o un punto e virgola (**;**), a seconda della lingua.

**Virgolette**

- Le lingue utilizzano molti tipi diversi di virgolette. Copiare semplicemente le virgolette inglesi dalla fonte è spesso scorretto.
- Alcuni dei tipi più comuni di virgolette includono:
  - „testo di esempio“
  - ‚testo di esempio’
  - »testo di esempio«
  - “testo di esempio”
  - ‘testo di esempio’
  - «testo di esempio»

**Trattini e lineette**

- In inglese, un trattino (-) viene utilizzato per unire parole o parti diverse di una parola, mentre una lineetta (–) viene utilizzata per indicare un intervallo o una pausa.
- Molte lingue hanno regole diverse per l'uso di trattini e lineette che dovrebbero essere osservate.

### Formati {#formats}

**Numeri**

- La differenza principale nella scrittura dei numeri in lingue diverse è il separatore utilizzato per i decimali e le migliaia. Per le migliaia, questo può essere un punto, una virgola o uno spazio. Allo stesso modo, alcune lingue usano il punto decimale, mentre altre usano la virgola decimale.
  - Alcuni esempi di grandi numeri:
    - Inglese – **1,000.50**
    - Spagnolo – **1.000,50**
    - Francese – **1 000,50**
- Un'altra considerazione importante quando si traducono i numeri è il segno di percentuale. Può essere scritto in modi diversi: **100%**, **100 %** o **%100**.
- Infine, i numeri negativi possono essere visualizzati in modo diverso, a seconda della lingua: -100, 100-, (100) o [100].

**Date**

- Quando si traducono le date, ci sono una serie di considerazioni e differenze in base alla lingua. Queste includono il formato della data, il separatore, l'uso delle maiuscole e gli zeri iniziali. Ci sono anche differenze tra date per esteso e numeriche.
  - Alcuni esempi di diversi formati di data:
    - Inglese UK (gg/mm/aaaa) – 1st January, 2022
    - Inglese US (mm/gg/aaaa) – January 1st, 2022
    - Cinese (aaaa-mm-gg) – 2022 年 1 月 1 日
    - Francese (gg/mm/aaaa) – 1er janvier 2022
    - Italiano (gg/mm/aaaa) – 1º gennaio 2022
    - Tedesco (gg/mm/aaaa) – 1. Januar 2022

**Valute**

- Tradurre le valute può essere impegnativo, a causa dei diversi formati, convenzioni e conversioni. Come regola generale, ti preghiamo di mantenere le valute uguali alla fonte. Puoi aggiungere la tua valuta locale e la conversione tra parentesi, a vantaggio del lettore.
- Le principali differenze nella scrittura delle valute in lingue diverse includono il posizionamento del simbolo, le virgole decimali rispetto ai punti decimali, la spaziatura e le abbreviazioni rispetto ai simboli.
  - Posizionamento del simbolo: $100 o 100$
  - Virgole decimali vs. punti decimali: 100,50$ o 100.50$
  - Spaziatura: 100$ o 100 $
  - Abbreviazioni vs. simboli: 100 $ o 100 USD

**Unità di misura**

- Come regola generale, ti preghiamo di mantenere le unità di misura come nella fonte. Se il tuo paese utilizza un sistema diverso, puoi includere la conversione tra parentesi.
- Oltre alla localizzazione delle unità di misura, è anche importante notare le differenze nel modo in cui le lingue si approcciano a queste unità. La differenza principale è la spaziatura tra il numero e l'unità, che può essere diversa in base alla lingua. Esempi di questo includono 100kB vs. 100 kB o 50ºF vs. 50 ºF.

## Conclusione {#conclusion}

Tradurre ethereum.org è una grande opportunità per conoscere i diversi aspetti di Ethereum.

Quando traduci, cerca di non avere fretta. Prenditela comoda e divertiti!

Grazie per essere coinvolto nel Programma di traduzione e per aiutarci a rendere il sito web accessibile a un pubblico più ampio. La community di Ethereum è globale e siamo felici che tu ne faccia parte!