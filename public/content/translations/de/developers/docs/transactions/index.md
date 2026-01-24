---
title: Transaktionen
description: "Eine Übersicht über die Transaktionen von Ethereum – wie sie arbeiten, ihre Datenstruktur und wie sie über eine App gesendet werden."
lang: de
---

Transaktionen sind kryptographisch signierte Anweisungen von Konten. Ein Konto wird eine Transaktion starten, um den Zustand des Ethereum-Netzwerks zu aktualisieren. Die einfachste Transaktion ist die Übertragung von ETH von einem Konto auf ein anderes.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst [Konten](/developers/docs/accounts/) und unsere [Einführung in Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Was ist eine Transaktion? {#whats-a-transaction}

Eine Transaktion von Ethereum bezieht sich auf eine Aktion, die von einem externen Konto initiiert wird; mit anderen Worten auf ein Konto, das von einem Menschen verwaltet wird und nicht von einem Vertrag. Wenn zum Beispiel Bob Alice 1 ETH sendet, muss Bobs Konto belastet werden und das von Alice muss eine Gutschrift erhalten. Diese zustandsverändernde Aktion findet innerhalb einer Transaktion statt.

![Diagramm, das eine Zustandsänderung durch eine Transaktion zeigt](./tx.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transaktionen, die den Zustand der EVM verändern, müssen auf das gesamte Netzwerk übertragen werden. Jeder Knoten kann eine Anfrage zur Ausführung einer Transaktion an die EVM senden, woraufhin ein Validator die Transaktion ausführt und die daraus resultierende Statusänderung an den Rest des Netzwerks weitergibt.

Transaktionen sind gebührenpflichtig und müssen in einem validierten Block enthalten sein. Um diesen Überblick zu vereinfachen, werden wir die Gas-Kosten und Validierungsgebühren an anderer Stelle behandeln.

Eine abgeschlossene Transaktion enthält folgende Informationen:

- `from` – die Adresse des Absenders, der die Transaktion unterzeichnen wird. Es handelt sich dabei um ein externes Konto, da Vertragskonten keine Transaktionen senden können
- `to` – die Empfängeradresse (wenn es sich um ein Konto in externem Besitz handelt, wird die Transaktion einen Wert übertragen. Bei einem Smart-Contract-Konto führt die Transaktion den Vertragscode aus.)
- `signature` – die Kennung des Absenders. Das wird generiert, wenn der private Schlüssel des Absenders die Transaktion signiert und bestätigt, dass der Absender diese Transaktion autorisiert hat.
- `nonce` – ein sequenziell inkrementierender Zähler, der die Transaktionsnummer des Kontos angibt
- `value` – der Betrag an ETH, der vom Absender an den Empfänger überwiesen werden soll (in WEI, wobei 1 ETH 1e+18 wei entspricht)
- `input data` – optionales Feld zur Aufnahme beliebiger Daten
- `gasLimit` – die maximale Menge an Gaseinheiten, die von der Transaktion verbraucht werden können. Die [EVM](/developers/docs/evm/opcodes) gibt die für jeden Berechnungsschritt erforderlichen Gaseinheiten an
- `maxPriorityFeePerGas` – der Höchstpreis des verbrauchten Gases, der als Trinkgeld für den Validator enthalten ist
- `maxFeePerGas` – die maximale Gebühr pro Gaseinheit, die für die Transaktion zu zahlen ist (einschließlich `baseFeePerGas` und `maxPriorityFeePerGas`)

Gas ist ein Hinweis auf die Berechnung, die für die Bearbeitung der Transaktion durch einen Validierer erforderlich ist. Benutzer müssen für diese Berechnung eine Gebühr bezahlen. Das `gasLimit` und `maxPriorityFeePerGas` bestimmen die maximale Transaktionsgebühr, die an den Validator gezahlt wird. [Mehr über Gas](/developers/docs/gas/).

Das Transaktionsobjekt wird in etwa wie folgt aussehen:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Aber ein Transaktionsobjekt muss mit dem privaten Schlüssel des Absenders signiert werden. Dies beweist, dass die Transaktion nur vom Absender hätte kommen können und nicht betrügerisch verschickt wurde.

Ein Ethereum-Client wie Geth wird diesen Signaturprozess bearbeiten.

Beispiel für einen [JSON-RPC](/developers/docs/apis/json-rpc)-Aufruf:

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Beispielantwort:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` ist die signierte Transaktion in [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)-kodierter Form
- `tx` ist die signierte Transaktion in JSON-Form

Mit dem Signatur-Hash kann für die Transaktion kryptographisch nachgewiesen werden, dass sie vom Absender stammt und dem Netzwerk übermittelt wurde.

### Das Datenfeld {#the-data-field}

Die überwiegende Mehrheit der Transaktionen greift auf einen Vertrag über ein externes Konto zu.
Die meisten Verträge sind in Solidity geschrieben und interpretieren ihr Datenfeld gemäß der [Application Binary Interface (ABI)](/glossary/#abi).

Die ersten vier Bytes geben an, welche Funktion aufgerufen werden soll, wobei der Hash des Funktionsnamens und der Argumente verwendet wird.
Manchmal kannst du die Funktion aus dem Selektor mithilfe [dieser Datenbank](https://www.4byte.directory/signatures/) identifizieren.

Der Rest der Calldata sind die Argumente, [kodiert wie in den ABI-Spezifikationen angegeben](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Schauen wir uns zum Beispiel [diese Transaktion](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1) an.
Klicke auf **Click to see More**, um die Calldata zu sehen.

Der Funktionsselektor ist `0xa9059cbb`. Es gibt mehrere [bekannte Funktionen mit dieser Signatur](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
In diesem Fall wurde [der Quellcode des Vertrags](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) auf Etherscan hochgeladen, also wissen wir, dass die Funktion `transfer(address,uint256)` lautet.

Der Rest der Daten lautet:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Entsprechend den ABI-Spezifikationen erscheinen Ganzzahlwerte (wie Adressen, die 20-Byte-Ganzzahlen sind) in ABI als 32-Byte-Wörter, die vorne mit Nullen aufgefüllt werden.
Wir wissen also, dass die `to`-Adresse [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279) ist.
Der `value` ist 0x3b0559f4 = 990206452.

## Arten von Transaktionen {#types-of-transactions}

Bei Ethereum gibt es ein paar verschiedene Arten von Transaktionen:

- Reguläre Transaktionen: eine Transaktion von einem Konto auf ein anderes.
- Vertragseinsatz-Transaktionen: eine Transaktion ohne "An"-Adresse, bei der das Datenfeld für den Vertragscode verwendet wird.
- Ausführung eines Vertrags: eine Transaktion, die mit einem bereitgestellten Smart Contract interagiert. In diesem Fall ist die Adresse von "to" die des Smart Contracts.

### Über Gas {#on-gas}

Wie bereits erwähnt, kostet die Ausführung von Transaktionen [Gas](/developers/docs/gas/). Einfache Überweisungstransaktionen erfordern 21000 Gas.

Damit Bob Alice 1 ETH bei einer `baseFeePerGas` von 190 Gwei und einer `maxPriorityFeePerGas` von 10 Gwei senden kann, muss Bob die folgende Gebühr bezahlen:

```
(190 + 10) * 21000 = 4.200.000 gwei
--oder--
0,0042 ETH
```

Bobs Konto wird mit **-1,0042 ETH** belastet (1 ETH für Alice + 0,0042 ETH an Gasgebühren)

Alices Konto wird **+1,0 ETH** gutgeschrieben

Die Grundgebühr wird verbrannt **-0,00399 ETH**

Der Validator behält das Trinkgeld **+0,000210 ETH**

![Diagramm, das zeigt, wie ungenutztes Gas zurückerstattet wird](./gas-tx.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Jedes Gas, das nicht in einer Transaktion verwendet wird, wird auf das Benutzerkonto zurückerstattet.

### Interaktionen mit Smart Contracts {#smart-contract-interactions}

Gas wird für jede Transaktion benötigt, die Smart Contracts betrifft.

Smart Contracts können auch Funktionen enthalten, die als [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions)- oder [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions)-Funktionen bekannt sind und den Zustand des Vertrags nicht verändern. Daher ist es nicht erforderlich, Gas zu zahlen, wenn diese Funktionen von einem externen Konto (EOA) aufgerufen werden. Der zugrunde liegende RPC-Aufruf für dieses Szenario ist [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Im Gegensatz zum Zugriff über `eth_call` werden diese `view`- oder `pure`-Funktionen auch häufig intern aufgerufen (d.h. vom Vertrag selbst oder von einem anderen Vertrag), was Gas kostet.

## Lebenszyklus einer Transaktion {#transaction-lifecycle}

Sobald die Transaktion abgeschickt wurde, passiert Folgendes:

1. Ein Transaktions-Hash wird kryptografisch generiert:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Die Transaktion wird dann an das Netzwerk weitergeleitet und zu einem Transaktionspool hinzugefügt, der aus allen anderen ausstehenden Netztransaktionen besteht.
3. Ein Validator muss Ihre Transaktion auswählen und in einem Block hinzufügen, um die Transaktion zu verifizieren und sie als "erfolgreich" zu bezeichnen.
4. Mit der Zeit wird der Block, der Ihre Transaktion enthält, auf "justified" und dann auf " finalized" hochgestuft. Diese Upgrades geben eine viel
   größere Sicherheit, dass deine Transaktion erfolgreich war und niemals geändert wird. Sobald ein Block „finalisiert“ ist, kann er nur durch einen
   Angriff auf Netzwerkebene geändert werden, der viele Milliarden Dollar kosten würde.

## Eine visuelle Demo {#a-visual-demo}

Schaue Austin bei einer Führung durch Transaktionen, Gas und Mining zu.

<YouTube id="er-0ihqFQB0" />

## Typisierter Transaktions-Envelope {#typed-transaction-envelope}

Ursprünglich hatte Ethereum ein einziges Format für Transaktionen. Jede Transaktion enthielt eine Nonce, einen Gaspreis, ein Gaslimit, eine Zieladresse, einen Wert, Daten, v, r und s. Diese Felder sind [RLP-kodiert](/developers/docs/data-structures-and-encoding/rlp/), um etwa so auszusehen:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum hat sich weiterentwickelt, um mehrere Arten von Transaktionen zu unterstützen, damit neue Funktionen wie Zugriffslisten und [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) implementiert werden können, ohne die alten Transaktionsformate zu beeinträchtigen.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) ist das, was dieses Verhalten ermöglicht. Transaktionen werden wie folgt interpretiert:

`TransactionType || TransactionPayload`

Die Felder sind wie folgt definiert:

- `TransactionType` – eine Zahl zwischen 0 und 0x7f, für insgesamt 128 mögliche Transaktionstypen.
- `TransactionPayload` – ein beliebiges Byte-Array, das durch den Transaktionstyp definiert wird.

Basierend auf dem `TransactionType`-Wert kann eine Transaktion wie folgt klassifiziert werden:

1. **Typ-0-Transaktionen (Legacy):** Das ursprüngliche Transaktionsformat, das seit dem Start von Ethereum verwendet wird. Sie enthalten keine Funktionen von [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), wie z. B. dynamische Gasgebührenberechnungen oder Zugriffslisten für Smart Contracts. Legacy-Transaktionen fehlt in ihrer serialisierten Form ein spezifisches Präfix, das ihren Typ angibt. Sie beginnen mit dem Byte `0xf8`, wenn die [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)-Kodierung verwendet wird. Der TransactionType-Wert für diese Transaktionen ist `0x0`.

2. **Typ-1-Transaktionen:** Eingeführt in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) als Teil des [Berlin-Upgrades](/ethereum-forks/#berlin) von Ethereum, enthalten diese Transaktionen einen `accessList`-Parameter. Diese Liste gibt Adressen und Speicherschlüssel an, auf die die Transaktion zugreifen soll, was dazu beitragen kann, die [Gas](/developers/docs/gas/)-Kosten für komplexe Transaktionen mit Smart Contracts zu reduzieren. Änderungen des EIP-1559-Gebührenmarkts sind in Typ-1-Transaktionen nicht enthalten. Typ-1-Transaktionen enthalten auch einen `yParity`-Parameter, der entweder `0x0` oder `0x1` sein kann und die Parität des y-Wertes der secp256k1-Signatur anzeigt. Sie werden durch das Startbyte `0x01` identifiziert, und ihr TransactionType-Wert ist `0x1`.

3. **Typ-2-Transaktionen**, allgemein als EIP-1559-Transaktionen bezeichnet, sind Transaktionen, die mit [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) im Rahmen des [London-Upgrades](/ethereum-forks/#london) von Ethereum eingeführt wurden. Diese haben sich zur Standardform für Transaktionen auf dem Ethereum-Netzwerk entwickelt. Diese Transaktionen führen einen neuen Gebührenmarktmechanismus ein, der durch die Trennung der Transaktionsgebühr in eine Basisgebühr und eine Prioritätsgebühr die Vorhersehbarkeit verbessert. Sie beginnen mit dem Byte `0x02` und enthalten Felder wie `maxPriorityFeePerGas` und `maxFeePerGas`. Typ-2-Transaktionen sind aufgrund ihrer Flexibilität und Effizienz nun der Standard und werden besonders in Zeiten hoher Netzwerkbelastung bevorzugt – aufgrund ihrer Fähigkeit, den Benutzern eine besser vorhersehbare Verwaltung der Transaktionsgebühren zu ermöglichen. Der TransactionType-Wert für diese Transaktionen ist `0x2`.

4. **Typ-3-Transaktionen (Blob)** wurden in [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) als Teil des [Dencun-Upgrades](/ethereum-forks/#dencun) von Ethereum eingeführt. Diese Transaktionen sind darauf ausgelegt, „Bloß“-Daten (Binary große Objekte) effizienter zu verarbeiten, was insbesondere Layer-2-Rollups zugutekommt, da sie eine Möglichkeit bieten, Daten zu geringeren Kosten im Ethereum-Netzwerk zu veröffentlichen. Blob-Transaktionen enthalten zusätzliche Felder wie `blobVersionedHashes`, `maxFeePerBlobGas` und `blobGasPrice`. Sie beginnen mit dem Byte `0x03`, und ihr TransactionType-Wert ist `0x3`. Blau-Transaktionen stellen eine erhebliche Verbesserung der Datenverfügbarkeit und Skalierbarkeit von Ethereum dar.

5. **Typ-4-Transaktionen** wurden in [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) als Teil des [Pectra-Upgrades](/roadmap/pectra/) von Ethereum eingeführt. Diese Transaktionen sind so konzipiert, dass sie vorwärtskompatibel mit der Kontoabstraktion sind. Sie ermöglichen es EOAs, sich vorübergehend wie Smart-Contract-Konten zu verhalten, ohne ihre ursprüngliche Funktionalität zu beeinträchtigen. Sie enthalten einen `authorization_list`-Parameter, der den Smart Contract angibt, an den das EOA seine Autorität delegiert. Nach der Transaktion enthält das Code-Feld des EOA die Adresse des delegierten Smart Contracts.

## Weiterführende Lektüre {#further-reading}

- [EIP-2718: Typisierter Transaktions-Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Konten](/developers/docs/accounts/)
- [Ethereum Virtual Machine (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
