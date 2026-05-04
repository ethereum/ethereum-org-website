---
title: Aggiungere video
description: La politica per l'aggiunta di video su ethereum.org
lang: it
---

# Aggiungere video {#adding-videos}

La [galleria video di ethereum.org](/videos/) presenta video su Ethereum e sull'ecosistema di Ethereum da parte di creatori della community e fonti affidabili. Chiunque può suggerire l'aggiunta di un video.

## Politica di inserimento {#listing-policy}

Ethereum.org è una risorsa educativa e neutrale. La galleria video è curata per:

- **Educare** gli utenti sulla tecnologia, l'ecosistema e la community di Ethereum
- **Rimanere accurata** nei suoi contenuti tecnici
- **Rimanere pertinente** per la community di Ethereum

Il sito non elenca video che promuovono principalmente un prodotto specifico, un token o un servizio commerciale.

## Criteri di inclusione {#criteria-for-inclusion}

### Requisiti fondamentali {#must-haves}

- **Incentrato su Ethereum** – Il video deve riguardare principalmente Ethereum, la sua tecnologia, il suo ecosistema o la sua community. I video su argomenti generali della blockchain sono accettabili solo se supportano o si riferiscono in modo sostanziale a una pagina educativa del sito, o se fanno riferimento a Ethereum.
- **Valore educativo** – Il video dovrebbe insegnare agli spettatori qualcosa su Ethereum o celebrare la community globale di Ethereum. I contenuti promozionali o di marketing non saranno accettati.
- **Informazioni accurate** – Il contenuto tecnico deve essere corretto nei fatti e aggiornato. I video obsoleti su funzionalità deprecate potrebbero essere rimossi.
- **Produzione di qualità** – Il video dovrebbe avere una qualità audio e video ragionevolmente chiara.
- **Disponibile pubblicamente** – Il video deve essere ospitato su una risorsa aperta o su una piattaforma accessibile come YouTube, ed essere liberamente accessibile senza paywall o requisiti di registrazione.

### Caratteristiche gradite {#nice-to-haves}

- **Presenza di una trascrizione** – I video con trascrizioni migliorano l'accessibilità e la SEO. Se non ne hai una, il team di ethereum.org può aiutarti a generarla.
- **Da una fonte credibile** – I contenuti provenienti da educatori, ricercatori e fonti affermate hanno la priorità.
- **Attuale e sempreverde** – I contenuti che rimangono pertinenti nel tempo sono preferiti rispetto al materiale sensibile al fattore tempo.

## Come aggiungere un video {#how-to-add-a-video}

### Opzione 1: Aprire una issue {#open-an-issue}

Se desideri suggerire un video ma non vuoi creare i file tu stesso, apri una issue su GitHub con i dettagli del video e un collaboratore potrà aiutarti ad aggiungerlo.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Suggerisci un video
</ButtonLink>

### Opzione 2: Aprire una pull request {#open-a-pull-request}

Se desideri aggiungere il video tu stesso, segui questi passaggi:

#### Passaggio 1: Creare il file del video {#step-1}

Crea una nuova directory e un file `index.md` in:

```
public/content/videos/{slug-del-tuo-video}/index.md
```

Lo slug dovrebbe essere sicuro per gli URL, in minuscolo e utilizzare i trattini (es. `blockchain-101-visual-demo`).

#### Passaggio 2: Aggiungere il frontmatter {#step-2}

Aggiungi il seguente frontmatter YAML al tuo `index.md`:

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

**Riferimento dei campi:**

| Campo | Obbligatorio | Descrizione |
|---|---|---|
| `title` | Sì | Titolo del video |
| `description` | Sì | Riepilogo di 1-3 frasi |
| `lang` | Sì | Sempre `en` per ora |
| `youtubeId` | Sì | L'ID del video di YouTube (dall'URL dopo `v=`) |
| `uploadDate` | Sì | Data di caricamento originale nel formato `YYYY-MM-DD` |
| `duration` | Sì | Durata del video come `H:MM:SS` o `M:SS` |
| `educationLevel` | Sì | `beginner`, `intermediate` o `advanced` |
| `topic` | Sì | Array di tag di argomenti per il filtraggio della galleria |
| `format` | Sì | `explainer`, `presentation`, `interview`, `tutorial` o `panel` |
| `author` | Sì | Nome del creatore o del canale |
| `breadcrumb` | No | Etichetta breve personalizzata per la navigazione breadcrumb |
| `customThumbnailUrl` | No | URL della miniatura personalizzata (per impostazione predefinita è la miniatura di YouTube) |

#### Passaggio 3: Aggiungere una trascrizione (consigliato) {#step-3}

Sotto i `---` del frontmatter, aggiungi la trascrizione del video in formato markdown:

```markdown
---
title: "..."
# ... resto del frontmatter
---

Una breve introduzione al contenuto del video.

### Titolo della sezione (0:00)

Testo della trascrizione per questa sezione...

### Sezione successiva (5:30)

Altro testo della trascrizione...
```

Usa le intestazioni `###` con i timestamp per contrassegnare le sezioni principali. Questo rende la trascrizione facilmente scansionabile e migliora la SEO.

Se non hai una trascrizione, puoi lasciare il corpo vuoto e il team ne genererà una.

#### Passaggio 4: Scegliere i tag degli argomenti {#step-4}

Scegli i tag degli argomenti che corrispondono alle categorie esistenti utilizzate nella galleria. Le categorie attuali e i relativi tag includono:

- **Come funziona Ethereum**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Aggiornamenti della rete**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Roadmap e priorità**: `roadmap-and-priorities`, `pbs`, `mev`
- **Scalabilità e layer 2**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Casi d'uso**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Privacy e sicurezza**: `privacy-and-security`, `privacy`, `authentication`
- **Storie della community**: `community-stories`, `contributing`, `translations`, `community`

Per assicurarti che il tuo video appaia in uno scaffale di categoria della galleria, includi almeno un tag chiave di categoria (il nome in grassetto in kebab-case, es. `use-cases` o `scaling-and-layer-2`). I video senza un tag di categoria riconosciuto appariranno solo nella vista "Tutti" e nei risultati di ricerca.

Puoi anche utilizzare nuovi tag: saranno disponibili per futuri raggruppamenti di categorie.

#### Passaggio 5: Inviare la PR {#step-5}

Apri una pull request con le tue modifiche al branch `dev`. Il team esaminerà la tua richiesta e fornirà un feedback.

## Manutenzione {#maintenance}

I video elencati vengono regolarmente revisionati per garantire che:

- Soddisfino ancora i criteri di inserimento
- Contengano informazioni accurate e aggiornate
- Abbiano link di hosting/YouTube funzionanti

Se noti un problema con un video elencato, [crea una issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) o invia un'email a [website@ethereum.org](mailto:website@ethereum.org).

## Termini di utilizzo {#terms-of-use}

Fai riferimento ai [termini di utilizzo](/terms-of-use/) di ethereum.org. Le informazioni su ethereum.org sono fornite esclusivamente a scopo informativo generale.