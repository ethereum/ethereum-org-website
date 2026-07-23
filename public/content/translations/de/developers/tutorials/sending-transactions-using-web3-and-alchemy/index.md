---
title: Senden von Transaktionen mit Web3
description: "Dies ist ein anfängerfreundlicher Leitfaden zum Senden von Ethereum-Transaktionen mit Web3. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir werden alle drei durchgehen."
author: "Elan Halpern"
tags: ["Transaktionen", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: Transaktionen senden
lang: de
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Dies ist ein anfängerfreundlicher Leitfaden zum Senden von Ethereum-Transaktionen mit Web3. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir werden alle drei durchgehen und hoffentlich alle deine Fragen beantworten! In diesem Tutorial verwenden wir [Alchemy](https://www.alchemy.com/), um unsere Transaktionen an die Ethereum-Chain zu senden. Du kannst [hier ein kostenloses Alchemy-Konto erstellen](https://auth.alchemy.com/signup).

**HINWEIS:** Dieser Leitfaden ist für das Signieren deiner Transaktionen im _Backend_ deiner App gedacht. Wenn du das Signieren deiner Transaktionen im Frontend integrieren möchtest, sieh dir die Integration von [Web3 mit einem Browser-Provider](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) an.

## Die Grundlagen {#the-basics}

Wie die meisten Blockchain-Entwickler zu Beginn hast du vielleicht recherchiert, wie man eine Transaktion sendet (etwas, das eigentlich ziemlich einfach sein sollte), und bist auf eine Fülle von Leitfäden gestoßen, die alle etwas anderes sagen und dich ein wenig überfordert und verwirrt zurücklassen. Wenn es dir so geht, mach dir keine Sorgen; das ging uns allen irgendwann so! Bevor wir also anfangen, lass uns ein paar Dinge klarstellen:

### 1\. Alchemy speichert deine privaten Schlüssel nicht {#alchemy-does-not-store-your-private-keys}

- Das bedeutet, dass Alchemy keine Transaktionen in deinem Namen signieren und senden kann. Der Grund dafür sind Sicherheitsaspekte. Alchemy wird dich niemals bitten, deinen privaten Schlüssel weiterzugeben, und du solltest deinen privaten Schlüssel niemals an einen gehosteten Knoten (oder überhaupt an jemanden) weitergeben.
- Du kannst mit der Core-API von Alchemy von der Blockchain lesen, aber um darauf zu schreiben, musst du etwas anderes verwenden, um deine Transaktionen zu signieren, bevor du sie über Alchemy sendest (das gilt auch für jeden anderen [Knoten-Dienst](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Was ist ein „Signer“? {#what-is-a-signer}

- Signer signieren Transaktionen für dich mit deinem privaten Schlüssel. In diesem Tutorial verwenden wir [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), um unsere Transaktion zu signieren, aber du könntest auch jede andere Web3-Bibliothek verwenden.
- Im Frontend wäre [MetaMask](https://metamask.io/) ein gutes Beispiel für einen Signer, der Transaktionen in deinem Namen signiert und sendet.
### 3\. Warum muss ich meine Transaktionen signieren? {#why-do-i-need-to-sign-my-transactions}

- Jeder Benutzer, der eine Transaktion im Ethereum-Netzwerk senden möchte, muss die Transaktion (mit seinem privaten Schlüssel) signieren, um zu validieren, dass der Ursprung der Transaktion derjenige ist, der er vorgibt zu sein.
- Es ist extrem wichtig, diesen privaten Schlüssel zu schützen, da der Zugriff darauf die volle Kontrolle über dein Ethereum-Konto gewährt und es dir (oder jedem mit Zugriff) ermöglicht, Transaktionen in deinem Namen durchzuführen.

### 4\. Wie schütze ich meinen privaten Schlüssel? {#how-do-i-protect-my-private-key}

- Es gibt viele Möglichkeiten, deinen privaten Schlüssel zu schützen und ihn zum Senden von Transaktionen zu verwenden. In diesem Tutorial verwenden wir eine `.env`-Datei. Du könntest jedoch auch einen separaten Anbieter verwenden, der private Schlüssel speichert, eine Schlüsselspeicher-Datei (Keystore) nutzen oder andere Optionen wählen.

### 5\. Was ist der Unterschied zwischen `eth_sendTransaction` und `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` und `eth_sendRawTransaction` sind beides Ethereum-API-Funktionen, die eine Transaktion an das Ethereum-Netzwerk übertragen, damit sie einem zukünftigen Block hinzugefügt wird. Sie unterscheiden sich darin, wie sie das Signieren der Transaktionen handhaben.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) wird zum Senden _unsignierter_ Transaktionen verwendet. Das bedeutet, dass der Knoten, an den du sendest, deinen privaten Schlüssel verwalten muss, damit er die Transaktion signieren kann, bevor er sie an die Chain überträgt. Da Alchemy die privaten Schlüssel der Benutzer nicht speichert, unterstützen sie diese Methode nicht.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) wird verwendet, um Transaktionen zu übertragen, die bereits signiert wurden. Das bedeutet, dass du zuerst [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) verwenden musst und dann das Ergebnis an `eth_sendRawTransaction` übergibst.

Bei der Verwendung von Web3 wird auf `eth_sendRawTransaction` zugegriffen, indem die Funktion [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) aufgerufen wird.

Genau das werden wir in diesem Tutorial verwenden.

### 6\. Was ist die Web3-Bibliothek? {#what-is-the-web3-library}

- Web3.js ist eine Wrapper-Bibliothek um die Standard-JSON-RPC-Aufrufe, die in der Ethereum-Entwicklung sehr häufig verwendet wird.
- Es gibt viele Web3-Bibliotheken für verschiedene Sprachen. In diesem Tutorial verwenden wir [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), das in JavaScript geschrieben ist. Du kannst dir [hier](/developers/docs/apis/javascript/) andere Optionen wie [Ethers.js](https://docs.ethers.org/v5/) ansehen.

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

Befolge die Anweisungen auf dem [Alchemy Sepolia-Faucet](https://www.sepoliafaucet.com/), um ETH zu erhalten. Stelle sicher, dass du deine **Sepolia**-Ethereum-Adresse (von MetaMask) und nicht die eines anderen Netzwerks angibst. Nachdem du die Anweisungen befolgt hast, überprüfe noch einmal, ob du die ETH in deiner Wallet erhalten hast.

### 3\. Erstelle ein neues Projektverzeichnis und wechsle mit `cd` dorthin {#create-a-new-project-direction}

Erstelle über die Befehlszeile (Terminal bei Macs) ein neues Projektverzeichnis und navigiere dorthin:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installiere Alchemy Web3 (oder eine beliebige Web3-Bibliothek) {#install-alchemy-web3}

Führe den folgenden Befehl in deinem Projektverzeichnis aus, um [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) zu installieren:

Hinweis: Wenn du die Ethers.js-Bibliothek verwenden möchtest, [befolge die Anweisungen hier](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Installiere dotenv {#install-dotenv}

Wir verwenden eine `.env`-Datei, um unseren API-Schlüssel und unseren privaten Schlüssel sicher zu speichern.

```
npm install dotenv --save
```

### 6\. Erstelle die `.env`-Datei {#create-the-dotenv-file}

Erstelle eine `.env`-Datei in deinem Projektverzeichnis und füge Folgendes hinzu (ersetze dabei „`your-api-url`“ und „`your-private-key`“):

- Um deine Alchemy-API-URL zu finden, navigiere zur App-Detailseite der App, die du gerade in deinem Dashboard erstellt hast, klicke oben rechts auf „View Key“ und kopiere die HTTP-URL.
- Um deinen privaten Schlüssel mit MetaMask zu finden, sieh dir diesen [Leitfaden](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) an.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Commite <code>.env</code> nicht! Bitte stelle sicher, dass du deine <code>.env</code>-Datei niemals mit jemandem teilst oder offenlegst, da du dadurch deine Geheimnisse kompromittierst. Wenn du eine Versionskontrolle verwendest, füge deine <code>.env</code> zu einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Erstelle die Datei `sendTx.js` {#create-sendtx-js}

Großartig, da wir nun unsere sensiblen Daten in einer `.env`-Datei geschützt haben, lass uns mit dem Programmieren beginnen. Für unser Transaktionsbeispiel senden wir ETH an den Sepolia-Faucet zurück.

Erstelle eine Datei `sendTx.js`, in der wir unsere Beispieltransaktion konfigurieren und senden werden, und füge ihr die folgenden Codezeilen hinzu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: Ersetze diese Adresse durch deine eigene öffentliche Adresse

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // Nonce beginnt bei 0 zu zählen

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // Faucet-Adresse zur Rückgabe von ETH
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optionales Datenfeld, um eine Nachricht zu senden oder einen Smart Contract auszuführen
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Stelle sicher, dass du die Adresse in **Zeile 6** durch deine eigene öffentliche Adresse ersetzt.

Bevor wir nun diesen Code ausführen, lass uns über einige der Komponenten hier sprechen.

- `nonce`: Die Spezifikation der Nonce wird verwendet, um die Anzahl der von deiner Adresse gesendeten Transaktionen zu verfolgen. Wir benötigen dies aus Sicherheitsgründen und um Replay-Angriffe zu verhindern. Um die Anzahl der von deiner Adresse gesendeten Transaktionen zu erhalten, verwenden wir [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: Das Transaktionsobjekt hat einige Aspekte, die wir spezifizieren müssen:
  - `to`: Dies ist die Adresse, an die wir ETH senden möchten. In diesem Fall senden wir ETH an den [Sepolia-Faucet](https://sepoliafaucet.com/) zurück, von dem wir ursprünglich angefordert haben.
  - `value`: Dies ist der Betrag, den wir senden möchten, angegeben in Wei, wobei 10^18 Wei = 1 ETH sind.
  - `gas`: Es gibt viele Möglichkeiten, die richtige Menge an Gas zu bestimmen, die deiner Transaktion beigefügt werden soll. Alchemy unterstützt [Webhooks](https://www.alchemy.com/docs/reference/webhooks-overview), die dich über Onchain-Aktivitäten benachrichtigen können. Für Mainnet-Transaktionen ist es eine gute Praxis, die aktuellen Gas-Bedingungen zu überprüfen, um die richtige Menge an Gas zu bestimmen. 21000 ist die Mindestmenge an Gas, die eine Operation auf Ethereum verbraucht, also setzen wir hier 30000 ein, um sicherzustellen, dass unsere Transaktion ausgeführt wird.
  - `nonce`: Siehe die obige Definition der Nonce. Die Nonce beginnt bei null zu zählen.
  - [OPTIONAL] data: Wird verwendet, um zusätzliche Informationen mit deinem Transfer zu senden oder einen Smart Contract aufzurufen. Für Guthabentransfers nicht erforderlich, siehe den Hinweis unten.
- `signedTx`: Um unser Transaktionsobjekt zu signieren, verwenden wir die Methode `signTransaction` mit unserem `PRIVATE_KEY`.
- `sendSignedTransaction`: Sobald wir eine signierte Transaktion haben, können wir sie mit `sendSignedTransaction` absenden, damit sie in einen nachfolgenden Block aufgenommen wird.

**Ein Hinweis zu data**
Es gibt zwei Hauptarten von Transaktionen, die auf Ethereum gesendet werden können.

- Guthabentransfer: Sende ETH von einer Adresse an eine andere. Es ist kein Datenfeld erforderlich. Wenn du jedoch zusätzliche Informationen neben deiner Transaktion senden möchtest, kannst du diese Informationen im HEX-Format in diesem Feld angeben.
  - Nehmen wir zum Beispiel an, wir möchten den Hash eines IPFS-Dokuments auf die Ethereum-Chain schreiben, um ihm einen unveränderlichen Zeitstempel zu geben. Unser Datenfeld sollte dann so aussehen: data: `web3.utils.toHex(‘IPFS hash‘)`. Und nun kann jeder die Chain abfragen und sehen, wann das Dokument hinzugefügt wurde.
- Smart-Contract-Transaktion: Führe Smart-Contract-Code auf der Chain aus. In diesem Fall sollte das Datenfeld die Smart-Funktion, die du ausführen möchtest, zusammen mit allen Parametern enthalten.
  - Für ein praktisches Beispiel sieh dir das [Tutorial zum Hello World Smart Contract](/developers/tutorials/hello-world-smart-contract/) an.
### 8\. Führe den Code mit `node sendTx.js` aus {#run-the-code-using-node-sendtx-js}

Navigiere zurück zu deinem Terminal oder deiner Befehlszeile und führe Folgendes aus:

```
node sendTx.js
```

### 9\. Sieh dir deine Transaktion im Mempool an {#see-your-transaction-in-the-mempool}

Öffne die [Mempool-Seite](https://dashboard.alchemy.com/mempool) in deinem Alchemy-Dashboard und filtere nach der von dir erstellten App, um deine Transaktion zu finden. Hier können wir beobachten, wie unsere Transaktion vom ausstehenden Zustand (pending) in den geminten Zustand (mined) übergeht (falls erfolgreich) oder in den verworfenen Zustand (dropped), falls nicht erfolgreich. Stelle sicher, dass du es auf „All“ belässt, damit du „mined“-, „pending“- und „dropped“-Transaktionen erfasst. Du kannst auch nach deiner Transaktion suchen, indem du nach Transaktionen suchst, die an die Adresse `0x31b98d14007bdee637298086988a0bbd31184523` gesendet wurden.

Um die Details deiner Transaktion anzuzeigen, sobald du sie gefunden hast, wähle den tx-Hash aus, was dich zu einer Ansicht führen sollte, die so aussieht:

![Screenshot des Mempool-Watchers](./mempool.png)

Von dort aus kannst du deine Transaktion auf Etherscan ansehen, indem du auf das rot eingekreiste Symbol klickst!

**Juhu! Du hast gerade deine erste Ethereum-Transaktion mit Alchemy gesendet 🎉**

_Für Feedback und Vorschläge zu diesem Leitfaden schreibe bitte eine Nachricht an Elan auf dem [Discord](https://discord.gg/A39JVCM) von Alchemy!_

_Ursprünglich veröffentlicht von Alchemy._
