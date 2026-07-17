---
title: Verbesserung der Benutzererfahrung
description: "Für die meisten Menschen ist die Nutzung von Ethereum noch zu komplex. Um eine Massenadoption zu fördern, muss Ethereum seine Einstiegshürden drastisch senken – Nutzer müssen die Vorteile eines dezentralen, erlaubnisfreien und zensurresistenten Zugangs zu Ethereum erhalten, aber es muss so reibungslos sein wie die Nutzung einer traditionellen Web2-App."
lang: de
image: /images/roadmap/roadmap-ux.png
alt: Ethereum-Roadmap
template: roadmap
---

**Die Nutzung von Ethereum muss vereinfacht werden**; von der Verwaltung von [Schlüsseln](/glossary/#key) und [Wallets](/glossary/#wallet) bis hin zur Initiierung von Transaktionen. Um die Massenadoption zu erleichtern, muss Ethereum die Benutzerfreundlichkeit drastisch erhöhen, sodass Nutzer einen erlaubnisfreien und zensurresistenten Zugang zu Ethereum mit der reibungslosen Erfahrung der Nutzung von [Web2](/glossary/#web2)-Apps erleben können.

## Jenseits von Seed-Phrasen {#no-more-seed-phrases}

Ethereum-Konten werden durch ein Schlüsselpaar geschützt, das zur Identifizierung von Konten (öffentlicher Schlüssel) und zum Signieren von Nachrichten (privater Schlüssel) verwendet wird. Ein privater Schlüssel ist wie ein Master-Passwort; er ermöglicht den vollständigen Zugriff auf ein Ethereum-Konto. Dies ist eine andere Arbeitsweise für Menschen, die eher mit Banken und Web2-Apps vertraut sind, welche Konten im Namen eines Nutzers verwalten. Damit Ethereum eine Massenadoption erreicht, ohne sich auf zentralisierte Dritte zu verlassen, muss es einen unkomplizierten, reibungslosen Weg für einen Nutzer geben, die Verwahrung seiner Vermögenswerte zu übernehmen und die Kontrolle über seine Daten zu behalten, ohne die Kryptographie mit öffentlichen und privaten Schlüsseln sowie die Schlüsselverwaltung verstehen zu müssen.

Die Lösung dafür ist die Verwendung von [Smart-Contract](/glossary/#smart-contract)-Wallets, um mit Ethereum zu interagieren. Smart-Contract-Wallets schaffen Möglichkeiten, Konten zu schützen, falls die Schlüssel verloren gehen oder gestohlen werden, bieten Chancen für eine bessere Betrugserkennung und -abwehr und ermöglichen es Wallets, neue Funktionen zu erhalten. Obwohl Smart-Contract-Wallets heute bereits existieren, sind sie umständlich zu entwickeln, da das Ethereum-Protokoll sie besser unterstützen muss. Diese zusätzliche Unterstützung ist als Kontoabstraktion bekannt.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Mehr zur Kontoabstraktion</ButtonLink>

## Knoten für alle {#nodes-for-everyone}

Nutzer, die [Knoten](/glossary/#node) betreiben, müssen keinen Dritten vertrauen, um Daten zu erhalten, und sie können schnell, privat und erlaubnisfrei mit der Ethereum-[Blockchain](/glossary/#blockchain) interagieren. Derzeit erfordert der Betrieb eines Knotens jedoch technisches Wissen und erheblichen Speicherplatz, was bedeutet, dass viele Menschen stattdessen Vermittlern vertrauen müssen.

Es gibt mehrere Upgrades, die den Betrieb von Knoten viel einfacher und weitaus weniger ressourcenintensiv machen werden. Die Art und Weise, wie Daten gespeichert werden, wird geändert, um eine platzsparendere Struktur zu verwenden, die als **Verkle-Baum** bekannt ist. Außerdem werden Ethereum-Knoten mit [Zustandslosigkeit](/roadmap/statelessness) oder [Datenablauf](/roadmap/statelessness/#data-expiry) keine Kopie der gesamten Ethereum-Zustandsdaten speichern müssen, was den Bedarf an Festplattenspeicher drastisch reduziert. [Light Nodes](/developers/docs/nodes-and-clients/light-clients/) werden viele Vorteile des Betriebs eines Full Nodes bieten, können aber problemlos auf Mobiltelefonen oder in einfachen Browser-Apps ausgeführt werden.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Lesen Sie über Verkle-Bäume</ButtonLink>

Mit diesen Upgrades werden die Hürden für den Betrieb eines Knotens praktisch auf null reduziert. Nutzer werden von einem sicheren, erlaubnisfreien Zugang zu Ethereum profitieren, ohne spürbar Speicherplatz oder CPU-Leistung auf ihrem Computer oder Mobiltelefon opfern zu müssen, und sie werden bei der Nutzung von Apps nicht auf Dritte für Daten oder den Netzwerkzugang angewiesen sein.

## Aktueller Fortschritt {#current-progress}

Smart-Contract-Wallets sind bereits verfügbar, aber es sind weitere Upgrades erforderlich, um sie so dezentral und erlaubnisfrei wie möglich zu machen. EIP-4337 ist ein ausgereifter Vorschlag, der keine Änderungen am Ethereum-Protokoll erfordert. Der für EIP-4337 erforderliche Haupt-Smart-Contract wurde **im März 2023 bereitgestellt**.

**Die vollständige Zustandslosigkeit befindet sich noch in der Forschungsphase** und ist wahrscheinlich noch einige Jahre von der Implementierung entfernt. Es gibt mehrere Meilensteine auf dem Weg zur vollständigen Zustandslosigkeit, einschließlich des Datenablaufs, die möglicherweise früher implementiert werden. Andere Punkte auf der Roadmap, wie [Verkle-Bäume](/roadmap/verkle-trees/) und die [Proposer-Builder-Trennung (PBS)](/roadmap/pbs/), müssen zuerst abgeschlossen werden.

Verkle-Baum-Testnetze sind bereits in Betrieb, und die nächste Phase ist die Ausführung von Verkle-Baum-fähigen Clients in privaten und anschließend in öffentlichen Testnetzen. Sie können helfen, den Fortschritt zu beschleunigen, indem Sie Contracts in den Testnetzen bereitstellen oder Testnetz-Clients ausführen.
