---
title: Kontoabstraktion
description: Ein Überblick über die Pläne von Ethereum, Benutzerkonten einfacher und sicherer zu machen
lang: de
summaryPoints:
  - Kontoabstraktion macht es viel einfacher, Smart-Contract-Wallets zu erstellen
  - Smart-Contract-Wallets erleichtern die Verwaltung des Zugriffs auf Ethereum-Konten erheblich
  - Verlorene und kompromittierte Schlüssel können mithilfe mehrerer Backups wiederhergestellt werden
---

Die meisten bestehenden Benutzer interagieren mit [Ethereum](/) über **[extern verwaltete Konten (Externally Owned Accounts, EOAs)](/glossary/#eoa)**. Dies schränkt die Art und Weise ein, wie Benutzer mit Ethereum interagieren können. Zum Beispiel macht es dies schwierig, Transaktionen gebündelt auszuführen (Batches), und erfordert, dass Benutzer immer ein ETH-Guthaben vorhalten, um Transaktionsgebühren zu bezahlen.

Kontoabstraktion ist ein Weg, diese Probleme zu lösen, indem sie es Benutzern ermöglicht, flexibel mehr Sicherheit und bessere Benutzererfahrungen in ihre Konten zu programmieren. Dies kann durch das [Upgraden von EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) geschehen, sodass sie von Smart Contracts gesteuert werden können. Es gibt auch einen anderen Weg, der das Hinzufügen eines [zweiten, separaten Transaktionssystems](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) beinhaltet, das parallel zum bestehenden Protokoll läuft. Unabhängig vom Weg ist das Ergebnis der Zugang zu Ethereum über Smart-Contract-Wallets, die entweder nativ als Teil des bestehenden Protokolls oder über ein zusätzliches Transaktionsnetzwerk unterstützt werden.

Smart-Contract-Wallets eröffnen dem Benutzer viele Vorteile, darunter:

- Definition eigener flexibler Sicherheitsregeln
- Wiederherstellung Ihres Kontos, wenn Sie die Schlüssel verlieren
- Aufteilung der Kontosicherheit auf vertrauenswürdige Geräte oder Personen
- Übernahme der Gas-Gebühren für jemand anderen oder Bezahlung der eigenen durch Dritte
- Bündelung von Transaktionen (z. B. einen Tausch in einem Durchgang genehmigen und ausführen)
- mehr Möglichkeiten für Entwickler von dezentralen Anwendungen (Dapps) und Wallets, die Benutzererfahrung innovativ zu gestalten

Diese Vorteile werden heute nicht nativ unterstützt, da nur extern verwaltete Konten ([EOAs](/glossary/#eoa)) Transaktionen starten können. EOAs sind einfach Schlüsselpaare aus öffentlichem und privatem Schlüssel. Sie funktionieren wie folgt:

- Wenn Sie den privaten Schlüssel haben, können Sie innerhalb der Regeln der Ethereum Virtual Machine (EVM) _alles_ tun.
- Wenn Sie den privaten Schlüssel nicht haben, können Sie _nichts_ tun.

Wenn Sie Ihre Schlüssel verlieren, können sie nicht wiederhergestellt werden, und gestohlene Schlüssel geben Dieben sofortigen Zugriff auf alle Gelder auf einem Konto.

Smart-Contract-Wallets sind die Lösung für diese Probleme, aber heute sind sie schwer zu programmieren, da letztendlich jede von ihnen implementierte Logik in eine Reihe von EOA-Transaktionen übersetzt werden muss, bevor sie von Ethereum verarbeitet werden können. Kontoabstraktion ermöglicht es Smart Contracts, Transaktionen selbst zu initiieren, sodass jede Logik, die der Benutzer implementieren möchte, direkt in die Smart-Contract-Wallet programmiert und auf Ethereum ausgeführt werden kann.

Letztendlich verbessert die Kontoabstraktion die Unterstützung für Smart-Contract-Wallets, wodurch sie einfacher zu erstellen und sicherer zu nutzen sind. Mit der Kontoabstraktion können Benutzer alle Vorteile von Ethereum genießen, ohne die zugrunde liegende Technologie verstehen zu müssen.

## Jenseits von Seed-Phrasen {#beyond-seed-phrases}

Heutige Konten werden mit privaten Schlüsseln gesichert, die aus Seed-Phrasen berechnet werden. Jeder, der Zugang zu einer Seed-Phrase hat, kann leicht den privaten Schlüssel herausfinden, der ein Konto schützt, und Zugriff auf alle damit gesicherten Vermögenswerte erhalten. Wenn ein privater Schlüssel und die Seed-Phrase verloren gehen, sind die Vermögenswerte dauerhaft unzugänglich. Die Sicherung dieser Seed-Phrasen ist selbst für erfahrene Benutzer umständlich, und Phishing von Seed-Phrasen ist eine der häufigsten Betrugsmaschen.

Kontoabstraktion löst dies, indem ein Smart Contract verwendet wird, um Vermögenswerte zu halten und Transaktionen zu autorisieren. Smart Contracts können benutzerdefinierte Logik enthalten, die auf maximale Sicherheit und Benutzerfreundlichkeit zugeschnitten ist. Benutzer verwenden weiterhin private Schlüssel, um den Zugriff zu kontrollieren, jedoch mit verbesserten Sicherheitsmaßnahmen.

Zum Beispiel können einer Wallet Backup-Schlüssel hinzugefügt werden, was den Austausch von Schlüsseln ermöglicht, falls der primäre Schlüssel kompromittiert wird. Jeder Schlüssel kann unterschiedlich gesichert oder auf vertrauenswürdige Personen verteilt werden, was die Sicherheit erheblich erhöht. Zusätzliche Wallet-Regeln können den Schaden durch kompromittierte Schlüssel mindern, wie z. B. die Anforderung mehrerer Signaturen für Transaktionen mit hohem Wert oder die Beschränkung von Transaktionen auf vertrauenswürdige Adressen.

## Bessere Benutzererfahrung {#better-user-experience}

Kontoabstraktion verbessert die Benutzererfahrung und Sicherheit erheblich, indem sie Smart-Contract-Wallets auf Protokollebene unterstützt. Entwickler können frei innovieren und die Bündelung von Transaktionen für mehr Geschwindigkeit und Effizienz verbessern. Einfache Swaps können zu Ein-Klick-Operationen werden, was die Benutzerfreundlichkeit deutlich erhöht.

Das Gas-Management verbessert sich beträchtlich. Anwendungen können die Gas-Gebühren der Benutzer bezahlen oder die Zahlung in anderen Token als ETH ermöglichen, wodurch die Notwendigkeit entfällt, ein ETH-Guthaben vorzuhalten.

## Wie wird die Kontoabstraktion implementiert? {#how-will-aa-be-implemented}

Derzeit sind Smart-Contract-Wallets schwer zu implementieren, da sie auf komplexem Code basieren, der Standardtransaktionen umhüllt. Ethereum kann dies ändern, indem es Smart Contracts ermöglicht, Transaktionen direkt zu initiieren, wodurch die Logik in Ethereum-Smart-Contracts eingebettet wird, anstatt sich auf externe Relayer zu verlassen.

### EIP-4337: Kontoabstraktion ohne Protokolländerungen {#eip-4337-account-abstraction-without-protocol-changes}

EIP-4337 ermöglicht native Unterstützung für Smart-Contract-Wallets, ohne das Kernprotokoll von Ethereum zu ändern. Es führt `UserOperation`-Objekte ein, die von Validatoren in Transaktionsbündeln gesammelt werden, was die Wallet-Entwicklung vereinfacht. Der EIP-4337 EntryPoint-Vertrag wurde am 1. März 2023 im Ethereum Mainnet bereitgestellt und hat die Erstellung von über 26 Millionen Smart-Wallets und 170 Millionen UserOperations ermöglicht.

## Aktueller Fortschritt {#current-progress}

Als Teil des Pectra-Upgrades von Ethereum ist EIP-7702 für den 7. Mai 2025 geplant. EIP-4337 wurde weithin angenommen, [mit über 26 Millionen bereitgestellten Smart-Accounts und mehr als 170 Millionen verarbeiteten UserOperations](https://www.bundlebear.com/erc4337-overview/all).

## Weiterführende Literatur {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [EIP-4337-Dokumentation](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702-Dokumentation](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337-Adoptions-Dashboard](https://www.bundlebear.com/erc4337-overview/all)
- [Vitaliks „Road to Account Abstraction“](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitaliks Blog über Wallets mit sozialer Wiederherstellung](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)