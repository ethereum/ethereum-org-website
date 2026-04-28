---
title: Alberi di Verkle
description: Una descrizione ad alto livello degli alberi di Verkle e di come verranno utilizzati per aggiornare Ethereum
lang: it
summaryPoints:
  - Scopri cosa sono gli alberi di Verkle
  - Leggi perché gli alberi di Verkle sono un utile aggiornamento per Ethereum
---

# Alberi di Verkle {#verkle-trees}

Gli alberi di Verkle (una parola macedonia tra "Vector commitment" e "Merkle Trees") sono una struttura dati che può essere utilizzata per aggiornare i [nodi](/glossary/#node) di [Ethereum](/) in modo che possano smettere di archiviare grandi quantità di dati di stato senza perdere la capacità di validare i blocchi.

## Assenza di stato {#statelessness}

Gli alberi di Verkle sono un passo fondamentale nel percorso verso i client di Ethereum senza stato (stateless). I client senza stato sono quelli che non devono archiviare l'intero database dello stato per validare i blocchi in arrivo. Invece di utilizzare la propria copia locale dello stato di Ethereum per verificare i blocchi, i client senza stato utilizzano un "witness" (testimone) dei dati di stato che arriva con il blocco. Un witness è una raccolta di singoli pezzi dei dati di stato necessari per eseguire un particolare insieme di transazioni e una prova crittografica che il witness fa realmente parte dei dati completi. Il witness viene utilizzato _al posto_ del database dello stato. Affinché ciò funzioni, i witness devono essere molto piccoli, in modo da poter essere trasmessi in sicurezza attraverso la rete in tempo utile affinché i validatori li elaborino entro uno slot di 12 secondi. L'attuale struttura dei dati di stato non è adatta perché i witness sono troppo grandi. Gli alberi di Verkle risolvono questo problema consentendo witness di piccole dimensioni, rimuovendo una delle barriere principali ai client senza stato.

<ExpandableCard title="Perché vogliamo client senza stato?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

I client di Ethereum attualmente utilizzano una struttura dati nota come Trie di Patricia Merkle per archiviare i propri dati di stato. Le informazioni sui singoli account sono archiviate come foglie sul trie e le coppie di foglie vengono sottoposte a hash ripetutamente finché non rimane un solo hash. Questo hash finale è noto come "radice" (root). Per verificare i blocchi, i client di Ethereum eseguono tutte le transazioni in un blocco e aggiornano il loro trie di stato locale. Il blocco è considerato valido se la radice dell'albero locale è identica a quella fornita dal proponente del blocco, perché qualsiasi differenza nel calcolo effettuato dal proponente del blocco e dal nodo di validazione farebbe sì che l'hash radice sia completamente diverso. Il problema è che la verifica della blockchain richiede che ogni client archivi l'intero trie di stato per il blocco di testa e per diversi blocchi storici (l'impostazione predefinita in Geth è mantenere i dati di stato per 128 blocchi dietro la testa). Ciò richiede che i client abbiano accesso a una grande quantità di spazio su disco, il che rappresenta un ostacolo all'esecuzione di nodi completi su hardware economico e a basso consumo. Una soluzione a questo problema è aggiornare il trie di stato a una struttura più efficiente (l'albero di Verkle) che può essere riassunta utilizzando un piccolo "witness" per i dati, che può essere condiviso al posto dei dati di stato completi. La riformattazione dei dati di stato in un albero di Verkle è un trampolino di lancio per passare ai client senza stato.
</ExpandableCard>

## Cos'è un witness e perché ne abbiamo bisogno? {#what-is-a-witness}

Verificare un blocco significa rieseguire le transazioni contenute nel blocco, applicare le modifiche al trie di stato di Ethereum e calcolare il nuovo hash radice. Un blocco verificato è quello il cui hash radice dello stato calcolato è uguale a quello fornito con il blocco (perché questo significa che il proponente del blocco ha realmente eseguito il calcolo che afferma di aver fatto). Negli attuali client di Ethereum, l'aggiornamento dello stato richiede l'accesso all'intero trie di stato, che è una grande struttura dati che deve essere archiviata localmente. Un witness contiene solo i frammenti dei dati di stato necessari per eseguire le transazioni nel blocco. Un validatore può quindi utilizzare solo quei frammenti per verificare che il proponente del blocco abbia eseguito le transazioni del blocco e aggiornato lo stato correttamente. Tuttavia, ciò significa che il witness deve essere trasferito tra i peer sulla rete di Ethereum abbastanza rapidamente da essere ricevuto ed elaborato da ciascun nodo in sicurezza entro uno slot di 12 secondi. Se il witness è troppo grande, alcuni nodi potrebbero impiegare troppo tempo per scaricarlo e stare al passo con la catena. Questa è una forza centralizzante perché significa che solo i nodi con connessioni Internet veloci possono partecipare alla validazione dei blocchi. Con gli alberi di Verkle non c'è bisogno di avere lo stato archiviato sul proprio disco rigido; _tutto_ ciò di cui si ha bisogno per verificare un blocco è contenuto all'interno del blocco stesso. Sfortunatamente, i witness che possono essere prodotti dai trie di Merkle sono troppo grandi per supportare i client senza stato.

## Perché gli alberi di Verkle consentono witness più piccoli? {#why-do-verkle-trees-enable-smaller-witnesses}

La struttura di un Trie di Merkle rende le dimensioni dei witness molto grandi: troppo grandi per essere trasmesse in sicurezza tra i peer entro uno slot di 12 secondi. Questo perché il witness è un percorso che collega i dati, contenuti nelle foglie, all'hash radice. Per verificare i dati è necessario avere non solo tutti gli hash intermedi che collegano ogni foglia alla radice, ma anche tutti i nodi "fratelli" (sibling). Ogni nodo nella prova ha un fratello con cui viene sottoposto a hash per creare l'hash successivo lungo il trie. Si tratta di molti dati. Gli alberi di Verkle riducono le dimensioni del witness accorciando la distanza tra le foglie dell'albero e la sua radice ed eliminando anche la necessità di fornire nodi fratelli per verificare l'hash radice. Un'efficienza di spazio ancora maggiore sarà ottenuta utilizzando un potente schema di impegno polinomiale (polynomial commitment) invece dell'impegno vettoriale basato su hash. L'impegno polinomiale consente al witness di avere una dimensione fissa indipendentemente dal numero di foglie che dimostra.

Con lo schema di impegno polinomiale, i witness hanno dimensioni gestibili che possono essere facilmente trasferite sulla rete peer-to-peer. Ciò consente ai client di verificare le modifiche di stato in ogni blocco con una quantità minima di dati.

<ExpandableCard title="Di quanto possono ridurre esattamente le dimensioni del witness gli alberi di Verkle?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

La dimensione del witness varia a seconda del numero di foglie che include. Supponendo che il witness copra 1000 foglie, un witness per un trie di Merkle sarebbe di circa 3,5 MB (ipotizzando 7 livelli per il trie). Un witness per gli stessi dati in un albero di Verkle (ipotizzando 4 livelli per l'albero) sarebbe di circa 150 kB: **circa 23 volte più piccolo**. Questa riduzione delle dimensioni del witness consentirà ai witness dei client senza stato di essere sufficientemente piccoli. I witness polinomiali sono di 0,128 - 1 kB a seconda dello specifico impegno polinomiale utilizzato.
</ExpandableCard>

## Qual è la struttura di un albero di Verkle? {#what-is-the-structure-of-a-verkle-tree}

Gli alberi di Verkle sono coppie `(key,value)` in cui le chiavi sono elementi da 32 byte composti da un _tronco_ (stem) da 31 byte e un _suffisso_ da un singolo byte. Queste chiavi sono organizzate in nodi di _estensione_ e nodi _interni_. I nodi di estensione rappresentano un singolo tronco per 256 figli con suffissi diversi. Anche i nodi interni hanno 256 figli, ma possono essere altri nodi di estensione. La differenza principale tra la struttura dell'albero di Verkle e quella dell'albero di Merkle è che l'albero di Verkle è molto più piatto, il che significa che ci sono meno nodi intermedi che collegano una foglia alla radice e, di conseguenza, meno dati richiesti per generare una prova.

![Diagramma di una struttura dati dell'albero di Verkle](./verkle.png)

[Maggiori informazioni sulla struttura degli alberi di Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progressi attuali {#current-progress}

Le reti di test (testnet) degli alberi di Verkle sono già attive e funzionanti, ma ci sono ancora sostanziali aggiornamenti in sospeso per i client necessari per supportare gli alberi di Verkle. Puoi contribuire ad accelerare i progressi distribuendo contratti sulle reti di test o eseguendo i client della rete di test.

[Guarda Guillaume Ballet spiegare la rete di test Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (nota che la rete di test Condrieu era basata sulla prova di lavoro ed è ora stata sostituita dalla rete di test Verkle Gen Devnet 6).

## Letture consigliate {#further-reading}

- [Alberi di Verkle per l'assenza di stato](https://verkle.info/)
- [Dankrad Feist spiega gli alberi di Verkle su PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Alberi di Verkle per il resto di noi](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia di una prova di Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet spiega gli alberi di Verkle a ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Come gli alberi di Verkle rendono Ethereum snello ed efficiente" di Guillaume Ballet alla Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sui client senza stato all'ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist spiega gli alberi di Verkle e l'assenza di stato sul podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin sugli alberi di Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sugli alberi di Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentazione dell'EIP sull'albero di Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)