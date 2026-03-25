---
title: "Checkliste für die Token-Integration"
description: Eine Checkliste mit Dingen, die bei der Interaktion mit Token zu beachten sind
author: "Trailofbits"
lang: de
tags: ["Solidity", "Smart Contracts", "Sicherheit", "Token"]
skill: intermediate
breadcrumb: Token-Integration
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Befolgen Sie diese Checkliste, wenn Sie mit beliebigen Token interagieren. Stellen Sie sicher, dass Sie die mit jedem Punkt verbundenen Risiken verstehen, und begründen Sie alle Ausnahmen von diesen Regeln.

Der Einfachheit halber können alle Slither-[Dienstprogramme](https://github.com/crytic/slither#tools) direkt auf einer Token-Adresse ausgeführt werden, wie zum Beispiel:

[Tutorial zur Verwendung von Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Um dieser Checkliste zu folgen, sollten Sie diese Ausgabe von Slither für den Token haben:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # erfordert Konfiguration und die Verwendung von Echidna und Manticore
```

## Allgemeine Überlegungen {#general-considerations}

- **Der Smart Contract hat eine Sicherheitsüberprüfung.** Vermeiden Sie die Interaktion mit Smart Contracts, denen eine Sicherheitsüberprüfung fehlt. Überprüfen Sie die Dauer der Bewertung (auch bekannt als „Aufwand“), den Ruf der Sicherheitsfirma sowie die Anzahl und den Schweregrad der Ergebnisse.
- **Sie haben die Entwickler kontaktiert.** Möglicherweise müssen Sie deren Team auf einen Vorfall aufmerksam machen. Suchen Sie nach geeigneten Kontakten unter [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Sie haben eine Sicherheits-Mailingliste für kritische Ankündigungen.** Deren Team sollte Benutzer (wie Sie!) informieren, wenn kritische Probleme gefunden werden oder wenn Upgrades stattfinden.

## ERC-Konformität {#erc-conformity}

Slither enthält ein Dienstprogramm, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), das die Konformität eines Tokens mit vielen verwandten ERC-Standards überprüft. Verwenden Sie slither-check-erc, um Folgendes zu überprüfen:

- **Transfer und transferFrom geben einen Boolean zurück.** Einige Token geben bei diesen Funktionen keinen Boolean zurück. Infolgedessen könnten ihre Aufrufe im Smart Contract fehlschlagen.
- **Die Funktionen name, decimals und symbol sind vorhanden, falls sie verwendet werden.** Diese Funktionen sind im ERC20-Standard optional und möglicherweise nicht vorhanden.
- **Decimals gibt einen uint8 zurück.** Einige Token geben fälschlicherweise einen uint256 zurück. Wenn dies der Fall ist, stellen Sie sicher, dass der zurückgegebene Wert unter 255 liegt.
- **Der Token mindert die bekannte [ERC20-Race-Condition](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Der ERC20-Standard weist eine bekannte ERC20-Race-Condition auf, die gemindert werden muss, um zu verhindern, dass Angreifer Token stehlen.
- **Der Token ist kein ERC777-Token und hat keinen externen Funktionsaufruf in transfer und transferFrom.** Externe Aufrufe in den Transfer-Funktionen können zu Reentrancy-Angriffen (Wiedereintritt) führen.

Slither enthält ein Dienstprogramm, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), das Unit-Tests und Sicherheitseigenschaften generiert, die viele häufige ERC-Fehler aufdecken können. Verwenden Sie slither-prop, um Folgendes zu überprüfen:

- **Der Smart Contract besteht alle Unit-Tests und Sicherheitseigenschaften von slither-prop.** Führen Sie die generierten Unit-Tests aus und überprüfen Sie dann die Eigenschaften mit [Echidna](https://github.com/crytic/echidna) und [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Schließlich gibt es bestimmte Eigenschaften, die schwer automatisch zu identifizieren sind. Überprüfen Sie diese Bedingungen manuell:

- **Transfer und transferFrom sollten keine Gebühr erheben.** Deflationäre Token können zu unerwartetem Verhalten führen.
- **Mögliche Zinsen, die durch den Token erzielt werden, werden berücksichtigt.** Einige Token schütten Zinsen an die Token-Inhaber aus. Diese Zinsen könnten im Smart Contract gefangen sein, wenn sie nicht berücksichtigt werden.

## Zusammensetzung des Smart Contracts {#contract-composition}

- **Der Smart Contract vermeidet unnötige Komplexität.** Der Token sollte ein einfacher Smart Contract sein; ein Token mit komplexem Code erfordert einen höheren Überprüfungsstandard. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) von Slither, um komplexen Code zu identifizieren.
- **Der Smart Contract verwendet SafeMath.** Smart Contracts, die SafeMath nicht verwenden, erfordern einen höheren Überprüfungsstandard. Überprüfen Sie den Smart Contract manuell auf die Verwendung von SafeMath.
- **Der Smart Contract hat nur wenige nicht-tokenbezogene Funktionen.** Nicht-tokenbezogene Funktionen erhöhen die Wahrscheinlichkeit eines Problems im Smart Contract. Verwenden Sie den [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um den im Smart Contract verwendeten Code umfassend zu überprüfen.
- **Der Token hat nur eine Adresse.** Token mit mehreren Einstiegspunkten für Kontostandsaktualisierungen können die interne Buchführung basierend auf der Adresse stören (z. B. spiegelt `balances[token_address][msg.sender]` möglicherweise nicht den tatsächlichen Kontostand wider).

## Eigentümerprivilegien {#owner-privileges}

- **Der Token ist nicht aktualisierbar.** Aktualisierbare Smart Contracts könnten ihre Regeln im Laufe der Zeit ändern. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um festzustellen, ob der Smart Contract aktualisierbar ist.
- **Der Eigentümer hat eingeschränkte Fähigkeiten zum Prägen.** Böswillige oder kompromittierte Eigentümer können die Fähigkeiten zum Prägen missbrauchen. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um die Fähigkeiten zum Prägen zu überprüfen, und ziehen Sie eine manuelle Überprüfung des Codes in Betracht.
- **Der Token ist nicht pausierbar.** Böswillige oder kompromittierte Eigentümer können Smart Contracts, die auf pausierbaren Token basieren, in eine Falle locken. Identifizieren Sie pausierbaren Code manuell.
- **Der Eigentümer kann den Smart Contract nicht auf eine schwarze Liste setzen.** Böswillige oder kompromittierte Eigentümer können Smart Contracts, die auf Token mit einer schwarzen Liste basieren, in eine Falle locken. Identifizieren Sie Blacklisting-Funktionen manuell.
- **Das Team hinter dem Token ist bekannt und kann für Missbrauch zur Verantwortung gezogen werden.** Smart Contracts mit anonymen Entwicklungsteams oder solchen, die sich in rechtlichen Grauzonen befinden, sollten einen höheren Überprüfungsstandard erfordern.

## Token-Knappheit {#token-scarcity}

Die Überprüfung auf Probleme mit der Token-Knappheit erfordert eine manuelle Überprüfung. Prüfen Sie auf diese Bedingungen:

- **Kein Benutzer besitzt den Großteil des Angebots.** Wenn wenige Benutzer die meisten Token besitzen, können sie Operationen basierend auf der Verteilung des Tokens beeinflussen.
- **Das Gesamtangebot ist ausreichend.** Token mit einem geringen Gesamtangebot können leicht manipuliert werden.
- **Die Token befinden sich auf mehr als nur wenigen Börsen.** Wenn sich alle Token auf einer Börse befinden, kann eine Kompromittierung der Börse den Smart Contract gefährden, der auf den Token angewiesen ist.
- **Benutzer verstehen die damit verbundenen Risiken von großen Geldmitteln oder Flash Loans.** Smart Contracts, die auf dem Token-Guthaben basieren, müssen Angreifer mit großen Geldmitteln oder Angriffe durch Flash Loans sorgfältig berücksichtigen.
- **Der Token erlaubt kein Flash-Prägen**. Flash-Prägen kann zu erheblichen Schwankungen im Kontostand und im Gesamtangebot führen, was strenge und umfassende Überlaufprüfungen beim Betrieb des Tokens erforderlich macht.