---
title: Mise à jour des contrats intelligents
description: Un aperçu des méthodes de mise à jour des contrats intelligents Ethereum
lang: fr
---

Les contrats intelligents sur Ethereum sont des programmes auto-exécutables qui s'exécutent dans la Machine virtuelle Ethereum (EVM). Ces programmes sont immuables de par leur conception, ce qui empêche toute mise à jour de la logique une fois le contrat déployé.

Si l'immutabilité est nécessaire pour assurer la confiance, la décentralisation et la sécurité des contrats intelligents, elle peut constituer un inconvénient dans certains cas. Par exemple, un code immuable peut empêcher les développeurs de corriger des contrats vulnérables.

Cependant, l'intensification des recherches visant à améliorer les contrats intelligents a conduit à l'introduction de plusieurs modèles de mise à niveau. Ces modèles de mise à niveau permettent aux développeurs de mettre à jour les contrats intelligents (tout en préservant l'immutabilité) en plaçant la logique dans différents contrats.

## Prérequis {#prerequisites}

Vous devriez avoir une bonne connaissance des [contrats intelligents](/developers/docs/smart-contracts/), de l'[anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/) et de la [Machine virtuelle Ethereum (EVM)](/developers/docs/evm/). Ce guide suppose également que les lecteurs maîtrisent la programmation de contrats intelligents.

## Qu'est-ce qu'une mise à jour de contrat intelligent ? {#what-is-a-smart-contract-upgrade}

La mise à jour d'un contrat intelligent consiste à modifier la logique d'un contrat intelligent tout en préservant l'état du contrat. Il est important de préciser que l'évolutivité et la mutabilité sont deux notions différentes, en particulier dans le contexte des contrats intelligents.

Il n'est toujours pas possible de modifier un programme déployé à une adresse sur le réseau Ethereum. Mais vous pouvez modifier le code qui est exécuté lorsque les utilisateurs interagissent avec un contrat intelligent.

Cela peut se faire par les méthodes suivantes :

1. Créer plusieurs versions d'un contrat intelligent et migrer l'état (c'est-à-dire les données) de l'ancien contrat vers une nouvelle instance du contrat.

2. Créer des contrats distincts pour stocker la logique et l'état.

3. Utiliser des modèles de proxys pour déléguer des appels de fonction d'un contrat proxy immuable à un contrat logique modifiable.

4. Créer un contrat principal immuable qui interagit avec des contrats satellites flexibles et s'appuie sur eux pour exécuter des fonctions spécifiques.

5. Utiliser le modèle de diamant pour déléguer des appels de fonction d'un contrat proxy à des contrats logiques.

### Mécanisme de mise à jour n° 1 : migration des contrats {#contract-migration}

La migration des contrats repose sur le principe du versionnage, c'est-à-dire la création et la gestion d'états uniques d'un même logiciel. La migration de contrat implique le déploiement d'une nouvelle instance d'un contrat intelligent existant et le transfert du stockage et des soldes vers le nouveau contrat.

Le nouveau contrat déployé aura un espace de stockage vide, ce qui vous permettra de récupérer les données de l'ancien contrat et de les écrire dans la nouvelle implémentation. Après quoi, vous devrez mettre à jour tous les contrats qui interagissaient avec l'ancien contrat afin de refléter la nouvelle adresse.

La dernière étape de la migration des contrats consiste à convaincre les utilisateurs de passer au nouveau contrat. La nouvelle version du contrat conservera les soldes et les adresses des utilisateurs, ce qui préserve l'immutabilité. S'il s'agit d'un contrat basé sur des jetons, vous devrez également contacter les plateformes d'échange pour remplacer l'ancien contrat par le nouveau.

La migration des contrats est une mesure relativement simple et sûre pour mettre à jour les contrats intelligents sans interrompre les interactions avec les utilisateurs. Cependant, la migration manuelle du stockage et des soldes des utilisateurs vers le nouveau contrat prend beaucoup de temps et peut entraîner des coûts de gaz élevés.

[En savoir plus sur la migration de contrats.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mécanisme de mise à jour n°2 : séparation des données {#data-separation}

Une autre méthode pour améliorer les contrats intelligents consiste à séparer la logique et le stockage des données dans des contrats distincts. Cela signifie que les utilisateurs interagissent avec le contrat de logique, tandis que les données sont stockées dans le contrat de stockage.

Le contrat de logique contient le code exécuté lorsque les utilisateurs interagissent avec l'application. Il contient également l'adresse du contrat de stockage et interagit avec lui pour obtenir et définir des données.

Le contrat de stockage, quant à lui, contient les données associées au contrat intelligent, telles que les soldes et les adresses des utilisateurs. Notez que le contrat de stockage appartient au contrat logique et qu'il est configuré avec l'adresse de ce dernier lors du déploiement. Cela empêche les contrats non autorisés de faire appel au contrat de stockage ou de mettre à jour ses données.

Par défaut, le contrat de stockage est immuable, mais vous pouvez remplacer le contrat de logique vers lequel il pointe par une nouvelle implémentation. Cela modifiera le code qui s'exécute dans l'EVM, tout en conservant le stockage et les soldes intacts.

L'utilisation de cette méthode de mise à niveau nécessite la mise à jour de l'adresse du contrat de logique dans le contrat de stockage. Vous devez également configurer le nouveau contrat de logique avec l'adresse du contrat de stockage pour les raisons expliquées précédemment.

La méthode de séparation des données est sans doute plus facile à mettre en œuvre par rapport à la migration de contrat. Cependant, vous devrez gérer plusieurs contrats et mettre en œuvre des systèmes d'autorisation complexes pour protéger les contrats intelligents contre les mises à jour malveillantes.

### Mécanisme de mise à jour n°3 : méthodes Proxy {#proxy-patterns}

La méthode proxy utilise également la séparation des données pour conserver la logique de travail et les données dans des contrats distincts. Cependant, avec la méthode proxy, le contrat de stockage (appelé proxy) appelle le contrat logique pendant l'exécution du code. C'est l'inverse de la méthode de séparation des données, où le contrat de logique appelle le contrat de stockage.

Voici ce qui se passe avec le modèle proxy :

1. Les utilisateurs interagissent avec le contrat proxy, qui stocke les données, mais ne détient pas la logique de travail.

2. Le contrat proxy stocke l'adresse du contrat logique et délègue tous les appels de fonction au contrat logique (qui détient la logique de travail) en utilisant la fonction `delegatecall`.

3. Après le transfert de l'appel au contrat logique, les données renvoyées par le contrat logique sont récupérées et renvoyées à l'utilisateur.

Utiliser les méthodes de proxy nécessite une compréhension de la fonction **delegatecall**. Essentiellement, `delegatecall` est un opcode qui permet à un contrat d'appeler un autre contrat, tandis que l'exécution réelle du code se produit dans le contexte du contrat appelant. Une implication de l'utilisation de `delegatecall` dans les modèles de proxy est que le contrat proxy lit et écrit dans son stockage et exécute la logique stockée dans le contrat de logique comme s'il appelait une fonction interne.

Selon la [documentation Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries) :

> _Il existe une variante spéciale de l'appel de message, nommée **delegatecall** qui est identique à un appel de message à part le fait que le code à l'adresse cible est exécuté dans le contexte (c'est-à-dire à l'adresse) du contrat appelant et `msg.sender` et `msg.value` ne changent pas leurs valeurs. __Cela signifie qu'un contrat peut charger dynamiquement du code depuis une adresse différente à l'exécution. Le stockage, l'adresse actuelle et le solde font toujours référence au contrat appelant, seul le code est pris à partir de l'adresse appelée._

Le contrat proxy sait invoquer `delegatecall` chaque fois qu'un utilisateur appelle une fonction car il dispose d'une fonction `fallback` intégrée. En programmation Solidity, la [fonction fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) est exécutée lorsqu'un appel de fonction ne correspond pas aux fonctions spécifiées dans un contrat.

Pour faire fonctionner le modèle proxy, il est nécessaire d'écrire une fonction de défaut personnalisée qui spécifie comment le contrat proxy doit gérer les appels de fonctions qu'il ne prend pas en charge. Dans ce cas, la fonction par défaut du proxy est programmée pour initier un delegatecall et réacheminer la demande de l'utilisateur vers l'implémentation actuelle du contrat logique.

Le contrat proxy est immuable par défaut, mais de nouveaux contrats logiques avec une logique de travail mise à jour peuvent être créés. Effectuer une mise à jour consiste ensuite à modifier l'adresse du contrat logique référencé dans le contrat proxy.

En orientant le contrat proxy vers un nouveau contrat logique, le code exécuté lorsque les utilisateurs appellent la fonction du contrat proxy change. Cela nous permet de mettre à jour la logique d'un contrat sans demander aux utilisateurs d'interagir avec un nouveau contrat.

Les méthodes de proxy sont une méthode populaire pour mettre à jour les contrats intelligents car ils éliminent les difficultés associées à la migration des contrats. Cependant, les méthodes de proxy sont plus compliqués à utiliser et peuvent introduire des failles critiques, comme les [conflits de sélecteurs de fonctions](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), s'ils sont utilisés de manière incorrecte.

[En savoir plus sur la méthode Proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mécanisme de mise à jour n°4 : méthode Stratégique {#strategy-pattern}

Cette technique est influencée par la [stratégie](https://en.wikipedia.org/wiki/Strategy_pattern), qui encourage à créer des programmes logiciels qui interagissent avec d'autres programmes pour implémenter des fonctionnalités spécifiques. Appliquer le modèle de stratégie au développement d'Ethereum signifierait construire un contrat intelligent qui appelle des fonctions d'autres contrats.

Dans ce cas, le contrat principal contient la logique de base, mais interagit avec d'autres contrats intelligents (« contrats satellites ») pour exécuter certaines fonctions. Ce contrat principal stocke également l'adresse de chaque contrat satellite et peut permuter entre différentes implémentations du contrat satellite.

Vous pouvez créer un nouveau contrat satellite et configurer le contrat principal avec la nouvelle adresse. Cela vous permet de modifier les _stratégies_ (c'est-à-dire de mettre en œuvre une nouvelle logique) d'un contrat intelligent.

Bien qu'il soit similaire au modèle de proxy évoqué précédemment, le modèle de stratégie est différent car le contrat principal, avec lequel les utilisateurs interagissent, contient la logique. L'utilisation de ce modèle vous permet d'introduire des changements limités dans un contrat intelligent sans affecter l'infrastructure de base.

Le principal inconvénient de ce modèle est qu'il n'est utile que pour le déploiement de mises à jour mineures. De plus, si le contrat principal est compromis (par exemple, par un piratage), vous ne pouvez pas utiliser cette méthode de mise à jour.

### Mécanisme de mise à jour n°5 : méthode diamant {#diamond-pattern}

Le modèle de diamant peut être considéré comme une amélioration du modèle de proxy. Le modèle de diamant diffère des modèles de proxy car le contrat proxy de diamant peut déléguer des appels de fonction à plus d'un contrat logique.

Les contrats logiques dans le modèle de diamant sont appelés _facettes_. Pour faire fonctionner le modèle de diamant, vous devez créer une correspondance dans le contrat proxy qui associe les [sélecteurs de fonction](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) à différentes adresses de facettes.

Lorsqu'un utilisateur effectue un appel de fonction, le contrat proxy vérifie la correspondance pour trouver la facette responsable de l'exécution de cette fonction. Ensuite, il invoque `delegatecall` (en utilisant la fonction de secours) et redirige l'appel vers le contrat logique approprié.

Le modèle de mise à jour en diamant présente plusieurs avantages par rapport aux modèles de mise à jour proxy traditionnels :

1. Il permet de mettre à niveau une petite partie du contrat sans changer tout le code. L'utilisation du modèle proxy pour les mises à niveau nécessite la création d'un tout nouveau contrat logique, même pour des mises à niveau mineures.

2. Tous les contrats intelligents (y compris les contrats logiques utilisés dans les modèles proxy) ont une limite de taille de 24 Ko, ce qui peut être une limitation, en particulier pour les contrats complexes nécessitant plus de fonctions. Le modèle diamant facilite la résolution de ce problème en répartissant les fonctions sur plusieurs contrats logiques.

3. Les modèles proxy adoptent une approche universelle pour les contrôles d'accès. Une entité ayant accès aux fonctions de mise à niveau peut modifier l'_ensemble_ du contrat. Mais le modèle de diamant permet une approche modulaire des permissions, où vous pouvez restreindre les entités à la mise à niveau de certaines fonctions au sein d'un contrat intelligent.

[En savoir plus sur la méthode diamant](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Avantages et inconvénients de la mise à jour des contrats intelligents {#pros-and-cons-of-upgrading-smart-contracts}

| Avantages                                                                                                                                                                      | Inconvénients                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Une mise à jour de contrat intelligent peut faciliter la correction des vulnérabilités découvertes lors de la phase de post-déploiement.                                       | La mise à jour des contrats intelligents annule le principe de l'immutabilité du code, ce qui a des répercussions sur la décentralisation et la sécurité.                                       |
| Les développeurs peuvent utiliser les mises à jour logiques pour ajouter de nouvelles fonctionnalités aux applications décentralisées.                                         | Les utilisateurs doivent faire confiance aux développeurs pour ne pas modifier arbitrairement les contrats intelligents.                                                                        |
| Les mises à jour des contrats intelligents peuvent améliorer la sécurité des utilisateurs finaux, car les bogues peuvent être corrigés rapidement.                             | La programmation d'une fonctionnalité de mise à jour dans les contrats intelligents ajoute une couche supplémentaire de complexité et augmente la possibilité de failles critiques.             |
| Les mises à jour des contrats donnent aux développeurs une plus grande marge de manœuvre pour expérimenter différentes fonctionnalités et améliorer les DApps au fil du temps. | La possibilité d'améliorer les contrats intelligents peut encourager les développeurs à lancer des projets plus rapidement sans faire preuve de diligence durant la phase de développement.     |
|                                                                                                                                                                                | Un contrôle d'accès non sécurisé ou une centralisation dans les contrats intelligents peuvent permettre à des acteurs malveillants d'effectuer plus facilement des mises à jour non autorisées. |

## Considérations pour la mise à jour des contrats intelligents {#considerations-for-upgrading-smart-contracts}

1. Utilisez des mécanismes de contrôle d'accès/autorisation sécurisés pour empêcher les mises à niveau non autorisées de contrats intelligents, en particulier si vous utilisez des modèles proxy, des modèles stratégiques ou une séparation des données. Un exemple est de restreindre l'accès à la fonction de mise à niveau, de sorte que seul le propriétaire du contrat puisse l'appeler.

2. La mise à jour des contrats intelligents est une activité complexe qui nécessite un niveau élevé de diligence pour éviter l'introduction de vulnérabilités.

3. Réduisez les hypothèses de confiance en décentralisant le processus de mise à jour. Des stratégies possibles incluent l'utilisation d'un [contrat de portefeuille multi-signature](/developers/docs/smart-contracts/#multisig) pour contrôler les mises à niveau, ou l'exigence que les [membres d'une DAO](/dao/) votent pour approuver la mise à niveau.

4. Soyez conscient des coûts liés à la mise à jour des contrats. Par exemple, la copie d'un état (p. ex. les soldes des utilisateurs) d'un ancien contrat vers un nouveau contrat lors d'une migration de contrat peut nécessiter plus d'une transaction, ce qui signifie plus de frais de gaz.

5. Pensez à mettre en place des **timelocks** pour protéger les utilisateurs. Un timelock est un délai imposé aux modifications apportées à un système. Les timelocks peuvent être combinés à un système de gouvernance à multi-sig pour contrôler les mises à jour : si une action proposée atteint le seuil d'approbation requis, elle n'est pas exécutée tant que le délai prédéfini ne s'est pas écoulé.

Les timelocks donnent aux utilisateurs un certain temps pour quitter le système s'ils sont en désaccord avec un changement proposé (par exemple, une mise à jour de la logique ou de nouveaux barèmes tarifaires). Sans timelocks, les utilisateurs doivent faire confiance aux développeurs pour ne pas mettre en œuvre des changements arbitraires dans un contrat intelligent sans préavis. L'inconvénient est que les timelocks limitent la capacité à corriger rapidement les vulnérabilités.

## Ressources {#resources}

**OpenZeppelin Upgrades Plugins - _Une suite d'outils pour déployer et sécuriser des contrats intelligents évolutifs._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentation](https://docs.openzeppelin.com/upgrades)

## Tutoriels {#tutorials}

- [Mettre à jour vos contrats intelligents | Tutoriel YouTube Tutorial](https://www.youtube.com/watch?v=bdXJmWajZRY) Par Patrick Collins
- [Tutoriel de migration des contrats intelligents Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) par Austin Griffith
- [Utilisation du modèle proxy UUPS pour mettre à jour les contrats intelligents](https://blog.logrocket.com/author/praneshas/) par Pranesh A.S
- [Tutoriel Web3 : Écrire un contrat intelligent évolutif (proxy) en utilisant OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) par fangjun.eth

## Complément d'information {#further-reading}

- [L'état des mises à jour des contrats intelligents](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) par Santiago Palladino
- [Plusieurs façons de mettre à jour un contrat intelligent Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Apprendre à mettre à jour un contrat intelligent](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - OpenZeppelin Docs
- [La méthode proxy pour mettre à jour les contrats en Solidity : Proxy Transparent vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) par Naveen Samu
- [Comment les mises à jour en diamant fonctionnent ?](https://dev.to/mudgen/how-diamond-upgrades-work-417j) par Nick Mudge
