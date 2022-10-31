---
title: Blocchi
description: "Panoramica dei blocchi nella blockchain Ethereum: struttura dati, a cosa servono e come sono fatti."
lang: it
---

I blocchi sono un insieme di transazioni che contengono un hash del blocco precedente nella catena. Per questo motivo, sono collegati l'uno all'altro nella catena, perché gli hash vengono calcolati crittograficamente dai dati del blocco. Questi impedisce anche le frodi, perché un cambiamento in qualsiasi blocco nella cronologia invaliderebbe tutti i blocchi successivi, dato che gli hash successivi cambierebbero e tutti coloro che eseguono la blockchain se ne accorgerebbero.

## Prerequisiti {#prerequisites}

Quello dei blocchi è un argomento piuttosto basico. Ad ogni modo, per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere [Account](/developers/docs/accounts/), [Transazioni](/developers/docs/transactions/) e la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Perché i blocchi? {#why-blocks}

Per far sì che tutti i partecipanti della rete Ethereum siano sincronizzati e concordino sulla cronologia esatta delle transazioni, le transazioni vengono raggruppate in blocchi. Significa che decine (o centinaia) di transazioni vengono inviate, approvate e sincronizzate in una volta sola.

![Diagramma che mostra una transazione in un blocco che provoca cambiamenti di stato](./tx-block.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Scaglionando gli invii, diamo a tutti i partecipanti della rete abbastanza tempo per giungere al consenso: anche se arrivano decine di richieste di transazione al secondo, i blocchi su Ethereum vengono creati e inviati a Ethereum solo più o meno ogni quindici secondi.

## Come funzionano i blocchi {#how-blocks-work}

Per preservare la cronologia delle transazioni, i blocchi sono ordinati in modo rigoroso (ogni nuovo blocco che viene creato contiene un riferimento al blocco padre) e anche le transazioni all'interno del blocco sono ordinate altrettanto rigorosamente. A parte in rari casi, in ogni momento, tutti i partecipanti della rete concordano sul numero e sulla cronologia esatta dei blocchi e lavorano per raggruppare le richieste di transazione live nel blocco successivo.

Dopo essere stato realizzato da alcuni validatori della rete, un blocco viene propagato al resto della rete; tutti i nodi vengono aggiunti al blocco alla fine della relativa blockchain e un nuovo validatore viene selezionato per creare il successivo. Il processo esatto di costruzione dei blocchi e il processo di invio/consenso è attualmente specificato nel protocollo "Proof of Stake" di Ethereum.

## Protocollo Proof of Stake {#proof-of-work-protocol}

Proof of Stake significa quanto segue:

- I nodi di convalida devono mettere in staking 32 ETH in un contratto di deposito come garanzia contro i comportamenti malevoli. Questo aiuta a proteggere la rete, poiché le attività palesemente disoneste portano alla distruzione di parte o dell'intero stake.
- In ogni slot (a distanza di dodici secondi), un validatore è selezionato casualmente per essere il propositore del blocco. Questo raggruppa le transazioni, le esegue e determina un nuovo 'stato'. Avvolge queste informazioni in un blocco e lo passa agli altri validatori.
- Gli altri validatori che vengono a conoscenza di un nuovo blocco ri-eseguono le transazioni per assicurare di acconsentire alla modifica proposta allo stato globale. Supponendo che il blocco sia valido, lo aggiungono al proprio database.
- Se un validatore è a conoscenza di due blocchi in conflitto per lo stesso slot, usa il proprio algoritmo di scelta della diramazione per selezionare quello supportato da più ETH in staking.

[Maggiori informazioni sul Proof of Stake](/developers/docs/consensus-mechanisms/pos)

## Cosa c'è in un blocco? {#block-anatomy}

In un blocco sono contenute molte informazioni. Al livello più alto, un blocco contiene i seguenti campi:

```
slot: lo slot a cui appartiene il blocco
proposer_index: l'ID del validatore che ha proposto il blocco
parent_root: l'hash del blocco precedente
state_root: l'hash radice dell'oggetto di stato
body: un oggetto contenente diversi campi, come definito di seguito
```

Il blocco `body` contiene a sua volta diversi campi:

```
randao_reveal: un valore usato per selezionare il prossimo propositore del blocco
eth1_data: informazioni sul contratto di deposito
graffiti: dati arbitrari usati per etichettare i blocchi
proposer_slashings: elenco di validatori da sottoporre a slashing
attester_slashings: elenco di validatori da sottoporre a slashing
attestations: elenco di attestazioni in favore del blocco corrente
deposits: elenco di nuovi depositi al contratto di deposito
voluntary_exits: elenco di validatori in uscita dalla rete
sync_aggregate: sottoinsieme di validatori usati per servire i client leggeri
execution_payload: transazioni passate dal client di esecuzione
```

Il campo `attestations` contiene un elenco di tutte le attestazioni nel blocco. Le attestazioni hanno il proprio tipo di dati, contenente diversi pezzi di dati. Ogni attestazione contiene:

```
aggregation_bits: un elenco di quali validatori hanno partecipato all'attestazione
data: un contenitore con diversi campi secondari
signature: la firma aggregata di tutti i validatori attestanti
```

Il campo `data` nell'`attestation` contiene quanto segue:

```
slot: lo slot cui si correla l'attestazione
index: indici per i validatori attestanti
beacon_block_root: l'hash radice del blocco Beacon contenente questo oggetto
source: l'ultimo punto di controllo giustificato
target: il blocco di confine dell'ultima epoca
```

L'esecuzione delle transazioni nell'`execution_payload` aggiorna lo stato globale. Tutti i client ri-eseguono le transazioni nell'`execution_payload` per assicurare che il nuovo stato corrisponda a quello nel campo `state_root` del nuovo blocco. Così, i client, possono dire che un nuovo blocco è valido e sicuro da aggiungere alla loro blockchain. L'`execution payload` stesso è un oggetto composto da diversi campi. Inoltre, esiste un `execution_payload_header`, contenente importanti informazioni sommarie sui dati di esecuzione. Queste strutture di dati sono organizzate come segue:

L'`execution_payload_header` contiene i seguenti campi:

```
parent_hash: hash del blocco padre
fee_recipient: indirizzo dell'account a cui pagare le commissioni sulla transazione
state_root: hash radice per lo stato globale dopo l'applicazione delle modifiche in questo blocco
receipts_root: hash del trie delle ricevute delle transazioni
logs_bloom: struttura di dati contenente i registri dell'evento
prev_randao: valore usato nella selezione casuale del validatore
block_number: il numero del blocco corrente
gas_limit: il carburante massimo consentito in questo blocco
gas_used: la quantità effettiva di carburante usata in questo blocco
timestamp: il tempo di blocco
extra_data: dati aggiuntivi arbitrari come byte grezzi
base_fee_per_gas: il valore della commissione base
block_hash: hash del blocco di esecuzione
transactions_root: hash radice delle transazioni nel payload
```

Lo stesso `execution_payload` contiene quanto segue (si noti che è identico all'intestazione, tranne per il fatto che, invece dell'hash radice delle transazioni, include l'elenco effettivo delle transazioni):

```
parent_hash: hash del blocco padre
fee_recipient: indirizzo dell'account a cui pagare le commissioni sulla transazione
state_root: hash radice per lo stato globale dopo l'applicazione delle modifiche in questo blocco
receipts_root: hash del trie delle ricevute delle transazioni
logs_bloom: struttura di dati contenente i registri dell'evento
prev_randao: valore usato nella selezione casuale del validatore
block_number: il numero del blocco corrente
gas_limit: il carburante massimo consentito in questo blocco
gas_used: la quantità effettiva di carburante usata in questo blocco
timestamp: il tempo di blocco
extra_data: dati aggiuntivi arbitrari come byte grezzi
base_fee_per_gas: il valore della commissione base
block_hash: hash del blocco di esecuzione
transactions: elenco delle transazioni da eseguire
```

## Tempo di blocco {#block-time}

Il tempo di blocco si riferisce al tempo che separa i blocchi. In Ethereum, il tempo è diviso in unità da dodici secondi, dette 'slot'. In ogni slot viene selezionato un singolo validatore per proporre un blocco. Supponendo che tutti i validatori siano online e totalmente operativi, ci sarà un blocco in ogni slot, a significare che il tempo del blocco è 12 secondi. Tuttavia, occasionalmente, i validatori potrebbero essere offline quando chiamati a proporre un blocco, a significare che talvolta gli slot possono rimanere vuoti. Questo differisce dai sistemi basati sul Proof of Work, in cui i tempi di blocco sono probabilistici e regolati dalla difficoltà di mining.

## Dimensioni del blocco {#block-size}

Un'ultima nota importante: i blocchi stessi sono limitati in termini di dimensioni. Ogni blocco ha una dimensione prevista di 15 milioni di carburante, ma la dimensione dei blocchi aumenta o diminuisce in base alla domanda della rete, fino al limite massimo di 30 milioni di carburante del blocco (2 volte la dimensione previste del blocco). La quantità totale di carburante usato da tutte le transazioni nel blocco deve essere inferiore al limite di carburante del blocco. Ciò è importante perché evita che i blocchi siano arbitrariamente grandi. Se i blocchi potessero essere arbitrariamente grandi, i nodi completi meno performanti, gradualmente, non riuscirebbero più stare al passo con la rete per via dei requisiti di spazio e velocità. Più grande è il blocco, maggiore sarà la potenza di calcolo richiesta per elaborarlo in tempo per il prossimo slot. Questa è una forza centralizzante, a cui si resiste limitando le dimensioni dei blocchi.

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Transazioni](/developers/docs/transactions/)
- [Carburante](/developers/docs/gas/)
- [Proof of Stake](/developers/docs/consensus-mechanisms/pos)
