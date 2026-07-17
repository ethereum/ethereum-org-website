---
title: "Dodaj przejrzyste podpisywanie do swojego protokołu za pomocą ERC-7730"
description: "Dowiedz się, jak napisać deskryptor ERC-7730, aby interakcje z Twoim inteligentnym kontraktem wyświetlały czytelne dla człowieka szczegóły w portfelach, zanim użytkownicy je podpiszą."
author: Hester Bruikman
lang: pl
tags: ["ERC-7730", "bezpieczeństwo", "podpisywanie", "inteligentne kontrakty", "portfele"]
skill: intermediate
breadcrumb: Przejrzyste podpisywanie
published: 2026-05-11
---

Większość głównych ataków na Ethereum miała ten sam ostatni krok: użytkownik zatwierdzający transakcję, której nie mógł w pełni zrozumieć. Portfele sprzętowe pokazują surowe dane wywołania (calldata) w formacie szesnastkowym, a co gorsza, wymuszają włączenie ślepego podpisywania (blind signing). Portfele programowe pokazują zdekodowane pola, ale tylko wtedy, gdy rozpoznają kontrakt. Kiedy tego nie robią, czy to dlatego, że protokół jest nowy, aplikacja została skompromitowana, czy urządzenie jest offline, użytkownicy podpisują w ciemno.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definiuje standardowy format JSON do opisywania, co *oznaczają* wywołania funkcji Twojego kontraktu. 

Portfel obsługujący ERC-7730 odczytuje Twój deskryptor i pokazuje:

> **Wymiana**  
> Wyślij: 1,000 USDC  
> Otrzymaj minimum: 0.42 WETH  
> Protokół: Uniswap V3

Albo pojedyncze, skonstruowane zdanie czytelne zarówno dla ludzi, jak i agentów:

> Wymień 1,000 USDC na co najmniej 0.42 WETH

Zamiast selektora funkcji i listy surowych wartości całkowitych.

To jest [przejrzyste podpisywanie](https://clearsigning.org/) — „Podpisujesz to, co widzisz” (What You See Is What You Sign). Ten samouczek przeprowadzi Cię przez proces pisania deskryptora dla Twojego własnego kontraktu, walidacji go za pomocą oficjalnego narzędzia CLI i przesłania go do otwartego rejestru.

## Wymagania wstępne {#prerequisites}

- Znajomość języka Solidity i ABI inteligentnych kontraktów
- Wdrożony inteligentny kontrakt ze zweryfikowanym ABI (weryfikacja w [Sourcify](https://sourcify.dev) jest wymagana przed zaakceptowaniem deskryptora w rejestrze) 
- Python 3.12+ dla narzędzia CLI do walidacji 
- Podstawowa znajomość formatu JSON

## Czym jest deskryptor ERC-7730? {#what-is-an-erc-7730-descriptor}

Deskryptor to pojedynczy plik JSON składający się z trzech sekcji:

| Sekcja | Cel |
| :---- | :---- |
| `context` | Wiąże deskryptor z konkretnymi wdrożeniami kontraktu na podstawie identyfikatora łańcucha (chain ID) i adresu |
| `metadata` | Nazywa projekt i definiuje stałe wielokrotnego użytku |
| `display` | Mapuje każdą sygnaturę funkcji na czytelne dla człowieka etykiety i formaty pól |

Ponieważ deskryptor jest oddzielony od samego kontraktu, możesz dodać obsługę przejrzystego podpisywania do dowolnego istniejącego protokołu bez konieczności ponownego wdrożenia. Portfele pobierają deskryptory z rejestru i używają ich w momencie podpisywania.

## Krok 1: Utworzenie szkieletu pliku {#step-1-create-the-file-skeleton}

Utwórz plik o nazwie `calldata-<contractname>-<descriptorversion>.json`. Przedrostek `calldata-` informuje rejestr, że ten deskryptor obejmuje wywołania funkcji kontraktu, w przeciwieństwie do `eip712-` dla wiadomości z typowanymi danymi (typed-data). Pole `descriptorversion` informuje rejestr o wersji pliku deskryptora, domyślnie 0, jeśli nie podano wersji.


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

## Krok 2: Napisanie sekcji kontekstu {#step-2-write-the-context-section}

Sekcja `context` wiąże deskryptor z jednym lub wieloma wdrożeniami kontraktu. Portfele używają tego do dopasowania przychodzącej transakcji do odpowiedniego deskryptora.

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

### Pola kontekstu {#context-fields}

- `context.$id` — Unikalny identyfikator dla tego dokumentu deskryptora lub konfiguracji wdrożenia.
- `contract.deployments` — Zestaw wdrożeń, do których ma zastosowanie ten deskryptor.
- `deployments[].chainId` — Identyfikator łańcucha (chain ID) EVM dla wdrożenia. Uwzględnij każdy łańcuch, w którym wdrożono Twój kontrakt.
- `deployments[].address` — Adres kontraktu, który portfele powinny powiązać z tym deskryptorem. Użyj adresu implementacji, który zawiera logikę wykonawczą.

## Krok 3: Napisanie sekcji metadanych {#step-3-write-the-metadata-section}

Sekcja metadanych dostarcza czytelne dla człowieka informacje o projekcie i kontrakcie opisanym w tym pliku. Portfele mogą używać tych informacji do wyświetlania nazw protokołów, linków i innych szczegółów kontekstowych podczas podpisywania.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Pola metadanych {#metadata-fields}

- `owner` — Projekt, protokół, organizacja lub opiekun odpowiedzialny za ten deskryptor.
- `info.url` — Kanoniczny adres URL projektu lub dokumentacji, który portfele mogą wyświetlać użytkownikom w celu zapewnienia dodatkowego kontekstu.
- `contractName` — Nazwa kontraktu lub implementacji opisana w tym pliku, zazwyczaj zgodna ze zweryfikowanym kodem źródłowym lub ABI.

Jeśli Twój plik ERC-7730 opisuje kontrakt ERC-20, powinieneś również dodać obiekt tokena. 

## Krok 4: Napisanie sekcji formatów wyświetlania {#step-4-write-the-displayformats-section}

Obiekt `display.formats` mapuje sygnatury funkcji na czytelne dla człowieka instrukcje podpisywania. W ten sposób portfele pokazują Twoją funkcję użytkownikom, zanim zatwierdzą oni transakcję!

Każdy klucz to czytelny dla człowieka fragment ABI — sygnatura funkcji zawierająca zarówno nazwy parametrów, jak i typy parametrów dokładnie w takiej postaci, w jakiej pojawiają się w Twoim ABI.


### Przykład: Opisanie wymiany tokenów {#eg-describing-token-swap}

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

### Pola wyświetlania {#display-fields}

- **`intent`** — **(Wymagane)** Krótki, przyjazny dla użytkownika opis akcji, taki jak „Wymiana” (Swap).
- **`interpolatedIntent`** — **(Zalecane)** Bogatszy szablon zdania, który osadza sformatowane wartości pól, taki jak `"Swap {amountIn} for at least {amountOutMin}"`. Dołącz to obok `intent`, aby zapewnić jeszcze bardziej przyjazny dla użytkownika deskryptor, który portfele mogą zdecydować się wyświetlić, biorąc pod uwagę ewentualne ograniczenia wyświetlania.
- **`fields`** — **(Wymagane)** Uporządkowana lista pól transakcji, które portfele powinny wyświetlać użytkownikom.
  - **`path`** — **(Wymagane)** Odniesienie do danych transakcji. `#.fieldName` wskazuje na zdekodowany parametr danych wywołania (calldata) według nazwy w ABI. `@.value` odnosi się do wartości ETH wysłanej wraz z transakcją.
  - **`label`** — **(Wymagane)** Czytelna dla człowieka etykieta wyświetlana obok wartości.
  - **`format`** — **(Zalecane)** Kontroluje sposób renderowania wartości. Typowe formaty obejmują:
    - `tokenAmount`
    - `addressName`
    - `date`

    Użyj `raw`, gdy nie jest potrzebne żadne dodatkowe formatowanie. Niektóre formaty akceptują dodatkową konfigurację **`params`**. Na przykład:

    - `tokenAmount` może użyć `tokenPath`, aby zidentyfikować, który adres tokena dostarcza metadane dotyczące miejsc dziesiętnych i symbolu (ticker).
    - `date` może użyć `encoding`, aby opisać, w jaki sposób zakodowany jest znacznik czasu (timestamp).

    Jeśli wybrany format nie wymaga dodatkowych informacji, pomiń `params`.

## Kompletny deskryptor {#the-complete-descriptor}

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

## Krok 5: Przesłanie do rejestru {#step-5-submit-to-the-registry}

[Rejestr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) to otwarte repozytorium hostowane przez [Fundację Ethereum](/foundation/) jako neutralnego zarządcę. Każdy może je sklonować i hostować samodzielnie — portfele niezależnie decydują, którym instancjom rejestru ufają.

1. Utwórz rozwidlenie repozytorium na GitHubie  
2. Utwórz folder w `registry/<your-project-name>/`  
3. Umieść w nim swój plik: `registry/myproject/calldata-mycontract-0_0.json`  
4. Zaktualizuj pole `$schema` na ścieżkę względną używaną w repozytorium: `"../../specs/erc7730-v2.schema.json"`  
5. Otwórz pull request (żądanie ściągnięcia)

Kiedy otworzysz PR, CI automatycznie uruchamia walidację schematu, sprawdza, czy sygnatury funkcji generują prawidłowe selektory, potwierdza, że adres kontraktu jest zweryfikowany w Sourcify i oflagowuje niespójności ABI. Wyniki sprawdzania pojawiają się bezpośrednio w PR. Opiekunowie rejestru sprawdzają zgłoszenia pod kątem zniekształconych lub potencjalnie złośliwych deskryptorów. Włączenie do rejestru nie oznacza audytu ani poparcia.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Uwaga:** Twój kontrakt musi zostać zweryfikowany w <a href="https://repo.sourcify.dev">Sourcify</a>, zanim Twój PR będzie mógł zostać zaakceptowany. Jeśli nie jest jeszcze zweryfikowany, najpierw <a href="https://verify.sourcify.dev/">prześlij weryfikację</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Co się dzieje po scaleniu (merge)? {#what-happens-after-merging}

Wszystkie deskryptory w rejestrze są otwarte dla audytorów. Po scaleniu Twojego PR, każdy audytor może przejrzeć Twój deskryptor i opublikować kryptograficzne poświadczenie (zgodnie z [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) potwierdzające jego dokładność. 

Te sygnały poświadczeń pozwalają portfelom stosować własne zasady zaufania — deskryptor z wieloma niezależnymi poświadczeniami ma większą wagę niż ten bez nich. Możesz skontaktować się ze społecznością audytorów za pośrednictwem [clearsigning.org](https://clearsigning.org).

Portfele wybierają, który rejestr będą obsługiwać. Gdy Twój deskryptor znajdzie się w rejestrze, portfele obsługujące ERC-7730 zaczną go pobierać, jeśli znajduje się w ich rejestrze, i będą wyświetlać czytelne dla człowieka dane, gdy użytkownicy wejdą w interakcję z Twoim kontraktem.

## Dalsza lektura {#further-reading}

- [Specyfikacja ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Rejestr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — narzędzia, status ekosystemu i zarządzanie  
- [Weryfikacja kontraktów w Sourcify](https://sourcify.dev)  
- [Inicjatywa Trillion Dollar Security](https://trilliondollarsecurity.org)