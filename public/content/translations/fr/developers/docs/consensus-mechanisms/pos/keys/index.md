---
title: Les clés dans la preuve d'enjeu d'Ethereum
description: Explications des clés utilisées dans le mécanisme de consensus de preuve d'enjeu d'Ethereum
lang: fr
---

Ethereum sécurise les actifs des utilisateurs au moyen de la cryptographie à clé publique-privée. La clé publique sert de base à une adresse Ethereum, c'est-à-dire qu'elle est visible par le grand public et utilisée comme identifiant unique. La clé privée (ou secrète) ne doit être accessible qu'à un propriétaire de compte. La clé privée est utilisée pour signer les transactions et les données, afin que la cryptographie puisse prouver que le propriétaire approuve une action d'une clé privée spécifique.

Les clés Ethereum sont générées à l'aide de la cryptographie à [courbe elliptique](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Cependant, quand Ethereum est passé de la [preuve de travail](/developers/docs/consensus-mechanisms/pow) à la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos), un nouveau type de clé a été ajouté à Ethereum. Les clés d'origine fonctionnent toujours exactement comme avant — il n'y a eu aucune modification aux clés basées sur des courbes elliptiques qui sécurisent les comptes. Toutefois, les utilisateurs avaient besoin d'un nouveau type de clé pour participer à la preuve d'enjeu en stakant l'ETH et en exécutant les validateurs. Ce besoin est né des problèmes d'évolutivité associés aux nombreux messages passant entre un grand nombre de validateurs, qui nécessitaient une méthode cryptographique pouvant être facilement agrégée afin de réduire la quantité de communication nécessaire à l'obtention d'un consensus dans le réseau.

Ce nouveau type de clés utilise le [schéma de signature **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS permet une agrégation très efficace des signatures mais permet également l'ingénierie inverse des clés individuelles des validateurs agrégées et est idéal pour gérer les actions entre validateurs.

## Les deux types de clés de validateur {#two-types-of-keys}

Avant le passage à la preuve d'enjeu, les utilisateurs d'Ethereum ne disposaient que d'une seule clé privée basée sur la courbe elliptique pour accéder à leurs fonds. Avec l'introduction de la preuve d'enjeu, les utilisateurs qui souhaitaient être des stakers individuels avaient également besoin d'une **clé de validateur** et d'une **clé de retrait**.

### La clé de validateur {#validator-key}

La clé de signature du validateur est constituée de deux éléments :

- La **clé privée** du validateur
- La **clé publique ** du validateur

L'objectif de la clé privée du validateur est de signer des opérations sur la blockchain telles que les propositions de bloc et les attestations. Pour cette raison, ces clés doivent être conservées dans un portefeuille chaud.

Cette flexibilité a l'avantage de déplacer très rapidement les clés de signature du validateur d'un appareil à un autre. Cependant, si elles se sont perdues ou sont volées, le voleur peut **agir malicieusement** de plusieurs façons :

- Slasher le validateur en :
  - Être proposant et signer deux blocs phares différents pour le même emplacement
  - Être un attesteur et signer une attestation qui « entoure » une autre
  - Être un attesteur et signer deux attestations différentes ayant la même cible
- Forcer une sortie volontaire, qui empêche le validateur de staker et accorde l'accès à son solde ETH au propriétaire de la clé de retrait

La **clé publique de validation** est incluse dans les données de transaction lorsqu'un utilisateur dépose l'ETH dans le contrat de dépôt du staking. Ceci est connu sous le nom de _données de dépôt_, et il permet à Ethereum d'identifier le validateur.

### Identifiants de retrait {#withdrawal-credentials}

Chaque validateur possède une propriété appelée _identifiants de retrait_. Ce champ de 32 octets commence soit par un `0x00`, représentant les identifiants de retrait BLS, soit par un `0x01`, représentant des identifiants qui pointent vers une adresse d'exécution.

Les validateurs avec des clés BLS commençant par `0x00` doivent mettre à jour ces identifiants pour les diriger vers une adresse d'exécution afin d'activer les paiements de solde excédentaire ou le retrait complet de la mise. Cela peut être fait en fournissant une adresse d'exécution dans les données de dépôt lors de la génération initiale de la clé, _OU_ en utilisant ultérieurement la clé de retrait pour signer et diffuser un message `BLSToExecutionChange`.

### La clé de retrait {#withdrawal-key}

La clé de retrait sera nécessaire pour mettre à jour les justificatifs de retrait afin de les orienter vers une adresse d'exécution, si elle n'est pas définie lors du dépôt initial. Cela permettra de commencer à traiter les paiements de solde excédentaire et permettra également aux utilisateurs de retirer intégralement leur ETH mis en jeu.

Tout comme les clés de validation, les clés de retrait sont également composées de deux éléments :

- La **clé privée** de retrait
- La **clé publique** de retrait

Perdre cette clé avant de mettre à jour les justificatifs de retrait au type `0x01` signifie perdre l'accès au solde du validateur. Le validateur peut toujours signer des attestations et des blocs, car ces actions ne nécessitent pas sa clé privée. Cependant, il existe peu ou pas d'avantage à continuer si les clés de retrait sont perdues.

La séparation des clés de validateur des clés de comptes Ethereum permet à plusieurs validateurs d'être exécutés par un seul utilisateur.

![schéma de la clé de validateur](validator-key-schematic.png)

## Dérivation des clés à partir d'une phrase de récupération {#deriving-keys-from-seed}

Si chaque mise en jeu de 32 ETH nécessitait un nouvel ensemble de 2 clés complètement indépendantes, la gestion des clés deviendrait rapidement ingérable, en particulier pour les utilisateurs gérant plusieurs validateurs. Au lieu de cela, plusieurs clés de validateur peuvent être dérivées d'un seul secret commun et le stockage de ce seul secret permet d'accéder à plusieurs clés de validateur.

Les [mnémoniques](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) et les chemins sont des éléments importants que les utilisateurs rencontrent souvent lorsqu'[ils accèdent](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) à leurs portefeuilles. Le mnémonique est une séquence de mots qui agit comme une graine initiale pour une clé privée. Lorsqu'il est combiné avec des données supplémentaires, le mnémonique génère un hash connu sous le nom de clé maîtresse. Cela peut être considéré comme la racine d'un arbre. Des branches à partir de cette racine peuvent ensuite être dérivées en utilisant un chemin hiérarchique, de sorte que les nœuds enfants peuvent exister comme des combinaisons du hachage de leur nœud parent et de leur indice dans l'arbre. Lisez les normes [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) et [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) à propos de la génération de clés basée sur des mnémoniques.

Ces chemins ont la structure suivante, qui sera familière aux utilisateurs qui ont interagi avec des portefeuilles matériels :

```
m/44'/60'/0'/0`
```

Les barres obliques dans ce chemin séparent les composants de la clé privée comme suit :

```
master_key / purpose / coin_type / account / change / address_index
```

Cette logique permet aux utilisateurs d'attacher autant de validateurs que possible à une seule **phrase mnémotechnique** car la racine de l'arbre peut être commune, et la différenciation se produit au niveau des branches. L'utilisateur peut **dériver un nombre quelconque de clés** à partir d'une phrase mnémotechnique.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Chaque branche est séparée par un `/`, donc `m/2` signifie commencer avec la clé maîtresse et suivre la branche 2. Dans le schéma ci-dessus, une seule phrase mnémonique est utilisée pour stocker trois clés de retrait, chacune associée à deux validateurs.

![logique de la clé de validateur](multiple-keys.png)

## En savoir plus {#further-reading}

- [Article de blog de l'Ethereum Foundation par Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 BLS12-381 génération de clé](https://eips.ethereum.org/EIPS/eip-2333)
