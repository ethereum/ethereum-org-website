---
title: In che modo La Fusione ha influenzato l'offerta di ETH
description: Analisi dell'impatto de La Fusione sull'offerta di ETH
lang: it
---

# In che modo La Fusione ha influito sull'offerta di ETH {#how-the-merge-impacts-ETH-supply}

La Fusione ha rappresentato la transizione della rete Ethereum da proof-of-work a proof-of-stake, avvenuta nel settembre 2022. Il metodo di emissione degli ETH ha subito delle modifiche al momento di tale transizione. In precedenza, i nuovi ETH venivano emessi da due fonti: il livello di esecuzione (ossia, la Rete Principale) e il livello di consenso (ossia, la Beacon Chain). Da La Fusione, l'emissione sul livello d'esecuzione è ora pari a zero. Analizziamolo.

## Componenti dell'emissione di ETH {#components-of-eth-issuance}

Possiamo spezzare la fornitura di ETH in due forze principali: emissione e bruciatura.

L'**emissione** di ETH è il processo di creazione di ETH che in precedenza non esisteva. La **bruciatura** di ETH si verifica quando degli ETH esistenti vengono distrutti, rimuovendoli dalla circolazione. Il tasso di emissione e bruciatura viene calcolato su diversi parametri e, il saldo tra di essi, determina il tasso di inflazione/deflazione di ether risultante.

<Card
emoji=":chart_decreasing:"
title="ETH issuance tldr">

- Prima della transizione al proof-of-stake, ai miner venivano emessi circa 13.000 ETH/giorno
- Agli staker vengono emessi circa 1.700 ETH/giorno, sulla base di circa 14 milioni di ETH totali messi in staking
- L'emissione esatta da staking fluttua in base all'importo totale di ETH messi in staking
- **Da La Fusione, rimangono solo i ~1.700 ETH/giorno, riducendo l'emissione totale di nuovi ETH di circa l'88%**
- La bruciatura: fluttua in base alla domanda della rete. _Se_ per un dato giorno si osserva un prezzo di gas medio di almeno 16 gwei, questo compensa effettivamente i circa 1.700 ETH emessi ai validatori e porta l'inflazione netta di ETH a zero, o meno, per quel giorno.

</Card>

## Pre-Fusione (storico) {#pre-merge}

### Emissione del livello di esecuzione {#el-issuance-pre-merge}

Sotto il proof of work, i miner interagivano soltanto con il livello d'esecuzione, venendo ricompensati con ricompense dei blocchi, se erano i primi a risolvere il blocco successivo. Dall'[aggiornamento Constantinople](/ethereum-forks/#constantinople) del 2019 questa ricompensa era di 2 ETH per blocco. I miner erano anche ricompensati per la pubblicazione di blocchi [ommer](/glossary/#ommer), che erano blocchi validi che non finivano nella catena più lunga/canonica. Queste ricompense avevano un massimo di 1,75 ETH per ommer ed erano _in aggiunta_ alla ricompensa emessa dal blocco canonico. Il processo di mining era un'attività economicamente intensiva che, storicamente, richiedeva elevati livelli di emissione di ETH per essere sostenuta.

### Emissione del livello di consenso {#cl-issuance-pre-merge}

La [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) è diventata operativa nel 2020. Invece dei miner, è protetta dai validatori, che utilizzano il proof of stake. Questa catena è stata avviata dagli utenti di Ethereum, che depositavano ETH a senso unico in uno smart contract sulla Rete Principale (il livello d'esecuzione), ascoltato dalla Beacon Chain, accreditando l'utente con un importo equivalente di ETH, sulla nuova catena. Fino alla Fusione, i validatori della Beacon Chain non stavano elaborando le transazioni e, fondamentalmente, arrivavano al consenso sullo stato dello stesso gruppo di validatori.

I validatori sulla Beacon Chain sono ricompensati con ETH per l'attestazione allo stato della catena e la proposta di blocchi. Le ricompense (o penalità) sono calcolate e distribuite a ogni epoca (ogni 6,4 minuti) a seconda delle prestazioni del validatore. Le ricompense dei validatori sono **significativamente** inferiori a quelle del mining emesse in precedenza con il proof-of-work (2 ETH ogni ~13,5 secondi), poiché la gestione di un nodo di convalida non è così intensa dal punto di vista economico e quindi non richiede né garantisce una ricompensa così alta.

### Suddivisione dell'emissione pre-Fusione {#pre-merge-issuance-breakdown}

Offerta totale di ETH: **~120.520.000 ETH** (al momento de La Fusione, a settembre 2022)

**Emissione del livello d'esecuzione:**

- Era stimata a 2,08 ETH ogni 13,3 secondi\*: **~4.930.000** ETH emessi in un anno
- Ha comportato un tasso di inflazione di **circa il 4,09%** (4,93 mln all'anno / 120,5 mln totali)
- \*Ciò include i 2 ETH per blocco canonico, più una media di 0,08 ETH nel tempo dai blocchi ommer. Usa anche 13,3 secondi, l'obiettivo di tempo del blocco di base senza alcuna influenza da parte di una [bomba di difficoltà](/glossary/#difficulty-bomb). ([Vedi la fonte](https://bitinfocharts.com/ethereum/))

**Emissione del livello d'esecuzione:**

- Utilizzando un totale di 14.000.000 di ETH in staking, il tasso di emissione di ETH è di circa 1700 ETH/giorno ([Vedi la fonte](https://ultrasound.money/))
- Risulta in **~620.500** ETH emessi in un anno
- Ha comportato un tasso di inflazione di **circa lo 0,52%** (620,5K all'anno / 119,3 mln totali)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tasso di emissione annualizzato totale (pre-Fusione): ~4,61%** (4,09% + 0,52%)

**~88,7%** dell'emissione era destinata ai miner sul livello di esecuzione (4,09 / 4,61 \* 100)

**~11,3%** veniva emesso agli staker sul livello di consenso (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Post-Fusione (oggi) {#post-merge}

### Emissione del livello di esecuzione {#el-issuance-post-merge}

L'emissione del livello di esecuzione da La Fusione è pari a zero. Il proof-of-work non è più un mezzo valido per la produzione di blocchi secondo le regole aggiornate del consenso. Tutte le attività del livello di esecuzione sono impacchettate in "blocchi beacon", pubblicati e attestati dai validatori proof-of-stake. Le ricompense per l'attestazione e la pubblicazione dei blocchi beacon sono contabilizzate separatamente sul livello di consenso.

### Emissione del livello di consenso {#cl-issuance-post-merge}

L'emissione del livello di consenso continua oggi come prima de La Fusione, con piccole ricompense per i validatori che attestano e propongono i blocchi. Le ricompense dei validatori continuano ad accumularsi nei _saldi dei validatori_ gestiti all'interno del livello di consenso. A differenza dei conti correnti (conti di "esecuzione"), che possono effettuare transazioni sulla Rete Principale, questi conti Ethereum separati non possono effettuare liberamente transazioni con altri conti Ethereum. I fondi presenti in questi conti possono essere prelevati solo a un singolo indirizzo di esecuzione specificato.

Dall'aggiornamento Shanghai/Capella, avvenuto nell'aprile 2023, questi prelievi sono stati abilitati per gli staker. Gli staker sono incentivati a rimuovere i loro _guadagni/ricompense (saldo superiore a 32 ETH)_ poiché questi fondi altrimenti non contribuiscono al loro peso di stake (che ha un massimo di 32).

Gli staker possono anche scegliere di uscire e prelevare l'intero saldo del loro validatore. Per garantire la stabilità di Ethereum, il numero di validatori che escono simultaneamente è limitato.

Circa lo 0,33% del numero totale di validatori può uscire in un dato giorno. Per impostazione predefinita, quattro (4) validatori possono uscire per epoca (ogni 6,4 minuti, o 900 al giorno). Un (1) validatore aggiuntivo può uscire per ogni 65.536 (2<sup>16</sup>) validatori aggiuntivi oltre i 262.144 (2<sup>18</sup>). Ad esempio, con oltre 327.680 validatori, cinque (5) possono uscire per epoca (1.125 al giorno). Sei (6) saranno ammessi con un conteggio totale di validatori attivi superiore a 393.216, e così via.

Man mano che più validatori prelevano, il numero massimo di validatori in uscita sarà gradualmente ridotto a un minimo di quattro per impedire intenzionalmente che grandi quantità destabilizzanti di ETH in staking vengano prelevate contemporaneamente.

### Suddivisione dell'inflazione post-Fusione {#post-merge-inflation-breakdown}

- Offerta totale di ETH: **~120.520.000 ETH** (al momento de La Fusione, a settembre 2022)
- Emissione del livello di esecuzione: **0**
- Emissione del livello di consenso: come sopra, tasso di emissione annualizzato di **~0,52%** (con 14 milioni di ETH totali in staking)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tasso di emissione annualizzato totale: **~0,52%**

Riduzione netta dell'emissione annuale di ETH: **~88,7%** ((4,61% - 0,52%) / 4,61% \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> La bruciatura {#the-burn}

La forza opposta all'emissione di ETH è il tasso a cui gli ETH sono bruciati. Per l'esecuzione di una transazione su Ethereum, dev'essere pagata una commissione minima (nota come "commissione di base"), che fluttua continuamente (da blocco a blocco), a seconda dell'attività di rete. La commissione è pagata in ETH ed è _necessaria_ perché la transazione sia considerata valida. Questa commissione viene _bruciata_ durante il processo di transazione, rimuovendola dalla circolazione.

<Alert variant="update">
<AlertContent>
<AlertDescription>

La bruciatura delle commissioni è stata introdotta con l'[aggiornamento London](/ethereum-forks/#london) nell'agosto del 2021 e da La Fusione è rimasta invariata. </AlertDescription> </AlertContent> </Alert>

Oltre alla bruciatura della commissione, implementata dall'aggiornamento di Londra, i validatori, inoltre, possono incorrere in sanzioni per essere online o, peggio, possono ricevere tagli per l'infrazione di regole specifiche che minacciano la sicurezza della rete. Queste, risultano in una riduzione degli ETH dal saldo di quel validatore, che non è ricompensato direttamente a nessun altro conto, bruciandoli/rimuovendoli effettivamente dalla circolazione.

### Calcolo del prezzo medio del gas per la deflazione {#calculating-average-gas-price-for-deflation}

Come discusso sopra, l'importo di ETH emessi in un dato giorno dipende dagli ETH in staking totali. Al momento della scrittura, questo equivale a circa 1700 ETH/giorno.

Per determinare il prezzo medio del gas necessario a compensare completamente tale emissione in un dato periodo di 24 ore, inizieremo calcolando il numero totale di blocchi in un giorno, dato il tempo di un blocco di 12 secondi:

- `(1 blocco / 12 secondi) * (60 secondi/minuto) = 5 blocchi/minuto`
- `(5 blocchi/minuto) * (60 minuti/ora) = 300 blocchi/ora`
- `(300 blocchi/ora) * (24 ore/giorno) = 7200 blocchi/giorno`

Ogni blocco ha come obiettivo `15x10^6 gas/blocco` ([maggiori informazioni sul gas](/developers/docs/gas/)). Utilizzandolo, possiamo risolvere per il prezzo medio del gas (in unità di gwei/gas), necessario per compensare l'emissione, data un'emissione totale giornaliera di 1700 ETH:

- `7200 blocchi/giorno * 15x10^6 gas/blocco * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/giorno`

Risolvendo per `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arrotondando a due sole cifre significative)

Un altro modo per riorganizzare questo ultimo passaggio sarebbe sostituire `1700` con una variabile `X` che rappresenta l'emissione giornaliera di ETH e semplificare il resto in:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Possiamo semplificare e scrivere questo come una funzione di `X`:

- `f(X) = X/108` dove `X` è l'emissione giornaliera di ETH e `f(X)` rappresenta il prezzo in gwei/gas richiesto per compensare tutti gli ETH di nuova emissione.

Quindi, per esempio, se `X` (emissione giornaliera di ETH) sale a 1800 in base al totale di ETH in staking, `f(X)` (i gwei richiesti per compensare tutta l'emissione) sarebbe allora di `17 gwei` (usando 2 cifre significative)

## Letture consigliate {#further-reading}

- [La Fusione](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Pannelli di controllo disponibili per visualizzare l'emissione e la bruciatura di ETH in tempo reale_
- [Grafici sull'emissione di Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
