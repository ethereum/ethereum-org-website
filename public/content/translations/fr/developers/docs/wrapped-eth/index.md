---
title: Qu'est-ce que l'Ether symbolique (WETH)
description: Une introduction à l'Ether symbolique (WETH) — un système compatible ERC20 pour l'ether (ETH).
lang: fr
---

# Ether symbolique (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Connectez votre portefeuille pour envelopper ou déballer des ETH sur n'importe quelle chaîne sur [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

L'Ether (ETH) est la monnaie principale d'Ethereum. Il est utilisé à plusieurs fins, comme la mise en jeu, en tant que monnaie, et pour payer les frais de gaz liés aux calculs. **Le WETH est en réalité une version améliorée de l'ETH dotée de fonctionnalités supplémentaires requises par de nombreuses applications et [jetons ERC-20](/glossary/#erc-20)**, qui sont d'autres types d'actifs numériques sur Ethereum. Pour fonctionner avec ces jetons, l'ETH doit suivre les mêmes règles qu'eux, connues sous le nom de standard ERC-20.

Pour combler cet écart, l'Ether symbolique (WETH) a été créé. **L'Ether symbolique est un contrat intelligent qui vous permet de déposer n'importe quel montant d'ETH dans le contrat et de recevoir le même montant en WETH frappés**, conformément à la norme de jeton ERC-20. Le WETH est une représentation de l'ETH qui vous permet d'interagir avec lui en tant que jeton ERC-20, et non comme l'actif natif ETH. Vous aurez toujours besoin d'ETH natif pour payer les frais de gaz, alors assurez-vous d'en conserver une partie lors du dépôt.

Vous pouvez échanger le WETH contre de l'ETH en utilisant le contrat intelligent WETH. Vous pouvez échanger n'importe quel montant de WETH via le contrat intelligent WETH, et vous recevrez le même montant en ETH. Le WETH déposé est ensuite brûlé et retiré de l'offre en circulation de WETH.

**Environ ~3% de l'offre d'ETH en circulation est verrouillée dans le contrat de WETH**, ce qui en fait l'un des [contrats intelligents](/glossary/#smart-contract) les plus utilisés. Le WETH est particulièrement important pour les utilisateurs interagissant avec des applications relevant de la finance décentralisée (DeFi).

## Pourquoi devons-nous encapsuler l'ETH en tant que jeton ERC-20 ? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) définit une interface standard pour les jetons transférables, permettant à quiconque de créer des jetons qui interagissent parfaitement avec les applications et les autres jetons utilisant ce standard dans l'écosystème Ethereum. Puisque **l'ETH est antérieur à la norme ERC-20**, l'ETH ne respecte pas cette spécification. Cela signifie que **vous ne pouvez pas facilement** échanger des ETH contre d'autres jetons ERC-20 ou **utiliser des ETH dans des applications utilisant le standard ERC-20**. Encapsuler des ETH vous donne l'opportunité de :

- **Échanger des ETH contre des jetons ERC-20** : Vous ne pouvez pas échanger des ETH directement contre d'autres jetons ERC-20. Le WETH est une représentation de l'ether qui est conforme au standard ERC-20 des jetons fongibles et peut être échangé contre d'autres jetons ERC-20.

- **Utiliser des ETH dans les dapps** : Étant donné que les ETH ne sont pas compatibles avec le standard ERC-20, les développeurs doivent créer des interfaces distinctes (une pour les ETH et une autre pour les jetons ERC-20) dans les dapps. Encapsuler des ETH supprime cet obstacle et permet aux développeurs de gérer les ETH et d'autres jetons au sein de la même dapp. De nombreuses applications de finance décentralisée utilisent cette norme et créent des marchés pour échanger ces jetons.

## Ether symbolique (WETH) contre ether (ETH) : quelle est la différence ? {#weth-vs-eth-differences}

|           | **Ether (ETH)**                                                                                                                                                                                                       | **Ether symbolique (WETH)**                                                                                                                                                                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offre     | L'offre d'ETH est gérée par le protocole Ethereum. L'[émission](/roadmap/merge/issuance) d'ETH est gérée par les validateurs d'Ethereum lors du traitement des transactions et de la création des blocs. | Le WETH est un jeton ERC-20 dont l'approvisionnement est géré par un contrat intelligent. De nouvelles unités de WETH sont émises par le contrat intelligent après qu'il a reçu des dépôts d'ETH de la part des utilisateurs, ou des unités de WETH sont brûlées lorsqu'un utilisateur souhaite échanger du WETH contre de l'ETH. |
| Propriété | La propriété est gérée par le protocole Ethereum via le solde de votre compte.                                                                                                                                           | La propriété du WETH est gérée par le contrat intelligent du jeton WETH, sécurisé par le protocole Ethereum.                                                                                                                                                                                                                                      |
| Gaz       | L'Ether (ETH) est l'unité de paiement acceptée pour le calcul sur le réseau Ethereum. Les frais de gaz sont libellés en gwei (une unité d'ether).                  | Payer les frais de gaz avec des jetons WETH n'est pas pris en charge de manière native.                                                                                                                                                                                                                                                           |

## Foire aux questions {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Vous payez des frais de gas pour encapsuler ou désencapsuler des ETH en utilisant le smart contract WETH.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Le WETH est généralement considéré comme sûr car il est basé sur un contrat intelligent simple et éprouvé. Le contrat intelligent WETH a également été formellement vérifié, ce qui constitue la norme de sécurité la plus élevée pour les contrats intelligents sur Ethereum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Outre la [version canonique de WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) décrite sur cette page, il existe d'autres variantes en circulation. Il peut s'agir de tokens personnalisés créés par des développeurs d'applications ou de versions émises sur d'autres blockchains, qui peuvent se comporter différemment ou avoir des propriétés de sécurité différentes. **Vérifiez toujours les informations sur le jeton pour savoir avec quelle implémentation de WETH vous interagissez.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Réseau principal d'Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## En savoir plus {#further-reading}

- [C'est quoi le WETH?](https://weth.tkn.eth.limo/)
- [Informations sur le jeton WETH sur Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Vérification formelle du WETH](https://zellic.io/blog/formal-verification-weth)
