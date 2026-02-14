---
title: Versenden von Transaktionen mit Web3
description: "Dies ist eine anfängerfreundliche Anleitung zum Versenden von Ethereum-Transaktionen mit Web3. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir werden alle drei durchgehen."
author: "Elan Halpern"
tags: [ "Transaktionen", "web3.js", "Alchemy" ]
skill: beginner
lang: de
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Dies ist eine anfängerfreundliche Anleitung zum Versenden von Ethereum-Transaktionen mit Web3. Es gibt drei Hauptschritte, um eine Transaktion an die Ethereum-Blockchain zu senden: Erstellen, Signieren und Übertragen. Wir gehen auf alle drei Punkte ein und beantworten hoffentlich alle Fragen, die Sie haben! In diesem Tutorial verwenden wir [Alchemy](https://www.alchemy.com/), um unsere Transaktionen an die Ethereum-Chain zu senden. Sie können [hier ein kostenloses Alchemy-Konto erstellen](https://auth.alchemyapi.io/signup).

**HINWEIS:** Diese Anleitung ist für das Signieren Ihrer Transaktionen auf dem _Backend_ Ihrer App. Wenn Sie das Signieren Ihrer Transaktionen im Frontend integrieren möchten, sehen Sie sich die Integration von [Web3 mit einem Browser-Anbieter](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) an.

## Die Grundlagen {#the-basics}

Wie die meisten Blockchain-Entwickler, wenn sie anfangen, haben Sie vielleicht recherchiert, wie man eine Transaktion sendet (etwas, das ziemlich einfach sein sollte), und sind auf eine Fülle von Anleitungen gestoßen, von denen jede etwas anderes besagt und Sie etwas überfordert und verwirrt zurücklässt. Wenn Sie im selben Boot sitzen, keine Sorge – wir alle waren irgendwann einmal an diesem Punkt! Bevor wir also beginnen, sollten wir ein paar Dinge klarstellen:

### 1. Alchemy speichert Ihre privaten Schlüssel nicht {#alchemy-does-not-store-your-private-keys}

- Das bedeutet, dass Alchemy keine Transaktionen in Ihrem Namen signieren und senden kann. Dies geschieht aus Sicherheitsgründen. Alchemy wird Sie niemals darum bitten, Ihren privaten Schlüssel mitzuteilen, und Sie sollten Ihren privaten Schlüssel niemals mit einem gehosteten Node (oder überhaupt jemandem) teilen.
- Sie können mit der Core-API von Alchemy aus der Blockchain lesen, aber um darauf zu schreiben, müssen Sie etwas anderes verwenden, um Ihre Transaktionen zu signieren, bevor Sie sie über Alchemy senden (dies gilt für jeden anderen [Node-Service](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. Was ist ein „Signer“? {#what-is-a-signer}

- Signer signieren Transaktionen für Sie mit Ihrem privaten Schlüssel. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), um unsere Transaktion zu signieren, aber Sie könnten auch jede andere Web3-Bibliothek verwenden.
- Ein gutes Beispiel für einen Signer im Frontend wäre [MetaMask](https://metamask.io/), das Transaktionen in Ihrem Namen signiert und sendet.

### 3. Warum muss ich meine Transaktionen signieren? {#why-do-i-need-to-sign-my-transactions}

- Jeder Benutzer, der eine Transaktion über das Ethereum-Netzwerk senden möchte, muss die Transaktion (mit seinem privaten Schlüssel) signieren, um zu validieren, dass der Ursprung der Transaktion auch der ist, den er vorgibt zu sein.
- Es ist extrem wichtig, diesen privaten Schlüssel zu schützen, da der Zugriff darauf die volle Kontrolle über Ihr Ethereum-Konto gewährt und es Ihnen (oder jedem mit Zugriff) ermöglicht, Transaktionen in Ihrem Namen durchzuführen.

### 4. Wie schütze ich meinen privaten Schlüssel? {#how-do-i-protect-my-private-key}

- Es gibt viele Möglichkeiten, Ihren privaten Schlüssel zu schützen und ihn zum Senden von Transaktionen zu verwenden. In diesem Tutorial werden wir eine `.env`-Datei verwenden. Sie können jedoch auch einen separaten Anbieter verwenden, der private Schlüssel speichert, eine Keystore-Datei nutzen oder andere Optionen wählen.

### 5. Was ist der Unterschied zwischen `eth_sendTransaction` und `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` und `eth_sendRawTransaction` sind beides Ethereum-API-Funktionen, die eine Transaktion an das Ethereum-Netzwerk senden, sodass sie einem zukünftigen Block hinzugefügt wird. Sie unterscheiden sich in der Art und Weise, wie sie das Signieren der Transaktionen handhaben.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) wird für das Senden von _unsignierten_ Transaktionen verwendet. Das bedeutet, der Node, an den Sie senden, muss Ihren privaten Schlüssel verwalten, damit er die Transaktion signieren kann, bevor er sie an die Chain sendet. Da Alchemy die privaten Schlüssel der Benutzer nicht speichert, wird diese Methode nicht unterstützt.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) wird verwendet, um bereits signierte Transaktionen zu senden. Das bedeutet, Sie müssen zuerst [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) verwenden und dann das Ergebnis an `eth_sendRawTransaction` übergeben.

Bei Verwendung von Web3 wird auf `eth_sendRawTransaction` durch den Aufruf der Funktion [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) zugegriffen.

Das werden wir in diesem Tutorial verwenden.

### 6. Was ist die Web3-Bibliothek? {#what-is-the-web3-library}

- Web3.js ist eine Wrapper-Bibliothek für die standardmäßigen JSON-RPC-Aufrufe, die in der Ethereum-Entwicklung sehr verbreitet ist.
- Es gibt viele Web3-Bibliotheken für verschiedene Sprachen. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), das in JavaScript geschrieben ist. Sie können sich [hier](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) andere Optionen wie [ethers.js](https://docs.ethers.org/v5/) ansehen.

Okay, nachdem wir nun einige dieser Fragen aus dem Weg geräumt haben, fahren wir mit dem Tutorial fort. Fragen können Sie jederzeit im Alchemy-[Discord](https://discord.gg/gWuC7zB) stellen!

### 7. Wie sendet man sichere, gas-optimierte und private Transaktionen? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy verfügt über eine Reihe von Transact-APIs](https://docs.alchemy.com/reference/transact-api-quickstart). Sie können diese verwenden, um verstärkte Transaktionen zu senden, Transaktionen vorab zu simulieren, private Transaktionen zu senden und gasoptimierte Transaktionen zu senden.
- Sie können auch die [Notify API](https://docs.alchemy.com/docs/alchemy-notify) verwenden, um benachrichtigt zu werden, wenn Ihre Transaktion aus dem Mempool geholt und zur Chain hinzugefügt wird.

**HINWEIS:** Diese Anleitung erfordert ein Alchemy-Konto, eine Ethereum-Adresse oder eine MetaMask-Wallet sowie installiertes NodeJs und npm. Falls nicht, folgen Sie diesen Schritten:

1. [Erstellen Sie ein kostenloses Alchemy-Konto](https://auth.alchemyapi.io/signup)
2. [MetaMask-Konto erstellen](https://metamask.io/) (oder eine Ethereum-Adresse erhalten)
3. [Befolgen Sie diese Schritte, um NodeJs und NPM zu installieren](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Schritte zum Senden Ihrer Transaktion {#steps-to-sending-your-transaction}

### 1. Erstellen Sie eine Alchemy-App auf dem Sepolia-Testnet {#create-an-alchemy-app-on-the-sepolia-testnet}

Navigieren Sie zu Ihrem [Alchemy Dashboard](https://dashboard.alchemyapi.io/) und erstellen Sie eine neue App, indem Sie Sepolia (oder ein anderes Testnet) als Netzwerk auswählen.

### 2. ETH vom Sepolia-Faucet anfordern {#request-eth-from-sepolia-faucet}

Folgen Sie den Anweisungen auf dem [Alchemy Sepolia Faucet](https://www.sepoliafaucet.com/), um ETH zu erhalten. Stellen Sie sicher, dass Sie Ihre **Sepolia**-Ethereum-Adresse (von MetaMask) und nicht die eines anderen Netzwerks angeben. Nachdem Sie die Anweisungen befolgt haben, überprüfen Sie, ob Sie die ETH in Ihrer Wallet erhalten haben.

### 3. Erstellen Sie ein neues Projektverzeichnis und wechseln Sie mit `cd` hinein {#create-a-new-project-direction}

Erstellen Sie ein neues Projektverzeichnis in der Befehlszeile (Terminal für Macs) und navigieren Sie hinein:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Alchemy Web3 (oder eine beliebige Web3-Bibliothek) installieren {#install-alchemy-web3}

Führen Sie den folgenden Befehl in Ihrem Projektverzeichnis aus, um [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) zu installieren:

Hinweis: Wenn Sie die ethers.js-Bibliothek verwenden möchten, [folgen Sie den Anweisungen hier](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. dotenv installieren {#install-dotenv}

Wir verwenden eine `.env`-Datei, um unseren API-Schlüssel und unseren privaten Schlüssel sicher zu speichern.

```
npm install dotenv --save
```

### 6. Die `.env`-Datei erstellen {#create-the-dotenv-file}

Erstellen Sie eine `.env`-Datei in Ihrem Projektverzeichnis und fügen Sie Folgendes hinzu (ersetzen Sie „`your-api-url`“ und „`your-private-key`“)

- Um Ihre Alchemy-API-URL zu finden, navigieren Sie zur Detailseite der App, die Sie gerade in Ihrem Dashboard erstellt haben, klicken Sie oben rechts auf „View Key“ und kopieren Sie die HTTP-URL.
- Um Ihren privaten Schlüssel mit MetaMask zu finden, sehen Sie sich diese [Anleitung](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) an.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Führen Sie keinen Commit für <code>.env</code> aus! Bitte stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals an Dritte weitergeben oder offenlegen, da Sie dadurch Ihre Geheimnisse preisgeben. Wenn Sie eine Versionskontrolle verwenden, fügen Sie Ihre <code>.env</code>-Datei einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

### 7. `sendTx.js`-Datei erstellen {#create-sendtx-js}

Großartig, jetzt, da unsere sensiblen Daten in einer `.env`-Datei geschützt sind, können wir mit dem Programmieren beginnen. Für unser Beispiel zum Senden von Transaktionen senden wir ETH an den Sepolia-Faucet zurück.

Erstellen Sie eine `sendTx.js`-Datei, in der wir unsere Beispieltransaktion konfigurieren und senden, und fügen Sie die folgenden Codezeilen hinzu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: Ersetzen Sie diese Adresse durch Ihre eigene öffentliche Adresse

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // Nonce beginnt bei 0 zu zählen

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // Faucet-Adresse, um ETH zurückzugeben
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optionales Datenfeld zum Senden einer Nachricht oder Ausführen eines Smart Contracts
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 Der Hash Ihrer Transaktion lautet: ", hash, "\n Sehen Sie sich Alchemys Mempool an, um den Status Ihrer Transaktion zu überprüfen!");
    } else {
      console.log("❗Beim Senden Ihrer Transaktion ist ein Fehler aufgetreten:", error)
    }
   });
}

main();
```

Ersetzen Sie die Adresse in **Zeile 6** unbedingt durch Ihre eigene öffentliche Adresse.

Bevor wir diesen Code ausführen, lassen Sie uns über einige der Komponenten hier sprechen.

- `nonce`: Die Nonce-Spezifikation wird verwendet, um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu verfolgen. Wir benötigen dies aus Sicherheitsgründen und um [Replay-Angriffe](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) zu verhindern. Um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu ermitteln, verwenden wir [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Das Transaktionsobjekt hat einige Aspekte, die wir spezifizieren müssen.
  - `to`: Dies ist die Adresse, an die wir ETH senden möchten. In diesem Fall senden wir ETH an den [Sepolia Faucet](https://sepoliafaucet.com/) zurück, von dem wir sie ursprünglich angefordert haben.
  - `value`: Dies ist der Betrag, den wir senden möchten, angegeben in Wei, wobei 10^18 Wei = 1 ETH.
  - `gas`: Es gibt viele Möglichkeiten, die richtige Menge an Gas für Ihre Transaktion zu bestimmen. Alchemy hat sogar einen [Gaspreis-Webhook](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1), der Sie benachrichtigt, wenn der Gaspreis unter einen bestimmten Schwellenwert fällt. Für Mainnet-Transaktionen ist es eine gute Praxis, einen Gas-Schätzer wie [ETH Gas Station](https://ethgasstation.info/) zu Rate zu ziehen, um die richtige Menge an Gas zu bestimmen. 21000 ist die Mindestmenge an Gas, die eine Operation auf Ethereum verbraucht. Um sicherzustellen, dass unsere Transaktion ausgeführt wird, geben wir hier 30000 an.
  - `nonce`: siehe Nonce-Definition oben. Die Nonce-Zählung beginnt bei Null.
  - [OPTIONAL] data: Wird zum Senden zusätzlicher Informationen mit Ihrer Übertragung oder zum Aufrufen eines Smart Contracts verwendet. Für Guthabenübertragungen nicht erforderlich, siehe Hinweis unten.
- `signedTx`: Um unser Transaktionsobjekt zu signieren, verwenden wir die `signTransaction`-Methode mit unserem `PRIVATE_KEY`.
- `sendSignedTransaction`: Sobald wir eine signierte Transaktion haben, können wir sie mit `sendSignedTransaction` versenden, damit sie in einen nachfolgenden Block aufgenommen wird.

**Ein Hinweis zu Daten**
Es gibt zwei Haupttypen von Transaktionen, die in Ethereum gesendet werden können.

- Guthabenübertragung: Senden Sie ETH von einer Adresse zu einer anderen. Kein Datenfeld erforderlich. Wenn Sie jedoch zusätzliche Informationen mit Ihrer Transaktion senden möchten, können Sie diese Informationen in diesem Feld im HEX-Format angeben.
  - Nehmen wir zum Beispiel an, wir wollten den Hash eines IPFS-Dokuments in die Ethereum-Chain schreiben, um ihm einen unveränderlichen Zeitstempel zu geben. Unser Datenfeld sollte dann so aussehen: data: `web3.utils.toHex('IPFS-Hash')`. Und jetzt kann jeder die Chain abfragen und sehen, wann dieses Dokument hinzugefügt wurde.
- Smart-Contract-Transaktion: Führen Sie einen Smart-Contract-Code auf der Chain aus. In diesem Fall sollte das Datenfeld die Smart-Funktion, die Sie ausführen möchten, sowie alle Parameter enthalten.
  - Ein praktisches Beispiel finden Sie in Schritt 8 in diesem [Hello-World-Tutorial](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Den Code mit `node sendTx.js` ausführen {#run-the-code-using-node-sendtx-js}

Navigieren Sie zurück zu Ihrem Terminal oder Ihrer Befehlszeile und führen Sie Folgendes aus:

```
node sendTx.js
```

### 9. Sehen Sie Ihre Transaktion im Mempool {#see-your-transaction-in-the-mempool}

Öffnen Sie die [Mempool-Seite](https://dashboard.alchemyapi.io/mempool) in Ihrem Alchemy-Dashboard und filtern Sie nach der von Ihnen erstellten App, um Ihre Transaktion zu finden. Hier können wir den Übergang unserer Transaktion vom Status „ausstehend“ zum Status „gemined“ (bei Erfolg) oder „verworfen“ (bei Misserfolg) beobachten. Stellen Sie sicher, dass die Einstellung auf „Alle“ (All) bleibt, damit Sie „geminte“ (mined), „ausstehende“ (pending) und „verworfene“ (dropped) Transaktionen erfassen. Sie können auch nach Ihrer Transaktion suchen, indem Sie nach Transaktionen suchen, die an die Adresse `0x31b98d14007bdee637298086988a0bbd31184523` gesendet wurden.

Um die Details Ihrer Transaktion anzuzeigen, nachdem Sie sie gefunden haben, wählen Sie den Transaktions-Hash aus. Sie sollten dann zu einer Ansicht gelangen, die wie folgt aussieht:

![Mempool Watcher Screenshot](./mempool.png)

Von dort aus können Sie Ihre Transaktion auf Etherscan einsehen, indem Sie auf das rot eingekreiste Symbol klicken!

**Juhuuu!** Sie haben gerade Ihre erste Ethereum-Transaktion mit Alchemy gesendet 🎉\*\*

_Für Feedback und Vorschläge zu dieser Anleitung schreiben Sie bitte eine Nachricht an Elan auf Alchemys [Discord](https://discord.gg/A39JVCM)!_

_Ursprünglich veröffentlicht unter [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
