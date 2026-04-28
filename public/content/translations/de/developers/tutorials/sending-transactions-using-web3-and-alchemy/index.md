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

Dies ist ein anfängerfreundlicher Leitfaden zum Senden von Ethereum-Transaktionen mit Web3. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir werden alle drei durchgehen und hoffentlich alle Ihre Fragen beantworten! In diesem Tutorial verwenden wir [Alchemy](https://www.alchemy.com/), um unsere Transaktionen an die Ethereum-Blockchain zu senden. Sie können [hier ein kostenloses Alchemy-Konto erstellen](https://auth.alchemyapi.io/signup).

**HINWEIS:** Dieser Leitfaden ist für das Signieren Ihrer Transaktionen im _Backend_ Ihrer App gedacht. Wenn Sie das Signieren Ihrer Transaktionen im Frontend integrieren möchten, lesen Sie mehr über die Integration von [Web3 mit einem Browser-Anbieter](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Die Grundlagen {#the-basics}

Wie die meisten Blockchain-Entwickler zu Beginn haben Sie vielleicht recherchiert, wie man eine Transaktion sendet (etwas, das eigentlich ziemlich einfach sein sollte), und sind auf eine Fülle von Leitfäden gestoßen, die alle etwas anderes sagen und Sie ein wenig überfordert und verwirrt zurücklassen. Wenn es Ihnen so geht, machen Sie sich keine Sorgen; das ging uns allen irgendwann so! Bevor wir also anfangen, lassen Sie uns ein paar Dinge klarstellen:

### 1\. Alchemy speichert Ihre Private-Keys nicht {#alchemy-does-not-store-your-private-keys}

- Das bedeutet, dass Alchemy keine Transaktionen in Ihrem Namen signieren und senden kann. Der Grund dafür sind Sicherheitszwecke. Alchemy wird Sie niemals bitten, Ihren Private-Key weiterzugeben, und Sie sollten Ihren Private-Key niemals an einen gehosteten Blockchain-Knoten (oder überhaupt an jemanden) weitergeben.
- Sie können mit der Kern-API von Alchemy von der Blockchain lesen, aber um darauf zu schreiben, müssen Sie etwas anderes verwenden, um Ihre Transaktionen zu signieren, bevor Sie sie über Alchemy senden (dies gilt auch für jeden anderen [Blockchain-Knoten-Dienst](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Was ist ein „Signer“? {#what-is-a-signer}

- Signer signieren Transaktionen für Sie mit Ihrem Private-Key. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), um unsere Transaktion zu signieren, aber Sie könnten auch jede andere Web3-Bibliothek verwenden.
- Im Frontend wäre ein gutes Beispiel für einen Signer [MetaMask](https://metamask.io/), das Transaktionen in Ihrem Namen signiert und sendet.

### 3\. Warum muss ich meine Transaktionen signieren? {#why-do-i-need-to-sign-my-transactions}

- Jeder Benutzer, der eine Transaktion im Ethereum-Netzwerk senden möchte, muss die Transaktion (mit seinem Private-Key) signieren, um zu validieren, dass der Ursprung der Transaktion derjenige ist, der er vorgibt zu sein.
- Es ist extrem wichtig, diesen Private-Key zu schützen, da der Zugriff darauf die volle Kontrolle über Ihr Ethereum-Konto gewährt und es Ihnen (oder jedem mit Zugriff) ermöglicht, Transaktionen in Ihrem Namen durchzuführen.

### 4\. Wie schütze ich meinen Private-Key? {#how-do-i-protect-my-private-key}

- Es gibt viele Möglichkeiten, Ihren Private-Key zu schützen und ihn zum Senden von Transaktionen zu verwenden. In diesem Tutorial verwenden wir eine `.env`-Datei. Sie könnten jedoch auch einen separaten Anbieter verwenden, der Private-Keys speichert, eine Keystore-Datei nutzen oder andere Optionen wählen.

### 5\. Was ist der Unterschied zwischen `eth_sendTransaction` und `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` und `eth_sendRawTransaction` sind beides Ethereum-API-Funktionen, die eine Transaktion an das Ethereum-Netzwerk übertragen, damit sie einem zukünftigen Block hinzugefügt wird. Sie unterscheiden sich darin, wie sie das Signieren der Transaktionen handhaben.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) wird zum Senden _unsignierter_ Transaktionen verwendet, was bedeutet, dass der Blockchain-Knoten, an den Sie senden, Ihren Private-Key verwalten muss, damit er die Transaktion signieren kann, bevor er sie an die Blockchain überträgt. Da Alchemy die Private-Keys der Benutzer nicht speichert, wird diese Methode nicht unterstützt.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) wird verwendet, um Transaktionen zu übertragen, die bereits signiert wurden. Das bedeutet, dass Sie zuerst [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) verwenden müssen und dann das Ergebnis an `eth_sendRawTransaction` übergeben.

Bei der Verwendung von Web3 wird auf `eth_sendRawTransaction` zugegriffen, indem die Funktion [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) aufgerufen wird.

Dies ist es, was wir in diesem Tutorial verwenden werden.

### 6\. Was ist die Web3-Bibliothek? {#what-is-the-web3-library}

- Web3.js ist eine Wrapper-Bibliothek um die Standard-JSON-RPC-Aufrufe, die in der Ethereum-Entwicklung sehr häufig verwendet wird.
- Es gibt viele Web3-Bibliotheken für verschiedene Sprachen. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), das in JavaScript geschrieben ist. Sie können sich [hier](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) andere Optionen wie [ethers.js](https://docs.ethers.org/v5/) ansehen.

Okay, da wir nun einige dieser Fragen geklärt haben, machen wir mit dem Tutorial weiter. Sie können jederzeit Fragen im Alchemy-[Discord](https://discord.gg/gWuC7zB) stellen!

### 7\. Wie sendet man sichere, gasoptimierte und private Transaktionen? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy verfügt über eine Suite von Transact-APIs](https://docs.alchemy.com/reference/transact-api-quickstart). Sie können diese verwenden, um verstärkte Transaktionen zu senden, Transaktionen vorab zu simulieren, private Transaktionen zu senden und gasoptimierte Transaktionen zu senden.
- Sie können auch die [Notify-API](https://docs.alchemy.com/docs/alchemy-notify) verwenden, um benachrichtigt zu werden, wenn Ihre Transaktion aus dem Mempool gezogen und der Blockchain hinzugefügt wird.

**HINWEIS:** Dieser Leitfaden erfordert ein Alchemy-Konto, eine Ethereum-Adresse oder ein MetaMask-Wallet, Node.js und ein installiertes npm. Wenn nicht, befolgen Sie diese Schritte:

1.  [Erstellen Sie ein kostenloses Alchemy-Konto](https://auth.alchemyapi.io/signup)
2.  [Erstellen Sie ein MetaMask-Konto](https://metamask.io/) (oder besorgen Sie sich eine Ethereum-Adresse)
3.  [Befolgen Sie diese Schritte, um Node.js und NPM zu installieren](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Schritte zum Senden Ihrer Transaktion {#steps-to-sending-your-transaction}

### 1\. Erstellen Sie eine Alchemy-App im Sepolia-Testnet {#create-an-alchemy-app-on-the-sepolia-testnet}

Navigieren Sie zu Ihrem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/) und erstellen Sie eine neue App, wobei Sie Sepolia (oder ein anderes Testnet) für Ihr Netzwerk auswählen.

### 2\. Fordern Sie ETH vom Sepolia-Faucet an {#request-eth-from-sepolia-faucet}

Befolgen Sie die Anweisungen auf dem [Alchemy Sepolia-Faucet](https://www.sepoliafaucet.com/), um ETH zu erhalten. Stellen Sie sicher, dass Sie Ihre **Sepolia**-Ethereum-Adresse (von MetaMask) und nicht die eines anderen Netzwerks angeben. Nachdem Sie die Anweisungen befolgt haben, überprüfen Sie, ob Sie die ETH in Ihrem Wallet erhalten haben.

### 3\. Erstellen Sie ein neues Projektverzeichnis und wechseln Sie mit `cd` dorthin {#create-a-new-project-direction}

Erstellen Sie über die Befehlszeile (Terminal bei Macs) ein neues Projektverzeichnis und navigieren Sie dorthin:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installieren Sie Alchemy Web3 (oder eine beliebige Web3-Bibliothek) {#install-alchemy-web3}

Führen Sie den folgenden Befehl in Ihrem Projektverzeichnis aus, um [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) zu installieren:

Hinweis: Wenn Sie die ethers.js-Bibliothek verwenden möchten, [befolgen Sie die Anweisungen hier](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Installieren Sie dotenv {#install-dotenv}

Wir verwenden eine `.env`-Datei, um unseren API-Schlüssel und Private-Key sicher zu speichern.

```
npm install dotenv --save
```

### 6\. Erstellen Sie die `.env`-Datei {#create-the-dotenv-file}

Erstellen Sie eine `.env`-Datei in Ihrem Projektverzeichnis und fügen Sie Folgendes hinzu (ersetzen Sie „`your-api-url`“ und „`your-private-key`“):

- Um Ihre Alchemy-API-URL zu finden, navigieren Sie zur App-Detailseite der App, die Sie gerade in Ihrem Dashboard erstellt haben, klicken Sie oben rechts auf „View Key“ und kopieren Sie die HTTP-URL.
- Um Ihren Private-Key mit MetaMask zu finden, lesen Sie diesen [Leitfaden](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Committen Sie <code>.env</code> nicht! Bitte stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals mit jemandem teilen oder offenlegen, da Sie dadurch Ihre Geheimnisse kompromittieren. Wenn Sie eine Versionskontrolle verwenden, fügen Sie Ihre <code>.env</code> zu einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Erstellen Sie die Datei `sendTx.js` {#create-sendtx-js}

Großartig, da wir nun unsere sensiblen Daten in einer `.env`-Datei geschützt haben, fangen wir an zu programmieren. Für unser Beispiel zum Senden einer Transaktion senden wir ETH zurück an das Sepolia-Faucet.

Erstellen Sie eine Datei `sendTx.js`, in der wir unsere Beispieltransaktion konfigurieren und senden werden, und fügen Sie die folgenden Codezeilen hinzu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
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

Stellen Sie sicher, dass Sie die Adresse in **Zeile 6** durch Ihre eigene öffentliche Adresse ersetzen.

Bevor wir nun dazu übergehen, diesen Code auszuführen, lassen Sie uns über einige der Komponenten hier sprechen.

- `nonce`: Die Nonce-Spezifikation wird verwendet, um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu verfolgen. Wir benötigen dies aus Sicherheitsgründen und um [Replay-Angriffe](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) zu verhindern. Um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu erhalten, verwenden wir [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Das Transaktionsobjekt hat einige Aspekte, die wir spezifizieren müssen:
  - `to`: Dies ist die Adresse, an die wir ETH senden möchten. In diesem Fall senden wir ETH zurück an das [Sepolia-Faucet](https://sepoliafaucet.com/), von dem wir sie ursprünglich angefordert haben.
  - `value`: Dies ist der Betrag, den wir senden möchten, angegeben in Wei, wobei 10^18 Wei = 1 ETH.
  - `gas`: Es gibt viele Möglichkeiten, die richtige Menge an Gas zu bestimmen, die Ihrer Transaktion beigefügt werden soll. Alchemy hat sogar einen [Gaspreis-Webhook](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1), der Sie benachrichtigt, wenn der Gaspreis unter einen bestimmten Schwellenwert fällt. Für Mainnet-Transaktionen ist es eine gute Praxis, einen Gas-Schätzer wie [ETH Gas Station](https://ethgasstation.info/) zu überprüfen, um die richtige Menge an Gas zu bestimmen. 21000 ist die Mindestmenge an Gas, die eine Operation auf Ethereum verbraucht. Um sicherzustellen, dass unsere Transaktion ausgeführt wird, geben wir hier 30000 an.
  - `nonce`: Siehe obige Nonce-Definition. Nonce beginnt bei Null zu zählen.
  - [OPTIONAL] data: Wird zum Senden zusätzlicher Informationen mit Ihrer Überweisung oder zum Aufrufen eines Smart Contracts verwendet. Für Guthabenüberweisungen nicht erforderlich, siehe Hinweis unten.
- `signedTx`: Um unser Transaktionsobjekt zu signieren, verwenden wir die Methode `signTransaction` mit unserem `PRIVATE_KEY`.
- `sendSignedTransaction`: Sobald wir eine signierte Transaktion haben, können wir sie mit `sendSignedTransaction` absenden, damit sie in einen nachfolgenden Block aufgenommen wird.

**Ein Hinweis zu data**
Es gibt zwei Hauptarten von Transaktionen, die in Ethereum gesendet werden können.

- Guthabenüberweisung: Senden Sie ETH von einer Adresse an eine andere. Es ist kein Datenfeld erforderlich. Wenn Sie jedoch zusätzliche Informationen zusammen mit Ihrer Transaktion senden möchten, können Sie diese Informationen im HEX-Format in dieses Feld aufnehmen.
  - Nehmen wir zum Beispiel an, wir wollten den Hash eines IPFS-Dokuments in die Ethereum-Blockchain schreiben, um ihm einen unveränderlichen Zeitstempel zu geben. Unser Datenfeld sollte dann so aussehen: data: `web3.utils.toHex(‘IPFS hash‘)`. Und jetzt kann jeder die Blockchain abfragen und sehen, wann dieses Dokument hinzugefügt wurde.
- Smart-Contract-Transaktion: Führen Sie Smart-Contract-Code auf der Blockchain aus. In diesem Fall sollte das Datenfeld die Smart-Funktion, die Sie ausführen möchten, zusammen mit allen Parametern enthalten.
  - Ein praktisches Beispiel finden Sie in Schritt 8 dieses [Hello World-Tutorials](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Führen Sie den Code mit `node sendTx.js` aus {#run-the-code-using-node-sendtx-js}

Navigieren Sie zurück zu Ihrem Terminal oder Ihrer Befehlszeile und führen Sie Folgendes aus:

```
node sendTx.js
```

### 9\. Sehen Sie Ihre Transaktion im Mempool {#see-your-transaction-in-the-mempool}

Öffnen Sie die [Mempool-Seite](https://dashboard.alchemyapi.io/mempool) in Ihrem Alchemy-Dashboard und filtern Sie nach der von Ihnen erstellten App, um Ihre Transaktion zu finden. Hier können wir beobachten, wie unsere Transaktion vom Status „ausstehend“ (pending) in den Status „gemint“ (mined) übergeht (falls erfolgreich) oder in den Status „verworfen“ (dropped), falls sie nicht erfolgreich war. Stellen Sie sicher, dass Sie die Einstellung auf „All“ belassen, damit Sie „geminte“, „ausstehende“ und „verworfene“ Transaktionen erfassen. Sie können auch nach Ihrer Transaktion suchen, indem Sie nach Transaktionen suchen, die an die Adresse `0x31b98d14007bdee637298086988a0bbd31184523` gesendet wurden.

Um die Details Ihrer Transaktion anzuzeigen, sobald Sie sie gefunden haben, wählen Sie den Transaktions-Hash aus, der Sie zu einer Ansicht führen sollte, die wie folgt aussieht:

![Mempool-Watcher-Screenshot](./mempool.png)

Von dort aus können Sie Ihre Transaktion auf Etherscan anzeigen, indem Sie auf das rot eingekreiste Symbol klicken!

**Juhuuu! Sie haben gerade Ihre erste Ethereum-Transaktion mit Alchemy gesendet 🎉**

_Für Feedback und Vorschläge zu diesem Leitfaden senden Sie bitte eine Nachricht an Elan im [Discord](https://discord.gg/A39JVCM) von Alchemy!_

_Ursprünglich veröffentlicht unter [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_