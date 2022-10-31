---
title: Ethereum Glossar
description: Ein unvollständiges Glossar technischer und nicht technischer Begriffe, bezogen auf Ethereum
lang: de
sidebarDepth: 2
---

# Glossar {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### 51-%-Angriff {#51-attack}

Eine Art von Angriff auf ein dezentralisiertes [Netzwerk](#network), mit welchem eine Gruppe die Kontrolle über die Mehrheit der [Nodes](#node) erlangt. Dies würde den Angreifern durch die Rücknahme von [Transaktionen](#transaction) und Doppelausgabe von [Ether](#ether) und anderen Token Blockchainbetrug ermöglichen.

## A {#section-a}

### Account (Konto) {#account}

Ein Objekt mit einer [Adresse](#address), einem Saldo, einer [Nonce](#nonce), optionalem Speicher und Code. Ein Konto kann ein [Vertragskonto](#contract-account) oder ein [externes Konto (Externally owned Account, EOA)](#eoa) sein.

<DocLink to="/developers/docs/accounts">
  Ethereum-Konten
</DocLink>

### Adresse {#address}

Im Allgemeinen symbolisiert diese einen [EOA](#eoa) oder [Vertrag](#contract-accouint), welcher [Transaktionen](#transaction) auf der Blockchain empfangen (Zieladresse) oder senden (Quelladresse) kann. Genauer gesagt sind es die ganz rechten 160 Bit eines [Keccak-Hashs](#keccak-256) eines [öffentlichen ECDSA](#ecdsa) [-Schlüssels](#public-key).

### ABI (Binäre Anwendungsschnittstelle) {#abi}

Der standardmäßige Interaktionsweg zwischen [Verträgen](#contract-account) im Ethereum-Ökosystem, sowohl von solchen außerhalb der Blockchain als auch von Vertrag zu Vertrag.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### Application Programming Interface (Programmierschnittstelle) {#api}

Eine Programmierschnittstelle (API) ist eine Reihe von Definitionen, wie eine Software zu verwenden ist. Eine API ist zwischen einer Anwendung und einem Webserver angesiedelt und erleichtert die Datenübertragung zwischen diesen.

### assert {#assert}

In [Solidity](#solidity) wird `assert(false)` zu `0xfe` kompiliert, ein ungültiger Opcode, der alles verbleibende [Gas](#gas) verbraucht und alle Änderungen rückgängig macht. Wenn eine `assert()`-Anweisung fehlschlägt, passiert etwas sehr Falsches und Unerwartetes und du musst deinen Code reparieren. Du solltest `assert()` verwenden, um Bedingungen zu vermeiden, die niemals auftreten dürfen.

<DocLink to="/developers/docs/smart-contracts/security/">
  Smart Contract – Sicherheit
</DocLink>

### Attestierung {#attestation}

Eine Abstimmung eines Validators für eine [Beacon Chain](#beacon-chain) oder einen [Shard](#shard)-[Block](#block). Validatoren müssen Blöcke attestieren und signalisieren, dass sie mit dem vom Block vorgeschlagenen Zustand einverstanden sind.

<Divider />

## B {#section-b}

### Base Feee (Grundgebühr) {#base-fee}

Jeder [Block](#block) hat einen Mindestpreis, der als "Grundgebühr" bezeichnet wird. Dies ist die minimale [Gas](#gas)-Gebühr, die ein Nutzer zahlen muss, um eine Transaktion in den nächsten Block aufzunehmen.

<DocLink to="/developers/docs/gas/">
  Gas und Gebühren
</DocLink>

### Beacon Chain {#beacon-chain}

Ein Netzwerk-Upgrade, das eine neue Konsensschicht einführt, die zum Koordinator für das gesamte Ethereum-Netzwerk wird. Es führt [Proof-of-Stake](#pos) und [Validatoren](#validator) in Ethereum ein. Es wird schließlich mit [Mainnet](#mainnet) zusammengelegt.

<DocLink to="/upgrades/beacon-chain/">
  Beacon Chain
</DocLink>

### Big-Endian {#big-endian}

Eine Positionsnummernrepräsentation, bei der die bedeutendste Ziffer zuerst im Speicher liegt. Das Gegenteil von little-endian, wo die am wenigsten signifikante Ziffer zuerst kommt.

### Block {#block}

Eine Ansammlung von erforderlichen Informationen (ein Block-Header) über die zusammengefassten [Transaktionen](#transaction) und eine Reihe anderer Block-Header, bekannt als [ommers](#ommer). Blöcke werden von [Minern](#miner) zum Ethereum-Netzwerk hinzugefügt.

<DocLink to="/developers/docs/blocks/">
  Blöcke
</DocLink>

### Blockchain {#blockchain}

In Ethereum eine Folge von [Blöcken](#block), die durch das [Proof-of-Work](#pow)-System validiert und bis zum [Genesis-Block](#genesis-block) zum jeweiligen Vorgänger verlinkt sind. Es gibt kein Limit für die Block-Größe; stattdessen gibt es wechselnde [Gas-Limits](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Was ist eine Blockchain?
</DocLink>

### Bytecode {#bytecode}

Ein abstrakter Befehlssatz zur effizienten Ausführung durch einen Software-Interpreter oder eine virtuelle Maschine. Im Gegensatz zu menschenlesbarem Quellcode wird Bytecode im numerischen Format ausgedrückt.

### Byzantium fork {#byzantium-fork}

Die erste von zwei [Hardforks](#hard-fork) für die [Metropolis](#metropolis)-Entwicklungsphase. [Difficulty Bomb](#difficulty-bomb) – Verzögerung und Blockierung der Belohnung, wobei die [Eiszeit](#ice-age) um 1 Jahr verzögert wurde und die Blockbelohnung von 5 auf 3 Ether reduziert wurde.

<Divider />

## C {#section-c}

### Checkpoint (Kontrollpunkt) {#checkpoint}

Die [Beacon Chain](#beacon-chain) hat ein in Slots (12 Sekunden) und Epochen (32 Slots) unterteiltes Tempo. Der erste Slot in jeder Epoche ist ein Kontrollpunkt. Wenn eine [Supermajority](#supermajority) von Validatoren die Verbindung zwischen zwei Kontrollpunkten bestätigt, können sie [gerechtfertigt](#justification) werden, und sobald ein anderer Kontrollpunkt gerechtfertigt ist, können sie [abgeschlossen](#finality) werden.

### Compiling (Kompilieren) {#compiling}

Konvertieren von Code in einer Programmiersprache auf hoher Ebene (z. B. [Solidity](#solidity)) in eine Sprache auf niedrigerer Ebene (z. B. EVM-[Bytecode](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compiling Smart Contracts (Kompilieren von Smart Contracts)
</DocLink>

### Committee (Komitee) {#committee}

Eine Gruppe von mindestens 128 [Validatoren](#validator), die durch [die Beacon Chain](#beacon-chain) willkürlich Beacon- und Shard-Blöcken zugewiesen sind.

### Consensus (Konsens) {#consensus}

Wenn zahlreiche Nodes (meist die Mehrzahl der Nodes im Netzwerk) alle die gleichen Blöcke in ihrer lokal validierten besten Blockchain haben. Nicht zu verwechseln mit [Konsensregeln](#consensus-rules).

### Consensus Client (Konsens-Client) {#consensus-client}

Konsens-Clients (wie Prysm, Teku, Nimbus, Lighthouse, Lodestar) führen Ethereums [Proof-of-Stake](#pos)-Konsensalgorithmus aus, der es dem Netzwerk ermöglicht, sich bezüglich des Kopfs der Beacon Chain zu einigen. Konsens-Clients beteiligen sich nicht an der Validierung/am Broadcasting von Transaktionen oder der Ausführung von Zustandsübergängen. Dies geschieht durch [Ausführungsclients](#execution-client).

### Consensus Layer (Konsensschicht) {#consensus-layer}

Die Konsensschicht von Ethereum ist das Netzwerk der [Konsens-Clients](#consensus-client).

### Consensus Rules (Konsensregeln) {#consensus-rules}

Die Block-Validierungsregeln, denen Full-Nodes folgen, um im Konsens mit anderen Nodes zu bleiben. Nicht zu verwechseln mit [Konsens](#consensus).

### Constantinople Fork {#constantinople-fork}

Der zweite Teil der [Metropolis](#metropolis)-Ausbaustufe, ursprünglich geplant für Mitte 2018. Erwartete neben anderen Änderungen einen Wechsel auf einen Hybrid-[Proof-of-Work](#pow)/[-Proof-of-Stake](#pos)-Konsensalgorithmus.

### Contract Account (Vertragskonto) {#contract-account}

Ein Konto, das Code enthält, welcher ausgeführt wird, wenn es eine [Transaktion](#transaction) von einem anderen [Konto](#account) ([EOA](#eoa) oder [Smart Contract](#contract-account)) erhält.

### Contract Creation Transaction (Vertragserstellungs-Transaktion) {#contract-creation-transaction}

Eine spezielle [Transaktion](#transaction) mit der [Null-Adresse](#zero-address) als Empfänger, die verwendet wird, um einen [Vertrag](#contract-account) zu registrieren und ihn in der Ethereum-Blockchain aufzuzeichnen.

### Crosslink {#crosslink}

Ein Crosslink liefert eine Zusammenfassung des Zustands eines Shards. So kommunizieren [Shard](#shard)-Ketten im geshardten [Proof-of-Stake-System](#proof-of-stake) über die [Beacon Chain](#beacon-chain).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-Stake
</DocLink>

<Divider />

## D {#section-d}

### Dezentralisierte Autonome Organisation (DAO) {#dao}

Ein Unternehmen oder eine andere Organisation, die ohne hierarchisches Management arbeitet. DAO kann sich auch auf einen am 30. April 2016 gestarteten Smart Contract mit dem Titel "The DAO" beziehen, der im Juni 2016 gehackt wurde; dies motivierte letztendlich eine [Hard Fork](#hard-fork) (Codename DAO) auf Block 1.192.000, die den gehackten DAO-Vertrag rückgängig machte und Ethereum und Ethereum Classic in zwei konkurrierende Systeme aufspaltete.

<DocLink to="/dao/">
  Dezentralisierte Autonome Organisationen (DAO)
</DocLink>

### DApp {#dapp}

Dezentralisierte Applikation. Es handelt sich mindestens um einen [Smart Contract](#smart-contract) und eine Web-Benutzeroberfläche. Allgemeiner ausgedrückt: Eine dApp ist eine Webanwendung, die auf offenen, dezentralisierten Peer-to-Peer-Infrastruktur-Diensten aufbaut. Darüber hinaus beinhalten viele dApps dezentralen Speicher und/oder ein Message-Protokoll und eine Plattform.

<DocLink to="/developers/docs/dapps/">
  Einführung in dApps
</DocLink>

### Dezentralisierte Börsen (DEX) {#dex}

Eine Art [dApp](#dapp), mit der du Token mit anderen im Netzwerk austauschen kannst. Du benötigst [Ether](#ether), um eine (zur Zahlung von [Transaktionsgebühren](#transaction-fee)) zu verwenden, aber diese unterliegen keinen geografischen Einschränkungen wie zentralisierten Börsen – jeder kann teilnehmen.

<DocLink to="/get-eth/#dex">
  Dezentralisierte Börsen
</DocLink>

### Deed (Beglaubigung) {#deed}

Siehe [non-fungible token (NFT)](#nft)

### DeFi {#defi}

Die Abkürzung steht für "dezentralisiertes Finanzwesen", eine breite Kategorie von [dApps](#dapp), die darauf abzielen, Finanzdienstleistungen auf der Grundlage der Blockchain und ohne Zwischenhändler anzubieten, so dass jeder, der über eine Internetverbindung verfügt, daran teilnehmen kann.

<DocLink to="/defi/">
  Decentralized Finance (DeFi)
</DocLink>

### Difficulty (Schwierigkeit) {#difficulty}

Eine netzwerkweite Einstellung, die bestimmt, wie viel Berechnung erforderlich ist, um einen [Proof-of-Work](#pow) zu erstellen.

### Difficulty Bomb (Schwierigkeitsbombe) {#difficulty-bomb}

Geplante exponentielle Erhöhung der [Proof-of-Work](#pow)-[Schwierigkeit](#difficulty), um den Übergang zu [Proof-of-Stake](#pos) zu motivieren und die Wahrscheinlichkeit einer [Abspaltung](#hard-fork) zu verringern.

### Digitale Signatur {#digital-signatures}

Eine kurze Zeichenkette von Daten, die ein Benutzer für ein Dokument mit einem [privaten Schlüssel](#private-key) erzeugt, so dass jeder mit dem entsprechenden [öffentlichen Schlüssel](#public-key), der Unterschrift und dem Dokument überprüfen kann, dass (1) das Dokument vom Eigentümer dieses privaten Schlüssels "signiert" wurde und (2) das Dokument nach seiner Unterschrift nicht geändert wurde.

<Divider />

## E {#section-e}

### Elliptische Kurve digitale Signatur Algorithmus (ECDSA) {#ecdsa}

Ein kryptographischer Algorithmus, der von Ethereum benutzt wird, um sicherzustellen, dass Gelder nur von deren Eigentümern ausgegeben werden können. Dies ist die bevorzugte Methode zur Erstellung von öffentlichen und privaten Schlüsseln. Relevant für die Generierung von Konto-[Adressen](#address) und die Überprüfung von [Transaktionen](#Transaktion).

### Epoche {#epoch}

Eine Periode von 32 [Slots](#slot) (6,4 Minuten) in dem von der [Beacon Chain](#beacon-chain) koordinierten System. [Validator](#validator)-[Ausschüsse](#committee) werden aus Sicherheitsgründen jede Epoche gemischt. In jeder Epoche gibt es die Möglichkeit, die Kette zu [finalisieren](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-Stake
</DocLink>

### Eth1 {#eth1}

"Eth1" ist ein Begriff, der sich auf das Ethereum-Mainnet, die bestehende Proof-of-Work-Blockchain, bezieht. Dieser Begriff ist inzwischen zugunsten der "Ausführungsschicht" veraltet. [Erfahre mehr über diese Namensänderung](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Mehr zu den Ethereum-Upgrades
</DocLink>

### Eth2 {#eth2}

"Eth2" ist ein Begriff, der sich auf eine Reihe von Upgrades des Ethereum-Protokolls bezieht, einschließlich des Übergangs von Ethereum zu Proof-of-Stake. Dieser Begriff ist inzwischen zugunsten des Begriffs "Konsensschicht" veraltet. [Erfahre mehr über diese Namensänderung](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Mehr zu den Ethereum-Upgrades
</DocLink>

### Ethereum-Verbesserungsvorschläge (EIP) {#eip}

Ein Designdokument, das der Ethereum-Community Informationen zur Verfügung stellt und ein neues Feature oder seine Prozesse oder Umgebungen beschreibt (siehe [ERC](#erc)).

<DocLink to="/eips/">
  Einführung in EIPs
</DocLink>

### Ethereum Name Service (ENS) {#ens}

Die ENS Registry ist ein zentraler [-Smart Contract](#smart-contract), der eine Zuordnung von Domain-Namen an Eigentümer und Resolver vorsieht, wie in [EIP](#eip) 137 beschrieben.

[Lies mehr auf ens.domains](https://ens.domains)

### Entropie {#entropy}

Im Zusammenhang mit der Kryptographie mangelt es an Vorhersehbarkeit oder am Level der Zufälligkeit. Beim Generieren von geheimen Informationen wie [privaten Schlüsseln](#private-key) verlassen Algorithmem sich üblicherweise auf eine Quelle hoher Entropie, um sicherzustellen, dass die Ausgabe unvorhersehbar ist.

### Execution Client (Ausführungs-Client) {#execution-client}

Execution Clients (Ausführungs-Clients) (auch bekannt als "Eth1-Clients") wie Besu, Erigon, go-ethereum oder Nethermind sind mit der Verarbeitung und Übertragung von Transaktionen sowie der Verwaltung des Ethereum-Zustands betraut. Sie führen die Berechnungen für jede Transaktion in der [Ethereum Virtual Machine](#evm) durch, um sicherzustellen, dass die Regeln des Protokolls eingehalten werden. Heute sind sie auch für den [Proof-of-Work](#pow) zuständig. Nach dem Übergang zum [Proof-of-Stake](#pos) werden sie diese Aufgabe an Konsens-Clients delegieren.

### Execution Layer (Ausführungsschicht) {#execution-layer}

Die Ausführungsschicht von Ethereum ist das Netzwerk der [Ausführungs-Clients](#execution-client).

### Externes Konto (EOA) {#eoa}

Ein [Konto](#account), erstellt von oder für menschliche Benutzer des Ethereum-Netzwerks.

### Ethereum-Anfrage zur Kommentierung (ERC) {#erc}

Eine Kennzeichnung, die einigen [EIPs](#eip) zugewiesen wurde, die versuchen, einen bestimmten Standard der Ethereum-Nutzung zu definieren.

<DocLink to="/eips/">
  Einführung in EIPs
</DocLink>

### Ethash {#ethash}

Ein [Proof-Work](#pow)-Algorithmus für Ethereum 1.0.

[Lies mehr auf eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### Ether {#ether}

Die vom Ethereum-Ökosystem verwendete Kryptowährung, die [Gas](#gas)-Kosten abdeckt, wenn Transaktionen ausgeführt werden. Wird auch als ETH oder als Symbol Ξ, der griechische Großbuchstabe Xi, geschrieben.

<DocLink to="/eth/">
  Währung für unsere digitale Zukunft
</DocLink>

### Events {#events}

Ermöglicht die Verwendung von [EVM](#evm)-Protokollierungseinrichtungen. [dApps](#dapp) können Ereignisse hören und sie verwenden, um JavaScript-Callbacks in der Benutzeroberfläche zu aktivieren.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Events und Logs
</DocLink>

### Ethereum Virtual Machine (EVM) {#evm}

Eine Stack-basierte virtuelle Maschine, die [Bytecode](#bytecode) ausführt. In Ethereum legt das Ausführungsmodell fest, wie der Systemzustand geändert wird, indem eine Reihe von Bytecode-Anweisungen und ein kleines Tupel von Umgebungsdaten angegeben werden. Dies wird durch ein formales Modell einer virtuellen Zustandsmaschine festgelegt.

<DocLink to="/developers/docs/evm/">
  Ethereum Virtual Machine (EVM)
</DocLink>

### EVM-Assemblysprache {#evm-assembly-language}

Eine für Menschen lesbare Form von EVM-[Bytecode](#bytecode).

<Divider />

## F {#section-f}

### Fallback-Funktion {#fallback-function}

Eine Standardfunktion, die aufgerufen wird, wenn keine Daten vorhanden sind oder ein deklarierter Funktionsname fehlt.

### Faucet {#faucet}

Ein Service, der über einen [Smart Contract](#smart-contract) ausgeführt wird und Geldmittel in Form von kostenlosem Test-Ether, das in einem Testnetz verwendet wird, bereitstellt.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Testnetz-Faucets
</DocLink>

### Finalisierung {#finality}

Finalisierung ist die Garantie, dass sich eine Reihe von Transaktionen vor einer bestimmten Zeit nicht ändern und nicht rückgängig gemacht werden können.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Proof-of-Work-Finalisierung
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Proof-of-Stake-Finalisierung
</DocLink>

### finney {#finney}

Eine Recheneinheit von [Ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### Fork (Abspaltung) {#fork}

Eine Änderung des Protokolls, die die Schaffung einer alternativen Kette oder eine zeitliche Divergenz in zwei potenziellen Blockpfaden während des Minings verursacht.

### Fork-Wahl-Algorithmus {#fork-choice-algorithm}

Der Algorithmus, der verwendet wird, um den Kopf der Blockchain zu identifizieren. Auf der Ausführungsebene wird der Kopf der Kette als derjenige identifiziert, der die größte Gesamtschwierigkeit hinter sich hat. Das bedeutet, dass der eigentliche Kopf der Kette derjenige ist, der die meiste Arbeit erfordert, um ihn zu minen. Auf der Konsensschicht beobachtet der Algorithmus die gesammelten Bestätigungen der Validatoren ([LMD_GHOST](#lmd-ghost)).

### Fraud proof (Betrugssicher) {#fraud-proof}

Ein Sicherheitsmodell für bestimmte [Layer-2](#layer-2)-Lösungen, bei denen zur Geschwindigkeitserhöhung Transaktionen gruppiert [aufgerollt](#rollups) und als einzelne Transaktion an Ethereum übermittelt werden. Sie werden zwar für gültig erachtet, können aber angefochten werden, wenn Betrug vermutet wird. Ein Betrugsnachweis führt dann die Transaktion durch, um festzustellen, ob es zu einem Betrug gekommen ist. Diese Methode erhöht die Anzahl der möglichen Transaktionen bei gleichzeitiger Aufrechterhaltung der Sicherheit. Einige [Rollups](#rollups) verwenden [Gültigkeitsnachweise](#validity-proof).

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Optimistic Rollups
</DocLink>

### Frontier {#frontier}

Die erste Phase der Testentwicklung von Ethereum, die von Juli 2015 bis März 2016 andauerte.

<Divider />

## G {#section-g}

### Gas {#gas}

Ein virtueller Treibstoff, der in Ethereum verwendet wird, um Smart Contracts und deren Berechnungen auszuführen. Die [EVM](#evm) misst den Gasverbrauch und begrenzt den Verbrauch von Rechenressourcen (siehe [Turing complete](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gas und Gebühren
</DocLink>

### Gaslimit {#gas-limit}

Die maximale Menge [Gas](#gas), die eine [Transaktion](#transaction) oder ein [Block](#block) verbrauchen kann.

### Genesis-Block {#genesis-block}

Der allererste Block in einer [Blockchain](#blockchain), verwendet um ein bestimmtes Netzwerk und seine Kryptowährung zu initialisieren.

### Geth {#geth}

Go Ethereum. Eine der prominentesten Implementierungen des Ethereum-Protokolls, geschrieben in Go.

[Lies mehr auf geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Abkürzung für gigawei, eine Stückelung von [Ether](#ether), die üblicherweise für die Darstellung von [Gas](#gas)-Preisen verwendet wird. 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 Ether.

<Divider />

## H {#section-h}

### Hard-Fork {#hard-fork}

Eine permanente Divergenz in der [Blockchain](#blockchain); auch bekannt als hard-forking change. Eine Hard-Fork tritt häufig auf, wenn nicht aktualisierte Nodes Blöcke nicht validieren können, die von aktualisierten Nodes erstellt wurden, welche neueren [Konsensregeln](#consensus-rules) folgen. Nicht zu verwechseln mit einer Fork, einer Softfork, einer Software-Fork oder einer Git-Fork.

### Hash {#hash}

Ein Fingerabdruck mit fester Länge bei variabler Eingabe, erzeugt durch eine Hashfunktion. (Siehe [keccak-256](#keccak-256))

### HD-Wallet {#hd-wallet}

Eine [Wallet](#wallet) mit hierarchischer deterministischer (HD) Schlüsselerstellung und Transferprotokoll.

[Lies mehr auf github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD-Wallet-Seed {#hd-wallet-seed}

Ein Wert, der verwendet wird, um den Master [Private Key](#private-key) und den Master Chain Code für eine HD-[Wallet](#wallet) zu generieren. Der Wallet-Seed kann durch mnemonische Wörter dargestellt werden, die es Menschen einfacher machen, private Schlüssel zu kopieren, zu sichern und wiederherzustellen.

### Homestead {#homestead}

Die zweite Entwicklungsphase von Ethereum; begann im März 2016 mit Block 1.150.000.

<Divider />

## I {#section-i}

### Index {#index}

Eine Netzwerkstruktur, die die Abfrage von Informationen aus der gesamten [Blockchain](#blockchain) optimieren soll, indem sie einen effizienten Pfad zu ihrer Speicherquelle bereitstellt.

### Inter-exchange Client AddressProtocol (ICAP, Austausch-Client-Addressprotokoll) {#icap}

Eine Ethereum-Adressencodierung, die teilweise mit der International Bank Account Number(IBAN)-Codierung kompatibel ist und eine vielseitige, überprüfbare und interoperable Codierung für Ethereum-Adressen bietet. ICAP-Adressen verwenden einen neuen IBAN-Pseudo-Land-Code – XE, der für "eXtended Ethereum" steht, wie er in nicht gerichtlichen Währungen verwendet wird (z. B. XBT, XRP, XCP).

### Ice Age {#ice-age}

Eine [Hard-Fork](#hard-fork) von Ethereum in Block 200.000, um eine exponentielle [Schwierigkeits](#difficulty)erhöhung einzuführen (aka [Schwierigkeitsbombe](#difficulty-bomb)) und dadurch einen Übergang zu [Proof-of-Stake](#pos) zu motivieren.

### Integrierte Entwicklungsumgebung (IDE) {#ide}

Eine Benutzerschnittstelle, die typischerweise einen Code-Editor, Compiler, Laufzeit und Debugger kombiniert.

<DocLink to="/developers/docs/ides/">
  Integrierte Entwicklungsumgebungen
</DocLink>

### Immutable Deployed Code Problem (Unveränderliches Problem von hochgeladenem Code) {#immutable-deployed-code-problem}

Sobald der [Vertrags](#smart-contract)(oder [Bibliotheks](#library))-Code auf Ethereum hochgeladen wurde, wird er unveränderlich. Standardsoftware-Entwicklungspraktiken basieren darauf, mögliche Fehler zu beheben und neue Funktionen hinzuzufügen. Daher stellt dies eine Herausforderung für die Smart-Contract-Entwicklung dar.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Deployment von Smart Contracts
</DocLink>

### Interne Transaktion {#internal-transaction}

Eine [Transaktion](#transaction) wurde von einem [Vertragskonto](#contract-account) an ein anderes Vertragskonto oder eine [EOA](#eoa) gesendet (siehe [Message](#message)).

<Divider />

## K {#section-k}

### Key derivation function (KDF, Schlüsselableitungsfunktion) {#kdf}

Auch bekannt als "Passwort-Stretching-Algorithmus", wird sie von [Keystore](#keystore-file)-Formaten zum Schutz vor Brute-Force-, Wörterbuch- und rainbow-table-Angriffe auf Passphrasen-Verschlüsselung verwendet, indem wiederholt die Passphrase gehasht wird.

<DocLink to="/developers/docs/smart-contracts/security/">
  Smart Contract – Sicherheit
</DocLink>

### keccak-256 {#keccak-256}

Kryptographische [Hash](#hash)-Funktion in Ethereum. Keccak-256 wurde als [SHA](#sha)-3 standardisiert.

### Keystore-Datei {#keystore-file}

Eine JSON-codierte Datei, die einen einzelnen zufällig generierten [privaten Schlüssel](#private-key) enthält, der zur zusätzlichen Sicherheit mit einer Passphrase verschlüsselt ist.

<Divider />

## L {#section-l}

### Layer 2 {#layer-2}

Ein Entwicklungsbereich, der sich darauf konzentriert, Verbesserungen auf das Ethereum-Protokoll aufzusetzen. Diese Verbesserungen beziehen sich auf [Transaktion](#transaction)sgeschwindigkeit, günstigere [Transaktionsgebühren](#transaction-fee)und Transaktionsanonymität.

<DocLink to="/developers/docs/scaling/#layer-2-scaling">
  Layer 2
</DocLink>

### LevelDB {#level-db}

Ein Open-Source-On-Disk-Key-Value-Speicher, der als leichtgewichtige Einzelzweck-[Bibliothek](#library) mit Anbindungen an viele Plattformen implementiert ist.

### Library (Bibliothek) {#library}

Eine spezielle Art von [Smart Contract](#smart-contract) ohne zahlbare Funktionen, ohne Fallbackfunktion und ohne Datenspeicherung. Daher kann sie weder Ether empfangen oder aufbewahren noch Daten speichern. Eine Bibliothek dient als zuvor bereitgestellter Code, den andere Verträge für schreibgeschützte Berechnungen aufrufen können.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Smart-Contract-Bibliotheken
</DocLink>

### Light-Client (Lightweight Client) {#lightweight-client}

Ein Ethereum-Client, der keine lokale Kopie der [Blockchain](#blockchain) speichert oder Blöcke und [Transaktionen validiert](#transaction). Er bietet die Funktionen einer [Wallet](#wallet) und kann Transaktionen erstellen und übertragen.

<Divider />

### LMD_GHOST {#lmd-ghost}

Der [fork-choice-Algorithmus](#Fork-Wahl-Algorithm), der von den Konsens-Clients von Ethereum verwendet wird, um den Kopf der Kette zu identifizieren. LMD-GHOST ist ein Akronym und steht für "Latest Message Driven Greediest Heaviest Observed SubTree", was bedeutet, dass der Kopf der Kette der Block mit der größten Ansammlung von [Attestationen](#attestation) in seiner Geschichte ist.

## M {#section-m}

### Mainnet {#mainnet}

Kurz für "Hauptnetzwerk". Dies ist die öffentliche Ethereum-[Blockchain](#blockchain). Reale ETH, echter Wert und reale Folgen. Auch als Layer 1 bekannt, wenn [Layer-2](#layer-2)-Skalierungslösungen diskutiert werden. (Siehe auch [testnet](#testnet))

### Merkle Patricia Trie {#merkle-patricia-tree}

Eine Datenstruktur, die in Ethereum verwendet wird, um Schlüssel-Wert-Paare effizient zu speichern.

### Nachricht (Message) {#message}

Eine [interne Transaktion](#internal-transaction), die niemals serialisiert wird und nur innerhalb der [EVM](#evm) gesendet wird.

### Message Call (Nachrichtenanruf) {#message-call}

Das Übergeben einer [Nachricht](#message) von einem Konto an ein anderes. Wenn das Zielkonto mit [EVM](#evm)-Code verknüpft ist, wird die virtuelle Maschine mit dem Zustand des Objekts gestartet und die Nachricht wird bearbeitet.

### Metropolis {#metropolis}

Die dritte Entwicklungsphase von Ethereum; begann im Oktober 2017.

### Miner {#miner}

Ein Netzwerknode [](#node), der den gültigen [Proof-of-Work](#pow) für neue Blöcke durch wiederholtes Pass-Hashing (siehe [Ethash](#ethash)) findet.

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Mining
</DocLink>

### Mint {#mint}

Minting ist ein Vorgang, bei dem neue Token erstellt und in Umlauf gebracht werden, damit sie verwendet werden können. Die Erstellung eines neuen Tokens basiert auf einem dezentralisierten Mechanismus ohne Beteiligung einer Zentralbehörde.

<Divider />

## N {#section-n}

### Netzwerk {#network}

Verweist auf das Ethereum-Netzwerk, ein Peer-to-Peer-Netzwerk, das Transaktionen propagiert und an jeden Ethereum-Node (Netzwerkteilnehmer) weiterblockt.

<DocLink to="/developers/docs/networks/">
  Netzwerke
</DocLink>

### Non-fungible Token (NFT) {#nft}

Auch als "deed" bekannt, ist dies ein Token-Standard, der durch den ERC-721-Vorschlag eingeführt wurde. NFTs können getrackt und gehandelt werden, aber jeder Token ist einzigartig und unverwechselbar; sie sind nicht austauschbar wie ETH und [ERC-20 Token](#token-standard). NFTs können das Eigentum an digitalen oder physischen Vermögenswerten repräsentieren.

<DocLink to="/nft/">
  Non-fungible Tokens (NFTs)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Non-Fungible Token Standard
</DocLink>

### Node {#node}

Ein Software-Client, der am Netzwerk teilnimmt.

<DocLink to="/developers/docs/nodes-and-clients/">
  Nodes und Clients
</DocLink>

### Nonce {#nonce}

Ein Wert in der Kryptographie, der nur einmalig verwendet werden kann. Es gibt zwei Arten von Nonce in Ethereum: Eine Konto-Nonce ist ein Transaktionszähler in jedem Konto, die verwendet wird, um Wiederholungsangriffe zu verhindern; eine [Proof-of-Work](#pow)-Nonce ist der zufällige Wert in einem Block, der verwendet wurde, um den [Proof-of-Work](#pow) zu erfüllen.

<Divider />

## O {#section-o}

### ommer(Onkel)-Block {#ommer}

Wenn ein [Miner](#miner) einen gültigen [Block](#block) findet, könnte ein anderer Miner einen Konkurrenzblock veröffentlicht haben, der zuerst der Spitze der Blockchain hinzugefügt wird. Dieser gültige, aber veraltete Block kann von neueren Blöcken als _ommers_ aufgenommen werden und erhält eine Teilblockbelohnung. Der Begriff "ommer" ist der bevorzugte geschlechtsneutrale Begriff für das Geschwister eines Elternblocks, aber er wird auch manchmal als "Onkel" bezeichnet.

### Optimistic Rollup {#optimistic-rollup}

Ein [Rollup](#rollups) von Transaktionen, die [Betrugsnachweise](#fraud-proof) verwenden, um einen erhöhten Transaktionsdurchsatz auf [Layer 2](#layer-2) zu ermöglichen und gleichzeitig die Sicherheit von [Mainnet](#mainnet) (Layer 1) zu nutzen. Anders als [Plasma](#plasma), eine ähnliche Layer-2-Lösung, können Optimistic Rollups komplexere Transaktionstypen handhaben – alles, was in der [EVM](#evm) möglich ist, können auch sie abbilden. Sie haben Latenzprobleme im Vergleich zu [Zero-Knowledge Rollups](#zk-rollups), weil eine Transaktion durch den Betrugsnachweis angefochten werden kann.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Optimistic Rollups
</DocLink>

### Orakel {#oracle}

Ein Orakel ist eine Brücke zwischen der [Blockchain](#blockchain) und der realen Welt. Sie fungieren als On-Chain-[APIs](#api), die nach Informationen abgefragt und in [Smart Contracts](#smart-contract) verwendet werden können.

<DocLink to="/developers/docs/oracles/">
  Orakel
</DocLink>

<Divider />

## P {#section-p}

### Parity {#parity}

Eine der bekanntesten interoperablen Implementierungen der Ethereum-Client-Software.

### Plasma {#plasma}

Eine Off-Chain-Skalierungslösung, die [Betrugsnachweise](#fraud-proof) verwendet, wie [Optimistic Rollups](#optimistic-rollups). Plasma ist auf einfache Transaktionen wie grundlegende Token-Transfers und Swaps beschränkt.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### Privater Schlüssel (Geheimer Schlüssel) {#private-key}

Eine geheime Nummer, die es Nutzern von Ethereum ermöglicht, das Eigentum an einem Konto oder Verträgen durch die Erstellung einer digitalen Signatur nachzuweisen (siehe [öffentlicher Schlüssel](#public-key), [Adresse](#address), [ECDSA](#ecdsa)).

### Proof-of-Stake (PoS) {#pos}

Eine Methode, mit der ein Kryptowährungs-Blockchain-Protokoll einen verteilten [Konsens](#consensus) erreichen soll. PoS bittet Benutzer, das Eigentum einer bestimmten Anzahl von Kryptowährungen (ihr "Anteil" im Netzwerk) nachzuweisen, um an der Validierung von Transaktionen teilnehmen zu können.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Proof-of-Stake
</DocLink>

### Proof-of-Work (PoW) {#pow}

Ein Datenteil (der Nachweis), der eine signifikante Berechnung erfordert, um ihn zu finden. In Ethereum müssen [Miner](#miner) eine numerische Lösung für den [Ethash](#ethash)-Algorithmus finden, der sich an einer netzwerkweiten [Schwierigkeit](#difficulty) orientiert.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Proof-of-Work
</DocLink>

### Öffentlicher Schlüssel (Public Key) {#public-key}

Eine Nummer, abgeleitet über eine Einwegfunktion von einem privaten [Schlüssel](#private-key), die öffentlich zugänglich gemacht werden kann und von jedem verwendet werden kann, um eine digitale Signatur zu überprüfen, die mit dem entsprechenden privaten Schlüssel erstellt wurde.

<Divider />

## R {#section-r}

### Receipt (Beleg) {#receipt}

Von einem Ethereum-Client zurückgegebene Daten, um das Ergebnis einer bestimmten [Transaktion](#transaction) zu repräsentieren, mit einem [Hash](#hash) der Transaktion, dessen [Blocknummer](#block), der verbrauchten Menge [Gas](#gas) und, im Fall des Einsatzes eines [Smart Contracts](#smart-contract), der [Adresse](#address) des Vertrags.

### Re-Entrancy Attack (Wiedereintrittsangriff) {#re-entrancy-attack}

Ein Angriff, der aus einem Angreifer-Smart-Contract besteht, der eine Vertragsfunktion in einem Opfer-Smart-Contract so aufruft, dass das Opfer bei der Ausführung den Angreifervertrag erneut rekursiv aufruft. Dies kann zum Beispiel zum Diebstahl von Geldern führen, indem Teile des Opfervertrags übergangen werden, die den Saldo aktualisieren oder den Auszahlungsbetrag zählen.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Re-entrancy (Wiedereintritt)
</DocLink>

### Reward (Belohnung) {#reward}

Eine Menge Ether, die als Belohnung für den [-Miner](#miner) in jedem neuen Block enthalten ist, der die [Proof-of-Work](#pow)-Lösung gefunden hat.

### Recursive Length Prefix (RLP) {#rlp}

Ein von den Ethereum-Entwicklern entwickelter Codierungsstandard zur Codierung und Serialisierung von Objekten (Datenstrukturen) mit beliebiger Komplexität und Länge.

### Rollups {#rollups}

Eine Art [Layer-2](#layer-2)-Skalierungslösung, die mehrere Transaktionen zusammengefasst und in einer einzigen Transaktion an [die Ethereum-Hauptkette](#mainnet) sendet. Dies ermöglicht Einsparungen bei [Gaskosten](#gas) und erhöht den [Transaktions](#transaction)durchsatz. Es gibt Optimistic und Zero-Knowledge Rollups, die verschiedene Sicherheitsmethoden anwenden, um diese Skalierbarkeitsgewinne anzubieten.

<DocLink to="/developers/docs/scaling/#rollups">
  Rollups
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Die Phase der Ethereum-Entwicklung, die eine Reihe von Skalierungs- und Nachhaltigkeitsverbesserungen einleitete und früher als "Ethereum 2.0" oder "Eth2" bekannt war.

<DocLink to="/upgrades/">
  Ethereum-Upgrades
</DocLink>

### Sicherer Hash-Algorithmus (SHA) {#sha}

Eine Familie kryptographischer Hashfunktionen, die vom National Institute of Standards and Technology (NIST) veröffentlicht wurde.

### Shard / Shard-Kette {#shard}

Eine [Proof-of-Stake](#pos)-Kette, die von der [Beacon Chain](#beacon-chain) koordiniert und von [Validatoren](#validator) gesichert wird. Im Rahmen des Shard-Chain-Upgrades werden dem Netzwerk 64 weitere hinzugefügt. Shard Chains werden einen erhöhten Transaktionsdurchsatz für Ethereum bieten, indem sie zusätzliche Daten für [Layer-2](#layer-2)-Lösungen wie [Optimistic Rollups](#optimistic-rollups) und [ZK-Rollups](#zk-rollups) bereitstellen.

<DocLink to="/upgrades/sharding">
  Shard Chains
</DocLink>

### Sidechain {#sidechain}

Eine Skalierungslösung, die eine separate Kette mit anderen, oft schnelleren [Konsensregeln](#consensus-rules) verwendet. Eine Brücke wird benötigt, um diese Seitenketten mit dem [Mainnet](#mainnet) zu verbinden. [Rollups](#rollups) verwenden ebenfalls Sidechains, aber sie arbeiten stattdessen mit [Mainnet](#mainnet) zusammen.

<DocLink to="/developers/docs/scaling/sidechains/">
  Sidechains
</DocLink>

### Singleton (Einmalig) {#singleton}

Ein Programmierbegriff, der ein Objekt beschreibt, von dem nur eine Instanz existieren kann.

### Slot {#slot}

Eine Zeitperiode (12 Sekunden), in der ein neuer [Beacon Chain](#beacon-chain)- und [Shard](#shard)-Chain-Block von einem [Validator](#validator) im [Proof-of-Stake](#pos)-System vorgeschlagen werden kann. Ein Slot kann leer sein. 32 Slots bilden eine [Epoche](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-Stake
</DocLink>

### Smart Contract {#smart-contract}

Ein Programm, das auf der Ethereum-Rechnerinfrastruktur ausgeführt wird.

<DocLink to="/developers/docs/smart-contracts/">
  Einführung zu Smart Contracts
</DocLink>

### SNARK {#snark}

SNARK steht für "succinct non-interactive argument of knowledge" und ist eine Art [Zero-Knowledge-Nachweis](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Rollups
</DocLink>

### Solidity {#solidity}

Eine prozedurale (imperative) Programmiersprache mit Syntax, die ähnlich wie JavaScript, C++ oder Java ist. Die populärste und am häufigsten verwendete Sprache für Ethereum-[Smart-Contracts](#smart-contract). Erstellt von Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity Inline Assembly {#solidity-inline-assembly}

[EVM](#evm)-Assembly-Sprache in einem [Solidity](#solidity)-Programm. Die Unterstützung von Solidity für Inline-Assembly erleichtert das Schreiben bestimmter Operationen.

### Spurious Dragon {#spurious-dragon}

Eine [Hard-Fork](#hard-fork) der Ethereum-Blockchain, die in Block 2.675.000 aufgetreten ist, um weitere Denial-of-Service-Angriffsvektoren und einen klaren Zustand zu adressieren (siehe [Tangerine Whistle](#tangerine-whistle)). Auch ein Replay-Angriffsschutzmechanismus (siehe [nonce](#nonce)).

### Stablecoin {#stablecoin}

Ein [ERC-20-Token](#token-standard) mit einem Wert, der an den Wert eines anderen Assets gekoppelt ist. Es gibt Stablecoins mit Fiat-Währungen wie Dollar, Edelmetalle wie Gold und andere Kryptowährungen wie Bitcoin.

<DocLink to="/eth/#tokens">
  ETH ist nicht die einzige Kryptowährung auf Ethereum
</DocLink>

### Staking {#staking}

Überweisen einer Menge von [Ether](#ether) (dein Einsatz), um ein Validator zu werden und das [Netzwerk](#network) zu sichern. Ein Validator prüft [Transaktionen](#transaction) und schlägt [Blöcke](#block) unter einem [Proof-of-Stake](#pos)-Konsensmodell vor. Mit dem Staking erhältst du einen wirtschaftlichen Anreiz, im besten Interesse des Netzwerks zu handeln. Du erhältst Belohnungen für die Ausführung deiner [Validator](#validator)-Pflichten, verlierst aber unterschiedliche Mengen an ETH, wenn du dies nicht tust.

<DocLink to="/staking/">
  Stake deine ETH, um Ethereum-Validator zu werden
</DocLink>

### STARK {#stark}

Die Abkürzung steht für "scalable transparent argument of knowledge". Ein STARK ist eine Art [Zero-Knowledge-Nachweis](#zk-nachweis).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Rollups
</DocLink>

### State Channels (Zustandskanäle) {#state-channels}

Eine [Layer-2](#layer-2)-Lösung, bei der ein Kanal zwischen den Teilnehmern eingerichtet wird, in dem sie frei und kostengünstig handeln können. Nur eine [Transaktion](#transaction) zum Einrichten des Kanals und zum Schließen des Kanals wird an das [Mainnet](#mainnet) gesendet. Dies ermöglicht einen sehr hohen Transaktionsdurchsatz, setzt aber die Kenntnis der Teilnehmerzahl im Voraus und das Sperren von Assets voraus.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Zustandskanäle
</DocLink>

### Supermajority (Qualifizierte Mehrheit) {#supermajority}

Die qualifizierte Mehrheit (Supermajority) ist die Bezeichnung für einen Betrag, der 2/3 (66 %) des gesamten eingesetzten Ethers auf der [Beacon Chain](#beacon-chain) übersteigt. Für die [Finalisierung](#finality) von Blöcken auf der Beacon Chain ist eine qualifizierte Mehrheitsentscheidung erforderlich.

### Sync-Komitee {#sync-committee}

Das Sync-Komitee ist eine zufällig ausgewählte Gruppe von [Validatoren](#validator) auf der [Beacon Chain](#beacon-chain), die alle ~27 Stunden aktualisiert wird. Ihr Zweck ist es, gültige Block-Header mit ihrer Unterschrift zu versehen. Das Sync-Komitee ermöglichen es [Light-Clients](#lightweight-client), den Kopf der Blockchain zu verfolgen, ohne auf das gesamte Validator-Set zugreifen zu müssen.

### szabo {#szabo}

Eine Stückelung von [Ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 Ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Eine [Hard-Fork](#hard-fork) der Ethereum-Blockchain, die in Block 2.463.000 aufgetreten ist, um die Berechnung von [Gas](#gas) für bestimmte I/O-intensive Operationen zu ändern und den kumulierten Zustand vor einem Denial-of-Service-Angriff zu beseitigen, der die niedrigen Gaskosten dieser Operationen ausnutzte.

### Testnetz {#testnet}

Kurz für "Testnetzwerk", ein Netzwerk, das dazu dient, das Verhalten des Hauptnetzwerks von Ethereum zu simulieren (siehe [Hauptnetzwerk](#mainnet)).

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Testnetze
</DocLink>

### Token-Standard {#token-standard}

Eingeführt mit dem ERC-20-Vorschlag, bietet dies eine standardisierte [Smart-Contract](#smart-contract)-Struktur für Fungible Token. Token desselben Vertrags können nachverfolgt und gehandelt werden und sind im Gegensatz zu [NFTs](#nft) austauschbar.

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20-Token-Standard
</DocLink>

### Transaktion {#transaction}

Daten, die an die Ethereum-Blockchain übergeben wurden, signiert von einem Ursprungs-[Konto ](#account), und eine bestimmte [Adresse](#address) anvisieren. Die Transaktion enthält Metadaten wie das [Gas-Limit](#gas-limit) für diese Transaktion.

<DocLink to="/developers/docs/transactions/">
  Transaktionen
</DocLink>

### Transaktionsgebühr {#transaction-fee}

Eine Gebühr, die du bezahlen musst, wenn du das Ethereum-Netzwerk nutzen möchtest. Beispiele dafür sind das Senden von Guthaben von deiner [Wallet](#wallet) oder einer [dApp](#dapp)-Interaktion, wie zum Beispiel das Tauschen von Token oder der Kauf eines Kollektivs. Du kannst dir das wie eine Servicegebühr vorstellen. Diese Gebühr wird sich je nach Netzwerkauslastung ändern. Dies liegt daran, dass [Miner](#miner), die Verantwortlichen für die Bearbeitung deinerTransaktion, Transaktionen mit höheren Gebühren voraussichtlich Priorität einräumen werden – so dass Staus den Preis in die Höhe treiben.

Auf technischer Ebene bezieht sich die Transaktionsgebühr auf die Menge [Gas](#gas), die deine Transaktion benötigt.

Die Senkung der Transaktionsgebühren ist derzeit von großem Interesse. Siehe [Layer 2](#layer-2)

### Turing vollständig (Turing complete) {#turing-complete}

Ein nach dem englischen Mathematiker und Informatiker Alan Turing benanntes Konzept. Ein System von Regeln zur Datenmanipulation (wie z. B. eine Programmiersprache oder eine zelluläre Automaton) wird als "Turing complete" oder "computational universal" bezeichnet, wenn es verwendet werden kann, um eine beliebige Turing-Maschine zu simulieren.

<Divider />

## V {#section-v}

### Validator {#validator}

Ein [Node](#node) in einem [Proof-of-Stake](#pos)-System, der für die Speicherung von Daten, die Verarbeitung von Transaktionen und das Hinzufügen neuer Blöcke zur Blockchain verantwortlich ist. Für eine aktive Validator-Software musst du in der Lage sein, Einsätze von 32 ETH zu [staken](#staking).

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Proof-of-Stake
</DocLink>
<DocLink to="/staking/">
  Staking auf Ethereum
</DocLink>

### Validitätsnachweis (Validity proof) {#validity-proof}

Ein Sicherheitsmodell für bestimmte [Layer-2](#layer-2)-Lösungen, bei denen zur Geschwindigkeitserhöhung Transaktionen gruppiert [aufgerollt](/#rollups) und als einzelne Transaktion an Ethereum übermittelt werden. Die Transaktionsberechnung erfolgt außerhalb der Kette und wird dann mit einem Nachweis ihrer Gültigkeit an die Hauptkette übertragen. Diese Methode erhöht die Anzahl der möglichen Transaktionen bei gleichzeitiger Aufrechterhaltung der Sicherheit. Einige [Rollups](#rollups) verwenden [Betrugsnachweise](#fraud-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Rollups
</DocLink>

### Validium {#validium}

Eine Off-Chain-Lösung, die [Gültigkeitsnachweise](#validity-proof) verwendet, um den Transaktionsdurchsatz zu verbessern. Im Gegensatz zu [Zero-Knowledge Rollups](#zk-rollup) werden Validium-Daten nicht auf Layer 1 im [Mainnet](#mainnet) gespeichert.

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Eine Programmiersprache auf hohem Level mit Python-ähnlicher Syntax. Ziel ist es, näher an eine rein funktionale Sprache zu kommen. Erstellt von Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### Wallet {#wallet}

Software, die [private Schlüssel](#private-key) hält. Wird verwendet, um auf Ethereum-[Konten](#account) zuzugreifen und diese zu steuern und mit [Smart Contracts](#smart-contract) zu interagieren. Schlüssel müssen nicht in einer Wallet gespeichert werden und können stattdessen aus Offline-Speicher (z. B. Speicherkarte oder Papier) abgerufen werden, um die Sicherheit zu verbessern. Trotz des Namens speichern Wallets niemals die tatsächlichen Münzen oder Token.

<DocLink to="/wallets/">
  Ethereum-Wallets
</DocLink>

### Web3 {#web3}

Die dritte Version des Webs. Erstmals vorgeschlagen von Dr. Gavin Wood, stellt Web3 eine neue Vision und den Fokus für Webanwendungen dar – von zentral geführten und verwalteten Anwendungen zu Anwendungen, die auf dezentralen Protokollen basieren (siehe [dApp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 vs. Web3
</DocLink>

### Wei {#wei}

Die kleinste Stückelung von [Ether](#ether). 10<sup>18</sup> wei = 1 Ether.

<Divider />

## Z {#section-z}

### Zero Address (Null-Adresse) {#zero-address}

Eine spezielle Ethereum-Adresse, die nur aus Nullen besteht und als Zieladresse von einer [ContVertragserstellungs-Transaktion](#contract-creation-transaction) spezifiziert wird.

### Zero-Knowledge-Nachweis {#zk-proof}

Ein Zero-Knowledge-Nachweis ist eine kryptographische Methode, die es einer Person ermöglicht, zu beweisen, dass eine Aussage wahr ist, ohne zusätzliche Informationen zu übermitteln.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Rollups
</DocLink>

### Zero-Knowledge Rollup {#zk-rollup}

Ein [Rollup](#rollups) von Transaktionen, die [Gültigkeitsnachweise](#validity-proof) verwenden, um einen erhöhten [Layer-2](#layer-2)-Transaktionsdurchsatz zu bieten und gleichzeitig die Sicherheit von [Mainnet](#mainnet) (Layer 1) zu nutzen. Obwohl sie komplexe Transaktionstypen wie [Optimistische Rollups](#optimistic-rollups) nicht bewältigen können, haben sie keine Latenzprobleme, da Transaktionen nachweislich gültig sind, wenn sie abgeschickt werden.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-Knowledge Rollups
</DocLink>

<Divider />

## Quellen {#sources}

_Teilweise bereitgestellt von [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) von [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) unter CC-BY-SA_

<Divider />

## Trage zu dieser Seite bei {#contribute-to-this-page}

Haben wir etwas vergessen? Ist etwas nicht korrekt? Hilf uns, indem du zu diesem Glossar auf GitHub beiträgst!

[Erfahre mehr darüber, wie du einen Beitrag leisten kannst](/contributing/adding-glossary-terms)
