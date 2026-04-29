---
title: "Co přinese upgrade Pectra?"
description: "Christine Kim o upgradu Pectra sítě Ethereum, včetně EIP zahrnutých do upgradu, co mění na protokolu a proč jsou důležité pro uživatele, vývojáře a validátory."
lang: cs
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Přehled Pectra"
---

Prezentace **Christine Kim** na Devcon SEA, která pokrývá EIP zahrnuté do upgradu Pectra sítě Ethereum, co mění na protokolu, kdy se očekává aktivace na Mainnetu a které EIP byly z rozsahu odstraněny.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=ufIDBCgdGwY) zveřejněného Nadací Ethereum. Byl lehce upraven pro lepší čitelnost.*

#### Úvod (0:00) {#introduction-000}

Budeme mluvit o všech EIP, které budou součástí upgradu Pectra. Rychlé upozornění, než začnu: vše, co se chystám říct, je pouze informativní — pro informační účely — a nemělo by to být vykládáno jako finanční nebo investiční poradenství.

#### Kdy bude Pectra na Mainnetu (0:23) {#when-is-pectra-mainnet-023}

Než se dostaneme k tomu, co bude součástí upgradu Pectra, otázka, kterou dostávám nejčastěji, zní: „Kdy bude Pectra na Mainnetu?“ Takže to hned na začátku vyřeším, abychom se mohli vrhnout na technické věci.

Toto je velmi předběžná analýza časového plánu. Když se mě lidé ptají, kdy k upgradu Pectra dojde, říkám, že je příliš brzy na to to říct — protože je to pravda. Pectra je stále ve velmi raných fázích vývoje. Specifikace se mění a rozsah upgradu Pectra ještě nebyl skutečně finalizován.

Během tohoto procesu se můžete mimo jiné dozvědět, jak se upgrady vyvíjejí, jak se testují a jak se nakonec dostanou na Mainnet. Zpočátku se vývojáři rozhodnou pro několik EIP, které do upgradu zahrnou, a poté tyto EIP implementují na soukromé testnety zaměřené na vývojáře, zvané devnety. Vývojáři již pro upgrade Pectra spustili několik devnetů, takže tyto EIP již prošly několika koly implementace. Vývojáři si všimli okrajových případů a chyb, které chtějí opravit, a iterují na těchto EIP spouštěním nových devnetů. Devnet 4 byl spuštěn minulý měsíc v říjnu.

To se obvykle nestává, ale vývojáři — velmi speciálně pro celou tuto konferenci a pro všechny v publiku — spustili tento měsíc první veřejný testnet Pectra. Jmenuje se Mekong, takže si můžete jít a brzy vyzkoušet interakci s některými EIP, které budou v upgradu Pectra. Je založen na specifikacích devnetu 4, ale vezměte prosím na vědomí, že tyto specifikace se mění.

Existuje seznam změn specifikací pro EIP, které vývojáři již chtějí zahrnout do devnetu 5 Pectra — věci jako změna ceny za předkompilovaný kontrakt BLS a nové EIP, které nebylo implementováno do devnetu 4, ale vývojáři se jej snaží implementovat pro devnet 5 nebo budoucí upgrade. Specifikace Pectra se tedy mění. Předpokládám, že proběhne ještě několik dalších devnetů, než budou specifikace skutečně zmrazeny.

Další částí, která je pro upgrade Pectra a jeho postup na Mainnet opravdu důležitá, je finalizace rozsahu — aby se rozhodlo o všech EIP, které do upgradu Pectra půjdou. Je tu jedno EIP — vlastně to ještě není EIP — ale jde o zvýšení kapacity blobů, které vývojáři ještě formálně do upgradu Pectra nezahrnuli, ale zdá se, že pravděpodobně nějaké zvýšení kapacity blobů zahrnou, protože nedávno zahrnuli EIP, které zavádí mechanismus pro dynamickou aktualizaci cílového a maximálního množství gasu pro blob prostřednictvím vrstvy konsensu, namísto toho, aby tyto parametry byly pevně zakódovány v exekuční vrstvě a vrstvě konsensu.

Jakmile je rozsah finalizován, začnete testovat jakákoli nová EIP, která jste implementovali — plný rozsah upgradu Pectra — a podrobíte je zátěžovým testům na několika dalších devnetech. Představuji si to možná až do devnetu 6 nebo 7. A jakmile budou specifikace Pectra zmrazeny a připraveny — všechny okrajové případy, které mohou vývojáři na devnetech najít, byly nalezeny — vydají upgrade Pectra na veřejné testnety Etherea. V současné době jsou dva: Sepolia a Holesky.

Historicky si vývojáři vyhradili asi dva týdny mezi upgrady veřejných testnetů. Ve vzácných případech vývojáři zkrátili tento časový plán na pouhý jeden týden mezi testnety, ale vzhledem k velikosti upgradu Pectra si představuji, že vývojáři budou chtít využít plný čas. Počítám zhruba s měsícem pro sítě Sepolia a Holesky, a poté může konečně proběhnout aktivace na Mainnetu.

Vzhledem ke všem informacím, které v tuto chvíli vím, a pokroku, kterého vývojáři na upgradu Pectra dosud dosáhli, je moje nejlepší analýza a odhad, že Pectra na Mainnetu reálně proběhne v dubnu 2025. Opět platí, že je to velmi předběžné, protože se toho může hodně změnit. Vývoj probíhá z týdne na týden — vývojáři jsou na těchto hovorech ACD a mluví o chybě, kterou v tomto EIP nečekali, nebo o novém EIP, které chtějí do upgradu Pectra přidat.

#### EIP exekuční vrstvy (6:23) {#execution-layer-eips-623}

Přejděme k jádru této přednášky — co bude součástí upgradu Pectra. Do upgradu Pectra jde deset EIP a čtyři z nich jsou zaměřeny na exekuční vrstvu.

**EIP-2537** je nový předkompilovaný kontrakt do EVM — operace na křivce BLS12-381. Jedná se o nové schéma kryptografického podpisu, o které vývojáři chytrých kontraktů žádají již velmi dlouho. Toto EIP bylo vytvořeno v roce 2020 a v té době vývojáři decentralizovaných aplikací (dapp) říkali, že ho opravdu chtějí, protože by určitým dapp, které spoléhají na kryptografii s nulovým vědomím, poskytlo silnější záruky soukromí, potenciálně zvýšenou bezpečnost a škálovatelnost. Podpisy BLS jsou také agregací, ke které dochází na vrstvě konsensu pro atestace validátorů. Na toto EIP se čeká dlouho. Jednou z obav je: existují stále aplikace, které čekají na předkompilovaný kontrakt BLS, a budou ho používat, až bude spuštěn? Ale pokud jste v tomto publiku a nevěděli jste, že předkompilovaný kontrakt BLS konečně přichází — tak přichází.

**EIP-2935** — poskytování hashů historických bloků ze stavu. Toto EIP zavádí změnu v exekuční vrstvě tak, že důkazy historických bloků mohou být generovány ze stavu. Má to určité krátkodobé výhody pro synchronizaci lehkých klientů a pro chytré kontrakty, které by mohly chtít využívat data o stavu předchozího bloku přímo prostřednictvím EVM — to v současnosti vlastně nelze. Ale tyto krátkodobé výhody nejsou hlavním důvodem, proč bylo toto EIP zahrnuto do upgradu Pectra. Hlavním důvodem je, že je to předpoklad pro Verkle — zásadní přepracování datové struktury stavu Etherea. Vývojáři si mysleli, že k tomuto přechodu dojde hned po upgradu Pectra, ale Verkle do upgradu Fusaka nepůjde. Odložili to na další upgrade, ale tento odrazový můstek už byl odškrtnut ze seznamu.

**EIP-7685** — obecné požadavky exekuční vrstvy. Toto EIP ve skutečnosti nepřináší do Etherea nové funkce — je to EIP na podporu dalších EIP v upgradu Pectra. V upgradu Pectra je několik EIP, kde exekuční vrstva bude moci předávat vrstvě konsensu mnohem více zpráv — různé druhy zpráv — což dříve nemohla. Chytré kontrakty na exekuční vrstvě budou moci spouštět výběry validátorů, konsolidace a vklady. Namísto implementace těchto nových komunikačních kanálů odděleným a jedinečným způsobem, toto EIP vytváří zobecněnou strukturu — zobecněnou sběrnici — pro uložení těchto požadavků. Bude snazší to testovat, snazší implementovat napříč klienty a snazší standardizovat, zejména pokud vývojáři budou chtít zavést nové typy požadavků spustitelných z exekuční vrstvy.

**EIP-7702** — nastavení kódu pro externě vlastněné účty (EOA). Do Etherea přichází nový typ transakce. Tento typ transakce dočasně umožní EOA mít větší flexibilitu, což umožní funkce jako dávkování transakcí, sponzorované transakce, podmíněné transakce a delegovanou bezpečnost. Možná si říkáte: „Je to vize abstrakce účtu, která ožívá na Ethereu?“ Ne, není — je to jen malý krůček. Je to raný krok k tomu, abychom viděli, jak by mohl vypadat skutečný plán k opravdové nativní abstrakci účtu na Ethereu. Proběhla poměrně velká debata o tom, jak by měli vývojáři tento první krok udělat, a spousta kontroverzí kolem jeho zařazení a designu — ale je tam.

#### EIP vrstvy konsensu (12:00) {#consensus-layer-eips-1200}

Je tu šest dalších — to jsou EIP vrstvy konsensu.

**EIP-7742** — oddělení počtu blobů mezi vrstvou konsensu a exekuční vrstvou. Toto je nejnovější EIP, které bylo zahrnuto do upgradu Pectra. V současné době je kapacita blobů pevně zakódována v exekuční vrstvě a vrstvě konsensu ve všech různých klientech. Aktualizace tohoto pevného zakódování není tak snadná, jak by si někteří mohli myslet. Vytvoření mechanismu pro dynamické nastavení kapacity blobů prostřednictvím vrstvy konsensu zajistí, že v budoucnu budou moci vývojáři snadno změnit kapacitu blobů Etherea a že takový upgrade bude vyžadovat pouze změny vrstvy konsensu — nikoli změny obou vrstev.

**EIP-6110** — poskytování vkladů validátorů onchain. Merge proběhl a Ethereum je jako blockchain s důkazem podílem (PoS) vyspělejší. Určité bezpečnostní předpoklady lze nyní uvolnit. Toto EIP odstraňuje dodatečné kolo hlasování, ke kterému dochází na straně vrstvy konsensu pokaždé, když vložíte 32 ETH do depozitního kontraktu, čímž se zajistí, že veškerá validace vkladů probíhá na exekuční vrstvě. To má výhody pro uživatelskou zkušenost (UX) validátorů — zkrátí to dobu mezi tím, kdy vložíte svých 32 ETH, a tím, kdy uvidíte, že je validátor skutečně aktivován na Beacon chainu.

**EIP-7002** — výběry spustitelné z exekuční vrstvy. To je velmi dobré pro staking pooly. Právě teď, pokud chcete plně vybrat prostředky validátora, operátor uzlu, který tohoto validátora provozuje, musí použít svůj klíč pro výběr, aby provedl úplný výstup validátora. Prostřednictvím tohoto EIP budou moci chytré kontrakty tyto úplné výběry iniciovat. Je to předpoklad důvěry, který nyní můžete ze staking poolů odstranit — pooly jako Lido, Rocket Pool a další staking pooly založené na chytrých kontraktech mohou nyní spustit úplné výběry validátorů, pokud si to přejí.

**EIP-7251** — zvýšení maximálního efektivního zůstatku. To je opravdu problém. Když vývojáři přemýšleli o Beacon chainu, nečekali, že se sada validátorů rozroste tak rychle — jsme na zhruba 1,2 nebo 1,3 milionu validátorů. Je tu spousta aktivních validátorů, spousta zpráv, které se předávají na síťové vrstvě, a je toho příliš mnoho. Zatěžuje to uzly a pokud by se to neřešilo, byl by to velký problém pro zdraví Etherea. EIP-7251 je navrženo tak, aby povzbudilo validátory ke konsolidaci jejich ETH a k tomu, aby měli maximální efektivní zůstatek (MaxEB) vyšší než 32 ETH, čímž se sníží počet aktivních validátorů na Ethereu.

**EIP-7549** — přesun indexu výboru mimo atestaci. Jedná se o restrukturalizaci a refaktorování způsobu, jakým jsou atestace agregovány, aby se snížilo síťové zatížení Etherea a ušetřila šířka pásma uzlů. Když to vývojáři zahrnovali do upgradu Pectra, mysleli si, že je to skvělá změna s úžasnými výhodami a že bude snadná — ale v praxi se ukázalo, že je mnohem těžší ji implementovat, než se očekávalo.

#### Shrnutí (17:19) {#summary-1719}

Pectra je pestrá směs aktualizací. Udělá tři věci: zaprvé, opraví kritické nedostatky Etherea jako blockchainu s důkazem podílem (PoS) — vezměte si MaxEB, to je kritická oprava, protože velikost sady validátorů může nadále nekontrolovaně růst. Zadruhé, zlepší uživatelskou zkušenost — nový typ transakce, flexibilnější designy, některá vylepšení pro designy nevyžadující důvěru u staking poolů. A zatřetí, zvýší kapacitu dostupnosti dat Etherea — to sice nebylo formálně zahrnuto do upgradu Pectra, ale zdá se to pravděpodobné.

#### EIP odstraněná z upgradu Pectra (18:02) {#eips-removed-from-pectra-1802}

Zde jsou všechna EIP, která byla z upgradu Pectra odstraněna. Je to tak trochu poprvé, co bylo z upgradu odstraněno tolik EIP.

**PeerDAS** — původně mělo v upgradu Pectra dojít k mnohem většímu zvýšení kapacity dostupnosti dat. PeerDAS by vývojářům umožnil několikanásobně zvýšit cílový počet blobů Etherea, aniž by to výrazně ovlivnilo spotřebu šířky pásma a výpočetní požadavky na provoz uzlu Etherea. Stále je to ale ve fázi výzkumu a vývoje.

**EOF** — EVM Object Format. Těchto jedenáct změn kódu jako balíček představuje zásadní aktualizaci EVM Etherea. Jak PeerDAS, tak EOF byly původně skutečně zahrnuty do upgradu Pectra, ale byly testovány na samostatných devnetech. Vývojáři si mysleli, že budou vyžadovat mnohem více času na přípravu pro aktivaci na Mainnetu, a nechtěli zdržovat ostatní EIP upgradu Pectra. Takže řekli, že PeerDAS a EOF jasně potřebují více času — přesunou je do dalšího upgradu a nebudou zdržovat ostatní EIP upgradu Pectra od Mainnetu.

Tyto jsou nyní přesunuty do upgradu Fusaka. Verkle byl původně plánován pro upgrade Fusaka, ale od té doby byl dále odložen. EOF a PeerDAS jsou prozatím v upgradu Fusaka. Existují další EIP, u kterých vývojáři přehodnotí zahrnutí do upgradu Fusaka — přechod na SSZ, seznamy zahrnutí (inclusion lists), změny v emisi, exspirace historie, ePBS a směřování abstrakce účtu.

#### Otázky a odpovědi (22:02) {#qa-2202}

**Moderátor:** Kdy bude EOF?

**Christine Kim:** Doslova jsem právě řekla, že se to vývojáři pokusí dát do upgradu Fusaka. Myslím si, že je to pravděpodobné? Asi ne. Myslím si, že Fusaka proběhne v roce 2025? Rozhodně ne. Vzhledem k množství času, které zabrala příprava upgradu Pectra — Fusaka zabere podobný, ne-li delší čas.

**Moderátor:** Existuje nějaká nouzová cesta pro zvýšení cílového počtu blobů mezi dneškem a aktivací upgradu Pectra?

**Christine Kim:** Ne. Cílový počet blobů je pevně zakódovaný parametr v exekuční vrstvě a vrstvě konsensu. Aby se kapacita blobů změnila, musí vývojáři provést hard fork. Nemyslím si, že existuje nějaký způsob, jak by se kapacita blobů mohla zvýšit mezi dneškem a upgradem Pectra bez hard forku.

**Moderátor:** Týká se návrh pouze změny limitu blobů, nebo také cílového počtu blobů?

**Christine Kim:** Skvělá otázka. Nejkonzervativnější zvýšení je ze tří na čtyři — pouze změna cíle, bez jakékoli změny maxima. Ale to není to, o co vývojáři vrstvy 2 (l2) žádali. Je tu zástupce týmu Base — týmu Base od Coinbase — a ten usiluje o agresivnější zvýšení. Ukázal data naznačující, že by zvýšení nemělo negativní dopad na decentralizaci Etherea. Existuje konzervativní návrh změnit pouze cíl, a pak je tu ambicióznější návrh změnit jak maximum, tak cíl — například osm a čtyři, nebo šest a dvanáct. Existují různé stupně.

**Moderátor:** Vyzvala jste lidi, aby se více zapojili do správy. Jak se může komunita více zapojit?

**Christine Kim:** ETH Research a ETH Magicians jsou dvě opravdu skvělá diskusní fóra pro hlasování o určitých EIP a vyjádření vaší podpory. Hovory ACD jsou pravděpodobně místem s nejvyšším signálem — vše, co musíte udělat, je zanechat komentář k agendě hovoru ACD na GitHubu a říct, že toto je EIP, o kterém byste chtěli mluvit nebo ho prezentovat. Moderátor hovoru je obvykle velmi ochotný vám ten čas poskytnout. Nezabírejte ale příliš mnoho času — možná pět minut, abyste řekli, co máte na srdci.