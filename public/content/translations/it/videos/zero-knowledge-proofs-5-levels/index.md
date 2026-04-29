---
title: "Le prove a conoscenza zero spiegate in 5 livelli di difficoltà"
description: "Un informatico spiega le prove a conoscenza zero a cinque diversi livelli di complessità, da un bambino a un esperto."
lang: it
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-e-sicurezza"
  - "prove-a-conoscenza-zero"
  - "crittografia"
format: explainer
author: WIRED
breadcrumb: "Prove a conoscenza zero"
---

L'informatico **Amit Sahai**, professore presso la UCLA Samueli School of Engineering, spiega le prove a conoscenza zero a cinque livelli di complessità, da un bambino a un esperto, in questa produzione di **WIRED**. Il concetto viene dimostrato attraverso analogie fisiche e discusso con una profondità tecnica crescente, rendendo accessibile a tutti uno dei concetti più importanti della crittografia.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=fOGdb1CTu5c) pubblicata da WIRED. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

**Amit Sahai:** Ciao, mi chiamo Amit Sahai e sono un professore di informatica alla UCLA Samueli School of Engineering. Oggi mi è stato chiesto di spiegare le prove a conoscenza zero in cinque livelli di complessità crescente.

Una prova a conoscenza zero è un modo per un prover di convincere un verificatore che una certa affermazione è vera, senza tuttavia rivelare alcuna informazione aggiuntiva oltre al fatto che l'affermazione sia vera. Le prove a conoscenza zero vengono utilizzate nelle blockchain e nelle criptovalute. I crittografi sono entusiasti della conoscenza zero per le sue incredibili proprietà matematiche, ma anche per la sua incredibile applicabilità a tantissimi scenari diversi.

#### Livello 1: bambino (0:41) {#level-1-child-041}

**Amit Sahai:** Qual è la tua materia preferita?

**Chelsea:** Direi la matematica. Alcuni dei problemi piccoli possono in realtà essere molto grandi e complicati. È come un puzzle.

**Amit Sahai:** Amo la matematica per lo stesso motivo. Oggi ti parlerò di una cosa chiamata prova a conoscenza zero. In una prova a conoscenza zero, ci sono due persone: c'è un prover e un verificatore. Voglio dimostrarti che qualcosa è vero, ma la cosa strana è che voglio dimostrarti che è vero senza dirti il perché. Ricordo che quando ne ho sentito parlare per la prima volta, ho pensato: aspetta, cosa? Com'è possibile?

Quindi, cosa vedi in questa foto?

**Chelsea:** Un sacco di pinguini.

**Amit Sahai:** Sì. Nascosto tra tutti questi pinguini c'è una pulcinella di mare. Vuoi provare a cercarla? Vedi dov'è? Io so dov'è, ma non voglio dirtelo. Mi credi?

**Chelsea:** Sì.

**Amit Sahai:** Ma cosa succederebbe se potessi dimostrarti che so dov'è la pulcinella di mare senza rivelarti la sua posizione? Lascia che ti mostri. Ho preso quella foto e l'ho messa dietro questo poster qui. Perché non dai un'occhiata attraverso quel buco?

**Chelsea:** Vedo la pulcinella di mare.

**Amit Sahai:** Quindi, quando guardi questo tabellone, non sappiamo dove fosse la foto, giusto? La foto aveva l'angolo qui, nel qual caso la pulcinella di mare sarebbe tutta da questa parte? O la foto aveva l'angolo qui, nel qual caso la pulcinella di mare sarebbe dall'altra parte? Questo è un esempio molto semplice di prova a conoscenza zero. Ti ho convinto che sapevo dov'era la pulcinella di mare, ma non hai imparato nient'altro.

**Chelsea:** Perché studi le prove a conoscenza zero?

**Amit Sahai:** Quando le ho scoperte per la prima volta, ho pensato che fossero fantastiche. Ma si scopre che sono anche molto utili, non solo per trovare le pulcinelle di mare. Se digiti semplicemente la tua password e l'hacker si intrufola nel computer, può semplicemente rubartela. E se invece potessimo in qualche modo usare una prova a conoscenza zero per fare il log in? Saresti in grado di dimostrare che sei Chelsea, senza rivelare loro nulla. Se potessi farlo, sarebbe fantastico, perché anche se l'hacker violasse il computer, non imparerebbe nulla, perché nemmeno il computer impara nulla.

Quindi Chelsea, con parole tue, cos'è una prova a conoscenza zero?

**Chelsea:** La prova a conoscenza zero è la prova di un'affermazione. Non mostri loro il perché o il cosa. Mostri solo un piccolo segmento, o fai una specie di strano trucco di magia che non è un vero trucco di magia, e loro si convinceranno. E non hai mostrato loro il perché, o niente del genere.

#### Livello 2: adolescente (3:31) {#level-2-teen-331}

**Amit Sahai:** Quindi, hai mai sentito il termine prova a conoscenza zero prima d'ora?

**Teen:** No, mai.

**Amit Sahai:** È un modo per un prover di convincere un verificatore che qualcosa è vero senza rivelare nulla sul perché sia vero, il che suona del tutto bizzarro. Quello che voglio fare è dimostrarti che conosco questa combinazione senza rivelartela. E quello che potresti fare è scrivere un piccolo biglietto, un segreto che sicuramente non conoscerei. Piegalo, infilalo qui dentro. E poi, se conosco la combinazione, dovrei essere in grado di aprirlo e dirti cosa hai scritto.

Va bene. "Il mio cane si chiama Doug."

**Teen:** Hai capito qual era la combinazione?

**Amit Sahai:** No. Quindi in nessun momento di questa interazione hai visto informazioni che non conoscessi già. Eppure ti ho convinto che conosco la combinazione.

**Teen:** Quindi qual è lo scopo esatto di una prova a conoscenza zero? È come dimostrare qualcosa ma senza fornire informazioni sufficienti che potrebbero mettere in pericolo ciò che stai dimostrando?

**Amit Sahai:** Le persone non si fidano l'una dell'altra. E se fossi in grado di dimostrare a qualcuno di aver fatto qualcosa correttamente senza dover rivelare i miei segreti, allora quella persona si fiderebbe di più di me.

**Teen:** Come si collega questo alla tecnologia informatica? È un'interazione di persona?

**Amit Sahai:** Supponiamo che tu voglia scambiare messaggi con qualcuno che conosci. Probabilmente prima vi incontrereste e inventereste un codice segreto, giusto? E poi vi scrivereste messaggi in quel codice. Ma cosa succede se non hai mai incontrato quella persona prima? E se volessi scambiare messaggi segreti con me e non ci fossimo mai incontrati prima? Come potremmo mai farlo?

**Teen:** Non ne ho idea.

**Amit Sahai:** Sembra impossibile, vero? Ma non lo è. Non useresti un lucchetto fisico o una scatola fisica. Useremmo invece la matematica per fare questo genere di cose. Potresti prendere un messaggio e applicare la cifratura usando la matematica. E poi potrei dimostrarti che conosco la chiave, aprirlo e rimandartelo. In questo modo ti dimostrerei che conosco la chiave matematica della cassetta di sicurezza matematica.

Quindi, in base a ciò di cui abbiamo discusso oggi, con parole tue, cos'è una prova a conoscenza zero?

**Teen:** È come se avessi questo segreto davvero importante che vuoi che qualcuno conosca, ma non vuoi dirgli tutto. Puoi usare una prova a conoscenza zero per dimostrargli quel segreto, ma senza svelarlo tutto.

#### Livello 3: studente universitario (6:13) {#level-3-college-student-613}

**Amit Sahai:** Cosa studi?

**College Student:** Sono uno studente del primo anno di informatica alla USC Viterbi. Mi interesso a tutto ciò che riguarda dati, internet, blockchain e criptovaluta.

**Amit Sahai:** Hai mai sentito parlare delle prove a conoscenza zero?

**College Student:** Solo di sfuggita.

**Amit Sahai:** In realtà, lo spazio della blockchain è uno degli ambiti in cui stiamo vedendo implementate le prove a conoscenza zero, e penso che sia solo l'inizio. Fondamentalmente, una prova a conoscenza zero è un'interazione tra due persone. Dovrei essere in grado di convincerti che una certa affermazione è vera, ma non avrai alcuna idea del perché sia vera.

Il modo in cui affronteremo la questione è attraverso qualcosa chiamato NP-completezza. Un problema NP-completo è un problema davvero difficile da risolvere. Ma se riesci a risolverlo, puoi risolvere qualsiasi problema che si trova nella classe NP, e questo include un vasto numero di problemi. Useremo un problema NP-completo per dimostrare un'incredibile varietà di affermazioni attraverso una prova a conoscenza zero. Il problema NP-completo specifico che esamineremo si chiama tricolorazione delle mappe.

Qui abbiamo una mappa con un gruppo di paesi, disposti in modo che nessun paese con lo stesso colore condivida un confine. È questo che rende una mappa del genere colorata in modo valido. Si scopre che la possibilità o meno di tricolorare una mappa in questo modo è un esempio di problema NP-completo.

Forse quello che vuoi davvero fare è fornire una prova a conoscenza zero di possedere almeno 0,3 Bitcoin, senza rivelare l'indirizzo del tuo account. Si scopre che posso prendere quell'affermazione e convertirla in una mappa di paesi. Quella mappa di paesi sarà tricolorabile solo se possiedi almeno 0,2 Bitcoin.

**College Student:** Come potremmo trasformare una cosa del genere in una prova a conoscenza zero?

**Amit Sahai:** Naturalmente, il primo passo è cancellare tutti i colori. Ho inserito un colore all'interno di ciascuna di queste buste. Ora, come fai a sapere che è una colorazione valida? Non lo sai. Devi scegliere due paesi confinanti qualsiasi: puoi sceglierli come preferisci, a caso.

**College Student:** Posso prendere questi due?

**Amit Sahai:** Qui abbiamo il verde, e qui abbiamo il blu. Come puoi vedere, sono due colori diversi. Quindi hai un po' di fiducia nel fatto che io sia riuscito a colorarlo correttamente, ma non così tanta fiducia, perché ti ho mostrato solo due dei paesi. Un modo per ottenere maggiore fiducia è aprirne di più, ma questo significherebbe rivelarti delle informazioni. Non voglio farlo.

Quindi, invece, ti chiederò per favore di voltarti. E ora, cambiamo questi colori.

Puoi scegliere due paesi a caso, e riveleremo di nuovo due dei colori.

**College Student:** Prenderò questo e questo.

**Amit Sahai:** È intelligente da parte tua controllare con lo stesso che avevi già. Ma come vedrai, ora non è verde: è blu. E questo, d'altra parte, è verde. I colori che ti ho mostrato l'ultima volta non funzionano con questi nuovi colori. Ma funziona per questa colorazione che ti sto mostrando in questo momento. Quindi quello che abbiamo fatto è renderti impossibile mettere insieme i pezzi. E se lo fai mille volte, e io ti mostro correttamente colori diversi ogni volta, saresti davvero convinto. E questo è quanto: questa è l'intera prova a conoscenza zero.

**College Student:** Quindi è come una prova probabilistica?

**Amit Sahai:** Sì. Nelle implementazioni reali non useremmo le buste: useresti la cifratura. Ma questo è il protocollo.

**College Student:** Quindi quali sono le implicazioni più ampie delle prove a conoscenza zero? Dovrebbero essere più pratiche per l'implementazione o dovrebbero dimostrare qualcosa a livello strutturale?

**Amit Sahai:** Non si tratta di rendere qualcosa più efficiente. Si tratta di fare cose che prima semplicemente non sapevamo come fare. Posso effettivamente dimostrarti, senza rivelare nessuno dei miei segreti, che mi sto comportando onestamente. Potrei dimostrarti di aver firmato correttamente un documento cifrato senza rivelare quale fosse quel documento segreto. Quella capacità di cambiare le carte in tavola, di cambiare davvero ciò che possiamo fare, è ciò che la conoscenza zero porta con sé.

**College Student:** Dove pensi che potremmo costruire più fiducia usando le prove a conoscenza zero?

**Amit Sahai:** Un ottimo esempio sono le elezioni. Se potessi dimostrare che un'elezione è stata condotta correttamente (che ogni voto è stato contato e che tutto ha portato alla vittoria di una persona con un determinato totale) a conoscenza zero, allora non devi rinunciare ai voti effettivi di nessuna persona. Eppure tutti potrebbero vedere che è stato fatto correttamente.

#### Livello 4: dottorando (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** È fantastico averti qui e parlare con te, Eli. Puoi parlarmi un po' della tua ricerca?

**Eli:** La mia ricerca riguarda la crittografia. Nello specifico, sto lavorando su alcuni protocolli di calcolo multi-partecipante (multi-party computation). Quello su cui sto lavorando in questo momento è un sistema per il calcolo di statistiche aggregate, in modo che i fornitori di servizi come Google Chrome o Tesla possano raccogliere quelle statistiche senza apprendere nulla sui dati dei singoli utenti. Io, come utente, non devo far sapere a Firefox che il mio sito web preferito è mylittlepony.com. Ma loro possono sapere quanti utenti visitano mylittlepony.com ogni giorno.

**Amit Sahai:** È fantastico. Il calcolo multi-partecipante mi sta molto a cuore. Ovviamente, le prove a conoscenza zero riguardano il dimostrare cose a un'altra persona senza rivelare i dettagli di ciò che si sta dimostrando. Ma nella mia mente, la conoscenza zero in realtà va ancora oltre. È questo concetto generale che si può vedere molto nel calcolo multi-partecipante, in cui si desidera portare a termine un compito senza rivelare nulla di più di ciò che è esattamente necessario per portarlo a termine.

**Eli:** Esatto, e ti consente di dimostrare che ti sei comportato onestamente, senza rivelare nessuno dei segreti coinvolti che usi per comportarti effettivamente in modo onesto. Sappiamo che le prove a conoscenza zero per i linguaggi NP-completi svolgono un ruolo così importante nella crittografia. Com'è stata la tua prima esperienza con la NP-completezza?

**Amit Sahai:** Il mio primo incontro è avvenuto nella mia primissima lezione di algoritmi come studente universitario. Un linguaggio NP-completo è questo incredibile problema che non solo ti parla di se stesso, ma risolvere questo problema può in realtà parlarti di un'intera classe di problemi davvero interessanti.

**Eli:** Quando hai iniziato a pensare alle prove come a un gioco interattivo in cui parliamo tra di noi, questo ha reso possibile la conoscenza zero?

**Amit Sahai:** Assolutamente. E l'idea che la casualità potesse essere utile per dimostrare qualcosa, di nuovo, sembra così controintuitiva se pensiamo all'ideale platonico di una prova. Non c'è casualità, nessun non-determinismo presente lì.

**Eli:** Ha a che fare con l'intera idea di capovolgere una prova. In una vecchia prova classica, la casualità è specificamente contraria all'obiettivo di ciò che stai cercando di fare, perché stai cercando di rendere tutto ovvio e rivelare il flusso di informazioni. Ma una volta che capovolgi la situazione e non cerchi più di farlo, improvvisamente tutte le cattive proprietà della casualità diventano buone.

**Amit Sahai:** Esattamente. Il caso è imprevedibile, ed è quello che vogliamo. Vogliamo che quell'imprevedibilità nasconda effettivamente le informazioni che vogliamo nascondere. Come hai usato la conoscenza zero nei progetti a cui hai lavorato? Quali sono le sfide che incontri?

**Eli:** Di solito la parte più difficile è capire esattamente quale sia il posto migliore in cui usarla. Ho scritto alcuni articoli che hanno utilizzato la conoscenza zero in un modo più teorico, ma quando si tratta di applicazioni, alcune delle applicazioni più entusiasmanti che ho visto finora sono state nello spazio della blockchain.

**Amit Sahai:** Quali sono alcuni dei colli di bottiglia dell'efficienza?

**Eli:** Una delle cose più belle delle prove a conoscenza zero è che ce ne sono di tantissimi tipi: mi piace chiamarli gusti. In generale, quando si utilizzano le prove a conoscenza zero in un'applicazione, il collo di bottiglia principale tende a risiedere nel prover.

**Amit Sahai:** Puoi prendere il lavoro del prover e dividerlo in molti calcoli paralleli?

**Eli:** È una domanda molto divertente. Penso che come settore non conosciamo ancora la risposta. Una delle cose più belle che ho visto negli ultimi tre o quattro anni è la transizione dal teorico all'applicato: vedere tutti questi incredibili sistemi a cui le persone hanno pensato negli ultimi 30 anni iniziare a diventare effettivamente abbastanza efficienti da essere realizzati.

**Amit Sahai:** Senza dubbio. E specialmente con il cloud computing: sfruttare la potenza del cloud per abilitare le prove a conoscenza zero sarebbe fantastico. Anche nello spazio della blockchain, se si vuole accelerare la generazione di prove, se potesse essere fatto in modo distribuito, sarebbe fantastico. Una delle speranze che ho è che il potere del calcolo multi-partecipante consista nel riunire persone che diffidano reciprocamente. Possiamo prendere quel potere nella crittografia e usarlo per aiutare con l'enorme livello di sfiducia che esiste nella società in questo momento?

**Eli:** Penso che sia uno dei motivi per cui sono stato così attratto dal calcolo multi-partecipante. Uno dei problemi più importanti al mondo è il fatto che così tante persone non si fidano l'una dell'altra. Essere in grado di usare la matematica per creare una tecnologia che consenta alle persone di lavorare insieme senza doversi fidare l'una dell'altra è una missione davvero fantastica e incredibile.

#### Livello 5: esperto (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, è così bello rivederti. Penso che l'ultima volta che ci siamo incontrati sia stato nel 2017 o giù di lì.

**Shang-Hua:** Penso che ci siamo sentiti su Zoom una volta durante la pandemia, ma è bello vederti di persona. In realtà, nell'86 stavo seguendo un corso di crittografia con il professor Leonard Adleman, la A di RSA. Mi assegnò l'articolo di Goldwasser, Micali e Charlie Rackoff sulla prova a conoscenza zero. Quindi quella è stata in effetti la primissima presentazione, in assoluto, in questo paese: sulla conoscenza zero.

**Amit Sahai:** È fantastico. È un concetto quasi ipnotico.

**Shang-Hua:** È anche interessante come formulare matematicamente quei concetti. Ad esempio, abbiamo i dati. Alla fine dai dati, attraverso il data mining, puoi ottenere informazioni. E poi hai questa parola chiamata "conoscenza". La conoscenza è stata a lungo dibattuta anche in filosofia. Cos'è la conoscenza? Ma ecco un modo molto affascinante in cui matematici o informatici vogliono catturare questa conoscenza. Non diceva "prova a zero informazioni". Quindi qual è la tua opinione sul perché "conoscenza" piuttosto che "informazione" o "prova a zero dati"? Chiaramente ci sono dei dati, quindi non può essere a zero dati.

**Amit Sahai:** Assolutamente. Non credo che abbiamo ancora una risposta completamente soddisfacente a questa domanda. Quella che è stata un'intuizione così bella è l'idea che la conoscenza zero sia qualcosa che puoi già prevedere. Se puoi già prevedere la risposta, allora non devi acquisire alcuna conoscenza da quell'interazione. Questa intuizione (di essere in grado di prevedere il futuro in modo accurato e che ciò sia la prova di una mancanza di nuova conoscenza) è stata un'intuizione così bella e sorprendente.

**Shang-Hua:** Beh, non ci sono zero informazioni qui. Fondamentalmente, da una prospettiva di calcolo e sicurezza, ciò che conta è quanta conoscenza stai acquisendo, più di quante informazioni hai acquisito e quanti dati hai. I dati non implicano immediatamente la conoscenza. Ma le persone non riescono sempre a distinguere.

**Amit Sahai:** Giusto. Ad esempio, nella ricerca medica: quanto sarebbe fantastico avere un farmaco e dimostrare che funziona in questo modello, senza dover rivelare la struttura del composto?

**Shang-Hua:** Quali diresti che sono le prossime direzioni in questo spazio?

**Amit Sahai:** Questo concetto di programmi a conoscenza zero ti consentirebbe di eseguire calcoli completamente arbitrari in un modo a conoscenza zero, senza alcuna interazione. Posso semplicemente prendere il programma, convertirlo in un programma a conoscenza zero (o un programma offuscato) e poi semplicemente inviartelo. Puoi eseguirlo e trarre vantaggio da quel calcolo senza dovermi più parlare.

**Shang-Hua:** Esatto. C'è una natura non interattiva. Ma c'è verificabilità in essa. Nella blockchain, hanno anche iniziato a incorporare una prova a conoscenza zero più generale nel registro (ledger).

**Amit Sahai:** Siamo decisamente in questo momento in cui la conoscenza zero verrà utilizzata sempre di più. Ci sono così tante conferenze e incontri nello spazio della conoscenza zero a cui tu e io non siamo invitati, perché è per le persone che stanno sviluppando, le persone che stanno programmando, non noi matematici. E penso che sia un segno. È un segno che il nostro bambino è cresciuto ed è ora che venga sviluppato.

**Shang-Hua:** Penso profondamente che gli studenti mi chiedano spesso quali siano le direzioni future: sia in termini di cripto, prova a conoscenza zero, nel mondo reale e nel calcolo matematico.

**Amit Sahai:** È un'ottima domanda. Vorrei poter vedere il futuro. Non posso, ma fammi provare. Penso che abbiamo fatto così tanto nella crittografia negli ultimi decenni, ma capiamo così poco. L'aspetto più fondamentale è comprendere la difficoltà: come otteniamo problemi difficili? Come costruiamo effettivamente problemi matematicamente difficili in modo da poterli poi utilizzare per costruire programmi e prove a conoscenza zero efficienti?

**Shang-Hua:** Immagino anche che, nell'informatica quantistica, siano necessari problemi ancora più difficili.

**Amit Sahai:** Infatti. Ora che abbiamo lo spettro dell'informatica quantistica che si avvicina, sappiamo tutti che i computer quantistici possono violare molti sistemi crittografici. È una sfida profonda. Quindi possiamo trovare nuove fonti di difficoltà che siano resistenti ai quanti, che nemmeno i computer quantistici possano violare? È qualcosa a cui sto lavorando negli ultimi anni.

**Shang-Hua:** Ma sono sicuro che motiveranno una bellissima matematica.

**Amit Sahai:** Sì, esatto. Una delle cose fantastiche del mondo reale è che le persone nel mondo reale hanno delle esigenze. E quelle esigenze spesso sembrano impossibili. Ed è qui che entriamo in gioco noi: è nostro compito rendere possibile l'impossibile.