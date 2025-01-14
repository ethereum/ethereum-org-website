---
title: Okosszerződés biztonság
description: Útmutató a biztonságos Ethereum-okosszerződések építéséhez
lang: hu
---

Az okosszerződések rendkívüli módon rugalmasak és képesek nagy mennyiségű értéket és adatot irányítani, miközben egy megváltoztathatatlan logika alapján, a blokkláncra telepített kód szerint futnak. Ezáltal létrejött a bizalmat nem igénylő és decentralizált alkalmazások élénk ökoszisztémája, mely számos előnyt kínál a hagyományos rendszerekkel szemben. Emellett lehetőséget is jelentenek a támadók számára, akik abból akarnak nyereséget szerezni, hogy kihasználják az okosszerződések gyenge pontjait.

A nyilvános blokkláncok, mint az Ethereum, tovább bonyolítják az okosszerződések biztosításának problémáját. A telepített szerződéskód _általában_ nem módosítható, hogy ezzel a biztonsági kockázatokat elkerüljék, eközben az okosszerződésekből ellopott eszközöket rendkívül nehéz lekövetni és a legtöbb esetben visszaszerezhetetlenek a megváltoztathatatlanság miatt.

Bár a számok változnak, de úgy becsülik, hogy a biztonsági hibák miatt az okosszerződésből ellopott vagy onnan elvesztett értékek teljes összege könnyen meghaladhatja az 1 milliárd dollárt is. Ez magába foglal olyan nagy horderejű incidenseket is, mint amilyen a [DAO-hackelés volt](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 millió ETH-t loptak, ami meghaladja az 1 milliárd dollárt mai áron), [Parity több aláírásos tárca hackelését](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (30 millió USD-t veszett el), és a [Parity befagyasztott tárcaproblémát](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (300 millió USD-nyi ETH örökre elérhetetlenné vált).

Ezek az esetek kötelezővé teszik a fejlesztők számára, hogy folyamatosan azon dolgozzanak, hogy az okosszerződések biztonságosak, robusztusak és ellenállók legyenek. Az okosszerződésbiztonság komoly téma, melyet minden fejlesztőnek a maga érdekében meg kell ismerni. Ez az útmutató lefedi azokat a biztonsági megfontolásokat, amelyek az Ethereum-fejlesztőknek fontosak, és forrásokat tár fel az okosszerződésbiztonság továbbfejlesztésére.

## Előfeltételek {#prerequisites}

Tisztában kell lennie az [okosszerződés-fejlesztés alapjaival](/developers/docs/smart-contracts/), mielőtt a biztonsági kérdésekkel foglalkozna.

## Iránymutatások a biztonságos Ethereum-okosszerződések építéséhez {#smart-contract-security-guidelines}

### 1. Tervezzen megfelelő hozzáférés-szabályozást {#design-proper-access-controls}

Az okosszerződésekben a `public` (publikus) vagy `external` (külső) jelölésű függvényeket bármelyik külső tulajdonú számla (EOA) vagy szerződésszámla meghívhatja. A függvényeket szükséges nyilvánossá tenni, ha Ön azt akarja, hogy mások interakcióba lépjenek a szerződésével. A `private` (privát) jelölésű függvényeket csak az okosszerződésen belüli függvények hívhatják meg, külső számlák nem. Problémás lehet az összes hálózati résztvevőnek hozzáférést adni bizonyos szerződésfüggvényekhez, főleg ha így bárki végrehajthat fontos műveleteket (pl. új tokenek kibocsátása).

Ahhoz, hogy megakadályozzuk az okosszerződés függvényeinek nem hitelesített használatát, biztonságos hozzáférés-szabályozásra van szükség. A hozzáférés-szabályozás mechanizmusai az okosszerződés bizonyos függvényeinek használatát a jóváhagyott entitások csoportjára, például a szerződés kezeléséért felelős számlákra korlátozzák. A **tulajdonosi minta** és a **szerepalapú irányítás** két hasznos minta az okosszerződésben beállítható hozzáférés-szabályozásra:

#### Tulajdonosi minta (ownable pattern) {#ownable-pattern}

A tulajdonosi mintában beállítható egy cím, mint a szerződés „tulajdonosa” a szerződés létrehozása folyamán. A védett függvényekhez hozzárendelnek egy `OnlyOwner`-módosítót, így a szerződés azonosítani fogja az identitását a hívást végző címnek, mielőtt végrehajtaná a függvényt. A védett függvények meghívását csak akkor engedi, ha az a szerződés tulajdonosának címéről érkezik, különben elveti azt, megakadályozva az akaratlan hozzáférést.

#### Szerepalapú hozzáférés-szabályozás {#role-based-access-control}

Ha az okosszerződésben egyetlen címet regisztrálnak, mint `Owner` (tulajdonos), az a centralizáció kockázatát hordozza és felmerül az egyetlen meghibásodási pont lehetősége. Ha a tulajdonos számlakulcsa nyilvánossá válik, akkor a támadók hozzáférhetnek ehhez a tulajdonolt szerződéshez. Emiatt jobb opció lehet a szerepalapú hozzáférés-szabályozás mintája, ahol több adminisztratív számla van.

A szerepalapú hozzáférés-szabályozásban a fontos függvényekhez való hozzáférést elosztják a megbízott résztvevők között. Például az egyik számla felel a tokenek kibocsátásáért, miközben egy másik számla frissítéseket végez vagy megállítja a szerződést. A decentralizált hozzáférés-szabályozás ily módon kivédi az egyetlen meghibásodási pont lehetőségét és csökkenti a felhasználók részéről igényelt bizalmat.

##### Több aláírásos tárca használata

A biztonságos hozzáférés-szabályozásra egy másik megközelítés a [több aláírásos számla](/developers/docs/smart-contracts/#multisig) használata, ami a szerződést kezeli. Az általános külső tulajdonú számlához (EOA) képest a több aláírásos számlákat több entitás birtokolja, és a tranzakciók végrehajtásához egy adott számú aláírásra van szükség, például 5-ből 3-ra.

Ennek használata egy újabb biztonsági réteget vezet be, mivel a szerződésen végrehajtandó akciókba több félnek is bele kell egyeznie. Ez különösen hasznos, ha a tulajdonosi mintát (ownable pattern) kell használni, mert még nehezebb a támadó vagy egy rosszhiszemű belső fél számára, hogy rossz célokra használja fel a fontos szerződésfüggvényeket.

### 2. Használja a require(), assert() és revert() parancsokat, hogy óvja a szerződés működését {#use-require-assert-revert}

Amint az okosszerződés telepítésre kerül a blokkláncon, bárki meg tudja hívni a benne lévő publikus függvényeket. Mivel nem lehet tudni előre, hogy a külső tulajdonú számlák hogyan fognak interakciókat folytatni a szerződéssel, ezért ideális esetben belső óvintézkedéseket kell tenni a problémás működésekkel kapcsolatban a telepítés előtt. Az okosszerződésben elő lehet írni a megfelelő viselkedést a `require()`, `assert()` és `revert()` parancsokkal, hogy ha bizonyos feltételek nem teljesülnek, akkor leálljon és visszaforgassa a változásokat.

**`require()`**: a `require` (szükséges) parancsot a függvények elején kell meghatározni, és biztosítja, hogy a megadott feltételek teljesülnek, mielőtt a függvény végrehajtásra kerül. A `require` parancs révén validálni lehet a felhasználó által adott adatokat, ellenőrizhetők az állapotváltozók, vagy hitelesíteni lehet a meghívó számla identitását, mielőtt a függvény elindulna.

**`assert()`**: az `assert()` (állítás) parancsot a belső hibák felderítésére használják, illetve a kódban lévő „konstansok” megsértését ellenőrzik ezáltal. A konstans egy logikai állítás a szerződés státuszáról, amelynek teljesülnie kell minden függvénymeghívás esetén. Például egy tokenszerződés maximális teljes kínálata vagy egyenlege. Az `assert()` használata biztosítja, hogy a szerződés nem kerül sebezhető státuszba, és ha mégis, akkor az állapotváltozók visszaállnak a korábbi értékekre.

**`revert()`**: a `revert()` (visszatér) kódot egy if-else parancsban használhatjuk, ami egy kivételt ad, ha a szükséges feltételek nem teljesülnek. Az alábbi példaszerződés a `revert()` kódot arra használja, hogy védje a függvények végrehajtását:

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

### 3. Tesztelje az okosszerződéseket és ellenőrizze a kód helyességét {#test-smart-contracts-and-verify-code-correctness}

Az [Ethereum virtuális gépen](/developers/docs/evm/) érvényes kódváltoztathatatlanság miatt az okosszerződéseknél jelentős minőség-ellenőrzésre van szükség a fejlesztési időszakban. Tesztelje szerződését kiterjedt módon, és figyelje meg, hogy kap-e váratlan eredményeket, így fejlesztheti a biztonságot és megvédheti a felhasználókat hosszú távon is.

Ennek megszokott módja, hogy kicsi egységteszteket ír tesztadattal, melyet a szerződés a felhasználóktól kapna. Az [egységtesztelés](/developers/docs/smart-contracts/testing/#unit-testing) arra jó, hogy bizonyos függvények működését kipróbálja, és így biztosítja, hogy az okosszerződés az elvárt módon működik.

Sajnos az egységtesztelés minimálisan növeli az okosszerződés biztonságát, ha azt izolációban használják. Az egységteszt megmutathatja, hogy egy függvény megfelelően működik-e a tesztadatokra, de csak annyira hatásos, amennyire jó tesztet írnak hozzá. Nehéz beazonosítani a kimaradt eseteket és sebezhetőségeket, amelyek kompromittálhatják az okosszerződés biztonságát.

Jobb megközelítés az egységtesztelés tulajdonságalapú teszteléssel (property-based testing) való kombinálása, amely [statikus és dinamikus elemzést](/developers/docs/smart-contracts/testing/#static-dynamic-analysis) használ. A statikus elemzés olyan alacsony szintű reprezentációkon alapul, mint amilyen a [kontrollfolyamat-grafikon](https://en.wikipedia.org/wiki/Control-flow_graph) és az [absztrakt szintaxisfák](https://deepsource.io/glossary/ast/), hogy elemezze az elérhető programstátuszokat és végrehajtási utakat. A dinamikus elemzési technikák, mint az [okosszerződés fuzzing](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), a szerződéskódot véletlenszerű értékekkel hajtják végre, hogy feltárják azokat a működéseket, amelyek nem felelnek meg a biztonsági tulajdonságoknak.

A [formális ellenőrzés (formal verification)](/developers/docs/smart-contracts/formal-verification) egy másik technika az okosszerződések biztonsági tulajdonságainak igazolására. A megszokott teszteléshez képest a formális ellenőrzés képes egyértelműen bizonyítani, hogy nincsenek hibák az okosszerződésben. Ezt úgy éri el, hogy egy formális specifikációt hoz létre, amely a kívánt biztonsági tulajdonságokat rögzíti, majd bizonyítja, hogy a szerződések formális modellje megfelel ennek a specifikációnak.

### 4. Kérjen egy független átvizsgálást a kódjára {#get-independent-code-reviews}

Miután tesztelte a szerződését, kérjen meg másokat is, hogy ellenőrizzék le a kódot a lehetséges biztonsági problémák szempontjából. A tesztelés nem tárja fel az okosszerződés minden hibáját, de egy független vizsgálat megnöveli annak valószínűségét, hogy kiderülnek a sebezhető pontok.

#### Auditok {#audits}

Az okosszerződés auditálása az egyik módja a független kódvizsgálatnak. Az auditorok fontos szerepet játszanak abban, hogy az okosszerződések biztonságosak legyenek és ne legyenek bennük minőségi és tervezési hibák.

Mindazonáltal fontos megjegyezni, hogy az audit nem old meg minden problémát. Az okosszerződés-auditok nem tárnak fel minden egyes hibát, és a terv általában egy második körös ellenőrzés, hogy azokat a problémákat kiszúrja, ami a fejlesztőknek nem vált világossá a fejlesztés és tesztelés során. Kövesse a bevált gyakorlatokat az auditorokkal való munka kapcsán, mint amilyen a kód megfelelő dokumentálása és a sorokhoz kapcsolt kommentek, amelyek révén az okosszerződés-auditból a lehető legtöbb előnyt ki lehet hozni.

- [Okosszerződés auditáláshoz tippek és trükkök](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Hozza ki a legtöbbet az auditból](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Hibavadászatok {#bug-bounties}

Egy másik megoldás lehet a hibavadászat-program felállítása, amellyel külsődleges kódvizsgálatot lehet végezni. A hibavadászat pénzügyi jutalommal jár olyan egyéneknek (általában fehérkalapos hackereknek), akik sebezhető pontokat fedeznek fel az alkalmazásban.

Ez a jutalom a hibavadászatért, ha megfelelően használják, kellő motivációt jelenthet a hackerközösség bizonyos tagjai számára, hogy átnézzék az Ön kódját is kritikus hibákat keresve. Valós példa lehet a „végtelen mennyiségű pénz hiba”, ami egy támadónak lehetővé teszi, hogy határtalan mennyiségű ethert hozzon létre az [Optimism-mal](https://www.optimism.io/), egy [második blokkláncréteg (L2)](/layer-2/) protokollal az Ethereumon. Szerencsére egy fehérkalapos hacker [felfedezte a hibát](https://www.saurik.com/optimism.html) és értesítette a csapatot, [amelyet jelentős pénzösszeggel jutalmaztak](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Hasznos stratégia lehet, ha a kifizetés összegét arányosan kezelik a hiba által veszélybe kerülő pénzeszközök értékével. Ezt „[skálázódó hibavadászatnak](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)” is nevezhetjük, ami pénzügyi motivációt ad az egyéneknek, hogy inkább feltárják a gyenge pontokat és ne kihasználják azokat.

### 5. Kövesse a bevált gyakorlatokat az okosszerződésfejlesztés során {#follow-smart-contract-development-best-practices}

Az auditok és hibavadászatok nem csökkentik az Ön felelősségét, hogy jó minőségű kódot írjon. A megfelelő okosszerződés-biztonság azzal kezdődik, hogy megfelelő tervezési és fejlesztési folyamatokat követ:

- Tárolja az összes kódot egy verziókövető rendszerben, mint amilyen a git

- Minden kódmódosítást pull requesteken (változtatási kérelem) keresztül végezzen

- A pull requesteknek legalább egy független ellenőrzője legyen – ha Ön egyedül dolgozik egy projekten, akkor fontolja meg, hogy más fejlesztőkkel összefogva elvégzik egymás számára a kódellenőrzéseket

- Használjon [fejlesztői környezetet](/developers/docs/frameworks/) az okosszerződések tesztelésére, átfordítására és telepítésére

- Futtassa le a kódját olyan alapvető kódelemző eszközökön, mint a [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril és Slither. Ideális esetben ezt minden egyes pullrequest-beolvasztás előtt meg kell tenni, majd összehasonlítani az eredmények különbségeit

- Biztosítsa, hogy a kód hibák nélkül kerül átfordításra, és a Solidity átfordító nem ad figyelmeztetéseket

- Dokumentálja megfelelően a kódot (a [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html) használatában), és magyarázza el a részleteket a szerződés architektúrájáról egyszerű nyelven. Ezáltal könnyebb lesz másoknak auditálni és ellenőrizni a kódot.

### 6. Vezessen be komoly leállást követő helyreállítási tervet {#implement-disaster-recovery-plans}

A biztonságos hozzáférés-szabályozási terv, a függvénymódosítók bevezetése és más javaslatok fejlesztik az okosszerződés biztonságát, de nem zárhatják ki a lehetőségét egy ártó szándékú támadásnak. A biztonságos okosszerződés építése megkívánja azt is, hogy „felkészüljön a hibára”, és kidolgozzon egy tervet, amely alapján hatásosan tud reagálni egy támadásra. Egy megfelelő hibát vagy leállást követő helyreállítási terv (disaster recovery plan) a következő komponensek néhány vagy összes elemét tartalmazza:

#### Szerződésfrissítések {#contract-upgrades}

Miközben az Ethereum-okosszerződések alapvetően megváltozhatatlanok, mégis el lehet érni egy bizonyos fokú változtathatóságot a frissítési minták alkalmazásával. A szerződések frissítése elkerülhetetlen ha egy kritikus hiba miatt a régi szerződés használhatatlan lesz, és az új logika bevezetése a legjobb megoldás.

A szerződésfrissítési mechanizmusok másképp működnek, de a „proxyminta” az egyik legnépszerűbb megközelítés az okosszerződések frissítésére. A [proxyminta](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) az alkalmazás státuszát és logikáját _két_ szerződésre választja szét. Az első szerződés (a proxyszerződés) tárolja az állapotváltozókat (például a felhasználó egyenlegét), miközben a második szerződés (a logikaszerződés) tartalmazza a szerződés függvényeinek végrehajtási kódját.

A számlák a proxyszerződéssel kerülnek interakcióba, amely elküldi a függvénymeghívásokat a logikaszerződésbe a [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) kódot, egy alacsony szintű meghívást használva. A `delegatecall()` a megszokott üzenethíváshoz képest biztosítja, hogy a kód a logikaszerződés címén lefut a meghívó szerződés kontextusában. Tehát a logikaszerződés mindig a proxy tárhelyére ír (nem a sajátjába) és megőrzi a `msg.sender` és `msg.value` eredeti értékeit.

Ahhoz, hogy hívást lehessen delegálni a logikai szerződésnek, a címét el kell tárolni a proxyszerződés tárhelyén. Tehát a szerződés logikáját úgy lehet frissíteni, hogy egy új logikai szerződést kell telepíteni és eltárolni az új címet a proxyszerződésben. Mivel az ezt követő hívások a proxyszerződés felől automatikusan az új logikaszerződéshez kerülnek átirányításra, a kód változtatása nélkül végülis „frissítésre” kerül a szerződés.

[Bővebben a szerződések frissítéséről](/developers/docs/smart-contracts/upgrading/).

#### Vészleállítások {#emergency-stops}

Ahogy már említettük, sem a kiterjedt audit, sem a tesztelés nem képes felfedezni az okosszerződés összes hibáját. Ha a telepítés után sebezhető pont jelenik meg a kódjában, akkor azt nem lehet kijavítani, mert a szerződés címén futó kód megváltoztathatatlan. Emellett a frissítési mechanizmust (például a proxymintákat) időbe telik bevezetni (gyakran több jóváhagyást is igényelnek), ami csak időt ad a támadóknak, hogy több kárt okozzanak.

A radikális megoldás egy „vészleállítás” bevezetése, ami blokkolja azokat a hívásokat, melyek a szerződés sérülékeny függvényeire vonatkoznak. A vészleállítás általában a következő komponensekből áll:

1. Egy globális boolean változó, mely jelzi, ha az okosszerződés leállított állapotban van vagy nem. Ezt a változót `false` értékre állítják a szerződés telepítésekor, de átvált `true` értékre, amint a szerződés leáll.

2. Függvények, melyek a boolean-változóra hivatkoznak a végrehajtásuk során. Ezek a függvények akkor érhetők el, amikor az okosszerződés nincs leállítva, és elérhetetlenné válnak, amikor a vészleállítás megtörténik.

3. Egy entitás, amelynek hozzáférése van a vészleállítási funkcióhoz, és a boolean változót `true` értékre állítja. Az esetleges visszaélés miatt ezt a funkciót csak egy megbízott cím hívhatja meg (például a szerződés tulajdonosa).

Amint a szerződés aktiválja a vészleállást, bizonyos függvényeket nem lehet meghívni. Ezt úgy érik el, hogy a select függvényeket becsomagolják egy módosítóba, amely a globális változóra hivatkozik. Alább [egy példa](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) látható, amely ennek a mintának a szerződésbe való bevezetését mutatja be:

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

Ez a példa a vészleállás alapvető jellemzőit ismerteti:

- Az `isStopped` egy boolean, melynek értéke `false` az elején és `true`, amikor a szerződés vészmódba lép.

- Az `onlyWhenStopped` és `stoppedInEmergency` függvénymódosítók ellenőrzik az `isStopped` változót. A `stoppedInEmergency` azokat a függvényeket kontrollálja, amelyeknek elérhetetlennek kell maradniuk, amikor a szerződés sebezhető (például a `deposit()`). Az ezekre a függvényekre vonatkozó hívások egyszerűen visszafordulnak.

Az `onlyWhenStopped` azokhoz a függvényekhez használandó, amelyek vészhelyzetben is elérhetők (például az `emergencyWithdraw()`). Ezek a függvények segíthetnek megoldani a helyzetet, ezért nem részei a „korlátozott függvények” listájának.

A vészleállítási lehetőség egy hatásos hézagpótlás ahhoz, hogy a fejlesztő a komoly sebezhetőségeket kezelni tudja az okosszerződésében. Ugyanakkor a felhasználóktól több bizalmat igényel a fejlesztők felé, hogy nem használják ki ezt a funkciót önös érdekeikre. Erre lehetséges megoldást jelenthet a vészleállítás decentralizált kontrollja, mint például egy láncon belüli szavazás, időzár alkalmazása vagy egy több aláírásos tárca általi jóváhagyás.

#### Eseményfigyelés {#event-monitoring}

Az [események](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) lehetővé teszik az okosszerződéshez érkező hívások trekkelését és az állapotváltozók változásának felügyeletét. Bevált gyakorlatnak számít, ha az okosszerződés mindig kiad eseményt, amikor valaki egy biztonságkritikus tevékenységet végez (például kiveszi a pénzeszközöket).

Az események naplózása és felügyelete láncon kívül betekintést enged a szerződés működésébe, valamint az ártalmas tetteket hamarabb fel lehet fedezni általuk. Így a csapat gyorsabban tud reagálni a hackelésre, és azonnal cselekedni tud, hogy a felhasználókat ez ne érintse negatívan, például leállíthatják a függvényeket vagy frissítést indíthatnak el.

Választhat egy előre összeállított felügyeleti eszközt, amely automatikusan figyelmeztetéseket küld, amikor valaki interakcióba lép az Ön szerződéseivel. Ezek az eszközök segítenek személyre szabott figyelmeztetéseket is létrehozni különféle paraméterek alapján, mint amilyen a tranzakciómennyiség, a függvénymeghívások gyakorisága vagy az érintett függvények. Például beállíthat egy figyelmeztetést, ha a kivett pénzmennyiség egy tranzakcióban egy bizonyos határ felett van.

### 7. Tervezzen biztonságos irányítási rendszert {#design-secure-governance-systems}

Talán szeretné, hogy az alkalmazása decentralizált legyen, így a központi okosszerződések kontrollját a közösségi tagoknak adná. Ebben az esetben az okosszerződés rendszere felölel egy irányítási modult is – egy olyan mechanizmust, amellyel a közösségi tagok jóváhagyhatnak adminisztratív változásokat egy láncon belüli irányítási rendszer segítségével. Például azt a javaslatot, hogy a proxyszerződést egy új verzióra frissítsék, megszavaztathatja a tokennel rendelkező felhasználókkal.

A decentralizált irányítás előnyös lehet, főleg mivel összeegyezteti a fejlesztők és a felhasználók érdekeit. Mindazonáltal az okosszerződés irányításimechanizmusa új kockázatokat is jelenthet, ha nem megfelelően vezetik be. Kézenfekvő probléma, ha egy támadó nagyon magas szavazatierőt szerez (amit az általa birtokolt tokenek száma ad) azáltal, hogy [villámhitelt](/defi/#flash-loans) vesz fel, majd egy ártó változásra tesz javaslatot.

A láncon működő irányítási modell problémáit meg lehet oldani az [időzár használatával](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/) is. Az időzár megakadályozza, hogy az okosszerződés végrehajtson bizonyos műveleteket addig, amíg nem telt el egy adott idő. Más stratégia lehet a tokenekhez rendelt „szavazati súly” az alapján, hogy azt mennyi időre kötötték le, vagy egy adott cím szavazati erejét hosszabb periódusra is nézhetik (például 2–3 korábbi blokkra) a jelenlegi blokk helyett. Ezek csökkentik a lehetőségét annak, hogy valaki gyorsan jelentős szavazati erőre tegyen szert, hogy a láncon zajló szavazást eltérítse.

Többet megtudhat a [biztonságos kormányzási rendszerek tervezéséről](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), a [különböző szavazási mechanizmusokról a DAO-kban](https://hackernoon.com/governance-is-the-holy-grail-for-daos) és [a DeFi-t kihasználó gyakori DAO támadási vektorokról](https://dacian.me/dao-governance-defi-attacks) a megosztott linkeken.

### 8. Csökkentse a kód komplexitását a minimumra {#reduce-code-complexity}

A hagyományos szoftverfejlesztők elve az, hogy a lehető legegyszerűbb legyen a kód (KISS-elv), és így nem vezetnek be fölösleges bonyolításokat a tervben. Ennek alapja az az elgondolás, hogy az „összetett rendszerek összetett módokon vallhatnak kudarcot”, és sokkal hajlamosabbak a költséges hibákra.

A minél egyszerűbb megközelítés kiemelten fontos az okosszerződések írásánál is, mivel ezek nagy értékeket is kontrollálhatnak. Ennek eléréséhez érdemes létező könyvtárakat használni, mint amilyen az [OpenZeppelin szerződések](https://docs.openzeppelin.com/contracts/4.x/), amikor ez lehetséges. Mivel ezeket a könyvtárakat a fejlesztők már alaposan tesztelték, auditálták, így kisebb a hiba valószínűsége, mintha a nulláról kell megírni egy új funkcionalitást.

Másik követendő tanács az, hogy rövid függvényeket kell írni és a szerződést modulárisan kell felállítani, az üzleti logikát több szerződés között felosztva. Az egyszerű kódok írása kevesebb teret ad a támadásra, emellett a teljes rendszer helyességét is jobban lehet igazolni, és a lehetséges tervezési hibák is korán kiderülhetnek.

### 9. Védekezzen az okosszerződés általános sebezhetőségei ellen {#mitigate-common-smart-contract-vulnerabilities}

#### Újrabelépés {#reentrancy}

Az EVM nem engedi a párhuzamosságot, tehát két szerződés egy üzenethívásban nem futhat egyszerre. Egy külső hívás megállítja a meghívó szerződés végrehajtását és memóriáját addig, amíg a hívás vissza nem tér, amikor is a végrehajtás normálisan megtörténik. Ezt a folyamatot hivatalosan úgy nevezik, hogy a [kontrollfolyamat](https://www.computerhope.com/jargon/c/contflow.htm) átadása egy másik szerződésnek.

Habár általában nem jelent problémát, a kontrollfolyamat nem megbízható szerződéseknek való átadása okozhat némi gondot, például az újrabelépés lehetőségét. Újrabelépéses támadás akkor történik, amikor egy ártó szerződés visszahívást csinál egy sebezhető szerződésbe mielőtt az eredeti függvény meghívása lezárulna. Ezt a támadási fajtát a következő példával jobban elmagyarázzuk.

Vegyünk egy egyszerű okosszerződést („áldozat/victim”), ami megengedi, hogy bárki ethert helyezzen letétbe és vegyen ki:

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

Ez a szerződés elérhetővé teszi a `withdraw()` (kivétel) függvényt a felhasználóknak, hogy a korábban letétbe helyezett ETH-t ki tudják venni. Amikor egy ilyen kivétel történik, a szerződés a következő műveleteket hajtja végre:

1. Ellenőrzi a felhasználó ETH-egyenlegét
2. Pénzeszközt küld a meghívó címére
3. Átállítja az egyenleget 0-ra, hogy ne lehessen kivenni innen pénzt

A `withdraw()` függvény az `victim` (áldozat) szerződésében tehát egy „ellenőrzés-interakciók-eredmény” mintát követ. _Ellenőrzi_, hogy a végrehajtáshoz szükséges feltételek teljesülnek-e (a felhasználónak pozitív ETH-egyenlege van) és elvégzi az _interakciót_ azáltal, hogy ETH-t küld a meghívó címére, majd a tranzakció _eredményeit_ alkalmazza (lecsökkenti a felhasználó egyenlegét).

Ha a `withdraw()` kódot egy külső tulajdonú számláról (EOA) hívják meg, akkor a vártnak megfelelően megy végbe: `msg.sender.call.value()` ETH-t küld a meghívónak. Azonban, ha a `msg.sender` egy okosszerződéses számla, ami meghívja a `withdraw()` kódot, akkor a `msg.sender.call.value()` révén indított pénzküldés szintén beindítja a címen tárolt programkódot.

Tegyük fel, hogy a szerződéscímen ez a kód van telepítve:

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

Ez a szerződés három dolgot csinál:

1. Letétet fogad el egy másik számlától (valószínűleg a támadó/attacker EOA-ja)
2. Letétbe helyez 1 ETH-t az áldozat szerződésében
3. Kivesz 1 ETH-t, amelyet az okosszerződés tárol

Ebben még nincs semmi rossz, viszont a `attacker` (támadó) szerződésben van egy másik függvény is, amely meghívja a `withdraw()` kódot a `victim` (áldozat) esetében újra, ha a maradék gáz a bejövő `msg.sender.call.value` esetén több mint 40 000. Ezáltal a `attacker` újra beléphet az `victim` szerződésbe és kivehet több pénzt _mielőtt_ a `withdraw` (kivétel) első meghívása lezárulna. A ciklus így néz ki:

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

Összességében, mivel a meghívó egyenlege nem lesz 0 mindaddig, amíg a függvényvégrehajtás nem zárul le, a rákövetkező meghívások sikeresek lesznek, és megengedik a meghívónak, hogy kivegye az egyenlegét többször is. Ez a támadás alkalmas arra, hogy egy okosszerződés pénzeszközeit kifolyassák, ahogy az a [2016-os DAO hackelésnél](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/) megtörtént. Az újrabelépéses támadás még mindig kritikus probléma az okosszerződéseknél, ahogy azt az [újrabelépéses támadások nyilvános listája](https://github.com/pcaversaccio/reentrancy-attacks) mutatja.

##### Hogyan lehet megakadályozni egy újrabelépéses támadást

Az újrabelépés ellen az [ellenőrzés-eredmények-interakciók mintát](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern) lehet alkalmazni. Ez a minta a függvények végrehajtását úgy rendezi, hogy az a kód jön először, amely a szükséges ellenőrzéseket végzi, azután a szerződés státuszát változtatják meg, végül a más szerződésekkel vagy külső tulajdonú számlákkal (EOA) való interakció következik.

Az ellenőrzés-eredmények-interakciók minta a következőképpen néz ki a `victim` (áldozat) szerződésének új verziójában:

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

Ez a szerződés _ellenőrzi_ a felhasználó egyenlegét, érvényesíti a `withdraw()` függvény _eredményét_ (azáltal, hogy az egyenleget 0-ra állítja), és végül elvégzi az _interakciót_ (ETH-t küld a felhasználó címére). Ezáltal a szerződés először befrissíti a tárolt adatot, és csak utána végzi a külső hívást, így nincs lehetőség az újrabelépésre, mint korábban. Az `attacker` szerződés még mindig vissza tudja hívni a `NoLongerAVictim` (nem áldozat) szerződést, de mivel a `balances[msg.sender]` (egyenlege) már 0, a többi kivétel hibára fut.

Másik lehetőség egy kölcsönös kizárás (más néven mutex), amely lezárja a szerződés státuszának egy részét addig, amíg a függvénymeghívás teljesül. Ezt egy boolean változóval lehet bevezetni, ami először `true` (igaz) a függvényvégrehajtás előtt, majd `false` (hamis) lesz a meghívás befejeztével. Ahogy az alábbi példából látszik, a mutex használata megvédi a függvényt attól, hogy újra meghívják, miközben az eredeti meghívás még zajlik, így hatásosan kivédi az újrabelépést.

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

Továbbá a [„fizetéskérés”](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) rendszere is használható, amelynél a felhasználó vesz ki pénzt az okosszerződésből ahelyett, hogy a szerződés „fizetésküldést” végezne a számlák felé. Így nem lehet véletlenül elindítani egy kódot ismeretlen címeken (és bizonyos szolgálatmegtagadási támadásokat is ki tud védeni).

#### Egész szám túlfolyása lefelé vagy felfelé {#integer-underflows-and-overflows}

Egy egész szám akkor folyik túl felfelé, amikor egy aritmetikai művelet eredménye kívül esik az elfogadható tartományon, így az „tovább gördül” a legalacsonyabb megjeleníthető értékre. Például egy `uint8` csak 2^8-1=255 értéket tud tárolni. Az aritmetikai művelet, amelynek eredménye nagyobb mint `255`, túlfolyik és visszaállítja az `uint` kódot `0` értékre, ahhoz hasonlóan, ahogy egy autóban a megtett távolságot mérő óra is 0-ra fordul át, ha elérte a maximális értékét (999 999).

Az egész szám lefelé való túlfolyása hasonló okokból következik be: az aritmetikai művelet eredménye az elfogadható tartomány alá esik. Tegyük fel, Ön szeretné lecsökkenteni a `0` értéket egy `uint8` típusú mezőben, így az egyszerűen átfordul a maximális megjeleníthető értékre (`255`).

Mindkét irányú túlfolyás a szerződés állapotváltozóiban váratlan változásokat eredményezhet, így nem tervezett végrehajtást okozhat. Az alábbi példa bemutatja, hogyan tudja egy támadó kihasználni az aritmetikai túlfolyást egy okosszerződésben, hogy érvénytelen műveletet hajtson végre:

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

##### Hogyan akadályozható meg egy egész szám túlfolyása lefelé vagy felfelé

A 0.8.0 verzió szerint a Solidity átfordító elutasítja azokat a kódokat, amelyek az egész szám túlfolyását eredményezik. Ugyanakkor az alacsonyabb verziójú átfordítóval készült szerződések esetén ellenőrizni kell azokat a függvényeket, amelyek aritmetikai műveleteket hajtanak végre, vagy egy olyan könyvtárat lehet használni (például [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)), amely ellenőrzi a túlfolyásokat.

#### Orákulum manipulációja {#oracle-manipulation}

Az [orákulumok](/developers/docs/oracles/) láncon kívüli információkat gyűjtenek és beküldik azokat a láncra, hogy az okosszerződések használhassák. Az orákulumok révén Ön olyan okosszerződéseket tervezhet, amelyek együtt tudnak működni láncon kívüli rendszerekkel, mint a tőkepiacok, ezzel nagy mértékben kiterjesztve az alkalmazási körüket.

Ha viszont az orákulum korrupttá válik és nem helyes információkat küld a láncra, az okosszerződések hibás bejövő adatok alapján fognak működni, ez pedig problémákat okoz. Ez az „orákulumprobléma” alapja, amely miatt biztosítani kell, hogy a blokklánc-orákulum által adott információ pontos, friss és időben elérhető legyen.

Az ehhez kapcsolódó biztonsági probléma az, amikor például egy decentralizált tőzsde a láncon belüli orákulumot használja arra, hogy megszerezze egy eszköz azonnali (spot) árát. A kölcsönző platformok a [decentralizált pénzügyek (DeFi)](/defi/) iparágában gyakran csinálják ezt, hogy meghatározzák a felhasználó fedezetének értékét, és ezáltal a kölcsön mértékét.

A DEX árak gyakran igen pontosak, akár nagy mértékben is, mivel az arbitrázst kihasználók helyreállítják a piacokon az egyensúlyt. Ugyanakkor teret adnak a manipulációra, főleg ha a láncon futó orákulum az eszköz árát a korábbi kereskedelmi minták alapján számolja (ami általában igaz).

Például egy támadó mesterségesen fel tudja pumpálni egy eszköz azonnali árát azáltal, hogy egy villámkölcsönt vesz fel éppen a kölcsönszerződés megkötése előtt. Ekkor a DEX lekérdezés az eszköz áráról egy magasabb értéket fog mutatni (mivel a támadó nagy összegű vételi igénye elmozdította az eszköz keresletét), így magasabb kölcsönt vehetnek fel, mint amit lehetne. Az ilyen „villámkölcsön-támadások” kihasználták azt, hogy a DeFi alkalmazások az orákulumokra támaszkodnak az árakat tekintve, és így sok milliónyi elveszett pénzeszközt eredményeztek a protokolloknak.

##### Hogyan lehet elkerülni az oracle manipulációt

A minimum követelmény az [oracle manipuláció elkerülésére](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) az, hogy decentralizált oracle-hálózatokat kell használni, amelyek több forrásból szerzik be az információkat, így elkerülhető az egyetlen meghibásodási pont lehetősége. A legtöbb esetben a decentralizált orákulumoknak beépített kriptogazdasági ösztönzőik vannak, hogy az orákulum-csomópontok a helyes információt jelentsék, így sokkal biztonságosabbak, mint a centralizált társaik.

Ha Ön azt tervezi, hogy egy láncon lévő orákulumot kérdez le eszközárakért, akkor használjon olyat, amely idővel súlyozott átlagárat (TWAP) számol. A [TWAP-orákulum](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) egy adott eszköz árát két különböző időpontban (ami módosítható) kérdezi le, és a megszerzett átlaga alapján kalkulálja az azonnali árat. A hosszabb időtartomány használata megvédi a protokollt az ármanipulációtól, mert a közelmúltban végrehajtott nagy rendelések nem befolyásolják az árat.

## Okosszerződés-biztonsággal kapcsolatos anyagok fejlesztők számára {#smart-contract-security-resources-for-developers}

### Eszközök az okosszerződések elemzéséhez és a kód helyességének ellenőrzéséhez {#code-analysis-tools}

- **[Tesztelő eszközök és könyvtárak](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** – _Iparági standard eszközök és könyvtárak gyűjteménye az okosszerződések egységteszteléséhez, valamint a statikus és dinamikus elemzéséhez._

- **[Formális ellenőrzési (formal verification) eszközök](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** – _Eszközök arra, hogy ellenőrizzék az okosszerződések funkcionális helyességét és az állandókat._

- **[Okosszerződés auditálásra vonatkozó szolgáltatások](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** – _Szervezetek listája, amelyek auditszolgáltatást kínálnak okosszerződésekre az Ethereum fejlesztési projektek számára._

- **[Hibavadász platformok](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** – _Platformok a hibavadászatok és a jutalmak koordinálására, hogy azok feltárják az okosszerződésekben lévő kritikus sebezhetőségeket._

- **[Fork Checker](https://forkchecker.hashex.org/)** – _Egy ingyenes online eszköz arra, hogy információt kapjon egy elágaztatott szerződésről._

- **[ABI Encoder](https://abi.hashex.org/)** – _Egy ingyenes online szolgáltatás a Solidity szerződés függvényeinek és constructor parancsainak kódolására._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** – _Solidity statikus elemző, amely végigjárja az absztrakt szintaxisfákat (AST), hogy kiszűrje a feltételezett sebezhetőségeket, és könnyen érthető markdown formátumban kiírja a problémákat._

### Eszközök az okosszerződések felügyeletére {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** – _Egy eszköz az okosszerződés automatikus felügyeletére, valamint az eseményekre, függvényekre és tranzakcióparaméterekre való válaszadásra._

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)** – _Egy eszköz, amellyel valós idejű értesítést kaphat, amikor az okosszerződésén vagy tárcáján szokatlan vagy váratlan események történnek._

### Eszközök az okosszerződések biztonságos adminisztrálásához {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** – _Interfész az okosszerződések adminisztrációjának kezeléséhez, beleértve a hozzáférés-kezelést, frissítéseket és leállítást is._

- **[Safe](https://safe.global/)** – _Egy okosszerződéses tárca az Ethereumon, amelynél adott számú embernek jóvá kell hagynia a tranzakciót, mielőtt az megtörténhetne (N számú tagból M-nek)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)** – _Szerződéskönyvtárak az adminisztrációs jellemzők bevezetésére, beleértve a szerződés tulajdonlását, frissítéseket, hozzáférés-kezelést, irányítást, leállíthatóság és még sok mást._

### Okosszerződés auditálására kínált szolgáltatások {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** – _Okosszerződés auditálására kínált szolgáltatások, amelyek támogatják a blokklánc-ökoszisztéma projektjeit, hogy a protokolljaik készen állnak-e a bevezetésre és úgy épültek-e meg, hogy védik a felhasználókat._

- **[CertiK](https://www.certik.com/)** – _Egy blokkláncbiztonsággal foglalkozó cég, amely úttörőként használja az élvonalbeli formális ellenőrzés technológiáját az okosszerződésekre és a blokklánchálózatokra._

- **[Trail of Bits](https://www.trailofbits.com/)** – _Kiberbiztonsági cég, amely kombinálja a biztonsági kutatást és a támadói mentalitást, hogy csökkentse a kockázatot és megerősítse a kódot._

- **[PeckShield](https://peckshield.com/)** – _Blokkláncbiztonsággal foglalkozó cég, amely a teljes blokklánc-ökoszisztémához kínál termékeket és szolgáltatásokat a biztonság, adatvédelem és használhatóság területein._

- **[QuantStamp](https://quantstamp.com/)** – _Auditszolgáltatás, amely elősegíti a blokklánctechnológia kiterjedt használatát a biztonsági és kockázatelemzési szolgáltatásokkal._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** – _Okosszerződés-biztonsággal foglalkozó cég, amely a megosztott rendszerek számára biztosít biztonsági auditokat._

- **[Runtime Verification](https://runtimeverification.com/)** – _Biztonsági cég, amely az okosszerződések formális modellezésére és ellenőrzésére specializálódott._

- **[Hacken](https://hacken.io)** – _Web3 kiberbiztonsági auditor, amely 360 fokos megközelítést alkalmaz a blokkláncbiztonságban._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** – _Solidity és Cairo auditszolgáltatások, amelyekkel az okosszerződések integritása, valamint a felhasználók biztonsága is biztosíthat az Ethereumon és a Starkneten._

- **[HashEx](https://hashex.org/)** – _A HashEx a blokkláncok és okosszerződések auditálásra szakosodott a kriptovaluták biztonságának biztosítása céljából, illetve olyan szolgáltatásokat nyújt, mint az okosszerződés-fejlesztés, sérülékenység-vizsgálat, blokklánctanácsadás._

- **[Code4rena](https://code4rena.com/)** – _Versenyképes auditplatform, amely arra ösztönzi az okosszerződés-biztonsági szakértőket, hogy sebezhetőséget találjanak és segítsenek a web3-at biztonságosabbá tenni._

- **[CodeHawks](https://codehawks.com/)** – _Versenyképes auditplatform, amely okosszerződések auditálási versenyeit tartja a biztonsági szakértők számára._

- **[Cyfrin](https://cyfrin.io)** – _Web3 biztonsági erőmű, elősegíti kriptobiztonságot termékeken és okosszerződés-ellenőrzési szolgáltatásokon keresztül._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** – _Web3 biztonsági cég, amely a blokkláncrendszerek biztonsági ellenőrzését kínálja tapasztalt auditorcsapattal és a legjobb eszközökkel._

- **[Oxorio](https://oxor.io/)** - _Okosszerződés-auditok és blokkláncbiztonsági szolgáltatások, szakértelem az EVM, Solidity, ZK, kriptocégek láncok közötti technológiái és DeFi projektek területén._

- **[Inference](https://inference.ag/)** - _Biztonsági auditot végző cég, az EVM-alapú blokkláncok okosszerződés-auditjára specializálódva. A tapasztalt auditorok beazonosítják a lehetséges problémákat és megvalósítható megoldásokat javasolnak, hogy telepítés előtt ki legyenek javítva._

### Hibavadászplatformok {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** – _Hibavadászplatform okosszerződésekhez és DeFi-projektekhez, ahol a biztonsági kutatók átnézik a kódot, kizárják a sebezhetőségeket, ezért jutalmat kapnak, és biztonságosabbá teszik a kripto világát._

- **[HackerOne](https://www.hackerone.com/)** – _Sebezhetőségi koordináció és hibavadászplatform, amely összeköti a vállalkozásokat a sebezhetőségi tesztelőkkel és kiberbiztonsági kutatókkal._

- **[HackenProof](https://hackenproof.com/)** – _Szakértői hibavadászplatform kriptoprojektek (DeFi, okosszerződések, tárcák, CEX stb.) számára, ahol a biztonsági szakértők prioritási sorrendszolgáltatást nyújtanak, a kutatók pedig jutalmat kapnak a releváns, igazolt hibák jelentéséért._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Biztosítja a web3-ban az okosszerződések biztonságát, az auditorok kifizetéseit okosszerződéseken keresztül kezelik, hogy biztosítsák a releváns hibák kifizetését._

-  **[CodeHawks](https://www.codehawks.com/)** - _Versenyképes hibavadász platform, ahol az auditorok biztonsági vetélkedőkben és kihívásokban vesznek részt, majd a saját privát auditjukban._

### Publikációk az okosszerződések ismert sebezhetőségeiről és azok kihasználásáról {#common-smart-contract-vulnerabilities-and-exploits}

- **[Consensys: az okosszerződéseket ért ismert támadások](https://consensys.github.io/smart-contract-best-practices/attacks/)** – _Egyszerűen megfogalmazott magyarázat a legkomolyabb sérülékenységekről a szerződésekben, a legtöbb esetben mintakódokkal együtt._

- **[SWC Registry](https://swcregistry.io/)** – _A Közös gyengeségek felsorolásának (CWE) gondozott listája, amelyen az Ethereum okosszerződésekre vonatkozó tételek szerepelnek._

- **[Rekt](https://rekt.news/)** – _Rendszeresen frissített publikáció a nagy jelentőségű kriptohackelésekről és támadásokról, az esemény után készült részletes riportokkal._

### Kihívások az okosszerződés-biztonság elsajátításában {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** – _Blokkláncbiztonsági háborús játékok, kihívások és [szerezd meg a zászlót (Capture The Flag)](https://www.webopedia.com/definitions/ctf-event/amp/) versenyek és megoldások gondozott listája._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** – _Háborús játék a DeFi okosszerződések támadó biztonságának elsajátításához, valamint készségek fejlesztéséhez a hibavadászatban és a biztonsági auditban._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** – _Web3/Solidity-alapú háborús játék, ahol minden szint egy okosszerződés, amelyet meg kell „hackelni”._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Okosszerződés hackelési kihívás egy fantáziakalandba ágyazva. A kihívás sikeres teljesítése egy privát hibavadász programhoz ad hozzáférést._

### Bevált gyakorlatok az okosszerződések biztonságossá tételére {#smart-contract-security-best-practices}

- **[ConsenSys: az Ethereum okosszerződés-biztonság bevált gyakorlatai](https://consensys.github.io/smart-contract-best-practices/)** – _Részletes útmutatók az Ethereum-okosszerződések biztonságossá tételére._

- **[Nascent: Egyszerű biztonsági eszközrendszer](https://github.com/nascentxyz/simple-security-toolkit)** – _Hasznos biztonságközpontú útmutatók és ellenőrző listák gyűjteménye okosszerződés-fejlesztéshez._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** – _Biztonsági minták és bevált gyakorlatok hasznos gyűjteménye Solidity programnyelven írt okosszerződésekhez._

- **[Solidity Docs: Biztonsági megfontolások](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** – _Útmutatók a biztonságos okosszerződések írásához Solidity nyelven._

- **[Smart Contract Security Verification Standard](https://github.com/securing/SCSVS)** – _Egy tizennégy részes ellenőrző lista fejlesztők, architektúrával foglalkozók, biztonság-ellenőrzők és beszállítók számára az okosszerződések biztonságának szabványosításához._

- **[Az okosszerződések biztonságának és auditálásának elsajátítása](https://updraft.cyfrin.io/courses/security)** – _Az okosszerződések biztonságát és auditálását oktató tanfolyamot olyan fejlesztőknek hozták létre, akik a legjobb biztonsági gyakorlatok mentén szeretnének fejleszteni és biztonsági kutatókká válni._

### Útmutatók az okosszerződés-biztonságról {#tutorials-on-smart-contract-security}

- [Hogyan lehet biztonságosabb okosszerződéskódot írni](/developers/tutorials/secure-development-workflow/)

- [A Slither használata okosszerződés bugok felderítésére](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [A Manticore használata okosszerződés bugok felderítésére](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Okosszerződések biztonsági irányelvei](/developers/tutorials/smart-contract-security-guidelines/)

- [Hogyan lehet biztonságosan integrálni a tokenszerződést tetszőleges tokenekkel](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft – Okosszerződések biztonsága és auditálása tanfolyam](https://updraft.cyfrin.io/courses/security)
