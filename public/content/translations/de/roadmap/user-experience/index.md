---
title: Verbesserung der Benutzererfahrung
description: "Für die meisten Menschen ist die Nutzung von Ethereum immer noch zu komplex. Um eine Massenadoption zu fördern, muss Ethereum seine Einstiegshürden drastisch senken – Benutzer müssen die Vorteile eines dezentralisierten, erlaubnisfreien und zensurresistenten Zugangs zu Ethereum erhalten, aber es muss so reibungslos sein wie die Nutzung einer traditionellen Web2-App."
lang: de
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum-Roadmap"
template: roadmap
---

**Die Nutzung von Ethereum muss vereinfacht werden**; von der Verwaltung von [Schlüsseln](/glossary/#key) und [Wallets](/glossary/#wallet) bis hin zur Initiierung von Transaktionen. Um die Massenadoption zu erleichtern, muss Ethereum die Benutzerfreundlichkeit drastisch erhöhen, sodass Benutzer einen erlaubnisfreien und zensurresistenten Zugang zu Ethereum mit der reibungslosen Erfahrung der Nutzung von [Web2](/glossary/#web2)-Apps erleben können.

## Jenseits von Seed-Phrasen {#no-more-seed-phrases}

Ethereum-Konten werden durch ein Schlüsselpaar geschützt, das zur Identifizierung von Konten (Public-Key) und zum Signieren von Nachrichten (Private-Key) verwendet wird. Ein Private-Key ist wie ein Master-Passwort; er ermöglicht den vollständigen Zugriff auf ein Ethereum-Konto. Dies ist eine andere Arbeitsweise für Menschen, die eher mit Banken und Web2-Apps vertraut sind, welche Konten im Namen eines Benutzers verwalten. Damit Ethereum eine Massenadoption erreicht, ohne sich auf zentralisierte Dritte zu verlassen, muss es einen unkomplizierten, reibungslosen Weg für einen Benutzer geben, die Verwahrung seiner Vermögenswerte zu übernehmen und die Kontrolle über seine Daten zu behalten, ohne Public-Key- und Private-Key-Kryptografie sowie Schlüsselverwaltung verstehen zu müssen.

Die Lösung hierfür ist die Verwendung von [Smart Contract](/glossary/#smart-contract)-Wallets zur Interaktion mit Ethereum. Smart Contract-Wallets schaffen Möglichkeiten, Konten zu schützen, falls die Schlüssel verloren gehen oder gestohlen werden, bieten Gelegenheiten für eine bessere Betrugserkennung und -abwehr und ermöglichen es Wallets, neue Funktionen zu erhalten. Obwohl Smart Contract-Wallets heute bereits existieren, sind sie umständlich zu entwickeln, da das Ethereum-Protokoll sie besser unterstützen muss. Diese zusätzliche Unterstützung ist als Kontoabstraktion (Account Abstraction) bekannt.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Mehr zur Kontoabstraktion</ButtonLink>

## Blockchain-Knoten für alle

Benutzer, die [Blockchain-Knoten](/glossary/#node) betreiben, müssen keinen Dritten vertrauen, um Daten zu erhalten, und sie können schnell, privat und erlaubnisfrei mit der Ethereum-[Blockchain](/glossary/#blockchain) interagieren. Derzeit erfordert der Betrieb eines Blockchain-Knotens jedoch technisches Wissen und erheblichen Speicherplatz, was bedeutet, dass viele Menschen stattdessen Vermittlern vertrauen müssen.

Es gibt mehrere Upgrades, die den Betrieb von Blockchain-Knoten viel einfacher und weitaus weniger ressourcenintensiv machen werden. Die Art und Weise, wie Daten gespeichert werden, wird geändert, um eine platzsparendere Struktur zu verwenden, die als **Verkle-Tree** bekannt ist. Außerdem werden Ethereum-Blockchain-Knoten mit [Zustandslosigkeit](/roadmap/statelessness) oder [Datenablauf](/roadmap/statelessness/#data-expiry) keine Kopie der gesamten Ethereum-Zustandsdaten mehr speichern müssen, was den Festplattenspeicherbedarf drastisch reduziert. [Light Nodes](/developers/docs/nodes-and-clients/light-clients/) werden viele Vorteile des Betriebs eines vollständigen Blockchain-Knotens bieten, können aber problemlos auf Mobiltelefonen oder in einfachen Browser-Apps ausgeführt werden.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Lesen Sie mehr über Verkle-Trees</ButtonLink>

Mit diesen Upgrades werden die Hürden für den Betrieb eines Blockchain-Knotens praktisch auf null reduziert. Benutzer profitieren von einem sicheren, erlaubnisfreien Zugang zu Ethereum, ohne spürbaren Speicherplatz oder CPU-Leistung auf ihrem Computer oder Mobiltelefon opfern zu müssen, und sind bei der Nutzung von Apps nicht auf Dritte für Daten- oder Netzwerkzugriff angewiesen.

## Aktueller Fortschritt {#current-progress}

Smart Contract-Wallets sind bereits verfügbar, aber es sind weitere Upgrades erforderlich, um sie so dezentralisiert und erlaubnisfrei wie möglich zu machen. EIP-4337 ist ein ausgereifter Vorschlag, der keine Änderungen am Ethereum-Protokoll erfordert. Der für EIP-4337 erforderliche Haupt-Smart Contract wurde **im März 2023 bereitgestellt**.

**Die vollständige Zustandslosigkeit befindet sich noch in der Forschungsphase** und ist wahrscheinlich noch einige Jahre von der Implementierung entfernt. Es gibt mehrere Meilensteine auf dem Weg zur vollständigen Zustandslosigkeit, einschließlich des Datenablaufs, die möglicherweise früher implementiert werden. Andere Roadmap-Punkte wie [Verkle-Trees](/roadmap/verkle-trees/) und die [Trennung von Block-Vorschlagenden und Block-Erstellern (Proposer-Builder Separation)](/roadmap/pbs/) müssen zuerst abgeschlossen werden.

Verkle-Tree-Testnets sind bereits in Betrieb, und die nächste Phase ist die Ausführung von Verkle-Tree-fähigen Anwendungen auf privaten und anschließend auf öffentlichen Testnets. Sie können helfen, den Fortschritt zu beschleunigen, indem Sie Verträge in den Testnets bereitstellen oder Testnet-Anwendungen ausführen.