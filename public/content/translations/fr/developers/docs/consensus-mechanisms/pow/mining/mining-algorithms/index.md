---
title: Algorithmes de minage
description: Un aperçu détaillé des algorithmes utilisés pour le minage sur Ethereum.
lang: fr
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La preuve de travail (PoW) ne sous-tend plus le mécanisme de consensus d'Ethereum, ce qui signifie que le minage a été désactivé. Au lieu de cela, Ethereum est sécurisé par des validateurs qui stakent des ETH. Vous pouvez commencer à staker vos ETH dès aujourd'hui. Pour en savoir plus, consultez <a href='/roadmap/merge/'>La Fusion</a>, la <a href='/developers/docs/consensus-mechanisms/pos/'>preuve d'enjeu (PoS)</a> et le <a href='/staking/'>staking</a>. Cette page n'est conservée qu'à des fins historiques.
</AlertDescription>
</AlertContent>
</Alert>

Le minage sur Ethereum utilisait un algorithme connu sous le nom d'Ethash. L'idée fondamentale de l'algorithme est qu'un mineur essaie de trouver une entrée de nonce en utilisant un calcul par force brute afin que le hash résultant soit inférieur à un seuil déterminé par la difficulté calculée. Ce niveau de difficulté peut être ajusté dynamiquement, permettant à la production de blocs de se produire à un intervalle régulier.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord nos articles sur le [consensus par preuve de travail](/developers/docs/consensus-mechanisms/pow) et le [minage](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto était un algorithme de recherche précurseur pour le minage sur Ethereum, qui a été remplacé par Ethash. Il s'agissait d'une fusion de deux algorithmes différents : Dagger et Hashimoto. Il n'a jamais été qu'une implémentation de recherche et a été remplacé par Ethash au moment du lancement du réseau principal Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) implique la génération d'un [graphe orienté acyclique (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), dont des tranches aléatoires sont hachées ensemble. Le principe fondamental est que chaque nonce ne nécessite qu'une petite partie d'un grand arbre de données total. Recalculer le sous-arbre pour chaque nonce est prohibitif pour le minage - d'où la nécessité de stocker l'arbre - mais acceptable pour la vérification d'un seul nonce. Dagger a été conçu pour être une alternative aux algorithmes existants comme Scrypt, qui sont exigeants en mémoire mais difficiles à vérifier lorsque leur exigence en mémoire augmente à des niveaux véritablement sécurisés. Cependant, Dagger était vulnérable à l'accélération matérielle par mémoire partagée et a été abandonné au profit d'autres pistes de recherche.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) est un algorithme qui ajoute une résistance aux ASIC en étant limité par les entrées/sorties (c'est-à-dire que les lectures en mémoire sont le facteur limitant dans le processus de minage). La théorie est que la RAM est plus disponible que la puissance de calcul ; des milliards de dollars de recherche ont déjà été investis dans l'optimisation de la RAM pour différents cas d'utilisation, qui impliquent souvent des modèles d'accès quasi aléatoires (d'où le terme « random access memory » ou mémoire à accès aléatoire). Par conséquent, la RAM existante est susceptible d'être modérément proche de l'optimal pour évaluer l'algorithme. Hashimoto utilise la chaîne de blocs comme source de données, satisfaisant simultanément les points (1) et (3) ci-dessus.

Dagger-Hashimoto utilisait des versions modifiées des algorithmes Dagger et Hashimoto. La différence entre Dagger-Hashimoto et Hashimoto est qu'au lieu d'utiliser la chaîne de blocs comme source de données, Dagger-Hashimoto utilise un ensemble de données généré sur mesure, qui se met à jour en fonction des données de bloc tous les N blocs. L'ensemble de données est généré à l'aide de l'algorithme Dagger, ce qui permet de calculer efficacement un sous-ensemble spécifique à chaque nonce pour l'algorithme de vérification du client léger. La différence entre Dagger-Hashimoto et Dagger est que, contrairement au Dagger original, l'ensemble de données utilisé pour interroger le bloc est semi-permanent, n'étant mis à jour qu'à des intervalles occasionnels (par exemple, une fois par semaine). Cela signifie que la part d'effort pour générer l'ensemble de données est proche de zéro, de sorte que les arguments de Sergio Lerner concernant les accélérations de la mémoire partagée deviennent négligeables.

En savoir plus sur [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash était l'algorithme de minage qui était réellement utilisé sur le véritable réseau principal Ethereum sous l'architecture de preuve de travail désormais obsolète. Ethash était en fait un nouveau nom donné à une version spécifique de Dagger-Hashimoto après que l'algorithme a été considérablement mis à jour, tout en héritant des principes fondamentaux de son prédécesseur. Le réseau principal Ethereum n'a jamais utilisé qu'Ethash - Dagger-Hashimoto était une version R&D de l'algorithme de minage qui a été remplacée avant que le minage ne commence sur le réseau principal Ethereum.

[En savoir plus sur Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Complément d'information {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_