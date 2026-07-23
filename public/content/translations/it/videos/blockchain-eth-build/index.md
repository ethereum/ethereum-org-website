---
title: "Blockchain — ETH.BUILD"
description: "Una dimostrazione di come funziona il minaggio della blockchain, incluso come i blocchi sono collegati in una catena, come la Prova di lavoro (PoW) protegge le blockchain e cosa succede quando qualcuno cerca di manomettere i dati."
lang: it
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Blockchain (ETH.BUILD)"
---

Un tutorial di **Austin Griffith** che dimostra come funziona il minaggio della blockchain utilizzando lo strumento di programmazione visiva ETH.BUILD. Austin tratta il consenso della Prova di lavoro (PoW), il concatenamento dei blocchi, la difficoltà di minaggio, le ricompense del blocco e l'immutabilità della catena.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) pubblicata da Austin Griffith. È stata leggermente modificata per facilitarne la lettura.*

#### Il problema del coordinamento (0:00) {#the-problem-of-coordination-000}

Buongiorno, felice venerdì del papillon! Questo ETH.BUILD si concentra sulla blockchain — una cosa davvero fantastica. Siamo in questa barca da clown, con il nostro papillon Bitcoin per l'occasione. Iniziamo.

Quindi, nel programma finora, abbiamo esaminato coppie di chiavi, hash e registri. Quello che abbiamo scoperto è che se vogliamo scambiare valore avanti e indietro su una rete distribuita — non centralizzata — finiamo per avere problemi di coordinamento. Finiamo per avere questo problema in cui non riusciamo a trovare un consenso tra parti disparate perché tutte ricevono transazioni diverse in momenti diversi. Ci sono molti modi diversi per risolvere questo problema, ma nessuno di essi era eccezionale finché non è arrivata la Prova di lavoro (PoW).

Abbiamo trattato i generali bizantini come missione secondaria, e ciò che abbiamo imparato lì è che i generali dovevano dimostrare di avere un esercito quando inviavano messaggi su una rete non sicura. In questo modo, la parte ricevente poteva capire che quella persona era effettivamente un generale con un esercito pronto ad attaccare, e potevano coordinarsi.

#### I blocchi e il nonce (1:04) {#blocks-and-the-nonce-104}

Quindi, con questo registro, stiamo immettendo transazioni dalla rete. Invece di far sì che ogni singolo utente dimostri il proprio lavoro, astrarremo la Prova di lavoro (PoW) in un blocco di transazioni e lasceremo che un minatore ci lavori sopra.

Introduciamo un blocco che contiene transazioni: qualsiasi cosa arrivi attraverso la rete, la carichiamo in questo blocco. Se guardiamo la struttura di questo blocco, ha anche un nonce. Quel nonce ci permette di modificare l'hash. Se prendiamo l'intero blocco, lo convertiamo in stringa e ne facciamo l'hashing, otteniamo un hash. Quando le transazioni cambiano, quell'hash cambia, ma anche quando cambiamo il nonce, l'hash cambia.

Stiamo facendo un po' di lavoro qui: abbiamo un insieme casuale di transazioni e stiamo cambiando il nonce finché l'hash non ha uno zero iniziale. Se hai guardato la missione secondaria sui generali bizantini, abbiamo scelto questo zero iniziale come quantità arbitraria di lavoro da dimostrare. Quindi il nonce passa semplicemente attraverso ogni numero — uno, due, tre, quattro — e quando otteniamo uno zero iniziale, diciamo: quello è un blocco valido.

#### La Prova di lavoro in azione (3:00) {#proof-of-work-in-action-300}

Se prendiamo un blocco minato, estraiamo l'hash e lo inseriamo in una funzione di hash, possiamo dimostrare che ha uno zero iniziale: possiamo dimostrare che si è lavorato su questo blocco.

La funzione di hash costa CPU, che è una risorsa limitata. Stiamo impiegando tutta la nostra potenza di CPU cercando di trovare un hash con zeri iniziali. Una volta fatto, abbiamo un blocco valido: il blocco è fondamentalmente congelato. Qualsiasi transazione fosse presente in quel momento è ora in questo blocco, e tutti lo rispettano, e possiamo passare al blocco successivo.

#### Concatenare i blocchi (3:56) {#chaining-blocks-together-356}

Ecco il trucco: prendiamo il vecchio blocco e lo colleghiamo al nuovo blocco. Se guardiamo la struttura, il nuovo blocco non ha transazioni e ha un nonce vuoto, ma ha un genitore con delle transazioni. Il blocco precedente farà parte del blocco successivo, quindi avremo un'intera catena.

Inseriamo le ultime transazioni dalla pool di transazioni e lavoriamo per trovare un nonce. Il blocco numero due è minato: avevamo bisogno di un nonce pari a dieci per rendere valide queste transazioni. Poi facciamo la stessa cosa: colleghiamo il vecchio blocco, introduciamo quello nuovo, inseriamo le ultime transazioni e ci lavoriamo di nuovo. Dopo un numero sufficiente di tentativi abbiamo trovato un nonce per il blocco tre. Blocco quattro: stesso processo, e continuiamo ad andare avanti.

#### Difficoltà di minaggio (5:02) {#mining-difficulty-502}

Questo è troppo facile: riusciamo a trovare un blocco valido molto rapidamente, e vogliamo che sia più difficile. Aumenterò la difficoltà a due. Colleghiamo il blocco cinque, introduciamo le ultime transazioni e facciamo partire un contatore. Ora stiamo minando: usiamo la nostra limitata potenza di CPU per lanciare arbitrariamente hash casuali contro questo finché non troviamo un hash con due zeri iniziali, perché la difficoltà è stata aumentata. Ci vorrà un po'.

Ora abbiamo questa blockchain di cinque blocchi. Quei blocchi contengono transazioni e ognuno fa riferimento a quello precedente. Ogni blocco ha richiesto una quantità arbitraria di lavoro per essere prodotto, e la quantità di lavoro è controllata dalla difficoltà.

#### Il minatore (6:46) {#the-miner-646}

Diamo un'occhiata a cos'è un minatore. Nel problema dei generali bizantini, il generale che voleva "attaccare all'alba" aveva bisogno di soldati. Quello che succede all'interno di ogni soldato è esattamente quello che stiamo facendo qui con il nostro minatore: stiamo prendendo un messaggio e un nonce e li stiamo lanciando in una funzione di hash il più velocemente possibile, cercando di ottenere quegli zeri iniziali. Gli zeri iniziali sono una cosa arbitraria su cui tutti siamo d'accordo: questo è un lavoro sufficiente per dimostrare che sei un soldato, o che puoi fare la guerra.

Lasciatemi introdurre un minatore e fare questo un po' più velocemente. Il minatore farà la stessa cosa per i nostri blocchi: prende le transazioni in arrivo dalla pool di transazioni, le immette nel blocco e ci lavora semplicemente finché non trova un hash valido.

Il minatore è un po' più efficiente. È più concentrato sul minaggio. Sta lanciando hash in modo casuale: è esattamente quello che faceva il nostro minatore prima, solo in modo astratto. Possiamo vederlo all'opera in background, mentre macina hash. L'ha trovato: il blocco sei è minato.

#### Doppie spese e propagazione di rete (10:00) {#double-spends-and-network-propagation-1000}

Ora abbiamo parlato di questo problema della doppia spesa, e anche di questo problema della propagazione di rete. Quando abbiamo un registro e una rete distribuita e qualcuno invia una transazione, questa arriva a persone diverse in momenti diversi. Pertanto, potremmo avere due minatori là fuori sulla rete che minano entrambi un blocco esattamente nello stesso momento, e hanno transazioni diverse al loro interno.

Ognuno è valido in quel momento: entrambi hanno eseguito la Prova di lavoro (PoW), entrambi hanno zeri iniziali. Ma non possono essere entrambi canonici. Non possono essere entrambi la verità. Quindi abbiamo bisogno di un modo affinché la rete raggiunga il consenso su quale sia la vera catena.

#### Minatori multipli e consenso (12:27) {#multiple-miners-and-consensus-1227}

Lasciatemi prendere questo blocco e spostarlo qui. Quello che voglio sono due minatori diversi che lavorano allo stesso problema, che in un certo senso ascoltano la stessa pool di transazioni e producono blocchi in modo indipendente. Abbiamo due minatori: Mallory e Mike. Ho impostato la difficoltà a tre, ed entrambi stanno lavorando per trovare un hash con tre zeri iniziali.

Quindi Mallory ha trovato un blocco per prima! Ottimo. Ora cosa succede: poiché siamo su una rete distribuita, Mike potrebbe non sapere ancora del blocco di Mallory. Potrebbe stare ancora lavorando alla sua versione. E ora ne ha trovato uno anche Mike. Quindi abbiamo due percorsi validi.

Se sei un peer sulla rete e vedi prima il blocco di Mallory, pensi che quello sia il blocco principale. Poi più tardi arriva il blocco di Mike. Li tieni entrambi in caso uno di essi diventi la catena più lunga. E la regola è: segui la catena valida più lunga.

#### Coinbase e ricompense del blocco (15:33) {#coinbase-and-block-rewards-1533}

Quando un minatore mina un blocco, diciamo: ecco tutte le transazioni che vogliamo, ecco il nonce, ecco il genitore — ma diremo anche ecco la persona che ha minato quel blocco. Si chiama coinbase — credo ci sia un'azienda che si chiama così ora, ma è diverso. Lo chiameremo semplicemente "minatore". Quindi i nostri blocchi ora richiedono un campo minatore.

Quindi Mike ha appena trovato il blocco, e Mike otterrà anche un valore di dieci da questo. Dobbiamo incentivare i minatori a fare tutto questo lavoro, giusto? Stanno spendendo soldi per comprare questi impianti per rendere fondamentalmente sicura la rete. Questi minatori stanno spendendo soldi per proteggere la rete con tutta la loro potenza di hash: con tutti i minatori combinati, forse decine di migliaia. Stanno pagando bei soldi per costruire impianti che lavorano su questi hash, e per incentivarli diamo loro una quota chiamata ricompensa del blocco per ogni blocco che minano.

#### Ricompense del blocco e incentivi (16:52) {#block-rewards-and-incentives-1652}

Quindi in questa versione del blocco, Mallory ha dieci dollari, ma in questa versione Mike ha dieci dollari. Ognuno di questi due giocatori è incentivato a continuare lungo la propria catena, e il resto della rete deve trovare un consenso. Fondamentalmente si riduce a chi ha la catena valida più lunga.

Mike imposterà il suo blocco come genitore e inizierà a lavorare sul blocco successivo. Mallory farà la stessa cosa. E tutto si riduce a chi altro sulla rete si schiera da quale parte. Poiché non vogliamo punire le persone con reti scadenti, sono abbastanza sicuro che in Ethereum paghiamo i blocchi uncle (blocchi zio) — blocchi validi che non sono entrati nella catena più lunga — perché stanno comunque aiutando a proteggere la rete.

Avevamo questo problema di coordinamento e consenso, e lo abbiamo risolto inserendo questa quantità arbitraria di lavoro che deve essere coinvolta per rendere valide le transazioni. Mallory ha fatto tutto questo lavoro di hashing e hashing e hashing per trovare tre zeri iniziali di un hash di tutte queste transazioni e del blocco precedente.

#### Interrogare la blockchain (18:30) {#querying-the-blockchain-1830}

Possiamo comunicare con qualsiasi sia la catena più lunga. Mike non è ancora arrivato a sette, quindi possiamo vedere che l'altezza è ancora sei qui. E possiamo fare cose come interrogare i saldi delle persone. Quindi premiamo saldo: cosa otteniamo? Cinque e ventiquattro. Quindi Heidi è rimasta seduta su 524 o qualunque sia il token nativo per questa catena. Possiamo vedere il suo nonce, possiamo fare tutto ciò che potevamo fare con il registro, ma ora stiamo impilando blocchi e quei blocchi contengono transazioni.

Abbiamo astratto il lavoro dagli utenti, che stanno solo inviando denaro, ai minatori, e li abbiamo incentivati dando loro questa ricompensa del blocco. Ci sarà anche una piccola somma che ogni persona paga per transazione, ma ci arriveremo in un episodio successivo. Non vogliamo parlare di gas in questo momento, ma è utile sapere che c'è un incentivo non solo a minare un blocco, ma a minare un blocco pieno con molte transazioni. Ma questo è un incentivo minore: ci arriveremo prima o poi.

#### Immutabilità della catena (19:51) {#chain-immutability-1951}

Man mano che i blocchi vengono minati, diventano sempre più sicuri. Lasciatemi mostrare cosa intendo. Quindi Mike ha minato un blocco, Mallory era qui a fare una dimostrazione e non è riuscita a minare un blocco. Quindi ora la catena di Mike sarà la più lunga e attraverserà la rete. Tutti la vedranno e diranno: ok, questa catena ha sette blocchi, sono tutti validi — questa è quella che seguiremo. Si possono avere hard fork, fork controversi, in cui le regole con cui stiamo giocando cambieranno e diversi gruppi di esseri umani vorranno seguire catene diverse. Roba forte.

Ok, infine, se torniamo al blocco tre e cambiamo qualcosa — cambiamo un qualsiasi piccolo dettaglio — entrerò qui. C'è una transazione per Frank. Diciamo che invece di Frank la cambiamo in Eve. Ora guardate cosa succede quando premo ok: guardate un po'. Ho cambiato un piccolissimo pezzo del blocco tre e all'improvviso l'intera catena cade a pezzi. Non è più valida. Se dovessi trasmetterla sulla rete, la gente mi riderebbe in faccia.

Non puoi cambiare nulla una volta che un blocco è minato, a meno che tu non torni indietro e rimini le cose man mano che cambiano. Dovrei fondamentalmente ricollegare il minatore qui e cercare di avere abbastanza potenza per raggiungere Mike fin quaggiù con sette blocchi. Sarebbe molto, molto difficile. Più un blocco è profondo, più è difficile tornare indietro. Il fatto che questo blocco tre qui dove Carlos ha inviato 84 a Bob — Bob può essere abbastanza sicuro sapendo che, a più blocchi di profondità, quei soldi ci sono di sicuro. Non c'è modo che ci sia qualche fork controverso qui — sono al sicuro. Questo è ciò che chiamiamo definitività.

#### Riepilogo (22:00) {#summary-2200}

Invece di avere un registro e questo problema di consenso, usiamo la Prova di lavoro (PoW) per macinare un hash per convalidare un blocco — e "valido" significa un numero arbitrario di zeri iniziali. Incontreremo ancora problemi mentre costruiamo la catena di blocchi, dove i blocchi minati possono effettivamente arrivare in posti diversi in momenti diversi. Quindi abbiamo un ulteriore algoritmo di consenso che dice: segui la catena più lunga che è valida e che segue l'insieme di regole a cui desideri partecipare.

Va bene, felice venerdì del papillon! Questa era la blockchain su ETH.BUILD. Salverò questo e lo metterò lì in modo che tu possa semplicemente premere "carica" e avere una catena con cui giocare. Buon venerdì!