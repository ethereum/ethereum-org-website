---
title: Algorithmes de minage
description: Un regard détaillé sur les algorithmes utilisés pour le minage Ethereum.
lang: fr
---

<InfoBanner emoji=":wave:">
La preuve de travail n'est plus le mécanisme de consensus d'Ethereum, ce qui signifie que le minage a été arrêté. En lieu et place, Ethereum est sécurisé par les validateurs qui misent de l'ETH. Vous pouvez commencer à miser votre ETH dès aujourd'hui. En savoir plus sur <a href='/roadmap/merge/'>La Fusion</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>la preuve d'enjeu</a> et <a href='/staking/'>la mise en jeu</a>. Cette page n'a qu'un intérêt historique.
</InfoBanner>

Le minage Ethereum utilisait un algorithme connu sous le nom d'Ethash. L'idée fondamentale de l'algorithme est qu'un mineur tente de trouver une entrée nonce en utilisant le calcul de force brute afin que le hachage en résultant soit plus petit qu'un seuil déterminé par la difficulté calculée. Ce seuil de difficulté peut être ajusté dynamiquement, ce qui permet à la production de blocs de se réaliser à intervalles réguliers.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord le [consensus de preuve de travail](/developers/docs/consensus-mechanisms/pow) et le [minage](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto était un algorithme de recherche précurseur pour le minage Ethereum qu'Ethash a remplacé. Il s'agissait de la fusion de deux algorithmes différents : Dagger et Hashimoto. Il ne s'agissait que d'une implémentation de recherche et a été remplacé par Ethash au moment du lancement du réseau principal Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) implique la génération d'un [Graphe orienté acyclique (DAG en anglais)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), dont des tranches aléatoires sont hachées ensemble. Le principe fondamental est que chaque nonce ne nécessite qu'une petite partie d'un grand arbre de données. Recalculer le sous-arbre pour chaque nonce est prohibitif pour le minage – d’où la nécessité de stocker l’arbre – mais correct pour un unique once de vérification. Dagger a été conçu pour être une alternative aux algorithmes existants comme Scrypt, qui sont difficiles à vérifier lorsque la difficulté de mémoire augmente à des niveaux réellement sécurisés. Cependant, Dagger était vulnérable à une accélération matérielle de la mémoire partagée et a été abandonné en faveur d'autres pistes de recherche.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) est un algorithme qui ajoute une résistance ASIC en étant lié aux E / S (c'est-à-dire que les lectures de mémoire sont le facteur limitant du processus de minage). La théorie est que la RAM est plus disponible que le calcul. Des milliards de dollars de recherche ont déjà investis pour étudier les possibilités d'optimisation de la mémoire vive pour différents cas d’utilisation, ce qui implique souvent des modèles d’accès quasi aléatoires (d’où la « mémoire à accès aléatoire »). En conséquence, la RAM existante est susceptible d'être modérément proche de l'optimisation pour l'évaluation de l'algorithme. Hashimoto utilise la blockchain comme source de données, satisfaisant simultanément (1) et (3) ci-dessus.

Dagger-Hashimoto a utilisé des versions modifiées des algorithmes Dagger et Hashimoto. La différence entre Dagger Hashimoto et Hashimoto réside dans le fait qu'au lieu d'utiliser la blockchain comme une source de données, Dagger Hashimoto utilise un ensemble de données générées sur mesure, qui se met à jour en fonction des données de chaque bloc N. L'ensemble de données est généré à l'aide de l'algorithme Dagger permettant de calculer efficacement un sous-ensemble spécifique à chaque nonce pour l'algorithme de vérification du client léger. La différence entre Dagger Hashimoto et Dagger est que, contrairement à l'original Dagger, le jeu de données utilisé pour interroger le bloc est semi-permanent, mis à jour uniquement à intervalles occasionnels (par exemple une fois par semaine). Cela signifie que la partie de l'effort de génération du jeu de données est proche de zéro. Les arguments de Sergio Lerner concernant les vitesses de mémoires partagées deviennent donc négligeables.

En savoir plus sur [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash était l'algorithme de minage qui était en fait utilisé sur le véritable réseau principal Ethereum sous l'architecture désormais obsolète de la preuve de travail. Ethash a été en fait un nouveau nom donné à une version spécifique de Dagger-Hashimoto après que l'algorithme a été mis à jour de manière significative, tout en héritant des principes fondamentaux de son prédécesseur. Le réseau principal Ethereum n'a toujours utilisé qu'Ethash, Dagger Hashimoto était une version R&D de l'algorithme de minage qui a été remplacé avant que le minage commence sur le réseau principal Ethereum.

[En savoir plus sur Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
