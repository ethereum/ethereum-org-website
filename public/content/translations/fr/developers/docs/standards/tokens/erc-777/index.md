---
title: Norme de jeton ERC-777
description: "Découvrez l'ERC-777, une norme de jeton fongible améliorée avec des hooks, bien que l'ERC-20 soit recommandé pour des raisons de sécurité."
lang: fr
---

## Avertissement {#warning}

**L'ERC-777 est difficile à implémenter correctement, en raison de sa [vulnérabilité à différentes formes d'attaques](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Il est recommandé d'utiliser l'[ERC-20](/developers/docs/standards/tokens/erc-20/) à la place.** Cette page est conservée en tant qu'archive historique.

## Introduction ? {#introduction}

L'ERC-777 est une norme de jeton fongible qui améliore la norme [ERC-20](/developers/docs/standards/tokens/erc-20/) existante.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord la page sur l'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quelles améliorations l'ERC-777 propose-t-il par rapport à l'ERC-20 ? {#-erc-777-vs-erc-20}

L'ERC-777 apporte les améliorations suivantes par rapport à l'ERC-20.

### Hooks {#hooks}

Les hooks sont une fonction décrite dans le code d'un contrat intelligent. Les hooks sont appelés lorsque des jetons sont envoyés ou reçus par le contrat. Cela permet à un contrat intelligent de réagir aux jetons entrants ou sortants.

Les hooks sont enregistrés et découverts à l'aide de la norme [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Pourquoi les hooks sont-ils utiles ? {#why-are-hooks-great}

1. Les hooks permettent d'envoyer des jetons à un contrat et de notifier le contrat en une seule transaction, contrairement à l'[ERC-20](https://eips.ethereum.org/EIPS/eip-20), qui nécessite un double appel (`approve`/`transferFrom`) pour y parvenir.
2. Les contrats qui n'ont pas enregistré de hooks sont incompatibles avec l'ERC-777. Le contrat expéditeur annulera la transaction si le contrat destinataire n'a pas enregistré de hook. Cela empêche les transferts accidentels vers des contrats intelligents non-ERC-777.
3. Les hooks peuvent rejeter des transactions.

### Décimales {#decimals}

La norme résout également la confusion autour de `decimals` causée dans l'ERC-20. Cette clarté améliore l'expérience des développeurs.

### Rétrocompatibilité avec l'ERC-20 {#backwards-compatibility-with-erc-20}

Il est possible d'interagir avec les contrats ERC-777 comme s'il s'agissait de contrats ERC-20.

## Complément d'information {#further-reading}

[EIP-777 : Norme de jeton](https://eips.ethereum.org/EIPS/eip-777)