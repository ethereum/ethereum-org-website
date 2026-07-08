---
title: "Bonnes pratiques de conception d'un échange décentralisé (DEX)"
description: "Un guide expliquant les décisions UX/UI pour l'échange de jetons."
lang: fr
---

Depuis le lancement d'Uniswap en 2018, des centaines d'échanges décentralisés ont été lancés sur des dizaines de chaînes différentes.
Beaucoup d'entre eux ont introduit de nouveaux éléments ou ajouté leur propre touche, mais l'interface est restée globalement la même.

L'une des raisons à cela est la [loi de Jakob](https://lawsofux.com/jakobs-law/) :

> Les utilisateurs passent la plupart de leur temps sur d'autres sites. Cela signifie que les utilisateurs préfèrent que votre site fonctionne de la même manière que tous les autres sites qu'ils connaissent déjà.

Grâce aux premiers innovateurs comme Uniswap, Pancakeswap et Sushiswap, les utilisateurs de la finance décentralisée (DeFi) ont une idée collective de ce à quoi ressemble un DEX.
Pour cette raison, quelque chose s'apparentant à des « bonnes pratiques » émerge actuellement. Nous voyons de plus en plus de décisions de conception se standardiser d'un site à l'autre. Vous pouvez voir l'évolution des DEX comme un exemple géant de test en direct. Les choses qui ont fonctionné sont restées, celles qui n'ont pas fonctionné ont été rejetées. Il y a toujours de la place pour la personnalité, mais il y a certaines normes auxquelles un DEX devrait se conformer.

Cet article est un résumé de :
- ce qu'il faut inclure
- comment le rendre aussi utilisable que possible
- les principales façons de personnaliser la conception

Tous les exemples de maquettes (wireframes) ont été réalisés spécifiquement pour cet article, bien qu'ils soient tous basés sur des projets réels.

Le kit Figma est également inclus à la fin - n'hésitez pas à l'utiliser pour accélérer la création de vos propres maquettes !

## Anatomie de base d'un DEX {#basic-anatomy-of-a-dex}

L'interface utilisateur (UI) contient généralement trois éléments :
1. Formulaire principal
2. Bouton
3. Panneau de détails

![Generic DEX UI, showing the three main elements](./1.png)


## Variations {#variations}

Ce sera un thème récurrent dans cet article, mais il existe différentes façons d'organiser ces éléments. Le « panneau de détails » peut être :
- Au-dessus du bouton
- En dessous du bouton
- Caché dans un panneau en accordéon
- Et/ou sur une fenêtre modale d'« aperçu »
  
N.B. Une fenêtre modale d'« aperçu » est facultative, mais si vous affichez très peu de détails sur l'interface utilisateur principale, elle devient essentielle.

## Structure du formulaire principal {#structure-of-the-main-form}

C'est la boîte où vous choisissez réellement le jeton que vous souhaitez échanger. Le composant se compose d'un champ de saisie et d'un petit bouton sur une même ligne.

Les DEX affichent généralement des détails supplémentaires sur une ligne au-dessus et une ligne en dessous, bien que cela puisse être configuré différemment.

![Input row, with a details row above and below](./2.png)

## Variations {#variations2}

Deux variations d'interface utilisateur sont présentées ici ; l'une sans aucune bordure, créant un design très ouvert, et l'autre où la ligne de saisie a une bordure, créant une focalisation sur cet élément.

![Two UI variations of the main form](./3.png)

Cette structure de base permet d'afficher **quatre informations clés** dans la conception : une dans chaque coin. S'il n'y a qu'une seule ligne en haut/en bas, il n'y a alors que deux emplacements.

Au cours de l'évolution de la DeFi, de nombreuses choses différentes ont été incluses ici.

## Informations clés à inclure {#key-info-to-include}

- Solde dans le portefeuille
- Bouton Max
- Équivalent en monnaie fiduciaire (fiat)
- Impact sur le prix sur le montant « reçu »

Aux débuts de la DeFi, l'équivalent en monnaie fiduciaire manquait souvent. Si vous construisez un quelconque projet Web3, il est essentiel qu'un équivalent en monnaie fiduciaire soit affiché. Les utilisateurs pensent toujours en termes de devises locales, donc afin de correspondre aux modèles mentaux du monde réel, cela devrait être inclus.

Sur le deuxième champ (celui où vous choisissez le jeton vers lequel vous échangez), vous pouvez également inclure l'impact sur le prix à côté du montant en monnaie fiduciaire, en calculant la différence entre le montant d'entrée et les montants de sortie estimés. C'est un détail très utile à inclure.

Les boutons de pourcentage (par ex., 25 %, 50 %, 75 %) peuvent être une fonctionnalité utile, mais ils prennent plus de place, ajoutent plus d'appels à l'action et augmentent la charge mentale. Il en va de même pour les curseurs de pourcentage. Certaines de ces décisions d'interface utilisateur dépendront de votre marque et de votre type d'utilisateur.

Des détails supplémentaires peuvent être affichés sous le formulaire principal. Comme ce type d'information est principalement destiné aux utilisateurs professionnels, il est logique de :
- le garder aussi minimal que possible, ou ;
- le cacher dans un panneau en accordéon

![Details shown in the corners of that main form](./4.png)

## Informations supplémentaires à inclure {#extra-info-to-include}

- Prix du jeton
- Glissement
- Minimum reçu
- Sortie attendue
- Impact sur le prix
- Estimation du coût en gaz
- Autres frais
- Routage des ordres

On peut soutenir que certains de ces détails pourraient être facultatifs.

Le routage des ordres est intéressant, mais ne fait pas une grande différence pour la plupart des utilisateurs.

Certains autres détails ne font que reformuler la même chose de différentes manières. Par exemple, le « minimum reçu » et le « glissement » sont les deux faces d'une même pièce. Si vous avez un glissement défini à 1 %, alors le minimum que vous pouvez vous attendre à recevoir = sortie attendue - 1 %. Certaines interfaces utilisateur afficheront le montant attendu, le montant minimum et le glissement… Ce qui est utile mais potentiellement excessif. 

La plupart des utilisateurs laisseront de toute façon le glissement par défaut.

L'« impact sur le prix » est souvent indiqué entre parenthèses à côté de l'équivalent en monnaie fiduciaire dans le champ « vers ». C'est un excellent détail UX à ajouter, mais s'il est affiché ici, a-t-il vraiment besoin d'être affiché à nouveau en dessous ? Et ensuite encore sur un écran d'aperçu ?

De nombreux utilisateurs (en particulier ceux qui échangent de petits montants) ne se soucieront pas de ces détails ; ils entreront simplement un nombre et cliqueront sur échanger.

![Some details show the same thing](./5.png)

Les détails exacts qui sont affichés dépendront de votre public et de l'ambiance que vous souhaitez donner à l'application.

Si vous incluez la tolérance au glissement dans le panneau de détails, vous devriez également la rendre modifiable directement à partir d'ici. C'est un bon exemple d'« accélérateur » ; une astuce UX ingénieuse qui peut accélérer les flux des utilisateurs expérimentés, sans avoir d'impact sur l'utilisabilité générale de l'application.

![Slippage can be controlled from the details panel](./6.png)

C'est une bonne idée de réfléchir attentivement non seulement à une information spécifique sur un écran, mais à l'ensemble du flux :
Saisie des nombres dans le formulaire principal → Analyse des détails → Clic vers l'écran d'aperçu (si vous avez un écran d'aperçu). 
Le panneau de détails doit-il être visible à tout moment, ou l'utilisateur doit-il cliquer dessus pour le développer ?
Devriez-vous créer des frictions en ajoutant un écran d'aperçu ? Cela oblige l'utilisateur à ralentir et à considérer sa transaction, ce qui peut être utile. Mais veulent-ils revoir toutes les mêmes informations ? Qu'est-ce qui leur est le plus utile à ce stade ?

## Options de conception {#design-options}

Comme mentionné, une grande partie de cela se résume à votre style personnel
Qui est votre utilisateur ?
Quelle est votre marque ?
Voulez-vous une interface « pro » montrant chaque détail, ou voulez-vous être minimaliste ?
Même si vous visez les utilisateurs professionnels qui veulent toutes les informations possibles, vous devriez toujours vous souvenir des sages paroles d'Alan Cooper :

> Peu importe à quel point votre interface est belle, peu importe à quel point elle est cool, ce serait mieux s'il y en avait moins.

### Structure {#structure}

- jetons à gauche, ou jetons à droite
- 2 lignes ou 3
- détails au-dessus ou en dessous du bouton
- détails développés, réduits ou non affichés

### Style des composants {#component-style}

- vide
- avec contour
- rempli

D'un point de vue purement UX, le style de l'interface utilisateur compte moins que vous ne le pensez. Les tendances visuelles vont et viennent par cycles, et une grande partie des préférences est subjective.

La façon la plus simple de s'en faire une idée - et de réfléchir aux différentes configurations - est de jeter un œil à quelques exemples, puis de faire quelques expériences vous-même.

Le kit Figma inclus contient des composants vides, avec contour et remplis.

Jetez un œil aux exemples ci-dessous pour voir différentes façons de tout assembler :

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Mais de quel côté le jeton doit-il aller ? {#but-which-side-should-the-token-go-on}

En fin de compte, cela ne fait probablement pas une énorme différence en termes d'utilisabilité. Il y a cependant quelques éléments à garder à l'esprit, qui pourraient vous faire pencher d'un côté ou de l'autre.

Il a été assez intéressant de voir la mode changer avec le temps. Uniswap avait initialement le jeton à gauche, mais l'a depuis déplacé vers la droite. Sushiswap a également effectué ce changement lors d'une mise à jour de conception. La plupart des protocoles, mais pas tous, ont emboîté le pas.

La convention financière place traditionnellement le symbole de la devise avant le nombre (par ex. $50, €50, £50 en anglais), mais nous *disons* 50 dollars, 50 euros, 50 livres.

Pour l'utilisateur général - en particulier quelqu'un qui lit de gauche à droite, de haut en bas - le jeton à droite semble probablement plus naturel.

![A UI with tokens on the left](./13.png)

Mettre le jeton à gauche et tous les nombres à droite semble agréablement symétrique, ce qui est un plus, mais il y a un autre inconvénient à cette disposition.

La loi de proximité stipule que les éléments qui sont proches les uns des autres sont perçus comme liés. Par conséquent, nous voulons placer les éléments liés les uns à côté des autres. Le solde du jeton est directement lié au jeton lui-même, et changera chaque fois qu'un nouveau jeton sera sélectionné. Il est donc un peu plus logique que le solde du jeton se trouve à côté du bouton de sélection du jeton. Il pourrait être déplacé sous le jeton, mais cela brise la symétrie de la disposition.

En fin de compte, il y a des avantages et des inconvénients pour les deux options, mais il est intéressant de voir comment la tendance semble s'orienter vers le jeton à droite.

## Comportement du bouton {#button-behavior}

N'ayez pas de bouton séparé pour Approuver. N'ayez pas non plus de clic séparé pour Approuver. L'utilisateur veut Échanger, alors indiquez simplement « échanger » sur le bouton et initiez l'approbation comme première étape. Une fenêtre modale peut afficher la progression avec un indicateur d'étapes, ou une simple notification « tx 1 sur 2 - en cours d'approbation ».

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Le bouton comme aide contextuelle {#button-as-contextual-help}

Le bouton peut faire double emploi en tant qu'alerte !

C'est en fait un modèle de conception assez inhabituel en dehors du Web3, mais il est devenu standard à l'intérieur de celui-ci. C'est une bonne innovation car elle permet de gagner de la place et de maintenir l'attention concentrée.

Si l'action principale - ÉCHANGER - est indisponible en raison d'une erreur, la raison peut être expliquée avec le bouton, par ex. :

- changer de réseau
- connecter le portefeuille
- diverses erreurs

Le bouton peut également être **associé à l'action** qui doit être effectuée. Par exemple, si l'utilisateur ne peut pas échanger parce qu'il est sur le mauvais réseau, le bouton devrait indiquer « passer à Ethereum », et lorsque l'utilisateur clique sur le bouton, il devrait changer le réseau pour Ethereum. Cela accélère considérablement le flux de l'utilisateur.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Créez le vôtre avec ce fichier Figma {#build-your-own-with-this-figma-file}

Grâce au travail acharné de multiples protocoles, la conception des DEX s'est beaucoup améliorée. Nous savons de quelles informations l'utilisateur a besoin, comment nous devons les afficher et comment rendre le flux aussi fluide que possible.
Espérons que cet article fournisse un aperçu solide des principes UX. 

Si vous souhaitez expérimenter, n'hésitez pas à utiliser le kit de maquettes Figma. Il est gardé aussi simple que possible, mais offre suffisamment de flexibilité pour construire la structure de base de différentes manières.

[Kit de maquettes Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

La DeFi continuera d'évoluer, et il y a toujours place à l'amélioration. 

Bonne chance !