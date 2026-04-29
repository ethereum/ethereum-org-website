---
title: "La privacy istituzionale di Ethereum oggi"
description: "Un panel all'evento Web3Privacy Now durante il Devconnect 2025, con esperti che discutono delle reali esigenze di privacy istituzionale su Ethereum, dalla conformità alle prove a conoscenza zero."
lang: it
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy e sicurezza"
  - "privacy"
format: panel
author: Web3Privacy Now
breadcrumb: "Privacy istituzionale"
---

Un panel all'evento Web3Privacy Now durante il Devconnect 2025, moderato da **Oskar Thorin** (IPTF/EF), con la partecipazione di **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association) e **François** (Polygon Miden) che discutono delle reali esigenze di privacy istituzionale su Ethereum, dalla conformità normativa alle prove a conoscenza zero per la finanza decentralizzata (DeFi) istituzionale.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=cZqlg4W1Els) pubblicata da Web3Privacy Now. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione all'Institutional Privacy Task Force (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Ciao. Mi sentite? Va bene. Perfetto. Inizieremo con un brevissimo discorso introduttivo — di circa 3-5 minuti — che ci condurrà poi al panel. Questo è un discorso abbreviato. Il panel precedente ha parlato molto di conformità, privacy e così via. Ho tenuto un discorso precedente al Cyban Congress che ha toccato anche questo argomento, e ci sarà una versione più lunga di questo intervento al DeFi Day più tardi oggi. Ma ciò di cui voglio parlare è la privacy istituzionale su Ethereum.

Mi chiamo Oskar e sono il responsabile dell'IPTF presso la Fondazione Ethereum. L'acronimo sta per Institutional Privacy Task Force. E perché la privacy istituzionale è importante? È importante per diversi motivi. Penso che uno dei motivi principali sia che, se si guardano queste enormi istituzioni finanziarie esistenti, stiamo parlando di trilioni di dollari in flussi monetari. Un tempo la regolamentazione era l'ostacolo principale al loro passaggio onchain. Ma quello che è successo negli ultimi anni è che ora la privacy è diventata il loro ostacolo più grande.

Quindi, qual è la leva e l'impatto in questo caso? Penso che anche solo spostare l'1% dei fondi della finanza tradizionale su Ethereum avrebbe un impatto enorme in termini di ciò che Ethereum può fare per la privacy. E il solo inserimento di una singola istituzione coinvolge anche milioni di utenti, giusto? Questa non è un'ipotesi. Ci sono istituzioni che sono già onchain, e ci sono molteplici sviluppi previsti per il prossimo anno circa. Il momento è adesso, per quanto riguarda il passaggio delle istituzioni onchain con la privacy integrata.

Una singola grande istituzione qui può avere un impatto enorme su quale ecosistema alla fine vincerà — che sia Ethereum o versioni più private. Perché vogliono Ethereum? Ci sono alcuni motivi. Cose come la liquidità, la resistenza alla censura, 10 anni di operatività ininterrotta e il fatto che sia un punto di forza in termini di regolamento. Ci sono anche altre alternative, ma presentano limitazioni diverse. 

Affinché Ethereum possa gestire l'inserimento di queste istituzioni, è necessario affrontare queste preoccupazioni relative alla privacy. Quello che stiamo cercando di fare all'Institutional Privacy Task Force è l'inserimento delle istituzioni su Ethereum, assicurandoci che i loro obiettivi di privacy vengano soddisfatti. Organizziamo workshop, cercando di demistificare il settore e assicurarci di poter rispondere alle esigenze istituzionali, in particolare per quanto riguarda la privacy. Il primo artefatto che abbiamo è questa mappa della privacy istituzionale: parliamo con grandi istituzioni, comprendiamo i loro casi d'uso aziendali e i loro requisiti, rendiamo open source il più possibile e poi parliamo con i fornitori del settore per connettere le istituzioni allo spazio delle soluzioni. 

#### Presentazioni del Panel e Problemi Istituzionali (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Scusate se sono andato un po' veloce, ma spero sia stato comprensibile. Questo panel è composto da molti esperti in ricerca, policy e ingegneria, e parleremo di privacy istituzionale. 

Solo una breve presentazione: abbiamo Eugenio, Head of Growth presso la European Blockchain Association. Abbiamo Zach Obront, CEO di Etherealize, dove sta sviluppando prodotti istituzionali e primitive di privacy sottostanti. Abbiamo Amzah, che ha trascorso gran parte della sua carriera nella gestione del rischio finanziario prima di farsi coinvolgere profondamente in Ethereum, e ora sta facendo da ponte tra i controlli tradizionali e i mercati nativi di Ethereum. E infine, abbiamo François, senior staff protocol engineer presso Polygon Miden, focalizzato sui sistemi di prova a conoscenza zero.

Per iniziare, in una o forse in poche frasi, a quali problemi istituzionali state lavorando che richiedono effettivamente la privacy su binari pubblici piuttosto che su un semplice database tradizionale o una catena privata? Forse possiamo iniziare con François.

**François:** Sì, certo, si può sempre costruire su una blockchain privata, ma oggi crediamo che le istituzioni vogliano accedere alla liquidità globale offerta da Ethereum, mantenendo allo stesso tempo ciò che hanno dal mondo della finanza tradizionale, ovvero un grado di privacy che consenta loro di fare trading con la liquidità globale senza rendere pubbliche tutte le loro operazioni. Per noi, ecco perché è importante sia integrare la privacy, sia costruire su Ethereum.

**Eugenio:** Beh, forse posso affrontare la questione da una prospettiva diversa: quella degli standard. Nel processo di standardizzazione, c'è un concetto molto importante per le istituzioni, che è l'ancora di fiducia (trust anchor). Essenzialmente ogni istituzione ha un grande ambiente offchain, verso il quale ancorano la responsabilità nella società per tutti coloro che utilizzano i loro servizi. Una parte del grande problema nella creazione di servizi basati su blockchain per le istituzioni è come creare un sistema efficiente per fare da ponte per l'ancora di fiducia nel mondo onchain, e poi come incorporare tecniche crittografiche per garantire che i dati vengano elaborati in modo minimale, ma verificabile e controllabile.

**Zach Obront:** Ottimo. In Etherealize, ci concentriamo sull'aggiornamento di alcuni dei meccanismi interni più profondi dei mercati finanziari, in particolare i mercati del credito. Quindi affronterò la questione da due direzioni. La prima è: *perché la privacy?* In questo momento, tutti questi mercati funzionano su accordi bilaterali. Ci sono due parti. Sono molto abituate all'idea che trapeli solo l'esatta informazione che deve trapelare, e nient'altro. E quindi l'unico modo in cui prenderebbero in considerazione le blockchain pubbliche è se quel livello di privacy venisse soddisfatto. 

Dall'altra direzione: *perché essere su una blockchain pubblica?* Si tratta di mercati complessi con parti che non si fidano necessariamente l'una dell'altra e che devono fare affidamento su normative di diversi paesi. Avere una fonte di verità al centro di quei mercati è un enorme vantaggio che non si può ottenere senza una blockchain pubblica. In questo momento sono in una sorta di fase di stallo e dicono: "C'è questo potenziale di aggiornamento, ma non possiamo realizzarlo senza la privacy di cui abbiamo bisogno". Stiamo cercando di unire queste due cose.

**Amzah:** Sì. Lavoro per ABN Amro, che è una grande banca olandese. Abbiamo 5 milioni di clienti retail. Quindi al momento non stiamo costruendo nulla di specifico sulla privacy, ma ciò che sta emergendo ora è, ad esempio, un portafoglio di identità digitale. Di solito funziona che i dati vengono archiviati in un database centralizzato e poi ci si connette con un fornitore esterno o una terza parte, ma questo ovviamente non è molto sicuro. Quindi stiamo già iniziando a pensare a come poter utilizzare le prove a conoscenza zero, ad esempio, in modo da poter avere una divulgazione selettiva con parti esterne. In questo senso, possiamo proteggere le informazioni dei nostri clienti e consentire loro di connettersi con il più ampio ambiente Web3.

#### Flussi di Lavoro Concreti e Archiviazione (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Ok, fantastico. Se scegliete un flusso concreto che potrebbe interessarvi — come magari alcune emissioni di obbligazioni, operazioni di trading o pagamenti di tesoreria — chi può vedere cosa esattamente in quale fase, e cosa viene archiviato onchain rispetto all'offchain? Magari iniziando con François.

**François:** Un ottimo modo per affrontare la questione è farlo dal punto di vista di chi vuole fare trading con un DEX su Uniswap. La cosa bella è che su Miden possiamo offrire qualcosa che garantisce il completo anonimato. Abbiamo account anonimi che fanno trading tra loro tramite note. È un mix tra il modello basato su account e il modello UTXO. 

Se fai trading con una sede di negoziazione (venue), quella sede vorrà essere pubblica. Come DEX, vuoi ripubblicare i prezzi ogni volta che hai interagito con qualcuno. Quindi emetti note in un lotto (batch). Come utente, non c'è nulla onchain tranne ciò che la sede potrebbe essere in grado di decifrare. La sede esegue la tua operazione ed emette note in uscita. Quelle note possono poi essere rivendicate da account che possono essere completamente privati. Quindi mantieni il completo anonimato per quanto riguarda gli utenti, con l'eccezione della sede che ha deciso di rivelare pubblicamente alcune informazioni. Oltre a questo, costruiamo flussi di conformità, che includono flussi di lavoro di verificabilità e policy per le chiavi di visualizzazione (view-key) che consentono l'ingegneria di mercato a livello locale.

**Eugenio:** Beh, forse posso prenderla più da una prospettiva funzionale. Generalmente ogni flusso di emissione o distribuzione per i servizi istituzionali ha tre pilastri fondamentali. Il primo è l'identità e la fiducia, che è collegato al flusso di inserimento per gli investitori, ai processi KYC/KYB e così via.

Il secondo è l'applicazione delle policy. L'account raccoglie tutte le informazioni da questo ambiente offchain e genera un innesco (trigger) per una dichiarazione di esecuzioni sulla blockchain. In questo contesto, le tecniche di tutela della privacy possono rendere efficiente la distribuzione. Ad esempio, un'offerta che può essere distribuita solo a determinati tipi di investitori associati a determinati tipi di account.

Il terzo pilastro è la reportistica. Questa è associata all'inserimento e alle operazioni di trading onchain. Il collante di tutti questi servizi è il modo in cui estraiamo dalle attestazioni dei dati onchain i punti dati di cui abbiamo effettivamente bisogno offchain per fornire alla fine una reportistica tradizionale ai nostri clienti.

**Zach Obront:** La risposta a questo è molto diversa a seconda del flusso, giusto? Questa è una delle sfide in questo settore: è difficile avere principi generali. Un esempio di flusso è un grande prestito in cui viene effettuato il pagamento degli interessi e una tonnellata di prestatori viene suddivisa. L'aspettativa è che nessuno debba saperlo. Non c'è alcuna regolamentazione al riguardo. È consentito che sia totalmente privato e vogliamo essere in grado di supportare quell'estremità dello spettro. 

All'altro estremo, forse c'è uno scambio di posizioni tra prestatori e ci si aspetta che alcune parti amministrative possano vedere che lo scambio è avvenuto, ma non il prezzo. Forse altri possono vedere tutti i dettagli. Abbiamo costruito tutto attorno a questo modello flessibile in cui non vogliamo codificare rigidamente le regole di conformità. Vogliamo dire che un utente o un'applicazione può determinarlo da solo. Abbiamo la capacità di applicare regole che consentano alle autorità di regolamentazione o agli organi amministrativi di vedere le cose, o persino di fornire dati aggregati alle associazioni.

**Amzah:** Sì. Sono per lo più d'accordo con quello che ha detto Zach. In passato, quando le istituzioni pensavano alla privacy, avviavano semplicemente una catena privata a cui partecipavano magari 20 banche e solo loro erano in grado di vedere cosa c'era dentro. Ma in realtà, è molto più sfumato. Dipende dal caso d'uso, dal tipo di flussi e da ciò che il regolatore ha bisogno di sapere. È possibile inserire le informazioni sui saldi onchain in una forma più aggregata utilizzando la prova delle riserve (proof of reserves), ad esempio.

#### Requisiti Non Negoziabili (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio e Amzah, da parte di banche, sedi di negoziazione e regolatori, quali sono alcuni requisiti non negoziabili che continuate a sentire ripetutamente? Come tracce di controllo (audit trail), regole KYC o requisiti di reportistica?

**Eugenio:** Direi la responsabilità (accountability) per quanto riguarda il processo di inserimento e la conformità associata alla reportistica. Per me, si tratta di inquadrare requisiti aziendali concreti in strutture tecniche. Il diavolo si nasconde nei dettagli: che il tuo utente sia un'applicazione o un investitore crea un flusso di processo diverso per il tuo ecosistema. L'obiettivo dovrebbe essere quello di costruire questo sistema in modo efficiente, altrimenti saremo bloccati nell'adozione. Questo è il motivo per cui l'infrastruttura degli account su Ethereum si sta evolvendo in un modo molto interessante.

**Amzah:** Sì, non ho molto da aggiungere a questo. 

**François:** Il nostro co-fondatore trascorre settimane con i clienti nello spazio istituzionale e la richiesta principale che emerge è il "controllo". Chi vede cosa, quando e per quale motivo. E poi si approfondiscono quelle conversazioni nei dettagli e diventano incredibilmente personalizzate. Per noi, questo è fantastico perché il mondo della finanza tradizionale ha trascorso decenni a costruire le proprie pratiche contabili e i flussi AML/CTF. Sono molto specifici riguardo a quel controllo. Quindi stiamo costruendo quelle capacità a livello di protocollo e supportando i clienti nel loro percorso.

#### Compromessi e Liquidità Globale (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** Quali sono i principali compromessi con cui state convivendo attualmente? Prestazioni contro privacy, o liquidità globale contro controlli rigorosi, o trasparenza onchain contro registri offchain? Iniziando con Zach.

**Zach Obront:** Fortunatamente, siamo in un mercato in cui la velocità non è la priorità principale. Molti mercati del credito effettuano il regolamento in settimane, quindi i secondi non sono la loro preoccupazione maggiore. Ma l'esperienza utente (UX) della privacy è molto difficile. Le blockchain sono molto brave a mantenere questo concetto di stato in coda, a gestire i cambiamenti e ad assicurarsi che le transazioni siano ordinate correttamente. Quando iniziamo a mettere in coda transazioni private, le cose si complicano. Dobbiamo capire quale sia la migliore esperienza utente che si sposi con la privacy, soprattutto perché le persone si aspettano che i sistemi siano sia privati che facili da usare.

**François:** Volevo evidenziare i compromessi che *non* abbiamo, grazie a Ethereum. Le istituzioni vogliono davvero entrare nei mercati solo se ne vale la pena, il che significa che vogliono un mercato globale con effetti di rete, profonda liquidità e molte controparti. Essere un rollup su Ethereum, piuttosto che una catena privata o l'ennesimo layer 1 (l1), ci dà accesso a quel mercato profondo.

Naturalmente, ci sono delle complessità. Ci teniamo molto a quell'esperienza "in guanti bianchi" per un'istituzione che entra in quel mercato, in modo che possa avere le proprie condizioni. Una delle sfide è l'equilibrio tra privacy e resistenza alle minacce. Esistono attori ostili nel mondo del Web3 e vogliamo gestirli meglio per offrire un'esperienza fantastica. Ci stiamo avvicinando alla decentralizzazione con cautela: sappiamo come farla, ma la faremo nel momento in cui servirà al meglio i clienti.

#### Fiducia nel Sistema e Fattori di Adozione (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, come si rendono queste soluzioni affidabili e utilizzabili da istituzioni e governi?

**Eugenio:** Tutto inizia dal cercare di considerare i servizi istituzionali come sistemi integrati, in cui ogni parte del sistema ha la propria regola di accesso specifica. Dall'origine dei dati alla compressione dei dati sul layer 2 (l2) e alla decentralizzazione dei dati sul layer 1 (l1). Se combiniamo questo sistema in cui l'ambiente offchain detiene l'assunto di fiducia dell'istituzione, possiamo allocare processi diversi al layer 2 (l2) e al layer 1 (l1).

**Oskar Thorin:** Amzah, come vedi la possibilità di rendere i sistemi affidabili e utilizzabili?

**Amzah:** Per noi è davvero importante che sia personalizzabile. La blockchain non è più solo un caso d'uso in cui tutto è completamente pubblico o completamente privato. Non esiste una soluzione unica per tutti. Ciò che è anche più importante per noi è essere conformi alle normative. Il settore bancario in Europa è fortemente regolamentato e se qualcosa non è corretto per quanto riguarda la privacy, semplicemente non viene accettato dai regolatori.

#### Guardando al 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** Va bene, siamo quasi alla fine. Qual è un elemento fondamentale — tecnico, operativo o a livello di policy — che pensate accelererebbe in modo significativo l'adozione istituzionale? E se ci incontrassimo di nuovo nel 2026, cosa pensate sia realistico che sia successo quest'anno?

**Zach Obront:** Penso che "istituzionale" e "privacy" siano attualmente termini molto ampi e si intersechino in modo diverso a seconda dei casi d'uso. Ad alcuni interessa collegarsi a mercati liquidi, mentre altri vogliono solo un'infrastruttura interna migliore. Ci farebbe fare un passo avanti ottenere chiarezza sulle situazioni specifiche che stiamo cercando di risolvere. Non c'è stata una categorizzazione profonda dei requisiti di conformità. Spingere per mappare quei requisiti e trasformarli in un protocollo che li supporti aumenterebbe la nostra capacità di costruire, piuttosto che fare affidamento su un mondo frammentato gestito da avvocati.

**Amzah:** La tecnologia ha fatto molta strada con le prove a conoscenza zero e la cifratura completamente omomorfica. Penso che una delle cose più importanti da migliorare sia l'educazione per i regolatori e le istituzioni. Potrebbero aver sentito parlare delle prove a conoscenza zero, ma non sanno davvero come funzionano. La maggior parte dei regolatori pensa ancora da un punto di vista legale: se qualcosa si rompe, chi possiamo chiamare? E se non c'è nessuno da chiamare, questa è una percezione difficile per loro.

**Eugenio:** Dal punto di vista tecnologico, la generazione di prove ZK in tempo reale e l'aggregazione ci consentiranno davvero di costruire casi d'uso complessi che combinano app, clienti istituzionali e layer 1 (l1). Sostengo anche ciò che ha detto Amzah sull'educazione. Per il 2026, mi piacerebbe vedere un impegno più collaborativo tra i progetti in modo che le applicazioni possano davvero iniziare ad avere accesso alla liquidità globale e alle reti globali.

**François:** Se ci incontrassimo tra un anno, mi piacerebbe aver lanciato la Mainnet di Miden in primavera, così potremo festeggiarlo. Oltre a questo, vorrei che fossimo sulla buona strada verso la completa decentralizzazione. Ci vorrà un grande sforzo collettivo. La cosa principale che voglio vedere accadere è un maggiore coinvolgimento. L'idea che la privacy sia in contrasto con la conformità non è del tutto vera, ma unire le due cose richiede lavoro. Vogliamo che le istituzioni aiutino a plasmare il tipo di mercati che vogliono vedere, perché sappiamo che questo sarà complesso e peculiare per le loro esigenze.

#### Considerazioni Finali (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Voglio solo dare a ciascuno di voi 10-20 secondi per menzionare qualcosa che è successo questa settimana o per fare una rapida promozione prima di concludere.

**Amzah:** Tre anni fa, ero un volontario che aiutava in uno dei primi Devconnect. Vedere come le persone guardano alle istituzioni ora rispetto ad allora è un enorme miglioramento.

**Zach Obront:** È semplicemente incredibile quanta privacy ci sia nell'aria quest'anno. Il mio background è nella sicurezza e c'è una carenza di ricercatori di sicurezza che capiscano queste cose. A chiunque si trovi a quell'intersezione, incoraggio a buttarsi a capofitto.

**Eugenio:** Sceglierò l'organizzazione normativa dei dati: penso che ci sia molta speranza per le ZKP in un dominio di dati conforme e il livello di interoperabilità di Ethereum aiuterà a portare le istituzioni onchain.

**François:** È molto difficile come ingegnere; di solito si sente parlare di un argomento di nicchia. Di recente abbiamo introdotto i precompilati su Miden, il che apre alla verifica di flussi che coinvolgono il machine learning. Se siete dei nerd estremi come me, volete davvero fare machine learning e prove di machine learning, e questa è ora una cosa che possiamo fare.

**Oskar Thorin:** Voglio ringraziare tutti i relatori. Abbiamo ascoltato prospettive molto interessanti su tecnologia, policy e ingegneria. Abbiamo solo scalfito la superficie, ma vi consiglio di parlarne di più se siete interessati a questo argomento. Grazie.