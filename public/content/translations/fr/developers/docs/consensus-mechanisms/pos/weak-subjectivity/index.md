---
title: "Subjectivité faible"
description: "Une explication de la subjectivité faible et de son rôle dans la preuve d'enjeu (PoS) d'Ethereum."
lang: fr
---

La subjectivité dans les chaînes de blocs fait référence à la dépendance aux informations sociales pour s'accorder sur l'état actuel. Il peut y avoir plusieurs forks valides parmi lesquels choisir en fonction des informations recueillies auprès d'autres pairs sur le réseau. L'inverse est l'objectivité, qui fait référence aux chaînes où il n'y a qu'une seule chaîne valide possible sur laquelle tous les nœuds s'accorderont nécessairement en appliquant leurs règles codées. Il existe également un troisième état, connu sous le nom de subjectivité faible. Cela fait référence à une chaîne qui peut progresser objectivement après qu'une graine initiale d'informations a été récupérée socialement.

## Prérequis {#prerequisites}

Pour comprendre cette page, il est nécessaire de comprendre d'abord les principes fondamentaux de la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Quels problèmes la subjectivité faible résout-elle ? {#problems-ws-solves}

La subjectivité est inhérente aux chaînes de blocs à preuve d'enjeu car la sélection de la bonne chaîne parmi plusieurs forks se fait en comptant les votes historiques. Cela expose la chaîne de blocs à plusieurs vecteurs d'attaque, y compris les attaques à longue portée par lesquelles les nœuds qui ont participé très tôt à la chaîne maintiennent un fork alternatif qu'ils publient beaucoup plus tard à leur propre avantage. Alternativement, si 33 % des validateurs retirent leur mise mais continuent d'attester et de produire des blocs, ils pourraient générer un fork alternatif qui entre en conflit avec la chaîne canonique. Les nouveaux nœuds ou les nœuds qui ont été hors ligne pendant une longue période pourraient ne pas savoir que ces validateurs attaquants ont retiré leurs fonds, de sorte que les attaquants pourraient les tromper pour qu'ils suivent une chaîne incorrecte. [Ethereum](/) peut résoudre ces vecteurs d'attaque en imposant des contraintes qui diminuent les aspects subjectifs du mécanisme — et donc les hypothèses de confiance — au strict minimum.

## Points de contrôle de subjectivité faible {#ws-checkpoints}

La subjectivité faible est implémentée dans la preuve d'enjeu d'Ethereum en utilisant des « points de contrôle de subjectivité faible ». Ce sont des racines d'état dont tous les nœuds du réseau conviennent qu'elles appartiennent à la chaîne canonique. Ils servent le même objectif de « vérité universelle » que les blocs de genèse, sauf qu'ils ne se trouvent pas à la position de genèse dans la chaîne de blocs. L'algorithme de choix de fourche fait confiance au fait que l'état de la chaîne de blocs défini dans ce point de contrôle est correct et qu'il vérifie indépendamment et objectivement la chaîne à partir de ce point. Les points de contrôle agissent comme des « limites d'annulation » car les blocs situés avant les points de contrôle de subjectivité faible ne peuvent pas être modifiés. Cela contrecarre les attaques à longue portée simplement en définissant les forks à longue portée comme invalides dans le cadre de la conception du mécanisme. S'assurer que les points de contrôle de subjectivité faible sont séparés par une distance plus petite que la période de retrait des validateurs garantit qu'un validateur qui fork la chaîne subit une réduction d'au moins un certain montant seuil avant de pouvoir retirer sa mise, et que les nouveaux entrants ne peuvent pas être trompés sur des forks incorrects par des validateurs dont la mise a été retirée.

## Différence entre les points de contrôle de subjectivité faible et les blocs finalisés {#difference-between-ws-and-finalized-blocks}

Les blocs finalisés et les points de contrôle de subjectivité faible sont traités différemment par les nœuds Ethereum. Si un nœud prend connaissance de deux blocs finalisés concurrents, il est alors tiraillé entre les deux - il n'a aucun moyen d'identifier automatiquement quel est le fork canonique. C'est symptomatique d'un échec du consensus. En revanche, un nœud rejette simplement tout bloc qui entre en conflit avec son point de contrôle de subjectivité faible. Du point de vue du nœud, le point de contrôle de subjectivité faible représente une vérité absolue qui ne peut être compromise par de nouvelles connaissances provenant de ses pairs.

## À quel point est-ce faible ? {#how-weak-is-weak}

L'aspect subjectif de la preuve d'enjeu d'Ethereum est l'exigence d'un état récent (point de contrôle de subjectivité faible) provenant d'une source de confiance à partir de laquelle se synchroniser. Le risque d'obtenir un mauvais point de contrôle de subjectivité faible est très faible car ils peuvent être vérifiés par rapport à plusieurs sources publiques indépendantes telles que des explorateurs de blocs ou de multiples nœuds. Cependant, il y a toujours un certain degré de confiance requis pour exécuter n'importe quelle application logicielle, par exemple, faire confiance au fait que les développeurs de logiciels ont produit un logiciel honnête.

Un point de contrôle de subjectivité faible peut même faire partie du logiciel client. On peut soutenir qu'un attaquant peut corrompre le point de contrôle dans le logiciel et peut tout aussi facilement corrompre le logiciel lui-même. Il n'y a pas de véritable solution crypto-économique à ce problème, mais l'impact des développeurs peu fiables est minimisé dans Ethereum en ayant plusieurs équipes de clients indépendantes, chacune construisant un logiciel équivalent dans différents langages, toutes ayant un intérêt direct à maintenir une chaîne honnête. Les explorateurs de blocs peuvent également fournir des points de contrôle de subjectivité faible ou un moyen de recouper les points de contrôle obtenus ailleurs avec une source supplémentaire.

Enfin, des points de contrôle peuvent être demandés à d'autres nœuds ; peut-être qu'un autre utilisateur d'Ethereum qui exécute un nœud complet peut fournir un point de contrôle que les validateurs peuvent ensuite vérifier par rapport aux données d'un explorateur de blocs. Dans l'ensemble, faire confiance au fournisseur d'un point de contrôle de subjectivité faible peut être considéré comme aussi problématique que de faire confiance aux développeurs du client. La confiance globale requise est faible. Il est important de noter que ces considérations ne deviennent importantes que dans le cas très improbable où une majorité de validateurs conspireraient pour produire un fork alternatif de la chaîne de blocs. Dans toutes les autres circonstances, il n'y a qu'une seule chaîne Ethereum parmi laquelle choisir.

## Complément d'information {#further-reading}

- [La subjectivité faible dans Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik : Comment j'ai appris à aimer la subjectivité faible](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Subjectivité faible (documentation Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Guide de la subjectivité faible de la Phase 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Analyse de la subjectivité faible dans Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)