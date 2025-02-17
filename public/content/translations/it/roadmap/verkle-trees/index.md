---
title: Alberi di Verkle
description: Una descrizione di alto livello degli alberi di Verkle e di come saranno utilizzati per aggiornare Ethereum
lang: it
summaryPoints:
  - Scopri cosa sono gli alberi di Verkle
  - Leggi perché gli alberi di Verkle sono un utile aggiornamento per Ethereum
---

# Alberi di Verkle {#verkle-trees}

Gli alberi di Verkle (un neologismo tra "Impegno Vettoriale" e "Alberi di Merkle") sono strutture di dati utilizzabili per aggiornare i nodi di Ethereum, così che possano smettere di archiviare grandi quantità di dati di stato, senza perdere l'abilità di convalidare i blocchi.

## Assenza di stato {#statelessness}

Gli alberi di Verkle sono un passaggio fondamentale sul percorso per i client di Ethereum privi di stato. I client privi di stato sono quelli che non devono memorizzare l'intero database di stato per poter convalidare i blocchi in entrata. Invece di utilizzare la propria copia dello stato di Ethereum per verificare i blocchi, utilizzano un "testimone" ai dati di stato che arriva con il blocco. Un testimone è una raccolta di pezzi individuali dei dati di stato, necessaria per eseguire una serie particolare di transazioni, nonché una prova crittografica che il testimone sia davvero parte dei dati completi. Il testimone è utilizzato _invece_ del database di stato. Perché funzioni, i testimoni devono essere molto piccoli, così che siano trasmissibili in sicurezza per la rete, in tempo per essere convalidati dai validatori entro uno spazio di 12 secondi. La struttura attuale dei dati di stato non è adatta, poiché i testimoni sono troppo grandi. Gli alberi di Verkle risolvono questo problema consentendo piccoli testimoni e rimuovendo una delle principali barriere ai client privi di stato.

<ExpandableCard title="Perché vogliamo dei client privi di stato?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

I client di Ethereum, al momento, utilizzano una struttura di dati nota come Albero di Patricia di Merkle per memorizzarne i dati di stato. Le informazioni sui singoli conti sono memorizzati come foglie su un albero e, le coppie di foglie, ricevono ripetutamente un hash finché non ne resta soltanto uno. Questo hash finale è noto come la "radice". Per verficare i blocchi, i client di Ethereum eseguono tutte le transazioni in un blocco e aggiornano il proprio albero di stato locale. Il blocco è considerato valido se la radice dell'albero locale è identica a quella fornita dal propositore di blocchi, poiché qualsiasi differenza nel calcolo effettuato dal propositore del blocco e dal nodo di convalida, formerebbe un hash di radice completamente differente. Il problema è che la verifica della blockchain richiede che ogni client memorizzi l'intero albero di stato per il blocco di testa e per diversi blocchi storici (di default, su Geth, sono mantenuti i dati di stato per 128 blocchi oltre la testa). Ciò richiede che i client abbiano accesso a una grande quantità di spazio su disco, limitando l'esecuzione dei nodi completi su hardware economici e poco potenti. Una soluzione è aggiornare l'albero di stato a una struttura più efficiente (l'albero di Verkle), riepilogabile utilizzando un piccolo "testimone" ai dati, condivisibile invece dei dati di stato completi. Riformattare i dati di stato in un albero di Verkle è una pietra miliare per spostarsi verso i client privi di stato.

</ExpandableCard>

## Cos'è un testimone e perché è necessario? {#what-is-a-witness}

Verificare un blocco significa rieseguire le transazioni contenute nel blocco, applicando le modifiche all'albero di stato di Ethereum e calcolando il nuovo hash della radice. Un blocco verificato è uno il cui hash della radice di stato calcolato equivale a quello fornito con il blocco (poiché ciò preclude che il propositore del blocco abbia realmente effettuato il calcolo che dice di aver effettuato). Nei client odierni di Ethereum, aggiornare lo stato richiede l'accesso all'intero albero di stato, una grande struttura di dati che dev'essere archiviata localmente. Un testimone contiene soltanto i frammenti dei dati di stato necessari per eseguire le transazioni nel blocco. Un validatore può quindi utilizzare soltanto quei frammenti per verificare che il propositore di blocchi abbia eseguito le transazioni del blocco e aggiornato correttamente lo stato. Tuttavia, ciò significa che il testimone dev'essere trasferito tra i pari sulla rete di Ethereum abbastanza rapidamente da essere ricevuto ed elaborato da ogni nodo, in sicurezza, entro uno spazio di 12 secondi. Se il testimone è troppo grande, per alcuni nodi potrebbe volerci troppo per scaricarlo e tenere il passo con la catena. Questa è una forza centralizzante, poiché significa che soltanto i nodi con connessioni a Internet veloci, possono partecipare alla convalida dei blocchi. Con gli alberi di Verkle non è necessario memorizzare lo stato sul proprio disco rigido; _tutto_ ciò che serve per verificare un blocco, si trova nel blocco stesso. Purtroppo, i testimoni producibili dagli alberi di Merkle sono troppo grandi per supportare i client privi di stato.

## Perché gli alberi di Verkle consentono testimoni più piccoli? {#why-do-verkle-trees-enable-smaller-witnesses}

La struttura di un Albero di Merkle rende le dimensioni dei testimoni molto grandi, troppo per trasmetterli in sicurezza tra pari entro uno spazio di 12 secondi. Questo perché il testimone è un percorso che connette i dati, tenuti tra le foglie, all'hash della radice. Per verificare i dati è necessario non soltanto avere tutti gli hash intermedi che connettono ogni foglia alla radice, ma anche tutti i nodi "gemelli". Ogni nodo nella prova ha un gemello, con cui è eseguito l'hash per creare quello successivo. Questi sono molti dati. Gli alberi di Verkle riducono le dimensioni dei testimoni accorciando la distanza tra le foglie dell'albero e la sua radice, nonché eliminando la necessità di provare i nodi gemelli per verificare l'hash della radice. Una maggiore efficienza di spazio sarà ottenuta utilizzando un potente schema di impegno polinomiale, invece dell'impegno vettoriale con hash. L'impegno polinomiale consente al testimone di avere una dimensione fissa indipendentemente dal numero di foglie che prova.

Sotto lo schema di impegno polinomiale, i testimoni hanno dimensioni gestibili, facilmente trasferibili sulla rete tra pari. Questo consente ai client di verificare i cambiamenti di stato in ogni blocco con una quantità minima di dati.

<ExpandableCard title="Esattamente di quanto gli alberi di Verkle possono ridurre le dimensioni del testimone?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Le dimensioni dei testimoni variano a seconda del numero di foglie che include. Supponendo che il testimone copra 1000 foglie, un testimone per un albero di Merkle occuperebbe all'incirca 3,5 MB (ipotizzando 7 livelli all'albero). Un testimone per gli stessi dati in un albero di Verkle (ipotizzando 4 livelli all'albero) occuperebbe circa 150 kB; **circa 23 volte più piccolo**. Questa riduzione delle dimensioni del testimone consentirà ai testimoni del client di essere accettabilmente piccoli. I testimoni polinomiali variano da 0,128 a 1 kB a seconda dello specifico impegno polinomiale utilizzato.

</ExpandableCard>

## Qual è la struttura di un albero di Verkle? {#what-is-the-structure-of-a-verkle-tree}

Gli alberi di Verkle sono coppie `(key,value)` in cui le chiavi sono elementi da 32 byte composte da uno _stelo_ di 31 byte e un _suffisso_ di un singolo byte. Queste chiavi sono organizzate in nodi _estensione_ e nodi _interni_. I nodi d'estensione rappresentano un singolo stelo per 256 figli con suffissi differenti. Anche i nodi interni hanno 256 figli, ma possono essere altri nodi d'estensione. La differenza principale tra la struttura dell'albero di Verkle e dell'albero di Merkle è che il primo è molto più piatto, a significare che ci sono meno nodi intermedi che collegano una foglia alla radice e dunque sono richiesti meno dati per generare una prova.

![](./verkle.png)

[Leggi di più sulla struttura degli alberi di Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Stato attuale {#current-progress}

Le reti di prova dell'albero di Verkle sono già in esecuzione, ma servono ancora aggiornamenti sostanziali e straordinari, necessari a supportarli. Puoi aiutare ad accelerare il progresso distribuendo contratti alle reti di prova od operando dei client delle reti di prova.

[Esplora la rete di prova di Verkle Gen Devnet 6](https://verkle-gen-devnet-6.ethpandaops.io/)

[Guarda Guillaume Ballet spiegare la rete di prova di Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (nota che la rete di prova Condrieu era in proof-of-work e ora è stata sostituita dalla rete di prova di Verkle Gen Devnet 6).

## Letture consigliate {#further-reading}

- [Alberi di Verkle per l'assenza di stato](https://verkle.info/)
- [Dankrad Feist spiega gli alberi di Verkle su PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet spiega gli alberi di Verkle all'ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Come gli alberi di Verkle rendono Ethereum snello e succinto" di Guillaume Ballet al Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sui client privi di stato dall'ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest spiega gli alberi di Verkle e l'assenza di stato nel podcast "Zero Knowledge"](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin sugli alberi di Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sugli alberi di Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentazione sull'EIP degli alberi di Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
