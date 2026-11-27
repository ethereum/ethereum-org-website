---
title: Alberi di Verkle
description: "Una descrizione ad alto livello degli alberi di Verkle e del perché i piani per l'albero di stato di Ethereum sono passati a un albero binario"
lang: it
template: roadmap
summaryPoints:
  - Scopri cosa sono gli alberi di Verkle
  - Leggi perché gli alberi di Verkle sono stati accantonati in favore di un albero binario
---

Gli alberi di Verkle (una parola macedonia tra "Vector commitment" e "Merkle Trees") sono una struttura dati che può essere utilizzata per aggiornare i nodi di [Ethereum](/) in modo che possano smettere di archiviare grandi quantità di dati di stato senza perdere la capacità di convalidare i blocchi.

Gli alberi di Verkle sono stati proposti come il prossimo albero di stato di Ethereum nella [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), ma tale proposta è ora stagnante ed è stata accantonata in favore di un albero binario unificato ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)). L'albero binario persegue lo stesso obiettivo di avere testimoni di piccole dimensioni per i client senza stato. Questa pagina spiega come funzionano gli alberi di Verkle e perché la ricerca si è spostata verso un albero binario.

## Assenza di stato {#statelessness}

Gli alberi di Verkle sono stati progettati come un passo sul percorso verso i client Ethereum senza stato. I client senza stato sono quelli che non devono archiviare l'intero database di stato per convalidare i blocchi in arrivo. Invece di utilizzare la propria copia locale dello stato di Ethereum per verificare i blocchi, i client senza stato utilizzano un "testimone" dei dati di stato che arriva con il blocco. Un testimone è una raccolta di singoli frammenti dei dati di stato necessari per eseguire un particolare insieme di transazioni e una prova crittografica che il testimone fa realmente parte dei dati completi. Il testimone viene utilizzato _al posto_ del database di stato. Affinché ciò funzioni, i testimoni devono essere molto piccoli, in modo da poter essere trasmessi in modo sicuro attraverso la rete in tempo utile affinché i validatori li elaborino entro uno slot di 12 secondi. L'attuale struttura dei dati di stato non è adatta perché i testimoni sono troppo grandi. Gli alberi di Verkle risolvono questo problema consentendo testimoni di piccole dimensioni, rimuovendo uno dei principali ostacoli ai client senza stato.

<ExpandableCard title="Perché vogliamo client senza stato?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

I client Ethereum attualmente utilizzano una struttura dati nota come Patricia Merkle Trie per archiviare i propri dati di stato. Le informazioni sui singoli account sono archiviate nelle foglie del trie e ogni nodo ramo, che può avere fino a 16 figli, viene sottoposto a hash insieme agli hash dei suoi figli, livello per livello, finché non rimane un solo hash. Questo hash finale è noto come "radice". Per verificare i blocchi, i client Ethereum eseguono tutte le transazioni in un blocco e aggiornano il loro trie di stato locale. Il blocco è considerato valido se la radice dell'albero locale è identica a quella fornita dal proponente del blocco, perché qualsiasi differenza nel calcolo eseguito dal proponente del blocco e dal nodo validatore farebbe sì che l'hash radice sia completamente diverso. Il problema è che la verifica della blockchain richiede che ogni client archivi l'intero trie di stato per il blocco di testa e per diversi blocchi storici (l'impostazione predefinita in Geth è mantenere i dati di stato per 128 blocchi dietro la testa). Ciò richiede che i client abbiano accesso a una grande quantità di spazio su disco, il che rappresenta un ostacolo all'esecuzione di nodi completi su hardware economico e a basso consumo. Una soluzione a questo problema è aggiornare il trie di stato a una struttura più efficiente (come un albero di Verkle o un albero binario) che può essere riassunta utilizzando un piccolo "testimone" dei dati che può essere condiviso al posto dei dati di stato completi. La riformattazione dei dati di stato in una nuova struttura ad albero è un trampolino di lancio per passare ai client senza stato.

</ExpandableCard>

## Cos'è un testimone e perché ne abbiamo bisogno? {#what-is-a-witness}

Verificare un blocco significa rieseguire le transazioni contenute nel blocco, applicare le modifiche al trie di stato di Ethereum e calcolare il nuovo hash radice. Un blocco verificato è quello il cui hash radice di stato calcolato è uguale a quello fornito con il blocco (perché questo significa che il proponente del blocco ha realmente eseguito il calcolo che afferma di aver fatto). Nei client Ethereum odierni, l'aggiornamento dello stato richiede l'accesso all'intero trie di stato, che è una struttura dati di grandi dimensioni che deve essere archiviata localmente. Un testimone contiene solo i frammenti dei dati di stato necessari per eseguire le transazioni nel blocco. Un validatore può quindi utilizzare solo quei frammenti per verificare che il proponente del blocco abbia eseguito le transazioni del blocco e aggiornato lo stato correttamente. Tuttavia, ciò significa che il testimone deve essere trasferito tra i peer sulla rete Ethereum abbastanza rapidamente da essere ricevuto ed elaborato da ciascun nodo in modo sicuro entro uno slot di 12 secondi. Se il testimone è troppo grande, alcuni nodi potrebbero impiegare troppo tempo per scaricarlo e stare al passo con la catena. Questa è una forza centralizzante perché significa che solo i nodi con connessioni Internet veloci possono partecipare alla convalida dei blocchi. Con gli alberi di Verkle non c'è bisogno di avere lo stato archiviato sul disco rigido; _tutto_ ciò di cui hai bisogno per verificare un blocco è contenuto all'interno del blocco stesso. Sfortunatamente, i testimoni che possono essere prodotti dai trie di Merkle sono troppo grandi per supportare i client senza stato.

## Perché gli alberi di Verkle consentono testimoni più piccoli? {#why-do-verkle-trees-enable-smaller-witnesses}

La struttura di un trie di Merkle rende le dimensioni del testimone molto grandi: troppo grandi per essere trasmesse in modo sicuro tra i peer entro uno slot di 12 secondi. Questo perché il testimone è un percorso che collega i dati, contenuti nelle foglie, all'hash radice. Per verificare i dati è necessario avere non solo tutti gli hash intermedi che collegano ogni foglia alla radice, ma anche tutti i nodi "fratelli". Ogni nodo nella prova ha un fratello con cui viene sottoposto a hash per creare l'hash successivo lungo il trie. Si tratta di molti dati. Gli alberi di Verkle riducono le dimensioni del testimone accorciando la distanza tra le foglie dell'albero e la sua radice ed eliminando anche la necessità di fornire nodi fratelli per verificare l'hash radice. Un'efficienza di spazio ancora maggiore sarà ottenuta utilizzando un potente schema di commitment polinomiale invece del vector commitment basato su hash. Il commitment polinomiale consente al testimone di avere una dimensione fissa indipendentemente dal numero di foglie che dimostra.

Con lo schema di commitment polinomiale, i testimoni hanno dimensioni gestibili che possono essere facilmente trasferite sulla rete peer-to-peer. Ciò consente ai client di verificare le modifiche di stato in ogni blocco con una quantità minima di dati.

<ExpandableCard title="Esattamente di quanto gli alberi di Verkle possono ridurre la dimensione del testimone?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

La dimensione del testimone varia a seconda del numero di foglie che include. Supponendo che il testimone copra 1000 foglie, un testimone per un trie di Merkle sarebbe di circa 3,5 MB (supponendo 7 livelli per il trie). Un testimone per gli stessi dati in un albero di Verkle (supponendo 4 livelli per l'albero) sarebbe di circa 150 kB: **circa 23 volte più piccolo**. Questa riduzione delle dimensioni del testimone consentirà ai testimoni dei client senza stato di essere sufficientemente piccoli. I testimoni polinomiali sono di 0,128 - 1 kB a seconda dello specifico commitment polinomiale utilizzato.

</ExpandableCard>

## Qual è la struttura di un albero di Verkle? {#what-is-the-structure-of-a-verkle-tree}

Gli alberi di Verkle sono coppie `(key,value)` in cui le chiavi sono elementi da 32 byte composti da uno _stem_ di 31 byte e un _suffisso_ di un singolo byte. Queste chiavi sono organizzate in nodi di _estensione_ e nodi _interni_. I nodi di estensione rappresentano un singolo stem per 256 figli con suffissi diversi. Anche i nodi interni hanno 256 figli, ma possono essere altri nodi di estensione. La differenza principale tra la struttura dell'albero di Verkle e quella dell'albero di Merkle è che l'albero di Verkle è molto più piatto, il che significa che ci sono meno nodi intermedi che collegano una foglia alla radice e, di conseguenza, sono necessari meno dati per generare una prova.

<VerkleTreeDiagram />

[Maggiori informazioni sulla struttura degli alberi di Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progressi attuali {#current-progress}

La [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), la proposta per spostare lo stato di Ethereum in un albero di Verkle unificato, è ora stagnante. La ricerca si è spostata sulla [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864), che propone invece un albero binario unificato. La EIP-7864 è una bozza e non è stato programmato alcun aggiornamento della rete per essa.

La EIP-7864 fornisce due ragioni principali per il cambiamento. Gli alberi di Verkle si basano sulla crittografia a curva ellittica che non è sicura contro i computer quantistici, quindi alla fine dovrebbero essere sostituiti, mentre un albero binario si basa solo su funzioni di hash. I progressi nei sistemi di prova riducono anche la necessità di prove piccole e veloci da generare che erano il vantaggio principale degli alberi di Verkle. Poiché ogni nodo in un albero binario ha solo due figli, le sue prove sono anche molto più piccole rispetto alle prove dell'odierno trie esadecimale.

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
- [Documentazione della EIP sull'albero di Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
- [EIP-6800: Stato di Ethereum utilizzando un albero di Verkle unificato](https://eips.ethereum.org/EIPS/eip-6800)
- [EIP-7864: Stato di Ethereum utilizzando un albero binario unificato](https://eips.ethereum.org/EIPS/eip-7864)
