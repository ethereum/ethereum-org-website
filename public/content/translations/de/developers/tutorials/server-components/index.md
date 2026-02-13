---
title: "Server-Komponenten und Agenten für Web3-Apps"
description: "Nach dem Lesen dieses Tutorials können Sie TypeScript-Server schreiben, die auf Ereignisse auf einer Blockchain lauschen und entsprechend mit ihren eigenen Transaktionen reagieren. Dies ermöglicht es Ihnen, zentralisierte Anwendungen zu schreiben (da der Server ein Single Point of Failure ist), die jedoch mit Web3-Entitäten interagieren können. Die gleichen Techniken können auch verwendet werden, um einen Agenten zu schreiben, der auf On-Chain-Ereignisse ohne menschliches Eingreifen reagiert."

author: Ori Pomerantz
lang: de
tags: [ "Agent", "Server", "Off-Chain" ]
skill: beginner
published: 2024-07-15
---

## Einführung {#introduction}

In den meisten Fällen verwendet eine dezentralisierte App einen Server, um die Software zu verteilen, aber die eigentliche Interaktion findet zwischen dem Client (typischerweise einem Webbrowser) und der Blockchain statt.

![Normale Interaktion zwischen Webserver, Client und Blockchain](./fig-1.svg)

Es gibt jedoch einige Fälle, in denen eine Anwendung davon profitieren würde, eine unabhängig laufende Server-Komponente zu haben. Ein solcher Server wäre in der Lage, auf Ereignisse und auf Anfragen von anderen Quellen, wie z. B. einer API, zu reagieren, indem er Transaktionen ausstellt.

![Die Interaktion mit der Hinzufügung eines Servers](./fig-2.svg)

Es gibt mehrere mögliche Aufgaben, die ein solcher Server erfüllen könnte.

- Inhaber eines geheimen Zustands. Bei Spielen ist es oft nützlich, den Spielern nicht alle Informationen zur Verfügung zu stellen, die das Spiel kennt. Allerdings _gibt es keine Geheimnisse auf der Blockchain_, jede Information, die sich auf der Blockchain befindet, kann von jedem leicht herausgefunden werden. Wenn also ein Teil des Spielzustands geheim gehalten werden soll, muss er an anderer Stelle gespeichert werden (und die Auswirkungen dieses Zustands möglicherweise mit [Zero-Knowledge-Beweisen](/zero-knowledge-proofs) verifiziert werden).

- Zentralisiertes Orakel. Wenn die Einsätze ausreichend niedrig sind, kann ein externer Server, der einige Informationen online liest und sie dann in die Chain postet, ausreichend sein, um als [Orakel](/developers/docs/oracles/) verwendet zu werden.

- Agent. Auf der Blockchain passiert nichts ohne eine Transaktion, die es aktiviert. Ein Server kann im Namen eines Benutzers handeln, um Aktionen wie [Arbitrage](/developers/docs/mev/#mev-examples-dex-arbitrage) durchzuführen, wenn sich die Gelegenheit dazu bietet.

## Beispielprogramm {#sample-program}

Sie können einen Beispielserver [auf GitHub](https://github.com/qbzzt/20240715-server-component) sehen. Dieser Server lauscht auf Ereignisse, die von [diesem Vertrag](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) stammen, einer modifizierten Version des Greeters von Hardhat. Wenn die Begrüßung geändert wird, ändert er sie wieder zurück.

So führen Sie es aus:

1. Klonen Sie das Repository.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Installieren Sie die erforderlichen Pakete. Wenn Sie es noch nicht haben, [installieren Sie zuerst Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Bearbeiten Sie `.env`, um den privaten Schlüssel eines Kontos anzugeben, das ETH im Holesky-Testnet hat. Wenn Sie keine ETH auf Holesky haben, können Sie [diesen Faucet](https://holesky-faucet.pk910.de/) verwenden.

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Starten Sie den Server.

   ```sh copy
   npm start
   ```

5. Gehen Sie zu [einem Block-Explorer](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) und ändern Sie mit einer anderen Adresse als derjenigen, die den privaten Schlüssel hat, die Begrüßung. Sie werden sehen, dass die Begrüßung automatisch zurückgeändert wird.

### Wie funktioniert das? {#how-it-works}

Der einfachste Weg, um zu verstehen, wie man eine Server-Komponente schreibt, ist, das Beispiel Zeile für Zeile durchzugehen.

#### `src/app.ts` {#src-app-ts}

Der überwiegende Teil des Programms ist in [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) enthalten.

##### Erstellen der erforderlichen Objekte

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Dies sind die [Viem](https://viem.sh/)-Entitäten, die wir benötigen, Funktionen und [der `Address`-Typ](https://viem.sh/docs/glossary/types#address). Dieser Server ist in [TypeScript](https://www.typescriptlang.org/) geschrieben, einer Erweiterung von JavaScript, die es [stark typisiert](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Diese Funktion](https://viem.sh/docs/accounts/privateKey) ermöglicht es uns, die Wallet-Informationen, einschließlich der Adresse, zu generieren, die einem privaten Schlüssel entsprechen.

```typescript
import { holesky } from "viem/chains"
```

Um eine Blockchain in Viem zu verwenden, müssen Sie ihre Definition importieren. In diesem Fall wollen wir uns mit der [Holesky](https://github.com/eth-clients/holesky)-Test-Blockchain verbinden.

```typescript
// So fügen wir die Definitionen in .env zu process.env hinzu.
import * as dotenv from "dotenv"
dotenv.config()
```

So lesen wir `.env` in die Umgebung ein. Wir brauchen es für den privaten Schlüssel (siehe später).

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

Um einen Vertrag zu verwenden, benötigen wir seine Adresse und die [ABI](/glossary/#abi) dafür. Wir stellen hier beides zur Verfügung.

In JavaScript (und damit auch in TypeScript) kann man einer Konstante keinen neuen Wert zuweisen, aber man _kann_ das Objekt, das darin gespeichert ist, ändern. Durch die Verwendung des Suffixes `as const` teilen wir TypeScript mit, dass die Liste selbst konstant ist und nicht geändert werden darf.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Erstellen Sie einen [öffentlichen Client](https://viem.sh/docs/clients/public.html) von Viem. Öffentliche Clients haben keinen angehängten privaten Schlüssel und können daher keine Transaktionen senden. Sie können [`view`-Funktionen](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) aufrufen, Kontostände lesen usw.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Die Umgebungsvariablen sind in [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) verfügbar. TypeScript ist jedoch stark typisiert. Eine Umgebungsvariable kann eine beliebige Zeichenkette oder leer sein, daher ist der Typ für eine Umgebungsvariable `string | undefined`. Ein Schlüssel ist in Viem jedoch als `0x${string}` (`0x` gefolgt von einer Zeichenkette) definiert. Hier teilen wir TypeScript mit, dass die Umgebungsvariable `PRIVATE_KEY` von diesem Typ sein wird. Wenn dies nicht der Fall ist, erhalten wir einen Laufzeitfehler.

Die Funktion [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) verwendet dann diesen privaten Schlüssel, um ein vollständiges Kontoobjekt zu erstellen.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Als Nächstes verwenden wir das Kontoobjekt, um einen [Wallet-Client](https://viem.sh/docs/clients/wallet) zu erstellen. Dieser Client hat einen privaten Schlüssel und eine Adresse, sodass er zum Senden von Transaktionen verwendet werden kann.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Nachdem wir nun alle Voraussetzungen haben, können wir endlich eine [Vertragsinstanz](https://viem.sh/docs/contract/getContract) erstellen. Wir werden diese Vertragsinstanz verwenden, um mit dem On-Chain-Vertrag zu kommunizieren.

##### Lesen von der Blockchain

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Die Vertragsfunktionen, die schreibgeschützt sind ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) und [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), sind unter `read` verfügbar. In diesem Fall verwenden wir es für den Zugriff auf die Funktion [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), die die Begrüßung zurückgibt.

JavaScript ist single-threaded. Wenn wir also einen lang andauernden Prozess starten, müssen wir [angeben, dass wir dies asynchron tun](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Der Aufruf der Blockchain, selbst für einen schreibgeschützten Vorgang, erfordert einen Round-Trip zwischen dem Computer und einem Blockchain-Knoten. Das ist der Grund, warum wir hier angeben, dass der Code auf das Ergebnis `await` (warten) muss.

Wenn Sie daran interessiert sind, wie das funktioniert, können Sie [hier darüber lesen](https://www.w3schools.com/js/js_promise.asp), aber in der Praxis müssen Sie nur wissen, dass Sie auf die Ergebnisse `await` (warten), wenn Sie eine Operation starten, die lange dauert, und dass jede Funktion, die dies tut, als `async` deklariert werden muss.

##### Ausstellen von Transaktionen

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Dies ist die Funktion, die Sie aufrufen, um eine Transaktion auszustellen, die die Begrüßung ändert. Da dies eine langwierige Operation ist, ist die Funktion als `async` deklariert. Aufgrund der internen Implementierung muss jede `async`-Funktion ein `Promise`-Objekt zurückgeben. In diesem Fall bedeutet `Promise<any>`, dass wir nicht genau angeben, was in dem `Promise` zurückgegeben wird.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Das `write`-Feld der Vertragsinstanz hat alle Funktionen, die in den Blockchain-Zustand schreiben (diejenigen, die das Senden einer Transaktion erfordern), wie z. B. [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Die Parameter werden, falls vorhanden, als Liste bereitgestellt, und die Funktion gibt den Hash der Transaktion zurück.

```typescript
    console.log(`Arbeite an einer Korrektur, siehe https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Melden Sie den Hash der Transaktion (als Teil einer URL zum Block-Explorer, um ihn anzuzeigen) und geben Sie ihn zurück.

##### Reaktion auf Ereignisse

```typescript
greeter.watchEvent.SetGreeting({
```

[Die `watchEvent`-Funktion](https://viem.sh/docs/actions/public/watchEvent) lässt Sie festlegen, dass eine Funktion ausgeführt werden soll, wenn ein Ereignis ausgegeben wird. Wenn Sie sich nur für eine Art von Ereignis interessieren (in diesem Fall `SetGreeting`), können Sie diese Syntax verwenden, um sich auf diesen Ereignistyp zu beschränken.

```typescript
    onLogs: logs => {
```

Die `onLogs`-Funktion wird aufgerufen, wenn Protokolleinträge vorhanden sind. In Ethereum sind „Protokoll“ und „Ereignis“ in der Regel austauschbar.

```typescript
console.log(
  `Adresse ${logs[0].args.sender} hat die Begrüßung in ${logs[0].args.greeting} geändert`
)
```

Es könnte mehrere Ereignisse geben, aber der Einfachheit halber kümmern wir uns nur um das erste. `logs[0].args` sind die Argumente des Ereignisses, in diesem Fall `sender` und `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} besteht darauf, dass es Hallo! heißt`)
    }
})
```

Wenn der Absender _nicht_ dieser Server ist, verwenden Sie `setGreeting`, um die Begrüßung zu ändern.

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

Die Skripte sind verschiedene Aktionen der Anwendung. In diesem Fall haben wir nur `start`, was den Server kompiliert und dann ausführt. Der `tsc`-Befehl ist Teil des `typescript`-Pakets und kompiliert TypeScript in JavaScript. Wenn Sie es manuell ausführen möchten, befindet es sich in `node_modules/.bin`. Der zweite Befehl führt den Server aus.

```json
  "type": "module",
```

Es gibt mehrere Arten von JavaScript-Node-Anwendungen. Der `module`-Typ ermöglicht es uns, `await` im Code der obersten Ebene zu haben, was wichtig ist, wenn Sie langsame (und daher asynchrone) Operationen durchführen.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Dies sind Pakete, die nur für die Entwicklung benötigt werden. Hier benötigen wir `typescript`, und da wir es mit Node.js verwenden, erhalten wir auch die Typen für Node-Variablen und -Objekte, wie z. B. `process`. [Die `^<version>`-Notation](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) bedeutet diese Version oder eine höhere Version, die keine Breaking Changes enthält. Weitere Informationen zur Bedeutung von Versionsnummern finden Sie [hier](https://semver.org).

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Dies sind Pakete, die zur Laufzeit benötigt werden, wenn `dist/app.js` ausgeführt wird.

## Fazit {#conclusion}

Der zentralisierte Server, den wir hier erstellt haben, erfüllt seine Aufgabe, nämlich als Agent für einen Benutzer zu agieren. Jeder andere, der möchte, dass die Dapp weiterhin funktioniert, und bereit ist, das Gas auszugeben, kann eine neue Instanz des Servers mit seiner eigenen Adresse ausführen.

Dies funktioniert jedoch nur, wenn die Aktionen des zentralisierten Servers leicht überprüft werden können. Wenn der zentralisierte Server geheime Zustandsinformationen hat oder schwierige Berechnungen durchführt, ist er eine zentralisierte Entität, der Sie vertrauen müssen, um die Anwendung zu nutzen, was genau das ist, was Blockchains zu vermeiden versuchen. In einem zukünftigen Artikel plane ich zu zeigen, wie man [Zero-Knowledge-Beweise](/zero-knowledge-proofs) verwendet, um dieses Problem zu umgehen.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
