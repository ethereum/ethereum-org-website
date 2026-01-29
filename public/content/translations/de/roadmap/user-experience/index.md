---
title: Verbesserung der Benutzererfahrung
description: "Für die meisten Menschen ist es immer noch zu kompliziert Ethereum zu benutzen. Um die Massenakzeptanz von Ethereum zu fördern, müssen die Eintrittsbarrieren drastisch gesenkt werden - die Nutzer müssen die Vorteile eines dezentralisierten, erlaubnisfreien und zensurresistenten Zugangs zu Ethereum nutzen können, der jedoch so reibungslos sein muss wie die Nutzung einer herkömmlichen Web2-App."
lang: de
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum-Roadmap"
template: roadmap
---

**Die Nutzung von Ethereum muss vereinfacht werden**; von der Verwaltung von [Schlüsseln](/glossary/#key) und [Wallets](/glossary/#wallet) bis zur Initiierung von Transaktionen. Um die Massenakzeptanz zu erleichtern, muss Ethereum die Benutzerfreundlichkeit drastisch erhöhen, sodass die Nutzer einen erlaubnisfreien und zensurresistenten Zugang zu Ethereum mit der reibungslosen Erfahrung wie bei der Nutzung von [Web2](/glossary/#web2)-Apps erleben können.

## Über Seed-Phrases hinaus {#no-more-seed-phrases}

Ethereum-Konten sind durch ein Schlüsselpaar geschützt, das zur Identifizierung von Konten (öffentlicher Schlüssel) und zum Signieren von Nachrichten (privater Schlüssel) verwendet wird. Ein privater Schlüssel ist wie ein Master-Passwort; er ermöglicht den vollständigen Zugang zu einem Ethereum-Konto. Für Menschen, die eher mit Banken und Web2-Apps vertraut sind, welche die Konten im Namen des Nutzers verwalten, ist dies eine andere Art der Bedienung. Damit Ethereum die Massenakzeptanz erreicht, ohne sich auf zentralisierte Dritte zu verlassen, muss es einen unkomplizierten, reibungslosen Weg geben, wie ein Nutzer sein Vermögen in Verwahrung nehmen und die Kontrolle über seine Daten behalten kann, ohne sich mit Public-Private-Key-Kryptografie und Schlüsselverwaltung auskennen zu müssen.

Die Lösung für dieses Problem ist die Verwendung von [Smart Contract](/glossary/#smart-contract)-Wallets zur Interaktion mit Ethereum. Smart Contract Wallets bieten die Möglichkeit, Konten bei Verlust oder dem Diebstahl der Schlüssel zu schützen, Betrug besser aufzudecken und abzuwehren und ermöglichen neue Funktionen für Wallets. Obwohl es heute bereits Smart Contract Wallets gibt, ist es schwierig, diese zu erstellen, da das Ethereum-Protokoll sie besser unterstützen muss. Diese zusätzliche Unterstützung wird als Kontoabstraktion bezeichnet.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Mehr zum Thema Kontenabstraktion</ButtonLink>

## Nodes für jedermann

Benutzer, die [Nodes](/glossary/#node) betreiben, müssen sich nicht darauf verlassen, dass Dritte ihnen Daten bereitstellen, und können schnell, privat und erlaubnisfrei mit der Ethereum-[Blockchain](/glossary/#blockchain) interagieren. Allerdings erfordert der Betrieb einer Node derzeit technische Kenntnisse und viel Speicherplatz, so dass viele Menschen stattdessen auf Intermediäre vertrauen müssen.

Es gibt mehrere Upgrades, die den Betrieb von Nodes wesentlich einfacher und weniger ressourcenintensiv machen werden. Die Art und Weise, wie Daten gespeichert werden, wird geändert, um eine platzsparendere Struktur zu verwenden, die als **Verkle Tree** bekannt ist. Mit [Zustandslosigkeit](/roadmap/statelessness) oder [Datenablauf](/roadmap/statelessness/#data-expiry) müssen Ethereum-Nodes zudem keine Kopie der gesamten Ethereum-Zustandsdaten mehr speichern, was den Speicherplatzbedarf auf der Festplatte drastisch reduziert. [Light Nodes](/developers/docs/nodes-and-clients/light-clients/) bieten viele der Vorteile des Betriebs eines Full Nodes, können aber problemlos auf Mobiltelefonen oder in einfachen Browser-Apps ausgeführt werden.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Mehr über Verkle-Trees</ButtonLink>

Mit diesen Upgrades werden die Hürden für den Betrieb einer Node praktisch auf Null reduziert. Die Nutzer werden von einem sicheren, erlaubnisfreien Zugang zu Ethereum profitieren, ohne dass sie nennenswerten Speicherplatz oder CPU auf ihrem Computer oder Mobiltelefon opfern müssen, und sie werden nicht auf Dritte angewiesen sein, wenn es um den Daten- oder Netzwerkzugang geht, wenn sie Apps verwenden.

## Aktueller Fortschritt {#current-progress}

Smart-Contract-Wallets sind bereits verfügbar, aber es sind noch weitere Verbesserungen erforderlich, um sie so dezentralisiert und erlaubnislos wie möglich zu gestalten. EIP-4337 ist ein ausgereifter Vorschlag, der keine Änderungen am Ethereum-Protokoll erfordert. Der wichtigste Smart Contract, der für EIP-4337 benötigt wird, wurde **im März 2023 bereitgestellt**.

**Die vollständige Zustandslosigkeit ist noch in der Forschungsphase** und es wird wahrscheinlich noch einige Jahre dauern, bis sie implementiert wird. Es gibt mehrere Meilensteine auf dem Weg zur vollständigen Statelessness, einschließlich data expiry, welche früher umgesetzt werden können. Andere Roadmap-Punkte, wie [Verkle-Trees](/roadmap/verkle-trees/) und die [Trennung von Proposer und Builder](/roadmap/pbs/), müssen zuerst abgeschlossen werden.

Verkle Tree Testnets sind bereits in Betrieb, und die nächste Phase besteht darin, Verkle Tree fähige Clients in privaten und dann in öffentlichen Testnets einzusetzen. Sie können dazu beitragen, den Fortschritt zu beschleunigen, indem Sie Kontrakte in die Testnets einbringen oder Testnet-Clients betreiben.
