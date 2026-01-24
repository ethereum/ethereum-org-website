---
title: Ethereum – Vorschläge zur Verbesserung (EIPs)
description: Grundlegende Informationen, die Sie benötigen, um EIPs zu verstehen
lang: de
---

# Einführung in Ethereum Verbesserungsvorschläge (EIPs) {#introduction-to-ethereum-improvement-proposals}

## Was sind EIPs? {#what-are-eips}

[Ethereum Verbesserungsvorschläge (EIPs)](https://eips.ethereum.org/) sind Standards, die potenzielle neue Funktionen oder Prozesse für Ethereum spezifizieren. EIPs enthalten technische Spezifikationen für die vorgeschlagenen Änderungen und dienen als „Quelle der Wahrheit“ für die Gemeinschaft. Netzwerk-Upgrades und Anwendungsstandards für Ethereum werden im Rahmen des EIP-Prozesses diskutiert und entwickelt.

Jeder innerhalb der Ethereum-Community hat die Möglichkeit, einen EIP zu erstellen. Richtlinien für das Verfassen von EIPs sind in [EIP-1](https://eips.ethereum.org/EIPS/eip-1) enthalten. Ein EIP sollte in erster Linie eine kompakte technische Spezifikation mit einer geringen Motivation liefern. Der EIP-Autor ist dafür verantwortlich, einen Konsens innerhalb der Community zu finden und abweichende Meinungen zu dokumentieren. Angesichts der hohen technischen Anforderungen für die Einreichung eines gut aufgebauten EIP waren die meisten EIP-Autoren seit jeher Anwendungs- oder Protokollentwickler.

## Warum sind EIPs so wichtig? {#why-do-eips-matter}

EIPs spielen eine zentrale Rolle bei der Entwicklung und werden auf Ethereum dokumentiert. Sie sind das Mittel, um Änderungen vorzuschlagen, zu diskutieren und anzunehmen. Es gibt [verschiedene Arten von EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), einschließlich Core-EIPs für Protokolländerungen auf niedriger Ebene, die den Konsens betreffen und ein Netzwerk-Upgrade wie [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) erfordern, und ERCs für Anwendungsstandards wie [EIP-20](https://eips.ethereum.org/EIPS/eip-20) und [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Jedes Netzwerk-Upgrade besteht aus einer Reihe von EIPs, die von jedem [Ethereum-Client](/learn/#clients-and-nodes) im Netzwerk implementiert werden müssen. Das bedeutet, dass Entwickler für die Erhaltung des Konsens mit anderen Clients im Ethereum-Mainnet sicherstellen müssen, dass sie alle erforderlichen EIPs implementieren.

Neben der Bereitstellung einer technischen Spezifikation für Änderungen sind die EIPs die Einheit, um die die Governance in Ethereum stattfindet: Jeder kann einen EIP vorschlagen. Daraufhin werden verschiedene Stakeholder in der Gemeinschaft diskutieren, um festzustellen, ob der Vorschlag als Standard angenommen oder in ein Netz-Upgrade aufgenommen werden soll. Nicht wesentliche EIPs müssen nicht von allen Anwendungen übernommen werden müssen (Sie können zum Beispiel einen Nicht-ERC20-Token erstellen), wesentliche EIPs hingegen schon (da für alle Nodes ein Upgrade erforderlich ist, um Teil des gleichen Netzwerks zu bleiben). Daher erforderlich wesentliche EIPs einen breiteren Konsens innerhalb der Community als nicht wesentliche EIPs.

## Geschichte der EIPs {#history-of-eips}

Das [GitHub-Repository für Ethereum Improvement Proposals (EIPs)](https://github.com/ethereum/EIPs) wurde im Oktober 2015 erstellt. Der EIP-Prozess basiert auf dem Prozess der [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips), der wiederum auf dem Prozess der [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) basiert.

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

Wenn Sie EIP-Editor werden möchten, sehen Sie sich bitte [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069) an.

EIP-Editoren entscheiden, wann ein Vorschlag bereit ist, ein EIP zu werden, und helfen EIP-Autoren ihre Vorschläge voranzubringen. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) helfen bei der Organisation von Treffen zwischen den EIP-Editoren und der Community (siehe [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Der vollständige Standardisierungsprozess wird zusammen mit einem Diagramm in [EIP-1](https://eips.ethereum.org/EIPS/eip-1) beschrieben.

## Weitere Informationen {#learn-more}

Wenn Sie daran interessiert sind, mehr über EIPs zu lesen, besuchen Sie die [EIPs-Website](https://eips.ethereum.org/) und [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Hier sind einige hilfreiche Links:

- [Eine Liste aller Ethereum Verbesserungsvorschläge](https://eips.ethereum.org/all)
- [Eine Beschreibung aller EIP-Typen](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Eine Beschreibung aller EIP-Status](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Community-Bildungsprojekte {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP ist eine lehrreiche Videoserie, die Ethereum Improvement Proposals (EIPs) und die wichtigsten Funktionen kommender Upgrades bespricht._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf bietet zusätzliche Informationen für Ethereum Improvement Proposals (EIPs), einschließlich ihres Status, Implementierungsdetails, zugehöriger Pull-Requests und Community-Feedback._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun liefert die neuesten Nachrichten über Ethereum Improvement Proposals (EIPs), Updates zu EIP-Meetings und mehr._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight ist eine Darstellung des Status des Prozesses und der Statistiken der Ethereum Improvement Proposals (EIPs), basierend auf Informationen aus verschiedenen Quellen._

## Mitmachen {#participate}

Jeder kann ein EIP erstellen. Bevor man einen Vorschlag einreicht, muss man [EIP-1](https://eips.ethereum.org/EIPS/eip-1) lesen, das den EIP-Prozess und das Verfassen eines EIP beschreibt, und auf [Ethereum Magicians](https://ethereum-magicians.org/) Feedback einholen, wo Vorschläge zuerst mit der Community diskutiert werden, bevor ein Entwurf eingereicht wird.

## Referenzen {#references}

<cite class="citation">

Der Seiteninhalt stammt teilweise aus [Governance der Ethereum-Protokollentwicklung und Koordination von Netzwerk-Upgrades](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) von Hudson Jameson.

</cite>
