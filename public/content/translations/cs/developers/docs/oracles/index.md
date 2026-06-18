---
title: Orákula
description: Orákula poskytují chytrým kontraktům na Ethereu přístup k datům z reálného světa, čímž odemykají více případů užití a větší hodnotu pro uživatele.
lang: cs
authors: ["Patrick Collins"]
---

Orákula jsou aplikace, které vytvářejí datové toky zpřístupňující offchain zdroje dat blockchainu pro chytré kontrakty. To je nezbytné, protože chytré kontrakty na Ethereu nemají ve výchozím nastavení přístup k informacím uloženým mimo blockchainovou síť.

Poskytnutí schopnosti chytrým kontraktům spouštět se pomocí offchain dat rozšiřuje užitečnost a hodnotu decentralizovaných aplikací (dapp). Například onchain predikční trhy spoléhají na orákula, že jim poskytnou informace o výsledcích, které používají k ověření uživatelských predikcí. Předpokládejme, že si Alice vsadí 20 ETH na to, kdo se stane příštím prezidentem USA. V takovém případě potřebuje dapp predikčního trhu orákulum k potvrzení výsledků voleb a určení, zda má Alice nárok na výplatu.

## Předpoklady {#prerequisites}

Tato stránka předpokládá, že je čtenář obeznámen se základy [Etherea](/), včetně [uzlů](/developers/docs/nodes-and-clients/), [mechanismů konsensu](/developers/docs/consensus-mechanisms/) a [EVM](/developers/docs/evm/). Měli byste také dobře rozumět [chytrým kontraktům](/developers/docs/smart-contracts/) a [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/), zejména [událostem](/glossary/#events).

## Co je to blockchainové orákulum? {#what-is-a-blockchain-oracle}

Orákula jsou aplikace, které získávají, ověřují a přenášejí externí informace (tj. informace uložené offchain) do chytrých kontraktů běžících na blockchainu. Kromě „stahování“ offchain dat a jejich vysílání na Ethereu mohou orákula také „tlačit“ informace z blockchainu do externích systémů, např. odemknout chytrý zámek, jakmile uživatel odešle poplatek prostřednictvím transakce na Ethereu.

Bez orákula by byl chytrý kontrakt omezen výhradně na onchain data.

Orákula se liší na základě zdroje dat (jeden nebo více zdrojů), modelů důvěry (centralizované nebo decentralizované) a architektury systému (okamžité čtení, publikování-odběr a požadavek-odpověď). Orákula můžeme také rozlišovat podle toho, zda získávají externí data pro použití onchain kontrakty (vstupní orákula), odesílají informace z blockchainu do offchain aplikací (výstupní orákula), nebo provádějí výpočetní úlohy offchain (výpočetní orákula).

## Proč chytré kontrakty potřebují orákula? {#why-do-smart-contracts-need-oracles}

Mnoho vývojářů vnímá chytré kontrakty jako kód běžící na konkrétních adresách na blockchainu. Nicméně [obecnější pohled na chytré kontrakty](/smart-contracts/) je takový, že se jedná o samovykonatelné softwarové programy schopné vynucovat dohody mezi stranami, jakmile jsou splněny specifické podmínky – odtud termín „chytré kontrakty“.

Použití chytrých kontraktů k vynucování dohod mezi lidmi však není přímočaré, vzhledem k tomu, že Ethereum je deterministické. [Deterministický systém](https://en.wikipedia.org/wiki/Deterministic_algorithm) je takový, který vždy produkuje stejné výsledky při daném počátečním stavu a konkrétním vstupu, což znamená, že v procesu výpočtu výstupů ze vstupů neexistuje žádná náhodnost ani variace.

K dosažení deterministického provádění omezují blockchainy uzly na dosažení konsensu o jednoduchých binárních (pravda/nepravda) otázkách pomocí _pouze_ dat uložených na samotném blockchainu. Příklady takových otázek zahrnují:

- „Podepsal majitel účtu (identifikovaný veřejným klíčem) tuto transakci spárovaným soukromým klíčem?“
- „Má tento účet dostatek prostředků na pokrytí transakce?“
- „Je tato transakce platná v kontextu tohoto chytrého kontraktu?“ atd.

Pokud by blockchainy přijímaly informace z externích zdrojů (tj. z reálného světa), determinismu by nebylo možné dosáhnout, což by uzlům bránilo dohodnout se na platnosti změn stavu blockchainu. Vezměme si například chytrý kontrakt, který provede transakci na základě aktuálního směnného kurzu ETH-USD získaného z tradičního cenového API. Tento údaj se pravděpodobně bude často měnit (nemluvě o tom, že API by mohlo být ukončeno nebo hacknuto), což znamená, že uzly provádějící stejný kód kontraktu by dospěly k různým výsledkům.

Pro veřejný blockchain, jako je Ethereum, s tisíci uzly po celém světě zpracovávajícími transakce, je determinismus kritický. Bez centrální autority sloužící jako zdroj pravdy potřebují uzly mechanismy pro dosažení stejného stavu po aplikaci stejných transakcí. Případ, kdy uzel A provede kód chytrého kontraktu a získá jako výsledek „3“, zatímco uzel B získá „7“ po spuštění stejné transakce, by způsobil zhroucení konsensu a eliminoval by hodnotu Etherea jako decentralizované výpočetní platformy.

Tento scénář také zdůrazňuje problém s navrhováním blockchainů tak, aby stahovaly informace z externích zdrojů. Orákula však tento problém řeší tím, že přebírají informace z offchain zdrojů a ukládají je na blockchain, aby je chytré kontrakty mohly spotřebovat. Vzhledem k tomu, že informace uložené onchain jsou neměnné a veřejně dostupné, mohou uzly Etherea bezpečně používat offchain data importovaná orákulem k výpočtu změn stavu bez narušení konsensu.

K tomu se orákulum obvykle skládá z chytrého kontraktu běžícího onchain a některých offchain komponent. Onchain kontrakt přijímá požadavky na data od jiných chytrých kontraktů, které předává offchain komponentě (nazývané uzel orákula). Tento uzel orákula může dotazovat zdroje dat – například pomocí rozhraní pro programování aplikací (API) – a odesílat transakce k uložení požadovaných dat do úložiště chytrého kontraktu.

V podstatě blockchainové orákulum překlenuje informační propast mezi blockchainem a externím prostředím a vytváří „hybridní chytré kontrakty“. Hybridní chytrý kontrakt je takový, který funguje na základě kombinace onchain kódu kontraktu a offchain infrastruktury. Decentralizované predikční trhy jsou vynikajícím příkladem hybridních chytrých kontraktů. Dalšími příklady mohou být chytré kontrakty na pojištění úrody, které vyplácejí peníze, když sada orákul určí, že došlo k určitým povětrnostním jevům.

## Co je to problém orákula? {#the-oracle-problem}

Orákula řeší důležitý problém, ale také přinášejí některé komplikace, např.:

- Jak ověříme, že vložené informace byly získány ze správného zdroje nebo s nimi nebylo manipulováno?

- Jak zajistíme, že tato data budou vždy dostupná a pravidelně aktualizovaná?

Takzvaný „problém orákula“ demonstruje problémy, které přináší používání blockchainových orákul k odesílání vstupů do chytrých kontraktů. Data z orákula musí být správná, aby se chytrý kontrakt provedl správně. Navíc nutnost „důvěřovat“ provozovatelům orákul, že poskytnou přesné informace, podkopává aspekt chytrých kontraktů nevyžadující důvěru.

Různá orákula nabízejí různá řešení problému orákula, která prozkoumáme později. Orákula se obvykle hodnotí podle toho, jak dobře dokážou zvládnout následující výzvy:

1. **Správnost**: Orákulum by nemělo způsobit, že chytré kontrakty spustí změny stavu na základě neplatných offchain dat. Orákulum musí zaručit _autenticitu_ a _integritu_ dat. Autenticita znamená, že data byla získána ze správného zdroje, zatímco integrita znamená, že data zůstala nedotčená (tj. nebyla změněna) před odesláním onchain.

2. **Dostupnost**: Orákulum by nemělo zdržovat nebo bránit chytrým kontraktům v provádění akcí a spouštění změn stavu. To znamená, že data z orákula musí být _dostupná na vyžádání_ bez přerušení.

3. **Kompatibilita pobídek**: Orákulum by mělo motivovat poskytovatele offchain dat k odesílání správných informací do chytrých kontraktů. Kompatibilita pobídek zahrnuje _přiřaditelnost_ a _odpovědnost_. Přiřaditelnost umožňuje propojit část externích informací s jejich poskytovatelem, zatímco odpovědnost váže poskytovatele dat k informacím, které poskytují, takže mohou být odměněni nebo penalizováni na základě kvality poskytnutých informací.

## Jak funguje služba blockchainového orákula? {#how-does-a-blockchain-oracle-service-work}

### Uživatelé {#users}

Uživatelé jsou subjekty (tj. chytré kontrakty), které k dokončení konkrétních akcí potřebují informace externí vůči blockchainu. Základní pracovní postup služby orákula začíná tím, že uživatel odešle požadavek na data do kontraktu orákula. Požadavky na data obvykle odpoví na některé nebo všechny následující otázky:

1. Jaké zdroje mohou offchain uzly konzultovat ohledně požadovaných informací?

2. Jak reportéři zpracovávají informace ze zdrojů dat a extrahují užitečné datové body?

3. Kolik uzlů orákula se může podílet na získávání dat?

4. Jak by se měly řešit nesrovnalosti ve zprávách orákula?

5. Jaká metoda by měla být implementována při filtrování příspěvků a agregaci zpráv do jediné hodnoty?

### Kontrakt orákula {#oracle-contract}

Kontrakt orákula je onchain komponenta pro službu orákula. Naslouchá požadavkům na data od jiných kontraktů, předává datové dotazy uzlům orákula a vysílá vrácená data klientským kontraktům. Tento kontrakt může také provádět určité výpočty na vrácených datových bodech, aby vytvořil agregovanou hodnotu k odeslání žádajícímu kontraktu.

Kontrakt orákula vystavuje některé funkce, které klientské kontrakty volají při zadávání požadavku na data. Po obdržení nového dotazu chytrý kontrakt vygeneruje [událost logu](/developers/docs/smart-contracts/anatomy/#events-and-logs) s podrobnostmi o požadavku na data. To upozorní offchain uzly přihlášené k odběru logu (obvykle pomocí něčeho jako je příkaz JSON-RPC `eth_subscribe`), které přistoupí k získání dat definovaných v události logu.

Níže je [příklad kontraktu orákula](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) od Pedra Costy. Jedná se o jednoduchou službu orákula, která může na žádost jiných chytrých kontraktů dotazovat offchain API a ukládat požadované informace na blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //seznam požadavků na kontrakt
  uint currentId = 0; //rostoucí id požadavku
  uint minQuorum = 2; //minimální počet odpovědí k přijetí před vyhlášením konečného výsledku
  uint totalOracleCount = 3; // Pevně zakódovaný počet orákul

  // definuje obecný API požadavek
  struct Request {
    uint id;                            //id požadavku
    string urlToQuery;                  //API url
    string attributeToFetch;            //json atribut (klíč) k získání v odpovědi
    string agreedValue;                 //hodnota z klíče
    mapping(uint => string) answers;     //odpovědi poskytnuté orákuly
    mapping(address => uint) quorum;    //orákula, která budou dotazovat odpověď (1=orákulum nehlasovalo, 2=orákulum hlasovalo)
  }

  //událost, která spouští orákulum mimo blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //spuštěno, když je dosaženo konsensu o konečném výsledku
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

    // Pevně zakódovaná adresa orákul
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // spustit událost, která má být detekována orákulem mimo blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // zvýšit id požadavku
    currentId++;
  }

  //voláno orákulem pro zaznamenání jeho odpovědi
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //zkontrolovat, zda je orákulum v seznamu důvěryhodných orákul
    //a zda orákulum ještě nehlasovalo
    if(currRequest.quorum[address(msg.sender)] == 1){

      //označení, že tato adresa hlasovala
      currRequest.quorum[msg.sender] = 2;

      //iterovat přes "pole" odpovědí, dokud není pozice volná, a uložit získanou hodnotu
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //najít první prázdný slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterovat přes seznam orákul a zkontrolovat, zda dostatek orákul (minimální kvorum)
      //hlasovalo pro stejnou odpověď jako je ta aktuální
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

### Uzly orákula {#oracle-nodes}

Uzel orákula je offchain komponenta služby orákula. Extrahuje informace z externích zdrojů, jako jsou API hostovaná na serverech třetích stran, a vkládá je onchain pro spotřebu chytrými kontrakty. Uzly orákula naslouchají událostem z onchain kontraktu orákula a přistupují k dokončení úkolu popsaného v logu.

Běžným úkolem pro uzly orákula je odeslání požadavku [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) do služby API, parsování odpovědi za účelem extrakce relevantních dat, formátování do výstupu čitelného pro blockchain a jeho odeslání onchain zahrnutím do transakce do kontraktu orákula. Uzel orákula může být také požádán, aby potvrdil platnost a integritu předložených informací pomocí „důkazů autenticity“, které prozkoumáme později.

Výpočetní orákula také spoléhají na offchain uzly při provádění výpočetních úloh, které by bylo nepraktické provádět onchain vzhledem k nákladům na gas a limitům velikosti bloku. Například uzel orákula může mít za úkol vygenerovat prokazatelně náhodné číslo (např. pro hry založené na blockchainu).

## Návrhové vzory orákul {#oracle-design-patterns}

Orákula se dodávají v různých typech, včetně _okamžitého čtení_, _publikování-odběr_ a _požadavek-odpověď_, přičemž poslední dva jsou mezi chytrými kontrakty na Ethereu nejoblíbenější. Zde stručně popíšeme modely publikování-odběr a požadavek-odpověď.

### Orákula typu publikování-odběr {#publish-subscribe-oracles}

Tento typ orákula vystavuje „datový tok“, ze kterého mohou ostatní kontrakty pravidelně číst informace. Očekává se, že data se v tomto případě budou často měnit, takže klientské kontrakty musí naslouchat aktualizacím dat v úložišti orákula. Příkladem je orákulum, které uživatelům poskytuje nejnovější informace o ceně ETH-USD.

### Orákula typu požadavek-odpověď {#request-response-oracles}

Nastavení požadavek-odpověď umožňuje klientskému kontraktu požadovat libovolná data jiná než ta, která poskytuje orákulum typu publikování-odběr. Orákula typu požadavek-odpověď jsou ideální, když je datová sada příliš velká na to, aby byla uložena v úložišti chytrého kontraktu, a/nebo uživatelé budou v daném okamžiku potřebovat pouze malou část dat.

Ačkoli jsou orákula typu požadavek-odpověď složitější než modely publikování-odběr, jsou v podstatě tím, co jsme popsali v předchozí části. Orákulum bude mít onchain komponentu, která přijme požadavek na data a předá jej offchain uzlu ke zpracování.

Uživatelé iniciující datové dotazy musí pokrýt náklady na získání informací z offchain zdroje. Klientský kontrakt musí také poskytnout prostředky na pokrytí nákladů na gas, které vzniknou kontraktu orákula při vrácení odpovědi prostřednictvím funkce zpětného volání (callback) specifikované v požadavku.

## Centralizovaná vs. decentralizovaná orákula {#types-of-oracles}

### Centralizovaná orákula {#centralized-oracles}

Centralizované orákulum je řízeno jediným subjektem odpovědným za agregaci offchain informací a aktualizaci dat kontraktu orákula podle požadavků. Centralizovaná orákula jsou efektivní, protože spoléhají na jediný zdroj pravdy. Mohou fungovat lépe v případech, kdy jsou proprietární datové sady publikovány přímo vlastníkem s široce přijímaným podpisem. Přinášejí však i nevýhody:

#### Nízké záruky správnosti {#low-correctness-guarantees}

U centralizovaných orákul neexistuje způsob, jak potvrdit, zda jsou poskytnuté informace správné či nikoli. Dokonce i „renomovaní“ poskytovatelé se mohou zkazit nebo být hacknuti. Pokud se orákulum stane poškozeným, chytré kontrakty se provedou na základě špatných dat.

#### Špatná dostupnost {#poor-availability}

U centralizovaných orákul není zaručeno, že vždy zpřístupní offchain data jiným chytrým kontraktům. Pokud se poskytovatel rozhodne službu vypnout nebo hacker unese offchain komponentu orákula, je váš chytrý kontrakt vystaven riziku útoku odepření služby (DoS).

#### Špatná kompatibilita pobídek {#poor-incentive-compatibility}

Centralizovaná orákula mají často špatně navržené nebo neexistující pobídky pro poskytovatele dat k odesílání přesných/nezměněných informací. Placení orákulu za správnost nezaručuje poctivost. Tento problém se zvětšuje s tím, jak roste množství hodnoty kontrolované chytrými kontrakty.

### Decentralizovaná orákula {#decentralized-oracles}

Decentralizovaná orákula jsou navržena tak, aby překonala omezení centralizovaných orákul odstraněním jediných bodů selhání. Decentralizovaná služba orákula se skládá z více účastníků v peer-to-peer síti, kteří tvoří konsensus o offchain datech před jejich odesláním do chytrého kontraktu.

Decentralizované orákulum by (ideálně) mělo být nevyžadující povolení, nevyžadující důvěru a bez správy centrální stranou; ve skutečnosti je decentralizace mezi orákuly na spektru. Existují polodecentralizované sítě orákul, kterých se může zúčastnit kdokoli, ale s „vlastníkem“, který schvaluje a odstraňuje uzly na základě historického výkonu. Existují také plně decentralizované sítě orákul: ty obvykle běží jako samostatné blockchainy a mají definované mechanismy konsensu pro koordinaci uzlů a trestání špatného chování.

Používání decentralizovaných orákul přináší následující výhody:

### Vysoké záruky správnosti {#high-correctness-guarantees}

Decentralizovaná orákula se snaží dosáhnout správnosti dat pomocí různých přístupů. To zahrnuje použití důkazů potvrzujících autenticitu a integritu vrácených informací a vyžadování, aby se více subjektů kolektivně dohodlo na platnosti offchain dat.

#### Důkazy autenticity {#authenticity-proofs}

Důkazy autenticity jsou kryptografické mechanismy, které umožňují nezávislé ověření informací získaných z externích zdrojů. Tyto důkazy mohou ověřit zdroj informací a detekovat možné změny dat po jejich získání.

Příklady důkazů autenticity zahrnují:

**Důkazy Transport Layer Security (TLS)**: Uzly orákula často získávají data z externích zdrojů pomocí zabezpečeného připojení HTTP založeného na protokolu Transport Layer Security (TLS). Některá decentralizovaná orákula používají důkazy autenticity k ověření relací TLS (tj. potvrzení výměny informací mezi uzlem a konkrétním serverem) a potvrzení, že obsah relace nebyl změněn.

**Atestace Trusted Execution Environment (TEE)**: [Důvěryhodné spouštěcí prostředí](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) je izolované výpočetní prostředí (sandbox), které je odděleno od provozních procesů svého hostitelského systému. TEE zajišťují, že jakýkoli kód aplikace nebo data uložená/používaná ve výpočetním prostředí si zachovají integritu, důvěrnost a neměnnost. Uživatelé mohou také vygenerovat atestaci, aby prokázali, že instance aplikace běží v důvěryhodném spouštěcím prostředí.

Určité třídy decentralizovaných orákul vyžadují, aby provozovatelé uzlů orákula poskytovali atestace TEE. To uživateli potvrzuje, že provozovatel uzlu spouští instanci klienta orákula v důvěryhodném spouštěcím prostředí. TEE brání externím procesům ve změně nebo čtení kódu a dat aplikace, a proto tyto atestace dokazují, že uzel orákula uchoval informace nedotčené a důvěrné.

#### Validace informací na základě konsensu {#consensus-based-validation-of-information}

Centralizovaná orákula spoléhají při poskytování dat chytrým kontraktům na jediný zdroj pravdy, což přináší možnost publikování nepřesných informací. Decentralizovaná orákula tento problém řeší tím, že spoléhají na více uzlů orákula při dotazování na offchain informace. Porovnáním dat z více zdrojů snižují decentralizovaná orákula riziko předání neplatných informací onchain kontraktům.

Decentralizovaná orákula se však musí vypořádat s nesrovnalostmi v informacích získaných z více offchain zdrojů. K minimalizaci rozdílů v informacích a zajištění toho, aby data předaná kontraktu orákula odrážela kolektivní názor uzlů orákula, používají decentralizovaná orákula následující mechanismy:

##### Hlasování/staking o přesnosti dat {#availability}

Některé decentralizované sítě orákul vyžadují, aby účastníci hlasovali nebo prováděli staking ohledně přesnosti odpovědí na datové dotazy (např. „Kdo vyhrál volby v USA v roce 2020?“) pomocí nativního tokenu sítě. Agregační protokol pak agreguje hlasy a staky a bere odpověď podporovanou většinou jako platnou.

Uzly, jejichž odpovědi se odchylují od většinové odpovědi, jsou penalizovány tím, že jejich tokeny jsou distribuovány ostatním, kteří poskytují správnější hodnoty. Nucení uzlů k poskytnutí kauce před poskytnutím dat motivuje k poctivým odpovědím, protože se předpokládá, že jde o racionální ekonomické aktéry, kteří mají v úmyslu maximalizovat výnosy.

Staking/hlasování také chrání decentralizovaná orákula před [Sybil útoky](/glossary/#sybil-attack), kdy zlomyslní aktéři vytvářejí více identit, aby oklamali systém konsensu. Staking však nemůže zabránit „přiživování“ (uzly orákula kopírující informace od ostatních) a „líné validaci“ (uzly orákula následující většinu bez toho, aby samy ověřily informace).

##### Mechanismy Schellingova bodu {#good-incentive-compatibility}

[Schellingův bod](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) je koncept teorie her, který předpokládá, že více subjektů se při absenci jakékoli komunikace vždy uchýlí ke společnému řešení problému. Mechanismy Schellingova bodu jsou často používány v decentralizovaných sítích orákul, aby umožnily uzlům dosáhnout konsensu o odpovědích na požadavky na data.

Ranou myšlenkou pro to byl [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), navrhovaný datový tok, kde účastníci předkládají odpovědi na „skalární“ otázky (otázky, jejichž odpovědi jsou popsány velikostí, např. „jaká je cena ETH?“), spolu s vkladem. Uživatelé, kteří poskytnou hodnoty mezi 25. a 75. [percentilem](https://en.wikipedia.org/wiki/Percentile), jsou odměněni, zatímco ti, jejichž hodnoty se výrazně odchylují od mediánové hodnoty, jsou penalizováni.

Ačkoli SchellingCoin dnes neexistuje, řada decentralizovaných orákul – zejména [Orákula protokolu Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) – používá mechanismus Schellingova bodu ke zlepšení přesnosti dat orákula. Každé orákulum Maker se skládá z offchain P2P sítě uzlů („relayers“ a „feeds“), které předkládají tržní ceny pro aktiva zajištění, a onchain kontraktu „Medianizer“, který vypočítává medián všech poskytnutých hodnot. Jakmile uplyne zadaná doba zpoždění, tato mediánová hodnota se stane novou referenční cenou pro přidružené aktivum.

Další příklady orákul, která používají mechanismy Schellingova bodu, zahrnují [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) a [Witnet](https://witnet.io/). V obou systémech jsou odpovědi z uzlů orákula v peer-to-peer síti agregovány do jediné agregované hodnoty, jako je průměr nebo medián. Uzly jsou odměňovány nebo trestány podle toho, do jaké míry se jejich odpovědi shodují s agregovanou hodnotou nebo se od ní odchylují.

Mechanismy Schellingova bodu jsou atraktivní, protože minimalizují onchain stopu (je třeba odeslat pouze jednu transakci) a zároveň zaručují decentralizaci. To druhé je možné, protože uzly musí podepsat seznam předložených odpovědí předtím, než je vložen do algoritmu, který produkuje průměrnou/mediánovou hodnotu.

### Dostupnost {#applications-of-oracles-in-smart-contracts}

Decentralizované služby orákula zajišťují vysokou dostupnost offchain dat pro chytré kontrakty. Toho je dosaženo decentralizací jak zdroje offchain informací, tak uzlů odpovědných za přenos informací onchain.

To zajišťuje odolnost proti chybám, protože kontrakt orákula se může spolehnout na více uzlů (které se také spoléhají na více zdrojů dat) při provádění dotazů z jiných kontraktů. Decentralizace na úrovni zdroje _a_ provozovatele uzlu je klíčová – síť uzlů orákula poskytující informace získané ze stejného zdroje narazí na stejný problém jako centralizované orákulum.

U orákul založených na staku je také možné penalizovat provozovatele uzlů, kteří nedokážou rychle reagovat na požadavky na data. To významně motivuje uzly orákula k investicím do infrastruktury odolné proti chybám a k včasnému poskytování dat.

### Dobrá kompatibilita pobídek {#retrieving-financial-data}

Decentralizovaná orákula implementují různé návrhy pobídek, aby zabránila [byzantskému](https://en.wikipedia.org/wiki/Byzantine_fault) chování mezi uzly orákula. Konkrétně dosahují _přiřaditelnosti_ a _odpovědnosti_:

1. Decentralizované uzly orákula jsou často povinny podepsat data, která poskytují v reakci na požadavky na data. Tyto informace pomáhají s hodnocením historického výkonu uzlů orákula, takže uživatelé mohou při zadávání požadavků na data odfiltrovat nespolehlivé uzly orákula. Příkladem je [Algoritmický systém reputace](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) sítě Witnet.

2. Decentralizovaná orákula – jak bylo vysvětleno dříve – mohou vyžadovat, aby uzly vložily stake na svou důvěru v pravdivost dat, která předkládají. Pokud se tvrzení potvrdí, může být tento stake vrácen spolu s odměnami za poctivou službu. Může však být také penalizován v případě, že jsou informace nesprávné, což poskytuje určitou míru odpovědnosti.

## Aplikace orákul v chytrých kontraktech {#generating-verifiable-randomness}

Následují běžné případy užití orákul na Ethereu:

### Získávání finančních dat {#getting-outcomes-for-events}

Aplikace [decentralizovaných financí (DeFi)](/defi/) umožňují peer-to-peer půjčování, vypůjčování a obchodování s aktivy. To často vyžaduje získání různých finančních informací, včetně údajů o směnných kurzech (pro výpočet fiat hodnoty kryptoměn nebo porovnání cen tokenů) a údajů o kapitálových trzích (pro výpočet hodnoty tokenizovaných aktiv, jako je zlato nebo americký dolar).

Například protokol pro půjčování v DeFi potřebuje dotazovat aktuální tržní ceny aktiv (např. ETH) vložených jako zajištění. To umožňuje kontraktu určit hodnotu aktiv zajištění a určit, kolik si může ze systému vypůjčit.

Mezi populární „cenová orákula“ (jak se často nazývají) v DeFi patří Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) protokolu Compound, [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) od Uniswapu a [Orákula Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Tvůrci by měli porozumět úskalím, která s těmito cenovými orákuly přicházejí, než je integrují do svého projektu. Tento [článek](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) poskytuje podrobnou analýzu toho, co je třeba zvážit při plánování použití kteréhokoli ze zmíněných cenových orákul.

Níže je příklad toho, jak můžete ve svém chytrém kontraktu získat nejnovější cenu ETH pomocí cenového zdroje Chainlink:

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
     * Vrací nejnovější cenu
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

### Generování ověřitelné náhodnosti {#automating-smart-contracts}

Určité blockchainové aplikace, jako jsou hry založené na blockchainu nebo loterijní schémata, vyžadují k efektivnímu fungování vysokou úroveň nepředvídatelnosti a náhodnosti. Deterministické provádění blockchainů však náhodnost eliminuje.

Původním přístupem bylo použití pseudonáhodných kryptografických funkcí, jako je `blockhash`, ale ty mohly být [manipulovány těžaři](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) řešícími algoritmus důkazu prací (PoW). Také [přechod Etherea na důkaz podílem (PoS)](/roadmap/merge/) znamená, že vývojáři se již nemohou spoléhat na `blockhash` pro onchain náhodnost. [Mechanismus RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) na Beacon chainu místo toho poskytuje alternativní zdroj náhodnosti.

Je možné vygenerovat náhodnou hodnotu offchain a odeslat ji onchain, ale to klade na uživatele vysoké požadavky na důvěru. Musí věřit, že hodnota byla skutečně vygenerována prostřednictvím nepředvídatelných mechanismů a nebyla při přenosu změněna.

Orákula navržená pro offchain výpočty tento problém řeší bezpečným generováním náhodných výsledků offchain, které vysílají onchain spolu s kryptografickými důkazy potvrzujícími nepředvídatelnost procesu. Příkladem je [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), což je prokazatelně spravedlivý a proti manipulaci odolný generátor náhodných čísel (RNG) užitečný pro budování spolehlivých chytrých kontraktů pro aplikace, které spoléhají na nepředvídatelné výsledky.

### Získávání výsledků událostí {#use-blockchain-oracles}

S orákuly je vytváření chytrých kontraktů, které reagují na události v reálném světě, snadné. Služby orákula to umožňují tím, že dovolují kontraktům připojit se k externím API prostřednictvím offchain komponent a spotřebovávat informace z těchto zdrojů dat. Například dříve zmíněná predikční dapp může požádat orákulum o vrácení výsledků voleb z důvěryhodného offchain zdroje (např. Associated Press).

Použití orákul k získávání dat na základě výsledků v reálném světě umožňuje další nové případy užití; například decentralizovaný pojistný produkt potřebuje k efektivnímu fungování přesné informace o počasí, katastrofách atd.

### Automatizace chytrých kontraktů {#further-reading}

Chytré kontrakty se nespouštějí automaticky; spíše musí externě vlastněný účet (EOA) nebo jiný kontraktový účet spustit správné funkce k provedení kódu kontraktu. Ve většině případů je většina funkcí kontraktu veřejná a může být vyvolána EOA a jinými kontrakty.

V rámci kontraktu však existují také _soukromé funkce_, které jsou pro ostatní nepřístupné, ale které jsou kritické pro celkovou funkčnost dapp. Příklady zahrnují funkci `mintERC721Token()`, která pravidelně razí nová NFT pro uživatele, funkci pro udělování výplat na predikčním trhu nebo funkci pro odemykání stakovaných tokenů na DEX.

Vývojáři budou muset takové funkce spouštět v intervalech, aby aplikace běžela hladce. To by však mohlo vést k více hodinám ztraceným na rutinních úkolech pro vývojáře, a proto je automatizace provádění chytrých kontraktů atraktivní.

Některé decentralizované sítě orákul nabízejí automatizační služby, které umožňují offchain uzlům orákula spouštět funkce chytrých kontraktů podle parametrů definovaných uživatelem. Obvykle to vyžaduje „registraci“ cílového kontraktu u služby orákula, poskytnutí prostředků na zaplacení provozovateli orákula a specifikaci podmínek nebo časů pro spuštění kontraktu.

[Keeper Network](https://chain.link/keepers) od Chainlinku poskytuje chytrým kontraktům možnosti outsourcovat pravidelné úkoly údržby decentralizovaným způsobem s minimalizovanou potřebou důvěry. Přečtěte si oficiální [dokumentaci Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) pro informace o tom, jak učinit váš kontrakt kompatibilním s Keeperem a jak používat službu Upkeep.

## Jak používat blockchainová orákula

Existuje několik aplikací orákul, které můžete integrovat do své dapp na Ethereu:

**[Chainlink](https://chain.link/)** - _Decentralizované sítě orákul Chainlink poskytují vstupy, výstupy a výpočty odolné proti manipulaci na podporu pokročilých chytrých kontraktů na jakémkoli blockchainu._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone je decentralizované modulární orákulum, které poskytuje datové toky optimalizované pro gas. Specializuje se na nabídku cenových zdrojů pro nově vznikající aktiva, jako jsou tokeny likvidního stakingu (LST), tokeny likvidního restakingu (LRT) a deriváty stakingu Bitcoinu._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle překonává současná omezení přenosu dat onchain vývojem skutečně škálovatelných, nákladově efektivních, decentralizovaných a ověřitelných orákul._

**[Witnet](https://witnet.io/)** - _Witnet je decentralizované orákulum nevyžadující povolení a odolné vůči cenzuře, které pomáhá chytrým kontraktům reagovat na události v reálném světě se silnými kryptoekonomickými zárukami._

**[UMA Oracle](https://uma.xyz)** - _Optimistické orákulum UMA umožňuje chytrým kontraktům rychle přijímat jakýkoli druh dat pro různé aplikace, včetně pojištění, finančních derivátů a predikčních trhů._

**[Tellor](https://tellor.io/)** - _Tellor je transparentní protokol orákula nevyžadující povolení, díky kterému může váš chytrý kontrakt snadno získat jakákoli data, kdykoli je potřebuje._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol je platforma meziřetězcového datového orákula, která agreguje a propojuje data z reálného světa a API s chytrými kontrakty._

**[Pyth Network](https://pyth.network/)** - _Síť Pyth je síť finančních orákul první strany navržená k publikování nepřetržitých dat z reálného světa onchain v prostředí odolném proti manipulaci, decentralizovaném a soběstačném._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO dodává řešení orákul první strany, která poskytují větší transparentnost zdrojů, bezpečnost a škálovatelnost v decentralizovaném řešení pro chytré kontrakty_

**[Supra](https://supra.com/)** - Vertikálně integrovaná sada nástrojů meziřetězcových řešení, která propojuje všechny blockchainy, veřejné (L1 a L2) nebo soukromé (podnikové), a poskytuje decentralizované cenové zdroje orákul, které lze použít pro onchain a offchain případy užití. 

**[Gas Network](https://gas.network/)** - Distribuovaná platforma orákula poskytující data o ceně plynu v reálném čase napříč blockchainem. Přenesením dat od předních poskytovatelů dat o ceně plynu onchain pomáhá Gas Network podporovat interoperabilitu. Gas Network podporuje data pro více než 35 řetězců, včetně Ethereum Mainnet a mnoha předních L2.

**[DIA](https://www.diadata.org/)** - Meziřetězcová síť orákul poskytující ověřitelné datové toky pro více než 20 000 aktiv napříč všemi hlavními třídami aktiv. DIA získává surová obchodní data přímo z více než 100 primárních trhů a vypočítává je onchain, čímž zajišťuje úplnou transparentnost a ověřitelnost dat s vlastními konfiguracemi pro jakýkoli případ užití.

**[Stork](https://stork.network)** - Stork dodává cenová data s ultra nízkou latencí, čímž podporuje širokou škálu případů užití včetně trhů s perpetuálními kontrakty, protokolů pro půjčování a ekosystémů DeFi, přičemž nová aktiva jsou podporována rychle po zalistování.

## Další čtení

**Články**

- [Co je to blockchainové orákulum?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Co je to blockchainové orákulum?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Decentralizovaná orákula: komplexní přehled](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementace blockchainového orákula na Ethereu](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Proč chytré kontrakty nemohou provádět volání API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Takže chcete použít cenové orákulum](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Videa**

- [Orákula a expanze užitečnosti blockchainu](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Návody**

- [Jak získat aktuální cenu Etherea v Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Spotřeba dat z orákula](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Výzva orákul](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Příklady projektů**

- [Kompletní startovací projekt Chainlink pro Ethereum v Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_