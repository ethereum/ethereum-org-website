---
title: "Soggettività debole"
description: "Una spiegazione della soggettività debole e del suo ruolo nella prova di stake di Ethereum."
lang: it
---

La soggettività nelle blockchain si riferisce all'affidamento alle informazioni sociali per concordare sullo stato attuale. Potrebbero esserci molteplici biforcazioni valide tra cui scegliere in base alle informazioni raccolte da altri peer sulla rete. Il contrario è l'oggettività, che si riferisce alle catene in cui esiste una sola catena valida possibile su cui tutti i nodi concorderanno necessariamente applicando le loro regole codificate. Esiste anche un terzo stato, noto come soggettività debole. Questo si riferisce a una catena che può progredire oggettivamente dopo che un seme iniziale di informazioni è stato recuperato socialmente.

## Prerequisiti {#prerequisites}

Per comprendere questa pagina è necessario prima comprendere i fondamenti della [prova di stake](/developers/docs/consensus-mechanisms/pos/).

## Quali problemi risolve la soggettività debole? {#problems-ws-solves}

La soggettività è intrinseca alle blockchain basate sulla prova di stake perché la selezione della catena corretta tra molteplici biforcazioni viene effettuata contando i voti storici. Questo espone la blockchain a diversi vettori di attacco, inclusi gli attacchi a lungo raggio in cui i nodi che hanno partecipato molto presto alla catena mantengono una biforcazione alternativa che rilasciano molto più tardi a proprio vantaggio. In alternativa, se il 33% dei validatori ritira il proprio stake ma continua ad attestare e produrre blocchi, potrebbe generare una biforcazione alternativa in conflitto con la catena canonica. I nuovi nodi o i nodi che sono stati offline per molto tempo potrebbero non essere consapevoli che questi validatori attaccanti hanno ritirato i loro fondi, quindi gli aggressori potrebbero ingannarli facendogli seguire una catena errata. [Ethereum](/) può risolvere questi vettori di attacco imponendo vincoli che riducono al minimo indispensabile gli aspetti soggettivi del meccanismo, e quindi le ipotesi di fiducia.

## Checkpoint di soggettività debole {#ws-checkpoints}

La soggettività debole è implementata nella prova di stake di Ethereum utilizzando i "checkpoint di soggettività debole". Si tratta di radici di stato che tutti i nodi sulla rete concordano appartengano alla catena canonica. Servono allo stesso scopo di "verità universale" dei blocchi di genesi, tranne per il fatto che non si trovano nella posizione di genesi nella blockchain. L'algoritmo di scelta della biforcazione confida che lo stato della blockchain definito in quel checkpoint sia corretto e che verifichi in modo indipendente e oggettivo la catena da quel punto in poi. I checkpoint agiscono come "limiti di ripristino" perché i blocchi situati prima dei checkpoint di soggettività debole non possono essere modificati. Questo mina gli attacchi a lungo raggio semplicemente definendo le biforcazioni a lungo raggio come non valide come parte della progettazione del meccanismo. Garantire che i checkpoint di soggettività debole siano separati da una distanza inferiore al periodo di prelievo del validatore assicura che un validatore che crea una biforcazione della catena venga punito di almeno un certo importo di soglia prima di poter ritirare il proprio stake e che i nuovi entranti non possano essere ingannati su biforcazioni errate da validatori il cui stake è stato ritirato.

## Differenza tra checkpoint di soggettività debole e blocchi finalizzati {#difference-between-ws-and-finalized-blocks}

I blocchi finalizzati e i checkpoint di soggettività debole sono trattati in modo diverso dai nodi di Ethereum. Se un nodo viene a conoscenza di due blocchi finalizzati in competizione, allora è combattuto tra i due: non ha modo di identificare automaticamente quale sia la biforcazione canonica. Questo è sintomatico di un fallimento del consenso. Al contrario, un nodo rifiuta semplicemente qualsiasi blocco in conflitto con il suo checkpoint di soggettività debole. Dal punto di vista del nodo, il checkpoint di soggettività debole rappresenta una verità assoluta che non può essere minata da nuove conoscenze provenienti dai suoi peer.

## Quanto è debole? {#how-weak-is-weak}

L'aspetto soggettivo della prova di stake di Ethereum è il requisito di uno stato recente (checkpoint di soggettività debole) da una fonte attendibile da cui sincronizzarsi. Il rischio di ottenere un checkpoint di soggettività debole errato è molto basso perché possono essere verificati rispetto a diverse fonti pubbliche indipendenti come gli esploratori di blocchi o molteplici nodi. Tuttavia, è sempre richiesto un certo grado di fiducia per eseguire qualsiasi applicazione software, ad esempio, confidare che gli sviluppatori del software abbiano prodotto un software onesto.

Un checkpoint di soggettività debole potrebbe persino far parte del software del client. Si potrebbe sostenere che un utente malintenzionato possa corrompere il checkpoint nel software e possa altrettanto facilmente corrompere il software stesso. Non esiste una vera via d'uscita criptoeconomica a questo problema, ma l'impatto di sviluppatori inaffidabili è ridotto al minimo in Ethereum avendo molteplici team di client indipendenti, ognuno dei quali crea software equivalente in linguaggi diversi, tutti con un interesse acquisito nel mantenere una catena onesta. Anche gli esploratori di blocchi possono fornire checkpoint di soggettività debole o un modo per incrociare i checkpoint ottenuti altrove con una fonte aggiuntiva.

Infine, i checkpoint possono essere richiesti ad altri nodi; forse un altro utente di Ethereum che esegue un nodo completo può fornire un checkpoint che i validatori possono poi verificare rispetto ai dati di un esploratore di blocchi. Nel complesso, fidarsi del fornitore di un checkpoint di soggettività debole può essere considerato problematico quanto fidarsi degli sviluppatori del client. La fiducia complessiva richiesta è bassa. È importante notare che queste considerazioni diventano importanti solo nell'evento molto improbabile in cui la maggioranza dei validatori cospiri per produrre una biforcazione alternativa della blockchain. In qualsiasi altra circostanza, c'è solo una catena di Ethereum tra cui scegliere.

## Letture consigliate {#further-reading}

- [Soggettività debole in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Come ho imparato ad amare la soggettività debole](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Soggettività debole (documentazione di Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Guida alla soggettività debole della Fase 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Analisi della soggettività debole in Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)