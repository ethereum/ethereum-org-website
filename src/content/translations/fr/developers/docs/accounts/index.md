---
title: Comptes Ethereum
description: Explication des comptes Ethereum, de leurs structures de données et de leur relation avec la cryptographie par paire de clé.
lang: fr
---

Un compte Ethereum est une entité avec un solde en ether (ETH) qui peut envoyer des transactions sur Ethereum. Les comptes peuvent être contrôlés par des utilisateurs ou déployés en tant que contrats intelligents.

## Prérequis {#prerequisites}

Les comptes sont un sujet très accessible pour les débutants, mais pour mieux comprendre cette page, nous vous recommandons de commencer par lire cette [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Types de comptes {#types-of-account}

Ethereum comprend deux types de comptes :

- Les propriétés externes, contrôlées par toute personne ayant les clés correspondantes
- Les contrats intelligents déployés sur le réseau, contrôlé par un code En savoir plus sur les [ les contrats intelligents](/developers/docs/smart-contracts/)

Les deux types peuvent :

- recevoir, contrôler et envoyer des ETH et des jetons ;
- Interagir avec les contrats intelligents déployés

### Différences principales {#key-differences}

**Propriété externe**

- La création d'un compte est gratuite
- Vous pouvez initier des transactions
- Les transactions entre des comptes externes ne peuvent être que des transferts en ETH/jeton

**Contrats**

- La création d'un contrat a un coût dû l'utilisation de stockage réseau
- Vous pouvez seulement envoyer des transactions en réponse à la réception d'une transaction
- Les transactions depuis un compte externe vers un compte de contrat peuvent déclencher un code pouvant exécuter plein d'actions différentes, comme transférer des tokens ou même créer un nouveau contrat

## Description d'un compte {#an-account-examined}

Les comptes Ethereum comportent quatre champs :

- `nonce` – Compteur qui indique le nombre de transactions envoyées depuis le compte. Cela garantit que les transactions ne sont traitées qu'une seule fois. Dans un compte de contrat, ce nombre représente le nombre de contrats créés par ce compte
- `balance` – le nombre de wei possédés par cette adresse. Le wei est une unité divisionnaire de l'ETH. Il y a 1e+18 wei pour 1 ETH.
- `codeHash` – ce hash est une référence au _code_ d'un compte dans la machine virtuelle Ethereum (EVM). Les comptes de contrat possèdent des fragments de code qui peuvent réaliser différentes opérations. Ce code EVM est exécuté si le compte reçoit un message. Contrairement aux autres champs, il ne peut pas être modifié. Tous ces fragments de code sont stockés dans une base de données à états, sous leur hash correspondant, pour une récupération future. Cette valeur de hash est connue en tant que codeHash. Pour les comptes externes, le champ du codeHash contient le hash d'une chaîne vide.
- `storageRoot` – Parfois connu sous le nom de hash de stockage. Un hash 256 bits du nœud racine d'un arbre de Merkle qui encode le contenu de stockage du compte (une correspondance entre 256 bits entiers), encodé dans un arbre préfixé comme correspondance d'un hach Keccak 256 bits des clés d'entier en 256 bits en des valeurs entières encodées en RLP. Cet arbre encode le hash des contenus stockés de ce compte, et est vide pas défaut.

![Schéma montrant la composition d'un compte](./accounts.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Comptes externes et paires de clés {#externally-owned-accounts-and-key-pairs}

Un compte est composé d'une paire de clés cryptographiques : la clé publique et la clé privée. Celles-ci servent à prouver qu'une transaction a été signée par l'expéditeur et empêchent les contrefaçons. Votre clé privée vous sert à signer les transactions. Elle vous permet donc de gérer les fonds associés à votre compte. Vous ne détenez jamais vraiment de la cryptomonnaie, vous détenez des clés privées. Les fonds sont toujours dans le registre d'Ethereum.

Cela empêche les acteurs malveillants de diffuser de fausses transactions puisque vous pouvez toujours vérifier l'expéditeur d'une transaction.

Si Alice veut envoyer de l'ether de son propre compte à celui de Marc, elle doit initier une transaction et l'envoyer sur le réseau pour vérification. L'utilisation de la cryptographie asymétrique par Ethereum permet à Alice de prouver qu'elle est l'initiatrice de la demande de transaction. Sans les mécanismes cryptographiques, une Eve malveillante pourrait simplement diffuser publiquement une demande comme "envoyer 5 ETH du compte d'Alice sur le compte d'Eve" et personne ne serait en mesure de vérifier que cela ne venait pas d'Alice.

## Création de compte {#account-creation}

Lorsque vous voulez créer un compte, la plupart des bibliothèques vous génèrent une clé privée aléatoire.

Une clé privée est composée de 64 caractères hexadécimaux et peut être chiffrée avec un mot de passe.

Exemple :

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La clé publique est générée à partir de la clé privée à l'aide d'un [algorithme de signature numérique basé sur les courbes elliptiques](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). On obtient l'adresse d'un compte en concatenant `0x` suivi des 20 derniers octets du code de hashage Keccak-256 de la clé pubique.

Voici un exemple de création d'un compte dans la console en utilisant le `personal_newAccount` du GETH :

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[Documentation du GETH](https://geth.ethereum.org/docs)

Il est possible de dériver de nouvelles clés publiques à partir de votre clé privée, mais pas l'inverse. Cela signifie qu'il est vital de garder votre clé privée en sécurité, et comme le nom l'indique, **PRIVÉE**.

Vous avez besoin d'une clé privée pour signer les messages et les transactions produisant une signature. Les autres peuvent alors prendre la signature pour dériver votre clé publique, prouvant l'auteur du message. Dans votre application, vous pouvez utiliser une bibliothèque javascript pour envoyer des transactions sur le réseau.

## Les comptes de contrats {#contract-accounts}

Les comptes de contrats possèdent également une adresse hexadécimale de 42 caractères :

Exemple :

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Cette adresse est généralement donnée lorsqu'un contrat est déployé dans la blockchain Ethereum. Elle provient de l'adresse du créateur et du nombre de transactions envoyées à partir de cette adresse (« nonce »).

## Remarque sur les portefeuilles {#a-note-on-wallets}

Un compte n'est pas un portefeuille. Un compte est une paire de clés (publique et privée) d'un compte Ethereum appartenant à un utilisateur. Un portefeuille est une interface ou une application qui vous permet d'interagir avec votre compte Ethereum.

## Démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers les fonctions de hachage et les paires de clés.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Transactions](/developers/docs/transactions/)
