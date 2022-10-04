---
title: Oracles
description: Oraklji pomagajo pridobiti podatke iz resničnega sveta v vašo aplikacijo Ethereum, saj pametne pogodbe ne morejo same poizvedovati po podatkih iz resničnega sveta.
lang: sl
incomplete: true
---

Oraklji so viri podatkov, ki povezujejo Ethereum s podatki izven verige iz resničnega sveta, da lahko poizvedujete o teh podatkih v svoji pametni pogodbi. Na primer, dappi napovednih trgov uporabljajo oraklje za poravnavo plačil, ki temeljijo na dogodkih. Napovedni trg lahko od vas zahteva, da stavite svoj ETH na to, kdo bo postal naslednji predsednik Združenih držav Amerike. Oraklje bodo uporabili za potrditev izida in izplačilo zmagovalcem.

## Predpogoji {#prerequisites}

Prepričajte se, da ste seznanjeni z [vozlišči](/developers/docs/nodes-and-clients/), [mehanizmi za soglasje](/developers/docs/consensus-mechanisms/) in [anatomijo pametnih pogodb](/developers/docs/smart-contracts/anatomy/), specifično za dogodke.

## Kaj je orakelj {#what-is-an-oracle}

Orakelj je most med blokovno verigo in resničnim svetom. Delujejo kot API-ji na verigi, od katerih lahko poizvedujete, da prejmete informacije v svoje pametne pogodbe. To je lahko karkoli od informacij o ceni do vremenskih poročil. Oraklji so lahko tudi dvosmerni in se uporabljajo za "pošiljanje" podatkov v resnični svet.

Oglejte si Patricka, ki pojasnjuje oraklje:

<YouTube id="ZJfkNzyO7-U" start="10" />

## Zakaj so potrebni? {#why-are-they-needed}

Pri blokovni verigi, kot je Ethereum, je potrebno, da vsako vozlišče v omrežju vrne vsako transakcijo in ima na koncu zagotovo enak rezultat. API-ji predstavijo potencialno variabilne podatke. Če bi pošiljali ETH na podlagi dogovorjene vrednosti $USD z uporabo cenovnega API-ja, bi poizvedba vsak dan vrnila različen rezultat. Da ne omenjamo, da je lahko API napaden ali zastarel. V tem primeru se vozlišča v omrežju ne bi mogla strinjati o Ethereumovem trenutnem stanju, kar bi efektivno prelomilo [soglasje](/developers/docs/consensus-mechanisms/).

Oraklji rešijo ta problem z objavo podatkov na blokovni verigi. Tako lahko katerokoli vozlišče uporablja iste nespremenljive podatke, ki so objavljeni na očeh vseh. Za to je orakelj po navadi sestavljen iz pametne pogodbe in nekaj komponent izven verige, ki lahko poizvedujejo prek API-jev ter nato periodično pošiljajo transakcije za posodobitev podatkov pametne pogodbe.

### Problem oraklja {#oracle-problem}

Kot smo omenili, transakcije Ethereum ne morejo neposredno dostopati do podatkov izven verige. Obenem je zanašanje na le en vir resnice za zagotavljanje podatkov nevarno in izpodbija decentralizacijo pametne pogodbe. To poznamo kot problem oraklja.

Problemu oraklja se lahko izognemo z decentraliziranim orakljem, ki podatke vleče iz različnih virov; če je en podatkovni vir napaden ali mu spodleti, bo pametna pogodba še vedno delovala tako, kot je bil njen namen.

### Varnost {#security}

Orakelj je varen le toliko, kot so varni njegovi podatkovni viri. Če dapp kot orakelj za svoj vir cene ETH/DAI uporablja Uniswap, lahko napadalec premakne ceno na Uniswapu, da manipulira z dappovim razumevanjem trenutne cene. Primer, kako se boriti proti temu, je [sistem virov](https://developer.makerdao.com/feeds/), kot je tisti, ki ga uporablja MakerDAO, ki podatke o cenah zbira od več zunanjih cenovnih virov, namesto da bi se zanašal le na en vir.

### Arhitektura {#architecture}

To je primer preproste arhitekture oraklja, ampak obstaja še več drugih načinov za sprožitev računanja izven verige.

1. Oddajte dnevnik s svojim [dogodkom pametne pogodbe](/developers/docs/smart-contracts/anatomy/#events-and-logs)
2. Storitev izven verige se je naročila (navadno z uporabo nečesa, kot je ukaz JSON-RPC `eth_subscribe`) na te specifične dnevnike.
3. Storitev izven verige nadaljuje z izvedbo nalog, kot so opredeljene v dnevniku.
4. Storitev izven verige se odzove s podatki, zahtevanimi v sekundarni transakciji, na pametno pogodbo.

To je način za pridobitev podatkov po načelu 1 na 1, čeprav bi za izboljšanje varnosti morda želeli decentralizirati način zbiranja svojih podatkov izven verige.

Naslednji korak bi lahko bil, da omrežje teh vozlišč izvede te klice na različne API-je in vire ter zbere podatke na verigi.

[Poročanje Chainlink izven verige](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) se je na podlagi te metodologije izboljšalo s tem, da oraklji v omrežju izven verige med seboj komunicirajo, kriptografsko podpišejo svoje odzive, združijo svoje odzive izven verige in na verigo pošljejo le eno transakcijo z rezultatom. Na ta način se porabi manj goriva, ampak še vedno lahko dobite zagotovilo decentraliziranih podatkov, saj je vsako vozlišče podpisalo svoj del transakcije, kar jo je za vozlišča, ki jo pošiljajo, naredilo nespremenljivo. Politika stopnjevanja se uveljavi, če vozlišče ne opravi transakcije in transakcijo pošlje naslednje vozlišče.

## Uporaba {#usage}

Z uporabo storitev, kot je Chainlink, se lahko sklicujete na decentralizirane podatke na verigi, ki so že bili povlečeni in združeni iz resničnega sveta. Nekako tako kot javna skupna dobrina, vendar za decentralizirane podatke. Prav tako lahko za pridobitev katerihkoli podatkov po meri, ki jih iščete, razvijete svoja lastna modularna omrežja orakljev. Dodatno lahko izvedete računanje izven verige in prav tako pošljete informacije v resnični svet. Chainlink ima vzpostavljeno infrastrukturo za:

- [Pridobitev kripto cenovnih virov v vašo pogodbo](https://chain.link/solutions/defi)
- [Generiranje potrdljivih naključnih številk (uporabno za igričarstvo)](https://chain.link/solutions/chainlink-vrf)
- [Pokličete zunanje API-je](https://docs.chain.link/docs/request-and-receive-data) – ena nova uporaba tega je [Preverjanje zalog wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Tukaj je primer pridobivanja aktualne cene ETH v vaši pametni pogodbi z uporabo cenovnega vira Chainlink:

### Viri podatkov Chainlink {#chainlink-data-feeds}

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

[To lahko testirate v remiksu prek te povezave](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Oglejte si dokumentacijo](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink VRF {#chainlink-vrf}

Chainlink VRF (potrdljiva naključna funkcija) je dokazano pravičen in potrdljiv vir naključnosti, oblikovan za pametne pogodbe. Razvijalci pametnih pogodb lahko uporabijo Chainlink VRF za naključno generiranje številk (RNG), odporno na posege, da razvijejo zanesljive pametne pogodbe za katerekoli aplikacije, ki se zanašajo na nepredvidljive izide:

- Igre na blokovnih verigah in NFT-je
- Naključno dodeljevanje zadolžitev in virov (recimo naključno dodeljevanje sodnikov primerom)
- Izbiro reprezentativnega vzorca za mehanizme za soglasje

Naključne številke so težke, saj so blokovne verige deterministične.

Delo z oraklji Chainlink zunaj podatkovnih virov sledi [ciklu zahtevaj in prejmi](https://docs.chain.link/docs/architecture-request-model) dela s Chainlinkom. Za pošiljanje goriva ponudnikom orakljev za vračanje odzivov uporabljajo žeton LINK. Žeton LINK je specifično oblikovan za delo z oraklji in temelji na nadgrajenem žetonu ERC-677, ki je vzvratno kompatibilen z [ERC-20](/developers/docs/standards/tokens/erc-20/). Naslednja koda, če je uveljavljena na testnem omrežju Kovan, bo pridobila kriptografsko dokazano naključno številko. Za izvršitev zahteve na pogodbo nakažite nekaj žetonov LINK testnega omrežja, ki jih lahko dobite iz [pipe Kovan LINK](https://kovan.chain.link/).

```javascript

pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {

    bytes32 internal keyHash;
    uint256 internal fee;

    uint256 public randomResult;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor()
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (varies by network)
    }

    /**
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
}
```

### Chainlink Keepers {#chainlink-keepers}

Pametne pogodbe ne morejo sprožiti ali iniciirati svojih lastnih funkcij v arbitrarnem času ali pod arbitrarnimi pogoji. Spremembe stanja se bodo pojavile, ko nek drug račun iniciira transakcijo (recimo uporabnik, orakelj ali pogodba). [Omrežje Chainlink Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) zagotavlja možnosti, da pametne pogodbe sprotno vzdrževanje predajo zunanjim izvajalcem na način minimiziranega zaupanja in decentralizacije.

Za uporabo Chainlink Keeperjev mora pametna pogodba implementirati [KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/), ki je sestavljena iz dveh funkcij:

- `checkUpkeep` – preveri, če pogodba zahteva delo, ki ga je treba opraviti.
- `performUpkeep` – izvede delo na pogodbi, če tako naroči checkUpkeep.

Spodnji primer je preprosta kontra pogodba. `Kontra` spremenljivka je povečana za ena z vsakim klicem `performUpkeep`. Lahko [si ogledate naslednjo kodo z uporabo Remixa](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// KeeperCompatible.sol imports the functions from both ./KeeperBase.sol and
// ./interfaces/KeeperCompatibleInterface.sol
import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";

contract Counter is KeeperCompatibleInterface {
    /**
    * Public counter variable
    */
    uint public counter;

    /**
    * Use an interval in seconds and a timestamp to slow execution of Upkeep
    */
    uint public immutable interval;
    uint public lastTimeStamp;

    constructor(uint updateInterval) {
      interval = updateInterval;
      lastTimeStamp = block.timestamp;

      counter = 0;
    }

    function checkUpkeep(bytes calldata /* checkData */) external override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. Funkcija checkData je definirana, ko je bil registriran Upkeep.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. Funkcija performData je ustvarjena s strani Keeper klica na vašo funkcijo checkUpkeep
    }
}
```

Po uveljavitvi pogodbe, kompatibilne s Keeper, morate pogodbo registrirati za [Upkeep](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) in nanjo položiti LINK, da omrežje Keeper obvestite o svoji pogodbi in da je vaše delo izvedeno neprekinjeno.

### Projekti Keepers {#keepers}

- [Chainlink Keepers](https://keepers.chain.link/)
- [Keep3r Network](https://docs.keep3r.network/)

### Klic Chainlink API {#chainlink-api-call}

[Klici Chainlink API](https://docs.chain.link/docs/make-a-http-get-request) so najenostavnejši način za pridobivanje podatkov iz sveta izven verige na tradicionalen način, po katerem deluje splet: klici API. Enkratna izvedba in razpolaganje le z enim orakljem sta po naravi centralizirana. Da bi jo ohranili resnično decentralizirano, bi morala platforma pametnih pogodb uporabljati številna vozlišča, najdena na [zunanjem podatkovnem trgu](https://market.link/).

[Za testiranje uveljavite naslednjo kodo v remiksu na omrežju Kovan](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

To prav tako sledi zahtevi in prejme cikel orakljev ter za to potrebuje pogodbo, da se lahko za delovanje financira s Kovan LINK (gorivom oraklja).

```javascript
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public volume;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");

        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }
}
```

Več o aplikacijah Chainlink lahko izveste z branjem [razvijalskega bloga Chainlink](https://blog.chain.link/tag/developers/).

## Storitve orakljev {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Razvijte orakeljsko pametno pogodbo {#build-an-oracle-smart-contract}

Tukaj najdete primer orakeljske pogodbe Pedra Coste. Nadaljnje opombe lahko najdete v njegovem članku: [Implementacija oraklja blokovne verige na Ethereumu](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

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
    mapping(uint => string) anwers;     //answers provided by the oracles
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
    uint lenght = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[lenght-1];

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
        if(bytes(currRequest.anwers[tmpI]).length == 0){
          found = true;
          currRequest.anwers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer has the current one
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.anwers[i]);
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

_Želeli bi si več dokumentacije o ustvarjanju orakeljskih pametnih pogodb. Če lahko pomagate, ustvarite PR!_

## Nadaljnje branje {#further-reading}

**Članki**

- [Kaj je orakelj blokovne verige?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [Oraklji](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) – _EthHub_
- [Kaj je orakelj blokovne verige?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Decentralizirani oraklji: podroben pregled](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementacija oraklja blokovne verige na Ethereumu](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Zakaj pametne pogodbe ne morejo izvrševati klicev API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [Zakaj potrebujemo decentralizirane oraklje](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) – _Bankless_
- [Torej, želite uporabljati cenovni orakelj](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Videoposnetki**

- [Oraklji in razširitev uporabnosti blokovne verige](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_

**Vadnice**

- [Kako pridobiti trenutno ceno Ethereuma v Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) – _Chainlink_
