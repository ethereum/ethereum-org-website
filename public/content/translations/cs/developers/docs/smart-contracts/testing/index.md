---
title: "Testování chytrých kontraktů"
description: "Přehled technik a úvah pro testování chytrých kontraktů na Ethereu."
lang: cs
---

Veřejné blockchainy jako Ethereum jsou neměnné, což ztěžuje změnu kódu chytrého kontraktu po jeho nasazení. Existují [vzory pro aktualizaci kontraktů](/developers/docs/smart-contracts/upgrading/) k provádění „virtuálních aktualizací“, ale ty se obtížně implementují a vyžadují sociální konsensus. Navíc aktualizace může opravit chybu pouze _poté_, co je objevena – pokud zranitelnost objeví jako první útočník, váš chytrý kontrakt je vystaven riziku zneužití.

Z těchto důvodů je testování chytrých kontraktů před [nasazením](/developers/docs/smart-contracts/deploying/) na Mainnet minimálním požadavkem na [bezpečnost](/developers/docs/smart-contracts/security/). Existuje mnoho technik pro testování kontraktů a vyhodnocování správnosti kódu; to, co si vyberete, závisí na vašich potřebách. Nicméně testovací sada složená z různých nástrojů a přístupů je ideální pro zachycení jak drobných, tak závažných bezpečnostních chyb v kódu kontraktu.

## Předpoklady {#prerequisites}

Tato stránka vysvětluje, jak testovat chytré kontrakty před nasazením v síti Ethereum. Předpokládá, že jste obeznámeni s [chytrými kontrakty](/developers/docs/smart-contracts/).

## Co je testování chytrých kontraktů? {#what-is-smart-contract-testing}

Testování chytrých kontraktů je proces ověřování, že kód chytrého kontraktu funguje podle očekávání. Testování je užitečné pro kontrolu, zda konkrétní chytrý kontrakt splňuje požadavky na spolehlivost, použitelnost a bezpečnost.

Ačkoli se přístupy liší, většina testovacích metod vyžaduje spuštění chytrého kontraktu s malým vzorkem dat, která má zpracovávat. Pokud kontrakt produkuje správné výsledky pro vzorová data, předpokládá se, že funguje správně. Většina testovacích nástrojů poskytuje prostředky pro psaní a spouštění [testovacích případů](https://en.m.wikipedia.org/wiki/Test_case), aby se zkontrolovalo, zda provádění kontraktu odpovídá očekávaným výsledkům.

### Proč je důležité testovat chytré kontrakty? {#importance-of-testing-smart-contracts}

Vzhledem k tomu, že chytré kontrakty často spravují finanční aktiva vysoké hodnoty, drobné programátorské chyby mohou vést a často vedou k [masivním ztrátám pro uživatele](https://rekt.news/leaderboard/). Důkladné testování vám však může pomoci včas odhalit defekty a problémy v kódu chytrého kontraktu a opravit je před spuštěním na Mainnetu.

I když je možné kontrakt aktualizovat, pokud je objevena chyba, aktualizace jsou složité a při nesprávném zacházení mohou [vést k chybám](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Aktualizace kontraktu dále popírá princip neměnnosti a zatěžuje uživatele dalšími předpoklady důvěry. Naopak komplexní plán testování vašeho kontraktu zmírňuje bezpečnostní rizika chytrých kontraktů a snižuje potřebu provádět složité aktualizace logiky po nasazení.

## Metody testování chytrých kontraktů {#methods-for-testing-smart-contracts}

Metody testování chytrých kontraktů na Ethereu spadají do dvou širokých kategorií: **automatizované testování** a **manuální testování**. Automatizované testování a manuální testování nabízejí jedinečné výhody a kompromisy, ale můžete je zkombinovat a vytvořit tak robustní plán pro analýzu vašich kontraktů.

### Automatizované testování {#automated-testing}

Automatizované testování využívá nástroje, které automaticky kontrolují kód chytrého kontraktu na chyby při provádění. Výhoda automatizovaného testování spočívá v použití [skriptů](https://www.techtarget.com/whatis/definition/script?amp=1) k řízení vyhodnocování funkcionalit kontraktu. Skriptované testy lze naplánovat tak, aby se spouštěly opakovaně s minimálním zásahem člověka, což činí automatizované testování efektivnějším než manuální přístupy k testování.

Automatizované testování je obzvláště užitečné, když jsou testy opakující se a časově náročné; obtížně proveditelné manuálně; náchylné k lidské chybě; nebo zahrnují vyhodnocování kritických funkcí kontraktu. Nástroje pro automatizované testování však mohou mít nevýhody – mohou přehlédnout určité chyby a produkovat mnoho [falešně pozitivních výsledků](https://www.contrastsecurity.com/glossary/false-positive). Proto je ideální spojit automatizované testování s manuálním testováním chytrých kontraktů.

### Manuální testování {#manual-testing}

Manuální testování probíhá za pomoci člověka a zahrnuje spouštění každého testovacího případu ve vaší testovací sadě jeden po druhém při analýze správnosti chytrého kontraktu. To se liší od automatizovaného testování, kde můžete současně spustit více izolovaných testů na kontraktu a získat zprávu zobrazující všechny neúspěšné a úspěšné testy.

Manuální testování může provádět jednotlivec podle písemného plánu testování, který pokrývá různé testovací scénáře. Můžete také nechat více jednotlivců nebo skupin interagovat s chytrým kontraktem po stanovenou dobu v rámci manuálního testování. Testeři porovnají skutečné chování kontraktu s očekávaným chováním a jakýkoli rozdíl označí jako chybu.

Efektivní manuální testování vyžaduje značné zdroje (dovednosti, čas, peníze a úsilí) a je možné – kvůli lidské chybě – přehlédnout určité chyby při provádění testů. Manuální testování však může být také přínosné – například lidský tester (např. auditor) může použít intuici k odhalení okrajových případů, které by nástroj pro automatizované testování přehlédl.

## Automatizované testování chytrých kontraktů {#automated-testing-for-smart-contracts}

### Jednotkové testování {#unit-testing-for-smart-contracts}

Jednotkové testování vyhodnocuje funkce kontraktu odděleně a kontroluje, zda každá komponenta funguje správně. Dobré jednotkové testy by měly být jednoduché, rychlé na spuštění a měly by poskytnout jasnou představu o tom, co se pokazilo, pokud testy selžou.

Jednotkové testy jsou užitečné pro kontrolu, zda funkce vracejí očekávané hodnoty a zda se úložiště kontraktu po provedení funkce správně aktualizuje. Navíc spouštění jednotkových testů po provedení změn v kódové základně kontraktu zajišťuje, že přidání nové logiky nezanese chyby. Níže jsou uvedeny některé pokyny pro spouštění efektivních jednotkových testů:

#### Pokyny pro jednotkové testování chytrých kontraktů {#unit-testing-guidelines}

##### 1. Porozumějte obchodní logice a pracovnímu postupu vašeho kontraktu

Před psaním jednotkových testů pomáhá vědět, jaké funkcionality chytrý kontrakt nabízí a jak budou uživatelé k těmto funkcím přistupovat a používat je. To je obzvláště užitečné pro spouštění [testů šťastné cesty (happy path)](https://en.m.wikipedia.org/wiki/Happy_path), které určují, zda funkce v kontraktu vracejí správný výstup pro platné uživatelské vstupy. Tento koncept vysvětlíme na tomto (zkráceném) příkladu [aukčního kontraktu](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Toto je jednoduchý aukční kontrakt navržený k přijímání nabídek během období pro podávání nabídek. Pokud se `highestBid` zvýší, předchozí zájemce s nejvyšší nabídkou dostane své peníze zpět; jakmile období pro podávání nabídek skončí, `beneficiary` zavolá kontrakt, aby získal své peníze.

Jednotkové testy pro takový kontrakt by pokrývaly různé funkce, které by uživatel mohl zavolat při interakci s kontraktem. Příkladem by byl jednotkový test, který kontroluje, zda uživatel může podat nabídku, zatímco aukce probíhá (tj. volání `bid()` jsou úspěšná), nebo test, který kontroluje, zda uživatel může podat vyšší nabídku, než je aktuální `highestBid`.

Porozumění provoznímu pracovnímu postupu kontraktu také pomáhá při psaní jednotkových testů, které kontrolují, zda provádění splňuje požadavky. Například aukční kontrakt specifikuje, že uživatelé nemohou podávat nabídky, když aukce skončila (tj. když je `auctionEndTime` nižší než `block.timestamp`). Vývojář by tedy mohl spustit jednotkový test, který kontroluje, zda volání funkce `bid()` uspějí nebo selžou, když aukce skončí (tj. když `auctionEndTime` > `block.timestamp`).

##### 2. Vyhodnoťte všechny předpoklady související s prováděním kontraktu

Je důležité zdokumentovat jakékoli předpoklady o provádění kontraktu a napsat jednotkové testy k ověření platnosti těchto předpokladů. Kromě toho, že testování asertů nabízí ochranu proti neočekávanému provádění, nutí vás přemýšlet o operacích, které by mohly narušit bezpečnostní model chytrého kontraktu. Užitečným tipem je jít nad rámec „testů šťastného uživatele“ a napsat negativní testy, které kontrolují, zda funkce selže při nesprávných vstupech.

Mnoho frameworků pro jednotkové testování umožňuje vytvářet aserty – jednoduchá prohlášení, která uvádějí, co kontrakt může a nemůže dělat – a spouštět testy, aby se zjistilo, zda tyto aserty platí při provádění. Vývojář pracující na dříve popsaném aukčním kontraktu by mohl před spuštěním negativních testů učinit následující aserty o jeho chování:

- Uživatelé nemohou podávat nabídky, když aukce skončila nebo ještě nezačala.

- Aukční kontrakt se vrátí (revert), pokud je nabídka pod přijatelnou prahovou hodnotou.

- Uživatelům, kteří nevyhrají nabídku, jsou připsány jejich prostředky.

**Poznámka**: Dalším způsobem testování předpokladů je psaní testů, které spouštějí [modifikátory funkcí](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) v kontraktu, zejména příkazy `require`, `assert` a `if…else`.

##### 3. Měřte pokrytí kódu

[Pokrytí kódu](https://en.m.wikipedia.org/wiki/Code_coverage) je metrika testování, která sleduje počet větví, řádků a příkazů ve vašem kódu provedených během testů. Testy by měly mít dobré pokrytí kódu, aby se minimalizovalo riziko netestovaných zranitelností. Bez dostatečného pokrytí byste mohli mylně předpokládat, že je váš kontrakt bezpečný, protože všechny testy projdou, zatímco zranitelnosti stále existují v netestovaných cestách kódu. Zaznamenání vysokého pokrytí kódu však dává jistotu, že všechny příkazy/funkce v chytrém kontraktu byly dostatečně otestovány na správnost.

##### 4. Používejte dobře vyvinuté testovací frameworky

Kvalita nástrojů používaných při spouštění jednotkových testů pro vaše chytré kontrakty je klíčová. Ideální testovací framework je ten, který je pravidelně udržován; poskytuje užitečné funkce (např. možnosti protokolování a reportování); a musí být rozsáhle používán a prověřen ostatními vývojáři.

Frameworky pro jednotkové testování chytrých kontraktů v Solidity jsou k dispozici v různých jazycích (většinou JavaScript, Python a Rust). Podívejte se na některé z níže uvedených průvodců, kde najdete informace o tom, jak začít spouštět jednotkové testy s různými testovacími frameworky:

- **[Spouštění jednotkových testů pomocí Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Spouštění jednotkových testů pomocí Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Spouštění jednotkových testů pomocí Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Spouštění jednotkových testů pomocí Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Spouštění jednotkových testů pomocí Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Spouštění jednotkových testů pomocí Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Spouštění jednotkových testů pomocí Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Integrační testování {#integration-testing-for-smart-contracts}

Zatímco jednotkové testování ladí funkce kontraktu izolovaně, integrační testy vyhodnocují komponenty chytrého kontraktu jako celek. Integrační testování může odhalit problémy vyplývající z meziřetězcových volání nebo interakcí mezi různými funkcemi ve stejném chytrém kontraktu. Integrační testy mohou například pomoci zkontrolovat, zda věci jako [dědičnost](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) a vkládání závislostí (dependency injection) fungují správně.

Integrační testování je užitečné, pokud váš kontrakt přijímá modulární architekturu nebo se během provádění propojuje s jinými onchain kontrakty. Jedním ze způsobů spouštění integračních testů je [fork blockchainu](/glossary/#fork) v určité výšce (pomocí nástroje jako [Forge](https://book.getfoundry.sh/forge/fork-testing) nebo [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) a simulace interakcí mezi vaším kontraktem a nasazenými kontrakty.

Forknutý blockchain se bude chovat podobně jako Mainnet a bude mít účty s přidruženými stavy a zůstatky. Funguje však pouze jako izolované lokální vývojové prostředí (sandbox), což znamená, že například nebudete potřebovat skutečné ETH pro transakce, ani vaše změny neovlivní skutečný protokol Ethereum.

### Testování založené na vlastnostech (Property-based testing) {#property-based-testing-for-smart-contracts}

Testování založené na vlastnostech je proces kontroly, zda chytrý kontrakt splňuje nějakou definovanou vlastnost. Vlastnosti asertují fakta o chování kontraktu, u kterých se očekává, že zůstanou pravdivá v různých scénářích – příkladem vlastnosti chytrého kontraktu by mohlo být „Aritmetické operace v kontraktu nikdy nezpůsobí přetečení nebo podtečení.“

**Statická analýza** a **dynamická analýza** jsou dvě běžné techniky pro provádění testování založeného na vlastnostech a obě mohou ověřit, že kód programu (v tomto případě chytrého kontraktu) splňuje nějakou předdefinovanou vlastnost. Některé nástroje pro testování založené na vlastnostech přicházejí s předdefinovanými pravidly o očekávaných vlastnostech kontraktu a kontrolují kód podle těchto pravidel, zatímco jiné umožňují vytvářet vlastní vlastnosti pro chytrý kontrakt.

#### Statická analýza {#static-analysis}

Statický analyzátor bere jako vstup zdrojový kód chytrého kontraktu a vydává výsledky deklarující, zda kontrakt splňuje vlastnost či nikoli. Na rozdíl od dynamické analýzy statická analýza nezahrnuje spuštění kontraktu za účelem analýzy jeho správnosti. Statická analýza místo toho uvažuje o všech možných cestách, kterými by se chytrý kontrakt mohl během provádění vydat (tj. zkoumáním struktury zdrojového kódu, aby se určilo, co by to znamenalo pro provoz kontraktu za běhu).

[Lintování](https://www.perforce.com/blog/qac/what-is-linting) a [statické testování](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) jsou běžné metody pro spouštění statické analýzy na kontraktech. Obě vyžadují analýzu nízkoúrovňových reprezentací provádění kontraktu, jako jsou [abstraktní syntaktické stromy](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) a [grafy toku řízení](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) na výstupu kompilátoru.

Ve většině případů je statická analýza užitečná pro detekci bezpečnostních problémů, jako je použití nebezpečných konstrukcí, syntaktické chyby nebo porušení standardů kódování v kódu kontraktu. Je však známo, že statické analyzátory jsou obecně nespolehlivé při detekci hlubších zranitelností a mohou produkovat nadměrné množství falešně pozitivních výsledků.

#### Dynamická analýza {#dynamic-analysis}

Dynamická analýza generuje symbolické vstupy (např. při [symbolickém provádění](https://en.m.wikipedia.org/wiki/Symbolic_execution)) nebo konkrétní vstupy (např. při [fuzzingu](https://owasp.org/www-community/Fuzzing)) do funkcí chytrého kontraktu, aby se zjistilo, zda nějaká stopa provádění neporušuje specifické vlastnosti. Tato forma testování založeného na vlastnostech se liší od jednotkových testů v tom, že testovací případy pokrývají více scénářů a program se stará o generování testovacích případů.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) je příkladem techniky dynamické analýzy pro ověřování libovolných vlastností v chytrých kontraktech. Fuzzer vyvolává funkce v cílovém kontraktu s náhodnými nebo poškozenými variacemi definované vstupní hodnoty. Pokud chytrý kontrakt vstoupí do chybového stavu (např. takového, kde selže asert), problém je označen a vstupy, které vedou provádění směrem ke zranitelné cestě, jsou vygenerovány ve zprávě.

Fuzzing je užitečný pro vyhodnocení mechanismu validace vstupů chytrého kontraktu, protože nesprávné zacházení s neočekávanými vstupy by mohlo vést k nezamýšlenému provedení a vyvolat nebezpečné účinky. Tato forma testování založeného na vlastnostech může být ideální z mnoha důvodů:

1. **Psaní testovacích případů k pokrytí mnoha scénářů je obtížné.** Test vlastností vyžaduje pouze to, abyste definovali chování a rozsah dat, se kterými se má chování testovat – program automaticky generuje testovací případy na základě definované vlastnosti.

2. **Vaše testovací sada nemusí dostatečně pokrývat všechny možné cesty v rámci programu.** I při 100% pokrytí je možné přehlédnout okrajové případy.

3. **Jednotkové testy dokazují, že se kontrakt provádí správně pro vzorová data, ale zda se kontrakt provádí správně pro vstupy mimo vzorek, zůstává neznámé.** Testy vlastností spouštějí cílový kontrakt s více variacemi dané vstupní hodnoty, aby našly stopy provádění, které způsobují selhání asertů. Test vlastností tak poskytuje více záruk, že se kontrakt provádí správně pro širokou třídu vstupních dat.

### Pokyny pro spouštění testování založeného na vlastnostech pro chytré kontrakty {#running-property-based-tests}

Spuštění testování založeného na vlastnostech obvykle začíná definováním vlastnosti (např. absence [přetečení celých čísel](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) nebo kolekce vlastností, které chcete v chytrém kontraktu ověřit. Při psaní testů vlastností možná budete muset také definovat rozsah hodnot, v rámci kterého může program generovat data pro vstupy transakcí.

Po správném nakonfigurování nástroj pro testování vlastností spustí funkce vašeho chytrého kontraktu s náhodně generovanými vstupy. Pokud dojde k jakémukoli porušení asertů, měli byste získat zprávu s konkrétními vstupními daty, která porušují vyhodnocovanou vlastnost. Podívejte se na některé z níže uvedených průvodců, abyste mohli začít se spouštěním testování založeného na vlastnostech pomocí různých nástrojů:

- **[Statická analýza chytrých kontraktů pomocí Slither](https://github.com/crytic/slither)**
- **[Statická analýza chytrých kontraktů pomocí Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Testování založené na vlastnostech pomocí Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing kontraktů pomocí Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing kontraktů pomocí Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing kontraktů pomocí Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Symbolické provádění chytrých kontraktů pomocí Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Symbolické provádění chytrých kontraktů pomocí Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Manuální testování chytrých kontraktů {#manual-testing-for-smart-contracts}

Manuální testování chytrých kontraktů často přichází později ve vývojovém cyklu po spuštění automatizovaných testů. Tato forma testování vyhodnocuje chytrý kontrakt jako jeden plně integrovaný produkt, aby se zjistilo, zda funguje tak, jak je specifikováno v technických požadavcích.

### Testování kontraktů na lokálním blockchainu {#testing-on-local-blockchain}

Zatímco automatizované testování prováděné v lokálním vývojovém prostředí může poskytnout užitečné informace pro ladění, budete chtít vědět, jak se váš chytrý kontrakt chová v produkčním prostředí. Nasazení do hlavního řetězce Etherea však s sebou nese poplatky za gas – nemluvě o tom, že vy nebo vaši uživatelé můžete přijít o skutečné peníze, pokud má váš chytrý kontrakt stále chyby.

Testování vašeho kontraktu na lokálním blockchainu (známém také jako [vývojová síť](/developers/docs/development-networks/)) je doporučenou alternativou k testování na Mainnetu. Lokální blockchain je kopie blockchainu Etherea běžící lokálně na vašem počítači, která simuluje chování exekuční vrstvy Etherea. Jako takový můžete programovat transakce pro interakci s kontraktem, aniž by vám vznikly významné režijní náklady.

Spouštění kontraktů na lokálním blockchainu by mohlo být užitečné jako forma manuálního integračního testování. [Chytré kontrakty jsou vysoce komponovatelné](/developers/docs/smart-contracts/composability/), což vám umožňuje integrovat se se stávajícími protokoly – stále však budete muset zajistit, aby takové složité onchain interakce produkovaly správné výsledky.

[Více o vývojových sítích.](/developers/docs/development-networks/)

### Testování kontraktů na testnetech {#testing-contracts-on-testnets}

Testovací síť neboli testnet funguje přesně jako Ethereum Mainnet, s tím rozdílem, že používá ether (ETH) bez reálné hodnoty. Nasazení vašeho kontraktu na [testnet](/developers/docs/networks/#ethereum-testnets) znamená, že s ním může kdokoli interagovat (např. prostřednictvím frontendu dapp) bez ohrožení finančních prostředků.

Tato forma manuálního testování je užitečná pro vyhodnocení end-to-end toku vaší aplikace z pohledu uživatele. Zde mohou beta testeři také provádět zkušební běhy a hlásit jakékoli problémy s obchodní logikou a celkovou funkčností kontraktu.

Nasazení na testnet po testování na lokálním blockchainu je ideální, protože to první se více blíží chování Ethereum Virtual Machine. Proto je běžné, že mnoho projektů nativních pro Ethereum nasazuje dapps na testnety, aby vyhodnotily provoz chytrých kontraktů v reálných podmínkách.

[Více o testnetech Etherea.](/developers/docs/development-networks/#public-beacon-testchains)

## Testování vs. formální verifikace {#testing-vs-formal-verification}

Zatímco testování pomáhá potvrdit, že kontrakt vrací očekávané výsledky pro některé datové vstupy, nemůže průkazně dokázat totéž pro vstupy, které nebyly během testů použity. Testování chytrého kontraktu proto nemůže zaručit „funkční správnost“ (tj. nemůže ukázat, že se program chová podle požadavků pro _všechny_ sady vstupních hodnot).

Formální verifikace je přístup k posuzování správnosti softwaru kontrolou, zda formální model programu odpovídá formální specifikaci. Formální model je abstraktní matematická reprezentace programu, zatímco formální specifikace definuje vlastnosti programu (tj. logické aserty o provádění programu).

Protože jsou vlastnosti zapsány v matematických termínech, je možné ověřit, že formální (matematický) model systému splňuje specifikaci pomocí logických pravidel odvozování. O nástrojích pro formální verifikaci se tedy říká, že produkují „matematický důkaz“ správnosti systému.

Na rozdíl od testování lze formální verifikaci použít k ověření, že provádění chytrého kontraktu splňuje formální specifikaci pro _všechna_ provádění (tj. nemá žádné chyby), aniž by bylo nutné jej spouštět se vzorovými daty. Nejenže to zkracuje čas strávený spouštěním desítek jednotkových testů, ale je to také efektivnější při zachycování skrytých zranitelností. Přesto techniky formální verifikace leží na spektru v závislosti na jejich obtížnosti implementace a užitečnosti.

[Více o formální verifikaci pro chytré kontrakty.](/developers/docs/smart-contracts/formal-verification)

## Testování vs. audity a programy bug bounty {#testing-vs-audits-bug-bounties}

Jak již bylo zmíněno, důkladné testování může jen zřídka zaručit absenci chyb v kontraktu; přístupy formální verifikace mohou poskytnout silnější záruky správnosti, ale v současné době se obtížně používají a přinášejí značné náklady.

Přesto můžete dále zvýšit možnost zachycení zranitelností kontraktu tím, že získáte nezávislou kontrolu kódu. [Audity chytrých kontraktů](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) a [programy bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) jsou dva způsoby, jak přimět ostatní, aby analyzovali vaše kontrakty.

Audity provádějí auditoři zkušení v hledání případů bezpečnostních chyb a špatných vývojových postupů v chytrých kontraktech. Audit obvykle zahrnuje testování (a případně formální verifikaci) a také manuální kontrolu celé kódové základny.

Naopak program bug bounty obvykle zahrnuje nabídku finanční odměny jednotlivci (běžně označovanému jako [whitehat hackeři](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) který objeví zranitelnost v chytrém kontraktu a odhalí ji vývojářům. Programy bug bounty jsou podobné auditům, protože zahrnují žádost ostatních o pomoc při hledání defektů v chytrých kontraktech.

Hlavním rozdílem je, že programy bug bounty jsou otevřené širší komunitě vývojářů/hackerů a přitahují širokou třídu etických hackerů a nezávislých bezpečnostních profesionálů s jedinečnými dovednostmi a zkušenostmi. To může být výhodou oproti auditům chytrých kontraktů, které se spoléhají hlavně na týmy, jež mohou mít omezené nebo úzké odborné znalosti.

## Testovací nástroje a knihovny {#testing-tools-and-libraries}

### Nástroje pro jednotkové testování {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Nástroj pro pokrytí kódu pro chytré kontrakty napsané v Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework pro pokročilý vývoj a testování chytrých kontraktů (založený na Ethers.js)_._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Nástroj pro testování chytrých kontraktů v Solidity. Funguje pod pluginem Remix IDE „Solidity Unit Testing“, který se používá k psaní a spouštění testovacích případů pro kontrakt._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Knihovna asertů pro testování chytrých kontraktů na Ethereu. Ujistěte se, že se vaše kontrakty chovají podle očekávání!_

- **[Framework pro jednotkové testování Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie využívá Pytest, na funkce bohatý testovací framework, který vám umožní psát malé testy s minimálním kódem, dobře se škáluje pro velké projekty a je vysoce rozšiřitelný._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry nabízí Forge, rychlý a flexibilní testovací framework pro Ethereum schopný provádět jednoduché jednotkové testy, kontroly optimalizace plynu a fuzzing kontraktů._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework pro testování chytrých kontraktů založený na Ethers.js, Mocha a Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Vývojový a testovací framework založený na Pythonu pro chytré kontrakty cílící na Ethereum Virtual Machine._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework založený na Pythonu pro jednotkové testování a fuzzing se silnými možnostmi ladění a podporou meziřetězcového testování, využívající pytest a Anvil pro nejlepší uživatelský zážitek a výkon._

### Nástroje pro testování založené na vlastnostech {#property-based-testing-tools}

#### Nástroje pro statickou analýzu {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework pro statickou analýzu Solidity založený na Pythonu pro hledání zranitelností, zlepšení porozumění kódu a psaní vlastních analýz pro chytré kontrakty._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter pro vynucování stylu a bezpečnostních osvědčených postupů pro programovací jazyk chytrých kontraktů Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Statický analyzátor založený na Rustu speciálně navržený pro bezpečnost a vývoj chytrých kontraktů ve Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework pro statickou analýzu založený na Pythonu s detektory zranitelností a kvality kódu, tiskárnami pro extrakci užitečných informací z kódu a podporou pro psaní vlastních submodulů._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Jednoduchý a výkonný linter pro Solidity._

#### Nástroje pro dynamickou analýzu {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Rychlý fuzzer kontraktů pro detekci zranitelností v chytrých kontraktech prostřednictvím testování založeného na vlastnostech._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Automatizovaný fuzzingový nástroj užitečný pro detekci porušení vlastností v kódu chytrého kontraktu._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework pro dynamické symbolické provádění pro analýzu bajtkódu EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Nástroj pro hodnocení bajtkódu EVM pro detekci zranitelností kontraktů pomocí analýzy taint, konkolické analýzy a kontroly toku řízení._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble je specifikační jazyk a nástroj pro verifikaci za běhu, který vám umožňuje anotovat chytré kontrakty vlastnostmi, jež vám umožní automaticky testovat kontrakty pomocí nástrojů, jako je Diligence Fuzzing nebo MythX._

## Související tutoriály {#related-tutorials}

- [Přehled a srovnání různých testovacích produktů](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Jak používat Echidna k testování chytrých kontraktů](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Jak používat Manticore k hledání chyb v chytrých kontraktech](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Jak používat Slither k hledání chyb v chytrých kontraktech](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jak mockovat kontrakty v Solidity pro testování](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Jak spouštět jednotkové testy v Solidity pomocí Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Další čtení {#further-reading}

- [Podrobný průvodce testováním chytrých kontraktů na Ethereu](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Jak testovat chytré kontrakty na Ethereu](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Průvodce jednotkovým testováním pro vývojáře od MolochDAO](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Jak testovat chytré kontrakty jako rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutoriály: Testování chytrých kontraktů na Ethereu {#tutorials}

- [Jak vyvíjet a testovat dApp na lokálním, multiklientském testnetu](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Návod na nasazení chytrého kontraktu na lokální testnet a provádění testů._
- [Jak mockovat chytré kontrakty v Solidity pro testování](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Středně pokročilý tutoriál o tom, jak používat mock data a implementovat jednotkové testování._
- [Jak používat Echidna k testování chytrých kontraktů](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Pokročilý přístup k fuzzingu a testování chytrých kontraktů._