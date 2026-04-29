---
title: "Le code fait-il loi ? Les contrats intelligents expliqués"
description: "Exploration du concept « le code fait loi » à travers le prisme des contrats intelligents sur Ethereum et de la DeFi. Cette vidéo explique ce que sont les contrats intelligents, comment ils fonctionnent et la question philosophique de savoir si le code devrait être l'arbitre ultime."
lang: fr
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "contrats-intelligents"
format: explainer
author: Finematics
breadcrumb: "Contrats intelligents"
---

Une vidéo explicative de **Finematics** explorant le concept selon lequel « le code fait loi » à travers le prisme des contrats intelligents sur Ethereum, couvrant ce que sont les contrats intelligents, comment ils fonctionnent, leurs avantages par rapport aux contrats traditionnels, et pourquoi ils sont les éléments constitutifs de la finance décentralisée (DeFi).

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=pWGLtjG-F5c) publiée par Finematics. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

Avez-vous déjà entendu l'expression « le code fait loi », où la technologie est utilisée pour faire appliquer les règles ? Dans ce cas, avons-nous même besoin d'avocats ? Ou peut-être pouvons-nous vivre dans un monde entièrement automatisé où le code dicte ce que nous pouvons et ne pouvons pas faire. Avec le développement actuel des contrats intelligents, ce scénario futuriste pourrait être plus proche qu'on ne le pense.

Un contrat intelligent est un morceau de code qui peut être exécuté automatiquement et de manière déterministe. Le code du contrat intelligent est généralement stocké et exécuté sur la chaîne de blocs pour le rendre sans tiers de confiance et sécurisé. Les contrats intelligents ont également la capacité de recevoir, de stocker et d'envoyer des fonds — et même d'appeler d'autres contrats intelligents. Ils suivent la sémantique « si-alors », ce qui les rend assez faciles à programmer.

Les contrats intelligents visent à supprimer le facteur humain de la prise de décision. Le facteur humain s'avère souvent être l'élément le plus sujet aux erreurs et le moins fiable des contrats traditionnels standards.

Un distributeur automatique est très souvent cité comme une bonne analogie pour un contrat intelligent, car il partage certaines similitudes. Un distributeur automatique typique est programmé de manière à permettre certaines actions et transitions d'état en fonction de l'entrée. Il fonctionne également de manière totalement déterministe. Par exemple, si vous voulez acheter une canette de coca qui coûte deux dollars et que vous n'avez qu'un dollar, peu importe le nombre de fois que vous essayez, vous ne pourrez pas obtenir la boisson. En revanche, si vous insérez trois dollars, la machine vous donnera une canette de coca et la monnaie appropriée. Même la monnaie rendue est sélectionnée de manière prédéfinie et programmée en fonction des pièces disponibles et de celles dont la machine veut se débarrasser en premier.

Un contrat intelligent peut s'appuyer uniquement sur les informations disponibles sur la chaîne de blocs — par exemple, « si vous me donnez dix jetons A, je vous donnerai dix jetons B ». Ou il peut s'appuyer sur une source de données externe, par exemple, sur le prix de l'ETH ou du S&P 500. Ce dernier exemple rend les contrats intelligents plus complexes, car ils doivent faire confiance aux données du monde réel. La confiance nécessaire peut être minimisée en utilisant des services d'oracle, mais même les services d'oracle nécessitent de la confiance. Il existe déjà quelques projets qui, en utilisant certaines incitations, rendent les oracles plus susceptibles de fournir des données correctes. Chainlink est un projet qui se démarque clairement dans cette catégorie.

#### Contrats intelligents Ethereum (3:09) {#ethereum-smart-contracts-309}

Ethereum est une chaîne de blocs qui prend en charge les contrats intelligents et permet à un programmeur de mettre en œuvre ses propres contrats intelligents. Un contrat intelligent peut être écrit dans un langage de programmation appelé Solidity, qui a été créé spécifiquement à cet effet. Sur Ethereum, tous les contrats intelligents déployés sont immuables — cela signifie qu'une fois déployés, ils ne peuvent pas être modifiés, ce qui crée certains risques dont nous allons discuter plus tard.

Les contrats intelligents sur Ethereum sont également décentralisés, ce qui signifie qu'il n'y a pas de machine unique contrôlant le contrat. En fait, tous les nœuds du réseau Ethereum stockent le même contrat avec exactement le même état. Bien qu'Ethereum soit actuellement la plateforme de contrats intelligents à usage général la plus populaire, ce n'est pas la seule et elle a quelques concurrents, dont Cardano, Tezos, EOS et Tron — mais tous ne partagent pas les mêmes caractéristiques.

#### Définition du contrat intelligent (4:23) {#smart-contract-definition-423}

Le terme « contrat intelligent » a été inventé par le célèbre cryptographe Nick Szabo au début des années 1990. Le nom, bien qu'il ne soit pas le plus explicite, est resté et il est couramment utilisé, en particulier dans l'industrie de la chaîne de blocs. Pour voir les avantages des contrats intelligents, comparons un contrat intelligent hypothétique à son équivalent dans l'espace traditionnel.

#### Exemple de contrat intelligent (4:46) {#smart-contract-example-446}

Disons que nous voulons écrire le contrat suivant : si Alice envoie X nombre de jetons A et que Bob envoie le même nombre de jetons B, les jetons seront échangés — Alice recevra les jetons de Bob et Bob recevra les jetons d'Alice.

Dans un monde sans contrats intelligents, une façon d'y parvenir sans qu'Alice ait à faire confiance à Bob et que Bob ait à faire confiance à Alice serait de créer un contrat de séquestre avec un tiers. Le tiers collecterait les jetons A d'Alice, attendrait le même nombre de jetons B de Bob, et enverrait à Alice et Bob les jetons échangés respectifs.

#### Problèmes des contrats intelligents (5:45) {#smart-contract-problems-545}

Cette approche montre déjà quelques problèmes auxquels Alice et Bob pourraient être confrontés :

- **Faire confiance aux intermédiaires** — il n'y a aucune garantie que le tiers ne s'enfuira pas avec les jetons après avoir reçu les fonds d'Alice et de Bob. Nous devons nous fier à la réputation de l'intermédiaire et à une éventuelle assurance.
- **Résultats non déterministes** — si quelque chose tourne mal, cela peut avoir des résultats différents en fonction de multiples facteurs, y compris la juridiction où une affaire potentielle serait réglée.

D'un autre côté, un contrat intelligent fonctionnerait de manière entièrement automatisée et déterministe, s'assurant que les deux parties reçoivent les fonds lorsqu'elles remplissent les critères initiaux de dépôt des jetons. Les contrats intelligents peuvent également détenir des fonds en eux-mêmes, ce qui n'est pas possible dans le monde traditionnel.

#### Vitesse (6:47) {#speed-647}

Selon l'intermédiaire, Alice et Bob peuvent devoir attendre quelques jours ou semaines pour régler la transition des jetons. Et s'ils veulent échanger des jetons un dimanche et que l'intermédiaire ne fonctionne pas ? Avec les contrats intelligents, ce genre de problèmes disparaît, et le contrat peut être rempli quelques secondes après que les critères initiaux soient remplis.

#### Coût (7:16) {#cost-716}

Les contrats traditionnels ne sont pas seulement coûteux en raison de l'intermédiaire qui doit faire des bénéfices — il y a aussi un risque énorme de coûts cachés pour des choses comme l'arbitrage et l'exécution s'il y a des problèmes avec le contrat.

La réutilisabilité est un autre avantage : le même contrat intelligent responsable de l'échange des jetons d'Alice et de Bob pourrait être utilisé par toute autre personne souhaitant échanger des jetons. Dans le monde traditionnel, ils devraient tous signer des contrats séparés et payer les frais respectifs à l'intermédiaire.

#### Fraude (7:58) {#fraud-758}

La fraude est encore un autre coût caché, cette fois pour l'intermédiaire lui-même. L'intermédiaire devrait s'assurer que les jetons d'Alice et de Bob sont légitimes avant d'initialiser un échange. La fraude est très courante dans la finance traditionnelle, et la plupart des entreprises ont d'énormes équipes travaillant uniquement sur la prévention de la fraude. Avec les contrats intelligents, les jetons peuvent être vérifiés sur la chaîne de blocs, et avec les signatures numériques, il est immédiatement clair si Alice et Bob sont tous deux éligibles pour dépenser leurs jetons.

#### Cas d'utilisation (8:42) {#use-cases-842}

Les contrats intelligents ont un nombre croissant de cas d'utilisation allant des paiements et de la finance décentralisée (DeFi) à la chaîne d'approvisionnement et au financement participatif. Les contrats intelligents sont également les éléments de base des applications décentralisées (dapps).

#### DeFi (9:07) {#defi-907}

La finance décentralisée (DeFi) est l'une des nouvelles industries qui s'appuie fortement sur les contrats intelligents. Parmi les choses qui ont déjà été construites dans cet espace, on trouve :

- **Stablecoins décentralisés** — avec une utilisation intelligente des contrats intelligents et de certaines incitations, nous pouvons créer un stablecoin indexé sur le dollar américain sans avoir à stocker des dollars dans le monde réel. MakerDAO est l'un des projets qui rend cela possible.
- **Fourniture automatisée de liquidité** — un ensemble de contrats intelligents peut permettre aux utilisateurs de fournir de la liquidité et d'échanger des jetons de manière totalement sans permission et décentralisée. Uniswap et Kyber Network sont de bons exemples de tels protocoles.

#### Financement participatif et chaînes d'approvisionnement (10:05) {#crowdfunding-and-supply-chains-1005}

Un autre cas d'utilisation consiste à apporter plus de transparence aux chaînes d'approvisionnement, où des protocoles comme OriginTrail entrent en jeu. En ce qui concerne le financement participatif, vous pouvez imaginer un contrat qui débloque des fonds dès que certains objectifs sont atteints et vérifiés par la communauté.

#### Futurs contrats intelligents (10:29) {#future-smart-contracts-1029}

Et si les contrats intelligents pouvaient faciliter des choses comme le covoiturage, la location d'appartements, et bien plus encore ? Qu'en est-il des œuvres caritatives ? Vous pouvez imaginer un fonds entièrement automatisé qui enverrait de l'argent directement aux personnes qui en ont le plus besoin, sans aucun intermédiaire. Par exemple, le fonds pourrait déterminer qu'une certaine région a été frappée par un ouragan et rediriger les fonds vers cette partie du monde. Pour l'instant, cela semble tout à fait impossible, mais tous les éléments nécessaires pour que quelque chose comme cela se produise sont en cours de construction en ce moment même.

Les cas d'utilisation des contrats intelligents sont presque infinis, mais avant de pouvoir réaliser tout cela, nous devons nous attaquer à quelques problèmes :

- **Bugs** — l'un des principaux risques en matière de contrats intelligents est quelque chose qui hante tout autre logiciel. Le meilleur exemple est le piratage de The DAO, qui a entraîné la perte de millions de dollars en ether, l'attaquant ayant pu vider les fonds du contrat intelligent. Cela a provoqué un hard fork d'Ethereum et créé beaucoup de désaccords au sein de la communauté Ethereum. Depuis le piratage de The DAO, la communauté Ethereum a mis en place de nombreuses mesures de sécurité supplémentaires. De nos jours, presque tous les contrats intelligents populaires ont fait l'objet d'un audit de sécurité, souvent par plusieurs équipes. Il y a également une tendance à utiliser des méthodes de vérification formelle pour prouver que certains contrats se comporteront toujours de la manière attendue.
- **Changements de protocole** — même si un contrat intelligent ne comporte aucun bug et a été audité, nous ne pouvons toujours pas garantir qu'un changement au niveau de la plateforme ne causera pas de problèmes. Une mise à niveau du protocole lui-même peut amener certains contrats intelligents à commencer à se comporter différemment de ce qui était prévu.
- **Données du monde réel** — les services d'oracle peuvent fournir un moyen fiable d'obtenir des informations du monde réel dans la chaîne de blocs. Mais imaginez que vous ayez loué un appartement ou une voiture et causé des dommages accidentels. Comment un contrat intelligent, sans aucune intervention humaine, pourrait-il en être informé ? Il existe de multiples exemples où il est difficile d'imaginer comment quelque chose d'inattendu qui se produit dans le monde réel peut être visible pour un contrat intelligent.

Outre ce qui précède, il existe également des risques liés à la réglementation et à la fiscalité, mais tous ces problèmes pourront éventuellement être résolus.

#### Pouvons-nous remplacer les avocats ? (13:58) {#can-we-replace-lawyers-1358}

Alors, pouvons-nous vraiment remplacer les avocats par du code ? Pas tout à fait — du moins pas pour le moment. À l'avenir, de plus en plus de contrats seront probablement automatisés, en particulier dans la finance. Mais même dans un monde entièrement automatisé, les avocats peuvent fournir des connaissances précieuses qui peuvent être traduites en code. Il y a aussi beaucoup de défis réglementaires autour de l'industrie crypto qui occuperont beaucoup les avocats pendant un certain temps. Néanmoins, si j'étais avocat, je commencerais à me renseigner sur les contrats intelligents et le codage, car ils joueront un grand rôle à l'avenir.

#### Résumé (14:53) {#summary-1453}

Avantages des contrats intelligents :

- Entièrement automatisés
- Résultats déterministes
- Sans tiers de confiance
- Rapides, précis et sécurisés
- Rentables et transparents

Inconvénients des contrats intelligents :

- Bugs logiciels
- Changements de protocole
- Incertitude réglementaire et fiscale

Même si les contrats intelligents comportent certains risques, nous n'en sommes encore qu'aux tout débuts, et la plupart des problèmes actuels peuvent être résolus.