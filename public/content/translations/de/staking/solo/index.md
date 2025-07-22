---
title: Solo-Staking Ihres ETH
description: Ein Überblick darüber, wie Sie mit dem Solo-Staking Ihres ETH beginnen können
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie das Nashorn auf ihrem eigenen Computerchip.
sidebarDepth: 2
summaryPoints:
  - Erhalten Sie maximale Belohnungen direkt vom Protokoll, indem Sie sicherstellen, dass Ihr Validator ordnungsgemäß funktioniert und online ist
  - Benutzen Sie Hardware zu Hause und tragen Sie persönlich zur Sicherheit und Dezentralisierung des Ethereum-Netzwerks bei
  - Vertrauen Sie niemandem und geben Sie niemals den Zugang zu Ihren Geldern weiter
---

## Was ist Solo-Staking? {#what-is-solo-staking}

Solo-Staking ist das [Betreiben eines Ethereum-Knotens](/run-a-node/), der mit dem Internet verbunden ist, und das Hinterlegen von 32 ETH, um einen [Validator zu aktivieren](#faq), wodurch Sie direkt am Netzwerkkonsens teilnehmen können.

**Das Solo-Staking erhöht die Dezentralisierung des Ethereum-Netzwerks **, damit Ethereum gegen Zensur resistenter und gegen Angriffe robuster wird. Andere Staking-Methoden können das Netzwerk nicht auf die gleiche Weise unterstützen. Das Solo-Staking ist die beste Staking-Option zur Absicherung von Ethereum.

Ein Ethereum-Knoten besteht sowohl aus einem Client der Ausführungsschicht (Execution Layer, EL) als auch aus einem Client der Konsensschicht (Client Layer, CL). Diese Kunden sind Software, die mit einem gültigen Satz von Signaturschlüsseln zusammenarbeiten, um Transaktionen und Blöcke zu verifizieren, den korrekten Kopf der Kette zu bestätigen, Bestätigungen zu attestieren und Blöcke vorzuschlagen.

Solo-Staker sind für den Betrieb der Hardware verantwortlich, die zum Ausführen dieser Clients erforderlich ist. Es wird dringend empfohlen, dafür einen fest zugeordneten Computer zu verwenden, den Sie von zu Hause aus betreiben, denn dies ist für die Gesundheit des Netzwerks sehr vorteilhaft.

Ein Solo-Staker erhält Belohnungen direkt vom Protokoll dafür, dass sein Validator ordnungsgemäß funktioniert und online bleibt.

## Warum Solo-Staken? {#why-stake-solo}

Das Solo-Staking bringt mehr Verantwortung mit sich, bietet Ihnen aber die maximale Kontrolle über Ihre Mittel und Ihre Staking-Einstellungen.

<CardGrid>
  <Card title="Verdienen Sie frische ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Volle Kontrolle" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Netzwerksicherheit" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Überlegungen vor dem Solo-Staking {#considerations-before-staking-solo}

So sehr wir uns wünschen, dass das Solo-Staking für alle zugänglich und risikofrei wäre, spiegelt dies nicht die Realität wider. Es gibt einige praktische und ernsthafte Überlegungen, die Sie beachten sollten, bevor Sie sich entscheiden, Ihre ETH solo zu staken.

<InfoGrid>
<ExpandableCard title="Wichtiger Hinweis" eventCategory="SoloStaking" eventName="clicked required reading">
Wenn Sie Ihren eigenen Knoten betreiben, sollten Sie einige Zeit damit verbringen, die Verwendung der von Ihnen gewählten Software zu erlernen. Dies umfasst das Lesen der relevanten Dokumentation und das Einstimmen auf die Kommunikationskanäle dieser Entwicklerteams.

Je mehr Sie über die von Ihnen verwendete Software und die Funktionsweise von Proof-of-Stake (Stake-Nachweis) verstehen, desto weniger riskant ist es als Staker und desto einfacher wird es, alle Probleme zu beheben, die auf dem Weg als Node-Betreiber auftreten können.
</ExpandableCard>

<ExpandableCard title="Vertraut im Umgang mit Computern" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Das Einrichten von Nodes erfordert ein angemessenes Maß an Sicherheit bei der Arbeit mit Computern, obwohl neue Tools dies im Laufe der Zeit einfacher machen. Das Verständnis der Befehlszeilenschnittstelle ist hilfreich, aber nicht mehr unbedingt erforderlich.

Es erfordert auch eine sehr einfache Hardware-Konfiguration und ein gewisses Verständnis der empfohlenen Mindestspezifikationen.
</ExpandableCard>

<ExpandableCard title="Sichere Schlüsselverwaltung" eventCategory="SoloStaking" eventName="clicked secure key management">
Genauso wie private Schlüssel Ihre Ethereum-Adresse sichern, müssen Sie Schlüssel speziell für Ihren Validator generieren. Sie müssen sich informieren, wie Sie Seed-Phrasen oder private Schlüssel sicher aufbewahren.{' '}

<a href="/security/">Ethereum-Sicherheit und Betrugsprävention</a>
</ExpandableCard>

<ExpandableCard title="Wartung" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware fällt gelegentlich aus, Netzwerkverbindungen fallen aus und Client-Software muss gelegentlich aktualisiert werden. Die Node-Wartung ist unvermeidlich und erfordert von Zeit zu Zeit Ihre Aufmerksamkeit. Sie sollten sicher sein, dass Sie über alle erwarteten Netzwerk-Upgrades oder andere wichtige Client-Upgrades informiert sind.
</ExpandableCard>

<ExpandableCard title="Zuverlässige Uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ihre Belohnungen sind proportional zu der Zeit, in der Ihr Validator online ist und ordnungsgemäß attestiert. Ausfallzeiten führen zu Strafen, die proportional dazu sind, wie viele andere Validatoren gleichzeitig offline sind, aber <a href="#faq">führen nicht zum Slashing</a>. Auch die Bandbreite spielt eine Rolle, da die Belohnungen für Bescheinigungen, die nicht rechtzeitig eingehen, gekürzt werden. Die Anforderungen sind unterschiedlich, es wird jedoch ein Minimum von 10 Mb/s Upload und Download empfohlen.
</ExpandableCard>

<ExpandableCard title="Slashing-Risiko" eventCategory="SoloStaking" eventName="clicked slashing risk">
Im Gegensatz zu Strafen für Inaktivität in Offline-Zeiten ist <em>Slashing</em> eine viel schwerwiegendere Strafe, die auf böswillige Vergehen beschränkt ist. Wenn Sie einen Minderheiten-Client mit Ihren Schlüsseln jeweils auf nur einer Maschine laden, wird das Risiko des Schrumpfens minimiert. Davon abgesehen müssen sich alle Staker der Risiken von Slashing bewusst sein.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mehr über Slashing und den Lebenszyklus von Validatoren</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Wie es funktioniert {#how-it-works}

<StakingHowSoloWorks />

Während Sie aktiv sind, erhalten Sie ETH-Prämien, die regelmäßig in Ihre Auszahlungsadresse eingezahlt werden.

Wenn Sie möchten, können Sie als Validator aussteigen, wodurch die Notwendigkeit entfällt, online zu sein, und alle weiteren Belohnungen gestoppt werden. Ihr verbleibendes Guthaben wird dann an die Auszahlungsadresse, die Sie bei der Einrichtung angeben, ausgezahlt.

[Mehr zu Staking-Auszahlungen](/staking/withdrawals/)

## Beginnen Sie mit dem Staking-Launchpad {#get-started-on-the-staking-launchpad}

Das Staking-Launchpad ist eine Open-Source-Anwendung, die Ihnen hilft, ein Staker zu werden. Es führt Sie durch die Auswahl Ihrer Clients, die Generierung Ihrer Schlüssel und die Hinterlegung Ihrer ETH nach Maßgabe des Staking-Einlagenvertrags. Eine Checkliste wird bereitgestellt, um sicherzustellen, dass Sie alles abgedeckt haben, um Ihren Validator sicher einzurichten.

<StakingLaunchpadWidget />

## Was bei Node- und Client-Konfigurations-Tools zu beachten ist {#node-tool-considerations}

Es gibt eine wachsende Zahl von Tools und Dienstleistungen, die Ihnen helfen, Ihre ETH solo zu staken, aber sie sind mit unterschiedlichen Risiken und Vorteilen verbunden.

Attributindikatoren werden unten verwendet, um auf nennenswerte Stärken oder Schwächen hinzuweisen, die ein gelistetes Staking-Tool haben kann. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie auswählen, welche Tools Sie bei Ihrer Staking-Reise unterstützen.

<StakingConsiderations page="solo" />

## Erkunden Sie Tools zum Einrichten von Nodes und Clients {#node-and-client-tools}

Es gibt eine Vielzahl von Optionen, die Ihnen bei der Einrichtung helfen. Verwenden Sie die obigen Indikatoren, um Sie durch die folgenden Tools zu führen.

<ProductDisclaimer />

### Node-Werkzeuge

<StakingProductsCardGrid category="nodeTools" />

Bitte beachten Sie, wie wichtig es ist, einen [Minderheits-Client](/developers/docs/nodes-and-clients/client-diversity/) zu wählen, da er die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Tools, mit denen Sie einen Minderheits-Client einrichten können, werden als <em style={{ textTransform: "uppercase" }}>„Multi-Client"</em> bezeichnet.

### Schlüssel-Generatoren

Diese Tools können als Alternative zur [Staking-Einlage-CLI](https://github.com/ethereum/staking-deposit-cli/) genutzt werden, um bei der Schlüsselgenerierung zu helfen.

<StakingProductsCardGrid category="keyGen" />

Haben Sie einen Vorschlag für einen Staking-Tool, der noch fehlt? Machen Sie sich mit unserer [Richtlinie zum Aufführen von Produkten](/contributing/adding-staking-products/) vertraut, um beurteilen zu können, ob Ihr Vorschlag geeignet ist. Senden Sie ihn uns dann zur Prüfung zu.

## Erkunden Sie Solo-Staking-Anleitungen {#staking-guides}

<StakingGuides />

## Häufig gestellte Fragen {#faq}

Das sind einige der häufigsten Fragen zum Thema Staking. Es ist lohnenswert sich damit auseinanderzusetzen.

<ExpandableCard title="Was ist ein Validator?">

Ein <em>Validator</em> ist eine virtuelle Einheit, die auf Ethereum existiert und am Konsens des Ethereum-Protokolls teilnimmt. Validatoren werden durch ein Guthaben, einen öffentlichen Schlüssel und andere Eigenschaften dargestellt. Ein <em>Validator-Client</em> ist die Software, die im Namen des Validators handelt, indem sie seinen privaten Schlüssel hält und verwendet. Ein einzelner Validator-Client kann viele Schlüsselpaare enthalten und viele Validatoren steuern.

</ExpandableCard>

<ExpandableCard title="Kann ich mehr als 32 ETH einzahlen?">
Jedes Schlüsselpaar, das einem Validator zugeordnet ist, erfordert genau 32 ETH, um aktiviert zu werden. Mehr ETH, die in einen einzigen Schlüsselsatz eingezahlt werden, erhöhen das Belohnungspotenzial nicht, da jeder Validator auf ein <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effektives Guthaben von 32 ETH</a> begrenzt ist. Dies bedeutet, dass das Staking in Schritten von 32 ETH erfolgt, von denen jeder seinen eigenen Schlüsselsatz und sein eigenes Guthaben hat.

Zahlen Sie nicht mehr als 32 ETH für einen einzelnen Validator ein. Sie wird Ihre Belohnungen nicht erhöhen. Wenn eine Auszahlungsadresse für den Validator festgelegt wurde, werden überschüssige Gelder über 32 ETH während des nächsten <a href="/staking/withdrawals/#validator-sweeping">Validator-Sweeps</a> automatisch an diese Adresse überwiesen.

Wenn Ihnen Solo-Staking zu anspruchsvoll erscheint, ziehen Sie die Nutzung eines <a href="/staking/saas/">Staking-as-a-Service</a>-Anbieters in Betracht, oder wenn Sie mit weniger als 32 ETH arbeiten, schauen Sie sich die <a href="/staking/pools/">Staking-Pools</a> an.
</ExpandableCard>

<ExpandableCard title="Werde ich geslashed, wenn ich offline gehe? (tldr: Nein.)">
Wenn man offline geht, während das Netzwerk ordnungsgemäß abgeschlossen wird, führt dies NICHT zu Slashing. Es fallen kleine <em>Strafen für Inaktivität</em> an, wenn Ihr Validator für eine bestimmte Epoche (jeweils 6,4 Minuten lang) nicht verfügbar ist, um dies zu bestätigen, aber dies unterscheidet sich stark von <em>Slashing</em>. Diese Strafen sind etwas geringer als die Belohnung, die Sie verdient hätten, wenn der Validator zur Bestätigung verfügbar gewesen wäre, und Verluste können mit ungefähr der gleichen Zeit zurückerstattet werden, wenn Sie wieder online sind.

Beachten Sie, dass Strafen für Inaktivität proportional dazu sind, wie viele Validatoren gleichzeitig offline sind. In Fällen, in denen ein großer Teil des Netzwerks auf einmal offline ist, sind die Strafen für jeden dieser Validatoren größer, als wenn ein einzelner Validator nicht verfügbar ist.

In extremen Fällen, wenn das Netzwerk nicht mehr fertig gestellt wird, weil mehr als ein Drittel der Validatoren offline sind, werden diese Benutzer unter einem sogenannten <em>quadratischen Inaktivitätsleck</em> leiden, das einen exponentiellen Abfluss von ETH von Offline-Validierungskonten darstellt. Dies ermöglicht es dem Netzwerk, sich schließlich selbst zu heilen, indem es die ETH von inaktiven Validatoren verbrennt, bis deren Kontostand 16 ETH erreicht. An diesem ​​​​Punkt werden sie automatisch aus dem Validator-Pool herausgeworfen werden. Die verbleibenden Online-Validatoren werden schließlich wieder über 2/3 des Netzwerks verfügen und die qualifizierte Mehrheit haben, die erforderlich ist, um die Kette erneut abzuschließen.
</ExpandableCard>

<ExpandableCard title="Wie stelle ich sicher, dass ich nicht geslashed werde?">
Kurz gesagt, dies kann nie vollständig garantiert werden, aber wenn Sie in gutem Glauben handeln, einen Minderheits-Client betreiben und Ihre Signaturschlüssel jeweils nur auf einem Computer aufbewahren, liegt das Slashing-Risiko bei nahezu null.

Es gibt nur wenige spezifische Möglichkeiten, die dazu führen können, dass ein Validator geslashed und aus dem Netzwerk herausgeworfen wird. Zum Zeitpunkt des Verfassens dieses Artikels waren die aufgetretenen Slashings ausschließlich ein Produkt redundanter Hardware-Konfigurationen, bei denen Signaturschlüssel gleichzeitig auf zwei separaten Computern gespeichert werden. Dies kann unbeabsichtigt zu einer <em>doppelten Abstimmung</em> Ihrer Schlüssel führen. Das wiederum stellt ein strafbares Vergehen dar.

Das Ausführen eines Clients mit qualifizierter Mehrheit (jeder Client, der von mehr als 2/3 des Netzwerks verwendet wird) birgt auch das Risiko eines potenziellen Slashing, falls dieser Client einen Fehler aufweist, der zu einer Chain-Fork führt. Dies kann zu einer fehlerhaften Fork führen, die abgeschlossen wird. Um zur beabsichtigten Kette zurückzukehren, müsste eine <em>Surround-Abstimmung</em> durchgeführt werden, indem man versucht, einen abgeschlossenen Block rückgängig zu machen. Auch dies ist ein strafbares Vergehen und kann einfach dadurch vermieden werden, dass stattdessen ein Minderheits-Client ausgeführt wird.

Äquivalente Fehler in einem <em>Minderheits-Client würden niemals abgeschlossen</em> und würden daher niemals zu einer Surround-Abstimmung, sondern einfach zu Inaktivitätsstrafen, <em>nicht zu Slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Erfahren Sie mehr darüber, wie wichtig es ist, einen Minderheits-Client zu führen.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Erfahren Sie mehr über die Prävention von Slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Welcher Client ist der Beste?">
Einzelne Clients können in Bezug auf Leistung und Benutzeroberfläche leicht variieren, da jeder von verschiedenen Teams mit einer Vielzahl von Programmiersprachen entwickelt wird. Davon abgesehen ist keiner von ihnen „am besten" Bei allen Produktions-Clients handelt es sich um eine hervorragende Software, die alle die gleichen Kernfunktionen zur Synchronisierung und Interaktion mit der Blockchain ausführen.

Da alle Produktions-Clients die gleiche Grundfunktionalität bieten, ist es sehr wichtig, dass Sie einen <strong>Minderheits-Client</strong> wählen, d. h. jeden Client, der derzeit NICHT von einer Mehrheit der Validatoren im Netzwerk verwendet wird. Dies mag kontraintuitiv klingen, aber wenn Sie einen Mehrheits- oder einen Client mit qualifizierter Mehrheit betreiben, besteht für Sie ein erhöhtes Risiko des Slashing im Falle eines Fehlers in diesem Client. Der Betrieb eines Minderheits-Client begrenzt diese Risiken drastisch.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Erfahren Sie mehr darüber, warum Client-Diversität entscheidend ist</a>
</ExpandableCard>

<ExpandableCard title="Kann ich einfach einen VPS (virtueller privater Server) verwenden?">
Obwohl ein virtueller privater Server (VPS) als Ersatz für Heim-Hardware verwendet werden kann, spielen der physische Zugang und Standort Ihres Validator-Client <em>eine Rolle</em>. Zentralisierte Cloud-Lösungen wie Amazon Web Services oder Digital Ocean bieten den Vorteil, dass keine Hardware angeschafft und betrieben werden muss, was zur Zentralisierung des Netzwerks beiträgt.

Je mehr Validator-Clients auf einer einzigen zentralisierten Cloud-Speicherlösung laufen, desto gefährlicher wird es für diese Benutzer. Jedes Ereignis, das diese Anbieter offline schaltet, sei es durch einen Angriff, behördliche Anforderungen oder nur Strom-/Internetausfälle, führt dazu, dass jeder Validator-Client, der sich auf diesen Server verlässt, gleichzeitig offline geht.

Offline-Strafen sind proportional dazu, wie viele andere gleichzeitig offline sind. Die Verwendung eines VPS erhöht das Risiko, dass Offline-Strafen schwerwiegender sind, und erhöht Ihr Risiko von quadratischen Lecks oder Slashing, falls der Ausfall groß genug ist. Um Ihr eigenes Risiko und das Risiko für das Netzwerk zu minimieren, wird Benutzern dringend empfohlen, ihre eigene Hardware zu erwerben und zu betreiben.
</ExpandableCard>

<ExpandableCard title="Wie schalte ich meine Belohnungen frei oder bekomme mein ETH zurück?">

Abhebungen jeglicher Art aus der Beaconchain erfordern die Angabe von Rücktrittsberechtigungen.

Neue Staker setzen dies bei der Schlüsselgenerierung und Einzahlung. Bestehende Staker, die dies noch nicht eingestellt haben, können ihre Schlüssel aktualisieren, um diese Funktion zu unterstützen.

Sobald die Auszahlungsdaten festgelegt sind, werden Prämienzahlungen (über den ursprünglichen 32) periodisch an die Auszahlungsadresse ausgezahlt.

Um Ihr gesamtes Guthaben zu entsperren und zu erhalten, müssen Sie auch den Prozess des Verlassens Ihres Validators abschließen.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Auszahlungen</ButtonLink>
</ExpandableCard>

## Weiterführende Informationen {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) - _Eridian und Spacesider_
- [Ethereums Client-Diversitätsproblem](https://hackernoon.com/Ethereums-Client-Diversitätsproblem) – _@emmanuelawosika 2022_
- [Client-Diversität fördern](https://www.attestant.io/Posts/Client-Diversität-fördern/) – _Jim McDonald 2022_
- [Client-Diversität auf der Konsensebene von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Anleitung: Ethereum-Validator-Hardware kaufen](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Schritt für Schritt: Wie man dem Ethereum 2.0 Testnetz beitritt](https://kb.beaconcha.in/Guides/Tutorium-eth2-Multi-Client) - _ Butta_
- [Eth2-Slashing-Präventionstipps](https://medium.com/prysmatic-labs/eth2-Slashing-Präventionstipps-f6faa5025f50) – _Raul Jordan 2020 _

<QuizWidget quizKey="staking-solo" />
