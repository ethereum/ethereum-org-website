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

Większość głównych exploitów na Ethereum miała ten sam ostatni krok: użytkownik zatwierdzał transakcję, której nie mógł w pełni zrozumieć. Portfele sprzętowe pokazują surowe dane wywołania w formacie szesnastkowym, a co gorsza, zmuszają do włączenia ślepego podpisywania (blind signing). Portfele programowe pokazują zdekodowane pola, ale tylko wtedy, gdy rozpoznają kontrakt. Kiedy tego nie robią, czy to dlatego, że protokół jest nowy, aplikacja jest skompromitowana, czy urządzenie jest offline, użytkownicy podpisują w ciemno.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definiuje standardowy format JSON do opisywania, co *oznaczają* wywołania funkcji Twojego kontraktu.

Portfel obsługujący ERC-7730 odczytuje Twój deskryptor i pokazuje:

> **Wymiana**  
> Wyślij: 1,000 USDC  
> Otrzymaj minimum: 0.42 WETH  
> Protokół: Uniswap V2

Albo pojedyncze, skonstruowane zdanie czytelne zarówno dla ludzi, jak i agentów:

> Wymień 1,000 USDC na co najmniej 0.42 WETH

Zamiast selektora funkcji i listy surowych wartości całkowitych.

To jest [przejrzyste podpisywanie](https://clearsigning.org/) (clear signing) — „Widzisz to, co podpisujesz” (What You See Is What You Sign). Ten samouczek przeprowadzi Cię przez proces pisania deskryptora dla własnego kontraktu, walidacji go za pomocą oficjalnego narzędzia CLI i przesłania go do otwartego rejestru.

## Wymagania wstępne {#prerequisites}

- Znajomość języka Solidity i ABI inteligentnych kontraktów
- Wdrożony inteligentny kontrakt ze zweryfikowanym ABI (weryfikacja w [Sourcify](https://sourcify.dev) jest wymagana przed zaakceptowaniem deskryptora w rejestrze)
- Python 3.12 dla CLI do walidacji (przypięty pakiet `erc7730` nie instaluje się w Pythonie 3.13 lub nowszym). Jeśli systemowy Python jest w innej wersji, [uv](https://docs.astral.sh/uv/) może pobrać i uruchomić Pythona 3.12 za Ciebie
- Podstawowa znajomość JSON

## Czym jest deskryptor ERC-7730? {#what-is-an-erc-7730-descriptor}

Deskryptor to pojedynczy plik JSON składający się z trzech sekcji:

| Sekcja | Cel |
| :---- | :---- |
| `context` | Wiąże deskryptor z konkretnymi wdrożeniami kontraktu na podstawie identyfikatora łańcucha (chain ID) i adresu |
| `metadata` | Nazywa projekt i definiuje stałe wielokrotnego użytku |
| `display` | Mapuje każdą sygnaturę funkcji na czytelne dla człowieka etykiety i formaty pól |

Ponieważ deskryptor jest oddzielony od samego kontraktu, możesz dodać obsługę przejrzystego podpisywania do dowolnego istniejącego protokołu bez konieczności ponownego wdrożenia. Portfele pobierają deskryptory z rejestru i używają ich w momencie podpisywania.

## Krok 1: Utworzenie szkieletu pliku {#step-1-create-the-file-skeleton}

Utwórz plik o nazwie `calldata-<ContractName>.json`, na przykład `calldata-SwapRouter.json`. Przedrostek `calldata-` informuje rejestr, że ten deskryptor obejmuje wywołania funkcji kontraktu, w przeciwieństwie do `eip712-` dla wiadomości z typowanymi danymi (typed-data). Jeśli musisz opisać kilka wersji kontraktu, uwzględnij wersję kontraktu w nazwie, tak jak w `calldata-UniswapV3Router02.json` w rejestrze.

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

Sekcja `context` wiąże deskryptor z jednym lub kilkoma wdrożeniami kontraktu. Portfele używają tego do dopasowania przychodzącej transakcji do odpowiedniego deskryptora.

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

### Pola kontekstu {#context-fields}

- `context.$id` — Unikalny identyfikator dla tego dokumentu deskryptora lub konfiguracji wdrożenia.
- `contract.deployments` — Zestaw wdrożeń, do których ma zastosowanie ten deskryptor.
- `deployments[].chainId` — Identyfikator łańcucha (chain ID) EVM dla wdrożenia. Uwzględnij każdy łańcuch, w którym wdrożono Twój kontrakt.
- `deployments[].address` — Adres kontraktu, który portfele powinny powiązać z tym deskryptorem. Jest to adres, na który użytkownicy faktycznie wysyłają transakcje. Jeśli Twój kontrakt można aktualizować (upgradeable), jest to adres proxy, a nie adres implementacji, podczas gdy sygnatury funkcji w `display.formats` pochodzą z ABI implementacji.

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

Ten przykład opisuje `swapExactTokensForTokens` z kontraktu `Router02` Uniswap V2. Token wejściowy jest pierwszym elementem `path`, a token wyjściowy jest ostatnim (`path` może mieć więcej niż dwa elementy w przypadku wymiany wieloetapowej (multi-hop swap)).

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

### Pola wyświetlania {#display-fields}

- **`intent`** — **(Wymagane)** Krótki, przyjazny dla użytkownika opis akcji, taki jak „Wymiana”.
- **`interpolatedIntent`** — **(Zalecane)** Bogatszy szablon zdania, który osadza sformatowane wartości pól, taki jak `"Swap {amountIn} for at least {amountOutMin}"`. Dołącz to obok `intent`, aby zapewnić jeszcze bardziej przyjazny dla użytkownika deskryptor, który portfele mogą zdecydować się wyświetlić, o ile pozwalają na to ograniczenia wyświetlania.
- **`fields`** — **(Wymagane)** Uporządkowana lista pól transakcji, które portfele powinny wyświetlać użytkownikom.
  - **`path`** — **(Wymagane)** Odniesienie do danych transakcji. `#.fieldName` wskazuje na zdekodowany parametr danych wywołania według nazwy w ABI. `@.value` odnosi się do wartości ETH wysłanej wraz z transakcją. Elementy tablicy są zapisywane z `.` przed nawiasami: `#.path.[0]` to pierwszy element, a `#.path.[-1]` to ostatni. `#.path[0]` (bez kropki) jest odrzucane przez linter.
  - **`label`** — **(Wymagane)** Czytelna dla człowieka etykieta wyświetlana obok wartości.
  - **`format`** — **(Zalecane)** Kontroluje sposób renderowania wartości. Typowe formaty to:
    - `tokenAmount`
    - `addressName`
    - `date`

    Użyj `raw`, gdy nie jest potrzebne żadne dodatkowe formatowanie. Niektóre formaty akceptują dodatkową konfigurację **`params`**. Na przykład:

    - `tokenAmount` może użyć `tokenPath`, aby zidentyfikować, który adres tokena dostarcza metadane dotyczące miejsc dziesiętnych i symbolu (ticker).
    - `date` może użyć `encoding`, aby opisać, jak zakodowany jest znacznik czasu.

    Jeśli wybrany format nie wymaga dodatkowych informacji, pomiń `params`.

## Kompletny deskryptor {#the-complete-descriptor}

Zastąp adresy zastępcze adresami swojego wdrożonego kontraktu. Linter sprawdza deskryptor pod kątem zweryfikowanego ABI pod tymi adresami, więc będzie zgłaszał błędy, dopóki tego nie zrobisz.

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

## Krok 5: Przesłanie do rejestru {#step-5-submit-to-the-registry}

[Rejestr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) to otwarte repozytorium hostowane przez [Fundację Ethereum](/foundation/) jako neutralnego zarządcę. Każdy może je sklonować i hostować samodzielnie — portfele niezależnie decydują, którym instancjom rejestru ufają.

1. Zrób rozwidlenie (fork) repozytorium na GitHubie
2. Utwórz folder w `registry/<your-project-name>/`
3. Umieść w nim swój plik: `registry/myproject/calldata-SwapRouter.json`
4. Zaktualizuj pole `$schema` na ścieżkę względną używaną w repozytorium: `"../../specs/erc7730-v2.schema.json"`. CI odrzuci tutaj adres URL.
5. Dodaj plik testowy (zobacz poniżej)
6. Zweryfikuj swoje pliki lokalnie (zobacz poniżej)
7. Otwórz pull request. Każdy pull request może zmienić tylko jeden folder w `registry/`

### Dodanie pliku testowego {#add-a-test-file}

Każdy dodawany lub zmieniany deskryptor wymaga pliku testowego, aby można było sprawdzić z nim implementacje przejrzystego podpisywania. Utwórz `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` z co najmniej jednym przypadkiem testowym dla każdej funkcji w `display.formats`. CI wyprowadza selektor funkcji każdego formatu i kończy się niepowodzeniem, jeśli żadna transakcja testowa go nie wywołuje.

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

- `rawTx` to pełna zserializowana **niepodpisana** transakcja (tutaj skrócona), a nie tylko dane wywołania. Prawdziwe transakcje do Twojego kontraktu są najlepszymi przypadkami testowymi.
- `dataProvider` dostarcza metadane tokena (oraz opcjonalnie adres i nazwy ENS), dzięki czemu testy nie wymagają dostępu do sieci.
- `expected` to to, co powinien wyświetlić portfel. CI renderuje każdy przypadek testowy z implementacjami przejrzystego podpisywania i zgłasza wszelkie różnice w pull requeście.

Zobacz [Referencyjne przypadki testowe](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) w pliku README rejestru, aby zapoznać się z pełnym formatem, w tym plikami testowymi dla deskryptorów EIP-712.

### Walidacja lokalna {#validate-locally}

Rejestr sprawdza deskryptory za pomocą narzędzia wiersza poleceń [`erc7730`](https://github.com/sourcifyeth/python-erc7730), przypiętego w `.github/requirements.txt`. Uruchom je z katalogu głównego swojego rozwidlenia, w środowisku Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Jeśli używasz [uv](https://docs.astral.sh/uv/), możesz pominąć środowisko wirtualne, a uv pobierze Pythona 3.12 w razie potrzeby:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Linter sprawdza deskryptor pod kątem schematu i zweryfikowanego ABI Twojego kontraktu. Napraw każdy błąd. Ostrzeżenia takie jak `Missing display format` oznaczają, że kontrakt ma funkcje, których Twój deskryptor jeszcze nie opisuje. Aby sprawdzić również ścieżki `$schema` i plik testowy w sposób, w jaki robi to CI, zobacz [Jak walidować](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) w pliku README rejestru.

Po otwarciu PR, CI automatycznie uruchamia walidację schematu, sprawdza, czy sygnatury funkcji generują prawidłowe selektory, potwierdza, że adres kontraktu jest zweryfikowany w Sourcify i flaguje niespójności ABI. Wyniki sprawdzania pojawiają się w linii w PR. Opiekunowie rejestru sprawdzają zgłoszenia pod kątem zniekształconych lub potencjalnie złośliwych deskryptorów. Włączenie do rejestru nie oznacza audytu ani poparcia.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Uwaga:** Twój kontrakt musi zostać zweryfikowany w <a href="https://repo.sourcify.dev">Sourcify</a>, zanim Twój PR będzie mógł zostać zaakceptowany. Jeśli nie jest jeszcze zweryfikowany, najpierw <a href="https://verify.sourcify.dev/">prześlij weryfikację</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Co się dzieje po scaleniu (merge)? {#what-happens-after-merging}

Wszystkie deskryptory w rejestrze są otwarte dla audytorów. Po scaleniu Twojego PR, każdy audytor może przejrzeć Twój deskryptor i opublikować kryptograficzne poświadczenie (zgodnie z [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) potwierdzające jego dokładność. 

Te sygnały poświadczeń pozwalają portfelom stosować własne zasady zaufania — deskryptor z wieloma niezależnymi poświadczeniami ma większą wagę niż ten bez nich. Możesz skontaktować się ze społecznością audytorów za pośrednictwem [clearsigning.org](https://clearsigning.org).

Portfele wybierają, który rejestr będą obsługiwać. Gdy Twój deskryptor znajdzie się w rejestrze, portfele obsługujące ERC-7730 zaczną go pobierać, jeśli znajduje się w ich rejestrze, i będą wyświetlać czytelne dla człowieka dane, gdy użytkownicy wejdą w interakcję z Twoim kontraktem.

## Dalsza lektura {#further-reading}

- [Specyfikacja ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Rejestr ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — narzędzia, status ekosystemu i zarządzanie  
- [Weryfikacja kontraktów w Sourcify](https://sourcify.dev)  
- [Inicjatywa Trillion Dollar Security](https://trilliondollarsecurity.org)

