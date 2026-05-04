---
title: Zero-Knowledge Rollups
description: "Eine Einführung in Zero-Knowledge Rollups – eine Skalierungslösung, die von der Ethereum-Community verwendet wird."
lang: de
---

Zero-Knowledge Rollups (ZK-Rollups) sind [Skalierungslösungen](/developers/docs/scaling/) der Ebene 2, die den Durchsatz im [Ethereum](/)-Mainnet erhöhen, indem sie Berechnungen und Zustandsspeicherung Off-Chain verlagern. ZK-Rollups können Tausende von Transaktionen in einem Batch verarbeiten und dann nur minimale Zusammenfassungsdaten im Mainnet veröffentlichen. Diese Zusammenfassungsdaten definieren die Änderungen, die am Ethereum-Zustand vorgenommen werden sollen, sowie einen kryptografischen Nachweis, dass diese Änderungen korrekt sind.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zu [Ethereum-Skalierung](/developers/docs/scaling/) und [Ebene 2](/layer-2) gelesen und verstanden haben.

## Was sind Zero-Knowledge Rollups? {#what-are-zk-rollups}

**Zero-Knowledge Rollups (ZK-Rollups)** bündeln (oder „rollen“) Transaktionen in Batches, die Off-Chain ausgeführt werden. Die Off-Chain-Berechnung reduziert die Datenmenge, die auf der Blockchain veröffentlicht werden muss. Betreiber von ZK-Rollups übermitteln eine Zusammenfassung der Änderungen, die erforderlich sind, um alle Transaktionen in einem Batch darzustellen, anstatt jede Transaktion einzeln zu senden. Sie erstellen auch [Validitätsnachweise](/glossary/#validity-proof), um die Richtigkeit ihrer Änderungen zu beweisen.

Der Zustand des ZK-Rollups wird durch einen Smart Contract aufrechterhalten, der im Ethereum-Netzwerk bereitgestellt wird. Um diesen Zustand zu aktualisieren, müssen ZK-Rollup-Blockchain-Knoten einen Validitätsnachweis zur Überprüfung einreichen. Wie bereits erwähnt, ist der Validitätsnachweis eine kryptografische Zusicherung, dass die vom Rollup vorgeschlagene Zustandsänderung tatsächlich das Ergebnis der Ausführung des jeweiligen Transaktions-Batches ist. Das bedeutet, dass ZK-Rollups nur Validitätsnachweise erbringen müssen, um Transaktionen auf Ethereum abzuschließen, anstatt alle Transaktionsdaten auf der Blockchain zu veröffentlichen, wie es bei [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/) der Fall ist.

Es gibt keine Verzögerungen beim Verschieben von Geldern von einem ZK-Rollup zu Ethereum, da Exit-Transaktionen ausgeführt werden, sobald der ZK-Rollup-Vertrag den Validitätsnachweis verifiziert. Im Gegensatz dazu unterliegt das Abheben von Geldern aus Optimistic Rollups einer Verzögerung, damit jeder die Exit-Transaktion mit einem [Betrugsnachweis](/glossary/#fraud-proof) anfechten kann.

ZK-Rollups schreiben Transaktionen als `calldata` auf Ethereum. In `calldata` werden Daten gespeichert, die in externen Aufrufen von Smart-Contract-Funktionen enthalten sind. Informationen in `calldata` werden auf der Blockchain veröffentlicht, sodass jeder den Zustand des Rollups unabhängig rekonstruieren kann. ZK-Rollups verwenden Komprimierungstechniken, um Transaktionsdaten zu reduzieren – zum Beispiel werden Konten durch einen Index anstelle einer Adresse dargestellt, was 28 Bytes an Daten spart. Die Veröffentlichung von Daten auf der Blockchain ist ein erheblicher Kostenfaktor für Rollups, sodass die Datenkomprimierung die Gebühren für Benutzer senken kann.

## Wie interagieren ZK-Rollups mit Ethereum? {#zk-rollups-and-ethereum}

Eine ZK-Rollup-Chain ist ein Off-Chain-Protokoll, das auf der Ethereum-Blockchain aufbaut und von Ethereum-Smart-Contracts auf der Blockchain verwaltet wird. ZK-Rollups führen Transaktionen außerhalb des Mainnets aus, übermitteln aber regelmäßig Off-Chain-Transaktions-Batches an einen Rollup-Vertrag auf der Blockchain. Dieser Transaktionsdatensatz ist unveränderlich, ähnlich wie die Ethereum-Blockchain, und bildet die ZK-Rollup-Chain.

Die Kernarchitektur des ZK-Rollups besteht aus den folgenden Komponenten:

1. **Verträge auf der Blockchain**: Wie bereits erwähnt, wird das ZK-Rollup-Protokoll durch Smart Contracts gesteuert, die auf Ethereum laufen. Dazu gehört der Hauptvertrag, der Rollup-Blöcke speichert, Einzahlungen verfolgt und Zustandsaktualisierungen überwacht. Ein weiterer Vertrag auf der Blockchain (der Verifizierer-Vertrag) verifiziert Zero-Knowledge-Nachweise, die von Blockproduzenten eingereicht werden. Somit dient Ethereum als Basisschicht oder „Ebene 1“ für das ZK-Rollup.

2. **Off-Chain Virtual Machine (VM)**: Während das ZK-Rollup-Protokoll auf Ethereum existiert, erfolgen die Transaktionsausführung und die Zustandsspeicherung auf einer separaten virtuellen Maschine, die unabhängig von der [EVM](/developers/docs/evm/) ist. Diese Off-Chain-VM ist die Ausführungsumgebung für Transaktionen auf dem ZK-Rollup und dient als sekundäre Schicht oder „Ebene 2“ für das ZK-Rollup-Protokoll. Validitätsnachweise, die im Ethereum-Mainnet verifiziert werden, garantieren die Richtigkeit von Zustandsübergängen in der Off-Chain-VM.

ZK-Rollups sind „hybride Skalierungslösungen“ – Off-Chain-Protokolle, die unabhängig arbeiten, aber ihre Sicherheit von Ethereum ableiten. Insbesondere erzwingt das Ethereum-Netzwerk die Gültigkeit von Zustandsaktualisierungen auf dem ZK-Rollup und garantiert die Datenverfügbarkeit hinter jeder Aktualisierung des Rollup-Zustands. Infolgedessen sind ZK-Rollups wesentlich sicherer als reine Off-Chain-Skalierungslösungen wie [Sidechains](/developers/docs/scaling/sidechains/), die für ihre eigenen Sicherheitseigenschaften verantwortlich sind, oder [Validiums](/developers/docs/scaling/validium/), die Transaktionen ebenfalls auf Ethereum mit Validitätsnachweisen verifizieren, aber Transaktionsdaten an anderer Stelle speichern.

ZK-Rollups verlassen sich für Folgendes auf das Ethereum-Hauptprotokoll:

### Datenverfügbarkeit {#data-availability}

ZK-Rollups veröffentlichen Zustandsdaten für jede Off-Chain verarbeitete Transaktion auf Ethereum. Mit diesen Daten ist es für Einzelpersonen oder Unternehmen möglich, den Zustand des Rollups zu reproduzieren und die Chain selbst zu validieren. Ethereum stellt diese Daten allen Teilnehmern des Netzwerks als `calldata` zur Verfügung.

ZK-Rollups müssen nicht viele Transaktionsdaten auf der Blockchain veröffentlichen, da Validitätsnachweise bereits die Authentizität von Zustandsübergängen verifizieren. Dennoch ist die Speicherung von Daten auf der Blockchain weiterhin wichtig, da sie eine erlaubnisfreie, unabhängige Verifizierung des Zustands der L2-Chain ermöglicht, was wiederum jedem erlaubt, Transaktions-Batches einzureichen, und verhindert, dass böswillige Betreiber die Chain zensieren oder einfrieren.

Daten auf der Blockchain sind erforderlich, damit Benutzer mit dem Rollup interagieren können. Ohne Zugriff auf Zustandsdaten können Benutzer ihren Kontostand nicht abfragen oder Transaktionen (z. B. Abhebungen) initiieren, die auf Zustandsinformationen angewiesen sind.

### Transaktionsfinalität {#transaction-finality}

Ethereum fungiert als Abwicklungsschicht für ZK-Rollups: L2-Transaktionen erreichen nur dann Finalität, wenn der L1-Vertrag den Validitätsnachweis akzeptiert. Dies eliminiert das Risiko, dass böswillige Betreiber die Chain korrumpieren (z. B. Rollup-Gelder stehlen), da jede Transaktion im Mainnet genehmigt werden muss. Außerdem garantiert Ethereum, dass Benutzeroperationen nicht rückgängig gemacht werden können, sobald sie auf L1 finalisiert sind.

### Zensurresistenz {#censorship-resistance}

Die meisten ZK-Rollups verwenden einen „Supernode“ (den Betreiber), um Transaktionen auszuführen, Batches zu produzieren und Blöcke an L1 zu übermitteln. Während dies Effizienz gewährleistet, erhöht es das Risiko von Zensur: Böswillige ZK-Rollup-Betreiber können Benutzer zensieren, indem sie sich weigern, deren Transaktionen in Batches aufzunehmen.

Als Sicherheitsmaßnahme erlauben ZK-Rollups Benutzern, Transaktionen direkt an den Rollup-Vertrag im Mainnet zu übermitteln, wenn sie glauben, vom Betreiber zensiert zu werden. Dies ermöglicht es Benutzern, einen Exit aus dem ZK-Rollup zu Ethereum zu erzwingen, ohne auf die Erlaubnis des Betreibers angewiesen zu sein.

## Wie funktionieren ZK-Rollups? {#how-do-zk-rollups-work}

### Transaktionen {#transactions}

Benutzer im ZK-Rollup signieren Transaktionen und übermitteln sie an L2-Betreiber zur Verarbeitung und Aufnahme in den nächsten Batch. In einigen Fällen ist der Betreiber eine zentralisierte Entität, genannt Sequencer, der Transaktionen ausführt, sie zu Batches aggregiert und an L1 übermittelt. Der Sequencer in diesem System ist die einzige Entität, die L2-Blöcke produzieren und Rollup-Transaktionen zum ZK-Rollup-Vertrag hinzufügen darf.

Andere ZK-Rollups können die Betreiberrolle rotieren, indem sie ein [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)-Validator-Set verwenden. Potenzielle Betreiber hinterlegen Gelder im Rollup-Vertrag, wobei die Größe jedes Einsatzes die Chancen des Stakers beeinflusst, für die Produktion des nächsten Rollup-Batches ausgewählt zu werden. Der Einsatz des Betreibers kann durch Slashing bestraft werden, wenn er böswillig handelt, was einen Anreiz bietet, gültige Blöcke zu veröffentlichen.

#### Wie ZK-Rollups Transaktionsdaten auf Ethereum veröffentlichen {#how-zk-rollups-publish-transaction-data-on-ethereum}

Wie erklärt, werden Transaktionsdaten auf Ethereum als `calldata` veröffentlicht. `calldata` ist ein Datenbereich in einem Smart Contract, der verwendet wird, um Argumente an eine Funktion zu übergeben, und verhält sich ähnlich wie [memory](/developers/docs/smart-contracts/anatomy/#memory). Während `calldata` nicht als Teil des Ethereum-Zustands gespeichert wird, bleibt es auf der Blockchain als Teil der [Verlaufsprotokolle](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) der Ethereum-Chain bestehen. `calldata` beeinflusst den Zustand von Ethereum nicht, was es zu einer günstigen Möglichkeit macht, Daten auf der Blockchain zu speichern.

Das Schlüsselwort `calldata` identifiziert oft die Smart-Contract-Methode, die von einer Transaktion aufgerufen wird, und enthält Eingaben für die Methode in Form einer beliebigen Byte-Sequenz. ZK-Rollups verwenden `calldata`, um komprimierte Transaktionsdaten auf der Blockchain zu veröffentlichen; der Rollup-Betreiber fügt einfach einen neuen Batch hinzu, indem er die erforderliche Funktion im Rollup-Vertrag aufruft und die komprimierten Daten als Funktionsargumente übergibt. Dies hilft, die Kosten für Benutzer zu senken, da ein großer Teil der Rollup-Gebühren für die Speicherung von Transaktionsdaten auf der Blockchain anfällt.

### Zustands-Commitments {#state-commitments}

Der Zustand des ZK-Rollups, der L2-Konten und -Salden umfasst, wird als [Merkle-Baum](/whitepaper/#merkle-trees) dargestellt. Ein kryptografischer Hash der Wurzel des Merkle-Baums (Merkle-Wurzel) wird im Vertrag auf der Blockchain gespeichert, sodass das Rollup-Protokoll Änderungen im Zustand des ZK-Rollups verfolgen kann.

Das Rollup geht nach der Ausführung eines neuen Satzes von Transaktionen in einen neuen Zustand über. Der Betreiber, der den Zustandsübergang initiiert hat, muss eine neue Zustandswurzel berechnen und an den Vertrag auf der Blockchain übermitteln. Wenn der mit dem Batch verbundene Validitätsnachweis durch den Verifizierer-Vertrag authentifiziert wird, wird die neue Merkle-Wurzel zur kanonischen Zustandswurzel des ZK-Rollups.

Neben der Berechnung von Zustandswurzeln erstellt der ZK-Rollup-Betreiber auch eine Batch-Wurzel – die Wurzel eines Merkle-Baums, der alle Transaktionen in einem Batch umfasst. Wenn ein neuer Batch eingereicht wird, speichert der Rollup-Vertrag die Batch-Wurzel, sodass Benutzer beweisen können, dass eine Transaktion (z. B. eine Abhebungsanforderung) im Batch enthalten war. Benutzer müssen Transaktionsdetails, die Batch-Wurzel und einen [Merkle-Nachweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) bereitstellen, der den Aufnahmepfad zeigt.

### Validitätsnachweise {#validity-proofs}

Die neue Zustandswurzel, die der ZK-Rollup-Betreiber an den L1-Vertrag übermittelt, ist das Ergebnis von Aktualisierungen des Rollup-Zustands. Angenommen, Alice sendet 10 Token an Bob, dann verringert der Betreiber einfach den Kontostand von Alice um 10 und erhöht den Kontostand von Bob um 10. Der Betreiber hasht dann die aktualisierten Kontodaten, baut den Merkle-Baum des Rollups neu auf und übermittelt die neue Merkle-Wurzel an den Vertrag auf der Blockchain.

Aber der Rollup-Vertrag wird das vorgeschlagene Zustands-Commitment nicht automatisch akzeptieren, bis der Betreiber beweist, dass die neue Merkle-Wurzel aus korrekten Aktualisierungen des Rollup-Zustands resultiert. Der ZK-Rollup-Betreiber tut dies, indem er einen Validitätsnachweis erstellt, ein prägnantes kryptografisches Commitment, das die Richtigkeit der gebündelten Transaktionen verifiziert.

Validitätsnachweise ermöglichen es Parteien, die Richtigkeit einer Aussage zu beweisen, ohne die Aussage selbst preiszugeben – daher werden sie auch Zero-Knowledge-Nachweise genannt. ZK-Rollups verwenden Validitätsnachweise, um die Richtigkeit von Off-Chain-Zustandsübergängen zu bestätigen, ohne Transaktionen auf Ethereum erneut ausführen zu müssen. Diese Nachweise können in Form eines [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) oder [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge) vorliegen.

Sowohl SNARKs als auch STARKs helfen dabei, die Integrität der Off-Chain-Berechnung in ZK-Rollups zu bescheinigen, obwohl jeder Nachweistyp charakteristische Merkmale aufweist.

**ZK-SNARKs**

Damit das ZK-SNARK-Protokoll funktioniert, ist die Erstellung eines Common Reference String (CRS) erforderlich: Das CRS stellt öffentliche Parameter zum Beweisen und Verifizieren von Validitätsnachweisen bereit. Die Sicherheit des Beweissystems hängt von der CRS-Einrichtung ab; wenn Informationen, die zur Erstellung öffentlicher Parameter verwendet wurden, in den Besitz böswilliger Akteure gelangen, könnten diese in der Lage sein, falsche Validitätsnachweise zu generieren.

Einige ZK-Rollups versuchen, dieses Problem zu lösen, indem sie eine [Multi-Party Computation Ceremony (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) unter Einbeziehung vertrauenswürdiger Personen verwenden, um öffentliche Parameter für die ZK-SNARK-Schaltung zu generieren. Jede Partei steuert etwas Zufälligkeit (genannt „giftiger Abfall“) zur Konstruktion des CRS bei, die sie sofort zerstören muss.

Vertrauenswürdige Setups (Trusted Setups) werden verwendet, weil sie die Sicherheit der CRS-Einrichtung erhöhen. Solange ein ehrlicher Teilnehmer seine Eingabe zerstört, ist die Sicherheit des ZK-SNARK-Systems garantiert. Dennoch erfordert dieser Ansatz das Vertrauen in die Beteiligten, dass sie ihre gesampelte Zufälligkeit löschen und die Sicherheitsgarantien des Systems nicht untergraben.

Abgesehen von Vertrauensannahmen sind ZK-SNARKs wegen ihrer geringen Nachweisgrößen und der Verifizierung in konstanter Zeit beliebt. Da die Nachweisverifizierung auf L1 den größeren Teil der Kosten für den Betrieb eines ZK-Rollups ausmacht, verwenden L2s ZK-SNARKs, um Nachweise zu generieren, die schnell und kostengünstig im Mainnet verifiziert werden können.

**ZK-STARKs**

Wie ZK-SNARKs beweisen ZK-STARKs die Gültigkeit von Off-Chain-Berechnungen, ohne die Eingaben preiszugeben. ZK-STARKs gelten jedoch aufgrund ihrer Skalierbarkeit und Transparenz als Verbesserung gegenüber ZK-SNARKs.

ZK-STARKs sind „transparent“, da sie ohne das vertrauenswürdige Setup eines Common Reference String (CRS) funktionieren können. Stattdessen verlassen sich ZK-STARKs auf öffentlich verifizierbare Zufälligkeit, um Parameter für die Generierung und Verifizierung von Nachweisen einzurichten.

ZK-STARKs bieten auch mehr Skalierbarkeit, da die Zeit, die zum Beweisen und Verifizieren von Validitätsnachweisen benötigt wird, _quasilinear_ im Verhältnis zur Komplexität der zugrunde liegenden Berechnung steigt. Bei ZK-SNARKs skalieren die Beweis- und Verifizierungszeiten _linear_ im Verhältnis zur Größe der zugrunde liegenden Berechnung. Das bedeutet, dass ZK-STARKs weniger Zeit als ZK-SNARKs zum Beweisen und Verifizieren benötigen, wenn große Datensätze im Spiel sind, was sie für Anwendungen mit hohem Volumen nützlich macht.

ZK-STARKs sind auch sicher gegen Quantencomputer, während die in ZK-SNARKs verwendete Elliptic Curve Cryptography (ECC) weithin als anfällig für Quantencomputer-Angriffe gilt. Der Nachteil von ZK-STARKs ist, dass sie größere Nachweisgrößen produzieren, deren Verifizierung auf Ethereum teurer ist.

#### Wie funktionieren Validitätsnachweise in ZK-Rollups? {#validity-proofs-in-zk-rollups}

##### Nachweisgenerierung

Vor der Annahme von Transaktionen führt der Betreiber die üblichen Überprüfungen durch. Dazu gehört die Bestätigung, dass:

- Die Konten des Senders und Empfängers Teil des Zustandsbaums sind.
- Der Sender über genügend Gelder verfügt, um die Transaktion zu verarbeiten.
- Die Transaktion korrekt ist und mit dem Public-Key des Senders auf dem Rollup übereinstimmt.
- Die Nonce des Senders korrekt ist usw.

Sobald der ZK-Rollup-Blockchain-Knoten genügend Transaktionen hat, aggregiert er sie zu einem Batch und stellt Eingaben für die Beweisschaltung zusammen, um sie in einen prägnanten ZK-Nachweis zu kompilieren. Dies umfasst:

- Eine Merkle-Baum-Wurzel, die alle Transaktionen im Batch umfasst.
- Merkle-Nachweise für Transaktionen, um die Aufnahme in den Batch zu beweisen.
- Merkle-Nachweise für jedes Sender-Empfänger-Paar in Transaktionen, um zu beweisen, dass diese Konten Teil des Zustandsbaums des Rollups sind.
- Eine Reihe von Zwischenzustandswurzeln, die aus der Aktualisierung der Zustandswurzel nach Anwendung von Zustandsaktualisierungen für jede Transaktion abgeleitet werden (d. h. Verringerung der Senderkonten und Erhöhung der Empfängerkonten).

Die Beweisschaltung berechnet den Validitätsnachweis, indem sie über jede Transaktion „schleift“ und dieselben Überprüfungen durchführt, die der Betreiber vor der Verarbeitung der Transaktion abgeschlossen hat. Zuerst verifiziert sie mithilfe des bereitgestellten Merkle-Nachweises, dass das Konto des Senders Teil der bestehenden Zustandswurzel ist. Dann reduziert sie den Kontostand des Senders, erhöht dessen Nonce, hasht die aktualisierten Kontodaten und kombiniert sie mit dem Merkle-Nachweis, um eine neue Merkle-Wurzel zu generieren.

Diese Merkle-Wurzel spiegelt die einzige Änderung im Zustand des ZK-Rollups wider: eine Änderung des Kontostands und der Nonce des Senders. Dies ist möglich, weil der Merkle-Nachweis, der zum Beweis der Existenz des Kontos verwendet wird, zur Ableitung der neuen Zustandswurzel verwendet wird.

Die Beweisschaltung führt denselben Prozess für das Konto des Empfängers durch. Sie prüft, ob das Konto des Empfängers unter der Zwischenzustandswurzel existiert (mithilfe des Merkle-Nachweises), erhöht dessen Kontostand, hasht die Kontodaten neu und kombiniert sie mit dem Merkle-Nachweis, um eine neue Zustandswurzel zu generieren.

Der Prozess wiederholt sich für jede Transaktion; jede „Schleife“ erstellt eine neue Zustandswurzel aus der Aktualisierung des Senderkontos und eine anschließende neue Wurzel aus der Aktualisierung des Empfängerkontos. Wie erklärt, stellt jede Aktualisierung der Zustandswurzel einen Teil des sich ändernden Zustandsbaums des Rollups dar.

Die ZK-Beweisschaltung iteriert über den gesamten Transaktions-Batch und verifiziert die Sequenz von Aktualisierungen, die nach Ausführung der letzten Transaktion zu einer finalen Zustandswurzel führen. Die zuletzt berechnete Merkle-Wurzel wird zur neuesten kanonischen Zustandswurzel des ZK-Rollups.

##### Nachweisverifizierung

Nachdem die Beweisschaltung die Richtigkeit der Zustandsaktualisierungen verifiziert hat, übermittelt der L2-Betreiber den berechneten Validitätsnachweis an den Verifizierer-Vertrag auf L1. Die Verifizierungsschaltung des Vertrags verifiziert die Gültigkeit des Nachweises und prüft auch öffentliche Eingaben, die Teil des Nachweises sind:

- **Vor-Zustandswurzel (Pre-state root)**: Die alte Zustandswurzel des ZK-Rollups (d. h. bevor die gebündelten Transaktionen wurden ausgeführt), die den letzten bekannten gültigen Zustand der L2-Chain widerspiegelt.

- **Nach-Zustandswurzel (Post-state root)**: Die neue Zustandswurzel des ZK-Rollups (d. h. nach der Ausführung der gebündelten Transaktionen), die den neuesten Zustand der L2-Chain widerspiegelt. Die Nach-Zustandswurzel ist die finale Wurzel, die nach Anwendung der Zustandsaktualisierungen in der Beweisschaltung abgeleitet wird.

- **Batch-Wurzel**: Die Merkle-Wurzel des Batches, abgeleitet durch _Merklisierung_ der Transaktionen im Batch und Hashing der Wurzel des Baums.

- **Transaktionseingaben**: Daten, die mit den Transaktionen verbunden sind, die als Teil des eingereichten Batches ausgeführt wurden.

Wenn der Nachweis die Schaltung erfüllt (d. h. er ist gültig), bedeutet dies, dass eine Sequenz gültiger Transaktionen existiert, die das Rollup vom vorherigen Zustand (kryptografisch durch die Vor-Zustandswurzel gekennzeichnet) in einen neuen Zustand (kryptografisch durch die Nach-Zustandswurzel gekennzeichnet) überführt. Wenn die Vor-Zustandswurzel mit der im Rollup-Vertrag gespeicherten Wurzel übereinstimmt und der Nachweis gültig ist, übernimmt der Rollup-Vertrag die Nach-Zustandswurzel aus dem Nachweis und aktualisiert seinen Zustandsbaum, um den geänderten Zustand des Rollups widerzuspiegeln.

### Ein- und Ausgänge {#entries-and-exits}

Benutzer betreten das ZK-Rollup, indem sie Token in den Rollup-Vertrag einzahlen, der auf der L1-Chain bereitgestellt ist. Diese Transaktion wird in eine Warteschlange eingereiht, da nur Betreiber Transaktionen an den Rollup-Vertrag übermitteln können.

Wenn sich die Warteschlange der ausstehenden Einzahlungen zu füllen beginnt, nimmt der ZK-Rollup-Betreiber die Einzahlungstransaktionen und übermittelt sie an den Rollup-Vertrag. Sobald sich die Gelder des Benutzers im Rollup befinden, kann er mit dem Transaktionsverkehr beginnen, indem er Transaktionen zur Verarbeitung an den Betreiber sendet. Benutzer können Salden auf dem Rollup verifizieren, indem sie ihre Kontodaten hashen, den Hash an den Rollup-Vertrag senden und einen Merkle-Nachweis bereitstellen, um ihn gegen die aktuelle Zustandswurzel zu verifizieren.

Das Abheben von einem ZK-Rollup zu L1 ist unkompliziert. Der Benutzer initiiert die Exit-Transaktion, indem er seine Vermögenswerte auf dem Rollup an ein bestimmtes Konto zum Verbrennen (Burning) sendet. Wenn der Betreiber die Transaktion in den nächsten Batch aufnimmt, kann der Benutzer eine Abhebungsanforderung an den Vertrag auf der Blockchain übermitteln. Diese Abhebungsanforderung umfasst Folgendes:

- Merkle-Nachweis, der die Aufnahme der Transaktion des Benutzers an das Burn-Konto in einem Transaktions-Batch beweist

- Transaktionsdaten

- Batch-Wurzel

- L1-Adresse zum Empfang der eingezahlten Gelder

Der Rollup-Vertrag hasht die Transaktionsdaten, prüft, ob die Batch-Wurzel existiert, und verwendet den Merkle-Nachweis, um zu prüfen, ob der Transaktions-Hash Teil der Batch-Wurzel ist. Danach führt der Vertrag die Exit-Transaktion aus und sendet die Gelder an die vom Benutzer gewählte Adresse auf L1.

## ZK-Rollups und EVM-Kompatibilität {#zk-rollups-and-evm-compatibility}

Im Gegensatz zu Optimistic Rollups sind ZK-Rollups nicht ohne Weiteres mit der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) kompatibel. Das Beweisen von Allzweck-EVM-Berechnungen in Schaltungen ist schwieriger und ressourcenintensiver als das Beweisen einfacher Berechnungen (wie der zuvor beschriebene Token-Transfer).

Jedoch wecken [Fortschritte in der Zero-Knowledge-Technologie](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) erneutes Interesse daran, EVM-Berechnungen in Zero-Knowledge-Nachweise zu verpacken. Diese Bemühungen zielen darauf ab, eine Zero-Knowledge-EVM (zkEVM)-Implementierung zu erstellen, die die Richtigkeit der Programmausführung effizient verifizieren kann. Eine zkEVM bildet bestehende EVM-Opcodes zum Beweisen/Verifizieren in Schaltungen nach, was die Ausführung von Smart Contracts ermöglicht.

Wie die EVM geht eine zkEVM zwischen Zuständen über, nachdem Berechnungen an einigen Eingaben durchgeführt wurden. Der Unterschied besteht darin, dass die zkEVM auch Zero-Knowledge-Nachweise erstellt, um die Richtigkeit jedes Schritts in der Programmausführung zu verifizieren. Validitätsnachweise könnten die Richtigkeit von Operationen verifizieren, die den Zustand der VM (Speicher, Stack, Storage) berühren, sowie die Berechnung selbst (d. h. hat die Operation die richtigen Opcodes aufgerufen und sie korrekt ausgeführt?).

Es wird erwartet, dass die Einführung EVM-kompatibler ZK-Rollups Entwicklern hilft, die Skalierbarkeit und Sicherheitsgarantien von Zero-Knowledge-Nachweisen zu nutzen. Noch wichtiger ist, dass die Kompatibilität mit der nativen Ethereum-Infrastruktur bedeutet, dass Entwickler ZK-freundliche Dapps mit vertrauten (und praxiserprobten) Tools und Sprachen erstellen können.

## Wie funktionieren ZK-Rollup-Gebühren? {#how-do-zk-rollup-fees-work}

Wie viel Benutzer für Transaktionen auf ZK-Rollups bezahlen, hängt von der Gasgebühr ab, genau wie im Ethereum-Mainnet. Gasgebühren funktionieren jedoch auf L2 anders und werden von den folgenden Kosten beeinflusst:

1. **Zustandsschreiben**: Es gibt feste Kosten für das Schreiben in den Zustand von Ethereum (d. h. das Übermitteln einer Transaktion auf der Ethereum-Blockchain). ZK-Rollups reduzieren diese Kosten, indem sie Transaktionen bündeln und feste Kosten auf mehrere Benutzer verteilen.

2. **Datenveröffentlichung**: ZK-Rollups veröffentlichen Zustandsdaten für jede Transaktion auf Ethereum als `calldata`. `calldata`-Kosten werden derzeit durch [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) geregelt, das Kosten von 16 Gas für Nicht-Null-Bytes bzw. 4 Gas für Null-Bytes von `calldata` vorschreibt. Die für jede Transaktion gezahlten Kosten werden davon beeinflusst, wie viel `calldata` dafür auf der Blockchain veröffentlicht werden muss.

3. **L2-Betreibergebühren**: Dies ist der Betrag, der dem Rollup-Betreiber als Entschädigung für die bei der Verarbeitung von Transaktionen anfallenden Rechenkosten gezahlt wird, ähnlich wie [Transaktions-„Prioritätsgebühren (Trinkgelder)“](/developers/docs/gas/#how-are-gas-fees-calculated) im Ethereum-Mainnet.

4. **Nachweisgenerierung und -verifizierung**: ZK-Rollup-Betreiber müssen Validitätsnachweise für Transaktions-Batches erstellen, was ressourcenintensiv ist. Die Verifizierung von Zero-Knowledge-Nachweisen im Mainnet kostet ebenfalls Gas (~ 500.000 Gas).

Abgesehen von der Bündelung von Transaktionen reduzieren ZK-Rollups die Gebühren für Benutzer durch die Komprimierung von Transaktionsdaten. Sie können [eine Echtzeit-Übersicht sehen](https://l2fees.info/), wie viel die Nutzung von Ethereum-ZK-Rollups kostet.

## Wie skalieren ZK-Rollups Ethereum? {#scaling-ethereum-with-zk-rollups}

### Transaktionsdatenkomprimierung {#transaction-data-compression}

ZK-Rollups erweitern den Durchsatz auf der Basisschicht von Ethereum, indem sie Berechnungen Off-Chain verlagern, aber der eigentliche Schub für die Skalierung kommt von der Komprimierung von Transaktionsdaten. Die [Blockgröße](/developers/docs/blocks/#block-size) von Ethereum begrenzt die Daten, die jeder Block aufnehmen kann, und damit auch die Anzahl der pro Block verarbeiteten Transaktionen. Durch die Komprimierung transaktionsbezogener Daten erhöhen ZK-Rollups die Anzahl der pro Block verarbeiteten Transaktionen erheblich.

ZK-Rollups können Transaktionsdaten besser komprimieren als Optimistic Rollups, da sie nicht alle Daten veröffentlichen müssen, die zur Validierung jeder Transaktion erforderlich sind. Sie müssen nur die minimalen Daten veröffentlichen, die erforderlich sind, um den neuesten Zustand von Konten und Salden auf dem Rollup wiederherzustellen.

### Rekursive Nachweise {#recursive-proofs}

Ein Vorteil von Zero-Knowledge-Nachweisen ist, dass Nachweise andere Nachweise verifizieren können. Zum Beispiel kann ein einzelner ZK-SNARK andere ZK-SNARKs verifizieren. Solche „Nachweise von Nachweisen“ werden rekursive Nachweise genannt und erhöhen den Durchsatz auf ZK-Rollups drastisch.

Derzeit werden Validitätsnachweise blockweise generiert und zur Verifizierung an den L1-Vertrag übermittelt. Die Verifizierung einzelner Blocknachweise begrenzt jedoch den Durchsatz, den ZK-Rollups erreichen können, da nur ein Block finalisiert werden kann, wenn der Betreiber einen Nachweis einreicht.

Rekursive Nachweise machen es jedoch möglich, mehrere Blöcke mit einem Validitätsnachweis zu finalisieren. Dies liegt daran, dass die Beweisschaltung rekursiv mehrere Blocknachweise aggregiert, bis ein finaler Nachweis erstellt ist. Der L2-Betreiber übermittelt diesen rekursiven Nachweis, und wenn der Vertrag ihn akzeptiert, werden alle relevanten Blöcke sofort finalisiert. Mit rekursiven Nachweisen steigt die Anzahl der ZK-Rollup-Transaktionen, die in Intervallen auf Ethereum finalisiert werden können.

### Vor- und Nachteile von ZK-Rollups {#zk-rollups-pros-and-cons}

| Vorteile                                                                                                                                                                                               | Nachteile                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validitätsnachweise stellen die Richtigkeit von Off-Chain-Transaktionen sicher und verhindern, dass Betreiber ungültige Zustandsübergänge ausführen.                                                                           | Die mit der Berechnung und Verifizierung von Validitätsnachweisen verbundenen Kosten sind erheblich und können die Gebühren für Rollup-Benutzer erhöhen.                                                                            |
| Bietet schnellere Transaktionsfinalität, da Zustandsaktualisierungen genehmigt werden, sobald Validitätsnachweise auf L1 verifiziert sind.                                                                                              | Der Aufbau EVM-kompatibler ZK-Rollups ist aufgrund der Komplexität der Zero-Knowledge-Technologie schwierig.                                                                                                    |
| Verlässt sich für die Sicherheit auf vertrauenslose kryptografische Mechanismen, nicht auf die Ehrlichkeit von Akteuren mit Anreizen wie bei [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Die Erstellung von Validitätsnachweisen erfordert spezialisierte Hardware, was eine zentralisierte Kontrolle der Chain durch wenige Parteien fördern kann.                                                                    |
| Speichert Daten, die zur Wiederherstellung des Off-Chain-Zustands auf L1 benötigt werden, was Sicherheit, Zensurresistenz und Dezentralisierung garantiert.                                                                       | Zentralisierte Betreiber (Sequencer) können die Reihenfolge von Transaktionen beeinflussen.                                                                                                                     |
| Benutzer profitieren von größerer Kapitaleffizienz und können Gelder ohne Verzögerungen von L2 abheben.                                                                                                           | Hardwareanforderungen können die Anzahl der Teilnehmer reduzieren, die die Chain zum Fortschritt zwingen können, was das Risiko erhöht, dass böswillige Betreiber den Zustand des Rollups einfrieren und Benutzer zensieren. |
| Hängt nicht von Liveness-Annahmen ab und Benutzer müssen die Chain nicht validieren, um ihre Gelder zu schützen.                                                                                              | Einige Beweissysteme (z. B. ZK-SNARK) erfordern ein vertrauenswürdiges Setup, das bei falscher Handhabung potenziell das Sicherheitsmodell eines ZK-Rollups gefährden könnte.                                                     |
| Bessere Datenkomprimierung kann helfen, die Kosten für die Veröffentlichung von `calldata` auf Ethereum zu senken und Rollup-Gebühren für Benutzer zu minimieren.                                                                             |                                                                                                                                                                                                    |

### Eine visuelle Erklärung von ZK-Rollups {#zk-video}

Sehen Sie sich an, wie Finematics ZK-Rollups erklärt:

<YouTube id="7pWxCklcNsU" start="406" />


## Wer arbeitet an einer zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM für L2 vs L1</AlertTitle>
<AlertDescription>
Die unten aufgeführten Projekte nutzen die zkEVM-Technologie, um Ebene 2 Rollups aufzubauen. Es wird auch daran geforscht, zkEVM für die L1-Blockverifizierung einzusetzen, was es Validatoren ermöglichen würde, Ethereum-Blöcke ohne die erneute Ausführung von Transaktionen zu verifizieren.
</AlertDescription>
</AlertContent>
</Alert>


Zu den Projekten, die an zkEVMs arbeiten, gehören:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** – _zkEVM ist ein von der Ethereum Foundation finanziertes Projekt zur Entwicklung eines EVM-kompatiblen ZK-Rollups und eines Mechanismus zur Generierung von Validitätsnachweisen für Ethereum-Blöcke._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** – _ist ein dezentralisiertes ZK-Rollup im Ethereum-Mainnet, das an einer Zero-Knowledge Ethereum Virtual Machine (zkEVM) arbeitet, die Ethereum-Transaktionen auf transparente Weise ausführt, einschließlich Smart Contracts mit Zero-Knowledge-Nachweis-Validierungen._

- **[Scroll](https://scroll.io/blog/zkEVM)** – _Scroll ist ein technologiegetriebenes Unternehmen, das am Aufbau einer nativen zkEVM-Ebene-2-Lösung für Ethereum arbeitet._

- **[Taiko](https://taiko.xyz)** – _Taiko ist ein dezentralisiertes, Ethereum-äquivalentes ZK-Rollup (eine [Typ 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** – _ZKsync Era ist ein EVM-kompatibles ZK-Rollup, das von Matter Labs entwickelt wurde und von seiner eigenen zkEVM angetrieben wird._

- **[Starknet](https://starkware.co/starknet/)** – _StarkNet ist eine EVM-kompatible Skalierungslösung der Ebene 2, die von StarkWare entwickelt wurde._

- **[Morph](https://www.morphl2.io/)** – _Morph ist eine hybride Rollup-Skalierungslösung, die ZK-Nachweise nutzt, um das Problem der Ebene-2-Zustandsherausforderung anzugehen._

- **[Linea](https://linea.build)** – _Linea ist eine Ethereum-äquivalente zkEVM der Ebene 2, die von Consensys entwickelt wurde und vollständig auf das Ethereum-Ökosystem abgestimmt ist._

## Weiterführende Literatur zu ZK-Rollups {#further-reading-on-zk-rollups}

- [What Are Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [What are zero-knowledge rollups?](https://alchemy.com/blog/zero-knowledge-rollups)
- [The Practical Guide To Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [What is a zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM types: Ethereum-equivalent, EVM-equivalent, Type 1, Type 4, and other cryptic buzzwords](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Intro to zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [What are ZK-EVM L2s?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Awesome-zkEVM resources](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS under the hood](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [How are SNARKs possible?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutorials: Datenschutz & Zero-Knowledge auf Ethereum {#tutorials}

- [Verwendung von Zero-Knowledge für einen geheimen Zustand](/developers/tutorials/secret-state/) _– Wie man ZK-Nachweise und Off-Chain-Serverkomponenten verwendet, um einen geheimen Spielzustand auf der Blockchain aufrechtzuerhalten._
- [Verwendung von Stealth-Adressen](/developers/tutorials/stealth-addr/) _– Wie ERC-5564-Stealth-Adressen anonyme ETH-Transfers mithilfe kryptografischer Schlüsselableitung ermöglichen._
- [Verwendung von Ethereum für Web2-Authentifizierung](/developers/tutorials/ethereum-for-web2-auth/) _– Wie man Ethereum-Wallet-Signaturen in SAML-basierte Web2-Authentifizierungssysteme integriert._