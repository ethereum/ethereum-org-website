---
title: "Clear Signing zu Ihrem Protokoll mit ERC-7730 hinzufügen"
description: Erfahren Sie, wie Sie einen ERC-7730-Deskriptor schreiben, damit Ihre Smart-Contract-Interaktionen in Wallets menschenlesbare Details anzeigen, bevor Benutzer signieren.
author: Hester Bruikman
lang: de
tags: ["ERC-7730", "Sicherheit", "Signieren", "Smart Contracts", "Wallets"]
skill: intermediate
breadcrumb: Clear Signing
published: 2026-05-11
---

Die meisten großen Ethereum-Exploits hatten denselben letzten Schritt: Ein Benutzer genehmigte eine Transaktion, die er nicht wirklich verstand. Hardware-Wallets zeigen rohe Hex-Aufrufdaten an und zwingen Sie schlimmer noch dazu, Blind Signing aktiviert zu haben. Software-Wallets zeigen decodierte Felder an, aber nur, wenn sie den Vertrag erkennen. Wenn sie das nicht tun – sei es, weil das Protokoll neu ist, die App kompromittiert wurde oder das Gerät offline ist – signieren Benutzer blind.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definiert ein standardisiertes JSON-Format, um zu beschreiben, was die Funktionsaufrufe Ihres Vertrags *bedeuten*. 

Eine Wallet, die ERC-7730 unterstützt, liest Ihren Deskriptor und zeigt Folgendes an:

> **Tausch**  
> Senden: 1.000 USDC  
> Minimum erhalten: 0,42 WETH  
> Protokoll: Uniswap V2

Oder einen einzelnen konstruierten Satz, der für Menschen und Agenten gleichermaßen lesbar ist:

> Tausche 1.000 USDC gegen mindestens 0,42 WETH

Anstelle eines Funktionsselektors und einer Liste von rohen Integer-Werten.

Das ist [Clear Signing](https://clearsigning.org/) – „What You See Is What You Sign“ (Was Sie sehen, ist das, was Sie signieren). Dieses Tutorial führt Sie durch das Schreiben eines Deskriptors für Ihren eigenen Vertrag, dessen Validierung mit dem offiziellen CLI-Tool und die Einreichung bei der offenen Registry.

## Voraussetzungen {#prerequisites}

- Vertrautheit mit Solidity und Smart-Contract-ABIs
- Ein bereitgestellter Smart Contract mit einer verifizierten ABI (eine [Sourcify](https://sourcify.dev)-Verifizierung ist erforderlich, bevor ein Deskriptor in die Registry aufgenommen wird) 
- Python 3.12 für das Validierungs-CLI (das gepinnte Paket `erc7730` lässt sich nicht unter Python 3.13 oder neuer installieren). Wenn Ihr System-Python eine andere Version hat, kann [uv](https://docs.astral.sh/uv/) Python 3.12 für Sie herunterladen und ausführen
- Grundlegende JSON-Kenntnisse

## Was ist ein ERC-7730-Deskriptor? {#what-is-an-erc-7730-descriptor}

Ein Deskriptor ist eine einzelne JSON-Datei mit drei Abschnitten:

| Abschnitt | Zweck |
| :---- | :---- |
| `context` | Bindet den Deskriptor anhand von Chain-ID und Adresse an spezifische Vertragsbereitstellungen |
| `metadata` | Benennt das Projekt und definiert wiederverwendbare Konstanten |
| `display` | Ordnet jede Funktionssignatur menschenlesbaren Labels und Feldformaten zu |

Da der Deskriptor vom Vertrag selbst getrennt ist, können Sie jedem bestehenden Protokoll Clear-Signing-Unterstützung hinzufügen, ohne es neu bereitzustellen. Wallets rufen Deskriptoren aus der Registry ab und verwenden sie zum Zeitpunkt des Signierens.

## Schritt 1: Das Dateigerüst erstellen {#step-1-create-the-file-skeleton}

Erstellen Sie eine Datei namens `calldata-<ContractName>.json`, zum Beispiel `calldata-SwapRouter.json`. Das Präfix `calldata-` teilt der Registry mit, dass dieser Deskriptor Vertragsfunktionsaufrufe abdeckt, im Gegensatz zu `eip712-` für Typed-Data-Nachrichten. Wenn Sie mehrere Versionen eines Vertrags beschreiben müssen, fügen Sie die Vertragsversion in den Namen ein, wie in `calldata-UniswapV3Router02.json` der Registry.


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

## Schritt 2: Den Kontext-Abschnitt schreiben {#step-2-write-the-context-section}

Der Abschnitt `context` bindet den Deskriptor an eine oder mehrere Vertragsbereitstellungen. Wallets verwenden dies, um eine eingehende Transaktion dem richtigen Deskriptor zuzuordnen.

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

### Kontext-Felder {#context-fields}

- `context.$id` — Eine eindeutige Kennung für dieses Deskriptordokument oder diese Bereitstellungskonfiguration.
- `contract.deployments` — Die Menge der Bereitstellungen, auf die dieser Deskriptor zutrifft.
- `deployments[].chainId` — Die EVM-Chain-ID für eine Bereitstellung. Schließen Sie jede Chain ein, auf der Ihr Vertrag bereitgestellt ist.
- `deployments[].address` — Die Vertragsadresse, die Wallets mit diesem Deskriptor verknüpfen sollten. Dies ist die Adresse, an die Benutzer tatsächlich Transaktionen senden. Wenn Ihr Vertrag aktualisierbar ist, ist das die Proxy-Adresse, nicht die Implementierungsadresse, während die Funktionssignaturen in `display.formats` aus der ABI der Implementierung stammen.

## Schritt 3: Den Metadaten-Abschnitt schreiben {#step-3-write-the-metadata-section}

Der Metadaten-Abschnitt bietet menschenlesbare Informationen über das Projekt und den Vertrag, die in dieser Datei beschrieben werden. Wallets können diese Informationen verwenden, um während des Signierens Protokollnamen, Links und andere kontextbezogene Details anzuzeigen.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Metadaten-Felder {#metadata-fields}

- `owner` — Das Projekt, Protokoll, die Organisation oder der Maintainer, der für diesen Deskriptor verantwortlich ist.
- `info.url` — Eine kanonische Projekt- oder Dokumentations-URL, die Wallets den Benutzern für zusätzlichen Kontext anzeigen können.
- `contractName` — Der Name des Vertrags oder der Implementierung, der durch diese Datei beschrieben wird und typischerweise mit dem verifizierten Quellcode oder der ABI übereinstimmt.

Wenn Ihre ERC-7730-Datei einen ERC-20-Vertrag beschreibt, sollten Sie auch ein Token-Objekt hinzufügen. 

## Schritt 4: Den Anzeigeformate-Abschnitt schreiben {#step-4-write-the-displayformats-section}

Das Objekt `display.formats` ordnet Funktionssignaturen menschenlesbaren Signieranweisungen zu. Auf diese Weise zeigen Wallets den Benutzern Ihre Funktion an, bevor sie eine Transaktion genehmigen!

Jeder Schlüssel ist ein menschenlesbares ABI-Fragment – die Funktionssignatur einschließlich der Parameternamen und Parametertypen, genau so, wie sie in Ihrer ABI erscheinen.


### Beispiel: Einen Token-Tausch beschreiben {#eg-describing-token-swap}

Dieses Beispiel beschreibt `swapExactTokensForTokens` aus dem Vertrag `Router02` von Uniswap V2. Der Eingabe-Token ist das erste Element von `path` und der Ausgabe-Token ist das letzte Element (`path` kann für einen Multi-Hop-Tausch mehr als zwei Elemente haben).

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

### Anzeige-Felder {#display-fields}

- **`intent`** — **(Erforderlich)** Eine kurze, benutzerfreundliche Beschreibung der Aktion, wie zum Beispiel „Tausch“.
- **`interpolatedIntent`** — **(Empfohlen)** Eine umfangreichere Satzvorlage, die formatierte Feldwerte einbettet, wie zum Beispiel `"Swap {amountIn} for at least {amountOutMin}"`. Fügen Sie dies zusammen mit `intent` ein, um einen noch benutzerfreundlicheren Deskriptor bereitzustellen, den Wallets unter Berücksichtigung möglicher Anzeigebeschränkungen anzeigen können.
- **`fields`** — **(Erforderlich)** Die geordnete Liste der Transaktionsfelder, die Wallets den Benutzern anzeigen sollten.
  - **`path`** — **(Erforderlich)** Ein Verweis auf die Transaktionsdaten. `#.fieldName` verweist auf einen decodierten Aufrufdaten-Parameter anhand des Namens in der ABI. `@.value` bezieht sich auf den ETH-Wert, der mit der Transaktion gesendet wird. Array-Elemente werden mit einem `.` vor den Klammern geschrieben: `#.path.[0]` ist das erste Element und `#.path.[-1]` das letzte. `#.path[0]` (ohne den Punkt) wird vom Linter abgelehnt.
  - **`label`** — **(Erforderlich)** Das menschenlesbare Label, das neben dem Wert angezeigt wird.
  - **`format`** — **(Empfohlen)** Steuert, wie der Wert gerendert werden soll. Gängige Formate umfassen:
    - `tokenAmount`
    - `addressName`
    - `date`

    Verwenden Sie `raw`, wenn keine zusätzliche Formatierung erforderlich ist. Einige Formate akzeptieren zusätzliche **`params`**-Konfigurationen. Zum Beispiel:

    - `tokenAmount` kann `tokenPath` verwenden, um zu identifizieren, welche Token-Adresse Dezimalstellen und Ticker-Metadaten bereitstellt.
    - `date` kann `encoding` verwenden, um zu beschreiben, wie der Zeitstempel codiert ist.

    Wenn das ausgewählte Format keine zusätzlichen Informationen erfordert, lassen Sie `params` weg.

## Der vollständige Deskriptor {#the-complete-descriptor}

Ersetzen Sie die Platzhalter-Adressen durch die Adressen Ihres bereitgestellten Vertrags. Der Linter prüft den Deskriptor anhand der verifizierten ABI an diesen Adressen, daher meldet er Fehler, bis Sie dies tun.

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

## Schritt 5: Bei der Registry einreichen {#step-5-submit-to-the-registry}

Die [ERC-7730-Registry](https://github.com/ethereum/clear-signing-erc7730-registry) ist ein offenes Repository, das von der [Ethereum Foundation](/foundation/) als neutralem Verwalter gehostet wird. Es steht jedem frei, es zu klonen und selbst zu hosten – Wallets entscheiden unabhängig, welchen Registry-Instanzen sie vertrauen.

1. Forken Sie das Repository auf GitHub
2. Erstellen Sie einen Ordner unter `registry/<your-project-name>/`
3. Platzieren Sie Ihre Datei darin: `registry/myproject/calldata-SwapRouter.json`
4. Aktualisieren Sie das Feld `$schema` auf den relativen Pfad, der innerhalb des Repos verwendet wird: `"../../specs/erc7730-v2.schema.json"`. CI lehnt hier eine URL ab.
5. Fügen Sie eine Testdatei hinzu (siehe unten)
6. Validieren Sie Ihre Dateien lokal (siehe unten)
7. Öffnen Sie einen Pull Request. Jeder Pull Request darf nur einen Ordner unter `registry/` ändern

### Eine Testdatei hinzufügen {#add-a-test-file}

Jeder Deskriptor, den Sie hinzufügen oder ändern, benötigt eine Testdatei, damit die Clear-Signing-Implementierungen dagegen geprüft werden können. Erstellen Sie `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` mit mindestens einem Testfall für jede Funktion in `display.formats`. CI leitet den Funktionsselektor jedes Formats ab und schlägt fehl, wenn keine Testtransaktion ihn aufruft.

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

- `rawTx` ist die vollständig serialisierte **unsignierte** Transaktion (hier gekürzt), nicht nur die Aufrufdaten. Echte Transaktionen an Ihren Vertrag sind die besten Testfälle.
- `dataProvider` liefert die Token-Metadaten (und optional Adress- und ENS-Namen), sodass die Tests keinen Netzwerkzugriff benötigen.
- `expected` ist das, was eine Wallet anzeigen sollte. CI rendert jeden Testfall mit den Clear-Signing-Implementierungen und meldet etwaige Unterschiede im Pull Request.

Siehe [Referenz-Testfälle](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) in der README-Datei der Registry für das vollständige Format, einschließlich Testdateien für EIP-712-Deskriptoren.

### Lokal validieren {#validate-locally}

Die Registry prüft Deskriptoren mit dem Befehlszeilentool [`erc7730`](https://github.com/sourcifyeth/python-erc7730), das in `.github/requirements.txt` gepinnt ist. Führen Sie es vom Stammverzeichnis Ihres Forks in einer Python-3.12-Umgebung aus:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Wenn Sie [uv](https://docs.astral.sh/uv/) verwenden, können Sie die virtuelle Umgebung überspringen, und uv lädt bei Bedarf Python 3.12 herunter:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Der Linter prüft den Deskriptor gegen das Schema und gegen die verifizierte ABI Ihres Vertrags. Beheben Sie jeden Fehler. Warnungen wie `Missing display format` bedeuten, dass der Vertrag Funktionen hat, die Ihr Deskriptor noch nicht beschreibt. Um auch die `$schema`-Pfade und die Testdatei so zu prüfen, wie es CI tut, lesen Sie [How to validate](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) in der README-Datei der Registry.

Wenn Sie den PR öffnen, führt CI automatisch eine Schemavalidierung durch, prüft, ob Funktionssignaturen gültige Selektoren erzeugen, bestätigt, dass die Vertragsadresse auf Sourcify verifiziert ist, und markiert ABI-Inkonsistenzen. Die Prüfergebnisse werden inline im PR angezeigt. Registry-Maintainer prüfen Einreichungen auf fehlerhafte oder potenziell bösartige Deskriptoren. Die Aufnahme in die Registry bedeutet weder ein Audit noch eine Befürwortung.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Hinweis:** Ihr Vertrag muss auf <a href="https://repo.sourcify.dev">Sourcify</a> verifiziert sein, bevor Ihr PR akzeptiert werden kann. Wenn er noch nicht verifiziert ist, <a href="https://verify.sourcify.dev/">reichen Sie zuerst eine Verifizierung ein</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Was passiert nach dem Mergen? {#what-happens-after-merging}

Alle Deskriptoren in der Registry sind für Prüfer offen. Nachdem Ihr PR gemergt wurde, kann jeder Prüfer Ihren Deskriptor überprüfen und eine kryptografische Attestierung (unter [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) veröffentlichen, die seine Richtigkeit bestätigt. 

Diese Attestierungssignale ermöglichen es Wallets, ihre eigenen Vertrauensrichtlinien anzuwenden – ein Deskriptor mit mehreren unabhängigen Attestierungen hat mehr Gewicht als einer ohne. Sie können die Prüfer-Community über [clearsigning.org](https://clearsigning.org) erreichen.

Wallets entscheiden, welche Registry sie unterstützen. Sobald sich Ihr Deskriptor in der Registry befindet, beginnen Wallets, die ERC-7730 unterstützen, ihn abzurufen, sofern er in ihrer Registry vorhanden ist, und zeigen menschenlesbare Daten an, wenn Benutzer mit Ihrem Vertrag interagieren.

## Weiterführende Literatur {#further-reading}

- [ERC-7730-Spezifikation](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730-Registry](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — Tooling, Ökosystem-Status und Governance  
- [Sourcify-Vertragsverifizierung](https://sourcify.dev)  
- [Trillion Dollar Security-Initiative](https://trilliondollarsecurity.org)

