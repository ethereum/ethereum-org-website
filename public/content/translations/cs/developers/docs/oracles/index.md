---
title: Data oracle
description: Orákula poskytují smart kontraktům na Ethereu přístup k reálným datům, čímž otevírají nové způsoby použití a přinášejí větší hodnotu pro uživatele.
lang: cs
---

Oracles jsou aplikace, které vytvářejí datové kanály, jež zpřístupňují blockchainu pro smart kontrakty offchainové datové zdroje. To je nezbytné, protože smart kontrakty založené na Ethereu nemohou ve výchozím nastavení přistupovat k informacím uloženým mimo blockchainovou síť.

Poskytnutí možnosti smart kontraktům provádět operace s využitím offchainových dat rozšiřuje užitečnost a hodnotu decentralizovaných aplikací. Například onchainové predikční trhy se spoléhají na oracles, které jim poskytují informace o výsledcích, jež používají k ověření předpovědí uživatelů. Představme si, že Alice vsadí 20 ETH na to, kdo se stane příštím prezidentem USA. V takovém případě bude predikční aplikace potřebovat orákulum, které potvrdí výsledky voleb a určilí, zda má Alice nárok na výplatu.

## Předpoklady {#prerequisites}

Tato stránka předpokládá, že je čtenář obeznámen se základy Etherea, včetně [uzlů](/developers/docs/nodes-and-clients/), [mechanismů konsenzu](/developers/docs/consensus-mechanisms/) a [EVM](/developers/docs/evm/). Měli byste také dobře rozumět [smart kontraktům](/developers/docs/smart-contracts/) a [anatomii smart kontraktů](/developers/docs/smart-contracts/anatomy/), zejména [událostem](/glossary/#events).

## Co je blockchainové orákulum? Co je to blockchain oracle? {#what-is-a-blockchain-oracle}

Oracles jsou aplikace, které získávají, ověřují a přenášejí externí informace (tj. informace uložené mimo blockchain) do smart kontraktů běžících na blockchainu. Kromě „tahání“ offchainových dat a jejich vysílání na Ethereu mohou oracles také „tlačit“ informace z blockchainu do externích systémů, např. odemknutí chytrého zámku, jakmile uživatel odešle poplatek prostřednictvím transakce na Ethereu.

Bez oraclu by byl smart kontrakt zcela omezen na onchainová data.

Orákula se liší podle zdroje dat (jeden nebo více zdrojů), modelů důvěry (centralizované nebo decentralizované) a systémové architektury (okamžité čtení, publikování-odběr a žádost-odpověď). Oracles můžeme také rozlišovat podle toho, zda získávají externí data pro použití onchainovými kontrakty (vstupní oracles), posílají informace z blockchainu do offchainových aplikací (výstupní oracles), nebo provádějí výpočetní úlohy offchain (výpočetní oracles).

## Proč smart kontrakty potřebují orákula? {#why-do-smart-contracts-need-oracles}

Mnoho vývojářů vidí smart kontrakty jako kód běžící na specifických adresách na blockchainu. Obecnější [pohled na smart kontrakty](/smart-contracts/) je však takový, že se jedná o samočinně se provádějící softwarové programy, které jsou schopny vynucovat dohody mezi stranami, jakmile jsou splněny určité podmínky – odtud pochází termín „smart kontrakty“.

Použití smart kontraktů k vynucování dohod mezi lidmi však není jednoduché, vzhledem k tomu, že Ethereum je deterministické. [Deterministický systém](https://en.wikipedia.org/wiki/Deterministic_algorithm) je takový systém, který při daném počátečním stavu a konkrétním vstupu vždy produkuje stejné výsledky, což znamená, že v procesu výpočtu výstupů ze vstupů není žiadna náhodnost ani variace.

Pro dosažení deterministického provádění omezují blockchainy uzly na dosažení konsenzu u jednoduchých binárních otázek (pravda/nepravda) s použitím _pouze_ dat uložených na samotném blockchainu. Příklady takových otázek zahrnují:

- „Podepsal vlastník účtu (identifikovaný veřejným klíčem) tuto transakci přidruženým privátním klíčem?“
- „Má tento účet dostatek prostředků na pokrytí transakce?“
- „Je tato transakce platná v kontextu tohoto smart kontraktu?“ atd.

Pokud by blockchainy dostávaly informace z externích zdrojů (tj. z reálného světa), nebylo by možné dosáhnout determinismu, což by bránilo uzlům dohodnout se na platnosti změn stavu blockchainu. Vezměme si například smart kontrakt, který provádí transakci na základě aktuálního směnného kurzu ETH/USD získaného z tradičního cenového API. Tato hodnota se pravděpodobně bude často měnit (nemluvě o tom, že API může být zrušeno nebo napadeno), což znamená, že síťové uzly provádějící stejný kód kontraktu by dospěly k různým výsledkům.

U veřejného blockchainu, jako je Ethereum, kde tisíce síťových uzlů po celém světě zpracovávají transakce, je determinismus klíčový. Bez centrální autority, která by sloužila jako zdroj pravdy, potřebují tyto uzly mechanismy, které jim umožní dosáhnout stejného stavu po aplikaci stejných transakcí. Pokud by uzel A vykonal kód smart kontraktu a dosáhl výsledku "3", zatímco uzel B by při provedení stejné transakce dosáhl výsledku "7", došlo by k narušení konsensu a Ethereum by ztratilo svou hodnotu jako decentralizovaná výpočetní platforma.

Tento scénář také zdůrazňuje problém s navrhováním blockchainů tak, aby získávaly informace z externích zdrojů. Oracles však tento problém řeší tak, že berou informace z offchainových zdrojů a ukládají je na blockchain, aby je mohly smart kontrakty využívat. Protože informace uložené onchain jsou neměnné a veřejně dostupné, mohou uzly Etherea bezpečně používat offchainová data importovaná oraclem k výpočtu změn stavu bez narušení konsenzu.

Za tímto účelem se oracle obvykle skládá ze smart kontraktu běžícího onchain a některých offchainových komponent. Onchainový kontrakt přijímá požadavky na data od jiných smart kontraktů, které předává offchainové komponentě (nazývané uzel oraclu). Tento orákulový uzel může dotazovat zdroje dat – například pomocí aplikačních programových rozhraní (API) – a zasílat transakce pro uložení požadovaných dat do úložiště smart kontraktu.

Orákulum v podstatě překlenuje informační propast mezi blockchainem a externím prostředím a vytváří „hybridní smart kontrakty“. Hybridní smart kontrakt je takový, který funguje na základě kombinace kódu onchainového kontraktu a offchainové infrastruktury. Decentralizované predikční trhy jsou vynikajícím příkladem hybridních smart kontraktů. Dalšími příklady mohou být smart kontrakty určené k pojištění plodin, které vyplácejí pojistné plnění, když určitá orákula určí, že došlo k určitému meteorologickému jevu.

## Jaké problémy se s orákuly pojí? Problém oracles {#the-oracle-problem}

Oracles řeší důležitý problém, ale také přinášejí některé komplikace, např.:

- Jak ověříme, že zadané informace byly získány ze správného zdroje nebo že nebyly pozměněny?

- Jak zajistíme, že tato data budou vždy dostupná a pravidelně aktualizovaná?

Takzvané „problémy orákulí“ poukazuje na problémy spojené s používáním blockchainových orákul k zasílání vstupů do smart kontraktů. Data z orákula musí být správná, aby mohl smart kontrakt správně fungovat. Navíc nutnost „důvěřovat“ operátorům orákul, že poskytují přesné informace, podkopává „bezpečnost bez nutnosti důvěry“, kterou smart kontrakty slibují.

Různá orákula nabízejí různé způsoby řešení problému orákulí, které prozkoumáme později. Orákula jsou obvykle hodnocena na základě toho, jak dobře zvládají následující výzvy:

1. **Správnost**: Oracle by neměl způsobovat, aby smart kontrakty spouštěly změny stavu na základě neplatných offchainových dat. Oracle musí zaručit _pravost_ a _integritu_ dat. Pravost znamená, že data byla získána ze správného zdroje, zatímco integrita znamená, že data zůstala nedotčena (tj. nebyla změněna) před odesláním onchain.

2. **Dostupnost**: Oracle by neměl zdržovat nebo bránit smart kontraktům v provádění akcí a spouštění změn stavu. To znamená, že data z oraclu musí být _dostupná na vyžádání_ bez přerušení.

3. **Kompatibilita pobídek**: Oracle by měl motivovat offchainové poskytovatele dat k předkládání správných informací smart kontraktům. Kompatibilita pobídek zahrnuje _přiřaditelnost_ a _odpovědnost_. Možnost přiřazení umožňuje spojit externí informaci s jejím poskytovatelem, zatímco odpovědnost váže poskytovatele dat k informacím, které poskytují, aby mohli být odměněni nebo potrestáni na základě kvality poskytnutých informací.

## Jak funguje služba blockchainového orákula? Jak funguje služba blockchain oracle? {#how-does-a-blockchain-oracle-service-work}

### Uživatelé {#users}

Uživatelé jsou entity (tj. smart kontrakty), které potřebují informace mimo blockchain k dokončení konkrétních akcí. Základní pracovní postup služby orákula začíná tím, že uživatel odešle požadavek na data do orákulového kontraktu. Požadavky na data obvykle odpovídají na některé nebo všechny následující otázky:

1. Z jakých zdrojů mohou offchainové uzly čerpat požadované informace?

2. Jak reportující entity zpracovávají informace ze zdrojů dat a extrahují užitečné datové body?

3. Kolik orákulových uzlů se může podílet na získávání dat?

4. Jak by měly být řešeny nesrovnalosti v orákulových reportech?

5. Jakou metodou by mělo být implementováno filtrování příspěvků a agregace zpráv do jedné hodnoty?

### Kontrakt oraclu {#oracle-contract}

Kontrakt oraclu je onchainová komponenta služby oraclu. Naslouchá požadavkům na data od jiných kontraktů, předává dotazy na data orákulovým uzlům a vysílá vrácená data do klientských kontraktů. Tento kontrakt může také provádět určité výpočty na vrácených datových bodech, aby vytvořil agregovanou hodnotu, kterou odešle požadujícímu kontraktu.

Orákulový kontrakt poskytuje některé funkce, které klientské kontrakty volají během podání požadavku na data. Po obdržení nového dotazu smart kontrakt vyšle [událost protokolu](/developers/docs/smart-contracts/anatomy/#events-and-logs) s podrobnostmi o požadavku na data. Tím se upozorní offchainové uzly, které jsou přihlášeny k odběru protokolu (obvykle pomocí příkazu JSON-RPC `eth_subscribe`), a ty následně přistoupí k získání dat definovaných v události protokolu.

Níže je uveden [příklad kontraktu oraclu](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) od Pedra Costy. Jedná se o jednoduchou službu oraclu, která se na žádost jiných smart kontraktů může dotazovat offchainových API a ukládat požadované informace na blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //seznam požadavků zadaných kontraktu
  uint currentId = 0; //inkrementální ID požadavku
  uint minQuorum = 2; //minimální počet odpovědí, které je třeba obdržet před vyhlášením konečného výsledku
  uint totalOracleCount = 3; // napevno zakódovaný počet oraclů

  // definuje obecný požadavek na API
  struct Request {
    uint id;                            //ID požadavku
    string urlToQuery;                  //URL adresa API
    string attributeToFetch;            //atribut JSON (klíč), který se má získat v odpovědi
    string agreedValue;                 //hodnota z klíče
    mapping(uint => string) answers;     //odpovědi poskytnuté oracly
    mapping(address => uint) quorum;    //oracles, které se budou dotazovat na odpověď (1=oracle nehlasoval, 2=oracle hlasoval)
  }

  //událost, která spouští oracle mimo blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //spustí se, když dojde ke konsenzu o konečném výsledku
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

    // napevno zakódovaná adresa oraclů
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // spustit událost, kterou zjistí oracle mimo blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // zvýšit ID požadavku
    currentId++;
  }

  //voláno oraclem pro záznam jeho odpovědi
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //zkontrolovat, zda je oracle v seznamu důvěryhodných oraclů
    //a zda oracle ještě nehlasoval
    if(currRequest.quorum[address(msg.sender)] == 1){

      //označení, že tato adresa hlasovala
      currRequest.quorum[msg.sender] = 2;

      //procházet „pole“ odpovědí, dokud není pozice volná, a uložit načtenou hodnotu
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //najít první prázdné místo
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //procházet seznamem oraclů a zkontrolovat, zda dostatek oraclů (minimální kvorum)
      //hlasovalo pro stejnou odpověď jako je ta současná
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

### Uzly oraclu {#oracle-nodes}

Uzel oraclu je offchainová komponenta služby oraclu. Získává informace z externích zdrojů, jako jsou API hostované на serverech třetích stran, a ukládá je onchain pro využití smart kontrakty. Uzly oraclu naslouchají událostem z onchainového kontraktu oraclu a přistupují k dokončení úkolu popsaného v protokolu.

Běžným úkolem uzlů oraclu je odeslání požadavku [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) službě API, parsování odpovědi za účelem extrakce relevantních dat, jejich formátování do výstupu čitelného pro blockchain a odeslání onchain zahrnutím do transakce do kontraktu oraclu. Orákulový uzel může být také povinen potvrdit platnost a integritu předkládaných informací pomocí „důkazů autenticity“, které prozkoumáme později.

Výpočetní oracles se také spoléhají na offchainové uzly při provádění výpočetních úloh, které by bylo nepraktické provádět onchain, vzhledem k nákladům na gas a limitům velikosti bloku. Například orákulový uzel může být pověřen generováním ověřitelně náhodného čísla (např. pro hry založené na blockchainu).

## Návrhové vzory oraclů {#oracle-design-patterns}

Oracles se vyskytují v různých typech, včetně _okamžitého čtení_, _publikování-odběru_ a _požadavku-odpovědi_, přičemž poslední dva jsou nejoblíbenější mezi smart kontrakty na Ethereu. V následujících odstavcích krátce popíšeme modely "publikování-odběr" a "žádost-odpověď".

### Oracles typu publikování-odběr {#publish-subscribe-oracles}

Tento typ orákula poskytuje "datový kanál", který mohou ostatní kontrakty pravidelně číst za účelem získání informací. Data v tomto případě často podléhají změnám, takže klientské kontrakty musí sledovat aktualizace dat v úložišti orákula. Příkladem je orákulum, které uživatelům poskytuje nejnovější informace o ceně ETH/USD.

### Oracles typu požadavek-odpověď {#request-response-oracles}

Nastavení "žádost-odpověď" umožňuje klientskému kontraktu požadovat libovolná data jiná než ta, která poskytuje orákulum typu "publikování-odběr". Orákula typu žádost-odpověď jsou ideální, když je dataset příliš velký na to, aby byl uchováván v úložišti smart kontraktu, a nebo když uživatelé potřebují v daném okamžiku pouze malou část dat.

Ačkoli jsou složitější než modely "publikování-odběr", orákula typu žádost-odpověď v zásadě fungují tak, jak jsme popsali v předchozí sekci. Oracle bude mít onchainovou komponentu, která přijímá požadavek na data a předává ho ke zpracování offchainovému uzlu.

Uživatelé, kteří iniciují datové dotazy, musí uhradit náklady na získání informací z offchainového zdroje. Klientský kontrakt musí také poskytnout prostředky na pokrytí palivových nákladů, které vzniknou orákulovému kontraktu při vrácení odpovědi prostřednictvím funkce callback, která je specifikována v požadavku.

## Centralizované vs. decentralizované oracles {#types-of-oracles}

### Centralizované oracles {#centralized-oracles}

Centralizovaný oracle je řízen jedinou entitou, která je zodpovědná za agregaci offchainových informací a aktualizaci dat kontraktu oraclu podle požadavků. Centralizovaná orákula jsou efektivní, protože se spoléhají na jediný zdroj pravdy. Mohou lépe fungovat v případech, kdy jsou proprietární datové sady publikovány přímo vlastníkem s široce akceptovaným podpisem. Nicméně, přinášejí i nevýhody:

#### Nízké záruky správnosti {#low-correctness-guarantees}

U centralizovaných orákul neexistuje způsob, jak ověřit, zda jsou poskytnuté informace správné či nikoliv. I "důvěryhodní" poskytovatelé se mohou stát nedůvěryhodnými nebo mohou být hacknuti. Pokud se orákulum nechá zkorumpovat, smart kontrakty budou vykonávat činnosti na základě špatných dat.

#### Špatná dostupnost {#poor-availability}

U centralizovaných oraclů není zaručeno, že budou offchainová data vždy dostupná ostatním smart kontraktům. Pokud se poskytovatel rozhodne službu vypnout nebo hacker unese offchainovou komponentu oraclu, je váš smart kontrakt vystaven riziku útoku typu DoS (denial of service).

#### Špatná kompatibilita pobídek {#poor-incentive-compatibility}

Centralizovaná orákula často nemají dobře navržené motivace (případně nemajjí vůbec žádné motivace) pro poskytovatele dat, nemohou tak zaručit, že jim budou zasílat přesné a nepozměněné informace. Platba za správnost orákula nezaručuje jeho poctivost. Tento problém se zhoršuje, jakmile se zvýší hodnota, kterou smart kontrakty spravují.

### Decentralizované oracles {#decentralized-oracles}

Decentralizovaná orákula jsou navržena tak, aby překonala omezení centralizovaných orákul odstraněním tzv. jediného bodu selhání. Decentralizovaná služba oraclu se skládá z více účastníků v peer-to-peer síti, kteří dosáhnou konsenzu ohledně offchainových dat před jejich odesláním do smart kontraktu.

Decentralizované orákulum by mělo být (ideálně) bez nutnosti povolení, důvěryhodné a bez nutnosti správy centrální stranou; ve skutečnosti je však decentralizace mezi orákuly spektrální. Existují polodecentralizované sítě orákulí, do kterých se může zapojit kdokoliv, ale s „vlastníkem“, který schvaluje a odstraňuje uzly na základě historické výkonnosti. Existují také plně decentralizované orákulové sítě: Ty obvykle fungují jako samostatné blockchainy a mají definované konsensuální mechanismy pro koordinaci uzlů a postihů za špatného chování.

Používání decentralizovaných orákul přináší následující výhody:

### Vysoké záruky správnosti {#high-correctness-guarantees}

Decentralizovaná orákula se snaží zajistit správnost dat pomocí různých přístupů. To zahrnuje použití důkazů potvrzujících pravost a integritu vrácených informací a požadavek, aby se více entit kolektivně shodlo na platnosti offchainových dat.

#### Důkazy pravosti {#authenticity-proofs}

Důkazy autenticity jsou kryptografické mechanismy, které umožňují nezávislé ověření informací získaných z externích zdrojů. Tyto důkazy mohou ověřit zdroj informací a odhalit možné změny provedené v datech poté, co byla obdržena.

Příklady důkazů autenticity zahrnují:

**Důkazy Transport Layer Security (TLS)**: Uzly oraclu často získávají data z externích zdrojů pomocí zabezpečeného připojení HTTP založeného na protokolu Transport Layer Security (TLS). Některá decentralizovaná orákula používají důkazy autenticity k ověření TLS akce (tj. potvrzení výměny informací mezi uzlem a konkrétním serverem) a potvrzení, že obsah akce nebyl změněn.

**Atestace důvěryhodného prostředí pro provádění (TEE)**: [Důvěryhodné prostředí pro provádění](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) je sandboxové výpočetní prostředí, které je izolováno od provozních procesů svého hostitelského systému. TEE zajišťuje, že jakýkoliv aplikační kód nebo data uložená či používaná ve výpočetním prostředí si zachovávají integritu, důvěrnost a neměnnost. Uživatelé mohou také generovat ověření, aby dokázali, že instance aplikace běží v důvěryhodném výpočetním prostředí.

Některé třídy decentralizovaných orákul vyžadují, aby provozovatelé orákulových uzlů poskytovali TEE ověření. To uživateli potvrzuje, že provozovatel uzlu spouští instanci orákulového klienta v důvěryhodném výpočetním prostředí. TEE zabraňují externím procesům měnit nebo číst kód a data aplikace, a proto tato ověření dokazují, že orákulový uzel zachoval informace neporušené a důvěrné.

#### Ověřování informací na základě konsenzu {#consensus-based-validation-of-information}

Centralizovaná orákula se spoléhají na jeden zdroj pravdy při poskytování dat smart kontraktům, což přináší možnost publikace nepřesných informací. Decentralizované oracles řeší tento problém tím, že se spoléhají na více uzlů oraclu, které se dotazují na offchainové informace. Porovnáváním dat z více zdrojů snižují decentralizované oracles riziko předání neplatných informací onchainovým kontraktům.

Decentralizované oracles se však musí vypořádat s nesrovnalostmi v informacích získaných z více offchainových zdrojů. Aby se minimalizovaly rozdíly v informacích a zajistilo se, že data předaná orákulovému kontraktu odrážejí kolektivní názor orákulových uzlů, používají decentralizovaná orákula následující mechanismy:

##### Hlasování nebo staking sloužící k potvrzení správnosti dat

Některé decentralizované orákulové sítě vyžadují, aby účastníci hlasovali nebo aby na důkaz správnosti odpovědí na dotazy (např. „Kdo vyhrál americké volby v roce 2020?“) zastakovali své prostředky pomocí nativního tokenu sítě. Agregační protokol poté sdruží hlasy a zastakovaný kolaterál a odpověď podporovanou většinou bere jako platnou.

Uzlům, jejichž odpovědi se odchylují od většinové odpovědi, jsou jejich tokeny odebrány a dále se rozdělí těm, kteří poskytli správnější hodnoty. Nutnost poskytnout kolaterál před odesláním dat je motivací k poctivým odpovědím, protože se předpokládá, že uzly jednají jako racionální ekonomičtí aktéři s úmyslem maximalizovat své výnosy.

Stakování/hlasování také chrání decentralizované oracles před [útoky Sybil](/glossary/#sybil-attack), kdy škodliví aktéři vytvářejí více identit, aby manipulovali se systémem konsenzu. Nicméně staking nemůže zabránit „parazitování“ (kdy orákulové uzly kopírují informace od ostatních) a „línému ověřování“ (kdy orákulové uzly následují většinu bez vlastního ověření informací).

##### Mechanismy Schellingova bodu

[Schelling point](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) je koncept z teorie her, který předpokládá, že více entit bude v nepřítomnosti jakékoli komunikace vždy inklinovat ke společnému řešení problému. Mechanismy Schellingova bodu se často používají v decentralizovaných orákulových sítích, aby v odpovědích na dotazy umožnily uzlům dosáhnout shody.

Ranou myšlenkou byl [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), navrhovaný datový kanál, kde účastníci zasílají odpovědi na „skalární“ otázky (otázky, jejichž odpovědi jsou popsány velikostí, např. „jaká je cena ETH?“) spolu s vkladem. Uživatelé, kteří poskytnou hodnoty mezi 25. a 75. [percentilem](https://en.wikipedia.org/wiki/Percentile), jsou odměněni, zatímco ti, jejichž hodnoty se výrazně odchylují od mediánu, jsou penalizováni.

Ačkoli SchellingCoin dnes neexistuje, řada decentralizovaných oraclů – zejména [oracly protokolu Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) – používá mechanismus Schelling point ke zlepšení přesnosti dat oraclu. Každý Maker Oracle se skládá z offchainové P2P sítě uzlů („relayers“ a „feeds“), které předkládají tržní ceny kolaterálových aktiv, a onchainového kontraktu „Medianizer“, který vypočítá medián všech poskytnutých hodnot. Jakmile uplyne stanovená doba zpoždění, tato mediánová hodnota se stává novou referenční cenou daného aktiva.

Dalšími příklady oraclů, které používají mechanismy Schelling point, jsou [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) a [Witnet](https://witnet.io/). V obou systémech jsou odpovědi z orákulových uzlů v peer-to-peer síti agregovány do jedné agregované hodnoty, jako je průměr nebo medián. Uzly jsou odměněny nebo penalizovány v závislosti na tom, do jaké míry se jejich odpovědi shodují a nebo jak moc se odchylují od agregované hodnoty.

Mechanismy Schelling point jsou atraktivní, protože minimalizují onchainovou stopu (je třeba odeslat pouze jednu transakci) a zároveň zaručují decentralizaci. To je možné díky tomu, že uzly musí podepsat seznam předložených odpovědí, než je tento seznam předán algoritmu, který vypočítá průměrnou či mediánovou hodnotu.

### Dostupnost {#availability}

Decentralizované služby oraclů zajišťují vysokou dostupnost offchainových dat pro smart kontrakty. Toho je dosaženo decentralizací jak zdroje offchainových informací, tak uzlů odpovědných za přenos informací onchain.

Tím je zajišťema odolnost proti chybám, protože orákulový kontrakt se při plnění dotazů z jiných kontraktů může spolehnout na více uzlů (které se také spoléhají na více zdrojů dat). Decentralizace na úrovni zdroje _a_ operátorů uzlů je klíčová – síť uzlů oraclu poskytujících informace získané ze stejného zdroje se dostane do stejného problému jako centralizovaný oracle.

Je také možné, aby oracly založené na stakování trestaly operátory uzlů, kteří na požadavky o data nereagují dostatečně rychle. To výrazně motivuje orákulové uzly investovat do infrastruktury odolné proti chybám a poskytovat data včas.

### Dobrá kompatibilita pobídek {#good-incentive-compatibility}

Decentralizované oracles implementují různé návrhy pobídek, aby zabránily [byzantskému](https://en.wikipedia.org/wiki/Byzantine_fault) chování mezi uzly oraclu. Konkrétně dosahují _přiřaditelnosti_ a _odpovědnosti_:

1. Decentralizované orákulové uzly mají často povinnost podepisovat data, která poskytují v odpovědi na dotazy na data. Tyto informace pomáhají s hodnocením historického výkonu orákulových uzlů, takže uživatelé mohou při zadávání dotazů na data vyloučit nespolehlivé orákulové uzly. Příkladem je [algoritmický reputační systém](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) od Witnet.

2. Decentralizovaná orákula - jak bylo vysvětleno dříve - mohou vyžadovat, aby uzly vložily kolaterál jako potvrzení důvěry v pravdivost dat, která předkládají. Pokud se ukáže, že jsou data správná, může být tento kolaterál vrácen společně s odměnami za poctivé služby. Pokud jsou však informace nesprávné, může být odebrán, což poskytuje určitý stupeň odpovědnosti.

## Aplikace oraclů ve smart kontraktech {#applications-of-oracles-in-smart-contracts}

Následující příklady jsou běžnými případy použití orákulí na Ethereu:

### Získávání finančních dat {#retrieving-financial-data}

Aplikace [decentralizovaného financování](/defi/) (DeFi) umožňují peer-to-peer půjčování, vypůjčování a obchodování s aktivy. To často vyžaduje různé finanční informace, včetně údajů o směnných kurzech (pro výpočet hodnoty kryptoměn ve fiat měnách nebo pro srovnávání cen tokenů) a údajů z kapitálových trhů (pro výpočet hodnoty tokenizovaných aktiv, jako je zlato nebo americký dolar).

DeFi Protokol pro poskytování půjček se potřebuje dotazovat na aktuální tržní ceny aktiv (např. ETH) uložených jako kolaterál. To umožňuje kontraktu určit hodnotu kolateralizovaných aktiv a stanovit, kolik si může vypůjčit z tohoto systému.

Populární „cenové oracles“ (jak se jim často říká) v DeFi zahrnují Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) od Compound Protocol, [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) od Uniswapu a [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Vývojáři by měli rozumět omezením, které s sebou tato cenová orákula nesou, než je integrují do svého projektu. Tento [článek](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) poskytuje podrobnou analýzu toho, co je třeba zvážit při plánování použití kteréhokoli ze zmíněných cenových oraclů.

Níže uvádíme kód, pomocí kterého můžete ve svém smart kontraktu získat aktuální cenu ETH pomocí cenového kanálu od Chainlinku:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Síť: Kovan
     * Agregátor: ETH/USD
     * Adresa: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Vrátí nejnovější cenu
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

### Generování ověřitelné náhodnosti {#generating-verifiable-randomness}

Některé blockchainové aplikace, jako jsou blockchainové hry nebo loterie, vyžadují vysokou úroveň nepředvídatelnosti a náhodnosti, aby mohly efektivně fungovat. Deterministické provádění transakcí na blockchainu však eliminuje náhodnost.

Původní přístup spočíval v použití pseudonáhodných kryptografických funkcí, jako je `blockhash`, ale ty mohly být [manipulovány těžaři](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) při řešení algoritmu proof-of-work. Přechod Etherea na [proof-of-stake](/roadmap/merge/) také znamená, že vývojáři se již nemohou spoléhat na `blockhash` pro onchainovou náhodnost. Mechanismus [RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) řetězce Beacon Chain místo toho poskytuje alternativní zdroj náhodnosti.

Je možné generovat náhodnou hodnotu offchain a poslat ji onchain, ale to klade vysoké nároky na důvěru uživatelů. Musí věřit, že hodnota byla skutečně vygenerována nepředvídatelným způsobem a nebyla během přenosu změněna.

Oracly určené pro offchainové výpočty řeší tento problém bezpečným generováním náhodných výsledků offchain, které vysílají onchain spolu s kryptografickými důkazy potvrzujícími nepředvídatelnost procesu. Příkladem je [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), což je prokazatelně spravedlivý a proti neoprávněné manipulaci odolný generátor náhodných čísel (RNG), který je užitečný pro vytváření spolehlivých smart kontraktů pro aplikace, které se spoléhají na nepředvídatelné výsledky.

### Získávání výsledků událostí {#getting-outcomes-for-events}

S orákuly je snadné vytvářet smart kontrakty, které reagují na reálné události. Služby oraclů to umožňují tím, že kontraktům dovolují připojit se k externím API prostřednictvím offchainových komponent a využívat informace z těchto datových zdrojů. Například dříve zmíněná predikční dApp může požádat oracle, aby vrátil výsledky voleb z důvěryhodného offchainového zdroje (např. Associated Press).

Použití orákul k získávání dat na základě reálných výsledků umožňuje další nové případy použití; například decentralizovaný pojišťovací produkt potřebuje přesné informace o počasí, katastrofách atd., aby mohl efektivně fungovat.

### Automatizace smart kontraktů {#automating-smart-contracts}

Smart kontrakty se nespouštějí automaticky; externě vlastněný účet (EOA) nebo jiný kontraktový účet musí za účelem spuštění smart kontraktu zavolat ty správné funkce. Ve většině případů jsou hlavní funkce kontraktu veřejné a mohou být vyvolány EOA nebo jinými kontrakty.

Existují však také _soukromé funkce_ v rámci kontraktu, které jsou pro ostatní nepřístupné, ale které jsou klíčové pro celkovou funkčnost dApp. Příklady zahrnují funkci `mintERC721Token()`, která periodicky razí nové NFT pro uživatele, funkci pro udělování výplat na predikčním trhu nebo funkci pro odemknutí stakovaných tokenů v DEX.

Pro zajištění hladké funkčnosti aplikace musí vývojáři tyto funkce spouštět v intervalech. To však může vést ke ztrátě času vývojářů na rutinních úkolech, což je důvod, proč je automatizace spouštění smart kontraktů atraktivní.

Některé decentralizované sítě oraclů nabízejí automatizační služby, které umožňují offchainovým uzlům oraclu spouštět funkce smart kontraktu podle parametrů definovaných uživatelem. Typicky to vyžaduje „registraci“ cílového kontraktu u orákulové služby, poskytnutí prostředků na zaplacení provozovatele orákula a specifikaci podmínek nebo časů pro spuštění kontraktu.

[Keeper Network](https://chain.link/keepers) od Chainlinku poskytuje smart kontraktům možnosti, jak zadat externě pravidelné úkoly údržby s minimalizovanou důvěrou a decentralizovaným způsobem. Přečtěte si oficiální [dokumentaci Keeper's](https://docs.chain.link/docs/chainlink-keepers/introduction/) pro informace o tom, jak učinit váš kontrakt kompatibilní s Keeper a jak používat službu Upkeep.

## Jak používat blockchain oracles {#use-blockchain-oracles}

Existuje několik orákulových aplikací, které můžete integrovat do své dappky na Ethereu:

**[Chainlink](https://chain.link/)** – _decentralizované sítě oraclů Chainlink poskytují vstupy, výstupy a výpočty odolné proti neoprávněné manipulaci pro podporu pokročilých smart kontraktů na jakémkoli blockchainu._

**[RedStone Oracles](https://redstone.finance/)** – _RedStone je decentralizovaný modulární oracle, který poskytuje datové kanály optimalizované z hlediska gasu. Specializuje se na poskytování cenových kanálů pro nově vznikající aktiva, jako jsou liquid staking tokeny (LST), liquid restaking tokeny (LRT) a deriváty stakování Bitcoinu._

**[Chronicle](https://chroniclelabs.org/)** – _Chronicle překonává současná omezení přenosu dat onchain vývojem skutečně škálovatelných, nákladově efektivních, decentralizovaných a ověřitelných oraclů._

**[Witnet](https://witnet.io/)** – _Witnet je decentralizovaný oracle bez oprávnění a odolný proti cenzuře, který pomáhá smart kontraktům reagovat na události reálného světa se silnými krypto-ekonomickými zárukami._

**[UMA Oracle](https://uma.xyz)** – _Optimistický oracle od UMA umožňuje smart kontraktům rychle přijímat jakýkoli druh dat pro různé aplikace, včetně pojištění, finančních derivátů a predikčních trhů._

**[Tellor](https://tellor.io/)** – _Tellor je transparentní protokol oraclu bez oprávnění, díky kterému váš smart kontrakt snadno získá jakákoli data, kdykoli je potřebuje._

**[Band Protocol](https://bandprotocol.com/)** – _Band Protocol je cross-chainová platforma datových oraclů, která agreguje a propojuje data z reálného světa a API se smart kontrakty._

**[Pyth Network](https://pyth.network/)** – _Síť Pyth je finanční síť oraclů první strany navržená tak, aby publikovala nepřetržitá data z reálného světa onchain v prostředí odolném proti neoprávněné manipulaci, decentralizovaném a soběstačném._

**[API3 DAO](https://www.api3.org/)** – _API3 DAO dodává řešení oraclů první strany, která poskytují větší transparentnost zdroje, bezpečnost a škálovatelnost v decentralizovaném řešení pro smart kontrakty_

**[Supra](https://supra.com/)** – vertikálně integrovaná sada cross-chainových řešení, která propojují všechny blockchainy, veřejné (L1 a L2) i soukromé (podnikové), a poskytují decentralizované cenové kanály oraclů, které lze použít pro onchainové i offchainové případy použití.

**[Gas Network](https://gas.network/)** – distribuovaná platforma oraclů poskytující data o ceně gasu v reálném čase napříč blockchainy. Tím, že přináší onchain data od předních poskytovatelů dat o cenách gasu, pomáhá Gas Network podporovat interoperabilitu. Gas Network podporuje data pro více než 35 řetězců, včetně mainnetu Ethereum a mnoha předních L2.

## Další literatura {#further-reading}

**Články**

- [Co je to blockchain oracle?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [Co je to blockchain oracle?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Decentralizované oracles: komplexní přehled](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementace blockchain oraclu na Ethereu](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Proč nemohou smart kontrakty volat API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [Takže chcete použít cenový oracle](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Videa**

- [Oracles a rozšíření užitečnosti blockchainu](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_

**Návody**

- [Jak získat aktuální cenu Etherea v Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) – _Chainlink_
- [Využívání dat z oraclu](https://docs.chroniclelabs.org/Developers/tutorials/Remix) – _Chronicle_

**Ukázkové projekty**

- [Kompletní startovací projekt Chainlink pro Ethereum v Solidity](https://github.com/hackbg/chainlink-fullstack) – _HackBG_
