---
title: "EIP-1271 : Signature et vérification des signatures de contrats intelligents"
description: Un aperçu de la génération et de la vérification de signatures de contrat intelligent avec l'EIP-1271. Nous examinons également la mise en œuvre de l'EIP-1271 utilisée dans Safe (anciennement Gnosis Safe) pour fournir un exemple concret aux développeurs de contrats intelligents sur lequel s'appuyer.
author: Nathan H. Leung
lang: fr
tags:
  - "eip-1271"
  - "contrats intelligents"
  - "vérification"
  - "Signature"
skill: intermediate
published: 2023-01-12
---

La norme [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permet aux contrats intelligents de vérifier les signatures.

Dans ce tutoriel, nous donnons un aperçu des signatures numériques, de l'historique de l'EIP-1271 et de la mise en œuvre spécifique de l'EIP-1271 utilisée par [Safe](https://safe.global/) (anciennement Gnosis Safe). L'ensemble peut servir de point de départ à la mise en œuvre de la norme EIP-1271 dans vos propres contrats.

## Qu'est-ce qu'une signature ?

Dans ce contexte, une signature (plus précisément, une « signature numérique ») est un message accompagné d'une forme de preuve que le message provient d'une personne, d'un expéditeur ou d'une adresse spécifique.

Par exemple, une signature numérique peut se présenter comme suit :

1. Message : « Je veux me connecter à ce site web avec mon portefeuille Ethereum. »
2. Signataire : Mon adresse est `0x000…`
3. Preuve : Voici une preuve que c'est bien moi, `0x000…`, qui ai créé l'intégralité de ce message (il s'agit généralement de quelque chose de cryptographique).

Il est important de noter qu'une signature numérique comprend à la fois un « message » et une « signature ».

Pourquoi ? À titre d'exemple, si vous me donnez un contrat à signer, que je retire la page de signature et que je ne vous remets que mes signatures sans le reste du contrat, le contrat n'est pas valide.

De même, une signature numérique ne signifie rien sans un message associé !

## Pourquoi l'EIP-1271 existe-t-elle ?

Pour créer une signature numérique à utiliser sur les blockchains basées sur Ethereum, vous avez généralement besoin d'une clé privée secrète que personne d'autre ne connaît. C'est ce qui fait que votre signature vous appartient (personne d'autre ne peut créer la même signature sans connaître la clé secrète).

Votre compte Ethereum (c'est-à-dire votre compte externe/EOA) est associé à une clé privée, et c'est cette clé privée qui est généralement utilisée lorsqu'un site web ou une application vous demande une signature (par exemple, pour « Se connecter avec Ethereum »).

Une application peut [vérifier une signature](https://docs.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que vous créez à l'aide d'une bibliothèque tierce telle que ethers.js [sans connaître votre clé privée](https://en.wikipedia.org/wiki/Public-key_cryptography) et être certaine que _vous_ êtes celui/celle qui a créé la signature.

> En fait, comme les signatures numériques EOA utilisent la cryptographie à clé publique, elles peuvent être générées et vérifiées **hors chaîne** ! C'est comme cela que fonctionne les votes DAO sans gaz - au lieu de soumettre les votes sur la chaîne, les signatures numériques peuvent être créées et vérifiées hors chaîne à l'aide de bibliothèques cryptographiques.

Alors que les comptes EOA disposent d'une clé privée, les comptes de contrats intelligents ne disposent d'aucune forme de clé privée ou secrète (de sorte que la fonction « Se connecter avec Ethereum », etc. ne peut pas fonctionner nativement avec les comptes de contrats intelligents).

Le problème que l'EIP-1271 cherche à résoudre : comment savoir si la signature d'un contrat intelligent est valide si le contrat intelligent n'a pas de « secret » qu'il peut incorporer dans la signature ?

## Comment fonctionne l'EIP-1271 ?

Les contrats intelligents ne disposent pas de clés privées pouvant être utilisées pour signer des messages. Alors, comment savoir si une signature est authentique ?

Eh bien, une idée serait tout simplement de _demander_ au contrat intelligent si une signature est authentique !

L'EIP-1271 normalise l'idée de « demander » à un contrat intelligent si une signature donnée est valide.

Un contrat qui implémente l'EIP-1271 doit avoir une fonction appelée `isValidSignature` qui prend en compte un message et une signature. Le contrat peut alors exécuter une logique de validation (la spécification n'impose rien de spécifique ici) et renvoyer une valeur indiquant si la signature est valide ou non.

Si `isValidSignature` renvoie un résultat valide, c'est en gros le contrat qui dit « oui, j'approuve cette signature + ce message ! »

### Interface

Voici l'interface exacte dans la spécification EIP-1271 (nous parlerons du paramètre `_hash` plus loin, mais pour l'instant, considérez-le comme le message qui est vérifié) :

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided hash
   * @param _hash      Hash of the data to be signed
   * @param _signature Signature byte array associated with _hash
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Exemple d'implémentation EIP-1271 : Safe

Les contrats peuvent implémenter `isValidSignature` de plusieurs façons - la spécification seule ne précise pas l'implémentation exacte.

Un contrat significatif qui met en œuvre l'EIP-1271 est Safe (anciennement Gnosis Safe).

Dans le code de Safe, la fonction `isValidSignature` [est implémentée](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) de manière à ce que les signatures puissent être créées et vérifiées de [deux manières](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) :

1. Messages on-chain
   1. Création : un propriétaire du coffre-fort crée une nouvelle transaction sécurisée pour « signer » un message, en transmettant le message sous forme de données dans la transaction. Une fois que suffisamment de propriétaires ont signé la transaction pour atteindre le seuil multisig, la transaction est diffusée et exécutée. Dans la transaction, une fonction « safe » est invoquée afin d'ajouter le message à une liste de messages « approuvés ».
   2. Vérification : appelez `isValidSignature` sur le contrat Safe, et envoyez le message à vérifier en tant que paramètre du message et [une valeur vide pour le paramètre de signature](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (c'est-à-dire `0x`). Le Safe verra que le paramètre de signature est vide et au lieu de vérifier cryptographiquement la signature, il saura simplement aller de l'avant et vérifier si le message figure sur la liste des messages « approuvés ».
2. Messages hors chaîne :
   1. Création : un propriétaire de coffre-fort crée un message hors chaîne, puis demande à d'autres propriétaires de coffre-fort de signer le message chacun individuellement jusqu'à ce qu'il y ait suffisamment de signatures pour dépasser le seuil d'approbation multisig.
   2. Vérification : appelez `isValidSignature`. Dans le paramètre du message, envoyez le message à vérifier. Dans le paramètre de signature, transmettez les signatures individuelles de chaque propriétaire de coffre-fort, toutes concaténées ensemble, dos à dos. Le Safe vérifiera qu'il y a suffisamment de signatures pour atteindre le seuil **et** que chaque signature est valide. Si c'est le cas, il renverra une valeur indiquant une vérification de signature réussie.

## Qu'est-ce que le paramètre `_hash` ? Pourquoi ne pas transmettre le message dans son intégralité ?

Vous avez peut-être remarqué que la fonction `isValidSignature` dans l'[interface de l'EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ne prend pas le message lui-même, mais plutôt un paramètre `_hash`. Ce que cela signifie, c'est qu'au lieu de passer le message complet de longueur arbitraire à `isValidSignature`, nous passons plutôt un hash de 32 octets du message (généralement keccak256).

Chaque octet de calldata - c'est-à-dire les données des paramètres de fonction passées à une fonction de contrat intelligent - [coûte 16 gaz (4 gaz si l'octet est zéro)](https://eips.ethereum.org/EIPS/eip-2028), cela peut donc économiser beaucoup de gaz si un message est long.

### Spécifications précédentes de l'EIP-1271

Il existe des spécifications de l'EIP-1271 dans la nature qui ont une fonction `isValidSignature` avec un premier paramètre de type `bytes` (longueur arbitraire, au lieu d'une longueur fixe `bytes32`) et un nom de paramètre `message`. C'est une [version plus ancienne](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) de l'EIP-1271.

## Comment implémenter l'EIP-1271 dans mes propres contrats ?

Les spécifications sont très ouvertes à cet égard. L'implémentation de Safe présente quelques bonnes idées :

- Vous pouvez considérer les signatures EOA du « propriétaire » du contrat comme étant valides.
- Vous pouvez stocker une liste de messages approuvés et seulement considérer ceux qui sont valides.

En fin de compte, c'est à vous de décider en tant que développeur de contrat !

## Conclusion

[L'EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) est une norme polyvalente qui permet aux contrats intelligents de vérifier les signatures. Cela ouvre la voie à des contrats intelligents pour qu'ils agissent davantage comme des EOA - par exemple, en offrant un moyen de faire fonctionner la fonction « Se connecter avec Ethereum » avec les contrats intelligents — et cela peut être implémenté de plusieurs façons (Safe offre une implémentation intéressante et originale à prendre en compte).
