---
title: Post-Quanten-Kryptographie auf Ethereum
description: "Wie sich Ethereum auf die Post-Quanten-Ära vorbereitet, was anfällig ist und was zu seinem Schutz entwickelt wird."
lang: de
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-Roadmap"
template: roadmap
summaryPoints:
  - Quantencomputer werden letztendlich die Kryptographie bedrohen, die Ethereum heute verwendet
  - Die Ethereum Foundation verfügt über ein dediziertes Post-Quanten-Forschungsteam und eine strukturierte „Lean Ethereum“-Roadmap, die bis 2029 einen vollständigen Post-Quanten-Schutz anstrebt
  - Ihre Gelder sind heute sicher und Wallet-Software wird Sie durch die zukünftige Migration führen
---

Quantencomputer werden letztendlich in der Lage sein, die kryptographischen Methoden zu brechen, die Ethereum und die meisten anderen digitalen Systeme heute sichern. Diese Seite erklärt, was das bedeutet, wie das Netzwerk proaktiv Verbesserungen entwickelt, um dieses Risiko zu mindern, und was Sie wissen müssen.

## Warum Post-Quanten-Kryptographie wichtig ist {#why-post-quantum-matters}

Ethereum verlässt sich auf verschiedene Formen der [Kryptographie](/glossary/#cryptography), um das Netzwerk sicher zu halten und die Gelder der Nutzer zu schützen. Die wichtigsten sind:

- **Digitaler Signaturalgorithmus mit elliptischen Kurven (ECDSA)**: Die Kryptographie, die zum Signieren von Transaktionen verwendet wird. Die Sicherheit Ihres Ethereum-Kontos hängt davon ab.
- **BLS-Signaturen**: Werden von [Validatoren](/glossary/#validator) verwendet, um einen [Konsens](/glossary/#consensus) über den Zustand des Netzwerks zu erreichen.
- **Polynomische KZG-Commitments**: Werden für die [Datenverfügbarkeit](/glossary/#data-availability) in der Skalierungs-Roadmap von Ethereum verwendet.
- **ZK-Beweissysteme**: Werden von Rollups und anderen Anwendungen verwendet, um Berechnungen offchain zu verifizieren.

All diese beruhen auf mathematischen Strukturen, wie etwa abelschen Gruppen, die für klassische Computer schwer zu knacken sind, aber von einem Quantencomputer mithilfe von [Shors Algorithmus](https://en.wikipedia.org/wiki/Shor%27s_algorithm) effizient gelöst werden können.

### Wann werden Quantencomputer Ethereum bedrohen? {#when-will-quantum-computers-threaten-ethereum}

Im März 2026 veröffentlichte Google Quantum AI Forschungsergebnisse, die schätzen, dass das Brechen der 256-Bit-Kryptographie mit elliptischen Kurven (die Art, die Ethereum für Kontosignaturen verwendet) etwa 1.200 logische Qubits erfordern könnte. Frühere Schätzungen setzten diese Zahl viel höher an. Google hat sich eine interne Frist bis 2029 gesetzt, um seine eigenen Systeme auf Post-Quanten-Kryptographie umzustellen.

Aktuelle Quantenhardware ist weit von dieser Größenordnung entfernt und arbeitet mit einigen tausend fehleranfälligen physischen Qubits. Logische Qubits (die Fehler korrigieren und zuverlässige Berechnungen durchführen) erfordern jeweils viele physische Qubits. **Die Lücke zwischen der aktuellen Hardware und dem, was benötigt wird, um die Kryptographie von Ethereum zu brechen, bleibt beträchtlich, schließt sich jedoch schneller als von vielen erwartet.** Bemerkenswerterweise geht das US-amerikanische National Institute of Standards and Technology (NIST) davon aus, ECDSA bis 2030 als veraltet einzustufen und bis 2035 nicht mehr zuzulassen.

Dies ist keine unmittelbare Bedrohung. Aber kryptographische Übergänge dauern Jahre, und das Sicherheitsmodell von Ethereum ist darauf ausgelegt, Jahrhunderte zu überdauern. Die Antwort von Ethereum ist die **Lean Ethereum**-Roadmap, eine bewusste, mehrjährige Mission, um Ethereum um Primitive herum neu aufzubauen, die jeder kryptographischen Bedrohung standhalten werden.

## Vier Bereiche, die anfällig für Quantenangriffe sind {#four-vulnerable-areas}

Im Februar 2026 [veröffentlichte Vitalik Buterin eine Roadmap](https://x.com/VitalikButerin/status/2027075026378543132), die vier verschiedene Bereiche der Kryptographie von Ethereum identifiziert, die Post-Quanten-Upgrades benötigen. Jeder Bereich hat unterschiedliche Herausforderungen und unterschiedliche Lösungswege.

### 1. BLS-Signaturen der Konsensschicht {#consensus-bls}

**Was sie tun**: Das [Proof-of-Stake](/glossary/#pos)-Protokoll von Ethereum verwendet BLS-Signaturen, um die Stimmen von Hunderttausenden von Validatoren zu aggregieren. BLS ermöglicht es, viele Signaturen zu einer einzigen zu kombinieren, wodurch das Netzwerk effizient bleibt.

**Warum sie anfällig sind**: BLS-Signaturen beruhen auf Paarungen elliptischer Kurven, die ein Quantencomputer brechen könnte.

**Der Ansatz**: Die Lean-Consensus-Roadmap umfasst die Entwicklung von zwei sich ergänzenden Werkzeugen:
- **leanXMSS**: Ethereum wird BLS-Signaturen durch leanXMSS ersetzen, ein Hash-basiertes Signaturschema für Validatoren. Hash-basierte Signaturen gelten als quantensicher, da sie sich nur auf die Sicherheit von Hash-Funktionen verlassen, die von Quantencomputern zwar geschwächt, aber nicht gebrochen werden.
- **leanVM**: Eine minimale zkVM (Zero-Knowledge Virtual Machine) für die SNARK-basierte Signaturaggregation. Da Hash-basierte Signaturen deutlich größer sind (etwa 3.000 Bytes im Vergleich zu 96 Bytes bei BLS), würde der Wechsel zu leanXMSS deutlich mehr Daten pro Slot erzeugen. Um dies zu lösen, fungiert leanVM als Aggregations-Engine, die die Daten um das 250-fache komprimiert. Dies bewahrt die Effizienzvorteile der Kombination vieler Signaturen zu einer einzigen, selbst nach dem Wechsel zu quantensicheren Schemata.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Die Aggregationseigenschaft, die BLS effizient macht (die Kombination von Hunderttausenden von Signaturen zu einer einzigen), hat kein offensichtliches quantensicheres Äquivalent. Post-Quanten-Signaturen sind zudem viel größer als BLS-Signaturen. Ein einfacher Austausch würde die Konsensschicht von Ethereum deutlich langsamer und teurer machen. Aus diesem Grund entwickelt das Team leanVM, ein Werkzeug, das Zero-Knowledge-Beweise verwendet, um quantensichere Signaturen effizient zu aggregieren.

</ExpandableCard>

### 2. Datenverfügbarkeit: KZG-Commitments {#data-availability-kzg}

**Was sie tun**: Polynomische KZG-Commitments stellen sicher, dass Daten (insbesondere [Blob](/glossary/#blob)-Daten von Rollups) im Netzwerk verfügbar sind, ohne dass jeder Knoten alles davon herunterladen muss.

**Warum sie anfällig sind**: KZG-Commitments beruhen auf Paarungen elliptischer Kurven, derselben mathematischen Struktur, die Quantencomputer angreifen können.

**Aktuelle Schadensbegrenzung**: KZG-Commitments verwenden ein „Trusted Setup“, bei dem viele Teilnehmer Zufälligkeit beigesteuert haben. Solange mindestens ein Teilnehmer ehrlich war und sein Geheimnis verworfen hat, ist das Setup sicher, selbst gegen Quantencomputer, die versuchen, es im Nachhinein zurückzuentwickeln.

**Langfristige Lösung**: Ersetzen von KZG durch ein quantensicheres Commitment-Schema. Die beiden führenden Kandidaten sind:
- **STARK-basierte Commitments**: Verlassen sich auf Hash-Funktionen anstelle von elliptischen Kurven. Werden bereits in einigen ZK-Rollups verwendet.
- **Gitterbasierte Commitments**: Verlassen sich auf die Schwierigkeit von Gitterproblemen, die als quantenresistent gelten.

Beide Ansätze werden noch auf ihre Effizienz und Praktikabilität in der Größenordnung von Ethereum erforscht.

### 3. Kontosignaturen: ECDSA {#eoa-signatures}

**Was sie tun**: Jedes Standard-Ethereum-Konto (Externally Owned Account oder [EOA](/glossary/#eoa)) verwendet ECDSA auf der secp256k1-Kurve, um Transaktionen zu signieren. Dies schützt Ihre Gelder.

**Warum sie anfällig sind**: Bei jedem Konto, das eine Transaktion gesendet hat, ist der öffentliche Schlüssel onchain offengelegt. Ein Quantencomputer könnte den privaten Schlüssel aus diesen offengelegten Daten des öffentlichen Schlüssels ableiten.

**Wichtige Nuance**: Konten, die nur Ether empfangen und nie eine Transaktion gesendet haben, haben ihren öffentlichen Schlüssel nicht offengelegt. Nur die Adresse (ein Hash des öffentlichen Schlüssels) ist sichtbar, was einen gewissen zusätzlichen Schutz bietet.

**Der Ansatz**: Anstelle einer einzigen protokollweiten Migration plant Ethereum die Nutzung der [Kontoabstraktion](/roadmap/account-abstraction/) (insbesondere EIP-8141, das für Hegotá in der zweiten Hälfte des Jahres 2026 in Betracht gezogen wird), um den Nutzern **Signatur-Agilität** zu bieten. Einzelne Konten könnten zu einem Post-Quanten-Signaturschema wechseln, ohne darauf warten zu müssen, dass sich das gesamte Protokoll ändert.

Dies ist ein pragmatischer Ansatz. Nutzer und Wallets, die frühzeitig einen Post-Quanten-Schutz wünschen, können diesen freiwillig übernehmen, während die breitere Migration im Laufe der Zeit stattfindet.

### 4. ZK-Beweise auf Anwendungsebene {#zk-proofs}

**Was sie tun**: Zero-Knowledge-Beweissysteme werden von L2-Rollups und anderen Anwendungen verwendet, um Berechnungen zu verifizieren, ohne die zugrunde liegenden Daten preiszugeben.

**Warum sie anfällig sind**: Viele beliebte ZK-Beweissysteme (SNARKs, die Paarungen elliptischer Kurven verwenden) beruhen auf quantenanfälligen Annahmen.

**Der Ansatz**: STARKs, die sich auf Hash-Funktionen anstelle von elliptischen Kurven verlassen, sind bereits quantenresistent und werden von mehreren Rollups verwendet. Die natürliche Übernahme von STARK-basierten Systemen im Ökosystem bietet bereits Post-Quanten-Sicherheit auf der Anwendungsebene.

## NIST-Standards {#nist-standards}

Im August 2024 hat das US-amerikanische National Institute of Standards and Technology (NIST) [drei Standards für Post-Quanten-Kryptographie endgültig festgelegt](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Diese sind wichtig, weil sie der gesamten Technologiebranche, einschließlich Ethereum, eine gemeinsame Reihe von geprüften Algorithmen bieten, auf denen aufgebaut werden kann, anstatt dass jedes Projekt seine eigenen erfindet.

| Standard | Name | Typ | Anwendungsfall |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Gitterbasiert | Schlüsselkapselung (Schlüsselaustausch) |
| FIPS 204 | ML-DSA (Dilithium) | Gitterbasiert | Digitale Signaturen |
| FIPS 205 | SLH-DSA (SPHINCS+) | Hash-basiert | Digitale Signaturen |

Diese Standards bilden eine Grundlage für den Post-Quanten-Übergang der gesamten Branche. Die Arbeit von Ethereum baut darauf auf und erweitert sie, mit besonderem Fokus auf die einzigartigen Herausforderungen eines dezentralen Netzwerks, bei dem Effizienz und Aggregation wichtig sind.

## Der Ansatz der Ethereum Foundation {#ef-approach}

Die Ethereum Foundation hat im Januar 2026 ein dediziertes Post-Quantum-Security-Team unter der Leitung von Thomas Coratger gegründet. Die Arbeit des Teams wird öffentlich unter [pq.ethereum.org](https://pq.ethereum.org) verfolgt.

### Aktuelle Aktivitäten (Stand April 2026) {#current-activity}

- **Wöchentliche Interop-Devnets**: Mehr als 10 Client-Teams nehmen an regelmäßigen Post-Quanten-Interoperabilitätstests teil, darunter Lighthouse, Grandine, Zeam, Ream Labs und PierTwo.
- **Poseidon-Preis**: Ein Forschungspreis in Höhe von 1 Million US-Dollar, der auf Verbesserungen bei Hash-basierten kryptographischen Primitiven abzielt.
- **Open-Source-Implementierungen**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) und leanMultisig sind alle unter der [leanEthereum-GitHub-Organisation](https://github.com/leanEthereum) verfügbar.
- **2. jährliches PQ-Forschungs-Retreat**: Geplant vom 9. bis 12. Oktober 2026 in Cambridge, Großbritannien.
- **NIST-Ausrichtung**: Die Arbeit von Ethereum baut auf den Post-Quanten-Kryptographie-Standards auf, die vom NIST im August 2024 endgültig festgelegt wurden (wie ML-KEM, ML-DSA und SLH-DSA).

### Migrationsmeilensteine {#migration-milestones}

Das Team hat eine Reihe von Protokoll-Upgrades skizziert, um Post-Quanten-Kryptographie schrittweise in Ethereum einzuführen. Dies sind Planungsmeilensteine, keine garantierten Zusagen. Namen und Reihenfolge können sich ändern.

| Meilenstein | Was er einführt |
|-----------|--------------------|
| I* | PQ-Schlüsselregistrierung. Validatoren können Post-Quanten-öffentliche Schlüssel neben bestehenden BLS-Schlüsseln registrieren. |
| J* | Precompiles zur PQ-Signaturverifizierung. Smart Contracts und Wallets können PQ-Signaturen nativ verifizieren. |
| L* | PQ-Attestierungen und Echtzeit-Beweise der Konsensschicht über leanVM. Validatoren beginnen, PQ-Signaturen für den Konsens zu verwenden. |
| M* | Vollständige PQ-Signaturaggregation und PQ-sichere Blob-Commitments. |

**Ziel**: Die strukturierten Fork-Meilensteine zielen auf die Fertigstellung der zentralen Post-Quanten-Infrastruktur bis etwa 2029 ab. Die vollständige Migration der Ausführungsschicht und des Ökosystems erstreckt sich darüber hinaus.

## Was müssen Nutzer tun? {#what-users-need-to-do}

**Im Moment: nichts.** Ihre Gelder sind sicher. Kein heutiger Quantencomputer kann die Kryptographie von Ethereum bedrohen.

**In der Zukunft**: Sobald Post-Quanten-Signaturschemata auf Ethereum weithin unterstützt werden (erwartet nach dem Hegotá-Hard-Fork und der Implementierung von EIP-8141), werden Sie Ihr Konto auf quantensichere Signaturen migrieren wollen. Wallet-Software wird Sie durch diesen Übergang führen.

Wenn Ihr Konto noch nie eine Transaktion gesendet hat (was bedeutet, dass Ihr öffentlicher Schlüssel nicht onchain offengelegt wurde), verfügt es über eine zusätzliche Schutzschicht. Aber alle Konten sollten letztendlich migrieren.

Die Frage, wie mit ruhenden Wallets umgegangen werden soll (Konten, deren Eigentümer sich der Notwendigkeit einer Migration möglicherweise nicht bewusst sind), ist ein offenes Governance-Thema. Die Ethereum-Community hat hierüber noch keinen Konsens erzielt.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Nein.** Kein heutiger Quantencomputer kann die Kryptographie von Ethereum brechen. Aktuelle Quantenhardware ist weit von der benötigten Größenordnung entfernt. Die auf dieser Seite beschriebene Arbeit ist eine Vorbereitung auf die Zukunft, keine Reaktion auf eine aktive Bedrohung.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Schätzungen variieren. Die Forschung von Google vom März 2026 legt nahe, dass die Hardware, die zum Brechen der 256-Bit-Kryptographie mit elliptischen Kurven benötigt wird, frühestens gegen Ende dieses Jahrzehnts verfügbar sein könnte, aber es bleiben erhebliche technische Herausforderungen. Die meisten Forscher gehen davon aus, dass eine realistische Bedrohung mindestens noch einige Jahre entfernt ist. Die ehrliche Antwort ist, dass niemand den genauen Zeitplan kennt, weshalb es gerade jetzt wichtig ist, sich vorzubereiten.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Letztendlich ja. Sobald Post-Quanten-Signaturschemata auf Ethereum verfügbar sind, werden Nutzer ihre Konten migrieren wollen. Wallet-Software wird diesen Übergang wahrscheinlich für Sie übernehmen. Im Moment müssen Sie nichts tun. Wenn Handlungsbedarf besteht, werden die Ethereum-Community und die Wallet-Entwickler klare Anleitungen und Werkzeuge bereitstellen.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Vermögenswerte auf Ethereum werden durch Kontosignaturen kontrolliert. Sobald Ihr Konto auf ein quantensicheres Signaturschema migriert ist, ist alles in diesem Konto geschützt. Sie müssen nicht jeden Vermögenswert einzeln migrieren. Smart Contracts, die Gelder halten (wie DeFi-Protokolle), benötigen möglicherweise eigene Upgrades, je nachdem, welche kryptographischen Primitive sie intern verwenden.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Nein. Ethereum hat eines der strukturiertesten Post-Quanten-Programme aller Blockchains: ein dediziertes Team, finanzierte Forschung, wöchentliche Devnets und eine veröffentlichte Migrations-Roadmap, die Quantencomputing als erstklassige Designbeschränkung behandelt. Noch hat keine Blockchain einen vollständigen Post-Quanten-Übergang abgeschlossen. Nach Schätzungen der Ethereum Foundation beträgt das Risiko von Ethereum durch quantenanfällige ruhende Gelder etwa 0,1 %, was drastisch niedriger ist als bei anderen großen Blockchain-Netzwerken.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

„Harvest now, decrypt later“ (Jetzt ernten, später entschlüsseln) ist ein Angriff, bei dem jemand heute verschlüsselte Daten oder offengelegte öffentliche Schlüssel aufzeichnet und die Verschlüsselung später bricht, sobald ein ausreichend leistungsstarker Quantencomputer existiert. Für Ethereum ist dies am relevantesten für Konten, deren öffentliche Schlüssel bereits onchain offengelegt sind (jedes Konto, das eine Transaktion gesendet hat). Dies ist ein Grund, warum die Community die Post-Quanten-Migration als zeitkritisch behandelt, auch wenn die Quantenbedrohung noch nicht unmittelbar bevorsteht.

</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Ethereum Foundation_
- [Post-Quantum Cryptography Project](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [NIST-Standards für Post-Quanten-Kryptographie](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Schutz von Kryptowährungen durch verantwortungsvolle Offenlegung von Quantenschwachstellen](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Quantengrenzen könnten näher sein, als sie scheinen](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG und Trusted Setups](/roadmap/danksharding/#what-is-kzg)
- [Lean Week Cambridge (2025) leanVM + PQ Workshop-Ressourcen](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [PQ-Transaktionssignaturen ACD Breakout Calls](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Ethereum Foundation_
- [PQ-Interop ACD Breakout Calls](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Ethereum Foundation_
- [Lean Ethereum & Post-Quantum Security YouTube-Playlist](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Ethereum Foundation_
- [Panel-Interview zur Post-Quanten-Resistenz](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Kontoabstraktion auf Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _EF Architecture_
- [Superpositioned: Analyse der Quantencomputing-Industrie](https://www.superpositioned.co/) - _Saneel Sreeni_