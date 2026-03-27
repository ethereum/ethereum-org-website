---
title: Staking-Abhebungen
description: "Seite, die zusammenfasst, was Staking-Push-Abhebungen sind, wie sie funktionieren und was Staker tun müssen, um ihre Belohnungen zu erhalten"
lang: de
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Nashorn Leslie mit ihren Staking-Belohnungen
sidebarDepth: 2
summaryPoints:
  - Das Shanghai/Capella-Upgrade hat Staking-Abhebungen auf Ethereum ermöglicht
  - Validator-Betreiber müssen eine Abhebungsadresse angeben, um dies zu aktivieren
  - Belohnungen werden alle paar Tage automatisch verteilt
  - Validatoren, die das Staking vollständig beenden, erhalten ihr verbleibendes Guthaben
---

**Staking-Abhebungen** beziehen sich auf Übertragungen von ETH von einem Validator-Konto auf der Konsensebene (der Beacon Chain) von Ethereum zur Ausführungsebene, wo damit Transaktionen durchgeführt werden können.

**Belohnungszahlungen für überschüssiges Guthaben** von mehr als 32 ETH werden automatisch und regelmäßig an eine mit jedem Validator verknüpfte Abhebungsadresse gesendet, sobald diese vom Benutzer angegeben wurde. Benutzer können das **Staking auch vollständig beenden**, wodurch ihr gesamtes Validator-Guthaben freigeschaltet wird.

## Staking-Belohnungen {#staking-rewards}

Belohnungszahlungen werden automatisch für aktive Validator-Konten mit einem maximalen effektiven Guthaben von 32 ETH verarbeitet.

Jedes durch Belohnungen verdiente Guthaben über 32 ETH trägt nicht zum Grundkapital bei oder erhöht das Gewicht dieses Validators im Netzwerk und wird daher alle paar Tage automatisch als Belohnungszahlung abgehoben. Abgesehen von der einmaligen Angabe einer Abhebungsadresse erfordern diese Belohnungen keine Aktion seitens des Validator-Betreibers. Dies wird alles auf der Konsensebene initiiert, daher ist in keinem Schritt Gas (Transaktionsgebühr) erforderlich.

### Wie sind wir hierher gekommen? {#how-did-we-get-here}

In den letzten Jahren hat [Ethereum](/) mehrere Netzwerk-Upgrades durchlaufen und ist zu einem Netzwerk übergegangen, das durch ETH selbst gesichert wird, anstatt durch energieintensives Mining wie früher. Die Teilnahme am Konsens auf Ethereum ist nun als „Staking“ bekannt, da die Teilnehmer freiwillig ETH gesperrt haben und es als „Einsatz“ (Stake) hinterlegen, um am Netzwerk teilnehmen zu können. Benutzer, die die Regeln befolgen, werden belohnt, während Betrugsversuche bestraft werden können.

Seit dem Start des Staking-Einzahlungsvertrags im November 2020 haben einige mutige Ethereum-Pioniere freiwillig Gelder gesperrt, um „Validatoren“ zu aktivieren – spezielle Konten, die das Recht haben, Blöcke formell zu bestätigen und vorzuschlagen, wobei sie den Netzwerkregeln folgen.

Vor dem Shanghai/Capella-Upgrade konnten Sie Ihre gestakten ETH nicht nutzen oder darauf zugreifen. Aber jetzt können Sie sich dafür entscheiden, Ihre Belohnungen automatisch auf ein ausgewähltes Konto zu erhalten, und Sie können Ihre gestakten ETH auch jederzeit abheben.

### Wie bereite ich mich vor? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Wichtige Hinweise {#important-notices}

Die Angabe einer Abhebungsadresse ist ein erforderlicher Schritt für jedes Validator-Konto, bevor es berechtigt ist, ETH von seinem Guthaben abzuheben.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
  <strong>Jedem Validator-Konto kann nur ein einziges Mal eine einzige Abhebungsadresse zugewiesen werden.</strong> Sobald eine Adresse ausgewählt und an die Konsensebene übermittelt wurde, kann dies nicht mehr rückgängig gemacht oder geändert werden. Überprüfen Sie den Besitz und die Richtigkeit der angegebenen Adresse vor dem Absenden sorgfältig.
</AlertDescription>
</AlertContent>
</Alert>

Es besteht <strong>in der Zwischenzeit keine Gefahr für Ihre Gelder</strong>, wenn Sie dies nicht angeben, vorausgesetzt, Ihre Mnemonic/Seed-Phrase ist sicher offline geblieben und wurde in keiner Weise kompromittiert. Wenn Sie keine Abhebungsdaten hinzufügen, bleiben die ETH einfach im Validator-Konto gesperrt, wie es bisher der Fall war, bis eine Abhebungsadresse angegeben wird.

## Das Staking vollständig beenden {#exiting-staking-entirely}

Die Angabe einer Abhebungsadresse ist erforderlich, bevor _irgendwelche_ Gelder aus dem Guthaben eines Validator-Kontos überwiesen werden können.

Benutzer, die das Staking vollständig beenden und ihr gesamtes Guthaben abheben möchten, müssen außerdem eine Nachricht zum „freiwilligen Ausstieg“ mit den Validator-Schlüsseln signieren und übertragen, wodurch der Prozess des Beendens des Stakings gestartet wird. Dies geschieht mit Ihrem Validator-Client und wird an Ihren Konsens-Blockchain-Knoten übermittelt, wofür kein Gas erforderlich ist.

Der Prozess, bei dem ein Validator das Staking beendet, nimmt unterschiedlich viel Zeit in Anspruch, je nachdem, wie viele andere gleichzeitig aussteigen. Sobald dies abgeschlossen ist, ist dieses Konto nicht mehr für die Erfüllung von Validator-Netzwerkaufgaben verantwortlich, hat keinen Anspruch mehr auf Belohnungen und hat seine ETH nicht mehr als „Einsatz“. Zu diesem Zeitpunkt wird das Konto als vollständig „abhebbar“ markiert.

Sobald ein Konto als „abhebbar“ markiert ist und Abhebungsdaten angegeben wurden, muss ein Benutzer nichts weiter tun, als zu warten. Konten werden automatisch und kontinuierlich von Block-Vorschlagenden auf berechtigte, ausgestiegene Gelder überprüft, und Ihr Kontostand wird beim nächsten <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>Sweep</a> vollständig überwiesen (auch bekannt als „vollständige Abhebung“).

## Wann wurden Staking-Abhebungen aktiviert? {#when}

Die Abhebungsfunktion wurde als Teil des Shanghai/Capella-Upgrades aktiviert, das am **12. April 2023** stattfand.

Das Shanghai/Capella-Upgrade ermöglichte es, zuvor gestakte ETH auf reguläre Ethereum-Konten zurückzufordern. Dies schloss den Kreis der Staking-Liquidität und brachte Ethereum auf seinem Weg zum Aufbau eines nachhaltigen, skalierbaren, sicheren und dezentralisierten Ökosystems einen Schritt weiter.

- [Mehr zur Ethereum-Geschichte](/ethereum-forks/)
- [Mehr zur Ethereum-Roadmap](/roadmap/)

## Wie funktionieren Abhebungszahlungen? {#how-do-withdrawals-work}

Ob ein bestimmter Validator für eine Abhebung berechtigt ist oder nicht, wird durch den Status des Validator-Kontos selbst bestimmt. Es ist zu keinem Zeitpunkt eine Benutzereingabe erforderlich, um zu bestimmen, ob für ein Konto eine Abhebung initiiert werden soll oder nicht – der gesamte Prozess wird automatisch von der Konsensebene in einer Endlosschleife durchgeführt.

### Lernen Sie eher visuell? {#visual-learner}

Sehen Sie sich diese Erklärung zu Ethereum-Staking-Abhebungen von Finematics an:

<YouTube id="RwwU3P9n3uo" />

### Validator-„Sweeping“ {#validator-sweeping}

Wenn ein Validator an der Reihe ist, den nächsten Block vorzuschlagen, muss er eine Abhebungswarteschlange mit bis zu 16 berechtigten Abhebungen erstellen. Dies geschieht, indem ursprünglich bei Validator-Index 0 begonnen wird, um festzustellen, ob für dieses Konto gemäß den Regeln des Protokolls eine berechtigte Abhebung vorliegt, und diese gegebenenfalls zur Warteschlange hinzugefügt wird. Der Validator, der den folgenden Block vorschlagen soll, macht dort weiter, wo der letzte aufgehört hat, und setzt dies in der Reihenfolge auf unbestimmte Zeit fort.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Stellen Sie sich eine analoge Uhr vor. Der Zeiger der Uhr zeigt auf die Stunde, bewegt sich in eine Richtung, überspringt keine Stunden und fängt schließlich wieder von vorne an, nachdem die letzte Zahl erreicht ist.<br/><br/>
Stellen Sie sich nun vor, die Uhr hat statt 1 bis 12 die Zahlen 0 bis N <em>(die Gesamtzahl der Validator-Konten, die jemals auf der Konsensebene registriert wurden, über 500.000 Stand Januar 2023).</em><br/><br/>
Der Zeiger der Uhr zeigt auf den nächsten Validator, der auf berechtigte Abhebungen überprüft werden muss. Er beginnt bei 0 und geht einmal ganz herum, ohne Konten zu überspringen. Wenn der letzte Validator erreicht ist, beginnt der Zyklus wieder von vorn.
</AlertDescription>
</AlertContent>
</Alert>

#### Überprüfung eines Kontos auf Abhebungen {#checking-an-account-for-withdrawals}

Während ein Vorschlagender die Validatoren auf mögliche Abhebungen überprüft, wird jeder überprüfte Validator anhand einer kurzen Reihe von Fragen bewertet, um festzustellen, ob eine Abhebung ausgelöst werden soll und wenn ja, wie viel ETH abgehoben werden sollen.

1. **Wurde eine Abhebungsadresse angegeben?** Wenn keine Abhebungsadresse angegeben wurde, wird das Konto übersprungen und keine Abhebung initiiert.
2. **Ist der Validator ausgestiegen und abhebbar?** Wenn der Validator vollständig ausgestiegen ist und wir die Epoche erreicht haben, in der sein Konto als „abhebbar“ gilt, wird eine vollständige Abhebung verarbeitet. Dadurch wird das gesamte verbleibende Guthaben auf die Abhebungsadresse überwiesen.
3. **Ist das effektive Guthaben bei 32 maximiert?** Wenn das Konto über Abhebungsdaten verfügt, nicht vollständig ausgestiegen ist und Belohnungen über 32 ETH warten, wird eine teilweise Abhebung verarbeitet, bei der nur die Belohnungen über 32 ETH an die Abhebungsadresse des Benutzers überwiesen werden.

Es gibt nur zwei Aktionen, die von Validator-Betreibern im Laufe des Lebenszyklus eines Validators durchgeführt werden und diesen Ablauf direkt beeinflussen:

- Angabe von Abhebungsdaten, um jede Form der Abhebung zu ermöglichen
- Ausstieg aus dem Netzwerk, was eine vollständige Abhebung auslöst

### Gasfrei {#gas-free}

Dieser Ansatz für Staking-Abhebungen vermeidet, dass Staker manuell eine Transaktion einreichen müssen, um die Abhebung eines bestimmten ETH-Betrags anzufordern. Das bedeutet, dass **kein Gas (Transaktionsgebühr) erforderlich ist** und Abhebungen auch nicht um den vorhandenen Blockplatz auf der Ausführungsebene konkurrieren.

### Wie oft erhalte ich meine Staking-Belohnungen? {#how-soon}

Maximal 16 Abhebungen können in einem einzigen Block verarbeitet werden. Bei dieser Rate können 115.200 Validator-Abhebungen pro Tag verarbeitet werden (vorausgesetzt, es gibt keine verpassten Slots). Wie oben erwähnt, werden Validatoren ohne berechtigte Abhebungen übersprungen, was die Zeit bis zum Abschluss des Sweeps verkürzt.

Wenn wir diese Berechnung erweitern, können wir die Zeit abschätzen, die für die Verarbeitung einer bestimmten Anzahl von Abhebungen benötigt wird:

<TableContainer>

| Anzahl der Abhebungen | Dauer bis zum Abschluss |
| :-------------------: | :--------------: |
|        400.000        |     3,5 Tage     |
|        500.000        |     4,3 Tage     |
|        600.000        |     5,2 Tage     |
|        700.000        |     6,1 Tage     |
|        800.000        |     7,0 Tage     |

</TableContainer>

Wie Sie sehen, verlangsamt sich dies, je mehr Validatoren im Netzwerk sind. Eine Zunahme verpasster Slots könnte dies proportional verlangsamen, aber dies stellt im Allgemeinen die langsamere Seite der möglichen Ergebnisse dar.

## Häufig gestellte Fragen {#faq}

<ExpandableCard
title="Kann ich eine bereits angegebene Abhebungsadresse ändern?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nein, der Prozess zur Angabe von Abhebungsdaten ist ein einmaliger Vorgang und kann nach dem Absenden nicht mehr geändert werden.
</ExpandableCard>

<ExpandableCard
title="Warum kann eine Abhebungsadresse nur einmal festgelegt werden?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Durch das Festlegen einer Abhebungsadresse auf der Ausführungsebene wurden die Abhebungsdaten für diesen Validator dauerhaft geändert. Das bedeutet, dass die alten Daten nicht mehr funktionieren und die neuen Daten auf ein Konto auf der Ausführungsebene verweisen.

Abhebungsadressen können entweder ein Smart Contract (gesteuert durch seinen Code) oder ein extern verwaltetes Konto (EOA, gesteuert durch seinen Private-Key) sein. Derzeit haben diese Konten keine Möglichkeit, eine Nachricht an die Konsensebene zurückzusenden, die eine Änderung der Validator-Daten signalisieren würde, und das Hinzufügen dieser Funktionalität würde dem Protokoll unnötige Komplexität verleihen.

Als Alternative zur Änderung der Abhebungsadresse für einen bestimmten Validator können Benutzer einen Smart Contract als ihre Abhebungsadresse festlegen, der die Schlüsselrotation handhaben könnte, wie z. B. ein Safe. Benutzer, die ihre Gelder auf ihr eigenes EOA festlegen, können einen vollständigen Ausstieg durchführen, um alle ihre gestakten Gelder abzuheben, und dann mit neuen Daten erneut staken.
</ExpandableCard>

<ExpandableCard
title="Was ist, wenn ich an Staking-Token oder gepooltem Staking teilnehme?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Wenn Sie Teil eines [Staking-Pools](/staking/pools/) sind oder Staking-Token halten, sollten Sie sich bei Ihrem Anbieter nach weiteren Details zur Handhabung von Staking-Abhebungen erkundigen, da jeder Dienst anders funktioniert.

Im Allgemeinen sollte es Benutzern freistehen, ihre zugrunde liegenden gestakten ETH zurückzufordern oder den Staking-Anbieter zu wechseln. Wenn ein bestimmter Pool zu groß wird, können Gelder abgezogen, eingelöst und bei einem <a href="https://rated.network/">kleineren Anbieter</a> erneut gestakt werden. Oder, wenn Sie genug ETH angesammelt haben, könnten Sie [von zu Hause aus staken](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Erfolgen Belohnungszahlungen (teilweise Abhebungen) automatisch?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ja, solange Ihr Validator eine Abhebungsadresse angegeben hat. Diese muss einmalig angegeben werden, um Abhebungen überhaupt zu ermöglichen. Danach werden Belohnungszahlungen alle paar Tage mit jedem Validator-Sweep automatisch ausgelöst.
</ExpandableCard>

<ExpandableCard
title="Erfolgen vollständige Abhebungen automatisch?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Nein, wenn Ihr Validator noch im Netzwerk aktiv ist, erfolgt eine vollständige Abhebung nicht automatisch. Dies erfordert die manuelle Initiierung eines freiwilligen Ausstiegs.

Sobald ein Validator den Ausstiegsprozess abgeschlossen hat und vorausgesetzt, das Konto verfügt über Abhebungsdaten, wird das verbleibende Guthaben <em>dann</em> während des nächsten <a href="#validator-sweeping">Validator-Sweeps</a> abgehoben.

</ExpandableCard>

<ExpandableCard title="Kann ich einen benutzerdefinierten Betrag abheben?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Abhebungen sind so konzipiert, dass sie automatisch gepusht werden und alle ETH übertragen, die nicht aktiv zum Einsatz beitragen. Dies schließt vollständige Guthaben für Konten ein, die den Ausstiegsprozess abgeschlossen haben.

Es ist nicht möglich, manuell die Abhebung bestimmter ETH-Beträge anzufordern.
</ExpandableCard>

<ExpandableCard
title="Ich betreibe einen Validator. Wo finde ich weitere Informationen zur Aktivierung von Abhebungen?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Validator-Betreibern wird empfohlen, die Seite <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> zu besuchen, auf der Sie weitere Details zur Vorbereitung Ihres Validators auf Abhebungen, zum zeitlichen Ablauf von Ereignissen und zur Funktionsweise von Abhebungen finden.

Um Ihr Setup zunächst in einem Testnet auszuprobieren, besuchen Sie das <a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Staking Launchpad</a>, um loszulegen.

</ExpandableCard>

<ExpandableCard
title="Kann ich meinen Validator nach dem Ausstieg reaktivieren, indem ich mehr ETH einzahle?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nein. Sobald ein Validator ausgestiegen ist und sein gesamtes Guthaben abgehoben wurde, werden alle zusätzlichen Gelder, die auf diesen Validator eingezahlt werden, beim nächsten Validator-Sweep automatisch an die Abhebungsadresse überwiesen. Um ETH erneut zu staken, muss ein neuer Validator aktiviert werden.
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) mit Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations mit Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Understanding Validator Effective Balance](https://www.attestant.io/posts/understanding-validator-effective-balance/)