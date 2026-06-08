---
title: "Dodawanie filmów"
description: "Zasady dodawania filmów na ethereum.org"
lang: pl
---

# Dodawanie filmów {#adding-videos}

[Galeria wideo ethereum.org](/videos/) zawiera filmy o Ethereum i ekosystemie Ethereum od twórców ze społeczności oraz zaufanych źródeł. Każdy może zaproponować film do dodania.

## Zasady umieszczania {#listing-policy}

Ethereum.org to neutralne, edukacyjne źródło informacji. Galeria wideo jest moderowana, aby:

- **Edukować** użytkowników na temat technologii, ekosystemu i społeczności Ethereum
- **Zachować dokładność** w treściach technicznych
- **Pozostać aktualną** dla społeczności Ethereum

Strona nie umieszcza filmów, które w głównej mierze promują konkretny produkt, token lub usługę komercyjną.


## Kryteria dodania
## Kryteria włączenia {#criteria-for-inclusion}

### Wymagania konieczne {#must-haves}

- **Skupienie na Ethereum** – Film musi dotyczyć przede wszystkim Ethereum, jego technologii, ekosystemu lub społeczności. Filmy na ogólne tematy związane z technologią blockchain są akceptowalne tylko wtedy, gdy w znacznym stopniu wspierają lub odnoszą się do strony edukacyjnej w witrynie, lub nawiązują do Ethereum.
- **Wartość edukacyjna** – Film powinien uczyć widzów czegoś o Ethereum lub celebrować globalną społeczność Ethereum. Treści promocyjne lub marketingowe nie będą akceptowane.
- **Dokładne informacje** – Treść techniczna musi być poprawna merytorycznie i aktualna. Przestarzałe filmy o wycofanych funkcjach mogą zostać usunięte.
- **Jakość produkcji** – Film powinien mieć w miarę wyraźną jakość dźwięku i obrazu.
- **Publiczna dostępność** – Film musi być hostowany na otwartym zasobie lub dostępnej platformie, takiej jak YouTube, i być swobodnie dostępny bez paywalla lub wymogu rejestracji.

### Mile widziane {#nice-to-haves}

- **Posiada transkrypcję** – Filmy z transkrypcjami poprawiają dostępność i SEO. Jeśli jej nie masz, zespół ethereum.org może pomóc w jej wygenerowaniu.
- **Pochodzi z wiarygodnego źródła** – Treści od uznanych edukatorów, badaczy i źródeł mają priorytet.
- **Aktualne i ponadczasowe** – Treści, które pozostają aktualne z biegiem czasu, są preferowane w stosunku do materiałów szybko tracących na ważności.


## Jak dodać film
## Jak dodać film {#how-to-add-a-video}

### Opcja 1: Otwórz zgłoszenie (issue) {#open-an-issue}

Jeśli chcesz zaproponować film, ale nie chcesz samodzielnie tworzyć plików, otwórz zgłoszenie (issue) na GitHubie ze szczegółami filmu, a współtwórca pomoże Ci go dodać.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Zaproponuj film
</ButtonLink>

### Opcja 2: Otwórz pull request {#open-a-pull-request}

Jeśli chcesz samodzielnie dodać film, wykonaj następujące kroki:

#### Krok 1: Utwórz plik wideo {#step-1}

Utwórz nowy katalog i plik `index.md` w:

```
public/content/videos/{twoj-slug-wideo}/index.md
```

Slug powinien być bezpieczny dla adresów URL, pisany małymi literami i zawierać myślniki (np. `blockchain-101-visual-demo`).

#### Krok 2: Dodaj frontmatter {#step-2}

Dodaj następujący frontmatter w formacie YAML do swojego pliku `index.md`:

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

**Odniesienie do pól:**

| Pole | Wymagane | Opis |
|---|---|---|
| `title` | Tak | Tytuł filmu |
| `description` | Tak | Podsumowanie na 1–3 zdania |
| `lang` | Tak | Na razie zawsze `en` |
| `youtubeId` | Tak | ID filmu na YouTube (z adresu URL po `v=`) |
| `uploadDate` | Tak | Oryginalna data przesłania w formacie `YYYY-MM-DD` |
| `duration` | Tak | Długość filmu jako `H:MM:SS` lub `M:SS` |
| `educationLevel` | Tak | `beginner`, `intermediate` lub `advanced` |
| `topic` | Tak | Tablica tagów tematycznych do filtrowania galerii |
| `format` | Tak | `explainer`, `presentation`, `interview`, `tutorial` lub `panel` |
| `author` | Tak | Nazwa twórcy lub kanału |
| `breadcrumb` | Nie | Niestandardowa krótka etykieta do nawigacji okruszkowej (breadcrumb) |
| `customThumbnailUrl` | Nie | Niestandardowy adres URL miniatury (domyślnie miniatura z YouTube) |

#### Krok 3: Dodaj transkrypcję (zalecane) {#step-3}

Poniżej frontmattera `---` dodaj transkrypcję filmu w formacie markdown:

```markdown
---
title: "..."
# ... reszta frontmattera
---

Krótkie wprowadzenie do treści filmu.

### Tytuł sekcji (0:00)

Tekst transkrypcji dla tej sekcji...

### Następna sekcja (5:30)

Więcej tekstu transkrypcji...
```

Użyj nagłówków `###` ze znacznikami czasu, aby oznaczyć główne sekcje. Dzięki temu transkrypcja jest bardziej czytelna i poprawia SEO.

Jeśli nie masz transkrypcji, możesz zostawić treść pustą, a zespół ją wygeneruje.

#### Krok 4: Wybierz tagi tematyczne {#step-4}

Wybierz tagi tematyczne, które pasują do istniejących kategorii używanych w galerii. Obecne kategorie i ich tagi to:

- **Jak działa Ethereum**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Aktualizacje sieci**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Mapa drogowa i priorytety**: `roadmap-and-priorities`, `pbs`, `mev`
- **Skalowanie i warstwa 2 (L2)**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Przypadki użycia**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Prywatność i bezpieczeństwo**: `privacy-and-security`, `privacy`, `authentication`
- **Historie społeczności**: `community-stories`, `contributing`, `translations`, `community`

Aby upewnić się, że Twój film pojawi się w sekcji kategorii galerii, dołącz co najmniej jeden kluczowy tag kategorii (pogrubiona nazwa w formacie kebab-case, np. `use-cases` lub `scaling-and-layer-2`). Filmy bez rozpoznanego tagu kategorii pojawią się tylko w widoku „Wszystkie” i w wynikach wyszukiwania.

Możesz również użyć nowych tagów — będą one dostępne dla przyszłych grup kategorii.

#### Krok 5: Prześlij swój PR {#step-5}

Otwórz pull request ze swoimi zmianami do gałęzi `dev`. Zespół przejrzy Twoje zgłoszenie i przekaże opinię.


## Utrzymanie
Opublikowane filmy są regularnie sprawdzane, aby upewnić się, że:

- Nadal spełniają kryteria dodania
- Zawierają dokładne, aktualne informacje
- Mają działające linki do hostingu/YouTube

Jeśli zauważysz problem z opublikowanym filmem, [utwórz zgłoszenie (issue)](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) lub wyślij e-mail na adres [website@ethereum.org](mailto:website@ethereum.org).
## Utrzymanie {#maintenance}

Umieszczone filmy są rutynowo sprawdzane, aby upewnić się, że:

- Nadal spełniają kryteria umieszczania
- Zawierają dokładne, aktualne informacje
- Mają działające linki do hostingu/YouTube

Jeśli zauważysz problem z umieszczonym filmem, [utwórz zgłoszenie (issue)](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) lub wyślij e-mail na adres [website@ethereum.org](mailto:website@ethereum.org).


## Warunki użytkowania
Zapoznaj się z [warunkami użytkowania](/terms-of-use/) ethereum.org. Informacje na stronie ethereum.org są udostępniane wyłącznie w ogólnych celach informacyjnych.
## Warunki użytkowania {#terms-of-use}

Zapoznaj się z [warunkami użytkowania](/terms-of-use/) ethereum.org. Informacje na ethereum.org są udostępniane wyłącznie w ogólnych celach informacyjnych.
