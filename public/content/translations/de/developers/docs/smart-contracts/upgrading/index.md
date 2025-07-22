---
title: Aktualisierung von Smart Contracts
description: Ein Überblick über Upgrade-Muster für Ethereum-Smart-Contracts
lang: de
---

Smart Contracts auf Ethereum sind selbstausführende Programme, die in der Ethereum Virtual Machine (EVM) laufen. Diese Programme sind von vornherein unveränderlich, sodass sich die Geschäftslogik nach der Veröffentlichung des Vertrags nicht mehr aktualisieren lässt.

Zwar ist die Unveränderlichkeit für die Vertrauenslosigkeit, Dezentralisierung und Sicherheit von Smart Contracts unabdinglich, sie kann jedoch in bestimmten Fällen ein Nachteil sein. So kann unveränderlicher Code es den Entwicklern unmöglich machen, anfällige Verträge zu reparieren.

Die zunehmende Forschung zur Verbesserung von Smart Contracts hat jedoch zur Einführung verschiedener Upgrade-Muster geführt. Diese Upgrade-Muster ermöglichen es Entwicklern, Smart Contracts zu aktualisieren (unter Beibehaltung der Unveränderlichkeit), indem sie die Geschäftslogik in verschiedenen Verträgen unterbringen.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis für [Smart Contracts](/developers/docs/smart-contracts/), [die Smart-Contract-Anatomie](/developers/docs/smart-contracts/anatomy/) und die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) haben. In diesem Leitfaden wird außerdem davon ausgegangen, dass die Leser über Kenntnisse in der Programmierung von Smart Contracts verfügen.

## Was ist ein Smart-Contract-Upgrade? {#what-is-a-smart-contract-upgrade}

Bei einem Smart-Contract-Upgrade wird die Geschäftslogik eines Smart Contracts geändert, wobei der Zustand des Vertrags erhalten bleibt. Es ist wichtig, klarzustellen, dass Aktualisierbarkeit und Veränderbarkeit nicht dasselbe sind, insbesondere im Zusammenhang mit Smart Contracts.

Sie können ein Programm, das auf einer Adresse im Ethereum-Netzwerk veröffentlicht wird, trotzdem nicht ändern. Aber Sie können den Code ändern, der ausgeführt wird, wenn Benutzer mit einem Smart Contract interagieren.

Dies kann mit den folgenden Methoden geschehen:

1. Erstellung mehrerer Versionen eines Smart Contracts und Migration des Zustands (d. h. der Daten) vom alten Vertrag auf eine neue Instanz des Vertrags.

2. Erstellung separater Verträge zur Speicherung der Geschäftslogik und des Status.

3. Verwendung von Proxy-Mustern, um Funktionsaufrufe von einem unveränderlichen Proxy-Vertrag an einen modifizierbaren Logik-Vertrag zu delegieren.

4. Erstellung eines unveränderlichen Haupt-Vertrags, der über Schnittstellen mit flexiblen Satelliten-Verträgen verbunden ist und sich auf diese stützt, um bestimmte Funktionen auszuführen.

5. Verwendung des Diamond-Musters, um Funktionsaufrufe von einem Proxy-Vertrag an Logik-Verträge zu delegieren.

### Upgrade-Mechanismus #1: Vertragsmigration {#contract-migration}

Die Migration von Verträgen basiert auf Versioning – also der Erstellung und Verwaltung eindeutiger Zustände derselben Software. Bei der Vertragsmigration wird eine neue Instanz eines bestehenden Smart Contracts veröffentlicht, wobei Speicher und Guthaben auf den neuen Vertrage übergehen.

Der neu veröffentlichte Vertrag hat einen leeren Speicher, sodass Sie Daten aus dem alten Vertrag wiederherstellen und in die neue Implementierung schreiben können. Danach müssen Sie alle Verträge, die mit dem alten Vertrag interagierten, auf die neue Adresse umstellen.

Der letzte Schritt der Vertragsmigration besteht darin, die Benutzer davon zu überzeugen, den neuen Vertrag zu nutzen. In der neuen Vertragsversion bleiben die Guthaben und Adressen der Benutzer erhalten, so dass die Unveränderlichkeit gewahrt bleibt. Wenn es sich um einen Token-basierten Vertrag handelt, müssen Sie sich auch mit den Börsen in Verbindung setzen, um den alten Vertrag zu verwerfen und mit dem neuen Vertrag zu ersetzen.

Die Migration von Verträgen ist eine relativ einfache und sichere Maßnahme, um Smart Contracts zu aktualisieren, ohne die Interaktionen der Nutzer zu unterbrechen. Die manuelle Migration von Speicher und Guthaben der Benutzer auf den neuen Vertrag ist jedoch zeitaufwändig und kann hohe Gaskosten verursachen.

[Mehr über die Migration von Verträgen.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Upgrade-Mechanismus #2: Datentrennung {#data-separation}

Eine weitere Methode zur Aktualisierung von Smart Contracts ist die Aufteilung der Geschäftslogik und des Datenspeichers auf separate Verträge. Das bedeutet, dass die Benutzer mit den Logikverträgen interagieren, die Daten aber im Speichervertrag gesichert werden.

Der Logikvertrag enthält den Code, der ausgeführt wird, wenn Benutzer mit der Anwendung interagieren. Er enthält auch die Adresse des Speichervertrags und interagiert mit diesem, um Daten zu erhalten und einzustellen.

In der Zwischenzeit sichert der Speichervertrag den mit dem Smart Contract verbundenen Status, wie z. B. Benutzerguthaben und Adressen. Beachten Sie dabei, dass der Speichervertrag Eigentum des Logikvertrags ist und bei der Veröffentlichung mit der Adresse des Logikvertrags konfiguriert wird. Dadurch wird verhindert, dass nicht autorisierte Verträge den Speichervertrag aufrufen oder seine Daten aktualisieren.

Standardmäßig ist der Speichervertrag unveränderlich, aber Sie können den Logikvertrag, auf den er verweist, durch eine neue Implementierung ersetzen. Dadurch wird der Code, der in der EVM läuft, verändert, wobei sowohl der Speicher als auch die Guthaben intakt bleiben.

Bei dieser Upgrade-Methode muss die Adresse des Logikvertrags im Speichervertrag aktualisiert werden. Außerdem müssen Sie den neuen Logikvertrag aus den bereits erläuterten Gründen mit der Adresse des Speichervertrags konfigurieren.

Das Muster der Datentrennung ist im Vergleich zur Vertragsmigration einfacher zu implementieren. Allerdings müssen Sie mehrere Verträge verwalten und komplexe Autorisierungssysteme implementieren, um Smart Contracts vor böswilligen Upgrades zu schützen.

### Upgrade-Mechanismus #3: Proxy-Muster {#proxy-patterns}

Für Proxy-Muster kommt ebenfalls eine Datentrennung zur Anwendung, um die Geschäftslogik und die Daten in getrennten Verträgen zu halten. Bei einem Proxy-Muster hingegen ruft der Speichervertrag (Proxy genannt) den Geschäftsvertrag während der Codeausführung auf. Dies ist eine Umkehrung der Datentrennungsmethode, bei der der Geschäftsvertrag den Speichervertrag aufruft.

Das Folgende geschieht bei einem Proxy-Muster:

1. Die Benutzer interagieren mit dem Proxy-Vertrag, der Daten speichert, aber nicht die Geschäftslogik enthält.

2. Der Proxy-Vertrag speichert die Adresse des Logikvertrags und delegiert alle Funktionsaufrufe an den Logikvertrag (der die Geschäftslogik enthält) unter Verwendung der Funktion `Delegatecall`.

3. Nachdem der Aufruf an den Logikvertrag weitergeleitet wurde, werden die vom Logikvertrag weitergegebenen Daten abgerufen und an den Benutzer zurückgegeben.

Um Proxy-Muster zu verwenden, ist ein Verständnis der Funktion **Delegatecall** erforderlich. `Delegatecall` ist im Wesentlichen ein Operationscode, der es einem Vertrag ermöglicht, einen anderen Vertrag aufzurufen, wobei die eigentliche Codeausführung im Kontext des aufrufenden Vertrags erfolgt. Die Verwendung von `Delegatecall` in Proxy-Mustern impliziert, dass der Proxy-Vertrag in seinem Speicher liest, dort auch schreibt und die im Logikvertrag gespeicherte Logik ausführt, als ob er eine interne Funktion aufrufen würde.

Aus der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Es gibt eine spezielle Variante eines Nachrichtenaufrufs mit dem Namen **Delegatecall**. Sie ist mit einem Nachrichtenaufruf identisch, abgesehen davon, dass der Code an der Zieladresse im Kontext (d. h. an der Adresse) des aufrufenden Vertrags ausgeführt wird und `msg.sender` und `msg.value` ihre Werte nicht ändern._ _Das bedeutet, dass ein Vertrag während der Laufzeit Code von einer anderen Adresse dynamisch laden kann. Speicher, aktuelle Adresse und Guthaben beziehen sich weiterhin auf den aufrufenden Vertrag, nur der Code wird von der aufgerufenen Adresse übernommen._

Der Proxy-Vertrag weiß, dass `Delegatecall` aufgerufen werden muss, wenn ein Benutzer eine Funktion aufruft, weil er über eine eingebaute `Fallback`-Funktion verfügt. Bei der Solidity-Programmierung wird die [Fallback-Funktion](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) ausgeführt, wenn ein Funktionsaufruf nicht mit den in einem Vertrag angegebenen Funktionen übereinstimmt.

Damit das Proxy-Muster funktioniert, muss eine benutzerdefinierte Fallback-Funktion verfasst werden, in der beschrieben wird, wie der Proxy-Vertrag mit Funktionsaufrufen umgehen soll, die er nicht unterstützt. In diesem Fall ist die Fallback-Funktion des Proxys so programmiert, dass sie einen Delegatecall initiiert und die Anfrage des Benutzers an die aktuelle Implementierung des Logikvertrags weiterleitet.

Der Proxy-Vertrag ist standardmäßig unveränderlich, aber Logikverträge mit aktualisierter Geschäftslogik können neu erstellt werden. Für das Upgrade muss dann lediglich die Adresse des im Proxy-Vertrag referenzierten Logikvertrags geändert werden.

Nachdem der Proxy-Vertrag auf einen neuen Logikvertrag verwiesen wurde, ändert sich der Code, der ausgeführt wird, wenn Benutzer die Funktion des Proxy-Vertrags aufrufen. Auf diese Weise können wir die Logik eines Vertrags aktualisieren, ohne die Benutzer aufzufordern, mit einem neuen Vertrag zu interagieren.

Proxy-Muster sind eine beliebte Methode für das Aktualisieren von Smart Contracts, da sie die mit der Vertragsmigration verbundenen Schwierigkeiten beseitigen. Die Verwendung von Proxy-Mustern ist jedoch komplizierter und kann bei unsachgemäßer Verwendung zu kritischen Fehlern führen, wie z. B. [Kollisionen von Funktions-Selektoren](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357).

[Mehr über Proxy-Muster](https://blog.openzeppelin.com/proxy-patterns/).

### Upgrade-Mechanismus #4: Strategiemuster {#strategy-pattern}

Diese Technik wird beeinflusst durch [Strategiemuster](https://en.wikipedia.org/wiki/Strategy_pattern). Sie fördern die Erstellung von Softwareprogrammen, die über Schnittstellen zur Implementierung bestimmter Funktionen mit anderen Programmen verbunden sind. Die Anwendung von Strategiemustern auf die Ethereum-Entwicklung würde bedeuten, dass ein Smart Contract erstellt wird, der Funktionen aus anderen Verträgen abruft.

Der Hauptvertrag enthält in diesem Fall die zentrale Geschäftslogik, verfügt aber über Schnittstellen zu anderen Smart Contracts („Satellitenverträgen“), um bestimmte Funktionen auszuführen. Dieser Hauptvertrag speichert ebenfalls die Adresse für jeden Satellitenvertrag und kann zwischen verschiedenen Implementierungen des Satellitenvertrags wechseln.

Sie können einen neuen Satellitenvertrag erstellen und den Hauptvertrag mit der neuen Adresse konfigurieren. Dadurch können Sie _Strategien_ für Smart Contracts ändern (z. B. eine neue Logik implementieren).

Obwohl das Strategiemuster dem zuvor besprochenen Proxy-Muster ähnelt, unterscheidet es sich von diesem, weil der Hauptvertrag, mit dem die Benutzer interagieren, die Geschäftslogik enthält. Die Verwendung dieses Musters bietet Ihnen die Möglichkeit, begrenzte Änderungen an einem Smart Contract vorzunehmen, ohne die Kerninfrastruktur zu beeinträchtigen.

Der größte Nachteil ist, dass sich dieses Muster hauptsächlich für die Einführung kleinerer Upgrades eignet. Auch können Sie diese Upgrade-Methode bei einem (z. B. durch einen Hack) kompromittierten Hauptvertrag nicht verwenden.

### Upgrade-Mechanismus #5: Diamond-Muster {#diamond-pattern}

Das Diamond-Muster kann als eine Verbesserung des Proxy-Musters angesehen werden. Diamond-Muster unterscheiden sich von Proxy-Mustern, da der Diamond-Proxy-Vertrag Funktionsaufrufe an mehr als einen Logikvertrag delegieren kann.

Die Logikverträge im Diamond-Muster sind bekannt als _Facets_. Damit das Diamond-Muster funktioniert, müssen Sie im Proxy-Vertrag eine Zuordnung erstellen, die [Funktionsselektoren](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) verschiedenen Facet-Adressen zuordnet.

Wenn ein Benutzer eine Funktion aufruft, prüft der Proxy-Vertrag die Zuordnung, um die Facet zu finden, die für die Ausführung dieser Funktion zuständig ist. Dann ruft sie `delegatecall` auf (mithilfe der Fallback-Funktion) und leitet den Aufruf an den entsprechenden Logikvertrag weiter.

Das Diamond-Upgrade-Muster hat einige Vorteile gegenüber konventionellen Proxy-Upgrade-Mustern:

1. Damit können Sie einen kleinen Teil des Vertrags aktualisieren, ohne den gesamten Code zu ändern. Die Verwendung des Proxy-Musters für Upgrades setzt die Erstellung eines völlig neuen Logikvertrags voraus, selbst für kleinere Upgrades.

2. Alle Smart Contracts (einschließlich Logikverträge, die im Proxy-Muster verwendet werden) unterliegen einer Größenbeschränkung von 24 KB, was vor allem bei komplexen Verträgen, für die mehr Funktionen erforderlich sind, eine Einschränkung darstellen kann. Mit dem Diamond-Muster lässt sich dieses Problem leicht lösen, indem Funktionen auf mehrere Logikverträge aufgeteilt werden.

3. Proxy-Muster verfolgen bei der Zugangskontrolle einen allumfassenden Ansatz. Eine Entität mit Zugriff auf Upgrade-Funktionen kann den _gesamten_ Vertrag verändern. Das Diamond-Muster ermöglicht jedoch einen modularen Berechtigungsansatz, bei dem Sie Entitäten darauf beschränken können, bestimmte Funktionen innerhalb eines Smart Contracts zu aktualisieren.

[Mehr zum Thema Diamond-Muster](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Vor- und Nachteile der Aktualisierung von Smart Contracts {#pros-and-cons-of-upgrading-smart-contracts}

| Vorteile                                                                                                                                     | Nachteile                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ein Smart-Contract-Upgrade kann die Behebung von Schwachstellen erleichtern, die in der Phase nach der Veröffentlichung entdeckt werden.     | Das Aktualisieren von Smart Contracts negiert die Idee der Unveränderlichkeit des Codes, was Auswirkungen auf die Dezentralisierung und Sicherheit hat.                                     |
| Entwickler können mit Logik-Upgrades neue Funktionen zu dezentralen Anwendungen hinzufügen.                                                  | Die Benutzer müssen darauf vertrauen, dass die Entwickler Smart Contracts nicht willkürlich verändern.                                                                                      |
| Upgrades für Smart Contracts können die Sicherheit für die Endbenutzer erhöhen, da sich Bugs damit schnell beheben lassen.                   | Die Programmierung von Upgrade-Funktionalitäten in Smart Contracts fügt eine weitere Komplexitätsebene hinzu und erhöht die Möglichkeit kritischer Fehler.                                  |
| Vertrags-Upgrades geben Entwicklern mehr Raum, um mit verschiedenen Funktionen zu experimentieren und DApps im Laufe der Zeit zu verbessern. | Die Möglichkeit, Smart Contracts zu aktualisieren, könnte Entwickler dazu verleiten, Projekte schneller zu starten, ohne in der Entwicklungsphase eine Due-Diligence-Prüfung durchzuführen. |
|                                                                                                                                              | Eine unsichere Zugriffskontrolle oder Zentralisierung in Smart Contracts kann es böswilligen Akteuren erleichtern, nicht autorisierte Upgrades durchzuführen.                               |

## Überlegungen zu Upgrades von Smart Contracts {#considerations-for-upgrading-smart-contracts}

1. Benutzen Sie sichere Zugriffskontroll-/Autorisierungsmechanismen, um unbefugte Smart-Contract-Upgrades zu verhindern, insbesondere bei Verwendung von Proxy-Mustern, Strategiemustern oder Datentrennung. Ein Beispiel ist die Einschränkung des Zugriffs auf die Upgrade-Funktion, sodass nur der Eigentümer des Vertrags sie aufrufen kann.

2. Die Aktualisierung von Smart Contracts ist ein komplexer Vorgang und erfordert ein hohes Maß an Sorgfalt, um die Einführung von Schwachstellen zu verhindern.

3. Verringern Sie Vertrauensannahmen, indem Sie den Prozess der Implementierung von Upgrades dezentralisieren. Mögliche Strategien sind die Verwendung eines [Multi-Sig-Wallet-Vertrags](/developers/docs/smart-contracts/#multisig), um Upgrades zu kontrollieren, oder die Verpflichtung von [Mitgliedern eines DAOs](/dao/) dazu, über die Genehmigung des Upgrades abzustimmen.

4. Seien Sie sich der Kosten bewusst, die mit der Aktualisierung von Verträgen verbunden sind. So kann beispielsweise das Kopieren von Zuständen (z. B. Benutzerguthaben) von einem alten auf einen neuen Vertrag während der Vertragsmigration mehr als eine Transaktion erfordern, was zu höheren Gasgebühren führt.

5. Erwägen Sie die Implementierung von **Timelocks**, um die Benutzer zu schützen. Ein Timelock bezieht sich auf eine Verzögerung, die bei Änderungen an einem System erzwungen wird. Timelocks können mit einem Multi-Sig-Verwaltungssystem kombiniert werden, um die Upgrades zu kontrollieren: Erreicht eine vorgeschlagene Aktion den erforderlichen Schwellenwert für die Genehmigung, wird sie erst nach Ablauf der vordefinierten Verzögerungszeit ausgeführt.

Timelocks geben den Benutzern eine gewisse Zeitspanne, um das System zu verlassen, wenn sie mit einer vorgeschlagenen Änderung nicht einverstanden sind (z. B. mit einem Logik-Upgrade oder neuen Gebührenregelungen). Ohne Timelocks müssen die Benutzer darauf vertrauen, dass die Entwickler keine willkürlichen Änderungen an einem Smart Contract ohne vorherige Ankündigung vornehmen. Der Nachteil dabei ist, dass die Möglichkeit, Schwachstellen schnell zu beheben, durch die Timelocks eingeschränkt wird.

## Ressourcen {#resources}

**OpenZeppelin Upgrades Plugins – _Eine Suite von Werkzeugen für die Veröffentlichung und die Sicherung von aktualisierbaren Smart Contracts._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentation](https://docs.openzeppelin.com/upgrades)

## Tutorials {#tutorials}

- [Aktualisierung Ihrer Smart Contracts | YouTube-Tutorial](https://www.youtube.com/watch?v=bdXJmWajZRY) von Patrick Collins (auf Englisch)
- [Migrationstutorial für Smart Contracts auf Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) von Austin Griffith (auf Englisch)
- [Aktualisierung von Smart Contracts mithilfe des UUPS-Proxy-Musters](https://blog.logrocket.com/author/praneshas/) von Pranesh A.S (auf Englisch)
- [Web3-Tutorial: Schreiben Sie aktualisierbare Smart Contracts (Proxy) mithilfe von OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) von fangjun.eth (auf Englisch)

## Weiterführende Informationen {#further-reading}

- [Der aktuelle Stand bei Smart-Contract-Upgrades](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) von Santiago Palladino (auf Englisch)
- [Verschiedene Möglichkeiten zur Aktualisierung eines Solidity-Smart-Contracts](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) – Crypto Market Pool Blog (auf Englisch)
- [Schulung: Aktualisierung von Smart Contracts](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) – OpenZeppelin Docs (auf Englisch)
- [Proxy-Muster für die Aktualisierbarkeit von Solidity-Verträgen: Transparente vs. UUPS-Proxies](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) von Naveen Sahu (auf Englisch)
- [Wie Diamond-Upgrades funktionieren](https://dev.to/mudgen/how-diamond-upgrades-work-417j) von Nick Mudge (auf Englisch)
