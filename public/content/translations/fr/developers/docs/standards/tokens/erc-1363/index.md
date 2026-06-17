---
title: Norme de jeton payable ERC-1363
description: L'ERC-1363 est une interface d'extension pour les jetons ERC-20 qui prend en charge l'exécution d'une logique personnalisée sur un contrat destinataire après des transferts, ou sur un contrat dépensier après des approbations, le tout en une seule transaction.
lang: fr
---

## Introduction {#introduction}

### Qu'est-ce que l'ERC-1363 ? {#what-is-erc1363}

L'ERC-1363 est une interface d'extension pour les jetons ERC-20 qui prend en charge l'exécution d'une logique personnalisée sur un contrat destinataire après des transferts, ou sur un contrat dépensier après des approbations, le tout en une seule transaction.

### Différences par rapport à l'ERC-20 {#erc20-differences}

Les opérations ERC-20 standard telles que `transfer`, `transferFrom` et `approve` ne permettent pas l'exécution de code sur le contrat destinataire ou dépensier sans une transaction distincte.
Cela introduit de la complexité dans le développement de l'interface utilisateur et des frictions dans l'adoption, car les utilisateurs doivent attendre que la première transaction soit exécutée avant de soumettre la seconde.
Ils doivent également payer le gaz deux fois.

L'ERC-1363 permet aux jetons fongibles d'effectuer des actions plus facilement et de fonctionner sans l'utilisation d'un écouteur hors chaîne.
Il permet d'effectuer un rappel (callback) sur un contrat récepteur ou dépensier, après un transfert ou une approbation, en une seule transaction.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord ce qui suit :

- [Normes de jetons](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corps {#body}

L'ERC-1363 introduit une API standard pour les jetons ERC-20 afin d'interagir avec les contrats intelligents après `transfer`, `transferFrom` ou `approve`.

Cette norme fournit des fonctionnalités de base pour transférer des jetons, ainsi que pour permettre l'approbation des jetons afin qu'ils puissent être dépensés par un autre tiers onchain, puis effectuer un rappel sur le contrat récepteur ou dépensier.

Il existe de nombreuses propositions d'utilisation de contrats intelligents pouvant accepter les rappels ERC-20.

Voici quelques exemples :

- **Ventes participatives (Crowdsales)** : les jetons envoyés déclenchent l'attribution instantanée d'une récompense.
- **Services** : le paiement active l'accès au service en une seule étape.
- **Factures** : les jetons règlent les factures automatiquement.
- **Abonnements** : l'approbation du tarif annuel active l'abonnement dès le paiement du premier mois.

Pour ces raisons, il a été initialement nommé **« Jeton payable » (Payable Token)**.

Le comportement de rappel étend encore son utilité, permettant des interactions fluides telles que :

- **Staking** : les jetons transférés déclenchent un verrouillage automatique dans un contrat de staking.
- **Vote** : les jetons reçus enregistrent des votes dans un système de gouvernance.
- **Échange (Swapping)** : les approbations de jetons activent la logique d'échange en une seule étape.

Les jetons ERC-1363 peuvent être utilisés pour des utilités spécifiques dans tous les cas nécessitant l'exécution d'un rappel après un transfert ou une approbation reçue.
L'ERC-1363 est également utile pour éviter la perte ou le verrouillage de jetons dans les contrats intelligents en vérifiant la capacité du destinataire à gérer les jetons.

Contrairement à d'autres propositions d'extension ERC-20, l'ERC-1363 ne remplace pas les méthodes `transfer` et `transferFrom` de l'ERC-20 et définit les identifiants d'interfaces à implémenter tout en maintenant la rétrocompatibilité avec l'ERC-20.

D'après l'[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) :

### Méthodes {#methods}

Les contrats intelligents implémentant la norme ERC-1363 **DOIVENT** implémenter toutes les fonctions de l'interface `ERC1363`, ainsi que les interfaces `ERC20` et `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Une interface d'extension pour les jetons ERC-20 qui prend en charge l'exécution de code sur un contrat destinataire
 * après `transfer` ou `transferFrom`, ou de code sur un contrat dépensier après `approve`, en une seule transaction.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE : l'identifiant ERC-165 pour cette interface est 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Déplace une quantité `value` de jetons du compte de l'appelant vers `to`
   * et appelle ensuite `ERC1363Receiver::onTransferReceived` sur `to`.
   * @param to L'adresse vers laquelle les jetons sont transférés.
   * @param value La quantité de jetons à transférer.
   * @return Une valeur booléenne indiquant que l'opération a réussi à moins de lever une exception.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Déplace une quantité `value` de jetons du compte de l'appelant vers `to`
   * et appelle ensuite `ERC1363Receiver::onTransferReceived` sur `to`.
   * @param to L'adresse vers laquelle les jetons sont transférés.
   * @param value La quantité de jetons à transférer.
   * @param data Données supplémentaires sans format spécifié, envoyées dans l'appel à `to`.
   * @return Une valeur booléenne indiquant que l'opération a réussi à moins de lever une exception.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Déplace une quantité `value` de jetons de `from` vers `to` en utilisant le mécanisme d'allocation
   * et appelle ensuite `ERC1363Receiver::onTransferReceived` sur `to`.
   * @param from L'adresse à partir de laquelle envoyer les jetons.
   * @param to L'adresse vers laquelle les jetons sont transférés.
   * @param value La quantité de jetons à transférer.
   * @return Une valeur booléenne indiquant que l'opération a réussi à moins de lever une exception.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Déplace une quantité `value` de jetons de `from` vers `to` en utilisant le mécanisme d'allocation
   * et appelle ensuite `ERC1363Receiver::onTransferReceived` sur `to`.
   * @param from L'adresse à partir de laquelle envoyer les jetons.
   * @param to L'adresse vers laquelle les jetons sont transférés.
   * @param value La quantité de jetons à transférer.
   * @param data Données supplémentaires sans format spécifié, envoyées dans l'appel à `to`.
   * @return Une valeur booléenne indiquant que l'opération a réussi à moins de lever une exception.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Définit une quantité `value` de jetons comme allocation de `spender` sur les jetons de l'appelant
   * et appelle ensuite `ERC1363Spender::onApprovalReceived` sur `spender`.
   * @param spender L'adresse qui dépensera les fonds.
   * @param value La quantité de jetons à dépenser.
   * @return Une valeur booléenne indiquant que l'opération a réussi à moins de lever une exception.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Définit une quantité `value` de jetons comme allocation de `spender` sur les jetons de l'appelant
   * et appelle ensuite `ERC1363Spender::onApprovalReceived` sur `spender`.
   * @param spender L'adresse qui dépensera les fonds.
   * @param value La quantité de jetons à dépenser.
   * @param data Données supplémentaires sans format spécifié, envoyées dans l'appel à `spender`.
   * @return Une valeur booléenne indiquant que l'opération a réussi à moins de lever une exception.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Un contrat intelligent qui souhaite accepter des jetons ERC-1363 via `transferAndCall` ou `transferFromAndCall` **DOIT** implémenter l'interface `ERC1363Receiver` :

```solidity
/**
 * @title ERC1363Receiver
 * @dev Interface pour tout contrat qui souhaite prendre en charge `transferAndCall` ou `transferFromAndCall` à partir de contrats de jetons ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Chaque fois que des jetons ERC-1363 sont transférés vers ce contrat via `ERC1363::transferAndCall` ou `ERC1363::transferFromAndCall`
   * par `operator` depuis `from`, cette fonction est appelée.
   *
   * NOTE : Pour accepter le transfert, cela doit retourner
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (c'est-à-dire 0x88a7ca5c, ou son propre sélecteur de fonction).
   *
   * @param operator L'adresse qui a appelé la fonction `transferAndCall` ou `transferFromAndCall`.
   * @param from L'adresse à partir de laquelle les jetons sont transférés.
   * @param value La quantité de jetons transférés.
   * @param data Données supplémentaires sans format spécifié.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` si le transfert est autorisé à moins de lever une exception.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Un contrat intelligent qui souhaite accepter des jetons ERC-1363 via `approveAndCall` **DOIT** implémenter l'interface `ERC1363Spender` :

```solidity
/**
 * @title ERC1363Spender
 * @dev Interface pour tout contrat qui souhaite prendre en charge `approveAndCall` à partir de contrats de jetons ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Chaque fois qu'un `owner` de jetons ERC-1363 approuve ce contrat via `ERC1363::approveAndCall`
   * pour dépenser ses jetons, cette fonction est appelée.
   *
   * NOTE : Pour accepter l'approbation, cela doit retourner
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (c'est-à-dire 0x7b04a2d0, ou son propre sélecteur de fonction).
   *
   * @param owner L'adresse qui a appelé la fonction `approveAndCall` et qui possédait précédemment les jetons.
   * @param value La quantité de jetons à dépenser.
   * @param data Données supplémentaires sans format spécifié.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` si l'approbation est autorisée à moins de lever une exception.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Complément d'information {#further-reading}

- [ERC-1363 : Norme de jeton payable](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363 : Dépôt GitHub](https://github.com/vittominacori/erc1363-payable-token)