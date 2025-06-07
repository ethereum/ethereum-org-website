---
title: Norme de jeton ERC-777
description: null
lang: fr
---

## Avertissement {#warning}

**ERC-777 est difficile à mettre en œuvre correctement en raison de sa [vulnérabilité à différentes formes d'attaques](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Il est recommandé d'utiliser [ERC-20](/developers/docs/standards/tokens/erc-20/) à la place.** Cette page reste en tant qu'archive historique.

## Introduction ? {#introduction}

ERC-777 est une norme de jeton fongible qui améliore la norme [ERC-20](/developers/docs/standards/tokens/erc-20/) existante.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celle concernant [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quelles améliorations l'ERC-777 amène-t-elle par rapport à l'ERC-20 ? {#-erc-777-vs-erc-20}

L’ERC-777 apporte les améliorations suivantes par rapport à l’ERC-20.

### Crochets {#hooks}

Le crochet est une fonction décrite dans le code d'un contrat intelligent. Les crochets sont appelés lorsque des jetons sont envoyés ou reçus par le biais du contrat. Cela permet à un contrat intelligent de réagir aux jetons entrants ou sortants.

Les crochets sont enregistrés et découvert à l'aide la norme [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Pourquoi les crochets sont-ils exceptionnels ? {#why-are-hooks-great}

1. Les crochets permettent d'envoyer des jetons à un contrat et de notifier le contrat en une seule transaction, contrairement à [ERC-20](https://eips.ethereum.org/EIPS/eip-20), qui nécessite un double appel (approve/transferFrom) pour y parvenir.
2. Les contrats qui n'ont pas implémenté les crochets sont incompatibles avec l'ERC-777. Le contrat d'envoi interrompt la transaction si le contrat de réception n'a pas enregistré de crochet. Cela empêche les transferts accidentels vers des contrats intelligents non ERC-777.
3. Les crochets peuvent rejeter les transactions.

### Décimales {#decimals}

La norme résout également la confusion relative aux décimales générées par ERC-20. Cette clarification permet d'améliorer l'expérience développeur.

### Rétrocompatibilité avec ERC-20 {#backwards-compatibility-with-erc-20}

Les contrats ERC-777 peuvent interagir comme s'il s'agissait de contrats ERC-20.

## En savoir plus {#further-reading}

[EIP-777 : Jeton standard] (https://eips.ethereum.org/EIPS/eip-777)
