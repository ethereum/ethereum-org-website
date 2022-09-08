---
title: Algoritmi di mining
description: Uno sguardo dettagliato agli algoritmi usati per il mining di Ethereum.
lang: it
sidebar: true
preMergeBanner: true
---

Il mining di Ethereum ha usato due algoritmi di mining, Dagger Hashimoto e Ethash. Dagger Hashimoto non è mai stato usato per fare mining di Ethereum, essendo stato sostituito da Ethash prima del lancio della rete principale. Era un algoritmo di mining di ricerca, che ha spianato la strada per Ethash. Riveste però un significato storico come un'importante innovazione nello sviluppo di Ethereum. Il mining proof-of-work stesso sarà abbandonato in favore del proof-of-stake durante [La Fusione](/upgrades/merge/), prevista nel terzo o quarto trimestre del 2022.

L'idea fondamentale di entrambi gli algoritmi di mining è che un miner cerca di trovare un input di nonce usando un calcolo di forza bruta, di modo che il risultato sia inferiore a una certa soglia di difficoltà. Questa soglia di difficoltà è regolabile dinamicamente, consentendo così una produzione dei blocchi a intervalli regolari.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo prima di leggere sul [consenso proof-of-work](/developers/docs/consensus-mechanisms/pow) e sul [mining](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto era un algoritmo di ricerca precursore del mining di Ethereum, sostituito da Ethash. Era un amalgama di due algoritmi differenti: Dagger e Hashimoto.

[Dagger](http://www.hashcash.org/papers/dagger.html) prevede la generazione di un [Grafico Aciclico Diretto](https://en.wikipedia.org/wiki/Directed_acyclic_graph), porzioni casuali del quale ricevono un hashing insieme. Il principio fondamentale è che ogni nonce richiede solo una piccola porzione di un grande albero di dati totali. Ricalcolare l'albero secondario per ogni nonce è proibitivo per il mining, da cui l'esigenza di memorizzare l'albero, invece, va bene per verificare un singolo nonce. Dagger è stato progettato per essere un'alternativa agli algoritmi esistenti come Scrypt, che sono gravosi per la memoria (memory-hard) ma difficili da verificare all'aumentare dell'uso della memoria verso livelli veramente sicuri. Dagger era però vulnerabile all'accelerazione dell'hardware con memoria condiviso ed è stato abbandonato a favore di altre vie di ricerca.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) è un algoritmo che aggiunge resistenza ASIC, essendo vincolato da aspetti I/O (cioè le letture di memoria rappresentano il fattore limitante nel processo di mining). La teoria è che vi sia più disponibilità di RAM che di calcolo: sono già stati usati miliardi di dollari in ricerca per l'ottimizzazione della RAM per diversi scenari d'uso, che spesso coinvolgono schemi d'accesso semi-casuale (da cui "memoria d'accesso casuale", Random Access Memory). Di conseguenza, è probabile che la RAM esistente sia abbastanza vicina all'ottimale per valutare l'algoritmo. Hashimoto usa la blockchain come una fonte di dati, perché soddisfa simultaneamente i punti (1) e (3) di cui sopra.

Dagger-Hashimoto usava delle versioni modificate degli algoritmi di Dagger e Hashimoto. La differenza tra Dagger Hashimoto e Hashimoto è che, anziché usare la blockchain come una fonte di dati, Dagger Hashimoto usa una serie di dati generata e personalizzata, che si aggiorna a seconda dei dati del blocco ogni N blocchi. La serie di dati è generata usando l'algoritmo di Dagger, che consente di calcolare efficientemente una sotto-serie specifica a ogni nonce per l'algoritmo di verifica del client leggero. La differenza tra Dagger Hashimoto e Dagger è che, a differenza del Dagger originale, il dataset usato per interrogare il blocco è semi-permanente, in quanto viene aggiornato solo occasionalmente (es. una volta a settimana). Questo significa che la porzione dello sforzo per generare il dataset è prossima allo zero, e diventano quindi trascurabili gli argomenti di Sergio Lerner riguardanti le velocizzazioni della memoria condivisa.

Maggiori informazioni su [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash è l'algoritmo di mining corrente di Ethereum. Ethash in realtà è un nuovo nome assegnato a una versione specifica di Dagger-Hashimoto dopo un aggiornamento significativo dell'algoritmo, che comunque eredita i principi fondamentali del suo predecessore. La rete principale di Ethereum ha sempre e solo usato Ethash; Dagger Hashimoto era una versione di ricerca dell'algoritmo di mining che è stata sostituita prima dell'inizio del mining sulla rete principale di Ethereum.

[Maggiori informazioni su Ethash](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash).

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
