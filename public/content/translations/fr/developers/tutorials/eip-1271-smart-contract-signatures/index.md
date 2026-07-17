---
title: "EIP-1271 : Signer et vérifier les signatures de contrats intelligents"
description: "Un aperçu de la génération et de la vérification de signatures de contrats intelligents avec l'EIP-1271. Nous parcourons également l'implémentation de l'EIP-1271 utilisée dans Safe (anciennement Gnosis Safe) pour fournir un exemple concret sur lequel les développeurs de contrats intelligents peuvent s'appuyer."
author: Nathan H. Leung
lang: fr
tags: ["eip-1271", "contrats intelligents", "vérification", "signature"]
skill: intermediate
breadcrumb: Signatures EIP-1271
published: 2023-01-12
---

La norme [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permet aux contrats intelligents de vérifier les signatures.

Dans ce tutoriel, nous donnons un aperçu des signatures numériques, du contexte de l'EIP-1271 et de l'implémentation spécifique de l'EIP-1271 utilisée par [Safe](https://safe.global/) (anciennement Gnosis Safe). L'ensemble peut servir de point de départ pour implémenter l'EIP-1271 dans vos propres contrats.

## Qu'est-ce qu'une signature ? {#what-is-a-signature}

Dans ce contexte, une signature (plus précisément, une « signature numérique ») est un message accompagné d'une sorte de preuve que le message provient d'une personne, d'un expéditeur ou d'une adresse spécifique.

Par exemple, une signature numérique pourrait ressembler à ceci :

1. Message : « Je veux me connecter à ce site web avec mon portefeuille Ethereum. »
2. Signataire : Mon adresse est `0x000…`
3. Preuve : Voici une preuve que moi, `0x000…`, ai réellement créé ce message en entier (il s'agit généralement de cryptographie).

Il est important de noter qu'une signature numérique comprend à la fois un « message » et une « signature ».

Pourquoi ? Par exemple, si vous me donniez un contrat à signer, et que je découpais la page de signature pour ne vous rendre que mes signatures sans le reste du contrat, le contrat ne serait pas valide.

De la même manière, une signature numérique ne signifie rien sans un message associé !

## Pourquoi l'EIP-1271 existe-t-il ? {#why-does-eip-1271-exist}

Afin de créer une signature numérique à utiliser sur les blockchains basées sur Ethereum, vous avez généralement besoin d'une clé privée secrète que personne d'autre ne connaît. C'est ce qui fait que votre signature est la vôtre (personne d'autre ne peut créer la même signature sans connaître la clé secrète).

Votre compte Ethereum (c'est-à-dire votre compte détenu par un tiers/EOA) possède une clé privée qui lui est associée, et c'est cette clé privée qui est généralement utilisée lorsqu'un site web ou une application décentralisée (dapp) vous demande une signature (par exemple, pour « Se connecter avec Ethereum »).

Une application peut [vérifier une signature](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que vous créez à l'aide d'une bibliothèque tierce comme Ethers.js [sans connaître votre clé privée](https://en.wikipedia.org/wiki/Public-key_cryptography) et être certaine que c'est bien _vous_ qui avez créé la signature.

> En fait, comme les signatures numériques des EOA utilisent la cryptographie à clé publique, elles peuvent être générées et vérifiées **hors chaîne** ! C'est ainsi que fonctionne le vote sans gaz des DAO : au lieu de soumettre des votes onchain, les signatures numériques peuvent être créées et vérifiées hors chaîne à l'aide de bibliothèques cryptographiques.

Alors que les comptes EOA possèdent une clé privée, les comptes de contrats intelligents n'ont aucune sorte de clé privée ou secrète (donc « Se connecter avec Ethereum », etc. ne peut pas fonctionner nativement avec les comptes de contrats intelligents).

Le problème que l'EIP-1271 vise à résoudre : comment pouvons-nous savoir qu'une signature de contrat intelligent est valide si le contrat intelligent n'a aucun « secret » qu'il peut incorporer dans la signature ?

## Comment fonctionne l'EIP-1271 ? {#how-does-eip-1271-work}

Les contrats intelligents n'ont pas de clés privées pouvant être utilisées pour signer des messages. Alors, comment pouvons-nous savoir si une signature est authentique ?

Eh bien, une idée est que nous pouvons simplement _demander_ au contrat intelligent si une signature est authentique !

Ce que fait l'EIP-1271, c'est standardiser cette idée de « demander » à un contrat intelligent si une signature donnée est valide.

Un contrat qui implémente l'EIP-1271 doit avoir une fonction appelée `isValidSignature` qui prend en entrée un message et une signature. Le contrat peut ensuite exécuter une logique de validation (la spécification n'impose rien de spécifique ici) puis renvoyer une valeur indiquant si la signature est valide ou non.

Si `isValidSignature` renvoie un résultat valide, c'est un peu comme si le contrat disait « oui, j'approuve cette signature + ce message ! »

### Interface {#interface}

Voici l'interface exacte dans la spécification de l'EIP-1271 (nous parlerons du paramètre `_hash` ci-dessous, mais pour l'instant, considérez-le comme le message en cours de vérification) :

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Doit retourner si la signature fournie est valide pour le hash fourni
   * @param _hash      Hash des données à signer
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

## Exemple d'implémentation de l'EIP-1271 : Safe {#example-eip-1271-implementation-safe}

Les contrats peuvent implémenter `isValidSignature` de nombreuses manières — la spécification ne dit pas grand-chose sur l'implémentation exacte.

Un contrat notable qui implémente l'EIP-1271 est Safe (anciennement Gnosis Safe).

Dans le code de Safe, `isValidSignature` [est implémenté](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) de sorte que les signatures peuvent être créées et vérifiées de [deux manières](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) :

1. Messages onchain
   1. Création : un propriétaire de Safe crée une nouvelle transaction Safe pour « signer » un message, en passant le message comme données dans la transaction. Une fois que suffisamment de propriétaires ont signé la transaction pour atteindre le seuil du multisig, la transaction est diffusée et exécutée. Dans la transaction, il y a une fonction Safe appelée (`signMessage(bytes calldata _data)`) qui ajoute le message à une liste de messages « approuvés ».
   2. Vérification : appelez `isValidSignature` sur le contrat Safe, et passez le message à vérifier comme paramètre de message et [une valeur vide pour le paramètre de signature](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (c'est-à-dire `0x`). Le Safe verra que le paramètre de signature est vide et, au lieu de vérifier cryptographiquement la signature, il saura qu'il doit simplement vérifier si le message figure sur la liste des messages « approuvés ».
2. Messages hors chaîne :
   1. Création : un propriétaire de Safe crée un message hors chaîne, puis demande aux autres propriétaires de Safe de signer le message individuellement jusqu'à ce qu'il y ait suffisamment de signatures pour dépasser le seuil d'approbation du multisig.
   2. Vérification : appelez `isValidSignature`. Dans le paramètre de message, passez le message à vérifier. Dans le paramètre de signature, passez les signatures individuelles de chaque propriétaire de Safe, toutes concaténées les unes à la suite des autres. Le Safe vérifiera qu'il y a suffisamment de signatures pour atteindre le seuil **et** que chaque signature est valide. Si c'est le cas, il renverra une valeur indiquant que la vérification de la signature a réussi.

## Qu'est-ce que le paramètre `_hash` exactement ? Pourquoi ne pas passer le message entier ? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Vous avez peut-être remarqué que la fonction `isValidSignature` dans [l'interface de l'EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ne prend pas le message lui-même, mais plutôt un paramètre `_hash`. Cela signifie qu'au lieu de passer le message complet de longueur arbitraire à `isValidSignature`, nous passons plutôt un hash de 32 octets du message (généralement keccak256).

Chaque octet de données d'appel — c'est-à-dire les données de paramètre de fonction passées à une fonction de contrat intelligent — [coûte 16 gaz (4 gaz si l'octet est nul)](https://eips.ethereum.org/EIPS/eip-2028), ce qui peut économiser beaucoup de gaz si un message est long.

### Spécifications précédentes de l'EIP-1271 {#previous-eip-1271-specifications}

Il existe en pratique des spécifications de l'EIP-1271 qui ont une fonction `isValidSignature` avec un premier paramètre de type `bytes` (de longueur arbitraire, au lieu d'un `bytes32` de longueur fixe) et un nom de paramètre `message`. Il s'agit d'une [ancienne version](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) de la norme EIP-1271.

## Comment l'EIP-1271 doit-il être implémenté dans mes propres contrats ? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

La spécification est très ouverte ici. L'implémentation de Safe a de bonnes idées :

- Vous pouvez considérer que les signatures EOA du « propriétaire » du contrat sont valides.
- Vous pourriez stocker une liste de messages approuvés et ne considérer que ceux-ci comme valides.

En fin de compte, c'est à vous de décider en tant que développeur du contrat !

## Conclusion {#conclusion}

L'[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) est une norme polyvalente qui permet aux contrats intelligents de vérifier les signatures. Elle ouvre la porte aux contrats intelligents pour qu'ils agissent davantage comme des EOA — par exemple en fournissant un moyen pour que « Se connecter avec Ethereum » fonctionne avec les contrats intelligents — et elle peut être implémentée de nombreuses manières (Safe ayant une implémentation non triviale et intéressante à considérer).