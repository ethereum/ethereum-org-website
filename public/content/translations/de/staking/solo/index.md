---
title: Home-Staking Ihrer ETH
description: "Ein Überblick darüber, wie Sie mit dem Home-Staking Ihrer ETH beginnen können"
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie das Nashorn auf ihrem eigenen Computerchip.
sidebarDepth: 2
summaryPoints:
  - Erhalten Sie maximale Belohnungen direkt vom Protokoll, wenn Sie Ihren Validator ordnungsgemäß funktionieren lassen und online halten
  - Betreiben Sie Hardware zu Hause und tragen Sie persönlich zur Sicherheit und Dezentralisierung des Ethereum-Netzwerks bei
  - Beseitigen Sie die Notwendigkeit von Vertrauen und geben Sie niemals die Kontrolle über die Schlüssel zu Ihrem Guthaben auf
---

## Was ist Home-Staking? {#what-is-solo-staking}

Home-Staking ist der Vorgang, einen mit dem Internet verbundenen [Ethereum-Knoten zu betreiben](/run-a-node/) und 32 ETH einzuzahlen, um einen [Validator](#faq) zu aktivieren, was Ihnen die Möglichkeit gibt, direkt am Konsens des Netzwerks teilzunehmen.

**Home-Staking erhöht die Dezentralisierung des Ethereum-Netzwerks**, wodurch [Ethereum](/) zensurresistenter und robuster gegen Angriffe wird. Andere Staking-Methoden helfen dem Netzwerk möglicherweise nicht auf die gleiche Weise. Home-Staking ist die beste Staking-Option zur Sicherung von Ethereum.

Ein Ethereum-Knoten besteht sowohl aus einem Client der Ausführungsschicht (EL) als auch aus einem Client der Konsensschicht (CL). Diese Clients sind Software, die zusammen mit einem gültigen Satz von Signierschlüsseln zusammenarbeiten, um Transaktionen und Blöcke zu verifizieren, den korrekten Kopf der Chain zu bezeugen, Bezeugungen zu aggregieren und Blöcke vorzuschlagen.

Home-Staker sind für den Betrieb der Hardware verantwortlich, die zum Ausführen dieser Clients erforderlich ist. Es wird dringend empfohlen, dafür einen dedizierten Computer zu verwenden, den Sie von zu Hause aus betreiben – dies ist äußerst vorteilhaft für die Gesundheit des Netzwerks.

Ein Home-Staker erhält Belohnungen direkt vom Protokoll dafür, dass er seinen Validator ordnungsgemäß funktionieren lässt und online hält.

## Warum von zu Hause aus staken? {#why-stake-solo}

Home-Staking geht mit mehr Verantwortung einher, bietet Ihnen jedoch maximale Kontrolle über Ihr Guthaben und Ihr Staking-Setup.

<Grid>
  <Card title="Verdiene frische ETH" emoji="💸" description="Verdiene in ETH ausgezahlte Belohnungen direkt vom Protokoll, wenn dein Validator online ist, ohne dass Mittelsmänner einen Anteil einbehalten." />
  <Card title="Volle Kontrolle" emoji="🎛️" description="Behalte deine eigenen Schlüssel. Wähle die Kombination aus Clients und Hardware, die es dir ermöglicht, dein Risiko zu minimieren und am besten zur Gesundheit und Sicherheit des Netzwerks beizutragen. Staking-Dienste von Drittanbietern treffen diese Entscheidungen für dich und treffen nicht immer die sicherste Wahl." />
  <Card title="Netzwerksicherheit" emoji="🔐" description="Home-Staking ist die wirkungsvollste Art des Stakings. Indem du einen Validator auf deiner eigenen Hardware zu Hause betreibst, stärkst du die Robustheit, Dezentralisierung und Sicherheit des Ethereum-Protokolls." />
</Grid>

## Überlegungen vor dem Home-Staking {#considerations-before-staking-solo}

So sehr wir uns auch wünschen, dass Home-Staking für jeden zugänglich und risikofrei ist, entspricht dies nicht der Realität. Es gibt einige praktische und ernsthafte Überlegungen, die Sie beachten sollten, bevor Sie sich entscheiden, Ihre ETH von zu Hause aus zu staken.

<ExpandableCard title="Pflichtlektüre" eventCategory="SoloStaking" eventName="clicked required reading">
Wenn Sie Ihren eigenen Knoten betreiben, sollten Sie etwas Zeit investieren, um zu lernen, wie Sie die von Ihnen gewählte Software verwenden. Dies beinhaltet das Lesen relevanter Dokumentationen und das Verfolgen der Kommunikationskanäle dieser Entwicklerteams.

Je mehr Sie über die von Ihnen ausgeführte Software und die Funktionsweise von Proof-of-Stake (PoS) verstehen, desto weniger riskant ist es für Sie als Staker und desto einfacher wird es sein, als Knotenbetreiber eventuell auftretende Probleme zu beheben.
</ExpandableCard>

<ExpandableCard title="Sicherer Umgang mit Computern" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Die Einrichtung eines Knotens erfordert ein gewisses Maß an Vertrautheit im Umgang mit Computern, obwohl neue Tools dies im Laufe der Zeit erleichtern. Ein Verständnis der Befehlszeilenschnittstelle ist hilfreich, aber nicht mehr zwingend erforderlich.

Es erfordert auch eine sehr grundlegende Hardware-Einrichtung und ein gewisses Verständnis der empfohlenen Mindestspezifikationen.
</ExpandableCard>

<ExpandableCard title="Sichere Schlüsselverwaltung" eventCategory="SoloStaking" eventName="clicked secure key management">
Genauso wie private Schlüssel Ihre Ethereum-Adresse sichern, müssen Sie Schlüssel speziell für Ihren Validator generieren. Sie müssen verstehen, wie Sie Seed-Phrasen oder private Schlüssel sicher aufbewahren.{' '}

[Ethereum-Sicherheit und Betrugsprävention](/security/)
</ExpandableCard>

<ExpandableCard title="Wartung" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware fällt gelegentlich aus, Netzwerkverbindungen weisen Fehler auf und Client-Software muss gelegentlich aktualisiert werden. Die Wartung von Knoten ist unvermeidlich und erfordert gelegentlich Ihre Aufmerksamkeit. Sie sollten sicherstellen, dass Sie über erwartete Netzwerk-Upgrades oder andere kritische Client-Upgrades informiert bleiben.
</ExpandableCard>

<ExpandableCard title="Zuverlässige Betriebszeit" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ihre Belohnungen sind proportional zu der Zeit, in der Ihr Validator online ist und ordnungsgemäß bezeugt. Ausfallzeiten ziehen Strafen nach sich, die proportional dazu sind, wie viele andere Validatoren gleichzeitig offline sind, <a href="#faq">führen jedoch nicht zu Slashing</a>. Die Bandbreite ist ebenfalls wichtig, da die Belohnungen für Bezeugungen, die nicht rechtzeitig eingehen, verringert werden. Die Anforderungen variieren, aber ein Minimum von 10 Mbit/s im Up- und Download wird empfohlen.
</ExpandableCard>

<ExpandableCard title="Slashing-Risiko" eventCategory="SoloStaking" eventName="clicked slashing risk">
Im Gegensatz zu Inaktivitätsstrafen für das Offline-Sein ist <em>Slashing</em> eine viel schwerwiegendere Strafe, die für böswillige Vergehen reserviert ist. Indem Sie einen Minderheits-Client ausführen und Ihre Schlüssel immer nur auf einem Computer gleichzeitig geladen haben, wird Ihr Risiko, geslasht zu werden, minimiert. Dennoch müssen sich alle Staker der Risiken von Slashing bewusst sein.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mehr über Slashing und den Validator-Lebenszyklus</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Wie es funktioniert {#how-it-works}

<StakingHowSoloWorks />

Während Sie aktiv sind, verdienen Sie ETH-Belohnungen, die regelmäßig auf Ihre Abhebungsadresse eingezahlt werden.

Falls gewünscht, können Sie als Validator einen Austritt vollziehen, wodurch die Anforderung, online zu sein, entfällt und alle weiteren Belohnungen gestoppt werden. Ihr verbleibendes Guthaben wird dann auf die Abhebungsadresse abgehoben, die Sie bei der Einrichtung angegeben haben.

[Mehr zu Staking-Abhebungen](/staking/withdrawals/)

## Legen Sie auf dem Staking Launchpad los {#get-started-on-the-staking-launchpad}

Das Staking Launchpad ist eine Open-Source-Anwendung, die Ihnen hilft, ein Staker zu werden. Es führt Sie durch die Auswahl Ihrer Clients, generiert Ihre Schlüssel und zahlt Ihre ETH in den Staking-Einlage-Vertrag ein. Es wird eine Checkliste bereitgestellt, um sicherzustellen, dass Sie alles abgedeckt haben, um Ihren Validator sicher einzurichten.

<StakingLaunchpadWidget />

## Was bei Tools zur Knoten- und Client-Einrichtung zu beachten ist {#node-tool-considerations}

Es gibt eine wachsende Anzahl von Tools und Diensten, die Ihnen beim Home-Staking Ihrer ETH helfen, aber jedes bringt unterschiedliche Risiken und Vorteile mit sich.

Im Folgenden werden Attributindikatoren verwendet, um bemerkenswerte Stärken oder Schwächen eines aufgelisteten Staking-Tools zu signalisieren. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie auswählen, welche Tools Sie auf Ihrer Staking-Reise unterstützen sollen.

<StakingConsiderations page="solo" />

## Entdecken Sie Tools zur Knoten- und Client-Einrichtung {#node-and-client-tools}

Es stehen verschiedene Optionen zur Verfügung, die Ihnen bei der Einrichtung helfen. Verwenden Sie die obigen Indikatoren als Orientierungshilfe für die unten stehenden Tools.

<ProductDisclaimer />

### Knoten-Tools {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Bitte beachten Sie, wie wichtig es ist, einen [Minderheits-Client](/developers/docs/nodes-and-clients/client-diversity/) zu wählen, da dies die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Tools, mit denen Sie einen Minderheits-Client einrichten können, sind als <em style={{ textTransform: "uppercase" }}>„Multi-Client“</em> gekennzeichnet.

### Schlüsselgeneratoren {#key-generators}

Diese Tools können als Alternative zur [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) verwendet werden, um bei der Schlüsselgenerierung zu helfen.

<StakingProductsCardGrid category="keyGen" />

Haben Sie einen Vorschlag für ein Staking-Tool, das wir übersehen haben? Sehen Sie sich unsere [Richtlinie für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob es gut passen würde, und um es zur Überprüfung einzureichen.

## Entdecken Sie Leitfäden zum Home-Staking {#staking-guides}

<StakingGuides />

## Häufig gestellte Fragen {#faq}

Dies sind einige der häufigsten Fragen zum Staking, über die es sich lohnt, Bescheid zu wissen.

<ExpandableCard title="Was ist ein Validator?">

Ein <em>Validator</em> ist eine virtuelle Entität, die auf Ethereum existiert und am Konsens des Ethereum-Protokolls teilnimmt. Validatoren werden durch ein Guthaben, einen öffentlichen Schlüssel und andere Eigenschaften repräsentiert. Ein <em>Validator-Client</em> ist die Software, die im Namen des Validators handelt, indem sie dessen privaten Schlüssel hält und verwendet. Ein einzelner Validator-Client kann viele Schlüsselpaare halten und somit viele Validatoren steuern.

</ExpandableCard>

<ExpandableCard title="Kann ich mehr als 32 ETH einzahlen?">
Ja, moderne Validator-Konten können bis zu 2048 ETH halten. Zusätzliche ETH über 32 hinaus werden schrittweise verzinst und steigen in ganzzahligen Schritten, wenn Ihr tatsächliches Guthaben wächst. Dies wird als Ihr <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effektives Guthaben</a> bezeichnet.

Um das effektive Guthaben eines Kontos zu erhöhen und damit die Belohnungen zu steigern, muss ein Puffer von 0,25 ETH über einem vollen ETH-Schwellenwert überschritten werden. Beispielsweise müsste ein Konto mit einem tatsächlichen Guthaben von 32,9 und einem effektiven Guthaben von 32 weitere 0,35 ETH verdienen, um sein tatsächliches Guthaben auf über 33,25 zu bringen, bevor eine Erhöhung des effektiven Guthabens ausgelöst wird.

Dieser Puffer verhindert auch, dass ein effektives Guthaben sinkt, bis es 0,25 ETH unter sein aktuelles effektives Guthaben gefallen ist.

Jedes mit einem Validator verknüpfte Schlüsselpaar erfordert mindestens 32 ETH, um aktiviert zu werden. Jedes darüber hinausgehende Guthaben kann jederzeit über eine von dieser Adresse signierte Transaktion auf die zugehörige Abhebungsadresse abgehoben werden. Alle Gelder, die das maximale effektive Guthaben überschreiten, werden automatisch in regelmäßigen Abständen abgehoben.

Wenn Ihnen Home-Staking zu anspruchsvoll erscheint, ziehen Sie die Nutzung eines [Staking-as-a-Service](/staking/saas/)-Anbieters in Betracht, oder wenn Sie mit weniger als 32 ETH arbeiten, sehen Sie sich die [Staking-Pools](/staking/pools/) an.
</ExpandableCard>

<ExpandableCard title="Werde ich geslasht, wenn ich offline gehe? (tldr: Nein.)">
Offline zu gehen, wenn das Netzwerk ordnungsgemäß endgültig wird (finalisiert), führt NICHT zu Slashing. Kleine <em>Inaktivitätsstrafen</em> fallen an, wenn Ihr Validator für eine bestimmte Epoche (jeweils 6,4 Minuten lang) nicht zur Bezeugung verfügbar ist, aber dies unterscheidet sich stark von <em>Slashing</em>. Diese Strafen sind etwas geringer als die Belohnung, die Sie verdient hätten, wenn der Validator zur Bezeugung verfügbar gewesen wäre, und Verluste können mit ungefähr der gleichen Zeit, die Sie wieder online sind, wieder hereingeholt werden.

Beachten Sie, dass Strafen für Inaktivität proportional dazu sind, wie viele Validatoren gleichzeitig offline sind. In Fällen, in denen ein großer Teil des Netzwerks auf einmal offline ist, sind die Strafen für jeden dieser Validatoren höher, als wenn ein einzelner Validator nicht verfügbar ist.

In extremen Fällen, wenn das Netzwerk nicht mehr endgültig wird, weil mehr als ein Drittel der Validatoren offline ist, erleiden diese Benutzer ein sogenanntes <em>quadratisches Inaktivitätsleck</em>, was einen exponentiellen Abfluss von ETH von Offline-Validator-Konten bedeutet. Dies ermöglicht es dem Netzwerk, sich schließlich selbst zu heilen, indem die ETH inaktiver Validatoren verbrannt werden, bis ihr Guthaben 16 ETH erreicht. Zu diesem Zeitpunkt werden sie automatisch aus dem Validator-Pool ausgeworfen. Die verbleibenden Online-Validatoren werden schließlich wieder über 2/3 des Netzwerks ausmachen und die Supermehrheit erfüllen, die erforderlich ist, um die Chain wieder endgültig zu machen.
</ExpandableCard>

<ExpandableCard title="Wie stelle ich sicher, dass ich nicht geslasht werde?">
Kurz gesagt, dies kann nie vollständig garantiert werden, aber wenn Sie in gutem Glauben handeln, einen Minderheits-Client ausführen und Ihre Signierschlüssel immer nur auf einem Computer aufbewahren, ist das Risiko, geslasht zu werden, nahezu null.

Es gibt nur wenige spezifische Wege, die dazu führen können, dass ein Validator geslasht und aus dem Netzwerk ausgeworfen wird. Zum Zeitpunkt des Schreibens waren die aufgetretenen Slashings ausschließlich das Ergebnis redundanter Hardware-Setups, bei denen Signierschlüssel auf zwei separaten Computern gleichzeitig gespeichert wurden. Dies kann versehentlich zu einer <em>doppelten Stimme (Double Vote)</em> von Ihren Schlüsseln führen, was ein Vergehen ist, das mit Slashing bestraft wird.

Die Ausführung eines Supermehrheits-Clients (jeder Client, der von über 2/3 des Netzwerks verwendet wird) birgt ebenfalls das Risiko eines potenziellen Slashings, falls dieser Client einen Fehler aufweist, der zu einem Chain-Fork führt. Dies kann zu einem fehlerhaften Fork führen, der endgültig wird. Um zur beabsichtigten Chain zurückzukehren, müsste eine <em>umschließende Stimme (Surround Vote)</em> abgegeben werden, indem versucht wird, einen endgültigen Block rückgängig zu machen. Dies ist ebenfalls ein Vergehen, das mit Slashing bestraft wird, und kann einfach vermieden werden, indem stattdessen ein Minderheits-Client ausgeführt wird.

Äquivalente Fehler in einem <em>Minderheits-Client würden niemals endgültig werden</em> und somit niemals zu einer umschließenden Stimme führen, sondern lediglich zu Inaktivitätsstrafen, <em>nicht zu Slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Erfahren Sie mehr über die Wichtigkeit der Ausführung eines Minderheits-Clients.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Erfahren Sie mehr über die Vermeidung von Slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Welcher Client ist der beste?">
Einzelne Clients können in Bezug auf Leistung und Benutzeroberfläche leicht variieren, da jeder von verschiedenen Teams unter Verwendung einer Vielzahl von Programmiersprachen entwickelt wird. Davon abgesehen ist keiner von ihnen der „Beste“. Alle Produktions-Clients sind hervorragende Software, die alle die gleichen Kernfunktionen ausführen, um sich mit der Blockchain zu synchronisieren und mit ihr zu interagieren.

Da alle Produktions-Clients die gleiche grundlegende Funktionalität bieten, ist es tatsächlich sehr wichtig, dass Sie einen <strong>Minderheits-Client</strong> wählen, d. h. jeden Client, der derzeit NICHT von einer Mehrheit der Validatoren im Netzwerk verwendet wird. Dies mag kontraintuitiv klingen, aber die Ausführung eines Mehrheits- oder Supermehrheits-Clients setzt Sie im Falle eines Fehlers in diesem Client einem erhöhten Risiko von Slashing aus. Die Ausführung eines Minderheits-Clients schränkt diese Risiken drastisch ein.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Erfahren Sie mehr darüber, warum Client-Diversität entscheidend ist</a>
</ExpandableCard>

<ExpandableCard title="Kann ich einfach einen VPS (Virtual Private Server) verwenden?">
Obwohl ein Virtual Private Server (VPS) als Ersatz für Heim-Hardware verwendet werden kann, <em>spielt</em> der physische Zugriff und der Standort Ihres Validator-Clients <em>eine Rolle</em>. Zentralisierte Cloud-Lösungen wie Amazon Web Services oder Digital Ocean bieten den Komfort, keine Hardware beschaffen und betreiben zu müssen, auf Kosten der Zentralisierung des Netzwerks.

Je mehr Validator-Clients auf einer einzigen zentralisierten Cloud-Speicherlösung ausgeführt werden, desto gefährlicher wird es für diese Benutzer. Jedes Ereignis, das diese Anbieter offline nimmt, sei es durch einen Angriff, behördliche Anforderungen oder einfach nur Strom-/Internetausfälle, führt dazu, dass jeder Validator-Client, der auf diesen Server angewiesen ist, gleichzeitig offline geht.

Offline-Strafen sind proportional dazu, wie viele andere gleichzeitig offline sind. Die Verwendung eines VPS erhöht das Risiko erheblich, dass Offline-Strafen schwerwiegender ausfallen, und erhöht Ihr Risiko eines quadratischen Lecks oder Slashings, falls der Ausfall groß genug ist. Um Ihr eigenes Risiko und das Risiko für das Netzwerk zu minimieren, wird Benutzern dringend empfohlen, ihre eigene Hardware zu beschaffen und zu betreiben.
</ExpandableCard>

<ExpandableCard title="Wie schalte ich meine Belohnungen frei oder bekomme meine ETH zurück?">

Für Abhebungen jeglicher Art von der Beacon Chain müssen Auszahlungsberechtigungen festgelegt werden.

Neue Staker legen dies zum Zeitpunkt der Schlüsselgenerierung und Einzahlung fest. Bestehende Staker, die dies noch nicht festgelegt haben, können ihre Schlüssel aktualisieren, um diese Funktionalität zu unterstützen.

Sobald Auszahlungsberechtigungen festgelegt sind, werden Belohnungszahlungen (angesammelte ETH über die anfänglichen 32 hinaus) automatisch in regelmäßigen Abständen an die Abhebungsadresse verteilt.

Um Ihr gesamtes Guthaben freizuschalten und zurückzuerhalten, müssen Sie auch den Prozess des Austritts Ihres Validators abschließen.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Abhebungen</ButtonLink>
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) - _Eridian und Spacesider_
- [Ethereums Problem mit der Client-Diversität](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Unterstützung der Client-Diversität](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client-Diversität auf der Konsensschicht von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Anleitung: Kauf von Ethereum-Validator-Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Tipps zur Vermeidung von Eth2-Slashing](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />