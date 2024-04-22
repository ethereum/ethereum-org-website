---
title: Staking als Service
description: Eine Übersicht darüber, wie man mit gepooltem ETH-Staking beginnen kann
lang: de
template: staking
emoji: ":money_with_wings:"
image: /staking/leslie-saas.png
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
  <Card title="Einfach starten" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Schränken Sie Ihr Risiko ein" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Bitte beachten {#what-to-consider}

Es kommen immer mehr SaaS-Anbieter auf den Markt, die Ihnen beim Staking Ihrer ETH helfen. Doch alle haben ihre eigenen Vorteile und Risiken. Bei allen SaaS-Optionen müssen Sie im Vergleich zum Home-Staking mehr Vertrauen aufbringen. SaaS-Optionen können zusätzlichen Code haben, der die Ethereum-Clients umgibt, der nicht offen oder überprüfbar ist. SaaS beeinträchtigt zudem die Dezentralisierung des Netzwerks. Je nach Einstellung haben Sie möglicherweise keine Kontrolle über Ihren Validator – der Betreiber könnte mit Ihrem ETH unehrlich handeln.

Attributindikatoren werden unten verwendet, um nennenswerte Stärken oder Schwächen eines gelisteten SaaS-Anbieters zu signalisieren. Nutzen Sie bei Ihrer Auswahl eines Diensts, dem Sie Ihr Staking anvertrauen möchten, diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren.

<StakingConsiderations page="saas" />

## Erkunden Sie die Staking-Dienstleister {#saas-providers}

Nachfolgend finden Sie einige verfügbare SaaS-Anbieter. Verwenden Sie die obigen Indikatoren für die Beurteilung dieser Dienste

<ProductDisclaimer />

### SaaS-Anbieter

<StakingProductsCardGrid category="saas" />

Hinweis: Es ist wichtig, dass sie die [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) unterstützen, denn das erhöht die Netzsicherheit und begrenzt Ihre Risiken. Dienste, die nachweislich die Nutzung von Mehrheits-Clients einschränken, sind gekennzeichnet mit <em style={{ textTransform: "uppercase" }}>"Vielfalt der Ausführungs-Clients"</em> and <em style={{ textTransform: "uppercase" }}>"Vielfalt der Konsens-Clients"</em>.

### Schlüssel-Generatoren

<StakingProductsCardGrid category="keyGen" />

Sie haben einen Vorschlag zu einem SaaS-Anbieter, den wir noch nicht haben? Machen Sie sich mit unserer [Richtlinie zum Aufführen von Produkten](/contributing/adding-staking-products/) vertraut, um beurteilen zu können, ob Ihr Vorschlag geeignet ist. Senden Sie ihn uns dann zur Prüfung zu.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wer hält meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter. In der Regel werden Sie durch die Einrichtung aller benötigten Signaturschlüssel (einer pro 32 ETH) und das Hochladen dieser Schlüssel zu Ihrem Anbieter geleitet, damit dieser in Ihrem Namen validieren kann. Die Signaturschlüssel allein bieten nicht die Möglichkeit, Ihr Geld abzuheben, zu überweisen oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für einen Konsens abzugeben, was, wenn es nicht richtig gemacht wird, zu Offline-Strafen oder Slashing führen kann.
</ExpandableCard>

<ExpandableCard title="Also gibt es zwei Gruppen von Schlüsseln?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jedes Konto besteht aus BLS-<em>Signaturschlüsseln</em> und BLS-<em>Abhebungsschlüsseln</em>. Damit ein Validator den Zustand der Blockchain attestieren, an Synchronisierungsausschüssen teilnehmen und Blöcke vorschlagen kann, müssen die Signaturschlüssel für einen Validator-Kunden leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und werden daher naturgemäß als "Hot Keys" betrachtet. Dies ist eine Voraussetzung für Ihren Validator, um attestieren zu können. Daher werden die Schlüssel, die zum Überweisen oder Abheben von Geldern verwendet werden, aus Sicherheitsgründen getrennt.

Die BLS-Abhebungsschlüssel werden verwendet, um eine einmalige Nachricht zu signieren, die angibt, an welches Execution-Layer-Konto Staking-Belohnungen und ausgetretene Mittel gehen sollen. Sobald diese Nachricht gesendet wurde, werden die <em>BLS-Abhebungsschlüssel</em> nicht mehr benötigt. Stattdessen wird die Kontrolle über abgehobene Mittel dauerhaft an die von Ihnen angegebene Adresse delegiert. Auf diese Weise können Sie eine Abhebungsadresse festlegen, die durch Ihre eigene Cold Storage gesichert ist, um das Risiko für Ihre Validator-Fonds zu minimieren, selbst wenn jemand anderes die Signaturschlüssel Ihres Validators kontrolliert.

Das Aktualisieren der Auszahlungsberechtigungen ist ein erforderlicher Schritt, um Auszahlungen zu ermöglichen\*. Dieser Prozess beinhaltet das Generieren der Abhebungsschlüssel mit Hilfe Ihrer Mnemonic Seed Phrase.

<strong>Stellen Sie unbedingt sicher, dass Sie diesen Seed-Satz sicher aufbewahren, sonst können Sie Ihre Auszahlungsschlüssel nicht erstellen, wenn es soweit ist.</strong>

\*Staker, die eine Auszahlungsadresse bei der ersten Einzahlung angegeben haben, müssen dies nicht einstellen. Bitte wenden Sie sich an Ihren SaaS-Anbieter, um Unterstützung bei der Vorbereitung Ihres Validators zu erhalten.
</ExpandableCard>

<ExpandableCard title="Wann kann ich ETH abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staking Auszahlungen wurden mit der Shanghai/Capella Aktualisierung im April 2023 eingeführt. Staker müssen (sofern nicht bereits bei der Ersteinzahlung geschehen) eine Auszahlungsadresse bereitstellen. Belohnungen werden daraufhin automatisch alle paar Tage in regelmäßigen Abständen ausgezahlt.

Validatoren haben auch die Möglichkeit, ihre Tätigkeit als Validator zu beenden. Das ermöglicht die Auszahlung ihres restlichen ETH-Guthabens. Konten, die eine Auszahlungsadresse angegeben und den Austrittsprozess abgeschlossen haben, erhalten ihr gesamtes Guthaben bei der nächsten Validatorendurchsicht auf die angegebene Auszahlungsadresse.

<ButtonLink to="/staking/withdrawals/">Mehr zu Staking-Abhebungen</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslashed werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines SaaS-Anbieters vertrauen Sie den Betrieb Ihrer Nodes jemand anderem an. Dies birgt das Risiko einer schlechten Node-Leistung, auf die Sie keinen Einfluss haben. Falls Ihr Validator geslashed wird, wird Ihr Validator-Guthaben bestraft und zwangsweise aus dem Validator-Pool entfernt.

Nach Abschluss des Slashing-/Austrittsprozesses werden diese Mittel an die dem Validator zugewiesene Auszahlungsadresse übertragen. Dies erfordert die Angabe einer Auszahlungsadresse zur Aktivierung. Diese Adresse kann bei der anfänglichen Einzahlung angegeben worden sein. Falls nicht, müssen die Auszahlungsschlüssel des Validators verwendet werden, um eine Nachricht zu unterschreiben, die eine Auszahlungsadresse angibt. Wenn keine Auszahlungsadresse angegeben wurde, bleibt das Guthaben bis zur Angabe gesperrt.

Für weitere Informationen zu Garantien oder Versicherungsoptionen sowie zur Anleitung zur Bereitstellung einer Abhebungsadresse wenden Sie sich bitte an Ihren individuellen SaaS-Anbieter. Wenn Sie es vorziehen, die volle Kontrolle über Ihre Validator-Konfiguration zu haben, <a href="/staking/solo/">erfahren Sie mehr darüber, wie Sie Ihre ETH alleine einsetzen können</a>.
</ExpandableCard>

## Weiterführende Informationen {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) - _Eridian und Spacesider_
- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_
