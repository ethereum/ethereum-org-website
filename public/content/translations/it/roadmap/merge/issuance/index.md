---
title: In che modo The Merge ha impattato l'offerta di ETH
description: Analisi di come The Merge ha impattato l'offerta di ETH
lang: it
---

# In che modo The Merge ha impattato l'offerta di ETH {#how-the-merge-impacts-ETH-supply}

The Merge ha rappresentato la transizione della rete [Ethereum](/) dalla prova di lavoro alla prova di stake, avvenuta a settembre 2022. Il modo in cui venivano emessi gli ETH ha subito dei cambiamenti al momento di tale transizione. In precedenza, i nuovi ETH venivano emessi da due fonti: il livello di esecuzione (ovvero, la rete principale) e il livello di consenso (ovvero, la Beacon Chain). Da The Merge, l'emissione sul livello di esecuzione è ora pari a zero. Analizziamo questo aspetto nel dettaglio.

## Componenti dell'emissione di ETH {#components-of-eth-issuance}

Possiamo suddividere l'offerta di ETH in due forze principali: l'emissione e la distruzione (burn).

L'**emissione** di ETH è il processo di creazione di ETH che prima non esistevano. La **distruzione** (burning) di ETH avviene quando gli ETH esistenti vengono distrutti, rimuovendoli dalla circolazione. Il tasso di emissione e di distruzione viene calcolato su diversi parametri e l'equilibrio tra di essi determina il tasso di inflazione/deflazione risultante dell'ether.

<Card
emoji=":chart_decreasing:"
title="In sintesi sull'emissione di ETH">

- Prima della transizione alla prova di stake, ai minatori venivano emessi circa 13.000 ETH/giorno
- Agli staker vengono emessi circa 1.700 ETH/giorno, in base a circa 14 milioni di ETH totali in staking
- L'esatta emissione dello staking fluttua in base alla quantità totale di ETH in staking
- **Da The Merge, rimangono solo i ~1.700 ETH/giorno, riducendo l'emissione totale di nuovi ETH di circa l'88%**
- La distruzione (burn): fluttua in base alla domanda della rete. _Se_ in un determinato giorno si osserva un prezzo del gas medio di almeno 16 gwei, questo compensa efficacemente i ~1.700 ETH emessi ai validatori e porta l'inflazione netta di ETH a zero o meno per quel giorno.
</Card>

## Pre-Merge (storico) {#pre-merge}

### Emissione del livello di esecuzione {#el-issuance-pre-merge}

Con la prova di lavoro, i minatori interagivano solo con il livello di esecuzione e venivano ricompensati con ricompense del blocco se erano i primi a risolvere il blocco successivo. Dall'[aggiornamento Constantinople](/ethereum-forks/#constantinople) nel 2019, questa ricompensa era di 2 ETH per blocco. I minatori venivano anche ricompensati per la pubblicazione di blocchi [ommer](/glossary/#ommer), che erano blocchi validi che non finivano nella catena più lunga/canonica. Queste ricompense raggiungevano un massimo di 1,75 ETH per ommer ed erano _in aggiunta_ alla ricompensa emessa dal blocco canonico. Il processo di mining era un'attività economicamente intensiva, che storicamente richiedeva alti livelli di emissione di ETH per essere sostenuta.

### Emissione del livello di consenso {#cl-issuance-pre-merge}

La [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) è diventata operativa nel 2020. Invece dei minatori, è protetta dai validatori che utilizzano la prova di stake. Questa catena è stata avviata dagli utenti di Ethereum depositando ETH in modo unidirezionale in un contratto intelligente sulla rete principale (il livello di esecuzione), che la Beacon Chain ascolta, accreditando all'utente una quantità uguale di ETH sulla nuova catena. Fino a quando non è avvenuto The Merge, i validatori della Beacon Chain non elaboravano transazioni e stavano essenzialmente raggiungendo il consenso sullo stato del pool di validatori stesso.

I validatori sulla Beacon Chain vengono ricompensati con ETH per aver attestato lo stato della catena e proposto blocchi. Le ricompense (o le penalità) vengono calcolate e distribuite a ogni epoca (ogni 6,4 minuti) in base alle prestazioni del validatore. Le ricompense dei validatori sono **significativamente** inferiori alle ricompense di mining che venivano precedentemente emesse con la prova di lavoro (2 ETH ogni ~13,5 secondi), poiché la gestione di un nodo di validazione non è così economicamente intensa e quindi non richiede né giustifica una ricompensa così alta.

### Ripartizione dell'emissione pre-Merge {#pre-merge-issuance-breakdown}

Offerta totale di ETH: **\~120.520.000 ETH** (al momento di The Merge a settembre 2022)

**Emissione del livello di esecuzione:**

- Era stimata a 2,08 ETH ogni 13,3 secondi\*: **\~4.930.000** ETH emessi in un anno
- Risultava in un tasso di inflazione di **circa il 4,09%** (4,93M all'anno / 120,5M totali)
- \*Questo include i 2 ETH per blocco canonico, più una media di 0,08 ETH nel tempo dai blocchi ommer. Utilizza anche 13,3 secondi, l'obiettivo di tempo del blocco di base senza alcuna influenza da una [bomba di difficoltà](/glossary/#difficulty-bomb). ([Vedi fonte](https://bitinfocharts.com/ethereum/))

**Emissione del livello di consenso:**

- Utilizzando 14.000.000 di ETH totali in staking, il tasso di emissione di ETH è di circa 1.700 ETH/giorno ([Vedi fonte](https://ultrasound.money/))
- Risulta in **\~620.500** ETH emessi in un anno
- Risultava in un tasso di inflazione di **circa lo 0,52%** (620,5K all'anno / 119,3M totali)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tasso di emissione annualizzato totale (pre-Merge): ~4,61%** (4,09% + 0,52%)

**\~88,7%** dell'emissione andava ai minatori sul livello di esecuzione (4,09 / 4,61 * 100)

**\~11,3%** veniva emesso agli staker sul livello di consenso (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Post-Merge (giorni nostri) {#post-merge}

### Emissione del livello di esecuzione {#el-issuance-post-merge}

L'emissione del livello di esecuzione da The Merge è pari a zero. La prova di lavoro non è più un mezzo valido per la produzione di blocchi in base alle regole aggiornate del consenso. Tutte le attività del livello di esecuzione sono pacchettizzate in "blocchi beacon", che vengono pubblicati e attestati dai validatori della prova di stake. Le ricompense per l'attestazione e la pubblicazione dei blocchi beacon sono contabilizzate separatamente sul livello di consenso.

### Emissione del livello di consenso {#cl-issuance-post-merge}

L'emissione del livello di consenso continua oggi come prima di The Merge, con piccole ricompense per i validatori che attestano e propongono blocchi. Le ricompense dei validatori continuano ad accumularsi nei _saldi dei validatori_ che sono gestiti all'interno del livello di consenso. A differenza degli account attuali (account di "esecuzione"), che possono effettuare transazioni sulla rete principale, questi sono account Ethereum separati che non possono effettuare transazioni liberamente con altri account Ethereum. I fondi in questi account possono essere prelevati solo verso un singolo indirizzo di esecuzione specificato.

Dall'aggiornamento Shanghai/Capella avvenuto ad aprile 2023, questi prelievi sono stati abilitati per gli staker. Gli staker sono incentivati a rimuovere i loro _guadagni/ricompense (saldo superiore a 32 ETH)_ poiché questi fondi altrimenti non contribuiscono al loro peso di stake (che ha un massimo di 32).

Gli staker possono anche scegliere di uscire e prelevare l'intero saldo del validatore. Per garantire che Ethereum sia stabile, il numero di validatori che escono contemporaneamente è limitato.

Circa lo 0,33% del numero totale di validatori può uscire in un determinato giorno. Per impostazione predefinita, quattro (4) validatori possono uscire per epoca (ogni 6,4 minuti, o 900 al giorno). È consentito l'uscita di un (1) validatore aggiuntivo per ogni 65.536 (2<sup>16</sup>) validatori aggiuntivi oltre i 262.144 (2<sup>18</sup>). Ad esempio, con oltre 327.680 validatori, cinque (5) possono uscire per epoca (1.125 al giorno). Sei (6) saranno consentiti con un conteggio totale di validatori attivi superiore a 393.216, e così via.

Man mano che più validatori prelevano, il numero massimo di validatori in uscita verrà gradualmente ridotto a un minimo di quattro per impedire intenzionalmente che grandi quantità destabilizzanti di ETH in staking vengano prelevate contemporaneamente.

### Ripartizione dell'inflazione post-Merge {#post-merge-inflation-breakdown}

- [Offerta totale di ETH](/eth/supply/): **\~120.520.000 ETH** (al momento di The Merge a settembre 2022)
- Emissione del livello di esecuzione: **0**
- Emissione del livello di consenso: Come sopra, tasso di emissione annualizzato di **\~0,52%** (con 14 milioni di ETH totali in staking)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tasso di emissione annualizzato totale: **\~0,52%**

Riduzione netta dell'emissione annuale di ETH: **\~88,7%** ((4,61% - 0,52%) / 4,61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> La distruzione (burn) {#the-burn}

La forza opposta all'emissione di ETH è il tasso al quale gli ETH vengono bruciati. Affinché una transazione venga eseguita su Ethereum, deve essere pagata una commissione minima (nota come "commissione di base"), che fluttua continuamente (da blocco a blocco) a seconda dell'attività della rete. La commissione viene pagata in ETH ed è _necessaria_ affinché la transazione sia considerata valida. Questa commissione viene _bruciata_ durante il processo della transazione, rimuovendola dalla circolazione.

<Alert variant="update">
<AlertContent>
<AlertDescription>

La distruzione delle commissioni è diventata operativa con [l'aggiornamento London](/ethereum-forks/#london) ad agosto 2021 e rimane invariata da The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Oltre alla distruzione delle commissioni implementata dall'aggiornamento London, i validatori possono anche incorrere in penalità per essere offline o, peggio, possono essere puniti (slashed) per aver infranto regole specifiche che minacciano la sicurezza della rete. Queste penalità comportano una riduzione di ETH dal saldo di quel validatore, che non viene ricompensato direttamente a nessun altro account, di fatto bruciandolo/rimuovendolo dalla circolazione.

### Calcolo del prezzo del gas medio per la deflazione {#calculating-average-gas-price-for-deflation}

Come discusso in precedenza, la quantità di ETH emessa in un determinato giorno dipende dal totale di ETH in staking. Al momento della stesura di questo documento, si tratta di circa 1.700 ETH/giorno.

Per determinare il prezzo del gas medio necessario per compensare completamente questa emissione in un determinato periodo di 24 ore, inizieremo calcolando il numero totale di blocchi in un giorno, dato un tempo del blocco di 12 secondi:

- `(1 blocco / 12 secondi) * (60 secondi/minuto) = 5 blocchi/minuto`
- `(5 blocchi/minuto) * (60 minuti/ora) = 300 blocchi/ora`
- `(300 blocchi/ora) * (24 ore/giorno) = 7200 blocchi/giorno`

Ogni blocco ha come obiettivo `15x10^6 gas/blocco` ([maggiori informazioni sul gas](/developers/docs/gas/)). Utilizzando questo dato, possiamo calcolare il prezzo del gas medio (in unità di gwei/gas) necessario per compensare l'emissione, data un'emissione giornaliera totale di ETH di 1.700 ETH:

- `7200 blocchi/giorno * 15x10^6 gas/blocco * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/giorno`

Risolvendo per `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arrotondando a sole due cifre significative)

Un altro modo per riorganizzare quest'ultimo passaggio sarebbe sostituire `1700` con una variabile `X` che rappresenta l'emissione giornaliera di ETH, e semplificare il resto in:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Possiamo semplificare e scriverlo come funzione di `X`:

- `f(X) = X/108` dove `X` è l'emissione giornaliera di ETH e `f(X)` rappresenta il prezzo in gwei/gas necessario per compensare tutti i nuovi ETH emessi.

Quindi, ad esempio, se `X` (emissione giornaliera di ETH) sale a 1800 in base agli ETH totali in staking, `f(X)` (gwei necessari per compensare tutta l'emissione) sarebbe quindi `17 gwei` (utilizzando 2 cifre significative)

## Letture consigliate {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dashboard disponibili per visualizzare l'emissione e la distruzione di ETH in tempo reale_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_