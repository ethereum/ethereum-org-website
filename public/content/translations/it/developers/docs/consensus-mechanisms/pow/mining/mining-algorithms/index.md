---
title: Algoritmi di mining
description: Uno sguardo dettagliato agli algoritmi usati per il mining di Ethereum.
lang: it
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Il Proof of Work non è più il meccanismo di consenso alla base di Ethereum, il che significa che il mining è stato disattivato. Invece, Ethereum è protetto dai validatori che mettono ETH in staking. Puoi iniziare oggi a mettere i tuoi ETH in staking. Leggi di più su <a href='/roadmap/merge/'>La Fusione</a>, il <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a> e lo <a href='/staking/'>staking</a>. Questa pagina è solo per interesse storico.
</AlertDescription>
</AlertContent>
</Alert>

Il mining di Ethereum usava un algoritmo noto come Ethash. L'idea fondamentale dell'algoritmo è che un miner prova a trovare l'input di un nonce usando il calcolo di forza bruta, così che l'hash risultante sia inferiore a una soglia determinata dalla difficoltà calcolata. Questo livello di difficoltà può esser regolato dinamicamente, consentendo alla produzione dei blocchi di verificarsi a un intervallo regolare.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti suggeriamo di leggere prima del [consenso proof-of-work](/developers/docs/consensus-mechanisms/pow) e del [mining](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto era un algoritmo di ricerca precursore del mining di Ethereum, sostituito da Ethash. Era un amalgama di due algoritmi differenti: Dagger e Hashimoto. È sempre e solo stato un'implementazione di ricerca e fu superato da Ethash prima del lancio della Rete Principale di Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) comporta la generazione di un [Grafo Aciclico Diretto](https://en.wikipedia.org/wiki/Directed_acyclic_graph), le cui sezioni casuali vengono hashate insieme. Il principio fondamentale è che ogni nonce richiede solo una piccola porzione di un grande albero di dati totali. Ricalcolare l'albero secondario per ogni nonce è proibitivo per il mining, da cui l'esigenza di memorizzare l'albero, invece, va bene per verificare un singolo nonce. Dagger è stato progettato per essere un'alternativa agli algoritmi esistenti come Scrypt, che sono gravosi per la memoria (memory-hard) ma difficili da verificare all'aumentare dell'uso della memoria verso livelli veramente sicuri. Dagger era però vulnerabile all'accelerazione dell'hardware con memoria condiviso ed è stato abbandonato a favore di altre vie di ricerca.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) è un algoritmo che aggiunge resistenza ASIC essendo vincolato da aspetti I/O (cioè, le letture di memoria rappresentano il fattore limitante nel processo di mining). La teoria è che vi sia più disponibilità di RAM che di calcolo: sono già stati usati miliardi di dollari in ricerca per l'ottimizzazione della RAM per diversi scenari d'uso, che spesso coinvolgono schemi d'accesso semi-casuale (da cui "memoria d'accesso casuale", Random Access Memory). Di conseguenza, è probabile che la RAM esistente sia abbastanza vicina all'ottimale per valutare l'algoritmo. Hashimoto usa la blockchain come una fonte di dati, perché soddisfa simultaneamente i punti (1) e (3) di cui sopra.

Dagger-Hashimoto usava delle versioni modificate degli algoritmi di Dagger e Hashimoto. La differenza tra Dagger Hashimoto e Hashimoto è che, anziché usare la blockchain come una fonte di dati, Dagger Hashimoto usa una serie di dati generata e personalizzata, che si aggiorna a seconda dei dati del blocco ogni N blocchi. La serie di dati è generata usando l'algoritmo di Dagger, che consente di calcolare efficientemente una sotto-serie specifica a ogni nonce per l'algoritmo di verifica del client leggero. La differenza tra Dagger Hashimoto e Dagger è che, a differenza del Dagger originale, il dataset usato per interrogare il blocco è semi-permanente, in quanto viene aggiornato solo occasionalmente (es. una volta a settimana). Questo significa che la porzione dello sforzo per generare il dataset è prossima allo zero, e diventano quindi trascurabili gli argomenti di Sergio Lerner riguardanti le velocizzazioni della memoria condivisa.

Maggiori informazioni su [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash era l'algoritmo di mining che era effettiamente usato sulla vera Rete Principale di Ethereum sotto l'ora deprecata architettura del proof-of-work. Ethash in realtà è un nuovo nome assegnato a una versione specifica di Dagger-Hashimoto dopo un aggiornamento significativo dell'algoritmo, che comunque eredita i principi fondamentali del suo predecessore. La Rete Principale di Ethereum ha sempre e solo usato Ethash. Dagger Hashimoto era una versione di R&S dell'algoritmo di mining che è stata superata prima che il mining iniziasse sulla Rete Principale di Ethereum.

[Maggiori informazioni su Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
