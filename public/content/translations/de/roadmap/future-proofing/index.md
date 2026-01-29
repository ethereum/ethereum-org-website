---
title: Zukunftssicherung von Ethereum
description: "Diese Verbesserungen festigen Ethereum als widerstandsfähige und dezentrale Grundlage für die ungewisse Zukunft."
lang: de
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Einige Aspekte der Roadmap sind zwar nicht unmittelbar für die Skalierung oder Sicherheit von Ethereum erforderlich, legen jedoch den Grundstein für langfristige Stabilität und Zuverlässigkeit von Ethereum.

## Quantenresistenz {#quantum-resistance}

Ein Teil der [Kryptographie](/glossary/#cryptography), die das heutige Ethereum sichert, wird kompromittiert, sobald Quantencomputing zur Realität wird. Obwohl Quantencomputer vermutlich noch Jahrzehnte davon entfernt sind, eine echte Bedrohung für die moderne Kryptographie darzustellen, wird Ethereum dennoch so entwickelt, dass es für die kommenden Jahrhunderte sicher ist. Das bedeutet, [Ethereum so schnell wie möglich quantenresistent zu machen](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/).

Die Herausforderung für Ethereum-Entwickler besteht darin, dass das aktuelle [Proof-of-Stake](/glossary/#pos)-Protokoll auf einem sehr effizienten Signaturschema namens BLS basiert, um Stimmen für gültige [Blöcke](/glossary/#block) zu aggregieren. Dieses Signaturschema wird von Quantencomputern gebrochen, aber die quantenresistenten Alternativen sind nicht so effizient.

Die [„KZG“-Commitment-Schemata](/roadmap/danksharding/#what-is-kzg), die an mehreren Stellen in Ethereum zur Generierung kryptografischer Geheimnisse verwendet werden, gelten als quantenanfällig. Derzeit wird dies durch „Trusted Setups“ umgangen (deren Haupt-Setup-Zeremonie 2023 erfolgreich abgeschlossen wurde), bei denen viele Benutzer eine Zufälligkeit generierten, die von einem Quantencomputer nicht zurückentwickelt werden kann. Die ideale langfristige Lösung wäre jedoch, stattdessen quantensichere Kryptographie zu integrieren. Es gibt zwei führende Ansätze, die zu einem effizienten Ersatz für das BLS-Schema werden könnten: [STARK-basierte](https://hackmd.io/@vbuterin/stark_aggregation) und [gitterbasierte](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) Signaturen. **Diese werden noch erforscht und in Prototypen umgesetzt**.

[Informationen über KZG und Trusted Setups](/roadmap/danksharding#what-is-kzg)

## Ein einfacheres und effizienteres Ethereum {#simpler-more-efficient-ethereum}

Komplexität schafft Möglichkeiten für Fehler oder Schwachstellen, die von Angreifern ausgenutzt werden können. Daher ist ein Teil der Roadmap die Vereinfachung von Ethereum und das Entfernen oder Ändern von Code, der bei verschiedenen Upgrades erhalten geblieben ist, aber nicht mehr benötigt wird oder nun verbessert werden kann. Eine schlankere, einfachere Codebasis ist für Entwickler leichter zu warten und zu verstehen.

Zur Vereinfachung und Effizienzsteigerung der [Ethereum Virtual Machine (EVM)](/developers/docs/evm) werden fortlaufend Optimierungen erforscht und implementiert. Hierbei geht es darum, sich sowohl mit den bestehenden Legacy-Komponenten zu befassen als auch neue Optimierungen zu implementieren.

**Kürzlich umgesetzte Änderungen:**

- **Überarbeitung der Gas-Berechnung:** Die Art und Weise, wie [Gas](/glossary/#gas) berechnet wird, wurde mit **EIP-1559 (implementiert im London-Upgrade, 2021)** erheblich verbessert, indem eine Grundgebühr und ein Burn-Mechanismus für eine besser vorhersagbare Preisgestaltung von Transaktionen eingeführt wurden.
- **`SELFDESTRUCT`-Beschränkung:** Der `SELFDESTRUCT`-Opcode barg – obgleich selten genutzt – potenzielle Risiken. Seine Funktionalität wurde im **Dencun-Upgrade (März 2024) via EIP-6780** stark eingeschränkt, um Gefahren zu minimieren, insbesondere im Hinblick auf das State-Management.
- **Modernisierte Transaktionstypen:** Neue Transaktionsformate wurden eingeführt (z. B. via **EIP-2718** und **EIP-4844** für Blobs im Dencun-Upgrade), um neue Funktionen zu unterstützen und die Effizienz gegenüber älteren Typen zu verbessern.

**Laufende und künftige Zielsetzungen:**

- **Weitere Handhabung von `SELFDESTRUCT`:** Obwohl bereits beschränkt, wird die potenzielle komplette Entfernung des `SELFDESTRUCT`-Opcodes in künftigen Upgrades erwogen, um den State der EVM weiter zu simplifizieren. ([Mehr Kontext zu den Problemen mit SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- Auslaufenlassen von Legacy-Transaktionen: Obwohl [Ethereum-Clients](/glossary/#consensus-client) aus Gründen der Abwärtskompatibilität noch ältere Transaktionstypen unterstützen, ist es das Ziel, die Migration zu neueren Typen zu fördern und die Unterstützung für die ältesten Formate in Zukunft **potenziell als veraltet zu kennzeichnen oder vollständig zu entfernen**.
- **Kontinuierliche Forschung zur Gas-Effizienz:** Es wird weiterhin an Verfeinerungen der Gas-Berechnung gearbeitet. Dabei werden auch Konzepte wie mehrdimensionales Gas in Betracht gezogen, um den Ressourcenverbrauch besser zu reflektieren.
- **Optimierte kryptografische Operationen:** Die Bemühungen dauern an, leistungsfähigere arithmetische Methoden einzubinden, welche die Basis für kryptografische Vorgänge in der EVM bilden.

Ebenso können Updates an anderen Teilen der gegenwärtigen Ethereum-Clients vorgenommen werden. Ein Beispiel dafür ist, dass aktuelle Ausführungs- und Konsens-Clients eine andere Art der Datenkompression verwenden. Es wird viel einfacher und intuitiver sein, Daten zwischen Clients auszutauschen, wenn das Kompressionsschema im gesamten Netzwerk einheitlich ist. In diesem Bereich wird weiterhin geforscht.

## Aktueller Fortschritt {#current-progress}

Viele der langfristigen Maßnahmen zur Zukunftssicherheit, vor allem die vollständige Quantenresistenz der Core-Protokolle, sind noch in der Forschungsphase und womöglich noch Jahre von einer Umsetzung entfernt.

Jedoch wurden bereits **erhebliche Fortschritte bei den Vereinfachungsbemühungen erzielt.** Zum Beispiel wurden wichtige Änderungen wie die **Einschränkung von `SELFDESTRUCT` (EIP-6780)** und die Einführung von **Transaktionen mit Blobs (EIP-4844)** im **Dencun-Upgrade (März 2024)** implementiert. Zudem setzen sich die Arbeiten zur Angleichung der Komprimierungsschemata der Clients sowie weitere Effizienzoptimierungen fort.

**Weiterführende Literatur**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Datenstrukturen](/developers/docs/data-structures-and-encoding)