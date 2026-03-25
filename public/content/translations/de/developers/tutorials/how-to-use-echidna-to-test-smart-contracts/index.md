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

Echidna kann über Docker oder mithilfe der vorkompilierten Binärdatei installiert werden.

### Echidna über Docker {#echidna-through-docker}

```bash
docker run -it --rm -v $PWD:/src trailofbits/eth-security-toolbox
```

_Der letzte Befehl führt die eth-security-toolbox in einem Docker-Container aus, der Zugriff auf Ihr aktuelles Verzeichnis hat. Sie können die Dateien von Ihrem Host aus ändern und die Tools für die Dateien aus dem Docker-Container heraus ausführen._

Führen Sie im Docker-Container Folgendes aus:

```bash
echidna-test /src/contract.sol
```

### Binärdatei {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Einführung in eigenschaftsbasiertes Fuzzing {#introduction-to-property-based-fuzzing}

Echidna ist ein eigenschaftsbasierter Fuzzer, den wir in unseren vorherigen Blogbeiträgen beschrieben haben ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) ist eine bekannte Technik in der Sicherheits-Community. Sie besteht darin, mehr oder weniger zufällige Eingaben zu generieren, um Fehler im Programm zu finden. Fuzzer für herkömmliche Software (wie [AFL](http://lcamtuf.coredump.cx/afl/) oder [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sind als effiziente Tools zur Fehlersuche bekannt.

Über die rein zufällige Generierung von Eingaben hinaus gibt es viele Techniken und Strategien, um gute Eingaben zu generieren, darunter:

- Feedback aus jeder Ausführung einholen und die Generierung damit steuern. Wenn beispielsweise eine neu generierte Eingabe zur Entdeckung eines neuen Pfads führt, kann es sinnvoll sein, neue Eingaben in dessen Nähe zu generieren.
- Generierung der Eingabe unter Einhaltung einer strukturellen Einschränkung. Wenn Ihre Eingabe beispielsweise einen Header mit einer Prüfsumme enthält, ist es sinnvoll, den Fuzzer Eingaben generieren zu lassen, die die Prüfsumme validieren.
- Verwendung bekannter Eingaben zur Generierung neuer Eingaben: Wenn Sie Zugriff auf einen großen Datensatz gültiger Eingaben haben, kann Ihr Fuzzer daraus neue Eingaben generieren, anstatt bei der Generierung ganz von vorn zu beginnen. Diese werden normalerweise als _Seeds_ bezeichnet.

### Eigenschaftsbasiertes Fuzzing {#property-based-fuzzing}

Echidna gehört zu einer bestimmten Familie von Fuzzern: dem eigenschaftsbasierten Fuzzing, das stark von [QuickCheck](https://wikipedia.org/wiki/QuickCheck) inspiriert ist. Im Gegensatz zu klassischen Fuzzern, die versuchen, Abstürze zu finden, versucht Echidna, benutzerdefinierte Invarianten zu brechen.

In Smart Contracts sind Invarianten Solidity-Funktionen, die jeden falschen oder ungültigen Zustand darstellen können, den der Vertrag erreichen kann, einschließlich:

- Falsche Zugriffskontrolle: Der Angreifer wurde zum Eigentümer des Vertrags.
- Falsche Zustandsmaschine: Die Token können übertragen werden, während der Vertrag pausiert ist.
- Falsche Arithmetik: Der Benutzer kann sein Guthaben unterschreiten (Underflow) und unbegrenzt kostenlose Token erhalten.

### Testen einer Eigenschaft mit Echidna {#testing-a-property-with-echidna}

Wir werden sehen, wie man einen Smart Contract mit Echidna testet. Das Ziel ist der folgende Smart Contract [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
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
- Nebeneffekte beim Aufruf einer Eigenschaft verwerfen (d. h. wenn die Eigenschaft eine Zustandsvariable ändert, wird diese nach dem Test verworfen)

Die folgende Eigenschaft überprüft, ob der Aufrufer nicht mehr als 1000 Token hat:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Verwenden Sie Vererbung, um Ihren Vertrag von Ihren Eigenschaften zu trennen:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementiert die Eigenschaft und erbt vom Token.

### Einen Vertrag initiieren {#initiate-a-contract}

Echidna benötigt einen [Konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) ohne Argumente. Wenn Ihr Vertrag eine spezifische Initialisierung benötigt, müssen Sie diese im Konstruktor vornehmen.

Es gibt einige spezifische Adressen in Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, welche den Konstruktor aufruft.
- `0x10000`, `0x20000` und `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, welche zufällig die anderen Funktionen aufrufen.

In unserem aktuellen Beispiel benötigen wir keine besondere Initialisierung, daher ist unser Konstruktor leer.

### Echidna ausführen {#run-echidna}

Echidna wird gestartet mit:

```bash
echidna-test contract.sol
```

Wenn contract.sol mehrere Verträge enthält, können Sie das Ziel angeben:

```bash
echidna-test contract.sol --contract MyContract
```

### Zusammenfassung: Testen einer Eigenschaft {#summary-testing-a-property}

Das Folgende fasst den Lauf von Echidna in unserem Beispiel zusammen:

```bash
echidna-test token.sol
```

```text
...
echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (2596/5000):
    airdrop()
    backdoor()

...
```

Echidna hat herausgefunden, dass die Eigenschaft verletzt wird, wenn `backdoor` aufgerufen wird.

## Filtern von Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden sollen {#filtering-functions-to-call-during-a-fuzzing-campaign}

Wir werden sehen, wie man die zu fuzzenden Funktionen filtert.
Das Ziel ist der folgende Smart Contract:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Dieses kleine Beispiel zwingt Echidna, eine bestimmte Sequenz von Transaktionen zu finden, um eine Zustandsvariable zu ändern.
Dies ist für einen Fuzzer schwierig (es wird empfohlen, ein Tool zur symbolischen Ausführung wie [Manticore](https://github.com/trailofbits/manticore) zu verwenden).
Wir können Echidna ausführen, um dies zu überprüfen:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
...
```

### Funktionen filtern {#filtering-functions}

Echidna hat Schwierigkeiten, die richtige Sequenz zum Testen dieses Vertrags zu finden, da die beiden Reset-Funktionen (`reset1` und `reset2`) alle Zustandsvariablen auf `false` setzen.
Wir können jedoch eine spezielle Echidna-Funktion verwenden, um entweder die Reset-Funktion auf die Blacklist zu setzen oder nur die Funktionen `f`, `g`,
`h` und `i` auf die Whitelist zu setzen.

Um Funktionen auf die Blacklist zu setzen, können wir diese Konfigurationsdatei verwenden:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Ein anderer Ansatz zum Filtern von Funktionen besteht darin, die auf der Whitelist stehenden Funktionen aufzulisten. Dazu können wir diese Konfigurationsdatei verwenden:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` ist standardmäßig `true`.
- Die Filterung erfolgt nur nach Namen (ohne Parameter). Wenn Sie `f()` und `f(uint256)` haben, stimmt der Filter `"f"` mit beiden Funktionen überein.

### Echidna ausführen {#run-echidna-1}

Um Echidna mit einer Konfigurationsdatei `blacklist.yaml` auszuführen:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna wird die Sequenz von Transaktionen zur Falsifizierung der Eigenschaft fast sofort finden.

### Zusammenfassung: Funktionen filtern {#summary-filtering-functions}

Echidna kann Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden sollen, entweder auf die Blacklist oder die Whitelist setzen, indem Folgendes verwendet wird:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```yaml
filterBlacklist: false
filterFunctions: ["f1", "f2", "f3"]
```

Echidna startet eine Fuzzing-Kampagne, bei der entweder `f1`, `f2` und `f3` auf die Blacklist gesetzt werden oder nur diese aufgerufen werden, abhängig vom Wert des booleschen Werts `filterBlacklist`.

## Wie man Soliditys assert mit Echidna testet {#how-to-test-soliditys-assert-with-echidna}

In diesem kurzen Tutorial werden wir zeigen, wie man Echidna verwendet, um die Überprüfung von Zusicherungen (Assertions) in Verträgen zu testen. Nehmen wir an, wir haben einen Vertrag wie diesen:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Eine Zusicherung (Assertion) schreiben {#write-an-assertion}

Wir möchten sicherstellen, dass `tmp` kleiner oder gleich `counter` ist, nachdem die Differenz zurückgegeben wurde. Wir könnten eine Echidna-Eigenschaft schreiben, aber wir müssten den Wert von `tmp` irgendwo speichern. Stattdessen könnten wir eine Zusicherung wie diese verwenden:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Echidna ausführen {#run-echidna-2}

Um das Testen von fehlgeschlagenen Zusicherungen zu aktivieren, erstellen Sie eine [Echidna-Konfigurationsdatei](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Wenn wir diesen Vertrag in Echidna ausführen, erhalten wir die erwarteten Ergebnisse:

```text
echidna-test assert.sol --config config.yaml
Analyzing contract: /tmp/assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(2161168256842006112444943630224269744548897151224254110005047115547016653207)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)
```

Wie Sie sehen können, meldet Echidna einige fehlgeschlagene Zusicherungen in der Funktion `inc`. Es ist möglich, mehr als eine Zusicherung pro Funktion hinzuzufügen, aber Echidna kann nicht sagen, welche Zusicherung fehlgeschlagen ist.

### Wann und wie man Zusicherungen verwendet {#when-and-how-use-assertions}

Zusicherungen können als Alternativen zu expliziten Eigenschaften verwendet werden, insbesondere wenn die zu überprüfenden Bedingungen direkt mit der korrekten Verwendung einer Operation `f` zusammenhängen. Das Hinzufügen von Zusicherungen nach einem Code erzwingt, dass die Überprüfung unmittelbar nach dessen Ausführung stattfindet:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}
```

Im Gegensatz dazu führt die Verwendung einer expliziten Echidna-Eigenschaft Transaktionen zufällig aus, und es gibt keine einfache Möglichkeit, genau zu erzwingen, wann sie überprüft wird. Es ist jedoch möglich, diesen Workaround anzuwenden:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Es gibt jedoch einige Probleme:

- Es schlägt fehl, wenn `f` als `internal` oder `external` deklariert ist.
- Es ist unklar, welche Argumente zum Aufrufen von `f` verwendet werden sollen.
- Wenn `f` rückgängig gemacht wird (reverts), schlägt die Eigenschaft fehl.

Im Allgemeinen empfehlen wir, [John Regehrs Empfehlung](https://blog.regehr.org/archives/1091) zur Verwendung von Zusicherungen zu folgen:

- Erzwingen Sie keine Nebeneffekte während der Überprüfung der Zusicherung. Zum Beispiel: `assert(ChangeStateAndReturn() == 1)`
- Sichern Sie keine offensichtlichen Aussagen zu. Zum Beispiel `assert(var >= 0)`, wobei `var` als `uint` deklariert ist.

Schließlich verwenden Sie bitte **nicht** `require` anstelle von `assert`, da Echidna dies nicht erkennen kann (der Vertrag wird jedoch trotzdem rückgängig gemacht).

### Zusammenfassung: Überprüfung von Zusicherungen {#summary-assertion-checking}

Das Folgende fasst den Lauf von Echidna in unserem Beispiel zusammen:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
```

Echidna hat herausgefunden, dass die Zusicherung in `inc` fehlschlagen kann, wenn diese Funktion mehrmals mit großen Argumenten aufgerufen wird.

## Sammeln und Modifizieren eines Echidna-Korpus {#collecting-and-modifying-an-echidna-corpus}

Wir werden sehen, wie man einen Korpus von Transaktionen mit Echidna sammelt und verwendet. Das Ziel ist der folgende Smart Contract [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == 333);
    require(magic_4 == 0);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Dieses kleine Beispiel zwingt Echidna, bestimmte Werte zu finden, um eine Zustandsvariable zu ändern. Dies ist für einen Fuzzer schwierig
(es wird empfohlen, ein Tool zur symbolischen Ausführung wie [Manticore](https://github.com/trailofbits/manticore) zu verwenden).
Wir können Echidna ausführen, um dies zu überprüfen:

```bash
echidna-test magic.sol
...
echidna_magic_values: passed! 🎉
...
```

Wir können Echidna jedoch weiterhin verwenden, um während dieser Fuzzing-Kampagne einen Korpus zu sammeln.

### Einen Korpus sammeln {#collecting-a-corpus}

Um die Korpussammlung zu aktivieren, erstellen Sie ein Korpusverzeichnis:

```bash
mkdir corpus-magic
```

Und eine [Echidna-Konfigurationsdatei](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Jetzt können wir unser Tool ausführen und den gesammelten Korpus überprüfen:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna kann die richtigen magischen Werte immer noch nicht finden, aber wir können uns den gesammelten Korpus ansehen.
Eine dieser Dateien war beispielsweise:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "9372398522078111428822382693894038718080310667565819743730492509016942339959"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "11237882436254505637692894012452665611739945802153465936579363300050342613311"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "61286718360753647151574642685169272761912591497013628221301130206320371476503"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "10604007310812769281948987101818773906025658755185924380939314050119356472974"
            ],
            "tag": "AbiUInt"
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Offensichtlich wird diese Eingabe den Fehler in unserer Eigenschaft nicht auslösen. Im nächsten Schritt werden wir jedoch sehen, wie wir sie dafür modifizieren können.

### Einen Korpus mit Seeds versehen {#seeding-a-corpus}

Echidna braucht etwas Hilfe, um mit der Funktion `magic` umzugehen. Wir werden die Eingabe kopieren und modifizieren, um geeignete Parameter dafür zu verwenden:

```bash
cp corpus-magic/coverage/2712688662897926208.txt corpus-magic/coverage/new.txt
```

Wir werden `new.txt` so modifizieren, dass `magic(42,129,333,0)` aufgerufen wird. Jetzt können wir Echidna erneut ausführen:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)
```

Dieses Mal wurde sofort festgestellt, dass die Eigenschaft verletzt ist.

## Finden von Transaktionen mit hohem Gasverbrauch {#finding-transactions-with-high-gas-consumption}

Wir werden sehen, wie man mit Echidna die Transaktionen mit hohem Gasverbrauch findet. Das Ziel ist der folgende Smart Contract:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) public {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Hier kann `expensive` einen großen Gasverbrauch haben.

Derzeit benötigt Echidna immer eine Eigenschaft zum Testen: Hier gibt `echidna_test` immer `true` zurück.
Wir können Echidna ausführen, um dies zu überprüfen:

```bash
echidna-test gas.sol
...
echidna_test: passed! 🎉
...
```

### Messung des Gasverbrauchs {#measuring-gas-consumption}

Um den Gasverbrauch mit Echidna zu aktivieren, erstellen Sie eine Konfigurationsdatei `config.yaml`:

```yaml
estimateGas: true
```

In diesem Beispiel werden wir auch die Größe der Transaktionssequenz reduzieren, um die Ergebnisse leichter verständlich zu machen:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna ausführen {#run-echidna-3}

Sobald wir die Konfigurationsdatei erstellt haben, können wir Echidna wie folgt ausführen:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

fuzzing time: 2.73s

C.expensive(uint8) with gas 5463708:
  expensive(255)
  expensive(255)
```

- Das angezeigte Gas ist eine Schätzung, die von [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) bereitgestellt wird.

### Herausfiltern von gasreduzierenden Aufrufen {#filtering-out-gas-reducing-calls}

Das obige Tutorial zum **Filtern von Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden sollen**, zeigt, wie Sie einige Funktionen aus Ihren Tests entfernen können.  
Dies kann entscheidend sein, um eine genaue Gasschätzung zu erhalten.
Betrachten Sie das folgende Beispiel:

```solidity
contract C {
  address[] addrs;

  function push(address a) public {
    addrs.push(a);
  }

  function pop() public {
    addrs.pop();
  }

  function clear() public{
    addrs.length = 0;
  }

  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }

  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Wenn Echidna alle Funktionen aufrufen kann, wird es nicht leicht Transaktionen mit hohen Gaskosten finden:

```text
C.check() with gas 8001:
  push(0x0)
  check()
```

Das liegt daran, dass die Kosten von der Größe von `addrs` abhängen und zufällige Aufrufe dazu neigen, das Array fast leer zu lassen.
Das Setzen von `pop` und `clear` auf die Blacklist liefert uns jedoch viel bessere Ergebnisse:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```text
C.check() with gas 1490968:
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  push(0x0)
  check()
```

### Zusammenfassung: Finden von Transaktionen mit hohem Gasverbrauch {#summary-finding-transactions-with-high-gas-consumption}

Echidna kann Transaktionen mit hohem Gasverbrauch mithilfe der Konfigurationsoption `estimateGas` finden:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
```

Echidna meldet nach Abschluss der Fuzzing-Kampagne für jede Funktion eine Sequenz mit dem maximalen Gasverbrauch.