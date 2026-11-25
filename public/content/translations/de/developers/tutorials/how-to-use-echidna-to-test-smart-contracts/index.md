---
title: Wie man Echidna verwendet, um Smart Contracts zu testen
description: Wie man Echidna verwendet, um Smart Contracts automatisch zu testen
author: "Trailofbits"
lang: de
tags: ["Solidity", "Smart Contracts", "Sicherheit", "Testen", "Fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installation {#installation}

Echidna kann über Docker, Homebrew oder mithilfe der vorkompilierten Binärdatei installiert werden. Die Beispiele in diesem Tutorial wurden mit Echidna 2.3.3 und solc 0.8.37 getestet.

### Echidna über Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Der letzte Befehl führt das Echidna-Image in einem Docker aus, der Zugriff auf Ihr aktuelles Verzeichnis hat. Sie können die Dateien von Ihrem Host aus ändern und die Tools für die Dateien aus dem Docker heraus ausführen. Das Image enthält außerdem [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) und [solc-select](https://github.com/crytic/solc-select)._

Führen Sie innerhalb von Docker Folgendes aus:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binärdatei {#binary}

Laden Sie die neueste Version für Ihre Plattform von [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) herunter. Unter macOS oder Linux können Sie auch `brew install echidna` ausführen, was Slither und crytic-compile gleich mitinstalliert.

Wenn Sie die Release-Binärdatei verwenden, installieren Sie [Slither](https://github.com/crytic/slither) und [solc-select](https://github.com/crytic/solc-select) selbst (zum Beispiel `pip3 install slither-analyzer solc-select` in einer virtuellen Python-Umgebung) und wählen Sie eine Compiler-Version aus:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna läuft auch ohne Slither, aber Slither extrahiert Konstanten wie die magischen Zahlen, die in `require`-Anweisungen verwendet werden, und einige der folgenden Beispiele sind darauf angewiesen, um Fehler schnell zu finden.

## Einführung in eigenschaftsbasiertes Fuzzing {#introduction-to-property-based-fuzzing}

Echidna ist ein eigenschaftsbasierter Fuzzer, den wir in unseren vorherigen Blogbeiträgen beschrieben haben ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) ist eine bekannte Technik in der Sicherheits-Community. Sie besteht darin, mehr oder weniger zufällige Eingaben zu generieren, um Fehler im Programm zu finden. Fuzzer für herkömmliche Software (wie [AFL](http://lcamtuf.coredump.cx/afl/) oder [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sind als effiziente Tools zur Fehlersuche bekannt.

Über die rein zufällige Generierung von Eingaben hinaus gibt es viele Techniken und Strategien, um gute Eingaben zu erzeugen, darunter:

- Feedback aus jeder Ausführung einholen und die Generierung damit steuern. Wenn beispielsweise eine neu generierte Eingabe zur Erkennung eines neuen Pfads führt, kann es sinnvoll sein, neue Eingaben in dessen Nähe zu generieren.
- Generierung der Eingabe unter Berücksichtigung einer strukturellen Einschränkung. Wenn Ihre Eingabe beispielsweise einen Header mit einer Prüfsumme enthält, ist es sinnvoll, den Fuzzer Eingaben generieren zu lassen, die die Prüfsumme validieren.
- Verwendung bekannter Eingaben zur Generierung neuer Eingaben: Wenn Sie Zugriff auf einen großen Datensatz gültiger Eingaben haben, kann Ihr Fuzzer daraus neue Eingaben generieren, anstatt bei null anzufangen. Diese werden normalerweise als _Seeds_ bezeichnet.

### Eigenschaftsbasiertes Fuzzing {#property-based-fuzzing}

Echidna gehört zu einer bestimmten Familie von Fuzzern: dem eigenschaftsbasierten Fuzzing, das stark von [QuickCheck](https://wikipedia.org/wiki/QuickCheck) inspiriert ist. Im Gegensatz zu klassischen Fuzzern, die versuchen, Abstürze zu finden, versucht Echidna, benutzerdefinierte Invarianten zu brechen.

In Smart Contracts sind Invarianten Solidity-Funktionen, die jeden fehlerhaften oder ungültigen Zustand darstellen können, den der Vertrag erreichen kann, einschließlich:

- Fehlerhafte Zugriffskontrolle: Der Angreifer wurde zum Eigentümer des Vertrags.
- Fehlerhafte Zustandsmaschine: Die Token können übertragen werden, während der Vertrag pausiert ist.
- Fehlerhafte Arithmetik: Der Benutzer kann einen Unterlauf seines Guthabens verursachen und unbegrenzt kostenlose Token erhalten.

### Testen einer Eigenschaft mit Echidna {#testing-a-property-with-echidna}

Wir werden sehen, wie man einen Smart Contract mit Echidna testet. Das Ziel ist der folgende Smart Contract [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Wir gehen davon aus, dass dieser Token die folgenden Eigenschaften haben muss:

- Jeder kann maximal 1000 Token besitzen
- Der Token kann nicht übertragen werden (es ist kein ERC-20-Token)

### Eine Eigenschaft schreiben {#write-a-property}

Echidna-Eigenschaften sind Solidity-Funktionen. Eine Eigenschaft muss:

- Keine Argumente haben
- `true` zurückgeben, wenn sie erfolgreich ist
- Einen Namen haben, der mit `echidna` beginnt

Echidna wird:

- Automatisch beliebige Transaktionen generieren, um die Eigenschaft zu testen.
- Alle Transaktionen melden, die dazu führen, dass eine Eigenschaft `false` zurückgibt oder einen Fehler auslöst.
- Seiteneffekte beim Aufruf einer Eigenschaft verwerfen (d. h., wenn die Eigenschaft eine Zustandsvariable ändert, wird dies nach dem Test verworfen)

Die folgende Eigenschaft überprüft, ob der Aufrufer nicht mehr als 1000 Token hat:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Verwenden Sie Vererbung, um Ihren Vertrag von Ihren Eigenschaften zu trennen:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implementiert die Eigenschaft und erbt vom Token.

### Einen Vertrag initiieren {#initiate-a-contract}

Echidna benötigt einen [Konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) ohne Argumente. Wenn Ihr Vertrag eine spezifische Initialisierung benötigt, müssen Sie diese im Konstruktor vornehmen.

Es gibt einige spezifische Adressen in Echidna:

- `0x30000`, die den Konstruktor aufruft.
- `0x10000`, `0x20000` und `0x30000`, die zufällig die anderen Funktionen aufrufen.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, wo der zu testende Vertrag bereitgestellt wird.

In unserem aktuellen Beispiel benötigen wir keine besondere Initialisierung, weshalb unser Konstruktor leer ist.

### Echidna ausführen {#run-echidna}

Echidna wird gestartet mit:

```sh
echidna contract.sol
```

Wenn contract.sol mehrere Verträge enthält, können Sie das Ziel angeben:

```sh
echidna contract.sol --contract MyContract
```

Wenn Echidna in einem Terminal ausgeführt wird, zeigt es eine interaktive Benutzeroberfläche an. Fügen Sie `--format text` hinzu, um eine reine Textausgabe wie in den folgenden Beispielen zu erhalten.

### Zusammenfassung: Testen einer Eigenschaft {#summary-testing-a-property}

Das Folgende fasst die Ausführung von Echidna für unser Beispiel zusammen:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna hat herausgefunden, dass die Eigenschaft verletzt wird, wenn `backdoor` aufgerufen wird.

## Filtern von Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden sollen {#filtering-functions-to-call-during-a-fuzzing-campaign}

Wir werden sehen, wie man die zu fuzzenden Funktionen filtert.
Das Ziel ist der folgende Smart Contract:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Dieses kleine Beispiel zwingt Echidna, eine bestimmte Abfolge von Transaktionen zu finden, um eine Zustandsvariable zu ändern.
Das ist für einen Fuzzer schwierig.
Wir können Echidna ausführen, um dies zu überprüfen:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Funktionen filtern {#filtering-functions}

Echidna hat Schwierigkeiten, die richtige Sequenz zum Testen dieses Vertrags zu finden, da die beiden Reset-Funktionen (`reset1` und `reset2`) alle Zustandsvariablen auf `false` setzen.
Wir können jedoch eine spezielle Echidna-Funktion verwenden, um die Reset-Funktion entweder auf eine Blacklist zu setzen oder nur die Funktionen `f`, `g`,
`h` und `i` auf eine Whitelist zu setzen.

Um Funktionen auf die Blacklist zu setzen, können wir diese Konfigurationsdatei verwenden:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Ein anderer Ansatz zum Filtern von Funktionen besteht darin, die auf der Whitelist stehenden Funktionen aufzulisten. Dazu können wir diese Konfigurationsdatei verwenden:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` ist standardmäßig `true`.
- Die Filterung erfolgt über den vollständigen Funktionsnamen: den Vertragsnamen, einen `.` und die Application Binary Interface (ABI)-Signatur (zum Beispiel `C.f(uint256)`). Wenn Sie `f()` und `f(uint256)` haben, können Sie genau auswählen, welche gefiltert werden soll. Ein bloßer Name wie `"reset1"` führt zu keinem Treffer.

### Echidna ausführen {#run-echidna-1}

Um Echidna mit einer Konfigurationsdatei `blacklist.yaml` auszuführen:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna wird die Abfolge von Transaktionen zur Falsifizierung der Eigenschaft fast sofort finden.

### Zusammenfassung: Funktionen filtern {#summary-filtering-functions}

Echidna kann Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden sollen, entweder auf eine Blacklist oder eine Whitelist setzen, indem Folgendes verwendet wird:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna startet eine Fuzzing-Kampagne, bei der `C.f1()`, `C.f2()` und `C.f3()` entweder auf die Blacklist gesetzt oder nur diese aufgerufen werden, je nach
Wert des booleschen Werts `filterBlacklist`.

## Wie man Soliditys assert mit Echidna testet {#how-to-test-soliditys-assert-with-echidna}

In diesem kurzen Tutorial werden wir zeigen, wie man Echidna verwendet, um die Überprüfung von Zusicherungen (Assertions) in Verträgen zu testen. Nehmen wir an, wir haben einen Vertrag wie diesen:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Seit Solidity 0.8 werden arithmetische Überläufe standardmäßig rückgängig gemacht. Der `unchecked`-Block stellt das Wrapping-Verhalten wieder her, sodass `counter` einen Überlauf verursachen kann, was der Fehler ist, den Echidna finden soll.

### Eine Zusicherung schreiben {#write-an-assertion}

Wir möchten sicherstellen, dass `tmp` kleiner oder gleich `counter` ist, nachdem die Differenz zurückgegeben wurde. Wir könnten eine
Echidna-Eigenschaft schreiben, müssten den Wert von `tmp` aber irgendwo speichern. Stattdessen könnten wir eine Zusicherung wie diese verwenden:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Echidna ausführen {#run-echidna-2}

Um das Testen von fehlgeschlagenen Zusicherungen zu aktivieren, übergeben Sie `--test-mode assertion` in der Befehlszeile oder erstellen Sie eine [Echidna-Konfigurationsdatei](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Wenn wir diesen Vertrag in Echidna ausführen, erhalten wir die erwarteten Ergebnisse:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Wie Sie sehen können, meldet Echidna einen Fehler bei der Zusicherung in der Funktion `inc`. Es ist möglich, mehr als eine Zusicherung pro Funktion hinzuzufügen, aber Echidna kann nicht sagen, welche Zusicherung fehlgeschlagen ist.

### Wann und wie man Zusicherungen verwendet {#when-and-how-use-assertions}

Zusicherungen können als Alternativen zu expliziten Eigenschaften verwendet werden, insbesondere wenn die zu überprüfenden Bedingungen direkt mit der korrekten Verwendung einer Operation `f` zusammenhängen. Das Hinzufügen von Zusicherungen nach einem Code erzwingt, dass die Überprüfung unmittelbar nach dessen Ausführung stattfindet:

```solidity
function f(..) public {
    // etwas komplexer Code
    ...
    assert (condition);
    ...
}

```

Im Gegensatz dazu führt die Verwendung einer expliziten Echidna-Eigenschaft Transaktionen zufällig aus, und es gibt keine einfache Möglichkeit, genau zu erzwingen, wann sie überprüft wird. Es ist dennoch möglich, diesen Workaround anzuwenden:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Es gibt jedoch einige Probleme:

- Es schlägt fehl, wenn `f` als `internal` oder `external` deklariert ist.
- Es ist unklar, welche Argumente zum Aufrufen von `f` verwendet werden sollen.
- Wenn `f` rückgängig gemacht wird, schlägt die Eigenschaft fehl.

Im Allgemeinen empfehlen wir, [John Regehrs Empfehlung](https://blog.regehr.org/archives/1091) zur Verwendung von Zusicherungen zu folgen:

- Erzwingen Sie während der Überprüfung der Zusicherung keine Seiteneffekte. Zum Beispiel: `assert(ChangeStateAndReturn() == 1)`
- Sichern Sie keine offensichtlichen Aussagen zu. Zum Beispiel `assert(var >= 0)`, wobei `var` als `uint` deklariert ist.

Schließlich **verwenden Sie bitte nicht** `require` anstelle von `assert`, da Echidna dies nicht erkennen kann (der Vertrag wird aber trotzdem rückgängig gemacht).

### Zusammenfassung: Überprüfung von Zusicherungen {#summary-assertion-checking}

Das Folgende fasst die Ausführung von Echidna für unser Beispiel zusammen:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna hat herausgefunden, dass die Zusicherung in `inc` fehlschlagen kann, wenn diese Funktion mehrmals mit großen Argumenten aufgerufen wird.

## Sammeln und Modifizieren eines Echidna-Korpus {#collecting-and-modifying-an-echidna-corpus}

Wir werden sehen, wie man einen Korpus von Transaktionen mit Echidna sammelt und verwendet. Das Ziel ist der folgende Smart Contract [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Dieses kleine Beispiel zwingt Echidna, bestimmte Werte zu finden, um eine Zustandsvariable zu ändern. Das ist für einen Fuzzer schwierig.
Wir können Echidna ausführen, um dies zu überprüfen:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Wir können Echidna jedoch weiterhin verwenden, um bei der Ausführung dieser Fuzzing-Kampagne einen Korpus zu sammeln.

### Einen Korpus sammeln {#collecting-a-corpus}

Um die Korpussammlung zu aktivieren, erstellen Sie ein Korpusverzeichnis:

```sh
mkdir corpus-magic
```

Und eine [Echidna-Konfigurationsdatei](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Jetzt können wir unser Tool ausführen und den gesammelten Korpus überprüfen:

```sh
echidna magic.sol --config config.yaml
```

Echidna kann die korrekten magischen Werte immer noch nicht finden. Um zu sehen, wo es hängen bleibt, sehen Sie sich den Abdeckungsbericht (Coverage Report) `corpus-magic/covered.*.txt` an:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Die Bezeichnung `r` bedeutet, dass Echidna die Zeile erreicht hat, die Ausführung dort jedoch rückgängig gemacht wurde und die Zeilen nach dem letzten `require` nie ausgeführt werden.

Die von Echidna gesammelten Transaktionssequenzen werden als JSON-Dateien in `corpus-magic/coverage/` gespeichert. Die erste Transaktion einer dieser Dateien war beispielsweise:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Es ist klar, dass diese Eingabe den Fehler in unserer Eigenschaft nicht auslösen wird. Im nächsten Schritt werden wir jedoch sehen, wie wir sie dafür modifizieren können.

### Einen Korpus mit Seeds versehen {#seeding-a-corpus}

Echidna braucht etwas Hilfe, um mit der Funktion `magic` umzugehen. Wir werden die Eingabe kopieren und modifizieren, um geeignete
Parameter dafür zu verwenden (die Dateinamen sind zufällig, verwenden Sie also einen aus Ihrem eigenen `corpus-magic/coverage/`-Verzeichnis):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Wir werden `new.txt` so modifizieren, dass es eine einzelne Transaktion enthält, die `magic(42,129,333,0)` aufruft. Jetzt können wir Echidna erneut ausführen:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Dieses Mal wurde sofort festgestellt, dass die Eigenschaft verletzt wird.

## Finden von Transaktionen mit hohem Gasverbrauch {#finding-transactions-with-high-gas-consumption}

Wir werden sehen, wie man mit Echidna die Transaktionen mit hohem Gasverbrauch findet. Ältere Versionen von Echidna hatten dafür eine Option `estimateGas`; diese wurde in Echidna 2.3.0 entfernt. Stattdessen messen wir Gas mit `gasleft()` und lassen es durch den [Optimierungsmodus](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) von Echidna maximieren. Das Ziel ist der folgende Smart Contract:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Hier kann `expensive` einen großen Gasverbrauch haben.

### Messen des Gasverbrauchs {#measuring-gas-consumption}

Im Optimierungsmodus sucht Echidna nach Funktionen, die mit `echidna_` beginnen, kein Argument annehmen und einen `int256` zurückgeben, und versucht, die Abfolge von Transaktionen zu finden, die den zurückgegebenen Wert maximiert. Wir fügen einen Testvertrag hinzu, der `f` aufruft, das verbrauchte Gas aufzeichnet und das Maximum offenlegt (speichern Sie beide Verträge in `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Um den Optimierungsmodus zu aktivieren, erstellen Sie eine Konfigurationsdatei `config.yaml`. In diesem Beispiel werden wir auch die Größe der Transaktionssequenz reduzieren, um die Ergebnisse leichter verständlich zu machen:

```yaml
testMode: optimization
seqLen: 2
```

### Echidna ausführen {#run-echidna-3}

Sobald wir die Konfigurationsdatei erstellt haben, können wir Echidna wie folgt ausführen:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Das angezeigte Gas wird von der Virtuellen Ethereum-Maschine (EVM)-Implementierung gemessen, auf der Echidna läuft, [hevm](https://github.com/argotorg/hevm), und beinhaltet den Overhead des internen Aufrufs von `measureF`.
- Das Maximum ist nicht eindeutig: Jede Kampagne ist zufällig, und längere Kampagnen (zum Beispiel `--test-limit 200000`) tendieren dazu, größere Werte zu finden.

### Herausfiltern von gasreduzierenden Aufrufen {#filtering-out-gas-reducing-calls}

Das obige Tutorial zum **Filtern von Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden sollen**, zeigt, wie man
einige Funktionen aus dem Testen entfernt.
Dies kann entscheidend sein, um eine genaue Gasschätzung zu erhalten.
Betrachten Sie das folgende Beispiel:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` ruft `check` auf und gibt dessen Gaskosten zurück. Wie bei jeder Echidna-Testfunktion werden die Zustandsänderungen danach verworfen.

Wenn Echidna alle Funktionen aufrufen kann, wird es nicht leicht Transaktionen mit hohen Gaskosten finden:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Das liegt daran, dass die Kosten von der Größe von `addrs` abhängen und zufällige Aufrufe dazu neigen, das Array fast leer zu lassen.
Das Setzen von `pop` und `clear` auf die Blacklist liefert uns jedoch viel bessere Ergebnisse:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Das Verkleinern der Aufrufsequenz für dieses Ergebnis dauert mehrere Minuten, da jede Wiederholung die teure Funktion `check` aufruft.

### Zusammenfassung: Finden von Transaktionen mit hohem Gasverbrauch {#summary-finding-transactions-with-high-gas-consumption}

Echidna kann Transaktionen mit hohem Gasverbrauch finden, indem es Gas mit `gasleft()` in einer `echidna_`-Funktion misst, die einen `int256` zurückgibt, und im Optimierungsmodus ausgeführt wird:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna meldet den gefundenen Maximalwert und die Abfolge von Transaktionen, die ihn erzeugt haben, sobald die Fuzzing-Kampagne beendet ist.
