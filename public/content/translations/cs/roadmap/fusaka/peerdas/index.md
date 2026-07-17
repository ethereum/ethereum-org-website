---
title: PeerDAS
description: Přečtěte si o PeerDAS jako součásti aktualizace protokolu Ethereum Fusaka
lang: cs
authors: ["Nixo", "Mario Havel"]
---

Protokol [Ethereum](/) prochází svou nejvýznamnější aktualizací škálování od [zavedení blobových transakcí s EIP-4844](/roadmap/danksharding/). Jako součást [aktualizace Fusaka](/roadmap/fusaka/) přináší PeerDAS nový způsob zpracování dat blobů, což poskytuje zhruba řádové zvýšení kapacity **[dostupnosti dat (DA)](/developers/docs/data-availability/)** pro vrstvy 2 (l2).

[Více o plánu škálování blobů](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Škálovatelnost {#scalability}

Vizí Etherea je být neutrální, bezpečnou a decentralizovanou platformou dostupnou pro každého na světě. S rostoucím využíváním sítě to vyžaduje vyvážení trilematu škálovatelnosti, bezpečnosti a decentralizace sítě. Pokud by Ethereum jednoduše zvýšilo množství dat zpracovávaných sítí v rámci svého současného návrhu, riskovalo by přetížení [uzlů, na které Ethereum spoléhá kvůli své decentralizaci](/developers/docs/nodes-and-clients/). Škálovatelnost vyžaduje přísný návrh mechanismů, který minimalizuje kompromisy.

Jednou ze strategií k dosažení tohoto cíle je umožnit rozmanitý ekosystém řešení škálování na vrstvě 2 (l2) namísto zpracování všech transakcí na [vrstvě 1 (l1)](/glossary/#layer-1) Mainnetu. [Vrstvy 2 (l2)](/glossary/#layer-2) nebo [rollupy](/glossary#rollups) zpracovávají transakce na svých vlastních oddělených řetězcích a používají Ethereum pro ověření a bezpečnost. Zveřejňování pouze bezpečnostně kritických závazků a komprese datových částí umožňuje vrstvám 2 (l2) efektivněji využívat kapacitu DA Etherea. Vrstva 1 (l1) tak nese méně dat bez ohrožení bezpečnostních záruk, zatímco vrstvy 2 (l2) mohou přijmout více uživatelů při nižších nákladech na gas. Zpočátku vrstvy 2 (l2) zveřejňovaly data jako `calldata` v běžných transakcích, což soutěžilo s transakcemi na vrstvě 1 (l1) o gas a bylo to nepraktické pro hromadnou dostupnost dat.

## Proto-danksharding {#proto-danksharding}

Prvním velkým krokem ke škálování vrstvy 2 (l2) byla aktualizace Dencun, která zavedla [proto-danksharding](/roadmap/danksharding/) (EIP-4844). Tato aktualizace vytvořila nový, specializovaný datový typ pro rollupy zvaný bloby. [Bloby](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs) (binary large objects) jsou dočasné části libovolných dat, které nepotřebují spuštění v EVM a uzly je ukládají pouze po omezenou dobu. Toto efektivnější zpracování umožnilo vrstvám 2 (l2) zveřejňovat více dat na Ethereu a ještě více škálovat. 

Přestože použití blobů již přináší silné výhody pro škálování, je to pouze část konečného cíle. V současném protokolu musí každý uzel v síti stále stahovat každý blob. Úzkým hrdlem se stává šířka pásma vyžadovaná od jednotlivých uzlů, přičemž množství dat, které je třeba stáhnout, se přímo zvyšuje s vyšším počtem blobů. 

Ethereum nedělá kompromisy v decentralizaci a šířka pásma je jedním z nejcitlivějších parametrů. I když je výkonná výpočetní technika široce dostupná každému, kdo si ji může dovolit, [omezení šířky pásma pro nahrávání](https://www.speedtest.net/global-index) i ve vysoce urbanizovaných městech ve vyspělých zemích (jako je [Německo](https://www.speedtest.net/global-index/germany), [Belgie](https://www.speedtest.net/global-index/belgium), [Austrálie](https://www.speedtest.net/global-index/australia) nebo [Spojené státy](https://www.speedtest.net/global-index/united-states)) by mohla omezit provoz uzlů pouze na datová centra, pokud by požadavky na šířku pásma nebyly pečlivě vyladěny.

Provozovatelé uzlů mají s rostoucím počtem blobů stále vyšší požadavky na šířku pásma a místo na disku. Velikost a množství blobů jsou těmito omezeními limitovány. Každý blob může nést až 128 kb dat s průměrem 6 blobů na blok. To byl pouze první krok k budoucímu návrhu, který využívá bloby ještě efektivnějším způsobem.

## Vzorkování dostupnosti dat {#das}

[Dostupnost dat](/developers/docs/data-availability/) je záruka, že všechna data potřebná k nezávislému ověření řetězce jsou přístupná všem účastníkům sítě. Zajišťuje, že data byla plně zveřejněna a lze je použít k bezdůvěrnému ověření nového stavu řetězce nebo příchozích transakcí. 

Bloby Etherea poskytují silnou záruku dostupnosti dat, která zajišťuje bezpečnost vrstev 2 (l2). K tomu musí uzly Etherea stahovat a ukládat bloby v jejich celistvosti. Co kdybychom ale mohli distribuovat bloby v síti efektivněji a vyhnout se tomuto omezení? 

Odlišným přístupem k ukládání dat a zajištění jejich dostupnosti je **vzorkování dostupnosti dat (DAS)**. Místo toho, aby každý počítač, na kterém běží Ethereum, plně ukládal každý jednotlivý blob, zavádí DAS decentralizovanou dělbu práce. Rozkládá zátěž spojenou se zpracováním dat distribucí menších, zvládnutelných úkolů napříč celou sítí uzlů. Bloby jsou rozděleny na části a každý uzel stahuje pouze několik částí pomocí mechanismu pro rovnoměrné náhodné rozdělení mezi všechny uzly. 

To přináší nový problém – prokázání dostupnosti a integrity dat. Jak může síť zaručit, že jsou data dostupná a že jsou všechna správná, když jednotlivé uzly drží pouze malé části? Zlomyslný uzel by mohl poskytovat falešná data a snadno narušit silné záruky dostupnosti dat! Zde přichází na pomoc kryptografie. 

Pro zajištění integrity dat byl EIP-4844 již implementován se závazky KZG. Jedná se o kryptografické důkazy vytvořené při přidání nového blobu do sítě. Malý důkaz je zahrnut v každém bloku a uzly mohou ověřit, že přijaté bloby odpovídají závazku KZG daného bloku.

DAS je mechanismus, který na tom staví a zajišťuje, že data jsou správná i dostupná. Vzorkování je proces, při kterém se uzel dotazuje pouze na malou část dat a ověřuje ji vůči závazku. KZG je schéma polynomiálních závazků, což znamená, že lze ověřit jakýkoli jednotlivý bod na polynomiální křivce. Kontrolou pouze několika bodů na polynomu může mít klient provádějící vzorkování silnou pravděpodobnostní záruku, že data jsou dostupná. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) je konkrétní návrh, který implementuje mechanismus DAS v Ethereu, což představuje pravděpodobně největší aktualizaci od Merge. PeerDAS je navržen tak, aby rozšířil data blobů, rozdělil je do sloupců a distribuoval jejich podmnožinu uzlům.

Ethereum si k dosažení tohoto cíle vypůjčuje chytrou matematiku: aplikuje na data blobů výmazové kódování ve stylu Reed-Solomon. Data blobů jsou reprezentována jako polynom, jehož koeficienty kódují data, a poté se tento polynom vyhodnotí v dalších bodech, čímž se vytvoří rozšířený blob a zdvojnásobí se počet vyhodnocení. Tato přidaná redundance umožňuje obnovu po výmazu: i když některá vyhodnocení chybí, původní blob lze zrekonstruovat, pokud je k dispozici alespoň polovina celkových dat, včetně rozšířených částí.

![Extended polynomial](./polynomial.png)

Ve skutečnosti má tento polynom tisíce koeficientů. Závazky KZG jsou hodnoty o velikosti několika bajtů, něco jako hash, známé všem uzlům. Každý uzel, který drží dostatek datových bodů, může [efektivně zrekonstruovat celou sadu dat blobů](https://arxiv.org/abs/2207.11079). 

> Zajímavost: stejnou techniku kódování používala DVD. Pokud jste poškrábali DVD, přehrávač jej byl stále schopen přečíst díky kódování Reed-Solomon, které doplňuje chybějící části polynomu. 

Historicky byla data v blockchainech, ať už bloky nebo bloby, vysílána všem uzlům. S přístupem rozdělení a vzorkování v PeerDAS již není nutné vysílat všechno všem. Po aktualizaci Fusaka je síťování vrstvy konsensu organizováno do témat/podsítí gossip protokolu: sloupce blobů jsou přiřazeny konkrétním podsítím a každý uzel se přihlásí k odběru předem určených podmnožin a uchovává pouze tyto části.

S PeerDAS jsou rozšířená data blobů rozdělena na 128 částí zvaných sloupce. Data jsou těmto uzlům distribuována prostřednictvím vyhrazeného gossip protokolu na konkrétních podsítích, k jejichž odběru jsou přihlášeny. Každý běžný uzel v síti se účastní alespoň 8 náhodně vybraných sloupcových podsítí. Příjem dat pouze z 8 ze 128 podsítí znamená, že tento výchozí uzel přijímá pouze 1/16 všech dat, ale protože data byla rozšířena, jedná se o 1/8 původních dat. 

To umožňuje nový teoretický limit škálování, který je 8x vyšší než současné schéma „každý stahuje všechno“. Vzhledem k tomu, že se uzly přihlašují k různým náhodným podsítím obsluhujícím sloupce blobů, je velmi vysoká pravděpodobnost, že jsou rovnoměrně rozloženy, a proto každá část dat někde v síti existuje. Uzly provozující validátory se musí přihlásit k odběru více podsítí s každým validátorem, kterého provozují.

> Každý uzel má jedinečné náhodně vygenerované ID, které normálně slouží jako jeho veřejná identita pro připojení. V PeerDAS se toto číslo používá k určení náhodné sady podsítí, k jejichž odběru se musí přihlásit, což vede k rovnoměrnému náhodnému rozdělení všech dat blobů.

Jakmile uzel úspěšně zrekonstruuje původní data, redistribuuje obnovené sloupce zpět do sítě, čímž aktivně zaceluje jakékoli mezery v datech a zvyšuje celkovou odolnost systému. Uzly připojené k validátorům s kombinovaným zůstatkem ≥ 4096 ETH musí být superuzlem, a proto se musí přihlásit k odběru všech podsítí datových sloupců a uchovávat všechny sloupce. Tyto superuzly budou neustále zacelovat mezery v datech. Pravděpodobnostní samoopravná povaha protokolu umožňuje silné záruky dostupnosti, aniž by omezovala domácí provozovatele, kteří drží pouze části dat. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

Dostupnost dat může potvrdit jakýkoli uzel, který drží pouze malou podmnožinu dat blobů, díky výše popsanému mechanismu vzorkování. Tato dostupnost je vynucována: validátory se musí řídit novými pravidly pro výběr forku (fork-choice rules), což znamená, že budou přijímat a dávat hlas blokům až poté, co ověří dostupnost dat.

Přímým dopadem na uživatele (zejména uživatele vrstvy 2 (l2)) jsou nižší poplatky. S 8x větším prostorem pro data rollupů se uživatelské operace na jejich řetězci postupem času stávají ještě levnějšími. Nižší poplatky po aktualizaci Fusaka však budou vyžadovat čas a budou záviset na BPO.

## Blob-Parameter-Only (BPO) {#bpo}

Síť bude teoreticky schopna zpracovat 8x více blobů, ale nárůst blobů je změna, kterou je třeba řádně otestovat a bezpečně provést postupným způsobem. Testnety poskytují dostatečnou jistotu pro nasazení funkcí na Mainnet, ale před povolením výrazně vyššího počtu blobů musíme zajistit stabilitu p2p sítě. 

K postupnému zvyšování cílového počtu blobů na blok bez přetížení sítě zavádí Fusaka forky **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Na rozdíl od běžných forků, které vyžadují širokou koordinaci ekosystému, dohodu a aktualizace softwaru, jsou [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) předprogramované aktualizace, které v průběhu času zvyšují maximální počet blobů bez nutnosti zásahu.

To znamená, že bezprostředně po aktivaci aktualizace Fusaka a spuštění PeerDAS zůstane počet blobů nezměněn. Počet blobů se začne každých několik týdnů zdvojnásobovat, dokud nedosáhne maxima 48, zatímco vývojáři budou monitorovat, aby zajistili, že mechanismus funguje podle očekávání a nemá nepříznivé účinky na uzly provozující síť.

## Budoucí směřování {#future-directions}

PeerDAS je pouze krokem [k větší vizi škálování FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529) neboli dankshardingu. Zatímco PeerDAS používá 1D výmazové kódování pro každý blob samostatně, plný danksharding bude používat komplexnější schéma 2D výmazového kódování napříč celou maticí dat blobů. Rozšíření dat ve dvou rozměrech vytváří ještě silnější vlastnosti redundance a efektivnější rekonstrukci a ověřování. Realizace FullDAS bude vyžadovat podstatné optimalizace sítě a protokolu spolu s dalším výzkumem.

## Další čtení {#further-reading}

- [PeerDAS: Peer Data Availability sampling od Francesca D'Amata](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Dokumentace k PeerDAS Etherea](https://eprint.iacr.org/2024/1362.pdf)
- [Prokazování bezpečnosti PeerDAS bez AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik o PeerDAS, jeho dopadu a testování aktualizace Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)