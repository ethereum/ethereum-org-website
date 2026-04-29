---
title: "L'evoluzione di Ethereum: Fusaka, Glamsterdam e oltre"
description: "Preston Van Loon sui prossimi aggiornamenti del protocollo di Ethereum, coprendo le tappe della roadmap di Fusaka e Glamsterdam e l'evoluzione a lungo termine del protocollo."
lang: it
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-e-priorita"
  - "roadmap"
  - "aggiornamenti"
format: presentation
author: ETHDenver
breadcrumb: "Evoluzione di Ethereum"
---

Una presentazione di **Preston Van Loon** di Offchain Labs e Prysm, tenuta all'ETHDenver. Preston illustra la recente velocità di aggiornamento di Ethereum e cosa aspetta la rete, inclusi Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, tempi di slot più brevi e una definitività più rapida.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=GgKveVMLnoo) pubblicata da ETHDenver. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:07) {#introduction-007}

**Presentatore:** Va bene, tutti quanti. Andiamo avanti. Parleremo dell'evoluzione di Ethereum con Preston Van Loon. A te la parola.

**Preston Van Loon:** D'accordo. Grazie. GM — sapete che è GM a qualsiasi ora, giorno o notte, che sia mattina o meno. Quindi vedo GM tutto il giorno e tutta la notte. Voglio parlare dell'evoluzione di Ethereum, quindi iniziamo.

C'è una narrativa che probabilmente avete già sentito: Ethereum è troppo lento a rilasciare aggiornamenti. So che l'avete sentita. L'ho sentita io. L'avete sentita molte volte. Le persone dicevano: "Quando il merge? I dev non possono fare qualcosa? Altre chain si muovono velocemente. Perché Ethereum si muove così lentamente?" Sono qui per dirvi che questa narrativa è morta.

Lavoro sul client di consenso Prysm. È uno dei componenti chiave della Beacon Chain di Ethereum. E sono stato in prima linea per gli aggiornamenti più recenti — per Pectra, Fusaka. Da quello che ho visto dall'interno, non si trattava della burocrazia lenta che le persone hanno attribuito a Ethereum per molti anni. Era in realtà una macchina ad alta velocità e ben collaudata che ha fornito alcuni dei più grandi aggiornamenti che abbiamo mai visto nella storia di Ethereum.

#### Rilasciare tre aggiornamenti in un anno (1:18) {#shipping-three-upgrades-in-one-year-118}

Quello che abbiamo rilasciato nel 2025 sono stati tre aggiornamenti principali in un anno. Primo, Pectra a maggio del 2025. Questo ha introdotto l'astrazione dell'account nativa, un aumento del saldo effettivo massimo del validatore consentendo i consolidamenti, e altri dieci EIP. A maggio, questo è stato il più grande aggiornamento in termini di EIP che Ethereum avesse mai visto.

Ma poi, solo sette mesi dopo, abbiamo rilasciato Fusaka — un aggiornamento ancora più grande in termini di EIP. Questo ne aveva tredici, con un'innovazione chiamata PeerDAS, che è davvero entusiasmante. Ma solo sei giorni dopo, abbiamo aggiornato di nuovo con un fork BPO1, e BPO2 è seguito poco dopo, aumentando la capacità dei blob di Ethereum.

Questa è una testimonianza della capacità di rilascio di Ethereum. Si tratta di una collaborazione tra cinque o sei client di consenso, cinque client di esecuzione, molti ricercatori — oltre cento persone coinvolte nello sviluppo core di Ethereum — e tutti rilasciano in coordinamento allo stesso tempo.

#### Scalabilità di PeerDAS (2:22) {#peerdas-scaling-222}

Diamo un'occhiata al protagonista di Fusaka: PeerDAS. PeerDAS è una soluzione di scalabilità davvero fantastica. Prima di PeerDAS, avevamo Pectra, e con Pectra dovevi — come operatore di nodo o validatore — scaricare ogni blob che arrivava con un blocco. Questo puntava a sei blob per blocco. Tutti dovevano scaricarlo, e questo è davvero un collo di bottiglia per la scalabilità. Se vuoi aumentarlo, stai chiedendo agli operatori dei nodi di aumentare proporzionalmente l'uso della larghezza di banda per i blob.

Ora con Fusaka, abbiamo blob codificati tramite erasure coding (codifica di cancellazione) e chiediamo ai validatori di custodirne solo una parte. Devi custodire solo un ottavo dei blob. E con un qualsiasi 50% dei blob, puoi ricostruire l'intero elemento. Quindi, distribuendo questo sulla rete, ci si assicura la disponibilità dei dati e che ci sia un onere minore per gli staker solitari. Questo ci sta dando un'immediata riduzione di quasi il 90% della larghezza di banda della rete nell'uso dei blob.

Guardando i numeri: per Pectra, avevamo un obiettivo di sei e un massimo di nove blob con un limite di gas di 36 milioni. Consideriamo questa la linea di base per l'uso dei blob — che era di 768 kilobyte per blocco. Ora, tra Pectra e Fusaka, abbiamo avuto un aggiornamento fuori banda in cui il limite di gas è stato aumentato. Questo è stato un processo di governance onchain in cui i validatori hanno semplicemente votato su quale pensavano dovesse essere il limite del blocco — è passato da 36 a 45 milioni. E poi, più tardi nell'anno, siamo arrivati a Fusaka, che non ha cambiato l'obiettivo o il massimo dei blob ma ha aumentato di nuovo il limite di gas.

E poi abbiamo ottenuto quella grande diminuzione della larghezza di banda in cui ogni blocco con un obiettivo di sei blob è ora di soli 96 kilobyte di dati blob che un validatore doveva archiviare. Poi di nuovo con BPO1, il fork solo per i parametri dei blob, abbiamo aumentato l'obiettivo a 10 e il massimo a 15. BPO2, avvenuto solo un mese dopo, è passato a 14 e 21 — che è il doppio di quello che avevamo in Pectra, ma con un utilizzo della larghezza di banda sui blob ancora inferiore del 71% per gli staker solitari.

#### Cosa arriverà in Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

Cosa arriverà dopo in Glamsterdam? Ci sono tre cose davvero fondamentali e una che è ancora in fase di ricerca attiva.

La prima è l'ePBS — separazione proponente-costruttore (PBS) integrata (enshrined). Per come viene effettuata oggi la produzione dei blocchi, molte persone stanno esternalizzando la loro opportunità di costruire un blocco tramite MEV-Boost a costruttori molto sofisticati. Questa è la maggioranza della rete. Il problema è che devi fidarti di un relay, e c'è molta fiducia nel fatto che il costruttore proporrà effettivamente il blocco su cui aveva fatto un'offerta. L'ePBS introduce un meccanismo all'interno del protocollo in modo che ci sia molta meno fiducia richiesta, ed è un'implementazione molto pulita della stessa idea.

La prossima cosa che abbiamo sono le liste di accesso a livello di blocco. Questa è un'innovazione fantastica in cui ogni blocco arriverà con una lista che indica dove nello stato stava leggendo o scrivendo dati. Ciò significa che puoi elaborare i blocchi in parallelo. Oggi devi elaborare i blocchi in modo sequenziale. Se vuoi elaborare il blocco 10, devi prima elaborare il 9 e l'8 e così via. Ora, se hai una raccolta di blocchi e nessuno di essi è in conflitto con le informazioni di accesso allo stato, puoi elaborarli tutti e otto in parallelo. Magari hai otto core — questo rende Ethereum più efficiente e più veloce nell'elaborare i blocchi.

La terza cosa è il repricing del gas. Ci sono stati dei benchmark tramite questo EIP che hanno mostrato che alcuni codici operativi (opcode) erano sovrapprezzati, altri sottoprezzati. Ora aggiorneremo le commissioni che paghi per ogni codice operativo (opcode) per riflettere la realtà, rendendo Ethereum più sicuro e più efficiente.

#### Il ruolo in evoluzione dei layer 2 (l2) (6:14) {#the-evolving-role-of-l2s-614}

C'è una cosa di cui voglio parlare che Vitalik ha menzionato di recente. Ha detto in un tweet un paio di settimane fa che la visione originale dei layer 2 (l2) e il loro ruolo in Ethereum non ha più senso. Ha fatto molta notizia, e penso che molte persone ne abbiano tratto la conclusione sbagliata.

Lasciate che vi dica cosa significa da parte di qualcuno all'interno. Ethereum sta scalando più velocemente del previsto. Le commissioni sono più basse che mai. Non avrei mai pensato di pagare commissioni del gas inferiori a un Gwei sulla Mainnet, ma eccoci qui. I blob sono abbondanti — ne abbiamo in quantità. Stiamo scalando i blob più velocemente del previsto. E anche le commissioni dei layer 2 (l2) sono davvero basse.

Quindi l'idea che abbiamo bisogno di layer 2 (l2) di uso generale — cioè, layer 2 (l2) che sono semplicemente la stessa EVM che abbiamo sul layer 1 (l1), basta copiarla e incollarla un po' di volte e tutto ciò che fanno è andare più veloci — non è più la visione. Questi layer 2 (l2) prospereranno con la specializzazione. Alcuni di essi punteranno a cose come la privacy, il gaming, specifiche nella finanza decentralizzata (DeFi) o estensioni dell'EVM. Ma se sono semplicemente una copia clone del layer 1 (l1), non fanno parte della roadmap in cui inizialmente immaginavamo questo tipo di paradigma frammentato (sharded) attraverso i layer 2 (l2).

#### FOCIL: resistenza alla censura a livello di protocollo (7:25) {#focil-protocol-level-censorship-resistance-725}

Oltre a Glamsterdam, ci sono tre cose davvero fantastiche in fase di sviluppo e ricerca attiva. La prima è FOCIL — Fork-Choice Enforced Inclusion Lists (Liste di inclusione applicate tramite la scelta del fork).

Il problema che mira a risolvere è che i costruttori di blocchi hanno una scelta. Possono decidere quali transazioni vengono incluse nel blocco. Potrebbero preferirne alcune o non preferirne altre — forse per un vantaggio MEV, forse per pressioni normative. Ma in ogni caso, sono in grado di censurare le transazioni come desiderano, e non c'è niente che nessuno possa fare al riguardo.

FOCIL cambia la dinamica di potere. Invece di dire che i costruttori di blocchi possono scegliere tutte le transazioni in un blocco, c'è un comitato casuale che seleziona — in base alle proprie euristiche locali — alcune transazioni che ritengono debbano essere incluse nel blocco successivo. Non sono tutte le transazioni nel blocco successivo. I costruttori hanno ancora molta libertà, ma c'è un sottoinsieme che devono includere. Il proponente del blocco prenderà questa breve lista — forse circa otto transazioni — e la metterà alla fine del blocco, e verranno eseguite con il blocco.

Questo viene applicato attraverso la scelta del fork. I validatori che vedono un blocco non faranno un'attestazione per esso a meno che non abbia una lista di inclusione aggiunta in fondo. Se ne vedono uno senza la lista, considereranno quel blocco non valido e lo ignoreranno semplicemente — non lo propagheranno, non esprimeranno un voto su di esso. Questa è ancora una ricerca attiva con alcuni parametri ancora in fase di decisione, ma la direzione è chiara: Ethereum includerà la resistenza alla censura a livello di protocollo.

#### Tempi di slot più brevi (9:24) {#shorter-slot-times-924}

La prossima cosa davvero entusiasmante sono i tempi di slot più brevi. Con Hegata — il fork dopo Glamsterdam — stiamo valutando se possiamo includere tempi di slot più brevi o slot rapidi. Questo non vuol dire che salteremo direttamente a slot di sei secondi o anche più veloci, ma stiamo costruendo le basi per renderlo possibile.

Sembra davvero semplice — tipo, "andiamo semplicemente più veloci". Ma devi pensare alla propagazione della rete, ai compiti di attestazione dei validatori in cui hanno un tempo limitato per agire, e poi c'è l'aspetto economico. Quando ho sperimentato per la prima volta con questo, ho semplicemente cambiato il 12 in un 6 e improvvisamente tutti stavano ottenendo il doppio dell'emissione — il doppio dei soldi — che non è davvero l'intenzione dietro tempi di slot più brevi. Si tratta di andare più veloci ma mantenendo tutto il resto invariato. Quindi è una cosa molto complessa, ma ha la possibilità di arrivarci nell'endgame in modo incrementale.

#### Definitività più rapida (10:20) {#faster-finality-1020}

La terza cosa è una definitività più rapida. Questo è davvero importante perché Ethereum si finalizza ogni due epoche — ogni 13 minuti — e ci sono applicazioni che dipendono davvero dal porsi la domanda: la mia transazione è permanente? Se la transazione non è stata in un'epoca finalizzata, allora la risposta è no — c'è una piccola possibilità che possa essere rimossa a causa di una riorganizzazione e la transazione debba essere inviata di nuovo.

Ora, se abbiamo una definitività rapida, cose come exchange, bridge o qualsiasi applicazione possono essere certi che una transazione sia definitiva. Primo, invece di due epoche per la definitività, facciamolo in una. Poi possiamo dire che invece di epoche lunghe 32 slot, accorciamole a quattro slot. Ora, se si unisce questo a tempi di slot di sei secondi, si parla di definitività in meno di 30 secondi. È un endgame davvero fantastico.

#### La stella polare (11:15) {#the-north-star-1115}

Tutto questo è integrato nella stella polare, dove diciamo che il layer 1 (l1) è veloce con una finalizzazione in secondi. Come ci arriviamo? Primo, iniziamo con PeerDAS — che è già stato rilasciato. Questo ci ha dato un livello scalabile per la disponibilità dei dati. Successivamente, abbiamo Glamsterdam, che include principalmente l'ePBS, che è un'implementazione pulita per la separazione proponente-costruttore (PBS) e rende cose come FOCIL più d'impatto. FOCIL entra in gioco con la resistenza alla censura, che è molto in armonia con l'ePBS. Con slot più rapidi, tempi di slot più veloci rendono la definitività più rapida ancora più d'impatto. Poi arriviamo a questo obiettivo finale in cui abbiamo davvero transazioni veloci che vengono finalizzate in secondi.

#### Chiusura (12:02) {#closing-1202}

Voglio che immaginiate come sarà la vita tra due anni. È un po' difficile pensarci perché le cripto si muovono così velocemente. Questa potrebbe essere una realtà in soli due anni: tempi di conferma delle transazioni di quattro o sei secondi; definitività misurata in secondi, non in minuti; applicazione a livello di protocollo per la resistenza alla censura; protezioni contro la crittografia post-quantistica; e layer 2 (l2) che competono su funzionalità e nuove innovazioni, non solo sull'andare più veloci. Tutto questo pur mantenendo la virtù di poter utilizzare un laptop o un hardware di livello consumer per eseguire un nodo completo a casa. Ethereum è accessibile e rimane accessibile per tutti nel futuro.

Il messaggio che voglio che portiate a casa è: la narrativa che vi ho presentato all'inizio — non c'è davvero alcuna prova a sostenerla. Ethereum rilascia aggiornamenti velocemente. In un solo anno, ci sono stati tre aggiornamenti. E nei prossimi 24 mesi, ci sono ancora più cose in arrivo, e arriveranno ancora più velocemente.

Queste non sono solo tempistiche fantasiose di cinque anni. Queste sono cose reali con proposte concrete in fase di sviluppo proprio ora. Ci sono cose in devnet in questo momento. Ci sono persone che lavorano mentre parliamo su queste implementazioni. Se state costruendo su Ethereum oggi, state costruendo sulla blockchain più attivamente sviluppata al mondo.

Sono Preston Van Loon, core developer di Ethereum. Lavoro nel team di Prysm presso Offchain Labs. Se volete essere coinvolti, il modo migliore per rimanere in sintonia con ciò che sta accadendo in Ethereum è aiutare a costruirlo voi stessi. Venite a parlarmi dopo. Venite a dare un'occhiata alla repo di Prysm o a qualsiasi repo delle specifiche di consenso o di esecuzione — apprezzeremmo davvero i vostri contributi. Grazie.