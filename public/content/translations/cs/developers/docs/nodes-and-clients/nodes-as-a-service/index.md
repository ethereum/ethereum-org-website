---
title: Uzly jako služba
description: Základní přehled služeb pro uzly, jejich výhody a nevýhody a oblíbení poskytovatelé.
lang: cs
sidebarDepth: 2
---

## Úvod {#introduction}

Provozování vlastního [uzlu Etherea](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) může být náročné, zejména v začátcích nebo při rychlém škálování. Existuje [řada služeb](#popular-node-services), které pro vás provozují optimalizovanou infrastrukturu uzlů, takže se místo toho můžete soustředit na vývoj své aplikace nebo produktu. Vysvětlíme si, jak služby pro uzly fungují, jaké jsou výhody a nevýhody jejich používání, a uvedeme seznam poskytovatelů, pokud máte zájem začít.

## Předpoklady {#prerequisites}

Pokud ještě nemáte představu o tom, co jsou uzly a klienti, podívejte se na [Uzly a klienti](/developers/docs/nodes-and-clients/).

## Stakeři {#stakoooooooooooooors}

Sólo stakeři musí provozovat vlastní infrastrukturu, místo aby se spoléhali na poskytovatele třetích stran. To znamená provozovat exekučního klienta spojeného s konsensuálním klientem. Před [Merge](/roadmap/merge) bylo možné provozovat pouze konsensuálního klienta a pro exekuční data využívat centralizovaného poskytovatele; to už není možné – sólo staker musí provozovat oba klienty. K dispozici jsou však služby, které tento proces usnadňují.

[Přečtěte si více o provozování uzlu](/developers/docs/nodes-and-clients/run-a-node/).

Služby popsané na této stránce jsou určeny pro uzly, které neprovádějí staking.

## Jak fungují služby pro uzly? {#how-do-node-services-work}

Poskytovatelé služeb pro uzly za vás na pozadí provozují distribuované klienty uzlů, takže vy už nemusíte.

Tyto služby obvykle poskytují klíč API, který můžete použít k zápisu a čtení z blockchainu. Často zahrnují přístup k [testnetům Etherea](/developers/docs/networks/#ethereum-testnets) kromě sítě Mainnet.

Některé služby vám nabízejí vlastní vyhrazený uzel, který pro vás spravují, zatímco jiné používají nástroje pro vyrovnávání zátěže k rozložení aktivity mezi uzly.

Téměř všechny služby pro uzly se dají velmi snadno integrovat, což obnáší změnu jednoho řádku ve vašem kódu, abyste vyměnili svůj vlastní hostovaný uzel, nebo dokonce přepínali mezi samotnými službami.

Služby pro uzly často provozují různé [klienty uzlů](/developers/docs/nodes-and-clients/#execution-clients) a [typy](/developers/docs/nodes-and-clients/#node-types), což vám umožňuje přístup k plným a archivním uzlům kromě metod specifických pro klienta v jednom API.

Je důležité si uvědomit, že služby pro uzly neukládají a neměly by ukládat vaše soukromé klíče ani informace.

## Jaké jsou výhody používání služby pro uzly? {#benefits-of-using-a-node-service}

Hlavní výhodou používání služby pro uzly je, že nemusíte trávit inženýrský čas údržbou a správou uzlů sami. To vám umožní soustředit se na budování vašeho produktu, místo abyste se museli starat o údržbu infrastruktury.

Provozování vlastních uzlů může být velmi drahé, od úložiště přes šířku pásma až po cenný inženýrský čas. Věci jako spouštění dalších uzlů při škálování, aktualizace uzlů na nejnovější verze a zajištění konzistence stavu mohou odvádět pozornost od budování a vynakládání zdrojů na váš požadovaný Web3 produkt.

## Jaké jsou nevýhody používání služby pro uzly? {#cons-of-using-a-node-service}

Používáním služby pro uzly centralizujete infrastrukturní aspekt vašeho produktu. Z tohoto důvodu mohou projekty, které považují decentralizaci za nanejvýš důležitou, upřednostňovat vlastní hostování uzlů před outsourcingem třetí straně.

Přečtěte si více o [výhodách provozování vlastního uzlu](/developers/docs/nodes-and-clients/#benefits-to-you).

## Oblíbené služby pro uzly {#popular-node-services}

Zde je seznam některých z nejoblíbenějších poskytovatelů uzlů Etherea, neváhejte přidat jakékoli, které chybí! Každá služba pro uzly nabízí kromě bezplatných nebo placených úrovní různé výhody a funkce, před rozhodnutím byste měli prozkoumat, které z nich nejlépe vyhovují vašim potřebám.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentace](https://www.alchemy.com/docs/)
  - Funkce
    - Největší bezplatná úroveň s 300 miliony výpočetních jednotek měsíčně (~30 milionů požadavků getLatestBlock)
    - Podpora více řetězců pro Polygon, Starknet, Optimism, Arbitrum
    - Pohání ~70 % největších decentralizovaných aplikací (dapp) na Ethereu a objemu transakcí decentralizovaných financí (DeFi)
    - Upozornění webhooků v reálném čase prostřednictvím Alchemy Notify
    - Nejlepší podpora ve své třídě a spolehlivost / stabilita
    - NFT API od Alchemy
    - Řídicí panel s Request Explorer, Mempool Watcher a Composer
    - Integrovaný přístup k testnetovému faucetu
    - Aktivní komunita tvůrců na Discordu s 18 tisíci uživateli

- [**Allnodes**](https://www.allnodes.com/)
  - [Dokumentace](https://docs.allnodes.com/)
  - Funkce
    - Žádné limity rychlosti s tokenem PublicNode vytvořeným na stránce portfolia Allnodes.
    - Bezplatné RPC koncové body zaměřené na soukromí (100+ blockchainů) na [PublicNode](https://www.publicnode.com)
    - Vyhrazené uzly bez limitů rychlosti pro 90+ blockchainů
    - Vyhrazené archivní uzly pro 30+ blockchainů
    - Dostupné ve 3 regionech (USA, EU, Asie)
    - Snímky pro 100+ blockchainů na [PublicNode](https://www.publicnode.com/snapshots)
    - Technická podpora 24/7 s SLA dostupností 99,90 % - 99,98 % (v závislosti na plánu).
    - Ceny za hodinu
    - Platba kreditní kartou, přes PayPal nebo krypto

- [**All That Node**](https://allthatnode.com/)
  - [Dokumentace](https://docs.allthatnode.com/)
  - Funkce
    - 50 000 požadavků denně s bezplatnou úrovní
    - Podpora pro více než 40 protokolů
    - Podporována rozhraní JSON-RPC (EVM, Tendermint), REST a Websocket API
    - Neomezený přístup k archivním datům
    - Technická podpora 24/7 a dostupnost přes 99,9 %
    - Faucet dostupný na více řetězcích
    - Neomezený přístup ke koncovým bodům s neomezeným počtem klíčů API
    - Podpora Trace/Debug API
    - Automatické aktualizace

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Dokumentace](https://aws.amazon.com/managed-blockchain/resources/)
  - Funkce
    - Plně spravované uzly Etherea
    - Dostupné v šesti regionech
    - JSON-RPC přes HTTP a zabezpečené WebSockets
    - Podporuje 3 řetězce
    - SLA, podpora AWS 24/7
    - Go Ethereum (Geth) a Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Dokumentace](https://docs.ankr.com/)
  - Funkce
    - Protokol Ankr - otevřený přístup k veřejným koncovým bodům RPC API pro 8+ řetězců
    - Vyrovnávání zátěže a monitorování stavu uzlů pro rychlou a spolehlivou bránu k nejbližšímu dostupnému uzlu
    - Prémiová úroveň umožňující koncový bod WSS a neomezený limit rychlosti
    - Nasazení plného uzlu a uzlu validátoru jedním kliknutím pro 40+ řetězců
    - Škálování podle potřeby
    - Analytické nástroje
    - Řídicí panel
    - Koncové body RPC, HTTPS a WSS
    - Přímá podpora

- [**Blast**](https://blastapi.io/)
  - [Dokumentace](https://docs.blastapi.io/)
  - Funkce
    - Podpora RPC a WSS
    - Hostování uzlů ve více regionech
    - Decentralizovaná infrastruktura
    - Veřejné API
    - Vyhrazený bezplatný plán
    - Podpora více řetězců (17+ blockchainů)
    - Archivní uzly
    - Podpora na Discordu 24/7
    - Monitorování a upozornění 24/7
    - Celkové SLA 99,9 %
    - Platba v kryptu

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentace](https://ubiquity.docs.blockdaemon.com/)
  - Výhody
    - Řídicí panel
    - Na bázi jednotlivých uzlů
    - Analytika

- [**BlockPI**](https://blockpi.io/)
  - [Dokumentace](https://docs.blockpi.io/)
  - Funkce
    - Robustní a distribuovaná struktura uzlů
    - Až 40 koncových bodů HTTPS a WSS
    - Bezplatný registrační balíček a měsíční balíček
    - Metoda Trace + podpora archivních dat
    - Balíčky s platností až 90 dní
    - Vlastní plán a platba podle využití (pay-as-you-go)
    - Platba v kryptu
    - Přímá podpora a technická podpora

- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumentace](https://docs.chainbase.com)
  - Funkce
    - Vysoce dostupná, rychlá a škálovatelná služba RPC
    - Podpora více řetězců
    - Bezplatné tarify
    - Uživatelsky přívětivý řídicí panel
    - Poskytuje datové služby blockchainu nad rámec RPC

- [**Chainstack**](https://chainstack.com/)
  - [Dokumentace](https://docs.chainstack.com/)
  - Funkce
    - Bezplatné sdílené uzly
    - Sdílené archivní uzly
    - Podpora GraphQL
    - Koncové body RPC a WSS
    - Vyhrazené plné a archivní uzly
    - Rychlá doba synchronizace pro vyhrazená nasazení
    - Přineste si vlastní cloud (Bring your cloud)
    - Ceny za hodinu
    - Přímá podpora 24/7

- [**dRPC**](https://drpc.org/)
  - [Dokumentace](https://drpc.org/docs)
  - NodeCloud: Plug-n-play RPC infrastruktura od 10 $ (USD) – plná rychlost, žádné limity
  - Funkce NodeCloud:
    - Podpora API pro 185 sítí
    - Distribuovaný fond 40+ poskytovatelů
    - Globální pokrytí s devíti (9) geoklastry
    - Systém vyrovnávání zátěže poháněný umělou inteligencí
    - Paušální ceny podle využití (pay-as-you-go) – žádné zdražování, žádné vypršení platnosti, žádné vázanosti
    - Neomezené klíče, granulární úpravy klíčů, týmové role, ochrana front-endu
    - Paušální sazba metod na 20 výpočetních jednotek (CU) za metodu
    - [Seznam řetězců veřejných koncových bodů](https://drpc.org/chainlist)
    - [Cenová kalkulačka](https://drpc.org/pricing#calculator)
  - NodeCore: open-source stack pro organizace, které chtějí plnou kontrolu

- [**GetBlock**](https://getblock.io/)
  - [Dokumentace](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Funkce
    - Přístup k 40+ uzlům blockchainu
    - 40 tisíc bezplatných požadavků denně
    - Neomezený počet klíčů API
    - Vysoká rychlost připojení 1 GB/s
    - Trace+Archive
    - Pokročilá analytika
    - Automatické aktualizace
    - Technická podpora

- [**InfStones**](https://infstones.com/)
  - Funkce
    - Možnost bezplatné úrovně
    - Škálování podle potřeby
    - Analytika
    - Řídicí panel
    - Unikátní koncové body API
    - Vyhrazené plné uzly
    - Rychlá doba synchronizace pro vyhrazená nasazení
    - Přímá podpora 24/7
    - Přístup k 50+ uzlům blockchainu

- [**Infura**](https://infura.io/)
  - [Dokumentace](https://infura.io/docs)
  - Funkce
    - Možnost bezplatné úrovně
    - Škálování podle potřeby
    - Placená archivní data
    - Přímá podpora
    - Řídicí panel

- [**Kaleido**](https://kaleido.io/)
  - [Dokumentace](https://docs.kaleido.io/)
  - Funkce
    - Bezplatná startovací úroveň
    - Nasazení uzlu Etherea jedním kliknutím
    - Přizpůsobitelní klienti a algoritmy (Geth, Quorum a Besu || PoA, IBFT a Raft)
    - 500+ administrativních a servisních API
    - RESTful rozhraní pro odesílání transakcí Etherea (podporováno Apache Kafka)
    - Odchozí streamy pro doručování událostí (podporováno Apache Kafka)
    - Hluboká sbírka offchain a doplňkových služeb (např. bilaterální šifrovaný přenos zpráv)
    - Přímý onboarding do sítě se správou a řízením přístupu na základě rolí
    - Sofistikovaná správa uživatelů pro administrátory i koncové uživatele
    - Vysoce škálovatelná, odolná infrastruktura podnikové třídy
    - Správa soukromých klíčů Cloud HSM
    - Tethering na Ethereum Mainnet
    - Certifikace ISO 27k a SOC 2, Type 2
    - Dynamická konfigurace za běhu (např. přidávání cloudových integrací, změna vstupů uzlů atd.)
    - Podpora pro orchestraci nasazení ve více cloudech, více regionech a hybridních nasazeních
    - Jednoduché hodinové ceny na bázi SaaS
    - SLA a podpora 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Dokumentace](https://docs.lavanet.xyz/)
  - Funkce
    - Bezplatné použití testnetu
    - Decentralizovaná redundance pro vysokou dostupnost
    - Open-source
    - Plně decentralizované SDK
    - Integrace Ethers.js
    - Intuitivní rozhraní pro řízení projektů
    - Integrita dat založená na konsensu
    - Podpora více řetězců

- [**Moralis**](https://moralis.io/)
  - [Dokumentace](https://docs.moralis.io/)
  - Funkce
    - Bezplatné sdílené uzly
    - Bezplatné sdílené archivní uzly
    - Zaměřeno na soukromí (zásada neuchovávání protokolů)
    - Podpora napříč řetězci
    - Škálování podle potřeby
    - Řídicí panel
    - Unikátní Ethereum SDK
    - Unikátní koncové body API
    - Přímá technická podpora

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentace](https://docs.nodereal.io/docs/introduction)
  - Funkce
    - Spolehlivé, rychlé a škálovatelné služby RPC API
    - Vylepšené API pro vývojáře Web3
    - Podpora více řetězců
    - Začněte zdarma

- [**NodeFlare**](https://nodeflare.app/)
  - [Dokumentace](https://nodeflare.app/docs/quick-start)
  - Funkce
    - 8 EVM řetězců včetně Etherea, Base, Arbitrum One a Optimism
    - 4 regiony (Evropa, Asie, Severní Amerika) s automatickým převzetím služeb při selhání na nejbližší zdravý uzel
    - Bezplatný veřejný koncový bod (bez klíče API) + bezplatný plán s 3 miliony výpočetních jednotek měsíčně
    - Účtování výpočetních jednotek – platíte jen za to, co využijete, náročnější volání stojí více
    - Žádné omezování rychlosti u placených plánů

- [**NOWNodes**](https://nownodes.io/)
  - Funkce
    - Přístup k 50+ uzlům blockchainu
    - Bezplatný klíč API
    - Průzkumníky bloků
    - Doba odezvy API ⩽ 1 s
    - Tým podpory 24/7
    - Osobní správce účtu
    - Sdílené, archivní, záložní a vyhrazené uzly

- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentace](https://docs.pokt.network/)
  - Funkce
    - Decentralizovaný protokol RPC a tržiště
    - Bezplatná úroveň 1 milion požadavků denně (na koncový bod, max. 2)
    - Program Pre-Stake+ (pokud potřebujete více než 1 milion požadavků denně)
    - Podpora 15+ blockchainů
    - 6400+ uzlů vydělávajících POKT za obsluhu aplikací
    - Podpora archivních uzlů, archivních uzlů s trasováním a testnetových uzlů
    - Klientská diverzita uzlů na Ethereum Mainnet
    - Žádný jediný bod selhání
    - Nulové prostoje
    - Nákladově efektivní tokenomika blížící se nule (jednorázový stake POKT pro šířku pásma sítě)
    - Žádné měsíční utopené náklady, proměňte svou infrastrukturu v aktivum
    - Vyrovnávání zátěže zabudované do protokolu
    - Nekonečné škálování počtu požadavků za den a uzlů za hodinu podle potřeby
    - Nejsoukromější možnost odolná vůči cenzuře
    - Praktická podpora pro vývojáře
    - Řídicí panel a analytika [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Dokumentace](https://www.quicknode.com/docs/)
  - Funkce
    - Technická podpora 24/7 a vývojářská komunita na Discordu
    - Geograficky vyvážená síť s nízkou latencí, využívající více cloudů/bare metal
    - Podpora více řetězců (Optimism, Arbitrum, Polygon + 11 dalších)
    - Střední vrstvy pro rychlost a stabilitu (směrování volání, mezipaměť, indexování)
    - Monitorování chytrých kontraktů prostřednictvím webhooků
    - Intuitivní řídicí panel, analytická sada, RPC composer
    - Pokročilé bezpečnostní funkce (JWT, maskování, whitelisting)
    - API pro data a analytiku NFT
    - [Certifikace SOC2](https://www.quicknode.com/security)
    - Vhodné pro vývojáře i podniky

- [**Rivet**](https://rivet.cloud/)
  - [Dokumentace](https://rivet.readthedocs.io/en/latest/)
  - Funkce
    - Možnost bezplatné úrovně
    - Škálování podle potřeby

- [**SenseiNode**](https://senseinode.com)
  - [Dokumentace](https://docs.senseinode.com/)
  - Funkce
    - Vyhrazené a sdílené uzly
    - Řídicí panel
    - Hostování mimo AWS u více poskytovatelů hostingu v různých lokalitách v Latinské Americe
    - Klienti Prysm a Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumentace](https://docs.settlemint.com/)
  - Funkce
    - Zkušební verze zdarma
    - Škálování podle potřeby
    - Podpora GraphQL
    - Koncové body RPC a WSS
    - Vyhrazené plné uzly
    - Přineste si vlastní cloud (Bring your cloud)
    - Analytické nástroje
    - Řídicí panel
    - Ceny za hodinu
    - Přímá podpora

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumentace](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Funkce
    - Bezplatná úroveň zahrnující 25 milionů jednotek Tenderly měsíčně
    - Bezplatný přístup k historickým datům
    - Až 8x rychlejší pracovní zátěže náročné na čtení
    - 100% konzistentní přístup ke čtení
    - Koncové body JSON-RPC
    - Nástroj pro tvorbu požadavků RPC a náhled požadavků na bázi uživatelského rozhraní
    - Úzce integrováno s vývojovými, ladicími a testovacími nástroji Tenderly
    - Simulace transakcí
    - Analytika využití a filtrování
    - Snadná správa přístupových klíčů
    - Vyhrazená inženýrská podpora prostřednictvím chatu, e-mailu a Discordu

- [**Tokenview**](https://services.tokenview.io/)
  - [Dokumentace](https://services.tokenview.io/docs?type=nodeService)
  - Funkce
    - Technická podpora 24/7 a vývojářská komunita na Telegramu
    - Podpora více řetězců (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Koncové body RPC i WSS jsou otevřené k použití
    - Neomezený přístup k API archivních dat
    - Řídicí panel s Request Explorer a Mempool Watcher
    - API pro data NFT a upozornění webhooků
    - Platba v kryptu
    - Externí podpora pro dodatečné požadavky na chování

- [**Watchdata**](https://watchdata.io/)
  - [Dokumentace](https://docs.watchdata.io/)
  - Funkce
    - Spolehlivost dat
    - Nepřerušované připojení bez prostojů
    - Automatizace procesů
    - Bezplatné tarify
    - Vysoké limity, které vyhovují každému uživateli
    - Podpora různých uzlů
    - Škálování zdrojů
    - Vysoké rychlosti zpracování

- [**ZMOK**](https://zmok.io/)
  - [Dokumentace](https://docs.zmok.io/)
  - Funkce
    - Předbíhání jako služba
    - Globální mempool transakcí s metodami vyhledávání/filtrování
    - Neomezený poplatek za transakci a nekonečný gas pro odesílání transakcí
    - Nejrychlejší získání nového bloku a čtení blockchainu
    - Záruka nejlepší ceny za volání API

- [**Zeeve**](https://www.zeeve.io/)
  - [Dokumentace](https://www.zeeve.io/docs/)
  - Funkce
    - No-code automatizační platforma podnikové třídy poskytující nasazení, monitorování a správu uzlů a sítí blockchainu
    - 30+ podporovaných protokolů a integrací a další přibývají
    - Služby infrastruktury Web3 s přidanou hodnotou, jako je decentralizované úložiště, decentralizovaná identita (DID) a datová API blockchainové účetní knihy pro reálné případy použití
    - Podpora 24/7 a proaktivní monitorování zajišťují neustálé zdraví uzlů.
    - Koncové body RPC nabízejí ověřený přístup k API, bezproblémovou správu s intuitivním řídicím panelem a analytikou.
    - Poskytuje na výběr možnosti spravovaného cloudu i vlastního cloudu (bring your own cloud) a podporuje všechny hlavní poskytovatele cloudu, jako jsou AWS, Azure, Google Cloud, Digital Ocean a on-premise řešení.
    - Používáme inteligentní směrování, abychom pokaždé zasáhli uzel nejblíže vašemu uživateli


## Další čtení {#further-reading}

- [Seznam služeb pro uzly Etherea](https://ethereumnodes.com/)

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)

## Související návody {#related-tutorials}

- [Začínáme s vývojem na Ethereu pomocí Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Průvodce odesíláním transakcí pomocí Web3 a Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)