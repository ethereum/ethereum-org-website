---
title: Comment mettre en œuvre un marché ERC-721
description: Comment mettre en vente des objets tokénisés dans un forum de petites annonces décentralisé
author: "Alberto Cuesta Cañada"
tags:
  - "contrats intelligents"
  - "erc-721"
  - "solidity"
  - "jetons"
skill: intermediate
lang: fr
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Dans cet article, je vais vous montrer comment coder Craigslist dans la blockchain Ethereum.

Avant Gumtree, Ebay et Craigslist, les panneaux d'affichage des petites annonces étaient principalement faits de liège ou de papier. Il y avait des panneaux de la sorte dans les couloirs des écoles, les journaux, sur les réverbères, les vitrines des magasins.

Tout cela a changé avec internet. Le nombre de personnes en mesure de voir un tableau de petites annonces spécifique a augmenté de manière exponentielle. Les marchés qu'ils représentent sont ainsi devenus beaucoup plus efficaces et d'envergure mondiale. Ebay est une énorme entreprise dont les origines remontent à ces tableaux de petites annonces physiques.

Avec la blockchain, ces marchés sont appelés à changer une fois de plus. Laissez-moi vous montrer comment.

## Monétisation {#monetization}

Le business model d'un forum public de petites annonces sur la blockchain devra être différent de celui d'Ebay et d'une entreprise.

Tout d'abord, il y a [la qestion de la décentralisation](/developers/docs/web2-vs-web3/). Les plateformes existantes doivent assurer le bon fonctionnement de leurs propres serveurs. Le bon fonctionnement d'une plateforme décentralisée est assuré par ses utilisateurs, de sorte que le coût de fonctionnement de la plateforme centrale tombe à zéro pour le propriétaire de la plateforme.

Il y a ensuite le front-end, le site Web ou l'interface qui donne accès à la plateforme. Les options sont nombreuses. Les propriétaires d'une plateforme peuvent en restreindre l'accès et obliger tout le monde à utiliser leur interface, en facturant des frais. Ils peuvent également décider d'en ouvrir l'accès (Power to the People !) et laisser n'importe qui créer des interfaces avec la plateforme. Ou encore décider d'une approche située entre ces deux extrêmes.

_Les chefs d'entreprise qui ont plus de vision que moi sauront comment monétiser cela. Tout ce que je vois, c'est que c'est différent du statu quo et probablement rentable._

Il y a aussi la question de l'automatisation et des paiements. Certaines choses peuvent être [tokénisées très efficacement](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) et échangées dans un forumde petites annonces. Les actifs tokénisés sont faciles à céder dans une blockchain. Des méthodes de paiement très complexes peuvent être facilement mises en œuvre dans une blockchain.

Je sens juste ici une occasion de faire des affaires. Il est facile de mettre en place un tableau de petites annonces sans frais de fonctionnement, avec des modalités de paiement complexes incluses pour chaque transaction. Je suis sûr que quelqu'un trouvera une idée pour concrétiser le tout.

Je suis ravi de m'atteler à la tâche. Jetons un coup d'oeil au code.

## Implémentation {#implementation}

Il y a quelque temps, nous avons lancé un [référentiel de sources ouvertes](https://github.com/HQ20/contracts?ref=hackernoon.com) avec des exemples de concrétiser d'opportunités commerciales et d'autres goodies, veuillez y jeter un coup d'œil.

Le code pour ce [forum de petites annonces Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) est là, n'hésitez pas à l'utiliser et à en abuser. Sachez simplement que le code n'a pas été vérifié et que vous devez faire votre propre recherche avant de laisser de l'argent y entrer.

Les principes de base du conseil ne sont pas complexes. Toutes les annonces dans le forum se résumeront juste à une structure avec quelques champs :

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Quelqu'un publie donc une annonce. Un article à vendre. Un prix pour cet article. Le statut de la transaction qui peut être ouverte, exécutée ou annulée.

Tous ces échanges seront conservés dans une cartographie. Parce que tout dans Solidity semble être un mapping. Et aussi parce que c'est pratique.

```solidity
mapping(uint256 => Trade) public trades;
```

Utiliser un mapping implique simplement de trouver un identifiant pour chaque annonce avant de la publier, et de connaître l'identifiant d'une annonce avant de pouvoir l'utiliser. Il existe de multiples façons de traiter ce problème, que ce soit dans le contrat intelligent ou dans le front-end. N'hésitez pas à demander si vous avez besoin de conseils.

Vient ensuite la question de savoir quels sont ces articles que nous traitons, et quelle est cette monnaie qui est utilisée pour payer la transaction.

Pour les articles, nous allons simplement demander la mise en œuvre de l'interface [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), qui n'est en fait qu'un moyen de représenter des articles du monde réel dans une blockchain, bien qu'elle [fonctionne mieux avec les actifs numériques](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Nous allons spécifier notre propre contrat ERC721 dans le constructeur, ce qui signifie que tous les actifs publiées dans notre forum de petites annonces doivent avoir été tokénisés au préalable.

Pour les paiements, nous allons faire quelque chose de similaire. La plupart des projets de blockchain définissent leur propre cryptomonnaie [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). D'autres préfèrent utiliser un produit grand public comme DAI. Dans ce forum de petites annonces, il vous suffit de décider, au moment de la construction, quelle sera votre monnaie. Facile.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Nous y arrivons. Nous avons des annonces, des articles à échanger et une monnaie pour les paiements. Créer une annonce signifie mettre un objet en dépôt pour montrer à la fois que vous l'avez et que vous ne l'avez pas publié deux fois, éventuellement dans un forum différent.

C'est exactement ce que fait le code ci-dessous. Met l'objet en dépôt, crée l'annonce, fait un peu de ménage.

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

Accepter l'échange signifie choisir une annonce (échange), payer le prix, recevoir l'article. Le code ci-dessous récupère une transaction. Vérifie si l'objet est disponible. Paie l'objet. Récupère l'objet. Met à jour l'annonce.

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

Enfin, nous offrons aux vendeurs la possibilité de se retirer d'une transaction avant qu'un acheteur ne l'accepte. Dans certains modèles, les publicités seraient plutôt diffuser en direct pendant un certain temps avant d'expirer. Votre choix, selon la conception de votre marché.

Le code est très similaire à celui utilisé pour exécuter une transaction, à ceci près qu'il n'y a pas de changement de monnaie et que l'objet revient à l'annonceur.

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

C’est tout. Vous êtes arrivé à la fin de l'implémentation. Il est assez surprenant de constater à quel point certains concepts commerciaux sont compacts lorsqu'ils sont exprimés en code, et c'est l'un de ces cas. Consultez le contrat complet [dans notre référentiel](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusion {#conclusion}

Les forums de petites annonces sont une configuration de marché commune qui s'est développée massivement avec internet, au point de devenir un business model extrêmement populaire avec quelques acteurs gagnants en situation de monopole.

Les forums de petites annonces se révèlent également être un outil facile à reproduire dans un environnement blockchain, avec des caractéristiques très spécifiques qui vont permettre de défier les géants existants.

Dans cet article, j'ai tenté de faire le lien entre la réalité commerciale d'une entreprise de publication de petites annonces et son implémentation technologique. Ces connaissances devraient vous aider à créer une vision et une feuille de route pour l'implémentation si vous avez les bonnes compétences.

Comme toujours, si vous êtes en train de construire quelque chose d'amusant et que vous souhaitez recevoir des conseils, n'hésitez pas à [m'envoyer un mot](https://albertocuesta.es/) ! Je suis toujours ravi d'aider.
