---
title: Ether enveloppé (WETH)
metaTitle: Qu'est-ce que l'ether enveloppé (WETH)
description: Une introduction à l'ether enveloppé (WETH) — un jeton enveloppé compatible ERC-20 pour l'ether (ETH). 
lang: fr
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Connectez votre portefeuille pour envelopper ou désenvelopper de l'ETH sur n'importe quelle chaîne sur [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

L'ether (ETH) est la monnaie principale d'Ethereum. Il est utilisé à plusieurs fins, comme le staking, en tant que monnaie, et pour payer les frais de gaz pour le calcul. **Le WETH est en fait une forme améliorée d'ETH avec des fonctionnalités supplémentaires requises par de nombreuses applications et [jetons ERC-20](/glossary/#erc-20)**, qui sont d'autres types d'actifs numériques sur Ethereum. Pour fonctionner avec ces jetons, l'ETH doit suivre les mêmes règles qu'eux, connues sous le nom de norme ERC-20.

Pour combler cette lacune, l'ether enveloppé (WETH) a été créé. **L'ether enveloppé est un contrat intelligent qui vous permet de déposer n'importe quel montant d'ETH dans le contrat et de recevoir le même montant en WETH émis** qui se conforme à la norme de jeton ERC-20. Le WETH est une représentation de l'ETH qui vous permet d'interagir avec lui en tant que jeton ERC-20, et non en tant qu'actif natif ETH. Vous aurez toujours besoin d'ETH natif pour payer les frais de gaz, alors assurez-vous d'en conserver un peu lors du dépôt. 

Vous pouvez désenvelopper du WETH en ETH en utilisant le contrat intelligent WETH. Vous pouvez échanger n'importe quel montant de WETH avec le contrat intelligent WETH, et vous recevrez le même montant en ETH. Le WETH déposé est ensuite brûlé et retiré de l'offre en circulation de WETH.

**Environ ~3 % de l'offre d'ETH en circulation est verrouillée dans le contrat de jeton WETH**, ce qui en fait l'un des [contrats intelligents](/glossary/#smart-contract) les plus utilisés. Le WETH est particulièrement important pour les utilisateurs interagissant avec des applications de la finance décentralisée (DeFi).

## Pourquoi avons-nous besoin d'envelopper l'ETH en tant qu'ERC-20 ? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) définit une interface standard pour les jetons transférables, afin que quiconque puisse créer des jetons qui interagissent de manière transparente avec les applications et les jetons qui utilisent cette norme dans l'écosystème d'Ethereum. Étant donné que **l'ETH est antérieur à la norme ERC-20**, l'ETH ne se conforme pas à cette spécification. Cela signifie que **vous ne pouvez pas facilement** échanger de l'ETH contre d'autres jetons ERC-20 ou **utiliser de l'ETH dans des applications utilisant la norme ERC-20**. Envelopper de l'ETH vous donne la possibilité de faire ce qui suit :

- **Échanger de l'ETH contre des jetons ERC-20** : Vous ne pouvez pas échanger de l'ETH directement contre d'autres jetons ERC-20. Le WETH est une représentation de l'ether qui se conforme à la norme de jeton fongible ERC-20 et peut être échangé avec d'autres jetons ERC-20. 

- **Utiliser de l'ETH dans des dapps** : Étant donné que l'ETH n'est pas compatible ERC-20, les développeurs devraient créer des interfaces distinctes (une pour l'ETH et une autre pour les jetons ERC-20) dans les applications décentralisées (dapps). Envelopper l'ETH supprime cet obstacle et permet aux développeurs de gérer l'ETH et d'autres jetons au sein de la même dapp. De nombreuses applications de finance décentralisée utilisent cette norme et créent des marchés pour échanger ces jetons.

## Ether enveloppé (WETH) vs ether (ETH) : Quelle est la différence ? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Ether enveloppé (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Offre     | L'[offre d'ETH](/eth/supply/) est gérée par le protocole [Ethereum](/). L'[émission](/roadmap/merge/issuance) d'ETH est gérée par les validateurs Ethereum lors du traitement des transactions et de la création de blocs.                           | Le WETH est un jeton ERC-20 dont l'offre est gérée par un contrat intelligent. De nouvelles unités de WETH sont émises par le contrat après avoir reçu des dépôts d'ETH des utilisateurs, ou des unités de WETH sont brûlées lorsqu'un utilisateur souhaite échanger du WETH contre de l'ETH.                                                                                                                                        |
| Propriété  | La propriété est gérée par le protocole Ethereum via le solde de votre compte.  | La propriété du WETH est gérée par le contrat intelligent du jeton WETH, sécurisé par le protocole Ethereum.                                                                                                                                         |
| Gaz        | L'ether (ETH) est l'unité de paiement acceptée pour le calcul sur le réseau Ethereum. Les frais de gaz sont libellés en gwei (une unité d'ether).                                                                                    | Le paiement du gaz avec des jetons WETH n'est pas pris en charge nativement.                                                                                                                                                                                              |

## Foire aux questions {#faq}
 
<ExpandableCard title="Faut-il payer pour envelopper/désenvelopper de l'ETH ?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Vous payez des frais de gaz pour envelopper ou désenvelopper de l'ETH en utilisant le contrat WETH.

</ExpandableCard>

<ExpandableCard title="Le WETH est-il sûr ?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Le WETH est généralement considéré comme sécurisé car il est basé sur un contrat intelligent simple et éprouvé. Le contrat WETH a également fait l'objet d'une vérification formelle, ce qui constitue la norme de sécurité la plus élevée pour les contrats intelligents sur Ethereum.

</ExpandableCard>

<ExpandableCard title="Pourquoi vois-je différents jetons WETH ?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Outre l'[implémentation canonique du WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) décrite sur cette page, il existe d'autres variantes en pratique. Celles-ci peuvent être des jetons personnalisés créés par des développeurs d'applications ou des versions émises sur d'autres chaînes de blocs, et peuvent se comporter différemment ou avoir des propriétés de sécurité différentes. **Vérifiez toujours les informations du jeton pour savoir avec quelle implémentation de WETH vous interagissez.**

</ExpandableCard>

<ExpandableCard title="Quels sont les contrats WETH sur les autres réseaux ?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Réseau principal Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Complément d'information {#further-reading}

- [Qu'est-ce que le WETH ?](https://weth.tkn.eth.limo/)
- [Informations sur le jeton WETH sur Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Vérification formelle du WETH](https://zellic.io/blog/formal-verification-weth)