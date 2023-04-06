---
title: Staking als Service
description: Eine Übersicht darüber, wie man mit gepooltem ETH-Staking beginnen kann
lang: de
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
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
  <Card title="Ihr eigener Validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />    
  <Card title="Einfach starten" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you to outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Schränken Sie Ihr Risiko ein" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different than the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Bitte beachten {#what-to-consider}

Es gibt eine wachsende Anzahl von SaaS-Anbietern, die Ihnen beim Staken Ihres ETH helfen, doch jeder hat eigene Vorteile und Risiken. Sie sollten bedenken, dass alle SaaS-Optionen im Vergleich zum Home-Staking zusätzliches Vertrauen erfordern. SaaS-Optionen können zusätzlichen Code haben, der die Ethereum-Clients umgibt, der nicht offen oder überprüfbar ist. SaaS beeinträchtigt zudem die Dezentralisierung des Netzwerks. Je nach Einstellung haben Sie möglicherweise keine Kontrolle über Ihren Validator – der Betreiber könnte mit Ihrem ETH unehrlich handeln.

Attributindikatoren werden unten verwendet, um nennenswerte Stärken oder Schwächen eines gelisteten SaaS-Anbieters zu signalisieren. Nutzen Sie bei Ihrer Auswahl eines Diensts, dem Sie Ihr Staking anvertrauen möchten, diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren.

<StakingConsiderations page="saas" />

## Erkunden Sie die Staking-Dienstleister {#saas-providers}

Nachfolgend finden Sie einige verfügbare SaaS-Anbieter. Verwenden Sie die obigen Indikatoren für die Beurteilung dieser Dienste

<InfoBanner emoji="⚠️" isWarning>
Hinweis: Es ist wichtig, dass sie die <a href="/developers/docs/nodes-and-clients/client-diversity/">Client-Diversität</a> unterstützen, denn das erhöht die Netzsicherheit und begrenzt Ihre Risiken. Dienstleister, die nachweislich die Mehrzahl der Kunden begrenzen, sind wie folgt markiert <em style="text-transform: uppercase;">„Diverse Clients."</em>
</InfoBanner>

#### SaaS-Anbieter

<StakingProductsCardGrid category="saas" />

#### Schlüssel-Generatoren

<StakingProductsCardGrid category="keyGen" />

Sie haben einen Vorschlag zu einem SaaS-Anbieter, den wir noch nicht haben? Prüfen Sie unsere [Produktlistenrichtlinie](/contributing/adding-staking-products/), um festzustellen, ob dies passt, und senden Sie ihn uns zur Prüfung zu.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wer hält meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter. In der Regel werden Sie durch die Einrichtung aller benötigten Signaturschlüssel (einer pro 32 ETH) und das Hochladen dieser Schlüssel zu Ihrem Anbieter geleitet, damit dieser in Ihrem Namen validieren kann. Die Signaturschlüssel allein bieten nicht die Möglichkeit, Ihr Geld abzuheben, zu überweisen oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für einen Konsens abzugeben, was, wenn es nicht richtig gemacht wird, zu Offline-Strafen oder Slashing führen kann.
</ExpandableCard>

<ExpandableCard title="Also gibt es zwei Gruppen von Schlüsseln?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jedes Konto besteht aus BLS-<em>Signaturschlüsseln</em> und BLS-<em>Abhebungsschlüsseln</em>. Damit ein Validator den Zustand der Blockchain attestieren, an Synchronisierungsausschüssen teilnehmen und Blöcke vorschlagen kann, müssen die Signaturschlüssel für einen Validator-Kunden leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und werden daher naturgemäß als "Hot Keys" betrachtet. Dies ist eine Voraussetzung für Ihren Validator, um attestieren zu können. Daher werden die Schlüssel, die zum Überweisen oder Abheben von Geldern verwendet werden, aus Sicherheitsgründen getrennt.

Die BLS-Abhebungsschlüssel werden verwendet, um eine einmalige Nachricht zu signieren, die angibt, an welches Execution-Layer-Konto Staking-Belohnungen und ausgetretene Mittel gehen sollen. Sobald diese Nachricht gesendet wurde, werden die <em>BLS-Abhebungsschlüssel</em> nicht mehr benötigt. Stattdessen wird die Kontrolle über abgehobene Mittel dauerhaft an die von Ihnen angegebene Adresse delegiert. Auf diese Weise können Sie eine Abhebungsadresse festlegen, die durch Ihre eigene Cold Storage gesichert ist, um das Risiko für Ihre Validator-Fonds zu minimieren, selbst wenn jemand anderes die Signaturschlüssel Ihres Validators kontrolliert.

Das Aktualisieren der Abhebungsberechtigungen ist ein erforderlicher Schritt, um Abhebungen mit dem Shanghai-Upgrade zu ermöglichen. Dieser Prozess beinhaltet das Generieren der Abhebungsschlüssel mit Hilfe Ihrer Mnemonic Seed Phrase. Staker, die bei der ersten Einzahlung eine Abhebungsadresse angegeben haben, müssen das nicht festlegen. <em>Stellen Sie jedoch sicher, dass Sie diese Mnemonic Seed Phrase sicher speichern, da Sie andernfalls Ihre Abhebungsschlüssel nicht generieren können, wenn es soweit ist.</em> Bitte wenden Sie sich an Ihren SaaS-Anbieter, um Unterstützung bei der Vorbereitung Ihres Validators zu erhalten.
</ExpandableCard>

<ExpandableCard title="Wann kann ich ETH abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Wenn Sie 32 ETH bei einem SaaS-Anbieter staken, werden diese ETH immer nach Maßgabe des offiziellen Staking-Einlagenvertrags hinterlegt. Die SaaS-Staker sind daher durch die gleichen Widerrufsbeschränkungen wie die Solo-Staker begrenzt, und Auszahlungen werden erst nach dem Upgrade in Shanghai ermöglicht.

Staking-Auszahlungen werden mit dem bevorstehenden Shanghai-Upgrade implementiert, das im ersten oder zweiten Quartal 2023 erwartet wird. Danach müssen Staker eine Auszahlungsadresse angeben (sofern bei der anfänglichen Einzahlung nicht angegeben). Die Belohnungszahlungen werden automatisch in regelmäßigen Abständen alle paar Tage verteilt.

Dadurch wird auch die Entsperrung von zurückgezogenen Mitteln ermöglicht. Validatoren können sich als Validator vollständig zurückziehen. Ihr gesamtes Guthaben wird an die angegebene Auszahlungsadresse zurückerstattet.

<ButtonLink to="/staking/withdrawals/">Mehr zu Staking-Abhebungen</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslashed werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines SaaS-Anbieters vertrauen Sie den Betrieb Ihrer Nodes jemand anderem an. Dies birgt das Risiko einer schlechten Node-Leistung, auf die Sie keinen Einfluss haben. Falls Ihr Validator geslashed wird, wird Ihr Validator-Guthaben bestraft und zwangsweise aus dem Validator-Pool entfernt. Diese Gelder werden gesperrt, bis Auszahlungen auf Protokollebene aktiviert werden.

Das bevorstehende Shanghai-Upgrade bringt die Funktion der Abhebung, die aktiviert wird, wenn eine Abhebungsadresse angegeben wird. Diese Adresse kann bei der anfänglichen Einzahlung angegeben worden sein. Falls nicht, müssen die Validator-Signierschlüssel verwendet werden, um eine Nachricht zu signieren, in der eine Abhebungsadresse angegeben wird, sobald das Upgrade aktiv ist.

Für weitere Informationen zu Garantien oder Versicherungsoptionen sowie zur Anleitung zur Bereitstellung einer Abhebungsadresse wenden Sie sich bitte an Ihren individuellen SaaS-Anbieter. Wenn Sie es vorziehen, die volle Kontrolle über Ihre Validator-Konfiguration zu haben, <a href="/staking/solo/">erfahren Sie mehr darüber, wie Sie Ihre ETH alleine einsetzen können</a>.
</ExpandableCard>

## Weiterführende Informationen {#further-reading}

- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_
