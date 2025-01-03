---
title: JavaScript-API-Bibliotheken
description: Eine Einführung in die JavaScript-Client-Bibliotheken, über die Sie von Ihrer Anwendung aus mit der Blockchain interagieren können.
lang: de
---

Damit eine Web-Anwendung mit der Ethereum-Blockchain interagieren kann (z. B. Auslesen von Blockchain-Daten und/oder Senden von Transaktionen an das Netzwerk), muss sie sich mit einem Ethereum-Node verbinden.

Zu diesem Zweck implementiert jeder Ethereum-Client die [JSON-RPC](/developers/docs/apis/json-rpc/)-Spezifikation, damit es einen einheitlichen Satz von [Methoden](/developers/docs/apis/json-rpc/#json-rpc-methods) gibt, auf die sich Anwendungen verlassen können.

Wenn Sie sich über JavaScript mit einem Ethereum-Node verbinden möchten, ist das auch über VanillaJavaScript möglich. Doch es existieren noch weitere Lösungen in Programmbibliotheken in diesem Ökosystem, die das alles viel einfacher machen. Mit diesen Programmbibliotheken können Entwickler intuitive, einzeilige Methoden schreiben, um JSON-RPC-Anfragen („unter der Haube“) zu initialisieren, die mit Ethereum interagieren.

Bitte beachten Sie, dass seit [der Zusammenführung](/roadmap/merge/) zwei verbundene Teile von Ethereum-Software benötigt werden, um einen Knoten zu betreiben. Ein Ausführungsclient und ein Konsensclient. Bitte stellen Sie sicher, dass Ihr Knoten sowohl über einen Ausführungs- als auch einen Konsensclient verfügt. Wenn sich Ihr Knoten nicht auf einem lokalen Rechner (Ihr Knoten läuft z. B. auf einer AWS-Instanz) befindet, müssen Sie die IP-Adressen im Tutorial entsprechend anpassen. Für weitere Informationen schauen Sie sich unsere Seite zum [Betreiben eines Knotens](/developers/docs/nodes-and-clients/run-a-node/) an.

## Voraussetzungen {#prerequisites}

Sie müssen JavaScript verstehen. Zusätzlich ist es hilfreich, wenn Sie den [Ethereum-Stack](/developers/docs/ethereum-stack/) und [Ethereum-Clients](/developers/docs/nodes-and-clients/) ebenfalls verstehen.

## Warum eine Programmbibliothek verwenden? {#why-use-a-library}

Mit diesen Programmbibliotheken lässt sich die direkte Interaktion mit einem Ethereum-Node erheblich vereinfachen. Zudem bieten sie Dienstprogrammfunktionen (z. B. Umwandlung von ETH zu GWei), so dass Sie als Entwickler weniger Zeit damit verbringen, Probleme mit Ethereum-Clients zu lösen, und sich auf die einzigartigen Funktionen Ihrer Applikation konzentrieren können.

## Eigenschaften von Programmbibliotheken {#library-features}

### Verbindung mit Ethereum-Nodes {#connect-to-ethereum-nodes}

Sie können sich über einen Provider und diese Bibliotheken mit Ethereum verbinden und die Daten auslesen – über JSON-RPC, INFURA, Etherscan, Alchemy oder MetaMask.

**Ether-Beispiel**

```js
// Ein BrowserProvider umschließt einen standardmäßigen Web3-Provider, der
// von MetaMask als window.ethereum in jede Seite injiziert wird
const provider = new ethers.BrowserProvider(window.ethereum)

// Das MetaMask-Plugin ermöglicht auch das Signieren von Transaktionen, um
// Ether zu senden und bezahlte Statusänderungen innerhalb der Blockchain vorzunehmen.
// Dazu benötigen wir den Unterzeichner vom Konto...
const signer = provider.getSigner()
```

**Web3j-Beispiel**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Provider wechseln
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Verwendung der IPC Provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// oder
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // Mac OS Pfad
// in Windows ist der Pfad: "\\\\.\\pipe\\geth.ipc"
// in Linux ist der Pfad: "/users/myuser/.ethereum/geth.ipc"
```

Sobald die Einrichtung abgeschlossen ist, können Sie folgende Abfragen für die Blockchain vornehmen:

- Blocknummern
- Ressourcen-Schätzung
- Smart-Contract-Ereignisse
- Netzwerk-ID
- und weitere...

### Wallet-Funktionalität {#wallet-functionality}

Diese Programmbibliotheken bieten Ihnen die Funktionalität, um Wallets zu erstellen, Schlüssel zu verwalten und Transaktionen zu signieren.

Hier ist ein Beispiel von Ethers

```js
// Erstelle eine Wallet-Instanz aus einem Mnemonik...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...oder aus einem privaten Schlüssel
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Die Adresse als Promise gemäß der Signer API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Die Wallet-Adresse ist auch synchron verfügbar
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Die internen kryptographischen Komponenten
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Die Wallet-Mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Hinweis: Ein Wallet, das mit einem privaten Schlüssel erstellt wurde, hat keine
//       Mnemonic (die Ableitung verhindert dies)
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

// Die Connect-Methode gibt eine neue Instanz des
// Wallets zurück, die mit einem Provider verbunden ist
wallet = walletMnemonic.connect(provider)

// Abfragen des Netzwerks
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Ether senden
wallet.sendTransaction(tx)
```

[Lesen Sie die ganzen Dokumente](https://docs.ethers.io/v5/api/signer/#Wallet)

Einmal eingerichtet, können Sie:

- Konten erstellen
- Transaktionen senden
- Transaktionen signieren
- und weitere...

### Mit den Funktionen von Smart Contracts interagieren {#interact-with-smart-contract-functions}

JavaScript-Client-Bibliotheken ermöglichen Ihrer Anwendung, Smart Contract-Funktionen aufzurufen. Dafür lesen sie die Application Binary Interface (ABI) eines kompilierten Vertrags.

Die ABI erklärt im Wesentlichen die Funktionen des Vertrags im JSON-Format und erlaubt die Verwendung wie ein normales JavaScript-Objekt.

Also folgender Solidity-Vertrag:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Würde in nachfolgendem JSON resultieren:

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

Dies bedeutet Sie können:

- Sie können eine Transaktion an den Smart Contract senden und seine Methode ausführen.
- Sie können eine Ressourcen-Schätzung aufrufen, für die eine Ausführungsmethode in der EVM bei Ausführung erforderlich wird.
- Sie können einen Vertrag bereitstellen.
- Und mehr...

### Dienstprogrammfunktionen {#utility-functions}

Die Dienstprogrammfunktionen stellen Ihnen praktische Verknüpfungen bereit, die das Entwickeln mit Ethereum erleichtern.

ETH-Werte sind standardmäßig in Wei. 1 ETH = 1.000.000.000.000.000.000.000.000 WEI – sprich, Sie haben es mit vielen Zahlen zu tun. `web3.utils.toWei` konvertiert für Sie Ether in Wei.

Das sieht in Ether wie folgt aus:

```js
// Holen Sie sich das Guthaben eines Kontos (über Adresse oder ENS-Name)
Guthaben = provider.getBalance("Ethers. th")
// // { BigNumber: "2337132817842795605" }

// Oft müssen Sie die Ausgabe für den Benutzer formatieren,
// dieser bevorzugt die Werte lieber in Ether (anstatt Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js-Dienstprogrammfunktionen](https://docs.web3js.org/api/web3-utils)
- [Ethers-Dienstprogrammfunktionen](https://docs.ethers.io/v5/api/utils/)

## Verfügbare Programmbibliotheken {#available-libraries}

**Web3.js –** **_Ethereum-JavaScript-API_**

- [Dokumentation](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js –** **_Eine vollständige Ethereum-Wallet-Implementierung und Dienstprogramme in JavaScript und TypeScript_**

- [Dokumentation](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph –** **_Ein Protokoll für die Indizierung von Ethereum- und IPFS-Daten und Abfragen mit GraphQL_**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Dokumentation](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js –** **_Eine reaktive High-Level-JS-Bibliothek, die für leichte Clients optimiert wurde._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-Wrapper –** **_Eine Typescript-Alternative zu Web3.js_**

- [Dokumentation](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 –** **_Wrapper um Web3.js mit automatischen Wiederholungen und erweiterten APIs_**

- [Dokumentation](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API –** **_API für den Abruf von NFT-Daten, einschließlich Eigentumsrechten, Metadatenattributen und mehr._**

- [Dokumentation](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Viem -** **_Schnittstelle in TypeScript für Ethereum._**

- [Dokumentation](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

## Weiterführende Informationen {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Knotenpunkte und Clients](/developers/docs/nodes-and-clients/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)

## Ähnliche Tutorials {#related-tutorials}

- [Web3js einrichten, um die Ethereum-Blockchain in JavaScript zu nutzen](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Leitfaden für die Einrichtung von web3.js in Ihrem Projekt._
- [Aufruf eines intelligenten Vertrags mit JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Mit dem DAI-Token können Sie die Funktion „Verträge aufrufen“ mit JavaScript verwenden._
- [Transaktionen über web3 und Alchemy senden](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Schritt-für-Schritt-Komplettlösung zum Senden von Transaktionen aus dem Backend._
