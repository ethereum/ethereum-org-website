---
title: Ein sichereres Ethereum
description: "Die Roadmap von Ethereum härtet heute die Blockproduktion und Zensurresistenz, während sie das Protokoll auf das Quantenzeitalter und Jahrzehnte zuverlässigen Betriebs vorbereitet."
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-Roadmap"
template: roadmap
summaryPoints:
  - Kurzfristige Härtungs-Upgrades wie die verankerte Proposer-Builder-Trennung (PBS) und Inklusionslisten befinden sich in aktiver Entwicklung
  - Die Post-Quanten-Vorbereitung ist bereits Jahre vor einer ernstzunehmenden Quantenbedrohung im Gange
  - Die Protokollvereinfachung beseitigt Komplexität und verkleinert die Angriffsfläche von Ethereum
---

Ethereum ist bereits eine sehr sichere, dezentrale [Smart Contract](/glossary/#smart-contract)-Plattform. Die Roadmap zielt darauf ab, dies für Jahrzehnte so beizubehalten, indem **das Netzwerk heute gehärtet wird, während es auf Bedrohungen vorbereitet wird, die möglicherweise erst in Jahren auftreten**. Kurzfristige Upgrades werden auf [forkcast.org](https://forkcast.org) verfolgt, und der längerfristige Roadmap-Entwurf ist unter [strawmap.org](https://strawmap.org) veröffentlicht.

<ExpandableCard title="Ist Ethereum heute sicher?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Ja. Ethereum läuft seit 2015 kontinuierlich ohne Ausfallzeiten. Die Verbesserungen auf dieser Seite machen ein bereits sicheres Netzwerk schwerer anzugreifen, zu zensieren oder zu stören.

</ExpandableCard>

## Vertrauensloses Block-Building {#trustless-block-building}

Die meisten Ethereum-Blöcke werden heute durch Arbeitsteilung zusammengestellt: Spezialisierte Block-Builder konstruieren den wertvollsten Block, den sie können, und der [Validator](/glossary/#validator), der an der Reihe ist, schlägt das beste Angebot vor. Dies verhindert, dass professionelles Block-Building den [Stake](/glossary/#staking) bei den größten Betreibern konzentriert, aber seit 2022 stützt es sich auf Off-Protokoll-Software, die das Netzwerk nicht verifizieren kann.

Die **verankerte Proposer-Builder-Trennung (PBS) (ePBS oder EIP-7732)** verlagert diese Aufteilung in das Protokoll und beseitigt die Notwendigkeit, Relays zu vertrauen – den Drittanbieter-Vermittlern, die derzeit Blöcke zwischen Buildern und Validatoren weiterleiten. ePBS ist ein Hauptmerkmal des kommenden [Glamsterdam](/roadmap/glamsterdam/)-Upgrades, das für 2026 anvisiert ist. Es wurde noch kein Mainnet-Datum festgelegt; Client-Teams testen es auf Devnets (temporären Testnetzwerken).

<ButtonLink variant="outline" href="/roadmap/pbs/">Mehr zur Proposer-Builder-Trennung (PBS)</ButtonLink>

## Zensurresistenz {#censorship-resistance}

Ein zensurresistentes Netzwerk bedeutet, dass niemand eine gültige Transaktion daran hindern kann, die Chain zu erreichen. **Fork-Choice Enforced Inclusion Lists (FOCIL oder EIP-7805)** geben vielen Validatoren ein Mitspracherecht darüber, was ein Block enthalten muss: Sie veröffentlichen Listen ausstehender Transaktionen, die der Block-Builder einbeziehen muss. Kein einzelner Akteur kann Ihre Transaktion stillschweigend auslassen.

FOCIL ist das Hauptmerkmal der Konsens-Schicht von Hegotá, dem Upgrade, das auf Glamsterdam folgt und für 2027 anvisiert ist. Es wurde absichtlich nach Glamsterdam geplant, damit ePBS und FOCIL niemals als eine ungetestete Kombination ausgeliefert werden. Die Forschung an verschlüsselten Mempools, die den Inhalt wartender Transaktionen verbergen würden, bis sie sicher in einen Block aufgenommen sind, wird fortgesetzt.

## Schnellere Endgültigkeit {#faster-finality}

Für Benutzer ist die [Endgültigkeit](/glossary/#finality) der Moment, in dem eine Transaktion dauerhaft wird, wenn ihre Umkehrung einen Angreifer eine enorme Menge an gestakten ETH kosten würde. Heute dauert die Endgültigkeit etwa 15 Minuten, und **Forscher wollen dies drastisch verkürzen**. Die Arbeit begann als Single-Slot-Endgültigkeit, entwickelte sich zur Three-Slot-Endgültigkeit und wird nun als Minimmit fortgesetzt, einem Ein-Runden-Konsens-Protokoll im Lean-Ethereum-Programm, das im Juli 2025 eingeführt wurde. Endgültigkeit in Sekunden ist ein langfristiges Leitstern-Ziel auf dem Roadmap-Entwurf, das grob für 2029 anvisiert wird. Dies bleibt aktive Forschung, und noch ist kein Endgültigkeits-Upgrade einem Fork zugewiesen.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Mehr zur Forschung an schnellerer Endgültigkeit</ButtonLink>

## Widerstandsfähige Validatoren {#resilient-validators}

Ein Validator ist normalerweise eine Maschine, die einen Signierschlüssel hält. Die **Verteilte Validator-Technologie (DVT)** ersetzt diese einzelne Maschine durch ein Komitee von Maschinen, die sich den Schlüssel teilen und gemeinsam signieren, sodass der Ausfall eines Computers oder der Diebstahl eines Schlüssels den Validator nicht lahmlegt. DVT ist in der Produktion live und wird von Staking-Betreibern in großem Maßstab genutzt. Im Januar 2026 schlug Vitalik Buterin eine vereinfachte Variante auf Protokollebene namens DVT-lite vor; es handelt sich um einen frühen Vorschlag ohne geplanten Fork.

Das Netzwerk schützt sich auch durch [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/): Ethereum läuft auf mehreren unabhängig entwickelten Software-Implementierungen, sodass ein Fehler in einem Client den Rest des Netzwerks intakt lässt.

Zwei frühere Forschungsideen, View-Merge und Geheime Anführerwahl, sind keine aktiven Roadmap-Punkte mehr.

<ButtonLink variant="outline" href="/staking/dvt/">Mehr zur Verteilten Validator-Technologie (DVT)</ButtonLink>

## Quantenresistenz {#quantum-resistance}

Ethereum verwendet [Kryptographie](/glossary/#cryptography), um das Netzwerk sicher zu halten und Benutzergelder zu schützen. Letztendlich werden einige dieser kryptographischen Methoden **anfällig für Quantencomputer** sein, die bestimmte mathematische Probleme exponentiell schneller lösen können als klassische Maschinen.

**Kein Quantencomputer kann heute die Kryptographie von Ethereum knacken.** Die dafür erforderliche Hardware existiert noch nicht in großem Maßstab. Aber neuere Forschungen deuten darauf hin, dass sich die Lücke schneller schließt als bisher erwartet. Im März 2026 veröffentlichte Google Quantum AI ein Papier, in dem geschätzt wird, dass das Knacken der 256-Bit-Kryptographie über elliptische Kurven (die Art, die Ethereum für Konto-Signaturen verwendet) etwa 1.200 logische Qubits erfordern könnte, etwa 20-mal weniger als frühere Schätzungen.

Kryptographische Übergänge erfordern Jahre, um sicher geplant und ausgeführt zu werden, daher findet die Vorbereitung jetzt statt, lange bevor die Hardware existiert. Vier Bereiche wurden identifiziert, die Post-Quanten-Upgrades erfordern: Validator-Konsens-Signaturen (BLS), die Commitment-Schemata, die für die Datenverfügbarkeit verwendet werden (KZG), Konto-Signaturen (ECDSA) und die Zero-Knowledge-Beweissysteme, die von [Rollups](/glossary/#rollups) verwendet werden.

Die Ethereum Foundation hat im Januar 2026 ein dediziertes **Post-Quantum-Sicherheitsteam** gebildet, und dessen Arbeit wird öffentlich unter [pq.ethereum.org](https://pq.ethereum.org) verfolgt. Die aktive Arbeit umfasst Hash-basierte Validator-Signaturen (leanXMSS) gepaart mit einer minimalen zkVM (leanVM), die die größeren quantensicheren Signaturen effizient aggregiert, sowie wöchentliche Interop-Devnets mit mehr als 10 Client-Teams.

Ein wichtiger Teil der Übergangsstrategie ist **EIP-8141**, das native [Kontoabstraktion](/roadmap/account-abstraction/) einführt. Dies ermöglicht es einzelnen Konten, ihre eigene Signaturverifizierung zu wählen, was bedeutet, dass Benutzer zu quantensicheren Signaturen wechseln könnten, ohne auf eine einzige protokollweite Migration warten zu müssen. EIP-8141 wird für das Hegotá-Upgrade in Betracht gezogen. Die Meilensteine der Kern-Post-Quanten-Infrastruktur zielen auf eine Fertigstellung bis etwa 2029 ab. Dies sind Planungsziele und können sich verschieben.

<ExpandableCard title="Können Quantencomputer heute meine ETH stehlen?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Nein. Kein Quantencomputer kann heute die Kryptographie von Ethereum knacken. Die auf dieser Seite beschriebene Arbeit ist eine frühe Vorbereitung auf eine Bedrohung, die noch Jahre entfernt ist. Wenn Post-Quanten-Wallets verfügbar werden, wird Sie die Wallet-Software durch die Migration führen. Im Moment müssen Sie nichts tun.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Mehr zur Quantenresistenz</ButtonLink>

## Einfacheres und effizienteres Protokoll {#simpler-and-more-efficient-protocol}

Komplexität schafft Möglichkeiten für Fehler und Schwachstellen. Ein Teil der Roadmap konzentriert sich darauf, **Ethereum zu vereinfachen und technische Schulden abzubauen**, damit das Protokoll leichter zu warten, zu prüfen und zu verstehen ist. Ein einfacheres Protokoll bietet Angreifern auch weniger Angriffsfläche.

Bisher geliefert:

- **[Pectra (Mai 2025)](/roadmap/pectra/)**: Führte EIP-7702 ein, das es externen Konten (Externally Owned Accounts) ermöglicht, vorübergehend an Smart Contract-Code zu delegieren – ein Sprungbrett zur vollständigen Kontoabstraktion.
- **[Fusaka (Dezember 2025)](/roadmap/fusaka/)**: Implementierte PeerDAS (EIP-7594), das die Arbeitslast der Datenverfügbarkeit über das Netzwerk verteilt. Erhöhte außerdem die Blob-Parameter, was den Transaktionsdurchsatz für Rollups erweitert.
- **[Dencun (März 2024)](/roadmap/dencun/)**: Führte Blob-Transaktionen (EIP-4844) für günstigere Rollup-Daten ein und schränkte `SELFDESTRUCT` (EIP-6780) ein, um eine langjährige Quelle der Komplexität zu beseitigen.
- **[Shapella (April 2023)](/staking/withdrawals/)**: Ermöglichte es Validatoren, gestakte ETH abzuheben (EIP-4895), wodurch eine frühe Einschränkung des [Proof-of-Stake](/glossary/#pos)-Stakings aufgehoben wurde.
- **London (August 2021)**: Überarbeitete die Gas-Preisgestaltung mit EIP-1559 und führte eine Grundgebühr sowie einen Mechanismus zum Verbrennen ein, um vorhersehbarere Transaktionskosten zu erzielen.

In Arbeit:

- **Glamsterdam (anvisiert für 2026)**: Die Hauptmerkmale sind ePBS (EIP-7732) und Zugriffslisten auf Blockebene (EIP-7928), wobei auch eine Neugestaltung der Gas-Preise in Betracht gezogen wird.
- **Hegotá (anvisiert für 2027)**: FOCIL (EIP-7805) ist das Hauptmerkmal der Konsens-Schicht. Für die Aufnahme in Betracht gezogen: EIP-8141 (native Kontoabstraktion).
- **Laufend**: Die Bemühungen zur Vereinfachung der [EVM](/developers/docs/evm/), zur Harmonisierung von Client-Implementierungen und zum Auslaufen veralteter Funktionen werden von den Client-Teams fortgesetzt. Die Arbeit an der Zustandslosigkeit (die es Teilnehmern ermöglicht, die Chain zu verifizieren, ohne all ihre Daten zu speichern) wird um quantensichere binäre Hash-Bäume herum neu gestaltet, wobei der endgültige Ansatz noch bestätigt werden muss.

## Aktueller Fortschritt {#current-progress}

Stand Mitte 2026:

- **Block-Building und Zensurresistenz**: ePBS und Zugriffslisten auf Blockebene laufen auf Glamsterdam-Devnets. FOCIL ist für Hegotá geplant, anvisiert für 2027.
- **Endgültigkeit**: Minimmit und die breitere Lean-Ethereum-Konsensarbeit bleiben in aktiver Forschung, noch ohne Fork-Zuweisung.
- **Quantenresistenz**: Wöchentliche Post-Quanten-Interop-Devnets laufen, und die Meilensteine der Kerninfrastruktur zielen auf etwa 2029 ab.
- **Vereinfachung**: Pectra und Fusaka wurden ausgeliefert; Glamsterdam und Hegotá bringen die nächste Runde von Bereinigungen.

Kein Teil dieser Arbeit ist abgeschlossen, und alle Zeitpläne sind Schätzungen, die sich verschieben können.

## Weiterführende Literatur {#further-reading}

- [Forkcast: Tracker für Ethereum-Netzwerk-Upgrades](https://forkcast.org)
- [Strawmap: ein Entwurf der Ethereum Layer 1 (L1)-Roadmap](https://strawmap.org) - _EF Architecture_
- [Post-Quantum Ethereum](https://pq.ethereum.org) - _Ethereum Foundation_
- [Lean Ethereum Roadmap-Tracker](https://leanroadmap.org) - _ReamLabs_
- [Proof-of-Stake und Endgültigkeit](/developers/docs/consensus-mechanisms/pos/#finality)
- [Die EVM](/developers/docs/evm/)