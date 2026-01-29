---
title: "Verträge verkleinern, um die Vertragsgrößenbeschränkung zu bekämpfen"
description: "Was kannst du tun, um zu verhindern, dass deine Smart Contracts zu groß werden?"
author: Markus Waas
lang: de
tags: [ "solidity", "intelligente Verträge", "Speicher" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Warum gibt es ein Limit? {#why-is-there-a-limit}

Am [22. November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) wurde mit dem Spurious Dragon Hard-Fork [EIP-170](https://eips.ethereum.org/EIPS/eip-170) ein Größenlimit von 24.576 kB für Smart Contracts eingeführt. Für dich als Solidity-Entwickler bedeutet dies: Wenn du deinem Vertrag immer mehr Funktionalität hinzufügst, wirst du irgendwann das Limit erreichen und beim Deployment folgenden Fehler sehen:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Dieses Limit wurde eingeführt, um Denial-of-Service-Angriffe (DOS) zu verhindern. Jeder Aufruf eines Vertrags ist in Bezug auf das Gas relativ günstig. Die Auswirkung eines Vertragsaufrufs für Ethereum-Nodes steigt jedoch in Abhängigkeit von der Größe des aufgerufenen Vertragscodes unverhältnismäßig an (Lesen des Codes von der Festplatte, Vorverarbeitung des Codes, Hinzufügen von Daten zum Merkle-Proof). Immer wenn eine Situation vorliegt, in der der Angreifer nur wenige Ressourcen benötigt, um anderen viel Arbeit zu verursachen, besteht die Gefahr von DOS-Angriffen.

Ursprünglich war dies kein so großes Problem, da eine natürliche Begrenzung der Vertragsgröße das Block-Gaslimit ist. Ein Vertrag muss natürlich innerhalb einer Transaktion bereitgestellt werden, die den gesamten Bytecode des Vertrags enthält. Wenn du nur diese eine Transaktion in einen Block aufnimmst, kannst du das gesamte Gas verbrauchen, aber es ist nicht unendlich. Seit dem [London-Upgrade](/ethereum-forks/#london) kann das Block-Gaslimit je nach Netzwerkauslastung zwischen 15 und 30 Millionen Einheiten variieren.

Im Folgenden werden wir uns einige Methoden ansehen, geordnet nach ihrer potenziellen Auswirkung. Stell es dir wie beim Abnehmen vor. Die beste Strategie, um das Zielgewicht zu erreichen (in unserem Fall 24 kB), ist, sich zuerst auf die Methoden mit der größten Wirkung zu konzentrieren. In den meisten Fällen reicht eine Ernährungsumstellung aus, um dieses Ziel zu erreichen, aber manchmal braucht man ein bisschen mehr. Dann könntest du etwas Sport (mittlere Auswirkung) oder sogar Nahrungsergänzungsmittel (geringe Auswirkung) hinzufügen.

## Große Auswirkung {#big-impact}

### Trenne deine Verträge {#separate-your-contracts}

Das sollte immer dein erster Ansatz sein. Wie kannst du den Vertrag in mehrere kleinere aufteilen? Im Allgemeinen zwingt dich das, eine gute Architektur für deine Verträge zu entwickeln. Kleinere Verträge sind aus Sicht der Code-Lesbarkeit immer zu bevorzugen. Stell dir beim Aufteilen von Verträgen folgende Fragen:

- Welche Funktionen gehören zusammen? Jede Gruppe von Funktionen ist möglicherweise in einem eigenen Vertrag am besten aufgehoben.
- Welche Funktionen erfordern nicht das Lesen des Vertragszustands oder nur einer bestimmten Teilmenge des Zustands?
- Kannst du Speicher und Funktionalität trennen?

### Bibliotheken {#libraries}

Eine einfache Möglichkeit, den Funktionalitätscode vom Speicher zu trennen, ist die Verwendung einer [Bibliothek](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Deklariere die Bibliotheksfunktionen nicht als „internal“, da diese während der Kompilierung direkt [zum Vertrag hinzugefügt](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) werden. Wenn du aber „public“-Funktionen verwendest, befinden sich diese tatsächlich in einem separaten Bibliotheksvertrag. Erwäge die Verwendung von „[using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for)“, um die Nutzung von Bibliotheken komfortabler zu gestalten.

### Proxys {#proxies}

Eine fortgeschrittenere Strategie wäre ein Proxysystem. Bibliotheken verwenden im Hintergrund `DELEGATECALL`, was einfach die Funktion eines anderen Vertrags mit dem Zustand des aufrufenden Vertrags ausführt. In [diesem Blogbeitrag](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) erfährst du mehr über Proxysysteme. Sie bieten dir mehr Funktionalität, z. B. ermöglichen sie die Upgradefähigkeit, aber sie fügen auch eine Menge Komplexität hinzu. Ich würde sie nicht nur zur Reduzierung der Vertragsgröße hinzufügen, es sei denn, es ist aus irgendeinem Grund deine einzige Option.

## Mittlere Auswirkung {#medium-impact}

### Funktionen entfernen {#remove-functions}

Das sollte selbsterklärend sein. Funktionen vergrößern einen Vertrag erheblich.

- **External**: Oft fügen wir aus Bequemlichkeitsgründen viele Ansichtsfunktionen hinzu. Das ist völlig in Ordnung, bis du an das Größenlimit stößt. Dann solltest du wirklich darüber nachdenken, alle bis auf die absolut notwendigen zu entfernen.
- **Internal**: Du kannst auch interne/private Funktionen entfernen und den Code einfach inline einfügen, solange die Funktion nur einmal aufgerufen wird.

### Vermeide zusätzliche Variablen {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Eine einfache Änderung wie diese macht einen Unterschied von **0,28 kB** aus. Wahrscheinlich findest du viele ähnliche Situationen in deinen Verträgen, und diese können sich wirklich zu erheblichen Mengen summieren.

### Fehlermeldungen kürzen {#shorten-error-message}

Lange „revert“-Meldungen und insbesondere viele verschiedene „revert“-Meldungen können den Vertrag aufblähen. Verwende stattdessen kurze Fehlercodes und dekodiere sie in deinem Vertrag. Eine lange Meldung könnte viel kürzer werden:

```solidity
require(msg.sender == owner, "Nur der Besitzer dieses Vertrags kann diese Funktion aufrufen");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Verwende benutzerdefinierte Fehler anstelle von Fehlermeldungen

Benutzerdefinierte Fehler wurden in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) eingeführt. Sie sind eine großartige Möglichkeit, die Größe deiner Verträge zu reduzieren, da sie als Selektoren ABI-kodiert werden (genau wie Funktionen).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Ziehe einen niedrigen „run“-Wert im Optimizer in Betracht {#consider-a-low-run-value-in-the-optimizer}

Du kannst auch die Optimizer-Einstellungen ändern. Der Standardwert von 200 bedeutet, dass er versucht, den Bytecode so zu optimieren, als ob eine Funktion 200 Mal aufgerufen würde. Wenn du ihn auf 1 änderst, weist du den Optimizer im Grunde an, für den Fall zu optimieren, dass jede Funktion nur einmal ausgeführt wird. Eine für die einmalige Ausführung optimierte Funktion bedeutet, dass sie für die Bereitstellung selbst optimiert ist. Beachte, dass **dies die [Gaskosten](/developers/docs/gas/) für die Ausführung der Funktionen erhöht**, also möchtest du das vielleicht nicht tun.

## Geringe Auswirkung {#small-impact}

### Vermeide die Übergabe von Structs an Funktionen {#avoid-passing-structs-to-functions}

Wenn du den [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2) verwendest, kann es helfen, keine Structs an eine Funktion zu übergeben. Anstatt den Parameter als Struct zu übergeben, übergib die erforderlichen Parameter direkt. In diesem Beispiel haben wir weitere **0,1 kB** gespart.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Korrekte Sichtbarkeit für Funktionen und Variablen deklarieren {#declare-correct-visibility-for-functions-and-variables}

- Funktionen oder Variablen, die nur von außen aufgerufen werden? Deklariere sie als `external` anstatt `public`.
- Funktionen oder Variablen, die nur innerhalb des Vertrags aufgerufen werden? Deklariere sie als `private` oder `internal` anstatt `public`.

### Modifier entfernen {#remove-modifiers}

Modifier können, insbesondere bei intensiver Nutzung, einen erheblichen Einfluss auf die Vertragsgröße haben. Erwäge, sie zu entfernen und stattdessen Funktionen zu verwenden.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Diese Tipps sollten dir helfen, die Vertragsgröße erheblich zu reduzieren. Noch einmal, ich kann nicht genug betonen: Konzentriere dich immer auf die Aufteilung von Verträgen, wenn möglich, um die größte Wirkung zu erzielen.
