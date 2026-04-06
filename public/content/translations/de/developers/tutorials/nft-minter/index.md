---
title: NFT-Minter-Tutorial
description: "In diesem Tutorial baust du einen NFT-Minter und lernst, wie man eine Full-Stack-Dapp erstellt, indem man einen Smart Contract über MetaMask und Web3-Tools mit einem React-Frontend verbindet."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "Smart Contracts", "Frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: NFT-Minter-Dapp
lang: de
published: 2021-10-06
---

Eine der größten Herausforderungen für Entwickler mit Web2-Hintergrund besteht darin, herauszufinden, wie man seinen Smart Contract mit einem Frontend-Projekt verbindet und mit ihm interagiert.

Indem du einen NFT-Minter baust – eine einfache Benutzeroberfläche, in der du einen Link zu deinem digitalen Asset, einen Titel und eine Beschreibung eingeben kannst – lernst du Folgendes:

- Verbindung zu MetaMask über dein Frontend-Projekt herstellen
- Smart-Contract-Methoden von deinem Frontend aus aufrufen
- Transaktionen mit MetaMask signieren

In diesem Tutorial verwenden wir [React](https://react.dev/) als unser Frontend-Framework. Da sich dieses Tutorial in erster Linie auf die Web3-Entwicklung konzentriert, werden wir nicht viel Zeit damit verbringen, die Grundlagen von React aufzuschlüsseln. Stattdessen konzentrieren wir uns darauf, Funktionalität in unser Projekt zu bringen.

Als Voraussetzung solltest du ein grundlegendes Verständnis von React haben – wissen, wie Komponenten, Props, useState/useEffect und grundlegende Funktionsaufrufe funktionieren. Wenn du noch nie von einem dieser Begriffe gehört hast, solltest du dir dieses [Einführungstutorial zu React](https://react.dev/learn/tutorial-tic-tac-toe) ansehen. Für visuelle Lerner empfehlen wir diese hervorragende Videoserie [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) von Net Ninja.

Und falls du es noch nicht getan hast, benötigst du definitiv ein Alchemy-Konto, um dieses Tutorial abzuschließen und etwas auf der Blockchain zu bauen. Melde dich [hier](https://alchemy.com/) für ein kostenloses Konto an.

Ohne weitere Umschweife, fangen wir an!

## NFTs erstellen 101 {#making-nfts-101}

Bevor wir uns überhaupt Code ansehen, ist es wichtig zu verstehen, wie das Erstellen eines NFTs funktioniert. Es umfasst zwei Schritte:

### Einen NFT-Smart-Contract auf der Ethereum-Blockchain veröffentlichen {#publish-nft}

Der größte Unterschied zwischen den beiden NFT-Smart-Contract-Standards besteht darin, dass ERC-1155 ein Multi-Token-Standard ist und Batch-Funktionalität beinhaltet, während ERC-721 ein Single-Token-Standard ist und daher nur die Übertragung eines Tokens auf einmal unterstützt.

### Die Prägefunktion aufrufen {#minting-function}

Normalerweise erfordert diese Prägefunktion, dass du zwei Variablen als Parameter übergibst: erstens den `recipient` (Empfänger), der die Adresse angibt, die dein frisch geprägtes NFT erhalten wird, und zweitens die `tokenURI` des NFTs, eine Zeichenfolge, die auf ein JSON-Dokument verweist, das die Metadaten des NFTs beschreibt.

Die Metadaten eines NFTs erwecken es erst richtig zum Leben und ermöglichen es ihm, Eigenschaften wie einen Namen, eine Beschreibung, ein Bild (oder ein anderes digitales Asset) und andere Attribute zu haben. Hier ist [ein Beispiel für eine tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), die die Metadaten eines NFTs enthält.

In diesem Tutorial konzentrieren wir uns auf Teil 2: den Aufruf der Prägefunktion eines bestehenden NFT-Smart-Contracts über unsere React-Benutzeroberfläche.

[Hier ist ein Link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) zu dem ERC-721-NFT-Smart-Contract, den wir in diesem Tutorial aufrufen werden. Wenn du erfahren möchtest, wie wir ihn erstellt haben, empfehlen wir dir dringend, dir unser anderes Tutorial anzusehen: [„Wie man ein NFT erstellt“](https://www.alchemy.com/docs/how-to-create-an-nft).

Cool, jetzt, da wir verstehen, wie das Erstellen eines NFTs funktioniert, lass uns unsere Startdateien klonen!

## Die Startdateien klonen {#clone-the-starter-files}

Gehe zunächst zum [nft-minter-tutorial GitHub-Repository](https://github.com/alchemyplatform/nft-minter-tutorial), um die Startdateien für dieses Projekt zu erhalten. Klone dieses Repository in deine lokale Umgebung.

Wenn du dieses geklonte `nft-minter-tutorial`-Repository öffnest, wirst du feststellen, dass es zwei Ordner enthält: `minter-starter-files` und `nft-minter`.

- `minter-starter-files` enthält die Startdateien (im Wesentlichen die React-Benutzeroberfläche) für dieses Projekt. In diesem Tutorial **werden wir in diesem Verzeichnis arbeiten**, während du lernst, wie du diese Benutzeroberfläche zum Leben erweckst, indem du sie mit deiner Ethereum-Wallet und einem NFT-Smart-Contract verbindest.
- `nft-minter` enthält das gesamte abgeschlossene Tutorial und dient dir als **Referenz**, **falls du nicht weiterkommst.**

Öffne als Nächstes deine Kopie von `minter-starter-files` in deinem Code-Editor und navigiere dann in deinen `src`-Ordner.

Der gesamte Code, den wir schreiben werden, befindet sich im `src`-Ordner. Wir werden die Komponente `Minter.js` bearbeiten und zusätzliche JavaScript-Dateien schreiben, um unserem Projekt Web3-Funktionalität zu verleihen.

## Schritt 2: Unsere Startdateien ansehen {#step-2-check-out-our-starter-files}

Bevor wir mit dem Programmieren beginnen, ist es wichtig, sich anzusehen, was uns in den Startdateien bereits zur Verfügung gestellt wird.

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

Dadurch sollte sich http://localhost:3000/ in deinem Browser öffnen, wo du das Frontend für unser Projekt siehst. Es sollte aus 3 Feldern bestehen: einem Platz zur Eingabe eines Links zum Asset deines NFTs, zur Eingabe des Namens deines NFTs und zur Angabe einer Beschreibung.

Wenn du versuchst, auf die Schaltflächen „Connect Wallet“ oder „Mint NFT“ zu klicken, wirst du feststellen, dass sie nicht funktionieren – das liegt daran, dass wir ihre Funktionalität erst noch programmieren müssen! :\)

### Die Komponente Minter.js {#minter-js}

**HINWEIS:** Stelle sicher, dass du dich im Ordner `minter-starter-files` und nicht im Ordner `nft-minter` befindest!

Gehen wir in unserem Editor zurück in den `src`-Ordner und öffnen die Datei `Minter.js`. Es ist extrem wichtig, dass wir alles in dieser Datei verstehen, da es die primäre React-Komponente ist, an der wir arbeiten werden.

Oben in dieser Datei haben wir unsere Zustandsvariablen, die wir nach bestimmten Ereignissen aktualisieren werden.

```javascript
// Zustandsvariablen
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Noch nie von React-Zustandsvariablen oder State-Hooks gehört? Sieh dir [diese](https://legacy.reactjs.org/docs/hooks-state.html) Dokumentation an.

Hier ist, was jede der Variablen darstellt:

- `walletAddress` - eine Zeichenfolge, die die Wallet-Adresse des Benutzers speichert
- `status` - eine Zeichenfolge, die eine Nachricht enthält, die unten in der Benutzeroberfläche angezeigt werden soll
- `name` - eine Zeichenfolge, die den Namen des NFTs speichert
- `description` - eine Zeichenfolge, die die Beschreibung des NFTs speichert
- `url` - eine Zeichenfolge, die ein Link zum digitalen Asset des NFTs ist

Nach den Zustandsvariablen siehst du drei nicht implementierte Funktionen: `useEffect`, `connectWalletPressed` und `onMintPressed`. Du wirst feststellen, dass alle diese Funktionen `async` sind, da wir in ihnen asynchrone API-Aufrufe durchführen werden! Ihre Namen sind namensgebend für ihre Funktionalitäten:

```javascript
useEffect(async () => {
  // TODO: implementieren
}, [])

const connectWalletPressed = async () => {
  // TODO: implementieren
}

const onMintPressed = async () => {
  // TODO: implementieren
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - dies ist ein React-Hook, der aufgerufen wird, nachdem deine Komponente gerendert wurde. Da ihm ein leeres Array `[]` als Prop übergeben wird (siehe Zeile 3), wird er nur beim _ersten_ Rendern der Komponente aufgerufen. Hier rufen wir unseren Wallet-Listener und eine weitere Wallet-Funktion auf, um unsere Benutzeroberfläche zu aktualisieren und anzuzeigen, ob bereits eine Wallet verbunden ist.
- `connectWalletPressed` - diese Funktion wird aufgerufen, um die MetaMask-Wallet des Benutzers mit unserer Dapp zu verbinden.
- `onMintPressed` - diese Funktion wird aufgerufen, um das NFT des Benutzers zu prägen.

Gegen Ende dieser Datei haben wir die Benutzeroberfläche unserer Komponente. Wenn du diesen Code sorgfältig durchliest, wirst du feststellen, dass wir unsere Zustandsvariablen `url`, `name` und `description` aktualisieren, wenn sich die Eingabe in den entsprechenden Textfeldern ändert.

Du wirst auch sehen, dass `connectWalletPressed` und `onMintPressed` aufgerufen werden, wenn die Schaltflächen mit den IDs `mintButton` bzw. `walletButton` angeklickt werden.

```javascript
// die UI unserer Komponente
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

Lass uns abschließend klären, wo diese Minter-Komponente hinzugefügt wird.

Wenn du zur Datei `App.js` gehst, der Hauptkomponente in React, die als Container für alle anderen Komponenten fungiert, wirst du sehen, dass unsere Minter-Komponente in Zeile 7 eingefügt wird.

**In diesem Tutorial werden wir nur die Datei `Minter.js` bearbeiten und Dateien in unserem `src`-Ordner hinzufügen.**

Jetzt, da wir verstehen, womit wir arbeiten, lass uns unsere Ethereum-Wallet einrichten!

## Deine Ethereum-Wallet einrichten {#set-up-your-ethereum-wallet}

Damit Benutzer mit deinem Smart Contract interagieren können, müssen sie ihre Ethereum-Wallet mit deiner Dapp verbinden.

### MetaMask herunterladen {#download-metamask}

Für dieses Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, die zur Verwaltung deiner Ethereum-Kontoadresse verwendet wird. Wenn du mehr darüber erfahren möchtest, wie Transaktionen auf Ethereum funktionieren, sieh dir [diese Seite](/developers/docs/transactions/) an.

Du kannst MetaMask [hier](https://metamask.io/download) kostenlos herunterladen und ein Konto erstellen. Wenn du ein Konto erstellst oder bereits eines hast, stelle sicher, dass du oben rechts zum „Ropsten Test Network“ wechselst (damit wir nicht mit echtem Geld hantieren).

### Ether von einem Faucet hinzufügen {#add-ether-from-faucet}

Um unsere NFTs zu prägen (oder Transaktionen auf der Ethereum-Blockchain zu signieren), benötigen wir etwas falsches ETH. Um ETH zu erhalten, kannst du zum [Ropsten-Faucet](https://faucet.ropsten.be/) gehen, deine Ropsten-Kontoadresse eingeben und dann auf „Send Ropsten Eth“ klicken. Kurz darauf solltest du ETH in deinem MetaMask-Konto sehen!

### Deinen Kontostand überprüfen {#check-your-balance}

Um sicherzugehen, dass unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Dies gibt die Menge an ETH in unserer Wallet zurück. Nachdem du deine MetaMask-Kontoadresse eingegeben und auf „Send Request“ geklickt hast, solltest du eine Antwort wie diese sehen:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**HINWEIS:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als kleinste Stückelung von Ether verwendet. Die Umrechnung von Wei in ETH lautet: 1 ETH = 10¹⁸ Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl umwandeln, erhalten wir 1\*10¹⁸, was 1 ETH entspricht.

Puh! Unser falsches Geld ist komplett da! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask mit deiner Benutzeroberfläche verbinden {#connect-metamask-to-your-UI}

Jetzt, da unsere MetaMask-Wallet eingerichtet ist, lass uns unsere Dapp damit verbinden!

Da wir uns an das [MVC](https://de.wikipedia.org/wiki/Model_View_Controller)-Paradigma halten wollen, werden wir eine separate Datei erstellen, die unsere Funktionen zur Verwaltung der Logik, Daten und Regeln unserer Dapp enthält, und diese Funktionen dann an unser Frontend (unsere Komponente Minter.js) übergeben.

### Die Funktion `connectWallet` {#connect-wallet-function}

Dazu erstellen wir einen neuen Ordner namens `utils` in deinem `src`-Verzeichnis und fügen darin eine Datei namens `interact.js` hinzu, die alle unsere Interaktionsfunktionen für Wallet und Smart Contract enthalten wird.

In unserer Datei `interact.js` werden wir eine Funktion `connectWallet` schreiben, die wir dann in unsere Komponente `Minter.js` importieren und aufrufen.

Füge in deiner Datei `interact.js` Folgendes hinzu:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Lass uns aufschlüsseln, was dieser Code macht:

Zuerst prüft unsere Funktion, ob `window.ethereum` in deinem Browser aktiviert ist.

`window.ethereum` ist eine globale API, die von MetaMask und anderen Wallet-Anbietern injiziert wird und es Websites ermöglicht, die Ethereum-Konten der Benutzer anzufordern. Wenn dies genehmigt wird, kann sie Daten von den Blockchains lesen, mit denen der Benutzer verbunden ist, und vorschlagen, dass der Benutzer Nachrichten und Transaktionen signiert. Weitere Informationen findest du in der [MetaMask-Dokumentation](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Wenn `window.ethereum` _nicht_ vorhanden ist, bedeutet das, dass MetaMask nicht installiert ist. Dies führt dazu, dass ein JSON-Objekt zurückgegeben wird, bei dem die zurückgegebene `address` eine leere Zeichenfolge ist und das JSX-Objekt `status` meldet, dass der Benutzer MetaMask installieren muss.

**Die meisten Funktionen, die wir schreiben, geben JSON-Objekte zurück, die wir verwenden können, um unsere Zustandsvariablen und die Benutzeroberfläche zu aktualisieren.**

Wenn `window.ethereum` _vorhanden_ ist, wird es interessant.

Mithilfe einer try/catch-Schleife versuchen wir, eine Verbindung zu MetaMask herzustellen, indem wir [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) aufrufen. Der Aufruf dieser Funktion öffnet MetaMask im Browser, wodurch der Benutzer aufgefordert wird, seine Wallet mit deiner Dapp zu verbinden.

- Wenn der Benutzer sich für eine Verbindung entscheidet, gibt `method: "eth_requestAccounts"` ein Array zurück, das alle Kontoadressen des Benutzers enthält, die mit der Dapp verbunden sind. Insgesamt gibt unsere Funktion `connectWallet` ein JSON-Objekt zurück, das die _erste_ `address` in diesem Array (siehe Zeile 9) und eine `status`-Nachricht enthält, die den Benutzer auffordert, eine Nachricht an den Smart Contract zu schreiben.
- Wenn der Benutzer die Verbindung ablehnt, enthält das JSON-Objekt eine leere Zeichenfolge für die zurückgegebene `address` und eine `status`-Nachricht, die widerspiegelt, dass der Benutzer die Verbindung abgelehnt hat.

### Die Funktion connectWallet zu deiner Minter.js-UI-Komponente hinzufügen {#add-connect-wallet}

Nachdem wir nun diese Funktion `connectWallet` geschrieben haben, verbinden wir sie mit unserer Komponente `Minter.js`.

Zuerst müssen wir unsere Funktion in unsere Datei `Minter.js` importieren, indem wir `import { connectWallet } from "./utils/interact.js";` oben in der Datei `Minter.js` hinzufügen. Deine ersten 11 Zeilen von `Minter.js` sollten nun so aussehen:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  // Zustandsvariablen
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Dann rufen wir innerhalb unserer Funktion `connectWalletPressed` unsere importierte Funktion `connectWallet` wie folgt auf:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Fällt dir auf, wie der Großteil unserer Funktionalität aus unserer Komponente `Minter.js` in die Datei `interact.js` abstrahiert wird? Das tun wir, um dem M-V-C-Paradigma zu entsprechen!

In `connectWalletPressed` machen wir einfach einen await-Aufruf an unsere importierte Funktion `connectWallet` und aktualisieren mit deren Antwort unsere Variablen `status` und `walletAddress` über ihre State-Hooks.

Lass uns nun beide Dateien `Minter.js` und `interact.js` speichern und unsere bisherige Benutzeroberfläche testen.

Öffne deinen Browser unter localhost:3000 und drücke oben rechts auf der Seite auf die Schaltfläche „Connect Wallet“.

Wenn du MetaMask installiert hast, solltest du aufgefordert werden, deine Wallet mit deiner Dapp zu verbinden. Akzeptiere die Einladung zur Verbindung.

Du solltest sehen, dass die Wallet-Schaltfläche nun anzeigt, dass deine Adresse verbunden ist.

Versuche als Nächstes, die Seite zu aktualisieren ... das ist seltsam. Unsere Wallet-Schaltfläche fordert uns auf, MetaMask zu verbinden, obwohl es bereits verbunden ist ...

Aber keine Sorge! Wir können das leicht beheben, indem wir eine Funktion namens `getCurrentWalletConnected` implementieren, die prüft, ob bereits eine Adresse mit unserer Dapp verbunden ist, und unsere Benutzeroberfläche entsprechend aktualisiert!

### Die Funktion getCurrentWalletConnected {#get-current-wallet}

Füge in deiner Datei `interact.js` die folgende Funktion `getCurrentWalletConnected` hinzu:

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Dieser Code ist der Funktion `connectWallet`, die wir gerade geschrieben haben, _sehr_ ähnlich.

Der Hauptunterschied besteht darin, dass wir hier nicht die Methode `eth_requestAccounts` aufrufen, die MetaMask öffnet, damit der Benutzer seine Wallet verbinden kann, sondern die Methode `eth_accounts`, die einfach ein Array zurückgibt, das die MetaMask-Adressen enthält, die derzeit mit unserer Dapp verbunden sind.

Um diese Funktion in Aktion zu sehen, rufen wir sie in der Funktion `useEffect` unserer Komponente `Minter.js` auf.

Wie bei `connectWallet` müssen wir diese Funktion aus unserer Datei `interact.js` wie folgt in unsere Datei `Minter.js` importieren:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, // hier importieren
} from "./utils/interact.js"
```

Nun rufen wir sie einfach in unserer Funktion `useEffect` auf:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Beachte, dass wir die Antwort unseres Aufrufs von `getCurrentWalletConnected` verwenden, um unsere Zustandsvariablen `walletAddress` und `status` zu aktualisieren.

Sobald du diesen Code hinzugefügt hast, versuche, unser Browserfenster zu aktualisieren. Die Schaltfläche sollte anzeigen, dass du verbunden bist, und eine Vorschau der Adresse deiner verbundenen Wallet anzeigen – auch nach dem Aktualisieren!

### addWalletListener implementieren {#implement-add-wallet-listener}

Der letzte Schritt bei der Einrichtung unserer Dapp-Wallet ist die Implementierung des Wallet-Listeners, damit unsere Benutzeroberfläche aktualisiert wird, wenn sich der Zustand unserer Wallet ändert, z. B. wenn der Benutzer die Verbindung trennt oder das Konto wechselt.

Füge in deiner Datei `Minter.js` eine Funktion `addWalletListener` hinzu, die wie folgt aussieht:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Lass uns kurz aufschlüsseln, was hier passiert:

- Zuerst prüft unsere Funktion, ob `window.ethereum` aktiviert ist (d. h. MetaMask ist installiert).
  - Wenn nicht, setzen wir unsere Zustandsvariable `status` einfach auf eine JSX-Zeichenfolge, die den Benutzer auffordert, MetaMask zu installieren.
  - Wenn es aktiviert ist, richten wir in Zeile 3 den Listener `window.ethereum.on("accountsChanged")` ein, der auf Zustandsänderungen in der MetaMask-Wallet lauscht, z. B. wenn der Benutzer ein zusätzliches Konto mit der Dapp verbindet, Konten wechselt oder die Verbindung zu einem Konto trennt. Wenn mindestens ein Konto verbunden ist, wird die Zustandsvariable `walletAddress` als erstes Konto im vom Listener zurückgegebenen Array `accounts` aktualisiert. Andernfalls wird `walletAddress` als leere Zeichenfolge festgelegt.

Schließlich müssen wir sie in unserer Funktion `useEffect` aufrufen:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Und voilà! Wir haben die Programmierung unserer gesamten Wallet-Funktionalität abgeschlossen! Jetzt, da unsere Wallet eingerichtet ist, lass uns herausfinden, wie wir unser NFT prägen können!

## NFT-Metadaten 101 {#nft-metadata-101}

Erinnerst du dich an die NFT-Metadaten, über die wir gerade in Schritt 0 dieses Tutorials gesprochen haben? Sie erwecken ein NFT zum Leben und ermöglichen es ihm, Eigenschaften wie ein digitales Asset, einen Namen, eine Beschreibung und andere Attribute zu haben.

Wir müssen diese Metadaten als JSON-Objekt konfigurieren und speichern, damit wir sie als Parameter `tokenURI` übergeben können, wenn wir die Funktion `mintNFT` unseres Smart Contracts aufrufen.

Der Text in den Feldern „Link to Asset“, „Name“ und „Description“ umfasst die verschiedenen Eigenschaften der Metadaten unseres NFTs. Wir formatieren diese Metadaten als JSON-Objekt, aber es gibt ein paar Optionen, wo wir dieses JSON-Objekt speichern können:

- Wir könnten es auf der Ethereum-Blockchain speichern; dies wäre jedoch sehr teuer.
- Wir könnten es auf einem zentralisierten Server wie AWS oder Firebase speichern. Aber das würde unserem Dezentralisierungs-Ethos widersprechen.
- Wir könnten IPFS verwenden, ein dezentralisiertes Protokoll und Peer-to-Peer-Netzwerk zum Speichern und Teilen von Daten in einem verteilten Dateisystem. Da dieses Protokoll dezentralisiert und kostenlos ist, ist es unsere beste Option!

Um unsere Metadaten auf IPFS zu speichern, verwenden wir [Pinata](https://pinata.cloud/), eine praktische IPFS-API und ein Toolkit. Im nächsten Schritt erklären wir genau, wie das geht!

## Pinata verwenden, um deine Metadaten an IPFS anzuheften {#use-pinata-to-pin-your-metadata-to-IPFS}

Wenn du kein [Pinata](https://pinata.cloud/)-Konto hast, melde dich [hier](https://app.pinata.cloud/auth/signup) für ein kostenloses Konto an und führe die Schritte zur Verifizierung deiner E-Mail-Adresse und deines Kontos durch.

### Deinen Pinata-API-Schlüssel erstellen {#create-pinata-api-key}

Navigiere zur Seite [https://pinata.cloud/keys](https://pinata.cloud/keys), wähle dann oben die Schaltfläche „New Key“ (Neuer Schlüssel), aktiviere das Admin-Widget und benenne deinen Schlüssel.

Dir wird dann ein Popup mit deinen API-Informationen angezeigt. Stelle sicher, dass du diese an einem sicheren Ort aufbewahrst.

Jetzt, da unser Schlüssel eingerichtet ist, fügen wir ihn unserem Projekt hinzu, damit wir ihn verwenden können.

### Eine .env-Datei erstellen {#create-a-env}

Wir können unseren Pinata-Schlüssel und unser Secret sicher in einer Umgebungsdatei speichern. Lass uns das [dotenv-Paket](https://www.npmjs.com/package/dotenv) in deinem Projektverzeichnis installieren.

Öffne einen neuen Tab in deinem Terminal (getrennt von dem, auf dem der lokale Host läuft) und stelle sicher, dass du dich im Ordner `minter-starter-files` befindest. Führe dann den folgenden Befehl in deinem Terminal aus:

```text
npm install dotenv --save
```

Erstelle als Nächstes eine `.env`-Datei im Stammverzeichnis deiner `minter-starter-files`, indem du Folgendes in deine Befehlszeile eingibst:

```javascript
vim.env
```

Dadurch wird deine `.env`-Datei in vim (einem Texteditor) geöffnet. Um sie zu speichern, drücke in dieser Reihenfolge „Esc“ + „:“ + „q“ auf deiner Tastatur.

Navigiere als Nächstes in VSCode zu deiner `.env`-Datei und füge deinen Pinata-API-Schlüssel und dein API-Secret wie folgt hinzu:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Speichere die Datei, und dann bist du bereit, die Funktion zum Hochladen deiner JSON-Metadaten auf IPFS zu schreiben!

### pinJSONToIPFS implementieren {#pin-json-to-ipfs}

Zum Glück für uns hat Pinata eine [API speziell zum Hochladen von JSON-Daten auf IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) und ein praktisches JavaScript-Beispiel mit axios, das wir mit einigen leichten Modifikationen verwenden können.

Lass uns in deinem `utils`-Ordner eine weitere Datei namens `pinata.js` erstellen und dann unser Pinata-Secret und unseren Schlüssel wie folgt aus der .env-Datei importieren:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Füge als Nächstes den zusätzlichen Code von unten in deine Datei `pinata.js` ein. Keine Sorge, wir werden aufschlüsseln, was alles bedeutet!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  // Axios-POST-Anfrage an Pinata durchführen ⬇️
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

Dann haben wir unsere asynchrone Funktion `pinJSONToIPFS`, die einen `JSONBody` als Eingabe und den Pinata-API-Schlüssel und das Secret in ihrem Header nimmt, um eine POST-Anfrage an ihre `pinJSONToIPFS`-API zu stellen.

- Wenn diese POST-Anfrage erfolgreich ist, gibt unsere Funktion ein JSON-Objekt zurück, bei dem der boolesche Wert `success` auf true gesetzt ist und die `pinataUrl` enthält, an der unsere Metadaten angeheftet wurden. Wir werden diese zurückgegebene `pinataUrl` als `tokenURI`-Eingabe für die Prägefunktion unseres Smart Contracts verwenden.
- Wenn diese POST-Anfrage fehlschlägt, gibt unsere Funktion ein JSON-Objekt zurück, bei dem der boolesche Wert `success` auf false gesetzt ist und eine `message`-Zeichenfolge unseren Fehler meldet.

Wie bei den Rückgabetypen unserer Funktion `connectWallet` geben wir JSON-Objekte zurück, damit wir ihre Parameter verwenden können, um unsere Zustandsvariablen und die Benutzeroberfläche zu aktualisieren.

## Deinen Smart Contract laden {#load-your-smart-contract}

Jetzt, da wir eine Möglichkeit haben, unsere NFT-Metadaten über unsere Funktion `pinJSONToIPFS` auf IPFS hochzuladen, benötigen wir eine Möglichkeit, eine Instanz unseres Smart Contracts zu laden, damit wir seine Funktion `mintNFT` aufrufen können.

Wie bereits erwähnt, werden wir in diesem Tutorial [diesen bestehenden NFT-Smart-Contract](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) verwenden; wenn du jedoch erfahren möchtest, wie wir ihn erstellt haben, oder selbst einen erstellen möchtest, empfehlen wir dir dringend, dir unser anderes Tutorial anzusehen: [„Wie man ein NFT erstellt“](https://www.alchemy.com/docs/how-to-create-an-nft).

### Die Contract-ABI {#contract-abi}

Wenn du unsere Dateien genau untersucht hast, wirst du festgestellt haben, dass sich in unserem `src`-Verzeichnis eine Datei `contract-abi.json` befindet. Eine ABI ist notwendig, um anzugeben, welche Funktion ein Contract aufrufen wird, und um sicherzustellen, dass die Funktion Daten in dem Format zurückgibt, das du erwartest.

Wir benötigen außerdem einen Alchemy-API-Schlüssel und die Alchemy-Web3-API, um uns mit der Ethereum-Blockchain zu verbinden und unseren Smart Contract zu laden.

### Deinen Alchemy-API-Schlüssel erstellen {#create-alchemy-api}

Wenn du noch kein Alchemy-Konto hast, [melde dich hier kostenlos an.](https://alchemy.com/?a=eth-org-nft-minter)

Sobald du ein Alchemy-Konto erstellt hast, kannst du einen API-Schlüssel generieren, indem du eine App erstellst. Dies ermöglicht es uns, Anfragen an das Ropsten-Testnet zu stellen.

Navigiere zur Seite „Create App“ (App erstellen) in deinem Alchemy-Dashboard, indem du mit der Maus über „Apps“ in der Navigationsleiste fährst und auf „Create App“ klickst.

Benenne deine App (wir haben „My First NFT!“ gewählt), biete eine kurze Beschreibung an, wähle „Staging“ für die Umgebung, die für die Buchhaltung deiner App verwendet wird, und wähle „Ropsten“ für dein Netzwerk.

Klicke auf „Create app“ und das war's! Deine App sollte in der Tabelle unten erscheinen.

Großartig, jetzt, da wir unsere HTTP-Alchemy-API-URL erstellt haben, kopiere sie in deine Zwischenablage ...

… und fügen wir sie dann unserer `.env`-Datei hinzu. Insgesamt sollte deine .env-Datei so aussehen:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https: // eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Jetzt, da wir unsere Contract-ABI und unseren Alchemy-API-Schlüssel haben, sind wir bereit, unseren Smart Contract mit [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) zu laden.

### Deinen Alchemy-Web3-Endpunkt und Contract einrichten {#setup-alchemy-endpoint}

Wenn du es noch nicht hast, musst du zuerst [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) installieren, indem du im Terminal zum Home-Verzeichnis `nft-minter-tutorial` navigierst:

```text
cd ..
npm install @alch/alchemy-web3
```

Gehen wir als Nächstes zurück zu unserer Datei `interact.js`. Füge oben in der Datei den folgenden Code hinzu, um deinen Alchemy-Schlüssel aus deiner .env-Datei zu importieren und deinen Alchemy-Web3-Endpunkt einzurichten:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ist ein Wrapper um [Web3.js](https://docs.web3js.org/), der erweiterte API-Methoden und andere entscheidende Vorteile bietet, um dir das Leben als Web3-Entwickler zu erleichtern. Es ist so konzipiert, dass es nur minimale Konfiguration erfordert, sodass du es sofort in deiner App verwenden kannst!

Fügen wir als Nächstes unsere Contract-ABI und Contract-Adresse zu unserer Datei hinzu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Sobald wir beides haben, sind wir bereit, mit der Programmierung unserer Prägefunktion zu beginnen!

## Die Funktion mintNFT implementieren {#implement-the-mintnft-function}

Lass uns in deiner Datei `interact.js` unsere Funktion `mintNFT` definieren, die namensgebend unser NFT prägen wird.

Da wir zahlreiche asynchrone Aufrufe durchführen werden (an Pinata, um unsere Metadaten an IPFS anzuheften, an Alchemy Web3, um unseren Smart Contract zu laden, und an MetaMask, um unsere Transaktionen zu signieren), wird unsere Funktion ebenfalls asynchron sein.

Die drei Eingaben für unsere Funktion sind die `url` unseres digitalen Assets, der `name` und die `description`. Füge die folgende Funktionssignatur unter der Funktion `connectWallet` hinzu:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Eingabefehlerbehandlung {#input-error-handling}

Natürlich ist es sinnvoll, zu Beginn der Funktion eine Art Eingabefehlerbehandlung zu haben, damit wir diese Funktion verlassen, wenn unsere Eingabeparameter nicht korrekt sind. Fügen wir innerhalb unserer Funktion den folgenden Code hinzu:

```javascript
export const mintNFT = async (url, name, description) => {
  // Fehlerbehandlung
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Im Wesentlichen geben wir, wenn einer der Eingabeparameter eine leere Zeichenfolge ist, ein JSON-Objekt zurück, bei dem der boolesche Wert `success` auf false gesetzt ist und die Zeichenfolge `status` meldet, dass alle Felder in unserer Benutzeroberfläche ausgefüllt sein müssen.

### Die Metadaten auf IPFS hochladen {#upload-metadata-to-ipfs}

Sobald wir wissen, dass unsere Metadaten richtig formatiert sind, besteht der nächste Schritt darin, sie in ein JSON-Objekt zu verpacken und über die von uns geschriebene Funktion `pinJSONToIPFS` auf IPFS hochzuladen!

Dazu müssen wir zunächst die Funktion `pinJSONToIPFS` in unsere Datei `interact.js` importieren. Fügen wir ganz oben in der `interact.js` Folgendes hinzu:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Erinnere dich daran, dass `pinJSONToIPFS` einen JSON-Body aufnimmt. Bevor wir sie also aufrufen, müssen wir unsere Parameter `url`, `name` und `description` in ein JSON-Objekt formatieren.

Aktualisieren wir unseren Code, um ein JSON-Objekt namens `metadata` zu erstellen, und rufen dann `pinJSONToIPFS` mit diesem Parameter `metadata` auf:

```javascript
export const mintNFT = async (url, name, description) => {
  // Fehlerbehandlung
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // Metadaten erstellen
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // Pinata-Aufruf durchführen
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Beachte, dass wir die Antwort unseres Aufrufs von `pinJSONToIPFS(metadata)` im Objekt `pinataResponse` speichern. Dann parsen wir dieses Objekt auf eventuelle Fehler.

Wenn ein Fehler vorliegt, geben wir ein JSON-Objekt zurück, bei dem der boolesche Wert `success` auf false gesetzt ist und unsere Zeichenfolge `status` meldet, dass unser Aufruf fehlgeschlagen ist. Andernfalls extrahieren wir die `pinataURL` aus der `pinataResponse` und speichern sie als unsere Variable `tokenURI`.

Jetzt ist es an der Zeit, unseren Smart Contract mit der Alchemy-Web3-API zu laden, die wir oben in unserer Datei initialisiert haben. Füge die folgende Codezeile unten in der Funktion `mintNFT` hinzu, um den Contract in der globalen Variablen `window.contract` festzulegen:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Das Letzte, was wir in unserer Funktion `mintNFT` hinzufügen müssen, ist unsere Ethereum-Transaktion:

```javascript
// Ethereum-Transaktion einrichten
const transactionParameters = {
  to: contractAddress, // Erforderlich, außer bei Vertragsveröffentlichungen.
  from: window.ethereum.selectedAddress, // muss mit der aktiven Adresse des Benutzers übereinstimmen.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), // NFT-Smart-Contract aufrufen
}

// die Transaktion über MetaMask signieren
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Wenn du bereits mit Ethereum-Transaktionen vertraut bist, wirst du feststellen, dass die Struktur dem, was du gesehen hast, ziemlich ähnlich ist.

- Zuerst richten wir unsere Transaktionsparameter ein.
  - `to` gibt die Empfängeradresse an (unseren Smart Contract)
  - `from` gibt den Unterzeichner der Transaktion an (die mit MetaMask verbundene Adresse des Benutzers: `window.ethereum.selectedAddress`)
  - `data` enthält den Aufruf der Methode `mintNFT` unseres Smart Contracts, die unsere `tokenURI` und die Wallet-Adresse des Benutzers, `window.ethereum.selectedAddress`, als Eingaben erhält
- Dann machen wir einen await-Aufruf, `window.ethereum.request`, bei dem wir MetaMask bitten, die Transaktion zu signieren. Beachte, dass wir in dieser Anfrage unsere eth-Methode (eth_sendTransaction) angeben und unsere `transactionParameters` übergeben. An diesem Punkt öffnet sich MetaMask im Browser und fordert den Benutzer auf, die Transaktion zu signieren oder abzulehnen.
  - Wenn die Transaktion erfolgreich ist, gibt die Funktion ein JSON-Objekt zurück, bei dem der boolesche Wert `success` auf true gesetzt ist und die Zeichenfolge `status` den Benutzer auffordert, Etherscan für weitere Informationen zu seiner Transaktion zu überprüfen.
  - Wenn die Transaktion fehlschlägt, gibt die Funktion ein JSON-Objekt zurück, bei dem der boolesche Wert `success` auf false gesetzt ist und die Zeichenfolge `status` die Fehlermeldung weiterleitet.

Insgesamt sollte unsere Funktion `mintNFT` so aussehen:

```javascript
export const mintNFT = async (url, name, description) => {
  // Fehlerbehandlung
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // Metadaten erstellen
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // Pinata-Pin-Anfrage
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  // Smart Contract laden
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) // loadContract();

  // Ethereum-Transaktion einrichten
  const transactionParameters = {
    to: contractAddress, // Erforderlich, außer bei Vertragsveröffentlichungen.
    from: window.ethereum.selectedAddress, // muss mit der aktiven Adresse des Benutzers übereinstimmen.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), // NFT-Smart-Contract aufrufen
  }

  // Transaktion über MetaMask signieren
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Das ist eine riesige Funktion! Jetzt müssen wir nur noch unsere Funktion `mintNFT` mit unserer Komponente `Minter.js` verbinden ...

## mintNFT mit unserem Minter.js-Frontend verbinden {#connect-our-frontend}

Öffne deine Datei `Minter.js` und aktualisiere die Zeile `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` oben wie folgt:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Implementiere schließlich die Funktion `onMintPressed`, um einen await-Aufruf an deine importierte Funktion `mintNFT` durchzuführen und die Zustandsvariable `status` zu aktualisieren, um widerzuspiegeln, ob unsere Transaktion erfolgreich war oder fehlgeschlagen ist:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Dein NFT auf einer Live-Website bereitstellen {#deploy-your-NFT}

Bist du bereit, dein Projekt live zu schalten, damit Benutzer damit interagieren können? Sieh dir [dieses Tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) an, um deinen Minter auf einer Live-Website bereitzustellen.

Ein letzter Schritt ...

## Die Blockchain-Welt im Sturm erobern {#take-the-blockchain-world-by-storm}

Nur ein Scherz, du hast es bis zum Ende des Tutorials geschafft!

Zusammenfassend hast du durch den Bau eines NFT-Minters erfolgreich gelernt, wie man:

- Eine Verbindung zu MetaMask über dein Frontend-Projekt herstellt
- Smart-Contract-Methoden von deinem Frontend aus aufruft
- Transaktionen mit MetaMask signiert

Vermutlich möchtest du die über deine Dapp geprägten NFTs in deiner Wallet präsentieren können – sieh dir also unbedingt unser kurzes Tutorial [Wie du dein NFT in deiner Wallet anzeigst](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) an!

Und wie immer, wenn du Fragen hast, sind wir hier, um im [Alchemy Discord](https://discord.gg/gWuC7zB) zu helfen. Wir können es kaum erwarten zu sehen, wie du die Konzepte aus diesem Tutorial auf deine zukünftigen Projekte anwendest!