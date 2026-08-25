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

Die meisten großen Ethereum-Exploits hatten denselben letzten Schritt: Ein Benutzer genehmigte eine Transaktion, die er nicht wirklich verstehen konnte. Hardware-Wallets zeigen rohe Hex-Aufrufdaten an und zwingen einen schlimmstenfalls dazu, Blind Signing (blindes Signieren) zu aktivieren. Software-Wallets zeigen decodierte Felder an, aber nur, wenn sie den Vertrag erkennen. Wenn sie das nicht tun – sei es, weil das Protokoll neu ist, die App kompromittiert wurde oder das Gerät offline ist –, signieren die Benutzer blind.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definiert ein Standard-JSON-Format, um zu beschreiben, was die Funktionsaufrufe Ihres Vertrags *bedeuten*. 

Eine Wallet, die ERC-7730 unterstützt, liest Ihren Deskriptor und zeigt Folgendes an:

> **Tausch**  
> Senden: 1.000 USDC  
> Minimum erhalten: 0,42 WETH  
> Protokoll: Uniswap V3

Oder einen einzigen konstruierten Satz, der für Menschen und Agenten gleichermaßen lesbar ist:

> Tausche 1.000 USDC gegen mindestens 0,42 WETH

Anstelle eines Funktionsselektors und einer Liste von rohen Integer-Werten.

Das ist [Clear Signing](https://clearsigning.org/) – „What You See Is What You Sign“ (Was du siehst, ist das, was du signierst). Dieses Tutorial führt Sie durch das Schreiben eines Deskriptors für Ihren eigenen Vertrag, dessen Validierung mit dem offiziellen CLI-Tool und die Einreichung in die offene Registry.

## Voraussetzungen {#prerequisites}

- Vertrautheit mit Solidity und Smart-Contract-ABIs
- Ein bereitgestellter Smart Contract mit einer verifizierten ABI (eine Verifizierung durch [Sourcify](https://sourcify.dev) ist erforderlich, bevor ein Deskriptor in die Registry aufgenommen wird) 
- Python 3.12+ für das Validierungs-CLI 
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

Erstellen Sie eine Datei namens `calldata-<contractname>-<descriptorversion>.json`. Das Präfix `calldata-` teilt der Registry mit, dass dieser Deskriptor Vertragsfunktionsaufrufe abdeckt, im Gegensatz zu `eip712-` für Typed-Data-Nachrichten. Das `descriptorversion` teilt der Registry die Version der Deskriptordatei mit, standardmäßig 0, wenn keine Version angegeben ist.


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
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Kontext-Felder {#context-fields}

- `context.$id` — Ein eindeutiger Bezeichner für dieses Deskriptordokument oder diese Bereitstellungskonfiguration.
- `contract.deployments` — Die Menge der Bereitstellungen, für die dieser Deskriptor gilt.
- `deployments[].chainId` — Die EVM-Chain-ID für eine Bereitstellung. Fügen Sie jede Chain hinzu, auf der Ihr Vertrag bereitgestellt ist.
- `deployments[].address` — Die Vertragsadresse, die Wallets mit diesem Deskriptor verknüpfen sollen. Verwenden Sie die Implementierungsadresse, die die Ausführungslogik enthält.

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

### Anzeige-Felder {#display-fields}

- **`intent`** — **(Erforderlich)** Eine kurze, benutzerfreundliche Beschreibung der Aktion, wie z. B. „Tausch“.
- **`interpolatedIntent`** — **(Empfohlen)** Eine umfangreichere Satzvorlage, die formatierte Feldwerte einbettet, wie z. B. `"Swap {amountIn} for at least {amountOutMin}"`. Fügen Sie dies zusammen mit `intent` hinzu, um einen noch benutzerfreundlicheren Deskriptor bereitzustellen, den Wallets je nach Anzeigebeschränkungen anzeigen können.
- **`fields`** — **(Erforderlich)** Die geordnete Liste der Transaktionsfelder, die Wallets den Benutzern anzeigen sollen.
  - **`path`** — **(Erforderlich)** Ein Verweis auf die Transaktionsdaten. `#.fieldName` verweist auf einen decodierten Aufrufdaten-Parameter anhand des Namens in der ABI. `@.value` bezieht sich auf den mit der Transaktion gesendeten ETH-Wert.
  - **`label`** — **(Erforderlich)** Das menschenlesbare Label, das neben dem Wert angezeigt wird.
  - **`format`** — **(Empfohlen)** Steuert, wie der Wert gerendert werden soll. Gängige Formate sind:
    - `tokenAmount`
    - `addressName`
    - `date`

    Verwenden Sie `raw`, wenn keine zusätzliche Formatierung erforderlich ist. Einige Formate akzeptieren eine zusätzliche **`params`**-Konfiguration. Zum Beispiel:

    - `tokenAmount` kann `tokenPath` verwenden, um zu identifizieren, welche Token-Adresse Dezimalstellen und Ticker-Metadaten bereitstellt.
    - `date` kann `encoding` verwenden, um zu beschreiben, wie der Zeitstempel codiert ist.

    Wenn das ausgewählte Format keine zusätzlichen Informationen erfordert, lassen Sie `params` weg.

## Der vollständige Deskriptor {#the-complete-descriptor}

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

## Schritt 5: In die Registry einreichen {#step-5-submit-to-the-registry}

Die [ERC-7730-Registry](https://github.com/ethereum/clear-signing-erc7730-registry) ist ein offenes Repository, das von der [Ethereum Foundation](/foundation/) als neutralem Verwalter gehostet wird. Es steht jedem frei, sie zu klonen und selbst zu hosten – Wallets entscheiden unabhängig, welchen Registry-Instanzen sie vertrauen.

1. Forken Sie das Repository auf GitHub  
2. Erstellen Sie einen Ordner unter `registry/<your-project-name>/`  
3. Legen Sie Ihre Datei darin ab: `registry/myproject/calldata-mycontract-0_0.json`  
4. Aktualisieren Sie das Feld `$schema` auf den relativen Pfad, der innerhalb des Repos verwendet wird: `"../../specs/erc7730-v2.schema.json"`  
5. Öffnen Sie einen Pull Request

Wenn Sie den PR öffnen, führt die CI automatisch eine Schema-Validierung durch, prüft, ob Funktionssignaturen gültige Selektoren erzeugen, bestätigt, dass die Vertragsadresse auf Sourcify verifiziert ist, und markiert ABI-Inkonsistenzen. Die Prüfergebnisse erscheinen direkt im PR. Die Maintainer der Registry überprüfen Einreichungen auf fehlerhafte oder potenziell bösartige Deskriptoren. Die Aufnahme in die Registry bedeutet weder ein Audit noch eine Befürwortung.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Hinweis:** Ihr Vertrag muss auf <a href="https://repo.sourcify.dev">Sourcify</a> verifiziert sein, bevor Ihr PR akzeptiert werden kann. Wenn er noch nicht verifiziert ist, <a href="https://verify.sourcify.dev/">reichen Sie zuerst die Verifizierung ein</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Was passiert nach dem Mergen? {#what-happens-after-merging}

Alle Deskriptoren in der Registry sind für Prüfer offen. Nachdem Ihr PR gemergt wurde, kann jeder Prüfer Ihren Deskriptor überprüfen und eine kryptografische Attestierung (unter [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) veröffentlichen, die seine Richtigkeit bestätigt. 

Diese Attestierungssignale ermöglichen es Wallets, ihre eigenen Vertrauensrichtlinien anzuwenden – ein Deskriptor mit mehreren unabhängigen Attestierungen hat mehr Gewicht als einer ohne. Sie können die Prüfer-Community über [clearsigning.org](https://clearsigning.org) erreichen.

Wallets entscheiden, welche Registry sie unterstützen. Sobald sich Ihr Deskriptor in der Registry befindet, beginnen Wallets, die ERC-7730 unterstützen, ihn abzurufen, sofern er in ihrer Registry vorhanden ist, und zeigen menschenlesbare Daten an, wenn Benutzer mit Ihrem Vertrag interagieren.

## Weiterführende Literatur {#further-reading}

- [ERC-7730-Spezifikation](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730-Registry](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — Tooling, Ökosystem-Status und Governance  
- [Sourcify-Vertragsverifizierung](https://sourcify.dev)  
- [Trillion Dollar Security-Initiative](https://trilliondollarsecurity.org)