---
title: Fulu-Osaka (Fusaka)
description: "Erfahren Sie mehr über das Fusaka-Protokoll-Upgrade"
lang: de
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Ethereums mit Spannung erwartetes Fusaka-Upgrade ging am 3. Dezember 2025 live**

Das Fusaka-Netzwerk-Upgrade folgt auf [Pectra](/roadmap/pectra/) und bringt weitere neue Funktionen und verbessert die Erfahrung für jeden [Ethereum](/)-Nutzer und -Entwickler. Der Name setzt sich aus dem Upgrade der Ausführungsebene (Osaka) und der Version der Konsensebene, benannt nach dem Stern Fulu, zusammen. Beide Teile von Ethereum erhalten ein Upgrade, das die Skalierung, Sicherheit und Benutzererfahrung von Ethereum in die Zukunft treibt.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Das Fusaka-Upgrade ist nur ein einzelner Schritt in Ethereums langfristigen Entwicklungszielen. Erfahren Sie mehr über [die Protokoll-Roadmap](/roadmap/) und [frühere Upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Verbesserungen in Fusaka {#improvements-in-fusaka}

### Blobs skalieren {#scale-blobs}

#### PeerDAS {#peerdas}

Dies ist das _Hauptmerkmal_ des Fusaka-Forks, die wichtigste Funktion, die in diesem Upgrade hinzugefügt wurde. Ebene 2s posten ihre Daten derzeit in Blobs auf Ethereum, dem flüchtigen Datentyp, der speziell für Ebene 2s erstellt wurde. Vor Fusaka muss jeder vollständige Blockchain-Knoten jeden Blob speichern, um sicherzustellen, dass die Daten existieren. Da der Blob-Durchsatz steigt, wird das Herunterladen all dieser Daten unhaltbar ressourcenintensiv.

Mit [Datenverfügbarkeits-Sampling (Data Availability Sampling)](https://notes.ethereum.org/@fradamt/das-fork-choice) wird jeder Blockchain-Knoten für eine Teilmenge der Blob-Daten verantwortlich sein, anstatt alle Blob-Daten speichern zu müssen. Blobs werden gleichmäßig und zufällig über die Blockchain-Knoten im Netzwerk verteilt, wobei jeder vollständige Blockchain-Knoten nur 1/8 der Daten hält, was eine theoretische Skalierung um das 8-fache ermöglicht. Um die Verfügbarkeit der Daten sicherzustellen, kann jeder Teil der Daten aus beliebigen vorhandenen 50 % des Ganzen rekonstruiert werden, mit Methoden, die die Wahrscheinlichkeit falscher oder fehlender Daten auf ein kryptografisch vernachlässigbares Niveau senken (\~eins zu 10<sup>20</sup> bis eins zu 10<sup>24</sup>).

Dies hält die Hardware- und Bandbreitenanforderungen für Blockchain-Knoten vertretbar, während die Blob-Skalierung ermöglicht wird, was zu mehr Skalierung mit geringeren Gebühren für Ebene 2s führt.

[Erfahren Sie mehr über PeerDAS](/roadmap/fusaka/peerdas/)

**Ressourcen**:

- [Technische Spezifikation zu EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion über PeerDAS: Scaling Ethereum Today | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademisch: Eine Dokumentation von Ethereums PeerDAS (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Blob-Parameter-Only-Forks {#blob-parameter-only-forks}

Ebene 2s skalieren Ethereum – wenn ihre Netzwerke wachsen, müssen sie mehr Daten auf Ethereum posten. Das bedeutet, dass Ethereum die Anzahl der für sie verfügbaren Blobs im Laufe der Zeit erhöhen muss. Obwohl PeerDAS die Skalierung von Blob-Daten ermöglicht, muss dies schrittweise und sicher erfolgen.

Da Ethereum aus Code besteht, der auf Tausenden von unabhängigen Blockchain-Knoten läuft, die eine Einigung auf dieselben Regeln erfordern, können wir Änderungen wie die Erhöhung der Blob-Anzahl nicht einfach so einführen, wie man ein Website-Update bereitstellt. Jede Regeländerung muss ein koordiniertes Upgrade sein, bei dem jeder Blockchain-Knoten, jede Anwendung und jede Validator-Software vor demselben vorher festgelegten Block aktualisiert wird.

Diese koordinierten Upgrades beinhalten in der Regel viele Änderungen, erfordern viel Testaufwand und das braucht Zeit. Um sich schneller an die sich ändernden Blob-Bedürfnisse der Ebene 2 anzupassen, führen Blob-Parameter-Only-Forks einen Mechanismus ein, um Blobs zu erhöhen, ohne auf diesen Upgrade-Zeitplan warten zu müssen.

Blob-Parameter-Only-Forks können von Anwendungen festgelegt werden, ähnlich wie andere Konfigurationen wie das Gaslimit. Zwischen großen Ethereum-Upgrades können sich Anwendungen darauf einigen, die `target`- und `max`-Blobs auf z. B. 9 und 12 zu erhöhen, und dann werden die Betreiber der Blockchain-Knoten aktualisieren, um an diesem winzigen Fork teilzunehmen. Diese Blob-Parameter-Only-Forks können jederzeit konfiguriert werden.

Als Blobs beim Dencun-Upgrade erstmals zum Netzwerk hinzugefügt wurden, lag das Ziel bei 3. Dies wurde in Pectra auf 6 erhöht und kann nach Fusaka nun unabhängig von diesen großen Netzwerk-Upgrades in einem nachhaltigen Tempo erhöht werden.

![Diagramm, das die durchschnittliche Blob-Anzahl pro Block und steigende Ziele mit Upgrades zeigt](./average-blob-count-per-block.webp)

Diagrammquelle: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Ressourcen**: [Technische Spezifikation zu EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Blob-Grundgebühr begrenzt durch Ausführungskosten {#blob-base-fee-bounded-by-execution-costs}

Ebene 2s zahlen zwei Rechnungen, wenn sie Daten posten: die Blob-Gebühr und das Ausführungs-Gas, das zur Verifizierung dieser Blobs benötigt wird. Wenn das Ausführungs-Gas dominiert, kann die Blob-Gebühren-Auktion auf 1 Wei abrutschen und aufhören, ein Preissignal zu sein.

EIP-7918 legt einen proportionalen Mindestpreis unter jedem Blob fest. Wenn die Reserve höher ist als die nominale Blob-Grundgebühr, behandelt der Gebührenanpassungs-Algorithmus den Block als über dem Ziel liegend, hört auf, die Gebühr nach unten zu drücken, und lässt sie normal ansteigen. Als Ergebnis:

- reagiert der Blob-Gebührenmarkt immer auf Überlastung
- zahlen Ebene 2s zumindest einen bedeutsamen Teil der Rechenleistung, die sie den Blockchain-Knoten aufzwingen
- können Spitzen der Grundgebühr auf der Ausführungsebene (EL) die Blob-Gebühr nicht mehr bei 1 Wei stranden lassen

**Ressourcen**:

- [Technische Spezifikation zu EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Storybook-Erklärung](https://notes.ethereum.org/@anderselowsson/AIG)

### L1 skalieren {#scale-l1}

#### Ablauf der Historie und einfachere Belege {#history-expiry}

Im Juli 2025 begannen Ethereum-Ausführungs-Clients, [den teilweisen Ablauf der Historie zu unterstützen](https://blog.ethereum.org/2025/07/08/partial-history-exp). Dadurch wurde die Historie, die älter als [der Merge](https://ethereum.org/roadmap/merge/) ist, verworfen, um den von den Betreibern der Blockchain-Knoten benötigten Speicherplatz zu reduzieren, während Ethereum weiter wächst.

Dieses EIP befindet sich in einem Abschnitt abseits der „Core EIPs“, da der Fork eigentlich keine Änderungen implementiert – es ist ein Hinweis darauf, dass Anwendungs-Teams den Ablauf der Historie bis zum Fusaka-Upgrade unterstützen müssen. Praktisch gesehen können Anwendungen dies jederzeit implementieren, aber das Hinzufügen zum Upgrade setzte es konkret auf ihre To-Do-Liste und ermöglichte es ihnen, Fusaka-Änderungen in Verbindung mit dieser Funktion zu testen.

**Ressourcen**: [Technische Spezifikation zu EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Obergrenzen für MODEXP festlegen {#set-upper-bounds-for-modexp}

Bisher akzeptierte das MODEXP-Precompile Zahlen von praktisch jeder Größe. Das machte es schwer zu testen, leicht zu missbrauchen und riskant für die Stabilität der Anwendung. EIP-7823 legt eine klare Grenze fest: Jede Eingabezahl darf höchstens 8192 Bit (1024 Byte) lang sein. Alles, was größer ist, wird abgelehnt, das Gas der Transaktion wird verbrannt und es treten keine Zustandsänderungen auf. Es deckt die realen Bedürfnisse sehr komfortabel ab und beseitigt gleichzeitig die extremen Fälle, die die Planung des Gaslimits und Sicherheitsüberprüfungen erschwerten. Diese Änderung bietet mehr Sicherheit und DoS-Schutz, ohne die Benutzer- oder Entwicklererfahrung zu beeinträchtigen.

**Ressourcen**: [Technische Spezifikation zu EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Obergrenze für das Transaktions-Gaslimit {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) fügt eine Obergrenze von 16.777.216 (2^24) Gas pro Transaktion hinzu. Es handelt sich um eine proaktive DoS-Härtung, indem die Worst-Case-Kosten jeder einzelnen Transaktion begrenzt werden, während wir das Block-Gaslimit erhöhen. Es macht die Validierung und Verbreitung einfacher zu modellieren, um es uns zu ermöglichen, die Skalierung durch Erhöhung des Gaslimits in Angriff zu nehmen.

Warum genau 2^24 Gas? Es ist komfortabel kleiner als das heutige Gaslimit, groß genug für echte Vertragsbereitstellungen und schwere Precompiles, und eine Zweierpotenz macht es einfach, es über Anwendungen hinweg zu implementieren. Diese neue maximale Transaktionsgröße ähnelt der durchschnittlichen Blockgröße vor Pectra, was sie zu einem vernünftigen Limit für jede Operation auf Ethereum macht.

**Ressourcen**: [Technische Spezifikation zu EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Erhöhung der Gaskosten für `MODEXP` {#modexp-gas-cost-increase}

MODEXP ist eine integrierte Precompile-Funktion, die die modulare Exponentiation berechnet, eine Art von Großzahlenmathematik, die in der RSA-Signaturverifizierung und in Beweissystemen verwendet wird. Sie ermöglicht es Verträgen, diese Berechnungen direkt auszuführen, ohne sie selbst implementieren zu müssen.

Entwickler und Anwendungs-Teams identifizierten MODEXP als ein Haupthindernis für die Erhöhung des Block-Gaslimits, da die aktuelle Gaspreisgestaltung oft unterschätzt, wie viel Rechenleistung bestimmte Eingaben erfordern. Das bedeutet, dass eine Transaktion, die MODEXP verwendet, den Großteil der Zeit in Anspruch nehmen könnte, die zur Verarbeitung eines gesamten Blocks benötigt wird, was das Netzwerk verlangsamt.

Dieses EIP ändert die Preisgestaltung, um den tatsächlichen Rechenkosten zu entsprechen, indem:

- die Mindestgebühr von 200 auf 500 Gas erhöht und der Ein-Drittel-Rabatt aus EIP-2565 bei der allgemeinen Kostenberechnung entfernt wird
- die Kosten stärker steigen, wenn die Exponenteneingabe sehr lang ist. Wenn der Exponent (die „Potenz“-Zahl, die Sie als zweites Argument übergeben) länger als 32 Byte / 256 Bit ist, steigt die Gasgebühr für jedes zusätzliche Byte viel schneller an
- auch für eine große Basis oder einen großen Modulus extra berechnet wird. Es wird davon ausgegangen, dass die anderen beiden Zahlen (die Basis und der Modulus) mindestens 32 Byte groß sind – wenn eine davon größer ist, steigen die Kosten proportional zu ihrer Größe

Durch eine bessere Anpassung der Kosten an die tatsächliche Verarbeitungszeit kann MODEXP nicht mehr dazu führen, dass die Validierung eines Blocks zu lange dauert. Diese Änderung ist eine von mehreren, die darauf abzielen, es sicher zu machen, das Block-Gaslimit von Ethereum in Zukunft zu erhöhen.

**Ressourcen**: [Technische Spezifikation zu EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### RLP-Ausführungsblock-Größenlimit {#rlp-execution-block-size-limit}

Dies schafft eine Obergrenze dafür, wie groß ein Block sein darf – dies ist ein Limit für das, was über das Netzwerk _gesendet_ wird, und ist getrennt vom Gaslimit, das die _Arbeit_ innerhalb eines Blocks begrenzt. Die Obergrenze für die Blockgröße beträgt 10 MiB, wobei ein kleiner Freibetrag (2 MiB) für Konsensdaten reserviert ist, damit alles sauber passt und sich verbreitet. Wenn ein Block größer als das auftaucht, lehnen die Anwendungen ihn ab.
Dies ist erforderlich, da sehr große Blöcke länger brauchen, um sich über das Netzwerk zu verbreiten und verifiziert zu werden, und Konsensprobleme verursachen oder als DoS-Vektor missbraucht werden können. Außerdem leitet das Gossip-Protokoll der Konsensebene bereits keine Blöcke über ~10 MiB weiter, sodass die Anpassung der Ausführungsebene an dieses Limit seltsame „von einigen gesehen, von anderen verworfen“-Situationen vermeidet.

Die Details: Dies ist eine Obergrenze für die [RLP](/developers/docs/data-structures-and-encoding/rlp/)-codierte Ausführungsblockgröße. Insgesamt 10 MiB, mit einer Sicherheitsmarge von 2 MiB, die für das Beacon-Block-Framing reserviert ist. Praktisch definieren Anwendungen

`MAX_BLOCK_SIZE = 10,485,760` Bytes und

`SAFETY_MARGIN = 2,097,152` Bytes,

und lehnen jeden Ausführungsblock ab, dessen RLP-Nutzlast Folgendes überschreitet:

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Das Ziel ist es, die Worst-Case-Verbreitungs-/Validierungszeit zu begrenzen und sich an das Gossip-Verhalten der Konsensebene anzupassen, wodurch das Reorg-/DoS-Risiko reduziert wird, ohne die Gasabrechnung zu ändern.

**Ressourcen**: [Technische Spezifikation zu EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Standard-Gaslimit auf 60 Millionen festlegen {#set-default-gas-limit-to-60-million}

Vor der Erhöhung des Gaslimits von 30 Mio. auf 36 Mio. im Februar 2025 (und anschließend auf 45 Mio.) hatte sich dieser Wert seit dem Merge (September 2022) nicht geändert. Dieses EIP zielt darauf ab, konsistente Skalierung zu einer Priorität zu machen.

EIP-7935 koordiniert die EL-Anwendungs-Teams, um das Standard-Gaslimit für Fusaka über die heutigen 45 Mio. zu erhöhen. Es ist ein informatives EIP, aber es fordert Anwendungen ausdrücklich auf, höhere Limits in Devnets zu testen, sich auf einen sicheren Wert zu einigen und diese Zahl in ihren Fusaka-Releases auszuliefern.

Die Devnet-Planung zielt auf eine Belastung von ~60 Mio. ab (volle Blöcke mit synthetischer Last) und iterative Erhöhungen; die Forschung besagt, dass Worst-Case-Blockgrößen-Pathologien nicht unter ~150 Mio. binden sollten. Der Rollout sollte mit der Obergrenze für das Transaktions-Gaslimit (EIP-7825) gekoppelt werden, damit keine einzelne Transaktion dominieren kann, wenn die Limits steigen.

**Ressourcen**: [Technische Spezifikation zu EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### UX verbessern {#improve-ux}

#### Deterministische Vorschau auf den Block-Vorschlagenden {#deterministic-proposer-lookahead}

Mit EIP-7917 wird die Beacon Chain über bevorstehende Block-Vorschlagende für die nächste Epoche informiert. Eine deterministische Sicht darauf zu haben, welche Validatoren zukünftige Blöcke vorschlagen werden, kann [Vorkonfirmationen (Preconfirmations)](https://ethresear.ch/t/based-preconfirmations/17353) ermöglichen – eine Verpflichtung mit dem bevorstehenden Vorschlagenden, die garantiert, dass die Benutzer-Transaktion in seinen Block aufgenommen wird, ohne auf den tatsächlichen Block warten zu müssen.

Diese Funktion kommt Anwendungs-Implementierungen und der Sicherheit des Netzwerks zugute, da sie Randfälle verhindert, in denen Validatoren den Zeitplan der Vorschlagenden manipulieren könnten. Die Vorschau ermöglicht auch eine geringere Komplexität der Implementierung.

**Ressourcen**: [Technische Spezifikation zu EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Opcode zum Zählen führender Nullen (CLZ) {#count-leading-zeros-opcode}

Diese Funktion fügt eine kleine EVM-Anweisung hinzu, **führende Nullen zählen (CLZ)**. Fast alles in der EVM wird als 256-Bit-Wert dargestellt – dieser neue Opcode gibt zurück, wie viele Null-Bits sich am Anfang befinden. Dies ist eine gängige Funktion in vielen Befehlssatzarchitekturen, da sie effizientere arithmetische Operationen ermöglicht. In der Praxis fasst dies die heutigen handgeschriebenen Bit-Scans in einem Schritt zusammen, sodass das Finden des ersten gesetzten Bits, das Scannen von Bytes oder das Parsen von Bitfeldern einfacher und billiger wird. Der Opcode hat niedrige, feste Kosten und wurde so gebenchmarkt, dass er mit einer einfachen Addition gleichauf liegt, was den Bytecode trimmt und Gas für die gleiche Arbeit spart.

**Ressourcen**: [Technische Spezifikation zu EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompile für secp256r1-Kurvenunterstützung {#secp256r1-precompile}

Führt einen integrierten secp256r1 (P-256)-Signaturprüfer im Passkey-Stil an der festen Adresse `0x100` ein, der dasselbe Aufrufformat verwendet, das bereits von vielen L2s übernommen wurde, und Randfälle behebt, sodass Verträge, die für diese Umgebungen geschrieben wurden, ohne Änderungen auf L1 funktionieren.

UX-Upgrade! Für Benutzer schaltet dies gerätenatives Signieren und Passkeys frei. Wallets können direkt auf Apple Secure Enclave, Android Keystore, Hardware-Sicherheitsmodule (HSMs) und FIDO2/WebAuthn zugreifen – keine Seed-Phrase, reibungsloseres Onboarding und Multi-Faktor-Abläufe, die sich wie moderne Apps anfühlen. Dies führt zu einer besseren UX, einer einfacheren Wiederherstellung und Kontoabstraktionsmustern, die dem entsprechen, was Milliarden von Geräten bereits tun.

Für Entwickler nimmt es eine 160-Byte-Eingabe und gibt eine 32-Byte-Ausgabe zurück, was es einfach macht, bestehende Bibliotheken und L2-Verträge zu portieren. Unter der Haube enthält es Point-at-Infinity- und modulare Vergleichsprüfungen, um knifflige Randfälle zu eliminieren, ohne gültige Aufrufer zu beeinträchtigen.

**Ressourcen**:

- [Technische Spezifikation zu EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Mehr über RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Beachten Sie, dass EIP-7951 RIP-7212 ersetzt hat)_

### Meta {#meta}

#### `eth_config` JSON-RPC-Methode {#eth-config}

Dies ist ein JSON-RPC-Aufruf, der es Ihnen ermöglicht, Ihren Blockchain-Knoten zu fragen, welche Fork-Einstellungen Sie ausführen. Er gibt drei Snapshots zurück: `current`, `next` und `last`, sodass Validatoren und Überwachungstools überprüfen können, ob Anwendungen für einen bevorstehenden Fork aufgestellt sind.

Praktisch gesehen soll dies einen Mangel beheben, der entdeckt wurde, als der Pectra-Fork Anfang 2025 im Holesky-Testnet mit geringfügigen Fehlkonfigurationen live ging, was zu einem nicht finalisierenden Zustand führte. Dies hilft Testteams und Entwicklern sicherzustellen, dass sich große Forks wie erwartet verhalten, wenn sie von Devnets zu Testnets und von Testnets zum Mainnet wechseln.

Snapshots umfassen: `chainId`, `forkId`, geplante Fork-Aktivierungszeit, welche Precompiles aktiv sind, Precompile-Adressen, Systemvertragsabhängigkeiten und den Blob-Zeitplan des Forks.

Dieses EIP befindet sich in einem Abschnitt abseits der „Core EIPs“, da der Fork eigentlich keine Änderungen implementiert – es ist ein Hinweis darauf, dass Anwendungs-Teams diese JSON-RPC-Methode bis zum Fusaka-Upgrade implementieren müssen.

**Ressourcen**: [Technische Spezifikation zu EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Betrifft dieses Upgrade alle Ethereum-Blockchain-Knoten und Validatoren? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ja, das Fusaka-Upgrade erfordert Updates sowohl für [Ausführungs-Clients als auch für Konsens-Clients](/developers/docs/nodes-and-clients/). Alle wichtigen Ethereum-Anwendungen werden Versionen veröffentlichen, die den Hard Fork unterstützen und als hohe Priorität markiert sind. Sie können sich darüber auf dem Laufenden halten, wann diese Releases in den GitHub-Repos der Anwendungen, ihren [Discord-Kanälen](https://ethstaker.org/support), dem [EthStaker Discord](https://dsc.gg/ethstaker) verfügbar sein werden, oder indem Sie den Ethereum-Blog für Protokoll-Updates abonnieren. Um die Synchronisation mit dem Ethereum-Netzwerk nach dem Upgrade aufrechtzuerhalten, müssen Betreiber von Blockchain-Knoten sicherstellen, dass sie eine unterstützte Anwendungsversion ausführen. Beachten Sie, dass die Informationen zu Anwendungs-Releases zeitkritisch sind und Benutzer sich für die aktuellsten Details auf die neuesten Updates beziehen sollten.

### Wie kann ETH nach dem Hard Fork konvertiert werden? {#how-can-eth-be-converted-after-the-hardfork}

- **Keine Aktion für Ihre ETH erforderlich**: Nach dem Ethereum-Fusaka-Upgrade besteht keine Notwendigkeit, Ihre ETH zu konvertieren oder zu aktualisieren. Ihre Kontostände bleiben gleich und die ETH, die Sie derzeit halten, bleiben nach dem Hard Fork in ihrer bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Sie müssen im Zusammenhang mit diesem Upgrade nichts tun. Ihre Vermögenswerte bleiben völlig unberührt. Denken Sie daran, dass es die beste Verteidigung gegen Betrug ist, informiert zu bleiben.

[Mehr zum Erkennen und Vermeiden von Betrug](/security/)

### Was hat es mit den Zebras auf sich? <Emoji text="🦓" /> {#whats-with-the-zebras}

Ein Zebra ist das von den Entwicklern gewählte „Maskottchen“ von Fusaka, da seine Streifen das spaltenbasierte Datenverfügbarkeits-Sampling von PeerDAS widerspiegeln, bei dem Blockchain-Knoten bestimmte Spalten-Subnetze verwahren und einige andere Spalten aus dem Slot jedes Peers abtasten, um zu überprüfen, ob Blob-Daten verfügbar sind.

Der Merge im Jahr 2022 [verwendete einen Panda](https://x.com/hwwonx/status/1431970802040127498) als Maskottchen, um die Verbindung der Ausführungs- und Konsensebenen zu signalisieren. Seitdem wurden für jeden Fork informell Maskottchen ausgewählt, die zum Zeitpunkt des Upgrades als ASCII-Kunst in den Anwendungs-Protokollen (Logs) auftauchen. Es ist einfach eine lustige Art zu feiern.

### Welche Verbesserungen sind für die L2-Skalierung enthalten? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) ist das Hauptmerkmal des Forks. Es implementiert Datenverfügbarkeits-Sampling (DAS), das mehr Skalierbarkeit für Rollups freischaltet und den Blob-Speicherplatz theoretisch auf das 8-fache der aktuellen Größe skaliert. Der Blob-Gebührenmarkt wird ebenfalls verbessert, um effizient auf Überlastungen zu reagieren und zu garantieren, dass L2s eine angemessene Gebühr für die Rechenleistung und den Speicherplatz zahlen, die Blobs den Blockchain-Knoten auferlegen.

### Wie unterscheiden sich BPO-Forks? {#how-are-bpo-forks-different}

Blob-Only-Parameter-Forks bieten einen Mechanismus, um die Blob-Anzahl (sowohl Ziel als auch Maximum) nach der Aktivierung von PeerDAS kontinuierlich zu erhöhen, ohne auf ein vollständig koordiniertes Upgrade warten zu müssen. Jede Erhöhung ist fest codiert, um in Anwendungs-Releases, die Fusaka unterstützen, vorkonfiguriert zu sein.

Als Benutzer oder Validator müssen Sie Ihre Anwendungen nicht für jedes BPO aktualisieren und nur sicherstellen, dass Sie großen Hard Forks wie Fusaka folgen. Dies ist die gleiche Praxis wie zuvor, es sind keine besonderen Maßnahmen erforderlich. Es wird dennoch empfohlen, Ihre Anwendungen rund um Upgrades und BPOs zu überwachen und sie auch zwischen großen Releases auf dem neuesten Stand zu halten, da Fixes oder Optimierungen auf den Hard Fork folgen könnten.

### Wie sieht der BPO-Zeitplan aus? {#what-is-the-bpo-schedule}

Der genaue Zeitplan der BPO-Updates wird mit den Fusaka-Releases festgelegt. Verfolgen Sie die [Protokoll-Ankündigungen](https://blog.ethereum.org/category/protocol) und die Release-Notes Ihrer Anwendungen.

Beispiel dafür, wie es aussehen könnte:

- Vor Fusaka: Ziel 6, max 9
- Bei Fusaka-Aktivierung: Ziel 6, max 9
- BPO1, wenige Wochen nach Fusaka-Aktivierung: Ziel 10, max 15, Erhöhung um zwei Drittel
- BPO2, wenige Wochen nach BPO1: Ziel 14, max 21

### Wird dies die Gebühren auf Ethereum (Ebene 1) senken? {#will-this-lower-gas}

Dieses Upgrade senkt die Gasgebühren auf L1 nicht, zumindest nicht direkt. Das Hauptaugenmerk liegt auf mehr Blob-Speicherplatz für Rollup-Daten, wodurch die Gebühren auf Ebene 2 gesenkt werden. Dies könnte einige Nebenwirkungen auf den L1-Gebührenmarkt haben, aber es wird keine signifikante Änderung erwartet.

### Was muss ich als Staker für das Upgrade tun? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Wie bei jedem Netzwerk-Upgrade sollten Sie sicherstellen, dass Sie Ihre Anwendungen auf die neuesten Versionen aktualisieren, die mit Fusaka-Unterstützung gekennzeichnet sind. Verfolgen Sie Updates in der Mailingliste und den [Protokoll-Ankündigungen auf dem EF-Blog](https://blog.ethereum.org/category/protocol), um über Releases informiert zu werden.
Um Ihr Setup zu validieren, bevor Fusaka im Mainnet aktiviert wird, können Sie einen Validator in Testnets ausführen. Fusaka wird [früher in Testnets aktiviert](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), was Ihnen mehr Zeit gibt, um sicherzustellen, dass alles funktioniert, und Fehler zu melden. Testnet-Forks werden ebenfalls in der Mailingliste und im Blog angekündigt.

### Betrifft die „Deterministische Vorschau auf den Block-Vorschlagenden“ (EIP-7917) Validatoren? {#does-7917-affect-validators}

Diese Änderung ändert nicht, wie Ihre Validator-Anwendung funktioniert, sie bietet jedoch mehr Einblick in die Zukunft Ihrer Validator-Aufgaben. Stellen Sie sicher, dass Sie Ihre Überwachungstools aktualisieren, um mit den neuen Funktionen Schritt zu halten.

### Wie wirkt sich Fusaka auf die Bandbreitenanforderungen für Blockchain-Knoten und Validatoren aus? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS bewirkt eine signifikante Änderung darin, wie Blockchain-Knoten Blob-Daten übertragen. Alle Daten werden in Teile, sogenannte Spalten, über 128 Subnetze aufgeteilt, wobei Blockchain-Knoten nur einige davon abonnieren. Die Menge der Subnetz-Spalten, die Blockchain-Knoten verwahren müssen, hängt von ihrer Konfiguration und der Anzahl der verbundenen Validatoren ab. Die tatsächlichen Bandbreitenanforderungen hängen von der Menge der im Netzwerk zulässigen Blobs und der Art des Blockchain-Knotens ab. Zum Zeitpunkt der Fusaka-Aktivierung bleibt das Blob-Ziel dasselbe wie zuvor, aber mit PeerDAS können Betreiber von Blockchain-Knoten einen Rückgang ihrer Festplattennutzung durch Blobs und des Netzwerkverkehrs feststellen. Da BPOs eine höhere Anzahl von Blobs im Netzwerk konfigurieren, wird die erforderliche Bandbreite mit jedem BPO steigen.

Die Anforderungen an Blockchain-Knoten liegen auch nach Fusaka-BPOs noch innerhalb der [empfohlenen Margen](https://eips.ethereum.org/EIPS/eip-7870).

#### Vollständige Blockchain-Knoten {#full-nodes}

Reguläre Blockchain-Knoten ohne Validatoren abonnieren nur 4 Subnetze und übernehmen die Verwahrung für 1/8 der ursprünglichen Daten. Das bedeutet, dass bei gleicher Menge an Blob-Daten die Bandbreite des Blockchain-Knotens zum Herunterladen um den Faktor acht (8) geringer wäre. Die Festplattennutzung und die Download-Bandbreite von Blobs für einen normalen vollständigen Blockchain-Knoten könnten um etwa 80 % auf nur wenige MB sinken.

#### Solo-Staker {#solo-stakers}

Wenn der Blockchain-Knoten für eine Validator-Anwendung verwendet wird, muss er mehr Spalten verwahren und daher mehr Daten verarbeiten. Wenn ein Validator hinzugefügt wird, abonniert der Blockchain-Knoten mindestens 8 Spalten-Subnetze und verarbeitet daher doppelt so viele Daten wie ein regulärer Blockchain-Knoten, aber immer noch weniger als vor Fusaka. Wenn das Validator-Guthaben über 287 ETH liegt, werden immer mehr Subnetze abonniert.

Für einen Solo-Staker bedeutet dies, dass seine Festplattennutzung und Download-Bandbreite um etwa 50 % sinken werden. Um jedoch Blöcke lokal zu erstellen und alle Blobs in das Netzwerk hochzuladen, wird mehr Upload-Bandbreite benötigt. Lokale Builder werden zum Zeitpunkt von Fusaka eine 2- bis 3-mal höhere Upload-Bandbreite als zuvor benötigen, und mit dem BPO2-Ziel von 15/21 Blobs muss die endgültig erforderliche Upload-Bandbreite etwa 5-mal höher sein, bei 100 Mbit/s.

#### Große Validatoren {#large-validators}

Die Anzahl der abonnierten Subnetze wächst mit mehr Guthaben und Validatoren, die dem Blockchain-Knoten hinzugefügt werden. Bei einem Guthaben von etwa 800 ETH verwahrt der Blockchain-Knoten beispielsweise 25 Spalten und benötigt etwa 30 % mehr Download-Bandbreite als zuvor. Der erforderliche Upload steigt ähnlich wie bei regulären Blockchain-Knoten und es sind mindestens 100 Mbit/s erforderlich.

Bei 4096 ETH, 2 Validatoren mit maximalem Guthaben, wird der Blockchain-Knoten zu einem „Supernode“, der alle Spalten verwahrt und daher alles herunterlädt und speichert. Diese Blockchain-Knoten heilen das Netzwerk aktiv, indem sie fehlende Daten zurücksteuern, benötigen aber auch viel mehr Bandbreite und Speicherplatz. Da das endgültige Blob-Ziel 6-mal höher ist als zuvor, müssen Supernodes etwa 600 GB zusätzliche Blob-Daten speichern und über eine schnellere anhaltende Download-Bandbreite von etwa 20 Mbit/s verfügen.

[Lesen Sie weitere Details zu den erwarteten Anforderungen.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Welche EVM-Änderungen werden implementiert? {#what-evm-changes-are-implemented}

Fusaka festigt die EVM mit neuen kleineren Änderungen und Funktionen.

- Für die Sicherheit während der Skalierung wird die maximale Größe einer einzelnen Transaktion auf 16,7 Millionen Gas-Einheiten [begrenzt](https://eips.ethereum.org/EIPS/eip-7825).
- [Der neue Opcode zum Zählen führender Nullen (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) wird zur EVM hinzugefügt und wird es Smart-Contract-Sprachen ermöglichen, bestimmte Operationen effizienter auszuführen.
- [Die Kosten für das `ModExp`-Precompile werden erhöht](https://eips.ethereum.org/EIPS/eip-7883) – Verträge, die es verwenden, werden mehr Gas für die Ausführung berechnen.

### Wie wirkt sich das neue 16M-Gaslimit auf Vertragsentwickler aus? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka führt ein Limit für die [maximale Größe einer einzelnen Transaktion von 16,7 Millionen](https://eips.ethereum.org/EIPS/eip-7825) (2^24) Gas-Einheiten ein. Dies entspricht in etwa der bisherigen Größe eines durchschnittlichen Blocks, was ihn groß genug macht, um komplexe Transaktionen aufzunehmen, die einen gesamten Block verbrauchen würden. Dieses Limit schafft Schutz für Anwendungen und verhindert potenzielle DoS-Angriffe in der Zukunft mit einem höheren Block-Gaslimit. Das Ziel der Skalierung ist es, mehr Transaktionen in die Blockchain zu bringen, ohne dass eine einzige den gesamten Block verbraucht.

Reguläre Benutzer-Transaktionen sind weit davon entfernt, dieses Limit zu erreichen. Bestimmte Randfälle wie große und komplexe DeFi-Operationen, große Smart-Contract-Bereitstellungen oder Batch-Transaktionen, die auf mehrere Verträge abzielen, könnten von dieser Änderung betroffen sein. Diese Transaktionen müssen in kleinere aufgeteilt oder auf andere Weise optimiert werden. Verwenden Sie Simulationen, bevor Sie Transaktionen einreichen, die potenziell das Limit erreichen.

Die RPC-Methode `eth_call` ist nicht begrenzt und ermöglicht die Simulation größerer Transaktionen als das tatsächliche Blockchain-Limit. Das tatsächliche Limit für RPC-Methoden kann vom Anwendungs-Betreiber konfiguriert werden, um Missbrauch zu verhindern.

### Was bedeutet CLZ für Entwickler? {#what-clz-means-for-developers}

EVM-Compiler wie Solidity werden die neue Funktion zum Zählen von Nullen unter der Haube implementieren und nutzen. Neue Verträge könnten von Gaseinsparungen profitieren, wenn sie auf diese Art von Operation angewiesen sind. Verfolgen Sie Releases und Funktionsankündigungen der Smart-Contract-Sprache für Dokumentationen zu potenziellen Einsparungen.

### Gibt es Änderungen für meine bestehenden Smart Contracts? {#what-clz-means-for-developers}

Fusaka hat keine direkten Auswirkungen, die bestehende Verträge beschädigen oder ihr Verhalten ändern würden. Änderungen, die auf der Ausführungsebene eingeführt werden, erfolgen mit Abwärtskompatibilität, behalten Sie jedoch immer Randfälle und potenzielle Auswirkungen im Auge.

[Mit den erhöhten Kosten für das `ModExp`-Precompile](https://eips.ethereum.org/EIPS/eip-7883) werden Verträge, die davon abhängen, mehr Gas für die Ausführung verbrauchen. Wenn Ihr Vertrag stark darauf angewiesen ist und für Benutzer teurer wird, überdenken Sie, wie er genutzt wird.

Berücksichtigen Sie das [neue Limit von 16,7 Millionen](https://eips.ethereum.org/EIPS/eip-7825), wenn Transaktionen, die Ihre Verträge ausführen, eine ähnliche Größe erreichen könnten.

## Weiterführende Literatur {#further-reading}

- [Ethereum-Roadmap](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Fusaka-Testnet-Blog-Ankündigung](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Was Fusaka & Pectra für Ethereum bringen werden](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereums nächste Upgrades: Fusaka, Glamsterdam & Beyond mit Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs erklärt](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)