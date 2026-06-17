---
title: Formální verifikace chytrých kontraktů
description: Přehled formální verifikace pro chytré kontrakty na Ethereu
lang: cs
---

[Chytré kontrakty](/developers/docs/smart-contracts/) umožňují vytvářet decentralizované, robustní aplikace nevyžadující důvěru, které přinášejí nové případy užití a odemykají hodnotu pro uživatele. Vzhledem k tomu, že chytré kontrakty nakládají s velkým množstvím hodnoty, je bezpečnost pro vývojáře kritickým hlediskem.

Formální verifikace je jednou z doporučených technik pro zlepšení [bezpečnosti chytrých kontraktů](/developers/docs/smart-contracts/security/). Formální verifikace, která využívá [formální metody](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) ke specifikaci, návrhu a ověřování programů, se již léta používá k zajištění správnosti kritických hardwarových a softwarových systémů.

Při implementaci v chytrých kontraktech může formální verifikace dokázat, že obchodní logika kontraktu splňuje předem definovanou specifikaci. Ve srovnání s jinými metodami hodnocení správnosti kódu kontraktu, jako je testování, poskytuje formální verifikace silnější záruky, že je chytrý kontrakt funkčně správný.

## Co je formální verifikace? {#what-is-formal-verification}

Formální verifikace označuje proces hodnocení správnosti systému s ohledem na formální specifikaci. Zjednodušeně řečeno, formální verifikace nám umožňuje zkontrolovat, zda chování systému splňuje určité požadavky (tj. dělá to, co chceme).

Očekávané chování systému (v tomto případě chytrého kontraktu) je popsáno pomocí formálního modelování, zatímco specifikační jazyky umožňují vytváření formálních vlastností. Techniky formální verifikace pak mohou ověřit, že implementace kontraktu je v souladu s jeho specifikací, a odvodit matematický důkaz jeho správnosti. Když kontrakt splňuje svou specifikaci, je označován jako „funkčně správný“, „správný z podstaty návrhu“ (correct by design) nebo „správný z podstaty konstrukce“ (correct by construction).

### Co je formální model? {#what-is-a-formal-model}

V informatice je [formální model](https://en.wikipedia.org/wiki/Model_of_computation) matematickým popisem výpočetního procesu. Programy jsou abstrahovány do matematických funkcí (rovnic), přičemž model popisuje, jak jsou na základě vstupu vypočítány výstupy funkcí.

Formální modely poskytují úroveň abstrakce, nad kterou lze vyhodnocovat analýzu chování programu. Existence formálních modelů umožňuje vytvoření _formální specifikace_, která popisuje požadované vlastnosti daného modelu.

Pro modelování chytrých kontraktů za účelem formální verifikace se používají různé techniky. Některé modely se například používají k uvažování o chování chytrého kontraktu na vysoké úrovni. Tyto modelovací techniky aplikují na chytré kontrakty pohled černé skříňky (black-box) a pohlížejí na ně jako na systémy, které přijímají vstupy a na jejich základě provádějí výpočty.

Modely na vysoké úrovni se zaměřují na vztah mezi chytrými kontrakty a externími agenty, jako jsou externě vlastněné účty (EOA), účty kontraktů a prostředí blockchainu. Takové modely jsou užitečné pro definování vlastností, které specifikují, jak by se měl kontrakt chovat v reakci na určité interakce uživatele.

Naopak jiné formální modely se zaměřují na chování chytrého kontraktu na nízké úrovni. Zatímco modely na vysoké úrovni mohou pomoci s uvažováním o funkčnosti kontraktu, nemusí zachytit podrobnosti o vnitřním fungování implementace. Modely na nízké úrovni aplikují na analýzu programu pohled bílé skříňky (white-box) a spoléhají se na nízkoúrovňové reprezentace aplikací chytrých kontraktů, jako jsou stopy programu (program traces) a [grafy toku řízení](https://en.wikipedia.org/wiki/Control-flow_graph), aby mohly uvažovat o vlastnostech relevantních pro provádění kontraktu.

Modely na nízké úrovni jsou považovány za ideální, protože představují skutečné provádění chytrého kontraktu v prováděcím prostředí Etherea (tj. [EVM](/developers/docs/evm/)). Techniky modelování na nízké úrovni jsou obzvláště užitečné při stanovování kritických bezpečnostních vlastností v chytrých kontraktech a detekci potenciálních zranitelností.

### Co je formální specifikace? {#what-is-a-formal-specification}

Specifikace je jednoduše technický požadavek, který musí konkrétní systém splňovat. V programování představují specifikace obecné představy o provádění programu (tj. co by měl program dělat).

V kontextu chytrých kontraktů se formální specifikace týkají _vlastností_ – formálních popisů požadavků, které musí kontrakt splňovat. Takové vlastnosti jsou popisovány jako „invarianty“ a představují logická tvrzení o provádění kontraktu, která musí zůstat pravdivá za všech možných okolností, bez jakýchkoli výjimek.

Formální specifikaci si tedy můžeme představit jako soubor příkazů napsaných ve formálním jazyce, které popisují zamýšlené provádění chytrého kontraktu. Specifikace pokrývají vlastnosti kontraktu a definují, jak by se měl kontrakt chovat za různých okolností. Účelem formální verifikace je zjistit, zda má chytrý kontrakt tyto vlastnosti (invarianty) a zda tyto vlastnosti nejsou během provádění porušeny.

Formální specifikace jsou kritické při vývoji bezpečných implementací chytrých kontraktů. Kontrakty, které neimplementují invarianty nebo u kterých dochází k porušení jejich vlastností během provádění, jsou náchylné ke zranitelnostem, které mohou poškodit funkčnost nebo způsobit zneužití útočníky.

## Typy formálních specifikací pro chytré kontrakty {#formal-specifications-for-smart-contracts}

Formální specifikace umožňují matematické uvažování o správnosti provádění programu. Stejně jako u formálních modelů mohou formální specifikace zachytit buď vlastnosti na vysoké úrovni, nebo chování implementace kontraktu na nízké úrovni.

Formální specifikace jsou odvozeny pomocí prvků [programové logiky](https://en.wikipedia.org/wiki/Logic_programming), které umožňují formální uvažování o vlastnostech programu. Programová logika má formální pravidla, která vyjadřují (v matematickém jazyce) očekávané chování programu. Při vytváření formálních specifikací se používají různé programové logiky, včetně [logiky dosažitelnosti](https://en.wikipedia.org/wiki/Reachability_problem), [temporální logiky](https://en.wikipedia.org/wiki/Temporal_logic) a [Hoareovy logiky](https://en.wikipedia.org/wiki/Hoare_logic).

Formální specifikace pro chytré kontrakty lze obecně klasifikovat jako specifikace na **vysoké úrovni** nebo na **nízké úrovni**. Bez ohledu na to, do jaké kategorie specifikace patří, musí adekvátně a jednoznačně popisovat vlastnost analyzovaného systému.

### Specifikace na vysoké úrovni {#high-level-specifications}

Jak název napovídá, specifikace na vysoké úrovni (nazývaná také „modelově orientovaná specifikace“) popisuje chování programu na vysoké úrovni. Specifikace na vysoké úrovni modelují chytrý kontrakt jako [konečný automat](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), který může přecházet mezi stavy prováděním operací, přičemž k definování formálních vlastností pro model FSM se používá temporální logika.

[Temporální logiky](https://en.wikipedia.org/wiki/Temporal_logic) jsou „pravidla pro uvažování o výrocích kvalifikovaných z hlediska času (např. „Jsem _vždy_ hladový“ nebo „_Nakonec_ budu mít hlad“).“ Při aplikaci na formální verifikaci se temporální logiky používají k vyjádření tvrzení o správném chování systémů modelovaných jako stavové automaty. Konkrétně temporální logika popisuje budoucí stavy, ve kterých se chytrý kontrakt může nacházet, a jak mezi stavy přechází.

Specifikace na vysoké úrovni obecně zachycují dvě kritické temporální vlastnosti pro chytré kontrakty: **bezpečnost** (safety) a **živost** (liveness). Bezpečnostní vlastnosti představují myšlenku, že „se nikdy nestane nic špatného“, a obvykle vyjadřují invarianci. Bezpečnostní vlastnost může definovat obecné softwarové požadavky, jako je absence [uváznutí (deadlock)](https://www.techtarget.com/whatis/definition/deadlock), nebo vyjadřovat doménově specifické vlastnosti pro kontrakty (např. invarianty řízení přístupu k funkcím, přípustné hodnoty stavových proměnných nebo podmínky pro převody tokenů).

Vezměme si například tento bezpečnostní požadavek, který pokrývá podmínky pro použití `transfer()` nebo `transferFrom()` v kontraktech tokenů ERC-20: _„Zůstatek odesílatele není nikdy nižší než požadované množství tokenů k odeslání.“_. Tento popis invariantu kontraktu v přirozeném jazyce lze přeložit do formální (matematické) specifikace, u které lze následně rigorózně zkontrolovat její platnost.

Vlastnosti živosti tvrdí, že „se nakonec stane něco dobrého“, a týkají se schopnosti kontraktu postupovat různými stavy. Příkladem vlastnosti živosti je „likvidita“, která odkazuje na schopnost kontraktu převádět své zůstatky uživatelům na vyžádání. Pokud by byla tato vlastnost porušena, uživatelé by nemohli vybrat aktiva uložená v kontraktu, jako se to stalo při [incidentu s peněženkou Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Specifikace na nízké úrovni {#low-level-specifications}

Specifikace na vysoké úrovni berou jako výchozí bod konečněstavový model kontraktu a definují požadované vlastnosti tohoto modelu. Naproti tomu specifikace na nízké úrovni (nazývané také „vlastnostně orientované specifikace“) často modelují programy (chytré kontrakty) jako systémy skládající se ze souboru matematických funkcí a popisují správné chování takových systémů.

Zjednodušeně řečeno, specifikace na nízké úrovni analyzují _stopy programu_ a pokoušejí se definovat vlastnosti chytrého kontraktu nad těmito stopami. Stopy odkazují na sekvence provádění funkcí, které mění stav chytrého kontraktu; specifikace na nízké úrovni proto pomáhají specifikovat požadavky na vnitřní provádění kontraktu.

Formální specifikace na nízké úrovni mohou být zadány buď jako vlastnosti v Hoareově stylu, nebo jako invarianty na cestách provádění.

### Vlastnosti v Hoareově stylu {#hoare-style-properties}

[Hoareova logika](https://en.wikipedia.org/wiki/Hoare_logic) poskytuje sadu formálních pravidel pro uvažování o správnosti programů, včetně chytrých kontraktů. Vlastnost v Hoareově stylu je reprezentována Hoareovou trojicí `{P}c{Q}`, kde `c` je program a `P` a `Q` jsou predikáty o stavu `c` (tj. programu), formálně popsané jako _předpoklady_ (preconditions) a _následky_ (postconditions).

Předpoklad je predikát popisující podmínky požadované pro správné provedení funkce; uživatelé volající kontrakt musí tento požadavek splnit. Následek je predikát popisující podmínku, kterou funkce nastolí, pokud je správně provedena; uživatelé mohou očekávat, že tato podmínka bude po zavolání funkce pravdivá. _Invariant_ v Hoareově logice je predikát, který je zachován provedením funkce (tj. nemění se).

Specifikace v Hoareově stylu mohou zaručit buď _částečnou správnost_, nebo _úplnou správnost_. Implementace funkce kontraktu je „částečně správná“, pokud je předpoklad pravdivý před provedením funkce, a pokud se provádění ukončí, je pravdivý i následek. Důkaz úplné správnosti je získán, pokud je předpoklad pravdivý před provedením funkce, je zaručeno, že se provádění ukončí, a když se tak stane, je pravdivý i následek.

Získání důkazu úplné správnosti je obtížné, protože některá provádění se mohou před ukončením zpozdit, nebo se nemusí ukončit vůbec. Otázka, zda se provádění ukončí, je však pravděpodobně bezpředmětná, protože mechanismus gasu v Ethereu zabraňuje nekonečným programovým smyčkám (provádění se buď úspěšně ukončí, nebo skončí chybou „out-of-gas“).

Specifikace chytrých kontraktů vytvořené pomocí Hoareovy logiky budou mít definovány předpoklady, následky a invarianty pro provádění funkcí a smyček v kontraktu. Předpoklady často zahrnují možnost chybných vstupů do funkce, přičemž následky popisují očekávanou reakci na takové vstupy (např. vyvolání specifické výjimky). Tímto způsobem jsou vlastnosti v Hoareově stylu účinné pro zajištění správnosti implementací kontraktů.

Mnoho frameworků pro formální verifikaci používá specifikace v Hoareově stylu k dokazování sémantické správnosti funkcí. Je také možné přidat vlastnosti v Hoareově stylu (jako aserty) přímo do kódu kontraktu pomocí příkazů `require` a `assert` v Solidity.

Příkazy `require` vyjadřují předpoklad nebo invariant a často se používají k ověření uživatelských vstupů, zatímco `assert` zachycuje následek nezbytný pro bezpečnost. Například správného řízení přístupu k funkcím (příklad bezpečnostní vlastnosti) lze dosáhnout použitím `require` jako kontroly předpokladu identity volajícího účtu. Podobně lze invariant přípustných hodnot stavových proměnných v kontraktu (např. celkový počet tokenů v oběhu) chránit před porušením použitím `assert` k potvrzení stavu kontraktu po provedení funkce.

### Vlastnosti na úrovni stop {#trace-level-properties}

Specifikace založené na stopách popisují operace, které převádějí kontrakt mezi různými stavy, a vztahy mezi těmito operacemi. Jak bylo vysvětleno dříve, stopy jsou sekvence operací, které určitým způsobem mění stav kontraktu.

Tento přístup se spoléhá na model chytrých kontraktů jako systémů přechodů stavů s některými předdefinovanými stavy (popsanými stavovými proměnnými) spolu se sadou předdefinovaných přechodů (popsaných funkcemi kontraktu). Kromě toho se k popisu operační sémantiky kontraktu často používá [graf toku řízení](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), což je grafické znázornění toku provádění programu. Zde je každá stopa reprezentována jako cesta v grafu toku řízení.

Specifikace na úrovni stop se primárně používají k uvažování o vzorcích vnitřního provádění v chytrých kontraktech. Vytvořením specifikací na úrovni stop prosazujeme přípustné cesty provádění (tj. přechody stavů) pro chytrý kontrakt. Pomocí technik, jako je symbolické provádění, můžeme formálně ověřit, že provádění nikdy nesleduje cestu, která není definována ve formálním modelu.

K popisu vlastností na úrovni stop použijme příklad kontraktu [DAO](/dao/), který má některé veřejně přístupné funkce. Zde předpokládáme, že kontrakt DAO umožňuje uživatelům provádět následující operace:

- Vložit prostředky

- Hlasovat o návrhu po vložení prostředků

- Nárokovat vrácení peněz, pokud o návrhu nehlasují

Příkladem vlastností na úrovni stop by mohlo být _„uživatelé, kteří nevloží prostředky, nemohou hlasovat o návrhu“_ nebo _„uživatelé, kteří nehlasují o návrhu, by měli mít vždy možnost nárokovat vrácení peněz“_. Obě vlastnosti prosazují preferované sekvence provádění (hlasování nemůže proběhnout _před_ vložením prostředků a nárokování vrácení peněz nemůže proběhnout _po_ hlasování o návrhu).

## Techniky formální verifikace chytrých kontraktů {#formal-verification-techniques}

### Kontrola modelů (Model checking) {#model-checking}

Kontrola modelů je technika formální verifikace, při které algoritmus kontroluje formální model chytrého kontraktu vůči jeho specifikaci. Při kontrole modelů jsou chytré kontrakty často reprezentovány jako systémy přechodů stavů, zatímco vlastnosti přípustných stavů kontraktu jsou definovány pomocí temporální logiky.

Kontrola modelů vyžaduje vytvoření abstraktní matematické reprezentace systému (tj. kontraktu) a vyjádření vlastností tohoto systému pomocí vzorců založených na [výrokové logice](https://www.baeldung.com/cs/propositional-logic). To zjednodušuje úkol algoritmu pro kontrolu modelů, a to dokázat, že matematický model splňuje daný logický vzorec.

Kontrola modelů ve formální verifikaci se primárně používá k vyhodnocení temporálních vlastností, které popisují chování kontraktu v čase. Temporální vlastnosti pro chytré kontrakty zahrnují _bezpečnost_ a _živost_, které jsme vysvětlili dříve.

Například bezpečnostní vlastnost související s řízením přístupu (např. _Pouze vlastník kontraktu může volat `selfdestruct`_) může být zapsána ve formální logice. Poté může algoritmus pro kontrolu modelů ověřit, zda kontrakt splňuje tuto formální specifikaci.

Kontrola modelů využívá průzkum stavového prostoru, který zahrnuje konstrukci všech možných stavů chytrého kontraktu a pokus o nalezení dosažitelných stavů, které vedou k porušení vlastností. To však může vést k nekonečnému počtu stavů (známému jako „problém exploze stavů“), proto se nástroje pro kontrolu modelů spoléhají na abstrakční techniky, které umožňují efektivní analýzu chytrých kontraktů.

### Dokazování vět (Theorem proving) {#theorem-proving}

Dokazování vět je metoda matematického uvažování o správnosti programů, včetně chytrých kontraktů. Zahrnuje transformaci modelu systému kontraktu a jeho specifikací do matematických vzorců (logických výroků).

Cílem dokazování vět je ověřit logickou ekvivalenci mezi těmito výroky. „Logická ekvivalence“ (nazývaná také „logická biimplikace“) je typ vztahu mezi dvěma výroky takový, že první výrok je pravdivý _tehdy a jen tehdy_, když je pravdivý druhý výrok.

Požadovaný vztah (logická ekvivalence) mezi výroky o modelu kontraktu a jeho vlastnosti je formulován jako dokazatelný výrok (nazývaný věta nebo teorém). Pomocí formálního systému odvozování může automatizovaný dokazovatel vět ověřit platnost věty. Jinými slovy, dokazovatel vět může přesvědčivě dokázat, že model chytrého kontraktu přesně odpovídá jeho specifikacím.

Zatímco kontrola modelů modeluje kontrakty jako systémy přechodů s konečnými stavy, dokazování vět zvládne analýzu systémů s nekonečným počtem stavů. To však znamená, že automatizovaný dokazovatel vět nemůže vždy vědět, zda je logický problém „rozhodnutelný“ či nikoli.

V důsledku toho je často vyžadována lidská asistence, která dokazovatele vět vede při odvozování důkazů správnosti. Využití lidského úsilí při dokazování vět činí jeho použití dražším než kontrola modelů, která je plně automatizovaná.

### Symbolické provádění {#symbolic-execution}

Symbolické provádění je metoda analýzy chytrého kontraktu prováděním funkcí pomocí _symbolických hodnot_ (např. `x > 5`) namísto _konkrétních hodnot_ (např. `x == 5`). Jako technika formální verifikace se symbolické provádění používá k formálnímu uvažování o vlastnostech na úrovni stop v kódu kontraktu.

Symbolické provádění reprezentuje stopu provádění jako matematický vzorec nad symbolickými vstupními hodnotami, jinak nazývaný _predikát cesty_. K ověření, zda je predikát cesty „splnitelný“ (tj. existuje hodnota, která může vzorec splnit), se používá [řešitel SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories). Pokud je zranitelná cesta splnitelná, řešitel SMT vygeneruje konkrétní hodnotu, která nasměruje provádění k této cestě.

Předpokládejme, že funkce chytrého kontraktu přijímá jako vstup hodnotu `uint` (`x`) a vrátí se (revert), když je `x` větší než `5` a zároveň menší než `10`. Nalezení hodnoty pro `x`, která spustí chybu pomocí běžného testovacího postupu, by vyžadovalo projít desítky testovacích případů (nebo více) bez jistoty, že skutečně najdeme vstup spouštějící chybu.

Naopak nástroj pro symbolické provádění by provedl funkci se symbolickou hodnotou: `X > 5 ∧ X < 10` (tj. `x` je větší než 5 A `x` je menší než 10). Přidružený predikát cesty `x = X > 5 ∧ X < 10` by pak byl předán řešiteli SMT k vyřešení. Pokud určitá hodnota splňuje vzorec `x = X > 5 ∧ X < 10`, řešitel SMT ji vypočítá – například řešitel může vyprodukovat `7` jako hodnotu pro `x`.

Protože se symbolické provádění spoléhá na vstupy do programu a množina vstupů k prozkoumání všech dosažitelných stavů je potenciálně nekonečná, stále se jedná o formu testování. Jak je však ukázáno na příkladu, symbolické provádění je efektivnější než běžné testování při hledání vstupů, které spouštějí porušení vlastností.

Kromě toho symbolické provádění produkuje méně falešně pozitivních výsledků než jiné techniky založené na vlastnostech (např. fuzzing), které náhodně generují vstupy do funkce. Pokud je během symbolického provádění spuštěn chybový stav, je možné vygenerovat konkrétní hodnotu, která chybu spustí, a problém reprodukovat.

Symbolické provádění může také poskytnout určitý stupeň matematického důkazu správnosti. Zvažte následující příklad funkce kontraktu s ochranou proti přetečení:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Stopa provádění, která vede k přetečení celého čísla, by musela splňovat vzorec: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Je nepravděpodobné, že by takový vzorec byl vyřešen, a proto slouží jako matematický důkaz, že u funkce `safe_add` nikdy nedojde k přetečení.

### Proč používat formální verifikaci pro chytré kontrakty? {#benefits-of-formal-verification}

#### Potřeba spolehlivosti {#need-for-reliability}

Formální verifikace se používá k posouzení správnosti systémů kritických z hlediska bezpečnosti, jejichž selhání může mít zničující následky, jako je smrt, zranění nebo finanční krach. Chytré kontrakty jsou aplikace s vysokou hodnotou, které kontrolují obrovské množství hodnoty, a jednoduché chyby v návrhu mohou vést k [nenávratným ztrátám pro uživatele](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Formální verifikace kontraktu před nasazením však může zvýšit záruky, že bude po spuštění na blockchainu fungovat podle očekávání.

Spolehlivost je vysoce žádanou vlastností každého chytrého kontraktu, zejména proto, že kód nasazený v [Ethereum](/) Virtual Machine (EVM) je obvykle neměnný. Vzhledem k tomu, že upgrady po spuštění nejsou snadno dostupné, potřeba zaručit spolehlivost kontraktů činí formální verifikaci nezbytnou. Formální verifikace je schopna detekovat záludné problémy, jako je podtečení a přetečení celých čísel, re-entrancy a špatné optimalizace gasu, které mohou uniknout auditorům a testerům.

#### Prokázání funkční správnosti {#prove-functional-correctness}

Testování programu je nejběžnější metodou dokazování, že chytrý kontrakt splňuje určité požadavky. To zahrnuje provedení kontraktu se vzorkem dat, se kterými se očekává, že bude pracovat, a analýzu jeho chování. Pokud kontrakt vrátí očekávané výsledky pro vzorová data, pak mají vývojáři objektivní důkaz o jeho správnosti.

Tento přístup však nemůže prokázat správné provedení pro vstupní hodnoty, které nejsou součástí vzorku. Testování kontraktu proto může pomoci odhalit chyby (tj. pokud některé cesty kódu během provádění nevrátí požadované výsledky), ale **nemůže přesvědčivě prokázat nepřítomnost chyb**.

Naopak formální verifikace může formálně dokázat, že chytrý kontrakt splňuje požadavky pro nekonečnou škálu provádění, _aniž by_ se kontrakt vůbec spustil. To vyžaduje vytvoření formální specifikace, která přesně popisuje správné chování kontraktu, a vývoj formálního (matematického) modelu systému kontraktu. Poté můžeme postupovat podle formálního postupu dokazování a zkontrolovat konzistenci mezi modelem kontraktu a jeho specifikací.

S formální verifikací je otázka ověření, zda obchodní logika kontraktu splňuje požadavky, matematickým výrokem, který lze dokázat nebo vyvrátit. Formálním dokázáním výroku můžeme ověřit nekonečný počet testovacích případů pomocí konečného počtu kroků. Tímto způsobem má formální verifikace lepší vyhlídky na prokázání, že je kontrakt funkčně správný s ohledem na specifikaci.

#### Ideální cíle verifikace {#ideal-verification-targets}

Cíl verifikace popisuje systém, který má být formálně ověřen. Formální verifikace se nejlépe používá ve „vestavěných systémech“ (malé, jednoduché části softwaru, které tvoří součást většího systému). Jsou také ideální pro specializované domény, které mají málo pravidel, protože to usnadňuje úpravu nástrojů pro ověřování doménově specifických vlastností.

Chytré kontrakty – alespoň do jisté míry – splňují oba požadavky. Například malá velikost kontraktů na Ethereu je činí vhodnými pro formální verifikaci. Podobně se EVM řídí jednoduchými pravidly, což usnadňuje specifikaci a ověřování sémantických vlastností pro programy běžící v EVM.

### Rychlejší vývojový cyklus {#faster-development-cycle}

Techniky formální verifikace, jako je kontrola modelů a symbolické provádění, jsou obecně efektivnější než běžná analýza kódu chytrého kontraktu (prováděná během testování nebo auditu). Je to proto, že formální verifikace se při testování asertů spoléhá na symbolické hodnoty („co když se uživatel pokusí vybrat _n_ etherů?“), na rozdíl od testování, které používá konkrétní hodnoty („co když se uživatel pokusí vybrat 5 etherů?“).

Symbolické vstupní proměnné mohou pokrýt více tříd konkrétních hodnot, takže přístupy formální verifikace slibují větší pokrytí kódu v kratším časovém rámci. Při efektivním použití může formální verifikace urychlit vývojový cyklus pro vývojáře.

Formální verifikace také zlepšuje proces budování decentralizovaných aplikací (dapp) snížením nákladných chyb v návrhu. Upgradování kontraktů (tam, kde je to možné) za účelem opravy zranitelností vyžaduje rozsáhlé přepisování kódových základen a více úsilí vynaloženého na vývoj. Formální verifikace dokáže odhalit mnoho chyb v implementacích kontraktů, které mohou uniknout testerům a auditorům, a poskytuje dostatek příležitostí k nápravě těchto problémů před nasazením kontraktu.

## Nevýhody formální verifikace {#drawbacks-of-formal-verification}

### Náklady na manuální práci {#cost-of-manual-labor}

Formální verifikace, zejména poloautomatická verifikace, při které člověk vede dokazovatele k odvození důkazů správnosti, vyžaduje značnou manuální práci. Vytvoření formální specifikace je navíc složitá činnost, která vyžaduje vysokou úroveň dovedností.

Tyto faktory (úsilí a dovednosti) činí formální verifikaci náročnější a dražší ve srovnání s obvyklými metodami hodnocení správnosti kontraktů, jako je testování a audity. Nicméně zaplatit náklady na úplný verifikační audit je praktické, vezmeme-li v úvahu náklady na chyby v implementacích chytrých kontraktů.

### Falešně negativní výsledky {#false-negatives}

Formální verifikace může pouze zkontrolovat, zda provádění chytrého kontraktu odpovídá formální specifikaci. Proto je důležité se ujistit, že specifikace správně popisuje očekávané chování chytrého kontraktu.

Pokud jsou specifikace špatně napsány, porušení vlastností – která poukazují na zranitelná provádění – nemohou být auditem formální verifikace odhalena. V tomto případě by se vývojář mohl mylně domnívat, že kontrakt neobsahuje chyby.

### Problémy s výkonem {#performance-issues}

Formální verifikace naráží na řadu problémů s výkonem. Například problémy s explozí stavů a cest, se kterými se setkáváme při kontrole modelů, respektive symbolické kontrole, mohou ovlivnit postupy verifikace. Nástroje pro formální verifikaci také často ve své základní vrstvě používají řešitele SMT a další řešitele omezení a tito řešitelé se spoléhají na výpočetně náročné postupy.

Také není vždy možné, aby verifikátory programů určily, zda vlastnost (popsaná jako logický vzorec) může být splněna či nikoli („[problém rozhodnutelnosti](https://en.wikipedia.org/wiki/Decision_problem)“), protože program se nemusí nikdy ukončit. Proto může být nemožné dokázat některé vlastnosti kontraktu, i když je dobře specifikován.

## Nástroje pro formální verifikaci chytrých kontraktů na Ethereu {#formal-verification-tools}

### Specifikační jazyky pro vytváření formálních specifikací {#specification-languages}

**Act**: _*Act umožňuje specifikaci aktualizací úložiště, předpokladů/následků a invariantů kontraktu. Jeho sada nástrojů má také dokazovací backendy schopné dokázat mnoho vlastností prostřednictvím Coq, řešitelů SMT nebo hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Dokumentace](https://github.com/argotorg/act)

**Scribble** - _*Scribble transformuje anotace kódu ve specifikačním jazyce Scribble na konkrétní aserty, které kontrolují specifikaci.*_

- [Dokumentace](https://docs.scribble.codes/)

**Dafny** - _*Dafny je programovací jazyk připravený na verifikaci, který se spoléhá na anotace na vysoké úrovni k uvažování o správnosti kódu a jejímu dokazování.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Verifikátory programů pro kontrolu správnosti {#program-verifiers}

**Certora Prover** - _Certora Prover je automatický nástroj pro formální verifikaci pro kontrolu správnosti kódu v chytrých kontraktech. Specifikace jsou psány v CVL (Certora Verification Language), přičemž porušení vlastností jsou detekována pomocí kombinace statické analýzy a řešení omezení._

- [Webové stránky](https://www.certora.com/)
- [Dokumentace](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*SMTChecker v Solidity je vestavěný nástroj pro kontrolu modelů založený na SMT (Satisfiability Modulo Theories) a řešení Hornových klauzulí. Během kompilace potvrzuje, zda zdrojový kód kontraktu odpovídá specifikacím, a staticky kontroluje porušení bezpečnostních vlastností.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify je rozšířená verze kompilátoru Solidity, která dokáže provádět automatizovanou formální verifikaci kódu Solidity pomocí anotací a modulární verifikace programu.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM je formální sémantika Ethereum Virtual Machine (EVM) napsaná ve frameworku K. KEVM je spustitelný a dokáže dokázat určité aserty související s vlastnostmi pomocí logiky dosažitelnosti.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentace](https://jellopaper.org/)

### Logické frameworky pro dokazování vět {#theorem-provers}

**Isabelle** - _Isabelle/HOL je asistent dokazování, který umožňuje vyjádřit matematické vzorce ve formálním jazyce a poskytuje nástroje pro dokazování těchto vzorců. Hlavní aplikací je formalizace matematických důkazů a zejména formální verifikace, která zahrnuje dokazování správnosti počítačového hardwaru nebo softwaru a dokazování vlastností počítačových jazyků a protokolů._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentace](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq je interaktivní dokazovatel vět, který vám umožňuje definovat programy pomocí vět a interaktivně generovat strojově kontrolované důkazy správnosti._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentace](https://rocq-prover.org/docs)

### Nástroje založené na symbolickém provádění pro detekci zranitelných vzorů v chytrých kontraktech {#symbolic-execution-tools}

**Manticore** - _*Nástroj pro analýzu bajtkódu EVM založený na symbolickém provádění*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentace](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm je engine pro symbolické provádění a kontrolu ekvivalence pro bajtkód EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Nástroj pro symbolické provádění pro detekci zranitelných míst v chytrých kontraktech na Ethereu_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentace](https://mythril-classic.readthedocs.io/en/develop/)

## Další čtení {#further-reading}

- [Jak funguje formální verifikace chytrých kontraktů](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Přehled projektů formální verifikace v ekosystému Etherea](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Komplexní formální verifikace chytrého kontraktu pro vklady v Ethereu 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formální verifikace nejpopulárnějšího chytrého kontraktu na světě](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker a formální verifikace](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)