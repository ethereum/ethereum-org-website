---
title: Blocchi
description: "Panoramica dei blocchi nella blockchain Ethereum: struttura dati, a cosa servono e come sono fatti."
lang: it
sidebar: true
---

I blocchi sono un insieme di transazioni che contengono un hash del blocco precedente nella catena. Per questo motivo, sono collegati l'uno all'altro nella catena, perché gli hash vengono calcolati crittograficamente dai dati del blocco. Questi impedisce anche le frodi, perché un cambiamento in qualsiasi blocco nella cronologia invaliderebbe tutti i blocchi successivi, dato che gli hash successivi cambierebbero e tutti coloro che eseguono la blockchain se ne accorgerebbero.

## Prerequisiti {#prerequisites}

Quello dei blocchi è un argomento piuttosto basico. Per aiutarti però a comprendere meglio questa pagina, consigliamo di leggere prima [Account](/developers/docs/accounts/), [Transazioni](/developers/docs/transactions/) e la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Perché i blocchi? {#why-blocks}

Per assicurare che tutti i partecipanti della rete Ethereum siano sincronizzati e concordino sulla cronologia esatta delle transazioni, raggruppiamo le transazioni in blocchi. Significa che decine (o centinaia) di transazioni vengono inviate, approvate e sincronizzate in una volta sola.

![Diagramma che mostra una transazione in un blocco che causa cambiamenti di stato](../../../../../developers/docs/blocks/tx-block.png) _Diagramma adattato dall' [illustrazione dell'Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Scaglionando gli invii, diamo a tutti i partecipanti della rete abbastanza tempo per giungere al consenso: anche se arrivano decine di richieste di transazione al secondo, i blocchi su Ethereum vengono inviati più o meno ogni quindici secondi.

## Come funzionano i blocchi {#how-blocks-work}

Per preservare la cronologia delle transazioni, i blocchi sono ordinati in modo rigoroso (ogni nuovo blocco che viene creato contiene un riferimento al blocco padre) e anche le transazioni all'interno del blocco sono ordinate altrettanto rigorosamente. A parte in rari casi, in ogni momento, tutti i partecipanti della rete concordano sul numero e sulla cronologia esatta dei blocchi e lavorano per raggruppare le richieste di transazione live nel blocco successivo.

Dopo essere stato realizzato (si parla di mining) da alcuni miner della rete, un blocco viene propagato al resto della rete; tutti i nodi vengono aggiunti al blocco alla fine della relativa blockchain e il processo di mining continua. Il processo esatto di costruzione dei blocchi (mining) e il processo di invio/consenso è attualmente specificato nel protocollo di Ethereum "proof-of-work".

### Demo visiva {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protocollo proof-of-work {#proof-of-work-protocol}

Proof-of-work significa:

- I nodi di mining devono impegnare una quantità variabile ma consistente di energia, tempo e potenza di calcolo per produrre un "certificato di legittimità" per il blocco che propongono alla rete. Questo aiuta a proteggere la rete da spam o attacchi DoS, tra le altre cose \*, perché questi certificati sono costosi da produrre.
- Gli altri miner a cui viene inviata notifica di un nuovo blocco con un certificato di legittimità valido devono \*accettare il nuovo blocco come blocco successivo canonico della blockchain.
- La quantità esatta di tempo richiesta da ogni miner per produrre questo certificato varia casualmente e con elevata frequenza. Questo assicura che sia improbabile* che due miner producano nello stesso momento convalide per un blocco successivo proposto; quando un miner produce e propaga un nuovo blocco certificato, c'è una relativa sicurezza che il blocco venga accettato dalla rete come blocco canonico successivo della blockchain, senza conflitto* (sebbene sia disponibile un protocollo per gestire i conflitti nel caso in cui due catene di blocchi certificati vengano prodotte praticamente simultaneamente).

[Maggiori informazioni sul mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Cosa c'è in un blocco? {#block-anatomy}

- Timestamp - ora di mining del blocco.
- Numero del blocco - lunghezza della blockchain indicata in numero di blocchi.
- Difficoltà - lavoro necessario per il mining del blocco.
- mixHash - identificatore univoco del blocco.
- Hash padre - identificatore univoco del blocco precedente (questo è il modo in cui i blocchi sono collegati in una catena).
- Elenco delle transazioni - transazioni incluse in un blocco.
- Radice stato - intero stato del sistema: contiene saldi degli account, archiviazione dei contratti, codice dei contratti e nonce degli account.
- Nonce - hash che, se combinato con il mixHash, prova che il blocco ha superato la [proof of work](/developers/docs/consensus-mechanisms/pow/).

## Dimensione del blocco {#block-size}

Un'ultima nota importante: i blocchi stessi sono limitati in termini di dimensioni. Ogni blocco ha un limite di carburante, impostato dalla rete e dai miner: la quantità totale di carburante utilizzato da tutte le transazioni nel blocco deve essere inferiore al limite di carburante del blocco. Questo è importante perché evita che i blocchi siano arbitrariamente grandi. Se i blocchi potessero essere arbitrariamente grandi, i nodi completi meno performanti, gradualmente, non riuscirebbero più stare al passo con la rete per via dei requisiti di spazio e velocità. Il limite di carburante per blocco al blocco 0 era stato inizializzato a 5000; ogni miner che esegue il mining di un nuovo blocco può modificare il limite di carburante di circa lo 0,1% al massimo, in entrambe le direzioni, rispetto al limite di carburante del blocco padre. Il limite di carburante a novembre 2018 si aggirava intorno a 8.000.000.

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transazioni](/developers/docs/transactions/)
- [Carburante](/developers/docs/gas/)
