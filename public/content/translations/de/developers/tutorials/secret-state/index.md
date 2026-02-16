---
title: "Verwendung von Zero-Knowledge für einen geheimen Zustand"
description: "Onchain-Spiele sind begrenzt, da sie keine versteckten Informationen enthalten können. Nach der Lektüre dieses Tutorials ist der Leser in der Lage, Zero-Knowledge-Beweise und Serverkomponenten zu kombinieren, um verifizierbare Spiele mit einer geheimen Offchain-Zustandskomponente zu erstellen. Die Technik dafür wird durch die Erstellung eines Minesweeper-Spiels demonstriert."
author: Ori Pomerantz
tags: ["server", "offchain", "centralized", "zero-knowledge", "zokrates", "mud"]
skill: advanced
lang: de
published: 2025-03-15
---

_Es gibt keine Geheimnisse in der Blockchain_. Alles, was auf der Blockchain gepostet wird, ist für jeden lesbar. Dies ist notwendig, da die Blockchain darauf basiert, dass jeder sie verifizieren kann. Spiele sind jedoch oft auf einen geheimen Zustand angewiesen. Zum Beispiel ergibt das Spiel [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) absolut keinen Sinn, wenn man einfach in einen Blockchain-Explorer gehen und die Karte sehen kann.

Die einfachste Lösung ist die Verwendung einer [Serverkomponente](/developers/tutorials/server-components/), um den geheimen Zustand zu speichern. Der Grund, warum wir die Blockchain verwenden, ist jedoch, Betrug durch den Spieleentwickler zu verhindern. Wir müssen die Ehrlichkeit der Serverkomponente sicherstellen. Der Server kann einen Hash des Zustands bereitstellen und [Zero-Knowledge-Beweise](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) verwenden, um zu beweisen, dass der zur Berechnung des Ergebnisses eines Zuges verwendete Zustand der richtige ist.

Nach der Lektüre dieses Artikels wissen Sie, wie Sie diese Art von Server, der einen geheimen Zustand hält, einen Client zur Anzeige des Zustands und eine Onchain-Komponente für die Kommunikation zwischen den beiden erstellen. Die Hauptwerkzeuge, die wir verwenden werden, sind:

| Werkzeug                                      | Zweck                                         |                 Auf Version verifiziert |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Zero-Knowledge-Beweise und ihre Verifizierung |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Programmiersprache für Server und Client      |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Ausführen des Servers                         | 20.18.2 |
| [Viem](https://viem.sh/)                      | Kommunikation mit der Blockchain              |  2.9.20 |
| [MUD](https://mud.dev/)                       | Onchain-Datenverwaltung                       |  2.0.12 |
| [React](https://react.dev/)                   | Client-Benutzeroberfläche                     |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Bereitstellen des Client-Codes                |   4.2.1 |

## Minesweeper-Beispiel {#minesweeper}

[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) ist ein Spiel, das eine geheime Karte mit einem Minenfeld enthält. Der Spieler entscheidet sich, an einer bestimmten Stelle zu graben. Wenn sich an dieser Stelle eine Mine befindet, ist das Spiel vorbei. Andernfalls erhält der Spieler die Anzahl der Minen in den acht Feldern, die diesen Ort umgeben.

Diese Anwendung wurde mit [MUD](https://mud.dev/) geschrieben, einem Framework, mit dem wir Daten onchain in einer [Schlüssel-Wert-Datenbank](https://aws.amazon.com/nosql/key-value/) speichern und diese Daten automatisch mit Offchain-Komponenten synchronisieren können. Zusätzlich zur Synchronisation erleichtert MUD die Bereitstellung von Zugriffskontrollen und ermöglicht es anderen Benutzern, unsere Anwendung [zu erweitern](https://mud.dev/guides/extending-a-world), ohne dass eine Berechtigung erforderlich ist.

### Ausführen des Minesweeper-Beispiels {#running-minesweeper-example}

So führen Sie das Minesweeper-Beispiel aus:

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

   Wenn Foundry als Teil von `pnpm install` installiert wurde, müssen Sie die Kommandozeilen-Shell neu starten.

4. Kompilieren Sie die Verträge

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Starten Sie das Programm (einschließlich einer [Anvil](https://book.getfoundry.sh/anvil/) Blockchain) und warten Sie.

   ```sh copy
   mprocs
   ```

   Beachten Sie, dass der Start lange dauert. Um den Fortschritt zu sehen, verwenden Sie zuerst die Pfeiltaste nach unten, um zum Tab _contracts_ zu scrollen, um zu sehen, wie die MUD-Verträge bereitgestellt werden. Wenn Sie die Meldung _Waiting for file changes…_ erhalten, sind die Verträge bereitgestellt und der weitere Fortschritt findet auf der Registerkarte _server_ statt. Dort warten Sie, bis Sie die Nachricht _Verifier address: 0x..._ erhalten.

   Wenn dieser Schritt erfolgreich ist, sehen Sie den `mprocs`-Bildschirm mit den verschiedenen Prozessen auf der linken und der Konsolenausgabe für den aktuell ausgewählten Prozess auf der rechten Seite.

   ![Der mprocs-Bildschirm](./mprocs.png)

   Wenn es ein Problem mit `mprocs` gibt, können Sie die vier Prozesse manuell ausführen, jeder in seinem eigenen Kommandozeilenfenster:

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

6. Jetzt können Sie zum [Client](http://localhost:3000) navigieren, auf **New Game** klicken und mit dem Spielen beginnen.

### Tabellen {#tables}

Wir benötigen [mehrere Tabellen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Diese Tabelle ist ein Singleton, sie hat keinen Schlüssel und einen einzigen Datensatz. Sie wird verwendet, um Informationen zur Spielkonfiguration zu speichern:
  - `height`: Die Höhe eines Minenfeldes
  - `width`: Die Breite eines Minenfeldes
  - `numberOfBombs`: Die Anzahl der Bomben in jedem Minenfeld

- `VerifierAddress`: Diese Tabelle ist ebenfalls ein Singleton. Es wird verwendet, um einen Teil der Konfiguration zu halten, die Adresse des Verifizierervertrags (`verifier`). Wir hätten diese Information in die `Configuration`-Tabelle aufnehmen können, aber sie wird von einer anderen Komponente, dem Server, gesetzt, daher ist es einfacher, sie in eine separate Tabelle zu packen.

- `PlayerGame`: Der Schlüssel ist die Adresse des Spielers. Die Daten sind:

  - `gameId`: 32-Byte-Wert, der der Hash der Karte ist, auf der der Spieler spielt (der Spiel-Identifikator).
  - `win`: ein boolescher Wert, der angibt, ob der Spieler das Spiel gewonnen hat.
  - `lose`: ein boolescher Wert, der angibt, ob der Spieler das Spiel verloren hat.
  - `digNumber`: die Anzahl der erfolgreichen Grabungen im Spiel.

- `GamePlayer`: Diese Tabelle enthält die umgekehrte Zuordnung von `gameId` zur Spieleradresse.

- `Map`: Der Schlüssel ist ein Tupel aus drei Werten:

  - `gameId`: 32-Byte-Wert, der der Hash der Karte ist, auf der der Spieler spielt (der Spiel-Identifikator).
  - `x`-Koordinate
  - `y`-Koordinate

  Der Wert ist eine einzelne Zahl. Es ist 255, wenn eine Bombe entdeckt wurde. Andernfalls ist es die Anzahl der Bomben um diesen Ort herum plus eins. Wir können nicht einfach die Anzahl der Bomben verwenden, da standardmäßig der gesamte Speicher in der EVM und alle Zeilenwerte in MUD null sind. Wir müssen zwischen „der Spieler hat hier noch nicht gegraben“ und „der Spieler hat hier gegraben und festgestellt, dass es keine Bomben in der Nähe gibt“ unterscheiden.

Zusätzlich findet die Kommunikation zwischen Client und Server über die Onchain-Komponente statt. Dies wird ebenfalls mithilfe von Tabellen implementiert.

- `PendingGame`: Nicht bearbeitete Anfragen zum Starten eines neuen Spiels.
- `PendingDig`: Nicht bearbeitete Anfragen, an einem bestimmten Ort in einem bestimmten Spiel zu graben. Dies ist eine [Offchain-Tabelle](https://mud.dev/store/tables#types-of-tables), was bedeutet, dass sie nicht in den EVM-Speicher geschrieben wird, sondern nur offchain über Ereignisse lesbar ist.

### Ausführungs- und Datenflüsse {#execution-data-flows}

Diese Flüsse koordinieren die Ausführung zwischen dem Client, der Onchain-Komponente und dem Server.

#### Initialisierung {#initialization-flow}

Wenn Sie `mprocs` ausführen, geschehen diese Schritte:

1. [`mprocs`](https://github.com/pvolok/mprocs) führt vier Komponenten aus:

   - [Anvil](https://book.getfoundry.sh/anvil/), das eine lokale Blockchain ausführt
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), das die Verträge für MUD kompiliert (falls erforderlich) und bereitstellt
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), das [Vite](https://vitejs.dev/) ausführt, um die Benutzeroberfläche und den Client-Code für Webbrowser bereitzustellen.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), der die Serveraktionen ausführt

2. Das `contracts`-Paket stellt die MUD-Verträge bereit und führt dann [das `PostDeploy.s.sol`-Skript](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) aus. Dieses Skript legt die Konfiguration fest. Der Code von GitHub spezifiziert [ein 10x5 Minenfeld mit acht Minen darin](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Der Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) beginnt mit der [Einrichtung von MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Dies aktiviert unter anderem die Datensynchronisation, sodass eine Kopie der relevanten Tabellen im Speicher des Servers vorhanden ist.

4. Der Server abonniert eine Funktion, die ausgeführt wird, [wenn sich die `Configuration`-Tabelle ändert](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Diese Funktion](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) wird aufgerufen, nachdem `PostDeploy.s.sol` ausgeführt und die Tabelle geändert wurde.

5. Wenn die Server-Initialisierungsfunktion die Konfiguration hat, [ruft sie `zkFunctions` auf](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35), um [den Zero-Knowledge-Teil des Servers zu initialisieren](#using-zokrates-from-typescript). Dies kann erst geschehen, wenn wir die Konfiguration erhalten, da die Zero-Knowledge-Funktionen die Breite und Höhe des Minenfeldes als Konstanten haben müssen.

6. Nachdem der Zero-Knowledge-Teil des Servers initialisiert ist, ist der nächste Schritt, [den Zero-Knowledge-Verifizierungsvertrag auf der Blockchain bereitzustellen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) und die Verifizierungsadresse in MUD festzulegen.

7. Schließlich abonnieren wir Aktualisierungen, damit wir sehen, wenn ein Spieler entweder [ein neues Spiel starten](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) oder [in einem bestehenden Spiel graben](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) möchte.

#### Neues Spiel {#new-game-flow}

Dies geschieht, wenn der Spieler ein neues Spiel anfordert.

1. Wenn für diesen Spieler kein Spiel im Gange ist, oder es eines gibt, aber mit einer gameId von Null, zeigt der Client eine [Schaltfläche für ein neues Spiel](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) an. Wenn der Benutzer diese Schaltfläche drückt, [führt React die Funktion `newGame` aus](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ist ein `System`-Aufruf. In MUD werden alle Aufrufe über den `World`-Vertrag geleitet, und in den meisten Fällen rufen Sie `<namespace>__<function name>` auf. In diesem Fall ist der Aufruf an `app__newGame`, den MUD dann an [`newGame` in `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) weiterleitet.

3. Die Onchain-Funktion prüft, ob der Spieler kein Spiel im Gange hat, und wenn nicht, [fügt sie die Anfrage zur `PendingGame`-Tabelle hinzu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Der Server erkennt die Änderung in `PendingGame` und [führt die abonnierte Funktion aus](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Diese Funktion ruft [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) auf, das wiederum [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) aufruft.

5. Das Erste, was `createGame` tut, ist [eine zufällige Karte mit der entsprechenden Anzahl von Minen zu erstellen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Dann ruft es [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) auf, um eine Karte mit leeren Rändern zu erstellen, was für Zokrates notwendig ist. Schließlich ruft `createGame` [`calculateMapHash`](#calculateMapHash) auf, um den Hash der Karte zu erhalten, der als Spiel-ID verwendet wird.

6. Die Funktion `newGame` fügt das neue Spiel zu `gamesInProgress` hinzu.

7. Das Letzte, was der Server tut, ist [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) aufzurufen, was onchain geschieht. Diese Funktion befindet sich in einem anderen `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), um die Zugriffskontrolle zu ermöglichen. Die Zugriffskontrolle ist in der [MUD-Konfigurationsdatei](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) definiert.

   Die Zugriffsliste erlaubt nur einer einzigen Adresse, das `System` aufzurufen. Dies beschränkt den Zugriff auf die Serverfunktionen auf eine einzige Adresse, sodass niemand den Server imitieren kann.

8. Die Onchain-Komponente aktualisiert die relevanten Tabellen:

   - Erstellen Sie das Spiel in `PlayerGame`.
   - Setzen Sie die umgekehrte Zuordnung in `GamePlayer`.
   - Entfernen Sie die Anfrage aus `PendingGame`.

9. Der Server identifiziert die Änderung in `PendingGame`, unternimmt aber nichts, da [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) falsch ist.

10. Auf dem Client wird [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) auf den `PlayerGame`-Eintrag für die Adresse des Spielers gesetzt. Wenn sich `PlayerGame` ändert, ändert sich auch `gameRecord`.

11. Wenn ein Wert in `gameRecord` vorhanden ist und das Spiel weder gewonnen noch verloren wurde, [zeigt der Client die Karte an](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Graben {#dig-flow}

1. Der Spieler [klickt auf die Schaltfläche der Kartenzelle](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), wodurch [die Funktion `dig` aufgerufen wird](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Diese Funktion ruft [`dig` onchain auf](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Die Onchain-Komponente [führt eine Reihe von Plausibilitätsprüfungen durch](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) und fügt bei Erfolg die Grabanforderung zu [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) hinzu.

3. Der Server [erkennt die Änderung in `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Wenn sie gültig ist](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), ruft sie [den Zero-Knowledge-Code](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) auf (unten erklärt), um sowohl das Ergebnis als auch einen Beweis für dessen Gültigkeit zu generieren.

4. [Der Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ruft [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain auf.

5. `digResponse` tut zwei Dinge. Zuerst prüft es [den Zero-Knowledge-Beweis](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Wenn der Beweis dann standhält, ruft es [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) auf, um das Ergebnis tatsächlich zu verarbeiten.

6. `processDigResult` prüft, ob das Spiel [verloren](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) oder [gewonnen](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) wurde, und [aktualisiert `Map`, die Onchain-Karte](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Der Client übernimmt die Aktualisierungen automatisch und [aktualisiert die dem Spieler angezeigte Karte](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) und teilt dem Spieler gegebenenfalls mit, ob es ein Sieg oder eine Niederlage ist.

## Verwendung von Zokrates {#using-zokrates}

In den oben erklärten Abläufen haben wir die Zero-Knowledge-Teile übersprungen und sie als Blackbox behandelt. Jetzt wollen wir sie aufbrechen und sehen, wie dieser Code geschrieben ist.

### Hashing der Karte {#hashing-map}

Wir können [diesen JavaScript-Code](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) verwenden, um [Poseidon](https://www.poseidon-hash.info), die von uns verwendete Zokrates-Hash-Funktion, zu implementieren. Obwohl dies schneller wäre, wäre es auch komplizierter, als einfach die Zokrates-Hash-Funktion dafür zu verwenden. Dies ist ein Tutorial, daher ist der Code auf Einfachheit und nicht auf Leistung optimiert. Daher benötigen wir zwei verschiedene Zokrates-Programme: eines, das nur den Hash einer Karte (`hash`) berechnet, und eines, das tatsächlich einen Zero-Knowledge-Beweis für das Ergebnis des Grabens an einem Ort auf der Karte (`dig`) erstellt.

### Die Hash-Funktion {#hash-function}

Dies ist die Funktion, die den Hash einer Karte berechnet. Wir werden diesen Code Zeile für Zeile durchgehen.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Diese beiden Zeilen importieren zwei Funktionen aus der [Zokrates-Standardbibliothek](https://zokrates.github.io/toolbox/stdlib.html). [Die erste Funktion](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ist ein [Poseidon-Hash](https://www.poseidon-hash.info/). Es nimmt ein Array von [`field`-Elementen](https://zokrates.github.io/language/types.html#field) und gibt ein `field` zurück.

Das Feldelement in Zokrates ist typischerweise kürzer als 256 Bit, aber nicht viel. Um den Code zu vereinfachen, beschränken wir die Karte auf bis zu 512 Bit und hashen ein Array von vier Feldern, und in jedem Feld verwenden wir nur 128 Bit. [Die Funktion `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) wandelt zu diesem Zweck ein Array von 128 Bits in ein `field` um.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Diese Zeile beginnt eine Funktionsdefinition. `hashMap` erhält einen einzigen Parameter namens `map`, ein zweidimensionales `bool`(esches) Array. Die Größe der Karte ist `width+2` mal `height+2` aus Gründen, die [unten erklärt werden](#why-map-border).

Wir können `${width+2}` und `${height+2}` verwenden, da die Zokrates-Programme in dieser Anwendung als [Template-Strings](https://www.w3schools.com/js/js_string_templates.asp) gespeichert sind. Code zwischen `${` und `}` wird von JavaScript ausgewertet, und auf diese Weise kann das Programm für verschiedene Kartengrößen verwendet werden. Der Kartenparameter hat einen einen Ort breiten Rand ringsum ohne Bomben, weshalb wir zwei zur Breite und Höhe hinzufügen müssen.

Der Rückgabewert ist ein `field`, das den Hash enthält.

```
   bool[512] mut map1d = [false; 512];
```

Die Karte ist zweidimensional. Die Funktion `pack128` funktioniert jedoch nicht mit zweidimensionalen Arrays. Also flachen wir die Karte zuerst in ein 512-Byte-Array ab, indem wir `map1d` verwenden. Standardmäßig sind Zokrates-Variablen Konstanten, aber wir müssen diesem Array in einer Schleife Werte zuweisen, also definieren wir es als [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Wir müssen das Array initialisieren, da Zokrates kein `undefined` kennt. Der Ausdruck `[false; 512]` bedeutet [ein Array von 512 `false`-Werten](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Wir benötigen auch einen Zähler, um zwischen den Bits, die wir bereits in `map1d` gefüllt haben, und denen, die wir nicht gefüllt haben, zu unterscheiden.

```
   for u32 x in 0..${width+2} {
```

So deklarieren Sie eine [`for`-Schleife](https://zokrates.github.io/language/control_flow.html#for-loops) in Zokrates. Eine Zokrates-`for`-Schleife muss feste Grenzen haben, denn obwohl sie wie eine Schleife aussieht, „entrollt“ der Compiler sie tatsächlich. Der Ausdruck `${width+2}` ist eine Kompilierzeitkonstante, da `width` vom TypeScript-Code gesetzt wird, bevor er den Compiler aufruft.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Für jeden Ort auf der Karte, fügen Sie diesen Wert in das `map1d`-Array ein und erhöhen Sie den Zähler.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Das `pack128`, um ein Array von vier `field`-Werten aus `map1d` zu erstellen. In Zokrates bedeutet `array[a..b]` den Ausschnitt des Arrays, der bei `a` beginnt und bei `b-1` endet.

```
    return poseidon(hashMe);
}
```

Verwenden Sie `poseidon`, um dieses Array in einen Hash umzuwandeln.

### Das Hash-Programm {#hash-program}

Der Server muss `hashMap` direkt aufrufen, um Spiel-Identifikatoren zu erstellen. Zokrates kann jedoch nur die `main`-Funktion eines Programms zum Starten aufrufen, daher erstellen wir ein Programm mit einer `main`-Funktion, die die Hash-Funktion aufruft.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Das Grabungsprogramm {#dig-program}

Dies ist das Herzstück des Zero-Knowledge-Teils der Anwendung, wo wir die Beweise produzieren, die zur Verifizierung von Grabungsergebnissen verwendet werden.

```
${hashFragment}

// Die Anzahl der Minen am Ort (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Warum ein Kartenrand {#why-map-border}

Zero-Knowledge-Beweise verwenden [arithmetische Schaltungen](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), die keine einfache Entsprechung zu einer `if`-Anweisung haben. Stattdessen verwenden sie das Äquivalent des [bedingten Operators](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Wenn `a` entweder null oder eins sein kann, können Sie `if a { b } else { c }` als `ab+(1-a)c` berechnen.

Deshalb wertet eine Zokrates-`if`-Anweisung immer beide Zweige aus. Wenn Sie zum Beispiel diesen Code haben:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Es wird einen Fehler geben, weil es `arr[10]` berechnen muss, obwohl dieser Wert später mit Null multipliziert wird.

Dies ist der Grund, warum wir einen einen Ort breiten Rand rund um die Karte benötigen. Wir müssen die Gesamtzahl der Minen um einen Ort herum berechnen, und das bedeutet, wir müssen den Ort eine Reihe darüber und darunter, links und rechts von dem Ort, an dem wir graben, sehen. Das bedeutet, dass diese Orte in dem Karten-Array existieren müssen, das Zokrates zur Verfügung gestellt wird.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Standardmäßig enthalten Zokrates-Beweise ihre Eingaben. Es nützt nichts zu wissen, dass sich fünf Minen um einen Punkt befinden, es sei denn, man weiß tatsächlich, um welchen Punkt es sich handelt (und man kann ihn nicht einfach mit seiner Anfrage abgleichen, denn dann könnte der Prüfer andere Werte verwenden und es Ihnen nicht mitteilen). Wir müssen die Karte jedoch geheim halten, während wir sie Zokrates zur Verfügung stellen. Die Lösung ist die Verwendung eines `private`-Parameters, der _nicht_ durch den Beweis offengelegt wird.

Dies eröffnet eine weitere Möglichkeit für Missbrauch. Der Prüfer könnte die richtigen Koordinaten verwenden, aber eine Karte mit einer beliebigen Anzahl von Minen um den Ort herum und möglicherweise am Ort selbst erstellen. Um diesen Missbrauch zu verhindern, lassen wir den Zero-Knowledge-Beweis den Hash der Karte enthalten, der die Spiel-ID ist.

```
   return (hashMap(map),
```

Der Rückgabewert ist hier ein Tupel, das das Karten-Hash-Array sowie das Grabungsergebnis enthält.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Wir verwenden 255 als Sonderwert für den Fall, dass der Ort selbst eine Bombe enthält.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Wenn der Spieler keine Mine getroffen hat, addieren Sie die Minenzählungen für den Bereich um den Ort herum und geben Sie das zurück.

### Verwendung von Zokrates aus TypeScript {#using-zokrates-from-typescript}

Zokrates hat eine Befehlszeilenschnittstelle, aber in diesem Programm verwenden wir sie im [TypeScript-Code](https://zokrates.github.io/toolbox/zokrates_js.html).

Die Bibliothek, die die Zokrates-Definitionen enthält, heißt [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importieren Sie die [Zokrates JavaScript-Bindungen](https://zokrates.github.io/toolbox/zokrates_js.html). Wir benötigen nur die Funktion [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), da sie ein Promise zurückgibt, das in alle Zokrates-Definitionen aufgelöst wird.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Ähnlich wie bei Zokrates selbst exportieren wir auch nur eine Funktion, die ebenfalls [asynchron](https://www.w3schools.com/js/js_async.asp) ist. Wenn sie schließlich zurückkehrt, stellt sie mehrere Funktionen zur Verfügung, wie wir unten sehen werden.

```typescript
const zokrates = await zokratesInitialize()
```

Initialisieren Sie Zokrates, holen Sie sich alles, was wir aus der Bibliothek benötigen.

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

Als Nächstes haben wir die Hash-Funktion und zwei Zokrates-Programme, die wir oben gesehen haben.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Hier kompilieren wir diese Programme.

```typescript
// Erstellen Sie die Schlüssel für die Zero-Knowledge-Verifizierung.
// Auf einem Produktionssystem würden Sie eine Setup-Zeremonie verwenden wollen.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Auf einem Produktionssystem könnten wir eine kompliziertere [Setup-Zeremonie](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) verwenden, aber das ist für eine Demonstration ausreichend. Es ist kein Problem, dass die Benutzer den Prover-Schlüssel kennen – sie können ihn trotzdem nicht verwenden, um Dinge zu beweisen, es sei denn, sie sind wahr. Da wir die Entropie (der zweite Parameter, `""`) angeben, werden die Ergebnisse immer die gleichen sein.

**Hinweis:** Die Kompilierung von Zokrates-Programmen und die Schlüsselerstellung sind langsame Prozesse. Es ist nicht nötig, sie jedes Mal zu wiederholen, nur wenn sich die Kartengröße ändert. Auf einem Produktionssystem würde man sie einmal durchführen und dann die Ausgabe speichern. Der einzige Grund, warum ich es hier nicht tue, ist der Einfachheit halber.

#### `calculateMapHash` {#calculateMapHash}

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

Die Funktion [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) führt das Zokrates-Programm tatsächlich aus. Sie gibt eine Struktur mit zwei Feldern zurück: `output`, die Ausgabe des Programms als JSON-String, und `witness`, die Informationen, die zur Erstellung eines Zero-Knowledge-Beweises des Ergebnisses benötigt werden. Hier benötigen wir nur die Ausgabe.

Die Ausgabe ist ein String der Form `"31337"`, eine in Anführungszeichen eingeschlossene Dezimalzahl. Aber die Ausgabe, die wir für `viem` benötigen, ist eine hexadezimale Zahl der Form `0x60A7`. Also verwenden wir `.slice(1,-1)`, um die Anführungszeichen zu entfernen, und dann `BigInt`, um den verbleibenden String, der eine Dezimalzahl ist, in einen [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) umzuwandeln. `.toString(16)` wandelt diesen `BigInt` in einen hexadezimalen String um, und `"0x"+` fügt die Markierung für hexadezimale Zahlen hinzu.

```typescript
// Graben und einen Zero-Knowledge-Beweis des Ergebnisses zurückgeben
// (serverseitiger Code)
```

Der Zero-Knowledge-Beweis enthält die öffentlichen Eingaben (`x` und `y`) und Ergebnisse (Hash der Karte und Anzahl der Bomben).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Versuch, außerhalb der Karte zu graben")
```

Es ist ein Problem, in Zokrates zu prüfen, ob ein Index außerhalb der Grenzen liegt, also tun wir es hier.

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
        // Kartengröße: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Ein Solidity-Verifizierer, ein Smart Contract, den wir auf der Blockchain bereitstellen und verwenden können, um Beweise zu verifizieren, die von `digCompiled.program` generiert wurden.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Schließlich geben Sie alles zurück, was anderer Code benötigen könnte.

## Sicherheitstests {#security-tests}

Sicherheitstests sind wichtig, denn ein Funktionsfehler wird sich irgendwann von selbst zeigen. Aber wenn die Anwendung unsicher ist, bleibt das wahrscheinlich lange Zeit verborgen, bevor es von jemandem aufgedeckt wird, der betrügt und mit Ressourcen davonkommt, die anderen gehören.

### Berechtigungen {#permissions}

Es gibt eine privilegierte Entität in diesem Spiel, den Server. Es ist der einzige Benutzer, der berechtigt ist, die Funktionen in [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) aufzurufen. Wir können [`cast`](https://book.getfoundry.sh/cast/) verwenden, um zu überprüfen, dass Aufrufe von berechtigten Funktionen nur mit dem Serverkonto erlaubt sind.

[Der private Schlüssel des Servers befindet sich in `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Setzen Sie auf dem Computer, auf dem `anvil` (die Blockchain) läuft, diese Umgebungsvariablen.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Verwenden Sie `cast`, um zu versuchen, die Verifiziereradresse als eine nicht autorisierte Adresse festzulegen.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Nicht nur meldet `cast` einen Fehler, sondern Sie können auch **MUD Dev Tools** im Spiel im Browser öffnen, auf **Tables** klicken und **app\_\_VerifierAddress** auswählen. Sehen Sie, dass die Adresse nicht null ist.

3. Setzen Sie die Verifiziereradresse als Adresse des Servers.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Die Adresse in **app\_\_VerifiedAddress** sollte jetzt null sein.

Alle MUD-Funktionen im selben `System` durchlaufen dieselbe Zugriffskontrolle, daher halte ich diesen Test für ausreichend. Wenn nicht, können Sie die anderen Funktionen in [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) überprüfen.

### Zero-Knowledge-Missbrauch {#zero-knowledge-abuses}

Die Mathematik zur Verifizierung von Zokrates liegt außerhalb des Rahmens dieses Tutorials (und meiner Fähigkeiten). Wir können jedoch verschiedene Prüfungen am Zero-Knowledge-Code durchführen, um zu verifizieren, dass er bei fehlerhafter Ausführung fehlschlägt. All diese Tests erfordern, dass wir [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) ändern und die gesamte Anwendung neu starten. Es reicht nicht aus, den Serverprozess neu zu starten, da dies die Anwendung in einen unmöglichen Zustand versetzt (der Spieler hat ein Spiel im Gange, aber das Spiel ist für den Server nicht mehr verfügbar).

#### Falsche Antwort {#wrong-answer}

Die einfachste Möglichkeit besteht darin, im Zero-Knowledge-Beweis die falsche Antwort zu geben. Dazu gehen wir in `zkDig` und [ändern Zeile 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Das bedeutet, wir werden immer behaupten, es gäbe eine Bombe, unabhängig von der richtigen Antwort. Versuchen Sie, mit dieser Version zu spielen, und Sie werden auf der Registerkarte **server** des `pnpm dev`-Bildschirms diesen Fehler sehen:

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

Was passiert, wenn wir die richtigen Informationen liefern, aber nur die falschen Beweisdaten haben? Ersetzen Sie nun Zeile 91 durch:

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

Es schlägt immer noch fehl, aber jetzt schlägt es ohne Grund fehl, weil es während des Verifizierungsaufrufs passiert.

### Wie kann ein Benutzer den Zero-Trust-Code überprüfen? {#user-verify-zero-trust}

Smart Contracts sind relativ einfach zu überprüfen. Typischerweise veröffentlicht der Entwickler den Quellcode in einem Block-Explorer, und der Block-Explorer verifiziert, dass der Quellcode zum Code in der [Vertragsbereitstellungstransaktion](/developers/docs/smart-contracts/deploying/) kompiliert. Im Falle von MUD-`System`en ist dies [etwas komplizierter](https://mud.dev/cli/verify), aber nicht viel.

Mit Zero-Knowledge ist das schwieriger. Der Verifizierer enthält einige Konstanten und führt einige Berechnungen mit ihnen durch. Dies sagt Ihnen nicht, was bewiesen wird.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Die Lösung besteht, zumindest bis Block-Explorer dazu übergehen, Zokrates-Verifizierung zu ihren Benutzeroberflächen hinzuzufügen, darin, dass die Anwendungsentwickler die Zokrates-Programme zur Verfügung stellen und dass zumindest einige Benutzer sie selbst mit dem entsprechenden Verifizierungsschlüssel kompilieren.

Dazu gehen Sie wie folgt vor:

1. [Installieren Sie Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Erstellen Sie eine Datei `dig.zok` mit dem Zokrates-Programm. Der nachstehende Code geht davon aus, dass Sie die ursprüngliche Kartengröße von 10x5 beibehalten haben.

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


    // Die Anzahl der Minen am Ort (x,y)
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

3. Kompilieren Sie den Zokrates-Code und erstellen Sie den Verifizierungsschlüssel. Der Verifizierungsschlüssel muss mit der gleichen Entropie erstellt werden, die im ursprünglichen Server verwendet wurde, [in diesem Fall ein leerer String](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Erstellen Sie den Solidity-Verifizierer selbst und überprüfen Sie, ob er funktionell mit dem auf der Blockchain identisch ist (der Server fügt einen Kommentar hinzu, aber das ist nicht wichtig).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Designentscheidungen {#design}

In jeder ausreichend komplexen Anwendung gibt es konkurrierende Designziele, die Kompromisse erfordern. Schauen wir uns einige der Kompromisse an und warum die aktuelle Lösung anderen Optionen vorzuziehen ist.

### Warum Zero-Knowledge {#why-zero-knowledge}

Für Minesweeper braucht man nicht wirklich Zero-Knowledge. Der Server kann die Karte immer behalten und sie dann einfach aufdecken, wenn das Spiel vorbei ist. Dann kann der Smart Contract am Ende des Spiels den Karten-Hash berechnen, überprüfen, ob er übereinstimmt, und wenn nicht, den Server bestrafen oder das Spiel vollständig ignorieren.

Ich habe diese einfachere Lösung nicht verwendet, da sie nur für kurze Spiele mit einem genau definierten Endzustand funktioniert. Wenn ein Spiel potenziell unendlich ist (wie im Fall von [autonomen Welten](https://0xparc.org/blog/autonomous-worlds)), benötigen Sie eine Lösung, die den Zustand beweist, _ohne_ ihn preiszugeben.

Als Tutorial benötigte dieser Artikel ein kurzes, leicht verständliches Spiel, aber diese Technik ist am nützlichsten für längere Spiele.

### Warum Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) ist nicht die einzige verfügbare Zero-Knowledge-Bibliothek, aber sie ähnelt einer normalen, [imperativen](https://en.wikipedia.org/wiki/Imperative_programming) Programmiersprache und unterstützt boolesche Variablen.

Für Ihre Anwendung, mit unterschiedlichen Anforderungen, bevorzugen Sie möglicherweise die Verwendung von [Circum](https://docs.circom.io/getting-started/installation/) oder [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Wann Zokrates kompilieren {#when-compile-zokrates}

In diesem Programm kompilieren wir die Zokrates-Programme [jedes Mal, wenn der Server startet](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Das ist eindeutig eine Verschwendung von Ressourcen, aber dies ist ein Tutorial, das auf Einfachheit optimiert ist.

Wenn ich eine produktionsreife Anwendung schreiben würde, würde ich prüfen, ob ich eine Datei mit den kompilierten Zokrates-Programmen für diese Minenfeldgröße habe, und wenn ja, diese verwenden. Dasselbe gilt für die Bereitstellung eines Verifizierervertrags onchain.

### Erstellen der Verifizierer- und Prüferschlüssel {#key-creation}

Die [Schlüsselerstellung](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ist eine weitere reine Berechnung, die für eine gegebene Minenfeldgröße nicht mehr als einmal durchgeführt werden muss. Auch hier wird es aus Gründen der Einfachheit nur einmal gemacht.

Zusätzlich könnten wir eine [Setup-Zeremonie](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) verwenden. Der Vorteil einer Setup-Zeremonie besteht darin, dass man entweder die Entropie oder ein Zwischenergebnis von jedem Teilnehmer benötigt, um beim Zero-Knowledge-Beweis zu betrügen. Wenn mindestens ein Teilnehmer der Zeremonie ehrlich ist und diese Informationen löscht, sind die Zero-Knowledge-Beweise vor bestimmten Angriffen sicher. Es gibt jedoch _keinen Mechanismus_, um zu überprüfen, ob Informationen von überall gelöscht wurden. Wenn Zero-Knowledge-Beweise von entscheidender Bedeutung sind, sollten Sie an der Setup-Zeremonie teilnehmen.

Hier verlassen wir uns auf [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), an denen Dutzende von Teilnehmern beteiligt waren. Es ist wahrscheinlich sicher genug und viel einfacher. Wir fügen auch keine Entropie während der Schlüsselerstellung hinzu, was es den Benutzern erleichtert, die [Zero-Knowledge-Konfiguration zu überprüfen](#user-verify-zero-trust).

### Wo verifizieren {#where-verification}

Wir können die Zero-Knowledge-Beweise entweder onchain (was Gas kostet) oder im Client (mithilfe von [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)) verifizieren. Ich habe die erste gewählt, da Sie damit [den Verifizierer einmal überprüfen](#user-verify-zero-trust) und dann darauf vertrauen können, dass er sich nicht ändert, solange die Vertragsadresse dafür gleich bleibt. Wenn die Verifizierung auf dem Client durchgeführt würde, müssten Sie den Code jedes Mal überprüfen, wenn Sie den Client herunterladen.

Auch wenn dieses Spiel Einzelspieler ist, sind viele Blockchain-Spiele Mehrspieler. Onchain-Verifizierung bedeutet, dass Sie den Zero-Knowledge-Beweis nur einmal verifizieren. Wenn man es im Client macht, müsste jeder Client unabhängig verifizieren.

### Die Karte in TypeScript oder Zokrates abflachen? {#where-flatten}

Im Allgemeinen ist es besser, die Verarbeitung in TypeScript durchzuführen, wenn sie entweder in TypeScript oder Zokrates erfolgen kann, da TypeScript viel schneller ist und keine Zero-Knowledge-Beweise erfordert. Dies ist zum Beispiel der Grund, warum wir Zokrates nicht den Hash zur Verfügung stellen und ihn überprüfen lassen, ob er korrekt ist. Das Hashing muss innerhalb von Zokrates erfolgen, aber der Abgleich zwischen dem zurückgegebenen Hash und dem Hash onchain kann außerhalb davon stattfinden.

Allerdings [flachen wir die Karte immer noch in Zokrates ab](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), obwohl wir es auch in TypeScript hätten tun können. Der Grund ist, dass die anderen Optionen meiner Meinung nach schlechter sind.

- Stellen Sie dem Zokrates-Code ein eindimensionales Array von Booleschen Werten zur Verfügung und verwenden Sie einen Ausdruck wie `x*(height+2)
  +y`, um die zweidimensionale Karte zu erhalten. Dies würde [den Code](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) etwas komplizierter machen, also habe ich entschieden, dass der Leistungsgewinn für ein Tutorial nicht wert ist.

- Senden Sie Zokrates sowohl das eindimensionale als auch das zweidimensionale Array. Diese Lösung bringt uns jedoch nichts. Der Zokrates-Code müsste überprüfen, ob das bereitgestellte eindimensionale Array wirklich die korrekte Darstellung des zweidimensionalen Arrays ist. Es gäbe also keinen Leistungsgewinn.

- Flachen Sie das zweidimensionale Array in Zokrates ab. Dies ist die einfachste Option, also habe ich sie gewählt.

### Wo Karten speichern {#where-store-maps}

In dieser Anwendung ist [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) einfach eine Variable im Speicher. Das bedeutet, dass, wenn Ihr Server ausfällt und neu gestartet werden muss, alle gespeicherten Informationen verloren gehen. Spieler können nicht nur ihr Spiel nicht fortsetzen, sie können nicht einmal ein neues Spiel starten, weil die Onchain-Komponente denkt, dass sie noch ein Spiel im Gange haben.

Dies ist eindeutig ein schlechtes Design für ein Produktionssystem, in dem Sie diese Informationen in einer Datenbank speichern würden. Der einzige Grund, warum ich hier eine Variable verwendet habe, ist, dass dies ein Tutorial ist und Einfachheit die Hauptüberlegung ist.

## Fazit: Unter welchen Bedingungen ist dies die geeignete Technik? {#conclusion}

So, jetzt wissen Sie, wie man ein Spiel mit einem Server schreibt, der geheime Zustände speichert, die nicht onchain gehören. Aber in welchen Fällen sollten Sie es tun? Es gibt zwei Hauptüberlegungen.

- _Langlaufendes Spiel_: [Wie oben erwähnt](#why-zero-knowledge), können Sie in einem kurzen Spiel den Zustand einfach veröffentlichen, sobald das Spiel vorbei ist, und dann alles verifizieren lassen. Aber das ist keine Option, wenn das Spiel eine lange oder unbestimmte Zeit dauert und der Zustand geheim bleiben muss.

- _Etwas Zentralisierung akzeptabel_: Zero-Knowledge-Beweise können die Integrität überprüfen, dass eine Entität die Ergebnisse nicht fälscht. Was sie nicht tun können, ist sicherzustellen, dass die Entität weiterhin verfügbar ist und auf Nachrichten antwortet. In Situationen, in denen die Verfügbarkeit auch dezentralisiert sein muss, sind Zero-Knowledge-Beweise keine ausreichende Lösung, und Sie benötigen eine [Mehrparteienberechnung](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).

### Anerkennungen {#acknowledgements}

- Alvaro Alonso las einen Entwurf dieses Artikels und klärte einige meiner Missverständnisse über Zokrates auf.

Alle verbleibenden Fehler liegen in meiner Verantwortung.
