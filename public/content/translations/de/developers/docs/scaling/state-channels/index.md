---
title: "Zustandskanäle"
description: "Eine Einführung in Zustandskanäle und Zahlungskanäle als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
sidebarDepth: 3
---

State Channels ermöglichen es Teilnehmenden, sicher außerhalb der Blockchain (offchain) zu transaktieren, während die Interaktion mit dem Ethereum-Mainnet auf ein Minimum reduziert bleibt. Die Peers eines Channels können eine beliebige Anzahl von Offchain-Transaktionen durchführen, wobei lediglich zwei Onchain-Transaktionen erforderlich sind – zum Öffnen und Schließen des Channels. Dadurch wird eine äußerst hohe Transaktionsdurchsatzrate erreicht und die Kosten für Nutzer:innen gesenkt.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zu [Skalierungslösungen für Ethereum](/developers/docs/scaling/) und [Layer 2](/layer-2/) gelesen und verstanden haben.

## Was sind Channels? {#what-are-channels}

Öffentliche Blockchains wie Ethereum stoßen aufgrund ihrer dezentralen Architektur an Skalierungsgrenzen: Onchain-Transaktionen müssen von allen Knoten ausgeführt werden. Um die Dezentralisierung des Netzwerks zu bewahren, müssen Knoten in der Lage sein, das Transaktionsvolumen eines Blocks auch mit bescheidener Hardware zu verarbeiten. Dies begrenzt den maximalen Transaktionsdurchsatz. Blockchain-Channels lösen dieses Problem, indem sie Nutzer:innen ermöglichen, außerhalb der Hauptkette zu interagieren, dabei aber weiterhin die Sicherheit der Mainchain für die finale Abrechnung nutzen.

Channels sind einfache Peer-to-Peer-Protokolle, die es zwei Parteien erlauben, zahlreiche Transaktionen untereinander durchzuführen und lediglich das Endergebnis in die Blockchain einzutragen. Mithilfe kryptografischer Verfahren wird nachgewiesen, dass die zusammengefassten Daten tatsächlich das Ergebnis einer gültigen Sequenz von Zwischentransaktionen sind. Ein Smart Contract vom Typ ["Multisignatur" (Multisig)](/developers/docs/smart-contracts/#multisig) stellt sicher, dass die Transaktionen von den berechtigten Parteien signiert wurden.

Bei Channels werden Zustandsänderungen von den beteiligten Parteien selbst ausgeführt und validiert, wodurch die Rechenlast auf der Ausführungsebene von Ethereum minimiert wird. Dies verringert die Netzwerkbelastung auf Ethereum und beschleunigt gleichzeitig die Transaktionsverarbeitung für Nutzer:innen.

Jeder Channel wird durch einen [Multisignatur-Smart-Contract (Multisig)](/developers/docs/smart-contracts/#multisig) verwaltet, der auf Ethereum ausgeführt wird. Um einen Channel zu eröffnen, stellen die Teilnehmenden den Channel-Contract onchain bereit und zahlen Guthaben in diesen ein. Anschließend signieren beide Parteien gemeinsam eine Zustandsaktualisierung, um den Anfangszustand des Channels festzulegen; danach können sie schnell und ohne Einschränkungen offchain transaktieren.

Zum Schließen des Channels reichen die Teilnehmenden den zuletzt vereinbarten Zustand des Channels onchain ein. Danach verteilt der Smart Contract die eingesperrten Mittel entsprechend der jeweiligen Guthabenstände im endgültigen Zustand des Channels.

Peer-to-Peer-Channels eignen sich besonders gut für Szenarien, in denen eine festgelegte Gruppe von Teilnehmenden häufig miteinander transaktieren möchte, ohne dabei sichtbare Overhead-Kosten zu verursachen. Blockchain-Channels lassen sich in zwei Kategorien einteilen: **Payment Channels** (Zahlungs-Channels) und **State Channels** (Zustands-Channels).

## Zahlungs-Channels {#payment-channels}

Ein Zahlungs-Channel lässt sich am besten als ein „zweiseitiges Kassenbuch“ beschreiben, das gemeinsam von zwei Nutzer:innen geführt wird. Der Anfangssaldo dieses Kassenbuchs entspricht der Summe der Einlagen, die beim Öffnen des Channels in den Onchain-Contract eingesperrt wurden. Überweisungen innerhalb eines Zahlungs-Channels können augenblicklich erfolgen und benötigen – abgesehen von einer einmaligen Onchain-Transaktion zur Eröffnung sowie einer abschließenden Transaktion zum Schließen des Channels – keine direkte Interaktion mit der eigentlichen Blockchain.

Aktualisierungen des Kassenbuchsaldos (d. h. des Zustands des Zahlungs-Channels) bedürfen der Zustimmung aller am Channel beteiligten Parteien. Eine Channel-Aktualisierung, die von allen Teilnehmenden signiert wurde, gilt als final – vergleichbar mit einer Transaktion auf Ethereum.

Zahlungs-Channels zählten zu den frühesten Skalierungslösungen und wurden entwickelt, um teure Onchain-Aktivitäten bei einfachen Nutzerinteraktionen (z. B. ETH-Überweisungen, atomare Swaps, Mikrozahlungen) auf ein Minimum zu reduzieren. Die Teilnehmenden eines Channels können beliebig viele sofortige und gebührenfreie Transaktionen untereinander durchführen, solange die Bilanz ihrer gegenseitigen Überweisungen den Betrag der eingezahlten Tokens nicht überschreitet.

## Zustands-Channels {#state-channels}

Abgesehen von der Unterstützung von Offchain-Zahlungen haben sich Zahlungs-Channels für die Verarbeitung allgemeiner Zustandsübergangslogik als ungeeignet erwiesen. Zustands-Channels (State Channels) wurden entwickelt, um dieses Problem zu lösen und Channels für die Skalierung allgemeiner Berechnungen nutzbar zu machen.

Zustands-Channels weisen nach wie vor viele Gemeinsamkeiten mit Zahlungs-Channels auf. Zum Beispiel interagieren Nutzer:innen durch den Austausch kryptografisch signierter Nachrichten (Transaktionen), die auch von den übrigen Channel-Teilnehmenden signiert werden müssen. Wird eine vorgeschlagene Zustandsaktualisierung nicht von allen Teilnehmenden signiert, gilt sie als ungültig.

Im Unterschied zu Zahlungs-Channels verwaltet ein Zustands-Channel jedoch nicht nur die Guthaben der Nutzer:innen, sondern führt zudem den aktuellen Zustand des Contract-Speichers (d. h. die Werte der Contract-Variablen) fortlaufend mit.

Dadurch wird es möglich, einen Smart Contract außerhalb der Blockchain (offchain) zwischen zwei Nutzer:innen auszuführen. In diesem Szenario bedürfen Aktualisierungen des internen Zustands des Smart Contracts lediglich der Zustimmung derjenigen Peers, die den Channel eingerichtet haben.

Obwohl dies das zuvor beschriebene Skalierbarkeitsproblem löst, hat es Auswirkungen auf die Sicherheit. Auf Ethereum wird die Gültigkeit von Zustandsübergängen durch das Konsensprotokoll des Netzwerks sichergestellt. Dadurch ist es unmöglich, ungültige Zustandsaktualisierungen für einen Smart Contract vorzuschlagen oder dessen Ausführung zu manipulieren.

Zustands-Channels bieten nicht dieselben Sicherheitsgarantien. Ein Zustands-Channel stellt gewissermaßen eine Miniaturversion des Mainnets dar. Da nur eine begrenzte Anzahl von Teilnehmenden die Regeln durchsetzt, steigt die Wahrscheinlichkeit böswilligen Verhaltens (z. B. das Vorschlagen ungültiger Zustandsaktualisierungen). Die Sicherheit von Zustands-Channels beruht auf einem Streitschlichtungssystem, das auf [Betrugsnachweisen](/glossary/#fraud-proof) basiert.

## Wie Zustands-Channels funktionieren {#how-state-channels-work}

Im Grunde ist die Aktivität in einem Zustands-Channel eine Sitzung von Interaktionen zwischen Benutzern und einem Blockchain-System. Nutzer:innen kommunizieren überwiegend außerhalb der Blockchain (offchain) miteinander und interagieren mit der zugrundeliegenden Blockchain lediglich zum Öffnen oder Schließen des Channels sowie zur Beilegung allfälliger Streitigkeiten zwischen den Teilnehmenden.

Der folgende Abschnitt beschreibt den grundlegenden Arbeitsablauf eines Zustands-Channels:

### Öffnen des Channels {#opening-the-channel}

Das Öffnen eines Channels erfordert, dass die Teilnehmer Mittel in einen Smart Contract im Mainnet einbringen. Die Einlage fungiert auch als virtueller Deckel, so dass die teilnehmenden Akteure frei Transaktionen durchführen können, ohne Zahlungen sofort abwickeln zu müssen. Erst wenn der Channel onchain finalisiert ist, rechnen die Parteien untereinander ab und heben den Rest ihres Deckels ab.

Diese Einlage dient auch als Sicherheit, um ehrliches Verhalten von jedem Teilnehmer zu garantieren. Wenn Einleger während der Streitbeilegungsphase bösartiger Handlungen für schuldig befunden werden, wird ihre Einlage durch den Vertrag gekürzt (Slashing).

Die Channel-Peers müssen einen Anfangszustand unterzeichnen, dem sie alle zustimmen. Dies dient als Genesis des Zustands-Channels, nach der die Benutzer mit Transaktionen beginnen können.

### Nutzung des Channels {#using-the-channel}

Nach der Initialisierung des Zustands des Channels interagieren die Peers, indem sie Transaktionen unterzeichnen und sie sich zur Genehmigung gegenseitig zusenden. Die Teilnehmer initiieren mit diesen Transaktionen Zustandsaktualisierungen und unterzeichnen Zustandsaktualisierungen von anderen. Jede Transaktion umfasst Folgendes:

- Eine **Nonce**, die als eindeutige ID für Transaktionen dient und Replay-Angriffe verhindert. Sie identifiziert auch die Reihenfolge, in der Zustandsaktualisierungen stattgefunden haben (was für die Streitbeilegung wichtig ist).

- Der alte Zustand des Channels

- Der neue Zustand des Channels

- Die Transaktion, die den Zustandsübergang auslöst (z. B. sendet Alice 5 ETH an Bob).

Zustandsaktualisierungen im Channel werden nicht onchain übertragen, wie es normalerweise der Fall ist, wenn Benutzer im Mainnet interagieren, was mit dem Ziel von Zustands-Channels übereinstimmt, den Onchain-Fußabdruck zu minimieren. Solange sich die Teilnehmer über Zustandsaktualisierungen einig sind, sind diese so endgültig wie eine Ethereum-Transaktion. Die Teilnehmer müssen sich nur auf den Konsens des Mainnets verlassen, wenn es zu einem Streitfall kommt.

### Schließen des Channels {#closing-the-channel}

Das Schließen eines Zustands-Channels erfordert die Übermittlung des endgültigen, vereinbarten Zustands des Channels an den Onchain-Smart-Contract. Zu den in der Zustandsaktualisierung referenzierten Details gehören die Anzahl der Züge jedes Teilnehmers und eine Liste der genehmigten Transaktionen.

Nach der Überprüfung, dass die Zustandsaktualisierung gültig ist (d. h. von allen Parteien unterzeichnet wurde), finalisiert der Smart Contract den Channel und verteilt die gesperrten Gelder entsprechend dem Ergebnis des Channels. Offchain getätigte Zahlungen werden auf den Zustand von Ethereum angewendet und jeder Teilnehmer erhält seinen verbleibenden Anteil der gesperrten Gelder.

Das oben beschriebene Szenario stellt dar, was im Idealfall („Happy Case“) passiert. Manchmal können Benutzer keine Einigung erzielen und den Channel nicht finalisieren (der „Sad Case“). Jeder der folgenden Punkte könnte auf die Situation zutreffen:

- Teilnehmer gehen offline und schlagen keine Zustandsübergänge vor

- Teilnehmer weigern sich, gültige Zustandsaktualisierungen mitzuzeichnen

- Teilnehmer versuchen, den Channel zu finalisieren, indem sie eine alte Zustandsaktualisierung an den Onchain-Vertrag vorschlagen

- Teilnehmer schlagen ungültige Zustandsübergänge zur Unterzeichnung durch andere vor

Immer wenn der Konsens zwischen den teilnehmenden Akteuren in einem Channel zusammenbricht, ist die letzte Option, sich auf den Konsens des Mainnets zu verlassen, um den endgültigen, gültigen Zustand des Channels durchzusetzen. In diesem Fall erfordert das Schließen des Zustands-Channels die Beilegung von Streitigkeiten onchain.

### Beilegung von Streitigkeiten {#settling-disputes}

Normalerweise einigen sich die Parteien in einem Channel im Voraus auf die Schließung des Channels und unterzeichnen gemeinsam den letzten Zustandsübergang, den sie an den Smart Contract übermitteln. Sobald die Aktualisierung onchain genehmigt ist, endet die Ausführung des Offchain-Smart-Contracts und die Teilnehmer verlassen den Channel mit ihrem Geld.

Jedoch kann eine Partei eine Onchain-Anfrage stellen, um die Ausführung des Smart Contracts zu beenden und den Channel zu finalisieren – ohne auf die Zustimmung ihres Gegenübers zu warten. Wenn eine der zuvor beschriebenen Situationen eintritt, die den Konsens brechen, kann jede Partei den Onchain-Vertrag auslösen, um den Channel zu schließen und Gelder zu verteilen. Dies sorgt für **Vertrauenslosigkeit** (Trustlessness) und stellt sicher, dass ehrliche Parteien ihre Einlagen jederzeit abziehen können, unabhängig von den Handlungen der anderen Partei.

Um den Austritt aus dem Channel zu verarbeiten, muss der Benutzer die letzte gültige Zustandsaktualisierung der Anwendung an den Onchain-Vertrag übermitteln. Wenn dies bestätigt wird (d. h. es trägt die Unterschrift aller Parteien), werden die Gelder zu ihren Gunsten umverteilt.

Es gibt jedoch eine Verzögerung bei der Ausführung von Austrittsanfragen einzelner Benutzer. Wenn der Antrag auf Abschluss des Channels einstimmig genehmigt wurde, wird die Onchain-Austrittstransaktion sofort ausgeführt.

Die Verzögerung kommt bei Austritten einzelner Benutzer aufgrund der Möglichkeit betrügerischer Handlungen ins Spiel. Zum Beispiel könnte ein Channel-Teilnehmer versuchen, den Channel auf Ethereum zu finalisieren, indem er eine ältere Zustandsaktualisierung onchain einreicht.

Als Gegenmaßnahme ermöglichen Zustands-Channels ehrlichen Benutzern, ungültige Zustandsaktualisierungen anzufechten, indem sie den neuesten, gültigen Zustand des Channels onchain einreichen. Zustands-Channels sind so konzipiert, dass neuere, vereinbarte Zustandsaktualisierungen ältere Zustandsaktualisierungen übertrumpfen.

Sobald ein Peer das Onchain-Streitbeilegungssystem auslöst, muss die andere Partei innerhalb einer Frist (dem sogenannten „Challenge Window“) antworten. Dies ermöglicht es Benutzern, die Austrittstransaktion anzufechten, insbesondere wenn die andere Partei eine veraltete Aktualisierung anwendet.

Wie auch immer der Fall sein mag, Channel-Benutzer haben immer starke Finalitätsgarantien: Wenn der in ihrem Besitz befindliche Zustandsübergang von allen Mitgliedern unterzeichnet wurde und die jüngste Aktualisierung ist, dann hat er die gleiche Finalität wie eine reguläre Onchain-Transaktion. Sie müssen die andere Partei zwar immer noch onchain anfechten, aber das einzig mögliche Ergebnis ist die Finalisierung des letzten gültigen Zustands, den sie besitzen.

### Wie interagieren Zustands-Channels mit Ethereum? {#how-do-state-channels-interact-with-ethereum}

Obwohl sie als Offchain-Protokolle existieren, haben Zustands-Channels eine Onchain-Komponente: den Smart Contract, der beim Öffnen des Channels auf Ethereum bereitgestellt wird. Dieser Vertrag kontrolliert die in den Channel eingezahlten Vermögenswerte, überprüft Zustandsaktualisierungen und schlichtet Streitigkeiten zwischen den Teilnehmern.

Zustands-Channels veröffentlichen keine Transaktionsdaten oder Zustands-Commitments im Mainnet, im Gegensatz zu [Layer-2](/layer-2/)-Skalierungslösungen. Sie sind jedoch stärker mit dem Mainnet verbunden als beispielsweise [Sidechains](/developers/docs/scaling/sidechains/), was sie etwas sicherer macht.

Zustands-Channels stützen sich für die folgenden Punkte auf das Ethereum-Hauptprotokoll:

#### 1. Liveness {#liveness}

Der Onchain-Vertrag, der beim Öffnen des Channels bereitgestellt wird, ist für die Funktionalität des Channels verantwortlich. Wenn der Vertrag auf Ethereum läuft, ist der Channel immer zur Nutzung verfügbar. Umgekehrt kann eine Sidechain immer ausfallen, selbst wenn das Mainnet betriebsbereit ist, was die Gelder der Benutzer gefährdet.

#### 2. Sicherheit {#security}

Bis zu einem gewissen Grad stützen sich Zustands-Channels auf Ethereum, um Sicherheit zu bieten und Benutzer vor bösartigen Peers zu schützen. Wie in späteren Abschnitten erörtert, verwenden Channels einen Betrugsnachweis-Mechanismus, der es Benutzern ermöglicht, Versuche, den Channel mit einer ungültigen oder veralteten Aktualisierung zu finalisieren, anzufechten.

In diesem Fall legt die ehrliche Partei den neuesten gültigen Zustand des Channels als Betrugsnachweis dem Onchain-Vertrag zur Überprüfung vor. Betrugsnachweise ermöglichen es sich gegenseitig misstrauenden Parteien, Offchain-Transaktionen durchzuführen, ohne dabei ihre Gelder zu riskieren.

#### 3. Endgültigkeit {#finality}

Zustandsaktualisierungen, die von Channel-Benutzern gemeinsam unterzeichnet werden, gelten als so gut wie Onchain-Transaktionen. Dennoch erreicht jede Aktivität innerhalb des Channels erst dann echte Finalität, wenn der Channel auf Ethereum geschlossen wird.

Im optimistischen Fall können beide Parteien kooperieren, die endgültige Zustandsaktualisierung unterzeichnen und onchain einreichen, um den Channel zu schließen, woraufhin die Gelder entsprechend dem endgültigen Zustand des Channels verteilt werden. Im pessimistischen Fall, in dem jemand versucht zu betrügen, indem er eine falsche Zustandsaktualisierung onchain postet, wird seine Transaktion erst nach Ablauf des „Challenge Window“ finalisiert.

## Virtuelle Zustands-Channels {#virtual-state-channels}

Die naive Implementierung eines Zustands-Channels wäre, einen neuen Vertrag bereitzustellen, wenn zwei Benutzer eine Anwendung offchain ausführen möchten. Dies ist nicht nur undurchführbar, sondern hebt auch die Kosteneffizienz von Zustands-Channels auf (Onchain-Transaktionskosten können sich schnell summieren).

Um dieses Problem zu lösen, wurden „virtuelle Channels“ geschaffen. Im Gegensatz zu regulären Channels, die Onchain-Transaktionen zum Öffnen und Schließen erfordern, kann ein virtueller Channel geöffnet, ausgeführt und finalisiert werden, ohne mit der Hauptkette zu interagieren. Mit dieser Methode ist es sogar möglich, Streitigkeiten offchain beizulegen.

Dieses System beruht auf der Existenz sogenannter „Ledger-Channels“, die onchain finanziert wurden. Virtuelle Channels zwischen zwei Parteien können auf einem bestehenden Ledger-Channel aufgebaut werden, wobei der/die Eigentümer des Ledger-Channels als Vermittler dienen.

Benutzer in jedem virtuellen Channel interagieren über eine neue Vertragsinstanz, wobei der Ledger-Channel mehrere Vertragsinstanzen unterstützen kann. Der Zustand des Ledger-Channels enthält auch mehr als einen Vertragsspeicherzustand, was die parallele Ausführung von Anwendungen offchain zwischen verschiedenen Benutzern ermöglicht.

Genau wie bei regulären Channels tauschen die Benutzer Zustandsaktualisierungen aus, um die Zustandsmaschine voranzubringen. Sofern kein Streitfall auftritt, muss der Vermittler nur beim Öffnen oder Schließen des Channels kontaktiert werden.

### Virtuelle Zahlungs-Channels {#virtual-payment-channels}

Virtuelle Zahlungs-Channels funktionieren nach der gleichen Idee wie virtuelle Zustands-Channels: Teilnehmer, die mit demselben Netzwerk verbunden sind, können Nachrichten weiterleiten, ohne einen neuen Channel onchain öffnen zu müssen. In virtuellen Zahlungs-Channels werden Wertübertragungen über einen oder mehrere Vermittler geleitet, mit der Garantie, dass nur der beabsichtigte Empfänger die überwiesenen Gelder erhalten kann.

## Anwendungen von Zustands-Channels {#applications-of-state-channels}

### Zahlungen {#payments}

Frühe Blockchain-Channels waren einfache Protokolle, die es zwei Teilnehmern ermöglichten, schnelle, kostengünstige Übertragungen offchain durchzuführen, ohne hohe Transaktionsgebühren im Mainnet zahlen zu müssen. Heute sind Zahlungs-Channels immer noch nützlich für Anwendungen, die für den Austausch und die Einzahlung von Ether und Token konzipiert sind.

Channel-basierte Zahlungen haben die folgenden Vorteile:

1. **Durchsatz**: Die Menge an Offchain-Transaktionen pro Channel ist nicht mit dem Durchsatz von Ethereum verbunden, der von verschiedenen Faktoren beeinflusst wird, insbesondere von der Blockgröße und der Blockzeit. Durch die Ausführung von Transaktionen offchain können Blockchain-Channels einen höheren Durchsatz erzielen.

2. **Datenschutz**: Da Channels offchain existieren, werden Details der Interaktionen zwischen den Teilnehmern nicht auf der öffentlichen Blockchain von Ethereum aufgezeichnet. Channel-Benutzer müssen nur beim Finanzieren und Schließen von Channels oder bei der Beilegung von Streitigkeiten onchain interagieren. Daher sind Channels für Personen nützlich, die privatere Transaktionen wünschen.

3. **Latenz**: Offchain-Transaktionen, die zwischen Channel-Teilnehmern durchgeführt werden, können sofort abgewickelt werden, wenn beide Parteien kooperieren, was Verzögerungen reduziert. Im Gegensatz dazu erfordert das Senden einer Transaktion im Mainnet das Warten darauf, dass Knoten die Transaktion verarbeiten, einen neuen Block mit der Transaktion erstellen und einen Konsens erzielen. Benutzer müssen möglicherweise auch auf weitere Block-Bestätigungen warten, bevor sie eine Transaktion als finalisiert betrachten.

4. **Kosten**: Zustands-Channels sind besonders nützlich in Situationen, in denen eine Gruppe von Teilnehmern über einen langen Zeitraum viele Zustandsaktualisierungen austauschen wird. Die einzigen anfallenden Kosten sind das Öffnen und Schließen des Smart Contracts des Zustands-Channels; jede Zustandsänderung zwischen dem Öffnen und Schließen des Channels wird billiger als die letzte, da die Abwicklungskosten entsprechend verteilt werden.

Die Implementierung von Zustands-Channels auf Layer-2-Lösungen wie [Rollups](/developers/docs/scaling/#rollups) könnte sie für Zahlungen noch attraktiver machen. Obwohl Channels günstige Zahlungen ermöglichen, können die Kosten für die Einrichtung des Onchain-Vertrags im Mainnet während der Eröffnungsphase teuer werden – besonders wenn die Gasgebühren in die Höhe schnellen. Auf Ethereum basierende Rollups bieten [niedrigere Transaktionsgebühren](https://l2fees.info/) und können den Overhead für Channel-Teilnehmer reduzieren, indem sie die Einrichtungsgebühren senken.

### Mikrotransaktionen {#microtransactions}

Mikrotransaktionen sind Zahlungen mit geringem Wert (z. B. weniger als ein Bruchteil eines Dollars), die Unternehmen nicht ohne Verluste abwickeln können. Diese Unternehmen müssen Zahlungsdienstleister bezahlen, was sie nicht können, wenn die Marge bei Kundenzahlungen zu gering ist, um einen Gewinn zu erzielen.

Zahlungskanäle lösen dieses Problem, indem sie den mit Mikrotransaktionen verbundenen Overhead reduzieren. Zum Beispiel kann ein Internetdienstanbieter (ISP) einen Zahlungskanal mit einem Kunden eröffnen, der es ermöglicht, bei jeder Nutzung des Dienstes kleine Zahlungen zu streamen.

Abgesehen von den Kosten für das Öffnen und Schließen des Kanals entstehen den Teilnehmern keine weiteren Kosten für Mikrotransaktionen (keine Gasgebühren). Dies ist eine Win-Win-Situation, da Kunden mehr Flexibilität bei der Höhe ihrer Zahlungen für Dienstleistungen haben und Unternehmen bei profitablen Mikrotransaktionen keine Einbußen erleiden.

### Dezentralisierte Anwendungen {#decentralized-applications}

Ähnlich wie Zahlungskanäle können Zustandskanäle (State Channels) bedingte Zahlungen gemäß den Endzuständen der Zustandsmaschine durchführen. Zustandskanäle können auch beliebige Zustandsübergangslogik unterstützen, was sie für die Ausführung generischer Anwendungen Off-Chain nützlich macht.

Zustandskanäle sind oft auf einfache rundenbasierte Anwendungen beschränkt, da dies die Verwaltung der an den On-Chain-Vertrag gebundenen Mittel erleichtert. Außerdem ist es bei einer begrenzten Anzahl von Parteien, die den Zustand der Off-Chain-Anwendung in Abständen aktualisieren, relativ einfach, unehrliches Verhalten zu bestrafen.

Die Effizienz einer Zustandskanal-Anwendung hängt auch von ihrem Design ab. Zum Beispiel könnte ein Entwickler den App-Kanalvertrag einmal On-Chain bereitstellen und anderen Spielern ermöglichen, die App wiederzuverwenden, ohne On-Chain gehen zu müssen. In diesem Fall dient der ursprüngliche App-Kanal als Hauptkanal (Ledger Channel), der mehrere virtuelle Kanäle unterstützt, von denen jeder eine neue Instanz des Smart Contracts der App Off-Chain ausführt.

Ein möglicher Anwendungsfall für Zustandskanal-Anwendungen sind einfache Zweispieler-Spiele, bei denen Mittel basierend auf dem Spielergebnis verteilt werden. Der Vorteil hierbei ist, dass Spieler sich nicht gegenseitig vertrauen müssen (Vertrauenslosigkeit) und der On-Chain-Vertrag, nicht die Spieler, die Zuteilung der Mittel und die Beilegung von Streitigkeiten kontrolliert (Dezentralisierung).

Weitere mögliche Anwendungsfälle für Zustandskanal-Apps umfassen ENS-Namenseigentum, NFT-Ledger und viele mehr.

### Atomare Transfers {#atomic-transfers}

Frühe Zahlungskanäle waren auf Transfers zwischen zwei Parteien beschränkt, was ihre Nutzbarkeit einschränkte. Die Einführung virtueller Kanäle ermöglichte es jedoch Einzelpersonen, Transfers über Zwischenstellen (d. h. mehrere P2P-Kanäle) weiterzuleiten, ohne einen neuen Kanal On-Chain eröffnen zu müssen.

Häufig als „Multi-Hop-Transfers“ beschrieben, sind geroutete Zahlungen atomar (d. h., entweder gelingen alle Teile der Transaktion oder sie scheitert insgesamt). Atomare Transfers verwenden [Hash-Zeitsperren-Verträge (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts), um sicherzustellen, dass die Zahlung nur freigegeben wird, wenn bestimmte Bedingungen erfüllt sind, wodurch das Kontrahentenrisiko verringert wird.

## Nachteile der Verwendung von Zustands-Channels {#drawbacks-of-state-channels}

### Liveness-Annahmen {#liveness-assumptions}

Um die Effizienz zu gewährleisten, setzen Zustands-Channels Zeitlimits für die Fähigkeit der Channel-Teilnehmer, auf Streitigkeiten zu reagieren. Diese Regel geht davon aus, dass die Peers immer online sein werden, um die Channel-Aktivität zu überwachen und bei Bedarf Anfechtungen zu bestreiten.

In der Realität können Benutzer aus Gründen, die außerhalb ihrer Kontrolle liegen (z. B. schlechte Internetverbindung, mechanischer Defekt usw.), offline gehen. Wenn ein ehrlicher Benutzer offline geht, kann ein bösartiger Peer die Situation ausnutzen, indem er dem Schiedsrichtervertrag alte Zwischenzustände vorlegt und die zugesagten Gelder stiehlt.

Einige Channels verwenden „Watchtowers“ – Entitäten, die dafür verantwortlich sind, Onchain-Streitigkeiten im Namen anderer zu beobachten und die notwendigen Maßnahmen zu ergreifen, wie z. B. die Benachrichtigung der betroffenen Parteien. Dies kann jedoch die Kosten für die Nutzung eines Zustands-Channels erhöhen.

### Datenunverfügbarkeit {#data-unavailability}

Wie bereits erläutert, erfordert die Anfechtung einer ungültigen Streitigkeit die Vorlage des neuesten, gültigen Zustands des Zustands-Channels. Dies ist eine weitere Regel, die auf einer Annahme beruht – dass Benutzer Zugriff auf den neuesten Zustand des Channels haben.

Obwohl es vernünftig ist, von den Channel-Benutzern zu erwarten, dass sie Kopien des Offchain-Anwendungszustands speichern, können diese Daten aufgrund von Fehlern oder mechanischen Ausfällen verloren gehen. Wenn der Benutzer die Daten nicht gesichert hat, kann er nur hoffen, dass die andere Partei keine ungültige Austrittsanfrage mit alten Zustandsübergängen in ihrem Besitz finalisiert.

Ethereum-Benutzer müssen sich nicht mit diesem Problem befassen, da das Netzwerk Regeln zur Datenverfügbarkeit durchsetzt. Transaktionsdaten werden von allen Knoten gespeichert und verbreitet und stehen den Benutzern bei Bedarf zum Herunterladen zur Verfügung.

### Liquiditätsprobleme {#liquidity-issues}

Um einen Blockchain-Channel einzurichten, müssen die Teilnehmer für die Lebensdauer des Channels Gelder in einem Onchain-Smart-Contract sperren. Dies reduziert die Liquidität der Channel-Benutzer und beschränkt Channels auch auf diejenigen, die es sich leisten können, Gelder im Mainnet gesperrt zu halten.

Jedoch können Ledger-Channels – betrieben von einem Offchain-Dienstanbieter (OSP) – Liquiditätsprobleme für Benutzer reduzieren. Zwei Peers, die mit einem Ledger-Channel verbunden sind, können einen virtuellen Channel erstellen, den sie jederzeit vollständig offchain öffnen und finalisieren können.

Offchain-Dienstanbieter könnten auch Channels mit mehreren Peers eröffnen, was sie für die Weiterleitung von Zahlungen nützlich macht. Natürlich müssen Benutzer Gebühren an OSPs für ihre Dienste zahlen, was für einige unerwünscht sein kann.

### Griefing-Angriffe {#griefing-attacks}

Griefing-Angriffe sind ein häufiges Merkmal von auf Betrugsnachweisen basierenden Systemen. Ein Griefing-Angriff nützt dem Angreifer nicht direkt, sondern fügt dem Opfer Leid (d. h. Schaden) zu, daher der Name.

Betrugsnachweise sind anfällig für Griefing-Angriffe, da die ehrliche Partei auf jede Streitigkeit, auch auf ungültige, reagieren muss, sonst riskiert sie, ihre Gelder zu verlieren. Ein bösartiger Teilnehmer kann sich entscheiden, wiederholt veraltete Zustandsübergänge onchain zu posten, was die ehrliche Partei zwingt, mit dem gültigen Zustand zu antworten. Die Kosten für diese Onchain-Transaktionen können sich schnell summieren, was dazu führt, dass ehrliche Parteien dabei Verluste erleiden.

### Vordefinierte Teilnehmergruppen {#predefined-participant-sets}

Konstruktionsbedingt bleibt die Anzahl der Teilnehmer, die einen Zustands-Channel bilden, während seiner gesamten Lebensdauer fest. Dies liegt daran, dass eine Aktualisierung der Teilnehmergruppe den Betrieb des Kanals, insbesondere bei der Finanzierung des Kanals oder der Beilegung von Streitigkeiten, komplizieren würde. Das Hinzufügen oder Entfernen von Teilnehmern würde auch zusätzliche Onchain-Aktivitäten erfordern, was den Aufwand für die Benutzer erhöht.

Obwohl dies Zustands-Channels leichter verständlich macht, schränkt es die Nützlichkeit von Channel-Designs für Anwendungsentwickler ein. Dies erklärt zum Teil, warum Zustands-Channels zugunsten anderer Skalierungslösungen wie Rollups aufgegeben wurden.

### Parallele Transaktionsverarbeitung {#parallel-transaction-processing}

Die Teilnehmer im Zustands-Channel senden abwechselnd Zustandsaktualisierungen, weshalb sie am besten für „rundenbasierte Anwendungen“ (z. B. ein Zwei-Spieler-Schachspiel) geeignet sind. Dies eliminiert die Notwendigkeit, gleichzeitige Zustandsaktualisierungen zu handhaben und reduziert die Arbeit, die der Onchain-Vertrag leisten muss, um Poster von veralteten Aktualisierungen zu bestrafen. Ein Nebeneffekt dieses Designs ist jedoch, dass Transaktionen voneinander abhängig sind, was die Latenz erhöht und die allgemeine Benutzererfahrung beeinträchtigt.

Einige Zustands-Channels lösen dieses Problem, indem sie ein „Vollduplex“-Design verwenden, das den Offchain-Zustand in zwei unidirektionale „Simplex“-Zustände aufteilt und so gleichzeitige Zustandsaktualisierungen ermöglicht. Solche Designs verbessern den Offchain-Durchsatz und verringern Transaktionsverzögerungen.

## Zustands-Channels verwenden {#use-state-channels}

Mehrere Projekte bieten Implementierungen von Zustandskanälen, die Sie in Ihre dApps integrieren können:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Weiterführende Lektüre {#further-reading}

**Statuskanäle**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12. Februar 2018_
- [State Channels – eine Erklärung](https://www.jeffcoleman.ca/state-channels/) _6. Nov. 2015 – Jeff Coleman_
- [Grundlagen von State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Blockchain State Channels: Ein Stand der Technik](https://ieeexplore.ieee.org/document/9627997)

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
