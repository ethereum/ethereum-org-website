---
title: Oracle
description: Les oracles permettent aux contrats intelligents d'Ethereum d'accéder à des données du monde réel, débloquant ainsi davantage de cas d'utilisation et une plus grande valeur pour les utilisateurs.
lang: fr
---

Les oracles sont des applications qui produisent des flux de données qui rendent les sources de données hors chaîne accessibles à la blockchain pour les contrats intelligents. Cela est nécessaire car les contrats intelligents sur Ethereum, par défaut ne peuvent pas accéder aux informations stockées en dehors du réseau de la blockchain.

Le fait de donner aux contrats intelligents la possibilité de s'exécuter en utilisant des données hors chaîne permet d'étendre l'utilité et la valeur des applications décentralisées. Par exemple, les marchés de prédiction en chaîne s'appuient sur des oracles pour fournir des informations sur les résultats qu'ils utilisent pour valider les prédictions des utilisateurs. Supposons qu'Alice parie 20 ETH sur qui deviendra le prochain président des États-Unis . Dans ce cas, la dApp du marché prédictif a besoin d'un oracle pour confirmer les résultats des élections et déterminer si Alice a droit à un paiement.

## Prérequis {#prerequisites}

Cette page suppose que le lecteur est familier avec les principes fondamentaux d'Ethereum, notamment les [nœuds](/developers/docs/nodes-and-clients/), les [mécanismes de consensus](/developers/docs/consensus-mechanisms/) et l'[EVM](/developers/docs/evm/). Vous devriez également avoir une bonne compréhension des [contrats intelligents](/developers/docs/smart-contracts/) et de l'[anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/), en particulier des [événements](/glossary/#events).

## Qu'est-ce qu'un oracle blockchain ? {#what-is-a-blockchain-oracle}

Les oracles sont des applications qui recherchent, vérifient et transmettent des informations externes (c'est-à-dire des informations stockées hors chaîne) à des contrats intelligents fonctionnant sur la blockchain. En plus « d'intégrer » des données hors chaîne et de les diffuser sur Ethereum, les oracles peuvent également faire « remonter » des informations de la blockchain vers des systèmes externes, comme par exemple déverrouiller un verrou intelligent une fois les frais envoyés par l'utilisateur par le biais d'une transaction Ethereum.

Sans oracle, un contrat intelligent serait entièrement limité aux données en chaîne.

Les oracles diffèrent en fonction de la source des données (une ou plusieurs sources), des modèles de confiance (centralisés ou décentralisés) et de l'architecture du système (lecture immédiate, publication-abonnement et demande-réponse). Nous pouvons également distinguer les oracles selon qu'ils récupèrent des données externes pour les contrats en chaîne (oracles d'entrée), qu'ils envoient des informations de la blockchain aux applications hors chaîne (oracles de sortie) ou qu'ils effectuent des tâches de calcul hors chaîne (oracles de calcul).

## Pourquoi les contrats intelligents ont-ils besoin d'oracles ? {#why-do-smart-contracts-need-oracles}

Beaucoup de développeurs considèrent les contrats intelligents comme du code exécutés sur des adresses spécifiques de la blockchain. Cependant, une vision plus générale des [contrats intelligents](/smart-contracts/) est qu'il s'agit de programmes logiciels auto-exécutoires capables de faire respecter les accords entre les parties une fois que des conditions spécifiques sont remplies - d'où le terme « contrats intelligents ».

Mais l'utilisation de contrats intelligents pour faire respecter des accords entre personnes n'est pas simple, étant donné qu'Ethereum est déterministe. Un [système déterministe](https://en.wikipedia.org/wiki/Deterministic_algorithm) est un système qui produit toujours les mêmes résultats à partir d'un état initial et d'une entrée particulière, ce qui signifie qu'il n'y a pas de caractère aléatoire ou de variation dans le processus de calcul des sorties à partir des entrées.

Pour parvenir à une exécution déterministe, les blockchains limitent les nœuds à l'atteinte d'un consensus sur des questions binaires simples (vrai/faux) en utilisant _uniquement_ les données stockées sur la blockchain elle-même. Voici quelques exemples de ces questions :

- « Le propriétaire du compte (identifié par une clé publique) a-t-il signé cette transaction avec la clé privée appariée ? »
- « Ce compte dispose-t-il de suffisamment de fonds pour couvrir la transaction ? »
- « Cette transaction est-elle valable dans le contexte de ce contrat intelligent ? », etc.

Si les blockchains recevaient des informations de sources externes (c'est-à-dire du monde réel), le déterminisme serait impossible à atteindre, ce qui empêcherait les nœuds de s'accorder sur la validité des modifications apportées à l'état de la blockchain. Prenons l'exemple d'un contrat intelligent qui exécute une transaction sur la base du taux de change actuel ETH-USD obtenu à partir d'une API de prix traditionnelle. Ce chiffre est susceptible de changer fréquemment (sans compter que l'API peut être dépréciée ou piratée), ce qui signifie que des nœuds exécutant le même code de contrat arriveraient à des résultats différents.

Pour une blockchain publique comme Ethereum, avec des milliers de nœuds dans le monde traitant des transactions, le déterminisme est essentiel. Sans autorité centrale servant de source de vérité, les nœuds ont besoin de mécanismes pour arriver au même état après avoir appliqué les mêmes transactions. Un cas où le nœud A exécute le code d'un contrat intelligent et obtient « 3 » comme résultat, alors que le nœud B obtient « 7 » après avoir exécuté la même transaction, provoquerait la rupture du consensus et éliminerait la valeur d'Ethereum en tant que plateforme informatique décentralisée.

Ce scénario met également en évidence le problème que pose la conception de blockchains pour tirer des informations de sources externes. Les oracles, cependant, résolvent ce problème en récupérant des informations à partir de sources hors chaîne et en les stockant sur la blockchain pour que les contrats intelligents puissent les exploiter. Les informations stockées sur la chaîne étant inaltérables et accessibles au public, les nœuds d'Ethereum peuvent utiliser en toute sécurité les données hors chaîne importées de l'oracle pour calculer les changements d'état sans rompre le consensus.

Pour ce faire, un oracle est généralement constitué d'un contrat intelligent fonctionnant sur la chaîne et de certains composants hors chaîne. Le contrat en chaîne reçoit des demandes de données d'autres contrats intelligents, qu'il transmet au composant hors chaîne (appelé nœud oracle). Ce nœud oracle peut interroger des sources de données - en utilisant des interfaces de programmation d'applications (API), par exemple - et envoyer des transactions pour stocker les données demandées dans le stockage du contrat intelligent.

Essentiellement, un oracle de blockchain comble le fossé informationnel entre la blockchain et l'environnement externe, créant ainsi des « contrats intelligents hybrides ». Un contrat intelligent hybride est un contrat qui fonctionne sur la base d'une combinaison de code de contrat en chaîne et d'infrastructure hors chaîne. Les marchés de prédiction décentralisés sont un excellent exemple de contrats intelligents hybrides. Parmi les autres exemples, on peut citer les contrats intelligents d'assurance récolte qui versent des indemnités lorsqu'un ensemble d'oracles détermine que certains phénomènes météorologiques ont eu lieu.

## Quel est le problème de l'oracle ? Le problème de l'oracle {#the-oracle-problem}

Les oracles résolvent un problème important, mais introduisent également certaines complications, par exemple :

- Comment vérifier que les informations injectées ont été extraites de la bonne source ou n'ont pas été altérées ?

- Comment s'assurer que ces données sont toujours disponibles et régulièrement mises à jour ?

Le « problème de l'oracle » illustre les problèmes liés à l'utilisation des oracles de la blockchain pour envoyer des données aux contrats intelligents. Les données provenant d'un oracle doivent être correctes pour qu'un contrat intelligent s'exécute correctement. De plus, le fait de devoir 'faire confiance' aux opérateurs d'oracle pour fournir des informations précises compromet l'aspect 'sans confiance' des contrats intelligents.

Différents oracles proposent différentes solutions au problème de l'oracle, que nous explorerons plus tard. Les oracles sont généralement évalués sur leur capacité à gérer les défis suivants :

1. **Exactitude** : Un oracle ne doit pas amener les contrats intelligents à déclencher des changements d'état basés sur des données hors chaîne invalides. Un oracle doit garantir l'_authenticité_ et l'_intégrité_ des données. L'authenticité signifie que les données ont été obtenues de la bonne source, tandis que l'intégrité signifie que les données sont restées intactes (c'est-à-dire qu'elles n'ont pas été modifiées) avant d'être envoyées en chaîne.

2. **Disponibilité** : Un oracle ne doit pas retarder ou empêcher les contrats intelligents d'exécuter des actions et de déclencher des changements d'état. Cela signifie que les données d'un oracle doivent être _disponibles sur demande_ sans interruption.

3. **Compatibilité des incitations** : Un oracle devrait inciter les fournisseurs de données hors chaîne à soumettre des informations correctes aux contrats intelligents. La compatibilité des incitations implique l'_imputabilité_ et la _responsabilité_. L'attribuabilité permet de lier un élément d'information externe à son fournisseur, tandis que la responsabilité lie les fournisseurs de données aux informations qu'ils fournissent, pour qu'ils puissent être récompensés ou pénalisés en fonction de la qualité des informations fournies.

## Comment fonctionne un service oracle blockchain ? {#how-does-a-blockchain-oracle-service-work}

### Utilisateurs {#users}

Les utilisateurs sont des entités (c'est-à-dire des contrats intelligents) qui ont besoin d'informations externes à la blockchain pour effectuer des actions spécifiques. Le flux de travail de base d'un service oracle commence par l'envoi par l'utilisateur d'une demande de données au contrat oracle. Les demandes de données répondent généralement à tout ou partie des questions suivantes :

1. Quelles sources les nœuds hors chaîne peuvent-ils consulter pour obtenir les informations demandées ?

2. Comment les journalistes traitent-ils les informations provenant des sources de données et extraient-ils les points de données utiles ?

3. Combien de nœuds d'oracle peuvent participer à la récupération des données ?

4. Comment gérer les divergences dans les rapports oracle ?

5. Quelle méthode doit être mise en œuvre pour filtrer les soumissions et agréger les rapports en une seule valeur ?

### Contrat oracle {#oracle-contract}

Le contrat d'oracle est le composant en chaîne du service de l'oracle. Il écoute les demandes de données provenant d'autres contrats, transmet les requêtes de données aux nœuds de l'oracle et diffuse les données renvoyées aux contrats clients. Ce contrat peut également effectuer des calculs sur les points de données renvoyés pour produire une valeur agrégée à envoyer au contrat demandeur.

Le contrat de l'oracle expose certaines fonctions que les contrats clients appellent lorsqu'ils font une demande de données. À la réception d'une nouvelle requête, le contrat intelligent émettra un [événement de journal](/developers/docs/smart-contracts/anatomy/#events-and-logs) avec les détails de la demande de données. Cela notifie les nœuds hors chaîne abonnés au journal (généralement en utilisant quelque chose comme la commande JSON-RPC `eth_subscribe`), qui procèdent à la récupération des données définies dans l'événement de journal.

Vous trouverez ci-dessous un [exemple de contrat oracle](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) par Pedro Costa. Il s'agit d'un simple service d'oracle capable d'interroger des API hors chaîne à la demande d'autres contrats intelligents et de stocker les informations demandées sur la blockchain :

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //liste des requêtes effectuées auprès du contrat
  uint currentId = 0; //id de requête croissant
  uint minQuorum = 2; //nombre minimum de réponses à recevoir avant de déclarer le résultat final
  uint totalOracleCount = 3; // Nombre d'oracles codé en dur

  // définit une requête API générale
  struct Request {
    uint id;                            //id de la requête
    string urlToQuery;                  //url de l'API
    string attributeToFetch;            //attribut json (clé) à récupérer dans la réponse
    string agreedValue;                 //valeur de la clé
    mapping(uint => string) answers;     //réponses fournies par les oracles
    mapping(address => uint) quorum;    //oracles qui interrogeront la réponse (1=l'oracle n'a pas voté, 2=l'oracle a voté)
  }

  //événement qui déclenche un oracle en dehors de la blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //déclenché lorsqu'il y a un consensus sur le résultat final
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

    // Adresse des oracles codée en dur
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lance un événement qui sera détecté par un oracle en dehors de la blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // augmente l'id de la requête
    currentId++;
  }

  //appelé par l'oracle pour enregistrer sa réponse
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //vérifie si l'oracle est dans la liste des oracles de confiance
    //et si l'oracle n'a pas encore voté
    if(currRequest.quorum[address(msg.sender)] == 1){

      //indique que cette adresse a voté
      currRequest.quorum[msg.sender] = 2;

      //itère sur le \"tableau\" de réponses jusqu'à ce qu'une position soit libre et enregistre la valeur récupérée
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //trouve le premier emplacement vide
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //itère sur la liste des oracles et vérifie si suffisamment d'oracles (quorum minimum)
      //ont voté pour la même réponse que la réponse actuelle
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

### Nœuds oracles {#oracle-nodes}

Le noeud d'oracle est le composant hors chaîne du service de l'oracle. Il extrait des informations de sources externes, telles que des API hébergées sur des serveurs tiers, et les met sur la chaîne pour être utilisé par des contrats intelligents. Les nœuds de l'oracle écoutent les événements provenant du contrat d'oracle sur la chaîne et procèdent à l'exécution de la tâche décrite dans le journal.

Une tâche courante pour les nœuds oracles est d'envoyer une requête [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) à un service d'API, d'analyser la réponse pour en extraire les données pertinentes, de la formater en une sortie lisible par la blockchain et de l'envoyer en chaîne en l'incluant dans une transaction vers le contrat oracle. Le nœud oracle peut également être tenu d'attester de la validité et de l'intégrité des informations soumises à l'aide de « preuves d'authenticité », que nous étudierons plus loin.

Les oracles informatiques s'appuient également sur des nœuds hors chaîne pour effectuer des calculs qu'il ne serait pas pratique d'exécuter sur la chaîne, compte tenu des coûts du gaz et des limites de taille des blocs. Par exemple, le nœud Oracle peut être chargé de générer un chiffre aléatoire vérifiable (par exemple, pour les jeux basés sur la blockchain).

## Modèles de conception d'oracles {#oracle-design-patterns}

Il existe différents types d'oracles, notamment _lecture-immédiate_, _publier-s'abonner_, et _demande-réponse_, ces deux derniers étant les plus populaires parmi les contrats intelligents Ethereum. Ici, nous décrivons brièvement les modèles de « publier-s'abonner » et de « requête-réponse ».

### Oracles publier-s'abonner {#publish-subscribe-oracles}

Ce type d'oracle expose un « flux de données » que d'autres contrats peuvent régulièrement lire pour obtenir des informations. Dans ce cas, les données sont censées changer fréquemment, de sorte que les contrats clients doivent écouter les mises à jour des données dans le stockage de l'oracle. Un exemple est un oracle qui fournit les dernières informations sur le prix ETH en USD aux utilisateurs.

### Oracles demande-réponse {#request-response-oracles}

Une configuration requête-réponse permet au contrat client de demander des données arbitraires autres que celles fournies par un oracle de type publier-s'abonner. Les oracles de type requête-réponse sont idéaux lorsque l'ensemble de données est trop volumineux pour être stocké dans un contrat intelligent, et/ou que les utilisateurs n'auront besoin que d'une petite partie des données à un moment donné.

Bien que plus complexes que les modèles publier-s'abonner, les oracles de requête-réponse sont fondamentalement ce que nous avons décrit dans la section précédente. L'oracle aura un composant en chaîne qui recevra une demande de données et la transmettra à un nœud hors chaîne pour traitement.

Les utilisateurs qui interrogent les données doivent couvrir le coût de la récupération des informations à partir de la source hors chaîne. Le contrat du client doit également fournir des fonds pour couvrir les frais de gaz encourus par le contrat de l'oracle pour renvoyer la réponse via la fonction de rappel spécifiée dans la demande.

## Oracles centralisés ou décentralisés {#types-of-oracles}

### Oracles centralisés {#centralized-oracles}

Un oracle centralisé est contrôlé par une seule entité chargée d'agréger les informations hors chaîne et de mettre à jour les données du contrat de l'oracle selon les demandes. Les oracles centralisés sont efficaces car ils reposent sur une seule source de vérité. Ils pourraient même mieux fonctionner pour les jeux de données propriétaires qui sont publiés directement par le propriétaire avec une signature largement acceptée. Cependant, ils présentent également des inconvénients :

#### Faibles garanties d'exactitude {#low-correctness-guarantees}

Avec les oracles centralisés, il n'y a aucun moyen de confirmer si l'information fournie est correcte ou non. Même les fournisseurs « honorables » peuvent devenir malhonnêtes ou être piratés. Si l'oracle est corrompu, les contrats intelligents seront exécutés sur la base de mauvaises données.

#### Faible disponibilité {#poor-availability}

Il n'est pas garanti que les oracles centralisés mettent systématiquement les données hors chaîne à la disposition des autres contrats intelligents. Si le fournisseur décide de désactiver le service ou si un pirate informatique détourne le composant hors chaîne de l'oracle, votre contrat intelligent risque de subir une attaque par déni de service (DoS).

#### Faible compatibilité des incitations {#poor-incentive-compatibility}

Les oracles centralisés ont souvent des incitations mal conçues ou inexistantes pour que le fournisseur de données envoie des informations exactes/altérées. Payer un oracle pour son exactitude ne garantit pas l'honnêteté. Ce problème s'aggrave à mesure que la valeur contrôlée par les contrats intelligents augmente.

### Oracles décentralisés {#decentralized-oracles}

Les oracles décentralisés sont conçus pour surmonter les limites des oracles centralisés en éliminant les points uniques de défaillance. Un service d'oracle décentralisé comprend plusieurs participants dans un réseau peer-to-peer qui forment un consensus sur les données hors chaîne avant de les envoyer à un contrat intelligent.

Un oracle décentralisé devrait (idéalement) être sans permission, sans confiance, et libre de toute administration par une partie centrale ; en réalité, la décentralisation parmi les oracles est un spectre. Il existe des réseaux d'oracles semi-décentralisés où tout le monde peut participer, mais avec un « propriétaire » qui approuve et supprime les nœuds en fonction des performances historiques. Il existe également des réseaux d'oracles entièrement décentralisés : ils fonctionnent généralement comme des blockchains autonomes et disposent de mécanismes de consensus définis pour coordonner les nœuds et sanctionner les mauvais comportements.

L'utilisation d'oracles décentralisés présente les avantages suivants :

### Garanties d'exactitude élevées {#high-correctness-guarantees}

Les oracles décentralisés tentent d'assurer l'exactitude des données en utilisant différentes approches. Il s'agit notamment d'utiliser des preuves attestant de l'authenticité et de l'intégrité des informations renvoyées et de demander à plusieurs entités de s'accorder collectivement sur la validité des données hors chaîne.

#### Preuves d'authenticité {#authenticity-proofs}

Les preuves d'authenticité sont des mécanismes cryptographiques qui permettent la vérification indépendante d'informations extraites de sources externes. Ces preuves permettent de valider la source de l'information et de détecter les éventuelles altérations des données après leur récupération.

Voici quelques exemples de preuves d'authenticité :

**Preuves de sécurité de la couche de transport (TLS)** : Les nœuds oracles récupèrent souvent des données de sources externes en utilisant une connexion HTTP sécurisée basée sur le protocole de sécurité de la couche de transport (TLS). Certains oracles décentralisés utilisent des preuves d'authenticité pour vérifier les sessions TLS (c'est-à-dire confirmer l'échange d'informations entre un nœud et un serveur spécifique) et confirmer que le contenu de la session n'a pas été modifié.

**Attestations d'environnement d'exécution de confiance (TEE)** : Un [environnement d'exécution de confiance](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) est un environnement de calcul en bac à sable qui est isolé des processus opérationnels de son système hôte. Les TEE garantissent que tout code d'application ou toute donnée stockée/utilisée dans l'environnement de calcul conserve son intégrité, sa confidentialité et son immuabilité. Les utilisateurs peuvent également générer une attestation pour prouver qu'une instance d'application est exécutée dans l'environnement d'exécution de confiance.

Certaines classes d'oracles décentralisés exigent que les opérateurs de nœuds d'oracle fournissent des attestations TEE. Cela confirme à un utilisateur que l'opérateur du nœud exécute une instance du client oracle dans un environnement d'exécution de confiance. Les TEE empêchent les processus externes de modifier ou de lire le code et les données d'une application. Par conséquent, ces attestations prouvent que le nœud oracle a conservé les informations intactes et confidentielles.

#### Validation des informations basée sur le consensus {#consensus-based-validation-of-information}

Les oracles centralisés reposent sur une source unique de vérité lorsqu'ils fournissent des données aux contrats intelligents, ce qui introduit la possibilité de publier des informations inexactes. Les oracles décentralisés résolvent ce problème en s'appuyant sur plusieurs nœuds d'oracle pour interroger les informations hors chaîne. En comparant les données provenant de plusieurs sources, les oracles décentralisés réduisent le risque de transmettre des informations invalides aux contrats sur la chaîne.

Les oracles décentralisés doivent néanmoins gérer les divergences dans les informations récupérées de plusieurs sources hors chaîne. Pour minimiser les différences d'information et garantir que les données transmises au contrat de l'oracle reflètent l'opinion collective des nœuds de l'oracle, les oracles décentralisés utilisent les mécanismes suivants :

##### Vote/suivi de l'exactitude des données

Certains réseaux d'oracles décentralisés demandent aux participants de voter ou de miser sur l'exactitude des réponses aux requêtes de données (par exemple, « Qui a gagné les élections américaines de 2020 ? ») en utilisant le jeton natif du réseau. Un protocole d'agrégation regroupe ensuite les votes et les enjeux et considère la réponse soutenue par la majorité comme la réponse valide.

Les nœuds dont les réponses s'écartent de la réponse majoritaire sont pénalisés en voyant leurs jetons distribués à d'autres qui fournissent des valeurs plus correctes. Le fait d'obliger les nœuds à fournir une caution avant de fournir des données incite à des réponses honnêtes puisqu'on suppose qu'ils sont des acteurs économiques rationnels qui cherchent à maximiser les retours.

La mise en jeu/le vote protège également les oracles décentralisés des [attaques Sybil](/glossary/#sybil-attack), où des acteurs malveillants créent des identités multiples pour déjouer le système de consensus. Cependant, le staking ne peut empêcher le « freeloading » (les nœuds d'oracle copiant les informations des autres) et la « validation paresseuse » (les nœuds d'oracle suivant la majorité sans vérifier eux-mêmes les informations).

##### Mécanismes du point de Schelling

Le [point de Schelling](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) est un concept de la théorie des jeux qui suppose que plusieurs entités trouveront toujours par défaut une solution commune à un problème en l'absence de toute communication. Les mécanismes du point de Schelling sont souvent utilisés dans les réseaux d'oracles décentralisés pour permettre aux nœuds d'atteindre un consensus sur les réponses aux demandes de données.

Une première idée était le [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), une proposition de flux de données où les participants soumettent des réponses à des questions « scalaires » (questions dont les réponses sont décrites par une magnitude, par exemple, « quel est le prix de l'ETH ? »), accompagnées d'un dépôt. Les utilisateurs qui fournissent des valeurs comprises entre le 25e et le 75e [percentile](https://en.wikipedia.org/wiki/Percentile) sont récompensés, tandis que ceux dont les valeurs s'écartent largement de la valeur médiane sont pénalisés.

Bien que SchellingCoin n'existe pas aujourd'hui, un certain nombre d'oracles décentralisés, notamment les [oracles du protocole Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module), utilisent le mécanisme du point de Schelling pour améliorer la précision des données de l'oracle. Chaque Maker Oracle est constitué d'un réseau P2P hors chaîne de nœuds (« relayeurs » et « alimenteurs ») qui soumettent des prix de marché pour les actifs donnés en garantie et d'un contrat « Medianizer » en chaîne qui calcule la médiane de toutes les valeurs fournies. Une fois le délai spécifié écoulé, cette valeur médiane devient le nouveau prix de référence de l'actif associé.

D'autres exemples d'oracles qui utilisent les mécanismes de point de Schelling incluent [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) et [Witnet](https://witnet.io/). Dans les deux systèmes, les réponses des nœuds oracle du réseau pair-à-pair sont agrégées en une seule valeur agrégée, telle qu'une moyenne ou une médiane. Les nœuds sont récompensés ou punis en fonction de la mesure dans laquelle leurs réponses s'alignent ou s'écartent de la valeur globale.

Les mécanismes du point de Schelling sont intéressants car ils minimisent l'empreinte sur la chaîne (une seule transaction doit être envoyée) tout en garantissant la décentralisation. Ce dernier cas est possible parce que les nœuds doivent approuver la liste des réponses soumises avant qu'elle ne soit introduite dans l'algorithme qui produit la valeur moyenne/médiane.

### Disponibilité {#availability}

Les services décentralisés d'oracle assurent une haute disponibilité des données hors chaîne pour les contrats intelligents. Cela est possible en décentralisant à la fois la source d'information hors chaîne et les nœuds responsables du transfert de l'information dans la chaîne.

Cela garantit la tolérance aux pannes puisque le contrat de l'oracle peut s'appuyer sur plusieurs nœuds (qui s'appuient également sur plusieurs sources de données) pour exécuter des requêtes provenant d'autres contrats. La décentralisation au niveau de la source _et_ de l'opérateur de nœud est cruciale. Un réseau de nœuds oracles servant des informations extraites de la même source se heurtera au même problème qu'un oracle centralisé.

Il est également possible pour les oracles basés sur la mise en jeu de sanctionner les opérateurs de nœuds qui ne répondent pas rapidement aux demandes de données. Cela incite fortement les nœuds d'oracle à investir dans une infrastructure tolérante aux pannes et à fournir des données en temps voulu.

### Bonne compatibilité des incitations {#good-incentive-compatibility}

Les oracles décentralisés mettent en œuvre diverses conceptions d'incitation pour empêcher le comportement [byzantin](https://en.wikipedia.org/wiki/Byzantine_fault) des nœuds oracles. Plus précisément, ils atteignent l'_imputabilité_ et la _responsabilité_ :

1. Les nœuds Oracle décentralisés sont souvent tenus de signer les données qu'ils fournissent en réponse aux demandes de données. Ces informations aident à évaluer les performances historiques des nœuds Oracle, de sorte que les utilisateurs puissent filtrer les nœuds Oracle non fiables lorsqu'ils font des demandes de données. Un exemple est le [système de réputation algorithmique](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) de Witnet.

2. Les oracles décentralisés - comme expliqué précédemment - peuvent exiger des nœuds qu'ils placent un enjeu sur leur confiance dans la véracité des données qu'ils soumettent. Si la demande est acceptée, cette mise peut être restituée avec des récompenses pour service honnête. Mais il peut également être réduit en cas d'information incorrecte, ce qui permet une certaine responsabilisation.

## Applications des oracles dans les contrats intelligents {#applications-of-oracles-in-smart-contracts}

Voici les cas d'utilisation courants des oracles dans Ethereum :

### Récupération des données financières {#retrieving-financial-data}

Les applications de [finance décentralisée](/defi/) (DeFi) permettent le prêt, l'emprunt et l'échange d'actifs de pair à pair. Cela nécessite souvent d'obtenir différentes informations sur la finance, notamment des données sur les taux de change (pour calculer la valeur en monnaie fiduciaire des crypto-monnaies ou comparer les prix des jetons) et des données sur les marchés de capitaux (pour calculer la valeur d'actifs tokenisés, comme l'or ou le dollar américain).

Un protocole de prêt DeFi, par exemple, a besoin d'interroger les prix actuels du marché pour les actifs (par exemple, ETH) déposés en garantie. Cela permet au contrat de déterminer la valeur des actifs donnés en garantie et de déterminer le montant qu'ils peuvent emprunter au système.

Les « oracles de prix » populaires (comme on les appelle souvent) dans la DeFi incluent les flux de prix Chainlink, l'[Open Price Feed](https://compound.finance/docs/prices) du protocole Compound, les [prix moyens pondérés dans le temps (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) d'Uniswap, et les [oracles Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Les développeurs devraient comprendre les réserves qui accompagnent ces oracles de prix avant de les intégrer à leur projet. Cet [article](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fournit une analyse détaillée de ce qu'il faut prendre en compte lors de la planification de l'utilisation de l'un des oracles de prix mentionnés.

Vous trouverez ci-dessous un exemple de la façon dont vous pouvez récupérer le dernier prix de l'ETH dans votre contrat intelligent en utilisant un flux de prix Chainlink :

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

### Générer un caractère aléatoire vérifiable {#generating-verifiable-randomness}

Certaines applications blockchain, telles que les jeux ou les systèmes de loterie basés sur la blockchain, nécessitent un niveau élevé d'imprévisibilité et de nature aléatoire pour fonctionner efficacement. Cependant, l'exécution déterministe des blockchains élimine l'aléa.

L'approche originale consistait à utiliser des fonctions cryptographiques pseudo-aléatoires, telles que `blockhash`, mais celles-ci pouvaient être [manipulées par les mineurs](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) résolvant l'algorithme de preuve de travail. De plus, le [passage d'Ethereum à la preuve d'enjeu](/roadmap/merge/) signifie que les développeurs ne peuvent plus compter sur `blockhash` pour le caractère aléatoire en chaîne. Le [mécanisme RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) de la chaîne phare offre une autre source de caractère aléatoire.

Il est possible de générer la valeur aléatoire hors chaîne et de l'envoyer sur la chaîne, mais cela impose des exigences de confiance élevées pour les utilisateurs. Ils doivent croire que la valeur a réellement été générée par des mécanismes imprévisibles et qu'elle n'a pas été altérée en cours de route.

Les oracles conçus pour le calcul hors chaîne résolvent ce problème en générant de manière sécurisée des résultats aléatoires hors chaîne qu'ils diffusent sur la chaîne avec des preuves cryptographiques attestant de l'imprévisibilité du processus. Un exemple est [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), qui est un générateur de nombres aléatoires (RNG) dont l'équité est prouvable et qui est inviolable, utile pour construire des contrats intelligents fiables pour des applications qui reposent sur des résultats imprévisibles.

### Obtenir des résultats pour les événements {#getting-outcomes-for-events}

Avec les oracles, il est facile de créer des contrats intelligents qui répondent à des événements du monde réel. Les services Oracle rendent cela possible en permettant aux contrats de se connecter à des API externes par le biais de composants hors chaîne et de consommer des informations provenant de ces sources de données. Par exemple, la dApp de prédiction mentionnée précédemment peut demander à un oracle de renvoyer les résultats des élections à partir d'une source hors chaîne fiable (par exemple, l'Associated Press).

En utilisant des oracles pour récupérer des données basées sur des résultats du monde réel, cela permet d'autres cas d'utilisation innovants ; par exemple, un produit d'assurance décentralisé a besoin d'informations précises sur la météo, les catastrophes, etc. pour fonctionner efficacement.

### Automatisation des contrats intelligents {#automating-smart-contracts}

Les contrats intelligents ne s'exécutent pas automatiquement : un compte externe (EOA), ou un autre compte de contrat, doit déclencher les bonnes fonctions pour exécuter le code du contrat. Dans la plupart des cas, l'essentiel des fonctions du contrat sont publiques et peuvent être invoquées par les EOA et d'autres contrats.

Mais il existe également des _fonctions privées_ au sein d'un contrat qui sont inaccessibles aux autres, mais qui sont essentielles à la fonctionnalité globale d'une dapp. Les exemples incluent une fonction `mintERC721Token()` qui frappe périodiquement de nouveaux NFT pour les utilisateurs, une fonction pour l'attribution des gains sur un marché prédictif ou une fonction pour débloquer des jetons mis en jeu dans un DEX.

Les développeurs devront déclencher ces fonctions à intervalles réguliers pour assurer le bon fonctionnement de l'application. Toutefois, cela pourrait entraîner une augmentation du nombre d'heures perdues sur des tâches banales pour les développeurs, d'où l'intérêt d'automatiser l'exécution des contrats intelligents.

Certains réseaux d'oracle décentralisés offrent des services d'automatisation, qui permettent aux nœuds d'oracle hors chaîne de déclencher des fonctions de contrat intelligent en fonction de paramètres définis par l'utilisateur. En général, il faut pour cela « enregistrer » le contrat cible auprès du service d'oracle, fournir des fonds pour payer l'opérateur d'oracle et spécifier les conditions ou les moments de déclenchement du contrat.

Le [Keeper Network](https://chain.link/keepers) de Chainlink offre aux contrats intelligents la possibilité d'externaliser les tâches de maintenance régulières d'une manière décentralisée et avec un minimum de confiance. Lisez la [documentation officielle de Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) pour savoir comment rendre votre contrat compatible avec Keeper et utiliser le service Upkeep.

## Comment utiliser les oracles blockchain {#use-blockchain-oracles}

Il existe de multiples applications oracle que vous pouvez intégrer dans votre dApp Ethereum :

**[Chainlink](https://chain.link/)** - _Les réseaux d'oracles décentralisés de Chainlink fournissent des entrées, des sorties et des calculs inviolables pour prendre en charge des contrats intelligents avancés sur n'importe quelle blockchain._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone est un oracle modulaire décentralisé qui fournit des flux de données optimisés pour le gaz._ Il est spécialisé dans la fourniture de flux de prix pour des actifs émergents, tels que les jetons de mise en jeu liquide (LST), les jetons de restaking liquide (LRT) et les dérivés de mise en jeu de Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle surmonte les limitations actuelles du transfert de données en chaîne en développant des oracles véritablement évolutifs, rentables, décentralisés et vérifiables._

**[Witnet](https://witnet.io/)** - _Witnet est un oracle sans permission, décentralisé et résistant à la censure, qui aide les contrats intelligents à réagir aux événements du monde réel avec de solides garanties crypto-économiques._

**[Oracle UMA](https://uma.xyz)** - _L'oracle optimiste d'UMA permet aux contrats intelligents de recevoir rapidement tout type de données pour différentes applications, notamment les assurances, les produits financiers dérivés et les marchés prédictifs._

**[Tellor](https://tellor.io/)** - _Tellor est un protocole oracle transparent et sans permission permettant à votre contrat intelligent d'obtenir facilement toutes les données dont il a besoin._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol est une plateforme d'oracle de données inter-chaînes qui agrège et connecte les données du monde réel et les API aux contrats intelligents._

**[Pyth Network](https://pyth.network/)** - _Le réseau Pyth est un réseau d'oracles financiers de premier ordre conçu pour publier des données du monde réel en continu et en chaîne dans un environnement inviolable, décentralisé et autonome._

**[API3 DAO](https://www.api3.org/)** - _L'API3 DAO fournit des solutions d'oracle de première partie qui offrent une plus grande transparence des sources, une sécurité et une évolutivité accrues dans une solution décentralisée pour les contrats intelligents_

**[Supra](https://supra.com/)** - Une boîte à outils verticalement intégrée de solutions inter-chaînes qui relient toutes les blockchains, publiques (L1 et L2) ou privées (entreprises), fournissant des flux de prix d'oracle décentralisés qui peuvent être utilisés pour des cas d'utilisation en chaîne et hors chaîne.

**[Gas Network](https://gas.network/)** - Une plateforme d'oracle distribuée fournissant des données en temps réel sur le prix du gaz à travers la blockchain. En apportant en chaîne les données des principaux fournisseurs de données sur le prix du gaz, Gas Network contribue à l'interopérabilité. Gas Network prend en charge les données de plus de 35 chaînes, y compris le réseau principal Ethereum et de nombreuses L2 de premier plan.

## En savoir plus {#further-reading}

**Articles**

- [Qu'est-ce qu'un oracle de blockchain ?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Qu'est-ce qu'un oracle de blockchain ?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracles décentralisés : une vue d'ensemble complète](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implémenter un oracle de blockchain sur Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Pourquoi les contrats intelligents ne peuvent-ils pas effectuer d'appels API ?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Alors vous voulez utiliser un oracle de prix](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Vidéos**

- [Les oracles et l'expansion de l'utilité de la blockchain](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriels**

- [Comment récupérer le prix actuel d'Ethereum en Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consommer les données d'un oracle](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Exemples de projets**

- [Projet de démarrage Chainlink complet pour Ethereum en Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
