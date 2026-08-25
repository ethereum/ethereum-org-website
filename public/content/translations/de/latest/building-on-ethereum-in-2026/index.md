---
title: "Bauen auf Ethereum im Jahr 2026: Was sich geändert hat"
description: "Drei Protokoll-Upgrades seit 2023 haben zwei Dinge geändert, die für Ersteller wichtig sind: wie viel die Nutzung von Layer 1 (L1) kostet und was reguläre Wallets tun können. Ein praktischer Leitfaden für das Bauen auf Ethereum im Jahr 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "Gasgebühren"
  - "Kontoabstraktion"
  - "Protokoll-Upgrades"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Bauen auf Ethereum im Jahr 2026
lang: de
---

Wenn Ihr mentales Modell von Ethereum in den Jahren 2021 bis 2023 geprägt wurde, ist es veraltet. Drei Protokoll-Upgrades seitdem, [Dencun](/roadmap/dencun/) im März 2024, [Pectra](/roadmap/pectra/) im Mai 2025 und [Fusaka](/roadmap/fusaka/) im Dezember 2025, haben zwei Dinge geändert, die für Ersteller wichtig sind: wie viel die Nutzung von Layer 1 (L1) kostet und was reguläre Wallets tun können.

## Das Mainnet ist wieder günstig {#mainnet-is-cheap-again}

Das Gebührenregime von 2021 bis 2023 ist keine sichere Standardannahme mehr.

Stand 5. Mai 2026 zeigt der Gas-Tracker von Etherscan Standard-Gas bei etwa 0,15 Gwei, mit Tagesdurchschnitten von fast 0,5 Gwei im April. Ein einfacher ETH-Transfer kostet auf diesem Niveau weniger als einen Cent, wobei typische Tage in letzter Zeit im niedrigen einstelligen Cent-Bereich lagen. Der Trend war bei jedem der jüngsten Upgrades rückläufig, und das nächste, [Glamsterdam](/roadmap/glamsterdam/), wird die Gebühren voraussichtlich noch weiter senken. Das macht die Aussage „Das Ethereum Mainnet ist für die meisten Apps zu teuer“ zu einem veralteten Ausgangspunkt.

Wenn Sie eine einfache Faustregel suchen, nutzen Sie die Gas-Mathematik anstelle alter Mythen. Bei 0,5 Gwei, dem jüngsten April-Durchschnitt, und ETH bei etwa 2.350 $, sehen die beispielhaften Kosten wie folgt aus.

| Operation       | Verwendetes Gas | Beispielhafte Kosten |
| :-------------- | :---------- | :---------------- |
| ETH-Transfer    | 21.000      | **0,025 $**        |
| ERC-20-Transfer | \~65.000    | **0,076 $**        |
| ERC-20 genehmigen  | \~46.000    | **0,054 $**        |
| Tausch            | \~180.000   | **0,21 $**         |
| ERC-20-Bereitstellung   | \~1.200.000 | **1,41 $**         |

Dies sind Beispiele, keine Garantien. Die Kosten ändern sich mit dem ETH-Preis, dem Gaspreis und der Komplexität des Vertrags. Gwei-Werte können innerhalb eines normalen Monats stark schwanken, während sich die Dollarkosten kaum bewegen, da Rollups mittlerweile etwa 95 Prozent der Transaktionen von Ethereum abwickeln und L1 typischerweise weit unter seinem Block-Ziel läuft. Die Mainnet-Gebühren sind jetzt niedrig genug, dass viele Apps sinnvoll im Mainnet laufen können.

### Warum die Kosten gesunken sind {#why-costs-fell}

Drei Upgrades haben den Großteil der Arbeit geleistet.

Dencun (März 2024) führte EIP-4844 ein und gab Rollups durch Blobs eine eigene Datenspur mit einem separaten Gebührenmarkt. Rollups konkurrierten nicht mehr mit dem gewöhnlichen Ausführungsverkehr um denselben Blockspace.

Pectra wurde am 7. Mai 2025 aktiviert. EIP-7691 erhöhte den Blob-Transaktionsdurchsatz von 3 Ziel- / 6 Maximal-Blobs pro Block auf 6 Ziel- / 9 Maximal-Blobs, was die günstige Datenspur, die Rollups nutzen, erweiterte und die Layer-2-Gebühren (L2) weiter senkte.

Fusaka wurde am 3. Dezember 2025 aktiviert. Die wichtigste Kapazitätsänderung war PeerDAS, das es Validatoren ermöglicht, Blob-Daten stichprobenartig zu prüfen, anstatt jeden Blob vollständig herunterzuladen, und genau diese Stichprobenprüfung macht höhere Blob-Anzahlen auf der Netzwerkebene sicher. Parallel dazu erhöhte die Community das L1-Gaslimit im Jahr 2025 von 30 Mio. auf 60 Mio., und EIP-7935 von Fusaka standardisierte 60 Mio. als neuen Standard. EIP-7825 begrenzt jede einzelne Transaktion auf \~16,78 Mio. Gas, was die meisten Apps nie bemerken werden, aber sehr große Bereitstellungen und monolithische Multicalls müssen nun in diesen Rahmen passen. EIP-7951 fügte außerdem die native secp256r1 (P-256)-Verifizierung im Mainnet hinzu, was die Verifizierung von Passkey- und WebAuthn-Signaturen in Konto-Abläufen deutlich günstiger macht.

Der Nettoeffekt ist, dass das Mainnet nicht mehr wie eine permanent überlastete Chain bepreist wird.

## Wie EIP-7702 das Kontomodell verändert {#how-eip-7702-changes-the-account-model}

Pectra lieferte auch EIP-7702 aus, das regulären Wallets Zugang zu Smart Account-Verhalten wie Bündelung, Gas-Sponsoring, Sitzungsschlüsseln, Wiederherstellungsabläufen und Passkey-freundlicher UX gibt, ohne dass der Benutzer zu einem neuen Konto migrieren muss.

Es funktioniert durch das Hinzufügen eines neuen Transaktionstyps (Typ `0x04`, `SetCode`), der es einem EOA (Externally Owned Account) ermöglicht, einen Zeiger auf bereits bereitgestellten Vertragscode zu setzen. Der Benutzer behält dieselbe Adresse, der ursprüngliche EOA-Schlüssel behält die endgültige Kontrolle über das Konto, und die Delegation kann später geändert oder auf die Nulladresse zurückgesetzt werden.

Für App-Ersteller besteht die praktische Änderung darin, die Wallet nach dem Ergebnis zu fragen und nicht nach der Low-Level-Einrichtung von EIP-7702. Wenn ein Benutzer in einem Ablauf genehmigen und tauschen muss, fordern Sie eine Bündelung über ERC-5792 `wallet_sendCalls` an. Die Wallet kann entscheiden, ob sie EIP-7702, ERC-4337 oder ein anderes Kontosystem verwendet.

Der delegierte Code ist eine Sicherheitsgrenze. Wenn eine Wallet ein EOA auf fehlerhaften oder bösartigen Code verweisen lässt, kann dieser Code Aufrufe im Namen des Benutzers tätigen, einschließlich Token-Genehmigungen, Transfers und App-Interaktionen. Ersteller sollten Delegationsziele wie Wallet-Infrastruktur behandeln, sich auf von Wallets geprüfte Implementierungen verlassen und Benutzer nicht leichtfertig bitten, an App-gesteuerten Code zu delegieren.

## Was dies an der Art und Weise zu bauen ändert {#what-this-changes-about-how-to-build}

Die Standardfrage für Ersteller lautete früher: „Welche Layer 2 (L2) ist günstig genug?“ Diese Frage hat immer noch Antworten, aber es ist nicht mehr die einzige. Da die L1-Gebühren bei normaler Auslastung im Bereich von Cent pro Transaktion liegen und EIP-7702 es jeder Wallet ermöglicht, Smart Account-UX anzubieten, ohne Adressen zu migrieren, ist die nützlichere Standardfrage, ob die App im Mainnet leben sollte oder ob eine bestimmte L2 einen echten Verteilungs-, Liquiditäts- oder UX-Vorteil bietet, den L1 nicht bieten kann.

Auch die Konto-Annahme ändert sich. Entwerfen Sie neue Apps nicht so, als wäre jedes Benutzerkonto ein einfaches ECDSA-EOA, das ETH halten muss, bevor es etwas Nützliches tun kann. Bevorzugen Sie Bündelungs-Schnittstellen auf Wallet-Ebene wie ERC-5792 `wallet_sendCalls`, gehen Sie davon aus, dass Gas-Sponsoring und Sitzungsschlüssel zu normalen Wallet-Funktionen werden, und behandeln Sie Passkeys und Wiederherstellungsabläufe als Teil der Konto-UX-Oberfläche und nicht als separate Onboarding-Hacks.

## Was als Nächstes kommt {#whats-next}

Das nächste benannte Upgrade von Ethereum ist Glamsterdam, mit Block-level Access Lists (BALs) und verankerter Proposer-Builder-Trennung (ePBS) als Hauptthemen. Zusammen machen diese es sicher, das Block-Gaslimit von heute 60 Millionen auf etwa 200 Millionen zu erhöhen, was Erstellern mehr L1-Kapazität zum Arbeiten lässt. Die Aktivierung wird in der zweiten Hälfte des Jahres 2026 erwartet. Nach Glamsterdam soll [Hegotá](https://forkcast.org/upgrade/hegota/) folgen, wobei Fork-choice enforced Inclusion Lists (FOCIL) als Hauptfunktion ausgewählt wurden.

Für Ersteller sind die verfolgenswerten Punkte mehr L1-Kapazität (BALs), eine zuverlässigere Transaktionseinbindung (FOCIL) und der Weg zur nativen Kontoabstraktion. ePBS, das andere Hauptthema von Glamsterdam, ist hauptsächlich eine Infrastrukturänderung, die eine Vertrauensabhängigkeit bei der L1-Transaktionseinbindung beseitigt. Die direkte Oberflächenänderung auf App-Ebene ist gering.

Bei BALs geht es darum, L1 bei wachsender Nutzung günstig zu halten. Im Klartext würde ein Block mit einer Karte der Konten und des Speichers geliefert werden, die er berührt. Clients können diese Karte verwenden, um Daten vorab abzurufen und unabhängige Transaktionen parallel auszuführen, was es sicherer macht, das L1-Gaslimit zu erhöhen, ohne dass Blöcke zu langsam zu verifizieren sind. Der praktische Effekt für Ersteller ist, dass mehr Aktivität ins Mainnet zurückkehren kann, ohne automatisch das Gas-Regime von 2021 bis 2023 wiederherzustellen.

Bei FOCIL geht es darum, gültige Transaktionen in Blöcke zu bekommen, selbst wenn ein Block-Produzent sie lieber weglassen würde. Wenn heute die Partei, die einen Block erstellt, eine Transaktion ignoriert, hat der Rest des Protokolls nur begrenzte Möglichkeiten, sie zu erzwingen. Mit EIP-7805 würden mehrere Validatoren im Grunde sagen: „Wir haben diese gültigen Transaktionen im öffentlichen Mempool warten sehen.“ Der nächste Block muss sie dann aufnehmen, oder die Validatoren können sich weigern, diesen Block zu unterstützen. Für Ersteller ist dies wichtig, wenn ein zuverlässiger Zugang zu L1 Teil des Produkts ist, einschließlich Tools für die Privatsphäre, regulierter Onramps oder Apps, die Benutzer bedienen, die möglicherweise von einigen Infrastrukturanbietern gefiltert werden.

Für App-Ersteller ist das Hegotá-Thema, das am genauesten beobachtet werden sollte, die Kontoabstraktion. EIP-8141, Frame-Transaktionen, würde einen Transaktionstyp hinzufügen, bei dem Validierung, Ausführung und Gas-Zahlung in Frames aufgeteilt sind. In der Praxis bedeutet das, dass ein Smart Account eine Transaktion selbst verifizieren, seine eigenen Signatur-Regeln definieren, genehmigen kann, wer das Gas bezahlt, und eine oder mehrere Aktionen ausführen kann, ohne vom ERC-4337 EntryPoint, Bundlern oder von der App betriebenen Relayern abhängig zu sein.

Das ändert die Produktannahmen. Gas-Sponsoring wird zu einem nativen Konto-Muster anstelle einer Infrastruktur, die jede App separat einrichten muss. Alternative Signatur-Schemata werden einfacher zu unterstützen, einschließlich Passkeys heute und einem Weg weg von ECDSA, falls eine Post-Quanten-Migration notwendig wird. Wenn EIP-8141 oder ein ähnliches natives Kontoabstraktions-Design umgesetzt wird, verschiebt sich das Ersteller-Modell von „ein EOA signiert eine Transaktion“ zu „ein Konto definiert, wie es eine Transaktion validiert, bezahlt und ausführt.“

Das ist die Richtung, kein Versprechen. EIP-8141 ist ein Entwurf und wird Stand Mai 2026 nur „für die Aufnahme in Betracht gezogen“ in Hegotá, was bedeutet, dass Client-Teams darüber diskutieren, sich aber nicht verpflichtet haben, es in diesem Upgrade auszuliefern. Der praktische Bau-Pfad für Konto-UX im Jahr 2026 ist immer noch EIP-7702 plus ERC-4337 Wallet-Abläufe, aber Ersteller sollten so entwerfen, als ob programmierbare Konten zum Standard-Kontomodell werden.

## Was man jetzt anders bauen sollte {#what-to-build-differently-now}

Beginnen Sie damit, alte Gebührenannahmen zu überprüfen. Wenn Ihr Bereitstellungs-Playbook das Ethereum Mainnet standardmäßig immer noch als eine 10- bis 30-Gwei-Umgebung behandelt, leitet es wahrscheinlich zu viel Arbeit von L1 weg. Das Mainnet ist es wert, zuerst in Betracht gezogen zu werden, wenn Ihre App von geteilter Liquidität, Komponierbarkeit mit bestehenden Protokollen, Neutralität oder einem hochwertigen Zustand abhängt, der dort leben sollte, wo die Sicherheit und der soziale Konsens von Ethereum am stärksten sind.

Nutzen Sie L2s aus den Gründen, die immer noch wichtig sind, einschließlich Verteilung, sehr hohem Transaktionsvolumen, App-spezifischen Ökosystemen oder Kosten pro Aktion, die so nah wie möglich bei null liegen müssen. Der Punkt ist nicht „Mainnet für alles“. Der Punkt ist, dass „Mainnet ist zu teuer“ nicht länger der erste Filter sein sollte.

Auf der Kontoseite sollten Sie gegen Wallet-Fähigkeiten anstatt gegen rohe EOAs bauen. Ihr Frontend sollte bereit sein für gebündelte Aufrufe, gesponsertes Gas, Sitzungsschlüssel, Passkeys und Wiederherstellungsabläufe, die über Wallets ankommen. EIP-7702 und ERC-4337 sind heute die praktischen Werkzeuge. Die native Kontoabstraktion ist die Richtung, die als Nächstes verfolgt werden sollte.

Hören Sie auf, das Ethereum Mainnet als die teure Abwicklungsschicht zu behandeln, die Sie nur am Ende berühren, und hören Sie auf, Benutzerkonten als statische ECDSA-Schlüssel zu behandeln, die ETH halten müssen, bevor sie etwas tun können. Ethereum bewegt sich im Jahr 2026 in Richtung günstigerer L1-Ausführung und programmierbarer Konten. Bauen Sie für diese Welt.

## Weiterführende Literatur {#further-reading}

- [Pectra Mainnet-Ankündigung](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Fusaka Mainnet-Ankündigung](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Update zu den Protokoll-Prioritäten für 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Checkpoint #9 (Apr 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Pectra 7702-Richtlinien auf ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 Set Code for EOAs](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Block-level Access Lists](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Fork-choice enforced Inclusion Lists (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Frame Transaction](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast Hegotá Upgrade](https://forkcast.org/upgrade/hegota/)
- [Etherscan Gas-Tracker](https://etherscan.io/gastracker)
- [EIP-7773 Glamsterdam Hardfork Meta](https://eips.ethereum.org/EIPS/eip-7773)
- [Glamsterdam-Roadmap auf ethereum.org](https://ethereum.org/roadmap/glamsterdam/)