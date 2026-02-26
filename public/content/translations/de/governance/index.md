---
title: Ethereum-Governance
description: "Eine Einführung in die Entscheidungsfindung bei Ethereum"
lang: de
---

# Einführung in die Ethereum-Governance {#introduction}

_Wenn Ethereum keinen Eigentümer hat, wie werden dann Entscheidungen über frühere und zukünftige Änderungen an Ethereum getroffen? Mit Ethereum-Governance wird der Prozess bezeichnet, der solche Entscheidungen ermöglicht._

<Divider />

## Was ist Governance? {#what-is-governance}

Governance, also die Steuerung, erfolgt über die Systeme, die etabliert wurden, damit Entscheidungen getroffen werden können. In einer herkömmlichen Organisationsstruktur haben Führungskräfte und ein Leitungsgremium das letzte Wort bei der Entscheidungsfindung. Eine Möglichkeit ist auch, dass Aktionäre über Vorschläge zu Veränderungen abstimmen. In einem politischen System können gewählte Vertreter Gesetze erlassen, unter Berücksichtigung der Wünsche ihrer Wählerschaft.

## Dezentrale Governance {#decentralized-governance}

Niemand besitzt oder kontrolliert das Ethereum-Protokoll. Dennoch müssen Entscheidungen über die Umsetzung von Änderungen getroffen werden, um die Beständigkeit und den Erfolg des Netzwerks optimal zu gewährleisten. Wegen der fehlenden Besitzverhältnisse ist eine herkömmliche Form der Organisationsführung ungeeignet.

## Ethereum-Governance {#ethereum-governance}

Ethereum-Governance ist der Prozess, über den Protokolländerungen vorgenommen werden. Wichtig ist, zu betonen, dass dieser Prozess nicht damit zusammenhängt, wie Menschen und Anwendungen das Protokoll benutzen. Bei Ethereum gibt es keine Berechtigungen. Jeder von überall auf der Welt kann an Organ-Aktivitäten teilnehmen. Es gibt keine Regeln dafür, wer eine Anwendung erstellen oder eine Transaktion senden kann oder auch nicht. Allerdings gibt es einen Prozess, um Änderungen am Kernprotokoll vorzuschlagen, auf dem diese Anwendungen laufen. Da so viele Menschen abhängig von Ethereums Stabilität sind, gibt es einen sehr hohen Koordinationsschwellenwert für wesentliche Änderungen, einschließlich sozialer und technischer Prozesse. So ist sichergestellt, dass alle Veränderungen an Ethereum sicher sind und von der Community weiterhin unterstützt werden.

### On-Chain- vs. Off-Chain-Governance {#onchain-vs-offchain}

Die Blockchain-Technologie ermöglicht neue Governance-Funktionen, die als Ungarn-Governance bezeichnet werden. Ungarn-Governance bedeutet, dass vorgeschlagene Protokolländerungen durch eine Abstimmung der Stakeholder, in der Regel durch Inhaber eines Governance-Tokens, beschlossen werden und die Abstimmung auf der Blockchain stattfindet. Bei einigen Formen der On-Chain-Governance sind die vorgeschlagenen Protokolländerungen bereits in Code geschrieben und werden automatisch implementiert, wenn die Stakeholder die Änderungen durch Unterzeichnung einer Transaktion genehmigen.

Der gegenteilige Ansatz, die Off-Rhein-Governance, besteht darin, dass alle Entscheidungen über Protokolländerungen im Rahmen eines informellen Prozesses der sozialen Diskussion getroffen werden, die, wenn sie genehmigt werden, in Code umgesetzt werden.

**Die Ethereum-Governance findet off-chain statt**, und eine Vielzahl von Interessengruppen ist am Prozess beteiligt.

_Während die Governance von Ethereum auf Protokollebene außerhalb der Blockchain stattfindet, nutzen viele auf Ethereum aufbauende Anwendungsfälle, wie beispielsweise DAOs, die Governance innerhalb der Blockchain._

<ButtonLink href="/dao/">
  Mehr über DAOs
</ButtonLink>

<Divider />

## Wer sind die Beteiligten? {#who-is-involved}

Es gibt verschiedene Interessengruppen in der [Ethereum-Community](/community/), die alle eine Rolle im Governance-Prozess spielen. Angefangen bei den Beteiligten, die am weitesten vom Protokoll entfernt sind, gibt es:

- **Ether-Inhaber**: Diese Personen halten eine beliebige Menge an ETH. [Mehr über ETH](/what-is-ether/).
- **Anwendungsnutzer**: Diese Personen interagieren mit Anwendungen auf der Ethereum-Blockchain.
- **Anwendungs-/Tooling-Entwickler**: Dies sind Personen, die Anwendungen schreiben, die auf der Ethereum-Blockchain laufen (z. B. DeFi, NFTs usw.), oder die Tooling entwickeln, um mit Ethereum zu interagieren (z. B. Wallets, Test-Suiten usw.). [Mehr über Dapps](/apps/).
- **Node-Betreiber**: Diese Personen betreiben Nodes, die Blöcke und Transaktionen weiterleiten und alle ungültigen Transaktionen oder Blöcke, auf die sie stoßen, zurückweisen. [Mehr über Nodes](/developers/docs/nodes-and-clients/).
- **EIP-Autoren**: Diese Personen schlagen Änderungen am Ethereum-Protokoll in Form von Ethereum Improvement Proposals (EIPs) vor. [Mehr über EIPs](/eips/).
- **Validatoren**: Diese Personen betreiben Nodes, die neue Blöcke zur Ethereum-Blockchain hinzufügen können.
- **Protokollentwickler** (auch bekannt als „Core-Entwickler“): Diese Personen pflegen die verschiedenen Ethereum-Implementierungen (z. B. go-ethereum, Nethermind, Besu, Erigon, Reth auf der Ausführungsebene oder Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine auf der Konsensebene). [Mehr über Ethereum-Clients](/developers/docs/nodes-and-clients/).

_Hinweis: Jede Person kann Teil mehrerer dieser Gruppen sein (z. B. kann ein Protokollentwickler einen EIP verfechten, einen Beacon-Chain-Validator betreiben und DeFi-Anwendungen nutzen). Doch um das Konzept wirklich zu verstehen, sollte zwischen den einzelnen Gruppen unterschieden werden._

<Divider />

## Was ist ein EIP? {#what-is-an-eip}

Ein wichtiger Prozess in der Ethereum-Governance ist das Vorschlagen von **Ethereum Improvement Proposals (EIPs)**. EIPs sind Standards, über die potenzielle neue Funktionen oder Prozesse für Ethereum spezifiziert werden. Alle Personen in der Ethereum-Community haben die Möglichkeit, einen EIP zu erstellen. Wenn Sie daran interessiert sind, eine EIP zu verfassen oder an Peer-Reviews und/oder Governance teilzunehmen, lesen Sie bitte weiter:

<ButtonLink href="/eips/">
  Mehr über EIPs
</ButtonLink>

<Divider />

## Der formale Prozess {#formal-process}

Der formale Prozess für die Einführung von Änderungen am Ethereum-Protokoll gestaltet sich wie folgt:

1. **Einen Core EIP vorschlagen**: Wie in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) beschrieben, ist der erste Schritt, um eine Änderung an Ethereum formell vorzuschlagen, diese in einem Core EIP zu detaillieren. Diese Beschreibung fungiert als offizielle Spezifikation für einen EIP, den die Protokollentwickler implementieren, nachdem er akzeptiert wurde.

2. **Stellen Sie Ihren EIP den Protokollentwicklern vor**: Sobald Sie einen Core EIP haben, für den Sie Community-Feedback gesammelt haben, sollten Sie ihn den Protokollentwicklern vorstellen. Dies können Sie tun, indem Sie ihn in einem [AllCoreDevs-Call](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status) zur Diskussion vorschlagen. Wahrscheinlich haben bereits einige Diskussionen asynchron im [Ethereum Magician's Forum](https://ethereum-magicians.org/) oder im [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw) stattgefunden.

> Mögliche Ergebnisse dieser Phase:

> - Der EIP wird für ein zukünftiges Netzwerkupgrade in Betracht gezogen
> - Technische Änderungen werden angefordert
> - Der Vorschlag kann abgelehnt werden, wenn er keine Priorität hat oder die Verbesserung nicht im Verhältnis zum Entwicklungsaufwand steht

3. **Iteration zu einem endgültigen Vorschlag:** Nachdem Sie Feedback von allen relevanten Interessengruppen erhalten haben, müssen Sie wahrscheinlich Änderungen an Ihrem ursprünglichen Vorschlag vornehmen, um seine Sicherheit zu verbessern oder die Bedürfnisse verschiedener Nutzer besser zu erfüllen. Sobald Sie für den EIP alle Änderungen übernommen haben, die Sie für erforderlich halten, müssen Sie ihn erneut den Protokollentwicklern präsentieren. Nun gehen Sie in die nächste Phase des Prozesses über, sofern nicht neue Bedenken auftauchen, die eine weitere Wiederholungsrunde für Ihren Vorschlag erforderlich machen.

4. **EIP in Netzwerk-Upgrade aufgenommen**: Angenommen, der EIP wird genehmigt, getestet und implementiert, wird er als Teil eines Netzwerk-Upgrades eingeplant. In Anbetracht der hohen Koordinierungskosten für Netzwerk-Upgrades (alle Beteiligten müssen gleichzeitig das Upgrade durchführen), werden EIPs meist in Upgrades gebündelt.

5. **Netzwerk-Upgrade aktiviert**: Nachdem das Netzwerk-Upgrade aktiviert wurde, wird der EIP im Ethereum-Netzwerk live geschaltet. _Hinweis: Netzwerk-Upgrades werden in der Regel in Testnetzen aktiviert, bevor die Aktivierung im Ethereum-Hauptnetz erfolgt._

Dieser Ablauf ist zwar sehr vereinfacht, gibt aber einen Überblick über die wichtigsten Schritte bis zur Aktivierung einer Protokolländerung auf Ethereum. Betrachten wir nun die informellen Aspekte dieses Prozesses.

## Der informelle Prozess {#informal-process}

### Bestehende Arbeit verstehen {#prior-work}

Vorreiter im Bereich EIP, sogenannte EIP-Champions, sollten sich mit bereits erfolgter Arbeit und Vorschlägen vertraut machen, bevor sie einen EIP erstellen, der ernsthaft für die Bereitstellung im Ethereum-Hauptnetz in Betracht gezogen werden kann. Damit kann ein EIP hoffentlich zu einer Neuerung führen, die nicht schon einmal abgelehnt wurde. Die drei Hauptanlaufstellen für die Recherche hierzu sind das [EIP-Repository](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) und [ethresear.ch](https://ethresear.ch/).

### Arbeitsgruppen {#working-groups}

Es ist unwahrscheinlich, dass der erste Entwurf eines EIP ohne Änderungen in das Ethereum-Hauptnetz implementiert wird. Für gewöhnlich arbeiten EIP-Champions mit einer Untergruppe von Protokollentwicklern zusammen, um ihren Vorschlag zu spezifizieren, zu implementieren, zu testen, zu wiederholen und fertigzustellen. In der Vergangenheit benötigten diese Arbeitsgruppen mehrere Monate (und manchmal Jahre!) an Arbeit. EIP-Champions sollten bei solchen Änderungen auch frühzeitig die entsprechenden Anwendungs-/Tool-Entwickler in ihre Bemühungen einbeziehen, um das Feedback der Endbenutzer einzuholen und etwaige Einführungsrisiken zu mindern.

### Community-Konsens {#community-consensus}

Einige EIPs sind einfache technische Verbesserungen mit wenigen Nuancen, während andere komplexer und mit Kompromissen verbunden sind, die unterschiedliche Interessengruppen auf unterschiedliche Weise beeinflussen werden. Das bedeutet, dass einige EIPs innerhalb der Gemeinschaft umstrittener sind als andere.

Es gibt keinen klaren Leitfaden für den Umgang mit strittigen Vorschlägen. Dies ist ein Ergebnis des dezentralen Designs von Ethereum, bei dem keine einzelne Interessentenvertreter-Gruppe andere zu etwas zwingen kann: Protokollentwickler können sich entscheiden, keine Änderungen des Codes zu implementieren; Nodebetreiber können wählen, den aktuellsten Ethereum-Client nicht zu betreiben; Anwendungsteams und Benutzer können sich entscheiden, nicht auf der Blockchain zu handeln. Da die Entwickler von Protokollen keine Möglichkeit haben, andere zur Annahme von Netzwerk-Upgrades zu zwingen, vermeiden sie für gewöhnlich die Implementierung von EIPs, bei denen die strittigen Punkte die Vorteile für die breitere Community überwiegen.

Von EIP-Champions wird erwartet, dass sie Feedback von allen relevanten Interessengruppen einholen. Wenn Sie sich als Verfechter eines umstrittenen EIP sehen, sollten Sie versuchen, auf Einwände einzugehen, um einen Konsens für Ihren EIP zu finden. Angesichts der Größe und Vielfalt der Ethereum-Community gibt es keine einzelne Metrik (z. B. eine Coin-Abstimmung), mit der der Community-Konsens gemessen werden kann, und von EIP-Champions wird erwartet, dass sie sich an die Gegebenheiten ihres Vorschlags anpassen.

Abgesehen von der Sicherheit des Ethereum-Netzwerks haben die Protokollentwickler in der Vergangenheit großen Wert darauf gelegt, was die Entwickler von Anwendungen/Tools und die Anwendungsnutzer zu schätzen wissen, da ihre Verwendung und Entwicklung auf Grundlage von Ethereum das Ökosystem für andere Interessengruppen attraktiv macht. Zudem müssen EIPs in allen Kundenimplementierungen umgesetzt werden, die von verschiedenen Teams verwaltet werden. Teil des Prozesses ist es meist, mehrere Teams von Protokollentwicklern davon zu überzeugen, dass eine bestimmte Änderung sinnvoll ist und den Endbenutzern hilft oder ein Sicherheitsproblem behebt.

<Divider />

## Umgang mit Meinungsverschiedenheiten {#disagreements}

Angesichts der vielen Interessengruppen mit unterschiedlichen Motivationen und Überzeugungen sind Meinungsverschiedenheiten keine Seltenheit.

In der Regel werden Meinungsverschiedenheiten durch lange Diskussionen in öffentlichen Foren geklärt, um die Ursache des Problems zu verstehen und jedem die Möglichkeit zu geben, sich einzubringen. Meist gibt eine Gruppe nach oder es wird ein Kompromiss gefunden. Wenn eine Gruppe sich stark genug fühlt, eine bestimmte Änderung durchzusetzen, könnte das zu einer Kettenspaltung führen. Eine Kettenspaltung liegt vor, wenn einige Beteiligte gegen die Umsetzung einer Protokolländerung protestieren. Das führt dann dazu, dass unterschiedliche, inkompatible Versionen des Protokolls in Betrieb sind, aus denen zwei verschiedene Blockchains hervorgehen.

### Der DAO-Fork {#dao-fork}

Von einem Fork spricht man, wenn größere technische Upgrades oder Änderungen am Netzwerk vorgenommen werden müssen und sich die „Regeln“ des Protokolls ändern. [Ethereum Anwendungen](/developers/docs/nodes-and-clients/) müssen die Software aktualisieren um neue Regeln zu implementieren.

Der DAO-Fork war eine Reaktion auf den [DAO-Angriff von 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), bei dem einem unsicheren [DAO](/glossary/#dao)-Vertrag bei einem Hack über 3,6 Millionen ETH entwendet wurden. Durch den Fork wurden die Gelder aus dem fehlerhaften Vertrag in einen neuen Vertrag übertragen, so dass jeder, der durch den Hack Geld verloren hatte, dieses zurückerhalten konnte.

Über diese Vorgehensweise wurde seitens der Ethereum-Community abgestimmt. Jeder ETH-Inhaber konnte über eine Transaktion auf [einer Abstimmungsplattform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) abstimmen. Die Entscheidung für die Fork erhielt mehr als 85 % der Stimmen.

Es ist wichtig anzumerken, dass sich das Protokoll zwar geteilt hat, um den Hack rückgängig zu machen, doch die Gesamtwirkungskraft der Entscheidung, sich zu teilen, ist aus mehreren Gründen fragwürdig:

- Die Wahlbeteiligung war erstaunlich niedrig
- Die meisten Menschen wussten nicht, dass die Abstimmung stattfand
- Bei der Abstimmung waren nur ETH-Besitzer vertreten und nicht die anderen Teilnehmer des Systems

Ein Teil der Community verweigerte die Abspaltung, insbesondere da sie der Meinung waren, dass der DAO-Vorfall nicht auf einen Fehler im Protokoll zurückzuführen war. Sie gründeten daraufhin [Ethereum Classic](https://ethereumclassic.org/).

Heute hat die Ethereum-Community eine Politik der Nichteinmischung in Fällen von Vertragsfehlern oder verlorenen Geldern beschlossen, um die Neutralität des Systems glaubwürdig zu wahren.

Mehr zum DAO-Hack:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Der Nutzen von Forks {#forking-utility}

Der Ethereum-/Ethereum Classic-Fork ist ein hervorragendes Beispiel für einen gesunden Fork. Es gab zwei Gruppen, die in einigen zentralen Werten so stark voneinander abwichen, dass sie die Risiken in Kauf nahmen, die damit verbunden waren, dass jede Gruppe ihre eigene Vorgehensweise weiterverfolgte.

Die Möglichkeit, sich angesichts erheblicher politischer, philosophischer oder wirtschaftlicher Differenzen zu teilen, spielt eine große Rolle für den Erfolg der Ethereum-Governance. Ohne die Möglichkeit einer Abspaltung wäre die Alternative ein ständiger Streit, eine erzwungene zögerliche Beteiligung derjenigen, die schließlich Ethereum Classic gründeten, und eine zunehmend abweichende Vorstellung davon, wie der Erfolg von Ethereum aussieht.

<Divider />

## Beacon-Chain-Governance {#beacon-chain}

Beim Ethereum-Governance-Prozess geht es oft darum, Geschwindigkeit und Effizienz gegenüber Offenheit und Inklusivität abzuwägen. Um die Entwicklung der Beacon Chain zu beschleunigen, wurde sie getrennt vom Proof-of-Work-Ethereum -Netzwerk veröffentlicht. Sie folgt ihren eigenen Governance-Praktiken.

Während die Entwicklung der Spezifikation und Implementierungen immer vollständig quelloffen erfolgte, wurden die oben beschriebenen formalen Verfahren um Aktualisierungen vorzuschlagen nicht angewandt. So konnten Veränderungen schneller spezifiziert werden und die Experten und Implementatoren kamen schneller zu einer Einigung.

Als die Beacon Chain am 15. September 2022 mit der Ethereum-Ausführungsebene fusionierte, wurde The Merge als Teil des [Paris-Netzwerk-Upgrades](/ethereum-forks/#paris) abgeschlossen. Der Vorschlag [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) wurde von „Last Call“ zu „Final“ geändert, wodurch der Übergang zu Proof-of-Stake abgeschlossen wurde.

<ButtonLink href="/roadmap/merge/">
  Mehr über die Zusammenführung
</ButtonLink>

<Divider />

## Wie kann ich mich einbringen? Beteiligen Sie sich {#get-involved}

- [Einen EIP vorschlagen](/eips/#participate)
- [Aktuelle Vorschläge diskutieren](https://ethereum-magicians.org/)
- [An F&E-Diskussionen teilnehmen](https://ethresear.ch/)
- [Dem Ethereum F&E-Discord beitreten](https://discord.gg/mncqtgVSVw)
- [Einen Node betreiben](/developers/docs/nodes-and-clients/run-a-node/)
- [Zur Client-Entwicklung beitragen](/developers/docs/nodes-and-clients/#execution-clients)
- [Core Developer Apprenticeship Program](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Weiterführende Lektüre {#further-reading}

Governance in Ethereum ist nicht starr definiert. Verschiedene Teilnehmer der Community haben unterschiedliche Ansichten dazu. Hier sind einige von ihnen:

- [Notes on Blockchain Governance](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [How does Ethereum Governance work?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [How Ethereum governance works](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [What is an Ethereum core developer?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Governance, Part 2: Plutocracy Is Still Bad](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Moving beyond coin voting governance](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
- [Understanding Blockchain Governance](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) – _2077 Research_
- [The Ethereum Government](https://www.galaxy.com/insights/research/ethereum-governance/) – _Christine Kim_
