---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "En savoir plus sur la mise à niveau du protocole Hegotá"
lang: fr
template: upgrade
---

Hegotá est la mise à niveau du réseau [Ethereum](/) qui devrait suivre [Glamsterdam](/roadmap/glamsterdam/). Son nom provient de la combinaison de « Bogotá » (mise à niveau de la couche d'exécution, nommée d'après un précédent lieu de la Devcon) et de « Heze » (mise à niveau de la couche de consensus, nommée d'après une étoile).

Hegotá en est au début de sa planification. Sa fonctionnalité principale a été choisie et un deuxième changement a depuis été programmé, mais le reste de la portée est encore en cours de décision, et aucune date n'a été fixée.

## Fonctionnalité principale : FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Les listes d'inclusion appliquées par le choix de fork (FOCIL, ou EIP-7805) concernent la [résistance à la censure](/roadmap/security/#censorship-resistance) : s'assurer qu'une transaction valide soit intégrée dans un bloc même si les personnes qui construisent les blocs préféreraient l'omettre.

Aujourd'hui, un seul [validateur](/glossary/#validator) construit chaque bloc et décide des transactions qu'il contient. Quiconque peut influencer suffisamment de constructeurs de blocs peut donc retarder une transaction, et un utilisateur n'a aucun moyen de forcer les choses autrement qu'en attendant et en espérant.

FOCIL répartit cette décision entre de nombreux validateurs. Un comité propose une liste de transactions qui devraient être incluses, et les règles du protocole obligent le constructeur de blocs à respecter ces listes. Censurer une transaction cesse d'être une chose qu'une seule partie peut faire seule.

## Transactions Frame {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Les transactions Frame (EIP-8141) permettent à un [compte](/glossary/#account) de décider par lui-même de ce qui compte comme une transaction valide, au lieu que le protocole n'impose un schéma de signature fixe.

Aujourd'hui, chaque transaction est autorisée de la même manière : une signature, à partir d'une seule clé. Les [comptes de contrats intelligents](/roadmap/account-abstraction/) contournent ce problème en acheminant les transactions via une infrastructure supplémentaire, ce qui coûte du gaz et ajoute des éléments mobiles susceptibles de tomber en panne.

Une transaction Frame déplace la vérification dans le compte lui-même. Le compte exécute sa propre logique de vérification, de sorte que les capacités qui nécessitent actuellement cette infrastructure supplémentaire — la récupération sociale, les limites de dépenses, l'exigence de plusieurs approbations, le fait de laisser quelqu'un d'autre payer le gaz — deviennent des éléments que le protocole prend en charge directement.

Puisque le compte choisit ses propres règles, il peut également choisir un schéma de signature qu'un ordinateur quantique ne pourrait pas casser. Cela en fait une étape vers la [résistance quantique](/roadmap/security/#quantum-resistance) ainsi que vers de meilleurs portefeuilles.

## Quoi d'autre dans Hegotá {#scope}

Ce n'est pas encore décidé. FOCIL et les transactions Frame sont les deux changements programmés jusqu'à présent ; des dizaines d'autres ont été proposés et aucun d'entre eux n'est arrêté. Cette page restera courte jusqu'à ce que la portée se précise — pour l'état actuel de la discussion, consultez les ressources ci-dessous.

## Complément d'information {#further-reading}

- [Forkcast : Hegotá](https://forkcast.org/upgrade/hegota) — statut en direct de chaque proposition
- [Méta-EIP Hegotá (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Spécification technique de l'EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Spécification technique de l'EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Feuille de route d'Ethereum](/roadmap/)
