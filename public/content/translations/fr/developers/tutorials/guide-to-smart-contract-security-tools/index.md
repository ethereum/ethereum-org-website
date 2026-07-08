---
title: "Un guide sur les outils de sécurité des contrats intelligents"
description: "Un aperçu de trois différentes techniques de test et d'analyse de programme"
author: "Trailofbits"
lang: fr
tags: ["Solidity", "contrats intelligents", "sécurité"]
skill: intermediate
breadcrumb: "Outils de sécurité"
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Nous allons utiliser trois techniques distinctes de test et d'analyse de programme :

- **Analyse statique avec [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Tous les chemins du programme sont approximés et analysés en même temps, à travers différentes présentations du programme (par ex., graphe de flux de contrôle).
- **Fuzzing avec [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Le code est exécuté avec une génération pseudo-aléatoire de transactions. Le fuzzer tentera de trouver une séquence de transactions pour violer une propriété donnée.
- **Exécution symbolique avec [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Une technique de vérification formelle, qui traduit chaque chemin d'exécution en une formule mathématique, sur laquelle des contraintes peuvent être vérifiées.

Chaque technique a ses avantages et ses inconvénients, et sera utile dans des [cas spécifiques](#determining-security-properties) :

| Technique | Outil | Utilisation | Vitesse | Bugs manqués | Fausses alertes |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Analyse statique | Slither | CLI et scripts | secondes | modéré | faible |
| Fuzzing | Echidna | Propriétés Solidity | minutes | faible | aucune |
| Exécution symbolique | Manticore | Propriétés Solidity et scripts | heures | aucun\* | aucune |

\* si tous les chemins sont explorés sans dépassement de temps (timeout)

**Slither** analyse les contrats en quelques secondes, cependant, l'analyse statique peut conduire à de fausses alertes et sera moins adaptée aux vérifications complexes (par ex., les vérifications arithmétiques). Exécutez Slither via l'API pour un accès en un clic aux détecteurs intégrés ou via l'API pour des vérifications définies par l'utilisateur.

**Echidna** doit s'exécuter pendant plusieurs minutes et ne produira que de vrais positifs. Echidna vérifie les propriétés de sécurité fournies par l'utilisateur, écrites en Solidity. Il peut manquer des bugs car il est basé sur une exploration aléatoire.

**Manticore** effectue l'analyse la plus « lourde ». Tout comme Echidna, Manticore vérifie les propriétés fournies par l'utilisateur. Il aura besoin de plus de temps pour s'exécuter, mais il peut prouver la validité d'une propriété et ne signalera pas de fausses alertes.

## Flux de travail suggéré {#suggested-workflow}

Commencez par les détecteurs intégrés de Slither pour vous assurer qu'aucun bug simple n'est présent actuellement ou ne sera introduit plus tard. Utilisez Slither pour vérifier les propriétés liées à l'héritage, aux dépendances de variables et aux problèmes structurels. À mesure que la base de code s'agrandit, utilisez Echidna pour tester des propriétés plus complexes de la machine d'état. Revenez à Slither pour développer des vérifications personnalisées pour des protections non disponibles dans Solidity, comme la protection contre la surcharge d'une fonction. Enfin, utilisez Manticore pour effectuer une vérification ciblée des propriétés de sécurité critiques, par ex., les opérations arithmétiques.

- Utilisez la CLI de Slither pour détecter les problèmes courants
- Utilisez Echidna pour tester les propriétés de sécurité de haut niveau de votre contrat
- Utilisez Slither pour écrire des vérifications statiques personnalisées
- Utilisez Manticore lorsque vous souhaitez une assurance approfondie des propriétés de sécurité critiques

**Une note sur les tests unitaires**. Les tests unitaires sont nécessaires pour créer des logiciels de haute qualité. Cependant, ces techniques ne sont pas les mieux adaptées pour trouver des failles de sécurité. Elles sont généralement utilisées pour tester les comportements positifs du code (c'est-à-dire que le code fonctionne comme prévu dans un contexte normal), tandis que les failles de sécurité ont tendance à résider dans des cas limites que les développeurs n'ont pas pris en compte. Dans notre étude de dizaines d'audits de sécurité de contrats intelligents, [la couverture des tests unitaires n'a eu aucun effet sur le nombre ou la gravité des failles de sécurité](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que nous avons trouvées dans le code de nos clients.

## Déterminer les propriétés de sécurité {#determining-security-properties}

Pour tester et vérifier efficacement votre code, vous devez identifier les zones qui nécessitent de l'attention. Étant donné que vos ressources consacrées à la sécurité sont limitées, il est important de cibler les parties faibles ou de grande valeur de votre base de code pour optimiser vos efforts. La modélisation des menaces peut vous aider. Pensez à consulter :

- [Évaluations rapides des risques](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (notre approche préférée lorsque le temps presse)
- [Guide de modélisation des menaces des systèmes centrés sur les données](https://csrc.nist.gov/pubs/sp/800/154/ipd) (alias NIST 800-154)
- [Modélisation des menaces de Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Utilisation des assertions](https://blog.regehr.org/archives/1091)

### Composants {#components}

Savoir ce que vous souhaitez vérifier vous aidera également à sélectionner le bon outil.

Les grands domaines qui sont fréquemment pertinents pour les contrats intelligents incluent :

- **Machine d'état.** La plupart des contrats peuvent être représentés comme une machine d'état. Pensez à vérifier que (1) aucun état invalide ne peut être atteint, (2) si un état est valide, il peut être atteint, et (3) aucun état ne piège le contrat.

  - Echidna et Manticore sont les outils à privilégier pour tester les spécifications de la machine d'état.

- **Contrôles d'accès.** Si votre système a des utilisateurs privilégiés (par ex., un propriétaire, des contrôleurs, ...), vous devez vous assurer que (1) chaque utilisateur ne peut effectuer que les actions autorisées et (2) aucun utilisateur ne peut bloquer les actions d'un utilisateur plus privilégié.

  - Slither, Echidna et Manticore peuvent vérifier l'exactitude des contrôles d'accès. Par exemple, Slither peut vérifier que seules les fonctions sur liste blanche sont dépourvues du modificateur onlyOwner. Echidna et Manticore sont utiles pour des contrôles d'accès plus complexes, comme une permission accordée uniquement si le contrat atteint un état donné.

- **Opérations arithmétiques.** Vérifier la justesse des opérations arithmétiques est essentiel. Utiliser `SafeMath` partout est une bonne étape pour prévenir les dépassements de capacité, cependant, vous devez toujours prendre en compte d'autres failles arithmétiques, y compris les problèmes d'arrondi et les failles qui piègent le contrat.

  - Manticore est le meilleur choix ici. Echidna peut être utilisé si l'arithmétique est hors de portée du solutionneur SMT.

- **Exactitude de l'héritage.** Les contrats Solidity s'appuient fortement sur l'héritage multiple. Des erreurs telles qu'une fonction masquée manquant d'un appel `super` et un ordre de linéarisation C3 mal interprété peuvent facilement être introduites.

  - Slither est l'outil pour assurer la détection de ces problèmes.

- **Interactions externes.** Les contrats interagissent les uns avec les autres, et certains contrats externes ne devraient pas être dignes de confiance. Par exemple, si votre contrat s'appuie sur des oracles externes, restera-t-il sécurisé si la moitié des oracles disponibles sont compromis ?

  - Manticore et Echidna sont le meilleur choix pour tester les interactions externes avec vos contrats. Manticore dispose d'un mécanisme intégré pour simuler des contrats externes.

- **Conformité aux standards.** Les standards Ethereum (par ex., ERC-20) ont un historique de failles dans leur conception. Soyez conscient des limites du standard sur lequel vous vous basez.
  - Slither, Echidna et Manticore vous aideront à détecter les écarts par rapport à un standard donné.

### Aide-mémoire pour la sélection des outils {#tool-selection-cheatsheet}

| Composant | Outils | Exemples |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Machine d'état | Echidna, Manticore |
| Contrôle d'accès | Slither, Echidna, Manticore | [Exercice Slither 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Exercice Echidna 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Opérations arithmétiques | Manticore, Echidna | [Exercice Echidna 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Exercices Manticore 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Exactitude de l'héritage | Slither | [Exercice Slither 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Interactions externes | Manticore, Echidna |
| Conformité aux standards | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

D'autres domaines devront être vérifiés en fonction de vos objectifs, mais ces grands axes de concentration constituent un bon point de départ pour tout système de contrats intelligents.

Nos audits publics contiennent des exemples de propriétés vérifiées ou testées. Pensez à lire les sections `Automated Testing and Verification` des rapports suivants pour examiner des propriétés de sécurité en conditions réelles :

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)