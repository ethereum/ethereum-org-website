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

Am [22. November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) führte der Spurious Dragon Hard Fork [EIP-170](https://eips.ethereum.org/EIPS/eip-170) ein, was ein Größenlimit für Smart Contracts von 24.576 Bytes (24 KiB) hinzufügte. Für Sie als Solidity-Entwickler bedeutet dies, dass Sie, wenn Sie Ihrem Vertrag immer mehr Funktionalität hinzufügen, irgendwann das Limit erreichen und der Compiler Sie warnen wird:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Es gibt eine ähnliche Warnung für den Bereitstellungscode (Initcode), den [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) im Shanghai-Upgrade auf 49.152 Bytes begrenzt hat.

Das Limit ist nicht dauerhaft. [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) erhöht es auf 65.536 Bytes (64 KiB) und das Initcode-Limit auf 131.072 Bytes, und es ist für das [Glamsterdam-Upgrade](/roadmap/glamsterdam/) geplant. Bis dieses Upgrade in dem Netzwerk aktiviert wird, in dem Sie bereitstellen, liegt das Limit dort bei 24.576 Bytes, und auch danach bleiben kleinere Verträge günstiger bereitzustellen und einfacher zu prüfen.

Dieses Limit wurde eingeführt, um Denial-of-Service-Angriffe (DOS) zu verhindern. Jeder Aufruf eines Vertrags ist in Bezug auf Gas relativ günstig. Die Auswirkungen eines Vertragsaufrufs für Ethereum-Nodes steigen jedoch überproportional in Abhängigkeit von der Größe des aufgerufenen Vertragscodes (Lesen des Codes von der Festplatte, Vorverarbeitung des Codes, Hinzufügen von Daten zum Merkle-Nachweis). Wann immer Sie eine solche Situation haben, in der der Angreifer nur wenige Ressourcen benötigt, um anderen viel Arbeit zu bereiten, entsteht das Potenzial für DOS-Angriffe.

Ursprünglich war dies weniger ein Problem, da ein natürliches Limit für die Vertragsgröße das Block-Gaslimit ist. Offensichtlich muss ein Vertrag innerhalb einer Transaktion bereitgestellt werden, die den gesamten Bytecode des Vertrags enthält. Wenn Sie nur diese eine Transaktion in einen Block aufnehmen, können Sie das gesamte Gas aufbrauchen, aber es ist nicht unendlich. Heute beträgt das Block-Gaslimit zig Millionen Gas und wurde von Validatoren mehrmals erhöht, sodass es für sich genommen sehr große Verträge zulassen würde. Seit dem [Fusaka-Upgrade](/roadmap/fusaka/) ist eine einzelne Transaktion ebenfalls auf 16.777.216 Gas begrenzt ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), aber das liegt immer noch weit über den Kosten für die Bereitstellung eines 24-KiB-Vertrags, weshalb ein explizites Größenlimit erforderlich ist.

Im Folgenden werden wir uns einige Methoden ansehen, geordnet nach ihren potenziellen Auswirkungen. Stellen Sie sich das wie beim Abnehmen vor. Die beste Strategie für jemanden, um sein Zielgewicht (in unserem Fall 24 kb) zu erreichen, besteht darin, sich zuerst auf die Methoden mit den größten Auswirkungen zu konzentrieren. In den meisten Fällen reicht es aus, einfach Ihre Ernährung umzustellen, aber manchmal brauchen Sie ein bisschen mehr. Dann könnten Sie etwas Sport (mittlere Auswirkungen) oder sogar Nahrungsergänzungsmittel (geringe Auswirkungen) hinzufügen.

## Große Auswirkungen {#big-impact}

### Trennen Sie Ihre Verträge {#separate-your-contracts}

Dies sollte immer Ihr erster Ansatz sein. Wie können Sie den Vertrag in mehrere kleinere aufteilen? Es zwingt Sie im Allgemeinen dazu, sich eine gute Architektur für Ihre Verträge auszudenken. Kleinere Verträge werden aus Sicht der Lesbarkeit des Codes immer bevorzugt. Wenn Sie Verträge aufteilen, fragen Sie sich:

- Welche Funktionen gehören zusammen? Jede Gruppe von Funktionen ist möglicherweise am besten in einem eigenen Vertrag aufgehoben.
- Welche Funktionen erfordern kein Lesen des Vertragszustands oder nur eine bestimmte Teilmenge des Zustands?
- Können Sie Speicher und Funktionalität trennen?

### Bibliotheken {#libraries}

Ein einfacher Weg, um Funktionalitätscode vom Speicher zu trennen, ist die Verwendung einer [Bibliothek](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Deklarieren Sie die Bibliotheksfunktionen nicht als intern, da diese während der Kompilierung direkt [zum Vertrag hinzugefügt](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) werden. Wenn Sie jedoch öffentliche Funktionen verwenden, befinden sich diese tatsächlich in einem separaten Bibliotheksvertrag. Erwägen Sie [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for), um die Nutzung von Bibliotheken komfortabler zu gestalten.

### Proxies {#proxies}

Eine fortgeschrittenere Strategie wäre ein Proxy-System. Bibliotheken verwenden im Hintergrund `DELEGATECALL`, was einfach die Funktion eines anderen Vertrags mit dem Zustand des aufrufenden Vertrags ausführt. Sehen Sie sich [Smart Contracts aktualisieren](/developers/docs/smart-contracts/upgrading/) an, um mehr über Proxy-Systeme zu erfahren. Sie bieten Ihnen mehr Funktionalität, z. B. ermöglichen sie die Aktualisierbarkeit, fügen aber auch viel Komplexität hinzu. Ich würde diese nicht nur hinzufügen, um die Vertragsgrößen zu reduzieren, es sei denn, es ist aus irgendeinem Grund Ihre einzige Option.

## Mittlere Auswirkungen {#medium-impact}

### Funktionen entfernen {#remove-functions}

Dies sollte offensichtlich sein. Funktionen vergrößern einen Vertrag erheblich.

- **Extern**: Oft fügen wir aus Bequemlichkeit viele View-Funktionen hinzu. Das ist völlig in Ordnung, bis Sie das Größenlimit erreichen. Dann sollten Sie wirklich darüber nachdenken, alle bis auf die absolut wesentlichen zu entfernen.
- **Intern**: Sie können auch interne/private Funktionen entfernen und den Code einfach inline einfügen, solange die Funktion nur einmal aufgerufen wird.

### Zusätzliche Variablen vermeiden {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Eine einfache Änderung wie diese machte einen Unterschied von **0,28 kb** aus, als dieser Artikel geschrieben wurde. Die genauen Einsparungen hängen von Ihrer Compiler-Version und Ihren Einstellungen ab (mit Solidity 0.8.37 sind es etwa 0,1 kb ohne den Optimierer und viel weniger mit ihm), messen Sie also immer nach. Die Chancen stehen gut, dass Sie viele ähnliche Situationen in Ihren Verträgen finden können, und diese können sich wirklich zu erheblichen Mengen summieren.

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

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Einen niedrigen Run-Wert im Optimierer in Betracht ziehen {#consider-a-low-run-value-in-the-optimizer}

Sie können auch die Optimierer-Einstellungen ändern. Der Standardwert von 200 bedeutet, dass versucht wird, den Bytecode so zu optimieren, als ob eine Funktion 200 Mal aufgerufen wird. Wenn Sie ihn auf 1 ändern, weisen Sie den Optimierer im Grunde an, für den Fall zu optimieren, dass jede Funktion nur einmal ausgeführt wird. Eine für die einmalige Ausführung optimierte Funktion bedeutet, dass sie für die Bereitstellung selbst optimiert ist. Beachten Sie, dass **dies die [Gaskosten](/developers/docs/gas/) für die Ausführung der Funktionen erhöht**, sodass Sie dies möglicherweise nicht tun möchten. Wenn Sie mit aktiviertem `viaIR` kompilieren, überprüfen Sie die Größe mit und ohne diese Option, da der IR-basierte Codegenerator spürbar unterschiedliche Bytecode-Größen erzeugen kann. Weitere Details finden Sie in den [Optimierer-Optionen](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options).

## Geringe Auswirkungen {#small-impact}

### Die Übergabe von Structs an Funktionen vermeiden {#avoid-passing-structs-to-functions}

Wenn Sie den [ABI-Coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) verwenden (der Standard seit Solidity 0.8.0), kann es helfen, keine Structs an eine Funktion zu übergeben. Anstatt den Parameter als Struct zu übergeben, übergeben Sie die erforderlichen Parameter direkt. In diesem Beispiel haben wir weitere **0,1 kb** eingespart.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Korrekte Sichtbarkeit für Funktionen und Variablen deklarieren {#declare-correct-visibility-for-functions-and-variables}

- Funktionen oder Variablen, die nur von außen aufgerufen werden? Deklarieren Sie diese als `external` anstelle von `public`.
- Funktionen oder Variablen, die nur innerhalb des Vertrags aufgerufen werden? Deklarieren Sie diese als `private` oder `internal` anstelle von `public`.

### Modifikatoren entfernen {#remove-modifiers}

Modifikatoren können, insbesondere wenn sie intensiv genutzt werden, erhebliche Auswirkungen auf die Vertragsgröße haben. Erwägen Sie, sie zu entfernen und stattdessen Funktionen zu verwenden.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Diese Tipps sollten Ihnen helfen, die Vertragsgröße deutlich zu reduzieren. Noch einmal, ich kann es nicht oft genug betonen: Konzentrieren Sie sich immer darauf, Verträge nach Möglichkeit aufzuteilen, um die größten Auswirkungen zu erzielen.
