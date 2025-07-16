---
title: Zukunftssicherung von Ethereum
description: Diese Verbesserungen festigen Ethereum als widerstandsfähige und dezentrale Grundlage für die ungewisse Zukunft.
lang: de
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Einige Aspekte der Roadmap sind zwar nicht unmittelbar für die Skalierung oder Sicherheit von Ethereum erforderlich, legen jedoch den Grundstein für langfristige Stabilität und Zuverlässigkeit von Ethereum.

## Quantenresistenz {#quantum-resistance}

Ein Teil der [Kryptographie](/glossary/#cryptography), die derzeit Ethereum sichert, wird gefährdet sein, wenn Quantencomputing Realität wird. Obwohl Quantencomputer vermutlich noch Jahrzehnte davon entfernt sind, eine echte Bedrohung für die moderne Kryptographie darzustellen, wird Ethereum dennoch so entwickelt, dass es für die kommenden Jahrhunderte sicher ist. Dies bedeutet, dass Ethereum so schnell wie möglich [quantenresistent](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) gemacht werden soll.

Die Herausforderung für die Ethereum-Entwickler besteht darin, dass sich das aktuelle [Proof-of-Stake](/glossary/#pos)-Protokoll auf ein sehr effizientes Signaturschema namens BLS stützt, um Stimmen auf gültigen [Blöcken](/glossary/#block) zu aggregieren. Dieses Signaturschema wird von Quantencomputern gebrochen, aber die quantenresistenten Alternativen sind nicht so effizient.

Die in mehreren Bereichen von Ethereum zur Generierung kryptographischer Geheimnisse verwendeten ["KZG"-Verpflichtungsschemata](/roadmap/danksharding/#what-is-kzg) sind als quantenanfällig bekannt. Derzeit wird dies durch "vertrauenswürdige Setups" umgangen, bei denen viele Benutzer Zufälligkeit erzeugen, die von einem Quantencomputer nicht rückgängig gemacht werden kann. Die ideale Lösung wäre jedoch einfach, Quanten-sichere Kryptographie einzubauen. Es gibt zwei führende Ansätze, die effiziente Ersatzlösungen für das BLS-Schema werden könnten: [STARK-basierte](https://hackmd.io/@vbuterin/stark_aggregation) und [Gitter-basierte](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) Signierung. **Diese werden noch erforscht und in Prototypen umgesetzt**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Lesen Sie über KZG und vertrauenswürdige Setups</ButtonLink>

## Einfacheres und effizienteres Ethereum {#simpler-more-efficient-ethereum}

Komplexität schafft Möglichkeiten für Fehler oder Schwachstellen, die von Angreifern ausgenutzt werden können. Ein Bestandteil des Fahrplans besteht daher darin, Ethereum zu vereinfachen, indem nicht mehr benötigter oder verbesserungsfähiger Code, der sich durch verschiedene Upgrades gehalten hat, entfernt wird. Eine schlankere, einfachere Codebasis ist für Entwickler leichter zu warten und zu verstehen.

Es gibt mehrere Updates, die an der [Ethereum Virtual Machine (EVM)](/developers/docs/evm) vorgenommen werden, um sie einfacher und effizienter zu gestalten. Dazu gehört [das Entfernen des SELFDESTRUCT Opcodes](https://hackmd.io/@vbuterin/selfdestruct) - ein selten genutztes Kommando, das nicht mehr benötigt wird und unter bestimmten Umständen gefährlich zu verwenden sein kann, insbesondere in Kombination mit anderen zukünftigen Upgrades des Speichermodells von Ethereum. [Ethereum-Clients](/glossary/#consensus-client) unterstützen auch noch einige alte Transaktionsarten, die nun komplett entfernt werden können. Die Art und Weise, wie [Gas](/glossary/#gas) berechnet wird, kann ebenfalls verbessert werden. Darüber hinaus können effizientere Methoden für die Arithmetik, die einigen kryptographischen Operationen zugrunde liegt, eingeführt werden.

Ebenso können Updates an anderen Teilen der gegenwärtigen Ethereum-Clients vorgenommen werden. Ein Beispiel dafür ist, dass aktuelle Ausführungs- und Konsens-Clients eine andere Art der Datenkompression verwenden. Es wird viel einfacher und intuitiver sein, Daten zwischen Clients auszutauschen, wenn das Kompressionsschema im gesamten Netzwerk einheitlich ist.

## Aktueller Fortschritt {#current-progress}

Die meisten der Upgrades, die erforderlich sind, um Ethereum zukunftssicher zu machen, befinden sich **noch in der Forschungsphase. Möglicherweise kann es noch mehrere Jahre dauern**, bis sie implementiert werden. Upgrades wie die Abschaffung von SELFDESTRUCT und die Harmonisierung des in den Ausführungs- und Konsens-Clients verwendeten Kompressionsschemas werden wahrscheinlich früher eingeführt als die quantenresistente Kryptografie.

**Weiterführende Informationen**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Data structures](/developers/docs/data-structures-and-encoding)
