---
title: Zeitachse aller Ethereum-Forks (2014 bis heute)
description: Eine Geschichte der Ethereum-Blockchain, einschließlich der wichtigsten Meilensteine, Veröffentlichungen und Abspaltungen.
lang: de
sidebarDepth: 1
---

# Zeitachse aller Ethereum-Forks (2014 bis heute) {#the-history-of-ethereum}

Ein Zeitstrang aller wichtigsten Meilensteine, Forks und Aktualisierungen der Ethereum-Blockchain.

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Forks entstehen, wenn wichtige technische Neuerungen oder Änderungen am Netzwerk vorgenommen werden müssen. Sie stammen in der Regel von den [Ethereum-Verbesserungsvorschlägen (EIPs)](/eips) ab und verändern die "Richtlinien" des Protokolls.

Wenn für eine Standardsoftware eine Aktualisierung benötigt wird, veröffentlicht der Hersteller lediglich eine neue Version für den Endbenutzer. Blockchains arbeiten anders, da es keinen alleinigen Besitzer gibt. [Ethereum Anwendungen](/developers/docs/nodes-and-clients/) müssen die Software aktualisieren um neue Regeln zu implementieren. Plus Block Ersteller (Miner in einer Proof-of-Work Umgebung, Validatoren in einer Proof-of-Stake Umgebung) und Nodes erstellen neue Blöcke und müssen diese, entsprechend der neuen Richtlinien, validieren. [Mehr zu Konsensmechanismen](/developers/docs/consensus-mechanisms/)

Diese Regeländerungen können eine vorübergehende Spaltung des Netzwerks verursachen. Neue Blöcke konnen nach den neuen oder den alten Regeln erzeugt werden. Forks werden in der Regel im Voraus vereinbart, damit die Clients die Änderungen einheitlich übernehmen und der Fork mit den Upgrades zur Main Chain wird. In seltenen Fällen können jedoch Meinungsverschiedenheiten über Forks dazu führen, dass das Netzwerk dauerhaft gespalten wird – am bekanntesten ist die Entstehung von Ethereum Classic durch den <a href="#dao-fork">DAO Fork</a>.

</ExpandableCard>

<ExpandableCard title="Why do some upgrades have multiple names?" contentPreview="Upgrades names follow a pattern">

Die Software, die Ethereum zugrunde liegt, besteht aus zwei Hälften, der sogenannten [Ausführungsschicht](/glossary/#execution-layer) und der [Konsensschicht](/glossary/#consensus-layer).

**Benennung der Ausführungs-Upgrades**

Seit 2021 werden Upgrades der **Ausführungsebene** in chronologischer Reihenfolge nach den Städtenamen [früherer Devcon-Veranstaltungsorte](https://devcon.org/en/past-events/) benannt:

| Upgrade-Name | Devcon-Jahr | Devcon-Nummer | Upgrade-Datum                                        |
| ------------ | ----------- | ------------- | ---------------------------------------------------- |
| Berlin       | 2014        | 0             | 15. Apr. 2021 |
| London       | 2015        | I             | 5. Aug. 2021  |
| Shanghai     | 2016        | II            | 12. Apr. 2023 |
| Cancun       | 2017        | III           | 13. Mär. 2024 |
| **Prag**     | 2018        | IV            | TBD – Nächstes                                       |
| _Osaka_      | 2019        | V             | TBD                                                  |
| _Bogotá_     | 2022        | VI            | TBD                                                  |
| _Bangkok_    | 2024        | VII           | TBD                                                  |

**Benennung der Konsens-Upgrades**

Seit dem Start der [Beacon Chain](/glossary/#beacon-chain) werden Upgrades der **Konsens-Ebene** nach Himmelssternen benannt, deren Anfangsbuchstaben in alphabetischer Reihenfolge aufeinanderfolgen:

| Upgrade-Name                                                  | Upgrade-Datum                                        |
| ------------------------------------------------------------- | ---------------------------------------------------- |
| Entstehungsgeschichte der Beacon Chain                        | 1. Dez. 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27. Okt. 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6. Sept. 2022 |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12. Apr. 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13. Mär. 2024 |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | TBD – Nächstes                                       |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | TBD                                                  |

**Kombinierte Benennung**

Die Upgrades der Ausführungs- und Konsens-Ebene wurden ursprünglich zu unterschiedlichen Zeiten eingeführt, aber nach [The Merge](/roadmap/merge/) im Jahr 2022 wurden sie gleichzeitig bereitgestellt. . Diese Praxis begann mit dem Shanghai-Capella-Upgrade, allgemein bekannt als "Shapella", und wird fortgesetzt mit:Cancun-Deneb (Dencun)Prague-Electra (Pectra).

| Ausführungs-Upgrade | Konsens-Upgrade | Kurzname   |
| ------------------- | --------------- | ---------- |
| Shanghai            | Capella         | "Shapella" |
| Cancun              | Deneb           | "Dencun"   |
| Prag                | Electra         | "Pectra"   |
| Osaka               | Fulu            | "Fusaka"   |

</ExpandableCard>

Direkt zu den Informationen über einige der besonders wichtigen vergangenen Upgrades springen: [Die Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); und [EIP-1559](#london)

Suchen Sie nach weiteren Protokoll-Upgrades? [Erfahren Sie mehr über bevorstehende Upgrades auf der Ethereum-Roadmap](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Mehr über Fusaka](/roadmap/fusaka/)

### Prag-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Das Prague-Electra-Upgrade („Pectra“) umfasste mehrere Verbesserungen des Ethereum-Protokolls, die darauf abzielen, das Erlebnis für alle Nutzer, Layer-2-Netzwerke, Staker und Node-Betreiber zu verbessern.

Das Staking erhielt ein Upgrade durch zusammengesetzte Validator-Konten und verbesserte Kontrolle über die gestaketen Mittel mithilfe der Auszahlungsadresse für die Ausführung. EIP-7251 erhöhte das maximale effektive Guthaben für einen einzelnen Validator auf 2048, wodurch die Kapitaleffizienz für Staker verbessert wurde. EIP-7002 ermöglichte einem Exekutionskonto, Validator-Aktionen sicher auszulösen – einschließlich des Verlassens des Stakings oder des Abhebens von Teilen der Mittel. Damit wurde das Erlebnis für ETH-Staker verbessert und gleichzeitig die Verantwortlichkeit von Node-Betreibern gestärkt.

Weitere Teile des Upgrades konzentrierten sich darauf, das Erlebnis für reguläre Nutzer zu verbessern. EIP-7702 brachte die Möglichkeit für ein reguläres Konto ohne Smart Contract ([EOA](/glossary/#eoa)), Code ähnlich wie ein Smart Contract auszuführen. Dies eröffnete völlig neue Möglichkeiten für traditionelle Ethereum-Konten, wie z. B. das Bündeln von Transaktionen, Gas-Sponsoring, alternative Authentifizierungsverfahren, programmierbare Ausgabekontrollen, Mechanismen zur Kontowiederherstellung und vieles mehr.

<ExpandableCard title="Pectra EIPs" contentPreview="Official improvements included in this upgrade.">

Bessere Benutzererfahrung:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA-Kontocode festlegen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Blob-Durchsatzerhöhung</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Erhöhung der Kosten für Calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Blob-Planung zu EL-Konfigurationsdateien hinzufügen</em></li>
</ul>

Bessere Staking-Erfahrung:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Erhöhung von <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Ausstiegsmechanismen der Execution Layer aktivierbar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Allgemeine Anfragen der Execution Layer</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Validatoreneinlagen auf der Chain dokumentieren</em></li>
</ul>

Protokollverbesserungen und -sicherheitsverbesserungen:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Vorkompilierte Operationen für die BLS12-381-Kurve</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Historische Blockhashs im Zustand speichern</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Komiteeindex außerhalb der Bestätigung verschieben</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Wie Pectra das Staking-Erlebnis verbessern wird](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Lesen Sie die Electra-Upgrade-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Prag-Electra ("Pectra") FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancun Zusammenfassung {#cancun-summary}

Das Cancun-Upgrade enthält eine Reihe von Verbesserungen an der _Ausführung_ von Ethereum, die darauf abzielen, die Skalierbarkeit zu verbessern, in Verbindung mit den Deneb-Konsens-Upgrades.

Insbesondere enthält es EIP-4844, bekannt als **Proto-Danksharding**, das die Kosten für die Datenspeicherung für Layer-2-Rollups erheblich senkt. Dies wird durch die Einführung von Daten-„Blobs“ erreicht, die es Rollups ermöglichen, Daten für einen kurzen Zeitraum im Mainnet zu veröffentlichen. Dies führt zu deutlich geringeren Transaktionsgebühren für Nutzer von Layer-2-Rollups.

<ExpandableCard title="Cancun EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> – <em>Transiente Speicher-Opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> – <em>Beacon-Block-Root im EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> – <em>Shard-Blob-Transaktionen (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> – <em><code>MCOPY</code> – Speicherkopieranleitung</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> – <em><code>SELFDESTRUCT</code> nur in derselben Transaktion</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> Operationscode</em></li>
</ul>

</ExpandableCard>

- [Layer-2-Rollups](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Lesen Sie die Cancun-Upgrade-Spezifikation](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb Zusammenfassung {#deneb-summary}

Das Deneb-Upgrade enthält eine Reihe von Verbesserungen an Ethereums _Konsens_, die auf eine Verbesserung der Skalierbarkeit abzielen. Dieses Upgrade erfolgt parallel zu den Cancun-Ausführungsupgrades, um Proto-Danksharding (EIP-4844) zu ermöglichen, sowie zu weiteren Verbesserungen der Beacon Chain.

Vorgenerierte, signierte „freiwillige Exit-Nachrichten“ laufen nicht mehr ab, was Benutzern, die ihre Gelder bei einem externen Knotenbetreiber einsetzen, mehr Kontrolle gibt. Mit dieser signierten Ausstiegsnachricht können Validators ihre Knotenoperation delegieren, während sie gleichzeitig jederzeit die Sicherheit haben, ihren Ausstieg und die Rückgabe ihrer Mittel vornehmen zu können, ohne die Genehmigung von jemand anderem einholen zu müssen.

EIP-7514 führt zu einer Verschärfung der ETH-Ausgabe, indem die „Churn“-Rate, mit der Validierer dem Netzwerk beitreten können, auf acht (8) pro Epoche begrenzt wird. Da die ETH-Emission proportional zur Gesamtzahl der gestaketen ETH ist, begrenzt die Begrenzung der Anzahl der beitretenden Validatoren die _Wachstumsrate_ der neu emittierten ETH, während gleichzeitig die Hardwareanforderungen für Node-Betreiber reduziert werden, was die Dezentralisierung fördert.

<ExpandableCard title="Deneb EIPs" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> – <em>Beacon-Block-Root im EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> – <em>Shard-Blob-Transaktionen</em></li>
  <li>              <a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em> Ständig gültige signierte freiwillige Ausgänge</em>                                                                                                                                                                                                                </li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045"> EIP-7045 </a> - <em>Erhöhen Sie die maximale Bescheinigung für den Einschluss inkl. Slot</em>                                                                                                                 </li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514"> EIP-7514 </a> - <em>Hinzufügen der maximalen Epochen-Abwanderungsgrenze</em>                                                                                                   </li>
</ul>

</ExpandableCard>

- [Lesen Sie die Deneb-Upgrade-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb ("Dencun") FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghai Zusammenfassung {#shanghai-summary}

Das Shanghai-Update ebnete den Weg für Staking-Auszahlungen auf der Ausführungsebene. Die Fusion mit dem Capella-Upgrade ermöglichte es Blöcken, Auszahlungen zu akzeptieren, wodurch Stakern erlaubt wurde, ihre ETH von der Beacon Chain auf der Ausführungsebene abzuheben.

<ExpandableCard title="Shanghai EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Führt die <code>COINBASE</code>-Adresse ein</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Neue <code>PUSH0</code>-Anweisung</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Initcode-Größenlimit</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Beacon Chain Push-Abhebungen als Operationen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> – <em>Veraltet <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Lesen Sie die Shanghai-Upgrade-Spezifikation](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella Zusammenfassung {#capella-summary}

Das Capella-Update war das drittgrößte Upgrade für die Konsensebene (Beacon Chain) und ermöglichte Staking-Abhebungen. Mit Capella, das gleichzeitig mit dem Upgrade der Ausführungsebene, Shanghai, erfolgte, wurde die Staking-Abhebungsfunktion zur Verfügung gestellt.

Das Upgrade für die Konsensebene ermöglichte es Stakern, die bei der ersten Einzahlung keine Abhebungen vornehmen durften, Abhebungen vorzunehmen.

Das Upgrade hat auch eine automatische Kontenbereinigungsfunktion bereitgestellt, die kontinuierlich Validator-Konten auf verfügbare Prämienzahlungen oder vollständige Abhebungen überprüft und verarbeitet.

- [Mehr zu Staking-Auszahlungen](/staking/withdrawals/).
- [Lesen Sie die Capella-Upgrade-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Zusammenfassung {#paris-summary}

Das Paris-Upgrade wurde ausgelöst, als die Proof-of-Work-Blockchain eine [terminale Gesamtschwierigkeit](/glossary/#terminal-total-difficulty) von 58750000000000000000000 erreichte. Dies geschah am 15. September 2022 im Block 15537393 und löste das Paris-Upgrade im nächsten Block aus. Paris war der Übergang zu [The Merge](/roadmap/merge/) – sein Hauptmerkmal war das Abschalten des [Proof-of-Work](/developers/docs/consensus-mechanisms/pow)-Mining-Algorithmus und der zugehörigen Konsenslogik und die stattdessen erfolgte Umstellung auf [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos). Paris selbst war ein Upgrade der [Ausführungs-Clients](/developers/docs/nodes-and-clients/#execution-clients) (entsprechend Bellatrix auf der Konsens-Ebene), das es ihnen ermöglichte, Anweisungen von ihren verbundenen [Konsens-Clients](/developers/docs/nodes-and-clients/#consensus-clients) entgegenzunehmen. Dies erforderte die Aktivierung einer neuen Reihe interner API-Methoden, die zusammen als [Engine-API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) bekannt sind. Dies war wohl das bedeutendste Upgrade in der Geschichte von Ethereum seit [Homestead](#homestead)!

- [Lesen Sie die Paris-Upgrade-Spezifikation](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Ermöglicht den Übergang des Ethereum-Netzwerks vom Konsensmechanismus Proof-of-Work (PoW) zum Proof-of-Stake (PoS).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em> Die SCHWIERIGKEITEN mit der Wiederverwendung und Lesbarkeit des Opcodes werden durch den PREVRANDAO behoben</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Zusammenfassung {#bellatrix-summary}

Das Bellatrix-Upgrade war das zweite geplante Upgrade für die [Beacon Chain](/roadmap/beacon-chain) und bereitete die Chain auf [The Merge](/roadmap/merge/) vor. Es setzt Validator-Strafen für Inaktivität und strafbare Vergehen auf alle ihre Werte. Bellatrix beinhaltet auch eine Aktualisierung der Fork-Choice-Regeln, um die Blockchain auf die Zusammenführung und den Übergang vom letzten Proof-of-Work-Block zum ersten Proof-of-Stake-Block vorzubereiten. Dies beinhaltet, dass Konsens-Clients auf die [terminale Gesamtschwierigkeit](/glossary/#terminal-total-difficulty) von 58750000000000000000000 aufmerksam gemacht werden.

- [Lesen Sie die Bellatrix-Upgrade-Spezifikation](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Zusammenfassung {#gray-glacier-summary}

Das Gray Glacier-Netzwerk-Upgrade hat die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um drei Monate nach hinten verschoben. Dies ist die einzige in diesem Upgrade eingeführte Änderung und ähnelt in ihrer Art den Upgrades [Arrow Glacier](#arrow-glacier) und [Muir Glacier](#muir-glacier). Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzanz](#byzantium), [Konstantinopel](#constantinople) und [London](#london) vorgenommen.

- [EF Blog – Ankündigung des Gray-Glacier-Upgrades](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>Verzögert die Explosion der Schwierigkeitsbombe bis Ende September 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Zusammenfassung {#arrow-glacier-summary}

Das Arrow-Glacier-Netzwerk-Upgrade verschob die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um mehrere Monate. Dies ist die einzige in diesem Upgrade eingeführte Änderung und ähnelt in ihrer Art dem Upgrade [Muir Glacier](#muir-glacier). Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzanz](#byzantium), [Konstantinopel](#constantinople) und [London](#london) vorgenommen.

- [EF Blog – Ankündigung des Arrow-Glacier-Upgrades](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders – Ethereum-Arrow-Glacier-Upgrade](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>verzögert die Schwierigkeitsbombe bis Juni 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Zusammenfassung {#altair-summary}

Das Altair-Upgrade war das erste geplante Upgrade für die [Beacon Chain](/roadmap/beacon-chain). Es wurde die Unterstützung für „Sync-Komitees“ hinzugefügt, die leichte Clients aktivierte und die Strafen für Inaktivität und Slashing von Validatoren erhöht, da die Entwicklung der Zusammenführung voranschritt.

- [Lesen Sie die Altair-Upgrade-Spezifikation](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Fun-Fact! {#altair-fun-fact}

Altair war das erste große Netzwerk-Upgrade, für das es einen genauen Einführungszeitpunkt gab. Jedes vorherige Upgrade basierte auf einer angegebenen Blocknummer auf der Proof-of-Work-Chain, bei der die Blockzeiten variieren. Die Beacon Chain erfordert kein Lösen von Proof-of-Work und arbeitet stattdessen mit einem zeitbasierten Epochensystem, das aus 32 zwölfsekündigen „Slots" besteht, in denen Validatoren Blöcke vorschlagen können. Deshalb wussten wir genau, wann wir Epoche 74.240 erreichen würden und Altair live gehen würde!

- [Blockzeit](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Zusammenfassung {#london-summary}

Das London-Upgrade führte [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ein, das den Markt für Transaktionsgebühren reformierte, zusammen mit Änderungen an der Handhabung von Gas-Rückerstattungen und dem [Ice Age](/glossary/#ice-age)-Zeitplan.

#### Was war das London-Upgrade/EIP-1559? {#eip-1559}

Vor dem London-Upgrade hatte Ethereum Blöcke mit fester Größe. In Zeiten hoher Netzwerknachfrage arbeiteten diese Blöcke mit voller Kapazität. Infolgedessen mussten die Nutzer oft warten, bis die Nachfrage zurückging, um in einen Block aufgenommen zu werden. Das führte zu einer schlechten Nutzererfahrung. Mit dem London-Upgrade wurden Blöcke variabler Größe in Ethereum eingeführt.

Die Art und Weise, wie die Transaktionsgebühren im Ethereum-Netzwerk berechnet wurden, änderte sich mit [dem London-Upgrade](/ethereum-forks/#london) im August 2021. Vor dem London-Upgrade wurden die Gebühren wie folgt ohne Trennung von `Grund-` und `Prioritätsgebühren` berechnet:

Angenommen, Alice müsste Bob 1 ETH zahlen. Bei der Transaktion liegt das Gaslimit bei 21.000 Einheiten und der Gaspreis bei 200 gwei.

Die Gesamtgebühr wäre gewesen: `Gaseinheiten (Limit) * Gaspreis pro Einheit`, d. h. `21.000 * 200 = 4.200.000 Gwei` oder 0,0042 ETH

Die Implementierung von [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) im London-Upgrade machte den Mechanismus der Transaktionsgebühren komplexer, aber die Gasgebühren wurden besser vorhersagbar, was zu einem effizienteren Markt für Transaktionsgebühren führte. Benutzer können Transaktionen mit einer `maxFeePerGas` einreichen, die dem Betrag entspricht, den sie für die Ausführung der Transaktion zu zahlen bereit sind, in dem Wissen, dass sie nicht mehr als den Marktpreis für Gas (`baseFeePerGas`) zahlen und den Überschuss, abzüglich ihres Trinkgeldes, zurückerstattet bekommen.

Dieses Video erklärt EIP-1559 und die Vorteile, die es mit sich bringt: [EIP-1559 erklärt](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Sind Sie ein dApp-Entwickler? Aktualisieren Sie unbedingt Ihre Bibliotheken und Tools.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lesen Sie die Erklärung der Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>trägt zur Verbesserung der Marktbedingungen bei und senkt gleichzeitig die Transaktionsgebühren</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>zur Wiedergabe eines <code>BASEFEE</code>-Blockcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> – <em>reduziert die Gasgebühren für EVM-Operationen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> – <em>verhindert die Bereitstellung von Verträgen, verhindert, die mit <code>0xEF</code></em> beginnen</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>plant, das Ice Age bis Dezember 2021 zu verlängern</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Zusammenfassung {#berlin-summary}

Mit dem Berliner Upgrade wurden die Gaskosten für bestimmte EVM-Aktionen optimiert und die Unterstützung für mehrere Transaktionsarten erweitert.

- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Lesen Sie die Erklärung der Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>senkt die Gaskosten für ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>ermöglicht einen viel einfacheren Zugang zu den verschiedenen Transaktionsdiensten</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>Gaskostenerhöhung für Zustandszugriffs-Opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>fügt eine optionale Zugriffsliste hinzu</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain Genesis {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Zusammenfassung {#beacon-chain-genesis-summary}

Die [Beacon Chain](/roadmap/beacon-chain/) benötigte 16.384 Einzahlungen von 32 gestaketen ETH, um sicher starten zu können. Dies geschah am 27. November und die Beacon Chain begann am 1. Dezember 2020 mit der Erstellung von Blöcken.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  The Beacon Chain
</DocLink>

---

### Staking-Einzahlungsvertrag eingeführt {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Zusammenfassung {#deposit-contract-summary}

Der Staking-Einzahlungsvertrag führte das [Staking](/glossary/#staking) in das Ethereum-Ökosystem ein. Obwohl es sich um einen [Mainnet](/glossary/#mainnet)-Vertrag handelte, hatte er direkte Auswirkungen auf den Zeitplan für den Start der [Beacon Chain](/roadmap/beacon-chain/), einem wichtigen [Ethereum-Upgrade](/roadmap/).

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Zusammenfassung {#muir-glacier-summary}

Der Muir-Glacier-Fork führte eine Verzögerung der [Schwierigkeitsbombe](/glossary/#difficulty-bomb) ein. Erhöhungen der Block-Schwierigkeit des [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)-Konsensmechanismus drohten, die Nutzbarkeit von Ethereum durch längere Wartezeiten beim Senden von Transaktionen und bei der Nutzung von Dapps zu beeinträchtigen.

- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lesen Sie die Erklärung der Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>verzögert die Schwierigkeitsbombe um weitere 4.000.000 Blöcke, oder etwa 611 Tage.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Zusammenfassung {#istanbul-summary}

Die Istanbul-Abspaltung:

- Optimierte die [Gas](/glossary/#gas)-Kosten für bestimmte Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Verbesserte Widerstandskraft gegen Denial-of-Service-Angriffe.
- Machte [Layer-2-Skalierungslösungen](/developers/docs/scaling/#layer-2-scaling), die auf SNARKs und STARKs basieren, performanter.
- Aktivierte Ethereum und Zcash zur Interoperation.
- Ermöglichte Verträgen, kreativere Funktionen einzuführen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>ermöglicht es dem Ethereum-Netzwerk, mit anonymen Währungen wie Zcash zu arbeiten, wodurch das Recht auf Privatsphäre geschützt werden kann.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>günstigere Kryptografie zur Verbesserung der [Gas](/glossary/#gas)-Kosten.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>schützt Ethereum vor Wiederholung Angriffen durch Hinzufügen von <code>CHAINID</code> [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>die Optimierung der Gaspreis-Verfahrenscodes auf der Grundlage des Gasverbrauchs.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduziert die Kosten für Anrufdaten, um mehr Daten in Blöcken zu ermöglichen – gut für [Layer 2-Skalierung](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>
weitere Änderungen der Gaspreisverfahrenscodes.</em></li>
</ul>

</ExpandableCard>

---

### Konstantinopel {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Zusammenfassung {#constantinople-summary}

Die Constantinople-Fork:

- Reduzierte die [Block-Mining](/developers/docs/consensus-mechanisms/pow/mining/)-Belohnungen von 3 auf 2 ETH.
- Stellte sicher, dass die Blockchain nicht einfror, bevor [Proof-of-Stake implementiert wurde](#beacon-chain-genesis).
- Optimierte die [Gas](/glossary/#gas)-Kosten für bestimmte Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Fügte die Möglichkeit hinzu, mit Adressen zu interagieren, die noch nicht erstellt wurden.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimiert die Kosten bestimmter Aktionen auf der Blockchain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>erlaubt es Ihnen, Adressen zu verwenden, die noch nicht angelegt wurden.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>führt die <code>EXTCODEHASH</code>-Anweisung ein, um den Hash des Codes eines anderen Vertrags abzurufen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>stellt sicher, dass die Blockchain vor dem Übergang zu Proof-of-Stake nicht einfriert und reduziert die Blockbelohnung von 3 auf 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzanz {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Zusammenfassung {#byzantium-summary}

Die Byzantium-Fork:

- Reduzierte die [Block-Mining](/developers/docs/consensus-mechanisms/pow/mining/)-Belohnungen von 5 auf 3 ETH.
- Verzögerte die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um ein Jahr.
- Fügte die Möglichkeit hinzu, nicht zustandsverändernde Aufrufe zu anderen Verträgen zu tätigen.
- Fügte bestimmte Kryptografie-Methoden hinzu, um die [Layer-2-Skalierung](/developers/docs/scaling/#layer-2-scaling) zu ermöglichen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>integriert den Operationscode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>Statusfeld zu Transaktionsbelegen hinzugefügt, Erfolg oder Misserfolg anzuzeigen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>fügt elliptische Kurven und Skalarmultiplikation hinzu, um [ZK-Snarks](/developers/docs/scaling/zk-rollups/) zu ermöglichen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>fügt elliptische Kurven und Skalarmultiplikation hinzu, um [ZK-Snarks](/developers/docs/scaling/zk-rollups/) zu ermöglichen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>aktiviert Überprüfung der RSA-Signatur.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>fügt Unterstützung der Ausgabewerte eines Variableninhalts hinzu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>integriert den Verfahrenscode, <code>STATICCALL</code> der nicht zustandsveränderte Aufrufe für andere Verträge erlaubt.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>ändert die Formel für die Einstellung des Schwierigkeitsgrades.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>verzögert [Difficulty Bomb](/glossary/#difficulty-bomb) um 1 Jahr und reduziert die Blockbelohnung von 5 auf 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Zusammenfassung {#spurious-dragon-summary}

Die Spurious-Dragon-Fork war die zweite Reaktion auf die Denial-of-Service(DoS)-Angriffe auf das Netzwerk (September/Oktober 2016), einschließlich:

- Abstimmen der Verfahrenscode-Preise, um zukünftige Angriffe auf das Netzwerk zu verhindern.
- Aktivierung von „Debloat“ (Wachstumsveringerung) für den Blockchain-Zustand.
- Hinzufügen von Replay-Angriffsschutz.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>verhindert, dass Transaktionen von einer Ethereum-Blockchain wieder auf einer alternativen Blockchain gesendet werden. Beispiel: Eine Testnetz-Transaktion, die auf der Ethereum Haupt-Blockchain wiedergegeben wird.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>passt Preise des <code>EXP</code>-Verfahrenscodes an – und wirkt somit der Verlangsamung des Netzwerks durch rechenintensive Vertragsklauseln entgegen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>ermöglicht das Löschen leerer Konten, die bei DOS-Attacken hinzugefügt wurden.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ändert die maximale Codegröße, die ein Vertrag in der Blockchain haben kann, in 24576 Bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Zusammenfassung {#tangerine-whistle-summary}

Die Tangerine-Whistle-Fork war die erste Reaktion auf die Denial-of-Service(DoS)-Angriffe auf das Netzwerk (September/Oktober 2016), einschließlich:

- Lösung der dringenden Probleme im Bereich der Netzwerkgesundheit im Zusammenhang mit unterbewerteten Verfahrenscodes.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>erhöht die Gaskosten der Verfahrenscodes, die bei Spam-Attacken verwendet werden können.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduziert die Zustandsgröße, indem sie eine große Anzahl leerer Konten entfernt, die aufgrund von Fehlern in früheren Versionen des Ethereum-Protokolls ursprünglich minimale Transaktionsgebühren enthielten.</em></li>
</ul>

</ExpandableCard>

---

### DAO-Fork {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Zusammenfassung {#dao-fork-summary}

Der DAO-Fork war eine Reaktion auf den [DAO-Angriff von 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), bei dem einem unsicheren [DAO](/glossary/#dao)-Vertrag durch einen Hack über 3,6 Millionen ETH entzogen wurden. Der Fork verschob die Gelder aus dem fehlerhaften Vertrag in einen [neuen Vertrag](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) mit einer einzigen Funktion: Abhebung. Jeder, der Geld verloren hat, konnte 1 ETH für jeden 100 DAO-Token in seiner Wallet abheben.

Über diese Vorgehensweise wurde seitens der Ethereum-Community abgestimmt. Jeder ETH-Inhaber konnte über eine Transaktion auf [einer Abstimmungsplattform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) abstimmen. Die Entscheidung für die Fork erhielt mehr als 85 % der Stimmen.

Einige Miner weigerten sich, die Abspaltung mitzutragen, da der Vorfall des DAO keinen Fehler im Protokoll darstellte. Sie gründeten daraufhin [Ethereum Classic](https://ethereumclassic.org/).

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Zusammenfassung {#homestead-summary}

Die Homestead-Abspaltung, die in die Zukunft schaute. Sie enthielt mehrere Protokolländerungen und eine Änderung des Netzwerks, die Ethereum die Möglichkeit gab, weitere Netzwerk-Upgrades durchzuführen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>ermöglicht es Bearbeitungen bei der Entwicklung von Smart Contracts vorzunehmen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>
führt einen neuen Verfahrenscode ein: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>präsentiert DEVP2P zur Erfüllung der Kompatibilitätsanforderungen</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Zusammenfassung {#frontier-thawing-summary}

Der Frontier-Thawing-Fork hob das 5.000 [Gas](/glossary/#gas)-Limit pro [Block](/glossary/#block) auf und setzte den Standard-Gaspreis auf 51 [Gwei](/glossary/#gwei). Dies erlaubte Transaktionen – Transaktionen benötigen 21.000 Gas. Die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) wurde eingeführt, um einen zukünftigen Hard-Fork zu [Proof-of-Stake](/glossary/#pos) sicherzustellen.

- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Lesen Sie das Ethereum Protocol Update 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Zusammenfassung {#frontier-summary}

Frontier war live, aber soweit nur die Implementierung eines grundsätzlichen Rahmens des Ethereum-Projekts. Es folgte der erfolgreichen olympischen Testphase. Es war für technische Benutzer gedacht, speziell für Entwickler. [Blöcke](/glossary/#block) hatten ein [Gaslimit](/glossary/#gas) von 5.000. Diese Zeit des „Auftauens" ermöglichte es den Minern, ihren Betrieb zu starten und für Early-Adopters, ihre Kunden zu installieren, ohne dies „überstürzen“ zu müssen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether-Verkauf {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether ging offiziell 42 Tage lang in den Verkauf. Man konnte es mit BTC kaufen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper veröffentlicht {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Das Yellowpaper, verfasst von Dr. Gavin Wood, ist eine technische Definition des Ethereum-Protokolls.

[Das Yellowpaper ansehen](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper veröffentlicht {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Dieses einleitende Papier wurde ursprünglich 2013 von Vitalik Buterin, dem Gründer von Ethereum, vor dem Projektstart im Jahr 2015 veröffentlicht.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
