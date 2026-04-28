---
title: "EigenLayer: erlaubnisfreie Funktionserweiterung für Ethereum"
description: "Sreeram Kannan präsentiert den Ansatz von EigenLayer zur erlaubnisfreien Funktionserweiterung auf Ethereum."
lang: de
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "Restaking"
  - "eigenlayer"
  - "Sicherheit"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Ein Forschungsvortrag von **Sreeram Kannan** (University of Washington / EigenLayer) auf einer a16z Krypto-Forschungsveranstaltung, der erklärt, wie EigenLayer erlaubnisfreie Innovationen auf Ethereum ermöglichen möchte, indem es Stakern erlaubt, dasselbe gestakte Kapital für zusätzliche Slashing-Bedingungen zu binden, im Austausch für die Bereitstellung neuer Dienste wie Orakel, Brücken, Datenverfügbarkeitsschichten und alternative Ausführungsumgebungen.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=-V-fG4J1N_M), das von a16z crypto veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Heute werde ich über eines der Produkte sprechen, die wir entwickeln, was gleichzeitig eine Idee namens EigenLayer ist. Wir nennen EigenLayer das Restaking-Kollektiv, aber was es eigentlich tut, ist, jedem zu ermöglichen, Ethereum um neue Funktionen zu erweitern.

Wie Tim bereits vorgestellt hat, bin ich außerordentlicher Professor an der University of Washington in Seattle, wo wir in den letzten viereinhalb Jahren an Blockchains, Konsens und anderen Bereichen gearbeitet haben. Im letzten Jahr habe ich das Startup EigenLayer Labs gegründet. Wir haben viel Arbeit in Konsensprotokolle gesteckt – wir hatten ein Paper namens „Everything is a Race“, das die Bedingungen analysiert, unter denen Proof-of-Work-, Proof-of-Stake- und Proof-of-Space-Protokolle vom Typ der längsten Chain sicher sind. Wir haben auf einem Teil dieses Verständnisses aufgebaut – zum Beispiel mit einem Paper namens Prism, das ein Proof-of-Work-Protokoll mit sehr geringer Latenz ist. Wir haben auch eine Arbeit namens PoSAT darüber verfasst, wie man ein dynamisch verfügbares Proof-of-Stake-Protokoll erstellt, bei dem das Protokoll auch bei variabler Beteiligung weiterhin funktioniert.

#### Wann sind Blockchains rechenschaftspflichtig (1:31) {#when-are-blockchains-accountable-131}

Wir haben auch untersucht, wann Blockchains rechenschaftspflichtig sind. Eine Heuristik besagt, dass bei Vorhandensein von Quoren und Signaturen, wenn eine Gruppe von Stakern einen Block doppelt signiert, diese Blockchains rechenschaftspflichtig sind. Aber es gibt Feinheiten – zum Beispiel ist ein Protokoll wie Algorand, das ebenfalls Quoren verwendet, nicht rechenschaftspflichtig, da es auf Timing-Annahmen beruht, bei denen man Sicherheitsverletzungen verursachen kann, indem man einfach nichts sagt.

#### Multi-Ressourcen-Konsens (2:11) {#multi-resource-consensus-211}

Die beiden jüngsten Arbeiten befassen sich mit Multi-Ressourcen-Konsens – angenommen, man möchte ein Protokoll entwickeln, das Proof-of-Stake, Proof-of-Space und Proof-of-Work in einem einzigen Protokoll kombiniert. Man möchte, dass es funktioniert, selbst wenn eine Mehrheit der Proof-of-Work-Miner bösartig ist, solange ein sehr kleiner Teil der Proof-of-Stake-Miner ehrlich ist. Wir haben die Kompromissbereiche über mehrere Ressourcen hinweg charakterisiert.

Wir haben auch am Design von Peer-to-Peer-Topologien gearbeitet – wie stellt man sicher, dass in einem Peer-to-Peer-Netzwerk einer Blockchain das Konsensprotokoll die Reihenfolge der Nachrichten respektiert? Eines der Dinge, die in Blockchains massiv auftreten, ist Front-Running. Um ungerichtetes Front-Running zu verhindern – bei dem man einfach nur vor allen anderen an der Reihe sein möchte, weil man einen Preisvorteil hat – haben wir ein Paper namens Themis, das der Blockchain eine native First-in-First-out-Eigenschaft verleiht.

Aufbauend auf dem Konsens gibt es Skalierungslösungen wie Sharding. Dazu hatten wir ein paar Papers – Coded Merkle Tree und Free2Shard.

Eine Sache, die wir als große Reibung in der Blockchain festgestellt haben, ist, dass die Innovationsrate auf den Kernschichten – bei Konsens, Sharding oder Peer-to-Peer – viel geringer ist als die Innovationsrate auf der Anwendungsschicht. Anwendungen sind erlaubnisfrei bereitstellbar – jeder kann eine Anwendung auf einer bestehenden Blockchain wie Ethereum bereitstellen. Wohingegen Upgrades des Kernprotokolls in einem sehr tiefen Sinne erlaubnispflichtig sind. Das hat unseren Bereich ziemlich ins Stocken gebracht.

#### Entkopplung von Vertrauen und Innovation (8:30) {#decoupling-trust-and-innovation-830}

Um die Geschichte zurück in die Jahre 2008–2009 zu führen: Bitcoin leistete Pionierarbeit für dezentrales Vertrauen durch Proof-of-Work-Mining. Auf dem Mining baut ein Konsensprotokoll auf – die längste Chain oder die schwerste Chain –, das über die gültige Chain entscheidet. Darauf aufbauend legt Bitcoin Script die Ausführungssemantik fest. Wir haben also eine Vertrauensschicht an der Basis, eine Konsensschicht darüber und eine Ausführungsschicht ganz oben.

Aber Bitcoin war auch eine anwendungsspezifische Blockchain – entworfen für eine einzige Anwendung: den Austausch von Bitcoin zwischen Clients. Wenn wir auf das Jahr 2011 zurückblicken, benötigte jede neue Anwendung, die auf einer Blockchain aufgebaut werden sollte, ihr eigenes Vertrauensnetzwerk. Zum Beispiel wollte jemand ein dezentrales Domain-Name-System namens Namecoin aufbauen. Die Skripting-Schicht von Bitcoin bot nicht genug Programmierbarkeit, also musste man eine neue Skripting-Schicht und ein neues Vertrauensnetzwerk erstellen. Es gab keine Möglichkeit, das Vertrauen zwischen Namecoin und Bitcoin zu teilen.

Die Kernidee, die von Ethereum entwickelt wurde, war die Entkopplung von Vertrauen und Innovation. Sie nahmen die Bitcoin-Skripting-Schicht und ersetzten sie durch eine universelle, Turing-vollständige Programmierschicht – die Ethereum Virtual Machine. Dies war im Grunde ein kleines technisches Upgrade, aber was es schuf, war die Modularität des Vertrauens. Jetzt kann jeder kommen und dezentrale Anwendungen (Dapps) auf dem System aufbauen. Die Person, die ENS entwickelt hat, hatte nichts mit dem Vertrauensnetzwerk zu tun. Das Vertrauen des Ethereum-Netzwerks wurde zu einem Modul, das jeder verteilten Anwendung zur Verfügung gestellt werden kann.

#### Offene Innovation (10:23) {#open-innovation-1023}

Dies führte zu einer massiven Beschleunigung der pseudonymen Wirtschaft. Jeder, der diese Anwendungen erstellt – sie selbst genießen kein Vertrauen, sie bringen lediglich Innovation. Man hat eine Idee, man kann ein Niemand sein, man muss nicht vertrauenswürdig sein, man schreibt einfach seinen Code, stellt ihn auf Ethereum bereit, und jeder vertraut darauf, dass Ethereum die Bedingungen weiterhin wie angegeben ausführt.

Eine Möglichkeit, dies zu modellieren: Die Basisschichten – das Vertrauensnetzwerk, der Konsens und die virtuelle Maschine – werden zu einem Vertrauensnetzwerk gebündelt, das Vertrauen produziert. Die Ethereum-Blockchain ist ein Produzent von Vertrauen. Die verteilten Anwendungen sind Konsumenten von Vertrauen. Der Wertaustausch sieht so aus: Dapps erhalten Vertrauen von Ethereum und zahlen im Gegenzug Gebühren zurück. Genau wie Risikokapital die Entkopplung von Kapital und Innovation war, hat Ethereum Vertrauen und Innovation entkoppelt.

Aber es bestehen weiterhin Barrieren für offene Innovation. Wenn ich eine Idee habe, wie man das Ethereum-Konsensprotokoll aktualisieren kann – sagen wir, es ist 2019 und ich habe das Avalanche-Konsensprotokoll erfunden –, gibt es keine Möglichkeit, es auf Ethereum bereitzustellen. Was mache ich also? Ich gehe hin und erschaffe meine eigene, komplett neue Welt. Dies ist die Ära der alternativen Layer-1-Blockchains – jede mit unterschiedlichen Konsensprotokollen, unterschiedlichen virtuellen Maschinen, aber jede muss ihre eigenen Vertrauensnetzwerke aufbauen.

Dieses Bild sieht genau so aus wie das Bild von Bitcoin und Namecoin aus dem Jahr 2011. Innovationen auf der Dapp-Ebene können einfach auf Ethereum aufbauen, aber Innovationen, die tiefer gehen und das Herzstück des Stacks berühren, müssen fragmentierte Vertrauensökosysteme schaffen.

Darüber hinaus liefert Ethereum den Dapps nur Vertrauen für die Block-Erstellung – die Reihenfolge und Ausführung von Transaktionen. Das ist alles. Wenn die Dapps Vertrauen für irgendetwas anderes wollten – das Lesen von Daten aus dem Internet, das Lesen von Daten aus einer anderen Blockchain, das Ausführen einer anderen Ausführungs-Engine, das Ausführen einer Gaming-Engine, das Ausführen eines Authentifizierungssystems –, müssen sie ihr eigenes Vertrauensnetzwerk erstellen. Chainlink ist ein großartiges Beispiel: Es ist ein Orakel-Protokoll, das hilft, Daten aus dem Internet in die Blockchain zu holen, aber Chainlink hat sein eigenes Vertrauensnetzwerk. Sein Vertrauen ist nicht von Ethereum-Stakern geliehen.

#### Mikroökonomisches Problem (16:28) {#microeconomic-problem-1628}

Das mikroökonomische Problem: Wenn man eine Middleware betreibt – sagen wir, ein Datenspeichersystem –, muss man seinen eigenen Staking-Mechanismus erstellen. Man benötigt eine hohe wirtschaftliche Sicherheit, was bedeutet, dass viel Kapital gestakt werden muss, und dann hat man die Opportunitätskosten des Kapitals. Zum Beispiel möchte man, dass 10 Milliarden Dollar in seiner Datenspeicherschicht gestakt werden. Man muss in einer nicht-spekulativen Welt eine jährliche Rate von 5 % oder 10 % auf dieses Kapital zahlen. Die dominierenden Kosten sind nicht die Betriebskosten für die Datenspeicherung – es sind die Kosten für die Versorgung einer massiven wirtschaftlichen Kapitalbasis.

Wenn man sich ein beliebiges Proof-of-Stake-Ökosystem ansieht: 94 % der Belohnungen gehen an die Person, die das Kapital hält, und nur 6 % gehen an die Person, die tatsächlich den Betrieb durchführt. Selbst wenn man also eine bahnbrechende Idee hat, um die Betriebskosten um das Zehnfache zu senken, bleiben die 94 % unverändert. Die Kostenstruktur ist durch die Kapitalkosten gedeckelt.

Wenn man eine dezentrale Anwendung (Dapp) ist, besteht das mikroökonomische Problem darin, dass man eine sehr hohe Gebühr an ein großes Vertrauensnetzwerk wie Ethereum zahlt, aber durch das schwächste Vertrauen, von dem man abhängig ist, eingeschränkt wird. Wenn man ein Orakel oder eine Brücke hätte, die nicht so vertrauenswürdig ist, könnte man dort ausgenutzt werden. Die Sicherheit ist immer der kleinste gemeinsame Nenner.

#### Ökonomisches Problem (19:52) {#economic-problem-1952}

Für die Kern-Blockchain gilt: Wenn das zentrale Wertversprechen darin besteht, dezentrales Vertrauen bereitzustellen und damit Einnahmen zu erzielen, ist Ethereum nur in der Lage, dezentrales Vertrauen für die Block-Erstellung bereitzustellen – nicht für all die anderen Dinge, die erforderlich sind, um einen dezentralen Dienst zu betreiben. Inseln dezentralen Vertrauens werden von anderer Middleware geschaffen, und anstatt dass sich die Einnahmen angleichen und ein massives Vertrauensnetzwerk schaffen, werden die Einnahmen in kleinere Inseln fragmentiert.

#### EigenLayer (20:44) {#eigenlayer-2044}

Es ist eigentlich eine lächerlich einfache Idee, die all diese Probleme auf einmal löst.

EigenLayer ist ein Mechanismus, um ein bestehendes Vertrauensnetzwerk zu nutzen, um andere Dinge zu tun, für die es nicht vorgesehen war. Ethereum liefert Vertrauen bei der Reihenfolge und Ausführung. EigenLayer ist eine Reihe von Smart Contracts auf Ethereum, und das zentrale operative Wort ist Restaking.

Was ist Restaking? Im Proof-of-Stake-Ethereum sind bereits mehrere zehn Milliarden Dollar in der Beacon Chain gestakt. EigenLayer ist ein Mechanismus, durch den Staker restaken – sie setzen dasselbe Kapital einem zusätzlichen Risiko aus. Sie sperren ihren Stake in Ethereum, und derselbe Stake wird an zusätzliche Slashing-Bedingungen gebunden. Slashing ist ein Mechanismus, durch den einem der Stake weggenommen werden kann, aber jetzt fügt man zusätzliche Gründe hinzu, durch die man bestraft werden kann, aufbauend auf den EigenLayer-Smart Contracts.

Die Eigenschaft, die wir wollen: Derselbe Stake übernimmt zusätzliches Risiko. Zusätzliches Risiko wofür? Für die Bereitstellung neuer Dienste, die auf EigenLayer aufgebaut wurden – jemand möchte ein Orakel, eine Brücke, eine Datenverfügbarkeitsschicht, ein neues Konsensprotokoll aufbauen. All dies kann auf EigenLayer aufgebaut werden. Wenn man als Staker teilnimmt, gibt man auch an, für welche Teilmenge von Diensten man sich entscheidet – und erzielt dadurch Einnahmen, während man gleichzeitig ein zusätzliches Slashing-Risiko eingeht.

#### Wie EigenLayer das Ökosystem in Einklang bringt (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Für Middleware: Wenn ein Staker, der bereits in Ethereum gestakt hat, sich entscheidet, auch Dienste für ein Orakel bereitzustellen, hat er keine zusätzlichen Kapitalkosten. Er hat bereits auf Ethereum gestakt und verdient eine APR. Durch die Teilnahme an EigenLayer sind die Grenzkosten des Kapitals entweder sehr gering oder theoretisch null. Wenn man weiß, dass man als ehrlicher Knoten niemals geslasht wird, ist das Risiko minimiert. Die Gleichung lautet dann: Sind die Betriebskosten durch die Einnahmen gerechtfertigt? Die Kostenstruktur von Middleware wandelt sich plötzlich von kapitalbegrenzt zu betriebskostenbegrenzt.

Für dezentrale Anwendungen (Dapps): Besonders beliebte Dienste, an denen viele Staker teilnehmen, bieten dasselbe Vertrauen wie Ethereum selbst. Wenn potenziell alle Staker teilnehmen, könnte man das Kernvertrauen von Ethereum für Dienste erhalten, die nicht nativ in Ethereum integriert wurden.

Es ist auch wertmäßig auf das Kernökosystem abgestimmt. Staker, die auf Ethereum gestakt haben, erhalten Block-Belohnungen und Transaktionsgebühren, aber sie können auch Orakel-Gebühren, Datenverfügbarkeitsgebühren, Sortierungsgebühren erhalten – alles Dinge, die zuvor nicht verfügbar waren. Die Tatsache, dass es zusätzliche Einnahmequellen für das Staking von ETH gibt, erhöht den Wert des Tokens selbst.

EigenLayer ist ein zweiseitiger Marktplatz. Die eine Seite sind Staker, die sich für eine Teilnahme entscheiden. Die andere Seite sind Middlewares und Dienste, die auf EigenLayer aufbauen und sich dafür entscheiden, diese Staker zu nutzen.

#### Überschuldung und Risikomanagement (33:00) {#over-leveraging-and-risk-management-3300}

**Frage aus dem Publikum:** Was passiert, wenn der Stake überschuldet (over-leveraged) wird?

Nehmen wir an, es gibt zehn verschiedene dezentrale Anwendungen (Dapps), die ihre eigenen Chains betreiben, jede mit einem Wert von 1 Million Dollar, die sich auf dasselbe Staker-Quorum von 2 Millionen Dollar verlassen – dieser Stake wird überschuldet. EigenLayer ist auch die Risikomanagementschicht. Wir modellieren dies als Graphenproblem: Jeder Staker ist ein Knoten, jeder Dienst hängt von einer Gruppe von Stakern ab, und es gibt für jeden Dienst einen Profit aus Korruption. Dann berechnet man Schnitte in diesem Graphen, um sicherzustellen, dass das System niemals überschuldet ist.

Wenn das System überschuldet wird, steigen die Gebühren, mehr Leute nehmen teil, und das System wird wieder unterverschuldet. Wenn mehr Dienste starten, steigen die Renditemöglichkeiten, und mehr Kapital wird gebunden – anstatt dass 5 % der ETH gestakt werden, könnten es 50 % sein.

#### Ökonomie des Block-Speicherplatzes (43:58) {#block-space-economics-4358}

Der Block-Speicherplatz wird durch das Block-Limit bestimmt – die maximale Größe, die ein Block aufnehmen kann. Alle Blockchain-Systeme verfügen über eine sich selbst anpassende Ökonomie, bei der die Preise zu explodieren beginnen, wenn sich die Blockgröße dem Block-Limit nähert.

Das Block-Limit wird durch die Infrastruktur des schwächsten Knotens festgelegt. Die Philosophie von Ethereum ist es, einen Heim-Validator in Venezuela zuzulassen – vielleicht mit 1 Megabyte pro Sekunde. So wird also das Block-Limit festgelegt. Aber alle Staker, die auf Amazon Web Services laufen, haben 10-Gigabit-Verbindungen – ein 10.000-facher Unterschied zum schwächsten Knoten.

EigenLayer löst dies automatisch, indem es einen freien Markt schafft, auf dem diese Staker ihren zusätzlichen Block-Speicherplatz für andere Dienste verleihen können. Jemand könnte eine andere Chain mit 15 Giga-Gas pro Block anstelle von 15 Millionen Gas aufbauen. Man erhält etwa 60 % der Sicherheit von Ethereum – und das ist bereits gut genug.

#### Heterogenität der Staker (48:57) {#staker-heterogeneity-4857}

Die Heterogenität der Staker geht über die Rechenfähigkeiten hinaus. Staker sind in ihren Risiko- und Belohnungspräferenzen sehr heterogen. Sie und ich mögen uns einig sein, dass wir geslasht werden, wenn wir von der Ausgabe einer Coinbase-API abweichen, aber für jemand anderen ist das völlig inakzeptabel. Dies kann niemals in ein Kernprotokoll normalisiert werden, sondern kann in eine Opt-in-Schicht ausgelagert werden.

Staker sind auch in ihren Belohnungspräferenzen heterogen. In Ethereum ist der Block-Speicherplatz eine farblose Größe – alle Transaktionen sind gleich, und das einzige Signal, um sie zu unterscheiden, ist der Preis. Es ist sehr schwierig, ein soziales Netzwerk auf Ethereum aufzubauen, da jede Transaktion eines sozialen Netzwerks mit einer DeFi-Transaktion konkurriert, die auf Transaktionsbasis viel profitabler ist. Unsere Lösung: Staker entscheiden sich für verschiedene Sub-Chains, in denen sie unterschiedliche Belohnungspräferenzen haben.

#### Demokratische und agile Innovation (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer löst das Problem, wie man eine Blockchain entwirft, die sowohl demokratisch als auch agil in der Innovation ist. Ethereum wird sehr demokratisch verwaltet, reagiert aber auch sehr langsam. Alle Protokolle gehen heute einen Kompromiss zwischen Agilität und demokratischer Governance ein. Ethereum plus EigenLayer bietet das Beste aus beiden Welten: eine Basisschicht, die demokratisch ist und langsam aktualisiert wird, auf der EigenLayer es den Menschen ermöglicht, Innovationen aufzubauen, die schnell und auf völlig erlaubnisfreie Weise auf Marktanforderungen reagieren.

#### EigenDA und Abschluss (52:56) {#eigenda-and-closing-5256}

Wir untersuchen den Bau von Brücken, ereignisgesteuerter Automatisierung, fairen Sortierungsdiensten, Sidechains und MEV-Integration – alles auf EigenLayer. EigenLayer ist bereits auf internen Testnetzen live. Wir haben bereits den ersten Anwendungsfall entwickelt: eine Hyperscale-Datenverfügbarkeitsschicht für Ethereum namens EigenDA. Es ist eine Datenverfügbarkeitsschicht, die die besten Ideen aus Löschcodierung und polynomialen Commitments integriert. Auf unserem Testnetz beträgt die Rate, mit der man Daten schreiben kann, 12,4 Megabyte pro Sekunde – zehnmal höher als das, was für Ethereum 2.0 geplant ist.

Die wichtigste Erkenntnis ist, dass bei der Löschcodierung die Gesamtkosten für die Speicherung einer Datei nicht von der Anzahl der Knoten abhängen, die sich dafür entschieden haben. Aber der Preis, den man verlangen kann, hängt von der Anzahl der Knoten ab, weil man mehr wirtschaftliche Sicherheit bietet. Es gibt eine selbstskalierende Ökonomie, bei der sich immer mehr Knoten anmelden werden, weil sie eine Sicherheitsprämie verlangen können, ohne die Betriebskosten zu erhöhen. Die Löschcodierung durchbricht den Kompromiss zwischen Skalierbarkeit und Dezentralisierung – man erhält gleichzeitig volle Dezentralisierung und volle Skalierbarkeit.

#### Q&A-Highlights (58:00) {#qa-highlights-5800}

**Zu Middleware-Audits:** Genau wie es ein Ökosystem für Smart-Contract-Audits gibt, brauchen wir Ökosysteme für Middleware-Audits. Ein Smart-Contract-Audit dient Benutzern, von denen angenommen wird, dass sie nichts wissen. Ein Middleware-Audit dient Stakern, von denen angenommen wird, dass sie etwas wissen. Wenn wir Middleware-Audits nicht zum Laufen bringen, sollten wir eigentlich auch Smart-Contract-Audits nicht vertrauen.

**Zum Risiko:** Das Extrembeispiel – der gesamte Stake hat sich für ein EigenLayer-System entschieden, bei dem man geslasht werden könnte, selbst ohne etwas Schlechtes zu tun, und dann wird man geslasht und das gesamte Protokoll ist in Gefahr. Das ist möglich. Aber die Staker sind diejenigen, die ihr Geld verlieren, also sollten sie bei der Teilnahme vorsichtiger sein. Es ihnen leicht zu machen, vorsichtig zu sein, ist das, worauf wir uns konzentrieren.

**Zu L1-Block-Speicherplatz vs. Sidechains:** Man kann ein ganz anderes System – wie eine Solana-VM – auf dem Vertrauensnetzwerk von Ethereum betreiben. Die Slashing-Bedingung ist einfach: Wenn man einen Block auf derselben Tiefe doppelt signiert, ist das eine Onchain-verifizierbare Bedingung und man wird geslasht. Die Kostenstruktur funktioniert, weil Restaker keine zusätzlichen Kapitalkosten haben, und der Unterschied zwischen einer EigenLayer-Sidechain und einer eigenen Chain besteht darin, dass man keinen neuen Wert-Token benötigt und nicht dafür bezahlen muss, die Kapitalkosten dieses Tokens aufrechtzuerhalten.