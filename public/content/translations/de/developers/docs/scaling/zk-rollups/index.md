---
title: Zero-Knowledge-Rollups
description: "Eine Einführung in Zero-Knowledge-Rollups – eine Skalierungslösung, die von der Ethereum-Community verwendet wird."
lang: de
---

Zero-Knowledge-Rollups (ZK-Rollups) sind Layer-2-[Skalierungslösungen](/developers/docs/scaling/), die den Transaktionsdurchsatz im [Ethereum](/) Mainnet erhöhen, indem sie Berechnungen und die Zustandsspeicherung offchain verlagern. ZK-Rollups können Tausende von Transaktionen in einem Batch verarbeiten und dann nur minimale Zusammenfassungsdaten im Mainnet veröffentlichen. Diese Zusammenfassungsdaten definieren die Änderungen, die am Ethereum-Zustand vorgenommen werden sollen, sowie einen kryptographischen Beweis, dass diese Änderungen korrekt sind.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zur [Ethereum-Skalierung](/developers/docs/scaling/) und zu [Layer 2](/layer-2) gelesen und verstanden haben.

## Was sind Zero-Knowledge-Rollups? {#what-are-zk-rollups}

**Zero-Knowledge-Rollups (ZK-Rollups)** bündeln (oder 'rollen auf') Transaktionen in Batches, die offchain ausgeführt werden. Die offchain-Berechnung reduziert die Datenmenge, die auf der Blockchain veröffentlicht werden muss. Betreiber von ZK-Rollups übermitteln eine Zusammenfassung der Änderungen, die erforderlich sind, um alle Transaktionen in einem Batch darzustellen, anstatt jede Transaktion einzeln zu senden. Sie erstellen auch [Gültigkeitsbeweise](/glossary/#validity-proof), um die Korrektheit ihrer Änderungen zu beweisen.

Der Zustand des ZK-Rollups wird durch einen Smart Contract aufrechterhalten, der im Ethereum-Netzwerk bereitgestellt wird. Um diesen Zustand zu aktualisieren, müssen ZK-Rollup-Knoten einen Gültigkeitsbeweis zur Verifizierung einreichen. Wie bereits erwähnt, ist der Gültigkeitsbeweis eine kryptographische Zusicherung, dass die vom Rollup vorgeschlagene Zustandsänderung tatsächlich das Ergebnis der Ausführung des gegebenen Transaktions-Batches ist. Das bedeutet, dass ZK-Rollups nicht alle Transaktionsdaten Onchain veröffentlichen müssen, wie es [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/) tun, da der Gültigkeitsbeweis den Zustandsübergang endgültig macht. Sie veröffentlichen dennoch die Daten, die zur Rekonstruktion des Zustands des Rollups erforderlich sind, wie unten beschrieben.

Es gibt keine Anfechtungsfrist, wenn Gelder von einem ZK-Rollup zu Ethereum verschoben werden: Austritts-Transaktionen werden ausgeführt, sobald der ZK-Rollup-Vertrag den Gültigkeitsbeweis verifiziert, der sie abdeckt. Die Wartezeit ist also nur so lang, wie es dauert, diesen Beweis zu generieren und zu verifizieren (einige ZK-Rollups fügen eine eigene kurze Verzögerung hinzu). Im Gegensatz dazu unterliegt die Abhebung von Geldern aus Optimistic Rollups einer Verzögerung, um es jedem zu ermöglichen, die Austritts-Transaktion mit einem [Betrugsnachweis](/glossary/#fraud-proof) anzufechten.

ZK-Rollups schreiben Transaktionen als `calldata` oder in [Blobs](/roadmap/danksharding/) auf Ethereum. `calldata` ist der Ort, an dem Daten gespeichert werden, die in externen Aufrufen von Smart-Contract-Funktionen enthalten sind. So oder so werden die Daten auf der Blockchain veröffentlicht, was es jedem ermöglicht, den Zustand des Rollups unabhängig zu rekonstruieren. ZK-Rollups verwenden Komprimierungstechniken, um Transaktionsdaten zu reduzieren – zum Beispiel werden Konten durch einen Index anstelle einer Adresse dargestellt, was 28 Bytes an Daten spart. Die Onchain-Datenveröffentlichung ist ein erheblicher Kostenfaktor für Rollups, daher kann die Datenkomprimierung die Gebühren für Benutzer senken.

## Wie interagieren ZK-Rollups mit Ethereum? {#zk-rollups-and-ethereum}

Eine ZK-Rollup-Chain ist ein offchain-Protokoll, das auf der Ethereum-Blockchain aufbaut und von Onchain-Ethereum-Smart-Contracts verwaltet wird. ZK-Rollups führen Transaktionen außerhalb des Mainnets aus, übermitteln aber regelmäßig offchain-Transaktions-Batches an einen Onchain-Rollup-Vertrag. Dieser Transaktionsdatensatz ist unveränderlich, ähnlich wie die Ethereum-Blockchain, und bildet die ZK-Rollup-Chain.

Die Kernarchitektur des ZK-Rollups besteht aus den folgenden Komponenten:

1. **Onchain-Verträge**: Wie bereits erwähnt, wird das ZK-Rollup-Protokoll durch Smart Contracts gesteuert, die auf Ethereum laufen. Dazu gehört der Hauptvertrag, der Rollup-Blöcke speichert, Einzahlungen verfolgt und Zustandsaktualisierungen überwacht. Ein weiterer Onchain-Vertrag (der Verifizierer-Vertrag) verifiziert Zero-Knowledge-Beweise, die von Blockproduzenten eingereicht werden. Somit dient Ethereum als Basisschicht oder „Layer 1“ für das ZK-Rollup.

2. **Offchain Virtual Machine (VM)**: Während das ZK-Rollup-Protokoll auf Ethereum existiert, finden die Transaktionsausführung und die Zustandsspeicherung auf einer separaten virtuellen Maschine statt, die unabhängig von der [EVM](/developers/docs/evm/) ist. Diese offchain-VM ist die Ausführungsumgebung für Transaktionen auf dem ZK-Rollup und dient als sekundäre Schicht oder „Layer 2“ für das ZK-Rollup-Protokoll. Gültigkeitsbeweise, die im Ethereum Mainnet verifiziert werden, garantieren die Korrektheit der Zustandsübergänge in der offchain-VM.

ZK-Rollups sind „hybride Skalierungslösungen“ – offchain-Protokolle, die unabhängig arbeiten, aber ihre Sicherheit von Ethereum ableiten. Insbesondere erzwingt das Ethereum-Netzwerk die Gültigkeit von Zustandsaktualisierungen auf dem ZK-Rollup und garantiert die Datenverfügbarkeit hinter jeder Aktualisierung des Zustands des Rollups. Infolgedessen sind ZK-Rollups wesentlich sicherer als reine offchain-Skalierungslösungen wie [Sidechains](/developers/docs/scaling/sidechains/), die für ihre eigenen Sicherheitseigenschaften verantwortlich sind, oder [Validiums](/developers/docs/scaling/validium/), die ebenfalls Transaktionen auf Ethereum mit Gültigkeitsbeweisen verifizieren, aber Transaktionsdaten an anderer Stelle speichern.

ZK-Rollups verlassen sich in folgenden Punkten auf das Ethereum-Hauptprotokoll:

### Datenverfügbarkeit {#data-availability}

ZK-Rollups veröffentlichen Zustandsdaten für jede offchain verarbeitete Transaktion auf Ethereum. Mit diesen Daten ist es Einzelpersonen oder Unternehmen möglich, den Zustand des Rollups zu reproduzieren und die Chain selbst zu validieren. Ethereum stellt diese Daten allen Teilnehmern des Netzwerks als `calldata` oder in [Blobs](/roadmap/danksharding/) zur Verfügung.

ZK-Rollups müssen nicht viele Transaktionsdaten Onchain veröffentlichen, da Gültigkeitsbeweise bereits die Authentizität von Zustandsübergängen verifizieren. Dennoch ist die Onchain-Speicherung von Daten wichtig, da sie eine erlaubnisfreie, unabhängige Verifizierung des Zustands der L2-Chain ermöglicht, was wiederum jedem erlaubt, Transaktions-Batches einzureichen, und so verhindert, dass böswillige Betreiber die Chain zensieren oder einfrieren.

Onchain-Daten sind erforderlich, damit Benutzer mit dem Rollup interagieren können. Ohne Zugriff auf Zustandsdaten können Benutzer ihren Kontostand nicht abfragen oder Transaktionen (z. B. Abhebungen) initiieren, die auf Zustandsinformationen angewiesen sind.

### Endgültigkeit von Transaktionen {#transaction-finality}

Ethereum fungiert als Abwicklungsschicht für ZK-Rollups: L2-Transaktionen werden nur dann endgültig, wenn der L1-Vertrag den Gültigkeitsbeweis akzeptiert. Dies eliminiert das Risiko, dass böswillige Betreiber die Chain korrumpieren (z. B. Rollup-Gelder stehlen), da jede Transaktion im Mainnet genehmigt werden muss. Außerdem garantiert Ethereum, dass Benutzeroperationen nicht rückgängig gemacht werden können, sobald sie auf L1 endgültig sind.

### Zensurresistenz {#censorship-resistance}

Die meisten ZK-Rollups verwenden einen „Supernode“ (den Betreiber), um Transaktionen auszuführen, Batches zu produzieren und Blöcke an L1 zu übermitteln. Während dies Effizienz gewährleistet, erhöht es das Risiko von Zensur: Böswillige ZK-Rollup-Betreiber können Benutzer zensieren, indem sie sich weigern, deren Transaktionen in Batches aufzunehmen.

Als Sicherheitsmaßnahme erlauben ZK-Rollups Benutzern, Transaktionen direkt an den Rollup-Vertrag im Mainnet zu übermitteln, wenn sie glauben, vom Betreiber zensiert zu werden. Dies ermöglicht es Benutzern, einen Austritt aus dem ZK-Rollup zu Ethereum zu erzwingen, ohne auf die Erlaubnis des Betreibers angewiesen zu sein.

## Wie funktionieren ZK-Rollups? {#how-do-zk-rollups-work}

### Transaktionen {#transactions}

Benutzer im ZK-Rollup signieren Transaktionen und übermitteln sie an L2-Betreiber zur Verarbeitung und Aufnahme in den nächsten Batch. In einigen Fällen ist der Betreiber eine zentralisierte Entität, genannt Sequencer, der Transaktionen ausführt, sie zu Batches aggregiert und an L1 übermittelt. Der Sequencer in diesem System ist die einzige Entität, die L2-Blöcke produzieren und Rollup-Transaktionen zum ZK-Rollup-Vertrag hinzufügen darf.

Andere ZK-Rollups können die Betreiberrolle rotieren lassen, indem sie ein [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)-Validator-Set verwenden. Potenzielle Betreiber hinterlegen Gelder im Rollup-Vertrag, wobei die Größe jedes Stakes die Chancen des Stakers beeinflusst, für die Produktion des nächsten Rollup-Batches ausgewählt zu werden. Der Stake des Betreibers kann durch Slashing bestraft werden, wenn er böswillig handelt, was einen Anreiz schafft, gültige Blöcke zu veröffentlichen.

#### Wie ZK-Rollups Transaktionsdaten auf Ethereum veröffentlichen {#how-zk-rollups-publish-transaction-data-on-ethereum}

Wie erklärt, werden Transaktionsdaten auf Ethereum als `calldata` veröffentlicht. `calldata` ist ein Datenbereich in einem Smart Contract, der verwendet wird, um Argumente an eine Funktion zu übergeben, und verhält sich ähnlich wie [Memory](/developers/docs/smart-contracts/anatomy/#memory). Während `calldata` nicht als Teil des Ethereum-Zustands gespeichert wird, bleibt es Onchain als Teil der [Verlaufsprotokolle](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) der Ethereum-Chain bestehen. `calldata` beeinflusst den Zustand von Ethereum nicht, was es zu einer günstigen Möglichkeit macht, Daten Onchain zu speichern.

Das Schlüsselwort `calldata` identifiziert oft die Smart-Contract-Methode, die von einer Transaktion aufgerufen wird, und enthält Eingaben für die Methode in Form einer beliebigen Byte-Sequenz. ZK-Rollups verwenden `calldata`, um komprimierte Transaktionsdaten Onchain zu veröffentlichen; der Rollup-Betreiber fügt einfach einen neuen Batch hinzu, indem er die erforderliche Funktion im Rollup-Vertrag aufruft und die komprimierten Daten als Funktionsargumente übergibt. Dies hilft, die Kosten für Benutzer zu senken, da ein großer Teil der Rollup-Gebühren für die Onchain-Speicherung von Transaktionsdaten anfällt.

Seit das [Dencun-Upgrade](/roadmap/dencun/) Blob-tragende Transaktionen ([EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)) eingeführt hat, können Rollups ihre Daten auch in [Blobs](/roadmap/danksharding/) veröffentlichen, die in einem separaten Gebührenmarkt bepreist werden und in der Regel günstiger sind als `calldata`. Blobs werden nicht von der Ausführungsschicht gespeichert, und das Protokoll definiert nur ein minimales Zeitfenster von etwa 18 Tagen, in dem das Netzwerk Blob-Daten bereitstellen muss. Das ist eher eine Bereitstellungspflicht als eine Löschfrist: Blob-Daten sind kein permanenter Archivspeicher wie der Verlauf der Ausführungsschicht, und der längerfristige Zugriff hängt von Archivierungsdiensten ab. `calldata` bleibt verfügbar, und Rollups unterscheiden sich darin, was sie verwenden.

Unabhängig davon, welchen Mechanismus ein Rollup verwendet, sind die veröffentlichten Daten öffentlich. Rollups unterscheiden sich darin, was sie veröffentlichen: Einige posten komprimierte Transaktionsdaten und andere posten Zustandsunterschiede, aber in beiden Fällen reicht es aus, damit jeder den Zustand des Rollups unabhängig rekonstruieren kann. Die Veröffentlichung dieser Daten macht eine erlaubnisfreie Verifizierung möglich; es ist kein Mechanismus für Privatsphäre.

### Zustands-Commitments {#state-commitments}

Der Zustand des ZK-Rollups, der L2-Konten und -Salden umfasst, wird als [Merkle-Baum](/whitepaper/#merkle-trees) dargestellt. Ein kryptographischer Hash der Wurzel des Merkle-Baums (Merkle-Wurzel) wird im Onchain-Vertrag gespeichert, was es dem Rollup-Protokoll ermöglicht, Änderungen im Zustand des ZK-Rollups zu verfolgen.

Das Rollup geht nach der Ausführung eines neuen Satzes von Transaktionen in einen neuen Zustand über. Der Betreiber, der den Zustandsübergang initiiert hat, muss eine neue Zustandswurzel berechnen und an den Onchain-Vertrag übermitteln. Wenn der mit dem Batch verbundene Gültigkeitsbeweis durch den Verifizierer-Vertrag authentifiziert wird, wird die neue Merkle-Wurzel zur kanonischen Zustandswurzel des ZK-Rollups.

Neben der Berechnung von Zustandswurzeln erstellt der ZK-Rollup-Betreiber auch eine Batch-Wurzel – die Wurzel eines Merkle-Baums, der alle Transaktionen in einem Batch umfasst. Wenn ein neuer Batch eingereicht wird, speichert der Rollup-Vertrag die Batch-Wurzel, was es Benutzern ermöglicht, zu beweisen, dass eine Transaktion (z. B. eine Abhebungsanforderung) im Batch enthalten war. Benutzer müssen Transaktionsdetails, die Batch-Wurzel und einen [Merkle-Nachweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) vorlegen, der den Inklusionspfad zeigt.

### Gültigkeitsbeweise {#validity-proofs}

Die neue Zustandswurzel, die der ZK-Rollup-Betreiber an den L1-Vertrag übermittelt, ist das Ergebnis von Aktualisierungen des Zustands des Rollups. Angenommen, Alice sendet 10 Token an Bob, dann verringert der Betreiber einfach den Kontostand von Alice um 10 und erhöht den Kontostand von Bob um 10. Der Betreiber hasht dann die aktualisierten Kontodaten, baut den Merkle-Baum des Rollups neu auf und übermittelt die neue Merkle-Wurzel an den Onchain-Vertrag.

Aber der Rollup-Vertrag wird das vorgeschlagene Zustands-Commitment nicht automatisch akzeptieren, bis der Betreiber beweist, dass die neue Merkle-Wurzel aus korrekten Aktualisierungen des Zustands des Rollups resultiert. Der ZK-Rollup-Betreiber tut dies, indem er einen Gültigkeitsbeweis erstellt, ein prägnantes kryptographisches Commitment, das die Korrektheit der gebündelten Transaktionen verifiziert.

ZK-Rollups verwenden prägnante Gültigkeitsbeweise, um festzustellen, dass offchain-Zustandsübergänge korrekt berechnet wurden. Die Prägnanz hält Beweise kompakt und die Verifizierung im Verhältnis zur zugrunde liegenden Berechnung effizient, was es Ethereum ermöglicht, Zustandsübergänge zu verifizieren, ohne jede Transaktion neu auszuführen. Ein Beweissystem kann zusätzlich Zero-Knowledge bieten, was bedeutet, dass seine Beweise keine Informationen über private Eingaben preisgeben, die über das hinausgehen, was aus der öffentlichen Aussage folgt. Dies sind separate Eigenschaften: Die Verwendung von Gültigkeitsbeweisen zur Skalierung macht die Transaktionen eines Rollups nicht per se vertraulich. Diese Beweise können in Form eines [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) oder [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge) vorliegen.

Sowohl SNARKs als auch STARKs helfen dabei, die Integrität der offchain-Berechnung in ZK-Rollups zu bescheinigen, obwohl jeder Beweistyp charakteristische Merkmale aufweist.

**ZK-SNARKs**

Damit das ZK-SNARK-Protokoll funktioniert, ist die Erstellung eines Common Reference String (CRS) erforderlich: Der CRS liefert öffentliche Parameter zum Beweisen und Verifizieren von Gültigkeitsbeweisen. Die Sicherheit des Beweissystems hängt vom CRS-Setup ab; wenn Informationen, die zur Erstellung öffentlicher Parameter verwendet wurden, in den Besitz böswilliger Akteure gelangen, könnten diese in der Lage sein, falsche Gültigkeitsbeweise zu generieren.

Einige ZK-Rollups versuchen, dieses Problem zu lösen, indem sie eine [Multi-Party Computation Ceremony (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) unter Einbeziehung vertrauenswürdiger Personen verwenden, um öffentliche Parameter für den ZK-SNARK-Schaltkreis zu generieren. Jede Partei steuert etwas Zufälligkeit (genannt „Toxic Waste“) zur Konstruktion des CRS bei, die sie sofort zerstören muss.

Trusted Setups werden verwendet, weil sie die Sicherheit des CRS-Setups erhöhen. Solange ein ehrlicher Teilnehmer seine Eingabe zerstört, ist die Sicherheit des ZK-SNARK-Systems garantiert. Dennoch erfordert dieser Ansatz das Vertrauen in die Beteiligten, dass sie ihre gesampelte Zufälligkeit löschen und die Sicherheitsgarantien des Systems nicht untergraben.

Abgesehen von Vertrauensannahmen sind ZK-SNARKs wegen ihrer geringen Beweisgrößen und der Verifizierung in konstanter Zeit beliebt. Da die Beweisverifizierung auf L1 den größeren Teil der Kosten für den Betrieb eines ZK-Rollups ausmacht, verwenden L2s ZK-SNARKs, um Beweise zu generieren, die schnell und günstig im Mainnet verifiziert werden können.

**ZK-STARKs**

Wie ZK-SNARKs ermöglichen ZK-STARKs einem Verifizierer, die Gültigkeit einer offchain-Berechnung zu bestätigen, ohne sie neu auszuführen, und können die privaten Eingaben eines Beweisers verbergen, wenn ein System die Zero-Knowledge-Eigenschaft implementiert. In einem Rollup werden die Daten, die zur Rekonstruktion des Zustands der Chain benötigt werden, weiterhin auf Ethereum veröffentlicht. ZK-STARKs gelten aufgrund ihrer Skalierbarkeit und Transparenz als Verbesserung gegenüber ZK-SNARKs.

ZK-STARKs sind „transparent“, da sie ohne das Trusted Setup eines Common Reference String (CRS) funktionieren können. Stattdessen verlassen sich ZK-STARKs auf öffentlich verifizierbare Zufälligkeit, um Parameter für die Generierung und Verifizierung von Beweisen festzulegen.

ZK-STARKs skalieren auch gut: Die Zeit, die benötigt wird, um einen Beweis zu generieren, wächst _quasilinear_ mit der Größe der zugrunde liegenden Berechnung, während die Zeit, die benötigt wird, um ihn zu verifizieren, nur _polylogarithmisch_ wächst. ZK-STARK-Beweiser sind bei großen Berechnungen typischerweise schneller als ZK-SNARK-Beweiser, was sie für Anwendungen mit hohem Volumen nützlich macht. Der Kompromiss besteht darin, dass STARK-Beweise größer sind und mehr kosten, um sie auf L1 zu verifizieren, während die ZK-SNARK-Verifizierung unabhängig von der Größe der Berechnung eine konstante Zeit in Anspruch nimmt.

ZK-STARKs sind auch sicher gegen Quantencomputer, während die in ZK-SNARKs verwendete Kryptographie auf Basis elliptischer Kurven (ECC) weithin als anfällig für Quantencomputer-Angriffe gilt. Der Nachteil von ZK-STARKs ist, dass sie größere Beweisgrößen produzieren, die auf Ethereum teurer zu verifizieren sind.

#### Wie funktionieren Gültigkeitsbeweise in ZK-Rollups? {#validity-proofs-in-zk-rollups}

##### Beweisgenerierung

Bevor Transaktionen akzeptiert werden, führt der Betreiber die üblichen Überprüfungen durch. Dazu gehört die Bestätigung, dass:

- Die Konten von Sender und Empfänger Teil des Zustandsbaums sind.
- Der Sender über genügend Geldmittel verfügt, um die Transaktion zu verarbeiten.
- Die Transaktion korrekt ist und mit dem öffentlichen Schlüssel des Senders auf dem Rollup übereinstimmt.
- Die Nonce des Senders korrekt ist usw.

Sobald der ZK-Rollup-Knoten genügend Transaktionen hat, aggregiert er sie zu einem Batch und stellt Eingaben für den Beweisschaltkreis zusammen, um sie in einen prägnanten ZK-Beweis zu kompilieren. Dies umfasst:

- Eine Merkle-Baum-Wurzel, die alle Transaktionen im Batch umfasst.
- Merkle-Nachweise für Transaktionen, um die Aufnahme in den Batch zu beweisen.
- Merkle-Nachweise für jedes Sender-Empfänger-Paar in Transaktionen, um zu beweisen, dass diese Konten Teil des Zustandsbaums des Rollups sind.
- Eine Reihe von Zwischenzustandswurzeln, die aus der Aktualisierung der Zustandswurzel nach Anwendung von Zustandsaktualisierungen für jede Transaktion abgeleitet werden (d. h. Verringerung der Senderkonten und Erhöhung der Empfängerkonten).

Der Beweisschaltkreis berechnet den Gültigkeitsbeweis, indem er über jede Transaktion „iteriert“ und dieselben Überprüfungen durchführt, die der Betreiber vor der Verarbeitung der Transaktion abgeschlossen hat. Zuerst verifiziert er mithilfe des bereitgestellten Merkle-Nachweises, dass das Konto des Senders Teil der bestehenden Zustandswurzel ist. Dann reduziert er den Kontostand des Senders, erhöht dessen Nonce, hasht die aktualisierten Kontodaten und kombiniert sie mit dem Merkle-Nachweis, um eine neue Merkle-Wurzel zu generieren.

Diese Merkle-Wurzel spiegelt die einzige Änderung im Zustand des ZK-Rollups wider: eine Änderung des Kontostands und der Nonce des Senders. Dies ist möglich, weil der Merkle-Nachweis, der verwendet wird, um die Existenz des Kontos zu beweisen, verwendet wird, um die neue Zustandswurzel abzuleiten.

Der Beweisschaltkreis führt denselben Prozess für das Konto des Empfängers durch. Er überprüft, ob das Konto des Empfängers unter der Zwischenzustandswurzel existiert (mithilfe des Merkle-Nachweises), erhöht dessen Kontostand, hasht die Kontodaten neu und kombiniert sie mit dem Merkle-Nachweis, um eine neue Zustandswurzel zu generieren.

Der Prozess wiederholt sich für jede Transaktion; jede „Schleife“ erstellt eine neue Zustandswurzel aus der Aktualisierung des Senderkontos und eine anschließende neue Wurzel aus der Aktualisierung des Empfängerkontos. Wie erklärt, stellt jede Aktualisierung der Zustandswurzel die Änderung eines Teils des Zustandsbaums des Rollups dar.

Der ZK-Beweisschaltkreis iteriert über den gesamten Transaktions-Batch und verifiziert die Sequenz von Aktualisierungen, die nach Ausführung der letzten Transaktion zu einer endgültigen Zustandswurzel führen. Die zuletzt berechnete Merkle-Wurzel wird zur neuesten kanonischen Zustandswurzel des ZK-Rollups.

##### Beweisverifizierung

Nachdem der Beweisschaltkreis die Korrektheit der Zustandsaktualisierungen verifiziert hat, übermittelt der L2-Betreiber den berechneten Gültigkeitsbeweis an den Verifizierer-Vertrag auf L1. Der Verifizierungsschaltkreis des Vertrags verifiziert die Gültigkeit des Beweises und überprüft auch öffentliche Eingaben, die Teil des Beweises sind:

- **Pre-State-Wurzel**: Die alte Zustandswurzel des ZK-Rollups (d. h. bevor die gebündelten Transaktionen wurden ausgeführt), die den letzten bekannten gültigen Zustand der L2-Chain widerspiegelt.

- **Post-State-Wurzel**: Die neue Zustandswurzel des ZK-Rollups (d. h. nach der Ausführung der gebündelten Transaktionen), die den neuesten Zustand der L2-Chain widerspiegelt. Die Post-State-Wurzel ist die endgültige Wurzel, die nach Anwendung von Zustandsaktualisierungen im Beweisschaltkreis abgeleitet wird.

- **Batch-Wurzel**: Die Merkle-Wurzel des Batches, die durch _Merklisierung_ von Transaktionen im Batch und Hashing der Wurzel des Baums abgeleitet wird.

- **Transaktionseingaben**: Daten, die mit den Transaktionen verbunden sind, die als Teil des eingereichten Batches ausgeführt wurden.

Wenn der Beweis den Schaltkreis zufriedenstellt (d. h. er ist gültig), bedeutet dies, dass eine Sequenz gültiger Transaktionen existiert, die das Rollup vom vorherigen Zustand (kryptographisch durch die Pre-State-Wurzel gekennzeichnet) in einen neuen Zustand (kryptographisch durch die Post-State-Wurzel gekennzeichnet) überführt. Wenn die Pre-State-Wurzel mit der im Rollup-Vertrag gespeicherten Wurzel übereinstimmt und der Beweis gültig ist, übernimmt der Rollup-Vertrag die Post-State-Wurzel aus dem Beweis und aktualisiert seinen Zustandsbaum, um den geänderten Zustand des Rollups widerzuspiegeln.

<ZkRollupDiagram />

### Eintritte und Austritte {#entries-and-exits}

Benutzer treten in das ZK-Rollup ein, indem sie Token in den Rollup-Vertrag einzahlen, der auf der L1-Chain bereitgestellt ist. Diese Transaktion wird in eine Warteschlange eingereiht, da nur Betreiber Transaktionen an den Rollup-Vertrag übermitteln können.

Wenn sich die Warteschlange für ausstehende Einzahlungen zu füllen beginnt, nimmt der ZK-Rollup-Betreiber die Einzahlungstransaktionen und übermittelt sie an den Rollup-Vertrag. Sobald sich die Gelder des Benutzers im Rollup befinden, kann er mit Transaktionen beginnen, indem er Transaktionen zur Verarbeitung an den Betreiber sendet. Benutzer können Salden auf dem Rollup verifizieren, indem sie ihre Kontodaten hashen, den Hash an den Rollup-Vertrag senden und einen Merkle-Nachweis bereitstellen, um ihn gegen die aktuelle Zustandswurzel zu verifizieren.

Die Abhebung von einem ZK-Rollup zu L1 ist unkompliziert. Der Benutzer initiiert die Austritts-Transaktion, indem er seine Vermögenswerte auf dem Rollup an ein bestimmtes Konto zum Verbrennen sendet. Wenn der Betreiber die Transaktion in den nächsten Batch aufnimmt, kann der Benutzer eine Abhebungsanforderung an den Onchain-Vertrag übermitteln. Diese Abhebungsanforderung umfasst Folgendes:

- Merkle-Nachweis, der die Aufnahme der Transaktion des Benutzers an das Burn-Konto in einen Transaktions-Batch beweist

- Transaktionsdaten

- Batch-Wurzel

- L1-Adresse zum Empfang der eingezahlten Gelder

Der Rollup-Vertrag hasht die Transaktionsdaten, überprüft, ob die Batch-Wurzel existiert, und verwendet den Merkle-Nachweis, um zu überprüfen, ob der Transaktions-Hash Teil der Batch-Wurzel ist. Danach führt der Vertrag die Austritts-Transaktion aus und sendet die Gelder an die vom Benutzer gewählte Adresse auf L1.

## ZK-Rollups und EVM-Kompatibilität {#zk-rollups-and-evm-compatibility}

Im Gegensatz zu Optimistic Rollups sind ZK-Rollups nicht ohne Weiteres mit der [Virtuellen Ethereum-Maschine (EVM)](/developers/docs/evm/) kompatibel. Das Beweisen von Allzweck-EVM-Berechnungen in Schaltkreisen ist schwieriger und ressourcenintensiver als das Beweisen einfacher Berechnungen (wie der zuvor beschriebene Token-Transfer).

Jedoch wecken [Fortschritte in der Zero-Knowledge-Technologie](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) erneutes Interesse daran, EVM-Berechnungen in Zero-Knowledge-Beweise zu verpacken. Diese Bemühungen zielen darauf ab, eine Zero-Knowledge-EVM (zkEVM)-Implementierung zu schaffen, die die Korrektheit der Programmausführung effizient verifizieren kann. Eine zkEVM bildet bestehende EVM-Opcodes zum Beweisen/Verifizieren in Schaltkreisen nach, was die Ausführung von Smart Contracts ermöglicht.

Wie die EVM wechselt eine zkEVM zwischen Zuständen, nachdem Berechnungen an einigen Eingaben durchgeführt wurden. Der Unterschied besteht darin, dass die zkEVM auch Zero-Knowledge-Beweise erstellt, um die Korrektheit jedes Schritts in der Programmausführung zu verifizieren. Gültigkeitsbeweise könnten die Korrektheit von Operationen verifizieren, die den Zustand der VM (Memory, Stack, Storage) berühren, sowie die Berechnung selbst (d. h. hat die Operation die richtigen Opcodes aufgerufen und sie korrekt ausgeführt?).

Es wird erwartet, dass die Einführung EVM-kompatibler ZK-Rollups Entwicklern hilft, die Skalierbarkeit und Sicherheitsgarantien von Zero-Knowledge-Beweisen zu nutzen. Noch wichtiger ist, dass die Kompatibilität mit der nativen Ethereum-Infrastruktur bedeutet, dass Entwickler ZK-freundliche Dapps mit vertrauten (und praxiserprobten) Tools und Sprachen erstellen können.

## Wie funktionieren ZK-Rollup-Gebühren? {#how-do-zk-rollup-fees-work}

Wie viel Benutzer für Transaktionen auf ZK-Rollups bezahlen, hängt von der Gasgebühr ab, genau wie im Ethereum Mainnet. Gasgebühren funktionieren jedoch auf L2 anders und werden von den folgenden Kosten beeinflusst:

1. **Zustandsschreiben**: Es gibt feste Kosten für das Schreiben in den Zustand von Ethereum (d. h. das Übermitteln einer Transaktion auf der Ethereum-Blockchain). ZK-Rollups reduzieren diese Kosten, indem sie Transaktionen bündeln und die Fixkosten auf mehrere Benutzer verteilen.

2. **Datenveröffentlichung**: ZK-Rollups veröffentlichen Zustandsdaten für jede Transaktion auf Ethereum als `calldata` oder in [Blobs](/roadmap/danksharding/). Der intrinsische Gas-Plan für `calldata` berechnet 16 Gas pro Nicht-Null-Byte und 4 Gas pro Null-Byte, eine Reduzierung, die durch [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) eingeführt wurde; [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) regelt den Preis, der pro Gaseinheit gezahlt wird, und nicht den Byte-Plan selbst. [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) wendet zusätzlich Mindestkosten auf datenintensive Transaktionen an, sodass eine von `calldata` dominierte Transaktion mehr als den Standardplan zahlen kann, während rechenintensive Transaktionen unberührt bleiben. Die für jede Transaktion gezahlten Kosten werden davon beeinflusst, wie viele Daten dafür Onchain veröffentlicht werden müssen.

3. **L2-Betreibergebühren**: Dies ist der Betrag, der dem Rollup-Betreiber als Entschädigung für die bei der Verarbeitung von Transaktionen anfallenden Rechenkosten gezahlt wird, ähnlich wie [Transaktions-„Prioritätsgebühren (Trinkgelder)“](/developers/docs/gas/#how-are-gas-fees-calculated) im Ethereum Mainnet.

4. **Beweisgenerierung und -verifizierung**: ZK-Rollup-Betreiber müssen Gültigkeitsbeweise für Transaktions-Batches erstellen, was ressourcenintensiv ist. Die Verifizierung von Zero-Knowledge-Beweisen im Mainnet kostet ebenfalls Gas, von einigen Hunderttausend Gas für einen ZK-SNARK bis zu mehreren Millionen für einen ZK-STARK, abhängig vom Beweissystem.

Abgesehen von der Bündelung von Transaktionen reduzieren ZK-Rollups die Gebühren für Benutzer durch die Komprimierung von Transaktionsdaten. Sie können [eine Echtzeit-Übersicht sehen](https://l2fees.info/), wie viel die Nutzung von Ethereum-ZK-Rollups kostet.

## Wie skalieren ZK-Rollups Ethereum? {#scaling-ethereum-with-zk-rollups}

### Transaktionsdatenkomprimierung {#transaction-data-compression}

ZK-Rollups erweitern den Transaktionsdurchsatz auf der Basisschicht von Ethereum, indem sie Berechnungen offchain verlagern, aber der eigentliche Schub für die Skalierung kommt von der Komprimierung von Transaktionsdaten. Die [Blockgröße](/developers/docs/blocks/#block-size) von Ethereum begrenzt die Daten, die jeder Block aufnehmen kann, und damit auch die Anzahl der pro Block verarbeiteten Transaktionen. Durch die Komprimierung transaktionsbezogener Daten erhöhen ZK-Rollups die Anzahl der pro Block verarbeiteten Transaktionen erheblich.

ZK-Rollups können Transaktionsdaten besser komprimieren als Optimistic Rollups, da sie nicht alle Daten veröffentlichen müssen, die zur Validierung jeder Transaktion erforderlich sind. Sie müssen nur die minimalen Daten veröffentlichen, die erforderlich sind, um den neuesten Zustand von Konten und Salden auf dem Rollup wiederherzustellen.

### Rekursive Beweise {#recursive-proofs}

Ein Vorteil von Zero-Knowledge-Beweisen ist, dass Beweise andere Beweise verifizieren können. Zum Beispiel kann ein einzelner ZK-SNARK andere ZK-SNARKs verifizieren. Solche „Beweise von Beweisen“ werden rekursive Beweise genannt und erhöhen den Transaktionsdurchsatz auf ZK-Rollups drastisch.

Derzeit werden Gültigkeitsbeweise blockweise generiert und zur Verifizierung an den L1-Vertrag übermittelt. Die Verifizierung einzelner Blockbeweise begrenzt jedoch den Transaktionsdurchsatz, den ZK-Rollups erreichen können, da nur ein Block endgültig gemacht werden kann, wenn der Betreiber einen Beweis einreicht.

Rekursive Beweise machen es jedoch möglich, mehrere Blöcke mit einem einzigen Gültigkeitsbeweis endgültig zu machen. Dies liegt daran, dass der Beweisschaltkreis rekursiv mehrere Blockbeweise aggregiert, bis ein endgültiger Beweis erstellt ist. Der L2-Betreiber reicht diesen rekursiven Beweis ein, und wenn der Vertrag ihn akzeptiert, werden alle relevanten Blöcke sofort endgültig. Mit rekursiven Beweisen erhöht sich die Anzahl der ZK-Rollup-Transaktionen, die in Intervallen auf Ethereum endgültig gemacht werden können.

### Vor- und Nachteile von ZK-Rollups {#zk-rollups-pros-and-cons}

| Vorteile                                                                                                                                                                                                   | Nachteile                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gültigkeitsbeweise stellen die Korrektheit von offchain-Transaktionen sicher und verhindern, dass Betreiber ungültige Zustandsübergänge ausführen.                                                                           | Die mit der Berechnung und Verifizierung von Gültigkeitsbeweisen verbundenen Kosten sind erheblich und können die Gebühren für Rollup-Benutzer erhöhen.                                                                            |
| Bietet eine schnellere Endgültigkeit von Transaktionen, da Zustandsaktualisierungen genehmigt werden, sobald Gültigkeitsbeweise auf L1 verifiziert sind.                                                                                              | Der Aufbau EVM-kompatibler ZK-Rollups ist aufgrund der Komplexität der Zero-Knowledge-Technologie schwierig.                                                                                                    |
| Verlässt sich für die Sicherheit auf vertrauenslose kryptographische Mechanismen, nicht auf die Ehrlichkeit von Akteuren mit Anreizen wie bei [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-rollups-pros-and-cons). | Die Erstellung von Gültigkeitsbeweisen erfordert spezialisierte Hardware, was eine zentralisierte Kontrolle der Chain durch wenige Parteien begünstigen kann.                                                                    |
| Speichert Daten, die zur Wiederherstellung des offchain-Zustands auf L1 benötigt werden, was Sicherheit, Zensurresistenz und Dezentralisierung garantiert.                                                                       | Zentralisierte Betreiber (Sequencer) können die Reihenfolge von Transaktionen beeinflussen.                                                                                                                     |
| Benutzer profitieren von einer höheren Kapitaleffizienz und können Gelder ohne Verzögerungen von L2 abheben.                                                                                                           | Hardwareanforderungen können die Anzahl der Teilnehmer reduzieren, die die Chain zum Fortschritt zwingen können, was das Risiko erhöht, dass böswillige Betreiber den Zustand des Rollups einfrieren und Benutzer zensieren. |
| Hängt nicht von Liveness-Annahmen ab und Benutzer müssen die Chain nicht validieren, um ihre Gelder zu schützen.                                                                                              | Einige Beweissysteme (z. B. ZK-SNARK) erfordern ein Trusted Setup, das bei falscher Handhabung möglicherweise das Sicherheitsmodell eines ZK-Rollups gefährden könnte.                                                     |
| Eine bessere Datenkomprimierung kann helfen, die Kosten für die Veröffentlichung von `calldata` auf Ethereum zu senken und die Rollup-Gebühren für Benutzer zu minimieren.                                                                             |                                                                                                                                                                                                    |

### Eine visuelle Erklärung von ZK-Rollups {#zk-video}

Sehen Sie sich an, wie Finematics ZK-Rollups erklärt:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Wer arbeitet an einer zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM für L2 vs. L1</AlertTitle>
<AlertDescription>
Die unten stehenden Projekte verwenden zkEVM-Technologie, um Layer-2-Rollups zu erstellen. Es gibt auch Forschungen zur Verwendung von zkEVM für die [L1-Blockverifizierung](/roadmap/zkevm/), was es Validatoren ermöglichen würde, Ethereum-Blöcke zu verifizieren, ohne Transaktionen neu auszuführen.
</AlertDescription>
</AlertContent>
</Alert>

Zu den Projekten, die an zkEVMs arbeiten, gehören:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** – _zkEVM ist ein von der Ethereum Foundation finanziertes Projekt zur Entwicklung eines EVM-kompatiblen ZK-Rollups und eines Mechanismus zur Generierung von Gültigkeitsbeweisen für Ethereum-Blöcke._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** – _ist ein dezentrales ZK-Rollup im Ethereum Mainnet, das an einer Zero-Knowledge Ethereum Virtual Machine (zkEVM) arbeitet, die Ethereum-Transaktionen auf transparente Weise ausführt, einschließlich Smart Contracts mit Zero-Knowledge-Beweis-Validierungen._

- **[Scroll](https://scroll.io/blog/zkEVM)** – _Scroll ist ein technologiegetriebenes Unternehmen, das am Aufbau einer nativen zkEVM-Layer-2-Lösung für Ethereum arbeitet._

- **[Taiko](https://taiko.xyz)** – _Taiko ist ein dezentrales, Ethereum-äquivalentes ZK-Rollup (eine [Typ-1-ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** – _ZKsync Era ist ein EVM-kompatibles ZK-Rollup, das von Matter Labs entwickelt wurde und von seiner eigenen zkEVM angetrieben wird._

- **[Starknet](https://starkware.co/starknet/)** – _Starknet ist eine EVM-kompatible Layer-2-Skalierungslösung, die von StarkWare entwickelt wurde._

- **[Morph](https://www.morphl2.io/)** – _Morph ist eine hybride Rollup-Skalierungslösung, die ZK-Beweise nutzt, um das Problem der Layer-2-Zustandsherausforderung anzugehen._

- **[Linea](https://linea.build)** – _Linea ist ein Ethereum-äquivalentes zkEVM-Layer-2, das von ConsenSys entwickelt wurde und vollständig auf das Ethereum-Ökosystem ausgerichtet ist._

## Weiterführende Literatur zu ZK-Rollups {#further-reading-on-zk-rollups}

- [Was sind Zero-Knowledge-Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Was sind Zero-Knowledge-Rollups?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Der praktische Leitfaden zu Ethereum-Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs vs. SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Was ist eine zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM-Typen: Ethereum-äquivalent, EVM-äquivalent, Typ 1, Typ 4 und andere kryptische Schlagwörter](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Einführung in zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Was sind ZK-EVM-L2s?](https://web.archive.org/web/20250519165831/https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Awesome-zkEVM-Ressourcen](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKs unter der Haube](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Wie sind SNARKs möglich?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutorials: Privatsphäre & Zero-Knowledge auf Ethereum {#tutorials}

- [Verwendung von Zero-Knowledge für einen geheimen Zustand](/developers/tutorials/secret-state/) _– Wie man ZK-Beweise und offchain-Serverkomponenten verwendet, um einen geheimen Spielzustand Onchain aufrechtzuerhalten._
- [Verwendung von Stealth-Adressen](/developers/tutorials/stealth-addr/) _– Wie ERC-5564-Stealth-Adressen anonyme ETH-Transfers mithilfe kryptographischer Schlüsselableitung ermöglichen._
- [Verwendung von Ethereum für die Web2-Authentifizierung](/developers/tutorials/ethereum-for-web2-auth/) _– Wie man Ethereum-Wallet-Signaturen in SAML-basierte Web2-Authentifizierungssysteme integriert._
