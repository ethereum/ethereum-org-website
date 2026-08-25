---
title: "Atomi, istituzioni, blockchain"
description: "Josh Stark propone un nuovo framework per comprendere cosa siano le blockchain, introducendo il concetto di 'durezza' come proprietà condivisa che collega atomi, istituzioni e blockchain come materiali da costruzione della civiltà."
lang: it
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "how-ethereum-works"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atomi, istituzioni, blockchain"
---

Un keynote filosofico di **Josh Stark** della Fondazione Ethereum al Pragma Denver 2024, che propone un nuovo framework per comprendere le blockchain. L'intervento introduce il concetto di "durezza" (hardness) come proprietà condivisa che collega atomi, istituzioni e blockchain come materiali da costruzione della civiltà.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=zI07mqNdxzA) pubblicata da ETHGlobal. È stata leggermente modificata per facilitarne la lettura.*

#### Perché non riusciamo a spiegare le blockchain? (0:00) {#why-cant-we-explain-blockchains-000}

Ciao a tutti, grazie per essere qui al Pragma a Denver. Mi chiamo Josh. Lavoro presso la Fondazione Ethereum — sono con la EF da circa cinque anni ormai. Mi piace scherzare dicendo che il mio lavoro è capire quale dovrebbe essere il mio lavoro, e questo cambia ogni sei mesi.

Ho fatto molte cose diverse nella mia carriera nel settore cripto. Ho lavorato a uno dei primi portafogli Bitcoin. Ho costruito — beh, ho comprato — un bancomat Bitcoin a Toronto e l'ho gestito per circa un anno nel 2015. Nel 2017 ho co-fondato ETHGlobal, oltre a un'azienda chiamata L4 che lavorava sulle prime soluzioni di ridimensionamento layer 2 (l2). E nel corso degli anni ho scritto un sacco di post sul blog.

Nonostante tutto questo, non riuscivo ancora a spiegare davvero cosa stessimo facendo o perché. Avevo la sensazione che fosse molto importante, che avrebbe cambiato il mondo. Non fraintendetemi: posso parlare delle singole applicazioni. Possiamo spiegare Bitcoin, gli NFT, Uniswap, ENS. Tutte queste cose nei loro piccoli compartimenti stagni non sono così difficili da spiegare. Ma quando cerchiamo di parlare del quadro generale — cosa significa che c'è un'unica tecnologia che rende possibili tutte queste cose — iniziamo a inciampare. Facciamo ginnastica mentale, lanciando parole d'ordine alle persone, cercando di spiegare le cose.

Dobbiamo davvero arrivare al nocciolo della questione, e non credo che ci siamo così vicini. È un problema! Se possiamo parlare di queste singole applicazioni ma non riusciamo ad articolare cosa condividono, c'è qualcosa che ci sfugge. C'è un livello di spiegazione che non è ancora stato trovato, e penso che sia importante. La mia sensazione è che, una volta trovato, sembrerà ovvio.

Quindi tutto è iniziato con una domanda molto specifica che mi sono posto: qual è la tecnologia di uso generale? Qual è questa capacità fondamentale? E si è trasformato in qualcosa che trovo molto più interessante.

#### Claude Shannon e l'idea di informazione (4:00) {#claude-shannon-and-the-idea-of-information-400}

Lasciate che vi racconti una storia. Negli anni '30 e '40, Claude Shannon era circondato dagli albori di una nuova era. Ai Bell Labs, lavorò sui sistemi di controllo del fuoco e sulla crittografia durante la guerra, e iniziò a pensare a un approccio più generale all'informazione. All'inizio non la chiamava informazione: nel 1939 scrisse a un collega che stava pensando alla "trasmissione dell'intelligenza". La parola informazione aveva un significato diverso allora.

Nel 1948 pubblicò "The Mathematical Theory of Communications", un documento fondamentale che ha spianato la strada all'era dell'informazione. La cosa più importante per noi è che ha introdotto per la prima volta un'idea astratta di informazione: una definizione non legata alla musica, al parlato, alla letteratura o ai codici. Questo è il documento che ha introdotto il bit, l'unità irriducibile di informazione che si poteva misurare in qualsiasi contesto.

Prima di questo momento, nessuno aveva davvero questo concetto di informazione come una cosa universale e generale. Potrebbe sembrare folle ora: usiamo la tecnologia dell'informazione da migliaia di anni. È inestricabilmente legata a ciò che significa essere umani, usare la parola e il linguaggio. Ma non abbiamo dato un nome alla proprietà sottostante comune a tutte queste cose fino a tempi molto recenti.

Quello che voglio che traiate da questo è che c'è stato un tempo prima che avessimo l'idea di informazione e un tempo dopo. E se ci mancasse allo stesso modo qualcosa di così fondamentale? Questa è la mia ipotesi.

#### Tre indizi (7:00) {#three-clues-700}

Mentre fatico a spiegare le blockchain, continuo a imbattermi in queste cose strane che penso siano indizi verso qualcosa di più grande.

**Indizio numero uno**: descriviamo le blockchain sia come trustless che come affidabili (trustworthy). È strano. Nel white paper di Satoshi si parla di eliminare la necessità di fiducia. Ma nel white paper di Ethereum si parla di usare Ethereum per rendere le applicazioni più affidabili. L'Economist ha definito le blockchain una "macchina della fiducia". Intendiamo qualcosa di reale quando diciamo che le blockchain sono trustless, e intendiamo qualcosa di reale quando diciamo che sono affidabili. Il nostro linguaggio non si è ancora adeguato. Vale sempre la pena prestare attenzione a queste apparenti contraddizioni: a volte rivelano una lacuna nelle nostre astrazioni.

**Indizio numero due**: parliamo molto di come le blockchain siano diverse dalle istituzioni centralizzate (Bitcoin contro le banche centrali, ENS contro DNS). Ma raramente parliamo di ciò che hanno in comune. Possono essere sostituti l'una dell'altra. Se avete mai scambiato valuta fiat per Bitcoin, le avete sostituite a vicenda. Devono avere qualcosa in comune affinché questa sostituzione avvenga così regolarmente.

Con le automobili, parlavamo di "carrozze senza cavalli", ma almeno potevamo dare un nome a ciò che erano: veicoli. Con i registri digitali, parlavamo di mezzi "senza carta", ma conoscevamo la categoria: l'informazione. Sembra che abbiamo inventato una tecnologia prima di aver inventato la categoria a cui appartiene.

**Indizio numero tre**: il documento di Satoshi inizia con queste parole: "il commercio su Internet è arrivato a dipendere quasi esclusivamente dalle istituzioni finanziarie che fungono da terze parti fidate". Satoshi stava paragonando Bitcoin alle istituzioni, non ad altri software. C'è qualcosa sotto.

#### Introduzione alla durezza (11:00) {#introducing-hardness-1100}

Ecco la mia risposta a cosa va in quella scatola. La chiamo **durezza** (hardness). Ecco la storia in cinque semplici passaggi, e poi andremo più a fondo.

Primo: la nostra civiltà dipende da infrastrutture sociali come il denaro, la legge e tante altre cose, e queste devono essere affidabili. Devono comportarsi come ci aspettiamo che si comportino, almeno la maggior parte delle volte, per esserci utili. Altrimenti non faremmo affidamento su di esse: non diventerebbero una moneta.

Secondo: è molto difficile raggiungere quel livello necessario di affidabilità. Finora ci sono davvero solo tre modi in cui l'abbiamo mai fatto: usando gli atomi, usando le istituzioni e ora usando le blockchain.

Terzo: c'è una proprietà non riconosciuta comune a tutte e tre, che chiamo durezza. La durezza è la capacità, il potere, di permetterci di rendere il futuro più prevedibile nei modi davvero specifici che richiediamo per complessi giochi di coordinazione.

Quarto: queste tre fonti di durezza hanno ciascuna proprietà diverse che le rendono utili in contesti diversi.

E quinto: possiamo usarle insieme e sostituirle l'una con l'altra.

Il tasso di inflazione dell'oro è affidabile grazie alle proprietà fisiche del nostro pianeta: è duro come un atomo (atom-hard). Un contratto è affidabile perché le istituzioni verranno a prendersi le tue cose se non rispetti i tuoi impegni. Uno smart contract funzionerà perché è protetto da un protocollo crittoeconomico con miliardi di dollari in gioco.

Potete pensare ad atomi, istituzioni e blockchain come a materiali da costruzione: come legno, cemento e acciaio. Sono diversi, ma fanno parte di una categoria condivisa. E usiamo queste cose non per costruire edifici, ma per costruire una civiltà. Forse con materiali migliori, possiamo costruire una civiltà più grande, migliore e più forte di quella che abbiamo ora.

#### Cos'è la durezza? (14:00) {#what-is-hardness-1400}

Lasciatemi precisare meglio cosa intendo per durezza. Non si tratta di una qualsiasi affidabilità che qualsiasi cosa potrebbe avere. La durezza è un tipo specifico. La prima cosa da notare è che è un tipo di affidabilità che conta per la coordinazione sociale. Non solo, sapete, che questo tavolo è in modo affidabile un tavolo, ma che potete pagare l'affitto, che un contratto verrà fatto rispettare, che un'economia è forte. È a questo che serve la durezza.

E qual è esattamente il risultato? Purtroppo sto introducendo un'altra nuova parola qui, che chiamo il **cast**. Un cast è qualsiasi possibile stato futuro del mondo che viene reso certo o sicuro usando la durezza. Mi scuso per il gergo, ma il motivo per avere una parola qui è che non credo ne abbiamo una generalizzabile a tutte le fonti di durezza. È forse come il bit: abbiamo bisogno di un concetto di cui possiamo parlare in molti contesti diversi e passare da una fonte all'altra senza essere legati a una di esse.

Un cast relativo a un prestito sarebbe: se Alice non ripaga Bob, le istituzioni legali useranno minacce e azioni sempre più severe per costringerla a farlo. Questo cast è indurito usando la durezza istituzionale. Un cast sull'oro potrebbe essere che una certa quantità di oro entrerà nel mercato ogni anno per i prossimi 20 anni, reso affidabile dalle proprietà fisiche della nostra Terra. E un cast su Ethereum potrebbe essere la rivendicazione che gli asset possono essere trasferiti solo se si possiede la chiave privata corrispondente a una certa chiave pubblica, indurito dalla durezza della blockchain.

In pratica, di solito interagiamo con fasci di queste cose tutte intrecciate insieme. Se possedete dell'oro e lo tenete in una banca, vi importano molte cose: i cast sull'offerta di oro in futuro, i cast sulla resistenza del vault della banca, i cast sulla solidità dell'accordo legale tra voi e la vostra banca, i cast sull'affidabilità del sistema legale nel vostro paese che farebbe rispettare quelle regole se qualcosa andasse storto.

In secondo luogo, si può parlare della durezza come di una misura di sicurezza. È sempre misurabile in teoria, anche se è difficile da fare in pratica. Quanto è duro questo cast secondo cui una certa quantità di oro entrerà nel mercato ogni anno per i prossimi 20 anni? Un modo in cui potreste considerarlo è attraverso la probabilità: guardare tutti i dati e cercare di prevederne la verosimiglianza. Oppure potreste considerarlo dal punto di vista dei costi: quanto costerebbe a qualcuno rompere quel cast? Se siete uno stato nazione, potreste usare i poteri della guerra e della regolamentazione internazionale. Oppure potreste andare nella direzione opposta e prendere un asteroide dallo spazio con molto oro al suo interno, aggirando i limiti fisici della Terra. C'è un prezzo per rompere quasi ogni cast.

E infine, la durezza proviene da certe fonti: atomi, istituzioni e blockchain. Ognuna ha proprietà diverse che le rendono utili in contesti diversi.

Di questo framework mi piace che ci permette di porre domande più profonde: non solo parlare delle proprietà specifiche delle blockchain, ma confrontare tutte queste cose diverse e pensare a dove sono appropriate, come le usiamo e in quale combinazione.

#### Durezza degli atomi (19:00) {#atom-hardness-1900}

La durezza degli atomi riguarda quando troviamo affidabilità nella natura che ci circonda: atomi fisici letterali ma anche altre proprietà presenti in natura. Lo facciamo quando usiamo perline d'oro come denaro, quando usiamo strutture fisiche per definire i diritti di proprietà, o registriamo i diritti di proprietà in un oggetto fisico come un atto.

Ha molti vantaggi: applicazione automatica, stato condiviso, un insieme di regole universali. È molto conveniente per la civiltà umana che le regole della fisica si applichino ovunque allo stesso modo, almeno alle scale macroscopiche che ci interessano di più.

Ma ha dei punti deboli. Siamo limitati a ciò che possiamo trovare nel mondo. La durezza degli atomi è un po' come un architetto che vuole costruire una parete rocciosa nella propria casa: devi trovarne una che funzioni. Non puoi semplicemente creare una parete rocciosa. Puoi modificarla un po', ma fai affidamento sul trovare una caratteristica naturale che si adatti alle tue esigenze particolari.

Non possiamo darle nuove regole. Abbiamo l'oro, ma non possiamo chiedere all'universo di darci un nuovo tipo di oro con un'inflazione più bassa, una distribuzione geografica più equa, o magari risolvere il problema del peso. Non possiamo farlo. E ha una programmabilità molto limitata: ci sono solo certi tipi di cose indurite che si possono creare dalla durezza degli atomi, principalmente monete. Non si può creare un accordo matrimoniale con gli atomi. Serve qualcosa di più complesso, come un'istituzione, per farlo.

E i cast sono spesso minati dal nostro crescente controllo umano sulla natura. Usare le conchiglie come denaro va bene finché non si fa parte di un'economia globale che potrebbe sconvolgere radicalmente le aspettative sull'inflazione delle conchiglie, e improvvisamente la propria economia viene spazzata via. Usare l'oro come mezzo di scambio potrebbe affrontare lo stesso problema un giorno, se e quando potremo ottenere l'oro degli asteroidi e cambiare le nostre ipotesi sull'offerta.

Ma è più sottile di così. A volte abbiamo dei cast di cui non ci rendiamo nemmeno conto dell'esistenza, ma poi spariscono perché qualcosa è cambiato. C'è stato un cast duro sulla velocità di trading nei mercati finanziari per molto tempo: poteva essere fatto solo a un certo ritmo, forse il ritmo a cui qualcuno può gridare all'altro sul parterre. Questo cast era duro come un atomo: semplicemente non potevamo comunicare più velocemente di così. Ma la nuova tecnologia ha completamente minato quelle ipotesi. Ci siamo resi conto che in realtà ci piaceva una versione di quel vecchio cast e l'abbiamo ricreato a partire dalle istituzioni, introducendo regolamentazioni che limitano la velocità di trading e impongono interruttori di circuito (circuit breaker).

#### Durezza istituzionale (22:00) {#institutional-hardness-2200}

La durezza istituzionale è una categoria molto ampia: copre la maggior parte delle cose a cui potremmo pensare quando pensiamo alla civiltà. I nostri sistemi legali, le legislature, le forze di polizia, le corporazioni, tutto. Tutte le istituzioni che forniscono durezza di qualche tipo. Abbiamo creato cast che hanno dato ordine alle nostre società, punendo i comportamenti antisociali. Abbiamo creato la durezza come piattaforma, permettendo a chiunque di creare i propri cast resi duri dalle istituzioni se si seguono certe regole. Abbiamo creato cast che hanno generato nuovi asset e fornito fonti di credito alle economie in crescita.

La durezza istituzionale ha molti vantaggi. È molto programmabile: gli esseri umani raggruppati in organizzazioni possono ricevere istruzioni davvero complesse o sottili. Questo è uno spazio di progettazione molto ampio di possibili cast. E sono fatte di persone, e le persone sono buone. Forse è un bene che a volte qualcuno possa intervenire e dire: "Non ho intenzione di farlo rispettare perché penso che sia sbagliato". È un bene che forse a volte ci sia una falla nel sistema affinché qualcuno possa essere un informatore (whistleblower) o un ribelle.

Ma ha anche molti punti deboli. È limitata dai confini: solo in certi paesi si ha davvero accesso a istituzioni che fanno rispettare lo stato di diritto. È esposta al fallimento politico o statale: se il vostro governo semplicemente non riesce a mettersi d'accordo sulle cose, o venite invasi da una nazione belligerante, certe istituzioni su cui fate affidamento per il denaro o i contratti potrebbero semplicemente crollare. Spesso sono opache: è difficile dire se un'istituzione è davvero dura o meno finché qualcosa non va storto. Hanno un alto costo di avvio: non possiamo semplicemente creare facilmente nuove istituzioni su scala della Fed o del sistema legale per iterare su di esse. Siamo un po' bloccati con quelle che abbiamo.

E sono fatte di persone, e le persone sono cattive. La realtà in questo paese e in molti altri è che molte persone non hanno davvero avuto accesso alla durezza fornita dalle istituzioni. Non sono riuscite a ottenere un mutuo. Non sono riuscite ad aprire un conto in banca. Perché quando si riempie un'istituzione di persone, questa è soggetta ai loro mali, ai loro pregiudizi, alle loro ideologie. E la nostra dipendenza dalla durezza istituzionale sta solo aumentando. Il problema del software che divora il mondo è che la maggior parte del software è in realtà solo costituito da un'istituzione dietro lo schermo, e di conseguenza stiamo dando loro sempre più potere.

#### Durezza della blockchain (24:20) {#blockchain-hardness-2420}

L'invenzione di Satoshi era ovviamente più del solo Bitcoin: era il nucleo di una tecnica di uso generale per creare durezza digitale in un ambiente digitale. Ha molti punti di forza: accesso globale universale, è fatta di software e chiunque può scrivere software, il grado di durezza può essere trasparente e verificabile, basso costo di avvio, facile da iterare, ed è protetta da incentivi di mercato (e i mercati sono razionali).

Ma ha anche dei punti deboli. Richiede una civiltà tecnologica: non avremmo potuto avere le blockchain prima di adesso a causa dei requisiti, e una civiltà nel futuro che non ha ciò che abbiamo noi non sarà in grado di usarle a sua volta. È fatta di software, e il software può essere scritto male. L'ambito dei cast è limitato agli ambienti onchain. Ed è protetta da incentivi di mercato (e i mercati sono irrazionali).

#### Perché questo è importante (25:10) {#why-this-matters-2510}

Quindi cosa significa questo? Cosa ci offre? Perché è più di un semplice interesse accademico?

Molte cose iniziano ad avere molto più senso se viste attraverso questa lente. Una è la domanda da cui siamo partiti: perché diciamo che le blockchain sono sia trustless che affidabili? La spiegazione è questa: quando diciamo che le blockchain sono trustless, ciò che intendiamo veramente è che la loro durezza non dipende da una persona o da un'istituzione. E quando diciamo che sono affidabili, intendiamo semplicemente che hanno una durezza, solo di un tipo diverso. La nostra incapacità di fare questa distinzione è ciò che causa questo linguaggio confuso.

Spiega perché le blockchain private o centralizzate non sono interessanti. Una blockchain che non è decentralizzata collassa semplicemente tornando a essere un'istituzione. Se è controllata da tre banche o da una manciata di validatori tutti finanziati dalla stessa organizzazione, allora è solo una EVM protetta dalla durezza istituzionale. La cosa più interessante delle blockchain non è la EVM: è che c'è una diversa fonte di durezza che non è correlata o soggetta agli stessi fallimenti e limitazioni delle istituzioni. Ecco perché è diversa. Ecco perché è importante.

Aiuta anche a comprendere lo spettro delle possibilità e le ideologie predefinite in cui le persone ricadono nello spazio blockchain. Molte persone sono molto concentrate sull'uso della durezza della blockchain per competere con o sostituire la durezza istituzionale: è di questo che si occupa gran parte della comunità Bitcoin, di cui si occupa gran parte della finanza decentralizzata (DeFi). Anche ENS sta cercando di sostituire o competere con DNS in qualche modo. Ma poi ci sono anche persone che vedono che la durezza della blockchain può fare cose che la durezza istituzionale non può fare: idee che nessuno ha mai provato prima perché non abbiamo mai avuto questa capacità, questo particolare sapore di durezza. E ora possiamo esplorare quelle cose. Forse gli NFT sono lì, o giochi come Dark Forest, o il movimento attorno ai mondi autonomi.

#### Alzare le nostre ambizioni (27:00) {#raising-our-ambitions-2700}

Ancora più importante, penso che questo framework alzi le nostre ambizioni. Personalmente, questo è ciò che conta per me, e forse risuona con voi: non sono qui solo per queste singole applicazioni. Non sono uno che è davvero tutto per Bitcoin o tutto per la DeFi o tutto per gli NFT. Forse siete così anche voi. C'è qualcosa di più grande in corso qui.

Possiamo onestamente puntare più in alto del denaro. Possiamo puntare più in alto della finanza. C'è un quadro molto più ampio. Penso che questo aiuti effettivamente a definire una visione che sembri adeguata in scala alle sfide che affrontiamo e alle opportunità che le blockchain offrono.

La missione non è solo sostituire la Fed. La missione è migliorare ed espandere i materiali stessi che abbiamo usato per costruire la nostra civiltà: abbassare il costo di questi strumenti in modo che tutti sulla Terra vi abbiano accesso, per permettere che avvengano più cambiamenti. E a proposito, quel costo si abbasserà presto.

Per aiutare l'umanità a continuare a giocare a questo gioco infinito permettendo a più persone di cambiare le regole. Pochissime persone possono promulgare una legge, ma chiunque può scrivere uno smart contract. Stiamo espandendo quella capacità.

Penso che molte persone in molti paesi diversi e con molte ideologie sentano che siamo bloccati: che le regole del gioco non sono più quelle che dovrebbero essere, ma siamo impotenti nel cambiarle. Siamo bloccati in tanti modi in questo massimo locale, e intuiamo che è sbagliato. Le blockchain non risolvono questo problema, ma penso che possano aiutare. Aprono un nuovo spazio per la sperimentazione. Permettono a più persone di cambiare le regole, scrivere nuove regole, contribuire a quel gioco infinito. Non possiamo scrivere leggi, ma possiamo scrivere uno smart contract.

Voglio concludere con questa nota: se avete già visto interventi di persone della EF, sapete che siamo affezionati al libro *Finite and Infinite Games* (Giochi finiti e infiniti). Una delle massime di questo libro è che solo ciò che può cambiare può continuare. Non possiamo rimanere bloccati in questo massimo locale. Dobbiamo cambiare le cose. E penso che le blockchain ci aiutino a farlo. Grazie mille.