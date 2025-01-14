---
title: Block-Explorer
description: Eine Einführung in Block-Explorer, Ihr Portal in die Welt der Blockchain-Daten – dort können Sie Informationen über Transaktionen, Konten, Verträge und mehr abfragen
lang: de
sidebarDepth: 3
---

Block-Explorer sind das Portal zu den Daten von Ethereum. Sie können sie nutzen, um Echtzeitdaten zu Blöcken, Transaktionen, Validatoren, Konten und anderen On-Chain-Aktivitäten einzusehen.

## Voraussetzungen {#prerequisites}

Sie sollten das Basiskonzept von Ethereum verstehen, damit Sie die Daten, die Sie über einen Block-Explorer erhalten, sinnvoll nutzen können. Beginnen Sie mit [einer Einführung in Ethereum](/developers/docs/intro-to-ethereum/).

## Dienste {#services}

- [Etherscan](https://etherscan.io/) -_Auch in Chinesisch, Koreanisch, Russisch und Japanisch verfügbar_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_Auch in Spanisch, Französisch, Italienisch, Niederländisch, Portugiesisch, Russisch, Chinesisch und Farsi verfügbar_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethernow](https://www.ethernow.xyz/)
- [Ethplorer](https://ethplorer.io/) -_Auch in Chinesisch, Spanisch, Französisch, Türkisch, Russisch, Koreanisch und Vietnamesisch verfügbar_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Rantom](https://rantom.app/)

## Open-Source-Werkzeuge {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Daten {#data}

Ethereum ist von Grund auf transparent und damit ist auch alles überprüfbar. Block-Explorer bieten eine Oberfläche, um diese Informationen zu erhalten. Das gilt sowohl für das Ethereum-Netzwerk als auch für die Testnets, wenn Sie diese Daten benötigen. Die Daten werden in Ausführungsdaten und Konsensdaten unterteilt. Die Ausführungsdaten beziehen sich auf die Transaktionen, die in einem bestimmten Block ausgeführt wurden. Die Konsensdaten beziehen sich auf die Blöcke selbst und die Validatoren, die sie vorgeschlagen haben.

Im Folgenden finden Sie eine Zusammenfassung der Arten von Daten, die Sie über einem Block-Explorer erhalten können:

### Ausführungsdaten {#execution-data}

Neue Blöcke werden alle 12 Sekunden zu Ethereum hinzugefügt (es sei denn, ein Block-Proposer verpasst seinen Zug), so dass den Block-Explorern ein nahezu konstanter Datenstrom hinzugefügt wird. Blöcke enthalten viele wichtige Daten, die Sie vielleicht hilfreich finden:

**Standarddaten**

- Blockhöhe - Die Blocknummer und Länge der Blockchain (in Blöcken) bei der Erstellung des aktuellen Blocks
- Zeitstempel - Die Zeit, zu der ein Block vorgeschlagen wurde
- Transaktionen - Die Anzahl der im Block enthaltenen Transaktionen
- Gebührenempfänger - Die Adresse, die Gas-Trinkgelder aus Transaktionen erhalten hat
- Block-Prämie - Der ETH-Betrag, der dem Validator, der den Block vorgeschlagen hat, zugesprochen wurde
- Größe - Die Größe der Daten innerhalb des Blocks (gemessen in Bytes)
- Verbrauchtes Gas - Gesamte Gaseinheiten, die von den Transaktionen im Block verbraucht wurden
- Gaslimit - Die Gaslimits, die von den Transaktionen im Block gesetzt wurden
- Grundgebühr pro Gas - Der Mindestmultiplikator, der erforderlich ist, damit eine Transaktion in einen Block aufgenommen werden kann
- Verbrannte Gebühren - Wie viel ETH in einem Block verbrannt wird
- Extradaten – alle zusätzlichen Daten, die der Ersteller im Block eingefügt hat

**Erweiterte Daten**

- Hash - Der kryptografische Hash, der den Kopf eines Blocks darstellt (der eindeutige Identifier des Blocks)
- Parent Hash - Der Hash des Blocks, der vor dem aktuellen Block kam
- StateRoot - Der Wurzelhash des Merkle-Baums, der den gesamten Zustand des Systems speichert

### Ressourcen {#gas}

Block-Explorer geben nicht nur Informationen zum Ressourcenverbrauch in Transkationen und Blöcken an, manche zeigen auch Informationen zu den aktuell im Netzwerk gültigen Ressourcenpreisen an. Das hilft Ihnen dabei, die Nutzung des Netzwerks zu verstehen, sichere Transaktionen auszuführen und nicht mehr Ressourcen zu beanspruchen als notwendig. Suchen Sie nach APIs, die Ihnen helfen können, diese Informationen in die Produktschnittstelle zu integrieren. Ressourcenspezifische Datenabdeckungen:

- Geschätzte Gaseinheiten, die für eine sichere, aber langsame Transaktion benötigt werden (+ geschätzter Preis und Dauer)
- Geschätzte Gaseinheiten, die für eine durchschnittliche Transaktion benötigt werden (+ geschätzter Preis und Dauer)
- Geschätzte Gaseinheiten, die für eine schnelle Transaktion benötigt werden (+ geschätzter Preis und Dauer)
- Durchschnittliche Bestätigungszeit auf Basis des Gaspreises
- Verträge, die Gas verbrauchen - mit anderen Worten: beliebte Produkte, die im Netz viel genutzt werden
- Konten, die Gas ausgeben - mit anderen Worten, häufige Nutzer des Netzes

### Transaktionen {#transactions}

Block-Explorer werden häufig eingesetzt, um den Status der Transaktionen abzurufen. Das liegt an dem Detailgrad, den sie bieten und der zusätzliche Sicherheit bietet. Die Transaktionsdetails enthalten Folgendes:

**Standarddaten**

- Transaktionshash - Ein Hash, der bei der Übermittlung der Transaktion generiert wird
- Status - Ein Hinweis darauf, ob die Transaktion ausstehend, fehlgeschlagen oder erfolgreich ist
- Block - Der Block, in dem die Transaktion enthalten ist
- Zeitstempel – der Zeitpunkt, zu dem eine Transaktion in einen von einem Validator vorgeschlagenen Block aufgenommen wurde
- From - Die Adresse des Kontos, das die Transaktion übermittelt hat
- To - Die Adresse des Empfängers oder des Smart Contracts, mit dem die Transaktion interagiert
- Übertragene Token - Eine Liste der Token, die als Teil der Transaktion übertragen wurden
- Wert - Der Gesamtwert der übertragenen ETH
- Transaktionsgebühr – an den Validator gezahlte Summe, um die Transaktion zu verarbeiten (Berechnung: Gaspreis \* Gasverbrauch)

**Erweiterte Daten**

- Gaslimit - Die maximale Anzahl von Gaseinheiten, die diese Transaktion verbrauchen kann
- Verbrauchtes Gas - Die tatsächliche Menge an Gaseinheiten, die die Transaktion verbraucht hat
- Gaspreis - Der festgelegte Preis pro Gaseinheit
- Nonce - Die Transaktionsnummer für die Absenderadresse`"from"` (denken Sie daran, dass diese bei 0 beginnt, so dass eine Nonce von `100` die 101ste Transaktion wäre, die von diesem Konto übermittelt wurde)
- Eingabedaten - Alle zusätzlichen Informationen, die für die Transaktion erforderlich sind

### Konten {#accounts}

Es gibt viele Daten, auf die Sie über ein Konto zugreifen können. Daher wird häufig empfohlen, mehrere Konten zu verwenden, damit Ihr Vermögen und Ihre Assets nicht so leicht nachverfolgt werden können. Außerdem werden weitere Lösungen entwickelt, um Transaktionen und Kontoaktivitäten sicherer und privater zu gestalten. Im Folgenden finden Sie die Daten, die für Konten verfügbar sind:

**Benutzerkonten**

- Account-Adresse - Die öffentliche Adresse, an die Sie Geld senden können
- ETH-Guthaben - Der ETH-Betrag, der mit diesem Konto verbunden ist
- Total Eth value - Der Wert der ETH
- Token - Dem Konto zugeordnete Token und ihr Wert
- Transaktionshistorie - Eine Liste aller Transaktionen, bei denen dieses Konto entweder der Absender oder der Empfänger war

**Intelligente Verträge**

Smart-Contract-Konten verfügen über die gleichen Daten wie ein Benutzerkonto, doch einige Block-Explorer zeigen zusätzlich auch einige Codeinformationen an. Beispiele:

- Vertragsersteller - Die Adresse, die den Vertrag im Mainnet bereitgestellt hat
- Erstellungstransaktion - Die Transaktion, die die Bereitstellung im Mainnet beinhaltete
- Quellcode - Der Solidity- oder Vyper-Code des Smart Contracts
- Vertrags-ABI - Die „Application Binary Interface“ - die Aufrufe, die der Vertrag tätigt, und die empfangenen Daten
- Vertragserstellungscode - Der kompilierte Bytecode des Smart Contracts – wird erstellt, wenn Sie einen in Solidity oder Vyper usw. geschriebenen Smart Contract kompilieren
- Vertragsereignisse - Eine Historie der im Smart Contract aufgerufenen Methoden – im Grunde eine Möglichkeit zu sehen, wie der Vertrag verwendet wird und wie oft

### Token {#tokens}

Token sind eine Art von Vertrag und enthalten ähnliche Daten wie ein Smart Contract. Doch dadurch, dass sie einen Wert haben und gehandelt werden können, weisen sie zusätzliche Datenpunkte auf:

- Typ - Ob es sich um einen ERC-20, ERC-721 oder einen anderen Token-Standard handelt
- Preis - Wenn es sich um einen ERC-20 handelt, haben sie einen aktuellen Marktwert
- Marktkapitalisierung - Wenn es sich um einen ERC-20 handelt, haben sie eine Marktkapitalisierung (berechnet durch Preis\*Gesamtangebot)
- Gesamtangebot - Die Anzahl der im Umlauf befindlichen Token
- Inhaber - Die Anzahl der Adressen, die den Token halten
- Transfers - Die Anzahl der Übertragungen des Tokens zwischen Konten
- Transaktionshistorie - Eine Historie aller Transaktionen, die den Token betreffen
- Vertragsadresse - Die Adresse des Tokens, die im Mainnet bereitgestellt wurde
- Nachkommastellen - ERC-20-Token sind teilbar und haben Nachkommastellen

### Netzwerk {#network}

Einige Blockdaten geben Aufschluss über den Zustand von Ethereum im Allgemeinen.

- Gesamttransaktionen - Die Anzahl der Transaktionen seit dem Start von Ethereum
- Transaktionen pro Sekunde - Die Anzahl der Transaktionen, die innerhalb einer Sekunde verarbeitet werden können
- ETH-Preis - Die aktuelle Bewertung von 1 ETH
- Gesamtes ETH-Angebot - Anzahl der im Umlauf befindlichen ETH - neue ETH werden bei der Erstellung jedes Blocks in Form von Block-Prämien geschaffen
- Marktkapitalisierung - Berechnung des Preises\*Angebot

## Daten der Konsensebene {#consensus-layer-data}

### Epoche {#epoch}

Aus Sicherheitsgründen werden am Ende jeder Epoche (alle 6,4 Minuten) zufällig ausgewählte Gruppen von Validatoren gebildet. Epochendaten enthalten:

- Epochennummer
- Abgeschlossener Status - Ob die Epoche abgeschlossen wurde (Ja/Nein)
- Zeit - Die Zeit, zu der die Epoche endete
- Attestierungen - Die Anzahl der Attestierungen in der Epoche (Stimmen für Blöcke innerhalb von Slots)
- Einzahlungen - Die Anzahl der ETH-Einzahlungen, die in der Epoche enthalten sind (Validatoren müssen ETH einsetzen, um Validatoren zu werden)
- Slashings - Anzahl der Strafen, die an die Proposer von Blöcken oder an die Attestierer vergeben wurden
- Abstimmungsbeteiligung - Die Menge an eingesetzter ETH, die zur Attestierung von Blöcken verwendet wurde
- Validatoren - Anzahl der aktiven Validatoren für die Epoche
- Durchschnittliches Guthaben der Validatoren - Durchschnittliches Guthaben der aktiven Validatoren
- Slots - Anzahl der in der Epoche enthaltenen Slots (Slots beinhalten einen gültigen Block)

### Slot {#slot}

Slots sind Möglichkeiten für die Blockerstellung. Folgende Daten sind zu Slots verfügbar:

- Epoche - Die Epoche, in der der Slot gültig ist
- Slot-Nummer
- Status - Der Status des Slots (Vorgeschlagen/Fehlgeschlagen)
- Zeit - Zeitstempel des Slots
- Proposer - Der Validierer, der den Block für den Slot vorgeschlagen hat
- Blockwurzel - Die Hash-Tree-Wurzel des Beacon-Blocks
- Parent Root - Der Hash-Wert des vorhergehenden Blocks
- Statuswurzel - Die Hash-Tree-Wurzel des BeaconState
- Signature
- Randao Reveal
- Graffiti - Ein Block-Proposer kann seinem Block-Vorschlag eine 32 Byte lange Nachricht beifügen
- Ausführungsdaten
  - Block-Hash
  - Anzahl der Einzahlungen
  - Einzahlungswurzel
- Attestierungen - Anzahl der Attestierungen für den Block in diesem Slot
- Einzahlungen - Anzahl der Einzahlungen in diesem Slot
- Freiwillige Austritte - Anzahl der Validierer, die während des Slots ausgeschieden sind
- Slashings - Anzahl der Strafen, die an die Proposer von Blöcken oder an die Attestierer vergeben wurden
- Abstimmungen - Die Validatoren, die für den Block in diesem Slot gestimmt haben

### Blöcke {#blocks-1}

Proof-of-Stake unterteilt die Zeit in Slots und Epochen. Damit gibt es neue Daten:

- Proposer - Der Validator, der algorithmisch ausgewählt wurde, um den neuen Block vorzuschlagen
- Epoche - Die Epoche, in der der Block vorgeschlagen wurde
- Slot - Der Slot, in dem der Block vorgeschlagen wurde
- Attestierungen - Die Anzahl der im Slot enthaltenen Attestierungen - Attestierungen sind wie Stimmen, die anzeigen, dass der Block bereit ist, in die Beacon Chain aufgenommen zu werden

### Validatoren {#validators}

Validatoren sind dafür verantwortlich, Blöcke vorzuschlagen und sie innerhalb der Slots zu bestätigen.

- Validator-Nummer - Eindeutige Nummer, die den Validator repräsentiert
- Aktueller Kontostand - Der Kontostand des Validators einschließlich der Prämien
- Effektives Guthaben - Das Guthaben des Validators, das für Staking verwendet wird
- Einkommen - Die Prämien oder Strafen, die der Validator erhalten hat
- Status - Ob der Validator gerade online und aktiv ist oder nicht
- Attestierungseffektivität - Die durchschnittliche Zeit, die es dauert, bis die Attestierungen des Validators in die Chain aufgenommen werden
- Berechtigung zur Aktivierung - Datum (und Epoche), an dem der Validator für die Validierung verfügbar wurde
- Aktiv seit - Datum (und Epoche), an dem der Validator aktiv wurde
- Vorgeschlagene Blöcke - Der Block, den der Validator vorgeschlagen hat
- Attestierungen - Die Attestierungen, die der Validator vorgelegt hat
- Einzahlungen - Die Absenderadresse, der Transaktionshash, die Blocknummer, der Zeitstempel, der Betrag und der Status der vom Validator getätigten Staking-Einzahlungen

### Beglaubigungen {#attestations}

Attestierungen sind „Ja“-Stimmen für die Aufnahme von Blöcken in die Chain. Ihre Daten beziehen sich auf eine Aufzeichnung der Attestierung und der bestätigenden Validatoren.

- Slot - Der Slot, in dem die Attestierung stattgefunden hat
- Komitee-Index - Der Index des Komitees für den gegebenen Slot
- Aggregationsbits - Stellt die aggregierte Attestierung aller an der Attestierung beteiligten Validatoren dar
- Validatoren - Die Validatoren, die Attestierungen bereitgestellt haben
- Wurzel des Beacon-Blocks - Zeigt auf den Block, für den die Validatoren attestieren
- Quelle - Zeigt auf die letzte geprüfte Epoche
- Target - Zeigt auf die letzte Epochengrenze
- Signature

### Netzwerk {#network-1}

Die Daten der obersten Ebene der Konsensebene umfassen Folgendes:

- Aktuelle Epoche
- Aktueller Slot
- Aktive Validatoren - Anzahl der aktiven Validatoren
- Ausstehende Validatoren - Anzahl der Validatoren, die darauf warten, aktiv zu werden
- Staked ETH - Höhe der im Netzwerk gestakten ETH
- Durchschnittliches Guthaben - Durchschnittliches ETH-Guthaben der Validatoren

## Block Explorer {#block-explorers}

- [Etherscan](https://etherscan.io/) - ein Block-Explorer, mit dem Sie Daten für Ethereum Mainnet und Goerli Testnetz abrufen können
- [3xpl](https://3xpl.com/ethereum) – ein werbefreier Open-Source-Ethereum-Explorer, der den Download seiner Datensätze erlaubt
- [Beaconcha.in](https://beaconcha.in/) - ein Open-Source-Block-Explorer für Ethereum Mainnet und Goerli Testnetz
- [Blockchair](https://blockchair.com/ethereum) – Der privateste Ethereum-Explorer. Auch zum Sortieren und Filtern von (Mempool-) Daten
- [Etherchain](https://www.etherchain.org/) - Ein Block-Explorer für das Ethereum Mainnet
- [Ethplorer](https://ethplorer.io/) - ein Block-Explorer mit Fokus auf Token für das Ethereum Mainnet und das Kovan Testnetz
- [Rantom](https://rantom.app/) - Ein krypto-freundlicher Open-Source-Dienst, der in seine dezentrale Finanzplattform (DeFi)& integriert ist Visualisierung des Transaktionsvolumens von NFTs für einen detaillierten Überblick
- [Ethernow](https://www.ethernow.xyz/) – ein Echtzeit-Transaktions-Explorer, der es ermöglicht, die Pre-Chain-Ebene des Ethereum-Mainnets einzusehen

## Weiterführende Informationen {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Themen {#related-topics}

- [Transaktionen](/developers/docs/transactions/)
- [Konten](/developers/docs/accounts/)
- [Netzwerke](/developers/docs/networks/)
