---
title: Uzly jako služba
description: Úvodní přehled služeb uzlů, jejich výhody a nevýhody a oblíbení poskytovatelé.
lang: cs
sidebarDepth: 2
---

## Úvod {#Introduction}

Provozování vlastního [uzlu sítě Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) může být náročné, zejména na začátku nebo při rychlém škálování. Existuje [řada služeb](#popular-node-services), které za vás provozují optimalizované infrastruktury uzlů, takže se místo toho můžete soustředit na vývoj své aplikace nebo produktu. Vysvětlíme si, jak fungují služby uzlů, jaké jsou výhody a nevýhody jejich používání, a uvedeme poskytovatele pro případ, že byste chtěli začít.

## Předpoklady {#prerequisites}

Pokud ještě nechápete, co jsou uzly a klienti, podívejte se na článek [Uzly a klienti](/developers/docs/nodes-and-clients/).

## Stakeři {#stakoooooooooooooors}

Samostatní stakeři musí provozovat vlastní infrastrukturu, místo aby se spoléhali na poskytovatele třetích stran. To znamená provozovat exekučního klienta spojeného s konsensuálním klientem. Před [Sloučením](/roadmap/merge) bylo možné provozovat pouze konsensuálního klienta a pro exekuční data využívat centralizovaného poskytovatele; to už nyní není možné – samostatný staker musí provozovat oba klienty. Existují však služby, které tento proces usnadňují.

[Přečtěte si více o provozování uzlu](/developers/docs/nodes-and-clients/run-a-node/).

Služby popsané na této stránce jsou pro nestakující uzly.

## Jak fungují služby uzlů? {#how-do-node-services-work}

Poskytovatelé služeb uzlů za vás na pozadí provozují distribuované klienty uzlů, takže vy nemusíte.

Tyto služby obvykle poskytují klíč API, který můžete použít k zápisu a čtení z blockchainu. Často zahrnují přístup k [testovacím sítím Etherea](/developers/docs/networks/#ethereum-testnets) kromě hlavní sítě (Mainnetu).

Některé služby vám nabízejí vlastní dedikovaný uzel, který pro vás spravují, zatímco jiné používají nástroje pro vyrovnávání zátěže (load balancery) k rozdělení aktivity mezi uzly.

Integrace téměř všech služeb uzlů je velmi snadná a spočívá ve změně jednoho řádku kódu, kterým nahradíte svůj vlastní hostovaný uzel, nebo dokonce přepnete mezi jednotlivými službami.

Služby uzlů často provozují různé [klienty uzlů](/developers/docs/nodes-and-clients/#execution-clients) a [typy uzlů](/developers/docs/nodes-and-clients/#node-types), což vám v jednom rozhraní API umožňuje přístup k plným a archivním uzlům a také k metodám specifickým pro klienta.

Je důležité si uvědomit, že služby uzlů neukládají a neměly by ukládat vaše soukromé klíče ani informace.

## Jaké jsou výhody používání služby uzlů? {#benefits-of-using-a-node-service}

Hlavní výhodou používání služby uzlů je, že nemusíte trávit čas technickou prací s údržbou a správou vlastních uzlů. Díky tomu se můžete soustředit na tvorbu svého produktu, místo abyste se museli starat o údržbu infrastruktury.

Provoz vlastních uzlů může být velmi nákladný, a to jak z hlediska úložiště a šířky pásma, tak i cenného času vývojářů. Činnosti jako spouštění dalších uzlů při škálování, aktualizace uzlů na nejnovější verze a zajišťování konzistence stavu mohou odvádět vaši pozornost od budování a vynakládání zdrojů na vámi požadovaný produkt web3.

## Jaké jsou nevýhody používání služby uzlů? {#cons-of-using-a-node-service}

Používáním služby uzlů centralizujete infrastrukturní aspekt svého produktu. Z tohoto důvodu mohou projekty, pro které je decentralizace nanejvýš důležitá, upřednostňovat vlastní hostování uzlů před outsourcingem třetí straně.

Přečtěte si více o [výhodách provozování vlastního uzlu](/developers/docs/nodes-and-clients/#benefits-to-you).

## Oblíbené služby uzlů {#popular-node-services}

Zde je seznam některých nejoblíbenějších poskytovatelů uzlů sítě Ethereum. Neváhejte přidat ty, které v seznamu chybí! Každá služba uzlů nabízí kromě bezplatných nebo placených úrovní i různé výhody a funkce. Před rozhodnutím byste si měli zjistit, která z nich nejlépe vyhovuje vašim potřebám.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentace](https://www.alchemy.com/docs/)
  - Funkce
    - Největší bezplatná úroveň s 300 miliony výpočetních jednotek za měsíc (~30 milionů požadavků getLatestBlock)
    - Podpora více řetězců pro Polygon, Starknet, Optimism, Arbitrum
    - Zajišťuje provoz přibližně 70 % největších ethereových dapps a objem transakcí DeFi
    - Upozornění webhooků v reálném čase prostřednictvím Alchemy Notify
    - Špičková podpora a spolehlivost/stabilita
    - NFT API od Alchemy
    - Řídicí panel s nástroji Request Explorer, Mempool Watcher a Composer
    - Integrovaný přístup k faucetu testnetu
    - Aktivní komunita tvůrců na Discordu s 18 tisíci uživateli

- [**Allnodes**](https://www.allnodes.com/)
  - [Dokumentace](https://docs.allnodes.com/)
  - Funkce
    - Žádné limity rychlosti s tokenem PublicNode vytvořeným na stránce portfolia Allnodes.
    - Bezplatné koncové body rpc zaměřené na soukromí (100+ blockchainů) na [PublicNode](https://www.publicnode.com)
    - Dedikované uzly bez omezení rychlosti pro více než 90 blockchainů
    - Dedikované archivní uzly pro více než 30 blockchainů
    - Dostupné ve 3 regionech (USA, EU, Asie)
    - Snímky pro více než 100 blockchainů na [PublicNode](https://www.publicnode.com/snapshots)
    - Technická podpora 24/7 s SLA dostupností 99,90–99,98 % (v závislosti na plánu).
    - Hodinová sazba
    - Plaťte kreditní kartou, přes PayPal nebo v kryptoměnách

- [**All That Node**](https://allthatnode.com/)
  - [Dokumentace](https://docs.allthatnode.com/)
  - Funkce
    - 50 000 požadavků denně v rámci bezplatné úrovně
    - Podpora pro více než 40 protokolů
    - Podporovaná rozhraní JSON-RPC (EVM, Tendermint), REST a Websocket API
    - Neomezený přístup k archivním datům
    - Technická podpora 24/7 a více než 99,9% dostupnost
    - Faucet dostupný na více řetězcích
    - Neomezený přístup ke koncovým bodům s neomezeným počtem klíčů API
    - Podpora Trace/Debug API
    - Automatické aktualizace

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Dokumentace](https://aws.amazon.com/managed-blockchain/resources/)
  - Funkce
    - Plně spravované uzly Etherea
    - Dostupné v šesti regionech
    - JSON-RPC přes HTTP a zabezpečené WebSockety
    - Podporuje 3 řetězce
    - SLA, podpora AWS 24/7
    - Go-ethereum a Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Dokumentace](https://docs.ankr.com/)
  - Funkce
    - Ankr Protocol – otevřený přístup k veřejným koncovým bodům RPC API pro více než 8 řetězců
    - Vyrovnávání zátěže a sledování stavu uzlů pro rychlou a spolehlivou bránu k nejbližšímu dostupnému uzlu
    - Prémiová úroveň umožňující koncový bod WSS a neomezený limit rychlosti
    - Nasazení plného uzlu a uzlu validátoru na jedno kliknutí pro více než 40 řetězců
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
    - Dedikovaný bezplatný plán
    - Podpora více řetězců (více než 17 blockchainů)
    - Archivní uzly
    - Podpora 24/7 na Discordu
    - Monitorování a upozornění 24/7
    - Celková SLA 99,9 %
    - Platba v kryptoměnách

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
    - Metoda sledování + podpora archivních dat
    - Balíčky s platností až 90 dní
    - Vlastní plán a průběžné platby
    - Platba v kryptoměnách
    - Přímá podpora a technická podpora

- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumentace](https://docs.chainbase.com)
  - Funkce
    - Vysoce dostupná, rychlá a škálovatelná služba RPC
    - Podpora více řetězců
    - Bezplatné tarify
    - Uživatelsky přívětivý řídicí panel
    - Poskytuje služby blockchainových dat nad rámec RPC

- [**Chainstack**](https://chainstack.com/)
  - [Dokumentace](https://docs.chainstack.com/)
  - Funkce
    - Bezplatné sdílené uzly
    - Sdílené archivní uzly
    - Podpora GraphQL
    - Koncové body RPC a WSS
    - Dedikované plné a archivní uzly
    - Rychlá synchronizace pro dedikovaná nasazení
    - Použití vlastního cloudu
    - Hodinová sazba
    - Přímá podpora 24/7

- [**dRPC**](https://drpc.org/)
  - [Dokumentace](https://drpc.org/docs)
  - NodeCloud: Plug-n-play RPC infrastruktura od 10 USD – plná rychlost, bez omezení
  - Funkce NodeCloud:
    - Podpora API pro 185 sítí
    - Distribuovaný pool více než 40 poskytovatelů
    - Globální pokrytí s devíti (9) geografickými clustery
    - Systém vyrovnávání zátěže s umělou inteligencí
    - Paušální průběžné platby – žádné zdražování, žádné vypršení platnosti, žádné závazky
    - Neomezené klíče, granulární úpravy klíčů, týmové role, front-endová ochrana
    - Paušální sazba 20 výpočetních jednotek (CU) za metodu
    - [Seznam veřejných koncových bodů](https://drpc.org/chainlist)
    - [Kalkulačka cen](https://drpc.org/pricing#calculator)
  - NodeCore: open-source stack pro organizace, které chtějí plnou kontrolu

- [**GetBlock**](https://getblock.io/)
  - [Dokumentace](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Funkce
    - Přístup k více než 40 blockchainovým uzlům
    - 40 tisíc bezplatných požadavků denně
    - Neomezený počet klíčů API
    - Vysoká rychlost připojení 1 GB/s
    - Sledování+archivace
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
    - Dedikované plné uzly
    - Rychlá synchronizace pro dedikovaná nasazení
    - Přímá podpora 24/7
    - Přístup k více než 50 blockchainovým uzlům

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
    - Bezplatná úroveň pro začátečníky
    - Nasazení uzlu Etherea na jedno kliknutí
    - Přizpůsobitelní klienti a algoritmy (Geth, Quorum a Besu || PoA, IBFT a Raft)
    - Více než 500 administrativních a servisních API
    - RESTful rozhraní pro odesílání transakcí Etherea (zajištěno Apache Kafka)
    - Odchozí streamy pro doručování událostí (zajištěno Apache Kafka)
    - Rozsáhlá sbírka „offchainových“ a doplňkových služeb (např. bilaterální přenos šifrovaných zpráv)
    - Jednoduché zprovoznění sítě se správou a řízením přístupu na základě rolí
    - Sofistikovaná správa uživatelů pro administrátory i koncové uživatele
    - Vysoce škálovatelná, odolná infrastruktura podnikové úrovně
    - Správa soukromých klíčů pomocí cloudového HSM
    - Propojení s hlavní sítí Etherea (tethering)
    - Certifikace ISO 27k a SOC 2, typ 2
    - Dynamická konfigurace za běhu (např. přidávání cloudových integrací, změna vstupních bodů uzlů atd.)
    - Podpora pro multi-cloudové, multi-regionální a hybridní orchestrace nasazení
    - Jednoduchá hodinová sazba na bázi SaaS
    - SLA a podpora 24/7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Dokumentace](https://docs.lavanet.xyz/)
  - Funkce
    - Bezplatné použití testnetu
    - Decentralizovaná redundance pro vysokou dostupnost
    - Open-source
    - Plně decentralizované SDK
    - Integrace s Ethers.js
    - Intuitivní rozhraní pro správu projektů
    - Integrita dat založená na konsensu
    - Podpora více řetězců

- [**Moralis**](https://moralis.io/)
  - [Dokumentace](https://docs.moralis.io/)
  - Funkce
    - Bezplatné sdílené uzly
    - Bezplatné sdílené archivní uzly
    - Zaměřeno na soukromí (zásada neukládání záznamů)
    - Podpora více řetězců
    - Škálování podle potřeby
    - Řídicí panel
    - Unikátní SDK pro Ethereum
    - Unikátní koncové body API
    - Přímá technická podpora

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentace](https://docs.nodereal.io/docs/introduction)
  - Funkce
    - Spolehlivé, rychlé a škálovatelné služby RPC API
    - Vylepšené API pro vývojáře web3
    - Podpora více řetězců
    - Začněte zdarma

- [**NOWNodes**](https://nownodes.io/)
  - [Dokumentace](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Funkce
    - Přístup k více než 50 blockchainovým uzlům
    - Bezplatný klíč API
    - Prohlížeče bloků
    - Doba odezvy API ⩽ 1 s
    - Tým podpory 24/7
    - Osobní správce účtu
    - Sdílené, archivní, záložní a dedikované uzly

- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentace](https://docs.pokt.network/home/)
  - Funkce
    - Decentralizovaný RPC protokol a tržiště
    - 1 milion požadavků denně v rámci bezplatné úrovně (na koncový bod, max. 2)
    - [Veřejné koncové body](https://docs.pokt.network/developers/public-endpoints)
    - Program Pre-Stake+ (pokud potřebujete více než 1 milion požadavků denně)
    - Podpora více než 15 blockchainů
    - Více než 6400 uzlů vydělávajících POKT za obsluhu aplikací
    - Podpora archivních uzlů, archivních uzlů se sledováním a uzlů testnetu
    - Diverzita klientů uzlů hlavní sítě Etherea
    - Žádný jediný bod selhání
    - Nulové prostoje
    - Cenově efektivní tokenomika s téměř nulovými náklady (jednou stakujte POKT za šířku pásma sítě)
    - Žádné měsíční utopené náklady, přeměňte svou infrastrukturu na aktivum
    - Vyrovnávání zátěže zabudované v protokolu
    - Nekonečné škálování počtu požadavků za den a uzlů za hodinu podle potřeby
    - Nejsoukromější a nejodolnější možnost proti cenzuře
    - Praktická podpora pro vývojáře
    - Řídicí panel a analytika [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Dokumentace](https://www.quicknode.com/docs/)
  - Funkce
    - Technická podpora 24/7 a vývojářská komunita na Discordu
    - Geograficky vyvážená síť s nízkou latencí, multi-cloud/metal
    - Podpora více řetězců (Optimism, Arbitrum, Polygon + 11 dalších)
    - Střední vrstvy pro rychlost a stabilitu (směrování volání, cache, indexování)
    - Monitorování chytrých kontraktů přes Webhooky
    - Intuitivní řídicí panel, sada analytických nástrojů, skladatel RPC
    - Pokročilé bezpečnostní funkce (JWT, maskování, whitelisting)
    - API pro NFT data a analytiku
    - [Certifikováno SOC2](https://www.quicknode.com/security)
    - Vhodné pro vývojáře i podniky

- [**Rivet**](https://rivet.cloud/)
  - [Dokumentace](https://rivet.readthedocs.io/en/latest/)
  - Funkce
    - Možnost bezplatné úrovně
    - Škálování podle potřeby

- [**SenseiNode**](https://senseinode.com)
  - [Dokumentace](https://docs.senseinode.com/)
  - Funkce
    - Dedikované a sdílené uzly
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
    - Dedikované plné uzly
    - Použití vlastního cloudu
    - Analytické nástroje
    - Řídicí panel
    - Hodinová sazba
    - Přímá podpora

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumentace](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Funkce
    - Bezplatná úroveň zahrnující 25 milionů jednotek Tenderly měsíčně
    - Bezplatný přístup k historickým datům
    - Až 8x rychlejší pracovní zátěž s velkým objemem čtení
    - 100% konzistentní přístup ke čtení
    - Koncové body JSON-RPC
    - Tvůrce požadavků RPC založený na uživatelském rozhraní a náhled požadavků
    - Úzce integrováno s vývojovými, ladicími a testovacími nástroji Tenderly
    - Simulace transakcí
    - Analytika použití a filtrování
    - Snadná správa přístupových klíčů
    - Dedikovaná technická podpora přes chat, e-mail a Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Dokumentace](https://services.tokenview.io/docs?type=nodeService)
  - Funkce
    - Technická podpora 24/7 a vývojářská komunita na Telegramu
    - Podpora více řetězců (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - K dispozici jsou koncové body RPC i WSS
    - Neomezený přístup k API pro archivní data
    - Řídicí panel s nástroji Request Explorer a Mempool Watcher
    - API pro NFT data a upozornění přes Webhook
    - Platba v kryptoměnách
    - Externí podpora pro další požadavky na chování

- [**Watchdata**](https://watchdata.io/)
  - [Dokumentace](https://docs.watchdata.io/)
  - Funkce
    - Spolehlivost dat
    - Nepřetržité připojení bez prostojů
    - Automatizace procesů
    - Bezplatné tarify
    - Vysoké limity, které vyhovují každému uživateli
    - Podpora různých uzlů
    - Škálování zdrojů
    - Vysoké rychlosti zpracování

- [**ZMOK**](https://zmok.io/)
  - [Dokumentace](https://docs.zmok.io/)
  - Funkce
    - Front-running jako služba
    - Globální mempool transakcí s metodami vyhledávání/filtrování
    - Neomezený poplatek za transakci a nekonečný gas pro odesílání transakcí
    - Nejrychlejší získání nového bloku a čtení z blockchainu
    - Záruka nejlepší ceny za volání API

- [**Zeeve**](https://www.zeeve.io/)
  - [Dokumentace](https://www.zeeve.io/docs/)
  - Funkce
    - Automatizační platforma podnikové třídy bez nutnosti kódování, která poskytuje nasazení, monitorování a správu blockchainových uzlů a sítí
    - Více než 30 podporovaných protokolů a integrací a další přibývají
    - Služby infrastruktury web3 s přidanou hodnotou, jako je decentralizované úložiště, decentralizovaná identita a API pro data z blockchainové účetní knihy pro reálné případy použití
    - Podpora 24/7 a proaktivní monitorování zajišťují neustálý bezproblémový stav uzlů.
    - Koncové body RPC nabízejí ověřený přístup k API, bezproblémovou správu s intuitivním řídicím panelem a analytikou.
    - Poskytuje možnost volby mezi spravovaným cloudem a vlastním cloudem a podporuje všechny hlavní poskytovatele cloudu, jako jsou AWS, Azure, Google Cloud, Digital Ocean a on-premise.
    - Používáme inteligentní směrování, abychom pokaždé zasáhli uzel nejblíže vašemu uživateli

## Další čtení {#further-reading}

- [Seznam služeb uzlů Etherea](https://ethereumnodes.com/)

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)

## Související návody {#related-tutorials}

- [Začínáme s vývojem na Ethereu pomocí Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Průvodce odesíláním transakcí pomocí web3 a Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
