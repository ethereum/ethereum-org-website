---
title: Bonnes pratiques de conception en matière d'échange décentralisé (DEX)
description: Un guide expliquant les décisions UX/UI pour l'échange de jetons.
lang: fr
---

Depuis le lancement d'Uniswap en 2018, des centaines d'échanges décentralisés ont été lancés sur des dizaines de chaînes différentes.
Beaucoup d'entre eux ont introduit de nouveaux éléments ou ajouté leur propre touche, mais l'interface est restée généralement la même.

L'une des raisons à cela est la [loi de Jakob](https://lawsofux.com/jakobs-law/) :

> Les utilisateurs passent la plupart de leur temps sur d'autres sites. Cela signifie que les utilisateurs préfèrent que votre site fonctionne de la même manière que tous les autres sites qu'ils connaissent déjà.

Grâce à des innovateurs de la première heure comme Uniswap, Pancakeswap et Sushiswap, les utilisateurs de la DeFi ont une idée commune de ce à quoi ressemble un DEX.
Pour cette raison, une sorte de "bonne pratique" est en train d'émerger. Nous voyons de plus en plus de décisions de conception se standardiser d'un site à l'autre. Vous pouvez voir l'évolution des DEX comme un immense exemple de test en temps réel. Les éléments qui fonctionnaient ont été conservés, tandis que ceux qui ne fonctionnaient pas ont été abandonnés. Il y a encore de la place pour la personnalisation, mais il existe certains standards auxquels un DEX doit se conformer.

Cet article est un résumé de :

- ce qu'il faut inclure
- comment le rendre aussi exploitable que possible
- les principales façons de personnaliser le design

Tous les exemples de wireframes ont été réalisés spécifiquement pour cet article, bien qu'ils soient tous basés sur des projets réels.

Le kit Figma est également inclus en bas de l'article - n'hésitez pas à l'utiliser pour accélérer la création de vos propres wireframes !

## Anatomie de base d'un DEX {#basic-anatomy-of-a-dex}

L'interface utilisateur contient généralement trois éléments :

1. Formulaire principal
2. Bouton
3. Panneau de détails

![Interface utilisateur générique d'un DEX, montrant les trois éléments principaux](./1.png)

## Variations {#variations}

Il s'agira d'un thème récurrent dans cet article, mais il existe différentes manières d'organiser ces éléments. Le “panneau de détails” peut être situé :

- Au-dessus du bouton
- En dessous du bouton
- Caché dans un panneau accordéon
- Et/ou dans une fenêtre modale de “prévisualisation”

N.B. Une fenêtre modale de “prévisualisation” est optionnelle, mais si vous affichez très peu de détails dans l'interface principale, elle devient essentielle.

## Structure du formulaire principal {#structure-of-the-main-form}

C'est dans cette boîte que vous choisissez le jeton que vous souhaitez échanger. Le composant est constitué d'un champ de saisie et d'un petit bouton disposés en ligne.

Les DEX affichent généralement des détails supplémentaires sur une ligne au-dessus et une ligne en dessous, bien que cela puisse être configuré différemment.

![Ligne de saisie, avec une ligne d'informations au-dessus et en dessous](./2.png)

## Variations {#variations2}

Deux variantes de l'interface utilisateur sont présentées ici : l'une sans bordures, créant un design très ouvert, et l'autre où la ligne de saisie est entourée d'une bordure, mettant ainsi l'accent sur cet élément.

![Deux variantes de l'interface utilisateur du formulaire principal](./3.png)

Cette structure de base permet d'afficher **quatre informations clés** dans le design : une dans chaque coin. S'il n'y a qu'une seule ligne en haut ou en bas, alors il n'y a que deux emplacements disponibles.

Au cours de l'évolution de la DeFi, de nombreux éléments différents ont été inclus à cet endroit.

## Informations clés à inclure {#key-info-to-include}

- Solde dans le portefeuille
- Bouton Max
- Équivalent en monnaie fiduciaire
- Impact sur le prix du montant « reçu »

Au début de la DeFi, l'équivalent en monnaie fiduciaire était souvent absent. Si vous développez un projet Web3, il est essentiel d'afficher un équivalent en monnaie fiduciaire. Les utilisateurs pensent encore en termes de devises locales, de sorte que pour correspondre aux modèles mentaux du monde réel, il convient de les inclure.

Dans le deuxième champ (celui où vous choisissez le jeton que vous échangez), vous pouvez également inclure l'impact sur le prix à côté du montant en monnaie fiduciaire, en calculant la différence entre le montant d'entrée et les montants de sortie estimés. Il est utile d'inclure ce détail.

Les boutons de pourcentage (par exemple, 25 %, 50 %, 75 %) peuvent être une fonctionnalité utile, mais ils occupent plus d'espace, ajoutent davantage d'appels à l'action et augmentent la charge mentale. Il en va de même pour les curseurs de pourcentage. Certaines de ces décisions en matière d'interface utilisateur dépendront de votre marque et de votre type d'utilisateur.

Des détails supplémentaires peuvent être affichés en dessous du formulaire principal. Ce type d'information s'adressant principalement aux utilisateurs professionnels, il est logique de (au choix) :

- le rendre aussi minimal que possible, ou
- le cacher dans un panneau accordéon

![Détails affichés dans les coins de ce formulaire principal](./4.png)

## Informations supplémentaires à inclure {#extra-info-to-include}

- Le prix du jeton
- Glissement
- Montant minimum reçu
- Résultats attendus
- Impact sur le prix
- Estimation du coût en gaz
- Autres frais
- Routage de l'ordre

Il est possible que certains de ces détails soient optionnels.

Le routage de l'ordre est intéressant, mais n'a pas beaucoup d'importance pour la plupart des utilisateurs.

Certains autres détails ne font que reformuler la même chose de différentes manières. Par exemple, « montant minimum reçu » et « glissement » sont deux facettes d'une même réalité. Si votre glissement est défini à 1 %, alors le montant minimum que vous pouvez espérer recevoir = sortie attendue - 1 %. Certaines interfaces afficheront le montant attendu, le montant minimum, et le glissement… Ce qui est utile, mais peut-être excessif.

La plupart des utilisateurs laisseront de toute façon le glissement par défaut.

L'« impact sur le prix » est souvent affiché entre parenthèses à côté de l'équivalent en monnaie fiduciaire dans le champ « vers ». C'est un excellent détail d'interface à ajouter, mais s'il est affiché ici, est-il vraiment nécessaire de le montrer à nouveau en dessous ? Puis à nouveau sur un écran de prévisualisation ?

De nombreux utilisateurs (en particulier ceux qui échangent de petites sommes) ne se soucieront pas de ces détails ; ils entreront simplement un chiffre et appuieront sur « swap ».

![Certains détails montrent la même chose](./5.png)

Les détails affichés dépendront de votre audience et de la perception que vous souhaitez donner à l'application.

Si vous incluez la tolérance au glissement dans le panneau de détails, vous devriez également pouvoir la modifier directement depuis cet endroit. Il s'agit d'un bon exemple d'« accélérateur » ; une astuce UX capable d'accélérer les flux des utilisateurs expérimentés, sans nuire à la convivialité générale de l'application.

![Le glissement peut être contrôlé depuis le panneau de détails](./6.png)

Il est judicieux de réfléchir attentivement non seulement à une information spécifique sur un écran, mais à l'ensemble du flux, à savoir :
Entrer des chiffres dans le formulaire principal → Scanner les détails → Cliquer pour passer à l'écran de prévisualisation (si vous avez un écran de prévisualisation).
Le panneau de détails doit-il être visible en permanence ou l'utilisateur doit-il cliquer pour l'agrandir ?
Devriez-vous créer des frictions en ajoutant un écran de prévisualisation ? Cela oblige l'utilisateur à ralentir et à réfléchir à son échange, ce qui peut être utile. Mais veulent-ils vraiment revoir les mêmes informations ? À ce stade, quelles informations leur sont les plus utiles ?

## Options de conception {#design-options}

Comme mentionné, beaucoup de ces choix dépendent de votre style personnel. Qui sont vos utilisateurs ?
Quelle est votre marque ?
Souhaitez-vous une interface "pro" affichant chaque détail ou préférez-vous quelque chose de plus minimaliste ?
Même au cas où vous viseriez les utilisateurs professionnels qui veulent toutes les informations possibles, vous devriez toujours vous rappeler les sages paroles d'Alan Cooper :

> Peu importe à quel point votre interface est belle, peu importe à quel point elle est cool, elle serait meilleure si elle était plus simple.

### Structure {#structure}

- jetons à gauche ou jetons à droite
- 2 lignes ou 3
- détails au-dessus ou en dessous du bouton
- détails dépliés, réduits ou non affichés

### Style des composants {#component-style}

- vide
- délimité
- rempli

D'un point de vue purement UX, le style de l'interface utilisateur importe moins que vous ne le pensez. Les tendances visuelles vont et viennent par cycles, et les préférences sont en grande partie subjectives.

Le moyen le plus simple de se faire une idée de cela - et de réfléchir aux différentes configurations possibles - est de jeter un œil à quelques exemples, puis de faire vos propres expériences.

Le kit Figma inclus contient des composants vides, délimités et remplis.

Jetez un œil aux exemples ci-dessous pour voir différentes façons de tout assembler :

![3 lignes dans un style rempli](./7.png)

![3 lignes dans un style délimité](./8.png)

![2 lignes dans un style vide](./9.png)

![3 lignes dans un style délimité, avec un panneau de détails](./10.png)

![3 lignes avec la ligne de saisie dans un style délimité](./11.png)

![2 lignes dans un style rempli](./12.png)

## Mais de quel côté doit aller le jeton ? {#but-which-side-should-the-token-go-on}

Au final, cela ne fait probablement pas une grande différence en termes de convivialité. Toutefois, il convient de garder à l'esprit certains éléments qui pourraient vous faire pencher d'un côté ou de l'autre.

Il a été intéressant de voir la mode changer avec le temps. Uniswap avait initialement placé le jeton à gauche, mais l'a ensuite déplacé à droite. Sushiswap a également fait ce changement lors d'une mise à jour de son design. La plupart des protocoles, mais pas tous, ont suivi cette tendance.

Les conventions en matière financière font que l'on place traditionnellement le symbole monétaire avant le chiffre, par exemple, $50, €50, £50, mais nous disons 50 dollars, 50 euros, 50 livres.

Pour l'utilisateur de base, en particulier quelqu'un qui lit de gauche à droite, de haut en bas, un jeton à droite semble probablement plus naturel.

![Une interface utilisateur avec des jetons à gauche](./13.png)

Placer le jeton à gauche et tous les chiffres à droite crée une symétrie agréable, ce qui est un avantage, mais cette disposition a un inconvénient.

La loi de proximité stipule que les éléments proches sont perçus comme étant liés. En conséquence, nous voulons placer les éléments liés les uns à côté des autres. Le solde des jetons est directement lié au jeton lui-même et changera chaque fois qu'un nouveau jeton est sélectionné. Il est donc légèrement plus logique que le solde du jeton soit à côté du bouton de sélection du jeton. Il pourrait être déplacé sous le jeton, mais cela briserait la symétrie de la disposition.

En fin de compte, les deux options présentent des avantages et des inconvénients, mais il est intéressant de noter que la tendance est au jeton placé à droite.

# Comportement du bouton {#button-behavior}

N'ayez pas de bouton séparé pour l'approbation. Évitez également de demander un clic séparé pour l'approbation. L'utilisateur veut effectuer un échange, il suffit donc d'indiquer "échanger" sur le bouton et de lancer l'approbation comme première étape. Une fenêtre modale peut afficher la progression avec un indicateur d'étapes, ou une simple notification du type "tx 1 sur 2 - approbation en cours".

![Une interface utilisateur avec des boutons séparés pour approuver et échanger](./14.png)

![Une interface utilisateur avec un seul bouton d'approbation](./15.png)

## Bouton comme aide contextuelle {#button-as-contextual-help}

Le bouton peut également servir d'alerte !

Ce modèle de conception est assez inhabituel en dehors du Web3, mais il est devenu la norme au sein de celui-ci. Il s'agit d'une innovation intéressante car elle permet de gagner de l'espace et de maintenir l'attention focalisée.

Si l'action principale - ÉCHANGER - n'est pas disponible en raison d'une erreur, la raison peut être expliquée via le bouton, par exemple :

- changer de réseau
- connecter un portefeuille
- diverses erreurs

Le bouton peut également être **associé à l'action** qui doit être effectuée. Par exemple, si l'utilisateur ne peut pas échanger parce qu'il est sur le mauvais réseau, le bouton devrait indiquer « passer à Ethereum », et lorsque l'utilisateur clique sur le bouton, le réseau devrait basculer vers Ethereum. Cela accélère considérablement le flux utilisateur.

![Actions clés initiées depuis le principal appel à l'action](./16.png)

![Message d'erreur affiché dans le principal appel à l'action](./17.png)

## Construisez le vôtre avec ce fichier Figma {#build-your-own-with-this-figma-file}

Grâce au travail acharné de plusieurs protocoles, la conception des DEX s'est beaucoup améliorée. Nous savons de quelles informations l'utilisateur a besoin, de quelle manière nous devons les présenter et comment rendre le flux aussi fluide que possible.
Nous espérons que cet article vous offrira un aperçu solide des principes UX.

Si vous souhaitez expérimenter, n'hésitez pas à utiliser le kit de wireframe Figma. Il est conçu pour être aussi simple que possible, tout en offrant suffisamment de flexibilité pour construire la structure de base de différentes manières.

[Kit de wireframe Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

La DeFi continuera d'évoluer, et il est toujours possible de l'améliorer.

Bonne chance !
