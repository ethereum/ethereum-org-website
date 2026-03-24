---
title: Gepooltes Staking
description: "Erfahre mehr über Staking-Pools"
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Nashorn Leslie schwimmt im Pool.
sidebarDepth: 2
summaryPoints:
  - Stake und verdiene Belohnungen mit einem beliebigen ETH-Betrag, indem du dich mit anderen zusammenschließt
  - Überspringe den schwierigen Teil und vertraue den Validator-Betrieb einem Drittanbieter an
  - Halte Staking-Token in deiner eigenen Wallet
---

## Was sind Staking-Pools? {#what-are-staking-pools}

Staking-Pools sind ein gemeinschaftlicher Ansatz, der es vielen Personen mit kleineren ETH-Beträgen ermöglicht, die 32 ETH zu erreichen, die zur Aktivierung eines Satzes von Validator-Schlüsseln erforderlich sind. Die Pooling-Funktionalität wird vom Protokoll nicht nativ unterstützt, weshalb separate Lösungen entwickelt wurden, um diesen Bedarf zu decken.

Einige Pools arbeiten mit Smart Contracts, bei denen Gelder in einen Vertrag eingezahlt werden können, der deinen Einsatz vertrauenslos verwaltet und nachverfolgt und dir einen Token ausstellt, der diesen Wert repräsentiert. Andere Pools verwenden möglicherweise keine Smart Contracts und werden stattdessen Off-Chain vermittelt.

## Warum in einem Pool staken? {#why-stake-with-a-pool}

Zusätzlich zu den Vorteilen, die wir in unserer [Einführung zum Staking](/staking/) beschrieben haben, bietet das Staking in einem Pool eine Reihe von besonderen Vorteilen.

<CardGrid>
  <Card title="Niedrige Eintrittsbarriere" emoji="🐟" description="Du bist kein Wal? Kein Problem. Die meisten Staking-Pools ermöglichen es dir, praktisch jeden beliebigen ETH-Betrag zu staken, indem du dich mit anderen Stakern zusammenschließt, im Gegensatz zum Solo-Staking, das 32 ETH erfordert." />
  <Card title="Stake noch heute" emoji=":stopwatch:" description="Staking in einem Pool ist so einfach wie das Tauschen von Token. Du musst dir keine Gedanken über die Hardware-Einrichtung und die Wartung von Blockchain-Knoten machen. Pools ermöglichen es dir, deine ETH einzuzahlen, was es den Betreibern von Blockchain-Knoten ermöglicht, Validatoren auszuführen. Die Belohnungen werden dann abzüglich einer Gebühr für den Betrieb der Blockchain-Knoten an die Mitwirkenden verteilt." />
  <Card title="Staking-Token" emoji=":droplet:" description="Viele Staking-Pools stellen einen Token zur Verfügung, der einen Anspruch auf deine gestakten ETH und die dadurch generierten Belohnungen darstellt. Dies ermöglicht es dir, deine gestakten ETH zu nutzen, z. B. als Sicherheit in DeFi-Anwendungen." />
</CardGrid>

<StakingComparison page="pools" />

## Was es zu beachten gilt {#what-to-consider}

Gepooltes oder delegiertes Staking wird vom [Ethereum](/)-Protokoll nicht nativ unterstützt, aber angesichts der Nachfrage von Benutzern, weniger als 32 ETH zu staken, wurde eine wachsende Anzahl von Lösungen entwickelt, um diesen Bedarf zu decken.

Jeder Pool und die von ihm verwendeten Tools oder Smart Contracts wurden von verschiedenen Teams entwickelt und bringen jeweils eigene Vorteile und Risiken mit sich. Pools ermöglichen es Benutzern, ihre ETH gegen einen Token zu tauschen, der gestakte ETH repräsentiert. Der Token ist nützlich, da er es Benutzern ermöglicht, jeden beliebigen ETH-Betrag in einen entsprechenden Betrag eines renditebringenden Tokens zu tauschen, der eine Rendite aus den Staking-Belohnungen generiert, die auf die zugrunde liegenden gestakten ETH angewendet werden (und umgekehrt), und zwar auf dezentralisierten Börsen, obwohl die tatsächlichen ETH auf der Konsensebene gestakt bleiben. Das bedeutet, dass das Hin- und Hertauschen zwischen einem renditebringenden gestakten ETH-Produkt und „reinen ETH“ schnell, einfach und nicht nur in Vielfachen von 32 ETH möglich ist.

Diese gestakten ETH-Token neigen jedoch dazu, kartellähnliche Verhaltensweisen zu erzeugen, bei denen eine große Menge an gestakten ETH unter die Kontrolle einiger weniger zentralisierter Organisationen gerät, anstatt auf viele unabhängige Einzelpersonen verteilt zu sein. Dies schafft Bedingungen für Zensur oder Wertabschöpfung. Der Goldstandard für das Staking sollte immer sein, dass Einzelpersonen Validatoren auf ihrer eigenen Hardware ausführen, wann immer dies möglich ist.

[Mehr über die Risiken von Staking-Token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Im Folgenden werden Attributindikatoren verwendet, um auf bemerkenswerte Stärken oder Schwächen eines aufgeführten Staking-Pools hinzuweisen. Nutze diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während du einen Pool auswählst, dem du beitreten möchtest.

<StakingConsiderations page="pools" />

## Staking-Pools erkunden {#explore-staking-pools}

Es gibt eine Vielzahl von Optionen, die dir bei deiner Einrichtung helfen. Verwende die obigen Indikatoren als Orientierungshilfe für die unten stehenden Tools.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Bitte beachte, wie wichtig es ist, einen Dienst zu wählen, der die [Client-Vielfalt](/developers/docs/nodes-and-clients/client-diversity/) ernst nimmt, da dies die Sicherheit des Netzwerks verbessert und dein Risiko begrenzt. Dienste, bei denen es Anzeichen dafür gibt, dass sie die Nutzung von Mehrheits-Clients einschränken, sind mit <em style={{ textTransform: "uppercase" }}>„Ausführungs-Client-Vielfalt“</em> und <em style={{ textTransform: "uppercase" }}>„Konsens-Client-Vielfalt“</em> gekennzeichnet.

Hast du einen Vorschlag für ein Staking-Tool, das wir übersehen haben? Sieh dir unsere [Richtlinie für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob es passen würde, und reiche es zur Überprüfung ein.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wie verdiene ich Belohnungen?">
Typischerweise werden ERC-20-Staking-Token an Staker ausgegeben und repräsentieren den Wert ihrer gestakten ETH plus Belohnungen. Denke daran, dass verschiedene Pools die Staking-Belohnungen über leicht unterschiedliche Methoden an ihre Benutzer verteilen, aber dies ist das gemeinsame Prinzip.
</ExpandableCard>

<ExpandableCard title="Wann kann ich meinen Einsatz abheben?">
Ab sofort! Das Shanghai/Capella-Netzwerk-Upgrade fand im April 2023 statt und führte Staking-Abhebungen ein. Validator-Konten, die Staking-Pools unterstützen, haben nun die Möglichkeit, auszusteigen und ETH an ihre festgelegte Abhebungsadresse abzuheben. Dies ermöglicht es, deinen Anteil am Einsatz gegen die zugrunde liegenden ETH einzulösen. Erkundige dich bei deinem Anbieter, wie er diese Funktionalität unterstützt.

Alternativ ermöglichen Pools, die einen ERC-20-Staking-Token verwenden, den Benutzern, diesen Token auf dem freien Markt zu handeln. So kannst du deine Staking-Position verkaufen und effektiv „abheben“, ohne tatsächlich ETH aus dem Staking-Vertrag zu entfernen.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Abhebungen</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Unterscheidet sich das vom Staking über meine Börse?">
Es gibt viele Ähnlichkeiten zwischen diesen gepoolten Staking-Optionen und zentralisierten Börsen, wie z. B. die Möglichkeit, kleine ETH-Beträge zu staken und diese zu bündeln, um Validatoren zu aktivieren.

Im Gegensatz zu zentralisierten Börsen nutzen viele andere gepoolte Staking-Optionen Smart Contracts und/oder Staking-Token, bei denen es sich in der Regel um ERC-20-Token handelt, die in deiner eigenen Wallet gehalten und wie jeder andere Token gekauft oder verkauft werden können. Dies bietet eine Ebene der Souveränität und Sicherheit, indem es dir die Kontrolle über deine Token gibt, aber es gibt dir immer noch keine direkte Kontrolle über den Validator-Client, der im Hintergrund in deinem Namen Bestätigungen durchführt.

Einige Pooling-Optionen sind dezentralisierter als andere, wenn es um die Blockchain-Knoten geht, die sie unterstützen. Um die Gesundheit und Dezentralisierung des Netzwerks zu fördern, werden Staker immer ermutigt, einen Pooling-Dienst auszuwählen, der eine erlaubnisfreie, dezentralisierte Gruppe von Betreibern von Blockchain-Knoten ermöglicht.
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) – _Eridian und Spacesider_
- [Staking mit Rocket Pool – Staking-Übersicht](https://docs.rocketpool.net/guides/staking/overview.html) – _RocketPool-Dokumentation_
- [Ethereum-Staking mit Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) – _Lido-Hilfedokumentation_