---
title: "Débloquer la mise à l'échelle d'Ethereum : l'EIP-4844 expliqué"
description: "Finematics explique l'EIP-4844 (proto-danksharding), la mise à jour clé du hard fork Dencun qui introduit les transactions de blobs pour réduire considérablement les coûts des rollups de couche 2 sur Ethereum."
lang: fr
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "comment-fonctionne-ethereum"
  - "mise-a-l-echelle"
  - "eip-4844"
  - "dencun"
  - "mises-a-jour"
format: explainer
author: Finematics
breadcrumb: "L'EIP-4844 expliqué"
---

Une explication par **Finematics** couvrant l'EIP-4844 (proto-danksharding), la mise à jour clé du hard fork Dencun qui introduit les transactions de blobs pour réduire considérablement les coûts des rollups de couche 2 sur Ethereum.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=HT9PHWloIiU) publiée par Finematics. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

La mise à l'échelle d'Ethereum est un sujet vivement débattu depuis un certain temps. Les solutions de couche 2 (l2) ont été à l'avant-garde de cette bataille, offrant un moyen de traiter les transactions hors de la chaîne principale pour atténuer la congestion et réduire les frais. Mais il y a un hic : même les l2 sont confrontées à des limitations qui entravent leur efficacité et leur évolutivité. L'EIP-4844 est la prochaine étape pour accroître le potentiel des l2 et aligner Ethereum sur sa feuille de route de mise à l'échelle.

Alors, en quoi consiste exactement l'EIP-4844 ? Comment aide-t-il précisément à la mise à l'échelle des l2 ? Quelles nouvelles possibilités ouvre-t-il ? Et est-il vrai qu'il peut réduire les frais de transaction sur les l2 de plus de 90 % ?

#### Qu'est-ce que l'EIP-4844 et le proto-danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Pour rappel, EIP signifie Ethereum Improvement Proposal (proposition d'amélioration d'Ethereum), un processus par lequel les développeurs peuvent suggérer des modifications au protocole Ethereum. L'EIP-4844, en particulier, propose un nouveau type de transaction qui peut considérablement améliorer la façon dont les données sont gérées et traitées sur Ethereum. Vous avez peut-être aussi entendu le nom de « proto-danksharding », qui est désormais utilisé de manière interchangeable avec l'EIP-4844.

Le proto-danksharding est une implémentation initiale du danksharding complet. Il jette les bases d'une mise à l'échelle plus poussée avec le danksharding à l'avenir. Cela est réalisé en implémentant la majeure partie de la logique et de « l'échafaudage » qui constituent une spécification complète de danksharding, sans implémenter le partitionnement (sharding) réel des données. Procéder ainsi permet une transition plus facile et moins perturbatrice qui peut se dérouler sur plusieurs mises à jour du réseau sans introduire trop de risques pour Ethereum en une seule mise à jour.

L'idée centrale derrière l'EIP-4844 est de soutenir l'avenir « centré sur les rollups » d'Ethereum. Les rollups sont des solutions de couche 2 qui traitent les transactions en dehors de la chaîne Ethereum principale, mais qui héritent de la sécurité d'Ethereum. L'EIP-4844 vise à rendre les rollups moins chers et plus efficaces en introduisant un nouveau type de transaction qui peut être exploité par les rollups pour leur permettre de réduire leurs coûts opérationnels d'un ordre de grandeur. Cela permettra à son tour aux applications construites sur les rollups d'être beaucoup moins chères à utiliser et d'accroître l'adoption de l'ensemble de l'écosystème Ethereum.

Imaginez effectuer un échange (swap) sur un DEX sur l'un des rollups. Si le coût actuel d'une telle opération est, disons, de 1 $, il diminuera très probablement à environ 0,10 $ après l'EIP-4844. L'impact dans cet exemple comporte cependant quelques nuances que nous aborderons plus tard dans la vidéo.

L'EIP-4844, ainsi que quelques autres EIP, seront inclus dans la prochaine mise à jour Dencun du réseau.

#### Détails techniques (2:50) {#technical-details-250}

Maintenant, examinons de plus près le fonctionnement de l'EIP-4844.

L'EIP-4844 introduit un nouveau type de transaction sur Ethereum qui accepte des « blobs » de données devant être conservés dans le nœud balise pendant une courte période. Ces changements sont rétrocompatibles avec la feuille de route de mise à l'échelle d'Ethereum, et les blobs sont suffisamment petits pour que l'utilisation du disque reste gérable. Les transactions de blobs sont dans le même format que celui dans lequel elles devraient exister dans la spécification finale du danksharding.

Cela s'accompagne d'un « marché des frais de blob », garantissant que l'espace des blobs est utilisé efficacement et reste économiquement viable. Cela est réalisé en introduisant le gaz de blob comme un nouveau type de gaz. Il est indépendant du gaz normal. Pour l'instant, seuls les blobs sont tarifés en gaz de blob.

Les blobs sont constitués de 4 096 éléments de champ de 32 octets chacun. Le plafond de blobs par bloc est contrôlé par le paramètre MAX_BLOBS_PER_BLOCK. Le plafond peut commencer bas et augmenter au fil de plusieurs mises à jour du réseau. Initialement, Dencun vise 6 blobs par bloc. 4 096 × 32 octets × 6 par bloc = 0,75 Mo par bloc.

Les blobs sont conservés dans les nœuds balises (couche de consensus), et non dans la couche d'exécution. Les futurs travaux de partitionnement ne nécessitent que des modifications du nœud balise, ce qui permet à la couche d'exécution de travailler sur d'autres initiatives en parallèle.

Les blobs ont une durée de vie courte et sont élagués après environ deux semaines. Ils sont disponibles suffisamment longtemps pour que tous les acteurs d'un rollup puissent les récupérer, mais suffisamment peu de temps pour que l'utilisation du disque reste gérable. Cela permet aux blobs d'être tarifés moins chers que les données d'appel (calldata), qui sont des données stockées dans l'historique pour toujours.

L'épine dorsale cryptographique de l'EIP-4844 repose sur les engagements KZG. Sans trop entrer dans les détails, ils permettent une inclusion efficace et sécurisée des données, cruciale pour la fonctionnalité des transactions de blobs. De cette façon, seuls les engagements envers les blobs doivent être interprétés par l'EVM dans la couche d'exécution, et non les blobs eux-mêmes.

Pour générer le secret partagé pour les engagements KZG, une cérémonie largement distribuée et basée sur un navigateur a été organisée afin que tous les participants au réseau Ethereum aient la possibilité de s'assurer qu'il a été généré correctement et en toute sécurité.

L'EIP-4844 ajoute un nouveau précompilé appelé évaluation de point (point evaluation) qui vérifie une preuve KZG affirmant qu'un blob (représenté par un engagement) s'évalue à une valeur donnée à un point donné.

Alors, comment tout cela s'applique-t-il exactement aux rollups ? Avec le nouvel espace de blobs, les rollups pourront placer les données de leurs blocs dans des blobs plutôt que dans les données d'appel plus coûteuses qui ont été utilisées à cette fin jusqu'à présent. L'exploitation d'un espace de blobs à courte durée de vie dans la couche de consensus est possible car les rollups n'ont besoin que les données soient disponibles que le temps nécessaire pour s'assurer que les acteurs honnêtes peuvent construire l'espace du rollup.

Dans le cas des rollups optimistes comme Optimism ou Arbitrum, ils n'ont besoin de fournir les données sous-jacentes que tant que la fenêtre de contestation de fraude est ouverte. La preuve de fraude peut vérifier la transition par étapes plus petites, en chargeant au maximum quelques valeurs du blob à la fois via les données d'appel.

Les rollups à divulgation nulle de connaissance (ZK rollups) fourniraient deux engagements pour leurs données de transaction ou de delta d'état : l'engagement de blob et le propre engagement du ZK rollup en utilisant le système de preuve que le rollup utilise en interne. Ils utiliseraient également un protocole de preuve d'équivalence, en utilisant le précompilé d'évaluation de point mentionné précédemment, pour prouver que les deux engagements se réfèrent aux mêmes données.

#### Impact (6:25) {#impact-625}

L'impact de l'EIP-4844 sur l'écosystème Ethereum ne saurait être surestimé. Pour commencer, il améliore considérablement l'évolutivité des solutions de couche 2, en réduisant leurs coûts opérationnels et en les rendant plus compétitives par rapport à d'autres chaînes de blocs alternatives et bon marché. La réduction des coûts opérationnels est possible car la grande majorité des coûts actuellement supportés par les rollups est due aux frais payés pour les données d'appel.

De plus, l'EIP-4844 jette les bases d'une mise à l'échelle encore plus poussée grâce au danksharding complet. Cette future mise à jour divisera le réseau Ethereum en plusieurs fragments (shards) de données, chacun capable de stocker des données indépendamment, améliorant encore la capacité du réseau.

Avec la baisse des coûts opérationnels, nous pourrions assister à l'émergence d'une vague de nouvelles solutions de couche 2, attirant les développeurs pour créer des applications innovantes sur les rollups.

En ce qui concerne la diminution des coûts de transaction sur les rollups, illustrée par notre précédent exemple d'échange sur un DEX, la situation est complexe. En supposant que la demande pour les rollups reste constante après l'EIP-4844, nous pourrions en effet anticiper une réduction significative des coûts pour les utilisateurs. Cependant, les améliorations de l'évolutivité peuvent entraîner des effets économiques imprévus. Par exemple, la baisse des frais de transaction pour les utilisateurs finaux pourrait inciter davantage de personnes à utiliser les rollups, augmentant par la suite la demande sur les ressources du réseau et augmentant potentiellement les coûts de transaction.

Une chose est certaine : même si le résultat principal est l'augmentation du débit des transactions et que le coût des transactions reste le même, l'EIP-4844 jette les bases d'une évolutivité encore plus grande à l'avenir qui se traduira à terme par des transactions moins chères pour les utilisateurs.

#### Résumé (8:04) {#summary-804}

La communauté Ethereum a déjà terminé de tester l'EIP-4844 sur divers réseaux de test, avec un lancement sur le Réseau principal prévu pour le 13 mars. Il s'agit d'une étape monumentale vers l'atteinte d'une évolutivité inégalée pour Ethereum. Nous pouvons déjà voir la plupart des principaux l2 s'engager à commencer à utiliser le nouvel espace de blobs dès que la mise à jour Dencun aura lieu.

En conclusion, l'EIP-4844 est plus qu'une simple mise à jour. C'est un moment charnière dans le parcours d'Ethereum pour devenir une chaîne de blocs plus évolutive, efficace et conviviale. En réduisant les coûts et en augmentant l'efficacité des solutions de couche 2, Ethereum est prêt à consolider sa position de plateforme leader pour les applications décentralisées.