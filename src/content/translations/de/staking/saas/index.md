---
title: Staking als Service
description: Eine Übersicht darüber, wie man mit gepooltem ETH-Staking beginnen kann
lang: de
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: Leslie, das in den Wolken schwebende Nashorn.
summaryPoints:
  - Drittanbieter als Node-Betreiber kümmern sich um den Betrieb Ihres Validator-Client
  - Eine großartige Option für alle mit 32 ETH, die ungern mit der technischen Komplexität von Nodes umgehen
  - Verringern Sie das Vertrauen und behalten Sie die Verwahrung Ihrer Auszahlungsschlüssel
---

## Was ist unter Einsatz (Staking) als Service zu verstehen? {#what-is-staking-as-a-service}

Staking as a Service („SaaS“) stellt eine Kategorie von Staking-Diensten dar, bei der Sie Ihre eigenen 32 ETH für einen Validator hinterlegen, aber den Node-Betrieb an einen Drittanbieter delegieren. Dieser Prozess beinhaltet normalerweise, dass Sie durch die anfängliche Konfiguration geführt werden, einschließlich Schlüsselgenerierung und Hinterlegung, und dann Ihre Signaturschlüssel zum Betreiber hochladen. Dadurch kann der Service Ihren Validator in Ihrem Namen betreiben, normalerweise gegen eine monatliche Gebühr.

## Warum meinen Einsatz mit einem Service platzieren? {#why-stake-with-a-service}

Das Ethereum-Protokoll unterstützt keine Delegation von Staking, daher wurden diese Serviceleistungen aufgebaut, um die entsprechende Nachfrage zu befriedigen. Wenn Sie über 32 ETH zum Staking verfügen, sich aber davor scheuen, mit Hardware umzugehen, gestatten es Ihnen SaaS-Dienste, den schwierigen Teil zu delegieren, während Sie native Blockbelohnungen erhalten.

<CardGrid>
  <Card title="Ihr eigener Validator" emoji=":desktop_computer:">
    Hinterlegen Sie Ihre eigenen 32 ETH, um Ihre eigenen Signaturschlüssel zu aktivieren, die am Ethereum-Konsens teilnehmen werden. Beobachten Sie Ihren Fortschritt mit Dashboards, um zu sehen, wie sich diese ETH-Belohnungen akkumulieren.
  </Card>
  <Card title="Einfach starten" emoji="🏁">
    Vergessen Sie Hardware-Spezifikationen, Konfigurationen, Node-Wartung und Upgrades.
    SaaS-Anbieter erlauben es Ihnen, den schwierigen Teil durch Hochladen Ihrer eigenen Anmeldedaten auszulagern. Dies wiederum ermöglicht es ihnen, einen Validator für Sie selbst durchzuführen, und dies gegen einen geringen Preis.
  </Card>
  <Card title="Begrenzen Sie Ihr Risiko" emoji=":shield:">
    In vielen Fällen müssen Benutzer den Zugriff auf die Schlüssel, die das Zurückziehen oder Überweisen von gestapelten Beträgen ermöglichen, nicht aufgeben. Diese unterscheiden sich von den Signaturschlüsseln und können separat gespeichert werden, um Ihr Risiko als Staker zu begrenzen (aber nicht zu beseitigen).
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## Bitte beachten {#what-to-consider}

Es gibt eine wachsende Anzahl von Service-Anbietern, die Ihnen dabei helfen, Ihr ETH einzusetzen, aber jeder bringt unterschiedliche Risiken und Vorteile mit sich.

Attributindikatoren werden unten verwendet, um nennenswerte Stärken oder Schwächen eines gelisteten SaaS-Anbieters zu signalisieren. Verwenden Sie diesen Abschnitt als Referenz dafür, wie wir diese Attribute definieren, während Sie einen Dienst wählen, der Ihnen beim Staking hilft.

<StakingConsiderations page="saas" />

## Erkunden Sie die Staking-Dienstleister {#saas-providers}

Nachfolgend finden Sie einige verfügbare SaaS-Anbieter. Verwenden Sie die obigen Indikatoren, um Sie durch diese Dienste zu führen

<InfoBanner emoji="⚠️" isWarning>
Bitte beachten Sie, das Sie die <a href="/developers/docs/nodes-and-clients/client-diversity/">Client-Diversität</a> unbedingt unterstützen sollten, um somit die Netzsicherheit zu erhöhen und Ihre Risiken zu begrenzen. Dienstleister, die nachweislich die Mehrzahl der Kunden begrenzen, sind wie folgt markiert <em style="text-transform: uppercase;">„Diverse Clients."</em>
</InfoBanner>

#### SaaS-Anbieter

<StakingProductsCardGrid category="saas" />

#### Schlüssel-Generatoren

<StakingProductsCardGrid category="keyGen" />

Sie haben einen Vorschlag zu einem SaaS-Anbieter, den wir noch nicht haben? Prüfen Sie unsere [Produktlistenrichtlinie](/contributing/adding-staking-products/), um festzustellen, ob dies passt, und senden Sie ihn uns zur Prüfung zu.

## FAQ {#faq}

<ExpandableCard title="Wer hält meine Schlüssel?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Die Vereinbarungen unterscheiden sich von Anbieter zu Anbieter, aber in der Regel werden Sie durch die Einrichtung aller benötigten Signaturschlüssel (einer pro 32 ETH) und das Hochladen dieser Schlüssel zu Ihrem Anbieter geführt, damit dieser in Ihrem Namen validieren kann. Die Signaturschlüssel allein bieten nicht die Möglichkeit, Ihr Geld abzuheben, zu überweisen oder auszugeben. Sie bieten jedoch die Möglichkeit, Stimmen für einen Konsens abzugeben, was, wenn es nicht richtig gemacht wird, zu Offline-Strafen oder Slashing führen kann.
</ExpandableCard>

<ExpandableCard title="Also gibt es zwei Gruppen von Schlüsseln?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Jedes Konto besteht aus <em>Signaturschlüsseln</em> und <em>Abhebeschlüsseln</em>. Damit ein Validator den Zustand der Blockchain attestieren, an Synchronisierungsausschüssen teilnehmen und Blöcke vorschlagen kann, müssen die Signaturschlüssel für einen Validator-Kunden leicht zugänglich sein. Diese müssen in irgendeiner Form mit dem Internet verbunden sein und werden daher naturgemäß als „Hot Keys" betrachtet. Dies ist eine Voraussetzung für Ihren Validator, um attestieren zu können, und daher werden die Schlüssel, die zum Überweisen oder Abheben von Geldern verwendet werden, aus Sicherheitsgründen getrennt.

Alle diese Schlüssel können immer auf reproduzierbare Weise mit Ihrer 24-Wörter-Mnemonik-Seed-Phrase neu generiert werden. <em>Stellen Sie sicher, dass Sie diese Seed-Phrase sicher aufbewahren, sonst können Sie Ihre Auszahlungsschlüssel nicht generieren, wenn die Zeit gekommen ist</em>.
</ExpandableCard>

<ExpandableCard title="Wann kann ich ETH abheben?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  Wenn Sie 32 ETH bei einem SaaS-Anbieter staken, werden diese ETH immer nach Maßgabe des offiziellen Staking-Einlagenvertrags hinterlegt. Daher unterliegen SaaS-Staker derzeit denselben Auszahlungsbeschränkungen wie Solo-Staker. Dies bedeutet, dass das Staking Ihrer ETH derzeit eine Einwegeinzahlung ist. Dies wird bis zum Shanghai-Upgrade der Fall bleiben.
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn ich geslashed werde?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Durch die Nutzung eines SaaS-Anbieters vertrauen Sie den Betrieb Ihrer Nodes jemand anderem an. Dies birgt das Risiko einer schlechten Node-Leistung, auf die Sie keinen Einfluss haben. Falls Ihr Validator geslashed wird, wird Ihr Validator-Guthaben bestraft und zwangsweise aus dem Validator-Pool entfernt. Diese Gelder werden gesperrt, bis Auszahlungen auf Protokollebene aktiviert werden.

Wenden Sie sich an den jeweiligen SaaS-Anbieter, um weitere Informationen zu Garantien oder Versicherungsoptionen zu erhalten. Wenn Sie es vorziehen, die volle Kontrolle über Ihre Validator-Konfiguration zu haben, <a href="/staking/solo/">erfahren Sie mehr darüber, wie Sie Ihre ETH alleine einsetzen können</a>.
</ExpandableCard>

## Weiterführende Informationen {#further-reading}

- [Bewertung von Staking-Diensten](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_
