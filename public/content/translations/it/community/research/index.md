---
title: Aree attive della ricerca su Ethereum
description: Esplora diverse aree di ricerca aperta e scopri come partecipare.
lang: it
---

# Aree attive della ricerca su Ethereum {#active-areas-of-ethereum-research}

Uno dei principali punti di forza di Ethereum è che una comunità attiva di ricerca e ingegneria lo migliora costantemente. Molte persone entusiaste e competenti in tutto il mondo vorrebbero applicarsi alle questioni in sospeso di Ethereum, ma non è sempre facile scoprire quali siano. Questa pagina delinea le principali aree di ricerca attive come guida approssimativa all'avanguardia di Ethereum.

## Come funziona la ricerca su Ethereum {#how-ethereum-research-works}

La ricerca su Ethereum è aperta e trasparente, incarnando i principi della [Scienza Decentralizzata (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). La cultura è quella di rendere gli strumenti e i risultati della ricerca il più aperti e interattivi possibile, ad esempio attraverso notebook eseguibili. La ricerca su Ethereum si muove rapidamente, con nuove scoperte pubblicate e discusse apertamente su forum come [ethresear.ch](https://ethresear.ch/) piuttosto che raggiungere la comunità attraverso pubblicazioni tradizionali dopo cicli di revisione paritaria.

## Risorse generali di ricerca {#general-research-resources}

Indipendentemente dall'argomento specifico, c'è una ricchezza di informazioni sulla ricerca su Ethereum che si possono trovare su [ethresear.ch](https://ethresear.ch) e sul [canale Discord Eth R&D](https://discord.gg/qGpsxSA). Questi sono i luoghi principali in cui i ricercatori di Ethereum discutono le ultime idee e opportunità di sviluppo.

Questo rapporto pubblicato a maggio 2022 da [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) fornisce una buona panoramica del piano d'azione di Ethereum.

## Fonti di finanziamento {#sources-of-funding}

Puoi partecipare alla ricerca su Ethereum ed essere pagato per farlo! Ad esempio, [la Ethereum Foundation](/foundation/) ha recentemente gestito un [round di finanziamento per sovvenzioni accademiche](https://esp.ethereum.foundation/academic-grants). Puoi trovare informazioni sulle opportunità di finanziamento attive e imminenti sulla [pagina delle sovvenzioni di Ethereum](/community/grants/).

## Ricerca sul protocollo {#protocol-research}

La ricerca sul protocollo riguarda il livello di base di Ethereum: l'insieme di regole che definiscono come i nodi si connettono, comunicano, scambiano e archiviano i dati di Ethereum e raggiungono il consenso sullo stato della blockchain. La ricerca sul protocollo è divisa in due categorie principali: consenso ed esecuzione.

### Consenso {#consensus}

La ricerca sul consenso riguarda il [meccanismo di prova di stake di Ethereum](/developers/docs/consensus-mechanisms/pos/). Alcuni esempi di argomenti di ricerca sul consenso sono:

- identificare e correggere le vulnerabilità;
- quantificare la sicurezza crittoeconomica;
- aumentare la sicurezza o le prestazioni delle implementazioni dei client;
- e sviluppare client leggeri.

Oltre alla ricerca lungimirante, si stanno studiando alcune riprogettazioni fondamentali del protocollo, come la finalità a singolo slot, per consentire miglioramenti significativi a Ethereum. Inoltre, l'efficienza, la sicurezza e il monitoraggio della rete peer-to-peer tra i client di consenso sono anch'essi importanti argomenti di ricerca.

#### Letture di base {#background-reading}

- [Introduzione alla prova di stake](/developers/docs/consensus-mechanisms/pos/)
- [Documento su Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Spiegazione di Casper-FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Documento su Gasper](https://arxiv.org/abs/2003.03052)

#### Ricerca recente {#recent-research}

- [Consenso su Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilemma Disponibilità/Finalità](https://arxiv.org/abs/2009.04987)
- [Finalità a singolo slot](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separazione tra proponente e costruttore](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Esecuzione {#execution}

Il livello di esecuzione si occupa di eseguire le transazioni, far funzionare la [macchina virtuale di Ethereum (EVM)](/developers/docs/evm/) e generare i payload di esecuzione da passare al livello di consenso. Ci sono molte aree di ricerca attive, tra cui:

- sviluppare il supporto per i client leggeri;
- ricercare i limiti del gas;
- e incorporare nuove strutture dati (ad es., i Verkle Tries).

#### Letture di base {#background-reading-1}

- [Introduzione all'EVM](/developers/docs/evm)
- [Livello di esecuzione su Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Ricerca recente {#recent-research-1}

- [Ottimizzazioni del database](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Scadenza dello stato](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Percorsi verso la scadenza dello stato](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Proposta su Verkle e scadenza dello stato](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gestione della cronologia](https://eips.ethereum.org/EIPS/eip-4444)
- [Alberi di Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Campionamento della disponibilità dei dati](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Sviluppo dei client {#client-development}

I client di Ethereum sono implementazioni del protocollo Ethereum. Lo sviluppo dei client trasforma i risultati della ricerca sul protocollo in realtà integrandoli in questi client. Lo sviluppo dei client include l'aggiornamento delle specifiche dei client e la creazione di implementazioni specifiche.

Un nodo di Ethereum deve eseguire due software:

1. un client di consenso per tenere traccia della testa della blockchain, diffondere i blocchi e gestire la logica di consenso
2. un client di esecuzione per supportare la macchina virtuale di Ethereum ed eseguire transazioni e contratti intelligenti

Consulta la [pagina dei nodi e dei client](/developers/docs/nodes-and-clients/) per maggiori dettagli su nodi e client e per un elenco di tutte le attuali implementazioni dei client. Puoi anche trovare una cronologia di tutti gli aggiornamenti di Ethereum sulla [pagina della cronologia](/ethereum-forks/).

### Client di esecuzione {#execution-clients}

- [Specifiche del client di esecuzione](https://github.com/ethereum/execution-specs)
- [Specifiche dell'API di esecuzione](https://github.com/ethereum/execution-apis)

### Client di consenso {#consensus-clients}

- [Specifiche del client di consenso](https://github.com/ethereum/consensus-specs)
- [Specifiche dell'API della Beacon Chain](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Scalabilità e prestazioni {#scaling-and-performance}

La scalabilità di Ethereum è un'ampia area di interesse per i ricercatori di Ethereum. Gli approcci attuali includono lo scaricamento delle transazioni sui rollup e il renderle il più economiche possibile utilizzando i blob di dati. Informazioni introduttive sulla scalabilità di Ethereum sono disponibili sulla nostra [pagina sulla scalabilità](/developers/docs/scaling).

### Livello 2 {#layer-2}

Esistono ora diversi protocolli di livello 2 che scalano Ethereum utilizzando diverse tecniche per raggruppare le transazioni e proteggerle sul livello 1 di Ethereum. Questo è un argomento in rapida crescita con un grande potenziale di ricerca e sviluppo.

#### Letture di base {#background-reading-2}

- [Introduzione al livello 2](/layer-2/)
- [Polynya: Rollup, DA e catene modulari](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Ricerca recente {#recent-research-2}

- [Ordinamento equo di Arbitrum per i sequenziatori](https://eprint.iacr.org/2021/1465)
- [Livello 2 su Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Piano d'azione incentrato sui rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Ponti {#bridges}

Un'area particolare del livello 2 che richiede maggiore ricerca e sviluppo è quella dei ponti sicuri e performanti. Ciò include i ponti tra vari livelli 2 e i ponti tra il livello 1 e il livello 2. Questa è un'area di ricerca particolarmente importante perché i ponti sono comunemente presi di mira dagli hacker.

#### Letture di base {#background-reading-3}

- [Introduzione ai ponti blockchain](/bridges/)
- [Vitalik sui ponti](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Articolo sui ponti blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valore bloccato nei ponti](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Ricerca recente {#recent-research-3}

- [Convalida dei ponti](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Frammentazione {#sharding}

La frammentazione della blockchain di Ethereum è stata a lungo parte del piano d'azione di sviluppo. Tuttavia, nuove soluzioni di scalabilità come il "Danksharding" stanno attualmente assumendo un ruolo centrale.

Il precursore del Danksharding completo, noto come Proto-Danksharding, è stato lanciato con l'aggiornamento della rete Cancun-Deneb ("Dencun").

[Maggiori informazioni sull'aggiornamento Dencun](/roadmap/dencun/)

#### Letture di base {#background-reading-4}

- [Note sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video di Bankless sul Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Compendio della ricerca sulla frammentazione di Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Ricerca recente {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sulla frammentazione e il campionamento della disponibilità dei dati](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Eseguire nodi](/developers/docs/nodes-and-clients/run-a-node/) su hardware modesto è fondamentale per mantenere Ethereum decentralizzato. Pertanto, la ricerca attiva per ridurre al minimo i requisiti hardware per eseguire i nodi è un'importante area di ricerca.

#### Letture di base {#background-reading-5}

- [Ethereum su ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Ricerca recente {#recent-research-5}

- [ecdsa su FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sicurezza {#security}

La sicurezza è un argomento ampio che potrebbe includere la prevenzione di spam/truffe, la sicurezza dei portafogli, la sicurezza hardware, la sicurezza crittoeconomica, la ricerca di bug e il test di applicazioni e software client, nonché la gestione delle chiavi. Contribuire alla conoscenza in queste aree aiuterà a stimolare l'adozione di massa.

### Crittografia e ZKP {#cryptography--zkp}

Le prove a conoscenza-zero (ZKP) e la crittografia sono fondamentali per integrare privacy e sicurezza in Ethereum e nelle sue applicazioni. La conoscenza-zero è uno spazio relativamente giovane ma in rapida evoluzione con molte opportunità aperte di ricerca e sviluppo. Alcune possibilità includono lo sviluppo di implementazioni più efficienti dell'[algoritmo di hashing Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), la ricerca di impegni polinomiali migliori rispetto a quelli attualmente esistenti o la riduzione del costo della generazione di chiavi pubbliche ecdsa e dei circuiti di verifica delle firme.

#### Letture di base {#background-reading-6}

- [Blog di 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Ricerca recente {#recent-research-6}

- [Recenti progressi nella crittografia a curva ellittica](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK su Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Portafogli {#wallets}

I portafogli di Ethereum possono essere estensioni del browser, app desktop e mobili o contratti intelligenti su Ethereum. C'è una ricerca attiva sui portafogli a recupero sociale che riducono alcuni dei rischi associati alla gestione delle chiavi da parte del singolo utente. Associata allo sviluppo dei portafogli c'è la ricerca su forme alternative di astrazione dell'account, che è un'importante area di ricerca nascente.

#### Letture di base {#background-reading-7}

- [Introduzione ai portafogli](/wallets/)
- [Introduzione alla sicurezza dei portafogli](/security/)
- [Sicurezza su Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938 Astrazione dell'account](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Astrazione dell'account](https://eips.ethereum.org/EIPS/eip-4337)

#### Ricerca recente {#recent-research-7}

- [Portafogli di contratti intelligenti incentrati sulla convalida](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Il futuro degli account](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 Opcode AUTH e AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Pubblicazione di codice a un indirizzo EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Comunità, istruzione e divulgazione {#community-education-and-outreach}

L'inserimento di nuovi utenti su Ethereum richiede nuove risorse educative e approcci alla divulgazione. Ciò potrebbe includere post di blog e articoli, libri, podcast, meme, risorse didattiche, eventi e qualsiasi altra cosa che costruisca comunità, accolga i nuovi arrivati ed educhi le persone su Ethereum.

### UX/UI {#uxui}

Per inserire più persone su Ethereum, l'ecosistema deve migliorare l'UX/UI. Ciò richiederà a designer ed esperti di prodotto di riesaminare il design di portafogli e app.

#### Letture di base {#background-reading-8}

- [UX/UI su Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Ricerca recente {#recent-research-8}

- [Discord sul Web3 Design](https://discord.gg/FsCFPMTSm9)
- [Principi di Web3 Design](https://www.web3designprinciples.com/)
- [Discussione sull'UX di Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Economia {#economics}

La ricerca economica in Ethereum segue in generale due approcci: convalidare la sicurezza dei meccanismi basati su incentivi economici ("microeconomia") e analizzare i flussi di valore tra protocolli, applicazioni e utenti ("macroeconomia"). Ci sono complessi fattori crittoeconomici relativi all'asset nativo di Ethereum (ether) e ai token costruiti su di esso (ad esempio NFT e token ERC-20).

#### Letture di base {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Workshop ETHconomics al Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Ricerca recente {#recent-research-9}

- [Analisi empirica dell'EIP-1559](https://arxiv.org/abs/2201.05574)
- [Equilibrio dell'offerta circolante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantificare il MEV: Quanto è oscura la foresta?](https://arxiv.org/abs/2101.05511)

### Spazio dei blocchi e mercati delle commissioni {#blockspace-fee-markets}

I mercati dello spazio dei blocchi governano l'inclusione delle transazioni degli utenti finali, direttamente su Ethereum (Livello 1) o su reti collegate tramite ponti, ad es. i rollup (Livello 2). Su Ethereum, le transazioni vengono inviate al mercato delle commissioni implementato nel protocollo come EIP-1559, proteggendo la catena dallo spam e prezzando la congestione. Su entrambi i livelli, le transazioni possono produrre esternalità, note come Valore Massimo Estraibile (MEV), che inducono nuove strutture di mercato per catturare o gestire queste esternalità.

#### Letture di base {#background-reading-10}

- [Progettazione del meccanismo delle commissioni di transazione per la blockchain di Ethereum: Un'analisi economica dell'EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulazioni dell'EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Economia dei rollup dai principi primi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, riordino delle transazioni e instabilità del consenso negli exchange decentralizzati](https://arxiv.org/abs/1904.05234)

#### Ricerca recente {#recent-research-10}

- [Presentazione video sull'EIP-1559 multidimensionale](https://youtu.be/QbR4MTgnCko)
- [MEV tra domini](http://arxiv.org/abs/2112.01472)
- [Aste MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incentivi della prova di stake {#proof-of-stake-incentives}

I validatori utilizzano l'asset nativo di Ethereum (ether) come garanzia contro comportamenti disonesti. La crittoeconomia di questo determina la sicurezza della rete. Validatori sofisticati potrebbero essere in grado di sfruttare le sfumature del livello degli incentivi per lanciare attacchi espliciti.

#### Letture di base {#background-reading-11}

- [Masterclass sull'economia di Ethereum e modello economico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulazioni degli incentivi PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Ricerca recente {#recent-research-11}

- [Aumentare la resistenza alla censura delle transazioni con la separazione tra proponente e costruttore (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tre attacchi alla PoS di Ethereum](https://arxiv.org/abs/2110.10086)

### Staking liquido e derivati {#liquid-staking-and-derivatives}

Lo staking liquido consente agli utenti con meno di 32 ETH di ricevere rendimenti di staking scambiando ether con un token che rappresenta l'ether in staking e che può essere utilizzato nella DeFi. Tuttavia, gli incentivi e le dinamiche di mercato associati allo staking liquido sono ancora in fase di scoperta, così come il suo effetto sulla sicurezza di Ethereum (ad es., i rischi di centralizzazione).

#### Letture di base {#background-reading-12}

- [Staking liquido su Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: La strada verso lo staking di Ethereum senza fiducia (trustless)](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Introduzione al protocollo di staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Ricerca recente {#recent-research-12}

- [Gestione dei prelievi da Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Credenziali di prelievo](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [I rischi dei derivati di staking liquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Test {#testing}

### Verifica formale {#formal-verification}

La verifica formale consiste nello scrivere codice per verificare che le specifiche di consenso di Ethereum siano corrette e prive di bug. Esiste una versione eseguibile delle specifiche scritta in Python che richiede manutenzione e sviluppo. Ulteriori ricerche possono aiutare a migliorare l'implementazione in Python delle specifiche e ad aggiungere strumenti in grado di verificare in modo più robusto la correttezza e identificare i problemi.

#### Letture di base {#background-reading-13}

- [Introduzione alla verifica formale](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verifica formale (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Ricerca recente {#recent-research-13}

- [Verifica formale del contratto di deposito](https://github.com/runtimeverification/deposit-contract-verification)
- [Verifica formale delle specifiche della Beacon Chain](https://github.com/runtimeverification/deposit-contract-verification)

## Scienza dei dati e analisi {#data-science-and-analytics}

C'è bisogno di più strumenti di analisi dei dati e dashboard che forniscano informazioni dettagliate sull'attività su Ethereum e sulla salute della rete.

### Letture di base {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dashboard sulla diversità dei client](https://clientdiversity.org/)

#### Ricerca recente {#recent-research-14}

- [Analisi dei dati del Robust Incentives Group](https://rig.ethereum.org/)

## App e strumenti {#apps-and-tooling}

Il livello dell'applicazione supporta un ecosistema diversificato di programmi che regolano le transazioni sul livello di base di Ethereum. I team di sviluppo trovano costantemente nuovi modi per sfruttare Ethereum per creare versioni componibili, senza permessi e resistenti alla censura di importanti app Web2 o creare concetti nativi Web3 completamente nuovi. Allo stesso tempo, vengono sviluppati nuovi strumenti che rendono meno complessa la creazione di dApp su Ethereum.

### DeFi {#defi}

La finanza decentralizzata (DeFi) è una delle principali classi di applicazioni costruite su Ethereum. La DeFi mira a creare "lego monetari" componibili che consentano agli utenti di archiviare, trasferire, prestare, prendere in prestito e investire cripto-asset utilizzando contratti intelligenti. La DeFi è uno spazio in rapida evoluzione che si aggiorna costantemente. È continuamente necessaria la ricerca su protocolli sicuri, efficienti e accessibili.

#### Letture di base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Cos'è la DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Ricerca recente {#recent-research-15}

- [Finanza decentralizzata, proprietà centralizzata?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: La strada verso transazioni sotto il dollaro](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Un caso d'uso di grande impatto per Ethereum è la capacità di organizzarsi in modo decentralizzato attraverso l'uso delle DAO. C'è molta ricerca attiva su come le DAO su Ethereum possano essere sviluppate e utilizzate per eseguire forme migliorate di governance, come strumento di coordinamento a fiducia ridotta al minimo, espandendo notevolmente le opzioni delle persone oltre le aziende e le organizzazioni tradizionali.

#### Letture di base {#background-reading-16}

- [Introduzione alle DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Ricerca recente {#recent-research-16}

- [Mappatura dell'ecosistema delle DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Strumenti per sviluppatori {#developer-tools}

Gli strumenti per gli sviluppatori di Ethereum stanno migliorando rapidamente. C'è molta ricerca e sviluppo attivi da fare in quest'area generale.

#### Letture di base {#background-reading-17}

- [Strumenti per linguaggio di programmazione](/developers/docs/programming-languages/)
- [Framework per sviluppatori](/developers/docs/frameworks/)
- [Elenco degli strumenti per sviluppatori di consenso](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standard dei token](/developers/docs/standards/tokens/)
- [CryptoDevHub: Strumenti EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Ricerca recente {#recent-research-17}

- [Canale Discord Eth R&D sugli strumenti di consenso](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracoli {#oracles}

Gli oracoli importano dati fuori catena sulla blockchain in modo decentralizzato e senza permessi. Portare questi dati on-chain consente alle dApp di essere reattive a fenomeni del mondo reale come le fluttuazioni dei prezzi negli asset del mondo reale, eventi in app fuori catena o persino cambiamenti meteorologici.

#### Letture di base {#background-reading-18}

- [Introduzione agli oracoli](/developers/docs/oracles/)

#### Ricerca recente {#recent-research-18}

- [Sondaggio sugli oracoli blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [White paper di Chainlink](https://chain.link/whitepaper)

### Sicurezza delle app {#app-security}

Gli attacchi informatici su Ethereum generalmente sfruttano le vulnerabilità nelle singole applicazioni piuttosto che nel protocollo stesso. Hacker e sviluppatori di app sono bloccati in una corsa agli armamenti per sviluppare nuovi attacchi e difese. Ciò significa che è sempre necessaria un'importante ricerca e sviluppo per mantenere le app al sicuro dagli attacchi.

#### Letture di base {#background-reading-19}

- [Rapporto sull'exploit di Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Elenco delle analisi post-mortem degli attacchi ai contratti di Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Ricerca recente {#recent-research-19}

- [Applicazioni su Ethresear.ch](https://ethresear.ch/c/applications/18)

### Stack tecnologico {#technology-stack}

Decentralizzare l'intero stack tecnologico di Ethereum è un'importante area di ricerca. Attualmente, le dApp su Ethereum hanno comunemente alcuni punti di centralizzazione perché si basano su strumenti o infrastrutture centralizzate.

#### Letture di base {#background-reading-20}

- [Stack di Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Introduzione allo stack Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introduzione ai contratti intelligenti](/developers/docs/smart-contracts/)
- [Introduzione all'archiviazione decentralizzata](/developers/docs/storage/)

#### Ricerca recente {#recent-research-20}

- [Componibilità dei contratti intelligenti](/developers/docs/smart-contracts/composability/)