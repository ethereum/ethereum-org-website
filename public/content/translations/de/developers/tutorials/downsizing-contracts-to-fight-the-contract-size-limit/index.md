---
title: "Verträge verkleinern, um das Limit der Vertragsgröße zu bekämpfen"
description: "Was können Sie tun, um zu verhindern, dass Ihre Smart Contracts zu groß werden?"
author: Markus Waas
lang: de
tags:
  - solidity
  - Smart Contracts
  - Speicher
skill: intermediate
breadcrumb: "Verträge verkleinern"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Warum gibt es ein Limit? {#why-is-there-a-limit}

Am [22. November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) führte der Spurious Dragon Hard-Fork [EIP-170](https://eips.ethereum.org/EIPS/eip-170) ein, was ein Größenlimit für Smart Contracts von 24,576 kb hinzufügte. Für Sie als Solidity-Entwickler bedeutet dies, dass Sie, wenn Sie Ihrem Vertrag immer mehr Funktionalität hinzufügen, irgendwann das Limit erreichen und bei der Bereitstellung folgenden Fehler sehen werden:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Dieses Limit wurde eingeführt, um Denial-of-Service (DOS)-Angriffe zu verhindern. Jeder Aufruf eines Vertrags ist in Bezug auf Gas relativ günstig. Die Auswirkungen eines Vertragsaufrufs für Ethereum-Knoten (Nodes) steigen jedoch überproportional an, abhängig von der Größe des aufgerufenen Vertrags-Codes (Lesen des Codes von der Festplatte, Vorverarbeitung des Codes, Hinzufügen von Daten zum Merkle-Nachweis). Wann immer Sie eine solche Situation haben, in der der Angreifer nur wenige Ressourcen benötigt, um anderen viel Arbeit zu bereiten, entsteht das Potenzial für DOS-Angriffe.

Ursprünglich war dies weniger ein Problem, da ein natürliches Limit für die Vertragsgröße das Block-Gaslimit ist. Offensichtlich muss ein Vertrag innerhalb einer Transaktion bereitgestellt werden, die den gesamten Bytecode des Vertrags enthält. Wenn Sie nur diese eine Transaktion in einen Block aufnehmen, können Sie das gesamte Gas aufbrauchen, aber es ist nicht unendlich. Seit dem [London-Upgrade](/ethereum-forks/#london) kann das Block-Gaslimit je nach Netzwerknachfrage zwischen 15 und 30 Millionen Einheiten variieren.

Im Folgenden werden wir uns einige Methoden ansehen, geordnet nach ihren potenziellen Auswirkungen. Stellen Sie sich das wie beim Abnehmen vor. Die beste Strategie für jemanden, um sein Zielgewicht (in unserem Fall 24 kb) zu erreichen, besteht darin, sich zuerst auf die Methoden mit den größten Auswirkungen zu konzentrieren. In den meisten Fällen reicht es aus, einfach die Ernährung umzustellen, aber manchmal braucht man ein bisschen mehr. Dann könnte man etwas Sport hinzufügen (mittlere Auswirkungen) oder sogar Nahrungsergänzungsmittel (geringe Auswirkungen).

## Große Auswirkungen {#big-impact}

### Trennen Sie Ihre Verträge {#separate-your-contracts}

Dies sollte immer Ihr erster Ansatz sein. Wie können Sie den Vertrag in mehrere kleinere aufteilen? Es zwingt Sie im Allgemeinen dazu, sich eine gute Architektur für Ihre Verträge auszudenken. Kleinere Verträge werden aus Sicht der Lesbarkeit des Codes immer bevorzugt. Wenn Sie Verträge aufteilen, fragen Sie sich:

- Welche Funktionen gehören zusammen? Jede Gruppe von Funktionen ist möglicherweise am besten in einem eigenen Vertrag aufgehoben.
- Welche Funktionen erfordern kein Lesen des Vertragszustands oder nur eine bestimmte Teilmenge des Zustands?
- Können Sie Speicher und Funktionalität trennen?

### Bibliotheken {#libraries}

Ein einfacher Weg, um Funktionalitätscode vom Speicher zu trennen, ist die Verwendung einer [Bibliothek](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Deklarieren Sie die Bibliotheksfunktionen nicht als intern, da diese während der Kompilierung direkt [zum Vertrag hinzugefügt](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) werden. Wenn Sie jedoch öffentliche Funktionen verwenden, befinden sich diese tatsächlich in einem separaten Bibliotheksvertrag. Erwägen Sie [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for), um die Nutzung von Bibliotheken komfortabler zu gestalten.

### Proxys {#proxies}

Eine fortgeschrittenere Strategie wäre ein Proxy-System. Bibliotheken verwenden im Hintergrund `DELEGATECALL`, was einfach die Funktion eines anderen Vertrags mit dem Zustand des aufrufenden Vertrags ausführt. Lesen Sie [diesen Blogbeitrag](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2), um mehr über Proxy-Systeme zu erfahren. Sie bieten Ihnen mehr Funktionalität, z. B. ermöglichen sie die Aktualisierbarkeit, fügen aber auch viel Komplexität hinzu. Ich würde sie nicht nur zur Reduzierung der Vertragsgröße hinzufügen, es sei denn, es ist aus irgendeinem Grund Ihre einzige Option.

## Mittlere Auswirkungen {#medium-impact}

### Funktionen entfernen {#remove-functions}

Dies sollte offensichtlich sein. Funktionen vergrößern einen Vertrag erheblich.

- **Extern**: Oft fügen wir aus Bequemlichkeit viele View-Funktionen hinzu. Das ist völlig in Ordnung, bis Sie das Größenlimit erreichen. Dann sollten Sie wirklich darüber nachdenken, alle bis auf die absolut wesentlichen zu entfernen.
- **Intern**: Sie können auch interne/private Funktionen entfernen und den Code einfach inline einfügen, solange die Funktion nur einmal aufgerufen wird.

### Zusätzliche Variablen vermeiden {#avoid-additional-variables}

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

Eine einfache Änderung wie diese macht einen Unterschied von **0,28 kb**. Die Chancen stehen gut, dass Sie viele ähnliche Situationen in Ihren Verträgen finden, und diese können sich wirklich zu signifikanten Mengen summieren.

### Fehlermeldungen kürzen {#shorten-error-message}

Lange Revert-Nachrichten und insbesondere viele verschiedene Revert-Nachrichten können den Vertrag aufblähen. Verwenden Sie stattdessen kurze Fehlercodes und entschlüsseln Sie diese in Ihrem Vertrag. Eine lange Nachricht könnte viel kürzer werden:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Benutzerdefinierte Fehler anstelle von Fehlermeldungen verwenden {#use-custom-errors-instead-of-error-messages}

Benutzerdefinierte Fehler wurden in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) eingeführt. Sie sind eine großartige Möglichkeit, die Größe Ihrer Verträge zu reduzieren, da sie als Selektoren ABI-codiert sind (genau wie Funktionen).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Einen niedrigen Run-Wert im Optimierer in Betracht ziehen {#consider-a-low-run-value-in-the-optimizer}

Sie können auch die Einstellungen des Optimierers ändern. Der Standardwert von 200 bedeutet, dass versucht wird, den Bytecode so zu optimieren, als ob eine Funktion 200 Mal aufgerufen wird. Wenn Sie ihn auf 1 ändern, weisen Sie den Optimierer im Grunde an, für den Fall zu optimieren, dass jede Funktion nur einmal ausgeführt wird. Eine für die einmalige Ausführung optimierte Funktion bedeutet, dass sie für die Bereitstellung selbst optimiert ist. Beachten Sie, dass **dies die [Gaskosten](/developers/docs/gas/) für die Ausführung der Funktionen erhöht**, sodass Sie dies möglicherweise nicht tun möchten.

## Geringe Auswirkungen {#small-impact}

### Die Übergabe von Structs an Funktionen vermeiden {#avoid-passing-structs-to-functions}

Wenn Sie den [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2) verwenden, kann es helfen, keine Structs an eine Funktion zu übergeben. Anstatt den Parameter als Struct zu übergeben, übergeben Sie die erforderlichen Parameter direkt. In diesem Beispiel haben wir weitere **0,1 kb** gespart.

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

- Funktionen oder Variablen, die nur von außen aufgerufen werden? Deklarieren Sie diese als `external` anstelle von `public`.
- Funktionen oder Variablen, die nur innerhalb des Vertrags aufgerufen werden? Deklarieren Sie diese als `private` oder `internal` anstelle von `public`.

### Modifikatoren entfernen {#remove-modifiers}

Modifikatoren können, insbesondere wenn sie intensiv genutzt werden, erhebliche Auswirkungen auf die Vertragsgröße haben. Erwägen Sie, sie zu entfernen und stattdessen Funktionen zu verwenden.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Diese Tipps sollten Ihnen helfen, die Vertragsgröße erheblich zu reduzieren. Noch einmal, ich kann es nicht oft genug betonen: Konzentrieren Sie sich immer darauf, Verträge nach Möglichkeit aufzuteilen, um die größten Auswirkungen zu erzielen.