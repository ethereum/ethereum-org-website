---
title: Smart-Contract-Bibliotheken
description: Entdecken Sie wiederverwendbare Smart-Contract-Bibliotheken und Bausteine, um Ihre Ethereum-Entwicklungsprojekte zu beschleunigen.
lang: de
---

Sie müssen nicht jeden Smart Contract in Ihrem Projekt von Grund auf neu schreiben. Es gibt viele Open-Source-Smart-Contract-Bibliotheken, die wiederverwendbare Bausteine für Ihr Projekt bereitstellen und Ihnen ersparen, das Rad neu erfinden zu müssen.

## Voraussetzungen {#prerequisites}

Bevor Sie sich mit Smart-Contract-Bibliotheken befassen, ist es eine gute Idee, ein gutes Verständnis für die Struktur eines Smart Contracts zu haben. Gehen Sie zu [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/), falls Sie dies noch nicht getan haben.

## Was ist in einer Bibliothek {#whats-in-a-library}

In Smart-Contract-Bibliotheken finden Sie normalerweise zwei Arten von Bausteinen: wiederverwendbare Verhaltensweisen, die Sie Ihren Verträgen hinzufügen können, und Implementierungen verschiedener Standards.

### Verhaltensweisen {#behaviors}

Beim Schreiben von Smart Contracts ist die Wahrscheinlichkeit groß, dass Sie immer wieder ähnliche Muster schreiben, wie z. B. die Zuweisung einer _Admin_-Adresse zur Ausführung geschützter Operationen in einem Vertrag oder das Hinzufügen einer Notfall-_Pause_-Schaltfläche im Falle eines unerwarteten Problems.

Smart-Contract-Bibliotheken bieten in der Regel wiederverwendbare Implementierungen dieser Verhaltensweisen als [Bibliotheken](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) oder über [Vererbung](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) in Solidity.

Als Beispiel folgt eine vereinfachte Version des [`Ownable`-Vertrags](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) aus der [OpenZeppelin Contracts-Bibliothek](https://github.com/OpenZeppelin/openzeppelin-contracts), der eine Adresse als Eigentümer eines Vertrags festlegt und einen Modifikator bereitstellt, um den Zugriff auf eine Methode nur auf diesen Eigentümer zu beschränken.

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

Um einen solchen Baustein in Ihrem Vertrag zu verwenden, müssen Sie ihn zunächst importieren und dann in Ihren eigenen Verträgen erweitern. Dadurch können Sie den vom Basisvertrag `Ownable` bereitgestellten Modifikator verwenden, um Ihre eigenen Funktionen abzusichern.

```solidity
import ".../Ownable.sol"; // Pfad zur importierten Bibliothek

contract MyContract is Ownable {
    // Die folgende Funktion kann nur vom Eigentümer aufgerufen werden
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Ein weiteres beliebtes Beispiel ist [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) oder [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Dies sind Bibliotheken (im Gegensatz zu Basisverträgen), die arithmetische Funktionen mit Überlaufprüfungen bereitstellen, die von der Sprache nicht bereitgestellt werden. Es ist eine gute Praxis, eine dieser Bibliotheken anstelle nativer arithmetischer Operationen zu verwenden, um Ihren Vertrag vor Überläufen zu schützen, die katastrophale Folgen haben können!

### Standards {#standards}

Um die [Zusammensetzbarkeit und Interoperabilität](/developers/docs/smart-contracts/composability/) zu erleichtern, hat die Ethereum-Community mehrere Standards in Form von **ERCs** definiert. Sie können mehr darüber im Abschnitt [Standards](/developers/docs/standards/) lesen.

Wenn Sie einen ERC als Teil Ihrer Verträge einbeziehen, ist es eine gute Idee, nach Standardimplementierungen zu suchen, anstatt zu versuchen, Ihre eigenen zu entwickeln. Viele Smart-Contract-Bibliotheken enthalten Implementierungen für die beliebtesten ERCs. Zum Beispiel ist der allgegenwärtige [ERC-20-Standard für fungible Token](/developers/tutorials/understand-the-erc-20-token-smart-contract/) in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) und [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) zu finden. Darüber hinaus bieten einige ERCs auch kanonische Implementierungen als Teil des ERC selbst.

Es ist erwähnenswert, dass einige ERCs nicht eigenständig sind, sondern Ergänzungen zu anderen ERCs darstellen. Zum Beispiel fügt [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) dem ERC20 eine Erweiterung hinzu, um dessen Benutzerfreundlichkeit zu verbessern.

## Wie man eine Bibliothek hinzufügt {#how-to}

Beziehen Sie sich immer auf die Dokumentation der Bibliothek, die Sie einbinden, für spezifische Anweisungen, wie Sie sie in Ihr Projekt aufnehmen. Mehrere Solidity-Vertragsbibliotheken sind mit `npm` verpackt, sodass Sie sie einfach mit `npm install` installieren können. Die meisten Tools zum [Kompilieren](/developers/docs/smart-contracts/compiling/) von Verträgen suchen in Ihren `node_modules` nach Smart-Contract-Bibliotheken, sodass Sie Folgendes tun können:

```solidity
// Dies lädt die @openzeppelin/contracts-Bibliothek aus Ihren node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Unabhängig von der verwendeten Methode sollten Sie beim Einbinden einer Bibliothek immer die [Sprachversion](/developers/docs/smart-contracts/languages/) im Auge behalten. Sie können beispielsweise keine Bibliothek für Solidity 0.6 verwenden, wenn Sie Ihre Verträge in Solidity 0.5 schreiben.

## Wann man sie verwendet {#when-to-use}

Die Verwendung einer Smart-Contract-Bibliothek für Ihr Projekt hat mehrere Vorteile. In erster Linie spart es Ihnen Zeit, indem es Ihnen gebrauchsfertige Bausteine zur Verfügung stellt, die Sie in Ihr System integrieren können, anstatt sie selbst programmieren zu müssen.

Sicherheit ist ebenfalls ein großes Plus. Open-Source-Smart-Contract-Bibliotheken werden oft streng geprüft. Da viele Projekte von ihnen abhängen, gibt es einen starken Anreiz für die Community, sie ständig zu überprüfen. Es ist viel häufiger, Fehler im Anwendungscode zu finden als in wiederverwendbaren Vertragsbibliotheken. Einige Bibliotheken unterziehen sich auch [externen Audits](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) für zusätzliche Sicherheit.

Die Verwendung von Smart-Contract-Bibliotheken birgt jedoch das Risiko, Code in Ihr Projekt aufzunehmen, mit dem Sie nicht vertraut sind. Es ist verlockend, einen Vertrag zu importieren und ihn direkt in Ihr Projekt aufzunehmen, aber ohne ein gutes Verständnis dafür, was dieser Vertrag tut, könnten Sie aufgrund eines unerwarteten Verhaltens versehentlich ein Problem in Ihr System einführen. Stellen Sie immer sicher, dass Sie die Dokumentation des Codes lesen, den Sie importieren, und überprüfen Sie dann den Code selbst, bevor Sie ihn zu einem Teil Ihres Projekts machen!

Zuletzt sollten Sie bei der Entscheidung, ob Sie eine Bibliothek einbinden, deren allgemeine Nutzung berücksichtigen. Eine weit verbreitete Bibliothek hat den Vorteil, dass sie eine größere Community hat und mehr Augen nach Problemen suchen. Sicherheit sollte Ihr Hauptaugenmerk sein, wenn Sie mit Smart Contracts bauen!

## Verwandte Tools {#related-tools}

**OpenZeppelin Contracts –** **_Die beliebteste Bibliothek für die sichere Entwicklung von Smart Contracts._**

- [Dokumentation](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **_Sichere, einfache und flexible Bausteine für Smart Contracts._**

- [Dokumentation](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 –** **_Ein Solidity-Projekt mit Verträgen, Bibliotheken und Beispielen, das Ihnen hilft, voll funktionsfähige verteilte Anwendungen für die reale Welt zu erstellen._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK –** **_Bietet die Werkzeuge, die benötigt werden, um benutzerdefinierte Smart Contracts effizient zu erstellen_**

- [Dokumentation](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Verwandte Tutorials {#related-tutorials}

- [Sicherheitsüberlegungen für Ethereum-Entwickler](/developers/docs/smart-contracts/security/) _– Ein Tutorial zu Sicherheitsüberlegungen beim Erstellen von Smart Contracts, einschließlich der Verwendung von Bibliotheken._
- [Den ERC-20-Token-Smart-Contract verstehen](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Tutorial zum ERC20-Standard, der von mehreren Bibliotheken bereitgestellt wird._

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_