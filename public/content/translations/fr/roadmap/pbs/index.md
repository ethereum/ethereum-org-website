---
title: Séparation proposant-constructeur
description: Découvrez comment et pourquoi les validateurs Ethereum sépareront leurs responsabilités de construction et de diffusion de blocs.
lang: fr
---

Les validateurs [Ethereum](/) actuels créent _et_ diffusent des blocs. Ils regroupent les transactions dont ils ont entendu parler via le réseau de diffusion (gossip network) et les assemblent dans un bloc qui est envoyé à leurs pairs sur le réseau Ethereum. La **séparation proposant-constructeur (PBS)** répartit ces tâches entre plusieurs validateurs. Les constructeurs de blocs deviennent responsables de la création des blocs et de leur proposition au proposeur de bloc à chaque créneau. Le proposeur de bloc ne peut pas voir le contenu du bloc, il choisit simplement le plus rentable, recevant des frais du constructeur de blocs (ou le constructeur paie une enchère au proposant) avant d'envoyer le bloc à ses pairs.

Il s'agit d'une mise à niveau importante pour plusieurs raisons. Premièrement, elle crée des opportunités pour empêcher la censure des transactions au niveau du protocole. Deuxièmement, elle empêche les validateurs amateurs d'être surpassés par des acteurs institutionnels qui peuvent mieux optimiser la rentabilité de leur construction de blocs. Troisièmement, elle aide à la mise à l'échelle d'Ethereum en permettant les mises à niveau de danksharding.

## PBS et résistance à la censure {#pbs-and-censorship-resistance}

Séparer les constructeurs de blocs et les proposeurs de blocs rend beaucoup plus difficile pour les constructeurs de blocs de censurer les transactions. Cela s'explique par le fait que des critères d'inclusion relativement complexes peuvent être ajoutés pour garantir qu'aucune censure n'a eu lieu avant que le bloc ne soit proposé. Comme le proposeur de bloc est une entité distincte du constructeur de blocs, il peut assumer le rôle de protecteur contre les constructeurs de blocs censeurs.

Par exemple, des listes d'inclusion peuvent être introduites afin que, lorsque les validateurs ont connaissance de transactions mais ne les voient pas incluses dans les blocs, ils puissent les imposer comme indispensables dans le bloc suivant. La liste d'inclusion est générée à partir de la mempool locale du proposeur de bloc (la liste des transactions dont il a connaissance) et envoyée à ses pairs juste avant qu'un bloc ne soit proposé. Si l'une des transactions de la liste d'inclusion est manquante, le proposant pourrait soit rejeter le bloc, ajouter les transactions manquantes avant de le proposer, soit le proposer et le laisser être rejeté par d'autres validateurs lorsqu'ils le reçoivent. Il existe également une version potentiellement plus efficace de cette idée qui affirme que les constructeurs doivent utiliser pleinement l'espace de bloc disponible et que, s'ils ne le font pas, des transactions sont ajoutées à partir de la liste d'inclusion du proposant. Il s'agit encore d'un domaine de recherche actif et la configuration optimale pour les listes d'inclusion n'a pas encore été déterminée.

Les [mempools chiffrées](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) pourraient également empêcher les constructeurs et les proposants de savoir quelles transactions ils incluent dans un bloc jusqu'à ce que le bloc ait déjà été diffusé.

<ExpandableCard title="Quels types de censure la PBS résout-elle ?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Des organisations puissantes peuvent faire pression sur les validateurs pour qu'ils censurent les transactions à destination ou en provenance de certaines adresses. Les validateurs cèdent à cette pression en détectant les adresses sur liste noire dans leur pool de transactions et en les omettant des blocs qu'ils proposent. Après la PBS, cela ne sera plus possible car les proposeurs de blocs ne sauront pas quelles transactions ils diffusent dans leurs blocs. Il peut être important pour certains individus ou applications de se conformer aux règles de censure, par exemple lorsque cela devient une loi dans leur région. Dans ces cas, la conformité se fait au niveau de l'application, tandis que le protocole reste sans permission et libre de toute censure.

</ExpandableCard>

## PBS et MEV {#pbs-and-mev}

La **valeur maximale extractible (MEV)** fait référence aux validateurs qui maximisent leur rentabilité en ordonnant favorablement les transactions. Des exemples courants incluent l'arbitrage d'échanges sur des bourses décentralisées (par exemple, le frontrunning d'une vente ou d'un achat important) ou l'identification d'opportunités pour liquider des positions de finance décentralisée (DeFi). Maximiser la MEV nécessite un savoir-faire technique sophistiqué et des logiciels personnalisés ajoutés aux validateurs normaux, ce qui rend beaucoup plus probable que les opérateurs institutionnels surpassent les individus et les validateurs amateurs dans l'extraction de MEV. Cela signifie que les rendements du staking sont susceptibles d'être plus élevés avec des opérateurs centralisés, créant une force centralisatrice qui décourage le staking à domicile.

La PBS résout ce problème en reconfigurant l'économie de la MEV. Au lieu que le proposeur de bloc effectue sa propre recherche de MEV, il choisit simplement un bloc parmi plusieurs qui lui sont proposés par les constructeurs de blocs. Les constructeurs de blocs peuvent avoir effectué une extraction de MEV sophistiquée, mais la récompense revient au proposeur de bloc. Cela signifie que même si un petit groupe de constructeurs de blocs spécialisés domine l'extraction de MEV, la récompense pourrait aller à n'importe quel validateur sur le réseau, y compris les stakers individuels à domicile.

<ExpandableCard title="Pourquoi est-il acceptable de centraliser la construction de blocs ?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Les individus pourraient être incités à faire du staking avec des pools plutôt que par eux-mêmes en raison des récompenses améliorées offertes par des stratégies de MEV sophistiquées. Séparer la construction de blocs de la proposition de blocs signifie que la MEV extraite sera distribuée sur un plus grand nombre de validateurs plutôt que de se centraliser avec le chercheur de MEV le plus efficace. En même temps, permettre l'existence de constructeurs de blocs spécialisés soulage les individus du fardeau de la construction de blocs, et empêche également les individus de voler la MEV pour eux-mêmes, tout en maximisant le nombre de validateurs individuels et indépendants qui peuvent vérifier que les blocs sont honnêtes. Le concept important est l'« asymétrie prouveur-vérificateur », qui fait référence à l'idée que la production centralisée de blocs est acceptable tant qu'il existe un réseau robuste et maximalement décentralisé de validateurs capables de prouver que les blocs sont honnêtes. La décentralisation est un moyen, pas un but en soi - ce que nous voulons, ce sont des blocs honnêtes.
</ExpandableCard>

## PBS et danksharding {#pbs-and-danksharding}

Le danksharding est la façon dont Ethereum passera à l'échelle pour atteindre plus de 100 000 transactions par seconde et minimiser les frais pour les utilisateurs de rollup. Il s'appuie sur la PBS car il ajoute à la charge de travail des constructeurs de blocs, qui devront calculer des preuves pour jusqu'à 64 Mo de données de rollup en moins d'une seconde. Cela nécessitera probablement des constructeurs spécialisés capables de consacrer un matériel assez substantiel à la tâche. Cependant, dans la situation actuelle, la construction de blocs pourrait de toute façon devenir de plus en plus centralisée autour d'opérateurs plus sophistiqués et puissants en raison de l'extraction de MEV. La séparation proposant-constructeur est un moyen d'accepter cette réalité et de l'empêcher d'exercer une force centralisatrice sur la validation de bloc (la partie importante) ou sur la distribution des récompenses de staking. Un grand avantage secondaire est que les constructeurs de blocs spécialisés sont également disposés et capables de calculer les preuves de données nécessaires pour le danksharding.

## Progrès actuels {#current-progress}

La PBS est à un stade avancé de recherche, mais il reste encore d'importantes questions de conception à résoudre avant qu'elle ne puisse être prototypée dans les clients Ethereum. Il n'y a pas encore de spécification finalisée. Cela signifie que la PBS est probablement à un an ou plus de sa réalisation. Consultez le dernier [état de la recherche](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Complément d'information {#further-reading}

- [État de la recherche : résistance à la censure sous PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Conceptions de marché des frais adaptées à la PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS et résistance à la censure](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listes d'inclusion](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)