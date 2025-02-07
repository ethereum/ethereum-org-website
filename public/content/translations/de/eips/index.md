---
title: Ethereum – Vorschläge zur Verbesserung (EIPs)
description: Grundlegende Informationen, die Sie benötigen, um EIPs zu verstehen
lang: de
---

# Einführung in Ethereum-Verbesserungsvorschläge (EIPs) {#introduction-to-ethereum-improvement-proposals}

## Was sind EIPs? {#what-are-eips}

[Ethereum-Verbesserungsvorschläge (EIPs)](https://eips.ethereum.org/) sind Standards, die potenzielle neue Funktionen oder Prozesse für Ethereum definieren. EIPs enthalten technische Spezifikationen für die vorgeschlagenen Änderungen und dienen als „Quelle der Wahrheit“ für die Gemeinschaft. Netzwerk-Upgrades und Anwendungsstandards für Ethereum werden im Rahmen des EIP-Prozesses diskutiert und entwickelt.

Jeder innerhalb der Ethereum-Community hat die Möglichkeit, einen EIP zu erstellen. Richtlinien zum Schreiben von EIPs sind in [EIP 1](https://eips.ethereum.org/EIPS/eip-1) enthalten. Ein EIP sollte in erster Linie eine kompakte technische Spezifikation mit einer geringen Motivation liefern. Der EIP-Autor ist dafür verantwortlich, einen Konsens innerhalb der Community zu finden und abweichende Meinungen zu dokumentieren. Angesichts der hohen technischen Anforderungen für die Einreichung eines gut aufgebauten EIP waren die meisten EIP-Autoren seit jeher Anwendungs- oder Protokollentwickler.

## Warum sind EIPs so wichtig? {#why-do-eips-matter}

EIPs spielen eine zentrale Rolle bei der Entwicklung und werden auf Ethereum dokumentiert. Sie schaffen die Möglichkeit, um Änderungen vorzuschlagen, zu diskutieren und zu übernehmen. Es gibt [verschiedene Arten von EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), darunter Kern-EIPs für Protokolländerungen auf unterer Protokollebene, die den Konsens beeinflussen und ein Netzwerk-Upgrade erfordern wie [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), sowie ERCs für Anwendungsstandards wie [EIP-20](https://eips.ethereum.org/EIPS/eip-20) und [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Jedes Netzwerk-Upgrade besteht aus einer Reihe von EIPs, die von jedem [Ethereum-Client](/learn/#clients-and-nodes) im Netzwerk umgesetzt werden müssen. Das bedeutet, dass Entwickler für die Erhaltung des Konsens mit anderen Clients im Ethereum-Mainnet sicherstellen müssen, dass sie alle erforderlichen EIPs implementieren.

Neben der Bereitstellung einer technischen Spezifikation für Änderungen sind die EIPs die Einheit, um die die Governance in Ethereum stattfindet: Jeder kann einen EIP vorschlagen. Daraufhin werden verschiedene Stakeholder in der Gemeinschaft diskutieren, um festzustellen, ob der Vorschlag als Standard angenommen oder in ein Netz-Upgrade aufgenommen werden soll. Nicht wesentliche EIPs müssen nicht von allen Anwendungen übernommen werden müssen (Sie können zum Beispiel einen Nicht-ERC20-Token erstellen), wesentliche EIPs hingegen schon (da für alle Nodes ein Upgrade erforderlich ist, um Teil des gleichen Netzwerks zu bleiben). Daher erforderlich wesentliche EIPs einen breiteren Konsens innerhalb der Community als nicht wesentliche EIPs.

## Chronik der EIP {#history-of-eips}

Das [GitHub-Repository zu EIPs (Ethereum -Verbesserungsvorschlägen)](https://github.com/ethereum/EIPs) wurde im Oktober 2015 geschaffen. Der EIP-Prozess basiert auf dem [Bitcoin-Prozess für Verbesserungsvorschläge (BIPs)](https://github.com/bitcoin/bips), der selbst auf dem Prozess [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) aufbaut.

EIP-Autoren werden mit der Überprüfung von EIPs auf technische Stichhaltigkeit, korrekte Rechtschreibung/Grammatik und Codestil beauftragt. Martin Becze, Vitalik Buterin, Gavin Wood und einige andere waren von 2015 bis Ende 2016 die ursprünglichen EIP-Autoren.

Die aktuellen EIP-Autoren sind

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emeritus EIP-Editoren sind

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Wenn Sie ein EIP-Editor werden möchten, schauen Sie sich bitte [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069) an.

EIP-Editoren entscheiden, wann ein Vorschlag bereit ist, ein EIP zu werden, und helfen EIP-Autoren ihre Vorschläge voranzubringen. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) hilft bei der Organisation von Meetings zwischen den EIP-Editoren und der Community (siehe [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Die vollständige Standardisierung neben einem Diagramm ist in [EIP-1](https://eips.ethereum.org/EIPS/eip-1) beschrieben.

## Weitere Informationen {#learn-more}

Wenn Sie mehr über EIPs erfahren möchten, besuchen Sie die [EIPs Website](https://eips.ethereum.org/) und [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Hier sind einige hilfreiche Links:

- [Eine Liste aller Ethereum Improvement Proposals](https://eips.ethereum.org/all)
- [Eine Beschreibung aller EIP-Typen](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Eine Beschreibung aller EIP-Zustände](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Schulungsprojekte für die Community {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) - *PEEPanEIP ist eine Videoreihe zu Schulungszwecken, in der Ethereum Improvement Proposals (EIPs, „Vorschläge zur Verbesserung von Ethereum“) und die wichtigsten Funktionen der kommenden Upgrades besprochen werden.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) - *EIPs For Nerds bietet umfassende Übersichten über verschiedene Ethereum Improvement Proposals (EIPs), die im ELI5-Stil („Explain Like I‘m 5“, also „Erklär es mir, als wäre ich 5 Jahre alt“) gehalten sind. Dazu gehören die wichtigsten EIPs und EIPs zur Anwendungs-/Infrastruktur-Layer (ERCs). Ziel ist es, die Leser zu informieren und einen Konsens über vorgeschlagene Änderungen am Ethereum-Protokoll zu schaffen.*
- [EIPs.wtf](https://www.eips.wtf/) - *EIPs.wtf bietet zusätzliche Informationen zu Ethereum Improvement Proposals (EIPs), einschließlich deren Status, Implementierungsdetails, zugehörige Pull-Requests und Community-Feedback.*
- [EIP.Fun](https://eipfun.substack.com/) - *EIP.Fun liefert die neuesten Nachrichten zu Ethereum Improvement Proposals (EIPs), Updates zu EIP-Meetings und mehr.*
- [EIPs Insight](https://eipsinsight.com/) - *EIPs Insight zeigt Darstellungen über den Stand von Prozessen und Statistiken zu Ethereum Improvement Proposals (EIPs), die aus verschiedenen Quellen stammen.*

## Mitmachen {#participate}

Jeder kann ein EIP erstellen. Bevor man einen Vorschlag einreicht, muss man [EIP-1](https://eips.ethereum.org/EIPS/eip-1) lesen, die den EIP-Prozess und das Schreiben eines EIP erklärt und bitten Sie um Feedback zu [Ethereum Magier](https://ethereum-magicians.org/), wo Vorschläge zuerst mit der Community diskutiert werden, bevor ein Entwurf eingereicht wird.

## Referenzen {#references}

<cite class="citation">

Seiteninhalte zum Teil von [Governance bei der Ethereum-Protokollentwicklung und Koordinierung von Netzwerk-Upgrades](https://hudsonjameson.com/202020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) Hudson Jameson bereitgestellt

</cite>
