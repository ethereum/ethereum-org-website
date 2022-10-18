---
title: Plasma-Kette
description: Eine Einführung in Plasma-Ketten als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
incomplete: true
sidebarDepth: 3
---

Eine Plasma-Kette ist eine separate Blockchain, die in der Hauptkette von Ethereum verankert ist und Betrugsnachweise (wie [Optimistische Rollups](/developers/docs/scaling/optimistic-rollups/)) verwendet, um Streitigkeiten zu schlichten. Diese Ketten werden manchmal auch als „Kinderketten" bezeichnet, da sie im Wesentlichen kleinere Kopien des Ethereum Mainnet sind. Merkle-Bäume ermöglichen die Erstellung eines unbegrenzten Stapels dieser Ketten, welche die Bandbreite der übergeordneten Kette (einschließlich Mainnet) entlasten können. Diese erhalten ihre Sicherheit durch [Betrugsnachweise](/glossary/#fraud-proof), und jede untergeordnete Kette hat ihren eigenen Mechanismus zur Blockvalidierung.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein umfassendes Verständnis für [Ethereum-Skalierung](/developers/docs/scaling/) haben. Die Umsetzung von Skalierungslösungen wie Plasma ist ein fortgeschrittenes Thema, da die Technologie noch nicht so sehr erprobt ist und weiter erforscht und entwickelt wird.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                | Kontra                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hoher Durchsatz, niedrige Kosten pro Transaktion.                                                                                       | Unterstützt keine allgemeine Berechnung. Nur grundlegende Token-Transfers, Swaps und ein paar andere Transaktionstypen werden über Prädikatslogik unterstützt.                                                                                                          |
| Gut für Transaktionen zwischen beliebigen Benutzern (kein Overhead pro Benutzer-Paar, wenn beide auf der Plasma-Kette festgelegt sind). | Benötigt ein regelmäßiges Beobachten des Netzwerks (Lebendigkeitserfordernis) oder das Delegieren dieser Verantwortung an andere, um die Sicherheit der eingesetzten Gelder zu gewährleisten.                                                                           |
|                                                                                                                                         | Verlässt sich auf einen oder mehrere Operatoren, um Daten zu speichern und abzufragen.                                                                                                                                                                                  |
|                                                                                                                                         | Auszahlungen werden um mehrere Tage verzögert, um Herausforderungen zu ermöglichen und potenzielle Streitigkeiten zu lösen. Für fungible Vermögenswerte kann dies durch Liquiditätsanbieter gemildert werden, aber es entstehen damit entsprechende zusätzliche Kosten. |

### Plasma verwenden {#use-plasma}

Mehrere Projekte bieten Implementierungen von Plasma an, die Sie in Ihre dApps integrieren können:

- [OMG-Netzwerk](https://omg.network/)
- [Polygon](https://polygon.technology/) (vorher Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Weiterführende Informationen {#further-reading}

- [EthHub auf Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Lernen Sie Plasma](https://www.learnplasma.org/en/)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
