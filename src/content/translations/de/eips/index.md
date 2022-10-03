---
title: Ethereum – Vorschläge zur Verbesserung (EIPs)
description: Die grundlegenden Informationen, die Sie benötigen, um das Prinzip der Verbesserungsvorschläge für Ethereum (Ethereum Improvement Proposals (EIPs) zu verstehen
lang: de
---

# Einführung in Ethereum-Verbesserungsvorschläge (EIPs) {#introduction-to-ethereum-improvement-proposals-eips}

## Was sind EIPs? {#what-are-eips}

[Ethereum-Verbesserungsvorschläge (EIPs)](https://eips.ethereum.org/) sind Standards, die potenzielle neue Funktionen oder Prozesse für Ethereum definieren. EIPs enthalten technische Spezifikationen für die vorgeschlagenen Änderungen und dienen als „Quelle der Wahrheit“ für die Gemeinschaft. Netzwerk-Upgrades und Anwendungsstandards für Ethereum werden im Rahmen des EIP-Prozesses diskutiert und entwickelt.

Jeder innerhalb der Ethereum-Community hat die Möglichkeit, einen EIP zu erstellen. Richtlinien zum Schreiben von EIPs sind in [EIP 1](https://eips.ethereum.org/EIPS/eip-1) enthalten. Der EIP sollte eine kompakte technische Spezifikation der Funktion enthalten, die die Grundlage bildet. Der EIP-Autor ist dafür verantwortlich, einen Konsens innerhalb der Community zu finden und abweichende Meinungen zu dokumentieren. Angesichts der hohen technischen Anforderungen für die Einreichung eines gut aufgebauten EIP waren die meisten EIP-Autoren seit jeher Anwendungs- oder Protokollentwickler.

## Warum sind EIPs so wichtig? {#why-do-eips-matter}

EIPs spielen eine zentrale Rolle bei der Entwicklung und werden auf Ethereum dokumentiert. Sie schaffen die Möglichkeit, um Änderungen vorzuschlagen, zu diskutieren und zu übernehmen. Es gibt [verschiedene Arten von EIPs](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), darunter wesentliche EIPs für Protokolländerungen auf unterer Ebene, die den Konsens beeinflussen und ein Netzwerk-Upgrade sowie ERCs für Anwendungsstandards erfordern. Zum Beispiel Standards zum Erstellen von Token, wie [ERC20](https://eips.ethereum.org/EIPS/eip-20) oder [ERC721](https://eips.ethereum.org/EIPS/eip-721), erlauben Anwendungen, die mit diesen Token interagieren, alle Token nach den gleichen Regeln zu behandeln. Das erleichtert die Erstellung interoperabler Anwendungen.

Jedes Netzwerk-Upgrade besteht aus einer Reihe von EIPs, die von jedem [Ethereum-Client](/learn/#clients-and-nodes) im Netzwerk umgesetzt werden müssen. Das impliziert, dass Entwickler für die Erhaltung des Konsens mit anderen Clients im Ethereum-Mainnet sicherstellen müssen, dass sie alle erforderlichen EIPs implementieren.

Neben der Bereitstellung einer technischen Spezifikation für Änderungen sind die EIPs die Einheit, um die die Governance in Ethereum stattfindet: Jeder kann einen EIP vorschlagen. Daraufhin werden verschiedene Stakeholder in der Gemeinschaft diskutieren, um festzustellen, ob der Vorschlag als Standard angenommen oder in ein Netz-Upgrade aufgenommen werden soll. Nicht wesentliche EIPs müssen nicht von allen Anwendungen übernommen werden müssen (Sie können zum Beispiel einen Nicht-[ERC20-Token erstellen](https://eips.ethereum.org/EIPS/eip-20)), wesentliche EIPs hingegen schon (da für alle Knoten ein Upgrade erforderlich ist, um Teil des gleichen Netzwerks zu bleiben). Daher erforderlich wesentliche EIPs einen breiteren Konsens innerhalb der Community als nicht wesentliche EIPs.

## Chronik der EIP {#history-of-eips}

Das [GitHub-Repository zu EIPs (Ethereum -Verbesserungsvorschlägen)](https://github.com/ethereum/EIPs) wurde im Oktober 2015 geschaffen. Der EIP-Prozess basiert auf dem [Bitcoin-Prozess für Verbesserungsvorschläge (BIPs)](https://github.com/bitcoin/bips), der selbst auf dem Prozess [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) aufbaut.

EIP-Autoren werden mit der Überprüfung von EIPs auf technische Stichhaltigkeit, korrekte Rechtschreibung/Grammatik und Codestil beauftragt. Martin Becze, Vitalik Buterin, Gavin Wood und einige andere waren von 2015 bis Ende 2016 die ursprünglichen EIP-Autoren. Die aktuellen EIP-Autoren sind:

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (Community)
- Casey Detrio (EWASM/Ethereum Foundation)
- Matt Garnett (Quilt)
- Hudson James (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (Community)
- Micah Zoltu (Community)

EIP-Autoren entscheiden gemeinsam mit Mitgliedern der Community aus [Ethereum Cat Herders](https://ethereumcatherders.com/) und [Ethereum Magicians](https://ethereum-magicians.org/) über die Implementierung eines EIP, sind verantwortlich für die Vereinfachung von EIPs und sind zudem für die Verschiebung der EIPs in die Phasen „Endgültig“ oder „Rücktritt“ zuständig.

Die vollständige Standardisierung neben einem Diagramm ist in [EIP-1](https://eips.ethereum.org/EIPS/eip-1) beschrieben.

## Weitere Informationen {#learn-more}

Wenn Sie mehr über EIPs erfahren möchten, besuchen Sie die [Website zu EIPs](https://eips.ethereum.org/), auf der Sie weitere Informationen finden können, einschließlich:

- [Die verschiedenen Arten von EIPs](https://eips.ethereum.org/)
- [Eine Liste aller erstellten EIPs](https://eips.ethereum.org/all)
- [EIP-Status und was sie bedeuten](https://eips.ethereum.org/)

## Mitmachen {#participate}

Jeder kann EIP oder ERC erstellen. Allerdings sollten Sie [EIP-1](https://eips.ethereum.org/EIPS/eip-1) lesen, denn darin wird der EIP-Prozess umrissen und erläutert, was EIP und EIP-Typen sind, was das EIP-Dokument enthalten soll, EIP-Format und Vorlage, Liste der EIP-Editoren und alles, was Sie über EIPs wissen müssen, bevor Sie einen erstellen. Ihr neuer EIP sollte ein neues Feature definieren, das nicht wirklich komplex aber nicht für eine sehr kleine Nische gedacht ist und von Projekten im Ethereum-Ökosystem genutzt werden kann. Der schwierigste Teil ist die Vereinfachung. Sie als Autor müssen andere rund um Ihren EIP informieren, Feedback einholen, Artikel verfassen, die Probleme beschreiben, die Ihr EIP löst, und arbeiten mit Projekten zusammenarbeiten, um Ihr EIP zu implementieren.

Wenn Sie daran interessiert sind, die Beiträge zu EIPs zu verfolgen oder Ihre Meinung zu EIPs zu teilen, schauen Sie sich im [Ethereum Magicians-Forum](https://ethereum-magicians.org/) um. Dort werden EIPs mit der Community diskutiert.

Siehe auch:

- [So erstellen Sie einen EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referenzen {#references}

<cite class="citation">

Seiteninhalte zum Teil von [Governance bei der Ethereum-Protokollentwicklung und Koordinierung von Netzwerk-Upgrades](https://hudsonjameson.com/202020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) Hudson Jameson bereitgestellt

</cite>
