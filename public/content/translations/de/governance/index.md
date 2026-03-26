---
title: Ethereum-Governance
description: "Eine Einführung, wie Entscheidungen über Ethereum getroffen werden."
lang: de
---

# Einführung in die Ethereum-Governance {#introduction}

_Wenn niemand [Ethereum](/) besitzt, wie werden dann Entscheidungen über vergangene und zukünftige Änderungen an Ethereum getroffen? Ethereum-Governance bezieht sich auf den Prozess, der es ermöglicht, solche Entscheidungen zu treffen._

<Divider />

## Was ist Governance? {#what-is-governance}

Governance umfasst die Systeme, die es ermöglichen, Entscheidungen zu treffen. In einer typischen Organisationsstruktur hat möglicherweise das Führungsteam oder ein Vorstand das letzte Wort bei der Entscheidungsfindung. Oder vielleicht stimmen Aktionäre über Vorschläge ab, um Veränderungen herbeizuführen. In einem politischen System können gewählte Amtsträger Gesetze erlassen, die versuchen, die Wünsche ihrer Wähler zu vertreten.

## Dezentralisierte Governance {#decentralized-governance}

Keine einzelne Person besitzt oder kontrolliert das Ethereum-Protokoll, aber es müssen dennoch Entscheidungen über die Implementierung von Änderungen getroffen werden, um die Langlebigkeit und den Wohlstand des Netzwerks bestmöglich zu gewährleisten. Dieser Mangel an Eigentümerschaft macht traditionelle organisatorische Governance zu einer inkompatiblen Lösung.

## Ethereum-Governance {#ethereum-governance}

Ethereum-Governance ist der Prozess, durch den Protokolländerungen vorgenommen werden. Es ist wichtig darauf hinzuweisen, dass dieser Prozess nicht damit zusammenhängt, wie Menschen und Anwendungen das Protokoll nutzen – Ethereum ist erlaubnisfrei. Jeder von überall auf der Welt kann an Aktivitäten auf der Blockchain teilnehmen. Es gibt keine festgelegten Regeln dafür, wer eine Anwendung erstellen oder eine Transaktion senden darf oder nicht. Es gibt jedoch einen Prozess, um Änderungen am Kernprotokoll vorzuschlagen, auf dem dezentralisierte Anwendungen laufen. Da so viele Menschen von der Stabilität Ethereums abhängig sind, gibt es eine sehr hohe Koordinationsschwelle für Kernänderungen, einschließlich sozialer und technischer Prozesse, um sicherzustellen, dass alle Änderungen an Ethereum sicher sind und von der Community breit unterstützt werden.

### Governance auf der Blockchain vs. Off-Chain-Governance {#onchain-vs-offchain}

Die Blockchain-Technologie ermöglicht neue Governance-Fähigkeiten, bekannt als Governance auf der Blockchain. Governance auf der Blockchain liegt vor, wenn über vorgeschlagene Protokolländerungen durch eine Abstimmung der Stakeholder entschieden wird, normalerweise durch Inhaber eines Governance-Tokens, und die Abstimmung auf der Blockchain stattfindet. Bei einigen Formen der Governance auf der Blockchain sind die vorgeschlagenen Protokolländerungen bereits in Code geschrieben und werden automatisch implementiert, wenn die Stakeholder die Änderungen durch Signieren einer Transaktion genehmigen.

Der gegenteilige Ansatz, die Off-Chain-Governance, ist der Fall, wenn Entscheidungen über Protokolländerungen durch einen informellen Prozess der sozialen Diskussion getroffen werden, die bei Genehmigung in Code implementiert würden.

**Die Ethereum-Governance findet Off-Chain statt**, wobei eine Vielzahl von Stakeholdern in den Prozess involviert ist.

_Während die Ethereum-Governance auf Protokollebene Off-Chain stattfindet, nutzen viele auf Ethereum aufbauende Anwendungsfälle, wie z. B. DAOs, Governance auf der Blockchain._

<ButtonLink href="/dao/">
  Mehr zu DAOs
</ButtonLink>

<Divider />

## Wer ist beteiligt? {#who-is-involved}

Es gibt verschiedene Stakeholder in der [Ethereum-Community](/community/), von denen jeder eine Rolle im Governance-Prozess spielt. Angefangen bei den Stakeholdern, die am weitesten vom Protokoll entfernt sind, und dann näher herangezoomt, haben wir:

- **Ether-Inhaber**: Diese Personen halten eine beliebige Menge an ETH. [Mehr zu ETH](/what-is-ether/).
- **Anwendungsnutzer**: Diese Personen interagieren mit Anwendungen auf der Ethereum-Blockchain.
- **Anwendungs-/Tooling-Entwickler**: Diese Personen schreiben Anwendungen, die auf der Ethereum-Blockchain laufen (z. B. DeFi, NFTs usw.), oder entwickeln Tools zur Interaktion mit Ethereum (z. B. Wallets, Test-Suites usw.). [Mehr zu Dapps](/apps/).
- **Knotenbetreiber**: Diese Personen betreiben Blockchain-Knoten, die Blöcke und Transaktionen weiterleiten und jede ungültige Transaktion oder jeden ungültigen Block ablehnen, auf den sie stoßen. [Mehr zu Blockchain-Knoten](/developers/docs/nodes-and-clients/).
- **EIP-Autoren**: Diese Personen schlagen Änderungen am Ethereum-Protokoll in Form von Ethereum-Verbesserungsvorschlägen (EIPs) vor. [Mehr zu EIPs](/eips/).
- **Validatoren**: Diese Personen betreiben Blockchain-Knoten, die der Ethereum-Blockchain neue Blöcke hinzufügen können.
- **Protokollentwickler** (auch bekannt als „Core Developers“): Diese Personen pflegen die verschiedenen Ethereum-Implementierungen (z. B. go-ethereum, Nethermind, Besu, Erigon, Reth auf der Ausführungsebene oder Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine auf der Konsensebene). [Mehr zu Ethereum-Clients](/developers/docs/nodes-and-clients/).

_Hinweis: Jede Person kann Teil mehrerer dieser Gruppen sein (z. B. könnte ein Protokollentwickler sich für ein EIP einsetzen, einen Beacon Chain-Validator betreiben und DeFi-Anwendungen nutzen). Aus Gründen der konzeptionellen Klarheit ist es jedoch am einfachsten, zwischen ihnen zu unterscheiden._

<Divider />

## Was ist ein EIP? {#what-is-an-eip}

Ein wichtiger Prozess, der in der Ethereum-Governance verwendet wird, ist das Vorschlagen von **Ethereum-Verbesserungsvorschlägen (EIPs)**. EIPs sind Standards, die potenzielle neue Funktionen oder Prozesse für Ethereum spezifizieren. Jeder innerhalb der Ethereum-Community kann ein EIP erstellen. Wenn Sie daran interessiert sind, ein EIP zu schreiben oder an Peer-Reviews und/oder Governance teilzunehmen, siehe:

<ButtonLink href="/eips/">
  Mehr zu EIPs
</ButtonLink>

<Divider />

## Der formelle Prozess {#formal-process}

Der formelle Prozess zur Einführung von Änderungen am Ethereum-Protokoll sieht wie folgt aus:

1. **Ein Core-EIP vorschlagen**: Wie in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) beschrieben, besteht der erste Schritt, um formell eine Änderung an Ethereum vorzuschlagen, darin, sie in einem Core-EIP detailliert zu beschreiben. Dies dient als offizielle Spezifikation für ein EIP, das Protokollentwickler bei Annahme implementieren werden.

2. **Präsentieren Sie Ihr EIP den Protokollentwicklern**: Sobald Sie ein Core-EIP haben, für das Sie Feedback aus der Community gesammelt haben, sollten Sie es den Protokollentwicklern präsentieren. Sie können dies tun, indem Sie es zur Diskussion in einem [AllCoreDevs-Call](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status) vorschlagen. Es ist wahrscheinlich, dass einige Diskussionen bereits asynchron im [Ethereum Magicians-Forum](https://ethereum-magicians.org/) oder im [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw) stattgefunden haben.

> Mögliche Ergebnisse dieser Phase sind:

> - Das EIP wird für ein zukünftiges Netzwerk-Upgrade in Betracht gezogen
> - Es werden technische Änderungen angefordert
> - Es kann abgelehnt werden, wenn es keine Priorität hat oder die Verbesserung im Verhältnis zum Entwicklungsaufwand nicht groß genug ist

3. **Auf einen endgültigen Vorschlag hinarbeiten:** Nachdem Sie Feedback von allen relevanten Stakeholdern erhalten haben, müssen Sie wahrscheinlich Änderungen an Ihrem ursprünglichen Vorschlag vornehmen, um dessen Sicherheit zu verbessern oder die Bedürfnisse verschiedener Nutzer besser zu erfüllen. Sobald Ihr EIP alle Änderungen enthält, die Sie für notwendig erachten, müssen Sie es den Protokollentwicklern erneut präsentieren. Sie gehen dann zum nächsten Schritt dieses Prozesses über, oder es tauchen neue Bedenken auf, die eine weitere Iterationsrunde für Ihren Vorschlag erfordern.

4. **EIP in Netzwerk-Upgrade aufgenommen**: Angenommen, das EIP wird genehmigt, getestet und implementiert, wird es als Teil eines Netzwerk-Upgrades eingeplant. Angesichts der hohen Koordinationskosten von Netzwerk-Upgrades (jeder muss gleichzeitig aktualisieren) werden EIPs in der Regel in Upgrades gebündelt.

5. **Netzwerk-Upgrade aktiviert**: Nachdem das Netzwerk-Upgrade aktiviert wurde, ist das EIP im Ethereum-Netzwerk live. _Hinweis: Netzwerk-Upgrades werden in der Regel auf Testnets aktiviert, bevor sie im Ethereum-Mainnet aktiviert werden._

Dieser Ablauf, obwohl sehr vereinfacht, gibt einen Überblick über die wichtigsten Phasen, damit eine Protokolländerung auf Ethereum aktiviert wird. Lassen Sie uns nun die informellen Faktoren betrachten, die während dieses Prozesses eine Rolle spielen.

## Der informelle Prozess {#informal-process}

### Vorherige Arbeiten verstehen {#prior-work}

EIP-Champions sollten sich mit früheren Arbeiten und Vorschlägen vertraut machen, bevor sie ein EIP erstellen, das ernsthaft für die Bereitstellung im Ethereum-Mainnet in Betracht gezogen werden kann. Auf diese Weise bringt das EIP hoffentlich etwas Neues, das nicht schon einmal abgelehnt wurde. Die drei wichtigsten Orte, um dies zu recherchieren, sind das [EIP-Repository](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) und [ethresear.ch](https://ethresear.ch/).

### Arbeitsgruppen {#working-groups}

Der erste Entwurf eines EIP wird wahrscheinlich nicht ohne Bearbeitungen oder Änderungen im Ethereum-Mainnet implementiert. Im Allgemeinen arbeiten EIP-Champions mit einer Untergruppe von Protokollentwicklern zusammen, um ihren Vorschlag zu spezifizieren, zu implementieren, zu testen, zu iterieren und abzuschließen. Historisch gesehen haben diese Arbeitsgruppen mehrere Monate (und manchmal Jahre!) Arbeit erfordert. Ebenso sollten EIP-Champions für solche Änderungen relevante Anwendungs-/Tooling-Entwickler frühzeitig in ihre Bemühungen einbeziehen, um Feedback von Endnutzern zu sammeln und Bereitstellungsrisiken zu mindern.

### Community-Konsens {#community-consensus}

Während einige EIPs unkomplizierte technische Verbesserungen mit minimalen Nuancen sind, sind andere komplexer und bringen Kompromisse mit sich, die sich auf verschiedene Stakeholder unterschiedlich auswirken. Das bedeutet, dass einige EIPs innerhalb der Community umstrittener sind als andere.

Es gibt kein klares Regelwerk, wie mit umstrittenen Vorschlägen umzugehen ist. Dies ist ein Ergebnis des dezentralisierten Designs von Ethereum, bei dem keine einzelne Stakeholder-Gruppe die andere durch rohe Gewalt zwingen kann: Protokollentwickler können sich entscheiden, Codeänderungen nicht zu implementieren; Knotenbetreiber können sich entscheiden, nicht den neuesten Ethereum-Client auszuführen; Anwendungsteams und Nutzer können sich entscheiden, keine Transaktionen auf der Blockchain durchzuführen. Da Protokollentwickler keine Möglichkeit haben, Menschen zur Übernahme von Netzwerk-Upgrades zu zwingen, werden sie im Allgemeinen vermeiden, EIPs zu implementieren, bei denen die Umstrittenheit die Vorteile für die breitere Community überwiegt.

Von EIP-Champions wird erwartet, dass sie Feedback von allen relevanten Stakeholdern einholen. Wenn Sie sich als Champion eines umstrittenen EIP wiederfinden, sollten Sie versuchen, auf Einwände einzugehen, um einen Konsens rund um Ihr EIP aufzubauen. Angesichts der Größe und Vielfalt der Ethereum-Community gibt es keine einzelne Metrik (z. B. eine Coin-Abstimmung), die verwendet werden kann, um den Community-Konsens zu messen, und von EIP-Champions wird erwartet, dass sie sich an die Umstände ihres Vorschlags anpassen.

Über die Sicherheit des Ethereum-Netzwerks hinaus haben Protokollentwickler historisch gesehen großen Wert darauf gelegt, was Anwendungs-/Tooling-Entwickler und Anwendungsnutzer schätzen, da ihre Nutzung und Entwicklung auf Ethereum das Ökosystem für andere Stakeholder attraktiv macht. Darüber hinaus müssen EIPs über alle Client-Implementierungen hinweg implementiert werden, die von verschiedenen Teams verwaltet werden. Ein Teil dieses Prozesses bedeutet in der Regel, mehrere Teams von Protokollentwicklern davon zu überzeugen, dass eine bestimmte Änderung wertvoll ist und dass sie Endnutzern hilft oder ein Sicherheitsproblem löst.

<Divider />

## Umgang mit Meinungsverschiedenheiten {#disagreements}

Viele Stakeholder mit unterschiedlichen Motivationen und Überzeugungen zu haben, bedeutet, dass Meinungsverschiedenheiten keine Seltenheit sind.

Im Allgemeinen werden Meinungsverschiedenheiten mit ausführlichen Diskussionen in öffentlichen Foren behandelt, um die Wurzel des Problems zu verstehen und jedem die Möglichkeit zu geben, sich einzubringen. Typischerweise gibt eine Gruppe nach, oder es wird ein goldener Mittelweg gefunden. Wenn eine Gruppe stark genug davon überzeugt ist, könnte das Durchsetzen einer bestimmten Änderung zu einem Chain-Split führen. Ein Chain-Split liegt vor, wenn einige Stakeholder gegen die Implementierung einer Protokolländerung protestieren, was dazu führt, dass verschiedene, inkompatible Versionen des Protokolls betrieben werden, aus denen zwei unterschiedliche Blockchains hervorgehen.

### Der DAO-Fork {#dao-fork}

Forks treten auf, wenn größere technische Upgrades oder Änderungen am Netzwerk vorgenommen werden müssen und die „Regeln“ des Protokolls ändern. [Ethereum-Clients](/developers/docs/nodes-and-clients/) müssen ihre Software aktualisieren, um die neuen Fork-Regeln zu implementieren.

Der DAO-Fork war eine Reaktion auf den [DAO-Angriff von 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), bei dem ein unsicherer [DAO](/glossary/#dao)-Vertrag bei einem Hack um über 3,6 Millionen ETH erleichtert wurde. Der Fork verschob die Gelder aus dem fehlerhaften Vertrag in einen neuen Vertrag, der es jedem, der bei dem Hack Gelder verloren hatte, ermöglichte, diese wiederzuerlangen.

Über diese Vorgehensweise wurde von der Ethereum-Community abgestimmt. Jeder ETH-Inhaber konnte über eine Transaktion auf [einer Abstimmungsplattform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) abstimmen. Die Entscheidung für den Fork erreichte über 85 % der Stimmen.

Es ist wichtig anzumerken, dass das Protokoll zwar einen Fork durchführte, um den Hack rückgängig zu machen, das Gewicht der Abstimmung bei der Entscheidung für den Fork jedoch aus einigen Gründen umstritten ist:

- Die Wahlbeteiligung war unglaublich niedrig
- Die meisten Menschen wussten nicht, dass die Abstimmung stattfand
- Die Abstimmung repräsentierte nur ETH-Inhaber, nicht die anderen Teilnehmer im System

Ein Teil der Community weigerte sich, den Fork mitzumachen, größtenteils, weil sie der Meinung waren, dass der DAO-Vorfall kein Fehler im Protokoll war. Sie gründeten daraufhin [Ethereum Classic](https://ethereumclassic.org/).

Heute hat die Ethereum-Community eine Politik der Nichteinmischung in Fällen von Vertragsfehlern oder verlorenen Geldern übernommen, um die glaubwürdige Neutralität des Systems aufrechtzuerhalten.

Sehen Sie mehr zum DAO-Hack:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Der Nutzen von Forks {#forking-utility}

Der Fork von Ethereum/Ethereum Classic ist ein hervorragendes Beispiel für einen gesunden Fork. Wir hatten zwei Gruppen, die in einigen Grundwerten so stark voneinander abwichen, dass sie der Meinung waren, es sei die damit verbundenen Risiken wert, ihre spezifischen Vorgehensweisen zu verfolgen.

Die Fähigkeit, angesichts erheblicher politischer, philosophischer oder wirtschaftlicher Differenzen einen Fork durchzuführen, spielt eine große Rolle für den Erfolg der Ethereum-Governance. Ohne die Möglichkeit eines Forks wäre die Alternative andauernde interne Kämpfe, erzwungene widerwillige Teilnahme für diejenigen, die schließlich Ethereum Classic gründeten, und eine zunehmend abweichende Vision davon gewesen, wie Erfolg für Ethereum aussieht.

<Divider />

## Beacon Chain-Governance {#beacon-chain}

Der Ethereum-Governance-Prozess tauscht oft Geschwindigkeit und Effizienz gegen Offenheit und Inklusivität ein. Um die Entwicklung der Beacon Chain zu beschleunigen, wurde sie getrennt vom Proof-of-Work-Ethereum-Netzwerk gestartet und folgte ihren eigenen Governance-Praktiken.

Während die Spezifikation und die Entwicklungsimplementierungen immer vollständig Open Source waren, wurden die oben beschriebenen formellen Prozesse zum Vorschlagen von Updates nicht verwendet. Dies ermöglichte es Forschern und Implementierern, Änderungen schneller zu spezifizieren und sich darauf zu einigen.

Als die Beacon Chain am 15. September 2022 mit der Ethereum-Ausführungsebene fusionierte, war „The Merge“ als Teil des [Paris-Netzwerk-Upgrades](/ethereum-forks/#paris) abgeschlossen. Der Vorschlag [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) wurde von „Last Call“ auf „Final“ geändert, womit der Übergang zu Proof-of-Stake abgeschlossen war.

<ButtonLink href="/roadmap/merge/">
  Mehr zu The Merge
</ButtonLink>

<Divider />

## Wie kann ich mich einbringen? {#get-involved}

- [Ein EIP vorschlagen](/eips/#participate)
- [Aktuelle Vorschläge diskutieren](https://ethereum-magicians.org/)
- [Sich an F&E-Diskussionen beteiligen](https://ethresear.ch/)
- [Dem Ethereum R&D Discord beitreten](https://discord.gg/mncqtgVSVw)
- [Einen Blockchain-Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/)
- [Zur Client-Entwicklung beitragen](/developers/docs/nodes-and-clients/#execution-clients)
- [Core Developer Apprenticeship Program](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Weiterführende Literatur {#further-reading}

Governance in Ethereum ist nicht starr definiert. Verschiedene Community-Teilnehmer haben unterschiedliche Perspektiven dazu. Hier sind einige davon:

- [Notes on Blockchain Governance](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [How does Ethereum Governance work?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [How Ethereum governance works](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [What is an Ethereum core developer?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Governance, Part 2: Plutocracy Is Still Bad](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Moving beyond coin voting governance](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
- [Understanding Blockchain Governance](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) – _2077 Research_
- [The Ethereum Government](https://www.galaxy.com/insights/research/ethereum-governance/) – _Christine Kim_