---
title: Algoritmi di minaggio
description: Uno sguardo dettagliato agli algoritmi utilizzati per il minaggio di Ethereum.
lang: it
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La Prova di lavoro (PoW) non è più alla base del meccanismo di consenso di Ethereum, il che significa che il minaggio è stato disattivato. Invece, Ethereum è protetto da validatori che mettono in staking i propri ETH. Puoi iniziare a mettere in staking i tuoi ETH oggi stesso. Maggiori informazioni su <a href='/roadmap/merge/'>The Merge</a>, sulla <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake (PoS)</a> e sullo <a href='/staking/'>staking</a>. Questa pagina è solo di interesse storico.
</AlertDescription>
</AlertContent>
</Alert>

Il minaggio di Ethereum utilizzava un algoritmo noto come Ethash. L'idea fondamentale dell'algoritmo è che un minatore cerca di trovare un input nonce utilizzando il calcolo a forza bruta in modo che l'hash risultante sia inferiore a una soglia determinata dalla difficoltà calcolata. Questo livello di difficoltà può essere regolato dinamicamente, consentendo la produzione di blocchi a intervalli regolari.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le informazioni sul [consenso basato sulla Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow) e sul [minaggio](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto era un algoritmo di ricerca precursore per il minaggio di Ethereum che è stato sostituito da Ethash. Era una fusione di due diversi algoritmi: Dagger e Hashimoto. È stato solo un'implementazione di ricerca ed è stato sostituito da Ethash prima del lancio della Mainnet di Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) prevede la generazione di un [Grafo Aciclico Diretto (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), le cui porzioni casuali vengono sottoposte ad hash insieme. Il principio fondamentale è che ogni nonce richiede solo una piccola porzione di un grande albero di dati totale. Ricalcolare il sottoalbero per ogni nonce è proibitivo per il minaggio (da qui la necessità di memorizzare l'albero), ma va bene per la verifica del valore di un singolo nonce. Dagger è stato progettato per essere un'alternativa agli algoritmi esistenti come Scrypt, che sono intensivi in termini di memoria (memory-hard) ma difficili da verificare quando la loro intensità di memoria aumenta a livelli genuinamente sicuri. Tuttavia, Dagger era vulnerabile all'accelerazione hardware della memoria condivisa ed è stato abbandonato a favore di altre vie di ricerca.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) è un algoritmo che aggiunge resistenza agli ASIC essendo limitato dall'I/O (cioè, le letture della memoria sono il fattore limitante nel processo di minaggio). La teoria è che la RAM sia più disponibile rispetto alla capacità di calcolo; miliardi di dollari di ricerca hanno già studiato l'ottimizzazione della RAM per diversi casi d'uso, che spesso comportano modelli di accesso quasi casuali (da cui "memoria ad accesso casuale"). Di conseguenza, è probabile che la RAM esistente sia moderatamente vicina all'ottimale per la valutazione dell'algoritmo. Hashimoto utilizza la blockchain come fonte di dati, soddisfacendo contemporaneamente i punti (1) e (3) di cui sopra.

Dagger-Hashimoto utilizzava versioni modificate degli algoritmi Dagger e Hashimoto. La differenza tra Dagger-Hashimoto e Hashimoto è che, invece di utilizzare la blockchain come fonte di dati, Dagger-Hashimoto utilizza un set di dati generato su misura, che si aggiorna in base ai dati del blocco ogni N blocchi. Il set di dati viene generato utilizzando l'algoritmo Dagger, consentendo di calcolare in modo efficiente un sottoinsieme specifico per ogni nonce per l'algoritmo di verifica del client leggero. La differenza tra Dagger-Hashimoto e Dagger è che, a differenza del Dagger originale, il set di dati utilizzato per interrogare il blocco è semi-permanente, venendo aggiornato solo a intervalli occasionali (ad es., una volta alla settimana). Ciò significa che la porzione di sforzo per generare il set di dati è vicina allo zero, quindi le argomentazioni di Sergio Lerner riguardo agli incrementi di velocità della memoria condivisa diventano trascurabili.

Maggiori informazioni su [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash era l'algoritmo di minaggio effettivamente utilizzato sulla vera Mainnet di Ethereum sotto l'architettura ormai deprecata della Prova di lavoro (PoW). Ethash era di fatto un nuovo nome dato a una versione specifica di Dagger-Hashimoto dopo che l'algoritmo è stato aggiornato in modo significativo, pur ereditando i principi fondamentali del suo predecessore. La Mainnet di Ethereum ha sempre e solo utilizzato Ethash: Dagger-Hashimoto era una versione di ricerca e sviluppo dell'algoritmo di minaggio che è stata sostituita prima dell'inizio del minaggio sulla Mainnet di Ethereum.

[Maggiori informazioni su Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_