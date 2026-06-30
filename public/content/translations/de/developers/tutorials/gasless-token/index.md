---
title: "Ihren gaslosen Nutzern ermöglichen, Token zu halten und Verträge aufzurufen"
description: "Mithilfe der Kontoabstraktion können wir Smart-Contract-Wallets erstellen, die Transaktionen akzeptieren, welche von einem bestimmten EOA gesendet oder von diesem EOA signiert wurden. Diese Smart Contracts können dann Token besitzen, die unter der Kontrolle des EOA stehen."
author: Ori Pomerantz
tags: ["gaslos", "ERC-20", "Kontoabstraktion"]
skill: intermediate
breadcrumb: Gasloser Token
lang: de
published: 2026-04-01
---

## Einführung {#introduction}

Ein [vorheriger Artikel](/developers/tutorials/gasless/) behandelte den gaslosen Zugriff auf Ihre eigene Anwendung mithilfe von EIP-712-Signaturen, was jedoch auf Ihre eigenen Smart Contracts beschränkt ist. Mithilfe der [Kontoabstraktion](/roadmap/account-abstraction/) können wir Smart-Contract-Wallets erstellen, die zwei Arten von Transaktionen akzeptieren und an ein gewünschtes Ziel weiterleiten:

- Transaktionen, die von einem bestimmten extern verwalteten Konto (EOA) gesendet werden (was erfordert, dass dieses EOA über ETH verfügt)
- Transaktionen, die von überall gesendet, aber von demselben EOA signiert wurden.

Auf diese Weise können wir eine gaslose Möglichkeit für ein Konto bereitstellen, Vermögenswerte (Token usw.) zu halten und alle Funktionen auszuführen, die ein EOA mit Gas ausführen kann.

### Warum können wir die Anfrage nicht einfach weiterleiten? {#why-no-tx-origin}

In ERC-20 und verwandten Standards ist der Kontoinhaber [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), die Adresse, die den Token-Vertrag aufgerufen hat, was nicht zwangsläufig der Urheber der Transaktion, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), ist. Dies ist aus [Sicherheitsgründen](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) erforderlich. Das bedeutet, dass bei der Weiterleitung von Token-Transfer-Anfragen versucht wird, Token von der Adresse des Relayers zu transferieren, anstatt von einer Adresse, die vom Nutzer kontrolliert wird.

Es gibt eine Lösung, die es Ihnen ermöglicht, die EOA-Adresse über [EIP-7702](https://eip7702.io/) zu verwenden, aber sie erfordert das Signieren einer potenziell gefährlichen Delegation, sodass Sie sie nur verwenden können, um an einen Smart Contract zu delegieren, den der Wallet-Anbieter genehmigt. Für dieses Tutorial bevorzuge ich die viel einfachere Methode, einen Smart Contract als Proxy für den Nutzer zu erstellen.

## Das Ganze in Aktion sehen {#in-action}

1. Stellen Sie sicher, dass Sie sowohl [Node](https://nodejs.org/en/download) als auch [Foundry](https://www.getfoundry.sh/introduction/installation) installiert haben.

2. Klonen Sie die Anwendung und installieren Sie die erforderliche Software.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Bearbeiten Sie `.env`, um `SEPOLIA_PRIVATE_KEY` auf eine Wallet zu setzen, die über ETH auf Sepolia verfügt. Wenn Sie Sepolia-ETH benötigen, [verwenden Sie ein Faucet](/developers/docs/networks/#sepolia), um es zu erhalten. Idealerweise sollte sich dieser private Schlüssel von dem in Ihrer Browser-Wallet unterscheiden.

4. Starten Sie den Server.

   ```sh
   npm run dev
   ```

5. Rufen Sie die Anwendung unter der URL [`http://localhost:5173`](http://localhost:5173) auf.

6. Klicken Sie auf **Connect with Injected**, um sich mit einer Wallet zu verbinden. Genehmigen Sie dies in der Wallet und genehmigen Sie bei Bedarf den Wechsel zu Sepolia.

7. Scrollen Sie nach unten und klicken Sie auf **Deploy UserProxy (slow process)**.

8. Sie können sehen, wann der User-Proxy bereitgestellt wurde, da neben **UserProxy access** eine Adresse steht. Wenn Sie 24 Sekunden (2 Blöcke) gewartet haben und es immer noch nicht passiert ist, gibt es möglicherweise ein Problem bei der Erkennung von Änderungen.

   Wenn dies der Fall ist, gehen Sie zum [Sepolia-Block-Explorer](https://eth-sepolia.blockscout.com/) und geben Sie den Transaktions-Hash der Bereitstellung ein, den Sie in der Serverausgabe bei `npm run dev` sehen. Klicken Sie auf den erstellten Vertrag, um seine Adresse anzuzeigen, und kopieren Sie sie. Fügen Sie die Adresse in das Feld _Or enter existing proxy address_ ein und klicken Sie dann auf **Set proxy address**.

9. Klicken Sie auf **Request more tokens for proxy**, um einen Aufruf an die Funktion [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) des ERC-20-Vertrags zu senden, um Token zu erhalten. **Confirm** (Bestätigen) Sie die Signatur in der Wallet. Natürlich erreichen die Token die Adresse des Proxys, nicht die des Nutzers.

10. Scrollen Sie nach unten und klicken Sie auf den Link unter _Last transaction:_. Dadurch wird der Browser geöffnet, um Ihnen die Transaktion `faucet` anzuzeigen.

11. Geben Sie unter _amount to transfer_ eine Zahl zwischen eins und eintausend ein. Klicken Sie auf **Transfer**, um die Token an Ihre eigene Adresse zu transferieren. Bevor Sie für die Anfrage auf **Confirm** klicken, beachten Sie, dass die zu signierenden Daten undurchsichtig sind. Nutzer hätten es schwer zu verstehen, was sie signieren. Denken Sie daran, dass wir dies [unten](#vulnerabilities) besprechen werden.

12. Warten Sie nach der Bestätigung der Transaktion, um die Änderung sowohl bei _your balance_ als auch bei _proxy balance_ zu sehen. Beachten Sie, dass dies ebenfalls einige Zeit in Anspruch nehmen wird, da Sepolia eine Blockzeit von 12 Sekunden hat.

## Wie es funktioniert {#how-work}

Für ein gasloses Erlebnis benötigen wir eine Benutzeroberfläche für den Nutzer, einen Server, um Nachrichten von der Benutzeroberfläche an die Chain weiterzuleiten, und einen Smart Contract, um sie zu empfangen und zu verifizieren.

### Der Wallet-Smart-Contract {#wallet-smart-contract}

Dies ist [der Smart Contract](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Sein Zweck ist es, alles zu tun, was der tatsächliche Eigentümer anfordert, unabhängig davon, über welchen Kanal die Anfrage gestellt wird, und alles andere zu ignorieren. Um dies zu tun, erhalten seine Funktionen eine Zieladresse, die aufgerufen werden soll, und die Daten, die für den Aufruf verwendet werden sollen.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Die Identität des Eigentümers und eine [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), um zu verhindern, dass Nachrichten wiederholt werden. Da die Nonce eine `public`-Variable ist, erstellt der Solidity-Compiler auch eine View-Funktion, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), die es Offchain-Code ermöglicht, ihren Wert zu lesen.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Die Informationen, die zur Verifizierung von [EIP-712-Signaturen](https://eips.ethereum.org/EIPS/eip-712) erforderlich sind.

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Ein `UserProxy` ist an eine einzige Eigentümeradresse gebunden. Dies ist notwendig, da er Vermögenswerte (ERC-20-Token, NFTs usw.) besitzen kann. Wir möchten keine Vermögenswerte vermischen, die verschiedenen Eigentümern gehören.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Der [Domain-Separator](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Er kann nicht zur Kompilierzeit berechnet werden, da er von der Chain-ID und der Vertragsadresse abhängt. Dies macht es unmöglich, dass ein UserProxy durch eine für einen anderen vorbereitete Nachricht getäuscht wird.

```solidity
    event CallResult(address target, bytes returnData);
```

Die Ergebnisse eines Aufrufs protokollieren.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Diese Funktion kann direkt vom Eigentümer aufgerufen werden. Wenn keine Relays verfügbar sind, kann der Eigentümer weiterhin direkt auf der Blockchain auf die Vermögenswerte zugreifen (sofern der Nutzer über ETH verfügt).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Wenn wir _direkt_ vom Eigentümer aufgerufen werden, rufen Sie das Ziel mit den bereitgestellten Aufrufdaten auf.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Dies ist die Hauptfunktion von `UserProxy`. Sie erhält `target` und `data` sowie eine Signatur.

```solidity
    external returns (bytes memory) {
        // EIP-712-Digest berechnen
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Der Digest enthält auch die Nonce, aber wir müssen sie nicht aus der Transaktion erhalten; wir kennen bereits den richtigen Wert. Eine Signatur mit der falschen Nonce wird abgelehnt.

```solidity

    // Unterzeichner wiederherstellen
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Wenn die Signatur ungültig ist, gibt `ecrecover` normalerweise eine andere Adresse zurück und sie wird nicht akzeptiert.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Rufen Sie den Vertrag auf, den der Nutzer uns aufzurufen angewiesen hat, und machen Sie dies rückgängig, falls es nicht erfolgreich ist.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Nonce erhöhen, um Replay zu verhindern

    return returnData;
}
```

Wenn erfolgreich, geben Sie ein Log-Ereignis aus und erhöhen Sie die Nonce.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Dies sind nahezu identische Varianten, mit denen Sie auch ETH aus dem Vertrag transferieren können.

### Der Relayer {#relayer}

Der Relayer ist eine [Serverkomponente](/developers/tutorials/server-components/). Er ist in JavaScript geschrieben; Sie können den Quellcode [hier](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) einsehen.

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Die Bibliotheken, die wir benötigen. Dies ist ein [Express](https://expressjs.com/)-Server, der [Vite](https://vite.dev/) verwendet, um den Code der Benutzeroberfläche bereitzustellen. Wir verwenden [Viem](https://viem.sh/), um mit der Blockchain zu kommunizieren, und [dotenv](https://www.dotenv.org/), um den privaten Schlüssel für die Adresse zu lesen, die die Transaktion sendet.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Dies ist eine einfache Möglichkeit, den kompilierten `UserProxy` zu lesen. Wir benötigen die ABI, um `UserProxy` aufrufen zu können, und den kompilierten Code, um ihn für einen Nutzer bereitstellen zu können.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Lesen Sie die Datei `.env`, extrahieren Sie die Adresse und geben Sie sie in der Konsole aus.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Die Viem-Clients, die mit der Blockchain kommunizieren.

```js
const start = async () => {
  const app = express()
```

Führen Sie einen Express-Server aus.

```js
  app.use(express.json())
```

Weisen Sie Express an, den Anfrage-Body zu lesen und ihn zu parsen, falls es sich um JSON handelt.

```js
  app.post("/server/deploy", async (req, res) => {
```

Dies ist der Code, der Anfragen zur Bereitstellung des Proxys verarbeitet. Beachten Sie, dass wir hier anfällig für [Denial-of-Service](https://en.wikipedia.org/wiki/Denial-of-service_attack)-Angriffe sind, da ein Angreifer uns mit Anfragen zur Bereitstellung des Proxys überfluten kann, bis unser ETH aufgebraucht ist. Auf einem Produktionssystem würden wir wahrscheinlich verlangen, dass die Anfrage zur Bereitstellung des Proxys signiert ist und dass der Unterzeichner ein bestehender Kunde ist.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Rufen Sie die Adresse des Eigentümers aus der Anfrage ab.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Stellen Sie den Vertrag bereit](https://viem.sh/docs/contract/deployContract#deploycontract) und [warten Sie, bis er bereitgestellt ist](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Wenn alles in Ordnung ist, geben Sie die Proxy-Adresse an die Benutzeroberfläche zurück.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Wenn es ein Problem gibt, melden Sie es.

```js
  app.post("/server/message", async (req, res) => {
```

Dies ist der Code, der Nutzernachrichten für den Vertrag `UserProxy` verarbeitet. Dies ist ein weiterer Punkt, der anfällig für einen Denial-of-Service-Angriff ist.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Rufen Sie die Anfragedaten ab und verwenden Sie sie, um `signedAccess` auf dem Proxy aufzurufen.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Melden Sie den Transaktions-Hash zurück. Dadurch kann die Benutzeroberfläche eine URL anzeigen, über die der Nutzer die Transaktion überprüfen kann.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Auch hier gilt: Wenn es ein Problem gibt, melden Sie es.

```js
  // Vite alles andere erledigen lassen
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Verwenden Sie für alles andere Vite, das die Bereitstellung der Benutzeroberfläche für uns übernimmt.

### Benutzeroberfläche {#user-interface}

[Dies ist der Code der Benutzeroberfläche](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Der Großteil des Codes ist nahezu identisch mit dem in [diesem Artikel](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) dokumentierten Code, mit Ausnahme von [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Teile von [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) ähneln [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) in [diesem Artikel](/developers/tutorials/gasless/#ui-changes). Hier sind die neuen Teile.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Diese Funktion](https://viem.sh/docs/contract/encodeFunctionData) erstellt die Aufrufdaten für einen EVM-Funktionsaufruf. Dies ist notwendig, damit der Nutzer die Aufrufdaten signieren kann.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

Der `UserProxy`, wie oben erklärt.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Dieser Vertrag](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) ist größtenteils ein normaler ERC-20-Vertrag, mit dem Zusatz einer wichtigen Funktion, `faucet()`. Diese Funktion gewährt jedem, der danach fragt, Token zu Testzwecken.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Die Adresse für `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Diese Komponente gibt eine Adresse mit einem Link zum Vertrag auf einem Block-Explorer aus.

```js
const Token = () => {
    ...
```

Dies ist die Hauptkomponente, die die meiste Arbeit erledigt.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Der Token-Kontostand der Nutzeradresse.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Die Adresse eines Proxys, der dem Nutzer gehört.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Der Token-Kontostand des Proxys.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Dieses Feld wird verwendet, wenn der Nutzer die Proxy-Adresse manuell festlegt. Die Möglichkeit, die Proxy-Adresse manuell festzulegen, erlaubt es dem Nutzer, einen bestehenden Proxy zu verwenden, anstatt jedes Mal einen neuen bereitzustellen (und alle Token zu verlieren, die dem alten Proxy gehören).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Der Hash der letzten Transaktion, der verwendet wird, um einen Link zum Explorer anzuzeigen, damit der Nutzer diese Transaktion überprüfen kann.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Diese Felder werden alle verwendet, um Token-Transfer-Befehle an einen ERC-20-Vertrag zu senden. Dies kann `FaucetToken` sein, muss es aber nicht. Die Funktion [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) ist Teil des ERC-20-Standards.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Lesen Sie die beiden Token-Kontostände, an denen wir interessiert sind: wie viel der Nutzer besitzt und wie viel der Proxy besitzt.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Um Replay-Angriffe zu verhindern (zum Beispiel ein Verkäufer, der eine Transaktion wiederholt, die ihm Geld einbringt), verwenden wir eine [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Wir müssen den aktuellen Wert kennen, um ihn den Daten hinzuzufügen, die wir signieren.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Verwenden Sie [`useEffect`](https://react.dev/reference/react/useEffect), um den dem Nutzer angezeigten Kontostand zu aktualisieren, wenn sich die aus der Blockchain gelesenen Informationen ändern.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Standardmäßig werden `FaucetToken`-Token auf das eigene Konto des Nutzers transferiert. Hier legen wir diese Werte fest, wenn wir sie von Viem erhalten.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Ereignis-Handler für den Fall, dass sich die Textfelder ändern.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Bitten Sie den Server, einen Proxy für diesen Nutzer bereitzustellen.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Signieren Sie eine Nachricht, bevor Sie sie an den Server senden, um sie Onchain an `UserProxy` zu senden. Dies wird [hier](/developers/tutorials/gasless/#ui-changes) erklärt. Wir müssen eine Nachricht sowohl mit der Zieladresse (der Adresse des Tokens, den wir aufrufen) als auch mit den zu sendenden Aufrufdaten signieren.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Senden Sie eine signierte Nachricht an `UserProxy`, der die Signatur verifiziert und sie dann an das `target` sendet.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // beide Adressen
          data,           // Aufrufdaten zum Senden an das Ziel
          v, r, s         // Signatur
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Senden Sie eine Anfrage an den Server und rufen Sie den Transaktions-Hash ab, wenn Sie die Antwort erhalten.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Simulieren Sie den Aufruf der Funktion `faucet`. Wir aktivieren den Faucet-Button nur, wenn dies erfolgreich ist.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Um eine Funktion über den Server und `UserProxy` aufzurufen, befolgen wir drei Schritte:

1. Erstellen Sie die Aufrufdaten zum Signieren und Senden mithilfe von [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Signieren Sie die Nachricht (Zieladresse, Aufrufdaten und Nonce).

3. Senden Sie die Nachricht an den Server.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Dieser Teil der Komponente ermöglicht es Ihnen, `FaucetToken` direkt aus dem Browser zu verwenden. Sein Hauptzweck ist es, das Debugging zu erleichtern.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Lassen Sie den Nutzer einen neuen `UserProxy` bereitstellen.

```js
         <br /><br />
         <input type="text" placeholder="Oder bestehende Proxy-Adresse eingeben" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Lassen Sie Nutzer nur dann auf **Set proxy address** klicken, wenn sie eine legitime Adresse eingeben. Beachten Sie, dass dies nicht sicherstellt, dass es sich bei der betreffenden Adresse tatsächlich um einen `UserProxy`-Vertrag handelt. Es ist möglich, eine solche Überprüfung hinzuzufügen, aber sie wird viel langsamer sein (schlechtere Nutzererfahrung) und die Sicherheit nicht verbessern (Angreifer können immer ihren eigenen Code für die Benutzeroberfläche verwenden).

```js
         <br /><br />
         { proxyAddr && (
```

Zeigen Sie den Rest _nur_ an, wenn es eine legitime Proxy-Adresse gibt.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Der Nutzer muss die Nonce nicht kennen; dies dient nur zu Debugging-Zwecken.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Wir können keinen Aufruf von `faucet()` über den Proxy simulieren. Wir können jedoch zumindest sicherstellen, dass wir einen Proxy haben und dass der Proxy uns eine Nonce gemeldet hat.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Lassen Sie den Nutzer ERC-20-Transfer-Transaktionen ausgeben.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Wenn es einen letzten Transaktions-Hash gibt, zeigen Sie einen Link an, damit der Nutzer ihn in einem Block-Explorer anzeigen kann.

```js
 
</div>
    </>
  )
}

export {Token}
```

Dies ist nur React-Boilerplate.

## Schwachstellen {#vulnerabilities}

Unser Server ist anfällig für Denial-of-Service-Angriffe. Dieser Angriff wird [im vorherigen Artikel der Serie](/developers/tutorials/gasless/#dos-on-server) erklärt.

Zusätzlich fördern wir schlechtes Nutzerverhalten. Dies ist es, was wir den Nutzer bitten zu signieren:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Wir_ wissen, dass dies ein legitimer ERC-20-Transfer für den Token, den Betrag und die Zieladresse ist, die der Nutzer transferieren möchte. Aber die meisten Nutzer wissen nicht, wie sie Aufrufdaten interpretieren sollen, und haben keine Ahnung, was sie signieren. Das ist aus zwei Gründen ein schlechtes Design:

- Einige Nutzer werden uns nicht nutzen, weil sie den Daten nicht vertrauen, die wir sie bitten zu signieren.
- Andere Nutzer _werden_ uns vertrauen und lernen, dass sie einfach Aufrufdaten signieren sollten, ohne zu verstehen, was sie sind. Das bedeutet, dass, wenn Adam Angreifer es schafft, sie auf seine Website umzuleiten, er sie eine Transaktion signieren lassen kann, die ihm alle USDC (oder DAI oder jeden anderen ERC-20) gewährt, die der Nutzer besitzt.

Die Lösung besteht darin, separate Funktionen in `UserProxy` für häufig verwendete Funktionen wie Transfer zu haben. Dann können Nutzer etwas signieren, das sie verstehen.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Hinweis:** Während Nutzer jede beliebige Wallet verwenden können, wird dringend empfohlen, dass Anwendungen, die EIP-712 verwenden, sie dazu ermutigen, eine Wallet zu verwenden, die [die gesamten Signaturdaten anzeigt](https://rabby.io/). Einige Wallets kürzen die Adresse ab, was unsicher ist. Ein Angreifer kann eine Adresse erstellen, die die gleichen Anfangs- und Endzeichen hat, sich aber in der Mitte unterscheidet.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Fazit {#conclusion}

Zusätzlich zu den oben genannten Schwachstellen hat die Lösung in diesem Tutorial einige Nachteile, bei deren Behebung Ethereum uns helfen kann.

- _Zensurresistenz_. Derzeit können Nutzer Ihren Server oder einen konkurrierenden Server verwenden, der von jemand anderem eingerichtet wurde, oder sich direkt mit Ethereum verbinden, was Gaskosten verursacht. Die Verwendung von [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) ermöglicht es Nutzern, ihre Transaktion einem großen Pool von Servern anzubieten, was die Wahrscheinlichkeit verringert, dass ihre Transaktionen zensiert werden.
- _Vermögenswerte im Besitz von EOAs_. Wie oben angemerkt, kann [EIP-7702](https://eip7702.io/) verwendet werden, um Vermögenswerte zu verwalten, die sich bereits im Besitz einer EOA-Adresse befinden. Dies hat seine Schwierigkeiten, ist aber manchmal notwendig.

Ich hoffe, in naher Zukunft Tutorials zum Hinzufügen dieser Funktionen veröffentlichen zu können.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).
