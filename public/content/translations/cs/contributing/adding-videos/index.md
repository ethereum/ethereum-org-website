---
title: "Přidávání videí"
description: "Zásady pro přidávání videí na ethereum.org"
lang: cs
---

# Přidávání videí {#adding-videos}

Ve [videogalerii ethereum.org](/videos/) najdete videa o Ethereu a ekosystému Etherea od tvůrců z komunity a důvěryhodných zdrojů. Kdokoli může navrhnout video k přidání.

## Zásady pro zařazení {#listing-policy}

Ethereum.org je neutrální vzdělávací zdroj. Videogalerie je spravována tak, aby:

- **Vzdělávala** uživatele o technologii Etherea, jeho ekosystému a komunitě
- **Zůstala přesná** ve svém technickém obsahu
- **Zůstala relevantní** pro komunitu Etherea

Stránka nezařazuje videa, která primárně propagují konkrétní produkt, token nebo komerční službu.


## Kritéria pro zařazení {#criteria-for-inclusion}

### Nutné požadavky {#must-haves}

- **Zaměření na Ethereum** – Video musí být primárně o Ethereu, jeho technologii, ekosystému nebo komunitě. Videa o obecných tématech týkajících se blockchainu jsou přijatelná pouze tehdy, pokud podstatně podporují nebo se vztahují ke vzdělávací stránce na webu, případně pokud odkazují na Ethereum.
- **Vzdělávací hodnota** – Video by mělo diváky něco naučit o Ethereu nebo oslavovat globální komunitu Etherea. Propagační nebo marketingový obsah nebude přijat.
- **Přesné informace** – Technický obsah musí být fakticky správný a aktuální. Zastaralá videa o zrušených funkcích mohou být odstraněna.
- **Kvalitní zpracování** – Video by mělo mít přiměřeně čistou kvalitu zvuku a obrazu.
- **Veřejně dostupné** – Video musí být hostováno na otevřeném zdroji nebo přístupné platformě, jako je YouTube, a musí být volně přístupné bez placené brány (paywall) nebo nutnosti registrace.

### Výhodou {#nice-to-haves}

- **Obsahuje přepis** – Videa s přepisy zlepšují přístupnost a SEO. Pokud jej nemáte, tým ethereum.org vám může pomoci s jeho vytvořením.
- **Z důvěryhodného zdroje** – Obsah od zavedených vzdělavatelů, výzkumníků a zdrojů má prioritu.
- **Aktuální a nadčasové** – Obsah, který zůstává relevantní v průběhu času, je upřednostňován před materiálem citlivým na čas.


## Jak přidat video {#how-to-add-a-video}

### Možnost 1: Otevřít issue {#open-an-issue}

Pokud byste chtěli navrhnout video, ale nechcete sami vytvářet soubory, otevřete na GitHubu issue s podrobnostmi o videu a některý z přispěvatelů vám jej pomůže přidat.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Navrhnout video
</ButtonLink>

### Možnost 2: Otevřít pull request {#open-a-pull-request}

Pokud byste chtěli video přidat sami, postupujte podle těchto kroků:

#### Krok 1: Vytvoření souboru s videem {#step-1}

Vytvořte nový adresář a soubor `index.md` v:

```
public/content/videos/{vas-slug-videa}/index.md
```

Slug by měl být bezpečný pro URL, psaný malými písmeny a používat pomlčky (např. `blockchain-101-visual-demo`).

#### Krok 2: Přidání frontmatteru {#step-2}

Přidejte následující YAML frontmatter do vašeho `index.md`:

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

**Přehled polí:**

| Pole | Povinné | Popis |
|---|---|---|
| `title` | Ano | Název videa |
| `description` | Ano | Shrnutí o délce 1–3 vět |
| `lang` | Ano | Prozatím vždy `en` |
| `youtubeId` | Ano | ID videa na YouTube (z URL za `v=`) |
| `uploadDate` | Ano | Původní datum nahrání ve formátu `YYYY-MM-DD` |
| `duration` | Ano | Délka videa jako `H:MM:SS` nebo `M:SS` |
| `educationLevel` | Ano | `beginner`, `intermediate` nebo `advanced` |
| `topic` | Ano | Pole tematických štítků pro filtrování v galerii |
| `format` | Ano | `explainer`, `presentation`, `interview`, `tutorial` nebo `panel` |
| `author` | Ano | Jméno tvůrce nebo název kanálu |
| `breadcrumb` | Ne | Vlastní krátký štítek pro drobečkovou navigaci |
| `customThumbnailUrl` | Ne | Vlastní URL náhledu (výchozí je náhled z YouTube) |

#### Krok 3: Přidání přepisu (doporučeno) {#step-3}

Pod frontmatter `---` přidejte přepis videa ve formátu markdown:

```markdown
---
title: "..."
# ... zbytek frontmatteru
---

Stručný úvod k obsahu videa.

### Název sekce (0:00)

Text přepisu pro tuto sekci...

### Další sekce (5:30)

Další text přepisu...
```

K označení hlavních sekcí použijte nadpisy `###` s časovými značkami. Díky tomu bude přepis snadno čitelný a zlepší se SEO.

Pokud nemáte přepis, můžete nechat tělo prázdné a tým jej vygeneruje.

#### Krok 5: Odeslání vašeho PR {#step-5}

Otevřete pull request s vašimi změnami do větve `dev`. Tým vaši žádost zkontroluje a poskytne zpětnou vazbu.


## Údržba {#maintenance}

Zařazená videa jsou pravidelně kontrolována, aby se zajistilo, že:

- Stále splňují kritéria pro zařazení
- Obsahují přesné a aktuální informace
- Mají funkční odkazy na hosting/YouTube

Pokud si všimnete problému se zařazeným videem, [vytvořte issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) nebo pošlete e-mail na [website@ethereum.org](mailto:website@ethereum.org).


## Podmínky použití {#terms-of-use}

Přečtěte si prosím [podmínky použití](/terms-of-use/) webu ethereum.org. Informace na ethereum.org jsou poskytovány výhradně pro obecné informační účely.
