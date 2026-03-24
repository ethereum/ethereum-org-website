---
title: Pectra 7702-Richtlinien
description: "Erfahren Sie mehr über 7702 im Pectra-Release"
lang: de
---

# Pectra 7702

## Zusammenfassung {#abstract}

EIP 7702 definiert einen Mechanismus, um einem EOA Code hinzuzufügen. Dieser Vorschlag ermöglicht es EOAs, den herkömmlichen Ethereum-Konten, kurzfristige Funktionsverbesserungen zu erhalten, was die Benutzerfreundlichkeit von Anwendungen erhöht. Dies geschieht durch das Setzen eines Zeigers auf bereits bereitgestellten Code unter Verwendung eines neuen Transaktionstyps: 4.

Dieser neue Transaktionstyp führt eine Autorisierungsliste ein. Jedes Autorisierungs-Tupel in der Liste ist definiert als

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** ist die Delegation (bereits bereitgestellter Bytecode, der vom EOA verwendet wird)
**chain_id** sperrt die Autorisierung auf eine bestimmte Chain (oder 0 für alle Chains)
**nonce** sperrt die Autorisierung auf eine bestimmte Konto-Nonce
(**y_parity, r, s**) ist die Signatur des Autorisierungs-Tupels, definiert als keccak(0x05 || rlp ([chain_id ,address, nonce])) durch den Private-Key des EOA, für das die Autorisierung gilt (auch als Autorität bezeichnet)

Eine Delegation kann durch Delegieren an die Null-Adresse zurückgesetzt werden.

Der Private-Key des EOA behält nach der Delegation die volle Kontrolle über das Konto. Beispielsweise macht die Delegation an einen Safe das Konto nicht zu einer Mehrfachsignatur, da es immer noch einen einzigen Schlüssel gibt, der jede Signaturrichtlinie umgehen kann. Zukünftig sollten Entwickler bei der Gestaltung davon ausgehen, dass jeder Teilnehmer im System ein Smart Contract sein könnte. Für Smart Contract-Entwickler ist es nicht mehr sicher anzunehmen, dass sich `tx.origin` auf ein EOA bezieht.

## Best Practices {#best-practices}

**Kontoabstraktion (Account Abstraction)**: Ein Delegationsvertrag sollte sich an den breiteren Standards der Kontoabstraktion (AA) von Ethereum orientieren, um die Kompatibilität zu maximieren. Insbesondere sollte er idealerweise ERC-4337-konform oder -kompatibel sein.

**Erlaubnisfreies und zensurresistentes Design**: Ethereum legt Wert auf erlaubnisfreie Teilnahme. Ein Delegationsvertrag DARF KEINEN einzelnen „vertrauenswürdigen“ Relayer oder Dienst fest codieren oder sich darauf verlassen. Dies würde das Konto unbrauchbar machen, wenn der Relayer offline geht. Funktionen wie Batching (z. B. approve+transferFrom) können vom EOA selbst ohne einen Relayer genutzt werden. Für Anwendungsentwickler, die erweiterte Funktionen nutzen möchten, die durch 7702 ermöglicht werden (Gas-Abstraktion, datenschutzfreundliche Abhebungen), wird ein Relayer benötigt. Obwohl es verschiedene Relayer-Architekturen gibt, empfehlen wir die Verwendung von [4337-Bundlern](https://www.erc4337.io/bundlers), die mindestens auf [Entry Point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) verweisen, weil:

- Sie standardisierte Schnittstellen für das Relaying bieten
- Sie integrierte Paymaster-Systeme enthalten
- Sie Vorwärtskompatibilität gewährleisten
- Sie Zensurresistenz durch einen [öffentlichen Mempool](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool) unterstützen können
- Sie erfordern können, dass die init-Funktion nur vom [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) aufgerufen wird

Mit anderen Worten: Jeder sollte als Transaktionssponsor/-relayer fungieren können, solange er die erforderliche gültige Signatur oder UserOperation vom Konto bereitstellt. Dies gewährleistet Zensurresistenz: Wenn keine benutzerdefinierte Infrastruktur erforderlich ist, können die Transaktionen eines Benutzers nicht willkürlich durch ein Gatekeeping-Relay blockiert werden. Beispielsweise funktioniert das [Delegation Toolkit von MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) ausdrücklich mit jedem ERC-4337-Bundler oder Paymaster auf jeder Chain, anstatt einen MetaMask-spezifischen Server zu erfordern.

**Dapps-Integration über Wallet-Schnittstellen**:

Da Wallets bestimmte Delegationsverträge für EIP-7702 auf eine Whitelist setzen werden, sollten Dapps nicht erwarten, 7702-Autorisierungen direkt anzufordern. Stattdessen sollte die Integration über standardisierte Wallet-Schnittstellen erfolgen:

- **ERC-5792 (`wallet_sendCalls`)**: Ermöglicht es Dapps, Wallets zur Ausführung gebündelter Aufrufe aufzufordern, was Funktionen wie Transaktions-Batching und Gas-Abstraktion erleichtert.

- **ERC-6900**: Ermöglicht es Dapps, modulare Smart-Account-Funktionen wie Sitzungsschlüssel und Kontowiederherstellung über von der Wallet verwaltete Module zu nutzen.

Durch die Nutzung dieser Schnittstellen können Dapps auf Smart-Account-Funktionen zugreifen, die durch EIP-7702 bereitgestellt werden, ohne Delegationen direkt zu verwalten, was Kompatibilität und Sicherheit über verschiedene Wallet-Implementierungen hinweg gewährleistet.

> Hinweis: Es gibt keine standardisierte Methode für Dapps, 7702-Autorisierungssignaturen direkt anzufordern. Dapps müssen sich auf spezifische Wallet-Schnittstellen wie ERC-6900 verlassen, um die Funktionen von EIP-7702 zu nutzen.

Für weitere Informationen:

- [ERC-5792-Spezifikation](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900-Spezifikation](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Vermeidung von Vendor-Lock-in**: In Übereinstimmung mit dem oben Gesagten ist eine gute Implementierung herstellerneutral und interoperabel. Dies bedeutet oft die Einhaltung aufkommender Standards für Smart Accounts. Beispielsweise verwendet [Alchemys Modular Account](https://github.com/alchemyplatform/modular-account) den ERC-6900-Standard für modulare Smart Accounts und ist mit Blick auf eine „erlaubnisfreie interoperable Nutzung“ konzipiert.

**Wahrung der Privatsphäre**: Obwohl die Privatsphäre auf der Blockchain begrenzt ist, sollte ein Delegationsvertrag bestrebt sein, die Offenlegung von Daten und die Verknüpfbarkeit zu minimieren. Dies kann durch die Unterstützung von Funktionen wie Gas-Zahlungen in ERC-20-Token (sodass Benutzer kein öffentliches ETH-Guthaben unterhalten müssen, was den Datenschutz und die UX verbessert) und einmaligen Sitzungsschlüsseln (die die Abhängigkeit von einem einzigen langfristigen Schlüssel verringern) erreicht werden. Beispielsweise ermöglicht EIP-7702 die Zahlung von Gas in Token über gesponserte Transaktionen, und eine gute Implementierung wird es einfach machen, solche Paymaster zu integrieren, ohne mehr Informationen als nötig preiszugeben. Darüber hinaus bedeutet die Off-Chain-Delegation bestimmter Genehmigungen (unter Verwendung von Signaturen, die auf der Blockchain verifiziert werden) weniger Transaktionen auf der Blockchain mit dem primären Schlüssel des Benutzers, was dem Datenschutz zugutekommt. Konten, die die Verwendung eines Relayers erfordern, zwingen Benutzer dazu, ihre IP-Adressen preiszugeben. PublicMempools verbessern dies: Wenn sich eine Transaktion/UserOp durch den Mempool verbreitet, kann man nicht erkennen, ob sie von der IP stammt, die sie gesendet hat, oder ob sie nur über das P2P-Protokoll weitergeleitet wurde.

**Erweiterbarkeit und modulare Sicherheit**: Konto-Implementierungen sollten erweiterbar sein, damit sie sich mit neuen Funktionen und Sicherheitsverbesserungen weiterentwickeln können. Aktualisierbarkeit ist mit EIP-7702 von Natur aus möglich (da ein EOA in Zukunft immer an einen neuen Vertrag delegieren kann, um seine Logik zu aktualisieren). Über die Aktualisierbarkeit hinaus ermöglicht ein gutes Design Modularität – z. B. Plug-in-Module für verschiedene Signaturschemata oder Ausgabenrichtlinien – ohne dass eine vollständige Neuimplementierung erforderlich ist. Das Account Kit von Alchemy ist ein Paradebeispiel dafür, da es Entwicklern ermöglicht, Validierungsmodule (für verschiedene Signaturtypen wie ECDSA, BLS usw.) und Ausführungsmodule für benutzerdefinierte Logik zu installieren. Um eine größere Flexibilität und Sicherheit in EIP-7702-fähigen Konten zu erreichen, werden Entwickler ermutigt, an einen Proxy-Vertrag zu delegieren, anstatt direkt an eine spezifische Implementierung. Dieser Ansatz ermöglicht nahtlose Upgrades und Modularität, ohne dass für jede Änderung zusätzliche EIP-7702-Autorisierungen erforderlich sind.

Vorteile des Proxy-Musters:

- **Aktualisierbarkeit**: Aktualisieren Sie die Vertragslogik, indem Sie den Proxy auf einen neuen Implementierungsvertrag verweisen lassen.

- **Benutzerdefinierte Initialisierungslogik**: Integrieren Sie Initialisierungsfunktionen innerhalb des Proxys, um notwendige Zustandsvariablen sicher einzurichten.

Beispielsweise demonstriert der [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe), wie ein Proxy genutzt werden kann, um Delegationen in EIP-7702-kompatiblen Konten sicher zu initialisieren und zu verwalten.

Nachteile des Proxy-Musters:

- **Abhängigkeit von externen Akteuren**: Sie müssen sich darauf verlassen, dass ein externes Team kein Upgrade auf einen unsicheren Vertrag durchführt.

## Sicherheitsüberlegungen {#security-considerations}

**Reentrancy-Schutz**: Mit der Einführung der EIP-7702-Delegation kann das Konto eines Benutzers dynamisch zwischen einem extern verwalteten Konto (EOA) und einem Smart Contract (SC) wechseln. Diese Flexibilität ermöglicht es dem Konto, sowohl Transaktionen zu initiieren als auch das Ziel von Aufrufen zu sein. Infolgedessen haben Szenarien, in denen ein Konto sich selbst aufruft und externe Aufrufe tätigt, `msg.sender` gleich `tx.origin`, was bestimmte Sicherheitsannahmen untergräbt, die sich zuvor darauf verließen, dass `tx.origin` immer ein EOA ist.

Für Smart Contract-Entwickler ist es nicht mehr sicher anzunehmen, dass sich `tx.origin` auf ein EOA bezieht. Ebenso ist die Verwendung von `msg.sender == tx.origin` als Schutzmaßnahme gegen Reentrancy-Angriffe keine zuverlässige Strategie mehr.

Zukünftig sollten Entwickler bei der Gestaltung davon ausgehen, dass jeder Teilnehmer im System ein Smart Contract sein könnte. Alternativ könnten sie einen expliziten Reentrancy-Schutz implementieren, indem sie Reentrancy-Guards mit einem `nonReentrant`-Modifikator-Muster verwenden. Wir empfehlen, einem geprüften Modifikator zu folgen, z. B. [Open Zeppelins Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Sie könnten auch eine [transiente Speichervariable](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html) verwenden.

**Sicherheitsüberlegungen zur Initialisierung**

Die Implementierung von EIP-7702-Delegationsverträgen bringt spezifische Sicherheitsherausforderungen mit sich, insbesondere im Hinblick auf den Initialisierungsprozess. Eine kritische Schwachstelle entsteht, wenn die Initialisierungsfunktion (`init`) atomar mit dem Delegationsprozess gekoppelt ist. In solchen Fällen könnte ein Frontrunner die Delegationssignatur abfangen und die `init`-Funktion mit geänderten Parametern ausführen, wodurch er möglicherweise die Kontrolle über das Konto übernimmt.

Dieses Risiko ist besonders relevant, wenn versucht wird, bestehende Smart Contract Account (SCA)-Implementierungen mit EIP-7702 zu verwenden, ohne deren Initialisierungsmechanismen zu ändern.

**Lösungen zur Minderung von Initialisierungsschwachstellen**

- Implementieren Sie `initWithSig`  
  Ersetzen Sie die Standard-`init`-Funktion durch eine `initWithSig`-Funktion, die erfordert, dass der Benutzer die Initialisierungsparameter signiert. Dieser Ansatz stellt sicher, dass die Initialisierung nur mit ausdrücklicher Zustimmung des Benutzers fortgesetzt werden kann, wodurch die Risiken einer unbefugten Initialisierung gemindert werden.

- Nutzen Sie den EntryPoint von ERC-4337  
  Fordern Sie, dass die Initialisierungsfunktion ausschließlich vom ERC-4337-EntryPoint-Vertrag aufgerufen wird. Diese Methode nutzt das standardisierte Validierungs- und Ausführungs-Framework von ERC-4337 und fügt dem Initialisierungsprozess eine zusätzliche Sicherheitsebene hinzu.  
  _(Siehe: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Durch die Übernahme dieser Lösungen können Entwickler die Sicherheit von EIP-7702-Delegationsverträgen erhöhen und sich gegen potenzielle Frontrunning-Angriffe während der Initialisierungsphase absichern.

**Speicherkollisionen** Das Delegieren von Code löscht den vorhandenen Speicher nicht. Bei der Migration von einem Delegationsvertrag zu einem anderen bleiben die Restdaten des vorherigen Vertrags erhalten. Wenn der neue Vertrag dieselben Speicherplätze nutzt, diese aber anders interpretiert, kann dies zu unbeabsichtigtem Verhalten führen. Wenn beispielsweise die anfängliche Delegation an einen Vertrag erfolgte, bei dem ein Speicherplatz einen `bool` darstellt, und die nachfolgende Delegation an einen Vertrag erfolgt, bei dem derselbe Platz einen `uint` darstellt, kann die Diskrepanz zu unvorhersehbaren Ergebnissen führen.

**Phishing-Risiken** Mit der Implementierung der EIP-7702-Delegation können die Vermögenswerte auf dem Konto eines Benutzers vollständig durch Smart Contracts kontrolliert werden. Wenn ein Benutzer sein Konto unwissentlich an einen bösartigen Vertrag delegiert, könnte ein Angreifer leicht die Kontrolle erlangen und Gelder stehlen. Bei Verwendung von `chain_id=0` wird die Delegation auf alle Chain-IDs angewendet. Delegieren Sie nur an einen unveränderlichen Vertrag (delegieren Sie niemals an einen Proxy) und nur an Verträge, die mit CREATE2 bereitgestellt wurden (mit Standard-Initcode – keine metamorphen Verträge), damit der Bereitsteller nicht anderswo etwas anderes an derselben Adresse bereitstellen kann. Andernfalls gefährdet Ihre Delegation Ihr Konto auf allen anderen EVM-Chains.

Wenn Benutzer delegierte Signaturen ausführen, sollte der Zielvertrag, der die Delegation erhält, klar und deutlich angezeigt werden, um Phishing-Risiken zu mindern.

**Minimale vertrauenswürdige Angriffsfläche & Sicherheit**: Obwohl ein Delegationsvertrag Flexibilität bietet, sollte er seine Kernlogik minimal und überprüfbar halten. Der Vertrag ist faktisch eine Erweiterung des EOA des Benutzers, sodass jeder Fehler katastrophal sein kann. Implementierungen sollten den Best Practices der Smart Contract-Sicherheitscommunity folgen. Beispielsweise müssen Konstruktor- oder Initialisierungsfunktionen sorgfältig abgesichert werden – wie von Alchemy hervorgehoben, könnte ein ungeschützter Initialisierer bei Verwendung eines Proxy-Musters unter 7702 einem Angreifer ermöglichen, das Konto zu übernehmen. Teams sollten darauf abzielen, den Code auf der Blockchain einfach zu halten: Der 7702-Vertrag von Ambire umfasst nur etwa 200 Zeilen Solidity, wodurch die Komplexität bewusst minimiert wird, um Fehler zu reduzieren. Es muss ein Gleichgewicht zwischen funktionsreicher Logik und der Einfachheit, die Audits erleichtert, gefunden werden.

### Bekannte Implementierungen {#known-implementations}

Aufgrund der Natur von EIP 7702 wird empfohlen, dass Wallets Vorsicht walten lassen, wenn sie Benutzern helfen, an einen Vertrag von Drittanbietern zu delegieren. Nachfolgend ist eine Sammlung bekannter Implementierungen aufgeführt, die geprüft wurden:

| Vertragsadresse | Quelle | Audits |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur) | [Audits](https://github.com/Uniswap/calibur/tree/main/audits) |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account) | [Audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits) |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol) | [Audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits) |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework) | [Audits](https://github.com/MetaMask/delegation-framework/tree/main/audits) |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Foundation AA team](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [Audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract) | [Audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) |

## Richtlinien für Hardware-Wallets {#hardware-wallet-guidelines}

Hardware-Wallets sollten keine willkürliche Delegation zulassen. Der Konsens im Bereich der Hardware-Wallets besteht darin, eine Liste vertrauenswürdiger Delegator-Verträge zu verwenden. Wir schlagen vor, die oben aufgeführten bekannten Implementierungen zuzulassen und andere von Fall zu Fall zu prüfen. Da die Delegation Ihres EOA an einen Vertrag die Kontrolle über alle Vermögenswerte übergibt, sollten Hardware-Wallets bei der Art und Weise, wie sie 7702 implementieren, vorsichtig sein.

### Integrationsszenarien für Begleit-Apps {#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

Da das EOA weiterhin wie gewohnt funktioniert, gibt es nichts zu tun.

Hinweis: Einige Vermögenswerte könnten durch den Delegationscode automatisch abgelehnt werden, wie z. B. ERC-1155-NFTs, und der Support sollte sich dessen bewusst sein.

#### Aware {#aware}

Benachrichtigen Sie den Benutzer, dass eine Delegation für das EOA vorliegt, indem Sie dessen Code überprüfen, und bieten Sie optional an, die Delegation zu entfernen.

#### Gemeinsame Delegation {#common-delegation}

Der Hardware-Anbieter setzt bekannte Delegationsverträge auf eine Whitelist und implementiert deren Unterstützung in der Begleit-Software. Es wird empfohlen, einen Vertrag mit vollständiger ERC-4337-Unterstützung zu wählen.

EOAs, die an einen anderen delegiert wurden, werden als Standard-EOAs behandelt.

#### Benutzerdefinierte Delegation {#custom-delegation}

Der Hardware-Anbieter implementiert seinen eigenen Delegationsvertrag, fügt ihn den Listen hinzu und implementiert seine Unterstützung in der Begleit-Software. Es wird empfohlen, einen Vertrag mit vollständiger ERC-4337-Unterstützung zu erstellen.

EOAs, die an einen anderen delegiert wurden, werden als Standard-EOAs behandelt.