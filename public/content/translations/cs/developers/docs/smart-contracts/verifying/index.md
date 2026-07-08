---
title: "Ověřování chytrých kontraktů"
description: "Přehled ověřování zdrojového kódu pro chytré kontrakty na Ethereu"
lang: cs
---

[Chytré kontrakty](/developers/docs/smart-contracts/) jsou navrženy tak, aby byly „nevyžadující důvěru“ (trustless), což znamená, že uživatelé by neměli muset důvěřovat třetím stranám (např. vývojářům a společnostem) před interakcí s kontraktem. Jako předpoklad pro bezdůvěrnost musí být uživatelé a další vývojáři schopni ověřit zdrojový kód chytrého kontraktu. Ověření zdrojového kódu ujišťuje uživatele a vývojáře, že publikovaný kód kontraktu je stejný kód, který běží na adrese kontraktu na blockchainu Etherea.

Je důležité rozlišovat mezi „ověřením zdrojového kódu“ a „[formální verifikací](/developers/docs/smart-contracts/formal-verification/)“. Ověření zdrojového kódu, které bude podrobně vysvětleno níže, se týká ověření, že daný zdrojový kód chytrého kontraktu ve vysokoúrovňovém jazyce (např. Solidity) se zkompiluje do stejného bajtkódu, který má být spuštěn na adrese kontraktu. Formální verifikace však popisuje ověření správnosti chytrého kontraktu, což znamená, že se kontrakt chová podle očekávání. Ačkoli to závisí na kontextu, ověření kontraktu obvykle odkazuje na ověření zdrojového kódu.

## Co je ověření zdrojového kódu? {#what-is-source-code-verification}

Před nasazením chytrého kontraktu do [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) vývojáři [kompilují](/developers/docs/smart-contracts/compiling/) zdrojový kód kontraktu – instrukce [napsané v Solidity](/developers/docs/smart-contracts/languages/) nebo jiném vysokoúrovňovém programovacím jazyce – do bajtkódu. Vzhledem k tomu, že EVM nedokáže interpretovat vysokoúrovňové instrukce, je kompilace zdrojového kódu do bajtkódu (tj. nízkoúrovňových strojových instrukcí) nezbytná pro provádění logiky kontraktu v EVM.

Ověření zdrojového kódu spočívá v porovnání zdrojového kódu chytrého kontraktu a zkompilovaného bajtkódu použitého během vytváření kontraktu za účelem zjištění jakýchkoli rozdílů. Na ověřování chytrých kontraktů záleží, protože inzerovaný kód kontraktu se může lišit od toho, co běží na blockchainu.

Ověření chytrého kontraktu umožňuje zkoumat, co kontrakt dělá, prostřednictvím vysokoúrovňového jazyka, ve kterém je napsán, aniž by bylo nutné číst strojový kód. Funkce, hodnoty a obvykle i názvy proměnných a komentáře zůstávají stejné jako v původním zdrojovém kódu, který je zkompilován a nasazen. To značně usnadňuje čtení kódu. Ověření zdroje také zajišťuje dokumentaci kódu, takže koncoví uživatelé vědí, k čemu je chytrý kontrakt navržen.

### Co je plné ověření? {#full-verification}

Existují některé části zdrojového kódu, které neovlivňují zkompilovaný bajtkód, jako jsou komentáře nebo názvy proměnných. To znamená, že dva zdrojové kódy s různými názvy proměnných a různými komentáři by oba dokázaly ověřit stejný kontrakt. Díky tomu může škodlivý aktér přidat klamavé komentáře nebo uvést zavádějící názvy proměnných uvnitř zdrojového kódu a nechat kontrakt ověřit pomocí zdrojového kódu odlišného od původního zdrojového kódu.

Tomu se lze vyhnout připojením dalších dat k bajtkódu, která slouží jako _kryptografická záruka_ přesnosti zdrojového kódu a jako _otisk_ informací o kompilaci. Potřebné informace se nacházejí v [metadatech kontraktu Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html) a hash tohoto souboru je připojen k bajtkódu kontraktu. Můžete to vidět v akci na [hřišti pro metadata](https://playground.sourcify.dev)

Soubor metadat obsahuje informace o kompilaci kontraktu včetně zdrojových souborů a jejich hashů. To znamená, že pokud se změní jakékoli nastavení kompilace nebo dokonce jen jeden bajt v některém ze zdrojových souborů, soubor metadat se změní. V důsledku toho se změní i hash souboru metadat, který je připojen k bajtkódu. To znamená, že pokud se bajtkód kontraktu + připojený hash metadat shodují s daným zdrojovým kódem a nastavením kompilace, můžeme si být jisti, že se jedná přesně o stejný zdrojový kód použitý při původní kompilaci, a neliší se ani o jediný bajt.

Tento typ ověření, který využívá hash metadat, se označuje jako **„[plné ověření](https://docs.sourcify.dev/docs/full-vs-partial-match/)“** (také „dokonalé ověření“). Pokud se hashe metadat neshodují nebo nejsou při ověřování brány v úvahu, jednalo by se o „částečnou shodu“, což je v současnosti běžnější způsob ověřování kontraktů. Bez plného ověření je možné [vložit škodlivý kód](https://samczsun.com/hiding-in-plain-sight/), který by se v ověřeném zdrojovém kódu neprojevil. Většina vývojářů si plného ověření není vědoma a neuchovává si soubor metadat své kompilace, proto byla částečná verifikace dosud de facto metodou pro ověřování kontraktů.

## Proč je ověření zdrojového kódu důležité? {#importance-of-source-code-verification}

### Bezdůvěrnost {#trustlessness}

Bezdůvěrnost je pravděpodobně největším předpokladem pro chytré kontrakty a [decentralizované aplikace (dapps)](/developers/docs/dapps/). Chytré kontrakty jsou „neměnné“ a nelze je upravovat; kontrakt provede pouze obchodní logiku definovanou v kódu v době nasazení. To znamená, že vývojáři a podniky nemohou po nasazení na Ethereu manipulovat s kódem kontraktu.

Aby byl chytrý kontrakt nevyžadující důvěru, měl by být kód kontraktu k dispozici pro nezávislé ověření. Ačkoli je zkompilovaný bajtkód pro každý chytrý kontrakt veřejně dostupný na blockchainu, nízkoúrovňový jazyk je obtížně srozumitelný – jak pro vývojáře, tak pro uživatele.

Projekty snižují předpoklady důvěry zveřejněním zdrojového kódu svých kontraktů. To však vede k dalšímu problému: je obtížné ověřit, že zveřejněný zdrojový kód odpovídá bajtkódu kontraktu. V tomto scénáři se hodnota bezdůvěrnosti ztrácí, protože uživatelé musí důvěřovat vývojářům, že před nasazením na blockchain nezmění obchodní logiku kontraktu (tj. změnou bajtkódu).

Nástroje pro ověření zdrojového kódu poskytují záruky, že soubory zdrojového kódu chytrého kontraktu odpovídají kódu v assembleru. Výsledkem je ekosystém nevyžadující důvěru, kde uživatelé slepě nedůvěřují třetím stranám a místo toho si kód před vložením prostředků do kontraktu ověří.

### Bezpečnost uživatelů {#user-safety}

U chytrých kontraktů je obvykle v sázce spousta peněz. To vyžaduje vyšší bezpečnostní záruky a ověření logiky chytrého kontraktu před jeho použitím. Problém je v tom, že bezohlední vývojáři mohou uživatele oklamat vložením škodlivého kódu do chytrého kontraktu. Bez ověření mohou mít škodlivé chytré kontrakty [zadní vrátka (backdoors)](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), kontroverzní mechanismy řízení přístupu, zneužitelné zranitelnosti a další věci, které ohrožují bezpečnost uživatelů a které by zůstaly neodhaleny.

Zveřejnění souborů zdrojového kódu chytrého kontraktu usnadňuje zájemcům, jako jsou auditoři, posoudit kontrakt z hlediska potenciálních vektorů útoku. Díky tomu, že chytrý kontrakt nezávisle ověřuje více stran, mají uživatelé silnější záruky jeho bezpečnosti.

## Jak ověřit zdrojový kód pro chytré kontrakty na Ethereu {#source-code-verification-for-ethereum-smart-contracts}

[Nasazení chytrého kontraktu na Ethereu](/developers/docs/smart-contracts/deploying/) vyžaduje odeslání transakce s datovým nákladem (zkompilovaným bajtkódem) na speciální adresu. Datový náklad je generován kompilací zdrojového kódu a navíc jsou k datovému nákladu v transakci připojeny [argumenty konstruktoru](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) instance kontraktu. Kompilace je deterministická, což znamená, že vždy produkuje stejný výstup (tj. bajtkód kontraktu), pokud jsou použity stejné zdrojové soubory a nastavení kompilace (např. verze kompilátoru, optimalizátor).

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

Ověření chytrého kontraktu v podstatě zahrnuje následující kroky:

1. Zadejte zdrojové soubory a nastavení kompilace do kompilátoru.

2. Kompilátor na výstupu vygeneruje bajtkód kontraktu.

3. Získejte bajtkód nasazeného kontraktu na dané adrese.

4. Porovnejte nasazený bajtkód s překompilovaným bajtkódem. Pokud se kódy shodují, kontrakt je ověřen s daným zdrojovým kódem a nastavením kompilace.

5. Navíc, pokud se shodují hashe metadat na konci bajtkódu, bude se jednat o plnou shodu.

Vezměte na vědomí, že se jedná o zjednodušený popis ověřování a existuje mnoho výjimek, které by s tímto postupem nefungovaly, jako je například použití [neměnných proměnných](https://docs.sourcify.dev/docs/immutables/).

## Nástroje pro ověření zdrojového kódu {#source-code-verification-tools}

Tradiční proces ověřování kontraktů může být složitý. Proto máme nástroje pro ověřování zdrojového kódu pro chytré kontrakty nasazené na Ethereu. Tyto nástroje automatizují velkou část ověřování zdrojového kódu a také spravují ověřené kontrakty ve prospěch uživatelů.

### Etherscan {#etherscan}

Ačkoli je Etherscan známý především jako [prohlížeč bloků Etherea](/developers/docs/data-and-analytics/block-explorers/), nabízí také [službu ověření zdrojového kódu](https://etherscan.io/verifyContract) pro vývojáře a uživatele chytrých kontraktů.

Etherscan umožňuje překompilovat bajtkód kontraktu z původního datového nákladu (zdrojový kód, adresa knihovny, nastavení kompilátoru, adresa kontraktu atd.). Pokud je překompilovaný bajtkód spojen s bajtkódem (a parametry konstruktoru) onchain kontraktu, pak [je kontrakt ověřen](https://info.etherscan.com/types-of-contract-verification/).

Po ověření získá zdrojový kód vašeho kontraktu štítek „Verified“ (Ověřeno) a je zveřejněn na Etherscanu, aby jej mohli ostatní auditovat. Je také přidán do sekce [Verified Contracts](https://etherscan.io/contractsVerified/) – repozitáře chytrých kontraktů s ověřenými zdrojovými kódy.

Etherscan je nejpoužívanějším nástrojem pro ověřování kontraktů. Ověřování kontraktů na Etherscanu má však jednu nevýhodu: neporovnává **hash metadat** onchain bajtkódu a překompilovaného bajtkódu. Proto jsou shody na Etherscanu pouze částečné.

[Více o ověřování kontraktů na Etherscanu](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) je open-source prohlížeč bloků, který také poskytuje [službu ověření kontraktů](https://eth.blockscout.com/contract-verification) pro vývojáře a uživatele chytrých kontraktů. Jako open-source alternativa nabízí Blockscout transparentnost v tom, jak se ověřování provádí, a umožňuje komunitě přispívat ke zlepšení procesu ověřování.

Podobně jako jiné ověřovací služby vám Blockscout umožňuje ověřit zdrojový kód vašeho kontraktu překompilováním bajtkódu a jeho porovnáním s nasazeným kontraktem. Po ověření získá váš kontrakt status ověření a zdrojový kód se stane veřejně dostupným pro auditování a interakci. Ověřené kontrakty jsou také uvedeny v [repozitáři ověřených kontraktů](https://eth.blockscout.com/verified-contracts) Blockscoutu pro snadné procházení a objevování.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) je další nástroj pro ověřování kontraktů, který je open-source a decentralizovaný. Není to prohlížeč bloků a ověřuje pouze kontrakty na [různých sítích založených na EVM](https://docs.sourcify.dev/docs/chains). Funguje jako veřejná infrastruktura, na které mohou stavět další nástroje, a jeho cílem je umožnit uživatelsky přívětivější interakce s kontrakty pomocí [ABI](/developers/docs/smart-contracts/compiling/#web-applications) a komentářů [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html), které se nacházejí v souboru metadat.

Na rozdíl od Etherscanu podporuje Sourcify plné shody s hashem metadat. Ověřené kontrakty jsou poskytovány v jeho [veřejném repozitáři](https://docs.sourcify.dev/docs/repository/) přes HTTP a [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), což je decentralizované úložiště [adresované podle obsahu](https://docs.storacha.network/concepts/content-addressing/). To umožňuje načtení souboru metadat kontraktu přes IPFS, protože připojený hash metadat je hash IPFS.

Kromě toho lze přes IPFS získat také soubory zdrojového kódu, protože hashe IPFS těchto souborů se rovněž nacházejí v metadatech. Kontrakt lze ověřit poskytnutím souboru metadat a zdrojových souborů přes jeho API nebo [uživatelské rozhraní (UI)](https://sourcify.dev/#/verifier), případně pomocí pluginů. Monitorovací nástroj Sourcify také naslouchá vytváření kontraktů v nových blocích a pokouší se kontrakty ověřit, pokud jsou jejich metadata a zdrojové soubory zveřejněny na IPFS.

[Více o ověřování kontraktů na Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platforma Tenderly](https://tenderly.co/) umožňuje vývojářům Web3 vytvářet, testovat, monitorovat a provozovat chytré kontrakty. Kombinací ladicích nástrojů s pozorovatelností a stavebními bloky infrastruktury pomáhá Tenderly vývojářům urychlit vývoj chytrých kontraktů. Pro plné využití funkcí Tenderly musí vývojáři [provést ověření zdrojového kódu](https://docs.tenderly.co/monitoring/contract-verification) pomocí několika metod.

Kontrakt je možné ověřit soukromě nebo veřejně. Pokud je ověřen soukromě, chytrý kontrakt je viditelný pouze pro vás (a další členy vašeho projektu). Veřejné ověření kontraktu jej zviditelní pro všechny uživatele platformy Tenderly.

Své kontrakty můžete ověřit pomocí [řídicího panelu (Dashboard)](https://docs.tenderly.co/contract-verification), [pluginu Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat) nebo [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Při ověřování kontraktů prostřednictvím řídicího panelu musíte importovat zdrojový soubor nebo soubor metadat vygenerovaný kompilátorem Solidity, adresu/síť a nastavení kompilátoru.

Použití pluginu Tenderly Hardhat umožňuje větší kontrolu nad procesem ověřování s menším úsilím a dává vám možnost vybrat si mezi automatickým (bez kódu) a manuálním (založeným na kódu) ověřováním.

## Další čtení {#further-reading}

- [Ověřování zdrojového kódu kontraktu](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)