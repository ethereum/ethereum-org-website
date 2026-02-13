---
title: "Formální ověření chytrých kontraktů"
description: "Přehled formálního ověření pro chytré kontrakty na Ethereu"
lang: cs
---

[Chytré kontrakty](/developers/docs/smart-contracts/) umožňují vytvářet decentralizované a robustní aplikace nevyžadující důvěru, které představují nové případy užití a odemykají hodnotu pro uživatele. Protože chytré kontrakty spravují hodnotná aktiva, bezpečnost je pro vývojáře kritická.

Formální ověření je jednou z doporučených technik pro zlepšení [bezpečnosti chytrých kontraktů](/developers/docs/smart-contracts/security/). Formální ověření, které používá [formální metody](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) pro specifikaci, návrh a ověřování programů, se již léta používá k zajištění správnosti kritických hardwarových a softwarových systémů.

Když je formální verifikace implementována v chytrých kontraktech, může dokázat, že obchodní logika kontraktu splňuje předem definovanou specifikaci. Ve srovnání s jinými metodami pro hodnocení správnosti kódu kontraktu, jako je testování, poskytuje formální verifikace silnější záruky, že chytrý kontrakt je funkčně správný.

## Co je formální verifikace? {#what-is-formal-verification}

Formální verifikace se týká procesu hodnocení správnosti systému ve vztahu k formální specifikaci. Jednoduše řečeno, formální verifikace nám umožňuje zjistit, zda chování systému splňuje některé požadavky (tj. zda dělá to, co od něj očekáváme).

Očekávané chování systému (v tomto případě chytrého kontraktu) je popsáno pomocí formálního modelování, zatímco specifikační jazyky umožňují vytvoření formálních vlastností. Formální verifikační techniky pak mohou ověřit, že implementace kontraktu odpovídá jeho specifikaci a odvodit matematický důkaz o správnosti této implementace. Když kontrakt splňuje svou specifikaci, je popsán jako „funkčně správný“, „správný podle návrhu“ nebo „správný podle konstrukce“.

### Co je formální model? {#what-is-a-formal-model}

V počítačové vědě je [formální model](https://en.wikipedia.org/wiki/Model_of_computation) matematickým popisem výpočetního procesu. Programy jsou abstrahovány do matematických funkcí (rovnic) a model popisuje, jak se výstupy funkcí vypočítávají na základě zadaných vstupů.

Formální modely poskytují úroveň abstrakce, nad kterou lze analyzovat chování programu. Existence formálních modelů umožňuje vytvoření _formální specifikace_, která popisuje požadované vlastnosti daného modelu.

Pro modelování chytrých kontraktů za účelem formální verifikace se používají různé techniky. Například některé modely se používají k simulaci chování chytrého kontraktu na vysoké úrovni. Tyto modelovací techniky se na chytré kontrakty dívají jako na „černé skříňky“, vnímají je jako systémy, které přijímají vstupy a provádějí výpočty na základě těchto vstupů.

Modely na vysoké úrovni se zaměřují na vztah mezi chytrými kontrakty a externími agenty, jako jsou externě vlastněné účty (EOAs), kontraktové účty a blockchainové prostředí. Tyto modely jsou užitečné pro definování vlastností určujících, jak by se měl kontrakt chovat v reakci na předem dané interakce uživatelů.

Naopak, jiné formální modely se zaměřují na chování chytrého kontraktu na nižší úrovni. Zatímco modely zkoumající chování kontraktů na vysoké úrovni mohou pomoci při úvahách o funkčnosti kontraktu, není vyloučeno jejich selhání při zachycování detailů o interních mechanismech implementace. Nízkoúrovňové modely uplatňují při analýze programu pohled „bílé skříňky“ a spoléhají se na nízkoúrovňové reprezentace aplikací s chytrými kontrakty, jako je trasování programu a [grafy řídicího toku](https://en.wikipedia.org/wiki/Control-flow_graph), aby bylo možné usuzovat o vlastnostech relevantních pro provádění kontraktu.

Nízkoúrovňové modely jsou považovány za ideální, protože představují skutečné provedení chytrého kontraktu v exekučním prostředí Etherea (tj. v [EVM](/developers/docs/evm/)). Techniky modelování na nízké úrovni jsou zvláště užitečné při stanovování kritických bezpečnostních vlastností chytrých kontraktů a detekci potenciálních zranitelností.

### Co je formální specifikace? {#what-is-a-formal-specification}

Specifikace je jednoduše řečeno technický požadavek, který musí daný systém splňovat. V programování představují specifikace obecné představy o provádění programu (tj. co by měl program dělat).

V kontextu chytrých kontraktů se formální specifikace vztahují na _vlastnosti_ – formální popisy požadavků, které musí kontrakt splňovat. Takové vlastnosti se označují jako „invarianty“ a představují logická tvrzení o provádění kontraktu, která musí zůstat pravdivá za všech okolností, bez jakýchkoliv výjimek.

Formální verifikaci tedy můžeme považovat za sbírku tvrzení napsaných ve formálním jazyce, která popisují zamýšlený výkon chytrého kontraktu. Specifikace pokrývají vlastnosti kontraktu a definují, jak by se měl chovat v různých situacích. Účelem formální verifikace je zjistit, zda chytrý kontrakt tyto vlastnosti (invarianty) má a zda nejsou tyto vlastnosti během provádění porušeny.

Formální specifikace jsou klíčové při vývoji bezpečných implementací chytrých kontraktů. Kontrakty, které neimplementují invarianty nebo mají své vlastnosti porušené během provádění, jsou náchylné ke zranitelnostem, které mohou poškodit jejich funkčnost nebo umožnit zneužití.

## Typy formálních specifikací pro chytré kontrakty {#formal-specifications-for-smart-contracts}

Formální specifikace umožňují matematické uvažování o správnosti provádění programu. Stejně jako formální modely mohou formální specifikace zachytit buď vlastnosti na vysoké úrovni, nebo chování implementace kontraktu na nízké úrovni.

Formální specifikace jsou odvozeny pomocí prvků [programovací logiky](https://en.wikipedia.org/wiki/Logic_programming), která umožňuje formální uvažování o vlastnostech programu. Programová logika má formální pravidla, která vyjadřují (v matematickém jazyce) očekávané chování programu. Při vytváření formálních specifikací se používají různé programovací logiky, včetně [logiky dosažitelnosti](https://en.wikipedia.org/wiki/Reachability_problem), [temporální logiky](https://en.wikipedia.org/wiki/Temporal_logic) a [Hoareovy logiky](https://en.wikipedia.org/wiki/Hoare_logic).

Formální specifikace pro chytré kontrakty lze obecně rozdělit na **vysokoúrovňové** a **nízkoúrovňové** specifikace. Bez ohledu na to, do které kategorie specifikace patří, musí adekvátně a jednoznačně popisovat vlastnost systému, který je podroben analýze.

### Vysokoúrovňové specifikace {#high-level-specifications}

Jak název napovídá, specifikace na vysoké úrovni (také nazývané „modelově orientované specifikace“) popisují chování programu na vysoké úrovni. Vysokoúrovňové specifikace modelují chytrý kontrakt jako [konečný stavový automat](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), který může přecházet mezi stavy prováděním operací, přičemž k definování formálních vlastností modelu FSM se používá temporální logika.

[Temporální logiky](https://en.wikipedia.org/wiki/Temporal_logic) jsou „pravidla pro uvažování o tvrzeních kvalifikovaných z hlediska času (např. „_vždycky_ mám hlad“ nebo „_nakonec_ budu mít hlad“).“ Když se aplikují na formální verifikaci, temporální logiky se používají k vyjádření tvrzení o správném chování systémů modelovaných jako automaty. Konkrétně popisuje temporální logika budoucí stavy, ve kterých se chytrý kontrakt může nacházet, a jak mezi těmito stavy přechází.

Vysokoúrovňové specifikace obecně zachycují dvě kritické časové vlastnosti chytrých kontraktů: **bezpečnost** a **živost**. Bezpečnostní vlastnosti představují myšlenku, že „nic špatného se nikdy nestane“ a obvykle vyjadřují invarianty. Bezpečnostní vlastnost může definovat obecné softwarové požadavky, jako je ochrana před [zablokováním](https://www.techtarget.com/whatis/definition/deadlock), nebo vyjadřovat vlastnosti specifické pro doménu kontraktů (např. invarianty řízení přístupu k funkcím, přípustné hodnoty stavových proměnných nebo podmínky pro převody tokenů).

Jako příklad si vezměme tento bezpečnostní požadavek, který se vztahuje na podmínky pro použití funkcí `transfer()` nebo `transferFrom()` v kontraktech s tokeny ERC-20: _„Zůstatek odesílatele není nikdy nižší než požadované množství tokenů k odeslání.“_. Tento popis invariantu kontraktu v přirozeném jazyce lze převést do formální (matematické) specifikace, která pak může být rigorózně ověřena z hlediska platnosti.

Živostní vlastnosti zajišťují, že „se ve výsledku stane něco dobrého“, a týkají se schopnosti kontraktu přepínat mezi různými stavy. Příkladem živostní vlastnosti je „likvidita“, která odkazuje na schopnost kontraktu převádět své zůstatky uživatelům na základě žádosti. Pokud je tato vlastnost porušena, uživatelé nebudou moci vybrat prostředky uložené v kontraktu, jako se to stalo při [incidentu s peněženkou Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Nízkoúrovňové specifikace {#low-level-specifications}

Specifikace na vysoké úrovni berou jako výchozí bod model konečného automatu kontraktu a definují požadované vlastnosti tohoto modelu. Naopak specifikace na nízké úrovni (také nazývané „specifikace orientované na vlastnosti“) často modelují programy (chytré kontrakty) jako systémy skládající se ze sbírky matematických funkcí a popisují správné chování těchto systémů.

Jednoduše řečeno, nízkoúrovňové specifikace analyzují _trasování programu_ a pokoušejí se definovat vlastnosti chytrého kontraktu na základě tohoto trasování. Sledy odkazují na sekvence provádění funkcí, které mění stav chytrého kontraktu; proto specifikace na nízké úrovni pomáhají specifikovat požadavky na interní exekuci kontraktu.

Formální specifikace na nízké úrovni mohou být uvedeny buď jako vlastnosti ve stylu Hoareovy logiky, nebo jako invarianty na exekučních cestách.

### Vlastnosti ve stylu Hoareovy logiky {#hoare-style-properties}

[Hoareova logika](https://en.wikipedia.org/wiki/Hoare_logic) poskytuje sadu formálních pravidel pro uvažování o správnosti programů, včetně chytrých kontraktů. Vlastnost ve stylu Hoareovy logiky je reprezentována Hoareovou trojicí `{P}c{Q}`, kde `c` je program a `P` a `Q` jsou predikáty stavu `c` (tj. programu), formálně popsané jako _vstupní podmínky_ a _výstupní podmínky_.

Předpoklad je predikát popisující podmínky potřebné pro správné provedení funkce; uživatelé volající kontrakt musí tuto podmínku splnit. Podmínka následku je predikát popisující podmínku, kterou funkce stanoví, pokud je správně provedena; uživatelé mohou očekávat, že tato podmínka bude po volání funkce pravdivá. _Invariant_ v Hoareově logice je predikát, který je zachován při provádění funkce (tj. nemění se).

Specifikace ve stylu Hoareovy logiky mohou zaručit buď _částečnou správnost_, nebo _úplnou správnost_. Implementace funkce kontraktu je „částečně správná“, pokud předpoklad platí před provedením funkce a když provedení končí, podmínka následku je také pravdivá. Důkaz úplné správnosti je obdržen, pokud je předpoklad pravdivý před provedením funkce, dále je zaručeno, že provádění funkce bude ukončeno, a když k tomu dojde, následek bude pravdivý.

Získání důkazu o úplné správnosti je obtížné, protože některá provedení se mohou před ukončením opozdit, nebo nemusí být dokončena vůbec. To znamená, že otázka, zda provedení skončí, je pravděpodobně diskutabilní, protože mechanismus paliva na Ethereu zabraňuje nekonečným smyčkám programu (provádění buď úspěšně skončí, nebo skončí kvůli chybě „došlo palivo“).

Specifikace chytrých kontraktů vytvořené pomocí Hoareovy logiky budou mít definovány předpoklady, podmínky následku a invarianty pro provedení funkcí a smyček kontraktu. Předpoklady často zahrnují možnost chybných vstupů funkce, přičemž následky popisují očekávanou reakci na takové vstupy (např. vyvolání specifické výjimky). Tímto způsobem jsou vlastnosti ve stylu Hoareovy logiky účinné při zajišťování správnosti implementací kontraktů.

Mnoho rámců pro formální verifikaci používá specifikace ve stylu Hoareovy logiky k prokázání sémantické správnosti funkcí. Vlastnosti ve stylu Hoareovy logiky je také možné přidávat (jako tvrzení) přímo do kódu kontraktu pomocí příkazů `require` a `assert` v Solidity.

Příkazy `require` vyjadřují vstupní podmínku nebo invariant a často se používají k ověření uživatelských vstupů, zatímco `assert` zachycuje výstupní podmínku nezbytnou pro bezpečnost. Například řádné řízení přístupu k funkcím (příklad bezpečnostní vlastnosti) lze dosáhnout pomocí příkazu `require` jako kontroly vstupní podmínky identity volajícího účtu. Podobně lze invariant přípustných hodnot stavových proměnných v kontraktu (např. celkový počet tokenů v oběhu) ochránit před porušením pomocí `assert`, který potvrdí stav kontraktu po provedení funkce.

### Vlastnosti na úrovni trasování {#trace-level-properties}

Specifikace založené na trasování popisují operace, které mění různé stavy kontraktu, a vztahy mezi těmito operacemi. Jak jsme vysvětlili výše, trasy jsou sekvence operací, které mění stav kontraktu určitým způsobem.

Tento přístup se spoléhá na modelování chytrých kontraktů jako systémů změny stavů s předdefinovanými stavy (popisovanými stavovými proměnnými) spolu se souborem předdefinovaných přechodů (popisovaných funkcemi kontraktu). Dále se pro popis operační sémantiky kontraktu často používá [graf řídicího toku](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), což je grafické znázornění toku provádění programu. V něm je každá trasa reprezentována jako cesta na tomto grafu toků řízení.

Primárně se specifikace na úrovni tras používají k úvahám o vzorcích interního provádění v chytrých kontraktech. Vytvořením specifikací na úrovni tras se ujišťujeme o přípustných cestách provedení (tj. přechodech stavů) pro daný chytrý kontrakt. Pomocí technik, jako je symbolické provádění, můžeme formálně ověřit, že provedení nikdy nenásleduje cestu, která není definována ve formálním modelu.

Pro popis vlastností na úrovni trasování použijme příklad kontraktu [DAO](/dao/), který má několik veřejně přístupných funkcí. Pro tento příklad předpokládáme, že DAO kontrakt umožňuje uživatelům provádět následující operace:

- Vklad prostředků

- Hlasování o návrhu po vložení prostředků

- Požadování vrácení peněz, pokud uživatelé o návrhu nehlasovali

Příkladem vlastností na úrovni trasování může být _„uživatelé, kteří nevloží prostředky, nemohou hlasovat o návrhu“_ nebo _„uživatelé, kteří nehlasují o návrhu, by měli mít vždy možnost požádat o vrácení peněz“_. Obě vlastnosti zajišťují upřednostňované posloupnosti provádění (hlasování nemůže proběhnout _před_ vložením prostředků a žádost o vrácení peněz nemůže proběhnout _po_ hlasování o návrhu).

## Techniky formálního ověření chytrých kontraktů {#formal-verification-techniques}

### Kontrola modelů {#model-checking}

Kontrola modelu je technika formální verifikace, při které algoritmus kontroluje formální model chytrého kontraktu vůči jeho specifikaci. Při kontrole modelu jsou chytré kontrakty často reprezentovány jako systémy přechodu stavů, zatímco vlastnosti přípustných stavů kontraktu jsou definovány pomocí dočasné logiky.

Kontrola modelů vyžaduje vytvoření abstraktní matematické reprezentace systému (tj. kontraktu) a vyjádření vlastností tohoto systému pomocí vzorců založených na [výrokové logice](https://www.baeldung.com/cs/propositional-logic). To zjednodušuje úkol algoritmu kontroly modelu, kterým je možné prokázat, že matematický model splňuje daný logický vzorec.

Kontrola modelu se ve formální verifikaci primárně používá k vyhodnocení dočasných vlastností, které popisují chování kontraktu v průběhu času. Časové vlastnosti chytrých kontraktů zahrnují _bezpečnost_ a _živost_, které jsme vysvětlili dříve.

Například bezpečnostní vlastnost související s řízením přístupu (např. _pouze vlastník kontraktu může volat `selfdestruct`_) může být zapsána ve formální logice. Poté může algoritmus kontroly modelu ověřit, zda kontrakt splňuje tuto formální specifikaci.

Kontrola modelu využívá prozkoumávání stavového prostoru, což zahrnuje konstrukci všech možných stavů chytrého kontraktu a pokus o nalezení dosažitelných stavů, které vedou k porušení chtěných vlastností. To však může vést k nekonečnému počtu stavů (známému jako „problém explozí stavů“), proto se při kontrole modelu spoléhejte na abstrakční techniky, které umožňují efektivní analýzu chytrých kontraktů.

### Dokazování teorémů {#theorem-proving}

Dokazování věz je metoda matematického uvažování o správnosti programů, včetně chytrých kontraktů. Spočívá v transformaci modelu systému kontraktu a jeho specifikací na matematické formule (logické výroky).

Cílem dokazování vět je ověřit logickou ekvivalenci mezi těmito výroky. „Logická ekvivalence“ (také nazývaná „logická biimplikace“) je typ vztahu mezi dvěma výroky, kdy první výrok je pravdivý _právě tehdy, když_ je pravdivý i druhý výrok.

Požadovaný vztah (logická ekvivalence) mezi výroky o modelu kontraktu a jeho vlastnostech je formulován jako dokazatelný výrok (nazývaný věta). Pomocí formálního systému odvozování může automatizovaný důkazní systém ověřit platnost této věty. Jinými slovy, důkazní systém může jednoznačně prokázat, že model chytrého kontraktu přesně odpovídá jeho specifikacím.

Zatímco kontrola modelu nahlíží na kontrakty jako na přechodové systémy s konečnými stavy, dokazování vět dokáže analyzovat systémy s nekonečným počtem stavů. To však znamená, že automatizovaný důkazní systém nemůže vždy vědět, zda je logický problém „rozhodnutelný“ nebo ne.

V důsledku toho je často k vedení důkazního systému při odvozování důkazů správnosti zapotřebí lidská asistence. Použití lidského faktoru při důkazu vět činí tuto metodu nákladnější ve srovnání s kontrolou modelu, která je plně automatizovaná.

### Symbolické provádění {#symbolic-execution}

Symbolické provádění je metoda analýzy chytrého kontraktu prováděním funkcí s použitím _symbolických hodnot_ (např. `x > 5`) namísto _konkrétních hodnot_ (např. `x == 5`). Jako technika formální verifikace se symbolické provádění používá k formálnímu uvažování o vlastnostech na úrovni tras v kódu kontraktu.

Symbolické provádění představuje trasování provádění jako matematický vzorec nad symbolickými vstupními hodnotami, jinak nazývaný _predikát cesty_. [SMT solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) se používá ke kontrole, zda je predikát cesty „splnitelný“ (tj. zda existuje hodnota, která může splnit vzorec). Pokud je zranitelná trasa splnitelná, SMT solver vygeneruje konkrétní hodnotu, která nasměruje provádění směrem k této trase.

Předpokládejme, že funkce chytrého kontraktu přijímá jako vstup hodnotu typu `uint` (`x`) a vrátí se zpět, když je `x` větší než `5` a zároveň menší než `10`. Nalezení hodnoty `x`, která spustí chybu, by při běžném testovacím postupu vyžadovalo projít desítky testovacích případů (nebo více), aniž by byla zaručena skutečná nalezení vstupu, který chybu spouští.

Naopak, nástroj pro symbolické provádění by funkci provedl se symbolickou hodnotou: `X > 5 ∧ X < 10` (tj. `x` je větší než 5 A ZÁROVEŇ `x` je menší než 10). Přidružený predikát cesty `x = X > 5 ∧ X < 10` by pak byl předán SMT solveru k vyřešení. Pokud konkrétní hodnota splňuje vzorec `x = X > 5 ∧ X < 10`, SMT solver ji vypočítá – například může pro `x` vytvořit hodnotu `7`.

Protože se symbolické provádění spoléhá na vstupy programu a množina vstupů pro prozkoumání všech dosažitelných stavů je potenciálně nekonečná, stále se jedná o formu testování. Jak však ukazuje příklad, symbolické provádění je efektivnější než běžné testování pro hledání vstupů, které vyvolávají porušení vlastností.

Navíc symbolické provádění generuje méně falešných pozitiv než jiné techniky založené na vlastnostech (např. fuzzing), které náhodně generují vstupy do funkce. Pokud se během symbolického provádění vyvolá stav chyby, je možné vygenerovat konkrétní hodnotu, která chybu vyvolá, a tím problém reprodukovat.

Symbolické provádění může také poskytnout určitou míru matematického důkazu správnosti. Zvažte následující příklad funkce kontraktu s ochranou proti přetečení:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Trasování provádění, které má za následek celočíselné přetečení, by muselo splňovat vzorec: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)`. Takový vzorec je nepravděpodobné vyřešit, proto slouží jako matematický důkaz, že funkce `safe_add` nikdy nepřeteče.

### Proč používat formální ověřování pro chytré kontrakty? Výhody formálního ověření {#benefits-of-formal-verification}

#### Potřeba spolehlivosti {#need-for-reliability}

Formální ověřování se používá k posouzení správnosti systémů kritických z hlediska bezpečnosti, jejichž selhání může mít katastrofální následky, jako je smrt, zranění nebo finanční krach. Chytré kontrakty jsou vysoce hodnotné aplikace, které ovládají obrovské množství hodnot, a jednoduché chyby v návrhu mohou vést k [nenávratným ztrátám pro uživatele](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Formální ověření kontraktu před jeho nasazením však může zvýšit záruku, že bude po spuštění na blockchainu fungovat dle očekávání.

Spolehlivost je velmi žádaná vlastnost každého chytrého kontraktu, zejména proto, že kód nasazený ve virtuálním stroji Etherea (EVM) je obvykle neměnný. Vzhledem k tomu, že aktualizace po spuštění nejsou snadno dostupné, je nutné zaručit spolehlivost kontraktu a provést formální ověření. Formální ověřování dokáže odhalit záludné problémy, jako je přetečení a podtečení integerů, reentrace a špatná optimalizace paliva, které mohou auditorům a testerům uniknout.

#### Důkaz funkční správnosti {#prove-functional-correctness}

Testování programu je nejběžnější metodou, jak prokázat, že chytrý kontrakt splňuje určité požadavky. To zahrnuje spuštění kontraktu se vzorkem dat, která má zpracovávat, a analýzu jeho chování. Pokud kontrakt vrátí očekávané výsledky pro vzorová data, mají vývojáři objektivní důkaz jeho správnosti.

Tento přístup však nemůže prokázat správné provedení pro vstupní hodnoty, které nejsou součástí vzorku. Testování kontraktu proto může pomoci odhalit chyby (tj. pokud některé cesty kódu během provádění nevrátí požadované výsledky), ale **nemůže nezvratně prokázat nepřítomnost chyb**.

Naopak, formální ověření může formálně prokázat, že chytrý kontrakt splňuje požadavky pro nekonečný rozsah provádění, _aniž_ by se kontrakt vůbec spouštěl. To vyžaduje vytvoření formální specifikace, která přesně popisuje správné chování kontraktu, a vytvoření formálního (matematického) modelu systému kontraktu. Poté můžeme formálním důkazním postupem zkontrolovat soulad mezi modelem kontraktu a jeho specifikací.

Při formálním ověřování je otázka ověření, zda obchodní logika kontraktu splňuje požadavky, matematickým tvrzením, které lze dokázat nebo vyvrátit. Formálním dokazováním tvrzení můžeme ověřit nekonečný počet testovacích případů s konečným počtem kroků. Tímto způsobem má formální ověření lepší vyhlídky prokázat, že kontrakt je funkčně shodný se specifikací.

#### Ideální cíle ověření {#ideal-verification-targets}

Cíl ověřování popisuje systém, který má být formálně ověřen. Formální ověřování se nejlépe používá ve „vestavěných systémech“ (malých, jednoduchých částech softwaru, které jsou součástí většího systému). Jsou také ideální pro specializované domény, které mají málo pravidel, protože to usnadňuje úpravu nástrojů pro ověřování vlastností specifických pro danou doménu.

Chytré kontrakty – alespoň do určité míry – splňují oba požadavky. Například díky malé velikosti kontraktů na Ethereu je lze formálně ověřit. Podobně se řídí jednoduchými pravidly i EVM, což usnadňuje specifikaci a ověřování sémantických vlastností programů běžících v EVM.

### Rychlejší vývojový cyklus {#faster-development-cycle}

Techniky formálního ověřování, jako je kontrola modelu a symbolické provádění, jsou obecně účinnější než běžná analýza kódu chytrých kontraktů (prováděná během testování nebo auditu). Je to proto, že formální ověření se spoléhá na symbolické hodnoty pro testování tvrzení („co když se uživatel pokusí vybrat _n_ etheru?“) na rozdíl od testování, které používá konkrétní hodnoty („co když se uživatel pokusí vybrat 5 etheru?“).

Symbolické vstupní proměnné mohou pokrývat více tříd konkrétních hodnot, takže formální ověřovací přístupy slibují větší pokrytí kódu v kratším časovém horizontu. Pokud se formální ověřování používá efektivně, může vývojářům urychlit vývojový cyklus.

Formální ověřování také zlepšuje proces vytváření decentralizovaných aplikací (dappek) tím, že omezuje nákladné chyby v návrhu. Aktualizace kontraktů (tam, kde je to možné) za účelem opravy zranitelností vyžaduje rozsáhlé přepisování kódových základen a větší úsilí vynaložené na vývoj. Formální ověřování může odhalit mnoho chyb v implementacích kontraktů, které mohou testerům a auditorům uniknout, a poskytuje dostatek příležitostí k jejich odstranění před nasazením kontraktu.

## Nevýhody formálního ověření {#drawbacks-of-formal-verification}

### Náklady na manuální práci {#cost-of-manual-labor}

Formální ověřování, zejména poloautomatické ověřování, při němž člověk vede dokazovací nástroj při odvozování důkazů správnosti, vyžaduje značné množství ruční práce. Tvorba formální specifikace je navíc složitá činnost, která vyžaduje vysokou úroveň dovedností.

Tyto faktory (úsilí a dovednosti) činí formální ověřování náročnějším a nákladnějším ve srovnání s obvyklými metodami posuzování správnosti kontraktů, jako je testování a audity. Nicméně vzhledem k nákladům na chyby v implementacích chytrých kontraktů je zaplacení nákladů na úplný ověřovací audit praktické.

### Falešně negativní výsledky {#false-negatives}

Formální ověřování může pouze zkontrolovat, zda provedení chytrého kontraktu odpovídá formální specifikaci. Proto je důležité zajistit, aby specifikace správně popisovala očekávané chování chytrého kontraktu.

Pokud jsou specifikace špatně napsané, porušení vlastností, které poukazují na zranitelná provedení, nelze při auditu formálního ověřování odhalit. V takovém případě by se vývojář mohl mylně domnívat, že kontrakt je bez chyb.

### Problémy s výkonem {#performance-issues}

Formální ověřování naráží na řadu výkonnostních problémů. Například problémy s explozí stavů a cest, které se vyskytují při kontrole modelu, resp. symbolické kontrole, mohou ovlivnit verifikační postupy. Dále formální ověřovací nástroje často používají ve své základní vrstvě SMT řešiče a jiné řešiče omezení a ty se spoléhají na výpočetně náročné postupy.

Také není vždy možné, aby ověřovatelé programů určili, zda je vlastnost (popsaná jako logická formule) splnitelná nebo ne („[problém rozhodnutelnosti](https://en.wikipedia.org/wiki/Decision_problem)“), protože program nemusí být nikdy ukončen. Proto může být nemožné prokázat některé vlastnosti kontraktu, i když je dobře specifikovaný.

## Nástroje pro formální ověření chytrých kontraktů na Ethereu {#formal-verification-tools}

### Specifikační jazyky pro vytváření formálních specifikací {#specification-languages}

**Act**: __Act umožňuje specifikaci aktualizací úložiště, vstupních/výstupních podmínek a invariantů kontraktu._ Jeho sada nástrojů má také dokazovací backendy, které dokáží dokázat mnoho vlastností pomocí Coq, SMT solverů nebo hevm.\*_

- [GitHub](https://github.com/ethereum/act)
- [Dokumentace](https://github.com/argotorg/act)

**Scribble** - __Scribble transformuje anotace v kódu ve specifikačním jazyce Scribble do konkrétních tvrzení, která kontrolují specifikaci.__

- [Dokumentace](https://docs.scribble.codes/)

**Dafny** - __Dafny je programovací jazyk připravený na ověřování, který se spoléhá na vysokoúrovňové anotace pro zdůvodnění a prokázání správnosti kódu.__

- [GitHub](https://github.com/dafny-lang/dafny)

### Ověřovače programů pro kontrolu správnosti {#program-verifiers}

**Certora Prover** - _Certora Prover je automatický nástroj pro formální ověření, který kontroluje správnost kódu v chytrých kontraktech. Specifikace jsou napsány v jazyce CVL (Certora Verification Language), přičemž porušení vlastností se zjišťuje pomocí kombinace statické analýzy a řešení omezení._

- [Webové stránky](https://www.certora.com/)
- [Dokumentace](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - __SMTChecker v Solidity je vestavěný nástroj pro kontrolu modelů založený na SMT (Satisfiability Modulo Theories) a Hornově řešení._ Během kompilace potvrzuje, zda zdrojový kód kontraktu odpovídá specifikacím, a staticky kontroluje, zda nejsou porušeny bezpečnostní vlastnosti.\*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - __solc-verify je rozšířená verze kompilátoru Solidity, která dokáže provádět automatické formální ověřování kódu v Solidity pomocí anotací a modulárního ověřování programů.__

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - __KEVM je formální sémantika Ethereum Virtual Machine (EVM) napsaná v K frameworku._ KEVM je spustitelný a může dokazovat určitá tvrzení týkající se vlastností pomocí logiky dosažitelnosti.\*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentace](https://jellopaper.org/)

### Logické frameworky pro dokazování teorémů {#theorem-provers}

**Isabelle** - _Isabelle/HOL je dokazovací asistent, který umožňuje vyjádřit matematické formule ve formálním jazyce a poskytuje nástroje pro dokazování těchto formulí. Hlavní aplikací je formalizace matematických důkazů a zejména formální ověřování, které zahrnuje dokazování správnosti počítačového hardwaru nebo softwaru a dokazování vlastností počítačových jazyků a protokolů._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentace](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq je interaktivní dokazovač teorémů, který umožňuje definovat programy pomocí teorémů a interaktivně generovat strojově kontrolované důkazy správnosti._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentace](https://rocq-prover.org/docs)

### Nástroje založené na symbolickém provádění pro detekci zranitelných vzorů v chytrých kontraktech {#symbolic-execution-tools}

**Manticore** - __Nástroj pro analýzu bajtkódu EVM založený na symbolickém provádění_._

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentace](https://github.com/trailofbits/manticore/wiki)

**hevm** - __hevm je nástroj pro symbolické provádění a kontrolu ekvivalence pro bajtkód EVM.__

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Nástroj pro symbolické provádění k odhalování zranitelností v chytrých kontraktech Etherea_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentace](https://mythril-classic.readthedocs.io/en/develop/)

## Další čtení {#further-reading}

- [Jak funguje formální ověření chytrých kontraktů](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Jak může formální ověření zajistit bezchybné chytré kontrakty](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Přehled projektů formálního ověření v ekosystému Etherea](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [End-to-end formální ověření chytrého kontraktu pro vklad na Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formální ověření nejoblíbenějšího chytrého kontraktu na světě](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker a formální ověření](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
