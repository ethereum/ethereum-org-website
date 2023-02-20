---
title: Orákulumok
description: Az orákulumok segítségével külvilági adatokat vihetsz be az Ethereum alkalmazásodba, mivel az okosszerződések nem tudnak külvilági adatokat saját maguk lekérdezni.
lang: hu
incomplete: true
isOutdated: true
---

A orákulumok olyan adatcsatornák, amelyek összekapcsolják az Ethereumot az off-chain, valós információkkal, így le tudod kérdezni az adatokat az okosszerződéseidben. Például a hírpiac dappok orákulumokat használnak, hogy az események alapján elszámolják a kifizetéseket. Egy hírpiacon lehetőséged van ETH-ben fogadni, hogy például ki lesz az Egyesül Államok elnöke. Egy orákulumot fognak használni, hogy megerősítsék a kimenetelt és kifizessék a nyerteseket.

## Előfeltételek {#prerequisites}

Érdemes tisztában lenned a [csomópontok](/developers/docs/nodes-and-clients/), [konszenzus mechanizmusok](/developers/docs/consensus-mechanisms/), és a [okosszerződés anatómia](/developers/docs/smart-contracts/anatomy/) témakörökkel, különösen az eseményekkel.

## Mi az az orákulum {#what-is-an-oracle}

Az orákulum egy áthidalás a blokklánc és külvilág között. On-chain API-ként viselkednek, melyekről lekérdezhetsz információkat az okosszerződéseidbe. Ez lehet bármi az árfolyam információktól egészen az időjárási adatokig.

## Miért van rájuk szükség? {#why-are-they-needed}

Az Ethereumhoz hasonló blokkláncoknál fontos, hogy a hálózat összes csomópontja minden tranzakciót visszajátszhasson, és ugyanazzal az eredménnyel járjon, garantáltan. Az API-ok potenciálisan változó adatokat adnak. Ha valakinek egy ETH összeget küldenél egy előre leegyeztetett $USD árfolyam alapján egy árfolyam API segítségével, a lekérdezés más eredményt adna vissza különböző napokon. Nem is beszélve arról, hogy az API-t meg lehet hackelni vagy elavulttá válhat. Ha ez megtörténik, akkor a hálózat csomópontjai nem tudnának egyetérteni az Ethereum jelenlegi állapota felett, tehát lényegében szétbomlana a [konszenzus.](/developers/docs/consensus-mechanisms/).

Az orákulumok megoldják ezt a problémát úgy, hogy az adatot a blokkláncra juttatják. Tehát minden, a tranzakciót visszajátszó csomópont ugyanazokat a megváltoztathatatlan adatokat fogja használni, amelyeket mindenki láthat. Ehhez az orákulum általában egy okosszerződésből és néhány olyan off-chain komponensből áll, amelyek lekérdezhetik az API-okat, majd időszakonként tranzakciókat küldenek az okosszerződés adatainak frissítésére.

### Biztonság {#security}

Egy orákulum annyira biztonságos, mint az adatforrása(i). Ha egy dapp a Uniswap-et használja orákulumként az ETH/DAI árfolyam adathoz, egy támadónak lehetősége van az árfolyamot manipulálni a Uniswap-en, hogy módosítsa a dapp értelmezését a jelenlegi árfolyamról. Egy példa ennek megakadályozására [egy feed rendszer](https://developer.makerdao.com/feeds/), mint amit a MakerDAO is használ, amely számos külső árfolyam feed adatait gyűjti össze ahelyett, hogy csak egyetlen forrásra támaszkodna.

## Használat {#usage}

### Orákulum, mint szolgáltatás {#oracles-as-a-service}

A Chainlinkhez hasonló szolgáltatások orákulum mint szolgáltatás jellegű megoldásokat kínálnak. Megvan az infrastruktúrájuk, hogy olyan dolgokat csinálj, mint:

- [kripto árfolyamot bevitele az okosszerződésedbe](https://chain.link/solutions/defi)
- [hitelesíthetően véletlen szám generálása (hasznos a játékoknál)](https://chain.link/solutions/chainlink-vrf)
- [külső API-ok meghívása](https://docs.chain.link/docs/request-and-receive-data) – az egyik új használati minta ehhez a [wBTC tartalékok ellenőrzése](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Itt egy példa arról hogy, hogy lehet a legfrissebb ETH árfolyam adatot bevinni az okosszerződésedbe egy Chainlink árfolyam feed segítségével:

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

[Dokumentáció megtekintése](https://docs.chain.link/docs/get-the-latest-price)

#### Orákulum szolgáltatások {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Orákulum okosszerződés építése {#build-an-oracle-smart-contract}

Itt egy példa Pedro Costától egy orákulum szerződésre. További megjegyzéseket találhatsz ebben a cikkben: [Blokklánc orákulum implementálása Ethereumon](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lekérdezések listája a szerződésnek
  uint currentId = 0; //lekérdezési id növelése
  uint minQuorum = 2; //minimum válasz, amit meg kell kapni a végeredmény meghatározása előtt
  uint totalOracleCount = 3; //hardkódolt orákulum szám

  // általános orákulum lekérdezés definiálása
  struct Request {
    uint id;                            //lekérdezés id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribútum (kulcs) a válasz visszaadására
    string agreedValue;                 //érték a kulcsból
    mapping(uint => string) anwers;     //orákulumok válaszai
    mapping(address => uint) quorum;    //orákulumok, melyek lekérdezik a választ (1=még nem szavazott, 2=szavazott)
  }

  //esemény, mely beindítja az orákulumot a blokkláncon kívül
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //beindul, ha konszenzus van a végső eredményen
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

    // hardkódolt orákulum címek
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // egy esemény elindítása, melyet egy blokkláncon kívüli orákulum észlel
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // lekérdezési id növelése
    currentId++;
  }

  //az orákulum hívja meg, hogy feljegyezze a választ
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //ellenőrizzük, hogy az orákulum benne van-e a megbízhatók listájában
    //és hogy nem szavazott-e már
    if(currRequest.quorum[address(msg.sender)] == 1){

      //megjelöli, hogy ez a cím már szavazott
      currRequest.quorum[msg.sender] = 2;

      //iterálás a válaszok "tömbjében", ameddig nincs üres pozició és a visszaadott érték elmentése
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //első üres hely megtalálása
        if(bytes(currRequest.anwers[tmpI]).length == 0){
          found = true;
          currRequest.anwers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterálás az orákulum listában és ellenőrizni, hogy elég orákulum (minimum kvórum)
      //szavazott-e ugyanarra a válaszra, mint a jelenlegi
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

_Nagyon örülnénk még több orákulum okosszerződésekről szóló dokumentációnak. Ha tudsz segíteni, készíts egy PR-t!_

## További olvasnivaló {#further-reading}

- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) –_Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) –_Pedro Costa_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) –_EthHub_
