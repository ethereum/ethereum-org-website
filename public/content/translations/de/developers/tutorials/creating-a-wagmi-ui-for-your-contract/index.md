---
title: "Erstellen einer Benutzeroberfläche für Ihren Smart Contract"
description: "Unter Verwendung moderner Komponenten wie TypeScript, React, Vite und Wagmi werden wir eine moderne, aber minimalistische Benutzeroberfläche durchgehen und lernen, wie man ein Wallet mit der Benutzeroberfläche verbindet, einen Smart Contract aufruft, um Informationen zu lesen, eine Transaktion an einen Smart Contract sendet und Ereignisse von einem Smart Contract überwacht, um Änderungen zu identifizieren."
author: Ori Pomerantz
tags: ["TypeScript", "React", "Vite", "Wagmi", "frontend"]
skill: beginner
breadcrumb: UI mit WAGMI
published: 2023-11-01
lang: de
sidebarDepth: 3
---

Sie haben eine Funktion gefunden, die wir im Ethereum-Ökosystem benötigen. Sie haben die Smart Contracts geschrieben, um sie zu implementieren, und vielleicht sogar einigen zugehörigen Code, der Off-Chain ausgeführt wird. Das ist großartig! Leider werden Sie ohne eine Benutzeroberfläche keine Benutzer haben, und das letzte Mal, als Sie eine Website geschrieben haben, benutzten die Leute Einwahlmodems und JavaScript war neu.

Dieser Artikel ist für Sie. Ich gehe davon aus, dass Sie programmieren können und vielleicht ein bisschen JavaScript und HTML kennen, aber dass Ihre Fähigkeiten im Bereich Benutzeroberflächen eingerostet und veraltet sind. Gemeinsam werden wir eine einfache moderne Anwendung durchgehen, damit Sie sehen, wie das heutzutage gemacht wird.

## Warum dies wichtig ist {#why-important}

Theoretisch könnten Sie die Leute einfach [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) oder [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) verwenden lassen, um mit Ihren Verträgen zu interagieren. Das ist großartig für erfahrene Ethereans. Aber wir versuchen, [einer weiteren Milliarde Menschen](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) zu dienen. Dies wird ohne eine großartige Benutzererfahrung nicht passieren, und eine freundliche Benutzeroberfläche ist ein großer Teil davon.

## Greeter-Anwendung {#greeter-app}

Es gibt viel Theorie darüber, wie moderne UIs funktionieren, und [viele gute Websites](https://react.dev/learn/thinking-in-react), [die das erklären](https://wagmi.sh/core/getting-started). Anstatt die hervorragende Arbeit dieser Websites zu wiederholen, gehe ich davon aus, dass Sie lieber durch Ausprobieren lernen und mit einer Anwendung beginnen, mit der Sie spielen können. Sie brauchen die Theorie trotzdem, um Dinge zu erledigen, und wir werden dazu kommen – wir gehen einfach Quelldatei für Quelldatei durch und besprechen die Dinge, wenn wir auf sie stoßen.

### Installation {#installation}

1. Die Anwendung verwendet das [Sepolia](https://sepolia.dev/)-Testnet. Falls erforderlich, [holen Sie sich Sepolia-Test-ETH](/developers/docs/networks/#sepolia) und [fügen Sie Sepolia zu Ihrem Wallet hinzu](https://chainlist.org/chain/11155111).

2. Klonen Sie das GitHub-Repository und installieren Sie die erforderlichen Pakete.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
```

3. Die Anwendung verwendet kostenlose Zugangspunkte, die Leistungseinschränkungen aufweisen. Wenn Sie einen Anbieter für [Blockchain-Knoten als Dienstleistung (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) verwenden möchten, ersetzen Sie die URLs in [`src/wagmi.ts`](#wagmi-ts).

4. Starten Sie die Anwendung.

   ```sh
   npm run dev
```

5. Navigieren Sie zu der von der Anwendung angezeigten URL. In den meisten Fällen ist das [http://localhost:5173/](http://localhost:5173/).

6. Sie können den Quellcode des Vertrags, eine modifizierte Version von Hardhats Greeter, [in einer Blocksuchmaschine sehen](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Dateidurchlauf {#file-walk-through}

#### `index.html` {#index-html}

Diese Datei ist ein Standard-HTML-Boilerplate, mit Ausnahme dieser Zeile, die die Skriptdatei importiert.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Die Dateierweiterung zeigt an, dass es sich um eine [React-Komponente](https://www.w3schools.com/react/react_components.asp) handelt, die in [TypeScript](https://www.typescriptlang.org/) geschrieben wurde, einer Erweiterung von JavaScript, die [Typprüfung](https://en.wikipedia.org/wiki/Type_system#Type_checking) unterstützt. TypeScript wird zu JavaScript kompiliert, sodass wir es auf der Client-Seite verwenden können.

Diese Datei wird hauptsächlich für den Fall erklärt, dass Sie interessiert sind. Normalerweise ändern Sie diese Datei nicht, sondern [`src/App.tsx`](#app-tsx) und die Dateien, die sie importiert.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importieren Sie den benötigten Bibliothekscode.

```tsx
import App from './App.tsx'
```

Importieren Sie die React-Komponente, die die Anwendung implementiert (siehe unten).

```tsx
import { config } from './wagmi.ts'
```

Importieren Sie die [wagmi](https://wagmi.sh/)-Konfiguration, die die Blockchain-Konfiguration enthält.

```tsx
const queryClient = new QueryClient()
```

Erstellt eine neue Instanz des Cache-Managers von [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Dieses Objekt speichert:

- Zwischengespeicherte RPC-Aufrufe
- Vertragslesevorgänge
- Status des erneuten Abrufens im Hintergrund

Wir benötigen den Cache-Manager, da wagmi v3 intern React Query verwendet.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Erstellen Sie die React-Stammkomponente. Der Parameter für `render` ist [JSX](https://www.w3schools.com/react/react_jsx.asp), eine Erweiterungssprache, die sowohl HTML als auch JavaScript/TypeScript verwendet. Das Ausrufezeichen hier sagt der TypeScript-Komponente: „Du weißt nicht, dass `document.getElementById('root')` ein gültiger Parameter für `ReactDOM.createRoot` sein wird, aber keine Sorge – ich bin der Entwickler und ich sage dir, dass es so sein wird“.

```tsx
  <React.StrictMode>
```

Die Anwendung wird in [eine `React.StrictMode`-Komponente](https://react.dev/reference/react/StrictMode) eingefügt. Diese Komponente weist die React-Bibliothek an, zusätzliche Debugging-Prüfungen einzufügen, was während der Entwicklung nützlich ist.

```tsx
    <WagmiProvider config={config}>
```

Die Anwendung befindet sich auch in [einer `WagmiProvider`-Komponente](https://wagmi.sh/react/api/WagmiProvider). [Die wagmi-Bibliothek (we are going to make it)](https://wagmi.sh/) verbindet die React-UI-Definitionen mit [der viem-Bibliothek](https://viem.sh/) zum Schreiben einer dezentralisierten Anwendung für Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

Fügen Sie schließlich einen React Query-Anbieter hinzu, damit jede Anwendungskomponente zwischengespeicherte Abfragen verwenden kann.

```tsx
        <App />
```

Jetzt können wir die Komponente für die Anwendung haben, die tatsächlich die Benutzeroberfläche implementiert. Das `/>` am Ende der Komponente teilt React mit, dass diese Komponente gemäß dem XML-Standard keine Definitionen in sich hat.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Natürlich müssen wir die anderen Komponenten schließen.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Importieren Sie die benötigten Bibliotheken sowie [die `Greeter`-Komponente](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Die Sepolia-Chain-ID.

```
function App() {
```

Dies ist der Standardweg, um eine React-Komponente zu erstellen: Definieren Sie eine Funktion, die aufgerufen wird, wann immer sie gerendert werden muss. Diese Funktion enthält typischerweise TypeScript- oder JavaScript-Code, gefolgt von einer `return`-Anweisung, die den JSX-Code zurückgibt.

```tsx
  const connection = useConnection()
```

Verwenden Sie [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection), um Informationen zur aktuellen Verbindung zu erhalten, wie z. B. die Adresse und die `chainId`.

Konventionsgemäß werden in React Funktionen, die `use...` heißen, als [Hooks](https://www.w3schools.com/react/react_hooks.asp) bezeichnet. Diese Funktionen geben nicht nur Daten an die Komponente zurück; sie stellen auch sicher, dass sie neu gerendert wird (die Komponentenfunktion wird erneut ausgeführt und ihre Ausgabe ersetzt die vorherige im HTML), wenn sich diese Daten ändern.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Verwenden Sie [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect), um Informationen über die Wallet-Verbindung zu erhalten.

```tsx
  const { disconnect } = useDisconnect()
```

[Dieser Hook](https://wagmi.sh/react/api/hooks/useDisconnect) gibt uns die Funktion, die Verbindung zum Wallet zu trennen.

```tsx
  const { switchChain } = useSwitchChain()
```

[Dieser Hook](https://wagmi.sh/react/api/hooks/useSwitchChain) lässt uns Chains wechseln.

```tsx
  useEffect(() => {
```

Der React-Hook [`useEffect`](https://react.dev/reference/react/useEffect) ermöglicht es Ihnen, eine Funktion auszuführen, wann immer sich der Wert einer Variablen ändert, um ein externes System zu synchronisieren.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Wenn wir verbunden sind, aber nicht mit der Sepolia-Blockchain, wechseln Sie zu Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Führen Sie die Funktion jedes Mal erneut aus, wenn sich entweder der Verbindungsstatus oder die `chainId` der Verbindung ändert.

```tsx
  return (
    <>
```

Das JSX einer React-Komponente _muss_ eine einzelne HTML-Komponente zurückgeben. Wenn wir mehrere Komponenten haben und keinen Container benötigen, um sie alle zu umschließen, verwenden wir eine leere Komponente (`<> ... </>`), um sie zu einer einzigen Komponente zu kombinieren.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

Stellen Sie Informationen über die aktuelle Verbindung bereit. Innerhalb von JSX bedeutet `{<expression>}`, dass der Ausdruck als JavaScript ausgewertet wird.

```tsx
      {connection.status === 'connected' && (
```

Die Syntax `{<condition> && <value>}` bedeutet: „Wenn die Bedingung `true` ist, werte zum Wert aus; wenn nicht, werte zu `false` aus“.

Dies ist der Standardweg, um if-Anweisungen in JSX einzufügen.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX folgt dem XML-Standard, der strenger ist als HTML. Wenn ein Tag kein entsprechendes End-Tag hat, _muss_ es am Ende einen Schrägstrich (`/`) haben, um es zu beenden.

Hier haben wir zwei solcher Tags, `<Greeter />` (das tatsächlich den HTML-Code enthält, der mit dem Vertrag kommuniziert) und [`<hr />` für eine horizontale Linie](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Wenn der Benutzer auf diese Schaltfläche klickt, rufen Sie die Funktion `disconnect` auf.

```tsx
      {connection.status !== 'connected' && (
```

Wenn wir _nicht_ verbunden sind, zeigen Sie die erforderlichen Optionen an, um eine Verbindung zum Wallet herzustellen.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

In `connectors` haben wir eine Liste von Konnektoren. Wir verwenden [`map`](https://www.w3schools.com/jsref/jsref_map.asp), um sie in eine Liste von JSX-Schaltflächen zur Anzeige umzuwandeln.

```tsx
            <button
              key={connector.uid}
```

In JSX ist es erforderlich, dass „Geschwister“-Tags (Tags, die vom selben übergeordneten Element abstammen) unterschiedliche Identifikatoren haben.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Die Konnektor-Schaltflächen.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Stellen Sie zusätzliche Informationen bereit. Die Ausdruckssyntax `<variable>?.<field>` teilt JavaScript mit, dass, wenn die Variable definiert ist, sie zu diesem Feld ausgewertet werden soll. Wenn die Variable nicht definiert ist, wird dieser Ausdruck zu `undefined` ausgewertet.

Der Ausdruck `error.message` würde, wenn kein Fehler vorliegt, eine Ausnahme auslösen. Die Verwendung von `error?.message` lässt uns dieses Problem vermeiden.

#### `src/Greeter.tsx` {#greeter-tsx}

Diese Datei enthält den Großteil der UI-Funktionalität. Sie enthält Definitionen, die sich normalerweise in mehreren Dateien befinden würden, aber da dies ein Tutorial ist, ist das Programm darauf optimiert, beim ersten Mal leicht verständlich zu sein, anstatt auf Leistung oder Wartungsfreundlichkeit.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Wir verwenden diese Bibliotheksfunktionen. Auch diese werden unten erklärt, wo sie verwendet werden.

```tsx
import { AddressType } from 'abitype'
```

[Die `abitype`-Bibliothek](https://abitype.dev/) stellt uns TypeScript-Definitionen für verschiedene Ethereum-Datentypen zur Verfügung, wie z. B. [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const // greeterABI
```

Die ABI für den `Greeter`-Vertrag.
Wenn Sie die Verträge und die Benutzeroberfläche gleichzeitig entwickeln, würden Sie sie normalerweise im selben Repository ablegen und die vom Solidity-Compiler generierte ABI als Datei in Ihrer Anwendung verwenden. Dies ist hier jedoch nicht erforderlich, da der Vertrag bereits entwickelt ist und sich nicht ändern wird.

Wir verwenden [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions), um TypeScript mitzuteilen, dass dies eine _echte_ Konstante ist. Normalerweise können Sie in JavaScript bei der Angabe von `const x = {"a": 1}` den Wert in `x` ändern, Sie können ihm nur nichts Neues zuweisen.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript ist streng typisiert. Wir verwenden diese Definition, um die Adresse anzugeben, an der der `Greeter`-Vertrag über verschiedene Chains hinweg bereitgestellt wird. Der Schlüssel ist eine Zahl (die `chainId`), und der Wert ist ein `AddressType` (eine Adresse).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Die Adresse des Vertrags auf [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### `Timer`-Komponente {#timer-component}

Die `Timer`-Komponente zeigt die Anzahl der Sekunden seit einer bestimmten Zeit an. Dies ist für die Benutzerfreundlichkeit wichtig. Wenn Benutzer etwas tun, erwarten sie eine sofortige Reaktion. Bei Blockchains ist dies oft unmöglich, da nichts passiert, bis eine Transaktion in einem Block platziert wird. Eine Lösung besteht darin, anzuzeigen, wie lange es her ist, seit der Benutzer die Aktion ausgeführt hat, damit der Benutzer entscheiden kann, ob die benötigte Zeit angemessen ist.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Die `Timer`-Komponente nimmt einen Parameter entgegen, `lastUpdate`, der die Zeit der letzten Aktion darstellt.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Wir müssen einen Zustand (eine an die Komponente gebundene Variable) haben und ihn aktualisieren, damit die Komponente korrekt funktioniert. Aber wir müssen ihn nie lesen, also machen wir uns nicht die Mühe, eine Variable zu erstellen.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Die Funktion [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) ermöglicht es uns, eine Funktion so zu planen, dass sie regelmäßig ausgeführt wird. In diesem Fall jede Sekunde. Die Funktion ruft `setNow` auf, um den Zustand zu aktualisieren, sodass die `Timer`-Komponente neu gerendert wird. Wir verpacken dies in [`useEffect`](https://react.dev/reference/react/useEffect) mit einer leeren Abhängigkeitsliste, damit es nur einmal passiert und nicht jedes Mal, wenn die Komponente gerendert wird.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Berechnen Sie die Anzahl der Sekunden seit der letzten Aktualisierung und geben Sie sie zurück.

##### `Greeter`-Komponente {#greeter-component}

```tsx
const Greeter = () => {
```

Schließlich können wir die Komponente definieren.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informationen über die Chain und das Konto, das wir verwenden, mit freundlicher Unterstützung von [wagmi](https://wagmi.sh/). Da dies ein Hook (`use...`) ist, wird die Komponente neu gerendert, wann immer sich diese Informationen ändern.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Die Adresse des Greeter-Vertrags, die `undefined` ist, wenn wir keine Chain-Informationen haben oder uns auf einer Chain ohne diesen Vertrag befinden.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Keine Argumente
  })
```

[Der `useReadContract`-Hook](https://wagmi.sh/react/api/hooks/useReadContract) ruft die `greet`-Funktion [des Vertrags](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) auf.

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

Der [`useState`-Hook](https://www.w3schools.com/react/react_usestate.asp) von React ermöglicht es uns, eine Zustandsvariable anzugeben, deren Wert von einem Rendering der Komponente zum nächsten erhalten bleibt. Der Anfangswert ist der Parameter, in diesem Fall die leere Zeichenfolge.

Der `useState`-Hook gibt eine Liste mit zwei Werten zurück:

1. Den aktuellen Wert der Zustandsvariablen.
2. Eine Funktion, um die Zustandsvariable bei Bedarf zu ändern. Da dies ein Hook ist, wird die Komponente bei jedem Aufruf erneut gerendert.

In diesem Fall verwenden wir eine Zustandsvariable für die neue Begrüßung, die der Benutzer festlegen möchte.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Wenn mehrere Benutzer denselben Vertrag gleichzeitig verwenden, könnten sie die Begrüßungen der anderen überschreiben. Dies würde für die Benutzer so aussehen, als ob die Anwendung nicht richtig funktioniert. Wenn die Anwendung anzeigt, wer die Begrüßung zuletzt festgelegt hat, weiß der Benutzer, dass es jemand anderes war und dass die Anwendung ordnungsgemäß funktioniert.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Benutzer sehen gerne, dass ihre Aktionen eine sofortige Wirkung haben. Auf einer Blockchain ist dies jedoch nicht der Fall. Diese Zustandsvariablen ermöglichen es uns, den Benutzern zumindest etwas anzuzeigen, damit sie wissen, dass ihre Aktion im Gange ist.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Wenn `readResults` oben die Daten ändert und sie nicht auf einen falschen Wert (z. B. `undefined`) gesetzt sind, aktualisieren Sie die aktuelle Begrüßung auf die von der Blockchain gelesene. Aktualisieren Sie außerdem den Status.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Hören Sie auf `SetGreeting`-Ereignisse.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` bedeutet, dass, wenn der Wert `false` ist oder ein Wert, der als falsch ausgewertet wird, wie `undefined`, `0` oder eine leere Zeichenfolge, der Ausdruck insgesamt `false` ist. Für jeden anderen Wert ist er `true`. Es ist eine Möglichkeit, Werte in Boolesche Werte umzuwandeln, denn wenn es keine `greeterAddr` gibt, möchten wir nicht auf Ereignisse hören.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Wenn wir Protokolle sehen (was passiert, wenn wir ein neues Ereignis sehen), bedeutet dies, dass die Begrüßung geändert wurde. In diesem Fall können wir `currentGreeting` und `lastSetterAddress` auf die neuen Werte aktualisieren. Außerdem möchten wir die Statusanzeige aktualisieren.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Wenn wir den Status aktualisieren, möchten wir zwei Dinge tun:

1. Die Statuszeichenfolge aktualisieren (`status`)
2. Die Zeit der letzten Statusaktualisierung (`statusTime`) auf jetzt aktualisieren.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Dies ist der Event-Handler für Änderungen am Eingabefeld für die neue Begrüßung. Wir könnten den Typ des Parameters `evt` angeben, aber TypeScript ist eine Sprache mit optionaler Typisierung. Da diese Funktion nur einmal in einem HTML-Event-Handler aufgerufen wird, halte ich dies nicht für erforderlich.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Die Funktion zum Schreiben in einen Vertrag. Sie ähnelt [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), ermöglicht aber bessere Statusaktualisierungen.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Dies ist der Prozess zum Einreichen einer Blockchain-Transaktion aus der Perspektive der Anwendung:

1. Senden Sie die Transaktion an einen Blockchain-Knoten in der Blockchain unter Verwendung von [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Warten Sie auf eine Antwort vom Blockchain-Knoten.
3. Wenn die Antwort empfangen wird, bitten Sie den Benutzer, die Transaktion über das Wallet zu signieren. Dieser Schritt _muss_ erfolgen, nachdem die Antwort des Blockchain-Knotens empfangen wurde, da dem Benutzer vor dem Signieren die Gaskosten der Transaktion angezeigt werden.
4. Warten Sie auf die Genehmigung des Benutzers.
5. Senden Sie die Transaktion erneut, diesmal unter Verwendung von [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Schritt 2 wird wahrscheinlich eine spürbare Zeit in Anspruch nehmen, in der sich Benutzer möglicherweise fragen, ob ihr Befehl von der Benutzeroberfläche empfangen wurde und warum sie noch nicht aufgefordert werden, die Transaktion zu signieren. Das führt zu einer schlechten Benutzererfahrung (UX).

Eine Lösung besteht darin, `eth_estimateGas` jedes Mal zu senden, wenn sich ein Parameter ändert. Wenn der Benutzer dann tatsächlich die Transaktion senden möchte (in diesem Fall durch Drücken von **Update greeting**), sind die Gaskosten bekannt und der Benutzer kann die Wallet-Seite sofort sehen.

```tsx
  return (
```

Jetzt können wir endlich das eigentliche HTML erstellen, das zurückgegeben werden soll.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Zeigen Sie die aktuelle Begrüßung an.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Wenn wir wissen, wer die Begrüßung zuletzt festgelegt hat, zeigen Sie diese Informationen an. `Greeter` verfolgt diese Informationen nicht, und wir möchten nicht nach `SetGreeting`-Ereignissen in der Vergangenheit suchen, daher erhalten wir sie nur, wenn die Begrüßung geändert wird, während wir ausgeführt werden.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Dies ist das Eingabetextfeld, in dem der Benutzer eine neue Begrüßung festlegen kann. Jedes Mal, wenn der Benutzer eine Taste drückt, rufen wir `greetingChange` auf, was `setNewGreeting` aufruft. Da `setNewGreeting` von `useState` stammt, wird die `Greeter`-Komponente neu gerendert. Das bedeutet, dass:

- Wir `value` angeben müssen, um den Wert der neuen Begrüßung beizubehalten, da er sonst auf den Standardwert, die leere Zeichenfolge, zurückgesetzt würde.
- `simulation` ebenfalls jedes Mal aktualisiert wird, wenn sich `newGreeting` ändert, was bedeutet, dass wir eine Simulation mit der korrekten Begrüßung erhalten. Dies könnte relevant sein, da die Gaskosten von der Größe der Aufrufdaten abhängen, die wiederum von der Länge der Zeichenfolge abhängen.

```tsx
      <button disabled={!simulation.data}
```

Aktivieren Sie die Schaltfläche erst, wenn wir die Informationen haben, die wir zum Senden der Transaktion benötigen.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Aktualisieren Sie den Status. An diesem Punkt muss der Benutzer im Wallet bestätigen.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` kehrt erst zurück, nachdem die Transaktion tatsächlich gesendet wurde. Dadurch können wir dem Benutzer anzeigen, wie lange die Transaktion darauf gewartet hat, in die Blockchain aufgenommen zu werden.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Zeigen Sie den Status an und wie lange es her ist, seit er aktualisiert wurde.

```
export {Greeter}
```

Exportieren Sie die Komponente.

#### `src/wagmi.ts` {#wagmi-ts}

Schließlich befinden sich verschiedene Definitionen im Zusammenhang mit wagmi in `src/wagmi.ts`. Ich werde hier nicht alles erklären, da das meiste davon Boilerplate ist, das Sie wahrscheinlich nicht ändern müssen.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Die wagmi-Konfiguration enthält die von dieser Anwendung unterstützten Chains. Sie können die [Liste der verfügbaren Chains](https://wagmi.sh/core/api/chains) einsehen.

```ts
  connectors: [
    injected(),
  ],
```

[Dieser Konnektor](https://wagmi.sh/core/api/connectors/injected) ermöglicht es uns, mit einem im Browser installierten Wallet zu kommunizieren.

```ts
  transports: {
    [sepolia.id]: http()
```

Der Standard-HTTP-Endpunkt, der mit Viem geliefert wird, ist gut genug. Wenn wir eine andere URL möchten, können wir `http("https:// hostname ")` oder `webSocket("wss:// hostname ")` verwenden.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Hinzufügen einer weiteren Blockchain {#add-blockchain}

Heutzutage gibt es viele [L2-Skalierungslösungen](https://ethereum.org/layer-2/), und Sie möchten vielleicht einige unterstützen, die viem noch nicht unterstützt. Dazu ändern Sie `src/wagmi.ts`. Diese Anweisungen erklären, wie Sie [Optimism Sepolia](https://chainlist.org/chain/11155420) hinzufügen.

1.  Bearbeiten Sie `src/wagmi.ts`

    A. Importieren Sie den Typ `defineChain` aus viem.

          ```ts
          import { defineChain } from 'viem'
```

    B. Fügen Sie die Netzwerkdefinition hinzu. Sie müssen dies für Optimism Sepolia nicht wirklich tun, [es ist bereits in `viem` enthalten](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), aber auf diese Weise lernen Sie, wie Sie eine Blockchain hinzufügen, die nicht in `viem` enthalten ist.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
```

    C. Fügen Sie die neue Chain zum Aufruf von `createConfig` hinzu.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
```

2.  Bearbeiten Sie `src/App.tsx`, um den automatischen Wechsel zu Sepolia auszukommentieren. Auf einem Produktionssystem würden Sie wahrscheinlich Schaltflächen mit Links zu jeder der von Ihnen unterstützten Blockchains anzeigen.

    ```ts
    /* useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId]) */
    








```

3.  Bearbeiten Sie `src/Greeter.tsx`, um sicherzustellen, dass die Anwendung die Adresse für Ihre Verträge im neuen Netzwerk kennt.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
```

4.  In Ihrem Browser.

    A. Navigieren Sie zu [ChainList](https://chainlist.org/chain/11155420?testnets=true) und klicken Sie auf eine der Schaltflächen auf der rechten Seite der Tabelle, um die Chain zu Ihrem Wallet hinzuzufügen.

    B. Klicken Sie in der Anwendung auf **Disconnect** (Trennen) und stellen Sie dann die Verbindung wieder her, um die Blockchain zu wechseln. Es gibt elegantere Möglichkeiten, dies zu handhaben, aber sie würden Änderungen an der Anwendung erfordern.

## Fazit {#conclusion}

Natürlich ist es Ihnen nicht wirklich wichtig, eine Benutzeroberfläche für `Greeter` bereitzustellen. Sie möchten eine Benutzeroberfläche für Ihre eigenen Verträge erstellen. Um Ihre eigene Anwendung zu erstellen, führen Sie diese Schritte aus:

1. Geben Sie an, dass eine wagmi-Anwendung erstellt werden soll.

   ```sh copy
   npm create wagmi
```

2. Geben Sie `y` ein, um fortzufahren.

3. Benennen Sie die Anwendung.

4. Wählen Sie das **React**-Framework aus.

5. Wählen Sie die **Vite**-Variante aus.

Gehen Sie nun hin und machen Sie Ihre Verträge für die weite Welt nutzbar.

[Sehen Sie hier für weitere meiner Arbeiten](https://cryptodocguy.pro/).