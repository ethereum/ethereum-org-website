---
title: "Il gioco delle riorganizzazioni nella Proof-of-Stake (PoS) di Ethereum"
description: "Caspar Schwarz-Schilling presenta una ricerca sugli attacchi di riorganizzazione dei blocchi nella Proof-of-Stake (PoS) di Ethereum, coprendo i vettori di attacco, i meccanismi di difesa e le mitigazioni a livello di protocollo in atto."
lang: it
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consenso"
  - "pos"
  - "sicurezza"
format: presentation
author: LisCon
breadcrumb: "Riorganizzazioni PoS"
---

Questa presentazione esplora i tipi di riorganizzazioni (reorg) dei blocchi possibili nella Proof-of-Stake (PoS) di Ethereum e le mitigazioni progettate per prevenirli. Caspar Schwarz-Schilling, ricercatore presso il Robust Incentives Group della Fondazione Ethereum, illustra i meccanismi delle riorganizzazioni ex-post ed ex-ante, confrontando il panorama della sicurezza tra la Prova di lavoro (PoW) e la Proof-of-Stake (PoS).

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=xcPxwhrg3Ao) pubblicata da LisCon. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione e contesto (0:03) {#introduction-and-background-003}

Benvenuti. Oggi parlerò delle riorganizzazioni (reorg) che sono possibili nella Proof-of-Stake (PoS) di Ethereum.

Di recente sono entrato a far parte della Fondazione Ethereum, in particolare del Robust Incentives Group. Fondamentalmente siamo un team di ricerca focalizzato su tutto ciò che riguarda gli incentivi. Sarò breve: questo intervento è denso di contenuti e potete trovare la maggior parte del nostro lavoro su GitHub.

#### Due tipi di riorganizzazioni (0:44) {#two-types-of-reorgs-044}

Oggi voglio parlare di riorganizzazioni e, in particolare, voglio delineare due diversi tipi di reorg che sono possibili nell'ambito della Proof-of-Stake (PoS) di Ethereum.

Da un lato abbiamo le **riorganizzazioni ex-post** e dall'altro le **riorganizzazioni ex-ante**. Perdonatemi i nomi latini un po' pretenziosi, ma rendono l'idea.

Le riorganizzazioni ex-post sono più o meno ciò a cui pensiamo di solito quando parliamo di reorg. L'avversario vede un blocco: se è di valore, potrebbe voler provare a riorganizzarlo. Quindi, nel diagramma qui vediamo che il blocco N+1 è il blocco che l'attaccante vuole escludere con la riorganizzazione e, costruendo sullo stesso blocco genitore N, se funziona, il blocco N+3 viene poi costruito sul blocco N+2. Questa è l'amministrazione ordinaria.

Ora, le riorganizzazioni ex-ante sono leggermente diverse. L'idea è che l'attaccante debba iniziare l'attacco prima ancora di sapere quale blocco andrà a riorganizzare. Come funziona a grandi linee? Ad altissimo livello, il blocco N+1 viene costruito sopra N ma non viene rilasciato immediatamente. I nodi onesti non sanno nemmeno che N+1 esiste e quindi continueranno a costruire su N. Poi, attraverso qualche meccanismo, N+1 viene rilasciato e N+3 potrebbe vedere che N+1 è in vantaggio e costruire su di esso, in modo tale che N+2 venga effettivamente escluso dalla riorganizzazione.

Vi chiederete perché si dovrebbe voler fare questo tipo di reorg. Beh, c'è ancora del MEV da catturare. Se siete fortunati, il blocco N+2 ha molto MEV: potete catturarlo semplicemente copiando e incollando qualsiasi cosa sia quel blocco. Nel peggiore dei casi, avete fondamentalmente due slot di transazioni da ascoltare.

#### Riorganizzazioni ex-post nella Prova di lavoro (PoW) (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Prima di immergerci nelle riorganizzazioni ex-ante, che sono l'argomento principale di questo intervento, lasciatemi riassumere brevemente le riorganizzazioni ex-post e iniziare in particolare con il contesto della Prova di lavoro (PoW).

Fondamentalmente è un riassunto del post sul blog dei soliti noti: Georgios e Vitalik. Andate a leggerlo, è fantastico.

In poche parole, nell'Ethereum basato sulla Prova di lavoro (PoW), le riorganizzazioni ex-post sono difficili ma non irrealizzabili. Un minatore con il 10% ha probabilità relativamente buone di minare alcuni blocchi di fila e, se l'incentivo è abbastanza alto (immaginate ci sia un blocco con 100 ether di MEV da catturare), allora forse una percentuale di successo dell'uno percento potrebbe effettivamente essere sufficiente per far sì che valga la pena tentare di riorganizzare.

#### Riorganizzazioni ex-post nella Proof-of-Stake (PoS) (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Nella Proof-of-Stake (PoS) è tutta un'altra storia. Stiamo parlando di una quantità assurda di stake richiesta. Vi illustrerò come si potrebbe procedere solo per sottolineare quanto sia ridicolmente difficile.

Forse prima alcune nozioni di base. Il tempo nella Proof-of-Stake (PoS) di Ethereum avanza in slot. Ogni slot dura 12 secondi. In ogni slot ci sono due ruoli: c'è un proponente (esattamente un proponente) e un comitato di migliaia di attestatori che dovrebbero fornire un'attestazione per i blocchi che sentono sul livello P2P. Determinano la testa della catena eseguendo la scelta del fork, che è fondamentalmente una funzione che prende in input l'albero dei blocchi e restituisce la testa della catena.

Si suppone che si fornisca un'attestazione ai blocchi se si sente un blocco valido, o a quattro secondi dall'inizio di uno slot, a seconda di quale evento si verifichi per primo. Quindi, se per qualche motivo il proponente del blocco N+1 è offline e non c'è alcun blocco a quattro secondi dall'inizio dello slot, si attesta il blocco N. Se lo si sente in tempo, si attesta il blocco N+1. Semplice.

Tutte queste attestazioni danno peso ai blocchi, e questo peso viene utilizzato dalla scelta del fork per determinare quale sia l'ultima testa.

Ora esaminiamo una riorganizzazione di un blocco. All'inizio, tutto procede normalmente: tutti attestano il blocco N, persino l'attaccante. Poi N+1 viene costruito sopra N e, poiché l'attaccante non vuole dare peso al blocco che sta cercando di escludere con la riorganizzazione, attesta invece il blocco N. Il blocco N sta guadagnando molto peso perché l'attaccante ha due terzi del comitato, il che significa che deve controllare, grosso modo, due terzi dell'intero stake.

Un terzo delle persone oneste ha attestato N+1, due terzi N. Ora arriva il blocco N+2: ovviamente l'attaccante lo costruisce su N e attesta il proprio blocco. Dal punto di vista dei validatori onesti, N+1 è ancora in vantaggio in termini di peso perché sia N+1 che N+2 ereditano l'intero peso del blocco N, ma N+1 ha anche questo terzo di attestazioni che manca a N+2.

Se facciamo i conti: il blocco N+1 ha attestazioni che valgono un terzo più un terzo, per un totale di due terzi, e anche il blocco N+2 ha due terzi. Per semplicità, supponiamo che lo spareggio vada a favore dell'attaccante. Allora N+3 vedrà N+2 come in vantaggio e costruirà su di esso.

Per darvi un'idea di quanto siano ridicole queste ipotesi: anche se aveste uno staker al 65%, per controllare due terzi del comitato in un dato slot avete una probabilità dello 0,05%. Questo dimostra che il potere delle attestazioni parallele è reale: le riorganizzazioni ex-post sono incredibilmente difficili, se non virtualmente impossibili, nella Proof-of-Stake (PoS) di Ethereum.

#### Meccaniche di attacco delle riorganizzazioni ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Ora parlerò delle riorganizzazioni ex-ante. Questo attacco si basa su un articolo di Neuder e altri. Di recente abbiamo migliorato significativamente questo attacco. Abbiamo anche scritto un articolo al riguardo e siamo riusciti a caricarlo su arXiv appena in tempo.

Inoltre, ve lo dico subito: non preoccupatevi, ci sono delle mitigazioni. Saranno integrate prima di The Merge.

Come funziona un attacco di riorganizzazione ex-ante? Inizialmente, blocco N: tutto normale, tutti lo attestano. Ora siete il proponente di N+1. Lo proponete e lo attestate privatamente con un singolo validatore. Cosa importante, lo mantenete privato: non lo rilasciate e non lo propagate sul livello P2P.

Quello che succede è che le persone oneste non vedono il blocco N+1, quindi attesteranno il blocco N. Questo è il trucco: ereditate quel peso e non dovete effettivamente combatterlo.

Supponiamo per il momento che la latenza sia zero. Nello slot N+2, ciò che facciamo come attaccanti è rilasciare il blocco N+1 e l'attestazione privata tutti nello stesso momento. I validatori onesti nello slot N+2 devono attestare un blocco. Dal loro punto di vista vedono il blocco N+2 e il blocco N+1 con questa singola attestazione privata. Se eseguono la scelta del fork scopriranno che il blocco N+1 ha più peso del blocco N+2, perché N+1 ha l'attestazione privata che N+2 non ha. Persino tutti i validatori onesti attesteranno effettivamente il blocco N+1. In N+3, banalmente, N+1 sarà visto come la testa della catena.

#### Latenza di rete e l'attacco (10:25) {#network-latency-and-the-attack-1025}

Ho ipotizzato una latenza zero, che ovviamente non è come funziona nella realtà. C'è latenza: ci vuole tempo per propagare blocchi e messaggi sul livello P2P.

Il modo in cui un attaccante può comunque portare a termine questo tipo di attacco è avendo molti nodi in diverse posizioni sulla topologia P2P. Quando il proponente onesto nello slot N+2 propone quel blocco, ne venite a conoscenza molto presto nel processo di propagazione. Di conseguenza, potete rilasciare il vostro blocco privato da tutte queste diverse posizioni in modo tale che la maggioranza venga a conoscenza del blocco N+1 prima di venire a conoscenza del blocco N+2, il che significa che vedono che il blocco N+1 è in vantaggio in termini di peso e lo attesteranno effettivamente.

Per sottolineare di nuovo cosa sta succedendo qui: abbiamo un proponente con un singolo attestatore che riesce a portare a termine una riorganizzazione di un blocco. Non è l'ideale, a dir poco.

#### Strategie di bilanciamento per riorganizzazioni più lunghe (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Se volete fare le cose in grande, potete portare a termine riorganizzazioni più lunghe utilizzando una strategia di bilanciamento. L'idea è di dividere il comitato onesto in diverse visioni della catena.

Rilasciate il vostro blocco privato in modo tale che circa la metà dei nodi onesti venga a conoscenza del vostro blocco privato e dell'attestazione prima di venire a conoscenza del blocco N+2, in modo che attestino il vostro blocco. Per l'altra metà volete che non sentano il vostro blocco prima di attestare N+2.

Ora avete metà del comitato onesto che attesta N+1 e l'altra metà che attesta N+2. In che modo questo aiuta? Il comitato onesto ora si annulla a vicenda, e voi come attaccanti non dovete nemmeno combatterli, il che è fondamentalmente il sogno di ogni attaccante che si avvera.

Scorrendo il diagramma: blocco N tutto normale, blocco N+1 stessa storia, non lo rilasciate. I validatori onesti attestano il blocco N. Arriva il blocco N+2, ne venite a conoscenza in anticipo e rilasciate il blocco N+1 con un'attestazione (il "voto decisivo") in modo tale che metà del comitato onesto lo veda prima e metà dopo. Metà vota per N+1, l'altra metà per N+2. In realtà volete una divisione sbilanciata di uno in modo tale che N+2 abbia un'attestazione in più, così N+3 costruisce su N+2 e mantiene in corso la riorganizzazione.

Per portare a termine una riorganizzazione di due blocchi: viene proposto il blocco N+3, lo sentite in anticipo, rilasciate il blocco N+1 e le vostre due attestazioni rimanenti, inondando il livello P2P in modo che la maggioranza delle persone oneste voti per il blocco N+1, in modo tale che abbia più peso del blocco N+3 e N+4 venga costruito sopra N+1.

Se ci pensate, è relativamente economico fare queste riorganizzazioni con queste premesse. Anche se non avete divisioni perfette, poiché il livello P2P è così grande avete una distribuzione di probabilità che potete prendere di mira in modo tale che il costo dell'attacco cresca in base alla radice quadrata della dimensione del comitato.

#### Mitigazione del boost del proponente (15:17) {#proposer-boost-mitigation-1517}

Parliamo della mitigazione. Qual è l'idea di base? Daremo al proponente un po' più di potere. Se un blocco valido arriva in tempo, aumentiamo il peso di questo blocco per la durata dello slot. Una volta terminato quello slot, riprendiamo il consueto punteggio LMD-GHOST e tutto torna alla normalità.

Quindi, se il blocco N+2 viene proposto in tempo ed è valido, questo blocco avrà un boost del proponente, diciamo dell'80% della dimensione del comitato. Ora questa piccola e carina attestazione N+1 dell'attaccante non funzionerà. Assolutamente no.

Anche la questione del bilanciamento non funziona più perché avete una divisione 50/50 ma il boost la spinge sempre in una direzione. Non c'è modo di mantenere quella divisione 50/50.

L'idea è che con questa mitigazione in atto, le attestazioni dell'avversario devono competere con il boost per convincere i validatori onesti a votare secondo i loro desideri. Questo rompe le strategie di bilanciamento e proibisce fondamentalmente tutte le riorganizzazioni. Buone notizie: c'è una PR aperta, quindi fondamentalmente sarà integrata prima di The Merge.

#### Punti chiave (16:48) {#key-takeaways-1648}

Alcuni punti chiave. Ho parlato delle differenze tra le riorganizzazioni ex-post ed ex-ante. Ho delineato brevemente i diversi scenari per le riorganizzazioni nella Prova di lavoro (PoW) rispetto alla Proof-of-Stake (PoS). Vi ho mostrato come portare a termine una riorganizzazione ex-ante ma anche, cosa importante, come risolverla.

Se siete interessati a questo, c'è un articolo: molto più dettagliato, più sfumato. Le diapositive verranno caricate. Venite a parlarmi se siete interessati, e potete trovarmi anche su Twitter.

Spero che questo sia stato interessante per voi. Grazie mille.