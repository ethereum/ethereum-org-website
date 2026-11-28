---
title: "Přidejte do svého protokolu transparentní podepisování pomocí ERC-7730"
description: "Naučte se napsat deskriptor ERC-7730, aby interakce s vaším chytrým kontraktem zobrazovaly v peněženkách před podepsáním uživatelem srozumitelné podrobnosti."
author: Hester Bruikman
lang: cs
tags:
  - ERC-7730
  - bezpečnost
  - podepisování
  - chytré kontrakty
  - peněženky
skill: intermediate
breadcrumb: "Transparentní podepisování"
published: 2026-05-11
---

Většina velkých exploitů na Ethereu měla stejný konečný krok: uživatel schválil transakci, které nemohl smysluplně porozumět. Hardwarové peněženky zobrazují surová hexadecimální data volání (calldata) a co hůř, nutí vás mít zapnuté slepé podepisování (blind signing). Softwarové peněženky zobrazují dekódovaná pole, ale pouze tehdy, když rozpoznají kontrakt. Když ho nerozpoznají, ať už proto, že je protokol nový, aplikace je kompromitována, nebo je zařízení offline, uživatelé podepisují naslepo.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definuje standardní formát JSON pro popis toho, co *znamenají* volání funkcí vašeho kontraktu.

Peněženka, která podporuje ERC-7730, přečte váš deskriptor a zobrazí:

> **Swap**  
> Odeslat: 1,000 USDC  
> Přijmout minimum: 0.42 WETH  
> Protokol: Uniswap V2

Nebo jedinou sestavenou větu čitelnou pro lidi i agenty:

> Swap 1,000 USDC za alespoň 0.42 WETH

Místo selektoru funkce a seznamu surových celočíselných hodnot.

Tomuto se říká [transparentní podepisování (clear signing)](https://clearsigning.org/) — „Co vidíte, to podepisujete.“ Tento tutoriál vás provede napsáním deskriptoru pro váš vlastní kontrakt, jeho ověřením pomocí oficiálního nástroje CLI a jeho odesláním do otevřeného registru.

## Předpoklady {#prerequisites}

- Znalost Solidity a ABI chytrých kontraktů
- Nasazený chytrý kontrakt s ověřeným ABI (před přijetím deskriptoru do registru je vyžadováno ověření na [Sourcify](https://sourcify.dev))
- Python 3.12 pro ověřovací CLI (připnutý balíček `erc7730` nelze nainstalovat na Python 3.13 nebo novější). Pokud má váš systémový Python jinou verzi, [uv](https://docs.astral.sh/uv/) vám může stáhnout a spustit Python 3.12
- Základní znalost JSON

## Co je deskriptor ERC-7730? {#what-is-an-erc-7730-descriptor}

Deskriptor je jeden soubor JSON se třemi sekcemi:

| Sekce | Účel |
| :---- | :---- |
| `context` | Váže deskriptor ke konkrétním nasazením kontraktu podle ID řetězce a adresy |
| `metadata` | Pojmenovává projekt a definuje znovupoužitelné konstanty |
| `display` | Mapuje každý podpis funkce na lidsky čitelné štítky a formáty polí |

Protože je deskriptor oddělený od samotného kontraktu, můžete přidat podporu transparentního podepisování do jakéhokoli existujícího protokolu bez nutnosti nového nasazení. Peněženky získávají deskriptory z registru a používají je v době podepisování.

## Krok 1: Vytvoření kostry souboru {#step-1-create-the-file-skeleton}

Vytvořte soubor s názvem `calldata-<ContractName>.json`, například `calldata-SwapRouter.json`. Předpona `calldata-` říká registru, že tento deskriptor pokrývá volání funkcí kontraktu, na rozdíl od `eip712-` pro zprávy s typovanými daty. Pokud potřebujete popsat několik verzí kontraktu, zahrňte do názvu verzi kontraktu, jako v registru `calldata-UniswapV3Router02.json`.

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

## Krok 2: Napsání sekce kontextu {#step-2-write-the-context-section}

Sekce `context` váže deskriptor k jednomu nebo více nasazením kontraktu. Peněženky to používají k přiřazení příchozí transakce ke správnému deskriptoru.

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

### Pole kontextu {#context-fields}

- `context.$id` — Unikátní identifikátor pro tento dokument deskriptoru nebo konfiguraci nasazení.
- `contract.deployments` — Sada nasazení, na která se tento deskriptor vztahuje.
- `deployments[].chainId` — ID řetězce EVM pro nasazení. Zahrňte každý řetězec, kde je váš kontrakt nasazen.
- `deployments[].address` — Adresa kontraktu, kterou by peněženky měly spojit s tímto deskriptorem. Toto je adresa, na kterou uživatelé skutečně odesílají transakce. Pokud je váš kontrakt upgradovatelný, jedná se o adresu proxy, nikoli o adresu implementace, zatímco podpisy funkcí v `display.formats` pocházejí z ABI implementace.

## Krok 3: Napsání sekce metadat {#step-3-write-the-metadata-section}

Sekce metadat poskytuje lidsky čitelné informace o projektu a kontraktu popsaném v tomto souboru. Peněženky mohou tyto informace použít k zobrazení názvů protokolů, odkazů a dalších kontextových podrobností během podepisování.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Pole metadat {#metadata-fields}

- `owner` — Projekt, protokol, organizace nebo správce odpovědný za tento deskriptor.
- `info.url` — Kanonická URL adresa projektu nebo dokumentace, kterou mohou peněženky zobrazit uživatelům pro další kontext.
- `contractName` — Název kontraktu nebo implementace popsané tímto souborem, obvykle odpovídající ověřenému zdrojovému kódu nebo ABI.

Pokud váš soubor ERC-7730 popisuje kontrakt ERC-20, měli byste přidat také objekt tokenu. 

## Krok 4: Napsání sekce formátů zobrazení {#step-4-write-the-displayformats-section}

Objekt `display.formats` mapuje podpisy funkcí na lidsky čitelné instrukce k podepisování. Takto peněženky zobrazují vaši funkci uživatelům předtím, než schválí transakci!

Každý klíč je lidsky čitelný fragment ABI — podpis funkce včetně názvů parametrů a typů parametrů přesně tak, jak se objevují ve vašem ABI.


### Příklad: Popis swapu tokenů {#eg-describing-token-swap}

Tento příklad popisuje `swapExactTokensForTokens` z kontraktu Uniswap V2 `Router02`. Vstupní token je prvním prvkem `path` a výstupní token je posledním (`path` může mít více než dva prvky pro multi-hop swap).

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

### Pole zobrazení {#display-fields}

- **`intent`** — **(Povinné)** Krátký, uživatelsky přívětivý popis akce, například „Swap“.
- **`interpolatedIntent`** — **(Doporučené)** Bohatší šablona věty, která vkládá formátované hodnoty polí, jako je `"Swap {amountIn} for at least {amountOutMin}"`. Zahrňte to společně s `intent`, abyste poskytli ještě uživatelsky přívětivější deskriptor, který se peněženky mohou rozhodnout zobrazit s ohledem na jakákoli omezení zobrazení.
- **`fields`** — **(Povinné)** Seřazený seznam polí transakce, která by peněženky měly zobrazit uživatelům.
  - **`path`** — **(Povinné)** Odkaz na data transakce. `#.fieldName` ukazuje na dekódovaný parametr dat volání (calldata) podle názvu v ABI. `@.value` odkazuje na hodnotu ETH odeslanou s transakcí. Prvky pole se zapisují s `.` před závorkami: `#.path.[0]` je první prvek a `#.path.[-1]` poslední. `#.path[0]` (bez tečky) je linterem odmítnuto.
  - **`label`** — **(Povinné)** Lidsky čitelný štítek zobrazený vedle hodnoty.
  - **`format`** — **(Doporučené)** Řídí, jak by měla být hodnota vykreslena. Běžné formáty zahrnují:
    - `tokenAmount`
    - `addressName`
    - `date`

    Použijte `raw`, když není potřeba žádné další formátování. Některé formáty přijímají další konfiguraci **`params`**. Například:

    - `tokenAmount` může použít `tokenPath` k identifikaci, která adresa tokenu poskytuje desetinná místa a metadata tickeru.
    - `date` může použít `encoding` k popisu, jak je časové razítko zakódováno.

    Pokud vybraný formát nevyžaduje další informace, vynechejte `params`.

## Kompletní deskriptor {#the-complete-descriptor}

Nahraďte zástupné adresy adresami vašeho nasazeného kontraktu. Linter kontroluje deskriptor proti ověřenému ABI na těchto adresách, takže bude hlásit chyby, dokud to neuděláte.

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

## Krok 5: Odeslání do registru {#step-5-submit-to-the-registry}

[Registr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) je otevřený repozitář hostovaný [Nadací Ethereum](/foundation/) jako neutrálním správcem. Kdokoli si jej může volně klonovat a hostovat sám — peněženky se nezávisle rozhodují, kterým instancím registru důvěřují.

1. Vytvořte fork repozitáře na GitHubu
2. Vytvořte složku v `registry/<your-project-name>/`
3. Umístěte do ní svůj soubor: `registry/myproject/calldata-SwapRouter.json`
4. Aktualizujte pole `$schema` na relativní cestu použitou v repozitáři: `"../../specs/erc7730-v2.schema.json"`. CI zde odmítne URL.
5. Přidejte testovací soubor (viz níže)
6. Ověřte své soubory lokálně (viz níže)
7. Otevřete pull request. Každý pull request může změnit pouze jednu složku pod `registry/`

### Přidání testovacího souboru {#add-a-test-file}

Každý deskriptor, který přidáte nebo změníte, potřebuje testovací soubor, aby proti němu mohly být zkontrolovány implementace transparentního podepisování. Vytvořte `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` s alespoň jedním testovacím případem pro každou funkci v `display.formats`. CI odvodí selektor funkce každého formátu a selže, pokud jej nevolá žádná testovací transakce.

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

- `rawTx` je plně serializovaná **nepodepsaná** transakce (zde zkrácená), nejen data volání (calldata). Skutečné transakce do vašeho kontraktu jsou nejlepšími testovacími případy.
- `dataProvider` dodává metadata tokenu (a volitelně adresy a jména ENS), takže testy nepotřebují přístup k síti.
- `expected` je to, co by měla peněženka zobrazit. CI vykreslí každý testovací případ s implementacemi transparentního podepisování a nahlásí jakékoli rozdíly v pull requestu.

Podívejte se na [Referenční testovací případy](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) v README registru pro plný formát, včetně testovacích souborů pro deskriptory EIP-712.

### Lokální ověření {#validate-locally}

Registr kontroluje deskriptory pomocí nástroje příkazové řádky [`erc7730`](https://github.com/sourcifyeth/python-erc7730), připnutého v `.github/requirements.txt`. Spusťte jej z kořenového adresáře vašeho forku v prostředí Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Pokud používáte [uv](https://docs.astral.sh/uv/), můžete přeskočit virtuální prostředí a uv v případě potřeby stáhne Python 3.12:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Linter kontroluje deskriptor proti schématu a proti ověřenému ABI vašeho kontraktu. Opravte každou chybu. Varování jako `Missing display format` znamenají, že kontrakt má funkce, které váš deskriptor ještě nepopisuje. Chcete-li také zkontrolovat cesty `$schema` a testovací soubor způsobem, jakým to dělá CI, podívejte se na [Jak ověřit](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) v README registru.

Když otevřete PR, CI automaticky spustí ověření schématu, zkontroluje, zda podpisy funkcí produkují platné selektory, potvrdí, že adresa kontraktu je ověřena na Sourcify, a označí nekonzistence ABI. Výsledky kontroly se objeví přímo v PR. Správci registru prověřují podání na chybně formátované nebo potenciálně škodlivé deskriptory. Zahrnutí do registru neznamená audit ani schválení.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Poznámka:** Váš kontrakt musí být ověřen na <a href="https://repo.sourcify.dev">Sourcify</a>, než může být váš PR přijat. Pokud ještě není ověřen, nejprve <a href="https://verify.sourcify.dev/">odešlete ověření</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Co se stane po sloučení? {#what-happens-after-merging}

Všechny deskriptory v registru jsou otevřené auditorům. Po sloučení vašeho PR může jakýkoli auditor zkontrolovat váš deskriptor a publikovat kryptografickou atestaci (podle [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)), která potvrdí jeho přesnost. 

Tyto signály atestace umožňují peněženkám uplatňovat vlastní zásady důvěry — deskriptor s více nezávislými atestacemi má větší váhu než ten bez nich. Komunitu auditorů můžete kontaktovat prostřednictvím [clearsigning.org](https://clearsigning.org).

Peněženky si vybírají, který registr budou podporovat. Jakmile je váš deskriptor v registru, peněženky, které podporují ERC-7730, jej začnou načítat, pokud je v jejich registru, a při interakci uživatelů s vaším kontraktem zobrazí lidsky čitelná data.

## Další čtení {#further-reading}

- [Specifikace ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — nástroje, stav ekosystému a správa  
- [Ověření kontraktu na Sourcify](https://sourcify.dev)  
- [Iniciativa Trillion Dollar Security](https://trilliondollarsecurity.org)

