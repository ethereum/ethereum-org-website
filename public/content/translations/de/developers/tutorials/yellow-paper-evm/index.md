---
title: Die EVM-Spezifikationen des Yellow Papers verstehen
description: "Den Teil des Yellow Papers verstehen, der die formalen Spezifikationen für Ethereum enthält und die Ethereum Virtual Machine (EVM) erklärt."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: Yellow Paper EVM
lang: de
published: 2022-05-15
---

[Das Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) ist die formale Spezifikation für Ethereum. Abgesehen von Änderungen durch [den EIP-Prozess](/eips/) enthält es die genaue Beschreibung, wie alles funktioniert. Es ist als mathematisches Papier verfasst, das Terminologie enthält, die Programmierern möglicherweise nicht vertraut ist. In diesem Artikel lernen Sie, wie man es liest, und im weiteren Sinne auch andere verwandte mathematische Papiere.

## Welches Yellow Paper? {#which-yellow-paper}

Wie fast alles andere bei Ethereum entwickelt sich auch das Yellow Paper im Laufe der Zeit weiter. Um auf eine bestimmte Version verweisen zu können, habe ich [die Version hochgeladen, die zum Zeitpunkt des Schreibens aktuell war](yellow-paper-berlin.pdf) (die Berlin-Version, 2022). Die Abschnitts-, Seiten- und Gleichungsnummern in diesem Tutorial beziehen sich auf diese Version. [Die neueste Version](https://ethereum.github.io/yellowpaper/paper.pdf) wurde seitdem aktualisiert, daher können ihre Nummern abweichen. Es ist eine gute Idee, sie in einem anderen Fenster geöffnet zu haben, während Sie dieses Dokument lesen.

### Warum die EVM? {#why-the-evm}

Das ursprüngliche Yellow Paper wurde ganz zu Beginn der Entwicklung von Ethereum verfasst. Es beschreibt den ursprünglichen Proof-of-Work-basierten Konsensmechanismus, der ursprünglich zur Sicherung des Netzwerks verwendet wurde. Ethereum hat jedoch Proof-of-Work abgeschaltet und im September 2022 begonnen, einen Proof-of-Stake-basierten Konsens zu verwenden. Dieses Tutorial konzentriert sich auf die Teile des Yellow Papers, die die Virtuelle Ethereum-Maschine (EVM) definieren. Der Übergang zu Proof-of-Stake hat die EVM kaum verändert: Der Opcode `DIFFICULTY` (0x44) wurde in [`PREVRANDAO`](https://eips.ethereum.org/EIPS/eip-4399) umbenannt und gibt nun einen zufälligen Wert von der Beacon Chain zurück.

Spätere Netzwerk-Upgrades haben die EVM jedoch verändert. Sie fügten Opcodes wie [`PUSH0`](https://eips.ethereum.org/EIPS/eip-3855), [`TLOAD` und `TSTORE`](https://eips.ethereum.org/EIPS/eip-1153) (transienter Speicher), [`MCOPY`](https://eips.ethereum.org/EIPS/eip-5656), [`BLOBHASH`](https://eips.ethereum.org/EIPS/eip-4844) und [`BLOBBASEFEE`](https://eips.ethereum.org/EIPS/eip-7516) hinzu und änderten das Verhalten von [`SELFDESTRUCT`](https://eips.ethereum.org/EIPS/eip-6780). Das Yellow Paper deckt nicht alle diese Änderungen ab. Die aktuellste Spezifikation ist die [Python-Spezifikation der Ausführungsschicht](https://github.com/ethereum/execution-specs).

## 9 Ausführungsmodell {#9-execution-model}

Dieser Abschnitt (S. 14-16) enthält den Großteil der Definition der EVM.

Der Begriff _Systemzustand_ (system state) umfasst alles, was Sie über das System wissen müssen, um es auszuführen. In einem typischen Computer bedeutet dies den Speicher, den Inhalt von Registern usw.

Eine [Turingmaschine](https://en.wikipedia.org/wiki/Turing_machine) ist ein Berechnungsmodell. Im Wesentlichen handelt es sich um eine vereinfachte Version eines Computers, von der bewiesen ist, dass sie dieselbe Fähigkeit zur Ausführung von Berechnungen besitzt wie ein normaler Computer (alles, was ein Computer berechnen kann, kann auch eine Turingmaschine berechnen und umgekehrt). Dieses Modell erleichtert es, verschiedene Theoreme darüber zu beweisen, was berechenbar ist und was nicht.

Der Begriff [Turing-vollständig](https://en.wikipedia.org/wiki/Turing_completeness) bezeichnet einen Computer, der dieselben Berechnungen wie eine Turingmaschine ausführen kann. Turingmaschinen können in Endlosschleifen geraten, die EVM jedoch nicht, da ihr das Gas ausgehen würde. Daher ist sie nur quasi-Turing-vollständig.
## 9.1 Grundlagen {#91-basics}

Dieser Abschnitt vermittelt die Grundlagen der EVM und wie sie im Vergleich zu anderen Berechnungsmodellen abschneidet.

Eine [Kellermaschine](https://en.wikipedia.org/wiki/Stack_machine) (Stack Machine) ist ein Computer, der Zwischendaten nicht in Registern, sondern in einem [**Stack**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) (Stapelspeicher) speichert. Dies ist die bevorzugte Architektur für virtuelle Maschinen, da sie einfach zu implementieren ist, was bedeutet, dass Fehler und Sicherheitslücken viel unwahrscheinlicher sind. Der Speicher im Stack ist in 256-Bit-Wörter unterteilt. Dies wurde gewählt, weil es für die kryptografischen Kernoperationen von Ethereum wie Keccak-256-Hashing und Berechnungen auf elliptischen Kurven praktisch ist. Die maximale Größe des Stacks beträgt 1024 Elemente (1024 x 256 Bit). Wenn Opcodes ausgeführt werden, beziehen sie ihre Parameter normalerweise aus dem Stack. Es gibt Opcodes speziell für die Neuordnung von Elementen im Stack, wie z. B. `POP` (entfernt das oberste Element vom Stack), `DUP_N` (dupliziert das N-te Element im Stack) usw.

Die EVM verfügt auch über einen flüchtigen Bereich namens **Memory** (Arbeitsspeicher), der zum Speichern von Daten während der Ausführung verwendet wird. Dieser Speicher ist in 32-Byte-Wörter organisiert. Alle Speicherorte werden mit null initialisiert. Wenn Sie diesen [Yul](https://docs.soliditylang.org/en/latest/yul.html)-Code ausführen, um ein Wort zum Memory hinzuzufügen, füllt er 32 Bytes des Memorys, indem er den leeren Platz im Wort mit Nullen auffüllt, d. h. er erstellt ein Wort – mit Nullen an den Positionen 0-29, 0x60 an 30 und 0xA7 an 31.

```yul
mstore(0, 0x60A7)
```

`mstore` ist einer von drei Opcodes, die die EVM für die Interaktion mit dem Memory bereitstellt – er lädt ein Wort in das Memory. Die anderen beiden sind `mstore8`, der ein einzelnes Byte in das Memory lädt, und `mload`, der ein Wort aus dem Memory in den Stack verschiebt.

Die EVM verfügt außerdem über ein separates, nichtflüchtiges **Storage**-Modell (Speicher), das als Teil des Systemzustands verwaltet wird – dieser Speicher ordnet 256-Bit-Schlüssel 256-Bit-Werten zu (im Gegensatz zum Memory, das ein byteadressierbares Array ist). In diesem Storage bewahren Verträge persistente Daten auf – ein Vertrag kann nur mit seinem eigenen Storage interagieren. Der Storage ist in Schlüssel-Wert-Zuordnungen organisiert.

Seit dem Cancun-Upgrade gibt es auch **transienten Speicher** (transient storage) ([EIP-1153](https://eips.ethereum.org/EIPS/eip-1153)). Auf ihn wird wie auf den Storage zugegriffen, unter Verwendung der Opcodes `TLOAD` und `TSTORE`, aber er wird am Ende jeder Transaktion geleert.

Obwohl es in diesem Abschnitt des Yellow Papers nicht erwähnt wird, ist es auch nützlich zu wissen, dass es noch eine weitere Art von Speicher gibt. **Aufrufdaten** (Calldata) sind ein byteadressierbarer Nur-Lese-Speicher, der verwendet wird, um den Wert zu speichern, der mit dem Parameter `data` einer Transaktion übergeben wird. Die EVM verfügt über spezifische Opcodes zur Verwaltung von `calldata`. `calldatasize` gibt die Größe der Daten zurück. `calldataload` lädt die Daten in den Stack. `calldatacopy` kopiert die Daten in das Memory.

Die standardmäßige [Von-Neumann-Architektur](https://en.wikipedia.org/wiki/Von_Neumann_architecture) speichert Code und Daten im selben Speicher. Die EVM folgt diesem Standard aus Sicherheitsgründen nicht – die gemeinsame Nutzung von flüchtigem Speicher macht es möglich, Programmcode zu ändern. Stattdessen wird Code unveränderlich als Teil des Kontos des Vertrags im Weltzustand gespeichert, getrennt sowohl vom Memory als auch vom Storage des Vertrags.

Es gibt nur zwei Fälle, in denen Code aus dem Memory ausgeführt wird:

- Wenn ein Vertrag einen anderen Vertrag erstellt (unter Verwendung von [`CREATE`](https://www.evm.codes/#f0) oder [`CREATE2`](https://www.evm.codes/#f5)), stammt der Code für den Konstruktor des Vertrags aus dem Memory.
- Während der Erstellung _jedes_ Vertrags wird der Konstruktor-Code ausgeführt und kehrt dann mit dem Code des eigentlichen Vertrags zurück, ebenfalls aus dem Memory.

Der Begriff außergewöhnliche Ausführung (exceptional execution) bezeichnet eine Ausnahme, die dazu führt, dass die Ausführung des aktuellen Vertrags angehalten wird.

## 9.2 Gebührenübersicht {#92-fees-overview}

Dieser Abschnitt erklärt, wie die Gasgebühren berechnet werden. Es gibt drei Kostenarten:

### Opcode-Kosten {#opcode-cost}

Die inhärenten Kosten des spezifischen Opcodes. Um diesen Wert zu erhalten, suchen Sie die Kostengruppe des Opcodes in Anhang H (S. 29, unter Gleichung (329)) und finden Sie die Kostengruppe in Gleichung (326). Dies liefert Ihnen eine Kostenfunktion, die in den meisten Fällen Parameter aus Anhang G (S. 28) verwendet.

Zum Beispiel ist der Opcode [`CALLDATACOPY`](https://www.evm.codes/#37) ein Mitglied der Gruppe _W<sub>copy</sub>_. Die Opcode-Kosten für diese Gruppe betragen _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Ein Blick in Anhang G zeigt, dass beide Konstanten 3 sind, was uns _3+3×⌈μ<sub>s</sub>[2]÷32⌉_ ergibt.

Wir müssen noch den Ausdruck _⌈μ<sub>s</sub>[2]÷32⌉_ entschlüsseln. Der äußerste Teil, _⌈ \<value\> ⌉_, ist die Aufrundungsfunktion (Ceiling-Funktion), eine Funktion, die für einen gegebenen Wert die kleinste ganze Zahl zurückgibt, die nicht kleiner als der Wert ist. Zum Beispiel _⌈2.5⌉ = ⌈3⌉ = 3_. Der innere Teil ist _μ<sub>s</sub>[2]÷32_. Ein Blick auf Abschnitt 3 (Konventionen) auf S. 3 zeigt, dass _μ_ der Maschinenzustand ist. Der Maschinenzustand ist in Abschnitt 9.4.1 auf S. 15 definiert. Laut diesem Abschnitt ist einer der Parameter des Maschinenzustands _s_ für den Stack. Wenn man alles zusammennimmt, scheint _μ<sub>s</sub>[2]_ die Position #2 im Stack zu sein. Wenn man sich [den Opcode](https://www.evm.codes/#37) ansieht, ist die Position #2 im Stack die Größe der Daten in Bytes. Wenn man sich die anderen Opcodes in der Gruppe W<sub>copy</sub> ansieht, [`CODECOPY`](https://www.evm.codes/#39) und [`RETURNDATACOPY`](https://www.evm.codes/#3e), haben diese ebenfalls eine Datengröße an derselben Position. Also ist _⌈μ<sub>s</sub>[2]÷32⌉_ die Anzahl der 32-Byte-Wörter, die erforderlich sind, um die zu kopierenden Daten zu speichern. Alles in allem betragen die inhärenten Kosten von [`CALLDATACOPY`](https://www.evm.codes/#37) 3 Gas plus 3 pro kopiertem Datenwort.
### Ausführungskosten {#running-cost}

Die Kosten für die Ausführung des Codes, den wir aufrufen.

- Im Falle von [`CREATE`](https://www.evm.codes/#f0) und [`CREATE2`](https://www.evm.codes/#f5) der Konstruktor für den neuen Vertrag.
- Im Falle von [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) oder [`DELEGATECALL`](https://www.evm.codes/#f4) der Vertrag, den wir aufrufen.

### Kosten für die Speichererweiterung {#expanding-memory-cost}

Die Kosten für die Erweiterung des Memory-Speichers (falls erforderlich).

In Gleichung 326 wird dieser Wert als _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_ geschrieben. Wenn wir uns Abschnitt 9.4.1 noch einmal ansehen, sehen wir, dass _μ<sub>i</sub>_ die Anzahl der Wörter im Memory-Speicher ist. Also ist _μ<sub>i</sub>_ die Anzahl der Wörter im Memory-Speicher vor dem Opcode und _μ<sub>i</sub>'_ ist die Anzahl der Wörter im Memory-Speicher nach dem Opcode.

Die Funktion _C<sub>mem</sub>_ ist in Gleichung 328 definiert: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ ist die Abrundungsfunktion (Floor-Funktion), eine Funktion, die für einen gegebenen Wert die größte ganze Zahl zurückgibt, die nicht größer als der Wert ist. Zum Beispiel _⌊2.5⌋ = ⌊2⌋ = 2._ Wenn _a < √512_, ist _a<sup>2</sup> < 512_, und das Ergebnis der Abrundungsfunktion ist null. Für die ersten 22 Wörter (704 Bytes) steigen die Kosten also linear mit der Anzahl der benötigten Speicherwörter. Jenseits dieses Punktes ist _⌊a<sup>2</sup> ÷ 512⌋_ positiv. Wenn der benötigte Speicher groß genug ist, sind die Gas-Kosten proportional zum Quadrat der Speichermenge.

**Hinweis**, dass diese Faktoren nur die _inhärenten_ Gas-Kosten beeinflussen – sie berücksichtigen nicht den Gebührenmarkt oder Trinkgelder für Validatoren, die bestimmen, wie viel ein Endbenutzer zahlen muss – dies sind nur die reinen Kosten für die Ausführung einer bestimmten Operation auf der EVM.

[Lesen Sie mehr über Gas](/developers/docs/gas/).
## 9.3 Ausführungsumgebung {#93-execution-env}

Die Ausführungsumgebung ist ein Tupel, _I_, das Informationen enthält, die nicht Teil des Blockchain-Zustands oder der EVM sind.

| Parameter       | Opcode für den Zugriff auf die Daten                                                                                        | Solidity-Code für den Zugriff auf die Daten         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35) usw.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Block-Header-Felder, wie [`NUMBER`](https://www.evm.codes/#43) und [`PREVRANDAO`](https://www.evm.codes/#44) | `block.number`, `block.prevrandao` usw. |
| _I<sub>e</sub>_ | Tiefe des Aufruf-Stacks für Aufrufe zwischen Verträgen (einschließlich Vertragserstellung)                                |
| _I<sub>w</sub>_ | Darf die EVM den Zustand ändern oder läuft sie statisch?                                                  |

Einige weitere Parameter sind notwendig, um den Rest von Abschnitt 9 zu verstehen:

| Parameter | Definiert in Abschnitt   | Bedeutung                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (S. 2, Gleichung 1) | Der Zustand der Blockchain                                                                                                                                                                                              |
| _g_       | 9.3 (S. 14)          | Verbleibendes Gas                                                                                                                                                                                                            |
| _A_       | 6.1 (S. 9)           | Aufgelaufener Teilzustand (Änderungen, die für das Ende der Transaktion geplant sind)                                                                                                                                                       |
| _o_       | 9.3 (S. 14)          | Ausgabe – das zurückgegebene Ergebnis im Falle einer internen Transaktion (wenn ein Vertrag einen anderen aufruft) und bei Aufrufen von View-Funktionen (wenn Sie nur nach Informationen fragen, sodass nicht auf eine Transaktion gewartet werden muss) |

## 9.4 Ausführungsübersicht {#94-execution-overview}

Nachdem wir nun alle Vorbereitungen getroffen haben, können wir uns endlich damit befassen, wie die EVM funktioniert.

Die Gleichungen 146-151 geben uns die Anfangsbedingungen für die Ausführung der EVM:

| Symbol           | Anfangswert   | Bedeutung                                                                                                                                                                                                                                                                                       |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Verbleibendes Gas                                                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_           | Programmzähler (Program Counter), die Adresse der nächsten auszuführenden Anweisung                                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memory-Speicher, komplett mit Nullen initialisiert                                                                                                                                                                                                                                              |
| _μ<sub>i</sub>_  | _0_           | Höchste verwendete Speicheradresse                                                                                                                                                                                                                                                              |
| _μ<sub>s</sub>_  | _()_          | Der Stack, anfangs leer                                                                                                                                                                                                                                                                         |
| _μ<sub>o</sub>_  | _∅_           | Die Ausgabe, eine leere Menge, bis und sofern wir nicht entweder mit Rückgabedaten ([`RETURN`](https://www.evm.codes/#f3) oder [`REVERT`](https://www.evm.codes/#fd)) oder ohne diese ([`STOP`](https://www.evm.codes/#00) oder [`SELFDESTRUCT`](https://www.evm.codes/#ff)) anhalten. |

Gleichung 152 besagt, dass es zu jedem Zeitpunkt während der Ausführung vier mögliche Bedingungen gibt und was mit ihnen zu tun ist:

1.  `Z(σ,μ,A,I)`. Z stellt eine Funktion dar, die testet, ob eine Operation einen ungültigen Zustandsübergang erzeugt (siehe [außergewöhnliches Anhalten](#942-exceptional-halt)). Wenn sie als True (Wahr) ausgewertet wird, ist der neue Zustand identisch mit dem alten (außer dass Gas verbrannt wird), da die Änderungen nicht implementiert wurden.
2.  Wenn der ausgeführte Opcode [`REVERT`](https://www.evm.codes/#fd) ist, entspricht der neue Zustand dem alten Zustand, wobei etwas Gas verloren geht.
3.  Wenn die Abfolge von Operationen abgeschlossen ist, was durch ein [`RETURN`](https://www.evm.codes/#f3) signalisiert wird, wird der Zustand auf den neuen Zustand aktualisiert.
4.  Wenn wir uns nicht in einer der Endbedingungen 1-3 befinden, wird die Ausführung fortgesetzt.
## 9.4.1 Maschinenzustand {#941-machine-state}

Dieser Abschnitt erklärt den Maschinenzustand genauer. Er legt fest, dass _w_ der aktuelle Opcode ist. Wenn _μ<sub>pc</sub>_ kleiner als _||I<sub>b</sub>||_, die Länge des Codes, ist, dann ist dieses Byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) der Opcode. Andernfalls ist der Opcode als [`STOP`](https://www.evm.codes/#00) definiert.

Da es sich um eine [Kellermaschine](https://en.wikipedia.org/wiki/Stack_machine) handelt, müssen wir die Anzahl der Elemente im Auge behalten, die von jedem Opcode entnommen (_δ_) und hinzugefügt (_α_) werden.

## 9.4.2 Außergewöhnliches Anhalten (Exceptional Halting) {#942-exceptional-halt}

Dieser Abschnitt definiert die Funktion _Z_, die angibt, wann wir einen abnormalen Abbruch haben. Dies ist eine [Boolesche](https://en.wikipedia.org/wiki/Boolean_data_type) Funktion, daher verwendet sie [_∨_ für ein logisches Oder](https://en.wikipedia.org/wiki/Logical_disjunction) und [_∧_ für ein logisches Und](https://en.wikipedia.org/wiki/Logical_conjunction).

Wir haben ein außergewöhnliches Anhalten (exceptional halt), wenn eine dieser Bedingungen wahr ist:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Wie wir in Abschnitt 9.2 gesehen haben, ist _C_ die Funktion, die die Gas-Kosten angibt. Es ist nicht mehr genug Gas übrig, um den nächsten Opcode abzudecken.

- **_δ<sub>w</sub>=∅_**
  Wenn die Anzahl der für einen Opcode entnommenen Elemente undefiniert ist, dann ist der Opcode selbst undefiniert.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack-Unterlauf (Stack underflow), nicht genügend Elemente im Stack für den aktuellen Opcode.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Der Opcode ist [`JUMP`](https://www.evm.codes/#56) und die Adresse ist kein [`JUMPDEST`](https://www.evm.codes/#5b). Sprünge sind _nur_ gültig, wenn das Ziel ein [`JUMPDEST`](https://www.evm.codes/#5b) ist.

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Der Opcode ist [`JUMPI`](https://www.evm.codes/#57), die Bedingung ist wahr (ungleich null), also sollte der Sprung stattfinden, und die Adresse ist kein [`JUMPDEST`](https://www.evm.codes/#5b). Sprünge sind _nur_ gültig, wenn das Ziel ein [`JUMPDEST`](https://www.evm.codes/#5b) ist.

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Der Opcode ist [`RETURNDATACOPY`](https://www.evm.codes/#3e). Bei diesem Opcode ist das Stack-Element _μ<sub>s</sub>[1]_ der Offset, ab dem im Rückgabedatenpuffer gelesen werden soll, und das Stack-Element _μ<sub>s</sub>[2]_ ist die Länge der Daten. Diese Bedingung tritt auf, wenn Sie versuchen, über das Ende des Rückgabedatenpuffers hinaus zu lesen. Beachten Sie, dass es keine ähnliche Bedingung für die Aufrufdaten oder für den Code selbst gibt. Wenn Sie versuchen, über das Ende dieser Puffer hinaus zu lesen, erhalten Sie einfach Nullen.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Stack-Überlauf (Stack overflow). Wenn die Ausführung des Opcodes zu einem Stack von über 1024 Elementen führt, wird abgebrochen.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Laufen wir statisch ([¬ ist die Negation](https://en.wikipedia.org/wiki/Negation) und _I<sub>w</sub>_ ist wahr, wenn wir den Zustand der Blockchain ändern dürfen)? Wenn ja, und wir versuchen eine zustandsändernde Operation, kann diese nicht stattfinden.

  Die Funktion _W(w,μ)_ wird später in Gleichung 159 definiert. _W(w,μ)_ ist wahr, wenn eine dieser Bedingungen wahr ist:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Diese Opcodes ändern den Zustand, entweder durch Erstellen eines neuen Vertrags, Speichern eines Wertes oder Zerstören des aktuellen Vertrags. `TSTORE`, der nach dieser Version des Yellow Papers hinzugefügt wurde, ist in einem statischen Kontext ebenfalls verboten.

  - **_LOG0≤w ∧ w≤LOG4_**
    Wenn wir statisch aufgerufen werden, können wir keine Log-Einträge ausgeben.
    Die Log-Opcodes liegen alle im Bereich zwischen [`LOG0` (A0)](https://www.evm.codes/#a0) und [`LOG4` (A4)](https://www.evm.codes/#a4).
    Die Zahl nach dem Log-Opcode gibt an, wie viele Topics der Log-Eintrag enthält.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Sie können einen anderen Vertrag aufrufen, wenn Sie statisch sind, aber wenn Sie dies tun, können Sie keine ETH an ihn transferieren.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Sie können [`SSTORE`](https://www.evm.codes/#55) nicht ausführen, es sei denn, Sie haben mehr als G<sub>callstipend</sub> (in Anhang G als 2300 definiert) Gas.

## 9.4.3 Gültigkeit des Sprungziels (Jump Destination Validity) {#943-jump-dest-valid}

Hier definieren wir formal, was die [`JUMPDEST`](https://www.evm.codes/#5b)-Opcodes sind. Wir können nicht einfach nach dem Bytewert 0x5B suchen, da er sich innerhalb eines PUSH befinden könnte (und somit Daten und kein Opcode wäre).

In Gleichung (162) definieren wir eine Funktion, _N(i,w)_. Der erste Parameter, _i_, ist die Position des Opcodes. Der zweite, _w_, ist der Opcode selbst. Wenn _w∈[PUSH1, PUSH32]_, bedeutet das, dass der Opcode ein PUSH ist (eckige Klammern definieren einen Bereich, der die Endpunkte einschließt). In diesem Fall befindet sich der nächste Opcode bei _i+2+(w−PUSH1)_. Für [`PUSH1`](https://www.evm.codes/#60) müssen wir um zwei Bytes vorrücken (das PUSH selbst und der Ein-Byte-Wert), für [`PUSH2`](https://www.evm.codes/#61) müssen wir um drei Bytes vorrücken, da es sich um einen Zwei-Byte-Wert handelt, usw. Alle anderen EVM-Opcodes sind nur ein Byte lang, also ist in allen anderen Fällen _N(i,w)=i+1_.

Diese Funktion wird in Gleichung (161) verwendet, um _D<sub>J</sub>(c,i)_ zu definieren, was die [Menge](<https://en.wikipedia.org/wiki/Set_(mathematics)>) aller gültigen Sprungziele im Code _c_ ist, beginnend mit der Opcode-Position _i_. Diese Funktion ist rekursiv definiert. Wenn _i≥||c||_, bedeutet das, dass wir uns am oder nach dem Ende des Codes befinden. Wir werden keine weiteren Sprungziele finden, also geben wir einfach die leere Menge zurück.

In allen anderen Fällen betrachten wir den Rest des Codes, indem wir zum nächsten Opcode gehen und die Menge ab diesem abrufen. _c[i]_ ist der aktuelle Opcode, also ist _N(i,c[i])_ die Position des nächsten Opcodes. _D<sub>J</sub>(c,N(i,c[i]))_ ist daher die Menge der gültigen Sprungziele, die beim nächsten Opcode beginnt. Wenn der aktuelle Opcode kein `JUMPDEST` ist, geben Sie einfach diese Menge zurück. Wenn es ein `JUMPDEST` ist, fügen Sie es in die Ergebnismenge ein und geben Sie diese zurück.
## 9.4.4 Normales Anhalten {#944-normal-halt}

Die Haltefunktion _H_ kann drei Arten von Werten zurückgeben.

- Wenn wir uns nicht in einem Halte-Opcode befinden, wird _∅_, die leere Menge, zurückgegeben. Konventionsgemäß wird dieser Wert als Boolesches False (Falsch) interpretiert.
- Wenn wir einen Halte-Opcode haben, der keine Ausgabe erzeugt (entweder [`STOP`](https://www.evm.codes/#00) oder [`SELFDESTRUCT`](https://www.evm.codes/#ff)), wird eine Sequenz von null Bytes als Rückgabewert zurückgegeben. Beachten Sie, dass sich dies stark von der leeren Menge unterscheidet. Dieser Wert bedeutet, dass die EVM wirklich angehalten hat, es gibt nur keine Rückgabedaten zum Lesen. (Beachten Sie auch, dass seit [EIP-6780](https://eips.ethereum.org/EIPS/eip-6780) `SELFDESTRUCT` den Vertrag nur löscht, wenn er in derselben Transaktion aufgerufen wird, die den Vertrag erstellt hat. Andernfalls transferiert er nur die ETH des Vertrags.)
- Wenn wir einen Halte-Opcode haben, der eine Ausgabe erzeugt (entweder [`RETURN`](https://www.evm.codes/#f3) oder [`REVERT`](https://www.evm.codes/#fd)), wird die durch diesen Opcode angegebene Byte-Sequenz zurückgegeben. Diese Sequenz wird aus dem Memory entnommen, der Wert oben auf dem Stack (_μ<sub>s</sub>[0]_) ist das erste Byte, und der Wert danach (_μ<sub>s</sub>[1]_) ist die Länge.

## H.2 Befehlssatz (Instruction set) {#h2-instruction-set}

Bevor wir zum letzten Unterabschnitt der EVM, 9.5, übergehen, schauen wir uns die Anweisungen selbst an. Sie sind in Anhang H.2 definiert, der auf S. 30 beginnt. Alles, was nicht als sich mit diesem spezifischen Opcode ändernd angegeben ist, bleibt voraussichtlich gleich. Variablen, die sich ändern, werden mit einem \<etwas\>′ angegeben.

Schauen wir uns zum Beispiel den Opcode [`ADD`](https://www.evm.codes/#01) an.

| Wert  | Mnemonic | δ   | α   | Beschreibung                                              |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Additionsoperation.                                       |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ ist die Anzahl der Werte, die wir vom Stack entnehmen (pop). In diesem Fall zwei, da wir die beiden obersten Werte addieren.

_α_ ist die Anzahl der Werte, die wir zurücklegen (push). In diesem Fall einer, die Summe.

Die neue Stack-Spitze (_μ′<sub>s</sub>[0]_) ist also die Summe der alten Stack-Spitze (_μ<sub>s</sub>[0]_) und des alten Wertes darunter (_μ<sub>s</sub>[1]_).

Anstatt alle Opcodes mit einer ermüdenden Liste durchzugehen, erklärt dieser Artikel nur die Opcodes, die etwas Neues einführen.

| Wert  | Mnemonic  | δ   | α   | Beschreibung                                                                                               |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Keccak-256-Hash berechnen.                                                                                 |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Dies ist der erste Opcode, der auf den Memory-Speicher zugreift (in diesem Fall nur lesend). Er könnte jedoch über die aktuellen Grenzen des Speichers hinausgehen, daher müssen wir _μ<sub>i</sub>_ aktualisieren. Wir tun dies mit der Funktion _M_, die in Gleichung 330 auf S. 30 definiert ist.

| Wert  | Mnemonic | δ   | α   | Beschreibung                               |
| ----: | -------- | --- | --- | ------------------------------------------ |
|  0x31 | BALANCE  | 1   | 1   | Kontostand des angegebenen Kontos abrufen. |
|       |          |     |     | ...                                        |

Die Adresse, deren Kontostand wir ermitteln müssen, ist _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Die Spitze des Stacks ist die Adresse, aber da Adressen nur 160 Bit lang sind, berechnen wir den Wert [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Wenn _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, bedeutet dies, dass Informationen zu dieser Adresse vorliegen. In diesem Fall ist _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ der Kontostand für diese Adresse. Wenn _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, bedeutet dies, dass diese Adresse nicht initialisiert ist und der Kontostand null ist. Sie können die Liste der Kontoinformationsfelder in Abschnitt 4.1 auf S. 4 einsehen.

Die zweite Gleichung, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, bezieht sich auf den Kostenunterschied zwischen dem Zugriff auf Warm Storage (Speicher, auf den kürzlich zugegriffen wurde und der wahrscheinlich zwischengespeichert ist) und Cold Storage (Speicher, auf den nicht zugegriffen wurde und der sich wahrscheinlich in einem langsameren Speicher befindet, dessen Abruf teurer ist). _A<sub>a</sub>_ ist die Liste der Adressen, auf die die Transaktion zuvor zugegriffen hat und auf die daher kostengünstiger zugegriffen werden sollte, wie in Abschnitt 6.1 auf S. 9 definiert. Sie können mehr über dieses Thema in [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) lesen.

| Wert  | Mnemonic | δ   | α   | Beschreibung                            |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | 16. Stack-Element duplizieren.          |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Beachten Sie, dass wir jedes Stack-Element, das wir verwenden möchten, entnehmen (pop) müssen, was bedeutet, dass wir auch alle darüber liegenden Stack-Elemente entnehmen müssen. Im Falle von [`DUP<n>`](https://www.evm.codes/#8f) und [`SWAP<n>`](https://www.evm.codes/#9f) bedeutet dies, dass bis zu sechzehn Werte entnommen und dann wieder zurückgelegt (push) werden müssen.
## 9.5 Der Ausführungszyklus {#95-exec-cycle}

Nachdem wir nun alle Teile haben, können wir endlich verstehen, wie der Ausführungszyklus der EVM dokumentiert ist.

Gleichung (164) besagt, dass bei gegebenem Zustand:

- _σ_ (globaler Blockchain-Zustand)
- _μ_ (EVM-Zustand)
- _A_ (Teilzustand, Änderungen, die beim Ende der Transaktion eintreten sollen)
- _I_ (Ausführungsumgebung)

Der neue Zustand _(σ', μ', A', I')_ ist.

Die Gleichungen (165)-(167) definieren den Stack und dessen Änderung aufgrund eines Opcodes (_μ<sub>s</sub>_). Gleichung (168) ist die Änderung des Gases (_μ<sub>g</sub>_). Gleichung (169) ist die Änderung des Programmzählers (_μ<sub>pc</sub>_). Schließlich legen die Gleichungen (170)-(173) fest, dass die anderen Parameter gleich bleiben, sofern sie nicht explizit durch den Opcode geändert werden.

Damit ist die EVM vollständig definiert.
## Fazit {#conclusion}

Die mathematische Notation ist präzise und hat es dem Yellow Paper ermöglicht, jedes Detail von Ethereum zu spezifizieren. Sie hat jedoch einige Nachteile:

- Sie kann nur von Menschen verstanden werden, was bedeutet, dass [Konformitätstests](https://github.com/ethereum/tests) manuell geschrieben werden müssen.
- Programmierer verstehen Computercode.
  Sie verstehen möglicherweise mathematische Notation oder auch nicht.

Aus diesen Gründen sind die [Spezifikationen der Konsensschicht](https://github.com/ethereum/consensus-specs) in Python geschrieben, ebenso wie die [Spezifikationen der Ausführungsschicht](https://github.com/ethereum/execution-specs). Die Python-Spezifikation der Ausführungsschicht ist nun die gepflegte Referenz dafür, wie die EVM funktioniert, und sie enthält die Änderungen durch Upgrades, die das Yellow Paper nicht abdeckt. Das Yellow Paper ist nach wie vor eine nützliche formale Beschreibung, und die Fähigkeit, es zu lesen, hilft Ihnen beim Lesen anderer verwandter mathematischer Papiere.
