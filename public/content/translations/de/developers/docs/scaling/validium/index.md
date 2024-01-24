---
title: Validium
description: Eine Einführung in Validium als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
incomplete: true
sidebarDepth: 3
---

Verwendet Gültigkeitszertifikate wie [ZK-Rollups](/developers/docs/scaling/zk-rollups/), aber Daten werden nicht auf dem Layer-1 der Ethereum-Blockchain gespeichert. Dies kann zu 10.000 Transaktionen pro Sekunde pro Validium-Kette führen und mehrere Ketten können parallel laufen.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein umfassendes Verständnis für [Ethereum-Skalierung](/developers/docs/scaling/) haben. Die Implementierung von Skalierungslösungen wie Validium ist ein fortgeschrittenes Thema, da die Technologie noch nicht so sehr erprobt ist und weiter erforscht und entwickelt wird.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                 | Kontra                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Keine Auszahlungsverzögerung (keine Latenz für on-chain/cross-chain tx), folglich eine höhere Kapitaleffizienz.          | Begrenzte Unterstützung für allgemeine Berechnung/Smart Contracts; spezialisierte Programmiersprachen erforderlich.                                                            |
| Nicht anfällig für bestimmte wirtschaftliche Angriffe, wie Betrugsnachweis-basierte Systeme in hochwertigen Anwendungen. | Benötigt eine hohe Rechenleistung für die Erstellung von ZK-Beweisen und ist nicht kostengünstig für Anwendungen mit geringem Transaktionsdurchsatz.                           |
|                                                                                                                          | Langsamere subjektive Finalisierungszeit (10-30 Minuten, um einen ZK-Nachweis zu erstellen) (aber schneller bis zum vollen Abschluss, da es keine Streitzeitverzögerung gibt). |
|                                                                                                                          | Um einen Nachweis zu erbringen, müssen die Daten außerhalb der Kette jederzeit verfügbar sein.                                                                                 |

### Validium verwenden {#use-validium}

Mehrere Projekte bieten Implementierungen von Validium, die Sie in Ihre dApps integrieren können:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Weiterführende Informationen {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Ausgabe Nr. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
