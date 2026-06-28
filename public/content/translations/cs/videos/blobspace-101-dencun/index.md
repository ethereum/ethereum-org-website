---
title: "Další upgrade Etherea: blobspace 101"
description: "Domothy vysvětluje blobspace, novou vrstvu dostupnosti dat představenou v rámci upgradu Etherea Dencun. Pokrývá, jak fungují transakce s bloby, proč jsou důležité pro škálování Etherea a co bude následovat v oblasti dostupnosti dat."
lang: cs
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Blobspace 101"
---

Tento rozhovor se zabývá zdrojem Etherea zvaným blobspace (prostor pro bloby), který byl představen v [EIP-4844 (proto-danksharding)](https://www.eip4844.com/). Výzkumník Etherea Domothy se připojuje k Davidu Hoffmanovi a Ryanu Seanu Adamsovi v podcastu Bankless, aby vysvětlil historii roadmapy zaměřené na rollupy, technické mechanismy blobů a ekonomické důsledky oddělení prostoru pro bloky (block space) od prostoru pro bloby (blob space).

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=dFjyUY3e53Q) zveřejněného podcastem Bankless. Pro lepší čitelnost byl lehce upraven.*

#### Úvod do blobspace (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Vítejte v Bankless, kde prozkoumáváme hranice internetových peněz a internetových financí. Zde se dozvíte, jak začít, jak se zlepšit a jak využít příležitosti dříve než ostatní. Jsem tu s Davidem Hoffmanem a jsme tu, abychom vám pomohli stát se více „bankless“ (nezávislými na bankách). Víte, jak říkáme, že blockchainy prodávají bloky? No, brzy bude Ethereum prodávat víc než jen bloky – bude prodávat i bloby.

**David Hoffman:** Přesně tak, bloby. Jsme jen pár měsíců od největšího vydání Etherea od Merge a myslím, že nikdo ještě plně nezmapoval jeho důsledky, ale bude to obrovské. Ethereum získává nový produkt k prodeji. Jmenuje se blobspace a je to doplněk k prostoru pro bloky. Náklady na transakce na vrstvách 2 (l2) brzy klesnou téměř k nule. Ekonomika gasu v ETH a jeho spalování se navždy změní. Tento upgrade nazýváme upgrade blobspace, EIP-4844, proto-danksharding. Chceme probrat vše, co potřebujete vědět o blobspace.

**Ryan Sean Adams:** Pár hlavních bodů. Za prvé, projdeme si, co to blobspace je. Za druhé, projdeme si historii toho, jak jsme se sem vlastně dostali – tuto roadmapu zaměřenou na rollupy. Za třetí, probereme ekonomiku. Co to znamená pro ekonomiku Etherea, pro akumulaci hodnoty ETH, pro ETH jako aktivum? Davide, proč pro tebe byla tato epizoda tak významná?

**David Hoffman:** Myslím, že jestli existuje nějaká oblast konverzace, kterou my dva opravdu milujeme, je to průsečík kryptografie a ekonomie – jako jsou čísla a ekonomické projevy. Miluji hraní si s těmito protokoly.

**Ryan Sean Adams:** Jo, to je náš jazyk lásky.

**David Hoffman:** Mluvili jsme o EIP-4844, mluvili jsme o proto-dankshardingu. To jsou ty samé věci. Definovali jsme to už několikrát v různých souvislostech. Ale nikdy jsme se neponořili po hlavě do králičí nory, abychom na druhé straně vylezli s odpověďmi na ekonomickou stránku věci. Takže jsme technicky škálovali dostupnost dat na technické úrovni – to je vylepšení protokolu. Ale jak se to propojuje s tržní stránkou Etherea? Jeden trh se nyní štěpí na dva: prostor pro bloky a blobspace jsou nyní dva různé nezávislé trhy, které jsou obsaženy uvnitř bloku Etherea.

Co to znamená pro ether? Co to znamená pro trhy, které kolem těchto věcí vznikají? Jak se rovnováha nabídky a poptávky každého z nich navzájem ovlivňuje? Co to udělá se škálovatelností vrstvy 2 (l2)? Co to znamená pro ekonomické případy užití nad vrstvami 2? Začneme od základů, ale pak se prokoušeme na druhý konec králičí nory k ekonomické stránce této konverzace.

Pojďme přivítat našeho hosta, Doma, známého také jako Domothy. Je to výzkumník v Nadaci Ethereum, který pracuje na výzkumu a vývoji klíčových upgradů Etherea, které nás čekají, včetně EIP-4844 (dnešní téma), plného dankshardingu a spalování MEV.

#### Historie roadmapy zaměřené na rollupy (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Takže Dome, abychom plně pochopili, jak jsme se dostali k blobspace, myslím, že stojí za to zavzpomínat a pochopit celou roadmapu Etherea, protože ta dospěla k velmi logickému závěru v podobě blobů a blobspace. Můžeš nás vzít zpět v čase? Protože v jednu chvíli roadmapa Etherea zaměřená na rollupy vůbec neexistovala. Měli jsme tu věc zvanou exekuční sharding, kterou jsme vlastně nikdy nedostali. Kde v historii roadmapy Etherea je vhodné začít, abychom opravdu pochopili plný kontext blobspace?

**Domothy:** Jasně. Ještě před spuštěním Etherea už existovaly úvahy o tom, jak ho škálovat, protože už tehdy všichni věděli, že jeden blockchain, kde každý uzel spouští všechno, nebude stačit. Takže zpočátku existovala spousta různých nápadů na sharding. Prvním pokusem o jeho skutečnou specifikaci byl sharding s exekucí, kde máte v podstatě, řekněme, 64 různých nezávislých řetězců, které se snaží navzájem komunikovat. Ukázalo se, že je to těžké provést – je s tím spojena velká složitost.

Bylo to rozděleno do různých fází. Nejprve spustíme Beacon chain, pak vymyslíme, jak ho vlastně sloučit se současnou exekuční vrstvou. Pak uděláme Fázi jedna, což je jen datový sharding – takže žádná exekuce, jen menší blockchainy obsahující data. A pak vymyslíme, jak udělat exekuční sharding. Bylo to hodně o vymýšlení za pochodu, ale bezpečně, abychom neudělali něco, čeho bychom později litovali, a nerozbili celý blockchain, protože je na něm tolik ekonomické aktivity.

**David Hoffman:** Abychom upřesnili exekuční sharding – jde o náhodné přesouvání validátorů napříč různými shardy blockchainu, přičemž každý shard je v podstatě svůj vlastní mini-blockchain běžící paralelně s Beacon chainem. Zní to trochu jako to, co máme dnes s rollupy, ale rozdíl je v tom, že shardy Etherea jsou ve skutečnosti součástí protokolu vrstvy 1 (l1). Protokol vrstvy 1 určuje, co jsou shardy zač, zatímco rollupy jsou oddělené. Původně mělo být těchto shardů 64, provozovaných, spravovaných a vytvářených protokolem Etherea na vrstvě 1. Říkám to správně?

**Domothy:** Přesně tak. Dosažení škálování exekuce tímto způsobem je s rollupy a datovým shardingem nepřímější, ale z pohledu výzkumu je to něco jako cheat kód, protože vrstva 1 Etherea má mnohem méně věcí na práci a starostí. Zbytek je přesunut na rollupy, což je podle mého názoru lepší než původní plán. V původním plánu shardů spravovaných samotným protokolem je všechno stejné – stejný blockchain, stejné EVM, stejné kompromisy. Nyní místo toho můžete mít rollupy, které si navzájem konkurují, aby získaly nejlepší prostředí a kompromisy. Pokud dáváte přednost super rychlosti před super bezpečností, můžete přejít na jiný rollup. Na vrstvě 2 (l2) máte možnosti, inovace a konkurenci.

**Ryan Sean Adams:** Pojďme se dotknout modulárního světa, ve kterém se Ethereum nachází. Je tu vrstva konsensu, vrstva dostupnosti dat a exekuční vrstva. Vrstva konsensu definuje, co je pravda – pořadí bloků. Vrstva dostupnosti dat je to, co se stalo – datová vrstva. Vnější vrstva je exekuce, kde se aktivita odehrává právě teď. Původně Ethereum kombinovalo všechny tři tyto vrstvy v hlavním řetězci.

To, co nyní děláme s roadmapou zaměřenou na rollupy, je, že oddělujeme exekuci z hlavního řetězce do těchto rollupů. Ale aby byly rollupy plně zabezpečeny s podobnými zárukami jako Ethereum Mainnet, musí svá data posílat zpět na Ethereum Mainnet. Když to udělají, v současnosti to stojí prostor v bloku a stojí to spoustu peněz. Důvodem pro proto-danksharding (EIP-4844) je, že se ekonomika mění způsobem, který je pro rollupy velmi příznivý. Dome, chceš k tomu něco dodat?

**Domothy:** Jen bych dodal, že právě teď je dostupnost dat spíše implicitní a scvrkává se na ověřování nevyžadující důvěru. Chceme, aby si každý mohl řetězec ověřit sám a nemusel mít uprostřed třetí stranu typu „věř mi, brácho“. To je to úzké hrdlo. Musíte být schopni ověřit všechno, což implicitně znamená, že musíte mít k dispozici data, abyste mohli zkontrolovat přechody stavu.

Koncem roku 2020 si lidé uvědomili, že rollupy začínají být neuvěřitelně dobré a populární a že řeší náš problém se škálování exekuce bez nutnosti exekučního shardingu. Tím, že se vydáme cestou ekosystému rollupů, místo abychom se snažili být nějakými maximalisty vrstvy 1, mohou rollupy dělat své vlastní kompromisy, spouštět své vlastní blockchainy a experimentovat s novými věcmi. Ethereum se stará o ověřování – to je jádro toho, co blockchain je.

#### Co je to blobspace? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Nyní nás přenes do současného stavu, Dome. Máme mnoho rollupů, které využívají prostor pro bloky na vrstvě 1 Etherea a platí vysoké poplatky za gas, aby mohly zveřejňovat svá stavová data, aby si je mohl kdokoli ověřit. Takže, Dome, co je to blob?

**Domothy:** Blob je prostě kus dat – konkrétně v podstatě velké, surové pole čísel. Blob na Ethereu má v současnosti pevnou velikost asi 128 kilobajtů. Jsou to jen surová data připojená k transakci, známé jako transakce nesoucí blob (blob-carrying transaction), kterou odešlete na vrstvu 1.

Klíčovým konstrukčním omezením zde je, že EVM (Ethereum Virtual Machine) na vrstvě 1 Etherea – exekuční jádro – nemá k datům uvnitř blobu přístup. Ve standardních blocích data, jako jsou data volání, znamenají, že se systém dívá na to, jaké funkce jsou volány, jaké peníze se přesouvají, a ověřuje změny stavu. EVM má k tomu všemu přístup. Ale pokud škálování vrstvy 2 (l2) zahrnuje zveřejňování dat rollupů právě proto, aby výpočet mohl provést *offchain* ověřovatel, pak se na ně *vrstva 1* Etherea funkčně nepotřebuje dívat a provádět je.

Je to v podstatě zapečetěný balíček. Vrstva 1 ho převezme, zaručí, že každý má přístup podívat se dovnitř, pokud si ho chce fyzicky stáhnout, ale samotná hlavní exekuční vrstva Etherea, která zpracovává data, je aktivně nečte a nepočítá. Protože data v EVM nečte a nepočítá, vyžaduje od uzlů radikálně méně výpočetních prostředků. Proto je to o tolik levnější.

**David Hoffman:** Takže abychom to shrnuli: Prostor pro bloky se stará o výpočty, exekuci stavu a ukládání logiky. Blobspace se stará výhradně o dostupnost dat. Vrstvě 1 je jedno, kdo co do těchto blobů vkládá; stará se jen o to, aby tyto bloby přijala a uchovala je po určené okno dostupnosti, aby si je mohly zúčastněné strany (jako sekvencery rollupů a uživatelé) stáhnout, ověřit, že data nebyla zlomyslně zatajena, a jít dál.

**Domothy:** Přesně tak. A další kritickou vlastností blobů je, že jsou po určité době automaticky promazávány – v současnosti je to asi 18 dní. Důvodem jejich promazávání je to, že k zaručení ověřování nevyžadujícího důvěru potřebují jednotlivci tato data pouze k prokázání finality a konsensu ohledně stavu rollupu v rámci specifického okna pro zpochybnění. Nepotřebujete tisíc uzlů, které by uchovávaly bloby staré dva roky, abyste mohli ověřit svou dnešní transakci. Když toto okno vyprší, už je z uzlu Etherea nezískáte; získáte je od poskytovatelů historie, indexerů nebo nativních průzkumníků bloků daného rollupu. Úložiště na Ethereu je navždy šíleně drahé. Odstranění požadavku na ukládání nám umožňuje škálovat propustnost blobů, aniž bychom zničili pevné disky provozovatelů uzlů.

#### Ekonomika a plný danksharding (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Víme, že 4844 je první krok – to, čemu říkáme proto-danksharding. Zavádí formát blobu a izolovaný trh s poplatky, ale skutečný cílový počet blobů na blok je zpočátku omezen, aby to bylo zcela bezpečné. Jak to vypadá se škálováním směrem k plnému dankshardingu?

**Domothy:** Právě teď, v rámci EIP-4844, cílíme v podstatě na 3 bloby na blok, s pevným maximem 6. To omezuje absolutní maximální propustnost dat na vrstvě 1 bezprostředně po upgradu, aby se zabránilo jakémukoli přetížení sítě, zatímco budeme sledovat, jak tato funkce funguje v nepřetržitém provozu.

Plný danksharding to dramaticky škáluje. Posouvá se směrem k vzorkování dostupnosti dat (DAS). S DAS už plné uzly nemusí individuálně stahovat každý jednotlivý blob, aby ověřily, že data byla zpřístupněna. Mohou statisticky vzorkovat nepatrné kousky dat z blobu. Pokud se statistický vzorek ukáže jako dostupný, matematická pravděpodobnost, že útočník skrývá data, se blíží efektivně nule (jako šance jedna ku miliardě). Jakmile nevyžadujete plné stažení celého blobu, můžete škálovat kapacitu blobů do dvouciferných čísel nebo i výše na blok.

**David Hoffman:** To vytváří rozštěpený trh s poplatky uvnitř bloku Etherea. Právě teď musí rollup na vrstvě 2 (l2) soutěžit s obchodníky na Uniswapu a OpenSea o stejné zdroje prostoru pro bloky v bloku Etherea. Ale to jsou zásadně odlišné vzorce používání. Pokud se na vrstvě 1 (l1) Etherea zblázní ražba NFT, gas vyletí nahoru a rollupy na vrstvě 2, které se snaží zveřejnit svůj datový stav, najednou čelí raketově rostoucím obchodním nákladům jen proto, aby splnily své nezbytné bezpečnostní povinnosti.

S dvourozměrným trhem s poplatky – v podstatě oddělenou izolovanou silnicí, po které mohou bloby jezdit – ta ražba NFT na vrstvě 1 Etherea stejným způsobem vystřelí exekuční gas, ale nevyužije žádný blobspace. Bloby zůstávají zcela nezahlcené a efektivně stojí haléře. Mnohamilionová ražba NFT na hlavním řetězci má nulový dopad na ekonomické náklady finalizace transakcí na Arbitrum nebo Optimism.

**Domothy:** Ano, jsou zcela oddělené. A platí to i naopak. Pokud propustnost vrstvy 2 nesmírně vzroste a tisíce rollupů budou fungovat a zahltí blobspace, výsledný nárůst základních poplatků za bloby neovlivní náklady na provedení jednoduché transakce na Ethereum Mainnetu. Základní poplatek za blob funguje přesně jako základní poplatek v EIP-1559, ale ve své vlastní dimenzi. A k tvé dřívější otázce ohledně spalování – ano, poplatek za blob generuje spálené ETH k zaplacení za zahrnutí dat do blobspace, zcela odděleně od spalování základního poplatku za prostor pro bloky.

#### Budoucnost škálovatelnosti Etherea (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Chci se dostat k tomu, co se stane konkrétně při vydání 4844. Zpočátku je zjevně velmi vysoké očekávání, že když se kapacita blobů najednou odemkne, nebude v té přesné mikrosekundě dostatečná poptávka ze strany rollupů, aby se zcela zaplnila. Blobspace bude při spuštění až komicky levný. Ale neplatí tu zákon indukované poptávky? Pokud máte neuvěřitelně levné zdroje, aplikace, které tyto zdroje spotřebovávají, explodují v objemu.

**Domothy:** Počáteční přechod sníží poplatky na vrstvě 2 v podstatě téměř na nulu, protože všechny stávající rollupy, které v současnosti soutěží o drahý prostor pro bloky, plynule přejdou do téměř prázdného masivního fondu blobspace. To je masivní a okamžité rozšíření marže pro sítě na vrstvě 2, které se přenese přímo na uživatele v okamžiku, kdy integrují svou novou dokazovací logiku s 4844.

Ale máš pravdu – levný prostor pro bloky pohání vysokorychlostní design aplikací. Když najednou můžete postavit onchain hru, která generuje miliony a miliony přechodů mikro-stavů za zlomky haléře, protože režie na trvalé uchovávání dat je pryč, stávají se ekonomicky životaschopnými zcela nové klasifikace aplikací, které by za standardních omezení nebyly možné.

To vytváří zajímavou ekonomickou dynamiku v tom, jak ETH akumuluje hodnotu. Pokud transakce na vrstvě 2 explodují 10x nebo 100x kvůli nově možným aplikacím běžícím na téměř bezplatné dostupnosti dat, agregovaný objem nakonec začne soutěžit o blobspace. Pak základní poplatek za blob podle EIP-1559 přirozeně poroste, dokud trh nedosáhne rovnováhy, čímž se vytvoří složená nepřetržitá smyčka spalování ETH při současném rozšiřování užitečnosti vrstvy 2.

**David Hoffman:** Představuje to úspěch a zrání roadmapy zaměřené na rollupy. Ethereum jako monolitické exekuční prostředí narazilo na zeď, kde lineární škálování propustnosti ničilo jeho mandát k decentralizaci. Rollupy poskytly způsob, jak obejít úzké hrdlo exekuce, ale stále byly připoutány k úzkému hrdlu dat na vrstvě 1. Blobspace odemyká datové úzké hrdlo stejným způsobem, jakým rollupy odemkly exekuční úzké hrdlo. Až bude tento upgrade spuštěn, Ethereum plně přejde od zpracovávání jednotlivých transakcí ke zpracovávání ověřených exekučních sítí.

**Ryan Sean Adams:** Abychom shrnuli časovou osu, EIP-4844 přijde optimisticky do konce roku nebo začátkem příštího roku a plný danksharding bude následovat v dalším vývojovém cyklu. Je to skutečně infrastrukturní lešení potřebné k tomu, aby Ethereum mohlo přijmout celou planetu, a jsme tak blízko k tomu, aby to fungovalo v reálném světě. Dome, děkujeme, že jsi nás provedl tímto masivním odemknutím potenciálu sítě.

**Domothy:** Děkuji za pozvání.