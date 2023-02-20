---
title: Gasper
description: Una spiegazione del meccanismo di proof-of-stake di Gasper.
lang: it
---

Gasper è una combinazione di Casper the Friendly Finality Gadget (Casper-FFG) e dell'algoritmo di scelta della biforcazione LMD-GHOST. Insieme, questi componenti formano il meccanismo di consenso che protegge l'Ethereum proof-of-stake. Casper è il meccanismo che aggiorna certi blocchi a "finalizzati", così che i nuovi entranti nella rete possano essere certi che stanno sincronizzando la catena canonica. L'algoritmo di scelta della biforcazione usa i voti accumulati per assicurare che al sorgere di biforcazioni nella blockchain, i nodi possano facilmente selezionare quella corretta.

**Nota** che la definizione originale di Casper-FFG è stata lievemente aggiornata per essere inclusa in Gasper. In questa pagina consideriamo la versione aggiornata.

## Prerequisiti

Per comprendere questo materiale, è necessario leggere la pagina introduttiva sul [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Il ruolo di Gasper {#role-of-gasper}

Gasper si trova in cima a una blockchain proof-of-stake in cui i nodi forniscono ether come un deposito di sicurezza, che possono essere distrutti se sono inattivi o disonesti nel proporre o convalidare i blocchi. Gasper è il meccanismo che definisce come i validatori sono ricompensati e puniti, decide quali blocchi accettare e rifiutare e su quale biforcazione della blockchain costruire.

## Cos'è la finalità? {#what-is-finality}

La finalità è una proprietà di certi blocchi tale per cui non possono essere ripristinati, a meno che non si sia verificato un fallimento del consenso critico e che un utente malevolo non abbia distrutto almeno 1/3 dell'ether totale in staking. I blocchi finalizzati possono essere pensati come informazioni su cui la blockchain è certa. Affinché un blocco sia finalizzato, deve passare per una procedura d'aggiornamento in due passaggi:

1. Due terzi dell'ether in staking totale deve aver votato a favore dell'inclusione di quel blocco nella catena canonica. Questa condizione porta il blocco nello stato "giustificato". È improbabile che i blocchi giustificati siano ripristinati anche se in alcune condizioni è possibile.
2. Quando un altro blocco è giustificato sopra a un blocco giustificato, questo passa allo stato "finalizzato". Finalizzare un blocco corrisponde all'impegno a includere il blocco nella catena canonica. Non può essere ripristinato a meno che un utente malevolo distrugga milioni di ether (miliardi di $USD).

Questi aggiornamenti dei blocchi non si verificano in ogni slot. Al contrario sono giustificabili e finalizzabili solo i blocchi di confine di un'epoca. Questi blocchi sono noti come "punti di controllo" (checkpoint). L'aggiornamento considera coppie di punti di controllo. Per aggiornare il punto di controllo meno recente a finalizzato e il più recente a giustificato deve esistere un "collegamento di super-maggioranza" tra due punti di controllo successivi (es. due terzi dell'ether in staking totale ha votato affinché il punto di controllo B sia il discendente corretto del punto di controllo A).

Poiché la finalità richiede un accordo di due terzi per rendere un blocco canonico, un utente malevolo non può creare una catena finalizzata alternativa senza:

1. Possedere o manipolare due terzi dell'ether in staking totale.
2. Distruggere almeno un terzo dell'ether in staking totale.

La prima condizione sorge perché per finalizzare una catena servono due terzi dell'ether in staking. La seconda sorge perché se due terzi dello stake totale ha votato in favore di entrambe le biforcazioni, allora un terzo deve aver votato su entrambe. Il doppio voto è una condizione di slashing che subirebbe la punizione massima, con la distruzione di un terzo dello stake totale. A maggio 2022, questo richiederebbe a un utente malevolo di bruciare ether per un valore di circa $10 miliardi. L'algoritmo che giustifica e finalizza i blocchi in Gasper è una forma lievemente modificata di [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incentivi e slashing {#incentives-and-slashing}

I validatori sono ricompensati se propongono e convalidano onestamente dei blocchi. La ricompensa avviene sotto forma di Ether aggiunto al loro stake. Per contro, i validatori che sono assenti e non agiscono quando vengono invitati a farlo, perdono queste ricompense, e talvolta perdono una piccola porzione del loro stake esistente. Le sanzioni per essere offline sono comunque modeste e, nella maggior parte dei casi, ammontano al costo opportunità della mancata ricompensa. Tuttavia, è molto improbabile che alcune azioni dei validatori siano compiute accidentalmente e sono quindi indicative di qualche intento dannoso, come proporre più blocchi per lo stesso slot, attestare più blocchi per lo stesso slot o contraddire i voti del punto di controllo precedente. Si tratta di comportamenti sanzionati più duramente: lo slashing comporta la distruzione di una data parte dello stake del validatore e la sua esclusione dalla rete di validatori. Questo processo richiede 36 giorni. Al giorno 1, è prevista una sanzione iniziale di fino a 0,5 ETH. Successivamente, l'ether del validatore sanzionato "diminuisce" lentamente lungo il periodo d'uscita, ma al Giorno 18 riceve una "sanzione di correlazione", tanto maggiore quanti più validatori subiscono contemporaneamente lo slashing. La sanzione massima è rappresentata dall'intero stake. Queste ricompense e sanzioni sono pensate per incentivare i validatori onesti e disincentivare gli attacchi alla rete.

### Perdita per inattività {#inactivity-leak}

Oltre alla sicurezza, Gasper prevede anche una "vitalità plausibile". Questa condizione prevede che finché due terzi dell'ether in staking totale vota onestamente e segue il protocollo, la catena potrà finalizzare, indipendentemente da qualsiasi altra attività (come attacchi, problemi di latenza o slashing). In altre parole, un terzo dell'ether in staking totale deve essere in qualche modo compromesso per impedire alla catena di finalizzare. In Gasper, esiste una linea di difesa aggiuntiva contro la perdita di vitalità, nota come "perdita per inattività". Questo meccanismo si attiva quando la catena non è riuscita a finalizzare per più di quattro epoche. I validatori che non stanno attestando attivamente alla catena di maggioranza subiscono una perdita graduale del loro stake finché la maggioranza non ottiene nuovamente i due terzi dello stake totale, garantendo così che la perdita di vitalità sia solo temporanea.

### Scelta della biforcazione {#fork-choice}

La definizione originale di Casper-FFG prevedeva un algoritmo di scelta della biforcazione che imponeva la regola: `segui la catena contenente il punto di controllo giustificato avente l'altezza maggiore`, dove l'altezza è definita come la massima distanza dal blocco di genesi. In Gasper, la regola di scelta della biforcazione originale è deprecata in favore di un algoritmo più sofisticato, denominato LMD-GHOST. È importante rendersi conto che in condizioni normali non è necessaria una regola di scelta della biforcazione: esiste un propositore del singolo blocco per ogni slot e i validatori onesti lo attestano. Serve un algoritmo di scelta della biforcazione solo quando vi è una grande asincronia della rete o quando un propositore del blocco disonesto ha generato confusione. Tuttavia, quando si presentano questi casi, l'algoritmo di scelta della biforcazione è un’importante difesa che protegge la catena corretta.

LMD-GHOST sta per "latest message-driven greedy heaviest observed sub-tree". Si tratta di un termine molto gergale per definire un algoritmo che seleziona la biforcazione che presenta il peso di attestazioni accumulate più elevato rispetto a quello canonico (greedy heaviest subtree) e che se vengono ricevuti più messaggi da un validatore, viene considerato solo l’ultimo (latest-message driveno). Prima di aggiungere il blocco più pesante alla sua catena canonica, ogni validatore valuta ogni blocco usando questa regola.

## Letture consigliate {#further-reading}

- [Gasper: combinazione di GHOST e Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Capser the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
