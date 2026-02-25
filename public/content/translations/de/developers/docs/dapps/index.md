---
title: Technische Grundlagen von DApps
description:
lang: de
---

Eine dezentralisierte Anwendung (Dapp) ist eine Anwendung, die auf einem dezentralen Netzwerk aufbaut und einen [Smart Contract](/developers/docs/smart-contracts/) mit einer Frontend-Benutzeroberfläche kombiniert. Beachte, dass Smart Contracts in Ethereum zugänglich und transparent sind – wie offene APIs –, also kann deine Dapp sogar einen Smart Contract enthalten, den eine andere Person geschrieben hat.

## Voraussetzungen {#prerequisites}

Bevor du mehr über Dapps lernst, solltest du dich mit den [Grundlagen der Blockchain](/developers/docs/intro-to-ethereum/) vertraut machen und mehr über das Ethereum-Netzwerk und seine Dezentralisierung erfahren.

## Definition einer Dapp {#definition-of-a-dapp}

Eine Dapp hat ihren Backend-Code auf einem dezentralisierten Peer-to-Peer-Netzwerk laufen. Vergleiche das mit einer App, bei der der Backend-Code auf dezentralisierten Servern läuft.

Eine Dapp kann Frontend-Code und eine Benutzeroberfläche in jeder beliebigen Sprache haben (genau wie eine App), die Aufrufe in ihrem Backend tätigen können. Darüber hinaus kann das Frontend auf dezentralem Speicher wie [IPFS](https://ipfs.io/) gehostet werden.

- **Dezentralisiert** – Dapps laufen auf Ethereum, einer offenen, öffentlichen, dezentralen Plattform, bei der keine einzelne Person oder Gruppe die Kontrolle hat.
- **Deterministisch** – Dapps führen dieselbe Funktion aus, unabhängig von der Umgebung, in der sie ausgeführt werden.
- **Turing-vollständig** – Dapps können jede Aktion ausführen, sofern die erforderlichen Ressourcen vorhanden sind.
- **Isoliert** – Dapps werden in einer virtuellen Umgebung namens Ethereum Virtual Machine ausgeführt. Wenn der Smart Contract also einen Fehler aufweist, wird die normale Funktion des Blockchain-Netzwerks dadurch nicht beeinträchtigt.

### Über Smart Contracts {#on-smart-contracts}

Um Dapps einzuführen, müssen wir auch Smart Contracts vorstellen – das Backend einer Dapp. Einen detaillierten Überblick findest du in unserem Abschnitt über [Smart Contracts](/developers/docs/smart-contracts/).

Ein Smart Contract ist ein Code, der auf der Ethereum-Blockchain existiert und genau wie programmiert abläuft. Sobald Smart Contracts im Netzwerk eingesetzt werden, kannst du sie nicht mehr ändern. Dapps können dezentralisiert sein, weil sie von der Logik kontrolliert werden, die in den Vertrag geschrieben ist, und nicht von einem Individuum oder einem Unternehmen. Das bedeutet auch, dass du deine Verträge sehr sorgfältig gestalten und gründlich testen musst.

## Vorteile der Dapp-Entwicklung {#benefits-of-dapp-development}

- **Keine Ausfallzeiten** – Sobald der Smart Contract in der Blockchain bereitgestellt ist, kann das Netzwerk als Ganzes immer Clients bedienen, die mit dem Vertrag interagieren möchten. Böswillige Akteure können daher keine "Denial-of-Service"-Angriffe starten, die auf einzelne Dapps abzielen.
- **Datenschutz** – Du musst keine echte Identität angeben, um eine Dapp bereitzustellen oder mit ihr zu interagieren.
- **Zensurresistenz** – Keine einzelne Entität im Netzwerk kann Nutzer daran hindern, Transaktionen zu übermitteln, Dapps bereitzustellen oder Daten aus der Blockchain zu lesen.
- **Vollständige Datenintegrität** – Auf der Blockchain gespeicherte Daten sind dank kryptografischer Primitive unveränderlich und unbestreitbar. Böswillige Akteure können keine Transaktionen oder andere Daten, die bereits öffentlich gemacht wurden, fälschen.
- **Vertrauenslose Berechnung/verifizierbares Verhalten** – Smart Contracts können analysiert werden und werden garantiert auf vorhersehbare Weise ausgeführt, ohne dass man einer zentralen Instanz vertrauen muss. Das ist bei traditionellen Modellen nicht der Fall. Wenn wir zum Beispiel Online-Banking-Systeme nutzen, müssen wir darauf vertrauen, dass die Finanzinstitute unsere Finanzdaten nicht missbrauchen, keine Aufzeichnungen manipulieren und uns nicht hacken.

## Nachteile der Dapp-Entwicklung {#drawbacks-of-dapp-development}

- **Wartung** – Dapps können schwieriger zu warten sein, da der auf der Blockchain veröffentlichte Code und die Daten schwerer zu ändern sind. Für Entwickler ist es schwierig ihre dApps (oder die zugrunde liegenden Daten, die von einer dApp gespeichert werden) zu aktualisieren, sobald sie bereitgestellt wurden, selbst wenn in einer alten Version Fehler oder Sicherheitsrisiken festgestellt werden.
- **Leistungs-Overhead** – Es gibt einen enormen Leistungs-Overhead und die Skalierung ist sehr schwierig. Um den Grad an Sicherheit, Integrität, Transparenz und Zuverlässigkeit zu erreichen, den Ethereum anstrebt, führt jeder Node jede Transaktion aus und speichert sie. Hinzu kommt, dass der Proof-of-Stake-Konsens ebenfalls Zeit benötigt.
- **Netzwerküberlastung** – Wenn eine Dapp zu viele Rechenressourcen verbraucht, wird das gesamte Netzwerk überlastet. Derzeit kann das Netzwerk nur etwa 10 bis 15 Transaktionen pro Sekunde verarbeiten; wenn Transaktionen schneller eingehen, kann der Pool an unbestätigten Transaktionen schnell anschwellen.
- **Benutzererlebnis** – Es kann schwieriger sein, benutzerfreundliche Erlebnisse zu schaffen, da der durchschnittliche Endbenutzer es möglicherweise als zu schwierig empfindet, den für eine wirklich sichere Interaktion mit der Blockchain erforderlichen Tool-Stack einzurichten.
- **Zentralisierung** – Benutzer- und entwicklerfreundliche Lösungen, die auf der Basisschicht von Ethereum aufbauen, sehen am Ende möglicherweise trotzdem wie zentralisierte Dienste aus. Solche Dienste können zum Beispiel Schlüssel oder andere sensible Informationen serverseitig speichern, ein Frontend über einen zentralen Server bedienen oder wichtige Geschäftslogik auf einem zentralen Server ausführen, bevor sie in die Blockchain geschrieben werden. Durch die Zentralisierung werden viele (wenn nicht alle) Vorteile der Blockchain gegenüber dem traditionellen Modell aufgehoben.

## Eher der visuelle Lernende? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Tools zur Erstellung von Dapps {#dapp-tools}

**Scaffold-ETH _– Experimentiere schnell mit Solidity über ein Frontend, das sich an deinen Smart Contract anpasst._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Beispiel-Dapp](https://punkwallet.io/)

**Create Eth App _– Erstelle Ethereum-basierte Apps mit einem einzigen Befehl._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _– FOSS-Tool zur Generierung von Dapp-Frontends aus einem [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS-Tool für Ethereum-Entwickler zum Testen ihrer Nodes und zum Erstellen und Debuggen von RPC-Aufrufen aus dem Browser heraus._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _– SDKs in jeder Sprache, Smart Contracts, Tools und Infrastruktur für die Web3-Entwicklung._**

- [Homepage](https://thirdweb.com/)
- [Dokumentation](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Web3-Entwicklungsplattform auf Unternehmensniveau, um Smart Contracts bereitzustellen, Kreditkarten- und kettenübergreifende Zahlungen zu ermöglichen und APIs zum Erstellen, Verteilen, Verkaufen, Speichern und Bearbeiten von NFTs zu verwenden._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Weiterführende Lektüre {#further-reading}

- [Dapps entdecken](/apps)
- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Ein Leitfaden für dezentralisierte Anwendungen aus dem Jahr 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Was sind dezentralisierte Apps?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Beliebte Dapps](https://www.alchemy.com/dapps) - _Alchemy_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Einführung in den Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
