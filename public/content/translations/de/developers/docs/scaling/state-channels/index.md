---
title: Zustandskanäle
description: Eine Einführung in Zustandskanäle und Zahlungskanäle als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
incomplete: true
sidebarDepth: 3
---

Zustandskanäle ermöglichen es den Teilnehmern, `x` Transaktionen außerhalb der Kette durchzuführen, während nur zwei Transaktionen auf der Kette an das Ethereum-Netzwerk übermittelt werden. Dies ermöglicht einen extrem hohen Transaktionsdurchsatz.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein umfassendes Verständnis für [Ethereum-Skalierung](/developers/docs/scaling/) haben. Die Implementierung von Skalierungslösungen wie Kanäle ist ein fortgeschrittenes Thema, da die Technologie weniger erprobt ist und weiter erforscht und entwickelt wird.

## Kanäle {#channels}

Die Teilnehmer müssen einen Teil von Ethereums Zustand wie eine ETH-Einlage in einen Multisig-Vertrag einschließen. Ein Multisig-Vertrag ist eine Art von Vertrag, der die Unterschriften (und damit die Vereinbarung) mehrerer privater Schlüssel zum Ausführen erfordert.

Das Sperren des Zustands ist die erste Transaktion und öffnet den Channel. Die Teilnehmer können dann schnell und frei off-chain handeln. Wenn die Interaktion beendet ist, wird eine letzte On-Chain-Transaktion abgeschickt, die den Zustand entsperrt.

**Nützlich für**:

- viele Status-Updates
- wenn die Teilnehmerzahl im Voraus bekannt ist
- wenn Teilnehmer immer verfügbar sind

Zurzeit gibt es zwei Arten von Kanälen: Zustandskanäle und Zahlungskanäle.

## Zustandskanäle {#state-channels}

Der Zustandskanal lässt sich vielleicht am besten anhand eines Beispiels erklären, z. B. einem Tic-Tac-Toe-Spiel:

1. Erstellen Sie einen Multisig-Smart-Contract „Judge" auf der Ethereum-Main-Chain, der die Regeln von Tic-Tac-Toe versteht und Alice und Bob als die beiden Spieler in unserem Spiel identifizieren kann. In diesem Vertrag ist der Preis von 1ETH enthalten.

2. Dann beginnen Alice und Bob mit dem Spiel und öffnen den Zustandskanal. Jede Bewegung erzeugt eine Off-Chain-Transaktion mit einem „Nonce“, was einfach bedeutet, dass wir später immer sagen können, in welcher Reihenfolge die Schritte passierten.

3. Wenn es einen Gewinner gibt, schließen sie den Channel, indem sie den endgültigen Status (Eine Liste der Transaktionen) an den Richter-Smart-Contract übermitteln und hierfür nur einmal die Transaktionsgebühr zahlen müssen. Der Richter stellt sicher, dass dieser „endgültige Zustand“ von beiden Parteien unterzeichnet wird und wartet einige Zeit, um sicherzustellen, dass niemand das Ergebnis rechtmäßig herausfordern kann, um dann den 1ETH Award an die Gewinnerin Alice auszuzahlen.

## Zahlungskanäle {#payment-channels}

Vereinfachte Zustandskanäle, die sich nur mit Zahlungen befassen (z. B. ETH-Überweisungen). Sie erlauben Off-Chain-Transfers zwischen zwei Teilnehmern, solange die Nettosumme ihrer Transfers die hinterlegten Token nicht überschreitet.

## Vor- und Nachteile {#channels-pros-and-cons}

| Vorteile                                                                                | Kontra                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sofortige Abhebung/Abrechnung in Mainnet (wenn beide Parteien eines Kanals kooperieren) | Zeit und Kosten für die Einrichtung und Abwicklung eines Kanals - nicht gut geeignet für gelegentliche einmalige Transaktionen zwischen beliebigen Benutzern.                                 |
| Es ist ein extrem hoher Transaktions-Durchsatz möglich                                  | Benötigt ein regelmäßiges Beobachten des Netzwerks (Lebendigkeitserfordernis) oder das Delegieren dieser Verantwortung an andere, um die Sicherheit der eingesetzten Gelder zu gewährleisten. |
| Niedrigste Kosten pro Transaktion - gut für laufende Mikrozahlungen                     | Guthaben werden zur vorübergehenden Einlagerung in offenen Zahlungskanälen benötigt                                                                                                           |
|                                                                                         | Eine offene Teilnahme wird nicht unterstützt.                                                                                                                                                 |

## Zustandskanal verwenden {#use-state-channels}

Mehrere Projekte bieten Implementierungen von Zustandskanälen, die Sie in Ihre dApps integrieren können:

- [Connext](https://connext.network/)
- [K-Kanäle](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Weiterführende Informationen {#further-reading}

**Zustandskanäle**

- [Making Sense of Ethereum's Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12. Februar 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _6. November 2015 - Jeff Coleman_
- [Basis von Zustandskanälen](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _Distrikt0x_

**Zahlungskanäle**

_Kennen Sie eine Community-Ressource die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._
