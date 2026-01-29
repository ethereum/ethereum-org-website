---
title: Fulu-Osaka (Fusaka)
description: "Erfahren Sie mehr über das Fusaka-Protokoll-Upgrade"
lang: de
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Das mit Spannung erwartete Fusaka-Upgrade von Ethereum wurde am 3. Dezember 2025 live geschaltet**

Das Fusaka-Netzwerk-Upgrade folgt auf [Pectra](/roadmap/pectra/) und bringt weitere neue Funktionen und verbessert die Erfahrung für jeden Ethereum-Benutzer und -Entwickler. Der Name besteht aus dem Osaka-Upgrade der Ausführungsebene und der Version der Konsensebene, die nach dem Fulu-Stern benannt ist. Beide Teile von Ethereum erhalten ein Upgrade, das die Skalierung, Sicherheit und Benutzererfahrung von Ethereum in die Zukunft treibt.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Das Fusaka-Upgrade ist nur ein einziger Schritt in den langfristigen Entwicklungszielen von Ethereum. Erfahren Sie mehr über den [Protokoll-Fahrplan](/roadmap/) und [frühere Upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Verbesserungen in Fusaka {#improvements-in-fusaka}

### Skalierungs-Blobs {#scale-blobs}

#### PeerDAS {#peerdas}

Dies ist der _Headliner_ der Fusaka-Abspaltung, das Hauptmerkmal, das in diesem Upgrade hinzugefügt wurde. Layer 2s posten ihre Daten derzeit in Blobs an Ethereum, dem kurzlebigen Datentyp, der speziell für Layer 2s entwickelt wurde. Vor Fusaka muss jeder Full Node jeden Blob speichern, um sicherzustellen, dass die Daten vorhanden sind. Mit steigendem Blob-Durchsatz wird das Herunterladen all dieser Daten unhaltbar ressourcenintensiv.

Mit dem [Data Availability Sampling](https://notes.ethereum.org/@fradamt/das-fork-choice) ist jeder Knoten anstelle der Speicherung aller Blob-Daten für eine Teilmenge der Blob-Daten verantwortlich. Blobs werden gleichmäßig zufällig auf die Nodes im Netzwerk verteilt, wobei jeder Full Node nur 1/8 der Daten enthält, was eine theoretische Skalierung um das 8-fache ermöglicht. Um die Verfügbarkeit der Daten zu gewährleisten, kann jeder Teil der Daten aus beliebigen 50 % des Ganzen mit Methoden rekonstruiert werden, die die Wahrscheinlichkeit falscher oder fehlender Daten auf ein kryptographisch vernachlässigbares Niveau senken (~eins zu 10<sup>20</sup> bis eins zu 10<sup>24</sup>).

Dies hält die Hardware- und Bandbreitenanforderungen für Nodes tragbar und ermöglicht gleichzeitig die Skalierung von Blobs, was zu mehr Skalierung bei geringeren Gebühren für Layer 2s führt.

[Erfahren Sie mehr über PeerDAS](/roadmap/fusaka/peerdas/)

**Ressourcen**:

- [Technische Spezifikation von EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion über PeerDAS: Skalierung von Ethereum heute | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademisch: Eine Dokumentation von Ethereums PeerDAS (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Nur-Blob-Parameter-Abspaltungen {#blob-parameter-only-forks}

Layer 2s skalieren Ethereum – während ihre Netzwerke wachsen, müssen sie mehr Daten an Ethereum senden. Das bedeutet, dass Ethereum die Anzahl der für sie verfügbaren Blobs im Laufe der Zeit erhöhen muss. Obwohl PeerDAS die Skalierung von Blob-Daten ermöglicht, muss dies schrittweise und sicher erfolgen.

Da Ethereum Code ist, der auf Tausenden von unabhängigen Nodes läuft, die sich auf dieselben Regeln einigen müssen, können wir Änderungen wie die Erhöhung der Blob-Anzahl nicht einfach so einführen, wie Sie ein Website-Update bereitstellen. Jede Regeländerung muss ein koordiniertes Upgrade sein, bei dem jede Node, jeder Client und jede Validator-Software vor demselben vorbestimmten Block aktualisiert wird.

Diese koordinierten Upgrades umfassen in der Regel viele Änderungen, erfordern viel Testaufwand und das braucht Zeit. Um sich schneller an die sich ändernden Anforderungen von Layer 2-Blobs anzupassen, führen Nur-Blob-Parameter-Abspaltungen einen Mechanismus ein, um die Anzahl der Blobs zu erhöhen, ohne auf diesen Upgrade-Zeitplan warten zu müssen.

Nur-Blob-Parameter-Abspaltungen können von Clients festgelegt werden, ähnlich wie andere Konfigurationen wie das Gas-Limit. Zwischen größeren Ethereum-Upgrades können sich Clients darauf einigen, die „Ziel“- und „Maximal“-Blobs auf z. B. 9 und 12 zu erhöhen, und dann werden die Node-Betreiber ein Update durchführen, um an dieser winzigen Abspaltung teilzunehmen. Diese Nur-Blob-Parameter-Abspaltungen können jederzeit konfiguriert werden.

Als Blobs im Dencun-Upgrade zum ersten Mal zum Netzwerk hinzugefügt wurden, war das Ziel 3. Das wurde in Pectra auf 6 erhöht und nach Fusaka kann das nun mit einer nachhaltigen Rate unabhängig von diesen großen Netzwerk-Upgrades erhöht werden.

![Diagramm, das die durchschnittliche Blob-Anzahl pro Block und die steigenden Ziele mit Upgrades zeigt](./average-blob-count-per-block.webp)

Quellgrafik: [Ethereum Blobs – @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Ressourcen**: [Technische Spezifikation von EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Blob-Basisgebühr begrenzt durch Ausführungskosten {#blob-base-fee-bounded-by-execution-costs}

Layer 2s bezahlen zwei Rechnungen, wenn sie Daten posten: die Blob-Gebühr und das Ausführungsgas, das zur Überprüfung dieser Blobs benötigt wird. Wenn das Ausführungsgas dominiert, kann die Blob-Gebührenauktion auf 1 Wei absinken und aufhören, ein Preissignal zu sein.

EIP-7918 legt einen proportionalen Mindestpreis für jeden Blob fest. Wenn der Mindestpreis höher ist als die nominale Blob-Basisgebühr, behandelt der Gebührenanpassungsalgorithmus den Block als über dem Ziel liegend, hört auf, die Gebühr zu senken, und lässt sie normal ansteigen. Als Ergebnis:

- reagiert der Blob-Gebührenmarkt immer auf Überlastung
- Layer 2s zahlen mindestens einen nennenswerten Teil der Rechenleistung, die sie den Nodes aufzwingen
- Spitzen in der Basisgebühr auf dem EL können die Blob-Gebühr nicht mehr bei 1 Wei stranden lassen

**Ressourcen**:

- [Technische Spezifikation von EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Storybook-Erklärung](https://notes.ethereum.org/@anderselowsson/AIG)

### L1 skalieren {#scale-l1}

#### Ablauf der Historie und einfachere Belege {#history-expiry}

Im Juli 2025 begannen Ethereum Execution Clients, [den teilweisen Ablauf des Verlaufs zu unterstützen](https://blog.ethereum.org/2025/07/08/partial-history-exp). Dadurch wurde der Verlauf, der älter als [The Merge](https://ethereum.org/roadmap/merge/) war, verworfen, um den von Node-Betreibern benötigten Speicherplatz zu reduzieren, da Ethereum weiter wächst.

Dieses EIP befindet sich in einem separaten Abschnitt von den „Core EIPs“, da die Abspaltung keine tatsächlichen Änderungen implementiert – es ist ein Hinweis darauf, dass Client-Teams den Ablauf des Verlaufs bis zum Fusaka-Upgrade unterstützen müssen. Praktisch können Clients dies jederzeit implementieren, aber das Hinzufügen zum Upgrade hat es konkret auf ihre To-Do-Liste gesetzt und ihnen ermöglicht, Fusaka-Änderungen in Verbindung mit dieser Funktion zu testen.

**Ressourcen**: [Technische Spezifikation von EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Obergrenzen für MODEXP festlegen {#set-upper-bounds-for-modexp}

Bisher akzeptierte der MODEXP-Precompile Zahlen von praktisch jeder Größe. Das machte es schwer zu testen, leicht zu missbrauchen und riskant für die Stabilität des Clients. EIP-7823 setzt eine klare Grenze: Jede Eingabezahl darf höchstens 8192 Bit (1024 Bytes) lang sein. Alles, was größer ist, wird abgelehnt, das Gas der Transaktion wird verbrannt und es treten keine Zustandsänderungen auf. Es deckt die realen Bedürfnisse sehr komfortabel ab und entfernt gleichzeitig die Extremfälle, die die Gaslimitplanung und Sicherheitsüberprüfungen kompliziert haben. Diese Änderung bietet mehr Sicherheit und DoS-Schutz, ohne die Benutzer- oder Entwicklererfahrung zu beeinträchtigen.

**Ressourcen**: [Technische Spezifikation von EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Obergrenze des Transaktions-Gas-Limits {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) fügt eine Obergrenze von 16.777.216 (2^24) Gas pro Transaktion hinzu. Es handelt sich um eine proaktive DoS-Härtung, indem die Worst-Case-Kosten einer einzelnen Transaktion begrenzt werden, während wir das Block-Gaslimit erhöhen. Es erleichtert die Modellierung von Validierung und Weitergabe, sodass wir die Skalierung durch Anhebung des Gaslimits angehen können.

Warum genau 2^24 Gas? Es ist komfortabel kleiner als das heutige Gaslimit, groß genug für echte Vertragsbereitstellungen und schwere Precompiles, und eine Zweierpotenz erleichtert die Implementierung über alle Clients hinweg. Diese neue maximale Transaktionsgröße ähnelt der durchschnittlichen Blockgröße vor Pectra, was sie zu einem angemessenen Limit für jede Operation auf Ethereum macht.

**Ressourcen**: [Technische Spezifikation von EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### `MODEXP`-Gaskostenerhöhung {#modexp-gas-cost-increase}

MODEXP ist eine vorübersetzte eingebaute Funktion, die modulare Exponentiation berechnet, eine Art von Großzahlmathematik, die bei der RSA-Signaturüberprüfung und Beweissystemen verwendet wird. Sie ermöglicht es Verträgen, diese Berechnungen direkt auszuführen, ohne sie selbst implementieren zu müssen.

Entwickler- und Client-Teams identifizierten MODEXP als ein großes Hindernis für die Erhöhung des Block-Gaslimits, da die aktuelle Gaspreisgestaltung oft unterschätzt, wie viel Rechenleistung bestimmte Eingaben erfordern. Das bedeutet, dass eine Transaktion, die MODEXP verwendet, den größten Teil der Zeit in Anspruch nehmen könnte, die für die Verarbeitung eines ganzen Blocks benötigt wird, und das Netzwerk verlangsamen würde.

Dieses EIP ändert die Preisgestaltung, um den realen Berechnungskosten zu entsprechen, indem es:

- die Mindestgebühr von 200 auf 500 Gas anhebt und den Ein-Drittel-Rabatt aus EIP-2565 auf die allgemeine Kostenberechnung entfernt
- die Kosten stärker anhebt, wenn die Exponenteneingabe sehr lang ist. Wenn der Exponent (die „Potenzzahl“, die Sie als zweites Argument übergeben) länger als 32 Bytes / 256 Bits ist, steigen die Gasgebühren für jedes zusätzliche Byte viel schneller.
- auch eine große Basis oder ein großer Modul extra berechnet wird. Die anderen beiden Zahlen (die Basis und der Modul) werden als mindestens 32 Bytes angenommen – wenn eine der beiden größer ist, steigen die Kosten proportional zu ihrer Größe.

Durch die bessere Anpassung der Kosten an die tatsächliche Verarbeitungszeit kann MODEXP nicht mehr dazu führen, dass die Validierung eines Blocks zu lange dauert. Diese Änderung ist eine von mehreren, die darauf abzielen, das Block-Gaslimit von Ethereum in Zukunft sicher zu erhöhen.

**Ressourcen**: [Technische Spezifikation von EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### RLP-Ausführungsblockgrößenlimit {#rlp-execution-block-size-limit}

Dies schafft eine Obergrenze dafür, wie groß ein Block sein darf – dies ist eine Grenze für das, was über das Netzwerk _gesendet_ wird, und ist getrennt vom Gaslimit, das die _Arbeit_ innerhalb eines Blocks begrenzt. Die Obergrenze für die Blockgröße beträgt 10 MiB, mit einer kleinen Reserve (2 MiB) für Konsensdaten, damit alles passt und sauber weitergegeben wird. Wenn ein Block größer als das auftaucht, lehnen ihn die Clients ab.
Dies ist erforderlich, da sehr große Blöcke länger brauchen, um sich über das Netzwerk zu verbreiten und verifiziert zu werden, und Konsensprobleme verursachen oder als DoS-Vektor missbraucht werden können. Außerdem leitet das Gossip der Konsensebene bereits keine Blöcke über ~10 MiB weiter, sodass die Anpassung der Ausführungsebene an dieses Limit seltsame „von einigen gesehen, von anderen verworfen“-Situationen vermeidet.

Die Einzelheiten: Dies ist eine Obergrenze für die [RLP](/developers/docs/data-structures-and-encoding/rlp/)-codierte Ausführungsblockgröße. 10 MiB insgesamt, mit einem Sicherheitsmarge von 2 MiB, die für das Beacon-Block-Framing reserviert ist. Praktisch definieren Clients

`MAX_BLOCK_SIZE = 10.485.760` Bytes und

`SAFETY_MARGIN = 2.097.152` Bytes,

und lehnen jeden Ausführungsblock ab, dessen RLP-Payload Folgendes übersteigt:

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Ziel ist es, die Worst-Case-Verbreitungs-/Validierungszeit zu begrenzen und sich an das Gossip-Verhalten der Konsensebene anzupassen, um das Reorg-/DoS-Risiko zu reduzieren, ohne die Gasabrechnung zu ändern.

**Ressourcen**: [Technische Spezifikation von EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Standard-Gaslimit auf 60 Millionen festlegen {#set-default-gas-limit-to-60-million}

Vor der Erhöhung des Gaslimits von 30 Mio. auf 36 Mio. im Februar 2025 (und anschließend auf 45 Mio.) hatte sich dieser Wert seit dem Merge (September 2022) nicht geändert. Dieses EIP zielt darauf ab, eine konsistente Skalierung zu einer Priorität zu machen.

EIP-7935 koordiniert die EL-Client-Teams, um das Standard-Gaslimit über die heutigen 45 Mio. für Fusaka anzuheben. Es ist ein informatives EIP, aber es fordert Clients explizit auf, höhere Limits auf Devnets zu testen, sich auf einen sicheren Wert zu einigen und diese Zahl in ihren Fusaka-Releases zu liefern.

Die Devnet-Planung zielt auf ~60 Mio. Stress (volle Blöcke mit synthetischer Last) und iterative Erhöhungen ab; die Forschung besagt, dass Worst-Case-Blockgrößenpathologien nicht unter ~150 Mio. binden sollten. Die Einführung sollte mit der Obergrenze des Transaktionsgaslimits (EIP-7825) gekoppelt werden, damit keine einzelne Transaktion dominieren kann, wenn die Limits steigen.

**Ressourcen**: [Technische Spezifikation von EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### UX verbessern {#improve-ux}

#### Deterministische Proposer-Vorschau {#deterministic-proposer-lookahead}

Mit EIP-7917 wird die Beacon Chain über die bevorstehenden Block Proposer für die nächste Epoche informiert. Eine deterministische Sicht darauf, welche Validatoren zukünftige Blöcke vorschlagen werden, kann [Vorbestätigungen](https://ethresear.ch/t/based-preconfirmations/17353) ermöglichen – eine Verpflichtung mit dem kommenden Proposer, die garantiert, dass die Benutzertransaktion in ihren Block aufgenommen wird, ohne auf den eigentlichen Block zu warten.

Diese Funktion kommt den Client-Implementierungen und der Sicherheit des Netzwerks zugute, da sie Edge Cases verhindert, in denen Validatoren den Proposer-Zeitplan manipulieren könnten. Die Vorschau ermöglicht auch eine geringere Komplexität der Implementierung.

**Ressourcen**: [Technische Spezifikation von EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Opcode zum Zählen führender Nullen (CLZ) {#count-leading-zeros-opcode}

Diese Funktion fügt eine kleine EVM-Anweisung hinzu: **count leading zeros (CLZ)**. Fast alles in der EVM wird als 256-Bit-Wert dargestellt – dieser neue Opcode gibt an, wie viele Nullbits am Anfang stehen. Dies ist eine gängige Funktion in vielen Befehlssatzarchitekturen, da sie effizientere arithmetische Operationen ermöglicht. In der Praxis reduziert dies die heutigen handgerollten Bit-Scans auf einen Schritt, sodass das Finden des ersten gesetzten Bits, das Scannen von Bytes oder das Parsen von Bitfeldern einfacher und billiger wird. Der Opcode ist kostengünstig, hat feste Kosten und wurde so gebenchmarkt, dass er mit einer einfachen Addition vergleichbar ist, was den Bytecode kürzt und Gas für die gleiche Arbeit spart.

**Ressourcen**: [Technische Spezifikation von EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompile für secp256r1-Kurvenunterstützung {#secp256r1-precompile}

Führt einen integrierten, passkey-artigen secp256r1 (P-256)-Signaturprüfer an der festen Adresse `0x100` ein, der dasselbe Anrufformat verwendet, das bereits von vielen L2s übernommen wurde, und behebt Edge Cases, sodass für diese Umgebungen geschriebene Verträge ohne Änderungen auf L1 funktionieren.

UX-Upgrade! Für Benutzer entsperrt dies geräte-natives Signieren und Passkeys. Wallets können direkt auf Apple Secure Enclave, Android Keystore, Hardware-Sicherheitsmodule (HSMs) und FIDO2/WebAuthn zugreifen – keine Seed-Phrase, reibungsloseres Onboarding und Multi-Faktor-Flüsse, die sich wie moderne Apps anfühlen. Dies führt zu einer besseren UX, einfacherer Wiederherstellung und Kontoabstraktionsmustern, die dem entsprechen, was Milliarden von Geräten bereits tun.

Für Entwickler nimmt es eine 160-Byte-Eingabe entgegen und gibt eine 32-Byte-Ausgabe zurück, was es einfach macht, bestehende Bibliotheken und L2-Verträge zu portieren. Unter der Haube enthält es Point-at-Infinity- und modulare Vergleichsprüfungen, um knifflige Edge Cases zu eliminieren, ohne gültige Aufrufer zu beeinträchtigen.

**Ressourcen**:

- [Technische Spezifikation von EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Mehr über RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Hinweis: EIP-7951 hat RIP-7212 ersetzt)_

### Meta {#meta}

#### `eth_config` JSON-RPC-Methode {#eth-config}

Dies ist ein JSON-RPC-Aufruf, mit dem Sie Ihren Node fragen können, welche Abspaltungs-Einstellungen Sie ausführen. Es gibt drei Snapshots zurück: `current`, `next` und `last`, damit Validatoren und Überwachungstools überprüfen können, ob Clients für eine bevorstehende Abspaltung ausgerichtet sind.

Praktisch gesehen soll dies eine Schwachstelle beheben, die entdeckt wurde, als die Pectra-Abspaltung Anfang 2025 auf dem Holesky-Testnet mit geringfügigen Fehlkonfigurationen live ging, was zu einem nicht finalisierenden Zustand führte. Dies hilft Testteams und Entwicklern sicherzustellen, dass sich große Abspaltungen beim Übergang von Devnets zu Testnets und von Testnets zu Mainnet wie erwartet verhalten.

Snapshots enthalten: `chainId`, `forkId`, geplante Abspaltungs-Aktivierungszeit, welche Precompiles aktiv sind, Precompile-Adressen, Systemvertragsabhängigkeiten und den Blob-Zeitplan der Abspaltung.

Dieses EIP befindet sich in einem separaten Abschnitt von den „Core EIPs“, da die Abspaltung keine tatsächlichen Änderungen implementiert – es ist ein Hinweis darauf, dass Client-Teams diese JSON-RPC-Methode bis zum Fusaka-Upgrade implementieren müssen.

**Ressourcen**: [Technische Spezifikation von EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Betrifft dieses Upgrade alle Ethereum-Nodes und -Validatoren? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ja, das Fusaka-Upgrade erfordert Updates für [Execution Clients und Consensus Clients](/developers/docs/nodes-and-clients/). Alle Haupt-Ethereum-Clients werden Versionen veröffentlichen, die den als hohe Priorität gekennzeichneten Hard Fork unterstützen. Sie können sich über Client-Github-Repos, deren [Discord-Kanäle](https://ethstaker.org/support), den [EthStaker-Discord](https://dsc.gg/ethstaker) oder durch Abonnieren des Ethereum-Blogs für Protokoll-Updates auf dem Laufenden halten, wann diese Versionen verfügbar sein werden. Um nach dem Upgrade die Synchronisation mit dem Ethereum-Netzwerk aufrechtzuerhalten, müssen die Knotenbetreiber sicherstellen, dass die von ihnen eingesetzte Client-Version unterstützt wird. Beachten Sie, dass die Informationen zu Client-Versionen zeitkritisch sind, und Benutzer sollten die neuesten Updates konsultieren, um die die aktuellsten Details zu erfahren.

### Wie können ETH nach der harten Abspaltung umgewandelt werden? {#how-can-eth-be-converted-after-the-hardfork}

- **Keine Aktion für Ihre ETH erforderlich**: Nach dem Ethereum-Fusaka-Upgrade müssen Sie Ihre ETH nicht umwandeln oder upgraden. Ihre Kontoguthaben bleiben unverändert und die ETH, die Sie derzeit besitzen, bleiben auch nach der harten Abspaltung in der bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Es gibt nichts, was Sie in Bezug auf dieses Upgrade tun müssen. Ihre Assets bleiben davon völlig unberührt. Denken Sie daran: Informiert zu sein ist der beste Schutz vor Betrug.

[Mehr zur Erkennung und Vermeidung von Betrug](/security/)

### Was hat es mit den Zebras auf sich? <Emoji text="🦓" /> {#whats-with-the-zebras}

Ein Zebra ist das von den Entwicklern gewählte „Maskottchen“ von Fusaka, da seine Streifen die spaltenbasierte Datenverfügbarkeitsprüfung von PeerDAS widerspiegeln, bei der Knoten bestimmte Spalten-Subnetze verwahren und einige andere Spalten aus dem Slot jedes Peers abfragen, um zu prüfen, ob die Blob-Daten verfügbar sind.

Der Merge im Jahr 2022 [verwendete einen Panda](https://x.com/hwwonx/status/1431970802040127498) als Maskottchen, um die Vereinigung der Ausführungs- und Konsensebenen zu signalisieren. Seitdem wurden für jede Abspaltung informell Maskottchen gewählt, die zum Zeitpunkt des Upgrades als ASCII-Kunst in den Client-Protokollen erscheinen. Es ist nur eine lustige Art zu feiern.

### Welche Verbesserungen sind für die L2-Skalierung enthalten? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) ist das Hauptmerkmal der Abspaltung. Es implementiert Data Availability Sampling (DAS), das mehr Skalierbarkeit für Rollups freisetzt und den Blob-Raum theoretisch auf das 8-fache der aktuellen Größe skaliert. Der Blob-Gebührenmarkt wird ebenfalls verbessert, um effizient auf Überlastung zu reagieren und zu garantieren, dass L2s eine nennenswerte Gebühr für die Rechenleistung und den Speicherplatz zahlen, die Blobs den Nodes auferlegen.

### Wie unterscheiden sich BPO-Abspaltungen? {#how-are-bpo-forks-different}

Blob Only Parameter-Abspaltungen bieten einen Mechanismus, um die Blob-Anzahl (sowohl Ziel als auch Maximum) nach der Aktivierung von PeerDAS kontinuierlich zu erhöhen, ohne auf ein vollständiges koordiniertes Upgrade warten zu müssen. Jede Erhöhung ist fest codiert, um in Client-Releases, die Fusaka unterstützen, vorkonfiguriert zu sein.

Als Benutzer oder Validator müssen Sie Ihre Clients nicht für jeden BPO aktualisieren und nur sicherstellen, dass Sie großen Hardforks wie Fusaka folgen. Dies ist die gleiche Vorgehensweise wie zuvor, es sind keine besonderen Maßnahmen erforderlich. Es wird dennoch empfohlen, Ihre Clients rund um Upgrades und BPOs zu überwachen und sie auch zwischen den Hauptversionen auf dem neuesten Stand zu halten, da Korrekturen oder Optimierungen dem Hardfork folgen könnten.

### Was ist der BPO-Zeitplan? {#what-is-the-bpo-schedule}

Der genaue Zeitplan der BPO-Updates wird mit den Fusaka-Releases festgelegt. Folgen Sie den [Protokollankündigungen](https://blog.ethereum.org/category/protocol) und den Versionshinweisen Ihrer Clients.

Beispiel, wie es aussehen könnte:

- Vor Fusaka: Ziel 6, max 9
- Bei Fusaka-Aktivierung: Ziel 6, max 9
- BPO1, wenige Wochen nach der Fusaka-Aktivierung: Ziel 10, max 15, Erhöhung um zwei Drittel
- BPO2, wenige Wochen nach BPO1: Ziel 14, max 21

### Wird dies die Gebühren auf Ethereum (Layer 1) senken? {#will-this-lower-gas}

Dieses Upgrade senkt die Gasgebühren auf L1 nicht, zumindest nicht direkt. Der Hauptfokus liegt auf mehr Blob-Speicher für Rollup-Daten, wodurch die Gebühren auf Layer 2 gesenkt werden. Dies könnte einige Nebeneffekte auf den L1-Gebührenmarkt haben, aber es wird keine signifikante Änderung erwartet.

### Was muss ich als Staker für das Upgrade tun? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Wie bei jedem Netzwerk-Upgrade, stellen Sie sicher, dass Sie Ihre Clients auf die neuesten Versionen aktualisieren, die mit Fusaka-Unterstützung gekennzeichnet sind. Folgen Sie den Updates in der Mailingliste und den [Protokollankündigungen im EF-Blog](https://blog.ethereum.org/category/protocol), um über Veröffentlichungen informiert zu werden.
Um Ihr Setup zu validieren, bevor Fusaka auf dem Mainnet aktiviert wird, können Sie einen Validator auf Testnetzen betreiben. Fusaka wird [früher auf Testnetzen aktiviert](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), was Ihnen mehr Zeit gibt, um sicherzustellen, dass alles funktioniert und Fehler zu melden. Testnet-Abspaltungen werden ebenfalls in der Mailingliste und im Blog angekündigt.

### Beeinflusst „Deterministic Proposer Lookahead“ (EIP-7917) Validatoren? {#does-7917-affect-validators}

Diese Änderung ändert nicht die Funktionsweise Ihres Validator-Clients, bietet jedoch mehr Einblick in die Zukunft Ihrer Validator-Aufgaben. Stellen Sie sicher, dass Sie Ihr Überwachungs-Tooling aktualisieren, um mit neuen Funktionen Schritt zu halten.

### Wie wirkt sich Fusaka auf die Bandbreitenanforderungen für Nodes und Validatoren aus? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS bewirkt eine signifikante Änderung in der Art und Weise, wie Nodes Blob-Daten übertragen. Alle Daten werden in Teile, sogenannte Spalten, auf 128 Subnetze aufgeteilt, wobei die Nodes nur einige davon abonnieren. Die Anzahl der Subnetz-Spalten, die Nodes verwahren müssen, hängt von ihrer Konfiguration und der Anzahl der verbundenen Validatoren ab. Die tatsächlichen Bandbreitenanforderungen hängen von der Anzahl der im Netzwerk erlaubten Blobs und dem Typ des Nodes ab. Zum Zeitpunkt der Fusaka-Aktivierung bleibt das Blob-Ziel dasselbe wie zuvor, aber mit PeerDAS können Node-Betreiber eine Verringerung ihrer Festplattennutzung für Blobs und des Netzwerkverkehrs feststellen. Da BPOs eine höhere Anzahl von Blobs im Netzwerk konfigurieren, wird die erforderliche Bandbreite mit jedem BPO zunehmen.

Die Anforderungen an die Nodes liegen auch nach den Fusaka-BPOs noch innerhalb der [empfohlenen Grenzen](https://eips.ethereum.org/EIPS/eip-7870).

#### Full Nodes {#full-nodes}

Reguläre Nodes ohne Validatoren abonnieren nur 4 Subnetze und übernehmen die Verwahrung von 1/8 der Originaldaten. Das bedeutet, dass bei gleicher Menge an Blob-Daten die Node-Bandbreite zum Herunterladen derselben um den Faktor acht (8) kleiner wäre. Die Festplattennutzung und die Download-Bandbreite für Blobs bei einem normalen Full Node könnten um etwa 80 % auf nur wenige MB sinken.

#### Solo-Staker {#solo-stakers}

Wenn der Node für einen Validator-Client verwendet wird, muss er mehr Spalten verwahren und daher mehr Daten verarbeiten. Mit einem hinzugefügten Validator abonniert der Node mindestens 8 Spalten-Subnetze und verarbeitet daher doppelt so viele Daten wie ein regulärer Node, aber immer noch weniger als vor Fusaka. Wenn das Validator-Guthaben über 287 ETH liegt, werden immer mehr Subnetze abonniert.

Für einen Solo-Staker bedeutet dies, dass sich die Festplattennutzung und die Download-Bandbreite um etwa 50 % verringern. Um Blöcke lokal zu erstellen und alle Blobs in das Netzwerk hochzuladen, ist jedoch mehr Upload-Bandbreite erforderlich. Lokale Builder benötigen zum Zeitpunkt von Fusaka eine 2-3 mal höhere Upload-Bandbreite als zuvor, und mit dem BPO2-Ziel von 15/21 Blobs muss die endgültige erforderliche Upload-Bandbreite etwa 5 mal höher sein, bei 100 Mpbs.

#### Große Validatoren {#large-validators}

Die Anzahl der abonnierten Subnetze wächst mit mehr Guthaben und Validatoren, die dem Node hinzugefügt werden. Zum Beispiel verwahrt der Node bei einem Guthaben von etwa 800 ETH 25 Spalten und benötigt etwa 30 % mehr Download-Bandbreite als zuvor. Der notwendige Upload steigt ähnlich wie bei regulären Nodes und es sind mindestens 100 Mbps erforderlich.

Bei 4096 ETH, 2 Validatoren mit maximalem Guthaben, wird der Node zum „Supernode“, der alle Spalten verwahrt und somit alles herunterlädt und speichert. Diese Nodes heilen aktiv das Netzwerk, indem sie fehlende Daten zurückgeben, erfordern aber auch viel mehr Bandbreite und Speicher. Da das endgültige Blob-Ziel sechsmal höher ist als zuvor, müssen Super-Nodes etwa 600 GB zusätzliche Blob-Daten speichern und eine schnellere, anhaltende Download-Bandbreite von etwa 20 Mbit/s haben.

[Lesen Sie mehr Details zu den erwarteten Anforderungen.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Welche EVM-Änderungen werden implementiert? {#what-evm-changes-are-implemented}

Fusaka festigt die EVM mit neuen kleineren Änderungen und Funktionen.

- Aus Sicherheitsgründen wird beim Skalieren die maximale Größe einer einzelnen Transaktion auf [16,7 Millionen](https://eips.ethereum.org/EIPS/eip-7825) Gaseinheiten begrenzt.
- [Neuer Opcode zum Zählen führender Nullen (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) wird der EVM hinzugefügt und ermöglicht es Smart-Contract-Sprachen, bestimmte Operationen effizienter durchzuführen.
- [Die Kosten des `ModExp`-Precompiles werden erhöht](https://eips.ethereum.org/EIPS/eip-7883) – Verträge, die es verwenden, werden mehr Gas für die Ausführung berechnen.

### Wie wirkt sich das neue 16-M-Gaslimit auf Vertragsentwickler aus? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka führt ein Limit für die [maximale Größe einer einzelnen Transaktion auf 16,7 Millionen](https://eips.ethereum.org/EIPS/eip-7825) (2^24) Gaseinheiten ein. Dies entspricht ungefähr der vorherigen Größe eines durchschnittlichen Blocks, was es groß genug macht, um komplexe Transaktionen aufzunehmen, die einen ganzen Block verbrauchen würden. Dieses Limit schafft Schutz für Clients und verhindert potenzielle DoS-Angriffe in der Zukunft mit einem höheren Blockgaslimit. Das Ziel der Skalierung ist es, mehr Transaktionen in die Blockchain zu bekommen, ohne dass eine einzige den gesamten Block verbraucht.

Reguläre Benutzertransaktionen sind weit davon entfernt, dieses Limit zu erreichen. Bestimmte Edge Cases wie große und komplexe DeFi-Operationen, die Bereitstellung großer Smart Contracts oder Batch-Transaktionen, die auf mehrere Verträge abzielen, könnten von dieser Änderung betroffen sein. Diese Transaktionen müssen in kleinere aufgeteilt oder auf andere Weise optimiert werden. Verwenden Sie eine Simulation, bevor Sie Transaktionen einreichen, die möglicherweise das Limit erreichen.

Die RPC-Methode `eth_call` ist nicht begrenzt und ermöglicht die Simulation größerer Transaktionen als das tatsächliche Blockchain-Limit. Das tatsächliche Limit für RPC-Methoden kann vom Client-Betreiber konfiguriert werden, um Missbrauch zu verhindern.

### Was bedeutet CLZ für Entwickler? {#what-clz-means-for-developers}

EVM-Compiler wie Solidity werden die neue Funktion zum Zählen von Nullen im Hintergrund implementieren und nutzen. Neue Verträge könnten von Gaseinsparungen profitieren, wenn sie auf diese Art von Operation angewiesen sind. Folgen Sie den Veröffentlichungen und Funktionsankündigungen der Smart-Contract-Sprache für Dokumentationen zu potenziellen Einsparungen.

### Gibt es Änderungen an meinen bestehenden Smart Contracts? {#what-clz-means-for-developers}

Fusaka hat keine direkten Auswirkungen, die bestehende Verträge brechen oder ihr Verhalten ändern würden. Die in der Ausführungsebene eingeführten Änderungen werden mit Abwärtskompatibilität vorgenommen. Achten Sie jedoch immer auf Edge Cases und mögliche Auswirkungen.

[Mit den erhöhten Kosten des `ModExp`-Precompiles](https://eips.ethereum.org/EIPS/eip-7883) werden Verträge, die davon abhängen, mehr Gas für die Ausführung verbrauchen. Wenn Ihr Vertrag stark davon abhängt und für Benutzer teurer wird, überdenken Sie, wie er genutzt wird.

Berücksichtigen Sie das [neue Limit von 16,7 Millionen](https://eips.ethereum.org/EIPS/eip-7825), wenn Transaktionen, die Ihre Verträge ausführen, eine ähnliche Größe erreichen könnten.

## Weiterführende Lektüre {#further-reading}

- [Ethereum-Fahrplan](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka-Meta-EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Ankündigung des Fusaka-Testnetzes im Blog](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Was Fusaka & Pectra Ethereum bringen werden](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Die nächsten Upgrades von Ethereum: Fusaka, Glamsterdam & Beyond mit Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Die Fusaka-Dateien](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs erklärt](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
