---
title: Spesa energetica di Ethereum
description: Le informazioni di base necessarie per capire il consumo energetico di Ethereum.
lang: it
---

# Il consumo energetico di Ethereum {#proof-of-stake-energy}

Ethereum è una blockchain ecologica. Il meccanismo di consenso di [proof-of-stake](/developers/docs/consensus-mechanisms/pos) di Ethereum utilizza gli ETH invece dell'[energia, per proteggere la rete](/developers/docs/consensus-mechanisms/pow). Il consumo energetico di Ethereum è approssimativamente pari a [0,0026 TWh/anno](https://carbon-ratings.com/eth-report-2022), sull'intera rete globale.

La stima del consumo energetico per Ethereum proviene da uno studio del [CCRI (Istituto di Valutazione Carbonica Cripto)](https://carbon-ratings.com). Ha prodotto delle stime bottom-up del consumo energetico e dell'impronta di carbonio della rete Ethereum ([vedi il report](https://carbon-ratings.com/eth-report-2022)). I membri del CCRI hanno misurato il consumo di energia elettrica di diversi nodi con varie configurazioni hardware e software del client. Il consumo energetico annuale stimato della rete di **2.601 MWh** (0,0026 TWh), corrisponde alle emissioni carboniche annuali di **870 tonnellate di CO2e**, applicando i fattori di intensità carbonica specifici a livello regionale. Questo valore cambia quando i nodi entrano ed escono dalla rete: è possibile tenerne traccia utilizzando una stima media mobile di 7 giorni, dall'[Indice di sostenibilità delle reti blockchain di Cambridge](https://ccaf.io/cbnsi/ethereum) (si noti che utilizza un metodo lievemente differente per le sue stime, i dettagli sono disponibili sul suo sito).

Per contestualizzare il consumo energetico di Ethereum, confrontiamo le stime annue per alcuni altri prodotti e settori. Ciò ci aiuta a meglio comprendere se la stima per Ethereum sia alta o bassa.

<EnergyConsumptionChart />

Il grafico che precede mostra il consumo energetico stimato in TWh/anno per Ethereum, confrontato con diversi altri prodotti e settori. Le stime fornite provengono da informazioni di dominio pubblico, reperite nel luglio 2023, con link alle fonti disponibili nella seguente tabella.

|                                   | Consumo energetico annuo (TWh) | Confronto con Ethereum PoS |                                                                                      Fonte                                                                                       |
|:--------------------------------- |:------------------------------:|:--------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Centri elaborazione dati globali  |              190               |          73.000x           |                                    [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                           |              149               |          53.000x           |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Estrazione dell'oro               |              131               |          50.000x           |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Videogiochi negli Stati Uniti\* |               34               |          13.000x           |                 [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW                      |               21               |           8.100x           |                                                                    [fonte](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                            |               19               |           7.300x           |                                           [fonte](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                           |             0,457              |            176x            | [fonte](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                            |              0,26              |            100x            |                                  [fonte](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                            |              0,02              |             8x             |                               [fonte](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **Ethereum PoS**                  |           **0,0026**           |           **1x**           |                                                               [fonte](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Include dispositivi dell'utente finale come PC, portatili e console da gaming.

Ottenere stime accurate del consumo energetico è complicato, specialmente quando ciò che viene misurato ha una filiera di fornitura complessa o dettagli d'implementazione che ne influenzano l'efficienza. Per esempio, le stime di consumo energetico per Netflix e Google variano se viene incluso solamente il consumo per mantenere i loro sistemi e fornire contenuti agli utenti (_spese dirette_) o se vengono incluse anche le spese per produzione di contenuti, gestione di uffici aziendali, pubblicità, ecc (_spese indirette_). Le spese indirette possono anche includere l'energia necessaria per utilizzare i contenuti sui dispositivi degli utenti finali come TV, computer e cellulari.

Le suddette stime non sono comparazioni perfette. L'ammontare delle spese indirette considerato varia a seconda della fonte, e raramente include l'energia dei dispositivi degli utenti finali. Ogni fonte sottostante include maggiori dettagli sull'oggetto della misurazione.

La tabella e il grafico precedenti, inoltre, includono confronti con Bitcoin ed Ethereum proof-of-work. È importante notare che il consumo energetico delle reti proof-of-work non è statico e cambia quotidianamente. Le stime possono anche variare ampiamente tra diverse fonti. L'argomento genera un variopinto [dibattito](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), non solo riguardante la quantità di energia consumata, ma anche riguardo alle fonti di quell'energia e alla rispettiva eticità. Non necessariamente il consumo energetico corrisponde precisamente all'impatto ambientale, poiché progetti differenti potrebbero utilizzare fonti energetiche diverse con una percentuale maggiore o minore di rinnovabili. Per esempio, l'[Indice del consumo di elettricità dei Bitcoin di Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) indica che la domanda della rete Bitcoin potrebbe teoricamente essere soddisfatta con combustione di gas e utilizzo di elettricità che altrimenti verrebbero persi nella fase di trasmissione e distribuzione. Il percorso di Ethereum verso la sostenibilità è stato quello di sostituire la parte ad alto consumo energetico della rete, con un'alternativa ecosostenibile.

Puoi sfogliare le stime sui consumi energetici e le emissioni carboniche per molti settori sul [sito dell'Indice di sostenibilità delle reti blockchain di Cambridge](https://ccaf.io/cbnsi/ethereum).

## Stime per transazione {#per-transaction-estimates}

Molti articoli stimano il dispendio energetico "per transazione" delle blockchain. Questo dato può essere fuorviante perché l'energia necessaria per proporre e convalidare un blocco è indipendente dal numero di transazioni al suo interno. Un'unità di spesa energetica per transazione implica che un minor numero di transazioni comporti una minore spesa energetica e viceversa, ma non è così. Inoltre, le stime per transazione sono molto sensibili al modo in cui viene definita la portata di trasmissione delle transazioni di una blockchain, e la modifica di questa definizione può essere manipolata per far sembrare il valore maggiore o minore.

Su Ethereum, ad esempio, la portata di trasmissione delle transazioni non è solo quella del livello base, ma è anche la somma delle portate di trasmissione delle transazioni di tutti i suoi rollup di "[livello 2](/layer-2/)". I livelli 2 non sono generalmente inclusi nei calcoli, ma tenere conto dell'energia aggiuntiva consumata dai sequenziatori (poca) e del numero di transazioni che elaborano (molte) probabilmente ridurrebbe drasticamente le stime per transazione. Questo è uno dei motivi per cui le comparazioni del consumo energetico per transazione delle varie piattaforme possono essere fuorvianti.

## Il debito di carbonio di Ethereum {#carbon-debt}

Il dispendio energetico di Ethereum è molto basso, ma non è sempre stato così. Originariamente Ethereum utilizzava il proof-of-work, che aveva un costo ambientale molto più elevato dell'attuale meccanismo prova di proof-of-stake.

Fin dalle sue origini, Ethereum ha pianificato di implementare un meccanismo di consenso di proof-of-stake, ma farlo senza sacrificare la sicurezza e la decentralizzazione ha richiesto anni di ricerca e sviluppo mirati. Pertanto, per avviare la rete è stato usato un meccanismo di proof-of-work. Il proof-of-work richiede che i miner utilizzino il processore del proprio dispositivo per calcolare un valore, spendendo energia nel processo.

![Confronto tra il consumo energetico di Ethereum prima e dopo La Fusione, utilizzando la Torre Eiffel (alta 330 metri) sulla sinistra per simbolizzare il consumo energetico prima della Fusione e un piccolo personaggio Lego di 4 cm sulla destra per rappresentare la drastica riduzione del consumo energetico dopo di essa](energy_consumption_pre_post_merge.png)

CCRI stima che La Fusione abbia ridotto il consumo energetico annualizzato di Ethereum di più del **99,988%**. Analogamente, l'impronta di carbonio di Ethereum è stata ridotta approssimativamente del **99,992%** (da 11.016.000 a 870 tonnellate di CO2e). Per mettere tutto questo in prospettiva, la riduzione delle emissioni equivale a passare dall'altezza della Torre Eiffel a un piccolo personaggio giocattolo in plastica, come illustrato nella figura precedente. Dunque, il costo ambientale del proteggere la rete si riduce drasticamente. Al contempo, si ritiene che la sicurezza della rete sia aumentata.

## Un livello d'applicazione ecologico {#green-applications}

Mentre il consumo energetico di Ethereum è molto ridotto, vi è anche una community sostanziale, in crescita e altamente attiva di **finanza rigenerativa (ReFi)** che sta nascendo su Ethereum. Le applicazioni ReFi usano i componenti della DeFi per creare applicazioni finanziarie aventi esternalità positive a beneficio dell'ambiente. La ReFi è parte di un più ampio movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk), strettamente allineato con Ethereum e che mira ad accoppiare l'avanzamento tecnologico alla gestione ambientale. La natura decentralizzata, senza permessi e componibile di Ethereum lo rende il livello di base ideale per la ReFi e le community solarpunk.

Piattaforme di finanziamento di beni pubblici web3 native come [Gitcoin](https://gitcoin.co) conducono raccolte fondi climatiche per promuovere uno sviluppo consapevole dell'ambiente sul livello di applicazione di Ethereum. Grazie allo sviluppo di queste iniziative (e di altre, ad esempio [DeSci](/desci/)), Ethereum sta diventando una tecnologia positiva in termini ambientali e sociali.

<InfoBanner emoji=":evergreen_tree:">
  Se pensi che questa pagina possa essere resa più accurata, segnala un problema o una PR. Le statistiche riportate in questa pagina sono stime basate su dati pubblicamente disponibili e non rappresentano una dichiarazione o una promessa ufficiale del team di ethereum.org o della Fondazione Ethereum.
</InfoBanner>

## Letture consigliate {#further-reading}

- [Indice di Sostenibilità delle Reti Blockchain di Cambridge](https://ccaf.io/cbnsi/ethereum)
- [Relazione della Casa Bianca sulle blockchain proof-of-work](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) (Emissioni di Ethereum: Una stima bottom-up) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_ (Indice del consumo energetico di Ethereum)
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusione - Implicazioni sul consumo elettrico e sull'impronta carbonica della rete Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo energetico di Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Argomenti correlati {#related-topics}

- [Visione di Ethereum](/roadmap/vision/)
- [La Beacon Chain](/roadmap/beacon-chain)
- [La Fusione](/roadmap/merge/)
