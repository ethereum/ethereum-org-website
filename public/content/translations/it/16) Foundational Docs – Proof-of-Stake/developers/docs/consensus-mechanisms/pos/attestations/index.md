---
title: Attestazioni
description: Descrizione delle attestazioni nella proof-of-stake di Ethereum.
lang: it
---

Un validatore dovrebbe creare, firmare e trasmettere una attestazione durante ogni epoca. Questa pagina delinea come appaiono queste attestazioni e come sono elaborate e comunicate tra i client di consenso.

## Cos'è un'attestazione? {#what-is-an-attestation}

Ogni [epoca](/glossary/#epoch) (6,4 minuti), un validatore propone un'attestazione alla rete. L'attestazione è per uno slot specifico nell'epoca. Lo scopo dell'attestazione è votare a favore della visione della catena del validatore, in particolare il blocco giustificato più recente e il primo blocco nell'epoca corrente (noti come punti di controllo `source` (origine) e `target` (destinazione)). Queste informazioni sono combinate per tutti i validatori partecipanti, consentendo alla rete di raggiungere il consenso sullo stato della blokchain.

L'attestazione contiene i componenti seguenti:

- `aggregation_bits`: un bitlist di validatori in cui la posizione mappa all'indice del validatore nella loro commissione; il valore (0/1) indica se il validatore ha firmato i `data` (cioè, se è attivo ed è d'accordo con il propositore del blocco)
- `data`: dettagli relativi all'attestazione, come definito sotto
- `signature`: una firma BLS che aggrega le firme dei singoli validatori

La prima mansione per un validatore attestante è costruire `data`. I `data` contengono le seguenti informazioni:

- `slot`: Il numero di slot a cui si riferisce l'attestazione
- `index`: Un numero che identifica a quale commissione appartiene il validatore in un dato slot
- `beacon_block_root`: Hash radice del blocco che il validatore vede alla testa della catena (il risultato dell'applicazione dell'algoritmo di scelta della diramazione)
- `source`: Parte del voto di finalità che indica ciò che i validatori vedono come il blocco giustificato più recente
- `target`: Parte del voto di finalità che indica cosa i validatori vedono come il primo blocco nell'epoca corrente

Una volta costruiti i `data`, il validatore può capovolgere il bit in `aggregation_bits`, corrispondenti al proprio indice del validatore da 0 a 1 per mostrare di aver partecipato.

Infine, il validatore firma l'attestazione e la trasmette sulla rete.

### Attestazione aggregata {#aggregated-attestation}

Le spese aggiuntive associate al trasferimento di questi dati nella rete sono molto elevate per ogni validatore. Di conseguenza, prima ancora che avvenga la trasmissione su larga scala, le attestazioni dei singoli validatori sono aggregate in reti secondarie. Questo include l'aggregazione delle firme in modo che un'attestazione che viene trasmessa includa i `dati` di consenso e un'unica firma creata combinando le firme di tutte i validatori d'accordo con tali `dati`. Ciò è verificabile utilizzando `aggregation_bits`, poiché questi forniscono l'indice di ogni validatore nella propria commissione (i cui ID sono forniti in `data`) che può essere utilizzato per richiedere le singole firme.

In ogn epoca 16 validatori in ogni rete secondaria sono selezionati per fungere da `aggregatori`. Gli aggregatori raccolgono tutte le attestazioni a loro note sulla rete di gossip aventi `dati` equivalenti ai loro. Il mittente di ogni attestazione corrispondente è registrato negli `aggregation_bits`. Quindi, gli aggregatori trasmettono l'aggregato di attestazioni al resto della rete.

Quando un validatore viene selezionato per essere un propositore di blocchi, impacchetta le attestazioni aggregate dalle reti secondarie fino all'ultimo slot nel nuovo blocco.

### Ciclo di vita di inclusione dell'attestazione {#attestation-inclusion-lifecycle}

1. Generazione
2. Propagazione
3. Aggregazione
4. Propagazione
5. Inclusione

Il ciclo di vita dell'attestazione è delineato nel seguente schema:

![ciclo di vita dell'attestazione](./attestation_schematic.png)

## Ricompense {#rewards}

I validatori sono ricompensati per l'invio delle attestazioni. La ricompensa d'attestazione dipende dai flag di partecipazione (sorgente, destinazione e testa), dalla ricompensa di base e dal tasso di partecipazione.

Ogni flag di partecipazione può essere vero o falso, a seconda dell'attestazione inviata e del suo ritardo di inclusione.

Lo scenario migliore si verifica quando i tre flag sono tutti veri, nel qual caso un validatore guadagnerà (per flag corretto):

`ricompensa += ricompensa di base * peso del flag * tasso di attestazione del flag / 64`

Il tasso di attestazione del flag si misura utilizzando la somma dei saldi effettivi di tutti i validatori attestanti per il dato flag confrontato al saldo effettivo attivo totale.

### Ricompensa di base {#base-reward}

La ricompensa di base è calcolata secondo il numero di validatori attestanti e i loro saldi effettivi di ether in staking:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Ritardo d'inclusione {#inclusion-delay}

Al momento del voto dei validatori sulla testa della catena (`block n`), `block n+1` non era ancora stato proposto. Pertanto, le attestazioni sono incluse naturalmente **un blocco più tardi**, così che tutte le attestazioni che hanno votato sul `block n`, che è la testa della catena, sono incluse in `block n+1` e il **ritardo d'inclusione** è 1. Se il ritardo d'inclusione raddoppia a due slot, la ricompensa di attestazione si dimezza, perché per calcolare la ricompensa di attestazione la ricompensa di base è moltiplicata per il reciproco del ritardo d'inclusione.

### Scenari di attestazione {#attestation-scenarios}

#### Validatore votante mancante {#missing-voting-validator}

I validatori hanno un massimo di 1 epoca per inviare le proprie attestazioni. Se l'attestazione era mancante nell'epoca 0, può essere inviata con un ritardo d'inclusione nell'epoca 1.

#### Aggregatore mancante {#missing-aggregator}

Per ogni epoca ci sono in totale 16 Aggregatori. Inoltre, alcuni validatori casuali si iscrivono a **due reti secondarie per 256 epoche** e servono da backup nel caso in cui gli aggregatori siano mancanti.

#### Propositore di blocchi mancante {#missing-block-proposer}

Si noti che in alcuni casi un aggregatore fortunato potrebbe anche diventare il propositore di blocchi. Se l'attestazione non è stata inclusa perché il propositore di blocchi è mancante, sarebbe il propositore successivo a selezionare l'attestazione aggregata e includerla nel blocco successivo. Tuttavia, il **ritardo d'inclusione** aumenterebbe di uno.

## Lettura consigliate {#further-reading}

- [Le attestazioni nelle specifiche del consenso annotate da Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Le attestazioni su eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
