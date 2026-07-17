---
title: "Das nächste Ethereum-Upgrade: Blobspace 101"
description: "Domothy erklärt Blobspace, die neue Datenverfügbarkeitsschicht, die durch das Dencun-Upgrade von Ethereum eingeführt wurde. Er behandelt, wie Blob-Transaktionen funktionieren, warum sie für die Skalierung von Ethereum wichtig sind und was als Nächstes für die Datenverfügbarkeit ansteht."
lang: de
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Blobspace 101"
---

Dieses Interview behandelt die Blob-Space-Ressource von Ethereum, die mit [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/) eingeführt wurde. Der Ethereum-Forscher Domothy spricht mit David Hoffman und Ryan Sean Adams im Bankless-Podcast, um die Geschichte der Rollup-zentrierten Roadmap, die technischen Mechanismen von Blobs und die wirtschaftlichen Auswirkungen der Trennung von Block-Space und Blob-Space zu erklären.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=dFjyUY3e53Q), das von Bankless veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung in den Blob-Space (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Willkommen bei Bankless, wo wir die Frontier des Internetgeldes und der Internetfinanzen erkunden. Hier erfahrt ihr, wie ihr anfangt, wie ihr besser werdet und wie ihr Chancen frühzeitig nutzt. Ich bin hier mit David Hoffman, und wir sind hier, um euch zu helfen, mehr 'bankless' zu werden. Ihr wisst, wie wir sagen, dass Blockchains Blöcke verkaufen? Nun, bald wird Ethereum mehr als nur Blöcke verkaufen – es wird auch Blobs verkaufen.

**David Hoffman:** Richtig, Blobs. Wir sind also nur noch wenige Monate vom größten Ethereum-Release seit dem Merge entfernt, und ich glaube, niemand hat die Auswirkungen davon vollständig erfasst, aber es wird riesig sein. Ethereum bekommt ein neues Produkt zum Verkauf. Es heißt Blob-Space, und das zusätzlich zum Block-Space. Die Kosten für Transaktionen auf Layer 2s werden bald gegen null sinken. Die Ökonomie von ETH-Gas und dem Verbrennen wird sich für immer verändern. Wir nennen dieses Upgrade das Blob-Space-Upgrade, EIP-4844, Proto-Danksharding. Wir wollen alles abdecken, was ihr über den Blob-Space wissen müsst.

**Ryan Sean Adams:** Ein paar Erkenntnisse vorab. Erstens gehen wir durch, was der Blob-Space ist. Zweitens gehen wir die Geschichte durch, wie wir eigentlich hierher gekommen sind – diese Rollup-zentrierte Roadmap. Drittens gehen wir die Ökonomie durch. Was bedeutet das für die Ökonomie von Ethereum, für die Wertsteigerung von ETH, für ETH als Anlageklasse? David, warum war diese Episode für dich so bedeutsam?

**David Hoffman:** Ich denke, wenn es einen Gesprächsbereich gibt, den du und ich wirklich einfach lieben, dann ist es die Schnittstelle von Kryptographie und Ökonomie – also Zahlen und wirtschaftliche Manifestationen. Ich liebe es, mit diesen Protokollen zu spielen.

**Ryan Sean Adams:** Ja, das ist unsere Sprache der Liebe.

**David Hoffman:** Wir haben über EIP-4844 gesprochen, wir haben über Proto-Danksharding gesprochen. Das sind dieselben Dinge. Wir haben es schon ein paar Mal in verschiedenen Zusammenhängen definiert. Aber wir sind noch nie kopfüber in den Kaninchenbau gesprungen und auf der anderen Seite wieder herausgekommen, um die wirtschaftliche Seite zu beantworten. Wir haben also die Datenverfügbarkeit auf technischer Ebene skaliert – das ist eine Protokollverbesserung. Aber wie verbindet sich das mit der Marktseite von Ethereum? Der eine Marktplatz wird nun in zwei geteilt: Block-Space und Blob-Space sind jetzt zwei verschiedene, unabhängige Märkte, die in einem Ethereum-Block enthalten sind.

Was bedeutet das für Ether? Was bedeutet das für die Marktplätze, die rund um diese Dinge entstehen? Wie beeinflussen sich das Gleichgewicht von Angebot und Nachfrage der beiden gegenseitig? Was bedeutet das für die Skalierbarkeit von Layer 2s? Was bedeutet das für wirtschaftliche Anwendungsfälle auf Layer 2s? Wir werden mit den Grundlagen beginnen, aber dann werden wir am anderen Ende des Kaninchenbaus in die wirtschaftliche Seite dieses Gesprächs eintauchen.

Lasst uns unseren Gast Dom, auch bekannt als Domothy, dazu holen. Er ist Forscher bei der Ethereum Foundation und arbeitet an der Forschung und Entwicklung wichtiger kommender Ethereum-Upgrades, einschließlich EIP-4844 (unser heutiges Thema), vollständigem Danksharding und MEV-Burn.

#### Die Geschichte der Rollup-zentrierten Roadmap (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Also Dom, um vollständig zu verstehen, wie wir zum Blob-Space gekommen sind, denke ich, dass es sich lohnt, in die Vergangenheit zu reisen, um die gesamte Ethereum-Roadmap zu verstehen, denn sie führte zu einer sehr logischen Schlussfolgerung von Blobs und Blob-Space. Kannst du uns mit zurücknehmen? Denn zu einem bestimmten Zeitpunkt gab es die Rollup-zentrierte Roadmap von Ethereum noch nicht. Wir hatten dieses Ding namens Ausführungs-Sharding, das wir eigentlich nie bekommen haben. Wo in der Geschichte der Ethereum-Roadmap ist der richtige Punkt, um den vollen Kontext des Blob-Space wirklich zu verstehen?

**Domothy:** Klar. Schon bevor Ethereum an den Start ging, gab es bereits Überlegungen, wie man es skalieren könnte, denn jedem war schon damals klar, dass eine einzige Blockchain, bei der jeder Knoten alles ausführt, nicht ausreichen würde. Anfangs gab es also eine Reihe verschiedener Ideen für Sharding. Der erste Versuch, es tatsächlich zu spezifizieren, war Sharding mit Ausführung, bei dem man im Grunde, sagen wir, 64 verschiedene unabhängige Chains hat und diese versuchen, miteinander zu kommunizieren. Es stellt sich heraus, dass das schwer umzusetzen ist – es ist mit viel Komplexität verbunden.

Es wurde in verschiedene Phasen aufgeteilt. Zuerst werden wir eine Beacon Chain starten und dann herausfinden, wie wir sie tatsächlich mit der aktuellen Ausführungsschicht zusammenführen können. Dann machen wir Phase Eins, was nur Daten-Sharding ist – also keine Ausführung, nur kleinere Blockchains, die Daten enthalten. Und dann finden wir heraus, wie man Ausführungs-Sharding macht. Es war viel Ausprobieren im laufenden Betrieb, aber auf sichere Weise, damit wir nichts tun, was wir später bereuen und die gesamte Blockchain zerstören, weil so viel wirtschaftliche Aktivität darauf stattfindet.

**David Hoffman:** Um Details zum Ausführungs-Sharding zu geben – es ist das zufällige Mischen von Validatoren über verschiedene Shards der Blockchain hinweg, wobei jeder Shard im Grunde seine eigene Mini-Blockchain ist, die parallel zur Beacon Chain läuft. Es klingt ein bisschen wie das, was wir heute mit Rollups haben, aber der Unterschied hier ist, dass die Shards von Ethereum tatsächlich ein Teil des Layer-1-Protokolls sind. Das Layer-1-Protokoll bestimmt, was die Shards sind, während Rollups voneinander getrennt sind. Ursprünglich sollten es 64 dieser Shards sein, die vom Ethereum-Layer-1-Protokoll betrieben, verwaltet und produziert werden. Drücke ich das richtig aus?

**Domothy:** Genau. Die Ausführungsskalierung auf diese Weise zu erreichen, ist mit Rollups und Daten-Sharding indirekter, aber aus Forschungssicht ist es wie ein Cheat-Code, weil Ethereum Layer 1 viel weniger Dinge zu tun und zu bedenken hat. Der Rest wird auf Rollups ausgelagert, was meiner Meinung nach besser ist als der ursprüngliche Plan. Im ursprünglichen Plan der vom Zustand getragenen Shards ist alles gleich – dieselbe Blockchain, dieselbe EVM, dieselben Kompromisse. Stattdessen können nun Rollups gegeneinander antreten, um die beste Umgebung und die besten Kompromisse zu erzielen. Wenn man Supergeschwindigkeit gegenüber Supersicherheit bevorzugt, kann man auf ein anderes Rollup wechseln. Man hat Auswahl, Innovation und Wettbewerb auf Layer 2.

**Ryan Sean Adams:** Lassen Sie uns auf die modulare Welt eingehen, in der sich Ethereum befindet. Es gibt die Konsensschicht, die Datenverfügbarkeitsschicht und die Ausführungsschicht. Die Konsensschicht definiert, was wahr ist – die Reihenfolge der Blöcke. Die Datenverfügbarkeitsschicht ist das, was passiert ist – die Datenschicht. Die äußere Schicht ist die Ausführung, wo die Aktivität gerade stattfindet. Ursprünglich kombinierte Ethereum alle drei davon auf der Main Chain.

Was wir jetzt mit der Rollup-zentrierten Roadmap machen, ist, dass wir die Ausführung von der Main Chain in diese Rollups auslagern. Aber damit Rollups vollständig mit ähnlichen Garantien wie das Ethereum Mainnet gesichert sind, müssen sie ihre Daten zurück an das Ethereum Mainnet senden. Wenn sie das tun, kostet das derzeit Block-Space, und es kostet eine Menge Geld. Der Grund für Proto-Danksharding (EIP-4844) ist, dass sich die Ökonomie auf eine sehr Rollup-freundliche Weise ändert. Dom, hast du dem etwas hinzuzufügen?

**Domothy:** Ich würde nur hinzufügen, dass die Datenverfügbarkeit im Moment eher implizit ist und auf eine vertrauenslose Verifizierung hinausläuft. Wir wollen, dass jeder die Chain selbst verifizieren kann und keine "Vertrau mir, Bruder"-Drittpartei in der Mitte haben muss. Das ist der Flaschenhals. Man muss in der Lage sein, alles zu verifizieren, was implizit bedeutet, dass einem die Daten zur Verfügung stehen müssen, um die Zustandsübergänge zu überprüfen.

Ende 2020 erkannten die Leute, dass Rollups anfingen, unglaublich gut und beliebt zu werden, und sie lösten unser Problem der Ausführungsskalierung ohne die Notwendigkeit von Ausführungs-Sharding. Indem man auf ein Ökosystem von Rollups setzt, anstatt zu versuchen, ein Layer-1-Maximalist zu sein, können Rollups ihre eigenen Kompromisse eingehen, ihre eigenen Blockchains starten und mit neuartigen Dingen experimentieren. Ethereum übernimmt die Verifizierung – das ist der Kern dessen, was eine Blockchain ausmacht.

#### Was ist der Blob-Space? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Bring uns nun zum aktuellen Stand, Dom. Wir haben viele Rollups, die den Ethereum-Layer-1-Block-Space nutzen und hohe Gasgebühren zahlen, um ihre Zustandsdaten zu posten, damit jeder sie verifizieren kann. Also, Dom, was ist ein Blob?

**Domothy:** Ein Blob ist einfach ein Stück Daten – im Grunde genommen ein großes, rohes Array von Zahlen. Ein Blob auf Ethereum hat derzeit eine feste Größe von etwa 128 Kilobyte. Es sind einfach Rohdaten, die an eine Transaktion angehängt sind, bekannt als eine Blob-tragende Transaktion, die man an Layer 1 übermittelt.

Die entscheidende Designeinschränkung hierbei ist, dass die Ethereum Layer 1 EVM (Ethereum Virtual Machine) – die Ausführungs-Engine – keinen Zugriff auf die Daten innerhalb des Blobs hat. In Standardblöcken beinhalten Daten wie Aufrufdaten, dass das System prüft, welche Funktionen aufgerufen werden, welches Geld bewegt wird, und die Zustandsänderungen verifiziert. Die EVM greift auf all das zu. Aber wenn die Layer-2-Skalierung beinhaltet, die Daten von Rollups genau deshalb zu posten, damit ein *offchain* Verifizierer die Berechnung durchführen kann, dann muss Ethereum *Layer 1* sie funktional nicht wirklich ansehen und ausführen.

Es ist im Grunde ein versiegeltes Paket. Layer 1 nimmt es an, garantiert, dass jeder Zugriff hat, um hineinzuschauen, wenn er es physisch herunterladen möchte, aber die eigentliche Ethereum-Ausführungsschicht selbst liest und berechnet die Daten nicht aktiv. Da sie die Daten in der EVM nicht liest und berechnet, erfordert sie radikal weniger Verarbeitungsressourcen von den Knoten. Deshalb ist es so viel billiger.

**David Hoffman:** Zusammenfassend lässt sich also sagen: Block-Space kümmert sich um Berechnung, Zustandsausführung und Speicherung von Logik. Blob-Space kümmert sich ausschließlich um Datenverfügbarkeit. Layer 1 ist es egal, wer was in diesen Blobs postet; es kümmert sich nur darum, diese Blobs zu empfangen und sie für das vorgesehene Verfügbarkeitsfenster zu halten, damit interessierte Parteien (wie Rollup-Sequencer und Benutzer) sie abrufen, verifizieren können, dass die Daten nicht böswillig zurückgehalten wurden, und weitermachen können.

**Domothy:** Genau. Und eine weitere wichtige Eigenschaft von Blobs ist, dass sie nach einer bestimmten Zeit automatisch bereinigt werden – derzeit nach etwa 18 Tagen. Der Grund für diese Bereinigung ist, dass Einzelpersonen zur Gewährleistung einer vertrauenslosen Verifizierung diese Daten nur benötigen, um die Endgültigkeit und den Konsens über den Rollup-Zustand innerhalb eines bestimmten Anfechtungsfensters zu beweisen. Man braucht keine tausend Knoten, die Blobs von vor zwei Jahren speichern, um seine Transaktion heute zu verifizieren. Wenn das Fenster abläuft, bekommt man sie nicht mehr von einem Ethereum-Knoten; man bekommt sie von Historien-Anbietern, Indexern oder den nativen Block-Explorern des Rollups. Speicherplatz auf Ethereum ist für immer wahnsinnig teuer. Der Verzicht auf die Speicheranforderung ermöglicht es uns, den Blob-Transaktionsdurchsatz zu skalieren, ohne die Festplatten der Knotenbetreiber zu zerstören.

#### Ökonomie und vollständiges Danksharding (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Wir wissen, dass 4844 der erste Schritt ist – das, was wir Proto-Danksharding nennen. Es etabliert das Blob-Format und den isolierten Gebührenmarkt, aber die tatsächliche Zielanzahl von Blobs pro Block ist anfangs begrenzt, um recht sicher zu sein. Wie sieht das bei der Skalierung in Richtung vollständigem Danksharding aus?

**Domothy:** Im Moment zielen wir unter EIP-4844 im Wesentlichen auf 3 Blobs pro Block ab, mit einem harten Maximum von 6. Das begrenzt den absoluten maximalen Daten-Transaktionsdurchsatz auf Layer 1 unmittelbar nach dem Upgrade, um jegliche Netzwerkbelastung zu vermeiden, während wir beobachten, wie die Funktion im kontinuierlichen Produktionsbetrieb funktioniert.

Vollständiges Danksharding skaliert dies dramatisch. Es bewegt sich in Richtung Datenverfügbarkeits-Sampling (DAS). Mit DAS müssen vollständige Knoten nicht mehr jeden einzelnen Blob individuell herunterladen, um zu verifizieren, dass die Daten verfügbar gemacht wurden. Sie können winzige Teile der Blob-Daten statistisch abtasten. Wenn sich die statistische Stichprobe als verfügbar erweist, nähert sich die mathematische Wahrscheinlichkeit, dass ein Angreifer Daten versteckt, effektiv null (wie eine Chance von eins zu einer Milliarde). Sobald man keinen vollständigen Download des gesamten Blobs mehr benötigt, kann man die Blob-Kapazität in den zweistelligen Bereich oder höher pro Block skalieren.

**David Hoffman:** Dies schafft einen geteilten Gebührenmarkt innerhalb eines Ethereum-Blocks. Im Moment muss ein Layer-2-Rollup mit Uniswap- und OpenSea-Händlern um dieselben Block-Space-Ressourcen in einem Ethereum-Block konkurrieren. Aber das sind grundlegend unterschiedliche Nutzungsmuster. Wenn eine NFT-Prägung auf Ethereum L1 verrücktspielt, steigen die Gaspreise sprunghaft an, und Layer-2-Rollups, die versuchen, ihren Datenzustand zu posten, sehen sich plötzlich mit explodierenden Geschäftskosten konfrontiert, nur um ihre notwendigen Sicherheitspflichten zu erfüllen.

Mit einem zweidimensionalen Gebührenmarkt – im Grunde einer separaten, isolierten Straße, auf der Blobs fahren können – lässt diese NFT-Prägung auf Ethereum L1 das Ausführungsgas auf die gleiche Weise ansteigen, aber sie verbraucht keinen Blob-Space. Die Blobs bleiben völlig staufrei und kosten effektiv nur Cents. Eine millionenschwere NFT-Prägung auf der Main Chain hat null Auswirkungen auf die wirtschaftlichen Kosten für die Endgültigkeit von Transaktionen auf Arbitrum oder Optimism.

**Domothy:** Ja, sie sind völlig voneinander getrennt. Und das Umgekehrte gilt auch. Wenn der Transaktionsdurchsatz von Layer 2 immens ansteigt und Tausende von Rollups operieren und den Blob-Space verstopfen, wird der daraus resultierende Anstieg der Blob-Grundgebühren die Kosten für eine einfache Transaktion im Ethereum Mainnet nicht beeinflussen. Die Blob-Grundgebühr funktioniert genau wie die EIP-1559-Grundgebühr, aber in ihrer eigenen Dimension. Und zu deiner früheren Frage über das Verbrennen – ja, die Blob-Gebühr generiert verbrannte ETH, um für die Aufnahme der Blob-Space-Daten zu bezahlen, völlig getrennt vom Verbrennen der Block-Space-Grundgebühr.

#### Die Zukunft der Ethereum-Skalierbarkeit (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Ich möchte darauf eingehen, was speziell bei der Veröffentlichung von 4844 passiert. Anfänglich gibt es offensichtlich eine sehr hohe Erwartung, dass, wenn die Blob-Kapazität plötzlich freigeschaltet wird, es in genau dieser Mikrosekunde nicht genug Rollup-Nachfrage geben wird, um sie vollständig zu füllen. Der Blob-Space wird beim Start fast schon komisch billig sein. Aber gibt es nicht das Gesetz der induzierten Nachfrage? Wenn man unglaublich billige Ressourcen hat, explodieren die Anwendungen, die diese Ressourcen verbrauchen, im Volumen.

**Domothy:** Der anfängliche Übergang wird die Layer-2-Gebühren im Wesentlichen auf fast null senken, da alle bestehenden Rollups, die derzeit um teuren Block-Space konkurrieren, nahtlos in einen fast leeren, massiven Pool von Blob-Space übergehen werden. Das ist eine massive und sofortige Margenausweitung für Layer-2-Netzwerke, die direkt an die Benutzer weitergegeben wird, sobald sie ihre neue Beweislogik mit 4844 integrieren.

Aber du hast recht – billiger Block-Space treibt ein hochdynamisches Anwendungsdesign voran. Wenn man plötzlich ein Onchain-Spiel entwickeln kann, das Millionen und Abermillionen von Mikro-Zustandsübergängen für den Bruchteil eines Cents generiert, weil der Overhead für die Datenpersistenz wegfällt, werden völlig neue Klassifizierungen von Anwendungen wirtschaftlich rentabel, die unter Standardbedingungen nicht möglich waren.

Dies schafft eine interessante wirtschaftliche Dynamik in Bezug darauf, wie ETH an Wert gewinnt. Wenn Layer-2-Transaktionen um das 10- oder 100-fache explodieren, weil neuartige Anwendungen auf nahezu kostenloser Datenverfügbarkeit laufen, wird das aggregierte Volumen schließlich anfangen, um Blob-Space zu konkurrieren. Dann steigt die EIP-1559-Blob-Grundgebühr natürlich an, bis der Markt ein Gleichgewicht erreicht, was eine sich verstärkende, kontinuierliche Schleife des Verbrennens von ETH erzeugt, während der Nutzen von Layer 2 erweitert wird.

**David Hoffman:** Es repräsentiert den Erfolg und die Reifung der Rollup-zentrierten Roadmap. Ethereum als monolithische Ausführungsumgebung stieß an eine Grenze, an der die lineare Skalierung des Transaktionsdurchsatzes sein Dezentralisierungsmandat zerstörte. Rollups boten eine Möglichkeit, den Ausführungsengpass zu umgehen, waren aber immer noch an den Layer-1-Datenengpass gebunden. Der Blob-Space löst den Datenengpass auf die gleiche Weise, wie Rollups den Ausführungsengpass gelöst haben. Wenn dieses Upgrade ausgeliefert wird, geht Ethereum vollständig von der Verarbeitung einzelner Transaktionen zur Verarbeitung verifizierter Ausführungsnetzwerke über.

**Ryan Sean Adams:** Um den Zeitplan zusammenzufassen: EIP-4844 kommt optimistischerweise bis Ende des Jahres oder Anfang nächsten Jahres, und vollständiges Danksharding folgt im darauffolgenden Entwicklungszyklus. Es ist wirklich das Infrastrukturgerüst, das erforderlich ist, damit Ethereum den Planeten an Bord holen kann, und wir sind so nah dran, dass es in der realen Welt funktioniert. Dom, danke, dass du uns durch diese massive Freischaltung für das Netzwerk geführt hast.

**Domothy:** Danke, dass ich hier sein durfte.