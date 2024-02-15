---
title: Oracole
description: Oracolele vă ajută să introduceţi date din lumea reală în aplicația dvs. Ethereum, deoarece contractele inteligente nu pot interoga singure datele din lumea reală.
lang: ro
incomplete: true
---

Oracolele sunt fluxuri de date care conectează Ethereum la informații din lumea reală, în afara lanțului, astfel încât să puteţi interoga datele în contractele dvs. inteligente. De exemplu, aplicațiile dapp de predicție de piață utilizează oracole pentru a efectua plăți pe baza evenimentelor. O piață de predicție vă poate cere săpariaţi ETH pe următorul președinte al Statelor Unite. Va folosi un oracol pentru a confirma rezultatul și pentru a plăti câștigătorilor.

## Condiții prealabile {#prerequisites}

Aveţi grijă să vă familiarizaţi cu [nodurile](/developers/docs/nodes-and-clients/), [mecanismele de consens](/developers/docs/consensus-mechanisms/) și [anatomia contractelor inteligente](/developers/docs/smart-contracts/anatomy/), în special cu evenimentele.

## Ce este un oracol {#what-is-an-oracle}

Un oracol este o punte între blockchain și lumea reală. Acestea acționează ca API-uri pe lanț pe care le puteţi interoga pentru a obține informații în contractele inteligente. Acest lucru ar putea fi orice, de la informații de preț la rapoarte meteorologice. Oracolele pot fi şi bidirecționale, adică folosite pentru a „trimite” date în lumea reală.

Urmăriți-l pe Patrick explicând Oracolele:

<YouTube id="ZJfkNzyO7-U" start="10" />

## De ce este nevoie de oracole? {#why-are-they-needed}

Cu un blockchain precum Ethereum, aveți nevoie de fiecare nod din rețea ca să repete fiecare tranzacție și să ajungă la același rezultat, garantat. API-urile introduc date potențial variabile. Dacă ați trimite ETH pe baza unei valori $USD convenite folosind un API de prețuri, interogarea ar răspunde printr-un rezultat diferit de la o zi la alta. Ca să nu mai spunem că API-ul ar putea fi piratat sau perimat. Dacă se întâmplă acest lucru, nodurile din rețea nu ar fi în măsură să se pună de acord asupra stării actuale a lui Ethereum, încălcând în mod efectiv [consensul](/developers/docs/consensus-mechanisms/).

Oracolele rezolvă această problemă postând datele pe blockchain. De aceea, orice nod care redă tranzacția va utiliza aceleași date imuabile care sunt postate pentru ca toți să le vadă. Pentru a face acest lucru, un oracol este format de obicei dintr-un contract inteligent și unele componente din lanț care pot interoga API-urile, iar apoi trimit periodic tranzacții pentru a actualiza datele contractului inteligent.

### Problema oracolului {#oracle-problem}

După cum am menționat, tranzacțiile Ethereum nu pot accesa direct datele din afara lanțului. Totodată, dacă ne bizuim pe o singură sursă a adevărului pentru a furniza date, acest lucru este nesigur și invalidează descentralizarea unui contract inteligent. Aceasta este cunoscută sub numele de problema oracolului.

Putem evita problema oracolului prin utilizarea unui oracol descentralizat care preia date din mai multe surse; dacă una dintre sursele de date este piratată sau eșuează, contractul inteligent va funcționa în continuare așa cum a fost stabilit.

### Securitate {#security}

Un oracol este la fel de securizat ca sursele sale de date. Dacă o aplicație dapp utilizează Uniswap ca oracol pentru alimentarea cu prețul ETH/DAI, un atacator poate muta prețul pe Uniswap pentru a manipula înțelegerea prețului curent de către aplicația dapp. Un exemplu de modalitate de combatere a acestui lucru este [un sistem de alimentare](https://developer.makerdao.com/feeds/) precum cel utilizat de MakerDAO, care colaționează datele despre prețuri din mai multe surse externe în loc să se bazeze doar pe una singură.

### Arhitectură {#architecture}

Acesta este un exemplu de arhitectură Oracle simplă, însă există mai multe moduri de a declanșa calculul off-chain.

1. Emiteți un jurnal cu [evenimentul contractului dvs. inteligent](/developers/docs/smart-contracts/anatomy/#events-and-logs)
2. Un serviciu off-chain s-a abonat (de regulă folosind ceva de genul comenzii JSON-RPC `eth_subscribe`) la aceste jurnale specifice.
3. Serviciul off-chain trece la efectuarea unor sarcini definite de jurnal.
4. Serviciul off-chain răspunde contractului inteligent prin datele solicitate într-o tranzacție secundară.

Aceasta este modalitatea de obținere a datelor într-o manieră 1 la 1, dar, pentru a îmbunătăți securitatea, poate doriți să descentralizați modul în care colectați datele off-chain.

Următoarea etapă ar putea fi aceea de a avea o rețea a acestor noduri care să efectueze acele apeluri către diferite API-uri și surse și să agrege datele pe lanț.

[Chainlink Off-Chain Reporting](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) a îmbunătățit această metodologie prin faptul că rețelele de oracole off-chain comunică între ele, își semnează criptografic răspunsurile, agregă răspunsurile off-chain și trimit doar o singură tranzacție on-chain cu rezultatul. În acest mod se cheltuiește mai puțin gaz, dar se menține garanția datelor descentralizate, întrucât fiecare nod a semnat partea sa de tranzacție, prin aceasta nemaiputând fi modificată de către nodul care trimite tranzacția. Politica de escaladare intră în vigoare dacă nodul nu efectuează tranzacția, ci următorul nod trimite tranzacția.

## Utilizare {#usage}

Utilizând servicii precum Chainlink, puteți face referire la datele descentralizate on-chain care au fost deja extrase din lumea reală și agregate. Un fel de bunuri comune publice, dar pentru date descentralizate. De asemenea, vă puteți construi propriile rețele de oracole modulare pentru a obține datele personalizate pe care le căutați. În plus, puteți efectua calcule off-chain și de asemenea trimite informații în lumea reală. Chainlink dispune de infrastructura necesară pentru:

- [obținerea de fluxuri de preț cripto în contractul dvs.](https://chain.link/solutions/defi)
- [generarea de numere aleatorii verificabile (utile pentru jocuri)](https://chain.link/solutions/chainlink-vrf)
- [apelarea de API-uri externe](https://docs.chain.link/docs/request-and-receive-data) – o utilizare inedită a acestui lucru este [Verificarea rezervelor wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Iată un exemplu al modului de a obţine cel mai recent preț ETH în contractul dvs. inteligent folosind un flux de prețuri Chainlink:

### Fluxuri de date Chainlink {#chainlink-data-feeds}

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

[Puteți testa acest lucru în remix cu acest link](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Vedeţi documentația](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink VRF {#chainlink-vrf}

Chainlink VRF (Funcția aleatorie verificabilă) este o sursă de randomizare verificabilă și verificabilă, cu o corectitudine dovedită, concepută pentru contractele inteligente. Dezvoltatorii de contracte inteligente pot folosi Chainlink VRF ca generator de numere aleatorii (RNG) inviolabil ca să construiască contracte inteligente fiabile pentru orice aplicații care se bazează pe rezultate imprevizibile:

- Jocuri blockchain și NFT-uri
- Alocarea aleatorie de sarcini și resurse (de exemplu, alocarea aleatorie a judecătorilor la procese)
- Alegerea unui eșantion reprezentativ pentru mecanismele de consens

Numerele aleatorii sunt dificile, deoarece blockchain-urile sunt deterministe.

Modul de lucru cu oracolele Chainlink în afara fluxurilor de date urmează [ciclul de solicitare și primire](https://docs.chain.link/docs/architecture-request-model) al modului de lucru cu Chainlink. Acesta foloseşte tokenul LINK pentru a trimite furnizorilor de oracole gazul oracolelor ca să dea răspunsuri. Tokenul LINK este conceput special pentru a lucra cu oracolele și se bazează pe tokenul ERC-677 actualizat, care este compatibil cu [ ERC-20](/developers/docs/standards/tokens/erc-20/). Dacă următorul cod este implementat pe testnet-ul Kovan, acesta va prelua un număr aleatoriu dovedit criptografic. Pentru a face cererea, finanțați contractul cu câteva tokenuri de testnet LINK, pe care le puteți obține de la faucet-ul [Kovan LINK](https://kovan.chain.link/).

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

Contractele inteligente nu își pot declanșa sau iniția propriile funcții în momente sau în condiții arbitrare. Starea contractelor se va modifica doar când un alt cont inițiază o tranzacție (cum ar fi un utilizator, un oracol sau un contract). [Rețeaua Chainlink Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) oferă contractelor inteligente opțiuni de externalizare a sarcinilor regulate de întreținere, în mod descentralizat și necesitând încredere minimă.

Pentru a utiliza Chainlink Keepers, un contract inteligent trebuie să implementeze o interfață [KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/), care constă din două funcții:

- `checkUpkeep` - Verifică dacă sunt prevăzute în contract lucrări de efectuat.
- `performUpkeep` - Execută lucrările prevăzute în contract, dacă este instruit de checkUpkeep.

Exemplul de mai jos este un simplu contract counter. Variabila `counter` este incrementată cu unu la fiecare apel lcătre `performUpkeep`. Puteți [examina codul următor folosind Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

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
        // We don't use the checkData in this example. CheckData este definită în momentul înregistrării Upkeep-ului.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. PerformData este generată de apelul Keeeper-ului la funcția checkUpkeep.
    }
}
```

După implementarea unui contract compatibil Keeper, trebuie să înregistrați contractul pentru [Upkeep](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) (întreținere) și să îl finanțați cu LINK, pentru a anunţa rețeaua Keeper despre contract, astfel încât munca dvs. să fie efectuată în mod continuu.

### Proiecte Keepers {#keepers}

- [Chainlink Keepers](https://keepers.chain.link/)
- [Rețeaua Keep3r](https://docs.keep3r.network/)

### Apelul API Chainlink {#chainlink-api-call}

[Apelurile API Chainlink](https://docs.chain.link/docs/make-a-http-get-request) sunt cea mai simplă modalitate de a obține date off-chain în modul tradițional în care funcționează web-ul: apelurile API. Realizarea unei singure astfel de instanțe și existența unui singur oracol îl face să devină centralizat prin natura sa. Pentru a-l menține cu adevărat descentralizat, o platformă de contracte inteligente ar trebui să utilizeze numeroase noduri găsite pe o [piață de date externă](https://market.link/).

[Implementați următorul cod în remix pe rețeaua kovan pentru a testa](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Acesta urmează tot ciclul de solicitare și primire a oracolelor și are nevoie să fie finanţat contractul cu Kovan LINK (gazul oracolului) pentru a funcționa.

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

Puteți afla mai multe despre aplicațiile Chainlink consultând [blogul dezvoltatorilor Chainlink](https://blog.chain.link/tag/developers/).

## Servicii Oracle {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Construiește un contract inteligent oracol {#build-an-oracle-smart-contract}

Iată un exemplu de contract oracol al lui Pedro Costa. Puteţi găsi şi alte adnotări în articolul său: [Implementarea unui blockchain oracol pe Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista cererilor adresate contractului
  uint currentId = 0; //creșterea ID-ului solicitării
  uint minQuorum = 2; //numărul minim de răspunsuri de primit înainte de declararea rezultatului final
  uint totalOracleCount = 3; // Număr de oracol codificat greu

  // definește o cerere API generală
  struct Request {
    uint id;                            //cerere id
    string urlToQuery;                  //API url
    string attributeToFetch;            //atribut json (cheie) pentru a prelua în răspuns    string agreedValue;                 //valoarea din cheie
    mapping(uint => string) anwers;     //răspunsuri oferite de oracole
    mapping(address => uint) quorum;    //oracole care vor interoga răspunsul (1 = oracolul nu a votat, 2 = oracolul a votat)
  }

  //eveniment care declanșează oracolul în afara blockchain-ului
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //declanșat atunci când există un consens cu privire la rezultatul final
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

    // adresa oracole codificată greu
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    //lansează un eveniment care va fi detectat de oracol în afara blockchain-ului
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // crește cererea id
    currentId++;
  }

  //chemat de oracol pentru a înregistra răspunsul său
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //verifică dacă oracolul se află în lista oracolelor de încredere
    //și dacă oracolul nu a votat încă
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marcând că această adresă a votat
      currRequest.quorum[msg.sender] = 2;

      //iterează prin „matricea” de răspunsuri până la o poziție dacă este liberă și salvează valoarea recuperată
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //găsește primul slot gol
        if(bytes(currRequest.anwers[tmpI]).length == 0){
          found = true;
          currRequest.anwers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterează prin lista oracolelor și verifică dacă sunt suficiente oracole (cvorum minim)
      //au votat același răspuns ca și cel actual
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

_Ne-ar plăcea să mai avem documentație privind crearea unui contract inteligent oracol. Dacă puteți ajuta, creați un PR!_

## Referințe suplimentare {#further-reading}

**Articole**

- [Ce este un blockchain oracol?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [Ce este un blockchain oracol?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Oracole descentralizate: o prezentare cuprinzătoare](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementarea unui blockchain oracol pe Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [De ce contractele inteligente nu pot face apeluri API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [De ce avem nevoie de oracole descentralizate](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) – _Bankless_
- [Deci doriți să folosiți un oracol de prețuri](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Videoclipuri**

- [Oracolele și expansiunea utilității blockchain-ului](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_

**Tutoriale**

- [Cum să obțineți prețul actual al lui Ethereum în Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/)_ – Chainlink_
