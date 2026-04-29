---
title: "Au-delà du protocole Ethereum : la séparation proposant-constructeur"
description: "Une présentation sur la séparation proposant-constructeur (PBS), un modèle de conception qui sépare les rôles de construction de bloc et de proposition de bloc dans Ethereum."
lang: fr
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "La PBS expliquée"
---

Cette présentation explique comment la production de blocs d'Ethereum a évolué d'un modèle simple vers une chaîne d'approvisionnement sophistiquée impliquant des validateurs, des constructeurs, des chercheurs et des relais. Barnabé Monnot de la Fondation Ethereum explique pourquoi la séparation proposant-constructeur (PBS) existe, comment les relais MEV-Boost servent d'intermédiaires dans la relation entre les proposants et les constructeurs, et quelles solutions intégrées au protocole sont explorées pour réduire les dépendances de confiance et améliorer la résistance à la censure, la distribution de la MEV et la décentralisation des validateurs.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=u8XvkTrjITs) publiée par le CBER Forum. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

Je m'appelle Barnabé Monnot. Je vais parler un peu de ce qui se passe en dehors du protocole, et en particulier du concept de séparation proposant-constructeur (PBS) et de la façon dont elle est exploitée avec des relais et de nombreuses infrastructures hors chaîne.

J'aime considérer le protocole comme un objet abstrait doté de certains pouvoirs. L'un des pouvoirs du protocole est sa capacité à accorder des droits à certains participants. Nous avons vu dans la présentation précédente que le protocole donne aux validateurs le pouvoir d'accomplir des tâches de consensus, mais ce n'est pas la seule chose qu'ils font — nous devons également remplir les blocs avec des transactions. Nous appelons cela les tâches d'exécution, et c'est sur cela que je veux me concentrer dans cette présentation.

#### Pourquoi les validateurs utilisent des constructeurs (0:46) {#why-validators-use-builders-046}

Ce qui est intéressant, c'est que même si le protocole est à l'origine de ces droits et les accorde aux validateurs, ce que nous observons en pratique, c'est que de nombreux validateurs choisissent de ne pas exercer ce droit eux-mêmes. Ils choisissent de donner ce droit à quelqu'un d'autre pour qu'il l'exerce en leur nom. Et ce « quelqu'un d'autre », nous le connaissons dans Ethereum sous le nom de constructeurs.

Donc, ce que nous observons, c'est que même si les validateurs continuent d'accomplir ces tâches de consensus eux-mêmes, ils décident de transmettre les tâches d'exécution aux constructeurs. C'est en fait un marché assez important. Aujourd'hui, environ 90 % des blocs sont construits par des constructeurs externes, et c'est le cas depuis environ décembre 2022 — trois mois après La Fusion. Le paiement médian du constructeur au validateur est d'environ 120 $ par bloc. Un million de dollars est versé quotidiennement, et toutes les 12 secondes, il y a la possibilité pour ce marché de parvenir à une sorte d'accord entre un proposant et un constructeur.

Aujourd'hui, je veux discuter des raisons pour lesquelles les validateurs utilisent des constructeurs, d'où vient cette relation — je vais introduire un peu la MEV et les chercheurs en cours de route — puis je vous expliquerai comment cette relation est médiée, et je parlerai des relais qui existent aujourd'hui et des solutions intégrées au protocole auxquelles nous réfléchissons. Je veux aussi prendre un peu de recul, car il est facile de voir ces images et de se dire « oh, c'est très effrayant, qu'en est-il de la décentralisation ? ». Je veux vous faire comprendre qu'il s'agit de compromis qui sont faits, mais qui, à mon avis, vont dans la bonne direction.

#### Le modèle naïf et la MEV (3:04) {#the-naive-model-and-mev-304}

Vous pouvez imaginer un modèle naïf de production de blocs où le validateur est sélectionné selon un processus de sélection de leader, et il doit créer un bloc contenant une liste de transactions provenant de la mempool. Dans le modèle le plus naïf, vous n'avez vraiment que deux parties — un validateur qui écoute la mempool, et quand c'est son tour de créer un bloc, il retire les transactions qui paient le plus de frais et les ajoute, en utilisant généralement des algorithmes d'assemblage peu sophistiqués.

Ce qui a été observé de manière assez spectaculaire au cours des cinq dernières années, c'est que cela donne beaucoup de pouvoir au producteur — en particulier le pouvoir du dernier regard. Ils voient ce que les utilisateurs veulent faire, par exemple ils voient que l'utilisateur veut faire un échange, et ils peuvent utiliser cette information pour en tirer un profit pour eux-mêmes.

Dans le meilleur des cas, ce profit provient du fonctionnement naturel du marché, comme l'arbitrage. Dans le pire des cas, il peut provenir directement de la poche de l'utilisateur, comme dans le cas des attaques sandwich. Par exemple, un utilisateur passe un ordre d'échange pour le jeton A contre le jeton B sur un marché comme Uniswap. Cette transaction va créer un déséquilibre de prix avec un autre marché déployé sur la même chaîne. Le producteur peut voir la transaction en attente et insérer sa propre transaction qui effectue un échange dans l'autre sens sur un marché différent, empochant l'arbitrage au passage.

Cela donne vraiment beaucoup de pouvoir au producteur et rend la position de producteur de blocs extrêmement précieuse. Ce privilège du producteur est quelque chose que nous appelons maintenant la **valeur maximale extractible (MEV)**.

#### Le rôle des chercheurs (5:43) {#the-role-of-searchers-543}

En pratique, les producteurs peuvent ne pas savoir où se trouve la valeur. Vous pouvez avoir des producteurs de blocs peu sophistiqués — comme mentionné, n'importe qui peut devenir un validateur tant qu'il dispose d'un capital suffisant et qu'il est capable de faire tourner un nœud. En pratique, je pourrais ne pas savoir comment faire de l'arbitrage ou ne rien connaître aux marchés financiers. Ce que je voudrais, c'est que quelqu'un me dise où se trouvent ces opportunités — un marché de personnes en concurrence pour me dire quelle est la meilleure chose à faire en tant que producteur de blocs.

Ces entités qui sont très douées pour trouver des opportunités, nous les appelons des **chercheurs**. Ils font remonter les opportunités au producteur de blocs. Le chercheur peut observer un utilisateur effectuant un échange, soit via la mempool publique, soit via des dark pools ou des canaux privés, puis communiquer au validateur : « Un échange est en cours — si vous regroupez cet échange avec cet arbitrage dans un lot de transactions atomiques et que vous incluez ce lot, alors vous pouvez gagner de l'argent grâce à l'arbitrage. » Vous aurez de nombreux chercheurs en concurrence pour convaincre le producteur de blocs.

Ce modèle fonctionne bien en pratique si le chercheur fait confiance au producteur pour garder le lot atomique. Vous avez peut-être entendu parler récemment d'une attaque sur Ethereum qui a coûté 25 millions de dollars à un groupe d'attaquants sandwich — la cause profonde était que l'attaquant a réussi à briser l'atomicité des lots, en recevant le contenu et en essayant de les réorganiser et de les modifier. C'est une propriété très importante qui ne tient vraiment que tant que l'on peut faire confiance au producteur pour ne pas briser cette atomicité.

#### Pourquoi nous avons besoin de constructeurs (8:16) {#why-we-need-builders-816}

Que faites-vous si un producteur n'est pas digne de confiance ? Après La Fusion dans Ethereum, nous avons des stakers en solo — environ 6 % du réseau — que nous ne connaissons pas. Les chercheurs ne voudront pas vraiment envoyer de lots à ces proposants de blocs parce que c'est un peu trop dangereux.

Donc, la conception à laquelle on a abouti est la suivante : au lieu que les chercheurs communiquent des lots que le producteur inclut dans son bloc, nous allons simplement créer le bloc entier pour vous. De cette façon, vous pouvez simplement signer le bloc aveuglément — vous n'avez pas besoin de savoir ce qu'il y a dedans, vous faites confiance au fait que le constructeur vous donne un bon bloc.

Maintenant, vous avez cette chaîne encore plus profonde : le validateur à une extrémité, l'utilisateur à l'autre, et entre les deux, toute cette chaîne d'intermédiaires qui continue de se densifier avec le temps. Le constructeur s'occupe de la partie exécution tandis que le validateur s'occupe du consensus.

#### Comment fonctionnent les relais MEV-Boost (13:01) {#how-mev-boost-relays-work-1301}

Disons que vous êtes un proposant et que vous voulez entrer sur ce marché. Ce service de production de blocs est un problème classique d'échange équitable — deux parties essaient de parvenir à un accord mais elles ne se font pas confiance. La littérature classique vous dit que vous ne pouvez pas faire d'échange équitable sans un tiers de confiance.

Ce que nous utilisons aujourd'hui comme tiers de confiance est ce que nous appelons un **relais** — le relais MEV-Boost. MEV-Boost est le nom du protocole qui sert d'intermédiaire dans les interactions entre les constructeurs et les validateurs. Le relais se place au milieu pour s'assurer que l'accord aboutit des deux côtés.

Le relais a plusieurs rôles. Tout d'abord, il doit valider la charge utile d'un constructeur — le relais voit en clair le bloc que le constructeur est en train de créer et peut vérifier qu'il est valide et peut être proposé au réseau. Il existe une variante appelée le relais optimiste, où le relais ne vérifie pas immédiatement la validité mais demande au constructeur un collatéral au cas où le bloc serait finalement invalide.

Deuxièmement, les constructeurs font des offres en essayant de rivaliser pour devenir le constructeur sélectionné par le validateur. Le relais agit comme un transmetteur d'offres, envoyant les offres au validateur. Ensuite, dans la dernière étape, une fois que le validateur choisit l'une des offres du relais — et le validateur peut se connecter à autant de relais qu'il le souhaite — il la signe, toujours sans savoir quel est le contenu du bloc, et renvoie l'offre signée au relais. Avec cette offre signée, le relais peut diffuser le bloc sur le réseau.

L'économie des relais est compliquée. Certains sont gratuits, un peu comme des biens publics. D'autres ont développé des modèles de revenus — le relais Ultrasound, par exemple, a un « ajustement d'offre » où ils prennent la différence entre la meilleure offre et la deuxième meilleure comme revenu.

#### La confiance et le relais (17:01) {#trust-and-the-relay-1701}

Le relais est le tiers de confiance dans le système. Supposons qu'un relais fournisse un bloc invalide — les gens le verront immédiatement parce qu'il est signé, et ils se déconnecteront très rapidement de ce relais. Vous pouvez même diffuser une sorte de preuve de faute. En l'espace de cinq blocs, si le relais ne fonctionne pas bien, les gens cesseront de lui faire confiance et se déconnecteront tout simplement.

C'est donc basé sur la confiance, mais avec l'hypothèse qu'il peut être remplacé assez rapidement. Les relais ne sont pas des validateurs — ils n'ont pas nécessairement de mise et ils n'ont pas besoin d'avoir quoi que ce soit à voir avec Ethereum. Ce pourrait être des personnes que nous connaissons et apprécions aujourd'hui, mais demain, ce pourrait être n'importe qui.

#### Intégrer la PBS dans le protocole (20:01) {#enshrining-pbs-in-the-protocol-2001}

Nous essayons d'éliminer le statut de tiers de confiance du relais. Nous avons un tiers de confiance que nous aimons dans Ethereum — et c'est Ethereum lui-même. Vous pouvez concevoir des solutions intégrées au protocole qui essaient essentiellement d'ancrer le rôle du relais et de rendre la dépendance à son égard facultative.

À l'heure actuelle, le protocole Ethereum voit une partie de ce que font les validateurs, mais est complètement aveugle au réseau de constructeurs. Nous essayons de faire en sorte que le protocole Ethereum devienne le tiers de confiance dans l'interaction entre le proposant et le constructeur — en ce sens, nous n'avons plus besoin de dépendre du relais.

#### Contraindre les constructeurs, amplifier la décentralisation (22:05) {#constraining-builders-amplifying-decentralization-2205}

La vue d'ensemble est importante. À chaque couche, il semble y avoir différents jeux en cours et différents acteurs qui se prennent de l'argent les uns aux autres — est-ce à nouveau la finance traditionnelle ? Je tiens à faire valoir que ces compromis ne partent pas d'une mauvaise intention. Ils essaient de s'appuyer sur les propriétés de ces systèmes que nous pensons utiles pour les mettre à l'échelle et les rendre plus utiles.

Vitalik a parlé d'une asymétrie fondamentale des services qu'une chaîne de blocs pourrait offrir. Le consensus nécessite un très grand ensemble décentralisé de personnes qui assurent le contrôle. Mais certains services nécessitent vraiment qu'une seule personne fasse bien le travail et que tous les autres vérifient que le travail a été bien fait. Nous n'avons besoin que d'un seul constructeur pour créer un bloc, et ensuite tout le monde peut vérifier qu'il est valide.

Aujourd'hui, il y a clairement trois constructeurs dominants : Beaver Build, Titan et rsync Builder. Est-ce un bon état des choses ? Pas vraiment — nous pouvons faire mieux. Mais est-il réaliste d'imaginer que nous aurons autant de constructeurs que de validateurs ? Probablement pas.

Ce que nous voulons vraiment, c'est cette fine couche de validateurs qui contraignent et tirent parti du fait qu'il y a des parties très puissantes au milieu qui peuvent accomplir des tâches ne nécessitant pas d'hypothèses de majorité honnête.

Quelques idées pour contraindre les constructeurs :

- **Listes d'inclusion** — où le validateur dit au constructeur « vous devez inclure ces transactions dans votre bloc »
- **Construction partielle de blocs** — diviser le bloc complet pour que le constructeur n'ait pas le monopole sur tout l'espace
- **Réduction des dépendances vis-à-vis des tiers** — ancrer le rôle du relais dans le protocole

Pour amplifier la décentralisation des validateurs :

- **Séparation attestateur-proposant** — au lieu de faire du validateur le producteur de blocs par défaut, choisir un ensemble différent de personnes pour devenir des producteurs de blocs et dissocier les rôles
- **Mécanismes de staking améliorés** — le staking dans Ethereum est un peu rudimentaire aujourd'hui et peut être amélioré

#### Questions et conclusion (27:03) {#questions-and-closing-2703}

Une question du public : dans le monde de la finance traditionnelle, le délai de règlement est en train d'être réduit de deux jours à un jour. Est-ce que réduire le délai de règlement de 12 secondes à un intervalle plus court permettrait de résoudre certains des problèmes de front-running ?

Les gens en parlent — ils appellent cela les **pré-confirmations**. L'idée est que vous envoyez votre transaction et que quelqu'un vous dit « vous y êtes, à ce prix, sur cet état ». Le fait est que vous ne pouvez pas régler plus vite que le protocole ne fonctionne. Vous ne pouvez pas obtenir un règlement de finalité plus rapide que 12 minutes. Vous ne pouvez pas aller plus vite que le temps de bloc.

Raccourcir le temps de bloc est difficile car nous voulons garder la couche des validateurs aussi décentralisée que possible, et le raccourcir ne fait qu'augmenter les exigences matérielles.