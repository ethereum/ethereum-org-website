---
title: Formální ověření chytrých kontraktů
description: Přehled formálního ověření pro chytré kontrakty na Ethereu
lang: cs
---

[Chytré kontrakty](/developers/docs/smart-contracts/) umožňují vytvářet decentralizované, důvěryhodné a robustní aplikace, které nabízejí nová využití a jsou pro uživatele přínosem. Protože chytré kontrakty spravují hodnotná aktiva, bezpečnost je pro vývojáře kritická.

Formální verifikace je jednou z doporučených technik pro zlepšení bezpečnosti [chytrých kontraktů](/developers/docs/smart-contracts/security/). Formální verifikace, která používá [formální metody](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) pro specifikaci, návrh a ověřování programů, se již léta používá k zajištění správnosti kritických hardwarových a softwarových systémů.

Když je formální verifikace implementována v chytrých kontraktech, může dokázat, že obchodní logika kontraktu splňuje předem definovanou specifikaci. Ve srovnání s jinými metodami pro hodnocení správnosti kódu kontraktu, jako je testování, poskytuje formální verifikace silnější záruky, že chytrý kontrakt je funkčně správný.

## Co je formální verifikace? {#what-is-formal-verification}

Formální verifikace se týká procesu hodnocení správnosti systému ve vztahu k formální specifikaci. Jednoduše řečeno, formální verifikace nám umožňuje zjistit, zda chování systému splňuje některé požadavky (tj. zda dělá to, co od něj očekáváme).

Očekávané chování systému (v tomto případě chytrého kontraktu) je popsáno pomocí formálního modelování, zatímco specifikační jazyky umožňují vytvoření formálních vlastností. Formální verifikační techniky pak mohou ověřit, že implementace kontraktu odpovídá jeho specifikaci a odvodit matematický důkaz o správnosti této implementace. Když kontrakt splňuje svou specifikaci, je popsán jako „funkčně správný“, „správný podle návrhu“ nebo „správný podle konstrukce“.

### Co je formální model? {#what-is-a-formal-model}

Ve výpočetní technice je [formální model](https://en.wikipedia.org/wiki/Model_of_computation) matematický popis výpočetního procesu. Programy jsou abstrahovány do matematických funkcí (rovnic) a model popisuje, jak se výstupy funkcí vypočítávají na základě zadaných vstupů.

Formální modely poskytují úroveň abstrakce, nad kterou lze analyzovat chování programu. Existence formálních modelů umožňuje vytvoření _formální specifikace_, která popisuje požadované vlastnosti daného modelu.

Pro modelování chytrých kontraktů za účelem formální verifikace se používají různé techniky. Například některé modely se používají k simulaci chování chytrého kontraktu na vysoké úrovni. Tyto modelovací techniky se na chytré kontrakty dívají jako na „černé skříňky“, vnímají je jako systémy, které přijímají vstupy a provádějí výpočty na základě těchto vstupů.

Modely na vysoké úrovni se zaměřují na vztah mezi chytrými kontrakty a externími agenty, jako jsou externě vlastněné účty (EOAs), kontraktové účty a blockchainové prostředí. Tyto modely jsou užitečné pro definování vlastností určujících, jak by se měl kontrakt chovat v reakci na předem dané interakce uživatelů.

Naopak, jiné formální modely se zaměřují na chování chytrého kontraktu na nižší úrovni. Zatímco modely zkoumající chování kontraktů na vysoké úrovni mohou pomoci při úvahách o funkčnosti kontraktu, není vyloučeno jejich selhání při zachycování detailů o interních mechanismech implementace. Modely pro nízké úrovně na analýzu programu aplikují pohled „bílé skříňky“ a spoléhají na nižší úroveň reprezentací aplikací chytrých kontraktů, jako jsou programové stopy a [grafy toku řízení](https://en.wikipedia.org/wiki/Control-flow_graph), za účelem úvah o relevantních vlastnostech pro vykonávání kontraktu.

Modely nízké úrovně jsou považovány za ideální, protože reprezentují skutečnou exekuci chytrého kontraktu v prostředí Etherea (tj. v [EVM](/developers/docs/evm/)). Techniky modelování na nízké úrovni jsou zvláště užitečné při stanovování kritických bezpečnostních vlastností chytrých kontraktů a detekci potenciálních zranitelností.

### Co je formální specifikace? {#what-is-a-formal-specification}

Specifikace je jednoduše řečeno technický požadavek, který musí daný systém splňovat. V programování představují specifikace obecné představy o provádění programu (tj. co by měl program dělat).

V kontextu chytrých kontraktů se formální specifikace týkají _vlastností_ – formálních popisů požadavků, které musí kontrakt splňovat. Takové vlastnosti se označují jako „invarianty“ a představují logická tvrzení o provádění kontraktu, která musí zůstat pravdivá za všech okolností, bez jakýchkoliv výjimek.

Formální verifikaci tedy můžeme považovat za sbírku tvrzení napsaných ve formálním jazyce, která popisují zamýšlený výkon chytrého kontraktu. Specifikace pokrývají vlastnosti kontraktu a definují, jak by se měl chovat v různých situacích. Účelem formální verifikace je zjistit, zda chytrý kontrakt tyto vlastnosti (invarianty) má a zda nejsou tyto vlastnosti během provádění porušeny.

Formální specifikace jsou klíčové při vývoji bezpečných implementací chytrých kontraktů. Kontrakty, které neimplementují invarianty nebo mají své vlastnosti porušené během provádění, jsou náchylné ke zranitelnostem, které mohou poškodit jejich funkčnost nebo umožnit zneužití.

## Typy formálních specifikací pro chytré kontrakty {#formal-specifications-for-smart-contracts}

Formální specifikace umožňují matematické uvažování o správnosti provádění programu. Stejně jako formální modely mohou formální specifikace zachytit buď vlastnosti na vysoké úrovni, nebo chování implementace kontraktu na nízké úrovni.

Formální specifikace jsou odvozeny pomocí prvků [programové logiky](https://en.wikipedia.org/wiki/Logic_programming), která umožňuje formální uvažování o vlastnostech programu. Programová logika má formální pravidla, která vyjadřují (v matematickém jazyce) očekávané chování programu. Pro vytváření formálních specifikací se používají různé programové logiky, včetně [logiky dosažitelnosti](https://en.wikipedia.org/wiki/Reachability_problem), [temporální logiky](https://en.wikipedia.org/wiki/Temporal_logic) a [Hoareovy logiky](https://en.wikipedia.org/wiki/Hoare_logic).

Formální specifikace pro chytré kontrakty lze obecně rozdělit na specifikace na **vysoké úrovni** a specifikace na **nízké úrovni**. Bez ohledu na to, do které kategorie specifikace patří, musí adekvátně a jednoznačně popisovat vlastnost systému, který je podroben analýze.

### Specifikace na vysoké úrovni {#high-level-specifications}

Jak název napovídá, specifikace na vysoké úrovni (také nazývané „modelově orientované specifikace“) popisují chování programu na vysoké úrovni. Specifikace na vysoké úrovni modelují chytrý kontrakt jako [konečný automat](https://en.wikipedia.org/wiki/Finite-state_machine) (final state machine, FSM), který může prováděním operací přecházet mezi stavy, přičemž pro definování formálních vlastností modelu FSM se používá temporální logika.

[Temporální logiky](https://en.wikipedia.org/wiki/Temporal_logic) jsou „pravidla pro uvažování o tvrzeních kvalifikovaných z hlediska času (např. „_vždy_ mám hlad“ nebo „_nakonec_ budu mít hlad“)“. Když se aplikují na formální verifikaci, temporální logiky se používají k vyjádření tvrzení o správném chování systémů modelovaných jako automaty. Konkrétně popisuje temporální logika budoucí stavy, ve kterých se chytrý kontrakt může nacházet, a jak mezi těmito stavy přechází.

Specifikace na vysoké úrovni obecně zachycují dvě klíčové temporální vlastnosti chytrých kontraktů: **bezpečnost** a **živost**. Bezpečnostní vlastnosti představují myšlenku, že „nic špatného se nikdy nestane“ a obvykle vyjadřují invarianty. Bezpečnostní vlastnost může definovat obecné softwarové požadavky, jako je ochrana před [zablokováním](https://www.techtarget.com/whatis/definition/deadlock), nebo vyjadřovat specifické vlastnosti pro chytré kontrakty (např. invarianty týkající se přístupu k funkcím, přípustné hodnoty stavových proměnných nebo podmínky pro převod tokenů).

Vezměme si pro příklad tento bezpečnostní požadavek, který pokrývá podmínky pro použití funkcí `transfer()` nebo `transferFrom()` v ERC-20 tokenových kontraktech: _„Zůstatek odesílatele nikdy nesmí být nižší než požadované množství tokenů, které mají být odeslány.“_ Tento popis invariantu kontraktu v přirozeném jazyce lze převést do formální (matematické) specifikace, která pak může být rigorózně ověřena z hlediska platnosti.

Živostní vlastnosti zajišťují, že „se ve výsledku stane něco dobrého“, a týkají se schopnosti kontraktu přepínat mezi různými stavy. Příkladem živostní vlastnosti je „likvidita“, která odkazuje na schopnost kontraktu převádět své zůstatky uživatelům na základě žádosti. Pokud je tato vlastnost porušena, uživatelé nejsou schopni vybrat aktiva uložená v kontraktu, jako se to stalo při incidentu s [Parity peněženkou](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Specifikace na nízké úrovni {#low-level-specifications}

Specifikace na vysoké úrovni berou jako výchozí bod model konečného automatu kontraktu a definují požadované vlastnosti tohoto modelu. Naopak specifikace na nízké úrovni (také nazývané „specifikace orientované na vlastnosti“) často modelují programy (chytré kontrakty) jako systémy skládající se ze sbírky matematických funkcí a popisují správné chování těchto systémů.

Jednoduše řečeno, specifikace na nízké úrovni analyzují _sledy funkcí programu_ a snaží se definovat vlastnosti chytrého kontraktu na základě těchto sledů. Sledy odkazují na sekvence provádění funkcí, které mění stav chytrého kontraktu; proto specifikace na nízké úrovni pomáhají specifikovat požadavky na interní exekuci kontraktu.

Formální specifikace na nízké úrovni mohou být uvedeny buď jako vlastnosti ve stylu Hoareovy logiky, nebo jako invarianty na exekučních cestách.

### Vlastnosti ve stylu Hoareovy logiky {#hoare-style-properties}

[Hoareova logika](https://en.wikipedia.org/wiki/Hoare_logic) poskytuje sadu formálních pravidel pro uvažování o správnosti programů, včetně chytrých kontraktů. Vlastnost ve stylu Hoareovy logiky je reprezentována jako Hoareův trojúhelník {{_P_}_c_{_Q_}, kde _c_ je program a _P_ a _Q_ jsou predikáty na stavu _c_ (tj. programu), formálně popsané jako _předpoklady_ a _podmínky následku_.

Předpoklad je predikát popisující podmínky potřebné pro správné provedení funkce; uživatelé volající kontrakt musí tuto podmínku splnit. Podmínka následku je predikát popisující podmínku, kterou funkce stanoví, pokud je správně provedena; uživatelé mohou očekávat, že tato podmínka bude po volání funkce pravdivá. _Invariant_ v Hoareově logice je predikát, který je zachován při provádění funkce (tj. nemění se).

Specifikace ve stylu Hoareovy logiky mohou zaručit buď _částečnou správnost_, _nebo úplnou správnost_. Implementace funkce kontraktu je „částečně správná“, pokud předpoklad platí před provedením funkce a když provedení končí, podmínka následku je také pravdivá. Důkaz úplné správnosti je obdržen, pokud je předpoklad pravdivý před provedením funkce, dále je zaručeno, že provádění funkce bude ukončeno, a když k tomu dojde, následek bude pravdivý.

Získání důkazu o úplné správnosti je obtížné, protože některá provedení se mohou před ukončením opozdit, nebo nemusí být dokončena vůbec. To znamená, že otázka, zda provedení skončí, je pravděpodobně diskutabilní, protože mechanismus paliva na Ethereu zabraňuje nekonečným smyčkám programu (provádění buď úspěšně skončí, nebo skončí kvůli chybě „došlo palivo“).

Specifikace chytrých kontraktů vytvořené pomocí Hoareovy logiky budou mít definovány předpoklady, podmínky následku a invarianty pro provedení funkcí a smyček kontraktu. Předpoklady často zahrnují možnost chybných vstupů funkce, přičemž následky popisují očekávanou reakci na takové vstupy (např. vyvolání specifické výjimky). Tímto způsobem jsou vlastnosti ve stylu Hoareovy logiky účinné při zajišťování správnosti implementací kontraktů.

Mnoho rámců pro formální verifikaci používá specifikace ve stylu Hoareovy logiky k prokázání sémantické správnosti funkcí. Je také možné přidat vlastnosti ve stylu Hoareovy logiky (jako tvrzení) přímo do kódu kontraktu pomocí příkazů `require` a `assert` v jazyce Solidity.

Příkazy `require` vyjadřují předpoklad nebo invariant a často se používají k ověření vstupů uživatelů, zatímco `assert` zachycuje podmínku následku nezbytnou pro bezpečnost. Například správná kontrola přístupu k funkcím (příklad bezpečnostní vlastnosti) může být zajištěna pomocí `require` jako předpokladu ověřujícího identitu volajícího účtu. Podobně lze invariant na přípustné hodnoty stavových proměnných v kontraktu (např. celkový počet tokenů v oběhu) chránit před porušením pomocí `assert`, aby se potvrdil stav kontraktu po provedení funkce.

### Vlastnosti na úrovni trasování {#trace-level-properties}

Specifikace založené na trasování popisují operace, které mění různé stavy kontraktu, a vztahy mezi těmito operacemi. Jak jsme vysvětlili výše, trasy jsou sekvence operací, které mění stav kontraktu určitým způsobem.

Tento přístup se spoléhá na modelování chytrých kontraktů jako systémů změny stavů s předdefinovanými stavy (popisovanými stavovými proměnnými) spolu se souborem předdefinovaných přechodů (popisovaných funkcemi kontraktu). Dále se často používá [graf toků řízení](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), což je grafické znázornění toku provádění programu, pro popis operační sémantiky kontraktu. V něm je každá trasa reprezentována jako cesta na tomto grafu toků řízení.

Primárně se specifikace na úrovni tras používají k úvahám o vzorcích interního provádění v chytrých kontraktech. Vytvořením specifikací na úrovni tras se ujišťujeme o přípustných cestách provedení (tj. přechodech stavů) pro daný chytrý kontrakt. Pomocí technik, jako je symbolické provádění, můžeme formálně ověřit, že provedení nikdy nenásleduje cestu, která není definována ve formálním modelu.

Použijme příklad [DAO](/dao/) kontraktu, který má několik veřejně přístupných funkcí, abychom popsali vlastnosti na úrovni tras. Pro tento příklad předpokládáme, že DAO kontrakt umožňuje uživatelům provádět následující operace:

- Vklad prostředků

- Hlasování o návrhu po vložení prostředků

- Požadování vrácení peněz, pokud uživatelé o návrhu nehlasovali

Příklady vlastností na úrovni tras by mohly být _„uživatelé, kteří nevložili prostředky, nemohou hlasovat o návrhu“_ nebo _„uživatelé, kteří nehlasovali o návrhu, by měli mít vždy možnost požádat o vrácení peněz“_. Obě vlastnosti zajišťují preferované sekvence provádění (hlasování nemůže probíhat _před_ vložením prostředků a požadování vrácení peněz nemůže probíhat _po_ hlasování o návrhu).

## Techniky formální verifikace pro chytré kontrakty {#formal-verification-techniques}

### Kontrola modelu {#model-checking}

Kontrola modelu je technika formální verifikace, při které algoritmus kontroluje formální model chytrého kontraktu vůči jeho specifikaci. Při kontrole modelu jsou chytré kontrakty často reprezentovány jako systémy přechodu stavů, zatímco vlastnosti přípustných stavů kontraktu jsou definovány pomocí dočasné logiky.

Kontrola modelu vyžaduje vytvoření abstraktní matematické reprezentace systému (tj. kontraktu) a vyjádření vlastností tohoto systému pomocí vzorců založených na [výrokové logice](https://www.baeldung.com/cs/propositional-logic). To zjednodušuje úkol algoritmu kontroly modelu, kterým je možné prokázat, že matematický model splňuje daný logický vzorec.

Kontrola modelu se ve formální verifikaci primárně používá k vyhodnocení dočasných vlastností, které popisují chování kontraktu v průběhu času. Dočasné vlastnosti pro chytré kontrakty zahrnují _bezpečnost_ a _živost_, které jsme vysvětlili dříve.

Například bezpečnostní vlastnost týkající se kontroly přístupu (např. _Pouze vlastník kontraktu může volat `selfdestruct`_) může být napsána ve formální logice. Poté může algoritmus kontroly modelu ověřit, zda kontrakt splňuje tuto formální specifikaci.

Kontrola modelu využívá prozkoumávání stavového prostoru, což zahrnuje konstrukci všech možných stavů chytrého kontraktu a pokus o nalezení dosažitelných stavů, které vedou k porušení chtěných vlastností. To však může vést k nekonečnému počtu stavů (známému jako „problém explozí stavů“), proto se při kontrole modelu spoléhejte na abstrakční techniky, které umožňují efektivní analýzu chytrých kontraktů.

### Dokazování vět {#theorem-proving}

Dokazování věz je metoda matematického uvažování o správnosti programů, včetně chytrých kontraktů. Spočívá v transformaci modelu systému kontraktu a jeho specifikací na matematické formule (logické výroky).

Cílem dokazování vět je ověřit logickou ekvivalenci mezi těmito výroky. „Logická ekvivalence“ (také nazývaná „obousměrná logická implikace“) je typ vztahu mezi dvěma výroky, kdy první výrok je pravdivý, _pokud a jen pokud_ je pravdivý i druhý výrok.

Požadovaný vztah (logická ekvivalence) mezi výroky o modelu kontraktu a jeho vlastnostech je formulován jako dokazatelný výrok (nazývaný věta). Pomocí formálního systému odvozování může automatizovaný důkazní systém ověřit platnost této věty. Jinými slovy, důkazní systém může jednoznačně prokázat, že model chytrého kontraktu přesně odpovídá jeho specifikacím.

Zatímco kontrola modelu nahlíží na kontrakty jako na přechodové systémy s konečnými stavy, dokazování vět dokáže analyzovat systémy s nekonečným počtem stavů. To však znamená, že automatizovaný důkazní systém nemůže vždy vědět, zda je logický problém „rozhodnutelný“ nebo ne.

V důsledku toho je často k vedení důkazního systému při odvozování důkazů správnosti zapotřebí lidská asistence. Použití lidského faktoru při důkazu vět činí tuto metodu nákladnější ve srovnání s kontrolou modelu, která je plně automatizovaná.

### Symbolické provádění {#symbolic-execution}

Symbolické provádění je metoda analýzy chytrých kontraktů, která provádí funkce pomocí _symbolických hodnot_ (např. `x > 5`) místo _konkrétních hodnot_ (např. `x == 5`). Jako technika formální verifikace se symbolické provádění používá k formálnímu uvažování o vlastnostech na úrovni tras v kódu kontraktu.

Symbolické provádění reprezentuje trasu provádění jako matematický vzorec nad symbolickými vstupními hodnotami, které se jinak nazývají _predikát cesty_. K ověření, zda je predikát cesty „splnitelný“ (tj. zda existuje hodnota, která může vzorec splnit), se používá [SMT solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories). Pokud je zranitelná trasa splnitelná, SMT solver vygeneruje konkrétní hodnotu, která nasměruje provádění směrem k této trase.

Předpokládejme, že funkce chytrého kontraktu přijímá jako vstup hodnotu typu `uint` (`x`) a vrací chybu, když je `x` větší než `5` a zároveň menší než `10`. Nalezení hodnoty pro `x`, která vyvolá chybu, by pomocí běžného testovacího postupu vyžadovalo provedení desítek testovacích případů (nebo více) bez záruky, že skutečně najdete vstup, který chybu vyvolá.

Naopak, nástroj pro symbolické provádění by funkci spustil se symbolickou hodnotou: `X > 5 ∧ X < 10` (tj. `x` je větší než 5 A `x` je menší než 10). Příslušný predikát cesty `x = X > 5 ∧ X < 10` by byl poté zadán SMT solveru k vyřešení. Pokud nějaká hodnota splňuje vzorec `x = X > 5 ∧ X < 10`, SMT solver ji vypočítá – například solver může pro `x` vygenerovat hodnotu `7`.

Protože se symbolické provádění spoléhá na vstupy programu a množina vstupů pro prozkoumání všech dosažitelných stavů je potenciálně nekonečná, stále se jedná o formu testování. Jak však ukazuje příklad, symbolické provádění je efektivnější než běžné testování pro hledání vstupů, které vyvolávají porušení vlastností.

Navíc symbolické provádění generuje méně falešných pozitiv než jiné techniky založené na vlastnostech (např. fuzzing), které náhodně generují vstupy do funkce. Pokud se během symbolického provádění vyvolá stav chyby, je možné vygenerovat konkrétní hodnotu, která chybu vyvolá, a tím problém reprodukovat.

Symbolické provádění může také poskytnout určitou míru matematického důkazu správnosti. Zvažte následující příklad funkce kontraktu s ochranou proti přetečení:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Trasování provádění, které vede k přetečení celého čísla, by muselo splňovat vzorec: `z = x + y AND (z >= x) AND (z=>y) AND (z < x OR z < y)` Takový vzorec je nepravděpodobný k vyřešení, slouží tedy jako matematický důkaz, že funkce `safe_add` nikdy nepřeteče.

### Proč používat formální ověřování pro chytré kontrakty? {#benefits-of-formal-verification}

#### Potřeba spolehlivosti {#need-for-reliability}

Formální ověřování se používá k posouzení správnosti systémů kritických z hlediska bezpečnosti, jejichž selhání může mít katastrofální následky, jako je smrt, zranění nebo finanční krach. Chytré kontrakty jsou aplikace s vysokou hodnotou, které ovládají obrovské množství hodnot, a jednoduché chyby v návrhu mohou vést k [nezvratným ztrátám pro uživatele](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Formální ověření kontraktu před jeho nasazením však může zvýšit záruku, že bude po spuštění na blockchainu fungovat dle očekávání.

Spolehlivost je velmi žádaná vlastnost každého chytrého kontraktu, zejména proto, že kód nasazený ve virtuálním stroji Etherea (EVM) je obvykle neměnný. Vzhledem k tomu, že aktualizace po spuštění nejsou snadno dostupné, je nutné zaručit spolehlivost kontraktu a provést formální ověření. Formální ověřování dokáže odhalit záludné problémy, jako je přetečení a podtečení integerů, reentrace a špatná optimalizace paliva, které mohou auditorům a testerům uniknout.

#### Prokázání funkční správnosti {#prove-functional-correctness}

Testování programu je nejběžnější metodou, jak prokázat, že chytrý kontrakt splňuje určité požadavky. To zahrnuje spuštění kontraktu se vzorkem dat, která má zpracovávat, a analýzu jeho chování. Pokud kontrakt vrátí očekávané výsledky pro vzorová data, mají vývojáři objektivní důkaz jeho správnosti.

Tento přístup však nemůže prokázat správné provedení pro vstupní hodnoty, které nejsou součástí vzorku. Proto testování kontraktu může pomoci odhalit chyby (tj. pokud některé cesty kódu nevracejí během provádění požadované výsledky), ale **nemůže jednoznačně prokázat neexistenci chyb**.

Naopak formální ověřování může formálně dokázat, že chytrý kontrakt splňuje požadavky pro nekonečný rozsah provedení _bez toho_, aby se kontrakt vůbec spustil. To vyžaduje vytvoření formální specifikace, která přesně popisuje správné chování kontraktu, a vytvoření formálního (matematického) modelu systému kontraktu. Poté můžeme formálním důkazním postupem zkontrolovat soulad mezi modelem kontraktu a jeho specifikací.

Při formálním ověřování je otázka ověření, zda obchodní logika kontraktu splňuje požadavky, matematickým tvrzením, které lze dokázat nebo vyvrátit. Formálním dokazováním tvrzení můžeme ověřit nekonečný počet testovacích případů s konečným počtem kroků. Tímto způsobem má formální ověření lepší vyhlídky prokázat, že kontrakt je funkčně shodný se specifikací.

#### Ideální cíle ověřování {#ideal-verification-targets}

Cíl ověřování popisuje systém, který má být formálně ověřen. Formální ověřování se nejlépe používá ve „vestavěných systémech“ (malých, jednoduchých částech softwaru, které jsou součástí většího systému). Jsou také ideální pro specializované domény, které mají málo pravidel, protože to usnadňuje úpravu nástrojů pro ověřování vlastností specifických pro danou doménu.

Chytré kontrakty – alespoň do určité míry – splňují oba požadavky. Například díky malé velikosti kontraktů na Ethereu je lze formálně ověřit. Podobně se řídí jednoduchými pravidly i EVM, což usnadňuje specifikaci a ověřování sémantických vlastností programů běžících v EVM.

### Rychlejší vývojový cyklus {#faster-development-cycle}

Techniky formálního ověřování, jako je kontrola modelu a symbolické provádění, jsou obecně účinnější než běžná analýza kódu chytrých kontraktů (prováděná během testování nebo auditu). Je to proto, že formální ověřování se při testování tvrzení spoléhá na symbolické hodnoty („co když se uživatel pokusí vybrat _n_ etheru?“) na rozdíl od testování, které používá konkrétní hodnoty („co když se uživatel pokusí vybrat 5 etheru?“).

Symbolické vstupní proměnné mohou pokrývat více tříd konkrétních hodnot, takže formální ověřovací přístupy slibují větší pokrytí kódu v kratším časovém horizontu. Pokud se formální ověřování používá efektivně, může vývojářům urychlit vývojový cyklus.

Formální ověřování také zlepšuje proces vytváření decentralizovaných aplikací (dappek) tím, že omezuje nákladné chyby v návrhu. Aktualizace kontraktů (tam, kde je to možné) za účelem opravy zranitelností vyžaduje rozsáhlé přepisování kódových základen a větší úsilí vynaložené na vývoj. Formální ověřování může odhalit mnoho chyb v implementacích kontraktů, které mohou testerům a auditorům uniknout, a poskytuje dostatek příležitostí k jejich odstranění před nasazením kontraktu.

## Nevýhody formálního ověřování {#drawbacks-of-formal-verification}

### Náklady na ruční práci {#cost-of-manual-labor}

Formální ověřování, zejména poloautomatické ověřování, při němž člověk vede dokazovací nástroj při odvozování důkazů správnosti, vyžaduje značné množství ruční práce. Tvorba formální specifikace je navíc složitá činnost, která vyžaduje vysokou úroveň dovedností.

Tyto faktory (úsilí a dovednosti) činí formální ověřování náročnějším a nákladnějším ve srovnání s obvyklými metodami posuzování správnosti kontraktů, jako je testování a audity. Nicméně vzhledem k nákladům na chyby v implementacích chytrých kontraktů je zaplacení nákladů na úplný ověřovací audit praktické.

### Falešně negativní výsledky {#false-negatives}

Formální ověřování může pouze zkontrolovat, zda provedení chytrého kontraktu odpovídá formální specifikaci. Proto je důležité zajistit, aby specifikace správně popisovala očekávané chování chytrého kontraktu.

Pokud jsou specifikace špatně napsané, porušení vlastností, které poukazují na zranitelná provedení, nelze při auditu formálního ověřování odhalit. V takovém případě by se vývojář mohl mylně domnívat, že kontrakt je bez chyb.

### Výkonnostní problémy {#performance-issues}

Formální ověřování naráží na řadu výkonnostních problémů. Například problémy s explozí stavů a cest, které se vyskytují při kontrole modelu, resp. symbolické kontrole, mohou ovlivnit verifikační postupy. Dále formální ověřovací nástroje často používají ve své základní vrstvě SMT řešiče a jiné řešiče omezení a ty se spoléhají na výpočetně náročné postupy.

Také není vždy možné, aby ověřovatelé programů určili, zda je vlastnost (popsaná jako logická formule) splnitelná nebo ne („problém [rozhodnutelnosti](https://en.wikipedia.org/wiki/Decision_problem)“), protože program nemusí být nikdy ukončen. Proto může být nemožné prokázat některé vlastnosti kontraktu, i když je dobře specifikovaný.

## Nástroje pro formální ověřování chytrých kontraktů na Ethereu {#formal-verification-tools}

### Specifikační jazyky pro vytváření formálních specifikací {#specification-languages}

**Act** – _*Act umožňuje specifikovat aktualizace úložiště, předběžné/následné podmínky a invarianty kontraktu. Jeho sada nástrojů má také dokazovací backendy, které dokáží dokázat mnoho vlastností pomocí Coq, SMT solverů nebo hevm.**

- [GitHub](https://github.com/ethereum/act)
- [Dokumentace](https://ethereum.github.io/act/)

**Scribble** – _*Scribble transformuje anotace kódu ve specifikačním jazyce Scribble na konkrétní tvrzení, která kontrolují specifikaci.**

- [Dokumentace](https://docs.scribble.codes/)

**Dafny** – _*Dafny je programovací jazyk připravený na ověřování, který se spoléhá na vysokoúrovňové anotace pro zdůvodnění a prokázání správnosti kódu.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Ověřovače programů pro kontrolu správnosti {#program-verifiers}

**Certora Prover** – _Certora Prover je automatický formální ověřovací nástroj pro kontrolu správnosti kódu v chytrých kontraktech. Specifikace jsou napsány v jazyce CVL (Certora Verification Language), přičemž porušení vlastností se zjišťuje pomocí kombinace statické analýzy a řešení omezení._

- [Web](https://www.certora.com/)
- [Dokumentace](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** – _*Solidity SMTChecker je vestavěný ověřovač modelu založený na SMT (Satisfiability Modulo Theories) a Hornově řešení. Během kompilace potvrzuje, zda zdrojový kód kontraktu odpovídá specifikacím, a staticky kontroluje, zda nejsou porušeny bezpečnostní vlastnosti.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** – _*solc-verify je rozšířená verze kompilátoru Solidity, která dokáže provádět automatické formální ověřování kódu Solidity pomocí anotací a modulárního ověřování programu.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** – _*KEVM je formální sémantika virtuálního stroje Etherea (EVM) napsaná ve frameworku K. KEVM je spustitelný a může dokazovat určitá tvrzení týkající se vlastností pomocí logiky dosažitelnosti.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentace](https://jellopaper.org/)

### Logické frameworky pro dokazování tvrzení {#theorem-provers}

**Isabelle** – _Isabelle/HOL je dokazovací pomocník, který umožňuje vyjádřit matematické formule ve formálním jazyce a poskytuje nástroje pro dokazování těchto formulí. Hlavní aplikací je formalizace matematických důkazů a zejména formální ověřování, které zahrnuje dokazování správnosti počítačového hardwaru nebo softwaru a dokazování vlastností počítačových jazyků a protokolů._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentace](https://isabelle.in.tum.de/documentation.html)

**Coq** – _Coq je interaktivní dokazovací nástroj, který umožňuje definovat programy pomocí vět a interaktivně generovat strojově kontrolované důkazy správnosti._

- [GitHub](https://github.com/coq/coq)
- [Dokumentace](https://coq.github.io/doc/v8.13/refman/index.html)

### Nástroje pro odhalování zranitelných vzorů v chytrých kontraktech založené na symbolickém provádění {#symbolic-execution-tools}

**Manticore** – _*Nástroj pro analýzu bytekódu EVM založený na symbolickém provádění*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentace](https://github.com/trailofbits/manticore/wiki)

**hevm** – _*hevm je nástroj pro symbolické provádění a kontrolu ekvivalence pro bytekód EVM.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** – _Nástroj pro symbolické provádění k odhalování zranitelností v chytrých kontraktech Etherea._

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentace](https://mythril-classic.readthedocs.io/en/develop/)

## Další četba {#further-reading}

- [Jak funguje formální ověřování chytrých kontraktů](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Jak může formální ověřování zajistit bezchybné chytré kontrakty](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Přehled projektů formálního ověřování v ekosystému Etherea](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Formální end-to-end ověřování chytrého kontraktu Ethereum 2.0 Deposit Smart Contract](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formální ověření nejoblíbenějšího chytrého kontraktu na světě](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker a formální ověřování](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
