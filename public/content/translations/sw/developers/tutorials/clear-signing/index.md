---
title: Ongeza kusaini kwa wazi kwenye itifaki yako ukitumia ERC-7730
description: Jifunze jinsi ya kuandika kifafanuzi cha ERC-7730 ili mwingiliano wako wa mkataba mahiri uonyeshe maelezo yanayosomeka na binadamu kwenye mikoba kabla ya watumiaji kusaini.
author: Hester Bruikman
lang: sw
tags: ["ERC-7730", "usalama", "kusaini", "mikataba mahiri", "mikoba"]
skill: intermediate
breadcrumb: Kusaini kwa wazi
published: 2026-05-11
---

Unyonyaji mwingi mkubwa wa Ethereum ulikuwa na hatua ya mwisho sawa: mtumiaji kuidhinisha muamala ambao hakuweza kuuelewa kwa maana. Mikoba ya maunzi huonyesha data za mwito za heksadesimali ghafi, na mbaya zaidi inakulazimisha kuwasha kusaini kwa upofu. Mikoba ya programu huonyesha sehemu zilizosimbuliwa, lakini tu wakati inatambua mkataba. Wakati haitambui, iwe kwa sababu itifaki ni mpya, programu imedukuliwa, au kifaa kiko nje ya mtandao, watumiaji husaini kwa upofu.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) inafafanua muundo wa kawaida wa JSON wa kuelezea kile ambacho miito ya utendaji ya mkataba wako *inamaanisha*.

Mkoba unaotumia ERC-7730 husoma kifafanuzi chako na kuonyesha:

> **Badilishano**  
> Tuma: 1,000 USDC  
> Pokea kima cha chini: 0.42 WETH  
> Itifaki: Uniswap V2

Au sentensi moja iliyoundwa inayosomeka na binadamu na mawakala vile vile:

> Badilishana 1,000 USDC kwa angalau 0.42 WETH

Badala ya kiteuzi cha utendaji na orodha ya thamani ghafi za nambari kamili.

Huku ni [kusaini kwa wazi](https://clearsigning.org/) — "Kile Unachokiona Ndicho Unachosaini." Mafunzo haya yanakuongoza kupitia kuandika kifafanuzi cha mkataba wako mwenyewe, kukithibitisha kwa zana rasmi ya CLI, na kukiwasilisha kwenye sajili iliyo wazi.

## Mahitaji ya awali {#prerequisites}

- Uelewa wa Solidity na ABI za mkataba mahiri
- Mkataba mahiri uliosambazwa wenye ABI iliyothibitishwa (uthibitishaji wa [Sourcify](https://sourcify.dev) unahitajika kabla ya kifafanuzi kukubaliwa kwenye sajili)
- Python 3.12 kwa ajili ya CLI ya uthibitishaji (kifurushi kilichobandikwa cha `erc7730` hakisakinishwi kwenye Python 3.13 au matoleo mapya zaidi). Ikiwa Python ya mfumo wako ni toleo tofauti, [uv](https://docs.astral.sh/uv/) inaweza kupakua na kukuendeshea Python 3.12
- Ujuzi wa kimsingi wa JSON

## Kifafanuzi cha ERC-7730 ni nini? {#what-is-an-erc-7730-descriptor}

Kifafanuzi ni faili moja la JSON lenye sehemu tatu:

| Sehemu | Kusudi |
| :---- | :---- |
| `context` | Hufunga kifafanuzi kwenye usambazaji maalum wa mkataba kwa kitambulisho cha mnyororo na anwani |
| `metadata` | Hutaja mradi na kufafanua viwango vinavyoweza kutumika tena |
| `display` | Hulinganisha kila sahihi ya utendaji na lebo zinazosomeka na binadamu na miundo ya sehemu |

Kwa sababu kifafanuzi kimetenganishwa na mkataba wenyewe, unaweza kuongeza usaidizi wa kusaini kwa wazi kwenye itifaki yoyote iliyopo bila usambazaji upya. Mikoba hurejesha vifafanuzi kutoka kwenye sajili na kuvitumia wakati wa kusaini.

## Hatua ya 1: Unda kiunzi cha faili {#step-1-create-the-file-skeleton}

Unda faili linaloitwa `calldata-<ContractName>.json`, kwa mfano `calldata-SwapRouter.json`. Kiambishi awali cha `calldata-` huiambia sajili kuwa kifafanuzi hiki kinashughulikia miito ya utendaji ya mkataba, tofauti na `eip712-` kwa ujumbe wa data zilizochapwa. Ikiwa unahitaji kufafanua matoleo kadhaa ya mkataba, jumuisha toleo la mkataba kwenye jina, kama ilivyo kwenye `calldata-UniswapV3Router02.json` ya sajili.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## Hatua ya 2: Andika sehemu ya muktadha {#step-2-write-the-context-section}

Sehemu ya `context` hufunga kifafanuzi kwenye usambazaji mmoja au zaidi wa mkataba. Mikoba hutumia hii kulinganisha muamala unaoingia na kifafanuzi sahihi.

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Sehemu za muktadha {#context-fields}

- `context.$id` — Kitambulisho cha kipekee cha hati hii ya kifafanuzi au usanidi wa usambazaji.
- `contract.deployments` — Seti ya usambazaji ambayo kifafanuzi hiki kinatumika.
- `deployments[].chainId` — Kitambulisho cha mnyororo wa EVM kwa usambazaji. Jumuisha kila mnyororo ambapo mkataba wako umesambazwa.
- `deployments[].address` — Anwani ya mkataba ambayo mikoba inapaswa kuhusisha na kifafanuzi hiki. Hii ndiyo anwani ambayo watumiaji hutuma miamala kweli. Ikiwa mkataba wako unaweza kuboreshwa, hiyo ni anwani ya proksi, si anwani ya utekelezaji, wakati sahihi za utendaji katika `display.formats` hutoka kwenye ABI ya utekelezaji.

## Hatua ya 3: Andika sehemu ya data fafanuzi {#step-3-write-the-metadata-section}

Sehemu ya data fafanuzi hutoa maelezo yanayosomeka na binadamu kuhusu mradi na mkataba uliofafanuliwa na faili hili. Mikoba inaweza kutumia maelezo haya kuonyesha majina ya itifaki, viungo, na maelezo mengine ya kimuktadha wakati wa kusaini.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Sehemu za data fafanuzi {#metadata-fields}

- `owner` — Mradi, itifaki, shirika, au mtunzaji anayehusika na kifafanuzi hiki.
- `info.url` — URL ya mradi au nyaraka rasmi ambayo mikoba inaweza kuonyesha kwa watumiaji kwa muktadha wa ziada.
- `contractName` — Jina la mkataba au utekelezaji lililofafanuliwa na faili hili, kwa kawaida linalolingana na msimbo wa chanzo uliothibitishwa au ABI.

Ikiwa faili lako la ERC-7730 linafafanua mkataba wa ERC-20, unapaswa kuongeza kipengee cha tokeni pia. 

## Hatua ya 4: Andika sehemu ya miundo ya onyesho {#step-4-write-the-displayformats-section}

Kipengee cha `display.formats` hulinganisha sahihi za utendaji na maagizo ya kusaini yanayosomeka na binadamu. Hivi ndivyo mikoba inavyoonyesha utendaji wako kwa watumiaji kabla ya kuidhinisha muamala!

Kila ufunguo ni kipande cha ABI kinachosomeka na binadamu — sahihi ya utendaji ikijumuisha majina ya vigezo na aina za vigezo kama zinavyoonekana kwenye ABI yako.


### Mfano: Kufafanua badilishano la tokeni {#eg-describing-token-swap}

Mfano huu unafafanua `swapExactTokensForTokens` kutoka kwenye mkataba wa Uniswap V2 `Router02`. Tokeni ya kuingiza ni kipengele cha kwanza cha `path`, na tokeni ya kutoa ni ya mwisho (`path` inaweza kuwa na vipengele zaidi ya viwili kwa badilishano la hatua nyingi).

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}
```

### Sehemu za onyesho {#display-fields}

- **`intent`** — **(Inahitajika)** Maelezo mafupi, yanayofaa kwa mtumiaji ya kitendo, kama vile "Badilishano".
- **`interpolatedIntent`** — **(Inapendekezwa)** Kiolezo cha sentensi tajiri zaidi kinachopachika thamani za sehemu zilizoumbizwa, kama vile `"Swap {amountIn} for at least {amountOutMin}"`. Jumuisha hii pamoja na `intent` ili kutoa kifafanuzi kinachofaa zaidi kwa mtumiaji ambacho mikoba inaweza kuchagua kuonyesha ikizingatiwa vikwazo vyovyote vya onyesho.
- **`fields`** — **(Inahitajika)** Orodha iliyopangwa ya sehemu za muamala ambazo mikoba inapaswa kuonyesha kwa watumiaji.
  - **`path`** — **(Inahitajika)** Rejeleo la data za muamala. `#.fieldName` inaelekeza kwenye kigezo cha data za mwito kilichosimbuliwa kwa jina kwenye ABI. `@.value` inarejelea thamani ya ETH iliyotumwa na muamala. Vipengele vya safu huandikwa na `.` kabla ya mabano: `#.path.[0]` ni kipengele cha kwanza na `#.path.[-1]` ni cha mwisho. `#.path[0]` (bila nukta) inakataliwa na linter.
  - **`label`** — **(Inahitajika)** Lebo inayosomeka na binadamu inayoonyeshwa kando ya thamani.
  - **`format`** — **(Inapendekezwa)** Hudhibiti jinsi thamani inapaswa kuonyeshwa. Miundo ya kawaida inajumuisha:
    - `tokenAmount`
    - `addressName`
    - `date`

    Tumia `raw` wakati hakuna uumbizaji wa ziada unaohitajika. Baadhi ya miundo inakubali usanidi wa ziada wa **`params`**. Kwa mfano:

    - `tokenAmount` inaweza kutumia `tokenPath` kutambua ni anwani ipi ya tokeni inatoa desimali na data fafanuzi za tiki.
    - `date` inaweza kutumia `encoding` kuelezea jinsi muhuri wa muda umesimbwa.

    Ikiwa muundo uliochaguliwa hauhitaji maelezo ya ziada, acha `params`.

## Kifafanuzi kamili {#the-complete-descriptor}

Badilisha anwani za kishikilia nafasi na anwani za mkataba wako uliosambazwa. Linter hukagua kifafanuzi dhidi ya ABI iliyothibitishwa kwenye anwani hizo, kwa hivyo inaripoti makosa hadi utakapofanya hivyo.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## Hatua ya 5: Wasilisha kwenye sajili {#step-5-submit-to-the-registry}

[Sajili ya ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) ni hazina iliyo wazi inayosimamiwa na [Taasisi ya Ethereum](/foundation/) kama msimamizi asiyeegemea upande wowote. Mtu yeyote yuko huru kuiga na kujisimamia mwenyewe — mikoba huamua kwa kujitegemea ni matukio yapi ya sajili wanayoyaamini.

1. Tengeneza mchepuo wa hazina kwenye GitHub
2. Unda folda kwenye `registry/<your-project-name>/`
3. Weka faili lako ndani yake: `registry/myproject/calldata-SwapRouter.json`
4. Sasisha sehemu ya `$schema` kwa njia ya jamaa inayotumika ndani ya hazina: `"../../specs/erc7730-v2.schema.json"`. CI inakataa URL hapa.
5. Ongeza faili la jaribio (tazama hapa chini)
6. Thibitisha faili zako kwenye kompyuta yako (tazama hapa chini)
7. Fungua ombi la kuvuta. Kila ombi la kuvuta linaweza kubadilisha folda moja tu chini ya `registry/`

### Ongeza faili la jaribio {#add-a-test-file}

Kila kifafanuzi unachoongeza au kubadilisha kinahitaji faili la jaribio, ili utekelezaji wa kusaini kwa wazi uweze kukaguliwa dhidi yake. Unda `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` na angalau kisa kimoja cha jaribio kwa kila utendaji katika `display.formats`. CI hupata kiteuzi cha utendaji cha kila muundo na inashindwa ikiwa hakuna muamala wa jaribio unaouita.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` ni muamala kamili uliopangwa **ambao haujasainiwa** (umefupishwa hapa), sio tu data za mwito. Miamala halisi kwa mkataba wako ndiyo visa bora vya jaribio.
- `dataProvider` hutoa data fafanuzi za tokeni (na kwa hiari anwani na majina ya ENS) ili majaribio yasihitaji ufikiaji wa mtandao.
- `expected` ni kile ambacho mkoba unapaswa kuonyesha. CI hutoa kila kisa cha jaribio na utekelezaji wa kusaini kwa wazi na kuripoti tofauti zozote kwenye ombi la kuvuta.

Tazama [Visa vya jaribio la marejeleo](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) kwenye README ya sajili kwa muundo kamili, ikijumuisha faili za jaribio za vifafanuzi vya EIP-712.

### Thibitisha kwenye kompyuta yako {#validate-locally}

Sajili hukagua vifafanuzi kwa zana ya mstari wa amri ya [`erc7730`](https://github.com/sourcifyeth/python-erc7730), iliyobandikwa katika `.github/requirements.txt`. Iendeshe kutoka kwenye mzizi wa mchepuo wako, katika mazingira ya Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Ikiwa unatumia [uv](https://docs.astral.sh/uv/), unaweza kuruka mazingira pepe, na uv hupakua Python 3.12 ikihitajika:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Linter hukagua kifafanuzi dhidi ya skema na dhidi ya ABI iliyothibitishwa ya mkataba wako. Rekebisha kila kosa. Maonyo kama vile `Missing display format` yanamaanisha mkataba una utendaji ambao kifafanuzi chako hakijafafanua bado. Ili pia kukagua njia za `$schema` na faili la jaribio jinsi CI inavyofanya, tazama [Jinsi ya kuthibitisha](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) kwenye README ya sajili.

Unapofungua PR, CI huendesha uthibitishaji wa skema kiotomatiki, hukagua kuwa sahihi za utendaji hutoa viteuzi halali, huthibitisha anwani ya mkataba imethibitishwa kwenye Sourcify, na kuashiria kutokubaliana kwa ABI. Matokeo ya ukaguzi huonekana ndani ya mstari kwenye PR. Watunzaji wa sajili hukagua mawasilisho kwa vifafanuzi vilivyoundwa vibaya au vinavyoweza kuwa na nia mbaya. Kujumuishwa kwenye sajili hakumaanishi ukaguzi au uidhinishaji.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Kumbuka:** Mkataba wako lazima uthibitishwe kwenye <a href="https://repo.sourcify.dev">Sourcify</a> kabla ya PR yako kukubaliwa. Ikiwa haujathibitishwa bado, <a href="https://verify.sourcify.dev/">wasilisha uthibitishaji</a> kwanza.
</AlertDescription>
</AlertContent>
</Alert>

## Nini kinatokea baada ya kuunganisha? {#what-happens-after-merging}

Vifafanuzi vyote kwenye sajili viko wazi kwa wakaguzi. Baada ya PR yako kuunganishwa, mkaguzi yeyote anaweza kukagua kifafanuzi chako na kuchapisha uthibitisho wa kificho (chini ya [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) kuthibitisha usahihi wake. 

Ishara hizi za uthibitisho huruhusu mikoba kutumia sera zao wenyewe za uaminifu — kifafanuzi chenye uthibitisho mwingi wa kujitegemea hubeba uzito zaidi kuliko kile kisicho na uthibitisho. Unaweza kufikia jumuiya ya wakaguzi kupitia [clearsigning.org](https://clearsigning.org).

Mikoba huchagua ni sajili gani itakayounga mkono. Pindi kifafanuzi chako kikiwa kwenye sajili, mikoba inayotumia ERC-7730 itaanza kukichukua ikiwa kiko kwenye sajili yao na itaonyesha data inayosomeka na binadamu wakati watumiaji wanaingiliana na mkataba wako.

## Usomaji zaidi {#further-reading}

- [Uainishaji wa ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Sajili ya ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — zana, hali ya mfumo wa ikolojia, na utawala  
- [Uthibitishaji wa mkataba wa Sourcify](https://sourcify.dev)  
- [Mpango wa Usalama wa Trilioni ya Dola](https://trilliondollarsecurity.org)

