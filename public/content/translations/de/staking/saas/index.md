---
title: Staking as a Service
description: "Erfahre mehr über Staking as a Service"
lang: de
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Nashorn Leslie schwebt in den Wolken.
sidebarDepth: 2
summaryPoints:
  - Drittanbieter von Knoten übernehmen den Betrieb deines Validator-Clients
  - Großartige Option für alle mit 32 ETH, die sich mit der technischen Komplexität des Betriebs eines Knotens nicht wohlfühlen
  - Reduziere Vertrauensannahmen und behalte die Verwahrung deiner Abhebungsschlüssel
---

## Was ist Staking as a Service? {#what-is-staking-as-a-service}

Staking as a Service („SaaS“) stellt eine Kategorie von Staking-Diensten dar, bei der du deine eigenen 32 ETH für einen Validator einzahlst, aber den Betrieb des Knotens an einen Drittanbieter delegierst. Dieser Prozess beinhaltet in der Regel, dass du durch die anfängliche Einrichtung geführt wirst, einschließlich der Schlüsselgenerierung und der Einzahlung, und dann deine Signierschlüssel beim Betreiber hochlädst. Dies ermöglicht es dem Dienst, deinen Validator in deinem Namen zu betreiben, normalerweise gegen eine monatliche Gebühr.

## Warum mit einem Dienst staken? {#why-stake-with-a-service}

Das [Ethereum](/)-Protokoll unterstützt von Haus aus keine Delegation von Stakes, daher wurden diese Dienste entwickelt, um diese Nachfrage zu decken. Wenn du 32 ETH zum Staken hast, dich aber nicht mit Hardware auseinandersetzen möchtest, ermöglichen dir SaaS-Dienste, den schwierigen Teil zu delegieren, während du native Block-Belohnungen verdienst.

<Grid>
  <Card title="Dein eigener Validator" emoji=":desktop_computer:" description="Hinterlege deine eigenen 32 ETH, um dein eigenes Set an Signierschlüsseln zu aktivieren, die am Ethereum-Konsens teilnehmen werden. Verfolge deinen Fortschritt mit Dashboards, um zu beobachten, wie sich diese ETH-Belohnungen ansammeln." />
  <Card title="Einfacher Einstieg" emoji="🏁" description="Vergiss Hardware-Spezifikationen, Einrichtung, Knoten-Wartung und Upgrades. SaaS-Anbieter ermöglichen es dir, den schwierigen Teil auszulagern, indem du deine eigenen Signier-Zugangsdaten hochlädst, sodass sie gegen eine geringe Gebühr einen Validator in deinem Namen betreiben können." />
  <Card title="Begrenze dein Risiko" emoji=":shield:" description="In vielen Fällen müssen Nutzer den Zugriff auf die Schlüssel nicht aufgeben, die die Abhebung oder den Transfer von gestakten Mitteln ermöglichen. Diese unterscheiden sich von den Signierschlüsseln und können separat aufbewahrt werden, um dein Risiko als Staker zu begrenzen (aber nicht zu eliminieren)." />
</Grid>

<StakingComparison page="saas" />

## Was es zu beachten gilt {#what-to-consider}

Es gibt eine wachsende Anzahl von SaaS-Anbietern, die dir helfen, deine ETH zu staken, aber sie alle haben ihre eigenen Vor- und Nachteile. Alle SaaS-Optionen erfordern im Vergleich zum Home-Staking zusätzliche Vertrauensannahmen. SaaS-Optionen können zusätzlichen Code enthalten, der die Ethereum-Clients umhüllt und nicht offen oder überprüfbar ist. SaaS hat auch nachteilige Auswirkungen auf die Dezentralisierung des Netzwerks. Je nach Einrichtung kontrollierst du deinen Validator möglicherweise nicht – der Betreiber könnte mit deinen ETH unehrlich handeln.

Im Folgenden werden Attribut-Indikatoren verwendet, um auf bemerkenswerte Stärken oder Schwächen eines aufgeführten SaaS-Anbieters hinzuweisen. Nutze diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während du einen Dienst auswählst, der dich auf deiner Staking-Reise unterstützt.

<StakingConsiderations page="saas" />

## Entdecke Staking-Dienstleister {#saas-providers}

Unten findest du einige verfügbare SaaS-Anbieter. Nutze die obigen Indikatoren, um dich bei diesen Diensten zu orientieren.

<ProductDisclaimer />

### SaaS-Anbieter {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Bitte beachte, wie wichtig die Unterstützung der [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) ist, da sie die Sicherheit des Netzwerks verbessert und dein Risiko begrenzt. Dienste, bei denen es Hinweise darauf gibt, dass sie die Nutzung von Mehrheits-Clients einschränken, sind mit <em style={{ textTransform: "uppercase" }}>„Ausführungsclient-Diversität“</em> und <em style={{ textTransform: "uppercase" }}>„Konsens-Client-Diversität“</em> gekennzeichnet.

### Schlüsselgeneratoren {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Hast du einen Vorschlag für einen Staking-as-a-Service-Anbieter, den wir übersehen haben? Sieh dir unsere [Richtlinien für Produktauflistungen](/contributing/adding-staking-products/) an, um zu prüfen, ob er gut passen würde, und reiche ihn zur Überprüfung ein.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Wer verwahrt meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter, aber in der Regel wirst du durch die Einrichtung aller benötigten Signierschlüssel (einer pro 32 ETH) geführt und lädst diese bei deinem Anbieter hoch, damit dieser in deinem Namen validieren kann. Die Signierschlüssel allein geben keine Möglichkeit, deine Gelder abzuheben, zu transferieren oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für den Konsens abzugeben, was bei unsachgemäßer Durchführung zu Offline-Strafen oder Slashing führen kann.
</ExpandableCard>

<ExpandableCard title="Es gibt also zwei Schlüsselsätze?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jedes Konto besteht sowohl aus BLS-<em>Signierschlüsseln</em> als auch aus BLS-<em>Abhebungsschlüsseln</em>. Damit ein Validator den Zustand der Chain bezeugen, an Synchronisierungs-Komitees teilnehmen und Blöcke vorschlagen kann, müssen die Signierschlüssel für einen Validator-Client leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und gelten daher von Natur aus als „Hot“-Schlüssel. Dies ist eine Voraussetzung dafür, dass dein Validator bezeugen kann, und daher sind die Schlüssel, die zum Transferieren oder Abheben von Geldern verwendet werden, aus Sicherheitsgründen getrennt.

Die BLS-Abhebungsschlüssel werden verwendet, um eine einmalige Nachricht zu signieren, die angibt, an welches Konto der Ausführungsschicht Staking-Belohnungen und ausgetretene Gelder gehen sollen. Sobald diese Nachricht gesendet wurde, werden die <em>BLS-Abhebungsschlüssel</em> nicht mehr benötigt. Stattdessen wird die Kontrolle über die abgehobenen Gelder dauerhaft an die von dir angegebene Adresse delegiert. Dies ermöglicht es dir, eine Abhebungsadresse festzulegen, die über deinen eigenen Cold Storage gesichert ist, wodurch das Risiko für deine Validator-Gelder minimiert wird, selbst wenn jemand anderes deine Validator-Signierschlüssel kontrolliert.

Die Aktualisierung der Auszahlungsberechtigungen ist ein erforderlicher Schritt, um Abhebungen zu ermöglichen\*. Dieser Prozess beinhaltet die Generierung der Abhebungsschlüssel unter Verwendung deiner mnemonischen Seed-Phrase.

<strong>Stelle sicher, dass du diese Seed-Phrase sicher aufbewahrst, da du sonst nicht in der Lage sein wirst, deine Abhebungsschlüssel zu generieren, wenn die Zeit gekommen ist.</strong>

\*Staker, die bei der Ersteinzahlung eine Abhebungsadresse angegeben haben, müssen dies nicht festlegen. Wende dich an deinen SaaS-Anbieter, um Unterstützung bei der Vorbereitung deines Validators zu erhalten.
</ExpandableCard>

<ExpandableCard title="Wann kann ich abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staker müssen eine Abhebungsadresse angeben (falls nicht bei der Ersteinzahlung angegeben), und die Auszahlung der Belohnungen beginnt automatisch in regelmäßigen Abständen alle paar Tage.

Validatoren können auch vollständig als Validator austreten, wodurch ihr verbleibendes ETH-Guthaben zur Abhebung freigegeben wird. Konten, die eine Abhebungsadresse für die Ausführungsschicht angegeben und den Austrittsprozess abgeschlossen haben, erhalten ihr gesamtes Guthaben beim nächsten Validator-Sweep an die angegebene Abhebungsadresse.

<ButtonLink href="/staking/withdrawals/">Mehr über Staking-Abhebungen</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslasht werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines SaaS-Anbieters vertraust du den Betrieb deines Knotens jemand anderem an. Dies birgt das Risiko einer schlechten Knoten-Leistung, die nicht in deiner Kontrolle liegt. Für den Fall, dass dein Validator geslasht wird, wird dein Validator-Guthaben bestraft und zwangsweise aus dem Validator-Pool entfernt.

Nach Abschluss des Slashing-/Austrittsprozesses werden diese Gelder an die dem Validator zugewiesene Abhebungsadresse transferiert. Dies erfordert die Angabe einer Abhebungsadresse, um dies zu ermöglichen. Diese wurde möglicherweise bei der Ersteinzahlung angegeben. Wenn nicht, müssen die Validator-Abhebungsschlüssel verwendet werden, um eine Nachricht zu signieren, die eine Abhebungsadresse deklariert. Wenn keine Abhebungsadresse angegeben wurde, bleiben die Gelder gesperrt, bis sie angegeben wird.

Kontaktiere den jeweiligen SaaS-Anbieter für weitere Details zu Garantien oder Versicherungsoptionen sowie für Anweisungen zur Angabe einer Abhebungsadresse. Wenn du lieber die volle Kontrolle über deine Validator-Einrichtung haben möchtest, [erfahre mehr darüber, wie du deine ETH solo staken kannst](/staking/solo/).
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Das Ethereum-Staking-Verzeichnis](https://www.staking.directory/) – _Eridian und Spacesider_
- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_