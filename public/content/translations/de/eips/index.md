---
title: Einführung in Ethereum Improvement Proposals (EIPs)
metaTitle: Ethereum Improvement Proposals (EIPs)
description: Die grundlegenden Informationen, die Sie benötigen, um EIPs zu verstehen
lang: de
---

## Was sind EIPs? {#what-are-eips}

[Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org/) sind Standards, die potenzielle neue Funktionen oder Prozesse für Ethereum spezifizieren. EIPs enthalten technische Spezifikationen für die vorgeschlagenen Änderungen und dienen als „Source of Truth“ für die Community. Netzwerk-Upgrades und Anwendungsstandards für [Ethereum](/) werden durch den EIP-Prozess diskutiert und entwickelt.

Jeder innerhalb der Ethereum-Community hat die Möglichkeit, einen EIP zu erstellen. Richtlinien für das Verfassen von EIPs sind in [EIP-1](https://eips.ethereum.org/EIPS/eip-1) enthalten. Ein EIP sollte in erster Linie eine präzise technische Spezifikation mit einer kurzen Begründung (Motivation) liefern. Der EIP-Autor ist dafür verantwortlich, einen Konsens innerhalb der Community zu erzielen und alternative Meinungen zu dokumentieren. Angesichts der hohen technischen Hürde für die Einreichung eines gut formulierten EIPs sind die meisten EIP-Autoren historisch gesehen typischerweise Anwendungs- oder Protokollentwickler.

## Warum sind EIPs wichtig? {#why-do-eips-matter}

EIPs spielen eine zentrale Rolle dabei, wie Änderungen bei Ethereum stattfinden und dokumentiert werden. Sie sind der Weg für Menschen, Änderungen vorzuschlagen, zu debattieren und zu übernehmen. Es gibt [verschiedene Arten von EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), einschließlich Core-EIPs für Low-Level-Protokolländerungen, die den Konsens beeinflussen und ein Netzwerk-Upgrade wie [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) erfordern, sowie ERCs für Anwendungsstandards wie [EIP-20](https://eips.ethereum.org/EIPS/eip-20) und [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Jedes Netzwerk-Upgrade besteht aus einer Reihe von EIPs, die von jedem [Ethereum-Client](/learn/#clients-and-nodes) im Netzwerk implementiert werden müssen. Das bedeutet, dass Client-Entwickler sicherstellen müssen, dass sie alle erforderlichen EIPs implementiert haben, um im Konsens mit anderen Clients im Ethereum Mainnet zu bleiben.

Neben der Bereitstellung einer technischen Spezifikation für Änderungen sind EIPs die Einheit, um die herum Governance bei Ethereum stattfindet: Es steht jedem frei, einen Vorschlag einzureichen, und dann werden verschiedene Stakeholder in der Community debattieren, um zu bestimmen, ob er als Standard übernommen oder in ein Netzwerk-Upgrade aufgenommen werden soll. Da Non-Core-EIPs nicht von allen Anwendungen übernommen werden müssen (es ist beispielsweise möglich, einen fungiblen Token zu erstellen, der EIP-20 nicht implementiert), Core-EIPs jedoch weithin übernommen werden müssen (da alle Knoten aktualisiert werden müssen, um Teil desselben Netzwerks zu bleiben), erfordern Core-EIPs einen breiteren Konsens innerhalb der Community als Non-Core-EIPs.

## Geschichte der EIPs {#history-of-eips}

Das [GitHub-Repository für Ethereum Improvement Proposals (EIPs)](https://github.com/ethereum/EIPs) wurde im Oktober 2015 erstellt. Der EIP-Prozess basiert auf dem Prozess der [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips), der wiederum auf dem Prozess der [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) basiert.

EIP-Editoren haben die Aufgabe, EIPs auf technische Stichhaltigkeit und Formatierungsprobleme zu überprüfen sowie Rechtschreibung, Grammatik und Code-Stil zu korrigieren. Martin Becze, Vitalik Buterin, Gavin Wood und einige andere waren die ursprünglichen EIP-Editoren von 2015 bis Ende 2016.

Die aktuellen EIP-Editoren sind:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Ehemalige (Emeritus) EIP-Editoren sind:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Wenn Sie ein EIP-Editor werden möchten, lesen Sie bitte [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

EIP-Editoren entscheiden, wann ein Vorschlag bereit ist, ein EIP zu werden, und helfen EIP-Autoren, ihre Vorschläge voranzutreiben. Die [Ethereum Cat Herders](https://www.ethereumcatherders.com/) helfen bei der Organisation von Treffen zwischen den EIP-Editoren und der Community (siehe [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Der vollständige Standardisierungsprozess zusammen mit einem Diagramm wird in [EIP-1](https://eips.ethereum.org/EIPS/eip-1) beschrieben.

## Weiterführende Informationen {#learn-more}

Wenn Sie mehr über EIPs lesen möchten, besuchen Sie die [EIPs-Website](https://eips.ethereum.org/) und [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Hier sind einige nützliche Links:

- [Eine Liste aller Ethereum Improvement Proposals](https://eips.ethereum.org/all)
- [Eine Beschreibung aller EIP-Typen](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Eine Beschreibung aller EIP-Status](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Community-Bildungsprojekte {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP ist eine lehrreiche Videoserie, die Ethereum Improvement Proposals (EIPs) und wichtige Funktionen kommender Upgrades diskutiert.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf bietet zusätzliche Informationen zu Ethereum Improvement Proposals (EIPs), einschließlich ihres Status, Implementierungsdetails, zugehöriger Pull-Requests und Community-Feedback.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun bietet die neuesten Nachrichten zu Ethereum Improvement Proposals (EIPs), Updates zu EIP-Meetings und mehr.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight ist eine Darstellung des Zustands des Ethereum Improvement Proposals (EIPs)-Prozesses und von Statistiken gemäß Informationen, die aus verschiedenen Ressourcen gesammelt wurden.*

## Mitmachen {#participate}

Jeder kann einen EIP erstellen. Bevor man einen Vorschlag einreicht, muss man [EIP-1](https://eips.ethereum.org/EIPS/eip-1) lesen, das den EIP-Prozess und das Verfassen eines EIPs umreißt, und Feedback bei den [Ethereum Magicians](https://ethereum-magicians.org/) einholen, wo Vorschläge zunächst mit der Community diskutiert werden, bevor ein Entwurf eingereicht wird.

## Referenzen {#references}

<cite class="citation">

Der Seiteninhalt stammt teilweise aus [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) von Hudson Jameson.

</cite>