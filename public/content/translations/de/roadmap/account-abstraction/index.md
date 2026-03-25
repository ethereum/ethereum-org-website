---
title: Kontoabstraktion
description: "Ein Überblick über die Pläne von Ethereum, Benutzerkonten einfacher und sicherer zu machen"
lang: de
summaryPoints:
  - Kontoabstraktion macht es viel einfacher, Smart Contract Wallets zu erstellen
  - Smart Contract Wallets machen es viel einfacher, den Zugriff auf Ethereum-Konten zu verwalten
  - Verlorene und kompromittierte Schlüssel können mithilfe mehrerer Backups wiederhergestellt werden
---

# Kontoabstraktion {#account-abstraction}

Die meisten bestehenden Benutzer interagieren mit [Ethereum](/) über **[Extern verwaltete Konten (EOAs)](/glossary/#eoa)**. Dies schränkt ein, wie Benutzer mit Ethereum interagieren können. Zum Beispiel macht es dies schwierig, Transaktionen gebündelt auszuführen, und erfordert, dass Benutzer immer ein ETH-Guthaben haben, um Transaktionsgebühren zu bezahlen.

Kontoabstraktion ist ein Weg, diese Probleme zu lösen, indem sie es Benutzern ermöglicht, flexibel mehr Sicherheit und bessere Benutzererfahrungen in ihre Konten zu programmieren. Dies kann durch das [Upgraden von EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) geschehen, sodass sie durch Smart Contracts gesteuert werden können. Es gibt auch einen anderen Weg, der das Hinzufügen eines [zweiten, separaten Transaktionssystems](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) beinhaltet, das parallel zum bestehenden Protokoll läuft. Unabhängig vom Weg ist das Ergebnis der Zugriff auf Ethereum über Smart Contract Wallets, die entweder nativ als Teil des bestehenden Protokolls unterstützt werden oder über ein zusätzliches Transaktionsnetzwerk.

Smart Contract Wallets eröffnen dem Benutzer viele Vorteile, darunter:

- Definition eigener flexibler Sicherheitsregeln
- Wiederherstellung Ihres Kontos, wenn Sie die Schlüssel verlieren
- Aufteilung der Kontosicherheit auf vertrauenswürdige Geräte oder Personen
- das Gas für jemand anderen bezahlen oder jemand anderen für Ihr Gas bezahlen lassen
- Bündelung von Transaktionen (z. B. einen Tausch in einem Durchgang genehmigen und ausführen)
- mehr Möglichkeiten für Dapp- und Wallet-Entwickler, Innovationen bei der Benutzererfahrung einzuführen

Diese Vorteile werden heute nicht nativ unterstützt, da nur Extern verwaltete Konten ([EOAs](/glossary/#eoa)) Transaktionen starten können. EOAs sind einfach Public-Key- und Private-Key-Paare. Sie funktionieren wie folgt:

- Wenn Sie den Private-Key haben, können Sie im Rahmen der Regeln der Ethereum Virtual Machine (EVM) _alles_ tun.
- Wenn Sie den Private-Key nicht haben, können Sie _nichts_ tun.

Wenn Sie Ihre Schlüssel verlieren, können sie nicht wiederhergestellt werden, und gestohlene Schlüssel geben Dieben sofortigen Zugriff auf alle Gelder auf einem Konto.

Smart Contract Wallets sind die Lösung für diese Probleme, aber heute sind sie schwer zu programmieren, da letztendlich jede von ihnen implementierte Logik in eine Reihe von EOA-Transaktionen übersetzt werden muss, bevor sie von Ethereum verarbeitet werden können. Kontoabstraktion ermöglicht es Smart Contracts, Transaktionen selbst zu initiieren, sodass jede Logik, die der Benutzer implementieren möchte, in die Smart Contract Wallet selbst programmiert und auf Ethereum ausgeführt werden kann.

Letztendlich verbessert die Kontoabstraktion die Unterstützung für Smart Contract Wallets, wodurch sie einfacher zu erstellen und sicherer zu verwenden sind. Mit der Kontoabstraktion können Benutzer alle Vorteile von Ethereum genießen, ohne die zugrunde liegende Technologie verstehen zu müssen.

## Jenseits von Seed-Phrasen {#beyond-seed-phrases}

Heutige Konten werden mit Private-Keys gesichert, die aus Seed-Phrasen berechnet werden. Jeder mit Zugriff auf eine Seed-Phrase kann leicht den Private-Key herausfinden, der ein Konto schützt, und Zugriff auf alle Vermögenswerte erhalten, die er schützt. Wenn ein Private-Key und eine Seed-Phrase verloren gehen, sind die Vermögenswerte dauerhaft unzugänglich. Das Sichern dieser Seed-Phrasen ist selbst für erfahrene Benutzer umständlich, und Seed-Phrase-Phishing ist einer der häufigsten Betrügereien.

Kontoabstraktion löst dies, indem ein Smart Contract verwendet wird, um Vermögenswerte zu halten und Transaktionen zu autorisieren. Smart Contracts können benutzerdefinierte Logik enthalten, die auf maximale Sicherheit und Benutzerfreundlichkeit zugeschnitten ist. Benutzer verwenden weiterhin Private-Keys, um den Zugriff zu kontrollieren, jedoch mit verbesserten Sicherheitsmaßnahmen.

Zum Beispiel können Backup-Schlüssel zu einer Wallet hinzugefügt werden, was den Schlüsselaustausch ermöglicht, wenn der primäre Schlüssel kompromittiert ist. Jeder Schlüssel kann unterschiedlich gesichert oder auf vertrauenswürdige Personen verteilt werden, was die Sicherheit erheblich erhöht. Zusätzliche Wallet-Regeln können den Schaden durch kompromittierte Schlüssel mindern, wie z. B. die Anforderung mehrerer Signaturen für hochwertige Transaktionen oder die Beschränkung von Transaktionen auf vertrauenswürdige Adressen.

## Bessere Benutzererfahrung {#better-user-experience}

Kontoabstraktion verbessert die Benutzererfahrung und Sicherheit erheblich, indem sie Smart Contract Wallets auf Protokollebene unterstützt. Entwickler können frei innovieren und die Bündelung von Transaktionen für Geschwindigkeit und Effizienz verbessern. Einfaches Tauschen kann zu Ein-Klick-Operationen werden, was die Benutzerfreundlichkeit deutlich verbessert.

Das Gas-Management verbessert sich erheblich. Anwendungen können die Gasgebühren der Benutzer bezahlen oder die Zahlung in anderen Token als ETH ermöglichen, wodurch die Notwendigkeit entfällt, ein ETH-Guthaben zu unterhalten.

## Wie wird die Kontoabstraktion implementiert? {#how-will-aa-be-implemented}

Derzeit sind Smart Contract Wallets schwer zu implementieren, da sie auf komplexem Code basieren, der Standard-Transaktionen umhüllt. Ethereum kann dies ändern, indem es Smart Contracts ermöglicht, Transaktionen direkt zu initiieren, wobei die Logik in Ethereum-Smart-Contracts eingebettet wird, anstatt sich auf externe Relayer zu verlassen.

### EIP-4337: Kontoabstraktion ohne Protokolländerungen

EIP-4337 ermöglicht native Unterstützung für Smart Contract Wallets, ohne das Kernprotokoll von Ethereum zu ändern. Es führt `UserOperation`-Objekte ein, die von Validatoren in Transaktionsbündeln gesammelt werden, was die Wallet-Entwicklung vereinfacht. Der EIP-4337 EntryPoint-Vertrag wurde am 1. März 2023 im Ethereum-Mainnet bereitgestellt und hat die Erstellung von über 26 Millionen Smart Wallets und 170 Millionen UserOperations erleichtert.

## Aktueller Fortschritt {#current-progress}

Als Teil des Pectra-Upgrades von Ethereum ist EIP-7702 für den 7. Mai 2025 geplant. EIP-4337 wurde weithin übernommen, [mit über 26 Millionen bereitgestellten Smart Accounts und mehr als 170 Millionen verarbeiteten UserOperations](https://www.bundlebear.com/erc4337-overview/all).

## Weiterführende Literatur {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [EIP-4337-Dokumentation](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702-Dokumentation](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337-Adoptions-Dashboard](https://www.bundlebear.com/erc4337-overview/all)
- [Vitaliks „Road to Account Abstraction“](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitaliks Blog über Social-Recovery-Wallets](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)