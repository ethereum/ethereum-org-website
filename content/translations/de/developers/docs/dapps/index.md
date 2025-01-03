---
title: Einführung in Dapps
description:
lang: de
---

Eine dezentralisierte Anwendung (dapp) ist eine Anwendung, die auf einem dezentralisierten Netzwerk aufgebaut ist. Dies kombiniert einen [Smart Contract](/developers/docs/smart-contracts/) und eine Frontend-Benutzeroberfläche. Beachte, dass Smart Contracts in Ethereum zugänglich und transparent sind – wie offene APIs –, also kann deine Dapp sogar einen Smart Contract enthalten, den eine andere Person geschrieben hat.

## Voraussetzungen {#prerequisites}

Bevor du mehr über Dapps lernst, solltest du die [Blockchain-Basics](/developers/docs/intro-to-ethereum/) kennen und dir durchlesen, was das Ethereum-Netzwerk ist und wie es dezentralisiert wird.

## Definition einer Dapp {#definition-of-a-dapp}

Eine Dapp hat ihren Backend-Code auf einem dezentralisierten Peer-to-Peer-Netzwerk laufen. Vergleiche das mit einer App, bei der der Backend-Code auf dezentralisierten Servern läuft.

Eine Dapp kann Frontend-Code und eine Benutzeroberfläche in jeder beliebigen Sprache haben (genau wie eine App), die Aufrufe in ihrem Backend tätigen können. Darüber hinaus kann das Frontend auf dezentralisiertem Speicher wie [IPFS](https://ipfs.io/) gehostet werden.

- **Dezentralisiert** – Dapps arbeiten auf Ethereum, einer offenen, öffentlichen und dezentralen Plattform, auf der keine Person oder Gruppe die Kontrolle hat.
- **Deterministisch** – Dapps führen dieselbe Funktion aus, unabhängig von der Umgebung, in der sie ausgeführt werden.
- **Turing-Vollständigkeit** – Dapps können jede Aktion ausführen, wenn die erforderlichen Ressourcen vorhanden sind.
- **Isoliert** – Dapps werden in einer virtuellen Umgebung ausgeführt, die als Ethereum Virtual Machine bekannt ist, so dass ein Fehler im Smart Contract die normale Funktion des Blockchain-Netzwerks nicht beeinträchtigt.

### Smart Contracts {#on-smart-contracts}

Um Dapps einzuführen, müssen wir auch Smart Contracts vorstellen – das Backend einer Dapp. Einen detaillierten Überblick findest du in unserem Abschnitt über [Smart Contracts](/developers/docs/smart-contracts/).

Ein Smart Contract ist ein Code, der auf der Ethereum-Blockchain existiert und genau wie programmiert abläuft. Sobald Smart Contracts im Netzwerk eingesetzt werden, kannst du sie nicht mehr ändern. Dapps können dezentralisiert sein, weil sie von der Logik kontrolliert werden, die in den Vertrag geschrieben ist, und nicht von einem Individuum oder einem Unternehmen. Das bedeutet auch, dass du deine Verträge sehr sorgfältig gestalten und gründlich testen musst.

## Vorteile der Dapp-Entwicklung {#benefits-of-dapp-development}

- **Zero downtime** - Sobald der Smart Contract auf der Blockchain implementiert ist, kann das gesamte Netzwerk jederzeit Kunden bedienen, die mit dem Vertrag interagieren wollen. Böswillige Akteure können daher keine "Denial-of-Service"-Angriffe starten, die auf einzelne Dapps abzielen.
- **Privatsphäre** – Du musst keine echte Identität zur Verfügung stellen, um eine Dapp bereitzustellen oder mit einer zu interagieren.
- **Resistenz gegen Zensur** - keine einzige Entität im Netzwerk kann Benutzer daran hindern, Transaktionen zu übertragen, Dapps bereitzustellen oder Daten der Blockchain auszulesen.
- **Komplette Datenintegrität** – Daten, die auf der Blockchain gespeichert sind, sind unveränderbar und unbestreitbar, dank kryptographischer Primitivität. Böswillige Akteure können keine Transaktionen oder andere Daten, die bereits öffentlich gemacht wurden, fälschen.
- **Vertrauenslose Berechnung/überprüfbares Verhalten** – Smart Contracts können analysiert werden und garantieren, dass sie auf vorhersehbare Weise ausgeführt werden, ohne dass dafür das Vertrauen in eine zentrale Autorität vorausgesetzt wird. Das ist bei traditionellen Modellen nicht der Fall. Wenn wir zum Beispiel Online-Banking-Systeme nutzen, müssen wir darauf vertrauen, dass die Finanzinstitute unsere Finanzdaten nicht missbrauchen, keine Aufzeichnungen manipulieren und uns nicht hacken.

## Nachteile der Dapp-Entwicklung {#drawbacks-of-dapp-development}

- **Wartung** – Dapps können schwieriger zu warten sein, weil der Code und die Daten, die auf der Blockchain veröffentlicht werden, schwerer zu ändern sind. Für Entwickler ist es schwierig ihre dApps (oder die zugrunde liegenden Daten, die von einer dApp gespeichert werden) zu aktualisieren, sobald sie bereitgestellt wurden, selbst wenn in einer alten Version Fehler oder Sicherheitsrisiken festgestellt werden.
- **Performance-Overhead** – Es gibt einen enormen Performance-Overhead und die Skalierung ist sehr schwierig. Um den Grad an Sicherheit, Integrität, Transparenz und Zuverlässigkeit zu erreichen, den Ethereum anstrebt, führt jeder Node jede Transaktion aus und speichert sie. Hinzu kommt, dass der Proof-of-Stake-Konsens ebenfalls Zeit benötigt.
- **Netzüberlastung** – Wenn eine Dapp zu viele Rechenressourcen verbraucht, gerät das gesamte Netzwerk ins Stocken. Derzeit kann das Netzwerk nur etwa 10 bis 15 Transaktionen pro Sekunde verarbeiten; wenn Transaktionen schneller eingehen, kann der Pool an unbestätigten Transaktionen schnell anschwellen.
- **Benutzererfahrung** – Es könnte schwieriger sein, eine benutzerfreundliche Erfahrung zu entwickeln, weil es für den durchschnittlichen Endbenutzer zu schwer sein könnte, die notwendigen Tools für eine wirklich sichere Interaktion mit der Blockchain einzurichten.
- **Zentralisierung** – Benutzer- und entwicklerfreundliche Lösungen, die auf der Basisschicht von Ethereum aufgebaut sind, könnten am Ende ohnehin wie zentralisierte Dienste aussehen. Solche Dienste können zum Beispiel Schlüssel oder andere sensible Informationen serverseitig speichern, ein Frontend über einen zentralen Server bedienen oder wichtige Geschäftslogik auf einem zentralen Server ausführen, bevor sie in die Blockchain geschrieben werden. Durch die Zentralisierung werden viele (wenn nicht alle) Vorteile der Blockchain gegenüber dem traditionellen Modell aufgehoben.

## Eher ein visueller Lerner? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Tools zum Erstellen von dApps {#dapp-tools}

**Scaffold-ETH _- Experimentiere schnell mit Solidity, indem du ein Frontend verwendest, das sich an deinen Smart Contract anpasst._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Beispiel-Dapp](https://punkwallet.io/)

**Eth App erstellen _– Erstelle Ethereum-gestützte Apps mit einem Befehl._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _– FOSS-Tool zur Erstellung von Dapp-Frontends aus einer [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS-Tool für Ethereum-Entwickler, um ihre Nodes zu testen und RPC-Aufrufe vom Browser aus zu komponieren und zu debuggen._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDKs in jeder Sprache, Smart Contracts, Tools und Infrastruktur für die Web3-Entwicklung._**

- [Website](https://thirdweb.com/)
- [Dokumentation](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Eine Web3-Entwicklungsplattform auf Unternehmensniveau, die das Bereitstellen von Smart Contracts sowie Kreditkarten- und Cross-Chain-Zahlungen ermöglicht und APIs zu Erstellung, Verteilung, Verkauf, Speicherung und Bearbeitung von NFTs nutzt._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Weiterführende Informationen {#further-reading}

- [Entdecken Sie dApps](/dapps)
- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Ein Leitfaden für dezentrale Anwendungen aus dem Jahr 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) – _LimeChain_
- [Was sind dezentrale Apps?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) – _Gemini_
- [Beliebte Dapps](https://www.alchemy.com/dapps) – _Alchemy_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Einführung in den Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
