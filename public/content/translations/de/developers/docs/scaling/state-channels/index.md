---
title: State Channels
description: "Eine Einführung in State Channels und Payment Channels als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
sidebarDepth: 3
---

State Channels ermöglichen es den Teilnehmern, sicher Off-Chain zu transagieren, während die Interaktion mit dem [Ethereum](/)-Mainnet auf ein Minimum beschränkt bleibt. Kanal-Peers können eine beliebige Anzahl von Off-Chain-Transaktionen durchführen, während sie nur zwei Transaktionen auf der Blockchain einreichen, um den Kanal zu öffnen und zu schließen. Dies ermöglicht einen extrem hohen Transaktionsdurchsatz und führt zu geringeren Kosten für die Nutzer.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zur [Ethereum-Skalierung](/developers/docs/scaling/) und zu [Ebene 2](/layer-2/) gelesen und verstanden haben.

## Was sind Kanäle? {#what-are-channels}

Öffentliche Blockchains wie Ethereum stehen aufgrund ihrer verteilten Architektur vor Skalierbarkeitsherausforderungen: Transaktionen auf der Blockchain müssen von allen Blockchain-Knoten ausgeführt werden. Blockchain-Knoten müssen in der Lage sein, das Transaktionsvolumen in einem Block mit bescheidener Hardware zu bewältigen, was dem Transaktionsdurchsatz eine Grenze setzt, um das Netzwerk dezentralisiert zu halten. Blockchain-Kanäle lösen dieses Problem, indem sie es den Nutzern ermöglichen, Off-Chain zu interagieren, während sie sich für die endgültige Abwicklung weiterhin auf die Sicherheit der Hauptkette verlassen.

Kanäle sind einfache Peer-to-Peer-Protokolle, die es zwei Parteien ermöglichen, viele Transaktionen untereinander durchzuführen und dann nur die Endergebnisse auf der Blockchain zu veröffentlichen. Der Kanal verwendet Kryptografie, um zu beweisen, dass die von ihnen generierten Zusammenfassungsdaten tatsächlich das Ergebnis einer gültigen Menge von Zwischentransaktionen sind. Ein ["Mehrfachsignatur"](/developers/docs/smart-contracts/#multisig)-Smart Contract stellt sicher, dass die Transaktionen von den richtigen Parteien signiert werden.

Mit Kanälen werden Zustandsänderungen von interessierten Parteien ausgeführt und validiert, was die Berechnungen auf der Ausführungsebene von Ethereum minimiert. Dies verringert die Überlastung auf Ethereum und erhöht zudem die Transaktionsverarbeitungsgeschwindigkeiten für die Nutzer.

Jeder Kanal wird von einem [Mehrfachsignatur-Smart Contract](/developers/docs/smart-contracts/#multisig) verwaltet, der auf Ethereum läuft. Um einen Kanal zu öffnen, stellen die Teilnehmer den Kanalvertrag auf der Blockchain bereit und zahlen Gelder in diesen ein. Beide Parteien signieren gemeinsam eine Zustandsaktualisierung, um den Zustand des Kanals zu initialisieren, wonach sie schnell und frei Off-Chain transagieren können.

Um den Kanal zu schließen, reichen die Teilnehmer den zuletzt vereinbarten Zustand des Kanals auf der Blockchain ein. Anschließend verteilt der Smart Contract die gesperrten Gelder entsprechend dem Guthaben jedes Teilnehmers im Endzustand des Kanals.

Peer-to-Peer-Kanäle sind besonders nützlich für Situationen, in denen einige vordefinierte Teilnehmer mit hoher Frequenz transagieren möchten, ohne dass ein sichtbarer Mehraufwand entsteht. Blockchain-Kanäle fallen in zwei Kategorien: **Payment Channels** und **State Channels**.

## Payment Channels {#payment-channels}

Ein Payment Channel lässt sich am besten als ein „Zwei-Wege-Ledger“ beschreiben, der von zwei Nutzern gemeinsam geführt wird. Das anfängliche Guthaben des Ledgers ist die Summe der Einlagen, die während der Kanaleröffnungsphase im Vertrag auf der Blockchain gesperrt wurden. Transfers über Payment Channels können sofort und ohne Beteiligung der eigentlichen Blockchain selbst durchgeführt werden, mit Ausnahme einer anfänglichen einmaligen Erstellung auf der Blockchain und einer eventuellen Schließung des Kanals.

Aktualisierungen des Ledger-Guthabens (d. h. des Zustands des Payment Channels) erfordern die Zustimmung aller Parteien im Kanal. Eine Kanalaktualisierung, die von allen Kanalteilnehmern signiert wurde, gilt als abgeschlossen, ähnlich wie eine Transaktion auf Ethereum.

Payment Channels gehörten zu den frühesten Skalierungslösungen, die entwickelt wurden, um teure Aktivitäten auf der Blockchain bei einfachen Nutzerinteraktionen (z. B. ETH-Transfers, Atomic Swaps, Mikrozahlungen) zu minimieren. Kanalteilnehmer können eine unbegrenzte Anzahl von sofortigen, gebührenfreien Transaktionen untereinander durchführen, solange die Nettosumme ihrer Transfers die eingezahlten Token nicht übersteigt.

## State Channels {#state-channels}

Abgesehen von der Unterstützung von Off-Chain-Zahlungen haben sich Payment Channels nicht als nützlich für die Handhabung allgemeiner Zustandsübergangslogik erwiesen. State Channels wurden geschaffen, um dieses Problem zu lösen und Kanäle für die Skalierung von Allzweckberechnungen nutzbar zu machen.

State Channels haben immer noch viel mit Payment Channels gemeinsam. Zum Beispiel interagieren Nutzer, indem sie kryptografisch signierte Nachrichten (Transaktionen) austauschen, die die anderen Kanalteilnehmer ebenfalls signieren müssen. Wenn eine vorgeschlagene Zustandsaktualisierung nicht von allen Teilnehmern signiert wird, gilt sie als ungültig.

Zusätzlich zur Speicherung der Nutzerguthaben verfolgt der Kanal jedoch auch den aktuellen Zustand des Vertragsspeichers (d. h. die Werte der Vertragsvariablen).

Dies macht es möglich, einen Smart Contract Off-Chain zwischen zwei Nutzern auszuführen. In diesem Szenario erfordern Aktualisierungen des internen Zustands des Smart Contracts nur die Zustimmung der Peers, die den Kanal erstellt haben.

Während dies das zuvor beschriebene Skalierbarkeitsproblem löst, hat es Auswirkungen auf die Sicherheit. Auf Ethereum wird die Gültigkeit von Zustandsübergängen durch das Konsensprotokoll des Netzwerks durchgesetzt. Dies macht es unmöglich, eine ungültige Aktualisierung des Zustands eines Smart Contracts vorzuschlagen oder die Ausführung des Smart Contracts zu ändern.

State Channels haben nicht die gleichen Sicherheitsgarantien. Bis zu einem gewissen Grad ist ein State Channel eine Miniaturversion des Mainnets. Da nur eine begrenzte Anzahl von Teilnehmern die Regeln durchsetzt, steigt die Wahrscheinlichkeit von böswilligem Verhalten (z. B. das Vorschlagen ungültiger Zustandsaktualisierungen). State Channels beziehen ihre Sicherheit aus einem Streitschlichtungssystem, das auf [Betrugsnachweisen](/glossary/#fraud-proof) basiert.

## Wie State Channels funktionieren {#how-state-channels-work}

Grundsätzlich ist die Aktivität in einem State Channel eine Sitzung von Interaktionen, an der Nutzer und ein Blockchain-System beteiligt sind. Die Nutzer kommunizieren meist Off-Chain miteinander und interagieren nur mit der zugrunde liegenden Blockchain, um den Kanal zu öffnen, den Kanal zu schließen oder mögliche Streitigkeiten zwischen den Teilnehmern beizulegen.

Der folgende Abschnitt skizziert den grundlegenden Arbeitsablauf eines State Channels:

### Öffnen des Kanals {#opening-the-channel}

Das Öffnen eines Kanals erfordert, dass die Teilnehmer Gelder in einen Smart Contract im Mainnet einzahlen. Die Einzahlung fungiert auch als virtueller Deckel, sodass die teilnehmenden Akteure frei transagieren können, ohne Zahlungen sofort begleichen zu müssen. Erst wenn der Kanal auf der Blockchain finalisiert wird, rechnen die Parteien miteinander ab und heben ab, was von ihrem Deckel übrig ist.

Diese Einzahlung dient auch als Kaution, um ehrliches Verhalten jedes Teilnehmers zu garantieren. Wenn Einleger während der Streitschlichtungsphase böswilliger Handlungen für schuldig befunden werden, führt der Vertrag ein Slashing ihrer Einzahlung durch.

Kanal-Peers müssen einen Anfangszustand signieren, auf den sie sich alle einigen. Dies dient als Genesis des State Channels, wonach die Nutzer mit dem Transagieren beginnen können.

### Nutzung des Kanals {#using-the-channel}

Nach der Initialisierung des Kanalzustands interagieren die Peers, indem sie Transaktionen signieren und sie sich gegenseitig zur Genehmigung senden. Die Teilnehmer initiieren mit diesen Transaktionen Zustandsaktualisierungen und signieren Zustandsaktualisierungen von anderen. Jede Transaktion umfasst Folgendes:

- Eine **Nonce**, die als eindeutige ID für Transaktionen fungiert und Replay-Angriffe verhindert. Sie identifiziert auch die Reihenfolge, in der Zustandsaktualisierungen aufgetreten sind (was für die Streitschlichtung wichtig ist)

- Den alten Zustand des Kanals

- Den neuen Zustand des Kanals

- Die Transaktion, die den Zustandsübergang auslöst (z. B. Alice sendet 5 ETH an Bob)

Zustandsaktualisierungen im Kanal werden nicht auf der Blockchain übertragen, wie es normalerweise der Fall ist, wenn Nutzer im Mainnet interagieren, was mit dem Ziel von State Channels übereinstimmt, den Fußabdruck auf der Blockchain zu minimieren. Solange sich die Teilnehmer auf Zustandsaktualisierungen einigen, sind diese so endgültig wie eine Ethereum-Transaktion. Die Teilnehmer müssen sich nur dann auf den Konsens des Mainnets verlassen, wenn ein Streitfall auftritt.

### Schließen des Kanals {#closing-the-channel}

Das Schließen eines State Channels erfordert die Übermittlung des endgültigen, vereinbarten Zustands des Kanals an den Smart Contract auf der Blockchain. Zu den in der Zustandsaktualisierung referenzierten Details gehören die Anzahl der Züge jedes Teilnehmers und eine Liste der genehmigten Transaktionen.

Nach der Überprüfung, ob die Zustandsaktualisierung gültig ist (d. h. sie ist von allen Parteien signiert), finalisiert der Smart Contract den Kanal und verteilt die gesperrten Gelder entsprechend dem Ergebnis des Kanals. Off-Chain getätigte Zahlungen werden auf den Zustand von Ethereum angewendet und jeder Teilnehmer erhält seinen verbleibenden Anteil der gesperrten Gelder.

Das oben beschriebene Szenario stellt dar, was im Idealfall passiert. Manchmal können sich die Nutzer jedoch nicht einigen und den Kanal finalisieren (der Problemfall). Eines der folgenden Dinge könnte auf die Situation zutreffen:

- Teilnehmer gehen offline und schlagen keine Zustandsübergänge vor

- Teilnehmer weigern sich, gültige Zustandsaktualisierungen mitzuunterzeichnen

- Teilnehmer versuchen, den Kanal zu finalisieren, indem sie dem Vertrag auf der Blockchain eine alte Zustandsaktualisierung vorschlagen

- Teilnehmer schlagen ungültige Zustandsübergänge vor, die andere signieren sollen

Wann immer der Konsens zwischen den teilnehmenden Akteuren in einem Kanal zusammenbricht, besteht die letzte Option darin, sich auf den Konsens des Mainnets zu verlassen, um den endgültigen, gültigen Zustand des Kanals durchzusetzen. In diesem Fall erfordert das Schließen des State Channels die Beilegung von Streitigkeiten auf der Blockchain.

### Beilegung von Streitigkeiten {#settling-disputes}

Typischerweise einigen sich die Parteien in einem Kanal im Voraus auf die Schließung des Kanals und unterzeichnen gemeinsam den letzten Zustandsübergang, den sie an den Smart Contract übermitteln. Sobald die Aktualisierung auf der Blockchain genehmigt ist, endet die Ausführung des Off-Chain-Smart Contracts und die Teilnehmer verlassen den Kanal mit ihrem Geld.

Eine Partei kann jedoch eine Anfrage auf der Blockchain einreichen, um die Ausführung des Smart Contracts zu beenden und den Kanal zu finalisieren – ohne auf die Zustimmung ihres Gegenübers zu warten. Wenn eine der zuvor beschriebenen konsensbrechenden Situationen eintritt, kann jede Partei den Vertrag auf der Blockchain auslösen, um den Kanal zu schließen und die Gelder zu verteilen. Dies sorgt für **Vertrauenslosigkeit** und stellt sicher, dass ehrliche Parteien ihre Einlagen jederzeit abheben können, unabhängig von den Handlungen der anderen Partei.

Um den Kanalaustritt zu verarbeiten, muss der Nutzer die letzte gültige Zustandsaktualisierung der Anwendung an den Vertrag auf der Blockchain übermitteln. Wenn dies bestätigt wird (d. h. es trägt die Signatur aller Parteien), werden die Gelder zu ihren Gunsten umverteilt.

Es gibt jedoch eine Verzögerung bei der Ausführung von Austrittsanfragen einzelner Nutzer. Wenn die Anfrage zum Abschluss des Kanals einstimmig genehmigt wurde, wird die Austrittstransaktion auf der Blockchain sofort ausgeführt.

Die Verzögerung kommt bei Einzelnutzeraustritten aufgrund der Möglichkeit betrügerischer Handlungen ins Spiel. Zum Beispiel könnte ein Kanalteilnehmer versuchen, den Kanal auf Ethereum zu finalisieren, indem er eine ältere Zustandsaktualisierung auf der Blockchain einreicht.

Als Gegenmaßnahme ermöglichen State Channels ehrlichen Nutzern, ungültige Zustandsaktualisierungen anzufechten, indem sie den neuesten, gültigen Zustand des Kanals auf der Blockchain einreichen. State Channels sind so konzipiert, dass neuere, vereinbarte Zustandsaktualisierungen ältere Zustandsaktualisierungen übertrumpfen.

Sobald ein Peer das Streitschlichtungssystem auf der Blockchain auslöst, muss die andere Partei innerhalb einer Frist (dem sogenannten Anfechtungsfenster) reagieren. Dies ermöglicht es den Nutzern, die Austrittstransaktion anzufechten, insbesondere wenn die andere Partei eine veraltete Aktualisierung anwendet.

Wie auch immer der Fall sein mag, Kanalnutzer haben immer starke Finalitätsgarantien: Wenn der Zustandsübergang in ihrem Besitz von allen Mitgliedern signiert wurde und die jüngste Aktualisierung ist, dann hat er die gleiche Finalität wie eine reguläre Transaktion auf der Blockchain. Sie müssen die andere Partei zwar immer noch auf der Blockchain anfechten, aber das einzig mögliche Ergebnis ist die Finalisierung des letzten gültigen Zustands, den sie besitzen.

### Wie interagieren State Channels mit Ethereum? {#how-do-state-channels-interact-with-ethereum}

Obwohl sie als Off-Chain-Protokolle existieren, haben State Channels eine Komponente auf der Blockchain: den Smart Contract, der beim Öffnen des Kanals auf Ethereum bereitgestellt wird. Dieser Vertrag kontrolliert die in den Kanal eingezahlten Vermögenswerte, verifiziert Zustandsaktualisierungen und schlichtet Streitigkeiten zwischen den Teilnehmern.

State Channels veröffentlichen im Gegensatz zu [Ebene 2](/layer-2/)-Skalierungslösungen keine Transaktionsdaten oder Zustandsverpflichtungen im Mainnet. Sie sind jedoch stärker mit dem Mainnet verbunden als beispielsweise [Sidechains](/developers/docs/scaling/sidechains/), was sie etwas sicherer macht.

State Channels verlassen sich für Folgendes auf das Haupt-Ethereum-Protokoll:

#### 1. Liveness {#liveness}

Der beim Öffnen des Kanals bereitgestellte Vertrag auf der Blockchain ist für die Funktionalität des Kanals verantwortlich. Wenn der Vertrag auf Ethereum läuft, ist der Kanal immer für die Nutzung verfügbar. Umgekehrt kann eine Sidechain jederzeit ausfallen, selbst wenn das Mainnet betriebsbereit ist, was die Gelder der Nutzer gefährdet.

#### 2. Sicherheit {#security}

Bis zu einem gewissen Grad verlassen sich State Channels auf Ethereum, um Sicherheit zu bieten und Nutzer vor böswilligen Peers zu schützen. Wie in späteren Abschnitten besprochen, verwenden Kanäle einen Betrugsnachweis-Mechanismus, der es Nutzern ermöglicht, Versuche anzufechten, den Kanal mit einer ungültigen oder veralteten Aktualisierung zu finalisieren.

In diesem Fall stellt die ehrliche Partei den neuesten gültigen Zustand des Kanals als Betrugsnachweis für den Vertrag auf der Blockchain zur Überprüfung bereit. Betrugsnachweise ermöglichen es Parteien, die einander misstrauen, Off-Chain-Transaktionen durchzuführen, ohne dabei ihre Gelder zu riskieren.

#### 3. Finalität {#finality}

Zustandsaktualisierungen, die von Kanalnutzern gemeinsam signiert wurden, gelten als genauso gut wie Transaktionen auf der Blockchain. Dennoch erreicht die gesamte Aktivität im Kanal erst dann echte Finalität, wenn der Kanal auf Ethereum geschlossen wird.

Im optimistischen Fall können beide Parteien kooperieren, die endgültige Zustandsaktualisierung signieren und auf der Blockchain einreichen, um den Kanal zu schließen, wonach die Gelder entsprechend dem Endzustand des Kanals verteilt werden. Im pessimistischen Fall, in dem jemand versucht zu betrügen, indem er eine falsche Zustandsaktualisierung auf der Blockchain veröffentlicht, wird seine Transaktion erst finalisiert, wenn das Anfechtungsfenster abgelaufen ist.

## Virtuelle State Channels {#virtual-state-channels}

Die naive Implementierung eines State Channels bestünde darin, einen neuen Vertrag bereitzustellen, wenn zwei Nutzer eine Anwendung Off-Chain ausführen möchten. Dies ist nicht nur unpraktikabel, sondern macht auch die Kosteneffizienz von State Channels zunichte (Transaktionskosten auf der Blockchain können sich schnell summieren).

Um dieses Problem zu lösen, wurden „virtuelle Kanäle“ geschaffen. Im Gegensatz zu regulären Kanälen, die Transaktionen auf der Blockchain zum Öffnen und Beenden erfordern, kann ein virtueller Kanal ohne Interaktion mit der Hauptkette geöffnet, ausgeführt und finalisiert werden. Mit dieser Methode ist es sogar möglich, Streitigkeiten Off-Chain beizulegen.

Dieses System beruht auf der Existenz sogenannter „Ledger-Kanäle“, die auf der Blockchain finanziert wurden. Virtuelle Kanäle zwischen zwei Parteien können auf einem bestehenden Ledger-Kanal aufgebaut werden, wobei der oder die Eigentümer des Ledger-Kanals als Vermittler dienen.

Nutzer in jedem virtuellen Kanal interagieren über eine neue Vertragsinstanz, wobei der Ledger-Kanal mehrere Vertragsinstanzen unterstützen kann. Der Zustand des Ledger-Kanals enthält auch mehr als einen Vertragsspeicherzustand, was die parallele Ausführung von Anwendungen Off-Chain zwischen verschiedenen Nutzern ermöglicht.

Genau wie bei regulären Kanälen tauschen die Nutzer Zustandsaktualisierungen aus, um die Zustandsmaschine (State Machine) voranzutreiben. Sofern kein Streitfall auftritt, muss der Vermittler nur beim Öffnen oder Beenden des Kanals kontaktiert werden.

### Virtuelle Payment Channels {#virtual-payment-channels}

Virtuelle Payment Channels basieren auf derselben Idee wie virtuelle State Channels: Teilnehmer, die mit demselben Netzwerk verbunden sind, können Nachrichten weiterleiten, ohne einen neuen Kanal auf der Blockchain öffnen zu müssen. In virtuellen Payment Channels werden Werttransfers über einen oder mehrere Vermittler geleitet, mit der Garantie, dass nur der beabsichtigte Empfänger die transferierten Gelder erhalten kann.

## Anwendungen von State Channels {#applications-of-state-channels}

### Zahlungen {#payments}

Frühe Blockchain-Kanäle waren einfache Protokolle, die es zwei Teilnehmern ermöglichten, schnelle, gebührenarme Transfers Off-Chain durchzuführen, ohne hohe Transaktionsgebühren im Mainnet zahlen zu müssen. Heute sind Payment Channels immer noch nützlich für Anwendungen, die für den Austausch und die Einzahlung von Ether und Token konzipiert sind.

Kanalbasierte Zahlungen haben die folgenden Vorteile:

1. **Durchsatz**: Die Menge der Off-Chain-Transaktionen pro Kanal ist unabhängig vom Durchsatz von Ethereum, der von verschiedenen Faktoren beeinflusst wird, insbesondere von der Blockgröße und der Blockzeit. Durch die Ausführung von Transaktionen Off-Chain können Blockchain-Kanäle einen höheren Durchsatz erzielen.

2. **Privatsphäre**: Da Kanäle Off-Chain existieren, werden Details der Interaktionen zwischen den Teilnehmern nicht auf der öffentlichen Blockchain von Ethereum aufgezeichnet. Kanalnutzer müssen nur dann auf der Blockchain interagieren, wenn sie Kanäle finanzieren und schließen oder Streitigkeiten beilegen. Daher sind Kanäle nützlich für Personen, die privatere Transaktionen wünschen.

3. **Latenz**: Off-Chain-Transaktionen, die zwischen Kanalteilnehmern durchgeführt werden, können sofort abgewickelt werden, wenn beide Parteien kooperieren, was Verzögerungen reduziert. Im Gegensatz dazu erfordert das Senden einer Transaktion im Mainnet das Warten darauf, dass Blockchain-Knoten die Transaktion verarbeiten, einen neuen Block mit der Transaktion produzieren und einen Konsens erzielen. Nutzer müssen möglicherweise auch auf weitere Blockbestätigungen warten, bevor sie eine Transaktion als finalisiert betrachten.

4. **Kosten**: State Channels sind besonders nützlich in Situationen, in denen eine Gruppe von Teilnehmern über einen langen Zeitraum viele Zustandsaktualisierungen austauscht. Die einzigen anfallenden Kosten sind das Öffnen und Schließen des State Channel-Smart Contracts; jede Zustandsänderung zwischen dem Öffnen und Schließen des Kanals wird billiger als die vorherige sein, da die Abwicklungskosten entsprechend verteilt werden.

Die Implementierung von State Channels auf Ebene 2-Lösungen, wie z. B. [Rollups](/developers/docs/scaling/#rollups), könnte sie für Zahlungen noch attraktiver machen. Während Kanäle günstige Zahlungen bieten, können die Kosten für die Einrichtung des Vertrags auf der Blockchain im Mainnet während der Eröffnungsphase teuer werden – insbesondere wenn die Gasgebühren in die Höhe schnellen. Ethereum-basierte Rollups bieten [niedrigere Transaktionsgebühren](https://l2fees.info/) und können den Mehraufwand für Kanalteilnehmer reduzieren, indem sie die Einrichtungsgebühren senken.

### Mikrozahlungen {#microtransactions}

Mikrozahlungen sind Zahlungen mit geringem Wert (z. B. weniger als ein Bruchteil eines Dollars), die Unternehmen nicht ohne Verluste verarbeiten können. Diese Unternehmen müssen Zahlungsdienstleister bezahlen, was sie nicht tun können, wenn die Marge bei Kundenzahlungen zu gering ist, um einen Gewinn zu erzielen.

Payment Channels lösen dieses Problem, indem sie den mit Mikrozahlungen verbundenen Mehraufwand reduzieren. Zum Beispiel kann ein Internetdienstanbieter (ISP) einen Payment Channel mit einem Kunden eröffnen, der es ihm ermöglicht, jedes Mal, wenn er den Dienst nutzt, kleine Zahlungen zu streamen.

Über die Kosten für das Öffnen und Schließen des Kanals hinaus entstehen den Teilnehmern keine weiteren Kosten für Mikrozahlungen (keine Gasgebühren). Dies ist eine Win-Win-Situation, da Kunden mehr Flexibilität bei der Bezahlung von Dienstleistungen haben und Unternehmen keine profitablen Mikrozahlungen entgehen.

### Dezentralisierte Anwendungen {#decentralized-applications}

Wie Payment Channels können State Channels bedingte Zahlungen entsprechend den Endzuständen der Zustandsmaschine vornehmen. State Channels können auch beliebige Zustandsübergangslogik unterstützen, was sie nützlich für die Ausführung generischer Apps Off-Chain macht.

State Channels sind oft auf einfache rundenbasierte Anwendungen beschränkt, da dies die Verwaltung der an den Vertrag auf der Blockchain gebundenen Gelder erleichtert. Da außerdem nur eine begrenzte Anzahl von Parteien den Zustand der Off-Chain-Anwendung in Intervallen aktualisiert, ist die Bestrafung unehrlichen Verhaltens relativ unkompliziert.

Die Effizienz einer State Channel-Anwendung hängt auch von ihrem Design ab. Zum Beispiel könnte ein Entwickler den App-Kanalvertrag einmal auf der Blockchain bereitstellen und anderen Spielern erlauben, die App wiederzuverwenden, ohne auf die Blockchain gehen zu müssen. In diesem Fall dient der anfängliche App-Kanal als Ledger-Kanal, der mehrere virtuelle Kanäle unterstützt, von denen jeder eine neue Instanz des Smart Contracts der App Off-Chain ausführt.

Ein potenzieller Anwendungsfall für State Channel-Anwendungen sind einfache Zwei-Spieler-Spiele, bei denen die Gelder basierend auf dem Spielergebnis verteilt werden. Der Vorteil hierbei ist, dass die Spieler einander nicht vertrauen müssen (Vertrauenslosigkeit) und der Vertrag auf der Blockchain, nicht die Spieler, die Zuweisung von Geldern und die Beilegung von Streitigkeiten kontrolliert (Dezentralisierung).

Weitere mögliche Anwendungsfälle für State Channel-Apps umfassen den Besitz von ENS-Namen, NFT-Ledger und viele mehr.

### Atomare Transfers {#atomic-transfers}

Frühe Payment Channels waren auf Transfers zwischen zwei Parteien beschränkt, was ihre Nutzbarkeit einschränkte. Die Einführung virtueller Kanäle ermöglichte es Einzelpersonen jedoch, Transfers über Vermittler (d. h. mehrere P2P-Kanäle) zu leiten, ohne einen neuen Kanal auf der Blockchain öffnen zu müssen.

Gemeinhin als „Multi-Hop-Transfers“ beschrieben, sind geroutete Zahlungen atomar (d. h. entweder sind alle Teile der Transaktion erfolgreich oder sie schlägt insgesamt fehl). Atomare Transfers verwenden [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts), um sicherzustellen, dass die Zahlung nur freigegeben wird, wenn bestimmte Bedingungen erfüllt sind, wodurch das Kontrahentenrisiko verringert wird.

## Nachteile der Nutzung von State Channels {#drawbacks-of-state-channels}

### Liveness-Annahmen {#liveness-assumptions}

Um die Effizienz zu gewährleisten, legen State Channels zeitliche Begrenzungen für die Fähigkeit der Kanalteilnehmer fest, auf Streitigkeiten zu reagieren. Diese Regel geht davon aus, dass Peers immer online sind, um die Kanalaktivität zu überwachen und Anfechtungen bei Bedarf zu bestreiten.

In der Realität können Nutzer aus Gründen, die außerhalb ihrer Kontrolle liegen, offline gehen (z. B. schlechte Internetverbindung, mechanisches Versagen usw.). Wenn ein ehrlicher Nutzer offline geht, kann ein böswilliger Peer die Situation ausnutzen, indem er dem Schiedsrichtervertrag alte Zwischenzustände präsentiert und die gebundenen Gelder stiehlt.

Einige Kanäle verwenden „Watchtowers“ (Wachtürme) – Entitäten, die dafür verantwortlich sind, Streitfälle auf der Blockchain im Namen anderer zu beobachten und notwendige Maßnahmen zu ergreifen, wie z. B. die Alarmierung der betroffenen Parteien. Dies kann jedoch die Kosten für die Nutzung eines State Channels erhöhen.

### Datenunverfügbarkeit {#data-unavailability}

Wie bereits erklärt, erfordert die Anfechtung eines ungültigen Streits die Präsentation des neuesten, gültigen Zustands des State Channels. Dies ist eine weitere Regel, die auf einer Annahme basiert – dass die Nutzer Zugriff auf den neuesten Zustand des Kanals haben.

Obwohl es vernünftig ist zu erwarten, dass Kanalnutzer Kopien des Zustands der Off-Chain-Anwendung speichern, können diese Daten durch Fehler oder mechanisches Versagen verloren gehen. Wenn der Nutzer die Daten nicht gesichert hat, kann er nur hoffen, dass die andere Partei keine ungültige Austrittsanfrage unter Verwendung alter Zustandsübergänge in ihrem Besitz finalisiert.

Ethereum-Nutzer müssen sich nicht mit diesem Problem auseinandersetzen, da das Netzwerk Regeln zur Datenverfügbarkeit durchsetzt. Transaktionsdaten werden von allen Blockchain-Knoten gespeichert und verbreitet und stehen den Nutzern bei Bedarf zum Download zur Verfügung.

### Liquiditätsprobleme {#liquidity-issues}

Um einen Blockchain-Kanal einzurichten, müssen die Teilnehmer Gelder in einem Smart Contract auf der Blockchain für den Lebenszyklus des Kanals sperren. Dies verringert die Liquidität der Kanalnutzer und beschränkt Kanäle auch auf diejenigen, die es sich leisten können, Gelder im Mainnet gesperrt zu halten.

Ledger-Kanäle – betrieben von einem Off-Chain-Dienstleister (OSP) – können jedoch Liquiditätsprobleme für Nutzer verringern. Zwei Peers, die mit einem Ledger-Kanal verbunden sind, können einen virtuellen Kanal erstellen, den sie jederzeit komplett Off-Chain öffnen und finalisieren können.

Off-Chain-Dienstleister könnten auch Kanäle mit mehreren Peers öffnen, was sie nützlich für das Routing von Zahlungen macht. Natürlich müssen die Nutzer Gebühren an OSPs für deren Dienste zahlen, was für einige unerwünscht sein könnte.

### Griefing-Angriffe {#griefing-attacks}

Griefing-Angriffe sind ein häufiges Merkmal von Systemen, die auf Betrugsnachweisen basieren. Ein Griefing-Angriff nützt dem Angreifer nicht direkt, sondern verursacht dem Opfer Kummer (d. h. Schaden), daher der Name.

Der Betrugsnachweis ist anfällig für Griefing-Angriffe, da die ehrliche Partei auf jeden Streitfall reagieren muss, auch auf ungültige, oder riskiert, ihre Gelder zu verlieren. Ein böswilliger Teilnehmer kann beschließen, wiederholt veraltete Zustandsübergänge auf der Blockchain zu veröffentlichen, was die ehrliche Partei zwingt, mit dem gültigen Zustand zu antworten. Die Kosten für diese Transaktionen auf der Blockchain können sich schnell summieren, was dazu führt, dass ehrliche Parteien dabei den Kürzeren ziehen.

### Vordefinierte Teilnehmergruppen {#predefined-participant-sets}

Konstruktionsbedingt bleibt die Anzahl der Teilnehmer, die einen State Channel bilden, während seiner gesamten Lebensdauer fest. Dies liegt daran, dass die Aktualisierung der Teilnehmergruppe den Betrieb des Kanals verkomplizieren würde, insbesondere bei der Finanzierung des Kanals oder der Beilegung von Streitigkeiten. Das Hinzufügen oder Entfernen von Teilnehmern würde auch zusätzliche Aktivitäten auf der Blockchain erfordern, was den Mehraufwand für die Nutzer erhöht.

Während dies das Nachdenken über State Channels erleichtert, schränkt es die Nützlichkeit von Kanaldesigns für Anwendungsentwickler ein. Dies erklärt teilweise, warum State Channels zugunsten anderer Skalierungslösungen, wie z. B. Rollups, aufgegeben wurden.

### Parallele Transaktionsverarbeitung {#parallel-transaction-processing}

Die Teilnehmer im State Channel senden Zustandsaktualisierungen abwechselnd, weshalb sie am besten für „rundenbasierte Anwendungen“ (z. B. ein Zwei-Spieler-Schachspiel) funktionieren. Dies beseitigt die Notwendigkeit, gleichzeitige Zustandsaktualisierungen zu handhaben, und reduziert die Arbeit, die der Vertrag auf der Blockchain leisten muss, um Poster veralteter Aktualisierungen zu bestrafen. Ein Nebeneffekt dieses Designs ist jedoch, dass Transaktionen voneinander abhängig sind, was die Latenz erhöht und die allgemeine Nutzererfahrung verschlechtert.

Einige State Channels lösen dieses Problem durch die Verwendung eines „Vollduplex“-Designs, das den Off-Chain-Zustand in zwei unidirektionale „Simplex“-Zustände trennt, was gleichzeitige Zustandsaktualisierungen ermöglicht. Solche Designs verbessern den Off-Chain-Durchsatz und verringern Transaktionsverzögerungen.

## State Channels nutzen {#use-state-channels}

Mehrere Projekte bieten Implementierungen von State Channels an, die Sie in Ihre Dapps integrieren können:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Weiterführende Literatur {#further-reading}

**State Channels**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_