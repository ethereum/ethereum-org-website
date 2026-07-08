---
title: Zukunftssicherung von Ethereum und Krypto-Quantensicherheit
description: "Diese Upgrades festigen Ethereum als die widerstandsfähige, dezentrale Basisschicht für die Zukunft, was auch immer sie bringen mag."
lang: de
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-Roadmap"
template: roadmap
summaryPoints:
  - Post-Quanten-Kryptographie stellt sicher, dass Ethereum fortschrittliche Hardware-Bedrohungen überstehen kann, während das Quantencomputing voranschreitet
  - Die Vereinfachung des Protokolls macht Ethereum einfacher zu warten, zu prüfen und zu sichern
  - Kürzliche Upgrades haben bereits bedeutende Effizienzverbesserungen geliefert
---

Einige Teile der Roadmap befassen sich nicht mit der sofortigen Skalierung oder Sicherung von Ethereum. Es geht darum, Ethereum **weit in die Zukunft hinein stabil und zuverlässig** zu machen. Das bedeutet, sich auf neue Arten von Bedrohungen vorzubereiten und unnötige Komplexität aus dem Protokoll zu entfernen.

## Quantenresistenz {#quantum-resistance}

Ethereum verwendet [Kryptographie](/glossary/#cryptography), um das Netzwerk sicher zu halten und die Gelder der Nutzer zu schützen. Letztendlich werden einige dieser kryptographischen Methoden **anfällig für Quantencomputer** sein, die bestimmte mathematische Probleme exponentiell schneller lösen können als klassische Maschinen.

**Kein Quantencomputer kann heute die Kryptographie von Ethereum knacken.** Die dafür erforderliche Hardware existiert noch nicht in großem Maßstab. Aber aktuelle Forschungen deuten darauf hin, dass sich die Lücke schneller schließt als bisher erwartet. Im März 2026 veröffentlichte Google Quantum AI ein Papier, in dem geschätzt wird, dass das Knacken der 256-Bit-Kryptographie mit elliptischen Kurven (die Art, die Ethereum für Konto-Signaturen verwendet) etwa 1.200 logische Qubits erfordern könnte, was etwa 20-mal weniger ist als frühere Schätzungen. Google hat sich eine interne Frist bis 2029 gesetzt, um seine eigenen Systeme auf quantensichere Kryptographie umzustellen.

Kryptographische Übergänge erfordern Jahre der Planung und sicheren Ausführung. Da das Sicherheitsmodell von Ethereum auf Jahrzehnte ausgelegt ist, stand die Post-Quanten-Vorbereitung bereits auf der Roadmap von Ethereum, bevor sie in den Mainstream-Schlagzeilen auftauchte. Die Vorbereitung des Netzwerks findet jetzt statt, um einen nahtlosen Übergang zu gewährleisten, und nicht als Reaktion auf einen Notfall.

### Was ist gefährdet? {#what-is-at-risk}

Vier Hauptbereiche der Kryptographie von Ethereum wurden identifiziert, die Post-Quanten-Upgrades erfordern:

1. **Konsens-Signaturen (BLS)**: [Validatoren](/glossary/#validator) verwenden BLS-Signaturen, um über gültige [Blöcke](/glossary/#block) abzustimmen. Ein Quantencomputer könnte diese Signaturen fälschen.
2. **Datenverfügbarkeit (KZG-Commitments)**: Die [Commitment-Schemata](/roadmap/danksharding/#what-is-kzg), die Ethereum bei der Skalierung helfen, basieren auf Mathematik (insbesondere auf Paarungen elliptischer Kurven), die anfällig für Quantenangriffe ist.
3. **Konto-Signaturen (ECDSA)**: Das Signaturschema, das einzelne Ethereum-Konten schützt. Wenn ein Konto eine Transaktion sendet, wird sein öffentlicher Schlüssel Onchain offengelegt. Ein Quantencomputer könnte den privaten Schlüssel aus diesem offengelegten öffentlichen Schlüssel ableiten, was potenziell den Diebstahl von Geldern ermöglichen würde.
4. **ZK-Beweise auf Anwendungsebene**: Zero-Knowledge-Beweissysteme, die von Rollups und anderen Anwendungen verwendet werden, beruhen auf kryptographischen Annahmen, die Quantencomputer untergraben könnten.

<ExpandableCard title="Können Quantencomputer heute meine ETH stehlen?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Nein. Kein Quantencomputer kann heute die Kryptographie von Ethereum knacken. Die auf dieser Seite beschriebene Arbeit ist eine Vorbereitung auf die Zukunft, keine Reaktion auf eine aktive Bedrohung. Wenn Post-Quanten-Wallets verfügbar werden, wird Sie die Wallet-Software durch die Migration führen. Im Moment müssen Sie nichts tun.

</ExpandableCard>

### Was wird getan? {#what-is-being-done}

Ethereum ist derzeit der proaktivste Verteidiger gegen Quantenbedrohungen im Blockchain-Ökosystem. Die Ethereum Foundation hat im Januar 2026 ein dediziertes **Post-Quantum-Sicherheitsteam** gegründet, und die aktive Arbeit erstreckt sich über mehrere Client-Teams und Forschungsgruppen. Die Arbeit des Post-Quantum-Teams der EF wird öffentlich unter [pq.ethereum.org](https://pq.ethereum.org) verfolgt.

Zu den aktiven Arbeiten gehören:

- **Hash-basierte Signaturen (leanXMSS)**: Ein quantensicherer Ersatz für Validator-Signaturen, der auf Hash-Funktionen aufbaut, die Quantencomputer nicht effizient knacken können.
- **Minimale zkVM (leanVM)**: Da quantensichere Signaturen größer sind als die derzeit verwendeten Signaturen, wird leanXMSS mit einer minimalen zkVM (leanVM) gekoppelt. Diese Engine aggregiert quantensichere Signaturen effizient und komprimiert die Daten um das 250-Fache, sodass das Netzwerk nach dem Übergang schnell bleibt.
- **Wöchentliche Interop-Tests**: Mehr als 10 Client-Teams nehmen an regelmäßigen Post-Quantum-Devnets teil.
- **Datenverfügbarkeit:** Die Aktualisierung der zugrunde liegenden Kryptographie, die zur Verarbeitung großer Mengen an Netzwerkdaten verwendet wird, stellt sicher, dass Ethereum schnell und erschwinglich in der Nutzung bleibt, ohne zukünftige Quantenschwachstellen zu riskieren.
- **Poseidon-Preis**: Ein Forschungspreis in Höhe von 1 Million US-Dollar, der auf Verbesserungen bei Hash-basierten kryptographischen Primitiven abzielt.
- **NIST-Standards**: Das US-amerikanische National Institute of Standards and Technology hat im August 2024 drei Standards für Post-Quanten-Kryptographie fertiggestellt (ML-KEM, ML-DSA, SLH-DSA). Die Arbeit von Ethereum baut auf diesen Grundlagen auf.

Ein wichtiger Teil der Übergangsstrategie ist **EIP-8141**, das native [Kontoabstraktion](/roadmap/account-abstraction/) einführt. Dies ermöglicht es einzelnen Konten, ihre eigene Signaturüberprüfung zu wählen, was bedeutet, dass Benutzer zu quantensicheren Signaturen wechseln könnten, **ohne auf eine einzige protokollweite Migration warten zu müssen**. EIP-8141 wird für den Hegotá-Hard-Fork (geplant für die zweite Hälfte 2026) in Betracht gezogen.

Die Ethereum Foundation hat strukturierte Fork-Meilensteine skizziert, die den Abschluss der zentralen Post-Quantum-Infrastruktur bis etwa 2029 anstreben. Dies sind Planungsziele, keine garantierten Zusagen.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Mehr zur Quantenresistenz</ButtonLink>
## Einfacheres und effizienteres Ethereum {#simpler-more-efficient-ethereum}

Komplexität schafft Möglichkeiten für Fehler und Schwachstellen. Ein Teil der Roadmap konzentriert sich auf die **Vereinfachung von Ethereum und die Beseitigung technischer Schulden**, damit das Protokoll einfacher zu warten, zu prüfen und zu verstehen ist.

### Was geliefert wurde {#what-has-been-delivered}

Mehrere kürzliche Upgrades haben Ethereum einfacher und effizienter gemacht:

- **[Pectra (Mai 2025)](/roadmap/pectra/)**: Führte EIP-7702 ein, das es externen Konten ermöglicht, vorübergehend an Smart Contract-Code zu delegieren, ein Sprungbrett zur vollständigen [Kontoabstraktion](/roadmap/account-abstraction/). Außerdem wurden die BLS12-381-Vorkompilierung (EIP-2537), die Onchain-Einzahlungsabwicklung (EIP-6110) und der Zugriff auf historische Block-Hashes in der EVM (EIP-2935) hinzugefügt sowie das maximale effektive Guthaben für Validatoren erhöht (EIP-7251).
- **[Fusaka (Dezember 2025)](/roadmap/fusaka/)**: Implementierte PeerDAS (EIP-7594), ein Peer-to-Peer-System für Data Availability Sampling, das die Arbeitslast der Datenverfügbarkeit über das Netzwerk verteilt. Außerdem wurden die Blob-Parameter erhöht, was den Transaktionsdurchsatz für [Rollups](/glossary/#rollups) erweitert.
- **[Dencun (März 2024)](/roadmap/dencun/)**: Führte Blob-Transaktionen (EIP-4844) für günstigere Rollup-Daten ein und schränkte `SELFDESTRUCT` (EIP-6780) ein, um eine langjährige Quelle der Komplexität zu beseitigen.
- **[London (August 2021)](/ethereum-forks/#london)**: Überarbeitete die [Gas](/glossary/#gas)-Preisgestaltung mit EIP-1559 und führte eine Grundgebühr und einen Mechanismus zum Verbrennen ein, um vorhersehbarere Transaktionskosten zu erzielen.

### Was in Arbeit ist {#what-is-in-progress}

- **[Glamsterdam (geplant für die erste Hälfte 2026)](/roadmap/glamsterdam/)**: Für die Aufnahme in Betracht gezogen: verankerte Proposer-Builder-Trennung (PBS) (EIP-7732), Zugriffslisten auf Blockebene (EIP-7928) und eine Neugestaltung der Gaspreise, um die Kosten besser an die tatsächliche Ressourcennutzung anzupassen.
- **Hegotá (geplant für die zweite Hälfte 2026)**: Für die Aufnahme in Betracht gezogen: [Verkle-Bäume](/roadmap/verkle-trees/), die die aktuelle Datenstruktur durch eine effizientere ersetzen, die zustandslose Clients ermöglicht. Ebenfalls anvisiert für EIP-8141 (native Kontoabstraktion).
- **Laufend**: Die Bemühungen zur Vereinfachung der [EVM](/developers/docs/evm/), zur Harmonisierung von Client-Implementierungen und zum Auslaufen veralteter Funktionen werden in der gesamten Ethereum-Entwickler-Community fortgesetzt.

## Aktueller Fortschritt {#current-progress}

Stand Anfang 2026:

**Vereinfachung und Effizienz**: Pectra und Fusaka lieferten echte Verbesserungen bei der Kontoflexibilität, der Datenverfügbarkeit und dem Validator-Betrieb. Glamsterdam und Hegotá befinden sich in aktiver Entwicklung mit klaren Zielen, das Netzwerk widerstandsfähiger und effizienter zu machen und gleichzeitig externe Abhängigkeiten zu beseitigen.

**Post-Quanten-Kryptographie**: Aktive Forschung und frühe Implementierung sind im Gange. Das Ökosystem hat Forschungspreise finanziert und betreibt wöchentliche Interop-Devnets über mehrere Clients hinweg, zusätzlich zu der Forschung, die vom speziellen Post-Quantum-Team der Ethereum Foundation durchgeführt wird. Während die strukturierten Fork-Meilensteine den Abschluss für etwa 2029 anstreben, liefert die frühe Forschung greifbare Beweise dafür, dass die Post-Quanten-Ausführung heute machbar ist.

**Kontoabstraktion und Signatur-Agilität**: EIP-7702 wurde in Pectra ausgeliefert. EIP-8141, das für Hegotá in Betracht gezogen wird, wird es Konten ermöglichen, jedes beliebige Signaturschema zu verwenden, was den Benutzern einen Weg bietet, quantensichere Signaturen zu übernehmen, bevor der vollständige Protokollübergang abgeschlossen ist.

Kein Teil dieser Arbeit ist abgeschlossen. Zeitpläne sind Ziele, keine Garantien. Aber der Umfang und das Tempo der aktiven Entwicklung stellen ein klares Bekenntnis dar, Ethereum langfristig sicher und effizient zu halten.

**Weiterführende Literatur**

- [Post-Quanten-Kryptographie auf Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _EF-Architektur_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Datenstrukturen](/developers/docs/data-structures-and-encoding/)
