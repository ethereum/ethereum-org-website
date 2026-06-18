---
title: Zustandskanäle
description: Eine Einführung in Zustandskanäle und Zahlungskanäle als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
sidebarDepth: 3
---

Zustandskanäle ermöglichen es Teilnehmern, sicher offchain zu transagieren, während die Interaktion mit dem [Ethereum](/) Mainnet auf ein Minimum beschränkt bleibt. Kanal-Peers können eine beliebige Anzahl von offchain Transaktionen durchführen, während sie nur zwei onchain Transaktionen einreichen, um den Kanal zu öffnen und zu schließen. Dies ermöglicht einen extrem hohen Transaktionsdurchsatz und führt zu geringeren Kosten für die Nutzer.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten über [Ethereum-Skalierung](/developers/docs/scaling/) und [Layer 2 (L2)](/layer-2/) gelesen und verstanden haben.

## Was sind Kanäle? {#what-are-channels}

Öffentliche Blockchains wie Ethereum stehen aufgrund ihrer verteilten Architektur vor Skalierbarkeitsherausforderungen: onchain Transaktionen müssen von allen Knoten ausgeführt werden. Knoten müssen in der Lage sein, das Transaktionsvolumen in einem Block mit bescheidener Hardware zu bewältigen, was dem Transaktionsdurchsatz eine Grenze setzt, um das Netzwerk dezentral zu halten. Blockchain-Kanäle lösen dieses Problem, indem sie es Benutzern ermöglichen, offchain zu interagieren, während sie sich für die endgültige Abwicklung weiterhin auf die Sicherheit der Main-Chain verlassen.

Kanäle sind einfache Peer-to-Peer-Protokolle, die es zwei Parteien ermöglichen, viele Transaktionen untereinander durchzuführen und dann nur die Endergebnisse auf der Blockchain zu veröffentlichen. Der Kanal nutzt Kryptographie, um zu beweisen, dass die von ihnen generierten Zusammenfassungsdaten tatsächlich das Ergebnis einer gültigen Menge von Zwischentransaktionen sind. Ein ["Multisig"](/developers/docs/smart-contracts/#multisig)-Smart Contract stellt sicher, dass die Transaktionen von den richtigen Parteien signiert werden.

Mit Kanälen werden Zustandsänderungen von den interessierten Parteien ausgeführt und validiert, was die Berechnungen auf der Ausführungsschicht von Ethereum minimiert. Dies verringert die Überlastung auf Ethereum und erhöht zudem die Transaktionsverarbeitungsgeschwindigkeiten für die Nutzer.

Jeder Kanal wird von einem [Multisig-Smart Contract](/developers/docs/smart-contracts/#multisig) verwaltet, der auf Ethereum läuft. Um einen Kanal zu öffnen, stellen die Teilnehmer den Kanalvertrag onchain bereit und zahlen Gelder in ihn ein. Beide Parteien signieren gemeinsam eine Zustandsaktualisierung, um den Zustand des Kanals zu initialisieren, wonach sie schnell und frei offchain transagieren können.

Um den Kanal zu schließen, reichen die Teilnehmer den zuletzt vereinbarten Zustand des Kanals onchain ein. Danach verteilt der Smart Contract die gesperrten Gelder entsprechend dem Guthaben jedes Teilnehmers im endgültigen Zustand des Kanals.

Peer-to-Peer-Kanäle sind besonders nützlich für Situationen, in denen einige vordefinierte Teilnehmer mit hoher Frequenz transagieren möchten, ohne sichtbaren Mehraufwand zu verursachen. Blockchain-Kanäle fallen in zwei Kategorien: **Zahlungskanäle** und **Zustandskanäle**.

## Zahlungskanäle {#payment-channels}

Ein Zahlungskanal lässt sich am besten als ein "Zwei-Wege-Kassenbuch" beschreiben, das von zwei Benutzern gemeinsam geführt wird. Der anfängliche Saldo des Kassenbuchs ist die Summe der Einlagen, die während der Kanaleröffnungsphase im onchain Vertrag gesperrt wurden. Überweisungen im Zahlungskanal können sofort und ohne Beteiligung der eigentlichen Blockchain selbst durchgeführt werden, mit Ausnahme einer anfänglichen einmaligen onchain Erstellung und einer eventuellen Schließung des Kanals.

Aktualisierungen des Kassenbuchsaldos (d. h. des Zustands des Zahlungskanals) erfordern die Zustimmung aller Parteien im Kanal. Eine Kanalaktualisierung, die von allen Kanalteilnehmern signiert wurde, gilt als endgültig, ähnlich wie eine Transaktion auf Ethereum.

Zahlungskanäle gehörten zu den frühesten Skalierungslösungen, die entwickelt wurden, um teure onchain Aktivitäten einfacher Benutzerinteraktionen (z. B. ETH-Überweisungen, Atomic Swaps, Mikrozahlungen) zu minimieren. Kanalteilnehmer können eine unbegrenzte Anzahl von sofortigen, gebührenfreien Transaktionen untereinander durchführen, solange die Nettosumme ihrer Überweisungen die eingezahlten Token nicht überschreitet.

## Zustandskanäle {#state-channels}

Abgesehen von der Unterstützung von offchain Zahlungen haben sich Zahlungskanäle nicht als nützlich für die Handhabung allgemeiner Zustandsübergangslogik erwiesen. Zustandskanäle wurden geschaffen, um dieses Problem zu lösen und Kanäle für die Skalierung von Allzweckberechnungen nutzbar zu machen.

Zustandskanäle haben immer noch viel mit Zahlungskanälen gemeinsam. Zum Beispiel interagieren Benutzer durch den Austausch kryptographisch signierter Nachrichten (Transaktionen), die die anderen Kanalteilnehmer ebenfalls signieren müssen. Wenn eine vorgeschlagene Zustandsaktualisierung nicht von allen Teilnehmern signiert wird, gilt sie als ungültig.

Zusätzlich zur Speicherung der Benutzersalden verfolgt der Kanal jedoch auch den aktuellen Zustand des Vertragsspeichers (d. h. die Werte der Vertragsvariablen).

Dies macht es möglich, einen Smart Contract offchain zwischen zwei Benutzern auszuführen. In diesem Szenario erfordern Aktualisierungen des internen Zustands des Smart Contracts nur die Zustimmung der Peers, die den Kanal erstellt haben.

Während dies das zuvor beschriebene Skalierbarkeitsproblem löst, hat es Auswirkungen auf die Sicherheit. Auf Ethereum wird die Gültigkeit von Zustandsübergängen durch das Konsens-Protokoll des Netzwerks durchgesetzt. Dies macht es unmöglich, eine ungültige Aktualisierung des Zustands eines Smart Contracts vorzuschlagen oder die Ausführung des Smart Contracts zu ändern.

Zustandskanäle haben nicht die gleichen Sicherheitsgarantien. Bis zu einem gewissen Grad ist ein Zustandskanal eine Miniaturversion des Mainnets. Mit einer begrenzten Anzahl von Teilnehmern, die Regeln durchsetzen, steigt die Möglichkeit von bösartigem Verhalten (z. B. das Vorschlagen ungültiger Zustandsaktualisierungen). Zustandskanäle beziehen ihre Sicherheit aus einem Streitbeilegungssystem, das auf [Betrugsnachweisen](/glossary/#fraud-proof) basiert.

## Wie Zustandskanäle funktionieren {#how-state-channels-work}

Grundsätzlich ist die Aktivität in einem Zustandskanal eine Sitzung von Interaktionen, an der Benutzer und ein Blockchain-System beteiligt sind. Benutzer kommunizieren meist offchain miteinander und interagieren nur mit der zugrunde liegenden Blockchain, um den Kanal zu öffnen, den Kanal zu schließen oder mögliche Streitigkeiten zwischen den Teilnehmern beizulegen.

Der folgende Abschnitt skizziert den grundlegenden Arbeitsablauf eines Zustandskanals:

### Öffnen des Kanals {#opening-the-channel}

Das Öffnen eines Kanals erfordert, dass die Teilnehmer Gelder an einen Smart Contract im Mainnet binden. Die Einzahlung fungiert auch als virtueller Deckel, sodass die teilnehmenden Akteure frei transagieren können, ohne Zahlungen sofort abwickeln zu müssen. Erst wenn der Kanal onchain endgültig gemacht wird, wickeln die Parteien untereinander ab und heben ab, was von ihrem Deckel übrig ist.

Diese Einzahlung dient auch als Kaution, um ehrliches Verhalten jedes Teilnehmers zu garantieren. Wenn Einleger während der Streitbeilegungsphase böswilliger Handlungen für schuldig befunden werden, zieht der Vertrag ihre Einzahlung ein.

Kanal-Peers müssen einen anfänglichen Zustand signieren, auf den sie sich alle einigen. Dies dient als Genesis des Zustandskanals, wonach die Benutzer mit dem Transagieren beginnen können.

### Nutzung des Kanals {#using-the-channel}

Nach der Initialisierung des Kanalzustands interagieren die Peers, indem sie Transaktionen signieren und sie sich gegenseitig zur Genehmigung senden. Teilnehmer initiieren Zustandsaktualisierungen mit diesen Transaktionen und signieren Zustandsaktualisierungen von anderen. Jede Transaktion umfasst Folgendes:

- Eine **Nonce**, die als eindeutige ID für Transaktionen fungiert und Replay-Angriffe verhindert. Sie identifiziert auch die Reihenfolge, in der Zustandsaktualisierungen aufgetreten sind (was für die Streitbeilegung wichtig ist)

- Den alten Zustand des Kanals

- Den neuen Zustand des Kanals

- Die Transaktion, die den Zustandsübergang auslöst (z. B. Alice sendet 5 ETH an Bob)

Zustandsaktualisierungen im Kanal werden nicht onchain übertragen, wie es normalerweise der Fall ist, wenn Benutzer im Mainnet interagieren, was mit dem Ziel von Zustandskanälen übereinstimmt, den onchain Fußabdruck zu minimieren. Solange sich die Teilnehmer auf Zustandsaktualisierungen einigen, sind sie so endgültig wie eine Ethereum-Transaktion. Teilnehmer müssen sich nur auf den Konsens des Mainnets verlassen, wenn ein Streitfall auftritt.

### Schließen des Kanals {#closing-the-channel}

Das Schließen eines Zustandskanals erfordert die Einreichung des endgültigen, vereinbarten Zustands des Kanals an den onchain Smart Contract. Zu den in der Zustandsaktualisierung referenzierten Details gehören die Anzahl der Züge jedes Teilnehmers und eine Liste der genehmigten Transaktionen.

Nach der Überprüfung, dass die Zustandsaktualisierung gültig ist (d. h. sie ist von allen Parteien signiert), macht der Smart Contract den Kanal endgültig und verteilt die gesperrten Gelder entsprechend dem Ergebnis des Kanals. Offchain getätigte Zahlungen werden auf den Zustand von Ethereum angewendet und jeder Teilnehmer erhält seinen verbleibenden Teil der gesperrten Gelder.

Das oben beschriebene Szenario stellt dar, was im Idealfall (Happy Case) passiert. Manchmal können Benutzer möglicherweise keine Einigung erzielen und den Kanal endgültig machen (der Sad Case). Eines der folgenden Dinge könnte auf die Situation zutreffen:

- Teilnehmer gehen offline und versäumen es, Zustandsübergänge vorzuschlagen

- Teilnehmer weigern sich, gültige Zustandsaktualisierungen mitzuunterzeichnen

- Teilnehmer versuchen, den Kanal endgültig zu machen, indem sie dem onchain Vertrag eine alte Zustandsaktualisierung vorschlagen

- Teilnehmer schlagen ungültige Zustandsübergänge vor, die andere signieren sollen

Wann immer der Konsens zwischen den teilnehmenden Akteuren in einem Kanal zusammenbricht, besteht die letzte Option darin, sich auf den Konsens des Mainnets zu verlassen, um den endgültigen, gültigen Zustand des Kanals durchzusetzen. In diesem Fall erfordert das Schließen des Zustandskanals die onchain Beilegung von Streitigkeiten.

### Beilegung von Streitigkeiten {#settling-disputes}

Typischerweise einigen sich die Parteien in einem Kanal im Voraus auf die Schließung des Kanals und unterzeichnen gemeinsam den letzten Zustandsübergang, den sie beim Smart Contract einreichen. Sobald die Aktualisierung onchain genehmigt ist, endet die Ausführung des offchain Smart Contracts und die Teilnehmer treten mit ihrem Geld aus dem Kanal aus (Austritt).

Eine Partei kann jedoch eine onchain Anfrage einreichen, um die Ausführung des Smart Contracts zu beenden und den Kanal endgültig zu machen – ohne auf die Zustimmung ihres Gegenübers zu warten. Wenn eine der zuvor beschriebenen konsensbrechenden Situationen eintritt, kann jede Partei den onchain Vertrag auslösen, um den Kanal zu schließen und Gelder zu verteilen. Dies bietet **Vertrauenslosigkeit** und stellt sicher, dass ehrliche Parteien ihre Einlagen jederzeit abheben können (Austritt), unabhängig von den Handlungen der anderen Partei.

Um den Austritt aus dem Kanal zu verarbeiten, muss der Benutzer die letzte gültige Zustandsaktualisierung der Anwendung beim onchain Vertrag einreichen. Wenn dies überprüft wird (d. h. es trägt die Signatur aller Parteien), werden die Gelder zu ihren Gunsten umverteilt.

Es gibt jedoch eine Verzögerung bei der Ausführung von Austrittsanfragen einzelner Benutzer. Wenn die Anfrage zum Abschluss des Kanals einstimmig genehmigt wurde, wird die onchain Austrittstransaktion sofort ausgeführt.

Die Verzögerung kommt bei Einzelbenutzer-Austritten aufgrund der Möglichkeit betrügerischer Handlungen ins Spiel. Zum Beispiel könnte ein Kanalteilnehmer versuchen, den Kanal auf Ethereum endgültig zu machen, indem er eine ältere Zustandsaktualisierung onchain einreicht.

Als Gegenmaßnahme ermöglichen Zustandskanäle ehrlichen Benutzern, ungültige Zustandsaktualisierungen anzufechten, indem sie den neuesten, gültigen Zustand des Kanals onchain einreichen. Zustandskanäle sind so konzipiert, dass neuere, vereinbarte Zustandsaktualisierungen ältere Zustandsaktualisierungen übertrumpfen.

Sobald ein Peer das onchain Streitbeilegungssystem auslöst, muss die andere Partei innerhalb einer Frist (dem sogenannten Anfechtungsfenster) reagieren. Dies ermöglicht es Benutzern, die Austrittstransaktion anzufechten, insbesondere wenn die andere Partei eine veraltete Aktualisierung anwendet.

Wie auch immer der Fall sein mag, Kanalbenutzer haben immer starke Endgültigkeitsgarantien: Wenn der Zustandsübergang in ihrem Besitz von allen Mitgliedern signiert wurde und die jüngste Aktualisierung ist, dann hat er die gleiche Endgültigkeit wie eine reguläre onchain Transaktion. Sie müssen die andere Partei zwar immer noch onchain anfechten, aber das einzig mögliche Ergebnis ist die Endgültigkeit des letzten gültigen Zustands, den sie besitzen.

### Wie interagieren Zustandskanäle mit Ethereum? {#how-do-state-channels-interact-with-ethereum}

Obwohl sie als offchain Protokolle existieren, haben Zustandskanäle eine onchain Komponente: den Smart Contract, der beim Öffnen des Kanals auf Ethereum bereitgestellt wird. Dieser Vertrag kontrolliert die in den Kanal eingezahlten Vermögenswerte, verifiziert Zustandsaktualisierungen und schlichtet Streitigkeiten zwischen den Teilnehmern.

Zustandskanäle veröffentlichen keine Transaktionsdaten oder Zustandsverpflichtungen im Mainnet, im Gegensatz zu [Layer 2](/layer-2/)-Skalierungslösungen. Sie sind jedoch stärker mit dem Mainnet verbunden als beispielsweise [Sidechains](/developers/docs/scaling/sidechains/), was sie etwas sicherer macht.

Zustandskanäle verlassen sich für Folgendes auf das Haupt-Ethereum-Protokoll:

#### 1. Lebendigkeit (Liveness) {#liveness}

Der onchain Vertrag, der beim Öffnen des Kanals bereitgestellt wird, ist für die Funktionalität des Kanals verantwortlich. Wenn der Vertrag auf Ethereum läuft, ist der Kanal immer zur Nutzung verfügbar. Umgekehrt kann eine Sidechain immer ausfallen, selbst wenn das Mainnet betriebsbereit ist, was die Gelder der Benutzer gefährdet.

#### 2. Sicherheit {#security}

Bis zu einem gewissen Grad verlassen sich Zustandskanäle auf Ethereum, um Sicherheit zu bieten und Benutzer vor böswilligen Peers zu schützen. Wie in späteren Abschnitten besprochen, verwenden Kanäle einen Betrugsnachweis-Mechanismus, der es Benutzern ermöglicht, Versuche anzufechten, den Kanal mit einer ungültigen oder veralteten Aktualisierung endgültig zu machen.

In diesem Fall stellt die ehrliche Partei den neuesten gültigen Zustand des Kanals als Betrugsnachweis für den onchain Vertrag zur Überprüfung bereit. Betrugsnachweise ermöglichen es sich gegenseitig misstrauenden Parteien, offchain Transaktionen durchzuführen, ohne dabei ihre Gelder zu riskieren.

#### 3. Endgültigkeit {#finality}

Zustandsaktualisierungen, die gemeinsam von Kanalbenutzern signiert wurden, gelten als genauso gut wie onchain Transaktionen. Dennoch erreicht die gesamte Aktivität im Kanal erst dann wahre Endgültigkeit, wenn der Kanal auf Ethereum geschlossen wird.

Im optimistischen Fall können beide Parteien kooperieren und die endgültige Zustandsaktualisierung signieren und onchain einreichen, um den Kanal zu schließen, wonach die Gelder entsprechend dem endgültigen Zustand des Kanals verteilt werden. Im pessimistischen Fall, in dem jemand versucht zu betrügen, indem er eine falsche Zustandsaktualisierung onchain veröffentlicht, wird seine Transaktion erst endgültig, wenn das Anfechtungsfenster abgelaufen ist.

## Virtuelle Zustandskanäle {#virtual-state-channels}

Die naive Implementierung eines Zustandskanals bestünde darin, einen neuen Vertrag bereitzustellen, wenn zwei Benutzer eine Anwendung offchain ausführen möchten. Dies ist nicht nur undurchführbar, sondern macht auch die Kosteneffizienz von Zustandskanälen zunichte (onchain Transaktionskosten können sich schnell summieren).

Um dieses Problem zu lösen, wurden "virtuelle Kanäle" geschaffen. Im Gegensatz zu regulären Kanälen, die onchain Transaktionen zum Öffnen und Beenden erfordern, kann ein virtueller Kanal ohne Interaktion mit der Main-Chain geöffnet, ausgeführt und endgültig gemacht werden. Es ist mit dieser Methode sogar möglich, Streitigkeiten offchain beizulegen.

Dieses System beruht auf der Existenz sogenannter "Ledger-Kanäle", die onchain finanziert wurden. Virtuelle Kanäle zwischen zwei Parteien können auf einem bestehenden Ledger-Kanal aufgebaut werden, wobei der oder die Eigentümer des Ledger-Kanals als Vermittler dienen.

Benutzer in jedem virtuellen Kanal interagieren über eine neue Vertragsinstanz, wobei der Ledger-Kanal mehrere Vertragsinstanzen unterstützen kann. Der Zustand des Ledger-Kanals enthält auch mehr als einen Vertragsspeicherzustand, was die parallele Ausführung von Anwendungen offchain zwischen verschiedenen Benutzern ermöglicht.

Genau wie bei regulären Kanälen tauschen Benutzer Zustandsaktualisierungen aus, um die Zustandsmaschine voranzutreiben. Sofern kein Streitfall auftritt, muss der Vermittler nur beim Öffnen oder Beenden des Kanals kontaktiert werden.

### Virtuelle Zahlungskanäle {#virtual-payment-channels}

Virtuelle Zahlungskanäle basieren auf derselben Idee wie virtuelle Zustandskanäle: Teilnehmer, die mit demselben Netzwerk verbunden sind, können Nachrichten weiterleiten, ohne einen neuen Kanal onchain öffnen zu müssen. In virtuellen Zahlungskanälen werden Wertübertragungen über einen oder mehrere Vermittler geleitet, mit der Garantie, dass nur der beabsichtigte Empfänger die überwiesenen Gelder erhalten kann.

## Anwendungen von Zustandskanälen {#applications-of-state-channels}

### Zahlungen {#payments}

Frühe Blockchain-Kanäle waren einfache Protokolle, die es zwei Teilnehmern ermöglichten, schnelle, gebührenarme Überweisungen offchain durchzuführen, ohne hohe Transaktionsgebühren im Mainnet zahlen zu müssen. Heute sind Zahlungskanäle immer noch nützlich für Anwendungen, die für den Austausch und die Einzahlung von Ether und Token konzipiert sind.

Kanalbasierte Zahlungen haben die folgenden Vorteile:

1. **Transaktionsdurchsatz**: Die Menge der offchain Transaktionen pro Kanal ist unabhängig vom Transaktionsdurchsatz von Ethereum, der von verschiedenen Faktoren beeinflusst wird, insbesondere von der Blockgröße und der Blockzeit. Durch die Ausführung von Transaktionen offchain können Blockchain-Kanäle einen höheren Transaktionsdurchsatz erzielen.

2. **Privatsphäre**: Da Kanäle offchain existieren, werden Details der Interaktionen zwischen den Teilnehmern nicht auf der öffentlichen Blockchain von Ethereum aufgezeichnet. Kanalbenutzer müssen nur onchain interagieren, wenn sie Kanäle finanzieren und schließen oder Streitigkeiten beilegen. Somit sind Kanäle nützlich für Personen, die privatere Transaktionen wünschen.

3. **Latenz**: Offchain Transaktionen, die zwischen Kanalteilnehmern durchgeführt werden, können sofort abgewickelt werden, wenn beide Parteien kooperieren, was Verzögerungen reduziert. Im Gegensatz dazu erfordert das Senden einer Transaktion im Mainnet das Warten darauf, dass Knoten die Transaktion verarbeiten, einen neuen Block mit der Transaktion produzieren und einen Konsens erreichen. Benutzer müssen möglicherweise auch auf weitere Blockbestätigungen warten, bevor sie eine Transaktion als endgültig betrachten.

4. **Kosten**: Zustandskanäle sind besonders nützlich in Situationen, in denen eine Gruppe von Teilnehmern über einen langen Zeitraum viele Zustandsaktualisierungen austauscht. Die einzigen anfallenden Kosten sind das Öffnen und Schließen des Zustandskanal-Smart Contracts; jede Zustandsänderung zwischen dem Öffnen und Schließen des Kanals wird billiger als die vorherige sein, da die Abwicklungskosten entsprechend verteilt werden.

Die Implementierung von Zustandskanälen auf Layer 2-Lösungen, wie [Rollups](/developers/docs/scaling/#rollups), könnte sie für Zahlungen noch attraktiver machen. Während Kanäle günstige Zahlungen bieten, können die Kosten für die Einrichtung des onchain Vertrags im Mainnet während der Eröffnungsphase teuer werden – insbesondere wenn die Gasgebühren in die Höhe schnellen. Ethereum-basierte Rollups bieten [niedrigere Transaktionsgebühren](https://l2fees.info/) und können den Mehraufwand für Kanalteilnehmer reduzieren, indem sie die Einrichtungsgebühren senken.

### Mikrozahlungen {#microtransactions}

Mikrozahlungen sind Zahlungen mit geringem Wert (z. B. weniger als ein Bruchteil eines Dollars), die Unternehmen nicht ohne Verluste verarbeiten können. Diese Unternehmen müssen Zahlungsdienstleister bezahlen, was sie nicht tun können, wenn die Marge bei Kundenzahlungen zu gering ist, um einen Gewinn zu erzielen.

Zahlungskanäle lösen dieses Problem, indem sie den mit Mikrozahlungen verbundenen Mehraufwand reduzieren. Zum Beispiel kann ein Internetdienstanbieter (ISP) einen Zahlungskanal mit einem Kunden eröffnen, der es ihm ermöglicht, jedes Mal, wenn er den Dienst nutzt, kleine Zahlungen zu streamen.

Über die Kosten für das Öffnen und Schließen des Kanals hinaus entstehen den Teilnehmern keine weiteren Kosten für Mikrozahlungen (keine Gasgebühren). Dies ist eine Win-Win-Situation, da Kunden mehr Flexibilität bei der Bezahlung von Dienstleistungen haben und Unternehmen keine profitablen Mikrozahlungen entgehen.

### Dezentrale Anwendungen (Dapps) {#decentralized-applications}

Wie Zahlungskanäle können Zustandskanäle bedingte Zahlungen entsprechend den Endzuständen der Zustandsmaschine vornehmen. Zustandskanäle können auch beliebige Zustandsübergangslogik unterstützen, was sie nützlich für die Ausführung generischer Apps offchain macht.

Zustandskanäle sind oft auf einfache rundenbasierte Anwendungen beschränkt, da dies die Verwaltung der an den onchain Vertrag gebundenen Gelder erleichtert. Auch bei einer begrenzten Anzahl von Parteien, die den Zustand der offchain Anwendung in Intervallen aktualisieren, ist die Bestrafung unehrlichen Verhaltens relativ unkompliziert.

Die Effizienz einer Zustandskanal-Anwendung hängt auch von ihrem Design ab. Zum Beispiel könnte ein Entwickler den App-Kanalvertrag einmal onchain bereitstellen und anderen Spielern erlauben, die App wiederzuverwenden, ohne onchain gehen zu müssen. In diesem Fall dient der anfängliche App-Kanal als Ledger-Kanal, der mehrere virtuelle Kanäle unterstützt, von denen jeder eine neue Instanz des Smart Contracts der App offchain ausführt.

Ein potenzieller Anwendungsfall für Zustandskanal-Anwendungen sind einfache Zwei-Spieler-Spiele, bei denen Gelder basierend auf dem Spielergebnis verteilt werden. Der Vorteil hierbei ist, dass die Spieler einander nicht vertrauen müssen (Vertrauenslosigkeit) und der onchain Vertrag, nicht die Spieler, die Zuweisung von Geldern und die Beilegung von Streitigkeiten kontrolliert (Dezentralisierung).

Weitere mögliche Anwendungsfälle für Zustandskanal-Apps umfassen den Besitz von ENS-Namen, NFT-Ledger und viele mehr.

### Atomare Überweisungen {#atomic-transfers}

Frühe Zahlungskanäle waren auf Überweisungen zwischen zwei Parteien beschränkt, was ihre Nutzbarkeit einschränkte. Die Einführung virtueller Kanäle ermöglichte es Einzelpersonen jedoch, Überweisungen über Vermittler (d. h. mehrere P2P-Kanäle) zu leiten, ohne einen neuen Kanal onchain öffnen zu müssen.

Allgemein als "Multi-Hop-Überweisungen" beschrieben, sind geroutete Zahlungen atomar (d. h. entweder sind alle Teile der Transaktion erfolgreich oder sie schlägt insgesamt fehl). Atomare Überweisungen verwenden [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts), um sicherzustellen, dass die Zahlung nur freigegeben wird, wenn bestimmte Bedingungen erfüllt sind, wodurch das Kontrahentenrisiko verringert wird.

## Nachteile der Nutzung von Zustandskanälen {#drawbacks-of-state-channels}

### Annahmen zur Lebendigkeit (Liveness) {#liveness-assumptions}

Um Effizienz zu gewährleisten, setzen Zustandskanäle zeitliche Begrenzungen für die Fähigkeit der Kanalteilnehmer, auf Streitigkeiten zu reagieren. Diese Regel geht davon aus, dass Peers immer online sind, um die Kanalaktivität zu überwachen und Anfechtungen bei Bedarf zu bestreiten.

In der Realität können Benutzer aus Gründen, die außerhalb ihrer Kontrolle liegen (z. B. schlechte Internetverbindung, mechanisches Versagen usw.), offline gehen. Wenn ein ehrlicher Benutzer offline geht, kann ein böswilliger Peer die Situation ausnutzen, indem er dem Schiedsrichtervertrag alte Zwischenzustände präsentiert und die gebundenen Gelder stiehlt.

Einige Kanäle verwenden "Watchtowers" (Wachtürme) – Entitäten, die dafür verantwortlich sind, onchain Streitbeilegungsereignisse im Namen anderer zu beobachten und notwendige Maßnahmen zu ergreifen, wie z. B. die Alarmierung der betroffenen Parteien. Dies kann jedoch die Kosten für die Nutzung eines Zustandskanals erhöhen.

### Datenunverfügbarkeit {#data-unavailability}

Wie zuvor erklärt, erfordert die Anfechtung eines ungültigen Streits die Präsentation des neuesten, gültigen Zustands des Zustandskanals. Dies ist eine weitere Regel, die auf einer Annahme basiert – dass Benutzer Zugriff auf den neuesten Zustand des Kanals haben.

Obwohl die Erwartung, dass Kanalbenutzer Kopien des Zustands der offchain Anwendung speichern, vernünftig ist, können diese Daten durch Fehler oder mechanisches Versagen verloren gehen. Wenn der Benutzer die Daten nicht gesichert hat, kann er nur hoffen, dass die andere Partei keine ungültige Austrittsanfrage unter Verwendung alter Zustandsübergänge in ihrem Besitz endgültig macht.

Ethereum-Benutzer müssen sich nicht mit diesem Problem auseinandersetzen, da das Netzwerk Regeln zur Datenverfügbarkeit durchsetzt. Transaktionsdaten werden von allen Knoten gespeichert und verbreitet und stehen den Benutzern bei Bedarf zum Herunterladen zur Verfügung.

### Liquiditätsprobleme {#liquidity-issues}

Um einen Blockchain-Kanal einzurichten, müssen die Teilnehmer Gelder in einem onchain Smart Contract für den Lebenszyklus des Kanals sperren. Dies reduziert die Liquidität der Kanalbenutzer und beschränkt Kanäle auch auf diejenigen, die es sich leisten können, Gelder im Mainnet gesperrt zu halten.

Ledger-Kanäle – betrieben von einem Offchain Service Provider (OSP) – können jedoch Liquiditätsprobleme für Benutzer reduzieren. Zwei Peers, die mit einem Ledger-Kanal verbunden sind, können einen virtuellen Kanal erstellen, den sie jederzeit vollständig offchain öffnen und endgültig machen können.

Offchain Service Provider könnten auch Kanäle mit mehreren Peers öffnen, was sie nützlich für das Routing von Zahlungen macht. Natürlich müssen Benutzer Gebühren an OSPs für ihre Dienste zahlen, was für einige unerwünscht sein könnte.

### Griefing-Angriffe {#griefing-attacks}

Griefing-Angriffe sind ein häufiges Merkmal von Systemen, die auf Betrugsnachweisen basieren. Ein Griefing-Angriff nützt dem Angreifer nicht direkt, verursacht aber dem Opfer Kummer (d. h. Schaden), daher der Name.

Der Betrugsnachweis ist anfällig für Griefing-Angriffe, da die ehrliche Partei auf jeden Streitfall reagieren muss, selbst auf ungültige, oder riskiert, ihre Gelder zu verlieren. Ein böswilliger Teilnehmer kann beschließen, wiederholt veraltete Zustandsübergänge onchain zu veröffentlichen, was die ehrliche Partei zwingt, mit dem gültigen Zustand zu antworten. Die Kosten für diese onchain Transaktionen können sich schnell summieren, was dazu führt, dass ehrliche Parteien dabei den Kürzeren ziehen.

### Vordefinierte Teilnehmergruppen {#predefined-participant-sets}

Konstruktionsbedingt bleibt die Anzahl der Teilnehmer, die einen Zustandskanal bilden, während seiner gesamten Lebensdauer fest. Dies liegt daran, dass die Aktualisierung der Teilnehmergruppe den Betrieb des Kanals verkomplizieren würde, insbesondere bei der Finanzierung des Kanals oder der Beilegung von Streitigkeiten. Das Hinzufügen oder Entfernen von Teilnehmern würde auch zusätzliche onchain Aktivitäten erfordern, was den Mehraufwand für die Benutzer erhöht.

Während dies das Verständnis von Zustandskanälen erleichtert, schränkt es die Nützlichkeit von Kanaldesigns für Anwendungsentwickler ein. Dies erklärt teilweise, warum Zustandskanäle zugunsten anderer Skalierungslösungen, wie Rollups, aufgegeben wurden.

### Parallele Transaktionsverarbeitung {#parallel-transaction-processing}

Teilnehmer im Zustandskanal senden Zustandsaktualisierungen abwechselnd, weshalb sie am besten für "rundenbasierte Anwendungen" (z. B. ein Zwei-Spieler-Schachspiel) funktionieren. Dies eliminiert die Notwendigkeit, gleichzeitige Zustandsaktualisierungen zu handhaben, und reduziert die Arbeit, die der onchain Vertrag leisten muss, um Poster veralteter Aktualisierungen zu bestrafen. Ein Nebeneffekt dieses Designs ist jedoch, dass Transaktionen voneinander abhängig sind, was die Latenz erhöht und das allgemeine Benutzererlebnis verschlechtert.

Einige Zustandskanäle lösen dieses Problem durch die Verwendung eines "Vollduplex"-Designs, das den offchain Zustand in zwei unidirektionale "Simplex"-Zustände trennt, was gleichzeitige Zustandsaktualisierungen ermöglicht. Solche Designs verbessern den offchain Transaktionsdurchsatz und verringern Transaktionsverzögerungen.

## Zustandskanäle nutzen {#use-state-channels}

Mehrere Projekte bieten Implementierungen von Zustandskanälen an, die Sie in Ihre Dapps integrieren können:

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Weiterführende Literatur {#further-reading}

**Zustandskanäle**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12. Feb. 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _6. Nov. 2015 - Jeff Coleman_
- [Basics of State Channels](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_