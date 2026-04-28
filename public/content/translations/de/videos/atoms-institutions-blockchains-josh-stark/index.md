---
title: "Atome, Institutionen, Blockchains"
description: "Josh Stark schlägt ein neues Konzept vor, um zu verstehen, was Blockchains sind, und führt das Konzept der 'Härte' als gemeinsame Eigenschaft ein, die Atome, Institutionen und Blockchains als Baumaterialien der Zivilisation verbindet."
lang: de
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "wie-ethereum-funktioniert"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atome, Institutionen, Blockchains"
---

Eine philosophische Keynote von **Josh Stark** von der Ethereum Foundation auf der Pragma Denver 2024, die ein neues Konzept zum Verständnis von Blockchains vorschlägt. Der Vortrag führt das Konzept der „Härte“ (hardness) als gemeinsame Eigenschaft ein, die Atome, Institutionen und Blockchains als Baumaterialien der Zivilisation verbindet.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=zI07mqNdxzA), das von ETHGlobal veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Warum können wir Blockchains nicht erklären? (0:00) {#why-cant-we-explain-blockchains-000}

Hallo zusammen, danke, dass ihr hier bei der Pragma in Denver seid. Mein Name ist Josh. Ich arbeite bei der Ethereum Foundation – ich bin jetzt seit etwa fünf Jahren bei der EF. Ich scherze gerne, dass mein Job darin besteht, herauszufinden, was mein Job sein sollte, und das ändert sich alle sechs Monate.

Ich habe in meiner Krypto-Karriere viele verschiedene Dinge gemacht. Ich habe an einer frühen Bitcoin-Wallet gearbeitet. Ich habe einen Bitcoin-Geldautomaten in Toronto gebaut – nun ja, gekauft – und ihn 2015 etwa ein Jahr lang betrieben. 2017 war ich Mitbegründer von ETHGlobal sowie eines Unternehmens namens L4, das an frühen Layer-2-Skalierungslösungen (L2) arbeitete. Und im Laufe der Jahre habe ich eine Reihe von Blogbeiträgen geschrieben.

Trotz alledem konnte ich immer noch nicht wirklich erklären, was wir taten oder warum. Ich hatte das Gefühl, dass dies sehr wichtig war, dass es die Welt verändern würde. Versteht mich nicht falsch – ich kann über einzelne Anwendungen sprechen. Wir können Bitcoin, NFTs, Uniswap, ENS erklären. All diese Dinge in ihren kleinen Silos sind nicht so schwer zu erklären. Aber wenn wir versuchen, über das große Ganze zu sprechen – was es bedeutet, dass es eine Technologie gibt, die all diese Dinge ermöglicht –, geraten wir ins Stolpern. Wir machen mentale Gymnastik, werfen den Leuten Schlagwörter an den Kopf und versuchen, Dinge zu erklären.

Wir müssen wirklich zum Kern der Sache vordringen, und ich glaube nicht, dass wir dem schon sehr nahe sind. Es ist ein Problem! Wenn wir über diese einzelnen Anwendungen sprechen können, aber nicht artikulieren können, was sie gemeinsam haben, dann übersehen wir etwas. Es gibt eine Erklärungsebene, die noch nicht gefunden wurde, und ich halte sie für wichtig. Mein Gefühl sagt mir, dass es uns offensichtlich erscheinen wird, sobald wir sie gefunden haben.

Das begann also mit einer sehr spezifischen Frage, die ich hatte: Was ist diese Allzwecktechnologie? Was ist diese grundlegende Fähigkeit? Und es entwickelte sich zu etwas, das ich viel interessanter finde.

#### Claude Shannon und die Idee der Information (4:00) {#claude-shannon-and-the-idea-of-information-400}

Lasst mich euch eine Geschichte erzählen. In den 1930er und 40er Jahren war Claude Shannon von den Anfängen eines neuen Zeitalters umgeben. Bei den Bell Labs arbeitete er während des Krieges an Feuerleitsystemen und Kryptographie und begann, über einen allgemeineren Ansatz für Informationen nachzudenken. Er nannte es anfangs nicht Information – 1939 schrieb er einem Kollegen, dass er über die „Übertragung von Intelligenz“ nachdenke. Das Wort Information hatte damals eine andere Bedeutung.

1948 veröffentlichte er „The Mathematical Theory of Communication“ – eine grundlegende Arbeit, die den Weg für das Informationszeitalter ebnete. Am wichtigsten für uns ist, dass darin zum ersten Mal eine abstrakte Idee von Information eingeführt wurde – eine Definition, die nicht an Musik, Sprache, Literatur oder Codes gebunden war. Dies ist die Arbeit, die das Bit einführte – die irreduzible Informationseinheit, die man in jedem Kontext messen konnte.

Vor diesem Moment hatte niemand wirklich dieses Konzept von Information als einer universellen, allgemeinen Sache. Das mag jetzt verrückt erscheinen – wir nutzen Informationstechnologie seit Tausenden von Jahren. Es ist untrennbar damit verbunden, was es bedeutet, ein Mensch zu sein, Sprache und Sprechen zu nutzen. Aber wir haben die zugrunde liegende Eigenschaft, die all diesen Dingen gemeinsam ist, erst vor sehr kurzer Zeit benannt.

Was ihr daraus mitnehmen solltet: Es gab eine Zeit, bevor wir die Idee der Information hatten, und eine Zeit danach. Was wäre, wenn uns auf ähnliche Weise etwas so Grundlegendes fehlt? Das ist meine Hypothese.

#### Drei Hinweise (7:00) {#three-clues-700}

Während ich mich bemühe, Blockchains zu erklären, stoße ich immer wieder auf diese seltsamen Dinge, die ich für Hinweise auf etwas Größeres halte.

**Hinweis Nummer eins** – wir beschreiben Blockchains sowohl als vertrauenslos als auch als vertrauenswürdig. Das ist seltsam. In Satoshis Whitepaper sprechen wir davon, die Notwendigkeit von Vertrauen zu beseitigen. Aber im Ethereum-Whitepaper sprechen wir davon, Ethereum zu nutzen, um Anwendungen vertrauenswürdiger zu machen. Der Economist nannte Blockchains eine „Vertrauensmaschine“. Wir meinen etwas Reales, wenn wir sagen, Blockchains seien vertrauenslos, und wir meinen etwas Reales, wenn wir sagen, sie seien vertrauenswürdig. Unsere Sprache ist da noch nicht hinterhergekommen. Es lohnt sich immer, auf diese scheinbaren Widersprüche zu achten – manchmal offenbaren sie eine Lücke in unseren Abstraktionen.

**Hinweis Nummer zwei** – wir sprechen viel darüber, wie sich Blockchains von zentralisierten Institutionen unterscheiden – Bitcoin versus Zentralbanken, ENS versus DNS. Aber wir sprechen selten darüber, was sie gemeinsam haben. Sie können als Ersatz füreinander dienen. Wenn ihr jemals Fiatgeld gegen Bitcoin getauscht habt, habt ihr sie gegeneinander ausgetauscht. Sie müssen etwas gemeinsam haben, damit dieser Austausch so regelmäßig stattfindet.

Bei Autos sprachen wir von „pferdelosen Kutschen“, aber zumindest konnten wir benennen, was sie waren – Fahrzeuge. Bei digitalen Aufzeichnungen sprachen wir von „papierlosen“ Medien, aber wir kannten die Kategorie – Information. Es scheint, als hätten wir eine Technologie erfunden, bevor wir die Kategorie erfunden haben, zu der sie gehört.

**Hinweis Nummer drei** – Satoshis Paper beginnt mit diesen Worten: „Der Handel im Internet hat sich fast ausschließlich auf Finanzinstitute als vertrauenswürdige Dritte verlassen.“ Satoshi verglich Bitcoin mit Institutionen, nicht mit anderer Software. Da ist etwas dran.

#### Einführung der Härte (11:00) {#introducing-hardness-1100}

Hier ist meine Antwort darauf, was in diese Kategorie gehört. Ich nenne es **Härte** (hardness). Hier ist die Geschichte in fünf einfachen Schritten, und dann gehen wir mehr in die Tiefe.

Erstens – unsere Zivilisation hängt von sozialer Infrastruktur wie Geld und Recht und so vielen anderen Dingen ab, und diese müssen zuverlässig sein. Sie müssen sich so verhalten, wie wir es von ihnen erwarten, zumindest die meiste Zeit, damit sie für uns nützlich sind. Andernfalls würden wir uns nicht auf sie verlassen – sie würden nicht zu Geld werden.

Zweitens – es ist sehr schwierig, dieses notwendige Maß an Zuverlässigkeit zu erreichen. Bisher gibt es eigentlich nur drei Wege, wie wir das jemals geschafft haben: durch Atome, durch Institutionen und jetzt durch Blockchains.

Drittens – es gibt eine unerkannte Eigenschaft, die allen dreien gemeinsam ist und die ich Härte nenne. Härte ist die Fähigkeit, die Macht, uns die Zukunft auf die ganz spezifische Weise vorhersehbarer machen zu lassen, die wir für komplexe Koordinationsspiele benötigen.

Viertens – dass diese drei Quellen der Härte jeweils unterschiedliche Eigenschaften haben, die sie in verschiedenen Kontexten nützlich machen.

Und fünftens – wir können sie zusammen verwenden und sie gegeneinander austauschen.

Die Inflationsrate von Gold ist aufgrund der physikalischen Eigenschaften unseres Planeten zuverlässig – sie ist atomhart. Ein Vertrag ist zuverlässig, weil Institutionen kommen und dir deine Sachen wegnehmen, wenn du deinen Verpflichtungen nicht nachkommst. Ein Smart Contract wird funktionieren, weil er durch ein kryptoökonomisches Protokoll gesichert ist, bei dem Milliarden von Dollar auf dem Spiel stehen.

Man kann sich Atome, Institutionen und Blockchains wie Baumaterialien vorstellen – wie Holz, Beton und Stahl. Sie sind unterschiedlich, aber sie gehören zu einer gemeinsamen Kategorie. Und wir nutzen diese Dinge nicht, um Gebäude zu bauen, sondern um eine Zivilisation aufzubauen. Vielleicht können wir mit besseren Materialien eine größere, bessere und stärkere Zivilisation aufbauen als die, die wir jetzt haben.

#### Was ist Härte? (14:00) {#what-is-hardness-1400}

Lasst mich genauer erklären, was ich mit Härte meine. Das ist nicht einfach irgendeine Zuverlässigkeit, die irgendetwas haben könnte. Härte ist eine spezifische Art. Zunächst ist festzuhalten, dass es sich um eine Art von Zuverlässigkeit handelt, die für die soziale Koordination wichtig ist. Nicht nur, wisst ihr, dass dieser Tisch zuverlässig ein Tisch ist – sondern dass man seine Miete bezahlen kann, dass ein Vertrag durchgesetzt wird, dass eine Wirtschaft stark ist. Dafür ist Härte da.

Und was genau ist das Ergebnis? Ich führe hier leider ein weiteres neues Wort ein, das ich den **Guss** (cast) nenne. Ein Guss ist jeder mögliche zukünftige Zustand der Welt, der durch Härte gewiss oder sicher gemacht wird. Ich entschuldige mich für den Fachjargon, aber der Grund für ein eigenes Wort hier ist, dass wir meiner Meinung nach keines haben, das über alle Quellen der Härte hinweg verallgemeinerbar ist. Es ist vielleicht wie das Bit – wir brauchen ein Konzept, über das wir in vielen verschiedenen Kontexten sprechen und zwischen Quellen wechseln können, ohne an eine von ihnen gebunden zu sein.

Ein Guss im Zusammenhang mit einem Kredit wäre: Wenn Alice Bob nicht zurückzahlt, werden rechtliche Institutionen zunehmend strengere Drohungen und Maßnahmen ergreifen, um sie dazu zu zwingen. Dieser Guss wird durch institutionelle Härte gehärtet. Ein Guss in Bezug auf Gold könnte sein, dass in den nächsten 20 Jahren jedes Jahr eine bestimmte Menge Gold auf den Markt kommt – zuverlässig gemacht durch die physikalischen Eigenschaften unserer Erde. Und ein Guss in Bezug auf Ethereum könnte der Anspruch sein, dass Vermögenswerte nur übertragen werden können, wenn man den privaten Schlüssel besitzt, der einem bestimmten öffentlichen Schlüssel entspricht – gehärtet durch Blockchain-Härte.

In der Praxis interagieren wir meist mit Bündeln dieser Dinge, die alle miteinander verwoben sind. Wenn man Gold besitzt und es in einer Bank aufbewahrt, sind viele Dinge wichtig: Güsse über das zukünftige Goldangebot, Güsse über die Stärke des Tresors der Bank, Güsse über die Stärke der rechtlichen Vereinbarung zwischen einem selbst und der Bank, Güsse über die Zuverlässigkeit des Rechtssystems im eigenen Land, das diese Regeln durchsetzen würde, wenn etwas schiefgeht.

Zweitens kann man Härte als ein Maß für Sicherheit betrachten. Sie ist theoretisch immer messbar, auch wenn es in der Praxis schwer umzusetzen ist. Wie hart ist dieser Guss, dass in den nächsten 20 Jahren jedes Jahr eine bestimmte Menge Gold auf den Markt kommt? Eine Möglichkeit, dies zu betrachten, ist die Wahrscheinlichkeit – man schaut sich alle Daten an und versucht, die Wahrscheinlichkeit vorherzusagen. Oder man betrachtet es aus der Kostenperspektive: Was würde es jemanden kosten, diesen Guss zu brechen? Wenn man ein Nationalstaat ist, könnte man die Mittel des Krieges und der internationalen Regulierung nutzen. Oder man könnte den anderen Weg gehen und einen Asteroiden aus dem Weltall holen, der viel Gold enthält, und so die physikalischen Grenzen der Erde umgehen. Es gibt einen Preis, um fast jeden Guss zu brechen.

Und schließlich stammt Härte aus bestimmten Quellen – Atomen, Institutionen und Blockchains. Jede hat unterschiedliche Eigenschaften, die sie in verschiedenen Kontexten nützlich machen.

Was mir an diesem Konzept gefällt, ist, dass es uns erlaubt, tiefere Fragen zu stellen – nicht nur über spezifische Eigenschaften von Blockchains zu sprechen, sondern all diese verschiedenen Dinge zu vergleichen und darüber nachzudenken, wo sie angemessen sind, wie wir sie nutzen und in welcher Kombination.

#### Atom-Härte (19:00) {#atom-hardness-1900}

Bei der Atom-Härte geht es darum, dass wir Zuverlässigkeit in der Natur um uns herum finden – buchstäblich physische Atome, aber auch andere natürlich vorkommende Eigenschaften. Wir tun dies, wenn wir Goldperlen als Geld verwenden, wenn wir physische Strukturen nutzen, um Eigentumsrechte zu definieren, oder Eigentumsrechte in einem physischen Objekt wie einer Urkunde festhalten.

Sie hat viele Vorteile: automatische Durchsetzung, gemeinsamer Zustand, ein universelles Regelwerk. Es ist sehr praktisch für die menschliche Zivilisation, dass die Gesetze der Physik überall gleichermaßen gelten, zumindest auf den makroskopischen Skalen, die für uns am wichtigsten sind.

Aber sie hat auch Schwächen. Wir sind auf das beschränkt, was wir in der Welt finden können. Atom-Härte ist ein bisschen wie ein Architekt, der eine Felswand in sein Haus einbauen möchte – man muss eine finden, die funktioniert. Man kann nicht einfach eine Felswand erschaffen. Man kann sie ein wenig verändern, aber man ist darauf angewiesen, ein natürlich vorkommendes Merkmal zu finden, das zu den eigenen spezifischen Bedürfnissen passt.

Wir können ihr keine neuen Regeln geben. Wir haben Gold, aber wir können das Universum nicht bitten, uns eine neue Art von Gold mit geringerer Inflation, gerechterer geografischer Verteilung zu geben oder vielleicht das Gewichtsproblem zu lösen. Das können wir nicht tun. Und sie hat eine sehr begrenzte Programmierbarkeit – es gibt nur bestimmte Arten von gehärteten Dingen, die man aus Atom-Härte machen kann, hauptsächlich Gelder. Man kann keinen Ehevertrag aus Atomen machen. Dafür braucht man etwas Komplexeres, wie eine Institution.

Und Güsse werden oft durch unsere zunehmende menschliche Kontrolle über die Natur untergraben. Muscheln als Geld zu verwenden ist in Ordnung, bis man Teil einer globalen Wirtschaft ist, die die Erwartungen an die Muschelinflation radikal auf den Kopf stellen könnte, und plötzlich ist die eigene Wirtschaft ausgelöscht. Die Verwendung von Gold als Tauschmittel könnte eines Tages vor demselben Problem stehen, falls und wenn wir Asteroidengold gewinnen und unsere Annahmen über das Angebot ändern können.

Aber es ist subtiler als das. Manchmal haben wir Güsse, von denen wir nicht einmal wissen, dass sie existieren, aber dann sind sie weg, weil sich etwas geändert hat. Es gab lange Zeit einen harten Guss bezüglich der Handelsgeschwindigkeit auf den Finanzmärkten – es konnte nur in einem bestimmten Tempo gehandelt werden, vielleicht in dem Tempo, in dem sich jemand auf dem Parkett etwas zurufen kann. Dieser Guss war atomhart – wir konnten einfach nicht schneller kommunizieren. Aber neue Technologien haben diese Annahmen völlig untergraben. Wir stellten fest, dass uns eine Version dieses alten Gusses eigentlich gefiel, und bauten ihn aus Institutionen neu auf – indem wir Vorschriften einführten, die die Handelsgeschwindigkeit begrenzen und Handelsaussetzungen (Circuit Breakers) durchsetzen.

#### Institutionelle Härte (22:00) {#institutional-hardness-2200}

Institutionelle Härte ist eine sehr weite Kategorie – sie umfasst die meisten Dinge, an die wir denken, wenn wir an Zivilisation denken. Unsere Rechtssysteme, Gesetzgeber, Polizeikräfte, Unternehmen, alles. Alle Institutionen, die irgendeine Art von Härte bieten. Wir haben Güsse geschaffen, die unseren Gesellschaften Ordnung gaben und asoziales Verhalten bestraften. Wir haben Härte als Plattform geschaffen, die es jedem ermöglicht, seine eigenen Güsse zu erstellen, die durch Institutionen gehärtet werden, wenn man bestimmte Regeln befolgt. Wir haben Güsse geschaffen, die neue Vermögenswerte hervorbrachten und wachsenden Volkswirtschaften Kreditquellen boten.

Institutionelle Härte hat viele Vorteile. Sie ist sehr programmierbar – Menschen, die in Organisationen gruppiert sind, können wirklich komplexe oder subtile Anweisungen entgegennehmen. Dies ist ein sehr großer Gestaltungsraum für mögliche Güsse. Und sie bestehen aus Menschen, und Menschen sind gut. Vielleicht ist es gut, dass manchmal jemand einschreiten und sagen kann: „Ich werde das nicht durchsetzen, weil ich es für falsch halte.“ Es ist gut, dass es vielleicht manchmal einen Bruch im System gibt, damit jemand ein Whistleblower oder ein Rebell sein kann.

Aber sie hat auch viele Schwächen. Sie ist durch Grenzen beschränkt – nur in bestimmten Ländern hat man wirklich Zugang zu Institutionen, die die Rechtsstaatlichkeit durchsetzen. Sie ist politischem oder staatlichem Versagen ausgesetzt – wenn sich die Regierung einfach nicht einigen kann oder man von einer kriegerischen Nation überfallen wird, könnten bestimmte Institutionen, auf die man sich für Geld oder Verträge verlässt, einfach zusammenbrechen. Sie sind oft undurchsichtig – es ist schwer zu sagen, ob eine Institution wirklich hart ist oder nicht, bis etwas schiefgeht. Sie haben hohe Anlaufkosten – wir können nicht einfach neue Institutionen in der Größenordnung der Fed oder des Rechtssystems schaffen, um sie weiterzuentwickeln. Wir stecken irgendwie mit denen fest, die wir haben.

Und sie bestehen aus Menschen, und Menschen sind schlecht. Die Realität in diesem und vielen anderen Ländern ist, dass viele Menschen nicht wirklich Zugang zu der Härte hatten, die von Institutionen bereitgestellt wird. Sie konnten keine Hypothek aufnehmen. Sie konnten kein Bankkonto eröffnen. Denn wenn man eine Institution mit Menschen besetzt, ist sie deren Übeln, deren Vorurteilen, deren Ideologien ausgesetzt. Und unsere Abhängigkeit von institutioneller Härte nimmt nur noch zu. Das Problem damit, dass Software die Welt verschlingt, ist, dass die meiste Software eigentlich nur aus einer Institution hinter dem Bildschirm besteht, und wir geben ihnen dadurch immer mehr Macht.

#### Blockchain-Härte (24:20) {#blockchain-hardness-2420}

Satoshis Erfindung war natürlich mehr als nur Bitcoin – sie war der Kern einer Allzwecktechnik zur Schaffung digitaler Härte in einer digitalen Umgebung. Sie hat viele Stärken: universeller globaler Zugang, sie besteht aus Software und jeder kann Software schreiben, der Grad der Härte kann transparent und überprüfbar sein, niedrige Anlaufkosten, leicht weiterzuentwickeln und durch Marktanreize gesichert – und Märkte sind rational.

Aber sie hat auch Schwächen. Sie erfordert eine technologische Zivilisation – wir hätten Blockchains aufgrund der Anforderungen nicht schon früher haben können, und eine Zivilisation in der Zukunft, die nicht das hat, was wir haben, wird sie auch nicht nutzen können. Sie besteht aus Software, und Software kann schlecht geschrieben sein. Der Anwendungsbereich von Güssen ist auf Onchain-Umgebungen beschränkt. Und sie ist durch Marktanreize gesichert – und Märkte sind irrational.

#### Warum das wichtig ist (25:10) {#why-this-matters-2510}

Was bedeutet das also? Was bringt uns das? Warum ist das mehr als nur von akademischem Interesse?

Viele Dinge ergeben viel mehr Sinn, wenn man sie durch diese Linse betrachtet. Eines davon ist die Frage, mit der wir begonnen haben: Warum sagen wir, dass Blockchains sowohl vertrauenslos als auch vertrauenswürdig sind? Die Erklärung lautet wie folgt: Wenn wir sagen, dass Blockchains vertrauenslos sind, meinen wir eigentlich, dass ihre Härte nicht von einer Person oder Institution abhängt. Und wenn wir sagen, dass sie vertrauenswürdig sind, meinen wir nur, dass sie Härte besitzen – nur eben von einer anderen Art. Unsere Unfähigkeit, diese Unterscheidung zu treffen, ist die Ursache für diese verwirrende Sprache.

Es erklärt, warum private oder zentralisierte Blockchains nicht interessant sind. Eine Blockchain, die nicht dezentral ist, fällt einfach wieder in die Rolle einer Institution zurück. Wenn sie von drei Banken oder einer Handvoll Validatoren kontrolliert wird, die alle von derselben Organisation finanziert werden, dann ist es nur eine EVM, die durch institutionelle Härte gesichert ist. Das Interessanteste an Blockchains ist nicht die EVM – es ist die Tatsache, dass es eine andere Quelle der Härte gibt, die nicht mit den gleichen Fehlern und Einschränkungen wie Institutionen korreliert oder diesen unterworfen ist. Deshalb ist es anders. Deshalb ist es wichtig.

Es hilft auch, das Spektrum der Möglichkeiten und die Standardideologien zu verstehen, in die Menschen im Blockchain-Bereich verfallen. Viele Menschen konzentrieren sich sehr darauf, Blockchain-Härte zu nutzen, um mit institutioneller Härte zu konkurrieren oder sie zu ersetzen – darum geht es in weiten Teilen der Bitcoin-Community und bei vielen Dezentralisierten Finanzen (DeFi). Sogar ENS versucht in gewisser Weise, DNS zu ersetzen oder damit zu konkurrieren. Aber dann gibt es auch Leute, die sehen, dass Blockchain-Härte Dinge tun kann, die institutionelle Härte nicht kann – Ideen, die noch nie jemand zuvor ausprobiert hat, weil wir diese Fähigkeit, diese bestimmte Art von Härte, nie hatten. Und jetzt können wir diese Dinge erforschen. Vielleicht gehören NFTs dazu, oder Spiele wie Dark Forest, oder die Bewegung rund um autonome Welten.

#### Unsere Ambitionen steigern (27:00) {#raising-our-ambitions-2700}

Am wichtigsten ist meiner Meinung nach, dass dieses Konzept unsere Ambitionen steigert. Persönlich ist es das, was für mich zählt, und vielleicht findet das bei euch Anklang – ich bin nicht nur wegen dieser einzelnen Anwendungen hier. Ich bin niemand, dem es nur um Bitcoin oder nur um DeFi oder nur um NFTs geht. Vielleicht geht es euch genauso. Hier ist etwas Größeres im Gange.

Wir können unsere Ziele ehrlich gesagt höher stecken als nur Geld. Wir können unsere Ziele höher stecken als nur Finanzen. Es gibt ein viel größeres Gesamtbild. Ich denke, das hilft tatsächlich dabei, eine Vision zu definieren, die sich in ihrem Ausmaß den Herausforderungen, vor denen wir stehen, und den Möglichkeiten, die Blockchains bieten, angemessen anfühlt.

Die Mission besteht nicht nur darin, die Fed zu ersetzen. Die Mission besteht darin, genau die Materialien zu verbessern und zu erweitern, die wir zum Aufbau unserer Zivilisation verwendet haben – die Kosten für diese Werkzeuge zu senken, damit jeder auf der Erde Zugang zu ihnen hat, um mehr Veränderungen zu ermöglichen. Und übrigens, diese Kosten werden bald sinken.

Der Menschheit zu helfen, dieses unendliche Spiel weiterzuspielen, indem wir mehr Menschen erlauben, die Regeln zu ändern. Nur sehr wenige Menschen können ein Gesetz erlassen, aber jeder kann einen Smart Contract schreiben. Wir erweitern diese Fähigkeit.

Ich glaube, viele Menschen in vielen verschiedenen Ländern und mit vielen Ideologien haben das Gefühl, dass wir feststecken – dass die Spielregeln nicht mehr so sind, wie sie sein sollten, wir aber machtlos sind, sie zu ändern. Wir stecken in so vielerlei Hinsicht in diesem lokalen Maximum fest, und wir spüren intuitiv, dass das falsch ist. Blockchains beheben das nicht, aber ich denke, sie können helfen. Sie eröffnen einen neuen Raum für Experimente. Sie lassen mehr Menschen die Regeln ändern, neue Regeln schreiben, zu diesem unendlichen Spiel beitragen. Wir können keine Gesetze schreiben, aber wir können einen Smart Contract schreiben.

Ich möchte mit diesem Gedanken schließen: Wenn ihr schon einmal Vorträge von Leuten der EF gesehen habt, wisst ihr, dass wir das Buch *Finite and Infinite Games* (Endliche und unendliche Spiele) mögen. Eine der Maximen aus diesem Buch lautet, dass nur das, was sich ändern kann, fortbestehen kann. Wir können nicht in diesem lokalen Maximum stecken bleiben. Wir müssen die Dinge ändern. Und ich denke, Blockchains helfen uns dabei. Vielen Dank.