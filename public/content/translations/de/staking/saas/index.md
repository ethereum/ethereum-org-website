---
title: Staking als Service
description: Erfahren Sie mehr über Staking als Service
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie, das in den Wolken schwebende Nashorn.
sidebarDepth: 2
summaryPoints:
  - Drittanbieter als Node-Betreiber kümmern sich um den Betrieb Ihres Validator-Client
  - Eine großartige Option für alle mit 32 ETH, die ungern mit der technischen Komplexität von Nodes umgehen
  - Weniger Vertrauen, doch Ihre Auszahlungsschlüssel bleiben bei Ihnen
---

## Was ist unter Staking-as-a-Service, also Staking als Service zu verstehen? {#what-is-staking-as-a-service}

Staking-as-a-Service („SaaS“) stellt eine Kategorie von Staking-Diensten dar, bei der Sie Ihre eigenen 32 ETH für einen Validator hinterlegen, aber den Node-Betrieb an einen Drittanbieter delegieren. In der Regel werden Sie in diesem Prozess durch die anfängliche Konfiguration geführt, einschließlich Schlüsselgenerierung und Hinterlegung, und dann laden Sie Ihre Signaturschlüssel für den Betreiber hoch. So kann der Service Ihren Validator in Ihrem Namen betreiben, für gewöhnlich gegen eine monatliche Gebühr.

## Warum per Service staken? {#why-stake-with-a-service}

Das Ethereum-Protokoll unterstützt keine Delegation von Staking, daher wurden diese Serviceleistungen aufgebaut, um die entsprechende Nachfrage zu befriedigen. Wenn Sie über 32 ETH zum Staking verfügen, sich aber davor scheuen, mit Hardware umzugehen, bieten SaaS-Dienste Ihnen die Möglichkeit, den schwierigen Teil zu delegieren, während Sie native Blockbelohnungen erhalten.

<CardGrid>
  <Card title="Dein eigener Validator" emoji=":desktop_computer:" description="Zahle deine 32 ETH ein, um deine eigenen Signaturschlüssel zu aktivieren, die am Ethereum-Konsens teilnehmen. Verfolge deinen Fortschritt auf Dashboards und sieh zu, wie deine ETH-Belohnungen wachsen." />
  <Card title="Einfacher Start" emoji="🏁" description="Vergiss Hardware-Anforderungen, Einrichtung, Node-Wartung und Upgrades. Bei SaaS-Anbietern kannst du den schwierigen Teil auslagern: Lade deine Signaturschlüssel hoch, damit sie gegen eine geringe Gebühr einen Validator für dich betreiben." />
  <Card title="Begrenze dein Risiko" emoji=":shield:" description="In vielen Fällen musst du den Zugriff auf die Schlüssel, die das Abheben oder Übertragen von gestakten Mitteln ermöglichen, nicht abgeben. Diese unterscheiden sich von den Signaturschlüsseln und können separat aufbewahrt werden, um dein Risiko als Staker zu begrenzen (aber nicht auszuschließen)." />
</CardGrid>

<StakingComparison page="saas" />

## Was zu beachten ist {#what-to-consider}

Es kommen immer mehr SaaS-Anbieter auf den Markt, die Ihnen beim Staking Ihrer ETH helfen. Doch alle haben ihre eigenen Vorteile und Risiken. Bei allen SaaS-Optionen müssen Sie im Vergleich zum Home-Staking mehr Vertrauen aufbringen. SaaS-Optionen können zusätzlichen Code haben, der die Ethereum-Clients umgibt, der nicht offen oder überprüfbar ist. SaaS beeinträchtigt zudem die Dezentralisierung des Netzwerks. Je nach Einstellung haben Sie möglicherweise keine Kontrolle über Ihren Validator – der Betreiber könnte mit Ihrem ETH unehrlich handeln.

Attributindikatoren werden unten verwendet, um nennenswerte Stärken oder Schwächen eines gelisteten SaaS-Anbieters zu signalisieren. Nutzen Sie bei Ihrer Auswahl eines Diensts, dem Sie Ihr Staking anvertrauen möchten, diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren.

<StakingConsiderations page="saas" />

## Erkunden Sie die Staking-Dienstleister {#saas-providers}

Hier sind einige verfügbare SaaS-Anbieter. Verwenden Sie die obigen Indikatoren für die Beurteilung dieser Dienste

<ProductDisclaimer />

### SaaS-Anbieter

<StakingProductsCardGrid category="saas" />

Bitte beachten Sie, wie wichtig es ist, die [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) zu unterstützen, da dies die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Dienste, die nachweislich die Nutzung von Mehrheits-Clients einschränken, sind gekennzeichnet mit <em style={{ textTransform: "uppercase" }}>"Vielfalt der Ausführungskunden"</em> and <em style={{ textTransform: "uppercase" }}>"Vielfalt der Konsenskunden"</em>.

### Schlüssel-Generatoren

<StakingProductsCardGrid category="keyGen" />

Sie haben einen Vorschlag zu einem SaaS-Anbieter, den wir noch nicht haben? Sehen Sie sich unsere [Produktlistungsrichtlinie](/contributing/adding-staking-products/) an, um zu prüfen, ob sie passt, und um sie zur Überprüfung einzureichen.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wer hält meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter. In der Regel werden Sie durch die Einrichtung aller benötigten Signaturschlüssel (einer pro 32 ETH) und das Hochladen dieser Schlüssel zu Ihrem Anbieter geleitet, damit dieser in Ihrem Namen validieren kann. Die Signaturschlüssel allein bieten nicht die Möglichkeit, Ihr Geld abzuheben, zu überweisen oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für einen Konsens abzugeben, was, wenn es nicht richtig gemacht wird, zu Offline-Strafen oder Slashing führen kann.
</ExpandableCard>

<ExpandableCard title="Es gibt also zwei Arten von Schlüsseln?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jedes Konto besteht aus BLS-<em>Signaturschlüsseln</em> und BLS-<em>Abhebungsschlüsseln</em>. Damit ein Validator den Zustand der Blockchain attestieren, an Synchronisierungsausschüssen teilnehmen und Blöcke vorschlagen kann, müssen die Signaturschlüssel für einen Validator-Kunden leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und werden daher naturgemäß als "Hot Keys" betrachtet. Dies ist eine Voraussetzung für Ihren Validator, um attestieren zu können. Daher werden die Schlüssel, die zum Überweisen oder Abheben von Geldern verwendet werden, aus Sicherheitsgründen getrennt.

Die BLS-Abhebungsschlüssel werden verwendet, um eine einmalige Nachricht zu signieren, die angibt, an welches Execution-Layer-Konto Staking-Belohnungen und ausgetretene Mittel gehen sollen. Sobald diese Nachricht gesendet wurde, werden die <em>BLS-Abhebungsschlüssel</em> nicht mehr benötigt. Stattdessen wird die Kontrolle über abgehobene Mittel dauerhaft an die von Ihnen angegebene Adresse delegiert. Auf diese Weise können Sie eine Abhebungsadresse festlegen, die durch Ihre eigene Cold Storage gesichert ist, um das Risiko für Ihre Validator-Fonds zu minimieren, selbst wenn jemand anderes die Signaturschlüssel Ihres Validators kontrolliert.

Das Aktualisieren der Auszahlungsberechtigungen ist ein erforderlicher Schritt, um Auszahlungen zu ermöglichen\*. Dieser Prozess beinhaltet das Generieren der Abhebungsschlüssel mit Hilfe Ihrer Mnemonic Seed Phrase.

<strong>Stellen Sie sicher, dass Sie diese Seed-Phrase sicher aufbewahren, sonst können Sie Ihre Auszahlungsschlüssel nicht generieren, wenn es soweit ist.</strong>

\*Staker, die bei der Ersteinzahlung eine Auszahlungsadresse angegeben haben, müssen dies nicht festlegen. Bitte wenden Sie sich an Ihren SaaS-Anbieter, um Unterstützung bei der Vorbereitung Ihres Validators zu erhalten. </ExpandableCard>

<ExpandableCard title="Wann kann ich abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">\nStaker müssen (sofern nicht bereits bei der Ersteinzahlung geschehen) eine Auszahlungsadresse bereitstellen. Belohnungen werden daraufhin automatisch alle paar Tage in regelmäßigen Abständen ausgezahlt.

Validatoren haben auch die Möglichkeit, ihre Tätigkeit als Validator zu beenden. Das ermöglicht die Auszahlung ihres restlichen ETH-Guthabens. Konten, die eine Auszahlungsadresse angegeben und den Austrittsprozess abgeschlossen haben, erhalten ihr gesamtes Guthaben bei der nächsten Validatorendurchsicht auf die angegebene Auszahlungsadresse.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Auszahlungen</ButtonLink>\n</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslasht werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines SaaS-Anbieters vertrauen Sie den Betrieb Ihrer Nodes jemand anderem an. Dies birgt das Risiko einer schlechten Node-Leistung, auf die Sie keinen Einfluss haben. Falls Ihr Validator geslashed wird, wird Ihr Validator-Guthaben bestraft und zwangsweise aus dem Validator-Pool entfernt.

Nach Abschluss des Slashing-/Austrittsprozesses werden diese Mittel an die dem Validator zugewiesene Auszahlungsadresse übertragen. Dies erfordert die Angabe einer Auszahlungsadresse zur Aktivierung. Diese Adresse kann bei der anfänglichen Einzahlung angegeben worden sein. Falls nicht, müssen die Auszahlungsschlüssel des Validators verwendet werden, um eine Nachricht zu unterschreiben, die eine Auszahlungsadresse angibt. Wenn keine Auszahlungsadresse angegeben wurde, bleibt das Guthaben bis zur Angabe gesperrt.

Für weitere Informationen zu Garantien oder Versicherungsoptionen sowie zur Anleitung zur Bereitstellung einer Abhebungsadresse wenden Sie sich bitte an Ihren individuellen SaaS-Anbieter. Wenn Sie lieber die volle Kontrolle über Ihr Validator Setup haben möchten, [erfahren Sie mehr darüber, wie Sie Ihr ETH alleine einsetzen](/staking/solo/). </ExpandableCard>

## Weiterführende Lektüre {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) - _Eridian und Spacesider_
- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
