---
title: Bezpečnost chytrých smluv
description: Přehled pokynů pro vytváření bezpečných smart kontraktů na Ethereu
lang: cs
---

Smart kontrakty jsou velmi flexibilní a schopné ovládat velké množství hodnot a dat, přičemž běží nezměnitelnou logikou založenou na kódu spuštěném na blockchainu. To vytvořilo živý ekosystém decentralizovaných aplikací bez nutnosti důvěry, které mají oproti tradičním systémům spoustu výhod. Zároveň však představují příležitosti pro útočníky, kteří se snaží vydělat zneužitím zranitelností ve smart kontraktech.

Veřejné blockchainy, jako je Ethereum, dále komplikují otázku zabezpečení smart kontraktů. Nasazený kód kontraktu _obvykle_ není možné změnit, aby se opravily bezpečnostní chyby, a majetek odcizený ze smart kontraktů je kvůli nezměnitelnosti extrémně obtížné sledovat a prakticky nemožné získat zpět.

I když se údaje liší, odhaduje se, že celková hodnota odcizených nebo ztracených prostředků z důvodu bezpečnostních chyb ve smart kontraktech dnes přesahuje 1 miliardu dolarů. To zahrnuje incidenty s vysokým profilem, jako je [hack DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (ukradeno 3,6 milionu ETH, což v dnešní ceně představuje více než 1 miliardu dolarů), [hack multi-sig peněženky Parity](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (škoda ve výši 30 milionů dolarů kvůli hackerům) a [problém se zmrazením peněženek Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (přes 300 milionů dolarů v ETH zůstalo zamčeno navždy).

Výše zmíněné problémy ukazují na důležitost zajištění bezpečnosti smart kontraktů a dělají z ní nezbytnost, do které by měli vývojáři investovat úsilí. Zabezpečení smart kontraktů je vážnou záležitostí, kterou by se měl každý vývojář naučit. Tento průvodce pokrývá bezpečnostní aspekty pro vývojáře Etherea a poskytuje zdroje pro zvýšení bezpečnosti smart kontraktů.

## Předpoklady {#prerequisites}

Než se pustíte do studia bezpečnosti, ujistěte se, že jste obeznámeni se [základy vývoje smart kontraktů](/developers/docs/smart-contracts/).

## Pokyny pro vytváření bezpečných smart kontraktů na Ethereu {#smart-contract-security-guidelines}

### 1. Navrhněte správná omezení přístupu {#design-proper-access-controls}

Ve smart kontraktech mohou funkce označené jako `public` nebo `external` volat jakýkoli externí (EOA) nebo kontraktový účet. Specifikace veřejné viditelnosti funkcí je nezbytná, pokud chcete, aby mohli s vaším kontraktem interagovat i ostatní. Funkce označené jako `private` mohou být volány pouze funkcemi v rámci smart kontraktu a nikoliv externími účty. Pokud umožníte každému účastníkovi sítě přístup ke všem funkcím kontraktu, můžete tím způsobit problémy, zejména pokud to znamená, že kdokoliv může provádět citlivé operace (např. vydávání nových tokenů).

Aby se zabránilo neoprávněnému použití funkcí smart kontraktu, je nutné implementovat bezpečné přístupové kontroly. Mechanismy přístupové kontroly omezují schopnost používat určité funkce ve smart kontraktu na schválené subjekty, jako jsou účty odpovědné za správu kontraktu. **Vzor Ownable** a **kontrola přístupu založená na rolích** jsou dva vzory užitečné pro implementaci přístupové kontroly ve smart kontraktech:

#### Vzor Ownable {#ownable-pattern}

Tento vzor přiřadí při vytváření kontraktu adresu jako „vlastníka“ kontraktu. Chráněným funkcím je přiřazen modifikátor `OnlyOwner`, který zajistí, že kontrakt ověří identitu volající adresy před spuštěním funkce. Volání chráněných funkcí z jiných adres, než je adresa vlastníka kontraktu, se vždy vrátí zpět, čímž se zabrání přístupu nežádoucích adres.

#### Kontrola přístupu založená na rolích {#role-based-access-control}

Registrace jediné adresy jako `vlastníka` smart kontraktu představuje riziko centralizace a jediného bodu selhání. Pokud jsou kompromitovány klíče účtu vlastníka, útočníci mohou napadnout i kontrakt, který vlastní. Proto může být lepší možností použít kontrolu přístupu založenou na rolích s účty několika správců.

V řízení přístupu na základě rolí je přístup k citlivým funkcím rozdělen mezi několik důvěryhodných adres. Jeden účet může být například zodpovědný za vydávání nových tokenů, zatímco jiný účet provádí vylepšení nebo kontrakt pozastavuje. Decentralizace řízení přístupu tímto způsobem eliminuje jednotlivé body selhání a snižuje nutnost uživatele vašemu kontraktu slepě důvěřovat.

##### Použití multi-signature peněženek

Dalším přístupem k implementaci bezpečné přístupové kontroly je možnost ke správě kontraktu použít [multi-signature účet](/developers/docs/smart-contracts/#multisig). Na rozdíl od běžného EOA jsou multi-signature účty vlastněny několika subjekty a k provedení transakcí vyžadují podpisy od předem daného minimálního počtu účtů – například alespoň 3 z 5.

Použití multisigu pro řízení přístupu přináší další vrstvu zabezpečení, protože akce na smart kontraktu vyžadují souhlas více stran. To je užitečné zejména v případě, že je použití vzoru Ownable nezbytné, protože útočníkovi nebo i insiderovi se špatným úmyslem komplikuje manipulaci s citlivými funkcemi kontraktu.

### 2. Použijte příkazy require(), assert() a revert() k ochraně akcí kontraktu {#use-require-assert-revert}

Jakmile je váš smart kontrakt nasazen na blockchain, volat jeho veřejné funkce může kdokoliv. Jelikož nemůžete předem vědět, jak budou externí účty s kontraktem interagovat, je ideální volbou implementovat interní zabezpečení proti problematickým operacím ještě před nasazením kontraktu. Pomocí příkazů `require()`, `assert()` a `revert()` můžete nastavit požadované chování smart kontraktu za účelem vyvolání výjimek a vrácení změn stavu, pokud exekuce funkce nebude úspěšná.

**`require()`**: ``Vyžaduje, aby byly předem definované podmínky splněny před spuštěním volané funkce. Příkaz `require` lze použít k ověření uživatelských vstupů, kontrole stavových proměnných nebo ověření identity volajícího účtu před pokračováním exekuce funkce.

**`assert()`**: `assert()` se používá k detekci interních chyb a kontrole porušení „invariantů“ v kódu. Invariant je logické tvrzení o stavu kontraktu, které by mělo platit pro všechny exekuce funkcí. Příkladem invariantu je maximální celková nabídka nebo zůstatek tokenového kontraktu. Použití funkce `assert()` zajišťuje, že váš kontrakt nikdy nedosáhne zranitelného stavu, a pokud ano, všechny změny stavových proměnných budou vráceny zpět.

**`revert()`**: `revert()` může být použit v if-else příkazu k vyvolání výjimky, pokud není splněna požadovaná podmínka. Ukázkový kontrakt níže používá `revert()` k ochraně exekuce funkcí:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testování smart kontraktů a ověřování správnosti kódu {#test-smart-contracts-and-verify-code-correctness}

Neměnnost kódu běžícího na [Virtuálním stroji Etherea (EVM)](/developers/docs/evm/) znamená, že smart kontrakty vyžadují vyšší úroveň kontroly kvality během vývojové fáze. Důkladné testování vašeho kontraktu a sledování jakýchkoli neočekávaných výsledků výrazně zvýší bezpečnost a dlouhodobě ochrání vaše uživatele.

Obvyklou metodou je psát malé jednotkové testy (unit tests) pomocí mock dat, která kontrakt očekává od uživatelů. [Jednotkové testování](/developers/docs/smart-contracts/testing/#unit-testing) je dobré pro testování funkčnosti určitých funkcí a zajištění, že smart kontrakt funguje podle očekávání.

Jednotkové testování je při zajištění bezpečnosti smart kontraktů účinné bohužel jen minimálně, pokud se používá izolovaně. Jednotkový test může prokázat, že funkce správně provádí operace s mock daty, ale obecně jsou jednotkové testy účinné pouze do té míry, jak jsou napsány. To ztěžuje detekci opomenutých hraničních případů a zranitelností, které by mohly ohrozit bezpečnost vašeho smart kontraktu.

Lepším přístupem je kombinovat jednotkové testování s testováním založeným na vlastnostech (property-based testing) prováděným pomocí [statické a dynamické analýzy](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Statická analýza se spoléhá na nízkoúrovňové reprezentace, jako jsou [grafy toku kontroly (control flow graphs)](https://en.wikipedia.org/wiki/Control-flow_graph) a [abstraktní syntaktické stromy](https://deepsource.io/glossary/ast/) (abstract syntax trees), za účelem analýzy dosažitelných stavů programu a možných exekučních cest. Mezitím dynamické analytické techniky, jako je [fuzzing smart kontraktů](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), provádějí kód kontraktu s náhodnými vstupními hodnotami, aby detekovaly operace, které porušují bezpečnostní vlastnosti.

[Formální verifikace](/developers/docs/smart-contracts/formal-verification) je dalším postupem pro ověřování bezpečnostních vlastností ve smart kontraktech. Na rozdíl od běžného testování může formální verifikace definitivně prokázat nepřítomnost chyb ve smart kontraktu. Toho lze docílit vytvořením formální specifikace, která zachycuje požadované bezpečnostní vlastnosti, a prokázáním, že formální model kontraktů odpovídá této specifikaci.

### 4. Požádejte o nezávislé přezkoumání vašeho kódu {#get-independent-code-reviews}

Po testování vašeho kontraktu je dobré požádat jiné osoby, aby zkontrolovaly zdrojový kód a odhalily případné bezpečnostní problémy. Testování neodhalí všechny chyby ve smart kontraktu, ale nezávislé přezkoumání zvyšuje možnost odhalení zranitelností.

#### Audity {#audits}

Zajištění auditu smart kontraktů je jedním ze způsobů, jak provést nezávislé přezkoumání kódu. Auditoři hrají důležitou roli při zajišťování, že smart kontrakty jsou bezpečné a bez defektů kvality a návrhových chyb.

Je však důležité nenahlížet na audity jako na všelék. Audity smart kontraktů neodhalí každou chybu a jsou navrženy především pro poskytování dalšího kola kontrol, které mohou pomoci odhalit problémy, které vývojáři během počátečního vývoje a testování přehlédli. Doporučuje se dodržovat osvědčené postupy při práci s auditory, jako je řádné dokumentování kódu a přidávání komentářů, aby se přínos takového auditu maximalizoval.

- [Smart contract auditing tips & tricks](https://twitter.com/tinchoabbate/status/1400170232904400897) – _@tinchoabbate_
- [Make the most out of your audit](https://inference.ag/blog/2023-08-14-tips/) – _Inference_

#### Odměna za vyřešení chyby {#bug-bounties}

Zřízení programu bug bounty, tedy programu odměn za vyřešení chyb, je dalším přístupem k implementaci externích kontrol kódu. Bug bounty je finanční odměna poskytovaná jednotlivcům (obvykle whitehat hackerům), kteří objeví zranitelnosti v aplikaci.

Při správném použití bug bounty motivuje členy hackerské komunity k inspekci vašeho kódu a odhalení kritických chyb. Příkladem z reálného světa je „infinite money bug“, který by útočníkovi umožnil vytvořit neomezené množství Etheru na platformě [Optimism](https://www.optimism.io/), [druhé vrstvě](/layer-2/) protokolu na Ethereu. Naštěstí whitehat hacker [odhalil tuto chybu](https://www.saurik.com/optimism.html) a informoval tým, čímž si [vysloužil velkou odměnu](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Užitečnou strategií je nastavit odměnu v programu bug bounty v poměru k výši prostředků, které jsou v sázce. Tento přístup, popisovaný jako „[škálovatelná bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)“, finančně motivuje jednotlivce zodpovědně zveřejnit zranitelnosti namísto jejich zneužití.

### 5. Při vývoji smart kontraktů dodržujte osvědčené postupy {#follow-smart-contract-development-best-practices}

Existence auditů a bug bounty vás nezbavuje odpovědnosti za psaní kvalitního kódu. Bezpečnost smart kontraktů začíná dodržováním správných návrhových a vývojových procesů:

- Ukládejte veškerý kód do systému správy verzí, jako je git

- Všechny úpravy kódu dělejte prostřednictvím pull requestů

- Zajistěte, aby měl každý pull request alespoň jednoho nezávislého recenzenta – pokud pracujete na projektu sami, zvažte, zda nenajít jiné vývojáře a poprosit je o vzájemné recenzování vašich kódů

- Pro testování, kompilaci a nasazování smart kontraktů používejte [vývojové prostředí](/developers/docs/frameworks/)

- Spusťe svůj kód v základních nástrojích pro analýzu kódu, jako jsou [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril a Slither. Ideálně byste to měli udělat před každým sloučením pull requestu a porovnat rozdíly ve výstupu

- Ujistěte se, že váš kód se kompiluje bez chyb a kompilátor Solidity nevydává žádná varování

- Správně dokumentujte svůj kód (pomocí [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) a uveďte podrobnosti o architektuře kontraktu ve snadno srozumitelném jazyce. To usnadní audit a přezkoumání vašeho kódu.

### 6. Implementujte robustní plány obnovy po nehodě {#implement-disaster-recovery-plans}

Navrhování bezpečných přístupových kontrol, implementace modifikátorů funkcí a další doporučení mohou zlepšit bezpečnost smart kontraktů, ale nemohou vyloučit možnost zlovolných útoků. Budování bezpečných smart kontraktů vyžaduje „přípravu na selhání“ a mít záložní plán pro efektivní reakci na útoky. Správný plán obnovy po nehodě zahrnuje některé nebo všechny z následujících komponent:

#### Aktualizace kontraktů {#contract-upgrades}

I když jsou smart kontrakty na Ethereu ve výchozím nastavení neměnné, pomocí vzorů aktualizace je možné dosáhnout určité míry změny. Aktualizace kontraktů je nezbytná v případech, kdy kritická chyba činí váš starý kontrakt nepoužitelným a nasazení nové logiky je nejrealističtější možností.

Mechanismy aktualizace kontraktů fungují různě, ale jedním z populárních přístupů je „proxy vzor“. [Proxy vzory](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) rozdělují stav a logiku aplikace mezi _dva_ kontrakty. První kontrakt (tzv. „proxy kontrakt“) uchovává stavové proměnné (např. zůstatky uživatelů), zatímco druhý kontrakt (tzv. „logický kontrakt“) obsahuje kód pro vykonávání funkcí kontraktu.

Účty interagují s proxy kontraktem, který přesměruje všechna volání funkcí na logický kontrakt pomocí nízkoúrovňového volání [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Na rozdíl od běžného volání zpráv `delegatecall()` zajišťuje, že kód spuštěný na adrese logického kontraktu je prováděn v kontextu volajícího kontraktu. To znamená, že logický kontrakt vždy zapisuje do úložiště proxy kontraktu (místo vlastního úložiště) a původní hodnoty `msg.sender` a `msg.value` jsou zachovány.

Delegování volání na logický kontrakt vyžaduje uložení jeho adresy do úložiště proxy kontraktu. Proto je aktualizace logiky kontraktu pouze otázkou nasazení nového logického kontraktu a uložení nové adresy do proxy kontraktu. Následná volání proxy kontraktu jsou pak automaticky směrována na nový logický kontrakt, čímž dojde k „aktualizaci“ kontraktu bez skutečné modifikace kódu.

[Další informace o aktualizaci kontraktu](/developers/docs/smart-contracts/upgrading/).

#### Nouzové zastavení {#emergency-stops}

Jak již bylo zmíněno, i přes rozsáhlé audity a testování není možné objevit úplně všechny chyby ve smart kontraktu. Pokud se po nasazení objeví ve vašem kódu zranitelnost, její oprava je nemožná, protože nemůžete změnit kód běžící na adrese kontraktu. Navíc implementace mechanismů aktualizace (např. proxy vzory) může nějakou chvíli trvat (často vyžaduje schválení několika subjektů), což dává útočníkům více času a mohou tak způsobit větší škody.

Nejradikálnější možností je implementovat funkci „nouzového zastavení“, která zablokuje volání zranitelných funkcí v kontraktu. Nouzové zastavení obvykle zahrnuje následující komponenty:

1. Globální Booleanovská proměnná, která indikuje, zda je smart kontrakt zastaven, či nikoli. Tato proměnná je při spouštění kontraktu nastavena na `false`, ale při zastavení kontraktu se změní na `true`.

2. Funkce, které odkazují na Booleanovskou proměnnou při jejich provádění. Tyto funkce jsou přístupné, když smart kontrakt není pozastaven, a stávají se nepřístupnými, když je funkce nouzového zastavení aktivována.

3. Entita, která má přístup k funkci nouzového zastavení a která nastavuje Booleanovskou proměnnou na `true`. Aby se zabránilo zlovolným akcím, lze volání této funkce omezit na důvěryhodnou adresu (např. vlastníka kontraktu).

Jakmile je nouzové zastavení aktivováno, určité funkce nebudou volatelné. Toho lze dosáhnout obalením vybraných funkcí v modifikátoru, který odkazuje na globální proměnnou. Níže je uveden [příklad](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) implementace tohoto vzoru v kontraktech:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Tento příklad ukazuje základní funkce nouzového zastavení:

- Proměnná `isStopped` je Booleanovská hodnota, která se na začátku vyhodnocuje jako `false` a změní se na `true`, když kontrakt vstoupí do nouzového režimu.

- Modifikátory funkcí `onlyWhenStopped` a `stoppedInEmergency` kontrolují proměnnou `isStopped`. Modifikátor `stoppedInEmergency` se používá k ovládání funkcí, které by měly být nepřístupné, když je kontrakt zranitelný (např. funkce `deposit()`). Volání těchto funkcí se jednoduše zruší.

Modifikátor `onlyWhenStopped` se používá pro funkce, které by měly být volatelné během nouze (např. `funkce emergencyWithdraw()`). Tyto funkce mohou pomoci situaci vyřešit, a proto jsou vyloučeny ze seznamu „omezených funkcí“.

Použití funkce nouzového zastavení poskytuje efektivní řešení vážných zranitelností smart kontraktu. Nicméně to zvyšuje nutnost uživatelů důvěřovat vývojářům, že tuto funkci neaktivují z vlastních sobeckých důvodů. K řešení tohoto problému je možné decentralizovat kontrolu nad nouzovým zastavením, například tím, že ho podrobíte mechanismu hlasování na blockchainu, časovému zámku nebo schválení z multisig peněženky.

#### Monitorování událostí {#event-monitoring}

[Události](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) umožňují sledovat volání funkcí smart kontraktů a monitorovat změny stavových proměnných. Ideální je naprogramovat váš smart kontrakt tak, aby zapsal událost pokaždé, když nějaká strana provede bezpečnostně kritickou akci (např. výběr prostředků).

Protokolování událostí a jejich monitorování mimo řetězec poskytuje přehled o činnostech kontraktu a pomáhá rychleji odhalit škodlivé akce. To znamená, že váš tým může rychleji reagovat na útoky a podniknout kroky ke zmírnění dopadu na uživatele, jako je pozastavení funkcí nebo provedení aktualizace.

Můžete si také vybrat hotový nástroj pro monitorování, který automaticky přeposílá upozornění pokaždé, když někdo interaguje s vašimi kontrakty. Tyto nástroje vám umožní vytvářet vlastní upozornění na základě různých spouštěcích událostí, jako je objem transakcí, četnost volání funkcí nebo specifické funkce zapojené do transakce. Například byste mohli naprogramovat upozornění, které se objeví, když částka vybraná v jedné transakci překročí určitou prahovou hodnotu.

### 7. Návrh bezpečných řídicích systémů {#design-secure-governance-systems}

Možná budete chtít decentralizovat svou aplikaci tím, že předáte kontrolu nad hlavními smart kontrakty členům komunity. V takovém případě bude systém smart kontraktů zahrnovat řídicí modul, což je mechanismus, který umožňuje členům komunity schvalovat administrativní akce prostřednictvím řídicího systému na blockchainu. Například návrh na aktualizaci proxy kontraktu na novou implementaci může být odhlasován držiteli tokenů.

Decentralizované řízení může být prospěšné, zejména proto, že sladí zájmy vývojářů a koncových uživatelů. Nicméně mechanismy správy smart kontraktů mohou při nesprávné implementaci představovat nové riziko. Pravděpodobný scénář je, že útočník získá obrovskou hlasovací sílu (měřenou počtem držených tokenů) tím, že si vezme [bleskovou půjčku](/defi/#flash-loans) a protlačí škodlivý návrh.

Jedním ze způsobů, jak předcházet problémům spojeným s řízením na blockchainu, je [použití časového zámku (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Časový zámek brání smart kontraktu v provádění předem daných akcí, dokud neuplyne stanovené množství času. Další strategie zahrnují přiřazení „váhy hlasu“ každému tokenu na základě toho, jak dlouho ho adresa držela, nebo měření hlasovací síly adresy v historickém období (například 2–3 bloky v minulosti) namísto aktuálního bloku. Obě metody snižují možnosti rychlého získávání hlasovací síly za účelem ovlivnění hlasování na blockchainu.

Více o [návrhu systémů bezpečného řízení](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [různých hlasovacích mechanismech v DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) a [běžných vektorech útoku DAO využívajících DeFi](https://dacian.me/dao-governance-defi-attacks) najdete ve sdílených odkazech.

### 8. Snižte složitost kódu na minimum {#reduce-code-complexity}

Vývojáři tradičních softwarů znají princip KISS („Keep It Simple, Stupid“), který doporučuje zbytečně softwarový design nekomplikovat. Tento princip vychází z myšlenky, že „komplexní systémy selhávají složitým způsobem“ a jsou náchylnější k nákladným chybám.

Udržování jednoduchosti je zvláště důležité při psaní smart kontraktů, vzhledem k tomu, že smart kontrakty potenciálně spravují velké objemy aktiv. Tipem pro docílení jednoduchosti při psaní smart kontraktů je opětovné použití stávajících knihoven, jako je [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/), kdekoliv je to možné. Protože tyto knihovny byly důkladně auditovány a testovány vývojáři, jejich použití snižuje pravděpodobnost chyb při psaní nové funkcionality od začátku.

Dalším běžným doporučením je psát malé funkce a udržovat smart kontrakty modulární rozdělením obchodní logiky mezi více kontraktů. Nejenže psaní jednoduššího kódu snižuje možnosti útoku na váš smart kontrakt, ale také usnadňuje ověřování správnosti celého systému a včasné odhalení možných návrhových chyb.

### 9. Chraňte se před běžnými zranitelnostmi smart kontraktů {#mitigate-common-smart-contract-vulnerabilities}

#### Opětovný vstup {#reentrancy}

EVM neumožňuje souběžné zpracování (konkurenci), což znamená, že dva kontrakty zapojené do volání zprávy nemohou běžet současně. Externí volání pozastaví exekuci a paměť volajícího kontraktu, dokud se volání nevrátí, načež provádění pokračuje normálně. Tento proces lze formálně popsat jako předání [řízení](https://www.computerhope.com/jargon/c/contflow.htm) dalšímu kontraktu.

Ačkoli je tento proces většinou neškodný, předání řízení nedůvěryhodným kontraktům může způsobit problémy, jako je reentrancy (opětovný vstup). Útok opětovným vstupem nastane, když škodlivý kontrakt znovu volá do zranitelného kontraktu, než je původní funkce dokončena. Tento typ útoku je nejlepší vysvětlovat na příkladu.

Zvažte jednoduchý smart kontrakt (Victim), který umožňuje komukoli vložit a vybrat Ether:

```solidity
// This contract is vulnerable. Do not use in production

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Tento kontrakt nabízí funkci `withdraw()`, která umožňuje uživatelům vybrat ETH, které do kontraktu vložili v minulosti. Při zpracování výběru kontrakt provádí následující operace:

1. Zjistí zůstatek ETH uživatele
2. Odešle prostředky na volající adresu
3. Resetuje jejich zůstatek na 0, aby zabránil dalším výběrům od uživatele

Funkce `withdraw()` v kontraktu `Victim` následuje vzor „kontroly-interakce-efekty“ (checks-interactions-effects). Nejprve _zkontroluje_, zda jsou splněny podmínky pro exekuci (tzn. uživatel má kladný zůstatek ETH), poté provede _interakci_ odesláním ETH na adresu volajícího a nakonec aplikuje _efekty_ transakce (tj. sníží zůstatek uživatele).

Pokud je funkce `withdraw()` volána z účtu vlastněného externí osobou (EOA), funkce se provede podle očekávání: `msg.sender.call.value()` odešle ETH volajícímu. Avšak pokud je `msg.sender` účet smart kontraktu, který volá `withdraw()`, odeslání prostředků pomocí `msg.sender.call.value()` spustí i kód uložený na této adrese.

Představte si, že toto je kód na adrese kontraktu:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Tento kontrakt je navržen tak, aby dělal tři věci:

1. Přijal vklad z jiného účtu (pravděpodobně z EOA útočníka)
2. Uložil 1 ETH do kontraktu Victim
3. Vybral 1 ETH uložený ve smart kontraktu

Na první pohled není na tomto kontraktu nic špatného, až na to, že kontrakt `Attacker` má další funkci, která znovu volá `withdraw()` v kontraktu `Victim`, pokud je zbývající palivo (gas) z příchozího volání `msg.sender.call.value` více než 40 000. To dává kontraktu `Attacker` schopnost znovu vstoupit do kontraktu `Victim` a vybrat více prostředků _před tím_, než se dokončí první volání `withdraw`. Tento cyklus vypadá následovně:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

Výsledkem je, že následná vyvolání budou úspěšná a umožní volajícímu vybrat svůj zůstatek vícekrát, protože zůstatek volajícího není nastaven na 0, dokud se nedokončí provedení funkce. Tento druh útoku může být použit k vybrání prostředků smart kontraktu, jako se to stalo při [DAO hacku v roce 2016](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Útoky opětovným vstupem (reentrancy) jsou stále kritickým problémem smart kontraktů, jak ukazují [veřejné seznamy exploitů reentrancy útoků](https://github.com/pcaversaccio/reentrancy-attacks).

##### Jak zabránit útokům opětovným vstupem

Jedním z přístupů, jak se vypořádat s reentrancy útoky, je dodržovat vzor [kontroly-efekty-interakce](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Tento vzor uspořádává provádění funkcí takovým způsobem, že kód, který provádí nezbytné kontroly před pokračováním v exekuci, je proveden jako první, následovaný kódem, který manipuluje se stavem kontraktu, a kód, který interaguje s jinými kontrakty nebo EOA, přichází na řadu jako poslední.

Vzor kontroly-efekty-interakce je použit v revidované verzi kontraktu `Victim`, která je uvedena níže:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Tento kontrakt provádí _kontrolu_ zůstatku uživatele, aplikuje _efekty_ funkce `withdraw()` (nastavením zůstatku uživatele na 0) a poté pokračuje v _interakci_ (odesláním ETH na uživatelovu adresu). Tímto způsobem kontrakt aktualizuje svůj stav před externím voláním, čímž eliminuje podmínku opětovného vstupu, která umožňovala původní útok. Kontrakt `Attacker` stále může znovu volat funkci `withdraw()` v kontraktu `NoLongerAVictim`, ale protože <0>balances[msg.sender]</0> byla nastavena na 0, pokus o opětovné výběry by vyvolal chybu.

Další možností je použití zámku pro vzájemné vyloučení (běžně označovaného jako „mutex“), který uzamkne část stavu kontraktu, dokud se nedokončí volání funkce. To je implementováno pomocí proměnné typu Boolean, která je nastavena na `true` před provedením funkce a po dokončení volání se vrací na hodnotu `false`. Jak je vidět v níže uvedeném příkladu, použití mutexu chrání funkci před rekurzivními voláními, zatímco původní volání je stále zpracováváno, což účinně zastavuje reentrancy.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Můžete také použít systém [pull payments](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment), který vyžaduje, aby sami uživatelé vybrali prostředky ze smart kontraktů, namísto systému „push payments“, který prostředky na účty odesílá sám. Tím se eliminuje možnost neúmyslného spuštění kódu na neznámých adresách (a může také zabránit určitým útokům typu denial-of-service).

#### Přetečení a podtečení celých čísel {#integer-underflows-and-overflows}

Přetečení celého čísla nastává, když výsledek aritmetické operace překročí přijatelný rozsah hodnot, což způsobí „přetočení“ na nejnižší reprezentovatelnou hodnotu. Například `uint8` může uložit hodnoty až do 2^8-1=255. Aritmetické operace, které vedou k hodnotám vyšším než `255`, přetečou a nastaví `uint` na `0`, podobně jako se tachometr automobilu resetuje na 0, když dosáhne maximálního nájezdu (999999).

Podtečení celého čísla se děje ze stejných důvodů: výsledek aritmetické operace klesne pod přijatelný rozsah. Pokud byste například zkusili snížit hodnotu `0` v `uint8`, výsledek by se jednoduše přetočil na maximální reprezentovatelnou hodnotu (`255`).

Přetečení i podtečení celých čísel může vést k neočekávaným změnám proměnných stavu kontraktu a způsobit neplánovanou exekuci. Níže je uveden příklad, jak může útočník zneužít aritmetické přetečení ve smart kontraktu k provedení neplatné operace:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Jak zabránit podtečení a přetečení celých čísel

Od verze 0.8.0 kompilátor Solidity odmítá kód, který by vedl k podtečení nebo přetečení celých čísel. A smart kontrakty, které jsou kompilovány pomocí starší verze kompilátoru, by měly buď provádět kontroly ve funkcích zahrnujících aritmetické operace, nebo použít knihovnu (např. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)), která provádí kontroly podtečení/přetečení.

#### Manipulace s orákly {#oracle-manipulation}

[Orákly](/developers/docs/oracles/) získávají informace mimo blockchain (off-chain) a posílají je na blockchain, aby je mohly používat smart kontrakty. Pomocí oráklů můžete navrhovat smart kontrakty, které spolupracují se systémy mimo blockchain, jako jsou kapitálové trhy, čímž se výrazně rozšiřují jejich aplikace.

Pokud je však orákulum poškozeno a posílá nesprávné informace na blockchain, kód smart kontraktů bude vykonáván na základě chybných vstupů, což může způsobit problémy. To je podstatou „problému orákulí“, který se týká úkolu zajistit, aby informace z blockchainového orákula byly přesné, aktuální a včasné.

Další bezpečnostní problém je používání on-chain orákula, jako je decentralizovaná burza (DEX), k získání aktuální ceny aktiva. Platformy na půjčování prostředků v odvětví [decentralizovaných financí (DeFi)](/defi/) to často dělají, aby určily hodnotu zástavy uživatele a zjistily, kolik si může půjčit.

Ceny na DEX jsou často přesné, zejména díky arbitrážím, které obnovují paritu na trzích. Nicméně jsou otevřené manipulacím, zejména pokud on-chain orákulum vypočítává ceny aktiv na základě historických obchodních vzorců (což je obvyklý případ).

Útočník by mohl například uměle zvýšit spotovou cenu aktiva tím, že si vezme bleskovou půjčku těsně před interakcí s vaším půjčovacím kontraktem. Dotazování na cenu aktiva na DEX by vrátilo vyšší než normální hodnotu (kvůli velké „nákupní objednávce“ útočníka, která zkresluje poptávku po aktivu), což by mu umožnilo si půjčit více, než by měl. Takovéto „útoky na bleskové půjčky“ byly použity ke zneužití závislosti na cenových oráklech mezi aplikacemi DeFi, což stálo protokoly miliony finančních prostředků.

##### Jak zabránit manipulaci s orákly

Minimálním požadavkem na [zabránění manipulaci s orákly](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) je použití decentralizované sítě orákulí, která dotazuje informace z více zdrojů, aby se zabránilo jednotlivým bodům selhání. Ve většině případů mají decentralizovaná orákula vestavěné kryptoekonomické pobídky, které motivují orákulové uzly k hlášení správných informací, což je činí bezpečnějšími než centralizovaná orákula.

Pokud plánujete dotazovat on-chain orákulum na ceny aktiv, zvažte použití takového, které implementuje mechanismus časově váženého průměru ceny (TWAP). [TWAP orákulum](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) dotazuje cenu aktiva ve dvou různých časových bodech (které můžete upravit) a vypočítá spotovou cenu na základě získaného průměru. Volba delších časových období chrání váš protokol proti manipulaci s cenami, protože velké objednávky provedené nedávno nemohou ovlivnit ceny aktiv.

## Zdroje pro zabezpečení smart kontraktů pro vývojáře {#smart-contract-security-resources-for-developers}

### Nástroje pro analýzu smart kontraktů a ověřování správnosti kódu {#code-analysis-tools}

- **[Testovací nástroje a knihovny](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** – _sbírka profesionálních nástrojů a knihoven pro provádění unit testů, statické analýzy a dynamické analýzy na smart kontraktech._

- **[Nástroje pro formální ověřování](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** – _nástroje pro ověřování funkční správnosti ve smart kontraktech a kontrolu invariantů._

- **[Služby auditu smart kontraktů](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** – _seznam organizací poskytujících služby auditu smart kontraktů pro vývojové projekty Etherea._

- **[Platformy na odměny za řešení chyb](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** – _platformy pro koordinaci odměn za řešení chyb a odměňování odpovědného odhalování kritických zranitelností ve smart kontraktech._

- **[Kontrola forku](https://forkchecker.hashex.org/)** – _bezplatný online nástroj pro kontrolu všech dostupných informací o forkovaném kontraktu._

- **[ABI Kodér](https://abi.hashex.org/)** – _bezplatná online služba pro kódování funkcí a argumentů konstruktorů kontraktů Solidity._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** – _statický analyzér Solidity, který prochází abstraktní syntaktické stromy (AST) za účelem zjištění podezřelých zranitelností a vypisuje problémy v přehledném markdown formátu._

### Nástroje pro monitorování smart kontraktů {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** – _nástroj pro automatické sledování a reagování na události, funkce a parametry transakcí ve vašich smart kontraktech._

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)** – _nástroj pro získávání oznámení v reálném čase, když dojde k neobvyklým nebo neočekávaným událostem ve vašich smart kontraktech nebo peněženkách._

### Nástroje pro bezpečnou správu smart kontraktů {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** – _rozhraní pro správu smart kontraktů, včetně řízení přístupu, aktualizací a pozastavení._

- **[Safe](https://safe.global/)** – _peněženka se smart kontraktem běžící na platformě Ethereum, která vyžaduje, aby transakci schválil minimální počet lidí (M-z-N)._

- **[Kontrakty OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)** – _knihovny kontraktů pro implementaci funkcí správy, včetně vlastnictví kontraktů, upgradů, řízení přístupu, správy, možnosti pozastavení a více._

### Služby auditu smart kontraktů {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** – _služba auditu smart kontraktů, která pomáhá projektům napříč blockchainovým ekosystémem zajistit, aby jejich protokoly byly připraveny ke spuštění a vytvořeny tak, aby chránily uživatele._

- **[CertiK](https://www.certik.com/)** – _blockchainová bezpečnostní firma, která je průkopníkem v používání nejmodernější technologie formálního ověřování ve smart kontraktech a blockchainových sítích._

- **[Trail of Bits](https://www.trailofbits.com/)** – _společnost zabývající se kybernetickou bezpečností, která kombinuje bezpečnostní výzkum s mentalitou útočníka s cílem snížit riziko a posílit kód._

- **[PeckShield](https://peckshield.com/)** – _blockchainová bezpečnostní společnost nabízející produkty a služby pro bezpečnost, soukromí a použitelnost celého blockchainového ekosystému._

- **[QuantStamp](https://quantstamp.com/)** – _auditorská služba usnadňující mainstreamové přijetí blockchainové technologie prostřednictvím služeb hodnocení bezpečnosti a rizik._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** – _bezpečnostní společnost zabývající se smart kontrakty poskytující bezpečnostní audity pro distribuované systémy._

- **[Runtime Verification](https://runtimeverification.com/)** – _bezpečnostní společnost specializující se na formální modelování a ověřování smart kontraktů._

- **[Hacken](https://hacken.io)** – _Web3 auditor kybernetické bezpečnosti přinášející 360stupňový přístup k bezpečnosti blockchainu._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** – _služby auditu Solidity a Cairo, které zajišťují integritu smart kontraktů a bezpečnost uživatelů napříč Ethereem a Starknetem._

- **[HashEx](https://hashex.org/)** – _HashEx se zaměřuje na audit blockchainu a smart kontraktů s cílem zajistit bezpečnost kryptoměn a poskytuje služby, jako je vývoj smart kontraktů, penetrační testování a poradenství v oblasti blockchainu._

- **[Code4rena](https://code4rena.com/)** – _kompetitivní platforma pro audit, která motivuje experty na zabezpečení smart kontraktů, aby našli zranitelnosti a pomohli zvýšit bezpečnost webu3._

- **[CodeHawks](https://codehawks.com/)** – _kompetitivní platforma pro auditování smart kontraktů pořádající soutěže pro výzkumníky v oblasti bezpečnosti._

- **[Cyfrin](https://cyfrin.io)** – _bezpečnostní Web3 společnost, inkubátor krypto bezpečnosti prostřednictvím produktů a služeb auditu smart kontraktů._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** – _Web3 bezpečnostní firma nabízející bezpečnostní audity pro blockchainové systémy prostřednictvím týmu zkušených auditorů a nejlepších nástrojů ve své třídě._

- **[Oxorio](https://oxor.io/)** – _audity smart kontraktů a bezpečnostní služby blockchainu s odbornými znalostmi v oblasti EVM, Solidity, ZK, technologií napříč blockchainy pro krypto firmy a projekty DeFi._

- **[Inference](https://inference.ag/)** – _bezpečnostní auditorská společnost, která se specializuje na audit smart kontraktů pro blockchainy založené na EVM. Díky svým odborným auditorům identifikují potenciální problémy a navrhují schůdná řešení k jejich odstranění ještě před nasazením._

### Platformy pro odměny za řešení chyb {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** – _platforma na odměny za řešení chyb ve smart kontraktech a projektech DeFi, kde bezpečnostní výzkumníci revidují kód, odhalují zranitelnosti, dostávají zaplaceno a zvyšují bezpečnost kryptoměn._

- **[HackerOne](https://www.hackerone.com/)** – _platforma pro koordinaci zranitelností a odměny za chyby, která spojuje podniky s testery penetrací a výzkumníky kybernetické bezpečnosti._

- **[HackenProof](https://hackenproof.com/)** – _expertní platforma na odměny za řešení chyb pro krypto projekty (DeFi, smart kontrakty, peněženky, CEX a další), kde bezpečnostní profesionálové poskytují služby třídění a výzkumníci dostávají zaplaceno za relevantní, ověřená hlášení chyb._

-  **[Sherlock](https://www.sherlock.xyz/)** – _ručitel ve Web3 pro zabezpečení smart kontraktů, s výplatami pro auditory řízenými prostřednictvím smart kontraktů, aby se zajistilo, že příslušné chyby budou spravedlivě zaplaceny._

-  **[CodeHawks](https://www.codehawks.com/)** – _kompetitivní platforma na odměny za řešení chyb, kde se auditoři účastní bezpečnostních soutěží a výzev a (brzy) i vlastních soukromých auditů._

### Publikace známých zranitelností a zneužití smart kontraktů {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Známé útoky na smart kontrakty](https://consensys.github.io/smart-contract-best-practices/attacks/)** – _vysvětlení pro začátečníky nejvýznamnějších zranitelností smluv s ukázkovým kódem pro většinu případů._

- **[Registr SWC](https://swcregistry.io/)** – _souborný seznam položek Common Weakness Enumeration (CWE, enumerací častých slabin), které se vztahují na smart kontrakty Etherea._

- **[Rekt](https://rekt.news/)** – _pravidelně aktualizovaná publikace významných krypto hacků a exploitů spolu s podrobnými postmortálními zprávami._

### Výzvy určené k učení se zabezpečení smart kontraktů {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** – _kurátorský seznam blockchainových bezpečnostních válečných her, výzev a [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) soutěží a zápisů řešení._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** – _válečná hra, ve které se naučíte ofensivní zabezpečení smart kontraktů DeFi a získáte dovednosti v oblasti hledání chyb a bezpečnostního auditu._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** – _Web3/Solidity válečná hra, kde každá úroveň představuje smart kontrakt, který je třeba „hacknout“._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** – _hackovací výzvy smart kontraktů, zasazená do fantasy dobrodružství. Úspěšné splnění výzvy také umožňuje přístup do soukromého programu odměn za řešení chyb._

### Osvědčené postupy pro zabezpečení smart kontraktů {#smart-contract-security-best-practices}

- **[ConsenSys: ](https://consensys.github.io/smart-contract-best-practices/)** – _Úplný seznam pokynů pro zabezpečení smart kontraktů na Ethereu._

- **[Nascent: Jednoduchý bezpečnostní toolkit](https://github.com/nascentxyz/simple-security-toolkit)** – _sbírka praktických průvodců a kontrolních seznamů zaměřených na bezpečnost při vývoji smart kontraktů._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** – _užitečná kompilace bezpečných vzorů a osvědčených postupů pro programovací jazyk smart kontraktů Solidity._

- **[Dokumenty Solidity: Security Considerations](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** – _pokyny pro psaní bezpečných smart kontraktů pomocí Solidity._

- **[Standard ověřování zabezpečení smart kontraktů](https://github.com/securing/SCSVS)** – _čtrnáctidílný kontrolní seznam vytvořený za účelem standardizace zabezpečení smart kontraktů pro vývojáře, architekty, bezpečnostní recenzenty a prodejce._

- **[Učte se zabezpečení a auditování smart kontraktů](https://updraft.cyfrin.io/courses/security) – _ultimátní kurz bezpečnosti a auditu smart kontraktů vytvořený pro vývojáře smart kontraktů, kteří chtějí zvýšit úroveň svých osvědčených postupů v oblasti bezpečnosti a stát se bezpečnostními výzkumníky._

### Výukové programy o zabezpečení smart kontraktů {#tutorials-on-smart-contract-security}

- [Jak psát bezpečné smart kontrakty](/developers/tutorials/secure-development-workflow/)

- [Jak používat Slither k hledání chyb ve smart kontraktech](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jak používat Manticore k vyhledávání chyb v chytrých kontraktech](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Pokyny pro zabezpečení smart kontraktů](/developers/tutorials/smart-contract-security-guidelines/)

- [Jak bezpečně integrovat tokenový kontrakt s libovolnými tokeny](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft – zabezpečení a auditování smart kontraktů, celý kurz](https://updraft.cyfrin.io/courses/security)
