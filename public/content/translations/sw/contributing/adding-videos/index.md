---
title: Kuongeza Video
description: Sera ya kuongeza video kwenye ethereum.org
lang: sw
---

# Kuongeza Video {#adding-videos}

[Matunzio ya video ya ethereum.org](/videos/) yana video kuhusu Ethereum na mfumo wa ikolojia wa Ethereum kutoka kwa waundaji wa jamii na vyanzo vinavyoaminika. Mtu yeyote anaweza kupendekeza video iongezwe.

## Sera ya kuorodhesha {#listing-policy}

Ethereum.org ni rasilimali ya elimu isiyopendelea upande wowote. Matunzio ya video yanaratibiwa ili:

- **Kuelimisha** watumiaji kuhusu teknolojia ya Ethereum, mfumo wa ikolojia, na jamii
- **Kusalia sahihi** katika maudhui yake ya kiufundi
- **Kusalia muhimu** kwa jamii ya Ethereum

Tovuti haiorodheshi video ambazo kimsingi zinatangaza bidhaa mahususi, tokeni, au huduma ya kibiashara.


## Vigezo vya kujumuishwa
## Vigezo vya kujumuishwa {#criteria-for-inclusion}

### Lazima iwe nazo {#must-haves}

- **Inayolenga Ethereum** – Video lazima iwe kimsingi kuhusu Ethereum, teknolojia yake, mfumo wa ikolojia, au jamii. Video kuhusu mada za jumla za mnyororo wa vitalu zinakubalika tu ikiwa zinasaidia kwa kiasi kikubwa au zinahusiana na ukurasa wa elimu kwenye tovuti, au zinarejelea Ethereum.
- **Thamani ya elimu** – Video inapaswa kuwafundisha watazamaji jambo kuhusu Ethereum, au kusherehekea jamii ya kimataifa ya Ethereum. Maudhui ya matangazo au masoko hayatakubaliwa.
- **Taarifa sahihi** – Maudhui ya kiufundi lazima yawe sahihi kulingana na ukweli na yawe ya kisasa. Video zilizopitwa na wakati kuhusu vipengele vilivyoachwa zinaweza kuondolewa.
- **Uzalishaji bora** – Video inapaswa kuwa na ubora wa sauti na video unaoeleweka vizuri.
- **Inapatikana kwa umma** – Video lazima iwekwe kwenye rasilimali wazi au jukwaa linalofikika kama YouTube, na ipatikane kwa uhuru bila malipo au hitaji la kujisajili.

### Nzuri kuwa nazo {#nice-to-haves}

- **Ina nakala ya maandishi** – Video zilizo na nakala za maandishi huboresha ufikiaji na SEO. Ikiwa huna, timu ya ethereum.org inaweza kusaidia kutengeneza moja.
- **Kutoka kwa chanzo cha kuaminika** – Maudhui kutoka kwa waelimishaji, watafiti, na vyanzo vilivyoimarishwa hupewa kipaumbele.
- **Kwa wakati na ya kudumu** – Maudhui ambayo yanasalia kuwa muhimu kwa muda mrefu hupendelewa zaidi ya nyenzo zinazotegemea wakati.


## Jinsi ya kuongeza video
## Jinsi ya kuongeza video {#how-to-add-a-video}

### Chaguo la 1: Fungua suala {#open-an-issue}

Ikiwa ungependa kupendekeza video lakini hutaki kuunda faili wewe mwenyewe, fungua suala la GitHub na maelezo ya video na mchangiaji anaweza kusaidia kuiongeza kwa ajili yako.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Pendekeza video
</ButtonLink>

### Chaguo la 2: Fungua ombi la kuvuta (pull request) {#open-a-pull-request}

Ikiwa ungependa kuongeza video wewe mwenyewe, fuata hatua hizi:

#### Hatua ya 1: Unda faili ya video {#step-1}

Unda saraka mpya na faili ya `index.md` kwenye:

```
public/content/videos/{slagi-ya-video-yako}/index.md
```

Slagi inapaswa kuwa salama kwa URL, herufi ndogo, na kutumia vistari (k.m., `blockchain-101-visual-demo`).

#### Hatua ya 2: Ongeza frontmatter {#step-2}

Ongeza frontmatter ifuatayo ya YAML kwenye `index.md` yako:

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

**Rejeleo la uwanja:**

| Uwanja | Inahitajika | Maelezo |
|---|---|---|
| `title` | Ndiyo | Kichwa cha video |
| `description` | Ndiyo | Muhtasari wa sentensi 1–3 |
| `lang` | Ndiyo | Kila wakati `en` kwa sasa |
| `youtubeId` | Ndiyo | Kitambulisho cha video cha YouTube (kutoka kwenye URL baada ya `v=`) |
| `uploadDate` | Ndiyo | Tarehe ya asili ya kupakia katika umbizo la `YYYY-MM-DD` |
| `duration` | Ndiyo | Urefu wa video kama `H:MM:SS` au `M:SS` |
| `educationLevel` | Ndiyo | `beginner`, `intermediate`, au `advanced` |
| `topic` | Ndiyo | Orodha ya lebo za mada kwa ajili ya kuchuja matunzio |
| `format` | Ndiyo | `explainer`, `presentation`, `interview`, `tutorial`, au `panel` |
| `author` | Ndiyo | Jina la muundaji au chaneli |
| `breadcrumb` | Hapana | Lebo fupi maalum kwa ajili ya urambazaji wa breadcrumb |
| `customThumbnailUrl` | Hapana | URL maalum ya kijipicha (chaguo-msingi ni kijipicha cha YouTube) |

#### Hatua ya 3: Ongeza nakala ya maandishi (inapendekezwa) {#step-3}

Chini ya frontmatter `---`, ongeza nakala ya maandishi ya video katika umbizo la markdown:

```markdown
---
title: "..."
# ... frontmatter iliyosalia
---

Utangulizi mfupi wa maudhui ya video.

### Kichwa cha Sehemu (0:00)

Maandishi ya nakala kwa sehemu hii...

### Sehemu Inayofuata (5:30)

Maandishi zaidi ya nakala...
```

Tumia vichwa vya `###` vilivyo na mihuri ya muda ili kuweka alama kwenye sehemu kuu. Hii inafanya nakala ya maandishi iweze kusomeka kwa haraka na inaboresha SEO.

Ikiwa huna nakala ya maandishi, unaweza kuacha mwili wazi na timu itatengeneza moja.

#### Hatua ya 4: Chagua lebo za mada {#step-4}

Chagua lebo za mada zinazolingana na kategoria zilizopo zinazotumika kwenye matunzio. Kategoria za sasa na lebo zake ni pamoja na:

- **Jinsi Ethereum Inavyofanya Kazi**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Maboresho ya Mtandao**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Ramani ya Njia na Vipaumbele**: `roadmap-and-priorities`, `pbs`, `mev`
- **Kuongeza Uwezo na tabaka la 2 (l2)**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Kesi za Matumizi**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Faragha na Usalama**: `privacy-and-security`, `privacy`, `authentication`
- **Hadithi za Jamii**: `community-stories`, `contributing`, `translations`, `community`

Ili kuhakikisha video yako inaonekana kwenye rafu ya kategoria ya matunzio, jumuisha angalau lebo moja kuu ya kategoria (jina lililokolezwa katika kebab-case, k.m. `use-cases` au `scaling-and-layer-2`). Video zisizo na lebo ya kategoria inayotambulika zitaonekana tu katika mwonekano wa "Zote" na matokeo ya utafutaji.

Unaweza pia kutumia lebo mpya — zitapatikana kwa makundi ya kategoria ya baadaye.

#### Hatua ya 5: Wasilisha PR yako {#step-5}

Fungua ombi la kuvuta (pull request) na mabadiliko yako kwenye tawi la `dev`. Timu itakagua wasilisho lako na kutoa maoni.


## Matengenezo
Video zilizoorodheshwa hukaguliwa mara kwa mara ili kuhakikisha:

- Bado zinakidhi vigezo vya kuorodheshwa
- Zina taarifa sahihi na za kisasa
- Zina viungo vinavyofanya kazi vya upangishaji/YouTube

Ikiwa utagundua tatizo kwenye video iliyoorodheshwa, [unda suala](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) au tuma barua pepe kwa [website@ethereum.org](mailto:website@ethereum.org).
## Matengenezo {#maintenance}

Video zilizoorodheshwa hukaguliwa mara kwa mara ili kuhakikisha:

- Bado zinakidhi vigezo vya kuorodheshwa
- Zina taarifa sahihi na za kisasa
- Zina viungo vya kupangisha/YouTube vinavyofanya kazi

Ukigundua tatizo na video iliyoorodheshwa, [unda suala](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) au tuma barua pepe kwa [website@ethereum.org](mailto:website@ethereum.org).


## Masharti ya matumizi
Tafadhali rejelea [masharti ya matumizi](/terms-of-use/) ya ethereum.org. Taarifa kwenye ethereum.org hutolewa kwa madhumuni ya taarifa za jumla pekee.
## Masharti ya matumizi {#terms-of-use}

Tafadhali rejelea [masharti ya matumizi](/terms-of-use/) ya ethereum.org. Taarifa kwenye ethereum.org hutolewa kwa madhumuni ya taarifa za jumla pekee.
