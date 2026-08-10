---
title: "Videos hinzufügen"
description: "Die Richtlinie zum Hinzufügen von Videos zu ethereum.org"
lang: de
---

Die [ethereum.org-Videogalerie](/videos/) bietet Videos über Ethereum und das Ethereum-Ökosystem von Community-Erstellern und vertrauenswürdigen Quellen. Jeder kann ein Video vorschlagen, das hinzugefügt werden soll.

## Listungsrichtlinie {#listing-policy}

Ethereum.org ist eine neutrale, lehrreiche Ressource. Die Videogalerie wird kuratiert, um:

- Nutzer über die Ethereum-Technologie, das Ökosystem und die Community **aufzuklären**
- In ihren technischen Inhalten **präzise zu bleiben**
- Für die Ethereum-Community **relevant zu bleiben**

Die Website listet keine Videos auf, die in erster Linie ein bestimmtes Produkt, einen bestimmten Token oder eine kommerzielle Dienstleistung bewerben.

## Aufnahmekriterien {#criteria-for-inclusion}

### Muss-Kriterien {#must-haves}

- **Fokus auf Ethereum** – Das Video muss sich in erster Linie um Ethereum, seine Technologie, sein Ökosystem oder seine Community drehen. Videos über allgemeine Blockchain-Themen sind nur dann akzeptabel, wenn sie eine Bildungsseite auf der Website wesentlich unterstützen oder sich darauf beziehen oder auf Ethereum verweisen.
- **Pädagogischer Wert** – Das Video sollte den Zuschauern etwas über Ethereum beibringen oder die globale Ethereum-Community feiern. Werbe- oder Marketinginhalte werden nicht akzeptiert.
- **Genaue Informationen** – Der technische Inhalt muss sachlich richtig und aktuell sein. Veraltete Videos über nicht mehr unterstützte Funktionen können entfernt werden.
- **Produktionsqualität** – Das Video sollte eine angemessen klare Audio- und Videoqualität aufweisen.
- **Öffentlich verfügbar** – Das Video muss auf einer offenen Ressource oder einer zugänglichen Plattform wie YouTube gehostet werden und ohne Paywall oder Anmeldeanforderung frei zugänglich sein.

### Wünschenswert {#nice-to-haves}

- **Hat ein Transkript** – Videos mit Transkripten verbessern die Barrierefreiheit und SEO. Wenn du keines hast, kann das ethereum.org-Team bei der Erstellung helfen.
- **Aus einer glaubwürdigen Quelle** – Inhalte von etablierten Pädagogen, Forschern und Quellen haben Vorrang.
- **Zeitgemäß und zeitlos** – Inhalte, die über die Zeit hinweg relevant bleiben, werden gegenüber zeitkritischem Material bevorzugt.

## So fügst du ein Video hinzu {#how-to-add-a-video}

### Option 1: Ein Issue eröffnen {#open-an-issue}

Wenn du ein Video vorschlagen möchtest, aber die Dateien nicht selbst erstellen willst, eröffne ein GitHub-Issue mit den Videodetails und ein Mitwirkender kann dir beim Hinzufügen helfen.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Ein Video vorschlagen
</ButtonLink>

### Option 2: Einen Pull Request eröffnen {#open-a-pull-request}

Wenn du das Video selbst hinzufügen möchtest, befolge diese Schritte:

#### Schritt 1: Die Videodatei erstellen {#step-1}

Erstelle ein neues Verzeichnis und eine `index.md`-Datei unter:

```
public/content/videos/{dein-video-slug}/index.md
```

Der Slug sollte URL-sicher und kleingeschrieben sein sowie Bindestriche verwenden (z. B. `blockchain-101-visual-demo`).

#### Schritt 2: Frontmatter hinzufügen {#step-2}

Füge das folgende YAML-Frontmatter zu deiner `index.md` hinzu:

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

**Feldreferenz:**

| Feld | Erforderlich | Beschreibung |
|---|---|---|
| `title` | Ja | Videotitel |
| `description` | Ja | Zusammenfassung in 1–3 Sätzen |
| `lang` | Ja | Vorerst immer `en` |
| `youtubeId` | Ja | Die YouTube-Video-ID (aus der URL nach `v=`) |
| `uploadDate` | Ja | Ursprüngliches Upload-Datum im Format `YYYY-MM-DD` |
| `duration` | Ja | Videolänge als `H:MM:SS` oder `M:SS` |
| `educationLevel` | Ja | `beginner`, `intermediate` oder `advanced` |
| `topic` | Ja | Array von Themen-Tags für die Galeriefilterung |
| `format` | Ja | `explainer`, `presentation`, `interview`, `tutorial` oder `panel` |
| `author` | Ja | Name des Erstellers oder Kanals |
| `breadcrumb` | Nein | Benutzerdefiniertes kurzes Label für die Breadcrumb-Navigation |
| `customThumbnailUrl` | Nein | Benutzerdefinierte Thumbnail-URL (standardmäßig das YouTube-Thumbnail) |

#### Schritt 3: Ein Transkript hinzufügen (empfohlen) {#step-3}

Füge unter dem Frontmatter `---` das Videotranskript im Markdown-Format hinzu:

```markdown
---
title: "..."
# ... restliches Frontmatter
---

Eine kurze Einführung in den Videoinhalt.

### Abschnittstitel (0:00)

Transkripttext für diesen Abschnitt...

### Nächster Abschnitt (5:30)

Weiterer Transkripttext...
```

Verwende `###`-Überschriften mit Zeitstempeln, um wichtige Abschnitte zu markieren. Dies macht das Transkript überschaubar und verbessert die SEO.

Wenn du kein Transkript hast, kannst du den Textkörper leer lassen und das Team wird eines erstellen.

#### Schritt 4: Themen-Tags auswählen {#step-4}

Wähle Themen-Tags aus der folgenden Liste aus. Jeder Tag ist direkt einer Filterkategorie in der Videogalerie zugeordnet – verwende den Tag-Namen genau wie abgebildet.

Ein Video kann mehrere Tags haben, um in mehreren Galeriefiltern zu erscheinen:

| Tag | Galeriefilter |
|---|---|
| `how-ethereum-works` | Wie Ethereum funktioniert |
| `network-upgrades` | Netzwerk-Upgrades |
| `roadmap-and-priorities` | Roadmap & Prioritäten |
| `scaling-and-layer-2` | Skalierung & Layer 2 |
| `use-cases` | Anwendungsfälle |
| `privacy` | Privatsphäre |
| `security` | Sicherheit |
| `community-stories` | Community-Geschichten |
| `events` | Ereignisse |

Jedes Video sollte mindestens einen Tag aus dieser Liste haben. Videos ohne einen erkannten Tag erscheinen nur in der Ansicht „Alle“ und in den Suchergebnissen.

Der Tag `community-stories` bewirkt auch, dass ein Video auf der [Geschichten-Seite](/stories/) erscheint.

#### Schritt 5: Deinen PR einreichen {#step-5}

Eröffne einen Pull Request mit deinen Änderungen am `dev`-Branch. Das Team wird deine Einreichung überprüfen und Feedback geben.

## Wartung {#maintenance}

Gelistete Videos werden routinemäßig überprüft, um sicherzustellen, dass sie:

- Weiterhin die Aufnahmekriterien erfüllen
- Genaue, aktuelle Informationen enthalten
- Funktionierende Hosting-/YouTube-Links haben

Wenn dir ein Problem mit einem gelisteten Video auffällt, [erstelle ein Issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) oder sende eine E-Mail an [website@ethereum.org](mailto:website@ethereum.org).

## Nutzungsbedingungen {#terms-of-use}

Bitte beachte die [Nutzungsbedingungen](/terms-of-use/) von ethereum.org. Die Informationen auf ethereum.org werden ausschließlich zu allgemeinen Informationszwecken bereitgestellt.