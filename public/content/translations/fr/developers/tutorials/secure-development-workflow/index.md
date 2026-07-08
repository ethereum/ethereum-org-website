---
title: "Liste de contrôle de sécurité des contrats intelligents"
description: "Un flux de travail suggéré pour écrire des contrats intelligents sécurisés"
author: "Trailofbits"
tags: ["contrats intelligents", "sécurité", "Solidity"]
skill: intermediate
breadcrumb: "Liste de contrôle de sécurité"
lang: fr
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Liste de contrôle pour le développement de contrats intelligents {#smart-contract-development-checklist}

Voici un processus de haut niveau que nous recommandons de suivre lors de la rédaction de vos contrats intelligents.

Vérifiez les problèmes de sécurité connus :

- Révisez vos contrats avec [Slither](https://github.com/crytic/slither). Il possède plus de 40 détecteurs intégrés pour les vulnérabilités courantes. Exécutez-le à chaque validation de nouveau code et assurez-vous d'obtenir un rapport vierge (ou utilisez le mode triage pour ignorer certains problèmes).
- Révisez vos contrats avec [Crytic](https://crytic.io/). Il vérifie 50 problèmes que Slither ne détecte pas. Crytic peut également aider votre équipe à rester synchronisée, en mettant facilement en évidence les problèmes de sécurité dans les Pull Requests sur GitHub.

Prenez en compte les fonctionnalités spécifiques de votre contrat :

- Vos contrats sont-ils évolutifs ? Révisez votre code de mise à niveau pour détecter les failles avec [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) ou [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Nous avons documenté 17 façons dont les mises à niveau peuvent mal tourner.
- Vos contrats prétendent-ils être conformes aux normes ERC ? Vérifiez-les avec [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Cet outil identifie instantanément les écarts par rapport à six spécifications courantes.
- Intégrez-vous des jetons tiers ? Consultez notre [liste de contrôle d'intégration de jetons](/developers/tutorials/token-integration-checklist/) avant de vous fier à des contrats externes.

Inspectez visuellement les fonctionnalités de sécurité critiques de votre code :

- Examinez l'imprimante [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) de Slither. Évitez les problèmes de masquage (shadowing) par inadvertance et de linéarisation C3.
- Examinez l'imprimante [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) de Slither. Elle signale la visibilité des fonctions et les contrôles d'accès.
- Examinez l'imprimante [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) de Slither. Elle signale les contrôles d'accès sur les variables d'état.

Documentez les propriétés de sécurité critiques et utilisez des générateurs de tests automatisés pour les évaluer :

- Apprenez à [documenter les propriétés de sécurité de votre code](/developers/tutorials/guide-to-smart-contract-security-tools/). C'est difficile au début, mais c'est l'activité la plus importante pour obtenir un bon résultat. C'est également une condition préalable à l'utilisation de l'une des techniques avancées de ce tutoriel.
- Définissez les propriétés de sécurité dans Solidity, pour les utiliser avec [Echidna](https://github.com/crytic/echidna) et [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentrez-vous sur votre machine d'état, les contrôles d'accès, les opérations arithmétiques, les interactions externes et la conformité aux normes.
- Définissez les propriétés de sécurité avec [l'API Python de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentrez-vous sur l'héritage, les dépendances de variables, les contrôles d'accès et d'autres problèmes structurels.
- Exécutez vos tests de propriétés à chaque commit avec [Crytic](https://crytic.io). Crytic peut consommer et évaluer les tests de propriétés de sécurité afin que tous les membres de votre équipe puissent facilement voir qu'ils réussissent sur GitHub. Les tests qui échouent peuvent bloquer les commits.

Enfin, soyez attentif aux problèmes que les outils automatisés ne peuvent pas facilement trouver :

- Manque de confidentialité : tout le monde peut voir vos transactions pendant qu'elles sont en attente dans le pool
- Transactions de type front-running
- Opérations cryptographiques
- Interactions risquées avec des composants externes de la finance décentralisée (DeFi)

## Demander de l'aide {#ask-for-help}

Les [heures de permanence d'Ethereum](https://calendly.com/dan-trailofbits/office-hours) ont lieu tous les mardis après-midi. Ces sessions individuelles d'une heure sont l'occasion de nous poser toutes vos questions sur la sécurité, de résoudre des problèmes à l'aide de nos outils et d'obtenir les commentaires d'experts sur votre approche actuelle. Nous vous aiderons à parcourir ce guide.

Rejoignez notre Slack : [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Nous sommes toujours disponibles dans les canaux #crytic et #ethereum si vous avez des questions.