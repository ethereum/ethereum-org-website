---
title: Domande frequenti (FAQ) sul Programma di Traduzione
lang: it
description: Domande frequenti sul Programma di Traduzione di ethereum.org
---

# Guida alla traduzione di ethereum.org {#translating-ethereum-guide}

Se sei nuovo nel Programma di Traduzione e sei esitante a buttarti, ecco alcune FAQ che possono aiutarti a iniziare. Usa questa guida per trovare le risposte alle domande più comuni.

## Posso essere retribuito per tradurre ethereum.org? {#compensation}

Ethereum.org è un sito web open-source, il che significa che chiunque può partecipare e contribuire.

Il Programma di Traduzione di ethereum.org ne è un'estensione ed è organizzato con una filosofia simile in mente.

L'obiettivo del Programma di Traduzione è rendere i contenuti di Ethereum accessibili a tutti, indipendentemente dalle lingue che parlano. Consente inoltre a qualsiasi persona bilingue di farsi coinvolgere nell'ecosistema di Ethereum e contribuire in modo accessibile.

Per questo motivo, il Programma di Traduzione è aperto e volontario, e la partecipazione non è soggetta a retribuzione. Se dovessimo retribuire i traduttori per il numero di parole che traducono, potremmo invitare a unirsi al Programma di Traduzione solo coloro con sufficiente esperienza di traduzione (traduttori professionisti). Ciò renderebbe il Programma di Traduzione esclusivo e ci impedirebbe di raggiungere gli obiettivi delineati, in particolare: consentire a tutti di partecipare e farsi coinvolgere nell'ecosistema.

Facciamo ogni sforzo per consentire ai nostri collaboratori di avere successo nell'ecosistema di Ethereum; sono in atto molti incentivi non monetari come: [offrire POAP](/contributing/translation-program/acknowledgements/#poap) e un [certificato di traduttore](/contributing/translation-program/acknowledgements/#certificate), oltre a organizzare le [Classifiche di Traduzione](/contributing/translation-program/acknowledgements/) e [elencare tutti i nostri traduttori sul sito](/contributing/translation-program/contributors/).

## Come traduco le stringhe con i `<tag HTML>`? {#tags}

Non tutte le stringhe sono scritte in forma di puro testo. Ci sono alcune stringhe che consistono in script misti come i tag HTML (`<0>`, `</0>`). Questo di solito serve per i collegamenti ipertestuali o per stili alternativi nel mezzo di una frase.

- Traduci il testo all'interno dei tag ma non i tag stessi. Qualsiasi cosa tra `<` e `>` non deve essere tradotta o rimossa.
- Per mantenere la stringa al sicuro, ti consigliamo di fare clic sul pulsante "Copy Source" (Copia sorgente) in basso a sinistra. Questo copierà la stringa originale e la incollerà nella casella di testo. Ciò ti consente di chiarire dove si trovano i tag e ti aiuta a evitare errori.

![Interfaccia di Crowdin con il pulsante copia sorgente evidenziato](./html-tag-strings.png)

Puoi spostare la posizione dei tag all'interno della stringa per renderla più naturale nella tua lingua: assicurati solo di spostare l'intero tag.

Per informazioni più approfondite su come gestire i tag e i frammenti di codice, fai riferimento alla [Guida di stile per la traduzione di ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Dove si trovano le stringhe? {#strings}

Spesso le sole stringhe di origine potrebbero non essere sufficienti per fornire una traduzione accurata.

- Dai un'occhiata a "screenshots" (schermate) e "context" (contesto) per maggiori informazioni. Nella sezione della stringa di origine, vedrai l'immagine della schermata allegata che ti mostrerà come stiamo usando la stringa nel contesto.
- Se sei ancora insicuro, segnalalo nella "sezione commenti". [Non sai come lasciare un commento?](#comment)

![Mostra come il contesto può essere fornito per una stringa con una schermata](./source-string.png)

![Un esempio di schermata aggiunta per il contesto](./source-string-2.png)

## Come posso lasciare commenti o fare domande? Vorrei segnalare un problema o degli errori di battitura... {#comment}

Se vuoi segnalare una stringa particolare che richiede attenzione, sentiti libero di inviare un commento.

- Fai clic sul secondo pulsante della barra in alto a destra. La scheda nascosta apparirà alla tua destra. Lascia un nuovo commento e fai clic sulla casella di controllo "Issue" (Problema) in basso. Puoi specificare il tipo di problema scegliendo una delle opzioni dal menu a discesa.
- Una volta inviato, verrà segnalato al nostro team. Risolveremo il problema e te lo faremo sapere rispondendo al tuo commento e chiudendo il problema.
- Se segnali una traduzione errata, la traduzione e l'alternativa da te suggerita verranno esaminate da un madrelingua durante la revisione successiva.

![Mostra come fare commenti e segnalare problemi](./comment-issue.png)

## Cos'è la Memoria di Traduzione (TM)? {#translation-memory}

La Memoria di Traduzione (TM) è una funzionalità di Crowdin che memorizza tutte le stringhe precedentemente tradotte su ethereum.org. Quando una stringa viene tradotta, viene salvata automaticamente nella TM del nostro progetto. Questo potrebbe essere uno strumento utile per aiutarti a risparmiare tempo!

- Guarda la sezione "TM and MT Suggestions" (Suggerimenti TM e MT) e vedrai come altri traduttori hanno tradotto la stessa stringa o una simile. Se trovi un suggerimento con un alto tasso di corrispondenza, sentiti libero di fare riferimento alla traduzione facendovi clic sopra.
- Se non c'è nulla nell'elenco, puoi cercare nella TM le traduzioni fatte in precedenza e riutilizzarle per coerenza.

![Una schermata della memoria di traduzione](./translation-memory.png)

## Come uso il glossario di Crowdin? {#glossary}

La terminologia di Ethereum è un'altra parte cruciale del nostro lavoro di traduzione, poiché spesso i nuovi termini tecnici non saranno ancora localizzati in molte lingue. Inoltre, ci sono termini che hanno significati diversi in contesti diversi. [Maggiori informazioni sulla traduzione della terminologia di Ethereum](#terminology)

Il glossario di Crowdin è il posto migliore per chiarire termini e definizioni. Ci sono due modi per fare riferimento al glossario.

- Primo, quando trovi un termine sottolineato nella stringa di origine, puoi passarci sopra con il mouse e vederne una breve definizione.

![Un esempio di definizione del glossario](./glossary-definition.png)

- Secondo, se vedi un termine che non ti è familiare ma non è sottolineato, puoi cercare nella scheda del glossario (il terzo pulsante della colonna di destra). Troverai spiegazioni di termini specifici e di quelli usati frequentemente nel progetto.

![Una schermata che mostra dove trovare la scheda del glossario in Crowdin](./glossary-tab.png)

- Se ancora non riesci a trovarlo, è la tua occasione per aggiungere un nuovo termine! Ti incoraggiamo a cercarlo su un motore di ricerca e ad aggiungere la descrizione al glossario. Sarà di grande aiuto per gli altri traduttori per comprendere meglio il termine.

![Una schermata che mostra come aggiungere un termine del glossario a Crowdin](./add-glossary-term.png)

### Politica di traduzione della terminologia {#terminology}

_Per nomi (marchi, aziende, persone) e nuovi termini tecnici (Beacon Chain, shard chain, ecc.)_

Ethereum presenta molti nuovi termini che sono stati coniati di recente. Alcuni termini varieranno da traduttore a traduttore poiché non esiste una traduzione ufficiale nella rispettiva lingua. Tali incongruenze possono causare incomprensioni e diminuire la leggibilità.

A causa della diversità linguistica e delle diverse standardizzazioni in ogni lingua, è stato quasi impossibile elaborare una politica di traduzione della terminologia unificata che possa essere adattata in tutte le lingue supportate.

Dopo un'attenta considerazione, abbiamo preso la decisione di lasciare la terminologia usata più di frequente a voi, i traduttori.

Ecco cosa suggeriamo, quando trovi un termine che non ti è familiare:

- Fai riferimento al [Glossario dei termini](#glossary), potresti scoprire come altri traduttori lo hanno tradotto in precedenza. Se ritieni che il termine tradotto in precedenza non sia appropriato, sentiti libero di ripristinare la tua traduzione aggiungendo un nuovo termine al Glossario di Crowdin.
- Se tale traduzione precedente non esiste nel Glossario, ti incoraggiamo a cercarla su un motore di ricerca o in un articolo dei media che mostri come il termine viene effettivamente utilizzato nella tua comunità.
- Se non trovi alcun riferimento, sentiti libero di fidarti del tuo intuito e suggerire una nuova traduzione nella tua lingua!
- Se ti senti meno sicuro nel farlo, lascia il termine non tradotto. A volte, i termini inglesi sono più che adeguati per fornire definizioni accurate.

Ti consigliamo di lasciare non tradotti i nomi di marchi, aziende e personale, poiché una traduzione potrebbe causare inutile confusione e difficoltà SEO.

## Come funziona il processo di revisione? {#review-process}

Per garantire un certo livello di qualità e coerenza nelle nostre traduzioni, lavoriamo con [Acolad](https://www.acolad.com/), uno dei maggiori fornitori di servizi linguistici a livello globale. Acolad ha 20.000 linguisti professionisti, il che significa che possono fornire revisori professionisti per ogni lingua e tipo di contenuto di cui abbiamo bisogno.

Il processo di revisione è semplice; una volta che un insieme di contenuti è tradotto al 100%, ordiniamo una revisione per quel gruppo di contenuti. Il processo di revisione si svolge direttamente in Crowdin. Una volta completata la revisione, aggiorniamo il sito web con i contenuti tradotti.

## Come aggiungo contenuti nella mia lingua? {#adding-foreign-language-content}

Attualmente, tutti i contenuti non in inglese vengono tradotti direttamente dai contenuti di origine in inglese e qualsiasi contenuto che non esiste in inglese non può essere aggiunto in altre lingue.

Per suggerire nuovi contenuti per ethereum.org, puoi [creare una issue](https://github.com/ethereum/ethereum-org-website/issues) su GitHub. Se aggiunto, il contenuto sarà scritto in inglese e tradotto in altre lingue utilizzando Crowdin.

Prevediamo di aggiungere il supporto per l'aggiunta di contenuti non in inglese nel prossimo futuro.

## Mettiti in contatto {#contact}

Grazie per aver letto tutto questo. Speriamo che questo ti aiuti a integrarti nel nostro programma. Sentiti libero di unirti al nostro [canale di traduzione su Discord](https://discord.gg/ethereum-org) per fare domande e collaborare con altri traduttori, o contattaci all'indirizzo translations@ethereum.org!