---
title: Proposta di blocco
description: Spiegazione di come vengono proposti i blocchi nel proof-of-stake di Ethereum.
lang: it
---

I blocchi costituiscono le unità fondamentali della blockchain. I blocchi sono unità discrete di informazioni che vengono passate tra i nodi, concordate e aggiunte al database di ciascun nodo. Questa pagina spiega come sono prodotti.

## Prerequisiti {#prerequisites}

L'azione di proporre un blocco fa parte del protocollo di proof-of-stake. Per aiutarti a comprendere questa pagina, ti consigliamo di leggere [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) e [architettura dei blocchi](/developers/docs/blocks/).

## Chi produce i blocchi? Chi produce i blocchi? {#who-produces-blocks}

I conti del validatore propongono i blocchi. I conti del validatore sono gestiti dagli operatori dei nodi che eseguono il software del validatore come parte dei propri client di esecuzione e di consenso e hanno depositato almeno 32 ETH nel contratto di deposito. Tuttavia, ogni validatore è responsabile solo occasionalmente della proposta di un blocco. Ethereum misura il tempo in slot ed epoche. Ogni slot è di dodici secondi, e 32 slot (6,4 minuti) compongono un'epoca. Ogni slot è un'opportunità per aggiungere un nuovo blocco a Ethereum.

### Selezione casuale {#random-selection}

Un unico validatore è pseudo-casualmente scelto per proporre un blocco per ogni slot. Non esiste una vera casualità in una blockchain, poiché se ogni nodo generasse genuinamente dei numeri casuali non si arriverebbe mai al consenso. Invece, l'obiettivo è di rendere imprevedibile il processo di selezione del validatore. La casualità su Ethereum è ottenuta utilizzando un algoritmo chiamato RANDAO, che combina un hash dal propositore di blocchi con un seed aggiornato a ogni blocco. Questo valore è utilizzato per selezionare un validatore specifico dall'insieme totale di validatori. La selezione del validatore è fissata con due epoche in anticipo come forma di protezione da certi tipi di manipolazione del seed.

Sebbene i validatori si aggiungano al RANDAO in ogni slot, il valore globale del RANDAO è aggiornato solo una volta per epoca. Per calcolare l'indice del propositore di blocchi successivo, il valore del RANDAO è combinato con il numero di slot per dare un valore univoco a ogni slot. La probabilità che un singolo validatore sia selezionato non è semplicemente `1/N` (dove `N` = validatori attivi totali). Invece, è ponderata per il saldo di ETH effettivo di ogni validatore. Il saldo effettivo massimo è 32 ETH (ciò significa che `balance < 32 ETH` porta a una ponderazione inferiore rispetto a `balance == 32 ETH`, ma `balance > 32 ETH` non porta a una ponderazione superiore rispetto a `balance == 32 ETH`).

Solo un propositore di blocchi è selezionato per ogni slot. In condizioni normali, un singolo produttore di blocchi crea e rilascia un unico blocco nello slot dedicato. Creare due blocchi per lo stesso slot è un’infrazione tagliabile, spesso nota come "equivoco".

## Come è creato il blocco? {#how-is-a-block-created}

Il propositore di blocchi dovrebbe trasmettere un blocco beacon firmato che si basa sulla testa della catena più recente secondo la vista del proprio algoritmo di scelta della diramazione eseguito localmente. L'algoritmo di scelta della diramazione si applica a qualsiasi attestazione accodata rimanente dallo slot precedente, quindi trova il blocco con il peso accumulato maggiore delle attestazioni nel suo storico. Quel blocco è genitore del nuovo blocco creato dal propositore.

Il propositore di blocchi crea un blocco raccogliendo i dati dal suo database locale e dalla sua vista della catena. I contenuti del blocco sono mostrati nel frammento seguente:

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

Il campo `randao_reveal` assume un valore casuale verificabile che il propositore del blocco crea firmando il numero dell'epoca corrente. `eth1_data` è un voto per la visione del contratto di deposito del propositore del blocco, che include la radice dell'albero di Merkle dei depositi e il numero totale di depositi che consentono la verifica di nuovi depositi. `graffiti` è un campo facoltativo che può essere usato per aggiungere un messaggio al blocco. `proposer_slashings` e `attester_slashings` sono campi che contengono la prova che alcuni validatori hanno commesso violazioni soggette a slashing secondo la visione della catena da parte del propositore. `deposits` è un elenco di nuovi depositi di validatori di cui il propositore del blocco è a conoscenza, e `voluntary_exits` è un elenco di validatori che desiderano uscire, di cui il propositore del blocco è venuto a conoscenza sulla rete gossip del livello di consenso. `sync_aggregate` è un vettore che mostra quali validatori sono stati precedentemente assegnati a un comitato di sincronizzazione (un sottoinsieme di validatori che forniscono dati ai client leggeri) e hanno partecipato alla firma dei dati.

`execution_payload` abilita il passaggio di informazioni sulle transazioni tra i client di esecuzione e di consenso. `execution_payload` è un blocco di dati di esecuzione che viene annidato all'interno di un blocco beacon. I campi all'interno di `execution_payload` riflettono la struttura del blocco descritta nello Yellow Paper di Ethereum, con l'eccezione che non ci sono ommer e che `prev_randao` esiste al posto di `difficulty`. Il client di esecuzione ha accesso a un pool locale di transazioni di cui è venuto a conoscenza sulla propria rete di gossip. Queste transazioni sono eseguite localmente per generare un albero di stato aggiornato, noto come post-stato. Le transazioni sono incluse in `execution_payload` come elenco chiamato `transactions` e il post-stato è fornito nel campo `state-root`.

Tutti questi dati sono raccolti in un blocco beacon, firmati e trasmessi ai pari del propositore di blocchi, che li distribuiscono ai loro pari, ecc.

Leggi di più sull'[anatomia dei blocchi](/developers/docs/blocks/).

## Cosa succede al blocco? {#what-happens-to-blocks}

Il blocco è aggiunto al database locale del propositore di blocchi e trasmesso ai pari tramite la rete di gossip del livello di consenso. Quando un validatore riceve il blocco, verifica i dati al suo interno, anche controllando che il blocco abbia il genitore corretto, corrisponda allo slot corretto, che l'indice del propositore sia quello previsto, che l'indicazione del RANDAO sia valida e che il propositore non sia tagliato. `execution_payload` viene scompattato e il client di esecuzione del validatore riesegue le transazioni nell'elenco per verificare la modifica di stato proposta. Supponendo che il blocco superi tutti questi controlli, ogni validatore aggiunge il blocco alla propria catena canonica. Il processo quindi ricomincia nello slot successivo.

## Ricompensa del blocco {#block-rewards}

Il propositore del blocco riceve il pagamento per il proprio lavoro. Esiste una `base_reward` calcolata in funzione del numero di validatori attivi e dei loro saldi effettivi. Il propositore del blocco riceve quindi una frazione della `base_reward` per ogni attestazione valida inclusa nel blocco; più validatori attestano il blocco, maggiore è la ricompensa del propositore del blocco. C'è anche una ricompensa per la segnalazione di validatori che dovrebbero essere sottoposti a slashing, pari a `1/512 * saldo effettivo` per ogni validatore sottoposto a slashing.

[Maggiori informazioni su ricompense e penalità](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Letture consigliate {#further-reading}

- [Introduzione ai blocchi](/developers/docs/blocks/)
- [Introduzione al proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Specifiche del consenso di Ethereum](https://github.com/ethereum/consensus-specs)
- [Introduzione a Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Aggiornare Ethereum](https://eth2book.info/)
