---
title: Comptes Ethereum
description: Explication des comptes Ethereum, de leurs structures de données et de leur relation avec la cryptographie par paire de clé.
lang: fr
sidebar: true
---

Un compte Ethereum est une entité avec un solde en ether (ETH) qui peut envoyer des transactions sur Ethereum. Les comptes peuvent être contrôlés par des utilisateurs ou déployés en tant que contrats intelligents.

## Prérequis {#prerequisites}

Les comptes sont un sujet très accessible pour les débutants, mais pour mieux comprendre cette page, nous vous recommandons de commencer par lire cette [introduction à Ethereum](/en/developers/docs/intro-to-ethereum/).

## Types de comptes {#types-of-account}

Ethereum comprend deux types de comptes :

- Les propriétés externes, contrôlées par toute personne ayant les clés correspondantes
- Les contrats intelligents déployés sur le réseau, contrôlé par un code En savoir plus sur les [ les contrats intelligents](/en/developers/docs/smart-contracts/)

Les deux types peuvent :

- recevoir, contrôler et envoyer des ETH et des jetons ;
- Interagir avec les contrats intelligents déployés

### Différences principales {#key-differences}

**Propriété externe**

- La création d'un compte d'un compte est gratuite.
- Vous pouvez initier des transactions.
- Les seules transactions possibles entre les comptes externes sont les transferts d'ETH.

**Contrats**

- La création d'un compte a un coût parce que vous utilisez du stockage réseau.
- Vous ne pouvez envoyer des transactions qu'en réponse à la réception d'une transaction.
- Les transactions depuis un compte externe vers un compte de contrat peuvent déclencher du code qui peut exécuter de nombreuses actions différentes, comme le transfert de jetons ou la création d'un nouveau contrat.

## Description d'un compte {#an-account-examined}

Les comptes Ethereum comportent quatre champs :

- `nonce` – Compteur qui indique le nombre de transactions envoyées depuis le compte. Cela garantit que les transactions ne sont traitées qu'une seule fois. Pour un compte de contrat, ce nombre représente le nombre de contrats créés par le compte
- `balance` – Nombre de wei appartenant à cette adresse. wei est une dénomination de l'ETH. Il y a 1e+18 wei par ETH.
- `codeHash` – Tous ces fragments de code sont contenus dans la base de données d'état sous leurs hachages correspondants pour une récupération ultérieure. Pour les comptes de contrat, c'est le code qui est haché et stocké en tant que codeHash. Pour les comptes externes, le champ codeHash est le hachage de la chaîne vide.
<!--this hash refers to the code of this account on the Ethereum virtual machine (EVM). This EVM code gets executed if the account gets a message call. It cannot be changed unlike the other account fields.  -->
- `storageRoot` – Parfois connu sous le nom de hash de stockage. Un hash 256 bits du nœud racine d'un arbre de Merkle qui encode le contenu de stockage du compte (une correspondance entre 256 bits entiers), encodé dans un arbre préfixé comme correspondance d'un hach Keccak 256 bits des clés d'entier en 256 bits en des valeurs entières encodées en RLP. Cette arborescence encode le hachage des contenus de stockage de ce compte, et est vide par défaut.

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

La clé publique est générée à partir de la clé privée en utilisant l'algorithme de signature numérique Elliptic Curve. Vous obtenez une adresse publique pour votre compte en prenant les 20 derniers octets de la clé publique et en ajoutant `0x` au début.

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

Vous avez besoin d'une clé privée pour signer les messages et les transactions produisant une signature. Les autres peuvent alors prendre la signature pour dériver votre clé publique, prouvant l'auteur du message. Dans votre application, vous pouvez utiliser une bibliothèque javascript pour envoyer des transactions sur le réseau.<!-- **WEB3JS example**

```jsx
web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

[Web3js documentation](https://web3js.readthedocs.io/)

[code for creating an account in JS?] + links to how to do it in other languages maybe?

`$ geth account new` -->## Les comptes de contrats {#contract-accounts}

Les comptes de contrats possèdent également une adresse hexadécimale de 42 caractères :

Exemple :

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Cette adresse est généralement donnée lorsqu'un contrat est déployé dans la blockchain Ethereum. Elle provient de l'adresse du créateur et du nombre de transactions envoyées à partir de cette adresse ("nonce").<!-- @Sam Richards is there a line of code you can use to return your contract's address – in the same way that we have personal.newAccount() above? – Don't know if what I found below is helpful?

```jsx
ethers.utils.getContractAddress( transaction ) ⇒ string< Address >
```

TODO: add a contract address example--><!-- ## Managing an account

Most users will want to interact with their account via a wallet. Note that an account is not a wallet. A wallet is the keypair associated with a user-owned account, which allow a user to make transactions from or manage the account

For dapp development, you'll want access to dummy accounts with test ETH so you can experiment. When you create a local chain, you'll get test accounts wth fake ETH which you can then import using MetaMask and use on your dapp's frontend. -->

## Remarque sur les portefeuilles {#a-note-on-wallets}

Un compte n'est pas un portefeuille. Un portefeuille est la paire de clés associée à un compte utilisateur, qui permet à l'utilisateur d'effectuer des transactions ou de gérer le compte.

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Contrats intelligents](/en/developers/docs/smart-contracts/)
- [Transactions](/en/developers/docs/transactions/)
