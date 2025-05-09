---
title: Aktivní oblasti výzkumu Etherea
description: Prozkoumejte různé oblasti výzkumu a zjistěte, jak se můžete zapojit.
lang: cs
---

# Aktivní oblasti výzkumu Etherea {#active-areas-of-ethereum-research}

Jednou z hlavních silných stránek Etherea je aktivní výzkumná a inženýrská komunita, která neustále pracuje na jeho zlepšování. Mnoho nadšených a schopných lidí po celém světě by se rádo zapojilo do řešení aktuálních problémů Etherea, ale ne vždy je snadné zjistit, jaké problémy to jsou. Tato stránka nastiňuje klíčové oblasti aktivního výzkumu jako přehled aktuálního stavu v oblasti výzkumu Etherea.

## Jak funguje výzkum Etherea {#how-ethereum-research-works}

Výzkum Etherea je otevřený a transparentní, přičemž se řídí principy [Decentralizované vědy (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Vše je navržené tak, aby výzkumné nástroje a výstupy byly co nejvíce otevřené a interaktivní, například prostřednictvím spustitelných notebooků. Výzkum Etherea postupuje rychle, přičemž nové poznatky jsou zveřejňovány a diskutovány otevřeně na fórech, jako je [ethresear.ch](https://ethresear.ch/), spíše než aby se dostávaly ke komunitě prostřednictvím tradičních publikací po několika kolech odborného hodnocení.

## Obecné výzkumné zdroje {#general-research-resources}

Bez ohledu na konkrétní téma existuje na [ethresear.ch](https://ethresear.ch) a kanálu [Eth R&D Discord](https://discord.gg/qGpsxSA) spousta informací o výzkumu Etherea. To jsou hlavní místa, kde výzkumníci Etherea diskutují o nejnovějších nápadech a možnostech vývoje.

Tato zpráva publikovaná v květnu 2022 společností [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) poskytuje dobrý přehled o plánu rozvoje Etherea.

## Zdroje financování {#sources-of-funding}

Každý se může zapojit do výzkumu Etherea a být za to placen! Například [Ethereum Foundation](/foundation/) nedávno uspořádala [financování Akademických grantů](https://esp.ethereum.foundation/academic-grants). Informace o aktivních a nadcházejících možnostech financování najdete na [stránce věnované grantům Etherea](/community/grants/).

## Výzkum protokolů {#protocol-research}

Výzkum protokolů se zabývá základní vrstvou Etherea – souborem pravidel, která definují, jak se uzly připojují, komunikují, vyměňují a ukládají data Etherea a jak dochází ke konsenzu o stavu blockchainu. Výzkum protokolů se dělí na dvě nejvyšší kategorie: konsenzus a provádění.

### Konsenzus {#consensus}

Výzkum konsenzu se zabývá [Ethereum mechanismem „důkaz podílem“](/developers/docs/consensus-mechanisms/pos/). Mezi příklady témat výzkumu konsenzu patří:

- identifikace a oprava zranitelností;
- kvantifikace kryptoekonomické bezpečnosti;
- zvýšení bezpečnosti nebo výkonu klientských implementací;
- a rozvoj jednoduchých klientů.

Kromě výzkumu zaměřeného na budoucnost se zkoumají i některé zásadní změny protokolů, jako je například finalita jednoho slotu, která by umožnila významné vylepšení Etherea. Kromě toho jsou důležitými tématy výzkumu také efektivita, bezpečnost a peer-to-peer monitorování sítí mezi konsenzuálními klienty.

#### Základní podklady {#background-reading}

- [Úvod do důkazu podílem](/developers/docs/consensus-mechanisms/pos/)
- [Práce na Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Vysvětlení Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Práce na Casper](https://arxiv.org/abs/2003.03052)

#### Nedávný výzkum {#recent-research}

- [Ethresear.ch Consensus](https://ethresear.ch/c/consensus/29)
- [Dilema dostupnosti/finality](https://arxiv.org/abs/2009.04987)
- [Finalita jednoho slotu](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separace navrhovatele a stavitele](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Provádění {#execution}

Exekuční vrstva se stará o provádění transakcí, spouštění [virtuálního stroje Etherea (EVM)](/developers/docs/evm/) a generování exekučních payloadů, které se předávají vrstvě konsenzu. Existuje mnoho aktivních oblastí výzkumu, včetně:

- budování podpory jednoduchých klientů;
- zkoumání limitů paliva;
- a začleňování nových datových struktur (např. Verkle Tries).

#### Základní podklady {#background-reading-1}

- [Úvod do EVM](/developers/docs/evm)
- [Exekuční vrstva Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Nedávný výzkum {#recent-research-1}

- [Optimalizace databází](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Expirace stavu](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Cesty k expiraci stavu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Návrh k expiraci Verkle a stavu](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Správa historie](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle stromy](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Vzorkování dostupnosti dat](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Vývoj klientů {#client-development}

Klienti Etherea jsou implementace protokolu Etherea. Vývoj klientů přetváří výsledky výzkumu protokolů v realitu tím, že je zabudovává do těchto klientů. Vývoj klientů zahrnuje aktualizaci specifikací klientů a vytváření konkrétních implementací.

Ethereum uzel vyžaduje spuštění dvou částí softwaru:

1. konsenzuálního klientu, který má přehled o hlavě blockchainu, gossip blocích a zpracovává logiku konsenzu
2. exekučního klientu pro podporu virtuálního stroje Etherea a provádění transakcí a chytrých kontraktů

Další podrobnosti o uzlech a klientech a seznam všech aktuálních implementací klientů najdete na stránce o [uzlech a klientech](/developers/docs/nodes-and-clients/). Historii všech upgradů Etherea najdete také na stránce o [historii](/history/).

### Exekuční klienty {#execution-clients}

- [Specifikace exekučního klientu](https://github.com/ethereum/execution-specs)
- [Specifikace exekučního API](https://github.com/ethereum/execution-apis)

### Konsenzuální klienty {#consensus-clients}

- [Specifikace konsenzuálního klientu](https://github.com/ethereum/consensus-specs)
- [Specifikace Beacon API](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Škálování a výkon {#scaling-and-performance}

Škálování Etherea je velkou oblastí, na kterou se výzkumníci Etherea zaměřují. Současné přístupy zahrnují přenášení transakcí na rollupy a jejich co nejlevnější zpracování pomocí datových blobů. Úvodní informace o škálování Etherea jsou k dispozici na naší stránce o [škálování](/developers/docs/scaling).

### Vrstva 2 {#layer-2}

V současné době existuje několik protokolů vrstvy 2, které škálují Ethereum pomocí různých technik dávkování transakcí a jejich zabezpečení na vrstvě 1 Etherea. Jedná se o velmi rychle se rozvíjející téma s velkým výzkumným a vývojovým potenciálem.

#### Základní podklady {#background-reading-2}

- [Úvod do vrstvy 2](/layer-2/)
- [Polynya: Rollupy, DA a modulární blockchainy](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Nedávný výzkum {#recent-research-2}

- [Arbitrum a spravedlivé řazení pro sekvencery](https://eprint.iacr.org/2021/1465)
- [Vrstva 2 Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Rollup-centrický plán](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Přemostění {#bridges}

Jednou z konkrétních oblastí vrstvy 2, která vyžaduje další výzkum a vývoj, jsou bezpečná a výkonná přemostění. To zahrnuje přemostění mezi různými vrstvami 2 a přemostění mezi vrstvou 1 a vrstvou 2. Jedná se o obzvláště důležitou oblast výzkumu, protože přemostění se běžně stávají cílem útoků hackerů.

#### Základní podklady {#background-reading-3}

- [Úvod do přemostění blockchainů](/bridges/)
- [Vitalik o přemostění](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Článek o přemostění blockchainů](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Hodnota uzamčena v přemostění](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Nedávný výzkum {#recent-research-3}

- [Validování přemostění](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Sharding blockchainu Etherea je již dlouho součástí vývojového plánu. V současné době se však do popředí dostávají nová řešení škálování, jako je například „Danksharding“.

Předchůdce ryzího Dankshardingu, známý jako Proto-Danksharding, byl spuštěn s modernizací sítě Cancún-Deneb („Dencun“).

[Více o modernizaci Dencunu](/roadmap/dencun/)

#### Základní podklady {#background-reading-4}

- [Poznámky o Proto-Dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video na Danksharding od Bankless](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Kompendium výzkumu shardingu Etherea](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Nedávný výzkum {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik o shardingu a vzorkování dostupnosti dat](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Provoz uzlů](/developers/docs/nodes-and-clients/run-a-node/) na skromném hardwaru je základem pro zachování decentralizace Etherea. Důležitou oblastí výzkumu je proto aktivní výzkum minimalizace hardwarových nároků na provoz uzlů.

#### Základní podklady {#background-reading-5}

- [Ethereum na ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Nedávný výzkum {#recent-research-5}

- [ecdsa na FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Bezpečnost {#security}

Bezpečnost je široké téma, které může zahrnovat prevenci spamu/podvodů, bezpečnost peněženek, bezpečnost hardwaru, kryptoekonomickou bezpečnost, vyhledávání chyb a testování aplikací a klientského softwaru a správu klíčů. Přispění ke znalostem v těchto oblastech pomůže podnítit jejich všeobecné přijetí.

### Kryptografie a DNZ {#cryptography--zkp}

Důkazy s nulovými znalostmi (DNZ) a kryptografie mají zásadní význam pro budování soukromí a bezpečnosti na Ethereu a příslušných aplikacích. Nulová znalost je relativně mladá, ale rychle se rozvíjející oblast s mnoha otevřenými možnostmi výzkumu a vývoje. Některé možnosti zahrnují vývoj efektivnějších implementací [Keccak hashing algoritmu](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), nalezení lepších polynomiálních závazků, než jaké v současnosti existují, nebo snížení nákladů na obvody pro generování veřejných ecdsa klíčů a ověřování podpisů.

#### Základní podklady {#background-reading-6}

- [0xparc blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast o Nulové znalosti](https://zeroknowledge.fm/)

#### Nedávný výzkum {#recent-research-6}

- [Nedávný pokrok v kryptografii eliptických křivek](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch NZ](https://ethresear.ch/c/zk-s-nt-arks/13)

### Peněženky {#wallets}

Peněženky Etherea mohou být rozšíření prohlížeče, desktopové a mobilní aplikace nebo chytré kontrakty na Ethereu. Probíhá aktivní výzkum peněženek pro sociální obnovu, které snižují některá rizika spojená se správou klíčů jednotlivých uživatelů. S vývojem peněženek souvisí i výzkum alternativních forem abstrakce účtu, což je důležitá oblast vznikajícího výzkumu.

#### Základní podklady {#background-reading-7}

- [Úvod do peněženek](/wallets/)
- [Úvod do zabezpečení peněženek](/security/)
- [Bezpečnost Ethresear.ch](https://ethresear.ch/tag/security)
- [Abstrakce účtu EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Abstrakce účtu EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)

#### Nedávný výzkum {#recent-research-7}

- [Validace zaměřená na peněženky s chytrými kontrakty](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Budoucnost účtů](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [AUTH a AUTHCALL operační kódy EIP-3074](https://eips.ethereum.org/EIPS/eip-3074)
- [Zveřejnění kódu na EOA adrese](https://eips.ethereum.org/EIPS/eip-5003)

## Komunita, vzdělávání a oslovování {#community-education-and-outreach}

Nástup nových uživatelů na Ethereum vyžaduje nové vzdělávací zdroje a přístupy k oslovování. Může se jednat o příspěvky a články na blogu, knihy, podcasty, memy, výukové zdroje, události a cokoli dalšího, co vytváří komunity, vítá nové zájemce a vzdělává lidi o Ethereu.

### UX/UI {#uxui}

Aby se na Ethereum dostalo více lidí, musí ekosystém zlepšit UX/UI. To bude vyžadovat, aby designéři a produktoví odborníci přehodnotili design peněženek a aplikací.

#### Základní podklady {#background-reading-8}

- [UX/UI Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Nedávný výzkum {#recent-research-8}

- [Design Discord Web3](https://discord.gg/FsCFPMTSm9)
- [Design principy Web3](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX diskuze](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomika {#economics}

Ekonomický výzkum v oblasti Etherea se obecně řídí dvěma přístupy: ověřovat bezpečnost mechanismů, které se opírají o ekonomické pobídky („mikroekonomie“), a analyzovat toky hodnot mezi protokoly, aplikacemi a uživateli („makroekonomie“). Existují složité kryptoekonomické faktory související s nativním aktivem Etherea (ether) a tokeny na něm postavenými (například NFT a tokeny ERC20).

#### Základní podklady {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [Workshop ETHconomics na Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Nedávný výzkum {#recent-research-9}

- [Empirická analýza EIP1559](https://arxiv.org/abs/2201.05574)
- [Rovnováha nabídky v oběhu](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Kvantifikace MEV: Jak temný je les?](https://arxiv.org/abs/2101.05511)

### Blokový prostor a trhy poplatků {#blockspace-fee-markets}

Trhy s blokovým prostorem řídí začlenění transakcí koncových uživatelů, a to buď přímo na Ethereu (vrstva 1), nebo na přemostěných sítích, např. rollupech (vrstva 2). Na Ethereu se transakce odesílají na trh poplatků nasazený v protokolu jako EIP-1559, což chrání blockchain před spamem a cenovým přetížením. Na obou vrstvách mohou transakce vytvářet externality, známé jako maximální extrahovatelné hodnoty (MEH), které vyvolávají nové tržní struktury k zachycení nebo řízení těchto externalit.

#### Základní podklady {#background-reading-10}

- [Návrh mechanismu transakčních poplatků pro Ethereum Blockchain: Ekonomická analýza EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulace EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Ekonomika rollupů z prvních principů](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, změna pořadí transakcí a nestabilita konsenzu na decentralizovaných burzách](https://arxiv.org/abs/1904.05234)

#### Nedávný výzkum {#recent-research-10}

- [Multidimenzionální videoprezentace EIP-1559](https://youtu.be/QbR4MTgnCko)
- [MEH napříč doménami](http://arxiv.org/abs/2112.01472)
- [MEH aukce](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Pobídky důkazem podílu {#proof-of-stake-incentives}

Validátoři používají nativní aktivum Etherea (ether) jako zástavu proti nekalému chování. Tato kryptoekonomika určuje bezpečnost sítě. Sofistikovaní validátoři mohou být schopni využít nuance pobídkové vrstvy k explicitním útokům.

#### Základní podklady {#background-reading-11}

- [Masterclass ekonomiky Etherea a ekonomický model](https://github.com/CADLabs/ethereum-economic-model)
- [Simulace pobídek důkazem podílu (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Nedávný výzkum {#recent-research-11}

- [Zvyšování cenzurní odolnosti transakcí v rámci oddělení navrhovatele a sestavovatele (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tři útoky na důkaz podílem Ethereum](https://arxiv.org/abs/2110.10086)

### Likvidní staking a deriváty {#liquid-staking-and-derivatives}

Likvidní staking umožňuje uživatelům s méně než 32 ETH získat výnosy ze stakingu výměnou etherů za token představující stakovaný ether, který lze použít v DeFi. Nové pobídky a dynamiky trhu spojené s likvidním stakingem se však stále objevují, stejně jako jejich vliv na bezpečnost Etherea (např. rizika centralizace).

#### Základní podklady {#background-reading-12}

- [Likvidní staking Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Cesta ke stakingu Etherea bez nutnosti další důvěry](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Úvod k protokolům stakingu](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Nedávný výzkum {#recent-research-12}

- [Zpracování výběrů z Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Ověřovací údaje o výběrech](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Rizika derivátů likvidního stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testování {#testing}

### Formální ověřování {#formal-verification}

Formální ověřování je psaní kódu, který ověřuje, zda jsou specifikace konsenzu Etherea správné a bez chyb. Existuje spustitelná verze specifikace napsaná v Pythonu, která vyžaduje údržbu a vývoj. Další výzkum může pomoci zlepšit implementaci specifikace v Pythonu a přidat nástroje, které mohou robustněji ověřovat správnost a identifikovat problémy.

#### Základní podklady {#background-reading-13}

- [Úvod do formálního ověřování](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formální ověřování (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Nedávný výzkum {#recent-research-13}

- [Formální ověřování vkladového kontraktu](https://github.com/runtimeverification/deposit-contract-verification)
- [Formální ověřování specifikace Beacon Chain](https://github.com/runtimeverification/deposit-contract-verification)

## Datová věda a analytika {#data-science-and-analytics}

Je potřeba vytvořit více nástrojů pro analýzu dat a ovládacích panelů, které poskytují podrobné informace o aktivitě na Ethereu a stavu sítě.

### Základní podklady {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Ovládací panel Client diversity](https://clientdiversity.org/)

#### Nedávný výzkum {#recent-research-14}

- [Datová analýza Robust Incentives Group](https://ethereum.github.io/rig/)

## Aplikace a nástroje {#apps-and-tooling}

Aplikační vrstva podporuje rozmanitý ekosystém programů, které vypořádávají transakce na základní vrstvě Etherea. Vývojové týmy neustále hledají nové způsoby, jak využít Ethereum k vytváření složitelných verzí důležitých, proti cenzuře odolných Web2 aplikací bez nutnosti oprávění nebo k vytváření zcela nových Web3 nativních konceptů. Zároveň se vyvíjejí nové nástroje, díky nimž je vytváření dappek na Ethereu méně složité.

### DeFi {#defi}

Decentralizované finance (DeFi) jsou jednou z hlavních tříd aplikací postavených na Ethereu. Cílem DeFi je vytvořit složitelné „peněžní lego“, které uživatelům umožní ukládat, převádět, zapůjčovat, půjčovat si a investovat kryptoaktivum pomocí chytrých kontraktů. DeFi je rychle se měnící prostor, který se neustále aktualizuje. Výzkum bezpečných, účinných a dostupných protokolů je neustále potřebný.

#### Základní podklady {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Co je DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Nedávný výzkum {#recent-research-15}

- [Decentralizované finance, centralizované vlastnictví?] (https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Cesta k poddolarovým transakcím](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Důležitou možností využití Etherea je možnost vytvoření decentralizované organizace pomocí DAO. V současné době se aktivně zkoumá, jak lze DAO na Ethereu vyvíjet a využívat k provádění lepších forem správy jako koordinačního nástroje s minimalizovanou důvěrou, což výrazně rozšiřuje možnosti lidí nad rámec tradičních korporací a organizací.

#### Základní podklady {#background-reading-16}

- [Úvod do DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Nedávný výzkum {#recent-research-16}

- [Mapování DAO ekosystému](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Nástroje pro vývojáře {#developer-tools}

Nástroje pro vývojáře Etherea se rychle zlepšují. V této obecné oblasti probíhá mnoho aktivního výzkumu a vývoje.

#### Základní podklady {#background-reading-17}

- [Nástroje dle programovacího jazyka](/developers/docs/programming-languages/)
- [Vývojářské frameworky](/developers/docs/frameworks/)
- [Seznam konsenzuálních vývojářských nástrojů](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standardy tokenů](/developers/docs/standards/tokens/)
- [CryptoDevHub: Nástroje pro EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Nedávný výzkum {#recent-research-17}

- [Discord kanál pro nástroje k výzkumu a vývoji Eth konsenzu](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Orákula {#oracles}

Orákula importují data mimo blockchain do blockchainu decentralizovaným způsobem bez nutnosti povolení. Získávání těchto dat na blockchain umožňuje decentralizovaným aplikacím reagovat na jevy reálného světa, jako jsou výkyvy cen reálných aktiv, události v aplikacích mimo blockchain, nebo dokonce změny počasí.

#### Základní podklady {#background-reading-18}

- [Úvod do Orákul](/developers/docs/evm)

#### Nedávný výzkum {#recent-research-18}

- [Přehled blockchainových orákul](https://arxiv.org/pdf/2004.07140.pdf)
- [Oficiální dokument Chainlink](https://chain.link/whitepaper)

### Bezpečnost aplikací {#app-security}

Hackeři na Ethereu obvykle využívají zranitelnosti v jednotlivých aplikacích, nikoli v samotném protokolu. Hackeři a vývojáři aplikací se předhánějí ve vývoji nových útoků a obran. To znamená, že je vždy nutné provádět důležitý výzkum a vývoj, aby byly aplikace bezpečné před hackery.

#### Základní podklady {#background-reading-19}

- [Zpráva o zneužití Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Seznam následných rozborů hacků kontraktů na Ethereu](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Nedávný výzkum {#recent-research-19}

- [Aplikace Ethresear.ch](https://ethresear.ch/c/applications/18)

### Technologický stack {#technology-stack}

Decentralizace celého technologického stacku Etherea je důležitou oblastí výzkumu. V současné době mají dappky na Ethereu běžně některé body centralizace, protože se spoléhají na centralizované nástroje nebo infrastrukturu.

#### Základní podklady {#background-reading-20}

- [Stack Etherea](/developers/docs/ethereum-stack/)
- [Coinbase: Úvod do Web3 stacku](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Úvod do chytrých kontraktů](/developers/docs/smart-contracts/)
- [Úvod do decentralizovaného úložiště](/developers/docs/storage/)

#### Nedávný výzkum {#recent-research-20}

- [Složitelnost chytrých kontraktů](/developers/docs/smart-contracts/composability/)
