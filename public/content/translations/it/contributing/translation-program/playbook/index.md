---
title: Manuale del programma di traduzione
lang: it
description: Una raccolta di suggerimenti e considerazioni importanti per l'impostazione di un programma di traduzione
---

# Manuale del programma di traduzione {#translation-program-playbook}

L'inglese è una delle lingue più parlate al mondo ed è di gran lunga la lingua più studiata a livello globale. Poiché l'inglese è la lingua più comune utilizzata su Internet, specialmente sui social media, e i linguaggi di programmazione multilingue sono scarsi, la maggior parte dei contenuti nello spazio della blockchain è scritta nativamente in inglese.

Tuttavia, poiché oltre 6 miliardi di persone al mondo (più del 75% della popolazione) non parlano affatto inglese, ciò rappresenta un'enorme barriera all'ingresso in Ethereum per la stragrande maggioranza della popolazione mondiale.

Per questo motivo, un numero crescente di progetti nel settore sta cercando di far tradurre i propri contenuti in diverse lingue e localizzarli per le comunità globali.

Fornire contenuti multilingue è un modo semplice ed efficace per far crescere la propria comunità globale, offrire formazione a chi non parla inglese, assicurarsi che i propri contenuti e le proprie comunicazioni raggiungano un pubblico più ampio e far avvicinare più persone al settore.

Questa guida mira ad affrontare le sfide e le idee sbagliate comuni sulla localizzazione dei contenuti. Fornisce una guida passo passo alla gestione dei contenuti, al processo di traduzione e revisione, alla garanzia della qualità, al coinvolgimento dei traduttori e ad altri aspetti vitali del processo di localizzazione.

## Gestione dei contenuti {#content-management}

La gestione dei contenuti di traduzione si riferisce al processo di automazione del flusso di lavoro di traduzione, che elimina la necessità di lavori manuali ripetitivi, migliora l'efficienza e la qualità, consente un controllo migliore e facilita la collaborazione.

Esistono molti approcci diversi alla gestione dei contenuti nel processo di localizzazione, a seconda dei contenuti e delle proprie esigenze.

Il modo fondamentale per gestire i contenuti è creare file bilingue, contenenti il testo di origine e quello di destinazione. Questo metodo è usato raramente nella traduzione, poiché non offre vantaggi significativi, a parte la semplicità.

Le agenzie di traduzione di solito affrontano la gestione delle traduzioni utilizzando software di gestione delle traduzioni o strumenti di localizzazione, che forniscono capacità di gestione dei progetti e consentono un controllo molto maggiore su file, contenuti e linguisti.

Scopri di più sulla gestione dei contenuti:

[Trados su cos'è la gestione delle traduzioni](https://www.trados.com/solutions/translation-management/)

[Phrase sulla gestione dei contenuti multilingue](https://phrase.com/blog/posts/multilingual-content-management/)

### Software di gestione delle traduzioni {#translation-management-software}

Esistono molti sistemi di gestione delle traduzioni e strumenti di localizzazione, e la scelta del software dipende principalmente dalle proprie esigenze.

Sebbene alcuni progetti decidano di non utilizzare sistemi di gestione delle traduzioni e preferiscano gestire le traduzioni manualmente, direttamente in file bilingue o su servizi di hosting come GitHub, ciò riduce drasticamente il controllo, la produttività, la qualità, la scalabilità e le capacità di collaborazione. Un approccio del genere potrebbe essere più vantaggioso per progetti di traduzione su piccola scala o una tantum.

Una rapida occhiata ad alcuni degli strumenti di gestione delle traduzioni più potenti e ampiamente utilizzati:

**I migliori per il crowdsourcing e la collaborazione**

[Crowdin](https://crowdin.com/)

- Gratuito per i progetti open-source (numero illimitato di stringhe e progetti)
- TM (Memoria di Traduzione) e glossario disponibili con tutti i piani
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

- Gratuito per i progetti open-source (numero limitato di stringhe per tutti i progetti, illimitato per i progetti open-source)
- TM e glossario disponibili per i piani a pagamento
- Oltre 20 formati di file supportati, oltre 10 integrazioni API

e molti altri...

**Strumenti di traduzione professionali**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Piani a pagamento per traduttori freelance e team
- Strumento di traduzione assistita dal computer (CAT) e software di produttività per traduttori molto potente

[MemoQ](https://www.memoq.com/)

- Versione gratuita limitata disponibile con diversi piani a pagamento per funzionalità avanzate
- Software di gestione delle traduzioni per aziende, fornitori di servizi linguistici e traduttori

[Memsource](https://www.memsource.com/)

- Gratuito per traduttori individuali con diversi piani a pagamento per i team
- Sistema di traduzione assistita dal computer e di gestione delle traduzioni basato su cloud

e molti altri...

Scopri di più sui software di gestione delle traduzioni:

[Definizione di Wikipedia dei sistemi di gestione delle traduzioni](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase su 7 cose che ogni software di gestione delle traduzioni dovrebbe avere](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ su cos'è un sistema di gestione delle traduzioni](https://www.memoq.com/tools/what-is-a-translation-management-system)

[L'elenco di Gengo dei 16 migliori sistemi di gestione delle traduzioni](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Flusso di lavoro {#workflow}

Nello spazio della traduzione, il flusso di lavoro di traduzione può significare un paio di cose diverse, entrambe in qualche modo correlate, e considerazioni importanti per il tuo progetto.

Le esploreremo entrambe di seguito.

**Significato 1**

Questo è probabilmente il modo più comune di pensare ai flussi di lavoro di traduzione e qualcosa che di solito viene in mente quando si sente la parola flusso di lavoro.

Nella sua essenza, è il "flusso di lavoro" dall'iniziare a pensare alle traduzioni fino all'utilizzo dei contenuti tradotti nel proprio prodotto.

Un esempio di flusso di lavoro in questo caso sarebbe:

1. **Preparazione dei file per la traduzione** – Sembra semplice; tuttavia, è necessario considerare un paio di cose importanti. In questa fase, dovresti avere un piano chiaro su come dovrebbe funzionare l'intero processo.

- _Quali tipi di file utilizzerai? In quale formato desideri ricevere i tuoi file tradotti?_
  - Se i tuoi contenuti sono disponibili in formato DOCX o MD, l'approccio sarà molto più semplice rispetto alla traduzione di una versione PDF del tuo Whitepaper o di altri documenti.
- _Quali strumenti di localizzazione supportano questo tipo di file? Il file può essere tradotto in modo da mantenere la formattazione originale?_
  - Non tutti i tipi di file supportano la localizzazione diretta (ad es. file PDF, file immagine) e non tutti gli strumenti di localizzazione supportano tutti i tipi di file.
- _Chi tradurrà i contenuti? Ordinerai traduzioni professionali o ti affiderai a volontari?_
  - Questo influisce su una serie di altre decisioni che devi prendere. Ad esempio, i traduttori professionisti si trovano più a loro agio a lavorare con strumenti di localizzazione avanzati rispetto ai volontari.
- _Quali sono le tue aspettative per i linguisti? Se utilizzi un fornitore di servizi linguistici, cosa si aspetta da te?_
  - Questo è il passaggio per assicurarti che i tuoi obiettivi, le tue aspettative e le tue tempistiche siano allineati.
- _Tutti i contenuti da tradurre sono ugualmente importanti? Alcuni contenuti dovrebbero essere tradotti prima?_
  - Ci sono alcuni modi per dare priorità a determinati contenuti, che dovrebbero essere tradotti e implementati per primi. Ad esempio, se hai molti contenuti da tradurre, puoi utilizzare il controllo della versione per assicurarti che i traduttori sappiano a quali dare la priorità.

2. **Condivisione dei file per la traduzione** – Anche questo passaggio richiede una riflessione a lungo termine e non è semplice come inviare i file di origine a un fornitore di servizi linguistici.

- _Chi tradurrà i contenuti? Quante persone saranno coinvolte in questo processo?_
  - Se prevedi di utilizzare uno strumento di localizzazione, questo passaggio è semplificato poiché puoi caricare i file di origine direttamente nello strumento. Questo vale anche se il processo di traduzione avviene sul servizio di hosting, poiché i file di origine non devono essere esportati da nessuna parte.
- _I file di origine verranno gestiti manualmente o questo processo può essere automatizzato?_
  - La maggior parte degli strumenti di localizzazione consente un qualche tipo di integrazione o automazione del processo di gestione dei file. D'altra parte, se lavori con singoli traduttori e non utilizzi uno strumento di localizzazione, l'invio manuale dei file di origine a centinaia o migliaia di traduttori non è un processo scalabile.
- _Quali strumenti verranno utilizzati per la localizzazione?_
  - La risposta a questa domanda determinerà come affronterai tutto il resto. La selezione dello strumento appropriato può aiutarti ad automatizzare la gestione dei contenuti, la gestione della Memoria di Traduzione e del Glossario, la gestione dei traduttori, il monitoraggio dei progressi di traduzione/revisione, ecc., quindi prenditi del tempo e fai qualche ricerca su quale strumento desideri utilizzare. Se non prevedi di utilizzare uno strumento di localizzazione, tutto quanto sopra dovrà essere fatto manualmente.
- _Quanto tempo richiederà il processo di traduzione? Quanto costerà?_
  - A questo punto, dovresti essere pronto a condividere i file di origine con il fornitore di servizi linguistici o con il gruppo di traduttori. Il fornitore di servizi linguistici può aiutarti ad analizzare il conteggio delle parole e fornire un preventivo, incluse le tariffe e le tempistiche per il processo di traduzione.
- _Prevedi di apportare modifiche/aggiornare i contenuti di origine durante questo processo?_
  - Se i tuoi contenuti sono dinamici e cambiano spesso, qualsiasi modifica o aggiornamento può interrompere i progressi della traduzione. L'utilizzo di una Memoria di Traduzione può aiutare a mitigare questo problema in modo significativo, sebbene sia comunque importante pensare a come funzionerà il processo e a come evitare di ritardare i progressi che i traduttori stanno facendo.

3. **Gestione del processo di traduzione** – Il tuo lavoro non è finito una volta che i contenuti di origine vengono consegnati al fornitore di servizi linguistici o ai traduttori. Per garantire una qualità ottimale delle traduzioni, i creatori di contenuti dovrebbero essere il più coinvolti possibile nel processo di traduzione.

- _Come prevedi di comunicare con i traduttori?_
  - Se prevedi di utilizzare uno strumento di localizzazione, la comunicazione può avvenire direttamente nello strumento. Si consiglia inoltre di impostare un canale di comunicazione alternativo con i traduttori, poiché potrebbero essere meno esitanti a contattarti e gli strumenti di messaggistica consentono una comunicazione più fluida.
- _Come gestire le domande dei traduttori? Chi dovrebbe rispondere a queste domande?_
  - I traduttori (sia professionisti che non professionisti) spesso si metteranno in contatto con domande e richieste di chiarimenti o contesto aggiuntivo, nonché feedback e idee per miglioramenti. Rispondere a queste richieste può spesso portare a un migliore coinvolgimento e a una maggiore qualità dei contenuti tradotti. È anche utile fornire loro quante più risorse possibili (ad es. guide, suggerimenti, linee guida terminologiche, FAQ, ecc.).
- _Come gestire il processo di revisione? Vuoi esternalizzarlo o hai la capacità di eseguire le revisioni internamente?_
  - Sebbene non siano sempre necessarie, le revisioni sono parte integrante di un processo di traduzione ottimale. Di solito, è più semplice esternalizzare il processo di revisione a revisori professionisti. Tuttavia, se hai un grande team internazionale, le revisioni o la QA possono essere gestite anche internamente.

4. **Implementazione dei contenuti tradotti** – L'ultima parte del flusso di lavoro, sebbene sia comunque importante da considerare in anticipo.

- _Tutte le traduzioni verranno completate contemporaneamente?_
  - In caso contrario, dovresti pensare a quali traduzioni dovrebbero avere la priorità, a come tenere traccia delle traduzioni in corso e a come viene gestita l'implementazione mentre le traduzioni vengono eseguite.
- _Come ti verranno consegnati i contenuti tradotti? In quale formato saranno?_
  - Questa è una considerazione importante, indipendentemente dall'approccio utilizzato. Gli strumenti di localizzazione consentono di mantenere il controllo sul formato del file di destinazione e sul processo di esportazione e di solito supportano l'automazione, ad esempio abilitando l'integrazione con il servizio di hosting.
- _Come implementerai le traduzioni nel tuo progetto?_
  - In alcuni casi, questo potrebbe essere semplice come caricare il file tradotto o aggiungerlo ai tuoi documenti. Tuttavia, con progetti più complessi, come le traduzioni di siti web o app, dovresti assicurarti che il codice supporti l'internazionalizzazione e stabilire in anticipo come verrà gestito il processo di implementazione.
- _Cosa succede se la formattazione è diversa da quella di origine?_
  - Similmente a quanto sopra, se stai traducendo semplici file di testo, la formattazione probabilmente non è di fondamentale importanza. Tuttavia, con file più complessi, come i contenuti per un sito web o un'applicazione, la formattazione e il codice devono essere identici all'origine per poter essere implementati nel tuo progetto. In caso contrario, i file di destinazione dovranno essere modificati, dai traduttori o dai tuoi sviluppatori.

**Significato 2**

Un flusso di lavoro di traduzione alternativo, che non tiene conto delle decisioni e degli approcci interni. La considerazione principale qui è il flusso dei contenuti stessi.

Un esempio di flusso di lavoro in questo caso sarebbe:

1. _Traduzione → Implementazione_

- Il flusso di lavoro più semplice, in cui la traduzione sarà probabilmente una traduzione umana, poiché non esiste alcun processo di revisione o QA per valutare la qualità e modificare le traduzioni prima dell'implementazione.
- Con questo flusso di lavoro, è importante che i traduttori possano mantenere un certo livello di qualità, il che richiederà risorse adeguate e comunicazione tra i project manager e i traduttori.

2. _Traduzione → Revisione → Implementazione_

- Un flusso di lavoro più avanzato, che include un processo di revisione e modifica, per garantire che la qualità delle traduzioni sia accettabile e coerente.
- Esistono diversi approcci a questo flusso di lavoro, in cui le traduzioni potrebbero essere eseguite da traduttori professionisti o volontari, mentre il processo di revisione sarà probabilmente gestito da revisori professionisti, che hanno familiarità con tutte le regole grammaticali e ortografiche che devono essere osservate nella lingua di destinazione.

3. _Traduzione → Revisione → QA → Implementazione_

- Il flusso di lavoro ottimale per garantire il massimo livello di qualità. Sebbene la QA non sia sempre necessaria, potrebbe essere utile per darti un'idea migliore della qualità del testo tradotto dopo la traduzione e la revisione.
- Con questo flusso di lavoro, le traduzioni potrebbero essere eseguite esclusivamente da volontari o persino tramite traduzione automatica. Il processo di revisione dovrebbe essere eseguito da traduttori professionisti, mentre la QA può essere eseguita da un fornitore di servizi linguistici o internamente, se hai dipendenti madrelingua delle lingue di destinazione.

Scopri di più sui flussi di lavoro di traduzione:

[Content rules sulle cinque fasi del flusso di lavoro di traduzione](https://contentrules.com/creating-translation-workflow/)

[Smartling su cos'è la gestione del flusso di lavoro di traduzione](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans sul flusso di lavoro di traduzione](https://www.rixtrans.com/translation-workflow)

## Gestione della terminologia {#terminology-management}

Stabilire un piano chiaro su come gestire la terminologia è uno dei passaggi più importanti per garantire la qualità e la coerenza delle tue traduzioni e far risparmiare tempo ai tuoi traduttori.

Nello spazio della traduzione, questo è noto come gestione della terminologia ed è uno dei servizi chiave che i fornitori di servizi linguistici offrono ai propri clienti, oltre all'accesso al loro gruppo di linguisti e alla gestione dei contenuti.

La gestione della terminologia si riferisce al processo di identificazione, raccolta e gestione della terminologia che è importante per il tuo progetto e che dovrebbe sempre essere tradotta in modo corretto e coerente.

Ci sono un paio di passaggi da seguire quando si inizia a pensare alla gestione della terminologia:

- Identificare i termini chiave che dovrebbero essere inclusi nel database terminologico.
- Creare un glossario dei termini e delle loro definizioni.
- Tradurre i termini e aggiungerli al glossario.
- Controllare e approvare le traduzioni.
- Mantenere il glossario e aggiornarlo con nuovi termini, man mano che diventano importanti.

Scopri di più sulla gestione della terminologia:

[Trados su cos'è la gestione della terminologia](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific sul perché la gestione della terminologia è importante](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation su cos'è la gestione della terminologia e perché è importante](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Memoria di Traduzione e Glossario {#tm-and-glossary}

La Memoria di Traduzione e il Glossario sono strumenti importanti nel settore delle traduzioni e qualcosa su cui fa affidamento la maggior parte dei fornitori di servizi linguistici.

Diamo un'occhiata a cosa significano questi termini e in che modo differiscono l'uno dall'altro:

**Memoria di traduzione (TM)** – Un database che archivia automaticamente segmenti o stringhe, inclusi blocchi di testo più lunghi, frasi complete, paragrafi e singoli termini, nonché le loro traduzioni attuali e precedenti in ogni lingua.

La maggior parte degli strumenti di localizzazione, dei sistemi di gestione delle traduzioni e degli strumenti di traduzione assistita dal computer dispone di memorie di traduzione integrate, che di solito possono essere esportate e utilizzate anche in altri strumenti simili.

I vantaggi dell'utilizzo di una memoria di traduzione includono traduzioni più rapide, una migliore qualità della traduzione, la capacità di conservare determinate traduzioni durante l'aggiornamento o la modifica dei contenuti di origine e costi di traduzione inferiori per i contenuti ripetitivi.

Le memorie di traduzione funzionano in base a una corrispondenza percentuale tra segmenti diversi e di solito sono più utili quando due segmenti contengono oltre il 50% degli stessi contenuti. Vengono anche utilizzate per tradurre automaticamente segmenti ripetitivi, che corrispondono al 100%, eliminando così la necessità di tradurre i contenuti ripetitivi più di una volta.

Scopri di più sulle memorie di traduzione:

[Memsource sulle memorie di traduzione](https://www.memsource.com/translation-memory/)

[Smartling su cos'è una memoria di traduzione](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glossario –** Un elenco di termini importanti o sensibili, le loro definizioni, funzioni e traduzioni stabilite. La differenza principale tra un glossario e una memoria di traduzione è che un glossario non viene creato automaticamente e che non contiene traduzioni di frasi complete.

La maggior parte degli strumenti di localizzazione, dei sistemi di gestione delle traduzioni e degli strumenti di traduzione assistita dal computer dispone di glossari integrati che puoi mantenere per assicurarti che contengano la terminologia importante per il tuo progetto. Come la TM, il glossario di solito può essere esportato e utilizzato in altri strumenti di localizzazione.

Prima di iniziare il tuo progetto di traduzione, si consiglia vivamente di dedicare un po' di tempo alla creazione di un glossario per i tuoi traduttori e revisori. L'utilizzo di un glossario garantisce che i termini importanti vengano tradotti correttamente, fornisce ai traduttori il contesto tanto necessario e garantisce la coerenza nelle traduzioni.

Sebbene i glossari contengano più spesso traduzioni stabilite nelle lingue di destinazione, sono utili anche senza di esse. Anche senza traduzioni stabilite, un glossario può contenere definizioni di termini tecnici, evidenziare termini che non dovrebbero essere tradotti e informare i traduttori se un termine specifico viene utilizzato come sostantivo, verbo, nome proprio o qualsiasi altra parte del discorso.

Scopri di più sui glossari:

[Lionbridge su cos'è un glossario di traduzione](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex sui glossari](https://docs.transifex.com/glossary/glossary)

Se non prevedi di utilizzare uno strumento di localizzazione per il tuo progetto, probabilmente non sarai in grado di utilizzare una memoria di traduzione e un glossario (potresti creare un glossario o un database terminologico in un file Excel, tuttavia, i glossari automatizzati eliminano la necessità per i traduttori di cercare manualmente i termini e le loro definizioni).

Ciò significa che tutti i contenuti ripetitivi e simili dovrebbero essere tradotti manualmente ogni volta. Inoltre, i traduttori dovrebbero contattarti con domande su se un determinato termine debba essere tradotto o meno, come viene utilizzato nel testo e se un termine ha già una traduzione stabilita.

_Vuoi utilizzare la memoria di traduzione e il glossario di ethereum.org nel tuo progetto? Contattaci all'indirizzo translations@ethereum.org._

## Coinvolgimento dei traduttori {#translator-outreach}

**Lavorare con un fornitore di servizi linguistici**

Se lavori con un fornitore di servizi linguistici e i suoi traduttori professionisti, questa sezione potrebbe non essere molto rilevante per te.

In questo caso, è importante selezionare un fornitore di servizi linguistici con la capacità di fornire tutti i servizi di cui hai bisogno (ad es. traduzione, revisione, QA) in molte lingue.

Sebbene possa essere allettante selezionare un fornitore di servizi linguistici basandosi esclusivamente sulle tariffe offerte, è importante notare che i fornitori di servizi linguistici più grandi hanno tariffe più elevate per un motivo.

- Hanno decine di migliaia di linguisti nel loro database, il che significa che saranno in grado di assegnare al tuo progetto traduttori con sufficiente esperienza e conoscenza del tuo particolare settore (ovvero, traduttori tecnici).
- Hanno un'esperienza significativa nel lavorare su diversi progetti e nel soddisfare le diverse esigenze dei loro clienti. Ciò significa che saranno più propensi ad adattarsi al tuo particolare flusso di lavoro, a offrire preziosi suggerimenti e potenziali miglioramenti per il tuo processo di traduzione e a soddisfare le tue esigenze, i tuoi requisiti e le tue scadenze.
- La maggior parte dei più grandi fornitori di servizi linguistici dispone anche di propri strumenti di localizzazione, memorie di traduzione e glossari che puoi utilizzare. In caso contrario, hanno almeno abbastanza linguisti nel loro gruppo per assicurarsi che i loro traduttori abbiano familiarità e siano in grado di lavorare con qualsiasi strumento di localizzazione tu voglia utilizzare.

Puoi trovare un confronto approfondito dei più grandi fornitori di servizi linguistici al mondo, alcuni dettagli su ciascuno di essi e suddivisioni in base ai servizi che forniscono, dati geografici, ecc. nel [rapporto Nimdzi 100 del 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Lavorare con traduttori non professionisti**

Potresti lavorare con traduttori non professionisti e cercare volontari che ti aiutino a tradurre.

Esistono diversi modi per raggiungere le persone e invitarle a unirsi al tuo progetto. Ciò dipenderà in gran parte dal tuo prodotto e da quanto è grande la comunità che hai già.

Alcuni modi per coinvolgere i volontari sono descritti di seguito:

**Sensibilizzazione –** Sebbene questo sia in qualche modo trattato nei punti seguenti, contattare potenziali volontari e assicurarsi che siano a conoscenza della tua iniziativa di traduzione può essere efficace di per sé.

Molte persone vogliono essere coinvolte e contribuire ai loro progetti preferiti, ma spesso non vedono un modo chiaro per farlo senza essere sviluppatori o avere competenze tecniche speciali. Se riesci a diffondere la consapevolezza sul tuo progetto, molti bilingui saranno probabilmente desiderosi di essere coinvolti.

**Cercare all'interno della propria comunità –** La maggior parte dei progetti nel settore ha già comunità ampie e attive. Molti membri della tua comunità probabilmente apprezzerebbero la possibilità di contribuire al progetto in modo semplice.

Sebbene contribuire a progetti open-source sia spesso basato su una motivazione intrinseca, è anche una fantastica esperienza di apprendimento. Chiunque sia interessato a saperne di più sul tuo progetto sarebbe probabilmente felice di essere coinvolto in un programma di traduzione come volontario, poiché gli consentirebbe di combinare il fatto di aver contribuito a qualcosa a cui tiene con un'intensa esperienza di apprendimento pratico.

**Menzionare l'iniziativa nel proprio prodotto –** Se il tuo prodotto è popolare e utilizzato da un gran numero di persone, evidenziare il tuo programma di traduzione e invitare gli utenti all'azione durante l'utilizzo del prodotto può essere estremamente efficace.

Questo potrebbe essere semplice come aggiungere un banner o un pop-up con una CTA al tuo prodotto per applicazioni e siti web. Questo è efficace perché il tuo pubblico di destinazione è la tua comunità: le persone che hanno maggiori probabilità di essere coinvolte in primo luogo.

**Social media –** I social media possono essere un modo efficace per diffondere la consapevolezza sul tuo programma di traduzione e raggiungere i membri della tua comunità, così come altre persone che non ne fanno ancora parte.

Se hai un server Discord o un canale Telegram, è facile usarlo per la sensibilizzazione, la comunicazione con i tuoi traduttori e il riconoscimento dei tuoi collaboratori.

Piattaforme come X (precedentemente Twitter) possono anche essere utili per coinvolgere nuovi membri della comunità e riconoscere pubblicamente i tuoi collaboratori.

La Linux Foundation ha creato un ampio [Rapporto sul sondaggio dei collaboratori FOSS del 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analizzando i collaboratori open-source e le loro motivazioni.

## Conclusione {#conclusion}

Questo documento contiene alcune considerazioni chiave di cui ogni programma di traduzione dovrebbe essere a conoscenza. Non è in alcun modo una guida esaustiva, sebbene possa aiutare chiunque non abbia esperienza nel settore delle traduzioni a organizzare un programma di traduzione per il proprio progetto.

Se stai cercando istruzioni più dettagliate e suddivisioni di diversi strumenti, processi e aspetti critici della gestione di un programma di traduzione, alcuni dei più grandi fornitori di servizi linguistici mantengono blog e spesso pubblicano articoli su diversi aspetti del processo di localizzazione. Queste sono le risorse migliori se vuoi approfondire uno qualsiasi degli argomenti sopra indicati e capire come funziona professionalmente il processo di localizzazione.

Alcuni link pertinenti sono inclusi alla fine di ogni sezione; tuttavia, puoi trovare molte altre risorse online.

Per proposte di cooperazione o informazioni aggiuntive, insegnamenti e migliori pratiche che abbiamo acquisito mantenendo il Programma di traduzione di ethereum.org, non esitare a contattarci all'indirizzo translations@ethereum.org.