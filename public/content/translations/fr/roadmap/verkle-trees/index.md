---
title: Arbres Verkle
description: Une description de haut niveau des arbres Verkle et de la manière dont ils seront utilisés pour mettre à niveau Ethereum
lang: fr
summaryPoints:
  - Découvrez ce que sont les arbres Verkle
  - Lisez pourquoi les arbres Verkle constituent une mise à niveau utile pour Ethereum
---

Les arbres Verkle (un mot-valise pour « engagement vectoriel » et « arbres de Merkle ») sont une structure de données qui peut être utilisée pour mettre à niveau les nœuds [Ethereum](/) afin qu'ils puissent cesser de stocker de grandes quantités de données d'état sans perdre la capacité de valider les blocs.

## Absence d'état {#statelessness}

Les arbres Verkle constituent une étape cruciale sur la voie des clients Ethereum sans état. Les clients sans état sont ceux qui n'ont pas besoin de stocker l'intégralité de la base de données d'état pour valider les blocs entrants. Au lieu d'utiliser leur propre copie locale de l'état d'Ethereum pour vérifier les blocs, les clients sans état utilisent un « témoin » des données d'état qui arrive avec le bloc. Un témoin est un ensemble d'éléments individuels des données d'état qui sont nécessaires pour exécuter un ensemble particulier de transactions, ainsi qu'une preuve cryptographique que le témoin fait réellement partie des données complètes. Le témoin est utilisé _à la place_ de la base de données d'état. Pour que cela fonctionne, les témoins doivent être très petits, afin de pouvoir être diffusés en toute sécurité sur le réseau à temps pour que les validateurs les traitent dans un créneau de 12 secondes. La structure actuelle des données d'état n'est pas adaptée car les témoins sont trop volumineux. Les arbres Verkle résolvent ce problème en permettant de petits témoins, supprimant ainsi l'un des principaux obstacles aux clients sans état.

<ExpandableCard title="Pourquoi voulons-nous des clients sans état ?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Les clients Ethereum utilisent actuellement une structure de données connue sous le nom de trie de Patricia Merkle pour stocker leurs données d'état. Les informations sur les comptes individuels sont stockées sous forme de feuilles sur le trie et des paires de feuilles sont hachées de manière répétée jusqu'à ce qu'il ne reste plus qu'un seul hash. Ce hash final est connu sous le nom de « racine ». Pour vérifier les blocs, les clients Ethereum exécutent toutes les transactions d'un bloc et mettent à jour leur trie d'état local. Le bloc est considéré comme valide si la racine de l'arbre local est identique à celle fournie par le proposeur de bloc, car toute différence dans le calcul effectué par le proposeur de bloc et le nœud de validation entraînerait un hash racine complètement différent. Le problème est que la vérification de la chaîne de blocs nécessite que chaque client stocke l'intégralité du trie d'état pour le bloc de tête et plusieurs blocs historiques (la valeur par défaut dans Geth est de conserver les données d'état pour 128 blocs derrière la tête). Cela nécessite que les clients aient accès à une grande quantité d'espace disque, ce qui constitue un obstacle à l'exécution de nœuds complets sur du matériel bon marché et à faible consommation d'énergie. Une solution à ce problème consiste à mettre à jour le trie d'état vers une structure plus efficace (arbre Verkle) qui peut être résumée à l'aide d'un petit « témoin » des données pouvant être partagé à la place des données d'état complètes. Le reformatage des données d'état en un arbre Verkle est un tremplin pour passer à des clients sans état.

</ExpandableCard>

## Qu'est-ce qu'un témoin et pourquoi en avons-nous besoin ? {#what-is-a-witness}

Vérifier un bloc signifie réexécuter les transactions contenues dans le bloc, appliquer les modifications au trie d'état d'Ethereum et calculer le nouveau hash racine. Un bloc vérifié est un bloc dont le hash racine d'état calculé est le même que celui fourni avec le bloc (car cela signifie que le proposeur de bloc a réellement effectué le calcul qu'il prétend avoir fait). Dans les clients Ethereum d'aujourd'hui, la mise à jour de l'état nécessite l'accès à l'intégralité du trie d'état, qui est une grande structure de données devant être stockée localement. Un témoin ne contient que les fragments des données d'état qui sont nécessaires pour exécuter les transactions du bloc. Un validateur peut alors utiliser uniquement ces fragments pour vérifier que le proposeur de bloc a exécuté les transactions du bloc et mis à jour l'état correctement. Cependant, cela signifie que le témoin doit être transféré entre les pairs sur le réseau Ethereum assez rapidement pour être reçu et traité par chaque nœud en toute sécurité dans un créneau de 12 secondes. Si le témoin est trop volumineux, le téléchargement pourrait prendre trop de temps pour certains nœuds, les empêchant de suivre la chaîne. Il s'agit d'une force centralisatrice car cela signifie que seuls les nœuds disposant de connexions Internet rapides peuvent participer à la validation des blocs. Avec les arbres Verkle, il n'est pas nécessaire d'avoir l'état stocké sur votre disque dur ; _tout_ ce dont vous avez besoin pour vérifier un bloc est contenu dans le bloc lui-même. Malheureusement, les témoins qui peuvent être produits à partir des tries de Merkle sont trop volumineux pour prendre en charge les clients sans état.

## Pourquoi les arbres Verkle permettent-ils des témoins plus petits ? {#why-do-verkle-trees-enable-smaller-witnesses}

La structure d'un trie de Merkle rend la taille des témoins très grande - trop grande pour être diffusée en toute sécurité entre les pairs dans un créneau de 12 secondes. Cela s'explique par le fait que le témoin est un chemin reliant les données, qui sont contenues dans des feuilles, au hash racine. Pour vérifier les données, il est nécessaire d'avoir non seulement tous les hashs intermédiaires qui relient chaque feuille à la racine, mais aussi tous les nœuds « frères ». Chaque nœud de la preuve a un frère avec lequel il est haché pour créer le hash suivant dans le trie. Cela représente beaucoup de données. Les arbres Verkle réduisent la taille du témoin en raccourcissant la distance entre les feuilles de l'arbre et sa racine, et en éliminant également la nécessité de fournir des nœuds frères pour vérifier le hash racine. Une efficacité spatiale encore plus grande sera obtenue en utilisant un puissant schéma d'engagement polynomial au lieu de l'engagement vectoriel de type hash. L'engagement polynomial permet au témoin d'avoir une taille fixe quel que soit le nombre de feuilles qu'il prouve.

Dans le cadre du schéma d'engagement polynomial, les témoins ont des tailles gérables qui peuvent facilement être transférées sur le réseau pair à pair. Cela permet aux clients de vérifier les changements d'état dans chaque bloc avec une quantité minimale de données.

<ExpandableCard title="De combien exactement les arbres Verkle peuvent-ils réduire la taille du témoin ?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

La taille du témoin varie en fonction du nombre de feuilles qu'il inclut. En supposant que le témoin couvre 1000 feuilles, un témoin pour un trie de Merkle ferait environ 3,5 Mo (en supposant 7 niveaux pour le trie). Un témoin pour les mêmes données dans un arbre Verkle (en supposant 4 niveaux pour l'arbre) ferait environ 150 ko - **environ 23 fois plus petit**. Cette réduction de la taille du témoin permettra aux témoins des clients sans état d'être d'une taille acceptable. Les témoins polynomiaux font de 0,128 à 1 ko selon l'engagement polynomial spécifique utilisé.

</ExpandableCard>

## Quelle est la structure d'un arbre Verkle ? {#what-is-the-structure-of-a-verkle-tree}

Les arbres Verkle sont des paires `(key,value)` où les clés sont des éléments de 32 octets composés d'une _souche_ de 31 octets et d'un _suffixe_ d'un seul octet. Ces clés sont organisées en nœuds d'_extension_ et en nœuds _internes_. Les nœuds d'extension représentent une souche unique pour 256 enfants avec des suffixes différents. Les nœuds internes ont également 256 enfants, mais ils peuvent être d'autres nœuds d'extension. La principale différence entre la structure de l'arbre Verkle et celle de l'arbre de Merkle est que l'arbre Verkle est beaucoup plus plat, ce qui signifie qu'il y a moins de nœuds intermédiaires reliant une feuille à la racine, et donc moins de données requises pour générer une preuve.

![Diagram of a Verkle tree data structure](./verkle.png)

[En savoir plus sur la structure des arbres Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progrès actuels {#current-progress}

Les réseaux de test d'arbres Verkle sont déjà opérationnels, mais il reste encore d'importantes mises à jour en attente pour les clients, nécessaires pour prendre en charge les arbres Verkle. Vous pouvez aider à accélérer les progrès en déployant des contrats sur les réseaux de test ou en exécutant des clients de réseau de test.

[Regardez Guillaume Ballet expliquer le réseau de test Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (notez que le réseau de test Condrieu utilisait la preuve de travail (PoW) et a maintenant été remplacé par le réseau de test Verkle Gen Devnet 6).

## Complément d'information {#further-reading}

- [Les arbres Verkle pour l'absence d'état](https://verkle.info/)
- [Dankrad Feist explique les arbres Verkle sur PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Les arbres Verkle pour le reste d'entre nous](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomie d'une preuve Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet explique les arbres Verkle à ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [« Comment les arbres Verkle rendent Ethereum svelte et efficace » par Guillaume Ballet à la Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sur les clients sans état à l'ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist explique les arbres Verkle et l'absence d'état sur le podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin sur les arbres Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sur les arbres Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentation de l'EIP sur les arbres Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)