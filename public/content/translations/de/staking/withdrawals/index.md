---
title: Staking-Abhebungen
description: "Seite, die zusammenfasst, was Staking-Push-Abhebungen sind, wie sie funktionieren und was Staker tun müssen, um ihre Belohnungen zu erhalten"
lang: de
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Nashorn Leslie mit ihren Staking-Belohnungen
sidebarDepth: 2
summaryPoints:
  - Validator-Betreiber müssen eine Abhebungsadresse angeben, um Abhebungen zu ermöglichen
  - Bei Legacy-Validatoren wird überschüssiges Guthaben von mehr als 32 ETH alle paar Tage automatisch abgehoben
  - Compounding-Validatoren verdienen Belohnungen auf ihr gesamtes Guthaben bis zu 2048 ETH
  - Validatoren, die vollständig aus dem Staking austreten, erhalten ihr verbleibendes Guthaben
---

**Staking-Abhebungen** beziehen sich auf Transfers von ETH von einem Validator-Konto auf der Konsensschicht (der Beacon Chain) von Ethereum zur Ausführungsschicht, wo damit transagiert werden kann.

> Wenn Sie Teil eines [Staking-Pools](/staking/pools/) sind oder Staking-Token halten, sollten Sie sich bei Ihrem Anbieter nach weiteren Details zur Handhabung von Staking-Abhebungen erkundigen, da jeder Dienst anders funktioniert.

Wie Abhebungen funktionieren, hängt vom Typ der Auszahlungsberechtigungen Ihres Validators ab:

- **Legacy-Validatoren (Typ 1)**: Überschüssiges Guthaben von mehr als 32 ETH wird automatisch und regelmäßig an die mit dem Validator verknüpfte Abhebungsadresse gesendet. Belohnungen über 32 ETH tragen nicht zum Gewicht des Validators im Netzwerk bei.
- **Compounding-Validatoren (Typ 2)**: Belohnungen fließen in das effektive Guthaben des Validators bis zu 2048 ETH ein, was das Gewicht des Validators erhöht und mehr Belohnungen einbringt. Nur Guthaben, das 2048 ETH übersteigt, wird automatisch abgeschöpft.

Benutzer können auch **vollständig aus dem Staking austreten**, indem sie eine Transaktion zur Abhebung einreichen, die Wartezeit in der Abhebungsschlange (basierend auf der Netzwerknachfrage) abwarten und ihr gesamtes Validator-Guthaben freischalten.

## Staking-Belohnungen {#staking-rewards}

Wie Belohnungen gehandhabt werden, hängt vom Typ der Auszahlungsberechtigungen des Validators ab:

**Legacy-Validatoren (Typ 1)** haben ein effektives Guthaben, das auf 32 ETH begrenzt ist. Jegliches Guthaben über 32 ETH, das als Netzwerk-Belohnungen erhalten wird, trägt nicht zum effektiven Guthaben bei oder erhöht das Gewicht dieses Validators im Netzwerk, und diese Belohnungen werden alle paar Tage automatisch auf die dedizierte Abhebungsadresse des Validators abgehoben. Abgesehen von der einmaligen Angabe einer Abhebungsadresse erfordert das Beanspruchen dieser Belohnungen keine Aktion des Validator-Betreibers. Dies wird alles auf der Konsensschicht initiiert, daher ist in keinem Schritt Gas (Transaktionsgebühr) erforderlich.

**Compounding-Validatoren (Typ 2)** können ein effektives Guthaben zwischen 32 und 2048 ETH haben. Netzwerk-Belohnungen, die von diesen Validatoren erhalten werden, fließen in ihr effektives Guthaben ein, was das Gewicht des Validators und das Potenzial für zukünftige Belohnungen erhöht. Automatische Abschöpfungen erfolgen nur für Guthaben, das 2048 ETH übersteigt. Um Belohnungen unter dem Schwellenwert von 2048 ETH abzuheben, müssen Compounding-Validatoren manuell eine teilweise Abhebung von der Ausführungsschicht auslösen, was Gas erfordert.

### Wie sind wir hierher gekommen? {#how-did-we-get-here}

In den letzten Jahren hat [Ethereum](/) mehrere Netzwerk-Upgrades durchlaufen und ist zu einem Netzwerk übergegangen, das durch ETH selbst gesichert wird, anstatt durch energieintensives Mining wie früher. Die Teilnahme am Konsens auf Ethereum ist nun als "Staking" bekannt, da die Teilnehmer freiwillig ETH gesperrt haben und es "aufs Spiel setzen" (at stake), um am Netzwerk teilnehmen zu können. Benutzer, die die Regeln befolgen, werden belohnt, während Versuche zu betrügen bestraft werden können.

Seit dem Start des Staking-Einlage-Vertrags im November 2020 haben einige mutige Ethereum-Pioniere freiwillig Gelder gesperrt, um "Validatoren" zu aktivieren – spezielle Konten, die das Recht haben, Blöcke formell zu bezeugen und vorzuschlagen, wobei sie den Netzwerkregeln folgen.

Vor dem Shanghai/Capella-Upgrade konnten Sie Ihr gestaktes ETH nicht nutzen oder darauf zugreifen. Aber jetzt können Sie sich dafür entscheiden, Ihre Belohnungen automatisch auf ein ausgewähltes Konto zu erhalten, und Sie können Ihr gestaktes ETH auch jederzeit abheben.

### Wie bereite ich mich vor? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Wichtige Hinweise {#important-notices}

Validator-Konten müssen eine Abhebungsadresse angeben, bevor sie auf angesammelte Netzwerk-Belohnungen zugreifen und diese abheben oder eine vollständige Abhebung beim Austritt aus dem Staking verarbeiten können.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Jedem Validator-Konto kann nur ein einziges Mal eine einzige Abhebungsadresse zugewiesen werden.** Sobald eine Adresse ausgewählt und an die Konsensschicht übermittelt wurde, kann dies nicht mehr rückgängig gemacht oder geändert werden. Überprüfen Sie den Besitz und die Richtigkeit der angegebenen Adresse vor dem Einreichen doppelt.
</AlertDescription>
</AlertContent>
</Alert>

Wenn Sie noch keine Abhebungsadresse für Ihr Validator-Konto angegeben haben, besteht in der Zwischenzeit **keine Gefahr für Ihre Gelder**, vorausgesetzt, Ihre Mnemonic/Seed-Phrase ist sicher offline geblieben und wurde in keiner Weise kompromittiert. Das Versäumnis, Auszahlungsberechtigungen hinzuzufügen, führt lediglich dazu, dass das ETH im Validator-Konto gesperrt bleibt, bis eine Abhebungsadresse angegeben wird.

## Compounding-Validatoren {#compounding-validators}

Validatoren können sich für das **Compounding** entscheiden, indem sie ihre Auszahlungsberechtigungen von Typ 1 auf Typ 2 umwandeln. Dies erhöht das maximale effektive Guthaben von 32 ETH auf **2048 ETH**, wodurch Belohnungen in das effektive Guthaben des Validators einfließen können, anstatt automatisch abgeschöpft zu werden.

Mit aktiviertem Compounding:

- Belohnungen erhöhen das effektive Guthaben des Validators in Schritten von 1 ETH (vorbehaltlich eines kleinen [Hysterese-Puffers](https://www.attestant.io/posts/understanding-validator-effective-balance/)), wodurch im Laufe der Zeit mehr Belohnungen verdient werden
- Automatische Abschöpfungen erfolgen nur für Guthaben, das 2048 ETH übersteigt
- Teilweise Abhebungen unter dem Schwellenwert von 2048 ETH müssen manuell von der Ausführungsschicht ausgelöst werden (dies kostet Gas)
- Mehrere Validatoren können zu einem einzigen Compounding-Validator **konsolidiert** werden, was den operativen Aufwand reduziert

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Die Umwandlung von Typ 1 zu Typ 2 Auszahlungsberechtigungen ist irreversibel.** Verwenden Sie das [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) als offizielles Tool für diese Umwandlung. Weitere Details zum Umwandlungsprozess, zu Risiken und zur Konsolidierung finden Sie im [MaxEB-Deep-Dive](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Vollständiger Austritt aus dem Staking {#exiting-staking-entirely}

Die Angabe einer Abhebungsadresse ist erforderlich, bevor _irgendwelche_ Gelder aus dem Guthaben eines Validator-Kontos transferiert werden können.

Benutzer, die vollständig aus dem Staking austreten und ihr gesamtes Guthaben zurückerhalten möchten, müssen einen "freiwilligen Austritt" initiieren. Dies kann auf zwei Arten erfolgen:

- **Verwendung von Validator-Schlüsseln**: Signieren und senden Sie eine freiwillige Austritts-Nachricht mit Ihrem Validator-Client, die an Ihren Konsens-Knoten übermittelt wird. Dies erfordert kein Gas.
- **Verwendung von Auszahlungsberechtigungen**: Lösen Sie einen Austritt von der Ausführungsschicht unter Verwendung Ihrer Abhebungsadresse aus, ohne Zugriff auf den Validator-Signaturschlüssel zu benötigen. Dies erfordert eine Transaktion und kostet Gas.

Der Prozess des Austritts eines Validators aus dem Staking nimmt unterschiedlich viel Zeit in Anspruch, je nachdem, wie viele andere gleichzeitig austreten. Sobald dies abgeschlossen ist, ist dieses Konto nicht mehr für die Erfüllung von Validator-Netzwerkaufgaben verantwortlich, hat keinen Anspruch mehr auf Belohnungen und hat sein ETH nicht mehr "aufs Spiel gesetzt". Zu diesem Zeitpunkt wird das Konto als vollständig "abhebbar" markiert.

Sobald ein Konto als "abhebbar" markiert ist und Auszahlungsberechtigungen angegeben wurden, muss ein Benutzer nichts weiter tun, als zu warten. Konten werden automatisch und kontinuierlich von Block-Proposern auf berechtigte ausgetretene Gelder überprüft, und Ihr Kontoguthaben wird während der nächsten <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>Abschöpfung (Sweep)</a> vollständig transferiert (auch bekannt als "vollständige Abhebung").

## Wie funktionieren automatische Belohnungen (Typ-1-Validator)? {#how-do-withdrawals-work}

Ob ein bestimmter Validator für eine Abhebung berechtigt ist oder nicht, wird durch den Zustand des Validator-Kontos selbst bestimmt. Zu keinem Zeitpunkt ist eine Benutzereingabe erforderlich, um zu bestimmen, ob für ein Konto eine Abhebung initiiert werden soll oder nicht – der gesamte Prozess wird automatisch von der Konsensschicht in einer Endlosschleife durchgeführt.

### Lernen Sie eher visuell? {#visual-learner}

Sehen Sie sich diese Erklärung zu Ethereum-Staking-Abhebungen von Finematics an:

<VideoWatch slug="ethereum-staking-withdrawals" />

### Validator-"Sweeping" (Abschöpfung) {#validator-sweeping}

Wenn ein Validator an der Reihe ist, den nächsten Block vorzuschlagen, muss er eine Abhebungsschlange von bis zu 16 berechtigten Abhebungen erstellen. Dies geschieht, indem ursprünglich mit dem Validator-Index 0 begonnen wird, um gemäß den Regeln des Protokolls zu bestimmen, ob es eine berechtigte Abhebung für dieses Konto gibt, und diese der Warteschlange hinzuzufügen, falls dies der Fall ist. Der Validator, der den folgenden Block vorschlagen soll, macht dort weiter, wo der letzte aufgehört hat, und schreitet in der Reihenfolge unendlich fort.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Denken Sie an eine analoge Uhr. Der Zeiger auf der Uhr zeigt auf die Stunde, bewegt sich in eine Richtung, überspringt keine Stunden und fängt schließlich wieder von vorne an, nachdem die letzte Zahl erreicht ist.

Stellen Sie sich nun vor, die Uhr hat statt 1 bis 12 die Zahlen 0 bis N _(wobei N die Gesamtzahl der Validator-Konten ist, die jemals auf der Konsensschicht registriert wurden, über 1,2 Millionen Stand April 2026)._

Der Zeiger auf der Uhr zeigt auf den nächsten Validator, der auf berechtigte Abhebungen überprüft werden muss. Er beginnt bei 0 und geht einmal ganz herum, ohne Konten zu überspringen. Wenn der letzte Validator erreicht ist, wird der Zyklus wieder am Anfang fortgesetzt.
</AlertDescription>
</AlertContent>
</Alert>

#### Überprüfung eines Kontos auf Abhebungen {#checking-an-account-for-withdrawals}

Während ein Proposer die Validatoren auf mögliche Abhebungen überprüft, wird jeder überprüfte Validator anhand einer kurzen Reihe von Fragen bewertet, um festzustellen, ob eine Abhebung ausgelöst werden soll und wenn ja, wie viel ETH abgehoben werden soll.

1. **Wurde eine Abhebungsadresse angegeben?** Wenn keine Abhebungsadresse angegeben wurde, wird das Konto übersprungen und keine Abhebung initiiert.
2. **Ist der Validator ausgetreten und abhebbar?** Wenn der Validator vollständig ausgetreten ist und wir die Epoche erreicht haben, in der sein Konto als "abhebbar" gilt, wird eine vollständige Abhebung verarbeitet. Dadurch wird das gesamte verbleibende Guthaben auf die Abhebungsadresse transferiert.
3. **Übersteigt das Guthaben sein maximales effektives Guthaben?** Für Legacy-Validatoren (Typ 1) liegt dieser Schwellenwert bei 32 ETH. Für Compounding-Validatoren (Typ 2) liegt dieser Schwellenwert bei 2048 ETH. Wenn das Konto über Auszahlungsberechtigungen verfügt, nicht vollständig ausgetreten ist, ein effektives Guthaben auf dem Maximum hat und ein Guthaben über diesem Schwellenwert aufweist, wird eine teilweise Abhebung verarbeitet, die nur den Überschuss auf die Abhebungsadresse des Benutzers transferiert.

Es gibt nur zwei Aktionen, die von Validator-Betreibern im Laufe des Lebenszyklus eines Validators durchgeführt werden und diesen Ablauf direkt beeinflussen:

- Angabe von Auszahlungsberechtigungen, um jede Form der Abhebung zu ermöglichen
- Austritt aus dem Netzwerk, was eine vollständige Abhebung auslöst

### Gasfrei {#gas-free}

Automatische Abhebungs-Abschöpfungen erfordern nicht, dass Staker manuell eine Transaktion einreichen. Das bedeutet, dass für automatische Abschöpfungen **kein Gas (Transaktionsgebühr) erforderlich** ist und sie nicht um vorhandenen Blockplatz auf der Ausführungsschicht konkurrieren.

Beachten Sie, dass [Compounding-Validatoren](#compounding-validators), die eine teilweise Abhebung unter dem Schwellenwert von 2048 ETH auslösen möchten, dies manuell von der Ausführungsschicht aus tun müssen, was Gas erfordert.

### Wie oft werden meine Staking-Belohnungen freigeschaltet und in meiner Wallet verfügbar sein? {#how-soon}

Maximal 16 Abhebungen können in einem einzigen Block verarbeitet werden. Bei dieser Rate können 115.200 Validator-Abhebungen pro Tag verarbeitet werden (vorausgesetzt, es gibt keine verpassten Slots). Wie oben angemerkt, werden Validatoren ohne berechtigte Abhebungen übersprungen, was die Zeit bis zum Abschluss der Abschöpfung verkürzt.

Wenn wir diese Berechnung erweitern, können wir die Zeit abschätzen, die benötigt wird, um eine bestimmte Anzahl von Abhebungen zu verarbeiten:

<TableContainer>

| Anzahl der Abhebungen | Dauer bis zum Abschluss |
| :-------------------: | :---------------------: |
|        400.000        |        3,5 Tage         |
|        500.000        |        4,3 Tage         |
|        600.000        |        5,2 Tage         |
|        700.000        |        6,1 Tage         |
|        800.000        |        7,0 Tage         |

</TableContainer>

Wie Sie sehen, verlangsamt sich dies, je mehr Validatoren im Netzwerk sind. Eine Zunahme verpasster Slots könnte dies proportional verlangsamen, aber dies stellt im Allgemeinen die langsamere Seite der möglichen Ergebnisse dar.

## Häufig gestellte Fragen {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nein, der Prozess zur Angabe von Auszahlungsberechtigungen ist ein einmaliger Vorgang und kann nach dem Einreichen nicht mehr geändert werden.
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Das Festlegen der Abhebungsadresse eines Validators auf der Ausführungsschicht ist eine dauerhafte Änderung der Berechtigungen des Validators auf der Konsensschicht. Es gibt keine Möglichkeit, die Berechtigungen auf der Konsensschicht zu aktualisieren, sobald sie registriert sind.

Die Auszahlungsberechtigungen eines Validators können so eingestellt werden, dass sie entweder auf einen Smart Contract (gesteuert durch seinen Code) oder auf ein Externally Owned Account (EOA, gesteuert durch seinen privaten Schlüssel) verweisen. Derzeit haben diese Konten keine Möglichkeit, eine Nachricht an die Konsensschicht zurückzusenden, die eine Änderung der Validator-Berechtigungen signalisieren würde, und das Hinzufügen dieser Funktionalität würde dem Protokoll unnötige Komplexität hinzufügen.

Benutzer, die eine flexible Abhebungsverwaltung suchen, können eine Smart-Contract-Wallet mit der Fähigkeit zur Schlüsselrotation (wie z. B. ein [Safe](https://safe.global/)) als Abhebungsadresse des Validators festlegen, wodurch das letztendliche Empfänger-EOA effektiv aktualisiert werden kann. Wenn ein Benutzer bereits ein EOA als Auszahlungsberechtigung festgelegt hat, muss er einen vollständigen Austritt initiieren, um sein gestaktes ETH zurückzuerhalten, und diese Gelder dann verwenden, um einen neuen Validator mit anderen Berechtigungen zu aktivieren.
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Wenn Sie einen Staking-Pool nutzen oder Staking-Token halten, wenden Sie sich an Ihren Anbieter, um zu erfahren, wie dieser Abhebungen handhabt, da die Prozesse je nach Dienst variieren.

Im Allgemeinen sollten Sie beim Staking über einen Anbieter oder Pool die Freiheit haben, Ihr zugrunde liegendes gestaktes ETH zurückzufordern oder abzuheben und den Staking-Anbieter zu wechseln. Wenn ein bestimmter Pool zu groß wird, kann gestaktes ETH abgehoben, eingelöst und bei einem [kleineren Anbieter](https://rated.network/) erneut gestakt werden. Oder, wenn Sie genug ETH angesammelt haben, könnten Sie [von zu Hause aus staken](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Für **Legacy-Validatoren (Typ 1)**, ja – solange Ihr Validator eine Abhebungsadresse angegeben hat. Diese muss einmalig angegeben werden, um jegliche Abhebungen zu ermöglichen, danach wird die Verteilung der Netzwerk-Belohnungen an die Abhebungsadresse alle paar Tage mit jeder Validator-Abschöpfung automatisch ausgelöst.

Bei **Compounding-Validatoren (Typ 2)** fließen die Belohnungen in das effektive Guthaben des Validators ein (bis zu 2048 ETH), anstatt auf die Abhebungsadresse abgeschöpft zu werden. Automatische Abschöpfungen erfolgen nur für Guthaben, die 2048 ETH übersteigen. Um Belohnungen unter diesem Schwellenwert abzuheben, müssen Sie manuell eine teilweise Abhebung von der Ausführungsschicht auslösen.
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Bei **Legacy-Validatoren (Typ 1)** werden alle ETH-Netzwerk-Belohnungen, die über das effektive Guthaben von 32 ETH des Validators hinaus angesammelt wurden, automatisch an die Abhebungsadresse gesendet. Bei Typ-1-Validatoren, die eine vollständige Abhebungstransaktion eingereicht und den Staking-Austrittsprozess abgeschlossen haben, wird ihr gesamtes ETH-Guthaben auf ihre Abhebungsadresse abgehoben. Es ist für einen Typ-1-Validator nicht möglich, manuell bestimmte ETH-Beträge zur Abhebung anzufordern.

**Compounding-Validatoren (Typ 2)** können teilweise Abhebungen eines bestimmten Betrags von der Ausführungsschicht auslösen, solange das verbleibende Guthaben des Validators bei oder über 32 ETH bleibt. Dies erfordert das Einreichen einer teilweisen Abhebungstransaktion und kostet Gas.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Validator-Betreibern wird empfohlen, die Seite [Staking Launchpad Abhebungen](https://launchpad.ethereum.org/withdrawals/) zu besuchen, auf der Sie weitere Details darüber finden, wie Sie Ihren Validator auf Abhebungen vorbereiten, zum zeitlichen Ablauf von Ereignissen und weitere Details zur Funktionsweise von Abhebungen.

Um Ihr Setup zunächst in einem Testnetz auszuprobieren, besuchen Sie das [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org), um loszulegen.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nein. Sobald ein Validator ausgetreten ist und sein gesamtes Guthaben abgehoben wurde, wird jedes zusätzliche ETH, das auf diesen Validator eingezahlt wird, während der nächsten Validator-Abschöpfung automatisch auf die Abhebungsadresse transferiert. Um mit diesem ETH wieder mit dem Staking zu beginnen, müssen Sie einen neuen Validator aktivieren.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Legacy-Validatoren verwenden Auszahlungsberechtigungen vom **Typ 1** (Adresse der Auszahlungsberechtigung beginnt mit 0x01) und haben ein effektives Guthaben, das auf 32 ETH begrenzt ist. Jedes überschüssige ETH, das als Netzwerk-Belohnungen erhalten wird, wird alle paar Tage automatisch auf die Abhebungsadresse abgeschöpft.

Compounding-Validatoren verwenden Auszahlungsberechtigungen vom **Typ 2** (Adresse der Auszahlungsberechtigung beginnt mit 0x02) und können ein effektives Guthaben von bis zu 2048 ETH haben. Belohnungen fließen in das effektive Guthaben des Validators ein, was das Gewicht des Validators im Netzwerk und das Potenzial für zukünftige Belohnungen erhöht. Automatische Abschöpfungen erfolgen nur für Guthaben, das 2048 ETH übersteigt. Um ETH unter diesem Schwellenwert abzuheben, muss eine manuelle teilweise Abhebung von der Ausführungsschicht ausgelöst werden.

Weitere Details finden Sie im [MaxEB-Deep-Dive](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Sie können Auszahlungsberechtigungen von Typ 1 in Typ 2 umwandeln, indem Sie das [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) verwenden. Dieser Vorgang ist **irreversibel** – sobald Sie umgewandelt haben, können Sie nicht mehr zu Typ-1-Berechtigungen zurückkehren.

Nach der Umwandlung können Sie auch mehrere Validatoren zu einem einzigen **konsolidieren**, indem Sie deren Guthaben in einem einzigen Compounding-Validator zusammenfassen. Eine vollständige Anleitung zum Umwandlungsprozess, zu den Risiken und zu den Konsolidierungs-Tools finden Sie im [MaxEB-Deep-Dive](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
Die Abhebungsfunktion wurde ursprünglich als Teil des Shanghai/Capella-Upgrades am **12. April 2023** aktiviert. Das [Pectra-Upgrade](/roadmap/pectra/) (Mai 2025) führte später Compounding-Validatoren mit einem höheren maximalen effektiven Guthaben von 2048 ETH sowie von der Ausführungsschicht ausgelöste Austritte und teilweise Abhebungen ein.

Das Shanghai/Capella-Upgrade ermöglichte es, zuvor gestaktes ETH auf reguläre Ethereum-Konten zurückzufordern. Dies schloss den Kreis der Staking-Liquidität und brachte Ethereum auf seinem Weg zum Aufbau eines nachhaltigen, skalierbaren und sicheren dezentralen Ökosystems einen Schritt weiter.

- [Mehr zur Geschichte von Ethereum](/ethereum-forks/)
- [Mehr zur Ethereum-Roadmap](/roadmap/)
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Staking Launchpad Abhebungen](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad Validator-Aktionen](https://launchpad.ethereum.org/validator-actions)
- [MaxEB-Deep-Dive: Compounding und Konsolidierung](/roadmap/pectra/maxeb/)
- [EIP-4895: Beacon Chain Push-Abhebungen als Operationen](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) mit Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations mit Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Das effektive Guthaben von Validatoren verstehen](https://www.attestant.io/posts/understanding-validator-effective-balance/)