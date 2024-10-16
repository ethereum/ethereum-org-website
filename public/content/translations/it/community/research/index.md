---
title: Aree attive di ricerca su Ethereum
description: Esplora le diverse aree della ricerca aperta e scopri come partecipare.
lang: it
---

# Aree attive della ricerca su Ethereum {#active-areas-of-ethereum-research}

Uno dei principali punti di forza di Ethereum è che è costantemente migliorata da una community attiva di ricerca e di ingegneria. Molte persone entusiaste e competenti in tutto il mondo vorrebbero dedicarsi alle questioni in sospeso di Ethereum, ma non sempre è facile scoprire quali siano queste questioni. Questa pagina illustra le principali aree di ricerca attive come guida approssimativa all'avanguardia di Ethereum.

## Come funziona la ricerca su Ethereum {#how-ethereum-research-works}

La ricerca su Ethereum è aperta e trasparente e incarna i principi della [Scienza Decentralizzata (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). La cultura è quella di rendere gli strumenti e i risultati della ricerca il più possibile aperti e interattivi, ad esempio attraverso i notebook eseguibili. La ricerca su Ethereum si muove rapidamente, con le nuove scoperte pubblicate e discusse apertamente su forum come [ethresear.ch](https://ethresear.ch/) anziché raggiungere la comunità attraverso pubblicazioni tradizionali dopo cicli di revisione tra pari.

## Risorse generali per la ricerca {#general-research-resources}

Indipendentemente dall'argomento specifico, numerose informazioni sulla ricerca su Ethereum sono disponibili su [ethresear.ch](https://ethresear.ch) e sul [canale Discord Eth R&D](https://discord.gg/qGpsxSA). Questi sono i luoghi principali in cui i ricercatori di Ethereum discutono le idee e le opportunità di sviluppo più recenti.

Questa relazione pubblicata nel maggio 2022 da [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) fornisce una buona panoramica della tabella di marcia di Ethereum.

## Fonti di finanziamento {#sources-of-funding}

Puoi partecipare alla ricerca su Ethereum ed essere pagata/o per questo! Ad esempio, [la Ethereum Foundation](/foundation/) ha recentemente condotto un [round di finanziamento di sovvenzioni accademiche](https://esp.ethereum.foundation/academic-grants). Puoi trovare informazioni sulle varie opportunità di finanziamento attive e future alla [pagina delle sovvenzioni di Ethereum](/community/grants/).

## Ricerca sul protocollo {#protocol-research}

La ricerca sul protocollo riguarda il livello di base di Ethereum, ovvero l'insieme di regole che definiscono come i nodi si connettono, comunicano, scambiano e memorizzano i dati di Ethereum e raggiungono il consenso sullo stato della blockchain. La ricerca sul protocollo si divide in due categorie di livello superiore: consenso ed esecuzione.

### Consenso {#consensus}

La ricerca sul consenso riguarda il [meccanismo del proof-of-stake di Ethereum](/developers/docs/consensus-mechanisms/pos/). Alcuni esempi di argomenti di ricerca sul consenso sono:

- identificare e correggere le vulnerabilità;
- quantificare la sicurezza criptoeconomica;
- aumentare la sicurezza o le prestazioni delle implementazioni del client;
- e lo sviluppo di client leggeri.

Oltre alla ricerca prospettica, si stanno studiando alcune riprogettazioni fondamentali del protocollo, come la finalità del singolo slot, per consentire miglioramenti significativi a Ethereum. Inoltre, l'efficienza, la sicurezza e il monitoraggio del networking peer-to-peer tra client di consenso sono altri importanti temi di ricerca.

#### Letture di base {#background-reading}

- [Introduzione al proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Documento Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Spiegazione di Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Documento Gasper](https://arxiv.org/abs/2003.03052)

#### Ricerca recente {#recent-research}

- [Consenso su Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dlemma disponibilità/finalità](https://arxiv.org/abs/2009.04987)
- [Finalità del singolo slot](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separazione propositore-costruttore](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Esecuzione {#execution}

Il livello di esecuzione riguarda l'esecuzione delle transazioni, l'esecuzione della [macchina virtuale di Ethereum (EVM)](/developers/docs/evm/) e la generazione dei carichi utili di esecuzione da passare al livello di consenso. Ci sono molte aree di ricerca attive, tra cui:

- costruzione del supporto per client leggeri;
- ricerca dei limiti di gas;
- e l'incorporazione di nuove strutture di dati (ad es. alberi di Verkle).

#### Letture di base {#background-reading-1}

- [Introduzione alla EVM](/developers/docs/evm)
- [Livello di esecuzione su Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Ricerca recente {#recent-research-1}

- [Ottimizzazioni di database](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Scadenza dello stato](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Percorsi verso la scadenza dello stato](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle e proposta di scadenza dello stato](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gestione dello storico](https://eips.ethereum.org/EIPS/eip-4444)
- [Alberi di Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Campionamento della disponibilità dei dati](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Sviluppo del client {#client-development}

I client di Ethereum sono implementazioni del protocollo di Ethereum. Lo sviluppo del client trasforma i risultati della ricerca sul protocollo in realtà incorporandoli in questi client. Lo sviluppo del client include l'aggiornamento delle specifiche del client così come la creazione di specifiche implementazioni.

È necessario un nodo di Ethereum per eseguire due pezzi di software:

1. un client di consenso per tenere traccia della testa della blochchain, dei blocchi di gossip e per gestire la logica di consenso
2. un client di esecuzione per supportare la macchina virtuale di Ethereum ed eseguire le transazioni e i contratti intelligenti

Consulta la [pagina dei nodi e dei client](/developers/docs/nodes-and-clients/) per maggiori dettagli su nodi e client e per un elenco di tutte le implementazioni di client correnti. Puoi anche trovare una cronologia di tutti gli aggiornamenti di Ethereum nella [pagina della cronologia](/history/).

### Client di esecuzione {#execution-clients}

- [Specifiche del client di esecuzione](https://github.com/ethereum/execution-specs)
- [Specifiche dell'API di esecuzione](https://github.com/ethereum/execution-apis)

### Client di consenso {#consensus-clients}

- [Specifiche del client di consenso](https://github.com/ethereum/consensus-specs)
- [Specifiche dell'API Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Ridimensionamento e prestazioni {#scaling-and-performance}

Il ridimensionamento di Ethereum è una grande area di interesse per i ricercatori Ethereum. Gli attuali approcci prevedono di scaricare le transazioni nei rollup e di renderle il più economiche possibile usando i blob di dati. Informazioni introduttive sul ridimensionamento di Ethereum sono disponibili alla nostra [pagina sul ridimensionamento](/developers/docs/scaling).

### Livello 2 {#layer-2}

Attualmente esistono diversi protocolli di Livello 2 che ridimensionano Ethereum utilizzando tecniche diverse per l'esecuzione in lotto delle transazioni e per fissarle sul Livello 1 di Ethereum. Si tratta di un argomento in rapida crescita con un grande potenziale di ricerca e sviluppo.

#### Letture di base {#background-reading-2}

- [Introduzione al livello 2](/layer-2/)
- [Polynya: Rollup, DA e catene modulari](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Ricerca recente {#recent-research-2}

- [Ordinamento equo di Arbitrum per i sequenziatori](https://eprint.iacr.org/2021/1465)
- [Livello 2 su ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Tabella di marcia incentrata sui rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Ponti {#bridges}

Una particolare area di Livello 2 che richiede maggior ricerca e sviluppo è quella dei ponti sicuri e performanti. Questa include i ponti tra diversi Livelli 2 e ponti tra Livello 1 e Livello 2. Si tratta di un'area di ricerca particolarmente importante perché i ponti sono comunemente presi di mira dagli hacker.

#### Letture di base {#background-reading-3}

- [Introduzione ai ponti della blockchain](/bridges/)
- [Vitalik sui ponti](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Articolo sui ponti della blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valore bloccato nei ponti](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Ricerca recente {#recent-research-3}

- [Validazion di ponti](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Frammentazione {#sharding}

La frammentazione (sharding) della blockchain di Ethereum fa parte della tabella di marcia del suo sviluppo da lungo tempo. Tuttavia, nuove soluzioni di ridimensionamento come il "Danksharding" sono attualmente al centro della discussione.

Il precursore del Danksharding completo è noto come Proto-Danksharding ed è diventato operativo con l'aggiornamento della rete Cancun-Deneb ("Dencun").

[Ulteriori informazioni sull'aggiornamento Dencun](/roadmap/dencun/)

#### Letture di base {#background-reading-4}

- [Note sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video di Bankless sul Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Compendio di ricerca sullo sharding di Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Ricerca recente {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sulla frammentazione e il campionamento della disponibilità dei dati](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Eseguire nodi](/developers/docs/nodes-and-clients/run-a-node/) su un hardware modesto è fondamentale per mantenere Ethereum decentralizzata. Pertanto, la ricerca attiva sulla minimizzazione dei requisiti hardware per l'esecuzione dei nodi è un'area di ricerca importante.

#### Letture di base {#background-reading-5}

- [Ethereum su ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Ricerca recente {#recent-research-5}

- [ecdsa sui FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sicurezza {#security}

La sicurezza è un argomento ampio che può includere la prevenzione di spam/truffe, la sicurezza dei portafogli, la sicurezza dell'hardware, la sicurezza cripto-economica, la ricerca di bug e il test di applicazioni e software per client e la gestione delle chiavi. Contribuire alla conoscenza in questi ambiti aiuterà a stimolarne l'adozione a livello generale.

### Crittografia & ZKP {#cryptography--zkp}

Le prove di conoscenza zero (ZKP) e la crittografia sono fondamentali per creare privacy e sicurezza in Ethereum e nelle sue applicazioni. La conoscenza zero è uno ambito relativamente giovane ma in rapida evoluzione, con molte opportunità di ricerca e sviluppo aperte. Alcune possibilità includono lo sviluppo di implementazioni più efficienti dell'[algoritmo di hashing Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), la ricerca di impegni polinomiali migliori di quelli attualmente esistenti o la riduzione del costo dei circuiti ECDSA di generazione delle chiavi pubbliche e di verifica delle firme.

#### Letture di base {#background-reading-6}

- [0xparc blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Ricerca recente {#recent-research-6}

- [Progressi recenti nella crittografia a curva ellittica](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK su Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Portafogli {#wallets}

I portafogli di Ethereum possono essere estensioni del browser, applicazioni desktop e mobili o contratti intelligenti su Ethereum. Sono in corso ricerche sui portafogli con recupero sociale che riducono alcuni dei rischi associati alla gestione delle chiavi da parte dei singoli utenti. Allo sviluppo dei portafogli si associa la ricerca di forme alternative di astrazione del conto, un'importante area di ricerca nascente.

#### Letture di base {#background-reading-7}

- [Introduzione ai portafogli elettronici](/wallets/)
- [Introduzione alla sicurezza dei portafogli](/security/)
- [Sicurezza su ethresear.ch](https://ethresear.ch/tag/security)
- [Astrazione del conto EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Astrazione del conto EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)

#### Ricerca recente {#recent-research-7}

- [Portafogli di contratti intelligenti focalizzati sulla validazione](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Il futuro dei conti](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Codici operativi EIP-3074 AUTH e AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Pubblicare codice a un indirizzo EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Community, educazione e partecipazione {#community-education-and-outreach}

Introdurre nuovi utenti a Ethereum richiede nuove risorse didattiche e nuovi approcci alla partecipazione. Ciò potrebbe includere post e articoli di blog, libri, podcast, meme, risorse didattiche, eventi e qualsiasi altra cosa che costruisca comunità, accolga nuovi principianti ed educhi le persone su Ethereum.

### UX/UI {#uxui}

Per coinvolgere più persone in Ethereum, l'ecosistema deve migliorare l'UX/UI (esperienza e interfaccia utente). Ciò richiederà ai progettisti e agli esperti di prodotto di riesaminare il design di portafogli e applicazioni.

#### Letture di base {#background-reading-8}

- [UX/UI su Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Ricerca recente {#recent-research-8}

- [Discord di Web3 Design](https://discord.gg/FsCFPMTSm9)
- [Principi di Web3 Design](https://www.web3designprinciples.com/)
- [Discussione sulla UX di Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Economia {#economics}

La ricerca economica in Ethereum segue in linea di massima due approcci: convalidare la sicurezza dei meccanismi che si basano su incentivi economici ("microeconomia") e analizzare i flussi di valore tra protocolli, applicazioni e utenti ("macroeconomia"). Esistono complessi fattori cripto-economici relativi alla risorsa nativa di Ethereum (ether) e ai token costruiti su di essa (ad esempio gli NFT e i token ERC20).

#### Letture di base {#background-reading-9}

- [Gruppo d'incentivi robusti](https://ethereum.github.io/rig/)
- [Workshop di ETHconomics a Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Ricerca recente {#recent-research-9}

- [Analisi empirica su EIP1559](https://arxiv.org/abs/2201.05574)
- [Equilibrio della quantità circolante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantificare il MEV: quanto è buia la foresta?](https://arxiv.org/abs/2101.05511)

### Mercati degli spazi di blocco e delle commissioni {#blockspace-fee-markets}

I mercati degli spazi di blocco governano l'inclusione delle transazioni dell'utente finale, sia direttamente su Ethereum (Livello 1) sia su reti collegate da un ponte, ad es. i rollup (Livello 2). Su Ethereum, le transazioni sono inviate al mercato delle commissioni distribuito all'interno del protocollo come EIP-1559, proteggendo la catena dallo spam e dalla congestione dei prezzi. Su entrambi i livelli, le transazioni possono produrre esternalità, note come Valore estraibile massimo (MEV), che inducono la creazione di nuove strutture di mercato per cogliere o gestire tali esternalità.

#### Letture di base {#background-reading-10}

- [Progettazione del meccanismo delle commissioni sulle transazioni per la blockchain di Ethereum: un'analisi economica di EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulazioni di EIP-1559 (Gruppo di incentivi robusti)](https://ethereum.github.io/abm1559)
- [Economia dei rollup dai primi principi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: frontrunning, riordinamento delle transazioni e instabilità del consenso nelle borse decentralizzate] (https://arxiv.org/abs/1904.05234)

#### Ricerca recente {#recent-research-10}

- [Presentazione video di EIP-1559 multidimensionale](https://youtu.be/QbR4MTgnCko)
- [MEV interdominio](http://arxiv.org/abs/2112.01472)
- [Aste di MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incentivi del proof-of-stake {#proof-of-stake-incentives}

I validatori utilizzano la risorsa nativa di Ethereum (ether) come garanzia contro i comportamenti disonesti. La criptoeconomia di questo meccanismo determina la sicurezza della rete. Validatori esperti possono essere in grado di sfruttare le sfumature del livello d'incentivazione per lanciare attacchi espliciti.

#### Letture di base {#background-reading-11}

- [Masterclass sull'economia di Ethereum e modello economico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulazioni di incentivi PoS (Gruppo di incentivi robusti)](https://ethereum.github.io/beaconrunner/)

#### Ricerca recente {#recent-research-11}

- [Aumentare la resistenza alla censura delle transazioni soggette alla separazione propositore/costruttore (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tre attacchi a Ethereum basata su PoS](https://arxiv.org/abs/2110.10086)

### Liquid staking e derivati {#liquid-staking-and-derivatives}

Il liquid staking consente agli utenti con meno di 32 ETH di ricevere i rendimenti dallo staking scambiando ether con un token che rappresenta l'ether in staking e che può essere utilizzato nella DeFi. Tuttavia, gli incentivi e le dinamiche di mercato associate al liquid staking sono ancora in fase di scoperta, così come i suoi effetti sulla sicurezza di Ethereum (ad es. i rischi di centralizzazione).

#### Letture di base {#background-reading-12}

- [Liquid staking su Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: La strada verso lo staking senza fiducia di Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Introduzione al protocollo di staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Ricerca recente {#recent-research-12}

- [Gestione dei prelievi da Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Credenziali di prelievo](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [I rischi dei derivati di liquid staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Test {#testing}

### Verifica formale {#formal-verification}

La verifica formale consiste nello scrivere codice per verificare che le specifiche del consenso di Ethereum siano corrette e prive di bug. Esiste una versione eseguibile della specifica scritta in Python che richiede manutenzione e sviluppo. Ulteriori ricerche possono contribuire a migliorare l'implementazione di Python della specifica e ad aggiungere strumenti in grado di verificare in modo più robusto la correttezza e di identificare i problemi.

#### Letture di base {#background-reading-13}

- [Introduzione alla verifica formale](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verifica formale (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Ricerca recente {#recent-research-13}

- [Verifica formale del contratto di deposito](https://github.com/runtimeverification/deposit-contract-verification)
- [Verifica formale delle specifiche della catena Beacon](https://github.com/runtimeverification/deposit-contract-verification)

## Scienza dei dati e analisi {#data-science-and-analytics}

C'è necessità di un maggior numero di strumenti di analisi dei dati e di pannelli di controllo che forniscano informazioni dettagliate sull'attività di Ethereum e sullo stato di salute della rete.

### Letture di base {#background-reading-14}

- [Analisi di Dune](https://dune.com/browse/dashboards)
- [Pannello di controllo sulla diversità dei client](https://clientdiversity.org/)

#### Ricerca recente {#recent-research-14}

- [Analisi dei dati del gruppo d'incentivi robusti](https://ethereum.github.io/rig/)

## Applicazioni e strumenti {#apps-and-tooling}

Il livello di applicazione supporta un ecosistema eterogeneo di programmi che regolano le transazioni sul livello di base di Ethereum. I team di sviluppo trovano sempre nuovi modi per sfruttare Ethereum per creare versioni componibili, senza permessi e resistenti alla censura di importanti applicazioni Web2 o per creare concetti nativi di Web3 completamente nuovi. Allo stesso tempo, si stanno sviluppando nuovi strumenti che rendono meno complessa la costruzione di dApp su Ethereum.

### DeFi {#defi}

La finanza decentralizzata (DeFi) è una delle principali classi di applicazioni costruite su Ethereum. La DeFi mira a creare "Lego di denaro" componibili che consentano agli utenti di memorizzare, trasferire, prestare, prendere in prestito e investire criptorisorse utilizzando contratti intelligenti. La DeFi è un ambito in rapida evoluzione e in continuo aggiornamento. La ricerca di protocolli sicuri, efficienti e accessibili è costantemente necessaria.

#### Letture di base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Che cos'è la DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Ricerca recente {#recent-research-15}

- [Finanza decentralizzata, proprietà centralizzata?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: La strada verso le transazioni sub-dollaro](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Un caso d'uso di grande impatto per Ethereum è la capacità di organizzarsi in modo decentralizzato attraverso l'uso delle DAO. Ci sono molte ricerche attive su come le DAO su Ethereum possano essere sviluppate e utilizzate per eseguire forme di governance migliorate, come strumento di coordinamento a fiducia minima, ampliando notevolmente le opzioni dei cittadini al di là delle società e delle organizzazioni tradizionali.

#### Letture di base {#background-reading-16}

- [Introduzione alle DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Ricerca recente {#recent-research-16}

- [Mappatura dell'ecosistema DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Strumenti per sviluppatori {#developer-tools}

Gli strumenti per gli sviluppatori di Ethereum stanno rapidamente migliorando. C'è molta ricerca attiva e sviluppo da portare avanti in quest'area generale.

#### Letture di base {#background-reading-17}

- [Strumenti suddivisi per linguaggio di programmazione](/developers/docs/programming-languages/)
- [Framework per sviluppatori](/developers/docs/frameworks/)
- [Elenco degli strumenti per sviluppatori di consenso](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standard dei token](/developers/docs/standards/tokens/)
- [CryptoDevHub: Strumenti EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Ricerca recente {#recent-research-17}

- [Canale Discord degli strumenti di consenso di Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracoli {#oracles}

Gli oracoli importano dati off-chain sulla blockchain in modo decentralizzato e senza permessi. Ottenere questi dati on-chain consente alle dApp di reagire ai fenomeni del mondo reale, come le fluttuazioni dei prezzi delle risorse del mondo reale, gli eventi delle app off-chain o persino i cambiamenti meteorologici.

#### Letture di base {#background-reading-18}

- [Introduzione agli oracoli](/developers/docs/oracles/)

#### Ricerca recente {#recent-research-18}

- [Sondaggio sugli oracoli delle blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [White paper di Chainlink](https://chain.link/whitepaper)

### Sicurezza delle applicazioni {#app-security}

Gli attacchi su Ethereum generalmente sfruttano le vulnerabilità di singole applicazioni piuttosto che del protocollo stesso. Gli hacker e gli sviluppatori di app sono coinvolti in una battaglia per sviluppare nuovi attacchi e nuove difese. Questo significa che è sempre necessaria un'importante attività di ricerca e sviluppo per tenere le app al sicuro dagli hacker.

#### Letture di base {#background-reading-19}

- [Rapporto sull'exploit "wormhole"](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Elenco degli hack post-mortem dei contratti Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Ultime notizie su Rekt](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Ricerca recente {#recent-research-19}

- [Applicazioni su ethresear.ch](https://ethresear.ch/c/applications/18)

### Stack tecnologico {#technology-stack}

La decentralizzazione dell'intero stack tecnologico di Ethereum è un'importante area di ricerca. Attualmente, le dApp su Ethereum comunemente hanno alcuni punti di centralizzazione perché si basano su strumenti o infrastrutture centralizzati.

#### Letture di base {#background-reading-20}

- [Stack di Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Introduzione allo Stack Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introduzione ai contratti intelligenti](/developers/docs/smart-contracts/)
- [Introduzione agli archivi decentralizzati](/developers/docs/storage/)

#### Ricerca recente {#recent-research-20}

- [Componibilità del contratto intelligente](/developers/docs/smart-contracts/composability/)
