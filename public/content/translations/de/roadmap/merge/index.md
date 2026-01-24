---
title: Der Zusammenschluss
description: "Erfahren Sie mehr über die Zusammenführung, als Mainnet Ethereum Proof-of-Stake einführte."
lang: de
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Im Ethereum Mainnet wird Proof-of-Stake verwendet, aber dies war nicht immer der Fall.
summaryPoint2: "Der Wechsel vom ursprünglichen Proof-of-Work-Mechanismus zu Proof-of-Stake wurde The Merge genannt."
summaryPoint3: "The Merge bezieht sich darauf, dass das ursprüngliche Ethereum Mainnet mit einer separaten Proof-of-Stake-Blockchain namens Beacon Chain zusammengeführt wurde und somit nun beide als eine Blockchain existieren."
summaryPoint4: Nach The Merge reduzierte sich Ethereums Energieverbrauch um ~99,95 %.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Die Zusammenführung wurde am 15. September 2022 durchgeführt. Dies vervollständigte Ethereums Übergang zu Proof-of-Stake, was Proof-of-Work offiziell abschaffte und den Energieverbrauch um ~99,95 % verringert hat.
</UpgradeStatus>

## Was war die Zusammenführung? {#what-is-the-merge}

Die Zusammenführung war die Verbindung der ursprünglichen Ausführungsebene von Ethereum (das Mainnet, das seit der [Genesis](/ethereum-forks/#frontier) existiert) mit seiner neuen Proof-of-Stake-Konsensebene, der Beacon Chain. Damit entfällt das energieintensive Mining. Stattdessen wird das Netzwerk durch den Einsatz von Staked Ether gesichert. Ein wirklich spannender Schritt zur Verwirklichung der Ethereum-Vision: mehr Skalierbarkeit, Sicherheit und Nachhaltigkeit.

<MergeInfographic />

Anfänglich wurde die [Beacon Chain](/roadmap/beacon-chain/) separat vom [Mainnet](/glossary/#mainnet) ausgeliefert. Das Ethereum-Mainnet – mit all seinen Konten, Guthaben, Smart Contracts und dem Blockchain-Zustand – wurde weiterhin durch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) gesichert, auch während die Beacon Chain parallel mit [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) lief. Die Zusammenführung fand statt, als diese beiden Systeme schließlich vereint wurden und Proof-of-Work permanent durch Proof-of-Stake ersetzt wurde.

Stellen Sie sich Ethereum als ein Raumschiff vor, das gestartet wurde, bevor es für interstellare Reisen bereit war. Mit der Beacon Chain hat die Community einen neuen Motor und einen gehärteten Rumpf gebaut. Nach umfangreichen Tests war es an der Zeit, mitten im Flug den neuen Antrieb gegen den Alten auszutauschen. Dadurch wurde der neue effizientere Motor in das bestehende Raumschiff eingebaut, sodass noch einige Lichtjahre im Universum zurückgelegt werden können.

## Zusammenführung mit dem Mainnet {#merging-with-mainnet}

Proof-of-Work sicherte Ethereum Mainnet von Genesis bis zur Zusammenführung. Dies ermöglichte es der Ethereum-Blockchain, die wir alle kennen, im Juli 2015 mit all ihren bekannten Funktionen – Transaktionen, Smart Contracts, Konten usw. – zu entstehen.

Während der gesamten Geschichte von Ethereum bereiteten sich Entwickler auf einen eventuellen Übergang von Proof-of-Work zu Proof-of-Stake vor. Am 1. Dezember 2020 wurde die Beacon Chain erstellt, die als separate Blockchain parallel zum Mainnet betrieben wurde.

Die Beacon Chain hat ursprünglich keine Transaktionen von Mainnet verarbeitet. Stattdessen gelangte sie zu einem Konsens über ihren eigenen Zustand, indem sie sich auf aktive Validatoren und deren Kontostände einigte. Nach ausführlichen Tests war es für die Beacon Chain an der Zeit, Konsens über reale Daten zu erlangen. Nach der Zusammenführung wurde die Beacon Chain zur Konsens-Maschine für alle Netzwerkdaten, einschließlich der Transaktionen auf Ausführungsebene und der Kontostände.

Die Zusammenführung stellte den offiziellen Wechsel zur Verwendung der Beacon Chain als Motor der Blockproduktion dar. Mining dient nicht länger als Mittel der Herstellung gültiger Blocks. Die Proof-of-Stake Validatoren haben stattdessen diese Rolle übernommen und sind jetzt für die Gültigkeit aller Transaktionen und das Vorschlagen von Blöcken verantwortlich.

Keine Historie ging bei der Zusammenführung verloren. Als Mainnet mit der Beacon Chain zusammengeführt wurde, wurde auch die gesamte Transaktionshistorie von Ethereum zusammengeführt.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Dieser Übergang zu Proof-of-Stake hat die Art und Weise, wie Ether emittiert wird, verändert. Erfahren Sie mehr über die [Ether-Emission vor und nach Der Zusammenführung](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Nutzer und Inhaber {#users-holders}

**Die Zusammenführung hat nichts für Halter/Benutzer geändert.**

_Dies sei wiederholt_: Als Nutzer oder Inhaber von ETH oder anderen digitalen Vermögenswerten auf Ethereum sowie als Staker, die keinen Node betreiben, **müssen Sie nichts mit Ihren Geldern oder Ihrer Wallet tun, um Die Zusammenführung zu berücksichtigen.** ETH ist einfach ETH. Es gibt kein „altes ETH“/„neues ETH“ oder „ETH1“/„ETH2“ und Wallets funktionieren nach der Zusammenführung genauso wie zuvor. Menschen, die anderes behaupten, sind sehr wahrscheinlich Betrüger.

Trotz des Austauschs von Proof-of-Work blieb die gesamte Geschichte von Ethereum seit der Genesis intakt und durch den Übergang zu Proof-of-Stake unverändert. Jedes Guthaben in Ihrer Wallet vor dem Merge ist nach dem Merge weiterhin zugänglich. **Ihrerseits ist keine Aktion für das Upgrade erforderlich.**

[Mehr zur Sicherheit von Ethereum](/security/#eth2-token-scam)

### Node-Betreiber und Dapp-Entwickler {#node-operators-dapp-developers}

<ExpandableCard
title="Staking-Node-Betreiber und -Anbieter"
contentPreview="Wenn du als Staker eine eigene Node betreibst oder ein Node-Infrastrukturanbieter bist, musst du nach The Merge einige Dinge beachten."
id="staking-node-operators">

Zu den Schlüsselaktionen gehören:

1. Betreiben Sie _sowohl_ einen Konsens-Client und einen Ausführungs-Client; Endpunkte von Drittanbietern, um Ausführungsdaten zu erhalten, funktionieren seit dem Merge nicht mehr.
2. Authentifizieren Sie sowohl die Ausführungs- als auch die Konsens-Clients mit einem gemeinsam genutzten JWT-Geheimnis, damit sie sicher kommunizieren können.
3. Legen Sie eine "Gebühr Empfänger"-Adresse fest, um Ihre verdienten Transaktionsgebühr-Tipps/MEV zu erhalten.

Wenn Sie die ersten beiden obigen Elemente nicht abschließen, wird Ihre Node als "offline" betrachtet, bis beide Ebenen synchronisiert und authentifiziert sind.

Wenn kein "Gebührenempfänger" gesetzt wird, kann sich dein Validator wie üblich verhalten, aber Sie werden auf unverbrannte Gebührentipps verzichten und alle MEV, die Sie sonst in Blöcken verdient hätten, die Ihr Validator vorschlägt.
</ExpandableCard>

<ExpandableCard
title="Nicht-validierende Node-Betreiber und Infrastrukturanbieter"
contentPreview="Wenn du eine nicht-validierende Ethereum-Node betreibst, war die wichtigste Änderung mit The Merge die Notwendigkeit, Clients für SOWOHL die Ausführungsebene ALS AUCH die Konsensebene zu betreiben."
id="node-operators">

Bis zum Merge reichte ein Client (wie Geth, Erigon, Besu oder Nethermind) aus, um ihn zu empfangen, validieren und Blöcke verbreiten, die vom Netzwerk vorgeschlagen werden. _Nach dem Merge_, ist die Gültigkeit von Transaktionen, die innerhalb einer ausführbaren Nutzlast enthalten sind, jetzt auch von der Gültigkeit des "Konsensblocks" abhängig, in dem er enthalten ist.

Infolgedessen erfordert eine vollständige Ethereum-Node nun sowohl einen Ausführungs-Client als auch einen Konsens-Client. Diese beiden Clients arbeiten zusammen mit einer neuen Engine API. Die Engine API erfordert Authentifizierung mittels eines JWT Geheimnisses, das beiden Clients zur Verfügung gestellt wird, die eine sichere Kommunikation ermöglichen.

Zu den Schlüsselaktionen gehören:

- Installieren Sie einen Konsens-Client zusätzlich zu einem Ausführungs-Client
- Authentifizieren Sie Ausführungs- und Konsens-Clients mit einem gemeinsamen JWT-Secret, damit sie sicher miteinander kommunizieren können.

Wenn Sie die ersten beiden obigen Elemente nicht abschließen, wird Ihre Node als "offline" betrachtet, bis beide Ebenen synchronisiert und authentifiziert sind.
</ExpandableCard>

<ExpandableCard
title="Dapp- und Smart-Contract-Entwickler"
contentPreview="The Merge sollte möglichst geringe Auswirkungen auf Smart-Contract- und Dapp-Entwickler haben."
id="developers">

The Merge trat ein, indem es Änderungen an der Konsens-Methode mit sich brachte, darunter Änderungen an:

<ul>
  <li>Block-Struktur</li>
  <li>berücksichtigte Maßeinheiten/Messeziele in nicht monetären Einheiten (slot/block timing)</li>
  <li>Opcode-Änderungen</li>
  <li>Quellen für On-Chain-Zufallszahlen</li>
  <li>Begriffe wie <em>safe head</em> and <em>finalized blocks</em></li>
</ul>

Weitere Informationen findest Du in diesem Blogartikel von Tim Heiko zum <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Thema The Merge Update: Welche Auswirkungen hat das Ereignis auf die Ethereum-Execution Layer?</a>.
</ExpandableCard>

## Die Zusammenführung und der Energieverbrauch {#merge-and-energy}

The Merge markierte das Ende von Proof-of-Work für Ethereum und läutete die Ära eines nachhaltigeren und umweltfreundlicheren Ethereums ein. Ethereums Energieverbrauch reduzierte sich um geschätzte 99,95%, was Ethereum zu einer grünen Blockchain macht. Erfahren Sie mehr über den [Energieverbrauch von Ethereum](/energy-consumption/).

## Die Zusammenführung und die Skalierung {#merge-and-scaling}

Die Zusammenführung schuf auch die Voraussetzungen für weitere Skalierbarkeits-Upgrades, die unter Proof-of-Work nicht möglich waren, und brachte Ethereum dem Ziel, die volle Skalierbarkeit, Sicherheit und Nachhaltigkeit zu erreichen, auf das die [Roadmap](/roadmap/) hinarbeitet, einen Schritt näher.

## Missverständnisse über Die Zusammenführung {#misconceptions}

<ExpandableCard
title="Missverständnis: &quot;Der Betrieb eines Nodes erfordert das Staking von 32 ETH.&quot;"
contentPreview="Falsch. Jeder kann seine eigene, selbst verifizierte Kopie von Ethereum synchronisieren (d. h. einen Node betreiben). Es ist kein ETH erforderlich – nicht vor Der Zusammenführung, nicht nach Der Zusammenführung, niemals.">

Es gibt zwei Arten von Ethereum Nodes: Nodes die Blöcke vorschlagen können und Nodes die das nicht können.

Nur ein kleiner Anteil der Nodes auf Ethereum können Blöcke vorschlagen. Diese Kategorie beinhaltet Mining Nodes bei Proof-of-Work (PoW) and Validator Nodes bei Proof-of-Stake (PoS). Sie erfordert wirtschaftliche Ressourcen (wie z. B. GPU Hash-Power bei Proof-of-Work oder eingesetztes ETH bei Proof-of-Stake) im Tausch für die Möglichkeit gelegentlich den nächsten Block vorzuschlagen und dafür Belohnungen zu erhalten.

Die anderen Nodes im Netzwerk (d. h. die Mehrheit) müssen keine wirtschaftlichen Ressourcen über einen handelsüblichen Computer mit 1-2 TB verfügbarem Speicher und einer Internetverbindung hinaus bereitstellen. Diese Nodes schlagen keine Blöcke vor, aber sie spielen immer noch eine entscheidende Rolle bei der Sicherung des Netzwerks, indem sie alle Blockvorschläger zur Rechenschaft ziehen, indem sie auf neue Blöcke hören und ihre Gültigkeit bei der Ankunft gemäß den Regeln des Netzwerkkonsenses überprüfen. Wenn der Block gültig ist, wird die Node ihn weiter über das Netzwerk verbreiten. Wenn der Block aus welchen Gründen auch immer ungültig ist, wird die Nodesoftware ihn als ungültig betrachten und seine Weitergabe stoppen.

Jeder kann einen Knoten betreiben, der allerdings nicht erlaubt, andere Blöcke zu betreiben, egal welche Konsensmethode verwendet wird (PoW: Proof of Work oder PoS: Proof of Stake); es wird <em>allen Nutzern dringend </em>empfohlen, gegebenenfalls Knoten zu betreiben. Der Betrieb einer Node ist für Ethereum immens wertvoll und bietet jedem Einzelnen zusätzlichen Vorteil, der einen betreibt, wie etwa der Verbesserung der Sicherheit, der Privatsphäre und der Widerstandsfähigkeit der Zensur.

Die Möglichkeit für jeden, einen eigenen Node zu betreiben, ist <em>absolut essentiell</em> zur Aufrechterhaltung der Dezentralisierung des Ethereum-Netzwerks.

[Mehr zum Betreiben Ihrer eigenen Node](/run-a-node/)
</ExpandableCard>

<ExpandableCard
title="Missverständnis: &quot;Die Zusammenführung hat die Gas-Gebühren nicht gesenkt.&quot;"
contentPreview="Falsch. Die Zusammenführung war eine Änderung des Konsensmechanismus, keine Erweiterung der Netzwerkkapazität, und sollte nie die Gas-Gebühren senken.">

Die Gasgebühren sind ein Produkt der Netznachfrage im Verhältnis zur Netzkapazität. Der Merge veraltete den Einsatz von Proof-of-Work für den Übergang zu Proof-of-Stake als Konsens, aber keine signifikante Änderung von Parametern, die direkt Einfluss auf Netzwerk-Kapazität oder Durchsatz haben.

Mit einer <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">Rollup-zentrierten Roadmap</a> konzentrieren sich die Bemühungen auf die Skalierung der Benutzeraktivität auf [Ebene 2](/layer-2/), während das Mainnet der Ebene 1 als sichere dezentrale Abwicklungsebene aktiviert wird, die für die Speicherung von Rollup-Daten optimiert ist, um Rollup-Transaktionen exponentiell günstiger zu machen. Der Übergang zu Proof-of-Stake ist ein entscheidender Vorläufer für die Umsetzung. [Mehr zu Gas und Gebühren.](/developers/docs/gas/)
</ExpandableCard>

<ExpandableCard
title="Missverständnis: &quot;Transaktionen wurden durch Die Zusammenführung erheblich beschleunigt.&quot;"
contentPreview="Falsch. Obwohl es einige geringfügige Änderungen gibt, ist die Transaktionsgeschwindigkeit auf Layer 1 jetzt größtenteils die gleiche wie vor Der Zusammenführung.">
Die "Geschwindigkeit" einer Transaktion kann auf verschiedene Weisen gemessen werden, einschließlich der Zeit bis zur Aufnahme in einen Block und der Zeit bis zur Finalisierung. Beides ändert sich ein wenig, aber nicht in einer Weise, die die Nutzer bemerken werden.

Historisch war es nach Proof-of-Work das Ziel, alle ~13.3 Sekunden einen neuen Block zu haben. Unter Proof-of-Stake stellen wir fest, dass Slots genau alle 12 Sekunden auftreten, wobei jeder von ihnen eine Möglichkeit für einen Validator ist, einen Block zu veröffentlichen. Die meisten Slots enthalten Blöcke, aber nicht unbedingt alle (d. h. ein Validator ist offline). Bei Proof-of-Stake werden Blöcke ~10% häufiger produziert als bei Proof-of-Work. Das war eine ziemlich unbedeutende Änderung und Benutzer werden es wahrscheinlich nicht bemerken.

Proof-of-Stake führte das bisher nicht existierende Konzept der Transaktionsfinalität ein. Bei Proof-of-Work wird die Rückgängigmachung eines Blocks exponentiell schwieriger, wenn neue Blöcke auf vorherigen aufgebaut werden, aber es erreicht nie ganz Null. Unter Proof-of-Stake werden Blöcke in Epochen (6,4 Minuten Zeitspanne mit 32 Chancen für Blöcke) gebündelt, über die Validatoren abstimmen. Wenn eine Epoche endet, stimmen die Validatoren darüber ab, ob sie die Epoche als "gerechtfertigt" betrachten sollen. Wenn die Validatoren einverstanden sind, die Epoche zu rechtfertigen, wird sie in der nächsten Epoche fertiggestellt. Abgeschlossene Transaktionen rückgängig zu machen ist wirtschaftlich unrentabel, da sie mehr als ein Drittel der insgesamt eingesetzten ETH einsetzen und verbrennen müssten.
</ExpandableCard>

<ExpandableCard
title="Missverständnis: &quot;Die Zusammenführung hat Staking-Auszahlungen ermöglicht.&quot;"
contentPreview="Falsch, aber Staking-Auszahlungen wurden seitdem durch das Shanghai/Capella-Upgrade ermöglicht.">

Nach dem Zusammenführen hatten die Staker zunächst nur Zugriff auf Gebührentipps und MEV, die durch Blockvorschläge verdient wurden. Diese Belohnungen werden auf einem von Validatoren kontrollierten Konto gutgeschrieben, das nicht zum Einsatz kommt (bekannt als die <em>Gebührenempfänger</em>), und sind sofort verfügbar. Diese Belohnungen sind von den Protokollbelohnungen für die Erfüllung der Pflichten von Validatoren getrennt.

Seit des Netzwerk-Upgrades namens Shanghai/Capella können die Staker nun einen <em>Abhebungsadresse</em> um automatische Auszahlungen von überschüssigem für Staking eingesetzten ETH zu erhalten (ETH über 32 aus Protokollbelohnungen). Mit diesem Upgrade wurde auch die Möglichkeit geschaffen, dass ein Validator sein gesamtes Guthaben beim Verlassen des Netzwerkes entsperren und zurückfordern kann.

[Mehr zu Staking-Auszahlungen](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard
title="Missverständnis: &quot;Jetzt, da Die Zusammenführung abgeschlossen ist und Auszahlungen aktiviert sind, könnten alle Staker auf einmal aussteigen.&quot;"
contentPreview="Falsch. Ausstiege von Validatoren sind aus Sicherheitsgründen ratenbegrenzt.">
Seit das Shanghai/Capella-Upgrade Auszahlungen ermöglicht hat, haben Validatoren einen Anreiz, ihr Staking-Guthaben über 32 ETH abzuheben, da diese Gelder nicht zur Rendite beitragen und ansonsten gesperrt sind. Abhängig von der APR (bestimmt durch Gesamt-ETH abgesetzt), können sie dazu angehalten werden, ihre Validator(en) zu verlassen, um ihr gesamtes Guthaben zurückzugewinnen oder möglicherweise noch mehr mit ihren Prämien zu investieren, um mehr Ertrag zu erzielen.

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

[Erfahren Sie mehr über die 'Eth2'-Umbenennung](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Beziehung zwischen Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades sind alle in gewisser Weise miteinander verbunden. Sehen wir uns nun an, welche Verbindung zwischen der Zusammenführung und anderen Upgrades besteht.

### Die Zusammenführung und die Beacon Chain {#merge-and-beacon-chain}

Die Zusammenführung stellt die formale Übernahme der Beacon Chain als neue Konsensschicht auf die ursprüngliche Mainnet-Ausführungsschicht dar. Seit Der Zusammenführung sind Validatoren mit der Sicherung des Ethereum Mainnets beauftragt, und das Mining mit [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) ist kein gültiges Mittel zur Blockproduktion mehr.

Blöcke werden stattdessen durch validierende Nodes vorgeschlagen, die ETH als Gegenleistung für das Recht auf Teilnahme am Konsens eingesetzt haben. Diese Upgrades setzten die Voraussetzungen für zukünftige Skalierbarkeitsverbesserungen, einschließlich Sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  The Beacon Chain
</ButtonLink>

### Die Zusammenführung und das Shanghai-Upgrade {#merge-and-shanghai}

Um den erfolgreichen Übergang zum Proof-of-Stake zu vereinfachen und zu maximieren, enthielt das Merge-Upgrade nicht bestimmte erwartete Funktionen, wie die Möglichkeit, eingesetztes ETH zurückzuziehen. Diese Funktion wurde mit dem Shanghai/Capella-Upgrade separat aktiviert.

Wer neugierig ist, kann mehr über [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101) erfahren, präsentiert von Vitalik auf dem ETHGlobal-Event im April 2021.

### Die Zusammenführung und Sharding {#merge-and-data-sharding}

Ursprünglich war geplant, vor der Zusammenführung an Sharding zu arbeiten, um die Skalierbarkeit zu verbessern. Mit dem Boom der [Layer-2-Skalierungslösungen](/layer-2/) verlagerte sich die Priorität jedoch darauf, zuerst von Proof-of-Work auf Proof-of-Stake zu wechseln.

Pläne für die gemeinsame Nutzung entwickeln sich rasch, aber angesichts des Anstiegs und des Erfolgs von Lay-2-Technologien, um Transaktionsausführung zu skalieren, haben sich gemeinsame Pläne auf die Suche nach dem optimalen Weg zur Verteilung der Belastung durch die Speicherung komprimierter Rufdaten aus Rollup-Verträgen verlagert. Dies ermöglicht ein exponentielles Wachstum der Netzwerkkapazität. Dies wäre ohne den ersten Übergang zu Proof-of-Stake nicht möglich.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Weiterführende Lektüre {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
