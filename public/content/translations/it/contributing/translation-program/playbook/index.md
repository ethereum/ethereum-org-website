---
title: Manuale del programma di traduzione
lang: it
description: Una raccolta di suggerimenti e considerazioni importanti per l'impostazione di un programma di traduzione
---

# Manuale del programma di traduzione {#translation-program-playbook}

L'inglese è una delle lingue più parlate al mondo ed è di gran lunga la lingua più studiata al mondo. Poiché l'inglese è la lingua più comune utilizzata su Internet, specialmente sui social media, e i linguaggi di programmazione multilingue sono scarsi, la maggior parte dei contenuti nello spazio blockchain è scritta nativamente in inglese.

Tuttavia, poiché oltre 6 miliardi di persone nel mondo (più del 75% della popolazione) non parlano affatto inglese, ciò rappresenta un'enorme barriera all'ingresso in Ethereum per la stragrande maggioranza della popolazione mondiale.

Per questo motivo, un numero crescente di progetti nel settore sta cercando di tradurre i propri contenuti in diverse lingue e di localizzarli per le comunità globali.

Fornire contenuti multilingue è un modo semplice ed efficace per far crescere la propria comunità globale, fornire istruzione ai non anglofoni, assicurarsi che i propri contenuti e le proprie comunicazioni raggiungano un pubblico più ampio e integrare più persone nel settore.

Questa guida si propone di affrontare le sfide e le idee sbagliate più comuni sulla localizzazione dei contenuti. Fornisce una guida dettagliata alla gestione dei contenuti, al processo di traduzione e revisione, alla garanzia della qualità, alla ricerca di traduttori e ad altri aspetti vitali del processo di localizzazione.

## Gestione dei contenuti {#content-management}

La gestione dei contenuti di traduzione si riferisce al processo di automazione del flusso di lavoro della traduzione, che elimina la necessità di un lavoro manuale ripetitivo, migliora l'efficienza e la qualità, consente un maggiore controllo e permette la collaborazione.

Ci sono molti approcci diversi alla gestione dei contenuti nel processo di localizzazione, a seconda del contenuto e delle tue esigenze.

Il modo fondamentale di gestire i contenuti è creare file bilingue, contenenti il testo di origine e di destinazione. Questo metodo è usato raramente nella traduzione, poiché non offre vantaggi significativi, a parte la semplicità.

Le agenzie di traduzione di solito affrontano la gestione della traduzione utilizzando software di gestione della traduzione o strumenti di localizzazione, che forniscono funzionalità di gestione dei progetti e consentono un controllo molto maggiore su file, contenuti e linguisti.

Maggiori informazioni sulla gestione dei contenuti:

[Trados: cos'è la gestione della traduzione](https://www.trados.com/solutions/translation-management/)

[Phrase sulla gestione dei contenuti multilingue](https://phrase.com/blog/posts/multilingual-content-management/)

### Software di gestione della traduzione {#translation-management-software}

Esistono molti sistemi di gestione della traduzione e strumenti di localizzazione e la scelta del software dipende principalmente dalle proprie esigenze.

Mentre alcuni progetti decidono di non utilizzare sistemi di gestione della traduzione e preferiscono gestire le traduzioni manualmente, direttamente in file bilingue o su servizi di hosting, come GitHub, ciò riduce drasticamente il controllo, la produttività, la qualità, la scalabilità e le capacità di collaborazione. Un tale approccio potrebbe essere più vantaggioso per progetti di traduzione su piccola scala o una tantum.

Una rapida panoramica di alcuni dei più potenti e diffusi strumenti di gestione della traduzione:

**Ideale per il crowdsourcing e la collaborazione**

[Crowdin](https://crowdin.com/)

- Gratuito per progetti open-source (numero illimitato di stringhe e progetti)
- TM e glossario disponibili con tutti i piani
- Oltre 60 formati di file supportati, oltre 70 integrazioni API

[Lokalise](https://lokalise.com/)

- Gratuito per 2 membri del team, piani a pagamento per più collaboratori (numero limitato di stringhe per la maggior parte dei piani)
- TM e glossario disponibili con alcuni piani a pagamento
- Oltre 30 formati di file supportati, oltre 40 integrazioni API

[Transifex](https://www.transifex.com/)

- Solo piani a pagamento (numero limitato di stringhe per la maggior parte dei piani)
- TM e glossario disponibili con tutti i piani a pagamento
- Oltre 30 formati di file supportati, oltre 20 integrazioni API

[Phrase](https://phrase.com/)

- Solo piani a pagamento (numero illimitato di stringhe per tutti i piani, numero limitato di progetti e membri del team)
- TM e glossario disponibili con alcuni piani a pagamento
- Oltre 40 formati di file supportati, oltre 20 integrazioni API

[Smartcat](https://www.smartcat.com/)

- Piano base gratuito con funzionalità avanzate a pagamento (numero illimitato di stringhe e progetti per tutti i piani)
- TM e glossario disponibili con tutti i piani
- Oltre 60 formati di file supportati, oltre 20 integrazioni API

[POEditor](https://poeditor.com/)

- Gratuito per progetti open-source (numero limitato di stringhe per tutti i progetti, illimitato per i progetti open-source)
- TM e glossario disponibili per i piani a pagamento
- Oltre 20 formati di file supportati, oltre 10 integrazioni API

e molti altri...

**Strumenti di traduzione professionali**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Piani a pagamento per traduttori freelance e team
- Strumento di traduzione assistita da computer (CAT) molto potente e software di produttività per traduttori

[MemoQ](https://www.memoq.com/)

- Versione gratuita limitata disponibile con diversi piani a pagamento per funzionalità avanzate
- Software di gestione della traduzione per aziende, fornitori di servizi linguistici e traduttori

[Memsource](https://www.memsource.com/)

- Gratuito per traduttori individuali con diversi piani a pagamento per team
- Traduzione assistita da computer basata su cloud e sistema di gestione della traduzione

e molti altri...

Maggiori informazioni sul software di gestione della traduzione:

[Definizione di Wikipedia dei sistemi di gestione della traduzione](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase: 7 cose che ogni software di gestione della traduzione dovrebbe avere](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ: cos'è un sistema di gestione della traduzione](https://www.memoq.com/tools/what-is-a-translation-management-system)

[L'elenco di Gengo dei 16 migliori sistemi di gestione della traduzione](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Flusso di lavoro {#workflow}

Nel settore della traduzione, il flusso di lavoro della traduzione può significare un paio di cose diverse, entrambe in qualche modo correlate tra loro, e considerazioni importanti per il proprio progetto.

Li esploreremo entrambi di seguito.

**Significato 1**

Questo è probabilmente il modo più comune di pensare ai flussi di lavoro di traduzione e qualcosa che di solito viene in mente quando si sente la parola flusso di lavoro.

Nella sua essenza, è il 'flusso di lavoro' che parte dal pensare alle traduzioni fino all'utilizzo del contenuto tradotto nel proprio prodotto.

Un flusso di lavoro di esempio in questo caso sarebbe:

1. **Preparazione dei file per la traduzione** – Sembra semplice; tuttavia, è necessario considerare un paio di cose importanti. In questa fase, si dovrebbe avere un piano chiaro su come dovrebbe funzionare l'intero processo.

- _Quali tipi di file utilizzerai? In quale formato desideri ricevere i file tradotti?_
  - Se il contenuto è disponibile in formato DOCX o MD, l'approccio sarà molto più semplice rispetto alla traduzione di una versione PDF del proprio Whitepaper o di altri documenti.
- _Quali strumenti di localizzazione supportano questo tipo di file? Il file può essere tradotto in modo da mantenere la formattazione originale?_
  - Non tutti i tipi di file supportano la localizzazione diretta (ad esempio, file PDF, file di immagine) e non tutti gli strumenti di localizzazione supportano tutti i tipi di file.
- _Chi tradurrà il contenuto? Ordinerai traduzioni professionali o ti affiderai a volontari?_
  - Ciò influisce su una serie di altre decisioni da prendere. Ad esempio, i traduttori professionisti sono più a loro agio a lavorare con strumenti di localizzazione avanzati rispetto ai volontari.
- _Quali sono le tue aspettative per i linguisti? Se si utilizza un fornitore di servizi linguistici, cosa si aspettano da te?_
  - Questa è la fase in cui assicurarsi che obiettivi, aspettative e scadenze siano allineati.
- _Tutti i contenuti da tradurre sono ugualmente importanti? Alcuni contenuti dovrebbero essere tradotti prima?_
  - Ci sono alcuni modi per dare la priorità a determinati contenuti, che dovrebbero essere tradotti e implementati per primi. Ad esempio, se si hanno molti contenuti da tradurre, è possibile utilizzare il controllo della versione per assicurarsi che i traduttori sappiano a cosa dare la priorità.

2. **Condivisione dei file per la traduzione** – Anche questa fase richiede una riflessione a lungo termine e non è così semplice come inviare i file di origine a un fornitore di servizi linguistici.

- _Chi tradurrà il contenuto? Quante persone saranno coinvolte in questo processo?_
  - Se si prevede di utilizzare uno strumento di localizzazione, questo passaggio è semplificato poiché è possibile caricare i file di origine direttamente nello strumento. Questo è vero anche se il processo di traduzione si svolge sul servizio di hosting, poiché i file di origine non devono essere esportati da nessuna parte.
- _I file di origine verranno gestiti manualmente o questo processo può essere automatizzato?_
  - La maggior parte degli strumenti di localizzazione consente un certo tipo di integrazione o automazione del processo di gestione dei file. D'altra parte, se si lavora con singoli traduttori e non si utilizza uno strumento di localizzazione, l'invio manuale di file di origine a centinaia o migliaia di traduttori non è un processo scalabile.
- _Quali strumenti verranno utilizzati per la localizzazione?_
  - La risposta a questa domanda determinerà come approcciare tutto il resto. La selezione dello strumento giusto può aiutarti ad automatizzare la gestione dei contenuti, la gestione della memoria di traduzione e del glossario, la gestione dei traduttori, il monitoraggio dei progressi della traduzione/revisione, ecc., quindi prenditi un po' di tempo e fai qualche ricerca su quale strumento desideri utilizzare. Se non si prevede di utilizzare uno strumento di localizzazione, tutto quanto sopra dovrà essere fatto manualmente.
- _Quanto tempo richiederà il processo di traduzione? Quanto costerà?_
  - A questo punto, si dovrebbe essere pronti a condividere i file di origine con il fornitore di servizi linguistici o il gruppo di traduttori. Il fornitore di servizi linguistici può aiutarti ad analizzare il conteggio delle parole e a fornire un preventivo, comprese le tariffe e la tempistica per il processo di traduzione.
- _Prevedi di apportare modifiche/aggiornare il contenuto di origine durante questo processo?_
  - Se il contenuto è dinamico e cambia spesso, qualsiasi modifica o aggiornamento può interrompere l'avanzamento della traduzione. L'utilizzo di una memoria di traduzione può aiutare a mitigare questo problema in modo significativo, anche se è comunque importante pensare a come funzionerà il processo e come si può evitare di vanificare i progressi che i traduttori stanno facendo.

3. **Gestione del processo di traduzione** – Il lavoro non finisce una volta che il contenuto di origine è stato consegnato al fornitore di servizi linguistici o ai traduttori. Per garantire una qualità ottimale delle traduzioni, i creatori di contenuti dovrebbero essere il più coinvolti possibile nel processo di traduzione.

- _Come pensi di comunicare con i traduttori?_
  - Se si prevede di utilizzare uno strumento di localizzazione, la comunicazione può avvenire direttamente nello strumento. Si consiglia inoltre di impostare un canale di comunicazione alternativo con i traduttori, poiché potrebbero essere meno esitanti a contattare e gli strumenti di messaggistica consentono una comunicazione più fluida.
- _Come gestire le domande dei traduttori? Chi dovrebbe rispondere a queste domande?_
  - I traduttori (sia professionisti che non) spesso si faranno avanti con domande e richieste di chiarimenti o contesto aggiuntivo, nonché feedback e idee per miglioramenti. Rispondere a queste richieste può spesso portare a un migliore coinvolgimento e a una migliore qualità dei contenuti tradotti. È anche prezioso fornire loro quante più risorse possibili (ad esempio, guide, suggerimenti, linee guida terminologiche, domande frequenti, ecc.).
- _Come gestire il processo di revisione? Vuoi esternalizzarlo o hai la capacità di eseguire le revisioni internamente?_
  - Sebbene non sempre necessarie, le revisioni sono parte integrante di un processo di traduzione ottimale. Di solito, è più semplice esternalizzare il processo di revisione a revisori professionisti. Tuttavia, se si dispone di un grande team internazionale, le revisioni o la garanzia di qualità (QA) possono essere gestite anche internamente.

4. **Implementazione del contenuto tradotto** – L'ultima parte del flusso di lavoro, sebbene sia comunque importante da considerare in anticipo.

- _Tutte le traduzioni saranno completate contemporaneamente?_
  - In caso contrario, si dovrebbe pensare a quali traduzioni dare la priorità, come tenere traccia delle traduzioni in corso e come viene gestita l'implementazione mentre le traduzioni vengono eseguite.
- _Come ti verrà consegnato il contenuto tradotto? In quale formato sarà?_
  - Questa è una considerazione importante, indipendentemente dall'approccio utilizzato. Gli strumenti di localizzazione consentono di mantenere il controllo sul formato del file di destinazione e sul processo di esportazione e di solito supportano l'automazione, ad esempio, abilitando l'integrazione con il servizio di hosting.
- _Come implementerai le traduzioni nel tuo progetto?_
  - In alcuni casi, potrebbe essere semplice come caricare il file tradotto o aggiungerlo alla documentazione. Tuttavia, con progetti più complessi, come le traduzioni di siti web o app, è necessario assicurarsi che il codice supporti l'internazionalizzazione e stabilire in anticipo come verrà gestito il processo di implementazione.
- _Cosa succede se la formattazione è diversa da quella di origine?_
  - Similmente a quanto sopra, se si stanno traducendo semplici file di testo, la formattazione probabilmente non è di importanza cruciale. Tuttavia, con file più complessi, come i contenuti per un sito web o un'applicazione, la formattazione e il codice devono essere identici a quelli di origine per essere implementati nel proprio progetto. In caso contrario, i file di destinazione dovranno essere modificati, dai traduttori o dai tuoi sviluppatori.

**Significato 2**

Un flusso di lavoro di traduzione alternativo, che non tiene conto delle decisioni e degli approcci interni. La considerazione principale qui è il flusso del contenuto stesso.

Un flusso di lavoro di esempio in questo caso sarebbe:

1. _Traduzione → Implementazione_

- Il flusso di lavoro più semplice, in cui la traduzione sarà probabilmente umana, poiché non esiste un processo di revisione o di garanzia della qualità (QA) per valutare la qualità e modificare le traduzioni prima dell'implementazione.
- Con questo flusso di lavoro, è importante che i traduttori possano mantenere un certo livello di qualità, che richiederà risorse e comunicazione appropriate tra i project manager e i traduttori.

2. _Traduzione → Revisione → Implementazione_

- Un flusso di lavoro più avanzato, che include un processo di revisione e modifica, per garantire che la qualità delle traduzioni sia accettabile e coerente.
- Ci sono diversi approcci a questo flusso di lavoro, in cui le traduzioni potrebbero essere eseguite da traduttori professionisti o volontari, mentre il processo di revisione sarà probabilmente gestito da revisori professionisti, che hanno familiarità con tutte le regole grammaticali e ortografiche da osservare nella lingua di destinazione.

3. _Traduzione → Revisione → QA → Implementazione_

- Il flusso di lavoro ottimale per garantire il massimo livello di qualità. Sebbene la garanzia di qualità (QA) non sia sempre necessaria, potrebbe essere utile per avere un'idea migliore della qualità del testo tradotto dopo la traduzione e la revisione.
- Con questo flusso di lavoro, le traduzioni potrebbero essere eseguite esclusivamente da volontari o anche con la traduzione automatica. Il processo di revisione dovrebbe essere eseguito da traduttori professionisti, mentre la garanzia di qualità (QA) può essere eseguita da un fornitore di servizi linguistici o internamente, se si hanno dipendenti madrelingua delle lingue di destinazione.

Maggiori informazioni sui flussi di lavoro di traduzione:

[Regole di contenuto sulle cinque fasi del flusso di lavoro della traduzione](https://contentrules.com/creating-translation-workflow/)

[Smartling: cos'è la gestione del flusso di lavoro della traduzione](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans sul flusso di lavoro della traduzione](https://www.rixtrans.com/translation-workflow)

## Gestione della terminologia {#terminology-management}

Stabilire un piano chiaro su come gestire la terminologia è uno dei passaggi più importanti per garantire la qualità e la coerenza delle proprie traduzioni e far risparmiare tempo ai traduttori.

Nel settore della traduzione, questo è noto come gestione della terminologia ed è uno dei servizi chiave che i fornitori di servizi linguistici offrono ai loro clienti, oltre all'accesso al loro gruppo di linguisti e alla gestione dei contenuti.

La gestione della terminologia si riferisce al processo di identificazione, raccolta e gestione della terminologia importante per il proprio progetto e che dovrebbe essere sempre tradotta in modo corretto e coerente.

Ci sono un paio di passaggi da seguire quando si inizia a pensare alla gestione della terminologia:

- Identificare i termini chiave da includere nella base terminologica.
- Creare un glossario di termini e le loro definizioni.
- Tradurre i termini e aggiungerli al glossario.
- Controllare e approvare le traduzioni.
- Mantenere il glossario e aggiornarlo con nuovi termini, man mano che diventano importanti.

Maggiori informazioni sulla gestione della terminologia:

[Trados: cos'è la gestione della terminologia](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific sull'importanza della gestione della terminologia](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation: cos'è la gestione della terminologia e perché è importante](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Memoria di Traduzione e Glossario {#tm-and-glossary}

La Memoria di Traduzione e il Glossario sono strumenti importanti nel settore della traduzione e qualcosa su cui la maggior parte dei fornitori di servizi linguistici fa affidamento.

Vediamo cosa significano questi termini e in cosa differiscono l'uno dall'altro:

**Memoria di traduzione (TM)** – Un database che memorizza automaticamente segmenti o stringhe, inclusi blocchi di testo più lunghi, frasi complete, paragrafi e singoli termini, nonché le loro traduzioni attuali e precedenti in ogni lingua.

La maggior parte degli strumenti di localizzazione, dei sistemi di gestione della traduzione e degli strumenti di traduzione assistita da computer dispongono di memorie di traduzione integrate, che di solito possono essere esportate e utilizzate anche in altri strumenti simili.

I vantaggi dell'utilizzo di una memoria di traduzione includono traduzioni più veloci, una migliore qualità della traduzione, la possibilità di conservare determinate traduzioni durante l'aggiornamento o la modifica del contenuto di origine e costi di traduzione più economici per i contenuti ripetitivi.

Le memorie di traduzione funzionano sulla base di una corrispondenza percentuale tra diversi segmenti e di solito sono più utili quando due segmenti contengono oltre il 50% dello stesso contenuto. Sono anche utilizzate per tradurre automaticamente segmenti ripetitivi, che sono corrispondenze al 100%, eliminando così la necessità di tradurre più di una volta i contenuti ripetitivi.

Maggiori informazioni sulle memorie di traduzione:

[Memsource sulle memorie di traduzione](https://www.memsource.com/translation-memory/)

[Smartling: cos'è una memoria di traduzione](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glossario –** Un elenco di termini importanti o sensibili, le loro definizioni, funzioni e traduzioni consolidate. La differenza principale tra un glossario e una memoria di traduzione è che un glossario non viene creato automaticamente e che non contiene traduzioni di frasi intere.

La maggior parte degli strumenti di localizzazione, dei sistemi di gestione della traduzione e degli strumenti di traduzione assistita da computer dispongono di glossari integrati che è possibile gestire per garantire che contengano la terminologia importante per il proprio progetto. Come la TM, il glossario di solito può essere esportato e utilizzato in altri strumenti di localizzazione.

Prima di iniziare il progetto di traduzione, si consiglia vivamente di dedicare un po' di tempo alla creazione di un glossario per traduttori e revisori. L'uso di un glossario garantisce che i termini importanti siano tradotti correttamente, fornisce ai traduttori il contesto tanto necessario e garantisce la coerenza nelle traduzioni.

Sebbene i glossari contengano più spesso traduzioni consolidate nelle lingue di destinazione, sono utili anche senza di esse. Anche senza traduzioni consolidate, un glossario può contenere definizioni di termini tecnici, evidenziare termini che non dovrebbero essere tradotti e informare i traduttori se un termine specifico è usato come nome, verbo, nome proprio o qualsiasi altra parte del discorso.

Maggiori informazioni sui glossari:

[Lionbridge: cos'è un glossario di traduzione](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex sui glossari](https://docs.transifex.com/glossary/glossary)

Se non si prevede di utilizzare uno strumento di localizzazione per il proprio progetto, molto probabilmente non sarà possibile utilizzare una memoria di traduzione e un glossario (si potrebbe creare un glossario o una base terminologica in un file excel, tuttavia i glossari automatizzati eliminano la necessità per i traduttori di cercare manualmente i termini e le loro definizioni).

Ciò significa che tutti i contenuti ripetitivi e simili dovrebbero essere tradotti manualmente ogni volta. Inoltre, i traduttori dovrebbero porre domande sul fatto che un determinato termine debba essere tradotto o meno, su come viene utilizzato nel testo e se un termine ha già una traduzione consolidata.

_Desideri utilizzare la memoria di traduzione e il glossario di ethereum.org nel tuo progetto? Contattaci all'indirizzo translations@ethereum.org._

## Ricerca di traduttori {#translator-outreach}

**Lavorare con un fornitore di servizi linguistici**

Se si lavora con un fornitore di servizi linguistici e i suoi traduttori professionisti, questa sezione potrebbe non essere molto rilevante.

In questo caso, è importante selezionare un fornitore di servizi linguistici con la capacità di fornire tutti i servizi di cui si ha bisogno (ad esempio, traduzione, revisione, QA) in molte lingue.

Anche se potrebbe essere allettante selezionare un fornitore di servizi linguistici basandosi esclusivamente sulle tariffe offerte, è importante notare che i maggiori fornitori di servizi linguistici hanno tariffe più alte per un motivo.

- Hanno decine di migliaia di linguisti nel loro database, il che significa che saranno in grado di assegnare al tuo progetto traduttori con sufficiente esperienza e conoscenza del tuo settore specifico (cioè traduttori tecnici).
- Hanno una notevole esperienza nel lavorare su progetti diversi e nel soddisfare le diverse esigenze dei loro clienti. Ciò significa che saranno più propensi ad adattarsi al tuo particolare flusso di lavoro, a offrire suggerimenti preziosi e potenziali miglioramenti per il tuo processo di traduzione e a soddisfare le tue esigenze, i tuoi requisiti e le tue scadenze.
- La maggior parte dei maggiori fornitori di servizi linguistici dispone anche di propri strumenti di localizzazione, memorie di traduzione e glossari che è possibile utilizzare. In caso contrario, hanno almeno abbastanza linguisti nel loro gruppo per assicurarsi che i loro traduttori abbiano familiarità e siano in grado di lavorare con qualsiasi strumento di localizzazione che si desidera utilizzare.

È possibile trovare un confronto approfondito dei maggiori fornitori di servizi linguistici al mondo, alcuni dettagli su ciascuno di essi e suddivisioni per servizi forniti, dati geografici, ecc. nel [rapporto Nimdzi 100 del 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Lavorare con traduttori non professionisti**

Potresti lavorare con traduttori non professionisti e cercare volontari che ti aiutino a tradurre.

Ci sono diversi modi per raggiungere le persone e invitarle a partecipare al tuo progetto. Questo dipenderà in gran parte dal tuo prodotto e dalla grandezza della comunità che hai già.

Di seguito sono descritti alcuni modi per integrare i volontari:

**Divulgazione –** Sebbene questo sia in qualche modo trattato nei punti seguenti, raggiungere potenziali volontari e assicurarsi che siano a conoscenza della tua iniziativa di traduzione può essere efficace di per sé.

Molte persone vogliono essere coinvolte e contribuire ai loro progetti preferiti, ma spesso non vedono un modo chiaro per farlo senza essere uno sviluppatore o avere competenze tecniche speciali. Se riesci a diffondere la consapevolezza del tuo progetto, molti bilingui saranno probabilmente desiderosi di essere coinvolti.

**Guardare all'interno della propria comunità –** La maggior parte dei progetti nel settore ha già comunità grandi e attive. Molti membri della tua comunità probabilmente apprezzerebbero la possibilità di contribuire al progetto in modo semplice.

Mentre contribuire a progetti open-source è spesso basato sulla motivazione intrinseca, è anche una fantastica esperienza di apprendimento. Chiunque sia interessato a saperne di più sul tuo progetto sarebbe probabilmente felice di essere coinvolto in un programma di traduzione come volontario, poiché gli consentirebbe di combinare il fatto di aver contribuito a qualcosa a cui tiene con un'intensa esperienza di apprendimento pratico.

**Menzionare l'iniziativa nel proprio prodotto –** Se il proprio prodotto è popolare e utilizzato da un gran numero di persone, evidenziare il proprio programma di traduzione e invitare gli utenti all'azione durante l'utilizzo del prodotto può essere estremamente efficace.

Potrebbe essere semplice come aggiungere un banner o un pop-up con un invito all'azione (CTA) al proprio prodotto per applicazioni e siti web. Questo è efficace perché il tuo pubblico di destinazione è la tua comunità - le persone che hanno maggiori probabilità di essere coinvolte in primo luogo.

**Social media –** I social media possono essere un modo efficace per diffondere la consapevolezza del proprio programma di traduzione e raggiungere i membri della propria comunità, così come altre persone che non sono ancora membri della comunità.

Se si dispone di un server Discord o di un canale Telegram, è facile utilizzarlo per la divulgazione, la comunicazione con i traduttori e il riconoscimento dei collaboratori.

Piattaforme come X (ex Twitter) possono anche essere utili per l'integrazione di nuovi membri della comunità e per riconoscere pubblicamente i tuoi collaboratori.

La Linux Foundation ha creato un [Rapporto approfondito sul sondaggio dei collaboratori FOSS del 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analizzando i collaboratori open-source e le loro motivazioni.

## Conclusione {#conclusion}

Questo documento contiene alcune considerazioni chiave di cui ogni programma di traduzione dovrebbe essere a conoscenza. Non è affatto una guida esaustiva, anche se può aiutare chiunque non abbia esperienza nel settore della traduzione a organizzare un programma di traduzione per il proprio progetto.

Se stai cercando istruzioni più dettagliate e analisi di diversi strumenti, processi e aspetti critici della gestione di un programma di traduzione, alcuni dei maggiori fornitori di servizi linguistici mantengono blog e spesso pubblicano articoli su diversi aspetti del processo di localizzazione. Queste sono le migliori risorse se vuoi approfondire uno qualsiasi degli argomenti di cui sopra e capire come funziona professionalmente il processo di localizzazione.

Alcuni link pertinenti sono inclusi alla fine di ogni sezione; tuttavia, è possibile trovare molte altre risorse online.

Per proposte di collaborazione o informazioni aggiuntive, apprendimenti e migliori pratiche che abbiamo acquisito mantenendo il Programma di Traduzione di ethereum.org, non esitate a contattarci all'indirizzo translations@ethereum.org.
