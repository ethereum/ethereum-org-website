---
title: "Die nächste großartige Wallet wird privat sein"
description: "Deine Wallet sieht jede Adresse, die du besitzt, jede Dapp, mit der du dich verbindest, und jede Anfrage, die du stellst. Genau diese Position ermöglicht es ihr, all das zu schützen. Ein praktischer Blick auf die Privatsphäre-Tools, Standardeinstellungen und noch nicht veröffentlichten Ideen, die die nächste Generation von Ethereum-Wallets definieren werden."
author: "Elliott Alexander"
team: ""
tags:
  - "Privatsphäre"
  - "Wallets"
  - "Zero-Knowledge-Proofs"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Nächste großartige Wallet"
lang: de
---

Mach eine Momentaufnahme von zwei Minuten, die du mit deiner Wallet verbringst. Du öffnest die App, wirfst einen Blick auf dein Guthaben, verbindest dich mit einer dezentralen Anwendung (Dapp), die du schon immer mal ausprobieren wolltest, genehmigst die Transaktion, die sie dir vorlegt, und sendest einem Freund die ETH, die du ihm vom Mittagessen schuldest.

Nichts daran fühlt sich beobachtet an. Niemand hat nach deinem Namen gefragt. Du schließt die App und machst mit deinem Tag weiter.

Zählen wir nun, was tatsächlich durchgesickert ist. Beim Start, bevor du überhaupt etwas getan hast, hat eine Reihe von Analysediensten deine IP-Adresse erfahren und dass du diese Wallet nutzt. Der Server, über den deine Wallet die Chain liest, hat jede Adresse gesehen, die du besitzt, abgefragt von einer einzigen IP – dein gesamtes Portfolio, ordentlich gruppiert für jeden, der die Logs aufbewahrt. Die Dapp hat deine aktive Adresse erhalten, was alles ist, was man braucht, um ihre gesamte Historie nachzuschlagen. Und die Zahlung an deinen Freund ist ein dauerhafter öffentlicher Eintrag, der deine Wallet mit seiner verbindet.

Jedes dieser Lecks ging durch dieselbe Software. Die Wallet hat die Analysen geladen, diesen Server ausgewählt, die Adresse übergeben und die Transaktion erstellt. Aber dieselbe Position ist ein zweischneidiges Schwert: Die Schicht, die alles sieht, ist auch die Schicht, die alles schützen kann.

Viele Wallets haben Geschäftsmodelle, die auf der Sammlung dieser Informationen basieren, aber es gibt Wege, dies zu tun, ohne die Nutzer einem Risiko auszusetzen. Einiges von dem, was dafür nötig ist, liegt bereits im Regal, funktioniert und wird ignoriert. Einiges davon hat noch niemand herausgefunden. Beide Hälften stellen die Chance dar, und wer auch immer sie ergreift, baut die nächste großartige Wallet.

## Was deine Wallet onchain preisgibt {#what-your-wallet-gives-away-onchain}

Beginnen wir onchain, mit dem, was öffentlich ist, egal welche Wallet du nutzt. Eine Adresse trägt keinen Namen, und allein diese Tatsache ist sehr beruhigend. Aber jede Zahlung, die du erhalten hast, jeder Vertrag, den du berührt hast, die Höhe deines Guthabens in diesem Moment und die vollständige Liste aller Personen, mit denen du jemals Transaktionen durchgeführt hast, liegen offen da und können von jedem abgefragt werden. Pseudonymität bedeutet nur, dass es unter einem Platzhalter statt unter deinem Namen abgelegt ist.

Die Standardverteidigung besteht darin, deine Aktivitäten auf mehrere Adressen zu verteilen, und die meisten erfahrenen Nutzer tun dies auch. Es hilft jedoch weniger, als es scheinen mag. Finanziere zwei Adressen aus derselben Quelle oder lass sie sich einmal gegenseitig bezahlen, und für jeden, der eine Clusteranalyse durchführt, fallen sie zu einer einzigen Entität zusammen.

Bereits im Jahr 2020 konnte [eine Studie](https://fc20.ifca.ai/preproceedings/31.pdf) über die ersten vier Jahre von Ethereum 17,9 % aller aktiven externen Konten (Externally Owned Accounts) clustern und mehr als 340.000 Entitäten aufdecken, die mehrere Adressen kontrollieren. Das war vor sechs Jahren und einem KI-Boom. Deine sorgfältige Trennung ist nur wenige Schritte davon entfernt, zunichte gemacht zu werden.

Früher oder später wird der Cluster mit einer echten Person verknüpft. Registriere einen ENS-Namen, der deinem Social-Media-Handle ähnelt, nimm einmal eine Abhebung von einer Börse vor, die deinen Pass-Scan hat, oder lass dich von jemandem bezahlen, der markierte Adressen in einer Tabelle führt, und der Cluster ist nicht länger abstrakt.

Datenlecks tun ihr Übriges – eine E-Mail, die zusammen mit einer Wohnadresse durchgesickert ist, abgeglichen mit einem ENS-Namen, der wie die E-Mail aussieht. Für all das braucht es keine Vorladung oder einen Spezialisten mehr. KI hat das Durchsuchen von Millionen von Datensätzen nach einem guten Treffer in eine Aufgabe verwandelt, die über Nacht erledigt wird, und die Kosten dafür sinken stetig.

## Was deine Wallet preisgibt, bevor du eine Transaktion durchführst {#what-your-wallet-gives-away-before-you-transact}

Die Onchain-Spur erforderte zumindest, dass du eine Transaktion durchführst. Die Offchain-Spur beginnt früher. Anfang 2026 hat ein Forscher [dreizehn beliebte Wallets durch einen Packet-Sniffer](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) auf einem sauberen Gerät gejagt und aufgezeichnet, was jede einzelne beim ersten Start tat, bevor überhaupt ein Konto existierte. Die durchschnittliche Wallet kontaktierte etwa vierzehn Domains. Die schlechteste kontaktierte 26 Domains über 41 IP-Adressen, einschließlich Aufrufen der Guthaben-Infrastruktur bei drei verschiedenen Anbietern, für einen Nutzer, der noch gar keine Wallet erstellt hatte. Eine andere Wallet im Test lieferte einen Dienst zum Device-Fingerprinting zusammen mit acht Subdomains für Marketing-Attribution aus.

All das sind gewöhnliche Bestandteile von Verbraucher-Apps – Analysen, Absturzberichte, Marketing-Attribution –, aber das hier ist nicht Candy Crush, es ist eine App, deren Verkaufsargument Selbstsouveränität ist. Derselbe Test fand [eine Wallet](https://cakewallet.com/), die beim ersten Start überhaupt nichts sendete: null Pakete, null DNS-Anfragen. Nichts an einer Wallet erfordert dieses Geplapper.

Dann gibt es noch das Leck, das sich nie schließt. Deine Wallet speichert keine Kopie der Chain; wann immer sie ein Guthaben liest oder eine Transaktion sendet, fragt sie einen Server, der als RPC-Anbieter (Remote Procedure Call) bezeichnet wird. Wenn du nicht deinen eigenen Knoten betreibst, geht jede Anfrage durch einen von diesen, und der Standardanbieter sieht deine vollständige Adressliste, deine IP und den Zeitpunkt von allem, was du tust. Diese IP einem Abonnentennamen zuzuordnen, ist für eine Regierung eine routinemäßige Aktenanforderung.

Als der Standardanbieter von MetaMask [im Jahr 2022 einräumte](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash), dass er IPs zusammen mit Wallet-Adressen protokollierte, zwang ihn der Gegenwind dazu, [die Aufbewahrungsfrist auf sieben Tage zu verkürzen](https://consensys.io/blog/consensys-data-retention-update). Ehre, wem Ehre gebührt, aber diese Abhilfe ist eine Richtlinie, und die zugrunde liegende Architektur ist unverändert: Ein Server empfängt immer noch jede deiner Anfragen. Und ein solches Log muss nicht erst angefordert werden, um Schaden anzurichten; es muss nur existieren. Datenbanken werden gehackt, verkauft und stillschweigend mit anderen zusammengeführt, und ein Log, das für sich genommen nichts bedeutete, kann Jahre nach seiner Erstellung mit dir in Verbindung gebracht werden.

Das Bemerkenswerte an dieser ganzen Schicht ist, dass der Nutzer nie etwas davon sieht. Wenn man Geld sendet, bekommt man zumindest einen Bestätigungsbildschirm angezeigt; die Metadaten haben keinen Bildschirm. Niemand genehmigt, dass seine Adressliste zusammen mit seiner IP reist, und keine Aufforderung zum Signieren deckt Analysen ab.

Diese Standardeinstellungen stammen aus dem üblichen Handbuch für Verbraucher-Apps – solide Infrastruktur, nützliche Absturzberichte, Wachstumsmetriken –, die ohne viel Nachdenken auf eine App angewendet wurden, die das Geld von Menschen verwaltet. Das ist der ermutigende Teil: Jedes in diesem Abschnitt erwähnte Leck lässt sich auf eine Entscheidung zurückführen, die ein Wallet-Ersteller treffen kann.

## Wer zuschaut {#whos-looking}

Beginnen wir mit den Zuschauern, die man am wenigsten haben möchte. Kriminelle haben herausgefunden, dass ein öffentliches Kassenbuch gleichzeitig als Katalog von Personen dient, deren Ersparnisse mit Gewalt entwendet werden können. Wrench-Angriffe (Schraubenschlüssel-Angriffe) – Raubüberfälle, bei denen der Schlüssel durch Gewalt oder die Androhung von Gewalt erpresst wird – [stiegen 2025 um 75 %](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), und die Opfer verloren allein [in den ersten vier Monaten des Jahres 2026 rund 101 Millionen US-Dollar](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). Und das Muster hat sich hin zu dem verschoben, was Ermittler als datengesteuertes Targeting bezeichnen, bei dem Angreifer die Bestände eines Opfers onchain profilieren, bevor sie überhaupt anklopfen. In mehr als der Hälfte der jüngsten Vorfälle nutzten sie einen Ehepartner, ein Kind oder ein Elternteil als Druckmittel. Ein Wallet-Guthaben, das sich bis zu deiner Haustür zurückverfolgen lässt, ist eine ständige Einladung für Kriminelle.

Dann gibt es noch die Zuschauer mit Dienstmarken. Ein transparentes Kassenbuch ist ein Überwachungssystem, das keine Regierung erst aufbauen muss: eine vollständige Aufzeichnung darüber, wer wen wann und wie viel bezahlt hat, öffentlich zugänglich, nur eine vorladungsfreie Abfrage entfernt. Wie sehr dich das beunruhigen sollte, hängt davon ab, wer dich regiert, und für Millionen von Menschen lautet die Antwort: eine Regierung, die eine Spende an die Oppositionspartei, ein VPN-Abonnement oder Ersparnisse in einer Währung, die der Staat nicht drucken kann, bestraft.

Für diese Nutzer ist die finanzielle Offenlegung das Bedrohungsmodell, und die Standardeinstellungen der Wallet entscheiden darüber, wie exponiert sie sind.

Beide Arten von Zuschauern erhalten dasselbe Upgrade. KI macht das Beobachten jedes Jahr billiger, und alles, was jemals auf die Chain geschrieben wurde, bleibt geschrieben und steht für jede neue Analysetechnik zur Verfügung, die als Nächstes kommt. Nichts davon ist eine Anklage gegen das öffentliche Kassenbuch; Transparenz ist das, was es jedem ermöglicht, die Chain zu verifizieren. Die Gefährdung liegt in der Spur, die den Eintrag mit dir verbindet – die Finanzierungsmuster, die wiederverwendeten Adressen, die Server-Logs.

Wallets haben diese Spur bisher bestehen lassen, weil es der Weg des geringsten Widerstands ist, sowohl für die Software als auch für den Nutzer. Es ist aber auch genau das, was eine Wallet auflösen kann.

## Warum die Wallet der Ort ist, an dem die Privatsphäre repariert wird {#why-the-wallet-is-where-privacy-gets-fixed}

Es ist berechtigt zu fragen, warum all das die Aufgabe der Wallet ist. Es gibt [aktive Untersuchungen zur Privatsphäre](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) auf der Basisschicht von Ethereum, und das Protokoll könnte schließlich einen Teil dieser Last tragen. Aber die Chain wird durch Hard Forks aktualisiert, bestenfalls zwei pro Jahr, und die für die Privatsphäre relevanten Änderungen werden sich über mehrere davon verteilen. Das ist ein Zeitrahmen, der in Jahren gemessen wird und durch einen Prozess entschieden wird, der nicht überstürzt werden sollte.

In der Zwischenzeit entscheiden Einzelpersonen genau jetzt, ob es sicher ist, onchain bezahlt zu werden, zu spenden oder Ersparnisse dort aufzubewahren. Sie benötigen Privatsphäre, die schneller eintrifft, als der soziale Konsensprozess und der Fork-Zeitplan von Ethereum bieten können.

Die App-Schicht hat die falsche Form für das Problem. Selbst wenn jede Dapp ihre eigene Privatsphäre-Funktion ausliefern würde, könnte jede nur die Aktivitäten innerhalb ihrer eigenen Mauern schützen, auf ihre eigene Weise, mit ihren eigenen Eigenheiten und Geheimnissen, die der Nutzer verwalten muss. Was dich entblößt, sind die Verbindungen, die über sie alle hinweg verlaufen – die geteilten Adressen, die Finanzierungsspuren, die Links zurück zu dir – und diese Verbindungen leben im Raum zwischen den Apps. Privatsphäre App für App zu lösen bedeutet, sie überall zu lösen, außer dort, wo das Problem tatsächlich liegt. Dapps sind nicht der Ort, an dem die wahre Lösung leben kann.

Bleibt also die Wallet. Sie ist die einzige Software, die jede Dapp sieht, mit der du dich verbindest, jede Adresse, die du kontrollierst, und jede Anfrage, die du stellst. Dieselbe Sichtbarkeit, die eine undichte Wallet so kostspielig macht, ermöglicht es einer sorgfältigen Wallet, die Privatsphäre über alles, was du tust, hinweg zu koordinieren: die Auswahl, welche Adresse welcher App gegenübersteht, das Routing von Lesezugriffen, sodass kein einzelner Server das Gesamtbild erhält, und die Übernahme der Buchhaltung, die Privatsphäre-Protokolle erfordern.

Und diese Protokolle sind weiter fortgeschritten, als die meisten Ersteller annehmen. [Railgun](https://railgun.org/) hat mehr als [5 Milliarden US-Dollar an kumulativem Volumen](https://dune.com/railgun_project/railgun) verarbeitet und hält heute rund [80 Millionen US-Dollar](https://defillama.com/protocol/railgun), Stealth-Adress-Tools wie [Umbra](https://www.techflowpost.com/en-US/article/30477) haben Zehntausende von Einmaladressen generiert, und nach [einer Zählung](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) verfolgen mehr als 35 Teams über ein Dutzend verschiedene Ansätze für private Transfers.

Nichts davon ist bisher Mainstream, und es fehlen tatsächlich noch Teile. Aber die Protokolle funktionieren, echtes Geld fließt durch sie, und was ihnen fehlt, ist ein Platz im Hauptablauf des Nutzers. Genau hier setzt eine vorausschauende Wallet an.

## Was eine die Privatsphäre wahrende Wallet tatsächlich tut {#what-a-privacy-preserving-wallet-actually-does}

Lässt man den Fachjargon weg, ist die meiste Arbeit im Bereich der Privatsphäre reine Buchhaltung. Verwende hier eine frische Adresse, leite die Einzahlung dort hindurch, bewache diese Notiz, warte vor der Abhebung, lass diese beiden Konten sich niemals berühren. Es ist eine Disziplin, in der Menschen schlecht sind und für die Software gebaut ist, und heute lastet sie fast vollständig auf dem Nutzer.

Eine die Privatsphäre wahrende Wallet ist eine, die die Buchhaltung selbst übernimmt, anstatt sie dem Nutzer aufzubürden. Der Nutzer entscheidet, was zu tun ist; die Wallet stellt sicher, dass dies keine Spur zu ihm zurücklässt.

Beginnen wir mit dem, was bereits live ist. Abgeschirmte Pools (Shielded Pools) funktionieren heute: Railgun führt neben deinem öffentlichen Guthaben ein privates, und sobald sich Gelder darin befinden, verrät eine Auszahlung nichts über deine anderen Bestände. Die Kosten sind real – höhere Gebühren als bei einem einfachen Transfer, die Generierung von Proofs dauert Sekunden, eine gewisse Abhängigkeit von Relays –, aber das Protokoll hat selbst mit diesen Kompromissen Milliarden an Volumen bewältigt.

Kombiniere das mit einer Gewohnheit, für die kein Protokoll erforderlich ist: eine frische Adresse für jeden Vertragspartner. Wenn sich der Nutzer mit einer neuen Dapp verbindet, kann die Wallet eine dedizierte Adresse dafür anbieten, die aus dem abgeschirmten Guthaben finanziert wird, sodass die App ein Konto ohne Historie und ohne Geschwister sieht. Stealth-Adressen ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) erweitern denselben Schritt auf den Empfang von Zahlungen. Mixer wie [Tornado Cash](https://tornadocash.eth.limo/) und [Privacy Pools](https://privacypools.com/) erledigen eine einfachere, engere Aufgabe: Gelder gehen von einer Adresse ein und treten an einer anderen aus, wobei die Verbindung zwischen beiden getrennt wird. Das ist das Werkzeug zur Finanzierung einer frischen Adresse, die niemand zu dir zurückverfolgen kann – und das fehlende Puzzleteil ist die Wallet, die eine solche Adresse bei Bedarf erstellt, anstatt das Ritual dem Nutzer zu überlassen. Nichts davon wartet auf einen Hard Fork oder ein Forschungsstipendium. Es wartet auf eine Wallet, die bereit ist, die Buchhaltung im Namen der Nutzer zu übernehmen.

Die Netzwerkseite besteht hauptsächlich aus Entscheidungen. Die Auslieferung ohne Analysen von Drittanbietern ist eine Wahl, und mindestens eine Wallet auf dem Markt hat sie bereits getroffen. Was die RPC-Exposition betrifft, so lassen dich die meisten Wallets bereits den Anbieter wechseln, die Option existiert also, versteckt auf einer Einstellungsseite, die Power-User besuchen und alle anderen nie finden.

Der noch nicht umgesetzte Schritt ist die Trennung: Weise verschiedenen Adressen unterschiedliche Anbieter zu, sodass kein einzelner Server jemals die vollständige Liste sieht, und schalte einen Proxy zwischen Wallet und Anbieter, sodass die IP und die Adressen niemals zusammen reisen. Ein Light-Client wie [Helios](https://github.com/a16z/helios) oder [Colibri](https://github.com/corpus-core/colibri-stateless) ermöglicht es der Wallet, die erhaltenen Antworten zu verifizieren, anstatt sie blind zu vertrauen. Jeder dieser Schritte kostet etwas an Infrastruktur, Latenz oder Entwicklungszeit, aber keiner davon erfordert neue Kryptographie.

Dann gibt es noch die Frontier. Deine Guthaben heute zu lesen bedeutet, deine Adressgruppe demjenigen preiszugeben, der die Abfrage bedient, und die Arbeit, dies zu beheben, findet genau jetzt statt: Trusted Execution Environments gepaart mit Oblivious RAM, Private Information Retrieval und Light-Clients, die auf vollständig private Lesezugriffe abzielen. Nichts davon ist bisher ausgereift genug, um es aus einer Referenzimplementierung zu kopieren, was genau das ist, was es zu einem lohnenden Terrain macht.

Die Schreibseite hat dieselbe Form: Peer-to-Peer-Broadcast und Mixnets würden verhindern, dass eine Transaktion deine IP an einen Server überträgt. Die Wallets, die diese Teile zuerst integrieren, sind diejenigen, an denen sich der Rest des Feldes messen lassen muss.

Hier ist die Messlatte, und beachte, dass es sich eher um eine Messlatte für die Nutzererfahrung als für neuartige Kryptographie handelt. Nimm den Abschnitt, mit dem dieser Artikel begann – starten, verbinden, genehmigen, bezahlen – und behalte ihn erkennbar als diese Sitzung bei. Es wird Kompromisse geben; die Generierung eines Proofs dauert Sekunden, ein abgeschirmter Transfer kostet mehr, und ein oder zwei neue Konzepte benötigen möglicherweise einen Namen in der Benutzeroberfläche.

Wie klein sich diese Unterschiede anfühlen, ist die Kunst der Integration, und sie wird die Wallets, die dies richtig machen, von denen trennen, die es zwar technisch anbieten, aber auf eine Weise, die den Nutzern das Leben schwer macht. Was sich komplett ändern muss: Keine Analysen werden beim Start ausgelöst, jede neue Dapp trifft auf eine Adresse ohne Historie, und die Zahlung an einen Freund verrät nichts über die dahinterstehenden Konten.

Privatsphäre, die vom Nutzer verlangt, eine andere Person zu werden, setzt sich nie durch. Wenn sie innerhalb einer Erfahrung ankommt, die die Nutzer bereits verstehen, ist es einfach eine bessere Wallet.

## Ideen, die es wert sind, gestohlen zu werden {#ideas-worth-stealing}

Jenseits der Grundlagen gibt es eine Schicht von Funktionen, die, soweit ich das beurteilen kann, noch niemand ausgeliefert hat. Nur ein paar Ideen, aber jede davon ist die Art von Sache, die eine Wallet zur offensichtlichen Wahl machen könnte.

Beginnen wir mit dem Timing. Anonymitätssets brauchen Zeit, um zwischen den Schritten zu wachsen, und deine Zeitstempel verraten stillschweigend mehr, als du denkst – wann du wach bist, in welcher Zeitzone du dich befindest, an welchen Tagen du Transaktionen durchführst. Eine Wallet könnte alles, was nicht dringend ist, in eine Warteschlange stellen und zu ungewöhnlichen Zeiten auslösen: Die abschirmende Einzahlung wird über Nacht abgewickelt, die Gelder liegen bis zum Morgen bereit, und es bildet sich niemals ein Rhythmus deines Lebens onchain ab.

Dann der einfache Knopf. Ein Nutzer, der heute auftaucht, ist vollständig exponiert – eine viel genutzte Seed-Phrase, Jahre an Historie dahinter. Lass ihn diese eingeben, und die Wallet entwirft einen Migrationsplan, den er genehmigen kann – so viel in Railgun, so viel in Privacy Pools, passe die Aufteilung nach Belieben an. Später, wann immer Gelder im Offenen benötigt werden, tauchen sie bereit und unerkannt auf: eine frische Adresse, eine ungewöhnliche Uhrzeit, ein Betrag, der nicht widerspiegelt, was hineingegangen ist. Und oft ist gar kein Ausweg nötig. Innerhalb des Ökosystems von Railgun kann ein Nutzer Transfers und Trades durchführen, ohne jemals aufzutauchen, und spart sich zudem die Austrittsgebühren. Ein Nutzer, der am Montag ein offenes Buch war, ist am Freitag unlesbar, und alles, was er getan hat, war, einen Plan zu genehmigen.

Eine Wallet könnte auch auf Privatsphäre prüfen (Linting). Die Clustering-Heuristiken in der ersten Hälfte dieses Artikels sind öffentlich, also richte sie auf die eigene ausstehende Transaktion des Nutzers und warne vor der Signatur: Diese Zahlung wird diese beiden Konten verknüpfen, diese Abhebung entspricht auf den Cent genau deiner Einzahlung. Wallets simulieren bereits Transaktionen, um abgeflossene Gelder abzufangen. Zu simulieren, was ein Zuschauer erfährt, ist derselbe Schritt, der auf ein anderes Risiko abzielt.

Und zeige den Leuten, was der Beobachter bereits sieht. Ein Dashboard, das eine Clusteranalyse über die eigenen Konten des Nutzers durchführt, verwandelt eine abstrakte Bedrohung in etwas, bei dem die Nutzer das Bedürfnis verspüren, zu handeln: Diese fünf Adressen sind für einen Beobachter eine einzige Entität, dieses Konto ist sauber, dieser ENS-Name verbindet die beiden. Es verleiht auch der oben erwähnten Funktion des einfachen Knopfes ihr Vorher-Nachher.

## Handlungsschritte {#action-steps}

### Für Ersteller {#for-builders}

Jeder Abschnitt dieses Artikels endet an derselben Stelle: einer Entscheidung, die die Wallet treffen kann.

Der Weg, diese Entscheidungen zu treffen, sind sinnvolle Standardeinstellungen, die der Nutzer überschreiben kann, und zwar jede einzelne davon. Wähle standardmäßig den privaten Pfad, denn der Standard ist das, womit die meisten Nutzer leben werden. Aber halte es offen für nutzergesteuerte Optionen, denn einem Nutzer, der seine Wallet nicht auf einen anderen RPC-Server oder seinen eigenen Knoten richten kann, wurde nicht wirklich Souveränität übergeben.

Du musst nicht bei null anfangen. Das [Kohaku SDK](https://github.com/ethereum/kohaku) bündelt mehrere der in diesem Artikel genannten Primitive – abgeschirmte Guthaben, Mixer, Light-Clients –, sodass eine Wallet sie übernehmen kann, ohne jedes Protokoll von Grund auf neu zu erstellen. Die Teile liegen im Regal. Einige Dinge sind wichtig, lange bevor jemand danach fragt. Niemand hat gesehen, wie die Massen für eine Ende-zu-Ende-Verschlüsselung petitioniert haben; sie wurde als Standard ausgeliefert, Milliarden von Menschen bekamen sie, ohne es zu bemerken oder sich darum zu kümmern, und jetzt fühlt sich eine Messenger-App ohne sie kaputt und verletzend an.

Geld, das nicht dazu verwendet werden kann, dich zu finden, ein Profil von dir zu erstellen oder dich ins Visier zu nehmen, gehört in dieselbe Kategorie. Die Wallet, die es so behandelt, wird die nächste großartige sein.

### Für Nutzer {#for-users}

Die Wallet, die du nutzt, ist diejenige, die du als Norm förderst. Wähle Wallets, die deine Privatsphäre und Sicherheit ernst nehmen. Das kann bedeuten, die reibungsloseste Benutzeroberfläche für die sicherste und privateste zu opfern. Im Moment bedeutet dies wahrscheinlich, sich bei [Walletbeat](https://www.walletbeat.fyi/) auf dem Laufenden zu halten, zu sehen, welche Wallets einen Wandel hin zur Ermöglichung der Privatsphäre der Nutzer vollziehen, und sich die Zeit zu nehmen, sie auszuprobieren.

## Zur weiteren Erkundung {#for-further-exploration}

- [Wallet-Privatsphäre-Scorecard](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Netzwerkexposition beim ersten Start von 13 Wallets
- [ERC-5564: Stealth-Adressen](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) und [Tornado Cash](https://tornadocash.eth.limo/)
- [Helios](https://github.com/a16z/helios) und [Colibri](https://github.com/corpus-core/colibri-stateless) Light-Clients
- [Kohaku](https://github.com/ethereum/kohaku) - Privatsphäre-SDK für Wallet-Ersteller
- [Walletbeat](https://www.walletbeat.fyi/) - Wie bestehende Wallets abschneiden