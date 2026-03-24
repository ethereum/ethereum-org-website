---
title: JavaScript-API-Bibliotheken
description: "Eine Einführung in die JavaScript-Client-Bibliotheken, mit denen Sie von Ihrer Anwendung aus mit der Blockchain interagieren können."
lang: de
---

Damit eine Web-App mit der Ethereum-Blockchain interagieren kann (d. h. Blockchain-Daten lesen und/oder Transaktionen an das Netzwerk senden), muss sie sich mit einem Ethereum-Blockchain-Knoten verbinden.

Zu diesem Zweck implementiert jede Ethereum-Anwendung die [JSON-RPC](/developers/docs/apis/json-rpc/)-Spezifikation, sodass es eine einheitliche Reihe von [Methoden](/developers/docs/apis/json-rpc/#json-rpc-methods) gibt, auf die sich Anwendungen verlassen können.

Wenn Sie JavaScript verwenden möchten, um sich mit einem Ethereum-Blockchain-Knoten zu verbinden, ist es möglich, reines JavaScript zu verwenden. Es gibt jedoch mehrere praktische Bibliotheken im Ökosystem, die dies viel einfacher machen. Mit diesen Bibliotheken können Entwickler intuitive, einzeilige Methoden schreiben, um JSON-RPC-Anfragen (im Hintergrund) zu initialisieren, die mit Ethereum interagieren.

Bitte beachten Sie, dass seit [The Merge](/roadmap/merge/) zwei verbundene Teile der Ethereum-Software – ein Ausführungs-Client und ein Konsens-Client – erforderlich sind, um einen Blockchain-Knoten auszuführen. Bitte stellen Sie sicher, dass Ihr Blockchain-Knoten sowohl einen Ausführungs- als auch einen Konsens-Client enthält. Wenn sich Ihr Blockchain-Knoten nicht auf Ihrem lokalen Computer befindet (z. B. wenn Ihr Blockchain-Knoten auf einer AWS-Instanz läuft), aktualisieren Sie die IP-Adressen im Tutorial entsprechend. Weitere Informationen finden Sie auf unserer Seite zum [Ausführen eines Blockchain-Knotens](/developers/docs/nodes-and-clients/run-a-node/).

## Voraussetzungen {#prerequisites}

Neben dem Verständnis von JavaScript könnte es hilfreich sein, den [Ethereum-Stack](/developers/docs/ethereum-stack/) und [Ethereum-Anwendungen](/developers/docs/nodes-and-clients/) zu verstehen.

## Warum eine Bibliothek verwenden? {#why-use-a-library}

Diese Bibliotheken abstrahieren einen Großteil der Komplexität der direkten Interaktion mit einem Ethereum-Blockchain-Knoten. Sie bieten auch Hilfsfunktionen (z. B. die Umwandlung von ETH in Gwei), sodass Sie als Entwickler weniger Zeit mit den Feinheiten von Ethereum-Anwendungen verbringen müssen und sich mehr auf die einzigartige Funktionalität Ihrer Anwendung konzentrieren können.

## Funktionen der Bibliothek {#library-features}

### Mit Ethereum-Blockchain-Knoten verbinden {#connect-to-ethereum-nodes}

Mithilfe von Providern ermöglichen Ihnen diese Bibliotheken, sich mit Ethereum zu verbinden und dessen Daten zu lesen, sei es über JSON-RPC, INFURA, Etherscan, Alchemy oder MetaMask.

> **Warnung:** Web3.js wurde am 4. März 2025 archiviert. [Lesen Sie die Ankündigung](https://blog.chainsafe.io/web3-js-sunset/). Erwägen Sie für neue Projekte die Verwendung alternativer Bibliotheken wie [ethers.js](https://ethers.org) oder [viem](https://viem.sh).

**Ethers-Beispiel**

```js
// Ein BrowserProvider kapselt einen Standard-Web3-Provider, welcher
// das ist, was MetaMask als window.ethereum in jede Seite einfügt
const provider = new ethers.BrowserProvider(window.ethereum)

// Das MetaMask-Plugin erlaubt auch das Signieren von Transaktionen, um
// Ether zu senden und zu bezahlen, um den Zustand innerhalb der Blockchain zu ändern.
// Dafür benötigen wir den Account-Signer...
const signer = provider.getSigner()
```

**Web3js-Beispiel**

```js
var web3 = new Web3("http://localhost:8545")
// oder
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Provider wechseln
web3.setProvider("ws://localhost:8546")
// oder
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Verwendung des IPC-Providers in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // Mac OS Pfad
// oder
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // Mac OS Pfad
// unter Windows ist der Pfad: "\\\\.\\pipe\\geth.ipc"
// unter Linux ist der Pfad: "/users/myuser/.ethereum/geth.ipc"
```

Sobald dies eingerichtet ist, können Sie die Blockchain abfragen nach:

- Blocknummern
- Gasschätzungen
- Smart-Contract-Ereignissen
- Netzwerk-ID
- und mehr ...

### Wallet-Funktionalität {#wallet-functionality}

Diese Bibliotheken bieten Ihnen Funktionen zum Erstellen von Wallets, Verwalten von Schlüsseln und Signieren von Transaktionen.

Hier ist ein Beispiel von Ethers

```js
// Erstelle eine Wallet-Instanz aus einem Mnemonic...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...oder aus einem privaten Schlüssel
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Die Adresse als Promise gemäß der Signer-API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Eine Wallet-Adresse ist auch synchron verfügbar
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Die internen kryptografischen Komponenten
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Das Wallet-Mnemonic
walletMnemonic.mnemonic
// {
// locale: 'en',
// path: 'm/44\'/60\'/0\'/0/0',
// phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Hinweis: Eine mit einem privaten Schlüssel erstellte Wallet hat
// kein Mnemonic (die Ableitung verhindert dies)
walletPrivateKey.mnemonic
// null

// Signieren einer Nachricht
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Signieren einer Transaktion
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Die connect-Methode gibt eine neue Instanz der
// Wallet zurück, die mit einem Provider verbunden ist
wallet = walletMnemonic.connect(provider)

// Abfragen des Netzwerks
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Senden von Ether
wallet.sendTransaction(tx)
```

[Lesen Sie die vollständige Dokumentation](https://docs.ethers.io/v5/api/signer/#Wallet)

Sobald dies eingerichtet ist, können Sie:

- Konten erstellen
- Transaktionen senden
- Transaktionen signieren
- und mehr ...

### Mit Smart-Contract-Funktionen interagieren {#interact-with-smart-contract-functions}

JavaScript-Client-Bibliotheken ermöglichen es Ihrer Anwendung, Smart-Contract-Funktionen aufzurufen, indem sie das Application Binary Interface (ABI) eines kompilierten Vertrags lesen.

Das ABI erklärt im Wesentlichen die Funktionen des Vertrags in einem JSON-Format und ermöglicht es Ihnen, ihn wie ein normales JavaScript-Objekt zu verwenden.

Der folgende Solidity-Vertrag:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Würde zu folgendem JSON führen:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Das bedeutet, Sie können:

- Eine Transaktion an den Smart Contract senden und seine Methode ausführen
- Einen Aufruf tätigen, um das Gas zu schätzen, das eine Methodenausführung bei der Ausführung in der Ethereum Virtual Machine benötigt
- Einen Vertrag bereitstellen
- Und mehr ...

### Hilfsfunktionen {#utility-functions}

Hilfsfunktionen bieten Ihnen praktische Verknüpfungen, die das Entwickeln mit Ethereum etwas einfacher machen.

ETH-Werte sind standardmäßig in Wei angegeben. 1 ETH = 1.000.000.000.000.000.000 WEI – das bedeutet, Sie haben es mit vielen Zahlen zu tun! `web3.utils.toWei` wandelt Ether für Sie in Wei um.

Und in Ethers sieht das so aus:

```js
// Abrufen des Guthabens eines Accounts (über Adresse oder ENS-Namen)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Oft müssen Sie die Ausgabe für den Benutzer formatieren,
// der es vorzieht, Werte in Ether (anstelle von Wei) zu sehen
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js-Hilfsfunktionen](https://docs.web3js.org/api/web3-utils)
- [Ethers-Hilfsfunktionen](https://docs.ethers.org/v6/api/utils/)

## Verfügbare Bibliotheken {#available-libraries}

**Web3.js –** **_Ethereum-JavaScript-API._**

- [Dokumentation](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js –** **_Vollständige Ethereum-Wallet-Implementierung und Hilfsprogramme in JavaScript und TypeScript._**

- [Ethers.js-Startseite](https://ethers.org/)
- [Dokumentation](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph –** **_Ein Protokoll zur Indizierung von Ethereum- und IPFS-Daten und deren Abfrage mittels GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentation](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK –** **_Wrapper um Ethers.js mit erweiterten APIs._**

- [Dokumentation](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem –** **_TypeScript-Schnittstelle für Ethereum._**

- [Dokumentation](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex –** **_Echtzeit-API für angereicherte Blockchain-Daten über Dutzende von Chains hinweg._**

- [Dokumentation](https://docs.codex.io)
- [Explorer](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift –** **_TypeScript-Meta-Bibliothek mit integriertem Caching, Hooks und Test-Mocks._**

- [Dokumentation](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)

## Verwandte Tutorials {#related-tutorials}

- [Web3js einrichten, um die Ethereum-Blockchain in JavaScript zu nutzen](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Anleitung zur Einrichtung von web3.js in Ihrem Projekt._
- [Einen Smart Contract aus JavaScript aufrufen](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Sehen Sie am Beispiel des DAI-Tokens, wie man Vertragsfunktionen mit JavaScript aufruft._
- [Transaktionen mit web3 und Alchemy senden](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Schritt-für-Schritt-Anleitung zum Senden von Transaktionen aus dem Backend._

## Tutorials: JavaScript-APIs & WebSockets auf Ethereum {#tutorials}

- [WebSockets verwenden](/developers/tutorials/using-websockets/) _– Wie man WebSockets mit Alchemy verwendet, um Ethereum-Ereignisse zu abonnieren und JSON-RPC-Anfragen in Echtzeit zu stellen._