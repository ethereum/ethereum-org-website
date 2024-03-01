---
title: Un guide des outils de sécurité pour les contrats intelligents
description: Un aperçu de trois différentes techniques de test et d'analyse de programme
author: "Trailofbits"
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "sécurité"
skill: intermediate
published: 2020-09-07
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Nous allons utiliser trois techniques distinctes de test et d'analyse de programme :

- **Analyse statique avec [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Tous les chemins du programme sont approximés et analysés en même temps, à travers différentes présentations du programme (ex. control-flow-graph)
- **Fuzzing avec [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Le code est exécuté avec une génération pseudo-aléatoire de transactions. Le fuzzer tentera de trouver une séquence de transactions pour violer une propriété donnée.
- **Exécution symbolique avec [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Une technique de vérification formelle qui traduit chaque chemin d'exécution en une formule mathématique, sur laquelle on pourra vérifier les contraintes.

Chaque technique comporte ses avantages et ses inconvénients, et trouve son utilité dans des [situations spécifiques](#determining-security-properties) :

| Technique          | Outil     | Utilisation                   | Rapidité  | Bogues manqués | Faux positifs |
| ------------------ | --------- | ----------------------------- | --------- | -------------- | ------------- |
| Analyse statique   | Slither   | CLI & scripts                 | secondes  | modérément     | faible        |
| Fuzzing            | Echidna   | Propriétés Solidity           | minutes   | rarement       | aucun         |
| Symbolic Execution | Manticore | Propriétés Solidity & scripts | en heures | aucun\*        | aucun         |

\* si tous les chemins sont analysés sans coupure

**Slither** analyse les contrats en quelques secondes, cependant, une analyse statique peut conduire à de fausses alertes et sera moins appropriée pour des vérifications complexes (ex. vérifications arithmétiques). Exécutez Slither via l'API pour accéder aux détecteurs intégrés ou via l'API pour des vérifications définies par l'utilisateur.

**Echidna** a besoin de travailler pendant plusieurs minutes et ne produira que de vrais positifs. Echidna vérifie les propriétés de sécurité fournies par les utilisateurs et écrites en Solidity. Il peut rater des bogues dans la mesure où il est basé sur une exploration aléatoire.

**Manticore** effectue l'analyse la plus poussée. Comme Echidna, Manticore vérifie les propriétés fournies par l'utilisateur. Il lui faudra plus de temps pour fonctionner, mais peut approuver la validité d'une propriété et ne signalera pas de fausses alertes.

## Flux de travail conseillé {#suggested-workflow}

Commencez avec les détecteurs intégrés de Slither pour vous assurer qu'aucun bogue mineur n'est présent ou ne sera introduit plus tard. Utilisez Slither pour vérifier les propriétés liées aux héritages, aux dépendances variables et aux problèmes structurels. Au fur et à mesure que le code base grossit, utilisez Echidna pour tester des propriétés plus complexes de la machine d'état. Revisitez Slither pour développer des contrôles personnalisés pour les protections non présentes dans Solidity comme la protection contre le remplacement d'une fonction. Enfin, utiliser Manticore pour effectuer des vérifications ciblées de propriétés critiques de sécurité, par exemple des opérations arithmétiques.

- Utilisez le CLI de Slither pour relever les problèmes courants
- Utilisez Echidna pour tester les propriétés de sécurité de haut niveau dans votre contrat
- Utilisez Slither pour écrire des vérifications statiques personnalisées
- Utilisez Manticore pour vous assurer de façon approfondie des propriétés critiques de sécurité

**Note sur les tests unitaires**. Les tests unitaires sont nécessaires pour construire des logiciels de haute qualité. Cependant, ces techniques ne sont pas les mieux adaptées pour trouver des failles de sécurité. Ils sont généralement utilisés pour tester les comportements positifs du code (c.-à-d. que le code fonctionne comme prévu dans un contexte normal), tandis que les défauts de sécurité tendent à résider dans des cas particuliers que les développeurs ne considéraient pas. Dans notre étude de dizaines d'examens sur la sécurité des contrats intelligents, [la couverture des tests unitaires n'a eu aucun effet sur le nombre ou la gravité des failles de sécurité](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que nous avons trouvés dans le code de notre client.

## Détermination des propriétés de sécurité {#determining-security-properties}

Pour tester et vérifier efficacement votre code, vous devez identifier les zones qui nécessitent une attention particulière. Comme vos ressources consacrées à la sécurité sont limitées, il est important d’optimiser vos efforts pour déterminer la portée des parties faibles ou de grande valeur de votre code base. La modélisation des menaces peut vous aider. Envisagez la révision :

- [Évaluation Rapide des Risques](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (notre approche préférée lorsque le temps se fait court)
- [Guide de modélisation des menaces du système centralisé de données](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (aka NIST 800-154)
- [Modélisation des fils de discussion Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Utilisation des affirmations](https://blog.regehr.org/archives/1091)

### Composants {#components}

Savoir ce que vous voulez vérifier vous aidera également à sélectionner le bon outil.

Les grands domaines qui sont souvent pertinents pour les contrats intelligents comprennent :

- **Machine d'état.** La plupart des contrats peuvent être représentés comme une machine d’état. Pensez à vérifier que (1) aucun état non valide ne peut être atteint, (2) si un état est valide, qu’il peut être atteint, et (3) aucun état ne piège le contrat.

  - Echidna et Manticore sont les outils à privilégier pour tester les spécifications des machines d’état.

- **Contrôle d'accès.** Si votre système a des utilisateurs dotés de privilèges (par exemple, un propriétaire, des contrôleurs, ...) vous devez vous assurer que (1) chaque utilisateur ne peut effectuer que les actions autorisées et (2) aucun utilisateur ne peut bloquer les actions d’un utilisateur avec des privilèges supérieurs.

  - Slither, Echidna et Manticore peuvent vérifier les contrôles d’accès corrects. Par exemple, Slither peut vérifier que seules les fonctions de la liste blanche ne disposent pas du modificateur onlyOwner. Echidna et Manticore sont utiles pour un contrôle d’accès plus complexe, comme une autorisation donnée uniquement si le contrat atteint un état donné.

- **Opérations arithmétiques.** Vérifier la solidité des opérations arithmétiques est absolument essentiel. L’utilisation de `SafeMath` partout est une bonne étape pour éviter les dépassements supérieurs et inférieurs, cependant, vous devez toujours prendre en compte d’autres défauts arithmétiques, y compris les problèmes d’arrondi et les défauts qui piègent le contrat.

  - Manticore est ici le meilleur choix. Echidna peut être utilisé si l’arithmétique est hors du champ d’application du solveur SMT.

- **Exactitude de l'héritage.** Les contrats de solidity reposent fortement sur l’héritage multiple. Des erreurs telles qu’une fonction d’ombrage manquant d’un appel `super` et un ordre de linéarisation c3 mal interprété peuvent facilement être introduites.

  - Slither est l’outil pour assurer la détection de ces problèmes.

- **Interactions externes.** Les contrats interagissent les uns avec les autres, et certains contrats externes ne doivent pas être approuvés. Par exemple, si votre contrat repose sur des oracles externes, restera-t-il sécurisé si la moitié des oracles disponibles sont compromis ?

  - Manticore et Echidna sont le meilleur choix pour tester les interactions externes avec vos contrats. Manticore dispose d’un mécanisme intégré pour talonner les contrats externes.

- **Conformité standard.** Les normes Ethereum (par exemple ERC20) ont un historique de défauts dans leur conception. Soyez conscient des limites de la norme sur laquelle vous vous appuyez.
  - Slither, Echidna et Manticore vous aideront à détecter les écarts par rapport à une norme donnée.

### Fiche mémo de sélection d’outils {#tool-selection-cheatsheet}

| Composant               | Outils                      | Exemples                                                                                                                                                                                                                                                        |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Machine d'état          | Echidna, Manticore          |                                                                                                                                                                                                                                                                 |
| Access control          | Slither, Echidna, Manticore | [Slither exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md), [Echidna exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-2.md)       |
| Arithmetic operations   | Manticore, Echidna          | [Echidna exercise 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-1.md), [Manticore exercises 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Inheritance correctness | Slither                     | [Slither exercise 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                     |
| External interactions   | Manticore, Echidna          |                                                                                                                                                                                                                                                                 |
| Standard conformance    | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                         |

D’autres domaines devront être vérifiés en fonction de vos objectifs, mais ces domaines généraux représentent un bon point de départ pour tout système de contrat intelligent.

Nos audits publics contiennent des exemples de propriétés vérifiées ou testées. Envisagez de lire les sections `Test et vérification automatisées` des rapports suivants pour examiner les propriétés de sécurité dans le réel :

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
