---
title: Directives de sécurité pour les contrats intelligents
description: Une liste de contrôle des consignes de sécurité à prendre en compte lors de la création de votre DApp
author: "Trailofbits"
tags:
  - "solidity"
  - "contrats intelligents"
  - "sécurité"
skill: intermediate
lang: fr
published: 2020-09-06
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Suivez ces recommandations de haut niveau pour établir des contrats intelligents plus sécurisés.

## Directives de conception {#design-guidelines}

La conception du contrat doit être discutée à l'avance, avant de rédiger une ligne de code.

### Documentation et spécifications {#documentation-and-specifications}

La documentation peut être écrite à différents niveaux et devrait être mise à jour lors de l'implémentation des contrats :

- **Une description simple du système en anglais**, décrivant ce que font les contrats et toutes hypothèses sur le code base.
- **Schéma et diagrammes architecturaux**, y compris les interactions contractuelles et la machine d'état du système. [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) peut aider à générer ces schémas.
- **Documentation de code approfondi**, le [format Natspec](https://solidity.readthedocs.io/en/develop/natspec-format.html) peut être utilisé pour Solidity.

### Calcul On-chain vs Off-chain {#on-chain-vs-off-chain-computation}

- **Conserver le plus de code que vous pouvez hors chaîne.** Garder la couche en chaîne petite. Pré-traiter les données avec du code hors chaîne de telle façon que la vérification en chaîne soit simple. Avez-vous besoin d'une liste ordonnée ? Trier la liste hors chaîne, puis ne vérifier que son ordre en chaîne.

### Mise à jour {#upgradeability}

Nous avons discuté des différentes solutions de mise à niveau dans [notre blogpost](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Faites un choix délibéré de prendre en charge la possibilité de mise à niveau ou non avant de rédiger un code. La décision influencera la façon dont vous structurerez notre code. En général, nous recommandons :

- **Favoriser [la migration de contract](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) plutôt que la mise à niveau.** Le système de migration présente bon nombre des mêmes avantages que l'évolutif, sans ses inconvénients.
- **Utilisation du modèle de séparation des données par rapport à celui du delegatecallproxy.** Si votre projet a une séparation d'abstraction claire, la possibilité de mise à niveau à l'aide de la séparation des données ne nécessitera que quelques ajustements. Le delegatecallproxy nécessite une expertise EVM et est très exposé aux erreurs.
- **Documentez la procédure de migration/mise à niveau avant le déploiement.** Si vous devez réagir sous pression sans aucune instructions, vous ferez des erreurs. Écrivez la procédure à suivre à l'avance. Cela devrait inclure :
  - Les appels qui initient les nouveaux contrats
  - Où sont stockées les clés et comment y accéder
  - Comment vérifier le déploiement ! Développez et testez un script de post-déploiement.

## Directives d'exécution {#implementation-guidelines}

**Opter pour la simplicité.** Utilisez toujours la solution la plus simple qui correspond à votre but. Tout membre de votre équipe devrait être en mesure de comprendre votre solution.

### Composition de la fonction {#function-composition}

L'architecture de votre code de base devrait rendre votre code facile à vérifier. Évitez les choix architecturaux qui réduisent la capacité à raisonner sur son exactitude.

- **Séparer la logique de votre système**, soit par des contrats multiples, soit en regroupant des fonctions similaires (par exemple, authentification, arithmétique, ...).
- **Écrire de petites fonctions, avec un objectif clair.** Cela facilitera la révision et permettra le test de composantes individuelles.

### Héritage {#inheritance}

- **Gardez l'héritage gérable.** L'héritage doit être utilisé pour diviser la logique, cependant, votre projet devrait viser à minimiser la profondeur et la largeur de l'arbre d'héritage.
- **Utilisez l'imprimante [d'héritage de Slither](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) pour vérifier la hiérarchie des contrats.** L'imprimante d'héritage vous aidera à revoir la taille de la hiérarchie.

### Événements {#events}

- **Enregistre toutes les opérations cruciales.** Les événements aideront à déboguer le contrat pendant le développement, et à le surveiller après le déploiement.

### Éviter les pièges connus {#avoid-known-pitfalls}

- **Soyez conscient des problèmes de sécurité les plus courants.** Il existe beaucoup de ressources en ligne à apprendre sur les problèmes communs, tels que [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capturez l'Ether](https://capturetheether.com/), ou [Les contrats Not-so-smart](https://github.com/crytic/not-so-smart-contracts/).
- **Soyez conscient des sections d'avertissements dans la [documentation Solidity](https://solidity.readthedocs.io/en/latest/).** Les sections d'avertissements vous informeront du comportement non-évident du langage.

### Dépendances {#dependencies}

- **Utilisez des bibliothèques logicielles bien testées.** Importer du code depuis des bibliothèques bien testées réduira la probabilité d'écrire du code bogué. Si vous voulez écrire un contrat ERC20, utilisez [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Utilisez un dependency manager; évitez le code copier-coller** Si vous comptez sur une source externe, vous devez la tenir à jour avec la source originale.

### Tests et vérification {#testing-and-verification}

- **Écrivez des tests unitaires approfondis.** Une suite de tests étendue est cruciale pour construire des logiciels de haute qualité.
- **Écrivez [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) et [Manticore](https://github.com/trailofbits/manticore) vérifications et propriétés personnalisées.** Des outils automatisés vous aideront à sécuriser votre contrat. Examinez le reste de ce guide pour savoir comment écrire des vérifications et des propriétés efficaces.
- **Utilisez [crytic.io](https://crytic.io/).** Crytic intégré avec GitHub, fournit un accès aux détecteurs privés de Slither et effectue des vérifications de propriétés personnalisées depuis Echidna.

### Solidity {#solidity}

- **Favoriser Solidity 0.5 plutôt que 0.4 et 0.6.** Selon nous, Solidity 0.5 est plus sécurisée et a de meilleures pratiques intégrées que 0.4. Solidity 0.6 s'est révélée trop instable pour la production et a besoin de temps pour se développer.
- **Utilisez une version stable pour la compilation ; utilisez la dernière version pour vérifier les avertissements.** Vérifiez que votre code n'a aucun problème rapporté avec la dernière version du compilateur. Cependant, Solidity a un cycle de publication rapide et a un historique de bogues du compilateur, donc nous ne recommandons pas la dernière version pour le déploiement (voir la [recommandation de version solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) de Slither ).
- **N'utilisez pas d'assemblage Inline.** L'assemblage nécessite une expertise EVM. N'écrivez pas de code EVM si vous n'avez pas maîtrisé _le Livre jaune_.

## Directives de déploiement {#deployment-guidelines}

Une fois le contrat développé et déployé :

- **Surveillez vos contrats.** Surveillez les logs et soyez prêt à réagir en cas de contrat ou de portefeuille compromis.
- **Ajoutez vos informations de contact à [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Cette liste aide des tiers à vous contacter si une faille de sécurité est découverte.
- **Sécurisez les portefeuilles d'utilisateurs privilégiés.** Suivez nos [meilleures pratiques](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) si vous stockez des clés dans des hardware wallets.
- **Ayez une réponse au plan d'incident.** Considérez que vos contrats intelligents peuvent être compromis. Même si vos contrats sont exempts de bogues, un attaquant peut prendre le contrôle des clés du propriétaire du contrat.
