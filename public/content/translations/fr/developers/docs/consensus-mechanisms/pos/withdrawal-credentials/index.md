---
title: Identifiants de retrait
description: Une explication des types d'identifiants de retrait de validateur (0x00, 0x01, 0x02) et de leurs implications pour les stakers sur Ethereum.
lang: fr
---

Chaque validateur possède un **identifiant de retrait** qui détermine comment et où ses ETH stakés et ses récompenses peuvent être retirés. Le type d'identifiant est indiqué par le premier octet : `0x00`, `0x01` ou `0x02`. Comprendre ces types est important pour les validateurs qui gèrent leur mise.

## 0x00 : Identifiants pré-Shapella {#0x00-credentials}

Le type `0x00` est le format original d'identifiant de retrait d'avant la mise à jour Shapella (avril 2023). Les validateurs avec ce type d'identifiant n'ont pas d'adresse de retrait définie sur la couche d'exécution, ce qui signifie que leurs fonds restent bloqués sur la couche de consensus. Si vous avez toujours des identifiants `0x00`, vous devez les mettre à niveau vers `0x01` ou `0x02` avant de pouvoir recevoir des retraits.

## 0x01 : Identifiants de retrait historiques {#0x01-credentials}

Le type `0x01` a été introduit avec la mise à jour Shapella et est devenu la norme pour les validateurs qui souhaitaient définir une adresse de retrait sur la couche d'exécution. Avec des identifiants `0x01` :

- Tout solde supérieur à 32 ETH est **automatiquement transféré** vers votre adresse de retrait
- Les sorties complètes passent par la file d'attente de sortie standard
- Les récompenses supérieures à 32 ETH ne peuvent pas se cumuler (intérêts composés) — elles sont périodiquement transférées

**Pourquoi certains validateurs utilisent encore 0x01 :** C'est plus simple et familier. De nombreux validateurs ont effectué des dépôts après Shapella et possèdent déjà ce type, et cela fonctionne très bien pour ceux qui souhaitent des retraits automatiques de leur solde excédentaire.

**Pourquoi ce n'est pas recommandé :** Avec `0x01`, vous perdez la possibilité de cumuler les récompenses au-delà de 32 ETH. Chaque fraction excédentaire est automatiquement transférée, ce qui limite le potentiel de gain de votre validateur et nécessite de gérer les fonds retirés séparément.

## 0x02 : Identifiants de retrait cumulatifs {#0x02-credentials}

Le type `0x02` a été introduit avec la mise à jour Pectra et constitue le **choix recommandé** pour les validateurs aujourd'hui. Les validateurs avec des identifiants `0x02` sont parfois appelés « validateurs cumulatifs ».

Avec des identifiants `0x02` :

- Les récompenses supérieures à 32 ETH **se cumulent** par tranches de 1 ETH jusqu'à un solde effectif maximum de 2048 ETH
- Les retraits partiels doivent être demandés manuellement (les transferts automatiques ne se produisent qu'au-dessus du seuil de 2048 ETH)
- Les validateurs peuvent consolider plusieurs validateurs de 32 ETH en un seul validateur à solde plus élevé
- Les sorties complètes sont toujours prises en charge via la file d'attente de sortie standard

Les retraits partiels et les consolidations peuvent être effectués via les [Actions de validateur du Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Pourquoi les validateurs devraient préférer 0x02 :** Il offre une meilleure efficacité du capital grâce au cumul, plus de contrôle sur le moment où les retraits ont lieu, et prend en charge la consolidation des validateurs. Pour les stakers individuels qui accumulent des récompenses au fil du temps, cela signifie que leur solde effectif — et donc leurs récompenses — peut croître au-delà de 32 ETH sans intervention manuelle.

**Important :** Une fois que vous convertissez de `0x01` à `0x02`, vous ne pouvez pas annuler.

Pour un guide détaillé sur la conversion vers les identifiants de Type 2 et la fonctionnalité MaxEB, consultez la [page explicative sur MaxEB](/roadmap/pectra/maxeb/).

## Que dois-je choisir ? {#what-should-i-pick}

- **Nouveaux validateurs :** Choisissez `0x02`. C'est la norme moderne offrant un meilleur cumul et plus de flexibilité.
- **Validateurs 0x01 existants :** Envisagez de convertir vers `0x02` si vous souhaitez que les récompenses se cumulent au-delà de 32 ETH ou si vous prévoyez de consolider des validateurs.
- **Validateurs 0x00 existants :** Mettez à niveau immédiatement — vous ne pouvez pas effectuer de retrait sans mettre à jour vos identifiants. Vous devez d'abord convertir vers `0x01`, puis vous pourrez convertir vers `0x02`.

## Outils pour gérer les identifiants de retrait {#withdrawal-credential-tools}

Plusieurs outils permettent de choisir ou de convertir entre les types d'identifiants :

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - L'outil officiel pour les dépôts et la gestion des validateurs, y compris les conversions d'identifiants et les consolidations
- **[Pectra Staking Manager](https://pectrastaking.com)** - Interface web avec prise en charge de la connexion de portefeuille pour les conversions et la consolidation
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Outil en ligne de commande pour les conversions par lots
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Outil en ligne de commande pour les opérations Ethereum, y compris la gestion des validateurs

Pour une liste complète des outils de consolidation et des instructions de conversion détaillées, consultez les [outils de consolidation MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Complément d'information {#further-reading}

- [Les clés dans la preuve d'enjeu (PoS) d'Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - En savoir plus sur les clés de validateur et leur lien avec les identifiants de retrait
- [MaxEB](/roadmap/pectra/maxeb/) - Guide détaillé sur la mise à jour Pectra et la fonctionnalité de solde effectif maximum