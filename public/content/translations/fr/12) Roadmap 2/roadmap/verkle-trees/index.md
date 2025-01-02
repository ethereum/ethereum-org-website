---
title: Les arbres de Verkle
description: Une description précise des arbres de Verkle et de la manière dont ceux-ci seront utilisés pour mettre à niveau Ethereum.
lang: fr
summaryPoints:
  - Découvrir ce que sont les arbres de Verkle
  - Prenez connaissance de l'amélioration utile que sont les arbres de Verkle pour Ethereum
---

# Les arbres de Verkle {#verkle-trees}

Les arbres de Verkle (porte-manteau de « Vector commitment » et « Merkle Trees ») sont une structure de données qui peut être utilisée pour mettre à niveau les nœuds d'Ethereum, afin qu'ils puissent cesser de stocker de grandes quantités de données d'état, sans perdre la capacité à valider les blocs.

## Le principe de non-vérification de l'état de la blockchain {#statelessness}

Les arbres de Verkle constituent une étape cruciale sur la voie des clients Ethereum sans état. Les clients sans état sont ceux qui n'ont nul besoin de stocker l'ensemble de la base de données d'état, afin de valider les blocs entrants. Au lieu d'utiliser leur propre copie locale de l'état d'Ethereum pour vérifier les blocs, les clients sans état ont recours à un « témoin » pour les données d'état qui arrivent avec le bloc. Un témoin est un ensemble d'éléments individuels des données d'état, nécessaires à l'exécution d'un groupe particulier de transactions, accompagné d'une preuve cryptographique que le témoin fait réellement partie de la totalité des données. Le témoin est utilisé _au lieu_ de la base de données d'état. Pour que cela fonctionne, les témoins doivent être très petits, de sorte qu'ils puissent être diffusés en toute sécurité dans le temps imparti sur le réseau, et que les validateurs puissent les traiter dans un créneau de 12 secondes. La structure actuelle des données d'état n'est pas adaptée car les témoins sont bien trop volumineux. Les arbres de Verkle résolvent ce problème en permettant l'utilisation de petits témoins, éliminant ainsi l'un des principaux obstacles à l'utilisation de clients sans état.

<ExpandableCard title="Pourquoi voulons-nous des clients sans état ?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Actuellement, les clients Ethereum utilisent une structure de données connue sous le nom de "*Patricia Merkle Trie**" ou "Arbre de Merkle Patricia" pour stocker leurs données d'état.
*Un « Patricia Merkle Trie » ou Arbre de Merkle Patricia produit une structure des données cryptographiquement authentifiée pouvant être utilisée pour sauvegarder toutes les paires (clé, valeur).
**Le terme « trie » est une abréviation de « retrieval » (récupération en anglais). Il est utilisé pour désigner spécifiquement une structure de données arborescente dans laquelle les éléments sont indexés par une séquence de caractères. Les informations concernant les comptes individuels sont conservées sous forme de feuilles sur le « trie », et les paires de feuilles sont hachées en séquence répétée jusqu'à ce qu'il ne reste qu'un seul hachage. Cet ultime hachage est connu sous le nom de « racine ». Quant à la vérification des blocs, les clients d'Ethereum exécutent l'ensemble des transactions présentes dans un bloc et mettent à jour leur arbre d'état local. Le bloc est considéré comme valide si la racine de l'arbre local est identique à celle délivrée par le proposant de bloc, car toute différence dans le calcul orchestrée par le proposant de bloc et le nœud de validation, entraînerait une divergence totale dans le hachage de la racine. Le problème de ce principe, c'est que la vérification de la blockchain requiert que chaque client stocke l'ensemble de l'arbre d'état pour le bloc principal et divers blocs historiques (par défaut, Geth conserve les données d'état pour 128 blocs situés à l'arrière du bloc principal). Cela nécessite que les clients aient accès à une grande quantité d'espace disque, ce qui constitue un obstacle à l'exécution de nœuds complets sur du matériel bon marché et à faible consommation. Une solution consiste à mettre à jour l'arbre d'état (trie) vers une structure plus efficace (l'arbre de Verkle), qui peut être synthétisée via l'utilisation d'un petit « témoin » aux données ; celui-ci pouvant être partagé en lieu et place de l'ensemble des données d'état. Le reformatage des données d'état au sein d'un arbre de Verkle est un tremplin pour passer aux clients sans état.

</ExpandableCard>

## Qu'est-ce qu'un témoin et pourquoi en avons-nous besoin ? {#what-is-a-witness}

Vérifier un bloc signifie ré-exécuter les transactions contenues dans le bloc, appliquer les modifications à l'arbre d'état (trie) d'Ethereum et calculer le nouveau hachage racine. Un bloc vérifié est un bloc dont le hachage racine d'état calculé est identique à celui fourni avec le bloc (signifiant que le proposant du bloc a vraiment effectué le calcul qu'il prétend avoir fait). Parmi les clients Ethereum actuels, mettre à jour l'état nécessite l'accès à l'intégralité de l'arbre d'état (Trie), qui est une vaste structure de données devant être stockée localement. Un témoin ne contient que les fragments des données d'état, nécessaires à l'exécution des transactions dans le bloc. Un validateur ne peut alors utiliser ces fragments que pour vérifier que le proposant du bloc a exécuté les transactions de bloc et mis à jour l'état de manière adéquate. Cependant, ceci veut dire que le témoin doit être transféré assez rapidement entre les pairs du réseau Ethereum, pour être réceptionné et traité en toute sécurité par chaque nœud, lors d'un créneau de 12 secondes. Si le témoin est trop volumineux, certains nœuds prendront bien trop de temps à télécharger celui-ci et être raccord avec la chaîne. Il s'agit d'une force centralisatrice, ce qui signifie qu'uniquement les nœuds dotés de connexions Internet haut débit peuvent participer à la validation des blocs. Avec les arbres de Verkle, nulle nécessité d'avoir l'état stocké sur votre disque dur ; _tout_ ce dont vous avez besoin pour vérifier un bloc est inclus dans le bloc lui-même. Malheureusement, les témoins qui peuvent être produits à partir des arbres de Merkle sont trop volumineux pour prendre en charge les clients sans état.

## Pourquoi les arbres de Verkle permettent-ils des témoins plus petits ? {#why-do-verkle-trees-enable-smaller-witnesses}

La structure d'un arbre de Merkle rend la taille des témoins très grande - trop grande pour diffuser en toute sécurité entre pairs dans un créneau de 12 secondes.. En effet, le témoin est un chemin reliant les données contenues dans les feuilles au hachage racine. Pour vérifier les données, il est nécessaire d'avoir non seulement tous les hachages intermédiaires qui relient chaque feuille à la racine, mais également tous les nœuds « frères ». Chaque nœud de la preuve a un lien relationnel avec lequel il est haché, ayant pour but de créer le hachage suivant dans l'arbre (Trie). Cela représente énormément de données.  Les arbres de Verkle réduisent la taille du témoin en raccourcissant la distance entre les feuilles de l'arbre et sa racine, puis en éliminant également le besoin de fournir des nœuds frères pour vérifier le hachage racine. L'utilisation d'un puissant schéma d'engagement polynomial, en substitution à l'engagement vectoriel de type hachage, augmentera son efficacité en gain d'espace. L'engagement polynomial permet au témoin d'avoir une taille fixe, quel que soit le nombre de feuilles qu'il fasse valoir.

Dans le cadre du schéma d'engagement polynomial, les témoins ont des tailles gérables qui peuvent être facilement transférées sur le réseau pair à pair (P2P). Cela permet aux clients de vérifier les changements d'état à l'intérieur de chaque bloc, avec une quantité minimale de données.

<ExpandableCard title="Dans quelle mesure exacte les arbres de Verkle peuvent-ils réduire la taille des témoins ?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

La taille du témoin varie en fonction du nombre de feuilles qu'il comprend. Supposant que le témoin couvre 1000 feuilles, un témoin pour un arbre de Merkle (trie) serait d'environ 3,5 MB (en supposant 7 niveaux dudit arbre de Merkle) Un témoin pour le même genre de données au sein d'un arbre de Verkle (en supposant 4 niveaux dans l'arborescence) ferait environ 150 Ko - **environ 23 fois plus petit**. Cette diminution dans la taille des témoins permettra aux témoins clients sans état d'être d'une petite taille suffisamment acceptable. Les témoins polynomiaux font entre 0,128 et 1 ko, en fonction de l'engagement polynomial spécifique utilisé.

</ExpandableCard>

## Quelle est la structure d'un arbre de Verkle ? {#what-is-the-structure-of-a-verkle-tree}

Les arbres de Verkle sont des paires `(clé, valeur)` où les clés sont des éléments de 32 octets, composés d'une _tige_ de 31 octets et d'un seul octet _suffix_. Ces clés sont organisées en nœuds _d'extension_ et en nœuds _internes_. Les nœuds d'extension représentent une seule tige pour 256 *enfants aux suffixes différents. *un « enfant » fait référence à un nœud ou une feuille située sous un nœud parent donné.  Les nœuds internes ont également 256 enfants, mais ils peuvent être d'autres nœuds d'extension. La principale différence entre la structure de l'arbre de Verkle et celle de l'arbre de Merkle réside dans le fait que Verkle est beaucoup plus plat, signifiant qu'il y a moins de nœuds intermédiaires reliant une feuille à la racine, et donc, moins de données requises pour générer une preuve.

![](./verkle.png)

[En savoir plus sur la structure des arbres de Merkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progrès actuels {#current-progress}

Les réseaux de test des arbres Verkle sont déjà opérationnels, mais il reste encore d'importantes mises à jour en attente pour les logiciels clients qui sont nécessaires pour prendre en charge les arbres de Verkle. Vous pouvez contribuer à accélérer les progrès en déployant des contrats sur les réseaux de test ou en exécutant des clients de réseau de test.

[Explorer le réseau de test Verkle Gen Devnet 6](https://verkle-gen-devnet-6.ethpandaops.io/)

[Regardez Guillaume Ballet expliquer le réseau de test Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (notez que le réseau de test Condrieu était une preuve de travail et a maintenant été remplacé par le réseau de test Verkle Gen Devnet 6).

## Complément d'information {#further-reading}

- [Verkle Trees for Statelessness](https://verkle.info/)
- [Dankrad Feist décrypte les arbres de Verkle sur PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet présente les arbres de Verkle à l'ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [« Comment les arbres de Verkle rendent Ethereum léger et agressif » par Guillaume Ballet à Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sur les clients sans état depuis l'ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest nous parle des arbres de Verkle et du « Statelessness » dans le podcast Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin sur les arbres de Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sur les arbres de Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentation EIP sur l'Arbre de Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
