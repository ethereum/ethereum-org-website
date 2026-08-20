---
title: Delegiertes Staking (Staking as a Service)
description: Ein Überblick über den Einstieg in das delegierte Staking
lang: de
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Knotenbetreiber von Drittanbietern übernehmen den Betrieb deines Validator-Clients
  - Eine großartige Option für jeden mit 32 ETH, der sich nicht mit der technischen Komplexität des Betriebs eines Knotens befassen möchte
  - Die Delegation umfasst ein Spektrum, von Diensten, bei denen du deine Abhebungsschlüssel behältst, bis hin zu vollständig verwahrenden Börsen
---

## Was ist delegiertes Staking? {#what-is-staking-as-a-service}

Delegiertes Staking stellt eine Kategorie von Staking-Diensten dar, bei denen du deine eigenen 32 ETH für einen Validator einzahlst, aber den Knotenbetrieb an einen Drittanbieter delegierst. Der Prozess beinhaltet in der Regel, dass du durch die anfängliche Einrichtung geführt wirst, einschließlich der Schlüsselgenerierung und Einzahlung, und dann deine Signierschlüssel beim Betreiber hochlädst. Du stellst die ETH zur Verfügung, übergibst aber den Betrieb der Hardware des Validators an jemand anderen.

Das [Ethereum](/)-Protokoll unterstützt die Delegation von Stakes nicht nativ, daher wurde eine Reihe von Diensten entwickelt, um diese Nachfrage zu decken. Diese Kategorie ist am besten bekannt als **Staking as a Service (SaaS)**, umfasst jedoch ein Spektrum von Vereinbarungen, die sich in der Schlüsselfrage unterscheiden, wie viel Kontrolle du über deine gestakten ETH behältst:

- **Nicht-verwahrendes Staking as a Service**: Du behältst deine eigenen Abhebungsschlüssel und delegierst nur den Validator-Betrieb.
- **Vollständig verwahrendes Staking**: Der Anbieter, in der Regel eine Börse, hält sowohl die Schlüssel als auch die Gelder.

Im Vergleich zum [Solo Staking](/staking/solo/) platziert jede Form der Delegation eine Middleware zwischen dir und dem Ethereum-Protokoll. Diese Middleware ist Software und Infrastruktur, die vom Unternehmen eines anderen betrieben wird. Jeder Schritt in Richtung Bequemlichkeit fügt eine Vertrauensannahme hinzu. Bevor du dich also für einen Dienst entscheidest, solltest du herausfinden, wo er sich in diesem Spektrum befindet.

### Was delegiertes Staking nicht ist {#what-delegated-staking-is-not}

- **Pooled Staking und Liquid-Staking-Token (LST)**: Bei Pools kombinierst du einen beliebigen Betrag an ETH mit anderen Stakern und erhältst in der Regel einen Token, der deinen Anteil am Stake des Pools repräsentiert. Du delegierst nicht deinen eigenen Validator; die Smart Contracts und Knotenbetreiber des Pools kontrollieren die Validatoren. [Mehr über Pooled Staking](/staking/pools/)
- **Gebundener Knotenbetrieb (Bonded node operation)**: Einige Staking-Protokolle ermöglichen es dir, einen Validator auf deiner eigenen Hardware mit weniger als 32 ETH zu betreiben, indem du eine Kaution (Bond) hinterlegst. Das ist Knotenbetrieb, das Gegenteil von Delegation, und wird zusammen mit dem [Solo Staking](/staking/solo/) behandelt.

## Warum solltest du dein Staking delegieren? {#why-stake-with-a-service}

Wenn du 32 ETH zum Staken hast, dich aber nicht wohl dabei fühlst, dich mit Hardware zu befassen, ermöglichen dir delegierte Staking-Dienste, die technische Seite abzugeben, während du native Ethereum-Blockbelohnungen verdienst.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Zahle deine eigenen 32 ETH ein, um dein eigenes Set von Signierschlüsseln zu aktivieren, die am Ethereum-Konsens teilnehmen werden. Überwache deinen Fortschritt mit Dashboards, um zu sehen, wie sich diese ETH-Belohnungen ansammeln." />
  <Card title="Easy to start" icon={<Flag />} description="Vergiss Hardware-Spezifikationen, Einrichtung, Knotenwartung und Upgrades. Anbieter ermöglichen es dir, den schwierigen Teil auszulagern, indem du deine eigenen Signierberechtigungen hochlädst, sodass sie gegen eine geringe Gebühr einen Validator in deinem Namen betreiben können." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="Bei nicht-verwahrenden Diensten behältst du die Kontrolle über die Schlüssel, die das Abheben oder den Transfer von gestakten Geldern ermöglichen. Diese unterscheiden sich von den Signierschlüsseln und können separat gespeichert werden, um dein Risiko als Staker zu begrenzen (aber nicht zu eliminieren)." />
</Grid>

## Vergleich der Staking-Optionen {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Das Delegationsspektrum {#the-delegation-spectrum}

Anbieter unterscheiden sich darin, welche Schlüssel sie für dich halten, und jeder Schlüssel, den sie halten, ist etwas, das du ihnen anvertrauen musst.

### Nicht-verwahrendes Staking as a Service {#non-custodial-staking-as-a-service}

Bei nicht-verwahrendem SaaS wirst du in der Regel durch die Generierung deiner Validator-Schlüssel und die Durchführung deiner eigenen Einzahlung von 32 ETH geführt, dann lädst du die _Signierschlüssel_ beim Betreiber hoch. Die Signierschlüssel ermöglichen es dem Betreiber, Validator-Aufgaben (das Bezeugen und Vorschlagen von Blöcken) in deinem Namen auszuführen. Ein Missbrauch kann dazu führen, dass dein Validator bestraft oder geslasht wird (Slashing), aber sie können nicht verwendet werden, um deine Gelder abzuheben, zu transferieren oder auszugeben.

Die _Auszahlungsberechtigungen_ des Validators verweisen weiterhin auf eine Adresse, die du kontrollierst. Belohnungen und ausgetretene Gelder können immer nur dorthin fließen (siehe den Abschnitt zum Vertrauensmodell unten).

### Verwahrende Dienste und Börsen-Staking {#custodial-services-and-exchange-staking}

Am vollständig delegierten Ende des Spektrums befindet sich das verwahrende Staking, das am häufigsten von zentralisierten Börsen angeboten wird. Du gehst überhaupt nicht mit Schlüsseln um; du hältst einfach ETH auf deinem Plattform-Konto und entscheidest dich für das Staking. Dies ist die einfachstmögliche Benutzererfahrung und eine legitime Option für Personen, die bereits Gelder an einer Börse aufbewahren und das Verwahrungsrisiko akzeptieren.

Es erfordert auch das meiste Vertrauen. Der Anbieter kontrolliert sowohl die Signierschlüssel als auch die Auszahlungsberechtigungen; was du hältst, ist ein Guthaben auf seiner Plattform, kein Validator. Das bedeutet:

- Deine gestakten ETH sind der Solvenz, Sicherheit und regulatorischen Situation des Anbieters ausgesetzt, und Abhebungen unterliegen dessen Bedingungen und Bearbeitungszeiten, nicht nur den Regeln des Ethereum-Protokolls.
- Du hast keine unabhängige Möglichkeit, den Validator zu verlassen (Austritt) oder Gelder zurückzuerhalten, wenn der Anbieter ausfällt oder Abhebungen einfriert.
- Große Mengen an ETH, die bei einer Handvoll von Börsenbetreibern gestakt werden, tragen zur Zentralisierung des Stakes bei, und die Client-Auswahl dieser Betreiber wirkt sich auf die Gesundheit des Netzwerks aus. Staking auf eine Weise, die mehr Kontrolle in deinen Händen belässt, oder die Wahl von Anbietern, die nachweislich Minderheits-Clients ausführen, trägt mehr zur Widerstandsfähigkeit von Ethereum bei.

## Vertrauensmodell: Was zu bewerten ist {#trust-model-what-to-evaluate}

Delegiertes Staking bedeutet immer, jemand anderem einen Teil deines Staking-Setups anzuvertrauen. Beantworte diese Fragen, bevor du etwas übergibst:

- **Wer hält die Abhebungsschlüssel?** Die Auszahlungsberechtigungen eines Validators (Typ 0x01 oder 0x02) verweisen auf eine Adresse der Ausführungsschicht, die letztendlich den Stake kontrolliert. Wenn diese Adresse dir gehört, ist die Vereinbarung nicht-verwahrend; der Betreiber kann den Validator betreiben (oder schlecht verwalten), aber die ETH können immer nur an dich abgehoben werden. Wenn die Berechtigungen auf die Adresse des Anbieters verweisen, hältst du ein Versprechen, keinen Stake.
- **Kannst du ohne den Betreiber austreten?** Seit dem [Pectra-Upgrade](/roadmap/pectra/) ermöglichen [durch die Ausführungsschicht ausgelöste Abhebungen (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) der Abhebungsadresse, einen Validator-Austritt (oder bei aufzinsenden 0x02-Validatoren eine teilweise Abhebung des Guthabens über 32 ETH) direkt von der Ausführungsschicht auszulösen, ohne die Signierschlüssel. Es erfordert eine Transaktion und kostet Gas, bedeutet aber, dass ein nicht reagierender oder defekter Betreiber deinen Validator nicht mehr als Geisel halten kann, vorausgesetzt, die Auszahlungsberechtigungen gehören dir.
- **Wie ist die Gebührenstruktur?** Dienste berechnen eine monatliche Pauschalgebühr oder einen Prozentsatz der Belohnungen. Prüfe, wie Gebühren mit Ausfallzeiten und Strafen interagieren: Wer trägt die Kosten, wenn der Betreiber schlechte Leistung erbringt, und ob Garantien oder Versicherungen angeboten werden.
- **Welche Clients führt der Betreiber aus?** Ein Betreiber, der mehrheitlich [Ausführungs- oder Konsens-Clients](/developers/docs/nodes-and-clients/client-diversity/) ausführt, setzt sowohl deinen Stake als auch das Netzwerk einem korrelierten Ausfall aus, wenn dieser Client einen Fehler aufweist. Bevorzuge Anbieter, die die Nutzung von Minderheits-Clients dokumentieren.
- **Ist der Dienst offen und geprüft?** Anbieter können zusätzliche Software um die Standard-Ethereum-Clients herum ausführen, die nicht Open Source oder überprüfbar ist. Achte auf öffentliche Audits, eine etablierte Betriebsgeschichte und eine saubere Slashing-Historie.
- **Was passiert, wenn der Anbieter verschwindet?** Ein verantwortungsvoller Anbieter dokumentiert seinen Offboarding-Prozess und bietet klare Anweisungen, wie du deinen Validator verlässt (Austritt), deine Schlüssel wiederherstellst oder selbst einen Austritt auslöst. Wenn die Antwort vollständig davon abhängt, dass der Anbieter im Geschäft bleibt, handelt es sich um eine verwahrende Vereinbarung.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Einige Anbieter können deinen Validator mithilfe der Verteilten Validator-Technologie (DVT) betreiben**, wobei der Signierschlüssel auf mehrere Knoten aufgeteilt wird, sodass keine einzelne Maschine oder kein einzelner Betreiber ein Single Point of Failure ist. [Mehr über die Verteilte Validator-Technologie (DVT)](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Was zu beachten ist {#what-to-consider}

Es gibt eine wachsende Anzahl von Anbietern, die dir helfen, den Betrieb deines Validators zu delegieren, aber sie alle haben ihre eigenen Vorteile und Risiken. Alle delegierten Optionen erfordern im Vergleich zum Solo Staking zusätzliche Vertrauensannahmen. Delegierte Optionen können zusätzlichen Code enthalten, der die Ethereum-Clients umhüllt und nicht offen oder überprüfbar ist. Die Delegation hat auch nachteilige Auswirkungen auf die Dezentralisierung des Netzwerks. Je nach Setup kontrollierst du deinen Validator möglicherweise nicht, und der Betreiber könnte unehrlich handeln, indem er deine ETH verwendet.

Attributindikatoren werden unten verwendet, um bemerkenswerte Stärken oder Schwächen zu signalisieren, die ein gelisteter Anbieter haben könnte. Verwende diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während du einen Staking-Dienst auswählst.

<StakingConsiderations page="saas" />

## Entdecke Anbieter von Staking-Diensten {#saas-providers}

Nachfolgend findest du einige verfügbare Staking-as-a-Service-Anbieter. Verwende die obigen Indikatoren, um dich durch diese Dienste zu führen.

<ProductDisclaimer />

### SaaS-Anbieter {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Bitte beachte die Wichtigkeit der Unterstützung der [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/), da sie die Sicherheit des Netzwerks verbessert und dein Risiko begrenzt. Dienste, die nachweislich die Nutzung von Mehrheits-Clients einschränken, sind mit <em style={{ textTransform: "uppercase" }}>"Ausführungsclient-Diversität"</em> und <em style={{ textTransform: "uppercase" }}>"Konsens-Client-Diversität"</em> gekennzeichnet.

### Schlüsselgeneratoren {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Hast du einen Vorschlag für einen Staking-as-a-Service-Anbieter, den wir übersehen haben? Sieh dir unsere [Richtlinie für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob er gut passen würde, und um ihn zur Überprüfung einzureichen.

<StakingCommunityCallout className="my-16" />

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wer verwahrt meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter. Bei nicht-verwahrenden Diensten wirst du durch die Generierung der Signierschlüssel für deinen Validator geführt (jeder Validator hält 32 ETH oder bis zu 2048 ETH mit aufzinsenden (0x02) Berechtigungen seit dem Pectra-Upgrade) und lädst diese bei deinem Anbieter hoch, damit dieser in deinem Namen validieren kann. Die Signierschlüssel allein geben keine Möglichkeit, deine Gelder abzuheben, zu transferieren oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für den Konsens abzugeben, was bei unsachgemäßer Durchführung zu Offline-Strafen oder Slashing führen kann.

Bei verwahrenden Diensten, wie dem Staking über eine zentralisierte Börse, hält der Anbieter alle Schlüssel: die Signierschlüssel und die Auszahlungsberechtigungen. In diesem Fall vertraust du dem Anbieter die Gelder selbst an, nicht nur den Validator-Betrieb.
</ExpandableCard>

<ExpandableCard title="Es gibt also zwei Schlüsselsätze?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jeder Validator hat _Signierschlüssel_ und separate _Auszahlungsberechtigungen_. Damit ein Validator den Zustand der Chain bezeugen, an Sync-Komitees teilnehmen und Blöcke vorschlagen kann, müssen die Signierschlüssel für einen Validator-Client leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und gelten daher von Natur aus als "Hot"-Schlüssel. Die Schlüssel, die abgehobene Gelder kontrollieren, werden aus Sicherheitsgründen separat aufbewahrt.

Die Auszahlungsberechtigungen bezeichnen die Adresse der Ausführungsschicht, an die Staking-Belohnungen und ausgetretene Gelder gehen. Moderne Einzahlungstools ermöglichen es dir, diese Adresse zum Zeitpunkt der Einzahlung entweder als reguläre (0x01) oder aufzinsende (0x02) Berechtigung festzulegen, und es sollte eine Adresse sein, die du kontrollierst, idealerweise gesichert in Cold Storage. Dies schützt deine Gelder, selbst wenn jemand anderes deine Validator-Signierschlüssel kontrolliert, und seit dem Pectra-Upgrade ermöglicht es dir auch, den Validator direkt von dieser Adresse aus zu verlassen (Austritt).

Validatoren, die in den frühen Tagen des Netzwerks ohne eine Ausführungs-Abhebungsadresse eingerichtet wurden, verwenden veraltete BLS-Abhebungsschlüssel und müssen eine einmalige Nachricht signieren, in der eine Abhebungsadresse deklariert wird, bevor Abhebungen beginnen können. Dies beinhaltet die Neugenerierung der Abhebungsschlüssel aus der mnemonischen Seed-Phrase, die bei der Einrichtung erstellt wurde.

**Stelle sicher, dass du diese Seed-Phrase sicher sicherst, da du sonst nicht in der Lage sein wirst, deine Abhebungsschlüssel zu generieren, wenn die Zeit gekommen ist.**

Wende dich an deinen Anbieter, um Unterstützung bei der Vorbereitung deines Validators zu erhalten.
</ExpandableCard>

<ExpandableCard title="Wann kann ich abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Wie Abhebungen funktionieren, hängt vom Typ der Auszahlungsberechtigung deines Validators ab. Bei regulären (0x01) Validatoren wird jedes Guthaben über 32 ETH automatisch in regelmäßigen Abständen alle paar Tage an die Abhebungsadresse überwiesen. Bei aufzinsenden (0x02) Validatoren werden Belohnungen bis zu 2048 ETH in das Guthaben des Validators aufgezinst, und eine Abhebung darunter erfordert die Auslösung einer teilweisen Abhebung von deiner Abhebungsadresse, was Gas kostet.

Validatoren können auch vollständig austreten, wodurch das gesamte verbleibende ETH-Guthaben freigeschaltet wird. Nach Abschluss des Austrittsprozesses wird das gesamte Guthaben während eines nachfolgenden Validator-Sweeps an die Abhebungsadresse transferiert.

<ButtonLink href="/staking/withdrawals/">Mehr über Staking-Abhebungen</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Was ist, wenn mein Anbieter verschwindet oder keinen Exit für meinen Validator durchführt?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Wenn deine Auszahlungsberechtigungen auf eine Adresse verweisen, die du kontrollierst, kannst du den Validator selbst verlassen (Austritt) und deinen Stake zurückerhalten; siehe [Vertrauensmodell: Was zu bewerten ist](#trust-model-what-to-evaluate).

Wenn der Anbieter die Auszahlungsberechtigungen hält (wie beim verwahrenden und Börsen-Staking), gibt es für dich keine Möglichkeit auf Protokollebene, die Gelder unabhängig zurückzuerhalten; dein Rückgriff ist auf die eigenen Prozesse des Anbieters beschränkt.
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslasht werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines delegierten Staking-Anbieters vertraust du den Betrieb deines Knotens jemand anderem an. Dies birgt das Risiko einer schlechten Knotenleistung, die nicht in deiner Kontrolle liegt. Für den Fall, dass dein Validator geslasht wird (Slashing), wird eine anfängliche Strafe proportional zum Guthaben deines Validators verhängt (die im Pectra-Upgrade deutlich verkleinert wurde), und dein Validator wird zwangsweise aus dem Validator-Set entfernt (Austritt).

Nach Abschluss des Slashing-/Austrittsprozesses werden die verbleibenden Gelder an die dem Validator zugewiesene Abhebungsadresse transferiert.

Kontaktiere einzelne Anbieter für weitere Details zu Garantien oder Versicherungsoptionen. Wenn du es vorziehst, die volle Kontrolle über dein Validator-Setup zu haben, [erfahre mehr darüber, wie du deine ETH im Solo Staking staken kannst](/staking/solo/).
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Was ist Staking as a Service?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) - _Eridian und Spacesider_
- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Durch die Ausführungsschicht auslösbare Abhebungen](https://eips.ethereum.org/EIPS/eip-7002) - _die Spezifikation für den Austritt eines Validators von seiner Abhebungsadresse_