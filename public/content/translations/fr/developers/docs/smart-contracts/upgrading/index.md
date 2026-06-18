---
title: "Mettre à niveau les contrats intelligents"
description: "Un aperçu des modèles de mise à niveau pour les contrats intelligents Ethereum"
lang: fr
---

Les contrats intelligents sur Ethereum sont des programmes auto-exécutables qui s'exécutent dans la machine virtuelle Ethereum (EVM). Ces programmes sont immuables par conception, ce qui empêche toute mise à jour de la logique métier une fois le contrat déployé.

Bien que l'immuabilité soit nécessaire pour l'absence de confiance requise, la décentralisation et la sécurité des contrats intelligents, elle peut constituer un inconvénient dans certains cas. Par exemple, un code immuable peut rendre impossible pour les développeurs de corriger des contrats vulnérables.

Cependant, des recherches accrues sur l'amélioration des contrats intelligents ont conduit à l'introduction de plusieurs modèles de mise à niveau. Ces modèles de mise à niveau permettent aux développeurs de mettre à niveau les contrats intelligents (tout en préservant l'immuabilité) en plaçant la logique métier dans différents contrats.

## Prérequis {#prerequisites}

Vous devriez avoir une bonne compréhension des [contrats intelligents](/developers/docs/smart-contracts/), de l'[anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/) et de la [machine virtuelle Ethereum (EVM)](/developers/docs/evm/). Ce guide suppose également que les lecteurs ont des notions de programmation de contrats intelligents.

## Qu'est-ce qu'une mise à niveau de contrat intelligent ? {#what-is-a-smart-contract-upgrade}

Une mise à niveau de contrat intelligent implique de modifier la logique métier d'un contrat intelligent tout en préservant l'état du contrat. Il est important de préciser que la capacité de mise à niveau et la mutabilité ne sont pas la même chose, en particulier dans le contexte des contrats intelligents.

Vous ne pouvez toujours pas modifier un programme déployé à une adresse sur le réseau Ethereum. Mais vous pouvez modifier le code qui est exécuté lorsque les utilisateurs interagissent avec un contrat intelligent.

Cela peut être fait via les méthodes suivantes :

1. Créer plusieurs versions d'un contrat intelligent et migrer l'état (c'est-à-dire les données) de l'ancien contrat vers une nouvelle instance du contrat.

2. Créer des contrats distincts pour stocker la logique métier et l'état.

3. Utiliser des modèles de proxy pour déléguer les appels de fonction d'un contrat proxy immuable à un contrat logique modifiable.

4. Créer un contrat principal immuable qui s'interface avec et s'appuie sur des contrats satellites flexibles pour exécuter des fonctions spécifiques.

5. Utiliser le modèle diamant pour déléguer les appels de fonction d'un contrat proxy à des contrats logiques.

### Mécanisme de mise à niveau n° 1 : Migration de contrat {#contract-migration}

La migration de contrat est basée sur le contrôle de version — l'idée de créer et de gérer des états uniques du même logiciel. La migration de contrat implique le déploiement d'une nouvelle instance d'un contrat intelligent existant et le transfert du stockage et des soldes vers le nouveau contrat.

Le contrat nouvellement déployé aura un stockage vide, vous permettant de récupérer les données de l'ancien contrat et de les écrire dans la nouvelle implémentation. Ensuite, vous devrez mettre à jour tous les contrats qui interagissaient avec l'ancien contrat pour refléter la nouvelle adresse.

La dernière étape de la migration de contrat consiste à convaincre les utilisateurs de passer à l'utilisation du nouveau contrat. La nouvelle version du contrat conservera les soldes et les adresses des utilisateurs, ce qui préserve l'immuabilité. S'il s'agit d'un contrat basé sur des jetons, vous devrez également contacter les plateformes d'échange pour qu'elles abandonnent l'ancien contrat et utilisent le nouveau contrat.

La migration de contrat est une mesure relativement simple et sûre pour mettre à niveau les contrats intelligents sans interrompre les interactions des utilisateurs. Cependant, la migration manuelle du stockage et des soldes des utilisateurs vers le nouveau contrat prend beaucoup de temps et peut entraîner des coûts de gaz élevés.

[En savoir plus sur la migration de contrat.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mécanisme de mise à niveau n° 2 : Séparation des données {#data-separation}

Une autre méthode pour mettre à niveau les contrats intelligents consiste à séparer la logique métier et le stockage des données dans des contrats distincts. Cela signifie que les utilisateurs interagissent avec le contrat logique, tandis que les données sont stockées dans le contrat de stockage.

Le contrat logique contient le code exécuté lorsque les utilisateurs interagissent avec l'application. Il contient également l'adresse du contrat de stockage et interagit avec lui pour obtenir et définir des données.

Pendant ce temps, le contrat de stockage conserve l'état associé au contrat intelligent, tel que les soldes et les adresses des utilisateurs. Notez que le contrat de stockage appartient au contrat logique et est configuré avec l'adresse de ce dernier lors du déploiement. Cela empêche les contrats non autorisés d'appeler le contrat de stockage ou de mettre à jour ses données.

Par défaut, le contrat de stockage est immuable — mais vous pouvez remplacer le contrat logique vers lequel il pointe par une nouvelle implémentation. Cela modifiera le code qui s'exécute dans l'EVM, tout en gardant le stockage et les soldes intacts.

L'utilisation de cette méthode de mise à niveau nécessite la mise à jour de l'adresse du contrat logique dans le contrat de stockage. Vous devez également configurer le nouveau contrat logique avec l'adresse du contrat de stockage pour les raisons expliquées précédemment.

Le modèle de séparation des données est sans doute plus facile à mettre en œuvre par rapport à la migration de contrat. Cependant, vous devrez gérer plusieurs contrats et mettre en œuvre des schémas d'autorisation complexes pour protéger les contrats intelligents contre les mises à niveau malveillantes.

### Mécanisme de mise à niveau n° 3 : Modèles de proxy {#proxy-patterns}

Le modèle de proxy utilise également la séparation des données pour conserver la logique métier et les données dans des contrats distincts. Cependant, dans un modèle de proxy, le contrat de stockage (appelé proxy) appelle le contrat logique pendant l'exécution du code. C'est l'inverse de la méthode de séparation des données, où le contrat logique appelle le contrat de stockage.

Voici ce qui se passe dans un modèle de proxy :

1. Les utilisateurs interagissent avec le contrat proxy, qui stocke les données, mais ne contient pas la logique métier.

2. Le contrat proxy stocke l'adresse du contrat logique et délègue tous les appels de fonction au contrat logique (qui contient la logique métier) en utilisant la fonction `delegatecall`.

3. Une fois l'appel transféré au contrat logique, les données renvoyées par le contrat logique sont récupérées et renvoyées à l'utilisateur.

L'utilisation des modèles de proxy nécessite une compréhension de la fonction **delegatecall**. Fondamentalement, `delegatecall` est un code d'opération qui permet à un contrat d'appeler un autre contrat, tandis que l'exécution réelle du code se produit dans le contexte du contrat appelant. Une implication de l'utilisation de `delegatecall` dans les modèles de proxy est que le contrat proxy lit et écrit dans son stockage et exécute la logique stockée dans le contrat logique comme s'il appelait une fonction interne.

D'après la [documentation Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries) :

> _Il existe une variante spéciale d'un appel de message, nommée **delegatecall**, qui est identique à un appel de message, à l'exception du fait que le code à l'adresse cible est exécuté dans le contexte (c'est-à-dire à l'adresse) du contrat appelant et que `msg.sender` et `msg.value` ne changent pas leurs valeurs._ _Cela signifie qu'un contrat peut charger dynamiquement du code à partir d'une adresse différente au moment de l'exécution. Le stockage, l'adresse actuelle et le solde font toujours référence au contrat appelant, seul le code est extrait de l'adresse appelée._

Le contrat proxy sait qu'il doit invoquer `delegatecall` chaque fois qu'un utilisateur appelle une fonction car il intègre une fonction `fallback`. Dans la programmation Solidity, la [fonction de repli](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) est exécutée lorsqu'un appel de fonction ne correspond pas aux fonctions spécifiées dans un contrat.

Pour que le modèle de proxy fonctionne, il faut écrire une fonction de repli personnalisée qui spécifie comment le contrat proxy doit gérer les appels de fonction qu'il ne prend pas en charge. Dans ce cas, la fonction de repli du proxy est programmée pour initier un delegatecall et réacheminer la demande de l'utilisateur vers l'implémentation actuelle du contrat logique.

Le contrat proxy est immuable par défaut, mais de nouveaux contrats logiques avec une logique métier mise à jour peuvent être créés. Effectuer la mise à niveau consiste alors à modifier l'adresse du contrat logique référencé dans le contrat proxy.

En pointant le contrat proxy vers un nouveau contrat logique, le code exécuté lorsque les utilisateurs appellent la fonction du contrat proxy change. Cela nous permet de mettre à niveau la logique d'un contrat sans demander aux utilisateurs d'interagir avec un nouveau contrat.

Les modèles de proxy sont une méthode populaire pour mettre à niveau les contrats intelligents car ils éliminent les difficultés associées à la migration de contrat. Cependant, les modèles de proxy sont plus compliqués à utiliser et peuvent introduire des failles critiques, telles que des [conflits de sélecteurs de fonction](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), s'ils sont mal utilisés.

[En savoir plus sur les modèles de proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mécanisme de mise à niveau n° 4 : Modèle de stratégie {#strategy-pattern}

Cette technique est influencée par le [modèle de stratégie](https://en.wikipedia.org/wiki/Strategy_pattern), qui encourage la création de programmes logiciels qui s'interfacent avec d'autres programmes pour implémenter des fonctionnalités spécifiques. L'application du modèle de stratégie au développement Ethereum signifierait la création d'un contrat intelligent qui appelle des fonctions d'autres contrats.

Le contrat principal dans ce cas contient la logique métier de base, mais s'interface avec d'autres contrats intelligents (« contrats satellites ») pour exécuter certaines fonctions. Ce contrat principal stocke également l'adresse de chaque contrat satellite et peut basculer entre différentes implémentations du contrat satellite.

Vous pouvez créer un nouveau contrat satellite et configurer le contrat principal avec la nouvelle adresse. Cela vous permet de changer de _stratégies_ (c'est-à-dire d'implémenter une nouvelle logique) pour un contrat intelligent.

Bien que similaire au modèle de proxy discuté précédemment, le modèle de stratégie est différent car le contrat principal, avec lequel les utilisateurs interagissent, contient la logique métier. L'utilisation de ce modèle vous offre la possibilité d'introduire des modifications limitées à un contrat intelligent sans affecter l'infrastructure de base.

L'inconvénient principal est que ce modèle est surtout utile pour déployer des mises à niveau mineures. De plus, si le contrat principal est compromis (par exemple, via un piratage), vous ne pouvez pas utiliser cette méthode de mise à niveau.

### Mécanisme de mise à niveau n° 5 : Modèle diamant {#diamond-pattern}

Le modèle diamant peut être considéré comme une amélioration du modèle de proxy. Les modèles diamant diffèrent des modèles de proxy car le contrat proxy diamant peut déléguer des appels de fonction à plus d'un contrat logique.

Les contrats logiques dans le modèle diamant sont connus sous le nom de _facettes_. Pour que le modèle diamant fonctionne, vous devez créer un mappage dans le contrat proxy qui associe les [sélecteurs de fonction](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) à différentes adresses de facettes.

Lorsqu'un utilisateur effectue un appel de fonction, le contrat proxy vérifie le mappage pour trouver la facette responsable de l'exécution de cette fonction. Ensuite, il invoque `delegatecall` (en utilisant la fonction de repli) et redirige l'appel vers le contrat logique approprié.

Le modèle de mise à niveau diamant présente certains avantages par rapport aux modèles de mise à niveau de proxy traditionnels :

1. Il vous permet de mettre à niveau une petite partie du contrat sans modifier tout le code. L'utilisation du modèle de proxy pour les mises à niveau nécessite la création d'un contrat logique entièrement nouveau, même pour des mises à niveau mineures.

2. Tous les contrats intelligents (y compris les contrats logiques utilisés dans les modèles de proxy) ont une limite de taille de 24 Ko, ce qui peut être une limitation — en particulier pour les contrats complexes nécessitant plus de fonctions. Le modèle diamant permet de résoudre facilement ce problème en répartissant les fonctions sur plusieurs contrats logiques.

3. Les modèles de proxy adoptent une approche globale des contrôles d'accès. Une entité ayant accès aux fonctions de mise à niveau peut modifier le contrat _entier_. Mais le modèle diamant permet une approche modulaire des autorisations, où vous pouvez restreindre les entités à la mise à niveau de certaines fonctions au sein d'un contrat intelligent.

[En savoir plus sur le modèle diamant](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Avantages et inconvénients de la mise à niveau des contrats intelligents {#pros-and-cons-of-upgrading-smart-contracts}

| Avantages                                                                                                                                                           | Inconvénients                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Une mise à niveau de contrat intelligent peut faciliter la correction des vulnérabilités découvertes lors de la phase post-déploiement.                             | La mise à niveau des contrats intelligents annule l'idée d'immuabilité du code, ce qui a des implications pour la décentralisation et la sécurité.                                                                                    |
| Les développeurs peuvent utiliser des mises à niveau logiques pour ajouter de nouvelles fonctionnalités aux applications décentralisées.                            | Les utilisateurs doivent faire confiance aux développeurs pour ne pas modifier les contrats intelligents de manière arbitraire.                                                                                                       |
| Les mises à niveau des contrats intelligents peuvent améliorer la sécurité des utilisateurs finaux, car les bogues peuvent être corrigés rapidement.                | La programmation de fonctionnalités de mise à niveau dans les contrats intelligents ajoute une autre couche de complexité et augmente la possibilité de failles critiques.                                                            |
| Les mises à niveau de contrat donnent aux développeurs plus de marge de manœuvre pour expérimenter différentes fonctionnalités et améliorer les dapps au fil du temps. | L'opportunité de mettre à niveau les contrats intelligents peut encourager les développeurs à lancer des projets plus rapidement sans faire preuve de diligence raisonnable pendant la phase de développement.                        |
|                                                                                                                                                                     | Un contrôle d'accès non sécurisé ou une centralisation dans les contrats intelligents peut faciliter la tâche des acteurs malveillants pour effectuer des mises à niveau non autorisées.                                              |

## Considérations pour la mise à niveau des contrats intelligents {#considerations-for-upgrading-smart-contracts}

1. Utilisez des mécanismes de contrôle d'accès/d'autorisation sécurisés pour empêcher les mises à niveau non autorisées de contrats intelligents, en particulier si vous utilisez des modèles de proxy, des modèles de stratégie ou la séparation des données. Un exemple consiste à restreindre l'accès à la fonction de mise à niveau, de sorte que seul le propriétaire du contrat puisse l'appeler.

2. La mise à niveau des contrats intelligents est une activité complexe et nécessite un niveau élevé de diligence pour empêcher l'introduction de vulnérabilités.

3. Réduisez les hypothèses de confiance en décentralisant le processus de mise en œuvre des mises à niveau. Les stratégies possibles incluent l'utilisation d'un [contrat de portefeuille multisig](/developers/docs/smart-contracts/#multisig) pour contrôler les mises à niveau, ou l'exigence que les [membres d'une DAO](/dao/) votent pour approuver la mise à niveau.

4. Soyez conscient des coûts impliqués dans la mise à niveau des contrats. Par exemple, la copie de l'état (par exemple, les soldes des utilisateurs) d'un ancien contrat vers un nouveau contrat lors de la migration de contrat peut nécessiter plus d'une transaction, ce qui signifie plus de frais de gaz.

5. Envisagez de mettre en œuvre des **verrous temporels** pour protéger les utilisateurs. Un verrou temporel fait référence à un délai imposé aux modifications d'un système. Les verrous temporels peuvent être combinés avec un système de gouvernance multisig pour contrôler les mises à niveau : si une action proposée atteint le seuil d'approbation requis, elle ne s'exécute pas tant que la période de délai prédéfinie ne s'est pas écoulée.

Les verrous temporels donnent aux utilisateurs un certain temps pour quitter le système s'ils ne sont pas d'accord avec une modification proposée (par exemple, une mise à niveau logique ou de nouveaux systèmes de frais). Sans verrous temporels, les utilisateurs doivent faire confiance aux développeurs pour ne pas implémenter de modifications arbitraires dans un contrat intelligent sans préavis. L'inconvénient ici est que les verrous temporels restreignent la capacité à corriger rapidement les vulnérabilités.

## Ressources {#resources}

**Plugins de mise à niveau OpenZeppelin - _Une suite d'outils pour déployer et sécuriser des contrats intelligents pouvant être mis à niveau._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentation](https://docs.openzeppelin.com/upgrades)

## Tutoriels {#tutorials}

- [Mettre à niveau vos contrats intelligents | Tutoriel YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) par Patrick Collins
- [Tutoriel de migration de contrat intelligent Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) par Austin Griffith
- [Utilisation du modèle de proxy UUPS pour mettre à niveau les contrats intelligents](https://blog.logrocket.com/author/praneshas/) par Pranesh A.S
- [Tutoriel Web3 : Écrire un contrat intelligent pouvant être mis à niveau (proxy) à l'aide d'OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) par fangjun.eth

## Lectures complémentaires {#further-reading}

- [L'état des mises à niveau des contrats intelligents](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) par Santiago Palladino
- [Plusieurs façons de mettre à niveau un contrat intelligent Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Apprendre : Mettre à niveau les contrats intelligents](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Documentation OpenZeppelin
- [Modèles de proxy pour la capacité de mise à niveau des contrats Solidity : Proxys transparents vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) par Naveen Sahu
- [Comment fonctionnent les mises à niveau diamant](https://dev.to/mudgen/how-diamond-upgrades-work-417j) par Nick Mudge