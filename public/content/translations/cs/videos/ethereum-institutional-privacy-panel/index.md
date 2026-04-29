---
title: "Institucionální soukromí na Ethereu v současnosti"
description: "Panelová diskuse na akci Web3Privacy Now během Devconnect 2025, kde odborníci probírají reálné potřeby institucionálního soukromí na Ethereu, od dodržování předpisů až po důkazy s nulovou znalostí."
lang: cs
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "soukromí a bezpečnost"
  - "soukromí"
format: panel
author: Web3Privacy Now
breadcrumb: "Institucionální soukromí"
---

Panelová diskuse na akci Web3Privacy Now během Devconnect 2025, kterou moderoval **Oskar Thorin** (IPTF/EF) a které se zúčastnili **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association) a **François** (Polygon Miden). Diskutovali o reálných potřebách institucionálního soukromí na Ethereu, od dodržování předpisů až po důkazy s nulovou znalostí pro institucionální decentralizované finance (DeFi).

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=cZqlg4W1Els) zveřejněného organizací Web3Privacy Now. Byl lehce upraven pro lepší čitelnost.*

#### Úvod do Institutional Privacy Task Force (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Ahoj. Slyšíte mě? Dobře. Skvělé. Takže nejprve si dáme velmi krátkou úvodní přednášku — tak na 3 až 5 minut — a ta nás pak přivede k panelové diskusi. Toto je zkrácená přednáška. Předchozí panel hodně mluvil o dodržování předpisů, soukromí a tak dále. Měl jsem předchozí přednášku na Cyban Congress, která se toho také dotkla, a delší verze této přednášky proběhne později dnes na DeFi Day. O čem ale chci mluvit, je institucionální soukromí na Ethereu.

Jmenuji se Oskar a vedu IPTF v Nadaci Ethereum. Znamená to Institutional Privacy Task Force (Pracovní skupina pro institucionální soukromí). A proč na institucionálním soukromí záleží? Záleží na něm z několika důvodů. Myslím, že jedním z hlavních důvodů je, že když se podíváte na tyto obrovské finanční instituce, které existují, bavíme se o bilionech dolarů v peněžních tocích. Dříve byla největší překážkou pro jejich přesun onchain regulace. Ale to, co se stalo v posledních několika letech, je, že největší překážkou pro ně je nyní ve skutečnosti soukromí.

Jaký je zde tedy potenciál a dopad? Myslím, že i pouhý přesun 1 % prostředků z tradičních financí na Ethereum by měl obrovský dopad z hlediska vlivu, jaký může mít Ethereum na soukromí. A už jen to, že zde proběhne onboarding jediné instituce, se dotkne milionů uživatelů, že? To není hypotetické. Existují instituce, které už jsou onchain, a v příštím roce se tu odehraje spousta věcí. Čas na to je právě teď, pokud jde o přesun institucí onchain se zabudovaným soukromím.

Jediná velká instituce zde může mít obrovský vliv na to, který ekosystém nakonec vyhraje — ať už to bude Ethereum, nebo více privátní verze. Proč chtějí Ethereum? Je k tomu několik důvodů. Věci jako likvidita, odolnost vůči cenzuře, 10letá doba nepřetržitého provozu a to, že je to prodejní argument z hlediska vypořádání. Existují i jiné alternativy, ale ty mají svá vlastní omezení. 

Aby mohlo Ethereum provést onboarding těchto institucí, musí vyřešit tyto obavy o soukromí. To, o co se v Institutional Privacy Task Force snažíme, je onboarding institucí na Ethereum a zajištění toho, aby byly splněny jejich cíle v oblasti soukromí. Pořádáme například workshopy, snažíme se tento prostor demystifikovat a zajistit, abychom dokázali řešit institucionální potřeby, konkrétně pokud jde o soukromí. Prvním výstupem, který máme, je tato mapa institucionálního soukromí — mluvíme s obrovskými institucemi, chápeme jejich obchodní případy použití a požadavky, otevíráme zdrojový kód (open source) v co největší míře a pak mluvíme s dodavateli v tomto prostoru, abychom propojili instituce s prostorem řešení. 

#### Představení panelu a institucionální problémy (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Omlouvám se, že to bylo trochu rychlé, ale snad srozumitelné. Tento panel má tedy spoustu odborníků napříč výzkumem, politikou a inženýrstvím a budeme mluvit o institucionálním soukromí. 

Jen krátké představení: Máme tu Eugenia, který je vedoucím růstu v European Blockchain Association. Máme tu Zacha Obronta, generálního ředitele společnosti Etherealize, kde buduje institucionální produkty a základní primitiva pro soukromí. Máme tu Amzaha, který strávil většinu své kariéry v řízení finančních rizik, než se hluboce zapojil do Etherea, a nyní propojuje tradiční kontroly s nativními trhy Etherea. A nakonec tu máme Françoise, vedoucího inženýra protokolu v Polygon Miden, který se zaměřuje na systémy důkazů s nulovou znalostí.

Na úvod, jednou větou nebo možná několika větami, na jakých institucionálních problémech pracujete, které skutečně vyžadují soukromí na veřejných kolejích (public rails) spíše než jen tradiční databázi nebo privátní řetězec? Možná můžeme začít u Françoise.

**François:** Ano, samozřejmě můžete vždy stavět na privátním blockchainu, ale dnes věříme, že instituce chtějí mít přístup ke globální likviditě, kterou nabízí Ethereum, a zároveň si zachovat to, co mají z tradičního finančního světa, což je určitá míra soukromí, která jim umožňuje obchodovat s globální likviditou, aniž by musely zveřejňovat všechny své obchody. Pro nás je to důvod, proč je důležité nejen zabudovat soukromí, ale také stavět na Ethereu.

**Eugenio:** No, možná to mohu vzít z jiné perspektivy — z pohledu standardů. V procesu standardizace existuje pro instituce velmi důležitý koncept, kterým je kotva důvěry (trust anchor). V podstatě každá instituce má velké offchain prostředí, ke kterému ukotvuje odpovědnost vůči společnosti za všechny, kteří využívají její služby. Jednou z částí velkého problému při vytváření služeb založených na blockchainu pro instituce je, jak vytvořit efektivní systém pro přemostění kotvy důvěry do onchain světa, a pak jak začlenit kryptografické techniky, aby se zajistilo, že data jsou zpracovávána v minimální, ale auditovatelné a ověřitelné míře.

**Zach Obront:** Skvělé. Takže v Etherealize se zaměřujeme na vylepšení některých hlubokých vnitřních mechanismů finančních trhů, konkrétně úvěrových trhů. Vezmu to tedy ze dvou směrů. První je, *proč soukromí?* Právě teď všechny tyto trhy fungují na bilaterálních dohodách. Jsou tu dvě strany. Jsou velmi zvyklé na představu, že uniknou přesně ty informace, které uniknout mají, a nic jiného. A tak jediný způsob, jak by uvažovaly o veřejných blockchainech, je při splnění této úrovně soukromí.

Z druhého směru, *proč být na veřejném blockchainu?* Jde o složité trhy se stranami, které si nutně nedůvěřují a musí se spoléhat na regulaci napříč zeměmi. Mít zdroj pravdy v centru těchto trhů je obrovská výhoda, které bez veřejného blockchainu nedosáhnete. Právě teď jsou tak trochu na mrtvém bodě a říkají: „Je tu potenciál pro vylepšení, ale nemůžeme to udělat bez soukromí, které potřebujeme.“ My se snažíme tyto věci spojit dohromady.

**Amzah:** Ano. Pracuji pro ABN Amro, což je velká nizozemská banka. Máme 5 milionů retailových zákazníků. Takže v současné době vlastně nebudujeme nic konkrétně v oblasti soukromí, ale to, co se teď chystá, je například peněženka pro digitální identitu. Obvykle to funguje tak, že data jsou uložena v centralizované databázi a vy se pak spojíte s externím poskytovatelem nebo třetí stranou, ale to samozřejmě není úplně bezpečné. Takže už začínáme přemýšlet o tom, jak můžeme využít například důkazy s nulovou znalostí (ZK-proofs), abychom mohli mít selektivní zveřejňování vůči externím stranám. V tomto smyslu můžeme chránit informace o našich zákaznících a zároveň jim umožnit propojení s širším prostředím Web3.

#### Konkrétní pracovní postupy a úložiště (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Dobře, skvělé. Když si vyberete jeden konkrétní tok, na kterém by vám mohlo záležet — jako třeba nějaké emise dluhopisů, obchod nebo platba z pokladny — kdo může přesně vidět co a v jakém kroku, a co je uloženo onchain oproti offchain? Možná začneme u Françoise.

**François:** Skvělý způsob, jak k tomu přistoupit, je podívat se na to z pohledu, že chcete obchodovat s DEX na Uniswap. Pěkné na tom je, že na Miden můžeme nabídnout něco, co poskytuje plnou anonymitu. Máme anonymní účty, které spolu obchodují prostřednictvím bankovek (notes). Je to mix modelu účtů a modelu UTXO. 

Pokud obchodujete s nějakým místem (venue), toto místo bude chtít být veřejné. Jako DEX chcete znovu zveřejňovat ceny pokaždé, když jste s někým interagovali. Takže emitujete bankovky do dávky (batch). Z pohledu uživatele není onchain nic kromě toho, co by dané místo mohlo být schopno dešifrovat. Místo provede váš obchod a při výstupu emituje bankovky. Tyto bankovky si pak mohou nárokovat účty, které mohou být plně privátní. Takže si zachováváte plnou anonymitu, pokud jde o uživatele — s výjimkou místa, které se rozhodlo některé informace veřejně odhalit. Navíc k tomu budujeme toky pro dodržování předpisů, které zahrnují pracovní postupy pro auditovatelnost a zásady pro klíče pro zobrazení (view-key), které umožňují tržní inženýrství na lokální úrovni.

**Eugenio:** No, možná to mohu vzít spíše z funkčního hlediska. Obecně má každý tok emise nebo distribuce pro institucionální služby tři klíčové pilíře. Prvním z nich je identita a důvěra, což je spojeno s procesem onboardingu pro investory, procesy KYC/KYB a tak dále.

Druhým je vymáhání zásad. Účet shromažďuje všechny informace z tohoto offchain prostředí a generuje spouštěč pro výpis provedení na blockchainu. V tomto kontextu mohou techniky zachovávající soukromí zajistit efektivní distribuci. Například nabídka, která může být distribuována pouze určitým typům investorů spojeným s určitými typy účtů.

Třetím pilířem je výkaznictví (reporting). To je spojeno s onboardingem a obchodními operacemi onchain. Pojivem všech těchto služeb je to, jak z onchain datových atestací extrahujeme datové body, které skutečně potřebujeme offchain, abychom na konci mohli našim klientům poskytnout tradiční výkaznictví.

**Zach Obront:** Odpověď na to se velmi liší v závislosti na tom, o jaký tok jde, že? To je jedna z výzev v tomto prostoru — je těžké mít obecné principy. Jedním z příkladů toku je velká půjčka, kde se provede platba úroků a rozdělí se mezi spoustu věřitelů. Očekává se, že by o tom neměl nikdo vědět. Neexistuje kolem toho žádná regulace. Je povoleno, aby to bylo zcela privátní, a my chceme být schopni podpořit tento konec spektra. 

Na druhém konci může být obchod s pozicemi mezi věřiteli a existuje očekávání, že určité administrativní strany by mohly vidět, že k obchodu došlo, ale ne cenu. Možná ostatní mohou vidět všechny detaily. Všechno jsme postavili na tomto flexibilním modelu, kde nechceme napevno kódovat pravidla pro dodržování předpisů. Chceme říct, že uživatel nebo aplikace si to mohou určit sami. Máme schopnost vynucovat pravidla týkající se toho, že regulátoři nebo administrativní orgány mohou vidět určité věci, nebo dokonce poskytovat agregovaná data asociacím.

**Amzah:** Ano. Většinou souhlasím s tím, co řekl Zach. V minulosti, když instituce přemýšlely o soukromí, prostě spustily privátní řetězec, kterého se účastnilo třeba 20 bank a jen ony mohly vidět, co v něm je. Ale ve skutečnosti je to mnohem nuancovanější. Záleží na případu použití, na typu toků a na tom, co potřebuje vědět regulátor. Informace o zůstatcích můžete dát onchain v agregovanější podobě, například pomocí důkazu o rezervách (proof of reserves).

#### Neoddiskutovatelné požadavky (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio a Amzahu, jaké jsou z pohledu bank, obchodních míst a regulátorů některé neoddiskutovatelné požadavky, které slyšíte stále dokola? Jako auditní stopy, pravidla KYC nebo požadavky na výkaznictví?

**Eugenio:** Řekl bych, že odpovědnost, pokud jde o proces onboardingu, a dodržování předpisů spojené s výkaznictvím. Pro mě je to o zasazení konkrétních obchodních požadavků do technických struktur. Ďábel se skrývá v detailech — to, zda je vaším uživatelem aplikace nebo investor, vytváří pro váš ekosystém odlišný procesní tok. Cílem by mělo být vybudovat tento systém efektivně, jinak budeme zablokováni v adopci. To je důvod, proč se infrastruktura účtů na Ethereu vyvíjí velmi skvělým způsobem.

**Amzah:** Ano, k tomu nemám co dodat. 

**François:** Náš spoluzakladatel tráví týdny se zákazníky v institucionálním prostoru a nejvyšším požadavkem, který se objevuje, je „kontrola“. Kdo vidí co, kdy a z jakého důvodu. A pak tyto konverzace rozvedete do detailů a stanou se šíleně přizpůsobenými. Pro nás je to skvělé, protože tradiční finanční svět strávil desetiletí budováním svých účetních postupů a toků AML/CTF. Jsou velmi specifičtí ohledně této kontroly. Takže tyto schopnosti budujeme na vrstvě protokolu a podporujeme zákazníky na jejich cestě.

#### Kompromisy a globální likvidita (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** S jakými hlavními kompromisy se v současnosti potýkáte? Výkon versus soukromí, nebo globální likvidita versus přísné kontroly, nebo onchain transparentnost versus offchain záznamy? Začneme u Zacha.

**Zach Obront:** Naštěstí jsme na trhu, kde rychlost není největší prioritou. Mnoho úvěrových trhů se vypořádává v řádu týdnů, takže vteřiny nejsou to hlavní, na co myslí. Ale uživatelská zkušenost (UX) se soukromím je velmi obtížná. Blockchainy jsou velmi dobré v udržování tohoto konceptu stavu ve frontě, ve zvládání změn a v zajišťování správného řazení transakcí. Jakmile začneme řadit do fronty privátní transakce, věci se zkomplikují. Musíme přijít na to, jaká je nejlepší uživatelská zkušenost, která se prolíná se soukromím, zvláště když lidé očekávají, že systémy budou jak privátní, tak snadno použitelné.

**François:** Chtěl jsem zdůraznit kompromisy, které *nemáme*, a to díky Ethereu. Instituce chtějí vstupovat na trhy opravdu jen tehdy, pokud se jim to vyplatí, což znamená, že chtějí globální trh se síťovými efekty, hlubokou likviditou a mnoha protistranami. Být rollup na Ethereu, spíše než privátní řetězec nebo další vrstva 1 (l1), nám dává přístup k tomuto hlubokému trhu.

Samozřejmě jsou tu složitosti. Velmi nám záleží na tom prvotřídním (white-glove) zážitku pro instituci vstupující na tento trh, aby mohla mít své vlastní podmínky. Jednou z výzev je rovnováha mezi soukromím a odolností vůči hrozbám. Ve světě Web3 existují aktéři hrozeb a my to chceme lépe zvládnout, abychom mohli nabídnout fantastický zážitek. K decentralizaci přistupujeme opatrně — víme, jak na to, ale uděláme to ve chvíli, kdy to bude nejlépe sloužit zákazníkům.

#### Důvěra v systém a hnací síly adopce (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, jak zajistíte, aby tato řešení byla důvěryhodná a použitelná pro instituce a vlády?

**Eugenio:** Všechno začíná snahou považovat institucionální služby za integrované systémy, kde každá část systému plní své vlastní specifické pravidlo přístupu. Od vzniku dat přes kompresi dat na vrstvě 2 (l2) až po decentralizaci dat na vrstvě 1 (l1). Pokud zkombinujeme tento systém, kde offchain prostředí drží předpoklad důvěry instituce, můžeme alokovat různé procesy na vrstvu 2 (l2) a vrstvu 1 (l1).

**Oskar Thorin:** Amzahu, jak se díváš na to, aby byly systémy důvěryhodné a použitelné?

**Amzah:** Pro nás je opravdu důležité, aby to bylo přizpůsobitelné. Blockchain už není jen jeden případ použití, kde je vše plně veřejné nebo plně privátní. Není to univerzální řešení pro všechny. Co je pro nás také nejdůležitější, je dodržování předpisů. Bankovní sektor v Evropě je silně regulován, a pokud něco není v pořádku ohledně soukromí, u regulátorů to prostě neprojde.

#### Výhled do roku 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** Dobře, jsme skoro na konci. Co je tím jedním stavebním kamenem — technickým, provozním nebo politickým — který by podle vás smysluplně urychlil institucionální adopci? A pokud se znovu setkáme v roce 2026, co si myslíte, že je reálné, že se letos stane?

**Zach Obront:** Myslím, že „institucionální“ a „soukromí“ jsou v současnosti velmi široké pojmy a v různých případech použití se prolínají odlišně. Někteří se zajímají o napojení na likvidní trhy, zatímco jiní chtějí jen lepší interní infrastrukturu. Posunulo by nás vpřed, kdybychom si ujasnili konkrétní situace, které se snažíme řešit. Zatím nedošlo k hluboké kategorizaci požadavků na dodržování předpisů. Snaha zmapovat tyto požadavky a přeměnit je na protokol, který je podporuje, by posunula naši schopnost budovat na vyšší úroveň, spíše než abychom se spoléhali na roztříštěný svět řízený právníky.

**Amzah:** Technologie ušla dlouhou cestu s důkazy s nulovou znalostí a plně homomorfním šifrováním. Myslím, že jednou z nejdůležitějších věcí, kterou je třeba zlepšit, je vzdělávání regulátorů a institucí. Možná slyšeli o důkazech s nulovou znalostí, ale ve skutečnosti nevědí, jak fungují. Většina regulátorů stále uvažuje z právního hlediska — když se něco pokazí, komu můžeme zavolat? A pokud není komu zavolat, je to pro ně obtížná představa.

**Eugenio:** Po technologické stránce nám dokazování a agregace ZK v reálném čase skutečně umožní budovat komplexní případy použití kombinující aplikace, institucionální klienty a vrstvu 1 (l1). Podporuji také to, co řekl Amzah o vzdělávání. Pro rok 2026 bych rád viděl více spolupráce mezi projekty, aby aplikace mohly skutečně začít mít přístup ke globální likviditě a globálním sítím.

**François:** Pokud se setkáme za rok, rád bych na jaře spustil Mainnet Miden, abychom to mohli oslavit. Kromě toho bych si přál, abychom byli na cestě k plné decentralizaci. Bude to vyžadovat úsilí mnoha lidí. Hlavní věc, kterou chci vidět, je větší zapojení. Představa, že soukromí je v rozporu s dodržováním předpisů, není tak úplně pravdivá, ale spojit tyto dvě věci dá práci. Chceme, aby instituce pomohly utvářet druh trhů, které chtějí vidět, protože víme, že to bude složité a specifické pro jejich potřeby.

#### Závěrečné myšlenky (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Chci dát každému z vás 10 až 20 sekund, abyste zmínili něco, co se stalo tento týden, nebo udělali rychlou reklamu, než skončíme.

**Amzah:** Před třemi lety jsem jako dobrovolník pomáhal na jednom z prvních Devconnectů. Vidět, jak se lidé dívají na instituce nyní ve srovnání s tehdejší dobou, je obrovské zlepšení.

**Zach Obront:** Je prostě úžasné, jak moc je letos soukromí ve vzduchu. Mám zkušenosti s bezpečností a je tu nedostatek bezpečnostních výzkumníků, kteří těmto věcem rozumí. Kohokoli na tomto průsečíku vyzývám, aby do toho šel naplno.

**Eugenio:** Vyberu si organizaci pro regulaci dat — myslím, že existuje velká naděje pro ZKP v doméně dat splňujících předpisy a vrstva interoperability Etherea pomůže přivést instituce onchain.

**François:** Jako inženýr to máte velmi těžké; obvykle slyšíte o nějakém okrajovém tématu. Nedávno jsme na Miden zavedli precompiles, což otevírá ověřování toků, které zahrnují strojové učení. Pokud jste extrémní nerd jako já, opravdu chcete dělat strojové učení a důkazy strojového učení, a to je teď věc, kterou můžeme dělat.

**Oskar Thorin:** Chci poděkovat všem panelistům. Slyšeli jsme velmi zajímavé pohledy napříč technologiemi, politikou a inženýrstvím. Jen jsme poškrábali povrch, ale doporučuji vám, abyste si o tom promluvili více, pokud vás toto téma zajímá. Děkuji.