---
title: Zero-Knowledge Rollups
description: Einführung in Zero-Knowledge Rollups
lang: de
---

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein umfassendes Verständnis für [Ethereum-Skalierung](/developers/docs/scaling/) haben. Die Implementierung von Skalierungslösungen wie Rollups ist ein fortgeschrittenes Thema, da die Technologie weniger erprobt ist und weiter erforscht und entwickelt wird.

Suchen Sie nach einer anfängerfreundlicheren Einführung? Siehe unsere [Einführung in Layer 2](/layer-2/).

## Zero-Knowledge Rollups {#zk-rollups}

**Zero-Knowledge-Rollups (ZK-Rollups)** bündeln (oder „rollen") Hunderte von Überweisungen außerhalb der Kette und erzeugen einen kryptographischen Beweis. Diese Beweise können in Form von SNARKs (succinct non-interactive argument of knowledge) oder STARKs (scalable transparent argument of knowledge) vorliegen. SNARKs und STARKs sind als Gültigkeitsnachweise bekannt und werden auf Layer 1 veröffentlicht.

Der ZK-Rollup Smart Contract verwaltet den Status aller Überweisungen auf Layer 2, und dieser Status kann nur mit einem Validitätsnachweis aktualisiert werden. Das bedeutet, dass ZK-Rollups anstelle aller Transaktionsdaten nur den Gültigkeitsnachweis benötigen. Mit einem ZK-Rollup ist die Validierung eines Blocks schneller und kostengünstiger, da weniger Daten enthalten sind.

Bei einem ZK-Rollup gibt es keine Verzögerungen bei der Übertragung von Mitteln von Layer 2 auf Layer 1, da ein vom ZK-Rollup-Vertrag akzeptierter Validitätsnachweis die Mittel bereits verifiziert hat.

Da sie sich auf Layer 2 befinden, können ZK-Rollups optimiert werden, um die Transaktionsgröße weiter zu verringern. Zum Beispiel wird ein Konto durch einen Index und nicht durch eine Adresse repräsentiert, wodurch eine Transaktion von 32 Bytes auf nur 4 Bytes reduziert wird. Transaktionen werden auch als `Calldata` in Ethereum geschrieben, um Gas zu sparen.

### Vor- und Nachteile {#zk-pros-and-cons}

| Vorteile                                                                                                                                  | Kontra                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Schnellere Finalzeit, da der Zustand sofort überprüft wird, sobald die Beweise an die Hauptkette gesendet werden.                         | Einige haben keine EVM-Unterstützung.                                                                                   |
| Nicht anfällig für wirtschaftliche Angriffe, für die [Optimistische Rollups](#optimistic-pros-and-cons) anfällig sein können.             | Die Validitätsnachweise sind rechenintensiv – für Anwendungen mit geringer Aktivität auf der Blockchain nicht sinnvoll. |
| Sicher und dezentralisiert, da die Daten, die zur Wiederherstellung des Zustands benötigt werden, auf der Layer-1-Kette gespeichert sind. | Ein Betreiber kann die Reihenfolge der Transaktionen beeinflussen                                                       |

### Eine visuelle Erklärung der ZK-Rollups {#zk-video}

Sehen Sie, wie Finematics ZK-Rollups erklärt:

<YouTube id="7pWxCklcNsU" start="406" />

**ZK-Rollups verstehen**

- [Was sind Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [STARKs gegen SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
