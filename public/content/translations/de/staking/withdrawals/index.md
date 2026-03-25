---
title: Staking-Auszahlungen
description: Eine Seite, die zusammenfasst, was Staking-Push-Auszahlungen sind, wie sie funktionieren und was Staker tun müssen, um ihre Belohnungen zu erhalten.
lang: de
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Nashorn Leslie mit ihren Staking-Belohnungen
sidebarDepth: 2
summaryPoints:
  - Validator-Betreiber müssen eine Auszahlungsadresse angeben, um Auszahlungen zu ermöglichen
  - Bei Legacy-Validatoren wird das überschüssige Guthaben von über 32 ETH alle paar Tage automatisch ausgezahlt
  - Compounding-Validatoren (Zinseszins-Validatoren) verdienen Belohnungen auf ihr gesamtes Guthaben bis zu 2048 ETH
  - Validatoren, die das Staking vollständig beenden, erhalten ihr verbleibendes Guthaben
---

**Staking-Auszahlungen** beziehen sich auf Überweisungen von ETH von einem Validator-Konto auf der Konsensebene (der Beacon Chain) von Ethereum zur Ausführungsebene, wo damit Transaktionen durchgeführt werden können.

Wie Auszahlungen funktionieren, hängt von der Art der Auszahlungsberechtigung (Withdrawal Credential) Ihres Validators ab:

- **Legacy-Validatoren (Typ 1)**: Überschüssiges Guthaben von über 32 ETH wird automatisch und regelmäßig an die mit dem Validator verknüpfte Auszahlungsadresse gesendet. Belohnungen über 32 ETH tragen nicht zur Gewichtung des Validators im Netzwerk bei.
- **Compounding-Validatoren (Typ 2)**: Belohnungen werden dem effektiven Guthaben des Validators bis zu 2048 ETH hinzugefügt (Zinseszinseffekt), was die Gewichtung des Validators erhöht und mehr Belohnungen einbringt. Nur Guthaben, das 2048 ETH übersteigt, wird automatisch abgeschöpft (gesweept).

Benutzer können das **Staking auch vollständig beenden**, wodurch ihr gesamtes Validator-Guthaben freigeschaltet wird.

## Staking-Belohnungen {#staking-rewards}

Wie Belohnungen gehandhabt werden, hängt von der Art der Berechtigung des Validators ab:

**Legacy-Validatoren (Typ 1)** haben ein effektives Guthaben, das auf 32 ETH begrenzt ist. Jegliches Guthaben über 32 ETH, das durch Belohnungen verdient wird, trägt nicht zum Kapital bei oder erhöht die Gewichtung dieses Validators im Netzwerk und wird alle paar Tage automatisch als Belohnungszahlung ausgezahlt. Abgesehen von der einmaligen Angabe einer Auszahlungsadresse erfordern diese Belohnungen keine Aktion seitens des Validator-Betreibers. Dies wird alles auf der Konsensebene initiiert, daher ist in keinem Schritt Gas (Transaktionsgebühr) erforderlich.

**Compounding-Validatoren (Typ 2)** können ein effektives Guthaben zwischen 32 und 2048 ETH haben. Belohnungen, die von diesen Validatoren verdient werden, fließen in ihr effektives Guthaben ein, was die Gewichtung des Validators und zukünftige Belohnungen erhöht. Automatische Abschöpfungen (Sweeps) erfolgen nur für Guthaben, das 2048 ETH übersteigt. Um Belohnungen unterhalb der Grenze von 2048 ETH abzuheben, müssen Compounding-Validatoren manuell eine teilweise Auszahlung von der Ausführungsebene auslösen, was Gas erfordert.

### Wie sind wir hierher gekommen? {#how-did-we-get-here}

In den letzten Jahren hat [Ethereum](/) mehrere Netzwerk-Upgrades durchlaufen und ist zu einem Netzwerk übergegangen, das durch ETH selbst gesichert wird, anstatt durch energieintensives Mining wie früher. Die Teilnahme am Konsens auf Ethereum ist nun als „Staking“ bekannt, da die Teilnehmer freiwillig ETH gesperrt haben und es als „Einsatz“ (Stake) hinterlegen, um am Netzwerk teilnehmen zu können. Benutzer, die die Regeln befolgen, werden belohnt, während Versuche zu betrügen bestraft werden können.

Seit dem Start des Staking-Einzahlungsvertrags (Deposit Contract) im November 2020 haben einige mutige Ethereum-Pioniere freiwillig Gelder gesperrt, um „Validatoren“ zu aktivieren – spezielle Konten, die das Recht haben, Blöcke formell zu bestätigen und vorzuschlagen, wobei sie den Netzwerkregeln folgen.

Vor dem Shanghai/Capella-Upgrade konnten Sie Ihr gestaktes ETH nicht nutzen oder darauf zugreifen. Aber jetzt können Sie sich dafür entscheiden, Ihre Belohnungen automatisch auf ein ausgewähltes Konto zu erhalten, und Sie können Ihr gestaktes ETH auch jederzeit abheben.

### Wie bereite ich mich vor? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Wichtige Hinweise {#important-notices}

Die Angabe einer Auszahlungsadresse ist ein erforderlicher Schritt für jedes Validator-Konto, bevor es berechtigt ist, ETH von seinem Guthaben abzuheben.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Jedem Validator-Konto kann nur ein einziges Mal eine einzige Auszahlungsadresse zugewiesen werden.** Sobald eine Adresse ausgewählt und an die Konsensebene übermittelt wurde, kann dies nicht mehr rückgängig gemacht oder geändert werden. Überprüfen Sie den Besitz und die Richtigkeit der angegebenen Adresse vor dem Absenden genau.
</AlertDescription>
</AlertContent>
</Alert>

Es besteht **in der Zwischenzeit keine Gefahr für Ihre Gelder**, wenn Sie dies nicht angeben, vorausgesetzt, Ihre Mnemonic/Seed-Phrase ist sicher offline geblieben und wurde in keiner Weise kompromittiert. Wenn Sie keine Auszahlungsberechtigungen hinzufügen, bleibt das ETH einfach im Validator-Konto gesperrt, wie es bisher der Fall war, bis eine Auszahlungsadresse angegeben wird.

## Compounding-Validatoren {#compounding-validators}

Validatoren können sich für das **Compounding** (Zinseszinseffekt) entscheiden, indem sie ihre Auszahlungsberechtigungen von Typ 1 auf Typ 2 umstellen. Dies erhöht das maximale effektive Guthaben von 32 ETH auf **2048 ETH**, wodurch Belohnungen in das effektive Guthaben des Validators einfließen können, anstatt automatisch abgeschöpft zu werden.

Wenn Compounding aktiviert ist:

- Belohnungen erhöhen das effektive Guthaben des Validators in Schritten von 1 ETH (vorbehaltlich eines kleinen [Hysterese-Puffers](https://www.attestant.io/posts/understanding-validator-effective-balance/)), wodurch im Laufe der Zeit mehr Belohnungen verdient werden
- Automatische Abschöpfungen (Sweeps) erfolgen nur für Guthaben, das 2048 ETH übersteigt
- Teilweise Auszahlungen unterhalb der Grenze von 2048 ETH müssen manuell von der Ausführungsebene ausgelöst werden (dies kostet Gas)
- Mehrere Validatoren können zu einem einzigen Compounding-Validator **konsolidiert** werden, was den operativen Aufwand reduziert

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Die Umwandlung von Auszahlungsberechtigungen des Typs 1 in Typ 2 ist irreversibel.** Verwenden Sie das [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) als offizielles Tool für diese Umwandlung. Weitere Details zum Umwandlungsprozess, zu den Risiken und zur Konsolidierung finden Sie im [MaxEB Deep-Dive](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Das Staking vollständig beenden {#exiting-staking-entirely}

Die Angabe einer Auszahlungsadresse ist erforderlich, bevor _irgendwelche_ Gelder aus dem Guthaben eines Validator-Kontos überwiesen werden können.

Benutzer, die das Staking vollständig beenden und ihr gesamtes Guthaben zurückziehen möchten, müssen einen „freiwilligen Ausstieg“ (voluntary exit) initiieren. Dies kann auf zwei Arten erfolgen:

- **Verwendung von Validator-Schlüsseln**: Signieren und senden Sie eine Nachricht zum freiwilligen Ausstieg mit Ihrem Validator-Client, die an Ihren Konsens-Knoten (Blockchain-Knoten) übermittelt wird. Dies erfordert kein Gas.
- **Verwendung von Auszahlungsberechtigungen**: Lösen Sie einen Ausstieg von der Ausführungsebene unter Verwendung Ihrer Auszahlungsadresse aus, ohne Zugriff auf den Signaturschlüssel des Validators zu benötigen. Dies erfordert eine Transaktion und kostet Gas.

Der Prozess des Ausstiegs eines Validators aus dem Staking nimmt unterschiedlich viel Zeit in Anspruch, je nachdem, wie viele andere gleichzeitig aussteigen. Sobald dies abgeschlossen ist, ist dieses Konto nicht mehr für die Erfüllung von Validator-Netzwerkaufgaben verantwortlich, hat keinen Anspruch mehr auf Belohnungen und hat sein ETH nicht mehr als „Einsatz“ (at stake). Zu diesem Zeitpunkt wird das Konto als vollständig „auszahlbar“ (withdrawable) markiert.

Sobald ein Konto als „auszahlbar“ markiert ist und Auszahlungsberechtigungen angegeben wurden, muss ein Benutzer nichts weiter tun, als zu warten. Konten werden automatisch und kontinuierlich von Block-Vorschlagenden auf berechtigte, ausgestiegene Gelder überprüft (gesweept), und Ihr Kontostand wird während des nächsten <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>Sweeps</a> vollständig überwiesen (auch bekannt als „vollständige Auszahlung“).

## Wann wurden Staking-Auszahlungen aktiviert? {#when}

Die Auszahlungsfunktion wurde ursprünglich als Teil des Shanghai/Capella-Upgrades am **12. April 2023** aktiviert. Das [Pectra-Upgrade](/roadmap/pectra/) (Mai 2025) führte später Compounding-Validatoren mit einem höheren maximalen effektiven Guthaben von 2048 ETH sowie von der Ausführungsebene ausgelöste Ausstiege und teilweise Auszahlungen ein.

Das Shanghai/Capella-Upgrade ermöglichte es, zuvor gestaktes ETH auf reguläre Ethereum-Konten zurückzufordern. Dies schloss den Kreis der Staking-Liquidität und brachte Ethereum einen Schritt weiter auf seinem Weg zum Aufbau eines nachhaltigen, skalierbaren und sicheren dezentralisierten Ökosystems.

- [Mehr zur Geschichte von Ethereum](/ethereum-forks/)
- [Mehr zur Ethereum-Roadmap](/roadmap/)

## Wie funktionieren Auszahlungszahlungen? {#how-do-withdrawals-work}

Ob ein bestimmter Validator für eine Auszahlung berechtigt ist oder nicht, wird durch den Status des Validator-Kontos selbst bestimmt. Es ist zu keinem Zeitpunkt eine Benutzereingabe erforderlich, um zu bestimmen, ob für ein Konto eine Auszahlung initiiert werden soll oder nicht – der gesamte Prozess wird automatisch von der Konsensebene in einer Endlosschleife durchgeführt.

### Lernen Sie lieber visuell? {#visual-learner}

Sehen Sie sich diese Erklärung zu Ethereum-Staking-Auszahlungen von Finematics an:

<YouTube id="RwwU3P9n3uo" />

### Validator-„Sweeping“ {#validator-sweeping}

Wenn ein Validator an der Reihe ist, den nächsten Block vorzuschlagen, muss er eine Auszahlungswarteschlange mit bis zu 16 berechtigten Auszahlungen erstellen. Dies geschieht, indem ursprünglich mit dem Validator-Index 0 begonnen wird, ermittelt wird, ob es für dieses Konto gemäß den Regeln des Protokolls eine berechtigte Auszahlung gibt, und diese der Warteschlange hinzugefügt wird, falls dies der Fall ist. Der Validator, der den folgenden Block vorschlagen soll, macht dort weiter, wo der letzte aufgehört hat, und setzt dies in der Reihenfolge auf unbestimmte Zeit fort.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Denken Sie an eine analoge Uhr. Der Zeiger der Uhr zeigt auf die Stunde, bewegt sich in eine Richtung, überspringt keine Stunden und fängt schließlich wieder von vorne an, nachdem die letzte Zahl erreicht ist.

Stellen Sie sich nun vor, die Uhr hat statt 1 bis 12 die Zahlen 0 bis N _(die Gesamtzahl der Validator-Konten, die jemals auf der Konsensebene registriert wurden, über 500.000 Stand Januar 2023)._

Der Zeiger der Uhr zeigt auf den nächsten Validator, der auf berechtigte Auszahlungen überprüft werden muss. Er beginnt bei 0 und geht einmal ganz herum, ohne Konten zu überspringen. Wenn der letzte Validator erreicht ist, beginnt der Zyklus wieder von vorn.
</AlertDescription>
</AlertContent>
</Alert>

#### Überprüfung eines Kontos auf Auszahlungen {#checking-an-account-for-withdrawals}

Während ein Block-Vorschlagender die Validatoren auf mögliche Auszahlungen überprüft (sweept), wird jeder überprüfte Validator anhand einer kurzen Reihe von Fragen bewertet, um festzustellen, ob eine Auszahlung ausgelöst werden soll und wenn ja, wie viel ETH ausgezahlt werden soll.

1. **Wurde eine Auszahlungsadresse angegeben?** Wenn keine Auszahlungsadresse angegeben wurde, wird das Konto übersprungen und keine Auszahlung initiiert.
2. **Ist der Validator ausgestiegen und auszahlbar?** Wenn der Validator vollständig ausgestiegen ist und wir die Epoche erreicht haben, in der sein Konto als „auszahlbar“ gilt, wird eine vollständige Auszahlung verarbeitet. Dadurch wird das gesamte verbleibende Guthaben auf die Auszahlungsadresse überwiesen.
3. **Übersteigt das Guthaben das maximale effektive Guthaben?** Für Legacy-Validatoren (Typ 1) liegt dieser Schwellenwert bei 32 ETH. Für Compounding-Validatoren (Typ 2) liegt dieser Schwellenwert bei 2048 ETH. Wenn das Konto über Auszahlungsberechtigungen verfügt, nicht vollständig ausgestiegen ist und ein Guthaben über seinem Schwellenwert aufweist, wird eine teilweise Auszahlung verarbeitet, bei der nur der Überschuss auf die Auszahlungsadresse des Benutzers überwiesen wird.

Es gibt nur zwei Aktionen, die von Validator-Betreibern im Laufe des Lebenszyklus eines Validators durchgeführt werden und diesen Ablauf direkt beeinflussen:

- Angabe von Auszahlungsberechtigungen, um jede Form der Auszahlung zu ermöglichen
- Ausstieg aus dem Netzwerk, was eine vollständige Auszahlung auslöst

### Gasfrei {#gas-free}

Automatische Auszahlungs-Sweeps erfordern nicht, dass Staker manuell eine Transaktion einreichen. Das bedeutet, dass für automatische Sweeps **kein Gas (Transaktionsgebühr) erforderlich** ist und sie nicht um den vorhandenen Block-Speicherplatz auf der Ausführungsebene konkurrieren.

Beachten Sie, dass [Compounding-Validatoren](#compounding-validators), die eine teilweise Auszahlung unterhalb der Grenze von 2048 ETH auslösen möchten, dies manuell von der Ausführungsebene aus tun müssen, was Gas erfordert.

### Wie oft erhalte ich meine Staking-Belohnungen? {#how-soon}

In einem einzigen Block können maximal 16 Auszahlungen verarbeitet werden. Bei dieser Rate können 115.200 Validator-Auszahlungen pro Tag verarbeitet werden (vorausgesetzt, es gibt keine verpassten Slots). Wie oben erwähnt, werden Validatoren ohne berechtigte Auszahlungen übersprungen, was die Zeit bis zum Abschluss des Sweeps verkürzt.

Wenn wir diese Berechnung erweitern, können wir die Zeit abschätzen, die für die Verarbeitung einer bestimmten Anzahl von Auszahlungen benötigt wird:

<TableContainer>

| Anzahl der Auszahlungen | Zeit bis zum Abschluss |
| :-------------------: | :--------------: |
|        400.000        |     3,5 Tage     |
|        500.000        |     4,3 Tage     |
|        600.000        |     5,2 Tage     |
|        700.000        |     6,1 Tage     |
|        800.000        |     7,0 Tage     |

</TableContainer>

Wie Sie sehen, verlangsamt sich dies, je mehr Validatoren im Netzwerk sind. Eine Zunahme an verpassten Slots könnte dies proportional verlangsamen, aber dies stellt im Allgemeinen die langsamere Seite der möglichen Ergebnisse dar.

## Häufig gestellte Fragen {#faq}

<ExpandableCard
title="Sobald ich eine Auszahlungsadresse angegeben habe, kann ich sie in eine alternative Auszahlungsadresse ändern?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nein, der Prozess zur Angabe von Auszahlungsberechtigungen ist ein einmaliger Vorgang und kann nach dem Absenden nicht mehr geändert werden.
</ExpandableCard>

<ExpandableCard
title="Warum kann eine Auszahlungsadresse nur einmal festgelegt werden?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Durch das Festlegen einer Auszahlungsadresse auf der Ausführungsebene wurden die Auszahlungsberechtigungen für diesen Validator dauerhaft geändert. Das bedeutet, dass die alten Berechtigungen nicht mehr funktionieren und die neuen Berechtigungen auf ein Konto der Ausführungsebene verweisen.

Auszahlungsadressen können entweder ein Smart Contract (gesteuert durch seinen Code) oder ein extern verwaltetes Konto (EOA, gesteuert durch seinen Private-Key) sein. Derzeit haben diese Konten keine Möglichkeit, eine Nachricht an die Konsensebene zurückzusenden, die eine Änderung der Validator-Berechtigungen signalisieren würde, und das Hinzufügen dieser Funktionalität würde dem Protokoll unnötige Komplexität verleihen.

Als Alternative zur Änderung der Auszahlungsadresse für einen bestimmten Validator können Benutzer einen Smart Contract als ihre Auszahlungsadresse festlegen, der die Schlüsselrotation handhaben könnte, wie z. B. ein Safe. Benutzer, die ihre Gelder auf ihr eigenes EOA festlegen, können einen vollständigen Ausstieg durchführen, um alle ihre gestakten Gelder abzuheben, und dann mit neuen Berechtigungen erneut staken.
</ExpandableCard>

<ExpandableCard
title="Was ist, wenn ich an Staking-Token oder gepooltem Staking teilnehme?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Wenn Sie Teil eines [Staking-Pools](/staking/pools/) sind oder Staking-Token halten, sollten Sie sich bei Ihrem Anbieter nach weiteren Details zur Handhabung von Staking-Auszahlungen erkundigen, da jeder Dienst anders funktioniert.

Im Allgemeinen sollten Benutzer frei sein, ihr zugrunde liegendes gestaktes ETH zurückzufordern oder den von ihnen genutzten Staking-Anbieter zu wechseln. Wenn ein bestimmter Pool zu groß wird, können Gelder abgezogen, eingelöst und bei einem [kleineren Anbieter](https://rated.network/) erneut gestakt werden. Oder, wenn Sie genug ETH angesammelt haben, könnten Sie [von zu Hause aus staken](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Erfolgen Belohnungszahlungen (teilweise Auszahlungen) automatisch?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Für **Legacy-Validatoren (Typ 1)**, ja – solange Ihr Validator eine Auszahlungsadresse angegeben hat. Diese muss einmalig angegeben werden, um Auszahlungen überhaupt zu ermöglichen. Danach werden Belohnungszahlungen alle paar Tage mit jedem Validator-Sweep automatisch ausgelöst.

Bei **Compounding-Validatoren (Typ 2)** fließen die Belohnungen in das effektive Guthaben ein, anstatt abgeschöpft zu werden. Automatische Sweeps erfolgen nur für Guthaben, das 2048 ETH übersteigt. Um Belohnungen unterhalb dieses Schwellenwerts abzuheben, müssen Sie manuell eine teilweise Auszahlung von der Ausführungsebene auslösen.
</ExpandableCard>

<ExpandableCard
title="Erfolgen vollständige Auszahlungen automatisch?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Nein, wenn Ihr Validator noch im Netzwerk aktiv ist, erfolgt eine vollständige Auszahlung nicht automatisch. Dies erfordert die manuelle Initiierung eines freiwilligen Ausstiegs.

Sobald ein Validator den Ausstiegsprozess abgeschlossen hat und vorausgesetzt, das Konto verfügt über Auszahlungsberechtigungen, wird das verbleibende Guthaben _dann_ während des nächsten <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>Validator-Sweeps</a> ausgezahlt.

</ExpandableCard>

<ExpandableCard title="Kann ich einen benutzerdefinierten Betrag abheben?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Bei **Legacy-Validatoren (Typ 1)** werden Auszahlungen automatisch gepusht, wobei jegliches ETH überwiesen wird, das nicht aktiv zum Einsatz (Stake) beiträgt. Dies schließt vollständige Guthaben für Konten ein, die den Ausstiegsprozess abgeschlossen haben. Es ist nicht möglich, für Typ-1-Validatoren manuell die Auszahlung bestimmter ETH-Beträge anzufordern.

**Compounding-Validatoren (Typ 2)** können teilweise Auszahlungen eines bestimmten Betrags von der Ausführungsebene auslösen, solange das verbleibende Guthaben bei oder über 32 ETH bleibt. Dies erfordert eine Transaktion und kostet Gas.
</ExpandableCard>

<ExpandableCard
title="Ich betreibe einen Validator. Wo finde ich weitere Informationen zur Aktivierung von Auszahlungen?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Validator-Betreibern wird empfohlen, die Seite [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals/) zu besuchen, auf der Sie weitere Details dazu finden, wie Sie Ihren Validator auf Auszahlungen vorbereiten, zum zeitlichen Ablauf von Ereignissen und weitere Details zur Funktionsweise von Auszahlungen.

Um Ihr Setup zunächst in einem Testnet auszuprobieren, besuchen Sie das [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org), um loszulegen.

</ExpandableCard>

<ExpandableCard
title="Kann ich meinen Validator nach dem Ausstieg reaktivieren, indem ich mehr ETH einzahle?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nein. Sobald ein Validator ausgestiegen ist und sein gesamtes Guthaben abgehoben wurde, werden alle zusätzlichen Gelder, die auf diesen Validator eingezahlt werden, während des nächsten Validator-Sweeps automatisch auf die Auszahlungsadresse überwiesen. Um ETH erneut zu staken, muss ein neuer Validator aktiviert werden.
</ExpandableCard>

<ExpandableCard
title="Was ist der Unterschied zwischen Legacy- und Compounding-Validatoren?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Legacy-Validatoren verwenden Auszahlungsberechtigungen des **Typs 1** und haben ein effektives Guthaben, das auf 32 ETH begrenzt ist. Jeder Überschuss wird alle paar Tage automatisch auf die Auszahlungsadresse abgeschöpft (gesweept).

Compounding-Validatoren verwenden Auszahlungsberechtigungen des **Typs 2** und können ein effektives Guthaben von bis zu 2048 ETH haben. Belohnungen fließen in ihr effektives Guthaben ein, was die Gewichtung des Validators im Netzwerk und zukünftige Belohnungen erhöht. Automatische Sweeps erfolgen nur für Guthaben, das 2048 ETH übersteigt. Um unterhalb dieses Schwellenwerts abzuheben, muss eine manuelle teilweise Auszahlung von der Ausführungsebene ausgelöst werden.

Weitere Details finden Sie im [MaxEB Deep-Dive](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Wie wechsle ich zu einem Compounding-Validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Sie können Ihre Auszahlungsberechtigungen über das [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) von Typ 1 in Typ 2 umwandeln. Dieser Vorgang ist **irreversibel** – sobald Sie umgewandelt haben, können Sie nicht mehr zu Typ-1-Berechtigungen zurückkehren.

Nach der Umwandlung können Sie auch mehrere Validatoren zu einem einzigen **konsolidieren**, indem Sie deren Guthaben in einem einzigen Compounding-Validator zusammenfassen. Eine vollständige Anleitung zum Umwandlungsprozess, zu den Risiken und zu den Konsolidierungstools finden Sie im [MaxEB Deep-Dive](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad Validator Actions](https://launchpad.ethereum.org/validator-actions)
- [MaxEB Deep-Dive: Compounding und Konsolidierung](/roadmap/pectra/maxeb/)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) with Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations with Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Understanding Validator Effective Balance](https://www.attestant.io/posts/understanding-validator-effective-balance/)