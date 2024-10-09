---
title: Weak subjectivity
description: Une explication de la « faible subjectivité » et de son rôle dans la PoS d'Ethereum.
lang: fr
---

La subjectivité dans les blockchains se réfère au recours à l'information sociale pour convenir de l'état actuel. Plusieurs forks valides peuvent être choisis en fonction des informations recueillies par d'autres pairs sur le réseau. L'inverse est l'objectivité qui fait référence à des chaînes où il n'y a qu'une seule chaîne valide possible sur laquelle tous les nœuds seront nécessairement d'accord en appliquant leurs règles codées. Il existe également un troisième état, connu sous le nom de faible subjectivité. Il s'agit d'une chaîne qui peut progresser objectivement après la récupération sociale d'une graine initiale d'informations.

## Prérequis {#prerequisites}

Pour comprendre cette page, il faut d'abord comprendre les fondamentaux de [la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/).

## Quels problèmes la faible subjectivité résout-elle ? {#problems-ws-solves}

La subjectivité est inhérente aux blockchains en preuve d'enjeu puisque la sélection de la bonne chaîne depuis plusieurs forks est réalisée par le comptage des votes historiques. Cela expose la blockchain à plusieurs vecteurs d'attaque, y compris les attaques de longue portée par lesquelles les nœuds qui ont participé très tôt à la chaîne maintiennent un fork alternatif qu'ils libèrent beaucoup plus tard à leur propre avantage. Alternativement, si 33 % des validateurs retirent leur mise mais continuent à attester et à produire des blocs, ils pourraient générer un fork alternatif qui entrerait en conflit avec la chaîne canonique. Les nouveaux nœuds ou ceux qui sont hors connexion depuis longtemps peuvent ne pas être avisés que ces validateurs hostiles ont retiré leurs fonds, afin que les attaquants puissent amener les nœuds à suivre une chaîne incorrecte. Ethereum peut parer à ces vecteurs d'attaque en imposant des contraintes qui réduisent au strict minimum les aspects subjectifs du mécanisme, et ainsi les hypothèses de confiance.

## Points de contrôle de la faible subjectivité {#ws-checkpoints}

La faible subjectivité est implémentée dans la preuve d'enjeu d'Ethereum en utilisant des « points de contrôle weak subjectivity ». Ce sont des racines d'état que tous les nœuds du réseau s'accordent à intégrer dans la chaîne canonique. Ils servent à la même « vérité universelle » que les blocs d'origine dits genesis, sauf qu'ils ne sont pas placés à l'origine dans la blockchain. L'algorithme de choix du fork sait que l'état de blockchain défini dans ce point de contrôle est correct et qu'il valide de façon indépendante et objective la chaîne à partir de ce point. Les points de contrôle agissent comme des « limites de réversibilité » car les blocs situés avant les points de contrôle de subjectivité faibles ne peuvent pas être changés. Cela a pour effet de saper les attaques à longue portée (long range attacks) en forçant simplement l'invalidation des forks à longue portée de par la conception même du mécanisme. En veillant à ce que les points de contrôle de la faible subjectivité soient séparés par une distance plus faible que la période de retrait d'un validateur, elle garantit qu'un validateur qui opère un fork de la chaîne sera sanctionné d'au moins un certain montant avant de pouvoir retirer sa mise, et que les nouveaux arrivants ne pourront pas être trompés par des forks incorrects venant de validateurs dont la mise en jeu a été retirée.

## Différence entre les points de contrôle de la faible subjectivité et les blocs finalisés {#difference-between-ws-and-finalized-blocks}

Les blocs finalisés et les points de contrôle de la faible subjectivité sont traités de manière différente par les nœuds Ethereum. Si un nœud prend connaissance de deux blocs finalisés concurrents, il ne peut qu'hésiter entre les deux - il n'a aucun moyen d'identifier automatiquement celui qui provient de la fourche canonique. C'est symptomatique d'un échec de consensus. En revanche, un nœud rejette simplement tout bloc qui entre en conflit avec son point de contrôle de faible subjectivité. Du point de vue du nœud, les points de contrôle de faible subjectivité représentent une vérité absolue qui ne peut être mise à mal par de nouvelles informations de la part ses pairs.

## À quel point cette faiblesse est-elle faible ? {#how-weak-is-weak}

L'aspect subjectif de la preuve d'enjeu d'Ethereum vient de ce que l'on a besoin d'un état récent (point de contrôle de la faible subjectivité) à partir d'une source de confiance avec qui se synchroniser. Le risque d'obtenir un mauvais point de contrôle de faible subjectivité est très faible car il peut être vérifié par plusieurs sources publiques indépendantes telles que les explorateurs de blocs, ou de multiples nœuds. Cependant, un certain degré de confiance reste nécessaire pour exécuter n'importe quelle application logicielle, par exemple, en ayant confiance dans le fait que les développeurs de logiciels ont produit un logiciel honnête.

Un point de contrôle de la faible subjectivité peut même faire partie du logiciel client. Un attaquant peut sans doute corrompre le point de contrôle du logiciel et peut tout aussi facilement corrompre le logiciel lui-même. Il n'y a pas de véritable contournement crypto-économique pour ce problème, mais l'impact des développeurs peu fiables est minimisé dans Ethereum en disposant de plusieurs équipes indépendantes pour les logiciels clients, chacune écrivant un logiciel équivalent dans des langages différents, et qui ont intérêt à maintenir une chaîne en toute honnêté. Les explorateurs de blocs peuvent également fournir des points de contrôle de faible subjectivité ou un moyen de croiser les points de contrôle obtenus ailleurs avec une source supplémentaire.

Enfin, les points de contrôle peuvent être demandés à d'autres nœuds  ; il se peut qu'un autre utilisateur d'Ethereum qui exécute un nœud complet puisse fournir un point de contrôle que les validateurs peuvent ensuite vérifier par rapport aux données d'un explorateur de blocs. Globalement, faire confiance au fournisseur d'un point de contrôle de subjectivité faible peut être considéré comme aussi problématique que de faire confiance aux développeurs du client. La confiance globale requise est faible. Il est important de noter que ces considérations ne deviennent importantes que dans le cas très improbable où une majorité de validateurs conspirent pour produire une autre fourche de la blockchain. Dans toutes les autres circonstances, il n'y a qu'une seule chaîne Ethereum parmi laquelle choisir.

## Complément d'information {#further-reading}

- [Faible subjectivité dans Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik : comment j'ai appris à aimer la faible subjectivité](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Faible subjectivité (Teku docs)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Guide de la faible subjectivité Phase-0](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Analyse de la faible subjectivité dans Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
