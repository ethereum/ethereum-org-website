---
title: "EIP-1271 : Signature et vérification des signatures de contrats intelligents"
description: Un aperçu de la génération et de la vérification de signatures de contrat intelligent avec l'EIP-1271. Nous examinons également la mise en œuvre de l'EIP-1271 utilisée dans Safe (anciennement Gnosis Safe) pour fournir un exemple concret aux développeurs de contrats intelligents sur lequel s'appuyer.
author: Nathan H. Leung
lang: fr
tags:
  [
    "eip-1271",
    "contrats intelligents",
    "vérification",
    "Signature"
  ]
skill: intermediate
published: 12/01/2023
---

La norme [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permet aux contrats intelligents de vérifier les signatures.

Dans ce tutoriel, nous donnons un aperçu des signatures numériques, du contexte de l'EIP-1271 et de la mise en œuvre spécifique de l'EIP-1271 utilisée par [Safe](https://safe.global/) (anciennement Gnosis Safe). L'ensemble peut servir de point de départ à la mise en œuvre de la norme EIP-1271 dans vos propres contrats.

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

Votre compte Ethereum (c.-à-d. votre compte détenu en externe/EOA) est associé à une clé privée, et c'est cette clé privée qui est généralement utilisée lorsqu'un site Web ou une dapp vous demande une signature (p. ex. pour « Se connecter avec Ethereum »).

Une application peut [vérifier une signature](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que vous créez à l'aide d'une bibliothèque tierce comme ethers.js [sans connaître votre clé privée](https://en.wikipedia.org/wiki/Public-key_cryptography) et avoir la certitude que c'est _vous_ qui avez créé la signature.

> En fait, parce que les signatures numériques EOA utilisent la cryptographie à clé publique, elles peuvent être générées et vérifiées **hors chaîne** ! C'est ainsi que fonctionne le vote DAO sans gaz — au lieu de soumettre des votes en chaîne, les signatures numériques peuvent être créées et vérifiées hors chaîne à l'aide de bibliothèques cryptographiques.

Alors que les comptes EOA disposent d'une clé privée, les comptes de contrats intelligents ne disposent d'aucune forme de clé privée ou secrète (de sorte que la fonction « Se connecter avec Ethereum », etc. ne peut pas fonctionner nativement avec les comptes de contrats intelligents).

Le problème que l'EIP-1271 cherche à résoudre : comment savoir si la signature d'un contrat intelligent est valide si le contrat intelligent n'a pas de « secret » qu'il peut incorporer dans la signature ?

## Comment fonctionne l'EIP-1271 ?

Les contrats intelligents ne disposent pas de clés privées pouvant être utilisées pour signer des messages. Alors, comment savoir si une signature est authentique ?

Eh bien, une idée est que nous pouvons simplement _demander_ au contrat intelligent si une signature est authentique !

L'EIP-1271 normalise l'idée de « demander » à un contrat intelligent si une signature donnée est valide.

Un contrat qui implémente l'EIP-1271 doit avoir une fonction appelée `isValidSignature` qui prend en entrée un message et une signature. Le contrat peut alors exécuter une logique de validation (la spécification n'impose rien de spécifique ici) et renvoyer une valeur indiquant si la signature est valide ou non.

Si `isValidSignature` renvoie un résultat valide, c'est en gros le contrat qui dit « oui, j'approuve cette signature + ce message ! »

### Interface

Voici l'interface exacte dans la spécification EIP-1271 (nous parlerons du paramètre `_hash` ci-dessous, mais pour l'instant, considérez-le comme le message en cours de vérification) :

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Devrait retourner si la signature fournie est valide pour le hachage fourni
   * @param _hash      Hachage des données à signer
   * @param _signature Tableau d'octets de la signature associé à _hash
   *
   * DOIT retourner la valeur magique bytes4 0x1626ba7e lorsque la fonction réussit.
   * NE DOIT PAS modifier l'état (en utilisant STATICCALL pour solc < 0.5, modificateur view pour solc > 0.5)
   * DOIT autoriser les appels externes
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

Les contrats peuvent implémenter `isValidSignature` de nombreuses manières — la spécification elle-même ne dit pas grand-chose sur l'implémentation exacte.

Un contrat significatif qui met en œuvre l'EIP-1271 est Safe (anciennement Gnosis Safe).

Dans le code de Safe, `isValidSignature` [est implémenté](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) de sorte que les signatures peuvent être créées et vérifiées de [deux manières](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) :

1. Messages en chaîne
   1. Création : un propriétaire du coffre-fort crée une nouvelle transaction sécurisée pour « signer » un message, en transmettant le message sous forme de données dans la transaction. Une fois que suffisamment de propriétaires ont signé la transaction pour atteindre le seuil multisig, la transaction est diffusée et exécutée. Dans la transaction, il y a une fonction de Safe appelée (`signMessage(bytes calldata _data)`) qui ajoute le message à une liste de messages « approuvés ».
   2. Vérification : appelez `isValidSignature` sur le contrat Safe, et passez le message à vérifier comme paramètre de message et [une valeur vide pour le paramètre de signature](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (c.-à-d., `0x`). Le Safe verra que le paramètre de signature est vide et au lieu de vérifier cryptographiquement la signature, il saura simplement aller de l'avant et vérifier si le message figure sur la liste des messages « approuvés ».
2. Messages hors chaîne :
   1. Création : un propriétaire de Safe crée un message hors chaîne, puis demande à d'autres propriétaires de Safe de signer le message chacun individuellement jusqu'à ce qu'il y ait suffisamment de signatures pour dépasser le seuil d'approbation multisig.
   2. Vérification : appelez `isValidSignature`. Dans le paramètre du message, envoyez le message à vérifier. Dans le paramètre de signature, transmettez les signatures individuelles de chaque propriétaire de coffre-fort, toutes concaténées ensemble, dos à dos. Le Safe vérifiera qu'il y a suffisamment de signatures pour atteindre le seuil **et** que chaque signature est valide. Si c'est le cas, il renverra une valeur indiquant une vérification de signature réussie.

## Qu'est-ce que le paramètre `_hash` exactement ? Pourquoi ne pas transmettre le message dans son intégralité ?

Vous avez peut-être remarqué que la fonction `isValidSignature` dans [l'interface EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ne prend pas en entrée le message lui-même, mais plutôt un paramètre `_hash`. Cela signifie qu'au lieu de passer le message complet de longueur arbitraire à `isValidSignature`, nous passons un hachage de 32 octets du message (généralement keccak256).

Chaque octet de calldata — c.-à-d. les données de paramètre de fonction passées à une fonction de contrat intelligent — [coûte 16 gaz (4 gaz si l'octet est un zéro)](https://eips.ethereum.org/EIPS/eip-2028), ce qui peut permettre d'économiser beaucoup de gaz si un message est long.

### Spécifications précédentes de l'EIP-1271

Il existe dans la nature des spécifications EIP-1271 qui ont une fonction `isValidSignature` avec un premier paramètre de type `bytes` (longueur arbitraire, au lieu d'une longueur fixe `bytes32`) et le nom de paramètre `message`. Il s'agit d'une [ancienne version](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) de la norme EIP-1271.

## Comment implémenter l'EIP-1271 dans mes propres contrats ?

Les spécifications sont très ouvertes à cet égard. L'implémentation de Safe présente quelques bonnes idées :

- Vous pouvez considérer les signatures EOA du « propriétaire » du contrat comme étant valides.
- Vous pouvez stocker une liste de messages approuvés et seulement considérer ceux qui sont valides.

En fin de compte, c'est à vous de décider en tant que développeur de contrat !

## Conclusion

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) est une norme polyvalente qui permet aux contrats intelligents de vérifier les signatures. Cela ouvre la voie à des contrats intelligents pour qu'ils agissent davantage comme des EOA - par exemple, en offrant un moyen de faire fonctionner la fonction « Se connecter avec Ethereum » avec les contrats intelligents — et cela peut être implémenté de plusieurs façons (Safe offre une implémentation intéressante et originale à prendre en compte).
