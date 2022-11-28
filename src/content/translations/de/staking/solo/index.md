---
title: Solo-Staking Ihrer ETH
description: Ein Überblick darüber, wie Sie mit dem Solo-Staking Ihrer ETH beginnen können
lang: de
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-solo.png
alt: Leslie das Nashorn auf ihrem eigenen Computerchip.
summaryPoints:
  - Erhalten Sie maximale Belohnungen direkt vom Protokoll, indem Sie sicherstellen, dass Ihr Validator ordnungsgemäß funktioniert und online ist
  - Benutzen Sie Hardware zu Hause und tragen Sie persönlich zur Sicherheit und Dezentralisierung des Ethereum-Netzwerks bei
  - Vertrauen Sie niemandem und geben Sie niemals den Zugang zu Ihren Geldern weiter
---

## Was ist Solo-Staking? {#what-is-solo-staking}

Solo-Staking ist das [Betreiben eines Ethereum-Knotens](/run-a-node/), der mit dem Internet verbunden ist, und das Hinterlegen von 32 ETH, um einen
Validator zu aktivieren, wodurch Sie direkt am Netzwerkkonsens teilnehmen können.

Ein Ethereum-Knoten besteht sowohl aus einem Client der Ausführungsschicht (Execution Layer, EL) als auch aus einem Client der Konsensschicht (Client Layer, CL). Diese Kunden sind Software, die mit einem gültigen Satz von Signaturschlüsseln zusammenarbeiten, um Transaktionen und Blöcke zu verifizieren, den korrekten Kopf der Kette zu bestätigen, Bestätigungen zu attestieren und Blöcke vorzuschlagen.

Solo-Staker sind für den Betrieb der Hardware verantwortlich, die zum Ausführen dieser Clients erforderlich ist. Es wird dringend empfohlen, dafür einen fest zugeordneten Computer zu verwenden, den Sie von zu Hause aus betreiben, denn dies ist für die Gesundheit des Netzwerks sehr vorteilhaft.

Ein Solo-Staker erhält Belohnungen direkt vom Protokoll dafür, dass sein Validator ordnungsgemäß funktioniert und online bleibt.

## Warum Solo-Staken? {#why-stake-solo}

Solo-Staking bringt mehr Verantwortung mit sich, bietet Ihnen aber maximale Kontrolle über Ihre Gelder und Staking-Einstellungen.

<CardGrid>
  <Card title="Verdienen Sie frische ETH" emoji="💸">
    Verdienen Sie in ETH denominierte Belohnungen direkt aus dem Protokoll, wenn Ihr Validator online ist, ohne dass dabei Zwischenhändler einen Anteil für sich in Anspruch nehmen.
  </Card>
  <Card title="Volle Kontrolle" emoji="🎛️">
    Behalten Sie Ihre eigenen Schlüssel. Wählen Sie die Kombination aus Clients und Hardware, mit der Sie Ihr Risiko minimieren und am besten zur Gesundheit und Sicherheit des Netzwerks beitragen können. Staking-Dienste von Drittanbietern treffen diese Entscheidungen für Sie, und sie treffen nicht immer die sichersten Entscheidungen.
  </Card>
  <Card title="Netzwerksicherheit" emoji="🔐">
    Solo-Staking ist die wirksamste Art des Staking. Indem Sie zu Hause einen Validator auf Ihrer eigenen Hardware laufen lassen, stärken Sie die Robustheit, Dezentralisierung und Sicherheit des Ethereum-Protokolls.
  </Card>
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
    Genauso wie private Schlüssel Ihre Ethereum-Adresse sichern, müssen Sie Schlüssel speziell für Ihren Validator generieren. Sie müssen verstehen, wie Sie Seed-Phrasen oder private Schlüssel sicher und geschützt aufbewahren.
    <p style={{marginTop: "1rem"}}><a href="/security">Ethereum – Sicherheits- und Betrugsvorbeugung</a></p>
  </ExpandableCard>
  <ExpandableCard title="Kein Abheben (im Moment)" eventCategory="SoloStaking" eventName="clicked no withdrawing">
    Das Abheben von gestakten ETH oder Belohnungen von einem Validator-Guthaben wird noch nicht unterstützt. Unterstützung für Auszahlungen ist für das bevorstehende Shanghai-Upgrade geplant. Sie sollten damit rechnen, dass Ihre ETH für mindestens ein bis zwei Jahre gesperrt sind. Nach dem Shanghai-Upgrade können Sie Teile oder Ihren gesamten Einsatz frei abheben, wenn Sie dies wünschen.
  </ExpandableCard>
  <ExpandableCard title="Wartung" eventCategory="SoloStaking" eventName="clicked maintenance">
    Hardware fällt gelegentlich aus, Netzwerkverbindungen fallen aus und Client-Software muss gelegentlich aktualisiert werden. Die Node-Wartung ist unvermeidlich und erfordert von Zeit zu Zeit Ihre Aufmerksamkeit. Sie sollten sicher sein, dass Sie über alle erwarteten Netzwerk-Upgrades oder andere wichtige Client-Upgrades informiert sind.
  </ExpandableCard>
  <ExpandableCard title="Zuverlässige Uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
    Ihre Belohnungen sind proportional zu der Zeit, in der Ihr Validator online ist und ordnungsgemäß attestiert. Ausfallzeiten führen zu Strafen, die proportional dazu sind, wie viele andere Validierer gleichzeitig offline sind, aber <a href="#faq">führen nicht zum Slashing</a>. Auch die Bandbreite spielt eine Rolle, da die Belohnungen für Bescheinigungen, die nicht rechtzeitig eingehen, gekürzt werden. Die Anforderungen sind unterschiedlich, es wird jedoch ein Minimum von 10 Mb/s Upload und Download empfohlen.
  </ExpandableCard>
  <ExpandableCard title="Slashing-Risiko" eventCategory="SoloStaking" eventName="clicked slashing risk">
    Im Gegensatz zu Strafen für Inaktivität in Offline-Zeiten ist <em>Slashing</em> eine viel schwerwiegendere Strafe, die auf böswillige Vergehen beschränkt ist. Wenn Sie einen Minderheiten-Client mit Ihren Schlüsseln jeweils auf nur einer Maschine laden, wird das Risiko des Schrumpfens minimiert. Davon abgesehen müssen sich alle Staker der Risiken von Slashing bewusst sein.
    
    <p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Mehr über Slashing und den Validator-Lebenszyklus</a></p>
  </ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Wie es funktioniert {#how-it-works}

<StakingHowSoloWorks />

Wenn Sie möchten, können Sie als Validator aussteigen, wodurch die Notwendigkeit entfällt, online zu sein, und alle weiteren Belohnungen gestoppt werden. Beachten Sie, dass diese Gelder bis zum geplanten Shanghai-Upgrade nicht _abgehoben_ werden können.

Nach Shanghai können die Benutzer ihre Prämien sowie ihren Einsatz abheben, wenn sie dies wünschen.

## Beginnen Sie mit dem Staking-Launchpad {#get-started-on-the-staking-launchpad}

Das Staking-Launchpad ist eine Open-Source-Anwendung, die Ihnen hilft, ein Staker zu werden. Es führt Sie durch die Auswahl Ihrer Clients, die Generierung Ihrer Schlüssel und die Hinterlegung Ihrer ETH nach Maßgabe des Staking-Einlagenvertrags. Eine Checkliste wird bereitgestellt, um sicherzustellen, dass Sie alles abgedeckt haben, um Ihren Validator sicher einzurichten.

<StakingLaunchpadWidget />

## Was bei Node- und Client-Konfigurations-Tools zu beachten ist {#node-tool-considerations}

Es gibt eine wachsende Zahl von Tools und Dienstleistungen, die Ihnen helfen, Ihre ETH solo zu staken, aber sie sind mit unterschiedlichen Risiken und Vorteilen verbunden.

Attributindikatoren werden unten verwendet, um auf nennenswerte Stärken oder Schwächen hinzuweisen, die ein gelistetes Staking-Tool haben kann. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie auswählen, welche Tools Sie bei Ihrer Staking-Reise unterstützen.

<StakingConsiderations page="solo" />

## Erkunden Sie Tools zum Einrichten von Nodes und Clients {#node-and-client-tools}

Es gibt eine Vielzahl von Optionen, die Ihnen bei der Einrichtung helfen. Verwenden Sie die obigen Indikatoren, um Sie durch die folgenden Tools zu führen.

<InfoBanner emoji="⚠️" isWarning>
Bitte beachten Sie, wie wichtig es ist, einen <a href="/developers/docs/nodes-and-clients/client-diversity/">Minderheits-Client</a> zu wählen, da er die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Tools, mit denen Sie einen Minderheit-Client einrichten können, werden als <em style="text-transform: uppercase;">„Multi-Client."</em> bezeichnet
</InfoBanner>

#### Node-Tools

<StakingProductsCardGrid category="nodeTools" />

#### Schlüssel-Generatoren

Diese Tools können als Alternative zur [Staking-Einlage CLI](https://github.com/ethereum/staking-deposit-cli/) verwendet werden, um bei der Schlüsselgenerierung zu helfen.

<StakingProductsCardGrid category="keyGen" />

Haben Sie einen Vorschlag für ein Staking-Tool, das wir noch nicht haben? Sehen Sie sich unsere [Produktlistenrichtlinie](/contributing/adding-staking-products/) an, um zu sehen, ob sie gut passt, und um sie zur Überprüfung einzureichen.

## Erkunden Sie Solo-Staking-Anleitungen {#staking-guides}

<StakingGuides />

## FAQ {#faq}

Dies sind einige der häufigsten Fragen zum Thema Staking, über die es sich zu informieren lohnt.

<ExpandableCard title="Was ist ein Validator?">

Ein _Validator_ ist eine virtuelle Einheit, die auf Ethereum lebt und am Konsens des Ethereum-Protokolls teilnimmt. Validatoren werden durch ein Guthaben, einen öffentlichen Schlüssel und andere Eigenschaften dargestellt. Ein _Validator-Client_ ist die Software, die im Namen des Validators handelt, indem sie dessen privaten Schlüssel hält und verwendet. Ein einzelner Validator-Client kann viele Schlüsselpaare enthalten und viele Validatoren steuern.

</ExpandableCard>

<ExpandableCard title="Kann ich mehr als 32 ETH einzahlen?">
Jedes Schlüsselpaar, das einem Validator zugeordnet ist, erfordert genau 32 ETH, um aktiviert zu werden. Mehr ETH, die in einen einzigen Schlüsselsatz eingezahlt werden, erhöhen das Belohnungspotenzial nicht, da jeder Validator auf ein <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effektives Guthaben von 32 ETH</a> begrenzt ist. Dies bedeutet, dass das Staking in Schritten von 32 ETH erfolgt, von denen jeder seinen eigenen Schlüsselsatz und sein eigenes Guthaben hat.

Zahlen Sie nicht mehr als 32 ETH für einen einzelnen Validator ein. Es wird Ihre Belohnungen nicht erhöhen und bis zum geplanten Shanghai-Update gesperrt sein.

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

<p><a href="https://hackernoon.com/ethereums-client-diversity-problem">Erfahren Sie mehr darüber, wie wichtig es ist, einen Minderheits-Client zu führen.</a></p>
<p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Erfahren Sie mehr über die Prävention von Slashing</a></p>
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

<a href="https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/">Mehr zu Belohnungen und Strafen</a>
</ExpandableCard>

## Weiterführende Informationen {#further-reading}

- [Ethereums Client-Diversitätsproblem](https://hackernoon.com/Ethereums-Client-Diversitätsproblem) – _@emmanuelawosika 2022_
- [Client-Diversität fördern](https://www.attestant.io/Posts/Client-Diversität-fördern/) – _Jim McDonald 2022_
- [Client-Diversität auf der Konsensebene von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Anleitung: Ethereum-Validator-Hardware kaufen](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Schritt für Schritt: Wie man dem Ethereum 2.0 Testnetz beitritt](https://kb.beaconcha.in/Guides/Tutorium-eth2-Multi-Client) - _Butta_
- [Eth2-Slashing-Präventionstipps](https://medium.com/prysmatic-labs/eth2-Slashing-Präventionstipps-f6faa5025f50) – _Raul Jordan 2020_
- [Belohnungen und Strafen auf Ethereum 2.0](https://consensys.net/blog/codefi/Belohnungen-und-Strafen-auf-Ethereum-20-phase-0/) - _James Beck, März 2020_
