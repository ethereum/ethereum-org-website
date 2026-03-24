---
title: NFT-Minter Tutorial
description: In diesem Tutorial erstellst du einen NFT-Minter und lernst, wie man eine Full-Stack-Dapp erstellt, indem du deinen Smart Contract mit einem React-Frontend unter Verwendung von MetaMask und Web3-Tools verbindest.
author: "smudgil"
tags: ["solidity", "NFT", "alchemy", "smart contracts", "frontend", "Pinata"]
skill: intermediate
breadcrumb: "NFT-Minter-Dapp"
lang: de
published: 2021-10-06
---

Eine der größten Herausforderungen für Entwickler mit einem Web2-Hintergrund ist herauszufinden, wie sie ihren Smart Contract mit einem Frontend Projekt verbinden und mit ihm interagieren können.

Durch den Bau eines NFT-Minters - eine einfache Benutzeroberfläche, auf welcher ein Link den Nutzer zu seinen digitalen Vermögenswerten führt, ein Titel und eine Beschreibung - werden Sie Folgendes lernen:

- Verbinden von MetaMask mit Ihrem Frontend-Projekt
- Rufen von Smart-Contract Methoden von Ihrem Frontend
- Transaktionen mit MetaMask signieren

In diesem Tutorial werden wir [React](https://react.dev/) als unser Frontend-Framework verwenden. Da sich dieses Tutorial in erster Linie auf die Web3-Entwicklung konzentriert, werden wir nicht viel Zeit darauf verwenden, die React Grundlagen zu behandeln. Stattdessen konzentrieren wir uns darauf, Funktionalität in unser Projekt zu bringen.

Als Voraussetzung solltest du ein grundlegendes Verständnis von React haben – du solltest wissen, wie Komponenten, Props, useState/useEffect und grundlegende Funktionsaufrufe funktionieren. Wenn du noch nie von diesen Begriffen gehört hast, solltest du dir dieses [Einführungstutorial zu React](https://react.dev/learn/tutorial-tic-tac-toe) ansehen. Für diejenigen, die eher visuell lernen, empfehlen wir diese ausgezeichnete Videoreihe [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) von Net Ninja.

Und wenn Sie sich noch nicht angemeldet haben, dann benötigen Sie auf jeden Fall einen Alchemy Account, um dieses Tutorial zu beenden und um etwas auf der Blockchain bauen zu können. Registriere dich [hier](https://alchemy.com/) für ein kostenloses Konto.

Lass uns ohne weiteres starten!

## NFTs erstellen 101 {#making-nfts-101}

Bevor wir uns überhaupt einen Code anschauen, ist es wichtig zu verstehen, wie das erstellen von NFTs überhaupt funktioniert. Es benötigt dafür zwei Schritte:

### Einen NFT-Smart-Contract auf der Ethereum-Blockchain veröffentlichen {#publish-nft}

Der größte Unterschied zwischen den beiden NFT smart Kontrakt Standards ist, dass der ERC-1155 ein Multi-Token Standard ist und eine Handvoll Funktionalitäten beinhaltet, wobei man mit dem ERC-721, welcher ein Single-Token Standard ist, nur eine Token-Transaktion gleichzeitig ausführen kann.

### Die Minting-Funktion aufrufen {#minting-function}

Normalerweise verlangt diese Minting-Funktion, dass du zwei Variablen als Parameter übergibst: erstens den `recipient` (Empfänger), der die Adresse angibt, die deinen frisch geminteten NFT erhält, und zweitens die `tokenURI` des NFTs, eine Zeichenfolge, die zu einem JSON-Dokument aufgelöst wird, das die Metadaten des NFTs beschreibt.

Die NFT Metadaten sind das, was Leben hineinbringt, welches Ihnen erlaubt Eigenschaften zu haben, wie zum Beispiel: Namen, eine Beschreibung, ein Bild (oder andere digitale Vermögenswerte), und andere Attribute. [Hier ist ein Beispiel für eine tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), die die Metadaten eines NFT enthält.

In diesem Tutorial werden wir uns auf den 2 Teil fokussieren, das Aufrufen von einer bereits existierenden NFT smart Kontrakt Prägungs Funktion, indem wir unsere React UI benutzen.

[Hier ist ein Link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) zu dem ERC-721-NFT-Smart-Contract, den wir in diesem Tutorial aufrufen werden. Wenn du lernen möchtest, wie wir ihn erstellt haben, empfehlen wir dir dringend unser anderes Tutorial [„Wie man einen NFT erstellt“](https://www.alchemy.com/docs/how-to-create-an-nft).

Cool, nun verstehen wir wie die Erstellung von NFTS funktioniert, lass uns nun unsere Startdateien klonen!

## Die Starter-Dateien klonen {#clone-the-starter-files}

Gehe zuerst zum [nft-minter-tutorial GitHub-Repository](https://github.com/alchemyplatform/nft-minter-tutorial), um die Starter-Dateien für dieses Projekt zu erhalten. Klone dieses Repository in deine lokale Umgebung.

Wenn du dieses geklonte `nft-minter-tutorial`-Repository öffnest, wirst du feststellen, dass es zwei Ordner enthält: `minter-starter-files` und `nft-minter`.

- `minter-starter-files` enthält die Starter-Dateien (im Wesentlichen die React-UI) für dieses Projekt. In diesem Tutorial **werden wir in diesem Verzeichnis arbeiten**, während du lernst, wie du diese Benutzeroberfläche zum Leben erweckst, indem du sie mit deiner Ethereum-Wallet und einem NFT-Smart-Contract verbindest.
- `nft-minter` enthält das gesamte, vollständige Tutorial und dient dir als **Referenz**, **falls du nicht weiterkommst.**

Öffne als Nächstes deine Kopie von `minter-starter-files` in deinem Code-Editor und navigiere dann in deinen `src`-Ordner.

Der gesamte Code, den wir schreiben werden, befindet sich im Ordner `src`. Wir werden die `Minter.js`-Komponente bearbeiten und zusätzliche JavaScript-Dateien schreiben, um unserem Projekt Web3-Funktionalität zu verleihen.

## Schritt 2: Unsere Starter-Dateien ansehen {#step-2-check-out-our-starter-files}

Bevor wir mit dem Programmieren beginnen, ist es wichtig, sich anzusehen, was uns in den Starter-Dateien bereits zur Verfügung gestellt wird.

### Dein React-Projekt zum Laufen bringen {#get-your-react-project-running}

Beginnen wir damit, das React-Projekt in unserem Browser auszuführen. Das Schöne an React ist, dass alle Änderungen, die wir speichern, live in unserem Browser aktualisiert werden, sobald unser Projekt im Browser läuft.

Um das Projekt zum Laufen zu bringen, navigiere zum Stammverzeichnis des Ordners `minter-starter-files` und führe `npm install` in deinem Terminal aus, um die Abhängigkeiten des Projekts zu installieren:

```bash
cd minter-starter-files
npm install
```

Sobald die Installation abgeschlossen ist, führe `npm start` in deinem Terminal aus:

```bash
npm start
```

Dadurch sollte sich http://localhost:3000/ in deinem Browser öffnen, wo du das Frontend für unser Projekt siehst. Es sollte aus 3 Feldern bestehen: einem Feld zur Eingabe eines Links zum Asset deines NFTs, einem Feld zur Eingabe des Namens deines NFTs und einem Feld zur Angabe einer Beschreibung.

Wenn du versuchst, auf die Schaltflächen „Wallet verbinden“ oder „NFT minten“ zu klicken, wirst du feststellen, dass sie nicht funktionieren – das liegt daran, dass wir ihre Funktionalität noch programmieren müssen! :\)

### Die Minter.js-Komponente {#minter-js}

**HINWEIS:** Stelle sicher, dass du dich im Ordner `minter-starter-files` und nicht im Ordner `nft-minter` befindest!

Gehen wir zurück in den `src`-Ordner in unserem Editor und öffnen die Datei `Minter.js`. Es ist sehr wichtig, dass wir alles in dieser Datei verstehen, da es sich um die primäre React-Komponente handelt, an der wir arbeiten werden.

Oben in dieser Datei befinden sich unsere Zustandsvariablen, die wir nach bestimmten Ereignissen aktualisieren werden.

```javascript
//Zustandsvariablen
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Noch nie von React-Zustandsvariablen oder State-Hooks gehört? Sieh dir [diese](https://legacy.reactjs.org/docs/hooks-state.html) Dokumentation an.

Hier ist, was die einzelnen Variablen darstellen:

- `walletAddress` - eine Zeichenfolge, die die Wallet-Adresse des Benutzers speichert
- `status` - eine Zeichenfolge, die eine Nachricht enthält, die am unteren Rand der Benutzeroberfläche angezeigt wird
- `name` - eine Zeichenfolge, die den Namen des NFT speichert
- `description` - eine Zeichenfolge, die die Beschreibung des NFT speichert
- `url` - eine Zeichenfolge, die ein Link zum digitalen Asset des NFT ist

Nach den Zustandsvariablen siehst du drei nicht implementierte Funktionen: `useEffect`, `connectWalletPressed` und `onMintPressed`. Du wirst feststellen, dass alle diese Funktionen `async` sind, weil wir in ihnen asynchrone API-Aufrufe tätigen werden! Ihre Namen sind gleichbedeutend mit ihren Funktionalitäten:

```javascript
useEffect(async () => {
  //TODO: implementieren
}, [])

const connectWalletPressed = async () => {
  //TODO: implementieren
}

const onMintPressed = async () => {
  //TODO: implementieren
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) – dies ist ein React-Hook, der aufgerufen wird, nachdem deine Komponente gerendert wurde. Da ihm ein leeres Array `[]` als Prop übergeben wird (siehe Zeile 3), wird er nur beim _ersten_ Rendern der Komponente aufgerufen. Hier rufen wir unseren Wallet-Listener und eine weitere Wallet-Funktion auf, um unsere Benutzeroberfläche zu aktualisieren und anzuzeigen, ob eine Wallet bereits verbunden ist.
- `connectWalletPressed` – diese Funktion wird aufgerufen, um die MetaMask-Wallet des Benutzers mit unserer Dapp zu verbinden.
- `onMintPressed` – diese Funktion wird aufgerufen, um den NFT des Benutzers zu minten.

Gegen Ende dieser Datei haben wir die Benutzeroberfläche unserer Komponente. Wenn du diesen Code sorgfältig durchgehst, wirst du feststellen, dass wir unsere `url`-, `name`- und `description`-Zustandsvariablen aktualisieren, wenn sich die Eingabe in den entsprechenden Textfeldern ändert.

Du wirst auch sehen, dass `connectWalletPressed` und `onMintPressed` aufgerufen werden, wenn die Schaltflächen mit den IDs `mintButton` bzw. `walletButton` angeklickt werden.

```javascript
//die Benutzeroberfläche unserer Komponente
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Verbunden: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Wallet verbinden</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Füge einfach den Link, den Namen und die Beschreibung deines Assets hinzu und drücke dann auf „Minten“.
    </p>
    <form>
      <h2>🖼 Link zum Asset: </h2>
      <input
        type="text"
        placeholder="z. B. https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="z. B. Mein erster NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Beschreibung: </h2>
      <input
        type="text"
        placeholder="z. B. Noch cooler als CryptoKitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      NFT minten
    </button>
    <p id="status">{status}</p>
</div>
)
```

Schließlich wollen wir uns ansehen, wo diese Minter-Komponente hinzugefügt wird.

Wenn du zur Datei `App.js` gehst, der Hauptkomponente in React, die als Container für alle anderen Komponenten fungiert, siehst du, dass unsere Minter-Komponente in Zeile 7 eingefügt wird.

**In diesem Tutorial werden wir nur die `Minter.js`-Datei bearbeiten und Dateien in unserem `src`-Ordner hinzufügen.**

Nachdem wir nun verstanden haben, womit wir arbeiten, richten wir unsere Ethereum-Wallet ein!

## Richte deine Ethereum-Wallet ein {#set-up-your-ethereum-wallet}

Damit Benutzer mit deinem Smart Contract interagieren können, müssen sie ihre Ethereum-Wallet mit deiner Dapp verbinden.

### MetaMask herunterladen {#download-metamask}

In diesem Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, mit der Sie Ihre Ethereum-Kontoadresse verwalten können. Wenn du mehr darüber erfahren möchtest, wie Transaktionen auf Ethereum funktionieren, sieh dir [diese Seite](/developers/docs/transactions/) an.

Sie können MetaMask [hier](https://metamask.io/download) kostenlos herunterladen und ein Konto erstellen. Wenn du ein Konto erstellst oder bereits eines hast, wechsle unbedingt zum „Ropsten Test Network“ oben rechts (damit wir nicht mit echtem Geld hantieren).

### Ether von einem Faucet hinzufügen {#add-ether-from-faucet}

Um unsere NFTs zu minten (oder Transaktionen auf der Ethereum-Blockchain zu signieren), benötigen wir einige gefälschte ETH. Um ETH zu erhalten, kannst du zum [Ropsten-Faucet](https://faucet.ropsten.be/) gehen und deine Ropsten-Kontoadresse eingeben und dann auf „Send Ropsten ETH“ klicken. Kurz darauf solltest du ETH in deinem MetaMask-Konto sehen!

### Deinen Kontostand überprüfen {#check-your-balance}

Um zu überprüfen, ob unser Guthaben vorhanden ist, machen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Dies gibt den Betrag an ETH in unserer Wallet zurück. Nachdem Sie die Adresse Ihres MetaMask-Kontos eingegeben und auf “Send Request” (Anforderung senden) geklickt haben, sollten Sie eine Antwort ähnlich der Folgenden erhalten:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**HINWEIS:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei ist die kleinste Einheit von Ether. Die Umrechnung von Wei in ETH ist: 1 ETH = 10¹⁸ Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl umwandeln, erhalten wir 1\*10¹⁸, was 1 ETH entspricht.

Puh! Unser Falschgeld ist da! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask mit deiner Benutzeroberfläche verbinden {#connect-metamask-to-your-UI}

Nachdem unsere MetaMask-Wallet nun eingerichtet ist, verbinden wir unsere Dapp damit!

Da wir uns an das [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-Paradigma halten wollen, werden wir eine separate Datei erstellen, die unsere Funktionen zur Verwaltung der Logik, der Daten und der Regeln unserer Dapp enthält, und diese Funktionen dann an unser Frontend (unsere Minter.js-Komponente) übergeben.

### Die `connectWallet`-Funktion {#connect-wallet-function}

Dazu erstellen wir einen neuen Ordner namens `utils` in deinem `src`-Verzeichnis und fügen eine Datei namens `interact.js` hinzu, die alle unsere Interaktionsfunktionen für Wallets und Smart Contracts enthalten wird.

In unserer `interact.js`-Datei schreiben wir eine `connectWallet`-Funktion, die wir dann in unsere `Minter.js`-Komponente importieren und aufrufen.

Füge in deine `interact.js`-Datei Folgendes ein

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Schreibe eine Nachricht in das Textfeld oben.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Du musst MetaMask, eine virtuelle Ethereum-Wallet, in deinem
              Browser installieren.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Schauen wir uns an, was dieser Code bewirkt:

Zuerst prüft unsere Funktion, ob `window.ethereum` in deinem Browser aktiviert ist.

`window.ethereum` ist eine globale API, die von MetaMask und anderen Wallet-Anbietern eingeschleust wird und es Websites ermöglicht, die Ethereum-Konten von Benutzern anzufordern. Wenn dies genehmigt wird, kann sie Daten aus den Blockchains lesen, mit denen der Benutzer verbunden ist, und dem Benutzer vorschlagen, Nachrichten und Transaktionen zu signieren. Weitere Informationen findest du in der [MetaMask-Dokumentation](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Wenn `window.ethereum` _nicht_ vorhanden ist, bedeutet das, dass MetaMask nicht installiert ist. Dies führt dazu, dass ein JSON-Objekt zurückgegeben wird, bei dem die zurückgegebene `address` eine leere Zeichenfolge ist und das `status`-JSX-Objekt meldet, dass der Benutzer MetaMask installieren muss.

**Die meisten Funktionen, die wir schreiben, geben JSON-Objekte zurück, mit denen wir unsere Zustandsvariablen und die Benutzeroberfläche aktualisieren können.**

Wenn `window.ethereum` jedoch vorhanden _ist_, dann wird es interessant.

Mithilfe einer try/catch-Schleife versuchen wir, eine Verbindung zu MetaMask herzustellen, indem wir [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) aufrufen. Der Aufruf dieser Funktion öffnet MetaMask im Browser, woraufhin der Benutzer aufgefordert wird, seine Wallet mit deiner Dapp zu verbinden.

- Wenn der Benutzer die Verbindung herstellt, gibt `method: "eth_requestAccounts"` ein Array zurück, das alle Adressen der Benutzerkonten enthält, die mit der Dapp verbunden sind. Insgesamt gibt unsere `connectWallet`-Funktion ein JSON-Objekt zurück, das die _erste_ `address` in diesem Array (siehe Zeile 9) und eine `status`-Nachricht enthält, die den Benutzer auffordert, eine Nachricht an den Smart Contract zu schreiben.
- Wenn der Benutzer die Verbindung ablehnt, enthält das JSON-Objekt eine leere Zeichenfolge für die zurückgegebene `address` und eine `status`-Nachricht, die widerspiegelt, dass der Benutzer die Verbindung abgelehnt hat.

### Hinzufügen der connectWallet-Funktion zur Minter.js-UI-Komponente {#add-connect-wallet}

Nachdem wir diese `connectWallet`-Funktion geschrieben haben, verbinden wir sie mit unserer `Minter.js.`-Komponente.

Zuerst müssen wir unsere Funktion in unsere `Minter.js`-Datei importieren, indem wir `import { connectWallet } from "./utils/interact.js";` am Anfang der `Minter.js`-Datei hinzufügen. Deine ersten 11 Zeilen von `Minter.js` sollten nun so aussehen:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Zustandsvariablen
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Dann rufen wir in unserer `connectWalletPressed`-Funktion unsere importierte `connectWallet`-Funktion auf, wie folgt:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Fällt dir auf, wie der größte Teil unserer Funktionalität von unserer `Minter.js`-Komponente in die `interact.js`-Datei abstrahiert wird? Dies geschieht, damit wir dem M-V-C-Paradigma entsprechen!

In `connectWalletPressed` machen wir einfach einen Await-Aufruf an unsere importierte `connectWallet`-Funktion, und mit ihrer Antwort aktualisieren wir unsere `status`- und `walletAddress`-Variablen über ihre State-Hooks.

Speichern wir nun beide Dateien, `Minter.js` und `interact.js`, und testen unsere Benutzeroberfläche.

Öffne deinen Browser unter localhost:3000 und drücke die Schaltfläche „Wallet verbinden“ oben rechts auf der Seite.

Wenn du MetaMask installiert hast, solltest du aufgefordert werden, deine Wallet mit deiner Dapp zu verbinden. Akzeptiere die Aufforderung, eine Verbindung herzustellen.

Du solltest sehen, dass die Wallet-Schaltfläche nun anzeigt, dass deine Adresse verbunden ist.

Als Nächstes versuche, die Seite neu zu laden ... Das ist seltsam. Unsere Wallet-Schaltfläche fordert uns auf, MetaMask zu verbinden, obwohl es bereits verbunden ist ...

Aber keine Sorge! Das können wir leicht beheben, indem wir eine Funktion namens `getCurrentWalletConnected` implementieren, die prüft, ob eine Adresse bereits mit unserer Dapp verbunden ist, und unsere Benutzeroberfläche entsprechend aktualisiert!

### Die getCurrentWalletConnected-Funktion {#get-current-wallet}

Füge in deine `interact.js`-Datei die folgende `getCurrentWalletConnected`-Funktion ein:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Schreibe eine Nachricht in das Textfeld oben.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Verbinde dich mit MetaMask über die Schaltfläche oben rechts.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Du musst MetaMask, eine virtuelle Ethereum-Wallet, in deinem
              Browser installieren.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Dieser Code ist der `connectWallet`-Funktion, die wir gerade geschrieben haben, _sehr_ ähnlich.

Der Hauptunterschied besteht darin, dass wir anstelle der Methode `eth_requestAccounts`, die MetaMask für den Benutzer öffnet, um seine Wallet zu verbinden, hier die Methode `eth_accounts` aufrufen, die einfach ein Array zurückgibt, das die MetaMask-Adressen enthält, die derzeit mit unserer Dapp verbunden sind.

Um diese Funktion in Aktion zu sehen, rufen wir sie in der `useEffect`-Funktion unserer `Minter.js`-Komponente auf.

Wie bei `connectWallet` müssen wir diese Funktion aus unserer `interact.js`-Datei in unsere `Minter.js`-Datei importieren, und zwar so:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //hier importieren
} from "./utils/interact.js"
```

Jetzt rufen wir sie einfach in unserer `useEffect`-Funktion auf:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Beachte, dass wir die Antwort unseres Aufrufs an `getCurrentWalletConnected` verwenden, um unsere `walletAddress`- und `status`-Zustandsvariablen zu aktualisieren.

Nachdem du diesen Code hinzugefügt hast, versuche, unser Browserfenster zu aktualisieren. Die Schaltfläche sollte anzeigen, dass du verbunden bist, und eine Vorschau der Adresse deiner verbundenen Wallet anzeigen – auch nach dem Aktualisieren!

### addWalletListener implementieren {#implement-add-wallet-listener}

Der letzte Schritt in der Einrichtung unserer Dapp-Wallet ist die Implementierung des Wallet-Listeners, damit unsere Benutzeroberfläche aktualisiert wird, wenn sich der Zustand unserer Wallet ändert, z. B. wenn der Benutzer die Verbindung trennt oder das Konto wechselt.

Füge in deine `Minter.js`-Datei eine Funktion `addWalletListener` hinzu, die wie folgt aussieht:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Schreibe eine Nachricht in das Textfeld oben.")
      } else {
        setWallet("")
        setStatus("🦊 Verbinde dich mit MetaMask über die Schaltfläche oben rechts.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Du musst MetaMask, eine virtuelle Ethereum-Wallet, in deinem Browser installieren.
        </a>
      </p>
    )
  }
}
```

Lass uns kurz aufschlüsseln, was hier passiert:

- Zuerst prüft unsere Funktion, ob `window.ethereum` aktiviert ist (d. h. MetaMask ist installiert).
  - Wenn nicht, setzen wir einfach unsere `status`-Zustandsvariable auf eine JSX-Zeichenfolge, die den Benutzer auffordert, MetaMask zu installieren.
  - Wenn es aktiviert ist, richten wir den Listener `window.ethereum.on("accountsChanged")` in Zeile 3 ein, der auf Zustandsänderungen in der MetaMask-Wallet lauscht. Dazu gehören, wenn der Benutzer ein zusätzliches Konto mit der Dapp verbindet, Konten wechselt oder ein Konto trennt. Wenn mindestens ein Konto verbunden ist, wird die Zustandsvariable `walletAddress` als das erste Konto im `accounts`-Array aktualisiert, das vom Listener zurückgegeben wird. Andernfalls wird `walletAddress` als leere Zeichenfolge festgelegt.

Schließlich müssen wir sie in unserer `useEffect`-Funktion aufrufen:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Und voilà! Wir haben die Programmierung all unserer Wallet-Funktionalitäten abgeschlossen! Nachdem unsere Wallet nun eingerichtet ist, finden wir heraus, wie wir unser NFT minten können!

## NFT-Metadaten 101 {#nft-metadata-101}

Erinnerst du dich an die NFT-Metadaten, über die wir in Schritt 0 dieses Tutorials gesprochen haben? Sie erwecken einen NFT zum Leben und ermöglichen es ihm, Eigenschaften wie ein digitales Asset, einen Namen, eine Beschreibung und andere Attribute zu haben.

Wir müssen diese Metadaten als JSON-Objekt konfigurieren und speichern, damit wir sie als `tokenURI`-Parameter übergeben können, wenn wir die `mintNFT`-Funktion unseres Smart Contracts aufrufen.

Der Text in den Feldern „Link zum Asset“, „Name“, „Beschreibung“ wird die verschiedenen Eigenschaften der Metadaten unseres NFTs umfassen. Wir werden diese Metadaten als JSON-Objekt formatieren, aber es gibt ein paar Optionen, wo wir dieses JSON-Objekt speichern können:

- Wir könnten sie auf der Ethereum-Blockchain speichern, was jedoch sehr teuer wäre.
- Wir könnten sie auf einem zentralisierten Server wie AWS oder Firebase speichern. Aber das würde unserem Dezentralisierungs-Ethos widersprechen.
- Wir könnten IPFS verwenden, ein dezentralisiertes Protokoll und Peer-to-Peer-Netzwerk zum Speichern und Teilen von Daten in einem verteilten Dateisystem. Da dieses Protokoll dezentralisiert und kostenlos ist, ist es unsere beste Option!

Um unsere Metadaten auf IPFS zu speichern, verwenden wir [Pinata](https://pinata.cloud/), eine praktische IPFS-API und ein Toolkit. Im nächsten Schritt erklären wir genau, wie das geht!

## Pinata verwenden, um deine Metadaten auf IPFS zu pinnen {#use-pinata-to-pin-your-metadata-to-IPFS}

Wenn du noch kein [Pinata](https://pinata.cloud/)-Konto hast, registriere dich [hier](https://app.pinata.cloud/auth/signup) für ein kostenloses Konto und führe die Schritte zur Verifizierung deiner E-Mail und deines Kontos durch.

### Erstelle deinen Pinata-API-Schlüssel {#create-pinata-api-key}

Navigiere zur Seite [https://pinata.cloud/keys](https://pinata.cloud/keys), wähle dann oben die Schaltfläche „New Key“ (Neuer Schlüssel), setze das Admin-Widget auf „Enabled“ (Aktiviert) und benenne deinen Schlüssel.

Dir wird dann ein Popup mit deinen API-Informationen angezeigt. Bewahre diese an einem sicheren Ort auf.

Nachdem unser Schlüssel nun eingerichtet ist, fügen wir ihn zu unserem Projekt hinzu, damit wir ihn verwenden können.

### Eine .env-Datei erstellen {#create-a-env}

Wir können unseren Pinata-Schlüssel und das Geheimnis sicher in einer Umgebungsdatei speichern. Installieren wir das [dotenv-Paket](https://www.npmjs.com/package/dotenv) in deinem Projektverzeichnis.

Öffne einen neuen Tab in deinem Terminal (getrennt von dem, auf dem der Localhost läuft) und stelle sicher, dass du dich im Ordner `minter-starter-files` befindest. Führe dann den folgenden Befehl in deinem Terminal aus:

```text
npm install dotenv --save
```

Als Nächstes erstelle eine `.env`-Datei im Stammverzeichnis deiner `minter-starter-files`, indem du Folgendes in deiner Befehlszeile eingibst:

```javascript
vim.env
```

Dadurch wird deine `.env`-Datei in vim (einem Texteditor) geöffnet. Um sie zu speichern, drücke „esc“ + „:“ + „q“ in dieser Reihenfolge auf deiner Tastatur.

Navigiere als Nächstes in VSCode zu deiner `.env`-Datei und füge deinen Pinata-API-Schlüssel und dein API-Geheimnis hinzu, und zwar so:

```text
REACT_APP_PINATA_KEY = <pinata-api-schlüssel>
REACT_APP_PINATA_SECRET = <pinata-api-geheimnis>
```

Speichere die Datei, und dann kannst du damit beginnen, die Funktion zum Hochladen deiner JSON-Metadaten auf IPFS zu schreiben!

### pinJSONToIPFS implementieren {#pin-json-to-ipfs}

Glücklicherweise hat Pinata eine [API speziell für das Hochladen von JSON-Daten auf IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) und ein praktisches JavaScript-Beispiel mit Axios, das wir mit leichten Änderungen verwenden können.

Erstellen wir in deinem `utils`-Ordner eine weitere Datei namens `pinata.js` und importieren dann unser Pinata-Geheimnis und den Schlüssel aus der .env-Datei wie folgt:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Füge als Nächstes den zusätzlichen Code von unten in deine `pinata.js`-Datei ein. Keine Sorge, wir werden aufschlüsseln, was alles bedeutet!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //axios-POST-Anfrage an Pinata stellen ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Was genau macht dieser Code also?

Zuerst importiert er [axios](https://www.npmjs.com/package/axios), einen Promise-basierten HTTP-Client für den Browser und node.js, den wir verwenden werden, um eine Anfrage an Pinata zu stellen.

Dann haben wir unsere asynchrone Funktion `pinJSONToIPFS`, die einen `JSONBody` als Eingabe und den Pinata-API-Schlüssel und das Geheimnis in ihrem Header entgegennimmt, um eine POST-Anfrage an ihre `pinJSONToIPFS`-API zu stellen.

- Wenn diese POST-Anfrage erfolgreich ist, gibt unsere Funktion ein JSON-Objekt zurück, bei dem der `success`-Boole’sche Wert auf „true“ gesetzt ist und die `pinataUrl` angibt, wo unsere Metadaten angeheftet wurden. Wir werden diese zurückgegebene `pinataUrl` als `tokenURI`-Eingabe für die Mint-Funktion unseres Smart Contracts verwenden.
- Wenn diese Post-Anfrage fehlschlägt, gibt unsere Funktion ein JSON-Objekt zurück, bei dem der `success`-Boole’sche Wert auf „false“ gesetzt ist und eine `message`-Zeichenfolge unseren Fehler weitergibt.

Wie bei unseren `connectWallet`-Funktionsrückgabetypen geben wir JSON-Objekte zurück, damit wir ihre Parameter zur Aktualisierung unserer Zustandsvariablen und der Benutzeroberfläche verwenden können.

## Lade deinen Smart Contract {#load-your-smart-contract}

Nachdem wir nun eine Möglichkeit haben, unsere NFT-Metadaten über unsere `pinJSONToIPFS`-Funktion auf IPFS hochzuladen, benötigen wir eine Möglichkeit, eine Instanz unseres Smart Contracts zu laden, damit wir seine `mintNFT`-Funktion aufrufen können.

Wie bereits erwähnt, werden wir in diesem Tutorial [diesen bestehenden NFT-Smart-Contract](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) verwenden. Wenn du jedoch lernen möchtest, wie wir ihn erstellt haben oder selbst einen erstellen möchtest, empfehlen wir dir dringend, unser anderes Tutorial [„Wie man einen NFT erstellt“](https://www.alchemy.com/docs/how-to-create-an-nft) anzusehen.

### Das Contract-ABI {#contract-abi}

Wenn du unsere Dateien genau untersucht hast, wirst du bemerkt haben, dass es in unserem `src`-Verzeichnis eine `contract-abi.json`-Datei gibt. Ein ABI ist notwendig, um anzugeben, welche Funktion ein Vertrag aufrufen wird, und um sicherzustellen, dass die Funktion Daten in dem von dir erwarteten Format zurückgibt.

Wir werden auch einen Alchemy-API-Schlüssel und die Alchemy-Web3-API benötigen, um uns mit der Ethereum-Blockchain zu verbinden und unseren Smart Contract zu laden.

### Erstelle deinen Alchemy-API-Schlüssel {#create-alchemy-api}

Wenn du noch kein Alchemy-Konto hast, [registriere dich hier kostenlos](https://alchemy.com/?a=eth-org-nft-minter).

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren. Erstellen Sie dafür eine App. Dadurch können wir Anfragen an das Ropsten-Testnet stellen.

Navigiere zur Seite „App erstellen“ in deinem Alchemy-Dashboard, indem du in der Navigationsleiste über „Apps“ fährst und auf „App erstellen“ klickst.

Benenne deine App – wir haben „Mein erster NFT!“ gewählt –, gib eine kurze Beschreibung, wähle „Staging“ für die Umgebung, die für die Buchführung deiner App verwendet wird, und wähle „Ropsten“ als dein Netzwerk.

Klicken Sie auf “Create app” (App erstellen) und schon sind Sie fertig. Die App sollte in der untenstehenden Tabelle erscheinen.

Super, jetzt, da wir unsere HTTP-Alchemy-API-URL erstellt haben, kopiere sie in deine Zwischenablage ...

… und fügen wir sie zu unserer `.env`-Datei hinzu. Insgesamt sollte deine .env-Datei so aussehen:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Jetzt, da wir unser Contract-ABI und unseren Alchemy-API-Schlüssel haben, sind wir bereit, unseren Smart Contract mit [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) zu laden.

### Richte deinen Alchemy-Web3-Endpunkt und deinen Vertrag ein {#setup-alchemy-endpoint}

Wenn du es noch nicht hast, musst du zuerst [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) installieren, indem du im Terminal zum Stammverzeichnis navigierst: `nft-minter-tutorial`:

```text
cd ..
npm install @alch/alchemy-web3
```

Als Nächstes kehren wir zu unserer `interact.js`-Datei zurück. Füge am Anfang der Datei den folgenden Code hinzu, um deinen Alchemy-Schlüssel aus deiner .env-Datei zu importieren und deinen Alchemy-Web3-Endpunkt einzurichten:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ist ein Wrapper um [Web3.js](https://docs.web3js.org/) und bietet erweiterte API-Methoden und andere entscheidende Vorteile, um dir das Leben als Web3-Entwickler zu erleichtern. Es ist so konzipiert, dass es eine minimale Konfiguration erfordert, sodass du es sofort in deiner App verwenden kannst!

Als Nächstes fügen wir unser Contract-ABI und unsere Contract-Adresse zu unserer Datei hinzu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Sobald wir beides haben, sind wir bereit, unsere Mint-Funktion zu programmieren!

## Die mintNFT-Funktion implementieren {#implement-the-mintnft-function}

Definieren wir in deiner `interact.js`-Datei unsere Funktion `mintNFT`, die gleichnamig unseren NFT minten wird.

Da wir zahlreiche asynchrone Aufrufe machen werden (an Pinata, um unsere Metadaten auf IPFS zu pinnen, an Alchemy Web3, um unseren Smart Contract zu laden, und an MetaMask, um unsere Transaktionen zu signieren), wird unsere Funktion ebenfalls asynchron sein.

Die drei Eingaben für unsere Funktion sind die `url` unseres digitalen Assets, der `name` und die `description`. Füge die folgende Funktionssignatur unter der `connectWallet`-Funktion hinzu:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Fehlerbehandlung bei der Eingabe {#input-error-handling}

Natürlich ist es sinnvoll, am Anfang der Funktion eine Art Fehlerbehandlung für die Eingabe zu haben, damit wir diese Funktion beenden, wenn unsere Eingabeparameter nicht korrekt sind. Fügen wir in unserer Funktion den folgenden Code hinzu:

```javascript
export const mintNFT = async (url, name, description) => {
  //Fehlerbehandlung
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Bitte stelle sicher, dass alle Felder vor dem Minten ausgefüllt sind.",
    }
  }
}
```

Im Wesentlichen, wenn einer der Eingabeparameter eine leere Zeichenfolge ist, geben wir ein JSON-Objekt zurück, bei dem der `success`-Boole'sche Wert auf „false“ gesetzt ist und die `status`-Zeichenfolge meldet, dass alle Felder in unserer Benutzeroberfläche vollständig sein müssen.

### Hochladen der Metadaten auf IPFS {#upload-metadata-to-ipfs}

Sobald wir wissen, dass unsere Metadaten korrekt formatiert sind, besteht der nächste Schritt darin, sie in ein JSON-Objekt zu verpacken und über die von uns geschriebene `pinJSONToIPFS`-Funktion auf IPFS hochzuladen!

Dazu müssen wir zuerst die `pinJSONToIPFS`-Funktion in unsere `interact.js`-Datei importieren. Ganz oben in der `interact.js` fügen wir hinzu:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Erinnere dich daran, dass `pinJSONToIPFS` einen JSON-Körper entgegennimmt. Bevor wir sie aufrufen, müssen wir also unsere `url`-, `name`- und `description`-Parameter in ein JSON-Objekt formatieren.

Aktualisieren wir unseren Code, um ein JSON-Objekt namens `metadata` zu erstellen und dann einen Aufruf an `pinJSONToIPFS` mit diesem `metadata`-Parameter zu machen:

```javascript
export const mintNFT = async (url, name, description) => {
  //Fehlerbehandlung
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Bitte stelle sicher, dass alle Felder vor dem Minten ausgefüllt sind.",
    }
  }

  //Metadaten erstellen
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata-Aufruf durchführen
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Etwas ist beim Hochladen deiner tokenURI schiefgelaufen.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Beachte, dass wir die Antwort unseres Aufrufs an `pinJSONToIPFS(metadata)` im `pinataResponse`-Objekt speichern. Dann analysieren wir dieses Objekt auf Fehler.

Wenn ein Fehler auftritt, geben wir ein JSON-Objekt zurück, bei dem der `success`-Boole’sche Wert auf „false“ gesetzt ist und unsere `status`-Zeichenfolge meldet, dass unser Aufruf fehlgeschlagen ist. Andernfalls extrahieren wir die `pinataURL` aus der `pinataResponse` und speichern sie als unsere `tokenURI`-Variable.

Jetzt ist es an der Zeit, unseren Smart Contract mit der Alchemy Web3-API zu laden, die wir am Anfang unserer Datei initialisiert haben. Füge die folgende Codezeile am Ende der `mintNFT`-Funktion hinzu, um den Vertrag auf die globale Variable `window.contract` zu setzen:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Das Letzte, was wir in unserer `mintNFT`-Funktion hinzufügen müssen, ist unsere Ethereum-Transaktion:

```javascript
//Deine Ethereum-Transaktion einrichten
const transactionParameters = {
  to: contractAddress, // Erforderlich, außer bei Vertragsveröffentlichungen.
  from: window.ethereum.selectedAddress, // muss mit der aktiven Adresse des Benutzers übereinstimmen.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //Aufruf des NFT-Smart-Contracts durchführen
}

//die Transaktion über MetaMask signieren
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Sieh dir deine Transaktion auf Etherscan an: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Etwas ist schiefgelaufen: " + error.message,
  }
}
```

Wenn du bereits mit Ethereum-Transaktionen vertraut bist, wirst du feststellen, dass die Struktur ziemlich ähnlich zu dem ist, was du bereits gesehen hast.

- Zuerst richten wir unsere Transaktionsparameter ein.
  - `to` gibt die Empfängeradresse an (unser Smart Contract)
  - `from` gibt den Unterzeichner der Transaktion an (die mit MetaMask verbundene Adresse des Benutzers: `window.ethereum.selectedAddress`)
  - `data` enthält den Aufruf unserer Smart-Contract-`mintNFT`-Methode, die unsere `tokenURI` und die Wallet-Adresse des Benutzers, `window.ethereum.selectedAddress`, als Eingaben erhält
- Dann machen wir einen Await-Aufruf, `window.ethereum.request,`, bei dem wir MetaMask bitten, die Transaktion zu signieren. Beachte, dass wir in dieser Anfrage unsere eth-Methode (eth_SentTransaction) angeben und unsere `transactionParameters` übergeben. An diesem Punkt öffnet sich MetaMask im Browser und fordert den Benutzer auf, die Transaktion zu signieren oder abzulehnen.
  - Wenn die Transaktion erfolgreich ist, gibt die Funktion ein JSON-Objekt zurück, bei dem der Boole’sche Wert `success` auf „true“ gesetzt ist und die `status`-Zeichenfolge den Benutzer auffordert, Etherscan für weitere Informationen zu seiner Transaktion zu besuchen.
  - Wenn die Transaktion fehlschlägt, gibt die Funktion ein JSON-Objekt zurück, bei dem der `success`-Boole’sche Wert auf „false“ gesetzt ist und die `status`-Zeichenfolge die Fehlermeldung weitergibt.

Insgesamt sollte unsere `mintNFT`-Funktion so aussehen:

```javascript
export const mintNFT = async (url, name, description) => {
  //Fehlerbehandlung
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Bitte stelle sicher, dass alle Felder vor dem Minten ausgefüllt sind.",
    }
  }

  //Metadaten erstellen
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata-Pin-Anfrage
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Etwas ist beim Hochladen deiner tokenURI schiefgelaufen.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //Smart Contract laden
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //Deine Ethereum-Transaktion einrichten
  const transactionParameters = {
    to: contractAddress, // Erforderlich, außer bei Vertragsveröffentlichungen.
    from: window.ethereum.selectedAddress, // muss mit der aktiven Adresse des Benutzers übereinstimmen.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //Aufruf des NFT-Smart-Contracts durchführen
  }

  //Transaktion über MetaMask signieren
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Sieh dir deine Transaktion auf Etherscan an: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Etwas ist schiefgelaufen: " + error.message,
    }
  }
}
```

Das ist eine riesige Funktion! Jetzt müssen wir nur noch unsere `mintNFT`-Funktion mit unserer `Minter.js`-Komponente verbinden ...

## Verbinde mintNFT mit unserem Minter.js-Frontend {#connect-our-frontend}

Öffne deine `Minter.js`-Datei und aktualisiere die Zeile `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` am Anfang zu:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Implementiere schließlich die `onMintPressed`-Funktion, um einen Await-Aufruf an deine importierte `mintNFT`-Funktion zu machen und die `status`-Zustandsvariable zu aktualisieren, um widerzuspiegeln, ob unsere Transaktion erfolgreich war oder fehlgeschlagen ist:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Stelle deinen NFT auf einer Live-Website bereit {#deploy-your-NFT}

Bereit, dein Projekt live zu schalten, damit Benutzer damit interagieren können? Sieh dir [dieses Tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) an, um deinen Minter auf einer Live-Website bereitzustellen.

Ein letzter Schritt ...

## Erobere die Blockchain-Welt im Sturm {#take-the-blockchain-world-by-storm}

Nur ein Scherz, du hast es bis zum Ende des Tutorials geschafft!

Zusammenfassend lässt sich sagen, dass du durch den Bau eines NFT-Minters erfolgreich gelernt hast, wie man:

- Verbinden von MetaMask mit Ihrem Frontend-Projekt
- Rufen von Smart-Contract Methoden von Ihrem Frontend
- Transaktionen mit MetaMask signieren

Vermutlich möchtest du die über deine Dapp geminteten NFTs in deiner Wallet präsentieren können – sieh dir also unbedingt unser kurzes Tutorial [So zeigst du dein NFT in deiner Wallet an](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) an!

Und wie immer, wenn du Fragen hast, sind wir hier, um im [Alchemy Discord](https://discord.gg/gWuC7zB) zu helfen. Wir können es kaum erwarten zu sehen, wie du die Konzepte aus diesem Tutorial auf deine zukünftigen Projekte anwendest!
