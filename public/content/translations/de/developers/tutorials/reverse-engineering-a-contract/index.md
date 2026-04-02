---
title: "Reverse Engineering eines Vertrags"
description: Wie man einen Vertrag versteht, wenn man den Quellcode nicht hat
author: Ori Pomerantz
lang: de
tags: ["evm", "opcodes"]
skill: advanced
breadcrumb: Reverse Engineering
published: 2021-12-30
---
## Einführung {#introduction}

_Es gibt keine Geheimnisse auf der Blockchain_, alles, was passiert, ist konsistent, verifizierbar und öffentlich zugänglich. Im Idealfall [sollte der Quellcode von Verträgen auf Etherscan veröffentlicht und verifiziert sein](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Allerdings [ist das nicht immer der Fall](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). In diesem Artikel lernen Sie, wie Sie Verträge durch Reverse Engineering analysieren können, indem wir uns einen Vertrag ohne Quellcode ansehen: [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Es gibt Reverse-Compiler, aber sie liefern nicht immer [brauchbare Ergebnisse](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). In diesem Artikel lernen Sie, wie Sie einen Vertrag anhand [der Opcodes](https://github.com/wolflo/evm-opcodes) manuell rückentwickeln und verstehen können, sowie wie Sie die Ergebnisse eines Dekompilierers interpretieren.

Um diesen Artikel verstehen zu können, sollten Sie bereits die Grundlagen der EVM kennen und zumindest ein wenig mit EVM-Assembler vertraut sein. [Sie können hier mehr über diese Themen lesen](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Den ausführbaren Code vorbereiten {#prepare-the-executable-code}

Sie können die Opcodes abrufen, indem Sie auf Etherscan für den Vertrag gehen, auf den Tab **Contract** klicken und dann **Switch to Opcodes View** auswählen. Sie erhalten eine Ansicht mit einem Opcode pro Zeile.

![Opcode-Ansicht von Etherscan](opcode-view.png)

Um jedoch Sprünge (Jumps) zu verstehen, müssen Sie wissen, wo sich jeder Opcode im Code befindet. Eine Möglichkeit dazu besteht darin, ein Google Spreadsheet zu öffnen und die Opcodes in Spalte C einzufügen. [Sie können die folgenden Schritte überspringen, indem Sie eine Kopie dieser bereits vorbereiteten Tabelle erstellen](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Der nächste Schritt besteht darin, die korrekten Code-Positionen zu ermitteln, damit wir Sprünge verstehen können. Wir tragen die Opcode-Größe in Spalte B und die Position (in hexadezimaler Form) in Spalte A ein. Geben Sie diese Funktion in Zelle `B1` ein und kopieren Sie sie dann für den Rest von Spalte B bis zum Ende des Codes. Danach können Sie Spalte B ausblenden.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Zuerst fügt diese Funktion ein Byte für den Opcode selbst hinzu und sucht dann nach `PUSH`. Push-Opcodes sind besonders, da sie zusätzliche Bytes für den Wert benötigen, der gepusht wird. Wenn der Opcode ein `PUSH` ist, extrahieren wir die Anzahl der Bytes und fügen diese hinzu.

Tragen Sie in `A1` den ersten Offset ein, also null. Fügen Sie dann in `A2` diese Funktion ein und kopieren Sie sie erneut für den Rest von Spalte A:

```
=dec2hex(hex2dec(A1)+B1)
```

Wir benötigen diese Funktion, um uns den hexadezimalen Wert zu liefern, da die Werte, die vor Sprüngen (`JUMP` und `JUMPI`) gepusht werden, uns in hexadezimaler Form vorliegen.

## Der Einstiegspunkt (0x00) {#the-entry-point-0x00}

Smart Contracts werden immer ab dem ersten Byte ausgeführt. Dies ist der anfängliche Teil des Codes:

| Offset | Opcode       | Stack (nach dem Opcode) |
| -----: | ------------ | ----------------------- |
|      0 | PUSH1 0x80   | 0x80                    |
|      2 | PUSH1 0x40   | 0x40, 0x80              |
|      4 | MSTORE       | Leer                    |
|      5 | PUSH1 0x04   | 0x04                    |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04       |
|      8 | LT           | CALLDATASIZE\<4          |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4     |
|      C | JUMPI        | Leer                    |

Dieser Code macht zwei Dinge:

1. Schreibt 0x80 als 32-Byte-Wert in die Speicherorte 0x40-0x5F (0x80 wird in 0x5F gespeichert und 0x40-0x5E sind alle Nullen).
2. Liest die Größe der Calldata. Normalerweise folgen die Call-Daten für einen Ethereum-Vertrag [der ABI (Application Binary Interface)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), die mindestens vier Bytes für den Funktionsselektor erfordert. Wenn die Größe der Call-Daten kleiner als vier ist, springe zu 0x5E.

![Flussdiagramm für diesen Teil](flowchart-entry.png)

### Der Handler bei 0x5E (für Nicht-ABI-Call-Daten) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Dieses Snippet beginnt mit einem `JUMPDEST`. EVM-Programme (Ethereum Virtual Machine) werfen eine Ausnahme, wenn man zu einem Opcode springt, der nicht `JUMPDEST` ist. Dann wird die CALLDATASIZE betrachtet, und wenn sie "wahr" ist (also nicht null), wird zu 0x7C gesprungen. Darauf kommen wir weiter unten zurück.

| Offset | Opcode     | Stack (nach dem Opcode)                                                                    |
| -----: | ---------- | ------------------------------------------------------------------------------------------ |
|     64 | CALLVALUE  | [Wei](/glossary/#wei), die durch den Aufruf bereitgestellt werden. In Solidity `msg.value` genannt |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                                         |

Wenn es also keine Call-Daten gibt, lesen wir den Wert von Storage[6]. Wir wissen noch nicht, was dieser Wert ist, aber wir können nach Transaktionen suchen, die der Smart Contract ohne Call-Daten empfangen hat. Transaktionen, die einfach nur ETH ohne Call-Daten (und daher ohne Methode) übertragen, haben in Etherscan die Methode `Transfer`. Tatsächlich ist [die allererste Transaktion, die der Vertrag empfangen hat](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7), eine Überweisung.

Wenn wir uns diese Transaktion ansehen und auf **Click to see More** klicken, sehen wir, dass die Call-Daten, auch Eingabedaten genannt, tatsächlich leer sind (`0x`). Beachten Sie auch, dass der Wert 1,559 ETH beträgt, was später noch relevant sein wird.

![Die Call-Daten sind leer](calldata-empty.png)

Klicken Sie als Nächstes auf den Tab **State** und erweitern Sie den Smart Contract, den wir per Reverse Engineering untersuchen (0x2510...). Sie können sehen, dass sich `Storage[6]` während der Transaktion geändert hat, und wenn Sie Hex in **Number** ändern, sehen Sie, dass es zu 1.559.000.000.000.000.000 wurde, dem in Wei übertragenen Wert (ich habe die Punkte zur besseren Übersichtlichkeit hinzugefügt), was dem nächsten Vertragswert entspricht.

![Die Änderung in Storage[6]](storage6.png)

Wenn wir uns die Statusänderungen ansehen, die durch [andere `Transfer`-Transaktionen aus demselben Zeitraum](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) verursacht wurden, sehen wir, dass `Storage[6]` den Wert des Vertrags eine Zeit lang verfolgt hat. Für den Moment nennen wir es `Value*`. Das Sternchen (`*`) erinnert uns daran, dass wir noch nicht _wissen_, was diese Variable tut, aber sie kann nicht nur dazu dienen, den Vertragswert zu verfolgen, da es nicht nötig ist, den sehr teuren Speicher (Storage) zu verwenden, wenn man das Kontoguthaben mit `ADDRESS BALANCE` abrufen kann. Der erste Opcode pusht die eigene Adresse des Vertrags. Der zweite liest die Adresse oben auf dem Stack und ersetzt sie durch das Guthaben dieser Adresse.

| Offset | Opcode       | Stack                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Wir werden diesen Code am Sprungziel weiter verfolgen.

| Offset | Opcode     | Stack                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

Das `NOT` ist bitweise, es kehrt also den Wert jedes Bits im Call-Wert um.

| Offset | Opcode       | Stack                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Wir springen, wenn `Value*` kleiner als 2^256-CALLVALUE-1 oder gleich groß ist. Dies sieht nach einer Logik zur Vermeidung eines Überlaufs aus. Und tatsächlich sehen wir, dass nach ein paar unsinnigen Operationen (das Schreiben in den Arbeitsspeicher wird zum Beispiel gleich gelöscht) bei Offset 0x01DE der Smart Contract rückgängig gemacht wird (reverts), wenn der Überlauf erkannt wird, was ein normales Verhalten ist.

Beachten Sie, dass ein solcher Überlauf extrem unwahrscheinlich ist, da der Call-Wert plus `Value*` vergleichbar mit 2^256 Wei sein müsste, also etwa 10^59 ETH. [Das gesamte ETH-Angebot liegt zum Zeitpunkt des Schreibens bei weniger als zweihundert Millionen](https://etherscan.io/stat/supply).

| Offset | Opcode   | Stack                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Wenn wir hier angekommen sind, holen wir uns `Value* + CALLVALUE` und springen zu Offset 0x75.

| Offset | Opcode   | Stack                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Wenn wir hier ankommen (was voraussetzt, dass die Call-Daten leer sind), addieren wir den Call-Wert zu `Value*`. Dies stimmt mit dem überein, was wir über die Funktionsweise von `Transfer`-Transaktionen gesagt haben.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Schließlich wird der Stack geleert (was nicht notwendig ist) und das erfolgreiche Ende der Transaktion signalisiert.

Zusammenfassend ist hier ein Flussdiagramm für den anfänglichen Code.

![Flussdiagramm des Einstiegspunkts](flowchart-entry.png)

## Der Handler bei 0x7C {#the-handler-at-0x7c}

Ich habe absichtlich nicht in die Überschrift geschrieben, was dieser Handler tut. Es geht nicht darum, Ihnen beizubringen, wie dieser spezifische Smart Contract funktioniert, sondern wie man Smart Contracts per Reverse Engineering analysiert. Sie werden auf dieselbe Weise lernen, was er tut, wie ich es getan habe: indem Sie dem Code folgen.

Wir gelangen von mehreren Stellen hierher:

- Wenn es Aufrufdaten (Call Data) von 1, 2 oder 3 Bytes gibt (von Offset 0x63)
- Wenn die Methodensignatur unbekannt ist (von den Offsets 0x42 und 0x5D)

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Dies ist eine weitere Speicherzelle, die ich in keinen Transaktionen finden konnte, weshalb es schwieriger ist zu wissen, was sie bedeutet. Der untenstehende Code wird dies klarer machen.

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Diese Opcodes kürzen den Wert, den wir aus Storage[3] lesen, auf 160 Bits, die Länge einer Ethereum-Adresse.

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

Dieser Sprung ist überflüssig, da wir zum nächsten Opcode übergehen. Dieser Code ist bei weitem nicht so gas-effizient, wie er sein könnte.

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

Ganz am Anfang des Codes haben wir Mem[0x40] auf 0x80 gesetzt. Wenn wir später nach 0x40 suchen, sehen wir, dass wir es nicht ändern – wir können also davon ausgehen, dass es 0x80 ist.

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Kopiere alle Aufrufdaten in den Speicher, beginnend bei 0x80.

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

Jetzt sind die Dinge viel klarer. Dieser Smart Contract kann als [Proxy](https://blog.openzeppelin.com/proxy-patterns/) fungieren und die Adresse in Storage[3] aufrufen, um die eigentliche Arbeit zu erledigen. `DELEGATE_CALL` ruft einen separaten Smart Contract auf, bleibt aber im selben Speicher (Storage). Das bedeutet, dass der delegierte Smart Contract, für den wir ein Proxy sind, auf denselben Speicherplatz zugreift. Die Parameter für den Aufruf sind:

- _Gas_: Das gesamte verbleibende Gas
- _Aufgerufene Adresse_: Storage[3]-as-address
- _Aufrufdaten_: Die CALLDATASIZE-Bytes beginnend bei 0x80, wo wir die ursprünglichen Aufrufdaten abgelegt haben
- _Rückgabedaten_: Keine (0x00 - 0x00) Wir erhalten die Rückgabedaten auf andere Weise (siehe unten)

| Offset | Opcode         | Stack                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address                          |

Hier kopieren wir alle Rückgabedaten in den Speicherpuffer, beginnend bei 0x80.

| Offset | Opcode       | Stack                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((Aufruf Erfolg/Fehlschlag))) (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((ist der Aufruf fehlgeschlagen))) (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((ist der Aufruf fehlgeschlagen))) (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

Nach dem Aufruf kopieren wir also die Rückgabedaten in den Puffer 0x80 - 0x80+RETURNDATASIZE, und wenn der Aufruf erfolgreich ist, führen wir ein `RETURN` mit genau diesem Puffer aus.

### DELEGATECALL fehlgeschlagen {#delegatecall-failed}

Wenn wir hierher gelangen, zu 0xC0, bedeutet das, dass der aufgerufene Smart Contract revertiert (rückgängig gemacht) wurde. Da wir nur ein Proxy für diesen Smart Contract sind, möchten wir dieselben Daten zurückgeben und ebenfalls revertieren.

| Offset | Opcode   | Stack                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) RETURNDATASIZE (((Aufruf Erfolg/Fehlschlag))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

Wir führen also ein `REVERT` mit demselben Puffer aus, den wir zuvor für `RETURN` verwendet haben: 0x80 - 0x80+RETURNDATASIZE

![Flussdiagramm für Proxy-Aufruf](flowchart-proxy.png)

## ABI-Aufrufe {#abi-calls}

Wenn die Größe der Aufrufdaten (Call Data) vier Bytes oder mehr beträgt, könnte dies ein gültiger ABI-Aufruf sein.

| Offset | Opcode       | Stack                                                |
| -----: | ------------ | ---------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                                 |
|      F | CALLDATALOAD | (((Erstes Wort (256 Bits) der Aufrufdaten)))         |
|     10 | PUSH1 0xe0   | 0xE0 (((Erstes Wort (256 Bits) der Aufrufdaten)))    |
|     12 | SHR          | (((erste 32 Bits (4 Bytes) der Aufrufdaten)))        |

Etherscan teilt uns mit, dass `1C` ein unbekannter Opcode ist, da [er hinzugefügt wurde, nachdem Etherscan diese Funktion geschrieben hat](https://eips.ethereum.org/EIPS/eip-145), und sie ihn noch nicht aktualisiert haben. Eine [aktuelle Opcode-Tabelle](https://github.com/wolflo/evm-opcodes) zeigt uns, dass dies eine Rechtsverschiebung (Shift Right) ist.

| Offset | Opcode           | Stack                                                                                                       |
| -----: | ---------------- | ----------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((erste 32 Bits (4 Bytes) der Aufrufdaten))) (((erste 32 Bits (4 Bytes) der Aufrufdaten)))                 |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((erste 32 Bits (4 Bytes) der Aufrufdaten))) (((erste 32 Bits (4 Bytes) der Aufrufdaten)))      |
|     19 | GT               | 0x3CD8045E>erste-32-Bits-der-Aufrufdaten (((erste 32 Bits (4 Bytes) der Aufrufdaten)))                      |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>erste-32-Bits-der-Aufrufdaten (((erste 32 Bits (4 Bytes) der Aufrufdaten)))                 |
|     1D | JUMPI            | (((erste 32 Bits (4 Bytes) der Aufrufdaten)))                                                               |

Durch die Zweiteilung der Tests zum Abgleich der Methodensignatur auf diese Weise wird im Durchschnitt die Hälfte der Tests eingespart. Der unmittelbar darauf folgende Code und der Code in 0x43 folgen demselben Muster: `DUP1` die ersten 32 Bits der Aufrufdaten, `PUSH4 (((Methodensignatur>`, `EQ` ausführen, um auf Gleichheit zu prüfen, und dann `JUMPI`, wenn die Methodensignatur übereinstimmt. Hier sind die Methodensignaturen, ihre Adressen und, falls bekannt, [die entsprechende Methodendefinition](https://www.4byte.directory/):

| Methode                                                                                | Methodensignatur | Offset zum Hineinspringen |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103                    |
| ???                                                                                    | 0x81e580d3       | 0x0138                    |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158                    |
| ???                                                                                    | 0x1f135823       | 0x00C4                    |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED                    |

Wenn keine Übereinstimmung gefunden wird, springt der Code zum [Proxy-Handler bei 0x7C](#the-handler-at-0x7c), in der Hoffnung, dass der Vertrag, für den wir ein Proxy sind, eine Übereinstimmung aufweist.

![Flussdiagramm der ABI-Aufrufe](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Stack                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

Das Erste, was diese Funktion tut, ist zu überprüfen, ob der Aufruf kein ETH gesendet hat. Diese Funktion ist nicht [`payable`](https://solidity-by-example.org/payable/). Wenn uns jemand ETH gesendet hat, muss das ein Fehler sein, und wir wollen ein `REVERT` ausführen, um zu vermeiden, dass dieses ETH dort liegt, wo sie es nicht zurückbekommen können.

| Offset | Opcode                                            | Stack                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] d. h. der Vertrag, für den wir ein Proxy sind)))              |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] d. h. der Vertrag, für den wir ein Proxy sind)))         |
|    116 | MLOAD                                             | 0x80 (((Storage[3] d. h. der Vertrag, für den wir ein Proxy sind)))         |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] d. h. der Vertrag, für den wir ein Proxy sind))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] d. h. der Vertrag, für den wir ein Proxy sind))) |
|    12D | SWAP2                                             | (((Storage[3] d. h. der Vertrag, für den wir ein Proxy sind))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Und 0x80 enthält nun die Proxy-Adresse

| Offset | Opcode       | Stack     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Der E4-Code {#the-e4-code}

Dies ist das erste Mal, dass wir diese Zeilen sehen, aber sie werden mit anderen Methoden geteilt (siehe unten). Wir nennen den Wert im Stack also X und merken uns einfach, dass der Wert dieses X in `splitter()` 0xA0 ist.

| Offset | Opcode     | Stack       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Dieser Code empfängt also einen Speicherzeiger im Stack (X) und veranlasst den Vertrag, ein `RETURN` mit einem Puffer von 0x80 - X auszuführen.

Im Fall von `splitter()` gibt dies die Adresse zurück, für die wir ein Proxy sind. `RETURN` gibt den Puffer in 0x80-0x9F zurück, in den wir diese Daten geschrieben haben (Offset 0x130 oben).

## currentWindow() {#currentwindow}

Der Code in den Offsets 0x158-0x163 ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass `currentWindow()` ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Der DA-Code {#the-da-code}

Dieser Code wird auch von anderen Methoden verwendet. Wir nennen den Wert im Stack also Y und merken uns einfach, dass in `currentWindow()` der Wert dieses Y Storage[1] ist.

| Offset | Opcode     | Stack            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Schreibe Y nach 0x80-0x9F.

| Offset | Opcode     | Stack          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Und der Rest wurde bereits [oben](#the-e4-code) erklärt. Sprünge zu 0xDA schreiben also die Stack-Spitze (Y) nach 0x80-0x9F und geben diesen Wert zurück. Im Fall von `currentWindow()` wird Storage[1] zurückgegeben.

## merkleRoot() {#merkleroot}

Der Code in den Offsets 0xED-0xF8 ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass `merkleRoot()` ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Was nach dem Sprung passiert, [haben wir bereits herausgefunden](#the-da-code). Also gibt `merkleRoot()` Storage[0] zurück.

## 0x81e580d3 {#0x81e580d3}

Der Code in den Offsets 0x138-0x143 ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass diese Funktion ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Es sieht so aus, als ob diese Funktion mindestens 32 Bytes (ein Wort) an Calldata benötigt.

| Offset | Opcode | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Wenn sie die Calldata nicht erhält, wird die Transaktion ohne Rückgabedaten rückgängig gemacht.

Schauen wir uns an, was passiert, wenn die Funktion die benötigten Calldata _tatsächlich_ erhält.

| Offset | Opcode       | Stack                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` ist das erste Wort der Calldata _nach_ der Methodensignatur.

| Offset | Opcode       | Stack                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Wenn das erste Wort nicht kleiner als Storage[4] ist, schlägt die Funktion fehl. Sie wird ohne Rückgabewert rückgängig gemacht:

| Offset | Opcode     | Stack         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

Wenn `calldataload(4)` kleiner als Storage[4] ist, erhalten wir diesen Code:

| Offset | Opcode     | Stack                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Und die Memory-Speicherorte 0x00-0x1F enthalten nun die Daten 0x04 (0x00-0x1E sind alle Nullen, 0x1F ist vier).

| Offset | Opcode     | Stack                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Es gibt also eine Lookup-Tabelle im Storage, die beim SHA3 von 0x000...0004 beginnt und einen Eintrag für jeden legitimen Calldata-Wert (Wert unter Storage[4]) hat.

| Offset | Opcode | Stack                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Wir wissen bereits, was [der Code bei Offset 0xDA](#the-da-code) macht: Er gibt den obersten Wert des Stacks an den Aufrufer zurück. Diese Funktion gibt also den Wert aus der Lookup-Tabelle an den Aufrufer zurück.

## 0x1f135823 {#0x1f135823}

Der Code in den Offsets 0xC4-0xCF ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass diese Funktion ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Wir wissen bereits, was [der Code bei Offset 0xDA](#the-da-code) macht: Er gibt den obersten Wert des Stacks an den Aufrufer zurück. Diese Funktion gibt also `Value*` zurück.

### Methodenzusammenfassung {#method-summary}

Haben Sie das Gefühl, dass Sie den Smart Contract an diesem Punkt verstehen? Ich nicht. Bisher haben wir diese Methoden:

| Methode                           | Bedeutung                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Transfer                          | Akzeptiert den durch den Aufruf bereitgestellten Wert und erhöht `Value*` um diesen Betrag             |
| [splitter()](#splitter)           | Gibt Storage[3], die Proxy-Adresse, zurück                                                             |
| [currentWindow()](#currentwindow) | Gibt Storage[1] zurück                                                                                 |
| [merkleRoot()](#merkeroot)        | Gibt Storage[0] zurück                                                                                 |
| [0x81e580d3](#0x81e580d3)         | Gibt den Wert aus einer Lookup-Tabelle zurück, vorausgesetzt, der Parameter ist kleiner als Storage[4] |
| [0x1f135823](#0x1f135823)         | Gibt Storage[6], auch bekannt als Value\*, zurück                                                      |

Aber wir wissen, dass jede andere Funktionalität durch den Smart Contract in Storage[3] bereitgestellt wird. Wenn wir wüssten, was dieser Smart Contract ist, würde uns das vielleicht einen Hinweis geben. Zum Glück ist dies die Blockchain und alles ist bekannt, zumindest theoretisch. Wir haben keine Methoden gesehen, die Storage[3] festlegen, also muss es durch den Konstruktor festgelegt worden sein.

## Der Konstruktor {#the-constructor}

Wenn wir uns [einen Smart Contract ansehen](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), können wir auch die Transaktion sehen, die ihn erstellt hat.

![Klicken Sie auf die Erstellungstransaktion](create-tx.png)

Wenn wir auf diese Transaktion und dann auf den Reiter **State** klicken, können wir die Anfangswerte der Parameter sehen. Genauer gesagt können wir sehen, dass Storage[3] [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) enthält. Dieser Smart Contract muss die fehlende Funktionalität enthalten. Wir können ihn mit denselben Werkzeugen verstehen, die wir für den Smart Contract verwendet haben, den wir gerade untersuchen.

## Der Proxy-Vertrag {#the-proxy-contract}

Mit denselben Techniken, die wir oben für den ursprünglichen Vertrag verwendet haben, können wir sehen, dass der Vertrag einen Revert ausführt, wenn:

- Dem Aufruf ETH beigefügt ist (0x05-0x0F)
- Die Größe der Aufrufdaten (Call Data) kleiner als vier ist (0x10-0x19 und 0xBE-0xC2)

Und dass die unterstützten Methoden folgende sind:

| Methode                                                                                                         | Methodensignatur             | Offset für den Einsprung |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------ |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97) | 0x8ffb5c97                   | 0x0135                   |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151                   |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                   |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110                   |
| ???                                                                                                             | 0x3f26479e                   | 0x0118                   |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3                   |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148                   |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107                   |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122                   |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8                   |

Wir können die unteren vier Methoden ignorieren, da wir sie niemals erreichen werden. Ihre Signaturen sind so beschaffen, dass unser ursprünglicher Vertrag sie selbst übernimmt (Sie können auf die Signaturen klicken, um die Details oben zu sehen), also müssen es [überschriebene Methoden](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf) sein.

Eine der verbleibenden Methoden ist `claim(<params>)` und eine andere ist `isClaimed(<params>)`, es sieht also nach einem Airdrop-Vertrag aus. Anstatt den Rest Opcode für Opcode durchzugehen, können wir [den Decompiler ausprobieren](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), der für drei Funktionen aus diesem Vertrag brauchbare Ergebnisse liefert. Das Reverse Engineering der anderen bleibt dem Leser als Übung überlassen.

### scaleAmountByPercentage {#scaleamountbypercentage}

Das liefert uns der Decompiler für diese Funktion:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Das erste `require` prüft, ob die Aufrufdaten zusätzlich zu den vier Bytes der Funktionssignatur mindestens 64 Bytes umfassen, was für die beiden Parameter ausreicht. Wenn nicht, stimmt offensichtlich etwas nicht.

Die `if`-Anweisung scheint zu überprüfen, ob `_param1` nicht null ist und dass `_param1 * _param2` nicht negativ ist. Dies dient wahrscheinlich dazu, Fälle von Wrap-Around (Überlauf) zu verhindern.

Schließlich gibt die Funktion einen skalierten Wert zurück.

### claim {#claim}

Der Code, den der Decompiler erstellt, ist komplex und nicht alles davon ist für uns relevant. Ich werde einen Teil davon überspringen, um mich auf die Zeilen zu konzentrieren, von denen ich glaube, dass sie nützliche Informationen liefern.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Wir sehen hier zwei wichtige Dinge:

- `_param2` ist, obwohl es als `uint256` deklariert ist, tatsächlich eine Adresse
- `_param1` ist das beanspruchte Fenster (Window), das `currentWindow` oder früher sein muss.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Jetzt wissen wir also, dass Storage[5] ein Array von Fenstern und Adressen ist und speichert, ob die Adresse die Belohnung für dieses Fenster beansprucht hat.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Wir wissen, dass `unknown2eb4a7ab` eigentlich die Funktion `merkleRoot()` ist, also sieht dieser Code so aus, als würde er einen [Merkle-Proof](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) verifizieren. Das bedeutet, dass `_param4` ein Merkle-Proof ist.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Auf diese Weise überträgt ein Vertrag seine eigenen ETH an eine andere Adresse (Vertrag oder Extern verwaltetes Konto). Er ruft sie mit einem Wert auf, der dem zu übertragenden Betrag entspricht. Es sieht also so aus, als wäre dies ein Airdrop von ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Die unteren beiden Zeilen sagen uns, dass Storage[2] ebenfalls ein Vertrag ist, den wir aufrufen. Wenn wir uns [die Konstruktor-Transaktion ansehen](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), sehen wir, dass dieser Vertrag [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) ist, ein Wrapped Ether-Vertrag, [dessen Quellcode auf Etherscan hochgeladen wurde](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Es sieht also so aus, als ob der Vertrag versucht, ETH an `_param2` zu senden. Wenn er das tun kann, großartig. Wenn nicht, versucht er, [WETH](https://weth.tkn.eth.limo/) zu senden. Wenn `_param2` ein Extern verwaltetes Konto (EOA) ist, kann es immer ETH empfangen, aber Verträge können den Empfang von ETH ablehnen. WETH ist jedoch ERC-20 und Verträge können die Annahme nicht verweigern.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Am Ende der Funktion sehen wir, dass ein Protokolleintrag (Log) generiert wird. [Sehen Sie sich die generierten Protokolleinträge an](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) und filtern Sie nach dem Thema (Topic), das mit `0xdbd5...` beginnt. Wenn wir [auf eine der Transaktionen klicken, die einen solchen Eintrag generiert haben](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), sehen wir, dass es tatsächlich wie ein Claim aussieht – das Konto hat eine Nachricht an den Vertrag gesendet, den wir per Reverse Engineering untersuchen, und im Gegenzug ETH erhalten.

![Eine Claim-Transaktion](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Diese Funktion ist der obigen Funktion [`claim`](#claim) sehr ähnlich. Sie überprüft ebenfalls einen Merkle-Proof, versucht, ETH an die erste Adresse zu übertragen, und erzeugt dieselbe Art von Protokolleintrag.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Der Hauptunterschied besteht darin, dass der erste Parameter, das abzuhebende Fenster, nicht vorhanden ist. Stattdessen gibt es eine Schleife über alle Fenster, die beansprucht werden könnten.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Es sieht also nach einer `claim`-Variante aus, die alle Fenster beansprucht.

## Fazit {#conclusion}

Inzwischen sollten Sie wissen, wie man Smart Contracts versteht, deren Quellcode nicht verfügbar ist, indem man entweder die Opcodes oder (wenn es funktioniert) den Decompiler verwendet. Wie aus der Länge dieses Artikels ersichtlich ist, ist das Reverse Engineering eines Smart Contracts nicht trivial, aber in einem System, in dem Sicherheit unerlässlich ist, ist es eine wichtige Fähigkeit, überprüfen zu können, ob Smart Contracts wie versprochen funktionieren.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).