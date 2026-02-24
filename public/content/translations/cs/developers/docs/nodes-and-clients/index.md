---
title: "Uzly a klienti"
description: "Přehled uzlů a klientského softwaru Etherea, plus jak nastavit uzel a proč byste to měli dělat."
lang: cs
sidebarDepth: 2
---

Ethereum je distribuovaná síť počítačů (známých jako uzly), na kterých běží software, jenž dokáže ověřovat bloky a transakční data. Tento software musí být spuštěn na vašem počítači, aby se z něj stal uzel sítě Ethereum. K vytvoření uzlu jsou zapotřebí dva samostatné softwarové programy (známé jako „klienti“).

## Předpoklady {#prerequisites}

Než se ponoříte hlouběji a spustíte si vlastní instanci klienta Etherea, měli byste rozumět konceptu peer-to-peer sítě a [základům EVM](/developers/docs/evm/). Podívejte se na náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

Pokud jste v problematice uzlů nováčkem, doporučujeme vám, abyste si nejprve přečetli náš uživatelsky přívětivý úvod na téma [provozování uzlu Etherea](/run-a-node).

## Co jsou uzly a klienti? {#what-are-nodes-and-clients}

„Uzel“ je jakákoli instance klientského softwaru Etherea, která je připojena k jiným počítačům, na nichž také běží software Etherea, a tvoří tak síť. Klient je implementace Etherea, která ověřuje data podle pravidel protokolu a udržuje síť bezpečnou. Uzel musí provozovat dva klienty: konsensuálního klienta a exekučního klienta.

- Exekuční klient (známý také jako exekuční engine, EL klient nebo dříve klient Eth1) naslouchá novým transakcím vysílaným v síti, provádí je v EVM a uchovává nejnovější stav a databázi všech aktuálních dat Etherea.
- Konsensuální klient (známý také jako Beacon Node, CL klient nebo dříve klient Eth2) implementuje konsensuální algoritmus proof-of-stake, který umožňuje síti dosáhnout shody na základě ověřených dat z exekučního klienta. Existuje také třetí softwarový program známý jako „validátor“, který lze přidat ke konsensuálnímu klientovi a který uzlu umožňuje podílet se na zabezpečení sítě.

Tito klienti spolupracují, aby sledovali čelo řetězce Etherea a umožnili uživatelům interakci se sítí Ethereum. Modulární návrh s více softwarovými programy, které spolupracují, se nazývá [zapouzdřená složitost](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Tento přístup usnadnil bezproblémové provedení [sloučení](/roadmap/merge), usnadňuje údržbu a vývoj klientského softwaru a umožňuje opětovné použití jednotlivých klientů, například v [ekosystému druhé vrstvy](/layer-2/).

![Propojené exekuční a konsensuální klienty](./eth1eth2client.png)
Zjednodušené schéma propojeného exekučního a konsensuálního klienta.

### Diverzita klientů {#client-diversity}

[Exekuční klienti](/developers/docs/nodes-and-clients/#execution-clients) i [konsensuální klienti](/developers/docs/nodes-and-clients/#consensus-clients) existují v různých programovacích jazycích a jsou vyvíjeni různými týmy.

Více implementací klientů může posílit síť tím, že se sníží její závislost na jediné kódové základně. Ideálním cílem je dosáhnout rozmanitosti, aniž by síti dominoval jediný klient, čímž se eliminuje potenciální jediný bod selhání.
Rozmanitost jazyků také láká širší komunitu vývojářů a umožňuje jim vytvářet integrace v jimi preferovaném jazyce.

Zjistěte více o [rozmanitosti klientů](/developers/docs/nodes-and-clients/client-diversity/).

Společným rysem těchto implementací je, že se všechny řídí jedinou specifikací. Specifikace určují, jak funguje síť Ethereum a její blockchain. Každý technický detail je definován a specifikace lze nalézt jako:

- Původně [Žlutá kniha Etherea](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Specifikace exekuce](https://github.com/ethereum/execution-specs/)
- [Specifikace konsensu](https://github.com/ethereum/consensus-specs)
- [EIP](https://eips.ethereum.org/) implementované v různých [vylepšeních sítě](/ethereum-forks/)

### Sledování uzlů v síti {#network-overview}

Několik trackerů nabízí přehled uzlů v síti Ethereum v reálném čase. Všimněte si, že vzhledem k povaze decentralizovaných sítí mohou tyto crawlery poskytovat pouze omezený pohled na síť a mohou hlásit různé výsledky.

- [Mapa uzlů](https://etherscan.io/nodetracker) od Etherscanu
- [Ethernodes](https://ethernodes.org/) od Bitfly
- [Nodewatch](https://www.nodewatch.io/) od Chainsafe, prochází konsensuální uzly
- [Monitoreth](https://monitoreth.io/) – od MigaLabs, distribuovaný nástroj pro monitorování sítě
- [Weekly Network Health Reports](https://probelab.io) – od ProbeLab, s využitím crawleru [Nebula](https://github.com/dennis-tra/nebula) a dalších nástrojů

## Typy uzlů {#node-types}

Chcete-li si [spustit vlastní uzel](/developers/docs/nodes-and-clients/run-a-node/), měli byste pochopit, že existují různé typy uzlů, které spotřebovávají data odlišně. Klienti mohou provozovat tři různé typy uzlů: lehké, plné a archivní. Existují také možnosti různých synchronizačních strategií, které umožňují rychlejší synchronizaci. Synchronizace se vztahuje k tomu, jak rychle dokáže získat nejaktuálnější informace o stavu Etherea.

### Plný uzel {#full-node}

Plné uzly provádějí validaci blockchainu blok po bloku, včetně stahování a ověřování těla bloku a stavových dat pro každý blok. Existují různé třídy plných uzlů – některé začínají od genesis bloku a ověřují každý jednotlivý blok v celé historii blockchainu. Jiné začínají ověřování od novějšího bloku, který považují za platný (např. 'snap sync' klienta Geth). Bez ohledu na to, kde ověření začíná, plné uzly uchovávají pouze lokální kopii relativně nedávných dat (typicky posledních 128 bloků), což umožňuje smazat starší data a ušetřit tak místo na disku. Starší data mohou být v případě potřeby znovu vygenerována.

- Ukládá kompletní data blockchainu (ačkoli jsou pravidelně prořezávána, takže plný uzel neukládá všechna stavová data až po genesis blok)
- Účastní se validace bloků, ověřuje všechny bloky a stavy.
- Všechny stavy mohou být buď načteny z lokálního úložiště, nebo znovu vygenerovány ze 'snímků' plným uzlem.
- Slouží síti a poskytuje data na vyžádání.

### Archivní uzel {#archive-node}

Archivní uzly jsou plné uzly, které ověřují každý blok od genesis bloku a nikdy nemažou žádná stažená data.

- Ukládá vše, co je uchováváno v plném uzlu, a vytváří archiv historických stavů. Je zapotřebí, pokud chcete zjistit například zůstatek na účtu v bloku č. 4 000 000 nebo jednoduše a spolehlivě otestovat vlastní sadu transakcí bez jejich ověřování pomocí trasování.
- Tato data představují jednotky terabajtů, což činí archivní uzly méně atraktivními pro běžné uživatele, ale mohou být užitečné pro služby jako jsou prohlížeče bloků, poskytovatelé peněženek a analytika řetězce.

Synchronizace klientů v jakémkoli jiném režimu než archivním bude mít za následek prořezaná data blockchainu. To znamená, že neexistuje archiv všech historických stavů, ale plný uzel je schopen je na vyžádání vytvořit.

Zjistěte více o [archivních uzlech](/developers/docs/nodes-and-clients/archive-nodes).

### Lehký uzel {#light-node}

Místo stahování každého bloku stahují lehké uzly pouze hlavičky bloků. Tyto hlavičky obsahují souhrnné informace o obsahu bloků. Jakékoli další informace, které lehký uzel potřebuje, si vyžádá od plného uzlu. Lehký uzel pak může nezávisle ověřit data, která obdrží, oproti kořenům stavu v hlavičkách bloků. Lehké uzly umožňují uživatelům účastnit se sítě Ethereum bez výkonného hardwaru nebo vysoké šířky pásma potřebné k provozu plných uzlů. Časem by lehké uzly mohly běžet na mobilních telefonech nebo vestavěných zařízeních. Lehké uzly se neúčastní konsensu (tzn. nemohou být validátory), ale mohou přistupovat k blockchainu Etherea se stejnou funkčností a bezpečnostními zárukami jako plný uzel.

Lehcí klienti jsou oblastí aktivního vývoje Etherea a očekáváme, že brzy uvidíme nové lehké klienty pro konsensuální a exekuční vrstvu.
Existují také potenciální cesty k poskytování dat lehkých klientů přes [gossip síť](https://www.ethportal.net/). To je výhodné, protože gossip síť by mohla podporovat síť lehkých uzlů, aniž by vyžadovala plné uzly pro obsluhu požadavků.

Ethereum zatím nepodporuje velkou populaci lehkých uzlů, ale podpora lehkých uzlů je oblast, u které se v blízké budoucnosti očekává rychlý rozvoj. Zejména klienti jako [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) a [LodeStar](https://lodestar.chainsafe.io/) se v současné době silně zaměřují na lehké uzly.

## Proč bych měl provozovat uzel sítě Ethereum? {#why-should-i-run-an-ethereum-node}

Provozování uzlu vám umožňuje přímo, bez nutnosti důvěry a soukromě používat Ethereum a zároveň podporovat síť tím, že ji udržujete robustnější a decentralizovanější.

### Výhody pro vás {#benefits-to-you}

Provozování vlastního uzlu vám umožňuje používat Ethereum soukromým, soběstačným způsobem bez nutnosti důvěry. Nemusíte důvěřovat síti, protože si data můžete sami ověřit pomocí svého klienta. „Nedůvěřuj, ověřuj“ je populární mantra blockchainu.

- Váš uzel sám ověřuje všechny transakce a bloky podle pravidel konsensu. To znamená, že se nemusíte spoléhat na žádné jiné uzly v síti ani jim plně důvěřovat.
- S vlastním uzlem můžete používat peněženku Ethereum. Aplikace dApps můžete používat bezpečněji a soukroměji, protože nebudete muset prozrazovat své adresy a zůstatky zprostředkovatelům. Vše lze zkontrolovat pomocí vlastního klienta. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) a [mnoho dalších peněženek](/wallets/find-wallet/) nabízejí import RPC, což jim umožňuje používat váš uzel.
- Můžete spouštět a sami hostovat další služby, které závisí na datech z Etherea. Může se jednat například o validátor Beacon Chain, software jako druhá vrstva, infrastrukturu, prohlížeče bloků, zpracovatele plateb atd.
- Můžete poskytovat vlastní [koncové body RPC](/developers/docs/apis/json-rpc/). Tyto koncové body můžete dokonce veřejně nabídnout komunitě, abyste jim pomohli vyhnout se velkým centralizovaným poskytovatelům.
- K uzlu se můžete připojit pomocí **meziprocesové komunikace (IPC)** nebo přepsat uzel tak, aby se váš program načetl jako plugin. To zaručuje nízkou latenci, což hodně pomáhá, např. při zpracování velkého množství dat pomocí knihoven web3 nebo když potřebujete co nejrychleji nahradit své transakce (tj. frontrunning).
- Můžete přímo stakovat ETH, abyste zabezpečili síť a získali odměny. Pro začátek se podívejte na [sólo stakování](/staking/solo/).

![Jak přistupujete k Ethereu prostřednictvím své aplikace a uzlů](./nodes.png)

### Výhody sítě {#network-benefits}

Rozmanitá sada uzlů je důležitá pro zdraví, bezpečnost a provozní odolnost Etherea.

- Plné uzly vynucují pravidla konsensu, takže je nelze oklamat, aby přijímaly bloky, které je nedodržují. To poskytuje dodatečnou bezpečnost v síti, protože pokud by všechny uzly byly lehké uzly, které neprovádějí úplné ověření, mohli by validátoři na síť zaútočit.
- V případě útoku, který překoná kryptoekonomickou obranu [důkazu podílem](/developers/docs/consensus-mechanisms/pos/#what-is-pos), mohou plné uzly provést sociální obnovu tím, že se rozhodnou následovat poctivý řetězec.
- Více uzlů v síti vede k rozmanitější a robustnější síti, což je konečným cílem decentralizace, která umožňuje systém odolný vůči cenzuře a spolehlivý.
- Plné uzly poskytují přístup k datům blockchainu pro lehké klienty, kteří na nich závisí. Lehké uzly neukládají celý blockchain, místo toho ověřují data prostřednictvím [kořenů stavu v hlavičkách bloků](/developers/docs/blocks/#block-anatomy). V případě potřeby si mohou od plných uzlů vyžádat více informací.

Pokud provozujete plný uzel, prospívá to celé síti Ethereum, i když neprovozujete validátor.

## Provozování vlastního uzlu {#running-your-own-node}

Máte zájem o spuštění vlastního klienta Etherea?

Pro začátečnický úvod navštivte naši stránku [spustit uzel](/run-a-node) a dozvíte se více.

Pokud jste technicky zdatnější uživatel, ponořte se do podrobností a možností, jak [spustit vlastní uzel](/developers/docs/nodes-and-clients/run-a-node/).

## Alternativy {#alternatives}

Nastavení vlastního uzlu vás může stát čas a zdroje, ale ne vždy potřebujete provozovat vlastní instanci. V tomto případě můžete použít poskytovatele API třetí strany. Přehled použití těchto služeb najdete na stránce [uzly jako služba](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Pokud někdo ve vaší komunitě provozuje uzel Etherea s veřejným API, můžete své peněženky nasměrovat na komunitní uzel přes vlastní RPC a získat tak více soukromí než u nějaké náhodné důvěryhodné třetí strany.

Na druhou stranu, pokud provozujete klienta, můžete jej sdílet se svými přáteli, kteří by jej mohli potřebovat.

## Exekuční klienti {#execution-clients}

Komunita Etherea udržuje několik open-source exekučních klientů (dříve známých jako „klienti Eth1“ nebo jen „klienti Etherea“), vyvinutých různými týmy v různých programovacích jazycích. Díky tomu je síť silnější a [rozmanitější](/developers/docs/nodes-and-clients/client-diversity/). Ideálním cílem je dosáhnout rozmanitosti, aniž by síti dominoval jediný klient, čímž se omezí jednotlivé body selhání.

Tato tabulka shrnuje různé klienty. Všichni procházejí [testy klientů](https://github.com/ethereum/tests) a jsou aktivně udržováni, aby byli aktuální s vylepšeními sítě.

| Klient                                                                                      | Jazyk                    | Operační systémy      | Sítě                    | Strategie synchronizace                                                          | Prořezávání stavu   |
| ------------------------------------------------------------------------------------------- | ------------------------ | --------------------- | ----------------------- | -------------------------------------------------------------------------------- | ------------------- |
| [Geth](https://geth.ethereum.org/)                                                          | Go                       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Úplná](#full-sync)                                          | Archivní, Prořezaný |
| [Nethermind](https://www.nethermind.io/)                                                    | C#, .NET | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync) (bez obsluhy), Rychlá, [Úplná](#full-sync) | Archivní, Prořezaný |
| [Besu](https://besu.hyperledger.org/en/stable/)                                             | Java                     | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Rychlá](#fast-sync), [Úplná](#full-sync)                    | Archivní, Prořezaný |
| [Erigon](https://github.com/ledgerwatch/erigon)                                             | Go                       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Úplná](#full-sync)                                                              | Archivní, Prořezaný |
| [Reth](https://reth.rs/)                                                                    | Rust                     | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Úplná](#full-sync)                                                              | Archivní, Prořezaný |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript               | Linux, Windows, macOS | Sepolia, Hoodi          | [Úplná](#full-sync)                                                              | Prořezaný           |

Více informací o podporovaných sítích naleznete na stránce [sítě Etherea](/developers/docs/networks/).

Každý klient má jedinečné případy použití a výhody, takže byste si měli vybrat podle svých vlastních preferencí. Rozmanitost umožňuje, aby se implementace zaměřovaly na různé funkce a skupiny uživatelů. Klienta si můžete vybrat na základě funkcí, podpory, programovacího jazyka nebo licencí.

### Besu {#besu}

Hyperledger Besu je klient Etherea podnikové třídy pro veřejné sítě a sítě s oprávněními. Provozuje všechny funkce Ethereum Mainnet, od trasování po GraphQL, má rozsáhlé monitorování a je podporován společností ConsenSys, a to jak v otevřených komunitních kanálech, tak prostřednictvím komerčních SLA pro podniky. Je napsán v jazyce Java a licencován pod Apache 2.0.

Rozsáhlá [dokumentace](https://besu.hyperledger.org/en/stable/) klienta Besu vás provede všemi podrobnostmi o jeho funkcích a nastaveních.

### Erigon {#erigon}

Erigon, dříve známý jako Turbo-Geth, začal jako větev Go Ethereum zaměřená na rychlost a efektivitu využití diskového prostoru. Erigon je kompletně přepracovaná implementace Etherea, v současné době napsaná v jazyce Go, ale s implementacemi v dalších jazycích ve vývoji. Cílem Erigonu je poskytnout rychlejší, modulárnější a optimalizovanější implementaci Etherea. Dokáže provést plnou synchronizaci archivního uzlu s využitím přibližně 2 TB místa na disku za méně než 3 dny.

### Go Ethereum {#geth}

Go Ethereum (zkráceně Geth) je jednou z původních implementací protokolu Ethereum. V současné době je to nejrozšířenější klient s největší uživatelskou základnou a rozmanitostí nástrojů pro uživatele a vývojáře. Je napsán v jazyce Go, je plně open-source a licencován pod GNU LGPL v3.

Zjistěte více o Gethu v jeho [dokumentaci](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind je implementace Etherea vytvořená pomocí technologického stacku C# .NET, licencovaná pod LGPL-3.0 a běžící na všech hlavních platformách včetně ARM. Nabízí skvělý výkon s:

- optimalizovaným virtuálním strojem
- přístupem ke stavu
- sítěmi a bohatými funkcemi, jako jsou dashboardy Prometheus/Grafana, podpora podnikového protokolování seq, trasování JSON-RPC a analytické pluginy.

Nethermind má také [podrobnou dokumentaci](https://docs.nethermind.io), silnou vývojářskou podporu, online komunitu a podporu 24/7 dostupnou pro prémiové uživatele.

### Reth {#reth}

Reth (zkratka pro Rust Ethereum) je implementace plného uzlu Etherea, která je zaměřena na uživatelskou přívětivost, vysokou modularitu, rychlost a efektivitu. Reth byl původně vytvořen a poháněn společností Paradigm a je licencován pod licencemi Apache a MIT.

Reth je připraven pro produkční nasazení a je vhodný pro použití v kriticky důležitých prostředích, jako je stakování nebo služby s vysokou dostupností. Dobře si vede v případech použití, kde je vyžadován vysoký výkon s velkými rezervami, jako jsou RPC, MEV, indexování, simulace a P2P aktivity.

Zjistěte více v [Reth Book](https://reth.rs/) nebo v [repozitáři Reth na GitHubu](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Ve vývoji {#execution-in-development}

Tito klienti jsou stále v raných fázích vývoje a zatím se nedoporučují pro produkční použití.

#### EthereumJS {#ethereumjs}

Exekuční klient EthereumJS (EthereumJS) je napsán v TypeScriptu a skládá se z řady balíčků, včetně základních primitiv Etherea reprezentovaných třídami Block, Transaction a Merkle-Patricia Trie a základních komponent klienta, včetně implementace Ethereum Virtual Machine (EVM), třídy blockchainu a síťového stacku DevP2P.

Zjistěte více v jeho [dokumentaci](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Konsensuální klienti {#consensus-clients}

Existuje několik konsensuálních klientů (dříve známých jako klienti „Eth2“), kteří podporují [vylepšení konsensu](/roadmap/beacon-chain/). Jsou zodpovědní za veškerou logiku související s konsensem, včetně algoritmu volby větve, zpracování atestací a správy odměn a penalizací [důkazu podílem](/developers/docs/consensus-mechanisms/pos).

| Klient                                                        | Jazyk      | Operační systémy      | Sítě                                                  |
| ------------------------------------------------------------- | ---------- | --------------------- | ----------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Pyrmont, Sepolia a další         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia a další                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia a další                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Pyrmont, Sepolia a další |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Sepolia a další          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia a další                  |

### Lighthouse {#lighthouse}

Lighthouse je implementace konsensuálního klienta napsaná v Rustu pod licencí Apache-2.0. Je udržován společností Sigma Prime a je stabilní a připravený k produkčnímu nasazení od genesis bloku Beacon Chainu. Spoléhají na něj různé podniky, stakovací pooly a jednotlivci. Jeho cílem je být bezpečný, výkonný a interoperabilní v široké škále prostředí, od stolních PC až po sofistikovaná automatizovaná nasazení.

Dokumentaci naleznete v [Lighthouse Book](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar je produkčně připravená implementace konsensuálního klienta napsaná v Typescriptu pod licencí LGPL-3.0. Je udržován společností ChainSafe Systems a je nejnovějším z konsensuálních klientů pro sólo stakery, vývojáře a výzkumníky. Lodestar se skládá z beacon uzlu a klienta validátoru poháněného implementacemi protokolů Etherea v JavaScriptu. Lodestar si klade za cíl zlepšit použitelnost Etherea pomocí lehkých klientů, rozšířit dostupnost pro větší skupinu vývojářů a dále přispět k rozmanitosti ekosystému.

Více informací naleznete na [webu Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus je implementace konsensuálního klienta napsaná v jazyce Nim pod licencí Apache-2.0. Je to produkčně připravený klient, který používají sólo stakeři a stakovací pooly. Nimbus je navržen pro efektivní využití zdrojů, což usnadňuje jeho provoz na zařízeních s omezenými zdroji i na podnikové infrastruktuře se stejnou lehkostí, aniž by byla ohrožena stabilita nebo výkon odměn. Menší náročnost na zdroje znamená, že klient má větší bezpečnostní rezervu, když je síť pod tlakem.

Zjistěte více v [dokumentaci Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm je plně funkční open-source konsensuální klient napsaný v Go pod licencí GPL-3.0. Obsahuje volitelné webové uživatelské rozhraní a upřednostňuje uživatelský zážitek, dokumentaci a konfigurovatelnost jak pro domácí stakery, tak pro institucionální uživatele.

Navštivte [dokumentaci Prysm](https://prysm.offchainlabs.com/docs/) a dozvíte se více.

### Teku {#teku}

Teku je jedním z původních klientů z doby genesis Beacon Chainu. Kromě obvyklých cílů (bezpečnost, robustnost, stabilita, použitelnost, výkon) se Teku specificky snaží plně vyhovět všem různým standardům pro konsensuální klienty.

Teku nabízí velmi flexibilní možnosti nasazení. Beacon uzel a klient validátoru mohou být spuštěny společně jako jeden proces, což je mimořádně pohodlné pro sólo stakery, nebo mohou být uzly spuštěny samostatně pro sofistikované stakovací operace. Kromě toho je Teku plně interoperabilní s [Web3Signer](https://github.com/ConsenSys/web3signer/) pro zabezpečení podpisových klíčů a ochranu proti slashingu.

Teku je napsán v jazyce Java a licencován pod Apache 2.0. Je vyvíjen týmem Protocols v ConsenSys, který je také zodpovědný za Besu a Web3Signer. Zjistěte více v [dokumentaci Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine je implementace konsensuálního klienta, napsaná v Rustu pod licencí GPL-3.0. Je udržován týmem Grandine Core a je rychlý, výkonný a lehký. Vyhovuje široké škále stakerů od sólo stakerů běžících na zařízeních s nízkými zdroji, jako je Raspberry Pi, až po velké institucionální stakery provozující desítky tisíc validátorů.

Dokumentaci naleznete v [Grandine Book](https://docs.grandine.io/)

## Režimy synchronizace {#sync-modes}

Aby mohl klient Etherea sledovat a ověřovat aktuální data v síti, musí se synchronizovat s nejnovějším stavem sítě. To se provádí stahováním dat od peerů, kryptografickým ověřováním jejich integrity a budováním lokální databáze blockchainu.

Režimy synchronizace představují různé přístupy k tomuto procesu s různými kompromisy. Klienti se také liší v implementaci synchronizačních algoritmů. Vždy se obraťte na oficiální dokumentaci vámi zvoleného klienta pro specifika implementace.

### Režimy synchronizace exekuční vrstvy {#execution-layer-sync-modes}

Exekuční vrstva může být spuštěna v různých režimech, aby vyhovovala různým případům použití, od opětovného provedení světového stavu blockchainu až po synchronizaci pouze s čelem řetězce z důvěryhodného checkpointu.

#### Úplná synchronizace {#full-sync}

Úplná synchronizace stahuje všechny bloky (včetně hlaviček a těl bloků) a postupně regeneruje stav blockchainu prováděním každého bloku od genesis bloku.

- Minimalizuje důvěru a nabízí nejvyšší bezpečnost ověřováním každé transakce.
- S rostoucím počtem transakcí může zpracování všech transakcí trvat dny až týdny.

[Archivní uzly](#archive-node) provádějí úplnou synchronizaci, aby vytvořily (a uchovaly) kompletní historii změn stavu provedených každou transakcí v každém bloku.

#### Rychlá synchronizace {#fast-sync}

Stejně jako úplná synchronizace, i rychlá synchronizace stahuje všechny bloky (včetně hlaviček, transakcí a potvrzení). Místo opětovného zpracování historických transakcí se však rychlá synchronizace spoléhá na potvrzení, dokud nedosáhne nedávného čela, kdy přejde na import a zpracování bloků, aby poskytla plný uzel.

- Strategie rychlé synchronizace.
- Snižuje nároky na zpracování ve prospěch využití šířky pásma.

#### Snap synchronizace {#snap-sync}

Snap synchronizace také ověřují řetězec blok po bloku. Místo toho, aby začala od genesis bloku, snap synchronizace začíná od novějšího „důvěryhodného“ checkpointu, o kterém je známo, že je součástí skutečného blockchainu. Uzel ukládá periodické checkpointy a zároveň maže data starší než určitý věk. Tyto snímky se používají k regeneraci stavových dat podle potřeby, místo aby se ukládala navždy.

- Nejrychlejší strategie synchronizace, v současnosti výchozí v Ethereum Mainnet.
- Šetří velké množství místa na disku a šířky pásma sítě bez obětování bezpečnosti.

[Více o snap synchronizaci](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Lehká synchronizace {#light-sync}

Režim lehkého klienta stahuje všechny hlavičky bloků, data bloků a náhodně některé ověřuje. Synchronizuje pouze čelo řetězce z důvěryhodného checkpointu.

- Získává pouze nejnovější stav a spoléhá na důvěru ve vývojáře a mechanismus konsensu.
- Klient je připraven k použití s aktuálním stavem sítě během několika minut.

**Pozn.** Lehká synchronizace zatím nefunguje s Ethereem proof-of-stake – nové verze lehké synchronizace by měly být brzy k dispozici!

[Více o lehkých klientech](/developers/docs/nodes-and-clients/light-clients/)

### Režimy synchronizace konsensuální vrstvy {#consensus-layer-sync-modes}

#### Optimistická synchronizace {#optimistic-sync}

Optimistická synchronizace je strategie synchronizace po sloučení, navržená tak, aby byla volitelná a zpětně kompatibilní, což umožňuje exekučním uzlům synchronizovat se zavedenými metodami. Exekuční engine může _optimisticky_ importovat beacon bloky, aniž by je plně ověřoval, najít nejnovější čelo a poté začít synchronizovat řetězec výše uvedenými metodami. Poté, co se exekuční klient dostane do synchronizace, bude informovat konsensuálního klienta o platnosti transakcí v Beacon Chainu.

[Více o optimistické synchronizaci](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Synchronizace z checkpointu {#checkpoint-sync}

Synchronizace z checkpointu, známá také jako synchronizace slabé subjektivity, vytváří vynikající uživatelský zážitek pro synchronizaci Beacon uzlu. Je založena na předpokladech [slabé subjektivity](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/), což umožňuje synchronizaci Beacon Chainu z nedávného checkpointu slabé subjektivity místo z genesis bloku. Synchronizace z checkpointu výrazně zrychlují počáteční dobu synchronizace s podobnými předpoklady důvěry jako synchronizace z [genesis bloku](/glossary/#genesis-block).

V praxi to znamená, že se váš uzel připojí ke vzdálené službě, aby si stáhl nedávné finalizované stavy a od tohoto bodu pokračoval v ověřování dat. Třetí strana poskytující data je důvěryhodná a měla by být pečlivě vybrána.

Více o [synchronizaci z checkpointu](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Další čtení {#further-reading}

- [Ethereum 101 – Část 2 – Porozumění uzlům](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13. února 2019_
- [Provozování plných uzlů Ethereum: Příručka pro sotva motivované](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7. listopadu 2019_

## Související témata {#related-topics}

- [Bloky](/developers/docs/blocks/)
- [Sítě](/developers/docs/networks/)

## Související návody {#related-tutorials}

- [Proměňte své Raspberry Pi 4 na uzel validátoru pouhým flashnutím microSD karty – Instalační příručka](/developers/tutorials/run-node-raspberry-pi/) _– Flashněte své Raspberry Pi 4, zapojte ethernetový kabel, připojte SSD disk a zapněte zařízení, abyste z Raspberry Pi 4 udělali plný uzel Etherea provozující exekuční vrstvu (Mainnet) a/nebo konsensuální vrstvu (Beacon Chain / validátor)._
