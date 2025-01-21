---
title: Optimistische Rollups
description: Einführung in optimistische Rollups
lang: de
---

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein umfassendes Verständnis für [Ethereum-Skalierung](/developers/docs/scaling/) haben. Die Implementierung von Skalierungslösungen wie Rollups ist ein fortgeschrittenes Thema, da die Technologie weniger erprobt ist und weiter erforscht und entwickelt wird.

Suchen Sie nach einer anfängerfreundlicheren Einführung? Siehe unsere [Einführung in Layer 2](/layer-2/).

## Optimistische Rollups {#optimistic-rollups}

Optimistische Rollups laufen parallel zur Ethereum-Hauptkette auf Layer 2. Sie bieten Verbesserungen in der Skalierbarkeit, da sie standardmäßig keine Berechnungen durchführen. Stattdessen schlagen sie nach einer Transaktion dem Mainnet den neuen Zustand vor oder „beglaubigen" die Transaktion.

Mit optimistischen Rollups werden Transaktionen als `Calldata` in die Ethereum-Hauptkette geschrieben, wodurch sie weiter optimiert werden, indem die Gaskosten reduziert werden.

Da die Berechnung der langsame und teure Teil der Verwendung von Ethereum ist, können optimistische Rollups die Skalierbarkeit je nach Transaktion bis zu 10-100x verbessern. Diese Zahl wird mit der Einführung von [Shard-Chains](/roadmap/danksharding) noch weiter steigen, da mehr Daten verfügbar sein werden, wenn eine Transaktion angefochten wird.

### Transaktionen bestreiten {#disputing-transactions}

Optimistische Rollups berechnen die Transaktion nicht, so dass es einen Mechanismus geben muss, der sicherstellt, dass die Transaktionen rechtmäßig und nicht betrügerisch sind. Hier kommen Betrugsbeweise ins Spiel. Wenn jemand eine betrügerische Transaktion bemerkt, führt der Rollup die Berechnung eines Betrugsbeweises durch und nutzt die verfügbaren Zustandsdaten. Dies bedeutet, dass Sie möglicherweise längere Wartezeiten für die Transaktionsbestätigung haben als bei einem ZK-Rollup, da die Transaktion angefochten werden könnte.

![Das Diagramm zeigt, was passiert, wenn eine betrügerische Transaktion in einem optimistischen Rollup in Ethereum auftritt](./optimistic-rollups.png)

Das Gas, das Sie brauchen, um die Berechnung des Betrugsnachweises durchzuführen, wird sogar erstattet. Ben Jones von Optimism beschreibt das bestehende Bonding-System:

"_Jeder, der eine Aktion ergreifen könnte, die Sie zur Sicherung Ihres Geldes als Betrug nachweisen müssten, muss eine Anleihe hinterlegen. Sie nehmen im Grunde etwas ETH, verriegeln es und sagen „Hey, ich verspreche die Wahrheit zu sagen"... Wenn ich nicht die Wahrheit sage und ein Betrug nachgewiesen wird, wird dieses Geld unwiederbringlich eingezogen. Nicht nur wird ein Teil dieses Geldes eingezogen, sondern ein Teil wird für das Gas bezahlen, das die Leute ausgegeben haben, die den Betrugsnachweis_ erbringen."

Sie sehen also die Anreize: Die Teilnehmer werden für die Durchführung von Betrug bestraft und für den Nachweis von Betrug entschädigt.

### Vor- und Nachteile {#optimistic-pros-and-cons}

| Vorteile                                                                                                                                   | Kontra                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Alles, was Sie mit Ethereum Layer 1 tun können, ist auch mit optimistischen Rollups umsetzbar, da es mit EVM und Solidität kompatibel ist. | Lange Wartezeiten für On-Chain-Transaktionen aufgrund möglicher Betrugsprobleme. |
| Alle Transaktionsdaten werden in der Layer-1-Kette gespeichert, was bedeutet, dass sie sicher und dezentralisiert sind.                    | Ein Betreiber kann die Reihenfolge der Transaktionen beeinflussen.               |

### Eine visuelle Erklärung von optimistischen Rollups {#optimistic-video}

Sehen Sie, wie Finematics optimistische Rollups erklärt:

<YouTube id="7pWxCklcNsU" start="263" />

**Optimistische Rollups verstehen**

- [Der Leitfaden zu Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Wie funktioniert das Rollup von Optimismus wirklich?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
