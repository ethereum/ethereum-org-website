---
title: "Introduction technique à l’ether"
description: "Une introduction pour développeur à la cryptomonnaie ether."
lang: fr
---

## Prérequis {#prerequisites}

Pour vous aider à mieux comprendre cette page, nous vous recommandons de lire d'abord l'[Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce qu'une cryptomonnaie ? {#what-is-a-cryptocurrency}

Une cryptomonnaie est un moyen d'échange sécurisé par un registre basé sur la blockchain.

On appel « moyen d'échange » tout ce qui peut être communément accepté comme paiement pour des biens et des services, et « registre » une banque de donnée qui garde une trace des transactions. La technologie de la blockchain permet aux utilisateurs d'effectuer des transactions sur le marché sans compter sur un tiers de confiance pour maintenir le marché.

La première cryptomonnaie a été le Bitcoin, créé par Satoshi Nakamoto. Depuis la sortie du Bitcoin en 2009, des milliers de cryptomonnaies ont été créées au travers de différentes blockchains.

## Qu'est-ce-que l'ether ? {#what-is-ether}

**L'ether (ETH)** est la cryptomonnaie utilisée pour de nombreuses choses sur le réseau Ethereum. Fondamentalement, c'est la seule forme de paiement acceptable pour les frais de transaction et, après [La Fusion](/roadmap/merge), l'ether est requis pour valider et proposer des blocs sur le réseau principal. L'ether est également utilisé comme principale forme de garantie sur les marchés de prêts [DeFi](/defi), en tant qu'unité de compte sur les places de marché NFT, comme paiement perçu pour des prestations de services ou la vente de biens réels, et plus encore.

Ethereum permet aux développeurs de créer des [**applications décentralisées (dapps)**](/developers/docs/dapps), qui partagent toutes une réserve de puissance de calcul. Ce pool partagé est fini ainsi, Ethereum a besoin d'un mécanisme pour déterminer qui peut l'utiliser. Dans le cas contraire, une dapp pourrait consommer accidentellement ou de manière malveillante toutes les ressources du réseau, ce qui empêcherait les autres d'y accéder.

La cryptomonnaie ether prend en charge un mécanisme de tarification de la puissance informatique d'Ethereum. Lorsque les utilisateurs veulent faire une transaction, ils doivent payer un certain montant en ether pour que leur transaction soit reconnue sur la blockchain. Ces coûts d'utilisation sont connus sous le nom de [frais de gaz](/developers/docs/gas/), et les frais de gaz dépendent de la quantité de puissance de calcul requise pour exécuter la transaction et de la demande de puissance de calcul à l'échelle du réseau à ce moment-là.

Par conséquent, même si une dapp malveillante a soumis une boucle infinie, la transaction finirait par être à court d'ether et donc par se terminer, permettant au réseau de revenir à la normale.

Il est [courant de confondre](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum et l'ether — lorsque les gens font référence au "prix d'Ethereum", ils décrivent le prix de l'ether.

## Frappe d'ether {#minting-ether}

Frapper de l'ether est le processus par lequel de nouveaux éther sont créés sur le registre Ethereum. Le protocole Ethereum sous-jacent crée le nouvel éther. Il est impossible pour un utilisateur de créer de l'éther.

L'Ether est frappé comme une récompense pour chaque bloc proposé et à chaque point de contrôle de période pour les autres activités du validateur liées à l'obtention d'un consensus. Le montant total émis dépend du nombre de validateurs et de la quantité d'Ether qu'ils ont misé. Cette émission totale est répartie équitablement entre les validateurs dans le cas idéal où tous les validateurs sont honnêtes et en ligne, mais en réalité, il varie en fonction de la performance du validateur. Environ 1/8ème de l'émission totale va à la personne proposant le bloc ; le reste est réparti entre les autres validateurs. Les proposants de blocs reçoivent également des pourboires provenant des frais de transaction et des revenus liés au MEV, mais ceux-ci proviennent de l'Ether recyclé, et non d'une nouvelle émission.

## Brûlage d'ether {#burning-ether}

L'éther peut être créé par le biais de récompenses en bloc. Il peut aussi être détruit par un processus appelé « burn ». Quand l'ether est brûlé, il est retiré de la circulation de façon permanente.

Le brûlage d'ether se produit pour chaque transaction sur Ethereum. Lorsque les utilisateurs paient pour leurs transactions, des frais de base de gaz fixés par le réseau en fonction de la demande transactionnelle, sont détruits. Ceci, couplé à des tailles variables de blocs et à des frais de gaz maximaux, simplifie l'estimation des frais de transaction sur Ethereum. Lorsque la demande du réseau est élevée, les [blocs](https://eth.blockscout.com/block/22580057) peuvent brûler plus d'ether qu'ils n'en frappent, compensant ainsi efficacement l'émission d'ether.

Brûler les frais de base entrave la capacité d'un producteur de blocs à manipuler les transactions. Par exemple, si les créateurs de blocs obtiennent les frais de base, ils pourraient inclure leurs propres transactions gratuitement et augmenter les frais de base pour tous les autres. Ils pourraient également rembourser les frais de base à certains utilisateurs hors chaîne, engendrant un marché des frais de transaction plus opaque et plus complexe.

## Dénominations de l'ether {#denominations}

Étant donné que de nombreuses transactions sur Ethereum sont d'un faible montant, l'éther dispose de plusieurs unités de valeur qui peuvent être référencées pour de plus petites sommes. Parmi ces unités, le wei et le gwei sont particulièrement importantes.

Le wei est la plus petite quantité possible d'ether et, par conséquent, de nombreuses implémentations techniques, telles que le [Livre jaune d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), baseront tous les calculs sur le wei.

Le Gwei, abrégé de giga-wei, est souvent utilisé pour décrire les frais de gaz sur Ethereum.

| Dénomination | Valeur en ether  | Usage commun                      |
| ------------ | ---------------- | --------------------------------- |
| Wei          | 10<sup>-18</sup> | Implémentations techniques        |
| Gwei         | 10<sup>-9</sup>  | Frais de gaz lisibles par l'homme |

## Transfert d'ether {#transferring-ether}

Chaque transaction sur Ethereum contient un champ `value`, qui spécifie le montant d'ether à transférer, libellé en wei, à envoyer de l'adresse de l'expéditeur à l'adresse du destinataire.

Lorsque l'adresse du destinataire est un [contrat intelligent](/developers/docs/smart-contracts/), cet ether transféré peut être utilisé pour payer le gaz lorsque le contrat intelligent exécute son code.

[En savoir plus sur les transactions](/developers/docs/transactions/)

## Consulter le solde d'ether {#querying-ether}

Les utilisateurs peuvent consulter le solde d'ether de n'importe quel [compte](/developers/docs/accounts/) en inspectant le champ `balance` du compte, qui indique les avoirs en ether libellés en wei.

[Etherscan](https://etherscan.io) et [Blockscout](https://eth.blockscout.com) sont des outils populaires pour inspecter les soldes d'adresses via des applications Web. Par exemple, [cette page Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) montre le solde de la Ethereum Foundation. Les soldes du compte peuvent également être interrogés en utilisant des portefeuilles ou directement, en faisant des requêtes aux nœuds.

## En savoir plus {#further-reading}

- [Définition de l'ether et d'Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Livre blanc d'Ethereum](/whitepaper/) : La proposition originale pour Ethereum. Ce document contient une description de l'ether et les motivations de sa création.
- [Calculateur de Gwei](https://www.alchemy.com/gwei-calculator) : Utilisez ce calculateur de gwei pour convertir facilement du wei, du gwei et de l'ether. Il vous suffit d'introduire n'importe quelle quantité de Wei, Gwei ou ETH et de calculer automatiquement la conversion.

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
