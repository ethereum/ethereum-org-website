---
title: Home-Staking Ihrer ETH
description: Ein Überblick darüber, wie Sie mit dem Home-Staking Ihrer ETH beginnen können
lang: de
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Erhalten Sie maximale Belohnungen direkt vom Protokoll, indem Sie Ihren Validator ordnungsgemäß funktionieren lassen und online halten
  - Betreiben Sie Hardware zu Hause und tragen Sie persönlich zur Sicherheit und Dezentralisierung des Ethereum-Netzwerks bei
  - Beseitigen Sie Vertrauensannahmen und geben Sie niemals die Kontrolle über die Schlüssel zu Ihren Geldern auf
---

## Was ist Home-Staking? {#what-is-solo-staking}

Home-Staking ist der Vorgang, [einen Ethereum-Knoten zu betreiben](/run-a-node/), der mit dem Internet verbunden ist, und mindestens 32 ETH einzuzahlen, um einen [Validator](#faq) zu aktivieren, was Ihnen die Möglichkeit gibt, direkt am Konsens des Netzwerks teilzunehmen.

Home-Staking ist der direkteste Weg zum Staking. Keine Smart Contracts, Betreiber oder Verwahrer stehen zwischen Ihnen und dem Protokoll. Sie halten Ihre eigenen Schlüssel, nehmen aktiv an der Validierung des [Ethereum](/)-Netzwerks teil und erhalten Netzwerk-Belohnungen direkt. Jede andere Staking-Methode fügt dieser Kernaktivität des Netzwerks weitere Technologie-, Middleware- oder Service-Schichten hinzu.

**Home-Staking erhöht die Dezentralisierung des Ethereum-Netzwerks**, was Ethereum zensurresistenter und robuster gegen Angriffe macht. Andere Staking-Methoden helfen dem Netzwerk möglicherweise nicht auf die gleiche Weise. Home-Staking ist die beste Staking-Option zur Sicherung von Ethereum.

Ein Ethereum-Knoten besteht sowohl aus einem Client der Ausführungsschicht (EL) als auch aus einem Client der Konsensschicht (CL). Diese Clients sind Software, die zusammen mit einem gültigen Satz von Schlüsseln zum Signieren zusammenarbeiten, um Transaktionen und Blöcke zu verifizieren, den korrekten Kopf der Chain zu bezeugen, Bezeugungen zu aggregieren und Blöcke vorzuschlagen.

Home-Staker sind für den Betrieb der Hardware verantwortlich, die zum Ausführen dieser Clients erforderlich ist. Es wird dringend empfohlen, dafür einen dedizierten Rechner zu verwenden, den Sie von zu Hause aus betreiben – dies ist äußerst vorteilhaft für die Gesundheit des Netzwerks.

Ein Home-Staker erhält Belohnungen direkt vom Protokoll dafür, dass er seinen Validator ordnungsgemäß funktionieren lässt und online hält.

## Warum von zu Hause aus staken? {#why-stake-solo}

Home-Staking geht mit mehr Verantwortung einher, bietet Ihnen jedoch maximale Kontrolle über Ihre Gelder und Ihr Staking-Setup.

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="Home-Staker erhalten 100 % der Protokoll-Belohnungen, die direkt vom Protokoll ausgezahlt werden, während Ihr Validator online ist." />
  <Card title="Selbstsouveränität" icon={<KeyRound />} description="Behalten Sie jederzeit Ihre eigenen Schlüssel und die volle Verwahrung Ihrer Gelder. Wählen Sie die Kombination aus Clients und Hardware, mit der Sie Ihr Risiko minimieren können. Kein Dritter kann diese Entscheidungen für Sie treffen oder Ihre Abhebungen einschränken." />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="Home-Staker, die Minderheits-Clients auf Hardware ausführen, die über viele Standorte verteilt ist, stärken die Dezentralisierung und Sicherheit des Netzwerks." />
</Grid>

## Überlegungen vor dem Home-Staking {#considerations-before-staking-solo}

So sehr wir uns auch wünschen, dass Home-Staking für jeden zugänglich und risikofrei ist, entspricht dies nicht der Realität. Es gibt einige praktische und ernsthafte Überlegungen, die Sie beachten sollten, bevor Sie sich für das Home-Staking Ihrer ETH entscheiden.

<ExpandableCard title="Pflichtlektüre" eventCategory="SoloStaking" eventName="clicked required reading">
Wenn Sie Ihren eigenen Knoten betreiben, sollten Sie etwas Zeit investieren, um zu lernen, wie Sie die von Ihnen gewählte Software verwenden. Dies beinhaltet das Lesen relevanter Dokumentationen und das Verfolgen der Kommunikationskanäle dieser Entwicklerteams.

Je mehr Sie über die von Ihnen ausgeführte Software und die Funktionsweise von Proof-of-Stake (PoS) verstehen, desto weniger riskant ist es für Sie als Staker und desto einfacher wird es sein, als Knotenbetreiber eventuell auftretende Probleme zu beheben.
</ExpandableCard>

<ExpandableCard title="Sicherer Umgang mit Computern" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Die Einrichtung eines Knotens erfordert ein gewisses Maß an Vertrautheit im Umgang mit Computern, obwohl neue Tools dies im Laufe der Zeit erleichtern. Ein Verständnis der Befehlszeilenschnittstelle ist hilfreich, aber nicht mehr zwingend erforderlich.

Es erfordert auch eine sehr grundlegende Hardware-Einrichtung und ein gewisses Verständnis der empfohlenen Mindestspezifikationen.
</ExpandableCard>

<ExpandableCard title="Hardware-Anforderungen" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Aktuelle Community-Richtlinien für Validator-Hardware und Bandbreite werden in den [Hardware- und Bandbreitenempfehlungen (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) gepflegt. Planen Sie als groben Richtwert eine 4 TB NVMe SSD, 64 GB RAM (weniger kann funktionieren, aber dies ist der empfohlene Spielraum), eine solide moderne Multi-Core-CPU und eine Internetverbindung von etwa 50 Mbit/s Download / 25 Mbit/s Upload ein.

Da das Fusaka-Upgrade PeerDAS eingeführt hat, muss ein Staking-Knoten nur noch einen Bruchteil der Blob-Daten des Netzwerks speichern und herunterladen, was die Festplatten- und Bandbreitenanforderungen für Home-Staker erheblich reduziert.
</ExpandableCard>

<ExpandableCard title="Sichere Schlüsselverwaltung" eventCategory="SoloStaking" eventName="clicked secure key management">
Genauso wie private Schlüssel Ihre Ethereum-Adresse sichern, müssen Sie Schlüssel speziell für Ihren Validator generieren. Sie müssen verstehen, wie Sie Seed-Phrasen oder private Schlüssel sicher aufbewahren.{' '}

[Ethereum-Sicherheit und Betrugsprävention](/security/)
</ExpandableCard>

<ExpandableCard title="Wartung" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware fällt gelegentlich aus, Netzwerkverbindungen weisen Fehler auf und Client-Software muss gelegentlich aktualisiert werden. Die Wartung von Knoten ist unvermeidlich und erfordert gelegentlich Ihre Aufmerksamkeit. Sie sollten sicherstellen, dass Sie über erwartete Netzwerk-Upgrades oder andere kritische Client-Upgrades informiert bleiben.
</ExpandableCard>

<ExpandableCard title="Zuverlässige Betriebszeit" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ihre Belohnungen sind proportional zu der Zeit, in der Ihr Validator online ist und ordnungsgemäß bezeugt. Ausfallzeiten ziehen Strafen nach sich, die proportional dazu sind, wie viele andere Validatoren gleichzeitig offline sind, führen aber [nicht zu Slashing](#faq). Die Bandbreite ist ebenfalls wichtig, da die Belohnungen für Bezeugungen, die nicht rechtzeitig eingehen, verringert werden. Die Anforderungen variieren, aber die aktuellen [Hardware- und Bandbreitenempfehlungen (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) schlagen etwa 50 Mbit/s Download und 25 Mbit/s Upload vor.
</ExpandableCard>

<ExpandableCard title="Slashing-Risiko" eventCategory="SoloStaking" eventName="clicked slashing risk">
Im Gegensatz zu Inaktivitätsstrafen für das Offline-Sein ist <em>Slashing</em> eine viel schwerwiegendere Strafe, die für böswillige Vergehen reserviert ist. Indem Sie einen Minderheits-Client ausführen und Ihre Schlüssel jeweils nur auf einem Rechner geladen haben, wird Ihr Risiko, geslasht zu werden, minimiert. Dennoch müssen sich alle Staker der Risiken von Slashing bewusst sein.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mehr über Slashing und den Validator-Lebenszyklus</a>
</ExpandableCard>

## Vergleich der Staking-Optionen {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Wie es funktioniert {#how-it-works}

<StakingHowSoloWorks />

Sobald Ihr Knoten synchronisiert ist und Ihre Schlüssel generiert wurden, zahlen Sie Ihren Stake ein, um Ihren Validator zu aktivieren. Ein einzelner Validator erfordert mindestens 32 ETH und kann bis zu 2048 ETH halten. Das Netzwerk erkennt Einzahlungen in etwa 13 Minuten, aber neue Validatoren durchlaufen eine Aktivierungswarteschlange, bevor sie mit dem Bezeugen beginnen; deren Länge variiert je nach Nachfrage.

Während Sie aktiv sind, verdienen Sie ETH-Belohnungen. Mit Compounding-Auszahlungsberechtigungen (0x02) werden Belohnungen automatisch zu Ihrem Stake hinzugefügt; mit regulären Auszahlungsberechtigungen (0x01) werden Belohnungen über die anfänglichen 32 ETH hinaus regelmäßig an Ihre Adresse für Abhebungen überwiesen.

Falls gewünscht, können Sie als Validator einen Austritt vollziehen, wodurch die Anforderung, online zu sein, entfällt und alle weiteren Belohnungen gestoppt werden. Ihr verbleibendes Guthaben wird dann auf die Adresse für Abhebungen abgehoben, die Sie bei der Einrichtung angegeben haben. Austritte können mit Ihren Schlüsseln zum Signieren des Validators initiiert oder direkt von Ihrer Adresse für Abhebungen mit einer Transaktion auf der Ausführungsschicht ausgelöst werden, sodass die ultimative Kontrolle über Ihre Gelder immer bei Ihrer Adresse für Abhebungen liegt.

### Compounding und das Maximum von 2048 ETH {#compounding}

Validatoren haben eine von zwei Arten von Auszahlungsberechtigungen:

- **Reguläre Abhebungen (0x01)**: Das effektive Guthaben des Validators ist auf 32 ETH begrenzt, und jedes darüber hinausgehende Guthaben wird alle paar Tage automatisch an Ihre Adresse für Abhebungen überwiesen.
- **Compounding (0x02)**: Das effektive Guthaben des Validators kann auf bis zu 2048 ETH anwachsen. Belohnungen werden automatisch verzinst (Compounding), und Sie verdienen Belohnungen für jeden ganzen ETH über dem Minimum von 32 ETH, sodass Sie flexible Beträge wie 40 ETH staken können, nicht nur Vielfache von 32. Nur Guthaben über 2048 ETH wird automatisch überwiesen; alles andere abzuheben bedeutet, manuell eine teilweise Abhebung von Ihrer Adresse für Abhebungen auszulösen, was Gas kostet.

Wenn Sie mehrere Validatoren betreiben, können Sie diese zu einem einzigen Compounding-Validator konsolidieren, ohne das Netzwerk zu verlassen und wieder beizutreten, was Ihren Wartungsaufwand reduziert. Die Konsolidierung wird von Ihrer Adresse für Abhebungen angefordert und unterliegt Verarbeitungswarteschlangen. Der Wechsel eines Validators von 0x01- zu 0x02-Berechtigungen verwendet denselben Mechanismus und **kann nicht rückgängig gemacht werden**, ohne vollständig auszutreten und erneut einzuzahlen.

[Mehr über Staking-Abhebungen](/staking/withdrawals/)

## Legen Sie auf dem Staking Launchpad los {#get-started-on-the-staking-launchpad}

Das Staking Launchpad ist eine Open-Source-Anwendung, die Ihnen hilft, ein Staker zu werden. Es führt Sie durch die Auswahl Ihrer Clients, generiert Ihre Schlüssel und zahlt Ihre ETH in den Staking-Einlage-Vertrag ein. Eine Checkliste wird bereitgestellt, um sicherzustellen, dass Sie alles abgedeckt haben, um Ihren Validator sicher einzurichten.

<StakingLaunchpadWidget />

## Was bei Tools zur Einrichtung von Knoten und Clients zu beachten ist {#node-tool-considerations}

Es gibt eine wachsende Anzahl von Tools und Diensten, die Ihnen beim Home-Staking Ihrer ETH helfen, aber jedes bringt unterschiedliche Risiken und Vorteile mit sich.

Im Folgenden werden Attributindikatoren verwendet, um bemerkenswerte Stärken oder Schwächen eines aufgelisteten Staking-Tools zu signalisieren. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie auswählen, welche Tools Sie auf Ihrer Staking-Reise unterstützen sollen.

<StakingConsiderations page="solo" />

## Entdecken Sie Tools zur Einrichtung von Knoten und Clients {#node-and-client-tools}

Es stehen verschiedene Optionen zur Verfügung, die Ihnen bei Ihrer Einrichtung helfen. Verwenden Sie die obigen Indikatoren, um sich durch die unten stehenden Tools führen zu lassen.

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

## Squad-Staking: Home-Staking mit Fehlertoleranz {#squad-staking}

**Verteilte Validator-Technologie (DVT)** ermöglicht es, einen einzelnen Validator über einen Cluster von Rechnern anstatt nur auf einem auszuführen. Der Validator-Schlüssel wird mithilfe der verteilten Schlüsselgenerierung in Anteile aufgeteilt, und ein Schwellenwert des Clusters (zum Beispiel beliebige 3 von 4 Knoten) muss gemeinsam signieren; der vollständige Schlüssel existiert niemals auf einem einzelnen Rechner. Wenn ein Rechner ausfällt, offline geht oder falsch konfiguriert ist, sorgt der Rest des Clusters dafür, dass der Validator weiterhin bezeugt.

Für Home-Staker ermöglicht dies „Squad-Staking“: sich mit Freunden oder anderen Community-Mitgliedern zusammenzuschließen, um Validatoren gemeinsam zu betreiben, wodurch die Single Points of Failure eines Solo-Setups beseitigt und das Risiko von Slashing durch einen einzelnen fehlerhaften Rechner verringert wird. Obol und SSV Network bieten beide produktionsreife DVT-Implementierungen an, die heute im Home-Staking, Staking as a Service und in Staking-Pools verwendet werden.

[Mehr über Verteilte Validator-Technologie (DVT)](/staking/dvt/)

## Validatoren für ein Staking-Protokoll betreiben {#run-validators-for-a-staking-protocol}

Wenn Sie über die Hardware und die Fähigkeiten verfügen, einen Knoten zu betreiben, aber weniger als 32 ETH haben, gleichen einige Staking-Protokolle Ihren Validator mit ETH von ihren Pooled-Stakern ab. Sie hinterlegen eine kleinere Kaution als Sicherheit und betreiben den Validator auf Ihrem eigenen Rechner; das Protokoll stellt den Rest des Stakes zur Verfügung, und Sie verdienen einen Anteil an den Belohnungen.

Dies ist ein hybrider Ansatz: Sie behalten die Verantwortlichkeiten (und die Zufriedenheit) des Betriebs Ihrer eigenen Hardware, aber Ihr Validator arbeitet unter den Smart Contracts, der Governance und den Leistungsregeln des Protokolls, was ein anderes Vertrauensprofil darstellt als das direkte Staken Ihrer eigenen ETH.

Erfahren Sie mehr darüber, wie diese Protokolle funktionieren, einschließlich ihrer Vertrauensannahmen und Token-Mechaniken, auf der [Seite für Pooled Staking](/staking/pools/).

## Weitere Möglichkeiten, Ihren Knoten zu nutzen {#more-ways-to-use-your-node}

Sie müssen überhaupt nicht staken, um Ihre Fähigkeiten im Knotenbetrieb einzusetzen. Jeder kann [einen Ethereum-Knoten betreiben](/run-a-node/), ohne ETH einzuzahlen. Sie erhalten eine selbst verifizierte Sicht auf die Chain, Ihren eigenen privaten Endpunkt zum Senden von Transaktionen und zur Interaktion mit Anwendungen, und Sie tragen zur Gesundheit und Widerstandsfähigkeit des Netzwerks bei. Der Betrieb eines Knotens ist auch eine gute Möglichkeit, Erfahrungen zu sammeln, bevor Sie einen Validator aktivieren, ohne dass ETH gefährdet sind.

<StakingCommunityCallout className="my-16" />

## Häufig gestellte Fragen {#faq}

Dies sind einige der häufigsten Fragen zum Staking, über die es sich lohnt, Bescheid zu wissen.

<ExpandableCard title="Was ist ein Validator?">

Ein <em>Validator</em> ist eine virtuelle Entität, die auf Ethereum existiert und am Konsens des Ethereum-Protokolls teilnimmt. Validatoren werden durch ein Guthaben, einen öffentlichen Schlüssel und andere Eigenschaften repräsentiert. Ein <em>Validator-Client</em> ist die Software, die im Namen des Validators handelt, indem sie seinen privaten Schlüssel hält und verwendet. Ein einzelner Validator-Client kann viele Schlüsselpaare halten und viele Validatoren steuern.

</ExpandableCard>

<ExpandableCard title="Kann ich mehr als 32 ETH einzahlen?">
Ja. Ein Validator mit _Compounding_-Auszahlungsberechtigungen (0x02) kann ein effektives Guthaben von bis zu 2048 ETH halten, während das Minimum zur Aktivierung bei 32 ETH bleibt. Belohnungen für einen Compounding-Validator werden automatisch zu seinem Stake hinzugefügt, und er verdient Belohnungen für jeden ganzen ETH über dem Minimum von 32 ETH, sodass Sie Beträge staken können, die keine Vielfachen von 32 sind. Siehe [Compounding und das Maximum von 2048 ETH](#compounding).

Validatoren mit Berechtigungen für _reguläre Abhebungen_ (0x01) bleiben auf ein effektives Guthaben von 32 ETH begrenzt, wobei jedes darüber hinausgehende Guthaben alle paar Tage automatisch an die Adresse für Abhebungen überwiesen wird.

Bei einem Compounding-Validator wird nur das Guthaben über dem Maximum von 2048 ETH automatisch überwiesen. Um etwas darunter abzuheben, lösen Sie eine teilweise Abhebung von Ihrer Adresse für Abhebungen aus (eine Transaktion, die Gas kostet), wodurch jedes Guthaben über dem Minimum von 32 ETH abgehoben werden kann. Wenn Sie mehrere Validatoren betreiben, können Sie diese auch zu einem einzigen Compounding-Validator konsolidieren, ohne das Netzwerk zu verlassen.

[Mehr über Staking-Abhebungen](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Werde ich geslasht, wenn ich offline gehe? (TL;DR: Nein.)">
Offline zu gehen, wenn das Netzwerk ordnungsgemäß endgültig wird, führt NICHT zu Slashing. Kleine <em>Inaktivitätsstrafen</em> fallen an, wenn Ihr Validator für eine bestimmte Epoche (jeweils 6,4 Minuten lang) nicht zur Bezeugung verfügbar ist, aber dies unterscheidet sich stark von <em>Slashing</em>. Diese Strafen sind etwas geringer als die Belohnung, die Sie verdient hätten, wenn der Validator zur Bezeugung verfügbar gewesen wäre, und Verluste können mit ungefähr der gleichen Zeit, die Sie wieder online sind, wieder hereingeholt werden.

Beachten Sie, dass Strafen für Inaktivität proportional dazu sind, wie viele Validatoren gleichzeitig offline sind. In Fällen, in denen ein großer Teil des Netzwerks auf einmal offline ist, sind die Strafen für jeden dieser Validatoren höher, als wenn ein einzelner Validator nicht verfügbar ist.

In extremen Fällen, wenn das Netzwerk nicht mehr endgültig wird, weil mehr als ein Drittel der Validatoren offline ist, erleiden diese Benutzer ein sogenanntes <em>quadratisches Inaktivitätsleck</em>, was einen exponentiellen Abfluss von ETH von Offline-Validator-Konten bedeutet. Dies ermöglicht es dem Netzwerk, sich schließlich selbst zu heilen, indem es die ETH inaktiver Validatoren verbrennt, bis ihr Guthaben 16 ETH erreicht, woraufhin sie automatisch aus dem Validator-Pool ausgeworfen werden. Die verbleibenden Online-Validatoren werden schließlich wieder über 2/3 des Netzwerks ausmachen und die Supermehrheit erfüllen, die erforderlich ist, um die Chain wieder endgültig zu machen.
</ExpandableCard>

<ExpandableCard title="Wie stelle ich sicher, dass ich nicht geslasht werde?">
Kurz gesagt, dies kann nie vollständig garantiert werden, aber wenn Sie in gutem Glauben handeln, einen Minderheits-Client ausführen und Ihre Schlüssel zum Signieren immer nur auf einem Rechner aufbewahren, ist das Risiko, geslasht zu werden, nahezu null.

Es gibt nur wenige spezifische Wege, die dazu führen können, dass ein Validator geslasht und aus dem Netzwerk ausgeworfen wird. Zum Zeitpunkt des Schreibens waren die aufgetretenen Slashings ausschließlich das Produkt redundanter Hardware-Setups, bei denen Schlüssel zum Signieren auf zwei separaten Rechnern gleichzeitig gespeichert wurden. Dies kann versehentlich zu einer <em>doppelten Stimme</em> von Ihren Schlüsseln führen, was ein Vergehen ist, das mit Slashing bestraft wird.

Die Ausführung eines Supermehrheits-Clients (jeder Client, der von über 2/3 des Netzwerks verwendet wird) birgt ebenfalls das Risiko eines potenziellen Slashings, falls dieser Client einen Fehler aufweist, der zu einem Chain-Fork führt. Dies kann zu einem fehlerhaften Fork, der endgültig wird. Um zur beabsichtigten Chain zurückzukehren, müsste eine <em>Surround-Stimme</em> abgegeben werden, indem versucht wird, einen endgültigen Block rückgängig zu machen. Dies ist ebenfalls ein Vergehen, das mit Slashing bestraft wird, und kann einfach vermieden werden, indem stattdessen ein Minderheits-Client ausgeführt wird.

Äquivalente Fehler in einem <em>Minderheits-Client würden niemals endgültig werden</em> und somit niemals zu einer Surround-Stimme führen, sondern lediglich zu Inaktivitätsstrafen, <em>nicht zu Slashing</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Erfahren Sie mehr über die Wichtigkeit der Ausführung eines Minderheits-Clients.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Erfahren Sie mehr über Belohnungen, Strafen und Slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Welcher Client ist der beste?">
Einzelne Clients können in Bezug auf Leistung und Benutzeroberfläche leicht variieren, da jeder von verschiedenen Teams unter Verwendung einer Vielzahl von Programmiersprachen entwickelt wird. Davon abgesehen ist keiner von ihnen der „Beste“. Alle Produktions-Clients sind hervorragende Software, die alle dieselben Kernfunktionen ausführen, um sich mit der Blockchain zu synchronisieren und mit ihr zu interagieren.

Da alle Produktions-Clients dieselbe grundlegende Funktionalität bieten, ist es tatsächlich sehr wichtig, dass Sie einen <strong>Minderheits-Client</strong> wählen, d. h. jeden Client, der derzeit NICHT von einer Mehrheit der Validatoren im Netzwerk verwendet wird. Dies mag kontraintuitiv klingen, aber die Ausführung eines Mehrheits- oder Supermehrheits-Clients setzt Sie im Falle eines Fehlers in diesem Client einem erhöhten Risiko von Slashing aus. Die Ausführung eines Minderheits-Clients begrenzt diese Risiken drastisch.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Erfahren Sie mehr darüber, warum Client-Diversität entscheidend ist</a>
</ExpandableCard>

<ExpandableCard title="Kann ich einfach einen VPS (Virtual Private Server) verwenden?">
Obwohl ein Virtual Private Server (VPS) als Ersatz für Heim-Hardware verwendet werden kann, <em>spielt</em> der physische Zugriff und der Standort Ihres Validator-Clients <em>eine Rolle</em>. Zentralisierte Cloud-Lösungen wie Amazon Web Services oder Digital Ocean bieten den Komfort, keine Hardware beschaffen und betreiben zu müssen, auf Kosten der Zentralisierung des Netzwerks.

Je mehr Validator-Clients auf einer einzigen zentralisierten Cloud-Speicherlösung ausgeführt werden, desto gefährlicher wird es für diese Benutzer. Jedes Ereignis, das diese Anbieter offline nimmt, sei es durch einen Angriff, behördliche Anforderungen oder einfach nur Strom-/Internetausfälle, führt dazu, dass jeder Validator-Client, der auf diesen Server angewiesen ist, gleichzeitig offline geht.

Offline-Strafen sind proportional dazu, wie viele andere gleichzeitig offline sind. Die Verwendung eines VPS erhöht das Risiko erheblich, dass Offline-Strafen schwerwiegender ausfallen, und erhöht Ihr Risiko eines quadratischen Lecks oder Slashings, falls der Ausfall groß genug ist. Um Ihr eigenes Risiko und das Risiko für das Netzwerk zu minimieren, wird Benutzern dringend empfohlen, ihre eigene Hardware zu beschaffen und zu betreiben.
</ExpandableCard>

<ExpandableCard title="Wie schalte ich meine Belohnungen frei oder bekomme meine ETH zurück?">

Für jede Abhebung muss für Ihren Validator eine Adresse für Abhebungen festgelegt sein. Neue Staker legen diese zum Zeitpunkt der Schlüsselgenerierung und Einzahlung fest. Staker aus den Anfangstagen des Netzwerks, die noch keine Adresse für Abhebungen festgelegt haben, müssen ihre Auszahlungsberechtigungen aktualisieren, bevor sie abheben können.

Bei Validatoren mit Berechtigungen für reguläre Abhebungen (0x01) werden Belohnungszahlungen (angesammelte ETH über die anfänglichen 32 hinaus) regelmäßig automatisch an die Adresse für Abhebungen verteilt. Bei Compounding-Validatoren (0x02) bleiben die Belohnungen gestaket und werden automatisch verzinst. Sie können jedes Guthaben über 32 ETH abheben, indem Sie eine teilweise Abhebung von Ihrer Adresse für Abhebungen auslösen.

Um Ihr gesamtes Guthaben freizuschalten und zurückzuerhalten, müssen Sie einen Austritt Ihres Validators vollziehen. Sie können dies mit Ihren Schlüsseln zum Signieren des Validators tun oder es direkt von Ihrer Adresse für Abhebungen mit einer Transaktion auf der Ausführungsschicht auslösen, was bedeutet, dass Ihre Gelder auch dann wiederherstellbar bleiben, wenn Ihre Schlüssel zum Signieren verloren gehen.

<ButtonLink href="/staking/withdrawals/">Mehr über Staking-Abhebungen</ButtonLink>
</ButtonLink>

## Weiterführende Literatur {#further-reading}

- [Statistiken zur Client-Diversität und Migrationsleitfäden](https://clientdiversity.org/)
- [Unterstützung der Client-Diversität](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client-Diversität auf der Konsensschicht von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Anleitung: Kauf von Ethereum-Validator-Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Hardware- und Bandbreitenempfehlungen](https://eips.ethereum.org/EIPS/eip-7870)
- [Das Pectra-Upgrade: maximales effektives Guthaben und mehr](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />