---
title: Soggettività debole
description: Una spiegazione della soggettività debole e del suo ruolo nell'Ethereum PoS.
lang: it
---

Per soggettività nelle blockchain si intende l'affidamento alle informazioni sociali per acconsentire allo stato corrente. Potrebbero esistere diverse biforcazioni valide, tra le quali si sceglie basandosi sulle informazioni raccolte da altri peer sulla rete. Il contrario è l'oggettività, che si riferisce alle catene in cui è possibile solo una catena valida, su cui tutti i nodi acconsentiranno necessariamente, applicando delle proprie regole codificate. Esiste anche un terzo stato, noto come soggettività debole. Esso indica una catena che può progredire oggettivamente dopo aver recuperato socialmente parte del seed iniziale di informazioni.

## Prerequisiti {#prerequisites}

Per comprendere questa pagina è necessario prima capire i fondamenti del [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Quali problemi risolve la soggettività debole? {#problems-ws-solves}

La soggettività è intrinseca nelle blockchain proof-of-stake perché la selezione della catena corretta tra diverse biforcazioni avviene contando i voti storici. Questo espone la blockchain a diversi vettori d'attacco, tra cui gli attacchi a lunga portata, in cui i nodi che hanno partecipato nelle primissime fasi alla catena mantengono una biforcazione alternativa che rilasciano molto più tardi a proprio vantaggio. In alternativa, se il 33% dei validatori preleva il proprio stake, ma continua ad attestare e produrre blocchi, potrebbe generare una biforcazione alternativa che entra in conflitto con la catena canonica. I nuovi nodi o nodi che sono stati offline per molto tempo potrebbero non essere consapevoli che questi validatori attaccanti hanno prelevato i propri fondi, quindi, gli utenti malevoli potrebbero ingannarli nel seguire una catena errata. Ethereum può risolvere questi vettori d'attacco imponendo vincoli che riducono al minimo gli aspetti soggettivi del meccanismo e dunque l'affidamento sulla fiducia.

## Punti di controllo della soggettività debole {#ws-checkpoints}

La soggettività debole è implementata in Ethereum proof-of-stake usando i "punti di controllo della soggettività debole". Si tratta di radici di stato che secondo tutti i nodi della rete consensualmente appartengano alla catena canonica. Hanno la stessa funzione di "verità universale" dei blocchi di genesi, con la differenza che non si trovano nella posizione di genesi nella blockchain. L'algoritmo di scelta della biforcazione confida nel fatto che la blockchain definita in quel punto di controllo sia corretta e che, indipendentemente e oggettivamente verifichi la catena a partire da quel punto. I punti di controllo fungono da "limiti di ripristino", poiché i blocchi situati prima dei punti di controllo della soggettività debole non sono modificabili. Questo previene gli attacchi a lunga portata semplicemente definendo come non valide, nell’impostazione del meccanismo, le biforcazioni di lunga portata. Garantire che i punti di controllo della soggettività debole siano separati da una minima distanza rispetto al periodo di prelievo del validatore assicura che un validatore che biforca la catena subisca un taglio (slashing) almeno a un qualche valore di soglia prima che possa prelevare il proprio stake e che i nuovi entranti non possano essere ingannati a entrare in biforcazioni errate dai validatori che hanno prelevato il proprio stake.

## Differenza tra punti di controllo della soggettività debole e blocchi finalizzati {#difference-between-ws-and-finalized-blocks}

I nodi di Ethereum trattano diversamente i blocchi finalizzati e i punti di controllo della soggettività debole. Se un nodo viene a conoscenza di due blocchi finalizzati concorrenti, è diviso tra i due e non ha modo di identificare automaticamente quale sia la biforcazione canonica. Questa condizione indica un fallimento del consenso. Per contro, un nodo rifiuta semplicemente qualsiasi blocco che sia in conflitto con il suo punto di controllo della soggettività debole. Dal punto di vista del nodo, il punto di controllo della soggettività debole rappresenta una verità assoluta, che non può essere sovvertita dalla nuova conoscenza dai suoi peer.

## Quanto debole è debole? {#how-weak-is-weak}

L'aspetto soggettivo del proof-of-stake di Ethereum è la necessità di uno stato recente (punto di controllo della soggettività debole) da una fonte fidata da cui sincronizzare. Il rischio di ottenere un punto di controllo della soggettività debole non corretto è molto basso perché è possibile effettuare un riscontro con diverse fonti pubbliche indipendenti, come gli esploratori di blocchi o vari nodi. Tuttavia, per eseguire qualsiasi applicazione software serve sempre un certo grado di fiducia, ad esempio, fidandosi del fatto che gli sviluppatori del software abbiano prodotto un software onesto.

Un punto di controllo della soggettività debole potrebbe persino essere inserito nel software del client. Probabilmente, un utente malevolo potrebbe corrompere un punto di controllo nel software e con la stessa facilità corrompere il software stesso. Non esiste alcun percorso cripto-economico reale che eviti questo problema, ma in Ethereum l'impatto di eventuali sviluppatori non affidabili è minimizzato con la presenza di diversi team di client indipendenti, ognuno impiegato nella costruzione di software equivalenti in diversi linguaggi, il tutto con l'interesse a mantenere una catena onesta. Gli esploratori di blocchi potrebbero fornire anche dei punti di controllo della soggettività debole o un modo per eseguire un controllo incrociato dei punti di controllo ottenuti da altre parti, rispetto a un'ulteriore fonte.

Infine, i punti di controllo possono essere richiesti da altri nodi; ad es. un altro utente di Ethereum che esegue un nodo completo può fornire un punto di controllo che i validatori possono poi verificare rispetto ai dati ricevuti da un esploratore del blocco. In generale, fidarsi del fornitore di un punto di controllo della soggettività debole può essere considerato come problematico tanto quanto fidarsi degli sviluppatori del client. La fiducia generale richiesta è bassa. È importante osservare che queste considerazioni diventano importanti solo nell'improbabile evento che una maggioranza di validatori cospiri per generare una biforcazione alternativa della blockchain. In qualsiasi altra circostanza, esiste solo una catena di Ethereum da cui scegliere.

## Letture consigliate {#further-reading}

- [Soggettività debole in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: come ho imparato ad amare la soggettività debole](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Soggettività debole (documentazione di Teku)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Fase 0 della guida alla soggettività debole](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Analisi della soggettività debole in Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
