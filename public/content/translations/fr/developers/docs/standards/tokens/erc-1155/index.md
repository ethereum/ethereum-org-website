---
title: Norme de multijeton ERC-1155
description: En savoir plus sur l'ERC-1155, une norme multi-jetons qui combine des jetons fongibles et non fongibles dans un seul contrat.
lang: fr
---

## Introduction {#introduction}

Une interface standard pour les contrats qui gèrent plusieurs types de jetons. Un seul contrat déployé peut inclure n'importe quelle combinaison de jetons fongibles, de jetons non fongibles ou d'autres configurations (p. ex. des jetons semi-fongibles).

**Qu'entend-on par norme multi-jetons ?**

L'idée est simple et cherche à créer une interface de contrat intelligent qui peut représenter et contrôler n'importe quel nombre de types de jetons fongibles et non fongibles. De cette manière, le jeton ERC-1155 peut exécuter les mêmes fonctions qu'un jeton [ERC-20](/developers/docs/standards/tokens/erc-20/) et [ERC-721](/developers/docs/standards/tokens/erc-721/), et même les deux en même temps. Cela améliore la fonctionnalité des normes ERC-20 et ERC-721, ce qui la rend plus efficace et corrige les erreurs évidentes de mise en œuvre.

Le jeton ERC-1155 est entièrement décrit dans l'[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de vous informer d'abord sur les [normes de jetons](/developers/docs/standards/tokens/), l'[ERC-20](/developers/docs/standards/tokens/erc-20/) et l'[ERC-721](/developers/docs/standards/tokens/erc-721/).

## Fonctions et fonctionnalités de l'ERC-1155 : {#body}

- [Transfert par lots](#batch_transfers) : transférez plusieurs actifs en un seul appel.
- [Solde par lots](#batch_balance) : obtenez les soldes de plusieurs actifs en un seul appel.
- [Approbation par lots](#batch_approval) : approuvez tous les jetons à une adresse.
- [Hooks](#receive_hook) : hook de réception de jetons.
- [Support NFT](#nft_support) : si l'offre n'est que de 1, traitez-le comme un NFT.
- [Règles de transfert sécurisé](#safe_transfer_rule) : ensemble de règles pour un transfert sécurisé.

### Transferts par lots {#batch-transfers}

Les transferts par lot fonctionnent de la même façon que les transferts réguliers ERC-20. Examinons la fonction `transferFrom` standard de l'ERC-20 :

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

La seule différence avec ERC-1155 est que nous passons les valeurs en tant que tableau et que nous fournissons également un tableau d'identifiants. Par exemple, pour `ids=[3, 6, 13]` et `values=[100, 200, 5]`, les transferts résultants seront

1. Transfert de 100 jetons avec l'id 3 de `_from` vers `_to`.
2. Transfert de 200 jetons avec l'id 6 de `_from` vers `_to`.
3. Transfert de 5 jetons avec l'id 13 de `_from` vers `_to`.

Dans l'ERC-1155, nous avons uniquement `transferFrom`, pas `transfer`. Pour l'utiliser comme une fonction `transfer` classique, il suffit de définir l'adresse d'expédition comme étant l'adresse qui appelle la fonction.

### Solde par lots {#batch-balance}

L'appel `balanceOf` de l'ERC-20 a également sa fonction partenaire avec prise en charge des lots. Pour rappel, ceci est la version ERC-20 :

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Encore plus simple pour l'appel de solde, nous pouvons récupérer plusieurs soldes en un seul appel. Nous passons le tableau des propriétaires, suivi du tableau des identifiants de jetons.

Par exemple, pour `_ids=[3, 6, 13]` et `_owners=[0xbeef..., 0x1337..., 0x1111...]`, la valeur renvoyée sera

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Approbation par lots {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Les approbations sont légèrement différentes de l'ERC-20. Au lieu d'approuver des montants spécifiques, vous définissez un opérateur comme approuvé ou non approuvé via `setApprovalForAll`.

La lecture de l'état actuel peut se faire via `isApprovedForAll`. Comme vous pouvez le voir, c'est une opération tout ou rien. Vous ne pouvez pas définir le nombre de jetons ou même la classe de jeton à approuver.

Cela a été conçu intentionnellement en gardant à l'esprit le principe de simplicité. Vous ne pouvez tout approuver que pour une seule adresse.

### Hook de réception {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Étant donné la prise en charge de l'[EIP-165](https://eips.ethereum.org/EIPS/eip-165), l'ERC-1155 ne prend en charge les hooks de réception que pour les contrats intelligents. La fonction crochet doit retourner une valeur magique prédéfinie bytes4 qui est donnée en tant que :

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Lorsque le contrat de réception renvoie cette valeur, cela suppose que le contrat accepte le transfert et sait gérer les jetons ERC-1155. Génial, plus aucun jeton coincé dans un contrat !

### Support NFT {#nft-support}

Lorsque la fourniture est unique, le jeton est essentiellement un jeton non fongible (NFT). Et comme c'est la norme pour ERC-721, vous pouvez définir une URL de métadonnées. L'URL peut être lue et modifiée par les clients, voir [ici](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Règle de transfert sécurisé {#safe-transfer-rule}

Nous avons déjà abordé quelques règles de transfert sécurisé dans les explications précédentes. Mais concentrons-nous sur les règles les plus importantes :

1. L'appelant doit être approuvé pour dépenser les jetons de l'adresse `_from` ou l'appelant doit être égal à `_from`.
2. L'appel de transfert doit être annulé si
   1. l'adresse `_to` est 0.
   2. la longueur de `_ids` n'est pas la même que la longueur de `_values`.
   3. l'un des soldes du ou des détenteurs pour le(s) jeton(s) dans `_ids` est inférieur au(x) montant(s) respectif(s) dans `_values` envoyé(s) au destinataire.
   4. toute autre erreur se produit.

_Remarque_ : Toutes les fonctions de traitement par lots, y compris le hook, existent également en versions sans traitement par lots. Cela renforce l'efficacité du carburant étant donné que le transfert d'un seul actif reste probablement la méthode la plus couramment utilisée. Nous les avons laissés à l'écart par souci de simplicité dans les explications, y compris des règles de transfert sécurisé. Les noms sont identiques, il suffit de supprimer le lot ('Batch)'.

## En savoir plus {#further-reading}

- [EIP-1155 : Norme multi-jetons](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155 : Docs OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155 : Dépôt GitHub](https://github.com/enjin/erc-1155)
- [API NFT d'Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
