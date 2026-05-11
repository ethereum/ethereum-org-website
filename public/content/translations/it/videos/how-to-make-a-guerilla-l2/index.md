---
title: "Come creare un layer 2 (l2) di guerriglia"
description: "Fatemeh Fannizadeh e Melanie Premsyl parlano della costruzione di reti layer 2 (l2) come strumenti per la privacy, la libertà e la resistenza, reimmaginando l'infrastruttura della blockchain attraverso una lente cypherpunk e attivista."
lang: it
youtubeId: "WlsICV2OPAE"
uploadDate: 2025-11-23
duration: "0:15:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "scaling-and-layer-2"
  - "privacy"
  - "layer-2"
format: interview
author: Web3Privacy Now
breadcrumb: "Layer 2 (l2) di guerriglia"
---

**Fatemeh Fannizadeh** e **Melanie Premsyl** presentano all'Ethereum Cypherpunk Congress (ECC#2) a Buenos Aires la costruzione di reti layer 2 (l2) come strumenti per la privacy, la libertà e la resistenza, reimmaginando l'infrastruttura della blockchain attraverso una lente cypherpunk e attivista, con un'analisi approfondita dell'intersezione tra la filosofia anarchica e l'architettura della blockchain.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=WlsICV2OPAE) pubblicata da Web3Privacy Now. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione e filosofia anarchica (0:05) {#introduction-and-anarchist-philosophy-005}

**Fatemeh Fannizadeh:** [Applausi] Bene, grazie per essere qui. So che Vitalik sta parlando ora. È davvero un onore avere alcuni di voi qui e non in fila per il matcha laggiù. Oggi faremo una conversazione sui layer 2 (l2) di guerriglia, e penso che ci arriveremo, ma vi presento Melanie Premsyl, filosofa e anarchica francese, che ci fa l'onore di unirsi a noi qui. Vuoi fare una piccola presentazione di te stessa?

**Melanie Premsyl:** Sì. Ciao a tutti. Sono una filosofa francese. Studio l'anarchia e la tecnologia, e all'inizio ero più dalla parte del territorio. Come nel centro della Francia, per esempio, non so se conoscete Tarnac, o tutti quei tipi di gruppi che sono più violenti. Il problema principale che ho riscontrato è stato che abbiamo bisogno di essere collegati con altre persone nel mondo, e molti gruppi anarchici sono molto limitati. Abbiamo bisogno di un modo per comunicare con più persone dall'America o dal Sud America. Ed è per questo che ora stiamo cercando di creare un ponte con le cripto e con tutti coloro che stanno cercando di trovare nuovi modi per combattere contro la mancanza di privacy, la mancanza di libertà e la violenza dello Stato.

#### Il processo ai fratelli MEV (1:52) {#the-mev-brothers-trial-152}

**Fatemeh Fannizadeh:** Incredibile. Quindi, in pratica, ci siamo incontrate un paio di settimane fa a New York. Entrambe stavamo assistendo a un processo che si stava svolgendo a Manhattan in cui questi due fratelli, noti come i fratelli MEV, erano sotto processo perché avevano fatto un attacco sandwich ad alcuni bot sandwich. Sono andata in tribunale per assistere al processo e ho visto questa persona qui che leggeva Spinoza in francese, ed ero davvero curiosa di sapere cosa stesse succedendo. Non c'era nessuno tra il pubblico tranne noi due! Quindi mi sono davvero incuriosita su cosa ti avesse spinto, prima di tutto come anarchica e filosofa piuttosto che come tecnologa, a venire ad assistere a questo specifico processo, ma anche a riflettere sulla governance di Ethereum e sull'intero sistema di validazione e sul processo che si stava svolgendo a New York. 

**Melanie Premsyl:** Penso che stessi solo cercando di capire se c'è un modo in cui gli Stati Uniti stanno cercando di controllare Ethereum. Perché in Europa siamo molto fuori dai giochi con le cripto, nel senso che non abbiamo una legislazione, e stavo solo controllando. 

**Fatemeh Fannizadeh:** Quindi pensi che gli Stati Uniti stiano cercando di controllare Ethereum? 

**Melanie Premsyl:** Penso che sia una grande domanda. Penso che gli Stati Uniti stiano cercando di controllare tutti. 

**Fatemeh Fannizadeh:** Ok. Sì, mi sembra giusto. Quindi, per coloro che non hanno seguito il processo, dopo circa tre o quattro settimane, è stato annullato. La giuria non è riuscita a raggiungere un verdetto unanime e a decidere se questi due fratelli fossero colpevoli o meno di aver violato le regole della blockchain, il che è un risultato in qualche modo positivo, credo, per le cripto, ovvero che un tribunale o una giuria non decida cosa sia giusto e cosa sia sbagliato onchain. 

#### Creare un ponte tra la blockchain e altre comunità (4:06) {#bridging-blockchain-with-other-communities-406}

**Fatemeh Fannizadeh:** Ma ok, se facciamo un passo indietro riguardo a quello che hai detto sugli anarchici che guardano a questa tecnologia per creare fondamentalmente un ponte tra gruppi diversi. 

**Melanie Premsyl:** Sì. Quindi penso di essere qui solo per uno scopo. Non sono una ragazza tech, o non faccio parte del gioco delle cripto, ma quello che stavo osservando da un altro punto di vista è che la blockchain ha un potere davvero dirompente ma non è in grado di raggiungere altre comunità che sono più territorializzate. Penso che uno degli scopi sia creare una blockchain colorata, come il motivo per cui vogliamo parlare dei layer 2 (l2), come creare nuove comunità con altri background, con altra immaginazione e immaginari.

**Fatemeh Fannizadeh:** Voglio dire, è davvero fantastico per me averti qui a Devconnect, ad essere onesta, perché porti questo tipo di prospettiva fresca su questa comunità, su quello che stiamo facendo e sui nostri eventi. Ieri abbiamo passato molto tempo a saltare da un evento all'altro e ho ricevuto il tuo feedback, qualcosa che non sono più in grado di vedere, perché abbiamo a che fare con questo teatro, fondamentalmente, da molti anni. Siamo tutti amici, quindi siamo tutti molto gentili l'uno con l'altro. Ma questa prospettiva critica è fantastica. Penso che possiamo trarne beneficio, soprattutto perché mi sono davvero entusiasmata nel vedere che gli anarchici o forse le persone più di sinistra sono in realtà ancora interessati alla nostra tecnologia. Anche se, nonostante le varie liti sul Twitter delle cripto, forse è meglio che tu non sia a conoscenza di tutto questo lato della comunità. Ma le liti sul fatto che Ethereum sia una tecnologia comunista: ti sembra vero? Pensi che sia corretto dire che Ethereum è una tecnologia comunista? 

**Melanie Premsyl:** Sì, mi piacerebbe dirlo, ma non ne sono sicura, perché sai che ci sono molte persone che hanno bisogno di fare soldi, quindi anche questo è lo scopo principale. Ma penso che potremmo semplicemente usarla come una rete comunista, che solo una parte potrebbe essere quel tipo di sogno. Penso che sia un sogno realizzabile, ma abbiamo bisogno di strumenti e design che aiutino le persone a uscire dal pensiero tecnico, molto ingegneristico, per capire com'è.

#### Decentralizzazione e layer 2 (l2) (6:55) {#decentralization-and-layer-2s-655}

**Fatemeh Fannizadeh:** Questo mi ricorda molto le DAO di qualche anno fa. Non so voi, ma io ero davvero entusiasta, pensavo che le DAO stessero rivoluzionando il modo in cui ci organizziamo come gruppi e comunità onchain e la libertà che abbiamo. E alla fine, tutto questo è semplicemente caduto nel vuoto. Non credo si sia manifestato affatto. È diventato più una questione di sistema di voto, non è veramente democratico, si tratta solo di trarre profitto. Tutta questa idea che avevamo delle DAO come strumento sociale non si è davvero manifestata. 

**Fatemeh Fannizadeh:** Ma penso che di recente abbiamo parlato molto di questi strumenti che la blockchain ci offre e di come possiamo immaginare l'evoluzione della blockchain tra cinque o dieci anni, e si parla molto del fatto che Ethereum diventi privato. Penso che questa sia sicuramente la strada da percorrere: il layer 1 (l1) che diventa un l1 incentrato sulla privacy. E c'è anche la roadmap incentrata sui rollup. Quindi come i layer 2 (l2) e i rollup diventeranno in un certo senso gli utenti principali di Ethereum piuttosto che gli utenti finali. Gli utenti finali si sposteranno quindi, invece di far parte delle DAO sull'l1, a far parte di vari rollup o l2. Quindi, come possiamo essenzialmente proiettare la nostra immaginazione in questo tipo di futuro di Ethereum per costruire quello che hai detto, questo spazio di libertà anarchico e subcomunista? 

**Melanie Premsyl:** Dunque, sono francese. Questo è un grosso problema. Essendo francesi, siamo una nazione molto statalista. Quindi penso sempre in modo pedagogico e molto dall'alto verso il basso. E penso che i layer 2 (l2) creino un modo in cui tutti possono creare mini blockchain, e sono protette dal layer 1 (l1). Mi piacerebbe vedere se le persone possono creare un aiuto pedagogico per tutti per qualcosa che è gratuito. Penso che molti gruppi, come le associazioni, potrebbero creare la propria blockchain, e sarà un modo... come sai, il federalismo è il grande argomento principale dell'anarchismo. Come le persone riescono magari a odiarsi, ma a parlarsi. Quindi abbiamo bisogno di avere questo tipo di federalismo nella blockchain. Ognuno ha un layer 2 (l2) con il proprio valore, e quindi parliamo con la stessa infrastruttura. 

#### Anarchia, libertà e costruzione di strumenti (9:53) {#anarchy-freedom-and-building-tooling-953}

**Fatemeh Fannizadeh:** Sì, mi piace molto quello che hai detto sul fatto di odiarsi a vicenda ma continuare a comunicare, come non essere tossici nonostante le nostre differenze. E il fatto che ci sia un solo layer 1 (l1) in questo scenario, che sarebbe Ethereum, viene spesso definito fascista perché tutti dobbiamo essere d'accordo con questo unico insieme di regole. Quindi è questo unico sistema che è uguale per tutti, e devi fondamentalmente sottometterti a questo l1 o puoi andartene, questa è tutta un'altra questione. Ma se riusciamo a decentralizzare tutto questo in un ecosistema di vari piccoli rollup e l2, allora possiamo riportare la dissonanza e il disaccordo all'interno di questa infrastruttura comune. 

**Melanie Premsyl:** Sì, certo. Penso che siate fantastici. Penso che ci sia una grande responsabilità per le persone tech che hanno un vero modo di pensare. Siete gli unici al giorno d'oggi che stanno cercando di fare qualcosa di buono, e quindi non potete semplicemente rimanere nella vostra immaginazione. E come dici tu, forse il problema del fascismo... siccome siamo uno solo, avete una grande responsabilità. Non si tratta solo di usare Ethereum o solo della privacy, è come se stessimo creando il nuovo mondo tecnologico e dobbiamo scegliere se ci saranno solo persone tech, o se le persone tech saranno collegate con tutti coloro che vogliono più libertà.

**Fatemeh Fannizadeh:** Quindi abbiamo menzionato molto il comunismo e l'anarchismo, e queste sono quasi come parolacce nelle cripto, mi sembra. Sai, è così contaminato e ricevi critiche immediate se menzioni questo concetto. E non so, forse mi sbaglio, ma quando sono entrata nelle cripto, c'erano più hacker e l'estetica anarchica era più presente. L'atmosfera era più... era figo essere così, quindi molte persone si identificavano in questo. Al giorno d'oggi sento che ce ne sono ancora molti in giro, ma forse più nascosti. Tipo, c'è qualche anarchico nascosto nella stanza? Non lo so! Penso di sì. Quindi direi di fare forse un passo indietro, se puoi definire effettivamente cos'è il comunismo o l'anarchismo.

**Melanie Premsyl:** Sì. No, penso che l'anarchismo non sia ben noto nel senso che è molto semplice. È solo quando arriviamo ad avere un'auto-organizzazione. Quindi quando ci sono sacche di libertà, sacche di anarchia, come quando le persone parlano semplicemente insieme agli amici, con un'associazione, anche sul lavoro, e non hanno bisogno di qualcuno che sia il capo, la guida per capire e decidere. Perché alla fine, il problema umano è che le persone vogliono avere un capo. L'anarchismo sta solo cercando di combattere contro quel profondo desiderio di essere controllati dall'altro. Vogliamo davvero essere liberi? Questa è la domanda, e come possiamo riuscire a farlo insieme? 

**Fatemeh Fannizadeh:** Anche una cosa che hai detto ieri era molto rilevante, credo, ed è che tutti vivono l'anarchia nella loro vita. Alcune persone dicono: "Oh, anarchia, ne siamo così lontani. Siete solo reazionari, anti-establishment, anti-Stato". Ma in realtà, tutti, che sia nella loro famiglia, nelle loro amicizie, in qualche forma di relazione, stanno navigando in un regno di una sorta di assenza di leggi, di anarchia, in cui le regole vengono create attraverso la dinamica interpersonale. Quindi tutti hanno un certo livello di anarchia nella loro vita, e penso che partendo da lì, forse diventi più tangibile anche parlarne.

**Melanie Premsyl:** Sì. Sì. È per questo che penso che la blockchain sia veramente anarchica, in quel modo di pensare. 

**Fatemeh Fannizadeh:** Ok. Incredibile. Penso che questa sia la frase perfetta forse per concludere. La blockchain è anarchica. E anche per concludere su questo, penso che ciò che è veramente importante o ciò che mi piacerebbe davvero vedere nella blockchain sarebbero più strumenti. Perché mi è difficile immaginare che gruppi anarchici o gruppi sovrani più autonomi vengano e siano semplicemente utenti di un prodotto. Non c'è necessariamente un'adeguatezza al mercato in quel senso. È molto improbabile che adottino semplicemente un prodotto già fatto. Piuttosto, se dai loro la materia prima per costruire il proprio. Quindi è più un fai-da-te, costruisci i tuoi strumenti, il tuo rollup layer 2 (l2), come vuoi chiamarlo. Penso che questo renderebbe le cripto ancora più allineate con noi. Merci beaucoup. [Applausi]