---
title: Pectra 7702-Richtlinien
description: "Erfahren Sie mehr über 7702 in der Pectra-Version"
lang: de
---

# Pectra 7702

## Zusammenfassung {#abstract}

EIP 7702 definiert einen Mechanismus, um einem EOA Code hinzuzufügen. Dieser Vorschlag ermöglicht es EOAs, den alten Ethereum-Konten, kurzfristige Funktionsverbesserungen zu erhalten, was die Benutzerfreundlichkeit von Anwendungen erhöht. Dies geschieht durch das Setzen eines Zeigers auf bereits bereitgestellten Code mithilfe eines neuen Transaktionstyps: 4.

Dieser neue Transaktionstyp führt eine Autorisierungsliste ein. Jedes Autorisierungstupel in der Liste ist definiert als

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** ist die Delegation (bereits bereitgestellter Bytecode, der vom EOA verwendet wird)
**chain_id** sperrt die Autorisierung auf eine bestimmte Kette (oder 0 für alle Ketten)
**nonce** sperrt die Autorisierung auf eine bestimmte Konto-Nonce
(**y_parity, r, s**) ist die Signatur des Autorisierungstupels, die durch den privaten Schlüssel des EOA, auf den sich die Autorisierung bezieht (auch als Autorität bezeichnet), als keccak(0x05 || rlp ([chain_id ,address, nonce])) definiert wird

Eine Delegation kann zurückgesetzt werden, indem an die Null-Adresse delegiert wird.

Der private Schlüssel des EOA behält nach der Delegation die volle Kontrolle über das Konto. Wenn Sie zum Beispiel an ein Safe delegieren, wird das Konto nicht zu einem Multisig, da es immer noch einen einzigen Schlüssel gibt, der jede Signierrichtlinie umgehen kann. In Zukunft sollten Entwickler davon ausgehen, dass jeder Teilnehmer im System ein Smart Contract sein könnte. Für Smart-Contract-Entwickler ist es nicht mehr sicher anzunehmen, dass sich `tx.origin` auf einen EOA bezieht.

## Bewährte Praktiken {#best-practices}

**Kontoabstraktion**: Ein Delegationsvertrag sollte mit den breiteren Kontoabstraktionsstandards (AA) von Ethereum übereinstimmen, um die Kompatibilität zu maximieren. Insbesondere sollte er idealerweise ERC-4337-konform oder kompatibel sein.

**Erlaubnisfreies und zensurresistentes Design**: Ethereum schätzt die erlaubnisfreie Teilnahme. Ein Delegationsvertrag DARF KEINEN einzelnen „vertrauenswürdigen“ Relayer oder Dienst fest programmieren oder sich darauf verlassen. Dies würde das Konto lahmlegen, wenn der Relayer offline geht. Funktionen wie Batching (z. B. approve+transferFrom) können vom EOA selbst ohne einen Relayer verwendet werden. Für Anwendungsentwickler, die erweiterte Funktionen nutzen möchten, die durch 7702 (Gasabstraktion, datenschutzwahrende Abhebungen) ermöglicht werden, benötigen Sie einen Relayer. Obwohl es verschiedene Relayer-Architekturen gibt, empfehlen wir die Verwendung von [4337 Bundlern](https://www.erc4337.io/bundlers), die mindestens auf den [Einstiegspunkt 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) verweisen, denn:

- Sie bieten standardisierte Schnittstellen für das Relaying
- Sie enthalten eingebaute Paymaster-Systeme
- Sie gewährleisten die Vorwärtskompatibilität
- Sie können Zensurresistenz durch einen [öffentlichen Mempool](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool) unterstützen
- Sie können erfordern, dass die init-Funktion nur vom [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) aufgerufen wird

Mit anderen Worten, jeder sollte als Transaktionssponsor/Relayer agieren können, solange er die erforderliche gültige Signatur oder UserOperation vom Konto bereitstellt. Dies gewährleistet Zensurresistenz: Wenn keine benutzerdefinierte Infrastruktur erforderlich ist, können die Transaktionen eines Benutzers nicht willkürlich durch ein kontrollierendes Relais blockiert werden. Zum Beispiel arbeitet [MetaMasks Delegation Toolkit](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) explizit mit jedem ERC-4337-Bundler oder Paymaster auf jeder Kette zusammen, anstatt einen MetaMask-spezifischen Server zu erfordern.

**Dapps-Integration über Wallet-Schnittstellen**:

Da Wallets spezifische Delegationsverträge für EIP-7702 auf die Whitelist setzen werden, sollten Dapps nicht erwarten, 7702-Autorisierungen direkt anzufordern. Stattdessen sollte die Integration über standardisierte Wallet-Schnittstellen erfolgen:

- **ERC-5792 (`wallet_sendCalls`)**: Ermöglicht Dapps, Wallets aufzufordern, gebündelte Aufrufe auszuführen, was Funktionalitäten wie Transaktionsbündelung und Gas-Abstraktion erleichtert.

- **ERC-6900**: Ermöglicht Dapps, modulare Smart-Account-Funktionen wie Sitzungsschlüssel und Kontowiederherstellung über von Wallets verwaltete Module zu nutzen.

Durch die Nutzung dieser Schnittstellen können Dapps auf Smart-Account-Funktionalitäten zugreifen, die von EIP-7702 bereitgestellt werden, ohne Delegationen direkt zu verwalten, was Kompatibilität und Sicherheit über verschiedene Wallet-Implementierungen hinweg gewährleistet.

> Hinweis: Es gibt keine standardisierte Methode für Dapps, 7702-Autorisierungssignaturen direkt anzufordern. Dapps müssen sich auf spezifische Wallet-Schnittstellen wie ERC-6900 verlassen, um die Funktionen von EIP-7702 zu nutzen.

Weitere Informationen:

- [ERC-5792-Spezifikation](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900-Spezifikation](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Vermeidung von Herstellerbindung**: Im Einklang mit dem oben Genannten ist eine gute Implementierung herstellerneutral und interoperabel. Dies bedeutet oft, sich an aufkommende Standards für Smart Accounts zu halten. Zum Beispiel verwendet [Alchemys modulares Konto](https://github.com/alchemyplatform/modular-account) den ERC-6900-Standard für modulare Smart Accounts und wurde mit Blick auf eine „erlaubnisfreie interoperable Nutzung“ konzipiert.

**Datenschutz**: Obwohl der Datenschutz on-chain begrenzt ist, sollte ein Delegationsvertrag bestrebt sein, die Datenexposition und Verknüpfbarkeit zu minimieren. Dies kann durch die Unterstützung von Funktionen wie Gas-Zahlungen in ERC-20-Tokens (sodass Benutzer kein öffentliches ETH-Guthaben halten müssen, was den Datenschutz und die UX verbessert) und einmaligen Sitzungsschlüsseln (die die Abhängigkeit von einem einzigen Langzeitschlüssel verringern) erreicht werden. Zum Beispiel ermöglicht EIP-7702 das Bezahlen von Gas in Tokens über gesponserte Transaktionen, und eine gute Implementierung wird es einfach machen, solche Paymaster zu integrieren, ohne mehr Informationen als nötig preiszugeben. Darüber hinaus bedeutet die Off-Chain-Delegation bestimmter Genehmigungen (unter Verwendung von Signaturen, die on-chain verifiziert werden), dass weniger On-Chain-Transaktionen mit dem Primärschlüssel des Benutzers stattfinden, was dem Datenschutz dient. Konten, die die Verwendung eines Relayers erfordern, zwingen Benutzer, ihre IP-Adressen preiszugeben. Öffentliche Mempools verbessern dies. Wenn eine Transaktion/UserOp sich durch den Mempool ausbreitet, können Sie nicht feststellen, ob sie von der IP stammt, die sie gesendet hat, oder ob sie nur über das p2p-Protokoll weitergeleitet wurde.

**Erweiterbarkeit und modulare Sicherheit**: Kontenimplementierungen sollten erweiterbar sein, damit sie sich mit neuen Funktionen und Sicherheitsverbesserungen weiterentwickeln können. Upgrade-Fähigkeit ist mit EIP-7702 von Natur aus möglich (da ein EOA in Zukunft immer an einen neuen Vertrag delegieren kann, um seine Logik zu aktualisieren). Über die Upgrade-Fähigkeit hinaus ermöglicht ein gutes Design Modularität – z. B. Plug-in-Module für verschiedene Signaturschemata oder Ausgabenrichtlinien –, ohne dass eine vollständige Neuausbringung erforderlich ist. Das Account Kit von Alchemy ist ein Paradebeispiel, das Entwicklern die Installation von Validierungsmodulen (für verschiedene Signaturtypen wie ECDSA, BLS usw.) ermöglicht. und Ausführungsmodule für benutzerdefinierte Logik. Um eine größere Flexibilität und Sicherheit in EIP-7702-fähigen Konten zu erreichen, werden Entwickler ermutigt, an einen Proxy-Vertrag zu delegieren, anstatt direkt an eine spezifische Implementierung. Dieser Ansatz ermöglicht nahtlose Upgrades und Modularität, ohne dass für jede Änderung zusätzliche EIP-7702-Autorisierungen erforderlich sind.

Vorteile des Proxy-Musters:

- **Upgrade-Fähigkeit**: Aktualisieren Sie die Vertragslogik, indem Sie den Proxy auf einen neuen Implementierungsvertrag verweisen.

- **Benutzerdefinierte Initialisierungslogik**: Integrieren Sie Initialisierungsfunktionen in den Proxy, um die notwendigen Zustandsvariablen sicher einzurichten.

Zum Beispiel zeigt der [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe), wie ein Proxy genutzt werden kann, um Delegationen in EIP-7702-kompatiblen Konten sicher zu initialisieren und zu verwalten.

Nachteile des Proxy-Musters:

- **Abhängigkeit von externen Akteuren**: Sie müssen sich darauf verlassen, dass ein externes Team kein Upgrade auf einen unsicheren Vertrag durchführt.

## Sicherheitsüberlegungen {#security-considerations}

**Re-Entrancy-Schutz**: Mit der Einführung der EIP-7702-Delegation kann das Konto eines Benutzers dynamisch zwischen einem extern verwalteten Konto (EOA) und einem Smart Contract (SC) wechseln. Diese Flexibilität ermöglicht es dem Konto, sowohl Transaktionen zu initiieren als auch Ziel von Aufrufen zu sein. Infolgedessen werden Szenarien, in denen ein Konto sich selbst aufruft und externe Aufrufe tätigt, dazu führen, dass `msg.sender` gleich `tx.origin` ist, was bestimmte Sicherheitsannahmen untergräbt, die zuvor darauf beruhten, dass `tx.origin` immer ein EOA ist.

Für Smart-Contract-Entwickler ist es nicht mehr sicher anzunehmen, dass sich `tx.origin` auf einen EOA bezieht. Ebenso ist die Verwendung von `msg.sender == tx.origin` als Schutzmaßnahme gegen Re-Entrancy-Angriffe keine zuverlässige Strategie mehr.

In Zukunft sollten Entwickler davon ausgehen, dass jeder Teilnehmer im System ein Smart Contract sein könnte. Alternativ könnten sie einen expliziten Re-Entrancy-Schutz unter Verwendung von Re-Entrancy-Guards mit `nonReentrant`-Modifikator-Mustern implementieren. Wir empfehlen, einen auditierten Modifikator zu verwenden, z. B. [OpenZeppelins Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Sie könnten auch eine [transiente Speichervariable](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html) verwenden.

**Sicherheitsüberlegungen zur Initialisierung**

Die Implementierung von EIP-7702-Delegationsverträgen bringt spezifische Sicherheitsherausforderungen mit sich, insbesondere im Hinblick auf den Initialisierungsprozess. Eine kritische Schwachstelle entsteht, wenn die Initialisierungsfunktion (`init`) atomar mit dem Delegationsprozess gekoppelt ist. In solchen Fällen könnte ein Frontrunner die Delegationssignatur abfangen und die `init`-Funktion mit geänderten Parametern ausführen, wodurch er möglicherweise die Kontrolle über das Konto übernimmt.

Dieses Risiko ist besonders relevant, wenn versucht wird, bestehende Smart-Contract-Konto-Implementierungen (SCA) mit EIP-7702 zu verwenden, ohne deren Initialisierungsmechanismen zu ändern.

**Lösungen zur Minderung von Initialisierungsschwachstellen**

- Implement `initWithSig`  
  Ersetzen Sie die Standard-`init`-Funktion durch eine `initWithSig`-Funktion, bei der der Benutzer die Initialisierungsparameter signieren muss. Dieser Ansatz stellt sicher, dass die Initialisierung nur mit ausdrücklicher Zustimmung des Benutzers erfolgen kann, wodurch das Risiko einer unbefugten Initialisierung gemindert wird.

- Nutzen Sie den EntryPoint von ERC-4337  
  Verlangen Sie, dass die Initialisierungsfunktion ausschließlich vom ERC-4337 EntryPoint-Vertrag aufgerufen wird. Diese Methode nutzt das standardisierte Validierungs- und Ausführungsframework von ERC-4337 und fügt dem Initialisierungsprozess eine zusätzliche Sicherheitsebene hinzu.  
  _(Siehe: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Durch die Anwendung dieser Lösungen können Entwickler die Sicherheit von EIP-7702-Delegationsverträgen verbessern und sich vor potenziellen Frontrunning-Angriffen während der Initialisierungsphase schützen.

**Speicherkollisionen** Das Delegieren von Code löscht nicht den vorhandenen Speicher. Bei der Migration von einem Delegationsvertrag zu einem anderen bleiben die Restdaten des vorherigen Vertrags erhalten. Wenn der neue Vertrag dieselben Speicher-Slots verwendet, diese aber unterschiedlich interpretiert, kann dies zu unbeabsichtigtem Verhalten führen. Wenn beispielsweise die ursprüngliche Delegation an einen Vertrag erfolgte, bei dem ein Speicher-Slot einen `bool`-Wert darstellt, und die nachfolgende Delegation an einen Vertrag, bei dem derselbe Slot einen `uint`-Wert darstellt, kann die Nichtübereinstimmung zu unvorhersehbaren Ergebnissen führen.

**Phishing-Risiken** Mit der Implementierung der EIP-7702-Delegation können die Vermögenswerte auf dem Konto eines Benutzers vollständig von Smart Contracts kontrolliert werden. Wenn ein Benutzer sein Konto unwissentlich an einen bösartigen Vertrag delegiert, könnte ein Angreifer leicht die Kontrolle erlangen und Gelder stehlen. Bei Verwendung von `chain_id=0` wird die Delegation auf alle Chain-IDs angewendet. Delegieren Sie nur an einen unveränderlichen Vertrag (niemals an einen Proxy) und nur an Verträge, die mit CREATE2 bereitgestellt wurden (mit Standard-Initcode – keine metamorphen Verträge), damit der Bereitsteller nicht etwas anderes an dieselbe Adresse an anderer Stelle bereitstellen kann. Andernfalls gefährdet Ihre Delegation Ihr Konto auf allen anderen EVM-Ketten.

Wenn Benutzer delegierte Signaturen durchführen, sollte der Zielvertrag, der die Delegation erhält, klar und deutlich angezeigt werden, um Phishing-Risiken zu mindern.

**Minimale vertrauenswürdige Oberfläche & Sicherheit**: Obwohl ein Delegationsvertrag Flexibilität bietet, sollte seine Kernlogik minimal und auditierbar gehalten werden. Der Vertrag ist praktisch eine Erweiterung des EOA des Benutzers, sodass jeder Fehler katastrophale Folgen haben kann. Implementierungen sollten den besten Praktiken der Smart-Contract-Sicherheits-Community folgen. Zum Beispiel müssen Konstruktor- oder Initialisierungsfunktionen sorgfältig gesichert werden – wie von Alchemy hervorgehoben, könnte bei Verwendung eines Proxy-Musters unter 7702 ein ungeschützter Initialisierer einem Angreifer ermöglichen, das Konto zu übernehmen. Teams sollten darauf abzielen, den On-Chain-Code einfach zu halten: Der 7702-Vertrag von Ambire umfasst nur ~200 Zeilen Solidity, um die Komplexität bewusst zu minimieren und Fehler zu reduzieren. Es muss ein Gleichgewicht zwischen funktionsreicher Logik und der Einfachheit, die die Auditierung erleichtert, gefunden werden.

### Bekannte Implementierungen {#known-implementations}

Aufgrund der Natur von EIP 7702 wird empfohlen, dass Wallets Vorsicht walten lassen, wenn sie Benutzern helfen, an einen Drittanbietervertrag zu delegieren. Nachfolgend finden Sie eine Sammlung bekannter Implementierungen, die auditiert wurden:

| Vertragsadresse                            | Quelle                                                                                                                                         | Audits (Prüfungen)                                                                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                          | [Audits](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                          | [Audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                  | [Audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                              | [Audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [AA-Team der Ethereum Foundation](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [Audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                          | [Audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Hardware-Wallet-Richtlinien {#hardware-wallet-guidelines}

Hardware-Wallets sollten keine beliebige Delegation ermöglichen. Der Konsens im Bereich der Hardware-Wallets ist die Verwendung einer Liste vertrauenswürdiger Delegator-Verträge. Wir schlagen vor, die oben aufgeführten bekannten Implementierungen zuzulassen und andere von Fall zu Fall zu prüfen. Da die Delegation Ihres EOA an einen Vertrag die Kontrolle über alle Vermögenswerte gibt, sollten Hardware-Wallets bei der Implementierung von 7702 vorsichtig sein.

### Integrationsszenarien für Begleit-Apps {#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

Da der EOA weiterhin wie gewohnt funktioniert, gibt es nichts zu tun.

Hinweis: Einige Vermögenswerte könnten vom Delegationscode automatisch abgelehnt werden, wie z. B. ERC-1155-NFTs, und der Support sollte sich dessen bewusst sein.

#### Bewusst {#aware}

Benachrichtigen Sie den Benutzer, dass für den EOA eine Delegation vorhanden ist, indem Sie dessen Code überprüfen, und bieten Sie optional an, die Delegation zu entfernen.

#### Gängige Delegation {#common-delegation}

Der Hardware-Anbieter setzt bekannte Delegationsverträge auf die Whitelist und implementiert deren Unterstützung in der Software-Begleit-App. Es wird empfohlen, einen Vertrag mit voller ERC-4337-Unterstützung zu wählen.

EOAs, die an einen anderen delegiert wurden, werden als Standard-EOAs behandelt.

#### Benutzerdefinierte Delegation {#custom-delegation}

Der Hardware-Anbieter implementiert seinen eigenen Delegationsvertrag, fügt ihn den Listen hinzu und implementiert seine Unterstützung in der Software-Begleit-App. Es wird empfohlen, einen Vertrag mit voller ERC-4337-Unterstützung zu erstellen.

EOAs, die an einen anderen delegiert wurden, werden als Standard-EOAs behandelt.
