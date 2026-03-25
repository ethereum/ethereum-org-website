---
title: Smart Contracts aktualisieren
description: "Ein Überblick über Upgrade-Muster für Ethereum-Smart-Contracts"
lang: de
---

Smart Contracts auf Ethereum sind selbstausführende Programme, die in der Ethereum Virtual Machine (EVM) laufen. Diese Programme sind von Natur aus unveränderlich, was jegliche Aktualisierungen der Geschäftslogik verhindert, sobald der Vertrag bereitgestellt wurde.

Während Unveränderlichkeit für Vertrauenslosigkeit, Dezentralisierung und Sicherheit von Smart Contracts notwendig ist, kann sie in bestimmten Fällen ein Nachteil sein. Zum Beispiel kann unveränderlicher Code es Entwicklern unmöglich machen, anfällige Verträge zu reparieren.

Die verstärkte Forschung zur Verbesserung von Smart Contracts hat jedoch zur Einführung mehrerer Upgrade-Muster geführt. Diese Upgrade-Muster ermöglichen es Entwicklern, Smart Contracts zu aktualisieren (wobei die Unveränderlichkeit erhalten bleibt), indem sie die Geschäftslogik in verschiedene Verträge auslagern.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis von [Smart Contracts](/developers/docs/smart-contracts/), der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) und der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) haben. Dieser Leitfaden setzt außerdem voraus, dass die Leser die Programmierung von Smart Contracts beherrschen.

## Was ist ein Smart-Contract-Upgrade? {#what-is-a-smart-contract-upgrade}

Ein Smart-Contract-Upgrade beinhaltet die Änderung der Geschäftslogik eines Smart Contracts, während der Zustand des Vertrags erhalten bleibt. Es ist wichtig klarzustellen, dass Aktualisierbarkeit und Veränderlichkeit nicht dasselbe sind, insbesondere im Kontext von Smart Contracts.

Sie können ein Programm, das an einer Adresse im Ethereum-Netzwerk bereitgestellt wurde, weiterhin nicht ändern. Aber Sie können den Code ändern, der ausgeführt wird, wenn Benutzer mit einem Smart Contract interagieren.

Dies kann über die folgenden Methoden erfolgen:

1. Erstellen mehrerer Versionen eines Smart Contracts und Migrieren des Zustands (d. h. der Daten) vom alten Vertrag zu einer neuen Instanz des Vertrags.

2. Erstellen separater Verträge zur Speicherung von Geschäftslogik und Zustand.

3. Verwendung von Proxy-Mustern, um Funktionsaufrufe von einem unveränderlichen Proxy-Vertrag an einen modifizierbaren Logikvertrag zu delegieren.

4. Erstellen eines unveränderlichen Hauptvertrags, der mit flexiblen Satellitenverträgen interagiert und sich auf diese verlässt, um bestimmte Funktionen auszuführen.

5. Verwendung des Diamond-Musters, um Funktionsaufrufe von einem Proxy-Vertrag an Logikverträge zu delegieren.

### Upgrade-Mechanismus #1: Vertragsmigration {#contract-migration}

Die Vertragsmigration basiert auf Versionierung – der Idee, eindeutige Zustände derselben Software zu erstellen und zu verwalten. Die Vertragsmigration umfasst die Bereitstellung einer neuen Instanz eines bestehenden Smart Contracts und die Übertragung von Speicher und Guthaben auf den neuen Vertrag.

Der neu bereitgestellte Vertrag wird einen leeren Speicher haben, was es Ihnen ermöglicht, Daten aus dem alten Vertrag wiederherzustellen und in die neue Implementierung zu schreiben. Danach müssen Sie alle Verträge, die mit dem alten Vertrag interagiert haben, aktualisieren, um die neue Adresse widerzuspiegeln.

Der letzte Schritt bei der Vertragsmigration besteht darin, die Benutzer davon zu überzeugen, auf den neuen Vertrag umzusteigen. Die neue Vertragsversion behält die Benutzerguthaben und -adressen bei, was die Unveränderlichkeit bewahrt. Wenn es sich um einen Token-basierten Vertrag handelt, müssen Sie auch Börsen kontaktieren, damit diese den alten Vertrag verwerfen und den neuen Vertrag verwenden.

Die Vertragsmigration ist eine relativ unkomplizierte und sichere Maßnahme zur Aktualisierung von Smart Contracts, ohne Benutzerinteraktionen zu unterbrechen. Die manuelle Migration von Benutzerspeicher und Guthaben auf den neuen Vertrag ist jedoch zeitintensiv und kann hohe Gaskosten verursachen.

[Mehr zur Vertragsmigration.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Upgrade-Mechanismus #2: Datentrennung {#data-separation}

Eine weitere Methode zur Aktualisierung von Smart Contracts besteht darin, Geschäftslogik und Datenspeicherung in separate Verträge zu trennen. Das bedeutet, dass Benutzer mit dem Logikvertrag interagieren, während die Daten im Speichervertrag gespeichert werden.

Der Logikvertrag enthält den Code, der ausgeführt wird, wenn Benutzer mit der Anwendung interagieren. Er speichert auch die Adresse des Speichervertrags und interagiert mit ihm, um Daten abzurufen und festzulegen.

Währenddessen hält der Speichervertrag den mit dem Smart Contract verbundenen Zustand, wie Benutzerguthaben und -adressen. Beachten Sie, dass der Speichervertrag im Besitz des Logikvertrags ist und bei der Bereitstellung mit dessen Adresse konfiguriert wird. Dies verhindert, dass unbefugte Verträge den Speichervertrag aufrufen oder dessen Daten aktualisieren.

Standardmäßig ist der Speichervertrag unveränderlich – aber Sie können den Logikvertrag, auf den er verweist, durch eine neue Implementierung ersetzen. Dies ändert den Code, der in der EVM ausgeführt wird, während Speicher und Guthaben intakt bleiben.

Die Verwendung dieser Upgrade-Methode erfordert die Aktualisierung der Adresse des Logikvertrags im Speichervertrag. Sie müssen auch den neuen Logikvertrag aus den zuvor erläuterten Gründen mit der Adresse des Speichervertrags konfigurieren.

Das Datentrennungsmuster ist im Vergleich zur Vertragsmigration wohl einfacher zu implementieren. Sie müssen jedoch mehrere Verträge verwalten und komplexe Autorisierungsschemata implementieren, um Smart Contracts vor böswilligen Upgrades zu schützen.

### Upgrade-Mechanismus #3: Proxy-Muster {#proxy-patterns}

Das Proxy-Muster verwendet ebenfalls die Datentrennung, um Geschäftslogik und Daten in separaten Verträgen zu halten. In einem Proxy-Muster ruft jedoch der Speichervertrag (Proxy genannt) den Logikvertrag während der Codeausführung auf. Dies ist eine Umkehrung der Datentrennungsmethode, bei der der Logikvertrag den Speichervertrag aufruft.

Folgendes passiert in einem Proxy-Muster:

1. Benutzer interagieren mit dem Proxy-Vertrag, der Daten speichert, aber nicht die Geschäftslogik enthält.

2. Der Proxy-Vertrag speichert die Adresse des Logikvertrags und delegiert alle Funktionsaufrufe an den Logikvertrag (der die Geschäftslogik enthält) unter Verwendung der Funktion `delegatecall`.

3. Nachdem der Aufruf an den Logikvertrag weitergeleitet wurde, werden die vom Logikvertrag zurückgegebenen Daten abgerufen und an den Benutzer zurückgegeben.

Die Verwendung der Proxy-Muster erfordert ein Verständnis der Funktion **delegatecall**. Grundsätzlich ist `delegatecall` ein Opcode, der es einem Vertrag ermöglicht, einen anderen Vertrag aufzurufen, während die eigentliche Codeausführung im Kontext des aufrufenden Vertrags stattfindet. Eine Implikation der Verwendung von `delegatecall` in Proxy-Mustern ist, dass der Proxy-Vertrag in seinen Speicher liest und schreibt und die im Logikvertrag gespeicherte Logik ausführt, als würde er eine interne Funktion aufrufen.

Aus der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Es gibt eine spezielle Variante eines Nachrichtenaufrufs namens **delegatecall**, die mit einem Nachrichtenaufruf identisch ist, abgesehen von der Tatsache, dass der Code an der Zieladresse im Kontext (d. h. an der Adresse) des aufrufenden Vertrags ausgeführt wird und `msg.sender` sowie `msg.value` ihre Werte nicht ändern._ _Das bedeutet, dass ein Vertrag zur Laufzeit dynamisch Code von einer anderen Adresse laden kann. Speicher, aktuelle Adresse und Guthaben beziehen sich weiterhin auf den aufrufenden Vertrag, nur der Code wird von der aufgerufenen Adresse übernommen._

Der Proxy-Vertrag weiß, dass er `delegatecall` aufrufen muss, wann immer ein Benutzer eine Funktion aufruft, da er eine eingebaute `fallback`-Funktion hat. In der Solidity-Programmierung wird die [Fallback-Funktion](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) ausgeführt, wenn ein Funktionsaufruf nicht mit den in einem Vertrag angegebenen Funktionen übereinstimmt.

Damit das Proxy-Muster funktioniert, muss eine benutzerdefinierte Fallback-Funktion geschrieben werden, die angibt, wie der Proxy-Vertrag Funktionsaufrufe behandeln soll, die er nicht unterstützt. In diesem Fall ist die Fallback-Funktion des Proxys so programmiert, dass sie einen Delegatecall initiiert und die Anfrage des Benutzers an die aktuelle Implementierung des Logikvertrags umleitet.

Der Proxy-Vertrag ist standardmäßig unveränderlich, aber es können neue Logikverträge mit aktualisierter Geschäftslogik erstellt werden. Die Durchführung des Upgrades besteht dann darin, die Adresse des im Proxy-Vertrag referenzierten Logikvertrags zu ändern.

Indem der Proxy-Vertrag auf einen neuen Logikvertrag verweist, ändert sich der Code, der ausgeführt wird, wenn Benutzer die Funktion des Proxy-Vertrags aufrufen. Dies ermöglicht es uns, die Logik eines Vertrags zu aktualisieren, ohne die Benutzer aufzufordern, mit einem neuen Vertrag zu interagieren.

Proxy-Muster sind eine beliebte Methode zur Aktualisierung von Smart Contracts, da sie die mit der Vertragsmigration verbundenen Schwierigkeiten beseitigen. Proxy-Muster sind jedoch komplizierter zu verwenden und können bei unsachgemäßer Verwendung kritische Fehler einführen, wie z. B. [Kollisionen von Funktionsselektoren](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357).

[Mehr zu Proxy-Mustern](https://blog.openzeppelin.com/proxy-patterns/).

### Upgrade-Mechanismus #4: Strategiemuster {#strategy-pattern}

Diese Technik ist vom [Strategiemuster](https://en.wikipedia.org/wiki/Strategy_pattern) beeinflusst, das die Erstellung von Softwareprogrammen fördert, die mit anderen Programmen interagieren, um bestimmte Funktionen zu implementieren. Die Anwendung des Strategiemusters auf die Ethereum-Entwicklung würde bedeuten, einen Smart Contract zu erstellen, der Funktionen aus anderen Verträgen aufruft.

Der Hauptvertrag enthält in diesem Fall die Kerngeschäftslogik, interagiert jedoch mit anderen Smart Contracts („Satellitenverträgen“), um bestimmte Funktionen auszuführen. Dieser Hauptvertrag speichert auch die Adresse für jeden Satellitenvertrag und kann zwischen verschiedenen Implementierungen des Satellitenvertrags wechseln.

Sie können einen neuen Satellitenvertrag erstellen und den Hauptvertrag mit der neuen Adresse konfigurieren. Dies ermöglicht es Ihnen, _Strategien_ (d. h. neue Logik zu implementieren) für einen Smart Contract zu ändern.

Obwohl es dem zuvor besprochenen Proxy-Muster ähnlich ist, unterscheidet sich das Strategiemuster, da der Hauptvertrag, mit dem die Benutzer interagieren, die Geschäftslogik enthält. Die Verwendung dieses Musters bietet Ihnen die Möglichkeit, begrenzte Änderungen an einem Smart Contract vorzunehmen, ohne die Kerninfrastruktur zu beeinträchtigen.

Der Hauptnachteil besteht darin, dass dieses Muster hauptsächlich für die Einführung kleinerer Upgrades nützlich ist. Wenn der Hauptvertrag kompromittiert wird (z. B. durch einen Hack), können Sie diese Upgrade-Methode außerdem nicht verwenden.

### Upgrade-Mechanismus #5: Diamond-Muster {#diamond-pattern}

Das Diamond-Muster kann als Verbesserung des Proxy-Musters angesehen werden. Diamond-Muster unterscheiden sich von Proxy-Mustern, da der Diamond-Proxy-Vertrag Funktionsaufrufe an mehr als einen Logikvertrag delegieren kann.

Die Logikverträge im Diamond-Muster werden als _Facetten_ bezeichnet. Damit das Diamond-Muster funktioniert, müssen Sie im Proxy-Vertrag eine Zuordnung erstellen, die [Funktionsselektoren](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) verschiedenen Facettenadressen zuordnet.

Wenn ein Benutzer einen Funktionsaufruf tätigt, überprüft der Proxy-Vertrag die Zuordnung, um die Facette zu finden, die für die Ausführung dieser Funktion verantwortlich ist. Dann ruft er `delegatecall` auf (unter Verwendung der Fallback-Funktion) und leitet den Aufruf an den entsprechenden Logikvertrag weiter.

Das Diamond-Upgrade-Muster hat einige Vorteile gegenüber herkömmlichen Proxy-Upgrade-Mustern:

1. Es ermöglicht Ihnen, einen kleinen Teil des Vertrags zu aktualisieren, ohne den gesamten Code zu ändern. Die Verwendung des Proxy-Musters für Upgrades erfordert die Erstellung eines völlig neuen Logikvertrags, selbst für kleinere Upgrades.

2. Alle Smart Contracts (einschließlich der in Proxy-Mustern verwendeten Logikverträge) haben ein Größenlimit von 24 KB, was eine Einschränkung darstellen kann – insbesondere für komplexe Verträge, die mehr Funktionen erfordern. Das Diamond-Muster macht es einfach, dieses Problem zu lösen, indem Funktionen auf mehrere Logikverträge aufgeteilt werden.

3. Proxy-Muster verfolgen einen pauschalen Ansatz für Zugriffskontrollen. Eine Entität mit Zugriff auf Upgrade-Funktionen kann den _gesamten_ Vertrag ändern. Das Diamond-Muster ermöglicht jedoch einen modularen Berechtigungsansatz, bei dem Sie Entitäten darauf beschränken können, nur bestimmte Funktionen innerhalb eines Smart Contracts zu aktualisieren.

[Mehr zum Diamond-Muster](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Vor- und Nachteile der Aktualisierung von Smart Contracts {#pros-and-cons-of-upgrading-smart-contracts}

| Vorteile                                                                                                       | Nachteile                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ein Smart-Contract-Upgrade kann es einfacher machen, Schwachstellen zu beheben, die in der Phase nach der Bereitstellung entdeckt wurden.    | Die Aktualisierung von Smart Contracts negiert die Idee der Code-Unveränderlichkeit, was Auswirkungen auf Dezentralisierung und Sicherheit hat.                              |
| Entwickler können Logik-Upgrades verwenden, um dezentralisierten Anwendungen neue Funktionen hinzuzufügen.                           | Benutzer müssen darauf vertrauen, dass Entwickler Smart Contracts nicht willkürlich ändern.                                                                                  |
| Smart-Contract-Upgrades können die Sicherheit für Endbenutzer verbessern, da Fehler schnell behoben werden können.                      | Die Programmierung von Upgrade-Funktionen in Smart Contracts fügt eine weitere Komplexitätsebene hinzu und erhöht die Möglichkeit kritischer Fehler.                |
| Vertrags-Upgrades geben Entwicklern mehr Spielraum, um mit verschiedenen Funktionen zu experimentieren und Dapps im Laufe der Zeit zu verbessern. | Die Möglichkeit, Smart Contracts zu aktualisieren, kann Entwickler dazu ermutigen, Projekte schneller zu starten, ohne während der Entwicklungsphase die gebotene Sorgfalt walten zu lassen. |
|                                                                                                                | Unsichere Zugriffskontrolle oder Zentralisierung in Smart Contracts können es böswilligen Akteuren erleichtern, unbefugte Upgrades durchzuführen.                  |

## Überlegungen zur Aktualisierung von Smart Contracts {#considerations-for-upgrading-smart-contracts}

1. Verwenden Sie sichere Zugriffskontroll-/Autorisierungsmechanismen, um unbefugte Smart-Contract-Upgrades zu verhindern, insbesondere bei der Verwendung von Proxy-Mustern, Strategiemustern oder Datentrennung. Ein Beispiel ist die Beschränkung des Zugriffs auf die Upgrade-Funktion, sodass nur der Eigentümer des Vertrags sie aufrufen kann.

2. Die Aktualisierung von Smart Contracts ist eine komplexe Aktivität und erfordert ein hohes Maß an Sorgfalt, um die Einführung von Schwachstellen zu verhindern.

3. Reduzieren Sie Vertrauensannahmen, indem Sie den Prozess der Implementierung von Upgrades dezentralisieren. Mögliche Strategien umfassen die Verwendung eines [Mehrfachsignatur-Wallet-Vertrags](/developers/docs/smart-contracts/#multisig) zur Steuerung von Upgrades oder die Anforderung, dass [Mitglieder einer DAO](/dao/) über die Genehmigung des Upgrades abstimmen.

4. Seien Sie sich der Kosten bewusst, die mit der Aktualisierung von Verträgen verbunden sind. Beispielsweise kann das Kopieren des Zustands (z. B. Benutzerguthaben) von einem alten Vertrag in einen neuen Vertrag während der Vertragsmigration mehr als eine Transaktion erfordern, was mehr Gasgebühren bedeutet.

5. Erwägen Sie die Implementierung von **Timelocks**, um Benutzer zu schützen. Ein Timelock bezieht sich auf eine erzwungene Verzögerung bei Änderungen an einem System. Timelocks können mit einem Mehrfachsignatur-Governance-System kombiniert werden, um Upgrades zu steuern: Wenn eine vorgeschlagene Aktion den erforderlichen Genehmigungsschwellenwert erreicht, wird sie erst ausgeführt, wenn die vordefinierte Verzögerungszeit abgelaufen ist.

Timelocks geben Benutzern etwas Zeit, das System zu verlassen, wenn sie mit einer vorgeschlagenen Änderung (z. B. Logik-Upgrade oder neue Gebührenmodelle) nicht einverstanden sind. Ohne Timelocks müssen Benutzer darauf vertrauen, dass Entwickler keine willkürlichen Änderungen an einem Smart Contract ohne vorherige Ankündigung vornehmen. Der Nachteil hierbei ist, dass Timelocks die Fähigkeit einschränken, Schwachstellen schnell zu beheben.

## Ressourcen {#resources}

**OpenZeppelin Upgrades Plugins – _Eine Suite von Tools zur Bereitstellung und Sicherung aktualisierbarer Smart Contracts._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentation](https://docs.openzeppelin.com/upgrades)

## Tutorials {#tutorials}

- [Upgrading your Smart Contracts | YouTube Tutorial](https://www.youtube.com/watch?v=bdXJmWajZRY) von Patrick Collins
- [Ethereum Smart Contract Migration Tutorial](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) von Austin Griffith
- [Using the UUPS proxy pattern to upgrade smart contracts](https://blog.logrocket.com/author/praneshas/) von Pranesh A.S
- [Web3 Tutorial: Write upgradeable smart contract (proxy) using OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) von fangjun.eth

## Weiterführende Literatur {#further-reading}

- [The State of Smart Contract Upgrades](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) von Santiago Palladino
- [Multiple ways to upgrade a Solidity smart contract](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) – Crypto Market Pool Blog
- [Learn: Upgrading Smart Contracts](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) – OpenZeppelin Docs
- [Proxy Patterns For Upgradeability Of Solidity Contracts: Transparent vs UUPS Proxies](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) von Naveen Sahu
- [How Diamond Upgrades Work](https://dev.to/mudgen/how-diamond-upgrades-work-417j) von Nick Mudge