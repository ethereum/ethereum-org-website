---
title: "Les clés dans la preuve d'enjeu (PoS) d'Ethereum"
description: "Une explication des clés utilisées dans le mécanisme de consensus par preuve d'enjeu d'Ethereum"
lang: fr
---

Ethereum sécurise les actifs des utilisateurs en utilisant la cryptographie à clé publique et privée. La clé publique est utilisée comme base pour une adresse Ethereum, c'est-à-dire qu'elle est visible par le grand public et utilisée comme identifiant unique. La clé privée (ou « secrète ») ne devrait jamais être accessible qu'au propriétaire du compte. La clé privée est utilisée pour « signer » des transactions et des données afin que la cryptographie puisse prouver que le détenteur approuve une action d'une clé privée spécifique.

Les clés d'Ethereum sont générées à l'aide de la [cryptographie sur les courbes elliptiques](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Cependant, lorsqu'Ethereum est passé de la [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow) à la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos), un nouveau type de clé a été ajouté à Ethereum. Les clés d'origine fonctionnent toujours exactement comme avant : il n'y a eu aucun changement concernant les clés basées sur les courbes elliptiques qui sécurisent les comptes. Toutefois, les utilisateurs avaient besoin d'un nouveau type de clé pour participer à la preuve d'enjeu en stakant des ETH et en exécutant des validateurs. Ce besoin a découlé des défis de scalabilité liés aux nombreux messages échangés entre un grand nombre de validateurs, ce qui nécessitait une méthode cryptographique pouvant être facilement agrégée pour réduire la quantité de communication requise pour que le réseau parvienne à un consensus.

Ce nouveau type de clé utilise le [schéma de signature **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). Les signatures BLS de nombreux validateurs peuvent être agrégées en une seule signature qui est vérifiée en un seul contrôle, ce qui permet de conserver des messages de consensus de petite taille. BLS n'est pas résistant aux ordinateurs quantiques, c'est pourquoi la [feuille de route post-quantique](/roadmap/security/quantum-resistance/) prévoit de remplacer les clés BLS des validateurs par des clés basées sur des hashs.

## Les deux types de clés de validateur {#two-types-of-keys}

Avant le passage à la preuve d'enjeu, les utilisateurs d'Ethereum ne disposaient que d'une seule clé privée basée sur les courbes elliptiques pour accéder à leurs fonds. Avec l'introduction de la preuve d'enjeu, les utilisateurs qui souhaitaient être des stakers en solo avaient également besoin d'une **clé de validateur** et d'une **clé de retrait**.

### La clé de validateur {#validator-key}

La clé de signature du validateur se compose de deux éléments :

- La clé **privée** du validateur
- La clé **publique** du validateur

Le but de la clé privée du validateur est de signer des opérations onchain telles que les propositions de blocs et les attestations. Pour cette raison, ces clés doivent être conservées dans un portefeuille à chaud.

Cette flexibilité présente l'avantage de pouvoir déplacer très rapidement les clés de signature du validateur d'un appareil à un autre. Cependant, si elles sont perdues ou volées, un voleur pourrait être en mesure d'**agir de manière malveillante** de plusieurs façons :

- Faire subir une réduction au validateur en :
  - Étant un proposant et en signant deux blocs de la chaîne phare différents pour le même créneau
  - Étant un attestateur et en signant une attestation qui en « entoure » une autre
  - Étant un attestateur et en signant deux attestations différentes ayant la même cible
- Forcer une sortie volontaire, ce qui empêche le validateur de continuer le staking et accorde l'accès à son solde d'ETH au propriétaire de la clé de retrait

La **clé publique du validateur** est incluse dans les données de la transaction lorsqu'un utilisateur dépose des ETH sur le contrat de dépôt de staking. C'est ce qu'on appelle les _données de dépôt_ (deposit data) et cela permet à Ethereum d'identifier le validateur.

### Identifiants de retrait {#withdrawal-credentials}

Chaque validateur possède une propriété connue sous le nom d'_identifiants de retrait_. Le premier octet de ce champ de 32 octets identifie le type de compte : `0x00` représente les identifiants BLS hérités (pré-Shapella, non retirables), `0x01` représente les identifiants hérités qui pointent vers une adresse d'exécution, et `0x02` représente le type d'identifiant de composition moderne.

Les validateurs avec des clés BLS `0x00` doivent mettre à jour ces identifiants pour pointer vers une adresse d'exécution afin d'activer les paiements de solde excédentaire ou le retrait complet du staking. Cela peut être fait en fournissant une adresse d'exécution dans les données de dépôt lors de la génération initiale de la clé, _OU_ en utilisant la clé de retrait ultérieurement pour signer et diffuser un message `BLSToExecutionChange`. Des propositions visant à supprimer progressivement les identifiants `0x00` avant la transition post-quantique sont en cours de discussion, les validateurs utilisant encore `0x00` devraient donc se convertir dès maintenant.

[En savoir plus sur les identifiants de retrait des validateurs](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### La clé de retrait {#withdrawal-key}

La clé de retrait sera requise pour mettre à jour les identifiants de retrait afin qu'ils pointent vers une adresse d'exécution, si cela n'a pas été configuré lors du dépôt initial. Cela permettra de commencer à traiter les paiements de solde excédentaire et permettra également aux utilisateurs de retirer entièrement leurs ETH stakés.

Tout comme les clés de validateur, les clés de retrait se composent également de deux éléments :

- La clé **privée** de retrait
- La clé **publique** de retrait

Perdre cette clé avant de mettre à jour les identifiants de retrait vers le type `0x01` signifie perdre l'accès au solde du validateur. Le validateur peut toujours signer des attestations et des blocs puisque ces actions nécessitent la clé privée du validateur, cependant il n'y a peu ou pas d'incitation si les clés de retrait sont perdues.

La séparation des clés de validateur des clés de compte Ethereum permet à un seul utilisateur d'exécuter plusieurs validateurs. Avec les identifiants `0x02`, un validateur peut détenir jusqu'à 2 048 ETH, de sorte qu'une mise plus importante n'a plus besoin d'être répartie entre de nombreux validateurs.

<ValidatorKeysDiagram />

**Remarque** : Un validateur peut effectuer une sortie en signant un [message de sortie volontaire (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) avec la clé de validateur. Depuis la mise à jour Pectra, l'[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) permet également à l'adresse de retrait de déclencher la sortie d'un validateur, ainsi que des retraits partiels pour les validateurs `0x02`. Cela réduit les hypothèses de confiance en permettant aux stakers qui délèguent des ETH à des [fournisseurs de staking en tant que service](/staking/saas/#what-is-staking-as-a-service) de garder le contrôle de leurs fonds.

## Dériver des clés à partir d'une phrase secrète {#deriving-keys-from-seed}

Si chaque tranche de 32 ETH stakés nécessitait un nouvel ensemble de 2 clés complètement indépendantes, la gestion des clés deviendrait rapidement fastidieuse, en particulier pour les utilisateurs exécutant plusieurs validateurs. Au lieu de cela, plusieurs clés de validateur peuvent être dérivées d'un seul secret commun et le stockage de ce seul secret permet d'accéder à plusieurs clés de validateur.

Les [mnémoniques](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) et les chemins de dérivation sont des fonctionnalités importantes que les utilisateurs rencontrent souvent lorsqu'[ils accèdent](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) à leurs portefeuilles. Le mnémonique est une séquence de mots qui agit comme une graine initiale pour une clé privée. Lorsqu'il est combiné avec des données supplémentaires, le mnémonique génère un hash connu sous le nom de « clé maîtresse ». Cela peut être considéré comme la racine d'un arbre. Les branches de cette racine peuvent ensuite être dérivées à l'aide d'un chemin hiérarchique afin que les nœuds enfants puissent exister en tant que combinaisons du hash de leur nœud parent et de leur indice dans l'arbre. Lisez les normes [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) et [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) pour la génération de clés basées sur des mnémoniques.

Ces chemins ont la structure suivante, qui sera familière aux utilisateurs ayant interagi avec des portefeuilles matériels :

```
m/44'/60'/0'/0
```

Les barres obliques dans ce chemin séparent les composants de la clé privée comme suit :

```
master_key / purpose / coin_type / account / change / address_index
```

Cette logique permet aux utilisateurs d'attacher autant de validateurs que possible à une seule **phrase mnémonique** car la racine de l'arbre peut être commune, et la différenciation peut se faire au niveau des branches. L'utilisateur peut **dériver n'importe quel nombre de clés** à partir de la phrase mnémonique.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Chaque branche est séparée par un `/`, donc `m/2` signifie commencer par la clé maîtresse et suivre la branche 2. Les clés de validateur suivent l'[EIP-2334](https://eips.ethereum.org/EIPS/eip-2334) : le validateur `i` obtient sa clé de retrait à `m/12381/3600/i/0` et sa clé de signature à `m/12381/3600/i/0/0` (12381 identifie la courbe BLS12-381, 3600 le type de pièce pour les clés de la couche de consensus).

<KeyDerivationDiagram />

## Pour aller plus loin {#further-reading}

- [Article de blog de la Fondation Ethereum par Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333 : Génération de clés BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002 : Sorties déclenchées par la couche d'exécution](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Gestion des clés à grande échelle](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
