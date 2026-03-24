---
title: Zukunftssicherung von Ethereum
description: "Diese Upgrades festigen Ethereum als die widerstandsfähige, dezentralisierte Basisebene für die Zukunft, was auch immer sie bringen mag."
lang: de
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Einige Teile der Roadmap sind nicht zwingend erforderlich, um Ethereum kurzfristig zu skalieren oder abzusichern, sondern bereiten Ethereum auf Stabilität und Zuverlässigkeit weit in der Zukunft vor.

## Quantenresistenz {#quantum-resistance}

Ein Teil der [Kryptografie](/glossary/#cryptography), die das heutige Ethereum absichert, wird kompromittiert sein, sobald Quantencomputing Realität wird. Obwohl Quantencomputer wahrscheinlich noch Jahrzehnte davon entfernt sind, eine echte Bedrohung für die moderne Kryptografie darzustellen, wird Ethereum so gebaut, dass es für die kommenden Jahrhunderte sicher ist. Das bedeutet, [Ethereum so schnell wie möglich quantenresistent zu machen](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/).

Die Herausforderung für Ethereum-Entwickler besteht darin, dass das aktuelle [Proof-of-Stake](/glossary/#pos)-Protokoll auf einem sehr effizienten Signaturschema namens BLS beruht, um Stimmen für gültige [Blöcke](/glossary/#block) zu aggregieren. Dieses Signaturschema kann von Quantencomputern geknackt werden, aber die quantenresistenten Alternativen sind nicht so effizient.

Die [„KZG“-Commitment-Schemata](/roadmap/danksharding/#what-is-kzg), die an mehreren Stellen in Ethereum verwendet werden, um kryptografische Geheimnisse zu generieren, sind bekanntermaßen anfällig für Quantencomputer. Derzeit wird dies durch „Trusted Setups“ (für die die Haupt-Setup-Zeremonie 2023 erfolgreich abgeschlossen wurde) umgangen, bei denen viele Benutzer Zufälligkeiten generierten, die von einem Quantencomputer nicht zurückentwickelt werden können. Die ideale langfristige Lösung wäre jedoch, stattdessen quantensichere Kryptografie zu integrieren. Es gibt zwei führende Ansätze, die effiziente Ersatzlösungen für das BLS-Schema werden könnten: [STARK-basierte](https://hackmd.io/@vbuterin/stark_aggregation) und [gitterbasierte (lattice-based)](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) Signaturen. **Diese werden derzeit noch aktiv erforscht und als Prototypen entwickelt**.

[Lesen Sie mehr über KZG und Trusted Setups](/roadmap/danksharding#what-is-kzg)

## Ein einfacheres und effizienteres Ethereum {#simpler-more-efficient-ethereum}

Komplexität schafft Möglichkeiten für Fehler oder Schwachstellen, die von Angreifern ausgenutzt werden können. Daher ist ein Teil der Roadmap die Vereinfachung von Ethereum und das Entfernen oder Ändern von Code, der durch verschiedene Upgrades mitgeschleppt wurde, aber nicht mehr benötigt wird oder nun verbessert werden kann. Eine schlankere, einfachere Codebasis ist für Entwickler leichter zu pflegen und zu verstehen.

Um die [Ethereum Virtual Machine (EVM)](/developers/docs/evm) einfacher und effizienter zu machen, werden kontinuierlich Verbesserungen erforscht und implementiert. Dies umfasst sowohl die Behandlung von Legacy-Komponenten als auch die Einführung von Optimierungen.

**Kürzlich implementierte Änderungen:**

- **Überarbeitung der Gasberechnung:** Die Art und Weise, wie [Gas](/glossary/#gas) berechnet wird, wurde mit **EIP-1559 (implementiert im London-Upgrade, 2021)** erheblich verbessert, indem eine Grundgebühr und ein Verbrennungsmechanismus für eine vorhersehbarere Preisgestaltung von Transaktionen eingeführt wurden.
- **Einschränkung von `SELFDESTRUCT`:** Der `SELFDESTRUCT`-Opcode wurde zwar selten verwendet, barg jedoch potenzielle Risiken. Seine Funktionalität wurde im **Dencun-Upgrade (März 2024) über EIP-6780** stark eingeschränkt, um Gefahren, insbesondere im Hinblick auf die Zustandsverwaltung, zu mindern.
- **Modernisierte Transaktionstypen:** Neue Transaktionsformate wurden eingeführt (z. B. über **EIP-2718** und **EIP-4844** für Blobs im Dencun-Upgrade), um neue Funktionen zu unterstützen und die Effizienz gegenüber älteren Typen zu verbessern.

**Laufende und zukünftige Ziele:**

- **Weitere Handhabung von `SELFDESTRUCT`:** Obwohl eingeschränkt, wird die **potenzielle vollständige Entfernung** des `SELFDESTRUCT`-Opcodes für zukünftige Upgrades weiterhin in Betracht gezogen, um den EVM-Zustand weiter zu vereinfachen. ([Mehr Kontext zu SELFDESTRUCT-Problemen](https://hackmd.io/@vbuterin/selfdestruct)).
- **Auslaufen von Legacy-Transaktionen:** Obwohl [Ethereum-Anwendungen](/glossary/#consensus-client) aus Gründen der Abwärtskompatibilität immer noch ältere Transaktionstypen unterstützen, ist es das Ziel, die Migration zu neueren Typen zu fördern und **die Unterstützung für die ältesten Formate in Zukunft möglicherweise als veraltet zu markieren oder vollständig zu entfernen**.
- **Fortgesetzte Forschung zur Gaseffizienz:** Die Erforschung **weiterer Verfeinerungen der Gasberechnung** wird fortgesetzt, was möglicherweise Konzepte wie mehrdimensionales Gas einschließt, um die Ressourcennutzung besser widerzuspiegeln.
- **Optimierte kryptografische Operationen:** Es laufen Bemühungen, **effizientere Methoden für die Arithmetik einzuführen**, die den kryptografischen Operationen zugrunde liegt, die innerhalb der EVM verwendet werden.

In ähnlicher Weise gibt es Updates, die an anderen Teilen heutiger Ethereum-Anwendungen vorgenommen werden können. Ein Beispiel ist, dass aktuelle Ausführungs- und Konsens-Clients eine andere Art der Datenkomprimierung verwenden. Es wird viel einfacher und intuitiver sein, Daten zwischen Anwendungen auszutauschen, wenn das Komprimierungsschema im gesamten Netzwerk vereinheitlicht ist. Dies bleibt ein Bereich der Erforschung.

## Aktueller Fortschritt {#current-progress}

Viele der langfristigen Upgrades zur Zukunftssicherung, insbesondere die **vollständige Quantenresistenz für Kernprotokolle, befinden sich noch in der Forschungsphase und sind möglicherweise noch einige Jahre von der Implementierung entfernt**.

Es wurden jedoch **bereits erhebliche Fortschritte bei den Vereinfachungsbemühungen erzielt.** Beispielsweise wurden wichtige Änderungen wie die **Einschränkung von `SELFDESTRUCT` (EIP-6780)** und die Einführung von **Blob-tragenden Transaktionen (EIP-4844)** im **Dencun-Upgrade (März 2024)** implementiert. Die Arbeit an der Harmonisierung der Komprimierungsschemata der Anwendungen und anderen Effizienzverbesserungen wird ebenfalls fortgesetzt.

**Weiterführende Literatur**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Datenstrukturen](/developers/docs/data-structures-and-encoding)