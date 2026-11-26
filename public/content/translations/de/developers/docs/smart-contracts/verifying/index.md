---
title: Smart Contracts verifizieren
description: "Ein Überblick über die Quellcode-Verifizierung für Ethereum-Smart-Contracts"
lang: de
---

[Smart Contracts](/developers/docs/smart-contracts/) sind so konzipiert, dass sie „vertrauenslos“ sind, was bedeutet, dass Benutzer keinen Dritten (z. B. Entwicklern und Unternehmen) vertrauen müssen, bevor sie mit einem Vertrag interagieren. Als Voraussetzung für Vertrauenslosigkeit müssen Benutzer und andere Entwickler in der Lage sein, den Quellcode eines Smart Contracts zu verifizieren. Die Quellcode-Verifizierung versichert Benutzern und Entwicklern, dass der veröffentlichte Vertragscode derselbe Code ist, der an der Vertragsadresse auf der Ethereum-Blockchain ausgeführt wird.

Es ist wichtig, zwischen „Quellcode-Verifizierung“ und „[Formaler Verifikation](/developers/docs/smart-contracts/formal-verification/)“ zu unterscheiden. Die Quellcode-Verifizierung, die im Folgenden detailliert erklärt wird, bezieht sich auf die Überprüfung, ob der angegebene Quellcode eines Smart Contracts in einer Hochsprache (z. B. Solidity) zu demselben Bytecode kompiliert wird, der an der Vertragsadresse ausgeführt werden soll. Die Formale Verifikation beschreibt jedoch die Überprüfung der Korrektheit eines Smart Contracts, was bedeutet, dass sich der Vertrag wie erwartet verhält. Obwohl kontextabhängig, bezieht sich die Vertragsverifizierung in der Regel auf die Quellcode-Verifizierung.

## Was ist Quellcode-Verifizierung? {#what-is-source-code-verification}

Vor dem Bereitstellen eines Smart Contracts in der [Virtuellen Ethereum-Maschine (EVM)](/developers/docs/evm/) [kompilieren](/developers/docs/smart-contracts/compiling/) Entwickler den Quellcode des Vertrags – Anweisungen, die [in Solidity](/developers/docs/smart-contracts/languages/) oder einer anderen höheren Programmiersprache geschrieben sind – in Bytecode. Da die EVM keine High-Level-Anweisungen interpretieren kann, ist die Kompilierung von Quellcode in Bytecode (d. h. Low-Level-Maschinenanweisungen) für die Ausführung der Vertragslogik in der EVM erforderlich.

Die Quellcode-Verifizierung vergleicht den Quellcode eines Smart Contracts mit dem kompilierten Bytecode, der während der Vertragserstellung verwendet wurde, um etwaige Unterschiede zu erkennen. Die Verifizierung von Smart Contracts ist wichtig, da der beworbene Vertragscode von dem abweichen kann, was auf der Blockchain ausgeführt wird.

Die Verifizierung von Smart Contracts ermöglicht es, durch die höhere Sprache, in der er geschrieben ist, zu untersuchen, was ein Vertrag tut, ohne Maschinencode lesen zu müssen. Funktionen, Werte und in der Regel die Variablennamen und Kommentare bleiben mit dem ursprünglichen Quellcode, der kompiliert und bereitgestellt wird, identisch. Dies macht das Lesen von Code viel einfacher. Die Quellcode-Verifizierung sorgt auch für die Code-Dokumentation, sodass Endbenutzer wissen, wofür ein Smart Contract entwickelt wurde.

### Was ist eine exakte Übereinstimmung? {#full-verification}

Es gibt einige Teile des Quellcodes, die den kompilierten Bytecode nicht beeinflussen, wie z. B. Kommentare oder Variablennamen. Das bedeutet, dass zwei Quellcodes mit unterschiedlichen Variablennamen und unterschiedlichen Kommentaren beide in der Lage wären, denselben Vertrag zu verifizieren. Damit kann ein böswilliger Akteur täuschende Kommentare hinzufügen oder irreführende Variablennamen im Quellcode vergeben und den Vertrag mit einem anderen Quellcode als dem ursprünglichen Quellcode verifizieren lassen.

Es ist möglich, dies zu vermeiden, indem dem Bytecode zusätzliche Daten angehängt werden, die als _kryptografische Garantie_ für die Exaktheit des Quellcodes und als _Fingerabdruck_ der Kompilierungsinformationen dienen. Die notwendigen Informationen finden sich in den [Vertrags-Metadaten von Solidity](https://docs.soliditylang.org/en/latest/metadata.html), und der Hash dieser Datei wird an das Ende des Bytecodes des Vertrags angehängt. Sie können dies im [Metadaten-Playground](https://playground.sourcify.dev) in Aktion sehen.

Die Metadaten-Datei enthält Informationen über die Kompilierung des Vertrags, einschließlich der Compiler-Einstellungen sowie der Namen und Hashes der Quelldateien. Das bedeutet, wenn sich eine der Kompilierungseinstellungen oder auch nur ein Byte in einer der Quelldateien ändert, ändert sich die Metadaten-Datei. Folglich ändert sich auch der Hash der Metadaten-Datei, der an den Bytecode angehängt ist. Das bedeutet, wenn der Bytecode eines Vertrags + der angehängte Metadaten-Hash mit dem angegebenen Quellcode und den Kompilierungseinstellungen übereinstimmen, können wir sicher sein, dass dies exakt derselbe Quellcode ist, der in der ursprünglichen Kompilierung verwendet wurde, nicht einmal ein einziges Byte ist anders.

Diese Art der Verifizierung, die den Metadaten-Hash nutzt, wird als **„[exakte Übereinstimmung](https://docs.sourcify.dev/docs/exact-match-vs-match/)“** (früher „vollständige“ oder „perfekte“ Übereinstimmung) bezeichnet. Wenn die Metadaten-Hashes nicht übereinstimmen oder bei der Verifizierung nicht berücksichtigt werden, handelt es sich um eine **„Übereinstimmung“** (früher „teilweise Übereinstimmung“): Der Code des Vertrags ist verifiziert, aber seine Quelldateien können von den ursprünglichen abweichen, zum Beispiel bei Kommentaren oder Dateinamen. Es ist möglich, [bösartigen Code einzufügen](https://samczsun.com/hiding-in-plain-sight/), der sich ohne eine exakte Übereinstimmung nicht im verifizierten Quellcode widerspiegeln würde. Die meisten Entwickler sind sich exakter Übereinstimmungen nicht bewusst und behalten die Metadaten-Datei ihrer Kompilierung nicht, sodass Übereinstimmungen ohne den Metadaten-Hash bisher die häufigste Methode zur Verifizierung von Verträgen waren.

## Warum ist die Quellcode-Verifizierung wichtig? {#importance-of-source-code-verification}

### Vertrauenslosigkeit {#trustlessness}

Vertrauenslosigkeit ist wohl die größte Prämisse für Smart Contracts und [Dezentrale Anwendungen (Dapps)](/developers/docs/dapps/). Smart Contracts sind „unveränderlich“ und können nicht geändert werden; ein Vertrag führt nur die Geschäftslogik aus, die zum Zeitpunkt der Bereitstellung im Code definiert wurde. Das bedeutet, dass Entwickler und Unternehmen den Code eines Vertrags nach dem Bereitstellen auf Ethereum nicht mehr manipulieren können.

Damit ein Smart Contract vertrauenslos ist, sollte der Vertragscode für eine unabhängige Verifizierung verfügbar sein. Während der kompilierte Bytecode für jeden Smart Contract öffentlich auf der Blockchain verfügbar ist, ist die Low-Level-Sprache schwer zu verstehen – sowohl für Entwickler als auch für Benutzer.

Projekte reduzieren Vertrauensannahmen, indem sie den Quellcode ihrer Verträge veröffentlichen. Dies führt jedoch zu einem weiteren Problem: Es ist schwierig zu verifizieren, dass der veröffentlichte Quellcode mit dem Vertrags-Bytecode übereinstimmt. In diesem Szenario geht der Wert der Vertrauenslosigkeit verloren, da Benutzer darauf vertrauen müssen, dass Entwickler die Geschäftslogik eines Vertrags nicht ändern (d. h. durch Ändern des Bytecodes), bevor sie ihn auf der Blockchain bereitstellen.

Tools zur Quellcode-Verifizierung bieten Garantien, dass die Quellcode-Dateien eines Smart Contracts mit dem Assembly-Code übereinstimmen. Das Ergebnis ist ein vertrauensloses Ökosystem, in dem Benutzer Dritten nicht blind vertrauen, sondern stattdessen den Code verifizieren, bevor sie Gelder in einen Vertrag einzahlen.

### Benutzersicherheit {#user-safety}

Bei Smart Contracts steht in der Regel viel Geld auf dem Spiel. Dies erfordert höhere Sicherheitsgarantien und die Verifizierung der Logik eines Smart Contracts vor dessen Nutzung. Das Problem ist, dass skrupellose Entwickler Benutzer täuschen können, indem sie bösartigen Code in einen Smart Contract einfügen. Ohne Verifizierung können bösartige Smart Contracts [Hintertüren](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), umstrittene Zugriffskontrollmechanismen, ausnutzbare Schwachstellen und andere Dinge aufweisen, die die Benutzersicherheit gefährden und unentdeckt bleiben würden.

Die Veröffentlichung der Quellcode-Dateien eines Smart Contracts erleichtert es Interessierten, wie z. B. Auditoren, den Vertrag auf potenzielle Angriffsvektoren zu bewerten. Wenn mehrere Parteien einen Smart Contract unabhängig voneinander verifizieren, haben Benutzer stärkere Garantien für dessen Sicherheit.

## Wie man den Quellcode für Ethereum-Smart-Contracts verifiziert {#source-code-verification-for-ethereum-smart-contracts}

[Das Bereitstellen eines Smart Contracts auf Ethereum](/developers/docs/smart-contracts/deploying/) erfordert das Senden einer Transaktion mit einer Daten-Payload (kompilierter Bytecode) an eine spezielle Adresse. Die Daten-Payload wird durch die Kompilierung des Quellcodes generiert, zuzüglich der [Konstruktor-Argumente](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) der Vertragsinstanz, die an die Daten-Payload in der Transaktion angehängt werden. Die Kompilierung ist deterministisch, was bedeutet, dass sie immer dieselbe Ausgabe (d. h. Vertrags-Bytecode) erzeugt, wenn dieselben Quelldateien und Kompilierungseinstellungen (z. B. Compiler-Version, Optimierer) verwendet werden. Die Namen und Pfade der Quelldateien sind ebenfalls Teil dieser Eingabe: Sie werden in den Metadaten aufgezeichnet, sodass das Umbenennen einer Datei den Metadaten-Hash ändert.

<SourceVerifyDiagram />

Die Verifizierung eines Smart Contracts umfasst im Grunde die folgenden Schritte:

1. Eingabe der Quelldateien und Kompilierungseinstellungen in einen Compiler.

2. Der Compiler gibt den Bytecode des Vertrags aus.

3. Abrufen des Bytecodes des bereitgestellten Vertrags an einer bestimmten Adresse (mit `eth_getCode`).

4. Vergleichen des bereitgestellten Bytecodes mit dem neu kompilierten Bytecode. Wenn die Codes übereinstimmen, wird der Vertrag mit dem angegebenen Quellcode und den Kompilierungseinstellungen verifiziert.

5. Wenn zusätzlich die Metadaten-Hashes am Ende des Bytecodes übereinstimmen, handelt es sich um eine exakte Übereinstimmung.

Verifizierer können auch den Erstellungs-Bytecode des Vertrags vergleichen: den Code, der ihn bereitgestellt hat (für einen Vertrag, der direkt von einem Konto bereitgestellt wurde, die Eingabe der Bereitstellungs-Transaktion), was der kompilierte Bytecode gefolgt von den codierten [Konstruktor-Argumenten](https://docs.soliditylang.org/en/latest/contracts.html#constructor) ist.

Beachten Sie, dass dies eine vereinfachte Beschreibung der Verifizierung ist und es viele Ausnahmen gibt, die damit nicht funktionieren würden, wie z. B. das Vorhandensein [unveränderlicher Variablen](https://docs.sourcify.dev/docs/immutables/).

## Tools zur Quellcode-Verifizierung {#source-code-verification-tools}

Der traditionelle Prozess der Verifizierung von Verträgen kann komplex sein. Aus diesem Grund gibt es Tools zur Verifizierung des Quellcodes für auf Ethereum bereitgestellte Smart Contracts. Diese Tools automatisieren große Teile der Quellcode-Verifizierung und kuratieren auch verifizierte Verträge zum Nutzen der Benutzer.

### Etherscan {#etherscan}

Obwohl Etherscan hauptsächlich als [Ethereum-Block-Explorer](/developers/docs/data-and-analytics/block-explorers/) bekannt ist, bietet es auch einen [Dienst zur Quellcode-Verifizierung](https://etherscan.io/verifyContract) für Entwickler und Benutzer von Smart Contracts an.

Etherscan ermöglicht es Ihnen, den Vertrags-Bytecode aus der ursprünglichen Daten-Payload (Quellcode, Bibliotheksadresse, Compiler-Einstellungen, Vertragsadresse usw.) neu zu kompilieren. Wenn der neu kompilierte Bytecode mit dem Bytecode (und den Konstruktor-Parametern) des Onchain-Vertrags verknüpft ist, dann [ist der Vertrag verifiziert](https://info.etherscan.com/types-of-contract-verification/).

Sobald er verifiziert ist, erhält der Quellcode Ihres Vertrags das Label „Verified“ und wird auf Etherscan veröffentlicht, damit andere ihn prüfen können. Er wird auch dem Bereich [Verified Contracts](https://etherscan.io/contractsVerified/) hinzugefügt – einem Repository von Smart Contracts mit verifizierten Quellcodes.

Etherscan ist das am häufigsten verwendete Tool zur Verifizierung von Verträgen. Es kennzeichnet jeden verifizierten Vertrag danach, [wie er übereinstimmte](https://info.etherscan.com/types-of-contract-verification/): eine exakte Übereinstimmung des Erstellungs-Bytecodes und der Konstruktor-Argumente des Vertrags, eine Laufzeit-Übereinstimmung nur seines bereitgestellten Bytecodes oder eine ähnliche Übereinstimmung, die automatisch vergeben wird, wenn der Bytecode eines Vertrags mit dem eines bereits verifizierten Vertrags übereinstimmt. Die exakte Übereinstimmung von Etherscan bezieht sich auf den Erstellungs-Bytecode und die Konstruktor-Argumente; es ist nicht dieselbe Unterscheidung wie die oben beschriebene exakte Übereinstimmung und Übereinstimmung.

[Mehr über die Verifizierung von Verträgen auf Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) ist ein Open-Source-Block-Explorer, der auch einen [Vertragsverifizierungsdienst](https://eth.blockscout.com/contract-verification) für Entwickler und Benutzer von Smart Contracts anbietet. Als Open-Source-Alternative bietet Blockscout Transparenz darüber, wie die Verifizierung durchgeführt wird, und ermöglicht Community-Beiträge zur Verbesserung des Verifizierungsprozesses.

Ähnlich wie andere Verifizierungsdienste ermöglicht es Ihnen Blockscout, den Quellcode Ihres Vertrags zu verifizieren, indem der Bytecode neu kompiliert und mit dem bereitgestellten Vertrag verglichen wird. Sobald er verifiziert ist, erhält Ihr Vertrag den Verifizierungsstatus und der Quellcode wird öffentlich für Audits und Interaktionen zugänglich. Verifizierte Verträge werden auch im [Repository für verifizierte Verträge](https://eth.blockscout.com/verified-contracts) von Blockscout aufgelistet, um das Durchsuchen und die Erkennung zu erleichtern.

### Sourcify {#sourcify}

[Sourcify](https://verify.sourcify.dev) ist ein weiteres Tool zur Verifizierung von Verträgen, das Open Source und dezentral ist. Es ist kein Block-Explorer und verifiziert Verträge nur in [verschiedenen EVM-basierten Netzwerken](https://docs.sourcify.dev/docs/chains). Es fungiert als öffentliche Infrastruktur, auf der andere Tools aufbauen können, und zielt darauf ab, menschenfreundlichere Vertragsinteraktionen mithilfe der [Application Binary Interface (ABI)](/developers/docs/smart-contracts/compiling/#web-applications) und der [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html)-Kommentare zu ermöglichen, die in der Metadaten-Datei zu finden sind.

Sourcify meldet, ob ein Vertrag eine exakte Übereinstimmung mit dem Metadaten-Hash ist oder eine Übereinstimmung ohne diesen, sowohl für seinen Erstellungs- als auch für seinen bereitgestellten Bytecode. Seine verifizierten Verträge sind öffentlich: Sie können über seine Programmierschnittstelle (API) abgefragt und als [Datensatz](https://docs.sourcify.dev/docs/repository/) heruntergeladen werden. Sourcify gibt seine Verifizierungen an Block-Explorer wie Blockscout, Routescan und Etherscan weiter und teilt eine Datenbank verifizierter Verträge mit Blockscout und Routescan über die [Verifier Alliance](https://verifieralliance.org/).

Die Metadaten-Datei enthält auch die IPFS-Hashes der Quelldateien, und der an den Bytecode angehängte Metadaten-Hash ist selbst ein IPFS-Hash. Wenn ein Entwickler die Metadaten und Quelldateien auf [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/) veröffentlicht, kann jeder die genauen Quellen eines Vertrags allein aus seinem Bytecode abrufen, solange die Dateien auf IPFS verfügbar bleiben. Ein Vertrag kann verifiziert werden, indem die Metadaten-Datei und die Quelldateien über seine API oder die [Benutzeroberfläche (UI)](https://verify.sourcify.dev) bereitgestellt werden, oder durch die Verwendung von Plugins für Entwicklungstools wie Hardhat und Foundry. Der [Monitor](https://docs.sourcify.dev/docs/monitoring/) von Sourcify überwacht auch neue Verträge auf den Chains, denen er folgt, und verifiziert sie automatisch, wenn ihre Metadaten und Quelldateien auf IPFS veröffentlicht werden.

[Mehr über die Verifizierung von Verträgen auf Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

Die [Tenderly-Plattform](https://tenderly.co/) ermöglicht es Web3-Entwicklern, Smart Contracts zu erstellen, zu testen, zu überwachen und zu betreiben. Durch die Kombination von Debugging-Tools mit Beobachtbarkeit und Infrastruktur-Bausteinen hilft Tenderly Entwicklern, die Entwicklung von Smart Contracts zu beschleunigen. Um die Funktionen von Tenderly vollständig nutzen zu können, müssen Entwickler die [Quellcode-Verifizierung](https://docs.tenderly.co/contract-verification) mit verschiedenen Methoden durchführen.

Es ist möglich, einen Vertrag privat oder öffentlich zu verifizieren. Wenn er privat verifiziert wird, ist der Smart Contract nur für Sie (und andere Mitglieder in Ihrem Projekt) sichtbar. Die öffentliche Verifizierung eines Vertrags macht ihn für jeden sichtbar, der die Tenderly-Plattform nutzt.

Sie können Ihre Verträge über das [Dashboard](https://docs.tenderly.co/contract-verification), das [Tenderly-Hardhat-Plugin](https://docs.tenderly.co/contract-verification/hardhat) oder [Foundry](https://docs.tenderly.co/contract-verification/foundry) verifizieren.

Bei der Verifizierung von Verträgen über das Dashboard müssen Sie die Quelldatei oder die vom Solidity-Compiler generierte Metadaten-Datei, die Adresse/das Netzwerk und die Compiler-Einstellungen importieren.

Die Verwendung des Tenderly-Hardhat-Plugins ermöglicht mehr Kontrolle über den Verifizierungsprozess mit weniger Aufwand, sodass Sie zwischen automatischer (No-Code) und manueller (Code-basierter) Verifizierung wählen können.

## Weiterführende Literatur {#further-reading}

- [Verifizierung des Vertrags-Quellcodes](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
