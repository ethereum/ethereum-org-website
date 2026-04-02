---
title: Staking as a Service
description: "Erfahren Sie mehr über Staking as a Service"
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie das Nashorn schwebt in den Wolken.
sidebarDepth: 2
summaryPoints:
  - Drittanbieter von Blockchain-Knoten übernehmen den Betrieb Ihres Validator-Clients
  - Großartige Option für alle mit 32 ETH, die sich nicht mit der technischen Komplexität des Betriebs eines Blockchain-Knotens befassen möchten
  - Reduzieren Sie das Vertrauen und behalten Sie die Verwahrung Ihrer Auszahlungsschlüssel
---

## Was ist Staking as a Service? {#what-is-staking-as-a-service}

Staking as a Service („SaaS“) stellt eine Kategorie von Staking-Diensten dar, bei denen Sie Ihre eigenen 32 ETH für einen Validator einzahlen, aber den Betrieb des Blockchain-Knotens an einen Drittanbieter delegieren. Dieser Prozess beinhaltet in der Regel, dass Sie durch die anfängliche Einrichtung geführt werden, einschließlich der Schlüsselgenerierung und Einzahlung, und dann Ihre Signaturschlüssel beim Betreiber hochladen. Dies ermöglicht es dem Dienst, Ihren Validator in Ihrem Namen zu betreiben, normalerweise gegen eine monatliche Gebühr.

## Warum mit einem Dienst staken? {#why-stake-with-a-service}

Das [Ethereum](/)-Protokoll unterstützt von Haus aus keine Delegierung des Einsatzes, daher wurden diese Dienste entwickelt, um diese Nachfrage zu decken. Wenn Sie 32 ETH zum Staken haben, sich aber nicht mit Hardware befassen möchten, ermöglichen Ihnen SaaS-Dienste, den schwierigen Teil zu delegieren, während Sie native Block-Belohnungen verdienen.

<CardGrid>
  <Card title="Dein eigener Validator" emoji=":desktop_computer:" description="Zahle deine eigenen 32 ETH ein, um deine eigenen Signaturschlüssel zu aktivieren, die am Ethereum-Konsens teilnehmen. Überwache deinen Fortschritt mit Dashboards, um zu sehen, wie sich deine ETH-Belohnungen ansammeln." />
  <Card title="Einfacher Start" emoji="🏁" description="Vergiss Hardware-Spezifikationen, Einrichtung, Wartung des Blockchain-Knotens und Upgrades. SaaS-Anbieter ermöglichen es dir, den schwierigen Teil auszulagern, indem du deine eigenen Signaturdaten hochlädst, damit sie gegen eine geringe Gebühr einen Validator in deinem Namen betreiben können." />
  <Card title="Begrenze dein Risiko" emoji=":shield:" description="In vielen Fällen müssen Benutzer den Zugriff auf die Schlüssel nicht aufgeben, die das Abheben oder Überweisen von gestakten Geldern ermöglichen. Diese unterscheiden sich von den Signaturschlüsseln und können separat gespeichert werden, um dein Risiko als Staker zu begrenzen (aber nicht zu eliminieren)." />
</CardGrid>

<StakingComparison page="saas" />

## Was Sie beachten sollten {#what-to-consider}

Es gibt eine wachsende Anzahl von SaaS-Anbietern, die Ihnen helfen, Ihre ETH zu staken, aber sie alle haben ihre eigenen Vor- und Nachteile. Alle SaaS-Optionen erfordern im Vergleich zum Home-Staking zusätzliche Vertrauensannahmen. SaaS-Optionen können zusätzlichen Code enthalten, der die Ethereum-Clients umhüllt und nicht offen oder überprüfbar ist. SaaS hat auch nachteilige Auswirkungen auf die Dezentralisierung des Netzwerks. Je nach Einrichtung kontrollieren Sie Ihren Validator möglicherweise nicht – der Betreiber könnte unehrlich mit Ihren ETH handeln.

Im Folgenden werden Attributindikatoren verwendet, um bemerkenswerte Stärken oder Schwächen eines aufgeführten SaaS-Anbieters zu signalisieren. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie einen Dienst auswählen, der Sie auf Ihrer Staking-Reise unterstützt.

<StakingConsiderations page="saas" />

## Entdecken Sie Staking-Dienstleister {#saas-providers}

Nachfolgend finden Sie einige verfügbare SaaS-Anbieter. Verwenden Sie die obigen Indikatoren, um sich durch diese Dienste führen zu lassen.

<ProductDisclaimer />

### SaaS-Anbieter

<StakingProductsCardGrid category="saas" />

Bitte beachten Sie, wie wichtig die Unterstützung der [Client-Vielfalt](/developers/docs/nodes-and-clients/client-diversity/) ist, da sie die Sicherheit des Netzwerks verbessert und Ihr Risiko begrenzt. Dienste, bei denen es Anzeichen dafür gibt, dass sie die Nutzung von Mehrheits-Clients einschränken, sind mit <em style={{ textTransform: "uppercase" }}>"Ausführungs-Client-Vielfalt"</em> und <em style={{ textTransform: "uppercase" }}>"Konsens-Client-Vielfalt"</em> gekennzeichnet.

### Schlüsselgeneratoren

<StakingProductsCardGrid category="keyGen" />

Haben Sie einen Vorschlag für einen Staking-as-a-Service-Anbieter, den wir übersehen haben? Lesen Sie unsere [Richtlinie zur Produktauflistung](/contributing/adding-staking-products/), um zu sehen, ob er gut passen würde, und reichen Sie ihn zur Überprüfung ein.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wer besitzt meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter, aber in der Regel werden Sie durch die Einrichtung der benötigten Signaturschlüssel (einer pro 32 ETH) geführt und laden diese bei Ihrem Anbieter hoch, damit dieser in Ihrem Namen validieren kann. Die Signaturschlüssel allein geben keine Möglichkeit, Ihre Gelder abzuheben, zu überweisen oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für den Konsens abzugeben, was bei unsachgemäßer Durchführung zu Offline-Strafen oder Slashing führen kann.
</ExpandableCard>

<ExpandableCard title="Es gibt also zwei Sätze von Schlüsseln?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jedes Konto besteht sowohl aus BLS-<em>Signatur</em>schlüsseln als auch aus BLS-<em>Auszahlung</em>sschlüsseln. Damit ein Validator den Zustand der Chain bestätigen, an Sync-Komitees teilnehmen und Blöcke vorschlagen kann, müssen die Signaturschlüssel für einen Validator-Client leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und gelten daher von Natur aus als „Hot“-Keys. Dies ist eine Voraussetzung dafür, dass Ihr Validator Bestätigungen abgeben kann, und daher sind die Schlüssel, die zum Überweisen oder Abheben von Geldern verwendet werden, aus Sicherheitsgründen getrennt.

Die BLS-Auszahlungsschlüssel werden verwendet, um eine einmalige Nachricht zu signieren, die deklariert, an welches Konto der Ausführungsebene Staking-Belohnungen und abgehobene Gelder gehen sollen. Sobald diese Nachricht gesendet wurde, werden die <em>BLS-Auszahlung</em>sschlüssel nicht mehr benötigt. Stattdessen wird die Kontrolle über abgehobene Gelder dauerhaft an die von Ihnen angegebene Adresse delegiert. Dies ermöglicht es Ihnen, eine Auszahlungsadresse festzulegen, die über Ihren eigenen Cold Storage gesichert ist, wodurch das Risiko für Ihre Validator-Gelder minimiert wird, selbst wenn jemand anderes Ihre Validator-Signaturschlüssel kontrolliert.

Die Aktualisierung der Auszahlungsdaten ist ein erforderlicher Schritt, um Auszahlungen zu ermöglichen\*. Dieser Prozess beinhaltet die Generierung der Auszahlungsschlüssel unter Verwendung Ihrer mnemonischen Seed-Phrase.

<strong>Stellen Sie sicher, dass Sie diese Seed-Phrase sicher aufbewahren, da Sie sonst nicht in der Lage sein werden, Ihre Auszahlungsschlüssel zu generieren, wenn die Zeit gekommen ist.</strong>

\*Staker, die bei der ersten Einzahlung eine Auszahlungsadresse angegeben haben, müssen dies nicht einrichten. Wenden Sie sich an Ihren SaaS-Anbieter, um Unterstützung bei der Vorbereitung Ihres Validators zu erhalten.
</ExpandableCard>

<ExpandableCard title="Wann kann ich abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staker müssen eine Auszahlungsadresse angeben (falls nicht bei der ersten Einzahlung angegeben), und die Auszahlung der Belohnungen beginnt automatisch in regelmäßigen Abständen alle paar Tage.

Validatoren können auch vollständig als Validator aussteigen, wodurch ihr verbleibendes ETH-Guthaben zur Auszahlung freigeschaltet wird. Konten, die eine Auszahlungsadresse für die Ausführungsebene angegeben und den Ausstiegsprozess abgeschlossen haben, erhalten ihr gesamtes Guthaben beim nächsten Validator-Sweep an die angegebene Auszahlungsadresse.

<ButtonLink href="/staking/withdrawals/">Mehr zu Staking-Auszahlungen</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslasht werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines SaaS-Anbieters vertrauen Sie den Betrieb Ihres Blockchain-Knotens jemand anderem an. Dies birgt das Risiko einer schlechten Leistung des Blockchain-Knotens, die nicht in Ihrer Kontrolle liegt. Für den Fall, dass Ihr Validator geslasht wird, wird Ihr Validator-Guthaben bestraft und zwangsweise aus dem Validator-Pool entfernt.

Nach Abschluss des Slashing-/Ausstiegsprozesses werden diese Gelder an die dem Validator zugewiesene Auszahlungsadresse überwiesen. Dies erfordert die Angabe einer Auszahlungsadresse, um dies zu ermöglichen. Diese wurde möglicherweise bei der ersten Einzahlung angegeben. Wenn nicht, müssen die Validator-Auszahlungsschlüssel verwendet werden, um eine Nachricht zu signieren, die eine Auszahlungsadresse deklariert. Wenn keine Auszahlungsadresse angegeben wurde, bleiben die Gelder gesperrt, bis eine angegeben wird.

Kontaktieren Sie den jeweiligen SaaS-Anbieter für weitere Details zu Garantien oder Versicherungsoptionen sowie für Anweisungen zur Angabe einer Auszahlungsadresse. Wenn Sie lieber die volle Kontrolle über Ihre Validator-Einrichtung haben möchten, [erfahren Sie mehr darüber, wie Sie Ihre ETH solo staken können](/staking/solo/).
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) – _Eridian und Spacesider_
- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_