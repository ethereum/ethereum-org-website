---
title: Oracles
description: Les oracles servent à amener les données du monde réel dans votre application Ethereum, les contrats intelligents ne peuvant pas les interroger par eux-mêmes.
lang: fr
sidebar: true
incomplete: true
isOutdated: true
---

Les oracles sont des flux de données qui connectent Ethereum aux informations hors chaîne du monde réel pour vous permettre d’interroger les données dans vos contrats intelligents. Par exemple, les DApps de marchés prédictifs utilisent les oracles pour régler des paiements en fonction des événements. Un marché prédictif peut vous demander de miser vos ETH sur le prochain président des États-Unis. Ils utiliseront un oracle pour confirmer le résultat et rémunérer les gagnants.

## Prérequis {#prerequisites}

Assurez-vous d'avoir compris en quoi consistent les [nœuds](/developers/docs/nodes-and-clients/), les [mécanismes de consensus](/developers/docs/consensus-mechanisms/) et l' [anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/), et en particulier les événements.

## Qu'est ce qu'un oracle ? {#what-is-an-oracle}

Un oracle est un pont entre la blockchain et le monde réel. Ils agissent sur la blockchain comme des API que vous pouvez interroger pour obtenir des informations dans vos contrats intelligents. Il peut s'agir de n'importe quoi, d'informations de prix aux bulletins météorologiques.

## Pourquoi sont-ils nécessaires ? {#why-are-they-needed}

Avec une blockchain comme Ethereum, tous les nœuds du réseau sont nécessaires pour pouvoir rejouer chaque transaction et finir avec le même résultat garanti. Les API introduisent des données potentiellement variables. Si vous envoyez à quelqu'un un montant d'ETH basé sur une valeur convenue en $USD via une API de prix, la requête retournera un résultat différent d'un jour sur l'autre. Sans parler du fait que l'API pourrait être piratée ou dépréciée. Dans ce cas, les nœuds du réseau ne pourraient pas se mettre d'accord sur l'état actuel d'Ethereum, brisant ainsi le [consensus](/developers/docs/consensus-mechanisms/).

Les oracles résolvent ce problème en publiant les données sur la blockchain. Ainsi, tout nœud rejouant la transaction utilisera les mêmes données immuables qui ont été publiées pour que tout le monde puisse les voir. Pour faire cela, un oracle est comprend généralement un contrat intelligent et des composants hors chaîne qui peuvent interroger les API, puis envoyer périodiquement des transactions pour mettre à jour les données du contrat intelligent.

### Sécurité {#security}

Un oracle n'est aussi sûr que sa ou ses sources de données. Si une DApp utilise Uniswap comme oracle pour son flux de prix ETH/DAI, il est possible pour un attaquant de déplacer le prix sur Uniswap afin de manipuler la compréhension du prix actuel par la DApps. Une façon de combattre cela est l'utilisation d'un [un système de flux](https://developer.makerdao.com/feeds/) comme celui de MakerDAO, qui rassemble les données de prix à partir d'un certain nombre de flux de prix externes au lieu de dépendre d'une seule source.

## Utilisation {#usage}

### Oracles en tant que service {#oracles-as-a-service}

Les sites comme celui de Chainlink proposent des oracles sous forme de service. Ils ont des infrastructures qui vous permettent :

- [d'obtenir des flux de prix de cryptomonnaies dans votre contrat ;](https://chain.link/solutions/defi)
- [de générer des nombres aléatoires vérifiables (utile pour les jeux) ;](https://chain.link/solutions/chainlink-vrf)
- d'[appeler des API externes](https://docs.chain.link/docs/request-and-receive-data). Nouvelle utilisation possible : la [vérification des réserves WBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve).

Voici un exemple de la façon d'obtenir le dernier prix de l'ETH dans votre contrat intelligent en utilisant un flux de prix Chainlink :

```solidity
pragmatima solidité ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface. ol";

contrat PriceConsumerV3 {

    AggregatorV3Interface interne priceFeed ;

    /**
     * Réseau: Kovan
     * Aggregator: ETH/USD
     * Adresse: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() publique {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Renvoie le dernier prix
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int prix,
            uint startedAt,
            uint horodatage,
            uint80 answeredInRound
        ) = priceFeed. atestRoundData();
        prix de retour;
    }
}
```

[Voir la documentation](https://docs.chain.link/docs/get-the-latest-price)

#### Services d'oracle {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Créer un contrat intelligent oracle {#build-an-oracle-smart-contract}

Voici un exemple de contrat oracle créé par Pedro Costa. Vous pouvez trouver d'autres annotations dans son article " [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)".

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

Text
Xpath: /pre[2]/code
```

_Nous aimerions avoir plus de documentation sur la création d'un contrat intelligent oracle. Si vous pouvez nous aider, créez une PR !_

## Complément d'information {#further-reading}

- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) - _Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) - _Pedro Costa_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) - _EthHub_
