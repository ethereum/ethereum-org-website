---
title: Consumo energetico di Ethereum
description: Le informazioni di base necessarie per comprendere il consumo energetico di Ethereum.
lang: it
---

# Dispendio energetico di Ethereum {#proof-of-stake-energy}

[Ethereum](/) è una blockchain verde. Il [meccanismo di consenso](/developers/docs/consensus-mechanisms/pos) [prova di stake](/developers/docs/consensus-mechanisms/pos) di Ethereum utilizza gli ETH invece dell'[energia per proteggere la rete](/developers/docs/consensus-mechanisms/pow). Il consumo energetico di Ethereum è di circa [\~0,0026 TWh/anno](https://carbon-ratings.com/eth-report-2022) in tutta la rete globale.

La stima del consumo energetico per Ethereum proviene da uno studio del [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Hanno generato stime dal basso verso l'alto del consumo di elettricità e dell'impronta di carbonio della rete Ethereum ([vedi il rapporto](https://carbon-ratings.com/eth-report-2022)). Hanno misurato il consumo di elettricità di diversi nodi con varie configurazioni hardware e software del client. I **2.601 MWh** (0,0026 TWh) stimati per il consumo annuale di elettricità della rete corrispondono a emissioni annuali di carbonio di **870 tonnellate di CO2e** applicando fattori di intensità di carbonio specifici per regione. Questo valore cambia man mano che i nodi entrano ed escono dalla rete: puoi tenerne traccia utilizzando una stima media mobile di 7 giorni del [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (nota che utilizzano un metodo leggermente diverso per le loro stime; i dettagli sono disponibili sul loro sito).

Per contestualizzare il consumo energetico di Ethereum, possiamo confrontare le stime annualizzate per alcuni altri prodotti e settori. Questo ci aiuta a capire meglio se la stima per Ethereum è alta o bassa.

<EnergyConsumptionChart />

Il grafico sopra mostra il consumo energetico stimato in TWh/anno per Ethereum, confrontato con molti altri prodotti e settori. Le stime fornite provengono da informazioni disponibili pubblicamente, consultate a luglio 2023, con i link alle fonti disponibili nella tabella sottostante.

|                     | Consumo energetico annualizzato (TWh) | Confronto con Ethereum PoS |                                                                                      Fonte                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Data center globali |                 190                 |          73.000x           |                                    [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Estrazione dell'oro |                 131                 |          50.000x           |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming negli USA\*  |                 34                  |          13.000x           |                 [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW        |                 21                  |           8.100x           |                                                                    [fonte](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [fonte](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [fonte](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [fonte](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [fonte](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **Ethereum PoS**    |             **0,0026**              |           **1x**           |                                                               [fonte](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Include i dispositivi degli utenti finali come PC, portatili e console di gioco.

Ottenere stime accurate per il consumo energetico è complicato, specialmente quando ciò che viene misurato ha una catena di approvvigionamento complessa o dettagli di implementazione che ne influenzano l'efficienza. Ad esempio, le stime del consumo energetico per Netflix e Google variano a seconda che includano solo l'energia utilizzata per mantenere i loro sistemi e fornire contenuti agli utenti (_spesa diretta_) o che includano la spesa necessaria per produrre contenuti, gestire uffici aziendali, fare pubblicità, ecc. (_spesa indiretta_). La spesa indiretta potrebbe anche includere l'energia necessaria per consumare contenuti sui dispositivi degli utenti finali come TV, computer e cellulari.

Le stime di cui sopra non sono confronti perfetti. La quantità di spesa indiretta contabilizzata varia a seconda della fonte e raramente include l'energia dei dispositivi degli utenti finali. Ogni fonte sottostante include maggiori dettagli su ciò che viene misurato.

La tabella e il grafico sopra includono anche confronti con Bitcoin e l'Ethereum basato sulla prova di lavoro. È importante notare che il consumo energetico delle reti basate sulla prova di lavoro non è statico e cambia di giorno in giorno. Le stime possono anche variare ampiamente tra le fonti. L'argomento attira un [dibattito](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) ricco di sfumature, non solo sulla quantità di energia consumata, ma anche sulle fonti di tale energia e sull'etica correlata. Il consumo energetico non corrisponde necessariamente in modo preciso all'impronta ambientale perché progetti diversi potrebbero utilizzare fonti di energia diverse, inclusa una percentuale minore o maggiore di energie rinnovabili. Ad esempio, il [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) indica che la domanda della rete Bitcoin potrebbe teoricamente essere alimentata dal gas flaring o dall'elettricità che andrebbe altrimenti persa nella trasmissione e distribuzione. Il percorso di Ethereum verso la sostenibilità è stato quello di sostituire la parte della rete affamata di energia con un'alternativa verde.

Puoi consultare le stime del consumo energetico e delle emissioni di carbonio per molti settori sul [sito del Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Stime per transazione {#per-transaction-estimates}

Molti articoli stimano il dispendio energetico "per transazione" per le blockchain. Questo può essere fuorviante perché l'energia necessaria per proporre e convalidare un blocco è indipendente dal numero di transazioni al suo interno. Un'unità di dispendio energetico per transazione implica che un minor numero di transazioni porterebbe a un minore dispendio energetico e viceversa, il che non è il caso. Inoltre, le stime per transazione sono molto sensibili a come viene definito il throughput delle transazioni di una blockchain, e la modifica di questa definizione può essere manipolata per far sembrare il valore più grande o più piccolo.

Su Ethereum, ad esempio, il throughput delle transazioni non è solo quello del livello di base: è anche la somma del throughput delle transazioni di tutti i suoi rollup di "[livello 2](/layer-2/)". I livelli 2 non sono generalmente inclusi nei calcoli, ma tenere conto dell'energia aggiuntiva consumata dai sequenziatori (piccola) e del numero di transazioni che elaborano (grande) ridurrebbe probabilmente drasticamente le stime per transazione. Questo è uno dei motivi per cui i confronti del consumo energetico per transazione tra le piattaforme possono essere fuorvianti.

## Il debito di carbonio di Ethereum {#carbon-debt}

Il dispendio energetico di Ethereum è molto basso, ma non è sempre stato così. In origine, Ethereum utilizzava la prova di lavoro, che aveva un costo ambientale molto maggiore rispetto all'attuale meccanismo di prova di stake.

Fin dall'inizio, Ethereum aveva pianificato di implementare un meccanismo di consenso basato sulla prova di stake, ma farlo senza sacrificare la sicurezza e la decentralizzazione ha richiesto anni di ricerca e sviluppo mirati. Pertanto, è stato utilizzato un meccanismo di prova di lavoro per avviare la rete. La prova di lavoro richiede ai minatori di utilizzare il proprio hardware di calcolo per calcolare un valore, spendendo energia nel processo.

![Confronto del consumo energetico di Ethereum prima e dopo Il Merge, utilizzando la Torre Eiffel (alta 330 metri) a sinistra per simboleggiare l'elevato consumo energetico prima de Il Merge, e una piccola figura Lego alta 4 cm a destra per rappresentare la drastica riduzione del consumo di energia dopo Il Merge](energy_consumption_pre_post_merge.png)

Il CCRI stima che Il Merge abbia ridotto il consumo di elettricità annualizzato di Ethereum di oltre il **99,988%**. Allo stesso modo, l'impronta di carbonio di Ethereum è diminuita di circa il **99,992%** (da 11.016.000 a 870 tonnellate di CO2e). Per mettere questo in prospettiva, la riduzione delle emissioni è come passare dall'altezza della Torre Eiffel a una piccola figura giocattolo di plastica, come illustrato nella figura sopra. Di conseguenza, il costo ambientale per proteggere la rete è drasticamente ridotto. Allo stesso tempo, si ritiene che la sicurezza della rete sia migliorata.

## Un livello di applicazione verde {#green-applications}

Sebbene il consumo energetico di Ethereum sia molto basso, c'è anche una comunità di [**finanza rigenerativa (ReFi)**](/refi/) sostanziale, in crescita e molto attiva che costruisce su Ethereum. Le applicazioni ReFi utilizzano componenti DeFi per creare applicazioni finanziarie che hanno esternalità positive a beneficio dell'ambiente. La ReFi fa parte di un più ampio movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) che è strettamente allineato con Ethereum e mira ad accoppiare il progresso tecnologico e la tutela dell'ambiente. La natura decentralizzata, senza permessi e componibile di Ethereum lo rende il livello di base ideale per le comunità ReFi e solarpunk.

Le piattaforme di finanziamento dei beni pubblici native del Web3 come [Gitcoin](https://gitcoin.co) gestiscono round climatici per stimolare la costruzione consapevole dell'ambiente sul livello di applicazione di Ethereum. Attraverso lo sviluppo di queste iniziative (e altre, ad es. [DeSci](/desci/)), Ethereum sta diventando una tecnologia netta positiva dal punto di vista ambientale e sociale.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Se ritieni che questa pagina possa essere resa più accurata, apri una issue o una PR. Le statistiche in questa pagina sono stime basate su dati disponibili pubblicamente: non rappresentano una dichiarazione ufficiale o una promessa da parte del team di ethereum.org o della Ethereum Foundation.
</AlertDescription>
</AlertContent>
</Alert>

## Letture consigliate {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Rapporto della Casa Bianca sulle blockchain basate sulla prova di lavoro](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emissioni di Ethereum: una stima dal basso verso l'alto](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Indice del consumo energetico di Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Il Merge - Implicazioni sul consumo di elettricità e sull'impronta di carbonio della rete Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Il consumo energetico di Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Argomenti correlati {#related-topics}

- [La beacon chain](/roadmap/beacon-chain)
- [Il Merge](/roadmap/merge/)