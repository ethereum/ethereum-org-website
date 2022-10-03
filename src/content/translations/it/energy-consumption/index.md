---
title: Consumo energetico di Ethereum
description: Le informazioni di base necessarie per capire il consumo energetico di Ethereum.
lang: it
---

# Consumo energetico di Ethereum {#introduction}

L'attuale spesa energetica di Ethereum con il [proof-of-work](/developers/docs/consensus-mechanisms/#proof-of-work) è troppo elevata e insostenibile. Risolvere i problemi di spesa energetica senza sacrificare la sicurezza e la decentralizzazione è una sfida tecnica significativa ed è stata oggetto di ricerca e sviluppo per anni. Esploriamo perché la costruzione di Ethereum ha avuto un alto impatto ambientale e come il prossimo aggiornamento della rete a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) cambierà drasticamente la situazione.

## L'energia protegge la rete {#energy-secures-the-network}

Le transazioni sulla blockchain Ethereum sono convalidate dai ["minatori"](/developers/docs/consensus-mechanisms/pow/mining). I "minatori" raggruppano le transazioni in blocchi ordinati e le aggiungono alla blockchain Ethereum. I nuovi blocchi vengono trasmessi a tutti gli altri operatori del nodo che eseguono le transazioni in modo indipendente e verificano che siano validi. Qualsiasi azione disonesta si presenta come un'incongruenza tra i diversi nodi. I blocchi onesti vengono aggiunti alla blockchain e diventano una parte immutabile della storia.

La capacità di ogni "minatore" di aggiungere nuovi blocchi funziona solo se c'è un costo associato al minare e imprevedibilità su quale nodo specifico invia il prossimo blocco. Queste condizioni sono soddisfatte imponendo il proof-of-work (PoW). Per essere idoneo a inviare un blocco di transazioni, un "minatore" deve risolvere un puzzle computazionale arbitrario più velocemente di qualsiasi altro "minatore". Risolvere il puzzle crea concorrenza tra i "minatori" e costi sotto forma di spesa energetica. Per defraudare con successo la blockchain, un "minatore" disonesto dovrebbe vincere costantemente la gara di proof-of-work, il che è molto improbabile ed estremamente costoso.

Ethereum usa il proof-of-work fin dall'inizio. La migrazione dal proof-of-work al proof-of-stake è sempre stato un obiettivo fondamentale di Ethereum. Tuttavia, sviluppare un sistema proof-of-stake che aderisca ai principi fondamentali di Ethereum di sicurezza e decentralizzazione non è banale. Ci sono volute molte ricerche e scoperte nella crittografia, nella criptoeconomia e nella progettazione di meccanismi per arrivare ad un punto in cui la transizione è possibile.

## Spesa energetica del proof-of-work {#proof-of-work}

Proof-of-work è un modo solido per proteggere la rete e imporre cambiamenti onesti alla blockchain, ma è problematico per diverse ragioni. Poiché il diritto di minare un blocco richiede la risoluzione di un puzzle computazionale arbitrario, i "minatori" possono aumentare le loro probabilità di successo investendo in un hardware più potente. Questi incentivi causano una "corsa agli armamenti" dei "minatori" che acquistano attrezzature per minare che consumano sempre più energia. Il protocollo proof-of-work di Ethereum attualmente ha un consumo energetico totale annuo approssimativamente uguale a quello della Finlandia<sup>[^1]</sup> e un'impronta di carbonio simile alla Svizzera<sup>[^1]</sup>.

## Proof-of-Stake {#proof-of-stake}

Un futuro più verde per Ethereum è già in costruzione sotto forma di catena [**proof-of-stake (PoS)**](/upgrades/beacon-chain/). Nell'ambito del [proof-of-stake](/developers/docs/consensus-mechanisms/pos/), la risoluzione dei puzzle arbitrario non è necessaria. Rimuovendo la risoluzione dei puzzle si riduce drasticamente il dispendio energetico necessario per mettere in sicurezza la rete. I "minatori" vengono sostituiti da convalidatori che svolgono la stessa funzione, ma, anziché spendere i loro attivi in anticipo sotto forma di lavoro computazionale, investono ETH come garanzia reale contro il comportamento disonesto. Se il convalidatore è pigro (offline quando si suppone che debba adempiere a qualche dovere di convalidatore) può lentamente perdere il suo ETH investito, mentre un comportamento palesemente disonesto ha come risultato che gli attivi investiti vengono ridotti. Questo incentiva fortemente la partecipazione attiva e onesta nel rendere sicura la rete.

Analogamente al proof-of-work, un'entità dannosa richiederebbe almeno il 51% del totale degli ETH investiti nella rete per eseguire un [attacco del 51%](/glossary/#51-attack). Tuttavia, a differenza del proof-of-work, dove la perdita potenziale di un attacco non riuscito è solo il costo di generare la potenza di hash necessaria per minare, nel proof-of-stake, la possibile perdita di un attacco è l'intera quantità di ETH usata come garanzia reale. Questa struttura disincentivante permette la sicurezza della rete con il proof-of-stake eliminando la necessità di spendere energia in calcoli arbitrari. Spiegazioni dettagliate sulla sicurezza della rete in proof-of-stake possono essere trovate [qui](/developers/docs/consensus-mechanisms/pos/) e [qui](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## La fusione {#the-merge}

C'è una catena proof-of-stake funzionale chiamata [Beacon Chain](/upgrades/beacon-chain/) che è in funzione da dicembre 2020 e che sta dimostrando la fattibilità del protocollo proof-of-stake. La fusione si riferisce al momento in cui Ethereum si lascia alle spalle il proof-of-work e adotta completamente il proof-of-stake. La fusione dovrebbe avvenire nel secondo trimestre del 2022. [Maggiori informazioni sulla fusione](/upgrades/merge/).

## Spesa energetica del proof-of-stake {#proof-of-stake-energy}

Oltre a costruire la fiducia nel meccanismo di proof-of-stake, la Beacon Chain permette anche di stimare l'utilizzo di energia post-fusione di Ethereum. Una [stima recente](https://blog.ethereum.org/2021/05/18/country-power-no-more/) ha suggerito che la fusione del proof-of-stake potrebbe risultare in una riduzione del 99,95% dell'uso totale di energia, con il proof-of-stake che è ~2000 volte più efficiente dal punto di vista energetico del proof-of-work. Il dispendio energetico di Ethereum sarà all'incirca uguale al costo di funzionamento di un computer domestico per ogni nodo della rete.

![immagine](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>Stima del consumo energetico del PoW (proof-of-work) per tx utilizzato in cifre sulla base dei dati di <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">maggio 2021</a>, al momento di scrivere la stessa fonte suggeriva fino a <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 kWh</a></i></small></p>

Confrontiamo questi numeri a un servizio come Visa. 100.000 transazioni Visa utilizzano 149 kWh di energia<sup>[^2]</sup>. Supponendo che lo sharding sia stato implementato, il tasso di transazione corrente di Ethereum (15 transazioni al secondo) sarà aumentato di almeno 64 volte (il numero di partizioni), senza contare l'ottimizzazione aggiuntiva dai rollup. Una stima realistica per Ethereum post-fusione sottoposto a sharding con rollup è [25.000 - 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transazioni al secondo. Possiamo utilizzare queste informazioni per stimare la spesa massima e minima di energia per 100.000 transazioni.

- 25.000 transazioni al secondo.
- `100.000 / 25.000 = 4` secondi per elaborare 100.000 transazioni.

Possiamo anche stimare la spesa energetica di Ethereum al secondo, facendo una stima prudente che 10.000 convalidatori attivi stiano proteggendo la rete (ci sono più di [250.000 convalidatori sulla Beacon Chain](https://beaconscan.com/) al momento, ma molti convalidatori possono operare su un unico nodo. Attualmente, si stima che ci siano 3.000-4.000 singoli nodi, quindi 10.000 è una stima prudente per la post-fusione):

`1,44 kWh di uso giornaliero * 10.000 nodi di rete = 14.400 kWh` al giorno. Ci sono 86.400 secondi in un giorno, quindi `14.400 / 86.400 = 0,1666666667 kWh` al secondo.

Moltiplicando questo valore per il tempo necessario ad elaborare 100.000 transazioni: `0,1667 * 4 = 0,667 kWh`.

Questo valore è pari allo ~0,4% dell'energia utilizzata da Visa per lo stesso numero di transazioni, ovvero una riduzione della spesa energetica di un fattore di ~225 rispetto all'attuale rete proof-of-work di Ethereum.

Ripetere il calcolo con il numero massimo di transazioni al secondo si ottiene 0,1667 kWh al secondo, che è circa lo 0,1% della spesa energetica di Visa, ovvero una riduzione di ~894 volte.

_Nota: non è del tutto accurato confrontare in base al numero di transazioni dato che il consumo di energia di Ethereum è basato sul tempo. Il consumo di energia di Ethereum è lo stesso in 1 minuto, indipendentemente dal fatto che faccia 1 o 1.000 transazioni._

_Dobbiamo anche considerare che Ethereum non si limita a semplici transazioni finanziarie, ma è anche una piattaforma completa costruita per smart contract e applicazioni decentralizzate._

## Un Ethereum più verde {#green-ethereum}

Mentre il consumo di energia di Ethereum è stato storicamente sostanziale, c'è stato un grande investimento di tempo e intelletto degli sviluppatori nella transizione da una convalida dei blocchi ad elevato consumo energetico a una efficiente dal punto di vista energetico. Per citare [Bankless](http://podcast.banklesshq.com/), il modo migliore per ridurre l'energia consumata dal proof-of-work è semplicemente "spegnerlo", che è l'approccio che Ethereum si è impegnata ad adottare.

<InfoBanner emoji=":evergreen_tree:">
  Se pensi che queste statistiche siano errate o possano essere rese più accurate, ti invitiamo a segnalarlo o inviare una "Pull Request". Queste sono stime del team di ethereum.org fatte usando informazioni pubblicamente accessibili e l'attuale tabella di marcia di Ethereum. Queste dichiarazioni non rappresentano una promessa ufficiale della Fondazione Ethereum. 
</InfoBanner>

## Letture consigliate {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 maggio 2021_
- [Emissions Ethereum: A bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/)—_[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Argomenti correlati {#related-topics}

- [Visione di Ethereum](/upgrades/vision/)
- [La Beacon Chain](/upgrades/beacon-chain)
- [La fusione](/upgrades/merge/)
- [Sharding](/upgrades/beacon-chain/)

### Note a piè pagina e fonti {#footnotes-and-sources}

#### 1. Consumo energetico del proof-of-work di Ethereum {#fn-1}

[Consumo di energia per paese. Ethereum (TWh all'anno)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consumo energetico di Visa {#fn-2}

[Consumo energetico medio di rete Bitcoin per transazione rispetto alla rete VISA a partire dal 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Rapporto finanziario Visa quarto trimestre 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
