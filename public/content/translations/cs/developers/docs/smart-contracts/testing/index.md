---
title: "Testování chytrých kontraktů"
description: "Přehled technik a úvah využívaných při testování chytrých kontraktů na Ethereu."
lang: cs
---

Veřejné blockchainy, jako je Ethereum, jsou neměnné, což ztěžuje změnu kódu chytrých kontraktů po nasazení. [Vzory vylepšení kontraktů](/developers/docs/smart-contracts/upgrading/) pro provádění „virtuálních vylepšení“ existují, ale je obtížné je implementovat a vyžadují sociální konsensus. Navíc vylepšení může chybu opravit až po jejím objevení – pokud útočník objeví zranitelnost jako první, je váš chytrý kontrakt vystaven riziku zneužití.

Z těchto důvodů je testování chytrých kontraktů před [nasazením](/developers/docs/smart-contracts/deploying/) na hlavní síť minimálním požadavkem na [zabezpečení](/developers/docs/smart-contracts/security/). Existuje mnoho technik pro testování kontraktů a vyhodnocování správnosti kódu; výběr závisí na vašich potřebách. Nicméně sada testů složená z různých nástrojů a přístupů je ideální pro odhalení menších i větších bezpečnostních chyb v kódu kontraktu.

## Předpoklady {#prerequisites}

Tato stránka vysvětluje, jak testovat chytré kontrakty před nasazením do Etherea. Předpokládá se, že jste obeznámeni s [chytrými kontrakty](/developers/docs/smart-contracts/).

## Co je to testování chytrého kontraktu? Co je testování chytrých kontraktů? {#what-is-smart-contract-testing}

Testování chytrých kontraktů je proces ověřování, zda kód chytrého kontraktu funguje podle očekávání. Testování je užitečné pro kontrolu, zda konkrétní chytrý kontrakt splňuje požadavky na spolehlivost, použitelnost a bezpečnost.

Ačkoli se přístupy liší, většina metod testování vyžaduje spuštění chytrého kontraktu s malým vzorkem dat, který má zpracovávat. Pokud kontrakt poskytuje správné výsledky pro vzorková data, předpokládá se, že funguje správně. Většina testovacích nástrojů poskytuje prostředky pro psaní a provádění [testovacích případů](https://en.m.wikipedia.org/wiki/Test_case) ke kontrole, zda provedení kontraktu odpovídá očekávaným výsledkům.

### Proč je důležité testovat chytré kontrakty? Důležitost testování chytrých kontraktů {#importance-of-testing-smart-contracts}

Vzhledem k tomu, že chytré kontrakty často spravují finanční aktiva vysoké hodnoty, mohou drobné programátorské chyby vést a často vedou k [masivním ztrátám pro uživatele](https://rekt.news/leaderboard/). Důkladné testování vám však může pomoci včas odhalit chyby a problémy v kódu chytrého kontraktu a opravit je ještě před spuštěním na hlavní síti.

V případě objevení chyby je sice možné kontrakt vylepšit, ale vylepšení jsou složitá a při nesprávném postupu mohou [vést k chybám](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Vylepšení kontraktu dále popírá princip neměnnosti a zatěžuje uživatele dalšími předpoklady důvěryhodnosti. Komplexní plán testování kontraktu naopak zmírňuje bezpečnostní rizika a snižuje potřebu provádět po nasazení složité vylepšení logiky.

## Metody testování chytrých kontraktů {#methods-for-testing-smart-contracts}

Metody testování chytrých kontraktů na Ethereu spadají do dvou širokých kategorií: **automatizované testování** a **ruční testování**. Automatizované a ruční testování nabízejí jedinečné výhody a kompromisy, ale můžete je kombinovat a vytvořit tak robustní plán pro analýzu vašich kontraktů.

### Automatizované testování {#automated-testing}

Automatizované testování využívá nástroje, které automaticky kontrolují kód chytrých kontraktů na chyby při provádění. Výhoda automatizovaného testování spočívá v použití [skriptů](https://www.techtarget.com/whatis/definition/script?amp=1), které řídí vyhodnocování funkcionalit kontraktu. Skriptované testy lze naplánovat tak, aby se opakovaně spouštěly s minimálním zásahem člověka, čímž je automatizované testování efektivnější než ruční přístup k testování.

Automatizované testování je užitečné zejména v případech, kdy se testy opakují a jsou časově náročné; je obtížné je provádět ručně; jsou náchylné k lidským chybám; nebo zahrnují hodnocení kritických funkcí kontraktu. Automatizované testovací nástroje ale mohou mít i nevýhody – mohou přehlédnout některé chyby a vygenerovat mnoho [falešně pozitivních výsledků](https://www.contrastsecurity.com/glossary/false-positive). Proto je ideální kombinovat automatizované testování s ručním testováním chytrých kontraktů.

### Ruční testování {#manual-testing}

Ruční testování probíhá za pomoci člověka a zahrnuje postupné provádění jednotlivých testovacích případů v sadě testů při analýze správnosti chytrých kontraktů. To je rozdíl od automatizovaného testování, kdy můžete současně spustit několik izolovaných testů na kontraktu a získat zprávu zobrazující všechny neúspěšné a úspěšné testy.

Ruční testování může provádět jeden člověk podle písemného plánu testování, který zahrnuje různé testovací případy. V rámci ručního testování můžete také nechat více jednotlivců nebo skupin interagovat s chytrým kontraktem po určitou dobu. Testeři porovnají skutečné chování kontraktu s očekávaným chováním a jakýkoli rozdíl označí jako chybu.

Efektivní ruční testování vyžaduje značné zdroje (dovednosti, čas, peníze a úsilí) a je možné, že při provádění testů dojde k přehlédnutí některých chyb v důsledku lidského faktoru. Ruční testování však může být také přínosné – například lidský tester (např. auditor) může pomocí intuice odhalit krajní případy, které by automatizovaný testovací nástroj přehlédl.

## Automatizované testování chytrých kontraktů {#automated-testing-for-smart-contracts}

### Jednotkové testování {#unit-testing-for-smart-contracts}

Jednotkové testování vyhodnocuje funkce kontraktů samostatně a kontroluje, zda každá komponenta funguje správně. Dobré jednotkové testy by měly být jednoduché, rychle spustitelné a měly by poskytovat jasnou představu o tom, co se pokazilo, pokud testy selžou.

Jednotkové testy jsou užitečné pro kontrolu, zda funkce vracejí očekávané hodnoty a zda je úložiště kontraktu po provedení funkce správně aktualizováno. Spuštění jednotkových testů po provedení změn v kódové základně kontraktu navíc zajistí, že přidání nové logiky nezpůsobí chyby. Níže je uvedeno několik pokynů pro efektivní provádění jednotkových testů:

#### Pokyny pro jednotkové testování chytrých kontraktů {#unit-testing-guidelines}

##### 1. Pochopte obchodní logiku a pracovní postupy vašich kontraktů

Před psaním jednotkových testů je dobré vědět, jaké funkce chytrý kontrakt nabízí a jak k nim budou uživatelé přistupovat a používat je. To je užitečné zejména při provádění [testů úspěšného průběhu](https://en.m.wikipedia.org/wiki/Happy_path), které zjišťují, zda funkce v kontraktu vracejí správný výstup pro platné uživatelské vstupy. Tento koncept vysvětlíme na tomto (zkráceném) příkladu [aukčního kontraktu](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Toto je jednoduchý aukční kontrakt určený k přijímání nabídek během přihazovacího období. Pokud se `highestBid` zvýší, předchozí nejvyšší přihazující obdrží zpět své peníze; jakmile nabídkové období skončí, `beneficiary` (příjemce) zavolá kontrakt, aby získal své peníze.

Jednotkové testy pro takový kontrakt by se týkaly různých funkcí, které by uživatel mohl volat při interakci s kontraktem. Příkladem může být jednotkový test, který kontroluje, zda uživatel může zadat nabídku, zatímco aukce probíhá (tj. volání `bid()` je úspěšné), nebo test, který kontroluje, zda uživatel může zadat vyšší nabídku, než je aktuální `highestBid`.

Pochopení provozního pracovního postupu kontraktu také pomáhá při psaní jednotkových testů, které kontrolují, zda provádění splňuje požadavky. Například aukční kontrakt určuje, že uživatelé nemohou podávat nabídky, když aukce skončila (tj. když je `auctionEndTime` menší než `block.timestamp`). Vývojář tak může spustit jednotkový test, který kontroluje, zda volání funkce `bid()` uspěje nebo selže, když aukce skončila (tj. když `auctionEndTime` > `block.timestamp`).

##### 2. Vyhodnoďte všechny předpoklady související se spuštěním kontraktu

Je důležité zdokumentovat všechny předpoklady o provádění kontraktu a napsat jednotkové testy k ověření platnosti těchto předpokladů. Kromě ochrany před neočekávaným spuštěním vás testování tvrzení nutí přemýšlet o operacích, které by mohly narušit bezpečnostní model chytrých kontraktů. Užitečným tipem je jít nad rámec „testů šťastného uživatele“ a napsat negativní testy, které zkontrolují, zda funkce selže při špatných vstupech.

Mnoho frameworků pro jednotkové testy umožňuje vytvářet tvrzení – jednoduché příkazy, které uvádějí, co kontrakt může a co nemůže dělat – a spouštět testy, které zjišťují, zda tato tvrzení platí při provádění. Vývojář, který pracuje na dříve popsaném aukčním kontraktu, může před provedením negativních testů učinit následující tvrzení o jeho chování:

- Uživatelé nemohou podávat nabídky, pokud aukce skončila nebo ještě nezačala.

- Pokud je nabídka pod přijatelnou hranicí, aukční kontrakt vrátí nabídku zpět.

- Uživatelům, kteří aukci nevyhráli, jsou připsány jejich finanční prostředky.

**Poznámka**: Dalším způsobem testování předpokladů je psaní testů, které spouštějí [modifikátory funkcí](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) v kontraktu, zejména příkazy `require`, `assert` a `if…else`.

##### 3. Změřte pokrytí kódu

[Pokrytí kódu](https://en.m.wikipedia.org/wiki/Code_coverage) je metrika testování, která sleduje počet větví, řádků a příkazů ve vašem kódu, které se provedou během testů. Testy by měly mít dobré pokrytí kódu, aby se minimalizovalo riziko netestovaných zranitelností. Bez dostatečného pokrytí se můžete mylně domnívat, že váš kontrakt je bezpečný, protože všechny testy prošly, zatímco v netestovaných cestách kódu stále existují zranitelnosti. Zaznamenání vysokého pokrytí kódu však dává jistotu, že všechny příkazy/funkce v chytrém kontraktu byly dostatečně otestovány z hlediska správnosti.

##### 4. Použijte dobře vyvinuté testovací frameworky

Kvalita nástrojů používaných při spouštění jednotkových testů pro vaše chytré kontrakty je klíčová. Ideální testovací framework je takový, který je pravidelně udržován, poskytuje užitečné funkce (např. funkce protokolování a reportování) a musí být hojně používán a ověřován ostatními vývojáři.

Frameworky jednotkového testování pro chytré kontrakty Solidity existují v různých jazycích (většinou JavaScript, Python a Rust). Informace o tom, jak začít spouštět jednotkové testy s různými testovacími frameworky, najdete v některých z níže uvedených návodů:

- **[Spouštění jednotkových testů s Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Spouštění jednotkových testů s Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Spouštění jednotkových testů s Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Spouštění jednotkových testů s Remixem](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Spouštění jednotkových testů s Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Spouštění jednotkových testů s Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Spouštění jednotkových testů s Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Integrační testování {#integration-testing-for-smart-contracts}

Zatímco jednotkové testy ladí funkce kontraktu izolovaně, integrační testy hodnotí součásti chytrého kontraktu jako celek. Integrační testování může odhalit problémy vyplývající z volání napříč kontrakty nebo interakcí mezi různými funkcemi ve stejném chytrém kontraktu. Integrační testy mohou například pomoci zkontrolovat, zda prvky jako [dědičnost](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) a vkládání závislostí (dependency injection) fungují správně.

Integrační testování je užitečné, pokud váš kontrakt používá modulární architekturu nebo se během provádění propojuje s jinými kontrakty na blockchainu. Jedním ze způsobů provádění integračních testů je [vytvořit větev blockchainu](/glossary/#fork) v určité výšce (pomocí nástroje jako [Forge](https://book.getfoundry.sh/forge/fork-testing) nebo [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) a simulovat interakce mezi vaším kontraktem a nasazenými kontrakty.

Rozvětvený blockchain se bude chovat podobně jako hlavní síť a bude mít účty s přidruženými stavy a zůstatky. Funguje však pouze jako lokální sandboxové vývojové prostředí, což znamená, že například pro transakce nebudete potřebovat skutečné ETH a vaše změny neovlivní skutečný protokol Etherea.

### Testování na základě vlastností {#property-based-testing-for-smart-contracts}

Testování na základě vlastností je proces kontroly, zda chytrý kontrakt splňuje nějakou definovanou vlastnost. Vlastnosti potvrzují skutečnosti o chování kontraktu, které by měly zůstat pravdivé v různých situacích – příkladem vlastnosti chytrého kontraktu může být „Aritmetické operace v kontraktu nikdy nepřetékají ani nepodtékají.“

**Statická analýza** a **dynamická analýza** jsou dvě běžné techniky pro provádění testování na základě vlastností a obě mohou ověřit, že kód programu (v tomto případě chytrého kontraktu) splňuje nějakou předem definovanou vlastnost. Některé nástroje pro testování na základě vlastností obsahují předdefinovaná pravidla o očekávaných vlastnostech kontraktu a kontrolují kód podle těchto pravidel, zatímco jiné umožňují vytvořit vlastní vlastnosti chytrého kontraktu.

#### Statická analýza {#static-analysis}

Statický analyzátor přijímá jako vstup zdrojový kód chytrého kontraktu a na výstupu deklaruje, zda kontrakt splňuje danou vlastnost, či nikoli. Na rozdíl od dynamické analýzy statická analýza nezahrnuje spuštění kontraktu a jeho analýzu z hlediska správnosti. Statická analýza namísto toho uvažuje o všech možných cestách, kterými by se chytrý kontrakt mohl během provádění vydat (tj. zkoumá strukturu zdrojového kódu a zjišťuje, co by to znamenalo pro fungování kontraktu za běhu).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) a [statické testování](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) jsou běžné metody pro provádění statické analýzy kontraktů. Obě vyžadují analýzu nízkoúrovňových reprezentací provádění kontraktu, jako jsou [abstraktní syntaktické stromy](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) a [grafy řízení toku](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/), které jsou výstupem kompilátoru.

Ve většině případů je statická analýza užitečná pro odhalení bezpečnostních problémů, jako je použití nebezpečných konstrukcí, syntaktických chyb nebo porušení kódovacích standardů v kódu kontraktu. Je však známo, že statické analyzátory nejsou obecně spolehlivé při odhalování hlubších zranitelností a mohou produkovat nadměrné množství falešně pozitivních výsledků.

#### Dynamická analýza {#dynamic-analysis}

Dynamická analýza generuje symbolické vstupy (např. v [symbolickém provádění](https://en.m.wikipedia.org/wiki/Symbolic_execution)) nebo konkrétní vstupy (např. ve [fuzzingu](https://owasp.org/www-community/Fuzzing)) do funkcí chytrých kontraktů, aby se zjistilo, zda některá ze stop provádění neporušuje specifické vlastnosti. Tato forma testování na základě vlastností se od jednotkových testů liší tím, že testovací případy pokrývají více situací a generování testovacích případů zajišťuje program.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) je příkladem techniky dynamické analýzy pro ověřování libovolných vlastností v chytrých kontraktech. Fuzzer vyvolává funkce v cílovém kontraktu s náhodnými nebo chybnými variantami definované vstupní hodnoty. Pokud se chytrý kontrakt dostane do chybového stavu (např. do stavu, kdy selže tvrzení), je problém označen a v hlášení jsou uvedeny vstupy, které vedou provádění ke zranitelné cestě.

Fuzzing je užitečný pro vyhodnocení mechanismu ověřování vstupů chytrých kontraktů, protože nesprávné zpracování neočekávaných vstupů může vést k nechtěnému spuštění a nebezpečným účinkům. Tato forma testování na základě vlastností může být ideální z mnoha důvodů:

1. **Psaní testovacích případů, které by pokryly mnoho scénářů, je obtížné.** Test založený na vlastnostech vyžaduje pouze to, abyste definovali chování a rozsah dat, s nimiž se má chování testovat – program automaticky generuje testovací případy na základě definované vlastnosti.

2. **Vaše sada testů nemusí dostatečně pokrývat všechny možné cesty v rámci programu.** I při 100% pokrytí je možné vynechat okrajové případy.

3. **Jednotkové testy prokazují, že se kontrakt provede správně pro vzorová data, ale zůstává neznámé, zda se provede správně pro vstupy mimo vzorek.** Testy založené na vlastnostech provádějí cílový kontrakt s více variantami dané vstupní hodnoty, aby našly stopy provádění, které způsobují selhání tvrzení. Test vlastností tak poskytuje více záruk, že se kontrakt provede správně pro širokou třídu vstupních dat.

### Pokyny pro provádění testování na základě vlastností pro chytré kontrakty {#running-property-based-tests}

Provádění testování založeného na vlastnostech obvykle začíná definováním vlastnosti (např. absence [celočíselného přetečení](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) nebo souboru vlastností, které chcete v chytrém kontraktu ověřit. Při psaní testů vlastností může být také nutné definovat rozsah hodnot, ve kterém může program generovat data pro vstupy transakcí.

Po správné konfiguraci bude nástroj pro testování vlastností vykonávat funkce vašich chytrých kontraktů s náhodně vygenerovanými vstupy. Pokud dojde k porušení tvrzení, měla by se zobrazit zpráva s konkrétními vstupními daty, která porušují vyhodnocovanou vlastnost. Podívejte se na některé z níže uvedených návodů, které vám pomohou začít s testováním na základě vlastností pomocí různých nástrojů:

- **[Statická analýza chytrých kontraktů pomocí Slither](https://github.com/crytic/slither)**
- **[Statická analýza chytrých kontraktů pomocí Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Testování na základě vlastností s Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing kontraktů s Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing kontraktů s Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing kontraktů s Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Symbolické provádění chytrých kontraktů s Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Symbolické provádění chytrých kontraktů s Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Ruční testování chytrých kontraktů {#manual-testing-for-smart-contracts}

Ruční testování chytrých kontraktů často přichází na řadu později ve vývojovém cyklu po spuštění automatických testů. Tato forma testování hodnotí chytrý kontrakt jako jeden plně integrovaný produkt a zjišťuje, zda funguje tak, jak je uvedeno v technických požadavcích.

### Testování kontraktů na lokálním blockchainu {#testing-on-local-blockchain}

Přestože automatizované testování prováděné v lokálním vývojovém prostředí může poskytnout užitečné informace pro ladění, budete chtít vědět, jak se váš chytrý kontrakt chová v produkčním prostředí. Nasazení do hlavního řetězce Etherea je však spojeno s poplatky za palivo – nemluvě o tom, že vy nebo vaši uživatelé můžete přijít o skutečné peníze, pokud má váš chytrý kontrakt stále chyby.

Testování vašeho kontraktu na lokálním blockchainu (známém také jako [vývojová síť](/developers/docs/development-networks/)) je doporučenou alternativou k testování na hlavní síti. Lokální blockchain je kopie blockchainu Etherea spuštěná lokálně na vašem počítači, která simuluje chování exekuční vrstvy Etherea. Proto můžete naprogramovat transakce pro interakci s kontraktem, aniž byste museli vynaložit značné režijní náklady.

Spuštění kontraktů na lokálním blockchainu by mohlo být užitečné jako forma ručního integračního testování. [Chytré kontrakty jsou vysoce skládatelné](/developers/docs/smart-contracts/composability/), což vám umožňuje integraci se stávajícími protokoly – stále ale budete muset zajistit, že takové složité interakce na blockchainu přinesou správné výsledky.

[Více o vývojových sítích.](/developers/docs/development-networks/)

### Testování kontraktů na testnetech {#testing-contracts-on-testnets}

Testovací síť neboli testnet funguje přesně jako hlavní síť Ethereum s tím rozdílem, že používá ether (ETH) bez reálné hodnoty. Nasazení vašeho kontraktu na [testnet](/developers/docs/networks/#ethereum-testnets) znamená, že s ním může kdokoli interagovat (např. prostřednictvím frontendu dapps), aniž by riskoval finanční prostředky.

Tato forma ručního testování je užitečná pro vyhodnocení komplexního toku aplikace z pohledu uživatele. Zde mohou beta testeři také provádět zkušební provoz a hlásit případné problémy s obchodní logikou a celkovou funkčností kontraktu.

Nasazení v testovací síti po testování na lokálním blockchainu je ideální, protože první z nich je blíže chování virtuálního stroje Etherea. Proto je u mnoha projektů založených na Ethereu běžné nasazovat dappky v testovacích sítích, aby bylo možné vyhodnotit fungování chytrých kontraktů v reálných podmínkách.

[Více o testnetech Etherea.](/developers/docs/development-networks/#public-beacon-testchains)

## Testování vs. formální ověřování {#testing-vs-formal-verification}

Testování sice pomáhá potvrdit, že kontrakt vrací očekávané výsledky pro některé datové vstupy, ale nemůže jednoznačně prokázat totéž pro vstupy, které nebyly během testů použity. Testování chytrého kontraktu proto nemůže zaručit "funkční správnost" (tj. nemůže ukázat, že se program chová tak, jak je požadováno pro _všechny_ sady vstupních hodnot).

Formální ověřování je přístup k posuzování správnosti softwaru pomocí kontroly, zda formální model programu odpovídá formální specifikaci. Formální model je abstraktní matematická reprezentace programu, zatímco formální specifikace definuje vlastnosti programu (tj. logická tvrzení o provádění programu).

Protože vlastnosti jsou zapsány v matematických termínech, je možné ověřit, zda formální (matematický) model systému splňuje specifikaci pomocí logických pravidel odvozování. Proto se říká, že formální ověřovací nástroje vytvářejí „matematický důkaz“ správnosti systému.

Na rozdíl od testování lze formální ověřování použít k ověření, že provádění chytrého kontraktu splňuje formální specifikaci pro _všechna_ provádění (tj. že nemá žádné chyby), aniž by bylo nutné jej provádět se vzorovými daty. Nejenže se tím zkrátí čas strávený spouštěním desítek jednotkových testů, ale je to také účinnější při odhalování skrytých zranitelností. Formální ověřovací techniky se přitom pohybují v různém spektru v závislosti na obtížnosti jejich implementace a užitečnosti.

[Více o formálním ověřování chytrých kontraktů.](/developers/docs/smart-contracts/formal-verification)

## Testování vs. audity a odměny za nalezení chyb {#testing-vs-audits-bug-bounties}

Jak již bylo zmíněno, důsledné testování může jen zřídka zaručit, že kontrakt neobsahuje chyby; formální ověřovací přístupy mohou poskytnout silnější záruky správnosti, ale v současné době je obtížné je používat a jsou s nimi spojeny značné náklady.

Přesto můžete možnost odhalení zranitelností kontraktu ještě zvýšit tím, že si necháte provést nezávislou revizi kódu. [Audity chytrých kontraktů](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) a [odměny za nalezení chyb](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) (bug bounties) jsou dva způsoby, jak přimět ostatní, aby analyzovali vaše kontrakty.

Audity provádějí auditoři, kteří mají zkušenosti s odhalováním bezpečnostních nedostatků a špatných vývojových postupů v chytrých kontraktech. Audit obvykle zahrnuje testování (a případně formální ověření) a ruční kontrolu celé kódové základny.

Naopak, program odměn za nalezení chyb (bug bounty) obvykle zahrnuje nabídku finanční odměny jednotlivci (běžně označovanému jako [whitehat hacker](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))), který objeví zranitelnost v chytrém kontraktu a oznámí ji vývojářům. Odměny za vyřešení chyb jsou podobné auditům, protože zahrnují žádost ostatních, aby pomohli najít chyby v chytrých kontraktech.

Hlavní rozdíl spočívá v tom, že programy odměn za vyřešení chyb jsou otevřené širší komunitě vývojářů/hackerů a přitahují širokou skupinu etických hackerů a nezávislých bezpečnostních odborníků s jedinečnými dovednostmi a zkušenostmi. To může být výhoda oproti auditům chytrých kontraktů, které se spoléhají především na týmy, které mohou mít omezené nebo úzké odborné znalosti.

## Nástroje a knihovny pro testování {#testing-tools-and-libraries}

### Nástroje pro jednotkové testování {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** – _Nástroj pro pokrytí kódu chytrých kontraktů napsaných v Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** – _Framework pro pokročilý vývoj a testování chytrých kontraktů (založený na ethers.js)._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Nástroj pro testování chytrých kontraktů v Solidity._ Pracuje pod pluginem „Solidity Unit Testing“ v prostředí Remix IDE, který se používá k psaní a spouštění testovacích případů pro kontrakt._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** – _Knihovna tvrzení pro testování chytrých kontraktů na Ethereu._ Ujistěte se, že se vaše kontrakty chovají podle očekávání!_

- **[Framework pro jednotkové testování Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** – _Brownie využívá Pytest, testovací framework s bohatými funkcemi, který vám umožní psát malé testy s minimálním kódem, dobře se škáluje pro velké projekty a je vysoce rozšiřitelný._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** – _Foundry nabízí Forge, rychlý a flexibilní framework pro testování na Ethereu, který je schopen provádět jednoduché jednotkové testy, kontroly optimalizace paliva a fuzzing kontraktů._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** – _Framework pro testování chytrých kontraktů založený na ethers.js, Mocha a Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** – _Vývojový a testovací framework založený na Pythonu pro chytré kontrakty cílící na Ethereum Virtual Machine (EVM)._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** – _Framework založený na Pythonu pro jednotkové testování a fuzzing se silnými možnostmi ladění a podporou testování napříč řetězci, využívající pytest a Anvil pro nejlepší uživatelský zážitek a výkon._

### Nástroje pro testování na základě vlastností {#property-based-testing-tools}

#### Nástroje pro statickou analýzu {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** – _Framework pro statickou analýzu Solidity založený na Pythonu pro hledání zranitelností, zlepšení srozumitelnosti kódu a psaní vlastních analýz pro chytré kontrakty._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** – _Linter pro vynucování stylu a osvědčených postupů zabezpečení pro programovací jazyk chytrých kontraktů Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** – _Statický analyzátor založený na Rustu speciálně navržený pro zabezpečení a vývoj chytrých kontraktů Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** – _Framework pro statickou analýzu založený na Pythonu s detektory zranitelností a kvality kódu, tiskárnami pro extrahování užitečných informací z kódu a podporou pro psaní vlastních submodulů._

- **[Slippy](https://github.com/fvictorio/slippy)** – _Jednoduchý a výkonný linter pro Solidity._

#### Nástroje pro dynamickou analýzu {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** – _Rychlý fuzzer kontraktů pro detekci zranitelností v chytrých kontraktech pomocí testování založeného na vlastnostech._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** – _Automatizovaný nástroj pro fuzzing užitečný pro detekci porušení vlastností v kódu chytrého kontraktu._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** – _Dynamický framework pro symbolické provádění pro analýzu bytekódu EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** – _Nástroj pro hodnocení bytekódu EVM pro detekci zranitelností kontraktů pomocí taint analýzy, konkolické analýzy a kontroly toku řízení._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** – _Scribble je specifikační jazyk a runtime ověřovací nástroj, který umožňuje anotovat chytré kontrakty vlastnostmi, které umožňují automatické testování kontraktů pomocí nástrojů, jako je Diligence Fuzzing nebo MythX._

## Související návody {#related-tutorials}

- [Přehled a srovnání různých testovacích produktů](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Jak používat Echidnu k testování chytrých kontraktů](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Jak používat Manticore k nalezení chyb v chytrých kontraktech](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Jak používat Slither k nalezení chyb v chytrých kontraktech](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jak mockovat kontrakty v Solidity pro účely testování](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Jak spouštět jednotkové testy v Solidity pomocí Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Další čtení {#further-reading}

- [Podrobný průvodce testováním chytrých kontraktů na Ethereu](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Jak testovat chytré kontrakty na Ethereu](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Průvodce jednotkovým testováním pro vývojáře od MolochDAO](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Jak testovat chytré kontrakty jako rocková hvězda](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
