---
title: Ověřování chytrých kontraktů
description: Přehled ověřování zdrojového kódu pro chytré kontrakty na Ethereu
lang: cs
---

[Chytré kontrakty](/developers/docs/smart-contracts/) jsou navrženy tak, aby byly „bez nutnosti další důvěry“, což znamená, že uživatelé by před interakcí s kontraktem neměli důvěřovat třetím stranám (např. vývojářům a společnostem). Podmínkou pro to je, aby uživatelé a další vývojáři mohli ověřit zdrojový kód chytrého kontraktu. Ověření zdrojového kódu zajišťuje uživatelům a vývojářům, že zveřejněný kód kontraktu je stejný kód, který běží na adrese kontraktu na blockchainu Etherea.

Je důležité rozlišovat mezi „ověřováním zdrojového kódu“ a „[formálním ověřováním](/developers/docs/smart-contracts/formal-verification/)“. Ověřování zdrojového kódu, které bude podrobně vysvětleno níže, se týká ověření, že se daný zdrojový kód chytrého kontraktu ve vysoce úrovňovém jazyce (např. Solidity) zkompiluje do stejného bytekódu, který má být spuštěn na adrese kontraktu. Formální ověřování však popisuje ověření správnosti chytrého kontraktu, což znamená, že se kontrakt chová podle očekávání. Ačkoli ověřování kontraktu závisí na kontextu, obvykle se vztahuje na ověření zdrojového kódu.

## Co je ověřování zdrojového kódu? {#what-is-source-code-verification}

Před nasazením chytrého kontraktu do [Virtuálního stroje Etherea (EVM)](/developers/docs/evm/) vývojáři [kompilují](/developers/docs/smart-contracts/compiling/) zdrojový kód kontraktu – instrukce [napsané v jazyce Solidity](/developers/docs/smart-contracts/languages/) nebo jiném vysokoúrovňovém programovacím jazyce – do bytekódu. Jelikož EVM nedokáže interpretovat vysokoúrovňové instrukce, je pro provádění logiky kontraktu v EVM nutná kompilace zdrojového kódu do bytekódu (tj. nízkoúrovňových strojových instrukcí).

Ověřování zdrojového kódu je porovnávání zdrojového kódu chytrého kontraktu a zkompilovaného bytekódu použitého při vytváření kontraktu s cílem odhalit případné rozdíly. Ověřování chytrých kontraktů je důležité, protože inzerovaný kód kontraktu se může lišit od toho, který běží na blockchainu.

Ověřování chytrých kontraktů umožňuje zkoumat, co kontrakt dělá, prostřednictvím vysokoúrovňového jazyka, ve kterém je napsán, aniž by bylo nutné číst strojový kód. Funkce, hodnoty a obvykle i názvy proměnných a komentáře zůstávají stejné jako v původním zdrojovém kódu, který je zkompilován a nasazen. Čtení kódu je tak mnohem snazší. Ověřování zdrojových kódů také zajišťuje dokumentaci kódu, aby koncoví uživatelé věděli, k čemu je chytrý kontrakt určen.

### Co je úplné ověření? {#full-verification}

Některé části zdrojového kódu nemají na zkompilovaný bytekód vliv, například komentáře nebo názvy proměnných. To znamená, že dva zdrojové kódy s různými názvy proměnných a různými komentáři budou schopny ověřit stejný kontrakt. Záškodník tak může do zdrojového kódu přidat klamavé komentáře nebo uvést zavádějící názvy proměnných a nechat ověřit kontrakt s jiným zdrojovým kódem, než je původní zdrojový kód.

Tomu je možné se vyhnout tak, že se k bytekódu připojí další data, která slouží jako _kryptografická záruka_ přesnosti zdrojového kódu a jako _otisk prstu_ informací o kompilaci. Potřebné informace se nacházejí v [metadatech kontraktu Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html) a hash tohoto souboru je připojen k bytekódu kontraktu. Můžete si je prohlédnout v akci na [metadatovém hřišti](https://playground.sourcify.dev)

Soubor metadat obsahuje informace o kompilaci kontraktu včetně zdrojových souborů a jejich hashů. To znamená, že pokud se změní nastavení kompilace nebo dokonce jediný bajt v některém ze zdrojových souborů, změní se i soubor metadat. V důsledku toho se změní i hash souboru metadat, který je připojen k bytekódu. To znamená, že pokud se bytekód kontraktu + připojený hash metadat shodují s daným zdrojovým kódem a nastavením kompilace, můžeme si být jisti, že se jedná o přesně stejný zdrojový kód, který byl použit při původní kompilaci, a že se neliší ani o jediný bajt.

Tento typ ověření, který využívá hash metadat, se označuje jako **„[úplné ověření](https://docs.sourcify.dev/docs/full-vs-partial-match/)“** (také „dokonalé ověření“). Pokud se hashe metadat neshodují nebo nejsou při ověřování brány v úvahu, jedná se o „částečnou shodu“, což je v současné době běžnější způsob ověřování kontraktů. Bez úplného ověření je možné [vložit škodlivý kód](https://samczsun.com/hiding-in-plain-sight/), který by se v ověřeném zdrojovém kódu neprojevil. Většina vývojářů si není vědoma úplného ověření a neuchovává soubor s metadaty o své kompilaci, proto je částečné ověření dosud de facto metodou ověřování kontraktů.

## Proč je ověřování zdrojového kódu důležité? {#importance-of-source-code-verification}

### Bez nutnosti další důvěry {#trustlessness}

Skutečnost, že není potřeba další důvěry je pravděpodobně největším předpokladem pro chytré kontrakty a [decentralizované aplikace (dappky)](/developers/docs/dapps/). Chytré kontrakty jsou „neměnné“ a nelze je pozměnit; kontrakt provede pouze obchodní logiku definovanou v kódu v době nasazení. To znamená, že vývojáři a podniky nemohou manipulovat s kódem kontraktu po jeho nasazení na Ethereu.

Aby chytrý kontrakt fungoval bez nutnosti další důvěry, měl by být kód kontraktu dostupný pro nezávislé ověření. Zatímco zkompilovaný bytekód pro každý chytrý kontrakt je veřejně dostupný na blockchainu, nízkoúrovňový jazyk je obtížně srozumitelný jak pro vývojáře, tak pro uživatele.

Projekty snižují předpoklady důvěryhodnosti zveřejněním zdrojového kódu svých kontraktů. To však vede k dalšímu problému: je obtížné ověřit, zda zveřejněný zdrojový kód odpovídá bytekódu kontraktu. V tomto případě je hodnota bezdůvěryhodnosti ztracena, protože uživatelé musí věřit vývojářům, že nezmění obchodní logiku kontraktu (tj. změnou bytekódu) před jeho nasazením do blockchainu.

Nástroje pro ověřování zdrojového kódu poskytují záruky, že soubory zdrojového kódu chytrého kontraktu odpovídají kódu sestavení. Výsledkem je ekosystém bez nutnosti další důvěry, kde uživatelé slepě nedůvěřují třetím stranám a místo toho si před vložením prostředků do kontraktu ověřují kód.

### Bezpečnost uživatelů {#user-safety}

U chytrých kontraktů je obvykle v sázce spousta peněz. To vyžaduje vyšší bezpečnostní záruky a ověření logiky chytrého kontraktu před jeho použitím. Problém spočívá v tom, že bezohlední vývojáři mohou uživatele oklamat vložením škodlivého kódu do chytrého kontraktu. Bez ověření mohou mít škodlivé chytré kontrakty [zadní vrátka](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), kontroverzní mechanismy řízení přístupu, zneužitelné zranitelnosti a další věci, které ohrožují bezpečnost uživatelů a které by zůstaly neodhaleny.

Zveřejnění souborů se zdrojovým kódem chytrého kontraktu usnadňuje zájemcům, například auditorům, posouzení kontraktu z hlediska možných vektorů útoku. Díky tomu, že chytrý kontrakt nezávisle ověřuje více stran, mají uživatelé větší záruku jeho bezpečnosti.

## Jak ověřit zdrojový kód chytrých kontraktů na Ethereu {#source-code-verification-for-ethereum-smart-contracts}

[Nasazení chytrého kontraktu na Ethereu](/developers/docs/smart-contracts/deploying/) vyžaduje odeslání transakce s datovým payloadem (zkompilovaným bytekódem) na speciální adresu. Datový payload je generován kompilací zdrojového kódu a [argumentů konstruktoru](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) instance kontraktu připojené k datovému payloadu v transakci. Kompilace je deterministická, což znamená, že při použití stejných zdrojových souborů a nastavení kompilace (např. verze překladače, optimalizátor) je vždy vytvořen stejný výstup (tj. bytekód kontraktu).

![Diagram znázorňující ověření zdrojového kódu chytrého kontraktu](./source-code-verification.png)

Ověření chytrého kontraktu v podstatě zahrnuje následující kroky:

1. Vložte zdrojové soubory a nastavení kompilace do kompilátoru.

2. Kompilátor vrátí bytekód kontraktu

3. Vezměte bytekód nasazeného kontraktu na dané adrese

4. Porovnejte nasazenýho bytekód s překompilovaným bytekódem. Pokud se kódy shodují, kontrakt se ověří pomocí zadaného zdrojového kódu a nastavení kompilace.

5. Pokud se navíc hashe metadat na konci bytekódu shodují, jedná se o úplnou shodu.

Berte v úvahu, že se jedná o zjednodušený popis ověřování a existuje mnoho výjimek, které by v tomto případě nefungovaly, například [neměnné proměnné](https://docs.sourcify.dev/docs/immutables/).

## Nástroje pro ověřování zdrojového kódu {#source-code-verification-tools}

Tradiční proces ověřování kontraktů může být složitý. Proto máme nástroje pro ověřování zdrojového kódu chytrých kontraktů nasazených na Ethereu. Tyto nástroje automatizují velkou část ověřování zdrojových kódů a také kurátorsky zpracovávají ověřené kontrakty pro potřeby uživatelů.

### Etherscan {#etherscan}

Ačkoli je Etherscan známý především jako [prohlížeč blockchainu Etherea](/developers/docs/data-and-analytics/block-explorers/), nabízí také [službu ověřování zdrojového kódu](https://etherscan.io/verifyContract) pro vývojáře a uživatele chytrých kontraktů.

Etherscan umožňuje překompilovat bytekód kontraktu z původního datového payloadu (zdrojový kód, adresa knihovny, nastavení kompilátoru, adresa kontraktu atd.). Pokud je překompilovaný bytekód spojen s bytekódem (a parametry konstruktoru) kontraktu na blockchainu, pak je [smlouva ověřena](https://info.etherscan.com/types-of-contract-verification/).

Po ověření obdrží zdrojový kód vašeho kontraktu označení „Ověřeno“ a je zveřejněn na Etherscanu, kde ho mohou kontrolovat ostatní. Přidá se také do sekce [Ověřené kontrakty](https://etherscan.io/contractsVerified/) – úložiště chytrých kontraktů s ověřenými zdrojovými kódy.

Etherscan je nejpoužívanějším nástrojem pro ověřování kontraktů. Ověřování kontraktu na Etherscanu má však nevýhodu: nepodaří se mu porovnat **hash metadat** bytekódu na blockchainu a překompilovaného bytekódu. Shody v programu Etherscan jsou proto pouze částečné.

[ Více o ověřování kontraktů na Etherscanu](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) je další nástroj pro ověřování kontraktů, který je open-source a decentralizovaný. Není to průzkumník bloků a ověřuje pouze kontrakty v [různých sítích založených na EVM](https://docs.sourcify.dev/docs/chains). Funguje jako veřejná infrastruktura pro další nástroje, které na ní mohou stavět, a jejím cílem je umožnit lidsky přívětivější interakce s kontrakty pomocí komentářů [ABI](/developers/docs/smart-contracts/compiling/#web-applications) a [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html), které se nacházejí v souboru metadat.

Na rozdíl od Etherscanu podporuje Sourcify úplné shody s hashem metadat. Ověřené kontrakty jsou doručovány do jeho [veřejného úložiště](https://docs.sourcify.dev/docs/repository/) na HTTP a [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), což je decentralizované, [obsahem adresované](https://web3.storage/docs/concepts/content-addressing/) úložiště. To umožňuje načtení souboru metadat kontraktu přes IPFS, protože připojený hash metadat je hash IPFS.

Kromě toho lze přes IPFS načíst také soubory se zdrojovým kódem, protože v metadatech IPFS se nacházejí také hashe těchto souborů. Kontrakt lze ověřit poskytnutím souboru metadat a zdrojových souborů prostřednictvím rozhraní API nebo [UI](https://sourcify.dev/#/verifier) nebo pomocí pluginů. Monitorovací nástroj Sourcify také aktivně sleduje vytváření kontraktů na nových blocích a snaží se ověřit kontrakty, pokud jsou jejich metadata a zdrojové soubory zveřejněny na systému IPFS.

[ Více informací o ověřování kontraktů na Sourcify](https://blog.soliditylang.org/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platforma Tenderly](https://tenderly.co/) umožňuje vývojářům Web3 vytvářet, testovat, monitorovat a provozovat chytré kontrakty. Tenderly kombinuje ladicí nástroje s pozorovatelností a stavebními bloky infrastruktury a pomáhá vývojářům urychlit vývoj chytrých kontraktů. Aby mohli vývojáři plně využívat funkce Tenderly, musí [provádět ověřování zdrojového kódu](https://docs.tenderly.co/monitoring/contract-verification) pomocí několika metod.

Kontrakt je možné ověřit soukromě nebo veřejně. Pokud je chytrý kontrakt ověřen soukromě, je viditelný pouze pro vás (a ostatní členy vašeho projektu). Veřejné ověření kontraktu ho zviditelní všem uživatelům platformy Tenderly.

Vaše kontrakty můžete ověřit pomocí [Hlavního panelu](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract), [pluginu Tenderly Hardhat](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin) nebo [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Při ověřování kontraktů prostřednictvím hlavního panelu je třeba importovat zdrojový soubor nebo soubor metadat vygenerovaný kompilátorem Solidity, adresu/síť a nastavení kompilátoru.

Použití pluginu Tenderly Hardhat umožňuje větší kontrolu nad procesem ověřování s menším úsilím a umožňuje volit mezi automatickým (bez kódu) a ručním (na základě kódu) ověřováním.

## Další informace {#further-reading}

- [Ověřování zdrojového kódu kontraktu](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
