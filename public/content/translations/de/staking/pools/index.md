---
title: Pooled Staking
description: Erfahre mehr über Staking-Pools
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Nashorn Leslie schwimmt im Pool.
sidebarDepth: 2
summaryPoints:
  - Stake und verdiene Belohnungen mit einem beliebigen ETH-Betrag, indem du dich mit anderen zusammenschließt
  - Überspringe den schwierigen Teil und vertraue den Validator-Betrieb einem Drittanbieter an
  - Bewahre Staking-Token in deiner eigenen Wallet auf
---

## Was sind Staking-Pools? {#what-are-staking-pools}

Staking-Pools sind ein gemeinschaftlicher Ansatz, der es vielen Personen mit kleineren ETH-Beträgen ermöglicht, die 32 ETH zu erreichen, die zur Aktivierung eines Satzes von Validator-Schlüsseln erforderlich sind. Die Pooling-Funktionalität wird vom Protokoll nicht nativ unterstützt, weshalb separate Lösungen entwickelt wurden, um diesen Bedarf zu decken.

Einige Pools arbeiten mit Smart Contracts, bei denen Gelder in einen Vertrag eingezahlt werden können, der deinen Stake vertrauenslos verwaltet und nachverfolgt und dir einen Token ausstellt, der diesen Wert repräsentiert. Andere Pools kommen möglicherweise ohne Smart Contracts aus und werden stattdessen offchain vermittelt.

## Warum mit einem Pool staken? {#why-stake-with-a-pool}

Zusätzlich zu den Vorteilen, die wir in unserer [Einführung in das Staking](/staking/) skizziert haben, bietet das Staking mit einem Pool eine Reihe von besonderen Vorteilen.

<Grid>
  <Card title="Niedrige Einstiegshürde" emoji="🐟" description="Kein Wal? Kein Problem. Bei den meisten Staking-Pools kannst du praktisch jeden beliebigen ETH-Betrag staken, indem du dich mit anderen Stakern zusammenschließt – im Gegensatz zum Solo-Staking, für das 32 ETH erforderlich sind." />
  <Card title="Stake noch heute" emoji=":stopwatch:" description="Staking über einen Pool ist so einfach wie ein Token-Swap. Du musst dich nicht um die Hardware-Einrichtung und die Wartung der Knoten kümmern. Bei Pools kannst du deine ETH einzahlen, womit Knotenbetreiber Validatoren ausführen können. Die Belohnungen werden dann abzüglich einer Gebühr für den Knotenbetrieb an die Beitragenden ausgeschüttet." />
  <Card title="Staking-Token" emoji=":droplet:" description="Viele Staking-Pools geben einen Token aus, der einen Anspruch auf deine gestakten ETH und die damit erzielten Belohnungen darstellt. So kannst du deine gestakten ETH weiterhin nutzen, z. B. als Sicherheit in DeFi-Anwendungen." />
</Grid>

<StakingComparison page="pools" />

## Was es zu beachten gilt {#what-to-consider}

Pooled Staking oder delegiertes Staking wird vom [Ethereum](/)-Protokoll nicht nativ unterstützt. Angesichts der Nachfrage von Nutzern, weniger als 32 ETH zu staken, wurde jedoch eine wachsende Zahl von Lösungen entwickelt, um diesen Bedarf zu decken.

Jeder Pool und die von ihm verwendeten Tools oder Smart Contracts wurden von verschiedenen Teams entwickelt und bringen jeweils eigene Vorteile und Risiken mit sich. Pools ermöglichen es Nutzern, ihre ETH gegen einen Token zu tauschen, der gestakte ETH repräsentiert. Der Token ist nützlich, da er es Nutzern ermöglicht, auf dezentralen Börsen einen beliebigen ETH-Betrag in einen entsprechenden Betrag eines renditebringenden Tokens zu tauschen, der eine Rendite aus den Staking-Belohnungen generiert, die auf die zugrunde liegenden gestakten ETH angewendet werden (und umgekehrt), obwohl die tatsächlichen ETH auf der Konsensschicht gestakt bleiben. Das bedeutet, dass der Tausch zwischen einem renditebringenden gestakten ETH-Produkt und „rohen ETH“ schnell und einfach ist und nicht nur in Vielfachen von 32 ETH zur Verfügung steht.

Allerdings neigen diese gestakten ETH-Token dazu, kartellähnliche Verhaltensweisen zu fördern, bei denen eine große Menge an gestakten ETH unter die Kontrolle einiger weniger zentralisierter Organisationen gerät, anstatt auf viele unabhängige Einzelpersonen verteilt zu sein. Dies schafft Bedingungen für Zensur oder Wertabschöpfung. Der Goldstandard für das Staking sollte immer sein, dass Einzelpersonen Validatoren auf ihrer eigenen Hardware betreiben, wann immer dies möglich ist.

[Mehr über die Risiken von Staking-Token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Im Folgenden werden Attribut-Indikatoren verwendet, um auf bemerkenswerte Stärken oder Schwächen eines aufgeführten Staking-Pools hinzuweisen. Nutze diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während du dich für einen Pool entscheidest.

<StakingConsiderations page="pools" />

## Entdecke Staking-Pools {#explore-staking-pools}

Es gibt eine Vielzahl von Optionen, die dir bei deiner Einrichtung helfen. Nutze die obigen Indikatoren als Orientierungshilfe für die unten stehenden Tools.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Bitte beachte, wie wichtig es ist, einen Dienst zu wählen, der [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) ernst nimmt, da dies die Sicherheit des Netzwerks verbessert und dein Risiko begrenzt. Dienste, bei denen es Anzeichen dafür gibt, dass sie die Nutzung von Mehrheits-Clients einschränken, sind mit <em style={{ textTransform: "uppercase" }}>„Ausführungsclient-Diversität“</em> und <em style={{ textTransform: "uppercase" }}>„Konsens-Client-Diversität“</em> gekennzeichnet.

Hast du einen Vorschlag für ein Staking-Tool, das wir übersehen haben? Sieh dir unsere [Richtlinie für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob es gut passen würde, und um es zur Überprüfung einzureichen.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wie erhalte ich Belohnungen?">
Typischerweise werden ERC-20-Staking-Token an Staker ausgegeben und repräsentieren den Wert ihrer gestakten ETH zuzüglich Belohnungen. Denke daran, dass verschiedene Pools Staking-Belohnungen über leicht unterschiedliche Methoden an ihre Nutzer verteilen, aber dies ist das gemeinsame Grundprinzip.
</ExpandableCard>

<ExpandableCard title="Wann kann ich meinen Stake abheben?">
Ab sofort! Das Shanghai/Capella-Netzwerk-Upgrade fand im April 2023 statt und führte Staking-Abhebungen ein. Validator-Konten, die Staking-Pools unterstützen, haben nun die Möglichkeit zum Austritt und können ETH auf ihre festgelegte Abhebungsadresse abheben. Dies ermöglicht es, deinen Anteil am Stake gegen die zugrunde liegenden ETH einzulösen. Erkundige dich bei deinem Anbieter, wie er diese Funktionalität unterstützt.

Alternativ ermöglichen Pools, die einen ERC-20-Staking-Token verwenden, den Nutzern, diesen Token auf dem freien Markt zu handeln. So kannst du deine Staking-Position verkaufen und effektiv „abheben“, ohne tatsächlich ETH aus dem Staking-Vertrag zu entfernen.

<ButtonLink href="/staking/withdrawals/">Mehr über Staking-Abhebungen</ButtonLink>
</ButtonLink>

<ExpandableCard title="Unterscheidet sich das vom Staking über meine Börse?">
Es gibt viele Ähnlichkeiten zwischen diesen Pooled-Staking-Optionen und zentralisierten Börsen, wie z. B. die Möglichkeit, kleine Mengen an ETH zu staken und diese zu bündeln, um Validatoren zu aktivieren.

Im Gegensatz zu zentralisierten Börsen nutzen viele andere Pooled-Staking-Optionen Smart Contracts und/oder Staking-Token. Dabei handelt es sich in der Regel um ERC-20-Token, die in deiner eigenen Wallet aufbewahrt und wie jeder andere Token gekauft oder verkauft werden können. Dies bietet eine Ebene der Souveränität und Sicherheit, da du die Kontrolle über deine Token hast, gibt dir aber dennoch keine direkte Kontrolle über den Validator-Client, der im Hintergrund in deinem Namen attestiert.

Einige Pooling-Optionen sind dezentraler als andere, wenn es um die Knoten geht, die sie unterstützen. Um die Gesundheit und Dezentralisierung des Netzwerks zu fördern, werden Staker immer ermutigt, einen Pooling-Dienst zu wählen, der eine erlaubnisfreie, dezentrale Gruppe von Knotenbetreibern ermöglicht.
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) – _Eridian und Spacesider_
- [Staking mit Rocket Pool – Staking-Übersicht](https://docs.rocketpool.net/guides/staking/overview.html) – _Rocket Pool-Dokumentation_
- [Ethereum-Staking mit Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) – _Lido-Hilfedokumentation_