---
title: Comment implémenter un marché ERC-721
description: Comment mettre en vente des articles sous forme de jetons sur un site de petites annonces décentralisé
author: "Alberto Cuesta Cañada"
tags: ["contrats intelligents", "erc-721", "solidity", "jetons"]
skill: intermediate
breadcrumb: Marché ERC-721
lang: fr
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Dans cet article, je vais vous montrer comment coder Craigslist pour la chaîne de blocs Ethereum.

Avant Gumtree, Ebay et Craigslist, les tableaux de petites annonces étaient principalement faits de liège ou de papier. Il y avait des tableaux de petites annonces dans les couloirs des écoles, les journaux, sur les lampadaires, les vitrines des magasins.

Tout cela a changé avec Internet. Le nombre de personnes pouvant voir un tableau de petites annonces spécifique s'est multiplié par plusieurs ordres de grandeur. Avec cela, les marchés qu'ils représentent sont devenus beaucoup plus efficaces et ont atteint une taille mondiale. Ebay est une entreprise massive qui tire ses origines de ces tableaux de petites annonces physiques.

Avec la chaîne de blocs, ces marchés sont sur le point de changer une fois de plus, laissez-moi vous montrer comment.

## Monétisation {#monetization}

Le modèle économique d'un site de petites annonces sur une chaîne de blocs publique devra être différent de celui d'Ebay et compagnie.

Tout d'abord, il y a [l'aspect de la décentralisation](/developers/docs/web2-vs-web3/). Les plateformes existantes doivent maintenir leurs propres serveurs. Une plateforme décentralisée est maintenue par ses utilisateurs, de sorte que le coût d'exploitation de la plateforme principale tombe à zéro pour le propriétaire de la plateforme.

Ensuite, il y a le front-end, le site web ou l'interface qui donne accès à la plateforme. Ici, il y a de nombreuses options. Les propriétaires de la plateforme peuvent restreindre l'accès et forcer tout le monde à utiliser leur interface, en facturant des frais. Les propriétaires de la plateforme peuvent également décider d'ouvrir l'accès (le pouvoir au peuple !) et laisser n'importe qui créer des interfaces pour la plateforme. Ou les propriétaires pourraient décider de toute approche se situant entre ces extrêmes.

_Les chefs d'entreprise avec plus de vision que moi sauront comment monétiser cela. Tout ce que je vois, c'est que c'est différent du statu quo et probablement rentable._

De plus, il y a l'aspect de l'automatisation et des paiements. Certaines choses peuvent être très [efficacement transformées en jetons](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) et échangées sur un site de petites annonces. Les actifs sous forme de jetons sont facilement transférés dans une chaîne de blocs. Des méthodes de paiement très complexes peuvent être facilement implémentées dans une chaîne de blocs.

Je flaire juste une opportunité commerciale ici. Un site de petites annonces sans frais de fonctionnement peut facilement être implémenté, avec des chemins de paiement complexes inclus dans chaque transaction. Je suis sûr que quelqu'un trouvera une idée sur la façon de l'utiliser.

Je suis juste heureux de le construire. Jetons un coup d'œil au code.

## Implémentation {#implementation}

Il y a quelque temps, nous avons lancé un [dépôt open source](https://github.com/HQ20/contracts?ref=hackernoon.com) avec des exemples d'implémentations de cas d'utilisation et d'autres bonus, n'hésitez pas à y jeter un œil.

Le code pour ce [site de petites annonces Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) s'y trouve, veuillez l'utiliser et en abuser. Sachez simplement que le code n'a pas été audité et que vous devez faire vos propres vérifications avant d'y investir de l'argent.

Les bases du site ne sont pas complexes. Toutes les annonces sur le site seront simplement une structure (struct) avec quelques champs :

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Ouvert, Exécuté, Annulé
}
```

Il y a donc quelqu'un qui publie l'annonce. Un article à vendre. Un prix pour l'article. Le statut de l'échange qui peut être ouvert, exécuté ou annulé.

Tous ces échanges seront conservés dans un mapping. Parce que tout dans Solidity semble être un mapping. Aussi parce que c'est pratique.

```solidity
mapping(uint256 => Trade) public trades;
```

L'utilisation d'un mapping signifie simplement que nous devons trouver un identifiant (id) pour chaque annonce avant de la publier, et nous devrons connaître l'identifiant d'une annonce avant de pouvoir agir dessus. Il existe plusieurs façons de gérer cela, soit dans le contrat intelligent, soit dans le front-end. N'hésitez pas à demander si vous avez besoin de conseils.

Vient ensuite la question de savoir quels sont ces articles que nous traitons, et quelle est cette devise utilisée pour payer la transaction.

Pour les articles, nous allons simplement demander qu'ils implémentent l'interface [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), qui n'est en réalité qu'un moyen de représenter des articles du monde réel dans une chaîne de blocs, bien que cela [fonctionne mieux avec des actifs numériques](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Nous allons spécifier notre propre contrat ERC-721 dans le constructeur, ce qui signifie que tous les actifs de notre site de petites annonces doivent avoir été transformés en jetons au préalable.

Pour les paiements, nous allons faire quelque chose de similaire. La plupart des projets de chaîne de blocs définissent leur propre cryptomonnaie [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). D'autres préfèrent en utiliser une plus courante comme le DAI. Dans ce site de petites annonces, il vous suffit de décider lors de la construction quelle sera votre devise. Facile.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Nous y arrivons. Nous avons des annonces, des articles à échanger et une devise pour les paiements. Créer une annonce signifie placer un article sous séquestre pour montrer à la fois que vous le possédez et que vous ne l'avez pas publié deux fois, potentiellement sur un autre site.

Le code ci-dessous fait exactement cela. Il place l'article sous séquestre, crée l'annonce et effectue quelques tâches de maintenance.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Accepter l'échange signifie choisir une annonce (échange), payer le prix, recevoir l'article. Le code ci-dessous récupère un échange. Vérifie qu'il est disponible. Paie l'article. Récupère l'article. Met à jour l'annonce.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Enfin, nous avons une option permettant aux vendeurs de se retirer d'un échange avant qu'un acheteur ne l'accepte. Dans certains modèles, les annonces seraient plutôt actives pendant une certaine période avant d'expirer. À vous de choisir, en fonction de la conception de votre marché.

Le code est très similaire à celui utilisé pour exécuter un échange, à la seule différence qu'aucune devise ne change de mains et que l'article retourne à la personne ayant publié l'annonce.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

C'est tout. Vous êtes arrivé à la fin de l'implémentation. Il est assez surprenant de voir à quel point certains concepts commerciaux sont compacts lorsqu'ils sont exprimés en code, et c'est l'un de ces cas. Consultez le contrat complet [dans notre dépôt](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusion {#conclusion}

Les sites de petites annonces sont une configuration de marché courante qui a évolué massivement avec Internet, devenant un modèle économique extrêmement populaire avec quelques gagnants monopolistiques.

Il se trouve également que les sites de petites annonces sont un outil facile à reproduire dans un environnement de chaîne de blocs, avec des fonctionnalités très spécifiques qui rendront possible un défi aux géants existants.

Dans cet article, j'ai tenté de faire le lien entre la réalité commerciale d'une entreprise de petites annonces et l'implémentation technologique. Ces connaissances devraient vous aider à créer une vision et une feuille de route pour l'implémentation si vous possédez les bonnes compétences.

Comme toujours, si vous êtes sur le point de construire quelque chose d'amusant et que vous aimeriez recevoir des conseils, n'hésitez pas à [m'écrire](https://albertocuesta.es/) ! Je suis toujours heureux d'aider.