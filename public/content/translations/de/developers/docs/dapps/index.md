---
title: "Technische Einführung in Dapps"
description:
lang: de
---

Eine dezentralisierte Anwendung (Dapp) ist eine Anwendung, die auf einem dezentralisierten Netzwerk aufbaut und einen [Smart Contract](/developers/docs/smart-contracts/) mit einer Frontend-Benutzeroberfläche kombiniert. Auf [Ethereum](/) sind Smart Contracts zugänglich und transparent – wie offene APIs –, sodass Ihre Dapp sogar einen Smart Contract enthalten kann, den jemand anderes geschrieben hat.

## Voraussetzungen {#prerequisites}

Bevor Sie sich mit Dapps befassen, sollten Sie die [Blockchain-Grundlagen](/developers/docs/intro-to-ethereum/) durchgehen und sich über das Ethereum-Netzwerk und dessen dezentralisierte Natur informieren.

## Definition einer Dapp {#definition-of-a-dapp}

Der Backend-Code einer Dapp läuft auf einem dezentralisierten Peer-to-Peer-Netzwerk. Im Gegensatz dazu läuft der Backend-Code einer herkömmlichen App auf zentralisierten Servern.

Eine Dapp kann Frontend-Code und Benutzeroberflächen haben, die in einer beliebigen Sprache geschrieben sind (genau wie eine App), um Aufrufe an ihr Backend zu tätigen. Darüber hinaus kann ihr Frontend auf dezentralisierten Speichern wie [IPFS](https://ipfs.io/) gehostet werden.

- **Dezentralisiert** – Dapps laufen auf Ethereum, einer offenen, öffentlichen, dezentralisierten Plattform, bei der keine einzelne Person oder Gruppe die Kontrolle hat
- **Deterministisch** – Dapps führen dieselbe Funktion aus, unabhängig von der Umgebung, in der sie ausgeführt werden
- **Turing-vollständig** – Dapps können jede Aktion ausführen, sofern die erforderlichen Ressourcen vorhanden sind
- **Isoliert** – Dapps werden in einer virtuellen Umgebung ausgeführt, die als Ethereum Virtual Machine bekannt ist. Wenn der Smart Contract also einen Fehler aufweist, beeinträchtigt dies nicht die normale Funktion des Blockchain-Netzwerks

### Über Smart Contracts {#on-smart-contracts}

Um Dapps vorzustellen, müssen wir Smart Contracts einführen – mangels eines besseren Begriffs das Backend einer Dapp. Für einen detaillierten Überblick besuchen Sie unseren Abschnitt über [Smart Contracts](/developers/docs/smart-contracts/).

Ein Smart Contract ist Code, der auf der Ethereum-Blockchain existiert und genau wie programmiert ausgeführt wird. Sobald Smart Contracts im Netzwerk bereitgestellt wurden, können Sie sie nicht mehr ändern. Dapps können dezentralisiert sein, weil sie durch die im Vertrag geschriebene Logik gesteuert werden und nicht durch eine Einzelperson oder ein Unternehmen. Das bedeutet auch, dass Sie Ihre Verträge sehr sorgfältig entwerfen und gründlich testen müssen.

## Vorteile der Dapp-Entwicklung {#benefits-of-dapp-development}

- **Keine Ausfallzeiten** – Sobald der Smart Contract auf der Blockchain bereitgestellt ist, wird das Netzwerk als Ganzes immer in der Lage sein, Anwendungen zu bedienen, die mit dem Vertrag interagieren möchten. Böswillige Akteure können daher keine Denial-of-Service-Angriffe auf einzelne Dapps starten.
- **Datenschutz** – Sie müssen keine reale Identität angeben, um eine Dapp bereitzustellen oder mit ihr zu interagieren.
- **Zensurresistenz** – Keine einzelne Entität im Netzwerk kann Benutzer daran hindern, Transaktionen einzureichen, Dapps bereitzustellen oder Daten aus der Blockchain zu lesen.
- **Vollständige Datenintegrität** – Daten, die auf der Blockchain gespeichert sind, sind dank kryptografischer Primitive unveränderlich und unbestreitbar. Böswillige Akteure können keine Transaktionen oder andere Daten fälschen, die bereits veröffentlicht wurden.
- **Vertrauenslose Berechnung/verifizierbares Verhalten** – Smart Contracts können analysiert werden und führen garantiert auf vorhersehbare Weise aus, ohne dass einer zentralen Autorität vertraut werden muss. Dies gilt nicht für traditionelle Modelle; wenn wir beispielsweise Online-Banking-Systeme nutzen, müssen wir darauf vertrauen, dass Finanzinstitute unsere Finanzdaten nicht missbrauchen, Aufzeichnungen nicht manipulieren oder gehackt werden.

## Nachteile der Dapp-Entwicklung {#drawbacks-of-dapp-development}

- **Wartung** – Dapps können schwerer zu warten sein, da der auf der Blockchain veröffentlichte Code und die Daten schwerer zu ändern sind. Es ist für Entwickler schwierig, Aktualisierungen an ihren Dapps (oder den zugrunde liegenden Daten, die von einer Dapp gespeichert werden) vorzunehmen, sobald sie bereitgestellt sind, selbst wenn Fehler oder Sicherheitsrisiken in einer alten Version identifiziert werden.
- **Leistungsaufwand** – Es gibt einen enormen Leistungsaufwand, und die Skalierung ist wirklich schwierig. Um das Maß an Sicherheit, Integrität, Transparenz und Zuverlässigkeit zu erreichen, das Ethereum anstrebt, führt jeder Blockchain-Knoten jede Transaktion aus und speichert sie. Darüber hinaus nimmt auch der Proof-of-Stake-Konsens Zeit in Anspruch.
- **Netzwerküberlastung** – Wenn eine Dapp zu viele Rechenressourcen verbraucht, staut sich das gesamte Netzwerk. Derzeit kann das Netzwerk nur etwa 10-15 Transaktionen pro Sekunde verarbeiten; wenn Transaktionen schneller gesendet werden, kann der Pool unbestätigter Transaktionen schnell anwachsen.
- **Benutzererfahrung** – Es kann schwieriger sein, benutzerfreundliche Erlebnisse zu entwickeln, da der durchschnittliche Endbenutzer es möglicherweise zu schwierig findet, einen Tool-Stack einzurichten, der erforderlich ist, um auf wirklich sichere Weise mit der Blockchain zu interagieren.
- **Zentralisierung** – Benutzerfreundliche und entwicklerfreundliche Lösungen, die auf der Basisschicht von Ethereum aufbauen, könnten am Ende ohnehin wie zentralisierte Dienste aussehen. Beispielsweise können solche Dienste Schlüssel oder andere sensible Informationen serverseitig speichern, ein Frontend über einen zentralisierten Server bereitstellen oder wichtige Geschäftslogik auf einem zentralisierten Server ausführen, bevor sie auf die Blockchain schreiben. Zentralisierung beseitigt viele (wenn nicht alle) Vorteile der Blockchain gegenüber dem traditionellen Modell.

## Lernen Sie lieber visuell? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Tools zur Erstellung von Dapps {#dapp-tools}

**Scaffold-ETH _– Experimentieren Sie schnell mit Solidity über ein Frontend, das sich an Ihren Smart Contract anpasst._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Beispiel-Dapp](https://punkwallet.io/)

**Create Eth App _– Erstellen Sie Ethereum-basierte Apps mit einem einzigen Befehl._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _– FOSS-Tool zur Generierung von Dapp-Frontends aus einer [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS-Tool für Ethereum-Entwickler, um ihren Blockchain-Knoten zu testen sowie RPC-Aufrufe im Browser zu erstellen und zu debuggen._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _– SDKs in jeder Sprache, Smart Contracts, Tools und Infrastruktur für die Web3-Entwicklung._**

- [Startseite](https://thirdweb.com/)
- [Dokumentation](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Web3-Entwicklungsplattform auf Unternehmensniveau zur Bereitstellung von Smart Contracts, zur Ermöglichung von Kreditkarten- und Cross-Chain-Zahlungen sowie zur Nutzung von APIs zum Erstellen, Verteilen, Verkaufen, Speichern und Bearbeiten von NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Weiterführende Literatur {#further-reading}

- [Dapps entdecken](/apps)
- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Ein Leitfaden zu dezentralisierten Anwendungen aus dem Jahr 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) – _LimeChain_
- [Was sind dezentralisierte Apps?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) – _Gemini_
- [Beliebte Dapps](https://www.alchemy.com/dapps) – _Alchemy_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Einführung in den Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)

## Tutorials: Apps und Frontends auf Ethereum erstellen {#tutorials}

- [Uniswap-v2 Contract Walk-Through](/developers/tutorials/uniswap-v2-annotated-code/) _– Ein kommentierter Durchgang durch die Uniswap v2 Core Contracts, der erklärt, wie der AMM funktioniert._
- [Erstellen einer Benutzeroberfläche für Ihren Vertrag](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Wie man ein modernes React + wagmi Frontend erstellt, das sich mit Ihrem Smart Contract verbindet._
- [Hello World Smart Contract für Anfänger – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– End-to-End-Tutorial: Schreiben, Bereitstellen und Erstellen eines Frontends für einen einfachen Smart Contract._
- [Serverkomponenten und Agenten für Web3-Apps](/developers/tutorials/server-components/) _– Wie man TypeScript-Serverkomponenten schreibt, die auf Blockchain-Ereignisse hören und mit Transaktionen antworten._
- [IPFS für dezentralisierte Benutzeroberflächen](/developers/tutorials/ipfs-decentralized-ui/) _– Wie Sie das Frontend Ihrer Dapp auf IPFS hosten, um Zensurresistenz zu gewährleisten._