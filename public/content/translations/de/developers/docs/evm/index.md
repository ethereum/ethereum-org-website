---
title: Ethereum Virtuelle Maschine (EVM)
description: Eine Einführung in die virtuelle Maschine von Ethereum und wie sie sich auf Zustand, Transaktionen und Smart Contracts bezieht.
lang: de
---

Die Ethereum Virtual Machine (EVM) ist eine dezentrale virtuelle Umgebung, die Code konsistent und sicher auf allen Ethereum-Knoten ausführt. Knoten führen die EVM aus, um Smart Contracts auszuführen, wobei sie "[Gas](/developers/docs/gas/)" verwenden, um den für [Operationen](/developers/docs/evm/opcodes/) erforderlichen Rechenaufwand zu messen, wodurch eine effiziente Ressourcenzuweisung und Netzwerksicherheit gewährleistet werden.

## Voraussetzungen {#prerequisites}

Einige grundlegende Kenntnisse der gängigen Terminologie der Informatik wie [Bytes](https://wikipedia.org/wiki/Byte), [Speicher](https://wikipedia.org/wiki/Computer_memory) und ein [Stack](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)) sind notwendig, um die EVM zu verstehen. Es wäre auch hilfreich, mit Kryptographie-/Blockchain-Konzepten wie [Hash-Funktionen](https://wikipedia.org/wiki/Cryptographic_hash_function) und dem [Merkle-Baum](https://wikipedia.org/wiki/Merkle_tree) vertraut zu sein.

## Vom Hauptbuch zur Zustandsmaschine {#from-ledger-to-state-machine}

Die Analogie eines 'verteilten Schalters' wird oft verwendet, um Blockchains wie Bitcoin zu beschreiben, die eine dezentrale Währung mit grundlegenden Tools der Kryptographie ermöglichen. Der Ledger führt eine Aufzeichnung von Aktivitäten, die sich an eine Reihe von Regeln halten müssen, die wiederum bestimmen, welche Aktionen erfolgen bzw. nicht erfolgen können, um den Ledger zu verändern. Zum Beispiel kann eine Bitcoin-Adresse nicht mehr Bitcoin ausgeben, als sie zuvor erhalten hat. Diese Regeln untermauern alle Transaktionen auf Bitcoin und vielen anderen Blockchains.

Während Ethereum seine eigene native Kryptowährung (Ether) hat, die fast genau den gleichen intuitiven Regeln folgt, ermöglicht es auch eine viel mächtigere Funktion: [Smart Contracts](/developers/docs/smart-contracts/). Für diese komplexere Funktion ist eine ausgeklügeltere Analogie erforderlich. Anstelle eines verteilten Hauptbuchs ist Ethereum eine verteilte [Zustandsmaschine](https://wikipedia.org/wiki/Finite-state_machine). Der Zustand von Ethereum ist eine große Datenstruktur, die nicht nur alle Konten und Guthaben enthält, sondern auch einen _Maschinenzustand_, der sich von Block zu Block nach einem vordefinierten Satz von Regeln ändern kann und der beliebigen Maschinencode ausführen kann. Die spezifischen Regeln für das Ändern des Zustands von Block zu Block werden vom EVM definiert.

![Ein Diagramm, das den Aufbau der EVM zeigt](./evm.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Die Ethereum-Zustandsübergangsfunktion {#the-ethereum-state-transition-function}

Die EVM verhält sich wie eine mathematische Funktion: Mit einer Eingabe, erzeugt sie eine deterministische Ausgabe. Daher ist es sehr hilfreich, Ethereum formeller als etwas zu beschreiben, das über eine **Zustandsübergangsfunktion** verfügt:

```
Y(S, T)= S'
```

Bei einem alten gültigen Zustand `(S)` und einem neuen Satz gültiger Transaktionen `(T)` erzeugt die Ethereum-Zustandsübergangsfunktion `Y(S, T)` einen neuen gültigen Ausgabezustand `S'`

### Zustand {#state}

Im Kontext von Ethereum ist der Zustand eine riesige Datenstruktur, die als [modifizierter Merkle-Patricia-Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) bezeichnet wird. Sie hält alle [Konten](/developers/docs/accounts/), die durch Hashes verknüpft sind, und ist auf einen einzigen Root-Hash reduzierbar, der auf der Blockchain gespeichert ist.

### Transaktionen {#transactions}

Transaktionen sind kryptographisch signierte Anweisungen von Konten. Es gibt zwei Arten von Transaktionen: solche, die zu Nachrichtenanrufen führen, und solche, die zur Erstellung von Verträgen führen.

Die Vertragserstellung führt zur Erstellung eines neuen Vertragskontos, das kompilierten [Smart-Contract](/developers/docs/smart-contracts/anatomy/)-Bytecode enthält. Immer wenn ein anderes Konto einen Nachrichtenaufruf an diesen Vertrag stellt, führt es seinen Bytecode aus.

## EVM-Anweisungen {#evm-instructions}

Die EVM wird als [Stack-Maschine](https://wikipedia.org/wiki/Stack_machine) mit einer Tiefe von 1024 Elementen ausgeführt. Jedes Element ist ein 256-Bit-Wort, das für die einfache Verwendung mit 256-Bit-Kryptographie (wie Keccak-256-Hashes oder secp256k1-Signaturen) gewählt wurde.

Während der Ausführung unterhält die EVM einen transienten _Speicher_ (als wortadressiertes Byte-Array), der zwischen den Transaktionen nicht persistent ist.

### Transienter Speicher

Der transiente Speicher ist ein Schlüssel-Wert-Speicher pro Transaktion, auf den über die Opcodes `TSTORE` und `TLOAD` zugegriffen wird. Er bleibt über alle internen Aufrufe innerhalb derselben Transaktion bestehen, wird aber am Ende der Transaktion gelöscht. Im Gegensatz zum Speicher wird der transiente Speicher als Teil des EVM-Zustands und nicht als Teil des Ausführungsrahmens modelliert, aber er wird nicht in den globalen Zustand übernommen. Der transiente Speicher ermöglicht eine gas-effiziente, temporäre Zustandsfreigabe über interne Aufrufe während einer Transaktion hinweg.

### Speicherort

Verträge enthalten einen Merkle-Patricia-_Speicher_-Trie (als wortadressierbares Wort-Array), der mit dem betreffenden Konto verknüpft und Teil des globalen Zustands ist. Dieser persistente Speicher unterscheidet sich vom transienten Speicher, der nur für die Dauer einer einzigen Transaktion verfügbar ist und nicht Teil des persistenten Speicher-Tries des Kontos ist.

### Operationscodes

Kompilierter Smart-Contract-Bytecode wird als eine Reihe von EVM-[Opcodes](/developers/docs/evm/opcodes) ausgeführt, die Standard-Stack-Operationen wie `XOR`, `AND`, `ADD`, `SUB` usw. durchführen. Die EVM implementiert auch eine Reihe von Blockchain-spezifischen Stack-Operationen, wie z. B. `ADDRESS`, `BALANCE`, `BLOCKHASH`, usw. Das Opcode-Set enthält auch `TSTORE` und `TLOAD`, die den Zugriff auf den transienten Speicher ermöglichen.

![Ein Diagramm, das zeigt, wo Gas für EVM-Operationen benötigt wird](../gas/gas.png)
_Diagramme adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## EVM-Implementierungen {#evm-implementations}

Alle Implementierungen der EVM müssen sich nach der im Yellowpaper von Ethereum beschriebenen Spezifikation richten.

In der zehnjährigen Geschichte von Ethereum wurde die EVM mehrfach überarbeitet, und es gibt mehrere Implementierungen der EVM in verschiedenen Programmiersprachen.

[Ethereum-Ausführungs-Clients](/developers/docs/nodes-and-clients/#execution-clients) beinhalten eine EVM-Implementierung. Zusätzlich gibt es mehrere eigenständige Implementierungen, einschließlich:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Weiterführende Lektüre {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM: Semantics of EVM in K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opcodes der Ethereum Virtual Machine](https://www.ethervm.io/)
- [Interaktive Referenz der Opcodes der Ethereum Virtual Machine](https://www.evm.codes/)
- [Eine kurze Einführung in der Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum – Die Ethereum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Verwandte Themen {#related-topics}

- [Gas](/developers/docs/gas/)
