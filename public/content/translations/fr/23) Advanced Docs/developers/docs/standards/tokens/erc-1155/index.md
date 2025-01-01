---
title: Norme de multijeton ERC-1155
description:
lang: fr
---

## Introduction {#introduction}

Une interface standard pour les contrats qui gèrent plusieurs types de jetons. Un seul contrat déployé peut intégrer une combinaison de jetons fongibles, de jetons non fongibles ou encore d'autres configurations (par exemple des jetons semi-fongibles).

**Qu’entend-on par norme multijeton ?**

L'idée est simple et cherche à créer une interface de contrat intelligent qui peut représenter et contrôler n'importe quel nombre de types de jetons fongibles et non fongibles. De cette façon, le jeton ERC-1155 peut exécuter les mêmes fonctions qu'un jeton [ERC-20](/developers/docs/standards/tokens/erc-20/) et [ERC-721](/developers/docs/standards/tokens/erc-721/) et même les deux en même temps. Cela améliore la fonctionnalité des normes ERC-20 et ERC-721, ce qui la rend plus efficace et corrige les erreurs évidentes de mise en œuvre.

Le jeton ERC-1155 est décrit dans les détails dans [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles concernant [les normes de jeton](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), et [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Fonctions et fonctionnalités ERC-1155 : {#body}

- [Transfert par lot](#batch_transfers) : Transférer plusieurs actifs en un seul appel.
- [Solde par lot](#batch_balance) : Obtenez les soldes de plusieurs actifs en un seul appel.
- [Approbation par lot](#batch_approval) : Approuver tous les jetons à une adresse.
- [Crochets](#recieve_hook) : Recevoir des crochets de jetons.
- [Support NFT](#nft_support) : Si l'échange est unique, le traiter comme NFT.
- [Règles de transfert sécurisées](#safe_transfer_rule) : Ensemble de règles pour sécuriser un transfert.

### Transferts par lot {#batch-transfers}

Les transferts par lot fonctionnent de la même façon que les transferts réguliers ERC-20. Examinons la fonction régulière `transferFrom` ERC-20 :

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

La seule différence avec ERC-1155 est que nous passons les valeurs en tant que tableau et que nous fournissons également un tableau d'identifiants. Par exemple compte tenu de `ids=[3, 6, 13]` et `values=[100, 200, 5]`, les transferts résultants seront

1. Transférez 100 jetons avec l'id 3 de `_from` à `_to`.
2. Transférez 200 jetons avec l'id 6 de `_from` à `_to`.
3. Transférez 5 jetons avec l'id 13 de `_from` à `_to`.

Dans l'ERC-1155, nous n'avons que `transferFrom` et non `transfert`. Pour l'utiliser comme un `transfer` régulier, il suffit de définir l'adresse d'expéditeur sur l'adresse qui appelle la fonction.

### Solde par lot {#batch-balance}

L'appel ERC-20 `balanceOf` dispose également de sa fonction de partenaire avec le support par lots. Pour rappel, ceci est la version ERC-20 :

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

Par exemple, pour les données `_ids=[3, 6, 13]` et `_owners=[0xbeef..., 0x1337..., 0x1111...]`, la valeur retournée sera

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Approbation par lot {#batch-approval}

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

Les approbations sont légèrement différentes de l'ERC-20. Au lieu d'approuver des montants spécifiques, vous définissez un opérateur qui approuvera ou non via `setApprovalForAll`.

La lecture du statut actuel peut être exécutée via `isApprovedForAll`. Comme vous pouvez le voir, c'est une opération tout ou rien. Vous ne pouvez pas définir le nombre de jetons ou même la classe de jeton à approuver.

Cela a été conçu intentionnellement en gardant à l'esprit le principe de simplicité. Vous ne pouvez tout approuver que pour une seule adresse.

### Recevoir un crochet {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Au regard du support [EIP-165](https://eips.ethereum.org/EIPS/eip-165), le support ERC-1155 ne prend en charge que les crochets pour les contrats intelligents. La fonction crochet doit retourner une valeur magique prédéfinie bytes4 qui est donnée en tant que :

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Lorsque le contrat de réception renvoie cette valeur, cela suppose que le contrat accepte le transfert et sait gérer les jetons ERC-1155. Génial, plus aucun jeton coincé dans un contrat !

### Prise en charge NFT {#nft-support}

Lorsque la fourniture est unique, le jeton est essentiellement un jeton non fongible (NFT). Et comme c'est la norme pour ERC-721, vous pouvez définir une URL de métadonnées. L'URL peut être lue et modifiée par les clients, voir [ici](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Règle de transfert sécurisé {#safe-transfer-rule}

Nous avons déjà abordé quelques règles de transfert sécurisé dans les explications précédentes. Mais concentrons-nous sur les règles les plus importantes :

1. L'appelant doit être approuvé pour envoyer les jetons depuis l'adresse `_from` ou l'appelant doit être égal à `_from`.
2. L'appel de transfert doit être annulé si
   1. l'adresse `_to` est 0.
   2. la longueur des `_ids` n'est pas la même que la longueur des `_values`.
   3. le(s) solde(s) du(des) détenteur(s) de jeton(s) dans `_ids` est(sont) inférieur(s) au(x) montant(s) respectif(s) dans les `_values` envoyées au destinataire.
   4. toute autre erreur se produit.

_Note_ : Toutes les fonctions par lot, y compris le crochet, existent également en tant que versions sans lot. Cela renforce l'efficacité du carburant étant donné que le transfert d'un seul actif reste probablement la méthode la plus couramment utilisée. Nous les avons laissés à l'écart par souci de simplicité dans les explications, y compris des règles de transfert sécurisé. Les noms sont identiques, il suffit de supprimer le lot ('Batch)'.

## Complément d'information {#further-reading}

- [Norme de multijeton ERC-1155](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155 : Documentation Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155 : Répertoire GitHub](https://github.com/enjin/erc-1155)
- [API NFT d'Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
