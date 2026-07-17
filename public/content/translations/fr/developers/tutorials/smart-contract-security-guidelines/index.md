---
title: "Directives de sécurité des contrats intelligents"
description: "Une liste de contrôle des directives de sécurité à prendre en compte lors de la création de votre dapp"
author: "Trailofbits"
tags: ["Solidity", "contrats intelligents", "sécurité"]
skill: intermediate
breadcrumb: "Directives de sécurité"
lang: fr
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Suivez ces recommandations de haut niveau pour créer des contrats intelligents plus sécurisés.

## Directives de conception {#design-guidelines}

La conception du contrat doit être discutée à l'avance, avant d'écrire la moindre ligne de code.

### Documentation et spécifications {#documentation-and-specifications}

La documentation peut être rédigée à différents niveaux et doit être mise à jour lors de la mise en œuvre des contrats :

- **Une description en langage clair du système**, décrivant ce que font les contrats et toutes les hypothèses sur la base de code.
- **Schémas et diagrammes architecturaux**, incluant les interactions du contrat et la machine d'état du système. Les [imprimantes Slither](https://github.com/crytic/slither/wiki/Printer-documentation) peuvent aider à générer ces schémas.
- **Une documentation approfondie du code**, le [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html) peut être utilisé pour Solidity.

### Calcul onchain vs hors chaîne {#onchain-vs-offchain-computation}

- **Gardez autant de code que possible hors chaîne.** Gardez la couche onchain petite. Pré-traitez les données avec du code hors chaîne de manière à ce que la vérification onchain soit simple. Avez-vous besoin d'une liste ordonnée ? Triez la liste hors chaîne, puis vérifiez uniquement son ordre onchain.

### Mise à niveau {#upgradeability}

Nous avons discuté des différentes solutions de mise à niveau dans [notre article de blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Faites un choix délibéré de prendre en charge ou non la mise à niveau avant d'écrire le moindre code. Cette décision influencera la façon dont vous structurez votre code. En général, nous recommandons :

- **De privilégier la [migration de contrat](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) plutôt que la mise à niveau.** Les systèmes de migration présentent bon nombre des mêmes avantages que les systèmes pouvant être mis à niveau, sans leurs inconvénients.
- **D'utiliser le modèle de séparation des données plutôt que celui du proxy delegatecall.** Si votre projet a une séparation d'abstraction claire, la mise à niveau utilisant la séparation des données ne nécessitera que quelques ajustements. Le proxy delegatecall nécessite une expertise de l'EVM et est très sujet aux erreurs.
- **De documenter la procédure de migration/mise à niveau avant le déploiement.** Si vous devez réagir sous l'effet du stress sans aucune directive, vous ferez des erreurs. Rédigez la procédure à suivre à l'avance. Elle devrait inclure :
  - Les appels qui initient les nouveaux contrats
  - Où sont stockées les clés et comment y accéder
  - Comment vérifier le déploiement ! Développez et testez un script post-déploiement.

## Directives d'implémentation {#implementation-guidelines}

**Recherchez la simplicité.** Utilisez toujours la solution la plus simple qui correspond à votre objectif. N'importe quel membre de votre équipe devrait être capable de comprendre votre solution.

### Composition des fonctions {#function-composition}

L'architecture de votre base de code doit rendre votre code facile à réviser. Évitez les choix architecturaux qui diminuent la capacité à raisonner sur son exactitude.

- **Divisez la logique de votre système**, soit à travers plusieurs contrats, soit en regroupant des fonctions similaires (par exemple, l'authentification, l'arithmétique, ...).
- **Écrivez de petites fonctions, avec un objectif clair.** Cela facilitera la révision et permettra de tester les composants individuels.

### Héritage {#inheritance}

- **Gardez l'héritage gérable.** L'héritage doit être utilisé pour diviser la logique, cependant, votre projet doit viser à minimiser la profondeur et la largeur de l'arbre d'héritage.
- **Utilisez l'[imprimante d'héritage](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) de Slither pour vérifier la hiérarchie des contrats.** L'imprimante d'héritage vous aidera à examiner la taille de la hiérarchie.

### Événements {#events}

- **Journalisez toutes les opérations cruciales.** Les événements aideront à déboguer le contrat pendant le développement et à le surveiller après le déploiement.

### Éviter les pièges connus {#avoid-known-pitfalls}

- **Soyez conscient des problèmes de sécurité les plus courants.** Il existe de nombreuses ressources en ligne pour en apprendre davantage sur les problèmes courants, telles que [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) ou [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Soyez attentif aux sections d'avertissement dans la [documentation de Solidity](https://docs.soliditylang.org/en/latest/).** Les sections d'avertissement vous informeront sur les comportements non évidents du langage.

### Dépendances {#dependencies}

- **Utilisez des bibliothèques bien testées.** L'importation de code à partir de bibliothèques bien testées réduira la probabilité que vous écriviez du code bogué. Si vous souhaitez écrire un contrat ERC-20, utilisez [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Utilisez un gestionnaire de dépendances ; évitez de copier-coller du code.** Si vous vous appuyez sur une source externe, vous devez alors la maintenir à jour avec la source d'origine.

### Tests et vérification {#testing-and-verification}

- **Écrivez des tests unitaires approfondis.** Une suite de tests exhaustive est cruciale pour créer des logiciels de haute qualité.
- **Écrivez des vérifications et des propriétés personnalisées pour [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) et [Manticore](https://github.com/trailofbits/manticore).** Les outils automatisés aideront à garantir la sécurité de votre contrat. Consultez le reste de ce guide pour apprendre à écrire des vérifications et des propriétés efficaces.
- **Utilisez [crytic.io](https://crytic.io/).** Crytic s'intègre à GitHub, donne accès à des détecteurs Slither privés et exécute des vérifications de propriétés personnalisées à partir d'Echidna.

### Solidity {#solidity}

- **Privilégiez Solidity 0.5 par rapport à 0.4 et 0.6.** À notre avis, Solidity 0.5 est plus sécurisé et possède de meilleures pratiques intégrées que 0.4. Solidity 0.6 s'est avéré trop instable pour la production et a besoin de temps pour mûrir.
- **Utilisez une version stable pour compiler ; utilisez la dernière version pour vérifier les avertissements.** Vérifiez que votre code ne présente aucun problème signalé avec la dernière version du compilateur. Cependant, Solidity a un cycle de publication rapide et un historique de bogues de compilateur, nous ne recommandons donc pas la dernière version pour le déploiement (voir la [recommandation de version solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) de Slither).
- **N'utilisez pas d'assembleur en ligne.** L'assembleur nécessite une expertise de l'EVM. N'écrivez pas de code EVM si vous ne _maîtrisez_ pas le livre jaune.

## Directives de déploiement {#deployment-guidelines}

Une fois que le contrat a été développé et déployé :

- **Surveillez vos contrats.** Observez les journaux et soyez prêt à réagir en cas de compromission du contrat ou du portefeuille.
- **Ajoutez vos coordonnées à [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Cette liste aide les tiers à vous contacter si une faille de sécurité est découverte.
- **Sécurisez les portefeuilles des utilisateurs privilégiés.** Suivez nos [bonnes pratiques](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) si vous stockez des clés dans des portefeuilles matériels.
- **Ayez un plan de réponse aux incidents.** Considérez que vos contrats intelligents peuvent être compromis. Même si vos contrats sont exempts de bogues, un attaquant peut prendre le contrôle des clés du propriétaire du contrat.