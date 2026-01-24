---
title: Kontoabstraktion
description: Ein Überblick über die Pläne von Ethereum, Nutzerkonten einfacher und sicherer zu machen
lang: de
summaryPoints:
  - Account-Abstraktion macht es deutlich einfacher, Smart-Contract-Wallets zu bauen
  - Smart-Contract-Wallets erleichtern die Zugangsverwaltung für Ethereum-Konten erheblich
  - Verlorene oder gefährdete Wallet-Schlüssel können mit Hilfe mehrerer Backups wiederhergestellt werden
---

# Kontoabstraktion {#account-abstraction}

Die meisten bestehenden Benutzer interagieren mit Ethereum über **[extern verwaltete Konten (EOAs)](/glossary/#eoa)**. Dies begrenzt die Art und Weise, wie Nutzer mit Ethereum interagieren. So ist es zum Beispiel schwierig, Transaktionen gebündelt auszuführen, und es setzt voraus, dass Nutzer immer über genügend ETH zur Deckung der Transaktionskosten verfügen.

Account-Abstraktion ist eine Möglichkeit, diese Probleme zu lösen. Sie ermöglicht es den Benutzern, flexibel mehr Sicherheit und bessere Benutzererfahrungen in ihre Konten zu programmieren. Dies kann durch ein [Upgrade von EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) geschehen, sodass sie von Smart Contracts gesteuert werden können. Es gibt auch einen anderen Weg, bei dem ein [zweites, separates Transaktionssystem](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) hinzugefügt wird, das parallel zum bestehenden Protokoll läuft. Ungeachtet des Ansatzes ist das Resultat der Zugang zu Ethereum mittels Smart-Contract-Wallets, sei es durch native Unterstützung im bestehenden Protokoll oder über ein ergänzendes Transaktionsnetzwerk.

Smart-Contract-Wallets bieten dem Nutzer viele Vorteile, darunter:

- definieren Sie Ihre eigenen flexiblen Sicherheitsregeln
- stellen Sie Ihr Konto wieder her, wenn Sie die Schlüssel verlieren
- teilen Sie Ihre Kontosicherheit über vertrauenswürdige Geräte oder Personen
- zahlen Sie das Gas für jemand anderen auf Ethereum, oder lassen Sie jemand anderes Ihr Gas bezahlen
- Transaktionen batchen (z. B. Freigabe und Ausführung eines Swaps gleichzeitig vornehmen)
- mehr Möglichkeiten für Dapp- und Wallet-Entwickler, um Innovationen im Bereich der Nutzererfahrungen zu schaffen

Diese Vorteile werden heute nicht nativ unterstützt, da nur extern verwaltete Konten ([EOAs](/glossary/#eoa)) Transaktionen starten können. EOAs sind einfach öffentlich-private Schlüsselpaare. Sie funktionieren folgendermaßen:

- Wenn Sie den privaten Schlüssel haben, können Sie _alles_ innerhalb der Regeln der Ethereum Virtual Machine (EVM) tun.
- Wenn Sie den privaten Schlüssel nicht haben, können Sie _nichts_ tun.

Wenn Sie Ihre Schlüssel verlieren, können sie nicht wiederhergestellt werden, und gestohlene Schlüssel geben Dieben sofortigen Zugang zu allen Geldmitteln auf einem Konto.

Smart-Contract-Wallets sind die Lösung für diese Probleme, aber heute sind sie schwer zu programmieren, da letztendlich jede von ihnen implementierte Logik in eine Reihe von EOA-Transaktionen übersetzt werden muss, bevor sie von Ethereum verarbeitet werden können. Die Kontenabstraktion ermöglicht es Smart Contracts, selbst Transaktionen zu initiieren, sodass jede gewünschte Logik des Benutzers direkt in die Smart Contract Wallet programmiert und auf Ethereum ausgeführt werden kann.

Letztendlich verbessert die Kontenabstraktion die Unterstützung für Smart Contract Wallets, macht sie einfacher zu bauen und sicherer in der Anwendung. Dank Account Abstraction profitieren Nutzer von allen Vorzügen Ethereums, ganz ohne die Technik dahinter verstehen zu müssen.

## Jenseits von Seed-Phrasen {#beyond-seed-phrases}

Die heutigen Konten sind durch private Schlüssel gesichert, die aus Seed-Phrasen berechnet werden. Jeder, der Zugriff auf die Seed Phrase hat, kann den Private Key eines Accounts ermitteln und sich Zugang zu sämtlichen dort liegenden Werten verschaffen. Bei einem Verlust von Private Key und Seed Phrase sind die Vermögenswerte unwiederbringlich verloren. Der sichere Umgang mit Seed Phrases ist unhandlich – sogar für Profis. Zudem ist das Abfischen dieser Phrasen eine der häufigsten Formen von Betrug.

Account Abstraction schafft hier Abhilfe: Ein Smart Contract übernimmt die Aufbewahrung der Assets sowie die Autorisierung von Transaktionen. In Smart Contracts lässt sich individuelle Logik integrieren, die für ein Höchstmaß an Sicherheit und Bedienkomfort sorgt. Der Zugriff wird nach wie vor über Private Keys gesteuert, allerdings unter Anwendung verstärkter Sicherheitsmechanismen.

So ist es etwa möglich, Backup-Schlüssel zu hinterlegen, um den primären Schlüssel bei einer Kompromittierung austauschen zu können. Du kannst jeden Schlüssel anders sichern oder auf vertrauenswürdige Personen verteilen, wodurch sich die Sicherheit drastisch verbessert. Durch zusätzliche Regeln lässt sich der Schaden bei bekannt gewordenen Schlüsseln eindämmen. Beispiele sind die Pflicht zu mehreren Unterschriften bei großen Summen oder die Einschränkung von Transaktionen auf bekannte Adressen.

## Bessere Benutzererfahrung {#better-user-experience}

Account Abstraction sorgt für ein deutlich besseres Nutzererlebnis und höhere Sicherheit, da Smart-Contract-Wallets direkt im Protokoll unterstützt werden. Entwickler haben die Freiheit, Innovationen voranzutreiben und so die Transaktionsbündelung schneller und effizienter zu gestalten. Aus einfachen Swaps werden Ein-Klick-Operationen, was die Nutzung signifikant erleichtert.

Das Management von Gas wird deutlich optimiert. Anwendungen sind in der Lage, Gas-Gebühren für Nutzer zu begleichen oder Zahlungen in anderen Token zu akzeptieren, wodurch ein ETH-Guthaben überflüssig wird.

## Wie wird die Account-Abstraktion umgesetzt? {#how-will-aa-be-implemented}

Die Umsetzung von Smart-Contract-Wallets ist momentan anspruchsvoll, da sie auf komplexem Code beruhen, der Standard-Transaktionen kapselt. Ethereum kann dies ändern, indem Smart Contracts Transaktionen direkt auslösen können. Die Logik wird dabei in die Ethereum-Smart-Contracts integriert, anstatt sich auf externe Relayer verlassen zu müssen.

### EIP-4337: Account-Abstraktion ohne Eingriffe ins Protokoll

EIP-4337 bietet native Unterstützung für Smart-Contract-Wallets, ohne dabei in das Kernprotokoll von Ethereum einzugreifen. Es führt `UserOperation`-Objekte ein, die von Validatoren in Transaktionsbündeln gesammelt werden, was die Wallet-Entwicklung vereinfacht. Der EIP-4337-EntryPoint-Vertrag wurde am 1. März 2023 im Ethereum-Hauptnetz (Mainnet) bereitgestellt und hat die Erstellung von über 26 Millionen Smart Wallets sowie 170 Millionen UserOperations ermöglicht.

## Aktueller Fortschritt {#current-progress}

Im Rahmen des Pectra-Upgrades von Ethereum ist EIP-7702 für den 7. Mai 2025 geplant. EIP-4337 ist weit verbreitet, [wobei über 26 Millionen Smart-Konten bereitgestellt und mehr als 170 Millionen UserOperations verarbeitet wurden](https://www.bundlebear.com/erc4337-overview/all).

## Weiterführende Lektüre {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [EIP-4337-Dokumentation](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702-Dokumentation](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337-Akzeptanz-Dashboard](https://www.bundlebear.com/erc4337-overview/all)
- [Vitaliks "Road to Account Abstraction"](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitaliks Blog über Social-Recovery-Wallets](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
