---
title: Liquid & Pooled Staking
description: Ein Überblick über Liquid und Pooled Staking auf Ethereum
lang: de
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Staken Sie und verdienen Sie Belohnungen mit einem beliebigen ETH-Betrag, indem Sie sich mit anderen zusammenschließen
  - Überspringen Sie den schwierigen Teil und vertrauen Sie den Validator-Betrieb einem Drittanbieter an
  - Halten Sie Liquid-Staking-Token in Ihrer eigenen Wallet
---

## Was sind Staking-Pools? {#what-are-staking-pools}

Staking-Pools sind ein gemeinschaftlicher Ansatz, der es vielen Personen mit kleineren ETH-Beträgen ermöglicht, das Minimum von 32 ETH zu erreichen, das zur Aktivierung eines Validators auf [Ethereum](/) erforderlich ist. Die Pooling-Funktionalität wird vom Protokoll nicht nativ unterstützt, daher wurden separate Lösungen entwickelt, um den Bedarf an einer Teilnahme mit kleineren Beträgen zu decken.

Einige Staking-Pools arbeiten mit Smart Contracts, bei denen Gelder in einen Vertrag eingezahlt werden, der Ihren Stake verwaltet und nachverfolgt, und Ihnen einen Token als Transaktionsbeleg (Liquid-Staking-Token) ausstellt, der diesen Wert repräsentiert. Andere Pools verwenden möglicherweise keine Smart Contracts und werden stattdessen offchain vermittelt.

Pooled-Optionen unterscheiden sich enorm darin, wie viel Sie über sie verifizieren können. Transparente, protokollgesteuerte Pools sind Open-Source-Smart-Contracts auf Ethereum, die Einlagen halten, ihre Knotenbetreiber-Sets veröffentlichen und einen einlösbaren Token ausgeben; alles, was Ihre Position absichert, ist onchain sichtbar. Intransparente Pooled-Produkte, wie z. B. einige Renditeprogramme zentralisierter Börsen, nehmen Ihre ETH in Verwahrung, und Sie können nicht unabhängig überprüfen, was in Ihrem Namen gestakt wird, falls überhaupt etwas gestakt wird. Der Großteil dieser Seite behandelt die erste Art; siehe [intransparente Pooled-Produkte](#opaque-pooled-products), um zu erfahren, wie man den Unterschied erkennt.

Jede Pooled-Option löst das reale Zugangsproblem des Stakings mit weniger als 32 ETH oder ohne den Betrieb eigener Hardware. Aber jede stellt auch einen Vermittler zwischen den Staker und das Kern-Ethereum-Protokoll. Nur [Solo Staking](/staking/solo/) bietet Ihnen eine direkte, unvermittelte Beziehung zu Ethereum.

## Warum mit einem Pool staken? {#why-stake-with-a-pool}

Zusätzlich zu den Vorteilen der [Teilnahme am Staking](/staking/) bietet das Staking mit einem Pool eine Reihe einzigartiger Vorteile.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Kein Wal? Kein Problem. Die meisten Staking-Pools ermöglichen es Ihnen, praktisch jeden beliebigen ETH-Betrag zu staken, indem Sie sich mit anderen Stakern zusammenschließen, im Gegensatz zum Solo Staking, das 32 ETH erfordert." />
  <Card title="Stake today" icon={<Clock />} description="Das Staking mit einem Pool ist so einfach wie ein Token-Tausch. Sie müssen sich keine Gedanken über die Hardware-Einrichtung und die Wartung von Knoten machen. Pools ermöglichen es Ihnen, Ihre ETH einzuzahlen, was es Knotenbetreibern ermöglicht, Validatoren auszuführen. Die Belohnungen werden dann abzüglich einer Gebühr für den Knotenbetrieb an die Mitwirkenden verteilt." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="Viele Staking-Pools stellen einen Token zur Verfügung, der einen Anspruch auf Ihre gestakten ETH und die dadurch generierten Belohnungen darstellt. Dies ermöglicht es Ihnen, Ihre gestakten ETH zu nutzen, z. B. als Sicherheit in DeFi-Anwendungen." />
</Grid>

## Vergleich der Staking-Optionen {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Liquid-Staking-Token {#liquid-staking-tokens}

Die meisten transparenten Staking-Pools geben einen **Liquid-Staking-Token (LST)** aus, einen ERC-20-Token, der einen Anspruch auf gestakte ETH und die damit verdienten Belohnungen darstellt. Wenn Sie ETH einzahlen, stakt das Protokoll diese bei seinen Knotenbetreibern und prägt einen Token als Transaktionsbeleg (LST) in Ihre Wallet. Sie können den Token selbst halten oder ihn bei einem Drittanbieter verwahren lassen und den Token jederzeit transferieren oder verkaufen. Die zugrunde liegenden ETH bleiben auf der Konsensschicht gestakt. Liquid-Staking-Protokolle machen etwa ein Drittel aller gestakten ETH aus, was LSTs heute zu einer der häufigsten Arten des Stakings macht.

### Wie sich Belohnungen im Token widerspiegeln {#how-rewards-show-up-in-the-token}

LSTs spiegeln Staking-Belohnungen auf eine von zwei Arten wider:

- **Rebasing-Token** (wie stETH von Lido): Ihr Token-Guthaben steigt, wenn Belohnungen anfallen, sodass ein Token im Wert ungefähr einem ETH entspricht.
- **Wechselkurs-Token** (wie rETH von Rocket Pool): Ihr Token-Guthaben bleibt gleich, aber jeder Token kann im Laufe der Zeit gegen eine wachsende Menge an ETH eingelöst werden.

Beide Designs liefern Belohnungen abzüglich der Gebühr des Staking-Protokolls. Keines von beiden ist von Natur aus besser, aber sie verhalten sich in Wallets und DeFi-Anwendungen unterschiedlich und werden in einigen Gerichtsbarkeiten steuerlich unterschiedlich behandelt. Rebasing-Token haben oft „verpackte“ (wrapped) Non-Rebasing-Versionen für die Kompatibilität mit [DeFi](/glossary/#defi)-Anwendungen.

### Einlösen und Handeln {#redeeming-and-trading}

Es gibt zwei Möglichkeiten, aus einer LST-Position auszutreten:

- **Einlösen über das Protokoll** gegen die zugrunde liegenden ETH. Die Einlösung hängt davon ab, ob das Protokoll über verfügbare Liquidität verfügt, entweder durch einen Puffer an ungestakten ETH oder durch Validatoren, die über die Austrittswarteschlange der Konsensschicht austreten, was Zeit in Anspruch nehmen kann.
- **Verkauf auf Sekundärmärkten** zu jeder Zeit. Da der Token frei gehandelt wird, kann sein Marktpreis vom Wert der ihn absichernden ETH abweichen, insbesondere in Zeiten von Marktstress.

Seit dem Pectra-Upgrade ermöglichen [von der Ausführungsschicht ausgelöste Abhebungen (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002), dass Validator-Austritte direkt von der Ausführungsschicht durch den Inhaber der Abhebungsadresse ausgelöst werden. Staking-Protokolle können diese Funktion nutzen, um sicherzustellen, dass ihre Validatoren austreten können, ohne auf die Kooperation der Knotenbetreiber angewiesen zu sein, sodass Einlösungen weniger auf das Vertrauen in Knotenbetreiber angewiesen sind als früher.

### Das Halten eines LST ist nicht dasselbe wie Staking {#holding-an-lst-is-not-the-same-as-staking}

Das Ethereum-Protokoll zahlt Belohnungen an Validatoren; es weiß nicht, dass Ihr Token existiert. Wenn Sie einen LST halten, sind Sie aus Sicht des Protokolls kein Staker. Stattdessen halten Sie einen Anspruch gegenüber einem Dienst oder Smart Contract, der in Ihrem Namen stakt. Dies funktioniert unter normalen Bedingungen gut, bringt jedoch zusätzliche Vertrauensabhängigkeiten mit sich. Ihre gestakten ETH hängen davon ab, dass die Verträge, die Governance und die Betreiber des Pools korrekt funktionieren, und nicht nur von Ethereum selbst.

## Risiken von Liquid-Staking-Token {#risks-of-liquid-staking-tokens}

LSTs erben die zugrunde liegenden Risiken des Stakings (wie Slashing und Ausfallstrafen für die Validatoren des Pools) und fügen eigene Ebenen hinzu:

- **Smart-Contract-Risiko** – Ihre ETH werden von Verträgen gehalten, die Fehler enthalten oder ausgenutzt werden könnten. Bevorzugen Sie Protokolle mit Open-Source-, geprüftem und praxiserprobtem Code.
- **Markt- und Liquiditätsrisiko** – der Sekundärmarktpreis des Tokens kann unter den Wert der ihn absichernden ETH fallen („Depegging“). Wenn Protokolleinlösungen langsam oder überlastet sind, wenn Sie aussteigen möchten, ist ein Verkauf mit Abschlag möglicherweise Ihr einziger schneller Austritt.
- **Governance- und Upgrade-Risiko** – Gebühren, Knotenbetreiber-Sets und sogar die Funktionsweise des Tokens können durch die Governance des Protokolls und Vertrags-Upgrades geändert werden. Als Token-Inhaber haben Sie in dieser Governance normalerweise keine Stimme.
- **Zentralisierung des Betreiber-Sets** – einige Pools konzentrieren den Stake bei ihren ausgewählten Knotenbetreibern. Große Mengen an gestakten ETH unter der Kontrolle weniger Organisationen schaffen Bedingungen für Zensur, Wertabschöpfung und Single Points of Failure. Bevorzugen Sie Pools mit erlaubnisfreien, verteilten Betreiber-Sets.
- **Weitergabe von Slashing** – wenn die Validatoren des Pools geslasht oder bestraft werden, wird der Verlust in der Regel gemäß den Regeln des Protokolls auf alle Token-Inhaber umgelegt.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Viele Pools reduzieren das Betreiberrisiko durch den Einsatz von **Verteilter Validator-Technologie (DVT)**, einer Middleware, die den Schlüssel eines Validators auf mehrere Maschinen und Betreiber aufteilt, sodass kein einzelner Ausfall oder eine Kompromittierung den Validator lahmlegt. [Mehr zur Verteilten Validator-Technologie (DVT)](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Intransparente Pooled-Produkte {#opaque-pooled-products}

Nicht alles, was als „Staking“ vermarktet wird, ist Protokoll-Staking. „Earn“- oder „Rewards“-Programme zentralisierter Börsen und einige Renditeprodukte, die auf Staking-Token aufbauen, bündeln Kunden-ETH auf eine Weise, die Sie nicht überprüfen können:

- **Verwahrung (Custodial)** – der Anbieter hält die Abhebungsschlüssel und die ETH.
- **Bedingungen können sich ändern** – Raten, Sperrfristen und Berechtigungen werden durch Unternehmensrichtlinien festgelegt und können jederzeit überarbeitet werden, im Gegensatz zu Regeln, die durch Onchain-Verträge durchgesetzt werden.
- **Möglicherweise gar kein Staking** – intern kann die Rendite aus Kreditvergabe, Handel oder anderen Aktivitäten anstelle von Validatoren stammen. Sie haben in der Regel keine Möglichkeit, dies zu überprüfen.
- **Kontrahentenrisiko** – wenn der Anbieter insolvent wird oder Abhebungen einfriert, gibt es für Sie onchain nichts einzulösen.

Um einen transparenten Pool von einem intransparenten Produkt zu unterscheiden, fragen Sie sich:

1. Können Sie onchain in Open-Source-, geprüften Verträgen verifizieren, wohin Ihre ETH fließen?
2. Ist das Knotenbetreiber-Set veröffentlicht?
3. Erhalten Sie einen in Ihrer eigenen Wallet gehaltenen Token, der gegen die zugrunde liegenden ETH einlösbar ist?
4. Werden die Regeln durch Smart Contracts und öffentliche Governance oder durch die Nutzungsbedingungen eines Unternehmens durchgesetzt?

Je mehr dieser Fragen ein Anbieter nur mit „Vertrauen Sie uns“ beantworten kann, desto intransparenter ist das Produkt.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Einige Produkte werben mit einer „verbesserten“ oder „gesteigerten“ Rendite, indem sie Staking mit **Restaking** kombinieren, einem Anwendungsfall für LSTs, bei dem gestakte ETH zur Sicherung zusätzlicher Protokolle unter zusätzlichen Slashing-Bedingungen eingesetzt werden. Restaking ist eine separate Risikokategorie und eine neuartige Anwendung, die auf LSTs aufbaut, und keine Form der direkten Staking-Teilnahme. Wenn eine Renditezahl deutlich höher ist als die Staking-Rate des Kernnetzwerks, sollten Sie genau fragen, woher die zusätzliche Rendite stammt. [Was ist Restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Einen Knoten für einen Pool betreiben {#run-a-node-for-a-pool}

Ein gebundener Knotenbetreiber für einen Staking-Pool zu werden, ist ein Mittelweg zwischen dem Halten eines Tokens und dem Solo Staking. Einige Staking-Protokolle lassen Einzelpersonen Validatoren mit gepoolten ETH von anderen Benutzern betreiben. Sie hinterlegen eine Kaution Ihrer eigenen ETH als Sicherheit, betreiben die Hardware und Schlüssel und verdienen eine Provision auf den Ihnen zugewiesenen Stake.

Zum Beispiel erfordern Megapool-Validatoren von Rocket Pool eine Kaution von 4 ETH pro Validator, und das Community Staking Module von Lido erfordert etwa 2,4 ETH für einen ersten Validator-Schlüssel (1,5 ETH für identifizierte Community-Staker). Dies bietet Personen mit weniger als 32 ETH eine Möglichkeit, ihre eigene Hardware zu betreiben und das Betreiber-Set des Netzwerks zu stärken, während sie die Regeln, Leistungsanforderungen und Strafbedingungen des Pools akzeptieren.

## Was es zu beachten gilt {#what-to-consider}

Jeder Pool und die von ihm verwendeten Tools oder Smart Contracts wurden von verschiedenen Teams entwickelt, und jeder bringt Vorteile und Risiken mit sich. Pooled oder delegiertes Staking wird vom Ethereum-Protokoll nicht nativ unterstützt, und der Goldstandard für das Staking sollte immer sein, dass Einzelpersonen Validatoren auf ihrer eigenen Hardware betreiben, wann immer dies möglich ist.

Im Folgenden werden Attributindikatoren verwendet, um bemerkenswerte Stärken oder Schwächen eines aufgelisteten Staking-Pools zu signalisieren. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie einen Pool auswählen, dem Sie beitreten möchten.

<StakingConsiderations page="pools" />

## Staking-Pools erkunden {#explore-staking-pools}

Es gibt eine Vielzahl von Optionen, die Ihnen bei Ihrer Einrichtung helfen. Verwenden Sie die obigen Indikatoren, um sich durch die unten stehenden Tools führen zu lassen.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Bitte beachten Sie, wie wichtig es ist, einen Dienst zu wählen, der [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) ernst nimmt, da dies die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Dienste, bei denen es Hinweise darauf gibt, dass sie die Nutzung von Mehrheits-Clients einschränken, sind mit <em style={{ textTransform: "uppercase" }}>„Ausführungsclient-Diversität“</em> und <em style={{ textTransform: "uppercase" }}>„Konsens-Client-Diversität“</em> gekennzeichnet.

Haben Sie einen Vorschlag für ein Staking-Tool, das wir übersehen haben? Sehen Sie sich unsere [Richtlinie für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob es gut passen würde, und um es zur Überprüfung einzureichen.

<StakingCommunityCallout className="my-16" />

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wie verdiene ich Belohnungen?">
Typischerweise werden ERC-20-Liquid-Staking-Token an Staker ausgegeben und repräsentieren den Wert ihrer gestakten ETH plus Belohnungen. Belohnungen erreichen Sie je nach Token-Design auf eine von zwei Arten: Rebasing-Token erhöhen Ihr Token-Guthaben, wenn Belohnungen anfallen, während Wechselkurs-Token Ihr Guthaben fixieren und im Laufe der Zeit gegen mehr ETH einlösbar werden. In beiden Fällen werden die Belohnungen abzüglich der Gebühr des Pools verteilt.
</ExpandableCard>

<ExpandableCard title="Wann kann ich meinen Stake abheben?">
Staking-Abhebungen sind seit dem Shanghai/Capella-Upgrade im April 2023 aktiviert. Validator-Konten, die Staking-Pools absichern, können austreten und ETH an ihre festgelegte Abhebungsadresse abheben, wodurch Sie Ihren Anteil am Stake gegen die zugrunde liegenden ETH einlösen können. Die Einlösungsgeschwindigkeit hängt von der verfügbaren Liquidität Ihres Pools und der Austrittswarteschlange der Konsensschicht ab. Erkundigen Sie sich bei Ihrem Anbieter, wie er diese Funktionalität unterstützt.

Seit dem Pectra-Upgrade können Pools auch von der Ausführungsschicht ausgelöste Abhebungen (EIP-7002) nutzen, um Validatoren direkt von der Abhebungsadresse austreten zu lassen, ohne auf die Signierschlüssel der Knotenbetreiber angewiesen zu sein, was das erforderliche Vertrauen in die Erfüllung von Einlösungen verringert.

Alternativ ermöglichen Pools, die einen ERC-20-Liquid-Staking-Token verwenden, den Benutzern, diesen Token auf dem freien Markt zu handeln, sodass Sie Ihre Staking-Position verkaufen können, was effektiv einer „Abhebung“ entspricht, ohne tatsächlich ETH aus dem Staking-Vertrag zu entfernen. Beachten Sie, dass der Marktpreis vom Einlösungswert des Tokens abweichen kann.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Abhebungen</ButtonLink>
</ButtonLink>

<ExpandableCard title="Unterscheidet sich das vom Staking bei meiner Börse?">
Es gibt viele Ähnlichkeiten zwischen diesen Pooled-Staking-Optionen und zentralisierten Börsen, wie z. B. die Möglichkeit, kleine ETH-Beträge zu staken und diese bündeln zu lassen, um Validatoren zu aktivieren.

Im Gegensatz zu zentralisierten Börsen nutzen viele andere Pooled-Staking-Optionen Smart Contracts und/oder Liquid-Staking-Token, bei denen es sich in der Regel um ERC-20-Token handelt, die in Ihrer eigenen Wallet gehalten und wie jeder andere Token gekauft oder verkauft werden können. Dies bietet eine Ebene der Souveränität und Sicherheit, indem es Ihnen die Kontrolle über Ihre Token gibt, verleiht Ihnen aber dennoch keine direkte Kontrolle über den Validator-Client, der im Hintergrund in Ihrem Namen attestiert.

„Earn“-Programme von Börsen sind ebenfalls verwahrend (custodial) und unterliegen Unternehmensbedingungen anstelle von Onchain-Regeln, und ihre Rendite stammt möglicherweise gar nicht aus dem Protokoll-Staking. Siehe [intransparente Pooled-Produkte](#opaque-pooled-products), um zu erfahren, wie man den Unterschied erkennt.

Einige Pooling-Optionen sind dezentraler als andere, wenn es um die Knoten geht, die sie absichern. Um die Gesundheit und Dezentralisierung des Netzwerks zu fördern, werden Staker stets ermutigt, einen Pooling-Dienst auszuwählen, der ein erlaubnisfreies, dezentrales Set von Knotenbetreibern ermöglicht.
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) – _Eridian und Spacesider_
- [Die Risiken von Liquid-Staking-Derivaten](https://notes.ethereum.org/@djrtwo/risks-of-lsd) – _Danny Ryan_
- [Was ist Liquid Staking?](https://chain.link/education-hub/liquid-staking) – _Chainlink_
- [EIP-7002: Von der Ausführungsschicht auslösbare Abhebungen](https://eips.ethereum.org/EIPS/eip-7002) – _Ethereum Improvement Proposals_
- [Bewertungen von Ethereum-Staking-Pools](https://explorer.rated.network/) – _Rated Network Explorer_
- [Was ist der Unterschied zwischen einem Liquid-Restaking-Token (LRT) und einem Liquid-Staking-Token (LST)?](https://liquidcollective.io/lst-vs-lrt/) – _Liquid Collective_