---
title: "Un guide des outils de sécurité pour les contrats intelligents"
description: "Un aperçu de trois différentes techniques de test et d'analyse de programme"
author: "Trailofbits"
lang: fr
tags: [ "solidité", "contrats intelligents", "sécurité" ]
skill: intermediate
published: 2020-09-07
source: "Créer des contrats sécurisés"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Nous allons utiliser trois techniques de test et d'analyse de programme distinctes :

- **Analyse statique avec [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Tous les chemins du programme sont approchés et analysés en même temps, à travers différentes présentations du programme (p. ex., graphe de contrôle de flux)
- **Fuzzing avec [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Le code est exécuté avec une génération pseudo-aléatoire de transactions. Le fuzzer tentera de trouver une séquence de transactions pour violer une propriété donnée.
- **Exécution symbolique avec [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Une technique de vérification formelle qui traduit chaque chemin d'exécution en une formule mathématique, sur laquelle on pourra vérifier les contraintes.

Chaque technique a ses avantages et ses inconvénients, et sera utile dans des [cas spécifiques](#determining-security-properties) :

| Technique            | Outil     | Utilisation                    | Rapidité  | Bogues manqués | Faux positifs |
| -------------------- | --------- | ------------------------------ | --------- | -------------- | ------------- |
| Analyse statique     | Slither   | CLI et scripts                 | secondes  | modéré         | faible        |
| Fuzzing              | Echidna   | Propriétés Solidity            | minutes   | faible         | aucun         |
| Exécution symbolique | Manticore | Propriétés Solidity et scripts | en heures | aucun\*        | aucun         |

\* si tous les chemins sont explorés sans expiration de délai

**Slither** analyse les contrats en quelques secondes. Cependant, l'analyse statique peut générer des faux positifs et sera moins adaptée aux vérifications complexes (p. ex., les vérifications arithmétiques). Exécutez Slither via l'API pour un accès en un clic aux détecteurs intégrés ou via l'API pour des vérifications définies par l'utilisateur.

**Echidna** doit s'exécuter pendant plusieurs minutes et ne produit que de vrais positifs. Echidna vérifie les propriétés de sécurité fournies par l'utilisateur, écrites en Solidity. Il peut passer à côté de bogues, car il est basé sur une exploration aléatoire.

**Manticore** effectue l'analyse la plus poussée. Comme Echidna, Manticore vérifie les propriétés fournies par l'utilisateur. Son exécution prendra plus de temps, mais il peut prouver la validité d'une propriété et ne signalera pas de faux positifs.

## Flux de travail suggéré {#suggested-workflow}

Commencez par les détecteurs intégrés de Slither pour vous assurer qu'aucun bogue simple n'est présent ou ne sera introduit ultérieurement. Utilisez Slither pour vérifier les propriétés liées à l'héritage, aux dépendances entre les variables et aux problèmes structurels. À mesure que la base de code s'agrandit, utilisez Echidna pour tester les propriétés plus complexes de la machine d'état. Revenez à Slither pour développer des vérifications personnalisées pour des protections non disponibles dans Solidity, comme la protection contre la redéfinition d'une fonction. Enfin, utilisez Manticore pour effectuer une vérification ciblée des propriétés de sécurité critiques, p. ex., les opérations arithmétiques.

- Utilisez la CLI de Slither pour détecter les problèmes courants
- Utilisez Echidna pour tester les propriétés de sécurité de haut niveau de votre contrat
- Utilisez Slither pour écrire des vérifications statiques personnalisées
- Utilisez Manticore lorsque vous souhaitez une assurance approfondie des propriétés de sécurité critiques

**Remarque sur les tests unitaires**. Les tests unitaires sont nécessaires pour créer des logiciels de haute qualité. Cependant, ces techniques ne sont pas les plus adaptées pour trouver des failles de sécurité. Ils sont généralement utilisés pour tester les comportements positifs du code (c'est-à-dire que le code fonctionne comme prévu dans le contexte normal), tandis que les failles de sécurité ont tendance à se trouver dans des cas limites que les développeurs n'ont pas envisagés. Dans notre étude portant sur des dizaines d'audits de sécurité de contrats intelligents, [la couverture des tests unitaires n'a eu aucun effet sur le nombre ou la gravité des failles de sécurité](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que nous avons trouvées dans le code de nos clients.

## Détermination des propriétés de sécurité {#determining-security-properties}

Pour tester et vérifier efficacement votre code, vous devez identifier les zones qui nécessitent une attention particulière. Vos ressources en matière de sécurité étant limitées, il est important de cibler les parties faibles ou à forte valeur de votre base de code afin d'optimiser vos efforts. La modélisation des menaces peut vous aider. Envisagez de consulter :

- [Rapid Risk Assessments](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (notre approche privilégiée lorsque le temps est limité)
- [Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd) (alias NIST 800-154)
- [Shostack threat modeling](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Use of Assertions](https://blog.regehr.org/archives/1091)

### Composants {#components}

Savoir ce que vous voulez vérifier vous aidera également à sélectionner le bon outil.

Les grands domaines qui sont souvent pertinents pour les contrats intelligents sont les suivants :

- **Machine d'état.** La plupart des contrats peuvent être représentés comme une machine d'état. Envisagez de vérifier que (1) aucun état non valide ne peut être atteint, (2) si un état est valide, il peut être atteint, et (3) aucun état ne bloque le contrat.

  - Echidna et Manticore sont les outils à privilégier pour tester les spécifications des machines d'état.

- **Contrôles d'accès.** Si votre système a des utilisateurs privilégiés (p. ex., un propriétaire, des contrôleurs, etc.) vous devez vous assurer que (1) chaque utilisateur ne peut effectuer que les actions autorisées et (2) aucun utilisateur ne peut bloquer les actions d'un utilisateur plus privilégié.

  - Slither, Echidna et Manticore peuvent vérifier la correction des contrôles d'accès. Par exemple, Slither peut vérifier que seules les fonctions sur liste blanche n'ont pas le modificateur onlyOwner. Echidna et Manticore sont utiles pour un contrôle d'accès plus complexe, comme une autorisation accordée uniquement si le contrat atteint un état donné.

- **Opérations arithmétiques.** La vérification de la justesse des opérations arithmétiques est essentielle. L'utilisation de `SafeMath` partout est une bonne mesure pour empêcher les dépassements/soupassements de capacité. Cependant, vous devez toujours tenir compte des autres défauts arithmétiques, y compris les problèmes d'arrondi et les défauts qui bloquent le contrat.

  - Manticore est ici le meilleur choix. Echidna peut être utilisé si l'arithmétique est hors du champ d'application du solveur SMT.

- **Correction de l'héritage.** Les contrats Solidity reposent fortement sur l'héritage multiple. Des erreurs telles qu'une fonction masquée omettant un appel `super` et un ordre de linéarisation C3 mal interprété peuvent facilement être introduites.

  - Slither est l'outil qui permet de garantir la détection de ces problèmes.

- **Interactions externes.** Les contrats interagissent les uns avec les autres, et il ne faut pas faire confiance à certains contrats externes. Par exemple, si votre contrat dépend d'oracles externes, restera-t-il sécurisé si la moitié des oracles disponibles sont compromis ?

  - Manticore et Echidna sont le meilleur choix pour tester les interactions externes avec vos contrats. Manticore dispose d'un mécanisme intégré pour simuler les contrats externes.

- **Conformité aux standards.** Les standards Ethereum (p. ex., ERC20) ont un historique de failles dans leur conception. Soyez conscient des limites du standard sur lequel vous vous basez.
  - Slither, Echidna et Manticore vous aideront à détecter les écarts par rapport à un standard donné.

### Aide-mémoire de sélection d'outils {#tool-selection-cheatsheet}

| Composant                | Outils                      | Exemples                                                                                                                                                                                                                                                                      |
| ------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Machine d'état           | Echidna, Manticore          |                                                                                                                                                                                                                                                                               |
| Contrôle d'accès         | Slither, Echidna, Manticore | [Slither exercise 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Opérations arithmétiques | Manticore, Echidna          | [Echidna exercise 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore exercises 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)     |
| Correction de l'héritage | Slither                     | [Slither exercise 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                         |
| Interactions externes    | Manticore, Echidna          |                                                                                                                                                                                                                                                                               |
| Conformité aux standards | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                       |

D'autres domaines devront être vérifiés en fonction de vos objectifs, mais ces grands axes de travail constituent un bon point de départ pour tout système de contrat intelligent.

Nos audits publics contiennent des exemples de propriétés vérifiées ou testées. Pensez à lire les sections `Test et vérification automatisés` des rapports suivants pour examiner des propriétés de sécurité du monde réel :

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
