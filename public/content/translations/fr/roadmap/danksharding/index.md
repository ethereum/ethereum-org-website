---
title: Danksharding
description: Découvrez le Proto-Danksharding et le Danksharding, deux mises à jour consécutives pour passer à l’échelle Ethereum.
lang: fr
summaryPoints:
  - Le Danksharding est une mise à jour en plusieurs phases visant à améliorer le passage à l’échelle et les capacités d'Ethereum.
  - La première étape, le Proto-Danksharding, ajoute les « blobs » de données aux blocs
  - Les « blobs » de données offrent une solution moins coûteuse pour que les rollups puissent publier des données sur Ethereum, et ces coûts peuvent être répercutés sur les utilisateurs sous forme de frais de transaction réduits.
  - Plus tard, le Danksharding complet répartira la responsabilité de la vérification des blobs de données sur des sous-ensembles de nœuds, augmentant ainsi Ethereum à plus de 100 000 transactions par seconde.
---

# Danksharding {#danksharding}

Le **Danksharding** est la façon dont Ethereum devient une blockchain à grande échelle, mais plusieurs mises à jour de protocole sont nécessaires pour y parvenir. Le **Proto-Danksharding** est une étape intermédiaire sur ce chemin. Les deux visent à rendre les transactions sur les secondes couches aussi économiques que possible pour les utilisateurs et devraient permettre à Ethereum de traiter plus de >100 000 transactions par seconde.

## Qu'est-ce que le Proto-Danksharding ? {#what-is-protodanksharding}

Le Proto-Danksharding, également connu sous le nom d'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), est une manière pour les [rollups](/layer-2/#rollups) d'ajouter des données aux blocs, à moindre frais. Le nom provient des deux chercheurs qui ont proposé l'idée : Protolambda et Dankrad Feist. À l'heure actuelle, les rollups sont limités dans la mesure où ils peuvent effectuer des transactions utilisateur à moindre coût du fait qu'ils publient leurs transactions dans `CALDATA`. Cette solution est onéreuse car ces données sont traitées par l’ensemble des nœuds d’Ethereum et restent sur la blockchain pour toujours, même si les rollups n'ont besoin des données que pendant une courte période. Le Proto-Danksharding introduit des « blobs » de données qui peuvent être envoyés et ajoutés aux blocs. Les données dans ces « blobs » ne sont pas accessibles par l'EVM et sont automatiquement supprimées après une période fixe (de 1 à 3 mois). Cela signifie que les rollups peuvent envoyer leurs données à moindre frais et répercuter ces économies aux utilisateurs finaux sous forme de transactions moins onéreuses.

<ExpandableCard title="Pourquoi les blobs rendent-ils les rollups moins coûteux ?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Les rollups sont une méthode pour faire passer Ethereum à l'échelle en regroupant les transactions hors chaîne, puis en publiant les résultats sur Ethereum. Un rollup est essentiellement composé de deux parties : les données et la vérification de l'exécution. Les données représentent la séquence complète de transactions traitées par un rollup pour générer le changement d'état publié sur Ethereum. La vérification de l'exécution consiste à faire réexécuter ces transactions par un acteur honnête (un « démonstrateur ») pour garantir que le changement d'état proposé est correct. Pour que la vérification de l'exécution soit possible, les données de transaction doivent être disponibles suffisamment longtemps afin que quiconque puisse les télécharger et les vérifier. Cela signifie que tout comportement malhonnête de la part du séquenceur de rollup peut être identifié et contesté par le démonstrateur. Cependant, ces données n'ont pas besoin d'être disponibles indéfiniment.

</ExpandableCard>

<ExpandableCard title="Pourquoi est-il acceptable de supprimer les données des blobs ?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Les rollups publient des engagements liés à leurs données de transaction en chaîne et rendent également les données réelles accessibles sous forme de « blobs » de données. Cela signifie que les démonstrateurs peuvent vérifier la validité des engagements ou contester les données qu'ils estiment incorrectes. Au niveau des nœuds, les « blobs » de données sont stockés dans le client de consensus. Les clients de consensus attestent qu'ils ont vu les données et qu'elles se sont propagées sur le réseau. Si les données étaient conservées indéfiniment, ces clients deviendraient trop encombrés et cela augmenterait les besoins matériels pour faire fonctionner les nœuds. Au lieu de cela, les données sont automatiquement supprimées du nœud tous les 1 à 3 mois. Les attestations des clients de consensus démontrent qu'il y a eu suffisamment de possibilités pour que les démonstrateurs vérifient les données. Les données réelles peuvent être stockées en dehors de la blockchain par les opérateurs de rollup, les utilisateurs ou d'autres parties.

</ExpandableCard>

### Comment les données des blobs sont-elles vérifiées ? {#how-are-blobs-verified}

Les rollups publient les transactions qu'ils exécutent dans des blobs de données. Ils publient également un « engagement » envers ces données. Ils font cela en appliquant une fonction polynomiale aux données. Cette fonction peut ensuite être évaluée à différents points. Par exemple, si nous définissons une fonction extrêmement simple `f(x) = 2x-1`, alors nous pouvons évaluer cette fonction pour `x = 1`, `x = 2`, `x = 3`, ce qui donne les résultats `1, 3, 5`. Un démonstrateur applique la même fonction aux données et l'évalue aux mêmes points. Si les données d'origine sont modifiées, la fonction ne sera pas identique, et par conséquent, les valeurs évaluées à chaque point ne le seront pas non plus. En réalité, l'engagement et la preuve sont plus complexes car elles contiennent une couche de fonctions cryptographiques.

### Qu'est-ce que KZG ? {#what-is-kzg}

KZG signifie Kate-Zaverucha-Goldberg - les noms des trois [auteurs originaux](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) d'un schéma qui réduit un blob de données à un petit ["engagement" cryptographique](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Le blob de données soumis par un rollup doit être vérifié pour s'assurer que le rollup ne se comporte pas de manière incorrecte. Cela implique qu'un démonstrateur exécute à nouveau les transactions dans le blob pour vérifier que l'engagement était valide. Conceptuellement, cela correspond à la manière dont les clients d'exécution vérifient la validité des transactions Ethereum sur la couche principale à l'aide de preuves de Merkle. KZG est une preuve alternative qui applique une équation polynomiale aux données. L'engagement évalue le polynôme à des points de données tenus secrets. Un démonstrateur applique le même polynôme aux données et l'évalue aux mêmes valeurs, vérifiant que le résultat est bien identique. C'est une manière de vérifier que les données sont compatibles avec les techniques de zero-knowledge (Zk) utilisées par certains rollups et éventuellement d'autres parties du protocole Ethereum.

### Qu'est-ce que la Cérémonie KZG ? {#what-is-a-kzg-ceremony}

Une cérémonie KZG permet à de nombreuses personnes de la communauté Ethereum de générer ensemble une suite secrète de nombres aléatoires qui peut être utilisée pour vérifier certaines données. Il est très important que cette suite de nombres ne soit pas connue et ne puisse pas être recréée par qui que ce soit. Pour garantir cela, chaque personne qui participe à la cérémonie reçoit une chaine de caractères en provenance du participant précédent. Ensuite, ils créent de nouvelles valeurs aléatoires (par exemple, en mesurant les mouvements de leur souris par leur navigateur) et les mélangent avec la valeur de la chaine précédente. Ils envoient ensuite la valeur au participant suivant et la détruisent de leur machine locale. Tant qu'au moins une personne durant la cérémonie agit honnêtement, la valeur finale sera introuvable pour un attaquant. La cérémonie KZG de l'EIP-4844 était ouverte au public et des dizaines de milliers de personnes y ont participé pour ajouter leur propre entropie. Pour que la cérémonie soit compromise, il aurait fallu que 100 % de ses participants soient volontairement malhonnêtes. Du point de vue des participants, s'ils savent qu'ils ont agi honnêtement, il n'est pas nécessaire de faire confiance à quelqu'un d'autre car ils savent qu'ils ont sécurisé la cérémonie (ils ont individuellement satisfait à l'exigence d'au moins 1 participant honnête parmi N).

<ExpandableCard title="À quoi sert le nombre aléatoire de la cérémonie KZG ?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Lorsqu'un rollup publie des données dans un blob, il fournit un « engagement » qu'il publie sur la chaîne. Cet engagement est le résultat de l'évaluation d'une fonction polynomiale appliquée aux données à certains points. Ces points sont définis par les nombres aléatoires générés lors de la cérémonie KZG. Les démonstrateurs peuvent ensuite évaluer le polynôme aux mêmes points afin de vérifier les données - si les valeurs sont identiques, alors les données sont correctes.

</ExpandableCard>

<ExpandableCard title="Pourquoi les valeurs aléatoires KZG doivent-elles rester secrètes ?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Si quelqu'un connaissait les points aléatoires utilisés pour l'engagement, il pourrait facilement générer un nouveau polynôme qui s'adapterait à ces points spécifiques (c'est-à-dire une « collision »). Cela signifie qu'il pourrait ajouter ou supprimer des données du « blob » tout en fournissant une preuve valide. Pour empêcher cela, au lieu de donner directement aux démonstrateurs les emplacements des points secrets , ils reçoivent en réalité les emplacements masqués dans une « boîte noire » cryptée à l'aide de courbes elliptiques. Cela brouille les valeurs de telle manière que les valeurs originales ne peuvent pas être déchiffrées, mais avec un peu d'algèbre, les démonstrateurs et les vérificateurs peuvent toujours évaluer les polynômes aux points qu'ils représentent.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Ni le Danksharding ni le Proto-Danksharding ne suivent le modèle traditionnel de « fragmentation » qui visait à diviser la blockchain en plusieurs fragments. La fragmentation de la chaîne ne fait plus partie de la feuille de route. Au lieu de cela, le Danksharding utilise un échantillonnage de données distribué à travers les blobs pour faire passer Ethereum à l'échelle. Ceci est beaucoup plus simple à mettre en œuvre. Ce modèle est parfois désigné sous le nom de « data-sharding » ou « fragmentation de données ».
</InfoBanner>

## Qu'est-ce que le Danksharding ? {#what-is-danksharding}

Le Danksharding est la réalisation complète du passage à l'échelle des rollups commencé avec le Proto-Danksharding. Le Danksharding apportera une grande quantité de stockage sur Ethereum pour que les rollups puissent publier leurs données de transaction compressées. Cela signifie qu'Ethereum pourra facilement accueillir des centaines de rollups individuels et rendra ainsi possible des millions de transactions par seconde.

Cela fonctionne en étendant le nombre de blobs attachés aux blocs de 1 dans le Proto-Danksharding à 64 dans le Danksharding complet. Le reste des changements requis concerne des mises à jour du fonctionnement des clients de consensus pour leur permettre de gérer les nouveaux blobs de grande taille. Plusieurs de ces modifications sont déjà prévues dans la feuille de route à d'autres fins, indépendamment du Danksharding. Par exemple, le Danksharding nécessite la mise en œuvre de la séparation entre le validateur et le constructeur de blocs. Il s'agit d'une mise à jour qui sépare les tâches de construction de blocs et de proposition de blocs entre différents validateurs. De même, l'échantillonnage de la disponibilité des données est requis pour le Danksharding, mais il est également nécessaire pour le développement de clients plus légers qui ne stockent pas toutes les données historiques (clients « sans état »).

<ExpandableCard title="Pourquoi le Danksharding nécessite-t-il la séparation entre les validateurs et les constructeurs de blocs ?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

La séparation entre les validateurs et les constructeurs de blocs est nécessaire pour éviter que chaque validateur ait à générer des engagements trop volumineux et des preuves pour 32 Mo de données de blobs. Cela mettrait trop de pression sur les validateurs à domicile et les obligerait à investir dans du matériel plus puissant, ce qui nuirait à la décentralisation. Au lieu de cela, des constructeurs de blocs spécialisés prennent en charge ce travail de calcul coûteux. Ensuite, ils mettent leurs blocs à disposition des proposeurs pour qu'ils les diffusent. Le proposeur de bloc choisit simplement le bloc le plus rentable. Tout le monde peut vérifier les blobs de manière simple et rapide, ce qui signifie que n'importe quel validateur normal peut vérifier si les constructeurs de blocs se comportent honnêtement. Cela permet de traiter les blobs de grande taille sans sacrifier la décentralisation. Les constructeurs de blocs qui se comportent mal pourraient simplement être expulsés du réseau et sanctionnés - d'autres prendront leur place car la construction de blocs est une activité profitable.

</ExpandableCard>

<ExpandableCard title="Pourquoi le Danksharding nécessite-t-il un échantillonnage de disponibilité des données ?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

L'échantillonnage de la disponibilité des données est nécessaire pour que les validateurs puissent vérifier rapidement et efficacement les données de blobs. En utilisant l'échantillonnage de la disponibilité des données, les validateurs peuvent être tout à fait certains que les données de blobs étaient disponibles et que les engagements étaient corrects. Chaque validateur peut échantillonner au hasard quelques points de données et en créer une preuve, ce qui signifie qu'aucun validateur n'a à vérifier l'intégralité du blob. Si des données sont manquantes, elles seront rapidement identifiées et le blob sera rejeté.

</ExpandableCard>

### Progrès actuels {#current-progress}

L'implémentation complète du Danksharding prendra encore plusieurs années. Cependant, le Proto-Danksharding devrait arriver bientôt. Au moment où sont écrites ces lignes (février 2023), la cérémonie KZG est toujours ouverte et a jusqu'à présent attiré plus de 50 000 contributeurs. L'[EIP](https://eips.ethereum.org/EIPS/eip-4844) pour Proto-Danksharding est mature, la spécification est convenue et les clients ont implémenté des prototypes qui sont actuellement en cours de test et rendu prêt pour la production. La prochaine étape consiste à mettre en œuvre ces changements sur un réseau de test public. Vous pouvez vous tenir au courant en utilisant la [Liste de contrôle de l'EIP 4844](https://github.com/ethereum/pm/blob/master/Dencun/4844-readiness-checklist.md).

### Complément d'information {#further-reading}

- [Notes sur le Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Notes de Dankrad sur le Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Discussion de Dankrad, Proto et Vitalik sur le Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [La cérémonie KZG](https://ceremony.ethereum.org/)
- [Conférence de Carl Beekhuizen à la Devcon sur les configurations de confiance](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Plus d'informations sur l'échantillonnage de disponibilité des données pour les blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sur les engagements et les preuves KZG](https://youtu.be/8L2C6RDMV9Q)
- [Engagements polynomiaux KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
