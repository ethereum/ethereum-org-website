---
title: Ajouter des articles
description: Lignes directrices pour contribuer des articles de constructeurs à ethereum.org
lang: fr
---

## Publier un article de constructeur {#publishing-a-builder-article}

Les articles de constructeurs apparaissent sur [ethereum.org/latest/](/latest/) et sont rédigés sous forme de fichiers Markdown dans le dépôt. Ce sont des articles longs, hébergés en interne, qui couvrent des aperçus et des guides sur l'écosystème Ethereum, le paysage technologique open-source, ainsi que des mises à jour opportunes pour les constructeurs et les chercheurs, couvrant des sujets tels que les mises à jour du protocole, les nouveaux modèles d'outils, les déploiements de référence, et plus encore.

### Politique de référencement {#listing-policy}

Ethereum.org est une ressource éducative neutre. La section « Latest » est organisée pour :

- **Éduquer** les constructeurs et la communauté au sens large sur la technologie Ethereum, l'écosystème open-source et les développements récents
- **Rester précis** dans son contenu technique et ses références
- **Rester pertinent** pour la communauté des constructeurs Ethereum

Le site ne répertorie pas les articles qui font principalement la promotion d'un produit spécifique, d'un jeton ou d'un service commercial. Toutes les soumissions sont examinées par l'équipe d'ethereum.org avant publication.

### Critères d'inclusion {#criteria-for-inclusion}

#### Indispensables {#must-haves}

- **Axé sur Ethereum et l'open-source** - L'article doit porter principalement sur Ethereum, son protocole, ses outils ou son écosystème de constructeurs, ou sur les technologies open-source et de sanctuaire qui le soutiennent. Le contenu sur des sujets généraux liés à la chaîne de blocs ou au Web3 qui ne fait pas référence de manière substantielle à Ethereum ou à son paysage open-source ne sera pas accepté.
- **Valeur éducative ou de vue d'ensemble** - L'article doit enseigner aux constructeurs quelque chose d'exploitable (par exemple, comment utiliser une nouvelle EIP, comment évaluer un choix architectural, comment déployer ou contribuer à une infrastructure open-source) ou fournir une perspective significative sur l'état d'Ethereum et de l'écosystème open-source qui l'entoure. Le contenu promotionnel pour des produits spécifiques, des jetons ou des services commerciaux n'est pas accepté.
- **Informations précises** - Les affirmations techniques doivent être factuellement correctes et à jour. Citez les EIP, les annonces officielles ou les données onchain dans la mesure du possible.
- **Travail original** - Le contenu doit être original ou utilisé avec permission. Voir la [politique sur le plagiat](/contributing/#plagiarism).
- **Langue** - Les articles peuvent être soumis dans n'importe quelle [langue prise en charge](/contributing/translation-program/). Définissez le champ `lang` pour qu'il corresponde à la langue dans laquelle l'article est écrit (par exemple, `en` pour l'anglais, `es` pour l'espagnol). Une fois l'article soumis, les soumissions en anglais peuvent être traduites dans d'autres langues, et les soumissions dans d'autres langues peuvent être traduites en anglais.

#### Souhaitables {#nice-to-haves}

- **Opportun et intemporel** - Le contenu qui reste utile au-delà de sa date de publication est préféré au contenu purement éphémère.
- **Crédibilité de l'auteur** - Les articles de constructeurs établis, de chercheurs ou de contributeurs alignés sur CROPS sont prioritaires.
- **Lectures complémentaires** - Incluez une section `## Further reading` avec des liens vers les EIP pertinents, la documentation et les sources primaires.

### Proposer un article de constructeur {#propose-a-builder-article}

Si vous souhaitez écrire un article de constructeur pour ethereum.org et qu'il répond aux critères, créez un ticket sur GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  Suggérer un article
</ButtonLink>