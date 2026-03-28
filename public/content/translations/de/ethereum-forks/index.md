---
title: Zeitachse aller Ethereum-Forks (2014 bis heute)
description: "Eine Geschichte der Ethereum-Blockchain einschließlich wichtiger Meilensteine, Veröffentlichungen und Forks."
lang: de
sidebarDepth: 1
---

# Zeitachse aller Ethereum-Forks (2014 bis heute) {#the-history-of-ethereum}

Eine Zeitachse aller wichtigen Meilensteine, Forks und Updates der [Ethereum](/)-Blockchain.

<ExpandableCard title="Was sind Forks?" contentPreview="Änderungen an den Regeln des Ethereum-Protokolls, die oft geplante technische Upgrades beinhalten.">

Forks treten auf, wenn größere technische Upgrades oder Änderungen am Netzwerk vorgenommen werden müssen – sie stammen typischerweise von [Ethereum-Verbesserungsvorschlägen (EIPs)](/eips/) und ändern die „Regeln“ des Protokolls.

Wenn Upgrades in traditioneller, zentral gesteuerter Software benötigt werden, veröffentlicht das Unternehmen einfach eine neue Version für den Endbenutzer. Blockchains funktionieren anders, da es keinen zentralen Eigentümer gibt. [Ethereum-Clients](/developers/docs/nodes-and-clients/) müssen ihre Software aktualisieren, um die neuen Fork-Regeln zu implementieren. Außerdem müssen Block-Ersteller (Miner in einer Proof-of-Work-Welt, Validatoren in einer Proof-of-Stake-Welt) und Blockchain-Knoten Blöcke erstellen und nach den neuen Regeln validieren. [Mehr zu Konsensmechanismen](/developers/docs/consensus-mechanisms/)

Diese Regeländerungen können zu einer vorübergehenden Spaltung im Netzwerk führen. Neue Blöcke könnten nach den neuen oder den alten Regeln produziert werden. Forks werden in der Regel im Voraus vereinbart, sodass Clients die Änderungen einstimmig übernehmen und der Fork mit den Upgrades zur Hauptkette wird. In seltenen Fällen können jedoch Meinungsverschiedenheiten über Forks dazu führen, dass sich das Netzwerk dauerhaft spaltet – am bekanntesten ist die Entstehung von Ethereum Classic durch den <a href="#dao-fork">DAO-Fork</a>.

</ExpandableCard>

<ExpandableCard title="Warum haben einige Upgrades mehrere Namen?" contentPreview="Die Namen von Upgrades folgen einem Muster">

Die Software, die Ethereum zugrunde liegt, besteht aus zwei Hälften, bekannt als die [Ausführungsebene](/glossary/#execution-layer) und die [Konsensebene](/glossary/#consensus-layer).

**Benennung von Ausführungs-Upgrades**

Seit 2021 werden Upgrades der **Ausführungsebene** nach den Städtenamen [früherer Devcon- und Devconnect-Standorte](https://devcon.org/en/past-events/) in chronologischer Reihenfolge benannt:

| Upgrade-Name   | Devcon(nect)-Jahr | Devcon-Nummer | Upgrade-Datum |
| -------------- | ----------------- | ------------- | ------------- |
| Berlin         | 2014              | 0             | 15. Apr. 2021 |
| London         | 2015              | I             | 5. Aug. 2021  |
| Shanghai       | 2016              | II            | 12. Apr. 2023 |
| Cancun         | 2017              | III           | 13. März 2024 |
| Prague         | 2018              | IV            | 7. Mai 2025   |
| Osaka          | 2019              | V             | 3. Dez. 2025  |
| **Amsterdam**  | 2022              | Devconnect    | TBD - Nächstes|
| _Bogotá_       | 2022              | VI            | TBD           |
| _Istanbul_     | 2023              | Devconnect    | TBD           |
| _Bangkok_      | 2024              | VII           | TBD           |
| _Buenos Aires_ | 2025              | Devconnect    | TBD           |
| _Mumbai_       | 2026              | VIII          | TBD           |

**Benennung von Konsens-Upgrades**

Seit dem Start der [Beacon Chain](/glossary/#beacon-chain) werden Upgrades der **Konsensebene** nach Sternen benannt, deren Anfangsbuchstaben in alphabetischer Reihenfolge fortschreiten:

| Upgrade-Name                                              | Upgrade-Datum |
| --------------------------------------------------------- | ------------- |
| Beacon Chain Genesis                                      | 1. Dez. 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27. Okt. 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6. Sep. 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12. Apr. 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13. März 2024 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7. Mai 2025   |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3. Dez. 2025  |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | TBD - Nächstes|
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | TBD           |

**Kombinierte Benennung**

Die Ausführungs- und Konsens-Upgrades wurden anfangs zu unterschiedlichen Zeiten eingeführt, aber nach [The Merge](/roadmap/merge/) im Jahr 2022 wurden diese gleichzeitig bereitgestellt. Daher haben sich umgangssprachliche Begriffe entwickelt, um Verweise auf diese Upgrades mit einem einzigen zusammengezogenen Begriff zu vereinfachen. Dies begann mit dem _Shanghai-Capella_-Upgrade, das allgemein als „**Shapella**“ bezeichnet wird, und wird bei nachfolgenden Upgrades fortgesetzt.

| Ausführungs-Upgrade | Konsens-Upgrade | Kurzname      |
| ------------------- | --------------- | ------------- |
| Shanghai            | Capella         | "Shapella"    |
| Cancun              | Deneb           | "Dencun"      |
| Prague              | Electra         | "Pectra"      |
| Osaka               | Fulu            | "Fusaka"      |
| Amsterdam           | Gloas           | "Glamsterdam" |
| Bogotá              | Heze            | "Hegotá"      |

</ExpandableCard>

Springen Sie direkt zu Informationen über einige der besonders wichtigen vergangenen Upgrades: [Die Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); und [EIP-1559](#london)

Suchen Sie nach zukünftigen Protokoll-Upgrades? [Erfahren Sie mehr über kommende Upgrades auf der Ethereum-Roadmap](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Mehr zu Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Das Prague-Electra-Upgrade („Pectra“) umfasste mehrere Verbesserungen am Ethereum-Protokoll, die darauf abzielten, die Erfahrung für alle Benutzer, Ebene-2-Netzwerke, Staker und Blockchain-Knoten-Betreiber zu verbessern.

Das Staking erhielt ein Upgrade mit sich verzinsenden Validator-Konten und einer verbesserten Kontrolle über eingesetzte Mittel (Stake) mithilfe der Ausführungs-Auszahlungsadresse. EIP-7251 erhöhte das maximale effektive Guthaben für einen einzelnen Validator auf 2048, was die Kapitaleffizienz für Staker verbesserte. EIP-7002 ermöglichte es einem Ausführungskonto, Validator-Aktionen sicher auszulösen, einschließlich des Ausstiegs oder der Auszahlung von Teilen der Mittel, was die Erfahrung für ETH-Staker verbesserte und gleichzeitig dazu beitrug, die Verantwortlichkeit für Blockchain-Knoten-Betreiber zu stärken.

Andere Teile des Upgrades konzentrierten sich auf die Verbesserung der Erfahrung für reguläre Benutzer. EIP-7702 brachte die Möglichkeit für ein reguläres Konto ohne Smart Contract ([Extern verwaltetes Konto (EOA)](/glossary/#eoa)), Code ähnlich einem Smart Contract auszuführen. Dies eröffnete grenzenlose neue Funktionen für traditionelle Ethereum-Konten, wie z. B. Transaktionsbündelung, Gas-Sponsoring, alternative Authentifizierung, programmierbare Ausgabenkontrollen, Kontowiederherstellungsmechanismen und mehr.

<ExpandableCard title="Pectra-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

Bessere Benutzererfahrung:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA-Kontocode festlegen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Erhöhung des Blob-Durchsatzes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Erhöhung der Calldata-Kosten</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Blob-Zeitplan zu EL-Konfigurationsdateien hinzufügen</em></li>
</ul>

Bessere Staking-Erfahrung:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Erhöhung der <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Über die Ausführungsebene auslösbare Ausstiege</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Allgemeine Anfragen an die Ausführungsebene</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Bereitstellung von Validator-Einzahlungen auf der Blockchain</em></li>
</ul>

Verbesserungen der Protokolleffizienz und -sicherheit:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Vorkompilierung für BLS12-381-Kurvenoperationen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Speichern historischer Block-Hashes im Zustand</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Verschieben des Komitee-Index außerhalb der Bestätigungen</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Wie Pectra die Staking-Erfahrung verbessern wird](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Lesen Sie die Spezifikationen des Electra-Upgrades](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Prague-Electra („Pectra“) FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancun-Zusammenfassung {#cancun-summary}

Das Cancun-Upgrade enthält eine Reihe von Verbesserungen an Ethereums _Ausführung_, die darauf abzielen, die Skalierung in Verbindung mit den Deneb-Konsens-Upgrades zu verbessern.

Dazu gehört insbesondere EIP-4844, bekannt als **Proto-Danksharding**, das die Kosten für die Datenspeicherung für Ebene-2-Rollups erheblich senkt. Dies wird durch die Einführung von Daten-„Blobs“ erreicht, die es Rollups ermöglichen, Daten für kurze Zeit im Mainnet zu veröffentlichen. Dies führt zu deutlich niedrigeren Transaktionsgebühren für Benutzer von Ebene-2-Rollups.

<ExpandableCard title="Cancun-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Transiente Speicher-Opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon-Block-Root in der EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard-Blob-Transaktionen (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Speicher-Kopierbefehl</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> nur in derselben Transaktion</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code>-Opcode</em></li>
</ul>

</ExpandableCard>

- [Ebene-2-Rollups](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Lesen Sie die Spezifikation des Cancun-Upgrades](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb-Zusammenfassung {#deneb-summary}

Das Deneb-Upgrade enthält eine Reihe von Verbesserungen an Ethereums _Konsens_, die darauf abzielen, die Skalierung zu verbessern. Dieses Upgrade erfolgt in Verbindung mit den Cancun-Ausführungs-Upgrades, um Proto-Danksharding (EIP-4844) zu ermöglichen, zusammen mit anderen Verbesserungen an der Beacon Chain.

Vorgenerierte signierte „freiwillige Ausstiegsnachrichten“ laufen nicht mehr ab, was Benutzern, die ihre Mittel bei einem Drittanbieter-Blockchain-Knoten-Betreiber staken, mehr Kontrolle gibt. Mit dieser signierten Ausstiegsnachricht können Staker den Betrieb des Blockchain-Knotens delegieren und gleichzeitig die Möglichkeit behalten, jederzeit sicher auszusteigen und ihre Mittel abzuheben, ohne jemanden um Erlaubnis bitten zu müssen.

EIP-7514 bringt eine Verschärfung der Emission von ETH mit sich, indem die „Churn“-Rate, mit der Validatoren dem Netzwerk beitreten können, auf acht (8) pro Epoche begrenzt wird. Da die ETH-Emission proportional zu den gesamten gestakten ETH ist, begrenzt die Einschränkung der Anzahl der beitretenden Validatoren die _Wachstumsrate_ der neu ausgegebenen ETH, während gleichzeitig die Hardwareanforderungen für Blockchain-Knoten-Betreiber gesenkt werden, was der Dezentralisierung zugutekommt.

<ExpandableCard title="Deneb-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon-Block-Root in der EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard-Blob-Transaktionen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Dauerhaft gültige signierte freiwillige Ausstiege</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Erhöhung des maximalen Bestätigungs-Inklusions-Slots</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Hinzufügen eines maximalen Epochen-Churn-Limits</em></li>
</ul>

</ExpandableCard>

- [Lesen Sie die Spezifikationen des Deneb-Upgrades](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Cancun-Deneb („Dencun“) FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghai-Zusammenfassung {#shanghai-summary}

Das Shanghai-Upgrade brachte Staking-Auszahlungen auf die Ausführungsebene. In Verbindung mit dem Capella-Upgrade ermöglichte dies Blöcken, Auszahlungsoperationen zu akzeptieren, was es Stakern erlaubt, ihre ETH von der Beacon Chain auf die Ausführungsebene abzuheben.

<ExpandableCard title="Shanghai-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Startet die <code>COINBASE</code>-Adresse warm</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Neuer <code>PUSH0</code>-Befehl</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Begrenzung und Messung des Initcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Beacon-Chain-Push-Auszahlungen als Operationen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Veraltung von <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Lesen Sie die Spezifikation des Shanghai-Upgrades](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella-Zusammenfassung {#capella-summary}

Das Capella-Upgrade war das dritte große Upgrade der Konsensebene (Beacon Chain) und ermöglichte Staking-Auszahlungen. Capella fand synchron mit dem Upgrade der Ausführungsebene, Shanghai, statt und aktivierte die Staking-Auszahlungsfunktion.

Dieses Upgrade der Konsensebene brachte Stakern, die bei ihrer anfänglichen Einzahlung keine Auszahlungsdaten angegeben hatten, die Möglichkeit, dies nachzuholen und so Auszahlungen zu ermöglichen.

Das Upgrade bot auch eine automatische Konto-Sweeping-Funktion, die Validator-Konten kontinuierlich auf verfügbare Belohnungszahlungen oder vollständige Auszahlungen verarbeitet.

- [Mehr zu Staking-Auszahlungen](/staking/withdrawals/).
- [Lesen Sie die Spezifikationen des Capella-Upgrades](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Zusammenfassung {#paris-summary}

Das Paris-Upgrade wurde dadurch ausgelöst, dass die Proof-of-Work-Blockchain eine [terminale Gesamtschwierigkeit](/glossary/#terminal-total-difficulty) von 58750000000000000000000 überschritt. Dies geschah bei Block 15537393 am 15. September 2022 und löste das Paris-Upgrade im nächsten Block aus. Paris war der Übergang zu [The Merge](/roadmap/merge/) – sein Hauptmerkmal war das Abschalten des [Proof-of-Work](/developers/docs/consensus-mechanisms/pow)-Mining-Algorithmus und der zugehörigen Konsenslogik und stattdessen das Einschalten von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos). Paris selbst war ein Upgrade für die [Ausführungs-Clients](/developers/docs/nodes-and-clients/#execution-clients) (äquivalent zu Bellatrix auf der Konsensebene), das es ihnen ermöglichte, Anweisungen von ihren verbundenen [Konsens-Clients](/developers/docs/nodes-and-clients/#consensus-clients) entgegenzunehmen. Dies erforderte die Aktivierung einer neuen Reihe interner API-Methoden, die zusammen als [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) bekannt sind. Dies war wohl das bedeutendste Upgrade in der Geschichte von Ethereum seit [Homestead](#homestead)!

- [Lesen Sie die Spezifikation des Paris-Upgrades](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Upgrade des Konsenses auf Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Ersetzen des DIFFICULTY-Opcodes durch PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Zusammenfassung {#bellatrix-summary}

Das Bellatrix-Upgrade war das zweite geplante Upgrade für die [Beacon Chain](/roadmap/beacon-chain), das die Chain auf [The Merge](/roadmap/merge/) vorbereitete. Es bringt die Validator-Strafen für Inaktivität und Slashing-Vergehen auf ihre vollen Werte. Bellatrix enthält auch ein Update der Fork-Choice-Regeln, um die Chain auf The Merge und den Übergang vom letzten Proof-of-Work-Block zum ersten Proof-of-Stake-Block vorzubereiten. Dazu gehört, dass Konsens-Clients auf die [terminale Gesamtschwierigkeit](/glossary/#terminal-total-difficulty) von 58750000000000000000000 aufmerksam gemacht werden.

- [Lesen Sie die Spezifikation des Bellatrix-Upgrades](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Zusammenfassung {#gray-glacier-summary}

Das Gray-Glacier-Netzwerk-Upgrade verschob die [Schwierigkeitsbombe (Difficulty Bomb)](/glossary/#difficulty-bomb) um drei Monate nach hinten. Dies ist die einzige Änderung, die in diesem Upgrade eingeführt wurde, und ähnelt in ihrer Art den Upgrades [Arrow Glacier](#arrow-glacier) und [Muir Glacier](#muir-glacier). Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzantium](#byzantium), [Constantinople](#constantinople) und [London](#london) durchgeführt.

- [EF-Blog - Ankündigung des Gray-Glacier-Upgrades](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="Gray-Glacier-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>verzögert die Schwierigkeitsbombe bis September 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Zusammenfassung {#arrow-glacier-summary}

Das Arrow-Glacier-Netzwerk-Upgrade verschob die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um mehrere Monate nach hinten. Dies ist die einzige Änderung, die in diesem Upgrade eingeführt wurde, und ähnelt in ihrer Art dem [Muir Glacier](#muir-glacier)-Upgrade. Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzantium](#byzantium), [Constantinople](#constantinople) und [London](#london) durchgeführt.

- [EF-Blog - Ankündigung des Arrow-Glacier-Upgrades](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Ethereum Arrow-Glacier-Upgrade](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow-Glacier-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>verzögert die Schwierigkeitsbombe bis Juni 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Zusammenfassung {#altair-summary}

Das Altair-Upgrade war das erste geplante Upgrade für die [Beacon Chain](/roadmap/beacon-chain). Es fügte Unterstützung für „Sync-Komitees“ hinzu – was Light-Clients ermöglichte – und erhöhte die Strafen für Validator-Inaktivität und Slashing, während die Entwicklung in Richtung The Merge voranschritt.

- [Lesen Sie die Spezifikation des Altair-Upgrades](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Fun Fact! {#altair-fun-fact}

Altair war das erste große Netzwerk-Upgrade, das eine genaue Rollout-Zeit hatte. Jedes vorherige Upgrade basierte auf einer deklarierten Blocknummer auf der Proof-of-Work-Chain, bei der die Blockzeiten variieren. Die Beacon Chain erfordert keine Lösung für Proof-of-Work und arbeitet stattdessen mit einem zeitbasierten Epochensystem, das aus 32 zwölfsekündigen „Slots“ besteht, in denen Validatoren Blöcke vorschlagen können. Deshalb wussten wir genau, wann wir Epoche 74.240 erreichen würden und Altair live ging!

- [Blockzeit](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Zusammenfassung {#london-summary}

Das London-Upgrade führte [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ein, das den Transaktionsgebührenmarkt reformierte, zusammen mit Änderungen bei der Handhabung von Gas-Rückerstattungen und dem Zeitplan der [Eiszeit (Ice Age)](/glossary/#ice-age).

#### Was war das London-Upgrade / EIP-1559? {#eip-1559}

Vor dem London-Upgrade hatte Ethereum Blöcke mit fester Größe. In Zeiten hoher Netzwerknachfrage arbeiteten diese Blöcke mit voller Kapazität. Infolgedessen mussten Benutzer oft warten, bis die Nachfrage sank, um in einen Block aufgenommen zu werden, was zu einer schlechten Benutzererfahrung führte. Das London-Upgrade führte Blöcke mit variabler Größe in Ethereum ein.

Die Art und Weise, wie Transaktionsgebühren im Ethereum-Netzwerk berechnet wurden, änderte sich mit [dem London-Upgrade](/ethereum-forks/#london) vom August 2021. Vor dem London-Upgrade wurden die Gebühren ohne Trennung von `base`- und `priority`-Gebühren wie folgt berechnet:

Nehmen wir an, Alice musste Bob 1 ETH zahlen. In der Transaktion beträgt das Gaslimit 21.000 Einheiten und der Gaspreis 200 Gwei.

Die Gesamtgebühr hätte betragen: `Gaseinheiten (Limit) * Gaspreis pro Einheit`, d. h. `21.000 * 200 = 4.200.000 Gwei` oder 0,0042 ETH

Die Implementierung von [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) im London-Upgrade machte den Transaktionsgebührenmechanismus komplexer, aber die Gasgebühren vorhersehbarer, was zu einem effizienteren Transaktionsgebührenmarkt führte. Benutzer können Transaktionen mit einer `maxFeePerGas` einreichen, die dem entspricht, was sie für die Ausführung der Transaktion zu zahlen bereit sind, in dem Wissen, dass sie nicht mehr als den Marktpreis für Gas (`baseFeePerGas`) zahlen werden, und erhalten jeden Überschuss, abzüglich ihres Trinkgelds, zurückerstattet.

Dieses Video erklärt EIP-1559 und die Vorteile, die es bringt: [EIP-1559 Erklärt](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Sind Sie ein Dapp-Entwickler? Stellen Sie sicher, dass Sie Ihre Bibliotheken und Tools aktualisieren.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Lesen Sie die Erklärung der Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>verbessert den Transaktionsgebührenmarkt</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>gibt die <code>BASEFEE</code> aus einem Block zurück</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduziert Gas-Rückerstattungen für EVM-Operationen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>verhindert die Bereitstellung von Verträgen, die mit <code>0xEF</code> beginnen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>verzögert die Eiszeit bis Dezember 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Zusammenfassung {#berlin-summary}

Das Berlin-Upgrade optimierte die Gaskosten für bestimmte EVM-Aktionen und erhöht die Unterstützung für mehrere Transaktionstypen.

- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Lesen Sie die Erklärung der Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Upgrade enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>senkt die ModExp-Gaskosten</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>ermöglicht eine einfachere Unterstützung für mehrere Transaktionstypen</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>Erhöhung der Gaskosten für Zustandszugriffs-Opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>fügt optionale Zugriffslisten hinzu</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain Genesis {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Zusammenfassung {#beacon-chain-genesis-summary}

Die [Beacon Chain](/roadmap/beacon-chain/) benötigte 16.384 Einzahlungen von 32 gestakten ETH, um sicher zu starten. Dies geschah am 27. November, und die Beacon Chain begann am 1. Dezember 2020 mit der Produktion von Blöcken.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Die Beacon Chain
</DocLink>

---

### Staking deposit contract deployed {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Zusammenfassung {#deposit-contract-summary}

Der Staking-Einzahlungsvertrag führte das [Staking](/glossary/#staking) in das Ethereum-Ökosystem ein. Obwohl es sich um einen [Mainnet](/glossary/#mainnet)-Vertrag handelte, hatte er direkte Auswirkungen auf den Zeitplan für den Start der [Beacon Chain](/roadmap/beacon-chain/), einem wichtigen [Ethereum-Upgrade](/roadmap/).

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Zusammenfassung {#muir-glacier-summary}

Der Muir-Glacier-Fork führte eine Verzögerung der [Schwierigkeitsbombe](/glossary/#difficulty-bomb) ein. Erhöhungen der Blockschwierigkeit des [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)-Konsensmechanismus drohten die Nutzbarkeit von Ethereum zu verschlechtern, indem sie die Wartezeiten für das Senden von Transaktionen und die Nutzung von Dapps erhöhten.

- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Lesen Sie die Erklärung der Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir-Glacier-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>verzögert die Schwierigkeitsbombe um weitere 4.000.000 Blöcke oder ~611 Tage.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Zusammenfassung {#istanbul-summary}

Der Istanbul-Fork:

- Optimierte die [Gas](/glossary/#gas)-Kosten bestimmter Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Verbesserte die Widerstandsfähigkeit gegen Denial-of-Service-Angriffe.
- Machte [Ebene-2-Skalierungslösungen](/developers/docs/scaling/#layer-2-scaling) basierend auf SNARKs und STARKs leistungsfähiger.
- Ermöglichte die Interoperabilität von Ethereum und Zcash.
- Erlaubte Verträgen, kreativere Funktionen einzuführen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="Istanbul-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>ermöglicht Ethereum die Zusammenarbeit mit datenschutzfreundlichen Währungen wie Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>günstigere Kryptografie zur Verbesserung der [Gas](/glossary/#gas)-Kosten.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>schützt Ethereum vor Replay-Angriffen durch Hinzufügen des <code>CHAINID</code>-[Opcodes](/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>Optimierung der Opcode-Gaspreise basierend auf dem Verbrauch.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduziert die Kosten für CallData, um mehr Daten in Blöcken zu ermöglichen – gut für die [Ebene-2-Skalierung](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>weitere Änderungen der Opcode-Gaspreise.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Zusammenfassung {#constantinople-summary}

Der Constantinople-Fork:

- Reduzierte die [Block-Belohnung](/developers/docs/consensus-mechanisms/pow/mining/) für das Mining von 3 auf 2 ETH.
- Stellte sicher, dass die Blockchain nicht einfror, bevor [Proof-of-Stake implementiert wurde](#beacon-chain-genesis).
- Optimierte die [Gas](/glossary/#gas)-Kosten bestimmter Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Fügte die Möglichkeit hinzu, mit Adressen zu interagieren, die noch nicht erstellt wurden.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="Constantinople-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimiert die Kosten bestimmter Aktionen auf der Blockchain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>ermöglicht die Interaktion mit Adressen, die noch erstellt werden müssen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>führt den <code>EXTCODEHASH</code>-Befehl ein, um den Hash des Codes eines anderen Vertrags abzurufen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>stellt sicher, dass die Blockchain vor Proof-of-Stake nicht einfriert, und reduziert die Block-Belohnung von 3 auf 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Zusammenfassung {#byzantium-summary}

Der Byzantium-Fork:

- Reduzierte die [Block-Belohnung](/developers/docs/consensus-mechanisms/pow/mining/) für das Mining von 5 auf 3 ETH.
- Verzögerte die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um ein Jahr.
- Fügte die Möglichkeit hinzu, nicht-zustandsändernde Aufrufe an andere Verträge durchzuführen.
- Fügte bestimmte Kryptografie-Methoden hinzu, um die [Ebene-2-Skalierung](/developers/docs/scaling/#layer-2-scaling) zu ermöglichen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="Byzantium-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>fügt den <code>REVERT</code>-Opcode hinzu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>Statusfeld zu Transaktionsbelegen hinzugefügt, um Erfolg oder Misserfolg anzuzeigen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>fügt elliptische Kurven und Skalarmultiplikation hinzu, um [ZK-Snarks](/developers/docs/scaling/zk-rollups/) zu ermöglichen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>fügt elliptische Kurven und Skalarmultiplikation hinzu, um [ZK-Snarks](/developers/docs/scaling/zk-rollups/) zu ermöglichen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>ermöglicht die RSA-Signaturüberprüfung.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>fügt Unterstützung für Rückgabewerte variabler Länge hinzu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>fügt den <code>STATICCALL</code>-Opcode hinzu, der nicht-zustandsändernde Aufrufe an andere Verträge ermöglicht.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>ändert die Formel zur Anpassung der Schwierigkeit.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>verzögert die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um 1 Jahr und reduziert die Block-Belohnung von 5 auf 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Zusammenfassung {#spurious-dragon-summary}

Der Spurious-Dragon-Fork war die zweite Reaktion auf die Denial-of-Service-Angriffe (DoS) auf das Netzwerk (September/Oktober 2016), einschließlich:

- Anpassung der Opcode-Preise, um zukünftige Angriffe auf das Netzwerk zu verhindern.
- Ermöglichung der „Entschlackung“ (Debloat) des Blockchain-Zustands.
- Hinzufügen von Schutz vor Replay-Angriffen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="Spurious-Dragon-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>verhindert, dass Transaktionen von einer Ethereum-Chain auf einer alternativen Chain erneut gesendet werden, z. B. dass eine Testnet-Transaktion auf der Haupt-Ethereum-Chain wiederholt wird.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>passt die Preise des <code>EXP</code>-Opcodes an – macht es schwieriger, das Netzwerk durch rechenintensive Vertragsoperationen zu verlangsamen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>ermöglicht das Entfernen leerer Konten, die durch die DOS-Angriffe hinzugefügt wurden.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ändert die maximale Codegröße, die ein Vertrag auf der Blockchain haben kann – auf 24576 Bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Zusammenfassung {#tangerine-whistle-summary}

Der Tangerine-Whistle-Fork war die erste Reaktion auf die Denial-of-Service-Angriffe (DoS) auf das Netzwerk (September/Oktober 2016), einschließlich:

- Behebung dringender Probleme mit der Netzwerkgesundheit in Bezug auf zu niedrig bepreiste Operationscodes.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="Tangerine-Whistle-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>erhöht die Gaskosten von Opcodes, die bei Spam-Angriffen verwendet werden können.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduziert die Zustandsgröße durch Entfernen einer großen Anzahl leerer Konten, die aufgrund von Fehlern in früheren Versionen des Ethereum-Protokolls zu sehr geringen Kosten in den Zustand eingefügt wurden.</em></li>
</ul>

</ExpandableCard>

---

### DAO fork {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Zusammenfassung {#dao-fork-summary}

Der DAO-Fork war eine Reaktion auf den [DAO-Angriff von 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), bei dem ein unsicherer [DAO](/glossary/#dao)-Vertrag bei einem Hack um über 3,6 Millionen ETH erleichtert wurde. Der Fork verschob die Mittel aus dem fehlerhaften Vertrag in einen [neuen Vertrag](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) mit einer einzigen Funktion: Auszahlen (withdraw). Jeder, der Mittel verloren hatte, konnte 1 ETH für jeweils 100 DAO-Token in seinen Wallets abheben.

Über diese Vorgehensweise wurde von der Ethereum-Community abgestimmt. Jeder ETH-Inhaber konnte über eine Transaktion auf [einer Abstimmungsplattform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) abstimmen. Die Entscheidung für den Fork erreichte über 85 % der Stimmen.

Einige Miner weigerten sich, den Fork durchzuführen, da der DAO-Vorfall kein Fehler im Protokoll war. Sie gründeten daraufhin [Ethereum Classic](https://ethereumclassic.org/).

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Zusammenfassung {#homestead-summary}

Der Homestead-Fork, der in die Zukunft blickte. Er umfasste mehrere Protokolländerungen und eine Netzwerkänderung, die Ethereum die Möglichkeit gab, weitere Netzwerk-Upgrades durchzuführen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="Homestead-EIPs" contentPreview="Offizielle Verbesserungen, die in diesem Fork enthalten sind.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>nimmt Änderungen am Vertragserstellungsprozess vor.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>fügt neuen Opcode hinzu: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>führt devp2p-Vorwärtskompatibilitätsanforderungen ein</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Zusammenfassung {#frontier-thawing-summary}

Der Frontier-Thawing-Fork hob das Limit von 5.000 [Gas](/glossary/#gas) pro [Block](/glossary/#block) auf und setzte den Standard-Gaspreis auf 51 [Gwei](/glossary/#gwei). Dies ermöglichte Transaktionen – Transaktionen erfordern 21.000 Gas. Die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) wurde eingeführt, um einen zukünftigen Hard-Fork zu [Proof-of-Stake](/glossary/#pos) sicherzustellen.

- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Lesen Sie das Ethereum-Protokoll-Update 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Zusammenfassung {#frontier-summary}

Frontier war eine Live-, aber rudimentäre Implementierung des Ethereum-Projekts. Es folgte auf die erfolgreiche Olympic-Testphase. Es war für technische Benutzer, insbesondere Entwickler, gedacht. [Blöcke](/glossary/#block) hatten ein [Gaslimit](/glossary/#gas) von 5.000. Diese „Auftau“-Phase (Thawing) ermöglichte es Minern, ihren Betrieb aufzunehmen, und frühen Anwendern, ihre Clients zu installieren, ohne sich „beeilen“ zu müssen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Ether sale {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether ging offiziell für 42 Tage in den Verkauf. Man konnte es mit BTC kaufen.

[Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Yellowpaper released {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Das Yellow Paper, verfasst von Dr. Gavin Wood, ist eine technische Definition des Ethereum-Protokolls.

[Sehen Sie sich das Yellow Paper an](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper released {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Das Einführungspapier, das 2013 von Vitalik Buterin, dem Gründer von Ethereum, vor dem Start des Projekts im Jahr 2015 veröffentlicht wurde.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>