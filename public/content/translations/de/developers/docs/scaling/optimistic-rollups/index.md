---
title: Optimistische Rollups (Optimistic Rollups)
description: "Eine Einführung in optimistische Rollups – eine Skalierungslösung, die von der Ethereum-Community verwendet wird."
lang: de
---

Optimistic Rollups sind Layer-2-Protokolle (L2-Protokolle), die den Durchsatz des Ethereum Base Layers erhöhen sollen. Sie reduzieren den Rechenaufwand in der Ethereum-Hauptkette, indem sie Transaktionen außerhalb der Kette verarbeiten, und bieten so erhebliche Verbesserungen der Verarbeitungsgeschwindigkeit. Im Gegensatz zu anderen Skalierungslösungen, wie zum Beispiel [Sidechains](/developers/docs/scaling/sidechains/), leiten Optimistic Rollups ihre Sicherheit vom Mainnet ab, indem sie Transaktionsergebnisse onchain veröffentlichen, oder [Plasmaketten](/developers/docs/scaling/plasma/), die ebenfalls Transaktionen auf Ethereum mit Betrugsnachweisen verifizieren, aber Transaktionsdaten an anderer Stelle speichern.

Da die Berechnung der langsame und teure Teil der Nutzung von Ethereum ist, können Optimistic Rollups eine bis zu 10-100-fache Verbesserung der Skalierbarkeit bieten. Optimistic Rollups schreiben Transaktionen auch als `calldata` oder in [Blobs](/roadmap/danksharding/) nach Ethereum und reduzieren so die Gaskosten für die Nutzer.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zu [Skalierungslösungen für Ethereum](/developers/docs/scaling/) und [Layer 2](/layer-2/) gelesen und verstanden haben.

## Was ist ein Optimistic Rollup? {#what-is-an-optimistic-rollup}

Ein optimistischer Rollup ist ein Ansatz zur Skalierung von Ethereum, bei dem Berechnungen und Statusspeicherung außerhalb der Kette verschoben werden. Optimistic Rollups führen Transaktionen außerhalb von Ethereum aus, aber veröffentlichen Transaktionsdaten im Mainnet als `calldata` oder in [Blobs](/roadmap/danksharding/).

Optimistische Rollup Operatoren bündeln mehrere Offchain Transaktionen in großen Stapeln, bevor sie an Ethereum übermittelt werden. Dieser Ansatz ermöglicht es, die Fixkosten auf mehrere Transaktionen in jedem Batch zu verteilen und so die Gebühren für die Endnutzer zu senken. Optimistic Rollups verwenden auch Komprimierungstechniken, um die Menge der auf Ethereum veröffentlichten Daten zu reduzieren.

Optimistische Rollups gelten als „optimistisch“, da sie davon ausgehen, dass Offchain Transaktionen gültig sind, und keine Gültigkeitsnachweise für Offchain Transaktionsstapel veröffentlichen. Dies unterscheidet Optimistic Rollups von [Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups), die kryptografische [Gültigkeitsnachweise](/glossary/#validity-proof) für Offchain-Transaktionen veröffentlichen.

Optimistische Rollups basieren stattdessen auf einem Betrugserkennungssystem, um Fälle zu erkennen, in denen Transaktionen nicht korrekt berechnet werden. Nachdem ein Rollup-Batch auf Ethereum eingereicht wurde, gibt es ein Zeitfenster (eine sogenannte Anfechtungsfrist), in dem jeder die Ergebnisse einer Rollup-Transaktion anfechten kann, indem er einen [Betrugsnachweis](/glossary/#fraud-proof) berechnet.

Wenn der Betrugsnachweis erfolgreich ist, führt das Rollup Protokoll die Transaktion(en) erneut aus und aktualisiert den Status des Rollups entsprechend. Die andere Auswirkung eines erfolgreichen Betrugsnachweises besteht darin, dass der Sequenzer, der für die Aufnahme der falsch ausgeführten Transaktion in einen Block verantwortlich ist, eine Strafe erhält.

Wenn der Rollup Batch nach Ablauf der Einspruchsfrist unbestritten bleibt (d. h. alle Transaktionen korrekt ausgeführt werden), gilt er als gültig und wird auf Ethereum akzeptiert. Andere können weiterhin auf einem unbestätigten Rollup Block aufbauen, allerdings mit einer Einschränkung: Transaktionsergebnisse werden rückgängig gemacht, wenn sie auf einer zuvor veröffentlichten, falsch ausgeführten Transaktion basieren.

## Wie interagieren optimistische Rollups mit Ethereum? Optimistic Rollups und Ethereum {#optimistic-rollups-and-Ethereum}

Optimistic Rollups sind [Offchain-Skalierungslösungen](/developers/docs/scaling/#offchain-scaling), die für den Betrieb auf Ethereum ausgelegt sind. Jeder optimistische Rollup wird durch eine Reihe von Smart Contracts verwaltet, die im Ethereum-Netzwerk bereitgestellt werden. Optimistische Rollups verarbeiten Transaktionen außerhalb der Ethereum-Hauptkette, buchen Offchain Transaktionen jedoch (stapelweise) in einen Offchain Rollup Vertrag. Wie die Ethereum-Blockchain ist dieser Transaktionsdatensatz unveränderlich und bildet die „optimistische Rollup Kette“.

Die Architektur eines optimistischen Rollups umfasst die folgenden Teile:

**Onchain-Verträge**: Der Betrieb des Optimistic Rollups wird durch Smart Contracts gesteuert, die auf Ethereum laufen. Dazu gehören Verträge, die Rollup Blöcke speichern, Statusaktualisierungen des Rollups überwachen und Benutzereinzahlungen verfolgen. In diesem Sinne dient Ethereum als Basisschicht oder „Schicht 1“ für optimistische Rollups.

**Offchain Virtual Machine (VM)**: Obwohl die Verträge, die das Optimistic-Rollup-Protokoll verwalten, auf Ethereum laufen, führt das Rollup-Protokoll Berechnungen und Zustandsspeicherung auf einer anderen virtuellen Maschine durch, die von der [Ethereum Virtual Machine](/developers/docs/evm/) getrennt ist. Die Offchain VM ist der Ort, an dem Anwendungen ausgeführt werden und Statusänderungen ausgeführt werden. Sie dient als obere Schicht oder „Schicht 2“ für ein optimistisches Rollup.

Da optimistische Rollups zum Ausführen von Programmen konzipiert sind, die entweder für die EVM geschrieben oder kompiliert wurden, enthält die Offchain VM viele EVM Designspezifikationen. Darüber hinaus ermöglichen onchain berechnete Betrugsnachweise dem Ethereum-Netzwerk, die Gültigkeit von Zustandsänderungen durchzusetzen, die in der Offchain-VM berechnet werden.

Optimistische Rollups werden als „hybride Skalierungslösungen“ bezeichnet, da sie zwar als separate Protokolle existieren, ihre Sicherheitseigenschaften jedoch von Ethereum abgeleitet sind. Ethereum garantiert unter anderem die Richtigkeit der Offchain Berechnung eines Rollups und die Verfügbarkeit der der Berechnung zugrunde liegenden Daten. Dies macht Optimistic Rollups sicherer als reine Offchain-Skalierungsprotokolle (z. B. [Sidechains](/developers/docs/scaling/sidechains/)), die sich für die Sicherheit nicht auf Ethereum verlassen.

Optimistische Rollups basieren für Folgendes auf dem Hauptprotokoll von Ethereum:

### Datenverfügbarkeit {#data-availability}

Wie bereits erwähnt, veröffentlichen Optimistic Rollups Transaktionsdaten als `calldata` oder in [Blobs](/roadmap/danksharding/) auf Ethereum. Da die Ausführung der Rollup Kette auf übermittelten Transaktionen basiert, kann jeder diese Informationen – verankert in der Basisschicht von Ethereum – verwenden, um den Status des Rollups auszuführen und die Richtigkeit der Statusübergänge zu überprüfen.

[Datenverfügbarkeit](/developers/docs/data-availability/) ist von entscheidender Bedeutung, da Herausforderer ohne Zugriff auf Zustandsdaten keine Betrugsnachweise erstellen können, um ungültige Rollup-Operationen anzufechten. Da Ethereum Datenverfügbarkeit bietet, verringert sich das Risiko, dass Rollup Betreiber mit böswilligen Handlungen (z. B. dem Einreichen ungültiger Blöcke) davonkommen.

### Zensurresistenz {#censorship-resistance}

Optimistische Rollups verlassen sich auch auf Ethereum, um Zensur zu widerstehen. Bei einem optimistischen Rollup ist eine zentrale Einheit (der Betreiber) für die Verarbeitung von Transaktionen und die Übermittlung von Rollup Blöcken an Ethereum verantwortlich. Dies hat einige Auswirkungen:

- Rollup Betreiber können Benutzer zensieren, indem sie vollständig offline gehen oder sich weigern, Blöcke zu erstellen, die bestimmte Transaktionen enthalten.

- Rollup Betreiber können Benutzer daran hindern, im Rollup Vertrag hinterlegte Gelder abzuheben, indem sie die für Merkle Eigentumsnachweise erforderlichen Statusdaten zurückhalten. Durch das Zurückhalten von Statusdaten kann außerdem der Status des Rollups vor Benutzern verborgen werden und sie daran gehindert werden, mit dem Rollup zu interagieren.

Optimistische Rollups lösen dieses Problem, indem sie die Betreiber zwingen, Daten zu veröffentlichen, die mit Statusaktualisierungen auf Ethereum verbunden sind. Die Veröffentlichung von Rollup Daten in der Kette bietet folgende Vorteile:

- Wenn ein optimistischer Rollup Operator offline geht oder die Produktion von Transaktionsstapeln einstellt, kann ein anderer Knoten die verfügbaren Daten verwenden, um den letzten Zustand des Rollups zu reproduzieren und die Blockproduktion fortzusetzen.

- Benutzer können Transaktionsdaten verwenden, um Merkle Beweise zu erstellen, die den Besitz von Geldern belegen, und ihre Vermögenswerte aus der Zusammenfassung abheben.

- Benutzer können Transaktionsdaten verwenden, um Merkle Beweise zu erstellen, die den Besitz von Geldern belegen, und ihre Vermögenswerte aus der Zusammenfassung abheben.

### Abwicklung {#settlement}

Eine weitere Rolle, die Ethereum im Zusammenhang mit optimistischen Rollups spielt, ist die einer Abwicklungsschicht. Eine Abwicklungsebene verankert das gesamte Blockchain-Ökosystem, sorgt für Sicherheit und bietet objektive Endgültigkeit, wenn auf einer anderen Kette ein Streitfall auftritt (in diesem Fall optimistische Rollups), der ein Schiedsverfahren erfordert.

Das Ethereum Mainnet bietet einen Hub für optimistische Rollups, um Betrugsnachweise zu überprüfen und Streitigkeiten beizulegen. Darüber hinaus sind auf dem Rollup durchgeführte Transaktionen erst _nachdem_ der Rollup-Block auf Ethereum akzeptiert wurde, endgültig. Sobald eine Rollup Transaktion in der Basisschicht von Ethereum festgeschrieben ist, kann sie nicht mehr zurückgesetzt werden (außer im höchst unwahrscheinlichen Fall einer Kettenneuorganisation).

## Wie funktionieren optimistische Rollups? {#how-optimistic-rollups-work}

### Transaktionsausführung und -aggregation {#transaction-execution-and-aggregation}

Benutzer übermitteln Transaktionen an „Operatoren“, bei denen es sich um Knoten handelt, die für die Verarbeitung von Transaktionen im optimistischen Rollup verantwortlich sind. Der Betreiber, auch als „Validator“ oder „Aggregator“ bezeichnet, aggregiert Transaktionen, komprimiert die zugrunde liegenden Daten und veröffentlicht den Block auf Ethereum.

Obwohl jeder ein Validator werden kann, müssen die Validatoren von Optimistic Rollups eine Kaution hinterlegen, bevor sie Blöcke produzieren, ähnlich wie bei einem [Proof-of-Stake-System](/developers/docs/consensus-mechanisms/pos/). Diese Bindung kann gekürzt werden, wenn der Prüfer einen ungültigen Block postet oder auf einem alten, aber ungültigen Block aufbaut (auch wenn sein Block gültig ist). Auf diese Weise nutzen optimistische Rollups kryptoökonomische Anreize, um sicherzustellen, dass die Validierer ehrlich handeln.

Von anderen Validatoren in der optimistischen Rollup Kette wird erwartet, dass sie die übermittelten Transaktionen mithilfe ihrer Kopie der Rollup Statistik ausführen. Wenn der Endzustand eines Validators vom vorgeschlagenen Zustand des Betreibers abweicht, kann dieser eine Herausforderung starten und einen Betrugsnachweis berechnen.

Einige optimistische Rollups verzichten möglicherweise auf ein erlaubnisfreies Validierungs system und verwenden einen einzelnen „Sequenzer“ zur Ausführung der Kette. Wie ein Validator verarbeitet der Sequenzer Transaktionen, erstellt Rollup Blöcke und übermittelt Rollup Transaktionen an die L1-Kette (Ethereum).

Der Sequenzer unterscheidet sich von einem normalen Rollup Operator, da er eine größere Kontrolle über die Reihenfolge der Transaktionen hat. Darüber hinaus hat der Sequenzer vorrangigen Zugriff auf die Rollup Kette und ist die einzige Entität, die berechtigt ist, Transaktionen an den Onchain Vertrag zu übermitteln. Transaktionen von Nicht-Sequenzer knoten oder regulären Benutzern werden einfach in einem separaten Posteingang in die Warteschlange gestellt, bis der Sequenzer sie in einen neuen Stapel aufnimmt.

#### Einreichen von Rollup-Blöcken bei Ethereum {#submitting-blocks-to-ethereum}

Wie bereits erwähnt, bündelt der Betreiber eines optimistischen Rollups Offchain Transaktionen in einem Stapel und sendet diesen zur notariellen Beglaubigung an Ethereum. Dieser Prozess beinhaltet das Komprimieren von transaktionsbezogenen Daten und deren Veröffentlichung auf Ethereum als `calldata` oder in Blobs.

`calldata` ist ein nicht veränderbarer, nicht persistenter Bereich in einem Smart Contract, der sich größtenteils wie der [Speicher](/developers/docs/smart-contracts/anatomy/#memory) verhält. Obwohl `calldata` onchain als Teil der [Verlaufsprotokolle](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) der Blockchain bestehen bleibt, wird es nicht als Teil des Zustands von Ethereum gespeichert. Da `calldata` keinen Teil des Ethereum-Zustands berührt, ist es für die Speicherung von Daten onchain günstiger als der Zustand.

Das `calldata`-Schlüsselwort wird auch in Solidity verwendet, um Argumente zur Ausführungszeit an eine Smart-Contract-Funktion zu übergeben. `calldata` identifiziert die Funktion, die während einer Transaktion aufgerufen wird, und enthält die Eingaben für die Funktion in Form einer beliebigen Byte-Sequenz.

Im Kontext von Optimistic Rollups wird `calldata` verwendet, um komprimierte Transaktionsdaten an den Onchain-Vertrag zu senden. Der Rollup Operator fügt einen neuen Stapel hinzu, indem er die erforderliche Funktion im Rollup Vertrag aufruft und die komprimierten Daten als Funktionsargumente übergibt. Die Verwendung von `calldata` reduziert die Nutzergebühren, da die meisten Kosten, die bei Rollups anfallen, durch die Speicherung von Daten onchain entstehen.

Hier ist [ein Beispiel](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) für die Einreichung eines Rollup-Batches, um zu zeigen, wie dieses Konzept funktioniert. Der Sequencer rief die Methode `appendSequencerBatch()` auf und übergab die komprimierten Transaktionsdaten als Eingaben mittels `calldata`.

Einige Rollups verwenden jetzt blobs, um Transaktionsstapel an Ethereum zu senden.

Blobs sind nicht modifizierbar und nicht persistent (genau wie `calldata`), werden aber nach ca. 18 Tagen aus dem Verlauf entfernt. Weitere Informationen zu Blobs finden Sie unter [Danksharding](/roadmap/danksharding).

### Zustands-Commitments {#state-commitments}

Zu jedem Zeitpunkt ist der Zustand des Optimistic Rollups (Konten, Guthaben, Vertragscode usw.) als ein [Merkle Tree](/whitepaper/#merkle-trees) organisiert, der „Zustandsbaum“ genannt wird. Die Wurzel dieses Merkle Baums (Statuswurzel), die auf den neuesten Status des Rollups verweist, wird gehasht und im Rollup Vertrag gespeichert. Jeder Zustandsübergang in der Kette erzeugt einen neuen Rollup Zustand, den ein Operator durch Berechnung einer neuen Zustandswurzel festlegt.

Der Betreiber ist verpflichtet, bei der Stapelveröffentlichung sowohl alte als auch neue Statuswurzeln anzugeben. Wenn die alte State Root mit der bestehenden State Root im Offchain Vertrag übereinstimmt, wird letztere verworfen und durch die neue State Root ersetzt.

Der Rollup Operator muss außerdem eine Merkle Wurzel für den Transaktionsstapel selbst festlegen. Dies ermöglicht es jedem, die Aufnahme einer Transaktion in den Batch (auf L1) durch Vorlage eines [Merkle-Beweises](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) nachzuweisen.

Zustandsverpflichtungen, insbesondere Zustandswurzeln, sind notwendig, um die Richtigkeit von Zustandsänderungen in einem optimistischen Rollup nachzuweisen. Der Rollup Vertrag akzeptiert neue Statuswurzeln von Operatoren unmittelbar nach ihrer Veröffentlichung, kann jedoch später ungültige Statuswurzeln löschen, um das Rollup wieder in den richtigen Zustand zu versetzen.

### Betrugsnachweisverfahren {#fraud-proving}

Wie erläutert, ermöglichen optimistische Rollups jedem, Blöcke zu veröffentlichen, ohne Gültigkeitsnachweise vorlegen zu müssen. Um jedoch sicherzustellen, dass die Kette sicher bleibt, legen optimistische Rollups ein Zeitfenster fest, in dem jeder einen Zustandsübergang anfechten kann. Daher werden Rollup Blöcke als „Behauptungen“ bezeichnet, da jeder ihre Gültigkeit bestreiten kann.

Wenn jemand eine Behauptung bestreitet, leitet das Rollup Protokoll die Betrugsschutzberechnung ein. Jede Art von Betrugsnachweis ist interaktiv – jemand muss eine Behauptung posten, bevor eine andere Person sie anfechten kann. Der Unterschied liegt darin, wie viele Interaktionsrunden erforderlich sind, um den Betrugsnachweis zu berechnen.

Interaktive Einzelrunden-Beweisschemata spielen umstrittene Transaktionen auf L1 erneut ab, um ungültige Behauptungen zu erkennen. Das Rollup Protokoll emuliert die erneute Ausführung der umstrittenen Transaktion auf L1 (Ethereum) mithilfe eines Prüfer Vertrags, wobei die berechnete Statuswurzel bestimmt, wer die Herausforderung gewinnt. Wenn die Behauptung des anfechters über den korrekten Zustand des Rollups zutrifft, wird der Betreiber mit einer Kürzung seiner Kaution bestraft.

Die erneute Ausführung von Transaktionen auf L1 zur Erkennung von Betrug erfordert jedoch die Veröffentlichung von Statusverpflichtungen für einzelne Transaktionen und erhöht die Daten Rollups, die in der Kette veröffentlicht werden müssen. Auch die Wiederholung von Transaktionen verursacht erhebliche Gaskosten. Aus diesen Gründen wechseln optimistische Rollups zu interaktiven Beweisverfahren mit mehreren Runden, mit denen das gleiche Ziel (d. h. das Erkennen ungültiger Rollup Vorgänge) effizienter erreicht wird.

#### Interaktives Beweisverfahren mit mehreren Runden {#multi-round-interactive-proving}

Bei der interaktiven Beweisführung über mehrere Runden handelt es sich um ein Hin- und Her-Protokoll zwischen dem behauptet und dem Herausforderer, das von einem L1-Prüfer vertrag überwacht wird, der letztendlich über die lügende Partei entscheidet. Nachdem ein L2-Knoten eine Behauptung angefochten hat, muss der behauptet die umstrittene Behauptung in zwei gleiche Hälften teilen. Jede einzelne Behauptung enthält in diesem Fall genauso viele Berechnungsschritte wie die anderen.

Der Herausforderer wählt dann aus, welche Behauptung er anfechten möchte. Der Teilungsprozess (ein sogenanntes „Bisektionsprotokoll“) wird fortgesetzt, bis beide Parteien eine Behauptung über einen _einzigen_ Ausführungsschritt anfechten. An diesem Punkt wird der L1-Vertrag den Streit beilegen, indem er die Anweisung (und ihr Ergebnis) auswertet, um die betrügerische Partei zu fassen.

Der behauptet muss einen „Ein-Schritt-Beweis“ vorlegen, der die Gültigkeit der umstrittenen Ein-Schritt-Berechnung bestätigt. Wenn der behauptet den Ein-Schritt-Beweis nicht vorlegen kann oder der L1-Verifizierer den Beweis für ungültig hält, verliert er die Anfechtung.

Einige Hinweise zu dieser Art des Betrugsnachweises:

1. Der interaktive Betrugsnachweis in mehreren Runden gilt als effizient, da er den Aufwand der L1-Kette bei der Streitschlichtung minimiert. Anstatt die gesamte Transaktion erneut abzuspielen, muss die L1-Kette nur einen Schritt bei der Ausführung des Rollups erneut ausführen.

2. Halbierung Protokoll reduzieren die Menge der in der Kette veröffentlichten Daten (es ist nicht erforderlich, für jede Transaktion Status-Commits zu veröffentlichen). Darüber hinaus unterliegen optimistische Rollup Transaktionen nicht der Gasgrenze von Ethereum. Umgekehrt müssen optimistische Rollups, die Transaktionen erneut ausführen, sicherstellen, dass eine L2-Transaktion ein niedrigeres Gaslimit hat, um ihre Ausführung innerhalb einer einzelnen Ethereum-Transaktion zu emulieren.

3. Ein Teil der Anleihe des böswilligen Behauptet wird dem Herausforderer zugesprochen, während der andere Teil verbrannt wird. Das Verbrennen verhindert Absprachen zwischen Validatoren. Wenn zwei Validierer zusammenarbeiten, um Scheinherausforderungen zu initiieren, verlieren sie dennoch einen beträchtlichen Teil des gesamten Einsatzes.

4. Bei der interaktiven Beweisführung über mehrere Runden müssen beide Parteien (der Behauptet und der Challenger) innerhalb des angegebenen Zeitfensters ihre Züge machen. Wird die Frist nicht eingehalten, verfällt die Anfechtung für die säumige Partei.

#### Warum Betrugsnachweise für Optimistic Rollups wichtig sind {#fraud-proof-benefits}

Betrugsnachweise sind wichtig, weil sie die _vertrauenslose Finalität_ in Optimistic Rollups ermöglichen. Vertrauenslose Endgültigkeit ist eine Eigenschaft optimistischer Rollups, die garantiert, dass eine Transaktion sofern sie gültig ist letztendlich bestätigt wird.

Böswillige Knoten können versuchen, die Bestätigung eines gültigen Rollup Blocks durch das Starten falscher Herausforderungen zu verzögern. Betrugsnachweise werden jedoch letztendlich die Gültigkeit des Rollup Blocks beweisen und zu seiner Bestätigung führen.

Dies bezieht sich auch auf eine weitere Sicherheitseigenschaft von Optimistic Rollups: Die Gültigkeit der Kette hängt von der Existenz _eines_ ehrlichen Knotens ab. Der ehrliche Knoten kann die Kette korrekt voranbringen, indem er entweder gültige Behauptungen postet oder ungültige Behauptungen bestreitet. Wie dem auch sei, böswillige Knoten, die in einen Streit mit dem ehrlichen Knoten geraten, verlieren im Laufe des Betrugsnachweisprozesses ihren Einsatz.

### L1/L2-Interoperabilität {#l1-l2-interoperability}

Optimistische Rollups sind für die Interoperabilität mit dem Ethereum-Mainnet konzipiert und ermöglichen Benutzern die Übertragung von Nachrichten und beliebigen Daten zwischen L1 und L2. Sie sind auch mit der EVM kompatibel, sodass Sie bestehende [Dapps](/developers/docs/dapps/) auf Optimistic Rollups portieren oder mit den Entwicklungstools von Ethereum neue Dapps erstellen können.

#### 1. Asset-Bewegung {#asset-movement}

##### Eingabe des Rollups

Um einen Optimistic Rollup zu verwenden, zahlen Nutzer ETH, ERC-20-Token und andere akzeptierte Vermögenswerte in den Vertrag der [kettenübergreifenden Brücke](/developers/docs/bridges/) des Rollups auf L1 ein. Der Brückenvertrag leitet die Transaktion an L2 weiter, wo ein entsprechender Betrag an Vermögenswerten geprägt und an die vom Benutzer gewählte Adresse im optimistischen Rollup gesendet wird.

Vom Benutzer generierte Transaktionen (wie eine L1 > L2 Einzahlung) werden normalerweise in eine Warteschlange gestellt, bis der Sequencer sie erneut an den Rollup-Vertrag übermittelt. Um jedoch die Zensurresistenz aufrechtzuerhalten, ermöglichen optimistische Rollups den Benutzern, eine Transaktion direkt an den Onchain Rollup Vertrag zu senden, wenn sie über die maximal zulässige Zeit hinaus verzögert wurde.

Einige optimistische Rollups verfolgen einen direkteren Ansatz, um zu verhindern, dass Sequenzer Benutzer zensieren. Hier wird ein Block durch alle Transaktionen definiert, die seit dem vorherigen Block an den L1-Vertrag übermittelt wurden (z. B. Einzahlungen), zusätzlich zu den Transaktionen, die in der Rollup Kette verarbeitet wurden. Wenn ein Sequenzer eine L1-Transaktion ignoriert, veröffentlicht er den (nachweislich) falschen Statusstamm. Daher können Sequenzer benutzergenerierte Nachrichten nicht verzögern, sobald sie auf L1 gepostet wurden.

##### Beenden des Rollups

Aufgrund des Betrugsnachweissystems ist die Auszahlung aus einem optimistischen Rollup auf Ethereum schwieriger. Wenn ein Nutzer eine L2 > L1 Transaktion initiiert, um auf L1 hinterlegte Gelder abzuheben, muss er warten, bis die Anfechtungsfrist – die ungefähr sieben Tage dauert – abgelaufen ist. Der Auszahlungsprozess selbst ist jedoch ziemlich unkompliziert.

Nachdem die Auszahlungsanforderung auf dem L2 Rollup initiiert wurde, wird die Transaktion in den nächsten Stapel aufgenommen, während die Vermögenswerte des Benutzers auf dem Rollup verbrannt werden. Sobald der Stapel auf Ethereum veröffentlicht ist, kann der Benutzer einen Merkle Beweis berechnen, der die Aufnahme seiner Exit-Transaktion in den Block bestätigt. Dann muss die Verzögerungszeit abgewartet werden, um die Transaktion auf L1 abzuschließen und die Gelder auf das Mainnet abzuheben.

Um eine Woche Wartezeit vor der Abhebung von Geldern auf Ethereum zu vermeiden, können Nutzer von Optimistic Rollups einen **Liquiditätsanbieter** (LP) einsetzen. Ein Liquiditätsanbieter übernimmt das Eigentum an einer ausstehenden L2-Auszahlung und zahlt den Benutzer auf L1 aus (gegen eine Gebühr).

Liquiditätsanbieter können die Gültigkeit der Auszahlungsanforderung des Benutzers überprüfen (indem sie die Kette selbst ausführen), bevor sie Gelder freigeben. Auf diese Weise haben sie die Gewissheit, dass die Transaktion letztendlich bestätigt wird (d. h. vertrauenslose Endgültigkeit).

#### 2. EVM-Kompatibilität {#evm-compatibility}

Für Entwickler liegt der Vorteil von Optimistic Rollups in ihrer Kompatibilität – oder, besser noch, Äquivalenz – mit der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). EVM-kompatible Rollups entsprechen den Spezifikationen im [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) und unterstützen die EVM auf Bytecode-Ebene.

Die EVM Kompatibilität in optimistischen Rollups bietet die folgenden Vorteile:

ich. Entwickler können vorhandene Smart Contracts auf Ethereum auf optimistische Rollup Ketten migrieren, ohne die Codebasis umfassend ändern zu müssen. Dies kann Entwicklungsteams Zeit sparen, wenn sie Ethereum Smart Contracts auf L2 bereitstellen.

ii. Entwickler und Projektteams, die optimistische Rollups verwenden, können die Infrastruktur von Ethereum nutzen. Dazu gehören Programmiersprachen, Codebibliotheken, Testtools, Clientsoftware, Bereitstellungsinfrastruktur usw.

Die Verwendung vorhandener Tools ist wichtig, da diese Tools im Laufe der Jahre umfassend geprüft, debuggt und verbessert wurden. Außerdem müssen Ethereum-Entwickler nicht mehr lernen, wie man mit einem völlig neuen Entwicklungs-Stack erstellt.

#### 3. Kettenübergreifende Vertragsaufrufe {#cross-chain-contract-calls}

Benutzer (externe Konten) interagieren mit L2-Verträgen, indem sie eine Transaktion an den Rollup Vertrag übermitteln oder dies von einem Sequenzer oder Validator für sie erledigen lassen. Optimistische Rollups ermöglichen Vertragskonten auf Ethereum außerdem die Interaktion mit L2-Verträgen mithilfe von Überbrückungsverträgen, um Nachrichten weiterzuleiten und Daten zwischen L1 und L2 zu übertragen. Das bedeutet, dass Sie einen L1 Vertrag im Ethereum Mainnet so programmieren können, dass er Funktionen aufruft, die zu Verträgen in einem optimistischen L2 Rollup gehören.

Kreuzkette Vertragsaufrufe erfolgen asynchron, d. h. der Aufruf wird zuerst initiiert und dann zu einem späteren Zeitpunkt ausgeführt. Dies unterscheidet sich von Aufrufen zwischen den beiden Verträgen auf Ethereum, bei denen der Aufruf sofort Ergebnisse liefert.

Ein Beispiel für einen kettenübergreifenden Vertragsaufruf ist die zuvor beschriebene Token-Einzahlung. Ein Vertrag auf L1 verwaltet die Token des Benutzers treuhänderisch und sendet eine Nachricht an einen gepaarten L2 Vertrag, um eine gleiche Anzahl von Token auf der Rollup Liste zu prägen.

Da kettenübergreifende Nachrichtenaufrufe zur Ausführung von Verträgen führen, muss der Absender in der Regel die [Gaskosten](/developers/docs/gas/) für die Berechnung übernehmen. Es ist ratsam, ein hohes Gaslimit festzulegen, um zu verhindern, dass die Transaktion in der Zielkette fehlschlägt. Das Token Überbrückung Szenario ist ein gutes Beispiel: Wenn die L1-Seite der Transaktion (Hinterlegung der Token) funktioniert, die L2-Seite (Prägung neuer Token) jedoch aufgrund von niedrigem Gasstand ausfällt, ist die Einzahlung nicht wiederherstellbar.

Schließlich ist zu beachten, dass L2 > L1-Nachrichtenaufrufe zwischen Verträgen Verzögerungen berücksichtigen müssen (L1 > L2-Aufrufe werden in der Regel nach einigen Minuten ausgeführt). Dies liegt daran, dass Nachrichten, die vom optimistischen Rollup an Mainnet gesendet werden, erst ausgeführt werden können, wenn das Challenge-Fenster abgelaufen ist.

## Wie funktionieren optimistische Rollup Gebühren? {#how-do-optimistic-rollup-fees-work}

Optimistische Rollups verwenden ein Gasgebührenschema, ähnlich wie Ethereum, um anzugeben, wie viel Benutzer pro Transaktion zahlen. Die auf Optimistic Rollups erhobenen Gebühren hängen von den folgenden Komponenten ab:

1. **Zustandsschreiben**: Optimistic Rollups veröffentlichen Transaktionsdaten und Block-Header (bestehend aus dem vorherigen Block-Header-Hash, dem Zustands-Root und dem Batch-Root) als `Blob` oder "Binary Large Object" auf Ethereum. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) führte eine kostengünstige Lösung für die Einbeziehung von Daten onchain ein. Ein `Blob` ist ein neues Transaktionsfeld, das es Rollups ermöglicht, komprimierte Zustandsübergangsdaten an Ethereum L1 zu senden. Im Gegensatz zu `calldata`, das permanent onchain verbleibt, sind Blobs kurzlebig und können nach [4096 Epochen](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (ungefähr 18 Tage) von den Clients entfernt werden. Durch die Verwendung von Klecks zum Posten von Batches komprimierter Transaktionen können optimistische Rollups die Kosten für das Schreiben von Transaktionen in L1 erheblich reduzieren.

2. **Verwendetes Blob-Gas**: Blob-tragende Transaktionen verwenden einen dynamischen Gebührenmechanismus, ähnlich dem, der durch [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) eingeführt wurde. Die Gasgebühr für Typ-3-Transaktionen berücksichtigt die Grundgebühr für Klecks, die vom Netzwerk basierend auf der Klecks-Speicherplatznachfrage und der Klecks-Speicherplatznutzung der gesendeten Transaktion bestimmt wird.

3. **L2-Betreibergebühren**: Dies ist der Betrag, der an die Rollup-Knoten als Ausgleich für die Rechenkosten gezahlt wird, die bei der Verarbeitung von Transaktionen anfallen, ähnlich wie die Gasgebühren auf Ethereum. Rollup Knoten erheben niedrigere Transaktionsgebühren, da L2s über höhere Verarbeitungskapazitäten verfügen und nicht mit den Netzwerküberlastungen konfrontiert sind, die Validierer auf Ethereum dazu zwingen, Transaktionen mit höheren Gebühren zu priorisieren.

Optimistic Rollups wenden verschiedene Mechanismen zur Reduzierung der Gebühren für Nutzer an, einschließlich der Bündelung von Transaktionen und der Komprimierung von `calldata`, um die Kosten für die Datenveröffentlichung zu senken. Sie können den [L2-Gebühren-Tracker](https://l2fees.info/) für eine Echtzeit-Übersicht über die Kosten der Nutzung von Ethereum-basierten Optimistic Rollups überprüfen.

## Wie skalieren optimistische Rollups Ethereum? Skalierung von Ethereum mit Optimistic Rollups {#scaling-ethereum-with-optimistic-rollups}

Wie erläutert, veröffentlichen optimistische Rollups komprimierte Transaktionsdaten auf Ethereum, um die Datenverfügbarkeit zu gewährleisten. Die Fähigkeit, in der Kette veröffentlichte Daten zu komprimieren, ist entscheidend für die Skalierung des Durchsatzes auf Ethereum mit optimistischen Rollups.

Die Haupt-Ethereum-Kette begrenzt, wie viele Datenblöcke enthalten können, ausgedrückt in Gaseinheiten (die [durchschnittliche Blockgröße](/developers/docs/blocks/#block-size) beträgt 15 Millionen Gas). Dadurch wird zwar der Gasverbrauch jeder Transaktion eingeschränkt, es bedeutet aber auch, dass wir die Anzahl der pro Block verarbeiteten Transaktionen erhöhen können, indem wir die Transaktion bezogenen Daten reduzieren – was die Skalierbarkeit direkt verbessert.

Optimistische Rollups verwenden mehrere Techniken, um eine Komprimierung der Transaktionsdaten zu erreichen und die TPS Raten zu verbessern. Dieser [Artikel](https://vitalik.eth.limo/general/2021/01/05/rollup.html) vergleicht beispielsweise die Daten, die eine einfache Nutzertransaktion (Senden von Ether) auf dem Mainnet generiert, mit der Datenmenge, die dieselbe Transaktion auf einem Rollup generiert:

| Parameter    | Ethereum (L1)                          | Rollup (L2)       |
| ------------ | --------------------------------------------------------- | ------------------------------------ |
| Nonce        | ~3                                        | 0                                    |
| Benzinpreis  | ~8                                        | 0-0.5                |
| Gas          | 3                                                         | 0-0.5                |
| Zu           | 21                                                        | 4                                    |
| Wert         | 9                                                         | ~3                   |
| Unterschrift | ~68 (2 + 33 + 33)      | ~0.5 |
| Aus          | 0 (aus der Signatur wiederhergestellt) | 4                                    |
| **Gesamt**   | **~112 Bytes**                            | **~12 Byte**         |

Durch grobe Berechnungen dieser Zahlen können die durch ein optimistisches Rollup erzielten Skalierbar keitsverbesserungen aufgezeigt werden:

1. Die Zielgröße für jeden Block beträgt 15 Millionen Gas und die Überprüfung eines Datenbytes kostet 16 Gas. Die Division der durchschnittlichen Blockgröße durch 16 Gas (15.000.000/16) zeigt, dass der durchschnittliche Block **937.500 Bytes an Daten** aufnehmen kann.
2. Wenn eine einfache Rollup-Transaktion 12 Bytes verwendet, kann der durchschnittliche Ethereum-Block **78.125 Rollup-Transaktionen** (937.500/12) oder **39 Rollup-Batches** verarbeiten (wenn jeder Batch durchschnittlich 2.000 Transaktionen enthält).
3. Wenn alle 15 Sekunden ein neuer Block auf Ethereum produziert wird, würde die Verarbeitungsgeschwindigkeit des Rollups ungefähr **5.208 Transaktionen pro Sekunde** betragen. Dies geschieht, indem die Anzahl der grundlegenden Rollup-Transaktionen, die ein Ethereum-Block aufnehmen kann (**78.125**), durch die durchschnittliche Blockzeit (**15 Sekunden**) geteilt wird.

Dies ist eine ziemlich optimistische Schätzung, da optimistische Rollup Transaktionen unmöglich einen ganzen Block auf Ethereum umfassen können. Es kann jedoch eine ungefähre Vorstellung davon vermitteln, wie viel Skalierbar keits gewinn optimistische Rollups Ethereum-Benutzern bieten können (aktuelle Implementierungen bieten bis zu 2.000 TPS).

Die Einführung von [Data Sharding](/roadmap/danksharding/) auf Ethereum wird voraussichtlich die Skalierbarkeit von Optimistic Rollups verbessern. Da Rollup Transaktionen den Block Raum mit anderen Nicht Rollup Transaktionen teilen müssen, ist ihre Verarbeitungskapazität durch den Datendurchsatz in der Hauptkette von Ethereum begrenzt. Danksharding wird den für L2-Ketten verfügbaren Platz zur Veröffentlichung von Daten pro Block erhöhen, indem es günstigeren, nicht-permanenten "Blob"-Speicher anstelle von teurem, permanentem `CALLDATA` verwendet.

### Vor- und Nachteile von Optimistic Rollups {#optimistic-rollups-pros-and-cons}

| Pro                                                                                                                                                                                                                    | Nachteile                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bietet massive Verbesserungen der Skalierbarkeit ohne Einbußen bei Sicherheit oder Vertrauenslosigkeit.                                                                                                | Verzögerungen bei der Transaktionsabwicklung aufgrund potenzieller Betrugsprobleme.                                                                                                  |
| Transaktionsdaten werden in der Layer-1-Kette gespeichert, was Transparenz, Sicherheit, Zensurresistenz und Dezentralisierung verbessert.                                                              | Zentralisierte Rollup Operatoren (Sequenzer) können die Reihenfolge der Transaktionen beeinflussen.                                                               |
| Der Betrugsnachweis garantiert eine vertrauenslose Endgültigkeit und ermöglicht es ehrlichen Minderheiten, die Kette zu sichern.                                                                       | Wenn es keine ehrlichen Knoten gibt, kann ein böswilliger Betreiber Geld stehlen, indem er ungültige Blöcke und Statusverpflichtungen veröffentlicht.                                |
| Die Berechnung von Betrugsnachweisen steht regulären L2-Knoten offen, im Gegensatz zu Gültigkeitsnachweisen (die in ZK-Rollups verwendet werden), die spezielle Hardware erfordern. | Das Sicherheitsmodell basiert darauf, dass mindestens ein ehrlicher Knoten Rollup Transaktionen ausführt und Betrugsnachweise einreicht, um ungültige Zustandsübergänge anzufechten. |
| Rollups profitieren von vertrauens loser Lebendigkeit“ (jeder kann die Kette zum Fortschreiten zwingen, indem er Transaktionen ausführt und Behauptungen postet).                   | Benutzer müssen warten, bis die einwöchige Heraus forderung phase abgelaufen ist, bevor sie Gelder zurück auf Ethereum abheben können.                                               |
| Optimistische Rollups basieren auf gut konzipierten Krypton wirtschaftlich Anreizen, um die Sicherheit in der Kette zu erhöhen.                                                                        | Rollups müssen alle Transaktionsdaten in der Kette veröffentlichen, was die Kosten erhöhen kann.                                                                                     |
| Durch die Kompatibilität mit EVM und Solidity können Entwickler Ethereum-native Smart Contracts auf Rollups portieren oder vorhandene Tools zum Erstellen neuer Dapp verwenden.                        |                                                                                                                                                                                                      |

### Eine visuelle Erklärung von Optimistic Rollups {#optimistic-video}

Eher der visuelle Lernende? Sehen Sie, wie Finematics optimistische Rollups erklärt:

<YouTube id="7pWxCklcNsU" start="263" />

## Weitere Informationen zu optimistischen Rollups

- [Wie funktionieren Optimistic Rollups (Der komplette Leitfaden)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Was ist ein Blockchain Rollup? Eine technische Einführung](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Der unverzichtbare Leitfaden zu Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Der praktische Leitfaden für Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Der Stand der Betrugsnachweise in Ethereum L2s](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Wie funktioniert der Rollup von Optimism wirklich?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Was ist die Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
