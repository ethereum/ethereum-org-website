---
title: Smart-Contract-Bibliotheken
description: Entdecke wiederverwendbare Smart-Contract-Bibliotheken und Bausteine, um deine Ethereum-Entwicklungsprojekte zu beschleunigen.
lang: de
---

Du musst nicht jeden Smart Contract in deinem Projekt von Grund auf neu schreiben. Es gibt viele Open-Source-Smart-Contract-Bibliotheken, die wiederverwendbare Bausteine für dein Projekt bereitstellen und dir ersparen, das Rad neu erfinden zu müssen.

## Voraussetzungen {#prerequisites}

Bevor du dich in Smart-Contract-Bibliotheken stürzt, ist es eine gute Idee, ein solides Verständnis der Struktur eines Smart Contracts zu haben. Schau dir die [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) an, falls du das noch nicht getan hast.

## Was in einer Bibliothek steckt {#whats-in-a-library}

In Smart-Contract-Bibliotheken findest du normalerweise zwei Arten von Bausteinen: wiederverwendbare Verhaltensweisen, die du zu deinen Verträgen hinzufügen kannst, und Implementierungen verschiedener Standards.

### Verhaltensweisen {#behaviors}

Beim Schreiben von Smart Contracts ist die Wahrscheinlichkeit groß, dass du immer wieder ähnliche Muster schreibst, wie z. B. die Zuweisung einer _Admin_-Adresse zur Ausführung geschützter Operationen in einem Vertrag oder das Hinzufügen einer Notfall-_Pause_-Schaltfläche für den Fall eines unerwarteten Problems.

Smart-Contract-Bibliotheken bieten in der Regel wiederverwendbare Implementierungen dieser Verhaltensweisen als [Bibliotheken](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) oder über [Vererbung](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) in Solidity.

Als Beispiel folgt eine vereinfachte Version des [`Ownable`-Vertrags](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) aus der [OpenZeppelin Contracts-Bibliothek](https://github.com/OpenZeppelin/openzeppelin-contracts), die eine Adresse als Eigentümer eines Vertrags festlegt und einen Modifikator bereitstellt, um den Zugriff auf eine Methode nur auf diesen Eigentümer zu beschränken.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Um einen solchen Baustein in deinem Vertrag zu verwenden, müsstest du ihn zunächst importieren und dann in deinen eigenen Verträgen davon erben. Dies ermöglicht es dir, den vom Basisvertrag `Ownable` bereitgestellten Modifikator zu verwenden, um deine eigenen Funktionen abzusichern.

```solidity
import ".../Ownable.sol"; // Pfad zur importierten Bibliothek

contract MyContract is Ownable {
    // Die folgende Funktion kann nur vom Besitzer aufgerufen werden
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Ein weiteres beliebtes Beispiel ist [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) oder [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Dies sind Bibliotheken (im Gegensatz zu Basisverträgen), die arithmetische Funktionen mit Überlauf-Prüfungen bereitstellen, welche von der Sprache selbst nicht angeboten werden. Es ist eine gute Praxis, eine dieser Bibliotheken anstelle nativer arithmetischer Operationen zu verwenden, um deinen Vertrag vor Überläufen zu schützen, die katastrophale Folgen haben können!

### Standards {#standards}

Um [Komponierbarkeit und Interoperabilität](/developers/docs/smart-contracts/composability/) zu erleichtern, hat die Ethereum-Community mehrere Standards in Form von **ERCs** definiert. Du kannst mehr darüber im Abschnitt [Standards](/developers/docs/standards/) lesen.

Wenn du einen ERC als Teil deiner Verträge einbindest, ist es eine gute Idee, nach Standardimplementierungen zu suchen, anstatt zu versuchen, deine eigenen zu entwickeln. Viele Smart-Contract-Bibliotheken enthalten Implementierungen für die beliebtesten ERCs. Zum Beispiel ist der allgegenwärtige [ERC-20-Standard für fungible Token](/developers/tutorials/understand-the-erc-20-token-smart-contract/) in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) und [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) zu finden. Darüber hinaus bieten einige ERCs auch kanonische Implementierungen als Teil des ERCs selbst an.

Es ist erwähnenswert, dass einige ERCs nicht eigenständig sind, sondern Ergänzungen zu anderen ERCs darstellen. Zum Beispiel fügt [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) dem ERC-20 eine Erweiterung hinzu, um dessen Benutzerfreundlichkeit zu verbessern.

## Wie man eine Bibliothek hinzufügt {#how-to}

Beziehe dich immer auf die Dokumentation der Bibliothek, die du einbindest, für spezifische Anweisungen, wie du sie in dein Projekt integrierst. Mehrere Solidity-Vertragsbibliotheken sind mit `npm` verpackt, sodass du sie einfach mit `npm install` installieren kannst. Die meisten Tools zur [Kompilierung](/developers/docs/smart-contracts/compiling/) von Verträgen suchen in deinen `node_modules` nach Smart-Contract-Bibliotheken, sodass du Folgendes tun kannst:

```solidity
// Dies wird die Bibliothek @openzeppelin/contracts aus deinen node_modules laden
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Unabhängig von der verwendeten Methode solltest du beim Einbinden einer Bibliothek immer die [Sprachversion](/developers/docs/smart-contracts/languages/) im Auge behalten. Du kannst beispielsweise keine Bibliothek für Solidity 0.6 verwenden, wenn du deine Verträge in Solidity 0.5 schreibst.

## Wann man sie verwendet {#when-to-use}

Die Verwendung einer Smart-Contract-Bibliothek für dein Projekt hat mehrere Vorteile. In erster Linie spart es dir Zeit, da dir sofort einsatzbereite Bausteine zur Verfügung gestellt werden, die du in dein System integrieren kannst, anstatt sie selbst programmieren zu müssen.

Sicherheit ist ebenfalls ein großer Pluspunkt. Open-Source-Smart-Contract-Bibliotheken werden oft streng geprüft. Da viele Projekte von ihnen abhängen, gibt es einen starken Anreiz für die Community, sie ständig zu überprüfen. Es ist viel häufiger, Fehler im Anwendungscode zu finden als in wiederverwendbaren Vertragsbibliotheken. Einige Bibliotheken durchlaufen auch [externe Audits](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) für zusätzliche Sicherheit.

Die Verwendung von Smart-Contract-Bibliotheken birgt jedoch das Risiko, Code in dein Projekt aufzunehmen, mit dem du nicht vertraut bist. Es ist verlockend, einen Vertrag zu importieren und ihn direkt in dein Projekt einzubinden, aber ohne ein gutes Verständnis dafür, was dieser Vertrag tut, könntest du aufgrund eines unerwarteten Verhaltens versehentlich ein Problem in dein System einführen. Stelle immer sicher, dass du die Dokumentation des Codes liest, den du importierst, und überprüfe dann den Code selbst, bevor du ihn zu einem Teil deines Projekts machst!

Zu guter Letzt solltest du bei der Entscheidung, ob du eine Bibliothek einbindest, deren allgemeine Nutzung berücksichtigen. Eine weit verbreitete Bibliothek hat den Vorteil einer größeren Community und mehr Augen, die nach Problemen suchen. Sicherheit sollte dein Hauptaugenmerk sein, wenn du mit Smart Contracts baust!

## Verwandte Tools {#related-tools}

**OpenZeppelin Contracts –** **_Die beliebteste Bibliothek für die sichere Entwicklung von Smart Contracts._**

- [Dokumentation](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **_Sichere, einfache und flexible Bausteine für Smart Contracts._**

- [Dokumentation](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 –** **_Ein Solidity-Projekt mit Verträgen, Bibliotheken und Beispielen, das dir hilft, voll funktionsfähige verteilte Anwendungen für die reale Welt zu erstellen._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK –** **_Bietet die Werkzeuge, die benötigt werden, um benutzerdefinierte Smart Contracts effizient zu erstellen._**

- [Dokumentation](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Verwandte Tutorials {#related-tutorials}

- [Sicherheitsüberlegungen für Ethereum-Entwickler](/developers/docs/smart-contracts/security/) _– Ein Tutorial zu Sicherheitsüberlegungen beim Erstellen von Smart Contracts, einschließlich der Nutzung von Bibliotheken._
- [Den ERC-20-Token-Smart-Contract verstehen](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Tutorial zum ERC-20-Standard, der von mehreren Bibliotheken bereitgestellt wird._

## Weiterführende Literatur {#further-reading}

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_