---
title: Gasper
description: Una spiegazione del meccanismo Proof-of-Stake di Gasper.
lang: it
---

Gasper è una combinazione di Casper the Friendly Finality Gadget (Casper FFG) e dell'algoritmo di scelta del fork LMD-GHOST. Insieme, questi componenti formano il meccanismo di consenso che protegge Ethereum in Proof-of-Stake (PoS). Casper è il meccanismo che promuove determinati blocchi a "finalizzati" in modo che i nuovi partecipanti alla rete possano essere certi di sincronizzare la catena canonica. L'algoritmo di scelta del fork utilizza i voti accumulati per garantire che i nodi possano selezionare facilmente quella corretta quando si verificano dei fork nella blockchain.

**Nota** che la definizione originale di Casper FFG è stata leggermente aggiornata per l'inclusione in Gasper. In questa pagina consideriamo la versione aggiornata.

## Prerequisiti {#prerequisites}

Per comprendere questo materiale è necessario leggere la pagina introduttiva sulla [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Il ruolo di Gasper {#role-of-gasper}

Gasper si basa su una blockchain Proof-of-Stake in cui i nodi forniscono ether come deposito cauzionale che può essere distrutto se sono pigri o disonesti nel proporre o validare i blocchi. Gasper è il meccanismo che definisce come i validatori vengono ricompensati e puniti, decidono quali blocchi accettare e rifiutare e su quale fork della blockchain costruire.

## Cos'è la definitività? {#what-is-finality}

La definitività è una proprietà di determinati blocchi che significa che non possono essere annullati a meno che non si sia verificato un fallimento critico del consenso e un utente malintenzionato abbia distrutto almeno 1/3 degli ether totali in stake. I blocchi finalizzati possono essere considerati come informazioni di cui la blockchain è certa. Un blocco deve passare attraverso una procedura di promozione in due fasi per essere finalizzato:

1. Due terzi degli ether totali in stake devono aver votato a favore dell'inclusione di quel blocco nella catena canonica. Questa condizione promuove il blocco a "giustificato". È improbabile che i blocchi giustificati vengano annullati, ma possono esserlo in determinate condizioni.
2. Quando un altro blocco viene giustificato sopra un blocco giustificato, viene promosso a "finalizzato". Finalizzare un blocco è un commitment a includere il blocco nella catena canonica. Non può essere annullato a meno che un utente malintenzionato non distrugga milioni di ether (miliardi di dollari USA).

Queste promozioni dei blocchi non avvengono in ogni slot. Invece, solo i blocchi al confine dell'epoca possono essere giustificati e finalizzati. Questi blocchi sono noti come "checkpoint". La promozione considera coppie di checkpoint. Deve esistere un "collegamento di supermaggioranza" tra due checkpoint successivi (ovvero, due terzi degli ether totali in stake che votano che il checkpoint B è il discendente corretto del checkpoint A) per promuovere il checkpoint meno recente a finalizzato e il blocco più recente a giustificato.

Poiché la definitività richiede un accordo di due terzi sul fatto che un blocco sia canonico, un utente malintenzionato non può in alcun modo creare una catena finalizzata alternativa senza:

1. Possedere o manipolare due terzi degli ether totali in stake.
2. Distruggere almeno un terzo degli ether totali in stake.

La prima condizione si verifica perché sono necessari due terzi degli ether in stake per finalizzare una catena. La seconda condizione si verifica perché se due terzi dello stake totale hanno votato a favore di entrambi i fork, allora un terzo deve aver votato su entrambi. Il doppio voto è una condizione di slashing che verrebbe punita al massimo e un terzo dello stake totale verrebbe distrutto. A partire da maggio 2022, ciò richiede a un utente malintenzionato di bruciare circa 10 miliardi di dollari in ether. L'algoritmo che giustifica e finalizza i blocchi in Gasper è una forma leggermente modificata di [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incentivi e Slashing {#incentives-and-slashing}

I validatori vengono ricompensati per aver proposto e validato onestamente i blocchi. Gli ether vengono assegnati come ricompensa e aggiunti al loro stake. D'altra parte, i validatori che sono assenti e non agiscono quando chiamati in causa perdono queste ricompense e a volte perdono una piccola porzione del loro stake esistente. Tuttavia, le penalità per essere offline sono piccole e, nella maggior parte dei casi, ammontano ai costi opportunità delle ricompense perse. Tuttavia, alcune azioni dei validatori sono molto difficili da compiere accidentalmente e indicano un intento malevolo, come proporre più blocchi per lo stesso slot, attestare più blocchi per lo stesso slot o contraddire i voti dei checkpoint precedenti. Questi sono comportamenti passibili di "slashing" che vengono penalizzati più duramente: lo slashing comporta la distruzione di una parte dello stake del validatore e la rimozione del validatore dalla rete dei validatori. Questo processo richiede 36 giorni. Il giorno 1, c'è una penalità iniziale fino a 1 ETH. Quindi gli ether del validatore penalizzato dallo slashing si esauriscono lentamente durante il periodo di uscita, ma il giorno 18 ricevono una "penalità di correlazione", che è maggiore quando più validatori subiscono lo slashing nello stesso periodo. La penalità massima è l'intero stake. Queste ricompense e penalità sono progettate per incentivare i validatori onesti e disincentivare gli attacchi alla rete.

### Perdita per inattività {#inactivity-leak}

Oltre alla sicurezza, Gasper fornisce anche una "vivacità plausibile" (plausible liveness). Questa è la condizione per cui, finché due terzi degli ether totali in stake votano onestamente e seguono il protocollo, la catena sarà in grado di finalizzare indipendentemente da qualsiasi altra attività (come attacchi, problemi di latenza o slashing). Detto in altro modo, un terzo degli ether totali in stake deve essere in qualche modo compromesso per impedire alla catena di finalizzare. In Gasper, c'è un'ulteriore linea di difesa contro un fallimento della vivacità, nota come "perdita per inattività". Questo meccanismo si attiva quando la catena non è riuscita a finalizzare per più di quattro epoche. I validatori che non stanno attestando attivamente la catena di maggioranza vedono il loro stake gradualmente prosciugato fino a quando la maggioranza non riacquista i due terzi dello stake totale, garantendo che i fallimenti della vivacità siano solo temporanei.

### Scelta del fork {#fork-choice}

La definizione originale di Casper FFG includeva un algoritmo di scelta del fork che imponeva la regola: `follow the chain containing the justified checkpoint that has the greatest height` dove l'altezza è definita come la distanza maggiore dal blocco genesi. In Gasper, la regola originale di scelta del fork è deprecata a favore di un algoritmo più sofisticato chiamato LMD-GHOST. È importante rendersi conto che in condizioni normali, una regola di scelta del fork non è necessaria: c'è un singolo proponente del blocco per ogni slot e i validatori onesti lo attestano. È solo in casi di grande asincronia della rete o quando un proponente del blocco disonesto ha equivocato che è richiesto un algoritmo di scelta del fork. Tuttavia, quando si verificano questi casi, l'algoritmo di scelta del fork è una difesa critica che protegge la catena corretta.

LMD-GHOST sta per "latest message-driven greedy heaviest observed sub-tree". Questo è un modo ricco di gergo per definire un algoritmo che seleziona il fork con il maggior peso accumulato di attestazioni come quello canonico (greedy heaviest subtree) e che se vengono ricevuti più messaggi da un validatore, viene considerato solo l'ultimo (latest-message driven). Prima di aggiungere il blocco più pesante alla sua catena canonica, ogni validatore valuta ciascun blocco utilizzando questa regola.

## Letture consigliate {#further-reading}

- [Gasper: combinare GHOST e Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)