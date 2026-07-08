---
title: Nommer les contrats intelligents
description: Bonnes pratiques pour nommer les contrats intelligents Ethereum avec l'ENS
lang: fr
---

Les contrats intelligents sont la pierre angulaire de l'infrastructure décentralisée d'Ethereum, permettant des applications et des protocoles autonomes. Mais même si les capacités des contrats évoluent, les utilisateurs et les développeurs s'appuient toujours sur des adresses hexadécimales brutes pour identifier et référencer ces contrats.

Nommer les contrats intelligents avec l'[Ethereum Name Service (ENS)](https://ens.domains/) améliore l'expérience utilisateur en éliminant les adresses de contrats hexadécimales et réduit les risques d'attaques telles que l'empoisonnement d'adresse et l'usurpation d'identité. Ce guide explique pourquoi il est important de nommer les contrats intelligents, comment cela peut être mis en œuvre, et les outils disponibles tels qu'[Enscribe](https://www.enscribe.xyz) pour simplifier le processus et aider les développeurs à adopter cette pratique.

## Pourquoi nommer les contrats intelligents ? {#why-name-contracts}

### Identifiants lisibles par les humains {#human-readable-identifiers}

Au lieu d'interagir avec des adresses de contrats opaques comme `0x8f8e...f9e3`, les développeurs et les utilisateurs peuvent utiliser des noms lisibles par les humains comme `v2.myapp.eth`. Cela simplifie les interactions avec les contrats intelligents.

Cela est rendu possible par l'[Ethereum Name Service](https://ens.domains/) qui fournit un service de nommage décentralisé pour les adresses Ethereum. C'est analogue à la façon dont le Domain Name Service (DNS) permet aux utilisateurs d'Internet d'accéder aux adresses réseau en utilisant un nom tel que ethereum.org au lieu d'une adresse IP telle que `104.18.176.152`.

### Sécurité et confiance améliorées {#improved-security-and-trust}

Les contrats nommés aident à réduire les transactions accidentelles vers la mauvaise adresse. Ils aident également les utilisateurs à identifier les contrats liés à des applications ou des marques spécifiques. Cela ajoute une couche de confiance réputationnelle, en particulier lorsque les noms sont rattachés à des domaines parents bien connus comme `uniswap.eth`.

En raison de la longueur de 42 caractères d'une adresse Ethereum, il est très difficile pour les utilisateurs d'identifier de petits changements dans les adresses, où quelques caractères ont été modifiés. Par exemple, une adresse telle que `0x58068646C148E313CB414E85d2Fe89dDc3426870` serait normalement tronquée en `0x580...870` par les applications destinées aux utilisateurs telles que les portefeuilles. Il est peu probable qu'un utilisateur remarque une adresse malveillante où quelques caractères ont été altérés.

Ce type de technique est employé par les attaques d'usurpation et d'empoisonnement d'adresse où les utilisateurs sont amenés à croire qu'ils interagissent avec ou envoient des fonds à la bonne adresse, alors qu'en fait l'adresse ressemble simplement à la bonne adresse, mais n'est pas la même.

Les noms ENS pour les portefeuilles et les contrats protègent contre ces types d'attaques. Tout comme les attaques d'usurpation DNS, les attaques d'usurpation ENS peuvent également être menées, cependant, un utilisateur est plus susceptible de remarquer une faute d'orthographe dans un nom ENS qu'une petite modification dans une adresse hexadécimale.

### Meilleure expérience utilisateur (UX) pour les portefeuilles et les explorateurs {#better-ux}

Lorsqu'un contrat intelligent a été configuré avec un nom ENS, il est possible pour les applications telles que les portefeuilles et les explorateurs de chaîne de blocs d'afficher les noms ENS pour les contrats intelligents, au lieu des adresses hexadécimales. Cela offre une amélioration significative de l'expérience utilisateur (UX).

Par exemple, lors de l'interaction avec une application telle qu'Uniswap, les utilisateurs verront généralement que l'application avec laquelle ils interagissent est hébergée sur le site Web `uniswap.org`, mais on leur présenterait une adresse de contrat hexadécimale si Uniswap n'avait pas nommé ses contrats intelligents avec l'ENS. Si le contrat est nommé, ils pourraient voir à la place `v4.contracts.uniswap.eth`, ce qui est beaucoup plus utile.

## Nommer lors du déploiement vs après le déploiement {#when-to-name}

Il y a deux moments auxquels les contrats intelligents peuvent être nommés :

- **Au moment du déploiement** : attribuer un nom ENS au contrat lors de son déploiement.
- **Après le déploiement** : associer une adresse de contrat existante à un nouveau nom ENS.

Les deux approches nécessitent d'avoir un accès de propriétaire ou de gestionnaire à un domaine ENS afin de pouvoir créer et définir des enregistrements ENS.

## Comment fonctionne le nommage ENS pour les contrats {#how-ens-naming-works}

Les noms ENS sont stockés onchain et se résolvent en adresses Ethereum via les résolveurs ENS. Pour nommer un contrat intelligent :

1. Enregistrer ou contrôler un domaine ENS parent (par ex. `myapp.eth`)
2. Créer un sous-domaine (par ex. `v1.myapp.eth`)
3. Définir l'enregistrement `address` du sous-domaine sur l'adresse du contrat
4. Définir l'enregistrement inversé du contrat vers l'ENS pour permettre de trouver le nom via son adresse

Les noms ENS sont hiérarchiques et prennent en charge un nombre illimité de sous-noms. La configuration de ces enregistrements implique généralement d'interagir avec le registre ENS et les contrats de résolveurs publics.

## Outils pour nommer les contrats {#tools}

Il existe deux approches pour nommer les contrats intelligents. Soit en utilisant l'[application ENS](https://app.ens.domains) avec quelques étapes manuelles, soit en utilisant [Enscribe](https://www.enscribe.xyz). Celles-ci sont décrites ci-dessous.

### Configuration manuelle de l'ENS {#manual-ens-setup}

En utilisant l'[application ENS](https://app.ens.domains/), les développeurs peuvent créer manuellement des sous-noms et définir des enregistrements d'adresses directs. Cependant, ils ne peuvent pas définir un nom principal pour un contrat intelligent en configurant l'enregistrement inversé pour le nom via l'application ENS. Des étapes manuelles doivent être entreprises, lesquelles sont couvertes dans la [documentation de l'ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) simplifie le nommage des contrats intelligents avec l'ENS et renforce la confiance des utilisateurs dans les contrats intelligents. Il fournit :

- **Déploiement et nommage atomiques** : attribuer un nom ENS lors du déploiement d'un nouveau contrat
- **Nommage après le déploiement** : attacher des noms à des contrats déjà déployés
- **Prise en charge multi-chaînes** : fonctionne sur Ethereum et les réseaux de couche 2 (l2) où l'ENS est pris en charge
- **Données de vérification de contrat** : inclut des données de vérification de contrat extraites de plusieurs sources pour accroître la confiance des utilisateurs

Enscribe prend en charge les noms ENS fournis par les utilisateurs, ou ses propres domaines si l'utilisateur n'a pas de nom ENS.

Vous pouvez accéder à l'[application Enscribe](https://app.enscribe.xyz) pour commencer à nommer et à consulter les contrats intelligents.

## Bonnes pratiques {#best-practices}

- **Utiliser des noms clairs et versionnés** comme `v1.myapp.eth` pour rendre les mises à niveau de contrats transparentes
- **Définir des enregistrements inversés** pour lier les contrats aux noms ENS pour une meilleure visibilité dans les applications telles que les portefeuilles et les explorateurs de chaîne de blocs.
- **Surveiller de près les expirations** si vous souhaitez éviter des changements accidentels de propriété
- **Vérifier la source du contrat** afin que les utilisateurs puissent avoir confiance dans le fait que le contrat nommé se comporte comme prévu

## Risques {#risks}

Nommer les contrats intelligents offre des avantages significatifs pour les utilisateurs d'Ethereum, cependant, les propriétaires de domaines ENS doivent être vigilants quant à leur gestion. Les risques notables incluent :

- **Expiration** : tout comme les noms DNS, les enregistrements de noms ENS ont une durée limitée. Il est donc vital que les propriétaires surveillent les dates d'expiration de leurs domaines et les renouvellent bien avant leur expiration. L'application ENS et Enscribe fournissent toutes deux des indicateurs visuels aux propriétaires de domaines lorsque l'expiration approche.
- **Changement de propriété** : les enregistrements ENS sont représentés sous forme de NFT sur Ethereum, où le propriétaire d'un domaine `.eth` spécifique a le NFT associé en sa possession. Par conséquent, si un compte différent prend possession de ce NFT, le nouveau propriétaire peut modifier n'importe quel enregistrement ENS comme bon lui semble.

Pour atténuer ces risques, le compte propriétaire des domaines de deuxième niveau (2LD) `.eth` doit être sécurisé via un portefeuille multisig, avec des sous-domaines créés pour gérer le nommage des contrats. De cette façon, en cas de changement de propriété accidentel ou malveillant au niveau du sous-domaine, ils peuvent être annulés par le propriétaire du 2LD.

## L'avenir du nommage des contrats {#future}

Le nommage des contrats devient une bonne pratique pour le développement d'applications décentralisées (dapp), de la même manière que les noms de domaine ont remplacé les adresses IP sur le Web. À mesure que davantage d'infrastructures telles que les portefeuilles, les explorateurs et les tableaux de bord intègrent la résolution ENS pour les contrats, les contrats nommés amélioreront la sécurité et réduiront les erreurs dans l'ensemble de l'écosystème.

En rendant les contrats intelligents plus faciles à reconnaître et à comprendre, le nommage aide à combler le fossé entre les utilisateurs et les applications sur Ethereum, améliorant à la fois la sécurité et l'expérience utilisateur (UX) pour les utilisateurs.

## Lectures complémentaires {#further-reading}

- [Nommer les contrats intelligents avec l'ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nommer les contrats intelligents avec Enscribe](https://www.enscribe.xyz/docs).