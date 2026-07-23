---
title: Danksharding
description: Découvrez le proto-danksharding et le danksharding - deux mises à jour séquentielles pour la mise à l'échelle d'Ethereum.
lang: fr
summaryPoints:
  - Le danksharding est une mise à jour en plusieurs phases visant à améliorer la mise à l'échelle et la capacité d'Ethereum.
  - La première étape, le proto-danksharding, ajoute des blobs de données aux blocs.
  - Les blobs de données offrent un moyen moins coûteux pour les rollups de publier des données sur Ethereum, et ces coûts peuvent être répercutés sur les utilisateurs sous la forme de frais de transaction réduits.
  - Plus tard, le danksharding complet répartira la responsabilité de la vérification des blobs de données sur des sous-ensembles de nœuds, permettant ainsi à Ethereum de traiter plus de 100 000 transactions par seconde.
---

**Le danksharding** est la façon dont [Ethereum](/) devient une chaîne de blocs véritablement évolutive, mais plusieurs mises à jour du protocole sont nécessaires pour y parvenir. **Le proto-danksharding** est une étape intermédiaire sur cette voie. Les deux visent à rendre les transactions sur la couche 2 (l2) aussi peu coûteuses que possible pour les utilisateurs et devraient permettre à Ethereum de traiter plus de 100 000 transactions par seconde.

## Qu'est-ce que le proto-danksharding ? {#what-is-protodanksharding}

Le proto-danksharding, également connu sous le nom d'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), est un moyen pour les [rollups](/layer-2/#rollups) d'ajouter des données moins chères aux blocs. Le nom vient des deux chercheurs qui ont proposé l'idée : Protolambda et Dankrad Feist. Historiquement, les rollups étaient limités dans la réduction du coût des transactions des utilisateurs par le fait qu'ils publient leurs transactions dans `CALLDATA`.

Cela coûte cher car c'est traité par tous les nœuds Ethereum et réside onchain pour toujours, même si les rollups n'ont besoin des données que pour une courte période. Le proto-danksharding introduit des blobs de données qui peuvent être envoyés et attachés aux blocs. Les données de ces blobs ne sont pas accessibles à l'EVM et sont automatiquement supprimées après une période fixe (définie à 4096 époques au moment de la rédaction, soit environ 18 jours). Cela signifie que les rollups peuvent envoyer leurs données à un coût bien moindre et répercuter ces économies sur les utilisateurs finaux sous la forme de transactions moins chères.

<ExpandableCard title="Pourquoi les blobs rendent-ils les rollups moins chers ?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Les rollups sont un moyen de mettre à l'échelle Ethereum par le traitement par lots des transactions hors chaîne, puis en publiant les résultats sur Ethereum. Un rollup est essentiellement composé de deux parties : les données et la vérification de l'exécution. Les données constituent la séquence complète des transactions traitées par un rollup pour produire le changement d'état publié sur Ethereum. La vérification de l'exécution est la réexécution de ces transactions par un acteur honnête (un « prouveur ») pour s'assurer que le changement d'état proposé est correct. Pour effectuer la vérification de l'exécution, les données de transaction doivent être disponibles suffisamment longtemps pour que quiconque puisse les télécharger et les vérifier. Cela signifie que tout comportement malhonnête du séquenceur de rollup peut être identifié et contesté par le prouveur. Cependant, elles n'ont pas besoin d'être disponibles pour toujours.

</ExpandableCard>

<ExpandableCard title="Pourquoi est-il acceptable de supprimer les données de blob ?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Les rollups publient des engagements concernant leurs données de transaction onchain et rendent également les données réelles disponibles dans des blobs de données. Cela signifie que les prouveurs peuvent vérifier que les engagements sont valides ou contester les données qu'ils jugent incorrectes. Au niveau du nœud, les blobs de données sont conservés dans le client de consensus. Les clients de consensus attestent qu'ils ont vu les données et qu'elles ont été propagées sur le réseau. Si les données étaient conservées pour toujours, ces clients gonfleraient et entraîneraient des exigences matérielles importantes pour l'exécution des nœuds. Au lieu de cela, les données sont automatiquement élaguées du nœud tous les 18 jours. Les attestations du client de consensus démontrent qu'il y a eu une opportunité suffisante pour les prouveurs de vérifier les données. Les données réelles peuvent être stockées hors chaîne par les opérateurs de rollup, les utilisateurs ou d'autres personnes.

</ExpandableCard>

### Comment les données de blob sont-elles vérifiées ? {#how-are-blobs-verified}

Les rollups publient les transactions qu'ils exécutent dans des blobs de données. Ils publient également un « engagement » envers les données. Ils le font en ajustant une fonction polynomiale aux données. Cette fonction peut ensuite être évaluée en divers points. Par exemple, si nous définissons une fonction extrêmement simple `f(x) = 2x-1` alors nous pouvons évaluer cette fonction pour `x = 1`, `x = 2`, `x = 3` donnant les résultats `1, 3, 5`. Un prouveur applique la même fonction aux données et l'évalue aux mêmes points. Si les données d'origine sont modifiées, la fonction ne sera pas identique, et par conséquent les valeurs évaluées à chaque point ne le seront pas non plus. En réalité, l'engagement et la preuve sont plus compliqués car ils sont enveloppés dans des fonctions cryptographiques.

### Qu'est-ce que KZG ? {#what-is-kzg}

KZG signifie Kate-Zaverucha-Goldberg - les noms des trois [auteurs originaux](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) d'un schéma qui réduit un blob de données à un petit [« engagement » cryptographique](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Le blob de données soumis par un rollup doit être vérifié pour s'assurer que le rollup ne se comporte pas mal. Cela implique qu'un prouveur réexécute les transactions dans le blob pour vérifier que l'engagement était valide. C'est conceptuellement la même chose que la façon dont les clients d'exécution vérifient la validité des transactions Ethereum sur la couche 1 (l1) à l'aide de preuves de Merkle. KZG est une preuve alternative qui ajuste une équation polynomiale aux données. L'engagement évalue le polynôme à certains points de données secrets. Un prouveur ajusterait le même polynôme sur les données et l'évaluerait aux mêmes valeurs, en vérifiant que le résultat est le même. C'est un moyen de vérifier les données qui est compatible avec les techniques à divulgation nulle de connaissance utilisées par certains rollups et, à terme, par d'autres parties du protocole Ethereum.

### Qu'était la cérémonie KZG ? {#what-is-a-kzg-ceremony}

La cérémonie KZG était un moyen pour de nombreuses personnes de la communauté Ethereum de générer collectivement une chaîne de nombres aléatoires secrète qui peut être utilisée pour vérifier certaines données. Il est très important que cette chaîne de nombres ne soit pas connue et ne puisse être recréée par personne. Pour s'en assurer, chaque personne ayant participé à la cérémonie a reçu une chaîne du participant précédent. Ils ont ensuite créé de nouvelles valeurs aléatoires (par exemple, en permettant à leur navigateur de mesurer le mouvement de leur souris) et les ont mélangées avec la valeur précédente. Ils ont ensuite envoyé la valeur au participant suivant et l'ont détruite de leur machine locale. Tant qu'une personne dans la cérémonie a fait cela honnêtement, la valeur finale sera impossible à connaître pour un attaquant.

La cérémonie KZG de l'EIP-4844 était ouverte au public et des dizaines de milliers de personnes y ont participé pour ajouter leur propre entropie (caractère aléatoire). Au total, il y a eu plus de 140 000 contributions, ce qui en fait la plus grande cérémonie de ce type au monde. Pour que la cérémonie soit compromise, il faudrait que 100 % de ces participants soient activement malhonnêtes. Du point de vue des participants, s'ils savent qu'ils ont été honnêtes, il n'est pas nécessaire de faire confiance à qui que ce soit d'autre car ils savent qu'ils ont sécurisé la cérémonie (ils ont individuellement satisfait à l'exigence de 1 participant honnête sur N).

<ExpandableCard title="À quoi sert le nombre aléatoire de la cérémonie KZG ?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Lorsqu'un rollup publie des données dans un blob, il fournit un « engagement » qu'il publie onchain. Cet engagement est le résultat de l'évaluation d'un ajustement polynomial aux données à certains points. Ces points sont définis par les nombres aléatoires générés lors de la cérémonie KZG. Les prouveurs peuvent ensuite évaluer le polynôme aux mêmes points afin de vérifier les données - s'ils arrivent aux mêmes valeurs, alors les données sont correctes.

</ExpandableCard>

<ExpandableCard title="Pourquoi les données aléatoires KZG doivent-elles rester secrètes ?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Si quelqu'un connaît les emplacements aléatoires utilisés pour l'engagement, il lui est facile de générer un nouveau polynôme qui s'ajuste à ces points spécifiques (c'est-à-dire une « collision »). Cela signifie qu'ils pourraient ajouter ou supprimer des données du blob tout en fournissant une preuve valide. Pour éviter cela, au lieu de donner aux prouveurs les emplacements secrets réels, ils reçoivent en fait les emplacements enveloppés dans une « boîte noire » cryptographique utilisant des courbes elliptiques. Celles-ci brouillent efficacement les valeurs de telle sorte que les valeurs d'origine ne peuvent pas faire l'objet d'une ingénierie inverse, mais avec un peu d'algèbre astucieuse, les prouveurs et les vérificateurs peuvent toujours évaluer les polynômes aux points qu'ils représentent.

</ExpandableCard>

<Alert variant="warning">
  Ni le danksharding ni le proto-danksharding ne suivent le modèle traditionnel de « sharding » qui vise à diviser la chaîne de blocs en plusieurs parties. Les chaînes de fragments ne font plus partie de la feuille de route. Au lieu de cela, le danksharding utilise l'échantillonnage de données distribué à travers les blobs pour mettre à l'échelle Ethereum. C'est beaucoup plus simple à mettre en œuvre. Ce modèle a parfois été appelé « data-sharding » (sharding de données).
</Alert>

## Qu'est-ce que le danksharding ? {#what-is-danksharding}

Le danksharding est la réalisation complète de la mise à l'échelle des rollups qui a commencé avec le proto-danksharding. Le danksharding apportera des quantités massives d'espace sur Ethereum pour que les rollups puissent y déverser leurs données de transaction compressées. Cela signifie qu'Ethereum sera en mesure de prendre en charge des centaines de rollups individuels avec facilité et de faire de millions de transactions par seconde une réalité.

La façon dont cela fonctionne est en augmentant le nombre de blobs attachés aux blocs de six (6) dans le proto-danksharding, à 64 dans le danksharding complet. Le reste des changements requis sont tous des mises à jour de la façon dont les clients de consensus fonctionnent pour leur permettre de gérer les nouveaux grands blobs. Plusieurs de ces changements sont déjà sur la feuille de route à d'autres fins indépendantes du danksharding. Par exemple, le danksharding nécessite que la séparation proposant-constructeur (PBS) ait été mise en œuvre. Il s'agit d'une mise à jour qui sépare les tâches de construction de blocs et de proposition de blocs entre différents validateurs. De même, l'échantillonnage de la disponibilité des données est requis pour le danksharding, mais il est également requis pour le développement de clients très légers qui ne stockent pas beaucoup de données historiques (« clients sans état »).

<ExpandableCard title="Pourquoi le danksharding nécessite-t-il la séparation proposant-constructeur ?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

La séparation proposant-constructeur (PBS) est nécessaire pour éviter que les validateurs individuels n'aient à générer des engagements et des preuves coûteux pour 32 Mo de données de blob. Cela mettrait trop de pression sur les stakers à domicile et les obligerait à investir dans du matériel plus puissant, ce qui nuit à la décentralisation. Au lieu de cela, des constructeurs de blocs spécialisés assument la responsabilité de ce travail de calcul coûteux. Ensuite, ils mettent leurs blocs à la disposition des proposeurs de blocs pour qu'ils les diffusent. Le proposeur de bloc choisit simplement le bloc qui est le plus rentable. N'importe qui peut vérifier les blobs à moindre coût et rapidement, ce qui signifie que n'importe quel validateur normal peut vérifier que les constructeurs de blocs se comportent honnêtement. Cela permet de traiter les grands blobs sans sacrifier la décentralisation. Les constructeurs de blocs qui se comportent mal pourraient simplement être éjectés du réseau et subir une réduction - d'autres prendront leur place car la construction de blocs est une activité rentable.

</ExpandableCard>

<ExpandableCard title="Pourquoi le danksharding nécessite-t-il l'échantillonnage de la disponibilité des données ?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

L'échantillonnage de la disponibilité des données est nécessaire pour que les validateurs puissent vérifier rapidement et efficacement les données de blob. En utilisant l'échantillonnage de la disponibilité des données, les validateurs peuvent être très certains que les données de blob étaient disponibles et correctement engagées. Chaque validateur peut échantillonner de manière aléatoire seulement quelques points de données et créer une preuve, ce qui signifie qu'aucun validateur n'a à vérifier l'intégralité du blob. Si des données sont manquantes, elles seront identifiées rapidement et le blob sera rejeté.

</ExpandableCard>

### Progrès actuels {#current-progress}

Le danksharding complet est encore à plusieurs années de distance. Entre-temps, la cérémonie KZG s'est conclue avec plus de 140 000 contributions, et l'[EIP](https://eips.ethereum.org/EIPS/eip-4844) pour le proto-danksharding a mûri. Cette proposition a été entièrement mise en œuvre sur tous les réseaux de test, et a été lancée sur le Réseau principal avec la mise à jour du réseau Cancun-Deneb (« Dencun ») en mars 2024.

### Complément d'information {#further-reading}

- [Notes sur le proto-danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Notes de Dankrad sur le danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto et Vitalik discutent du danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [La cérémonie KZG](https://ceremony.ethereum.org/)
- [Présentation de Carl Beekhuizen à la Devcon sur les configurations de confiance (trusted setups)](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [En savoir plus sur l'échantillonnage de la disponibilité des données pour les blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sur les engagements et les preuves KZG](https://youtu.be/8L2C6RDMV9Q)
- [Engagements polynomiaux KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)