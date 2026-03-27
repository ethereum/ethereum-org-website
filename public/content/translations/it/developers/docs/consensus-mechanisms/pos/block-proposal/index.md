---
title: Proposta del blocco
description: Spiegazione di come vengono proposti i blocchi in Ethereum basato sulla prova di stake.
lang: it
---

I blocchi sono le unità fondamentali della blockchain. I blocchi sono unità discrete di informazioni che vengono passate tra i nodi, concordate e aggiunte al database di ciascun nodo. Questa pagina spiega come vengono prodotti.

## Prerequisiti {#prerequisites}

La proposta del blocco fa parte del protocollo di prova di stake. Per aiutare a comprendere questa pagina, ti consigliamo di leggere della [prova di stake](/developers/docs/consensus-mechanisms/pos/) e dell'[architettura dei blocchi](/developers/docs/blocks/).

## Chi produce i blocchi? {#who-produces-blocks}

Gli account dei validatori propongono i blocchi. Gli account dei validatori sono gestiti dagli operatori dei nodi che eseguono il software del validatore come parte dei loro client di esecuzione e client di consenso e hanno depositato almeno 32 ETH nel contratto di deposito. Tuttavia, ogni validatore è responsabile della proposta di un blocco solo occasionalmente. [Ethereum](/) misura il tempo in slot ed epoche. Ogni slot dura dodici secondi e 32 slot (6,4 minuti) costituiscono un'epoca. Ogni slot è un'opportunità per aggiungere un nuovo blocco su Ethereum.

### Selezione casuale {#random-selection}

Un singolo validatore viene scelto in modo pseudo-casuale per proporre un blocco in ogni slot. Non esiste una vera casualità in una blockchain perché se ogni nodo generasse numeri genuinamente casuali, non potrebbero giungere al consenso. Invece, l'obiettivo è rendere imprevedibile il processo di selezione del validatore. La casualità è ottenuta su Ethereum utilizzando un algoritmo chiamato RANDAO che mescola un hash del proponente del blocco con un seme (seed) che viene aggiornato a ogni blocco. Questo valore viene utilizzato per selezionare un validatore specifico dall'insieme totale dei validatori. La selezione del validatore è fissata con due epoche di anticipo come modo per proteggersi contro certi tipi di manipolazione del seme.

Sebbene i validatori aggiungano a RANDAO in ogni slot, il valore globale di RANDAO viene aggiornato solo una volta per epoca. Per calcolare l'indice del successivo proponente del blocco, il valore RANDAO viene mescolato con il numero dello slot per fornire un valore univoco in ogni slot. La probabilità che un singolo validatore venga selezionato non è semplicemente `1/N` (dove `N` = totale dei validatori attivi). Invece, è ponderata dal saldo effettivo in ETH di ciascun validatore. Il saldo effettivo massimo è di 32 ETH (questo significa che `balance < 32 ETH` porta a un peso inferiore rispetto a `balance == 32 ETH`, ma `balance > 32 ETH` non porta a un peso maggiore rispetto a `balance == 32 ETH`).

Viene selezionato un solo proponente del blocco in ogni slot. In condizioni normali, un singolo produttore di blocchi crea e rilascia un singolo blocco nel proprio slot dedicato. Creare due blocchi per lo stesso slot è un'infrazione punibile, spesso nota come "equivocazione".

## Come viene creato il blocco? {#how-is-a-block-created}

Ci si aspetta che il proponente del blocco trasmetta un blocco della beacon chain firmato che si basa sulla testa più recente della catena secondo la vista del proprio algoritmo di scelta della biforcazione eseguito localmente. L'algoritmo di scelta della biforcazione applica eventuali attestazioni in coda rimaste dallo slot precedente, quindi trova il blocco con il maggior peso accumulato di attestazioni nella sua cronologia. Quel blocco è il genitore del nuovo blocco creato dal proponente.

Il proponente del blocco crea un blocco raccogliendo dati dal proprio database locale e dalla propria vista della catena. I contenuti del blocco sono mostrati nel frammento sottostante:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Il campo `randao_reveal` accetta un valore casuale verificabile che il proponente del blocco crea firmando il numero dell'epoca corrente. `eth1_data` è un voto per la vista del proponente del blocco del contratto di deposito, inclusa la radice del trie di Merkle dei depositi e il numero totale di depositi che consentono di verificare i nuovi depositi. `graffiti` è un campo opzionale che può essere utilizzato per aggiungere un messaggio al blocco. `proposer_slashings` e `attester_slashings` sono campi che contengono la prova che determinati validatori hanno commesso infrazioni punibili secondo la vista della catena del proponente. `deposits` è un elenco di nuovi depositi dei validatori di cui il proponente del blocco è a conoscenza, e `voluntary_exits` è un elenco di validatori che desiderano uscire di cui il proponente del blocco ha sentito parlare sulla rete gossip del livello di consenso. Il `sync_aggregate` è un vettore che mostra quali validatori erano stati precedentemente assegnati a un comitato di sincronizzazione (un sottoinsieme di validatori che servono dati per i client leggeri) e hanno partecipato alla firma dei dati.

L'`execution_payload` consente di passare informazioni sulle transazioni tra i client di esecuzione e i client di consenso. L'`execution_payload` è un blocco di dati di esecuzione che viene annidato all'interno di un blocco della beacon chain. I campi all'interno dell'`execution_payload` riflettono la struttura del blocco delineata nello yellow paper di Ethereum, tranne per il fatto che non ci sono ommer e `prev_randao` esiste al posto di `difficulty`. Il client di esecuzione ha accesso a un pool locale di transazioni di cui ha sentito parlare sulla propria rete gossip. Queste transazioni vengono eseguite localmente per generare un trie di stato aggiornato noto come post-stato. Le transazioni sono incluse nell'`execution_payload` come un elenco chiamato `transactions` e il post-stato è fornito nel campo `state-root`.

Tutti questi dati vengono raccolti in un blocco della beacon chain, firmati e trasmessi ai peer del proponente del blocco, che li propagano ai loro peer, ecc.

Leggi di più sull'[anatomia dei blocchi](/developers/docs/blocks).

## Cosa succede al blocco? {#what-happens-to-blocks}

Il blocco viene aggiunto al database locale del proponente del blocco e trasmesso ai peer sulla rete gossip del livello di consenso. Quando un validatore riceve il blocco, verifica i dati al suo interno, controllando anche che il blocco abbia il genitore corretto, corrisponda allo slot corretto, che l'indice del proponente sia quello previsto, che la rivelazione RANDAO sia valida e che il proponente non sia stato punito. L'`execution_payload` viene separato e il client di esecuzione del validatore riesegue le transazioni nell'elenco per verificare il cambiamento di stato proposto. Supponendo che il blocco superi tutti questi controlli, ogni validatore aggiunge il blocco alla propria catena canonica. Il processo ricomincia quindi nello slot successivo.

## Ricompense del blocco {#block-rewards}

Il proponente del blocco riceve un pagamento per il proprio lavoro. C'è una `base_reward` calcolata in funzione del numero di validatori attivi e dei loro saldi effettivi. Il proponente del blocco riceve quindi una frazione della `base_reward` per ogni attestazione valida inclusa nel blocco; più validatori attestano il blocco, maggiore è la ricompensa del proponente del blocco. C'è anche una ricompensa per la segnalazione di validatori che dovrebbero essere puniti, pari a `1/512 * effective balance` per ogni validatore punito.

[Maggiori informazioni su ricompense e penalità](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Letture consigliate {#further-reading}

- [Introduzione ai blocchi](/developers/docs/blocks/)
- [Introduzione alla prova di stake](/developers/docs/consensus-mechanisms/pos/)
- [Specifiche del consenso di Ethereum](https://github.com/ethereum/consensus-specs)
- [Introduzione a Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Aggiornare Ethereum](https://eth2book.info/)