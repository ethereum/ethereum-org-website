---
title: "Videos hinzufügen"
description: "Die Richtlinie zum Hinzufügen von Videos zu ethereum.org"
lang: de
---

# Videos hinzufügen {#adding-videos}

Die [ethereum.org-Videogalerie](/videos/) präsentiert Videos über Ethereum und das Ethereum-Ökosystem von Community-Erstellern und vertrauenswürdigen Quellen. Jeder kann ein Video vorschlagen, das hinzugefügt werden soll.

## Listungsrichtlinie {#listing-policy}

Ethereum.org ist eine neutrale, lehrreiche Ressource. Die Videogalerie wird kuratiert, um:

- Nutzer über die Ethereum-Technologie, das Ökosystem und die Community **aufzuklären**
- in ihren technischen Inhalten **korrekt zu bleiben**
- für die Ethereum-Community **relevant zu bleiben**

Die Website listet keine Videos auf, die in erster Linie ein bestimmtes Produkt, einen bestimmten Token oder eine kommerzielle Dienstleistung bewerben.


## Aufnahmekriterien {#criteria-for-inclusion}

### Grundvoraussetzungen {#must-haves}

- **Fokus auf Ethereum** – Das Video muss sich in erster Linie um Ethereum, seine Technologie, sein Ökosystem oder seine Community drehen. Videos über allgemeine Blockchain-Themen sind nur dann akzeptabel, wenn sie eine Bildungsseite auf der Website wesentlich unterstützen oder sich darauf beziehen oder Ethereum erwähnen.
- **Pädagogischer Wert** – Das Video sollte den Zuschauern etwas über Ethereum beibringen oder die globale Ethereum-Community feiern. Werbe- oder Marketinginhalte werden nicht akzeptiert.
- **Korrekte Informationen** – Der technische Inhalt muss sachlich richtig und aktuell sein. Veraltete Videos über nicht mehr unterstützte Funktionen können entfernt werden.
- **Produktionsqualität** – Das Video sollte eine angemessen klare Audio- und Videoqualität aufweisen.
- **Öffentlich verfügbar** – Das Video muss auf einer offenen Ressource oder einer zugänglichen Plattform wie YouTube gehostet werden und ohne Paywall oder Anmeldepflicht frei zugänglich sein.

### Wünschenswert {#nice-to-haves}

- **Verfügt über ein Transkript** – Videos mit Transkripten verbessern die Barrierefreiheit und SEO. Wenn Sie keines haben, kann das ethereum.org-Team bei der Erstellung helfen.
- **Von einer glaubwürdigen Quelle** – Inhalte von etablierten Pädagogen, Forschern und Quellen haben Vorrang.
- **Zeitlos und dauerhaft relevant** – Inhalte, die über die Zeit hinweg relevant bleiben, werden gegenüber zeitkritischem Material bevorzugt.


## So fügen Sie ein Video hinzu {#how-to-add-a-video}

### Option 1: Ein Issue eröffnen {#open-an-issue}

Wenn Sie ein Video vorschlagen möchten, aber die Dateien nicht selbst erstellen wollen, eröffnen Sie ein GitHub-Issue mit den Videodetails, und ein Mitwirkender kann Ihnen beim Hinzufügen helfen.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Ein Video vorschlagen
</ButtonLink>

### Option 2: Einen Pull Request erstellen {#open-a-pull-request}

Wenn Sie das Video selbst hinzufügen möchten, befolgen Sie diese Schritte:

#### Schritt 1: Die Videodatei erstellen {#step-1}

Erstellen Sie ein neues Verzeichnis und eine `index.md`-Datei unter:

```
public/content/videos/{ihr-video-slug}/index.md
```

Der Slug sollte URL-sicher und kleingeschrieben sein sowie Bindestriche verwenden (z. B. `blockchain-101-visual-demo`).

#### Schritt 2: Frontmatter hinzufügen {#step-2}

Fügen Sie das folgende YAML-Frontmatter zu Ihrer `index.md` hinzu:

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

Fügen Sie unter dem Frontmatter `---` das Videotranskript im Markdown-Format hinzu:

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

Verwenden Sie `###`-Überschriften mit Zeitstempeln, um wichtige Abschnitte zu markieren. Dies macht das Transkript leicht überfliegbar und verbessert die SEO.

Wenn Sie kein Transkript haben, können Sie den Textkörper leer lassen, und das Team wird eines erstellen.

#### Schritt 4: Themen-Tags auswählen

Wählen Sie Themen-Tags aus der unten stehenden Liste aus. Jedes Tag ist direkt einer Filterkategorie in der Videogalerie zugeordnet – verwenden Sie den Tag-Namen genau wie abgebildet.

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

Jedes Video sollte mindestens ein Tag aus dieser Liste haben. Videos ohne ein erkanntes Tag erscheinen nur in der Ansicht „Alle“ und in den Suchergebnissen.

Das Tag `community-stories` bewirkt außerdem, dass ein Video auf der [Stories-Seite](/stories/) erscheint.
#### Schritt 5: Ihren PR einreichen {#step-5}

Erstellen Sie einen Pull Request mit Ihren Änderungen für den Branch `dev`. Das Team wird Ihre Einreichung überprüfen und Feedback geben.


## Wartung {#maintenance}

Gelistete Videos werden regelmäßig überprüft, um sicherzustellen, dass sie:

- weiterhin die Aufnahmekriterien erfüllen
- korrekte, aktuelle Informationen enthalten
- über funktionierende Hosting-/YouTube-Links verfügen

Wenn Ihnen ein Problem mit einem gelisteten Video auffällt, [erstellen Sie ein Issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) oder senden Sie eine E-Mail an [website@ethereum.org](mailto:website@ethereum.org).


## Nutzungsbedingungen {#terms-of-use}

Bitte beachten Sie die [Nutzungsbedingungen](/terms-of-use/) von ethereum.org. Die Informationen auf ethereum.org werden ausschließlich zu allgemeinen Informationszwecken bereitgestellt.
