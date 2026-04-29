---
title: "Que sont les NFT et comment peuvent-ils être utilisés dans la finance décentralisée ?"
description: "Comprendre la mécanique des jetons non fongibles (NFT) sur Ethereum et comment ils sont utilisés dans les applications de finance décentralisée (DeFi)."
lang: fr
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nft"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "prêt"
format: explainer
author: Finematics
breadcrumb: "NFT et DeFi"
---

Une explication par **Finematics** couvrant la mécanique des jetons non fongibles (NFT) sur Ethereum et leur intersection avec la finance décentralisée (DeFi), y compris les standards de jetons, les cas d'utilisation et les prêts garantis par des NFT comme collatéral.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=Xdkkux6OxfM) publiée par Finematics. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Fongible vs non fongible (0:00) {#fungible-vs-non-fungible-000}

Commençons par le mot « fongible ». Fongible signifie que les unités individuelles d'un actif sont interchangeables et indiscernables les unes des autres. Un bon exemple d'actif fongible est une devise. Un billet de cinq dollars a toujours la même valeur que n'importe quel autre billet de cinq dollars. Vous ne vous souciez pas vraiment de savoir quel billet de cinq dollars vous recevez, car ils valent tous le même montant.

Cependant, lorsqu'il s'agit d'actifs non fongibles, chaque unité est unique et ne peut pas être directement remplacée par une autre. Un bon exemple est un billet d'avion. Même si les billets d'avion peuvent se ressembler, chacun porte un nom de passager, une destination, une heure de départ et un numéro de siège différents. Essayer d'échanger un billet d'avion contre un autre pourrait entraîner de graves problèmes.

Un autre exemple est celui des cartes à collectionner. Même si elles peuvent se ressembler, chaque carte a des attributs différents. Des facteurs tels que l'année de production ou la façon dont la carte est conservée peuvent faire la différence. Un exemple extrême de quelque chose de non fongible est une œuvre d'art — une peinture, par exemple, n'est généralement créée qu'en un seul exemplaire original.

#### Propriétés des NFT (2:13) {#properties-of-nfts-213}

Maintenant que nous savons ce que signifie « non fongible », examinons les propriétés les plus courantes des NFT.

- **Unique** — chaque NFT possède des propriétés différentes qui sont généralement stockées dans les métadonnées du jeton
- **Prouvablement rare** — il y a généralement un nombre limité de NFT, avec un exemple extrême de n'avoir qu'une seule copie ; le nombre de jetons peut être vérifié sur la chaîne de blocs
- **Indivisible** — la plupart des NFT ne peuvent pas être divisés en plus petites coupures, vous ne pouvez donc pas acheter ou transférer une fraction de votre NFT

De la même manière que les jetons standards, les NFT garantissent également la propriété de l'actif, sont facilement transférables et sont à l'épreuve de la fraude.

#### Standards de jetons : ERC-20, ERC-721 et ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Bien que les NFT puissent être implémentés sur n'importe quelle chaîne de blocs prenant en charge la programmation de contrats intelligents, les standards les plus notables sont ERC-721 et ERC-1155 sur Ethereum. Avant de nous plonger dans les standards de NFT, récapitulons rapidement l'ERC-20, car cela sera utile pour la comparaison.

**ERC-20** est un standard bien connu pour la création de jetons sur la chaîne de blocs Ethereum. Les exemples incluent des stablecoins tels que l'USDT ou le DAI, et des jetons de finance décentralisée (DeFi) tels que LEND, YFI, SNX et UNI. L'ERC-20 permet de créer des jetons fongibles — tous les jetons créés selon ce standard sont totalement indiscernables. Peu importe que vous receviez de l'USDT d'un ami ou d'une plateforme d'échange ; la valeur de chaque jeton est la même.

**ERC-721** est le standard pour la création de jetons non fongibles. Il permet de créer des contrats qui produisent des jetons distincts avec des propriétés différentes. Un exemple courant est le célèbre CryptoKitties — un jeu qui permet de collectionner et d'élever des chatons virtuels.

**ERC-1155** est l'étape suivante dans la création de jetons non fongibles. Ce standard permet de créer des contrats qui prennent en charge à la fois les jetons fongibles et non fongibles. Il a été créé par Enjin, un projet axé sur les jeux basés sur la chaîne de blocs. Dans de nombreux jeux tels que World of Warcraft, un joueur peut détenir à la fois des objets non fongibles — épées, boucliers, armures — et des objets fongibles tels que de l'or ou des flèches. L'ERC-1155 permet aux développeurs de définir à la fois des jetons fongibles et non fongibles et de décider combien de chaque doivent exister.

#### Cas d'utilisation des NFT (5:28) {#nft-use-cases-528}

Outre CryptoKitties, il existe plusieurs autres jeux populaires tirant parti des NFT, tels que Gods Unchained et Decentraland. Decentraland est un exemple intéressant car les joueurs peuvent acheter des parcelles de terrain numérique qui peuvent ensuite être revendues ou même utilisées comme espace publicitaire dans le jeu.

D'autres exemples incluent les places de marché pour l'art numérique, telles que Rarible et SuperRare, et même des agrégateurs de places de marché comme OpenSea. Un autre exemple de quelque chose de rare qui peut être représenté sous forme de NFT sont les noms de domaine — par exemple, Ethereum Name Service avec l'extension .eth et Unstoppable Domains avec l'extension .crypto.

Certains NFT peuvent être extrêmement coûteux. Le CryptoKitty le plus cher, Dragon, a été vendu pour 600 ETH à la fin de 2017 — d'une valeur d'environ cent soixante-dix mille dollars à l'époque. Les noms de domaine rares tels que exchange.eth peuvent valoir plus de cinq cent mille dollars.

#### Les NFT comme collatéral dans la DeFi (6:48) {#nfts-as-collateral-in-defi-648}

En ce qui concerne la DeFi, les NFT peuvent libérer encore plus de potentiel pour la finance décentralisée. Actuellement, la grande majorité des protocoles de prêt DeFi sont garantis par un collatéral. L'une des idées les plus intéressantes est d'utiliser les NFT comme collatéral. Cela signifie que vous seriez en mesure de fournir un NFT représentant une œuvre d'art, un terrain numérique ou même un bien immobilier sous forme de jeton comme collatéral, et d'emprunter de l'argent en l'utilisant comme garantie.

Cela semble prometteur, mais il y a un problème. Dans les plateformes de prêt et d'emprunt DeFi standards telles que Compound ou Aave, la valeur du collatéral fourni peut être facilement mesurée en intégrant des oracles de prix. Ceux-ci agrègent les prix provenant de multiples sources de liquidité, telles que les plateformes d'échange centralisées et décentralisées. Lorsqu'il s'agit de NFT, les marchés pour des jetons particuliers sont très souvent illiquides, ce qui rend le processus de découverte des prix délicat.

Pour mieux comprendre ce problème, imaginez que quelqu'un achète un CryptoKitty rare pour 10 ETH. Ce NFT est ensuite utilisé comme collatéral, et l'emprunteur tire 1 700 DAI — en supposant que 10 ETH valent 3 500 dollars et que ce NFT particulier a un ratio prêt-valeur de 50 %. Après cela, si personne d'autre n'est prêt à acheter ce CryptoKitty particulier, le marché pour ce NFT est illiquide, voire inexistant. La seule hypothèse est que le NFT vaut toujours le même montant que lors de sa dernière vente — ce qui n'est pas une hypothèse sûre, car la valeur des NFT peut changer de manière assez spectaculaire.

C'est pourquoi certains projets qui proposent des prêts garantis par des NFT utilisent un modèle légèrement différent : les prêts de pair à pair. Dans ce modèle de place de marché, les emprunteurs peuvent offrir leurs NFT comme collatéral, et les prêteurs peuvent choisir quel NFT ils sont prêts à accepter avant d'initialiser un prêt. Le NFT utilisé comme collatéral est conservé dans un contrat de séquestre, et si l'emprunteur fait défaut en ne remboursant pas le montant emprunté plus les intérêts à temps, le NFT est transféré au prêteur. Cet espace est nouveau, mais l'une des entreprises qui utilise ce modèle est NFTfi.

#### Les NFT comme produits financiers (9:32) {#nfts-as-financial-products-932}

En plus d'être utilisés comme collatéral, les NFT peuvent également représenter des produits financiers plus complexes tels que des assurances, des obligations ou des options. Yinsure de Yearn Finance est un bon exemple d'utilisation des NFT dans le domaine de l'assurance. Dans Yinsure, chaque contrat d'assurance est représenté sous la forme d'un NFT qui peut également être échangé sur un marché secondaire tel que Rarible.

Nous avons également commencé récemment à voir des concepts natifs de la DeFi tels que le minage de liquidité être utilisés par des projets NFT. Rarible, par exemple, a commencé à récompenser ses utilisateurs avec des jetons de gouvernance RARI pour la création, l'achat et la vente de NFT sur leur plateforme.

#### Le marché croissant des NFT (10:30) {#the-growing-nft-market-1030}

Avec plus de 100 millions de dollars de NFT échangés et 6 millions de dollars au cours du seul mois dernier, l'espace des NFT est l'une des niches à la croissance la plus rapide dans la crypto. Il a un énorme potentiel allant des chatons numériques aux produits financiers complexes.