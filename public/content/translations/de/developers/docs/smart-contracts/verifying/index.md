---
title: Verifizierung von Smart Contracts
description: "Ein Überblick über die Quellcode-Verifizierung für Ethereum-Smart-Contracts"
lang: de
---

[Smart Contracts](/developers/docs/smart-contracts/) sind so konzipiert, dass sie „vertrauenslos“ (trustless) sind, was bedeutet, dass Benutzer keinen Dritten (z. B. Entwicklern und Unternehmen) vertrauen müssen, bevor sie mit einem Vertrag interagieren. Als Voraussetzung für diese Vertrauenslosigkeit müssen Benutzer und andere Entwickler in der Lage sein, den Quellcode eines Smart Contracts zu verifizieren. Die Quellcode-Verifizierung versichert Benutzern und Entwicklern, dass der veröffentlichte Vertragscode derselbe Code ist, der an der Vertragsadresse auf der Ethereum-Blockchain ausgeführt wird.

Es ist wichtig, zwischen „Quellcode-Verifizierung“ und „[formaler Verifizierung](/developers/docs/smart-contracts/formal-verification/)“ zu unterscheiden. Die Quellcode-Verifizierung, die im Folgenden detailliert erklärt wird, bezieht sich auf die Überprüfung, ob der gegebene Quellcode eines Smart Contracts in einer Hochsprache (z. B. Solidity) zu demselben Bytecode kompiliert wird, der an der Vertragsadresse ausgeführt werden soll. Die formale Verifizierung beschreibt jedoch die Überprüfung der Korrektheit eines Smart Contracts, was bedeutet, dass sich der Vertrag wie erwartet verhält. Obwohl kontextabhängig, bezieht sich die Vertragsverifizierung in der Regel auf die Quellcode-Verifizierung.

## Was ist Quellcode-Verifizierung? {#what-is-source-code-verification}

Vor der Bereitstellung eines Smart Contracts in der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) [kompilieren](/developers/docs/smart-contracts/compiling/) Entwickler den Quellcode des Vertrags – Anweisungen, die [in Solidity](/developers/docs/smart-contracts/languages/) oder einer anderen höheren Programmiersprache geschrieben sind – in Bytecode. Da die EVM keine High-Level-Anweisungen interpretieren kann, ist das Kompilieren von Quellcode in Bytecode (d. h. Low-Level-Maschinenanweisungen) für die Ausführung der Vertragslogik in der EVM erforderlich.

Bei der Quellcode-Verifizierung werden der Quellcode eines Smart Contracts und der kompilierte Bytecode, der während der Vertragserstellung verwendet wurde, verglichen, um eventuelle Unterschiede zu erkennen. Die Verifizierung von Smart Contracts ist wichtig, da der beworbene Vertragscode von dem abweichen kann, was auf der Blockchain ausgeführt wird.

Die Verifizierung von Smart Contracts ermöglicht es, durch die höhere Sprache, in der er geschrieben ist, zu untersuchen, was ein Vertrag tut, ohne Maschinencode lesen zu müssen. Funktionen, Werte und in der Regel die Variablennamen und Kommentare bleiben mit dem ursprünglichen Quellcode, der kompiliert und bereitgestellt wird, identisch. Dies macht das Lesen von Code viel einfacher. Die Quellcode-Verifizierung sorgt auch für die Codedokumentation, sodass Endbenutzer wissen, wofür ein Smart Contract entwickelt wurde.

### Was ist eine vollständige Verifizierung? {#full-verification}

Es gibt einige Teile des Quellcodes, die den kompilierten Bytecode nicht beeinflussen, wie z. B. Kommentare oder Variablennamen. Das bedeutet, dass zwei Quellcodes mit unterschiedlichen Variablennamen und unterschiedlichen Kommentaren beide in der Lage wären, denselben Vertrag zu verifizieren. Damit kann ein böswilliger Akteur täuschende Kommentare hinzufügen oder irreführende Variablennamen im Quellcode vergeben und den Vertrag mit einem anderen Quellcode als dem ursprünglichen Quellcode verifizieren lassen.

Es ist möglich, dies zu vermeiden, indem dem Bytecode zusätzliche Daten angehängt werden, die als _kryptografische Garantie_ für die Genauigkeit des Quellcodes und als _Fingerabdruck_ der Kompilierungsinformationen dienen. Die notwendigen Informationen finden sich in den [Vertragsmetadaten von Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), und der Hash dieser Datei wird an den Bytecode eines Vertrags angehängt. Sie können dies im [Metadaten-Playground](https://playground.sourcify.dev) in Aktion sehen.

Die Metadatendatei enthält Informationen über die Kompilierung des Vertrags, einschließlich der Quelldateien und ihrer Hashes. Das heißt, wenn sich eine der Kompilierungseinstellungen oder auch nur ein Byte in einer der Quelldateien ändert, ändert sich die Metadatendatei. Folglich ändert sich auch der Hash der Metadatendatei, der an den Bytecode angehängt ist. Das bedeutet, wenn der Bytecode eines Vertrags + der angehängte Metadaten-Hash mit dem gegebenen Quellcode und den Kompilierungseinstellungen übereinstimmen, können wir sicher sein, dass dies genau derselbe Quellcode ist, der in der ursprünglichen Kompilierung verwendet wurde, nicht einmal ein einziges Byte ist anders.

Diese Art der Verifizierung, die den Metadaten-Hash nutzt, wird als **„[vollständige Verifizierung](https://docs.sourcify.dev/docs/full-vs-partial-match/)“** (auch „perfekte Verifizierung“) bezeichnet. Wenn die Metadaten-Hashes nicht übereinstimmen oder bei der Verifizierung nicht berücksichtigt werden, handelt es sich um eine „teilweise Übereinstimmung“ (partial match), was derzeit die gängigere Methode zur Verifizierung von Verträgen ist. Es ist möglich, [bösartigen Code einzufügen](https://samczsun.com/hiding-in-plain-sight/), der sich ohne vollständige Verifizierung nicht im verifizierten Quellcode widerspiegeln würde. Die meisten Entwickler sind sich der vollständigen Verifizierung nicht bewusst und behalten die Metadatendatei ihrer Kompilierung nicht, weshalb die teilweise Verifizierung bisher die De-facto-Methode zur Verifizierung von Verträgen war.

## Warum ist die Quellcode-Verifizierung wichtig? {#importance-of-source-code-verification}

### Vertrauenslosigkeit {#trustlessness}

Vertrauenslosigkeit ist wohl die größte Prämisse für Smart Contracts und [dezentralisierte Anwendungen (Dapps)](/developers/docs/dapps/). Smart Contracts sind „unveränderlich“ und können nicht geändert werden; ein Vertrag führt nur die Geschäftslogik aus, die zum Zeitpunkt der Bereitstellung im Code definiert ist. Dies bedeutet, dass Entwickler und Unternehmen den Code eines Vertrags nach der Bereitstellung auf Ethereum nicht manipulieren können.

Damit ein Smart Contract vertrauenslos ist, sollte der Vertragscode für eine unabhängige Verifizierung verfügbar sein. Während der kompilierte Bytecode für jeden Smart Contract öffentlich auf der Blockchain verfügbar ist, ist die Low-Level-Sprache schwer zu verstehen – sowohl für Entwickler als auch für Benutzer.

Projekte reduzieren Vertrauensannahmen, indem sie den Quellcode ihrer Verträge veröffentlichen. Dies führt jedoch zu einem weiteren Problem: Es ist schwierig zu überprüfen, ob der veröffentlichte Quellcode mit dem Vertrags-Bytecode übereinstimmt. In diesem Szenario geht der Wert der Vertrauenslosigkeit verloren, da Benutzer darauf vertrauen müssen, dass Entwickler die Geschäftslogik eines Vertrags nicht ändern (d. h. durch Ändern des Bytecodes), bevor sie ihn auf der Blockchain bereitstellen.

Tools zur Quellcode-Verifizierung bieten Garantien, dass die Quellcodedateien eines Smart Contracts mit dem Assembly-Code übereinstimmen. Das Ergebnis ist ein vertrauensloses Ökosystem, in dem Benutzer Dritten nicht blind vertrauen und stattdessen den Code verifizieren, bevor sie Gelder in einen Vertrag einzahlen.

### Benutzersicherheit {#user-safety}

Bei Smart Contracts steht in der Regel viel Geld auf dem Spiel. Dies erfordert höhere Sicherheitsgarantien und die Überprüfung der Logik eines Smart Contracts vor dessen Verwendung. Das Problem ist, dass skrupellose Entwickler Benutzer täuschen können, indem sie bösartigen Code in einen Smart Contract einfügen. Ohne Verifizierung können bösartige Smart Contracts [Hintertüren](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), umstrittene Zugriffskontrollmechanismen, ausnutzbare Schwachstellen und andere Dinge aufweisen, die die Benutzersicherheit gefährden und unentdeckt bleiben würden.

Die Veröffentlichung der Quellcodedateien eines Smart Contracts erleichtert es Interessierten, wie z. B. Prüfern (Auditors), den Vertrag auf potenzielle Angriffsvektoren zu bewerten. Wenn mehrere Parteien einen Smart Contract unabhängig voneinander verifizieren, haben Benutzer stärkere Garantien für seine Sicherheit.

## Wie man den Quellcode für Ethereum-Smart-Contracts verifiziert {#source-code-verification-for-ethereum-smart-contracts}

[Die Bereitstellung eines Smart Contracts auf Ethereum](/developers/docs/smart-contracts/deploying/) erfordert das Senden einer Transaktion mit einer Daten-Payload (kompilierter Bytecode) an eine spezielle Adresse. Die Daten-Payload wird durch Kompilieren des Quellcodes generiert, zuzüglich der [Konstruktorargumente](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) der Vertragsinstanz, die an die Daten-Payload in der Transaktion angehängt werden. Die Kompilierung ist deterministisch, was bedeutet, dass sie immer dieselbe Ausgabe (d. h. Vertrags-Bytecode) erzeugt, wenn dieselben Quelldateien und Kompilierungseinstellungen (z. B. Compiler-Version, Optimierer) verwendet werden.

![Ein Diagramm, das die Quellcode-Verifizierung von Smart Contracts zeigt](./source-code-verification.png)

Die Verifizierung eines Smart Contracts umfasst im Wesentlichen die folgenden Schritte:

1. Eingabe der Quelldateien und Kompilierungseinstellungen in einen Compiler.

2. Der Compiler gibt den Bytecode des Vertrags aus.

3. Abrufen des Bytecodes des bereitgestellten Vertrags an einer bestimmten Adresse.

4. Vergleichen des bereitgestellten Bytecodes mit dem neu kompilierten Bytecode. Wenn die Codes übereinstimmen, wird der Vertrag mit dem gegebenen Quellcode und den Kompilierungseinstellungen verifiziert.

5. Wenn zusätzlich die Metadaten-Hashes am Ende des Bytecodes übereinstimmen, handelt es sich um eine vollständige Übereinstimmung (Full Match).

Beachten Sie, dass dies eine vereinfachte Beschreibung der Verifizierung ist und es viele Ausnahmen gibt, die damit nicht funktionieren würden, wie z. B. das Vorhandensein von [unveränderlichen Variablen](https://docs.sourcify.dev/docs/immutables/).

## Tools zur Quellcode-Verifizierung {#source-code-verification-tools}

Der traditionelle Prozess der Verifizierung von Verträgen kann komplex sein. Aus diesem Grund gibt es Tools zur Verifizierung des Quellcodes für auf Ethereum bereitgestellte Smart Contracts. Diese Tools automatisieren große Teile der Quellcode-Verifizierung und kuratieren auch verifizierte Verträge zum Nutzen der Benutzer.

### Etherscan {#etherscan}

Obwohl Etherscan hauptsächlich als [Ethereum-Blocksuchmaschine](/developers/docs/data-and-analytics/block-explorers/) bekannt ist, bietet es auch einen [Dienst zur Quellcode-Verifizierung](https://etherscan.io/verifyContract) für Entwickler und Benutzer von Smart Contracts an.

Etherscan ermöglicht es Ihnen, den Vertrags-Bytecode aus der ursprünglichen Daten-Payload (Quellcode, Bibliotheksadresse, Compiler-Einstellungen, Vertragsadresse usw.) neu zu kompilieren. Wenn der neu kompilierte Bytecode mit dem Bytecode (und den Konstruktorparametern) des Vertrags auf der Blockchain verknüpft ist, dann [ist der Vertrag verifiziert](https://info.etherscan.com/types-of-contract-verification/).

Sobald der Quellcode Ihres Vertrags verifiziert ist, erhält er das Label „Verified“ und wird auf Etherscan veröffentlicht, damit andere ihn prüfen können. Er wird auch dem Bereich [Verified Contracts](https://etherscan.io/contractsVerified/) hinzugefügt – einem Repository von Smart Contracts mit verifizierten Quellcodes.

Etherscan ist das am häufigsten verwendete Tool zur Verifizierung von Verträgen. Die Vertragsverifizierung von Etherscan hat jedoch einen Nachteil: Sie vergleicht den **Metadaten-Hash** des Bytecodes auf der Blockchain und des neu kompilierten Bytecodes nicht. Daher sind die Übereinstimmungen in Etherscan teilweise Übereinstimmungen (Partial Matches).

[Mehr über die Verifizierung von Verträgen auf Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) ist eine Open-Source-Blocksuchmaschine, die auch einen [Vertragsverifizierungsdienst](https://eth.blockscout.com/contract-verification) für Entwickler und Benutzer von Smart Contracts anbietet. Als Open-Source-Alternative bietet Blockscout Transparenz darüber, wie die Verifizierung durchgeführt wird, und ermöglicht Community-Beiträge zur Verbesserung des Verifizierungsprozesses.

Ähnlich wie bei anderen Verifizierungsdiensten können Sie mit Blockscout den Quellcode Ihres Vertrags verifizieren, indem Sie den Bytecode neu kompilieren und mit dem bereitgestellten Vertrag vergleichen. Sobald Ihr Vertrag verifiziert ist, erhält er den Verifizierungsstatus und der Quellcode wird öffentlich für Audits und Interaktionen zugänglich. Verifizierte Verträge werden auch im [Repository für verifizierte Verträge](https://eth.blockscout.com/verified-contracts) von Blockscout aufgelistet, um das Durchsuchen und Entdecken zu erleichtern.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) ist ein weiteres Tool zur Verifizierung von Verträgen, das Open Source und dezentralisiert ist. Es ist keine Blocksuchmaschine und verifiziert Verträge nur in [verschiedenen EVM-basierten Netzwerken](https://docs.sourcify.dev/docs/chains). Es fungiert als öffentliche Infrastruktur, auf der andere Tools aufbauen können, und zielt darauf ab, menschenfreundlichere Vertragsinteraktionen mithilfe der [ABI](/developers/docs/smart-contracts/compiling/#web-applications) und der [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html)-Kommentare zu ermöglichen, die in der Metadatendatei zu finden sind.

Im Gegensatz zu Etherscan unterstützt Sourcify vollständige Übereinstimmungen (Full Matches) mit dem Metadaten-Hash. Die verifizierten Verträge werden in seinem [öffentlichen Repository](https://docs.sourcify.dev/docs/repository/) über HTTP und [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs) bereitgestellt, was ein dezentralisierter, [inhaltsadressierter](https://docs.storacha.network/concepts/content-addressing/) Speicher ist. Dies ermöglicht das Abrufen der Metadatendatei eines Vertrags über IPFS, da der angehängte Metadaten-Hash ein IPFS-Hash ist.

Zusätzlich kann man auch die Quellcodedateien über IPFS abrufen, da IPFS-Hashes dieser Dateien ebenfalls in den Metadaten zu finden sind. Ein Vertrag kann verifiziert werden, indem die Metadatendatei und die Quelldateien über seine API oder die [Benutzeroberfläche (UI)](https://sourcify.dev/#/verifier) bereitgestellt werden, oder durch die Verwendung der Plugins. Das Sourcify-Überwachungstool lauscht auch auf Vertragserstellungen in neuen Blöcken und versucht, die Verträge zu verifizieren, wenn ihre Metadaten und Quelldateien auf IPFS veröffentlicht sind.

[Mehr über die Verifizierung von Verträgen auf Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

Die [Tenderly-Plattform](https://tenderly.co/) ermöglicht es Web3-Entwicklern, Smart Contracts zu erstellen, zu testen, zu überwachen und zu betreiben. Durch die Kombination von Debugging-Tools mit Beobachtbarkeit und Infrastrukturbausteinen hilft Tenderly Entwicklern, die Entwicklung von Smart Contracts zu beschleunigen. Um die Funktionen von Tenderly vollständig nutzen zu können, müssen Entwickler [eine Quellcode-Verifizierung durchführen](https://docs.tenderly.co/monitoring/contract-verification), wofür verschiedene Methoden zur Verfügung stehen.

Es ist möglich, einen Vertrag privat oder öffentlich zu verifizieren. Wenn er privat verifiziert wird, ist der Smart Contract nur für Sie (und andere Mitglieder in Ihrem Projekt) sichtbar. Die öffentliche Verifizierung eines Vertrags macht ihn für jeden sichtbar, der die Tenderly-Plattform nutzt.

Sie können Ihre Verträge über das [Dashboard](https://docs.tenderly.co/contract-verification), das [Tenderly Hardhat-Plugin](https://docs.tenderly.co/contract-verification/hardhat) oder die [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) verifizieren.

Wenn Sie Verträge über das Dashboard verifizieren, müssen Sie die Quelldatei oder die vom Solidity-Compiler generierte Metadatendatei, die Adresse/das Netzwerk und die Compiler-Einstellungen importieren.

Die Verwendung des Tenderly Hardhat-Plugins ermöglicht mehr Kontrolle über den Verifizierungsprozess mit weniger Aufwand, sodass Sie zwischen automatischer (No-Code) und manueller (Code-basierter) Verifizierung wählen können.

## Weiterführende Literatur {#further-reading}

- [Verifizierung des Vertragsquellcodes](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)