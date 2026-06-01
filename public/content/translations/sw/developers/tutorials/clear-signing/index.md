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

Unyonyaji mwingi mkubwa wa Ethereum ulikuwa na hatua ya mwisho sawa: mtumiaji kuidhinisha muamala ambao hakuweza kuuelewa kwa maana. Mikoba ya maunzi huonyesha data za mwito za heksadesimali ghafi, na mbaya zaidi inakulazimisha kuwasha kusaini bila kuona. Mikoba ya programu huonyesha sehemu zilizosimbuliwa, lakini tu wakati inatambua mkataba. Wakati haitambui, iwe kwa sababu itifaki ni mpya, programu imedukuliwa, au kifaa hakiko mtandaoni, watumiaji husaini bila kuona.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) inafafanua umbizo la kawaida la JSON la kuelezea kile ambacho miito ya utendaji ya mkataba wako *inamaanisha*. 

Mkoba unaotumia ERC-7730 husoma kifafanuzi chako na kuonyesha:

> **Badilishano**  
> Tuma: 1,000 USDC  
> Pokea kima cha chini: 0.42 WETH  
> Itifaki: Uniswap V3

Au sentensi moja iliyoundwa inayosomeka na binadamu na mawakala vile vile:

> Badilishano la 1,000 USDC kwa angalau 0.42 WETH

Badala ya kiteuzi cha utendaji na orodha ya thamani ghafi za nambari kamili.

Huku ni [kusaini kwa wazi](https://clearsigning.org/) — "Kile Unachokiona Ndicho Unachosaini." Mafunzo haya yanakuongoza katika kuandika kifafanuzi cha mkataba wako mwenyewe, kukithibitisha kwa zana rasmi ya CLI, na kukiwasilisha kwenye sajili iliyo wazi.

## Mahitaji ya awali {#prerequisites}

- Uelewa wa Solidity na ABI za mkataba mahiri
- Mkataba mahiri uliosambazwa wenye ABI iliyothibitishwa (uthibitishaji wa [Sourcify](https://sourcify.dev) unahitajika kabla ya kifafanuzi kukubaliwa kwenye sajili) 
- Python 3.12+ kwa ajili ya CLI ya uthibitishaji 
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

Unda faili linaloitwa `calldata-<contractname>-<descriptorversion>.json`. Kiambishi awali cha `calldata-` huiambia sajili kuwa kifafanuzi hiki kinashughulikia miito ya utendaji wa mkataba, tofauti na `eip712-` kwa ujumbe wa data iliyochapwa. `descriptorversion` huiambia sajili toleo la faili la kifafanuzi, 0 kwa chaguo-msingi ikiwa hakuna toleo lililotolewa.


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
  "$id": "uniswap-v3-router-mainnet",
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
- `deployments[].address` — Anwani ya mkataba ambayo mikoba inapaswa kuhusisha na kifafanuzi hiki. Tumia anwani ya utekelezaji inayoshikilia mantiki ya utekelezaji.

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
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
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

- **`intent`** — **(Inahitajika)** Maelezo mafupi, yanayofaa mtumiaji ya kitendo, kama vile "Badilishano".
- **`interpolatedIntent`** — **(Inapendekezwa)** Kiolezo cha sentensi tajiri zaidi kinachopachika thamani za sehemu zilizoumbizwa, kama vile `"Swap {amountIn} for at least {amountOutMin}"`. Jumuisha hii pamoja na `intent` ili kutoa kifafanuzi kinachofaa zaidi kwa mtumiaji ambacho mikoba inaweza kuchagua kuonyesha ikizingatiwa vikwazo vyovyote vya onyesho.
- **`fields`** — **(Inahitajika)** Orodha iliyopangwa ya sehemu za muamala ambazo mikoba inapaswa kuonyesha kwa watumiaji.
  - **`path`** — **(Inahitajika)** Rejeleo la data ya muamala. `#.fieldName` inaelekeza kwenye kigezo cha data za mwito kilichosimbuliwa kwa jina kwenye ABI. `@.value` inarejelea thamani ya ETH iliyotumwa na muamala.
  - **`label`** — **(Inahitajika)** Lebo inayosomeka na binadamu inayoonyeshwa kando ya thamani.
  - **`format`** — **(Inapendekezwa)** Hudhibiti jinsi thamani inapaswa kuonyeshwa. Miundo ya kawaida ni pamoja na:
    - `tokenAmount`
    - `addressName`
    - `date`

    Tumia `raw` wakati hakuna uumbizaji wa ziada unaohitajika. Baadhi ya miundo inakubali usanidi wa ziada wa **`params`**. Kwa mfano:

    - `tokenAmount` inaweza kutumia `tokenPath` kutambua ni anwani gani ya tokeni inatoa desimali na data fafanuzi ya tiki.
    - `date` inaweza kutumia `encoding` kuelezea jinsi muhuri wa muda umesimbwa.

    Ikiwa muundo uliochaguliwa hauhitaji maelezo ya ziada, ondoa `params`.

## Kifafanuzi kamili {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
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
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
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

[Sajili ya ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) ni hazina wazi inayosimamiwa na [Taasisi ya Ethereum](/foundation/) kama msimamizi asiyeegemea upande wowote. Mtu yeyote yuko huru kuiga na kujisimamia mwenyewe — mikoba huamua kwa uhuru ni matukio gani ya sajili wanayoamini.

1. Chepua hazina kwenye GitHub  
2. Unda folda kwenye `registry/<your-project-name>/`  
3. Weka faili lako ndani yake: `registry/myproject/calldata-mycontract-0_0.json`  
4. Sasisha sehemu ya `$schema` kwa njia ya jamaa inayotumika ndani ya hazina: `"../../specs/erc7730-v2.schema.json"`  
5. Fungua ombi la kuvuta (pull request)

Unapofungua PR, CI huendesha uthibitishaji wa skema kiotomatiki, hukagua kuwa sahihi za utendaji hutoa viteuzi halali, huthibitisha anwani ya mkataba imethibitishwa kwenye Sourcify, na kuashiria kutokubaliana kwa ABI. Matokeo ya ukaguzi yanaonekana ndani ya PR. Watunzaji wa sajili hukagua mawasilisho kwa vifafanuzi vilivyoundwa vibaya au vinavyoweza kuwa na nia mbaya. Kujumuishwa kwenye sajili hakumaanishi ukaguzi au uidhinishaji.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Kumbuka:** Mkataba wako lazima uthibitishwe kwenye <a href="https://repo.sourcify.dev">Sourcify</a> kabla ya PR yako kukubaliwa. Ikiwa bado haijathibitishwa, <a href="https://verify.sourcify.dev/">wasilisha uthibitishaji</a> kwanza.
</AlertDescription>
</AlertContent>
</Alert>

## Nini kinatokea baada ya kuunganisha? {#what-happens-after-merging}

Vifafanuzi vyote kwenye sajili viko wazi kwa wakaguzi. Baada ya PR yako kuunganishwa, mkaguzi yeyote anaweza kukagua kifafanuzi chako na kuchapisha uthibitisho wa kificho (chini ya [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) kuthibitisha usahihi wake. 

Ishara hizi za uthibitisho huruhusu mikoba kutumia sera zao wenyewe za uaminifu — kifafanuzi chenye uthibitisho mwingi wa kujitegemea hubeba uzito zaidi kuliko kile kisicho na uthibitisho. Unaweza kufikia jumuiya ya wakaguzi kupitia [clearsigning.org](https://clearsigning.org).

Mikoba huchagua ni sajili gani itakayounga mkono. Pindi kifafanuzi chako kikiwa kwenye sajili, mikoba inayotumia ERC-7730 itaanza kukichukua ikiwa kiko kwenye sajili yao na itaonyesha data inayosomeka na binadamu wakati watumiaji wanaingiliana na mkataba wako.

## Usomaji zaidi {#further-reading}

- [Uainishaji wa ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Sajili ya ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — zana, hali ya mfumo wa ikolojia, na utawala  
- [Uthibitishaji wa mkataba wa Sourcify](https://sourcify.dev)  
- [Mpango wa Usalama wa Trilioni ya Dola](https://trilliondollarsecurity.org)