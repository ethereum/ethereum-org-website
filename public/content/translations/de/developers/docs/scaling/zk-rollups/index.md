---
title: Zero-Knowledge Gruppierungen (Rollups)
description: Eine Einführung in Zero-Knowledge-Rollups – eine Skalierungslösung, die von der Ethereum-Community verwendet wird.
lang: de
---

Zero-Knowledge-Rollups (ZK-Rollups) sind Layer-2-[Skalierungslösungen](/developers/docs/scaling/), die den Durchsatz auf dem Ethereum Mainnet erhöhen, indem sie Berechnungen und die Zustandsspeicherung offchain verlagern. ZK-Rollups können Tausende von Transaktionen in einem Stapel verarbeiten und dann nur minimale Zusammenfassungsdaten an das Mainnet senden. Diese zusammenfassenden Daten definieren die Änderungen, die am Status von Ethereum vorgenommen werden sollten, sowie einige kryptografische Nachweise dafür, dass diese Änderungen korrekt sind.

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seite über die [Ethereum-Skalierung](/developers/docs/scaling/) und [Layer 2](/layer-2) gelesen und verstanden haben.

## Was sind Zero-Knowledge-Rollups? {#what-are-zk-rollups}

**Zero-Knowledge-Rollups (ZK-Rollups)** bündeln (oder ‚rollen auf‘) Transaktionen zu Stapeln, die offchain ausgeführt werden. Indem Berechnungen Off-Chain stattfinden, muss eine geringere Datenmenge auf der Blockchain veröffentlicht werden. ZK-Rollout-Betreiber übermitteln eine Zusammenfassung der erforderlichen Änderungen, um alle Transaktionen in einem Stapel darzustellen, anstatt jede Transaktion einzeln zu senden. Sie erzeugen auch [Gültigkeitsnachweise](/glossary/#validity-proof), um die Korrektheit ihrer Änderungen zu beweisen.

Der Zustand eines ZK-Rollups wird durch einen Smart Contract verwaltet, der auf dem Ethereum-Netzwerk bereitgestellt wird. ZK-Rollup-Nodes müssen einen Gültigkeitsnachweis zur Überprüfung vorlegen, um diesen Zustand zu aktualisieren. Der Gültigkeitsnachweis dient, wie bereits erklärt, als kryptografischer Beleg dafür, dass die vom Rollup vorgeschlagene Zustandsänderung aus der Ausführung des jeweiligen Transaktions-Batches resultiert. Das bedeutet, dass ZK-Rollups nur Gültigkeitsnachweise erbringen müssen, um Transaktionen auf Ethereum abzuschließen, anstatt alle Transaktionsdaten onchain zu posten wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/).

Der Transfer von Geldern von einem ZK-Rollup zu Ethereum erfolgt ohne Verzögerung, weil der ZK-Rollup-Contract die Exit-Transaktionen sofort nach der Verifizierung des Gültigkeitsnachweises ausführt. Umgekehrt unterliegt die Auszahlung von Geldern aus Optimistic Rollups einer Verzögerung, damit jeder die Austrittstransaktion mit einem [Betrugsbeweis](/glossary/#fraud-proof) anfechten kann.

ZK-Rollups schreiben Transaktionen als `calldata` auf Ethereum. `calldata` ist der Speicherort für Daten, die in externen Aufrufen an Smart-Contract-Funktionen enthalten sind. Informationen in `calldata` werden auf der Blockchain veröffentlicht, sodass jeder den Zustand des Rollups unabhängig rekonstruieren kann. ZK-Rollups verwenden Komprimierungsverfahren, um die Datenmenge von Transaktionen zu verringern. Beispielsweise werden Accounts nicht durch eine Adresse, sondern durch einen Index repräsentiert, wodurch 28 Bytes an Daten gespart werden. Für Rollups ist die On-Chain-Datenveröffentlichung ein wesentlicher Kostenfaktor; durch Datenkompression lassen sich daher die Gebühren für Nutzer reduzieren.

## Wie funktioniert das Zusammenspiel von ZK-Rollups und Ethereum? ZK-Rollups und Ethereum {#zk-rollups-and-ethereum}

Eine ZK-Rollup-Chain ist ein Off-Chain-Protokoll, das auf der Ethereum-Blockchain aufbaut und dessen Verwaltung durch On-Chain-Smart-Contracts auf Ethereum erfolgt. ZK-Rollups führen Transaktionen zwar außerhalb des Mainnets aus, schreiben jedoch periodisch Off-Chain-Transaktions-Batches in einen On-Chain-Rollup-Contract. Genau wie die Ethereum-Blockchain ist dieser Transaktionsdatensatz unveränderlich und bildet somit die ZK-Rollup-Chain.

Die folgenden Komponenten bilden die Kernarchitektur eines ZK-Rollups:

1. **On-Chain-Verträge**: Wie bereits erwähnt, wird das ZK-Rollup-Protokoll durch Smart Contracts kontrolliert, die auf Ethereum ausgeführt werden. Dies umfasst den Hauptvertrag, welches Rollup-Blöcke speichert, Einlagen nachverfolgt und Zustandsaktualisierungen überwacht. Éin weiterer On-Chain-Contract, der Verifier-Contract, ist für die Verifizierung der von Block Herstellern eingereichten Zero-Knowledge-Proofs zuständig. Daher fungiert Ethereum als Base Layer oder "Layer 1" für den ZK-Rollup.

2. **Offchain Virtual Machine (VM)**: Während das ZK-Rollup-Protokoll auf Ethereum läuft, finden die Transaktionsausführung und die Zustandsspeicherung auf einer separaten virtuellen Maschine statt, die unabhängig von der [EVM](/developers/docs/evm/) ist. Diese Off-Chain-VM bildet die Ausführungsumgebung für Transaktionen auf dem ZK-Rollup und fungiert gleichzeitig als sekundäre Schicht bzw. "Layer 2" des ZK-Rollup-Protokolls. Auf dem Ethereum Mainnet verifizierte Gültigkeitsnachweise garantieren die Korrektheit der Zustandsübergänge in der Off-Chain-VM.

ZK-Rollups sind "hybride Skalierungslösungen" - Protokolle, die zwar unabhängig und Off-Chain arbeiten, ihre Sicherheit aber von Ethereum beziehen. Konkret stellt das Ethereum-Netzwerk die Gültigkeit der State-Updates des ZK-Rollups sicher und gewährleistet die Datenverfügbarkeit für jede Aktualisierung des Rollup-States. Daher sind ZK-Rollups erheblich sicherer als reine Offchain-Skalierungslösungen wie [Sidechains](/developers/docs/scaling/sidechains/), die für ihre eigenen Sicherheitseigenschaften verantwortlich sind, oder [Validiums](/developers/docs/scaling/validium/), die Transaktionen auf Ethereum ebenfalls mit Gültigkeitsnachweisen verifizieren, aber die Transaktionsdaten an anderer Stelle speichern.

ZK-Rollups stützen sich für die folgenden Punkte auf das Ethereum-Hauptprotokoll:

### Datenverfügbarkeit {#data-availability}

ZK-Rollups veröffentlichen Statusdaten für jede außerhalb der Kette verarbeitete Transaktion an Ethereum. Mit diesen Daten ist es Einzelpersonen oder Unternehmen möglich, den Status des Rollups zu reproduzieren und die Kette selbst zu validieren. Ethereum stellt diese Daten allen Netzwerkteilnehmern als `calldata` zur Verfügung.

ZK-Rollups müssen nicht viele Transaktionsdaten in der Kette veröffentlichen, da Gültigkeitsnachweise bereits die Authentizität von Zustandsübergängen überprüfen. Dennoch ist die Speicherung von Daten in der Kette weiterhin wichtig, da sie eine erlaubnislos unabhängige Überprüfung des Zustands der L2-Kette ermöglicht, die es wiederum jedem ermöglicht, Stapel von Transaktionen einzureichen und so böswillige Betreiber daran zu hindern, die Kette zu zensieren oder einzufrieren.

Damit Benutzer mit dem Rollup interagieren können, ist onchain erforderlich. Ohne Zugriff auf staatliche Daten können Benutzer weder ihren Kontostand abfragen noch Transaktionen (z. B. Abhebungen) einleiten, die auf staatlichen Informationen beruhen.

### Transaktionsfinalität {#transaction-finality}

Ethereum fungiert als Abwicklungsebene für ZK-Rollups: L2-Transaktionen werden nur abgeschlossen, wenn der L1-Vertrag den Gültigkeitsnachweis akzeptiert. Dadurch wird das Risiko eliminiert, dass böswillige Betreiber die Kette manipulieren (z. B. Rollup Gelder stehlen), da jede Transaktion im Mainnet genehmigt werden muss. Darüber hinaus garantiert Ethereum, dass Benutzervorgänge nach Abschluss auf L1 nicht mehr rückgängig gemacht werden können.

### Zensurresistenz {#censorship-resistance}

Die meisten ZK-Rollups verwenden einen „Superknoten“ (den Operator), um Transaktionen auszuführen, Stapel zu erstellen und Blöcke an L1 zu senden. Dies gewährleistet zwar die Effizienz, erhöht jedoch das Risiko der Zensur: Böswillige ZK-Rollup Betreiber können Benutzer zensieren, indem sie sich weigern, ihre Transaktionen in Stapel aufzunehmen.

Als Sicherheitsmaßnahme ermöglichen ZK-Rollups den Benutzern, Transaktionen direkt an den Rollup Vertrag im Mainnet zu senden, wenn sie der Meinung sind, dass sie vom Betreiber zensiert werden. Dadurch können Benutzer einen Ausstieg aus dem ZK-Rollup zu Ethereum erzwingen, ohne auf die Erlaubnis des Betreibers angewiesen zu sein.

## Wie funktionieren ZK-Rollups? {#how-do-zk-rollups-work}

### Transaktionen {#transactions}

Benutzer im ZK-Rollup signieren Transaktionen und übermitteln sie an L2-Operatoren zur Verarbeitung und Aufnahme in den nächsten Stapel. In einigen Fällen ist der Operator eine zentralisierte Einheit, ein sogenannter Sequenzer, der Transaktionen ausführt, sie in Stapeln zusammenfasst und an L1 übermittelt. Der Sequenzer in diesem System ist die einzige Entität, die L2-Blöcke erstellen und Rollup Transaktionen zum ZK-Rollup-Vertrag hinzufügen darf.

Andere ZK-Rollups können die Betreiberrolle durch die Verwendung eines [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)-Validatoren-Sets rotieren lassen. Potenzielle Betreiber zahlen Geld in den Rollup Vertrag ein, wobei die Höhe jedes Einsatzes die Chancen des Spielers beeinflusst, für die Produktion des nächsten Rollup Batches ausgewählt zu werden. Der Einsatz des Betreibers kann bei böswilligem Handeln drastisch reduziert werden, was ihn dazu anregt, gültige Blöcke zu veröffentlichen.

#### Wie ZK-Rollups Transaktionsdaten auf Ethereum veröffentlichen {#how-zk-rollups-publish-transaction-data-on-ethereum}

Wie bereits erklärt, werden Transaktionsdaten als `calldata` auf Ethereum veröffentlicht. `calldata` ist ein Datenbereich in einem Smart Contract, der dazu dient, Argumente an eine Funktion zu übergeben, und verhält sich ähnlich wie der [Speicher](/developers/docs/smart-contracts/anatomy/#memory). `calldata` wird zwar nicht als Teil des Zustands von Ethereum gespeichert, bleibt aber als Teil der [Verlaufsprotokolle](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) der Ethereum-Kette onchain bestehen. `calldata` beeinflusst den Zustand von Ethereum nicht, was es zu einer günstigen Möglichkeit macht, Daten onchain zu speichern.

Das Schlüsselwort `calldata` identifiziert oft die Smart-Contract-Methode, die von einer Transaktion aufgerufen wird, und enthält Eingaben für die Methode in Form einer beliebigen Byte-Sequenz. ZK-Rollups verwenden `calldata`, um komprimierte Transaktionsdaten onchain zu veröffentlichen. Der Rollup-Betreiber fügt einfach einen neuen Batch hinzu, indem er die erforderliche Funktion im Rollup-Vertrag aufruft und die komprimierten Daten als Funktionsargumente übergibt. Dies trägt zur Kostensenkung für Benutzer bei, da ein großer Teil der Rollup Gebühren für die Speicherung von Transaktionsdaten in der Kette verwendet wird.

### Zustands-Commitments {#state-commitments}

Der Zustand des ZK-Rollups, der L2-Konten und -Guthaben umfasst, wird als [Merkle-Baum](/whitepaper/#merkle-trees) dargestellt. Ein kryptografischer Hash der Wurzel des Merkle Baums (Merkle Wurzel) wird im Onchain Vertrag gespeichert, sodass das Rollup Protokoll Änderungen im Status des ZK-Rollups verfolgen kann.

Das Rollup wechselt nach der Ausführung eines neuen Satzes von Transaktionen in einen neuen Status. Der Betreiber, der den Zustandsübergang initiiert hat, muss eine neue Zustandswurzel berechnen und dem Onchain Vertrag unterwerfen. Wenn der mit dem Stapel verbundene Gültigkeitsnachweis durch den Prüfvertrag authentifiziert wird, wird die neue Merkle Wurzel zur kanonischen Statuswurzel des ZK-Rollups.

Neben der Berechnung von Zustandswurzeln erstellt der ZK-Rollup Operator auch eine Batch-Wurzel – die Wurzel eines Merkle Baums, der alle Transaktionen in einem Batch umfasst. Wenn ein neuer Stapel übermittelt wird, speichert der Rollup Vertrag die Stapelwurzel, sodass Benutzer nachweisen können, dass eine Transaktion (z. B. eine Auszahlungsanforderung) im Stapel enthalten war. Benutzer müssen Transaktionsdetails, die Batch-Root und einen [Merkle-Beweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) vorlegen, der den Inklusionspfad zeigt.

### Gültigkeitsnachweise {#validity-proofs}

Die neue Statuswurzel, die der ZK-Rollup Operator an den L1-Vertrag übermittelt, ist das Ergebnis von Aktualisierungen des Rollup Status. Angenommen, Alice sendet 10 Token an Bob. Der Operator verringert einfach Alices Guthaben um 10 und erhöht Bobs Guthaben um 10. Angenommen, Alice sendet 10 Token an Bob. Der Operator verringert einfach Alices Guthaben um 10 und erhöht Bobs Guthaben um 10

Der Rollup Vertrag akzeptiert die vorgeschlagene Statusverpflichtung jedoch nicht automatisch, bis der Betreiber nachweist, dass die neue Merkle Wurzel aus korrekten Aktualisierungen des Rollup Status resultiert. Der ZK-Rollup Operator tut dies, indem er einen Gültigkeitsnachweis erstellt, eine prägnante kryptografische Verpflichtung, die die Richtigkeit der gebündelten Transaktionen bestätigt.

Gültigkeitsbeweise ermöglichen es Parteien, die Richtigkeit einer Aussage zu beweisen, ohne die Aussage selbst offenzulegen – daher werden sie auch als Zero-Knowledge-Beweise bezeichnet. ZK-Rollups verwenden Gültigkeitsnachweise, um die Richtigkeit von Offchain Statusübergängen zu bestätigen, ohne Transaktionen auf Ethereum erneut ausführen zu müssen. Diese Beweise können in Form eines [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) oder [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge) vorliegen.

Sowohl SNARKs als auch STARKs helfen dabei, die Integrität der Offchain Berechnung in ZK-Rollups zu bestätigen, obwohl jeder Beweistyp unterschiedliche Merkmale aufweist.

**ZK-SNARKs**

Damit das ZK-SNARK-Protokoll funktioniert, ist die Erstellung eines Common Reference String (CRS) erforderlich: Der CRS stellt öffentliche Parameter zum Nachweis und zur Überprüfung von Gültigkeitsnachweisen bereit. Die Sicherheit des Nachweissystems hängt von der CRS-Einrichtung ab. Wenn Informationen, die zum Erstellen öffentlicher Parameter verwendet werden, in den Besitz böswilliger Akteure gelangen, können diese möglicherweise falsche Gültigkeitsnachweise erstellen.

Manche ZK-Rollups versuchen, dieses Problem durch den Einsatz einer [Multi-Party Computation Ceremony (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) zu lösen, bei der vertrauenswürdige Personen öffentliche Parameter für den ZK-SNARK-Circuit erzeugen. Um den CRS zu konstruieren, steuert jede Partei einen zufälligen Wert (bekannt als "Toxic Waste") bei, den sie umgehend vernichten muss.

Trusted Setups kommen zum Einsatz, da sie die Sicherheit des CRS-Setups erhöhen. Wenn auch nur ein einziger ehrlicher Teilnehmer seinen Input zerstört, ist die Sicherheit des ZK-SNARK-Systems gewährleistet. Trotzdem muss man bedenken, dass bei diesen Ansatz vertrauen vorausgesetzt wird, dass die Beteiligten ihre erzeugten Zufallsdaten löschen und die Sicherheitsgarantien des Systems nicht kompromittieren.

Abgesehen von Vertrauensannahmen sind ZK-SNARKs aufgrund ihrer kleinen Beweisgrößen und der zeitkontinuierlichen Überprüfung beliebt. Da die Beweisüberprüfung auf L1 die größeren Kosten für den Betrieb eines ZK-Rollups darstellt, verwenden L2s ZK-SNARKs, um Beweise zu generieren, die schnell und kostengünstig auf Mainnet überprüft werden können.

**ZK-STARKs**

Wie ZK-SNARKs beweisen ZK-STARKs die Gültigkeit von Offchain Berechnungen, ohne die Eingaben preiszugeben. ZK-STARKs gelten jedoch aufgrund ihrer Skalierbarkeit und Transparenz als Verbesserung gegenüber ZK-SNARKs.

ZK-STARKs sind „transparent“, da sie ohne die vertrauenswürdige Einrichtung eines Common Reference String (CRS) funktionieren können. Stattdessen verlassen sich ZK-STARKs auf öffentlich überprüfbare Zufälligkeit, um Parameter für die Generierung und Überprüfung von Beweisen festzulegen.

ZK-STARKs bieten auch mehr Skalierbarkeit, da die Zeit, die für den Nachweis und die Überprüfung von Gültigkeitsnachweisen benötigt wird, _quasilinear_ im Verhältnis zur Komplexität der zugrunde liegenden Berechnung ansteigt. Bei ZK-SNARKs skalieren die Beweis- und Verifizierungszeiten _linear_ im Verhältnis zur Größe der zugrunde liegenden Berechnung. Dies bedeutet, dass ZK-STARKs weniger Zeit als ZK-SNARKs zum Nachweis und zur Überprüfung großer Datensätze benötigen, was sie für Anwendungen mit hohem Volumen nützlich macht.

ZK-STARKs sind auch gegen Quantencomputer sicher, während die in ZK-SNARKs verwendete Elliptical Curve Cryptography (ECC) allgemein als anfällig für Quantencomputerangriffe gilt. Der Nachteil von ZK-STARKs besteht darin, dass sie größere Proof Größen erzeugen, deren Überprüfung auf Ethereum teurer ist.

#### Wie funktionieren Gültigkeitsnachweise in ZK-Rollups? Gültigkeitsnachweise in ZK-Rollups {#validity-proofs-in-zk-rollups}

##### Beweiserstellung

Vor der Annahme von Transaktionen führt der Betreiber die üblichen Prüfungen durch. Dazu gehört die Bestätigung, dass:

- Die Absender- und Empfängerkonten sind Teil des Statusbaums.
- Der Absender verfügt über ausreichende Mittel, um die Transaktion abzuwickeln.
- Die Transaktion ist korrekt und stimmt mit dem öffentlichen Schlüssel des Absenders im Rollup überein.
- Der Nonce des Absenders ist korrekt usw.

Sobald der ZK Rollup Knoten über genügend Transaktionen verfügt, fasst er diese zu einem Stapel zusammen und kompiliert Eingaben für den Prüfkreis, um daraus einen prägnanten ZK Beweis zu kompilieren. Dazu gehört:

- Eine Merkle- Baumwurzel, die alle Transaktionen im Stapel umfasst.
- Merkle Beweise für Transaktionen, um die Aufnahme in den Stapel nachzuweisen.
- Merkle Beweise für jedes Sender-Empfänger-Paar in Transaktionen, um zu beweisen, dass diese Konten Teil des Zustandsbaums des Rollups sind.
- Eine Reihe von Zwischenzustandswurzeln, die durch die Aktualisierung der Zustandswurzel nach der Anwendung von Zustandsaktualisierungen für jede Transaktion (d. h. Verringerung der Anzahl der Absenderkonten und Erhöhung der Anzahl der Empfängerkonten) abgeleitet werden.

Der Prüfschaltkreis berechnet den Gültigkeitsnachweis, indem er jede Transaktion in einer „Schleife“ durchläuft und dieselben Prüfungen durchführt, die der Bediener vor der Verarbeitung der Transaktion durchgeführt hat. Zunächst wird mithilfe des bereitgestellten Merkle Beweises überprüft, ob das Konto des Absenders Teil der vorhandenen Statuswurzel ist. Anschließend reduziert es das Guthaben des Absenders, erhöht dessen Nonce, hash die aktualisierten Kontodaten und kombiniert sie mit dem Merkle Beweis, um eine neue Merkle Wurzel zu generieren.

Seine Merkle Wurzel spiegelt die einzige Änderung im Status des ZK-Rollups wider: eine Änderung des Guthabens und der Nonce des Absenders. Dies ist möglich, weil der Merkle Beweis, der zum Nachweis der Existenz des Kontos verwendet wird, zum Ableiten der neuen Zustandswurzel verwendet wird.

Der Prüfkreis führt denselben Vorgang auf dem Konto des Empfängers durch. Es prüft, ob das Konto des Empfängers unter der Zwischenzustandswurzel existiert (unter Verwendung des Merkle Beweises), erhöht dessen Guthaben, hasht die Kontodaten erneut und kombiniert sie mit dem Merkle Beweis, um eine neue Zustandswurzel zu generieren.Das Abheben von einem ZK-Rollup auf L1 ist unkompliziert.

Der Vorgang wird für jede Transaktion wiederholt. Jede „Schleife“ erstellt eine neue Statuswurzel durch Aktualisierung des Kontos des Absenders und eine nachfolgende neue Wurzel durch Aktualisierung des Kontos des Empfängers. Wie erläutert, stellt jede Aktualisierung der Statuswurzel eine Änderung eines Teils des Statusbaums des Rollups dar.

Der ZK-Beweisschaltkreis durchläuft den gesamten Transaktionsstapel und überprüft die Abfolge der Aktualisierungen, die nach Ausführung der letzten Transaktion zu einer endgültigen Zustandswurzel führen. Die zuletzt berechnete Merkle Wurzel wird zur neuesten kanonischen Zustandswurzel des ZK-Rollups.

##### Nachweisprüfung

Nachdem der Prüfkreis die Richtigkeit der Statusaktualisierungen überprüft hat, übermittelt der L2-Operator den berechneten Gültigkeitsnachweis an den Prüfvertrag auf L1. Der Verifizierungszeite des Vertrags überprüft die Gültigkeit des Beweises und prüft auch öffentliche Eingaben, die Teil des Beweises sind:

- **Pre-State-Root**: Der alte State-Root des ZK-Rollups (d. h. vor der Ausführung der gebatchten Transaktionen), der den letzten bekannten gültigen Zustand der L2-Kette widerspiegelt.

- **Post-State-Root**: Der neue State-Root des ZK-Rollups (d. h. nach der Ausführung der gebatchten Transaktionen), der den neuesten Zustand der L2-Kette widerspiegelt. Die Post State Wurzel ist die endgültige Wurzel, die nach dem Anwenden von Zustandsaktualisierungen im Prüfschaltkreis abgeleitet wird.

- **Batch-Root**: Der Merkle-Root des Batches, der durch das _Merklisieren_ von Transaktionen im Batch und das Hashen des Baum-Roots abgeleitet wird.

- **Transaktionseingaben**: Daten, die mit den Transaktionen verbunden sind, die als Teil des übermittelten Batches ausgeführt werden.

Wenn der Beweis den Schaltkreis erfüllt (d. h. gültig ist), bedeutet dies, dass eine Folge gültiger Transaktionen vorhanden ist, die das Rollup vom vorherigen Zustand (kryptografisch durch die Vorzustandswurzel gekennzeichnet) in einen neuen Zustand (kryptografisch durch die Nachzustandswurzel gekennzeichnet) überführen. Wenn die Wurzel vor dem Status mit der im Rollup Vertrag gespeicherten Wurzel übereinstimmt und der Beweis gültig ist, übernimmt der Rollup Vertrag die Wurzel nach dem Status aus dem Beweis und aktualisiert seinen Statusbaum, um den geänderten Status des Rollups widerzuspiegeln.

### Ein- und Austritte {#entries-and-exits}

Benutzer nehmen am ZK-Rollup teil, indem sie Token im Rollup Vertrag hinterlegen, der auf der L1-Kette bereitgestellt wird. Diese Transaktion wird in die Warteschlange gestellt, da nur Betreiber Transaktionen an den Rollup Vertrag übermitteln können.

Wenn sich die Warteschlange für ausstehende Einzahlungen zu füllen beginnt, nimmt der ZK Rollup Betreiber die Einzahlungstransaktionen entgegen und übermittelt sie an den Rollup- Vertrag. Sobald sich die Gelder des Benutzers im Rollup befinden, kann er mit der Transaktion beginnen, indem er Transaktionen zur Verarbeitung an den Betreiber sendet. Benutzer können Guthaben auf dem Rollup überprüfen, indem sie ihre Kontodaten hashen, den Hash an den Rollup-Vertrag senden und einen Merkle-Nachweis bereitstellen, um ihn mit der aktuellen Statuswurzel zu vergleichen.

Das Abheben von einem ZK-Rollup auf L1 ist unkompliziert. Der Benutzer leitet die Exit Transaktion ein, indem er seine Vermögenswerte auf dem Rollup zum Verbrennen an ein angegebenes Konto sendet. Wenn der Betreiber die Transaktion in den nächsten Stapel aufnimmt, kann der Benutzer eine Auszahlungsanforderung an den Onchain Vertrag senden. Dieser Auszahlungsantrag muss Folgendes enthalten:

- Merkle Beweis, der die Einbeziehung der Transaktion des Benutzers in das Burn Konto in einem Transaktionsstapel belegt

- Transaktionsdaten

- Batch Root

- L1-Adresse zum Empfangen eingezahlter Gelder

Der Rollup Vertrag hasht die Transaktionsdaten, prüft, ob die Batch-Root vorhanden ist, und verwendet den Merkle Beweis, um zu prüfen, ob der Transaktions Hash Teil der Batch Root ist. Anschließend führt der Vertrag die Exit-Transaktion aus und sendet Gelder an die vom Benutzer gewählte Adresse auf L1.

## ZK-Rollups und EVM-Kompatibilität {#zk-rollups-and-evm-compatibility}

Im Gegensatz zu Optimistic Rollups sind ZK-Rollups nicht ohne Weiteres mit der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) kompatibel. Der Nachweis allgemeiner EVM Berechnungen in Schaltkreisen ist schwieriger und ressourcenintensiver als der Nachweis einfacher Berechnungen (wie der zuvor beschriebenen Token Übertragung).

Allerdings wecken [Fortschritte in der Zero-Knowledge-Technologie](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) erneut das Interesse daran, EVM-Berechnungen in Zero-Knowledge-Beweise zu verpacken. Diese Bemühungen zielen darauf ab, eine Zero Knowledge EVM Implementierung (zkEVM) zu erstellen, die die Richtigkeit der Programmausführung effizient überprüfen kann. Ein zkEVM erstellt vorhandene EVM Opcodes zum Nachweis/zur Verifizierung in Schaltkreisen neu und ermöglicht so die Ausführung intelligenter Verträge.

Wie das EVM wechselt ein zkEVM zwischen Zuständen, nachdem Berechnungen an einigen Eingaben durchgeführt wurden. Der Unterschied besteht darin, dass zkEVM auch Zero Knowledge Beweise erstellt, um die Richtigkeit jedes Schritts bei der Programmausführung zu überprüfen. Gültigkeitsnachweise könnten die Richtigkeit von Operationen überprüfen, die den Zustand der VM (Speicher, Stapel, Speicher) und die Berechnung selbst betreffen (d. h. hat die Operation die richtigen Opcodes aufgerufen und sie korrekt ausgeführt?).

Die Einführung EVM kompatibler ZK-Rollups soll Entwicklern helfen, die Skalierbarkeit und Sicherheitsgarantien von Zero Knowledge Proof zu nutzen. Noch wichtiger ist, dass Entwickler durch die Kompatibilität mit der nativen Ethereum Infrastruktur ZK freundliche Dapp mit vertrauten (und praxiserprobten) Tools und Sprachen erstellen können.

## Wie funktionieren ZK-Rollup Gebühren? {#how-do-zk-rollup-fees-work}

Wie viel Benutzer für Transaktionen auf ZK Rollups zahlen, hängt von der Gasgebühr ab, genau wie beim Ethereum Mainnet. Die Gasgebühren funktionieren auf L2 jedoch anders und werden von den folgenden Kosten beeinflusst:

1. **Schreiben in den Zustand**: Für das Schreiben in den Zustand von Ethereum (d. h. das Senden einer Transaktion auf der Ethereum-Blockchain) fallen feste Kosten an. ZK-Rollups reduzieren diese Kosten, indem sie Transaktionen bündeln und die Fixkosten auf mehrere Benutzer verteilen.

2. **Datenveröffentlichung**: ZK-Rollups veröffentlichen Zustandsdaten für jede Transaktion als `calldata` auf Ethereum. Die `calldata`-Kosten werden derzeit durch [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) geregelt, das Kosten von 16 Gas für Nicht-Null-Bytes bzw. 4 Gas für Null-Bytes von `calldata` vorschreibt. Die Kosten für die einzelne Transaktion hängen davon ab, wie viel `calldata` dafür onchain veröffentlicht werden muss.

3. **L2-Betreibergebühren**: Dies ist der Betrag, der an den Rollup-Betreiber als Ausgleich für die Rechenkosten gezahlt wird, die bei der Verarbeitung von Transaktionen anfallen, ähnlich den [Transaktions-"Prioritätsgebühren (Trinkgelder)"](/developers/docs/gas/#how-are-gas-fees-calculated) auf dem Ethereum Mainnet.

4. **Beweiserstellung und -verifizierung**: ZK-Rollup-Betreiber müssen Gültigkeitsnachweise für Transaktions-Batches erstellen, was ressourcenintensiv ist. Die Überprüfung von Zero-Knowledge-Beweisen im Mainnet kostet ebenfalls Gas (~ 500.000 Gas).

Neben der Bündelung von Transaktionen reduzieren ZK Rollups die Gebühren für Benutzer durch die Komprimierung von Transaktionsdaten. Sie können [sich eine Echtzeitübersicht](https://l2fees.info/) darüber ansehen, was die Nutzung von Ethereum-ZK-Rollups kostet.

## Wie skalieren ZK-Rollups Ethereum? Skalierung von Ethereum mit ZK-Rollups {#scaling-ethereum-with-zk-rollups}

### Komprimierung von Transaktionsdaten {#transaction-data-compression}

ZK Rollups erweitern den Durchsatz auf der Basisschicht von Ethereum, indem sie Berechnungen außerhalb der Kette durchführen. Der eigentliche Schub für die Skalierung kommt jedoch durch die Komprimierung der Transaktionsdaten. Die [Blockgröße](/developers/docs/blocks/#block-size) von Ethereum begrenzt die Datenmenge, die jeder Block enthalten kann, und damit auch die Anzahl der pro Block verarbeiteten Transaktionen. Durch die Komprimierung Transaktion bezogener Daten erhöhen ZK Rollups die Anzahl der pro Block verarbeiteten Transaktionen erheblich.

ZK Rollups können Transaktionsdaten besser komprimieren als optimistische Rollups, da sie nicht alle zur Validierung jeder Transaktion erforderlichen Daten veröffentlichen müssen. Sie müssen nur die minimal erforderlichen Daten veröffentlichen, um den aktuellen Stand der Konten und Salden im Rollup wiederherzustellen.

### Rekursive Proofs {#recursive-proofs}

Ein Vorteil von Zero Knowledge-Beweisen besteht darin, dass Beweise andere Beweise verifizieren können. Beispielsweise kann ein einzelner ZK-SNARK andere ZK-SNARKs verifizieren. Solche „Proof of Proof“ werden als rekursive Proof bezeichnet und erhöhen den Durchsatz bei ZK-Rollups dramatisch.

Derzeit werden Gültigkeitsnachweise Block für Block generiert und zur Überprüfung an den L1-Vertrag übermittelt. Die Überprüfung einzelner Blocknachweise begrenzt jedoch den Durchsatz, den ZK-Rollups erreichen können, da nur ein Block abgeschlossen werden kann, wenn der Betreiber einen Nachweis einreicht.

Rekursive Beweise ermöglichen es jedoch, mehrere Blöcke mit einem Gültigkeitsnachweis abzuschließen. Dies liegt daran, dass der Beweisschaltkreis mehrere Blockbeweise rekursiv aggregiert, bis ein endgültiger Beweis erstellt ist. Der L2-Operator übermittelt diesen rekursiven Beweis, und wenn der Vertrag ihn akzeptiert, werden alle relevanten Blöcke sofort abgeschlossen. Mit rekursiven Beweisen erhöht sich die Anzahl der ZK-Rollup Transaktionen, die in Intervallen auf Ethereum abgeschlossen werden können.

### Vor- und Nachteile von ZK-Rollups {#zk-rollups-pros-and-cons}

| Pro                                                                                                                                                                                                                                          | Nachteile                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gültigkeitsnachweise stellen die Richtigkeit von Offchain Transaktionen sicher und verhindern, dass Betreiber ungültige Zustandsübergänge ausführen.                                                                         | Die Kosten für die Berechnung und Überprüfung von Gültigkeitsnachweisen sind erheblich und können die Gebühren für Rollup Benutzer erhöhen.                                                                                                                           |
| Bietet eine schnellere Transaktionsendgültigkeit, da Statusaktualisierungen genehmigt werden, sobald die Gültigkeitsnachweise auf L1 überprüft wurden.                                                                       | Aufgrund der Komplexität der Zero Knowledge-Technologie ist die Erstellung EVM kompatibler ZK-Rollups schwierig.                                                                                                                                                      |
| Baut zur Sicherheit auf vertrauenslose kryptografische Mechanismen, nicht auf die Ehrlichkeit von Akteuren mit Anreizen wie bei [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Für die Erstellung von Gültigkeitsnachweisen ist spezielle Hardware erforderlich, was eine zentrale Kontrolle der Kette durch einige wenige Parteien begünstigen kann.                                                                                                |
| Für die Erstellung von Gültigkeitsnachweisen ist spezielle Hardware erforderlich, was eine zentrale Kontrolle der Kette durch einige wenige Parteien begünstigen kann.                                                       | Zentralisierte Operatoren (Sequenzer) können die Reihenfolge der Transaktionen beeinflussen.                                                                                                                                                       |
| Zentralisierte Operatoren (Sequenzer) können die Reihenfolge der Transaktionen beeinflussen.                                                                                                              | Durch die Hardwareanforderungen kann die Anzahl der Teilnehmer verringert werden, die die Kette zum Fortschreiten zwingen können. Dadurch erhöht sich das Risiko, dass böswillige Betreiber den Status des Rollups einfrieren und Benutzer zensieren. |
| Hängt nicht von Annahmen zur Lebendigkeit ab und Benutzer müssen die Kette nicht validieren, um ihre Gelder zu schützen.                                                                                                     | Einige Prüfsysteme (z. B. ZK-SNARK) erfordern eine vertrauenswürdige Einrichtung, die bei unsachgemäßer Handhabung möglicherweise das Sicherheitsmodell eines ZK-Rollups gefährden könnte.                         |
| Eine bessere Datenkomprimierung kann dazu beitragen, die Kosten für die Veröffentlichung von `calldata` auf Ethereum zu senken und die Rollup-Gebühren für Benutzer zu minimieren.                                           |                                                                                                                                                                                                                                                                                       |

### Eine visuelle Erklärung von ZK-Rollups {#zk-video}

Sehen Sie, wie Finematics ZK-Rollups erklärt:

<YouTube id="7pWxCklcNsU" start="406" />

## Wer arbeitet an einem zkEVM? zkEVM-Projekte {#zkevm-projects}

Zu den Projekten, die an zkEVMs arbeiten, gehören:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM ist ein von der Ethereum Foundation finanziertes Projekt zur Entwicklung eines EVM-kompatiblen ZK-Rollups und eines Mechanismus zur Erzeugung von Gültigkeitsnachweisen für Ethereum-Blöcke._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _ist ein dezentraler ZK-Rollup auf dem Ethereum Mainnet, der auf einer Zero-Knowledge Ethereum Virtual Machine (zkEVM) arbeitet, die Ethereum-Transaktionen auf transparente Weise ausführt, einschließlich Smart Contracts mit Zero-Knowledge-Proof-Validierungen._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll ist ein technologieorientiertes Unternehmen, das an der Entwicklung einer nativen zkEVM Layer-2-Lösung für Ethereum arbeitet._

- **[Taiko](https://taiko.xyz)** - _Taiko ist ein dezentralisierter, Ethereum-äquivalenter ZK-Rollup (ein [Typ 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era ist ein EVM-kompatibler ZK-Rollup, der von Matter Labs entwickelt wurde und von seinem eigenen zkEVM angetrieben wird._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet ist eine EVM-kompatible Layer-2-Skalierungslösung, die von StarkWare entwickelt wurde._

- **[Morph](https://www.morphl2.io/)** - _Morph ist eine hybride Rollup-Skalierungslösung, die ZK-Beweise nutzt, um das Problem der Layer-2-Zustandsherausforderung zu lösen._

- **[Linea](https://linea.build)** - _Linea ist eine Ethereum-äquivalente zkEVM Layer 2, die von Consensys entwickelt wurde und vollständig auf das Ethereum-Ökosystem ausgerichtet ist._

## Weiterführende Lektüre zu ZK-Rollups {#further-reading-on-zk-rollups}

- [Was sind Zero-Knowledge-Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Was sind Zero-Knowledge-Rollups?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Der praktische Leitfaden für Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs vs. SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Was ist ein zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM-Typen: Ethereum-äquivalent, EVM-äquivalent, Typ 1, Typ 4 und andere kryptische Schlagwörter](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Einführung in zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Was sind ZK-EVM L2s?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Tolle zkEVM-Ressourcen](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS unter der Haube](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Wie sind SNARKs möglich?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
