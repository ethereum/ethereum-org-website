---
title: Consumo energetico di Ethereum
description: Le informazioni di base necessarie per capire il consumo energetico di Ethereum.
lang: it
---

# Consumo energetico di Ethereum {#introduction}

Ethereum è una blockchain ecologica. Usa un meccanismo di consenso di [proof-of-stake](/developers/docs/consensus-mechanisms/pos) che può esser eseguito sui dispositivi a bassa potenza e non richiede elevata potenza di calcolo per partecipare. Il meccanismo di proof-of-stake di Ethereum protegge la rete usando gli ETH in staking piuttosto che l'energia consumata, come nel [proof-of-work](/developers/docs/consensus-mechanisms/pow). Il passaggio al proof-of-stake significa che l'energia consumata dalla rete di Ethereum è relativamente ridotta, verso i 0,01 TWh/anno.

## Spesa energetica del proof-of-stake {#proof-of-stake-energy}

Il consumo energetico di Ethereum è approssimativamente pari al costo di operazione di un portatile modesto per ogni nodo sulla rete.

Molti articoli stimano una spesa energetica "per transazione" per confrontare le blockchain ad altre industrie. Il beneficio di ciò è che è facile da comprendere. Tuttavia, le stime basate sulle transazioni possono essere fuorvianti poiché l'energia richiesta per proporre e validare un blocco è indipendente dal numero di transazioni al suo interno. Un'unità di spesa energetica per transazione implica che meno transazioni porterebbero a una spesa minore e viceversa, il che non è vero. Una stima per transazione dipende fortemente da come è definito il volume di transazione di una blockchain e, modificare tale definizione, può far sembrare maggiore o minore il valore.

Ad esempio, su Ethereum, il volume di transazione non è solo quello del livello di base, è anche la somma del volume di transazione di tutti i suoi rollup del "[livello 2](/layer-2/)", non generalmente inclusi nei calcoli e che lo ridurrebbero drasticamente. Questo è uno dei motivi per cui gli strumenti che confrontano il consumo energetico per transazione sulle piattaforme, sono fuorvianti.

Più rilevante è il consumo energetico complessivo e l'impronta carbonica dell'intera rete. Da tali valori, possiamo esaminare ciò che la rete offre ai suoi utenti e alla società intera ed effettuare una valutazione più globale del fatto che la spesa energetica sia o meno giustificata. Le misurazioni per transazione, d'altra parte, implicano che il valore della rete provenga solo dal suo ruolo nel trasferire criptovalute tra conti e proibiscono un'analisi onesta di costi e benefici.

Il [CCRI](https://carbon-ratings.com) (Crypto Carbon Ratings Institute) ha analizzato ampiamente il consumo di elettricità e l'impronta carbonica della rete Ethereum (vedi il report [_La Fusione - Implicazioni sul consumo elettrico e sull'impronta carbonica della rete Ethereum_](https://carbon-ratings.com/eth-report-2022)). Il CCRI ha misurato il consumo elettrico di diversi nodi con varie configurazioni hardware e software del client. Ne è risultata una stima di **2,601 MWh** (0,0026 TWh) per il consumo annuo di elettricità della rete al momento dell'analisi (settembre 2022), corrispondente alle emissioni carboniche annuali di **870 tonnellate di CO2e**, applicando i fattori di intensità carbonica specifici regionali.

[Digiconomist fornisce il consumo energetico e le impronte carboniche dell'intera rete per Bitcoin ed Ethereum](https://digiconomist.net/ethereum-energy-consumption). Nel momento in cui viene scritto questo articolo, Bitcoin consuma circa 200 TWh/anno di energia ed emette circa 100 MT (megatonnellate) di carbonio all'anno, generando circa 32.000 t di rifiuti energetici da hardware obsoleti ogni anno. In confronto, la spesa energetica totale per proteggere Ethereum è più vicina a **0,01 TWh/anno**.

<EnergyConsumptionChart />

La suddetta cifra mostra il consumo energetico annuale stimato in TWh/anno per vari settori (aggiornata a giugno 2022). _Nota che le stime presentate nel grafico provengono da fonti disponibili pubblicamente, delle quali si riporta il link nel testo di seguito. Sono illustrative e non rappresentano una stima, promessa o previsione ufficiale._

Per contestualizzare il consumo energetico di Ethereum, possiamo confrontare le stime annualizzate per altri settori. Se consideriamo Ethereum una piattaforma per mantenere in modo sicuro gli asset digitali come investimenti, forse possiamo compararla all'estrazione dell'oro, che si stima consumi circa [240 TWh/anno](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html). Come piattaforma di pagamenti digitali, potremmo forse compararla a PayPal (che si stima consumi circa [0,26 TWh/anno](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)). Come piattaforma di intrattenimento, potremmo forse compararla all'industria videoludica, che si stima consumi circa [34 TW/anno](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) _nei soli Stati Uniti_. Le stime del consumo energetico di Netflix oscillano drasticamente tra [circa 0,45TWhr/anno](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf) (come da sua stima del 2019) fino a circa 94 TWh/anno (come stimato da [Shift Project](https://theshiftproject.org/en/article/unsustainable-use-online-video/)); esistono delle discussioni sulle ipotesi sottostanti tali stime, disponibili su [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Altrimenti, Ethereum potrebbe essere comparata a YouTube, che si stima consumi circa [244 TWh/anno](https://thefactsource.com/how-much-electricity-does-youtube-use/), sebbene questi valori dipendano molto dal tipo di dispositivo su cui sono trasmessi i video e dall'efficienza energetica dell'infrastruttura sottostante, come i centri di dati. Le stime del consumo energetico di YouTube sono state ripartite per canali e singoli video. [Queste stime](https://thefactsource.com/how-much-electricity-does-youtube-use/) lasciano intendere che le persone che hanno guardato Gangnam Style nel 2019 hanno consumato 45 volte più energia di quella utilizzata dal proof-of-stake di Ethereum in un anno.

## Un livello d'applicazione ecologico {#green-applications}

Mentre il consumo energetico di Ethereum è molto ridotto, vi è anche una community sostanziale, in crescita e altamente attiva di **finanza rigenerativa (ReFi)** che sta nascendo su Ethereum. Le applicazioni ReFi usano i componenti della DeFi per creare applicazioni finanziarie aventi esternalità positive a beneficio dell'ambiente. La ReFi è parte di un più ampio movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk), strettamente allineato con Ethereum e che mira ad accoppiare l'avanzamento tecnologico alla gestione ambientale. La natura decentralizzata, senza permessi e componibile di Ethereum lo rende il livello di base ideale per la ReFi e le community solarpunk. Tramite il loro sviluppo (e altri, es. [DeSci](/desci/)), Ethereum sta diventando una tecnologia positiva in termini ambientali e sociali.

## Il debito carbonico di Ethereum {#carbon-debt}

Il consumo energetico corrente di Ethereum è molto ridotto, ma non è sempre stato così. Ethereum è passato al suo meccanismo di consenso di proof-of-stake nel 3° trimestre del 2022. Tuttavia, dal 2014 al 2022 Ethereum ha usato un meccanismo di proof-of-work, che ha avuto un costo ambientale molto maggiore.

Dalle sue origini, Ethereum ha mirato a implementare un meccanismo di consenso di proof-of-stake, ma farlo senza sacrificare la sicurezza e la decentralizzazione ha richiesto anni di ricerca e sviluppo mirati. Dunque, per avviare la rete è stato usato un meccanismo di proof-of-work. Il consenso di proof-of-work richiede ai miner di usare il proprio hardware per risolvere un rompicapo, consumando energia nel processo. La soluzione al rompicapo prova che l'energia è stata realmente utilizzata dal miner, dimostrando che ha investito valore del mondo reale per il diritto ad aggiungere elementi alla blockchain. Il consumo energetico totale di Ethereum ha raggiunto un picco durante l'apice del mercato rialzista delle criptovalute a febbraio 2022 a poco meno di 94 TWh/anno. Nell'estate precedente al passaggio al proof-of-stake, il consumo energetico era più vicino ai 60 TWh/anno, comparabile a quello dell'Uzbekistan, con un'emissione carbonica equivalente a quella dell'Azerbaijan (33 MT/anno).

Il [CCRI](https://carbon-ratings.com) ha esaminato l'impatto della fusione di Ethereum dal proof-of-work al proof-of-stake; i risultati hanno sottolineato il significativo impatto del cambiamento del protocollo di consenso: il consumo di elettricità annualizzato è stato ridotto da 22.900.320 MWh a 2.601 MWh e, dunque, di oltre il **99,988%**. Similmente, l'impronta carbonica di Ethereum è stata ridotta approssimativamente del **99,992%** (da 11.016.000 a 870 tonnellate di CO2e). Rappresentato metaforicamente, ciò corrisponde a una riduzione delle emissioni dall'altezza della Torre Eiffel a un piccolo giocattolo di plastica, come mostrato nella figura sottostante.

![Confronto del consumo energetico di Ethereum prima e dopo La Fusione. Sulla sinistra è mostrata la Torre Eiffel, alta 330 metri, e sulla destra un giocattolo di plastica, alto 4 cm, sotto una lente d'ingrandimento.](energy_consumption_pre_post_merge.png)

Sia il proof-of-work che il proof-of-stake sono semplicemente meccanismi per decidere chi aggiungerà il prossimo blocco. Passare dal proof-of-work al proof-of-stake, in cui il valore reale investito proviene dagli ETH in staking direttamente in un contratto intelligente, rimuove la necessità per i miner di consumare energia per aggiungere alla blockchain. Dunque, il costo ambientale per proteggere la rete è ridotto drasticamente.

## Perché il proof-of-stake è più ecologico del proof-of-work? {#why-pos-is-greener-than-pow}

Il proof-of-work è un metodo forte per proteggere la rete. Le transazioni sulla blockchain di Ethereum sotto il precedente sistema di proof-of-work erano validate dai [miner](/developers/docs/consensus-mechanisms/pow/mining). I miner raggruppavano le transazioni in blocchi ordinati e li aggiungevano alla blockchain di Ethereum. I nuovi blocchi venivano trasmessi a tutti gli altri operatori del nodo che eseguivano le transazioni in modo indipendente e verificavano che fossero valide. Qualsiasi azione disonesta si presentava come un'incongruenza tra i diversi nodi. I blocchi onesti erano aggiunti alla blockchain e diventavano una parte immutabile dello storico. La capacità di ogni miner di aggiungere nuovi blocchi funziona solo se c'è un costo associato al mining e vi è imprevedibilità su quale nodo specifico invii il blocco successivo. Tali condizioni sono soddisfatte imponendo il proof-of-work. Per esser idoneo a inviare un blocco di transazioni, un miner deve prima inviare la soluzione di un rompicapo computazionalmente dispendioso. Per assumere correttamente il controllo della blockchain, un miner disonesto avrebbe dovuto vincere coerentemente la gara del proof-of-work investendo in hardware ed energia sufficienti a superare le prestazioni di gran parte degli altri miner.

Questo meccanismo di protezione della rete è problematico per diversi motivi. Prima di tutto, i miner avrebbero aumentato le proprie possibilità di successo investendo in hardware più potenti, creando le condizioni per una corsa alle armi, coi miner che acquistavano equipaggiamenti di mining sempre più energivori. Questo ha aumentato il consumo energetico della rete e ha generato sprechi di hardware. In secondo luogo, il protocollo di proof-of-work di Ethereum (prima della transizione al proof-of-stake) aveva un consumo energetico annualizzato totale approssimativamente pari a quello della Finlandia <sup>[^1]</sup> e un'impronta carbonica simile a quella della Svizzera <sup>[^1]</sup>.

Il proof-of-stake usa i validatori invece dei miner. I validatori ricoprono la stessa funzione dei miner, tranne che invece di consumare le proprie risorse come consumo energetico, mettono ETH in staking come garanzia contro i comportamenti disonesti. Questi ETH in staking possono essere distrutti se il validatore si comporta male, con sanzioni più severe per le azioni più nefaste. Ciò incentiva fortemente la partecipazione attiva e onesta nel proteggere la rete senza richiedere grandi consumi energetici. Poiché quasi tutta l'energia consumata proteggendo la rete di proof-of-work proveniva dall'algoritmo di mining, il passaggio al proof-of-stake ha ridotto drasticamente i consumi energetici. Inoltre, non vi è alcun beneficio nell'investire in hardware più potente sotto il proof-of-stake, quindi non esiste alcuna condizione di corsa alle armi e vi è un ridotto spreco elettronico. I validatori di Ethereum possono operare sui tipici laptop o dispositivi a basso consumo, come [Raspberry Pi](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

Leggi di più su [come Ethereum implementa il proof-of-stake](/developers/docs/consensus-mechanisms/pos) e com'è paragonato al proof-of-work.

<InfoBanner emoji=":evergreen_tree:">
  Se pensi che queste statistiche siano errate o possano essere rese più accurate, ti invitiamo a segnalarlo o inviare una "Pull Request". Queste sono stime del team di ethereum.org fatte usando informazioni pubblicamente accessibili e l'attuale tabella di marcia di Ethereum. Queste dichiarazioni non rappresentano una promessa ufficiale della Fondazione Ethereum. 
</InfoBanner>

## Ulteriori letture {#further-reading}

- [L'energia necessaria a un paese; non più](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 maggio 2021_
- [Consumo energetico di Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Emissioni di Ethereum: Una Stima Completa](https://kylemcdonald.github.io/ethereum-emissions/) _Kyle McDonald_
- [Indice del Consumo Energetico di Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/)—_[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusione - Implicazioni sul consumo elettrico e sull'impronta carbonica della rete Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_

## Argomenti correlati {#related-topics}

- [Visione di Ethereum](/roadmap/vision/)
- [La Beacon Chain](/upgrades/beacon-chain)
- [La Fusione](/upgrades/merge/)
- [Frammentazione](/upgrades/beacon-chain/)
