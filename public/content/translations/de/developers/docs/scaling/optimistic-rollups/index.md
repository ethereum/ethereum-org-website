---
title: Optimistic Rollups
description: "Eine Einführung in Optimistic Rollups – eine Skalierungslösung, die von der Ethereum-Community verwendet wird."
lang: de
---

Optimistic Rollups sind Protokolle der Ebene 2 (L2), die entwickelt wurden, um den Durchsatz der Ethereum-Basisebene zu erweitern. Sie reduzieren die Rechenleistung auf der Haupt-[Ethereum](/)-Blockchain, indem sie Transaktionen Off-Chain verarbeiten, was erhebliche Verbesserungen der Verarbeitungsgeschwindigkeiten bietet. Im Gegensatz zu anderen Skalierungslösungen wie [Sidechains](/developers/docs/scaling/sidechains/) leiten Optimistic Rollups ihre Sicherheit vom Mainnet ab, indem sie Transaktionsergebnisse auf der Blockchain veröffentlichen, oder [Plasma-Chains](/developers/docs/scaling/plasma/), die ebenfalls Transaktionen auf Ethereum mit Betrugsnachweisen verifizieren, aber Transaktionsdaten woanders speichern.

Da die Berechnung der langsame und teure Teil der Nutzung von Ethereum ist, können Optimistic Rollups eine bis zu 10- bis 100-fache Verbesserung der Skalierung bieten. Optimistic Rollups schreiben Transaktionen auch als `calldata` oder in [Blobs](/roadmap/danksharding/) auf Ethereum, was die Gaskosten für Benutzer senkt.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten über [Ethereum-Skalierung](/developers/docs/scaling/) und [Ebene 2](/layer-2/) gelesen und verstanden haben.

## Was ist ein Optimistic Rollup? {#what-is-an-optimistic-rollup}

Ein Optimistic Rollup ist ein Ansatz zur Skalierung von Ethereum, der die Verlagerung von Berechnungen und Zustandsspeicherung Off-Chain beinhaltet. Optimistic Rollups führen Transaktionen außerhalb von Ethereum aus, veröffentlichen aber Transaktionsdaten als `calldata` oder in [Blobs](/roadmap/danksharding/) im Mainnet.

Betreiber von Optimistic Rollups bündeln mehrere Off-Chain-Transaktionen in großen Stapeln (Batches), bevor sie diese an Ethereum übermitteln. Dieser Ansatz ermöglicht es, Fixkosten auf mehrere Transaktionen in jedem Stapel zu verteilen, was die Gebühren für Endbenutzer senkt. Optimistic Rollups verwenden auch Komprimierungstechniken, um die Datenmenge zu reduzieren, die auf Ethereum veröffentlicht wird.

Optimistic Rollups gelten als „optimistisch“, da sie davon ausgehen, dass Off-Chain-Transaktionen gültig sind, und keine Validitätsnachweise für Transaktionsstapel veröffentlichen, die auf der Blockchain gepostet werden. Dies unterscheidet Optimistic Rollups von [Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups), die kryptografische [Validitätsnachweise](/glossary/#validity-proof) für Off-Chain-Transaktionen veröffentlichen.

Optimistic Rollups verlassen sich stattdessen auf ein Betrugsnachweis-Schema, um Fälle zu erkennen, in denen Transaktionen nicht korrekt berechnet wurden. Nachdem ein Rollup-Stapel auf Ethereum übermittelt wurde, gibt es ein Zeitfenster (die sogenannte Anfechtungsfrist), in dem jeder die Ergebnisse einer Rollup-Transaktion anfechten kann, indem er einen [Betrugsnachweis](/glossary/#fraud-proof) berechnet.

Wenn der Betrugsnachweis erfolgreich ist, führt das Rollup-Protokoll die Transaktion(en) erneut aus und aktualisiert den Zustand des Rollups entsprechend. Der andere Effekt eines erfolgreichen Betrugsnachweises ist, dass der Sequencer, der für die Aufnahme der falsch ausgeführten Transaktion in einen Block verantwortlich ist, eine Strafe erhält.

Wenn der Rollup-Stapel nach Ablauf der Anfechtungsfrist unangefochten bleibt (d. h. alle Transaktionen wurden korrekt ausgeführt), gilt er als gültig und wird auf Ethereum akzeptiert. Andere können weiterhin auf einem unbestätigten Rollup-Block aufbauen, jedoch mit einem Vorbehalt: Transaktionsergebnisse werden rückgängig gemacht, wenn sie auf einer zuvor veröffentlichten, falsch ausgeführten Transaktion basieren.

## Wie interagieren Optimistic Rollups mit Ethereum? {#optimistic-rollups-and-Ethereum}

Optimistic Rollups sind [Off-Chain-Skalierungslösungen](/developers/docs/scaling/#offchain-scaling), die entwickelt wurden, um auf Ethereum zu operieren. Jedes Optimistic Rollup wird von einer Reihe von Smart Contracts verwaltet, die im Ethereum-Netzwerk bereitgestellt werden. Optimistic Rollups verarbeiten Transaktionen außerhalb der Haupt-Ethereum-Blockchain, veröffentlichen jedoch Off-Chain-Transaktionen (in Stapeln) an einen Rollup-Vertrag auf der Blockchain. Wie die Ethereum-Blockchain ist dieser Transaktionsdatensatz unveränderlich und bildet die „Optimistic Rollup-Chain“.

Die Architektur eines Optimistic Rollups umfasst die folgenden Teile:

**Verträge auf der Blockchain**: Der Betrieb des Optimistic Rollups wird durch Smart Contracts gesteuert, die auf Ethereum ausgeführt werden. Dazu gehören Verträge, die Rollup-Blöcke speichern, Zustandsaktualisierungen auf dem Rollup überwachen und Benutzereinzahlungen verfolgen. In diesem Sinne dient Ethereum als Basisebene oder „Ebene 1“ für Optimistic Rollups.

**Off-Chain Virtual Machine (VM)**: Obwohl die Verträge, die das Optimistic Rollup-Protokoll verwalten, auf Ethereum ausgeführt werden, führt das Rollup-Protokoll Berechnungen und Zustandsspeicherung auf einer anderen virtuellen Maschine durch, die von der [Ethereum Virtual Machine](/developers/docs/evm/) getrennt ist. Die Off-Chain-VM ist der Ort, an dem Anwendungen leben und Zustandsänderungen ausgeführt werden; sie dient als obere Ebene oder „Ebene 2“ für ein Optimistic Rollup.

Da Optimistic Rollups darauf ausgelegt sind, Programme auszuführen, die entweder für die EVM geschrieben oder kompiliert wurden, integriert die Off-Chain-VM viele EVM-Designspezifikationen. Zusätzlich ermöglichen auf der Blockchain berechnete Betrugsnachweise dem Ethereum-Netzwerk, die Gültigkeit von Zustandsänderungen durchzusetzen, die in der Off-Chain-VM berechnet wurden.

Optimistic Rollups werden als „hybride Skalierungslösungen“ beschrieben, da sie zwar als separate Protokolle existieren, ihre Sicherheitseigenschaften jedoch von Ethereum abgeleitet sind. Unter anderem garantiert Ethereum die Korrektheit der Off-Chain-Berechnung eines Rollups und die Verfügbarkeit der Daten hinter der Berechnung. Dies macht Optimistic Rollups sicherer als reine Off-Chain-Skalierungsprotokolle (z. B. [Sidechains](/developers/docs/scaling/sidechains/)), die sich für die Sicherheit nicht auf Ethereum verlassen.

Optimistic Rollups verlassen sich für Folgendes auf das Haupt-Ethereum-Protokoll:

### Datenverfügbarkeit {#data-availability}

Wie bereits erwähnt, veröffentlichen Optimistic Rollups Transaktionsdaten als `calldata` oder [Blobs](/roadmap/danksharding/) auf Ethereum. Da die Ausführung der Rollup-Chain auf übermittelten Transaktionen basiert, kann jeder diese Informationen – verankert auf der Basisebene von Ethereum – verwenden, um den Zustand des Rollups auszuführen und die Korrektheit von Zustandsübergängen zu überprüfen.

[Datenverfügbarkeit](/developers/docs/data-availability/) ist von entscheidender Bedeutung, da Herausforderer ohne Zugriff auf Zustandsdaten keine Betrugsnachweise erstellen können, um ungültige Rollup-Operationen anzufechten. Da Ethereum die Datenverfügbarkeit sicherstellt, wird das Risiko verringert, dass Rollup-Betreiber mit böswilligen Handlungen (z. B. dem Übermitteln ungültiger Blöcke) davonkommen.

### Zensurresistenz {#censorship-resistance}

Optimistic Rollups verlassen sich auch auf Ethereum für die Zensurresistenz. In einem Optimistic Rollup ist eine zentralisierte Entität (der Betreiber) für die Verarbeitung von Transaktionen und die Übermittlung von Rollup-Blöcken an Ethereum verantwortlich. Dies hat einige Auswirkungen:

- Rollup-Betreiber können Benutzer zensieren, indem sie komplett offline gehen oder sich weigern, Blöcke zu produzieren, die bestimmte Transaktionen enthalten.

- Rollup-Betreiber können Benutzer daran hindern, im Rollup-Vertrag eingezahlte Gelder abzuheben, indem sie Zustandsdaten zurückhalten, die für Merkle-Eigentumsnachweise erforderlich sind. Das Zurückhalten von Zustandsdaten kann auch den Zustand des Rollups vor Benutzern verbergen und sie daran hindern, mit dem Rollup zu interagieren.

Optimistic Rollups lösen dieses Problem, indem sie Betreiber zwingen, Daten im Zusammenhang mit Zustandsaktualisierungen auf Ethereum zu veröffentlichen. Die Veröffentlichung von Rollup-Daten auf der Blockchain hat folgende Vorteile:

- Wenn ein Betreiber eines Optimistic Rollups offline geht oder aufhört, Transaktionsstapel zu produzieren, kann ein anderer Blockchain-Knoten verfügbare Daten verwenden, um den letzten Zustand des Rollups zu reproduzieren und die Blockproduktion fortzusetzen.

- Benutzer können Transaktionsdaten verwenden, um Merkle-Nachweise zu erstellen, die das Eigentum an Geldern belegen, und ihre Vermögenswerte aus dem Rollup abheben.

- Benutzer können ihre Transaktionen auch auf L1 anstatt an den Sequencer übermitteln. In diesem Fall muss der Sequencer die Transaktion innerhalb eines bestimmten Zeitlimits einschließen, um weiterhin gültige Blöcke zu produzieren.

### Abwicklung (Settlement) {#settlement}

Eine weitere Rolle, die Ethereum im Kontext von Optimistic Rollups spielt, ist die einer Abwicklungsebene (Settlement Layer). Eine Abwicklungsebene verankert das gesamte Blockchain-Ökosystem, stellt Sicherheit her und bietet objektive Finalität, falls auf einer anderen Chain (in diesem Fall Optimistic Rollups) ein Streitfall auftritt, der eine Schlichtung erfordert.

Das Ethereum-Mainnet bietet einen Knotenpunkt für Optimistic Rollups, um Betrugsnachweise zu verifizieren und Streitigkeiten beizulegen. Darüber hinaus sind Transaktionen, die auf dem Rollup durchgeführt werden, erst dann endgültig, _nachdem_ der Rollup-Block auf Ethereum akzeptiert wurde. Sobald eine Rollup-Transaktion auf der Basisebene von Ethereum festgeschrieben ist, kann sie nicht mehr rückgängig gemacht werden (außer im höchst unwahrscheinlichen Fall einer Chain-Reorganisation).

## Wie funktionieren Optimistic Rollups? {#how-optimistic-rollups-work}

### Transaktionsausführung und -aggregation {#transaction-execution-and-aggregation}

Benutzer übermitteln Transaktionen an „Betreiber“, das sind Blockchain-Knoten, die für die Verarbeitung von Transaktionen auf dem Optimistic Rollup verantwortlich sind. Auch als „Validator“ oder „Aggregator“ bekannt, aggregiert der Betreiber Transaktionen, komprimiert die zugrunde liegenden Daten und veröffentlicht den Block auf Ethereum.

Obwohl jeder ein Validator werden kann, müssen Validatoren von Optimistic Rollups eine Kaution hinterlegen, bevor sie Blöcke produzieren, ähnlich wie bei einem [Proof-of-Stake-System](/developers/docs/consensus-mechanisms/pos/). Diese Kaution kann durch Slashing gekürzt werden, wenn der Validator einen ungültigen Block postet oder auf einem alten, aber ungültigen Block aufbaut (selbst wenn sein eigener Block gültig ist). Auf diese Weise nutzen Optimistic Rollups kryptoökonomische Anreize, um sicherzustellen, dass Validatoren ehrlich handeln.

Von anderen Validatoren auf der Optimistic Rollup-Chain wird erwartet, dass sie die übermittelten Transaktionen mit ihrer Kopie des Rollup-Zustands ausführen. Wenn sich der Endzustand eines Validators von dem vom Betreiber vorgeschlagenen Zustand unterscheidet, kann er eine Anfechtung starten und einen Betrugsnachweis berechnen.

Einige Optimistic Rollups verzichten möglicherweise auf ein erlaubnisfreies Validator-System und verwenden einen einzigen „Sequencer“, um die Chain auszuführen. Wie ein Validator verarbeitet der Sequencer Transaktionen, produziert Rollup-Blöcke und übermittelt Rollup-Transaktionen an die L1-Chain (Ethereum).

Der Sequencer unterscheidet sich von einem regulären Rollup-Betreiber, da er eine größere Kontrolle über die Reihenfolge der Transaktionen hat. Außerdem hat der Sequencer vorrangigen Zugriff auf die Rollup-Chain und ist die einzige Entität, die berechtigt ist, Transaktionen an den Vertrag auf der Blockchain zu übermitteln. Transaktionen von Nicht-Sequencer-Knoten oder regulären Benutzern werden einfach in einem separaten Posteingang in die Warteschlange gestellt, bis der Sequencer sie in einen neuen Stapel aufnimmt.

#### Übermittlung von Rollup-Blöcken an Ethereum {#submitting-blocks-to-ethereum}

Wie bereits erwähnt, bündelt der Betreiber eines Optimistic Rollups Off-Chain-Transaktionen in einem Stapel und sendet ihn zur Beglaubigung an Ethereum. Dieser Prozess beinhaltet die Komprimierung transaktionsbezogener Daten und deren Veröffentlichung auf Ethereum als `calldata` oder in Blobs.

`calldata` ist ein nicht modifizierbarer, nicht persistenter Bereich in einem Smart Contract, der sich größtenteils wie [Speicher (Memory)](/developers/docs/smart-contracts/anatomy/#memory) verhält. Während `calldata` auf der Blockchain als Teil der [Verlaufsprotokolle](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) der Blockchain verbleibt, wird es nicht als Teil des Zustands von Ethereum gespeichert. Da `calldata` keinen Teil des Zustands von Ethereum berührt, ist es günstiger als der Zustand, um Daten auf der Blockchain zu speichern.

Das Schlüsselwort `calldata` wird in Solidity auch verwendet, um Argumente zur Ausführungszeit an eine Smart Contract-Funktion zu übergeben. `calldata` identifiziert die Funktion, die während einer Transaktion aufgerufen wird, und enthält Eingaben für die Funktion in Form einer beliebigen Bytefolge.

Im Kontext von Optimistic Rollups wird `calldata` verwendet, um komprimierte Transaktionsdaten an den Vertrag auf der Blockchain zu senden. Der Rollup-Betreiber fügt einen neuen Stapel hinzu, indem er die erforderliche Funktion im Rollup-Vertrag aufruft und die komprimierten Daten als Funktionsargumente übergibt. Die Verwendung von `calldata` senkt die Benutzergebühren, da die meisten Kosten, die Rollups verursachen, aus der Speicherung von Daten auf der Blockchain resultieren.

Hier ist [ein Beispiel](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) für die Übermittlung eines Rollup-Stapels, um zu zeigen, wie dieses Konzept funktioniert. Der Sequencer rief die Methode `appendSequencerBatch()` auf und übergab die komprimierten Transaktionsdaten als Eingaben unter Verwendung von `calldata`.

Einige Rollups verwenden nun Blobs, um Transaktionsstapel auf Ethereum zu posten.

Blobs sind nicht modifizierbar und nicht persistent (genau wie `calldata`), werden aber nach ca. 18 Tagen aus dem Verlauf gelöscht. Weitere Informationen zu Blobs finden Sie unter [Danksharding](/roadmap/danksharding).

### Zustandsverpflichtungen (State Commitments) {#state-commitments}

Zu jedem Zeitpunkt ist der Zustand des Optimistic Rollups (Konten, Salden, Vertragscode usw.) als [Merkle-Baum](/whitepaper/#merkle-trees) organisiert, der als „Zustandsbaum“ (State Tree) bezeichnet wird. Die Wurzel dieses Merkle-Baums (State Root), die auf den neuesten Zustand des Rollups verweist, wird gehasht und im Rollup-Vertrag gespeichert. Jeder Zustandsübergang auf der Chain erzeugt einen neuen Rollup-Zustand, zu dem sich ein Betreiber verpflichtet, indem er eine neue State Root berechnet.

Der Betreiber ist verpflichtet, beim Posten von Stapeln sowohl alte als auch neue State Roots zu übermitteln. Wenn die alte State Root mit der vorhandenen State Root im Vertrag auf der Blockchain übereinstimmt, wird letztere verworfen und durch die neue State Root ersetzt.

Der Rollup-Betreiber ist außerdem verpflichtet, eine Merkle-Wurzel für den Transaktionsstapel selbst zu übergeben. Dies ermöglicht es jedem, die Aufnahme einer Transaktion in den Stapel (auf L1) zu beweisen, indem er einen [Merkle-Nachweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) vorlegt.

Zustandsverpflichtungen, insbesondere State Roots, sind notwendig, um die Korrektheit von Zustandsänderungen in einem Optimistic Rollup zu beweisen. Der Rollup-Vertrag akzeptiert neue State Roots von Betreibern unmittelbar nach deren Veröffentlichung, kann aber später ungültige State Roots löschen, um das Rollup in seinen korrekten Zustand zurückzuversetzen.

### Betrugsnachweise {#fraud-proving}

Wie erklärt, ermöglichen Optimistic Rollups jedem, Blöcke zu veröffentlichen, ohne Validitätsnachweise zu erbringen. Um jedoch sicherzustellen, dass die Chain sicher bleibt, legen Optimistic Rollups ein Zeitfenster fest, in dem jeder einen Zustandsübergang anfechten kann. Daher werden Rollup-Blöcke als „Behauptungen“ (Assertions) bezeichnet, da jeder ihre Gültigkeit anfechten kann.

Wenn jemand eine Behauptung anficht, initiiert das Rollup-Protokoll die Berechnung des Betrugsnachweises. Jede Art von Betrugsnachweis ist interaktiv – jemand muss eine Behauptung aufstellen, bevor eine andere Person sie anfechten kann. Der Unterschied liegt darin, wie viele Interaktionsrunden erforderlich sind, um den Betrugsnachweis zu berechnen.

Interaktive Nachweisschemata mit einer einzigen Runde spielen angefochtene Transaktionen auf L1 erneut ab, um ungültige Behauptungen zu erkennen. Das Rollup-Protokoll emuliert die erneute Ausführung der angefochtenen Transaktion auf L1 (Ethereum) mithilfe eines Verifizierungsvertrags, wobei die berechnete State Root bestimmt, wer die Anfechtung gewinnt. Wenn die Behauptung des Herausforderers über den korrekten Zustand des Rollups richtig ist, wird der Betreiber bestraft, indem seine Kaution durch Slashing gekürzt wird.

Die erneute Ausführung von Transaktionen auf L1 zur Erkennung von Betrug erfordert jedoch die Veröffentlichung von Zustandsverpflichtungen für einzelne Transaktionen und erhöht die Datenmenge, die Rollups auf der Blockchain veröffentlichen müssen. Das erneute Abspielen von Transaktionen verursacht zudem erhebliche Gaskosten. Aus diesen Gründen wechseln Optimistic Rollups zu mehrrundigen interaktiven Nachweisen, die dasselbe Ziel (d. h. die Erkennung ungültiger Rollup-Operationen) mit höherer Effizienz erreichen.

#### Mehrrundige interaktive Nachweise {#multi-round-interactive-proving}

Mehrrundige interaktive Nachweise beinhalten ein Hin-und-Her-Protokoll zwischen dem Behauptenden und dem Herausforderer, das von einem L1-Verifizierungsvertrag überwacht wird, der letztendlich entscheidet, welche Partei lügt. Nachdem ein L2-Knoten eine Behauptung angefochten hat, muss der Behauptende die umstrittene Behauptung in zwei gleiche Hälften teilen. Jede einzelne Behauptung in diesem Fall enthält genauso viele Berechnungsschritte wie die andere.

Der Herausforderer wählt dann aus, welche Behauptung er anfechten möchte. Der Teilungsprozess (als „Bisektionsprotokoll“ bezeichnet) wird fortgesetzt, bis beide Parteien eine Behauptung über einen _einzigen_ Ausführungsschritt anfechten. An diesem Punkt wird der L1-Vertrag den Streit beilegen, indem er die Anweisung (und ihr Ergebnis) auswertet, um die betrügerische Partei zu überführen.

Der Behauptende muss einen „Ein-Schritt-Nachweis“ erbringen, der die Gültigkeit der umstrittenen Ein-Schritt-Berechnung verifiziert. Wenn der Behauptende den Ein-Schritt-Nachweis nicht erbringt oder der L1-Verifizierer den Nachweis für ungültig hält, verliert er die Anfechtung.

Einige Anmerkungen zu dieser Art von Betrugsnachweis:

1. Mehrrundige interaktive Betrugsnachweise gelten als effizient, da sie die Arbeit minimieren, die die L1-Chain bei der Streitschlichtung leisten muss. Anstatt die gesamte Transaktion erneut abzuspielen, muss die L1-Chain nur einen Schritt in der Ausführung des Rollups erneut ausführen.

2. Bisektionsprotokolle reduzieren die Datenmenge, die auf der Blockchain gepostet wird (es müssen keine Zustandsverpflichtungen für jede Transaktion veröffentlicht werden). Außerdem sind Transaktionen von Optimistic Rollups nicht durch das Gaslimit von Ethereum eingeschränkt. Umgekehrt müssen Optimistic Rollups, die Transaktionen erneut ausführen, sicherstellen, dass eine L2-Transaktion ein niedrigeres Gaslimit hat, um ihre Ausführung innerhalb einer einzigen Ethereum-Transaktion zu emulieren.

3. Ein Teil der Kaution des böswilligen Behauptenden wird dem Herausforderer zugesprochen, während der andere Teil verbrannt wird. Das Verbrennen verhindert Absprachen zwischen Validatoren; wenn zwei Validatoren zusammenarbeiten, um gefälschte Anfechtungen zu initiieren, verlieren sie dennoch einen beträchtlichen Teil des gesamten Einsatzes.

4. Mehrrundige interaktive Nachweise erfordern, dass beide Parteien (der Behauptende und der Herausforderer) innerhalb des angegebenen Zeitfensters handeln. Ein Versäumnis, vor Ablauf der Frist zu handeln, führt dazu, dass die säumige Partei die Anfechtung verliert.

#### Warum Betrugsnachweise für Optimistic Rollups wichtig sind {#fraud-proof-benefits}

Betrugsnachweise sind wichtig, da sie eine _vertrauenslose Finalität_ in Optimistic Rollups ermöglichen. Vertrauenslose Finalität ist eine Eigenschaft von Optimistic Rollups, die garantiert, dass eine Transaktion – solange sie gültig ist – letztendlich bestätigt wird.

Böswillige Blockchain-Knoten können versuchen, die Bestätigung eines gültigen Rollup-Blocks zu verzögern, indem sie falsche Anfechtungen starten. Betrugsnachweise werden jedoch letztendlich die Gültigkeit des Rollup-Blocks beweisen und dazu führen, dass er bestätigt wird.

Dies bezieht sich auch auf eine weitere Sicherheitseigenschaft von Optimistic Rollups: Die Gültigkeit der Chain beruht auf der Existenz _eines_ ehrlichen Blockchain-Knotens. Der ehrliche Knoten kann die Chain korrekt vorantreiben, indem er entweder gültige Behauptungen postet oder ungültige Behauptungen anficht. In jedem Fall werden böswillige Knoten, die in Streitigkeiten mit dem ehrlichen Knoten geraten, ihre Einsätze während des Betrugsnachweisprozesses verlieren.

### L1/L2-Interoperabilität {#l1-l2-interoperability}

Optimistic Rollups sind für die Interoperabilität mit dem Ethereum-Mainnet konzipiert und ermöglichen es Benutzern, Nachrichten und beliebige Daten zwischen L1 und L2 zu übertragen. Sie sind auch mit der EVM kompatibel, sodass Sie bestehende [Dapps](/developers/docs/dapps/) auf Optimistic Rollups portieren oder neue Dapps mit Ethereum-Entwicklungstools erstellen können.

#### 1. Bewegung von Vermögenswerten {#asset-movement}

##### Eintritt in das Rollup

Um ein Optimistic Rollup zu nutzen, zahlen Benutzer ETH, ERC-20-Token und andere akzeptierte Vermögenswerte in den Vertrag der [kettenübergreifenden Brücke](/developers/docs/bridges/) des Rollups auf L1 ein. Der Brückenvertrag leitet die Transaktion an L2 weiter, wo eine entsprechende Menge an Vermögenswerten geprägt und an die vom Benutzer gewählte Adresse auf dem Optimistic Rollup gesendet wird.

Benutzergenerierte Transaktionen (wie eine L1 > L2-Einzahlung) werden normalerweise in die Warteschlange gestellt, bis der Sequencer sie erneut an den Rollup-Vertrag übermittelt. Um jedoch die Zensurresistenz zu wahren, ermöglichen Optimistic Rollups Benutzern, eine Transaktion direkt an den Rollup-Vertrag auf der Blockchain zu übermitteln, wenn sie über die maximal zulässige Zeit hinaus verzögert wurde.

Einige Optimistic Rollups verfolgen einen direkteren Ansatz, um zu verhindern, dass Sequencer Benutzer zensieren. Hier wird ein Block durch alle Transaktionen definiert, die seit dem vorherigen Block an den L1-Vertrag übermittelt wurden (z. B. Einzahlungen), zusätzlich zu den auf der Rollup-Chain verarbeiteten Transaktionen. Wenn ein Sequencer eine L1-Transaktion ignoriert, veröffentlicht er die (nachweislich) falsche State Root; daher können Sequencer benutzergenerierte Nachrichten nicht verzögern, sobald sie auf L1 gepostet wurden.

##### Verlassen des Rollups

Das Abheben von einem Optimistic Rollup zu Ethereum ist aufgrund des Betrugsnachweisschemas schwieriger. Wenn ein Benutzer eine L2 > L1-Transaktion initiiert, um auf L1 treuhänderisch verwahrte Gelder abzuheben, muss er warten, bis die Anfechtungsfrist – die etwa sieben Tage dauert – abgelaufen ist. Dennoch ist der Abhebungsprozess selbst ziemlich unkompliziert.

Nachdem die Abhebungsanforderung auf dem L2-Rollup initiiert wurde, wird die Transaktion in den nächsten Stapel aufgenommen, während die Vermögenswerte des Benutzers auf dem Rollup verbrannt werden. Sobald der Stapel auf Ethereum veröffentlicht ist, kann der Benutzer einen Merkle-Nachweis berechnen, der die Aufnahme seiner Exit-Transaktion in den Block verifiziert. Dann geht es nur noch darum, die Verzögerungszeit abzuwarten, um die Transaktion auf L1 zu finalisieren und Gelder auf das Mainnet abzuheben.

Um nicht eine Woche warten zu müssen, bevor Gelder auf Ethereum abgehoben werden, können Benutzer von Optimistic Rollups einen **Liquiditätsanbieter** (Liquidity Provider, LP) einsetzen. Ein Liquiditätsanbieter übernimmt das Eigentum an einer ausstehenden L2-Abhebung und bezahlt den Benutzer auf L1 (gegen eine Gebühr).

Liquiditätsanbieter können die Gültigkeit der Abhebungsanforderung des Benutzers überprüfen (indem sie die Chain selbst ausführen), bevor sie Gelder freigeben. Auf diese Weise haben sie die Gewissheit, dass die Transaktion letztendlich bestätigt wird (d. h. vertrauenslose Finalität).

#### 2. EVM-Kompatibilität {#evm-compatibility}

Für Entwickler ist der Vorteil von Optimistic Rollups ihre Kompatibilität – oder besser noch, Äquivalenz – mit der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). EVM-kompatible Rollups entsprechen den Spezifikationen im [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) und unterstützen die EVM auf Bytecode-Ebene.

Die EVM-Kompatibilität in Optimistic Rollups hat folgende Vorteile:

i. Entwickler können bestehende Smart Contracts auf Ethereum auf Optimistic Rollup-Chains migrieren, ohne Codebasen umfassend ändern zu müssen. Dies kann Entwicklungsteams Zeit sparen, wenn sie Ethereum-Smart Contracts auf L2 bereitstellen.

ii. Entwickler und Projektteams, die Optimistic Rollups verwenden, können die Infrastruktur von Ethereum nutzen. Dazu gehören Programmiersprachen, Codebibliotheken, Testwerkzeuge, Client-Software, Bereitstellungsinfrastruktur und so weiter.

Die Verwendung vorhandener Tools ist wichtig, da diese Tools im Laufe der Jahre umfassend geprüft, debuggt und verbessert wurden. Es beseitigt auch die Notwendigkeit für Ethereum-Entwickler, zu lernen, wie man mit einem völlig neuen Entwicklungs-Stack baut.

#### 3. Kettenübergreifende Vertragsaufrufe {#cross-chain-contract-calls}

Benutzer (Extern verwaltete Konten) interagieren mit L2-Verträgen, indem sie eine Transaktion an den Rollup-Vertrag übermitteln oder dies von einem Sequencer oder Validator für sie erledigen lassen. Optimistic Rollups ermöglichen es auch Vertragskonten auf Ethereum, mit L2-Verträgen zu interagieren, indem sie Brückenverträge verwenden, um Nachrichten weiterzuleiten und Daten zwischen L1 und L2 zu übertragen. Das bedeutet, dass Sie einen L1-Vertrag im Ethereum-Mainnet so programmieren können, dass er Funktionen aufruft, die zu Verträgen auf einem L2-Optimistic Rollup gehören.

Kettenübergreifende Vertragsaufrufe erfolgen asynchron – das bedeutet, der Aufruf wird zuerst initiiert und dann zu einem späteren Zeitpunkt ausgeführt. Dies unterscheidet sich von Aufrufen zwischen zwei Verträgen auf Ethereum, bei denen der Aufruf sofort Ergebnisse liefert.

Ein Beispiel für einen kettenübergreifenden Vertragsaufruf ist die zuvor beschriebene Token-Einzahlung. Ein Vertrag auf L1 verwahrt die Token des Benutzers treuhänderisch und sendet eine Nachricht an einen gekoppelten L2-Vertrag, um eine gleiche Menge an Token auf dem Rollup zu prägen.

Da kettenübergreifende Nachrichtenaufrufe zur Vertragsausführung führen, muss der Absender in der Regel die [Gaskosten](/developers/docs/gas/) für die Berechnung tragen. Es ist ratsam, ein hohes Gaslimit festzulegen, um zu verhindern, dass die Transaktion auf der Ziel-Chain fehlschlägt. Das Token-Bridging-Szenario ist ein gutes Beispiel; wenn die L1-Seite der Transaktion (Einzahlung der Token) funktioniert, aber die L2-Seite (Prägen neuer Token) aufgrund von zu wenig Gas fehlschlägt, wird die Einzahlung unwiederbringlich.

Schließlich sollten wir beachten, dass L2 > L1-Nachrichtenaufrufe zwischen Verträgen Verzögerungen berücksichtigen müssen (L1 > L2-Aufrufe werden typischerweise nach einigen Minuten ausgeführt). Dies liegt daran, dass Nachrichten, die vom Optimistic Rollup an das Mainnet gesendet werden, erst ausgeführt werden können, wenn das Anfechtungsfenster abläuft.

## Wie funktionieren die Gebühren für Optimistic Rollups? {#how-do-optimistic-rollup-fees-work}

Optimistic Rollups verwenden ein Gasgebühren-Schema, ähnlich wie Ethereum, um anzugeben, wie viel Benutzer pro Transaktion zahlen. Die auf Optimistic Rollups erhobenen Gebühren hängen von den folgenden Komponenten ab:

1. **Zustandsschreiben (State write)**: Optimistic Rollups veröffentlichen Transaktionsdaten und Block-Header (bestehend aus dem vorherigen Block-Header-Hash, State Root, Batch Root) auf Ethereum als `blob` oder „Binary Large Object“. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) führte eine kostengünstige Lösung für die Einbindung von Daten auf der Blockchain ein. Ein `blob` ist ein neues Transaktionsfeld, das es Rollups ermöglicht, komprimierte Zustandsübergangsdaten auf Ethereum L1 zu posten. Im Gegensatz zu `calldata`, das dauerhaft auf der Blockchain verbleibt, sind Blobs kurzlebig und können nach [4096 Epochen](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (etwa 18 Tagen) von Clients gelöscht werden. Durch die Verwendung von Blobs zum Posten von Stapeln komprimierter Transaktionen können Optimistic Rollups die Kosten für das Schreiben von Transaktionen auf L1 erheblich senken.

2. **Verwendetes Blob-Gas**: Blob-tragende Transaktionen verwenden einen dynamischen Gebührenmechanismus, ähnlich dem durch [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) eingeführten. Die Gasgebühr für Typ-3-Transaktionen berücksichtigt die Grundgebühr für Blobs, die vom Netzwerk basierend auf der Nachfrage nach Blob-Speicherplatz und der Blob-Speicherplatznutzung der gesendeten Transaktion bestimmt wird.

3. **L2-Betreibergebühren**: Dies ist der Betrag, der an die Rollup-Knoten als Entschädigung für die bei der Verarbeitung von Transaktionen anfallenden Rechenkosten gezahlt wird, ähnlich wie Gasgebühren auf Ethereum. Rollup-Knoten berechnen niedrigere Transaktionsgebühren, da L2s höhere Verarbeitungskapazitäten haben und nicht mit den Netzwerküberlastungen konfrontiert sind, die Validatoren auf Ethereum zwingen, Transaktionen mit höheren Gebühren zu priorisieren.

Optimistic Rollups wenden mehrere Mechanismen an, um die Gebühren für Benutzer zu senken, einschließlich der Bündelung von Transaktionen und der Komprimierung von `calldata`, um die Kosten für die Datenveröffentlichung zu reduzieren. Sie können den [L2-Gebühren-Tracker](https://l2fees.info/) für eine Echtzeit-Übersicht darüber überprüfen, wie viel es kostet, Ethereum-basierte Optimistic Rollups zu nutzen.

## Wie skalieren Optimistic Rollups Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Wie erklärt, veröffentlichen Optimistic Rollups komprimierte Transaktionsdaten auf Ethereum, um die Datenverfügbarkeit zu garantieren. Die Fähigkeit, auf der Blockchain veröffentlichte Daten zu komprimieren, ist entscheidend für die Skalierung des Durchsatzes auf Ethereum mit Optimistic Rollups.

Die Haupt-Ethereum-Chain setzt Grenzen dafür, wie viele Daten Blöcke aufnehmen können, angegeben in Gaseinheiten (die [durchschnittliche Blockgröße](/developers/docs/blocks/#block-size) beträgt 15 Millionen Gas). Während dies einschränkt, wie viel Gas jede Transaktion verbrauchen kann, bedeutet es auch, dass wir die pro Block verarbeiteten Transaktionen erhöhen können, indem wir transaktionsbezogene Daten reduzieren – was die Skalierung direkt verbessert.

Optimistic Rollups verwenden verschiedene Techniken, um eine Komprimierung von Transaktionsdaten zu erreichen und die TPS-Raten (Transaktionen pro Sekunde) zu verbessern. Zum Beispiel vergleicht dieser [Artikel](https://vitalik.eth.limo/general/2021/01/05/rollup.html) die Daten, die eine einfache Benutzertransaktion (Senden von Ether) im Mainnet generiert, mit der Datenmenge, die dieselbe Transaktion auf einem Rollup generiert:

| Parameter | Ethereum (L1) | Rollup (L2) |
| --------- | ---------------------- | ------------- |
| Nonce | ~3 | 0 |
| Gaspreis | ~8 | 0-0.5 |
| Gas | 3 | 0-0.5 |
| An | 21 | 4 |
| Wert | 9 | ~3 |
| Signatur | ~68 (2 + 33 + 33) | ~0.5 |
| Von | 0 (aus Signatur wiederhergestellt) | 4 |
| **Gesamt** | **\~112 Bytes** | **\~12 Bytes** |

Einige grobe Berechnungen mit diesen Zahlen können helfen, die Skalierungsverbesserungen zu zeigen, die ein Optimistic Rollup bietet:

1. Die Zielgröße für jeden Block beträgt 15 Millionen Gas und es kostet 16 Gas, ein Byte an Daten zu verifizieren. Teilt man die durchschnittliche Blockgröße durch 16 Gas (15.000.000/16), zeigt sich, dass der durchschnittliche Block **937.500 Bytes an Daten** aufnehmen kann.
2. Wenn eine einfache Rollup-Transaktion 12 Bytes verwendet, kann der durchschnittliche Ethereum-Block **78.125 Rollup-Transaktionen** (937.500/12) oder **39 Rollup-Stapel** verarbeiten (wenn jeder Stapel durchschnittlich 2.000 Transaktionen enthält).
3. Wenn alle 15 Sekunden ein neuer Block auf Ethereum produziert wird, würden sich die Verarbeitungsgeschwindigkeiten des Rollups auf etwa **5.208 Transaktionen pro Sekunde** belaufen. Dies wird berechnet, indem die Anzahl der einfachen Rollup-Transaktionen, die ein Ethereum-Block aufnehmen kann (**78.125**), durch die durchschnittliche Blockzeit (**15 Sekunden**) geteilt wird.

Dies ist eine ziemlich optimistische Schätzung, da Transaktionen von Optimistic Rollups unmöglich einen gesamten Block auf Ethereum umfassen können. Es kann jedoch eine grobe Vorstellung davon geben, wie viel Skalierungsgewinne Optimistic Rollups den Ethereum-Benutzern bieten können (aktuelle Implementierungen bieten bis zu 2.000 TPS).

Es wird erwartet, dass die Einführung von [Daten-Sharding](/roadmap/danksharding/) auf Ethereum die Skalierung in Optimistic Rollups verbessern wird. Da Rollup-Transaktionen den Blockspeicherplatz mit anderen Nicht-Rollup-Transaktionen teilen müssen, ist ihre Verarbeitungskapazität durch den Datendurchsatz auf der Haupt-Ethereum-Chain begrenzt. Danksharding wird den Platz vergrößern, der L2-Chains zur Verfügung steht, um Daten pro Block zu veröffentlichen, indem günstigerer, nicht permanenter „Blob“-Speicher anstelle von teurem, permanentem `CALLDATA` verwendet wird.

### Vor- und Nachteile von Optimistic Rollups {#optimistic-rollups-pros-and-cons}

| Vorteile | Nachteile |
| -------- | --------- |
| Bietet massive Verbesserungen der Skalierung, ohne Sicherheit oder Vertrauenslosigkeit zu opfern. | Verzögerungen bei der Transaktionsfinalität aufgrund möglicher Betrugsanfechtungen. |
| Transaktionsdaten werden auf der Ebene-1-Chain gespeichert, was Transparenz, Sicherheit, Zensurresistenz und Dezentralisierung verbessert. | Zentralisierte Rollup-Betreiber (Sequencer) können die Reihenfolge der Transaktionen beeinflussen. |
| Betrugsnachweise garantieren vertrauenslose Finalität und ermöglichen es ehrlichen Minderheiten, die Chain zu sichern. | Wenn es keine ehrlichen Blockchain-Knoten gibt, kann ein böswilliger Betreiber Gelder stehlen, indem er ungültige Blöcke und Zustandsverpflichtungen postet. |
| Die Berechnung von Betrugsnachweisen steht regulären L2-Knoten offen, im Gegensatz zu Validitätsnachweisen (die in ZK-Rollups verwendet werden), die spezielle Hardware erfordern. | Das Sicherheitsmodell beruht auf mindestens einem ehrlichen Blockchain-Knoten, der Rollup-Transaktionen ausführt und Betrugsnachweise übermittelt, um ungültige Zustandsübergänge anzufechten. |
| Rollups profitieren von „vertrauensloser Lebendigkeit“ (jeder kann die Chain zwingen, voranzukommen, indem er Transaktionen ausführt und Behauptungen postet). | Benutzer müssen warten, bis die einwöchige Anfechtungsfrist abgelaufen ist, bevor sie Gelder zurück zu Ethereum abheben können. |
| Optimistic Rollups verlassen sich auf gut durchdachte kryptoökonomische Anreize, um die Sicherheit auf der Chain zu erhöhen. | Rollups müssen alle Transaktionsdaten auf der Blockchain posten, was die Kosten erhöhen kann. |
| Die Kompatibilität mit EVM und Solidity ermöglicht es Entwicklern, Ethereum-native Smart Contracts auf Rollups zu portieren oder vorhandene Tools zu verwenden, um neue Dapps zu erstellen. | |

### Eine visuelle Erklärung von Optimistic Rollups {#optimistic-video}

Lernen Sie eher visuell? Sehen Sie sich an, wie Finematics Optimistic Rollups erklärt:

<YouTube id="7pWxCklcNsU" start="263" />

## Weiterführende Literatur zu Optimistic Rollups

- [How do optimistic rollups work (The Complete guide)](https://www.alchemy.com/overviews/optimistic-rollups)
- [What is a Blockchain Rollup? A Technical Introduction](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [The Essential Guide to Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [The Practical Guide To Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [The State Of Fraud Proofs In Ethereum L2s](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [How does Optimism's Rollup really work?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [What is the Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutorials: Optimistic Rollups und Brücken auf Ethereum {#tutorials}

- [Walkthrough des Optimism-Standard-Brückenvertrags](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Ein kommentierter Code-Walkthrough der Optimism-Standardbrücke zum Verschieben von Vermögenswerten zwischen L1 und L2._