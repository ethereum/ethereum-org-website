---
title: Přidejte do svého protokolu transparentní podepisování pomocí ERC-7730
description: Naučte se napsat deskriptor ERC-7730, aby interakce s vaším chytrým kontraktem zobrazovaly v peněženkách před podepsáním uživatelem srozumitelné podrobnosti.
author: Hester Bruikman
lang: cs
tags:
  - ERC-7730
  - bezpečnost
  - podepisování
  - chytré kontrakty
  - peněženky
skill: intermediate
breadcrumb: Transparentní podepisování
published: 2026-05-11
---

Většina velkých exploitů na Ethereu měla stejný poslední krok: uživatel schválil transakci, které nemohl smysluplně porozumět. Hardwarové peněženky zobrazují surová hexadecimální data volání (calldata) a co hůř, nutí vás mít zapnuté slepé podepisování (blind signing). Softwarové peněženky zobrazují dekódovaná pole, ale pouze tehdy, když kontrakt rozpoznají. Když ho nerozpoznají, ať už proto, že je protokol nový, aplikace je kompromitována, nebo je zařízení offline, uživatelé podepisují naslepo.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definuje standardní formát JSON pro popis toho, co *znamenají* volání funkcí vašeho kontraktu. 

Peněženka, která podporuje ERC-7730, přečte váš deskriptor a zobrazí:

> **Swap**  
> Odeslat: 1 000 USDC  
> Přijmout minimum: 0,42 WETH  
> Protokol: Uniswap V3

Nebo jedinou sestavenou větu čitelnou pro lidi i agenty:

> Swap 1 000 USDC za alespoň 0,42 WETH

Místo selektoru funkce a seznamu surových celočíselných hodnot.

Tomuto se říká [transparentní podepisování](https://clearsigning.org/) (clear signing) — „Co vidíte, to podepisujete“. Tento tutoriál vás provede psaním deskriptoru pro váš vlastní kontrakt, jeho ověřením pomocí oficiálního nástroje CLI a odesláním do otevřeného registru.

## Předpoklady {#prerequisites}

- Znalost Solidity a ABI chytrých kontraktů
- Nasazený chytrý kontrakt s ověřeným ABI (před přijetím deskriptoru do registru je vyžadováno ověření přes [Sourcify](https://sourcify.dev)) 
- Python 3.12+ pro validační CLI 
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

Vytvořte soubor s názvem `calldata-<contractname>-<descriptorversion>.json`. Předpona `calldata-` říká registru, že tento deskriptor pokrývá volání funkcí kontraktu, na rozdíl od `eip712-` pro zprávy s typovanými daty. `descriptorversion` sděluje registru verzi souboru deskriptoru, výchozí hodnota je 0, pokud není verze uvedena.


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
  "$id": "uniswap-v3-router-mainnet",
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
- `deployments[].chainId` — ID EVM řetězce pro nasazení. Zahrňte každý řetězec, kde je váš kontrakt nasazen.
- `deployments[].address` — Adresa kontraktu, kterou by peněženky měly spojit s tímto deskriptorem. Použijte adresu implementace, která obsahuje logiku provádění.

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

### Pole zobrazení {#display-fields}

- **`intent`** — **(Vyžadováno)** Krátký, uživatelsky přívětivý popis akce, například „Swap“.
- **`interpolatedIntent`** — **(Doporučeno)** Bohatší šablona věty, která vkládá formátované hodnoty polí, jako je `"Swap {amountIn} for at least {amountOutMin}"`. Zahrňte to společně s `intent`, abyste poskytli ještě uživatelsky přívětivější deskriptor, který se peněženky mohou rozhodnout zobrazit s ohledem na případná omezení zobrazení.
- **`fields`** — **(Vyžadováno)** Seřazený seznam polí transakce, která by peněženky měly zobrazit uživatelům.
  - **`path`** — **(Vyžadováno)** Odkaz na data transakce. `#.fieldName` ukazuje na dekódovaný parametr dat volání (calldata) podle názvu v ABI. `@.value` odkazuje na hodnotu ETH odeslanou s transakcí.
  - **`label`** — **(Vyžadováno)** Lidsky čitelný štítek zobrazený vedle hodnoty.
  - **`format`** — **(Doporučeno)** Řídí, jak by měla být hodnota vykreslena. Běžné formáty zahrnují:
    - `tokenAmount`
    - `addressName`
    - `date`

    Použijte `raw`, když není potřeba žádné další formátování. Některé formáty přijímají dodatečnou konfiguraci **`params`**. Například:

    - `tokenAmount` může použít `tokenPath` k identifikaci, která adresa tokenu poskytuje metadata o desetinných místech a tickeru.
    - `date` může použít `encoding` k popisu, jak je časové razítko zakódováno.

    Pokud vybraný formát nevyžaduje další informace, vynechte `params`.

## Kompletní deskriptor {#the-complete-descriptor}

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

## Krok 5: Odeslání do registru {#step-5-submit-to-the-registry}

[Registr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) je otevřený repozitář hostovaný [Nadací Ethereum](/foundation/) jako neutrálním správcem. Kdokoli si jej může volně naklonovat a hostovat sám — peněženky se nezávisle rozhodují, kterým instancím registru důvěřují.

1. Vytvořte fork repozitáře na GitHubu  
2. Vytvořte složku v `registry/<your-project-name>/`  
3. Umístěte do ní svůj soubor: `registry/myproject/calldata-mycontract-0_0.json`  
4. Aktualizujte pole `$schema` na relativní cestu použitou v rámci repozitáře: `"../../specs/erc7730-v2.schema.json"`  
5. Otevřete pull request

Když otevřete PR, CI automaticky spustí validaci schématu, zkontroluje, zda podpisy funkcí vytvářejí platné selektory, potvrdí, že adresa kontraktu je ověřena na Sourcify, a označí nesrovnalosti v ABI. Výsledky kontroly se zobrazí přímo v PR. Správci registru kontrolují příspěvky na chybně formátované nebo potenciálně škodlivé deskriptory. Zahrnutí do registru neznamená audit ani schválení.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Poznámka:** Váš kontrakt musí být ověřen na <a href="https://repo.sourcify.dev">Sourcify</a>, než může být váš PR přijat. Pokud ještě není ověřen, nejprve <a href="https://verify.sourcify.dev/">odešlete ověření</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Co se stane po sloučení? {#what-happens-after-merging}

Všechny deskriptory v registru jsou otevřené auditorům. Po sloučení vašeho PR může jakýkoli auditor zkontrolovat váš deskriptor a publikovat kryptografickou atestaci (podle [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)), která potvrdí jeho přesnost. 

Tyto signály atestace umožňují peněženkám uplatňovat vlastní zásady důvěry — deskriptor s více nezávislými atestacemi má větší váhu než ten bez nich. Komunitu auditorů můžete kontaktovat prostřednictvím [clearsigning.org](https://clearsigning.org).

Peněženky si vybírají, který registr budou podporovat. Jakmile je váš deskriptor v registru, peněženky, které podporují ERC-7730, jej začnou načítat, pokud je v jejich registru, a při interakci uživatelů s vaším kontraktem zobrazí lidsky čitelná data.

## Další čtení {#further-reading}

- [Specifikace ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — nástroje, stav ekosystému a správa  
- [Ověření kontraktu na Sourcify](https://sourcify.dev)  
- [Iniciativa Trillion Dollar Security](https://trilliondollarsecurity.org)