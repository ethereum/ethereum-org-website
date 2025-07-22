---
title: Comptes Ethereum
description: Explication des comptes Ethereum – leurs structures de données et leur relation avec la cryptographie asymétrique.
lang: fr
---

Un compte Ethereum est une entité avec un solde en ether (ETH) qui peut réaliser des transactions sur Ethereum. Les comptes peuvent être contrôlés par l'utilisateur ou déployés en tant que contrats intelligents.

## Prérequis {#prerequisites}

Pour vous aider à mieux comprendre cette page, nous vous recommandons de commencer par lire notre [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Types de comptes {#types-of-account}

Ethereum comprend deux types de comptes :

- Compte détenu en externe (EOA) – contrôlé par toute personne ayant les clés privées
- Compte de contrat – un contrat intelligent déployé sur le réseau, contrôlé par le code. En savoir plus sur [ les contrats intelligents](/developers/docs/smart-contracts/)

Les deux types de comptes peuvent :

- Recevoir, détenir et envoyer des ETH et des jetons
- Interagir avec les contrats intelligents déployés

### Différences principales {#key-differences}

**Propriété externe**

- La création d'un compte est gratuite
- Vous pouvez initier des transactions
- Les transactions entre des comptes externes ne peuvent être que des transferts en ETH/jeton
- Composé d'une paire de clés cryptographiques : clés publiques et privées qui contrôlent les activités du compte

**Contrats**

- La création d'un contrat a un coût dû à l'utilisation de stockage réseau
- Vous pouvez seulement envoyer des transactions en réponse à la réception d'une transaction
- Les transactions depuis un compte externe vers un compte de contrat peuvent déclencher un code pouvant exécuter plein d'actions différentes, comme transférer des tokens ou même créer un nouveau contrat
- Les comptes de contrat n'ont pas de clés privées. Au lieu de cela, ils sont contrôlés par la logique du code du contrat intelligent

## Description d'un compte {#an-account-examined}

Les comptes Ethereum comportent quatre champs :

- `nonce` - Il s'agit soit d'un code indiquant le nombre de transactions envoyées à partir d'une adresse émettrice, soit du nombre de contrats créés auxquels vous pouvez avoir accès par le biais de la page dédiée aux contrats et aux adresses Ethereum (Account). Chaque adresse Ethereum (Account) peut être utilisée uniquement à chaque transaction en choisissant un nonce associé au bloc. Le rôle de ce dernier est de rendre impossible les attaques par rejeu, durant lesquelles des transactions signées sur une chaîne, sont réalisées et retransmises de manière continue sur l'autre chaîne.
- `balance` – le nombre de wei possédés par cette adresse. Le wei est une unité divisionnaire de l'ETH. Il y a 1e+18 wei pour 1 ETH.
- `codeHash` – ce hash est une référence au _code_ d'un compte dans la machine virtuelle Ethereum (EVM). Les comptes de contrat possèdent des fragments de code qui peuvent réaliser différentes opérations. Ce code EVM est exécuté si le compte reçoit un message. Contrairement aux autres champs, il ne peut pas être modifié. Tous ces fragments de code sont stockés dans une base de données à états, sous leur hachage correspondant, pour une récupération future. Cette valeur de hachage est connue en tant que codeHash. Pour les comptes externes, le champ du codeHash contient le hachage d'une chaîne vide.
- `storageRoot` – Parfois connu sous le nom de hachage de stockage. Un hash 256 bits du nœud racine d'un arbre de Merkle qui encode le contenu de stockage du compte (une correspondance entre 256 bits entiers), encodé dans un arbre préfixé comme correspondance d'un hach Keccak 256 bits des clés d'entier en 256 bits en des valeurs entières encodées en RLP. Cet arbre encode le hash des contenus stockés de ce compte, et est vide pas défaut.

![Schéma montrant la composition d'un compte](./accounts.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Comptes externes et paires de clés {#externally-owned-accounts-and-key-pairs}

Un compte est constitué d'une paire de clés cryptographiques: la clé publique et la clé privée. Celles-ci servent à prouver qu'une transaction a été signée par l'expéditeur et empêchent les contrefaçons. Votre clé privée vous sert à signer les transactions. Elle vous permet donc de gérer les fonds associés à votre compte. Vous ne détenez jamais vraiment de la cryptomonnaie, vous détenez des clés privées. Les fonds sont toujours dans le registre d'Ethereum.

Cela empêche les acteurs malveillants de diffuser de fausses transactions puisque vous pouvez toujours vérifier l'expéditeur d'une transaction.

Si Alice veut envoyer de l'ether de son propre compte à celui de Marc, elle doit initier une transaction et l'envoyer sur le réseau pour vérification. L'utilisation de la cryptographie asymétrique par Ethereum permet à Alice de prouver qu'elle est l'initiatrice de la demande de transaction. Sans les mécanismes cryptographiques, une Eve malveillante pourrait simplement diffuser publiquement une demande comme "envoyer 5 ETH du compte d'Alice sur le compte d'Eve" et personne ne serait en mesure de vérifier que cela ne venait pas d'Alice.

## Création de compte {#account-creation}

Lorsque vous souhaitez créer un compte, la plupart des bibliothèques généreront une clé privée aléatoire à votre intention.

Une clé privée est composée de 64 caractères hexadécimaux et peut être chiffrée avec un mot de passe.

Exemple :

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La clé publique est générée à partir de la clé privée à l'aide d'un [algorithme de signature numérique basé sur les courbes elliptiques](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). On obtient l'adresse d'un compte en concatenant `0x` suivi des 20 derniers octets du code de hashage Keccak-256 de la clé pubique.

Cela signifie qu'un compte externe (EOA) possède une adresse de 42 caractères (un segment de 20 octets, soit 40 caractères hexadécimaux plus le préfixe `0x`).

Exemple :

`0x5e97870f263700f46aa00d967821199b9bc5a120`

L'exemple suivant montre comment utiliser un outil de signature appelé [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) pour générer un nouveau compte. Clef est un outil de gestion de compte et de signature qui est fourni avec le client Ethereum [Geth](https://geth.ethereum.org). La commande `clef newaccount` crée une nouvelle paire de clés et les enregistre dans un magasin de clés chiffré.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Documentation Geth](https://geth.ethereum.org/docs)

Il est possible de dériver de nouvelles clés publiques à partir de votre clé privée, mais pas l'inverse. Il est impératif de conserver vos clés privées en sécurité. Comme leur nom l'indique, elles sont **PRIVÉES**.

Vous avez besoin d'une clé privée pour signer les messages et les transactions produisant une signature. Les autres peuvent alors prendre la signature pour dériver votre clé publique, prouvant l'auteur du message. Dans votre application, vous pouvez utiliser une bibliothèque JavaScript pour envoyer des transactions au réseau.

## Les comptes de contrats {#contract-accounts}

Les comptes de contrats possèdent également une adresse hexadécimale de 42 caractères :

Exemple :

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Cette adresse est généralement donnée lorsqu'un contrat est déployé dans la blockchain Ethereum. Elle provient de l'adresse du créateur et du nombre de transactions envoyées à partir de cette adresse (« nonce »).

## Clés de validateur {#validators-keys}

Il existe également un autre type de clé dans Ethereum, qui a été mis en place lorsque Ethereum est passé de la preuve de travail à un consensus basé sur la preuve d'enjeu. Il s'agit des clés « BLS », qui sont utilisées pour identifier les validateurs. Ces clés peuvent être agrégées efficacement pour réduire la bande passante nécessaire au consensus du réseau. Sans cette clé d'agrégation, la mise en jeu minimale pour un validateur serait beaucoup plus élevée.

[En savoir plus sur les clés de validateur](/developers/docs/consensus-mechanisms/pos/keys/).

## Remarque sur les portefeuilles {#a-note-on-wallets}

Un compte n'est pas un portefeuille. Un portefeuille est une interface ou une application qui vous permet d'interagir avec votre compte Ethereum, qu'il s'agisse d'un compte externe ou d'un compte de contrat.

## Démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers les fonctions de hachage et les paires de clés.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Complément d'information {#further-reading}

- [Comprendre les Comptes Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Transactions](/developers/docs/transactions/)
