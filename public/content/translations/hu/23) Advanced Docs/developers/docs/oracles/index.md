---
title: Orákulumok
description: Az orákulumok valós adatokhoz való hozzáférést biztosítanak az Ethereum okosszerződései számára, több felhasználási lehetőséget és nagyobb értéket teremtve a felhasználóknak.
lang: hu
---

Az orákulumok olyan alkalmazások, amelyek adatcsatornákat hoznak létre, hogy elérhetővé tegyék a láncon kívüli adatforrásokat a blokkláncon lévő okosszerződések számára. Erre azért van szükség, mert az Ethereum-alapú okosszerződések alapértelmezés szerint nem férhetnek hozzá a blokkláncon kívül tárolt információkhoz.

Ha az okosszerződéseket a láncon kívüli adatok felhasználásával lehet végrehajtani, az kiterjeszti a decentralizált alkalmazások hasznosságát és értékét. A láncon belüli előrejelzési piacok például orákulumokra támaszkodnak, hogy információt szolgáltassanak az eredményekről, amelyet a felhasználók előrejelzéseinek validálására használnak. Tegyük fel, hogy Alice 20 ETH-t tesz fel arra, hogy ki lesz a következő amerikai elnök. Ebben az esetben az előrejelzési piac dappnak szüksége van egy orákulumra, amely megerősíti a választási eredményeket, és meghatározza, hogy Alice jogosult-e kifizetésre.

## Előfeltételek {#prerequisites}

Ezt az oldalt könnyebb megérteni, ha az olvasó ismeri az Ethereum alapjait, beleértve a [csomópontokat](/developers/docs/nodes-and-clients/), a [konszenzusmechanizmusokat](/developers/docs/consensus-mechanisms/) és az [EVM-et](/developers/docs/evm/). Érdemes ismerni a [okosszerződéseket](/developers/docs/smart-contracts/) és a [okosszerződések anatómiáját](/developers/docs/smart-contracts/anatomy/), különösen az [eseményeket](/glossary/#events).

## Mi az a blokkláncorákulum? {#what-is-a-blockchain-oracle}

Az orákulumok olyan alkalmazások, amelyek külső információkat (azaz a láncon kívül tárolt információkat) gyűjtenek, ellenőriznek és továbbítanak a blokkláncon futó okosszerződésekhez. Amellett, hogy az orákulumok a láncon kívüli adatokat hoznak be az Ethereumra és terjesztik szét azokat, a blokkláncról információkat is küldhetnek külső rendszerekbe, például feloldhatnak egy intelligens zárat, amint a felhasználó Ethereum-tranzakción keresztül elküldi a releváns díjat.

Orákulum nélkül az okosszerződés kizárólag a láncon belüli adatokra korlátozódna.

Az orákulumok eltérnek az adatforrás (egy vagy több forrás), a bizalomigény (centralizált vagy decentralizált) és a rendszer felépítése (azonnali olvasás, közzététel-feliratkozás és kérés-válasz) szerint. Az orákulumokat aszerint is megkülönböztethetjük, hogy külső adatokat kérnek le a láncon belüli szerződéseknek (bemeneti orákulumok), információt küldenek a blokkláncból a láncon kívüli alkalmazásoknak (kimeneti orákulumok), vagy számítási feladatokat végeznek a láncon kívül (számítási orákulumok).

## Miért szükséges az okosszerződésekhez orákulum? {#why-do-smart-contracts-need-oracles}

Sok fejlesztő úgy tekint az okosszerződésekre, mint a blokklánc adott címein futó kódokra. Az okosszerződések [általánosabb nézete](/smart-contracts/) azonban az, hogy ezek olyan önvégrehajtó szoftverprogramok, amelyek képesek a felek közötti megállapodások érvényesítésére, ha bizonyos feltételek teljesülnek – innen ered az okosszerződés kifejezés.

De az okosszerződések használata az emberek közötti megállapodások érvényesítésére nem egyszerű, mivel az Ethereum determinisztikus. A [determinisztikus rendszer](https://en.wikipedia.org/wiki/Deterministic_algorithm) egy kezdeti állapot, amely egy adott bemenet mellett mindig ugyanazt az eredményt produkálja, vagyis nincs véletlenszerűség vagy variáció a bemenetekből származó kimenetek kiszámításának folyamatában.

A determinisztikus végrehajtás elérése érdekében a blokkláncok a csomópontokat arra korlátozzák, hogy egyszerű bináris (igaz/hamis) kérdésekben konszenzusra jussanak _csak_ a blokkláncon tárolt adatok felhasználásával. Példák az ilyen kérdésekre:

- „A (nyilvános kulccsal azonosított) számlatulajdonos aláírta ezt a tranzakciót a hozzá tartozó privát kulccsal?”
- „Van-e elegendő fedezet ezen a számlán a tranzakció fedezésére?”
- „Érvényes ez a tranzakció az adott okosszerződés keretében?” stb.

Ha a blokkláncok külső forrásból (azaz a való világból) kapnának információt, a determinizmus megvalósítása lehetetlen lenne, ami megakadályozná, hogy a csomópontok megegyezzenek a blokklánc státuszában bekövetkezett változásokról. Vegyünk például egy olyan okosszerződést, amely egy tranzakciót hajt végre a hagyományos ár-API-ból kapott aktuális ETH-USD árfolyam alapján. Ez a szám valószínűleg gyakran változik (arról nem is beszélve, hogy az API-t elavulttá tehetik vagy feltörhetik), ami azt jelenti, hogy az azonos szerződéskódot végrehajtó csomópontok különböző eredményekre jutnának.

Egy olyan nyilvános blokklánc esetében, mint az Ethereum, ahol világszerte több ezer csomópont dolgozza fel a tranzakciókat, a determinizmus kritikus fontosságú. Mivel nincs központi hatóság, amely az igazság forrásaként szolgálna, a csomópontoknak olyan mechanizmusokra van szükségük, amelyekkel ugyanazon tranzakciók feldolgozása után ugyanazt az státuszt érik el. Az az eset, amikor az A csomópont végrehajtja egy okosszerződés kódját, és 3-at kap eredményként, míg a B csomópont 7-et kap ugyanarra, a konszenzus felbomlásához vezetne, és megszüntetné az Ethereum mint decentralizált számítástechnikai platform értékét.

Ez a forgatókönyv rávilágít arra a problémára is, hogy a blokkláncokat úgy tervezzük meg, hogy külső forrásokból nyerjenek információkat. Az orákulumok azonban úgy oldják meg ezt a problémát, hogy információkat vesznek a láncon kívüli forrásokból, és azt a blokkláncon tárolják, hogy az okosszerződések felhasználhassák azokat. Mivel a láncon belül tárolt információk megváltoztathatatlanok és nyilvánosan elérhetők, az Ethereum-csomópontok biztonságosan használhatják a láncon kívülről importált orákulum-adatokat a státuszváltozások kiszámításához anélkül, hogy a konszenzus megszakadna.

Ehhez az orákulum egy láncon belüli okosszerződésből és néhány láncon kívüli komponensből áll. A láncon belüli szerződés más okosszerződésektől kap adatigényléseket, amelyeket a láncon kívüli komponensnek (az úgynevezett orákulum-csomópontnak) továbbít. Ez az orákulum-csomópont lekérdezhet adatforrásokat – például alkalmazás programozási felület (API) használatával –, illetve tranzakciókat küldhet arra, hogy a kért adatok az okosszerződés tárolójába kerüljenek.

Lényegében egy blokklánc-orákulum áthidalja a blokklánc és a külső környezet közötti információs szakadékot, „hibrid okosszerződéseket” létrehozva. A hibrid okosszerződés a láncon belüli szerződéskód és a láncon kívüli infrastruktúra kombinációján alapul. A decentralizált előrejelzési piacok kiváló példái a hibrid okosszerződéseknek. További példák lehetnek a terménybiztosítási okosszerződések, amelyek akkor fizetnek, amikor az orákulumok egy csoportja megállapítja, hogy bizonyos időjárási jelenségek bekövetkeztek.

## Mi az orákulumprobléma? {#the-oracle-problem}

Az orákulumok fontos problémát oldanak meg, de némi bonyodalmat is okoznak, például:

- Hogyan ellenőrizzük, hogy a bejuttatott információ a megfelelő forrásból származik-e, vagy nem manipulálták-e?

- Hogyan biztosítsuk, hogy ezek az adatok mindig rendelkezésre álljanak és rendszeresen frissüljenek?

Az úgynevezett „orákulumprobléma” azokat a nehézségeket mutatja be, amelyek abból adódnak, hogy a blokklánc orákulumai adatot szolgáltatnak az okosszerződéseknek. Az orákulumtól származó adatoknak helyesnek kell lenniük ahhoz, hogy egy okosszerződés helyesen teljesüljön. Továbbá az, hogy meg kell bízni az orákulumoperátorokban, hogy pontos információkat szolgáltassanak, aláássa az okosszerződések bizalomigény nélküli aspektusát.

A különböző orákulumok különböző megoldásokat kínálnak az orákulumproblémára, amelyeket később vizsgálunk meg. Az orákulumokat általában aszerint értékelik, hogy mennyire képesek kezelni a következő kihívásokat:

1. **Helyesség**: Egy orákulum nem okozhatja, hogy az okosszerződések állapotváltozásokat indítsanak el érvénytelen, láncon kívüli adatok alapján. Az orákulumnak garantálnia kell az adatok _hitelességét_ és _integritását_. A hitelesség azt jelenti, hogy az adatok a megfelelő forrásból származnak, az integritás pedig az, hogy az adatok sértetlenek maradtak (azaz nem változtatták meg őket), mielőtt továbbküldték a láncon belülre.

2. **Elérhetőség**: Az orákulum nem késleltetheti vagy akadályozhatja meg az okosszerződések végrehajtását és a státuszváltozások kiváltását. Ez azt jelenti, hogy az orákulumtól származó adatoknak megszakítás nélkül kell _rendelkezésre állniuk kérés esetén_.

3. **Ösztönzőkompatibilitás**: Az orákulumnak ösztönöznie kell a láncokon kívüli adatszolgáltatókat arra, hogy helyes információkat küldjenek az okosszerződéseknek. Az ösztönzőkompatibilitás magában foglalja a _hozzárendelhetőséget_ és az _elszámoltathatóságot_. A hozzárendelhetőség lehetővé teszi egy külső információ összekapcsolását a szolgáltatójával, míg az elszámoltathatóság az adatszolgáltatókat az általuk adott információhoz köti, így a szolgáltatott információ minősége alapján jutalmazhatók vagy büntethetők.

## Hogyan működik a blokklánc orákulumszolgáltatás? {#how-does-a-blockchain-oracle-service-work}

### Felhasználók {#users}

A felhasználók olyan entitások (azaz okosszerződések), amelyeknek a blokkláncon kívüli információkra van szükségük bizonyos műveletekhez. Az orákulumszolgáltatás alapvető folyamata azzal kezdődik, hogy a felhasználó adatot kér az orákulumszerződéstől. Az adatkérések általában az alábbi kérdések némelyikére vagy mindegyikére választ adnak:

1. Milyen forrásokból tájékozódhatnak a láncon kívüli csomópontok a kért információról?

2. Hogyan dolgozzák fel a riportolók az adatforrásokból származó információkat, és hogyan vonják ki a hasznos adatpontokat?

3. Hány orákulum-csomópont vehet részt az adatok lekérdezésében?

4. Hogyan kell kezelni az orákulumjelentésekben szereplő eltéréseket?

5. Milyen módszert kell alkalmazni a beérkezett kérések szűrésére és a jelentések egyetlen értékké történő összesítésére?

### Orákulumszerződés {#oracle-contract}

Az orákulumszerződés az orákulumszolgáltatás láncon belüli összetevője. Figyeli a más szerződésektől érkező adatkéréseket, továbbítja az adatkéréseket az orákulum-csomópontoknak, és a visszaküldött adatokat továbbítja az kliensszerződéseknek. Ez a szerződés végezhet számításokat is a visszaküldött adatpontokon, hogy egy összesített értéket állítson elő, amelyet elküldhet az adatot kérő szerződésnek.

Az orákulumszerződés tartalmaz néhány függvényt, amelyeket a kliensszerződések hívnak meg adatigényléskor. Egy új lekérdezés fogadásakor az okosszerződés egy [naplóeseményt](/developers/docs/smart-contracts/anatomy/#events-and-logs) bocsát ki az adatkérés részleteivel. Ez értesíti a naplóra feliratkozott, láncon kívüli csomópontokat (általában a JSON-RPC `eth_subscribe` parancsot használva), amelyek lekérdezik a naplóeseményben meghatározott adatokat.

Az alábbiakban egy [orákulumszerződéses példa](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) olvasható Pedro Costától. Ez egy egyszerű orákulumszolgáltatás, amely más okosszerződések kérésére lekérdezheti a láncon kívüli API-okat, és a kért információt a blokkláncon tárolja:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) answers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer as the current one
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Orákulum-csomópontok {#oracle-nodes}

Az orákulum-csomópont az orákulumszolgáltatás láncon kívüli összetevője. Információkat szerez külső forrásokból, például harmadik fél szerverein tárolt API-okból, és a láncon belülre helyezi, hogy az okosszerződések felhasználhassák azokat. Az orákulum-csomópontok figyelik a láncon belüli orákulumszerződés eseményeit, és folytatják a naplóban leírt feladat elvégzését.

Az orákulum-csomópontok gyakori feladata, hogy [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) kérést küldjenek egy API-szolgáltatáshoz, elemezzék a választ a releváns adatok kinyeréséhez, formázzák az adatokat a blokklánc által olvasható kimenetté, és elküldjék a láncon belül egy tranzakcióba foglalva az orákulumszerződéshez. Az orákulum-csomópontnak a benyújtott információk érvényességét és sértetlenségét „hitelességi bizonyítékok” segítségével is igazolnia kell, amelyeket később vizsgálunk meg.

A számítási orákulumok a láncon kívüli csomópontokra is támaszkodnak olyan számítási feladatok elvégzésében, amelyeket a láncon belül nem lenne célszerű végrehajtani, tekintettel a gázköltségekre és a blokkméretkorlátokra. Az orákulum-csomópont feladata lehet például egy ellenőrizhetően véletlenszerű szám előállítása (például blokkláncalapú játékok esetében).

## Orákulumtervezési minták {#oracle-design-patterns}

Az orákulumoknak több különböző típusa létezik, beleértve az _azonnali olvasás_, _közzététel-feliratkozás_ és _kérés-válasz_ típusokat, amelyek közül az utóbbi kettő a legnépszerűbb az Ethereum-okosszerződések körében. Röviden ismertetjük a közzététel-feliratkozás és kérés-válasz modelleket.

### A közzététel-feliratkozás orákulumok {#publish-subscribe-oracles}

Az ilyen típusú orákulum egy „adatfolyamot” tesz közzé, amelyet a szerződések rendszeresen olvashatnak információkért. Ebben az esetben az adatok várhatóan gyakran változnak, ezért a kliensszerződéseknek figyelniük kell az orákulum tárolójában lévő adatok frissítésére. Például az az orákulum, mely a legfrissebb ETH-USD árinformációkat szolgáltatja a felhasználóknak.

### Kérés-válasz orákulumok {#request-response-oracles}

A kérés-válasz beállítás lehetővé teszi a kliensszerződés számára, hogy a közzététel-feliratkozás típusú orákulum által biztosított adatoktól eltérő, tetszőleges adatokat kérjen. A kérés-válasz orákulumok ideálisak, ha az adathalmaz túl nagy ahhoz, hogy az okosszerződés tárhelyén tárolják, és/vagy a felhasználóknak az adatoknak csak egy kis részére van szükségük egy adott időpontban.

Bár a közzététel-feliratkozás típusú modelleknél összetettebbek, a kérés-válasz orákulumok alapvetően az előző szakaszban leírtaknak felelnek meg. Az orákulumnak van egy láncon belüli komponense, amely fogad egy adatkérést, és továbbítja azt egy láncon kívüli csomópontnak feldolgozásra.

Az adatlekérdezést kezdeményező felhasználóknak kell fedezniük a láncon kívüli forrásból származó információk költségeit. A kliensszerződésnek biztosítania kell a fedezetet arra a gázköltségre, amikor az orákulumszerződés a választ visszakapja a callback függvényen keresztül.

## A centralizált és a decentralizált orákulumok összehasonlítása {#types-of-oracles}

### Centralizált orákulumok {#centralized-oracles}

A centralizált orákulumot egyetlen szervezet irányítja, amely a láncon kívüli információk összesítéséért és az orákulumszerződés adatainak kérés szerinti frissítéséért is felelős. A centralizált orákulumok hatékonyak, mivel csak egyetlen igazságforrásra támaszkodnak. Jobban működhetnek azokban az esetekben, amikor a védett adatkészleteket közvetlenül a tulajdonos teszi közzé egy elfogadott aláírással. Ugyanakkor hátrányaik is vannak:

#### Alacsony helyességi garanciák {#low-correctness-guarantees}

A centralizált orákulumok esetében nem lehet megerősíteni, hogy a megadott információ helyes-e vagy sem. Még a „jó hírű” szolgáltatók is tévedhetnek vagy feltörhetik őket. Ha az orákulum hibássá válik, az okosszerződések rossz adatok alapján kerülnek végrehajtásra.

#### Alacsony szintű elérhetőség {#poor-availability}

A centralizált orákulumok nem garantálják, hogy mindig elérhetővé teszik a láncon kívüli adatokat az okosszerződések számára. Ha a szolgáltató úgy dönt, hogy kikapcsolja a szolgáltatást, vagy egy hacker eltéríti az orákulum láncon kívüli komponensét, akkor a rá támaszkodó okosszerződést a szolgáltatásmegtagadás (DoS-támadás) kockázata fenyegeti.

#### Gyenge ösztöntzőkompatibilitás {#poor-incentive-compatibility}

A centralizált orákulumok gyakran rosszul megtervezett ösztönzőket adnak az adatszolgáltatóknak vagy nem adnak semmit azért, hogy azok pontos/helyes információkat küldjenek. Ha egy orákulumnak fizetünk a helyességért, az még nem garantálja azt. Ez a probléma annál nagyobb lesz, minél nagyobb az okosszerződések által kezelt érték.

### Decentralizált orákulumok {#decentralized-oracles}

A decentralizált orákulumok célja a centralizáltak korlátainak kiküszöbölése azáltal, hogy kizárjuk az egyetlen meghibásodási pont lehetőségét. A decentralizált orákulumszolgáltatás egy egyenrangú hálózat több résztvevőjéből áll, akik konszenzust alakítanak ki a láncon kívüli adatokról, mielőtt elküldenék azokat egy okosszerződésnek.

Egy decentralizált orákulum (ideális esetben) engedély nélküli, bizalomigénytől mentes és nem kezeli azt egy központi fél; a valóságban a decentralizáció egy spektrumon mozog. Vannak félig decentralizált orákulumhálózatok, amelyekben bárki részt vehet, de van egy „tulajdonos”, aki a korábbi teljesítmény alapján jóváhagyja és eltávolítja a csomópontokat. Léteznek teljesen decentralizált orákulumhálózatok is: ezek általában önálló blokkláncokként működnek, és meghatározott konszenzusmechanizmusokkal rendelkeznek a csomópontok koordinálására és a helytelen viselkedés szankcionálására.

A decentralizált orákulumok használata a következő előnyökkel jár:

### Magas szintű helyességi garanciák {#high-correctness-guarantees}

A decentralizált orákulumok különböző megközelítésekkel próbálják elérni az adatok helyességét. Ez magában foglalja a visszaküldött információk hitelességét és integritását igazoló bizonyítékok használatát, valamint több szervezetnek együttesen meg kell állapodnia a láncon kívüli adatok érvényességéről.

#### Hitelességi igazolások {#authenticity-proofs}

A hitelességi bizonyítékok olyan kriptográfiai mechanizmusok, amelyek lehetővé teszik a külső forrásból származó információk független ellenőrzését. Ezek a bizonyítékok hitelesíthetik az információ forrását, és felismerhetik azt, hogy módosították-e az adatokat a lekérdezés után.

Példák a hitelességi igazolásokra:

**Transport Layer Security (TLS) bizonyítékok**: Az orákulum-csomópontok gyakran kérnek le adatokat külső forrásokból a Transport Layer Security (TLS) protokollon alapuló biztonságos HTTP-kapcsolat segítségével. Egyes decentralizált orákulumok hitelességi igazolásokat alkalmaznak a TLS-munkamenetek ellenőrzésére (azaz egy csomópont és egy adott kiszolgáló közötti információcsere megerősítésére), és arra, hogy a munkamenet tartalmát nem módosították.

**Trusted Execution Environment (TEE) tanúsítványok**: A [megbízható végrehajtási környezet](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) egy olyan sandbox számítási környezet, amely elszigetelten működik a gazdarendszer folyamataitól. A TEE-k biztosítják, hogy a számítási környezetben tárolt/használt alkalmazáskód vagy adat megőrzi integritását, bizalmas jellegét és megváltoztathatatlanságát. A felhasználók tanúsítást is létrehozhatnak annak igazolására, hogy egy alkalmazáspéldány a megbízható végrehajtási környezetben fut.

A decentralizált orákulumok bizonyos osztályai megkövetelik, hogy az orákulum-csomópontok üzemeltetői TEE-tanúsítványokat adjanak. Ez megerősíti a felhasználó felé, hogy a csomópont üzemeltetője egy megbízható végrehajtási környezetben futtatja az orákulumkliens egy példányát. A TEE-k megakadályozzák, hogy külső folyamatok megváltoztassák vagy elolvassák az alkalmazás kódját és adatait, ezért ezek az igazolások bizonyítják, hogy az orákulum-csomópont sértetlenül és bizalmasan őrzi az információkat.

#### Az információk konszenzusalapú validálása {#consensus-based-validation-of-information}

A centralizált orákulumok az igazság egyetlen forrására támaszkodnak, amikor adatokat szolgáltatnak az okosszerződéseknek, ami magában hordozza a pontatlan információk közzétételének lehetőségét. A decentralizált orákulumok úgy oldják meg ezt a problémát, hogy több orákulum-csomópontra támaszkodva kérdezik le a láncon kívüli információkat. A több forrásból származó adatok összehasonlításával a decentralizált orákulumok csökkentik azt a kockázatot, hogy az érvénytelen információkat adnak a láncon belüli szerződéseknek.

A decentralizált orákulumoknak azonban kezelniük kell a több, láncon kívüli forrásból származó információk közötti eltéréseket. Az információkülönbségek minimalizálása és annak biztosítása érdekében, hogy az orákulumszerződéshez továbbított adatok az orákulum-csomópontok kollektív véleményét tükrözzék, a decentralizált orákulumok a következő mechanizmusokat használják:

##### Szavazás/letétadás az adatok pontossága érdekében

Egyes decentralizált orákulumhálózatok megkövetelik, hogy a résztvevők szavazzanak vagy letétet helyezzenek az adatkérdésekre adott válaszok pontosságára (például „Ki nyerte a 2020-as amerikai választásokat?”) a hálózat natív tokenjét használva. Ezután egy aggregációs protokoll összesíti a szavazatokat és letéteket, és a többség által támogatott választ tekinti érvényesnek.

Azokat a csomópontokat, amelyek válaszai eltérnek a többségi választól, úgy büntetik, hogy a tokenjeiket szétosztják azok között, amelyek többször adnak helyes értéket. Ha a csomópontoknak az adatszolgáltatás előtt kötelezvényt kell adniuk, akkor ez őszinte válaszadásra ösztönzi őket, mivel feltételezzük, hogy a racionális gazdasági szereplők hozammaximalizálásra törekszenek.

A letét adás/szavazás megvédi a decentralizált orákulumokat a [Sybil-támadásoktól](/glossary/#sybil-attack) is, amikor a rosszindulatú szereplők több személyazonosságot hoznak létre, hogy kijátsszák a konszenzusrendszert. A letétadás azonban nem tudja megakadályozni az „ingyenélést” (az orákulum-csomópontok másolnak információt másoktól) és a „lusta validálást” (a többséget követik anélkül, hogy maguk ellenőriznék az információt).

##### Schelling-pont mechanizmusok

A [Schelling-pont](https://en.wikipedia.org/wiki/Focal_point_(game_theory)) egy játékelméleti fogalom, amely feltételezi, hogy több entitás mindig egy közös problémamegoldásra jut, ha nincs kommunikáció. A Schelling-pont mechanizmusokat gyakran használják a decentralizált orákulumhálózatokban, hogy a csomópontok konszenzusra jussanak az adatkérésekre adott válaszokkal kapcsolatban.

Ennek egyik korai ötlete volt a [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), egy olyan adatfolyam, ahol a résztvevők „skaláris” kérdésekre (melyek nagyságrendekre vonatkoznak, például „mennyi az ETH ára?”) adnak válaszokat, egy letéttel együtt. Azok a felhasználók, akik a 25. és 75. [percentilis](https://en.wikipedia.org/wiki/Percentile) közötti értékeket adnak, jutalomban részesülnek, akiknek az értékei nagymértékben eltérnek a mediánértéktől, büntetést kapnak.

Bár SchellingCoin ma még nem létezik, számos decentralizált orákulum – nevezetesen a [Maker Protocol's Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module) – használja a schelling-pont mechanizmust az orákulumadatok pontosságának javítására. Minden Maker Oracle csomópont két komponensből áll: a csomópontok („közvetítők” és „ellátók/betáplálók”) láncon kívüli peer-to-peer (P2P) hálózatból, amelyek a biztosítéki eszközök piaci árait megadják, valamint egy láncon belüli „Medianizer” szerződésből, amely kiszámítja a megadott értékek mediánját. A megadott késleltetési időszak lejártával ez a mediánérték lesz a kapcsolódó eszköz új referenciaára.

További példák a Schelling-pont mechanizmusokat használó orákulumokra: [Chainlink Off-Chain Reporting](https://docs.chain.link/docs/off-chain-reporting/) és [Witnet](https://witnet.io/). Mindkét rendszerben a peer-to-peer hálózat orákulum-csomópontjaitól érkező válaszokat egyetlen összesített értékké, például átlagértékké vagy mediánná aggregálják. A csomópontokat aszerint jutalmazzák vagy büntetik, hogy válaszaik milyen mértékben igazodnak az összesített értékhez vagy térnek el attól.

A Schelling-pont mechanizmusok azért vonzók, mert minimalizálják a láncon belüli lábnyomot (egy tranzakció kell hozzá), miközben garantálják a decentralizációt. Ez utóbbi azért lehetséges, mert a csomópontoknak alá kell írniuk a benyújtott válaszok listáját, mielőtt az bekerül az átlag/középértéket előállító algoritmusba.

### Elérhetőség {#availability}

A decentralizált orákulumszolgáltatások képesek biztosítani az okosszerződéseknek a láncon kívüli adatok magas szintű elérhetőségét. Ehhez decentralizálni kell mind a láncon kívüli információk forrását, mind az információk láncon belüli továbbításáért felelős csomópontokat.

Ez biztosítja a hibatűrést, mivel az orákulumszerződés több csomópontra támaszkodhat (amelyek több adatforrásra támaszkodnak) a szerződések lekérdezéseinek végrehajtásában. A decentralizáció a forrás _és_ a csomópontüzemeltető szintjén döntő fontosságú – az orákulum-csomópontok hálózata, mely azonos forrásra támaszkodik, ugyanabba a problémába ütközik, mint egy centralizált orákulum.

A letétalapú orákulumoknál lehetséges súlyos büntetést (slashing) adni a csomópont-üzemeltetőknek, ha nem reagálnak gyorsan az adatkérésekre. Ez jelentősen ösztönzi az orákulum-csomópontokat arra, hogy hibatűrő infrastruktúrába fektessenek, és időben szolgáltassanak adatokat.

### Jó ösztöntzőkompatibilitás {#good-incentive-compatibility}

A decentralizált orákulumok különböző ösztönzőket alkalmaznak, hogy megakadályozzák a [bizánci](https://en.wikipedia.org/wiki/Byzantine_fault) viselkedést a orákulum-csomópontok között. Az ösztönzőkompatibilitás magában foglalja a _hozzárendelhetőséget_ és az _elszámoltathatóságot_:

1. A decentralizált orákulum-csomópontoknak gyakran alá kell írniuk az adatkérésekre adott adatokat. Ez az információ segít az orákulum-csomópontok teljesítményének értékelésében, így a felhasználók adatigényléskor kiszűrhetik a megbízhatatlan szereplőket. Ilyen például a Witnet [Algoritmikus reputációs rendszere (Algorithmic Reputation System)](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system).

2. A decentralizált orákulumok megkövetelhetik a csomópontoktól, hogy az általuk benyújtott adatok helyességét letéttel is alátámasszák. Ha az adatszolgáltatás helyes, ez a letét a szolgálatért járó jutalmakkal együtt visszatérül. De büntetésképpen slashelhető is, ha az információ téves, ami bizonyos fokú elszámoltathatóságot biztosít.

## Orákulumok alkalmazása az okosszerződésekben {#applications-of-oracles-in-smart-contracts}

Az Ethereumon használt orákulumok gyakori felhasználási esetei a következők:

### Pénzügyi adatok lekérdezése {#retrieving-financial-data}

A [decentralizált pénzügyi](/defi/) (DeFi) alkalmazások lehetővé teszik a peer-to-peer hitelezést, kölcsönzést és az eszközök kereskedelmét. Ehhez gyakran különböző pénzügyi információk beszerzésére van szükség, beleértve az árfolyamadatokat (a kriptovaluták fiat-értékének kiszámításához vagy a tokenárak összehasonlításához) és a tőkepiaci adatokat (a tokenizált eszközök, például az arany vagy az amerikai dollár értékének kiszámításához).

Egy DeFi kölcsönzési protokollnak például le kell kérdeznie a biztosítékként letétbe helyezett eszközök (például az ETH) aktuális piaci árait. Ez lehetővé teszi, hogy a szerződés meghatározza a fedezeti eszközök értékét, és ezáltal a felvehető kölcsön értékét is.

A DeFi népszerű „ár-orákulumjai” közé tartozik a Chainlink Price Feeds, a Compound Protocol [Open Price Feed](https://compound.finance/docs/prices), az Uniswap [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) és a [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Az építőknek meg kell érteniük az ezekkel az ár-orákulumokkal járó fenntartásokat, mielőtt beépítenék őket a projektjükbe. Ez a [cikk](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) részletes elemzést nyújt arról, hogy mit kell figyelembe venni, ha az említett ár-orákulumok bármelyikét használni szeretnénk.

Következzen egy példa arra, hogyan lehet lekérdezni a legfrissebb ETH árat az okosszerződésben a Chainlink árakra vonatkozó adatfolyamával:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Ellenőrizhető véletlenszerűség generálása {#generating-verifiable-randomness}

Bizonyos blokklánc-alkalmazások, mint például a játékok vagy a lottórendszerek, nagyfokú kiszámíthatatlanságot és véletlenszerűséget igényelnek a hatékony működéshez. A blokkláncok determinisztikus végrehajtása azonban kiküszöböli a véletlenszerűséget.

Az eredeti megközelítés az álvéletlenszerű kriptográfiai függvények használata volt, mint például a `blockhash`, de ezeket [manipulálhatták a bányászok](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) a proof-of-work algoritmust megoldva. Továbbá, az Ethereum [proof-of-stake mechanizmusra való átváltása](/roadmap/merge/) azt jelenti, hogy a fejlesztők többé nem támaszkodhatnak a `blockhash`-re a láncon belüli véletlenszerűség tekintetében. A Beacon-lánc [RANDAO mechanizmusa](https://eth2book.info/altair/part2/building_blocks/randomness) azonban alternatív véletlenszerűségi forrást biztosít.

Lehetséges a véletlen értéket a láncon kívül generálni és a láncon belül elküldeni, de ez nagy bizalmi követelményeket támaszt a felhasználókkal szemben. Azt kell hinniük, hogy az érték valóban kiszámíthatatlan mechanizmusok révén jött létre, és nem változott meg az átadás során.

A láncon kívüli számításhoz tervezett orákulumok úgy oldják meg ezt a problémát, hogy biztonságosan generálnak véletlenszerű eredményeket, amelyeket a folyamat kiszámíthatatlanságát igazoló kriptográfiai bizonyítékokkal együtt továbbítanak a láncon belülre. Ilyen például a [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Igazolható véletlenfüggvény/Verifiable Random Function), amely egy bizonyíthatóan igazságos és hamisításbiztos véletlenszám-generátor (RNG), hogy a kiszámíthatatlan eredményekre támaszkodó alkalmazásokhoz megbízható okosszerződéseket lehessen létrehozni. Egy másik példa az [API3 QRNG](https://docs.api3.org/explore/qrng/), amely a kvantum véletlenszám-generálást (QRNG) szolgálja ki, egy kvantumjelenségeken alapuló, Web3 RNG nyilvános módszert, amelyet az Ausztrál Nemzeti Egyetem (ANU) által elérhető.

### Az események eredményeinek elérése {#getting-outcomes-for-events}

Az orákulumok segítségével könnyű olyan okosszerződéseket létrehozni, amelyek valós eseményekre reagálnak. Az orákulumszolgáltatások ezt azáltal teszik lehetővé, hogy a szerződések külső API-okhoz kapcsolódhatnak a láncon kívüli komponenseken keresztül, és információkat vehetnek ezekből az adatforrásokból. Például a korábban említett előrejelző alkalmazás kérhet egy orákulumot, hogy küldje vissza a választási eredményeket egy megbízható, láncon kívüli forrásból (például az Associated Presstől).

Az orákulumok valós adatok lekérdezésére való használata újszerű felhasználási területeket tesz lehetővé; például egy decentralizált biztosítási terméknek pontos információkra van szüksége az időjárásról, katasztrófákról stb. a hatékony működéshez.

### Okosszerződések automatizálása {#automating-smart-contracts}

Az okosszerződések nem futnak automatikusan, hanem egy externally owned account (EOA), azaz külső tulajdonú számlának vagy egy másik szerződéses számlának kell elindítania a funkciókat a szerződéskód végrehajtásához. A legtöbb esetben a szerződésfunkciók nagy része nyilvános, és az EOA-k és más szerződések által meghívhatók.

De vannak olyan _privát funkciók_ is egy szerződésen belül, amelyek mások számára elérhetetlenek, de kritikusak a dapp általános funkcionalitása szempontjából. Ilyen lehet például egy `mintERC721Token()` függvény, amely rendszeresen új NFT-ket készít a felhasználók számára, egy függvény a kifizetések odaítélésére egy előrejelzési piacon, vagy egy függvény a feltett tokenek feloldására egy DEX-en.

A fejlesztőknek időközönként ilyen funkciókat kell indítaniuk, hogy az alkalmazás zökkenőmentesen működjön. Ez azonban azt eredményezheti, hogy a fejlesztők több órát veszítenek a hétköznapi feladatokkal, ezért fontos az okosszerződések végrehajtásának automatizálása.

Egyes decentralizált orákulumhálózatok automatizálási szolgáltatásokat kínálnak, amelyek lehetővé teszik a láncon kívüli orákulum-csomópontok számára, hogy a felhasználó által meghatározott paraméterek alapján okosszerződés-funkciókat indítsanak el. Ehhez általában „regisztrálni” kell a célszerződést az orákulumszolgáltatásnál, pénzeszközöket kell biztosítani az orákulumüzemeltető kifizetéséhez, és meg kell határozni a szerződést kiváltó feltételeket vagy időpontokat.

A Chainlink [Keeper Network](https://chain.link/keepers) lehetőséget biztosít az okosszerződések számára a rendszeres karbantartási feladatok minimális bizalomigényű és decentralizált módon történő kiszervezésére. Tekintse meg a hivatalos [Keeper-dokumentációt](https://docs.chain.link/docs/chainlink-keepers/introduction/) a szerződés Keeper-kompatibilissé tételével és az Upkeep-szolgáltatással kapcsolatos információkért.

## Hogyan használjuk a blokkláncorákulumokat {#use-blockchain-oracles}

Többféle orákulumalkalmazást is integrálhat az Ethereum dappba:

**[Chainlink](https://chain.link/)** – _A Chainlink decentralizált orákulumhálózatok hamisításbiztos bemeneteket, kimeneteket és számításokat biztosítanak a fejlett okosszerződések támogatásához bármely blokkláncon._

**[Chronicle](https://chroniclelabs.org/)** - _A Chronicle megoldja a láncon belüli adatátvitel jelenlegi korlátait azáltal, hogy valóban skálázható, költséghatékony, decentralizált és ellenőrizhető orákulumokat készít._

**[Witnet](https://witnet.io/)** – _A Witnet egy engedély nélküli, decentralizált és cenzúrának ellenálló orákulum, amely segíti az okosszerződéseket, hogy erős kriptogazdasági garanciákkal reagáljanak a valós világ eseményeire._

**[UMA Oracle](https://uma.xyz)** – _Az UMA optimista orákulum lehetővé teszi, hogy az okosszerződések gyorsan, mindenféle adatot megkapjanak különböző alkalmazásokhoz, beleértve a biztosítási, pénzügyi derivatívákat és előrejelzési piacokat._

**[Tellor](https://tellor.io/)** – _A Tellor egy átlátható és engedély nélküli orákulumprotokoll az okosszerződések számára, hogy könnyedén hozzájusson bármilyen adathoz, amikor csak szükség van rá._

**[Band Protocol](https://bandprotocol.com/)** – _A Band Protocol egy láncokon átívelő adatorákulum-platform, amely valós adatokat és API-okat aggregál és kapcsol össze okosszerződésekkel._

**[Paralink](https://paralink.network/)** – _A Paralink nyílt forráskódú és decentralizált orákulumplatformot biztosít az Ethereumon és más népszerű blokkláncokon futó okosszerződésekhez._

**[Pyth Network](https://pyth.network/)** – _A Pyth hálózat egy olyan pénzügyi orákulumhálózat, amely első kézből szerez információt, és folyamatosan valós adatokat tesz közzé a láncon belül egy hamisításnak ellenálló, decentralizált és önfenntartó környezetben._

**[API3 DAO](https://www.api3.org/)** – _Az API3 DAO olyan, első féltől származó orákulummegoldásokat kínál, amelyek nagyobb forrásátláthatóságot, biztonságot és skálázhatóságot biztosítanak egy decentralizált megoldásában az okosszerződések számára._

**[Supra](https://supra.com/)** - Egy vertikálisan integrált eszközrendszer a láncok közötti megoldások számára, amely összekapcsolja az összes blokkláncot, legyen az publikus (L1-ek és L2-k) vagy privát (vállalati), decentralizáltorákulum-árfolyamadatokat biztosítva, melyet láncon belüli és kívüli projektek is használhatnak.

## További olvasnivaló {#further-reading}

**Cikkek**

- [Mi az a blokkláncorákulum?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [Mi az a blokkláncorákulum?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Decentralizált orákulumok: részletes áttekintés](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Blokkláncorákulum bevezetése az Ethereumon](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Az okosszerződések miért nem tudnak API-hívásokat kezdeményezni?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [Miért van szükség decentralizált orákulumokra](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) – _Bankless_
- [Tehát Ön egy ár-orákulumot szeretne használni](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Videók**

- [Orákulumok és a blokklánc-használat kiterjesztése](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_
- [A különbség az orákulumok között az első kézből vagy harmadik féltől szerezett adatok tekintetében](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/) – _Blockchain Oracle Summit_

**Oktatóanyagok**

- [Hogyan lehet lekérni az Ethereum aktuális árát a Solidityben?](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) – _Chainlink_
- [Orákulumadat felhasználása](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Példaprojektek**

- [Teljes Chainlink kezdőprojekt az Ethereumra Solidity nyelven](https://github.com/hackbg/chainlink-fullstack) – _HackBG_
