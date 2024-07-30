---
title: Ethereum Glossar
description: Ein unvollständiges Glossar technischer und nicht technischer Begriffe, bezogen auf Ethereum
lang: de
sidebarDepth: 2
---

# Glossar {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### 51 %-Angriff {#51-attack}

Eine Art von Angriff auf ein dezentralisiertes [Netzwerk](#network), mit welchem eine Gruppe die Kontrolle über die Mehrheit der [Nodes](#node) erlangt. Dies würde den Angreifern durch die Rücknahme von [Transaktionen](#transaction) und Doppelausgabe von [Ether](#ether) und anderen Token Blockchainbetrug ermöglichen.

## A {#section-a}

### Konto {#account}

Ein Objekt mit einer [Adresse](#address), einem Saldo, einer [Nonce](#nonce), optionalem Speicher und Code. Ein Konto kann ein [Vertragskonto](#contract-account) oder ein [externes Konto (Externally owned Account, EOA)](#eoa) sein.

<DocLink href="/developers/docs/accounts">
  Ethereum-Konten
</DocLink>

### Adresse {#address}

Im Allgemeinen symbolisiert diese einen [EOA](#eoa) oder [Vertrag](#contract-account), dcher [Transaktionen](#transaction) auf der Blockchain empfangen (Zieladresse) oder senden (Quelladresse) kann. Genauer gesagt sind es die ganz rechten 160 Bit eines [Keccak-Hashs](#keccak-256) eines [öffentlichen ECDSA](#ecdsa) [-Schlüssels](#public-key).

### Binäre Anwendungsschnittstelle (ABI) {#abi}

Der standardmäßige Interaktionsweg zwischen [Verträgen](#contract-account) im Ethereum-Ökosystem, sowohl von solchen außerhalb der Blockchain als auch von Vertrag zu Vertrag.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### Programmierschnittstelle {#api}

Eine Programmierschnittstelle (API) ist eine Reihe von Definitionen, wie eine Software zu verwenden ist. Eine API ist zwischen einer Anwendung und einem Webserver angesiedelt und erleichtert die Datenübertragung zwischen diesen.

### ASIC {#asic}

Anwendungsspezifische integrierte Schaltung. Dies bezieht sich in der Regel auf einen integrierten Schaltkreis, der speziell für das Minen von Kryptowährungen entwickelt wurde.

### assert {#assert}

In [Solidity](#solidity), `assert(false)` kompiliert zu `0xfe`, ein ungültiger Opcode, der alles verbleibende [Gas](#gas) verbraucht und alle Änderungen rückgängig macht. Wenn eine `assert()` Anweisung fehlschlägt, geht etwas völlig Unerwartetes schief, und Sie müssen Ihren Code reparieren. Sie sollten `assert()` verwenden, um Bedingungen zu vermeiden, die niemals auftreten dürfen.

<DocLink href="/developers/docs/smart-contracts/security/">
  Smart Contract – Sicherheit
</DocLink>

### Attestierung {#attestation}

Eine Behauptung, die von einer Einheit aufgestellt wird, dass etwas wahr ist. Im Zusammenhang mit Ethereum müssen die Konsens-Validatoren eine Behauptung darüber aufstellen, wie sie den Zustand der Chain einschätzen. Zu bestimmten Zeiten ist jeder Validator dafür verantwortlich, verschiedene Bestätigungen zu veröffentlichen, die formell die Sicht dieses Validators bezüglich der Chain erklären, einschließlich des letzten abgeschlossenen Kontrollpunkts und der aktuellen Spitze der Blockchain.

<DocLink href="/developers/docs/consensus-mechanisms/pos/attestations/">
  Beglaubigungen
</DocLink>

<Divider />

## B {#section-b}

### Grundgebühr {#base-fee}

Jeder [Block](#block) hat einen Mindestpreis, der als „Grundgebühr" bezeichnet wird. Dies ist die minimale [Gas](#gas)-Gebühr, die ein Nutzer zahlen muss, um eine Transaktion in den nächsten Block aufzunehmen.

<DocLink href="/developers/docs/gas/">
  Gas und Gebühren
</DocLink>

### Beacon Chain {#beacon-chain}

Die Beacon Chain ist die Blockchain, die [Proof-of-Stake](#pos) und [Validatoren](#validator) in Ethereum eingeführt hat. Sie lief neben dem Proof-of-Work Ethereum Mainnet von Dezember 2020 bis zur Zusammenführung der beiden Chains im September 2022, durch die das heutige Ethereum entstand.

<DocLink href="/roadmap/beacon-chain/">
  Beacon Chain
</DocLink>

### Big-Endian {#big-endian}

Eine Positionsnummernrepräsentation, bei der die bedeutendste Ziffer zuerst im Speicher liegt. Das Gegenteil von Little-Endian, wo die am wenigsten signifikante Ziffer zuerst kommt.

### Block {#block}

Ein Block ist eine gebündelte Einheit von Daten, die eine geordnete Liste von Transaktionen und konsensbezogenen Informationen enthält. Blöcke werden von Proof-of-Stake-Validatoren vorgeschlagen und dann im gesamten Peer-to-Peer-Netz verbreitet, wo sie von allen anderen Nodes leicht unabhängig verifiziert werden können. Die Konsensregeln bestimmen, welche Inhalte eines Blocks als gültig angesehen werden, und ungültige Blöcke werden vom Netzwerk ignoriert. Die Reihenfolge dieser Blöcke und die darin enthaltenen Transaktionen bilden eine deterministische Kette von Ereignissen, deren Ende den aktuellen Zustand des Netzwerks darstellt.

<DocLink href="/developers/docs/blocks/">
  Blöcke
</DocLink>

### Block-Explorer {#block-explorer}

Eine Schnittstelle, die es einem Benutzer erlaubt, Informationen von einer und über eine Blockchain zu suchen. Dazu gehören das Abrufen einzelner Transaktionen, Aktivitäten, die mit bestimmten Adressen verbunden sind, und Informationen über das Netzwerk.

### Block-Header {#block-header}

Der Block-Header ist eine Sammlung von Metadaten über einen Block und eine Zusammenfassung der Transaktionen, die im Ausführungs-Payload enthalten sind.

### Block-Verkündung {#block-propagation}

Der Prozess der Übertragung eines bestätigten Blocks an alle anderen Nodes im Netzwerk.

### Block-Antragsteller {#block-proposer}

Der spezifische Validator, der ausgewählt wurde, um einen Block in einem bestimmten [Slot](#slot) zu erstellen.

### Blockbelohnung {#block-reward}

Der Betrag an Ether, der an den Antragsteller eines neuen gültigen Blocks ausgezahlt wird.

### Block-Status {#block-status}

Die Zustände, in denen ein Block existieren kann. Zu den möglichen Zuständen gehören:

- vorgeschlagen: der Block wurde von einem Validator vorgeschlagen
- geplant: Validatoren senden derzeit Daten
- verpasst/übersprungen: Der Antragsteller schlug keinen Block innerhalb des zulässigen Zeitrahmens vor.
- verwaist: der Block wurde durch den [Fork-Choice-Algorithmus](#fork-choice-algorithm) neu strukturiert

### Blockzeit {#block-time}

Das Zeitintervall zwischen Blöcken, die zur Blockchain hinzugefügt werden.

### Block-Validierung {#block-validation}

Der Prozess der Überprüfung, ob ein neuer Block gültige Transaktionen und Signaturen enthält, baut auf der historisch längsten Chain auf und folgt allen anderen Konsensregeln. Gültige Blöcke werden am Ende der Chain hinzugefügt und an andere im Netzwerk weitergegeben. Ungültige Blöcke werden verworfen.

### Blockchain {#blockchain}

Eine Sequenz von [Blöcken](#block), von denen jeder auf seinen Vorgänger verweist, bis hin zum [Genesisblock](#genesis-block), indem er auf den Hash des vorherigen Blocks verweist. Die Integrität der Blockchain ist kryptoökonomisch durch einen auf Proof-of-Stake beruhenden Konsensmechanismus gesichert.

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Was ist eine Blockchain?
</DocLink>

### Bootnode {#bootnode}

Die Nodes, die verwendet werden können, um den Entdeckungsprozess zu initiieren, wenn eine Node betrieben wird. Die Endpunkte dieser Nodes werden im Quellcode von Ethereum aufgezeichnet.

### Bytecode {#bytecode}

Ein abstrakter Befehlssatz zur effizienten Ausführung durch einen Software-Interpreter oder eine virtuelle Maschine. Im Gegensatz zu menschenlesbarem Quellcode wird Bytecode in numerischem Format ausgedrückt.

### Byzantium Fork {#byzantium-fork}

Die erste von zwei [Hardforks](#hard-fork) für die [Metropolis](#metropolis)-Entwicklungsphase. Dies umfasste EIP-649 Metropolis [Schwierigkeitsbombe](#difficulty-bomb) – Verzögerung und Blockierung der Belohnung, wobei die [ICE Age](#ICE-age) um 1 Jahr verzögert und die Blockbelohnung von 5 auf 3 Ether reduziert wurde.

<Divider />

## C {#section-c}

### Caspar-FFG {#casper-ffg}

Caspar-FFG ist ein Proof-of-Stake Konsensprotokoll, das in Verbindung mit dem [LMD-GHOST](#lmd-ghost) Fork-Choice-Algorithmus verwendet wird, um es [Konsenskunden](#consensus-client) zu ermöglichen, sich auf den Kopf der Beacon Chain zu einigen.

### Kontrollpunkt {#checkpoint}

Die [Beacon Chain](#beacon-chain) hat ein in Slots (12 Sekunden) und Epochen (32 Slots) unterteiltes Tempo. Der erste Slot in jeder Epoche ist ein Kontrollpunkt. Wenn eine [qualifizierte Mehrheit](#supermajority) von Validatoren die Verbindung zwischen zwei Kontrollpunkten bestätigt, können sie [gerechtfertigt](#justification) werden, und sobald ein anderer Kontrollpunkt gerechtfertigt ist, können sie [abgeschlossen](#finality) werden.

### Compiling (Kompilieren) {#compiling}

Konvertieren von Code in einer Programmiersprache auf hoher Ebene (z. B. [Solidity](#solidity)) in eine Sprache auf niedrigerer Ebene (z. B. EVM-[Bytecode](#bytecode)).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Compiling Smart Contracts (Kompilieren von intelligenten Verträgen)
</DocLink>

### Komitee {#committee}

Eine Gruppe von mindestens 128 [Validatoren](#validator), deren Aufgabe es ist, die Blöcke in jedem Slot zu validieren. Einer der Validatoren im Ausschuss ist der Aggregator, verantwortlich für die Zusammenfassung der Unterschriften aller anderen Validatoren im Komitee, die sich auf eine Attestierung einigen. Nicht zu verwechseln mit dem [Synchronisierungskomitee](#sync-committee).

### Rechnerische Undurchführbarkeit {#computational-infeasibility}

Ein Prozess ist rechnerisch nicht durchführbar, wenn es undurchführbar lange Zeit (z. B. Milliarden von Jahren) dauern würde, ihn für jeden durchzuführen, der möglicherweise ein Interesse an der Durchführung hat.

### Konsens {#consensus}

Wenn eine qualifizierte Mehrheit an Nodes auf dem Netzwerk alle dieselben Blöcke auf ihren lokalen validierten Blockchains haben. Nicht zu verwechseln mit [Konsensregeln](#consensus-rules).

### Konsenskunde {#consensus-client}

Konsenskunden (wie Prysm, Teku, Nimbus, Lighthouse, Lodestar) führen Ethereums [Proof-of-Stake](#pos)-Konsensalgorithmus aus, der es dem Netzwerk ermöglicht, sich bezüglich des Kopfs der Beacon Chain zu einigen. Konsenskunden beteiligen sich nicht an der Validierung/Übertragung von Transaktionen oder der Ausführung von Zustandsübergängen. Dies geschieht durch [Ausführungskunden](#execution-client).

### Konsensebene {#consensus-layer}

Die Konsensebene von Ethereum ist das Netzwerk der [Konsenskunden](#consensus-client).

### Konsensregeln {#consensus-rules}

Die Block-Validierungsregeln, denen Full-Nodes folgen, um im Konsens mit anderen Nodes zu bleiben. Nicht zu verwechseln mit [Konsens](#consensus).

### Zur Aufnahme in Betracht gezogen (CFI) {#cfi}

Eine Kern-[EIP](#eip), die im Mainnet noch nicht aktiv ist, und Client-Entwickler stehen der Idee generell positiv gegenüber. Unter der Voraussetzung, dass sie alle Anforderungen für die Aufnahme in das Mainnet erfüllt, könnte sie möglicherweise in ein Netzwerk-Upgrade aufgenommen werden (nicht zwingend in das nächste).

### Constantinople-Fork {#constantinople-fork}

Der zweite Teil der [Metropolis](#metropolis)-Ausbaustufe, ursprünglich geplant für Mitte 2018. Erwartet wird neben anderen Änderungen ein Wechsel auf einen Hybrid-[Proof-of-Work](#pow)/[-Proof-of-Stake](#pos)-Konsensalgorithmus.

### Vertragskonto {#contract-account}

Ein Konto, das einen Code enthält, der ausgeführt wird, wenn es eine [Transaktion](#transaction) von einem anderen [Konto](#account) ([EOA](#eoa) oder [Vertrag](#contract-account)) erhält.

### Vertragserstellungstransaktion {#contract-creation-transaction}

Eine spezielle [Transaktion](#transaction), die den Initiierungscode eines Vertrags enthält. Der Empfänger wird auf `null` gesetzt und der Vertrag wird an eine Adresse bereitgestellt, die aus der Benutzeradresse und dem `nonce` generiert wird. mit der ein [Vertrag](#contract-account) registriert und in der Ethereum-Blockchain aufgezeichnet wird.

### Kryptoökonomie {#cryptoeconomics}

Die Ökonomie der Kryptowährungen.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (D mit Strich) wird im alten Englisch, Mittel-Englisch, Isländisch and Färörisch verwendet, und steht für „Eth“ in Großbuchstaben. Es wird in Wörtern wie ĐEV oder Đapp (dezentrale Anwendung) benutzt, wo das Đ der nordische Buchstabe „eth“ ist. Das eth (Ð) in Großbuchstaben wird auch verwendet, um die Kryptowährung Dogecoin zu symbolisieren. Dies erscheint häufig in älterer Ethereum-Literatur, wird aber heute weniger häufig verwendet.

### DAG {#dag}

DAG steht für Directed Acyclic Graph. Es handelt sich um eine Datenstruktur, die aus Nodes und Verbindungen zwischen ihnen besteht. Vor der Zusammenführung verwendete Ethereum einen DAG in seinem [Proof-of-Work](#pow)-Algorithmus, [Ethash](#ethash), der jedoch in [Proof-of-Stake](#pos) nicht mehr verwendet wird.

### DApp {#dapp}

Dezentrale Applikation. Es handelt sich zumindest um einen [Smart Contract (Intelligenten Vertrag)](#smart-contract) und um eine Web-Benutzeroberfläche. Allgemeiner ausgedrückt: Eine dApp ist eine Webanwendung, die auf offenen, dezentralen Peer-to-Peer-Infrastrukturdiensten aufbaut. Darüber hinaus beinhalten viele dApps dezentralen Speicher und/oder ein(e) Nachrichten-Protokoll und -Plattform.

<DocLink href="/developers/docs/dapps/">
  Einführung in dApps
</DocLink>

### Datenverfügbarkeit {#data-availability}

Die Eigenschaft eines Zustands, dass jeder Node, der mit dem Netzwerk verbunden ist, einen bestimmten Teil des Zustands herunterladen könnte, den er möchte.

### Dezentralisierung {#decentralization}

Das Konzept von der Verschiebung von Steuerung und Ausführung von Prozessen weg von einer zentralen Entität.

### Dezentrale Autonome Organisationen (DAO) {#dao}

Ein Unternehmen oder eine andere Organisation, die ohne hierarchisches Management arbeitet. DAO kann sich auch auf einen am 30. April 2016 gestarteten Smart Contract mit dem Titel „The DAO" beziehen, der dann im Juni 2016 gehackt wurde. Dies motivierte letztendlich eine [Hard Fork](#hard-fork) (Codename DAO) auf Block 1.192.000, die den gehackten DAO-Vertrag rückgängig machte und Ethereum und Ethereum Classic in zwei konkurrierende Systeme aufspaltete.

<DocLink href="/dao/">
  Dezentralisierte Autonome Organisationen (DAO)
</DocLink>

### Dezentrale Börsen (DEX) {#dex}

Eine Art [dApp](#dapp), mit der Sie Token mit anderen im Netzwerk austauschen können. Sie benötigen [Ether](#ether), um eine (zur Zahlung von [Transaktionsgebühren](#transaction-fee)) zu verwenden, diese unterliegen jedoch keinen geografischen Einschränkungen wie zentralen Börsen. Jeder kann teilnehmen.

<DocLink href="/get-eth/#dex">
  Dezentralisierte Börsen
</DocLink>

### Urkunde {#deed}

Siehe [Nicht-fungible Token (NFT)](#nft).

### Einzahlungsvertrag {#deposit-contract}

Das Tor zum Staking auf Ethereum. Der Einzahlungsvertrag ist ein Smart Contract auf Ethereum, der Einzahlungen von ETH akzeptiert und die Validatorsalden verwaltet. Ein Validator kann nicht aktiviert werden, ohne ETH in diesen Vertrag einzuzahlen. Der Vertrag erfordert ETH und Eingabedaten. Diese Eingabedaten enthalten den öffentlichen Schlüssel des Validators und den öffentlichen Schlüssel zum Abheben des Guthabens, signiert vom privaten Schlüssel des Validators. Diese Daten werden benötigt, um einen Validator zu identifizieren und vom [Proof-of-Stake](#pos)-Netzwerk akzeptiert zu werden.

### DeFi {#defi}

Die Abkürzung steht für „dezentrales Finanzwesen“, eine breite Kategorie von [dApps](#dapp), die darauf abzielen, Finanzdienstleistungen auf der Grundlage der Blockchain und ohne Zwischenhändler anzubieten, so dass jeder, der über eine Internetverbindung verfügt, daran teilnehmen kann.

<DocLink href="/defi/">
  Decentralized Finance (DeFi)
</DocLink>

### Schwierigkeit {#difficulty}

Eine netzwerkweite Einstellung in [Proof-of-Work](#pow)-Netzwerken, die steuert, wie viel durchschnittliche Rechenleistung erforderlich ist, um einen gültigen Nonce zu finden. Die Schwierigkeit wird durch die Anzahl der führenden Nullen dargestellt, die im resultierenden Blockhash erforderlich sind, damit er als gültig angesehen wird. Dieses Konzept ist in Ethereum seit dem Übergang zu Proof-of-Stake veraltet.

### Schwierigkeitsbombe {#difficulty-bomb}

Geplante exponentielle Erhöhung der [Proof-of-Work](#pow) [-Schwierigkeit](#difficulty), um den Übergang zu [Proof-of-Stake](#pos) anzuregen und die Wahrscheinlichkeit einer [Abspaltung](#hard-fork) zu verringern. Die Schwierigkeitsbombe wurde mit dem [Übergang zu Proof-of-Stake](/roadmap/merge) verworfen.

### Digitale Signatur {#digital-signatures}

Eine kurze Zeichenkette von Daten, die ein Benutzer für ein Dokument mit einem [privaten Schlüssel](#private-key) erzeugt, so dass jeder mit dem entsprechenden [öffentlichen Schlüssel](#public-key), der Unterschrift und dem Dokument überprüfen kann, ob (1) das Dokument vom Eigentümer dieses privaten Schlüssels „signiert" wurde und (2) das Dokument nach seiner Unterschrift nicht geändert wurde.

<Divider />

### Entdeckung {#discovery}

Der Prozess, mit dem ein Ethereum-Node andere Nodes findet, mit denen eine Verbindung hergestellt werden soll.

### Verteilte Hash-Tabelle (DHT) {#distributed-hash-table}

Eine Datenstruktur mit `(key, value)` -Paaren, die von Ethereum-Nodes verwendet werden, um Peers zu identifizieren, mit denen sie sich verbinden und um die zur Kommunikation genutzten Protokolle zu ermitteln.

### Doppelausgabe {#double-spend}

Eine absichtliche Blockchain-Fork, bei der ein Nutzer mit einer ausreichend großen Menge an Mining-Power/Stake eine Transaktion sendet, die eine Währung außerhalb der Chain verschiebt (z. B. in Geld umwandelt oder einen Kauf außerhalb der Chain tätigt) und dann die Blockchain reorganisiert, um diese Transaktion zu entfernen. Eine erfolgreiche Doppelausgabe hinterlässt dem Angreifer seine Vermögenswerte sowohl innerhalb als auch außerhalb der Blockchain.

## E {#section-e}

### Elliptische Kurve digitaler Signaturalgorithmus (ECDSA) {#ecdsa}

Ein kryptographischer Algorithmus, der von Ethereum benutzt wird, um sicherzustellen, dass Gelder nur von deren Eigentümern ausgegeben werden können. Dies ist die bevorzugte Methode zur Erstellung von öffentlichen und privaten Schlüsseln. Relevant für die Generierung von Konto-[Adressen](#address) und für die Überprüfung von [Transaktionen](#Transaktion).

### Verschlüsselung {#encryption}

Verschlüsselung ist die Umwandlung elektronischer Daten in eine Form, die von niemandem außer dem Besitzer des korrekten Entschlüsselungsschlüssels lesbar ist.

### Entropie {#entropy}

Im Zusammenhang mit Kryptographie mangelt es an Vorhersehbarkeit oder am Level der Zufälligkeit. Beim Generieren von geheimen Informationen wie [privaten Schlüsseln](#private-key) verlassen sich Algorithmen üblicherweise auf eine Quelle hoher Entropie, um sicherzustellen, dass die Ausgabe unvorhersehbar ist.

### Epoche {#epoch}

Ein Zeitraum von 32 [Slots](#slot), wobei jeder Slot 12 Sekunden beträgt, insgesamt also 6,4 Minuten. Validatoren-[Komitees](#committee) werden aus Sicherheitsgründen jede Epoche neu zusammengestellt. In jeder Epoche gibt es die Möglichkeit, die Blockchain zu [finalisieren](#finality). Jedem Validator werden zu Beginn einer jeden Epoche neue Aufgaben zugewiesen.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-Stake
</DocLink>

### Zweideutigkeit {#equivocation}

Ein Validator, der zwei Nachrichten sendet, die sich widersprechen. Ein einfaches Beispiel ist ein Transaktionsabsender, der zwei Transaktionen mit der gleichen Nonce versendet. Ein anderer ist ein Block-Antragsteller, der zwei Blöcke in der gleichen Blockhöhe (oder für den gleichen Slot) vorschlägt.

### Eth1 {#eth1}

„Eth1" ist ein Begriff, der sich auf das Ethereum-Mainnet, die bestehende Proof-of-Work-Blockchain, bezieht. Dieser Begriff ist inzwischen im Vergleich zum Begriff „Ausführungsebene" veraltet. [Erfahren Sie mehr über diese Namensänderung](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Mehr zu den Ethereum-Upgrades
</DocLink>

### Eth2 {#eth2}

„Eth2" ist ein Begriff, der sich auf eine Reihe von Upgrades des Ethereum-Protokolls bezieht, einschließlich des Übergangs von Ethereum zu Proof-of-Stake. Dieser Begriff ist inzwischen im Vergleich zum Begriff „Konsensschicht" veraltet. [Erfahren Sie mehr über diese Namensänderung](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Mehr zu den Ethereum-Upgrades
</DocLink>

### Ethereum Verbesserungsvorschläge (EIP) {#eip}

Ein Design-Dokument, das der Ethereum-Community Informationen zur Verfügung stellt, die ein neues Merkmal oder seine Prozesse oder Umgebungen beschreiben (siehe [ERC](#erc)).

<DocLink href="/eips/">
  Einführung in EIPs
</DocLink>

### Ethereum Namensservice (Ethereum Name Service, ENS) {#ens}

Das ENS-Register ist ein zentraler [Vertrag](#smart-contract) der eine Zuordnung von Domain-Namen an Eigentümer und Lösungsanbieter (Resolver) vorsieht, wie in [EIP](#eip) 137 beschrieben.

[Lesen Sie dazu mehr auf ens.domains](https://ens.domains)

### Ausführungsclient {#execution-client}

Ausführungsclients (früher als „Eth1-Clients“ bezeichnet) wie Besu, Erigon, Go-Ethereum (Geth) und Nethermind haben die Aufgabe, Transaktionen zu verarbeiten und zu übermitteln sowie den Zustand von Ethereum zu verwalten. Sie führen die Berechnungen für jede Transaktion mit der [Ethereum Virtual Machine](#evm) durch, um sicherzustellen, dass die Richtlinien des Protokolls eingehalten werden.

### Ausführungsschicht {#execution-layer}

Die Ausführungsebene von Ethereum ist das Netzwerk der [Ausführungsclients](#execution-client).

### Extern geführtes Konto (EOA) {#eoa}

Extern geführte Konten (EOAs) sind [Konten](#account), die von [privaten Schlüsseln](#private-key) gesteuert werden, typischerweise generiert durch eine [Seed-Phrase](#hd-wallet-seed). Im Gegensatz zu Smart Contracts handelt es sich bei externen Konten um Konten, denen kein Code zugeordnet ist. Normalerweise werden diese Konten mit einer [Wallet](#Wallet) verwaltet.

### Ethereum-Anfrage zur Kommentierung (ERC) {#erc}

Eine Kennzeichnung, die einigen [EIPs](#eip) zugewiesen wurde, die versuchen, einen bestimmten Standard der Ethereum-Nutzung zu definieren.

<DocLink href="/eips/">
  Einführung in EIPs
</DocLink>

### Ethash {#ethash}

Ein [Proof-Work](#pow)-Algorithmus, der bei Ethereum verwendet wurde, bevor er zu [Proof-of-Stake](#pos) gewechselt ist.

[Weiterlesen](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### Ether {#ether}

Die vom Ethereum Ökosystem verwendete Kryptowährung, die [Gas](#gas)-Kosten abdeckt, wenn Transaktionen ausgeführt werden. Wird auch als ETH oder als Symbol Ξ, dem griechischen Großbuchstaben Xi, geschrieben.

<DocLink href="/eth/">
  Währung für unsere digitale Zukunft
</DocLink>

### Events {#events}

Ermöglicht die Verwendung von [EVM](#evm)-Protokollierungseinrichtungen. [dApps](#dapp) können Ereignisse hören und sie verwenden, um JavaScript-Callbacks auf der Benutzeroberfläche zu aktivieren.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Events und Logs
</DocLink>

### Ethereum Virtual Machine (EVM) {#evm}

Eine Stack-basierte virtuelle Maschine, die [Bytecode](#bytecode) ausführt. In Ethereum legt das Ausführungsmodell fest, wie der Systemzustand geändert wird, indem eine Reihe von Bytecode-Anweisungen und ein kleines Tupel von Umgebungsdaten angegeben werden. Dies wird durch ein formales Modell einer virtuellen Zustandsmaschine festgelegt.

<DocLink href="/developers/docs/evm/">
  Ethereum Virtual Machine (EVM)
</DocLink>

### EVM-Assemblysprache {#evm-assembly-language}

Eine für Menschen lesbare Form von EVM-[Bytecode](#bytecode).

<Divider />

## F {#section-f}

### Fallback-Funktion {#fallback-function}

Eine Standardfunktion, die aufgerufen wird, wenn keine Daten vorhanden sind oder ein deklarierter Funktionsname fehlt.

### Faucet {#faucet}

Ein Service, der über einen [Smart Contract](#smart-contract) ausgeführt wird und Geldmittel in Form von kostenlosem Test-Ether, das in einem Testnetzwerk verwendet wird, bereitstellt.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Testnetz-Faucets
</DocLink>

### Endgültigkeit {#finality}

Endgültigkeit ist die Garantie, dass sich eine Reihe von Transaktionen vor einer bestimmten Zeit nicht ändern und nicht rückgängig gemacht werden können.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Proof-of-Stake-Finalisierung
</DocLink>

### Finne {#finney}

Eine Recheneinheit von [Ether](#ether). 1 Finne = 10<sup>15</sup> [Wei](#wei). 10<sup>3</sup> Finne = 1 Ether.

### Abspaltung (Gabelung, Fork) {#fork}

Eine Änderung des Protokolls, die die Erschaffung einer alternativen Chain, oder eine zeitliche Divergenz in zwei potenzielle Blockpfade verursacht.

### Fork-Wahl-Algorithmus {#fork-choice-algorithm}

Der Algorithmus, der verwendet wird, um den Kopf der Blockchain zu identifizieren. Auf der Ausführungsebene wird der Kopf der Kette als derjenige identifiziert, der die größte Gesamtschwierigkeit hinter sich hat. Das bedeutet, dass der eigentliche Kopf der Blockchain derjenige ist, der die meiste Arbeit erfordert, um ihn zu minen. Auf der Konsensebene beobachtet der Algorithmus die gesammelten Bestätigungen der Validatoren ([LMD_GHOST](#lmd-ghost)).

### Betrugssicher {#fraud-proof}

Ein Sicherheitsmodell für bestimmte [Layer-2](#layer-2)-Lösungen, bei denen zur Geschwindigkeitserhöhung Transaktionen in Batches [gruppiert](#rollups) und als einzelne Transaktion an Ethereum übermittelt werden. Sie werden zwar für gültig erachtet, können aber angefochten werden, wenn Betrug vermutet wird. Ein Betrugsnachweis führt dann die Transaktion durch, um festzustellen, ob es zu einem Betrug gekommen ist. Diese Methode erhöht die Anzahl der möglichen Transaktionen bei gleichzeitiger Aufrechterhaltung der Sicherheit. Einige [Gruppierungen](#rollups) verwenden [Gültigkeitsnachweise](#validity-proof).

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Optimistische Gruppierungen (Optimistic Rollups)
</DocLink>

### Frontier {#frontier}

Die erste Phase der Testentwicklung von Ethereum, die von Juli 2015 bis März 2016 andauerte.

<Divider />

## G {#section-g}

### Gas {#gas}

Ein virtueller Treibstoff, der in Ethereum verwendet wird, um Smart Contracts auszuführen. Die [EVM](#evm) misst den Gasverbrauch und begrenzt den Verbrauch von Rechenressourcen (siehe [Turing-fertig](#turing-complete)).

<DocLink href="/developers/docs/gas/">
  Gas und Gebühren
</DocLink>

### Gaslimit {#gas-limit}

Die maximale Menge an [Gas](#gas), die eine [Transaktion](#transaction) oder ein [Block](#block) verbrauchen kann.

### Gaspreis {#gas-price}

Preis in Ether von einer Einheit an Gas, der innerhalb einer Transaktion spezifiziert wurde.

### Genesis-Block {#genesis-block}

Der allererste Block in einer [Blockchain](#blockchain), der verwendet wird, um ein bestimmtes Netzwerk und seine Kryptowährung zu initialisieren.

### Go Ethereum – Geth {#geth}

Go Ethereum. Eine der prominentesten Implementierungen des Ethereum-Protokolls, geschrieben in Go.

[Lesen Sie mehr dazu auf geth.ethereum.org](https://geth.ethereum.org/)

### Gwei {#gwei}

Abkürzung für Gigawei, eine Stückelung von [Ether](#ether), die üblicherweise für die Darstellung von [Gas](#gas)-Preisen verwendet wird. 1 Gwei = 10<sup>9</sup> [Wei](#wei). 10<sup>9</sup> Gwei = 1 Ether.

<Divider />

## H {#section-h}

### Hard-Fork {#hard-fork}

Eine permanente Divergenz in der [Blockchain](#blockchain), auch als Hard-Forking-Änderung bekannt. Eine Hard-Fork tritt häufig auf, wenn nicht aktualisierte Nodes Blöcke nicht validieren können, die von aktualisierten Nodes erstellt wurden, welche neueren [Konsensregeln](#consensus-rules) folgen. Nicht zu verwechseln mit einer Fork, einer Soft Fork, einer Software Fork oder einer Git Fork.

### Hash {#hash}

Ein Fingerabdruck mit fester Länge bei variabler Eingabe, erzeugt durch eine Hashfunktion. (Siehe [keccak-256](#keccak-256)).

### Hashrate {#hash-rate}

Die Anzahl der Hashberechnungen pro Sekunde durch Computer mit Mining-Software.

### HD-Wallet {#hd-wallet}

Eine [Wallet](#wallet) mit hierarchischer deterministischer (HD) Schlüsselerstellung und Transferprotokoll.

[Lesen Sie mehr auf github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD-Wallet-Seed {#hd-wallet-seed}

Ein Wert, der verwendet wird, um den Master [Private Key](#private-key) und den Master Chain Code für eine HD-[Wallet](#wallet) zu generieren. Der Wallet-Seed kann durch mnemonische Wörter dargestellt werden, die es Menschen einfacher machen, private Schlüssel zu kopieren, zu sichern und wiederherzustellen.

### Homestead {#homestead}

Die zweite Entwicklungsphase von Ethereum. Sie begann im März 2016 mit Block 1.150.000.

<Divider />

## I {#section-i}

### Index {#index}

Eine Netzwerkstruktur, die die Abfrage von Informationen aus der gesamten [Blockchain](#blockchain) optimieren soll, indem sie einen effizienten Pfad zu ihrer Speicherquelle bereitstellt.

### Austausch-Kunden-Adressprotokoll (ICAP) {#icap}

Eine Ethereum-Adressencodierung, die teilweise mit der IBAN-Codierung (International Bank Account Number) kompatibel ist und eine vielseitige, überprüfbare und interoperable Codierung für Ethereum-Adressen bietet. ICAP-Adressen verwenden einen neuen IBAN-Pseudo-Land-Code – XE, der für „eXtended Ethereum" steht, wie er in nicht gerichtlichen Währungen verwendet wird (z. B. XBT, XRP, XCP).

### Ice Age {#ice-age}

Eine [Hard Fork](#hard-fork) von Ethereum in Block 200.000, um eine exponentielle [Schwierigkeits](#difficulty)erhöhung einzuführen (auch [Schwierigkeitsbombe](#difficulty-bomb) genannt) und dadurch einen Übergang zu [Proof-of-Stake](#pos) anzuregen.

### Integrierte Entwicklungsumgebung (IDE) {#ide}

Eine Benutzerschnittstelle, die typischerweise einen Code-Editor, Compiler, Laufzeit und Debugger kombiniert.

<DocLink href="/developers/docs/ides/">
  Integrierte Entwicklungsumgebungen
</DocLink>

### Unveränderliches Problem von hochgeladenem Code {#immutable-deployed-code-problem}

Sobald der [Vertrags](#smart-contract)(oder [Bibliothek](#library))-Code auf Ethereum hochgeladen wurde, wird er unveränderlich. Standardsoftware-Entwicklungspraktiken basieren darauf, mögliche Fehler zu beheben und neue Funktionen hinzuzufügen. Daher stellt dies eine Herausforderung für die Smart Contract-Entwicklung dar.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Einsatz von Smart Contracts
</DocLink>

### Interne Transaktion {#internal-transaction}

Eine [Transaktion](#transaction) wurde von einem [Vertragskonto](#contract-account) an ein anderes Vertragskonto oder eine [EOA](#eoa) gesendet (siehe [Nachricht](#message)).

<Divider />

### Ausgabe

Das Prägen von neuem Ether, um das Vorschlagen von Blöcken, deren Attestierung und Überprüfung zu belohnen.

## K {#section-k}

### Schlüsselableitungsfunktion (Key Derivation Function, KDF) {#kdf}

Auch bekannt als „Passwort-Stretching-Algorithmus", wird sie von [Keystore](#keystore-file)-Formaten zum Schutz vor Brute-Force-, Wörterbuch- und Rainbow-Table-Angriffen auf Passphrasen-Verschlüsselung verwendet, indem wiederholt die Passphrase gehasht wird.

<DocLink href="/developers/docs/smart-contracts/security/">
  Sicherheit von Smart Contracts
</DocLink>

### Schlüsseldatei {#keyfile}

Das Privatschlüssel-/Adresspaar jedes Kontos existiert als einzelne Schlüsseldatei in einem Ethereum-Client. Dies sind JSON-Textdateien, die den verschlüsselten privaten Schlüssel des Kontos enthalten, der nur mit dem Passwort entschlüsselt werden kann, das während der Kontoerstellung eingegeben wurde.

### keccak-256 {#keccak-256}

Kryptografische [Hash](#hash)-Funktion in Ethereum. Keccak-256 wurde als [SHA](#sha)-3 standardisiert.

<Divider />

## L {#section-l}

### Layer 2 (Ebene 2) {#layer-2}

Ein Entwicklungsbereich, der sich darauf konzentriert, Verbesserungen auf das Ethereum-Protokoll aufzusetzen. Diese Verbesserungen beziehen sich auf [Transaktion](#transaction)sgeschwindigkeit, günstigere [Transaktionsgebühren](#transaction-fee) und Transaktionsanonymität.

<DocLink href="/layer-2/">
  Ebene 2
</DocLink>

### LevelDB {#level-db}

Ein Open-Source-On-Disk-Key-Value-Speicher, der als leichtgewichtige Einzelzweck-[Bibliothek](#library) mit Anbindungen an viele Plattformen implementiert ist.

### Bibliothek {#library}

Eine spezielle Art von [Vertrag](#smart-contract), ohne zahlbare Funktionen, ohne Fallbackfunktion und ohne Datenspeicherung. Daher kann sie weder Ether empfangen oder aufbewahren noch Daten speichern. Eine Bibliothek dient als zuvor bereitgestellter Code, den andere Verträge für schreibgeschützte Berechnungen aufrufen können.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Smart-Contract-Bibliotheken
</DocLink>

### Leichter Client {#light-client}

Ein Ethereum-Client, der keine lokale Kopie der [Blockchain](#blockchain) speichert oder Blöcke und [Transaktionen validiert](#transaction). Er bietet die Funktionen einer [Wallet](#wallet) und kann Transaktionen erstellen und übertragen.

<Divider />

### LMD_GHOST {#lmd-ghost}

Der [Fork-Wahl-Algorithmus](#fork-choice-algorithm), der von den Konsensclients von Ethereum verwendet wird, um den Kopf der Blockchain zu identifizieren. LMD-GHOST ist ein Akronym und steht für „Latest Message Driven Greediest Heaviest Observed SubTree", was bedeutet, dass der Kopf der Blockchain der Block mit der größten Ansammlung von [Attestierungen](#attestation) in seiner Geschichte ist.

## M {#section-m}

### Mainnet (Hauptnetz) {#mainnet}

Kurz für „Hauptnetzwerk". Dies ist die öffentliche Ethereum-[Blockchain](#blockchain). Reale ETH, echter Wert und reale Folgen. Auch als Layer 1 bekannt, wenn [Layer-2](#layer-2)-Skalierungslösungen diskutiert werden. (Siehe auch [Testnetz](#testnet)).

<DocLink href="/developers/docs/networks/">
  Ethereum-Netzwerke
</DocLink>

### Speicherschwer {#memory-hard}

Speicherschwere Funktionen sind Prozesse, die eine drastische Verringerung der Geschwindigkeit oder der Durchführbarkeit erleben, wenn sich der verfügbare Speicher auch nur leicht verringert. Ein Beispiel ist der Ethereum-Mining-Algorithmus [Ethash](#ethash).

### Merkle Patricia-Trie {#merkle-patricia-tree}

Eine Datenstruktur, die in Ethereum verwendet wird, um Schlüssel-Wert-Paare effizient zu speichern.

### Nachricht {#message}

Eine [interne Transaktion](#internal-transaction), die niemals serialisiert und nur innerhalb der [EVM](#evm) gesendet wird.

### Nachrichtenaufruf {#message-call}

Das Übergeben einer [Nachricht](#message) von einem Konto an ein anderes. Wenn das Zielkonto mit [EVM](#evm)-Code verknüpft ist, wird die virtuelle Maschine mit dem Zustand des Objekts gestartet und die Nachricht wird bearbeitet.

### Metropolis {#metropolis}

Die dritte Entwicklungsphase von Ethereum, die im Oktober 2017 begann.

### Mining {#mining}

Der Prozess des wiederholten Hashings eines Block-Headers, wobei ein [Nonce](#nonce) inkrementiert wird, bis das Ergebnis eine beliebige Anzahl führender binärer Nullen enthält. Dies ist der Prozess, durch den neue [Blöcke](#block) zu einer Proof-of-Work [Blockchain](#blockchain) hinzugefügt werden. So wurde Ethereum gesichert, bevor es zu [Proof-of-Stake](#pos) gewechselt hat.

### Miner {#miner}

Ein Netzwerk-[Knoten](#node), der den gültigen [Proof-of-Work](#pow) für neue Blöcke durch wiederholtes Pass-Hashing (siehe [Ethash](#ethash)) findet. Miner sind nicht länger Teil von Ethereum – sie wurden durch Validatoren ersetzt, als Ethereum zu [Proof-of-Stake](#pos) gewechselt ist.

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Mining
</DocLink>

### prägen (mint) {#mint}

Minting ist ein Vorgang, bei dem neue Token erstellt und in Umlauf gebracht werden, damit sie verwendet werden können. Die Erstellung eines neuen Tokens basiert auf einem dezentralen Mechanismus ohne Beteiligung einer Zentralbehörde.

<Divider />

## N {#section-n}

### Netzwerk {#network}

Verweist auf das Ethereum-Netzwerk, ein Peer-to-Peer-Netzwerk, das Transaktionen propagiert und an jeden Ethereum-Node (Netzwerkteilnehmer) weiterblockt.

<DocLink href="/developers/docs/networks/">
  Netzwerke
</DocLink>

### Netzwerk-Hashrate {#network-hashrate}

Die kollektive [Hashrate](#hash-rate), die vom gesamten Mining-Netzwerk produziert wird. Mining auf Ethereum wurde abgeschaltet, als Ethereum zu [Proof-of-Stake](#pos) gewechselt ist.

### Non-fungible Token (NFT) {#nft}

Auch als „Deed“ bekannt, ist dies ein Token-Standard, der durch den ERC-721-Vorschlag eingeführt wurde. NFTs können verfolgt und gehandelt werden, aber jeder Token ist einzigartig und unverwechselbar. Sie sind nicht austauschbar wie ETH und [ERC-20 Token](#token-standard). NFTs können das Eigentum an digitalen oder physischen Vermögenswerten repräsentieren.

<DocLink href="/nft/">
  Nicht-fungible Token (NFTs)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Nicht-fungibler Token-Standard
</DocLink>

### Node {#node}

Ein Software-Client, der am Netzwerk teilnimmt.

<DocLink href="/developers/docs/nodes-and-clients/">
  Nodes und Clients
</DocLink>

### Nonce {#nonce}

Ein Wert in der Kryptographie, der nur einmal verwendet werden kann. Eine Konto-Nonce ist ein Transaktionszähler in jedem Konto, der verwendet wird, um Replay-Angriffe zu verhindern.

<Divider />

## O {#section-o}

### Ommer-(Onkel-)Block {#ommer}

Wenn ein [Miner](#miner) einen gültigen [Block](#block) findet, könnte ein anderer Miner einen Konkurrenzblock veröffentlicht haben, der zuerst der Spitze der Blockchain hinzugefügt wird. Dieser gültige, aber veraltete Block kann von neueren Blöcken als _Ommers_ aufgenommen werden und erhält eine Teilblockbelohnung. Der Begriff „Ommer" ist der bevorzugte geschlechtsneutrale Begriff für das Geschwisterteil eines Elternblocks, aber es wird auch manchmal „Onkel" verwendet. Dies war für Ethereum relevant, als es sich um ein [Proof-of-Work](#pow)-Netzwerk handelte, aber die Ommers sind keine Eigenschaft von [Proof-of-Stake](#pos) Ethereum, weil genau ein Block-Antragsteller in jedem Slot ausgewählt wird.

### Optimistische Rollups {#optimistic-rollup}

Ein [Rollup](#rollups) von Transaktionen, die [Betrugsnachweise](#fraud-proof) verwenden, um einen erhöhten Transaktionsdurchsatz auf [Layer 2](#layer-2) zu ermöglichen und gleichzeitig die Sicherheit von [Mainnet](#mainnet) (Layer 1) zu nutzen. Anders als [Plasma](#plasma), eine ähnliche Layer-2-Lösung, können optimistische Rollups komplexere Transaktionstypen handhaben – alles, was in der [EVM](#evm) möglich ist, können auch sie abbilden. Sie haben Latenzprobleme im Vergleich zu [Zero-Knowledge-Rollups](#zk-rollups), weil eine Transaktion durch den Betrugsnachweis angefochten werden kann.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Optimistische Rollups (Optimistic Rollups)
</DocLink>

### Orakel {#oracle}

Ein Orakel ist eine Brücke zwischen der [Blockchain](#blockchain) und der realen Welt. Sie fungieren als On-Chain-[APIs](#api), die nach Informationen abgefragt und in [Smart Contracts](#smart-contract) verwendet werden können.

<DocLink href="/developers/docs/oracles/">
  Orakel
</DocLink>

<Divider />

## P {#section-p}

### Parität {#parity}

Eine der bekanntesten interoperablen Implementierungen der Ethereum Client-Software.

### Peer {#peer}

Verbundene Computer mit Ethereum Client-Software und identischen Kopien der [Blockchain](#blockchain).

### Peer-to-Peer-Netzwerk {#peer-to-peer-network}

Ein Netzwerk von Computern ([Peers](#peer)), die gemeinsam in der Lage sind, Funktionalitäten ohne zentrale serverbasierte Dienste auszuführen.

### Plasma {#plasma}

Eine Off-Chain-Skalierungslösung, die [Betrugsnachweise](#fraud-proof) verwendet, z. B. [Optimistische Rollups](#optimistic-rollups). Plasma ist auf einfache Transaktionen wie grundlegende Token-Transfers und Swaps beschränkt.

<DocLink href="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### Privater Schlüssel (Geheimer Schlüssel) {#private-key}

Eine geheime Nummer, die es Nutzern von Ethereum ermöglicht, das Eigentum an einem Konto oder an Verträgen durch die Erstellung einer digitalen Signatur nachzuweisen (siehe [Öffentlicher Schlüssel](#public-key), [Adresse](#address), [ECDSA](#ecdsa)).

### Private Blockchain {#private-chain}

Eine vollständig private Blockchain ist eine Blockchain mit erlaubtem Zugriff, die nicht öffentlich für den Gebrauch zugänglich ist.

### Proof-of-Stake (PoS) {#pos}

Eine Methode, mit der ein Kryptowährungs-Blockchain-Protokoll einen verteilten [Konsens](#consensus) erreichen soll. PoS bittet Nutzer, das Eigentum an einer bestimmten Anzahl von Kryptowährungen (ihr „Anteil" im Netzwerk) nachzuweisen, um an der Validierung von Transaktionen teilnehmen zu können.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Proof-of-Stake (Einsatznachweis)
</DocLink>

### Proof-of-Work (PoW, Arbeitsnachweis) {#pow}

Ein Datenteil (der Nachweis), der eine signifikante Berechnung erfordert, um ihn zu finden.

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  Proof-of-Work (Arbeitsnachweis)
</DocLink>

### Öffentlicher Schlüssel {#public-key}

Eine Nummer, abgeleitet über eine Einwegfunktion von einem [privaten Schlüssel](#private-key), die öffentlich zugänglich gemacht werden und von jedem verwendet werden kann, um eine digitale Signatur zu überprüfen, die mit dem entsprechenden privaten Schlüssel erstellt wurde.

<Divider />

## R {#section-r}

### Beleg {#receipt}

Von einem Ethereum-Client herausgegebene Daten, um das Ergebnis einer bestimmten [Transaktion](#transaction) zu repräsentieren, mit einem [Hash](#hash) der Transaktion, deren [Blocknummer](#block), der verbrauchten Menge an [Gas](#gas) und, im Fall des Einsatzes eines [Smart Contracts](#smart-contract), der [Adresse](#address) des Vertrags.

### Wiedereintrittsangriff {#re-entrancy-attack}

Ein Angriff, der aus einem Angreifer-Smart-Contract besteht, der eine Vertragsfunktion in einem Opfer-Smart-Contract so aufruft, dass das Opfer bei der Ausführung den Angreifervertrag erneut rekursiv aufruft. Dies kann zum Beispiel zum Diebstahl von Geldern führen, indem Teile des Opfervertrags übergangen werden, die den Saldo aktualisieren oder den Auszahlungsbetrag zählen.

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Wiedereintritt
</DocLink>

### Reward (Belohnung) {#reward}

Eine Anzahl Ether, die als Belohnung seitens des Netzwerks für den [-Miner](#miner) in jedem neuen Block enthalten ist, der die [Proof-of-Work](#pow)-Lösung gefunden hat.

### Recursive Length Prefix (RLP) {#rlp}

Ein von den Ethereum-Entwicklern entwickelter Codierungsstandard zur Codierung und Serialisierung von Objekten (Datenstrukturen) mit beliebiger Komplexität und Länge.

### Gruppierungen (Rollups) {#rollups}

Eine Art [Layer-2](#layer-2)-Skalierungslösung, die mehrere Transaktionen zusammenfasst und in einer einzigen Transaktion an [die Ethereum-Haupt-Blockchain](#mainnet) sendet. Dies ermöglicht Einsparungen bei [Gaskosten](#gas) und erhöht den [Transaktions](#transaction)durchsatz. Es gibt Optimistische und Zero-Knowledge-Gruppierungen, die verschiedene Sicherheitsmethoden anwenden, um diese Skalierbarkeitsgewinne anzubieten.

<DocLink href="/developers/docs/scaling/#rollups">
  Gruppierungen (Rollups)
</DocLink>

<Divider />

### RPC {#rpc}

**Aufruf von Remote-Prozeduren (RPC)** ist ein Protokoll, das ein Programm verwendet, um einen Service von einem Programm auf einem anderen Computer in einem Netzwerk anzufordern, ohne die Netzwerkdetails verstehen zu müssen.

## S {#section-s}

### Sicherer Hash-Algorithmus (SHA) {#sha}

Eine Familie kryptografischer Hashfunktionen, die vom National Institute of Standards and Technologe (NIST) veröffentlicht wurde.

### Serenity {#serenity}

Die Phase der Ethereum-Entwicklung, die eine Reihe von Skalierungs- und Nachhaltigkeitsverbesserungen einleitete und früher als „Ethereum 2.0“ oder „Eth2“ bekannt war.

<DocLink href="/roadmap/">
  Die Ethereum-Upgrades
</DocLink>

### Serialisierung {#serialization}

Der Prozess der Umwandlung einer Datenstruktur in eine Sequenz von Bytes.

### Fragmentierung / Fragmentierungskette (Shard/Shard Chain) {#shard}

Shard Chains sind diskrete Abschnitte der gesamten Blockchain, für die Untergruppen von Validatoren zuständig sein können. Fragmentierungsketten werden einen erhöhten Transaktionsdurchsatz für Ethereum bieten, indem sie zusätzliche Daten für [Layer-2](#layer-2)- Lösungen wie [Optimistische Gruppierungen](#optimistic-rollups) und [ZK-Gruppierungen](#zk-rollups) bereitstellen.

<DocLink href="/roadmap/danksharding">
  Danksharding
</DocLink>

### Seitenkette (Sidechain) {#sidechain}

Eine Skalierungslösung, die eine separate Kette mit anderen, oft schnelleren [Konsensregeln](#consensus-rules) verwendet. Eine Brücke wird benötigt, um diese Seitenketten mit dem [Mainnet](#mainnet) zu verbinden. [Gruppierungen](#rollups) verwenden ebenfalls Seitenketten, aber sie arbeiten stattdessen mit [Mainnet](#mainnet) zusammen.

<DocLink href="/developers/docs/scaling/sidechains/">
  Seitenketten
</DocLink>

### Signieren {#signing}

Kryptografisch demonstrieren, dass eine Transaktion vom Inhaber eines bestimmten privaten Schlüssels genehmigt wurde.

### Singleton {#singleton}

Ein Programmierbegriff, der ein Objekt beschreibt, von dem nur eine Instanz existieren kann.

### Slasher {#slasher}

Ein Slasher ist eine Entität, die Attestierungen prüft und nach Vergehen sucht, die es zu bestrafen gilt. Slashings werden ins Netzwerk übermittelt und der nächste Blockvorschlag fügt dem Block den Beweis hinzu. Der Block-Antragsteller erhält dann eine Belohnung dafür, dass er den böswilligen Validator gestraft hat.

### Zeitspanne (Slot) {#slot}

Eine Zeitspanne (12 Sekunden), in der ein neuer Block von einem [Validator](#validator) im [Proof-of-Stake](#pos)-System vorgeschlagen werden kann. Ein Slot kann leer sein. 32 Slots bilden eine [Epoche](#epoch).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-Stake
</DocLink>

### Intelligenter Vertrag (Smart Contract) {#smart-contract}

Ein Programm, das auf der Ethereum-Rechnerinfrastruktur ausgeführt wird.

<DocLink href="/developers/docs/smart-contracts/">
  Einführung in Smart Contracts
</DocLink>

### SNARK {#snark}

SNARK steht für „succinct non-interactive argument of knowledge" und ist eine Art [Zero-Knowledge Proof](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Gruppierungen (Zero-Knowledge Rollups)
</DocLink>

### Soft Fork {#soft-fork}

Eine Abweichung in einer [Blockchain](#blockchain), die auftritt, wenn sich die [Konsensregeln](#consensus-rules) ändern. Im Gegensatz zu einer [Hard Fork](#hard-fork) ist eine Soft Fork abwärtskompatibel. Das bedeutet, dass aktualisierte Nodes Blöcke, die von nicht aktualisierten Nodes erstellt wurden, validieren können, solange sie den neuen Konsensregeln folgen.

### Solidity {#solidity}

Eine prozedurale (imperative) Programmiersprache mit Syntax, die ähnlich wie JavaScript, C++ oder Java ist. Die populärste und am häufigsten verwendete Sprache für Ethereum [Smart Contracts](#smart-contract). Von Dr. Gavin Wood erstellt.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity Inline Assembly {#solidity-inline-assembly}

[EVM](#evm)-Assembly-Sprache in einem [Solidity](#solidity)-Programm. Die Unterstützung von Solidity für Inline-Assembly erleichtert das Schreiben bestimmter Operationen.

### Spurious Dragon {#spurious-dragon}

Eine [Hard Fork](#hard-fork) der Ethereum Blockchain, die in Block 2.675.000 aufgetreten ist, um weitere Denial-of-Service-Angriffsvektoren und einen klaren Zustand zu adressieren (siehe [Tangerine Whistle](#tangerine-whistle)). Auch ein Replay-Angriffsschutzmechanismus (siehe [Nonce](#nonce)).

### Stablecoin {#stablecoin}

Ein [ERC-20-Token](#token-standard) mit einem Wert, der an den Wert eines anderen Assets gekoppelt ist. Es gibt Stablecoins mit Fiat-Währungen wie Dollar, Edelmetalle wie Gold und andere Kryptowährungen wie Bitcoin.

<DocLink href="/eth/#tokens">
  ETH ist nicht die einzige Kryptowährung auf Ethereum
</DocLink>

### Staking {#staking}

Überweisen einer Menge von [Ether](#ether) (Ihr Einsatz), um ein Validator zu werden und das [Netzwerk](#network) zu sichern. Ein Validator prüft [Transaktionen](#transaction) und schlägt [Blöcke](#block) unter einem [Proof-of-Stake](#pos) Konsensmodell vor. Mit Staking erhalten Sie einen wirtschaftlichen Anreiz, im besten Interesse des Netzwerks zu handeln. Sie erhalten Belohnungen für die Ausführung Ihrer [Validator](#validator)-Pflichten, verlieren aber unterschiedliche Mengen an ETH, wenn Sie dies nicht tun.

<DocLink href="/staking/">
  Ihre ETH einsetzen, um Ethereum-Validator zu werden
</DocLink>

### Staking-Pool {#staking-pool}

Die kombinierte ETH von mehr als einem Ethereum-Staker, die verwendet wird, um die 32 ETH zu erreichen, die zur Aktivierung eines Sets von Validator-Schlüsseln erforderlich sind. Ein Node-Betreiber verwendet diese Schlüssel, um am Konsens teilzunehmen, und die [Blockbelohnungen](#block-reward) werden unter den beitragenden Stakern aufgeteilt. Staking-Pools oder das Delegieren von Staking sind nicht Bestandteil des Ethereum-Protokolls, aber es wurden von der Community bereits viele Lösungen entwickelt.

<DocLink href="/staking/pools/">
  Pool-Staking
</DocLink>

### STARK {#stark}

Die Abkürzung steht für „scalable transparent argument of knowledge" (skalierbares transparentes Wissensargument). Ein STARK ist eine Art [Zero-Knowledge-Nachweis](#zk-nachweis).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Gruppierungen (Rollups)
</DocLink>

### Zustand {#state}

Eine Momentaufnahme aller Salden und Daten auf der Blockchain zu einem bestimmten Zeitpunkt. Er bezieht sich normalerweise auf die Bedingung in einem bestimmten Block.

### Zustandskanäle {#state-channels}

Eine [Layer-2](#layer-2)-Lösung, bei der ein Kanal zwischen den Teilnehmern eingerichtet wird, in dem sie frei und kostengünstig handeln können. Nur eine [Transaktion](#transaction) zum Einrichten des Kanals und zum Schließen des Kanals wird an das [Mainnet](#mainnet) gesendet. Dies ermöglicht einen sehr hohen Transaktionsdurchsatz, setzt aber die vorherige Kenntnis der Teilnehmerzahl und das Sperren von Assets voraus.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Zustandskanäle
</DocLink>

### Qualifizierte Mehrheit {#supermajority}

Die qualifizierte Mehrheit ist die Bezeichnung für einen Betrag, der 2/3 (66 %) des gesamten eingesetzten Ethers auf der Beacon Chain übersteigt. Für die [Finalisierung](#finality) von Blöcken auf der Beacon Chain ist eine qualifizierte Mehrheitsentscheidung erforderlich.

### Synchronisieren {#syncing}

Der Prozess des Herunterladens der gesamten neuesten Version einer Blockchain auf einen Node.

### Sync-Komitee {#sync-committee}

Das Sync-Komitee ist eine zufällig ausgewählte Gruppe von [Validatoren](#validator), die ca. alle 27 Stunden aktualisiert wird. Ihr Zweck ist es, gültige Block-Header mit ihrer Unterschrift zu versehen. Das Sync-Komitee ermöglicht es [leichten Clients](#light-client), den Kopf der Blockchain zu verfolgen, ohne auf das gesamte Validator-Set zugreifen zu müssen.

### Szabo {#szabo}

Eine Recheneinheit von [Ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 Ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Eine [Hard Fork](#hard-fork) der Ethereum Blockchain, die in Block 2.463.000 aufgetreten ist, um die Berechnung von [Gas](#gas) für bestimmte I/O-intensive Operationen zu ändern und den kumulierten Zustand vor einem Denial-of-Service-Angriff zu beseitigen, der die niedrigen Gaskosten dieser Operationen ausnutzte.

### Terminale Gesamtschwierigkeit (Terminal Total Difficulty, TTD) {#terminal-total-difficulty}

Die Gesamtschwierigkeit ist die Summe der Ethash-Mining-Schwierigkeit für alle Blöcke bis zu einem bestimmten Punkt in der Blockchain. Die terminale Gesamtschwierigkeit ist ein spezifischer Wert für die Gesamtschwierigkeit, die als Trigger für die Ausführungsclients verwendet wurde, um ihr Mining abzuschalten und Funktionen zu aktivieren, die für den Übergang zu Proof-of-Stake verantwortlich sind.

### Testnetz {#testnet}

Kurz für „Testnetzwerk", ein Netzwerk, das dazu dient, das Verhalten des Hauptnetzwerks von Ethereum zu simulieren (siehe [Hauptnetzwerk](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Testnetze
</DocLink>

### Token {#token}

Ein handelbares virtuelles Gut, das in Smart Contracts auf der Ethereum-Blockchain definiert ist.

### Token-Standard {#token-standard}

Eingeführt mit dem ERC-20-Vorschlag, bietet dies eine standardisierte [Smart Contract](#smart-contract)-Struktur für fungible Token. Token desselben Vertrags können nachverfolgt und gehandelt werden und sind im Gegensatz zu [NFTs](#nft) austauschbar.

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  ERC-20 Token-Standard
</DocLink>

### Transaktion {#transaction}

Daten, die an die Ethereum-Blockchain übergeben wurden, signiert von einem Ursprungs-[Konto](#account), und die eine bestimmte [Adresse](#address) anvisieren. Die Transaktion enthält Metadaten wie das [Gas-Limit](#gas-limit) für diese Transaktion.

<DocLink href="/developers/docs/transactions/">
  Transaktionen
</DocLink>

### Transaktionsgebühr {#transaction-fee}

Eine Gebühr, die man bezahlen muss, wenn man das Ethereum-Netzwerk nutzen möchte. Beispiele dafür sind das Senden von Guthaben von Ihrer [Wallet](#wallet) oder einer [dApp](#dapp)-Interaktion, wie zum Beispiel das Tauschen von Token oder der Kauf eines NFTs. Sie können sich das wie eine Servicegebühr vorstellen. Diese Gebühr wird sich je nach Netzwerkauslastung ändern. Der Grund dafür ist, dass [Validatoren](#validator), die für die Bearbeitung Ihrer Transaktion zuständig sind, wahrscheinlich Transaktionen mit höheren Gebühren bevorzugen – so treibt die Überlastung den Preis in die Höhe.

Auf technischer Ebene bezieht sich die Transaktionsgebühr auf die Menge an [Gas](#gas), die Ihre Transaktion benötigt.

Die Senkung der Transaktionsgebühren ist derzeit von großem Interesse. Siehe [Layer 2](#layer-2).

### Vertrauenslosigkeit {#trustlessness}

Die Fähigkeit eines Netzwerkes, Transaktionen zu vermitteln, ohne dass eine der beteiligten Parteien einem Dritten vertrauen muss.

### Turing vollständig {#turing-complete}

Ein nach dem englischen Mathematiker und Informatiker Alan Turing benanntes Konzept: Ein System von Datenmanipulationsregeln (z. B. der Befehlssatz eines Computers, eine Programmiersprache oder ein Zellularautomat) gilt als „Turing complete“ oder „computationally universal“, wenn es zur Simulation einer beliebigen Turing-Maschine verwendet werden kann.

<Divider />

## V {#section-v}

### Validator {#validator}

Ein [Node](#node) in einem [Proof-of-Stake](#pos)-System, der für die Speicherung von Daten, die Verarbeitung von Transaktionen und das Hinzufügen neuer Blöcke zur Blockchain verantwortlich ist. Um die Validator-Software zu aktivieren, müssen Sie in der Lage sein, [32 ETH zu investieren.](#staking)

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Proof-of-Stake (Einsatznachweis)
</DocLink>
<DocLink href="/staking/">
  Staking auf Ethereum
</DocLink>

### Validator-Lebenszyklus {#validator-lifecycle}

Die Sequenz von Zuständen, in denen ein Validator existieren kann. Dazu gehören:

- Hinterlegt: Mindestens 32 ETH wurden vom Validator beim [Einzahlungsvertrag](#deposit-contract) hinterlegt
- Ausstehend: Der Validator befindet sich in der Warteschlange für die Aktivierung und wartet darauf, von bestehenden Validatoren ins Netzwerk gewählt zu werden
- Aktiv: derzeit Blöcke attestieren und vorschlagen
- Slashing: Der Validator hat sich falsch verhalten und wird „geslasht."
- Beenden: Der Validator wurde markiert, weil er entweder freiwillig ging oder weil er herausgeworfen wurde.

### Validitätsnachweis {#validity-proof}

Ein Sicherheitsmodell für bestimmte [Layer-2](#layer-2)-Lösungen, bei denen zur Geschwindigkeitserhöhung Transaktionen [„aufgerollt"](/#rollups) und als einzelne Transaktion an Ethereum übermittelt werden. Die Transaktionsberechnung erfolgt off-chain und wird dann mit einem Nachweis ihrer Gültigkeit an die Hauptchain übertragen. Diese Methode erhöht die Anzahl der möglichen Transaktionen bei gleichzeitiger Aufrechterhaltung der Sicherheit. Einige [Rollups](#rollups) verwenden [Betrugsnachweise](#fraud-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Gruppierungen (Rollups)
</DocLink>

### Validium {#validium}

Eine Off-Chain-Lösung, die [Gültigkeitsnachweise](#validity-proof) verwendet, um den Transaktionsdurchsatz zu verbessern. Im Gegensatz zu [Zero-Knowledge Rollups](#zk-rollup) werden Validium-Daten nicht auf der Layer 1 [Mainnet](#mainnet) gespeichert.

<DocLink href="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Eine Programmiersprache auf hohem Level mit Python-ähnlicher Syntax. Ziel ist es, näher an eine rein funktionale Sprache zu kommen. Von Vitalik Buterin erstellt.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### Wallet {#wallet}

Software, die [private Schlüssel](#private-key) hält. Wird verwendet, um auf Ethereum-[Konten](#account) zuzugreifen und diese zu steuern und mit [Smart Contracts](#smart-contract) zu interagieren. Schlüssel müssen nicht in einer Wallet gespeichert werden und können stattdessen aus Offline-Speicher (z. B. Speicherkarte oder Papier) abgerufen werden, um die Sicherheit zu verbessern. Trotz des Namens speichern Wallets niemals die tatsächlichen Münzen oder Token.

<DocLink href="/wallets/">
  Ethereum-Wallets
</DocLink>

### Web3 {#web3}

Die dritte Version des Web. Web3 wurde erstmals von Dr. Gavin Wood vorgeschlagen und stellt eine neue Vision und einen neuen Schwerpunkt für Webanwendungen dar – von zentral betriebenen und verwalteten Anwendungen hin zu Anwendungen, die auf dezentralen Protokollen basieren (siehe [dapp](#dapp)).

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 vs. Web3
</DocLink>

### Wei {#wei}

Die kleinste Stückelung von [Ether](#ether). 10<sup>18</sup> wei = 1 Ether.

<Divider />

## Z {#section-z}

### Null-Adresse {#zero-address}

Eine Ethereum-Adresse, die ausschließlich aus Nullen besteht und häufig als Adresse verwendet wird, um Token aus dem eigenen Umlauf zu entfernen. Es ist zu unterscheiden zwischen dem Token-Burning(), bei dem Tokens über den Token-Burning-Mechanismus endgültig aus dem System der Smart Contracts entfernt werden, und dem Token-Burning, bei dem Tokens an diese Adresse gesendet werden.

### Zero-Knowledge-Nachweis {#zk-proof}

Ein Zero-Knowledge-Nachweis ist eine kryptografische Methode, die es einer Person ermöglicht zu beweisen, dass eine Aussage wahr ist, ohne zusätzliche Informationen zu übermitteln.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Gruppierungen (Rollups)
</DocLink>

### Zero-Knowledge Gruppierung (Rollup) {#zk-rollup}

Eine [Gruppierung](#rollups) von Transaktionen, die [Gültigkeitsnachweise](#validity-proof) verwenden, um einen erhöhten [Layer-2](#layer-2)-Transaktionsdurchsatz zu bieten und gleichzeitig die Sicherheit von [Mainnet](#mainnet) (Layer 1) zu nutzen. Obwohl sie komplexe Transaktionstypen wie [Optimistische Gruppierungen](#optimistic-rollups) nicht bewältigen können, haben sie keine Latenzprobleme, da Transaktionen nachweislich gültig sind, wenn sie abgeschickt werden.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Gruppierungen
</DocLink>

<Divider />

## Quellen {#sources}

_Teilweise erstellt von [Ethereum beherrschen](https://github.com/ethereumbook/ethereumbook) von [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) unter CC-BY-SA_

<Divider />

## Tragen Sie zu dieser Seite bei {#contribute-to-this-page}

Haben wir etwas vergessen? Ist etwas nicht korrekt? Helfen Sie uns, indem Sie zu diesem Glossar auf GitHub beitragen!

[Erfahren Sie mehr darüber, wie Sie einen Beitrag leisten können](/contributing/adding-glossary-terms)
