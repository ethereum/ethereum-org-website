---
title: Verständnis der EVM-Spezifikationen des Yellow Papers
description: Verständnis des Teils des Yellow Papers, den formalen Spezifikationen für Ethereum, der die Ethereum Virtual Machine (EVM) erklärt.
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: de
published: 2022-05-15
---

[Das Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) ist die formale Spezifikation für Ethereum. Sofern nicht durch [den EIP-Prozess](/eips/) geändert, enthält es die genaue Beschreibung, wie alles funktioniert. Es ist als mathematisches Papier verfasst, das eine Terminologie enthält, mit der Programmierer möglicherweise nicht vertraut sind. In diesem Papier lernen Sie, wie man es liest, und darüber hinaus auch andere verwandte mathematische Papiere.

## Welches Yellow Paper? {#which-yellow-paper}

Wie fast alles andere in Ethereum entwickelt sich auch das Yellow Paper im Laufe der Zeit weiter. Um auf eine bestimmte Version verweisen zu können, habe ich [die zum Zeitpunkt des Schreibens aktuelle Version](yellow-paper-berlin.pdf) hochgeladen. Die von mir verwendeten Abschnitts-, Seiten- und Gleichungsnummern beziehen sich auf diese Version. Es ist eine gute Idee, es beim Lesen dieses Dokuments in einem separaten Fenster geöffnet zu haben.

### Warum die EVM? {#why-the-evm}

Das ursprüngliche Yellow Paper wurde ganz am Anfang der Entwicklung von Ethereum geschrieben. Es beschreibt den ursprünglichen Proof-of-Work-basierten Konsensmechanismus, der ursprünglich zur Sicherung des Netzwerks verwendet wurde. Ethereum hat jedoch im September 2022 Proof-of-Work abgeschaltet und begonnen, einen auf Proof-of-Stake basierenden Konsens zu verwenden. Dieses Tutorial konzentriert sich auf die Teile des Yellow Papers, die die Ethereum Virtual Machine definieren. Die EVM blieb durch den Übergang zu Proof-of-Stake unverändert (mit Ausnahme des Rückgabewertes des DIFFICULTY-Opcodes).

## 9 Ausführungsmodell {#9-execution-model}

Dieser Abschnitt (S. 12-14) enthält den größten Teil der Definition der EVM.

Der Begriff _Systemzustand_ umfasst alles, was Sie über das System wissen müssen, um es auszuführen. Bei einem typischen Computer bedeutet dies den Arbeitsspeicher, den Inhalt von Registern usw.

Eine [Turing-Maschine](https://en.wikipedia.org/wiki/Turing_machine) ist ein Berechnungsmodell. Im Wesentlichen handelt es sich um eine vereinfachte Version eines Computers, von der bewiesen ist, dass sie die gleiche Fähigkeit zur Ausführung von Berechnungen hat wie ein normaler Computer (alles, was ein Computer berechnen kann, kann auch eine Turing-Maschine berechnen und umgekehrt). Dieses Modell erleichtert es, verschiedene Theoreme darüber zu beweisen, was berechenbar ist und was nicht.

Der Begriff [Turing-vollständig](https://en.wikipedia.org/wiki/Turing_completeness) bezeichnet einen Computer, der die gleichen Berechnungen wie eine Turing-Maschine ausführen kann. Turing-Maschinen können in Endlosschleifen geraten, die EVM jedoch nicht, da ihr das Gas ausgehen würde, also ist sie nur quasi-Turing-vollständig.

## 9.1 Grundlagen {#91-basics}

Dieser Abschnitt erläutert die Grundlagen der EVM und wie sie sich mit anderen Berechnungsmodellen vergleichen lässt.

Eine [Stack-Maschine](https://en.wikipedia.org/wiki/Stack_machine) ist ein Computer, der Zwischendaten nicht in Registern, sondern in einem [**Stack**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)) speichert. Dies ist die bevorzugte Architektur für virtuelle Maschinen, da sie einfach zu implementieren ist, was bedeutet, dass Fehler und Sicherheitsschwachstellen weitaus unwahrscheinlicher sind. Der Arbeitsspeicher im Stack ist in 256-Bit-Wörter unterteilt. Dies wurde gewählt, weil es für die kryptografischen Kernoperationen von Ethereum wie Keccak-256-Hashing und Elliptische-Kurven-Berechnungen praktisch ist. Die maximale Größe des Stacks beträgt 1024 Elemente (1024 x 256 Bit). Wenn Opcodes ausgeführt werden, beziehen sie ihre Parameter normalerweise aus dem Stack. Es gibt Opcodes speziell für die Neuorganisation von Elementen im Stack wie `POP` (entfernt das oberste Element vom Stack), `DUP_N` (dupliziert das n-te Element im Stack) usw.

Die EVM hat auch einen flüchtigen Bereich namens **Arbeitsspeicher**, der zur Speicherung von Daten während der Ausführung verwendet wird. Dieser Arbeitsspeicher ist in 32-Byte-Wörter organisiert. Alle Speicherorte sind auf Null initialisiert. Wenn Sie diesen [Yul](https://docs.soliditylang.org/en/latest/yul.html)-Code ausführen, um ein Wort zum Arbeitsspeicher hinzuzufügen, füllt er 32 Byte des Arbeitsspeichers, indem er den leeren Platz im Wort mit Nullen auffüllt, d. h. er erzeugt ein Wort – mit Nullen an den Positionen 0-29, 0x60 an 30 und 0xA7 an 31.

```yul
mstore(0, 0x60A7)
```

`mstore` ist einer von drei Opcodes, die die EVM für die Interaktion mit dem Arbeitsspeicher bereitstellt – er lädt ein Wort in den Arbeitsspeicher. Die anderen beiden sind `mstore8`, das ein einzelnes Byte in den Arbeitsspeicher lädt, und `mload`, das ein Wort aus dem Arbeitsspeicher in den Stack verschiebt.

Die EVM hat auch ein separates nicht-flüchtiges **Speicher**modell, das als Teil des Systemzustands beibehalten wird – dieser Speicher ist in Wort-Arrays organisiert (im Gegensatz zu wortadressierbaren Byte-Arrays im Stack). In diesem Speicher bewahren Verträge persistente Daten auf – ein Vertrag kann nur mit seinem eigenen Speicher interagieren. Der Speicher ist in Schlüssel-Wert-Zuordnungen organisiert.

Obwohl es in diesem Abschnitt des Yellow Papers nicht erwähnt wird, ist es auch nützlich zu wissen, dass es einen vierten Speichertyp gibt. **Calldata** ist ein byte-adressierbarer, schreibgeschützter Speicher, der verwendet wird, um den mit dem `data`-Parameter einer Transaktion übergebenen Wert zu speichern. Die EVM verfügt über spezielle Opcodes zur Verwaltung von `calldata`. `calldatasize` gibt die Größe der Daten zurück. `calldataload` lädt die Daten in den Stack. `calldatacopy` kopiert die Daten in den Arbeitsspeicher.

Die standardmäßige [Von-Neumann-Architektur](https://en.wikipedia.org/wiki/Von_Neumann_architecture) speichert Code und Daten im selben Arbeitsspeicher. Die EVM folgt diesem Standard aus Sicherheitsgründen nicht – die gemeinsame Nutzung von flüchtigem Arbeitsspeicher macht es möglich, Programmcode zu ändern. Stattdessen wird der Code im Speicher abgelegt.

Es gibt nur zwei Fälle, in denen Code aus dem Arbeitsspeicher ausgeführt wird:

- Wenn ein Vertrag einen anderen Vertrag erstellt (mit [`CREATE`](https://www.evm.codes/#f0) oder [`CREATE2`](https://www.evm.codes/#f5)), stammt der Code für den Vertragskonstruktor aus dem Arbeitsspeicher.
- Während der Erstellung _jedes_ Vertrags wird der Konstruktorcode ausgeführt und gibt dann den Code des eigentlichen Vertrags zurück, ebenfalls aus dem Arbeitsspeicher.

Der Begriff „außergewöhnliche Ausführung“ bezeichnet eine Ausnahme, die dazu führt, dass die Ausführung des aktuellen Vertrags angehalten wird.

## 9.2 Gebührenübersicht {#92-fees-overview}

Dieser Abschnitt erklärt, wie die Gasgebühren berechnet werden. Es gibt drei Kosten:

### Opcode-Kosten {#opcode-cost}

Die inhärenten Kosten des spezifischen Opcodes. Um diesen Wert zu erhalten, finden Sie die Kostengruppe des Opcodes in Anhang H (S. 28, unter Gleichung (327)) und finden Sie die Kostengruppe in Gleichung (324). Dies gibt Ihnen eine Kostenfunktion, die in den meisten Fällen Parameter aus Anhang G (S. 27) verwendet.

Zum Beispiel ist der Opcode [`CALLDATACOPY`](https://www.evm.codes/#37) ein Mitglied der Gruppe _W<sub>copy</sub>_. Die Opcode-Kosten für diese Gruppe sind _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Bei einem Blick in Anhang G sehen wir, dass beide Konstanten 3 sind, was uns _3+3×⌈μ<sub>s</sub>[2]÷32⌉_ ergibt.

Wir müssen noch den Ausdruck _⌈μ<sub>s</sub>[2]÷32⌉_ entschlüsseln. Der äußerste Teil, _⌈ \<Wert\> ⌉_ ist die Aufrundungsfunktion, eine Funktion, die bei einem gegebenen Wert die kleinste ganze Zahl zurückgibt, die immer noch nicht kleiner als der Wert ist. Zum Beispiel: _⌈2.5⌉ = ⌈3⌉ = 3_. Der innere Teil ist _μ<sub>s</sub>[2]÷32_. Wenn man sich Abschnitt 3 (Konventionen) auf S. 3 ansieht, ist _μ_ der Maschinenzustand. Der Maschinenzustand ist in Abschnitt 9.4.1 auf S. 13 definiert. Laut diesem Abschnitt ist einer der Parameter des Maschinenzustands _s_ für den Stack. Zusammengenommen scheint es, dass _μ<sub>s</sub>[2]_ die Position Nr. 2 im Stack ist. Wenn man sich [den Opcode](https://www.evm.codes/#37) ansieht, ist Position Nr. 2 im Stack die Größe der Daten in Bytes. Wenn wir uns die anderen Opcodes in der Gruppe W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) und [`RETURNDATACOPY`](https://www.evm.codes/#3e), ansehen, haben sie ebenfalls eine Datengröße an derselben Stelle. Also ist _⌈μ<sub>s</sub>[2]÷32⌉_ die Anzahl der 32-Byte-Wörter, die zur Speicherung der zu kopierenden Daten erforderlich sind. Zusammenfassend lässt sich sagen, dass die inhärenten Kosten von [`CALLDATACOPY`](https://www.evm.codes/#37) 3 Gas plus 3 pro Wort der zu kopierenden Daten betragen.

### Laufende Kosten {#running-cost}

Die Kosten für die Ausführung des von uns aufgerufenen Codes.

- Im Fall von [`CREATE`](https://www.evm.codes/#f0) und [`CREATE2`](https://www.evm.codes/#f5), der Konstruktor für den neuen Vertrag.
- Im Fall von [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) oder [`DELEGATECALL`](https://www.evm.codes/#f4), der Vertrag, den wir aufrufen.

### Kosten für die Speichererweiterung {#expanding-memory-cost}

Die Kosten für die Erweiterung des Arbeitsspeichers (falls erforderlich).

In Gleichung 324 wird dieser Wert als _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_ geschrieben. Wenn wir uns Abschnitt 9.4.1 noch einmal ansehen, sehen wir, dass _μ<sub>i</sub>_ die Anzahl der Wörter im Arbeitsspeicher ist. Also ist _μ<sub>i</sub>_ die Anzahl der Wörter im Arbeitsspeicher vor dem Opcode und _μ<sub>i</sub>'_ ist die Anzahl der Wörter im Arbeitsspeicher nach dem Opcode.

Die Funktion _C<sub>mem</sub>_ ist in Gleichung 326 definiert: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ ist die Abrundungsfunktion, eine Funktion, die bei einem gegebenen Wert die größte ganze Zahl zurückgibt, die immer noch nicht größer als der Wert ist. Zum Beispiel: _⌊2.5⌋ = ⌊2⌋ = 2._ Wenn _a < √512_, _a<sup>2</sup> < 512_, und das Ergebnis der Abrundungsfunktion ist Null. Für die ersten 22 Wörter (704 Bytes) steigen die Kosten also linear mit der Anzahl der benötigten Speicherwörter. Über diesen Punkt hinaus ist _⌊a<sup>2</sup> ÷ 512⌋_ positiv. Wenn der benötigte Speicher hoch genug ist, sind die Gaskosten proportional zum Quadrat der Speichermenge.

**Hinweis**: Diese Faktoren beeinflussen nur die _inhärenten_ Gaskosten – sie berücksichtigen nicht den Gebührenmarkt oder Trinkgelder an Validatoren, die bestimmen, wie viel ein Endbenutzer zahlen muss – dies sind nur die reinen Kosten für die Ausführung einer bestimmten Operation auf der EVM.

[Lesen Sie mehr über Gas](/developers/docs/gas/).

## 9.3 Ausführungsumgebung {#93-execution-env}

Die Ausführungsumgebung ist ein Tupel, _I_, das Informationen enthält, die nicht Teil des Blockchain-Zustands oder der EVM sind.

| Parameter       | Opcode für den Datenzugriff                                                                                   | Solidity-Code für den Datenzugriff                       |
| --------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                        | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                         | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                       | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                             | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                         | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                      | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                       | `address(this).code`                                     |
| _I<sub>H</sub>_ | Block-Header-Felder, wie [`NUMBER`](https://www.evm.codes/#43) und [`DIFFICULTY`](https://www.evm.codes/#44)  | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Tiefe des Aufrufstapels für Aufrufe zwischen Verträgen (einschließlich Vertragserstellung) |                                                          |
| _I<sub>w</sub>_ | Darf die EVM den Zustand ändern, oder läuft sie statisch                                                      |                                                          |

Einige weitere Parameter sind notwendig, um den Rest von Abschnitt 9 zu verstehen:

| Parameter | Definiert in Abschnitt                                         | Bedeutung                                                                                                                                                                                                                                                                             |
| --------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (S. 2, Gleichung 1)       | Der Zustand der Blockchain                                                                                                                                                                                                                                                            |
| _g_       | 9.3 (S. 13) | Verbleibendes Gas                                                                                                                                                                                                                                                                     |
| _A_       | 6.1 (S. 8)  | Angesammelter Teilzustand (Änderungen, die für das Ende der Transaktion geplant sind)                                                                                                                                                                              |
| _o_       | 9.3 (S. 13) | Ausgabe – das zurückgegebene Ergebnis im Fall einer internen Transaktion (wenn ein Vertrag einen anderen aufruft) und bei Aufrufen von Ansichtsfunktionen (wenn Sie nur Informationen anfordern, also nicht auf eine Transaktion warten müssen) |

## 9.4 Ausführungsübersicht {#94-execution-overview}

Jetzt, da wir alle Vorbereitungen getroffen haben, können wir endlich damit beginnen, zu erarbeiten, wie die EVM funktioniert.

Die Gleichungen 137-142 geben uns die Anfangsbedingungen für die Ausführung der EVM:

| Symbol           | Anfangswert                                                                      | Bedeutung                                                                                                                                                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Verbleibendes Gas                                                                                                                                                                                                                                                                                                    |
| _μ<sub>pc</sub>_ | _0_                                                                              | Programm-Zähler, die Adresse der nächsten auszuführenden Anweisung                                                                                                                                                                                                                                                   |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Arbeitsspeicher, initialisiert mit lauter Nullen                                                                                                                                                                                                                                                                     |
| _μ<sub>i</sub>_  | _0_                                                                              | Höchster verwendeter Speicherort                                                                                                                                                                                                                                                                                     |
| _μ<sub>s</sub>_  | _()_                                                          | Der Stack, anfangs leer                                                                                                                                                                                                                                                                                              |
| _μ<sub>o</sub>_  | _∅_                                                                              | Die Ausgabe, leere Menge, bis wir entweder mit Rückgabedaten ([`RETURN`](https://www.evm.codes/#f3) oder [`REVERT`](https://www.evm.codes/#fd)) oder ohne sie ([`STOP`](https://www.evm.codes/#00) oder [`SELFDESTRUCT`](https://www.evm.codes/#ff)) anhalten. |

Gleichung 143 besagt, dass es zu jedem Zeitpunkt während der Ausführung vier mögliche Bedingungen gibt und was damit zu tun ist:

1. `Z(σ,μ,A,I)`. Z stellt eine Funktion dar, die prüft, ob eine Operation einen ungültigen Zustandsübergang erzeugt (siehe [außergewöhnliches Anhalten](#942-exceptional-halting)). Wenn sie zu „True“ ausgewertet wird, ist der neue Zustand identisch mit dem alten (außer dass Gas verbrannt wird), da die Änderungen nicht implementiert wurden.
2. Wenn der ausgeführte Opcode [`REVERT`](https://www.evm.codes/#fd) ist, ist der neue Zustand derselbe wie der alte Zustand, etwas Gas geht verloren.
3. Wenn die Sequenz von Operationen beendet ist, was durch ein [`RETURN`](https://www.evm.codes/#f3)) angezeigt wird, wird der Zustand auf den neuen Zustand aktualisiert.
4. Wenn wir uns nicht in einer der Endbedingungen 1-3 befinden, wird die Ausführung fortgesetzt.

## 9.4.1 Maschinenzustand {#941-machine-state}

Dieser Abschnitt erklärt den Maschinenzustand genauer. Er legt fest, dass _w_ der aktuelle Opcode ist. Wenn _μ<sub>pc</sub>_ kleiner als _||I<sub>b</sub>||_ ist, die Länge des Codes, dann ist dieses Byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) der Opcode. Andernfalls wird der Opcode als [`STOP`](https://www.evm.codes/#00) definiert.

Da es sich um eine [Stack-Maschine](https://en.wikipedia.org/wiki/Stack_machine) handelt, müssen wir die Anzahl der von jedem Opcode herausgenommenen (_δ_) und hineingeschobenen (_α_) Elemente verfolgen.

## 9.4.2 Außergewöhnliches Anhalten {#942-exceptional-halt}

Dieser Abschnitt definiert die Funktion _Z_, die angibt, wann wir eine anormale Beendigung haben. Dies ist eine [Boole'sche](https://en.wikipedia.org/wiki/Boolean_data_type) Funktion, daher verwendet sie [_∨_ für ein logisches Oder](https://en.wikipedia.org/wiki/Logical_disjunction) und [_∧_ für ein logisches Und](https://en.wikipedia.org/wiki/Logical_conjunction).

Wir haben einen außergewöhnlichen Halt, wenn eine dieser Bedingungen wahr ist:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Wie wir in Abschnitt 9.2 gesehen haben, ist _C_ die Funktion, die die Gaskosten angibt. Es ist nicht genug Gas übrig, um den nächsten Opcode zu decken.

- **_δ<sub>w</sub>=∅_**
  Wenn die Anzahl der für einen Opcode entnommenen Elemente undefiniert ist, dann ist der Opcode selbst undefiniert.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack-Unterlauf, nicht genügend Elemente im Stack für den aktuellen Opcode.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Der Opcode ist [`JUMP`](https://www.evm.codes/#56) und die Adresse ist kein [`JUMPDEST`](https://www.evm.codes/#5b). Sprünge sind _nur_ gültig, wenn das Ziel ein [`JUMPDEST`](https://www.evm.codes/#5b) ist.

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Der Opcode ist [`JUMPI`](https://www.evm.codes/#57), die Bedingung ist wahr (nicht null), also sollte der Sprung stattfinden, und die Adresse ist kein [`JUMPDEST`](https://www.evm.codes/#5b). Sprünge sind _nur_ gültig, wenn das Ziel ein [`JUMPDEST`](https://www.evm.codes/#5b) ist.

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Der Opcode ist [`RETURNDATACOPY`](https://www.evm.codes/#3e). In diesem Opcode ist das Stack-Element _μ<sub>s</sub>[1]_ der Offset, von dem im Rückgabedatenpuffer gelesen wird, und das Stack-Element _μ<sub>s</sub>[2]_ ist die Länge der Daten. Diese Bedingung tritt auf, wenn Sie versuchen, über das Ende des Rückgabedatenpuffers hinaus zu lesen. Beachten Sie, dass es keine ähnliche Bedingung für die Calldata oder für den Code selbst gibt. Wenn Sie versuchen, über das Ende dieser Puffer hinaus zu lesen, erhalten Sie nur Nullen.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Stack-Überlauf. Wenn die Ausführung des Opcodes zu einem Stack von über 1024 Elementen führt, wird abgebrochen.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Laufen wir statisch ([¬ ist Negation](https://en.wikipedia.org/wiki/Negation) und _I<sub>w</sub>_ ist wahr, wenn wir den Blockchain-Zustand ändern dürfen)? Wenn ja, und wir versuchen eine zustandsändernde Operation, kann sie nicht stattfinden.

  Die Funktion _W(w,μ)_ ist später in Gleichung 150 definiert. _W(w,μ)_ ist wahr, wenn eine dieser Bedingungen wahr ist:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Diese Opcodes ändern den Zustand, entweder durch Erstellen eines neuen Vertrags, Speichern eines Wertes oder Zerstören des aktuellen Vertrags.

  - **_LOG0≤w ∧ w≤LOG4_**
    Wenn wir statisch aufgerufen werden, können wir keine Log-Einträge ausgeben.
    Die Log-Opcodes liegen alle im Bereich zwischen [`LOG0` (A0)](https://www.evm.codes/#a0) und [`LOG4` (A4)](https://www.evm.codes/#a4).
    Die Zahl nach dem Log-Opcode gibt an, wie viele Themen der Log-Eintrag enthält.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Sie können einen anderen Vertrag aufrufen, wenn Sie statisch sind, aber wenn Sie das tun, können Sie keine ETH an ihn übertragen.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Sie können [`SSTORE`](https://www.evm.codes/#55) nur ausführen, wenn Sie mehr als G<sub>callstipend</sub> (definiert als 2300 in Anhang G) Gas haben.

## 9.4.3 Gültigkeit des Sprungziels {#943-jump-dest-valid}

Hier definieren wir formal, was die [`JUMPDEST`](https://www.evm.codes/#5b) Opcodes sind. Wir können nicht einfach nach dem Bytewert 0x5B suchen, da er sich innerhalb eines PUSH befinden könnte (und daher Daten und kein Opcode ist).

In Gleichung (153) definieren wir eine Funktion, _N(i,w)_. Der erste Parameter, _i_, ist die Position des Opcodes. Der zweite, _w_, ist der Opcode selbst. Wenn _w∈[PUSH1, PUSH32]_ bedeutet das, dass der Opcode ein PUSH ist (eckige Klammern definieren einen Bereich, der die Endpunkte einschließt). In diesem Fall befindet sich der nächste Opcode bei _i+2+(w−PUSH1)_. Für [`PUSH1`](https://www.evm.codes/#60) müssen wir um zwei Bytes vorrücken (der PUSH selbst und der Ein-Byte-Wert), für [`PUSH2`](https://www.evm.codes/#61) müssen wir um drei Bytes vorrücken, weil es ein Zwei-Byte-Wert ist, usw. Alle anderen EVM-Opcodes sind nur ein Byte lang, also ist in allen anderen Fällen _N(i,w)=i+1_.

Diese Funktion wird in Gleichung (152) verwendet, um _D<sub>J</sub>(c,i)_ zu definieren, was die [Menge](https://en.wikipedia.org/wiki/Set_\(mathematics\)) aller gültigen Sprungziele im Code _c_ ist, beginnend mit der Opcode-Position _i_. Diese Funktion ist rekursiv definiert. Wenn _i≥||c||_, bedeutet das, dass wir uns am oder nach dem Ende des Codes befinden. Wir werden keine weiteren Sprungziele finden, also geben wir einfach die leere Menge zurück.

In allen anderen Fällen betrachten wir den Rest des Codes, indem wir zum nächsten Opcode gehen und die Menge ab dort erhalten. _c[i]_ ist der aktuelle Opcode, also ist _N(i,c[i])_ die Position des nächsten Opcodes. _D<sub>J</sub>(c,N(i,c[i]))_ ist daher die Menge der gültigen Sprungziele, die am nächsten Opcode beginnt. Wenn der aktuelle Opcode kein `JUMPDEST` ist, geben Sie einfach diese Menge zurück. Wenn es `JUMPDEST` ist, fügen Sie es der Ergebnismenge hinzu und geben Sie diese zurück.

## 9.4.4 Normales Anhalten {#944-normal-halt}

Die Haltefunktion _H_ kann drei Arten von Werten zurückgeben.

- Wenn wir uns nicht in einem Halte-Opcode befinden, geben Sie _∅_, die leere Menge, zurück. Per Konvention wird dieser Wert als boolesches Falsch interpretiert.
- Wenn wir einen Halte-Opcode haben, der keine Ausgabe erzeugt (entweder [`STOP`](https://www.evm.codes/#00) oder [`SELFDESTRUCT`](https://www.evm.codes/#ff)), geben Sie eine Sequenz von Bytes der Größe Null als Rückgabewert zurück. Beachten Sie, dass dies sehr unterschiedlich zur leeren Menge ist. Dieser Wert bedeutet, dass die EVM wirklich angehalten hat, es gibt nur keine Rückgabedaten zu lesen.
- Wenn wir einen Halte-Opcode haben, der eine Ausgabe erzeugt (entweder [`RETURN`](https://www.evm.codes/#f3) oder [`REVERT`](https://www.evm.codes/#fd)), geben Sie die durch diesen Opcode spezifizierte Byte-Sequenz zurück. Diese Sequenz wird aus dem Arbeitsspeicher entnommen, der Wert an der Spitze des Stacks (_μ<sub>s</sub>[0]_) ist das erste Byte, und der Wert dahinter (_μ<sub>s</sub>[1]_) ist die Länge.

## H.2 Befehlssatz {#h2-instruction-set}

Bevor wir zum letzten Unterabschnitt der EVM, 9.5, kommen, schauen wir uns die Anweisungen selbst an. Sie sind in Anhang H.2 definiert, der auf S. 29 beginnt. Alles, was nicht als mit diesem spezifischen Opcode ändernd angegeben ist, wird erwartet, dass es gleich bleibt. Variablen, die sich ändern, werden mit \<etwas\>′ angegeben.

Betrachten wir zum Beispiel den [`ADD`](https://www.evm.codes/#01)-Opcode.

| Wert | Mnemonic | δ | α | Beschreibung                                                                                                                                                                                                          |
| ---: | -------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01 | ADD      | 2 | 1 | Addition.                                                                                                                                                                                             |
|      |          |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ ist die Anzahl der Werte, die wir aus dem Stack entnehmen. In diesem Fall zwei, weil wir die obersten beiden Werte addieren.

_α_ ist die Anzahl der Werte, die wir zurückschieben. In diesem Fall eins, die Summe.

Also ist das neue Stack-Top (_μ′<sub>s</sub>[0]_) die Summe des alten Stack-Tops (_μ<sub>s</sub>[0]_) und des alten Wertes darunter (_μ<sub>s</sub>[1]_).

Anstatt alle Opcodes mit einer „Liste, bei der einem die Augen zufallen“, durchzugehen, erklärt dieser Artikel nur die Opcodes, die etwas Neues einführen.

| Wert | Mnemonic  | δ | α | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x20 | KECCAK256 | 2 | 1 | Berechnung des Keccak-256-Hashs.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|      |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|      |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                                       |

Dies ist der erste Opcode, der auf den Arbeitsspeicher zugreift (in diesem Fall nur lesend). Er könnte jedoch über die aktuellen Grenzen des Arbeitsspeichers hinausgehen, daher müssen wir _μ<sub>i</sub>._ aktualisieren. Wir tun dies mit der Funktion _M_, die in Gleichung 328 auf S. 29 definiert ist.

| Wert | Mnemonic | δ | α | Beschreibung                                             |
| ---: | -------- | - | - | -------------------------------------------------------- |
| 0x31 | BALANCE  | 1 | 1 | Guthaben des angegebenen Kontos abrufen. |
|      |          |   |   | ...      |

Die Adresse, deren Guthaben wir finden müssen, ist _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Die Spitze des Stacks ist die Adresse, aber da Adressen nur 160 Bit lang sind, berechnen wir den Wert [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Wenn _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, bedeutet dies, dass Informationen über diese Adresse vorhanden sind. In diesem Fall ist _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ das Guthaben für diese Adresse. Wenn _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, bedeutet dies, dass diese Adresse nicht initialisiert ist und das Guthaben null ist. Die Liste der Kontoinformationsfelder finden Sie in Abschnitt 4.1 auf S. 4.

Die zweite Gleichung, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, bezieht sich auf den Kostenunterschied zwischen dem Zugriff auf warmen Speicher (Speicher, auf den kürzlich zugegriffen wurde und der wahrscheinlich zwischengespeichert wird) und kaltem Speicher (Speicher, auf den nicht zugegriffen wurde und der sich wahrscheinlich in einem langsameren Speicher befindet, dessen Abruf teurer ist). _A<sub>a</sub>_ ist die Liste der Adressen, auf die von der Transaktion zuvor zugegriffen wurde, deren Zugriff daher billiger sein sollte, wie in Abschnitt 6.1 auf S. 8 definiert. Mehr zu diesem Thema können Sie in [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) lesen.

| Wert | Mnemonic | δ  | α  | Beschreibung                                                                                                                                    |
| ---: | -------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x8F | DUP16    | 16 | 17 | Dupliziere das 16. Stack-Element.                                                                               |
|      |          |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Beachten Sie, dass wir, um ein beliebiges Stack-Element zu verwenden, es entfernen müssen, was bedeutet, dass wir auch alle darüber liegenden Stack-Elemente entfernen müssen. Im Fall von [`DUP<n>`](https://www.evm.codes/#8f) und [`SWAP<n>`](https://www.evm.codes/#9f) bedeutet dies, bis zu sechzehn Werte entfernen und dann wieder hinzufügen zu müssen.

## 9.5 Der Ausführungszyklus {#95-exec-cycle}

Nachdem wir nun alle Teile haben, können wir endlich verstehen, wie der Ausführungszyklus der EVM dokumentiert ist.

Gleichung (155) besagt, dass bei gegebenem Zustand:

- _σ_ (globaler Blockchain-Zustand)
- _μ_ (EVM-Zustand)
- _A_ (Unterzustand, Änderungen, die eintreten, wenn die Transaktion endet)
- _I_ (Ausführungsumgebung)

Der neue Zustand ist _(σ', μ', A', I')_.

Die Gleichungen (156)-(158) definieren den Stack und die Änderung darin durch einen Opcode (_μ<sub>s</sub>_). Gleichung (159) ist die Änderung im Gas (_μ<sub>g</sub>_). Gleichung (160) ist die Änderung des Programmzählers (_μ<sub>pc</sub>_). Schließlich legen die Gleichungen (161)-(164) fest, dass die anderen Parameter gleich bleiben, sofern sie nicht explizit durch den Opcode geändert werden.

Damit ist die EVM vollständig definiert.

## Fazit {#conclusion}

Die mathematische Notation ist präzise und hat es ermöglicht, jedes Detail von Ethereum im Yellow Paper zu spezifizieren. Sie hat jedoch auch einige Nachteile:

- Sie kann nur von Menschen verstanden werden, was bedeutet, dass [Konformitätstests](https://github.com/ethereum/tests) manuell geschrieben werden müssen.
- Programmierer verstehen Computercode.
  Sie verstehen möglicherweise mathematische Notationen oder auch nicht.

Vielleicht sind aus diesen Gründen die neueren [Spezifikationen der Konsensus-Ebene](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) in Python geschrieben. Es gibt [Spezifikationen der Ausführungsebene in Python](https://ethereum.github.io/execution-specs), aber sie sind nicht vollständig. Bis und solange nicht das gesamte Yellow Paper auch in Python oder eine ähnliche Sprache übersetzt ist, wird das Yellow Paper weiterhin in Gebrauch bleiben, und es ist hilfreich, es lesen zu können.
