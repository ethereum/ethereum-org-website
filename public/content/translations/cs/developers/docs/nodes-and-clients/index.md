---
title: Uzly a klienti
description: Přehled uzlů a klientského softwaru Etherea, a také jak nastavit uzel a proč byste to měli udělat.
lang: cs
sidebarDepth: 2
---

[Ethereum](/) je distribuovaná síť počítačů (známých jako uzly), na kterých běží software schopný ověřovat bloky a data transakcí. Tento software musí běžet na vašem počítači, aby se z něj stal uzel Etherea. K vytvoření uzlu jsou zapotřebí dva samostatné softwary (známé jako „klienti“).

## Předpoklady {#prerequisites}

Než se ponoříte hlouběji a spustíte vlastní instanci klienta Etherea, měli byste rozumět konceptu peer-to-peer sítě a [základům EVM](/developers/docs/evm/). Podívejte se na náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

Pokud je pro vás téma uzlů nové, doporučujeme si nejprve přečíst náš uživatelsky přívětivý úvod o [provozování uzlu Etherea](/run-a-node).

## Co jsou uzly a klienti? {#what-are-nodes-and-clients}

„Uzel“ je jakákoli instance klientského softwaru Etherea, která je připojena k dalším počítačům, na kterých také běží software Etherea, čímž tvoří síť. Klient je implementace Etherea, která ověřuje data podle pravidel protokolu a udržuje síť v bezpečí. Uzel musí provozovat dva klienty: konsensuální klient a exekuční klient.

- Exekuční klient (známý také jako Execution Engine, EL klient nebo dříve klient Eth1) naslouchá novým transakcím vysílaným v síti, provádí je v EVM a uchovává nejnovější stav a databázi všech aktuálních dat Etherea.
- Konsensuální klient (známý také jako uzel Beacon, CL klient nebo dříve klient Eth2) implementuje algoritmus konsensu důkaz podílem (PoS), který umožňuje síti dosáhnout shody na základě ověřených dat od exekučního klienta. Existuje také třetí část softwaru, známá jako „validátor“, kterou lze přidat ke konsensuálnímu klientovi, což uzlu umožňuje podílet se na zabezpečení sítě.

Tito klienti spolupracují na sledování vrcholu řetězce Etherea a umožňují uživatelům komunikovat se sítí Etherea. Modulární design s více spolupracujícími softwary se nazývá [zapouzdřená složitost](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Tento přístup usnadnil bezproblémové provedení [Merge](/roadmap/merge), usnadňuje údržbu a vývoj klientského softwaru a umožňuje opětovné použití jednotlivých klientů, například v [ekosystému vrstvy 2 (l2)](/layer-2/).

![Coupled execution and consensus clients](./eth1eth2client.png)
Zjednodušený diagram propojeného exekučního a konsensuálního klienta.

### Klientská diverzita {#client-diversity}

Jak [exekuční klienti](/developers/docs/nodes-and-clients/#execution-clients), tak [konsensuální klienti](/developers/docs/nodes-and-clients/#consensus-clients) existují v různých programovacích jazycích a jsou vyvíjeni různými týmy.

Více implementací klientů může posílit síť tím, že sníží její závislost na jediné kódové základně. Ideálním cílem je dosáhnout diverzity bez toho, aby jakýkoli klient dominoval síti, čímž se eliminuje potenciální jediný bod selhání.
Rozmanitost jazyků také přitahuje širší komunitu vývojářů a umožňuje jim vytvářet integrace v jejich preferovaném jazyce.

Přečtěte si více o [klientské diverzitě](/developers/docs/nodes-and-clients/client-diversity/).

Společným rysem těchto implementací je, že se všechny řídí jedinou specifikací. Specifikace určují, jak funguje síť a blockchain Etherea. Každý technický detail je definován a specifikace lze nalézt jako:

- Původně [Yellow Paper Etherea](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Exekuční specifikace](https://github.com/ethereum/execution-specs/)
- [Specifikace konsensu](https://github.com/ethereum/consensus-specs)
- [EIP](https://eips.ethereum.org/) implementované v různých [upgradech sítě](/ethereum-forks/)

### Sledování uzlů v síti {#network-overview}

Několik trackerů nabízí přehled uzlů v síti Etherea v reálném čase. Vezměte na vědomí, že vzhledem k povaze decentralizovaných sítí mohou tyto crawlery poskytnout pouze omezený pohled na síť a mohou hlásit odlišné výsledky.

- [Mapa uzlů](https://etherscan.io/nodetracker) od Etherscan
- [Ethernodes](https://ethernodes.org/) od Bitfly
- [Nodewatch](https://www.nodewatch.io/) od Chainsafe, prohledávající konsensuální uzly
- [Monitoreth](https://monitoreth.io/) - od MigaLabs, nástroj pro monitorování distribuované sítě
- [Týdenní zprávy o stavu sítě](https://probelab.io) - od ProbeLab, využívající [crawler Nebula](https://github.com/dennis-tra/nebula) a další nástroje

## Typy uzlů {#node-types}

Pokud chcete [provozovat vlastní uzel](/developers/docs/nodes-and-clients/run-a-node/), měli byste pochopit, že existují různé typy uzlů, které zpracovávají data odlišně. Klienti mohou ve skutečnosti provozovat tři různé typy uzlů: lehký, plný a archivní. Existují také možnosti různých strategií synchronizace, které umožňují rychlejší čas synchronizace. Synchronizace se týká toho, jak rychle dokáže získat nejaktuálnější informace o stavu Etherea.

### Plný uzel {#full-node}

Plné uzly provádějí validaci bloku po bloku v blockchainu, včetně stahování a ověřování těla bloku a dat stavu pro každý blok. Existují různé třídy plných uzlů – některé začínají od genesis bloku a ověřují každý jednotlivý blok v celé historii blockchainu. Jiné začínají své ověřování u novějšího bloku, o kterém věří, že je platný (např. „snap sync“ u Geth). Bez ohledu na to, kde ověřování začíná, plné uzly uchovávají pouze lokální kopii relativně nedávných dat (obvykle posledních 128 bloků), což umožňuje smazání starších dat pro úsporu místa na disku. Starší data lze v případě potřeby znovu vygenerovat.

- Ukládá úplná data blockchainu (ačkoli jsou pravidelně prořezávána, takže plný uzel neukládá všechna data stavu až k genesis bloku).
- Účastní se validace bloku, ověřuje všechny bloky a stavy.
- Všechny stavy lze buď načíst z lokálního úložiště, nebo je plný uzel může znovu vygenerovat ze „snímků“ (snapshots).
- Slouží síti a poskytuje data na vyžádání.

### Archivní uzel {#archive-node}

Archivní uzly jsou plné uzly, které ověřují každý blok od genesis bloku a nikdy nemažou žádná ze stažených dat.

- Ukládá vše, co je uchováváno v plném uzlu, a buduje archiv historických stavů. Je to potřeba, pokud chcete dotazovat něco jako zůstatek na účtu v bloku #4 000 000, nebo jednoduše a spolehlivě otestovat vlastní sadu transakcí bez jejich ověřování pomocí trasování.
- Tato data představují jednotky terabajtů, což činí archivní uzly méně atraktivními pro běžné uživatele, ale mohou být užitečné pro služby, jako jsou průzkumníci bloků, poskytovatelé peněženek a analytika řetězce.

Synchronizace klientů v jakémkoli jiném režimu než archivním povede k prořezaným datům blockchainu. To znamená, že neexistuje žádný archiv všech historických stavů, ale plný uzel je schopen je na požádání vytvořit.

Přečtěte si více o [archivních uzlech](/developers/docs/nodes-and-clients/archive-nodes).

### Lehký uzel {#light-node}

Místo stahování každého bloku stahují lehké uzly pouze hlavičky bloků. Tyto hlavičky obsahují souhrnné informace o obsahu bloků. Jakékoli další informace, které lehký uzel vyžaduje, jsou vyžádány od plného uzlu. Lehký uzel pak může nezávisle ověřit přijatá data proti kořenům stavu v hlavičkách bloků. Lehké uzly umožňují uživatelům účastnit se sítě Etherea bez výkonného hardwaru nebo velké šířky pásma potřebné k provozování plných uzlů. Nakonec by lehké uzly mohly běžet na mobilních telefonech nebo vestavěných zařízeních. Lehké uzly se neúčastní konsensu (tj. nemohou být validátory), ale mohou přistupovat k blockchainu Etherea se stejnou funkcionalitou a bezpečnostními zárukami jako plný uzel.

Lehcí klienti jsou oblastí aktivního vývoje pro Ethereum a očekáváme, že brzy uvidíme nové lehké klienty pro vrstvu konsensu a exekuční vrstvu.
Existují také potenciální cesty k poskytování dat lehkých klientů přes [gossip síť](https://www.ethportal.net/). To je výhodné, protože gossip síť by mohla podporovat síť lehkých uzlů, aniž by vyžadovala, aby plné uzly obsluhovaly požadavky.

Ethereum zatím nepodporuje velkou populaci lehkých uzlů, ale podpora lehkých uzlů je oblastí, u které se očekává rychlý rozvoj v blízké budoucnosti. Zejména klienti jako [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) a [Lodestar](https://lodestar.chainsafe.io/) se v současnosti silně zaměřují na lehké uzly.

## Proč bych měl provozovat uzel Etherea? {#why-should-i-run-an-ethereum-node}

Provozování uzlu vám umožňuje používat Ethereum přímo, v soukromí a bez nutnosti důvěry, a zároveň podporovat síť tím, že ji udržujete robustnější a decentralizovanější.

### Výhody pro vás {#benefits-to-you}

Provozování vlastního uzlu vám umožňuje používat Ethereum soukromým, soběstačným způsobem nevyžadujícím důvěru. Nemusíte síti důvěřovat, protože si data můžete ověřit sami pomocí svého klienta. „Nedůvěřuj, prověřuj“ je populární mantra blockchainu.

- Váš uzel sám ověřuje všechny transakce a bloky podle pravidel konsenzu. To znamená, že se nemusíte spoléhat na žádné jiné uzly v síti ani jim plně důvěřovat.
- S vlastním uzlem můžete používat peněženku Etherea. Můžete používat decentralizované aplikace (dapps) bezpečněji a s větším soukromím, protože nebudete muset odhalovat své adresy a zůstatky zprostředkovatelům. Vše lze zkontrolovat pomocí vašeho vlastního klienta. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) a [mnoho dalších peněženek](/wallets/find-wallet/) nabízí import RPC, což jim umožňuje používat váš uzel.
- Můžete provozovat a sami hostovat další služby, které závisí na datech z Etherea. Může to být například validátor Beacon chainu, software jako vrstva 2 (l2), infrastruktura, průzkumníci bloků, platební procesory atd.
- Můžete poskytovat své vlastní [RPC koncové body](/developers/docs/apis/json-rpc/). Tyto koncové body byste dokonce mohli nabídnout veřejně komunitě, abyste jí pomohli vyhnout se velkým centralizovaným poskytovatelům.
- Ke svému uzlu se můžete připojit pomocí **meziprocesové komunikace (IPC)** nebo uzel přepsat tak, aby načítal váš program jako plugin. To zaručuje nízkou latenci, což velmi pomáhá např. při zpracování velkého množství dat pomocí knihoven Web3 nebo když potřebujete nahradit své transakce co nejrychleji (tj. frontrunning).
- Můžete přímo stakovat ETH pro zabezpečení sítě a získávat odměny. Pro začátek se podívejte na [sólo staking](/staking/solo/).

![How you access Ethereum via your application and nodes](./nodes.png)

### Výhody pro síť {#network-benefits}

Různorodá sada uzlů je důležitá pro zdraví, bezpečnost a provozní odolnost Etherea.

- Plné uzly vynucují pravidla konsenzu, takže je nelze oklamat, aby přijaly bloky, které se jimi neřídí. To poskytuje síti dodatečnou bezpečnost, protože kdyby všechny uzly byly lehké uzly, které neprovádějí plné ověření, validátoři by mohli na síť zaútočit.
- V případě útoku, který překoná kryptoekonomickou obranu [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos), může být provedena sociální obnova plnými uzly, které se rozhodnou následovat poctivý řetězec.
- Více uzlů v síti vede k rozmanitější a robustnější síti, což je konečným cílem decentralizace, která umožňuje systém odolný vůči cenzuře a spolehlivý.
- Plné uzly poskytují přístup k datům blockchainu pro lehké klienty, kteří jsou na nich závislí. Lehké uzly neukládají celý blockchain, místo toho ověřují data prostřednictvím [kořenů stavu v hlavičkách bloků](/developers/docs/blocks/#block-anatomy). Pokud potřebují více informací, mohou si je vyžádat od plných uzlů.

Pokud provozujete plný uzel, těží z toho celá síť Etherea, i když neprovozujete validátor.

## Provozování vlastního uzlu {#running-your-own-node}

Máte zájem o provozování vlastního klienta Etherea?

Pro úvod vhodný pro začátečníky navštivte naši stránku [provozování uzlu](/run-a-node), kde se dozvíte více.

Pokud jste spíše technický uživatel, ponořte se do dalších podrobností a možností, jak [rozjet vlastní uzel](/developers/docs/nodes-and-clients/run-a-node/).

## Alternativy {#alternatives}

Nastavení vlastního uzlu vás může stát čas a zdroje, ale ne vždy musíte provozovat vlastní instanci. V takovém případě můžete využít poskytovatele API třetí strany. Pro přehled o používání těchto služeb se podívejte na [uzly jako službu](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Pokud někdo ve vaší komunitě provozuje uzel Etherea s veřejným API, můžete své peněženky nasměrovat na komunitní uzel prostřednictvím vlastního RPC a získat tak větší soukromí než u nějaké náhodné důvěryhodné třetí strany.

Na druhou stranu, pokud provozujete klienta, můžete jej sdílet se svými přáteli, kteří by jej mohli potřebovat.

## Exekuční klienti {#execution-clients}

Komunita Etherea udržuje několik open-source exekučních klientů (dříve známých jako „klienti Eth1“ nebo jen „klienti Etherea“), vyvíjených různými týmy pomocí různých programovacích jazyků. Díky tomu je síť silnější a [rozmanitější](/developers/docs/nodes-and-clients/client-diversity/). Ideálním cílem je dosáhnout diverzity bez toho, aby jakýkoli klient dominoval, čímž se sníží riziko jediného bodu selhání.

Tato tabulka shrnuuje různé klienty. Všichni procházejí [testy klientů](https://github.com/ethereum/tests) a jsou aktivně udržováni, aby zůstali aktuální s upgrady sítě.

| Klient                                                                   | Jazyk      | Operační systémy      | Sítě                    | Strategie synchronizace                                    | Prořezávání stavu   |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Plná](#full-sync)                     | Archivní, Prořezaný |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), Rychlá, [Plná](#full-sync)               | Archivní, Prořezaný |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Rychlá](#fast-sync), [Plná](#full-sync) | Archivní, Prořezaný |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Plná](#full-sync)                                         | Archivní, Prořezaný |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Plná](#full-sync)                                         | Archivní, Prořezaný |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [Plná](#full-sync)                                         | Prořezaný          |

Více o podporovaných sítích si přečtěte v části [Sítě Etherea](/developers/docs/networks/).

Každý klient má jedinečné případy použití a výhody, takže byste si měli vybrat na základě vlastních preferencí. Diverzita umožňuje, aby se implementace zaměřily na různé funkce a uživatelské publikum. Klienta si můžete vybrat na základě funkcí, podpory, programovacího jazyka nebo licencí.

### Besu {#besu}

Hyperledger Besu je klient Etherea podnikové třídy pro veřejné sítě a sítě s řízeným přístupem. Provozuje všechny funkce sítě Ethereum Mainnet, od trasování po GraphQL, má rozsáhlé monitorování a je podporován společností ConsenSys, a to jak v otevřených komunitních kanálech, tak prostřednictvím komerčních SLA pro podniky. Je napsán v jazyce Java a je licencován pod Apache 2.0.

Rozsáhlá [dokumentace](https://besu.hyperledger.org/en/stable/) Besu vás provede všemi podrobnostmi o jeho funkcích a nastaveních.

### Erigon {#erigon}

Erigon, dříve známý jako Turbo-Geth, začal jako fork Go Etherea orientovaný na rychlost a efektivitu využití místa na disku. Erigon je kompletně přepracovaná implementace Etherea, v současnosti napsaná v jazyce Go, ale s implementacemi v dalších jazycích ve vývoji. Cílem Erigonu je poskytnout rychlejší, modulárnější a optimalizovanější implementaci Etherea. Dokáže provést plnou synchronizaci archivního uzlu s využitím přibližně 2 TB místa na disku za méně než 3 dny.

### Go Ethereum {#geth}

Go Ethereum (zkráceně Geth) je jednou z původních implementací protokolu Etherea. V současnosti je to nejrozšířenější klient s největší uživatelskou základnou a rozmanitostí nástrojů pro uživatele a vývojáře. Je napsán v jazyce Go, je plně open source a licencován pod GNU LGPL v3.

Přečtěte si více o Geth v jeho [dokumentaci](https://geth.ethereum.org/docs).

### Nethermind {#nethermind}

Nethermind je implementace Etherea vytvořená pomocí technologického stacku C# .NET, licencovaná pod LGPL-3.0, běžící na všech hlavních platformách včetně ARM. Nabízí skvělý výkon s:

- optimalizovaným virtuálním strojem
- přístupem ke stavu
- sítěmi a bohatými funkcemi, jako jsou řídicí panely Prometheus/Grafana, podpora podnikového protokolování seq, trasování JSON-RPC a analytické pluginy.

Nethermind má také [podrobnou dokumentaci](https://docs.nethermind.io), silnou podporu pro vývojáře, online komunitu a nepřetržitou podporu dostupnou pro prémiové uživatele.

### Reth {#reth}

Reth (zkratka pro Rust Ethereum) je implementace plného uzlu Etherea, která je zaměřena na uživatelskou přívětivost, vysokou modularitu, rychlost a efektivitu. Reth byl původně vytvořen a posouván vpřed společností Paradigm a je licencován pod licencemi Apache a MIT.

Reth je připraven pro produkční nasazení a je vhodný pro použití v kritických prostředích, jako je staking nebo služby s vysokou dostupností. Vede si dobře v případech použití, kde je vyžadován vysoký výkon s velkými rezervami, jako je RPC, MEV, indexování, simulace a P2P aktivity.

Více se dozvíte v [Reth Book](https://reth.rs/) nebo v [repozitáři Reth na GitHubu](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Ve vývoji {#execution-in-development}

Tito klienti jsou stále v raných fázích vývoje a zatím se nedoporučují pro produkční použití.

#### EthereumJS {#ethereumjs}

Exekuční klient EthereumJS (EthereumJS) je napsán v TypeScriptu a skládá se z řady balíčků, včetně základních primitiv Etherea reprezentovaných třídami Block, Transaction a Merkle-Patricia Trie, a základních klientských komponent včetně implementace virtuálního stroje Etherea (EVM), třídy blockchainu a síťového stacku devp2p.

Přečtěte si více v jeho [dokumentaci](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Konsensuální klienti {#consensus-clients}

Existuje několik konsensuálních klientů (dříve známých jako klienti „Eth2“) pro podporu [upgradů konsensu](/roadmap/beacon-chain/). Jsou zodpovědní za veškerou logiku související s konsensem, včetně algoritmu volby forku, zpracování atestací a správy odměn a penalizací [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos).

| Klient                                                        | Jazyk      | Operační systémy      | Sítě                                                    |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Pyrmont, Sepolia a další         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia a další                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia a další                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Pyrmont, Sepolia a další |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Sepolia a další          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia a další                  |

### Lighthouse {#lighthouse}

Lighthouse je implementace konsensuálního klienta napsaná v jazyce Rust pod licencí Apache-2.0. Je udržován společností Sigma Prime a je stabilní a připravený pro produkci od genesis bloku Beacon chainu. Spoléhají na něj různé podniky, staking pooly i jednotlivci. Jeho cílem je být bezpečný, výkonný a interoperabilní v široké škále prostředí, od stolních počítačů až po sofistikovaná automatizovaná nasazení.

Dokumentaci naleznete v [Lighthouse Book](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar je implementace konsensuálního klienta připravená pro produkci, napsaná v TypeScriptu pod licencí LGPL-3.0. Je udržován společností ChainSafe Systems a je nejnovějším z konsensuálních klientů pro sólo stakery, vývojáře a výzkumníky. Lodestar se skládá z uzlu Beacon a klienta validátoru poháněného implementacemi protokolů Etherea v JavaScriptu. Cílem Lodestaru je zlepšit použitelnost Etherea pomocí lehkých klientů, rozšířit dostupnost pro větší skupinu vývojářů a dále přispět k diverzitě ekosystému.

Více informací naleznete na [webu Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus je implementace konsensuálního klienta napsaná v jazyce Nim pod licencí Apache-2.0. Je to klient připravený pro produkci, který používají sólo stakeři a staking pooly. Nimbus je navržen pro efektivní využívání zdrojů, což usnadňuje jeho provoz na zařízeních s omezenými zdroji i na podnikové infrastruktuře se stejnou lehkostí, aniž by byla ohrožena stabilita nebo výkon odměn. Menší nároky na zdroje znamenají, že klient má větší bezpečnostní rezervu, když je síť pod zátěží.

Přečtěte si více v [dokumentaci Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm je plně vybavený open-source konsensuální klient napsaný v jazyce Go pod licencí GPL-3.0. Obsahuje volitelné uživatelské rozhraní webové aplikace a upřednostňuje uživatelskou zkušenost, dokumentaci a konfigurovatelnost jak pro domácí stakery, tak pro institucionální uživatele.

Navštivte [dokumentaci Prysm](https://prysm.offchainlabs.com/docs/), kde se dozvíte více.

### Teku {#teku}

Teku je jedním z původních klientů genesis bloku Beacon chainu. Kromě obvyklých cílů (bezpečnost, robustnost, stabilita, použitelnost, výkon) se Teku specificky zaměřuje na plný soulad se všemi různými standardy konsensuálních klientů.

Teku nabízí velmi flexibilní možnosti nasazení. Uzel Beacon a klient validátoru mohou běžet společně jako jeden proces, což je extrémně pohodlné pro sólo stakery, nebo mohou uzly běžet odděleně pro sofistikované operace stakingu. Kromě toho je Teku plně interoperabilní s [Web3Signer](https://github.com/ConsenSys/web3signer/) pro zabezpečení podepisovacích klíčů a ochranu proti penalizaci (slashing).

Teku je napsáno v jazyce Java a je licencováno pod Apache 2.0. Je vyvíjeno týmem Protocols ve společnosti ConsenSys, který je také zodpovědný za Besu a Web3Signer. Přečtěte si více v [dokumentaci Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine je implementace konsensuálního klienta, napsaná v jazyce Rust pod licencí GPL-3.0. Je udržován týmem Grandine Core Team a je rychlý, vysoce výkonný a lehký. Vyhovuje široké škále stakerů od sólo stakerů běžících na zařízeních s nízkými zdroji, jako je Raspberry Pi, až po velké institucionální stakery provozující desítky tisíc validátorů.

Dokumentaci naleznete v [Grandine Book](https://docs.grandine.io/)

## Režimy synchronizace {#sync-modes}

Aby mohl klient Etherea sledovat a ověřovat aktuální data v síti, musí se synchronizovat s nejnovějším stavem sítě. To se provádí stahováním dat od peerů, kryptografickým ověřováním jejich integrity a budováním lokální databáze blockchainu.

Režimy synchronizace představují různé přístupy k tomuto procesu s různými kompromisy. Klienti se také liší ve své implementaci synchronizačních algoritmů. Specifika implementace vždy hledejte v oficiální dokumentaci vámi zvoleného klienta.

### Režimy synchronizace exekuční vrstvy {#execution-layer-sync-modes}

Exekuční vrstva může běžet v různých režimech, aby vyhovovala různým případům použití, od opětovného provedení globálního stavu blockchainu až po pouhou synchronizaci se špičkou řetězce z důvěryhodného kontrolního bodu.

#### Plná synchronizace {#full-sync}

Plná synchronizace stáhne všechny bloky (včetně hlaviček a těl bloků) a inkrementálně regeneruje stav blockchainu provedením každého bloku od genesis bloku.

- Minimalizuje nutnost důvěry a nabízí nejvyšší bezpečnost ověřením každé transakce.
- S rostoucím počtem transakcí může zpracování všech transakcí trvat dny až týdny.

[Archivní uzly](#archive-node) provádějí plnou synchronizaci, aby vytvořily (a uchovaly) kompletní historii změn stavu provedených každou transakcí v každém bloku.

#### Rychlá synchronizace {#fast-sync}

Stejně jako plná synchronizace, i rychlá synchronizace stáhne všechny bloky (včetně hlaviček, transakcí a účtenek). Místo opětovného zpracování historických transakcí se však rychlá synchronizace spoléhá na účtenky, dokud nedosáhne nedávného vrcholu, kdy přejde na import a zpracování bloků, aby poskytla plný uzel.

- Strategie rychlé synchronizace.
- Snižuje nároky na zpracování ve prospěch využití šířky pásma.

#### Snap synchronizace {#snap-sync}

Snap synchronizace také ověřují řetězec blok po bloku. Místo toho, aby začínala u genesis bloku, však snap synchronizace začíná u novějšího „důvěryhodného“ kontrolního bodu, o kterém je známo, že je součástí skutečného blockchainu. Uzel ukládá pravidelné kontrolní body a zároveň maže data starší než určité stáří. Tyto snímky se používají k regeneraci dat stavu podle potřeby, místo aby se ukládaly navždy.

- Nejrychlejší strategie synchronizace, v současnosti výchozí v síti Ethereum Mainnet.
- Šetří spoustu místa na disku a šířky pásma sítě bez obětování bezpečnosti.

[Více o snap synchronizaci](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Lehká synchronizace {#light-sync}

Režim lehkého klienta stáhne všechny hlavičky bloků, data bloků a některé náhodně ověří. Synchronizuje pouze špičku řetězce z důvěryhodného kontrolního bodu.

- Získává pouze nejnovější stav a spoléhá na důvěru ve vývojáře a mechanismus konsensu.
- Klient je připraven k použití s aktuálním stavem sítě během několika minut.

**Poznámka:** Lehká synchronizace zatím nefunguje s Ethereem na bázi důkazu podílem (PoS) – nové verze lehké synchronizace by měly být brzy k dispozici!

[Více o lehkých klientech](/developers/docs/nodes-and-clients/light-clients/)

### Režimy synchronizace vrstvy konsensu {#consensus-layer-sync-modes}

#### Optimistická synchronizace {#optimistic-sync}

Optimistická synchronizace je strategie synchronizace po Merge, navržená jako volitelná a zpětně kompatibilní, což umožňuje exekučním uzlům synchronizovat se pomocí zavedených metod. Execution engine může _optimisticky_ importovat bloky Beacon bez jejich plného ověření, najít nejnovější vrchol a poté začít synchronizovat řetězec pomocí výše uvedených metod. Poté, co exekuční klient dožene zpoždění, bude informovat konsensuálního klienta o platnosti transakcí v Beacon chainu.

[Více o optimistické synchronizaci](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### Synchronizace kontrolních bodů {#checkpoint-sync}

Synchronizace kontrolních bodů, známá také jako synchronizace slabé subjektivity, vytváří vynikající uživatelskou zkušenost pro synchronizaci uzlu Beacon. Je založena na předpokladech [slabé subjektivity](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/), což umožňuje synchronizaci Beacon chainu z nedávného kontrolního bodu slabé subjektivity namísto genesis bloku. Synchronizace kontrolních bodů výrazně zrychluje počáteční čas synchronizace s podobnými předpoklady důvěry jako synchronizace od [genesis bloku](/glossary/#genesis-block).

V praxi to znamená, že se váš uzel připojí ke vzdálené službě, aby stáhl nedávné finalizované stavy, a od tohoto bodu pokračuje v ověřování dat. Třetí strana poskytující data je důvěryhodná a měla by být vybírána pečlivě.

Více o [synchronizaci kontrolních bodů](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Další čtení {#further-reading}

- [Ethereum 101 - Část 2 - Porozumění uzlům](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13. února 2019_
- [Provozování plných uzlů Etherea: Průvodce pro sotva motivované](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7. listopadu 2019_

## Související témata {#related-topics}

- [Bloky](/developers/docs/blocks/)
- [Sítě](/developers/docs/networks/)

## Související návody {#related-tutorials}

- [Proměňte své Raspberry Pi 4 na uzel validátoru pouhým flashnutím MicroSD karty – Průvodce instalací](/developers/tutorials/run-node-raspberry-pi/) _– Flashněte své Raspberry Pi 4, zapojte ethernetový kabel, připojte SSD disk a zapněte zařízení, abyste proměnili Raspberry Pi 4 na plný uzel Etherea provozující exekuční vrstvu (Mainnet) a/nebo vrstvu konsensu (Beacon chain / validátor)._