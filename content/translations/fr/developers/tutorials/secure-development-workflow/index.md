---
title: Liste de contrôle de sécurité des contrats intelligents
description: Un flux de travail suggéré pour la rédaction de contrats intelligents sécurisés
author: "Trailofbits"
tags:
  - "contrats intelligents"
  - "sécurité"
  - "solidity"
skill: intermediate
lang: fr
published: 2020-09-07
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Liste de contrôle pour le développement de contrats intelligents {#smart-contract-development-checklist}

Voici un processus de haut niveau que nous vous recommandons de suivre lors de la rédaction de vos contrats intelligents.

Recherchez les vulnérabilités connues :

- Vérifiez vos contrats avec [Slither](https://github.com/crytic/slither). Cet outil intègre plus de 40 détecteurs pour les vulnérabilités connues. Exécutez-le à chaque enregistrement d'un nouveau code et assurez-vous que son rapport soit positif (ou utilisez le mode triage pour mettre sous silence certains problèmes).
- Vérifiez vos contrats avec [Crytic](https://crytic.io/). Il vérifie 50 vulnérabilités que Slither ne détecte pas. Cryptic peut également aider votre équipe à rester le maître du jeu en faisant apparaître facilement les problèmes de sécurité dans les Pull Requests sur GitHub.

Considérez les caractéristiques spéciales de votre contrat :

- Vos contrats sont-ils évolutifs ? Vérifiez votre code de mise à niveau pour les défauts avec [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) ou [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Nous avons documenté 17 façons dont les mises à niveau peuvent mal tourner.
- Est-ce que vos contrats doivent se conformer aux ERC? Vérifiez-les avec [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Cet outil identifie instantanément les écarts de six spécifications courantes.
- Avez-vous des tests unitaires dans Truffe ? Enrichissez-les avec [`slither-prop`](https://github.com/crytic/slither/wiki/Property-generation). Il génère automatiquement une suite de propriétés de sécurité robustes pour les fonctionnalités de l'ERC20 en fonction de votre code spécifique.
- Intégrez-vous des jetons tiers ? Consultez notre [liste de contrôle d'intégration de jetons](/developers/tutorials/token-integration-checklist/) avant de vous fier à des contrats externes.

Inspectez visuellement les fonctions de sécurité critiques de votre code :

- Examinez l'afficheur [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) de Slither. Évitez les surcharges involontaires et les problèmes de linéarisation C3.
- Examinez l'afficheur [résumé de fonction](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) de Slither. Il signale la visibilité des fonctions et les contrôles d'accès.
- Examinez l'afficheur [variables et accès](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) de Slither. Il signale les contrôles d'accès aux variables d'état.

Documentez les propriétés critiques de sécurité et utilisez des générateurs de tests automatisés pour les évaluer :

- Apprenez à [documenter les propriétés de sécurité de votre code](/developers/tutorials/guide-to-smart-contract-security-tools/). C'est difficile au départ, mais c'est l'activité la plus importante pour obtenir un bon résultat. C'est également un prérequis à l'utilisation des techniques avancées de ce tutoriel.
- Definissez les propriétés de sécurité en Solidity, pour les utiliser avec [Echidna](https://github.com/crytic/echidna) et [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentrez-vous sur votre automate, les contrôles d'accès, les opérations arithmétiques, les interactions externes et la conformité aux normes.
- Définissez les propriétés de sécurité avec [l'API Python de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentrez-vous sur l'héritage, les dépendances des variables, les contrôles d'accès et d'autres problèmes structurels.
- Exécutez vos tests de propriété sur chaque commit avec [Crytic](https://crytic.io). Crytic peut consommer et évaluer les tests de propriétés de sécurité pour que tout le monde dans votre équipe puisse facilement voir qu'ils passent sur GitHub. Les tests en échec peuvent bloquer les commits.

Enfin, soyez attentifs aux problèmes que les outils automatisés ne peuvent pas facilement trouver :

- Manque de confidentialité: tout le monde peut voir vos transactions pendant qu'elles sont mises en file d'attente dans le pool
- Vol de priorité des transactions
- Opérations cryptographiques
- Interactions risquées avec les composants DeFi externes

## Demandez de l'aide {#ask-for-help}

[Les heures de bureau d'Ethereum](https://calendly.com/dan-trailofbits/ethereum-office-hours) se déroulent tous les mardis après-midi. Ces sessions en tête à tête sont l'occasion de nous poser toutes vos questions sur la sécurité, de dépannage à l'aide de nos outils et d'obtenir des commentaires d'experts sur votre approche actuelle. Nous vous aiderons à travailler à travers ce guide.

Rejoignez notre Slack : [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Nous sommes toujours disponibles dans les canaux #crytic et #ethereum si vous avez des questions.
