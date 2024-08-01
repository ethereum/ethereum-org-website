---
title: Guida per i traduttori
lang: it
description: Istruzioni e suggerimenti per i traduttori di ethereum.org
---

# Guida di stile per la traduzione di ethereum.org {#style-guide}

La guida di stile per la traduzione di ethereum.org contiene alcune linee guida, istruzioni e consigli più importanti per i traduttori che ci aiutano a localizzare il sito web.

Questo documento funge da guida generale e non è specifico per nessuna lingua.

Per qualsiasi domanda, suggerimento o feedback, non esitare a contattarci all'indirizzo translations@ethereum.org, inviare un messaggio a @ethdotorg su Crowdin, oppure [unisciti al nostro Discord](https://discord.gg/ethereum-org), dove puoi scriverci un messaggio sul canale #translations o contattare un qualsiasi membro del team.

## Utilizzare Crowdin {#using-crowdin}

Puoi trovare le istruzioni di base su come partecipare al progetto in Crowdin e su come utilizzare l'editor online di Crowdin nella pagina del [Programma di traduzione](/contributing/translation-program/#how-to-translate).

Se vuoi saperne di più su Crowdin e utilizzare alcune delle sue funzionalità avanzate, la [knowledge base di Crowdin](https://support.crowdin.com/online-editor/) contiene molte guide approfondite e panoramiche su tutte le funzionalità di Crowdin.

## Cogliere l'essenza del messaggio {#capturing-the-essence}

Quando traduci contenuti per ethereum.org, evita traduzioni letterali.

È importante che le traduzioni colgano l'essenza del messaggio. Questo potrebbe significare riformulare alcune frasi o utilizzare traduzioni descrittive, invece di tradurre parola per parola.

Le varie lingue hanno diverse regole grammaticali, convenzioni stilistiche o sintattiche. Quando traduci, presta attenzione a come sono strutturate le frasi nella lingua di destinazione ed evita di tradurre letteralmente l'originale in inglese, poiché ciò può tradursi in una sintassi e in una leggibilità delle frasi scarse.

Invece di tradurre il testo di partenza parola per parola, consigliamo di leggere l'intera frase e di adattarla alle convenzioni della lingua di destinazione.

## Formale vs. informale {#formal-vs-informal}

Usiamo la forma di cortesia, sempre educata e appropriata per tutti i visitatori.

L'uso della forma di cortesia ci consente di evitare di sembrare non ufficiali od offensivi e funziona indipendentemente dall'età e dal sesso del visitatore.

La maggior parte delle lingue indoeuropee e afroasiatiche utilizzan pronomi personali di seconda persona specifici in base al sesso, che distinguono tra maschio e femmina. Quando ci rivolgiamo all'utente o utilizziamo pronomi possessivi, possiamo di evitare di indovinare il sesso del visitatore, poiché la forma di cortesia è generalmente applicabile e coerente, indipendentemente dal genere dell'interlocutore.

## Vocabolario e significato semplici e chiari {#simple-vocabulary}

Il nostro obiettivo è quello di rendere i contenuti sul sito comprensibili a quante più persone possibile.

Nella maggior parte dei casi, ciò può essere ottenuto efficacemente utilizzando parole semplici e brevi, di facile comprensione. Se esistono più traduzioni possibili per una certa parola nella tua lingua con lo stesso significato, l'opzione migliore è molto spesso la parola più breve che riflette chiaramente il significato.

## Sistema di scrittura {#writing-system}

Ethereum.org è disponibile in diverse lingue, che utilizzano sistemi di scrittura (o script di scrittura) alternativi a quello latino.

Tutti i contenuti dovrebbero essere tradotti utilizzando il sistema di scrittura corretto per la lingua specifica e non dovrebbero includere parole scritte con caratteri latini.

Nel tradurre i contenuti, si dovrebbe fare in modo che le traduzioni siano coerenti e non includano caratteri latini.

Un equivoco comune è che "Ethereum" debba essere scritto sempre in caratteri latini. Questa è un'idea errata: occorre utilizzare l'ortografia di Ethereum nativa in base alla lingua (ad es. 以太坊 in cinese, إيثيريوم in arabo, ecc.).

**Quanto sopra non si applica alle lingue in cui i nomi propri non vanno generalmente tradotti.**

## Tradurre i metadati della pagina {#translating-metadata}

Alcune pagine contengono metadati sulla pagina, come 'title', 'lang', 'description', 'sidebar', ecc.

Quando carichiamo le nuove pagine su Crowdin, nascondiamo i contenuti da non tradurre. Ciò significa che tutti i metadati visibili ai traduttori su Crowdin dovrebbero essere tradotti.

Invitiamo a prestare particolare attenzione nella traduzione di stringhe il cui testo di origine è "en". Questa sigla rappresenta la lingua in cui la pagina è disponibile e dovrebbe essere tradotta con il [codice linguistico ISO della lingua di destinazione](https://www.andiamo.co.uk/resources/iso-language-codes/). Queste stringhe dovrebbero sempre essere tradotte usando caratteri latini, non lo script di scrittura nativo della lingua di destinazione.

Se non sei sicuro/a di quale codice linguistico usare, puoi cercare nella memoria di traduzione su Crowdin oppure individuare il codice linguistico per la tua lingua nell'URl della pagina, nell'editor online di Crowdin.

Alcuni esempi di codici linguistici per le lingue più diffuse:

- Arabo - ar
- Cinese Semplificato - zh
- Francese - fr
- Hindi - hi
- Spagnolo - es

## Titoli di articoli esterni {#external-articles}

Alcune stringhe contengono titoli di articoli esterni. Gran parte delle nostre pagine di documentazione per sviluppatori contiene link ad articoli esterni, per ulteriori letture. Le stringhe contenenti titoli di articoli devono esser tradotte, indipendentemente dalla lingua dell'articolo, per assicurare un'esperienza dell'utente più coerente per i visitatori della pagina nella propria lingua.

Di seguito puoi trovare alcuni esempi di come queste stringhe appaiono ai traduttori e come identificarle (i link agli articoli si trovano prevalentemente in fondo a queste pagine, nella sezione "Ulteriori letture"):

![Titoli di articoli in sidebar.png](./article-titles-in-sidebar.png) ![Titoli di articoli in editor.png](./article-titles-in-editor.png)

## Avvisi di Crowdin {#crowdin-warnings}

Crowdin offre una funzionalità integrata che avvisa i traduttori quando stanno per commettere un errore. Crowdin ti avviserà automaticamente di questo prima di salvare la tua traduzione se dimentichi di includere un tag dal testo sorgente, se traduci elementi che non dovrebbero essere tradotti, se inserisci più spazi consecutivi, dimentichi la punteggiatura finale, ecc. Se visualizzi un avviso simile a questo, ti invitiamo a tornare indietro e ricontrollare la traduzione inserita.

**Non ignorare mai questi avvisi, poiché solitamente significano che c'è qualcosa che non va o che manca una parte fondamentale del testo di partenza.**

Un esempio di un avviso di Crowdin quando dimentichi di aggiungere un tag alla tua traduzione: ![Esempio di avviso di Crowdin](./crowdin-warning-example.png)

## Gestire i tag e i frammenti di codice {#dealing-with-tags}

Molti contenuti di partenza contengono tag e variabili, evidenziati in giallo nell'editor di Crowdin. Questi svolgono diverse funzioni e dovrebbero esser trattati correttamente.

**Impostazioni di Crowdin**

Per semplificare la gestione dei tag e copiarli direttamente dal testo di partenza, consigliamo di modificare le tue impostazioni nell'editor di Crowdin.

1. Apri le impostazioni ![Come aprire le impostazioni nell'editor](./editor-settings.png)

2. Scorri verso il basso fino alla sezione "HTML tags displaying”

3. Seleziona "Hide"![Seleziona "Hide"](./hide-tags.png)

4. Fai clic su "Save"

Selezionando quest'opzione, il testo del tag completo non sarà più mostrato e sarà sostituito da un numero. Durante la traduzione, facendo clic su questo tag si copierà automaticamente lo stesso tag nel campo di traduzione.

**Link**

Potresti notare link completi a pagine su ethereum.org o altri siti web.

Dovrebbero essere identici a quelli originali e non essere modificati o tradotti. Se traduci un link o lo modifichi in qualche modo, anche solo rimuovendone una parte, come un backslash (/), lo renderai corrotto o inutilizzabile.

Il modo migliore per gestire i collegamenti è copiarli direttamente dal testo di partenza, facendo clic su di essi o utilizzando il pulsante "Copy Source" (Alt+C).

![Esempio di link.png](./example-of-link.png)

I link appaiono nel testo di partenza anche sotto forma di tag (cioè <0> </0>). Se passi sul tag, l'editor ne mostrerà il contenuto completo; talvolta questi tag rappresentano dei link.

È molto importante copiare i link dal testo di partenza senza modificarne l'ordine.

Se l'ordine dei tag viene modificato, il link corrispondente risulterà corrotto.

![Esempio di link all'interno di tag.png](./example-of-links-inside-tags.png)

**Tag e variabili**

Il testo di partenza può contenere diversi tipi di tag, che dovrebbero sempre essere copiati dalla sorgente e mai modificati. Analogamente a quanto detto sopra, anche l'ordine di questi tag nella traduzione dovrebbe rimanere identico a quello del testo originale.

I tag contengono sempre un tag d'apertura e uno di chiusura. In gran parte dei casi, il testo tra i tag d'apertura e di chiusura va tradotto.

Esempio: `<strong x-id="1">`Decentralizzato`</strong>`

`<strong x-id="1">` - _Tag d'apertura che rende il testo in grassetto_

Decentralizzato - _Testo traducibile_

`</strong>` - _Tag di chiusura_

![Esempio di tag "forti".png](./example-of-strong-tags.png)

I frammenti di codice vanno trattati in maniera leggermente diversa rispetto agli altri tag, poiché contengono codice che non va tradotto.

Esempio: `<code>`nonce`</code>`

`<code>` - _Tag d'apertura, contenente un frammento di codice_

nonce - _Testo non traducibile_

`</code>` - _Tag di chiusura_

![Esempio di frammenti di codice.png](./example-of-code-snippets.png)

Il testo di partenza contiene anche tag abbreviati, contenenti solo numeri, il che significa che la loro funzione non è immediatamente ovvia. Puoi passare su questi tag per vedere esattamente quale scopo assolvono.

Nell'esempio seguente, passando con il mouse sul <0> tag puoi vedere che rappresenta `<code>` e contiene un frammento di codice, quindi il contenuto non va tradotto.

![Esempio di tag ambigui.png](./example-of-ambiguous-tags.png)

## Formule/abbreviazioni brevi vs. complete {#short-vs-full-forms}

Nel sito web sono usate molte abbreviazioni, es. dapp, NFT, DAO, DeFi, ecc. Queste abbreviazioni sono comunemente usate in inglese e gran parte dei visitatori del sito web ne è a conoscenza.

Dal momento che di solito non esistono traduzioni attestate in altre lingue, il modo migliore per trattare questi termini e altri simili è quello di fornire una traduzione descrittiva della forma estesa e aggiungere l'abbreviazione inglese tra parentesi.

Non tradurre queste abbreviazioni, poiché la maggior parte delle persone non le conoscerebbe e le versioni localizzate non avrebbero molto senso per la maggior parte dei visitatori.

Esempio di come tradurre le dapp:

- Applicazioni decentralizzate (dApp) → _Tradotto integralmente (abbreviazione tra parentesi)_

## Termini senza traduzioni attestate {#terms-without-established-translations}

Alcuni termini potrebbero non avere traduzioni attestate in altre lingue e sono ampiamente noti con il termine originale in inglese. Tali termini includono principalmente concetti recenti, come Proof of Work, Proof of Stake, Beacon Chain, staking, ecc.

Sebbene la traduzione di questi termini possa sembrare innaturale, poiché la versione inglese è comunemente usata anche in altre lingue, si consiglia vivamente di tradurli.

Traducendoli, sentiti libero di essere creativo, usa traduzioni descrittive o semplicemente traducili in maniera letterale.

**Il motivo per cui la maggior parte dei termini dovrebbe essere tradotta, invece di lasciarne alcuni in inglese, è il fatto che questa nuova terminologia diventerà più diffusa in futuro, man mano che più persone inizieranno a utilizzare Ethereum e le relative tecnologie. Se vogliamo coinvolgere più persone da tutto il mondo in questo spazio, dobbiamo fornire una terminologia comprensibile in quante più lingue possibili, anche se dobbiamo crearla noi stessi.**

## Pulsanti e CTA {#buttons-and-ctas}

Il sito web contiene numerosi pulsanti, che dovrebbero essere tradotti in modo diverso dagli altri contenuti.

Il testo del pulsante può essere identificato visualizzando gli screenshot contestuali, associati a gran parte delle stringhe, o controllando il contesto nell'editor, che include l'espressione "button".

Le traduzioni dei pulsanti dovrebbero essere il più possibile brevi, onde evitare mancate corrispondenze di formattazione. Inoltre, le traduzioni dei pulsanti dovrebbero essere in forma imperativa, ovvero indicare un comando o una richiesta.

![Come trovare un pulsante.png](./how-to-find-a-button.png)

## Tradurre per l'inclusività {#translating-for-inclusivity}

I visitatori di ethereum.org provengono da tutto il mondo e da contesti sociali diversi. La lingua sul sito web deve quindi essere neutrale, accogliente per tutti e non esclusiva.

A tale riguardo, un aspetto importante è la neutralità di genere. Questa è facilmente ottenibile usando uno stile formale ed evitando parole specifiche per il genere nelle traduzioni.

Un'altra forma di inclusività consiste nel tentare di tradurre per un pubblico globale, non specifico a paesi, razze o regioni.

Infine, la lingua dovrebbe essere adatta a qualsiasi pubblico e fascia di età.

## Traduzioni specifiche in base alla lingua {#language-specific-translations}

Quando si traduce è importante seguire le regole grammaticali, le convenzioni e la formattazione utilizzate nella propria lingua, anziché copiare quelle del testo originale. Il testo d'origine segue le regole e convenzioni della grammatica inglese, non applicabili a molte altre lingue.

Dovresti essere a conoscenza delle regole per la tua lingua e tradurre di conseguenza. Se ti occorre aiuto, contattaci e ti aiuteremo a trovare risorse utili su come questi elementi dovrebbero essere usati nella tua lingua.

Alcuni esempi di aspetti a cui prestare particolare attenzione:

### Punteggiatura, formattazione {#punctuation-and-formatting}

**Maiuscole/minuscole**

- Esistono notevoli differenze nell'uso di maiuscole e minuscole in diverse lingue.
- In inglese, è comune usare le maiuscole per tutte le parole di titoli e nomi, mesi e giorni, nomi di lingue, festività, etc. In molte altre lingue, questo è sbagliato dal punto di vista grammaticale, in quanto vigono regole diverse sull'uso delle maiuscole/minuscole.
- Alcune lingue hanno anche regole sull'uso della maiuscola per pronomi personali, sostantivi e alcuni aggettivi, che in inglese vengono scritti con l'iniziale minuscola.

**Spaziatura**

- Le regole ortografiche definiscono l'uso degli spazi per ogni lingua. Poiché gli spazi sono usati ovunque, queste regole sono alcune delle più distinte e gli spazi sono alcuni degli elementi maggiormente tradotti in modo improprio.
- Alcune differenze comuni nella spaziatura tra l'inglese e altre lingue:
  - Spazio prima dell'unità di misura e delle valute (es. USD, EUR, kB, MB)
  - Spazio prima dei segni di grado (es. °C, ℉)
  - Spazio prima di certi segni di punteggiatura, specialmente i puntini di sospensione (…)
  - Spazio prima e dopo le barre (/)

**Elenchi**

- Ogni lingua ha una diversa e complessa serie di regole per la redazione di elenchi. Questi possono differire significativamente rispetto all'inglese.
- In alcune lingue, la prima parola di ogni nuova riga deve essere maiuscola, mentre in altre le nuove righe devono iniziare con lettere minuscole. Molte lingue hanno anche regole differenti sull'uso delle maiuscole/minuscole negli elenchi, a seconda della lunghezza di ogni riga.
- Lo stesso si applica alla punteggiatura dei vari punti dell'elenco. La punteggiatura finale negli elenchi può essere un punto (**.**), una virgola (**,**) o un punto e virgola (**;**), a seconda della lingua.

**Virgolette**

- Le varie lingue usano tipi diversi di virgolette. Copiare semplicemente le virgolette inglesi dal segmento originale spesso è sbagliato.
- Tra i tipi più comuni di virgolette troviamo:
  - „testo di esempio“
  - ‚testo di esempio’
  - »testo di esempio«
  - “testo di esempio”
  - ‘testo di esempio’
  - «testo di esempio»

**Trattini lunghi e corti**

- In inglese si utilizza un trattino corto (-) per unire parole o parti diverse di una parola e un trattino lungo (–) per indicare un intervallo o una pausa.
- Molte lingue hanno regole diverse per l'uso di trattini corti e lunghi, che dovrebbero essere osservate.

### Formati {#formats}

**Numeri**

- La differenza principale nella scrittura dei numeri nelle varie lingue riguarda il separatore usato per decimali e migliaia. Per le migliaia, può essere un punto, una virgola o uno spazio. Analogamente, alcune lingue usano un punto decimale, mentre altre usano una virgola.
  - Alcuni esempi di grandi numeri:
    - Inglese – **1,000.50**
    - Spagnolo – **1.000,50**
    - Francese – **1 000,50**
- Un'altra considerazione importante sulla traduzione dei numeri riguarda il segno percentuale. Può essere scritto in diversi modi: **100%**, **100 %** o **%100**.
- Infine, i numeri negativi possono esser scritti diversamente, a secnda della lingua: -100, 100-, (100) o [100].

**Date**

- Traducendo le date, esistono numerose considerazioni e differenze basate sulla lingua. Ciò include il formato della data, il separatore, l'uso di maiuscole e minuscole e gli zeri iniziali. Esistono anche differenze tra le date scritte per esteso e le date numeriche.
  - Alcuni esempi di formati di data diversi:
    - Inglese UK (gg/mm/aaaa) – 1st January, 2022
    - Inglese US (mm/gg/aaaa) – January 1st, 2022
    - Cinese (aaaa-mm-gg) – 2022 年 1 月 1 日
    - Francese (gg/mm/aaaa) – 1er janvier 2022
    - Italiano (gg/mm/aaaa) – 1º gennaio 2022
    - Tedesco (gg/mm/aaaa) – 1. Januar 2022

**Valute**

- Tradurre le valute può essere complicato, a causa dei diversi formati, convenzioni e conversioni. Come regola generale, consigliamo di lasciare la valuta riportata nel testo originale. Puoi aggiungere la tua valuta locale e la conversione tra parentesi, per comodità del lettore.
- Le principali differenze nella scrittura delle valute nelle varie lingue riguardano il posizionamento dei simboli, l'uso di virgole o punti decimali, la spaziatura e l'uso di abbreviazioni o simboli.
  - Posizionamento del simbolo: $100 o 100$
  - Virgole vs. punti decimali: 100,50$ o 100.50$
  - Spaziatura: 100$ o 100 $
  - Abbreviazioni vs. simboli: 100 $ o 100 USD

**Unità di misura**

- Come regola generale, consigliamo di lasciare le unità di misura come appaiono nel testo originale. Se il tuo paese usa un sistema differente, puoi includere la conversione tra parentesi.
- Oltre alla localizzazione delle unità di misura, è importante notare anche il diverso trattamento di tali unità nelle varie lingue. La differenza principale riguarda la spaziatura tra numero e unità, che può variare in base alla lingua. Esempi di ciò includono: 100kB o 100 kB, 50°F o 50 °F.

## Conclusioni {#conclusion}

Tradurre ethereum.org è una grande opportunità per conoscere i diversi aspetti di Ethereum.

Quando traduci, cerca di non andare troppo in fretta. Prendila con calma e goditi l'esperienza!

Grazie per aver partecipato al Programma di Traduzione e per averci aiutato a rendere il sito web accessibile a un pubblico più ampio. La comunità di Ethereum è globale e siamo felici che tu ne faccia parte!
