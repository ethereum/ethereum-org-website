---
title: "Ajouter des vidéos"
description: "La politique d'ajout de vidéos sur ethereum.org"
lang: fr
---

# Ajouter des vidéos {#adding-videos}

La [galerie vidéo d'ethereum.org](/videos/) propose des vidéos sur Ethereum et l'écosystème Ethereum provenant de créateurs de la communauté et de sources de confiance. Tout le monde peut suggérer l'ajout d'une vidéo.

## Politique de référencement {#listing-policy}

Ethereum.org est une ressource éducative et neutre. La galerie vidéo est organisée pour :

- **Éduquer** les utilisateurs sur la technologie, l'écosystème et la communauté Ethereum
- **Rester précis** dans son contenu technique
- **Rester pertinent** pour la communauté Ethereum

Le site ne répertorie pas les vidéos qui font principalement la promotion d'un produit spécifique, d'un jeton ou d'un service commercial.

## Critères d'inclusion {#criteria-for-inclusion}

### Indispensables {#must-haves}

- **Axé sur Ethereum** – La vidéo doit porter principalement sur Ethereum, sa technologie, son écosystème ou sa communauté. Les vidéos sur des sujets généraux liés à la chaîne de blocs ne sont acceptables que si elles soutiennent ou se rapportent de manière substantielle à une page éducative du site, ou si elles font référence à Ethereum.
- **Valeur éducative** – La vidéo doit apprendre quelque chose aux spectateurs sur Ethereum, ou célébrer la communauté mondiale d'Ethereum. Le contenu promotionnel ou marketing ne sera pas accepté.
- **Informations précises** – Le contenu technique doit être factuellement correct et à jour. Les vidéos obsolètes sur des fonctionnalités abandonnées peuvent être supprimées.
- **Production de qualité** – La vidéo doit avoir une qualité audio et vidéo raisonnablement claire.
- **Accessible publiquement** – La vidéo doit être hébergée sur une ressource ouverte ou une plateforme accessible comme YouTube, et être librement accessible sans péage (paywall) ni obligation d'inscription.

### Souhaitables {#nice-to-haves}

- **Possède une transcription** – Les vidéos avec des transcriptions améliorent l'accessibilité et le référencement (SEO). Si vous n'en avez pas, l'équipe d'ethereum.org peut vous aider à en générer une.
- **Provient d'une source crédible** – Le contenu provenant d'éducateurs, de chercheurs et de sources établis est prioritaire.
- **Intemporel et toujours d'actualité** – Le contenu qui reste pertinent au fil du temps est préféré au matériel sensible au temps.

## Comment ajouter une vidéo {#how-to-add-a-video}

### Option 1 : Ouvrir un ticket (issue) {#open-an-issue}

Si vous souhaitez suggérer une vidéo mais que vous ne voulez pas créer les fichiers vous-même, ouvrez un ticket (issue) GitHub avec les détails de la vidéo et un contributeur pourra vous aider à l'ajouter.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Suggérer une vidéo
</ButtonLink>

### Option 2 : Ouvrir une demande d'extraction (pull request) {#open-a-pull-request}

Si vous souhaitez ajouter la vidéo vous-même, suivez ces étapes :

#### Étape 1 : Créer le fichier vidéo {#step-1}

Créez un nouveau répertoire et un fichier `index.md` à l'emplacement suivant :

```
public/content/videos/{votre-slug-de-video}/index.md
```

Le slug doit être compatible avec les URL, en minuscules et utiliser des tirets (par exemple, `blockchain-101-visual-demo`).

#### Étape 2 : Ajouter le frontmatter {#step-2}

Ajoutez le frontmatter YAML suivant à votre `index.md` :

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Référence des champs :**

| Champ | Requis | Description |
|---|---|---|
| `title` | Oui | Titre de la vidéo |
| `description` | Oui | Résumé de 1 à 3 phrases |
| `lang` | Oui | Toujours `en` pour le moment |
| `youtubeId` | Oui | L'ID de la vidéo YouTube (depuis l'URL après `v=`) |
| `uploadDate` | Oui | Date de mise en ligne originale au format `YYYY-MM-DD` |
| `duration` | Oui | Durée de la vidéo sous la forme `H:MM:SS` ou `M:SS` |
| `educationLevel` | Oui | `beginner`, `intermediate` ou `advanced` |
| `topic` | Oui | Tableau de balises thématiques pour le filtrage de la galerie |
| `format` | Oui | `explainer`, `presentation`, `interview`, `tutorial` ou `panel` |
| `author` | Oui | Nom du créateur ou de la chaîne |
| `breadcrumb` | Non | Libellé court personnalisé pour la navigation par fil d'Ariane |
| `customThumbnailUrl` | Non | URL de la miniature personnalisée (par défaut, la miniature YouTube) |

#### Étape 3 : Ajouter une transcription (recommandé) {#step-3}

Sous le frontmatter `---`, ajoutez la transcription de la vidéo au format markdown :

```markdown
---
title: "..."
# ... reste du frontmatter
---

Une brève introduction au contenu de la vidéo.

### Titre de la section (0:00)

Texte de la transcription pour cette section...

### Section suivante (5:30)

Suite du texte de la transcription...
```

Utilisez des titres `###` avec des horodatages pour marquer les sections principales. Cela rend la transcription facile à parcourir et améliore le référencement (SEO).

Si vous n'avez pas de transcription, vous pouvez laisser le corps vide et l'équipe en générera une.

#### Étape 4 : Choisir les balises thématiques {#step-4}

Choisissez des balises thématiques qui correspondent aux catégories existantes utilisées dans la galerie. Les catégories actuelles et leurs balises incluent :

- **Comment fonctionne Ethereum** : `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Mises à niveau du réseau** : `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Feuille de route et priorités** : `roadmap-and-priorities`, `pbs`, `mev`
- **Mise à l'échelle et couche 2 (l2)** : `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Cas d'utilisation** : `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Confidentialité et sécurité** : `privacy-and-security`, `privacy`, `authentication`
- **Histoires de la communauté** : `community-stories`, `contributing`, `translations`, `community`

Pour vous assurer que votre vidéo apparaisse dans une section de catégorie de la galerie, incluez au moins une balise clé de catégorie (le nom en gras en kebab-case, par exemple `use-cases` ou `scaling-and-layer-2`). Les vidéos sans balise de catégorie reconnue n'apparaîtront que dans la vue « Toutes » et dans les résultats de recherche.

Vous pouvez également utiliser de nouvelles balises — elles seront disponibles pour de futurs regroupements de catégories.

#### Étape 5 : Soumettre votre PR {#step-5}

Ouvrez une demande d'extraction (pull request) avec vos modifications vers la branche `dev`. L'équipe examinera votre soumission et vous fera part de ses commentaires.

## Maintenance {#maintenance}

Les vidéos répertoriées sont régulièrement examinées pour s'assurer qu'elles :

- Répondent toujours aux critères de référencement
- Contiennent des informations précises et à jour
- Ont des liens d'hébergement/YouTube fonctionnels

Si vous remarquez un problème avec une vidéo répertoriée, [créez un ticket (issue)](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) ou envoyez un e-mail à [website@ethereum.org](mailto:website@ethereum.org).

## Conditions d'utilisation {#terms-of-use}

Veuillez vous référer aux [conditions d'utilisation](/terms-of-use/) d'ethereum.org. Les informations sur ethereum.org sont fournies uniquement à des fins d'information générale.