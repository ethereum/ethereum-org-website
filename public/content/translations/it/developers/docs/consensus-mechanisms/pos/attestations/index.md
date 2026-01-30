---
title: Attestazioni
description: Descrizione delle attestazioni nella proof-of-stake di Ethereum.
lang: it
---

Un validatore dovrebbe creare, firmare e trasmettere una attestazione durante ogni epoca. Questa pagina delinea come appaiono queste attestazioni e come sono elaborate e comunicate tra i client di consenso.

## Cos'è un'attestazione? {#what-is-an-attestation}

Ogni [epoca](/glossary/#epoch) (6,4 minuti), un validatore propone un'attestazione alla rete. L'attestazione è per uno slot specifico nell'epoca. Lo scopo dell'attestazione è votare a favore della visione della catena del validatore, in particolare il blocco giustificato più recente e il primo blocco nell'epoca corrente (noti come checkpoint `source` e `target`). Queste informazioni sono combinate per tutti i validatori partecipanti, consentendo alla rete di raggiungere il consenso sullo stato della blokchain.

L'attestazione contiene i componenti seguenti:

- `aggregation_bits`: una bitlist di validatori in cui la posizione corrisponde all'indice del validatore nella propria commissione; il valore (0/1) indica se il validatore ha firmato i `data` (cioè se è attivo e d'accordo con il propositore del blocco).
- `data`: dettagli relativi all'attestazione, come definiti di seguito
- `signature`: una firma BLS che aggrega le firme dei singoli validatori

Il primo compito per un validatore attestante è costruire i `data`. I `data` contengono le seguenti informazioni:

- `slot`: il numero di slot a cui si riferisce l'attestazione
- `index`: un numero che identifica a quale commissione appartiene il validatore in un dato slot
- `beacon_block_root`: hash radice del blocco che il validatore vede in testa alla catena (il risultato dell'applicazione dell'algoritmo di scelta della biforcazione)
- `source`: parte del voto di finalità che indica ciò che i validatori vedono come il blocco giustificato più recente
- `target`: parte del voto di finalità che indica ciò che i validatori vedono come il primo blocco nell'epoca corrente

Una volta costruiti i `data`, il validatore può invertire il bit in `aggregation_bits` corrispondente al proprio indice del validatore da 0 a 1 per mostrare di aver partecipato.

Infine, il validatore firma l'attestazione e la trasmette sulla rete.

### Attestazione aggregata {#aggregated-attestation}

Le spese aggiuntive associate al trasferimento di questi dati nella rete sono molto elevate per ogni validatore. Di conseguenza, prima ancora che avvenga la trasmissione su larga scala, le attestazioni dei singoli validatori sono aggregate in reti secondarie. Questo include l'aggregazione delle firme in modo che un'attestazione trasmessa includa i `data` di consenso e una firma singola formata combinando le firme di tutti i validatori che sono d'accordo con tali `data`. Questo può essere verificato utilizzando `aggregation_bits`, poiché questo fornisce l'indice di ogni validatore nella propria commissione (il cui ID è fornito in `data`), che può essere utilizzato per interrogare le singole firme.

In ogni epoca, 16 validatori in ogni sottorete sono selezionati per essere gli `aggregatori`. Gli aggregatori raccolgono tutte le attestazioni di cui vengono a conoscenza sulla rete gossip che hanno `data` equivalenti ai propri. Il mittente di ogni attestazione corrispondente è registrato in `aggregation_bits`. Quindi, gli aggregatori trasmettono l'aggregato di attestazioni al resto della rete.

Quando un validatore viene selezionato per essere un propositore di blocchi, impacchetta le attestazioni aggregate dalle reti secondarie fino all'ultimo slot nel nuovo blocco.

### Ciclo di vita dell'inclusione dell'attestazione {#attestation-inclusion-lifecycle}

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

`ricompensa di base = saldo effettivo del validatore x 2^6 / SQRT(saldo effettivo di tutti i validatori attivi)`

#### Ritardo di inclusione {#inclusion-delay}

Nel momento in cui i validatori hanno votato sulla testa della catena (`block n`), il `block n+1` non era ancora stato proposto. Pertanto, le attestazioni vengono naturalmente incluse **un blocco dopo**, quindi tutte le attestazioni che hanno votato affinché il `block n` fosse la testa della catena sono state incluse nel `block n+1` e il **ritardo di inclusione** è 1. Se il ritardo d'inclusione raddoppia a due slot, la ricompensa di attestazione si dimezza, perché per calcolare la ricompensa di attestazione la ricompensa di base è moltiplicata per il reciproco del ritardo d'inclusione.

### Scenari di attestazione {#attestation-scenarios}

#### Validatore votante mancante {#missing-voting-validator}

I validatori hanno un massimo di 1 epoca per inviare le proprie attestazioni. Se l'attestazione era mancante nell'epoca 0, può essere inviata con un ritardo d'inclusione nell'epoca 1.

#### Aggregatore mancante {#missing-aggregator}

Per ogni epoca ci sono in totale 16 Aggregatori. Inoltre, validatori casuali si iscrivono a **due sottoreti per 256 epoche** e fungono da backup nel caso in cui gli aggregatori manchino.

#### Propositore del blocco mancante {#missing-block-proposer}

Si noti che in alcuni casi un aggregatore fortunato potrebbe anche diventare il propositore di blocchi. Se l'attestazione non è stata inclusa perché il propositore di blocchi è mancante, sarebbe il propositore successivo a selezionare l'attestazione aggregata e includerla nel blocco successivo. Tuttavia, il **ritardo di inclusione** aumenterà di uno.

## Letture consigliate {#further-reading}

- [Attestazioni nella spec del consenso commentata di Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestazioni su eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
