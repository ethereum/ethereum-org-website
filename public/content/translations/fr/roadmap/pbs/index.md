---
title: Séparation entre le validateur et le constructeur de blocs
description: Découvrez la raison, mais aussi de quelle manière, les validateurs d'Ethereum vont séparer leurs responsabilités concernant la construction et la diffusion de blocs.
lang: fr
---

# Séparation entre le validateur et le constructeur de blocs {#proposer-builder-separation}

Actuellement, les validateurs d'Ethereum produisent _et_ diffusent les blocs. Ils regroupent les transactions dont ils ont entendu parler via le réseau d'informations et les regroupent dans un bloc qui est envoyé aux pairs du réseau Ethereum. La **séparation proposant-constructeur (PBS)** répartit ces tâches entre plusieurs validateurs. Les constructeurs de blocs deviennent ainsi responsables de la création des blocs et les remettent au proposant de blocs, lors de chaque intervalle. Le proposant de bloc ne peut voir le contenu d'un bloc, mais se dirige simplement vers le plus rentable, en payant une commission au constructeur de bloc avant d'envoyer celui-ci vers ses pairs.

C'est une mise à jour qui s'avère très importante, et ce pour plusieurs raisons. Premièrement, cela crée des opportunités afin de prévenir toute censure de transaction au niveau du protocole. Deuxièmement, cela évite que les validateurs amateurs ne soient concurrencés par des acteurs institutionnels capables de mieux optimiser la rentabilité de leur construction de blocs. Troisièmement, cela aide à faire évoluer Ethereum en permettant les mises à niveau de Danksharding.

## PBS et la résistance à la censure {#pbs-and-censorship-resistance}

La séparation entre constructeurs et proposants de blocs, rend bien plus ardue la censure des transactions par les constructeurs de blocs. En effet, des critères d'inclusion relativement complexes peuvent être ajoutés pour garantir qu'aucune censure n'a eu lieu avant que le blocage ne soit proposé. Comme le proposant du bloc est une entité distincte du constructeur du bloc, il peut assumer le rôle de protecteur contre la censure des constructeurs de blocs.

Par exemple, des listes d'inclusion peuvent être introduites. Ainsi, quand les validateurs prennent connaissance des transactions mais ne les voient point incluses dans les blocs, celles-ci peuvent alors êtres rendues indispensables dans le bloc suivant. La liste d'inclusion est générée depuis le « mempool » local des proposants de blocs (liste des transactions dont ils ont connaissance), puis adressée à leurs homologues juste avant la proposition d'un bloc. Si certaines transactions de la liste d'inclusion sont manquantes, le proposant de bloc peut soit rejeter le bloc, ajouter les transactions manquantes avant de soumettre celui-ci, soit le proposer et le laisser être rejeté une fois reçu par les autres validateurs. Potentiellement, il existe aussi une version bien plus efficace de ce concept, stipulant que les constructeurs de blocs se doivent pleinement d'utiliser le bloc disponible ; en cas contraire, les transactions sont de facto ajoutées à partir de la liste d'inclusion du proposant de bloc. Il s'agit encore d'un domaine de recherche active et la configuration optimale des listes d'inclusion, n'est encore pas à ce jour, pleinement définie.

[Les mempools encryptés](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) peuvent aussi empêcher les proposants et constructeurs de blocs de connaître quelles transactions ils incluent dans un bloc, mais seulement après que ledit bloc ait été déjà émis.

<ExpandableCard title="Quel genre de censure la séparation entre le constructeur et le proposant de blocs (PBS) résout-elle ?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Des organisations puissantes peuvent aussi faire pression sur les validateurs pour qu'ils censurent des transactions issues ou à destination de certaines adresses. Ces derniers se plient à cette exigence en détectant les adresses blacklistées au sein de leur pool de transaction puis en les excluant de leur proposition de blocs. Après la séparation proposants et constructeurs de blocs (PBS), cette action ne sera plus possible car les proposants de blocs ne sauront pas quelles transactions ils diffusent dans leurs blocs. Il peut être important que certaines personnes ou applications se conforment aux règles de censure, par exemple lorsqu'elles sont adoptées dans leur région. Dans ces cas, la conformité se produit au niveau de l’application, tandis que le protocole reste sans autorisation et sans censure.

</ExpandableCard>

## PBS et MEV {#pbs-and-mev}

**Maximum Extractable Value ou Valeur Maximale Extractible (MEV)** fait référence aux validateurs maximisant leur rentabilité en ordonnant des transactions de manière profitable. Des situations courantes incluent des manipulations d'arbitrage sur les échanges décentralisés (p. ex. anticiper un achat ou une vente conséquents) ou encore identifier des opportunités de liquidation de positions DeFi. Maximiser la MEV nécessite un savoir-faire technique sophistiqué et des logiciels personnalisés ajoutés aux validateurs normaux, ce qui rend beaucoup plus probable le fait que les opérateurs institutionnels surpassent les particuliers et les validateurs amateurs au niveau des applications d'extraction MEV. Cela signifie que les rendements du stacking sont susceptibles d'être plus élevés via des opérateurs centralisés, créant ainsi un pouvoir de centralisation amené à décourager le stacking à domicile.

La séparation entre le constructeur et le proposant de bloc (PBS) résout ce dilemme en repensant les critères économiques de la valeur maximale extractible (MEV). Pour éviter au proposant de bloc d'effectuer ses propres recherches sur la Valeur maximale extractible (MEV), celui-ci choisit simplement un bloc parmi tous ceux soumis par les constructeurs de blocs. Les constructeurs de blocs ont peut-être effectué une extraction MEV sophistiquée, mais la récompense revient au proposant du bloc. Cela signifie que même si un petit groupe de constructeurs de blocs spécialisés dominent l’extraction de MEV, la récompense pourrait revenir à n’importe quel validateur du réseau, y compris les parieurs individuels.

<ExpandableCard title="Pourquoi est-ce acceptable de centraliser la construction des blocs ?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Les individus pourraient être incités à miser dans des pools plutôt que seuls en raison des récompenses améliorées offertes par les stratégies MEV sophistiquées. Séparer la construction de blocs de la proposition de bloc signifie que la MEV extraite sera distribuée entre davantage de validateurs plutôt que d'être centralisée avec le chercheur de MEV le plus efficace. Dans le même temps, permettre à des constructeurs de blocs spécialisés d'exister soulage les individus du fardeau de la construction de blocs et empêche également les individus de voler la MEV pour eux-mêmes, tout en maximisant le nombre de validateurs individuels et indépendants qui peuvent vérifier que les blocs sont honnêtes. Le concept important est « l'asymétrie prouveur-vérificateur », qui fait référence à l'idée selon laquelle la production centralisée de blocs est acceptable tant qu'il existe un réseau robuste et décentralisé au maximum de validateurs capables de prouver que les blocs sont honnêtes. La décentralisation reste un moyen, non un but final en soi. Nous désirons simplement des blocs intègres.
</ExpandableCard>

## PBS et Danksharding {#pbs-and-danksharding}

Danksharding est la solution qu'Ethereum adoptera pour atteindre une échelle de >100,000 transactions par seconde tout en réduisant les frais des utilisateurs rollup. Celle-ci s'appuie sur la séparation entre constructeurs et proposants de blocs (PBS), car elle ajoute une charge de travail supplémentaire pour les constructeurs de blocs, qui devront générer des validations allant jusqu'à 64 MB de données rollup, le tout en moins d'une seconde. Cela nécessitera probablement des constructeurs spécialisés capables de consacrer du matériel assez conséquent à cette tâche. Or, dans la situation actuelle, la construction des blocs pourrait devenir de plus en plus centralisée autour d'opérateurs plus exigeants et puissants en raison de l'extraction de MEV. La séparation entre le proposant et le constructeur de blocs est une façon d'embrasser cette réalité et d'éviter qu'elle n'exerce une force centralisatrice sur la validation des blocs (la partie importante) ou sur la distribution des récompenses issues du stacking. Un grand avantage secondaire est que les constructeurs de blocs spécialisés sont également disposés et capables de calculer les preuves de données nécessaires pour Danksharding.

## Progrès actuels {#current-progress}

La séparation entre le constructeur de blocs et le proposant de blocs (PBS) est maintenant à un stade avancé de recherche, mais il reste encore quelques interrogations importantes de conception à résoudre, avant que celles-ci puissent être prototypées chez les clients d'Ethereum. Il n’y a pas encore de spécifications finalisées. Cela signifie que le délai de réalisation de la séparation entre le constructeur et le proposant de blocs (PBS) s'étale sur un délai d'un an, voire plus. Vérifier le dernier [état de recherche](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Complément d'information {#further-reading}

- [État de la recherche : résistance à la censure sous PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Conceptions de marchés de frais compatibles avec PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS et la résistance à la censure](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listes d'inclusion](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
