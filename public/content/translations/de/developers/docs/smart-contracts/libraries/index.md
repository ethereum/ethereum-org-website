---
title: Smart Contract-Bibliotheken
description: Entdecken Sie wiederverwendbare Smart Contract Bibliotheken und Bausteine, um Ihre Ethereum-Entwicklungsprojekte zu beschleunigen.
lang: de
---

Sie müssen in Ihrem Projekt nicht jeden Smart Contract von Grund auf neu erstellen. Es gibt viele Open-Source-Smart-Contract-Bibliotheken, die wiederverwendbare Bausteine für Ihr Projekt bereitstellen. Damit müssen Sie das Rad nicht neu erfinden.

## Voraussetzungen {#prerequisites}

Bevor wir in die Smart-Contract-Bibliothek einsteigen, ist es ratsam, sich mit den Grundlagen der Smart-Contract-Struktur vertraut zu machen. Schaue bei der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) vorbei, falls du das noch nicht getan hast.

## Was steckt in einer Bibliothek? {#whats-in-a-library}

Normalerweise finden Sie zwei Arten von Erstellungsblöcken in einer Smart Contract Bibliothek: wiederverwendbare Verhaltensweisen, die Sie Ihren Verträgen hinzufügen können, und die Implementierungen verschiedener Standards.

### Verhaltensweisen {#behaviors}

Wenn du Smart Contracts schreibst, ist die Wahrscheinlichkeit groß, dass du immer wieder ähnliche Muster schreibst, wie z. B. die Zuweisung einer _Admin_-Adresse zur Durchführung geschützter Operationen in einem Vertrag oder das Hinzufügen einer Notfall-_Pause_-Schaltfläche für den Fall eines unerwarteten Problems.

Bibliotheken für Smart Contracts bieten in der Regel wiederverwendbare Implementierungen dieser Verhaltensweisen als [Bibliotheken](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) oder über [Vererbung](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) in Solidity.

Als Beispiel folgt eine vereinfachte Version des [`Ownable`-Vertrags](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) aus der [OpenZeppelin Contracts-Bibliothek](https://github.com/OpenZeppelin/openzeppelin-contracts), der eine Adresse als Eigentümer eines Vertrags festlegt und einen Modifikator zur Verfügung stellt, um den Zugriff auf eine Methode nur auf diesen Eigentümer zu beschränken.

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

Um einen solchen Baustein in Ihrem Vertrag zu verwenden, müssen Sie ihn zuerst importieren und dann in Ihren eigenen Verträgen erweitern. Dadurch kannst du den vom Basisvertrag `Ownable` bereitgestellten Modifikator verwenden, um deine eigenen Funktionen zu sichern.

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Ein weiteres beliebtes Beispiel ist [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) oder [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Das sind Bibliotheken (im Gegensatz zu Basisverträgen), die arithmetische Funktionen mit Überlaufprüfungen bereitstellen, die von der Sprache nicht bereitgestellt werden. Es empfiehlt sich, eine dieser Bibliotheken anstelle von nativen arithmetischen Operationen zu verwenden, um Ihren Vertrag vor Überläufen zu schützen, die katastrophale Folgen haben können!

### Standards {#standards}

Um die [Komponierbarkeit und Interoperabilität](/developers/docs/smart-contracts/composability/) zu erleichtern, hat die Ethereum-Community mehrere Standards in Form von **ERCs** definiert. Mehr darüber erfährst du im Abschnitt [Standards](/developers/docs/standards/).

Wenn Sie einen ERC in Ihre Verträge aufnehmen, sollten Sie nach Standardimplementierungen suchen, anstatt Ihre eigenen einzuführen. Viele Smart-Contract-Bibliotheken enthalten Implementierungen für die gängigsten ERCs. Zum Beispiel ist der allgegenwärtige [Standard für fungible ERC20-Token](/developers/tutorials/understand-the-erc-20-token-smart-contract/) in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) und [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) zu finden. Darüber hinaus bieten einige ERCs auch kanonische Implementierungen als Teil des ERC selbst.

Es ist erwähnenswert, dass einige ERCs nicht eigenständig sind, sondern Ergänzungen zu anderen ERCs sind. Zum Beispiel fügt [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) eine Erweiterung zu ERC20 hinzu, um dessen Benutzerfreundlichkeit zu verbessern.

## So fügst du eine Bibliothek hinzu {#how-to}

Beziehen Sie sich immer auf die Dokumentation der Bibliothek, die Sie einbinden, um genaue Anweisungen zur Einbindung in Ihr Projekt zu bekommen. Mehrere Solidity-Bibliotheken für Verträge werden mit `npm` gepackt, so dass du sie einfach mit `npm install` installieren kannst. Die meisten Tools zum [Kompilieren](/developers/docs/smart-contracts/compiling/) von Verträgen suchen in deinen `node_modules` nach Bibliotheken für Smart Contracts, sodass du Folgendes tun kannst:

```solidity
// Dadurch wird die @openzeppelin/contracts-Bibliothek von Ihren node_modules geladen 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Unabhängig von der Methode, die du verwendest, solltest du beim Einbinden einer Bibliothek immer die [Sprachversion](/developers/docs/smart-contracts/languages/) im Auge behalten. Sie können beispielsweise keine Bibliothek für Solidity 0.6 verwenden, wenn Sie Ihre Verträge in Solidity 0.5 schreiben.

## Wann verwenden {#when-to-use}

Wenn Sie eine Smart-Contract-Bibliothek für Ihr Projekt nutzen, bietet das gleich mehrere Vorteile. In erster Linie sparen Sie Zeit, denn die Bibliothek stellt fertige Bausteine zur Verfügung stellt, die Sie einfach in Ihr System integrieren können, anstatt sie selbst schreiben zu müssen.

Sicherheit ist ein großes Plus. Auch Open-Source-Smart-Contract-Bibliotheken werden oft intensiv untersucht. Da viele Projekte von der Bibliothek abhängen, besteht ein starker Anreiz vonseiten der Communty, sie ständig zu überprüfen. Fehler finden sich viel häufiger im Anwendungscode als in wiederverwendbaren Vertragsbibliotheken. Einige Bibliotheken werden für zusätzliche Sicherheit auch [externen Audits](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) unterzogen.

Die Verwendung von Smart-Contract-Bibliotheken birgt jedoch das Risiko, dass Sie Code in Ihr Projekt integreiren, mit dem Sie nicht vertraut sind. Es ist verlockend, einen Vertrag zu importieren und direkt in Ihr Projekt aufzunehmen, doch ohne ein gutes Verständnis dessen, was dieser Vertrag bewirkt, können Sie aufgrund eines unerwarteten Verhaltens versehentlich ein Problem in Ihrem System einführen. Lesen Sie immer die Dokumentation des Codes, den Sie importieren, und überprüfen Sie dann den Code selbst, bevor Sie ihn in Ihr Projekt aufnehmen.

Schließlich sollten Sie bei der Entscheidung, ob Sie eine Bibliothek integrieren möchten, ihren Gesamtnutzen berücksichtigen. Eine weit verbreitete Version hat den Vorteil, dass sie eine größere Community hat und Fehler schneller erkannt werden. Beim Erstellen von Smart Contracts sollte Sicherheit sollte Ihr Hauptaugenmerk sein.

## Zugehörige Werkzeuge {#related-tools}

**OpenZeppelin Contracts –** **_Die beliebteste Bibliothek für die sichere Entwicklung von Smart Contracts._**

- [Dokumentation](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **_Sichere, einfache und flexible Bausteine für Smart Contracts._**

- [Dokumentation](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 –** **_Ein Solidity-Projekt mit Verträgen, Bibliotheken und Beispielen, die dir helfen, voll funktionsfähige, verteilte Anwendungen für die reale Welt zu erstellen._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK –** **_Bietet die Tools, die zum effizienten Erstellen von benutzerdefinierten Smart Contracts erforderlich sind._**

- [Dokumentation](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Verwandte Tutorials {#related-tutorials}

- [Sicherheitsüberlegungen für Ethereum-Entwickler](/developers/docs/smart-contracts/security/) _– Ein Tutorial zu Sicherheitsaspekten bei der Erstellung von Smart Contracts, einschließlich der Verwendung von Bibliotheken._
- [Den ERC-20-Token-Smart-Contract verstehen](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Tutorial zum ERC20-Standard, bereitgestellt von mehreren Bibliotheken._

## Weiterführende Lektüre {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
