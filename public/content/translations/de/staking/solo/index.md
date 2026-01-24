---
title: Setzen Sie Ihre ETH zu Hause ein
description: Eine Übersicht über die ersten Schritte beim Home-Staking Ihres ETH
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

## Was ist Home-Staking? {#what-is-solo-staking}

Home-Staking ist der Vorgang, einen mit dem Internet verbundenen [Ethereum-Knoten](/run-a-node/) zu betreiben und 32 ETH einzuzahlen, um einen [Validator](#faq) zu aktivieren, wodurch Sie die Möglichkeit erhalten, direkt am Netzwerkkonsens teilzunehmen.

**Home-Staking erhöht die Dezentralisierung des Ethereum-Netzwerks**, wodurch Ethereum zensurresistenter und robuster gegen Angriffe wird. Andere Staking-Methoden unterstützen das Netzwerk möglicherweise nicht auf die gleiche Weise. Home-Staking ist die beste Staking-Option zur Sicherung von Ethereum.

Ein Ethereum-Knoten besteht sowohl aus einem Client der Ausführungsebene (EL) als auch aus einem Client der Konsensebene (CL). Diese Clients sind Software, die zusammen mit einem gültigen Satz von Signaturschlüsseln zusammenarbeitet, um Transaktionen und Blöcke zu verifizieren, den korrekten Head der Chain zu bestätigen, Bestätigungen zu aggregieren und Blöcke vorzuschlagen.

Home-Staker sind für den Betrieb der Hardware verantwortlich, die für die Ausführung dieser Clients erforderlich ist. Es wird dringend empfohlen, hierfür einen dedizierten Computer zu verwenden, den Sie von zu Hause aus betreiben – dies ist für die Gesundheit des Netzwerks äußerst vorteilhaft.

Ein Hausbesitzer erhält Belohnungen direkt vom Protokoll dafür, dass er dafür sorgt, dass sein Validator ordnungsgemäß funktioniert und online ist.

## Warum von zu Hause aus staken? {#why-stake-solo}

Home Staking bringt mehr Verantwortung mit sich, bietet Ihnen jedoch maximale Kontrolle über Ihre Gelder und Ihr Abstecken aufstellen.

<CardGrid>
  <Card title="Earn fresh ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full control" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Network security" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Überlegungen vor dem Home-Staking {#considerations-before-staking-solo}

So sehr wir uns auch wünschen, dass Home-Staking für jeden zugänglich und risikofrei wäre, so ist dies nicht die Realität. Es gibt einige praktische und ernsthafte Überlegungen, die Sie berücksichtigen sollten, bevor Sie sich für das Home-Staking Ihrer ETH entscheiden.

<InfoGrid>
<ExpandableCard title="Required reading" eventCategory="SoloStaking" eventName="clicked required reading">
Wenn Sie Ihren eigenen Knoten betreiben, sollten Sie sich etwas Zeit nehmen, um zu lernen, wie Sie die von Ihnen gewählte Software verwenden. Dazu gehört das Lesen der relevanten Dokumentation und die Kenntnis der Kommunikationskanäle dieser Entwicklerteams.

Je mehr Sie über die von Ihnen verwendete Software und die Funktionsweise von Proof-of-Stake verstehen, desto weniger riskant ist es als Staker und desto einfacher wird es, als Knotenbetreiber alle auftretenden Probleme zu beheben. </ExpandableCard>

<ExpandableCard title="Comfortable with computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Das Einrichten von Knoten erfordert einen gewissen Grad an Vertrautheit im Umgang mit Computern, obwohl neue Tools dies im Laufe der Zeit einfacher machen. Das Verständnis der Kommandozeilenschnittstelle ist hilfreich, aber nicht mehr zwingend erforderlich.

Es erfordert auch eine sehr einfache Hardware-Einrichtung und ein gewisses Verständnis der empfohlenen Mindestspezifikationen. </ExpandableCard>

<ExpandableCard title="Secure key management" eventCategory="SoloStaking" eventName="clicked secure key management">
So wie private Schlüssel Ihre Ethereum-Adresse sichern, müssen Sie auch speziell für Ihren Validator Schlüssel generieren. Sie müssen verstehen, wie Sie Seed-Phrases oder private Schlüssel sicher aufbewahren.{' '} 

[Ethereum-Sicherheit und Betrugsprävention](/security/) </ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware fällt gelegentlich aus, Netzwerkverbindungen schlagen fehl und Client-Software muss gelegentlich aktualisiert werden. Die Wartung von Knoten ist unvermeidlich und erfordert gelegentlich Ihre Aufmerksamkeit. Sie sollten sicherstellen, dass Sie über alle erwarteten Netzwerk-Upgrades oder andere wichtige Client-Upgrades informiert bleiben.
</ExpandableCard>

<ExpandableCard title="Reliable uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ihre Belohnungen sind proportional zu der Zeit, in der Ihr Validator online ist und ordnungsgemäß Bestätigungen abgibt. Ausfallzeiten führen zu Strafen, die proportional zur Anzahl der gleichzeitig offline geschalteten Validatoren sind, aber <a href="#faq">führen nicht zu Slashing</a>. Auch die Bandbreite ist wichtig, da die Belohnungen für nicht rechtzeitig erhaltene Bestätigungen verringert werden. Die Anforderungen variieren, aber es wird ein Minimum von 10 Mbit/s für Up- und Download empfohlen.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
Im Gegensatz zu Inaktivitätsstrafen für das Offline-Sein ist <em>Slashing</em> eine wesentlich schwerwiegendere Strafe, die böswilligen Verstößen vorbehalten ist. Indem Sie einen Minderheits-Client betreiben und Ihre Schlüssel nur auf einem einzigen Gerät geladen haben, wird Ihr Risiko eines Slashings minimiert. Dennoch müssen sich alle Staker der Risiken des Slashings bewusst sein.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mehr über Slashing und den Lebenszyklus von Validatoren</a> </ExpandableCard> </InfoGrid>

<StakingComparison page="solo" />

## Funktionsweise {#how-it-works}

<StakingHowSoloWorks />

Während Sie aktiv sind, erhalten Sie ETH-Prämien, die regelmäßig in Ihre Auszahlungsadresse eingezahlt werden.

Wenn Sie es wünschen, können Sie Ihre Rolle als Validator beenden, wodurch die Online-Pflicht entfällt und keine weiteren Belohnungen mehr gezahlt werden. Ihr verbleibendes Guthaben wird dann an die Auszahlungsadresse ausgezahlt, die Sie bei der Einrichtung angeben.

[Mehr zu Staking-Auszahlungen](/staking/withdrawals/)

## Erste Schritte mit dem Staking Launchpad {#get-started-on-the-staking-launchpad}

Das Staking Launchpad ist eine Open-Source-Anwendung, die Ihnen hilft, ein Staker zu werden. Es führt Sie durch die Auswahl Ihrer Clients, die Generierung Ihrer Schlüssel und die Einzahlung Ihrer ETH in den Staking-Einzahlungsvertrag. Es wird eine Checkliste bereitgestellt, um sicherzustellen, dass Sie alles berücksichtigt haben, um Ihren Validator sicher einzurichten.

<StakingLaunchpadWidget />

## Was bei Node- und Client-Setup-Tools zu beachten ist {#node-tool-considerations}

Es gibt eine wachsende Zahl von Tools und Diensten, die Ihnen beim Home Staking Ihres ETH helfen, aber jedes davon ist mit unterschiedlichen Risiken und Vorteilen verbunden.

Die unten aufgeführten Attributindikatoren werden verwendet, um auf nennenswerte Stärken oder Schwächen hinzuweisen, die ein aufgeführtes Staking-Tool aufweisen kann. Nutzen Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie auswählen, welche Tools Sie auf Ihrer Staking-Reise unterstützen.

<StakingConsiderations page="solo" />

## Node- und Client-Setup-Tools erkunden {#node-and-client-tools}

Es gibt eine Vielzahl von Optionen, die Ihnen bei der Einrichtung helfen. Anhand der Indikatoren oben können Sie die Tools unten besser beurteilen.

<ProductDisclaimer />

### Node-Werkzeuge

<StakingProductsCardGrid category="nodeTools" />

Bitte beachten Sie, wie wichtig die Wahl eines [Minderheits-Clients](/developers/docs/nodes-and-clients/client-diversity/) ist, da dies die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Tools, mit denen Sie einen Minderheits-Client einrichten können, werden als <em style={{ textTransform: "uppercase" }}>"Multi-Client"</em> bezeichnet.

### Schlüssel-Generatoren

Diese Tools können als Alternative zum [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) verwendet werden, um bei der Schlüsselgenerierung zu helfen.

<StakingProductsCardGrid category="keyGen" />

Haben Sie einen Vorschlag für einen Staking-Tool, der noch fehlt? Sehen Sie sich unsere [Produktlistungsrichtlinie](/contributing/adding-staking-products/) an, um zu prüfen, ob sie passt, und um sie zur Überprüfung einzureichen.

## Leitfäden zum Home-Staking erkunden {#staking-guides}

<StakingGuides />

## Häufig gestellte Fragen {#faq}

Das sind einige der häufigsten Fragen zum Thema Staking. Es ist lohnenswert sich damit auseinanderzusetzen.

<ExpandableCard title="What is a validator?">

Ein <em>Validator</em> ist eine virtuelle Entität, die auf Ethereum lebt und am Konsens des Ethereum-Protokolls teilnimmt. Validatoren werden durch ein Guthaben, einen öffentlichen Schlüssel und andere Eigenschaften dargestellt. Ein <em>Validator-Client</em> ist die Software, die im Namen des Validators handelt, indem sie dessen privaten Schlüssel hält und verwendet. Ein einzelner Validator-Client kann viele Schlüsselpaare enthalten und somit viele Validatoren steuern.

</ExpandableCard>

<ExpandableCard title="Can I deposit more than 32 ETH?">
Ja, moderne Validator-Konten können bis zu 2048 ETH halten. Zusätzliche ETH über 32 werden schrittweise verzinst und erhöhen sich in ganzzahligen Schritten, wenn Ihr tatsächliches Guthaben steigt. Dies wird als Ihr <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effektives Guthaben</a> bezeichnet.

Um das effektive Guthaben eines Kontos und damit die Belohnungen zu erhöhen, muss ein Puffer von 0,25 ETH über einer beliebigen Ganzzahl-ETH-Schwelle überschritten werden. Beispielsweise müsste ein Konto mit einem tatsächlichen Guthaben von 32,9 und einem effektiven Guthaben von 32 weitere 0,35 ETH verdienen, um sein tatsächliches Guthaben über 33,25 zu bringen, bevor eine Erhöhung des effektiven Guthabens ausgelöst wird.

Dieser Puffer verhindert auch, dass ein effektiver Saldo sinkt, bis er 0,25 ETH unter seinen aktuellen effektiven Saldo gefallen ist.

Jedes Schlüsselpaar, das einem Validator zugeordnet ist, benötigt mindestens 32 ETH, um aktiviert zu werden. Jedes darüber hinausgehende Guthaben kann jederzeit durch eine mit dieser Adresse signierte Transaktion an die zugehörige Auszahlungsadresse ausgezahlt werden. Alle Gelder, die das maximale effektive Guthaben übersteigen, werden in regelmäßigen Abständen automatisch ausgezahlt.

Wenn Ihnen Home-Staking zu anspruchsvoll erscheint, ziehen Sie die Nutzung eines [Staking-as-a-Service](/staking/saas/)-Anbieters in Betracht, oder sehen Sie sich die [Staking-Pools](/staking/pools/) an, wenn Sie mit weniger als 32 ETH arbeiten. </ExpandableCard>

<ExpandableCard title="Will I be slashed if I go offline? (tldr: No.)">
Offline zu gehen, während das Netzwerk ordnungsgemäß finalisiert, führt NICHT zu Slashing. Geringe <em>Inaktivitätsstrafen</em> fallen an, wenn Ihr Validator für eine bestimmte Epoche (jeweils 6,4 Minuten lang) nicht für Bestätigungen zur Verfügung steht, was sich jedoch stark von <em>Slashing</em> unterscheidet. Diese Strafen sind etwas geringer als die Belohnung, die Sie erhalten hätten, wenn der Validator für Bestätigungen zur Verfügung gestanden hätte. Die Verluste können durch eine ungefähr gleich lange Zeit, in der Sie wieder online sind, ausgeglichen werden.

Beachten Sie, dass die Strafen für Inaktivität proportional zur Anzahl der gleichzeitig offline geschalteten Validatoren sind. In Fällen, in denen ein großer Teil des Netzwerks gleichzeitig offline ist, sind die Strafen für jeden dieser Validatoren höher als bei der Nichtverfügbarkeit eines einzelnen Validators.

In extremen Fällen, wenn das Netzwerk die Finalisierung einstellt, weil mehr als ein Drittel der Validatoren offline ist, erleiden diese Benutzer einen sogenannten <em>quadratischen Inaktivitätsverlust</em>, der einen exponentiellen Abfluss von ETH von Offline-Validator-Konten darstellt. Dies ermöglicht es dem Netzwerk, sich schließlich selbst zu heilen, indem die ETH inaktiver Validatoren verbrannt werden, bis ihr Guthaben 16 ETH erreicht. An diesem Punkt werden sie automatisch aus dem Validator-Pool entfernt. Die verbleibenden Online-Validatoren werden schließlich wieder mehr als 2/3 des Netzwerks ausmachen und so die erforderliche Supermajorität erreichen, um die Kette erneut zu finalisieren. </ExpandableCard>

<ExpandableCard title="How do I ensure I don't get slashed?">
Kurz gesagt, dies kann nie vollständig garantiert werden, aber wenn Sie in gutem Glauben handeln, einen Minderheits-Client betreiben und Ihre Signaturschlüssel jeweils nur auf einem Computer aufbewahren, ist das Risiko eines Slashings nahezu null.

Es gibt nur wenige spezifische Vorgehensweisen, die dazu führen können, dass ein Validator einem Slashing unterzogen und aus dem Netzwerk entfernt wird. Zum Zeitpunkt der Erstellung dieses Dokuments waren die aufgetretenen Slashings ausschließlich auf redundante Hardware-Setups zurückzuführen, bei denen Signaturschlüssel gleichzeitig auf zwei separaten Maschinen gespeichert wurden. Dies kann unbeabsichtigt zu einer <em>doppelten Abstimmung</em> (Double Vote) durch Ihre Schlüssel führen, was ein durch Slashing strafbares Vergehen ist.

Der Betrieb eines Supermajoritäts-Clients (jeder Client, der von über 2/3 des Netzwerks verwendet wird) birgt auch das Risiko eines potenziellen Slashings, falls dieser Client einen Fehler aufweist, der zu einem Chain-Fork führt. Dies kann zu einem fehlerhaften Fork führen, der finalisiert wird. Um zur beabsichtigten Kette zurückzukehren, müsste eine <em>Surround Vote</em> abgegeben werden, indem versucht wird, einen finalisierten Block rückgängig zu machen. Dies ist ebenfalls ein durch Slashing strafbares Vergehen und kann einfach durch den Betrieb eines Minderheits-Clients vermieden werden.

Äquivalente Fehler in einem <em>Minderheits-Client würden niemals abgeschlossen</em> und würden daher niemals zu einer Surround-Abstimmung, sondern einfach zu Inaktivitätsstrafen, <em>nicht zu Slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Erfahren Sie mehr über die Wichtigkeit, einen Minderheits-Client zu betreiben.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Erfahren Sie mehr über die Slashing-Prävention</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Which client is best?">
Einzelne Clients können sich in Bezug auf Leistung und Benutzeroberfläche geringfügig unterscheiden, da sie von verschiedenen Teams unter Verwendung einer Vielzahl von Programmiersprachen entwickelt werden. Dennoch ist keiner von ihnen der "Beste". Alle Produktions-Clients sind ausgezeichnete Software-Komponenten, die alle die gleichen Kernfunktionen zur Synchronisierung und Interaktion mit der Blockchain ausführen.

Da alle Produktions-Clients die gleiche Grundfunktionalität bieten, ist es sehr wichtig, dass Sie einen <strong>Minderheits-Client</strong> wählen, d. h. einen Client, der derzeit NICHT von einer Mehrheit der Validatoren im Netzwerk verwendet wird. Dies mag kontraintuitiv klingen, aber der Betrieb eines Majoritäts- oder Supermajoritäts-Clients setzt Sie einem erhöhten Slashing-Risiko aus, falls in diesem Client ein Fehler auftritt. Der Betrieb eines Minderheits-Clients begrenzt diese Risiken drastisch.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Erfahren Sie mehr darüber, warum Client-Diversität entscheidend ist</a> </ExpandableCard>

<ExpandableCard title="Can I just use a VPS (virtual private server)?">
Obwohl ein virtueller privater Server (VPS) als Ersatz für die Hardware zu Hause verwendet werden kann, sind der physische Zugang und der Standort Ihres Validator-Clients <em>sehr wohl von Bedeutung</em>. Zentralisierte Cloud-Lösungen wie Amazon Web Services oder Digital Ocean bieten den Komfort, keine Hardware beschaffen und betreiben zu müssen, gehen aber auf Kosten der Zentralisierung des Netzwerks.

Je mehr Validator-Clients auf einer einzigen zentralisierten Cloud-Speicherlösung laufen, desto gefährlicher wird es für diese Benutzer. Jedes Ereignis, das diese Anbieter offline schaltet, sei es durch einen Angriff, regulatorische Anforderungen oder einfach nur Strom-/Internetausfälle, führt dazu, dass jeder Validator-Client, der auf diesen Server angewiesen ist, gleichzeitig offline geht.

Offline-Strafen sind proportional zur Anzahl der anderen, die gleichzeitig offline sind. Die Verwendung eines VPS erhöht das Risiko, dass Offline-Strafen schwerwiegender ausfallen, und erhöht Ihr Risiko von quadratischem Verlust oder Slashing, falls der Ausfall groß genug ist. Um Ihr eigenes Risiko und das Risiko für das Netzwerk zu minimieren, wird den Benutzern dringend empfohlen, ihre eigene Hardware zu beschaffen und zu betreiben. </ExpandableCard>

<ExpandableCard title="How do I unlock my rewards or get my ETH back?">

Abhebungen jeglicher Art aus der Beaconchain erfordern die Angabe von Rücktrittsberechtigungen.

Neue Staker legen dies zum Zeitpunkt der Schlüsselgenerierung und Einzahlung fest. Bestehende Staker, die dies noch nicht festgelegt haben, können ihre Schlüssel upgraden, um diese Funktionalität zu unterstützen.

Sobald die Auszahlungsdaten festgelegt sind, werden Prämienzahlungen (über den ursprünglichen 32) periodisch an die Auszahlungsadresse ausgezahlt.

Um Ihr gesamtes Guthaben zu entsperren und zu erhalten, müssen Sie auch den Prozess des Verlassens Ihres Validators abschließen.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Auszahlungen</ButtonLink>\n</ExpandableCard>

## Weiterführende Lektüre {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) - _Eridian und Spacesider_
- [Das Problem der Client-Diversität bei Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Hilfe für die Client-Diversität](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client-Diversität auf der Konsensebene von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Anleitung: Kauf von Ethereum-Validator-Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Eth2-Tipps zur Slashing-Prävention](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
