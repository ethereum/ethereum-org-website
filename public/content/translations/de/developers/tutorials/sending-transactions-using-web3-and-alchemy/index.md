---
title: Senden von Transaktionen mit viem
description: "Dies ist ein anfängerfreundlicher Leitfaden zum Senden von Ethereum-Transaktionen mit der viem-Bibliothek. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir werden alle drei durchgehen."
author: "Elan Halpern"
tags: ["Transaktionen", "viem", "Alchemy"]
skill: beginner
breadcrumb: Transaktionen senden
lang: de
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Dies ist ein anfängerfreundlicher Leitfaden zum Senden von Ethereum-Transaktionen mit der [viem](https://viem.sh/)-Bibliothek. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir werden alle drei durchgehen und hoffentlich alle deine Fragen beantworten! In diesem Tutorial verwenden wir [Alchemy](https://www.alchemy.com/), um unsere Transaktionen an die Ethereum-Chain zu senden. Du kannst [hier ein kostenloses Alchemy-Konto erstellen](https://auth.alchemy.com/signup).

**HINWEIS:** Dieser Leitfaden ist für das Signieren deiner Transaktionen im _Backend_ deiner App gedacht. Wenn du das Signieren deiner Transaktionen im Frontend integrieren möchtest, sieh dir die [MetaMask-Provider-API](https://docs.metamask.io/wallet/reference/provider-api/) an.

## Die Grundlagen {#the-basics}

Wie die meisten Blockchain-Entwickler zu Beginn hast du vielleicht recherchiert, wie man eine Transaktion sendet (etwas, das eigentlich ziemlich einfach sein sollte), und bist auf eine Fülle von Leitfäden gestoßen, die alle etwas anderes sagen und dich ein wenig überfordert und verwirrt zurücklassen. Wenn es dir so geht, mach dir keine Sorgen; das ging uns allen irgendwann so! Bevor wir also anfangen, lass uns ein paar Dinge klarstellen:

### 1\. Alchemy speichert deine privaten Schlüssel nicht {#alchemy-does-not-store-your-private-keys}

- Das bedeutet, dass Alchemy keine Transaktionen in deinem Namen signieren und senden kann. Der Grund dafür sind Sicherheitsaspekte. Alchemy wird dich niemals bitten, deinen privaten Schlüssel weiterzugeben, und du solltest deinen privaten Schlüssel niemals an einen gehosteten Knoten (oder überhaupt an jemanden) weitergeben.
- Du kannst mit der Core-API von Alchemy von der Blockchain lesen, aber um darauf zu schreiben, musst du etwas anderes verwenden, um deine Transaktionen zu signieren, bevor du sie über Alchemy sendest (das gilt auch für jeden anderen [Knoten-Dienst](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Was ist ein „Signer“? {#what-is-a-signer}

- Signer signieren Transaktionen für dich mit deinem privaten Schlüssel. In diesem Tutorial verwenden wir [viem](https://viem.sh/), um unsere Transaktion zu signieren, aber du könntest auch jede andere Web3-Bibliothek verwenden.
- Im Frontend wäre ein gutes Beispiel für einen Signer [MetaMask](https://metamask.io/), das Transaktionen in deinem Namen signiert und sendet.

### 3\. Warum muss ich meine Transaktionen signieren? {#why-do-i-need-to-sign-my-transactions}

- Jeder Benutzer, der eine Transaktion im Ethereum-Netzwerk senden möchte, muss die Transaktion (mit seinem privaten Schlüssel) signieren, um zu validieren, dass der Ursprung der Transaktion derjenige ist, der er vorgibt zu sein.
- Es ist extrem wichtig, diesen privaten Schlüssel zu schützen, da der Zugriff darauf die volle Kontrolle über dein Ethereum-Konto gewährt und es dir (oder jedem mit Zugriff) ermöglicht, Transaktionen in deinem Namen durchzuführen.

### 4\. Wie schütze ich meinen privaten Schlüssel? {#how-do-i-protect-my-private-key}

- Es gibt viele Möglichkeiten, deinen privaten Schlüssel zu schützen und ihn zum Senden von Transaktionen zu verwenden. In diesem Tutorial verwenden wir eine `.env`-Datei. Du könntest jedoch auch einen separaten Anbieter verwenden, der private Schlüssel speichert, eine Schlüsselspeicher-Datei (Keystore) nutzen oder andere Optionen wählen.

### 5\. Was ist der Unterschied zwischen `eth_sendTransaction` und `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` und `eth_sendRawTransaction` sind beides Ethereum-API-Funktionen, die eine Transaktion an das Ethereum-Netzwerk übertragen, damit sie einem zukünftigen Block hinzugefügt wird. Sie unterscheiden sich darin, wie sie das Signieren der Transaktionen handhaben.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) wird zum Senden _unsignierter_ Transaktionen verwendet. Das bedeutet, dass der Knoten, an den du sendest, deinen privaten Schlüssel verwalten muss, damit er die Transaktion signieren kann, bevor er sie an die Chain überträgt. Da Alchemy die privaten Schlüssel der Benutzer nicht speichert, wird diese Methode nicht unterstützt.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) wird verwendet, um Transaktionen zu übertragen, die bereits signiert wurden. Das bedeutet, dass du die Transaktion zuerst mit deinem privaten Schlüssel signieren musst (in viem mit [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) und einem [lokalen Konto](https://viem.sh/docs/accounts/local/privateKeyToAccount)), und dann das Ergebnis an `eth_sendRawTransaction` übergibst.

Bei der Verwendung von viem wird auf `eth_sendRawTransaction` zugegriffen, indem die Funktion [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction) aufgerufen wird.

Genau das werden wir in diesem Tutorial verwenden.

### 6\. Was ist die Web3-Bibliothek? {#what-is-the-web3-library}

- Eine Web3-Bibliothek ist ein Wrapper um die standardmäßigen [JSON-RPC-Aufrufe](/developers/docs/apis/json-rpc/), der in der Ethereum-Entwicklung sehr häufig verwendet wird.
- Es gibt viele Web3-Bibliotheken für verschiedene Sprachen. In diesem Tutorial verwenden wir [viem](https://viem.sh/), das in TypeScript geschrieben ist und in jedem JavaScript-Projekt funktioniert. Du kannst dir [hier](/developers/docs/apis/javascript/) andere Optionen wie [Ethers.js](https://docs.ethers.org/v6/) ansehen.

Okay, da wir nun einige dieser Fragen geklärt haben, machen wir mit dem Tutorial weiter. Du kannst jederzeit Fragen im Alchemy-[Discord](https://discord.gg/gWuC7zB) stellen!

### 7\. Wie sendet man sichere, gasoptimierte und private Transaktionen? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy verfügt über eine Reihe von Transaktionsressourcen](https://www.alchemy.com/docs/sending-transactions). Du kannst diese verwenden, um Transaktionen zu senden, Transaktionen vor ihrer Ausführung zu simulieren sowie private und gasoptimierte Transaktionen zu senden.
- Du kannst auch [Alchemy-Webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) verwenden, um benachrichtigt zu werden, wenn deine Transaktion aus dem Mempool geholt und der Chain hinzugefügt wird.

**HINWEIS:** Dieser Leitfaden erfordert ein Alchemy-Konto, eine Ethereum-Adresse oder MetaMask-Wallet sowie installierte Node.js und npm. Wenn nicht vorhanden, befolge diese Schritte:

1.  [Erstelle ein kostenloses Alchemy-Konto](https://auth.alchemy.com/signup)
2.  [Erstelle ein MetaMask-Konto](https://metamask.io/) (oder besorge dir eine Ethereum-Adresse)
3.  [Installiere Node.js und npm](https://nodejs.org/en/download/)
## Schritte zum Senden deiner Transaktion {#steps-to-sending-your-transaction}

### 1\. Erstelle eine Alchemy-App im Sepolia-Testnetz {#create-an-alchemy-app-on-the-sepolia-testnet}

Navigiere zu deinem [Alchemy-Dashboard](https://dashboard.alchemy.com/) und erstelle eine neue App, wobei du Sepolia (oder ein anderes Testnetz) als dein Netzwerk auswählst.

### 2\. Fordere ETH vom Sepolia-Faucet an {#request-eth-from-sepolia-faucet}

Befolge die Anweisungen auf dem [Alchemy-Sepolia-Faucet](https://www.alchemy.com/faucets/ethereum-sepolia), um ETH zu erhalten, oder verwende eines der anderen [Sepolia-Faucets](/developers/docs/networks/#sepolia). Faucets geben kleine Beträge aus (das Alchemy-Faucet gibt 0,1 ETH pro Tag), was für dieses Tutorial völlig ausreicht. Stelle sicher, dass du deine **Sepolia**-Ethereum-Adresse (von MetaMask) und nicht die eines anderen Netzwerks angibst. Nachdem du die Anweisungen befolgt hast, überprüfe noch einmal, ob du die ETH in deiner Wallet erhalten hast.

### 3\. Erstelle ein neues Projektverzeichnis und wechsle mit `cd` dorthin {#create-a-new-project-direction}

Erstelle über die Befehlszeile (Terminal bei Macs) ein neues Projektverzeichnis und navigiere dorthin:

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installiere viem (oder eine beliebige Web3-Bibliothek) {#install-alchemy-web3}

Führe den folgenden Befehl in deinem Projektverzeichnis aus, um [viem](https://viem.sh/) zu installieren:

Hinweis: Wenn du die Ethers.js-Bibliothek verwenden möchtest, [befolge die Anweisungen hier](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Installiere dotenv {#install-dotenv}

Wir verwenden eine `.env`-Datei, um unseren API-Schlüssel und unseren privaten Schlüssel sicher zu speichern.

```sh
npm install dotenv
```

### 6\. Erstelle die `.env`-Datei {#create-the-dotenv-file}

Erstelle eine `.env`-Datei in deinem Projektverzeichnis und füge Folgendes hinzu (ersetze dabei „`your-api-url`“ und „`your-private-key`“):

- Um deine Alchemy-API-URL zu finden, navigiere zur App-Detailseite der App, die du gerade in deinem Dashboard erstellt hast, klicke oben rechts auf „View Key“ und kopiere die HTTP-URL.
- Um deinen privaten Schlüssel mit MetaMask zu finden, sieh dir diesen [Leitfaden](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) an. Verwende ein Konto, das nur Testnetz-ETH enthält.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Commite <code>.env</code> nicht! Bitte stelle sicher, dass du deine <code>.env</code>-Datei niemals mit jemandem teilst oder offenlegst, da du dadurch deine Geheimnisse kompromittierst. Wenn du eine Versionskontrolle verwendest, füge deine <code>.env</code> zu einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Erstelle die Datei `sendTx.js` {#create-sendtx-js}

Großartig, da wir nun unsere sensiblen Daten in einer `.env`-Datei geschützt haben, können wir mit dem Programmieren beginnen. Für unser Beispiel zum Senden einer Transaktion senden wir 0,001 ETH an eine andere Adresse, die du kontrollierst, wie z. B. ein zweites Konto in MetaMask.

Erstelle eine Datei `sendTx.js`, in der wir unsere Beispieltransaktion konfigurieren und senden werden, und füge ihr die folgenden Codezeilen hinzu:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // Nonce beginnt bei 0 zu zählen

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: Ersetze durch die Adresse, an die du ETH senden möchtest
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // optionales Datenfeld, um eine Nachricht zu senden oder einen Smart Contract auszuführen
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Stelle sicher, dass du `0xYourSecondAddress` durch die Adresse ersetzt, an die du ETH senden möchtest. Das Skript leitet deine eigene (sendende) Adresse aus `PRIVATE_KEY` ab, sodass du sie nicht eingeben musst.

Bevor wir nun diesen Code ausführen, lass uns über einige der Komponenten hier sprechen.

- `account`: Ein lokales Konto, das aus deinem privaten Schlüssel mit [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) erstellt wurde. Das Signieren erfolgt auf deinem Rechner, und der private Schlüssel wird niemals an Alchemy gesendet.
- `publicClient` und `walletClient`: viem-Clients, die JSON-RPC-Anfragen an deine Alchemy-URL senden. Der Public Client liest von der Chain, und der Wallet Client bereitet Transaktionen für dein Konto vor und signiert sie.
- `nonce`: Die Nonce-Spezifikation wird verwendet, um die Anzahl der von deiner Adresse gesendeten Transaktionen zu verfolgen. Wir benötigen dies aus Sicherheitsgründen und um Replay-Angriffe zu verhindern. Um die Anzahl der von deiner Adresse gesendeten Transaktionen zu erhalten, verwenden wir [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). viem würde dies auch für dich ausfüllen, aber wir rufen es hier explizit ab, um zu zeigen, woher es kommt.
- `transaction`: Das Transaktionsobjekt hat einige Aspekte, die wir spezifizieren müssen. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) füllt den Rest für uns aus, einschließlich der `chainId` und der [EIP-1559](/developers/docs/gas/)-Gebührenfelder `maxFeePerGas` und `maxPriorityFeePerGas`, basierend auf den aktuellen Netzwerkbedingungen.
  - `to`: Dies ist die Adresse, an die wir ETH senden möchten.
  - `value`: Dies ist der Betrag, den wir senden möchten, angegeben in Wei, wobei 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) konvertiert einen ETH-Betrag für uns in Wei. Dein Konto benötigt etwas mehr als das, da es auch für Gas bezahlt.
  - `gas`: Es gibt viele Möglichkeiten, die richtige Menge an Gas zu bestimmen, die in deine Transaktion aufgenommen werden soll. Alchemy unterstützt [Webhooks](https://www.alchemy.com/docs/reference/webhooks-overview), die dich über Onchain-Aktivitäten benachrichtigen können. Für Mainnet-Transaktionen ist es eine gute Praxis, die aktuellen Gasbedingungen zu überprüfen, um die richtige Menge an Gas zu bestimmen. Ein einfacher ETH-Transfer an eine gewöhnliche Adresse verbraucht immer genau 21000 Gas, was das Minimum für jede Transaktion ist, also setzen wir hier 21000 ein. Wenn du `gas` weglässt, schätzt viem es für dich.
  - `nonce`: Siehe obige Nonce-Definition. Die Nonce beginnt bei Null zu zählen.
  - [OPTIONAL] data: Wird zum Senden zusätzlicher Informationen mit deinem Transfer oder zum Aufrufen eines Smart Contracts verwendet. Für Guthabentransfers nicht erforderlich, siehe den Hinweis unten.
- `signedTx`: Um unser Transaktionsobjekt zu signieren, verwenden wir die Methode `signTransaction`, die es lokal mit dem aus unserem `PRIVATE_KEY` erstellten Konto signiert.
- `sendRawTransaction`: Sobald wir eine signierte Transaktion haben, können wir sie mit `sendRawTransaction`, das `eth_sendRawTransaction` aufruft, senden, damit sie in einen nachfolgenden Block aufgenommen wird.
- `waitForTransactionReceipt`: Wartet, bis die Transaktion in einen Block aufgenommen wurde, und gibt ihren Transaktionsbeleg zurück.

**Ein Hinweis zu data**
Es gibt zwei Hauptarten von Transaktionen, die in Ethereum gesendet werden können.

- Guthabentransfer: Sende ETH von einer Adresse an eine andere. Es ist kein Datenfeld erforderlich. Wenn du jedoch zusätzliche Informationen zusammen mit deiner Transaktion senden möchtest, kannst du diese Informationen im HEX-Format in dieses Feld aufnehmen.
  - Nehmen wir zum Beispiel an, wir wollten den Hash eines IPFS-Dokuments in die Ethereum-Chain schreiben, um ihm einen unveränderlichen Zeitstempel zu geben. Unser Datenfeld sollte dann wie `data: toHex("IPFS hash")` aussehen, unter Verwendung von viems [`toHex`](https://viem.sh/docs/utilities/toHex). Und nun kann jeder die Chain abfragen und sehen, wann dieses Dokument hinzugefügt wurde.
- Smart-Contract-Transaktion: Führe Smart-Contract-Code auf der Chain aus. In diesem Fall sollte das Datenfeld die Smart-Funktion, die du ausführen möchtest, zusammen mit allen Parametern enthalten.
  - Ein praktisches Beispiel findest du im [Hello World Smart Contract-Tutorial](/developers/tutorials/hello-world-smart-contract/).

### 8\. Führe den Code mit `node sendTx.js` aus {#run-the-code-using-node-sendtx-js}

Navigiere zurück zu deinem Terminal oder deiner Befehlszeile und führe Folgendes aus:

```sh
node sendTx.js
```

### 9\. Sieh dir deine Transaktion in einem Block-Explorer an {#see-your-transaction-in-the-mempool}

Das Skript gibt den Transaktions-Hash aus, sobald der Knoten die Transaktion akzeptiert, wartet dann, bis sie in einen Block aufgenommen wurde (normalerweise innerhalb weniger Sekunden), und gibt das Ergebnis aus. Um die Details zu sehen, füge den Hash in einen Sepolia-Block-Explorer wie [Sepolia Etherscan](https://sepolia.etherscan.io/) oder [Blockscout](https://eth-sepolia.blockscout.com/) ein. Dort kannst du beobachten, wie die Transaktion von ausstehend zu aufgenommen wechselt, und den Betrag, die Gebühren und den Block sehen, in dem sie gelandet ist.

Wenn du stattdessen einen `insufficient funds`-Fehler siehst, hat dein Konto nicht genug Sepolia-ETH, um den Wert plus Gas zu decken. Gehe zurück zu Schritt 2 und fordere mehr von einem Faucet an.

**Juhu! Du hast gerade deine erste Ethereum-Transaktion mit Alchemy gesendet 🎉**

_Für Feedback und Vorschläge zu diesem Leitfaden schreibe bitte eine Nachricht an Elan im [Discord](https://discord.gg/gWuC7zB) von Alchemy!_

_Ursprünglich veröffentlicht von Alchemy._
