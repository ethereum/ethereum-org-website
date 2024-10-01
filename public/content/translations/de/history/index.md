---
title: Geschichte und Forks von Ethereum
description: Eine Geschichte der Ethereum-Blockchain, einschließlich der wichtigsten Meilensteine, Veröffentlichungen und Abspaltungen.
lang: de
sidebarDepth: 1
---

# Die Geschichte von Ethereum {#the-history-of-ethereum}

Ein Zeitstrang aller wichtigsten Meilensteine, Forks und Aktualisierungen der Ethereum-Blockchain.

<ExpandableCard title="Was sind Forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Forks entstehen, wenn größere technische Aktualisierungen oder Änderungen am Netzwerk vorgenommen werden müssen – sie gehen in der Regel aus <a href="/eips/">Ethereum-Verbesserungsvorschlägen (EIPs)</a> hervor und ändern die „Regeln“ des Protokolls.

Wenn für eine Standardsoftware eine Aktualisierung benötigt wird, veröffentlicht der Hersteller lediglich eine neue Version für den Endbenutzer. Blockchains arbeiten anders, da es keinen alleinigen Besitzer gibt. <a href="/developers/docs/nodes-and-clients/">Ethereum-Clients</a> müssen ihre Software aktualisieren, um die neuen Fork-Regeln zu implementieren. Plus Block Ersteller (Miner in einer Proof-of-Work Umgebung, Validatoren in einer Proof-of-Stake Umgebung) und Nodes erstellen neue Blöcke und müssen diese, entsprechend der neuen Richtlinien, validieren. <a href="/developers/docs/consensus-mechanisms/">Mehr zu Konsensmechanismen</a>
Diese Regeländerungen können eine vorübergehende Aufspaltung des Netzwerks verursachen. Neue Blöcke konnen nach den neuen oder den alten Regeln erzeugt werden. Forks werden in der Regel im Voraus vereinbart, damit die Clients die Änderungen einheitlich übernehmen und der Fork mit den Upgrades zur Main Chain wird. In seltenen Fällen können jedoch Meinungsverschiedenheiten über Forks dazu führen, dass das Netzwerk dauerhaft gespalten wird – am bekanntesten ist die Entstehung von Ethereum Classic durch den <a href="#dao-fork">DAO Fork</a>.

</ExpandableCard>

Springen Sie direkt zu Informationen über einige besonders wichtige vergangene Upgrades: [Die Beacon Chain](/roadmap/beacon-chain/); [Die Zusammenführung](/roadmap/merge/); und [EIP-1559](#london)

Suchen Sie nach weiteren Protokoll-Upgrades? [Erfahren Sie mehr über anstehende Upgrades auf der Ethereum-Roadmap](/roadmap/).

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghai-Zusammenfassung {#shanghai-summary}

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

- [Lesen Sie die Spezifikation für das Shanghai-Upgrade](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella-Zusammenfassung {#capella-summary}

Das Capella-Update war das drittgrößte Upgrade für die Konsensebene (Beacon Chain) und ermöglichte Staking-Abhebungen. Mit Capella, das gleichzeitig mit dem Upgrade der Ausführungsebene, Shanghai, erfolgte, wurde die Staking-Abhebungsfunktion zur Verfügung gestellt.

Das Upgrade für die Konsensebene ermöglichte es Stakern, die bei der ersten Einzahlung keine Abhebungen vornehmen durften, Abhebungen vorzunehmen.

Das Upgrade hat auch eine automatische Kontenbereinigungsfunktion bereitgestellt, die kontinuierlich Validator-Konten auf verfügbare Prämienzahlungen oder vollständige Abhebungen überprüft und verarbeitet.

- [Mehr zu Staking-Auszahlungen](/staking/withdrawals/).
- [Lesen Sie die Spezifikationen für das Capella-Upgrade](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Die Zusammenführung) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Zusammenfassung {#paris-summary}

Das Paris-Upgrade wurde durch das Erreichen einer [endgültigen Gesamtschwierigkeit](/glossary/#terminal-total-difficulty) von 58750000000000000000000 auf der Proof-of-Work-Blockchain ausgelöst. Dies geschah am 15. September 2022 im Block 15537393 und löste das Paris-Upgrade im nächsten Block aus. Paris war der Übergang zur [Zusammenführung (The Merge)](/roadmap/merge/) – seine wichtigste Funktion bestand darin, den [Proof-of-Work](/developers/docs/consensus-mechanisms/pow)-Mining-Algorithmus und die damit verbundene Konsenslogik abzuschalten und stattdessen [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) einzuschalten. Paris selbst war ein Upgrade für die [Ausführungsclients](/developers/docs/nodes-and-clients/#execution-clients) (entspricht Bellatrix auf der Konsensebene), das ihnen ermöglichte, Anweisungen von ihren verbundenen [Konsensclients](/developers/docs/nodes-and-clients/#consensus-clients) entgegenzunehmen. Hierfür musste ein neuer Satz interner API-Methoden aktiviert werden, der gemeinsam als [Engine-API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) bekannt ist. Dies war wohl das bedeutendste Upgrade in der Geschichte von Ethereum seit [Homestead](#homestead)!

- [Lesen Sie die Spezifikation für das Paris-Upgrade](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

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

Das Bellatrix-Upgrade war das zweite geplante Upgrade für die [Beacon Chain](/roadmap/beacon-chain), das die Blockchain auf die [die Zusammenführung](/roadmap/merge/) vorbereitete. Es setzt Validator-Strafen für Inaktivität und strafbare Vergehen auf alle ihre Werte. Bellatrix beinhaltet auch eine Aktualisierung der Fork-Choice-Regeln, um die Blockchain auf die Zusammenführung und den Übergang vom letzten Proof-of-Work-Block zum ersten Proof-of-Stake-Block vorzubereiten. Dies beinhaltet auch, dass die Konsensclients über die [Terminale Gesamtschwierigkeit](/glossary/#terminal-total-difficulty) von 58750000000000000000000 informiert werden.

- [Lesen Sie die Spezifikation des Bellatrix-Upgrades](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Zusammenfassung {#gray-glacier-summary}

Das Gray Glacier Netzwerk-Upgrade hat die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um drei Monate nach hinten verschoben. Dies ist die einzige Änderung, die in diesem Upgrade eingeführt wurde, und ähnelt den [Arrow Glacier](#arrow-glacier) und [Muir Glacier](#muir-glacier) Upgrades. Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzantium](#byzantium),[Constantinople](#constantinople) und [London](#london) durchgeführt.

- [EF Blog - Gray Glacier Upgrade-Ankündigung](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

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

Das Arrow Glacier Netzwerk-Upgrade hat die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um mehrere Monate nach hinten geschoben. Dies ist die einzige Änderung, die mit diesem Upgrade eingeführt wird, und ähnelt dem [Muir Glacier](#muir-glacier)-Upgrade. Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzantium](#byzantium),[Constantinople](#constantinople) und [London](#london) durchgeführt.

- [EF Blog – Ankündigung des Arrow Glacier-Upgrades](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders – Ethereum Arrow Glacier-Upgrade](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

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

- [Lesen Sie die Spezifikation zum Altair-Upgrade](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} className="me-2" />Fun Fact! {#altair-fun-fact}

Altair war das erste große Netzwerk-Upgrade, für das es einen genauen Einführungszeitpunkt gab. Jedes vorherige Upgrade basierte auf einer angegebenen Blocknummer auf der Proof-of-Work-Chain, bei der die Blockzeiten variieren. Die Beacon Chain erfordert kein Lösen von Proof-of-Work und arbeitet stattdessen mit einem zeitbasierten Epochensystem, das aus 32 zwölfsekündigen „Slots" besteht, in denen Validatoren Blöcke vorschlagen können. Deshalb wussten wir genau, wann wir Epoche 74.240 erreichen würden und Altair live gehen würde!

- [Blockzeit](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Zusammenfassung {#london-summary}

Das London-Upgrade führte die [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ein, das den Markt für Transaktionsgebühren reformierte sowie Änderungen bei der Handhabung von Gasrückerstattungen und dem [Ice-Age](/glossary/#ice-age)-Zeitplan beinhaltete.

- [Sind Sie ein dApp-Entwickler? Bitte aktualisieren Sie Ihre Bibliotheken und Werkzeuge.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lesen Sie die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lesen Sie die Erklärung der Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

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

Mit dem Berlin-Upgrade wurden die Gaskosten für bestimmte EVM-Aktionen optimiert und die Unterstützung für mehrere Transaktionsarten erweitert.

- [Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Lies die Erklärung der Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

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

### Entstehungsgeschichte der Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Zusammenfassung {#beacon-chain-genesis-summary}

Die [Beacon Chain](/roadmap/beacon-chain/) benötigte zum sicheren Betrieb 16.384 Einzahlungen von 32 gestakten ETH. Dazu kam es am 27. November, was bedeutet, dass die Beacon Chain am 1. Dezember 2020 mit der Erzeugung von Blöcken begann. Dies ist ein wichtiger erster Schritt zur Verwirklichung der [Ethereum-Vision](/roadmap/vision/).

[Die Ankündigung der Ethereum Foundation lesen](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Die Beacon Chain
</DocLink>

---

### Staking-Einzahlungsvertrag bereitgestellt {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Zusammenfassung {#deposit-contract-summary}

Mit dem Staking-Einzahlungsvertrag wurde [Staking](/glossary/#staking) im Ökosystem von Ethereum eingeführt. Obwohl es sich um einen [Mainnet](/glossary/#mainnet)-Vertrag handelt, hatte er einen direkten Einfluss auf den Zeitplan für die Einführung der [Beacon Chain](/roadmap/beacon-chain/), einem wichtigen [Ethereum-Upgrade](/roadmap/).

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Zusammenfassung {#muir-glacier-summary}

Die Muir-Glacier-Fork führte eine Verzögerung in die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) ein. Erhöhungen der Blockschwierigkeitsstufe des [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)-Konsensmechanismus drohten, die Nutzbarkeit von Ethereum zu verringern, indem die Wartezeiten für das Senden von Transaktionen und die Verwendung von dApps erhöht werden.

- [Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lies die Erklärung der Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

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

Die Istanbul-Fork:

- Optimierte die [Gaskosten](/glossary/#gas) für bestimmte Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Verbesserte Widerstandskraft gegen Denial-of-Service-Angriffe.
- Machte [Skalierungslösungen der Ebene 2](/developers/docs/scaling/#layer-2-scaling) basierend auf SNARKs und STARKs leistungsstärker.
- Aktivierte Ethereum und Zcash zur Interoperation.
- Ermöglichte Verträgen, kreativere Funktionen einzuführen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>ermöglicht es dem Ethereum-Netzwerk, mit anonymen Währungen wie Zcash zu arbeiten, wodurch das Recht auf Privatsphäre geschützt werden kann.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>eine günstigere Kryptographie zur Optimierung der <a href="/glossary/#gas">Gaskosten</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>schützt Ethereum vor Wiederholungsangriffen durch Hinzufügen des <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">-Opcodes</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>die Optimierung der Gaspreis-Verfahrenscodes auf der Grundlage des Gasverbrauchs.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduziert die Kosten für „CallData“, mit dem Ziel, mehr Daten in den Blöcken zu implementieren – gut für <a href="/developers/docs/scaling/#layer-2-scaling">Layer-2-Skalierbarkeit</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>
weitere Änderungen der Gaspreisverfahrenscodes.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Zusammenfassung {#constantinople-summary}

Die Constantinople-Fork:

- Sie stellte sicher, dass die Blockchain nicht einfrieren konnte, bevor der [Proof-of-Stake](#beacon-chain-genesis) implementiert wurde.
- Optimierte die [Gas-](/glossary/#gas)-Kosten für bestimmte Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Fügte die Möglichkeit hinzu, mit Adressen zu interagieren, die noch nicht erstellt wurden.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople-EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimiert die Kosten von bestimmten On-Chain-Aktionen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>erlaubt es Ihnen, Adressen zu verwenden, die noch nicht angelegt wurden.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>optimiert die Kosten bestimmter On-Chain-Aktionen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>stellt sicher, dass die Blockchain vor dem Proof-of-Stake-Verfahren nicht eingefroren wird.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Zusammenfassung {#byzantium-summary}

Die Byzantium-Fork:

- Reduzierte die Block-[Mining](/developers/docs/consensus-mechanisms/pow/mining/)-Prämien von 5 auf 3 ETH.
- Verzögerte die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um ein Jahr.
- Fügte die Möglichkeit hinzu, nicht zustandsverändernde Aufrufe zu anderen Verträgen zu tätigen.
- Fügte bestimmte Kryptographie-Methoden hinzu, um [Layer-2-Skalierung](/developers/docs/scaling/#layer-2-scaling) zu ermöglichen.

[Die Ankündigung der Ethereum Foundation lesen](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium-EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>integriert den Operationscode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>Statusfeld zu Transaktionsbelegen hinzugefügt, Erfolg oder Misserfolg anzuzeigen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>integriert die elliptische Kurve sowie die Multiplikation mit einem Skalar, die die Verwendung von <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks </a></em> ermöglichen.</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>fügt elliptische Kurven und Skalarmultiplikation hinzu, um <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a> zu ermöglichen.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>aktiviert Überprüfung der RSA-Signatur.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>fügt Unterstützung der Ausgabewerte eines Variableninhalts hinzu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>integriert den Verfahrenscode, <code>STATICCALL</code> der nicht zustandsveränderte Aufrufe für andere Verträge erlaubt.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>ändert die Formel für die Einstellung des Schwierigkeitsgrades.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>verzögert die <a href="/glossary/#difficulty-bomb"> Schwierigkeitsbombe</a> um ein Jahr und senkt die vollen Blockprämien von 5 auf 3 ETH.</em></li>
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

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

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

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle-EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>erhöht die Gaskosten der Verfahrenscodes, die bei Spam-Attacken verwendet werden können.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduziert die Zustandsgröße, indem sie eine große Anzahl leerer Konten entfernt, die aufgrund von Fehlern in früheren Versionen des Ethereum-Protokolls ursprünglich minimale Transaktionsgebühren enthielten.</em></li>
</ul>

</ExpandableCard>

---

### DAO-Fork {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Zusammenfassung {#dao-fork-summary}

Die DAO-Abspaltung war eine Reaktion auf den [DAO-Angriff 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), bei dem einem unsicheren [DAO](/glossary/#dao)-Vertrag durch einen Hack über 3,6 Millionen ETH entzogen wurden. Die Fork verschiebt das Guthaben aus dem fehlerhaften Vertrag in einen [neuen Vertrag](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) mit einer einzigen Funktion: Abheben. Jeder, der Geld verloren hat, konnte 1 ETH für jeden 100 DAO-Token in seiner Wallet abheben.

Über diese Vorgehensweise wurde seitens der Ethereum-Community abgestimmt. Jeder ETH-Inhaber konnte über eine Transaktion auf [, einer Abstimmungsplattform,](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) abstimmen. Die Entscheidung für die Fork erhielt mehr als 85 % der Stimmen.

Einige Miner weigerten sich, die Abspaltung mitzutragen, da der Vorfall des DAO keinen Fehler im Protokoll darstellte. Sie gründeten daraufhin [Ethereum Classic](https://ethereumclassic.org/).

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Zusammenfassung {#homestead-summary}

Die Homestead-Fork, die in die Zukunft schaute. Sie enthielt mehrere Protokolländerungen und eine Änderung des Netzwerks, die Ethereum die Möglichkeit gab, weitere Netzwerk-Upgrades durchzuführen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

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

Die Frontier-Thawing-Fork hob das 5.000 [Gas](/glossary/#gas)-Limit pro [Block](/glossary/#block) auf und setzte den Standardgaspreis auf 51 [gwei](/glossary/#gwei). Dies erlaubte Transaktionen – Transaktionen benötigen 21.000 Gas. Die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) wurde eingeführt, um eine zukünftige harte Abspaltung zu [Proof-of-Stake](/glossary/#pos) sicherzustellen.

- [Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Lesen Sie das Ethereum Protokoll-Update 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Zusammenfassung {#frontier-summary}

Frontier war live, aber soweit nur die Implementierung eines grundsätzlichen Rahmens des Ethereum-Projekts. Es folgte der erfolgreichen olympischen Testphase. Es war für technische Benutzer gedacht, speziell für Entwickler. [Blöcke](/glossary/#block) hatten ein [Gas](/glossary/#gas)-Limit von 5.000. Diese Zeit des „Auftauens" ermöglichte es den Minern, ihren Betrieb zu starten und für Early-Adopters, ihre Kunden zu installieren, ohne dies „überstürzen“ zu müssen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether-Verkauf {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether ging offiziell 42 Tage lang in den Verkauf. Man konnte es mit BTC kaufen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper veröffentlicht {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Das Yellowpaper, verfasst von Dr. Gavin Wood, ist eine technische Definition des Ethereum-Protokolls.

[Yellowpaper anzeigen](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper veröffentlicht {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Dieses einleitende Papier wurde ursprünglich 2013 von Vitalik Buterin, dem Gründer von Ethereum, vor dem Projektstart im Jahr 2015 veröffentlicht.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
