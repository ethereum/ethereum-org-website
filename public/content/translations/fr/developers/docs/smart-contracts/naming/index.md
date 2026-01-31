---
title: Nommer les contrats intelligents
description: Meilleures pratiques pour nommer les contrats intelligents Ethereum avec ENS
lang: fr
---

Les contrats intelligents sont une pierre angulaire de l'infrastructure décentralisée d'Ethereum, permettant des applications et des protocoles autonomes. Mais même si les capacités des contrats évoluent, les utilisateurs et les développeurs continuent de se fier à des adresses hexadécimales brutes pour identifier et référencer ces contrats.

Nommer les contrats intelligents avec [l'Ethereum Name Service (ENS)](https://ens.domains/) améliore l'expérience utilisateur en éliminant les adresses de contrat hexadécimales et réduit les risques d'attaques telles que l'empoisonnement d'adresse et les attaques par usurpation. Ce guide explique pourquoi il est important de nommer les contrats intelligents, comment mettre en œuvre ce nommage et quels outils sont disponibles, tels que [Enscribe](https://www.enscribe.xyz), pour simplifier le processus et aider les développeurs à adopter cette pratique.

## Pourquoi nommer les contrats intelligents ? {#why-name-contracts}

### Identifiants lisibles par l'homme {#human-readable-identifiers}

Au lieu d'interagir avec des adresses de contrat opaques comme `0x8f8e...f9e3`, les développeurs et les utilisateurs peuvent utiliser des noms lisibles par l'homme comme `v2.myapp.eth`. Cela simplifie les interactions avec les contrats intelligents.

Ceci est rendu possible par le [Service de Noms Ethereum (ENS)](https://ens.domains/) qui fournit un service de nommage décentralisé pour les adresses Ethereum. Ceci est analogue à la façon dont le service de noms de domaine (DNS) permet aux utilisateurs d'Internet d'accéder aux adresses réseau en utilisant un nom tel que ethereum.org au lieu d'une adresse IP telle que `104.18.176.152`.

### Sécurité et confiance améliorées {#improved-security-and-trust}

Les contrats nommés aident à réduire les transactions accidentelles vers la mauvaise adresse. Ils aident également les utilisateurs à identifier les contrats liés à des applications ou à des marques spécifiques. Cela ajoute une couche de confiance basée sur la réputation, surtout lorsque les noms sont attachés à des domaines parents bien connus comme `uniswap.eth`.

En raison de la longueur de 42 caractères des adresses Ethereum, il est très difficile pour les utilisateurs d'identifier de petits changements dans les adresses, où quelques caractères ont été modifiés. Par exemple, une adresse telle que `0x58068646C148E313CB414E85d2Fe89dDc3426870` serait normalement tronquée en `0x580...870` par des applications destinées aux utilisateurs telles que les portefeuilles. Il est peu probable qu'un utilisateur remarque une adresse malveillante où quelques caractères ont été modifiés.

Ce type de technique est utilisé dans les attaques par usurpation et empoisonnement d'adresse où les utilisateurs sont amenés à croire qu'ils interagissent avec ou envoient des fonds à la bonne adresse, alors qu'en fait l'adresse ressemble simplement à la bonne adresse, mais n'est pas la même.

Les noms ENS pour les portefeuilles et les contrats protègent contre ce type d'attaques. Comme les attaques d'usurpation de DNS, les attaques d'usurpation d'ENS peuvent également se produire, cependant, un utilisateur est plus susceptible de remarquer une faute d'orthographe dans un nom ENS qu'une petite modification dans une adresse hexadécimale.

### Meilleure expérience utilisateur pour les portefeuilles et les explorateurs {#better-ux}

Lorsqu'un contrat intelligent a été configuré avec un nom ENS, il est possible pour des applications telles que des portefeuilles et des explorateurs de blockchain d'afficher des noms ENS pour les contrats intelligents, au lieu d'adresses hexadécimales. Cela apporte une amélioration significative de l'expérience utilisateur (UX) pour les utilisateurs.

Par exemple, en interagissant avec une application telle qu'Uniswap, les utilisateurs verront généralement que l'application avec laquelle ils interagissent est hébergée sur le site web `uniswap.org`, mais une adresse de contrat hexadécimale leur serait présentée si Uniswap n'avait pas nommé ses contrats intelligents avec ENS. Si le contrat est nommé, ils pourraient voir à la place `v4.contracts.uniswap.eth`, ce qui est beaucoup plus utile.

## Nommage lors du déploiement ou après le déploiement {#when-to-name}

Il y a deux moments où les contrats intelligents peuvent être nommés :

- **Au moment du déploiement** : attribuer un nom ENS au contrat au fur et à mesure de son déploiement.
- **Après le déploiement** : associer une adresse de contrat existante à un nouveau nom ENS.

Les deux approches reposent sur le fait d'avoir un accès de propriétaire ou de gestionnaire à un domaine ENS afin de pouvoir créer et définir des enregistrements ENS.

## Comment fonctionne le nommage ENS pour les contrats {#how-ens-naming-works}

Les noms ENS sont stockés en chaîne et se résolvent en adresses Ethereum via des résolveurs ENS. Pour nommer un contrat intelligent :

1. Enregistrer ou contrôler un domaine ENS parent (par ex. `myapp.eth`)
2. Créer un sous-domaine (par ex. `v1.myapp.eth`)
3. Définir l'enregistrement d'`adresse` du sous-domaine sur l'adresse du contrat
4. Définir l'enregistrement inversé du contrat sur l'ENS pour permettre de trouver le nom via son adresse

Les noms ENS sont hiérarchiques et prennent en charge un nombre illimité de sous-noms. La définition de ces enregistrements implique généralement une interaction avec le registre ENS et les contrats de résolveur publics.

## Outils pour nommer les contrats {#tools}

Il existe deux approches pour nommer les contrats intelligents. Soit en utilisant l'[application ENS](https://app.ens.domains) avec quelques étapes manuelles, soit en utilisant [Enscribe](https://www.enscribe.xyz). Celles-ci sont décrites ci-dessous.

### Configuration manuelle de l'ENS {#manual-ens-setup}

En utilisant l'[application ENS](https://app.ens.domains), les développeurs peuvent créer manuellement des sous-noms et définir des enregistrements d'adresse directs. Cependant, ils ne peuvent pas définir un nom principal pour un contrat intelligent en définissant l'enregistrement inversé pour le nom via l'application ENS. Des étapes manuelles, qui sont expliquées dans la [documentation ENS](https://docs.ens.domains/web/naming-contracts/), doivent être suivies.

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) simplifie le nommage des contrats intelligents avec ENS et renforce la confiance des utilisateurs dans les contrats intelligents. Il fournit :

- **Déploiement et nommage atomiques** : attribuer un nom ENS lors du déploiement d'un nouveau contrat
- **Nommage post-déploiement** : associer des noms à des contrats déjà déployés
- **Prise en charge multichaîne** : fonctionne sur Ethereum et les réseaux de couche 2 où ENS est pris en charge
- **Données de vérification des contrats** : inclut des données de vérification de contrat extraites de plusieurs sources pour accroître la confiance des utilisateurs

Enscribe prend en charge les noms ENS fournis par les utilisateurs, ou ses propres domaines si l'utilisateur n'a pas de nom ENS.

Vous pouvez accéder à l'[application Enscribe](https://app.enscribe.xyz) pour commencer à nommer et à visualiser les contrats intelligents.

## Bonnes pratiques {#best-practices}

- **Utilisez des noms clairs et versionnés** comme `v1.myapp.eth` pour rendre les mises à niveau de contrat transparentes
- **Définissez les enregistrements inversés** pour lier les contrats aux noms ENS pour une meilleure visibilité dans les applications telles que les portefeuilles et les explorateurs de blockchain.
- **Surveillez attentivement les expirations** si vous voulez éviter les changements de propriété accidentels
- **Vérifiez la source du contrat** afin que les utilisateurs puissent être sûrs que le contrat nommé se comporte comme prévu

## Risques {#risks}

Le nommage des contrats intelligents offre des avantages significatifs aux utilisateurs d'Ethereum, cependant, les propriétaires de domaines ENS doivent être vigilants quant à leur gestion. Les risques notables incluent :

- **Expiration** : tout comme les noms DNS, les enregistrements de noms ENS ont une durée limitée. Il est donc essentiel que les propriétaires surveillent les dates d'expiration de leurs domaines et les renouvellent bien avant leur expiration. L'application ENS et Enscribe fournissent toutes deux des indicateurs visuels aux propriétaires de domaines lorsque l'expiration approche.
- **Changement de propriétaire** : les enregistrements ENS sont représentés sous forme de NFT sur Ethereum, où le propriétaire d'un domaine `.eth` spécifique possède le NFT associé. Par conséquent, si un autre compte prend possession de ce NFT, le nouveau propriétaire peut modifier n'importe quel enregistrement ENS comme il l'entend.

Pour atténuer ces risques, le compte propriétaire des domaines de deuxième niveau (2LD) `.eth` devrait être sécurisé via un portefeuille multisignature, avec des sous-domaines créés pour gérer le nommage des contrats. De cette façon, en cas de changement de propriété accidentel ou malveillant au niveau du sous-domaine, ils peuvent être annulés par le propriétaire du 2LD.

## L'avenir du nommage de contrats {#future}

Le nommage des contrats devient une bonne pratique pour le développement de dapps, de la même manière que les noms de domaine ont remplacé les adresses IP sur le Web. À mesure que de plus en plus d'infrastructures telles que les portefeuilles, les explorateurs et les tableaux de bord intègrent la résolution ENS pour les contrats, les contrats nommés amélioreront la sécurité et réduiront les erreurs dans l'ensemble de l'écosystème.

En rendant les contrats intelligents plus faciles à reconnaître et à comprendre, le nommage aide à combler le fossé entre les utilisateurs et les applications sur Ethereum, améliorant à la fois la sécurité et l'expérience utilisateur (UX) pour les utilisateurs.

## En savoir plus {#further-reading}

- [Nommer les contrats intelligents avec l'ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nommer les contrats intelligents avec Enscribe](https://www.enscribe.xyz/docs).
