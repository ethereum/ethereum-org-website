---
title: "Serverkomponenten und Agenten für Web3-Apps"
description: "Nach dem Lesen dieses Tutorials wirst du in der Lage sein, TypeScript-Server zu schreiben, die auf Ereignisse auf einer Blockchain lauschen und entsprechend mit eigenen Transaktionen reagieren. Dies ermöglicht es dir, zentralisierte Anwendungen zu schreiben (da der Server ein Single Point of Failure ist), die jedoch mit Web3-Entitäten interagieren können. Dieselben Techniken können auch verwendet werden, um einen Agenten zu schreiben, der ohne menschliches Eingreifen auf On-Chain-Ereignisse reagiert."

author: Ori Pomerantz
lang: de
tags: ["Agent", "Server", "Off-Chain", "Dapps"]
skill: beginner
breadcrumb: Serverkomponenten
published: 2024-07-15
---

## Einführung {#introduction}

In den meisten Fällen verwendet eine dezentralisierte Anwendung einen Server, um die Software zu verteilen, aber die gesamte eigentliche Interaktion findet zwischen dem Client (typischerweise dem Webbrowser) und der Blockchain statt.

![Normale Interaktion zwischen Webserver, Client und Blockchain](./fig-1.svg)

Es gibt jedoch einige Fälle, in denen eine Anwendung von einer unabhängig laufenden Serverkomponente profitieren würde. Ein solcher Server wäre in der Lage, auf Ereignisse und auf Anfragen aus anderen Quellen, wie z. B. einer API, durch die Ausgabe von Transaktionen zu reagieren.

![Die Interaktion mit der Hinzufügung eines Servers](./fig-2.svg)

Es gibt mehrere mögliche Aufgaben, die ein solcher Server erfüllen könnte.

- Halter eines geheimen Zustands. Beim Gaming ist es oft nützlich, den Spielern nicht alle Informationen zugänglich zu machen, die das Spiel kennt. Jedoch _gibt es keine Geheimnisse auf der Blockchain_; jede Information, die sich auf der Blockchain befindet, ist für jeden leicht herauszufinden. Wenn also ein Teil des Spielzustands geheim gehalten werden soll, muss er woanders gespeichert werden (und die Auswirkungen dieses Zustands möglicherweise mithilfe von [Zero-Knowledge-Beweisen](/zero-knowledge-proofs) verifiziert werden).

- Zentralisiertes Orakel. Wenn die Einsätze niedrig genug sind, kann ein externer Server, der einige Informationen online liest und sie dann auf der Chain veröffentlicht, gut genug sein, um als [Orakel](/developers/docs/oracles/) verwendet zu werden.

- Agent. Nichts passiert auf der Blockchain ohne eine Transaktion, die es aktiviert. Ein Server kann im Namen eines Benutzers handeln, um Aktionen wie [Arbitrage](/developers/docs/mev/#mev-examples-dex-arbitrage) durchzuführen, wenn sich die Gelegenheit dazu bietet.

## Beispielprogramm {#sample-program}

Du kannst dir einen Beispielserver [auf GitHub](https://github.com/qbzzt/20240715-server-component) ansehen. Dieser Server lauscht auf Ereignisse, die von [diesem Vertrag](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) kommen, einer modifizierten Version von Hardhats Greeter. Wenn die Begrüßung geändert wird, ändert er sie wieder zurück.

Um ihn auszuführen:

1. Klone das Repository.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
```

2. Installiere die erforderlichen Pakete. Falls du es noch nicht hast, [installiere zuerst Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
```

3. Bearbeite die `.env`-Datei, um den Private-Key eines Kontos anzugeben, das ETH im Holesky-Testnet hat. Wenn du keine ETH auf Holesky hast, kannst du [dieses Faucet verwenden](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
```

4. Starte den Server.

   ```sh copy
   npm start
```

5. Gehe zu [einer Blocksuchmaschine](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) und ändere die Begrüßung unter Verwendung einer anderen Adresse als derjenigen, die den Private-Key besitzt. Du wirst sehen, dass die Begrüßung automatisch wieder zurückgeändert wird.

### Wie funktioniert das? {#how-it-works}

Der einfachste Weg zu verstehen, wie man eine Serverkomponente schreibt, ist, das Beispiel Zeile für Zeile durchzugehen.

#### `src/app.ts` {#src-app-ts}

Der weitaus größte Teil des Programms ist in [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) enthalten.

##### Erstellen der vorausgesetzten Objekte

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Dies sind die [Viem](https://viem.sh/)-Entitäten, die wir benötigen: Funktionen und [der `Address`-Typ](https://viem.sh/docs/glossary/types#address). Dieser Server ist in [TypeScript](https://www.typescriptlang.org/) geschrieben, einer Erweiterung von JavaScript, die es [streng typisiert](https://en.wikipedia.org/wiki/Strong_and_weak_typing) macht.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Diese Funktion](https://viem.sh/docs/accounts/privateKey) ermöglicht es uns, die Wallet-Informationen, einschließlich der Adresse, passend zu einem Private-Key zu generieren.

```typescript
import { holesky } from "viem/chains"
```

Um eine Blockchain in Viem zu verwenden, musst du deren Definition importieren. In diesem Fall möchten wir uns mit der [Holesky](https://github.com/eth-clients/holesky)-Test-Blockchain verbinden.

```typescript
// So fügen wir die Definitionen in .env zu process.env hinzu.
import * as dotenv from "dotenv"
dotenv.config()
```

So lesen wir `.env` in die Umgebung ein. Wir benötigen dies für den Private-Key (siehe später).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Um einen Vertrag zu nutzen, benötigen wir seine Adresse und die [ABI](/glossary/#abi) dafür. Wir stellen hier beides bereit.

In JavaScript (und somit auch in TypeScript) kann man einer Konstanten keinen neuen Wert zuweisen, aber man _kann_ das darin gespeicherte Objekt modifizieren. Durch die Verwendung des Suffixes `as const` teilen wir TypeScript mit, dass die Liste selbst konstant ist und nicht geändert werden darf.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Erstelle einen [Public Client](https://viem.sh/docs/clients/public.html) von Viem. Public Clients haben keinen angehängten Private-Key und können daher keine Transaktionen senden. Sie können [`view`-Funktionen](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) aufrufen, Kontostände lesen usw.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Die Umgebungsvariablen sind in [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) verfügbar. TypeScript ist jedoch streng typisiert. Eine Umgebungsvariable kann ein beliebiger String oder leer sein, daher ist der Typ für eine Umgebungsvariable `string | undefined`. Ein Schlüssel ist in Viem jedoch als `0x${string}` definiert (`0x` gefolgt von einem String). Hier teilen wir TypeScript mit, dass die Umgebungsvariable `PRIVATE_KEY` von diesem Typ sein wird. Wenn dies nicht der Fall ist, erhalten wir einen Laufzeitfehler.

Die Funktion [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) verwendet dann diesen Private-Key, um ein vollständiges Konto-Objekt zu erstellen.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Als Nächstes verwenden wir das Konto-Objekt, um einen [Wallet Client](https://viem.sh/docs/clients/wallet) zu erstellen. Dieser Client verfügt über einen Private-Key und eine Adresse, sodass er zum Senden von Transaktionen verwendet werden kann.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Da wir nun alle Voraussetzungen haben, können wir endlich eine [Vertragsinstanz](https://viem.sh/docs/contract/getContract) erstellen. Wir werden diese Vertragsinstanz verwenden, um mit dem On-Chain-Vertrag zu kommunizieren.

##### Lesen von der Blockchain

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Die Vertragsfunktionen, die nur lesend sind ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) und [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), sind unter `read` verfügbar. In diesem Fall verwenden wir es, um auf die Funktion [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) zuzugreifen, welche die Begrüßung zurückgibt.

JavaScript ist Single-Threaded. Wenn wir also einen lang andauernden Prozess anstoßen, müssen wir [angeben, dass wir dies asynchron tun](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Der Aufruf der Blockchain, selbst für eine reine Leseoperation, erfordert einen Roundtrip zwischen dem Computer und einem Blockchain-Knoten. Das ist der Grund, warum wir hier angeben, dass der Code auf das Ergebnis warten (`await`) muss.

Wenn du dich dafür interessierst, wie das funktioniert, kannst du [hier darüber lesen](https://www.w3schools.com/js/js_promise.asp). In der Praxis musst du jedoch nur wissen, dass du auf die Ergebnisse wartest (`await`), wenn du eine Operation startest, die lange dauert, und dass jede Funktion, die dies tut, als `async` deklariert werden muss.

##### Ausgeben von Transaktionen

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Dies ist die Funktion, die du aufrufst, um eine Transaktion auszugeben, welche die Begrüßung ändert. Da dies eine langwierige Operation ist, wird die Funktion als `async` deklariert. Aufgrund der internen Implementierung muss jede `async`-Funktion ein `Promise`-Objekt zurückgeben. In diesem Fall bedeutet `Promise<any>`, dass wir nicht genau spezifizieren, was im `Promise` zurückgegeben wird.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Das `write`-Feld der Vertragsinstanz enthält alle Funktionen, die in den Blockchain-Zustand schreiben (solche, die das Senden einer Transaktion erfordern), wie z. B. [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Die Parameter, falls vorhanden, werden als Liste bereitgestellt, und die Funktion gibt den Hash der Transaktion zurück.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Melde den Hash der Transaktion (als Teil einer URL zur Blocksuchmaschine, um ihn anzusehen) und gib ihn zurück.

##### Reagieren auf Ereignisse

```typescript
greeter.watchEvent.SetGreeting({
```

[Die Funktion `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) ermöglicht es dir anzugeben, dass eine Funktion ausgeführt werden soll, wenn ein Ereignis ausgelöst wird. Wenn du dich nur für einen bestimmten Ereignistyp interessierst (in diesem Fall `SetGreeting`), kannst du diese Syntax verwenden, um dich auf diesen Ereignistyp zu beschränken.

```typescript
    onLogs: logs => {
```

Die Funktion `onLogs` wird aufgerufen, wenn es Protokolleinträge (Logs) gibt. In Ethereum sind „Log“ und „Ereignis“ (Event) in der Regel austauschbar.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Es könnte mehrere Ereignisse geben, aber der Einfachheit halber kümmern wir uns nur um das erste. `logs[0].args` sind die Argumente des Ereignisses, in diesem Fall `sender` und `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Wenn der Absender _nicht_ dieser Server ist, verwende `setGreeting`, um die Begrüßung zu ändern.

#### `package.json` {#package-json}

[Diese Datei](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) steuert die [Node.js](https://nodejs.org/en)-Konfiguration. Dieser Artikel erklärt nur die wichtigen Definitionen.

```json
{
  "main": "dist/index.js",
```

Diese Definition gibt an, welche JavaScript-Datei ausgeführt werden soll.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Die Skripte sind verschiedene Anwendungsaktionen. In diesem Fall haben wir nur `start`, was den Server kompiliert und dann ausführt. Der Befehl `tsc` ist Teil des `typescript`-Pakets und kompiliert TypeScript zu JavaScript. Wenn du ihn manuell ausführen möchtest, befindet er sich in `node_modules/.bin`. Der zweite Befehl führt den Server aus.

```json
  "type": "module",
```

Es gibt mehrere Arten von JavaScript-Node-Anwendungen. Der Typ `module` ermöglicht es uns, `await` im Code auf oberster Ebene zu verwenden, was wichtig ist, wenn man langsame (und daher asynchrone) Operationen durchführt.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Dies sind Pakete, die nur für die Entwicklung benötigt werden. Hier brauchen wir `typescript`, und da wir es mit Node.js verwenden, holen wir uns auch die Typen für Node-Variablen und -Objekte, wie z. B. `process`. [Die Notation `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) bedeutet diese Version oder eine höhere Version, die keine Breaking Changes aufweist. Siehe [hier](https://semver.org) für weitere Informationen über die Bedeutung von Versionsnummern.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Dies sind Pakete, die zur Laufzeit benötigt werden, wenn `dist/app.js` ausgeführt wird.

## Fazit {#conclusion}

Der zentralisierte Server, den wir hier erstellt haben, erfüllt seine Aufgabe, nämlich als Agent für einen Benutzer zu fungieren. Jeder andere, der möchte, dass die Dapp weiterhin funktioniert, und bereit ist, das Gas auszugeben, kann eine neue Instanz des Servers mit seiner eigenen Adresse ausführen.

Dies funktioniert jedoch nur, wenn die Aktionen des zentralisierten Servers leicht verifiziert werden können. Wenn der zentralisierte Server geheime Zustandsinformationen hat oder schwierige Berechnungen durchführt, ist er eine zentralisierte Entität, der du vertrauen musst, um die Anwendung zu nutzen – was genau das ist, was Blockchains zu vermeiden versuchen. In einem zukünftigen Artikel plane ich zu zeigen, wie man [Zero-Knowledge-Beweise](/zero-knowledge-proofs) verwendet, um dieses Problem zu umgehen.

[Siehe hier für weitere meiner Arbeiten](https://cryptodocguy.pro/).