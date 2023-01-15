---
title: Wyrocznie
description: Wyrocznie umożliwiają uzyskanie danych ze świata rzeczywistego dla aplikacji Ethereum, ponieważ inteligentne kontrakty nie mogą same ich wyszukiwać.
lang: pl
incomplete: true
isOutdated: true
---

Wyrocznie to źródła danych łączące Ethereum z informacjami spoza łańcucha, ze świata rzeczywistego, umożliwiające zapytania o dane w inteligentnych kontraktach. Na przykład aplikacje dapp rynków prognostycznych używają wyroczni do rozliczania płatności na podstawie zdarzeń. Rynek prognostyczny może poprosić Cię o postawienie ETH na następnego prezydenta Stanów Zjednoczonych. Użyje wyroczni, aby potwierdzić wynik i wypłacić nagrodę zwycięzcom.

## Warunki wstępne {#prerequisites}

Upewnij się, że wiesz wystarczająco dużo na temat [węzłów](/developers/docs/nodes-and-clients/), [mechanizmów konsensusu](/developers/docs/consensus-mechanisms/) i [anatomii kontraktów inteligentnych](/developers/docs/smart-contracts/anatomy/), w szczególności zdarzeń.

## Co to jest wyrocznia {#what-is-an-oracle}

Wyrocznia jest pomostem między blockchainem a światem rzeczywistym. Wyrocznie działają jako interfejsy API w łańcuchu, do których można wysyłać zapytania, aby uzyskać informacje do inteligentnych kontraktów. Może to być wszystko, od informacji o cenach po prognozy pogody.

## Dlaczego są potrzebne? {#why-are-they-needed}

Z blockchainem takim jak Ethereum potrzebujesz każdego węzła w sieci, aby móc odtworzyć każdą transakcję i uzyskać ten sam wynik, gwarantowany. API wprowadzają potencjalnie zmienne dane. Jeśli wysyłasz komuś kwotę ETH na podstawie uzgodnionej wartości $USD za pomocą interfejsu API ceny, zapytanie zwróci inny wynik każdego dnia. Nie wspominając o tym, że API może zostać zhakowany lub być przestarzały. Jeśli tak się stanie, węzły w sieci nie będą w stanie uzgodnić aktualnego stanu Ethereum, skutecznie łamiąc [konsensus](/developers/docs/consensus-mechanisms/).

Wyrocznie rozwiązują ten problem, publikując dane w blockchainie. Tak więc każdy węzeł odtwarzający transakcję wykorzysta te same niezmienne dane, które zostały opublikowane dla wszystkich. W tym celu wyrocznia składa się zazwyczaj z inteligentnego kontraktu i niektórych elementów nieobjętych łańcuchem, które mogą odpytywać API, następnie okresowo wysyłać transakcje, aby zaktualizować dane inteligentnego kontraktu.

### Ochrona {#security}

Wyrocznia jest tak bezpieczna, jak jej źródła danych. Jeśli aplikacja dapp używa Uniswap jako wyroczni dla swojego kanału cenowego ETH/DAI, atakujący może zmienić cenę na Uniswap w celu manipulowania wiedzą aplikacji na temat bieżącej ceny. Można z tym walczyć, wykorzystując na przykład [system kanałów](https://developer.makerdao.com/feeds/) podobny do używanego przez MakerDAO, który porównuje dane cenowe z wielu zewnętrznych źródeł cen, zamiast polegać tylko na jednym.

## Wykorzystanie {#usage}

### Wyrocznie jako usługa {#oracles-as-a-service}

Usługi takie jak Chainlink oferują wyrocznie jako usługę, z której możesz korzystać. Dysponują infrastrukturą umożliwiającą użytkownikom podjęcie następujących działań:

- [pobieranie źródeł cen kryptowalut do swojego kontraktu](https://chain.link/solutions/defi)
- [generowanie weryfikowalnych liczb losowych (przydatne do gry)](https://chain.link/solutions/chainlink-vrf)
- [wywoływanie zewnętrznych interfejsów API](https://docs.chain.link/docs/request-and-receive-data) – jednym z nowatorskich zastosowań jest [sprawdzanie rezerw wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Oto przykład możliwości uzyskania ostatniej ceny ETH w inteligentnym kontrakcie za pomocą kanału cenowego Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Sieć: Kovan
     * Agregator: ETH/USD
     * Adress: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Zwraca ostatnią cenę
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

[Wyświetl dokumenty](https://docs.chain.link/docs/get-the-latest-price)

#### Usługi wyroczni {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Tworzenie kontraktu inteligentnego z wykorzystaniem wyroczni {#build-an-oracle-smart-contract}

Oto przykład kontraktu z wykorzystaniem wyroczni autorstwa Pedro Costa. W artykule znajdziesz kolejną adnotację: [Wprowadzanie wyroczni blockchainu w Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista żądań wprowadzonych do kontraktu
  uint currentId = 0; //rosnący id żądania
  uint minQuorum = 2; //minimalna liczba otrzymanych odpowiedzi przed zadeklarowaniem ostatecznego wyniku
  uint totalOracleCount = 3; // liczba wyroczni osadzonych w kodzie źródłowym
  // defines a general api request
  struct Request {
    uint id;                            // id żądania
    string urlToQuery;                  //url API
    string attributeToFetch;            //atrybut json (klucz) do pobrania w odpowiedzi
    string agreedValue;                 //wartość z klucza
    mapping(uint => string) anwers;     //odpowiedzi dostarczone przez wyrocznie
    mapping(address => uint) quorum;    //wyrocznie, które będą odpytywać odpowiedź (1=wyrocznia nie głosowała, 2=wyrocznia głosowała)
  }

  //zdarzenie wyzwalające wyrocznię poza blockchainem
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //wyzwalane, jeśli jest konsensus co do końcowego wyniku
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

    // osadzony adres wyroczni
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // uruchomienie zdarzenia do wykrycia poza blockchainem
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // zwiększanie id żądania
    currentId++;
  }

  //wywołane przez wyrocznię, aby zarejestrować jej odpowiedź
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //sprawdzenie, czy wyrocznia jest na liście zaufanych wyroczni
    //i czy wyrocznia jeszcze nie głosowała
    if(currRequest.quorum[address(msg.sender)] == 1){

      //oznaczenie, że ten adres głosował
      currRequest.quorum[msg.sender] = 2;

      //iteracyjne przejście przez "tablicę" odpowiedzi do czasu uzyskania wolnej pozycji i zapisanie pobranej wartości
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

      //iteracyjne przejście przez listę wyroczni i sprawdzenie, czy ich liczba jest wystarczająca(minimalne kworum)
      //głosowały na tę samą odpowiedź jak bieżąca
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

_Ucieszyłaby nas większa ilość dokumentacji dotyczącej tworzenia inteligentnych kontraktów z wykorzystaniem wyroczni. Jeśli możesz pomóc, utwórz PR!_

## Dalsza lektura {#further-reading}

- [Zdecentralizowane wyrocznie: kompleksowy przegląd](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Wdrażanie wyroczni blockchainu w Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Wyrocznie](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) – _EthHub_
