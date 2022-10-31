---
title: Geschichte und Forks von Ethereum
description: Eine Geschichte der Ethereum-Blockchain, einschließlich der wichtigsten Meilensteine, Veröffentlichungen und Abspaltungen.
lang: de
sidebarDepth: 1
---

# Die Geschichte von Ethereum {#the-history-of-ethereum}

Ein Zeitstrang aller wichtigsten Meilensteine, Forks und Aktualisierungen der Ethereum-Blockchain.

<ExpandableCard title="Was sind Forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Forks entstehen, wenn wichtige technische Neuerungen oder Änderungen am Netzwerk vorgenommen werden müssen. Sie stammen in der Regel von den [Ethereum-Verbesserungsvorschlägen (EIPs)](/eips) ab und verändern die "Richtlinien" des Protokolls.

Wenn für eine Standardsoftware eine Aktualisierung benötigt wird, veröffentlicht der Hersteller lediglich eine neue Version für den Endbenutzer. Blockchains arbeiten anders, da es keinen alleinigen Besitzer gibt. [Ethereum Anwendungen](/developers/docs/nodes-and-clients/) müssen die Software aktualisieren um neue Regeln zu implementieren. Plus Block Ersteller (Miner in einer Proof-of-Work Umgebung, Validatoren in einer Proof-of-Stake Umgebung) und Nodes erstellen neue Blöcke und müssen diese, entsprechend der neuen Richtlinien, validieren. [Mehr zu Konsensmechanismen](/Entwickler/Dokumente/Konsensmechanismen/)

Diese Regeländerungen können eine temporäre Teilung im Netzwerk erzeugen. Neue Blöcke konnen nach den neuen oder den alten Regeln erzeugt werden. Forks werden in der Regel im Voraus vereinbart, damit die Clients die Änderungen einheitlich übernehmen und der Fork mit den Upgrades zur Main Chain wird. In seltenen Fällen jedoch können Meinungsverschiedenheiten über Forks zu einer dauerhaften Spaltung des Netzwerks führen; am bekanntesten ist die Gründung von Ethereum Classic durch den [[DAO-Fork]](#dao-fork).

</ExpandableCard>

Suchst du nach weiteren Protokoll Verbesserungen? [Erfahre etwas über bevorstehende Upgrades von Ethereum](/upgrades/).

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>09.Dezember.2021 19:55:23 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Blocknummer: <a href="https://etherscan.io/block/13773000">13.773.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH-Preis: $4111 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#arrow-glacier-summary}

Das Arrow Glacier Netzwerk-Upgrade hat die [Difficulty Bomb](/glossary/#difficulty-bomb) um mehrere Monate nach hinten geschoben. Dies ist die einzige Änderung, die mit diesem Upgrade eingeführt wird, und ähnelt dem [Muir-Glacier](#muir-glacier)-Upgrade. Ähnliche Änderungen wurden bei den Netzwerk-Upgrades [Byzantium](#byzantium),[Constantinople](#constantinople) und [London](#london) durchgeführt.

- [EF Blog – Ankündigung des Arrow-Glacier-Upgrades](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders – Ethereum-Arrow-Glacier-Upgrade](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _Verschiebung der Schwierigkeitsbombe bis Juni 2022_

</ExpandableCard>

#### <Emoji text=":police_car_light:" size={1} mr="0.5rem" />Node-Betreiber {#arrow-glacier-node-operators}

Achte darauf, dass du deine Client-Software vor dem 5. Dezember 2021 auf die neueste Version aktualisierst, um die variablen Blockzeiten zu berücksichtigen. So vermeidest du, dass sich dein Client mit einer Pre-Fork-Kette synchronisiert, was zur Folge hat, dass er keine Gelder senden oder Transaktionen nicht ordnungsgemäß verifizieren kann.

---

### Altair {#altair}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>27.Oktober.2021 10:56:23 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Epoche-Nummer: 74,240<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH-Preis: $4024 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#altair-summary}

Das Altair-Upgrade war das erste geplante Upgrade für die [Beacon Chain](/upgrades/beacon-chain). Es wurde als Unterstützung für "Sync-Ausschüsse" hinzugefügt, die Light-Clients aktivieren und die Strafen für Inaktivität und Slashing auf ihre vollen Werte anheben.

- [Lies die Altair-Upgrade-Spezifikation](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} mr="0.5rem" />Fun Fact! {#altair-fun-fact}

Altair war das erste große Netzwerk-Upgrade, für das es einen genauen Einführungszeitpunkt gab. Jedes vorherige Upgrade basierte auf einer angegebenen Blocknummer auf der Proof-of-Work-Kette, bei der die Blockzeiten variieren. Die Beacon Chain erfordert kein Lösen von Proof-of-Work und arbeitet stattdessen mit einem zeitbasierten Epochensystem, das aus 32 zwölfsekündigen "Slots" besteht, in denen Validatoren Blöcke vorschlagen können. Deshalb wussten wir genau, wann wir Epoche 74.240 erreichen würden und Altair live gehen würde!

- [Beaconcha.in Glossary – Slots](https://kb.beaconcha.in/glossary#slots)

---

### London {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>05.August.2021 12:33:42 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/12965000">12.965.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $2621 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#london-summary}

Das London-Upgrade führte die [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ein, die den Markt für Transaktionsgebühren reformierte sowie Änderungen bei der Handhabung von Gasrückerstattungen und dem [Ice-Age](/glossary/#ice-age)-Zeitplan beinhaltete.

- [Bist du ein dApp-Entwickler? Achte darauf, dass du deine Bibliotheken und Tools aktualisierst.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lies die Erklärung der Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _verbessert den Markt für Transaktionsgebühren_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _gibt die `BASEFEE` aus einem Block zurück_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _reduziert die Gasrückerstattungen für den EVM-Betrieb_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _verhindert die Bereitstellung von Verträgen, die mit `0xEF` beginnen_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _verschiebt die Eiszeit auf Dezember 2021_

</ExpandableCard>

---

### Berlin {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>15.April.2021 10:07:03 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/12244000">12.244.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $2454 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#berlin-summary}

Mit dem Berlin-Upgrade wurden die Gaskosten für bestimmte EVM-Aktionen optimiert und die Unterstützung für mehrere Transaktionsarten erweitert.

- [Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Lies die Erklärung der Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _senkt ModExp-Gaskosten_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _ermöglicht eine einfachere Unterstützung für mehrere Transaktionsarten_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _Gaskostenerhöhungen für staatliche Zugangsopcodes_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _fügt optionale Zugriffslisten hinzu_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Entstehungsgeschichte der Beacon Chain {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>01.Dezember.2020 12:00:35 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Beacon-Chain-Blocknummer: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $586,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#beacon-chain-genesis-summary}

Die [Beacon Chain](/upgrades/beacon-chain/) brauchte 16384 Einzahlungen von 32 gestakten ETH, um sicher zu versenden. Dazu kam es am 27. November, was bedeutet, dass die Beacon Chain am 1. Dezember 2020 mit der Erzeugung von Blöcken begonnen hat. Dies ist ein wichtiger erster Schritt, um die [Ethereum-Vision](/upgrades/vision/) zu erreichen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  Die Beacon Chain
</DocLink>

---

### Staking-Einzahlungsvertrag auf Ethereum hochgeladen {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14.Oktober.2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/11052984">11.052.984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $379,04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#deposit-contract-summary}

Mit dem Staking-Einzahlungsvertrag wurde [Staking](/glossary/#staking) im Ethereum-Ökosystem eingeführt. Obwohl es sich um einen [Mainnet](/glossary/#mainnet)-Vertrag handelt, hatte er einen direkten Einfluss auf den Zeitplan für die Einführung der [Beacon Chain](/upgrades/beacon-chain/), ein wichtiges [Ethereum-Upgrade](/upgrades/).

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>02.Januar.2020 08:30:49 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/9200000">9.200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $127,18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#muir-glacier-summary}

Die Muir-Glacier-Fork führte eine Verzögerung in die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) ein. Erhöht die Blockschwierigkeitsstufe des [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)-Konsensmechanismus, um die Nutzbarkeit von Ethereum zu verringern und die Dringlichkeit weiterer Updates zu verankern, indem die Wartezeiten für das Senden von Transaktionen und die Verwendung von dApps erhöht werden.

- [Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lies die Erklärung der Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _verzögert die Schwierigkeitsbombe auf weitere 4.000.000 Blöcke oder ~611 Tage._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>08.Dezember.2019 12:25:09 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/9069000">9.069.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $151,06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#istanbul-summary}

Die Istanbul-Fork:

- Optimierte [Gas-](/glossary/#gas)Kosten für bestimmte Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Verbesserte Denial-of-Service-Angriffswiderstandskraft.
- Machte [Layer-2 Skalierungslösungen](/developers/docs/scaling/#layer-2-scaling) basierend auf SNARKs und STARKs performanter.
- Aktivierte Ethereum und Zcash zur Interoperation.
- Erlaubte Verträge zur Einführung kreativerer Funktionen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) - _Erlaubt Ethereum, mit datenschutzfreundlichen Währungen wie Zcash zu arbeiten._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) - _billigere Kryptographie zur Verbesserung der [Gas](/Glossar/#Gas) Kosten._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) - _Schutz von Ethereum vor Replay-Angriffen durch Hinzufügen von `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) - _Optimierung der Opcode-Gaspreise basierend auf dem Verbrauch._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) - _verringert die Kosten für CallData, um mehr Daten in Blöcken zu ermöglichen - gut für [Layer-2-Skalierung](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) - _andere Opcode-Gaspreis-Änderungen._

Übersetzt mit www.DeepL.com/Translator (kostenlose Version)

</ExpandableCard>

---

### Konstantinopel {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28.Februar.2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/7280000">7.280.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $136,29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#constantinople-summary}

Die Konstantinopel-Fork:

- Stellte sicher, dass die Blockchain nicht einfrieren konnte, bevor [Proof-of-Stake](#beacon-chain-genesis) implementiert wurde.
- Optimierte [Gas-](/glossary/#gas)Kosten für bestimmte Aktionen in der [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Fügte die Möglichkeit, mit Adressen zu interagieren, die noch nicht erstellt wurden, hinzu.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimises cost of certain on-chain actions._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _allows you to interact with addresses that have yet to be created._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimises cost of certain on-chain actions._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _makes sure the blockchain doesn't freeze before proof-of-stake._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16.Oktober.2017 05:22:11 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/4370000">4.370.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $334,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#byzantium-summary}

Die Byzantium-Fork:

- Reduzierte Block-[Mining](/developers/docs/consensus-mechanisms/pow/mining/)-Belohnungen von 5 auf 3 ETH.
- Verzögerte die [Schwierigkeitsbombe](/glossary/#difficulty-bomb) um ein Jahr.
- Fügte die Möglichkeit, nicht zustandsveränderte Aufrufe zu anderen Verträgen zu tätigen, hinzu.
- Bestimmte Kryptographie-Methoden wurden hinzugefügt, um [Layer-2-Skalierung](/developers/docs/scaling/#layer-2-scaling) zu ermöglichen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) - _Ergänzt `REVERT` Opcode._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) - _Statusfeld zu Transaktionsbestätigungen hinzugefügt, um Erfolg oder Misserfolg anzuzeigen._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) - _erweitert elliptische Kurve und skalare Multiplikation, um [ZK-Snarks](/developers/docs/scaling/zk-rollups/) zu ermöglichen._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) - \_erweitert elliptische Kurve und Skalarmultiplikation, um [ZK-Snarks](/entwickler/docs/scaling/zk-rollups/) zu ermöglichen.
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) - _ermöglicht RSA-Signaturprüfung._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) - _erweitert die Unterstützung für Rückgabewerte variabler Länge._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) - _erweitert den `STATICCALL`-Opcode, der nicht zustandsverändernde Aufrufe zu anderen Verträgen erlaubt._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) - _Ändert die Formel für die Schwierigkeitsanpassung._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) - _verzögert [difficulty bomb](/glossary/#difficulty-bomb) um 1 Jahr und reduziert die Blockbelohnung von 5 auf 3 ETH._

Übersetzt mit www.DeepL.com/Translator (kostenlose Version)

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22.November.2016 04:15:44 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/2675000">2.675.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $9,84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#spurious-dragon-summary}

Die Spurious-Dragon-Fork war die zweite Reaktion auf die Denial-of-Service(DoS)-Angriffe auf das Netzwerk (September/Oktober 2016) einschließlich:

- Abstimmung von Opcode-Preisen, um zukünftige Angriffe auf das Netzwerk zu verhindern
- Aktivierung des „Debloat“ (Wachstumsveringerung) des Blockchain-Zustands
- Hinzufügen von Replay-Angriffsschutz

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _verhindert, dass Transaktionen von einer Ethereum-Kette auf eine andere Kette übertragen werden, z. B. eine Testnetz-Transaktion, die auf der Hauptkette von Ethereum wiedergegeben wird._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _passt die Preise für den Opcode "EXP" an - erschwert die Verlangsamung des Netzes durch rechenintensive Vertragsoperationen._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _ermöglicht die Entfernung von leeren Nodes, die durch DOS-Angriffe hinzugefügt wurden._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _ändert die maximale Codegröße, die ein Vertrag auf der Blockchain haben kann, auf 24576 Bytes._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18.Oktober.2016 01:19:31 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/2463000">2.463.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#tangerine-whistle-summary}

Die Tangerine-Whistle-Fork war die erste Reaktion auf die Denial-of-Service(DoS)-Angriffe auf das Netzwerk (September/Oktober 2016) einschließlich:

- Lösung dringender Probleme im Bereich der Netzwerkgesundheit im Zusammenhang mit unterbewerteten Operationscodes

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _increases gas costs of opcodes that can be used in spam attacks._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduces state size by removing a large number of empty accounts that were put in the state at very low cost due to flaws in earlier versions of the Ethereum protocol._

</ExpandableCard>

---

### DAO-Fork {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20.Juli.2016 01:20:40 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/1920000">1.920.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#dao-fork-summary}

Die DAO-Fork war eine Reaktion auf den [DAO-Angriff 2016](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/), bei dem einem unsicheren [DAO](/glossary/#dao)-Vertrag durch einen Hack über 3,6 Millionen ETH entzogen wurden. Die Fork verschob die Gelder aus dem fehlerhaften Vertrag in einen [neuen Vertrag](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) mit einer einzigen Funktion: Abheben. Jeder, der Geld verloren hatte, konnte 1 ETH für jede 100 DAO-Token in seiner Wallet abheben.

Über diese Vorgehensweise wurde von der Ethereum-Community abgestimmt. Jeder ETH-Inhaber konnte über eine Transaktion auf [einer Abstimmungsplattform](http://v1.carbonvote.com/) abstimmen. Die Entscheidung für die Fork erhielt mehr als 85 % der Stimmen.

Einige Miner weigerten sich, die Veränderungen mitzutragen, da der DAO-Vorfall kein Fehler im Protokoll war. Sie gründeten daraufhin [Ethereum Classic](https://ethereumclassic.org/).

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14.März.2016 18:49:53 Uhr +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/1150000">1.150.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#homestead-summary}

Die Homestead-Fork, die in die Zukunft schaute. Sie enthielt mehrere Protokolländerungen und eine Änderung des Netzwerks, die Ethereum die Möglichkeit gab, weitere Netzwerk-Upgrades durchzuführen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _makes edits to contract creation process._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _adds new opcode: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduces devp2p forward compatibility requirements_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/200000">200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: $1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org auf waybackmachine</a>

#### Zusammenfassung {#frontier-thawing-summary}

Die Frontier-Thawing-Fork hob das Limit von 5.000 [Gas](/glossary/#gas) pro [Block](/glossary/#block) und setzte den Standardgaspreis auf 51 [gwei](/glossary/#gwei) fest. Dies erlaubte Transaktionen – Transaktionen benötigen 21.000 Gas.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blocknummer: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH-Preis: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Zusammenfassung {#frontier-summary}

Frontier war live, aber soweit nur die Implementierung eines grundsätzlichen Rahmens des Ethereum-Projekts. Es folgte die erfolgreiche Olympic-Testphase. Es war für technische Benutzer gedacht, speziell für Entwickler. [Blöcke](/glossary/#block) hatten ein [Gas](/glossary/#gas)-Limit von 5.000. Diese Zeit des "Auftauens" ermöglichte es den Minern, ihren Betrieb zu starten, und frühen Anwendern, ihre Clients zu installieren, ohne etwas „überstürzen“ zu müssen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether-Verkauf {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> July 22 - September 02, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

Ether ging offiziell 42 Tage lang in den Verkauf. Man konnte es mit BTC kaufen.

[Lies die Ankündigung der Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper veröffentlicht {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> April 01, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

Das Yellowpaper, verfasst von Dr. Gavin Wood, ist eine technische Definition des Ethereum-Protokolls.

[Yellowpaper anzeigen](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper veröffentlicht {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> November 27, 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org on waybackmachine</a>

Dieses einleitende Paper wurde ursprünglich 2013 von Vitalik Buterin, dem Gründer von Ethereum, vor dem Projektstart im Jahr 2015 veröffentlicht.

<DocLink to="/whitepaper/">
  Whitepaper
</DocLink>
