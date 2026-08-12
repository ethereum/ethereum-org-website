---
title: "Der Ethereum-Privatsphäre-Stack: Private Lesezugriffe, Netzwerke und das versteckte Leck"
description: "Andy Guzman erklärt, wie Metadaten leaken, wenn Wallets Daten von Ethereum lesen, und wie die Forschung der Privatsphäre-Roadmap zu privaten Lesezugriffen und Netzwerken das Leck auf der Zugriffsebene schließt."
lang: de
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Ethereum-Privatsphäre-Stack"
---

Ein Vortrag von **Andy Guzman**, Leiter des Teams Privacy Stewards of Ethereum (PSE) bei der Ethereum Foundation, auf der EthBoulder 2026. Er deckt einen großen blinden Fleck in der Ethereum-Privatsphäre auf: Selbst Benutzer, die niemals eine Transaktion signieren, geben durch alltägliche Abfragen detaillierte Verhaltensdaten preis. Er stellt den Ethereum-Privatsphäre-Stack vor, der private Lesezugriffe (PIR), Traffic-Privatsphäre (Onion-Routing und Mixnets) sowie Leistungsoptimierungen wie Unified Binary Trees und ZK-verifizierbaren Zustand umfasst.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=tvAqDJXCBaA), das von EthBoulder veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Der fiktive Brief des RPC-Anbieters (0:12) {#the-fictional-rpc-provider-letter-012}

Hallo zusammen, ich bin Andy, und ich möchte ein Thema vorstellen, das im Ethereum-Ökosystem nicht oft diskutiert wird und extrem wichtig ist. Wie ihr vielleicht an der Folie und der Einleitung bemerkt habt, geht es um Privatsphäre und darum, wie unzureichend wir geschützt sind, ohne es überhaupt zu merken.

Lasst mich mit einem Brief beginnen, den jemand an euch geschrieben hat.

"Lieber geschätzter Nutzer, vielen Dank für die 847 Abfragen, die du diesen Monat gemacht hast. Wir haben es wirklich genossen, dich kennenzulernen. Wir wissen, dass du ETH über drei verschiedene Wallets verteilt hältst. Wir wissen, dass du letzten Dienstag 94 Mal den Preis von ETH überprüft hast. Es war ein sehr harter Tag für alle, also kein Vorwurf. Du hast auch den BTC-Preis überprüft, was interessant ist, weil du keine Bitcoin hältst. Denkst du über eine Diversifizierung nach? Das bleibt unter uns und natürlich unseren Analysepartnern. Du beobachtest auch zwei Uniswap-Pools sehr genau und hast letzte Woche 14 Mal deinen Aave-Gesundheitsfaktor (Health Factor) überprüft. Du solltest dich vielleicht entspannen oder einfach ein paar Sicherheiten hinzufügen. Am Donnerstag hast du ihn dreimal innerhalb von 12 Minuten überprüft und warst sehr besorgt. Du hast dir vier verschiedene ENS-Namen angesehen, also startest du entweder ein neues Projekt oder hast eine Identitätskrise. Und zwischen 23 Uhr und 7 Uhr Mountain Time bist du immer ruhig."

#### Wie du Daten preisgibst, ohne Transaktionen zu signieren (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Wir sind uns also ziemlich sicher, dass du in Boulder oder in der Nähe lebst. Du hast nie eine einzige Transaktion über uns signiert. Das musstest du auch nie. Deine Neugier hat uns alles verraten. Herzliche Grüße, dein RPC-Anbieter."

Natürlich ist das ein fiktiver Brief, aber er beschreibt etwas, das wir wirklich jeden Tag preisgeben. Selbst wenn du keine einzige Transaktion oder Onchain-Aktion durchführst, erzählst du im Grunde alles jedem Analyseunternehmen, das liebend gerne an diese Daten und dein Verhalten herankommen würde.

#### Private Schreibzugriffe vs. private Lesezugriffe (2:07) {#private-writes-vs-private-reads-207}

Was passiert also gerade wirklich in der Welt der Privatsphäre? Ich sehe, dass wir viel Wert auf Onchain-Privatsphäre legen, oder das, was wir bei PSE private Schreibzugriffe (Private Writes) nennen: alle Aktionen, die du Onchain durchführst. Und das ergibt Sinn, oder? Diese Aktionen werden für immer aufgezeichnet und um die Welt gesendet, also ist es sinnvoll, deine Adresse nicht bei einer bestimmten Aktion preiszugeben. Wir legen auch viel Wert auf Tools: Datenquellen, Beweise, DSLs und Sprachen, die wir verwenden können, um Entwicklern mehr Werkzeuge an die Hand zu geben, um stärkere Apps auszudrücken und zu entwickeln, die mehr Privatsphäre Onchain bieten.

Aber ich möchte in dieser Präsentation argumentieren, dass wir diesen anderen Bereichen bei weitem nicht genug Aufmerksamkeit und Mühe widmen: dem, was wir private Lesezugriffe (Private Reads) nennen, denn wann immer du Daten von einer Blockchain abfragst, gibst du viele Informationen preis, und privaten Netzwerken (Private Networking), denn noch bevor irgendetwas Onchain ankommt, leakt dein gesamter Traffic.

Um etwas technischer zu werden: Alle RPC-Aufrufe wie eth_getBalance, eth_call und eth_getLogs sind Anfragen im Klartext, die an RPC-Anbieter gehen und mit deiner IP korreliert werden.

#### Warum mehr Aktivität das Profiling-Risiko erhöht (3:20) {#why-more-activity-increases-profiling-risk-320}

Mit diesen Informationen wird es sehr einfach, Profile von Menschen zu erstellen, sie zu segmentieren und Verhaltensweisen zu modellieren. Und das kann gegen dich verwendet werden. Wie du dir vorstellen kannst, ist Information Macht, und je mehr Informationen Leute über dich und dein Verhalten haben, desto mehr Macht haben sie über dich.

Die meisten Menschen erkennen das nicht. Die meisten Leute werden sagen: Okay, nun, es ist nicht wirklich wichtig, weil das keine kritischen Informationen sind. Oder sie denken vielleicht: Je mehr Aktivität es gibt, desto geschützter bin ich. Das ist absolut nicht wahr und kontraintuitiv. Bei Onchain-Aktionen, wo immer es Anonymitätsmengen gibt, hilft es tatsächlich: je mehr Nutzer, desto mehr Privatsphäre und desto einfacher ist es, in der Masse unterzutauchen. Aber bei Lesezugriffen ist es genau umgekehrt, weil Abfragen nicht austauschbar sind. Je mehr Aktivität du überträgst, je mehr Aktionen du durchführst, desto reicher ist die Korrelationsfläche und desto einfacher ist es, ein Profil deiner Aktionen zu erstellen.

Wann immer es also einen DeFi-Hype (Dezentralisierte Finanzen) oder NFT-Wahnsinn gibt, werden die Leute nachlässiger. OpSec wird natürlich über Bord geworfen, und es wird viel, viel einfacher, Leute basierend auf den Aktivitätsmustern, in die die meisten Menschen verfallen, zu de-anonymisieren.

#### Vorstellung des Ethereum-Privatsphäre-Stacks (4:43) {#introducing-the-ethereum-privacy-stack-443}

Ich möchte mit der Landschaft beginnen: Wo sollten wir ansetzen, was wird benötigt und wer arbeitet woran. Dieser Vortrag wird auf einige eher technische Themen und einige eher konzeptionelle Themen auf hoher Ebene eingehen, sodass jeder etwas Wertvolles daraus mitnehmen kann.

Ich möchte das vorstellen, was ich den Ethereum-Privatsphäre-Stack nenne, oder die Schichten des Ethereum-Privatsphäre-Stacks, und ich denke, es ist nützlich, darüber nachzudenken. Wenn wir wirklich Privatsphäre wollen, brauchen wir nicht nur Privatsphäre Onchain; wir brauchen auch Privatsphäre in all diesen Schichten des Stacks, ähnlich dem Lebenszyklus einer Transaktion oder dem OSI-Modell und seinen Technologieschichten. Ich würde argumentieren, dass wir einen Standard oder eine Art ökosystemweite Anerkennung dafür schaffen könnten, dass diese Schichten existieren. Vielleicht ist dies nicht die endgültige Form, aber ich denke, es ist wohl schon jetzt nützlich.

#### Schicht für Schicht: Wo du Daten preisgibst (5:41) {#layer-by-layer-where-you-leak-541}

Ganz oben ist die Anwendungsschicht (Application Layer). Wann immer du eine Website besuchst, gibst du natürlich preis, was du besuchst, und Leute können anfangen, Profile zu erstellen: Anonymitätsmengen, Anmeldeinformationen, die Verknüpfung deiner IP mit dem, was du besuchst, selbst wenn du gar nichts tust.

Die nächste ist die Wallet-Schicht. Wann immer du eine Aktion ausführst, gibst du nicht nur Informationen an die App-Schicht preis, sondern auch an die Gateways. Wallets sind heutzutage sehr komplex, sie integrieren sich in viele andere Systeme und Dienste, und du gibst viel mehr Informationen preis, als du dir vorstellst. Selbst wenn du nur deine Wallet öffnest und sie den Preis von ETH oder deinen Kontostand abfragt, gibst du alles preis.

Dann hast du die Gateways: die RPCs, die Proxys, die Relayer. Du gibst wieder mehr Metadaten preis. Dann das, was sich die Leute als das Onchain-Element vorstellen würden, nämlich wann immer Dinge auf der EVM abgefragt werden, wie der Zustand oder Ausführungsmuster. Zum Beispiel die Abfrage des Kontostands von etwas oder des Zustands eines Smart Contracts. Und schließlich der Konsens, wo sich alle Validatoren befinden. Je nachdem, ob du Onchain schreibst oder Onchain liest, berührst du möglicherweise auch den Mempool.

Und es gibt noch eine weitere Vertikale, die wir Networking nennen, die transversal ist und sich über all diese Schichten erstreckt. Zum Beispiel: Im Moment besuchst du eine Website und der Server kennt deine IP. Aber was wäre, wenn du diese Website über Tor oder ein anderes anonymes Netzwerk besuchen würdest? Du würdest die IP-Adresse der Website kennen, aber sie würden deine nicht kennen. Und was ist, wenn diese Website in einem Land gehostet wird, das kürzlich damit begonnen hat, alle Krypto-Dinge zu zensieren? Diese Website und das Unternehmen würden ebenfalls ihre IP verbergen wollen und ihre Domain hinter einer Onion-Domain verstecken wollen.

Das sind die Arten von Dingen, die Sinn ergeben: Wir müssen Schicht für Schicht vorgehen, alles härten und durch die Linse eines sehr disruptiven Angreifers analysieren, der alles zensieren will. Selbst wenn wir es nicht tun und sagen, wir leben in einem ausreichend guten Zustand, werden diese Informationen jetzt aufgezeichnet und für immer von vielen Leuten gehostet, die du nicht einmal kennst, Unternehmen, die anfangen, deine Daten zu verkaufen. Irgendwann, in fünf Jahren, könnte jemand Krypto verbieten und sagen: "Jeder, der in den letzten fünf Jahren Uniswap genutzt hat, ich bin das Finanzamt, ich werde anfangen anzuklopfen und dich ins Gefängnis bringen", oder was auch immer. Diese dystopischen Szenarien passieren gerade in verschiedenen Ländern auf der ganzen Welt.

#### Private Lesezugriffe und private Netzwerke (8:24) {#private-reads-and-private-networking-824}

Okay, wir haben also den Ethereum-Privatsphäre-Stack. Worauf sollten wir uns konzentrieren? In dieser Präsentation möchte ich über diese beiden Bereiche sprechen. Private Lesezugriffe: Wann immer du auf den Zustand von Onchain zugreifst, berührst du all diese Schichten, von der App – sagen wir, ich möchte den Preis von ETH abfragen – über die Wallet, zu den Gateways, zu einem Knoten, auf dem Ethereum und die EVM laufen, und dann zurück. Im Grunde ein RPC-Anbieter oder ein Indexer. Und private Netzwerke, das sind alle Aktionen, die auf der Netzwerkschicht stattfinden. Das ist es, was wir härten wollen.

#### Drei Säulen: Daten, Traffic, Leistung (9:05) {#three-pillars-data-traffic-performance-905}

Es gibt drei Säulen, die meiner Meinung nach entscheidend dafür sind, dass wir dies erreichen. Wir wollen die Daten selbst verbergen und privat machen. Wir wollen den Traffic selbst verbergen und privat machen. Und dann wollen wir es performant, nützlich, praktisch und günstig machen. Dies fasst viele Informationen über Dinge zusammen, die im Ökosystem vor sich gehen, aber ich denke, es ist nützlich, die Lage der Dinge zu skizzieren und die Hebelpunkte zu identifizieren, an denen wir beschleunigen können.

#### Daten verbergen: Von Proxys zu PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Also, Daten. Was genau wollen wir schützen? Wir wollen verbergen, nach welchen Informationen du diese Server fragst, und wir wollen die Muster verbergen, wie du auf diese Daten zugreifst. Nicht nur den Inhalt, sondern auch die Muster.

Es gibt verschiedene Stufen der Technik. Die erste ist nichts: Du gibst einfach alles preis. Wann immer du deine Wallet verbindest, verknüpfst du deine IP-Adresse mit dem Vertrag, den du abfragst, mit einem bestimmten eth_getBalance für eine bestimmte Adresse, und das war's. Selbst wenn du ein Privatsphäre-Protokoll verwendest, sagen wir Tornado Cash, und du den Zustand des Merkle-Baums abfragen möchtest, musst du entweder den gesamten Baum herunterladen, was nicht sehr performant ist, oder du gibst preis, welchen Pfad und welche Blätter du abfragst, was deine Anonymitätsmenge reduziert. Selbst die Verwendung eines starken Privatsphäre-Protokolls wie Tornado Cash reicht also nicht aus, wenn du dein Netzwerk und deine Datenzugriffsmuster nicht schützt.

Die nächste Stufe ist eine Art von Proxys oder Relays: viele Maschinen, die nicht wissen, woher die Anfrage kommt, und schließlich die Daten abrufen. Das ist nicht sehr praktisch und nicht sehr vertrauenslos.

Dann hast du TEEs, die ein Schritt nach vorne sind, und hier bieten einige Teams und Unternehmen Dienste an. Ich denke, das ist ein guter Schritt nach vorne, aber nicht genug, wiederum weil die Kosten für Angriffe auf und die Korrumpierung von TEEs stark sinken. Für bestimmte kritische Anwendungsfälle reicht dies nicht aus; für viele alltägliche könnte es das.

Es gibt andere Teams, die an OMAPs (Oblivious Map Access Patterns) und ORAM (Oblivious RAM) arbeiten. Dies sind ähnliche Techniken, die versuchen zu verschleiern, auf welche Teile des Datensatzes du zugreifen möchtest. Anstatt zu sagen "Ich möchte den Kontostand von dieser ETH-Adresse", greifst du zufällig auf verschiedene Dinge zu, sodass der Server es nicht weiß.

Und ich würde argumentieren, dass das Endziel davon PIR (Private Information Retrieval) sein wird, was bedeutet, dass der Server nicht weiß, was du abfragst, und nichts darüber erfährt.

#### Private Information Retrieval erklärt (12:03) {#private-information-retrieval-explained-1203}

Private Information Retrieval ist eine extrem leistungsstarke Technik in der Kryptographie und wird viel genutzt werden. Es gibt zwei Varianten: Index-PIR, das du verwenden kannst, wenn du strukturierte Daten unter einem Index hast, und Keyword-PIR, bei dem du, wie der Name schon sagt, nach Schlüsselwörtern abfragst. Es ist sehr schwer, ein einziges Schema zu haben, das für alles funktioniert.

Der Ethereum-Zustand ist riesig und sehr vielfältig. Logs, wie ich gestern gelernt habe, sind Append-only (nur anfügbar), aber das Kontomodell ist anders: Einiger Zustand wird sehr häufig aktualisiert, anderer nicht. Je nachdem, wie man es aufteilt und strukturiert, kann man Megabytes, Gigabytes oder Terabytes an Daten mit sehr unterschiedlichen Zugriffsmustern haben.

#### Eine Multi-Agenten-PIR-Architektur (12:48) {#a-multi-agent-pir-architecture-1248}

Der Vorschlag, an dem wir innerhalb von PSE arbeiten – und hier werde ich konzeptionell sprechen und dann über spezifische Projekte, die wir bei PSE durchführen, sowie andere Dinge, die ich im Ökosystem sehe –, ist eine Multi-Agenten-Architektur. Es gibt kein einziges Schema, das für den gesamten Ethereum-Zustand perfekt ist. Aber wenn wir den Ethereum-Zustand nach Typ oder Zugriffsmuster aufteilen können, können wir für jeden von ihnen sehr gute Schemata finden.

Was wäre, wenn wir einen Dienst hätten, der diese Multi-Agenten-Architektur ausführt und je nach Art der Abfragen und wo sie sich im Ethereum-Zustand befinden könnten, das eine oder andere Schema ausführt? Das bringt uns bereits sehr nah an etwas heran, das machbar, produktionsfähig und dem Ökosystem anbietbar ist. Dies wird so etwas wie eine einheitliche API erfordern, damit sich Wallets, Indexer, Nutzer und Entwickler von dezentralen Anwendungen (Dapps) keine Gedanken darüber machen müssen, welches Schema verwendet wird und wie man es aufruft. Man hat einfach die Standard-API, und jemand anderes kümmert sich um die Implementierungsdetails.

Wir tun dies bereits und implementieren zwei verschiedene Schemata. Wir werden Fördergelder ausschreiben und versuchen, mehr Leute im Ökosystem zu koordinieren, um einige davon in Angriff zu nehmen und zu sehen, welche für Ethereum am dringendsten benötigt werden.

Hier sind ein paar Zahlen zu verschiedenen PIR-Schemata: Durchsätze, Kommunikations-Overhead und so weiter. Es ist schwierig, weil verschiedene Apps unterschiedliche Zugriffsmuster haben. Einige greifen auf viele Belege zu, einige wollen mehr auf den Zustand zugreifen, wie Rotki, und einige greifen auf mehr Transaktionen zu, wie Helios. Es gibt keine Patentlösung, und höchstwahrscheinlich wird eine gemischte Architektur hilfreich sein. Wir führen auch eine Systematisierung des Wissens durch, wenn das also für euch interessant ist, können wir es teilen. Und hier sind nur einige der Teams, die in diesen Bereichen arbeiten. Verzeiht mir, wenn ihr Teil eines Teams seid und ich euch nicht aufgenommen habe; wenn jemand die Aufzeichnung sieht und fehlt, lasst es mich bitte wissen und ich kann anfangen, euch hinzuzufügen.

#### Traffic verbergen: Onion-Routing und Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Wir haben Daten abgedeckt. Der andere große Bereich ist Traffic. Wie verbergen wir Traffic, und was wollen wir verbergen? Ganz einfach ausgedrückt, wollen wir die IPs des Clients und des Servers voreinander verbergen, sowie vor dem Rest der Welt, der möglicherweise den Traffic ausspioniert. Wir haben verschiedene Techniken: Onion-Dienste, Mixnets, VPNs, DC-Nets, und es mag noch andere Klassifizierungen geben. Ich werde nur über die ersten beiden sprechen.

Onion-Routing-Techniken verschlüsseln in Schichten, und der Traffic wird ebenfalls in Schichten entschlüsselt. Leute dazwischen können niemals den Ursprung kennen, einige können niemals das Ziel kennen, und einige erfahren nie etwas; sie fungieren nur als Router.

Das TL;DR ist: Was wäre, wenn der gesamte Traffic des Ethereum-Ökosystems sozusagen durch das Tor-Netzwerk geleitet werden könnte? Es gibt auch andere Optionen. Wir würden helfen, die IP des Senders zu schützen: Dein Telefon oder dein Laptop würde nicht geleakt werden, wenn du Transaktionen sendest oder Informationen anforderst. Und natürlich würden wir auch den Empfänger, den Server, schützen. Stell dir vor, im Iran, in China, Nordkorea oder Venezuela versucht jemand, ein DeFi-Protokoll (Dezentralisierte Finanzen) oder einen Dienst zu hosten, und es wird von seinem Land zensiert. Dies ist eine Option, die ihr Leben schützen könnte. Es umgeht Zensur und verbirgt den Traffic auch vor ISPs, Internetdienstanbietern, von denen wir alle wissen, dass sie von Geheimdiensten angezapft werden, die alles ausspionieren.

Das Ziel ist es, einen Drop-in-Ersatz zu haben: ein SDK, damit sich Wallets, Entwickler von dezentralen Anwendungen (Dapps) und Infrastrukturanbieter keine Gedanken über die Implementierungsdetails machen müssen. Sie wissen einfach, dass, wenn sie dieses SDK verwenden, der Traffic "onionisiert", verschlüsselt und gehärtet wird.

Es gibt ein Team, das ich besonders erwähnen möchte, das Brume Wallet-Team, das Echalote gestartet hat, eine Open-Source-Implementierung von Tor für das Web. Das existiert bereits: Es gibt Tor-Clients, aber sie sind in C geschrieben und müssen in einem speziellen Browser ausgeführt werden. Was ist, wenn ich das zu MetaMask oder zur Kohaku-Wallet oder zu Ambire, Rabby und all den anderen hinzufügen möchte? Wir brauchen JavaScript-SDKs, und genau das hat Echalote begonnen.

Dann entwickelt das Tor-Projekt eine neue Implementierung namens Arti, die nächste Generation ihres Clients. Aber wir brauchen ein eingebettetes Arti. Arti basiert auf Rust und muss zu WASM kompiliert werden, um in deinem Browser ausgeführt werden zu können, damit du es ganz einfach importieren kannst. Wir haben im Grunde eine Zusammenarbeit mit dem Tor-Team: wöchentliche Anrufe und einige gemeinsame Projekte und Partnerschaften.

#### Mixnets für Ethereum (18:16) {#mixnets-for-ethereum-1816}

Auf der Mixnet-Seite möchte ich mehreren Teams ein Lob aussprechen, die sich diesem Thema nähern: dem Nym-Team; HOPR, ebenfalls eines der ersten; VPNs wie Gnosis VPN; und ein paar anderen, die mir neu waren, wie Anyone Protocol, und ich glaube, jemand von diesem Team sollte hier in Denver sein, plus einige andere neue. Es gibt viele Teams, die an Mixnets, VPNs und anderen Ansätzen arbeiten.

Wir wollen sehen: Was wäre, wenn wir ein speziell für Ethereum entwickeltes Mixnet erstellen, über das wir RPC-Traffic leiten können? Mixnets haben starke Garantien, aber sie fügen viel Latenz hinzu. Für einige Anwendungsfälle ist das in Ordnung: Es macht nichts, wenn es etwas länger dauert, solange man Privatsphäre hat. Aber für Dinge wie DeFi (Dezentralisierte Finanzen) und Trading ist es extrem unwahrscheinlich, dass diese übernommen werden, wenn sie Latenz hinzufügen. Also, was ist das Schnellste, was wir mit den höchsten Privatsphäre-Garantien ausführen können? Nochmals ein Lob an einige dieser Teams, und wenn jemand in diesen Bereichen arbeitet und ich euch nicht hinzugefügt habe, würde ich mich freuen, mich auszutauschen.

#### Leistung: Unified Binary Trees und GPU-Beschleunigung (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Das Letzte, worüber ich sprechen möchte, die dritte Säule, um dies Wirklichkeit werden zu lassen, ist die Leistung. Wir wollen, dass diese Dinge schnell und günstig laufen. Ich habe ein Prinzip: Diese Dinge werden nicht übernommen, wenn die Kosten höher sind als der Nutzen. Kosten bedeuten Benutzererfahrung, Zeit und Aufwand für den Nutzer, aber auch Kosten für die Entwickler und die Infrastruktur: Ist der Betrieb sehr teuer? Wir müssen die Kosten so weit wie möglich senken, und es gibt zwei hochrangige Initiativen, über die ich sprechen kann.

Eine davon ist UBT (Unified Binary Trees). Je nachdem, wie sehr ihr in Protokoll-EIPs involviert seid, habt ihr vielleicht schon davon gehört. Im Moment haben wir den Merkle-Patricia-Trie, der nützlich ist, aber nicht sehr nützlich für ZK und andere Arten von Kryptographie. Es gibt einen Vorschlag, EIP-7864, der nicht zu Verkle-Bäumen übergeht, sondern zu Unified Binary Trees. Dies ist viel effizienter für die Abfrage des Zustands und die anschließende Durchführung kryptographischer Operationen wie ZK darauf.

Wir haben ein Projekt, das einen verifizierbaren UBT durchführt: Man fügt jedem Ethereum-Client einen Sidecar hinzu, der anstelle einer MPT-Datenbank eine UBT-Zustandsdatenbank hat, und dann beweist man mithilfe einer zkVM, dass diese Transformation von MPT zu UBT gültig ist. Das ist bereits sehr mächtig. Sobald wir das geschafft haben, könnten Light Clients dies nutzen, um ihre Leistung zu steigern, und Dinge wie PIR könnten viel schneller laufen.

Der andere Aspekt ist die GPU-Beschleunigung. Wir können diese Dinge viel schneller ausführen, wenn wir die unteren Ebenen des Stacks optimieren: GPU ist eine davon, oder auch CPU-Beschleunigung. Diese Dinge werden wahrscheinlich auf Servern laufen, nicht auf Telefonen, daher ist es auch sehr wertvoll, damit zu beginnen, zu erforschen, wie wir diese Low-Level-Bibliotheken erstellen können, damit sie viel schneller laufen.

Um bisher zusammenzufassen: Wir haben diese fünf Schichten, und wir wollen diese Anwendungsfälle abdecken. Es gibt drei Säulen: Daten, Traffic und Leistung. Für Daten haben wir Proxys, TEEs, ORAMs, OMAPs und PIR. Für Traffic haben wir Mixnets, Onion-Routing und andere. Für die Leistung haben wir UBT und GPU-Beschleunigung. Wenn ihr mehr lesen wollt, zumindest über die Beiträge, die PSE leistet, könnt ihr auf pse.dev/research gehen.

#### Erfolg messen (22:15) {#measuring-success-2215}

Was ist also Erfolg, und wie können wir ihn messen? Um auf diese Schichten zurückzukommen: Wenn ich behaupten können möchte, dass Ethereum die privateste Chain ist, was ist das Endziel? Ich müsste mich wohl dabei fühlen, dass all diese Schichten extrem gehärtet sind. Wie würde ich das messen? Ich würde erwarten, dass mehr Websites und Frontends von dezentralen Anwendungen (Dapps) hinter Onion-Domains gehostet werden. Ich fände es toll, wenn Wallets nativ anonymes Routing nutzen würden, ebenso wie Gateways, RPC-Anbieter und Indexer. Und ich würde einen Prozentsatz messen.

Die Frage ist: Wie viele der aktuellen Frontends im Ethereum-Ökosystem werden hinter einer Onion-Domain gehostet? Ich würde sagen, extrem wenige, 1 %, wenn überhaupt. Damit ich ein gutes Gefühl habe und sagen kann, wir haben es geschafft, bräuchten wir wahrscheinlich mehr als 80 % auf all diesen Schichten. Wie viele Wallets leiten derzeit Traffic durch anonyme Routing-Techniken? Sehr, sehr wenige. Dasselbe gilt für RPC-Anbieter: Bieten diese Anbieter PIR an? Nein. Für mich bedeutet die Behauptung von Erfolg also, dass die Akteure auf all diesen Schichten diese Arten von Technologien übernehmen, mindestens 80 % der Teams, des Traffics oder der Abfragen.

#### Bitcoins Onion-Knoten-Vergleich (23:39) {#bitcoins-onion-node-comparison-2339}

Das ist eine Sache, um die wir Bitcoin beneiden können. Bei aller Kritik, die sie bekommen, ist dies ein Bild vom November letzten Jahres: 64 % ihrer erreichbaren vollständigen Knoten (Full Nodes) sind hinter Onion-Domains verborgen.

Können wir das selbst tun? Dies ist Privatsphäre auf einer niedrigeren Ebene, der Konsens-Ebene, aber könnten wir sagen, dass unsere Full Nodes und Validator-Knoten hinter einem Onion-Netzwerk oder Mixnets stehen? Ich denke definitiv, dass wir das sollten, und wir liegen wahrscheinlich bei weniger als 1 %. Wir haben andere Herausforderungen, die sie nicht haben: Wir laufen viel schneller, und unser Konsens ist anders. Aber ich hätte gerne solche Dashboards und würde sagen, dass mehr als 80 % der Wallets diese Arten von Technologien übernommen haben, und auch RPC-Anbieter, Explorer, Frontends, Load Balancer und SDKs. Ich würde mich freuen, wenn diese Liste wächst.

#### Vergleich von Ethereum mit Monero und Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Ich habe mir gestern Abend und in der Nacht davor die Freiheit genommen, mir anzusehen, wie das Ethereum-Ökosystem durch diese Linse der Schichten im Vergleich zu Dingen wie Solana, Bitcoin, Zcash und Monero abschneidet. Dinge in Gelb sind Opt-in-Techniken, und ich denke, da sind wir sehr gut. Dinge in Blau sind Vorschläge, einige davon Protokoll-Vorschläge. Dinge in Grün werden auf der Protokoll-Ebene erzwungen.

Aufgrund unserer 10-jährigen Geschichte als öffentliche Chain wird es meiner Meinung nach schwer sein, zu Monero und Zcash aufzuschließen, wenn es darum geht, Privatsphäre nativ zu machen. Aber ich denke, wir können wirklich gute Arbeit leisten, um Opt-in-Adoption zu erreichen und Teams und Nutzer kulturell und sozial dahingehend zu beeinflussen, mehr dieser Techniken zu übernehmen. Bitcoin und Solana haben ihre eigenen Herausforderungen, und ich denke, sie werden weiter zurückliegen, zumindest bei diesen Privatsphäre-Dingen.

#### Die Herausforderung: Das privateste programmierbare Ökosystem (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Mein Ziel, und das Ziel, das ich euch in den Kopf setzen möchte, ist, dass Ethereum das privateste, erlaubnisfreiste, vertrauensloseste und programmierbarste Ökosystem der Welt wird. Wir haben andere private Zahlungs-Chains, und das ist großartig, sie sind sehr gut, aber ich denke, sie werden es viel schwerer haben, programmierbar zu werden und das Ökosystem zu schaffen, das wir geschaffen haben.

Meine Herausforderung an euch, und natürlich an mich und mein Team, ist es, unter den programmierbaren Ökosystemen das erlaubnisfreiste, vertrauensloseste und privateste zu werden. Wir können uns nicht nur auf die Onchain-Elemente konzentrieren. Wir müssen uns auf all diese Schichten konzentrieren.

Wenn ihr also an privaten Lesezugriffen, Netzwerken, PIR-Implementierungen, GPU-Beschleunigung, Datenstrukturen, UBT, Infrastruktur oder Validatoren arbeitet, würde ich mich freuen, mich danach mit euch auszutauschen. Vielen Dank. Ethereum ist für Privatsphäre.