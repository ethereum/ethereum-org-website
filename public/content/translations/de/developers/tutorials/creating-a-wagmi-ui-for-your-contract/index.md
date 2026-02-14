---
title: "Erstellen einer Benutzeroberfläche für Ihren Vertrag"
description: "Mithilfe moderner Komponenten wie TypeScript, React, Vite und Wagmi werden wir eine moderne, aber minimalistische Benutzeroberfläche durchgehen und lernen, wie man eine Wallet mit der Benutzeroberfläche verbindet, einen Smart Contract aufruft, um Informationen auszulesen, eine Transaktion an einen Smart Contract zu senden und Ereignisse von einem Smart Contract zu überwachen, um Änderungen zu erkennen."
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "Frontend" ]
skill: beginner
published: 2023-11-01
lang: de
sidebarDepth: 3
---

Sie haben eine Funktion gefunden, die wir im Ethereum-Ökosystem benötigen. Sie haben die Smart Contracts geschrieben, um sie zu implementieren, und vielleicht sogar einen zugehörigen Code, der Offchain ausgeführt wird. Das ist großartig! Leider werden Sie ohne eine Benutzeroberfläche keine Benutzer haben, und als Sie das letzte Mal eine Website geschrieben haben, benutzten die Leute noch Wählmodems und JavaScript war neu.

Dieser Artikel ist für Sie. Ich gehe davon aus, dass Sie programmieren können und vielleicht ein wenig JavaScript und HTML kennen, aber dass Ihre Kenntnisse im Bereich der Benutzeroberflächen eingerostet und veraltet sind. Gemeinsam werden wir eine einfache, moderne Anwendung durchgehen, damit Sie sehen, wie man das heutzutage macht.

## Warum ist das wichtig? {#why-important}

Theoretisch könnten Sie die Leute einfach [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) oder [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) verwenden lassen, um mit Ihren Verträgen zu interagieren. Das wird für die erfahrenen Ethereans großartig sein. Aber wir versuchen, [eine weitere Milliarde Menschen](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) zu erreichen. Dies wird ohne eine großartige Benutzererfahrung nicht geschehen, und eine benutzerfreundliche Oberfläche ist ein großer Teil davon.

## Greeter-Anwendung {#greeter-app}

Es gibt eine Menge Theorie dahinter, wie eine moderne Benutzeroberfläche funktioniert, und [viele gute Seiten](https://react.dev/learn/thinking-in-react), [die es erklären](https://wagmi.sh/core/getting-started). Anstatt die gute Arbeit dieser Seiten zu wiederholen, gehe ich davon aus, dass Sie es vorziehen, durch praktische Anwendung zu lernen und mit einer Anwendung zu beginnen, mit der Sie herumspielen können. Sie brauchen immer noch die Theorie, um Dinge zu erledigen, und wir werden dazu kommen – wir werden einfach Quelldatei für Quelldatei durchgehen und die Dinge besprechen, wenn wir zu ihnen kommen.

### Installation {#installation}

1. Fügen Sie bei Bedarf [die Holesky-Blockchain](https://chainlist.org/?search=holesky&testnets=true) zu Ihrer Wallet hinzu und [holen Sie sich Test-ETH](https://www.holeskyfaucet.io/).

2. Klonen Sie das GitHub-Repository.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Installieren Sie die erforderlichen Pakete.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Starten Sie die Anwendung.

   ```sh
   pnpm dev
   ```

5. Navigieren Sie zu der von der Anwendung angezeigten URL. In den meisten Fällen ist dies [http://localhost:5173/](http://localhost:5173/).

6. Sie können den Quellcode des Vertrags, eine leicht modifizierte Version von Hardhat's Greeter, [auf einem Blockchain-Explorer](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) sehen.

### Dateidurchsicht {#file-walk-through}

#### `index.html` {#index-html}

Diese Datei ist ein Standard-HTML-Boilerplate mit Ausnahme dieser Zeile, die die Skriptdatei importiert.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Die Dateierweiterung verrät uns, dass es sich bei dieser Datei um eine [React-Komponente](https://www.w3schools.com/react/react_components.asp) handelt, die in [TypeScript](https://www.typescriptlang.org/) geschrieben wurde, einer Erweiterung von JavaScript, die eine [Typüberprüfung](https://en.wikipedia.org/wiki/Type_system#Type_checking) unterstützt. TypeScript wird in JavaScript kompiliert, sodass wir es für die clientseitige Ausführung verwenden können.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importieren Sie den benötigten Bibliotheks-Code.

```tsx
import { App } from './App'
```

Importieren Sie die React-Komponente, die die Anwendung implementiert (siehe unten).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Erstellen Sie die Root-React-Komponente. Der Parameter für `render` ist [JSX](https://www.w3schools.com/react/react_jsx.asp), eine Erweiterungssprache, die sowohl HTML als auch JavaScript/TypeScript verwendet. Das Ausrufezeichen hier teilt dem TypeScript-Compiler mit: "Auch wenn nicht verifiziert werden kann, dass `document.getElementById('root')` ein gültiger Parameter für `ReactDOM.createRoot` sein wird, keine Sorge – ich als Entwickler garantiere, dass er vorhanden sein wird".

```tsx
  <React.StrictMode>
```

Die Anwendung befindet sich in [einer `React.StrictMode`-Komponente](https://react.dev/reference/react/StrictMode). Diese Komponente weist die React-Bibliothek an, zusätzliche Debugging-Prüfungen einzufügen, was während der Entwicklung nützlich ist.

```tsx
    <WagmiConfig config={config}>
```

Die Anwendung befindet sich auch in [einer `WagmiConfig`-Komponente](https://wagmi.sh/react/api/WagmiProvider). [Die wagmi (we are going to make it) Bibliothek](https://wagmi.sh/) verbindet die React-UI-Definitionen mit [der viem-Bibliothek](https://viem.sh/) zum Schreiben einer dezentralisierten Ethereum-Anwendung.

```tsx
      <RainbowKitProvider chains={chains}>
```

Und schließlich [eine `RainbowKitProvider`-Komponente](https://www.rainbowkit.com/). Diese Komponente kümmert sich um die Anmeldung und die Kommunikation zwischen der Wallet und der Anwendung.

```tsx
        <App />
```

Jetzt können wir die Komponente für die Anwendung haben, die die Benutzeroberfläche tatsächlich implementiert. Das `/>` am Ende der Komponente teilt React mit, dass diese Komponente gemäß dem XML-Standard keine Definitionen in sich enthält.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Natürlich müssen wir auch die anderen Komponenten schließen.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Dies ist die Standardmethode zum Erstellen einer React-Komponente – definieren Sie eine Funktion, die jedes Mal aufgerufen wird, wenn sie gerendert werden muss. Diese Funktion hat typischerweise am Anfang etwas TypeScript- oder JavaScript-Code, gefolgt von einer `return`-Anweisung, die den JSX-Code zurückgibt.

```tsx
  const { isConnected } = useAccount()
```

Hier verwenden wir [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount), um zu prüfen, ob wir über eine Wallet mit einer Blockchain verbunden sind oder nicht.

Konventionsgemäß sind in React Funktionen, die `use...` heißen, [Hooks](https://www.w3schools.com/react/react_hooks.asp), die eine Art von Daten zurückgeben. Wenn Sie solche Hooks verwenden, erhält Ihre Komponente nicht nur die Daten, sondern wenn sich diese Daten ändern, wird die Komponente mit den aktualisierten Informationen neu gerendert.

```tsx
  return (
    <>
```

Das JSX einer React-Komponente _muss_ eine Komponente zurückgeben. Wenn wir mehrere Komponenten haben und nichts haben, was sie "natürlich" umschließt, verwenden wir eine leere Komponente (`<> ...` </>`), um sie zu einer einzigen Komponente zu machen.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Wir erhalten [die `ConnectButton`-Komponente](https://www.rainbowkit.com/docs/connect-button) von RainbowKit. Wenn wir nicht verbunden sind, erhalten wir eine `Connect Wallet`-Schaltfläche, die ein modales Fenster öffnet, das Wallets erklärt und Sie auswählen lässt, welche Sie verwenden. Wenn wir verbunden sind, werden die von uns verwendete Blockchain, unsere Kontoadresse und unser ETH-Guthaben angezeigt. Wir können diese Anzeigen verwenden, um das Netzwerk zu wechseln oder die Verbindung zu trennen.

```tsx
      {isConnected && (
```

Wenn wir tatsächliches JavaScript (oder TypeScript, das zu JavaScript kompiliert wird) in ein JSX einfügen müssen, verwenden wir Klammern (`{}`).

Die Syntax `a && b` ist eine Kurzform für [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Das heißt, wenn `a`wahr ist, wird es zu`b`ausgewertet, andernfalls zu`a`(was`false`, `0` usw. sein kann). Dies ist eine einfache Möglichkeit, React mitzuteilen, dass eine Komponente nur dann angezeigt werden soll, wenn eine bestimmte Bedingung erfüllt ist.

In diesem Fall wollen wir dem Benutzer `Greeter` nur dann anzeigen, wenn der Benutzer mit einer Blockchain verbunden ist.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Diese Datei enthält den größten Teil der UI-Funktionalität. Es enthält Definitionen, die normalerweise in mehreren Dateien wären, aber da dies ein Tutorial ist, ist das Programm so optimiert, dass es beim ersten Mal leicht zu verstehen ist, anstatt auf Leistung oder einfache Wartung.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Wir verwenden diese Bibliotheksfunktionen. Auch hier werden sie unten erklärt, wo sie verwendet werden.

```tsx
import { AddressType } from 'abitype'
```

[Die `abitype`-Bibliothek](https://abitype.dev/) stellt uns TypeScript-Definitionen für verschiedene Ethereum-Datentypen zur Verfügung, wie z. B. [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

Das ABI für den `Greeter`-Vertrag.
Wenn Sie die Verträge und die Benutzeroberfläche gleichzeitig entwickeln, würden Sie sie normalerweise im selben Repository ablegen und das vom Solidity-Compiler generierte ABI als Datei in Ihrer Anwendung verwenden. Dies ist hier jedoch nicht notwendig, da der Vertrag bereits entwickelt ist und sich nicht ändern wird.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript ist stark typisiert. Wir verwenden diese Definition, um die Adresse anzugeben, in der der `Greeter`-Vertrag auf verschiedenen Ketten bereitgestellt wird. Der Schlüssel ist eine Zahl (die Chain-ID) und der Wert ist ein `AddressType` (eine Adresse).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Die Adresse des Vertrags in den beiden unterstützten Netzwerken: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) und [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Hinweis: Es gibt tatsächlich eine dritte Definition für Redstone Holesky, die weiter unten erläutert wird.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Dieser Typ wird als Parameter für die `ShowObject`-Komponente verwendet (wird später erklärt). Er enthält den Namen des Objekts und seinen Wert, die zu Debugging-Zwecken angezeigt werden.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

Zu jedem Zeitpunkt können wir entweder wissen, was die Begrüßung ist (weil wir sie von der Blockchain gelesen haben) oder nicht wissen (weil wir sie noch nicht erhalten haben). Es ist also nützlich, einen Typ zu haben, der entweder ein String oder nichts sein kann.

##### `Greeter`-Komponente {#greeter-component}

```tsx
const Greeter = () => {
```

Schließlich definieren wir die Komponente.

```tsx
  const { chain } = useNetwork()
```

Informationen über die von uns verwendete Chain, bereitgestellt von [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Da es sich um einen Hook (`use...`) handelt, wird die Komponente bei jeder Änderung dieser Information neu gezeichnet.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Die Adresse des Greeter-Vertrags, die je nach Chain variiert (und `undefined` ist, wenn wir keine Chain-Informationen haben oder uns auf einer Chain ohne diesen Vertrag befinden).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Keine Argumente
    watch: true
  })
```

[Der `useReadContract`-Hook](https://wagmi.sh/react/api/hooks/useReadContract) liest Informationen aus einem Vertrag. Sie können genau sehen, welche Informationen es zurückgibt, wenn Sie `readResults` in der Benutzeroberfläche erweitern. In diesem Fall möchten wir, dass es weiter sucht, damit wir informiert werden, wenn sich die Begrüßung ändert.

**Hinweis:** Wir könnten auf [`setGreeting`-Ereignisse](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) lauschen, um zu wissen, wann sich die Begrüßung ändert, und auf diese Weise aktualisieren. Obwohl dies effizienter sein mag, ist es nicht in allen Fällen anwendbar. Wenn der Benutzer zu einer anderen Kette wechselt, ändert sich auch die Begrüßung, aber diese Änderung wird nicht von einem Ereignis begleitet. Wir könnten einen Teil des Codes haben, der auf Ereignisse lauscht, und einen anderen, um Kettenänderungen zu identifizieren, aber das wäre komplizierter, als nur [den `watch`-Parameter](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) zu setzen.

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

Der [`useState`-Hook](https://www.w3schools.com/react/react_usestate.asp) von React ermöglicht es uns, eine Zustandsvariable anzugeben, deren Wert von einem Rendering der Komponente zum nächsten erhalten bleibt. Der Anfangswert ist der Parameter, in diesem Fall der leere String.

Der `useState`-Hook gibt eine Liste mit zwei Werten zurück:

1. Der aktuelle Wert der Zustandsvariable.
2. Eine Funktion, um die Zustandsvariable bei Bedarf zu ändern. Da dies ein Hook ist, wird die Komponente jedes Mal neu gerendert, wenn sie aufgerufen wird.

In diesem Fall verwenden wir eine Zustandsvariable für die neue Begrüßung, die der Benutzer setzen möchte.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Dies ist der Ereignis-Handler für den Fall, dass sich das Eingabefeld für die neue Begrüßung ändert. Der Typ [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) gibt an, dass dies ein Handler für eine Wertänderung eines HTML-Eingabeelements ist. Der Teil `<HTMLInputElement>` wird verwendet, da es sich um einen [generischen Typ](https://www.w3schools.com/typescript/typescript_basic_generics.php) handelt.

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Dies ist der Prozess, um eine Blockchain-Transaktion aus der Client-Perspektive zu übermitteln:

1. Senden Sie die Transaktion an einen Knoten in der Blockchain unter Verwendung von [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Warten Sie auf eine Antwort vom Knoten.
3. Wenn die Antwort eingegangen ist, bitten Sie den Benutzer, die Transaktion über die Wallet zu signieren. Dieser Schritt _muss_ erfolgen, nachdem die Antwort des Knotens eingegangen ist, da dem Benutzer die Gaskosten der Transaktion vor dem Signieren angezeigt werden.
4. Warten Sie auf die Genehmigung durch den Benutzer.
5. Senden Sie die Transaktion erneut, diesmal mit [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Schritt 2 wird wahrscheinlich eine spürbare Zeit in Anspruch nehmen, während der sich die Benutzer fragen würden, ob ihr Befehl wirklich von der Benutzeroberfläche empfangen wurde und warum sie nicht bereits gebeten werden, die Transaktion zu signieren. Das sorgt für eine schlechte Benutzererfahrung (UX).

Die Lösung besteht darin, [Prepare-Hooks](https://wagmi.sh/react/prepare-hooks) zu verwenden. Jedes Mal, wenn sich ein Parameter ändert, senden Sie sofort die `eth_estimateGas`-Anfrage an den Knoten. Wenn der Benutzer dann tatsächlich die Transaktion senden möchte (in diesem Fall durch Drücken von **Gruß aktualisieren**), sind die Gaskosten bekannt und der Benutzer kann die Wallet-Seite sofort sehen.

```tsx
  return (
```

Jetzt können wir endlich das eigentliche HTML zur Rückgabe erstellen.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Erstellen Sie eine `ShowGreeting`-Komponente (wird unten erklärt), aber nur, wenn die Begrüßung erfolgreich von der Blockchain gelesen wurde.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Dies ist das Eingabefeld, in dem der Benutzer eine neue Begrüßung festlegen kann. Jedes Mal, wenn der Benutzer eine Taste drückt, rufen wir `greetingChange` auf, was `setNewGreeting` aufruft. Da `setNewGreeting` aus dem `useState`-Hook stammt, wird die `Greeter`-Komponente erneut gerendert. Dies bedeutet, dass:

- Wir müssen `value` angeben, um den Wert der neuen Begrüßung beizubehalten, da er sich sonst wieder in den Standardwert, den leeren String, zurückverwandeln würde.
- `usePrepareContractWrite` wird jedes Mal aufgerufen, wenn sich `newGreeting` ändert, was bedeutet, dass es immer das neueste `newGreeting` in der vorbereiteten Transaktion haben wird.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Gruß aktualisieren
      </button>
```

Wenn kein `workingTx.write` vorhanden ist, warten wir noch auf Informationen, die zum Senden der Grußaktualisierung erforderlich sind, sodass die Schaltfläche deaktiviert ist. Wenn ein `workingTx.write`-Wert vorhanden ist, ist dies die Funktion, die aufgerufen werden muss, um die Transaktion zu senden.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Schließlich, um Ihnen zu helfen zu sehen, was wir tun, zeigen wir die drei Objekte, die wir verwenden:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting`-Komponente {#showgreeting-component}

Diese Komponente zeigt

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Eine Komponentenfunktion erhält einen Parameter mit allen Attributen der Komponente.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject`-Komponente {#showobject-component}

Zu Informationszwecken verwenden wir die `ShowObject`-Komponente, um die wichtigen Objekte anzuzeigen (`readResults` zum Lesen der Begrüßung und `preparedTx` und `workingTx` für von uns erstellte Transaktionen).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Wir möchten die Benutzeroberfläche nicht mit allen Informationen überladen. Um sie also ansehen oder schließen zu können, verwenden wir ein [`details`](https://www.w3schools.com/tags/tag_details.asp)-Tag.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Die meisten Felder werden mit [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) angezeigt.

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Funktionen:
          <ul>
```

Die Ausnahme sind Funktionen, die nicht Teil des [JSON-Standards](https://www.json.org/json-en.html) sind und daher separat angezeigt werden müssen.

```tsx
          {funs.map((f, i) =>
```

Innerhalb von JSX wird der Code in `{` geschweiften Klammern `}` als JavaScript interpretiert. Dann wird der Code innerhalb der `(` runden Klammern `)` wieder als JSX interpretiert.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React erfordert, dass Tags im [DOM-Baum](https://www.w3schools.com/js/js_htmldom.asp) eindeutige Bezeichner haben. Dies bedeutet, dass untergeordnete Elemente desselben Tags (in diesem Fall [die ungeordnete Liste](https://www.w3schools.com/tags/tag_ul.asp)) unterschiedliche `key`-Attribute benötigen.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Beenden Sie die verschiedenen HTML-Tags.

##### Der abschließende `Export` {#the-final-export}

```tsx
export { Greeter }
```

Die `Greeter`-Komponente ist diejenige, die wir für die Anwendung exportieren müssen.

#### `src/wagmi.ts` {#wagmi-ts}

Schließlich befinden sich verschiedene Definitionen in Bezug auf WAGMI in `src/wagmi.ts`. Ich werde hier nicht alles erklären, da das meiste davon Boilerplate ist, den Sie wahrscheinlich nicht ändern müssen.

Der Code hier ist nicht genau derselbe wie [auf Github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts), da wir später im Artikel eine weitere Chain ([Redstone Holesky](https://redstone.xyz/docs/network-info)) hinzufügen.

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importieren Sie die Blockchains, die die Anwendung unterstützt. Sie können die Liste der unterstützten Chains [im Viem-Github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) sehen.

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Um [WalletConnect](https://walletconnect.com/) verwenden zu können, benötigen Sie eine Projekt-ID für Ihre Anwendung. Sie können sie [auf cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in) erhalten.

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Eine weitere Blockchain hinzufügen {#add-blockchain}

Heutzutage gibt es eine Menge [L2-Skalierungslösungen](/layer-2/), und vielleicht möchten Sie einige unterstützen, die Viem noch nicht unterstützt. Dazu ändern Sie `src/wagmi.ts`. Diese Anweisungen erklären, wie man [Redstone Holesky](https://redstone.xyz/docs/network-info) hinzufügt.

1. Importieren Sie den `defineChain`-Typ aus Viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Fügen Sie die Netzwerkdefinition hinzu.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Fügen Sie die neue Chain zum `configureChains`-Aufruf hinzu.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Stellen Sie sicher, dass die Anwendung die Adresse für Ihre Verträge im neuen Netzwerk kennt. In diesem Fall ändern wir `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Fazit {#conclusion}

Natürlich ist es Ihnen egal, ob Sie eine Benutzeroberfläche für `Greeter` bereitstellen. Sie möchten eine Benutzeroberfläche für Ihre eigenen Verträge erstellen. Um Ihre eigene Anwendung zu erstellen, führen Sie diese Schritte aus:

1. Geben Sie an, dass eine Wagmi-Anwendung erstellt werden soll.

   ```sh copy
   pnpm create wagmi
   ```

2. Benennen Sie die Anwendung.

3. Wählen Sie das **React**-Framework.

4. Wählen Sie die **Vite**-Variante.

5. Sie können [Rainbow Kit hinzufügen](https://www.rainbowkit.com/docs/installation#manual-setup).

Jetzt können Sie loslegen und Ihre Verträge für die ganze Welt nutzbar machen.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).

