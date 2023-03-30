---
title: Les clés dans la preuve d'enjeu d'Ethereum
description: Explications des clés utilisées dans le mécanisme de consensus de preuve d'enjeu d'Ethereum
lang: fr
---

Ethereum sécurise les actifs des utilisateurs au moyen de la cryptographie à clé publique-privée. La clé publique est utilisée pour une adresse Ethereum - c'est-à-dire, elle est visible au grand public. La clé privée (ou secrète) ne doit être accessible qu'à un propriétaire de compte. La clé privée est utilisée pour signer les transactions et les données, afin que la cryptographie puisse prouver que le propriétaire approuve une action d'une clé spécifique.

Les clés Ethereum sont générées à l'aide de la cryptographie à [courbe elliptique ](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Cependant, quand Ethereum est passé de la [preuve de travail](/developers/docs/consensus-mechanisms/pow) à la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos), un nouveau type de clé a été ajouté à Ethereum. Les clés d'origine fonctionnent toujours exactement comme avant — il n'y a eu aucune modification aux clés basées sur des courbes elliptiques qui sécurisent les comptes. Toutefois, les utilisateurs avaient besoin d'un nouveau type de clé pour participer à la preuve d'enjeu en stakant l'ETH et en exécutant les validateurs. Ce besoin est né des problèmes d'évolutivité associés aux nombreux messages passant entre un grand nombre de validateurs, qui nécessitaient une méthode cryptographique pouvant être facilement agrégée afin de réduire la quantité de communication nécessaire à l'obtention d'un consensus dans le réseau.

Ce nouveau type de clé utilise le schéma de signature [Boneh-Lyn-Shacham (BLS)](https://wikipedia.org/wiki/BLS_digital_signature). Le BLS permet une agrégation de signatures très efficace, mais permet aussi l'ingénierie inverse des clés de validateurs individuels agrégées.

## Les deux types de clés de validateur {#two-types-of-keys}

Avant le passage à la preuve d'enjeu, les utilisateurs d'Ethereum ne disposaient que d'une seule clé privée basée sur la courbe elliptique pour accéder à leurs fonds. Avec l'introduction de la preuve d'enjeu, les utilisateurs qui souhaitaient être des stakers individuels avaient également besoin d'une **clé de validation** et d'une **clé de retrait**.

### La clé de validation {#validator-key}

La clé de signature de validation est constituée de deux éléments :

- La **clé privée** de validation
- La **clé publique ** de validation

L'objectif de la clé privée de validation est de signer des opérations sur la blockchain telles que les propositions de bloc et les attestations. Pour cette raison, ces clés doivent être conservées dans un portefeuille chaud.

Cette flexibilité a l'avantage de déplacer très rapidement les clés de signature de validation d'un appareil à un autre. Cependant, s'ils se sont perdus ou sont volés, le voleur peut **agir malicieusement** de plusieurs façons :

- Slasher le validateur en:
  - Étant déposant en et signant deux blocs phares distincts pour le même emplacement
  - Being an attester and signing an attestation that "surrounds" another one
  - Being an attester and signing two different attestations having the same target
- Forcer une sortie volontaire, ce qui empêcher le validateur de staker et lui accorde l'accès à son solde d'ETH au propriétaire de la clé de retrait.

La **clé publique de validation** est incluse dans les données de transaction lorsqu'un utilisateur dépose l'ETH dans le contrat de dépôt du staking. Ceci est connu sous le nom de _données de dépôt_, et il permet à Ethereum d'identifier le validateur.

### La clé de retrait {#withdrawal-key}

La clé de retrait sera nécessaire pour déplacer le solde du validateur après que cela est activé lors de la prochaine mise à niveau Shanghai. Tout comme les clés de validation, les clés de retrait sont également composées de deux éléments :

- La **clé privée** de retrait
- La **clé publique** de retrait

Perdre cette clé revient à perdre l'accès au solde du validateur. Toutefois, le validateur peut toujours signer des attestations et des blocs, car ces actions nécessitent sa clé privée. Mais il existe peu ou pas d'incitant si les clés de retrait sont perdues.

La séparation des clés de validation des clés de comptes Ethereum permet à plusieurs validateurs d'être exécutés par un seul utilisateur.

![schéma de la clé de validation](validator-key-schematic.png)

## Deriving keys from a seed phrase {#deriving-keys-from-seed}

If every 32 ETH staked required a new set of 2 completely independent keys, key management would quickly become unwieldy, especially for users running multiple validators. Instead, multiple validator keys can be derived from a single common secret and storing that single secret allows access to multiple validator keys.

[Mnemonics](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) and paths are prominent features that users often encounter when [they access](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) their wallets. The mnemonic is a sequence of words that act as an initial seed for a private key. When combined with additional data, the mnemonic generates a hash known as the 'master key'. This can be thought of as the root of a tree. Branches from this root can then be derived using a hierarchical path so that child nodes can exist as combinations of their parent node's hash and their index in the tree. Read about [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) and [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) standards for mnemonic-based key generation.

These paths have the following structure, which will be familiar to users who have interacted with hardware wallets:

```
m/44'/60'/0'/0`
```

The slashes in this path separate components of the private key as follows:

```
master_key / purpose / coin_type / account / change / address_index
```

This logic enables users to attach as many validators as possible to a single **mnemonic phrase** because the tree root can be common, and differentiation can happen at the branches. The user can **derive any number of keys** from the mnemonic phrase.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Each branch is separated by a `/` so `m/2` means start with the master key and follow branch 2. In the schematic below a single mnemonic phrase is used to store three withdrawal keys, each with two associated validators.

![logique de la clé de validation](multiple-keys.png)

## En savoir plus {#further-reading}

- [Ethereum Foundation blog post by Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 BLS12-381 key generation](https://eips.ethereum.org/EIPS/eip-2333)
