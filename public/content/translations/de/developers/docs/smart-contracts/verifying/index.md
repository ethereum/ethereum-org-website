---
title: Überprüfen von Smart Contracts
description: Eine Übersicht über die Quellcodeverifizierung für Ethereum-Smart-Contracts
lang: de
---

[Smart Contracts](/developers/docs/smart-contracts/) werden so entworfen, dass sie „vertrauenslos“ sind. Das bedeutet, die Benutzer sollten keinen dritten Parteien (z. B. Entwicklern oder Unternehmen) vertrauen müssen, bevor sie mit dem Vertrag interagieren. Die Voraussetzung für Vertrauenslosigkeit ist, dass die Benutzer und andere Entwickler in der Lage sein müssen, den Quellcode eines Smart Contracts zu verifizieren. Nach der Quellcodeverifizierung können Benutzer und Entwicklern sicher sein, dass der veröffentlichte Vertragscode derselbe Code ist, der unter dieser Vertragsaddresse auf der Ethereum-Blockchain läuft.

Entscheidend ist dabei der Unterschied zwischen „Quellcodeverifizierung“ und „[formaler Verifizierung](/developers/docs/smart-contracts/formal-verification/)“. Die Quellcodeverifizierung, die unten detailliert erklärt wird, bezieht sich auf die Verifizierung, dass ein beliebiger Quellcode eines Smart Contracts in einer High-Level-Sprache (etwa Solidity) zu demselben Bytecode kompiliert, der unter der Vertragsadresse ausgeführt wird. Die formale Verifizierung bezieht sich hingegen darauf, die Korrektheit eines Smart Contracts zu verifizieren und sagen zu können, dass der Contract sich wie erwartet verhält. Obwohl die Vertragsverifizierung kontextbezogen ist, bezieht sie sich meistens auf die Quellcodeverifizierung.

## Was ist Quellcodeverifizierung? {#what-is-source-code-verification}

Bevor ein Smart Contract auf der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) veröffentlicht wird, [kompilieren](/developers/docs/smart-contracts/compiling/) die Entwickler den Quellcode des Vertrags – also Anweisungen, die in [Solidity](/developers/docs/smart-contracts/languages/) oder einer anderen High-Level-Sprache geschrieben wurden – nach Bytecode. Die Kompilierung von Quellcode in Bytecode (z. B. Low-Level, Maschinenanweisungen) ist notwendig, um die Vertragslogik in der EVM auszuführen, da die EVM keine High-Level-Anweisungen interpretieren kann.

Die Quellcodeverifizierung besteht nun darin, den Quellcode eines Smart Contracts mit dem während der Vertragserstellung genutzten, kompilierten Bytecode zu vergleichen, um Unterschiede festzustellen. Die Verifizierung von Smart Contracts ist wichtig, da sich der angegebene Vertragscode von dem Code, der auf der Blockchain läuft, unterscheiden könnte.

Die Verifizierung von Smart Contracts macht es möglich, mithilfe der High-Level-Sprache, in der ein Vertrag verfasst wurde, zu untersuchen, was dieser wirklich tut, ohne den dazugehörigen Maschinencode lesen zu müssen. Funktionen, Werte und in der Regel die Variablennamen und Kommentare bleiben beim kompilierten und veröffentlichten originalen Quellcode identisch. Dies erleichtert es deutlich, den Code zu lesen. Die Quellcodeverifizierung leitet außerdem die Codedokumentation in die Wege, mit der die Endbenutzer prüfen können, was der Zweck eines bestimmten Smart Contracts ist.

### Was ist eine vollständige Verifizierung? {#full-verification}

Einige Teil des Quellcodes, wie Kommentare oder Variablennamen, haben keinen Einfluss auf den kompilierten Bytecode. Daraus folgt, dass zwei Quellcodes mit unterschiedlichen Variablennamen und unterschiedlichen Kommentaren dennoch in der Lage wären, denselben Vertrag zu verifizieren. Auf diese Weise könnten Personen mit bösartigen Absichten täuschende Kommentare schreiben oder irreführende Variablennamen im Quellcode angeben und dafür sorgen, dass der Vertrag mit einem anderen Quellcode als im Originalvertrag verifiziert wird.

Es ist möglich, dies durch an den Bytecode angehängte zusätzliche Daten zu vermeiden, die als _kryptografische Garantie_ für die Exaktheit des Quellcodes und als _Fingerabdruck_ der zu kompilierenden Informationen dienen. Die dazu notwendigen Informationen finden Sie in den [Vertragsmetadaten von Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html) und der Hash dieser Datei wird an den Bytecode eines Vertrags angehängt. Live können Sie dies im [Metadata Playground](https://playground.sourcify.dev) nachverfolgen.

Die Metadatendatei enthält Informationen über die Kompilierung des Vertrags, einschließlich der Quelldateien und ihrer Hashes. Das bedeutet, dass sich die Metadatendatei ändert, wenn sich eine der Kompilierungseinstellungen oder auch nur ein einzelnes Byte in einer der Quelldateien ändert. Folglich ändert sich auch der Hash der Metadatendatei, der an den Bytecode angehängt ist. Das bedeutet: Wenn der Bytecode eines Vertrags plus der angehängte Metadaten-Hash mit dem angegebenen Quellcode und den Kompilierungseinstellungen übereinstimmt, können wir sicher sein, dass es sich um genau denselben Quellcode handelt, der schon bei der ursprünglichen Kompilierung verwendet wurde – kein einziges Byte unterscheidet sich.

Diese Art der Verifizierung, die den Metadaten-Hash nutzt, wird als **„[vollständige Verifizierung](https://docs.sourcify.dev/docs/full-vs-partial-match/)“** (auch „perfekte Verifizierung“) bezeichnet. Wenn die Metadaten-Hashes nicht übereinstimmen oder bei der Verifizierung nicht berücksichtigt werden, würde es sich um eine „partielle Übereinstimmung“ handeln, was die derzeit gebräuchlichere Methode zur Verifizierung von Verträgen ist. Es ist möglich, [bösartigen Code einzuschleusen](https://samczsun.com/hiding-in-plain-sight/), der in dem verifizierten Quellcode ohne vollständige Verifizierung nicht sichtbar wäre. Die meisten Entwickler sind sich nicht bewusst, dass die vollständige Verifizierung existiert und bewahren die Metadatendatei ihrer Kompilierung nicht auf. Aus diesem Grund ist bisher die partielle Verifizierung die gängige Methode zur Vertragsverifizierung.

## Warum ist die Quellcodeverifizierung wichtig? {#importance-of-source-code-verification}

### Vertrauenslosigkeit {#trustlessness}

Die Vertrauenslosigkeit ist zweifellos eine der wichtigsten Voraussetzungen für Smart Contracts und [dezentrale Anwendungen (DApps)](/developers/docs/dapps/). Smart Contracts sind „unveränderlich“ und können nicht modifiziert werden; ein Vertrag führt nur die Geschäftslogik aus, die zum Zeitpunkt der Veröffentlichung im Code festgelegt wurde. Das bedeutet, dass Entwickler und Unternehmen den Code eines Vertrags nach dessen Veröffentlichung auf Ethereum nicht manipulieren können.

Damit ein Smart Contract vertrauenslos ist, sollte der Vertragscode für eine unabhängige Verifizierung verfügbar sein. Der kompilierte Bytecode ist zwar für jeden Smart Contract öffentlich auf der Blockchain verfügbar, die Low-Level-Sprache ist allerdings schwer verständlich – sowohl für Entwickler als auch für Benutzer.

In Projekten werden Vertrauensannahmen durch die Veröffentlichung des Quellcodes der Verträge reduziert. Aber dies führt zu einem weiteren Problem: Die Verifizierung, dass der veröffentlichte Quellcode mit dem Bytecode des Vertrags übereinstimmt, ist schwierig. In diesem Szenario geht der Wert der Vertrauenslosigkeit verloren, da die Benutzer den Entwicklern vertrauen müssen, dass diese die Geschäftslogik eines Vertrags (z. B. durch Ändern des Bytecodes) vor der Veröffentlichung auf der Blockchain nicht ändern.

Quellcode-Verifizierungswerkzeuge bieten Garantien dafür, dass die Quellcodedateien eines Smart Contracts mit dem Assembly-Code übereinstimmen. Das Ergebnis ist ein vertrauensloses Ökosystem, in dem Benutzer nicht blind Dritten vertrauen, sondern den Code verifizieren, bevor sie Geldmittel in einen Vertrag einzahlen.

### Benutzersicherheit {#user-safety}

Bei Smart Contracts steht oft eine Menge Geld auf dem Spiel. Das macht höhere Sicherheitsgarantien und eine Verifizierung der Logik eines Smart Contracts, bevor er verwendet wird, erforderlich. Das Problem ist, dass skrupellose Entwickler Benutzer täuschen können, indem sie bösartigen Code in einen Smart Contract einfügen. Ohne Verifizierung können bösartige Smart Contracts [Hintertüren](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), umstrittene Zugriffskontrollmechanismen, ausnutzbare Schwachstellen und andere Sicherheitsrisiken enthalten, die unentdeckt bleiben würden.

Die Veröffentlichung der Quellcodedateien eines Smart Contracts erleichtert es Interessierten, wie zum Beispiel Auditoren, den Vertrag hinsichtlich potenzieller Angriffsvektoren zu bewerten. Wenn mehrere Parteien unabhängig voneinander einen Smart Contract verifizieren, bietet dies Benutzern stärkere Sicherheitsgarantien.

## So funktioniert die Quellcodeverifizierung für Ethereum-Smart-Contracts {#source-code-verification-for-ethereum-smart-contracts}

Damit [ein Smart Contract auf Ethereum veröffentlicht](/developers/docs/smart-contracts/deploying/) werden kann, ist es erforderlich, eine Transaktion mit einem Datenpayload (kompilierten Bytecode) an eine spezielle Adresse zu senden. Der Datenpayload wird durch das Kompilieren des Quellcodes erstellt, wobei die [Konstruktorargumente](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) des Vertragsfalls an den Datenpayload in der Transaktion angehängt werden. Die Kompilierung ist deterministisch, was bedeutet, dass immer dasselbe Ergebnis (z. B. Vertrags-Bytecode) herauskommt, wenn dieselben Quelldateien und Kompilierungseinstellungen (z. B. Compiler-Version, Optimizer) verwendet werden.

![Ein Diagramm, das die Verifizierung des Quellcodes von Smart Contracts zeigt](./source-code-verification.png)

Die Verifizierung eines Smart Contracts umfasst im Wesentlichen die folgenden Schritte:

1. Die Quelldateien und Kompilierungseinstellungen in einen Compiler eingeben.

2. Der Compiler gibt den Bytecode des Vertrags aus.

3. Den Bytecode des veröffentlichten Vertrags an einer gegebenen Adresse abrufen.

4. Den veröffentlichten Bytecode mit dem erneut kompilierten Bytecode vergleichen. Wenn die Codes übereinstimmen, wird der Vertrag mit dem Quellcode und den Kompilierungseinstellungen verifiziert, die angegeben wurden.

5. Wenn außerdem die Metadaten-Hashes am Ende des Bytecodes übereinstimmen, liegt eine vollständige Übereinstimmung vor.

Beachten Sie, dass dies eine vereinfachte Beschreibung der Verifizierung ist und es viele Ausnahmen gibt, bei denen dies nicht funktionieren würde, wie zum Beispiel bei [unveränderlichen Variablen](https://docs.sourcify.dev/docs/immutables/).

## Werkzeuge zur Quellcodeverifizierung {#source-code-verification-tools}

Der traditionelle Prozess zur Verifizierung von Verträgen kann komplex sein. Deshalb gibt es Werkzeuge zur Verifizierung des Quellcodes für auf Ethereum veröffentlichte Smart Contracts. Diese Werkzeuge automatisieren große Teile der Quellcodeverifizierung und kuratieren außerdem verifizierte Verträge zum Nutzen der Benutzer.

### Etherscan {#etherscan}

Obwohl Etherscan hauptsächlich als [Ethereum-Blockchain-Explorer](/developers/docs/data-and-analytics/block-explorers/) bekannt ist, bietet es auch einen [Dienst zur Quellcodeverifizierung](https://etherscan.io/verifyContract) für Entwickler und Benutzer von Smart Contracts an.

Etherscan macht es möglich, den Vertrags-Bytecode aus dem ursprünglichen Daten-Payload (Quellcode, Bibliotheksadresse, Kompilierungseinstellungen, Vertragsadresse usw.) neu zu kompilieren Wenn der neu kompilierte Bytecode mit dem Bytecode (und den Konstruktorparametern) des On-Chain-Vertrags in Verbindung gebracht wird, [ist der Vertrag verifiziert](https://info.etherscan.com/types-of-contract-verification/).

Sobald der Vertrag verifiziert ist, erhält der Quellcode des Vertrags ein „Verified“-Label und wird auf Etherscan veröffentlicht, damit andere ihn prüfen können. Er wird auch in den Abschnitt [Verifizierte Verträge](https://etherscan.io/contractsVerified/) aufgenommen – einem Repository von Smart Contracts mit verifiziertem Quellcode.

Etherscan ist das am häufigsten verwendete Werkzeug zur Verifizierung von Verträgen. Allerdings hat die Vertragsverifizierung von Etherscan einen Nachteil: Sie vergleicht den **Metadaten-Hash** des On-Chain-Bytecodes nicht mit dem erneut kompilierten Bytecode. Daher sind die Übereinstimmungen bei Etherscan nur teilweise Übereinstimmungen.

[Mehr zur Verifizierung von Verträgen auf Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) ist ein weiteres Werkzeug zur Verifizierung von Verträgen, das auf Open-Source-Software basiert und dezentralisiert ist. Es ist kein Block Explorer und verifiziert Verträge nur auf [verschiedenen EVM-basierten Netzwerken](https://docs.sourcify.dev/docs/chains). Sourcify fungiert als öffentliche Infrastruktur, auf der andere Tools aufbauen können, und verfolgt das Ziel, menschenfreundlichere Vertragsinteraktionen zu ermöglichen. Zu diesem Zweck greift es auf die Kommentare [ABI](/developers/docs/smart-contracts/compiling/#web-applications)- und [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) aus der Metadatendatei zurück.

Im Gegensatz zu Etherscan unterstützt Sourcify vollständige Übereinstimmungen mit dem Metadaten-Hash. Die verifizierten Verträge werden in seinem [öffentlichen Repository](https://docs.sourcify.dev/docs/repository/) auf HTTP und [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs) bereitgestellt, wobei IPFS ein dezentrales, [inhaltsadressiertes](https://web3.storage/docs/concepts/content-addressing/) Speichersystem ist. Dies ermöglicht das Abrufen der Metadatendatei eines Vertrags über IPFS, da der angehängte Metadaten-Hash ein IPFS-Hash ist.

Darüber hinaus kann auch auf die Quellcodedateien über IPFS zugegriffen werden, da IPFS-Hashes dieser Dateien ebenfalls in den Metadaten enthalten sind. Ein Vertrag kann verifiziert werden, indem die Metadatendatei und die Quelldateien über die API, die [UI](https://sourcify.dev/#/verifier) oder die Plug-ins bereitgestellt werden. Das Sourcify-Überwachungstool achtet auch auf Vertragserstellungen in neuen Blöcken und versucht, die Verträge zu verifizieren, wenn deren Metadaten und Quelldateien auf IPFS veröffentlicht wurden.

[Mehr über die Verifizierung von Verträgen auf Sourcify](https://blog.soliditylang.org/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

Die [Tenderly-Plattform](https://tenderly.co/) ermöglicht es Web3-Entwicklern, Smart Contracts zu erstellen, zu testen, zu überwachen und zu betreiben. Tenderly kombiniert Debugging-Werkzeuge mit Beobachtungs- und Infrastrukturbausteinen und hilft Entwicklern so dabei, die Entwicklung von Smart Contracts zu beschleunigen. Um die Funktionen von Tenderly vollständig nutzen zu können, müssen Entwickler mithilfe mehrerer Methoden [den Quellcode verifizieren](https://docs.tenderly.co/monitoring/contract-verification).

Es ist möglich, einen Vertrag privat oder öffentlich zu verifizieren. Wenn der Vertrag privat verifiziert wird, ist er nur für Sie (und andere Mitglieder Ihres Projekts) sichtbar. Eine öffentliche Verifizierung hat zur Folge, dass der Vertrag für alle Benutzer der Tenderly-Plattform sichtbar ist.

Sie können Ihre Verträge über das [Dashboard](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract), [das Tenderly-Hardhat-Plug-in](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin) oder die [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) verifizieren.

Bei der Verifizierung von Verträgen über das Dashboard müssen Sie die Quelldatei oder die vom Solidity-Compiler erzeugte Metadatendatei, die Adresse/das Netzwerk und die Compiler-Einstellungen importieren.

Die Verwendung des Tenderly-Hardhat-Plug-ins ermöglicht eine bessere Kontrolle über den Verifizierungsprozess bei gleichzeitig weniger Aufwand. Sie können mit dem Plug-in zwischen automatischer (kein Code erforderlich) und manueller (Code-basierter) Verifizierung wählen.

## Weiterführende Informationen {#further-reading}

- [Verifizierung des Quellcodes von Verträgen](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
