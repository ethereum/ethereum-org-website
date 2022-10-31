---
title: Block-Explorer
description: Eine Einführung in Block-Explorer, Ihr Portal in die Welt der Blockchain-Daten – dort können Sie Informationen über Transaktionen, Konten, Verträge und mehr abfragen
lang: de
sidebarDepth: 3
---

Block-Explorer sind das Portal zu den Daten von Ethereum. Sie können darüber Echtzeitdaten zu Blöcken, Transaktionen, Minern, Konten und anderen Aktivitäten in der Chain sehen.

## Voraussetzungen {#prerequisites}

Sie sollten das Basiskonzept von Ethereum verstehen, damit Sie die Daten, die Sie über einen Block-Explorer erhalten, sinnvoll nutzen können. Beginnen Sie mit [einer Einführung in Ethereum](/developers/docs/intro-to-ethereum/).

## Dienste {#services}

- [Etherscan](https://etherscan.io/) – _Auch verfügbar auf Chinesisch, Koreanisch, Russisch, und Japanisch_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) – _Auch verfügbar auf Chinesisch, Spanisch, Französisch, Türkisch, Russisch, Koreanisch und Vietnamesisch_
- [Blockchair](https://blockchair.com/ethereum) – _Auch verfügbar auf Spanisch, Französisch, Italienisch, Niederländisch, Portugiesisch, Russisch, Chinesisch, und Persisch_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Daten {#data}

Ethereum ist von Grund auf transparent und damit ist auch alles überprüfbar. Block-Explorer bieten eine Oberfläche, um diese Informationen zu erhalten. Das gilt sowohl für das Ethereum-Netzwerk als auch für die Testnets, wenn Sie diese Daten benötigen.

Im Folgenden finden Sie eine Zusammenfassung der Arten von Daten, die Sie über einem Block-Explorer erhalten können:

### Blöcke {#blocks}

Neue Blöcke werden etwa alle 12 Sekunden zu Ethereum hinzugefügt (Schwankungen können auftreten), so dass es einen nahezu konstanten Strom an Daten gibt, die den Block-Explorern hinzugefügt werden. Blöcke enthalten viele wichtige Daten, die Sie vielleicht hilfreich finden:

**Standarddaten**

- Blockhöhe – Blocknummer und Länge der Blockchain (in Blöcken) zur Erstellung des aktuellen Blocks
- Zeitstempel – Die Uhrzeit, zu der ein Miner den Block abgebaut hat
- Transaktionen – Die Anzahl an Transaktionen, die im Block enthalten sind
- Miner – Die Adresse des Miners, der den Block abgebaut hat
- Belohnung – Der Betrag an ETH, den der Miner für das Hinzufügen des Blocks erhalten hat (Standardprämie 2ETH + Transaktionsentgelte der Transaktionen im Block)
- Schwierigkeitsgrad – Die Schwierigkeit, die mit dem Abbau des Blocks verbunden ist
- Größe – Die Datengröße innerhalb des Block (gemessen in Bytes)
- Ressourcenverbrauch – Die Gesamteinheiten an Ressourcen, die von den Transaktionen im Block verbraucht wurden
- Ressourcenlimit – Das Ressourcenlimit, das durch die Transaktionen im Block festgelegt wurde
- Zusätzliche Daten – Sämtliche zusätzlichen Daten, die der Miner in den Block aufgenommen hat

**Erweiterte Daten**

- Hash – Der kryptographische Hash, der den Header des Blocks darstellt (die eindeutige Kennung des Blocks)
- Eltern-Hash – Der Hash des Blocks, der vor dem aktuellen Block kam
- Sha3Uncles – Der kombinierte Hash aus allen Onkeln für ein bestimmtes übergeordnetes Element
- StateRoot – Der Wurzel-Hash des Merkle-Baums, der den gesamten Zustand des Systems speichert
- Nonce – Ein Wert, der verwendet wird um den Proof-of-Work für einen Block durch einen Miner anzuzeigen

**Onkel-Blöcke**

Onkel-Blöcke werden erzeugt, wenn zwei Miner, fast zur selben Zeit, Blöcke erstellen – nur ein Block kann über die Nodes validiert werden. Diese Blöcke werden nicht aufgenommen, Miner erhalten aber dennoch eine Belohnung für die Arbeit.

Block-Explorer liefern folgende Informationen über Onkel-Blöcke:

- Eine Onkel-Blocknummer
- Eine Uhrzeit, zu der sie erschienen sind
- Die Blockhöhe, auf der sie erstellt wurden
- Wer ihn geschürft hat
- Die ETH-Belohnung

### Ressourcen {#gas}

Block-Explorer geben nicht nur Informationen zum Ressourcenverbrauch in Transkationen und Blöcken an, manche zeigen auch Informationen zu den aktuell im Netzwerk gültigen Ressourcenpreisen an. Das hilft Ihnen dabei, die Nutzung des Netzwerks zu verstehen, sichere Transaktionen auszuführen und nicht mehr Ressourcen zu beanspruchen als notwendig ist. Suchen Sie nach APIs, die Ihnen helfen können, diese Informationen in den Produktschnittstelle zu finden. Ressourcenspezifische Datenabdeckungen:

- Geschätztes Ressourcenvolumen, das für eine sichere, aber langsamere Transaktion erforderlich ist (+ geschätzter Preis und geschätzte Zeit)
- Geschätztes Ressourcenvolumen, das für durchschnittliche Transaktionen erforderlich ist (+ geschätzter Preis und geschätzte Zeit)
- Geschätztes Ressourcenvolumen, das für eine schnelle Transaktion erforderlich ist (+ geschätzter Preis und geschätzte Zeit)
- Durchschnittliche Bestätigungszeit basierend auf dem Ressourcenpreis
- Aufträge, die Ressourcen verbrauchen, sprich: beliebte Produkte, die einen hohen Nutzen im Netz aufweisen
- Konten, die Ressourcen ausgeben, also häufige Netzwerknutzer

### Transaktionen {#transactions}

Block-Explorer werden häufig eingesetzt, um den Status der Transaktionen abzurufen. Das liegt an dem Detailgrad, den sie bieten und der zusätzliche Sicherheit bietet. Die Transaktionsdetails enthalten Folgendes:

**Standarddaten**

- Transaktions-Hash – Ein Hash, der beim Absenden der Transaktion generiert wird
- Status – Gibt an, ob die Transaktion aussteht, fehlgeschlagen oder abgeschlossen ist
- Block – Der Block, in den die Transaktion integriert wurde
- Zeitstempel – Die Uhrzeit, zu der ein Miner die Transaktion abgebaut hat
- Von – Das Konto, das die Transaktion tätigt
- An – Die Adresse des Empfängers oder Smart Contract, mit dem die Transaktion interagiert
- Übertragene Token – Eine Liste von Token, die als Teil der Transaktion übertragen wurden
- Wert – Der gesamte ETH-Wert, der übertragen wird
- Transaktionsgebühr – Die Gebühr, die an den Miner für die Verarbeitung der Transaktion gezahlt wird (berechnet nach Ressourdenpreis\oder erforderlichen Ressourcen).

**Erweiterte Daten**

- Ressourcenlimit – Das maximale Ressourcenvolumen, das für die Transaktion verbraucht werden darf
- Eingesetzte Ressourcen – Die von der Transaktion tatsächlich verbrauchten Ressourcen
- Ressourcenpreis – Der Preis pro Ressourceneinheit
- Nonce – Die Transaktionsnummer für die `Absenderadresse` (wichtig ist, zu bedenken, dass die Nummer bei 0 beginnt, also wäre eine Nonce von `100` tatsächlich die 101. Transaktion, die von diesem Konto eingereicht wurde
- Eingabedaten – Alle zusätzlichen Informationen, die für die Transaktion erforderlich sind

### Konten {#accounts}

Es gibt viele Daten, auf die Sie über ein Konto zugreifen können. Daher wird häufig empfohlen, mehrere Konten zu verwenden, damit Ihr Vermögen und Ihre Assets nicht so leicht nachverfolgt werden können. Außerdem werden weitere Lösungen entwickelt, um Transaktionen und Kontoaktivitäten sicherer und privater zu gestalten. Im Folgenden finden Sie die Daten, die für Konten verfügbar sind:

**Benutzerkonten**

- Kontoadresse – Die öffentliche Adresse, an die Sie Geld senden können
- ETH-Saldo – Die Menge an ETH auf diesem Konto
- Gesamter ETH-Wert – Der Wert der ETH
- Token – Die dem Konto zugeordneten Token und deren Wert
- Transaktionsverlauf – Eine Liste aller Transaktionen, bei denen dieses Konto entweder Absender oder Empfänger war

**Smart Contracts**

Smart-Contract-Konten verfügen über die gleichen Daten wie ein Benutzerkonto, doch einige Block-Explorer zeigen zusätzlich auch einige Codeinformationen an. Beispiele:

- Vertragsersteller – Die Adresse, die den Vertrag in die Blockchain gestellt hat
- Erstellungstransaktion – Die Transaktion, die die Integration des Smart Contracts in die Blockchain beinhaltet
- Quellcode – Der Solidity- oder Vyper-Code des Smart Contracts
- Contract-ABI – die Application Binary Interface des Vertrages, die Abrufe, die ein Vertrag vornimmt, und die empfangenen Daten
- Vertragserstellungscode – Der kompilierte Bytecode des Smart Contracts, wird beim Kompilieren eines Smart Contracts erstellt, der in Solidity, Vyper oder einer anderen Programmiersprache geschrieben ist
- Vertragsereignisse – Der Verlauf der Methoden, die im Smart Contract angewendet wurden. Grundsätzlich eine Möglichkeit, zu sehen, wie und wie häufig der Vertrag verwendet wird.

### Token {#tokens}

Token sind eine Art von Vertrag und enthalten ähnliche Daten wie ein Smart Contract. Doch dadurch, dass sie einen Wert haben und gehandelt werden können, weisen sie zusätzliche Datenpunkte auf:

- Typ – Ob es sich um einen ERC-20, ERC-721 oder einen anderen Tokenstandard handelt
- Preis – Wenn es sich um ERC-20-Token handelt, weisen sie einen aktuellen Marktwert auf
- Market Cap – Wenn es sich um ERC-20 handelt, weisen sie eine Marktobergrenze auf (berechnet nach Preis\*Gesamtangebot)
- Gesamtangebot – Die Anzahl Token in Umlauf
- Halter – Die Anzahl der Adressen, die den Token halten
- Transfers – Wie oft der Token zwischen Konten übertragen wurde
- Transaktionsverlauf – Ein Verlauf aller Transaktionen, einschließlich der Token
- Vertragsadresse – Die Adresse des Tokens, der in die Blockchain intergiert wurde
- Dezimalstellen – ERC-20-Token sind teilbar und haben Dezimalstellen

### Netzwerk {#network}

Natürlich gibt es einige Daten, die Informationen zum Netzwerkzustand bieten. Diese sind ganz spezifisch für den Proof-of-work-Konsensmechanismus von Ethereum. Wenn Ethereum zum Proof-of-Stake übergeht, werden einige dieser Daten überflüssig.

- Schwierigkeitsgrad – Die derzeitige Schwierigkeid des Minings
- Hashrate – Eine Schätzung, wie viele Hashes von Ethereum-Minern erzeugt werden, die versuchen, den aktuellen Ethereum-Block oder einen bestimmten Block zu lösen
- Gesamte Transaktionen – Die Anzahl an Transaktionen seit der Erstellung von Ethereum
- Transaktionen pro Sekunde – Die Anzahl an Transaktionen, die innerhalb einer Sekunde verarbeitet werden können
- ETH-Preis – Der aktuelle Marktwert von 1 ETH
- Gesamter ETH-Bestand – Anzahl der ETH im Umlauf, dabei gilt es zu bedenken, dass für jeden neu geschaffenen Block neue ETH als Blockbelohnungen geschaffen werden
- Market Cap – Berechnung des Preises\*Bestände.

## Daten der Konsensebene {#consensus-layer-data}

Verbesserungen für die Skalierbarkeit befinden sich noch in der Entwicklung, doch es lohnt sich, über einige der Datenpunkte zu sprechen, die Sie über Explorer erhalten können. Alle diese Daten sind bereits für die Testnets verfügbar.

Wenn Sie mit der Roadmap nicht vertraut sind, finden Sie Informationen in [unserem Überblick über die Ethereum-Upgrades](/upgrades/).

### Epoche {#epoch}

Die Beacon Chain erstellt Gremien von Validatoren, die am Ende jeder Epoche (alle 6,4 Minuten) aus Sicherheitsgründen nach dem Zufallsprinzip zusammengestellt werden. Epochendaten enthalten:

- Epochennummer
- Abgeschlossener Status – Ob die Epoche abgeschlossen wurde (Ja/Nein)
- Uhrzeit – Die Uhrzeit, zu der die Epoche endete
- Beglaubigungen – Die Anzahl der Beglaubigungen in der Epoche (Stimmen für Blöcke innerhalb von Zeitabschnitten)
- Einlagen – Die Anzahl der ETH-Einlagen, die in der Epoche enthalten sind (Validatoren müssen ETH staken, also in einem Smart Contract hinterlegen, um Validatoren zu werden)
- Slashings – Anzahl an Strafen, die den Antragstellern von Blöcken oder Beglaubigungen erteilt werden
- Wahlbeteiligung – Die Menge der zur Validierung von Blöcken gestakten (hinterlegten) ETH
- Validatoren – Anzahl der für die Epoche aktiven Validatoren
- Durchschnittlicher Validator-Saldo – Durchschnittlicher Saldo aktiver Validatoren
- Slots – Anzahl der in der Epoche enthaltenen Zeitabschnitte (Slots enthalten einen gültigen Block)

### Slot {#slot}

Slots sind Möglichkeiten für die Blockerstellung. Folgende Daten sind zu Slots verfügbar:

- Epoche – Die Epoche, in der der Slot gültig ist
- Slot-Nummer
- Status – Der Status des Slot (Vorgeschlagen/Verpasst)
- Uhrzeit – Der Zeitstempel des Slots
- Proposer – Der Validator, der den Block für den Slot vorgeschlagen hat
- Block-Root - Die Hash-Datenstruktur des BeaconBlock
- Übergeordneter Root – Der Hash des vorherigen Blocks
- Status-Root – Die Hash-Datenstruktur des BeaconState
- Signatur
- Randao reveal
- Graffiti – Ein Block-Proposer kann 32 Byte lange Nachrichten in seinem Blockvorschlag enthalten
- Ausführungsdetails
  - Block-Hash
  - Zähler für hinterlegten Einsatz
  - Root für hinterlegten Einsatz
- Beglaubigungen – Anzahl an Beglaubigungen für den Block in diesem Slot
- Hinterlegter Einsatz – Anzahl von hinterlegten Einsätzen während eines Slots
- Freiwillige Abbrüche – Anzahl an Validatoren, die den Slot verlassen haben
- Slashings – Anzahl an Strafen, die den Antragstellern von Blöcken oder Beglaubigungen erteilt werden
- Stimmen – Die Validatoren, die für den Block in diesem Slot gestimmt haben

### Blöcke {#blocks-1}

Blöcke der Konsensebene funktionieren anders, da Miner durch Validatoren ersetzt werden und mit der Beacon Chain Slots und Epochen in Ethereum eingeführt werden. Damit gibt es neue Daten:

- Proposer – Der Validator, der per Algorithmus ausgewählt wurde, den neuen Block vorzuschlagen
- Epoche – Die Epoche, in der der Block vorgeschlagen wurde
- Slot – Der Zeitabschnitt, in dem der Block vorgeschlagen wurde
- Beglaubigungen – Die Anzahl an Beglaubigungen im Slot. Beglaubigungen sind wie Abstimmungen. Sie geben an, dass der Block bereit ist, in die Beacon Chain aufgenommen zu werden.

### Validatoren {#validators}

Validatoren sind dafür verantwortlich, Blöcke vorzuschlagen und sie innerhalb der Slots zu bestätigen.

- Validatornummer – Eindeutige Zahl, die für den Validator steht
- Aktueller Saldo – Der Kontostand des Validators einschließlich der Belohnungen
- Effektiver Saldo – Der Saldo des Validators, der für das Staking verwendet wird
- Einkommen – Die Belohnungen oder Strafen, die der Validator erhält
- Status – Ob der Validator aktuell online und aktiv ist oder nicht
- Beglaubigungseffektivität – Die durchschnittliche Zeit, die benötigt wird, bis die Beglaubigungen des Validators in die Blockchain aufgenommen werden
- Aktivierungsberechtigung – Datum (und Epoche), zu dem der Validator zur Validierung verfügbar wurde
- Aktiv seit – Datum (und Epoche), zu dem der Validator aktiv wurde
- Vorgeschlagene Blöcke – Der Block, den der Validator vorgeschlagen hat
- Beglaubigungen – Die Beglaubigungen, die der Validator vorgelegt hat
- Hinterlegter Einsatz – Die Erstelleradresse, Transaktions-Hash, Blocknummer, Zeitstempel, Betrag und Status der Staking-Einzahlung durch den Validator

### Beglaubigungen {#attestations}

Beglaubigungen sind "Ja"-Stimmen für die Aufnahme von Blöcken in die Chain. Ihre Daten beziehen sich auf eine Aufzeichnung der Beglaubigung und der bestätigenden Validatoren.

- Slot – Der Zeitabschnitt, in dem die Beglaubigung erfolgte
- Komiteeindex – Der Index des Validatoren-Ausschusses im gegebenen Slot
- Aggregations-Bits – Stellt die aggregierte Beglaubigungen aller an der Beglaubigung teilnehmenden Validatoren dar
- Validatoren – Die Validatoren, die die Beglaubigung erstellt haben
- Beacon-Block-Root – Verweist auf den Block, für den Validatoren beglaubigen
- Quelle – Verweist auf die zuletzt berechtigte Epoche
- Ziel – Verweist auf die neueste Epochengrenze
- Signatur

### Netzwerk {#network-1}

Die Daten der obersten Ebene der Konsensebene umfassen Folgendes:

- Aktuelle Epoche
- Aktueller Slot
- Aktive Validatoren – Anzahl der aktiven Validatoren
- Ausstehende Validatoren – Anzahl der Validatoren, die noch aktiviert werden müssen
- Staked ETH – Menge der ETH, die im Netzwerk gestaket wurden
- Durchschnittlicher Saldo – Durchschnittlicher ETH-Saldo der Validatoren

## Block Explorer {#block-explorers}

- [Etherscan](https://etherscan.io/) – Ein Block Explorer, mit dem Sie Daten für Ethereum mainnet, Ropsten Testnet, Kovan Testnet, Rinkeby Testnet und Goerli Testnet abrufen können.
- [Blockscout](https://blockscout.com/) – Konzentriert sich auf die folgenden Netzwerke:
  - xDai – Eine clevere Kombination aus dem DAI-Stablecoin von MakerDAO und der Sidechain- und Tokenbridge-Technologie von POA
  - POA – Eine Sidechain und ein autonomes Netzwerk, das von einer Gruppe vertrauenswürdiger Validatoren gesichert wird. Alle Validatoren im Netzwerk sind US-amerikanische Notare. Ihre Informationen sind öffentlich zugänglich.
  - POA Sokol Testnet
  - ARTIS – Eine Ethereum-konforme Blockchain
  - [LUKSO L14](https://blockscout.com/lukso/l14) – L14 fungiert als erstes Testnetzwerk, um der LUKSO-Community zu ermöglichen, auf einer gemeinsamen Infrastruktur aufzubauen und zu testen
  - qDai
- [Etherchain](https://www.etherchain.org/) – Ein Block Explorer für das Ethereum-Mainnet
- [Ethplorer](https://ethplorer.io/) – Ein Block Explorer mit Schwerpunkt auf Token für das Ethereum-Mainnet und das Kovan Testnet
- [Blockchair](https://blockchair.com/ethereum) – Der privateste Ethereum-Explorer. Auch zum Sortieren und Filtern von (Mempool) Daten.

## Beacon Chain-Block Explorer (Konsensebene) {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://ethscan.org/](https://ethscan.org/) (fork of beaconcha.in)

## Weiterführende Informationen {#further-reading}

_Kennen Sie eine Community Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Themen {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transaktionen](/developers/docs/transactions/)
- [Konten](/developers/docs/accounts/)
- [Netzwerke](/developers/docs/networks/)
