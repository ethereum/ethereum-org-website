---
title: In che modo La Fusione ha influenzato l'offerta di ETH
description: Analisi dell'impatto de La Fusione sull'offerta di ETH
lang: it
---

# In che modo La Fusione ha influenzato l'offerta di ETH {#how-the-merge-impacts-ETH-supply}

La Fusione ha rappresentato la transizione delle reti di Ethereum dal proof-of-work al proof-of-stake, verificatasi a settembre 2022. Il metodo di emissione degli ETH ha subito delle modifiche al momento di tale transizione. Precedentemente, i nuovi ETH erano emessi da due fonti: il livello d'esecuzione (cioè la Rete Principale) e il livello di consenso (cioè La Beacon Chain). Da La Fusione, l'emissione sul livello d'esecuzione è ora pari a zero. Analizziamolo.

## Componenti dell'emissione di ETH {#components-of-eth-issuance}

Possiamo spezzare la fornitura di ETH in due forze principali: emissione e bruciatura.

L'**emissione** di ETH è il procedimento di creazione di ETH, che precedentemente non esisteva. La **bruciatura** di ETH è quando gli ETH esistenti vengono distrutti, rimuovendoli dalla circolazione. Il tasso di emissione e bruciatura viene calcolato su diversi parametri e, il saldo tra di essi, determina il tasso di inflazione/deflazione di ether risultante.

<Card
emoji=":chart_decreasing:"
title="Tldr sull'emissione di ETH">

- Prima di passare al proof of stake, i miner emettevano approssimativamente 13.000ETH/giorno
- Gli staker emettono approssimativamente 1.700 ETH/giorno, sulla base di un totale di circa 14 milioni di ETH in staking
- L'emissione di staking esatta fluttua a seconda dell'importo totale di ETH in staking
- **Da La Fusione, restano approssimativamnte soltanto 1.700 ETH/giorno, riducendo la nuova emissione totale di ETH di circa l'88%**
- La bruciatura: questa, fluttua secondo la domanda di rete. _Se_ per un dato giorno si osserva un prezzo di gas medio di almeno 16 gwei, questo compensa effettivamente i circa 1.700 ETH emessi ai validatori e porta l'inflazione netta di ETH a zero, o meno, per quel giorno.

</Card>

## Pre-Fusione (storico) {#pre-merge}

### Emissione del livello d'esecuzione {#el-issuance-pre-merge}

Sotto il proof of work, i miner interagivano soltanto con il livello d'esecuzione, venendo ricompensati con ricompense dei blocchi, se erano i primi a risolvere il blocco successivo. Dall'[aggiornamento di Costantinopoli](/history/#constantinople) nel 2019, questa ricompensa era di 2 ETH per blocco. I miner, inoltre, erano ricompensati per la pubblicazione di blocchi [ommer](/glossary/#ommer), blocchi validi che non finivano nella catena più lunga/canonica. Queste ricompense erano massimizzate a 1,75 ETH per ommer ed erano _da sommarsi_ alla ricompensa emessa dal blocco canonico. Il processo di mining era un'attività economicamente intensiva che, storicamente, richiedeva elevati livelli di emissione di ETH per essere sostenuta.

### Emissione del livello del consenso {#cl-issuance-pre-merge}

La [Beacon Chain](/history/#beacon-chain-genesis) è stata attivata nel 2020. Invece dei miner, è protetta dai validatori, che utilizzano il proof of stake. Questa catena è stata avviata dagli utenti di Ethereum, che depositavano ETH a senso unico in uno smart contract sulla Rete Principale (il livello d'esecuzione), ascoltato dalla Beacon Chain, accreditando l'utente con un importo equivalente di ETH, sulla nuova catena. Fino alla Fusione, i validatori della Beacon Chain non stavano elaborando le transazioni e, fondamentalmente, arrivavano al consenso sullo stato dello stesso gruppo di validatori.

I validatori sulla Beacon Chain sono ricompensati con ETH per l'attestazione allo stato della catena e la proposta di blocchi. Le ricompense (o penalità) sono calcolate e distribuite a ogni epoca (ogni 6,4 minuti) a seconda delle prestazioni del validatore. Le ricompense del validatore sono **significativamente** inferiori a quelle di mining, emesse precedentemente sotto il proof-of-work (pari a 2 ETH circa ogni 13,5 secondi), poiché l'operazione di un nodo di convalida non è altrettanto intenso dal punto di vista economico e quindi non richiede né garantisce una ricompensa altrettanto elevata.

### Analisi sulle emissioni pre-Fusione {#pre-merge-issuance-breakdown}

Offerta totale di ETH: **circa 120.520.000 ETH** (al momento della Fusione a settembre 2022)

**Emissione del livello d'esecuzione:**

- Era stimata a 2,08 ETH ogni 13,3 secondi\*: **circa 4.930.000** ETH emessi in un anno
- Il risultato è un tasso d'inflazione **di circa il 4,09%** (4,93M l'anno / 120,5M totali)
- \*Ciò include i 2 ETH per blocco canonico, più una media di 0,08 ETH nel tempo dai blocchi ommer. Inoltre, utilizza 13,3 secondi, l'obiettivo temporale di base del blocco senza alcuna influenza da una [bomba di difficoltà](/glossary/#difficulty-bomb). ([Vedi fonte](https://bitinfocharts.com/ethereum/))

**Emissione del livello d'esecuzione:**

- Utilizzando i 14.000.000 di ETH totali in staking, il tasso di emissione di ETH è approssimativamente di 1700 ETH/giorno ([Vedi fonte](https://ultrasound.money/))
- Il risultato è **circa 620.500** ETH emessi in un anno
- Il risultato è un tasso d'inflazione **approssimativamente dello 0,52%** (620.5K l'anno / 119.3M totali)

<InfoBanner>
<strong>Tasso di emissione annualizzato totale (pre-Fusione): circa 4,61%</strong> (4,09% + 0,52%)<br/><br/>
<strong>Circa l'88,7%</strong> dell'emissione andava ai miner sul livello d'esecuzione (4,09 / 4,61 * 100)<br/><br/>
<strong>Circa l'11,3%</strong> era emesso agli staker sul livello del consenso (0,52 / 4,61 * 100)
</InfoBanner>

## Post-Fusione (oggi) {#post-merge}

### Emissione del livello d'esecuzione {#el-issuance-post-merge}

L'emissione del livello d'esecuzione dalla Fusione è pari a zero. Il proof-of-work non è più un mezzo valido per la produzione di blocchi, secondo le regole aggiornate del consenso. Tutta l'attività del livello d'esecuzione è impacchettata nei "blocchi della Beacon", pubblicati e attestati dai validatori del proof-of-stake. Le ricompense per l'attestazione e pubblicazione dei blocchi della Beacon sono considerate separatamente sul livello del consenso.

### Emissione del livello del consenso {#cl-issuance-post-merge}

L'emissione del livello di consenso continua ad oggi, così come prima della Fusione, con piccole ricompense per i validtori che attestano a e propongono i blocchi. Le ricompense dei validatori continuano a maturare ai _saldi dei validatori_, gestiti nel livello del consenso. A differenza dei conti correnti (conti di "esecuzione"), che possono effettuare transazioni sulla Rete Principale, questi conti separati di Ethereum non possono operare liberamente con altri conti di Ethereum. I fondi in questi conti sono prelevabili esclusivamente a un singolo indirizzo d'esecuzione specificato.

Dall'aggiornamento di Shanghai/Capella, avvenuto ad aprile 2023, questi prelievi sono stati consentiti per gli staker. Gli staker sono incentivati a rimuovere i propri _guadagni/ricompense (per saldi superiori a 32 ETH)_, poiché, tali fondi non contribuirebbero altrimenti al loro peso di staking (che si massimizza a 32 ETH).

Gli staker, inoltre, potrebbero scegliere di uscire e prelevare l'intero saldo del loro validatore. Per assicurare la stabilità di Ethereum, il numero di validatori in uscita simultanea è limitato.

Approssimativamente lo 0,33% del conteggio totale dei validatori può uscire in un dato giorno. Di default, possono uscire quattro (4) validatori per epoca (ogni 6,4 minuti, o 900 al giorno). Un (1) validatore aggiuntivo può uscire per ogni 65.536 (2<sup>16</sup>) validatori aggiuntivi su 262.144 (2<sup>18</sup>). Ad esempio, con oltre 327.680 validatori, potrebbero uscirne cinque (5) per epoca (1.125 al giorno). Sei (6) sarebbero autorizzati con un conteggio di validatori attivi totali superiore a 393.216 e così via.

All'aumentare del numero di validatori che prelevano, il numero massimo di validatori in uscita sarà ridotto gradualmente a un minimo di quattro, per evitare intenzionalmente che vengano prelevati contemporaneament egrandi quantitativi destabilizzanti di ETH in staking.

### Analisi dell'inflazione post-Fusione {#post-merge-inflation-breakdown}

- Offerta totale di ETH: **circa 120.520.000 ETH** (al momento della Fusione a settembre 2022)
- Emissione del livello d'esecuzione: **0**
- Emissione del livello di consenso: come sopra, tasso di emissione annualizzato **approssimativo dello 0,52%** (con 14 milioni di ETH in staking totali)

<InfoBanner>
Tasso di emissione annualizzato totale: <strong>circa 0,52%</strong><br/><br/>
Riduzione netta nell'emissione annuale di ETH: <strong>circa 88,7%</strong> ((4,61%-0,52%) / 4,61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" />La bruciatura {#the-burn}

La forza opposta all'emissione di ETH è il tasso a cui gli ETH sono bruciati. Per l'esecuzione di una transazione su Ethereum, dev'essere pagata una commissione minima (nota come "commissione di base"), che fluttua continuamente (da blocco a blocco), a seconda dell'attività di rete. La commissione è pagata in ETH ed è _necessaria_ affinché la transazione sia considerata valida. Questa commissione viene _bruciata_ durante il procedimento della transazione, rimuovendola dalla circolazione.

<InfoBanner>
La bruciatura delle commissioni è divenuta attiva con l'<a href="/history/#london">aggiornamento di Londra</a> ad agosto 2021 e resta immutata da La Fusione.
</InfoBanner>

Oltre alla bruciatura della commissione, implementata dall'aggiornamento di Londra, i validatori, inoltre, possono incorrere in sanzioni per essere online o, peggio, possono ricevere tagli per l'infrazione di regole specifiche che minacciano la sicurezza della rete. Queste, risultano in una riduzione degli ETH dal saldo di quel validatore, che non è ricompensato direttamente a nessun altro conto, bruciandoli/rimuovendoli effettivamente dalla circolazione.

### Calcolare il prezzo medio del gas per la deflazione {#calculating-average-gas-price-for-deflation}

Come discusso sopra, l'importo di ETH emessi in un dato giorno dipende dagli ETH in staking totali. Al momento della scrittura, questo equivale a circa 1700 ETH/giorno.

Per determinare il prezzo medio del gas necessario a compensare completamente tale emissione in un dato periodo di 24 ore, inizieremo calcolando il numero totale di blocchi in un giorno, dato il tempo di un blocco di 12 secondi:

- `(1 blocco / 12 secondi) * (60 secondi/minuto) = 5 blocchi/minuto`
- `(5 blocchi/minuto) * (60 minuti/ora) = 300 blocchi/ora`
- `(300 blocchi/ora) * (24 ore/giorno) = 7200 blocchi/giorno`

Ogni blocco indirizza `15x10^6 gas/blocco` ([di più sul gas](/developers/docs/gas/)). Utilizzandolo, possiamo risolvere per il prezzo medio del gas (in unità di gwei/gas), necessario per compensare l'emissione, data un'emissione totale giornaliera di 1700 ETH:

- `7200 blocchi/giorno * 15x10^6 gas/blocco *`**`Y gwei/gas`**`* 1 ETH/ 10^9 gwei = 1700 ETH/giorno`

Risolvendo per `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arrotondando soltanto alle due cifre significative)

Un altro metodo per riorganizzare questo ultimo passaggio sarebbe sostituire `1700` con una variabile `X` che rappresenti l'emissione giornaliera di ETH e semplificare il resto a:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Possiamo semplificarlo e scriverlo come una funzione di `X`:

- `f(X) = X/108` dove `X` è l'emissione giornaliera di ETH, e `f(X)` rappresenta il prezzo di gwei/gas necessario per compensare tutti i nuovi ETH emessi.

Quindi, ad esempio, se `X` (emissione giornaliera di ETH) sale a 1800 secondo gli ETH totali in staking, `f(X)` (gwei necessari per compensare tutta l'emissione) sarebbe `17 gwei` (utilizzando le 2 cifre significative)

## Ulteriori letture {#further-reading}

- [La fusione](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Pannelli di controllo disponibili per visualizzare l'emissione e la bruciatura di ETH in tempo reale_
- [Rilevare l'Emissione di Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
