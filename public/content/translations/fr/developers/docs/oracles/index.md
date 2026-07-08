---
title: Oracles
description: "Les oracles fournissent aux contrats intelligents Ethereum un accès aux données du monde réel, débloquant ainsi davantage de cas d'utilisation et une plus grande valeur pour les utilisateurs."
lang: fr
authors: ["Patrick Collins"]
---

Les oracles sont des applications qui produisent des flux de données rendant les sources de données hors chaîne disponibles sur la chaîne de blocs pour les contrats intelligents. Cela est nécessaire car les contrats intelligents basés sur Ethereum ne peuvent pas, par défaut, accéder aux informations stockées en dehors du réseau de la chaîne de blocs.

Donner aux contrats intelligents la capacité de s'exécuter en utilisant des données hors chaîne étend l'utilité et la valeur des applications décentralisées. Par exemple, les marchés de prédiction onchain s'appuient sur des oracles pour fournir des informations sur les résultats qu'ils utilisent pour valider les prédictions des utilisateurs. Supposons qu'Alice parie 20 ETH sur la personne qui deviendra le prochain président des États-Unis. Dans ce cas, la dapp de marché de prédiction a besoin d'un oracle pour confirmer les résultats de l'élection et déterminer si Alice est éligible à un paiement.

## Prérequis {#prerequisites}

Cette page suppose que le lecteur est familier avec les fondamentaux d'[Ethereum](/), y compris les [nœuds](/developers/docs/nodes-and-clients/), les [mécanismes de consensus](/developers/docs/consensus-mechanisms/) et l'[EVM](/developers/docs/evm/). Vous devriez également avoir une bonne compréhension des [contrats intelligents](/developers/docs/smart-contracts/) et de l'[anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/), en particulier des [événements](/glossary/#events).

## Qu'est-ce qu'un oracle de blockchain ? {#what-is-a-blockchain-oracle}

Les oracles sont des applications qui recherchent, vérifient et transmettent des informations externes (c'est-à-dire des informations stockées hors chaîne) aux contrats intelligents s'exécutant sur la chaîne de blocs. En plus de « tirer » des données hors chaîne et de les diffuser sur Ethereum, les oracles peuvent également « pousser » des informations de la chaîne de blocs vers des systèmes externes, par exemple, déverrouiller une serrure intelligente une fois que l'utilisateur a envoyé des frais via une transaction Ethereum.

Sans oracle, un contrat intelligent serait entièrement limité aux données onchain.

Les oracles diffèrent selon la source de données (une ou plusieurs sources), les modèles de confiance (centralisés ou décentralisés) et l'architecture du système (lecture immédiate, publication-abonnement et requête-réponse). Nous pouvons également distinguer les oracles selon qu'ils récupèrent des données externes pour une utilisation par des contrats onchain (oracles d'entrée), envoient des informations de la chaîne de blocs vers les applications hors chaîne (oracles de sortie), ou effectuent des tâches de calcul hors chaîne (oracles de calcul).

## Pourquoi les contrats intelligents ont-ils besoin d'oracles ? {#why-do-smart-contracts-need-oracles}

De nombreux développeurs considèrent les contrats intelligents comme du code s'exécutant à des adresses spécifiques sur la chaîne de blocs. Cependant, une [vision plus générale des contrats intelligents](/smart-contracts/) est qu'ils sont des programmes logiciels auto-exécutables capables de faire respecter des accords entre les parties une fois que des conditions spécifiques sont remplies - d'où le terme « contrats intelligents ».

Mais utiliser des contrats intelligents pour faire respecter des accords entre des personnes n'est pas simple, étant donné qu'Ethereum est déterministe. Un [système déterministe](https://en.wikipedia.org/wiki/Deterministic_algorithm) est un système qui produit toujours les mêmes résultats compte tenu d'un état initial et d'une entrée particulière, ce qui signifie qu'il n'y a pas de caractère aléatoire ou de variation dans le processus de calcul des sorties à partir des entrées.

Pour parvenir à une exécution déterministe, les chaînes de blocs limitent les nœuds à atteindre un consensus sur des questions binaires simples (vrai/faux) en utilisant _uniquement_ les données stockées sur la chaîne de blocs elle-même. Des exemples de telles questions incluent :

- « Le propriétaire du compte (identifié par une clé publique) a-t-il signé cette transaction avec la clé privée associée ? »
- « Ce compte a-t-il suffisamment de fonds pour couvrir la transaction ? »
- « Cette transaction est-elle valide dans le contexte de ce contrat intelligent ? », etc.

Si les chaînes de blocs recevaient des informations de sources externes (c'est-à-dire du monde réel), le déterminisme serait impossible à atteindre, empêchant les nœuds de s'entendre sur la validité des modifications de l'état de la chaîne de blocs. Prenez par exemple un contrat intelligent qui exécute une transaction basée sur le taux de change actuel ETH-USD obtenu à partir d'une API de prix traditionnelle. Ce chiffre est susceptible de changer fréquemment (sans compter que l'API pourrait devenir obsolète ou être piratée), ce qui signifie que les nœuds exécutant le même code de contrat arriveraient à des résultats différents.

Pour une chaîne de blocs publique comme Ethereum, avec des milliers de nœuds à travers le monde traitant des transactions, le déterminisme est critique. Sans autorité centrale servant de source de vérité, les nœuds ont besoin de mécanismes pour arriver au même état après avoir appliqué les mêmes transactions. Un cas où le nœud A exécute le code d'un contrat intelligent et obtient « 3 » comme résultat, tandis que le nœud B obtient « 7 » après avoir exécuté la même transaction, provoquerait une rupture du consensus et éliminerait la valeur d'Ethereum en tant que plateforme informatique décentralisée.

Ce scénario met également en évidence le problème de la conception de chaînes de blocs pour extraire des informations de sources externes. Les oracles, cependant, résolvent ce problème en prenant des informations de sources hors chaîne et en les stockant sur la chaîne de blocs pour que les contrats intelligents les consomment. Puisque les informations stockées onchain sont inaltérables et publiquement disponibles, les nœuds Ethereum peuvent utiliser en toute sécurité les données hors chaîne importées par l'oracle pour calculer les changements d'état sans rompre le consensus.

Pour ce faire, un oracle est généralement composé d'un contrat intelligent s'exécutant onchain et de certains composants hors chaîne. Le contrat onchain reçoit des demandes de données d'autres contrats intelligents, qu'il transmet au composant hors chaîne (appelé nœud d'oracle). Ce nœud d'oracle peut interroger des sources de données — en utilisant des interfaces de programmation d'applications (API), par exemple — et envoyer des transactions pour stocker les données demandées dans le stockage du contrat intelligent.

Essentiellement, un oracle de blockchain comble le fossé d'information entre la chaîne de blocs et l'environnement externe, créant des « contrats intelligents hybrides ». Un contrat intelligent hybride est un contrat qui fonctionne sur la base d'une combinaison de code de contrat onchain et d'infrastructure hors chaîne. Les marchés de prédiction décentralisés sont un excellent exemple de contrats intelligents hybrides. D'autres exemples pourraient inclure des contrats intelligents d'assurance-récolte qui paient lorsqu'un ensemble d'oracles détermine que certains phénomènes météorologiques ont eu lieu.

## Qu'est-ce que le problème de l'oracle ? {#the-oracle-problem}

Les oracles résolvent un problème important, mais introduisent également certaines complications, par exemple :

- Comment vérifions-nous que les informations injectées ont été extraites de la bonne source ou n'ont pas été altérées ?

- Comment nous assurons-nous que ces données sont toujours disponibles et mises à jour régulièrement ?

Le soi-disant « problème de l'oracle » démontre les problèmes qui accompagnent l'utilisation d'oracles de blockchain pour envoyer des entrées aux contrats intelligents. Les données d'un oracle doivent être correctes pour qu'un contrat intelligent s'exécute correctement. De plus, devoir « faire confiance » aux opérateurs d'oracles pour fournir des informations précises sape l'aspect sans tiers de confiance des contrats intelligents.

Différents oracles offrent différentes solutions au problème de l'oracle, que nous explorerons plus tard. Les oracles sont généralement évalués sur leur capacité à relever les défis suivants :

1. **Exactitude** : Un oracle ne devrait pas amener les contrats intelligents à déclencher des changements d'état basés sur des données hors chaîne invalides. Un oracle doit garantir l'_authenticité_ et l'_intégrité_ des données. L'authenticité signifie que les données ont été obtenues de la bonne source, tandis que l'intégrité signifie que les données sont restées intactes (c'est-à-dire qu'elles n'ont pas été altérées) avant d'être envoyées onchain.

2. **Disponibilité** : Un oracle ne devrait pas retarder ou empêcher les contrats intelligents d'exécuter des actions et de déclencher des changements d'état. Cela signifie que les données d'un oracle doivent être _disponibles sur demande_ sans interruption.

3. **Compatibilité des incitations** : Un oracle devrait inciter les fournisseurs de données hors chaîne à soumettre des informations correctes aux contrats intelligents. La compatibilité des incitations implique l'_attribuabilité_ et la _responsabilité_. L'attribuabilité permet de lier une information externe à son fournisseur, tandis que la responsabilité lie les fournisseurs de données aux informations qu'ils donnent, afin qu'ils puissent être récompensés ou pénalisés en fonction de la qualité des informations fournies.

## Comment fonctionne un service d'oracle de blockchain ? {#how-does-a-blockchain-oracle-service-work}

### Utilisateurs {#users}

Les utilisateurs sont des entités (c'est-à-dire des contrats intelligents) qui ont besoin d'informations externes à la chaîne de blocs pour accomplir des actions spécifiques. Le flux de travail de base d'un service d'oracle commence par l'envoi par l'utilisateur d'une demande de données au contrat d'oracle. Les demandes de données répondront généralement à tout ou partie des questions suivantes :

1. Quelles sources les nœuds hors chaîne peuvent-ils consulter pour obtenir les informations demandées ?

2. Comment les rapporteurs traitent-ils les informations provenant des sources de données et extraient-ils des points de données utiles ?

3. Combien de nœuds d'oracle peuvent participer à la récupération des données ?

4. Comment les divergences dans les rapports d'oracle doivent-elles être gérées ?

5. Quelle méthode doit être mise en œuvre pour filtrer les soumissions et agréger les rapports en une seule valeur ?

### Contrat d'oracle {#oracle-contract}

Le contrat d'oracle est le composant onchain du service d'oracle. Il écoute les demandes de données d'autres contrats, relaie les requêtes de données aux nœuds d'oracle et diffuse les données retournées aux contrats clients. Ce contrat peut également effectuer des calculs sur les points de données retournés pour produire une valeur agrégée à envoyer au contrat demandeur.

Le contrat d'oracle expose certaines fonctions que les contrats clients appellent lorsqu'ils font une demande de données. Lors de la réception d'une nouvelle requête, le contrat intelligent émettra un [événement de journal](/developers/docs/smart-contracts/anatomy/#events-and-logs) avec les détails de la demande de données. Cela notifie les nœuds hors chaîne abonnés au journal (généralement en utilisant quelque chose comme la commande JSON-RPC `eth_subscribe`), qui procèdent à la récupération des données définies dans l'événement de journal.

Ci-dessous se trouve un [exemple de contrat d'oracle](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) par Pedro Costa. Il s'agit d'un service d'oracle simple qui peut interroger des API hors chaîne à la demande d'autres contrats intelligents et stocker les informations demandées sur la chaîne de blocs :

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //liste des requêtes faites au contrat
  uint currentId = 0; //identifiant de requête croissant
  uint minQuorum = 2; //nombre minimum de réponses à recevoir avant de déclarer le résultat final
  uint totalOracleCount = 3; // nombre d'oracles codé en dur

  // définit une requête API générale
  struct Request {
    uint id;                            //identifiant de requête
    string urlToQuery;                  //url de l'API
    string attributeToFetch;            //attribut json (clé) à récupérer dans la réponse
    string agreedValue;                 //valeur de la clé
    mapping(uint => string) answers;     //réponses fournies par les oracles
    mapping(address => uint) quorum;    //oracles qui vont interroger la réponse (1=l'oracle n'a pas voté, 2=l'oracle a voté)
  }

  //événement qui déclenche l'oracle en dehors de la chaîne de blocs
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

    // adresse des oracles codée en dur
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lancer un événement pour être détecté par l'oracle en dehors de la chaîne de blocs
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // incrémenter l'identifiant de requête
    currentId++;
  }

  //appelé par l'oracle pour enregistrer sa réponse
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //vérifier si l'oracle est dans la liste des oracles de confiance
    //et si l'oracle n'a pas encore voté
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marquer que cette adresse a voté
      currRequest.quorum[msg.sender] = 2;

      //parcourir le "tableau" de réponses jusqu'à ce qu'une position soit libre et sauvegarder la valeur récupérée
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //trouver le premier emplacement vide
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //parcourir la liste des oracles et vérifier si suffisamment d'oracles (quorum minimum)
      //ont voté la même réponse que l'actuelle
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

### Nœuds d'oracle {#oracle-nodes}

Le nœud d'oracle est le composant hors chaîne du service d'oracle. Il extrait des informations de sources externes, telles que des API hébergées sur des serveurs tiers, et les place onchain pour qu'elles soient consommées par des contrats intelligents. Les nœuds d'oracle écoutent les événements du contrat d'oracle onchain et procèdent à l'accomplissement de la tâche décrite dans le journal.

Une tâche courante pour les nœuds d'oracle consiste à envoyer une requête [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) à un service API, à analyser la réponse pour extraire les données pertinentes, à les formater en une sortie lisible par la chaîne de blocs, et à les envoyer onchain en les incluant dans une transaction vers le contrat d'oracle. Le nœud d'oracle peut également être tenu d'attester de la validité et de l'intégrité des informations soumises à l'aide de « preuves d'authenticité », que nous explorerons plus tard.

Les oracles de calcul s'appuient également sur des nœuds hors chaîne pour effectuer des tâches de calcul qui seraient peu pratiques à exécuter onchain, compte tenu des coûts en gaz et des limites de taille de bloc. Par exemple, le nœud d'oracle peut être chargé de générer un chiffre vérifiable de manière aléatoire (par exemple, pour les jeux basés sur la chaîne de blocs).

## Modèles de conception d'oracles {#oracle-design-patterns}

Les oracles se présentent sous différents types, notamment la _lecture immédiate_, la _publication-abonnement_ et la _requête-réponse_, ces deux derniers étant les plus populaires parmi les contrats intelligents Ethereum. Nous décrivons ici brièvement les modèles de publication-abonnement et de requête-réponse.

### Oracles de publication-abonnement {#publish-subscribe-oracles}

Ce type d'oracle expose un « flux de données » que d'autres contrats peuvent lire régulièrement pour obtenir des informations. Dans ce cas, les données sont censées changer fréquemment, de sorte que les contrats clients doivent écouter les mises à jour des données dans le stockage de l'oracle. Un exemple est un oracle qui fournit aux utilisateurs les dernières informations sur le prix ETH-USD.

### Oracles de requête-réponse {#request-response-oracles}

Une configuration de requête-réponse permet au contrat client de demander des données arbitraires autres que celles fournies par un oracle de publication-abonnement. Les oracles de requête-réponse sont idéaux lorsque l'ensemble de données est trop volumineux pour être stocké dans le stockage d'un contrat intelligent, et/ou que les utilisateurs n'auront besoin que d'une petite partie des données à un moment donné.

Bien que plus complexes que les modèles de publication-abonnement, les oracles de requête-réponse correspondent essentiellement à ce que nous avons décrit dans la section précédente. L'oracle aura un composant onchain qui reçoit une demande de données et la transmet à un nœud hors chaîne pour traitement.

Les utilisateurs initiant des requêtes de données doivent couvrir le coût de récupération des informations à partir de la source hors chaîne. Le contrat client doit également fournir des fonds pour couvrir les coûts en gaz encourus par le contrat d'oracle lors du renvoi de la réponse via la fonction de rappel spécifiée dans la demande.

## Oracles centralisés vs décentralisés {#types-of-oracles}

### Oracles centralisés {#centralized-oracles}

Un oracle centralisé est contrôlé par une seule entité responsable de l'agrégation des informations hors chaîne et de la mise à jour des données du contrat d'oracle comme demandé. Les oracles centralisés sont efficaces car ils s'appuient sur une seule source de vérité. Ils peuvent mieux fonctionner dans les cas où des ensembles de données propriétaires sont publiés directement par le propriétaire avec une signature largement acceptée. Cependant, ils présentent également des inconvénients :

#### Faibles garanties d'exactitude {#low-correctness-guarantees}

Avec les oracles centralisés, il n'y a aucun moyen de confirmer si les informations fournies sont correctes ou non. Même les fournisseurs « réputés » peuvent devenir malveillants ou être piratés. Si l'oracle devient corrompu, les contrats intelligents s'exécuteront sur la base de mauvaises données.

#### Faible disponibilité {#poor-availability}

Les oracles centralisés ne sont pas garantis de toujours rendre les données hors chaîne disponibles pour d'autres contrats intelligents. Si le fournisseur décide de désactiver le service ou si un pirate informatique détourne le composant hors chaîne de l'oracle, votre contrat intelligent risque de subir une attaque par déni de service (DoS).

#### Faible compatibilité des incitations {#poor-incentive-compatibility}

Les oracles centralisés ont souvent des incitations mal conçues ou inexistantes pour que le fournisseur de données envoie des informations précises/non altérées. Payer un oracle pour son exactitude ne garantit pas son honnêteté. Ce problème s'aggrave à mesure que la quantité de valeur contrôlée par les contrats intelligents augmente.

### Oracles décentralisés {#decentralized-oracles}

Les oracles décentralisés sont conçus pour surmonter les limites des oracles centralisés en éliminant les points de défaillance uniques. Un service d'oracle décentralisé comprend plusieurs participants dans un réseau pair à pair qui forment un consensus sur les données hors chaîne avant de les envoyer à un contrat intelligent.

Un oracle décentralisé devrait (idéalement) être sans permission, sans tiers de confiance et libre de toute administration par une partie centrale ; en réalité, la décentralisation parmi les oracles se situe sur un spectre. Il existe des réseaux d'oracles semi-décentralisés où n'importe qui peut participer, mais avec un « propriétaire » qui approuve et supprime des nœuds en fonction de leurs performances historiques. Des réseaux d'oracles entièrement décentralisés existent également : ceux-ci fonctionnent généralement comme des chaînes de blocs autonomes et ont défini des mécanismes de consensus pour coordonner les nœuds et punir les mauvais comportements.

L'utilisation d'oracles décentralisés présente les avantages suivants :

### Hautes garanties d'exactitude {#high-correctness-guarantees}

Les oracles décentralisés tentent d'atteindre l'exactitude des données en utilisant différentes approches. Cela inclut l'utilisation de preuves attestant de l'authenticité et de l'intégrité des informations retournées et l'exigence que plusieurs entités s'accordent collectivement sur la validité des données hors chaîne.

#### Preuves d'authenticité {#authenticity-proofs}

Les preuves d'authenticité sont des mécanismes cryptographiques qui permettent une vérification indépendante des informations récupérées à partir de sources externes. Ces preuves peuvent valider la source des informations et détecter d'éventuelles altérations des données après leur récupération.

Des exemples de preuves d'authenticité incluent :

**Preuves Transport Layer Security (TLS)** : Les nœuds d'oracle récupèrent souvent des données de sources externes en utilisant une connexion HTTP sécurisée basée sur le protocole Transport Layer Security (TLS). Certains oracles décentralisés utilisent des preuves d'authenticité pour vérifier les sessions TLS (c'est-à-dire confirmer l'échange d'informations entre un nœud et un serveur spécifique) et confirmer que le contenu de la session n'a pas été altéré.

**Attestations d'environnement d'exécution de confiance (TEE)** : Un [environnement d'exécution de confiance](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) est un environnement de calcul en bac à sable qui est isolé des processus opérationnels de son système hôte. Les TEE garantissent que tout code d'application ou toute donnée stockée/utilisée dans l'environnement de calcul conserve son intégrité, sa confidentialité et son immuabilité. Les utilisateurs peuvent également générer une attestation pour prouver qu'une instance d'application s'exécute dans l'environnement d'exécution de confiance.

Certaines classes d'oracles décentralisés exigent que les opérateurs de nœuds d'oracle fournissent des attestations TEE. Cela confirme à un utilisateur que l'opérateur du nœud exécute une instance de client d'oracle dans un environnement d'exécution de confiance. Les TEE empêchent les processus externes d'altérer ou de lire le code et les données d'une application, par conséquent, ces attestations prouvent que le nœud d'oracle a gardé les informations intactes et confidentielles.

#### Validation des informations basée sur le consensus {#consensus-based-validation-of-information}

Les oracles centralisés s'appuient sur une seule source de vérité lorsqu'ils fournissent des données aux contrats intelligents, ce qui introduit la possibilité de publier des informations inexactes. Les oracles décentralisés résolvent ce problème en s'appuyant sur plusieurs nœuds d'oracle pour interroger les informations hors chaîne. En comparant les données de plusieurs sources, les oracles décentralisés réduisent le risque de transmettre des informations invalides aux contrats onchain.

Les oracles décentralisés doivent cependant faire face aux divergences dans les informations récupérées à partir de multiples sources hors chaîne. Pour minimiser les différences d'informations et s'assurer que les données transmises au contrat d'oracle reflètent l'opinion collective des nœuds d'oracle, les oracles décentralisés utilisent les mécanismes suivants :

##### Vote/staking sur l'exactitude des données

Certains réseaux d'oracles décentralisés exigent que les participants votent ou fassent du staking sur l'exactitude des réponses aux requêtes de données (par exemple, « Qui a remporté l'élection américaine de 2020 ? ») en utilisant le jeton natif du réseau. Un protocole d'agrégation agrège ensuite les votes et les mises et prend la réponse soutenue par la majorité comme étant la réponse valide.

Les nœuds dont les réponses s'écartent de la réponse majoritaire sont pénalisés en voyant leurs jetons distribués à d'autres qui fournissent des valeurs plus correctes. Forcer les nœuds à fournir une caution avant de fournir des données incite à des réponses honnêtes puisqu'ils sont supposés être des acteurs économiques rationnels soucieux de maximiser leurs rendements.

Le staking/vote protège également les oracles décentralisés des [attaques Sybil](/glossary/#sybil-attack) où des acteurs malveillants créent de multiples identités pour tromper le système de consensus. Cependant, le staking ne peut pas empêcher le « parasitisme » (les nœuds d'oracle copiant les informations des autres) et la « validation paresseuse » (les nœuds d'oracle suivant la majorité sans vérifier les informations eux-mêmes).

##### Mécanismes de point de Schelling

Le [point de Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) est un concept de la théorie des jeux qui suppose que de multiples entités se rabattront toujours sur une solution commune à un problème en l'absence de toute communication. Les mécanismes de point de Schelling sont souvent utilisés dans les réseaux d'oracles décentralisés pour permettre aux nœuds de parvenir à un consensus sur les réponses aux demandes de données.

Une première idée pour cela était [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), un flux de données proposé où les participants soumettent des réponses à des questions « scalaires » (questions dont les réponses sont décrites par une grandeur, par exemple, « quel est le prix de l'ETH ? »), accompagnées d'un dépôt. Les utilisateurs qui fournissent des valeurs comprises entre le 25e et le 75e [centile](https://en.wikipedia.org/wiki/Percentile) sont récompensés, tandis que ceux dont les valeurs s'écartent largement de la valeur médiane sont pénalisés.

Bien que SchellingCoin n'existe pas aujourd'hui, un certain nombre d'oracles décentralisés — notamment les [oracles du protocole Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) — utilisent le mécanisme du point de Schelling pour améliorer l'exactitude des données d'oracle. Chaque oracle Maker se compose d'un réseau P2P hors chaîne de nœuds (« relayeurs » et « flux ») qui soumettent les prix du marché pour les actifs collatéraux et d'un contrat onchain « Medianizer » qui calcule la médiane de toutes les valeurs fournies. Une fois la période de délai spécifiée écoulée, cette valeur médiane devient le nouveau prix de référence pour l'actif associé.

D'autres exemples d'oracles qui utilisent des mécanismes de point de Schelling incluent [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) et [Witnet](https://witnet.io/). Dans les deux systèmes, les réponses des nœuds d'oracle dans le réseau pair à pair sont agrégées en une seule valeur globale, telle qu'une moyenne ou une médiane. Les nœuds sont récompensés ou punis selon la mesure dans laquelle leurs réponses s'alignent sur la valeur agrégée ou s'en écartent.

Les mécanismes de point de Schelling sont attrayants car ils minimisent l'empreinte onchain (une seule transaction doit être envoyée) tout en garantissant la décentralisation. Cette dernière est possible car les nœuds doivent approuver la liste des réponses soumises avant qu'elle ne soit introduite dans l'algorithme qui produit la valeur moyenne/médiane.

### Disponibilité {#availability}

Les services d'oracles décentralisés assurent une haute disponibilité des données hors chaîne pour les contrats intelligents. Ceci est réalisé en décentralisant à la fois la source des informations hors chaîne et les nœuds responsables du transfert des informations onchain.

Cela garantit la tolérance aux pannes puisque le contrat d'oracle peut s'appuyer sur plusieurs nœuds (qui s'appuient également sur plusieurs sources de données) pour exécuter les requêtes d'autres contrats. La décentralisation au niveau de la source _et_ de l'opérateur de nœud est cruciale — un réseau de nœuds d'oracle servant des informations récupérées à partir de la même source rencontrera le même problème qu'un oracle centralisé.

Il est également possible pour les oracles basés sur le staking d'appliquer une réduction aux opérateurs de nœuds qui ne répondent pas rapidement aux demandes de données. Cela incite considérablement les nœuds d'oracle à investir dans une infrastructure tolérante aux pannes et à fournir des données en temps opportun.

### Bonne compatibilité des incitations {#good-incentive-compatibility}

Les oracles décentralisés mettent en œuvre diverses conceptions d'incitation pour empêcher les comportements [byzantins](https://en.wikipedia.org/wiki/Byzantine_fault) parmi les nœuds d'oracle. Plus précisément, ils atteignent l'_attribuabilité_ et la _responsabilité_ :

1. Les nœuds d'oracle décentralisés sont souvent tenus de signer les données qu'ils fournissent en réponse aux demandes de données. Ces informations aident à évaluer les performances historiques des nœuds d'oracle, de sorte que les utilisateurs peuvent filtrer les nœuds d'oracle non fiables lorsqu'ils font des demandes de données. Un exemple est le [système de réputation algorithmique](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) de Witnet.

2. Les oracles décentralisés — comme expliqué précédemment — peuvent exiger des nœuds qu'ils placent une mise sur leur confiance dans la véracité des données qu'ils soumettent. Si la réclamation est vérifiée, cette mise peut être retournée avec des récompenses pour un service honnête. Mais elle peut également subir une réduction au cas où les informations seraient incorrectes, ce qui fournit une certaine mesure de responsabilité.

## Applications des oracles dans les contrats intelligents {#applications-of-oracles-in-smart-contracts}

Voici des cas d'utilisation courants pour les oracles sur Ethereum :

### Récupération de données financières {#retrieving-financial-data}

Les applications de [finance décentralisée](/defi/) (DeFi) permettent le prêt, l'emprunt et le trading d'actifs de pair à pair. Cela nécessite souvent d'obtenir différentes informations financières, y compris des données sur les taux de change (pour calculer la valeur fiduciaire des cryptomonnaies ou comparer les prix des jetons) et des données sur les marchés des capitaux (pour calculer la valeur des actifs tokenisés, tels que l'or ou le dollar américain).

Un protocole de prêt DeFi, par exemple, a besoin d'interroger les prix actuels du marché pour les actifs (par exemple, l'ETH) déposés en tant que collatéral. Cela permet au contrat de déterminer la valeur des actifs collatéraux et de déterminer combien il peut emprunter au système.

Les « oracles de prix » populaires (comme on les appelle souvent) dans la DeFi incluent les flux de prix Chainlink, l'[Open Price Feed](https://compound.finance/docs/prices) du protocole Compound, les [prix moyens pondérés dans le temps (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) d'Uniswap et les [oracles Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Les constructeurs doivent comprendre les mises en garde qui accompagnent ces oracles de prix avant de les intégrer dans leur projet. Cet [article](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fournit une analyse détaillée de ce qu'il faut prendre en compte lors de la planification de l'utilisation de l'un des oracles de prix mentionnés.

Ci-dessous se trouve un exemple de la façon dont vous pouvez récupérer le dernier prix de l'ETH dans votre contrat intelligent en utilisant un flux de prix Chainlink :

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Réseau: Kovan
     * Agrégateur: ETH/USD
     * Adresse: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Retourne le dernier prix
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

### Génération d'un caractère aléatoire vérifiable {#generating-verifiable-randomness}

Certaines applications de chaîne de blocs, telles que les jeux basés sur la chaîne de blocs ou les systèmes de loterie, nécessitent un niveau élevé d'imprévisibilité et de caractère aléatoire pour fonctionner efficacement. Cependant, l'exécution déterministe des chaînes de blocs élimine le caractère aléatoire.

L'approche originale consistait à utiliser des fonctions cryptographiques pseudo-aléatoires, telles que `blockhash`, mais celles-ci pouvaient être [manipulées par les mineurs](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) résolvant l'algorithme de preuve de travail. De plus, le [passage d'Ethereum à la preuve d'enjeu](/roadmap/merge/) signifie que les développeurs ne peuvent plus s'appuyer sur `blockhash` pour le caractère aléatoire onchain. Le [mécanisme RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) de la chaîne balise fournit plutôt une source alternative de caractère aléatoire.

Il est possible de générer la valeur aléatoire hors chaîne et de l'envoyer onchain, mais cela impose des exigences de confiance élevées aux utilisateurs. Ils doivent croire que la valeur a été véritablement générée via des mécanismes imprévisibles et n'a pas été altérée en transit.

Les oracles conçus pour le calcul hors chaîne résolvent ce problème en générant de manière sécurisée des résultats aléatoires hors chaîne qu'ils diffusent onchain avec des preuves cryptographiques attestant de l'imprévisibilité du processus. Un exemple est [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), qui est un générateur de nombres aléatoires (RNG) manifestement équitable et inviolable, utile pour construire des contrats intelligents fiables pour les applications qui s'appuient sur des résultats imprévisibles.

### Obtenir des résultats pour des événements {#getting-outcomes-for-events}

Avec les oracles, créer des contrats intelligents qui répondent aux événements du monde réel est facile. Les services d'oracles rendent cela possible en permettant aux contrats de se connecter à des API externes via des composants hors chaîne et de consommer des informations provenant de ces sources de données. Par exemple, la dapp de marché de prédiction mentionnée précédemment peut demander à un oracle de renvoyer les résultats des élections à partir d'une source hors chaîne de confiance (par exemple, l'Associated Press).

L'utilisation d'oracles pour récupérer des données basées sur des résultats du monde réel permet d'autres cas d'utilisation novateurs ; par exemple, un produit d'assurance décentralisé a besoin d'informations précises sur la météo, les catastrophes, etc. pour fonctionner efficacement.

### Automatisation des contrats intelligents {#automating-smart-contracts}

Les contrats intelligents ne s'exécutent pas automatiquement ; un compte détenu par un tiers (EOA), ou un autre compte de contrat, doit plutôt déclencher les bonnes fonctions pour exécuter le code du contrat. Dans la plupart des cas, la majeure partie des fonctions du contrat sont publiques et peuvent être invoquées par des EOA et d'autres contrats.

Mais il existe également des _fonctions privées_ au sein d'un contrat qui sont inaccessibles aux autres, mais qui sont essentielles à la fonctionnalité globale d'une dapp. Des exemples incluent une fonction `mintERC721Token()` qui frappe périodiquement de nouveaux NFT pour les utilisateurs, une fonction pour attribuer des paiements dans un marché de prédiction, ou une fonction pour déverrouiller des jetons stakés dans un DEX.

Les développeurs devront déclencher de telles fonctions à intervalles réguliers pour que l'application continue de fonctionner correctement. Cependant, cela pourrait entraîner plus d'heures perdues sur des tâches banales pour les développeurs, c'est pourquoi l'automatisation de l'exécution des contrats intelligents est attrayante.

Certains réseaux d'oracles décentralisés offrent des services d'automatisation, qui permettent aux nœuds d'oracle hors chaîne de déclencher des fonctions de contrat intelligent selon des paramètres définis par l'utilisateur. Généralement, cela nécessite d'« enregistrer » le contrat cible auprès du service d'oracle, de fournir des fonds pour payer l'opérateur de l'oracle et de spécifier les conditions ou les moments pour déclencher le contrat.

Le [réseau Keeper](https://chain.link/keepers) de Chainlink offre des options aux contrats intelligents pour externaliser les tâches de maintenance régulières de manière décentralisée et avec une confiance minimisée. Lisez la [documentation officielle de Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) pour obtenir des informations sur la façon de rendre votre contrat compatible avec Keeper et d'utiliser le service Upkeep.

## Comment utiliser les oracles de blockchain {#use-blockchain-oracles}

Il existe de multiples applications d'oracle que vous pouvez intégrer dans votre dapp Ethereum :

**[Chainlink](https://chain.link/)** - _Les réseaux d'oracles décentralisés Chainlink fournissent des entrées, des sorties et des calculs inviolables pour prendre en charge des contrats intelligents avancés sur n'importe quelle chaîne de blocs._

**[Oracles RedStone](https://redstone.finance/)** - _RedStone est un oracle modulaire décentralisé qui fournit des flux de données optimisés en gaz. Il se spécialise dans l'offre de flux de prix pour les actifs émergents, tels que les jetons de staking liquide (LST), les jetons de restaking liquide (LRT) et les dérivés de staking Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle surmonte les limites actuelles du transfert de données onchain en développant des oracles véritablement évolutifs, rentables, décentralisés et vérifiables._

**[Witnet](https://witnet.io/)** - _Witnet est un oracle sans permission, décentralisé et résistant à la censure qui aide les contrats intelligents à réagir aux événements du monde réel avec de solides garanties crypto-économiques._

**[Oracle UMA](https://uma.xyz)** - _L'oracle optimiste d'UMA permet aux contrats intelligents de recevoir rapidement tout type de données pour différentes applications, y compris l'assurance, les dérivés financiers et les marchés de prédiction._

**[Tellor](https://tellor.io/)** - _Tellor est un protocole d'oracle transparent et sans permission permettant à votre contrat intelligent d'obtenir facilement n'importe quelle donnée chaque fois qu'il en a besoin._

**[Protocole Band](https://bandprotocol.com/)** - _Le protocole Band est une plateforme d'oracle de données inter-chaîne qui agrège et connecte des données du monde réel et des API aux contrats intelligents._

**[Réseau Pyth](https://pyth.network/)** - _Le réseau Pyth est un réseau d'oracles financiers de première partie conçu pour publier des données continues du monde réel onchain dans un environnement inviolable, décentralisé et autonome._

**[API3 DAO](https://api3.org/)** - _API3 DAO fournit des solutions d'oracles de première partie qui offrent une plus grande transparence des sources, une sécurité et une évolutivité accrues dans une solution décentralisée pour les contrats intelligents._

**[Supra](https://supra.com/)** - Une boîte à outils verticalement intégrée de solutions inter-chaînes qui relient toutes les chaînes de blocs, publiques (L1 et L2) ou privées (entreprises), fournissant des flux de prix d'oracles décentralisés qui peuvent être utilisés pour des cas d'utilisation onchain et hors chaîne. 

**[Gas Network](https://gas.network/)** - Une plateforme d'oracle distribuée fournissant des données de prix du gaz en temps réel à travers la chaîne de blocs. En apportant des données des principaux fournisseurs de données de prix du gaz onchain, Gas Network contribue à stimuler l'interopérabilité. Gas Network prend en charge les données pour plus de 35 chaînes, y compris le réseau principal Ethereum et de nombreux L2 de premier plan.

**[DIA](https://www.diadata.org/)** - Un réseau d'oracles inter-chaîne fournissant des flux de données vérifiables pour plus de 20 000 actifs dans toutes les principales classes d'actifs. DIA s'approvisionne en données commerciales brutes directement auprès de plus de 100 marchés primaires et les calcule onchain, garantissant une transparence et une vérifiabilité complètes des données avec des configurations personnalisées pour tout cas d'utilisation.

**[Stork](https://stork.network)** - Stork fournit des données de prix à très faible latence, prenant en charge un large éventail de cas d'utilisation, y compris les marchés perpétuels, les protocoles de prêt et les écosystèmes DeFi, avec de nouveaux actifs pris en charge rapidement lors de leur cotation.

## Lectures complémentaires {#further-reading}

**Articles**

- [Qu'est-ce qu'un oracle de blockchain ?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Qu'est-ce qu'un oracle de blockchain ?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracles décentralisés : un aperçu complet](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implémentation d'un oracle de blockchain sur Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Pourquoi les contrats intelligents ne peuvent-ils pas faire d'appels API ?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Alors vous voulez utiliser un oracle de prix](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Vidéos**

- [Les oracles et l'expansion de l'utilité de la chaîne de blocs](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriels**

- [Comment récupérer le prix actuel d'Ethereum en Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consommation de données d'oracle](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Défi des oracles](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Exemples de projets**

- [Projet de démarrage complet Chainlink pour Ethereum en Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
