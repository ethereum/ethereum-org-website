---
title: Introduction à l'ether
description: Une introduction pour développeur à la cryptomonnaie ether.
lang: fr
---

## Prérequis {#prerequisites}

Pour vous aider à mieux comprendre cette page, nous vous recommandons de commencer par lire cette [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce qu'une cryptomonnaie ? {#what-is-a-cryptocurrency}

Une cryptomonnaie est un moyen d'échange sécurisé par un registre basé sur la blockchain.

On appel « moyen d'échange » tout ce qui peut être communément accepté comme paiement pour des biens et des services, et « registre » une banque de donnée qui garde une trace des transactions. La technologie de la blockchain permet aux utilisateurs d'effectuer des transactions sur le marché sans compter sur un tiers de confiance pour maintenir le marché.

La première cryptomonnaie a été le Bitcoin, créé par Satoshi Nakamoto. Depuis la sortie du Bitcoin en 2009, des milliers de cryptomonnaies ont été créées au travers de différentes blockchains.

## Qu'est-ce-que l'ether ? {#what-is-ether}

**Ether (ETH)** est la cryptomonnaie utilisée pour de multiples choses sur le réseau Ethereum. Fondamentalement, il s'agit de la seule forme de paiement valide pour les frais de transaction, et depuis [la fusion](/roadmap/merge), l'ether est nécessaire pour valider et proposer des blocs sur le réseau principal. L'Ether est également utilisé comme principale forme de garantie dans les marchés de prêts [DeFi](/defi), en tant qu'unité de compte sur les places de marché NFT, comme paiement gagné pour l'exécution de services ou la vente de biens réels, et bien plus encore.

Ethereum permet aux développeurs de créer des [**applications décentralisées (dApps)**](/developers/docs/dapps), qui partagent toutes une réserve de puissance informatique. Ce pool partagé est fini ainsi, Ethereum a besoin d'un mécanisme pour déterminer qui peut l'utiliser. Dans le cas contraire, une dapp pourrait consommer accidentellement ou de manière malveillante toutes les ressources du réseau, ce qui empêcherait les autres d'y accéder.

La cryptomonnaie ether prend en charge un mécanisme de tarification de la puissance informatique d'Ethereum. Lorsque les utilisateurs veulent faire une transaction, ils doivent payer un certain montant en ether pour que leur transaction soit reconnue sur la blockchain. Ces coûts d'utilisation sont connus sous le nom de [frais de gaz](/developers/docs/gas/) qui varient en fonction de la quantité de puissance de calcul nécessaire pour exécuter la transaction et de la demande de puissance informatique à l'échelle du réseau à ce même moment.

Par conséquent, même si une dapp malveillante a soumis une boucle infinie, la transaction finirait par être à court d'ether et donc par se terminer, permettant au réseau de revenir à la normale.

Il est [courant de confondre](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum et ether — lorsque les gens font référence au « prix de l'Ethereum », ils décrivent le prix de l'ether.

## Frapper de l'ether {#minting-ether}

Frapper de l'ether est le processus par lequel de nouveaux éther sont créés sur le registre Ethereum. Le protocole Ethereum sous-jacent crée le nouvel éther. Il est impossible pour un utilisateur de créer de l'éther.

L'Ether est frappé comme une récompense pour chaque bloc proposé et à chaque point de contrôle de période pour les autres activités du validateur liées à l'obtention d'un consensus. Le montant total émis dépend du nombre de validateurs et de la quantité d'Ether qu'ils ont misé. Cette émission totale est répartie équitablement entre les validateurs dans le cas idéal où tous les validateurs sont honnêtes et en ligne, mais en réalité, il varie en fonction de la performance du validateur. Environ 1/8ème de l'émission totale va à la personne proposant le bloc ; le reste est réparti entre les autres validateurs. Les proposants de blocs reçoivent également des pourboires provenant des frais de transaction et des revenus liés au MEV, mais ceux-ci proviennent de l'Ether recyclé, et non d'une nouvelle émission.

## Brûler de l'ether {#burning-ether}

L'éther peut être créé par le biais de récompenses en bloc. Il peut aussi être détruit par un processus appelé « burn ». Quand l'ether est brûlé, il est retiré de la circulation de façon permanente.

Le brûlage d'ether se produit pour chaque transaction sur Ethereum. Lorsque les utilisateurs paient pour leurs transactions, des frais de base de gaz fixés par le réseau en fonction de la demande transactionnelle, sont détruits. Ceci, couplé à des tailles variables de blocs et à des frais de gaz maximaux, simplifie l'estimation des frais de transaction sur Ethereum. Lorsque la demande du réseau est élevée, les [blocs](https://etherscan.io/block/12965263) peuvent brûler plus d'ether qu'ils n'en frappent, compensant ainsi efficacement la création d'ether.

Brûler les frais de base entrave la capacité des producteurs de blocs à manipuler les transactions. Par exemple, si les créateurs de blocs obtiennent les frais de base, ils pourraient inclure leurs propres transactions gratuitement et augmenter les frais de base pour tous les autres. Ils pourraient également rembourser les frais de base à certains utilisateurs hors chaîne, engendrant un marché des frais de transaction plus opaque et plus complexe.

## Dénominations d'ether {#denominations}

Étant donné que de nombreuses transactions sur Ethereum sont d'un faible montant, l'éther dispose de plusieurs unités de valeur qui peuvent être référencées pour de plus petites sommes. Parmi ces unités, le wei et le gwei sont particulièrement importantes.

Le Wei est la plus petite quantité possible d'éther, et par conséquent, de nombreuses implémentations techniques, comme le [livre jaune d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), baseront tous leurs calculs sur le Wei.

Le Gwei, abrégé de giga-wei, est souvent utilisé pour décrire les frais de gaz sur Ethereum.

| Dénomination | Valeur en ether  | Usage commun                      |
| ------------ | ---------------- | --------------------------------- |
| Wei          | 10<sup>-18</sup> | Implémentations techniques        |
| Gwei         | 10<sup>-9</sup>  | Frais de gaz lisibles par l'homme |

## Transférer de l'ether {#transferring-ether}

Chaque transaction sur Ethereum contient un champ `valeur` , qui spécifie le montant d'éther à transférer, libellé en wei, à envoyer de l'adresse de l'expéditeur à celle du destinataire.

Quand l'adresse du destinataire est un [contrat intelligent](/developers/docs/smart-contracts/), cet ether transféré peut être utilisé pour payer du gaz lorsque le contrat intelligent exécute son code.

[Plus d'infos sur les transactions](/developers/docs/transactions/)

## Interrogation de l'ether {#querying-ether}

Les utilisateurs peuvent interroger le solde en ether de n'importe quel [compte](/developers/docs/accounts/) en inspectant son champ du `balance`, qui indique la quantité d'ether possédée en wei.

[Etherscan](https://etherscan.io) est un outil populaire pour inspecter les soldes d'adresses via une application basée sur le Web. Par exemple, [cette page Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) affiche le solde de l'Ethereum Foundation. Les soldes du compte peuvent également être interrogés en utilisant des portefeuilles ou directement, en faisant des requêtes aux nœuds.

## Complément d'information {#further-reading}

- [Définition d'Ether et d'Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _Groupe CME_
- [Livre blanc Ethereum](/whitepaper/): La proposition originale pour Ethereum. Ce document contient une description de l'ether et les motivations de sa création.
- [Calculatrice de Gwei](https://www.alchemy.com/gwei-calculator) : Utilisez cette calculatrice de Gwei pour facilement convertir Wei, Gwei et Ether. Il vous suffit d'introduire n'importe quelle quantité de Wei, Gwei ou ETH et de calculer automatiquement la conversion.

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
