---
title: PeerDAS
description: "Seznamte se s PeerDAS jako součástí vylepšení protokolu Ethereum Fusaka"
lang: cs
---

# PeerDAS {#peer-das}

Protokol Ethereum prochází svým nejvýznamnějším vylepšením škálování od [zavedení blob transakcí s EIP-4844](/roadmap/danksharding/). Jako součást [vylepšení Fusaka](/roadmap/fusaka/), PeerDAS zavádí nový způsob zpracování blob dat, přinášející zhruba desetinásobné zvýšení kapacity **[dostupnosti dat (DA)](/developers/docs/data-availability/)** pro L2.

[Více o plánu škálování blobů](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Škálovatelnost {#scalability}

Vizí Etherea je být neutrální, bezpečnou a decentralizovanou platformou dostupnou pro každého na světě. S rostoucím využitím sítě to vyžaduje vyvažování trilematu škálovatelnosti, bezpečnosti a decentralizace sítě. Pokud by Ethereum jednoduše zvýšilo objem dat zpracovávaných sítí v rámci svého současného návrhu, hrozilo by riziko přetížení [uzlů, na které Ethereum spoléhá pro svou decentralizaci](/developers/docs/nodes-and-clients/). Škálovatelnost vyžaduje důsledný návrh mechanismů, který minimalizuje kompromisy.

Jednou ze strategií k dosažení tohoto cíle je umožnit existenci rozmanitého ekosystému řešení škálování druhé vrstvy namísto zpracování všech transakcí na hlavní síti [první vrstvy (L1)](/glossary/#layer-1). [Druhé vrstvy (L2)](/glossary/#layer-2) neboli [rollupy](/glossary#rollups) zpracovávají transakce na svých vlastních oddělených řetězcích a používají Ethereum k ověření a zabezpečení. Publikování pouze bezpečnostně-kritických závazků a komprese datových nákladů umožňuje L2 efektivněji využívat kapacitu dostupnosti dat (DA) Etherea. Na oplátku L1 přenáší méně dat bez ohrožení bezpečnostních záruk, zatímco L2 přivádějí více uživatelů s nižšími náklady na palivo. Zpočátku L2 publikovaly data jako `calldata` v běžných transakcích, což soupeřilo s L1 transakcemi o palivo a bylo to nepraktické pro hromadnou dostupnost dat.

## Proto-Danksharding {#proto-danksharding}

Prvním velkým krokem ke škálování L2 bylo vylepšení Dencun, které zavedlo [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Toto vylepšení vytvořilo nový, specializovaný datový typ pro rollupy nazvaný bloby. [Bloby](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), neboli binární velké objekty, jsou pomíjivé části libovolných dat, které nepotřebují spuštění EVM a uzly je ukládají jen na omezenou dobu. Toto efektivnější zpracování umožnilo L2 publikovat více dat do Etherea a ještě více škálovat.

Navzdory tomu, že používání blobů již má silné výhody pro škálování, je to pouze část konečného cíle. V současném protokolu musí každý uzel v síti stále stahovat každý blob. Úzkým hrdlem se stává šířka pásma vyžadovaná od jednotlivých uzlů, přičemž množství dat, které je třeba stáhnout, se přímo zvyšuje s vyšším počtem blobů.

Ethereum nedělá kompromisy v decentralizaci a šířka pásma je jedním z nejcitlivějších parametrů. I s výkonným výpočetním výkonem, který je široce dostupný každému, kdo si ho může dovolit, [omezení šířky pásma pro nahrávání](https://www.speedtest.net/global-index) dokonce i ve velkých městech v rozvinutých zemích (jako je [Německo](https://www.speedtest.net/global-index/germany), [Belgie](https://www.speedtest.net/global-index/belgium), [Austrálie](https://www.speedtest.net/global-index/australia) nebo [Spojené státy](https://www.speedtest.net/global-index/united-states)) by mohla omezit uzly tak, aby mohly běžet pouze z datových center, pokud nejsou požadavky na šířku pásma pečlivě vyladěny.

Provozovatelé uzlů mají stále vyšší požadavky na šířku pásma a místo na disku s rostoucím počtem blobů. Velikost a množství blobů jsou těmito omezeními limitovány. Každý blob může nést až 128 kB dat s průměrem 6 blobů na blok. To byl jen první krok k budoucímu návrhu, který využívá bloby ještě efektivněji.

## Vzorkování dostupnosti dat {#das}

[Dostupnost dat](/developers/docs/data-availability/) je zárukou toho, že všechna data potřebná k nezávislému ověření řetězce jsou přístupná všem účastníkům sítě. Zajišťuje, že data byla plně publikována a lze je použít k nedůvěryhodnému ověření nového stavu řetězce nebo příchozích transakcí.

Bloby Etherea poskytují silnou záruku dostupnosti dat, která zajišťuje bezpečnost L2. K tomu musí uzly Etherea stahovat a ukládat bloby v jejich celistvosti. Ale co kdybychom mohli distribuovat bloby v síti efektivněji a vyhnout se tomuto omezení?

Odlišný přístup k ukládání dat a zajištění jejich dostupnosti je **vzorkování dostupnosti dat (DAS)**. Namísto toho, aby každý počítač, na kterém běží Ethereum, plně ukládal každý jednotlivý blob, zavádí DAS decentralizovanou dělbu práce. Rozděluje zátěž zpracování dat distribucí menších, zvládnutelných úkolů napříč celou sítí uzlů. Bloby jsou rozděleny na části a každý uzel stahuje jen několik částí pomocí mechanismu pro rovnoměrnou náhodnou distribuci mezi všemi uzly.

To přináší nový problém – dokazování dostupnosti a integrity dat. Jak může síť zaručit, že data jsou dostupná a všechna jsou správná, když jednotlivé uzly drží jen malé části? Škodlivý uzel by mohl poskytovat falešná data a snadno tak narušit silné záruky dostupnosti dat! Zde přichází na pomoc kryptografie.

Pro zajištění integrity dat byl již EIP-4844 implementován s KZG závazky. Jsou to kryptografické důkazy vytvořené při přidání nového blobu do sítě. Malý důkaz je zahrnut v každém bloku a uzly mohou ověřit, že přijaté bloby odpovídají KZG závazku bloku.

DAS je mechanismus, který na tomto staví a zajišťuje, že data jsou správná i dostupná. Vzorkování je proces, při kterém uzel dotazuje pouze malou část dat a ověřuje ji proti závazku. KZG je schéma polynomiálního závazku, což znamená, že lze ověřit jakýkoli jednotlivý bod na polynomiální křivce. Kontrolou pouhých několika bodů na polynomu může mít klient provádějící vzorkování silnou pravděpodobnostní záruku, že data jsou dostupná.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) je specifický návrh, který implementuje mechanismus DAS v Ethereu a představuje pravděpodobně největší vylepšení od Sloučení (The Merge). PeerDAS je navržen tak, aby rozšiřoval blob data rozdělením na sloupce a distribucí podmnožiny uzlům.

Ethereum si k dosažení tohoto cíle vypůjčuje chytrou matematiku: aplikuje na blob data opravné kódování ve stylu Reed-Solomon. Blob data jsou reprezentována jako polynom, jehož koeficienty kódují data, poté se tento polynom vyhodnotí v dalších bodech, aby se vytvořil rozšířený blob, čímž se zdvojnásobí počet vyhodnocení. Tato přidaná redundance umožňuje obnovu po výmazu: i když některé vyhodnocení chybí, původní blob lze zrekonstruovat, pokud je k dispozici alespoň polovina celkových dat, včetně rozšířených částí.

![Rozšířený polynom](./polynomial.png)

Ve skutečnosti má tento polynom tisíce koeficientů. KZG závazky jsou hodnoty o velikosti několika bajtů, něco jako hash, známé všem uzlům. Každý uzel, který drží dostatek datových bodů, může [efektivně zrekonstruovat úplnou sadu blob dat](https://arxiv.org/abs/2207.11079).

> Zajímavost: stejná technika kódování se používala u DVD. Pokud jste poškrábali DVD, přehrávač ho stále dokázal přečíst díky Reed-Solomon kódování, které doplňuje chybějící části polynomu.

Historicky byla data v blockchainech, ať už bloky nebo bloby, vysílána všem uzlům. S přístupem PeerDAS, který spočívá v rozdělení a vzorkování, již není nutné vysílat všechno všem. Po vylepšení Fusaka je síťování na konsenzuální vrstvě organizováno do témat/podsítí pro šíření informací (gossip): sloupce blobů jsou přiřazeny specifickým podsítím a každý uzel se přihlašuje k odběru předem určených podmnožin a spravuje pouze tyto části.

S PeerDAS jsou rozšířená blob data rozdělena do 128 částí nazývaných sloupce. Data jsou distribuována těmto uzlům prostřednictvím specializovaného protokolu pro šíření informací (gossip) na specifických podsítích, které odebírají. Každý běžný uzel v síti se účastní alespoň 8 náhodně vybraných sloupcových podsítí. Příjem dat pouze z 8 ze 128 podsítí znamená, že tento výchozí uzel přijímá pouze 1/16 všech dat, ale protože data byla rozšířena, jedná se o 1/8 původních dat.

To umožňuje nový teoretický limit škálování 8x současného schématu „každý stahuje vše“. Když se uzly přihlašují k odběru různých náhodných podsítí obsluhujících sloupce blobů, je velmi vysoká pravděpodobnost, že jsou rovnoměrně rozloženy, a proto každá část dat existuje někde v síti. Uzly, které provozují validátory, jsou povinny odebírat více podsítí s každým validátorem, kterého provozují.

> Každý uzel má jedinečné náhodně generované ID, které obvykle slouží jako jeho veřejná identita pro připojení. V PeerDAS se toto číslo používá k určení náhodné sady podsítí, které musí odebírat, což vede k rovnoměrné náhodné distribuci všech blob dat.

Jakmile uzel úspěšně zrekonstruuje původní data, poté redistribuuje obnovené sloupce zpět do sítě, aktivně opravuje veškeré datové mezery a zvyšuje celkovou odolnost systému. Uzly připojené k validátorům s kombinovaným zůstatkem ≥4096 ETH musí být superuzlem, a proto musí odebírat všechny sloupce datových podsítí a spravovat všechny sloupce. Tyto superuzly budou neustále opravovat datové mezery. Pravděpodobnostní samoopravná povaha protokolu umožňuje silné záruky dostupnosti a zároveň neomezuje domácí operátory, kteří drží pouze části dat.

![Uzly odebírající sloupce distribuované prostřednictvím podsítí](./subnets.png)

Dostupnost dat může být potvrzena jakýmkoli uzlem, který drží pouze malou podmnožinu blob dat, díky výše popsanému mechanismu vzorkování. Tato dostupnost je vynucována: validátoři musí dodržovat nová pravidla pro výběr forku (fork-choice), což znamená, že budou přijímat bloky a hlasovat pro ně až poté, co ověří dostupnost dat.

Přímý dopad na uživatele (zejména uživatele L2) jsou nižší poplatky. S 8x větším prostorem pro rollup data se uživatelské operace na jejich řetězci časem ještě zlevní. Ale nižší poplatky po vylepšení Fusaka si vyžádají čas a budou záviset na BPO.

## Pouze blob parametry (BPO) {#bpo}

Síť bude teoreticky schopna zpracovat 8x více blobů, ale zvyšování počtu blobů je změna, která musí být řádně otestována a bezpečně provedena postupným způsobem. Testovací sítě poskytují dostatečnou důvěru k nasazení funkcí na hlavní síť (Mainnet), ale musíme zajistit stabilitu p2p sítě před povolením výrazně vyššího počtu blobů.

Aby se postupně zvyšoval cílový počet blobů na blok bez přetížení sítě, Fusaka zavádí forky **[pouze s parametry pro bloby (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Na rozdíl od běžných forků, které vyžadují širokou koordinaci ekosystému, dohodu a aktualizace softwaru, jsou [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) předem naprogramovaná vylepšení, která časem zvyšují maximální počet blobů bez nutnosti zásahu.

To znamená, že ihned po aktivaci Fusaky a spuštění PeerDAS zůstane počet blobů nezměněn. Počet blobů se začne každých několik týdnů zdvojnásobovat, dokud nedosáhne maxima 48, zatímco vývojáři budou sledovat, aby se ujistili, že mechanismus funguje podle očekávání a nemá nepříznivé účinky na uzly provozující síť.

## Budoucí směřování {#future-directions}

PeerDAS je pouze krokem [k větší vizi škálování FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), neboli Danksharding. Zatímco PeerDAS používá 1D opravné kódování pro každý blob jednotlivě, plný Danksharding bude používat komplexnější 2D schéma opravného kódování napříč celou maticí blob dat. Rozšíření dat ve dvou dimenzích vytváří ještě silnější vlastnosti redundance a efektivnější rekonstrukci a ověřování. Realizace FullDAS bude vyžadovat značné optimalizace sítě a protokolu spolu s dalším výzkumem.

## Další čtení {#further-reading}

- [PeerDAS: Vzorkování dostupnosti dat mezi peery od Francesca D'Amata](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Dokumentace PeerDAS v Ethereu](https://eprint.iacr.org/2024/1362.pdf)
- [Dokazování bezpečnosti PeerDAS bez AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik o PeerDAS, jeho dopadu a testování Fusaky](https://x.com/VitalikButerin/status/1970983281090085200)