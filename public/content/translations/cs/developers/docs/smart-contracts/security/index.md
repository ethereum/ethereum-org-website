---
title: "Bezpečnost chytrých kontraktů"
description: "Přehled pokynů pro vytváření bezpečných smart kontraktů na Ethereu"
lang: cs
---

Smart kontrakty jsou velmi flexibilní a schopné ovládat velké množství hodnot a dat, přičemž běží nezměnitelnou logikou založenou na kódu spuštěném na blockchainu. To vytvořilo živý ekosystém decentralizovaných aplikací bez nutnosti důvěry, které mají oproti tradičním systémům spoustu výhod. Zároveň však představují příležitosti pro útočníky, kteří se snaží vydělat zneužitím zranitelností ve smart kontraktech.

Veřejné blockchainy, jako je Ethereum, dále komplikují otázku zabezpečení smart kontraktů. Nasazený kód kontraktu _obvykle_ není možné změnit, aby se opravily bezpečnostní chyby, a majetek odcizený z chytrých kontraktů je kvůli nezměnitelnosti extrémně obtížné sledovat a prakticky nemožné získat zpět.

I když se údaje liší, odhaduje se, že celková hodnota odcizených nebo ztracených prostředků z důvodu bezpečnostních chyb ve smart kontraktech dnes přesahuje 1 miliardu dolarů. To zahrnuje vysoce sledované incidenty, jako je [hack DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (ukradeno 3,6 milionu ETH v hodnotě přes 1 miliardu dolarů v dnešních cenách), [hack peněženky Parity s vícenásobným podpisem](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (ztráta 30 milionů dolarů pro hackery) a [problém se zmrazenou peněženkou Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (více než 300 milionů dolarů v ETH navždy uzamčeno).

Výše zmíněné problémy ukazují na důležitost zajištění bezpečnosti smart kontraktů a dělají z ní nezbytnost, do které by měli vývojáři investovat úsilí. Zabezpečení smart kontraktů je vážnou záležitostí, kterou by se měl každý vývojář naučit. Tento průvodce pokrývá bezpečnostní aspekty pro vývojáře Etherea a poskytuje zdroje pro zvýšení bezpečnosti smart kontraktů.

## Předpoklady {#prerequisites}

Než se pustíte do bezpečnosti, ujistěte se, že znáte [základy vývoje chytrých kontraktů](/developers/docs/smart-contracts/).

## Pokyny pro vytváření bezpečných chytrých kontraktů na Ethereu {#smart-contract-security-guidelines}

### 1. Navrhněte správné řízení přístupu {#design-proper-access-controls}

V chytrých kontraktech mohou funkce označené jako `public` nebo `external` volat jakýkoli externě vlastněný účet (EOA) nebo účet kontraktu. Specifikace veřejné viditelnosti funkcí je nezbytná, pokud chcete, aby mohli s vaším kontraktem interagovat i ostatní. Funkce označené jako `private` však mohou být volány pouze funkcemi v rámci chytrého kontraktu a nikoli externími účty. Pokud umožníte každému účastníkovi sítě přístup ke všem funkcím kontraktu, můžete tím způsobit problémy, zejména pokud to znamená, že kdokoliv může provádět citlivé operace (např. vydávání nových tokenů).

Aby se zabránilo neoprávněnému použití funkcí smart kontraktu, je nutné implementovat bezpečné přístupové kontroly. Mechanismy přístupové kontroly omezují schopnost používat určité funkce ve smart kontraktu na schválené subjekty, jako jsou účty odpovědné za správu kontraktu. Vzor **Ownable** a **řízení přístupu na základě rolí** jsou dva užitečné vzory pro implementaci řízení přístupu v chytrých kontraktech:

#### Vzor Ownable {#ownable-pattern}

Tento vzor přiřadí při vytváření kontraktu adresu jako „vlastníka“ kontraktu. Chráněným funkcím je přiřazen modifikátor `OnlyOwner`, který zajistí, že kontrakt ověří identitu volající adresy před spuštěním funkce. Volání chráněných funkcí z jiných adres, než je adresa vlastníka kontraktu, se vždy vrátí zpět, čímž se zabrání přístupu nežádoucích adres.

#### Řízení přístupu na základě rolí {#role-based-access-control}

Registrace jediné adresy jako `Owner` v chytrém kontraktu představuje riziko centralizace a jediný bod selhání. Pokud jsou kompromitovány klíče účtu vlastníka, útočníci mohou napadnout i kontrakt, který vlastní. Proto může být lepší možností použít kontrolu přístupu založenou na rolích s účty několika správců.

V řízení přístupu na základě rolí je přístup k citlivým funkcím rozdělen mezi několik důvěryhodných adres. Jeden účet může být například zodpovědný za vydávání nových tokenů, zatímco jiný účet provádí vylepšení nebo kontrakt pozastavuje. Decentralizace řízení přístupu tímto způsobem eliminuje jednotlivé body selhání a snižuje nutnost uživatele vašemu kontraktu slepě důvěřovat.

##### Použití multi-signature peněženek

Dalším přístupem k implementaci bezpečného řízení přístupu je použití [účtu s vícenásobným podpisem](/developers/docs/smart-contracts/#multisig) ke správě kontraktu. Na rozdíl od běžného EOA jsou multi-signature účty vlastněny několika subjekty a k provedení transakcí vyžadují podpisy od předem daného minimálního počtu účtů – například alespoň 3 z 5.

Použití multisigu pro řízení přístupu přináší další vrstvu zabezpečení, protože akce na smart kontraktu vyžadují souhlas více stran. To je užitečné zejména v případě, že je použití vzoru Ownable nezbytné, protože útočníkovi nebo i insiderovi se špatným úmyslem komplikuje manipulaci s citlivými funkcemi kontraktu.

### 2. Použijte příkazy `require()`, `assert()` a `revert()` k ochraně operací kontraktu {#use-require-assert-revert}

Jakmile je váš smart kontrakt nasazen na blockchain, volat jeho veřejné funkce může kdokoliv. Jelikož nemůžete předem vědět, jak budou externí účty s kontraktem interagovat, je ideální volbou implementovat interní zabezpečení proti problematickým operacím ještě před nasazením kontraktu. Správné chování v chytrých kontraktech můžete vynutit pomocí příkazů `require()`, `assert()` a `revert()`, které spouštějí výjimky a vracejí změny stavu, pokud se provádění nepodaří splnit určité požadavky.

**`require()`**: `require` se definuje na začátku funkcí a zajišťuje, že jsou splněny předem definované podmínky před spuštěním volané funkce. Příkaz `require` lze použít k ověření vstupů uživatele, kontrole stavových proměnných nebo ověření identity volajícího účtu před pokračováním ve funkci.

**`assert()`**: `assert()` se používá k detekci vnitřních chyb a kontrole porušení „invariantů“ ve vašem kódu. Invariant je logické tvrzení o stavu kontraktu, které by mělo platit pro všechny exekuce funkcí. Příkladem invariantu je maximální celková nabídka nebo zůstatek tokenového kontraktu. Použití `assert()` zajišťuje, že váš kontrakt nikdy nedosáhne zranitelného stavu, a pokud ano, všechny změny stavových proměnných se vrátí zpět.

**`revert()`**: `revert()` lze použít v příkazu if-else, který spustí výjimku, pokud není splněna požadovaná podmínka. Níže uvedený ukázkový kontrakt používá `revert()` k ochraně provádění funkcí:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Nebylo poskytnuto dostatek etherů.");
        // Proveďte nákup.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testujte chytré kontrakty a ověřujte správnost kódu {#test-smart-contracts-and-verify-code-correctness}

Neměnnost kódu běžícího v [Ethereum Virtual Machine](/developers/docs/evm/) znamená, že chytré kontrakty vyžadují vyšší úroveň hodnocení kvality během vývojové fáze. Důkladné testování vašeho kontraktu a sledování jakýchkoli neočekávaných výsledků výrazně zvýší bezpečnost a dlouhodobě ochrání vaše uživatele.

Obvyklou metodou je psát malé jednotkové testy (unit tests) pomocí mock dat, která kontrakt očekává od uživatelů. [Jednotkové testování](/developers/docs/smart-contracts/testing/#unit-testing) je dobré pro testování funkčnosti určitých funkcí a zajištění, že chytrý kontrakt funguje podle očekávání.

Jednotkové testování je při zajištění bezpečnosti smart kontraktů účinné bohužel jen minimálně, pokud se používá izolovaně. Jednotkový test může prokázat, že funkce správně provádí operace s mock daty, ale obecně jsou jednotkové testy účinné pouze do té míry, jak jsou napsány. To ztěžuje detekci opomenutých hraničních případů a zranitelností, které by mohly ohrozit bezpečnost vašeho smart kontraktu.

Lepším přístupem je kombinovat jednotkové testování s testováním založeným na vlastnostech, které se provádí pomocí [statické a dynamické analýzy](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Statická analýza se spoléhá na nízkoúrovňové reprezentace, jako jsou [grafy toku řízení](https://en.wikipedia.org/wiki/Control-flow_graph) a [abstraktní syntaktické stromy](https://deepsource.io/glossary/ast/) k analýze dosažitelných stavů programu a cest provádění. Mezitím techniky dynamické analýzy, jako je [fuzzing chytrých kontraktů](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), spouštějí kód kontraktu s náhodnými vstupními hodnotami, aby odhalily operace, které porušují bezpečnostní vlastnosti.

[Formální ověření](/developers/docs/smart-contracts/formal-verification) je další technika pro ověřování bezpečnostních vlastností v chytrých kontraktech. Na rozdíl od běžného testování může formální verifikace definitivně prokázat nepřítomnost chyb ve smart kontraktu. Toho lze docílit vytvořením formální specifikace, která zachycuje požadované bezpečnostní vlastnosti, a prokázáním, že formální model kontraktů odpovídá této specifikaci.

### 4. Požádejte o nezávislou revizi svého kódu {#get-independent-code-reviews}

Po testování vašeho kontraktu je dobré požádat jiné osoby, aby zkontrolovaly zdrojový kód a odhalily případné bezpečnostní problémy. Testování neodhalí všechny chyby ve smart kontraktu, ale nezávislé přezkoumání zvyšuje možnost odhalení zranitelností.

#### Audity {#audits}

Zajištění auditu smart kontraktů je jedním ze způsobů, jak provést nezávislé přezkoumání kódu. Auditoři hrají důležitou roli při zajišťování, že smart kontrakty jsou bezpečné a bez defektů kvality a návrhových chyb.

Je však důležité nenahlížet na audity jako na všelék. Audity smart kontraktů neodhalí každou chybu a jsou navrženy především pro poskytování dalšího kola kontrol, které mohou pomoci odhalit problémy, které vývojáři během počátečního vývoje a testování přehlédli. Doporučuje se dodržovat osvědčené postupy při práci s auditory, jako je řádné dokumentování kódu a přidávání komentářů, aby se přínos takového auditu maximalizoval.

- [Tipy a triky pro auditování chytrých kontraktů](https://twitter.com/tinchoabbate/status/1400170232904400897) – _@tinchoabbate_
- [Využijte svůj audit na maximum](https://inference.ag/blog/2023-08-14-tips/) – _Inference_

#### Odměny za nalezení chyb {#bug-bounties}

Zřízení programu bug bounty, tedy programu odměn za vyřešení chyb, je dalším přístupem k implementaci externích kontrol kódu. Bug bounty je finanční odměna poskytovaná jednotlivcům (obvykle whitehat hackerům), kteří objeví zranitelnosti v aplikaci.

Při správném použití bug bounty motivuje členy hackerské komunity k inspekci vašeho kódu a odhalení kritických chyb. Příkladem z reálného života je chyba „nekonečných peněz“, která by útočníkovi umožnila vytvořit neomezené množství etheru na [Optimism](https://www.optimism.io/), protokolu [druhé vrstvy](/layer-2/) běžícím na Ethereu. Naštěstí whitehat hacker [objevil chybu](https://www.saurik.com/optimism.html) a informoval tým, za což [získal velkou odměnu](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Užitečnou strategií je nastavit odměnu v programu bug bounty v poměru k výši prostředků, které jsou v sázce. Tento přístup, popisovaný jako „[scaling bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)“, poskytuje finanční pobídky pro jednotlivce, aby zodpovědně zveřejňovali zranitelnosti, místo aby je zneužívali.

### 5. Dodržujte osvědčené postupy při vývoji chytrých kontraktů {#follow-smart-contract-development-best-practices}

Existence auditů a bug bounty vás nezbavuje odpovědnosti za psaní kvalitního kódu. Bezpečnost smart kontraktů začíná dodržováním správných návrhových a vývojových procesů:

- Ukládejte veškerý kód do systému správy verzí, jako je git

- Všechny úpravy kódu dělejte prostřednictvím pull requestů

- Zajistěte, aby měl každý pull request alespoň jednoho nezávislého recenzenta – pokud pracujete na projektu sami, zvažte, zda nenajít jiné vývojáře a poprosit je o vzájemné recenzování vašich kódů

- Používejte [vývojové prostředí](/developers/docs/frameworks/) pro testování, kompilaci a nasazování chytrých kontraktů

- Prožeňte svůj kód základními nástroji pro analýzu kódu, jako jsou [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril a Slither. Ideálně byste to měli udělat před každým sloučením pull requestu a porovnat rozdíly ve výstupu

- Ujistěte se, že váš kód se kompiluje bez chyb a kompilátor Solidity nevydává žádná varování

- Správně dokumentujte svůj kód (pomocí [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) a popisujte podrobnosti o architektuře kontraktu ve snadno srozumitelném jazyce. To usnadní audit a přezkoumání vašeho kódu.

### 6. Implementujte robustní plány pro zotavení po havárii {#implement-disaster-recovery-plans}

Navrhování bezpečných přístupových kontrol, implementace modifikátorů funkcí a další doporučení mohou zlepšit bezpečnost smart kontraktů, ale nemohou vyloučit možnost zlovolných útoků. Budování bezpečných smart kontraktů vyžaduje „přípravu na selhání“ a mít záložní plán pro efektivní reakci na útoky. Správný plán obnovy po nehodě zahrnuje některé nebo všechny z následujících komponent:

#### Upgrady kontraktů {#contract-upgrades}

I když jsou smart kontrakty na Ethereu ve výchozím nastavení neměnné, pomocí vzorů aktualizace je možné dosáhnout určité míry změny. Aktualizace kontraktů je nezbytná v případech, kdy kritická chyba činí váš starý kontrakt nepoužitelným a nasazení nové logiky je nejrealističtější možností.

Mechanismy aktualizace kontraktů fungují různě, ale jedním z populárních přístupů je „proxy vzor“. [Proxy vzory](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) rozdělují stav a logiku aplikace mezi _dva_ kontrakty. První kontrakt (tzv. „proxy kontrakt“) uchovává stavové proměnné (např. zůstatky uživatelů), zatímco druhý kontrakt (tzv. „logický kontrakt“) obsahuje kód pro vykonávání funkcí kontraktu.

Účty interagují s proxy kontraktem, který odesílá všechna volání funkcí do logického kontraktu pomocí nízkoúrovňového volání [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Na rozdíl od běžného volání zprávy `delegatecall()` zajišťuje, že kód spuštěný na adrese logického kontraktu je prováděn v kontextu volajícího kontraktu. To znamená, že logický kontrakt bude vždy zapisovat do úložiště proxy (místo do svého vlastního úložiště) a původní hodnoty `msg.sender` a `msg.value` jsou zachovány.

Delegování volání na logický kontrakt vyžaduje uložení jeho adresy do úložiště proxy kontraktu. Proto je aktualizace logiky kontraktu pouze otázkou nasazení nového logického kontraktu a uložení nové adresy do proxy kontraktu. Následná volání proxy kontraktu jsou pak automaticky směrována na nový logický kontrakt, čímž dojde k „aktualizaci“ kontraktu bez skutečné modifikace kódu.

[Více o upgradování kontraktů](/developers/docs/smart-contracts/upgrading/).

#### Nouzové zastavení {#emergency-stops}

Jak již bylo zmíněno, i přes rozsáhlé audity a testování není možné objevit úplně všechny chyby ve smart kontraktu. Pokud se po nasazení objeví ve vašem kódu zranitelnost, její oprava je nemožná, protože nemůžete změnit kód běžící na adrese kontraktu. Navíc implementace mechanismů aktualizace (např. proxy vzory) může nějakou chvíli trvat (často vyžaduje schválení několika subjektů), což dává útočníkům více času a mohou tak způsobit větší škody.

Nejradikálnější možností je implementovat funkci „nouzového zastavení“, která zablokuje volání zranitelných funkcí v kontraktu. Nouzové zastavení obvykle zahrnuje následující komponenty:

1. Globální Booleanovská proměnná, která indikuje, zda je smart kontrakt zastaven, či nikoli. Tato proměnná je při nastavování kontraktu nastavena na `false`, ale po zastavení kontraktu se vrátí na `true`.

2. Funkce, které odkazují na Booleanovskou proměnnou při jejich provádění. Tyto funkce jsou přístupné, když smart kontrakt není pozastaven, a stávají se nepřístupnými, když je funkce nouzového zastavení aktivována.

3. Entita, která má přístup k funkci nouzového zastavení, která nastavuje booleovskou proměnnou na `true`. Aby se zabránilo zlovolným akcím, lze volání této funkce omezit na důvěryhodnou adresu (např. vlastníka kontraktu).

Jakmile je nouzové zastavení aktivováno, určité funkce nebudou volatelné. Toho lze dosáhnout obalením vybraných funkcí v modifikátoru, který odkazuje na globální proměnnou. Níže je [příklad](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol), který popisuje implementaci tohoto vzoru v kontraktech:

```solidity
// Tento kód nebyl profesionálně auditován a neslibuje žádnou bezpečnost ani správnost. Používejte na vlastní nebezpečí.

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
        // Zde zkontrolujte autorizaci msg.sender
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Zde probíhá logika vkladu
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Zde probíhá nouzový výběr
    }
}
```

Tento příklad ukazuje základní funkce nouzového zastavení:

- `isStopped` je booleovská hodnota, která se na začátku vyhodnotí jako `false` a jako `true`, když kontrakt vstoupí do nouzového režimu.

- Modifikátory funkcí `onlyWhenStopped` a `stoppedInEmergency` kontrolují proměnnou `isStopped`. `stoppedInEmergency` se používá k řízení funkcí, které by měly být nepřístupné, když je kontrakt zranitelný (např. `deposit()`). Volání těchto funkcí se jednoduše zruší.

`onlyWhenStopped` se používá pro funkce, které by měly být volatelné během nouzového stavu (např. `emergencyWithdraw()`). Tyto funkce mohou pomoci situaci vyřešit, a proto jsou vyloučeny ze seznamu „omezených funkcí“.

Použití funkce nouzového zastavení poskytuje efektivní řešení vážných zranitelností smart kontraktu. Nicméně to zvyšuje nutnost uživatelů důvěřovat vývojářům, že tuto funkci neaktivují z vlastních sobeckých důvodů. Za tímto účelem je možné decentralizovat kontrolu nad nouzovým zastavením buď tím, že bude podléhat hlasovacímu mechanismu na blockchainu, časovému zámku nebo schválení z multisig peněženky.

#### Monitorování událostí {#event-monitoring}

[Události](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) umožňují sledovat volání funkcí chytrých kontraktů a monitorovat změny stavových proměnných. Ideální je naprogramovat váš smart kontrakt tak, aby zapsal událost pokaždé, když nějaká strana provede bezpečnostně kritickou akci (např. výběr prostředků).

Protokolování událostí a jejich monitorování mimo blockchain poskytuje přehled o činnostech kontraktu a pomáhá rychleji odhalit škodlivé akce. To znamená, že váš tým může rychleji reagovat na útoky a podniknout kroky ke zmírnění dopadu na uživatele, jako je pozastavení funkcí nebo provedení aktualizace.

Můžete si také vybrat hotový nástroj pro monitorování, který automaticky přeposílá upozornění pokaždé, když někdo interaguje s vašimi kontrakty. Tyto nástroje vám umožní vytvářet vlastní upozornění na základě různých spouštěcích událostí, jako je objem transakcí, četnost volání funkcí nebo specifické funkce zapojené do transakce. Například byste mohli naprogramovat upozornění, které se objeví, když částka vybraná v jedné transakci překročí určitou prahovou hodnotu.

### 7. Navrhněte bezpečné systémy správy {#design-secure-governance-systems}

Možná budete chtít decentralizovat svou aplikaci tím, že předáte kontrolu nad hlavními smart kontrakty členům komunity. V tomto případě bude systém chytrých kontraktů zahrnovat řídicí modul — mechanismus, který členům komunity umožní schvalovat administrativní kroky prostřednictvím systému řízení na blockchainu. Například návrh na aktualizaci proxy kontraktu na novou implementaci může být odhlasován držiteli tokenů.

Decentralizované řízení může být prospěšné, zejména proto, že sladí zájmy vývojářů a koncových uživatelů. Nicméně mechanismy správy smart kontraktů mohou při nesprávné implementaci představovat nové riziko. Pravděpodobný scénář je, že útočník získá obrovskou hlasovací sílu (měřenou počtem držených tokenů) tím, že si vezme [bleskovou půjčku](/defi/#flash-loans) a protlačí škodlivý návrh.

Jedním ze způsobů, jak předcházet problémům souvisejícím se správou na blockchainu, je [použití časového zámku](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Časový zámek brání smart kontraktu v provádění předem daných akcí, dokud neuplyne stanovené množství času. Další strategie zahrnují přiřazení „váhy hlasu“ každému tokenu na základě toho, jak dlouho ho adresa držela, nebo měření hlasovací síly adresy v historickém období (například 2–3 bloky v minulosti) namísto aktuálního bloku. Obě metody snižují možnosti rychlého získávání hlasovací síly za účelem ovlivnění hlasování na blockchainu.

Více o [navrhování bezpečných systémů správy](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [různých mechanismech hlasování v DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) a [běžných vektorech útoků na DAO s využitím DeFi](https://dacian.me/dao-governance-defi-attacks) ve sdílených odkazech.

### 8. Snižte složitost kódu na minimum {#reduce-code-complexity}

Vývojáři tradičních softwarů znají princip KISS („Keep It Simple, Stupid“), který doporučuje zbytečně softwarový design nekomplikovat. Tento princip vychází z myšlenky, že „komplexní systémy selhávají složitým způsobem“ a jsou náchylnější k nákladným chybám.

Udržování jednoduchosti je zvláště důležité při psaní smart kontraktů, vzhledem k tomu, že smart kontrakty potenciálně spravují velké objemy aktiv. Tipem pro dosažení jednoduchosti při psaní chytrých kontraktů je, pokud je to možné, opětovné použití existujících knihoven, jako jsou [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/). Protože tyto knihovny byly důkladně auditovány a testovány vývojáři, jejich použití snižuje pravděpodobnost chyb při psaní nové funkcionality od začátku.

Dalším běžným doporučením je psát malé funkce a udržovat smart kontrakty modulární rozdělením obchodní logiky mezi více kontraktů. Nejenže psaní jednoduššího kódu snižuje možnosti útoku na váš smart kontrakt, ale také usnadňuje ověřování správnosti celého systému a včasné odhalení možných návrhových chyb.

### 9. Obrana proti běžným zranitelnostem chytrých kontraktů {#mitigate-common-smart-contract-vulnerabilities}

#### Opětovný vstup (reentrancy) {#reentrancy}

EVM neumožňuje souběžné zpracování (konkurenci), což znamená, že dva kontrakty zapojené do volání zprávy nemohou běžet současně. Externí volání pozastaví exekuci a paměť volajícího kontraktu, dokud se volání nevrátí, načež provádění pokračuje normálně. Tento proces lze formálně popsat jako předání [toku řízení](https://www.computerhope.com/jargon/c/contflow.htm) jinému kontraktu.

Ačkoli je tento proces většinou neškodný, předání řízení nedůvěryhodným kontraktům může způsobit problémy, jako je reentrancy (opětovný vstup). Útok opětovným vstupem nastane, když škodlivý kontrakt znovu volá do zranitelného kontraktu, než je původní funkce dokončena. Tento typ útoku je nejlepší vysvětlovat na příkladu.

Mějme jednoduchý chytrý kontrakt (Victim), který umožňuje komukoli vložit a vybrat ether:

```solidity
// Tento kontrakt je zranitelný. Nepoužívejte v produkčním prostředí

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

Tento kontrakt odhaluje funkci `withdraw()`, která uživatelům umožňuje vybrat ETH dříve vložené do kontraktu. Při zpracování výběru kontrakt provádí následující operace:

1. Zjistí zůstatek ETH uživatele
2. Odešle prostředky na volající adresu
3. Resetuje jejich zůstatek na 0, aby zabránil dalším výběrům od uživatele

Funkce `withdraw()` v kontraktu `Victim` se řídí vzorem „kontrola-interakce-efekty“. Nejprve _zkontroluje_, zda jsou splněny podmínky nutné pro provedení (tj. zda má uživatel kladný zůstatek ETH), a provede _interakci_ odesláním ETH na adresu volajícího, než aplikuje _efekty_ transakce (tj. sníží zůstatek uživatele).

Pokud je `withdraw()` volána z externě vlastněného účtu (EOA), funkce se provede podle očekávání: `msg.sender.call.value()` odešle ETH volajícímu. Pokud je však `msg.sender` účet chytrého kontraktu a volá `withdraw()`, odeslání prostředků pomocí `msg.sender.call.value()` spustí také kód uložený na této adrese.

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

Není na tom nic špatného, kromě toho, že `Attacker` má další funkci, která znovu volá `withdraw()` v `Victim`, pokud je zbývající gas z příchozího `msg.sender.call.value` více než 40 000. To dává `Attackerovi` schopnost znovu vstoupit do `Victim` a vybrat více prostředků _před_ dokončením prvního volání `withdraw`. Tento cyklus vypadá následovně:

```solidity
- EOA útočníka volá `Attacker.beginAttack()` s 1 ETH
- `Attacker.beginAttack()` vloží 1 ETH do `Victim`
- `Attacker` volá `withdraw()` v `Victim`
- `Victim` zkontroluje zůstatek `Attacker` (1 ETH)
- `Victim` pošle 1 ETH `Attackerovi` (což spustí výchozí funkci)
- `Attacker` znovu volá `Victim.withdraw()` (všimněte si, že `Victim` nesnížil zůstatek `Attacker` z prvního výběru)
- `Victim` zkontroluje zůstatek `Attacker` (který je stále 1 ETH, protože neaplikoval efekty prvního volání)
- `Victim` pošle 1 ETH `Attackerovi` (což spustí výchozí funkci a umožní `Attackerovi` znovu vstoupit do funkce `withdraw`)
- Proces se opakuje, dokud `Attackerovi` nedojde gas, v tu chvíli `msg.sender.call.value` vrátí hodnotu bez spuštění dalších výběrů
- `Victim` nakonec aplikuje výsledky první transakce (a následujících) na svůj stav, takže zůstatek `Attacker` je nastaven na 0
```

Výsledkem je, že následná vyvolání budou úspěšná a umožní volajícímu vybrat svůj zůstatek vícekrát, protože zůstatek volajícího není nastaven na 0, dokud se nedokončí provedení funkce. Tento druh útoku může být použit k vyčerpání prostředků z chytrého kontraktu, jako se to stalo při [hacku DAO v roce 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Útoky opětovným vstupem (reentrancy) jsou pro chytré kontrakty stále kritickým problémem, jak ukazují [veřejné seznamy zneužití reentrancy útoků](https://github.com/pcaversaccio/reentrancy-attacks).

##### Jak zabránit útokům opětovným vstupem

Přístupem k řešení opětovného vstupu je dodržování vzoru [kontrola-efekty-interakce](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Tento vzor uspořádává provádění funkcí takovým způsobem, že kód, který provádí nezbytné kontroly před pokračováním v exekuci, je proveden jako první, následovaný kódem, který manipuluje se stavem kontraktu, a kód, který interaguje s jinými kontrakty nebo EOA, přichází na řadu jako poslední.

Vzor kontrola-efekty-interakce je použit v revidované verzi kontraktu `Victim`, která je uvedena níže:

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

Tento kontrakt provádí _kontrolu_ zůstatku uživatele, aplikuje _efekty_ funkce `withdraw()` (nastavením zůstatku uživatele na 0) a poté pokračuje v _interakci_ (odesláním ETH na adresu uživatele). Tímto způsobem kontrakt aktualizuje svůj stav před externím voláním, čímž eliminuje podmínku opětovného vstupu, která umožňovala původní útok. Kontrakt `Attacker` by stále mohl znovu volat do `NoLongerAVictim`, ale protože `balances[msg.sender]` byla nastavena na 0, další výběry vyvolají chybu.

Další možností je použití zámku pro vzájemné vyloučení (běžně označovaného jako „mutex“), který uzamkne část stavu kontraktu, dokud se nedokončí volání funkce. To je implementováno pomocí booleovské proměnné, která je nastavena na `true` před provedením funkce a po dokončení volání se vrací na hodnotu `false`. Jak je vidět v níže uvedeném příkladu, použití mutexu chrání funkci před rekurzivními voláními, zatímco původní volání je stále zpracováváno, což účinně zastavuje reentrancy.

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
    // Tato funkce je chráněna mutexem, takže reentrantní volání z `msg.sender.call` nemohou znovu volat `withdraw`.
    // Příkaz `return` se vyhodnotí jako `true`, ale stále vyhodnocuje příkaz `locked = false` v modifikátoru
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Můžete také použít systém [pull payments](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment), který vyžaduje, aby si uživatelé vybírali prostředky z chytrých kontraktů, namísto systému „push payments“, který prostředky na účty odesílá. Tím se eliminuje možnost neúmyslného spuštění kódu na neznámých adresách (a může také zabránit určitým útokům typu denial-of-service).

#### Celočíselné podtečení a přetečení {#integer-underflows-and-overflows}

Přetečení celého čísla nastává, když výsledek aritmetické operace překročí přijatelný rozsah hodnot, což způsobí „přetočení“ na nejnižší reprezentovatelnou hodnotu. Například `uint8` může ukládat pouze hodnoty do 2^8-1=255. Aritmetické operace, které vedou k hodnotám vyšším než `255`, přetečou a resetují `uint` na `0`, podobně jako se počítadlo kilometrů v autě resetuje na 0, když dosáhne maximálního nájezdu (999999).

Podtečení celého čísla se děje ze stejných důvodů: výsledek aritmetické operace klesne pod přijatelný rozsah. Řekněme, že byste se pokusili snížit `0` v `uint8`, výsledek by se jednoduše přetočil na maximální reprezentovatelnou hodnotu (`255`).

Přetečení i podtečení celých čísel může vést k neočekávaným změnám proměnných stavu kontraktu a způsobit neplánovanou exekuci. Níže je uveden příklad, jak může útočník zneužít aritmetické přetečení ve smart kontraktu k provedení neplatné operace:

```
pragma solidity ^0.7.6;

// Tento kontrakt je navržen tak, aby fungoval jako časový trezor.
// Uživatel může do tohoto kontraktu vkládat, ale nemůže vybírat po dobu nejméně jednoho týdne.
// Uživatel může také prodloužit čekací dobu nad 1 týden čekací lhůty.

/*
1. Nasaďte TimeLock
2. Nasaďte Attack s adresou TimeLock
3. Zavolejte Attack.attack a pošlete 1 ether. Budete moci okamžitě vybrat
   svůj ether.

Co se stalo?
Attack způsobil přetečení TimeLock.lockTime a byl schopen vybrat
před uplynutím 1týdenní čekací doby.
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
        require(balances[msg.sender] > 0, "Nedostatečné prostředky");
        require(block.timestamp > lockTime[msg.sender], "Doba uzamčení nevypršela");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Nepodařilo se odeslat ether");
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

Od verze 0.8.0 kompilátor Solidity odmítá kód, který by vedl k podtečení nebo přetečení celých čísel. Kontrakty kompilované nižší verzí kompilátoru by však měly buď provádět kontroly funkcí zahrnujících aritmetické operace, nebo používat knihovnu (např. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)), která kontroluje podtečení/přetečení.

#### Manipulace s orákulem {#oracle-manipulation}

[Orákula](/developers/docs/oracles/) získávají informace mimo blockchain a posílají je na blockchain, kde je mohou použít chytré kontrakty. Pomocí orákul můžete navrhovat chytré kontrakty, které spolupracují se systémy mimo blockchain, jako jsou kapitálové trhy, což výrazně rozšiřuje jejich využití.

Pokud je však orákulum poškozeno a posílá nesprávné informace na blockchain, kód chytrých kontraktů bude vykonáván na základě chybných vstupů, což může způsobit problémy. To je podstatou „problému orákulí“, který se týká úkolu zajistit, aby informace z blockchainového orákula byly přesné, aktuální a včasné.

Souvisejícím bezpečnostním problémem je použití orákula na blockchainu, například decentralizované burzy, k získání aktuální ceny aktiva. Půjčovací platformy v odvětví [decentralizovaných financí (DeFi)](/defi/) to často dělají, aby určily hodnotu zástavy uživatele a zjistily, kolik si může půjčit.

Ceny na DEX jsou často přesné, zejména díky arbitrážím, které obnovují paritu na trzích. Je však možné s nimi manipulovat, zejména pokud orákulum na blockchainu vypočítává ceny aktiv na základě historických obchodních vzorců (což se obvykle stává).

Útočník by mohl například uměle zvýšit spotovou cenu aktiva tím, že si vezme bleskovou půjčku těsně před interakcí s vaším půjčovacím kontraktem. Dotazování na cenu aktiva na DEX by vrátilo vyšší než normální hodnotu (kvůli velké „nákupní objednávce“ útočníka, která zkresluje poptávku po aktivu), což by mu umožnilo si půjčit více, než by měl. Takovéto „útoky na bleskové půjčky“ byly použity ke zneužití závislosti na cenových oráklech mezi aplikacemi DeFi, což stálo protokoly miliony finančních prostředků.

##### Jak zabránit manipulaci s orákly

Minimálním požadavkem, jak se [vyhnout manipulaci s orákulem](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples), je použití decentralizované sítě orákul, která dotazuje informace z více zdrojů, aby se zabránilo jednotlivým bodům selhání. Ve většině případů mají decentralizovaná orákula vestavěné kryptoekonomické pobídky, které motivují orákulové uzly k hlášení správných informací, což je činí bezpečnějšími než centralizovaná orákula.

Pokud plánujete dotazovat se blockchainového orákula na ceny aktiv, zvažte použití takového systému, který implementuje mechanismus časově vážené průměrné ceny (TWAP). [TWAP orákulum](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) dotazuje cenu aktiva ve dvou různých časových bodech (které můžete upravit) a vypočítá spotovou cenu na základě získaného průměru. Volba delších časových období chrání váš protokol proti manipulaci s cenami, protože velké objednávky provedené nedávno nemohou ovlivnit ceny aktiv.

## Zdroje pro zabezpečení chytrých kontraktů pro vývojáře {#smart-contract-security-resources-for-developers}

### Nástroje pro analýzu chytrých kontraktů a ověřování správnosti kódu {#code-analysis-tools}

- **[Testovací nástroje a knihovny](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** – _Sbírka standardních nástrojů a knihoven pro provádění jednotkových testů, statické analýzy a dynamické analýzy na chytrých kontraktech._

- **[Nástroje pro formální ověření](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** – _Nástroje pro ověřování funkční správnosti v chytrých kontraktech a kontrolu invariantů._

- **[Služby auditu chytrých kontraktů](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** – _Seznam organizací poskytujících služby auditu chytrých kontraktů pro vývojové projekty na Ethereu._

- **[Platformy pro odměny za nalezení chyb](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** – _Platformy pro koordinaci odměn za nalezení chyb a odměňování za zodpovědné odhalování kritických zranitelností v chytrých kontraktech._

- **[Fork Checker](https://forkchecker.hashex.org/)** – _bezplatný online nástroj pro kontrolu všech dostupných informací o forkovaném kontraktu._

- **[ABI Encoder](https://abi.hashex.org/)** – _bezplatná online služba pro kódování funkcí a argumentů konstruktorů vašich kontraktů v Solidity._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** – _Statický analyzátor pro Solidity, který prochází abstraktní syntaktické stromy (AST), aby odhalil podezřelé zranitelnosti a zobrazil problémy v přehledném formátu markdown._

### Nástroje pro monitorování chytrých kontraktů {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** – _nástroj pro získávání oznámení v reálném čase, když dojde k neobvyklým nebo neočekávaným událostem ve vašich chytrých kontraktech nebo peněženkách._

### Nástroje pro bezpečnou správu chytrých kontraktů {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** – _Peněženka s chytrým kontraktem běžící na Ethereu, která vyžaduje, aby transakci schválil minimální počet lidí (M z N), než může proběhnout._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** – _Knihovny kontraktů pro implementaci administrativních funkcí, včetně vlastnictví kontraktů, upgradů, řízení přístupu, správy, možnosti pozastavení a dalších._

### Služby auditu chytrých kontraktů {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** – _Služba auditu chytrých kontraktů, která pomáhá projektům napříč blockchainovým ekosystémem zajistit, aby jejich protokoly byly připraveny ke spuštění a vytvořeny tak, aby chránily uživatele._

- **[CertiK](https://www.certik.com/)** – _Blockchainová bezpečnostní firma, která je průkopníkem v používání nejmodernější technologie formálního ověřování na chytrých kontraktech a blockchainových sítích._

- **[Trail of Bits](https://www.trailofbits.com/)** – _Společnost zabývající se kybernetickou bezpečností, která kombinuje bezpečnostní výzkum s mentalitou útočníka s cílem snížit riziko a posílit kód._

- **[PeckShield](https://peckshield.com/)** – _Blockchainová bezpečnostní společnost nabízející produkty a služby pro bezpečnost, soukromí a použitelnost celého blockchainového ekosystému._

- **[QuantStamp](https://quantstamp.com/)** – _Auditorská služba usnadňující masové přijetí blockchainové technologie prostřednictvím služeb hodnocení bezpečnosti a rizik._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** – _Bezpečnostní společnost zabývající se chytrými kontrakty poskytující bezpečnostní audity pro distribuované systémy._

- **[Runtime Verification](https://runtimeverification.com/)** – _Bezpečnostní společnost specializující se na formální modelování a ověřování chytrých kontraktů._

- **[Hacken](https://hacken.io)** – _Auditor kybernetické bezpečnosti pro Web3, který přináší 360stupňový přístup k bezpečnosti blockchainu._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** – _Služby auditu v Solidity a Cairo, které zajišťují integritu chytrých kontraktů a bezpečnost uživatelů na Ethereu a Starknetu._

- **[HashEx](https://hashex.org/)** – _HashEx se zaměřuje na audit blockchainu a chytrých kontraktů s cílem zajistit bezpečnost kryptoměn a poskytuje služby, jako je vývoj chytrých kontraktů, penetrační testování a poradenství v oblasti blockchainu._

- **[Code4rena](https://code4rena.com/)** – _Soutěžní platforma pro audit, která motivuje experty na zabezpečení chytrých kontraktů, aby našli zranitelnosti a pomohli zvýšit bezpečnost webu3._

- **[CodeHawks](https://codehawks.com/)** – _Soutěžní platforma pro auditování, která pořádá soutěže v auditování chytrých kontraktů pro bezpečnostní výzkumníky._

- **[Cyfrin](https://cyfrin.io)** – _Lídr v oblasti zabezpečení Web3, inkubátor krypto bezpečnosti prostřednictvím produktů a služeb auditu chytrých kontraktů._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** – _Bezpečnostní firma pro Web3 nabízející bezpečnostní audity pro blockchainové systémy prostřednictvím týmu zkušených auditorů a nejlepších nástrojů ve své třídě._

- **[Oxorio](https://oxor.io/)** – _Audity chytrých kontraktů a bezpečnostní služby blockchainu s odbornými znalostmi v oblasti EVM, Solidity, ZK, cross-chain technologií pro krypto firmy a projekty DeFi._

- **[Inference](https://inference.ag/)** – _Bezpečnostní auditorská společnost, která se specializuje na audit chytrých kontraktů pro blockchainy založené na EVM. Díky svým odborným auditorům identifikují potenciální problémy a navrhují schůdná řešení k jejich odstranění ještě před nasazením._

### Platformy pro odměny za nalezení chyb {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** – _Platforma pro odměny za nalezení chyb ve chytrých kontraktech a projektech DeFi, kde bezpečnostní výzkumníci revidují kód, odhalují zranitelnosti, dostávají zaplaceno a zvyšují bezpečnost kryptoměn._

- **[HackerOne](https://www.hackerone.com/)** – _Platforma pro koordinaci zranitelností a odměn za nalezení chyb, která spojuje podniky s testery penetrací a výzkumníky kybernetické bezpečnosti._

- **[HackenProof](https://hackenproof.com/)** – _Expertní platforma pro odměny za nalezení chyb pro krypto projekty (DeFi, chytré kontrakty, peněženky, CEX a další), kde bezpečnostní profesionálové poskytují služby třídění a výzkumníci dostávají zaplaceno za relevantní, ověřená hlášení chyb._

- **[Sherlock](https://www.sherlock.xyz/)** – _Pojistitel ve Web3 pro zabezpečení chytrých kontraktů, s výplatami pro auditory řízenými prostřednictvím chytrých kontraktů, aby se zajistilo, že relevantní chyby budou spravedlivě zaplaceny._

- **[CodeHawks](https://www.codehawks.com/)** – _Soutěžní platforma pro odměny za nalezení chyb, kde se auditoři účastní bezpečnostních soutěží a výzev a (brzy) i vlastních soukromých auditů._

### Publikace známých zranitelností a zneužití chytrých kontraktů {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Známé útoky na chytré kontrakty](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** – _Vysvětlení nejvýznamnějších zranitelností kontraktů pro začátečníky, s ukázkovým kódem pro většinu případů._

- **[SWC Registry](https://swcregistry.io/)** – _Kurátorovaný seznam položek Common Weakness Enumeration (CWE), které se vztahují na chytré kontrakty Etherea._

- **[Rekt](https://rekt.news/)** – _Pravidelně aktualizovaná publikace významných krypto hacků a zneužití, spolu s podrobnými post-mortem zprávami._

### Výzvy pro učení se zabezpečení chytrých kontraktů {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** – _Kurátorovaný seznam blockchainových bezpečnostních válečných her, výzev a soutěží [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) a řešení._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** – _Válečná hra, ve které se naučíte útočnou bezpečnost chytrých kontraktů DeFi a získáte dovednosti v oblasti hledání chyb a bezpečnostního auditu._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** – _Válečná hra založená na Web3/Solidity, kde každá úroveň představuje chytrý kontrakt, který je třeba „hacknout“._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** – _Výzva v hackování chytrých kontraktů, zasazená do fantasy dobrodružství. Úspěšné splnění výzvy také umožňuje přístup do soukromého programu odměn za řešení chyb._

### Osvědčené postupy pro zabezpečení chytrých kontraktů {#smart-contract-security-best-practices}

- **[ConsenSys: Osvědčené postupy pro bezpečnost chytrých kontraktů na Ethereu](https://consensys.github.io/smart-contract-best-practices/)** – _Komplexní seznam pokynů pro zabezpečení chytrých kontraktů na Ethereu._

- **[Nascent: Jednoduchý bezpečnostní toolkit](https://github.com/nascentxyz/simple-security-toolkit)** – _Sbírka praktických průvodců a kontrolních seznamů zaměřených na bezpečnost při vývoji chytrých kontraktů._

- **[Vzory v Solidity](https://fravoll.github.io/solidity-patterns/)** – _Užitečná kompilace bezpečných vzorů a osvědčených postupů pro programovací jazyk chytrých kontraktů Solidity._

- **[Dokumentace Solidity: Bezpečnostní aspekty](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** – _Pokyny pro psaní bezpečných chytrých kontraktů v Solidity._

- **[Standard ověřování bezpečnosti chytrých kontraktů](https://github.com/securing/SCSVS)** – _Čtrnáctidílný kontrolní seznam vytvořený za účelem standardizace zabezpečení chytrých kontraktů pro vývojáře, architekty, bezpečnostní recenzenty a prodejce._

- **[Učte se zabezpečení a auditování chytrých kontraktů](https://updraft.cyfrin.io/courses/security)** – _Komplexní kurz bezpečnosti a auditu chytrých kontraktů vytvořený pro vývojáře chytrých kontraktů, kteří chtějí zlepšit své osvědčené postupy v oblasti bezpečnosti a stát se bezpečnostními výzkumníky._

### Návody na zabezpečení chytrých kontraktů {#tutorials-on-smart-contract-security}

- [Jak psát bezpečné chytré kontrakty](/developers/tutorials/secure-development-workflow/)

- [Jak používat Slither k nalezení chyb v chytrých kontraktech](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jak používat Manticore k nalezení chyb v chytrých kontraktech](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Pokyny pro bezpečnost chytrých kontraktů](/developers/tutorials/smart-contract-security-guidelines/)

- [Jak bezpečně integrovat váš tokenový kontrakt s libovolnými tokeny](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft – kompletní kurz zabezpečení a auditu chytrých kontraktů](https://updraft.cyfrin.io/courses/security)
