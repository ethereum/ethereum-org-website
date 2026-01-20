---
title: Directives de sécurité pour les contrats intelligents
description: Une liste de contrôle des consignes de sécurité à prendre en compte lors de la création de votre DApp
author: "Trailofbits"
tags: [ "solidité", "contrats intelligents", "sécurité" ]
skill: intermediate
lang: fr
published: 06/09/2020
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Suivez ces recommandations de haut niveau pour établir des contrats intelligents plus sécurisés.

## Directives de conception {#design-guidelines}

La conception du contrat doit être discutée à l'avance, avant de rédiger une ligne de code.

### Documentation et spécifications {#documentation-and-specifications}

La documentation peut être écrite à différents niveaux et devrait être mise à jour lors de l'implémentation des contrats :

- **Une description simple du système**, décrivant ce que font les contrats et les hypothèses concernant la base de code.
- **Schémas et diagrammes d'architecture**, incluant les interactions entre contrats et la machine à états du système. [Les imprimantes de Slither](https://github.com/crytic/slither/wiki/Printer-documentation) peuvent vous aider à générer ces schémas.
- **Documentation de code approfondie**, le format [Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) peut être utilisé pour Solidity.

### Calcul en chaîne ou hors chaîne {#onchain-vs-offchain-computation}

- **Gardez autant de code que possible hors chaîne.** Gardez la couche en chaîne de petite taille. Prétraitez les données avec du code hors chaîne de manière à ce que la vérification en chaîne soit simple. Avez-vous besoin d'une liste ordonnée ? Trier la liste hors chaîne, puis ne vérifier que son ordre en chaîne.

### Évolutivité {#upgradeability}

Nous avons abordé les différentes solutions d'évolutivité dans [notre article de blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Faites un choix délibéré de prendre en charge la possibilité de mise à niveau ou non avant de rédiger un code. La décision influencera la façon dont vous structurerez notre code. En général, nous recommandons :

- **Privilégiez la [migration de contrat](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) plutôt que l'évolutivité.** Les systèmes de migration présentent bon nombre des mêmes avantages que les systèmes évolutifs, sans leurs inconvénients.
- **Utilisez le modèle de séparation des données plutôt que celui de delegatecallproxy.** Si votre projet présente une séparation claire de l'abstraction, l'évolutivité utilisant la séparation des données ne nécessitera que quelques ajustements. Le delegatecallproxy nécessite une expertise EVM et est très exposé aux erreurs.
- **Documentez la procédure de migration/mise à niveau avant le déploiement.** Si vous devez réagir dans l'urgence sans directives, vous ferez des erreurs. Écrivez la procédure à suivre à l'avance. Cela devrait inclure :
  - Les appels qui initient les nouveaux contrats
  - Où sont stockées les clés et comment y accéder
  - Comment vérifier le déploiement ! Développez et testez un script de post-déploiement.

## Directives d'implémentation {#implementation-guidelines}

**Recherchez la simplicité.** Utilisez toujours la solution la plus simple et adaptée à votre objectif. Tout membre de votre équipe devrait être en mesure de comprendre votre solution.

### Composition de fonctions {#function-composition}

L'architecture de votre code de base devrait rendre votre code facile à vérifier. Évitez les choix architecturaux qui réduisent la capacité à raisonner sur son exactitude.

- **Divisez la logique de votre système**, soit à travers plusieurs contrats, soit en regroupant des fonctions similaires (par exemple, l'authentification, l'arithmétique, etc.).
- **Écrivez des fonctions courtes avec un objectif clair.** Cela facilitera la revue et permettra de tester les composants individuels.

### Héritage {#inheritance}

- **Maintenez l'héritage gérable.** L'héritage doit être utilisé pour diviser la logique, cependant, votre projet doit viser à minimiser la profondeur et la largeur de l'arborescence d'héritage.
- **Utilisez l'[imprimante d'héritage](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) de Slither pour vérifier la hiérarchie des contrats.** L'imprimante d'héritage vous aidera à examiner la taille de la hiérarchie.

### Événements {#events}

- **Journalisez toutes les opérations cruciales.** Les événements vous aideront à déboguer le contrat pendant le développement et à le surveiller après le déploiement.

### Évitez les pièges connus {#avoid-known-pitfalls}

- **Soyez conscient des problèmes de sécurité les plus courants.** Il existe de nombreuses ressources en ligne pour en apprendre davantage sur les problèmes courants, telles que [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) ou [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Prenez connaissance des sections d'avertissement dans la [documentation de Solidity](https://docs.soliditylang.org/en/latest/).** Les sections d'avertissement vous informeront sur les comportements non évidents du langage.

### Dépendances {#dependencies}

- **Utilisez des bibliothèques bien testées.** L'importation de code à partir de bibliothèques bien testées réduira la probabilité d'écrire du code bogué. Si vous voulez écrire un contrat ERC20, utilisez [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Utilisez un gestionnaire de dépendances ; évitez de copier-coller du code.** Si vous dépendez d'une source externe, vous devez la maintenir à jour par rapport à la source d'origine.

### Test et vérification {#testing-and-verification}

- **Rédigez des tests unitaires approfondis.** Une suite de tests complète est essentielle pour créer un logiciel de haute qualité.
- **Rédigez des vérifications et des propriétés personnalisées pour [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) et [Manticore](https://github.com/trailofbits/manticore).** Les outils automatisés vous aideront à garantir la sécurité de votre contrat. Examinez le reste de ce guide pour savoir comment écrire des vérifications et des propriétés efficaces.
- **Utilisez [crytic.io](https://crytic.io/).** Crytic s'intègre à GitHub, fournit un accès à des détecteurs Slither privés et exécute des vérifications de propriétés personnalisées à partir d'Echidna.

### Solidity {#solidity}

- **Privilégiez Solidity 0.5 par rapport aux versions 0.4 et 0.6.** À notre avis, Solidity 0.5 est plus sécurisé et intègre de meilleures pratiques que la version 0.4. Solidity 0.6 s'est révélée trop instable pour la production et a besoin de temps pour se développer.
- **Utilisez une version stable pour la compilation ; utilisez la dernière version pour vérifier les avertissements.** Vérifiez que votre code ne présente aucun problème signalé avec la dernière version du compilateur. Cependant, Solidity a un cycle de publication rapide et un historique de bogues du compilateur, nous ne recommandons donc pas la dernière version pour le déploiement (voir la [recommandation de version solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) de Slither).
- **N'utilisez pas l'assembly en ligne.** L'assembly nécessite une expertise de l'EVM. N'écrivez pas de code EVM si vous ne _maîtrisez_ pas le Livre jaune.

## Directives de déploiement {#deployment-guidelines}

Une fois le contrat développé et déployé :

- **Surveillez vos contrats.** Surveillez les journaux et soyez prêt à réagir en cas de compromission d'un contrat ou d'un portefeuille.
- **Ajoutez vos coordonnées à [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Cette liste aide les tierces parties à vous contacter si une faille de sécurité est découverte.
- **Sécurisez les portefeuilles des utilisateurs à privilèges.** Suivez nos [meilleures pratiques](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) si vous stockez des clés dans des portefeuilles matériels.
- **Ayez un plan d'intervention en cas d'incident.** Tenez compte du fait que vos contrats intelligents peuvent être compromis. Même si vos contrats sont exempts de bogues, un attaquant peut prendre le contrôle des clés du propriétaire du contrat.
