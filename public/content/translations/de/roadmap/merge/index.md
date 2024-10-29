---
title: Die Zusammenführung
description: Erfahren Sie mehr über die Zusammenführung, als Mainnet Ethereum Proof-of-Stake einführte.
lang: de
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Im Ethereum Mainnet wird Proof-of-Stake verwendet, aber dies war nicht immer der Fall.
summaryPoint2: Der Wechsel vom ursprünglichen Proof-of-Work-Mechanismus zu Proof-of-Stake wurde The Merge genannt.
summaryPoint3: The Merge bezieht sich darauf, dass das ursprüngliche Ethereum Mainnet mit einer separaten Proof-of-Stake-Blockchain namens Beacon Chain zusammengeführt wurde und somit nun beide als eine Blockchain existieren.
summaryPoint4: Nach The Merge reduzierte sich Ethereums Energieverbrauch um ~99,95 %.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Die Zusammenführung wurde am 15. September 2022 durchgeführt. Dies vervollständigte Ethereums Übergang zu Proof-of-Stake, was Proof-of-Work offiziell abschaffte und den Energieverbrauch um ~99,95 % verringert hat.
</UpgradeStatus>

## Was war die Zusammenführung? {#what-is-the-merge}

Die Zusammenführung war das Verbinden der ursprünglichen Ausführungsschicht von Ethereum (das Mainnet das seit [Genesis](/history/#frontier) existierte) mit der neuen Proof-of-Stake Konsensschicht, der Beacon Chain. Damit entfällt das energieintensive Mining. Stattdessen wird das Netzwerk durch den Einsatz von Staked Ether gesichert. Ein wirklich spannender Schritt zur Verwirklichung der Ethereum-Vision: mehr Skalierbarkeit, Sicherheit und Nachhaltigkeit.

<MergeInfographic />

Ursprünglich wurde die [Beacon Chain](/roadmap/beacon-chain/) getrennt vom [Mainnet](/glossary/#mainnet) betrieben. Das Ethereum-Mainnet, mit allen Konten, Kontoständen, Smart Contracts, und des Blockchain-Zustandes, wurde weiterhin durch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) gesichert, auch wenn die Beacon Chain parallel dazu mit [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) betrieben wurde. Die Zusammenführung fand statt, als diese beiden Systeme schließlich vereint wurden und Proof-of-Work permanent durch Proof-of-Stake ersetzt wurde.

Stellen Sie sich Ethereum als ein Raumschiff vor, das gestartet wurde, bevor es für interstellare Reisen bereit war. Mit der Beacon Chain hat die Community einen neuen Motor und einen gehärteten Rumpf gebaut. Nach umfangreichen Tests war es an der Zeit, mitten im Flug den neuen Antrieb gegen den Alten auszutauschen. Dadurch wurde der neue effizientere Motor in das bestehende Raumschiff eingebaut, sodass noch einige Lichtjahre im Universum zurückgelegt werden können.

## Die Zusammenführung mit dem Mainnet {#merging-with-mainnet}

Proof-of-Work sicherte Ethereum Mainnet von Genesis bis zur Zusammenführung. Dies ermöglichte es der Ethereum Blockchain, an die wir alle gewöhnt sind, im Juli 2015 mit all ihren bekannten Merkmalen – Transaktionen, intelligente Verträge, Konten usw. – an den Start zu gehen.

Während der gesamten Geschichte von Ethereum bereiteten sich Entwickler auf einen eventuellen Übergang von Proof-of-Work zu Proof-of-Stake vor. Am 1. Dezember 2020 wurde die Beacon Chain erstellt, die als separate Blockchain parallel zum Mainnet betrieben wurde.

Die Beacon Chain hat ursprünglich keine Transaktionen von Mainnet verarbeitet. Stattdessen gelangte sie zu einem Konsens über ihren eigenen Zustand, indem sie sich auf aktive Validatoren und deren Kontostände einigte. Nach ausführlichen Tests war es für die Beacon Chain an der Zeit, Konsens über reale Daten zu erlangen. Nach der Zusammenführung wurde die Beacon Chain zur Konsens-Maschine für alle Netzwerkdaten, einschließlich der Transaktionen auf Ausführungsebene und der Kontostände.

Die Zusammenführung stellte den offiziellen Wechsel zur Verwendung der Beacon Chain als Motor der Blockproduktion dar. Mining dient nicht länger als Mittel der Herstellung gültiger Blocks. Die Proof-of-Stake Validatoren haben stattdessen diese Rolle übernommen und sind jetzt für die Gültigkeit aller Transaktionen und das Vorschlagen von Blöcken verantwortlich.

Keine Historie ging bei der Zusammenführung verloren. Als Mainnet mit der Beacon Chain zusammengeführt wurde, wurde auch die gesamte Transaktionshistorie von Ethereum zusammengeführt.

<InfoBanner>
Der Übergang zu Proof-of-Stake änderte die Art und Weise wie Ether benutzt wird. Erfahren Sie mehr über <a href="/roadmap/merge/issuance/">Etherausgabe vor und nach der Zusammenführung</a>.
</InfoBanner>

### Benutzer und Halter {#users-holders}

**Die Zusammenführung hat nichts für Halter/Benutzer geändert.**

_Dies muss wiederholt werden_: Als Nutzer oder Halter von ETH oder irgendeines anderen digitalen Assets auf Ethereum, sowie nicht-Nodebetreibender Staker, **müssen Sie nichts mit Ihrem Guthaben oder Ihrer Wallet tun, um sich auf die Zusammenführung vorzubereiten.** ETH ist nur ETH. Es gibt kein „altes ETH“/„neues ETH“ oder „ETH1“/„ETH2“ und Wallets funktionieren nach der Zusammenführung genauso wie zuvor. Menschen, die anderes behaupten, sind sehr wahrscheinlich Betrüger.

Trotz des Austauschs von Proof-of-Work blieb die gesamte Geschichte von Ethereum seit der Genesis intakt und durch den Übergang zu Proof-of-Stake unverändert. Jedes Guthaben in Ihrer Wallet vor dem Merge ist nach dem Merge weiterhin zugänglich. **Es ist keine Aktion zum Upgrade Ihrerseits erforderlich**

[Mehr zu Ethereums Sicherheit](/security/#eth2-token-scam)

### Node Operatoren und dApp Entwickler {#node-operators-dapp-developers}

<ExpandableCard
title="Staking Node Operatoren und Anbieter"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Zu den Schlüsselaktionen gehören:

1. Betreiben Sie _sowohl_ einen Konsens-Client und einen Ausführungs-Client; Endpunkte von Drittanbietern, um Ausführungsdaten zu erhalten, funktionieren seit dem Merge nicht mehr.
2. Authentifizieren Sie sowohl die Ausführungs- als auch die Konsens-Clients mit einem gemeinsam genutzten JWT-Geheimnis, damit sie sicher kommunizieren können.
3. Legen Sie eine "Gebühr Empfänger"-Adresse fest, um Ihre verdienten Transaktionsgebühr-Tipps/MEV zu erhalten.

Wenn Sie die ersten beiden obigen Elemente nicht abschließen, wird Ihre Node als "offline" betrachtet, bis beide Ebenen synchronisiert und authentifiziert sind.

Wenn kein "Gebührenempfänger" gesetzt wird, kann sich dein Validator wie üblich verhalten, aber Sie werden auf unverbrannte Gebührentipps verzichten und alle MEV, die Sie sonst in Blöcken verdient hätten, die Ihr Validator vorschlägt.
</ExpandableCard>

<ExpandableCard
title="Nicht-validierende Node-Operatoren und Infrastruktur-Anbieter"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Bis zum Merge reichte ein Client (wie Geth, Erigon, Besu oder Nethermind) aus, um ihn zu empfangen, validieren und Blöcke verbreiten, die vom Netzwerk vorgeschlagen werden. _Nach dem Merge_, ist die Gültigkeit von Transaktionen, die innerhalb einer ausführbaren Nutzlast enthalten sind, jetzt auch von der Gültigkeit des "Konsensblocks" abhängig, in dem er enthalten ist.

Infolgedessen erfordert eine vollständige Ethereum-Node nun sowohl einen Ausführungs-Client als auch einen Konsens-Client. Diese beiden Clients arbeiten zusammen mit einer neuen Engine API. Die Engine API erfordert Authentifizierung mittels eines JWT Geheimnisses, das beiden Clients zur Verfügung gestellt wird, die eine sichere Kommunikation ermöglichen.

Schlüssel-Aktionen beinhalten:

- Installieren Sie einen Konsens-Client zusätzlich zu einem Ausführungs-Client
- Authentifizieren Sie die Ausführung und Konsens-Clients mit einem gemeinsam genutzten JWT-Geheimnis, so dass sie sicher miteinander kommunizieren können.

Wenn Sie die ersten beiden obigen Elemente nicht abschließen, wird Ihre Node als "offline" betrachtet, bis beide Ebenen synchronisiert und authentifiziert sind.

</ExpandableCard>

<ExpandableCard
title="dApp und Smart Contract Entwickler"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

The Merge trat ein, indem es Änderungen an der Konsens-Methode mit sich brachte, darunter Änderungen an:<

<ul>
  <li>Block-Struktur</li>
  <li>berücksichtigte Maßeinheiten/Messeziele in nicht monetären Einheiten (slot/block timing)</li>
  <li>Opcode-Änderungen</li>
  <li>Quellen des On-Chain-Zufalls</li>
  <li>Begriffe wie <em>safe head</em> and <em>finalized blocks</em></li>
</ul>

Weitere Informationen findest Du in diesem Blogartikel von Tim Heiko zum <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Thema The Merge Update: Welche Auswirkungen hat das Ereignis auf die Ethereum-Execution Layer?</a>.

</ExpandableCard>

## Die Zusammenführung und der Energieverbrauch {#merge-and-energy}

The Merge markierte das Ende von Proof-of-Work für Ethereum und läutete die Ära eines nachhaltigeren und umweltfreundlicheren Ethereums ein. Ethereums Energieverbrauch reduzierte sich um geschätzte 99,95%, was Ethereum zu einer grünen Blockchain macht. Erfahren Sie mehr über [Ethereums Energieverbrauch](/energy-consumption/).

## Die Zusammenführung und Skalierbarkeit {#merge-and-scaling}

Die Zusammenführung ebnet auch den Weg für weitere Skalierungsupgrades, welche unter Proof-of-Work nicht möglich waren. Dies bringt Ethereum einen Schritt näher die volle Skalierung, Sicherheit und Nachhaltigkeit zu erreichen, die in der [Ethereum Vision](/roadmap/vision/) beschrieben ist.

## Misverständnisse über die Zusammenführung {#misconceptions}

<ExpandableCard
title="Misverständnis: &quot; Das Betreiben einer Node benötigt 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Es gibt zwei Arten von Ethereum Nodes: Nodes die Blöcke vorschlagen können und Nodes die das nicht können.

Nur ein kleiner Anteil der Nodes auf Ethereum können Blöcke vorschlagen. Diese Kategorie beinhaltet Mining Nodes bei Proof-of-Work (PoW) and Validator Nodes bei Proof-of-Stake (PoS). Sie erfordert wirtschaftliche Ressourcen (wie z. B. GPU Hash-Power bei Proof-of-Work oder eingesetztes ETH bei Proof-of-Stake) im Tausch für die Möglichkeit gelegentlich den nächsten Block vorzuschlagen und dafür Belohnungen zu erhalten.

Die anderen Nodes des Netzwerkes (dies betrifft die Mehrheit der Nutzer) sind nicht dazu verpflichtet wirtschaftliche Ressourcen, die über einen Hobbycomputer mit 1-2 TB Speicherplatz und eine Internetverbindung hinausgehen, einzusetzen. Diese Nodes schlagen keine Blöcke vor, aber sie spielen immer noch eine entscheidende Rolle bei der Sicherung des Netzwerks, indem sie alle Blockvorschläger zur Rechenschaft ziehen, indem sie auf neue Blöcke hören und ihre Gültigkeit bei der Ankunft gemäß den Regeln des Netzwerkkonsenses überprüfen. Wenn der Block gültig ist, wird die Node ihn weiter über das Netzwerk verbreiten. Wenn der Block aus welchen Gründen auch immer ungültig ist, wird die Nodesoftware ihn als ungültig betrachten und seine Weitergabe stoppen.

Jeder kann einen Knoten betreiben, der allerdings nicht erlaubt, andere Blöcke zu betreiben, egal welche Konsensmethode verwendet wird (PoW: Proof of Work oder PoS: Proof of Stake); es wird <em>allen Nutzern dringend </em>empfohlen, gegebenenfalls Knoten zu betreiben. Der Betrieb einer Node ist für Ethereum immens wertvoll und bietet jedem Einzelnen zusätzlichen Vorteil, der einen betreibt, wie etwa der Verbesserung der Sicherheit, der Privatsphäre und der Widerstandsfähigkeit der Zensur.

Die Möglichkeit für jeden, einen eigenen Node zu betreiben, ist <em>absolut essentiell</em> zur Aufrechterhaltung der Dezentralisierung des Ethereum-Netzwerks.

<a href="/run-a-node/">Mehr zum Betrieb eines eigenen Nodes</a>

</ExpandableCard>

<ExpandableCard
title="Misverständnis: &quot;Der Merge schlug fehl Gasgebühren zu senken.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Die Gasgebühren sind ein Produkt der Netznachfrage im Verhältnis zur Netzkapazität. Der Merge veraltete den Einsatz von Proof-of-Work für den Übergang zu Proof-of-Stake als Konsens, aber keine signifikante Änderung von Parametern, die direkt Einfluss auf Netzwerk-Kapazität oder Durchsatz haben.

Mit einer <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">Rollup-zentrierten Roadmap</a>, die Bemühungen konzentrieren sich auf die Ausweitung der Nutzeraktivitäten auf <a href="/layer-2/">Ebene 2</a>, und gleichzeitig das Ebene 1 Mainnet als sichere dezentrale Abwicklungsschicht zu etablieren, die für die Speicherung von Rollup-Daten optimiert ist und dazu beiträgt, Rollup-Transaktionen exponentiell billiger zu machen. Der Übergang zu Proof-of-Stake ist ein entscheidender Vorläufer für die Umsetzung. <a href="/developers/docs/gas/">Mehr zum Thema Gas-Kosten.</a>

</ExpandableCard>

<ExpandableCard
title="Misverständnis: &quot;Transaktionen wurden durch den Merge dramatisch beschleunigt.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
Die "Geschwindigkeit" einer Transaktion kann auf einige Arten gemessen werden, einschließlich der Zeit, die in einem Block und Zeit zur Fertigstellung enthalten sein soll. Beides ändert sich ein wenig, aber nicht in einer Weise, die die Nutzer bemerken werden.

Historisch war es nach Proof-of-Work das Ziel, alle ~13.3 Sekunden einen neuen Block zu haben. Unter Proof-of-Stake stellen wir fest, dass Slots genau alle 12 Sekunden auftreten, wobei jeder von ihnen eine Möglichkeit für einen Validator ist, einen Block zu veröffentlichen. Die meisten Slots haben Blöcke, aber nicht unbedingt alle (d.h. ein Validator ist offline). Bei Proof-of-Stake werden Blöcke ~10% häufiger produziert als bei Proof-of-Work. Das war eine ziemlich unbedeutende Änderung und Benutzer werden es wahrscheinlich nicht bemerken.

Proof-of-Stake führte das bisher nicht existierende Konzept der Transaktionsfinalität ein. Bei Proof-of-Work wird die Rückgängigmachung eines Blocks exponentiell schwieriger, wenn neue Blöcke auf vorherigen aufgebaut werden, aber es erreicht nie ganz Null. Unter Proof-of-Stake werden Blöcke in Epochen (6,4 Minuten Zeitspanne mit 32 Chancen für Blöcke) gebündelt, über die Validatoren abstimmen. Wenn eine Epoche endet, stimmen die Validatoren darüber ab, ob sie die Epoche als "gerechtfertigt" betrachten sollen. Wenn die Validatoren einverstanden sind, die Epoche zu rechtfertigen, wird sie in der nächsten Epoche fertiggestellt. Abgeschlossene Transaktionen rückgängig zu machen ist wirtschaftlich unrentabel, da sie mehr als ein Drittel der insgesamt eingesetzten ETH einsetzen und verbrennen müssten.

</ExpandableCard>

<ExpandableCard
title="Misverständnis: &quot;Der Merge aktivierte Staking-Auszahlungen.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Nach dem Zusammenführen hatten die Staker zunächst nur Zugriff auf Gebührentipps und MEV, die durch Blockvorschläge verdient wurden. Diese Belohnungen werden auf einem von Validatoren kontrollierten Konto gutgeschrieben, das nicht zum Einsatz kommt (bekannt als die <em>Gebührenempfänger</em>), und sind sofort verfügbar. Diese Belohnungen sind von den Protokollbelohnungen für die Erfüllung der Pflichten von Validatoren getrennt.

Seit des Netzwerk-Upgrades namens Shanghai/Capella können die Staker nun einen <em>Abhebungsadresse</em> um automatische Auszahlungen von überschüssigem für Staking eingesetzten ETH zu erhalten (ETH über 32 aus Protokollbelohnungen). Mit diesem Upgrade wurde auch die Möglichkeit geschaffen, dass ein Validator sein gesamtes Guthaben beim Verlassen des Netzwerkes entsperren und zurückfordern kann.

<a href="/staking/withdrawals/">Mehr zu Staking-Auszahlungen</a>

</ExpandableCard>

<ExpandableCard
title="Irrtum: &quot;Jetzt, da der Zusammenschluss abgeschlossen ist und die Abhebungen möglich sind, können alle Staker auf einmal aussteigen.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Seit das Shanghai/Capella-Upgrade Abhebungen ermöglicht, haben die Validatoren einen Anreiz, ihre Einsätze über 32 ETH abzuheben, da diese Gelder nicht zur Rendite beitragen und ansonsten gesperrt sind. Abhängig von der APR (bestimmt durch Gesamt-ETH abgesetzt), können sie dazu angehalten werden, ihre Validator(en) zu verlassen, um ihr gesamtes Guthaben zurückzugewinnen oder möglicherweise noch mehr mit ihren Prämien zu investieren, um mehr Ertrag zu erzielen.

Eine wichtige Einschränkung ist, dass das Protokoll die Anzahl der Beendigungen von Prüfvorgängen begrenzt und nur eine bestimmte Anzahl von Prüfvorgängen pro Epoche (alle 6,4 Minuten) zulässig ist. Dieses Limit schwankt in Abhängigkeit von der Anzahl der aktiven Validatoren, liegt aber bei etwa 0,33% der insgesamt eingesetzten ETH, die an einem Tag aus dem Netzwerk entfernt werden können.

Dadurch wird ein Massenexodus der für Staking eingesetzten Mittel verhindert. Darüber hinaus wird verhindert, dass ein potenzieller Angreifer, der Zugang zu einem großen Teil der gesamten ETH-Einsätze hat, ein "Slashing"-Vergehen begeht und alle verletzenden Validator-Guthaben in derselben Epoche abzieht, bevor das Protokoll die "Slashing"-Strafe durchsetzen kann.

Der effektive Jahreszins ist auch bewusst dynamisch, damit ein Markt von Stakern abwägen kann, wie viel sie bereit sind, für die Sicherung des Netzwerks zu zahlen. Wenn die Rate zu niedrig ist, werden die Validatoren mit einer durch das Protokoll begrenzten Rate aussteigen. Nach und nach wird dadurch die APR für alle erhöht, die bleiben und wieder neue oder wiederkehrende Staker anziehen.
</ExpandableCard>

## Was ist mit „Eth2“ passiert? {#eth2}

Der Begriff "Eth2" ist veraltet. Nach der Zusammenführung von "Eth1" und "Eth2" in eine einzelne Chain gibt es keinen Grund mehr zwischen zwei Ethereum Netzwerken zu unterscheiden. Es gibt nur Ethereum.

Um Unklarheiten zu minimieren, hat die Community diese Begriffe aktualisiert:

- „Eth1“ ist nun die „Ausführungsebene“, die Transaktionen und Ausführungen verarbeitet.
- „Eth2“ ist nun die „Konsensebene“, die den Proof-of-Stake-Konsens regelt.

Diese aktualisierte Terminologie ändert lediglich die Benennungskonventionen. Die Ziele und der Fahrplan von Ethereum ändern sich dadurch nicht.

[Mehr über die „Eth2“-Umbenennung erfahren](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades sind alle in gewisser Weise miteinander verbunden. Sehen wir uns nun an, welche Verbindung zwischen der Zusammenführung und anderen Upgrades besteht.

### Die Zusammenführung und die Beacon Chain {#merge-and-beacon-chain}

Die Zusammenführung stellt die formale Übernahme der Beacon Chain als neue Konsensschicht auf die ursprüngliche Mainnet-Ausführungsschicht dar. Seit dem Zusammenführen sind Validatoren der Sicherung vom Ethereum Mainnet zugewiesen, und das Minen auf [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) ist nicht mehr ein gültiges Mittel zur Blockproduktion.

Blöcke werden stattdessen durch validierende Nodes vorgeschlagen, die ETH als Gegenleistung für das Recht auf Teilnahme am Konsens eingesetzt haben. Diese Upgrades setzten die Voraussetzungen für zukünftige Skalierbarkeitsverbesserungen, einschließlich Sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  Die Beacon Chain
</ButtonLink>

### Die Zusammenführung und das Shanghai Upgrade {#merge-and-shanghai}

Um den erfolgreichen Übergang zum Proof-of-Stake zu vereinfachen und zu maximieren, enthielt das Merge-Upgrade nicht bestimmte erwartete Funktionen, wie die Möglichkeit, eingesetztes ETH zurückzuziehen. Diese Funktion wurde mit dem Shanghai/Capella-Upgrade separat aktiviert.

Für Neugierige: Erfahren Sie mehr darüber, [ was nach der Zusammenführung passiert](https://youtu.be/7ggwLccuN5s?t=101), präsentiert von Vitalik an der ETHGlobal-Veranstaltung im April 2021.

### Die Zusammenführung und Sharding {#merge-and-data-sharding}

Ursprünglich war geplant, vor der Zusammenführung an Sharding zu arbeiten, um die Skalierbarkeit zu verbessern. Mit dem Boom der [Layer-2-Skalierungslösungen](/layer-2/), hat sich die Priorität jedoch auf die Umwandlung von Proof-of-Work zu Proof-of-Stake, durch die Zusammenführung, verschoben.

Pläne für die gemeinsame Nutzung entwickeln sich rasch, aber angesichts des Anstiegs und des Erfolgs von Lay-2-Technologien, um Transaktionsausführung zu skalieren, haben sich gemeinsame Pläne auf die Suche nach dem optimalen Weg zur Verteilung der Belastung durch die Speicherung komprimierter Rufdaten aus Rollup-Verträgen verlagert. Dies ermöglicht ein exponentielles Wachstum der Netzwerkkapazität. Dies wäre ohne den ersten Übergang zu Proof-of-Stake nicht möglich.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Weiterführende Informationen {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
