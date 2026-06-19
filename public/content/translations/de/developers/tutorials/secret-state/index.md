---
title: Verwendung von Zero-Knowledge für einen geheimen Zustand
description: Onchain-Spiele sind eingeschränkt, da sie keine verborgenen Informationen speichern können. Nach dem Lesen dieses Tutorials wird der Leser in der Lage sein, Zero-Knowledge-Beweise und Serverkomponenten zu kombinieren, um verifizierbare Spiele mit einem geheimen Zustand als offchain-Komponente zu erstellen. Die Technik dazu wird anhand der Erstellung eines Minesweeper-Spiels demonstriert.
author: Ori Pomerantz
tags: ["Server", "offchain", "zentralisiert", "Zero-Knowledge", "zokrates", "mud", "Datenschutz"]
skill: advanced
breadcrumb: Geheimer ZK-Zustand
lang: de
published: 2025-03-15
---

_Es gibt keine Geheimnisse auf der Blockchain_. Alles, was auf der Blockchain veröffentlicht wird, ist für jeden offen lesbar. Dies ist notwendig, da die Blockchain darauf basiert, dass jeder sie verifizieren kann. Spiele sind jedoch oft auf einen geheimen Zustand angewiesen. Zum Beispiel ergibt das Spiel [Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) absolut keinen Sinn, wenn man einfach auf einen Block-Explorer gehen und die Karte sehen kann.

Die einfachste Lösung besteht darin, eine [Serverkomponente](/developers/tutorials/server-components/) zu verwenden, um den geheimen Zustand zu speichern. Der Grund, warum wir die Blockchain nutzen, ist jedoch, Betrug durch den Spieleentwickler zu verhindern. Wir müssen die Ehrlichkeit der Serverkomponente sicherstellen. Der Server kann einen Hash des Zustands bereitstellen und [Zero-Knowledge-Beweise](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) verwenden, um zu beweisen, dass der Zustand, der zur Berechnung des Ergebnisses eines Zuges verwendet wurde, der richtige ist.

Nach dem Lesen dieses Artikels werden Sie wissen, wie man einen solchen Server, der einen geheimen Zustand hält, einen Client zur Anzeige des Zustands und eine onchain-Komponente für die Kommunikation zwischen den beiden erstellt. Die wichtigsten Werkzeuge, die wir verwenden werden, sind:

| Werkzeug                                      | Zweck                                                   | Verifiziert für Version |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Zero-Knowledge-Beweise und deren Verifizierung          |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Programmiersprache für den Server und den Client        |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Ausführen des Servers                                   |             20.18.2 |
| [Viem](https://viem.sh/)                      | Kommunikation mit der Blockchain                        |              2.9.20 |
| [MUD](https://mud.dev/)                       | Onchain-Datenverwaltung                                 |              2.0.12 |
| [React](https://react.dev/)                   | Client-Benutzeroberfläche                               |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Bereitstellen des Client-Codes                          |               4.2.1 |

## Minesweeper-Beispiel {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) ist ein Spiel, das eine geheime Karte mit einem Minenfeld enthält. Der Spieler wählt eine bestimmte Stelle aus, um dort zu graben. Wenn sich an dieser Stelle eine Mine befindet, ist das Spiel vorbei. Andernfalls erfährt der Spieler die Anzahl der Minen in den acht Feldern, die diese Stelle umgeben.

Diese Anwendung wurde mit [MUD](https://mud.dev/) geschrieben, einem Framework, das es uns ermöglicht, Daten onchain in einer [Schlüssel-Wert-Datenbank](https://aws.amazon.com/nosql/key-value/) zu speichern und diese Daten automatisch mit offchain-Komponenten zu synchronisieren. Neben der Synchronisierung macht es MUD einfach, Zugriffskontrollen bereitzustellen und es anderen Benutzern zu ermöglichen, unsere Anwendung erlaubnisfrei zu [erweitern](https://mud.dev/guides/extending-a-world).

### Ausführen des Minesweeper-Beispiels {#running-minesweeper-example}

Um das Minesweeper-Beispiel auszuführen:

1. Stellen Sie sicher, dass Sie [die Voraussetzungen installiert haben](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) und [`mprocs`](https://github.com/pvolok/mprocs).

2. Klonen Sie das Repository.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Installieren Sie die Pakete.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Wenn Foundry als Teil von `pnpm install` installiert wurde, müssen Sie die Kommandozeile neu starten.

4. Kompilieren Sie die Verträge

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Starten Sie das Programm (einschließlich einer [Anvil](https://book.getfoundry.sh/anvil/)-Blockchain) und warten Sie.

   ```sh copy
   mprocs
   ```

   Beachten Sie, dass der Startvorgang lange dauert. Um den Fortschritt zu sehen, verwenden Sie zunächst die Pfeiltaste nach unten, um zum Tab _contracts_ zu scrollen und zu sehen, wie die MUD-Verträge bereitgestellt werden. Wenn Sie die Nachricht _Waiting for file changes…_ erhalten, sind die Verträge bereitgestellt und der weitere Fortschritt findet im Tab _server_ statt. Dort warten Sie, bis Sie die Nachricht _Verifier address: 0x...._ erhalten.

   Wenn dieser Schritt erfolgreich ist, sehen Sie den `mprocs`-Bildschirm mit den verschiedenen Prozessen auf der linken Seite und der Konsolenausgabe für den aktuell ausgewählten Prozess auf der rechten Seite.

   ![The mprocs screen](./mprocs.png)

   Wenn es ein Problem mit `mprocs` gibt, können Sie die vier Prozesse manuell ausführen, jeden in seinem eigenen Kommandozeilenfenster:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Verträge** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. Nun können Sie zu [dem Client](http://localhost:3000) navigieren, auf **New Game** klicken und anfangen zu spielen.

### Tabellen {#tables}

Wir benötigen [mehrere Tabellen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Diese Tabelle ist ein Singleton, sie hat keinen Schlüssel und nur einen einzigen Datensatz. Sie wird verwendet, um Spielkonfigurationsinformationen zu speichern:
  - `height`: Die Höhe eines Minenfelds
  - `width`: Die Breite eines Minenfelds
  - `numberOfBombs`: Die Anzahl der Bomben in jedem Minenfeld
- `VerifierAddress`: Diese Tabelle ist ebenfalls ein Singleton. Sie wird verwendet, um einen Teil der Konfiguration zu speichern, nämlich die Adresse des Verifizierer-Vertrags (`verifier`). Wir hätten diese Informationen in die Tabelle `Configuration` aufnehmen können, aber sie wird von einer anderen Komponente, dem Server, festgelegt, sodass es einfacher ist, sie in einer separaten Tabelle abzulegen.

- `PlayerGame`: Der Schlüssel ist die Adresse des Spielers. Die Daten sind:

  - `gameId`: Ein 32-Byte-Wert, der der Hash der Karte ist, auf der der Spieler spielt (die Spielkennung).
  - `win`: Ein boolescher Wert, der angibt, ob der Spieler das Spiel gewonnen hat.
  - `lose`: Ein boolescher Wert, der angibt, ob der Spieler das Spiel verloren hat.
  - `digNumber`: Die Anzahl der erfolgreichen Grabungen im Spiel.

- `GamePlayer`: Diese Tabelle enthält die umgekehrte Zuordnung, von `gameId` zur Adresse des Spielers.

- `Map`: Der Schlüssel ist ein Tupel aus drei Werten:

  - `gameId`: Ein 32-Byte-Wert, der der Hash der Karte ist, auf der der Spieler spielt (die Spielkennung).
  - `x`-Koordinate
  - `y`-Koordinate

  Der Wert ist eine einzelne Zahl. Er ist 255, wenn eine Bombe entdeckt wurde. Andernfalls ist es die Anzahl der Bomben um diesen Ort herum plus eins. Wir können nicht einfach die Anzahl der Bomben verwenden, da standardmäßig der gesamte Speicher in der EVM und alle Zeilenwerte in MUD null sind. Wir müssen unterscheiden zwischen „der Spieler hat hier noch nicht gegraben“ und „der Spieler hat hier gegraben und festgestellt, dass es in der Umgebung null Bomben gibt“.

Darüber hinaus erfolgt die Kommunikation zwischen dem Client und dem Server über die onchain-Komponente. Dies wird ebenfalls mithilfe von Tabellen implementiert.

- `PendingGame`: Unbearbeitete Anfragen zum Starten eines neuen Spiels.
- `PendingDig`: Unbearbeitete Anfragen, an einer bestimmten Stelle in einem bestimmten Spiel zu graben. Dies ist eine [offchain-Tabelle](https://mud.dev/store/tables#types-of-tables), was bedeutet, dass sie nicht in den EVM-Speicher geschrieben wird, sondern nur offchain mithilfe von Ereignissen lesbar ist.

### Ausführungs- und Datenflüsse {#execution-data-flows}

Diese Flüsse koordinieren die Ausführung zwischen dem Client, der onchain-Komponente und dem Server.

#### Initialisierung {#initialization-flow}

Wenn Sie `mprocs` ausführen, passieren folgende Schritte:

1. [`mprocs`](https://github.com/pvolok/mprocs) führt vier Komponenten aus:

   - [Anvil](https://book.getfoundry.sh/anvil/), das eine lokale Blockchain ausführt
   - [Verträge](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), das die Verträge für MUD kompiliert (falls erforderlich) und bereitstellt
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), das [Vite](https://vitejs.dev/) ausführt, um die Benutzeroberfläche und den Client-Code für Webbrowser bereitzustellen.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), der die Serveraktionen ausführt

2. Das Paket `contracts` stellt die MUD-Verträge bereit und führt dann [das Skript `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) aus. Dieses Skript legt die Konfiguration fest. Der Code von GitHub spezifiziert [ein 10x5-Minenfeld mit acht Minen darin](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Der Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) beginnt mit der [Einrichtung von MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Dies aktiviert unter anderem die Datensynchronisierung, sodass eine Kopie der relevanten Tabellen im Speicher des Servers vorhanden ist.

4. Der Server abonniert eine Funktion, die ausgeführt wird, [wenn sich die Tabelle `Configuration` ändert](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Diese Funktion](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) wird aufgerufen, nachdem `PostDeploy.s.sol` ausgeführt wurde und die Tabelle modifiziert hat.

5. Wenn die Server-Initialisierungsfunktion die Konfiguration hat, [ruft sie `zkFunctions` auf](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35), um [den Zero-Knowledge-Teil des Servers](#using-zokrates-from-typescript) zu initialisieren. Dies kann erst geschehen, wenn wir die Konfiguration erhalten, da die Zero-Knowledge-Funktionen die Breite und Höhe des Minenfelds als Konstanten haben müssen.

6. Nachdem der Zero-Knowledge-Teil des Servers initialisiert wurde, besteht der nächste Schritt darin, [den Zero-Knowledge-Verifizierungsvertrag auf der Blockchain bereitzustellen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) und die Verifizierer-Adresse in MUD festzulegen.

7. Schließlich abonnieren wir Aktualisierungen, damit wir sehen, wenn ein Spieler anfordert, entweder [ein neues Spiel zu starten](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) oder [in einem bestehenden Spiel zu graben](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Neues Spiel {#new-game-flow}

Folgendes passiert, wenn der Spieler ein neues Spiel anfordert.

1. Wenn für diesen Spieler kein Spiel im Gange ist oder es eines gibt, aber mit einer gameId von null, zeigt der Client einen [Button für ein neues Spiel](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) an. Wenn der Benutzer diesen Button drückt, [führt React die Funktion `newGame` aus](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ist ein `System`-Aufruf. In MUD werden alle Aufrufe über den Vertrag `World` geleitet, und in den meisten Fällen rufen Sie `<namespace>__<function name>` auf. In diesem Fall geht der Aufruf an `app__newGame`, den MUD dann an [`newGame` in `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) weiterleitet.

3. Die onchain-Funktion überprüft, ob der Spieler kein laufendes Spiel hat, und wenn keines vorhanden ist, [fügt sie die Anfrage zur Tabelle `PendingGame` hinzu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Der Server erkennt die Änderung in `PendingGame` und [führt die abonnierte Funktion aus](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Diese Funktion ruft [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) auf, was wiederum [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) aufruft.

5. Das Erste, was `createGame` tut, ist [eine zufällige Karte mit der entsprechenden Anzahl von Minen zu erstellen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Dann ruft es [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) auf, um eine Karte mit leeren Rändern zu erstellen, was für Zokrates notwendig ist. Schließlich ruft `createGame` [`calculateMapHash`](#calculatemaphash) auf, um den Hash der Karte zu erhalten, der als Spiel-ID verwendet wird.

6. Die Funktion `newGame` fügt das neue Spiel zu `gamesInProgress` hinzu.

7. Das Letzte, was der Server tut, ist [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) aufzurufen, was onchain ist. Diese Funktion befindet sich in einem anderen `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), um die Zugriffskontrolle zu ermöglichen. Die Zugriffskontrolle ist in der [MUD-Konfigurationsdatei](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72), definiert.

   Die Zugriffsliste erlaubt nur einer einzigen Adresse, den `System` aufzurufen. Dies beschränkt den Zugriff auf die Serverfunktionen auf eine einzige Adresse, sodass sich niemand als Server ausgeben kann.

8. Die onchain-Komponente aktualisiert die relevanten Tabellen:

   - Erstellen des Spiels in `PlayerGame`.
   - Festlegen der umgekehrten Zuordnung in `GamePlayer`.
   - Entfernen der Anfrage aus `PendingGame`.

9. Der Server identifiziert die Änderung in `PendingGame`, unternimmt jedoch nichts, da [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) falsch ist.

10. Auf dem Client wird [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) auf den Eintrag `PlayerGame` für die Adresse des Spielers gesetzt. Wenn sich `PlayerGame` ändert, ändert sich auch `gameRecord`.

11. Wenn ein Wert in `gameRecord` vorhanden ist und das Spiel weder gewonnen noch verloren wurde, [zeigt der Client die Karte an](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Graben {#dig-flow}

1. Der Spieler [klickt auf den Button der Kartenzelle](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), was [die Funktion `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) aufruft. Diese Funktion ruft [`dig` onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) auf.

2. Die onchain-Komponente [führt eine Reihe von Plausibilitätsprüfungen durch](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) und fügt bei Erfolg die Grabanfrage zu [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) hinzu.

3. Der Server [erkennt die Änderung in `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Wenn sie gültig ist](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [ruft er den Zero-Knowledge-Code auf](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (unten erklärt), um sowohl das Ergebnis als auch einen Beweis für dessen Gültigkeit zu generieren.

4. [Der Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ruft [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain auf.

5. `digResponse` tut zwei Dinge. Zuerst überprüft es [den Zero-Knowledge-Beweis](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Wenn der Beweis dann gültig ist, ruft es [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) auf, um das Ergebnis tatsächlich zu verarbeiten.

6. `processDigResult` überprüft, ob das Spiel [verloren](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) oder [gewonnen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) wurde, und [aktualisiert `Map`, die onchain-Karte](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Der Client übernimmt die Aktualisierungen automatisch und [aktualisiert die dem Spieler angezeigte Karte](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) und teilt dem Spieler gegebenenfalls mit, ob es sich um einen Sieg oder eine Niederlage handelt.

## Verwendung von Zokrates {#using-zokrates}

In den oben erklärten Abläufen haben wir die Zero-Knowledge-Teile übersprungen und sie als Blackbox behandelt. Lassen Sie uns diese nun öffnen und sehen, wie dieser Code geschrieben ist.

### Hashing der Karte {#hashing-map}

Wir können [diesen JavaScript-Code](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) verwenden, um [Poseidon](https://www.poseidon-hash.info) zu implementieren, die von uns verwendete Zokrates-Hashfunktion. Obwohl dies schneller wäre, wäre es auch komplizierter, als einfach die Zokrates-Hashfunktion dafür zu verwenden. Dies ist ein Tutorial, daher ist der Code auf Einfachheit und nicht auf Leistung optimiert. Deshalb benötigen wir zwei verschiedene Zokrates-Programme: eines, um nur den Hash einer Karte zu berechnen (`hash`), und eines, um tatsächlich einen Zero-Knowledge-Beweis für das Ergebnis der Grabung an einem Ort auf der Karte zu erstellen (`dig`).

### Die Hashfunktion {#hash-function}

Dies ist die Funktion, die den Hash einer Karte berechnet. Wir werden diesen Code Zeile für Zeile durchgehen.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Diese beiden Zeilen importieren zwei Funktionen aus der [Zokrates-Standardbibliothek](https://zokrates.github.io/toolbox/stdlib.html). [Die erste Funktion](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ist ein [Poseidon-Hash](https://www.poseidon-hash.info/). Sie nimmt ein Array von [`field`-Elementen](https://zokrates.github.io/language/types.html#field) entgegen und gibt ein `field` zurück.

Das Feldelement in Zokrates ist typischerweise weniger als 256 Bit lang, aber nicht viel. Um den Code zu vereinfachen, beschränken wir die Karte auf bis zu 512 Bit und hashen ein Array von vier Feldern, wobei wir in jedem Feld nur 128 Bit verwenden. [Die Funktion `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) wandelt zu diesem Zweck ein Array von 128 Bit in ein `field` um.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Diese Zeile beginnt eine Funktionsdefinition. `hashMap` erhält einen einzigen Parameter namens `map`, ein zweidimensionales `bool`(ean)-Array. Die Größe der Karte beträgt `width+2` mal `height+2` aus Gründen, die [unten erklärt werden](#why-map-border).

Wir können `${width+2}` und `${height+2}` verwenden, da die Zokrates-Programme in dieser Anwendung als [Template-Strings](https://www.w3schools.com/js/js_string_templates.asp) gespeichert sind. Code zwischen `${` und `}` wird von JavaScript ausgewertet, und auf diese Weise kann das Programm für verschiedene Kartengrößen verwendet werden. Der Kartenparameter hat rundherum einen Rand von der Breite eines Feldes ohne Bomben, weshalb wir zwei zur Breite und Höhe addieren müssen.

Der Rückgabewert ist ein `field`, das den Hash enthält.

```
bool[512] mut map1d = [false; 512];
```

Die Karte ist zweidimensional. Die Funktion `pack128` funktioniert jedoch nicht mit zweidimensionalen Arrays. Daher flachen wir die Karte zunächst mit `map1d` zu einem 512-Byte-Array ab. Standardmäßig sind Zokrates-Variablen Konstanten, aber wir müssen diesem Array in einer Schleife Werte zuweisen, also definieren wir es als [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Wir müssen das Array initialisieren, da Zokrates kein `undefined` hat. Der Ausdruck `[false; 512]` bedeutet [ein Array von 512 `false`-Werten](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Wir benötigen auch einen Zähler, um zwischen den Bits zu unterscheiden, die wir bereits in `map1d` gefüllt haben, und denen, die wir noch nicht gefüllt haben.

```
for u32 x in 0..${width+2} {
```

So deklarieren Sie eine [`for`-Schleife](https://zokrates.github.io/language/control_flow.html#for-loops) in Zokrates. Eine Zokrates-`for`-Schleife muss feste Grenzen haben, denn obwohl sie wie eine Schleife aussieht, "entrollt" der Compiler sie tatsächlich. Der Ausdruck `${width+2}` ist eine Konstante zur Kompilierzeit, da `width` vom TypeScript-Code festgelegt wird, bevor er den Compiler aufruft.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Fügen Sie für jeden Ort auf der Karte diesen Wert in das `map1d`-Array ein und erhöhen Sie den Zähler.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Das `pack128` erstellt ein Array von vier `field`-Werten aus `map1d`. In Zokrates bedeutet `array[a..b]` den Abschnitt des Arrays, der bei `a` beginnt und bei `b-1` endet.

```
return poseidon(hashMe);
}
```

Verwenden Sie `poseidon`, um dieses Array in einen Hash umzuwandeln.

### Das Hash-Programm {#hash-program}

Der Server muss `hashMap` direkt aufrufen, um Spielkennungen zu erstellen. Zokrates kann jedoch nur die Funktion `main` in einem Programm aufrufen, um zu starten, also erstellen wir ein Programm mit einer `main`, die die Hashfunktion aufruft.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Das Grabungsprogramm {#dig-program}

Dies ist das Herzstück des Zero-Knowledge-Teils der Anwendung, in dem wir die Beweise erstellen, die zur Verifizierung der Grabungsergebnisse verwendet werden.

```
${hashFragment}

// Die Anzahl der Minen am Ort (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Warum ein Kartenrand {#why-map-border}

Zero-Knowledge-Beweise verwenden [arithmetische Schaltkreise](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), die kein einfaches Äquivalent zu einer `if`-Anweisung haben. Stattdessen verwenden sie das Äquivalent des [bedingten Operators](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Wenn `a` entweder null oder eins sein kann, können Sie `if a { b } else { c }` als `ab+(1-a)c` berechnen.

Aus diesem Grund wertet eine Zokrates-`if`-Anweisung immer beide Zweige aus. Wenn Sie beispielsweise diesen Code haben:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Er wird einen Fehler ausgeben, da er `arr[10]` berechnen muss, obwohl dieser Wert später mit null multipliziert wird.

Dies ist der Grund, warum wir rund um die Karte einen Rand von der Breite eines Feldes benötigen. Wir müssen die Gesamtzahl der Minen um einen Ort herum berechnen, und das bedeutet, dass wir den Ort eine Reihe darüber und darunter, links und rechts von dem Ort sehen müssen, an dem wir graben. Das bedeutet, dass diese Orte in dem Karten-Array existieren müssen, das Zokrates zur Verfügung gestellt wird.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Standardmäßig enthalten Zokrates-Beweise ihre Eingaben. Es nützt nichts zu wissen, dass es fünf Minen um eine Stelle herum gibt, es sei denn, Sie wissen tatsächlich, um welche Stelle es sich handelt (und Sie können sie nicht einfach mit Ihrer Anfrage abgleichen, da der Beweiser dann andere Werte verwenden und Ihnen nichts davon erzählen könnte). Wir müssen die Karte jedoch geheim halten, während wir sie Zokrates zur Verfügung stellen. Die Lösung besteht darin, einen `private`-Parameter zu verwenden, der durch den Beweis _nicht_ offengelegt wird.

Dies eröffnet eine weitere Möglichkeit für Missbrauch. Der Beweiser könnte die korrekten Koordinaten verwenden, aber eine Karte mit einer beliebigen Anzahl von Minen um den Ort herum und möglicherweise am Ort selbst erstellen. Um diesen Missbrauch zu verhindern, lassen wir den Zero-Knowledge-Beweis den Hash der Karte einschließen, der die Spielkennung ist.

```
return (hashMap(map),
```

Der Rückgabewert hier ist ein Tupel, das sowohl das Karten-Hash-Array als auch das Grabungsergebnis enthält.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Wir verwenden 255 als speziellen Wert für den Fall, dass der Ort selbst eine Bombe hat.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Wenn der Spieler keine Mine getroffen hat, addieren Sie die Minenanzahl für den Bereich um den Ort und geben Sie diese zurück.

### Verwendung von Zokrates aus TypeScript {#using-zokrates-from-typescript}

Zokrates verfügt über eine Befehlszeilenschnittstelle, aber in diesem Programm verwenden wir es im [TypeScript-Code](https://zokrates.github.io/toolbox/zokrates_js.html).

Die Bibliothek, die die Zokrates-Definitionen enthält, heißt [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importieren Sie die [Zokrates-JavaScript-Bindings](https://zokrates.github.io/toolbox/zokrates_js.html). Wir benötigen nur die Funktion [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), da sie ein Promise zurückgibt, das in alle Zokrates-Definitionen aufgelöst wird.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Ähnlich wie bei Zokrates selbst exportieren wir auch nur eine Funktion, die ebenfalls [asynchron](https://www.w3schools.com/js/js_async.asp) ist. Wenn sie schließlich zurückkehrt, stellt sie mehrere Funktionen bereit, wie wir unten sehen werden.

```typescript
const zokrates = await zokratesInitialize()
```

Initialisieren Sie Zokrates und holen Sie alles, was wir benötigen, aus der Bibliothek.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Als Nächstes haben wir die Hashfunktion und zwei Zokrates-Programme, die wir oben gesehen haben.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Hier kompilieren wir diese Programme.

```typescript
// Erstelle die Schlüssel für die Zero-Knowledge-Verifizierung.
// In einem Produktionssystem sollten Sie eine Setup-Zeremonie verwenden.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Auf einem Produktionssystem würden wir vielleicht eine kompliziertere [Setup-Zeremonie](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) verwenden, aber für eine Demonstration ist dies gut genug. Es ist kein Problem, dass die Benutzer den Beweiser-Schlüssel kennen können – sie können ihn trotzdem nicht verwenden, um Dinge zu beweisen, es sei denn, sie sind wahr. Da wir die Entropie (den zweiten Parameter, `""`) angeben, werden die Ergebnisse immer gleich sein.

**Hinweis:** Die Kompilierung von Zokrates-Programmen und die Schlüsselerstellung sind langsame Prozesse. Es ist nicht nötig, sie jedes Mal zu wiederholen, sondern nur, wenn sich die Kartengröße ändert. Auf einem Produktionssystem würden Sie sie einmal durchführen und dann die Ausgabe speichern. Der einzige Grund, warum ich das hier nicht tue, ist der Einfachheit halber.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

Die Funktion [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) führt das Zokrates-Programm tatsächlich aus. Sie gibt eine Struktur mit zwei Feldern zurück: `output`, was die Ausgabe des Programms als JSON-String ist, und `witness`, was die Informationen sind, die benötigt werden, um einen Zero-Knowledge-Beweis für das Ergebnis zu erstellen. Hier benötigen wir nur die Ausgabe.

Die Ausgabe ist ein String der Form `"31337"`, eine in Anführungszeichen eingeschlossene Dezimalzahl. Aber die Ausgabe, die wir für `viem` benötigen, ist eine Hexadezimalzahl der Form `0x60A7`. Also verwenden wir `.slice(1,-1)`, um die Anführungszeichen zu entfernen, und dann `BigInt`, um den verbleibenden String, der eine Dezimalzahl ist, in ein [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) umzuwandeln. `.toString(16)` konvertiert dieses `BigInt` in einen hexadezimalen String, und `"0x"+` fügt die Markierung für Hexadezimalzahlen hinzu.

```typescript
// Grabe und gib einen Zero-Knowledge-Beweis des Ergebnisses zurück
// (serverseitiger Code)
```

Der Zero-Knowledge-Beweis enthält die öffentlichen Eingaben (`x` und `y`) und Ergebnisse (Hash der Karte und Anzahl der Bomben).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Es ist ein Problem, in Zokrates zu überprüfen, ob ein Index außerhalb der Grenzen liegt, also tun wir es hier.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Führen Sie das Grabungsprogramm aus.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Verwenden Sie [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) und geben Sie den Beweis zurück.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Ein Solidity-Verifizierer, ein Smart Contract, den wir auf der Blockchain bereitstellen und verwenden können, um von `digCompiled.program` generierte Beweise zu verifizieren.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Geben Sie schließlich alles zurück, was anderer Code benötigen könnte.

## Sicherheitstests {#security-tests}

Sicherheitstests sind wichtig, da sich ein Funktionsfehler irgendwann von selbst zeigt. Wenn die Anwendung jedoch unsicher ist, bleibt dies wahrscheinlich lange Zeit verborgen, bevor es dadurch aufgedeckt wird, dass jemand betrügt und mit Ressourcen davonkommt, die anderen gehören.

### Berechtigungen {#permissions}

Es gibt in diesem Spiel eine privilegierte Entität: den Server. Er ist der einzige Benutzer, der die Funktionen in [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) aufrufen darf. Wir können [`cast`](https://book.getfoundry.sh/cast/) verwenden, um zu überprüfen, ob Aufrufe von erlaubnispflichtigen Funktionen nur über das Server-Konto zulässig sind.

[Der private Schlüssel des Servers befindet sich in `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Richte auf dem Computer, auf dem `anvil` (die Blockchain) ausgeführt wird, diese Umgebungsvariablen ein.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Verwende `cast`, um zu versuchen, die Verifizierer-Adresse als eine nicht autorisierte Adresse festzulegen.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Nicht nur meldet `cast` einen Fehler, sondern du kannst auch die **MUD Dev Tools** im Spiel im Browser öffnen, auf **Tables** klicken und **app\_\_VerifierAddress** auswählen. Du wirst sehen, dass die Adresse nicht null ist.

3. Lege die Verifizierer-Adresse als die Adresse des Servers fest.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Die Adresse in **app\_\_VerifiedAddress** sollte nun null sein.

Alle MUD-Funktionen im selben `System` durchlaufen dieselbe Zugriffskontrolle, daher halte ich diesen Test für ausreichend. Falls nicht, kannst du die anderen Funktionen in [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) überprüfen.

### Zero-Knowledge-Missbrauch {#zero-knowledge-abuses}

Die Mathematik zur Verifizierung von Zokrates sprengt den Rahmen dieses Tutorials (und meine Fähigkeiten). Wir können jedoch verschiedene Überprüfungen am Zero-Knowledge-Code durchführen, um sicherzustellen, dass er fehlschlägt, wenn er nicht korrekt ausgeführt wird. Für all diese Tests müssen wir [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) ändern und die gesamte Anwendung neu starten. Es reicht nicht aus, den Serverprozess neu zu starten, da dies die Anwendung in einen unmöglichen Zustand versetzt (der Spieler hat ein laufendes Spiel, aber das Spiel ist für den Server nicht mehr verfügbar).

#### Falsche Antwort {#wrong-answer}

Die einfachste Möglichkeit besteht darin, im Zero-Knowledge-Beweis die falsche Antwort anzugeben. Dazu gehen wir in `zkDig` und [ändern Zeile 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Das bedeutet, dass wir immer behaupten werden, es gäbe eine Bombe, unabhängig von der richtigen Antwort. Versuche, mit dieser Version zu spielen, und du wirst im Tab **server** des Bildschirms `pnpm dev` diesen Fehler sehen:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Diese Art von Betrug schlägt also fehl.

#### Falscher Beweis {#wrong-proof}

Was passiert, wenn wir die richtigen Informationen bereitstellen, aber einfach die falschen Beweisdaten haben? Ersetze nun Zeile 91 durch:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Es schlägt immer noch fehl, aber jetzt ohne Angabe von Gründen, da es während des Verifizierer-Aufrufs passiert.

### Wie kann ein Benutzer den Zero-Trust-Code verifizieren? {#user-verify-zero-trust}

Smart Contracts sind relativ einfach zu verifizieren. Normalerweise veröffentlicht der Entwickler den Quellcode in einem Block-Explorer, und der Block-Explorer verifiziert, dass der Quellcode zu dem Code in der [Transaktion zur Vertragsbereitstellung](/developers/docs/smart-contracts/deploying/) kompiliert wird. Im Fall von MUD-`System`s ist dies [etwas komplizierter](https://mud.dev/cli/verify), aber nicht viel.

Bei Zero-Knowledge ist dies schwieriger. Der Verifizierer enthält einige Konstanten und führt Berechnungen mit ihnen durch. Das sagt dir nicht, was bewiesen wird.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Die Lösung besteht – zumindest bis Block-Explorer dazu kommen, die Zokrates-Verifizierung in ihre Benutzeroberflächen aufzunehmen – darin, dass die Anwendungsentwickler die Zokrates-Programme zur Verfügung stellen und zumindest einige Benutzer sie selbst mit dem entsprechenden Verifizierungsschlüssel kompilieren.

Um dies zu tun:

1. [Installiere Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Erstelle eine Datei, `dig.zok`, mit dem Zokrates-Programm. Der folgende Code geht davon aus, dass du die ursprüngliche Kartengröße von 10x5 beibehalten hast.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Die Anzahl der Minen an der Position (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Kompiliere den Zokrates-Code und erstelle den Verifizierungsschlüssel. Der Verifizierungsschlüssel muss mit derselben Entropie erstellt werden, die im ursprünglichen Server verwendet wurde, [in diesem Fall eine leere Zeichenfolge](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Erstelle den Solidity-Verifizierer selbst und verifiziere, dass er funktional identisch mit dem auf der Blockchain ist (der Server fügt einen Kommentar hinzu, aber das ist nicht wichtig).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Designentscheidungen {#design}

In jeder ausreichend komplexen Anwendung gibt es konkurrierende Designziele, die Kompromisse erfordern. Schauen wir uns einige dieser Kompromisse an und warum die aktuelle Lösung anderen Optionen vorzuziehen ist.

### Warum Zero-Knowledge {#why-zero-knowledge}

Für Minesweeper benötigt man eigentlich kein Zero-Knowledge. Der Server kann die Karte immer speichern und sie dann einfach komplett aufdecken, wenn das Spiel vorbei ist. Am Ende des Spiels kann der Smart Contract dann den Karten-Hash berechnen, überprüfen, ob er übereinstimmt, und falls nicht, den Server bestrafen oder das Spiel komplett ignorieren.

Ich habe diese einfachere Lösung nicht verwendet, da sie nur für kurze Spiele mit einem klar definierten Endzustand funktioniert. Wenn ein Spiel potenziell unendlich ist (wie es bei [autonomen Welten](https://0xparc.org/blog/autonomous-worlds) der Fall ist), benötigt man eine Lösung, die den Zustand beweist, _ohne_ ihn preiszugeben.

Als Tutorial benötigte dieser Artikel ein kurzes Spiel, das leicht zu verstehen ist, aber diese Technik ist am nützlichsten für längere Spiele.

### Warum Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) ist nicht die einzige verfügbare Zero-Knowledge-Bibliothek, aber es ähnelt einer normalen, [imperativen](https://en.wikipedia.org/wiki/Imperative_programming) Programmiersprache und unterstützt boolesche Variablen.

Für Ihre Anwendung mit anderen Anforderungen ziehen Sie es vielleicht vor, [Circum](https://docs.circom.io/getting-started/installation/) oder [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) zu verwenden.

### Wann Zokrates kompiliert werden sollte {#when-compile-zokrates}

In diesem Programm kompilieren wir die Zokrates-Programme [jedes Mal, wenn der Server startet](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Das ist eindeutig eine Ressourcenverschwendung, aber dies ist ein Tutorial, das auf Einfachheit optimiert ist.

Wenn ich eine Anwendung für den produktiven Einsatz schreiben würde, würde ich prüfen, ob ich eine Datei mit den kompilierten Zokrates-Programmen für diese Minenfeldgröße habe, und wenn ja, diese verwenden. Das Gleiche gilt für die Bereitstellung eines Verifizierer-Vertrags onchain.

### Erstellen der Verifizierer- und Beweiser-Schlüssel {#key-creation}

Die [Schlüsselerstellung](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ist eine weitere reine Berechnung, die für eine bestimmte Minenfeldgröße nicht mehr als einmal durchgeführt werden muss. Auch hier wird sie der Einfachheit halber nur einmal durchgeführt.

Zusätzlich könnten wir [eine Setup-Zeremonie](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) verwenden. Der Vorteil einer Setup-Zeremonie ist, dass man entweder die Entropie oder ein Zwischenergebnis von jedem Teilnehmer benötigt, um beim Zero-Knowledge-Beweis zu betrügen. Wenn mindestens ein Teilnehmer der Zeremonie ehrlich ist und diese Informationen löscht, sind die Zero-Knowledge-Beweise vor bestimmten Angriffen sicher. Es gibt jedoch _keinen Mechanismus_, um zu überprüfen, ob die Informationen überall gelöscht wurden. Wenn Zero-Knowledge-Beweise von entscheidender Bedeutung sind, sollten Sie an der Setup-Zeremonie teilnehmen.

Hier verlassen wir uns auf [Perpetual Powers of Tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), an dem Dutzende von Teilnehmern mitgewirkt haben. Es ist wahrscheinlich sicher genug und viel einfacher. Wir fügen während der Schlüsselerstellung auch keine Entropie hinzu, was es den Benutzern erleichtert, [die Zero-Knowledge-Konfiguration zu überprüfen](#user-verify-zero-trust).

### Wo verifiziert werden soll {#where-verification}

Wir können die Zero-Knowledge-Beweise entweder onchain (was Gas kostet) oder im Client (mit [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)) verifizieren. Ich habe mich für Ersteres entschieden, da man so [den Verifizierer verifizieren](#user-verify-zero-trust) kann und dann darauf vertrauen kann, dass er sich nicht ändert, solange die Vertragsadresse dafür gleich bleibt. Wenn die Verifizierung auf dem Client durchgeführt würde, müssten Sie den Code, den Sie erhalten, jedes Mal verifizieren, wenn Sie den Client herunterladen.

Außerdem ist dieses Spiel zwar ein Einzelspieler-Spiel, aber viele Blockchain-Spiele sind Mehrspieler-Spiele. Eine Onchain-Verifizierung bedeutet, dass Sie den Zero-Knowledge-Beweis nur einmal verifizieren. Wenn dies im Client geschieht, müsste jeder Client unabhängig verifizieren.

### Die Karte in TypeScript oder Zokrates abflachen? {#where-flatten}

Im Allgemeinen ist es besser, wenn die Verarbeitung entweder in TypeScript oder in Zokrates erfolgen kann, sie in TypeScript durchzuführen, was viel schneller ist und keine Zero-Knowledge-Beweise erfordert. Das ist zum Beispiel der Grund, warum wir Zokrates nicht den Hash zur Verfügung stellen und ihn überprüfen lassen, ob er korrekt ist. Das Hashing muss innerhalb von Zokrates erfolgen, aber der Abgleich zwischen dem zurückgegebenen Hash und dem Hash onchain kann außerhalb stattfinden.

Dennoch [flachen wir die Karte in Zokrates ab](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), obwohl wir es in TypeScript hätten tun können. Der Grund dafür ist, dass die anderen Optionen meiner Meinung nach schlechter sind.

- Dem Zokrates-Code ein eindimensionales Array von Booleschen Werten zur Verfügung stellen und einen Ausdruck wie `x*(height+2)
+y` verwenden, um die zweidimensionale Karte zu erhalten. Dies würde [den Code](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) etwas komplizierter machen, also habe ich entschieden, dass der Leistungsgewinn für ein Tutorial nicht lohnenswert ist.

- Zokrates sowohl das eindimensionale als auch das zweidimensionale Array senden. Diese Lösung bringt uns jedoch nichts. Der Zokrates-Code müsste überprüfen, ob das bereitgestellte eindimensionale Array wirklich die korrekte Darstellung des zweidimensionalen Arrays ist. Es gäbe also keinen Leistungsgewinn.

- Das zweidimensionale Array in Zokrates abflachen. Dies ist die einfachste Option, also habe ich sie gewählt.

### Wo Karten gespeichert werden sollen {#where-store-maps}

In dieser Anwendung ist [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) einfach eine Variable im Speicher. Das bedeutet, dass alle gespeicherten Informationen verloren gehen, wenn Ihr Server abstürzt und neu gestartet werden muss. Die Spieler können nicht nur ihr Spiel nicht fortsetzen, sie können nicht einmal ein neues Spiel beginnen, da die Onchain-Komponente denkt, dass sie noch ein laufendes Spiel haben.

Dies ist eindeutig ein schlechtes Design für ein produktives System, in dem man diese Informationen in einer Datenbank speichern würde. Der einzige Grund, warum ich hier eine Variable verwendet habe, ist, dass dies ein Tutorial ist und Einfachheit im Vordergrund steht.

## Fazit: Unter welchen Bedingungen ist dies die geeignete Technik? {#conclusion}

Sie wissen nun also, wie man ein Spiel mit einem Server schreibt, der einen geheimen Zustand speichert, der nicht onchain gehört. Aber in welchen Fällen sollten Sie das tun? Es gibt zwei Hauptüberlegungen.

- _Lang laufendes Spiel_: [Wie oben erwähnt](#why-zero-knowledge), können Sie bei einem kurzen Spiel den Zustand einfach veröffentlichen, sobald das Spiel vorbei ist, und dann alles verifizieren lassen. Das ist jedoch keine Option, wenn das Spiel eine lange oder unbestimmte Zeit dauert und der Zustand geheim bleiben muss.

- _Gewisse Zentralisierung akzeptabel_: Zero-Knowledge-Beweise können die Integrität verifizieren, also dass eine Entität die Ergebnisse nicht fälscht. Was sie nicht können, ist sicherzustellen, dass die Entität weiterhin verfügbar ist und auf Nachrichten antwortet. In Situationen, in denen auch die Verfügbarkeit dezentral sein muss, sind Zero-Knowledge-Beweise keine ausreichende Lösung, und Sie benötigen [Multi-Party Computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).

### Danksagungen {#acknowledgements}

- Alvaro Alonso hat einen Entwurf dieses Artikels gelesen und einige meiner Missverständnisse bezüglich Zokrates geklärt.

Alle verbleibenden Fehler liegen in meiner Verantwortung.