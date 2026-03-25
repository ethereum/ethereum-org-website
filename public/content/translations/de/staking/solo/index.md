---
title: ETH von zu Hause aus staken (Home Staking)
description: "Ein Überblick darüber, wie Sie mit dem Staking Ihrer ETH von zu Hause aus beginnen können"
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie das Nashorn auf ihrem eigenen Computerchip.
sidebarDepth: 2
summaryPoints:
  - Erhalten Sie maximale Belohnungen direkt vom Protokoll, indem Sie Ihren Validator ordnungsgemäß funktionieren lassen und online halten
  - Betreiben Sie Hardware zu Hause und tragen Sie persönlich zur Sicherheit und Dezentralisierung des Ethereum-Netzwerks bei
  - Beseitigen Sie Vertrauensabhängigkeiten und geben Sie niemals die Kontrolle über die Schlüssel zu Ihren Geldern ab
---

## Was ist Home Staking? {#what-is-solo-staking}

Home Staking ist der Vorgang, [einen Ethereum-Blockchain-Knoten auszuführen](/run-a-node/), der mit dem Internet verbunden ist, und 32 ETH einzuzahlen, um einen [Validator](#faq) zu aktivieren. Dies gibt Ihnen die Möglichkeit, direkt am Konsens des Netzwerks teilzunehmen.

**Home Staking erhöht die Dezentralisierung des Ethereum-Netzwerks**, was [Ethereum](/) zensurresistenter und robuster gegen Angriffe macht. Andere Staking-Methoden helfen dem Netzwerk möglicherweise nicht auf die gleiche Weise. Home Staking ist die beste Staking-Option zur Sicherung von Ethereum.

Ein Ethereum-Blockchain-Knoten besteht sowohl aus einem Client der Ausführungsebene (EL) als auch aus einem Client der Konsensebene (CL). Diese Clients sind Software, die zusammen mit einem gültigen Satz von Signaturschlüsseln arbeiten, um Transaktionen und Blöcke zu verifizieren, den korrekten Kopf der Chain zu bestätigen, Bestätigungen zu aggregieren und Blöcke vorzuschlagen.

Home-Staker sind für den Betrieb der Hardware verantwortlich, die zur Ausführung dieser Clients benötigt wird. Es wird dringend empfohlen, dafür einen dedizierten Computer zu verwenden, den Sie von zu Hause aus betreiben – dies ist äußerst vorteilhaft für die Gesundheit des Netzwerks.

Ein Home-Staker erhält Belohnungen direkt vom Protokoll, wenn er seinen Validator ordnungsgemäß funktionieren lässt und online hält.

## Warum von zu Hause aus staken? {#why-stake-solo}

Home Staking geht mit mehr Verantwortung einher, bietet Ihnen jedoch maximale Kontrolle über Ihre Gelder und Ihr Staking-Setup.

<CardGrid>
  <Card title="Verdienen Sie neue ETH" emoji="💸" description="Verdienen Sie in ETH denominierte Belohnungen direkt vom Protokoll, wenn Ihr Validator online ist, ohne dass Zwischenhändler einen Anteil nehmen." />
  <Card title="Volle Kontrolle" emoji="🎛️" description="Behalten Sie Ihre eigenen Schlüssel. Wählen Sie die Kombination aus Clients und Hardware, die es Ihnen ermöglicht, Ihr Risiko zu minimieren und am besten zur Gesundheit und Sicherheit des Netzwerks beizutragen. Staking-Dienste von Drittanbietern treffen diese Entscheidungen für Sie und nicht immer die sichersten." />
  <Card title="Netzwerksicherheit" emoji="🔐" description="Home-Staking ist die wirkungsvollste Art zu staken. Indem Sie einen Validator auf Ihrer eigenen Hardware zu Hause betreiben, stärken Sie die Robustheit, Dezentralisierung und Sicherheit des Ethereum-Protokolls." />
</CardGrid>

## Überlegungen vor dem Home Staking {#considerations-before-staking-solo}

So sehr wir uns auch wünschen, dass Home Staking für jeden zugänglich und risikofrei ist, entspricht dies nicht der Realität. Es gibt einige praktische und ernsthafte Überlegungen, die Sie beachten sollten, bevor Sie sich entscheiden, Ihre ETH von zu Hause aus zu staken.

<InfoGrid>
<ExpandableCard title="Pflichtlektüre" eventCategory="SoloStaking" eventName="clicked required reading">
Wenn Sie Ihren eigenen Blockchain-Knoten betreiben, sollten Sie einige Zeit darauf verwenden, zu lernen, wie Sie die von Ihnen gewählte Software verwenden. Dies beinhaltet das Lesen relevanter Dokumentationen und die Aufmerksamkeit für die Kommunikationskanäle dieser Entwicklerteams.

Je mehr Sie über die von Ihnen ausgeführte Software und die Funktionsweise von Proof-of-Stake verstehen, desto weniger riskant ist es für Sie als Staker und desto einfacher wird es sein, als Betreiber eines Blockchain-Knotens eventuell auftretende Probleme zu beheben.
</ExpandableCard>

<ExpandableCard title="Vertrautheit mit Computern" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Die Einrichtung eines Blockchain-Knotens erfordert ein gewisses Maß an Vertrautheit im Umgang mit Computern, obwohl neue Tools dies im Laufe der Zeit erleichtern. Ein Verständnis der Befehlszeilenschnittstelle ist hilfreich, aber nicht mehr zwingend erforderlich.

Es erfordert auch eine sehr grundlegende Hardware-Einrichtung und ein gewisses Verständnis der empfohlenen Mindestspezifikationen.
</ExpandableCard>

<ExpandableCard title="Sichere Schlüsselverwaltung" eventCategory="SoloStaking" eventName="clicked secure key management">
Genauso wie Private-Keys Ihre Ethereum-Adresse sichern, müssen Sie Schlüssel speziell für Ihren Validator generieren. Sie müssen verstehen, wie Sie Seed-Phrasen oder Private-Keys sicher aufbewahren.{' '}

[Ethereum-Sicherheit und Betrugsprävention](/security/)
</ExpandableCard>

<ExpandableCard title="Wartung" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware fällt gelegentlich aus, Netzwerkverbindungen weisen Fehler auf und Client-Software muss gelegentlich aktualisiert werden. Die Wartung von Blockchain-Knoten ist unvermeidlich und erfordert gelegentlich Ihre Aufmerksamkeit. Sie sollten sicherstellen, dass Sie über erwartete Netzwerk-Upgrades oder andere kritische Client-Upgrades informiert bleiben.
</ExpandableCard>

<ExpandableCard title="Zuverlässige Betriebszeit" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ihre Belohnungen sind proportional zu der Zeit, in der Ihr Validator online ist und ordnungsgemäß Bestätigungen durchführt. Ausfallzeiten führen zu Strafen, die proportional dazu sind, wie viele andere Validatoren gleichzeitig offline sind, führen aber <a href="#faq">nicht zu Slashing</a>. Die Bandbreite ist ebenfalls wichtig, da die Belohnungen für Bestätigungen, die nicht rechtzeitig eingehen, verringert werden. Die Anforderungen variieren, aber ein Minimum von 10 Mb/s im Up- und Download wird empfohlen.
</ExpandableCard>

<ExpandableCard title="Slashing-Risiko" eventCategory="SoloStaking" eventName="clicked slashing risk">
Im Gegensatz zu Inaktivitätsstrafen für das Offline-Sein ist <em>Slashing</em> eine viel ernstere Strafe, die für böswillige Vergehen reserviert ist. Indem Sie einen Minderheits-Client ausführen und Ihre Schlüssel jeweils nur auf einem Computer geladen haben, wird Ihr Risiko, geslasht zu werden, minimiert. Dennoch müssen sich alle Staker der Risiken von Slashing bewusst sein.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mehr über Slashing und den Lebenszyklus von Validatoren</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Wie es funktioniert {#how-it-works}

<StakingHowSoloWorks />

Während Sie aktiv sind, verdienen Sie ETH-Belohnungen, die regelmäßig auf Ihre Auszahlungsadresse eingezahlt werden.

Falls gewünscht, können Sie als Validator aussteigen, was die Anforderung, online zu sein, aufhebt und alle weiteren Belohnungen stoppt. Ihr verbleibendes Guthaben wird dann auf die Auszahlungsadresse abgehoben, die Sie bei der Einrichtung angeben.

[Mehr zu Staking-Auszahlungen](/staking/withdrawals/)

## Legen Sie auf dem Staking Launchpad los {#get-started-on-the-staking-launchpad}

Das Staking Launchpad ist eine Open-Source-Anwendung, die Ihnen hilft, ein Staker zu werden. Es führt Sie durch die Auswahl Ihrer Clients, die Generierung Ihrer Schlüssel und die Einzahlung Ihrer ETH in den Einzahlungsvertrag für das Staking. Eine Checkliste wird bereitgestellt, um sicherzustellen, dass Sie alles abgedeckt haben, um Ihren Validator sicher einzurichten.

<StakingLaunchpadWidget />

## Was bei Tools zur Einrichtung von Blockchain-Knoten und Clients zu beachten ist {#node-tool-considerations}

Es gibt eine wachsende Anzahl von Tools und Diensten, die Ihnen helfen, Ihre ETH von zu Hause aus zu staken, aber jedes bringt unterschiedliche Risiken und Vorteile mit sich.

Im Folgenden werden Attributindikatoren verwendet, um bemerkenswerte Stärken oder Schwächen eines aufgelisteten Staking-Tools zu signalisieren. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie auswählen, welche Tools Ihnen bei Ihrer Staking-Reise helfen sollen.

<StakingConsiderations page="solo" />

## Entdecken Sie Tools zur Einrichtung von Blockchain-Knoten und Clients {#node-and-client-tools}

Es stehen verschiedene Optionen zur Verfügung, die Ihnen bei Ihrer Einrichtung helfen. Verwenden Sie die obigen Indikatoren, um sich durch die unten stehenden Tools führen zu lassen.

<ProductDisclaimer />

### Tools für Blockchain-Knoten

<StakingProductsCardGrid category="nodeTools" />

Bitte beachten Sie, wie wichtig die Auswahl eines [Minderheits-Clients](/developers/docs/nodes-and-clients/client-diversity/) ist, da dies die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Tools, mit denen Sie einen Minderheits-Client einrichten können, sind als <em style={{ textTransform: "uppercase" }}>"Multi-Client"</em> gekennzeichnet.

### Schlüsselgeneratoren

Diese Tools können als Alternative zum [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) verwendet werden, um bei der Schlüsselgenerierung zu helfen.

<StakingProductsCardGrid category="keyGen" />

Haben Sie einen Vorschlag für ein Staking-Tool, das wir übersehen haben? Sehen Sie sich unsere [Richtlinie für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob es gut passen würde, und reichen Sie es zur Überprüfung ein.

## Entdecken Sie Anleitungen zum Home Staking {#staking-guides}

<StakingGuides />

## Häufig gestellte Fragen {#faq}

Dies sind einige der häufigsten Fragen zum Staking, über die es sich lohnt, Bescheid zu wissen.

<ExpandableCard title="Was ist ein Validator?">

Ein <em>Validator</em> ist eine virtuelle Entität, die auf Ethereum existiert und am Konsens des Ethereum-Protokolls teilnimmt. Validatoren werden durch ein Guthaben, einen Public-Key und andere Eigenschaften repräsentiert. Ein <em>Validator-Client</em> ist die Software, die im Namen des Validators handelt, indem sie dessen Private-Key hält und verwendet. Ein einzelner Validator-Client kann viele Schlüsselpaare halten und somit viele Validatoren steuern.

</ExpandableCard>

<ExpandableCard title="Kann ich mehr als 32 ETH einzahlen?">
Ja, moderne Validator-Konten können bis zu 2048 ETH halten. Zusätzliche ETH über 32 hinaus werden schrittweise verzinst und steigen in ganzzahligen Schritten, wenn Ihr tatsächliches Guthaben wächst. Dies wird als Ihr <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effektives Guthaben (Effective Balance)</a> bezeichnet.

Um das effektive Guthaben eines Kontos und damit die Belohnungen zu erhöhen, muss ein Puffer von 0,25 ETH über einem vollen ETH-Schwellenwert überschritten werden. Beispielsweise müsste ein Konto mit einem tatsächlichen Guthaben von 32,9 und einem effektiven Guthaben von 32 weitere 0,35 ETH verdienen, um sein tatsächliches Guthaben auf über 33,25 zu bringen, bevor eine Erhöhung des effektiven Guthabens ausgelöst wird.

Dieser Puffer verhindert auch, dass ein effektives Guthaben sinkt, bis es 0,25 ETH unter sein aktuelles effektives Guthaben gefallen ist.

Jedes mit einem Validator verknüpfte Schlüsselpaar erfordert mindestens 32 ETH, um aktiviert zu werden. Jedes darüber hinausgehende Guthaben kann jederzeit über eine von dieser Adresse signierte Transaktion auf die zugehörige Auszahlungsadresse abgehoben werden. Alle Gelder über dem maximalen effektiven Guthaben werden automatisch in regelmäßigen Abständen abgehoben.

Wenn Ihnen Home Staking zu anspruchsvoll erscheint, ziehen Sie die Nutzung eines [Staking-as-a-Service](/staking/saas/)-Anbieters in Betracht, oder wenn Sie mit weniger als 32 ETH arbeiten, sehen Sie sich die [Staking-Pools](/staking/pools/) an.
</ExpandableCard>

<ExpandableCard title="Werde ich bei einer Offline-Zeit geslasht? (TL;DR: Nein.)">
Offline zu gehen, wenn das Netzwerk ordnungsgemäß finalisiert, führt NICHT zu Slashing. Es fallen kleine <em>Inaktivitätsstrafen</em> an, wenn Ihr Validator für eine bestimmte Epoche (jeweils 6,4 Minuten lang) nicht zur Bestätigung verfügbar ist, aber dies unterscheidet sich stark von <em>Slashing</em>. Diese Strafen sind etwas geringer als die Belohnung, die Sie verdient hätten, wenn der Validator zur Bestätigung verfügbar gewesen wäre, und Verluste können mit ungefähr der gleichen Zeit, die Sie wieder online sind, zurückverdient werden.

Beachten Sie, dass Strafen für Inaktivität proportional dazu sind, wie viele Validatoren gleichzeitig offline sind. In Fällen, in denen ein großer Teil des Netzwerks auf einmal offline ist, sind die Strafen für jeden dieser Validatoren höher, als wenn ein einzelner Validator nicht verfügbar ist.

In extremen Fällen, wenn das Netzwerk aufhört zu finalisieren, weil mehr als ein Drittel der Validatoren offline ist, erleiden diese Benutzer ein sogenanntes <em>quadratisches Inaktivitätsleck (Quadratic Inactivity Leak)</em>, was einen exponentiellen Abfluss von ETH von Offline-Validator-Konten bedeutet. Dies ermöglicht es dem Netzwerk, sich schließlich selbst zu heilen, indem die ETH inaktiver Validatoren verbrannt werden, bis ihr Guthaben 16 ETH erreicht. Zu diesem Zeitpunkt werden sie automatisch aus dem Validator-Pool ausgeworfen. Die verbleibenden Online-Validatoren werden schließlich wieder über 2/3 des Netzwerks ausmachen und die Supermehrheit erfüllen, die erforderlich ist, um die Chain wieder zu finalisieren.
</ExpandableCard>

<ExpandableCard title="Wie stelle ich sicher, dass ich nicht geslasht werde?">
Kurz gesagt, dies kann nie vollständig garantiert werden, aber wenn Sie in gutem Glauben handeln, einen Minderheits-Client ausführen und Ihre Signaturschlüssel immer nur auf einem Computer aufbewahren, ist das Risiko, geslasht zu werden, nahezu null.

Es gibt nur wenige spezifische Wege, die dazu führen können, dass ein Validator geslasht und aus dem Netzwerk ausgeworfen wird. Zum Zeitpunkt des Schreibens waren die aufgetretenen Slashings ausschließlich ein Produkt redundanter Hardware-Setups, bei denen Signaturschlüssel auf zwei separaten Computern gleichzeitig gespeichert wurden. Dies kann versehentlich zu einer <em>doppelten Abstimmung (Double Vote)</em> durch Ihre Schlüssel führen, was ein Vergehen ist, das mit Slashing bestraft wird.

Die Ausführung eines Supermehrheits-Clients (jeder Client, der von über 2/3 des Netzwerks verwendet wird) birgt ebenfalls das Risiko eines potenziellen Slashings, falls dieser Client einen Fehler aufweist, der zu einem Chain-Fork führt. Dies kann zu einem fehlerhaften Fork führen, der finalisiert wird. Um zur beabsichtigten Chain zurückzukehren, müsste eine <em>Surround-Abstimmung (Surround Vote)</em> eingereicht werden, indem versucht wird, einen finalisierten Block rückgängig zu machen. Dies ist ebenfalls ein Vergehen, das mit Slashing bestraft wird, und kann einfach vermieden werden, indem stattdessen ein Minderheits-Client ausgeführt wird.

Äquivalente Fehler in einem <em>Minderheits-Client würden niemals finalisieren</em> und somit niemals zu einer Surround-Abstimmung führen, sondern lediglich zu Inaktivitätsstrafen, <em>nicht zu Slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Erfahren Sie mehr über die Wichtigkeit der Ausführung eines Minderheits-Clients.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Erfahren Sie mehr über die Prävention von Slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Welcher Client ist der beste?">
Einzelne Clients können in Bezug auf Leistung und Benutzeroberfläche leicht variieren, da jeder von verschiedenen Teams unter Verwendung einer Vielzahl von Programmiersprachen entwickelt wird. Davon abgesehen ist keiner von ihnen der „beste“. Alle Produktions-Clients sind hervorragende Software, die alle die gleichen Kernfunktionen ausführen, um sich mit der Blockchain zu synchronisieren und mit ihr zu interagieren.

Da alle Produktions-Clients die gleiche grundlegende Funktionalität bieten, ist es tatsächlich sehr wichtig, dass Sie einen <strong>Minderheits-Client</strong> wählen, d. h. jeden Client, der derzeit NICHT von einer Mehrheit der Validatoren im Netzwerk verwendet wird. Dies mag kontraintuitiv klingen, aber die Ausführung eines Mehrheits- oder Supermehrheits-Clients setzt Sie im Falle eines Fehlers in diesem Client einem erhöhten Risiko von Slashing aus. Die Ausführung eines Minderheits-Clients begrenzt diese Risiken drastisch.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Erfahren Sie mehr darüber, warum Client-Vielfalt entscheidend ist</a>
</ExpandableCard>

<ExpandableCard title="Kann ich einfach einen VPS (Virtual Private Server) verwenden?">
Obwohl ein Virtual Private Server (VPS) als Ersatz für Heim-Hardware verwendet werden kann, <em>spielt</em> der physische Zugriff und der Standort Ihres Validator-Clients <em>eine Rolle</em>. Zentralisierte Cloud-Lösungen wie Amazon Web Services oder Digital Ocean bieten den Komfort, keine Hardware beschaffen und betreiben zu müssen, auf Kosten der Zentralisierung des Netzwerks.

Je mehr Validator-Clients auf einer einzigen zentralisierten Cloud-Speicherlösung ausgeführt werden, desto gefährlicher wird es für diese Benutzer. Jedes Ereignis, das diese Anbieter offline nimmt, sei es durch einen Angriff, behördliche Anforderungen oder einfach nur Strom-/Internetausfälle, führt dazu, dass jeder Validator-Client, der auf diesen Server angewiesen ist, gleichzeitig offline geht.

Offline-Strafen sind proportional dazu, wie viele andere gleichzeitig offline sind. Die Verwendung eines VPS erhöht das Risiko erheblich, dass Offline-Strafen schwerwiegender ausfallen, und erhöht Ihr Risiko eines quadratischen Lecks oder Slashings, falls der Ausfall groß genug ist. Um Ihr eigenes Risiko und das Risiko für das Netzwerk zu minimieren, wird Benutzern dringend empfohlen, ihre eigene Hardware zu beschaffen und zu betreiben.
</ExpandableCard>

<ExpandableCard title="Wie schalte ich meine Belohnungen frei oder bekomme meine ETH zurück?">

Auszahlungen jeglicher Art von der Beacon Chain erfordern, dass Auszahlungsdaten (Withdrawal Credentials) festgelegt sind.

Neue Staker legen dies zum Zeitpunkt der Schlüsselgenerierung und Einzahlung fest. Bestehende Staker, die dies noch nicht festgelegt haben, können ihre Schlüssel aktualisieren, um diese Funktionalität zu unterstützen.

Sobald die Auszahlungsdaten festgelegt sind, werden Belohnungszahlungen (angesammelte ETH über die anfänglichen 32 hinaus) automatisch in regelmäßigen Abständen an die Auszahlungsadresse verteilt.

Um Ihr gesamtes Guthaben freizuschalten und zurückzuerhalten, müssen Sie auch den Prozess des Ausstiegs Ihres Validators abschließen.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Auszahlungen</ButtonLink>
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [The Ethereum Staking Directory](https://www.staking.directory/) – _Eridian und Spacesider_
- [Ethereum's Client Diversity Problem](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022_
- [Helping Client Diversity](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022_
- [Client diversity on Ethereum's consensus layer](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [How To: Shop For Ethereum Validator Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />