---
title: Úvod ke kryptoměně ether
description: Úvod ke kryptoměně ether pro vývojáře.
lang: cs
---

## Předpoklady {#prerequisites}

K lepšímu pochopení této stránky vám doporučujeme si nejprve přečíst náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Co je kryptoměna? {#what-is-a-cryptocurrency}

Kryptoměna je médium směny, které je zajištěno účetní knihou založenou na blockchainové technologii.

Médium směny je cokoliv, co je široce přijímáno jako platba za zboží a služby, a účetní kniha je datové úložiště, které sleduje transakce. Blockchainová technologie umožňuje uživatelům provádět transakce v účetní knize bez nutnosti spoléhat se na důvěryhodnou třetí stranu, která by účetní knihu udržovala.

První kryptoměnou byl Bitcoin, který vytvořil Satoshi Nakamoto. Od spuštění Bitcoinu v roce 2009 lidé vytvořili tisíce kryptoměn na různých blockchainech.

## Co je Ether? {#what-is-ether}

**Ether (ETH)** je kryptoměna používaná pro různé účely v síti Ethereum. V základu je to jediná přijatelná forma platby za transakční poplatky a po [Sloučení](/roadmap/merge) je ether vyžadován k validaci a navrhování bloků na hlavní síti. Ether se také používá jako primární forma zajištění na [DeFi](/defi) půjčkových trzích, jako účetní jednotka na trzích NFT, jako platba za poskytování služeb nebo prodej reálného zboží atd.

Ethereum umožňuje vývojářům vytvářet [**decentralizované aplikace (dappky)**](/developers/docs/dapps), které sdílejí společný fond výpočetního výkonu. Tento sdílený fond je omezený, takže Ethereum potřebuje mechanismus, který určí, kdo ho může používat. Jinak by mohla dappka omylem nebo záměrně spotřebovat všechny síťové zdroje, což by znemožnilo přístup ostatním.

Kryptoměna ether podporuje mechanismus stanovení cen pro výpočetní výkon Etherea. Když uživatelé chtějí provést transakci, musí zaplatit ethereum, aby byla jejich transakce na blockchainu uznána. Tyto náklady jsou známé jako [poplatky za palivo](/developers/docs/gas/) a výše poplatku závisí na množství výpočetního výkonu potřebného k provedení transakce a na celosíťové poptávce po výpočetním výkonu v daném okamžiku.

Proto, i když by škodlivá dappka odeslala nekonečnou smyčku, transakci by nakonec došel ether a byla by ukončena, což by umožnilo síti vrátit se do normálu.

Je [běžné zaměňovat](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum a ether – když se lidé zmiňují o „ceně Etherea“, popisují cenu etheru.

## Ražba etheru {#minting-ether}

Ražba je proces, při kterém je vytvořen nový ether v účetní knize Etherea. Základní protokol Etherea vytváří nový ether a není možné, aby ether vytvořil uživatel.

Ether se razí jako odměna za každý navržený blok a při každém epochálním kontrolním bodu za další činnosti validátorů související s dosažením konsenzu. Celkový počet vydaných etherů závisí na počtu validátorů a na tom, kolik etheru mají uzamčeno. Tento celkový výdej se rovnoměrně rozděluje mezi validátory v ideálním případě, kdy jsou všichni validátoři poctiví a online, ale ve skutečnosti se liší podle výkonu validátorů. Asi 1/8 celkového vydaného etheru jde navrhovateli bloku. Zbytek je rozdělen mezi ostatní validátory. Navrhovatelé bloků také dostávají spropitné z transakčních poplatků a příjmy související s MEV, ale tyto příjmy pocházejí z recyklovaného etheru, nikoli z nově vydaného.

## Pálení etheru {#burning-ether}

Kromě vytváření etheru prostřednictvím odměn za bloky může být ether také zničen procesem zvaným „pálení“. Když se ether spálí, je trvale odstraněn z oběhu.

K pálení etheru dochází při každé transakci na Ethereu. Když uživatelé platí za transakce, základní poplatek za palivo, který je stanoven sítí podle poptávky po transakcích, je zničen. Tento proces, ve spojení s proměnlivými velikostmi bloků a maximálním poplatkem za palivo, zjednodušuje odhad poplatků za transakce na Ethereu. Když je poptávka po síti vysoká, [bloky](https://etherscan.io/block/12965263) mohou spálit více etheru, než kolik se vyrazí, což efektivně kompenzuje vydávání nových etherů.

Pálení základního poplatku omezuje schopnost producenta bloku manipulovat s transakcemi. Např. kdyby producenti bloků dostávali základní poplatek, mohli by zahrnout své vlastní transakce zdarma a zvýšit základní poplatek pro všechny ostatní. Alternativně by mohli vrátit základní poplatek některým uživatelům mimo řetězec, což by vedlo k méně transparentnímu a složitějšímu trhu s transakčními poplatky.

## Denominace etheru {#denominations}

Protože hodnota mnoha transakcí na Ethereu je malá, ether má několik denominací, které mohou být použity jako menší účetní jednotky. Z těchto denominací jsou obzvláště důležité wei a gwei.

Wei je nejmenší možnou jednotkou etheru, a proto se mnoho technických implementací, např. [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), zakládá na výpočtech ve wei.

Gwei, zkratka pro giga-wei, se často používá k popisu nákladů na palivo na Ethereu.

| Denominace | Hodnota v etheru | Běžné použití                   |
| ---------- | ---------------- | ------------------------------- |
| Wei        | 10<sup>-18</sup> | Technické implementace          |
| Gwei       | 10<sup>-9</sup>  | Srozumitelné poplatky za palivo |

## Převod etheru {#transferring-ether}

Každá transakce na Ethereu obsahuje pole `hodnota`, které určuje částku etheru k převodu, denominovanou ve wei, k odeslání z adresy odesílatele na adresu příjemce.

Když je adresou příjemce [chytrý kontrakt](/developers/docs/smart-contracts/), tento převedený ether může být použit k úhradě paliva při vykonávání kódu chytrého kontraktu.

[Další informace o transakcích](/developers/docs/transactions/)

## Dotazování na ether {#querying-ether}

Uživatelé mohou zjistit zůstatek etheru na jakémkoliv [účtu](/developers/docs/accounts/) tím, že se podívají na pole `zůstatku` účtu, které zobrazuje hodnotu drženou v etheru v denominaci wei.

[Etherscan](https://etherscan.io) je populárním nástrojem ke zjištění zůstatků adres prostřednictvím webové aplikace. [Tato stránka na Etherscanu](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) např. ukazuje zůstatek etherů na účtu Ethereum Foundation. Zůstatky účtů lze také zjistit pomocí peněženek nebo přímo pomocí vyslání požadavku na uzly.

## Další informace {#further-reading}

- [Definování Etheru a Etherea](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum Whitepaper](/whitepaper/): Původní návrh Etherea. Tento dokument obsahuje popis etheru a motivaci za jeho vytvořením.
- [Kalkulačka gwei](https://www.alchemy.com/gwei-calculator): Použijte tuto kalkulačku gwei pro snadnou konverzi mezi wei, gwei a ethereum. Stačí zadat jakoukoliv částku ve wei, gwei nebo ETH a automaticky vypočítat konverzi.

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
