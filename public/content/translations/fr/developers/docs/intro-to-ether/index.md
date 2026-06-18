---
title: Introduction technique à l'ether
description: Une introduction à la cryptomonnaie ether pour les développeurs.
lang: fr
---

## Prérequis {#prerequisites}

Pour vous aider à mieux comprendre cette page, nous vous recommandons de lire d'abord l'[Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce qu'une cryptomonnaie ? {#what-is-a-cryptocurrency}

Une cryptomonnaie est un moyen d'échange sécurisé par un registre basé sur une chaîne de blocs.

Un moyen d'échange est tout ce qui est largement accepté comme paiement pour des biens et des services, et un registre est un magasin de données qui garde la trace des transactions. La technologie de la chaîne de blocs permet aux utilisateurs d'effectuer des transactions sur le registre sans dépendre d'un tiers de confiance pour le maintenir.

La première cryptomonnaie a été le Bitcoin, créé par Satoshi Nakamoto. Depuis le lancement de Bitcoin en 2009, des milliers de cryptomonnaies ont été créées sur de nombreuses chaînes de blocs différentes.

## Qu'est-ce que l'ether ? {#what-is-ether}

L'**ether (ETH)** est la cryptomonnaie utilisée pour de nombreuses choses sur le réseau Ethereum. Fondamentalement, c'est la seule forme de paiement acceptable pour les frais de transaction, et depuis [La Fusion](/roadmap/merge), l'ether est requis pour valider et proposer des blocs sur le Réseau principal. L'ether est également utilisé comme forme principale de collatéral sur les marchés de prêt de la [finance décentralisée (DeFi)](/defi), comme unité de compte sur les places de marché NFT, comme paiement gagné pour la prestation de services ou la vente de biens du monde réel, et plus encore.

Ethereum permet aux développeurs de créer des [**applications décentralisées (dapps)**](/developers/docs/dapps), qui partagent toutes un pool de puissance de calcul. Ce pool partagé est limité, Ethereum a donc besoin d'un mécanisme pour déterminer qui peut l'utiliser. Autrement, une dapp pourrait accidentellement ou malicieusement consommer toutes les ressources du réseau, ce qui empêcherait les autres d'y accéder.

La cryptomonnaie ether soutient un mécanisme de tarification pour la puissance de calcul d'Ethereum. Lorsque les utilisateurs souhaitent effectuer une transaction, ils doivent payer de l'ether pour que leur transaction soit reconnue sur la chaîne de blocs. Ces coûts d'utilisation sont connus sous le nom de [frais de gaz](/developers/docs/gas/), et les frais de gaz dépendent de la quantité de puissance de calcul requise pour exécuter la transaction et de la demande de puissance de calcul à l'échelle du réseau à ce moment-là.

Par conséquent, même si une dapp malveillante soumettait une boucle infinie, la transaction finirait par manquer d'ether et se terminerait, permettant au réseau de revenir à la normale.

Il est [courant de confondre](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum et l'ether — lorsque les gens font référence au « prix d'Ethereum », ils décrivent le prix de l'ether.

## Frappe d'ether {#minting-ether}

La frappe est le processus par lequel de nouveaux ethers sont créés sur le registre Ethereum. Le protocole Ethereum sous-jacent crée le nouvel ether, et il n'est pas possible pour un utilisateur de créer de l'ether.

L'ether est frappé comme récompense pour chaque bloc proposé et à chaque point de contrôle d'époque pour d'autres activités de validateur liées à l'atteinte du consensus. Le montant total émis dépend du nombre de validateurs et de la quantité d'ether qu'ils ont stakée. Cette émission totale est divisée de manière égale entre les validateurs dans le cas idéal où tous les validateurs sont honnêtes et en ligne, mais en réalité, elle varie en fonction des performances des validateurs. Environ 1/8 de l'émission totale va au proposeur de bloc ; le reste est distribué aux autres validateurs. Les proposeurs de blocs reçoivent également des pourboires provenant des frais de transaction et des revenus liés à la MEV, mais ceux-ci proviennent d'ethers recyclés, et non d'une nouvelle émission.

## Brûler de l'ether {#burning-ether}

Tout comme la création d'ether par le biais des récompenses de bloc, l'ether peut être détruit par un processus appelé « burn » (ou brûlage). Lorsque l'ether est brûlé, il est retiré de la circulation de façon permanente.

Le burn d'ether se produit dans chaque transaction sur Ethereum. Lorsque les utilisateurs paient pour leurs transactions, des frais de base, fixés par le réseau en fonction de la demande transactionnelle, sont détruits. Ceci, couplé à des tailles de blocs variables et à des frais de gaz maximum, simplifie l'estimation des frais de transaction sur Ethereum. Lorsque la demande du réseau est élevée, les [blocs](https://eth.blockscout.com/block/22580057) peuvent brûler plus d'ether qu'ils n'en frappent, compensant ainsi l'émission d'ether.

Brûler les frais de base entrave la capacité d'un producteur de blocs à manipuler les transactions. Par exemple, si les producteurs de blocs recevaient les frais de base, ils pourraient inclure leurs propres transactions gratuitement et augmenter les frais de base pour tous les autres. Alternativement, ils pourraient rembourser les frais de base à certains utilisateurs hors chaîne, conduisant à un marché des frais de transaction plus opaque et complexe.

## Dénominations de l'ether {#denominations}

Étant donné que la valeur de nombreuses transactions sur Ethereum est faible, l'ether possède plusieurs dénominations qui peuvent être référencées comme des unités de compte plus petites. Parmi ces dénominations, le Wei et le gwei sont particulièrement importants.

Le Wei est la plus petite quantité possible d'ether, et par conséquent, de nombreuses implémentations techniques, telles que le [Livre jaune d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), baseront tous les calculs en Wei.

Le gwei, abréviation de giga-wei, est souvent utilisé pour décrire les coûts en gaz sur Ethereum.

| Dénomination | Valeur en ether  | Utilisation courante              |
| ------------ | ---------------- | --------------------------------- |
| Wei          | 10<sup>-18</sup> | Implémentations techniques        |
| Gwei         | 10<sup>-9</sup>  | Frais de gaz lisibles par l'homme |

## Transférer de l'ether {#transferring-ether}

Chaque transaction sur Ethereum contient un champ `value`, qui spécifie le montant d'ether à transférer, libellé en Wei, à envoyer de l'adresse de l'expéditeur à l'adresse du destinataire.

Lorsque l'adresse du destinataire est un [contrat intelligent](/developers/docs/smart-contracts/), cet ether transféré peut être utilisé pour payer le gaz lorsque le contrat intelligent exécute son code.

[En savoir plus sur les transactions](/developers/docs/transactions/)

## Interroger l'ether {#querying-ether}

Les utilisateurs peuvent interroger le solde en ether de n'importe quel [compte](/developers/docs/accounts/) en inspectant le champ `balance` du compte, qui indique les avoirs en ether libellés en Wei.

[Etherscan](https://etherscan.io) et [Blockscout](https://eth.blockscout.com) sont des outils populaires pour inspecter les soldes des adresses via des applications web. Par exemple, [cette page Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) montre le solde de la Fondation Ethereum. Les soldes des comptes peuvent également être interrogés à l'aide de portefeuilles ou directement en effectuant des requêtes auprès des nœuds.

## Complément d'information {#further-reading}

- [Définir l'ether et Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Livre blanc d'Ethereum](/whitepaper/) : La proposition originale pour Ethereum. Ce document comprend une description de l'ether et les motivations derrière sa création.
- [Calculateur de Gwei](https://www.alchemy.com/gwei-calculator) : Utilisez ce calculateur de gwei pour convertir facilement des Wei, des gwei et de l'ether. Entrez simplement n'importe quel montant de Wei, de gwei ou d'ETH et calculez automatiquement la conversion.

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_