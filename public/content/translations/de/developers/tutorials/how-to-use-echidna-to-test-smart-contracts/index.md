---
title: So verwenden Sie Echidna zum Testen von Smart Contracts
description: So verwenden Sie Echidna zum automatischen Testen von Smart Contracts
author: "Spuren von bits"
lang: de
tags:
  [
    "solidity",
    "intelligente Verträge",
    "Sicherheit",
    "testen",
    "Fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: "Aufbau sicherer Verträge"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installation {#installation}

Echidna kann über Docker oder durch Verwendung des vorkompilierten Binärprogramms installiert werden.

### Echidna über Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Der letzte Befehl führt die eth-security-toolbox in einem Docker aus, der Zugriff auf dein aktuelles Verzeichnis hat. Du kannst die Dateien von deinem Host aus ändern und die Tools für die Dateien aus dem Docker ausführen_

Führen Sie in Docker Folgendes aus:

```bash
solc-select 0.5.11
cd /home/training
```

### Binär {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Einführung in das eigenschaftsbasierte Fuzzing {#introduction-to-property-based-fuzzing}

Echidna ist ein eigenschaftsbasierter Fuzzer, den wir in unseren vorherigen Blogbeiträgen beschrieben haben ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) ist eine bekannte Technik in der Sicherheits-Community. Sie besteht darin, mehr oder weniger zufällige Eingaben zu generieren, um Fehler im Programm zu finden. Fuzzer für traditionelle Software (wie [AFL](http://lcamtuf.coredump.cx/afl/) oder [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sind als effiziente Werkzeuge zur Fehlersuche bekannt.

Über die rein zufällige Generierung von Eingaben hinaus gibt es viele Techniken und Strategien, um gute Eingaben zu generieren, darunter:

- Feedback aus jeder Ausführung einholen und die Generierung damit steuern. Wenn zum Beispiel eine neu generierte Eingabe zur Entdeckung eines neuen Pfades führt, kann es sinnvoll sein, neue Eingaben in dessen Nähe zu generieren.
- Generierung der Eingabe unter Einhaltung einer strukturellen Beschränkung. Wenn Ihre Eingabe zum Beispiel einen Header mit einer Prüfsumme enthält, ist es sinnvoll, den Fuzzer Eingaben generieren zu lassen, die die Prüfsumme validieren.
- Verwendung bekannter Eingaben zur Generierung neuer Eingaben: Wenn Sie Zugriff auf einen großen Datensatz gültiger Eingaben haben, kann Ihr Fuzzer daraus neue Eingaben generieren, anstatt die Generierung von Grund auf neu zu starten. Diese werden in der Regel _Seeds_ genannt.

### Eigenschaftsbasiertes Fuzzing {#property-based-fuzzing}

Echidna gehört zu einer bestimmten Familie von Fuzzern: dem eigenschaftsbasierten Fuzzing, das stark von [QuickCheck](https://wikipedia.org/wiki/QuickCheck) inspiriert ist. Im Gegensatz zu klassischen Fuzzern, die versuchen, Abstürze zu finden, wird Echidna versuchen, benutzerdefinierte Invarianten zu brechen.

In Smart Contracts sind Invarianten Solidity-Funktionen, die jeden inkorrekten oder ungültigen Zustand, den der Vertrag erreichen kann, darstellen können, einschließlich:

- Falsche Zugriffskontrolle: Der Angreifer wurde zum Eigentümer des Vertrags.
- Falsche Statusmaschine: Die Token können übertragen werden, während der Vertrag pausiert ist.
- Falsche Arithmetik: der Benutzer kann sein Guthaben unterlaufen lassen und unbegrenzt kostenlose Token erhalten.

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

- Jeder kann maximal 1000 Token haben
- Der Token kann nicht übertragen werden (es ist kein ERC20-Token)

### Eine Eigenschaft schreiben {#write-a-property}

Echidna-Eigenschaften sind Solidity-Funktionen. Eine Eigenschaft muss:

- Kein Argument haben
- `true` zurückgeben, wenn es erfolgreich ist
- Der Name muss mit `echidna` beginnen

Echidna wird:

- Automatisch beliebige Transaktionen generieren, um die Eigenschaft zu testen.
- Alle Transaktionen melden, die dazu führen, dass eine Eigenschaft `false` zurückgibt oder einen Fehler auslöst.
- Nebeneffekte beim Aufrufen einer Eigenschaft verwerfen (d. h., wenn die Eigenschaft eine Zustandsvariable ändert, wird sie nach dem Test verworfen)

Die folgende Eigenschaft prüft, dass der Aufrufer nicht mehr als 1000 Token hat:

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

Echidna benötigt einen [Konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) ohne Argument. Wenn Ihr Vertrag eine spezifische Initialisierung benötigt, müssen Sie dies im Konstruktor tun.

Es gibt einige spezifische Adressen in Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, die den Konstruktor aufruft.
- `0x10000`, `0x20000`, und `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, die zufällig die anderen Funktionen aufrufen.

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

Das Folgende fasst die Ausführung von Echidna an unserem Beispiel zusammen:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
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
Das ist schwierig für einen Fuzzer (es wird empfohlen, ein symbolisches Ausführungswerkzeug wie [Manticore](https://github.com/trailofbits/manticore) zu verwenden).
Wir können Echidna ausführen, um dies zu überprüfen:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filterfunktionen {#filtering-functions}

Echidna hat Schwierigkeiten, die richtige Sequenz zum Testen dieses Vertrags zu finden, da die beiden Reset-Funktionen (`reset1` und `reset2`) alle Zustandsvariablen auf `false` setzen.
Wir können jedoch eine spezielle Echidna-Funktion verwenden, um entweder die Reset-Funktion auf eine schwarze Liste zu setzen oder nur die Funktionen `f`, `g`,
`h` und `i` auf eine weiße Liste zu setzen.

Um Funktionen auf die schwarze Liste zu setzen, können wir diese Konfigurationsdatei verwenden:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Ein anderer Ansatz zum Filtern von Funktionen besteht darin, die auf der weißen Liste stehenden Funktionen aufzulisten. Dazu können wir diese Konfigurationsdatei verwenden:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` ist standardmäßig `true`.
- Die Filterung erfolgt nur nach Namen (ohne Parameter). Wenn Sie `f()` und `f(uint256)` haben, wird der Filter `"f"` auf beide Funktionen passen.

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

Echidna wird die Sequenz der Transaktionen, um die Eigenschaft zu widerlegen, fast sofort finden.

### Zusammenfassung: Filterfunktionen {#summary-filtering-functions}

Echidna kann während einer Fuzzing-Kampagne entweder Funktionen auf eine schwarze oder eine weiße Liste setzen, indem es Folgendes verwendet:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna startet eine Fuzzing-Kampagne, bei der `f1`, `f2` und `f3` entweder auf der schwarzen Liste stehen oder nur diese aufgerufen werden, je nach dem Wert des `filterBlacklist`-Booleans.

## Wie man Soliditys `assert` mit Echidna testet {#how-to-test-soliditys-assert-with-echidna}

In diesem kurzen Tutorial zeigen wir, wie man Echidna zum Testen der Assertionsprüfung in Verträgen verwendet. Nehmen wir an, wir haben einen Vertrag wie diesen:

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

### Eine Assertion schreiben {#write-an-assertion}

Wir wollen sicherstellen, dass `tmp` kleiner oder gleich `counter` ist, nachdem die Differenz zurückgegeben wurde. Wir könnten eine
Echidna-Eigenschaft schreiben, aber wir müssten den `tmp`-Wert irgendwo speichern. Stattdessen könnten wir eine Assertion wie diese verwenden:

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

Um das Testen von Assertionsfehlern zu aktivieren, erstellen Sie eine [Echidna-Konfigurationsdatei](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Wenn wir diesen Vertrag in Echidna ausführen, erhalten wir die erwarteten Ergebnisse:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Wie Sie sehen können, meldet Echidna einen Assertionsfehler in der `inc`-Funktion. Das Hinzufügen von mehr als einer Assertion pro Funktion ist möglich, aber Echidna kann nicht sagen, welche Assertion fehlgeschlagen ist.

### Wann und wie man Assertions verwendet {#when-and-how-use-assertions}

Assertions können als Alternative zu expliziten Eigenschaften verwendet werden, insbesondere wenn die zu prüfenden Bedingungen direkt mit der korrekten Verwendung einer Operation `f` zusammenhängen. Das Hinzufügen von Assertions nach einem Code erzwingt, dass die Prüfung unmittelbar nach dessen Ausführung stattfindet:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Im Gegenteil, die Verwendung einer expliziten Echidna-Eigenschaft führt zu einer zufälligen Ausführung von Transaktionen, und es gibt keine einfache Möglichkeit, genau zu erzwingen, wann sie überprüft wird. Es ist immer noch möglich, diesen Workaround zu verwenden:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Es gibt jedoch einige Probleme:

- Es schlägt fehl, wenn `f` als `internal` oder `external` deklariert ist.
- Es ist unklar, welche Argumente zum Aufrufen von `f` verwendet werden sollen.
- Wenn `f` fehlschlägt, wird die Eigenschaft ebenfalls fehlschlagen.

Im Allgemeinen empfehlen wir, [John Regehrs Empfehlung](https://blog.regehr.org/archives/1091) zur Verwendung von Assertions zu folgen:

- Erzwingen Sie keine Nebeneffekte während der Assertionsprüfung. Zum Beispiel: `assert(ChangeStateAndReturn() == 1)`
- Behaupten Sie keine offensichtlichen Aussagen. Zum Beispiel `assert(var >= 0)`, wobei `var` als `uint` deklariert ist.

Schließlich, bitte **verwenden Sie nicht** `require` anstelle von `assert`, da Echidna es nicht erkennen kann (aber der Vertrag wird trotzdem fehlschlagen).

### Zusammenfassung: Assertionsprüfung {#summary-assertion-checking}

Das Folgende fasst die Ausführung von Echidna an unserem Beispiel zusammen:

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
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna hat herausgefunden, dass die Assertion in `inc` fehlschlagen kann, wenn diese Funktion mehrmals mit großen Argumenten aufgerufen wird.

## Sammeln und Modifizieren eines Echidna-Korpus {#collecting-and-modifying-an-echidna-corpus}

Wir werden sehen, wie man mit Echidna einen Korpus von Transaktionen sammelt und verwendet. Das Ziel ist der folgende Smart Contract [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Dieses kleine Beispiel zwingt Echidna, bestimmte Werte zu finden, um eine Zustandsvariable zu ändern. Das ist schwierig für einen Fuzzer
(es wird empfohlen, ein symbolisches Ausführungswerkzeug wie [Manticore](https://github.com/trailofbits/manticore) zu verwenden).
Wir können Echidna ausführen, um dies zu überprüfen:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Wir können Echidna jedoch immer noch verwenden, um während dieser Fuzzing-Kampagne einen Korpus zu sammeln.

### Einen Korpus sammeln {#collecting-a-corpus}

Um die Korpus-Sammlung zu aktivieren, erstellen Sie ein Korpus-Verzeichnis:

```bash
mkdir corpus-magic
```

Und eine [Echidna-Konfigurationsdatei](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Jetzt können wir unser Werkzeug ausführen und den gesammelten Korpus überprüfen:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna kann immer noch nicht die richtigen magischen Werte finden, aber wir können uns den Korpus ansehen, den es gesammelt hat.
Eine dieser Dateien war zum Beispiel:

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
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Offensichtlich wird diese Eingabe den Fehler in unserer Eigenschaft nicht auslösen. Im nächsten Schritt werden wir jedoch sehen, wie wir sie dafür modifizieren können.

### Einen Korpus mit Startwerten versehen {#seeding-a-corpus}

Echidna benötigt etwas Hilfe, um mit der `magic`-Funktion umzugehen. Wir werden die Eingabe kopieren und modifizieren, um geeignete
Parameter dafür zu verwenden:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Wir werden `new.txt` modifizieren, um `magic(42,129,333,0)` aufzurufen. Jetzt können wir Echidna erneut ausführen:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Dieses Mal wurde sofort festgestellt, dass die Eigenschaft verletzt wird.

## Transaktionen mit hohem Gasverbrauch finden {#finding-transactions-with-high-gas-consumption}

Wir werden sehen, wie man mit Echidna die Transaktionen mit hohem Gasverbrauch findet. Das Ziel ist der folgende Smart Contract:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Hier kann `expensive` einen hohen Gasverbrauch haben.

Derzeit benötigt Echidna immer eine Eigenschaft zum Testen: hier gibt `echidna_test` immer `true` zurück.
Wir können Echidna ausführen, um dies zu überprüfen:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Gasverbrauch messen {#measuring-gas-consumption}

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

Sobald wir die Konfigurationsdatei erstellt haben, können wir Echidna so ausführen:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Das angezeigte Gas ist eine Schätzung, die von [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) bereitgestellt wird.

### Gasreduzierende Aufrufe herausfiltern {#filtering-out-gas-reducing-calls}

Das Tutorial zum **Filtern von Funktionen, die während einer Fuzzing-Kampagne aufgerufen werden** oben zeigt, wie man
einige Funktionen aus dem Test entfernt.  
Dies kann entscheidend sein, um eine genaue Gasschätzung zu erhalten.
Betrachte das folgende Beispiel:

```solidity
contract C {
  address [] addrs;
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

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Das liegt daran, dass die Kosten von der Größe von `addrs` abhängen und zufällige Aufrufe dazu neigen, das Array fast leer zu lassen.
Das Setzen von `pop` und `clear` auf die schwarze Liste liefert uns jedoch viel bessere Ergebnisse:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Zusammenfassung: Finden von Transaktionen mit hohem Gasverbrauch {#summary-finding-transactions-with-high-gas-consumption}

Echidna kann Transaktionen mit hohem Gasverbrauch finden, indem es die Konfigurationsoption `estimateGas` verwendet:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna wird nach Abschluss der Fuzzing-Kampagne für jede Funktion eine Sequenz mit dem maximalen Gasverbrauch melden.
