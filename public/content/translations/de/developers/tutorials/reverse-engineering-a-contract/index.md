---
title: "Reverse Engineering eines Contracts"
description: Wie Sie einen Contract verstehen, wenn Sie den Quellcode nicht haben
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
lang: de
tags: [ "evm", "Opcodes" ]
skill: advanced
published: 2021-12-30
---

## Einführung {#introduction}

_Auf der Blockchain gibt es keine Geheimnisse_, alles, was geschieht, ist konsistent, nachprüfbar und öffentlich zugänglich. Idealerweise sollten [Contracts ihren Quellcode auf Etherscan veröffentlichen und verifizieren lassen](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). [Das ist jedoch nicht immer der Fall](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). In diesem Artikel lernen Sie, wie Sie Contracts per Reverse Engineering analysieren, indem Sie sich einen Contract ohne Quellcode ansehen: [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Es gibt Reverse-Compiler, aber sie liefern nicht immer [brauchbare Ergebnisse](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). In diesem Artikel lernen Sie, wie Sie einen Contract manuell per Reverse Engineering analysieren und anhand [der Opcodes](https://github.com/wolflo/evm-opcodes) verstehen können, und wie Sie die Ergebnisse eines Decompilers interpretieren.

Um diesen Artikel zu verstehen, sollten Sie bereits die Grundlagen der EVM kennen und zumindest einigermaßen mit EVM-Assembler vertraut sein. [Hier können Sie mehr über diese Themen lesen](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Vorbereitung des ausführbaren Codes {#prepare-the-executable-code}

Sie können die Opcodes abrufen, indem Sie auf Etherscan zum Contract navigieren, auf den Tab **Contract** und dann auf **Switch to Opcodes View** klicken. Sie erhalten eine Ansicht mit einem Opcode pro Zeile.

![Opcode-Ansicht von Etherscan](opcode-view.png)

Um Sprünge (Jumps) zu verstehen, müssen Sie jedoch wissen, wo sich die einzelnen Opcodes im Code befinden. Eine Möglichkeit besteht darin, ein Google Spreadsheet zu öffnen und die Opcodes in Spalte C einzufügen. [Sie können die folgenden Schritte überspringen, indem Sie eine Kopie dieser bereits vorbereiteten Tabelle erstellen](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Der nächste Schritt besteht darin, die korrekten Code-Positionen zu ermitteln, damit wir die Sprünge verstehen können. Wir tragen die Opcode-Größe in Spalte B und die Position (in hexadezimaler Schreibweise) in Spalte A ein. Geben Sie diese Funktion in Zelle `B1` ein und kopieren Sie sie dann für den Rest von Spalte B bis zum Ende des Codes. Danach können Sie Spalte B ausblenden.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Zuerst fügt diese Funktion ein Byte für den Opcode selbst hinzu und sucht dann nach `PUSH`. Push-Opcodes sind besonders, da sie zusätzliche Bytes für den Wert benötigen, der gepusht wird. Wenn der Opcode ein `PUSH` ist, extrahieren wir die Anzahl der Bytes und addieren sie.

In `A1` setzen Sie den ersten Offset, Null. Geben Sie dann in `A2` diese Funktion ein und kopieren Sie sie wieder für den Rest der Spalte A:

```
=dec2hex(hex2dec(A1)+B1)
```

Wir benötigen diese Funktion, um den hexadezimalen Wert zu erhalten, da die Werte, die vor Sprüngen (`JUMP` und `JUMPI`) gepusht werden, in hexadezimaler Form angegeben werden.

## Der Einstiegspunkt (0x00) {#the-entry-point-0x00}

Contracts werden immer ab dem ersten Byte ausgeführt. Dies ist der erste Teil des Codes:

| Offset | Opcode       | Stack (nach dem Opcode)     |
| -----: | ------------ | ---------------------------------------------- |
|      0 | PUSH1 0x80   | 0x80                                           |
|      2 | PUSH1 0x40   | 0x40, 0x80                                     |
|      4 | MSTORE       | Leer                                           |
|      5 | PUSH1 0x04   | 0x04                                           |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|      8 | LT           | CALLDATASIZE\<4      |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|      C | JUMPI        | Leer                                           |

Dieser Code macht zwei Dinge:

1. Schreibt 0x80 als 32-Byte-Wert in die Speicherstellen 0x40-0x5F (0x80 wird in 0x5F gespeichert, und 0x40-0x5E sind alle Nullen).
2. Liest die Calldata-Größe. Normalerweise folgen die Calldata für einen Ethereum-Contract [dem ABI (Application Binary Interface)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), das mindestens vier Bytes für den Funktions-Selektor erfordert. Wenn die Calldata-Größe kleiner als vier ist, springe zu 0x5E.

![Flussdiagramm für diesen Abschnitt](flowchart-entry.png)

### Der Handler bei 0x5E (für Nicht-ABI-Calldata) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Dieses Snippet beginnt mit einem `JUMPDEST`. EVM-Programme (Ethereum Virtual Machine) lösen eine Ausnahme aus, wenn Sie zu einem Opcode springen, der nicht `JUMPDEST` ist. Dann prüft er die CALLDATASIZE und springt, wenn sie „wahr“ ist (d. h. nicht null), zu 0x7C. Darauf kommen wir unten zu sprechen.

| Offset | Opcode     | Stack (nach Opcode)                                                                                |
| -----: | ---------- | --------------------------------------------------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei), der durch den Aufruf bereitgestellt wird. Wird in Solidity `msg.value` genannt |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                                                           |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                                                         |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                                               |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                                                             |
|     6B | SLOAD      | Speicher[6] CALLVALUE 0 6 CALLVALUE                               |

Wenn es also keine Calldata gibt, lesen wir den Wert von Speicher[6]. Wir wissen noch nicht, was dieser Wert ist, aber wir können nach Transaktionen suchen, die der Contract ohne Calldata erhalten hat. Transaktionen, die nur ETH ohne Calldata (und damit ohne Methode) übertragen, haben in Etherscan die Methode `Transfer`. Tatsächlich ist [die allererste Transaktion, die der Contract erhalten hat](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7), ein Transfer.

Wenn wir uns diese Transaktion ansehen und auf **Click to see More** klicken, sehen wir, dass die Calldata, als Input Data bezeichnet, tatsächlich leer sind (`0x`). Beachten Sie auch, dass der Wert 1,559 ETH beträgt, was später relevant sein wird.

![Die Calldata sind leer](calldata-empty.png)

Klicken Sie als Nächstes auf den Tab **State** und erweitern Sie den Contract, den wir per Reverse Engineering analysieren (0x2510...). Sie können sehen, dass sich `Speicher[6]` während der Transaktion geändert hat, und wenn Sie Hex auf **Number** ändern, sehen Sie, dass es 1.559.000.000.000.000.000 wurde, der in Wei übertragene Wert (ich habe die Kommas zur besseren Lesbarkeit hinzugefügt), der dem nächsten Contract-Wert entspricht.

![Die Änderung in Speicher[6]](storage6.png)

Wenn wir uns die Zustandsänderungen ansehen, die durch [andere `Transfer`-Transaktionen aus demselben Zeitraum](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) verursacht wurden, sehen wir, dass `Speicher[6]` den Wert des Contracts eine Zeit lang nachverfolgt hat. Vorerst nennen wir es `Wert*`. Das Sternchen (`*`) erinnert uns daran, dass wir noch nicht _wissen_, was diese Variable tut, aber sie kann nicht nur dazu dienen, den Contract-Wert zu verfolgen, da es nicht nötig ist, Speicher zu verwenden, der sehr teuer ist, wenn man den Kontostand seines Accounts mit `ADDRESS BALANCE` abrufen kann. Der erste Opcode pusht die eigene Adresse des Contracts. Der zweite liest die Adresse an der Spitze des Stacks und ersetzt sie durch das Guthaben dieser Adresse.

| Offset | Opcode       | Stack                                      |
| -----: | ------------ | ------------------------------------------ |
|     6C | PUSH2 0x0075 | 0x75 Wert\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Wert\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Wert\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Wert\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |                                            |

Wir werden diesen Code am Sprungziel weiterverfolgen.

| Offset | Opcode     | Stack                                                      |
| -----: | ---------- | ---------------------------------------------------------- |
|    1A7 | JUMPDEST   | Wert\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE |

Das `NOT` ist bitweise, also kehrt es den Wert jedes Bits im Aufrufwert um.

| Offset | Opcode       | Stack                                                                                                |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------- |
|    1AC | DUP3         | Wert\* 2^256-CALLVALUE-1 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|    1AD | GT           | Wert\*>2^256-CALLVALUE-1 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|    1AE | ISZERO       | Wert\*\<=2^256-CALLVALUE-1 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Wert\*\<=2^256-CALLVALUE-1 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |                                                                                                      |

Wir springen, wenn `Wert*` kleiner oder gleich 2^256-CALLVALUE-1 ist. Das sieht nach einer Logik zur Vermeidung von Überläufen aus. Und tatsächlich sehen wir, dass der Contract nach ein paar unsinnigen Operationen (z. B. das Schreiben in den Speicher, der gleich gelöscht wird) bei Offset 0x01DE zurückgesetzt wird, wenn der Überlauf erkannt wird, was ein normales Verhalten ist.

Beachten Sie, dass ein solcher Überlauf extrem unwahrscheinlich ist, da der Aufrufwert plus `Wert*` vergleichbar mit 2^256 Wei sein müsste, was etwa 10^59 ETH entspricht. [Die gesamte ETH-Menge beträgt zum Zeitpunkt der Erstellung dieses Artikels weniger als zweihundert Millionen](https://etherscan.io/stat/supply).

| Offset | Opcode   | Stack                                    |
| -----: | -------- | ---------------------------------------- |
|    1DF | JUMPDEST | 0x00 Wert\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Wert\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Wert\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Wert\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |                                          |

Wenn wir hier angekommen sind, erhalten wir `Wert* + CALLVALUE` und springen zu Offset 0x75.

| Offset | Opcode   | Stack                          |
| -----: | -------- | ------------------------------ |
|     75 | JUMPDEST | Wert\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Wert\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Wert\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                    |

Wenn wir hier ankommen (was leere Calldata voraussetzt), addieren wir den Aufrufwert zu `Wert*`. Dies stimmt mit dem überein, was `Transfer`-Transaktionen laut unserer Aussage tun.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Leeren Sie schließlich den Stack (was nicht notwendig ist) und signalisieren Sie das erfolgreiche Ende der Transaktion.

Zusammenfassend finden Sie hier ein Flussdiagramm für den ursprünglichen Code.

![Flussdiagramm für den Einstiegspunkt](flowchart-entry.png)

## Der Handler bei 0x7C {#the-handler-at-0x7c}

Ich habe absichtlich nicht in die Überschrift geschrieben, was dieser Handler tut. Der Punkt ist nicht, Ihnen beizubringen, wie dieser spezielle Contract funktioniert, sondern wie man Contracts per Reverse Engineering analysiert. Sie werden auf die gleiche Weise wie ich lernen, was er tut, indem Sie dem Code folgen.

Wir gelangen von mehreren Stellen hierher:

- Wenn Calldata von 1, 2 oder 3 Bytes vorhanden sind (von Offset 0x63)
- Wenn die Methodensignatur unbekannt ist (von Offsets 0x42 und 0x5D)

| Offset | Opcode       | Stack                                                                     |
| -----: | ------------ | ------------------------------------------------------------------------- |
|     7C | JUMPDEST     |                                                                           |
|     7D | PUSH1 0x00   | 0x00                                                                      |
|     7F | PUSH2 0x009d | 0x9D 0x00                                                                 |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                            |
|     84 | SLOAD        | Speicher[3] 0x9D 0x00 |

Dies ist eine weitere Speicherzelle, die ich in keiner Transaktion finden konnte, so dass es schwieriger ist zu wissen, was sie bedeutet. Der folgende Code wird dies verdeutlichen.

| Offset | Opcode                                            | Stack                                                                                                                                                |
| -----: | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Speicher[3] 0x9D 0x00 |
|     9A | AND                                               | Speicher[3]-als-Adresse 0x9D 0x00                                                                |

Diese Opcodes kürzen den Wert, den wir aus Speicher[3] lesen, auf 160 Bit, die Länge einer Ethereum-Adresse.

| Offset | Opcode | Stack                                                                                 |
| -----: | ------ | ------------------------------------------------------------------------------------- |
|     9B | SWAP1  | 0x9D Speicher[3]-als-Adresse 0x00 |
|     9C | JUMP   | Speicher[3]-als-Adresse 0x00      |

Dieser Sprung ist überflüssig, da wir zum nächsten Opcode gehen. Dieser Code ist bei weitem nicht so gas-effizient, wie er sein könnte.

| Offset | Opcode     | Stack                                                                                                                                     |
| -----: | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
|     9D | JUMPDEST   | Speicher[3]-als-Adresse 0x00                                                          |
|     9E | SWAP1      | 0x00 Speicher[3]-als-Adresse                                                          |
|     9F | POP        | Speicher[3]-als-Adresse                                                               |
|     A0 | PUSH1 0x40 | 0x40 Speicher[3]-als-Adresse                                                          |
|     A2 | MLOAD      | Mem[0x40] Speicher[3]-als-Adresse |

Ganz am Anfang des Codes setzen wir Mem[0x40] auf 0x80. Wenn wir später nach 0x40 suchen, sehen wir, dass wir es nicht ändern - wir können also davon ausgehen, dass es 0x80 ist.

| Offset | Opcode       | Stack                                                                                                   |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Speicher[3]-als-Adresse           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Speicher[3]-als-Adresse      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Speicher[3]-als-Adresse |
|     A7 | CALLDATACOPY | 0x80 Speicher[3]-als-Adresse                        |

Kopieren Sie alle Calldata in den Speicher, beginnend bei 0x80.

| Offset | Opcode                             | Stack                                                                                                                                                                                        |
| -----: | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00                         | 0x00 0x80 Speicher[3]-als-Adresse                                                                                                        |
|     AA | DUP1                               | 0x00 0x00 0x80 Speicher[3]-als-Adresse                                                                                                   |
|     AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Speicher[3]-als-Adresse                                                                                      |
|     AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Speicher[3]-als-Adresse                                                                                 |
|     AD | DUP6                               | Speicher[3]-als-Adresse 0x80 CALLDATASIZE 0x00 0x00 0x80 Speicher[3]-als-Adresse     |
|     AE | GAS                                | GAS Speicher[3]-als-Adresse 0x80 CALLDATASIZE 0x00 0x00 0x80 Speicher[3]-als-Adresse |
|     AF | DELEGATE_CALL |                                                                                                                                                                                              |

Jetzt sind die Dinge viel klarer. Dieser Contract kann als [Proxy](https://blog.openzeppelin.com/proxy-patterns/) fungieren und die Adresse in Speicher[3] aufrufen, um die eigentliche Arbeit zu erledigen. `DELEGATE_CALL` ruft einen separaten Contract auf, bleibt aber im selben Speicher. Das bedeutet, dass der delegierte Contract, für den wir ein Proxy sind, auf denselben Speicherplatz zugreift. Die Parameter für den Aufruf sind:

- _Gas_: Das gesamte verbleibende Gas
- _Aufgerufene Adresse_: Speicher[3]-als-Adresse
- _Calldata_: Die CALLDATASIZE-Bytes, die bei 0x80 beginnen, wo wir die ursprünglichen Calldata platziert haben
- _Rückgabedaten_: Keine (0x00 - 0x00) Wir erhalten die Rückgabedaten auf andere Weise (siehe unten)

| Offset | Opcode         | Stack                                                                                                                                                                                                                     |
| -----: | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                          |

Hier kopieren wir alle Rückgabedaten in den Speicherpuffer, beginnend bei 0x80.

| Offset | Opcode       | Stack                                                                                                                                                                                                                                                                                                                                                                                               |
| -----: | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                                                                                                   |
|     B7 | DUP1         | (((Aufruf erfolgreich/fehlgeschlagen))) (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse  |
|     B8 | ISZERO       | (((ist der Aufruf fehlgeschlagen))) (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((ist der Aufruf fehlgeschlagen))) (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse |
|     BC | JUMPI        | (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                                                                                                   |
|     BD | DUP2         | RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                                                                                    |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                                                                               |
|     BF | RETURN       |                                                                                                                                                                                                                                                                                                                                                                                                     |

Nach dem Aufruf kopieren wir also die Rückgabedaten in den Puffer 0x80 - 0x80+RETURNDATASIZE, und wenn der Aufruf erfolgreich ist, führen wir `RETURN` mit genau diesem Puffer aus.

### DELEGATECALL fehlgeschlagen {#delegatecall-failed}

Wenn wir hier, bei 0xC0, ankommen, bedeutet das, dass der aufgerufene Contract zurückgesetzt wurde. Da wir nur ein Proxy für diesen Contract sind, wollen wir dieselben Daten zurückgeben und ebenfalls zurücksetzen.

| Offset | Opcode   | Stack                                                                                                                                                                                                                                                                                                                 |
| -----: | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse                     |
|     C1 | DUP2     | RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) RETURNDATASIZE (((Aufruf erfolgreich/fehlgeschlagen))) 0x80 Speicher[3]-als-Adresse |
|     C3 | REVERT   |                                                                                                                                                                                                                                                                                                                       |

Wir führen also `REVERT` mit demselben Puffer aus, den wir zuvor für `RETURN` verwendet haben: 0x80 - 0x80+RETURNDATASIZE

![Aufruf an Proxy-Flussdiagramm](flowchart-proxy.png)

## ABI-Aufrufe {#abi-calls}

Wenn die Calldata-Größe vier Bytes oder mehr beträgt, könnte dies ein gültiger ABI-Aufruf sein.

| Offset | Opcode       | Stack                                                                                                                     |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                                                                                                      |
|      F | CALLDATALOAD | (((Erstes Wort (256 Bit) der Calldata)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Erstes Wort (256 Bit) der Calldata))) |
|     12 | SHR          | (((erste 32 Bits (4 Bytes) der Calldata)))    |

Etherscan teilt uns mit, dass `1C` ein unbekannter Opcode ist, da [er hinzugefügt wurde, nachdem Etherscan diese Funktion geschrieben hat](https://eips.ethereum.org/EIPS/eip-145) und sie sie nicht aktualisiert haben. Eine [aktuelle Opcode-Tabelle](https://github.com/wolflo/evm-opcodes) zeigt uns, dass dies eine Rechtsverschiebung ist

| Offset | Opcode           | Stack                                                                                                                                                                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((erste 32 Bits (4 Bytes) der Calldata))) (((erste 32 Bits (4 Bytes) der Calldata)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((erste 32 Bits (4 Bytes) der Calldata))) (((erste 32 Bits (4 Bytes) der Calldata))) |
|     19 | GT               | 0x3CD8045E>erste-32-Bits-der-Calldata (((erste 32 Bits (4 Bytes) der Calldata)))                                                                                             |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>erste-32-Bits-der-Calldata (((erste 32 Bits (4 Bytes) der Calldata)))                                                                                        |
|     1D | JUMPI            | (((erste 32 Bits (4 Bytes) der Calldata)))                                                                                                                                   |

Indem die Tests zum Abgleich der Methodensignatur auf diese Weise in zwei Teile aufgeteilt werden, wird im Durchschnitt die Hälfte der Tests eingespart. Der Code, der unmittelbar darauf folgt, und der Code in 0x43 folgen demselben Muster: `DUP1` die ersten 32 Bits der Calldata, `PUSH4 (((Methodensignatur>`, `EQ` ausführen, um auf Gleichheit zu prüfen, und dann `JUMPI`, wenn die Methodensignatur übereinstimmt. Hier sind die Methodensignaturen, ihre Adressen und, falls bekannt, [die entsprechende Methodendefinition](https://www.4byte.directory/):

| Methode                                                                                                   | Methodensignatur | Offset, zu dem gesprungen wird |
| --------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------ |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103                         |
| ???                                                                                                       | 0x81e580d3       | 0x0138                         |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158                         |
| ???                                                                                                       | 0x1f135823       | 0x00C4                         |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED                         |

Wenn keine Übereinstimmung gefunden wird, springt der Code zum [Proxy-Handler bei 0x7C](#the-handler-at-0x7c) in der Hoffnung, dass der Contract, für den wir ein Proxy sind, eine Übereinstimmung hat.

![Flussdiagramm der ABI-Aufrufe](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Stack                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |                               |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |                               |

Als Erstes prüft diese Funktion, ob der Aufruf keine ETH gesendet hat. Diese Funktion ist nicht [`payable`](https://solidity-by-example.org/payable/). Wenn uns jemand ETH geschickt hat, muss das ein Fehler sein und wir wollen `REVERT` ausführen, um zu vermeiden, dass diese ETH dort sind, wo sie sie nicht zurückbekommen können.

| Offset | Opcode                                            | Stack                                                                                                                                                                                                                                                                                         |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                                                                                                                                                                                                                                               |
|    110 | POP                                               |                                                                                                                                                                                                                                                                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                                                                                          |
|    113 | SLOAD                                             | (((Speicher[3] a.k.a. der Contract, für den wir ein Proxy sind)))                                                                |
|    114 | PUSH1 0x40                                        | 0x40 (((Speicher[3] a.k.a. der Contract, für den wir ein Proxy sind)))                                                           |
|    116 | MLOAD                                             | 0x80 (((Speicher[3] a.k.a. der Contract, für den wir ein Proxy sind)))                                                           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Speicher[3] a.k.a. der Contract, für den wir ein Proxy sind))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Speicher[3] a.k.a. der Contract, für den wir ein Proxy sind))) |
|    12D | SWAP2                                             | (((Speicher[3] a.k.a. der Contract, für den wir ein Proxy sind))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                                                                                                                |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                                                                                                           |
|    130 | MSTORE                                            | 0x80                                                                                                                                                                                                                                                                                          |

Und 0x80 enthält nun die Proxy-Adresse

| Offset | Opcode       | Stack     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Der E4-Code {#the-e4-code}

Wir sehen diese Zeilen zum ersten Mal, aber sie werden mit anderen Methoden geteilt (siehe unten). Wir nennen den Wert im Stack also X und merken uns nur, dass in `splitter()` der Wert dieses X 0xA0 ist.

| Offset | Opcode     | Stack       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |             |

Dieser Code empfängt also einen Speicherzeiger im Stack (X) und veranlasst den Contract, mit einem Puffer, der 0x80 - X ist, `RETURN` auszuführen.

Im Fall von `splitter()` wird die Adresse zurückgegeben, für die wir ein Proxy sind. `RETURN` gibt den Puffer in 0x80-0x9F zurück, wo wir diese Daten geschrieben haben (Offset 0x130 oben).

## currentWindow() {#currentwindow}

Der Code in den Offsets 0x158-0x163 ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (außer dem `JUMPI`-Ziel), also wissen wir, dass `currentWindow()` auch nicht `payable` ist.

| Offset | Opcode       | Stack                                                                     |
| -----: | ------------ | ------------------------------------------------------------------------- |
|    164 | JUMPDEST     |                                                                           |
|    165 | POP          |                                                                           |
|    166 | PUSH2 0x00da | 0xDA                                                                      |
|    169 | PUSH1 0x01   | 0x01 0xDA                                                                 |
|    16B | SLOAD        | Speicher[1] 0xDA      |
|    16C | DUP2         | 0xDA Speicher[1] 0xDA |
|    16D | JUMP         | Speicher[1] 0xDA      |

### Der DA-Code {#the-da-code}

Dieser Code wird auch von anderen Methoden verwendet. Wir nennen den Wert im Stack also Y und merken uns nur, dass in `currentWindow()` der Wert dieses Y Speicher[1] ist.

| Offset | Opcode     | Stack            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Schreiben Sie Y nach 0x80-0x9F.

| Offset | Opcode     | Stack          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Und der Rest wird bereits [oben](#the-e4-code) erklärt. Sprünge zu 0xDA schreiben also den obersten Stack-Wert (Y) in 0x80-0x9F und geben diesen Wert zurück. Im Fall von `currentWindow()` wird Speicher[1] zurückgegeben.

## merkleRoot() {#merkleroot}

Der Code in den Offsets 0xED-0xF8 ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass `merkleRoot()` ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack                                                                     |
| -----: | ------------ | ------------------------------------------------------------------------- |
|     F9 | JUMPDEST     |                                                                           |
|     FA | POP          |                                                                           |
|     FB | PUSH2 0x00da | 0xDA                                                                      |
|     FE | PUSH1 0x00   | 0x00 0xDA                                                                 |
|    100 | SLOAD        | Speicher[0] 0xDA      |
|    101 | DUP2         | 0xDA Speicher[0] 0xDA |
|    102 | JUMP         | Speicher[0] 0xDA      |

Was nach dem Sprung passiert, [haben wir bereits herausgefunden](#the-da-code). `merkleRoot()` gibt also Speicher[0] zurück.

## 0x81e580d3 {#0x81e580d3}

Der Code in den Offsets 0x138-0x143 ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass diese Funktion ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack                                                                           |
| -----: | ------------ | ------------------------------------------------------------------------------- |
|    144 | JUMPDEST     |                                                                                 |
|    145 | POP          |                                                                                 |
|    146 | PUSH2 0x00da | 0xDA                                                                            |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

Es sieht so aus, als ob diese Funktion mindestens 32 Bytes (ein Wort) an Calldata benötigt.

| Offset | Opcode | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |                                              |

Wenn sie die Calldata nicht erhält, wird die Transaktion ohne Rückgabedaten zurückgesetzt.

Sehen wir uns an, was passiert, wenn die Funktion die benötigten Calldata _doch_ erhält.

| Offset | Opcode       | Stack                                                       |
| -----: | ------------ | ----------------------------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` ist das erste Wort der Calldata _nach_ der Methodensignatur

| Offset | Opcode       | Stack                                                                                                                                                                                                                 |
| -----: | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                           |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                           |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                        |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                               |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                               |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                        |
|    157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                               |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                               |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                          |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                       |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                  |
|    173 | SLOAD        | Speicher[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
|    174 | DUP2         | calldataload(4) Speicher[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    175 | LT           | calldataload(4)\<Speicher[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Speicher[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                       |

Wenn das erste Wort nicht kleiner als Speicher[4] ist, schlägt die Funktion fehl. Sie wird ohne zurückgegebenen Wert zurückgesetzt:

| Offset | Opcode     | Stack                                                         |
| -----: | ---------- | ------------------------------------------------------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |                                                               |

Wenn calldataload(4) kleiner als Speicher[4] ist, erhalten wir diesen Code:

| Offset | Opcode     | Stack                                                                                     |
| -----: | ---------- | ----------------------------------------------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Und die Speicherorte 0x00-0x1F enthalten nun die Daten 0x04 (0x00-0x1E sind alle Nullen, 0x1F ist vier)

| Offset | Opcode     | Stack                                                                                                                                                                                                                        |
| -----: | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                         |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                         |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                         |
|    188 | SHA3       | (((SHA3 von 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                 |
|    189 | ADD        | (((SHA3 von 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                 |
|    18A | SLOAD      | Speicher[(((SHA3 von 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Es gibt also eine Nachschlagetabelle im Speicher, die beim SHA3 von 0x000...0004 beginnt und einen Eintrag für jeden legitimen Calldata-Wert hat (Wert unter Speicher[4]).

| Offset | Opcode | Stack                                                                                                                                                                                                                        |
| -----: | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Speicher[(((SHA3 von 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Speicher[(((SHA3 von 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|    18D | DUP2   | 0xDA Speicher[(((SHA3 von 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|    18E | JUMP   | Speicher[(((SHA3 von 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

Wir wissen bereits, was [der Code bei Offset 0xDA](#the-da-code) tut, er gibt den obersten Wert des Stacks an den Aufrufer zurück. Diese Funktion gibt also den Wert aus der Nachschlagetabelle an den Aufrufer zurück.

## 0x1f135823 {#0x1f135823}

Der Code in den Offsets 0xC4-0xCF ist identisch mit dem, was wir in 0x103-0x10E in `splitter()` gesehen haben (abgesehen vom `JUMPI`-Ziel), also wissen wir, dass diese Funktion ebenfalls nicht `payable` ist.

| Offset | Opcode       | Stack            |
| -----: | ------------ | ---------------- |
|     D0 | JUMPDEST     |                  |
|     D1 | POP          |                  |
|     D2 | PUSH2 0x00da | 0xDA             |
|     D5 | PUSH1 0x06   | 0x06 0xDA        |
|     D7 | SLOAD        | Wert\* 0xDA      |
|     D8 | DUP2         | 0xDA Wert\* 0xDA |
|     D9 | JUMP         | Wert\* 0xDA      |

Wir wissen bereits, was [der Code bei Offset 0xDA](#the-da-code) tut, er gibt den obersten Wert des Stacks an den Aufrufer zurück. Diese Funktion gibt also `Wert*` zurück.

### Methoden-Zusammenfassung {#method-summary}

Haben Sie das Gefühl, dass Sie den Contract an diesem Punkt verstehen? Ich nicht. Bisher haben wir diese Methoden:

| Methode                                              | Bedeutung                                                                                                                                                       |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transfer                                             | Akzeptieren Sie den vom Aufruf bereitgestellten Wert und erhöhen Sie `Wert*` um diesen Betrag                                                                   |
| [splitter()](#splitter)           | Gibt Speicher[3], die Proxy-Adresse, zurück                                                                 |
| [currentWindow()](#currentwindow) | Gibt Speicher[1] zurück                                                                                     |
| [merkleRoot()](#merkleroot)       | Gibt Speicher[0] zurück                                                                                     |
| [0x81e580d3](#0x81e580d3)                            | Gibt den Wert aus einer Nachschlagetabelle zurück, vorausgesetzt, der Parameter ist kleiner als Speicher[4] |
| [0x1f135823](#0x1f135823)                            | Gibt Speicher[6] zurück, a.k.a. Wert\*                      |

Aber wir wissen, dass jede andere Funktionalität vom Contract in Speicher[3] bereitgestellt wird. Vielleicht gibt es uns einen Hinweis, wenn wir wüssten, was dieser Contract ist. Zum Glück ist dies die Blockchain und alles ist bekannt, zumindest in der Theorie. Wir haben keine Methoden gesehen, die Speicher[3] setzen, also muss er vom Konstruktor gesetzt worden sein.

## Der Konstruktor {#the-constructor}

Wenn wir uns [einen Contract ansehen](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), können wir auch die Transaktion sehen, die ihn erstellt hat.

![Klicken Sie auf die Erstellungstransaktion](create-tx.png)

Wenn wir auf diese Transaktion und dann auf den Tab **State** klicken, können wir die Anfangswerte der Parameter sehen. Insbesondere können wir sehen, dass Speicher[3] [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) enthält. Dieser Contract muss die fehlende Funktionalität enthalten. Wir können ihn mit denselben Werkzeugen verstehen, die wir für den von uns untersuchten Contract verwendet haben.

## Der Proxy-Contract {#the-proxy-contract}

Mit den gleichen Techniken, die wir für den ursprünglichen Contract oben verwendet haben, können wir sehen, dass der Contract zurückgesetzt wird, wenn:

- Dem Aufruf ETH beigefügt ist (0x05-0x0F)
- Die Calldata-Größe ist kleiner als vier (0x10-0x19 und 0xBE-0xC2)

Und dass die Methoden, die es unterstützt, sind:

| Methode                                                                                                                                                                                | Methodensignatur             | Offset, zu dem gesprungen wird |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------ |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135                         |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151                         |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                         |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110                         |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118                         |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3                         |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148                         |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107                         |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122                         |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8                         |

Wir können die unteren vier Methoden ignorieren, weil wir sie nie erreichen werden. Ihre Signaturen sind so, dass unser ursprünglicher Contract sich selbst um sie kümmert (Sie können auf die Signaturen klicken, um die Details oben zu sehen), also müssen es [Methoden sein, die überschrieben werden](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Eine der verbleibenden Methoden ist `claim(<params>)`, und eine andere ist `isClaimed(<params>)`, also sieht es wie ein Airdrop-Contract aus. Anstatt den Rest Opcode für Opcode durchzugehen, können wir [den Decompiler ausprobieren](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), der für drei Funktionen aus diesem Contract brauchbare Ergebnisse liefert. Das Reverse Engineering der anderen wird dem Leser als Übung überlassen.

### scaleAmountByPercentage {#scaleamountbypercentage}

Das gibt uns der Decompiler für diese Funktion aus:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Das erste `require` testet, ob die Calldata zusätzlich zu den vier Bytes der Funktionssignatur mindestens 64 Bytes haben, genug für die beiden Parameter. Wenn nicht, dann ist offensichtlich etwas falsch.

Die `if`-Anweisung scheint zu prüfen, dass `_param1` nicht Null ist und dass `_param1 * _param2` nicht negativ ist. Es dient wahrscheinlich dazu, Fälle von Wrap-Around zu verhindern.

Schließlich gibt die Funktion einen skalierten Wert zurück.

### claim {#claim}

Der vom Decompiler erstellte Code ist komplex und nicht alles davon ist für uns relevant. Ich werde einen Teil davon überspringen, um mich auf die Zeilen zu konzentrieren, von denen ich glaube, dass sie nützliche Informationen liefern

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Wir sehen hier zwei wichtige Dinge:

- `_param2` ist, obwohl als `uint256` deklariert, tatsächlich eine Adresse
- `_param1` ist das Fenster, das beansprucht wird, und muss `currentWindow` oder früher sein.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Jetzt wissen wir also, dass Speicher[5] ein Array von Fenstern und Adressen ist und ob die Adresse die Belohnung für dieses Fenster beansprucht hat.

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

Wir wissen, dass `unknown2eb4a7ab` eigentlich die Funktion `merkleRoot()` ist, also sieht dieser Code so aus, als würde er einen [Merkle-Beweis](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) verifizieren. Das bedeutet, dass `_param4` ein Merkle-Beweis ist.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

So überträgt ein Contract seine eigenen ETH an eine andere Adresse (Contract oder externer Besitz). Er ruft ihn mit einem Wert auf, der dem zu übertragenden Betrag entspricht. Es sieht also so aus, als ob dies ein Airdrop von ETH ist.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Die unteren beiden Zeilen sagen uns, dass Speicher[2] auch ein Contract ist, den wir aufrufen. Wenn wir uns [die Konstruktor-Transaktion ansehen](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), sehen wir, dass dieser Contract [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) ist, ein Wrapped Ether-Contract, [dessen Quellcode auf Etherscan hochgeladen wurde](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Es sieht also so aus, als ob die Contracts versuchen, ETH an `_param2` zu senden. Wenn er es tun kann, großartig. Wenn nicht, versucht er, [WETH](https://weth.tkn.eth.limo/) zu senden. Wenn `_param2` ein Konto in externem Besitz (EOA) ist, kann es immer ETH empfangen, aber Contracts können den Empfang von ETH verweigern. WETH ist jedoch ERC-20 und Contracts können die Annahme nicht verweigern.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Am Ende der Funktion sehen wir, dass ein Log-Eintrag generiert wird. [Sehen Sie sich die generierten Log-Einträge an](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) und filtern Sie nach dem Thema, das mit `0xdbd5...` beginnt. Wenn wir [auf eine der Transaktionen klicken, die einen solchen Eintrag generiert haben](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), sehen wir, dass es tatsächlich wie ein Anspruch aussieht - das Konto hat eine Nachricht an den Contract gesendet, den wir per Reverse Engineering analysieren, und im Gegenzug ETH erhalten.

![Eine Anspruchs-Transaktion](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Diese Funktion ist sehr ähnlich zu [`claim`](#claim) oben. Es prüft auch einen Merkle-Beweis, versucht ETH auf den ersten zu übertragen und erzeugt die gleiche Art von Log-Eintrag.

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

Es sieht also wie eine `claim`-Variante aus, die alle Fenster beansprucht.

## Fazit {#conclusion}

Inzwischen sollten Sie wissen, wie Sie Contracts verstehen können, deren Quellcode nicht verfügbar ist, indem Sie entweder die Opcodes oder (wenn es funktioniert) den Decompiler verwenden. Wie aus der Länge dieses Artikels ersichtlich ist, ist das Reverse Engineering eines Contracts nicht trivial, aber in einem System, in dem Sicherheit unerlässlich ist, ist es eine wichtige Fähigkeit, überprüfen zu können, ob Contracts wie versprochen funktionieren.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
