---
title: Aktivní oblasti výzkumu Etherea
description: Prozkoumejte různé oblasti otevřeného výzkumu a zjistěte, jak se zapojit.
lang: cs
---

Jednou z hlavních předností Etherea je, že ho neustále vylepšuje aktivní výzkumná a inženýrská komunita. Mnoho nadšených a kvalifikovaných lidí po celém světě by se rádo věnovalo nevyřešeným problémům v Ethereu, ale není vždy snadné zjistit, o jaké problémy se jedná. Tato stránka nastiňuje klíčové aktivní oblasti výzkumu jako hrubého průvodce po špičkových inovacích Etherea.

## Jak funguje výzkum Etherea {#how-ethereum-research-works}

Výzkum Etherea je otevřený a transparentní a ztělesňuje principy [decentralizované vědy (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Kulturou je vytvářet výzkumné nástroje a výstupy co nejotevřenější a nejinteraktivnější, například prostřednictvím spustitelných zápisníků (executable notebooks). Výzkum Etherea postupuje rychle, přičemž nová zjištění jsou zveřejňována a otevřeně diskutována na fórech, jako je [ethresear.ch](https://ethresear.ch/), namísto toho, aby se ke komunitě dostávala prostřednictvím tradičních publikací po kolech recenzního řízení (peer review).

## Obecné zdroje pro výzkum {#general-research-resources}

Bez ohledu na konkrétní téma lze na [ethresear.ch](https://ethresear.ch) a na [kanálu Eth R&D na Discordu](https://discord.gg/qGpsxSA) nalézt nepřeberné množství informací o výzkumu Etherea. Toto jsou hlavní místa, kde výzkumníci Etherea diskutují o nejnovějších nápadech a příležitostech k vývoji.

Tato zpráva, kterou v květnu 2022 zveřejnila společnost [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum), poskytuje dobrý přehled o plánu vývoje (roadmap) Etherea.

## Zdroje financování {#sources-of-funding}

Můžete se zapojit do výzkumu Etherea a dostat za to zaplaceno! Například [Nadace Ethereum](/foundation/) nedávno uspořádala [kolo financování akademických grantů](https://esp.ethereum.foundation/academic-grants). Informace o aktivních a nadcházejících příležitostech financování najdete na [stránce grantů Etherea](/community/grants/).

## Výzkum protokolu {#protocol-research}

Výzkum protokolu se zabývá základní vrstvou Etherea – sadou pravidel definujících, jak se uzly připojují, komunikují, vyměňují a ukládají data Etherea a jak dosahují konsensu o stavu blockchainu. Výzkum protokolu se dělí do dvou hlavních kategorií: konsensus a exekuce.

### Konsensus {#consensus}

Výzkum konsensu se zabývá [mechanismem důkazu podílem (PoS) Etherea](/developers/docs/consensus-mechanisms/pos/). Některé příklady témat výzkumu konsensu jsou:

- identifikace a oprava zranitelností;
- kvantifikace kryptoekonomické bezpečnosti;
- zvyšování bezpečnosti nebo výkonu klientských implementací;
- a vývoj lehkých klientů.

Kromě výzkumu zaměřeného na budoucnost se zkoumají i některé zásadní změny designu protokolu, jako je jednoslotová finalita, které by umožnily významná vylepšení Etherea. Dále jsou důležitými tématy výzkumu také efektivita, bezpečnost a monitorování peer-to-peer sítí mezi konsensuálními klienty.

#### Doporučená literatura {#background-reading}

- [Úvod do důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Dokument o Casper FFG](https://arxiv.org/abs/1710.09437)
- [Vysvětlení Casper FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Dokument o Gasper](https://arxiv.org/abs/2003.03052)

#### Nedávný výzkum {#recent-research}

- [Konsensus na Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema dostupnosti/finality](https://arxiv.org/abs/2009.04987)
- [Jednoslotová finalita](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Oddělení navrhovatele a tvůrce (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Exekuce {#execution}

Exekuční vrstva se zabývá prováděním transakcí, spouštěním [virtuálního stroje Etherea (EVM)](/developers/docs/evm/) a generováním exekučních dat (payloads), která se předávají vrstvě konsensu. Existuje mnoho aktivních oblastí výzkumu, včetně:

- budování podpory pro lehké klienty;
- výzkumu limitů gasu;
- a začleňování nových datových struktur (např. Verkle stromy).

#### Doporučená literatura {#background-reading-1}

- [Úvod do EVM](/developers/docs/evm)
- [Exekuční vrstva na Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Nedávný výzkum {#recent-research-1}

- [Optimalizace databází](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Exspirace stavu](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Cesty k exspiraci stavu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Návrh na Verkle a exspiraci stavu](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Správa historie](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle stromy](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Vzorkování dostupnosti dat (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Vývoj klientů {#client-development}

Klienti Etherea jsou implementacemi protokolu Etherea. Vývoj klientů převádí výsledky výzkumu protokolu do reality tím, že je do těchto klientů zabudovává. Vývoj klientů zahrnuje aktualizaci specifikací klientů i vytváření konkrétních implementací.

Uzel Etherea musí spouštět dva softwarové komponenty:

1. konsensuální klient pro sledování hlavy blockchainu, šíření bloků (gossip) a zpracování logiky konsensu
2. exekuční klient pro podporu virtuálního stroje Etherea a provádění transakcí a chytrých kontraktů

Další podrobnosti o uzlech a klientech a seznam všech aktuálních implementací klientů najdete na [stránce uzlů a klientů](/developers/docs/nodes-and-clients/). Historii všech aktualizací Etherea najdete také na [stránce historie](/ethereum-forks/).

### Exekuční klienti {#execution-clients}

- [Specifikace exekučního klienta](https://github.com/ethereum/execution-specs)
- [Specifikace exekučního API](https://github.com/ethereum/execution-apis)

### Konsensuální klienti {#consensus-clients}

- [Specifikace konsensuálního klienta](https://github.com/ethereum/consensus-specs)
- [Specifikace Beacon API](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Škálování a výkon {#scaling-and-performance}

Škálování Etherea je velkou oblastí zájmu výzkumníků Etherea. Současné přístupy zahrnují přesun transakcí na rollupy a jejich maximální zlevnění pomocí datových blobů. Úvodní informace o škálování Etherea jsou k dispozici na naší [stránce o škálování](/developers/docs/scaling).

### Vrstva 2 {#layer-2}

Nyní existuje několik protokolů vrstvy 2 (L2), které škálují Ethereum pomocí různých technik pro dávkování transakcí a jejich zabezpečení na vrstvě 1 (L1) Etherea. Jedná se o velmi rychle rostoucí téma s velkým potenciálem pro výzkum a vývoj.

#### Doporučená literatura {#background-reading-2}

- [Úvod do vrstvy 2](/layer-2/)
- [Polynya: Rollupy, DA a modulární řetězce](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Nedávný výzkum {#recent-research-2}

- [Spravedlivé řazení (fair-ordering) pro sekvencery sítě Arbitrum](https://eprint.iacr.org/2021/1465)
- [Vrstva 2 na Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Plán vývoje zaměřený na rollupy](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Mosty {#bridges}

Jednou z konkrétních oblastí vrstvy 2, která vyžaduje více výzkumu a vývoje, jsou bezpečné a výkonné mosty. To zahrnuje mosty mezi různými sítěmi vrstvy 2 a mosty mezi vrstvou 1 a vrstvou 2. Jedná se o obzvláště důležitou oblast výzkumu, protože mosty jsou často terčem hackerů.

#### Doporučená literatura {#background-reading-3}

- [Úvod do blockchainových mostů](/bridges/)
- [Vitalik o mostech](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Článek o blockchainových mostech](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Hodnota uzamčená v mostech](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Nedávný výzkum {#recent-research-3}

- [Validace mostů](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Sharding blockchainu Etherea je již dlouho součástí plánu vývoje. V současné době se však do popředí dostávají nová řešení škálování, jako je „danksharding“.

Předchůdce plného dankshardingu známý jako proto-danksharding byl spuštěn s aktualizací sítě Cancun-Deneb („Dencun“).

[Více o aktualizaci Dencun](/roadmap/dencun/)

#### Doporučená literatura {#background-reading-4}

- [Poznámky k proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video o dankshardingu od Bankless](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Kompendium výzkumu shardingu Etherea](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Nedávný výzkum {#recent-research-4}

- [EIP-4844: Proto-danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik o shardingu a vzorkování dostupnosti dat (DAS)](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Provozování uzlů](/developers/docs/nodes-and-clients/run-a-node/) na skromném hardwaru je zásadní pro udržení decentralizovaného Etherea. Proto je aktivní výzkum minimalizace hardwarových požadavků na provoz uzlů důležitou oblastí výzkumu.

#### Doporučená literatura {#background-reading-5}

- [Ethereum na ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Nedávný výzkum {#recent-research-5}

- [ECDSA na FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Bezpečnost {#security}

Bezpečnost je široké téma, které může zahrnovat prevenci spamu/podvodů, bezpečnost peněženek, hardwarovou bezpečnost, kryptoekonomickou bezpečnost, hledání chyb (bug hunting) a testování aplikací a klientského softwaru a správu klíčů. Přispění k poznatkům v těchto oblastech pomůže stimulovat masové přijetí.

### Kryptografie a ZKP {#cryptography--zkp}

Důkazy s nulovou znalostí (ZKP) a kryptografie jsou klíčové pro budování soukromí a bezpečnosti v Ethereu a jeho aplikacích. Technologie s nulovým vědomím je relativně mladý, ale rychle se rozvíjející prostor s mnoha otevřenými příležitostmi pro výzkum a vývoj. Některé možnosti zahrnují vývoj efektivnějších implementací [algoritmu pro hashování Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), hledání lepších polynomiálních závazků (polynomial commitments), než jaké v současnosti existují, nebo snížení nákladů na generování veřejného klíče ECDSA a obvody pro ověřování podpisů.

#### Doporučená literatura {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Nedávný výzkum {#recent-research-6}

- [Nedávný pokrok v kryptografii eliptických křivek](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK na Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Peněženky {#wallets}

Peněženky Etherea mohou být rozšíření prohlížeče, desktopové a mobilní aplikace nebo chytré kontrakty na Ethereu. Probíhá aktivní výzkum peněženek se sociální obnovou, které snižují některá rizika spojená se správou klíčů jednotlivými uživateli. S vývojem peněženek souvisí výzkum alternativních forem abstrakce účtu, což je důležitá oblast rodícího se výzkumu.

#### Doporučená literatura {#background-reading-7}

- [Úvod do peněženek](/wallets/)
- [Úvod do bezpečnosti peněženek](/security/)
- [Bezpečnost na Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: Abstrakce účtu](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: Abstrakce účtu](https://eips.ethereum.org/EIPS/eip-4337)

#### Nedávný výzkum {#recent-research-7}

- [Peněženky s chytrými kontrakty zaměřené na validaci](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Budoucnost účtů](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: Opkódy AUTH a AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publikování kódu na adrese EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Komunita, vzdělávání a osvěta {#community-education-and-outreach}

Onboarding nových uživatelů do Etherea vyžaduje nové vzdělávací zdroje a přístupy k osvětě. To může zahrnovat příspěvky na blozích a články, knihy, podcasty, memy, výukové materiály, události a cokoli dalšího, co buduje komunity, vítá nováčky a vzdělává lidi o Ethereu.

### UX/UI {#uxui}

Aby se do Etherea zapojilo (onboarding) více lidí, musí ekosystém zlepšit UX/UI. To bude vyžadovat, aby designéři a produktoví experti přehodnotili design peněženek a aplikací.

#### Doporučená literatura {#background-reading-8}

- [UX/UI na Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Nedávný výzkum {#recent-research-8}

- [Discord Web3 Design](https://discord.gg/FsCFPMTSm9)
- [Principy designu Web3](https://www.web3designprinciples.com/)
- [Diskuse o UX na Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomie {#economics}

Ekonomický výzkum v Ethereu obecně sleduje dva přístupy: ověřování bezpečnosti mechanismů spoléhajících na ekonomické pobídky („mikroekonomie“) a analýzu toků hodnoty mezi protokoly, aplikacemi a uživateli („makroekonomie“). Existují složité kryptoekonomické faktory týkající se nativního aktiva Etherea (ether) a tokenů postavených na něm (například NFT a tokeny ERC-20).

#### Doporučená literatura {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Workshop ETHconomics na Devconnectu](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Nedávný výzkum {#recent-research-9}

- [Empirická analýza EIP-1559](https://arxiv.org/abs/2201.05574)
- [Rovnováha obíhající nabídky](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Kvantifikace MEV: Jak temný je les?](https://arxiv.org/abs/2101.05511)

### Trhy s blokovým prostorem a poplatky {#blockspace-fee-markets}

Trhy s blokovým prostorem řídí zahrnutí transakcí koncových uživatelů, a to buď přímo na Ethereu (vrstva 1), nebo na přemostěných sítích, např. rollupech (vrstva 2). Na Ethereu jsou transakce odesílány na trh s poplatky nasazený v protokolu jako EIP-1559, který chrání řetězec před spamem a oceňuje přetížení. Na obou vrstvách mohou transakce vytvářet externality, známé jako maximální extrahovatelná hodnota (MEV), které vyvolávají nové tržní struktury k zachycení nebo řízení těchto externalit.

#### Doporučená literatura {#background-reading-10}

- [Návrh mechanismu transakčních poplatků pro blockchain Etherea: Ekonomická analýza EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulace EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Ekonomie rollupů od základních principů](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, změna pořadí transakcí a nestabilita konsensu na decentralizovaných burzách](https://arxiv.org/abs/1904.05234)

#### Nedávný výzkum {#recent-research-10}

- [Videoprezentace vícerozměrného EIP-1559](https://youtu.be/QbR4MTgnCko)
- [Mezidoménové MEV](https://arxiv.org/abs/2112.01472)
- [Aukce MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Pobídky důkazu podílem (PoS) {#proof-of-stake-incentives}

Validátoři používají nativní aktivum Etherea (ether) jako zajištění proti nečestnému chování. Kryptoekonomie tohoto procesu určuje bezpečnost sítě. Sofistikovaní validátoři mohou být schopni využít nuancí vrstvy pobídek k zahájení explicitních útoků.

#### Doporučená literatura {#background-reading-11}

- [Masterclass ekonomie Etherea a ekonomický model](https://github.com/CADLabs/ethereum-economic-model)
- [Simulace pobídek PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Nedávný výzkum {#recent-research-11}

- [Zvýšení odolnosti transakcí proti cenzuře při oddělení navrhovatele a tvůrce (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tři útoky na PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Likvidní staking a deriváty {#liquid-staking-and-derivatives}

Likvidní staking umožňuje uživatelům s méně než 32 ETH získávat výnosy ze stakingu výměnou etheru za token představující stakovaný ether, který lze použít v decentralizovaných financích (DeFi). Pobídky a tržní dynamika spojené s likvidním stakingem se však stále objevují, stejně jako jeho vliv na bezpečnost Etherea (např. rizika centralizace).

#### Doporučená literatura {#background-reading-12}

- [Likvidní staking na Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Cesta ke stakingu Etherea nevyžadujícímu důvěru](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Úvod do protokolu pro staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Nedávný výzkum {#recent-research-12}

- [Zpracování výběrů z Lida](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Pověření k výběru](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Rizika derivátů likvidního stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testování {#testing}

### Formální verifikace {#formal-verification}

Formální verifikace je psaní kódu k ověření, že specifikace konsensu Etherea jsou správné a bez chyb. Existuje spustitelná verze specifikace napsaná v jazyce Python, která vyžaduje údržbu a vývoj. Další výzkum může pomoci vylepšit implementaci specifikace v Pythonu a přidat nástroje, které dokážou robustněji ověřovat správnost a identifikovat problémy.

#### Doporučená literatura {#background-reading-13}

- [Úvod do formální verifikace](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formální verifikace (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Nedávný výzkum {#recent-research-13}

- [Formální verifikace depozitního kontraktu](https://github.com/runtimeverification/deposit-contract-verification)
- [Formální verifikace specifikace Beacon chainu](https://github.com/runtimeverification/deposit-contract-verification)

## Datová věda a analytika {#data-science-and-analytics}

Je potřeba více nástrojů pro analýzu dat a řídicích panelů (dashboards), které poskytují podrobné informace o aktivitě na Ethereu a zdraví sítě.

### Doporučená literatura {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Řídicí panel klientské diverzity](https://clientdiversity.org/)

#### Nedávný výzkum {#recent-research-14}

- [Analýza dat Robust Incentives Group](https://rig.ethereum.org/)

## Aplikace a nástroje {#apps-and-tooling}

Aplikační vrstva podporuje rozmanitý ekosystém programů, které vypořádávají transakce na základní vrstvě Etherea. Vývojové týmy neustále nacházejí nové způsoby, jak využít Ethereum k vytvoření komponovatelných verzí důležitých aplikací Web2, které nevyžadují povolení a jsou odolné vůči cenzuře, nebo k vytvoření zcela nových konceptů nativních pro Web3. Zároveň se vyvíjejí nové nástroje, díky nimž je budování decentralizovaných aplikací (dapps) na Ethereu méně složité.

### DeFi {#defi}

Decentralizované finance (DeFi) jsou jednou z hlavních tříd aplikací postavených na Ethereu. Cílem DeFi je vytvořit komponovatelné „peněžní lego“, které uživatelům umožňuje ukládat, převádět, půjčovat, vypůjčovat si a investovat kryptoaktiva pomocí chytrých kontraktů. DeFi je rychle se rozvíjející prostor, který se neustále aktualizuje. Výzkum bezpečných, efektivních a přístupných protokolů je neustále potřeba.

#### Doporučená literatura {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Co je DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Nedávný výzkum {#recent-research-15}

- [Decentralizované finance, centralizované vlastnictví?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Cesta k transakcím pod jeden dolar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Působivým případem užití Etherea je schopnost organizovat se decentralizovaným způsobem pomocí DAO (decentralizovaných autonomních organizací). Probíhá mnoho aktivního výzkumu o tom, jak lze DAO na Ethereu vyvíjet a využívat k provádění vylepšených forem správy, jako koordinační nástroj s minimalizovanou důvěrou, což výrazně rozšiřuje možnosti lidí nad rámec tradičních korporací a organizací.

#### Doporučená literatura {#background-reading-16}

- [Úvod do DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Nedávný výzkum {#recent-research-16}

- [Mapování ekosystému DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Vývojářské nástroje {#developer-tools}

Nástroje pro vývojáře Etherea se rychle zlepšují. V této obecné oblasti je třeba provést mnoho aktivního výzkumu a vývoje.

#### Doporučená literatura {#background-reading-17}

- [Nástroje podle programovacího jazyka](/developers/docs/programming-languages/)
- [Vývojářské frameworky](/developers/docs/frameworks/)
- [Seznam vývojářských nástrojů pro konsensus](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standardy tokenů](/developers/docs/standards/tokens/)
- [CryptoDevHub: Nástroje EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Nedávný výzkum {#recent-research-17}

- [Kanál Consensus Tooling na Discordu Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Orákula {#oracles}

Orákula importují offchain data do blockchainu decentralizovaným způsobem, který nevyžaduje povolení. Získání těchto dat onchain umožňuje decentralizovaným aplikacím (dapps) reagovat na jevy v reálném světě, jako jsou kolísání cen reálných aktiv, události v offchain aplikacích nebo dokonce změny počasí.

#### Doporučená literatura {#background-reading-18}

- [Úvod do orákul](/developers/docs/oracles/)

#### Nedávný výzkum {#recent-research-18}

- [Průzkum blockchainových orákul](https://arxiv.org/pdf/2004.07140.pdf)
- [Whitepaper Chainlink](https://chain.link/whitepaper)

### Bezpečnost aplikací {#app-security}

Hackerské útoky na Ethereu obecně zneužívají zranitelnosti v jednotlivých aplikacích spíše než v samotném protokolu. Hackeři a vývojáři aplikací jsou uvězněni v závodech ve zbrojení při vývoji nových útoků a obran. To znamená, že je vždy zapotřebí důležitý výzkum a vývoj, aby byly aplikace v bezpečí před hackery.

#### Doporučená literatura {#background-reading-19}

- [Zpráva o zneužití (exploit) Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Seznam post-mortem analýz hacků kontraktů na Ethereu](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Nedávný výzkum {#recent-research-19}

- [Aplikace na Ethresear.ch](https://ethresear.ch/c/applications/18)

### Technologický stack {#technology-stack}

Decentralizace celého technologického stacku Etherea je důležitou oblastí výzkumu. V současné době mají decentralizované aplikace (dapps) na Ethereu běžně určité body centralizace, protože spoléhají na centralizované nástroje nebo infrastrukturu.

#### Doporučená literatura {#background-reading-20}

- [Stack Etherea](/developers/docs/ethereum-stack/)
- [Coinbase: Úvod do stacku Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Úvod do chytrých kontraktů](/developers/docs/smart-contracts/)
- [Úvod do decentralizovaného úložiště](/developers/docs/storage/)

#### Nedávný výzkum {#recent-research-20}

- [Skládatelnost chytrých kontraktů](/developers/docs/smart-contracts/composability/)