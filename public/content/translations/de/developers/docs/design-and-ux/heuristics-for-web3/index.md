---
title: 7 Heuristiken für das Design von Web3-Schnittstellen
description: Grundsätze zur Verbesserung der Benutzerfreundlichkeit von Web3
lang: de
---

Benutzerfreundlichkeits-Heuristiken sind allgemeine „Faustregeln“, mit denen Sie die Benutzerfreundlichkeit Ihrer Website messen können.
Die 7 Heuristiken hier sind speziell auf Web3 zugeschnitten und sollten zusammen mit Jakob Nielsens [10 allgemeinen Prinzipien für Interaktionsdesign](https://www.nngroup.com/articles/ten-usability-heuristics/) verwendet werden.

## Sieben Benutzerfreundlichkeits-Heuristiken für Web3 {#seven-usability-heuristics-for-web3}

1. Feedback folgt der Aktion
2. Sicherheit und Vertrauen
3. Die wichtigsten Informationen sind offensichtlich
4. Verständliche Terminologie
5. Aktionen sind so kurz wie möglich
6. Netzwerkverbindungen sind sichtbar und flexibel
7. Steuerung über die App, nicht über die Wallet

## Definitionen und Beispiele {#definitions-and-examples}

### 1. Feedback folgt der Aktion {#feedback-follows-action}

**Es sollte offensichtlich sein, wenn etwas passiert ist oder gerade passiert.**

Benutzer entscheiden über ihre nächsten Schritte auf der Grundlage des Ergebnisses ihrer vorherigen Schritte. Daher ist es wichtig, dass sie über den Systemstatus informiert bleiben. Dies ist in Web3 besonders wichtig, da Transaktionen manchmal eine kurze Zeit benötigen, um in die Blockchain aufgenommen zu werden. Wenn es kein Feedback gibt, das sie zum Warten auffordert, sind sich die Benutzer unsicher, ob etwas passiert ist.

**Tipps:**

- Informieren Sie den Benutzer über Nachrichten, Benachrichtigungen und andere Warnungen.
- Kommunizieren Sie Wartezeiten klar und deutlich.
- Wenn eine Aktion länger als ein paar Sekunden dauert, beruhigen Sie den Benutzer mit einem Timer oder einer Animation, damit er das Gefühl hat, dass etwas passiert.
- Wenn ein Prozess aus mehreren Schritten besteht, zeigen Sie jeden Schritt an.

**Beispiel:**
Wenn Sie jeden Schritt einer Transaktion anzeigen, wissen die Benutzer, wo sie sich im Prozess befinden. Geeignete Symbole informieren den Benutzer über den Status seiner Aktionen.

![Information für den Benutzer über jeden Schritt beim Tausch von Tokens](./Image1.png)

### 2. Sicherheit und Vertrauen sind fest verankert {#security-and-trust-are-backed-in}

Sicherheit sollte Priorität haben, und dies sollte für den Benutzer hervorgehoben werden.
Die Menschen legen großen Wert auf ihre Daten. Sicherheit ist für Benutzer oft ein Hauptanliegen und sollte daher auf allen Ebenen des Designs berücksichtigt werden. Sie sollten immer versuchen, das Vertrauen Ihrer Benutzer zu gewinnen, aber die Art und Weise, wie Sie dies tun, kann in verschiedenen Apps unterschiedliche Dinge bedeuten. Es sollte kein nachträglicher Gedanke sein, sondern durchgehend bewusst gestaltet werden. Bauen Sie Vertrauen in der gesamten Benutzererfahrung auf, einschließlich der sozialen Kanäle und der Dokumentation sowie der endgültigen Benutzeroberfläche. Faktoren wie der Grad der Dezentralisierung, der Multi-Sig-Status des Treasury und ob das Team gedoxxt ist, beeinflussen das Vertrauen der Benutzer.

**Tipps:**

- Listen Sie Ihre Audits mit Stolz auf
- Holen Sie sich mehrere Audits
- Bewerben Sie alle von Ihnen entworfenen Sicherheitsfunktionen
- Heben Sie mögliche Risiken hervor, einschließlich der zugrunde liegenden Integrationen
- Kommunizieren Sie die Komplexität von Strategien
- Berücksichtigen Sie Probleme, die nicht die Benutzeroberfläche betreffen und die Sicherheitswahrnehmung Ihrer Benutzer beeinträchtigen könnten

**Beispiel:**
Fügen Sie Ihre Audits in der Fußzeile in einer gut sichtbaren Größe ein.

![Audits, auf die in der Fußzeile der Website verwiesen wird](./Image2.png)

### 3. Die wichtigsten Informationen sind offensichtlich {#the-most-important-info-is-obvious}

Zeigen Sie bei komplexen Systemen nur die relevantesten Daten an. Bestimmen Sie, was am wichtigsten ist, und priorisieren Sie dessen Anzeige.
Zu viele Informationen sind überwältigend, und Benutzer orientieren sich bei Entscheidungen in der Regel an einer einzigen Information. In DeFi sind dies wahrscheinlich der APR bei Rendite-Apps und der LTV bei Kredit-Apps.

**Tipps:**

- Benutzerforschung wird die wichtigste Metrik aufdecken
- Machen Sie die wichtigsten Informationen groß und die anderen Details klein und unauffällig
- Menschen lesen nicht, sie scannen; stellen Sie sicher, dass Ihr Design scanbar ist

**Beispiel:** Große, vollfarbige Tokens sind beim Scannen leicht zu finden. Der APR ist groß und in einer Akzentfarbe hervorgehoben.

![Der Token und der APR sind leicht zu finden](./Image3.png)

### 4. Klare Terminologie {#clear-terminology}

Die Terminologie sollte verständlich und angemessen sein.
Technischer Jargon kann eine große Hürde sein, da er die Konstruktion eines völlig neuen mentalen Modells erfordert. Benutzer können das Design nicht mit Wörtern, Phrasen und Konzepten in Beziehung setzen, die sie bereits kennen. Alles wirkt verwirrend und ungewohnt, und es gibt eine steile Lernkurve, bevor sie überhaupt versuchen können, es zu benutzen. Ein Benutzer könnte sich DeFi nähern, um etwas Geld zu sparen, und was er findet, ist: Mining, Farming, Staking, Emissionen, Bribes, Vaults, Lockers, veTokens, Vesting, Epochen, dezentrale Algorithmen, protokolleigene Liquidität…
Versuchen Sie, einfache Begriffe zu verwenden, die von der breitmöglichsten Gruppe von Menschen verstanden werden. Erfinden Sie keine brandneuen Begriffe nur für Ihr Projekt.

**Tipps:**

- Verwenden Sie eine einfache und konsistente Terminologie
- Verwenden Sie so weit wie möglich die bestehende Sprache
- Erfinden Sie keine eigenen Begriffe
- Folgen Sie den Konventionen, sobald sie erscheinen
- Klären Sie die Benutzer so gut wie möglich auf

**Beispiel:**
„Ihre Belohnungen“ ist ein weithin verstandener, neutraler Begriff; kein neues Wort, das für dieses Projekt erfunden wurde. Die Belohnungen werden in USD angegeben, um den mentalen Modellen der realen Welt zu entsprechen, auch wenn die Belohnungen selbst in einem anderen Token sind.

![Token-Belohnungen, angezeigt in U.S. Dollar](./Image4.png)

### 5. Aktionen sind so kurz wie möglich {#actions-are-as-short-as-possible}

Beschleunigen Sie die Interaktionen des Benutzers durch die Gruppierung von Teilaktionen.
Dies kann sowohl auf der Smart-Contract-Ebene als auch auf der Benutzeroberfläche erfolgen. Der Benutzer sollte nicht von einem Teil des Systems zu einem anderen wechseln – oder das System ganz verlassen – müssen, um eine übliche Aktion abzuschließen.

**Tipps:**

- Kombinieren Sie „Approve“ nach Möglichkeit mit anderen Aktionen
- Bündeln Sie die Signierschritte so nah wie möglich

**Beispiel:** Die Kombination von „Liquidität hinzufügen“ und „Staken“ ist ein einfaches Beispiel für einen Beschleuniger, der einem Benutzer sowohl Zeit als auch Gas spart.

![Modal, das einen Schalter zur Kombination der Einzahlungs- und Staking-Aktionen anzeigt](./Image5.png)

### 6. Netzwerkverbindungen sind sichtbar und flexibel {#network-connections-are-visible-and-flexible}

Informieren Sie den Benutzer darüber, mit welchem Netzwerk er verbunden ist, und stellen Sie klare Verknüpfungen zum Wechseln des Netzwerks bereit.
Dies ist bei Multichain-Apps besonders wichtig. Die Hauptfunktionen der App sollten auch dann sichtbar sein, wenn die Verbindung getrennt ist oder eine Verbindung zu einem nicht unterstützten Netzwerk besteht.

**Tipps:**

- Zeigen Sie so viel wie möglich von der App an, während die Verbindung getrennt ist
- Zeigen Sie an, mit welchem Netzwerk der Benutzer aktuell verbunden ist
- Zwingen Sie den Benutzer nicht, zur Wallet zu gehen, um das Netzwerk zu wechseln
- Wenn die App vom Benutzer einen Netzwerkwechsel verlangt, fordern Sie die Aktion vom Haupt-Call-to-Action aus an
- Wenn die App Märkte oder Vaults für mehrere Netzwerke enthält, geben Sie deutlich an, welches Set sich der Benutzer gerade ansieht

**Beispiel:** Zeigen Sie dem Benutzer in der App-Leiste an, mit welchem Netzwerk er verbunden ist, und ermöglichen Sie ihm, es zu ändern.

![Dropdown-Schaltfläche, die das verbundene Netzwerk anzeigt](./Image6.png)

### 7. Steuerung über die App, nicht über die Wallet {#control-from-the-app-not-the-wallet}

Die Benutzeroberfläche sollte dem Benutzer alles mitteilen, was er wissen muss, und ihm die Kontrolle über alles geben, was er tun muss.
In Web3 gibt es Aktionen, die Sie in der Benutzeroberfläche durchführen, und Aktionen, die Sie in der Wallet durchführen. Im Allgemeinen leiten Sie eine Aktion in der Benutzeroberfläche ein und bestätigen sie dann in der Wallet. Benutzer können sich unwohl fühlen, wenn diese beiden Stränge nicht sorgfältig integriert sind.

**Tipps:**

- Kommunizieren Sie den Systemstatus über Feedback in der Benutzeroberfläche
- Führen Sie eine Aufzeichnung ihres Verlaufs
- Stellen Sie Links zu Block-Explorern für alte Transaktionen bereit
- Stellen Sie Verknüpfungen zum Wechseln von Netzwerken bereit.

**Beispiel:** Ein dezenter Container zeigt dem Benutzer, welche relevanten Tokens er in seiner Wallet hat, und der Haupt-CTA bietet eine Verknüpfung zum Wechseln des Netzwerks.

![Der Haupt-CTA fordert den Benutzer zum Netzwerkwechsel auf](./Image7.png)
