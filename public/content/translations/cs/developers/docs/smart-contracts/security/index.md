---
title: Bezpečnost chytrých kontraktů
description: Přehled pokynů pro tvorbu bezpečných chytrých kontraktů na Ethereu
lang: cs
---

Chytré kontrakty jsou extrémně flexibilní a schopné ovládat velké množství hodnoty a dat, přičemž spouštějí neměnnou logiku založenou na kódu nasazeném na blockchainu. To vytvořilo živý ekosystém decentralizovaných aplikací nevyžadujících důvěru, které poskytují mnoho výhod oproti starším systémům. Představují také příležitosti pro útočníky, kteří se snaží profitovat zneužitím zranitelností v chytrých kontraktech.

Veřejné blockchainy, jako je [Ethereum](/), dále komplikují problematiku zabezpečení chytrých kontraktů. Nasazený kód kontraktu _obvykle_ nelze změnit za účelem opravy bezpečnostních chyb, zatímco aktiva ukradená z chytrých kontraktů je extrémně obtížné sledovat a kvůli neměnnosti jsou většinou nenávratná.

Ačkoli se údaje liší, odhaduje se, že celková hodnota ukradená nebo ztracená kvůli bezpečnostním chybám v chytrých kontraktech snadno přesahuje 1 miliardu dolarů. To zahrnuje ostře sledované incidenty, jako je [hacknutí DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (ukradeno 3,6 milionu ETH v hodnotě přes 1 miliardu dolarů v dnešních cenách), [hacknutí multisig peněženky Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (ztráta 30 milionů dolarů ve prospěch hackerů) a [problém se zmrazenou peněženkou Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (přes 300 milionů dolarů v ETH navždy uzamčeno).

Výše zmíněné problémy činí pro vývojáře nezbytným investovat úsilí do budování bezpečných, robustních a odolných chytrých kontraktů. Bezpečnost chytrých kontraktů je vážná věc a každý vývojář udělá dobře, když se o ní poučí. Tento průvodce se bude zabývat bezpečnostními aspekty pro vývojáře na Ethereu a prozkoumá zdroje pro zlepšení bezpečnosti chytrých kontraktů.

## Předpoklady {#prerequisites}

Ujistěte se, že znáte [základy vývoje chytrých kontraktů](/developers/docs/smart-contracts/), než se pustíte do bezpečnosti.

## Pokyny pro tvorbu bezpečných chytrých kontraktů na Ethereu {#smart-contract-security-guidelines}

### 1. Navrhněte správné řízení přístupu {#design-proper-access-controls}

V chytrých kontraktech mohou být funkce označené jako `public` nebo `external` volány jakýmikoli externě vlastněnými účty (EOA) nebo účty kontraktů. Specifikace veřejné viditelnosti (public) pro funkce je nezbytná, pokud chcete, aby s vaším kontraktem mohli interagovat ostatní. Funkce označené jako `private` však mohou být volány pouze funkcemi uvnitř samotného chytrého kontraktu, nikoli externími účty. Poskytnutí přístupu k funkcím kontraktu každému účastníkovi sítě může způsobit problémy, zejména pokud to znamená, že kdokoli může provádět citlivé operace (např. ražení nových tokenů).

Aby se zabránilo neoprávněnému použití funkcí chytrého kontraktu, je nutné implementovat bezpečné řízení přístupu. Mechanismy řízení přístupu omezují možnost používat určité funkce v chytrém kontraktu pouze na schválené subjekty, jako jsou účty odpovědné za správu kontraktu. **Vzor Ownable** a **řízení přístupu na základě rolí (role-based control)** jsou dva vzory užitečné pro implementaci řízení přístupu v chytrých kontraktech:

#### Vzor Ownable {#ownable-pattern}

Ve vzoru Ownable je během procesu vytváření kontraktu nastavena adresa jako „vlastník“ (owner) kontraktu. Chráněným funkcím je přiřazen modifikátor `OnlyOwner`, který zajišťuje, že kontrakt před spuštěním funkce ověří identitu volající adresy. Volání chráněných funkcí z jiných adres než od vlastníka kontraktu se vždy zvrátí, což zabraňuje nechtěnému přístupu.

#### Řízení přístupu na základě rolí {#role-based-access-control}

Registrace jediné adresy jako `Owner` v chytrém kontraktu přináší riziko centralizace a představuje jediný bod selhání (single point-of-failure). Pokud jsou klíče k účtu vlastníka kompromitovány, útočníci mohou napadnout vlastněný kontrakt. Proto může být lepší volbou použití vzoru řízení přístupu na základě rolí s více administrátorskými účty.

Při řízení přístupu na základě rolí je přístup k citlivým funkcím rozdělen mezi skupinu důvěryhodných účastníků. Například jeden účet může být zodpovědný za ražení tokenů, zatímco jiný účet provádí upgrady nebo pozastavuje kontrakt. Decentralizace řízení přístupu tímto způsobem eliminuje jediné body selhání a snižuje předpoklady důvěry pro uživatele.

##### Použití peněženek s vícenásobným podpisem {#use-require-assert-revert}

Dalším přístupem k implementaci bezpečného řízení přístupu je použití [účtu s vícenásobným podpisem](/developers/docs/smart-contracts/#multisig) ke správě kontraktu. Na rozdíl od běžného EOA jsou účty s vícenásobným podpisem vlastněny více subjekty a k provedení transakcí vyžadují podpisy od minimálního počtu účtů – řekněme 3 z 5.

Použití multisig pro řízení přístupu přináší další vrstvu zabezpečení, protože akce na cílovém kontraktu vyžadují souhlas více stran. To je obzvláště užitečné, pokud je nutné použít vzor Ownable, protože to ztěžuje útočníkovi nebo zlomyslnému insiderovi manipulaci s citlivými funkcemi kontraktu pro škodlivé účely.

### 2. Používejte příkazy require(), assert() a revert() k ochraně operací kontraktu {#test-smart-contracts-and-verify-code-correctness}

Jak již bylo zmíněno, kdokoli může volat veřejné funkce ve vašem chytrém kontraktu, jakmile je nasazen na blockchain. Vzhledem k tomu, že nemůžete předem vědět, jak budou externí účty s kontraktem interagovat, je ideální před nasazením implementovat interní ochranná opatření proti problematickým operacím. Správné chování v chytrých kontraktech můžete vynutit pomocí příkazů `require()`, `assert()` a `revert()`, které vyvolají výjimky a zvrátí změny stavu, pokud provádění nesplní určité požadavky.

**`require()`**: Příkazy `require` jsou definovány na začátku funkcí a zajišťují, že před spuštěním volané funkce jsou splněny předem definované podmínky. Příkaz `require` lze použít k ověření uživatelských vstupů, kontrole stavových proměnných nebo ověření identity volajícího účtu před pokračováním ve funkci.

**`assert()`**: Příkaz `assert()` se používá k detekci interních chyb a kontrole porušení „invariantů“ ve vašem kódu. Invariant je logické tvrzení o stavu kontraktu, které by mělo platit pro všechna spuštění funkcí. Příkladem invariantu je maximální celková nabídka nebo zůstatek tokenového kontraktu. Použití `assert()` zajišťuje, že se váš kontrakt nikdy nedostane do zranitelného stavu, a pokud ano, všechny změny stavových proměnných se vrátí zpět.

**`revert()`**: Příkaz `revert()` lze použít v příkazu if-else, který vyvolá výjimku, pokud není splněna požadovaná podmínka. Ukázkový kontrakt níže používá `revert()` k ochraně provádění funkcí:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Provést nákup.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testujte chytré kontrakty a ověřujte správnost kódu {#get-independent-code-reviews}

Neměnnost kódu běžícího v [Ethereum Virtual Machine](/developers/docs/evm/) znamená, že chytré kontrakty vyžadují vyšší úroveň hodnocení kvality během fáze vývoje. Rozsáhlé testování vašeho kontraktu a jeho sledování z hlediska jakýchkoli neočekávaných výsledků výrazně zlepší bezpečnost a z dlouhodobého hlediska ochrání vaše uživatele.

Obvyklou metodou je psaní malých jednotkových testů (unit tests) pomocí mock dat, která se očekává, že kontrakt obdrží od uživatelů. [Jednotkové testování](/developers/docs/smart-contracts/testing/#unit-testing) je dobré pro testování funkčnosti určitých funkcí a zajištění toho, že chytrý kontrakt funguje podle očekávání.

Bohužel, jednotkové testování je při izolovaném použití minimálně efektivní pro zlepšení bezpečnosti chytrých kontraktů. Jednotkový test může prokázat, že se funkce správně provádí pro mock data, ale jednotkové testy jsou jen tak efektivní, jak dobře jsou napsány. To ztěžuje detekci opomenutých okrajových případů a zranitelností, které by mohly narušit bezpečnost vašeho chytrého kontraktu.

Lepším přístupem je kombinovat jednotkové testování s testováním založeným na vlastnostech (property-based testing) prováděným pomocí [statické a dynamické analýzy](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Statická analýza se spoléhá na nízkoúrovňové reprezentace, jako jsou [grafy toku řízení (control flow graphs)](https://en.wikipedia.org/wiki/Control-flow_graph) a [abstraktní syntaktické stromy (abstract syntax trees)](https://deepsource.io/glossary/ast/), k analýze dosažitelných stavů programu a cest provádění. Mezitím techniky dynamické analýzy, jako je [fuzzing chytrých kontraktů](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), spouštějí kód kontraktu s náhodnými vstupními hodnotami, aby detekovaly operace, které porušují bezpečnostní vlastnosti.

[Formální verifikace](/developers/docs/smart-contracts/formal-verification) je další technikou pro ověřování bezpečnostních vlastností v chytrých kontraktech. Na rozdíl od běžného testování může formální verifikace průkazně dokázat absenci chyb v chytrém kontraktu. Toho je dosaženo vytvořením formální specifikace, která zachycuje požadované bezpečnostní vlastnosti, a dokázáním, že formální model kontraktů tuto specifikaci dodržuje.

### 4. Požádejte o nezávislou kontrolu vašeho kódu {#audits}

Po otestování vašeho kontraktu je dobré požádat ostatní, aby zkontrolovali zdrojový kód na případné bezpečnostní problémy. Testování neodhalí každou chybu v chytrém kontraktu, ale získání nezávislé kontroly zvyšuje pravděpodobnost odhalení zranitelností.

#### Audity {#bug-bounties}

Zadání auditu chytrého kontraktu je jedním ze způsobů, jak provést nezávislou kontrolu kódu. Auditoři hrají důležitou roli při zajišťování toho, že chytré kontrakty jsou bezpečné a bez kvalitativních vad a chyb v návrhu.

Přesto byste se měli vyvarovat toho, abyste audity považovali za všelék. Audity chytrých kontraktů nezachytí každou chybu a jsou většinou navrženy tak, aby poskytly další kolo kontrol, které může pomoci odhalit problémy přehlédnuté vývojáři během počátečního vývoje a testování. Měli byste také dodržovat osvědčené postupy pro spolupráci s auditory, jako je správné dokumentování kódu a přidávání vložených komentářů, abyste maximalizovali přínos auditu chytrého kontraktu.

- [Tipy a triky pro auditování chytrých kontraktů](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Vytěžte ze svého auditu maximum](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Bug bounty programy {#follow-smart-contract-development-best-practices}

Založení bug bounty programu je dalším přístupem k implementaci externích kontrol kódu. Bug bounty je finanční odměna udělovaná jednotlivcům (obvykle whitehat hackerům), kteří objeví zranitelnosti v aplikaci.

Při správném použití dávají bug bounty programy členům hackerské komunity motivaci zkoumat váš kód na kritické chyby. Příkladem z reálného života je „chyba nekonečných peněz“ (infinite money bug), která by útočníkovi umožnila vytvořit neomezené množství etheru na [Optimism](https://www.optimism.io/), protokolu [vrstvy 2 (l2)](/layer-2/) běžícím na Ethereu. Naštěstí whitehat hacker [tuto chybu objevil](https://www.saurik.com/optimism.html) a upozornil tým, [čímž si v procesu vydělal velkou odměnu](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Užitečnou strategií je nastavit výplatu bug bounty programu úměrně k množství ohrožených prostředků. Tento přístup, označovaný jako „[škálující bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)“, poskytuje jednotlivcům finanční pobídky k zodpovědnému zveřejnění zranitelností namísto jejich zneužití.

### 5. Dodržujte osvědčené postupy během vývoje chytrých kontraktů {#implement-disaster-recovery-plans}

Existence auditů a bug bounty programů vás nezbavuje odpovědnosti za psaní vysoce kvalitního kódu. Dobrá bezpečnost chytrých kontraktů začíná dodržováním správných procesů návrhu a vývoje:

- Ukládejte veškerý kód v systému pro správu verzí, jako je git

- Provádějte všechny úpravy kódu prostřednictvím pull requestů

- Zajistěte, aby pull requesty měly alespoň jednoho nezávislého recenzenta – pokud na projektu pracujete sami, zvažte nalezení dalších vývojářů a vzájemnou výměnu kontrol kódu

- Používejte [vývojové prostředí](/developers/docs/frameworks/) pro testování, kompilaci a nasazení chytrých kontraktů

- Prožeňte svůj kód základními nástroji pro analýzu kódu, jako jsou [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril a Slither. V ideálním případě byste to měli udělat před sloučením každého pull requestu a porovnat rozdíly ve výstupu

- Zajistěte, aby se váš kód zkompiloval bez chyb a kompilátor Solidity nevydával žádná varování

- Správně dokumentujte svůj kód (pomocí [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) a popište podrobnosti o architektuře kontraktu snadno srozumitelným jazykem. To ostatním usnadní audit a kontrolu vašeho kódu.

### 6. Implementujte robustní plány obnovy po havárii {#contract-upgrades}

Navrhování bezpečného řízení přístupu, implementace modifikátorů funkcí a další návrhy mohou zlepšit bezpečnost chytrých kontraktů, ale nemohou vyloučit možnost škodlivých exploitů. Budování bezpečných chytrých kontraktů vyžaduje „přípravu na selhání“ a záložní plán pro efektivní reakci na útoky. Správný plán obnovy po havárii bude zahrnovat některé nebo všechny z následujících komponent:

#### Upgrady kontraktů {#emergency-stops}

Ačkoli jsou chytré kontrakty na Ethereu ve výchozím nastavení neměnné, je možné dosáhnout určité míry měnitelnosti pomocí vzorů pro upgrade. Upgradování kontraktů je nezbytné v případech, kdy kritická chyba činí váš starý kontrakt nepoužitelným a nasazení nové logiky je nejschůdnější možností.

Mechanismy upgradu kontraktů fungují různě, ale „proxy vzor“ (proxy pattern) je jedním z populárnějších přístupů k upgradování chytrých kontraktů. [Proxy vzory](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) rozdělují stav a logiku aplikace mezi _dva_ kontrakty. První kontrakt (nazývaný ‚proxy kontrakt‘) ukládá stavové proměnné (např. zůstatky uživatelů), zatímco druhý kontrakt (nazývaný ‚logický kontrakt‘) obsahuje kód pro provádění funkcí kontraktu.

Účty interagují s proxy kontraktem, který odesílá všechna volání funkcí do logického kontraktu pomocí nízkoúrovňového volání [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Na rozdíl od běžného volání zprávy zajišťuje `delegatecall()`, že kód běžící na adrese logického kontraktu je spuštěn v kontextu volajícího kontraktu. To znamená, že logický kontrakt bude vždy zapisovat do úložiště proxy (místo do svého vlastního úložiště) a původní hodnoty `msg.sender` a `msg.value` zůstanou zachovány.

Delegování volání na logický kontrakt vyžaduje uložení jeho adresy v úložišti proxy kontraktu. Upgradování logiky kontraktu je tedy pouze otázkou nasazení dalšího logického kontraktu a uložení nové adresy v proxy kontraktu. Vzhledem k tomu, že následná volání proxy kontraktu jsou automaticky směrována na nový logický kontrakt, „upgradovali“ byste kontrakt, aniž byste skutečně upravili kód.

[Více o upgradování kontraktů](/developers/docs/smart-contracts/upgrading/).

#### Nouzová zastavení {#event-monitoring}

Jak již bylo zmíněno, rozsáhlé auditování a testování nemůže odhalit všechny chyby v chytrém kontraktu. Pokud se ve vašem kódu po nasazení objeví zranitelnost, její oprava je nemožná, protože nemůžete změnit kód běžící na adrese kontraktu. Také implementace mechanismů upgradu (např. proxy vzorů) může nějakou dobu trvat (často vyžadují schválení od různých stran), což útočníkům dává pouze více času na způsobení větších škod.

Krajním řešením je implementovat funkci „nouzového zastavení“ (emergency stop), která blokuje volání zranitelných funkcí v kontraktu. Nouzová zastavení obvykle zahrnují následující komponenty:

1. Globální booleovská proměnná indikující, zda je chytrý kontrakt v zastaveném stavu, či nikoli. Tato proměnná je při nastavování kontraktu nastavena na `false`, ale jakmile je kontrakt zastaven, změní se na `true`.

2. Funkce, které při svém provádění odkazují na booleovskou proměnnou. Takové funkce jsou přístupné, když chytrý kontrakt není zastaven, a stanou se nepřístupnými, když je spuštěna funkce nouzového zastavení.

3. Subjekt, který má přístup k funkci nouzového zastavení, která nastaví booleovskou proměnnou na `true`. Aby se zabránilo škodlivým akcím, může být volání této funkce omezeno na důvěryhodnou adresu (např. vlastníka kontraktu).

Jakmile kontrakt aktivuje nouzové zastavení, určité funkce nebudou volatelné. Toho je dosaženo zabalením vybraných funkcí do modifikátoru, který odkazuje na globální proměnnou. Níže je [příklad](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) popisující implementaci tohoto vzoru v kontraktech:

```solidity
// Tento kód nebyl profesionálně auditován a neposkytuje žádné záruky ohledně bezpečnosti nebo správnosti. Používejte na vlastní nebezpečí.

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

Tento příklad ukazuje základní vlastnosti nouzových zastavení:

- `isStopped` je booleovská hodnota, která se na začátku vyhodnotí jako `false` a jako `true`, když kontrakt vstoupí do nouzového režimu.

- Modifikátory funkcí `onlyWhenStopped` a `stoppedInEmergency` kontrolují proměnnou `isStopped`. `stoppedInEmergency` se používá k řízení funkcí, které by měly být nepřístupné, když je kontrakt zranitelný (např. `deposit()`). Volání těchto funkcí se jednoduše zvrátí.

`onlyWhenStopped` se používá pro funkce, které by měly být volatelné během nouze (např. `emergencyWithdraw()`). Takové funkce mohou pomoci vyřešit situaci, a proto jsou vyloučeny ze seznamu „omezených funkcí“.

Použití funkce nouzového zastavení poskytuje efektivní provizorní řešení pro řešení vážných zranitelností ve vašem chytrém kontraktu. Zvyšuje to však potřebu uživatelů důvěřovat vývojářům, že ji neaktivují ze zištných důvodů. Za tímto účelem jsou možnými řešeními decentralizace kontroly nad nouzovým zastavením, a to buď jejím podřízením onchain hlasovacímu mechanismu, časovému zámku (timelock), nebo schválení z multisig peněženky.

#### Monitorování událostí {#design-secure-governance-systems}

[Události](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) vám umožňují sledovat volání funkcí chytrého kontraktu a monitorovat změny stavových proměnných. Je ideální naprogramovat váš chytrý kontrakt tak, aby emitoval událost, kdykoli nějaká strana provede akci kritickou z hlediska bezpečnosti (např. výběr prostředků).

Zaznamenávání událostí a jejich monitorování offchain poskytuje přehled o operacích kontraktu a napomáhá rychlejšímu objevování škodlivých akcí. To znamená, že váš tým může rychleji reagovat na hacky a podniknout kroky ke zmírnění dopadu na uživatele, jako je pozastavení funkcí nebo provedení upgradu.

Můžete se také rozhodnout pro hotový monitorovací nástroj, který automaticky přeposílá upozornění, kdykoli někdo interaguje s vašimi kontrakty. Tyto nástroje vám umožní vytvářet vlastní upozornění na základě různých spouštěčů, jako je objem transakcí, frekvence volání funkcí nebo konkrétní zapojené funkce. Můžete například naprogramovat upozornění, které přijde, když částka vybraná v jedné transakci překročí určitou prahovou hodnotu.

### 7. Navrhněte bezpečné systémy správy {#reduce-code-complexity}

Možná budete chtít decentralizovat svou aplikaci předáním kontroly nad hlavními chytrými kontrakty členům komunity. V tomto případě bude systém chytrých kontraktů zahrnovat modul správy – mechanismus, který umožňuje členům komunity schvalovat administrativní akce prostřednictvím onchain systému správy. Například o návrhu na upgrade proxy kontraktu na novou implementaci mohou hlasovat držitelé tokenů.

Decentralizovaná správa může být prospěšná, zejména proto, že slaďuje zájmy vývojářů a koncových uživatelů. Nicméně mechanismy správy chytrých kontraktů mohou při nesprávné implementaci přinést nová rizika. Pravděpodobným scénářem je, že útočník získá obrovskou hlasovací sílu (měřenou počtem držených tokenů) tím, že si vezme [bleskovou půjčku](/defi/#flash-loans), a prosadí škodlivý návrh.

Jedním ze způsobů, jak předcházet problémům souvisejícím s onchain správou, je [použití časového zámku (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Časový zámek brání chytrému kontraktu v provádění určitých akcí, dokud neuplyne určitá doba. Další strategie zahrnují přiřazení „váhy hlasu“ každému tokenu na základě toho, jak dlouho byl uzamčen, nebo měření hlasovací síly adresy v historickém období (například 2-3 bloky v minulosti) namísto aktuálního bloku. Obě metody snižují možnost rychlého nahromadění hlasovací síly ke zvrácení onchain hlasování.

Více o [navrhování bezpečných systémů správy](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [různých hlasovacích mechanismech v DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) a [běžných vektorech útoků na DAO využívajících DeFi](https://dacian.me/dao-governance-defi-attacks) najdete ve sdílených odkazech.

### 8. Snižte složitost kódu na minimum {#mitigate-common-smart-contract-vulnerabilities}

Tradiční vývojáři softwaru znají princip KISS („keep it simple, stupid“), který nedoporučuje vnášet do návrhu softwaru zbytečnou složitost. To vychází z dlouholetého přesvědčení, že „složité systémy selhávají složitými způsoby“ a jsou náchylnější k nákladným chybám.

Udržování věcí v jednoduchosti je obzvláště důležité při psaní chytrých kontraktů, vzhledem k tomu, že chytré kontrakty potenciálně kontrolují velké množství hodnoty. Tipem pro dosažení jednoduchosti při psaní chytrých kontraktů je opětovné použití existujících knihoven, jako jsou [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), kde je to možné. Protože tyto knihovny byly vývojáři rozsáhle auditovány a testovány, jejich použití snižuje pravděpodobnost zanesení chyb psaním nové funkcionality od nuly.

Další běžnou radou je psát malé funkce a udržovat kontrakty modulární rozdělením obchodní logiky do více kontraktů. Psaní jednoduššího kódu nejen snižuje plochu pro útok v chytrém kontraktu, ale také usnadňuje uvažování o správnosti celého systému a včasné odhalení možných chyb v návrhu.

### 9. Braňte se proti běžným zranitelnostem chytrých kontraktů {#reentrancy}

#### Reentrance {#integer-underflows-and-overflows}

EVM neumožňuje souběžnost, což znamená, že dva kontrakty zapojené do volání zprávy nemohou běžet současně. Externí volání pozastaví provádění a paměť volajícího kontraktu, dokud se volání nevrátí, a v tomto okamžiku provádění normálně pokračuje. Tento proces lze formálně popsat jako přenos [toku řízení (control flow)](https://www.computerhope.com/jargon/c/contflow.htm) na jiný kontrakt.

Ačkoli je přenos toku řízení na nedůvěryhodné kontrakty většinou neškodný, může způsobit problémy, jako je reentrance. Útok reentrance nastane, když škodlivý kontrakt zavolá zpět do zranitelného kontraktu před dokončením původního vyvolání funkce. Tento typ útoku lze nejlépe vysvětlit na příkladu.

Zvažte jednoduchý chytrý kontrakt (‚Oběť‘), který komukoli umožňuje vkládat a vybírat ether:

```solidity
// Tento kontrakt je zranitelný. Nepoužívejte v produkci

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

Tento kontrakt vystavuje funkci `withdraw()`, která uživatelům umožňuje vybrat ETH dříve vložené do kontraktu. Při zpracování výběru provádí kontrakt následující operace:

1. Zkontroluje zůstatek ETH uživatele
2. Odešle prostředky na volající adresu
3. Vynuluje jejich zůstatek na 0, čímž zabrání dalším výběrům od uživatele

Funkce `withdraw()` v kontraktu `Victim` se řídí vzorem „checks-interactions-effects“ (kontroly-interakce-efekty). _Zkontroluje_ (checks), zda jsou splněny podmínky nezbytné pro provedení (tj. uživatel má kladný zůstatek ETH), a provede _interakci_ (interaction) odesláním ETH na adresu volajícího, před aplikací _efektů_ (effects) transakce (tj. snížením zůstatku uživatele).

Pokud je `withdraw()` volána z externě vlastněného účtu (EOA), funkce se provede podle očekávání: `msg.sender.call.value()` odešle ETH volajícímu. Pokud je však `msg.sender` účet chytrého kontraktu, který volá `withdraw()`, odeslání prostředků pomocí `msg.sender.call.value()` také spustí kód uložený na této adrese.

Představte si, že toto je kód nasazený na adrese kontraktu:

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

1. Přijmout vklad z jiného účtu (pravděpodobně EOA útočníka)
2. Vložit 1 ETH do kontraktu Oběti
3. Vybrat 1 ETH uložené v chytrém kontraktu

Na tom není nic špatného, kromě toho, že `Attacker` má další funkci, která znovu volá `withdraw()` v `Victim`, pokud je zbývající gas z příchozího `msg.sender.call.value` větší než 40 000. To dává `Attacker` možnost znovu vstoupit do `Victim` a vybrat další prostředky _před_ dokončením prvního vyvolání `withdraw`. Cyklus vypadá takto:

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

Shrnutí je takové, že protože zůstatek volajícího není nastaven na 0, dokud se nedokončí provádění funkce, následná vyvolání budou úspěšná a umožní volajícímu vybrat svůj zůstatek vícekrát. Tento druh útoku lze použít k vysátí prostředků z chytrého kontraktu, jako se to stalo při [hacku DAO v roce 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Útoky reentrance jsou pro chytré kontrakty dodnes kritickým problémem, jak ukazují [veřejné seznamy exploitů reentrance](https://github.com/pcaversaccio/reentrancy-attacks).

##### Jak zabránit útokům reentrance {#oracle-manipulation}

Jedním z přístupů k řešení reentrance je dodržování [vzoru checks-effects-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Tento vzor řadí provádění funkcí tak, že kód, který provádí nezbytné kontroly před pokračováním v provádění, je na prvním místě, následován kódem, který manipuluje se stavem kontraktu, a kód, který interaguje s jinými kontrakty nebo EOA, přichází na řadu jako poslední.

Vzor checks-effect-interaction je použit v revidované verzi kontraktu `Victim` zobrazené níže:

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

Tento kontrakt provede _kontrolu_ (check) zůstatku uživatele, aplikuje _efekty_ (effects) funkce `withdraw()` (vynulováním zůstatku uživatele na 0) a přistoupí k provedení _interakce_ (interaction) (odeslání ETH na adresu uživatele). To zajišťuje, že kontrakt aktualizuje své úložiště před externím voláním, čímž se eliminuje podmínka reentrance, která umožnila první útok. Kontrakt `Attacker` by stále mohl zavolat zpět do `NoLongerAVictim`, ale protože `balances[msg.sender]` byl nastaven na 0, další výběry vyvolají chybu.

Další možností je použít zámek vzájemného vyloučení (běžně označovaný jako „mutex“), který uzamkne část stavu kontraktu, dokud se nedokončí vyvolání funkce. To je implementováno pomocí booleovské proměnné, která je před spuštěním funkce nastavena na `true` a po dokončení vyvolání se vrátí na `false`. Jak je vidět na příkladu níže, použití mutexu chrání funkci před rekurzivními voláními, zatímco se původní vyvolání stále zpracovává, čímž se efektivně zastaví reentrance.

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
    // Tato funkce je chráněna mutexem, takže reentrantní volání zevnitř `msg.sender.call` nemohou znovu zavolat `withdraw`.
    //  Příkaz `return` se vyhodnotí jako `true`, ale stále vyhodnotí příkaz `locked = false` v modifikátoru
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Můžete také použít systém [plateb tahem (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment), který vyžaduje, aby uživatelé vybírali prostředky z chytrých kontraktů, namísto systému „plateb tlakem“ (push payments), který odesílá prostředky na účty. Tím se odstraňuje možnost neúmyslného spuštění kódu na neznámých adresách (a může to také zabránit určitým útokům typu odepření služby - DoS).

#### Podtečení a přetečení celých čísel {#smart-contract-security-resources-for-developers}

K přetečení celého čísla (integer overflow) dochází, když výsledek aritmetické operace spadne mimo přijatelný rozsah hodnot, což způsobí jeho „přetočení“ na nejnižší reprezentovatelnou hodnotu. Například `uint8` může ukládat pouze hodnoty do 2^8-1=255. Aritmetické operace, jejichž výsledkem jsou hodnoty vyšší než `255`, přetečou a resetují `uint` na `0`, podobně jako se počítadlo ujetých kilometrů v autě resetuje na 0, jakmile dosáhne maximálního počtu kilometrů (999999).

K podtečení celého čísla (integer underflow) dochází z podobných důvodů: výsledek aritmetické operace klesne pod přijatelný rozsah. Řekněme, že byste se pokusili dekrementovat `0` v `uint8`, výsledek by se jednoduše přetočil na maximální reprezentovatelnou hodnotu (`255`).

Jak přetečení, tak podtečení celých čísel může vést k neočekávaným změnám stavových proměnných kontraktu a mít za následek neplánované provádění. Níže je příklad ukazující, jak může útočník zneužít aritmetické přetečení v chytrém kontraktu k provedení neplatné operace:

```
pragma solidity ^0.7.6;

// Tento kontrakt je navržen tak, aby fungoval jako časový trezor.
// Uživatel může do tohoto kontraktu vložit prostředky, ale nemůže je vybrat po dobu alespoň jednoho týdne.
// Uživatel může také prodloužit dobu čekání nad rámec 1 týdne.

/*
1. Nasadit TimeLock
2. Nasadit Attack s adresou TimeLock
3. Zavolat Attack.attack s odesláním 1 etheru. Okamžitě budete moci
   vybrat svůj ether.

Co se stalo?
Attack způsobil přetečení TimeLock.lockTime a mohl vybrat prostředky
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
        pokud t = aktuální čas uzamčení, pak musíme najít x takové, že
        x + t = 2**256 = 0
        takže x = -t
        2**256 = type(uint).max + 1
        takže x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Jak zabránit podtečení a přetečení celých čísel {#code-analysis-tools}

Od verze 0.8.0 kompilátor Solidity odmítá kód, který vede k podtečení a přetečení celých čísel. Kontrakty kompilované s nižší verzí kompilátoru by však měly buď provádět kontroly funkcí zahrnujících aritmetické operace, nebo používat knihovnu (např. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)), která kontroluje podtečení/přetečení.

#### Manipulace s orákulem {#smart-contract-monitoring-tools}

[Orákula](/developers/docs/oracles/) získávají offchain informace a odesílají je onchain pro použití chytrými kontrakty. S orákuly můžete navrhovat chytré kontrakty, které spolupracují s offchain systémy, jako jsou kapitálové trhy, což výrazně rozšiřuje jejich uplatnění.

Pokud je však orákulum poškozeno a odesílá nesprávné informace onchain, chytré kontrakty se provedou na základě chybných vstupů, což může způsobit problémy. To je základem „problému orákula“ (oracle problem), který se týká úkolu zajistit, aby informace z blockchainového orákula byly přesné, aktuální a včasné.

Souvisejícím bezpečnostním problémem je použití onchain orákula, jako je decentralizovaná burza, k získání spotové ceny aktiva. Platformy pro půjčování v odvětví [decentralizovaných financí (DeFi)](/defi/) to často dělají, aby určily hodnotu zajištění uživatele a stanovily, kolik si může půjčit.

Ceny na DEX jsou často přesné, a to z velké části díky arbitrážérům, kteří obnovují paritu na trzích. Jsou však otevřené manipulaci, zejména pokud onchain orákulum vypočítává ceny aktiv na základě historických obchodních vzorců (jak tomu obvykle bývá).

Útočník by například mohl uměle napumpovat spotovou cenu aktiva tím, že si vezme bleskovou půjčku těsně před interakcí s vaším kontraktem pro půjčování. Dotaz na DEX ohledně ceny aktiva by vrátil vyšší než normální hodnotu (kvůli velké „nákupní objednávce“ útočníka, která zkresluje poptávku po aktivu), což by mu umožnilo půjčit si více, než by měl. Takové „útoky pomocí bleskových půjček“ (flash loan attacks) byly použity ke zneužití spoléhání se na cenová orákula mezi DeFi aplikacemi, což protokoly stálo miliony ve ztracených prostředcích.

##### Jak zabránit manipulaci s orákulem {#smart-contract-administration-tools}

Minimálním požadavkem pro [zabránění manipulaci s orákulem](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) je použití decentralizované sítě orákul, která získává informace z více zdrojů, aby se zabránilo jediným bodům selhání. Ve většině případů mají decentralizovaná orákula zabudované kryptoekonomické pobídky, které povzbuzují uzly orákula k hlášení správných informací, což je činí bezpečnějšími než centralizovaná orákula.

Pokud plánujete dotazovat onchain orákulum na ceny aktiv, zvažte použití takového, které implementuje mechanismus časově vážené průměrné ceny (TWAP). [TWAP orákulum](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) dotazuje cenu aktiva ve dvou různých časových okamžicích (které můžete upravit) a vypočítá spotovou cenu na základě získaného průměru. Výběr delších časových období chrání váš protokol před manipulací s cenami, protože velké objednávky provedené v nedávné době nemohou ovlivnit ceny aktiv.

## Zdroje o bezpečnosti chytrých kontraktů pro vývojáře {#smart-contract-auditing-services}

### Nástroje pro analýzu chytrých kontraktů a ověřování správnosti kódu {#bug-bounty-platforms}

- **[Testovací nástroje a knihovny](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Sbírka standardních oborových nástrojů a knihoven pro provádění jednotkových testů, statické analýzy a dynamické analýzy chytrých kontraktů._

- **[Nástroje pro formální verifikaci](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Nástroje pro ověřování funkční správnosti chytrých kontraktů a kontrolu invariantů._

- **[Služby auditu chytrých kontraktů](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Seznam organizací poskytujících služby auditu chytrých kontraktů pro vývojové projekty na Ethereu._

- **[Bug bounty platformy](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Platformy pro koordinaci programů odměn za nalezení chyb (bug bounty) a odměňování zodpovědného odhalení kritických zranitelností v chytrých kontraktech._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Bezplatný online nástroj pro kontrolu všech dostupných informací o forknutém kontraktu._

- **[ABI Encoder](https://abi.hashex.org/)** - _Bezplatná online služba pro kódování funkcí vašeho Solidity kontraktu a argumentů konstruktoru._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Statický analyzátor pro Solidity, který prochází abstraktní syntaktické stromy (AST), aby přesně určil podezřelé zranitelnosti a vypsal problémy ve snadno čitelném formátu markdown._

### Nástroje pro monitorování chytrých kontraktů {#common-smart-contract-vulnerabilities-and-exploits}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Nástroj pro získávání upozornění v reálném čase, když se ve vašich chytrých kontraktech nebo peněženkách stanou neobvyklé nebo neočekávané události._

### Nástroje pro bezpečnou správu chytrých kontraktů {#challenges-for-learning-smart-contract-security}

- **[Safe](https://safe.global/)** - _Peněženka ve formě chytrého kontraktu běžící na Ethereu, která vyžaduje, aby transakci před jejím provedením schválil minimální počet lidí (M z N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Knihovny kontraktů pro implementaci administrativních funkcí, včetně vlastnictví kontraktů, aktualizací, řízení přístupu, správy, možnosti pozastavení a dalších._

### Služby auditu chytrých kontraktů {#smart-contract-security-best-practices}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Služba auditu chytrých kontraktů, která pomáhá projektům napříč blockchainovým ekosystémem zajistit, že jsou jejich protokoly připraveny ke spuštění a vytvořeny tak, aby chránily uživatele._

- **[CertiK](https://www.certik.com/)** - _Firma zabývající se bezpečností blockchainu, která je průkopníkem ve využívání špičkové technologie formální verifikace u chytrých kontraktů a blockchainových sítí._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Společnost zabývající se kybernetickou bezpečností, která kombinuje bezpečnostní výzkum s mentalitou útočníka za účelem snížení rizik a posílení kódu._

- **[PeckShield](https://peckshield.com/)** - _Společnost zabývající se bezpečností blockchainu, která nabízí produkty a služby pro bezpečnost, soukromí a použitelnost celého blockchainového ekosystému._

- **[QuantStamp](https://quantstamp.com/)** - _Auditorská služba usnadňující masové přijetí blockchainové technologie prostřednictvím služeb hodnocení bezpečnosti a rizik._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Společnost zabývající se bezpečností chytrých kontraktů, která poskytuje bezpečnostní audity pro distribuované systémy._

- **[Runtime Verification](https://runtimeverification.com/)** - _Bezpečnostní společnost specializující se na formální modelování a verifikaci chytrých kontraktů._

- **[Hacken](https://hacken.io)** - _Auditor kybernetické bezpečnosti ve Web3, který přináší komplexní přístup k bezpečnosti blockchainu._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Služby auditu pro Solidity a Cairo, které zajišťují integritu chytrých kontraktů a bezpečnost uživatelů napříč sítěmi Ethereum a Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx se zaměřuje na audit blockchainu a chytrých kontraktů pro zajištění bezpečnosti kryptoměn a poskytuje služby jako vývoj chytrých kontraktů, penetrační testování a blockchainové poradenství._

- **[Code4rena](https://code4rena.com/)** - _Platforma pro kompetitivní audity, která motivuje odborníky na bezpečnost chytrých kontraktů k hledání zranitelností a pomáhá tak zvyšovat bezpečnost Web3._

- **[CodeHawks](https://codehawks.com/)** - _Platforma pro kompetitivní audity, která pořádá soutěže v auditu chytrých kontraktů pro bezpečnostní výzkumníky._

- **[Cyfrin](https://cyfrin.io)** - _Špička v oblasti bezpečnosti Web3, která podporuje krypto bezpečnost prostřednictvím produktů a služeb auditu chytrých kontraktů._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Firma zabývající se bezpečností Web3, která nabízí bezpečnostní audity blockchainových systémů prostřednictvím týmu zkušených auditorů a nejlepších nástrojů ve své třídě._

- **[Oxorio](https://oxor.io/)** - _Audity chytrých kontraktů a služby bezpečnosti blockchainu s odbornými znalostmi v oblasti EVM, Solidity, ZK a meziřetězcových technologií pro krypto firmy a DeFi projekty._

- **[Inference](https://inference.ag/)** - _Společnost zabývající se bezpečnostními audity, specializující se na audit chytrých kontraktů pro blockchainy založené na EVM. Díky svým zkušeným auditorům identifikují potenciální problémy a navrhují praktická řešení k jejich opravě před nasazením._

### Bug bounty platformy {#tutorials-on-smart-contract-security}

- **[Immunefi](https://immunefi.com/)** - _Bug bounty platforma pro chytré kontrakty a DeFi projekty, kde bezpečnostní výzkumníci kontrolují kód, odhalují zranitelnosti, dostávají zaplaceno a činí krypto bezpečnějším._

- **[HackerOne](https://www.hackerone.com/)** - _Platforma pro koordinaci zranitelností a bug bounty, která propojuje podniky s penetračními testery a výzkumníky v oblasti kybernetické bezpečnosti._

- **[HackenProof](https://hackenproof.com/)** - _Expertní bug bounty platforma pro krypto projekty (DeFi, chytré kontrakty, peněženky, CEX a další), kde bezpečnostní profesionálové poskytují služby třídění a výzkumníci dostávají zaplaceno za relevantní, ověřená hlášení o chybách._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Pojistitel ve Web3 pro bezpečnost chytrých kontraktů, s výplatami pro auditory spravovanými prostřednictvím chytrých kontraktů, aby bylo zajištěno spravedlivé proplacení relevantních chyb._

-  **[CodeHawks](https://www.codehawks.com/)** - _Kompetitivní bug bounty platforma, kde se auditoři účastní bezpečnostních soutěží a výzev a (brzy) i vlastních soukromých auditů._

### Publikace o známých zranitelnostech a exploitech chytrých kontraktů

- **[ConsenSys: Známé útoky na chytré kontrakty](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Vysvětlení nejvýznamnějších zranitelností kontraktů srozumitelné pro začátečníky, s ukázkovým kódem pro většinu případů._

- **[SWC Registry](https://swcregistry.io/)** - _Spravovaný seznam položek Common Weakness Enumeration (CWE), které se vztahují na chytré kontrakty na Ethereu._

- **[Rekt](https://rekt.news/)** - _Pravidelně aktualizovaná publikace o významných krypto hacích a exploitech, spolu s podrobnými post-mortem zprávami._

### Výzvy pro výuku bezpečnosti chytrých kontraktů

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Spravovaný seznam blockchainových bezpečnostních wargames, výzev a soutěží [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) a popisů jejich řešení._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame pro výuku ofenzivní bezpečnosti chytrých kontraktů v DeFi a budování dovedností v hledání chyb a bezpečnostním auditu._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame založená na Web3/Solidity, kde každá úroveň představuje chytrý kontrakt, který je třeba „hacknout“._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Výzva v hackování chytrých kontraktů, zasazená do fantasy dobrodružství. Úspěšné dokončení výzvy také poskytuje přístup k soukromému bug bounty programu._

### Osvědčené postupy pro zabezpečení chytrých kontraktů

- **[ConsenSys: Osvědčené postupy pro bezpečnost chytrých kontraktů na Ethereu](https://consensys.github.io/smart-contract-best-practices/)** - _Komplexní seznam pokynů pro zabezpečení chytrých kontraktů na Ethereu._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Sbírka praktických průvodců a kontrolních seznamů zaměřených na bezpečnost při vývoji chytrých kontraktů._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Užitečná kompilace bezpečných vzorů a osvědčených postupů pro programovací jazyk chytrých kontraktů Solidity._

- **[Dokumentace Solidity: Bezpečnostní aspekty](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Pokyny pro psaní bezpečných chytrých kontraktů v Solidity._

- **[Standard pro ověřování bezpečnosti chytrých kontraktů](https://github.com/securing/SCSVS)** - _Čtrnáctidílný kontrolní seznam vytvořený za účelem standardizace bezpečnosti chytrých kontraktů pro vývojáře, architekty, bezpečnostní auditory a dodavatele._

- **[Výuka bezpečnosti a auditu chytrých kontraktů](https://updraft.cyfrin.io/courses/security)** - _Ultimátní kurz bezpečnosti a auditu chytrých kontraktů, vytvořený pro vývojáře chytrých kontraktů, kteří chtějí zlepšit své osvědčené bezpečnostní postupy a stát se bezpečnostními výzkumníky._

### Návody na bezpečnost chytrých kontraktů

- [Jak psát bezpečné chytré kontrakty](/developers/tutorials/secure-development-workflow/)

- [Jak používat Slither k hledání chyb v chytrých kontraktech](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jak používat Manticore k hledání chyb v chytrých kontraktech](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Pokyny pro bezpečnost chytrých kontraktů](/developers/tutorials/smart-contract-security-guidelines/)

- [Jak bezpečně integrovat váš tokenový kontrakt s libovolnými tokeny](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Kompletní kurz bezpečnosti a auditu chytrých kontraktů](https://updraft.cyfrin.io/courses/security)