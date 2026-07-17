---
title: Block-Explorer
description: "Eine Einführung in Block-Explorer, Ihr Portal in die Welt der Blockchain-Daten, wo Sie Informationen über Transaktionen, Konten, Verträge und mehr abfragen können."
lang: de
sidebarDepth: 3
---

Block-Explorer sind Ihr Portal zu den Daten von Ethereum. Sie können sie nutzen, um Echtzeitdaten zu Blöcken, Transaktionen, Validatoren, Konten und anderen Onchain-Aktivitäten einzusehen.

## Voraussetzungen {#prerequisites}

Sie sollten die grundlegenden Konzepte von Ethereum verstehen, damit Sie die Daten, die Ihnen ein Block-Explorer liefert, nachvollziehen können. Beginnen Sie mit [einer Einführung in Ethereum](/developers/docs/intro-to-ethereum/).

## Open-Source-Tools {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) – Ein werbefreier Ethereum-Explorer, der das Herunterladen seiner Datensätze ermöglicht (Open-Core: Kernmodule sind Open Source)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Dienste {#services}

- [Blockchair](https://blockchair.com/ethereum) – Privater Ethereum-Explorer. Auch zum Sortieren und Filtern von (Mempool-)Daten. Verfügbar auf Spanisch, Französisch, Italienisch, Niederländisch, Portugiesisch, Russisch, Chinesisch und Farsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) – Auch auf Chinesisch, Koreanisch, Russisch und Japanisch verfügbar
- [Ethplorer](https://ethplorer.io/) – Ein Block-Explorer mit Fokus auf Token. Auch auf Chinesisch, Spanisch, Französisch, Türkisch, Russisch, Koreanisch und Vietnamesisch verfügbar
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Daten {#data}

Ethereum ist von Grund auf transparent, sodass alles verifizierbar ist. Block-Explorer bieten eine Schnittstelle, um diese Informationen abzurufen. Dies gilt sowohl für das Ethereum-Hauptnetzwerk (Mainnet) als auch für die Testnets, falls Sie diese Daten benötigen. Die Daten werden in Ausführungsdaten und Konsensdaten unterteilt. Die Ausführungsdaten beziehen sich auf die Transaktionen, die in einem bestimmten Block ausgeführt wurden. Die Konsensdaten beziehen sich auf die Blöcke selbst und die Validatoren, die sie vorgeschlagen haben.

Hier ist eine Zusammenfassung der Arten von Daten, die Sie von einem Block-Explorer erhalten können.

### Ausführungsdaten {#execution-data}

Neue Blöcke werden Ethereum alle 12 Sekunden hinzugefügt (es sei denn, ein Block-Proposer verpasst seinen Zug), sodass ein nahezu konstanter Datenstrom zu den Block-Explorern hinzugefügt wird. Blöcke enthalten viele wichtige Daten, die Sie nützlich finden könnten:

**Standarddaten**

- Blockhöhe – Die Blocknummer und Länge der Blockchain (in Blöcken) bei der Erstellung des aktuellen Blocks
- Zeitstempel – Die Zeit, zu der ein Block vorgeschlagen wurde
- Transaktionen – Die Anzahl der im Block enthaltenen Transaktionen
- Gebührenempfänger – Die Adresse, die die Gasgebühren-Trinkgelder aus Transaktionen erhalten hat
- Blockbelohnung – Die Menge an ETH, die dem Validator zugesprochen wird, der den Block vorgeschlagen hat
- Größe – Die Größe der Daten innerhalb des Blocks (gemessen in Bytes)
- Verwendetes Gas – Die gesamten Gaseinheiten, die von den Transaktionen im Block verbraucht wurden
- Gaslimit – Die gesamten Gaslimits, die von den Transaktionen im Block festgelegt wurden
- Grundgebühr pro Gas – Der minimale Multiplikator, der erforderlich ist, damit eine Transaktion in einen Block aufgenommen wird
- Verbrannte Gebühren – Wie viel ETH im Block verbrannt wird
- Zusätzliche Daten – Jegliche zusätzlichen Daten, die der Ersteller in den Block aufgenommen hat

**Erweiterte Daten**

- Hash – Der kryptografische Hash, der den Block-Header repräsentiert (der eindeutige Identifikator des Blocks)
- Parent-Hash – Der Hash des Blocks, der vor dem aktuellen Block kam
- StateRoot – Der Root-Hash des Merkle-Tries, der den gesamten Zustand des Systems speichert

### Gas {#gas}

Block-Explorer liefern Ihnen nicht nur Daten über den Gasverbrauch in Transaktionen und Blöcken, sondern einige geben Ihnen auch Informationen zu den aktuellen Gaspreisen des Netzwerks. Dies hilft Ihnen, die Netzwerkauslastung zu verstehen, sichere Transaktionen einzureichen und nicht zu viel für Gas auszugeben. Halten Sie Ausschau nach APIs, die Ihnen helfen können, diese Informationen in die Benutzeroberfläche Ihres Produkts zu integrieren. Gasspezifische Daten umfassen:

- Geschätzte Gaseinheiten, die für eine sichere, aber langsame Transaktion benötigt werden (+ geschätzter Preis und Dauer)
- Geschätzte Gaseinheiten, die für eine durchschnittliche Transaktion benötigt werden (+ geschätzter Preis und Dauer)
- Geschätzte Gaseinheiten, die für eine schnelle Transaktion benötigt werden (+ geschätzter Preis und Dauer)
- Durchschnittliche Bestätigungszeit basierend auf dem Gaspreis
- Verträge, die Gas verbrauchen – mit anderen Worten, beliebte Produkte, die im Netzwerk stark genutzt werden
- Konten, die Gas ausgeben – mit anderen Worten, häufige Netzwerknutzer

### Transaktionen {#transactions}

Block-Explorer sind zu einem gängigen Ort geworden, an dem Menschen den Fortschritt ihrer Transaktionen verfolgen. Das liegt daran, dass der Detaillierungsgrad, den Sie erhalten können, zusätzliche Sicherheit bietet. Transaktionsdaten umfassen:

**Standarddaten**

- Transaktions-Hash – Ein Hash, der generiert wird, wenn die Transaktion eingereicht wird
- Status – Ein Hinweis darauf, ob die Transaktion ausstehend, fehlgeschlagen oder erfolgreich ist
- Block – Der Block, in den die Transaktion aufgenommen wurde
- Zeitstempel – Die Zeit, zu der eine Transaktion in einen von einem Validator vorgeschlagenen Block aufgenommen wurde
- Von – Die Adresse des Kontos, das die Transaktion eingereicht hat
- An – Die Adresse des Empfängers oder Smart Contracts, mit dem die Transaktion interagiert
- Übertragene Token – Eine Liste von Token, die als Teil der Transaktion übertragen wurden
- Wert – Der gesamte ETH-Wert, der übertragen wird
- Transaktionsgebühr – Der Betrag, der an den Validator gezahlt wird, um die Transaktion zu verarbeiten (berechnet durch Gaspreis\*verwendetes Gas)

**Erweiterte Daten**

- Gaslimit – Die maximale Anzahl an Gaseinheiten, die diese Transaktion verbrauchen kann
- Verwendetes Gas – Die tatsächliche Menge an Gaseinheiten, die die Transaktion verbraucht hat
- Gaspreis – Der festgelegte Preis pro Gaseinheit
- Nonce – Die Transaktionsnummer für die Adresse `from` (denken Sie daran, dass dies bei 0 beginnt, sodass eine Nonce von `100` tatsächlich die 101. Transaktion wäre, die von diesem Konto eingereicht wurde)
- Eingabedaten – Jegliche zusätzlichen Informationen, die von der Transaktion benötigt werden

### Konten {#accounts}

Es gibt viele Daten, auf die Sie über ein Konto zugreifen können. Aus diesem Grund wird oft empfohlen, mehrere Konten zu verwenden, damit Ihre Vermögenswerte und Werte nicht leicht nachverfolgt werden können. Es werden auch einige Lösungen entwickelt, um Transaktionen und Kontoaktivitäten privater zu gestalten. Aber hier sind die Daten, die für Konten verfügbar sind:

**Benutzerkonten**

- Kontoadresse – Die öffentliche Adresse, an die Sie Gelder senden können
- ETH-Guthaben – Die Menge an ETH, die mit diesem Konto verknüpft ist
- Gesamter ETH-Wert – Der Wert der ETH
- Token – Die mit dem Konto verknüpften Token und deren Wert
- Transaktionsverlauf – Eine Liste aller Transaktionen, bei denen dieses Konto entweder der Sender oder der Empfänger war

**Smart Contracts**

Smart-Contract-Konten verfügen über alle Daten, die auch ein Benutzerkonto hat, aber einige Block-Explorer zeigen sogar einige Code-Informationen an. Beispiele hierfür sind:

- Vertragsersteller – Die Adresse, die den Vertrag im Mainnet bereitgestellt hat
- Erstellungstransaktion – Die Transaktion, die die Bereitstellung im Mainnet beinhaltete
- Quellcode – Der Solidity- oder Vyper-Code des Smart Contracts
- Vertrags-ABI – Das Application Binary Interface des Vertrags – die Aufrufe, die der Vertrag tätigt, und die empfangenen Daten
- Vertragserstellungscode – Der kompilierte Bytecode des Smart Contracts – erstellt, wenn Sie einen in Solidity oder Vyper usw. geschriebenen Smart Contract kompilieren.
- Vertragsereignisse – Ein Verlauf der im Smart Contract aufgerufenen Methoden – im Grunde eine Möglichkeit zu sehen, wie der Vertrag genutzt wird und wie oft

### Token {#tokens}

Token sind eine Art von Vertrag, daher weisen sie ähnliche Daten wie ein Smart Contract auf. Da sie jedoch einen Wert haben und gehandelt werden können, verfügen sie über zusätzliche Datenpunkte:

- Typ – Ob es sich um einen ERC-20, ERC-721 oder einen anderen Token-Standard handelt
- Preis – Wenn es sich um einen ERC-20 handelt, haben sie einen aktuellen Marktwert
- Marktkapitalisierung – Wenn es sich um einen ERC-20 handelt, haben sie eine Marktkapitalisierung (berechnet durch Preis\*Gesamtangebot)
- Gesamtangebot – Die Anzahl der im Umlauf befindlichen Token
- Inhaber – Die Anzahl der Adressen, die den Token halten
- Übertragungen – Die Anzahl der Male, die der Token zwischen Konten übertragen wurde
- Transaktionsverlauf – Ein Verlauf aller Transaktionen, die den Token beinhalten
- Vertragsadresse – Die Adresse des Tokens, der im Mainnet bereitgestellt wurde
- Dezimalstellen – ERC-20-Token sind teilbar und haben Dezimalstellen

### Netzwerk {#network}

Einige Blockdaten befassen sich ganzheitlicher mit der Gesundheit von Ethereum.

- Gesamte Transaktionen – Die Anzahl der Transaktionen seit der Erstellung von Ethereum
- Transaktionen pro Sekunde – Die Anzahl der Transaktionen, die innerhalb einer Sekunde verarbeitet werden können
- ETH-Preis – Die aktuelle Bewertung von 1 ETH
- Gesamtes ETH-Angebot – Anzahl der im Umlauf befindlichen ETH – denken Sie daran, dass neue ETH mit der Erstellung jedes Blocks in Form von Blockbelohnungen geschaffen werden
- Marktkapitalisierung – Berechnung von Preis\*Angebot

## Daten der Konsensschicht {#consensus-layer-data}

### Epoche {#epoch}

Aus Sicherheitsgründen werden am Ende jeder Epoche (alle 6,4 Minuten) randomisierte Komitees von Validatoren gebildet. Epochendaten umfassen:

- Epochennummer
- Endgültiger Status – Ob die Epoche endgültig ist (Ja/Nein)
- Zeit – Die Zeit, zu der die Epoche endete
- Attestierungen – Die Anzahl der Attestierungen in der Epoche (Stimmen für Blöcke innerhalb von Slots)
- Einlagen – Die Anzahl der in der Epoche enthaltenen ETH-Einlagen (Validatoren müssen ETH staken, um Validatoren zu werden)
- Slashings – Anzahl der Strafen, die an Proposer von Blöcken oder Attestierer vergeben wurden
- Wahlbeteiligung – Die Menge an gestakten ETH, die zur Attestierung von Blöcken verwendet wurde
- Validatoren – Anzahl der für die Epoche aktiven Validatoren
- Durchschnittliches Validator-Guthaben – Durchschnittliches Guthaben für aktive Validatoren
- Slots – Anzahl der in der Epoche enthaltenen Slots (Slots enthalten einen gültigen Block)

### Slot {#slot}

Slots sind Gelegenheiten zur Blockerstellung. Die für jeden Slot verfügbaren Daten umfassen:

- Epoche – Die Epoche, in der der Slot gültig ist
- Slot-Nummer
- Status – Der Status des Slots (Vorgeschlagen/Verpasst)
- Zeit – Der Zeitstempel des Slots
- Proposer – Der Validator, der den Block für den Slot vorgeschlagen hat
- Block-Root – Die Hash-Tree-Root des Beacon-Blocks
- Parent-Root – Der Hash des vorherigen Blocks
- State-Root – Die Hash-Tree-Root des BeaconState
- Signatur
- RANDAO-Reveal
- Graffiti – Ein Block-Proposer kann eine 32 Byte lange Nachricht in seinen Block-Vorschlag aufnehmen
- Ausführungsdaten
  - Block-Hash
  - Einlagenanzahl
  - Einlagen-Root
- Attestierungen – Anzahl der Attestierungen für den Block in diesem Slot
- Einlagen – Die Anzahl der Einlagen während dieses Slots
- Freiwillige Austritte – Die Anzahl der Validatoren, die während des Slots ausgetreten sind
- Slashings – Anzahl der Strafen, die an Proposer von Blöcken oder Attestierer vergeben wurden
- Stimmen – Die Validatoren, die für den Block in diesem Slot gestimmt haben

### Blöcke {#blocks-1}

Proof-of-Stake (PoS) unterteilt die Zeit in Slots und Epochen. Das bedeutet also neue Daten!

- Proposer – Der Validator, der algorithmisch ausgewählt wurde, um den neuen Block vorzuschlagen
- Epoche – Die Epoche, in der der Block vorgeschlagen wurde
- Slot – Der Slot, in dem der Block vorgeschlagen wurde
- Attestierungen – Die Anzahl der im Slot enthaltenen Attestierungen – Attestierungen sind wie Stimmen, die anzeigen, dass der Block bereit ist, an die Beacon Chain zu gehen

### Validatoren {#validators}

Validatoren sind dafür verantwortlich, Blöcke vorzuschlagen und sie innerhalb von Slots zu attestieren.

- Validator-Nummer – Eindeutige Nummer, die den Validator repräsentiert
- Aktuelles Guthaben – Das Guthaben des Validators einschließlich Belohnungen
- Effektives Guthaben – Das Guthaben des Validators, das für das Staking verwendet wird
- Einkommen – Die Belohnungen oder Strafen, die der Validator erhalten hat
- Status – Ob der Validator derzeit online und aktiv ist oder nicht
- Attestierungseffektivität – Die durchschnittliche Zeit, die benötigt wird, bis die Attestierungen des Validators in die Chain aufgenommen werden
- Berechtigung zur Aktivierung – Datum (und Epoche), an dem der Validator zur Validierung verfügbar wurde
- Aktiv seit – Datum (und Epoche), an dem der Validator aktiv wurde
- Vorgeschlagene Blöcke – Der Block, den der Validator vorgeschlagen hat
- Attestierungen – Die Attestierungen, die der Validator bereitgestellt hat
- Einlagen – Die Absenderadresse, der Transaktions-Hash, die Blocknummer, der Zeitstempel, der Betrag und der Status der Staking-Einlage, die vom Validator getätigt wurde

### Attestierungen {#attestations}

Attestierungen sind „Ja“-Stimmen, um Blöcke in die Chain aufzunehmen. Ihre Daten beziehen sich auf eine Aufzeichnung der Attestierung und der Validatoren, die attestiert haben

- Slot – Der Slot, in dem die Attestierung stattfand
- Komitee-Index – Der Index des Komitees beim gegebenen Slot
- Aggregationsbits – Repräsentiert die aggregierte Attestierung aller teilnehmenden Validatoren an der Attestierung
- Validatoren – Die Validatoren, die Attestierungen bereitgestellt haben
- Beacon-Block-Root – Zeigt auf den Block, den die Validatoren attestieren
- Quelle – Zeigt auf die letzte gerechtfertigte Epoche
- Ziel – Zeigt auf die letzte Epochengrenze
- Signatur

### Netzwerk {#network-1}

Die Top-Level-Daten der Konsensschicht umfassen Folgendes:

- Aktuelle Epoche
- Aktueller Slot
- Aktive Validatoren – Anzahl der aktiven Validatoren
- Ausstehende Validatoren – Anzahl der Validatoren, die darauf warten, aktiv zu werden
- Gestakte ETH – Menge an ETH, die im Netzwerk gestakt ist
- Durchschnittliches Guthaben – Durchschnittliches ETH-Guthaben der Validatoren

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Transaktionen](/developers/docs/transactions/)
- [Konten](/developers/docs/accounts/)
- [Netzwerke](/developers/docs/networks/)