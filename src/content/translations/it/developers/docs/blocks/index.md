---
title: Blocchi
description: "Panoramica dei blocchi nella blockchain Ethereum: struttura dati, a cosa servono e come sono fatti."
lang: it
sidebar: true
---

I blocchi sono un insieme di transazioni che contengono un hash del blocco precedente nella catena. Per questo motivo, sono collegati l'uno all'altro nella catena, perché gli hash vengono calcolati crittograficamente dai dati del blocco. Questi impedisce anche le frodi, perché un cambiamento in qualsiasi blocco nella cronologia invaliderebbe tutti i blocchi successivi, dato che gli hash successivi cambierebbero e tutti coloro che eseguono la blockchain se ne accorgerebbero.

## Prerequisiti {#prerequisites}

Quello dei blocchi è un argomento piuttosto basico. Ad ogni modo, per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere [Account](/developers/docs/accounts/), [Transazioni](/developers/docs/transactions/) e la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Perché i blocchi? {#why-blocks}

Per far sì che tutti i partecipanti della rete Ethereum siano sincronizzati e concordino sulla cronologia esatta delle transazioni, le transazioni vengono raggruppate in blocchi. Significa che decine (o centinaia) di transazioni vengono inviate, approvate e sincronizzate in una volta sola.

![Diagramma che mostra una transazione in un blocco che provoca cambiamenti di stato](./tx-block.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Scaglionando gli invii, diamo a tutti i partecipanti della rete abbastanza tempo per giungere al consenso: anche se arrivano decine di richieste di transazione al secondo, i blocchi su Ethereum vengono inviati più o meno ogni quindici secondi.

## Come funzionano i blocchi {#how-blocks-work}

Per preservare la cronologia delle transazioni, i blocchi sono ordinati in modo rigoroso (ogni nuovo blocco che viene creato contiene un riferimento al blocco padre) e anche le transazioni all'interno del blocco sono ordinate altrettanto rigorosamente. A parte in rari casi, in ogni momento, tutti i partecipanti della rete concordano sul numero e sulla cronologia esatta dei blocchi e lavorano per raggruppare le richieste di transazione live nel blocco successivo.

Dopo essere stato realizzato (si parla di mining) da alcuni miner della rete, un blocco viene propagato al resto della rete; tutti i nodi vengono aggiunti al blocco alla fine della relativa blockchain e il processo di mining continua. Il processo esatto di costruzione dei blocchi (mining) e il processo di invio/consenso è attualmente specificato nel protocollo di Ethereum "Proof of work".

### Demo visiva {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protocollo Proof of Work {#proof-of-work-protocol}

Il significato di proof of work è il seguente:

- I nodi di mining devono impegnare una quantità variabile ma consistente di energia, tempo e potenza di calcolo per produrre un "certificato di legittimità" per il blocco che propongono alla rete. Questo aiuta a proteggere la rete da spam, attacchi DoS e altro, perché questi certificati sono costosi da produrre.
- Gli altri miner a cui viene inviata notifica di un nuovo blocco con un certificato di legittimità valido devono accettarlo come blocco successivo canonico della blockchain.
- La quantità esatta di tempo richiesta da ogni miner per produrre questo certificato varia casualmente e con elevata frequenza. Ciò rende improbabile che due miner convalidino contemporaneamente un blocco successivo proposto; quando un miner produce e condivide un nuovo blocco certificato, c'è una relativa sicurezza che il blocco venga accettato dalla rete come blocco canonico successivo della blockchain, senza conflitti (sebbene sia disponibile un protocollo per gestire i conflitti nel caso in cui due catene di blocchi certificati vengano prodotte praticamente simultaneamente).

[Maggiori informazioni sul mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Cosa c'è in un blocco? {#block-anatomy}

- `timestamp` - l'ora in cui il blocco è stato minato.
- `blockNumber` – la lunghezza della blockchain misurata in blocchi.
- `baseFeePerGas` - la commissione minima in gas richiesta perché una transazione venga inclusa nel blocco.
- `difficulty` – la quantità di lavoro necessaria per il mining del blocco.
- `mixHash` – un identificativo unico per il blocco in questione.
- `parentHash` - l'identificativo unico per il blocco precedente (è il modo con cui i blocchi sono collegati tra loro in una catena).
- `transactions` – le transazioni incluse nel blocco.
- `stateRoot` – l'intero stato del sistema: i saldi degli account, l'archiviazione ed il codice del contratto e i nonce dell'account.
- `nonce` – un hash che, in combinazione con il mixHash, prova che il blocco ha superato la [Proof of Work](/developers/docs/consensus-mechanisms/pow/).

## Tempo di blocco {#block-time}

Il tempo di blocco si riferisce al tempo necessario per minare un nuovo blocco. In Ethereum, il tempo di blocco medio è compreso tra 12 e 14 secondi e viene valutato dopo ogni blocco. Il tempo di blocco previsto è impostato come una costante a livello di protocollo ed è usato per proteggere la sicurezza della rete quando i miner aumentano la potenza di calcolo. Il tempo di blocco medio viene confrontato con il tempo di blocco previsto e, se il tempo medio risulta più alto, viene diminuita la difficoltà nell'intestazione del blocco. Se invece il tempo di blocco medio è inferiore, la difficoltà nell'intestazione del blocco viene aumentata.

## Dimensioni del blocco {#block-size}

Un'ultima nota importante: i blocchi stessi sono limitati in termini di dimensioni. Ogni blocco ha una dimensione prevista di 15 milioni di gas, ma la dimensione dei blocchi aumenta o diminuisce in base alla domanda della rete, fino al limite massimo di 30 milioni di gas del blocco (2 volte la dimensione target del blocco). L'ammontare totale di carburante usato da tutte le transazioni nel blocco deve essere inferiore al limite di carburante del blocco. Questo è importante perché evita che i blocchi siano arbitrariamente grandi. Se i blocchi potessero essere arbitrariamente grandi, gradualmente i nodi completi meno performanti non riuscirebbero più stare al passo con la rete per via dei requisiti di spazio e velocità.

## Lettura consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transazioni](/developers/docs/transactions/)
- [Carburante](/developers/docs/gas/)
