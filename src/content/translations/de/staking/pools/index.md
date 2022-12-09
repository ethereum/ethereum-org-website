---
title: Pool-Staking
description: Eine Übersicht darüber, wie man mit ETH-Pool-Staking beginnen kann
lang: de
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: Leslie, das Nashorn, wie es im Pool schwimmt.
summaryPoints:
  - Staken Sie und verdienen Sie Belohnungen mit jedem ETH-Betrag, indem Sie Ihre Kräfte mit anderen bündeln
  - Überspringen Sie den schwierigen Teil und vertrauen Sie den Validator-Betrieb einem Drittanbieter an
  - Halten Sie Liquiditäts-Token in Ihrer eigenen Wallet
---

## Was sind Staking-Pools? {#what-are-staking-pools}

Staking-Pools sind ein kollaborativer Ansatz, um es vielen mit kleineren ETH-Beträgen zu ermöglichen, die 32 ETH zu erhalten, die zur Aktivierung eines Satzes von Validator-Schlüsseln erforderlich sind. Die Pooling-Funktionalität wird innerhalb des Protokolls nicht nativ unterstützt, daher wurden separate Lösungen entwickelt, um diesen Bedarf zu decken.

Einige Pools arbeiten mit intelligenten Verträgen (Smart Contracts), bei denen Gelder in einen Vertrag eingezahlt werden können, der Ihren Einsatz (Stake) vertrauenswürdig verwaltet und verfolgt und Ihnen einen Token ausstellt, der diesen Wert widerspiegelt. Andere Pools beinhalten möglicherweise keine Smart Contracts und werden stattdessen außerhalb der Chain vermittelt.

## Warum in einem Pool staken? {#why-stake-with-a-pool}

Zusätzlich zu den Vorteilen, die wir in unserer [Einführung zum Staking](/staking/) beschrieben haben, bietet das Staking mit einem Pool einige konkrete Vorteile.

<CardGrid>
  <Card title="Niedrige Eintrittsbarrieren" emoji="🐟">
    Kein Wal? Kein Problem. Bei den meisten Staking-Pools können Sie praktisch jede Menge ETH einsetzen, indem Sie sich mit anderen Stakern zusammenschließen, im Gegensatz zum Solo-Staking, für das 32 ETH erforderlich sind.
  </Card>
  <Card title="Staken Sie noch heute" emoji=":stopwatch:">
    Mit einem Pool zu staken, ist so einfach wie ein Token-Swap. Sie müssen sich keine Gedanken über die Einrichtung der Hardware und die Wartung der Nodes machen. Pools ermöglichen es Ihnen, Ihre ETH zu hinterlegen, wodurch Node-Betreiber Validatoren ausführen können. Die Belohnungen werden dann abzüglich einer Gebühr für den Node-Betrieb an die Mitwirkenden verteilt.
  </Card>
  <Card title="Liquiditäts-Token" emoji=":droplet:">
    Viele Staking-Pools bieten einen Token, der einen Anspruch auf Ihre gestakten ETH und die daraus generierten Belohnungen darstellt. Dadurch können Sie Ihre eingesetzten ETH nutzen, z. B. als Sicherheit in DeFi-Anwendungen.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## Bitte beachten {#what-to-consider}

Gepooltes oder delegiertes Staking wird vom Ethereum-Protokoll nicht nativ unterstützt, aber angesichts der Nachfrage nach Benutzern, weniger als 32 ETH einzusetzen, wurde eine wachsende Zahl von Lösungen entwickelt, um diesen Bedarf zu befriedigen.

Jeder Pool und die Tools oder Smart Contracts, die sie verwenden, wurden von verschiedenen Teams entwickelt und haben jeweils ihre eigenen Risiken und Vorteile.

Attributindikatoren werden unten verwendet, um auf nennenswerte Stärken oder Schwächen hinzuweisen, die ein gelisteter Staking-Pool enthalten kann. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie einen Pool auswählen, dem Sie beitreten möchten.

<StakingConsiderations page="pools" />

## Entdecken Sie Staking-Pools {#explore-staking-pools}

Es gibt eine Vielzahl von Optionen, die Ihnen bei der Einrichtung helfen. Verwenden Sie die obigen Indikatoren, um Sie durch die folgenden Tools zu führen.

<InfoBanner emoji="⚠️" isWarning>
Bitte beachten Sie, wie wichtig es ist, einen Dienst zu wählen, der <a href="/developers/docs/nodes-and-clients/client-diversity/">Client-Diversität</a> ernst nimmt, da er die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Dienstleistungen, die nachweislich die Mehrzahl der Kunden begrenzen, sind wie folgt markiert: <em style="text-transform: uppercase;">„Diverse Kunden."</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Haben Sie einen Vorschlag für ein Staking-Tool, das wir noch nicht haben? Schauen Sie sich unsere [Produktlistenrichtlinie](/contributing/adding-staking-products/) an, um festzustellen, ob es passt, und senden Sie es uns zur Prüfung zu.

## FAQ {#faq}

<ExpandableCard title="Wie erhalte ich Belohnungen?">
Typischerweise werden ERC-20-Liquiditäts-Token an Staker ausgegeben, die den Wert ihrer eingesetzten ETH plus Belohnungen darstellen. Denken Sie daran, dass verschiedene Pools Staking-Belohnungen über leicht unterschiedliche Methoden an ihre Benutzer verteilen, aber das ist das gemeinsame Thema.
</ExpandableCard>

<ExpandableCard title="Wann kann ich meinen Einsatz zurückziehen?">

Derzeit ist es nicht möglich, Gelder von einem Ethereum-Validator abzuheben, was die Möglichkeit einschränkt, Ihre Liquiditäts-Token für die ETH Entlohnungen _einzulösen_, die momentan auf der Konsensebene gesperrt sind.

Alternativ erlauben manche Pools, die ERC-20 Liquiditäts-Token benutzen, dass deren Nutzer diese Token auf dem freien Markt handeln können, so dass diese Ihre Staking-Position verkaufen können, um quasi die Gelder „abzuheben", ohne tatsächlich ETH vom Staking-Vertrag zu entfernen.
</ExpandableCard>

<ExpandableCard title="Ist dies anders als Staking auf meiner Börse?">
Es gibt viele Ähnlichkeiten zwischen diesen gepoolten Staking-Optionen und zentralisierten Börsen, wie z. B. die Möglichkeit, kleine ETH-Beträge zu staken und sie zu bündeln, um Validatoren zu aktivieren.

Im Gegensatz zu zentralisierten Börsen verwenden viele andere gepoolte Staking-Optionen Smart Contracts und/oder Liquiditäts-Token, bei denen es sich normalerweise um ERC-20-Token handelt, die in Ihrer eigenen Wallet aufbewahrt und wie alle anderen Token gekauft oder verkauft werden können. Dies bietet eine gewisse Souveränität und Sicherheit, indem Sie die Kontrolle über Ihre Token besitzen, aber Sie haben immer noch keine direkte Kontrolle über den Validator-Kunden, der in Ihrem Namen im Hintergrund Attestierungen ausgibt.

Einige Pooling-Optionen sind dezentralisierter als andere, wenn es um die Nodes geht, die sie unterstützen. Um die Gesundheit und Dezentralisierung des Netzwerks zu fördern, werden Staker immer dazu ermutigt, einen Pooling-Service auszuwählen, der eine genehmigungsfreie, dezentrale Gruppe von Node-Betreibern ermöglicht.
</ExpandableCard>

## Weiterführende Informationen {#further-reading}

- [Staking mit Rocket Pool – Staking-Übersicht](https://docs.rocketpool.net/guides/staking/overview.html) – _RocketPool-Dokumentation_
- [Staking von Ethereum mit Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido Hilfedokumente_
