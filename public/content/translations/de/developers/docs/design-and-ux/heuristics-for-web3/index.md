---
title: "7 Heuristiken für das Design von Web3-Benutzeroberflächen"
description: Prinzipien zur Verbesserung der Benutzerfreundlichkeit von Web3
lang: de
---

Usability-Heuristiken sind allgemeine „Faustregeln“, mit denen Sie die Benutzerfreundlichkeit Ihrer Website messen können.
Die 7 hier vorgestellten Heuristiken sind speziell auf Web3 zugeschnitten und sollten zusammen mit Jakob Nielsens [10 allgemeinen Prinzipien für Interaktionsdesign](https://www.nngroup.com/articles/ten-usability-heuristics/) verwendet werden.

## Sieben Usability-Heuristiken für Web3 {#seven-usability-heuristics-for-web3}

1. Feedback folgt auf Aktion
2. Sicherheit und Vertrauen
3. Die wichtigsten Informationen sind offensichtlich
4. Verständliche Terminologie
5. Aktionen sind so kurz wie möglich
6. Netzwerkverbindungen sind sichtbar und flexibel
7. Steuerung über die App, nicht über das Wallet

## Definitionen und Beispiele {#definitions-and-examples}

### 1. Feedback folgt auf Aktion {#feedback-follows-action}

**Es sollte offensichtlich sein, wenn etwas passiert ist oder gerade passiert.**

Benutzer entscheiden über ihre nächsten Schritte basierend auf dem Ergebnis ihrer vorherigen Schritte. Daher ist es unerlässlich, dass sie über den Systemstatus informiert bleiben. Dies ist im Web3 besonders wichtig, da Transaktionen manchmal eine kurze Zeit benötigen, um in die Blockchain geschrieben zu werden. Wenn es kein Feedback gibt, das sie zum Warten auffordert, sind sich die Benutzer unsicher, ob überhaupt etwas passiert ist.

**Tipps:** 
- Informieren Sie den Benutzer über Nachrichten, Benachrichtigungen und andere Warnungen.
- Kommunizieren Sie Wartezeiten klar.
- Wenn eine Aktion länger als ein paar Sekunden dauert, beruhigen Sie den Benutzer mit einem Timer oder einer Animation, um ihm das Gefühl zu geben, dass etwas passiert.
- Wenn ein Prozess aus mehreren Schritten besteht, zeigen Sie jeden Schritt an.

**Beispiel:**
Das Anzeigen jedes Schritts einer Transaktion hilft den Benutzern zu wissen, wo sie sich im Prozess befinden. Entsprechende Symbole informieren den Benutzer über den Status seiner Aktionen.

![Information des Benutzers über jeden Schritt beim Tauschen von Token](./Image1.png)

### 2. Sicherheit und Vertrauen sind fest integriert {#security-and-trust-are-backed-in}

Sicherheit sollte priorisiert und für den Benutzer hervorgehoben werden. 
Menschen legen großen Wert auf ihre Daten. Sicherheit ist oft ein Hauptanliegen der Benutzer, daher sollte sie auf allen Ebenen des Designs berücksichtigt werden. Sie sollten immer bestrebt sein, das Vertrauen Ihrer Benutzer zu gewinnen, aber die Art und Weise, wie Sie dies tun, kann bei verschiedenen Apps Unterschiedliches bedeuten. Es sollte kein nachträglicher Einfall sein, sondern durchgehend bewusst gestaltet werden. Bauen Sie Vertrauen während der gesamten Benutzererfahrung auf, einschließlich sozialer Kanäle und Dokumentation sowie der endgültigen Benutzeroberfläche. Dinge wie der Grad der Dezentralisierung, der Mehrfachsignatur-Status (Multi-Sig) der Treasury und ob das Team öffentlich bekannt (doxxed) ist, beeinflussen das Vertrauen der Benutzer.

**Tipps:**
- Listen Sie Ihre Audits stolz auf
- Lassen Sie mehrere Audits durchführen
- Bewerben Sie alle von Ihnen entworfenen Sicherheitsfunktionen
- Heben Sie mögliche Risiken hervor, einschließlich zugrunde liegender Integrationen
- Kommunizieren Sie die Komplexität von Strategien
- Berücksichtigen Sie Probleme außerhalb der Benutzeroberfläche, die die Sicherheitswahrnehmung Ihrer Benutzer beeinträchtigen könnten

**Beispiel:** 
Fügen Sie Ihre Audits in einer gut sichtbaren Größe in die Fußzeile ein.

![Audits, auf die in der Fußzeile der Website verwiesen wird](./Image2.png)

### 3. Die wichtigsten Informationen sind offensichtlich {#the-most-important-info-is-obvious}

Zeigen Sie bei komplexen Systemen nur die relevantesten Daten an. Bestimmen Sie, was am wichtigsten ist, und priorisieren Sie dessen Anzeige. 
Zu viele Informationen sind überwältigend und Benutzer orientieren sich bei Entscheidungen typischerweise an einer einzigen Information. Im DeFi-Bereich wird dies wahrscheinlich der effektive Jahreszins (APR) bei Rendite-Apps und der Beleihungsauslauf (LTV) bei Kredit-Apps sein.

**Tipps:**
- Benutzerforschung wird die wichtigste Metrik aufdecken
- Machen Sie die wichtigsten Informationen groß und die anderen Details klein und unauffällig
- Menschen lesen nicht, sie überfliegen; stellen Sie sicher, dass Ihr Design leicht zu überfliegen ist

**Beispiel:** Große Token in voller Farbe sind beim Überfliegen leicht zu finden. Der effektive Jahreszins (APR) ist groß und in einer Akzentfarbe hervorgehoben.

![Der Token und der effektive Jahreszins (APR) sind leicht zu finden](./Image3.png)

### 4. Klare Terminologie {#clear-terminology}

Die Terminologie sollte verständlich und angemessen sein.
Fachjargon kann ein riesiges Hindernis sein, da er den Aufbau eines völlig neuen mentalen Modells erfordert. Benutzer können das Design nicht mit Wörtern, Phrasen und Konzepten in Verbindung bringen, die sie bereits kennen. Alles erscheint verwirrend und ungewohnt, und es gibt eine steile Lernkurve, bevor sie überhaupt versuchen können, es zu nutzen. Ein Benutzer nähert sich DeFi vielleicht mit dem Wunsch, etwas Geld zu sparen, und was er findet, ist: Mining, Farming, Staking, Emissionen, Bribes, Vaults, Lockers, veTokens, Vesting, Epochen, dezentralisierte Algorithmen, protokolleigene Liquidität...
Versuchen Sie, einfache Begriffe zu verwenden, die von der breitesten Personengruppe verstanden werden. Erfinden Sie keine brandneuen Begriffe nur für Ihr Projekt.

**Tipps:**
- Verwenden Sie eine einfache und konsistente Terminologie
- Verwenden Sie so weit wie möglich die bestehende Sprache
- Denken Sie sich keine eigenen Begriffe aus
- Befolgen Sie Konventionen, sobald sie auftauchen
- Klären Sie die Benutzer so gut wie möglich auf

**Beispiel:**
„Ihre Belohnungen“ ist ein allgemein verständlicher, neutraler Begriff; kein neues Wort, das für dieses Projekt erfunden wurde. Die Belohnungen sind in USD angegeben, um den mentalen Modellen der realen Welt zu entsprechen, auch wenn die Belohnungen selbst in einem anderen Token erfolgen.

![Token-Belohnungen, angezeigt in US-Dollar](./Image4.png)

### 5. Aktionen sind so kurz wie möglich {#actions-are-as-short-as-possible}

Beschleunigen Sie die Interaktionen des Benutzers durch die Gruppierung von Teilaktionen. 
Dies kann sowohl auf der Ebene des Smart Contracts als auch auf der Benutzeroberfläche erfolgen. Der Benutzer sollte nicht von einem Teil des Systems zu einem anderen wechseln – oder das System ganz verlassen – müssen, um eine häufige Aktion abzuschließen. 

**Tipps:**
- Kombinieren Sie „Genehmigen“ (Approve) nach Möglichkeit mit anderen Aktionen
- Bündeln Sie Signaturschritte so nah wie möglich beieinander

**Beispiel:** Die Kombination von „Liquidität hinzufügen“ und „Staking“ ist ein einfaches Beispiel für einen Beschleuniger, der dem Benutzer sowohl Zeit als auch Gas spart.

![Modal, das einen Schalter zur Kombination der Einzahlungs- und Staking-Aktionen zeigt](./Image5.png)

### 6. Netzwerkverbindungen sind sichtbar und flexibel {#network-connections-are-visible-and-flexible}

Informieren Sie den Benutzer darüber, mit welchem Netzwerk er verbunden ist, und stellen Sie klare Verknüpfungen zum Wechseln des Netzwerks bereit. 
Dies ist besonders bei Multichain-Apps wichtig. Die Hauptfunktionen der App sollten auch dann sichtbar sein, wenn die Verbindung getrennt ist oder eine Verbindung zu einem nicht unterstützten Netzwerk besteht.

**Tipps:**
- Zeigen Sie so viel wie möglich von der App an, während die Verbindung getrennt ist
- Zeigen Sie an, mit welchem Netzwerk der Benutzer derzeit verbunden ist
- Zwingen Sie den Benutzer nicht, zum Wallet zu gehen, um das Netzwerk zu wechseln
- Wenn die App erfordert, dass der Benutzer das Netzwerk wechselt, fordern Sie die Aktion über den primären Call-to-Action an
- Wenn die App Märkte oder Vaults für mehrere Netzwerke enthält, geben Sie klar an, welches Set der Benutzer gerade betrachtet

**Beispiel:** Zeigen Sie dem Benutzer in der App-Leiste an, mit welchem Netzwerk er verbunden ist, und ermöglichen Sie ihm, es zu ändern.

![Dropdown-Schaltfläche, die das verbundene Netzwerk anzeigt](./Image6.png)

### 7. Steuerung über die App, nicht über das Wallet {#control-from-the-app-not-the-wallet}

Die Benutzeroberfläche sollte dem Benutzer alles mitteilen, was er wissen muss, und ihm die Kontrolle über alles geben, was er tun muss. 
Im Web3 gibt es Aktionen, die Sie in der Benutzeroberfläche ausführen, und Aktionen, die Sie im Wallet ausführen. Im Allgemeinen initiieren Sie eine Aktion in der Benutzeroberfläche und bestätigen sie dann im Wallet. Benutzer können sich unwohl fühlen, wenn diese beiden Stränge nicht sorgfältig integriert sind.

**Tipps:**
- Kommunizieren Sie den Systemstatus über Feedback in der Benutzeroberfläche
- Führen Sie eine Aufzeichnung ihrer Historie
- Stellen Sie Links zu Blocksuchmaschinen für alte Transaktionen bereit
- Stellen Sie Verknüpfungen zum Wechseln von Netzwerken bereit. 

**Beispiel:** Ein dezenter Container zeigt dem Benutzer, welche relevanten Token er in seinem Wallet hat, und der Haupt-CTA bietet eine Verknüpfung zum Wechseln des Netzwerks.

![Der Haupt-CTA fordert den Benutzer auf, das Netzwerk zu wechseln](./Image7.png)