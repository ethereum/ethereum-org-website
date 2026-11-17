---
title: Attestazioni
description: Una descrizione delle attestazioni su Ethereum proof-of-stake.
lang: it
---

Ci si aspetta che un validatore crei, firmi e trasmetta un'attestazione durante ogni epoca. Questa pagina illustra l'aspetto di queste attestazioni e come vengono elaborate e comunicate tra i client di consenso.

## Cos'è un'attestazione? {#what-is-an-attestation}

Ogni [epoca](/glossary/#epoch) (6,4 minuti) un validatore trasmette un'attestazione alla rete. L'attestazione è per uno slot specifico nell'epoca. Lo scopo dell'attestazione è votare a favore della visione della catena del validatore, in particolare la testa della catena, il checkpoint giustificato più recente e il checkpoint all'inizio dell'epoca corrente (noti come checkpoint `source` e `target`). Queste informazioni vengono combinate per tutti i validatori partecipanti, consentendo alla rete di raggiungere il consenso sullo stato della blockchain.

A partire dall'aggiornamento [Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), un'attestazione di un singolo validatore e un'attestazione aggregata hanno formati diversi. L'attestazione di un singolo validatore contiene:

- `committee_index`: il comitato a cui appartiene il validatore nello slot specificato
- `attester_index`: l'indice del validatore
- `data`: i dettagli relativi all'attestazione, come definiti di seguito
- `signature`: la firma BLS del validatore sui `data`

Il primo compito per un validatore attestante è costruire i `data`. I `data` contengono le seguenti informazioni:

- `slot`: Il numero di slot a cui si riferisce l'attestazione
- `index`: Impostato su `0` a partire da Pectra. Il comitato è identificato all'esterno dei `data` (da `committee_index`, o da `committee_bits` in un aggregato) in modo che i voti di comitati diversi abbiano `data` identici e possano essere aggregati insieme. Prima di Pectra, questo campo identificava il comitato
- `beacon_block_root`: L'hash radice del blocco che il validatore vede alla testa della catena (il risultato dell'applicazione dell'algoritmo di scelta del fork)
- `source`: Parte del voto di definitività che indica ciò che i validatori vedono come il checkpoint giustificato più recente
- `target`: Parte del voto di definitività che indica ciò che i validatori vedono come il checkpoint all'inizio dell'epoca corrente (il blocco al suo primo slot, o l'ultimo blocco precedente se quello slot è vuoto)

Una volta costruiti i `data`, il validatore li firma e trasmette l'attestazione alla [sottorete](#aggregated-attestation) per il suo comitato.

### Attestazione aggregata {#aggregated-attestation}

C'è un notevole sovraccarico associato al passaggio di questi dati attraverso la rete per ogni validatore. Pertanto, le attestazioni dei singoli validatori vengono aggregate all'interno delle sottoreti prima di essere trasmesse più ampiamente. Ciò include l'aggregazione delle firme in modo che un'attestazione trasmessa includa i `data` di consenso e una singola firma formata combinando le firme di tutti i validatori che concordano con quei `data`. Un'attestazione aggregata contiene:

- `aggregation_bits`: una lista di bit con un bit per membro di ciascun comitato incluso, in cui la posizione corrisponde alla posizione del validatore nel suo comitato; il valore (0/1) indica se la firma di quel validatore è inclusa
- `data`: i dati dell'attestazione firmati da ogni validatore incluso
- `signature`: una firma BLS che aggrega le firme dei validatori inclusi
- `committee_bits`: i membri di quali comitati sono coperti da `aggregation_bits`

Chiunque può verificare la firma aggregata rispetto alle chiavi pubbliche combinate dei validatori i cui bit sono impostati.

In ogni slot, circa 16 membri di ciascun comitato vengono selezionati per essere i suoi `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Un validatore apprende se è stato selezionato dalla propria firma sul numero di slot. Gli aggregatori raccolgono tutte le attestazioni che ricevono sulla sottorete del loro comitato che hanno gli stessi `data` dei propri, e le combinano, registrando il mittente di ciascuna nella `aggregation_bits`. Gli aggregatori trasmettono quindi l'aggregato alla rete più ampia.

Quando un validatore viene selezionato per essere un proponente del blocco, include le attestazioni aggregate degli slot recenti nel nuovo blocco. A partire da Pectra, il proponente può unire gli aggregati di comitati diversi che condividono gli stessi `data` in un'unica attestazione, e un blocco può contenerne fino a 8.

### Ciclo di vita dell'inclusione dell'attestazione {#attestation-inclusion-lifecycle}

1. Generazione
2. Propagazione
3. Aggregazione
4. Propagazione
5. Inclusione

Il ciclo di vita dell'attestazione è illustrato nello schema seguente:

<AttestationsDiagram />

## Ricompense {#rewards}

I validatori vengono ricompensati per l'invio di attestazioni. La ricompensa dell'attestazione dipende dai flag di partecipazione (origine, destinazione e testa), dalla ricompensa di base e dal tasso di partecipazione.

Ciascuno dei flag di partecipazione può essere vero o falso, a seconda dell'attestazione inviata e del suo ritardo di inclusione.

Lo scenario migliore si verifica quando tutti e tre i flag sono veri, nel qual caso un validatore guadagnerebbe (per ogni flag corretto):

`reward += base reward * flag weight * flag attesting rate / 64`

Il tasso di attestazione del flag viene misurato utilizzando la somma dei saldi effettivi di tutti i validatori attestanti per il flag specificato rispetto al saldo effettivo attivo totale.

### Ricompensa di base {#base-reward}

La ricompensa di base viene calcolata in base al numero di validatori attestanti e ai loro saldi effettivi di ether in staking:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Ritardo di inclusione {#inclusion-delay}

Nel momento in cui i validatori hanno votato sulla testa della catena (`block n`), `block n+1` non era ancora stato proposto. Pertanto le attestazioni vengono naturalmente incluse **un blocco dopo**, quindi tutte le attestazioni che hanno votato affinché `block n` fosse la testa della catena sono state incluse in `block n+1` e il **ritardo di inclusione** è 1. Il ritardo di inclusione decide quali flag di partecipazione guadagna un'attestazione:

- `head`: solo se il ritardo di inclusione è esattamente di 1 slot
- `source`: se il ritardo di inclusione è al massimo di 5 slot (la radice quadrata intera dei 32 slot in un'epoca)
- `target`: ogni volta che l'attestazione viene inclusa (a partire dall'aggiornamento Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Quindi un'attestazione inclusa con due slot di ritardo perde la sua ricompensa per la testa ma guadagna comunque le ricompense per l'origine e la destinazione.

### Scenari di attestazione {#attestation-scenarios}

#### Validatore Votante Mancante {#missing-voting-validator}

Un'attestazione può essere inclusa in qualsiasi blocco dallo slot successivo a quello in cui è stata effettuata fino alla fine dell'epoca successiva. Se un'attestazione dell'epoca 0 non viene inclusa in un blocco durante l'epoca 0, può comunque essere inclusa nell'epoca 1, con un ritardo di inclusione maggiore.

#### Aggregatore Mancante {#missing-aggregator}

Ogni comitato punta a circa 16 aggregatori in ogni slot, quindi un aggregatore mancante raramente impedisce l'aggregazione delle attestazioni di un comitato. Separatamente, ogni nodo beacon rimane iscritto a **due sottoreti per 256 epoche** alla volta, scelte dal suo ID del nodo, il che mantiene ogni sottorete ben connessa.

#### Proponente del blocco mancante {#missing-block-proposer}

Nota che in alcuni casi un aggregatore fortunato potrebbe anche diventare il proponente del blocco. Se l'attestazione non è stata inclusa perché il proponente del blocco è scomparso, il proponente del blocco successivo raccoglierebbe l'attestazione aggregata e la includerebbe nel blocco successivo. Tuttavia, il **ritardo di inclusione** aumenterà di uno.

## Letture consigliate {#further-reading}

- [Attestazioni nelle specifiche di consenso annotate di Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestazioni su eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Attestazioni nelle specifiche di consenso di Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
