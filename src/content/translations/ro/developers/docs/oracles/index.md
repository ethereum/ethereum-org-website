---
title: Oracole
description: Oracolele te ajută să introduci date din lumea reală în aplicația tale Ethereum, deoarece contractele inteligente nu pot interoga singure datele din lumea reală.
lang: ro
sidebar: true
incomplete: true
isOutdated: true
---

Oracolele sunt fluxuri de date care conectează Ethereum la informații din lumea reală, în afara lanțului, astfel încât să poți interoga datele în contractele tale inteligente. De exemplu, aplicațiile dapp de predicție de piață utilizează oracole pentru a deconta plăți pe baza evenimentelor. O piață de predicție îți poate cere să pariezi ETH pe următorul președinte al Statelor Unite. Vor folosi un oracol pentru a confirma rezultatul și pentru a plăti câștigătorilor.

## Condiții prealabile {#prerequisites}

Asigură-te că ești familiar cu [nodurile](/developers/docs/nodes-and-clients/), [mecanismele de consens](/developers/docs/consensus-mechanisms/) și [anatomia contractelor inteligente](/developers/docs/smart-contracts/anatomy/), evenimente speciale.

## Ce este un oracol {#what-is-an-oracle}

Un oracol este o punte între blockchain și lumea reală. Acestea acționează ca API-uri pe lanț pe care le poți interoga pentru a obține informații în contractele inteligente. Acest lucru ar putea fi orice, de la informații de preț, la rapoarte meteorologice.

## De ce este nevoie de oracole? {#why-are-they-needed}

Cu un blockchain ca Ethereum ai nevoie de fiecare nod din rețea pentru a putea reda fiecare tranzacție și a termina cu același rezultat, garantat. API-urile introduc date potențial variabile. Dacă ai trimite cuiva o sumă de ETH în baza unei valori $USD convenită utilizând un API de preț, interogarea va returna un rezultat diferit de la o zi la alta. Ca să nu mai vorbim, API-ul ar putea fi piratat sau perimat. Dacă se întâmplă acest lucru, nodurile din rețea nu ar fi în măsură să se pună de acord asupra stării actuale a Ethereum, încălcând în mod efectiv [consensul](/developers/docs/consensus-mechanisms/).

Oracolele rezolvă această problemă postând datele pe blockchain. De aceea, orice nod care redă tranzacția va utiliza aceleași date imuabile care sunt postate pentru ca toți să le vadă. Pentru a face acest lucru, un oracol este format de obicei dintr-un contract inteligent și unele componente din lanț care pot interoga API-urile, apoi trimit periodic tranzacții pentru a actualiza datele contractului inteligent.

### Securitate {#security}

Un oracol este la fel de sigur ca sursele sale de date. Dacă o aplicație dapp folosește Uniswap ca oracol pentru fluxul său de preț ETH/DAI, un atacator ar putea să mute prețul pe Uniswap pentru a manipula înțelegerea de către dapp a prețului curent. Un exemplu al modului de combatere a acestui lucru este [un sistem de alimentare](https://developer.makerdao.com/feeds/) precum cel folosit de MakerDAO, care strânge date despre prețuri dintr-o serie de fluxuri de prețuri în loc să se bazeze doar pe o singură sursă.

## Utilizare {#usage}

### Oracolele ca serviciu {#oracles-as-a-service}

Servicii precum Chainlink oferă oracole-ca-serviciu pe care le poți utiliza. Au infrastructura pusă la dispoziție pentru a face lucruri precum:

- [obținerea de fluxuri de preț cripto în contractul tău](https://chain.link/solutions/defi)
- [generarea de numere aleatorii verificabile (utile pentru jocuri)](https://chain.link/solutions/chainlink-vrf)
- [apelarea de API-uri externe](https://docs.chain.link/docs/request-and-receive-data) – o nouă utilizare a acestui lucru este [verificarea rezervelor wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Acesta este un exemplu despre cum să obții cel mai recent preț ETH în contractul tău inteligent utilizând un flux de preț Chainlink:

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

[Vezi documentația](https://docs.chain.link/docs/get-the-latest-price)

#### Servicii Oracle {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Construiește un contract inteligent oracol {#build-an-oracle-smart-contract}

Iată un exemplu de contract oracol al lui Pedro Costa. Poți găsi adnotări suplimentare în articolul său: [Implementarea unui Blockchain Oracol pe Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

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
    uint lenght = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[lenght-1];

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

_Ne-ar plăcea mai multă documentație privind crearea unui contract inteligent oracol. Dacă poți ajuta, creează un PR!_

## Referințe suplimentare {#further-reading}

- [Oracle descentralizat: o imagine de ansamblu cuprinzătoare](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) –_Julien Thevenard_
- [Implementarea unui Blockchain Oracle pe Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) –_Pedro Costa_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) –_EthHub_
