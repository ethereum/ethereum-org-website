---
title: Oracles
description: Les oracles servent à intégrer les données du monde réel dans votre application Ethereum, les contrats intelligents ne pouvant pas les interroger par eux-mêmes.
lang: fr
incomplete: true
---

Les oracles sont des flux de données qui connectent Ethereum aux informations hors chaîne du monde réel pour vous permettre d’interroger les données dans vos contrats intelligents. Par exemple, les DApps de marchés prédictifs utilisent les oracles pour régler des paiements en fonction des événements. Un marché prédictif peut vous demander de miser vos ETH sur le prochain président des États-Unis. Ils utiliseront un oracle pour confirmer le résultat et rémunérer les gagnants.

## Prérequis {#prerequisites}

Assurez-vous d'avoir compris en quoi consistent les [nœuds](/developers/docs/nodes-and-clients/), les [mécanismes de consensus](/developers/docs/consensus-mechanisms/) et l' [anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/), et en particulier les événements.

## Qu'est ce qu'un oracle ? {#what-is-an-oracle}

Un oracle est un pont entre la blockchain et le monde réel. Ils agissent sur la blockchain comme des API que vous pouvez interroger pour obtenir des informations dans vos contrats intelligents. Il peut s'agir de n'importe quoi, d'informations de prix aux bulletins météorologiques. Les oracles peuvent également être bidirectionnels, utilisés pour « envoyer » des données hors du monde réel.

Regardez Patrick expliquer les Oracles :

<YouTube id="ZJfkNzyO7-U" start="10" />

## Pourquoi sont-ils nécessaires ? {#why-are-they-needed}

Avec une blockchain comme Ethereum, tous les nœuds du réseau sont nécessaires pour pouvoir rejouer chaque transaction et finir avec le même résultat garanti. Les APIs introduisent des données potentiellement variables. Si vous envoyez un montant d'ETH basé sur une valeur convenue en $USD via une API de prix, la requête retournera un résultat différent d'un jour sur l'autre. Sans parler du fait que l'API pourrait être piratée ou dépréciée. Dans ce cas, les nœuds du réseau ne pourraient pas se mettre d'accord sur l'état actuel d'Ethereum, brisant ainsi le [consensus](/developers/docs/consensus-mechanisms/).

Les oracles résolvent ce problème en publiant les données sur la blockchain. Ainsi, tout nœud rejouant la transaction utilisera les mêmes données immuables qui ont été publiées pour que tout le monde puisse les voir. À cette fin, un oracle comprend généralement un contrat intelligent et des composants hors chaîne qui peuvent interroger les APIs, puis envoyer périodiquement des transactions pour mettre à jour les données du contrat intelligent.

### Le problème de l'oracle {#oracle-problem}

Comme nous l'avons mentionné, les transactions Ethereum ne peuvent accéder directement aux données hors chaîne. En même temps, compter sur une seule source de vérité pour fournir des données n'est pas sûr et invalide la décentralisation d'un contrat intelligent. Ceci est connu comme le problème de l'oracle.

Nous pouvons éviter le problème de l'oracle en utilisant un oracle décentralisé qui s'appuie sur de multiples sources de données. Si une source de données est piratée ou échoue, le contrat intelligent fonctionnera toujours comme prévu.

### Sécurité {#security}

Un oracle est aussi sûr que le sont ses sources de données. Si une dapp utilise Uniswap comme oracle pour son flux de prix ETH/DAI, il est possible pour un attaquant de déplacer le prix sur Uniswap afin de manipuler la compréhension du prix actuel par la dapp. Un exemple de façon de combattre cela est l'utilisation d'un [système de flux](https://developer.makerdao.com/feeds/) comme celui de MakerDAO qui rassemble les données de prix à partir d'un certain nombre de flux externes de prix au lieu de dépendre d'une seule source.

### Architecture {#architecture}

Voici un exemple d'architecture simple d'Oracle, mais il existe d'autres moyens pour déclencher un calcul hors chaîne.

1. Émettre un journal avec votre [événement de contrat intelligent](/developers/docs/smart-contracts/anatomy/#events-and-logs)
2. Un service hors chaîne s'abonne (généralement en utilisant quelque chose comme la commande JSON-RPC `eth_subscribe`) à ce journal.
3. Le service hors chaîne procède à certaines tâches telles que définies dans le journal.
4. Le service hors chaîne répond avec les données demandées dans une transaction secondaire au contrat intelligent.

Voici comment obtenir des données 1 à 1. Cependant, et afin d'améliorer la sécurité, vous pouvez souhaiter décentraliser la façon dont vous collectez vos données hors chaîne.

L'étape suivante pourrait être de disposer d'un réseau de ces nœuds faisant ces appels à différentes APIs et sources, et en agrégeant les données sur la chaîne.

[Chainlink Off-Chain Reporting](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) a amélioré cette méthodologie en faisant communiquer les noeuds du réseau d'oracles hors chaîne les uns avec les autres, en signant cryptographiquement leurs réponses, en agrégeant leurs réponses hors chaîne et en envoyant une seule transaction sur la blockchain avec le résultat. De cette façon, moins de carburant est dépensé, mais on conserve toujours la garantie de décentralisation des données puisque chaque nœud a signé sa partie de la transaction, la rendant non modifiable par le nœud envoyant la transaction. La politique d'escalade se déclenche si le nœud ne finalise pas la transaction et que le nœud suivant envoie la transaction.

## Utilisation {#usage}

En utilisant des services comme Chainlink, vous pouvez référencer des données décentralisées sur la chaîne qui ont déjà été tirées du monde réel et agrégées. Un peu comme des bien publics partagés, mais pour les données décentralisées. Vous pouvez également construire vos propres réseaux d'oracles modulaires pour obtenir tout type de données personnalisées dont vous avez besoin. En outre, vous pouvez faire du calcul hors chaîne et envoyer des informations dans le monde réel. Chainlink a l'infrastructure en place pour :

- [Obtenir des flux de prix de cryptomonnaies dans votre contrat](https://chain.link/solutions/defi)
- [Générer des nombres aléatoires vérifiables (utile pour les jeux)](https://chain.link/solutions/chainlink-vrf)
- [Appeler des API externes](https://docs.chain.link/docs/request-and-receive-data) - une nouvelle utilisation de ceci est [la vérification des réserves WBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Voici un exemple pour obtenir le dernier prix de l'ETH dans votre contrat intelligent en utilisant un flux de prix Chainlink :

### Flux de données de Chainlink {#chainlink-data-feeds}

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

[Vous pouvez tester cela dans Remix avec ce lien](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Voir la documentation](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink VRF {#chainlink-vrf}

Chainlink VRF (Verifiable Random Function) est une source d'aléas prouvable et vérifiable conçue pour les contrats intelligents. Les développeurs de contrats intelligents peuvent utiliser Chainlink VRF comme un générateur de numéros aléatoires (RNG) à l'épreuve de la falsification pour créer des contrats intelligents fiables pour toutes les applications qui se basent sur des résultats imprévisibles :

- Jeux Blockchain et NFTs
- Affectation aléatoire de tâches et de ressources (p. ex. assigner aléatoirement des juges à des cas)
- Choisir un échantillon représentatif pour les mécanismes de consensus

Les nombres aléatoires sont difficiles, car les blockchains sont déterministes.

Travailler avec Chainlink Oracles en dehors des flux de données suit le travail du [cycle de requête et de réception](https://docs.chain.link/docs/architecture-request-model) avec Chainlink. Ils utilisent le jeton LINK pour envoyer du carburant oracle à des fournisseurs oracle pour les réponses retournées. Le jeton LINK est spécifiquement conçu pour fonctionner avec des oracles et est basé sur le jeton ERC-677 mis à jour, qui est rétrocompatible avec [ERC-20](/developers/docs/standards/tokens/erc-20/). Le code suivant, s'il est déployé sur le réseau de test Kovan, récupérera un nombre aléatoire prouvé cryptographiquement. Pour réaliser la requête, financez le contrat avec un jeton de réseau de test LINK que vous pouvez obtenir du [robinet Kovan LINK](https://kovan.chain.link/).

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

### Les gardiens Chainlink {#chainlink-keepers}

Les contrats intelligents ne peuvent pas déclencher ou initier leurs propres fonctions à des moments arbitraires ou dans des conditions arbitraires. Les changements d'état ne se produiront que lorsqu'un autre compte lance une transaction (comme un utilisateur, un oracle ou un contrat). Le [réseau de gardien Chainlink](https://docs.chain.link/docs/chainlink-keepers/introduction/) fournit des options pour que les contrats intelligents pour externaliser des tâches régulières de maintenance de manière minimisée et décentralisée et en toute confiance.

Pour utiliser les gardiens Chainlink, un contrat intelligent doit implémenter [une KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/) qui se compose de deux fonctions :

- `checkUpkeep` - Vérifie si le contrat nécessite de réaliser un travail.
- `performUpkeep` - Effectue le travail sur le contrat, si initié par checkUpkeep.

L'exemple ci-dessous est un simple contrat de comptage. La variable `counter` est incrémentée d'un pour chaque appel à `performUpkeep`. Vous pouvez [vérifier le code suivant en utilisant Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

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
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }
}
```

Après avoir déployé un contrat compatible avec Keeper, vous devez enregistrer le contrat pour le [gardiennage](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) et le financer par LINK, pour informer le réseau de gardiens de votre contrat et afin que votre travail soit effectué en permanence.

### Projets Keepers {#keepers}

- [Les gardiens Chainlink](https://keepers.chain.link/)
- [Réseau Keep3r](https://docs.keep3r.network/)

### Appel API Chainlink {#chainlink-api-call}

Les [Appels API Chainlink](https://docs.chain.link/docs/make-a-http-get-request) sont le moyen le plus simple d'obtenir des données hors chaîne suivant la méthode qui fonctionne traditionnellement sur le web : les appels API. Exécuter une seule instance de ceci en ayant qu'un seul oracle la rend centralisée par nature. Pour le maintenir véritablement décentralisé, une plateforme de contrats intelligents devrait utiliser de nombreux nœuds trouvés sur le [marché externe de données](https://market.link/).

[Déployez le code suivant sur remix via le réseau kovan pour le tester](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Cela suit également le cycle requête et réception d'oracles et a besoin que le contrat soit financé avec Kovan LINK (le carburant oracle) pour fonctionner.

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

Vous pouvez en apprendre plus sur les applications de Chainlink en lisant le [blog des développeurs de Chainlink](https://blog.chain.link/tag/developers/).

## Services d'Oracle {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Créer un contrat intelligent oracle {#build-an-oracle-smart-contract}

Voici un exemple de contrat oracle créé par Pedro Costa. Vous pouvez trouver d'autres annotations dans son article : [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)".

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

## En lire plus {#further-reading}

**Articles**

- [Qu'est-ce qu'une Blockchain Oracle ?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) – _EthHub_
- [Qu'est-ce qu'une Blockchain Oracle ?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Oracles décentralisés : un aperçu complet](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implémentation d'une Blockchain Oracle sur Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Pourquoi les contrats intelligents ne peuvent pas générer des appels API ?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Pourquoi nous avons besoin d'oracles décentralisées](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [Ainsi, vous souhaitez utiliser un prix oracle](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Vidéos**

- [Oracles et l'expansion de l'utilité des Blockchains](https://youtu.be/BVUZpWa8vpw) - _Real Vision Finance_

**Didacticiels**

- [Comment récupérer le prix actuel d'Ethereum dans Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
