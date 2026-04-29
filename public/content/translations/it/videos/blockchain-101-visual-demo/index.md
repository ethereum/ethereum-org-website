---
title: "Blockchain 101: una demo visiva"
description: "Una dimostrazione di come funziona la tecnologia blockchain, che copre hashing, blocchi, catene, registri distribuiti e token per rendere i concetti della blockchain tangibili e intuitivi."
lang: it
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "crittografia"
format: presentation
author: Anders Brownworth
breadcrumb: "Blockchain 101"
---

La dimostrazione visiva di Anders Brownworth su come funziona la tecnologia blockchain, inclusa una panoramica che copre l'hashing SHA-256, i blocchi, il minaggio, le blockchain, i registri distribuiti, i token e altro ancora.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=_160oMzblY8) pubblicata da Anders Brownworth. È stata leggermente modificata per facilitarne la lettura.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

Questa è una demo sulla blockchain. Lo faremo in modo molto visivo: lo renderemo molto facile da capire analizzando passo dopo passo gli elementi chiave di cos'è una blockchain.

Prima di iniziare, dobbiamo dare un'occhiata a questa cosa chiamata hash SHA-256. Un hash sembra un mucchio di numeri casuali e, essenzialmente, è un'impronta digitale di alcuni dati digitali. Si dà il caso che sia un'impronta digitale di qualsiasi cosa io digiti in questa casella. Se digito il mio nome "Anders" in questa casella, vedete che l'hash è cambiato. Di fatto, è cambiato ogni volta che ho digitato una lettera.

Quindi questo è l'hash del nome "Anders", tutto in minuscolo: inizia con `19ea`. Se lo cancello e digito di nuovo "Anders", potete vedere che inizia con `19ea`: lo stesso identico hash. In questo senso è un'impronta digitale di questi dati. Qualsiasi dato ci sia qui, ogni volta che digitate esattamente gli stessi dati ottenete esattamente lo stesso hash.

Posso digitare qualsiasi cosa io voglia. Potete non avere nulla — `e3b0` — questo è l'hash del nulla. Oppure potreste digitare tonnellate e tonnellate di roba. Di fatto, potreste inserire qui la Biblioteca del Congresso e otterreste un hash. La cosa interessante è che, indipendentemente dal fatto che ci sia una piccolissima quantità di informazioni, nessuna informazione o l'intera Biblioteca del Congresso, otterrete sempre un hash di questa lunghezza. Non sarete in grado di indovinare in anticipo quale sia: dovete in un certo senso inserire i dati per capire quale sia l'hash, ma otterrete sempre esattamente lo stesso hash indipendentemente da quante volte inserite esattamente le stesse informazioni.

#### Blocco (2:10) {#block-210}

Quello che farò è estendere questa idea di hash in qualcosa che chiameremo blocco. Un blocco è esattamente come l'hash, ma la sezione dei dati è stata suddivisa in tre sezioni: una chiamata "blocco" (solo un numero, questo è il blocco numero 1), un "nonce" (che è solo un altro numero) e poi alcuni dati proprio come avevamo prima.

L'hash di tutte queste informazioni è qui sotto e inizia con quattro zeri. È un hash relativamente insolito: la maggior parte di essi non inizierà con quattro zeri in quel modo. Ma questo sì, e poiché lo fa, in modo del tutto arbitrario, dirò che questo blocco è "firmato".

Cosa succederebbe se cambiassi una qualsiasi parte di queste informazioni? Diciamo che digito qualcosa qui: l'hash cambierà, e qual è la probabilità che inizi con quattro zeri? Piuttosto bassa. Dirò semplicemente "ciao": guardate un po', questo hash non inizia con quattro zeri e lo sfondo è diventato rosso. Quindi ora sapete che questo blocco con queste informazioni al suo interno non è un blocco valido o firmato.

È qui che entra in gioco il nonce. Il nonce è solo un numero che potete impostare per cercare di trovare un valore che faccia iniziare di nuovo l'hash con quattro zeri. Potrei stare seduto qui tutto il giorno a digitare numeri, ma ho questo piccolo pulsante "Mine" (Mina). Quello che succederà quando lo premerò è che scorrerà tutti i numeri da 1 in su per cercare di trovarne uno in cui l'hash inizia con quattro zeri. Questo processo è chiamato minaggio.

Si è fermato a 59.396, e si dà il caso che questo produca un hash che inizia con quattro zeri. Soddisfa la mia definizione di cosa sia un blocco firmato.

#### Blockchain (5:16) {#blockchain-516}

Quindi sapete dirmi cos'è una blockchain? Probabilmente è solo una catena di questi blocchi. Ecco la mia blockchain: il blocco numero uno ha un nonce proprio come prima, un'area dati, ma poi ha questo campo "precedente" (previous) che è un mucchio di zeri. Andando avanti, questo è il blocco due, il blocco tre, il blocco quattro: questa blockchain ha cinque blocchi.

Il campo "precedente" per ogni blocco è l'hash del blocco che lo precede. Potete vedere che ogni blocco punta all'indietro a quello precedente. Quel primo blocco non ha alcun precedente, quindi è solo un mucchio di zeri.

Cosa succede se cambio alcune informazioni qui? Cambierà l'hash di questo blocco e lo invaliderà. Ma cosa succede se cambio qualcosa in un blocco precedente? Cambierà quell'hash, ma quell'hash viene copiato nel campo "precedente" del blocco successivo, quindi rompe entrambi i blocchi. Possiamo tornare indietro quanto vogliamo a un certo punto nel passato e rompere quel blocco, e questo romperà tutti i blocchi da quel momento in poi. Tutto ciò che lo precede è ancora verde, ma tutto ciò che lo segue diventa rosso.

Se vado a cambiare l'ultimo blocco, tutto ciò che devo fare è minare di nuovo quel singolo blocco. Se torno molto indietro nel tempo e faccio un cambiamento, devo minare questo, questo, questo e questo. Più blocchi passano, più diventa difficile apportare un cambiamento. È così che una blockchain resiste alle mutazioni: resiste ai cambiamenti.

#### Blockchain distribuita (9:18) {#distributed-blockchain-918}

Quindi come farei a sapere se la mia blockchain è stata minata di nuovo? Ora abbiamo una blockchain distribuita. Sembra esattamente come l'ultima blockchain, ma questo è il Peer A. Se andate qui sotto, potete vedere il Peer B, e ha una copia esatta della blockchain. C'è anche un Peer C: questo potrebbe andare avanti all'infinito. Ci sono molti peer su internet e tutti hanno una copia completa della blockchain.

Se guardo questo hash, è `e4b`. Se scendo a quello successivo, ha anch'esso `e4b`. Devono essere identici. Ora, se vado qui e digito qualcosa, mino di nuovo questo blocco e poi mino i blocchi successivi, tutte le catene sono verdi. Tuttavia, questa catena dice che l'ultimo hash è `e4b`, anche quella in basso dice `e4b`, e questa in mezzo dice `4cae`.

Quindi so, solo dando un'occhiata a questo piccolo hash, che c'è qualcosa di sbagliato in questa blockchain. Anche se tutti gli hash iniziano con quattro zeri, questo è diverso. È essenzialmente due contro uno: siamo una piccola democrazia qui. Quindi vince `e4b`. È così che avere una copia completamente distribuita su molti computer diversi vi permette di vedere rapidamente se tutti i blocchi sono identici.

Le blockchain possono avere 400.000 o 500.000 blocchi molto facilmente. Invece di controllarli tutti, tutto ciò che dovete fare in realtà è guardare l'hash di quello più recente, e potete vedere se qualcosa nel passato è stato alterato.

#### Token (12:17) {#tokens-1217}

Questo è tutto: non c'è nient'altro. Ma in un certo senso non è molto utile perché non abbiamo nulla nell'area dati che significhi qualcosa. Quello che vogliamo veramente è un token.

Ora ho questi token: in modo del tutto arbitrario, li chiamo dollari. Abbiamo venticinque dollari da Darcy a Bingley, quattro dollari e ventisette centesimi da Elizabeth a Jane: avete capito l'idea. Ci sono tutte queste transazioni in corso e ho semplicemente sostituito i dati con queste transazioni. Proprio come prima, se andiamo giù notiamo che abbiamo tutte queste altre copie della stessa blockchain.

È qui che l'immutabilità è importante. Se cambio qualcosa qui dietro, l'hash sarà diverso da quello sulle altre copie. È molto importante che se tornate indietro nel tempo e cambiate qualche valore, ce ne accorgeremmo. È molto importante con il denaro non perdere il conto, e questo è l'intero scopo dell'utilizzo di una blockchain: resistere a qualsiasi tipo di modifica alle cose che sono accadute nel passato.

Una cosa che vorrei menzionare: non stiamo elencando "Darcy ha cento dollari e ne sta dando 25 a Bingley". Stiamo solo ricordando i movimenti di denaro, non i saldi dei conti bancari. Questo fa sorgere la domanda: Darcy ha 25 dollari?

#### Transazione Coinbase (14:34) {#coinbase-transaction-1434}

Abbiamo un problema in questa versione della blockchain: in realtà non sappiamo se Darcy ha 25 dollari. Quindi diamo un'occhiata a una transazione Coinbase. Aggiungiamo una transazione Coinbase ai nostri blocchi: dice che inventeremo cento dollari dal nulla e li daremo ad Anders. Non ci sono altre transazioni in questo blocco perché nessuno aveva soldi prima di questo.

Nel blocco successivo, altri cento dollari spuntano dal nulla e vanno ad Anders. Ora abbiamo alcune transazioni: provengono tutte da Anders perché sono l'unico ad avere soldi a questo punto. Sto inviando dieci dei miei dollari a Sophie. Ho dieci dollari? Sì: guardo indietro e vedo che la transazione Coinbase me ne ha dati cento, quindi ne ho almeno dieci.

Li sommate tutti e non superano i cento. Segue una regola di base della valuta: non si può creare denaro dal nulla e la sua dispersione è controllata.

Se andiamo avanti nel tempo, vediamo che Jackson sta dando due dollari ad Alexa. Jackson ha davvero due dollari? Torniamo indietro di un blocco e vediamo che Emily aveva ricevuto dieci dollari da Anders e ne ha dati dieci a Jackson. Quindi Jackson ha i soldi. Possiamo andare a ritroso e scoprirlo: questo è uno dei vantaggi di avere il campo "precedente".

#### Conclusione (16:30) {#closing-1630}

Questa è una blockchain di base che esegue una valuta al di sopra di essa. Come sapete, le blockchain hanno molte copie: tutti ne hanno una copia. Se mutiamo qualcosa e lo facciamo diventare sei dollari, i blocchi diventano non validi e non concordano con le altre copie. Questo resiste alle manomissioni, che è ciò che si desidera per una valuta. Funziona molto bene per cose che sono piccole e transazionali.

Le blockchain sono un modo molto efficiente per gestire l'accordo su ciò che è accaduto nel passato: questa storia immutabile che si tramanda nel tempo. Stiamo sorvolando su alcuni punti principali, ma se approfondite la demo, cliccate su queste cose e ci giocate un po', avrete un'idea sempre migliore di come funziona.