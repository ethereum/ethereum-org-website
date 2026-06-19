---
title: Der Merge
description: Erfahren Sie mehr über den Merge – als das Ethereum Mainnet Proof-of-Stake einführte.
lang: de
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "Das Ethereum Mainnet verwendet Proof-of-Stake, aber das war nicht immer so."
  - "Das Upgrade vom ursprünglichen Proof-of-Work-Mechanismus auf Proof-of-Stake wurde der Merge genannt."
  - "Der Merge bezieht sich auf das ursprüngliche Ethereum Mainnet, das mit einer separaten Proof-of-Stake-Blockchain namens Beacon Chain zusammengeführt wurde und nun als eine einzige Chain existiert."
  - "Der Merge reduzierte den Energieverbrauch von Ethereum um ~99,95 %."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Der Merge wurde am 15. September 2022 durchgeführt. Dies schloss den Übergang von Ethereum zum Proof-of-Stake-Konsens ab, wodurch Proof-of-Work offiziell eingestellt und der Energieverbrauch um ~99,95 % gesenkt wurde.
</UpgradeStatus>

## Was war der Merge? {#what-is-the-merge}

Der Merge war die Zusammenführung der ursprünglichen Ausführungsschicht von Ethereum (das Mainnet, das seit der [Genesis](/ethereum-forks/#frontier) existiert) mit seiner neuen Proof-of-Stake-Konsensschicht, der Beacon Chain. Er beseitigte die Notwendigkeit für energieintensives Mining und ermöglichte es stattdessen, das Netzwerk mit gestakten ETH zu sichern. Es war ein wirklich aufregender Schritt bei der Verwirklichung der Vision von [Ethereum](/) – mehr Skalierbarkeit, Sicherheit und Nachhaltigkeit.

<MergeInfographic />

Anfänglich wurde die [Beacon Chain](/roadmap/beacon-chain/) getrennt vom [Mainnet](/glossary/#mainnet) eingeführt. Das Ethereum Mainnet – mit all seinen Konten, Guthaben, Smart Contracts und dem Blockchain-Zustand – wurde weiterhin durch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) gesichert, selbst während die Beacon Chain parallel mit [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) lief. Der Merge war der Zeitpunkt, an dem diese beiden Systeme endlich zusammenkamen und Proof-of-Work dauerhaft durch Proof-of-Stake ersetzt wurde.

Stellen Sie sich Ethereum als ein Raumschiff vor, das gestartet ist, bevor es ganz bereit für eine interstellare Reise war. Mit der Beacon Chain baute die Community einen neuen Antrieb und eine gehärtete Hülle. Nach umfangreichen Tests war es an der Zeit, den neuen Antrieb während des Fluges gegen den alten auszutauschen. Dadurch wurde der neue, effizientere Antrieb in das bestehende Schiff integriert, was es ihm ermöglichte, einige ernsthafte Lichtjahre zurückzulegen und es mit dem Universum aufzunehmen.

## Zusammenführung mit dem Mainnet {#merging-with-mainnet}

Proof-of-Work sicherte das Ethereum Mainnet von der Genesis bis zum Merge. Dies ermöglichte es der Ethereum-Blockchain, an die wir alle gewöhnt sind, im Juli 2015 mit all ihren vertrauten Funktionen – Transaktionen, Smart Contracts, Konten usw. – ins Leben gerufen zu werden.

Während der gesamten Geschichte von Ethereum bereiteten sich die Entwickler auf einen eventuellen Übergang von Proof-of-Work zu Proof-of-Stake vor. Am 1. Dezember 2020 wurde die Beacon Chain als separate Blockchain zum Mainnet erstellt, die parallel lief.

Die Beacon Chain verarbeitete ursprünglich keine Mainnet-Transaktionen. Stattdessen erreichte sie einen Konsens über ihren eigenen Zustand, indem sie sich auf aktive Validatoren und deren Kontostände einigte. Nach umfangreichen Tests war es an der Zeit, dass die Beacon Chain einen Konsens über reale Daten erreichte. Nach dem Merge wurde die Beacon Chain zur Konsens-Engine für alle Netzwerkdaten, einschließlich Transaktionen der Ausführungsschicht und Kontostände.

Der Merge stellte den offiziellen Wechsel zur Nutzung der Beacon Chain als Engine der Blockproduktion dar. Mining ist nicht länger das Mittel zur Produktion gültiger Blöcke. Stattdessen haben die Proof-of-Stake-Validatoren diese Rolle übernommen und sind nun dafür verantwortlich, die Gültigkeit aller Transaktionen zu verarbeiten und Blöcke vorzuschlagen.

Beim Merge ging keine Historie verloren. Als das Mainnet mit der Beacon Chain zusammengeführt wurde, wurde auch die gesamte Transaktionshistorie von Ethereum zusammengeführt.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Dieser Übergang zu Proof-of-Stake veränderte die Art und Weise, wie Ether ausgegeben wird. Erfahren Sie mehr über die [Ether-Emission vor und nach dem Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Benutzer und Inhaber {#users-holders}

**Der Merge hat für Inhaber/Benutzer nichts geändert.**

_Dies muss wiederholt werden_: Als Benutzer oder Inhaber von ETH oder einem anderen digitalen Vermögenswert auf Ethereum sowie als Staker, der keinen Knoten betreibt, **müssen Sie nichts mit Ihren Geldern oder Ihrer Wallet tun, um den Merge zu berücksichtigen.** ETH ist einfach ETH. Es gibt kein „altes ETH“/„neues ETH“ oder „Eth1“/„Eth2“ und Wallets funktionieren nach dem Merge genau so wie davor – Leute, die Ihnen etwas anderes erzählen, sind wahrscheinlich Betrüger.

Trotz des Austauschs von Proof-of-Work blieb die gesamte Geschichte von Ethereum seit der Genesis intakt und wurde durch den Übergang zu Proof-of-Stake nicht verändert. Alle Gelder, die vor dem Merge in Ihrer Wallet gehalten wurden, sind auch nach dem Merge noch zugänglich. **Ihrerseits ist keine Aktion für das Upgrade erforderlich.**

[Mehr zur Ethereum-Sicherheit](/security/#eth2-token-scam)

### Knotenbetreiber und Dapp-Entwickler {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Zu den wichtigsten Aktionspunkten gehören:

1. Führen Sie _sowohl_ einen Konsens-Client als auch einen Ausführungsclient aus; Endpunkte von Drittanbietern zum Abrufen von Ausführungsdaten funktionieren seit dem Merge nicht mehr.
2. Authentifizieren Sie sowohl Ausführungs- als auch Konsens-Clients mit einem gemeinsamen JWT-Geheimnis, damit sie sicher kommunizieren können.
3. Legen Sie eine `fee recipient`-Adresse fest, um Ihre verdienten Transaktionsgebühren-Trinkgelder/MEV zu erhalten.

Wenn Sie die ersten beiden oben genannten Punkte nicht abschließen, wird Ihr Knoten als „offline“ angesehen, bis beide Schichten synchronisiert und authentifiziert sind.

Wenn Sie keine `fee recipient` festlegen, kann sich Ihr Validator weiterhin wie gewohnt verhalten, aber Sie verpassen unverbrennte Gebühren-Trinkgelder und jeglichen MEV, den Sie sonst in Blöcken verdient hätten, die Ihr Validator vorschlägt.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Bis zum Merge reichte ein Ausführungsclient (wie Go Ethereum (Geth), Erigon, Besu oder Nethermind) aus, um Blöcke zu empfangen, ordnungsgemäß zu validieren und zu verbreiten, die vom Netzwerk weitergegeben wurden. _Nach dem Merge_ hängt die Gültigkeit von Transaktionen, die in einer Ausführungs-Payload enthalten sind, nun auch von der Gültigkeit des „Konsens-Blocks“ ab, in dem sie enthalten ist.

Infolgedessen erfordert ein vollständiger Ethereum-Knoten nun sowohl einen Ausführungsclient als auch einen Konsens-Client. Diese beiden Clients arbeiten über eine neue Engine-API zusammen. Die Engine-API erfordert eine Authentifizierung mithilfe eines JWT-Geheimnisses, das beiden Clients zur Verfügung gestellt wird und eine sichere Kommunikation ermöglicht.

Zu den wichtigsten Aktionspunkten gehören:

- Installieren Sie zusätzlich zu einem Ausführungsclient einen Konsens-Client
- Authentifizieren Sie Ausführungs- und Konsens-Clients mit einem gemeinsamen JWT-Geheimnis, damit sie sicher miteinander kommunizieren können.

Wenn Sie die oben genannten Punkte nicht abschließen, wird Ihr Knoten als „offline“ angezeigt, bis beide Schichten synchronisiert und authentifiziert sind.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Der Merge brachte Änderungen am Konsens mit sich, was auch Änderungen in Bezug auf Folgendes beinhaltet:

<ul>
  <li>Blockstruktur</li>
  <li>Slot-/Block-Timing</li>
  <li>Opcode-Änderungen</li>
  <li>Quellen für Onchain-Zufälligkeit</li>
  <li>Konzept von <em>Safe Head</em> und <em>endgültigen Blöcken</em></li>
</ul>

Weitere Informationen finden Sie in diesem Blogbeitrag von Tim Beiko darüber, <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">wie sich der Merge auf die Anwendungsschicht von Ethereum auswirkt</a>.

</ExpandableCard>

## Der Merge und der Energieverbrauch {#merge-and-energy}

Der Merge markierte das Ende von Proof-of-Work für Ethereum und leitete die Ära eines nachhaltigeren, umweltfreundlicheren Ethereums ein. Der Energieverbrauch von Ethereum sank um schätzungsweise 99,95 %, was Ethereum zu einer grünen Blockchain macht. Erfahren Sie mehr über den [Energieverbrauch von Ethereum](/energy-consumption/).

## Der Merge und die Skalierung {#merge-and-scaling}

Der Merge bereitete auch die Bühne für weitere Skalierbarkeits-Upgrades, die unter Proof-of-Work nicht möglich waren, und brachte Ethereum der Erreichung der vollen Skalierung, Sicherheit und Nachhaltigkeit, auf die [seine Roadmap](/roadmap/) hinarbeitet, einen Schritt näher.

## Missverständnisse über den Merge {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Es gibt zwei Arten von Ethereum-Knoten: Knoten, die Blöcke vorschlagen können, und Knoten, die dies nicht tun.

Knoten, die Blöcke vorschlagen, machen nur eine kleine Anzahl der gesamten Knoten auf Ethereum aus. Diese Kategorie umfasst Mining-Knoten unter Proof-of-Work (PoW) und Validator-Knoten unter Proof-of-Stake (PoS). Diese Kategorie erfordert den Einsatz wirtschaftlicher Ressourcen (wie GPU-Hash-Leistung bei Proof-of-Work oder gestakte ETH bei Proof-of-Stake) im Austausch für die Fähigkeit, gelegentlich den nächsten Block vorzuschlagen und Protokollbelohnungen zu verdienen.

Die anderen Knoten im Netzwerk (d. h. die Mehrheit) müssen keine wirtschaftlichen Ressourcen über einen handelsüblichen Computer mit 1-2 TB verfügbarem Speicherplatz und einer Internetverbindung hinaus einsetzen. Diese Knoten schlagen keine Blöcke vor, spielen aber dennoch eine entscheidende Rolle bei der Sicherung des Netzwerks, indem sie alle Blockvorschlagenden zur Rechenschaft ziehen, indem sie auf neue Blöcke warten und deren Gültigkeit bei Ankunft gemäß den Konsensregeln des Netzwerks überprüfen. Wenn der Block gültig ist, verbreitet der Knoten ihn weiter im Netzwerk. Wenn der Block aus irgendeinem Grund ungültig ist, ignoriert die Knoten-Software ihn als ungültig und stoppt seine Verbreitung.

Der Betrieb eines nicht blockproduzierenden Knotens ist für jeden unter beiden Konsensmechanismen (Proof-of-Work oder Proof-of-Stake) möglich; es wird allen Benutzern <em>dringend empfohlen</em>, wenn sie die Mittel dazu haben. Der Betrieb eines Knotens ist für Ethereum immens wertvoll und bietet jedem Einzelnen, der einen betreibt, zusätzliche Vorteile, wie verbesserte Sicherheit, Privatsphäre und Zensurresistenz.

Die Fähigkeit für jeden, seinen eigenen Knoten zu betreiben, ist <em>absolut unerlässlich</em>, um die Dezentralisierung des Ethereum-Netzwerks aufrechtzuerhalten.

[Mehr zum Betrieb eines eigenen Knotens](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Gas-Gebühren sind ein Produkt der Netzwerknachfrage im Verhältnis zur Kapazität des Netzwerks. Der Merge hat die Verwendung von Proof-of-Work eingestellt und ist für den Konsens zu Proof-of-Stake übergegangen, hat aber keine Parameter wesentlich geändert, die die Netzwerkkapazität oder den Transaktionsdurchsatz direkt beeinflussen.

Mit einer <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">Rollup-zentrierten Roadmap</a> konzentrieren sich die Bemühungen auf die Skalierung der Benutzeraktivität auf [Layer 2](/layer-2/), während das Layer 1 (L1) Mainnet als sichere dezentrale Abwicklungsschicht aktiviert wird, die für die Rollup-Datenspeicherung optimiert ist, um Rollup-Transaktionen exponentiell billiger zu machen. Der Übergang zu Proof-of-Stake ist eine entscheidende Voraussetzung, um dies zu verwirklichen. [Mehr zu Gas und Gebühren.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
Die „Geschwindigkeit“ einer Transaktion kann auf verschiedene Weise gemessen werden, einschließlich der Zeit bis zur Aufnahme in einen Block und der Zeit bis zur Endgültigkeit. Beides ändert sich leicht, aber nicht so, dass Benutzer es bemerken werden.

Historisch gesehen war es bei Proof-of-Work das Ziel, alle ~13,3 Sekunden einen neuen Block zu haben. Unter Proof-of-Stake treten Slots genau alle 12 Sekunden auf, von denen jeder eine Gelegenheit für einen Validator ist, einen Block zu veröffentlichen. Die meisten Slots haben Blöcke, aber nicht unbedingt alle (z. B. wenn ein Validator offline ist). Bei Proof-of-Stake werden Blöcke ~10 % häufiger produziert als bei Proof-of-Work. Dies war eine ziemlich unbedeutende Änderung und wird von Benutzern wahrscheinlich nicht bemerkt.

Proof-of-Stake führte das Konzept der Transaktions-Endgültigkeit ein, das es vorher nicht gab. Bei Proof-of-Work wird die Fähigkeit, einen Block rückgängig zu machen, mit jedem weiteren Block, der auf einer Transaktion gemint wird, exponentiell schwieriger, erreicht aber nie ganz null. Unter Proof-of-Stake werden Blöcke in Epochen gebündelt (Zeitspannen von 6,4 Minuten, die 32 Chancen für Blöcke enthalten), über die Validatoren abstimmen. Wenn eine Epoche endet, stimmen die Validatoren darüber ab, ob die Epoche als „gerechtfertigt“ betrachtet werden soll. Wenn die Validatoren zustimmen, die Epoche zu rechtfertigen, wird sie in der nächsten Epoche endgültig. Das Rückgängigmachen endgültiger Transaktionen ist wirtschaftlich nicht machbar, da es erforderlich machen würde, über ein Drittel der gesamten gestakten ETH zu beschaffen und zu verbrennen.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Anfänglich nach dem Merge konnten Staker nur auf Gebühren-Trinkgelder und MEV zugreifen, die als Ergebnis von Blockvorschlägen verdient wurden. Diese Belohnungen werden einem Nicht-Staking-Konto gutgeschrieben, das vom Validator kontrolliert wird (bekannt als <em>Gebührenempfänger</em>), und sind sofort verfügbar. Diese Belohnungen sind getrennt von Protokollbelohnungen für die Erfüllung von Validator-Pflichten.

Seit dem Shanghai/Capella-Netzwerk-Upgrade können Staker nun eine <em>Abhebungsadresse</em> festlegen, um automatische Auszahlungen von überschüssigem Staking-Guthaben (ETH über 32 aus Protokollbelohnungen) zu erhalten. Dieses Upgrade ermöglichte es einem Validator auch, sein gesamtes Guthaben beim Austritt aus dem Netzwerk freizuschalten und zurückzufordern.

[Mehr zu Staking-Abhebungen](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Da das Shanghai/Capella-Upgrade Abhebungen ermöglichte, haben Validatoren einen Anreiz, ihr Staking-Guthaben über 32 ETH abzuheben, da diese Gelder nicht zur Rendite beitragen und ansonsten gesperrt sind. Abhängig von der APR (bestimmt durch die gesamten gestakten ETH) können sie einen Anreiz haben, mit ihrem Validator (oder ihren Validatoren) einen Austritt durchzuführen, um ihr gesamtes Guthaben zurückzufordern, oder möglicherweise noch mehr zu staken, indem sie ihre Belohnungen verwenden, um mehr Rendite zu erzielen.

Ein wichtiger Vorbehalt hierbei ist, dass vollständige Validator-Austritte durch das Protokoll ratenbegrenzt sind und nur eine bestimmte Anzahl von Validatoren pro Epoche (alle 6,4 Minuten) austreten darf. Dieses Limit schwankt je nach Anzahl der aktiven Validatoren, läuft aber darauf hinaus, dass an einem einzigen Tag etwa 0,33 % der gesamten gestakten ETH aus dem Netzwerk abgezogen werden können.

Dies verhindert einen Massenexodus von gestakten Geldern. Darüber hinaus verhindert es, dass ein potenzieller Angreifer mit Zugriff auf einen großen Teil der gesamten gestakten ETH ein Slashing-Vergehen begeht und alle betroffenen Validator-Guthaben in derselben Epoche abzieht/abhebt, bevor das Protokoll die Slashing-Strafe durchsetzen kann.

Die APR ist auch absichtlich dynamisch, was es einem Markt von Stakern ermöglicht, auszugleichen, wie viel sie bereit sind, sich für die Sicherung des Netzwerks bezahlen zu lassen. Wenn die Rate zu niedrig ist, werden Validatoren mit einer durch das Protokoll begrenzten Rate austreten. Allmählich wird dies die APR für alle verbleibenden erhöhen und wieder neue oder zurückkehrende Staker anziehen.
</ExpandableCard>

## Was ist mit „Eth2“ passiert? {#eth2}

Der Begriff „Eth2“ wurde verworfen. Nach der Zusammenführung von „Eth1“ und „Eth2“ zu einer einzigen Chain besteht keine Notwendigkeit mehr, zwischen zwei Ethereum-Netzwerken zu unterscheiden; es gibt nur noch Ethereum.

Um Verwirrung zu vermeiden, hat die Community diese Begriffe aktualisiert:

- „Eth1“ ist jetzt die „Ausführungsschicht“, die Transaktionen und Ausführung handhabt.
- „Eth2“ ist jetzt die „Konsensschicht“, die den Proof-of-Stake-Konsens handhabt.

Diese Terminologie-Updates ändern nur die Namenskonventionen; dies ändert nichts an den Zielen oder der Roadmap von Ethereum.

[Erfahren Sie mehr über die Umbenennung von „Eth2“](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Beziehung zwischen Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades hängen alle in gewisser Weise zusammen. Lassen Sie uns also zusammenfassen, wie der Merge mit den anderen Upgrades zusammenhängt.

### Der Merge und die Beacon Chain {#merge-and-beacon-chain}

Der Merge stellt die formelle Übernahme der Beacon Chain als neue Konsensschicht für die ursprüngliche Mainnet-Ausführungsschicht dar. Seit dem Merge werden Validatoren zugewiesen, um das Ethereum Mainnet zu sichern, und Mining auf [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) ist kein gültiges Mittel zur Blockproduktion mehr.

Blöcke werden stattdessen von validierenden Knoten vorgeschlagen, die ETH gestakt haben, als Gegenleistung für das Recht, am Konsens teilzunehmen. Diese Upgrades bereiten die Bühne für zukünftige Skalierbarkeits-Upgrades, einschließlich Sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  Die Beacon Chain
</ButtonLink>

### Der Merge und das Shanghai-Upgrade {#merge-and-shanghai}

Um den Fokus auf einen erfolgreichen Übergang zu Proof-of-Stake zu vereinfachen und zu maximieren, enthielt das Merge-Upgrade bestimmte erwartete Funktionen nicht, wie z. B. die Möglichkeit, gestakte ETH abzuheben. Diese Funktionalität wurde separat mit dem Shanghai/Capella-Upgrade aktiviert.

Für Neugierige: Erfahren Sie mehr darüber, [was nach dem Merge passiert](https://youtu.be/7ggwLccuN5s?t=101), präsentiert von Vitalik auf dem ETHGlobal-Event im April 2021.

### Der Merge und Sharding {#merge-and-data-sharding}

Ursprünglich war geplant, vor dem Merge an Sharding zu arbeiten, um die Skalierbarkeit anzugehen. Mit dem Boom von [Layer-2-Skalierungslösungen](/layer-2/) verlagerte sich die Priorität jedoch darauf, zuerst Proof-of-Work gegen Proof-of-Stake auszutauschen.

Die Pläne für Sharding entwickeln sich rasant, aber angesichts des Aufstiegs und Erfolgs von Layer-2-Technologien zur Skalierung der Transaktionsausführung haben sich die Sharding-Pläne darauf verlagert, den optimalsten Weg zu finden, um die Last der Speicherung komprimierter Aufrufdaten von Rollup-Verträgen zu verteilen, was ein exponentielles Wachstum der Netzwerkkapazität ermöglicht. Dies wäre ohne den vorherigen Übergang zu Proof-of-Stake nicht möglich.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Weiterführende Literatur {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />