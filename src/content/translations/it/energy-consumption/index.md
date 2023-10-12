---
title: Spesa energetica di Ethereum
description: Le informazioni di base necessarie per capire il consumo energetico di Ethereum.
lang: it
---

# Il consumo energetico di Ethereum {#proof-of-stake-energy}

Ethereum è una blockchain ecologica. Il meccanismo di consenso di [proof-of-stake](/developers/docs/consensus-mechanisms/pos) di Ethereum utilizza gli ETH invece dell'[energia, per proteggere la rete](/developers/docs/consensus-mechanisms/pow). Il consumo energetico di Ethereum è approssimativamente pari a [0,0026 TWh/anno](https://carbon-ratings.com/eth-report-2022), sull'intera rete globale.

La stima del consumo energetico per Ethereum proviene da uno studio del [CCRI (Istituto di Valutazione Carbonica Cripto)](https://carbon-ratings.com). Hanno generato stime dettagliate del consumo energetico e dell'impronta carbonica della rete di Ethereum ([vedi lo studio](https://carbon-ratings.com/eth-report-2022)). I membri del CCRI hanno misurato il consumo di energia elettrica di diversi nodi con varie configurazioni hardware e software del client. Il consumo energetico annuale stimato della rete di **2.601 MWh** (0,0026 TWh), corrisponde alle emissioni carboniche annuali di **870 tonnellate di CO2e**, applicando i fattori di intensità carbonica specifici a livello regionale. Questo valore cambia quando i nodi accedono a e abbandonano la rete: è possibile tenerne traccia utilizzando una stima media di 7 giorni, dall'[Indice di Sostenibilità delle Reti Blockchain di Cambridge](https://ccaf.io/cbnsi/ethereum) (utilizzano un metodo lievemente differente per le loro stime, i dettagli sono disponibili sul loro sito).

Per contestualizzare il consumo energetico di Ethereum, confrontiamo le stime annualizzate per alcuni altri settori. Ciò ci aiuta a meglio comprendere se la stima per Ethereum sia alta o bassa.

<EnergyConsumptionChart />

Il grafico precedente mostra il consumo energetico annuale stimato in TWh/anno per Ethereum, rispetto a svariate altre industrie. Le stime fornite provengono da informazioni disponibili pubblicamente (ultimo accesso a maggio 2023), con collegamenti alle fonti disponibili nella seguente tabella:

|                                  | Consumo energetico annuo (TWh) | Confronto con Ethereum PoS | Fonte                                                                                                                                                                            |
| :------------------------------- | :----------------------------: | :------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Centri elaborazione dati globali |              200               |          77,000x           | [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| Estrazione dell'oro              |              131               |          50,000x           | [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin                          |              131               |          50,000x           | [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Ethereum PoW                     |               78               |          30,000x           | [fonte](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| Youtube (solo diretto)           |               12               |           4600x            | [fonte](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| Videogiochi negli Stati Uniti    |               34               |          13.000x           | [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix                          |             0,451              |            173x            | [fonte](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                           |              0,26              |            100x            | [fonte](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                           |              0,02              |             8x             | [fonte](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| Ethereum PoS                     |             0,0026             |             1x             | [fonte](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

È complicato ottenere stime accurate per il consumo energetico, specialmente quando ciò che viene misurato ha una catena di fornitura complessa o dettagli di distribuzione che ne influenzano l'efficienza. Considera Netflix o YouTube come esempi. Le stime del loro consumo energetico variano a seconda del fatto che includano esclusivamente l'energia utilizzata per mantenere i loro sistemi e fornire contenuti agli utenti (_consumo diretto_) o includano il consumo necessario a produrre i contenuti, gestire gli uffici operativi, pubblicizzare, ecc. (_consumo indiretto_). L'utilizzo indiretto potrebbe anche includere l'energia necessaria per consumare i contenuti sui dispositivi dell'utente finale, quali TV, computer e dispositivi mobili, che a loro volta dipendono dai dispositivi utilizzati.

Esiste una discussione su questo problema su [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Nella tabella precedente, il valore riportato per Netflix include i loro utilizzi _diretti_ e _indiretti_ auto-segnalati. YouTube fornisce soltanto una stima del proprio consumo _diretto_, pari a circa [12 TWh/anno](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf).

La tabella e il grafico precedenti, inoltre, includono confronti con Bitcoin e l'Ethereum di proof-of-work. È importante notare che il consumo energetico delle reti di proof-of-work non è statico ma cambia quotidianamente. Il valore utilizzato per Ethereum proof-of-work proviene da poco prima della [Fusione](/roadmap/merge/) al proof-of-stake, come previsto da [Digiconomist](https://digiconomist.net/ethereum-energy-consumption). Altre fonti, come l'[Indice di Sostenibilità delle Reti Blockchain di Cambridge](https://ccaf.io/cbnsi/ethereum/1), stimano il consumo energetico come molto inferiore (più vicino a 20 TWh/anno). Anche le stime per i consumi energetici di Bitcoin variano ampiamente a seconda delle fonti, ed è un argomento che attira molti [dibattiti](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) articolati, non soltanto sulla quantità di energia consumata, ma anche sulle fonti di tale energia e la correlata etica. Il consumo energetico non è per forza associato all'impronta ambientale, poiché progetti differenti potrebbero utilizzare fonti energetiche diverse, ad esempio una percentuale maggiore o minore di rinnovabili. Ad esempio, l'[Indice di Consumo Energetico di Bitcoin di Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons), indica che la domanda della rete di Bitcoin potrebbe essere teoricamente alimentata da gas o elettricità che andrebbero altrimenti persi in trasmissione e distribuzione. Il percorso di Ethereum verso la sostenibilità è stato quello di sostituire la parte ad alto consumo energetico della rete, con un'alternativa ecosostenibile.

Puoi sfogliare le stime sui consumi energetici e le emissioni carboniche per molti settori sul [sito dell'Indice di Sostenibilità delle Reti Blockchain di Cambridge](https://ccaf.io/cbnsi/ethereum).

## Stime per transazione {#per-transaction-estimates}

Molti articoli stimano il dispendio energetico "per transazione" delle blockchain. Questo dato può essere fuorviante perché l'energia necessaria per proporre e convalidare un blocco è indipendente dal numero di transazioni al suo interno. Un'unità di spesa energetica per transazione implica che un minor numero di transazioni comporti una minore spesa energetica e viceversa, ma non è così. Inoltre, le stime per transazione sono molto sensibili al modo in cui viene definita la portata di trasmissione delle transazioni di una blockchain, e la modifica di questa definizione può essere manipolata per far sembrare il valore maggiore o minore.

Ad esempio, su Ethereum, la portata di trasmissione delle transazioni non è solo quella del livello base, ma è anche la somma delle portate di trasmissione delle transazioni di tutti i relativi rollup di "[livello 2](/layer-2/)". I livelli 2 non sono generalmente inclusi nei calcoli, ma è probabile che tenere conto dell'energia aggiuntiva consumata dai sequenziatori (poca) e del numero di transazioni che elaborano (molte) contribuirebbe a una riduzione drastica delle stime per transazione. Questo è uno dei motivi per cui il confronto del consumo energetico per transazione tra le varie piattaforme può essere fuorviante.

## Il debito di carbonio di Ethereum {#carbon-debt}

Il dispendio energetico di Ethereum è molto basso, ma non è sempre stato così. Originariamente Ethereum utilizzava la proof-of-work, che aveva un costo ambientale molto più elevato dell'attuale meccanismo proof-of-stake.

Fin dall'inizio, Ethereum ha pianificato d'implementare un meccanismo di consenso basato sulla proof-of-stake, ma per farlo senza sacrificare la sicurezza e la decentralizzazione sono stati necessari anni di ricerca e sviluppo mirati. Dunque, per avviare la rete è stato usato un meccanismo proof-of-work. La proof-of-work richiede che i minatori utilizzino il processore del proprio dispositivo per calcolare un valore, spendendo energia nel processo.

![Confronto tra il consumo energetico di Ethereum prima della Fusione e dopo, utilizzando la Torre Eiffel (alta 330 metri) sulla sinistra per simbolizzare il consumo energetico prima della Fusione e un piccolo personaggio Lego di 4 cm sulla destra per rappresentare la drastica riduzione del consumo energetico dopo di essa](energy_consumption_pre_post_merge.png)

Il CCRI stima che La Fusione abbia ridotto il consumo energetico annualizzato di Ethereum per oltre il **99,988%**. Similmente, l'impronta di carbonio di Ethereum è stata ridotta approssimativamente del **99,992%** (da 11.016.000 a 870 tonnellate di CO2e). Per mettere tutto questo in prospettiva, la riduzione delle emissioni equivale a passare dall'altezza della Torre Eiffel a un piccolo personaggio giocattolo in plastica, come illustrato nell'immagine precedente. Di conseguenza, il costo ambientale della protezione della rete è ridotto drasticamente. Al contempo, si ritiene che la sicurezza della rete sia aumentata.

## Un livello d'applicazione ecologico {#green-applications}

Sebbene il consumo di energia di Ethereum sia molto basso, esiste una consistente community di [**finanza rigenerativa (ReFi)**](/refi/), in crescita e molto attiva, che sviluppa su Ethereum. Le applicazioni ReFi usano i componenti della DeFi per creare applicazioni finanziarie aventi esternalità positive a beneficio dell'ambiente. La ReFi è parte di un più ampio movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk), strettamente allineato con Ethereum e che mira a conciliare progresso tecnologico e gestione ambientale. La natura decentralizzata, senza permessi e componibile di Ethereum lo rende il livello di base ideale per le comunità ReFi e solarpunk.

Piattaforme di finanziamento di beni pubblici web3 native come [Gitcoin](https://gitcoin.co) conducono raccolte fondi climatiche per promuovere uno sviluppo consapevole dell'ambiente sul livello di applicazione di Ethereum. Grazie allo sviluppo di queste iniziative (e di altre, ad esempio [DeSci](/desci/)), Ethereum sta diventando una tecnologia positiva dal punto di vista ambientale e sociale.

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
