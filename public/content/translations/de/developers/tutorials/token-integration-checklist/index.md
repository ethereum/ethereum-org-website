---
title: "Checkliste für die Token-Integration"
description: Eine Checkliste mit Punkten, die bei der Interaktion mit Token zu beachten sind
author: "Spuren von bits"
lang: de
tags:
  [
    "solidity",
    "intelligente Verträge",
    "Sicherheit",
    "Token"
  ]
skill: intermediate
published: 13.08.2020
source: "Aufbau sicherer Verträge"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Befolgen Sie diese Checkliste bei der Interaktion mit beliebigen Token. Stellen Sie sicher, dass Sie die mit den einzelnen Punkten verbundenen Risiken verstehen, und begründen Sie alle Ausnahmen von diesen Regeln.

Der Einfachheit halber können alle Slither-[Dienstprogramme](https://github.com/crytic/slither#tools) direkt auf einer Token-Adresse ausgeführt werden, wie zum Beispiel:

[Tutorial zur Verwendung von Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Um dieser Checkliste zu folgen, benötigen Sie die folgende Ausgabe von Slither für den Token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # erfordert Konfiguration und die Verwendung von Echidna und Manticore
```

## Allgemeine Überlegungen {#general-considerations}

- **Der Contract hat eine Sicherheitsüberprüfung.** Vermeiden Sie die Interaktion mit Contracts, bei denen keine Sicherheitsüberprüfung vorliegt. Überprüfen Sie die Dauer der Bewertung (auch bekannt als „Aufwand“), den Ruf der Sicherheitsfirma sowie die Anzahl und den Schweregrad der Befunde.
- **Sie haben die Entwickler kontaktiert.** Möglicherweise müssen Sie deren Team über einen Vorfall informieren. Suchen Sie auf [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) nach geeigneten Ansprechpartnern.
- **Sie haben eine Sicherheits-Mailingliste für kritische Ankündigungen.** Ihr Team sollte Benutzer (wie Sie!) informieren, wenn kritische Probleme gefunden werden oder wenn Upgrades stattfinden.

## ERC-Konformität {#erc-conformity}

Slither enthält ein Dienstprogramm, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), das die Konformität eines Tokens mit vielen verwandten ERC-Standards überprüft. Verwenden Sie slither-check-erc, um Folgendes zu überprüfen:

- **Transfer und transferFrom geben einen booleschen Wert zurück.** Mehrere Token geben bei diesen Funktionen keinen booleschen Wert zurück. Infolgedessen können ihre Aufrufe im Contract fehlschlagen.
- **Die Funktionen name, decimals und symbol sind vorhanden, falls sie verwendet werden.** Diese Funktionen sind im ERC20-Standard optional und möglicherweise nicht vorhanden.
- **Decimals gibt einen uint8 zurück.** Mehrere Token geben fälschlicherweise einen uint256 zurück. Wenn dies der Fall ist, stellen Sie sicher, dass der zurückgegebene Wert unter 255 liegt.
- **Der Token entschärft die bekannte [ERC20-Race-Condition](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Der ERC20-Standard hat eine bekannte Race-Condition, die entschärft werden muss, um zu verhindern, dass Angreifer Token stehlen.
- **Der Token ist kein ERC777-Token und hat keinen externen Funktionsaufruf in transfer und transferFrom.** Externe Aufrufe in den Transferfunktionen können zu Re-Entrancies führen.

Slither enthält ein Dienstprogramm, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), das Unit-Tests und Sicherheitseigenschaften generiert, die viele gängige ERC-Schwachstellen aufdecken können. Verwenden Sie slither-prop, um Folgendes zu überprüfen:

- **Der Contract besteht alle Unit-Tests und Sicherheitseigenschaften von slither-prop.** Führen Sie die generierten Unit-Tests aus und überprüfen Sie dann die Eigenschaften mit [Echidna](https://github.com/crytic/echidna) und [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Schließlich gibt es bestimmte Eigenschaften, die schwer automatisch zu identifizieren sind. Überprüfen Sie diese Bedingungen manuell:

- **Transfer und transferFrom sollten keine Gebühr erheben.** Deflationäre Token können zu unerwartetem Verhalten führen.
- **Potenzielle Zinsen, die durch den Token verdient werden, werden berücksichtigt.** Einige Token schütten Zinsen an die Token-Inhaber aus. Diese Zinsen könnten im Contract eingeschlossen werden, wenn sie nicht berücksichtigt werden.

## Contract-Zusammensetzung {#contract-composition}

- **Der Contract vermeidet unnötige Komplexität.** Der Token sollte ein einfacher Contract sein; ein Token mit komplexem Code erfordert einen höheren Überprüfungsstandard. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) von Slither, um komplexen Code zu identifizieren.
- **Der Contract verwendet SafeMath.** Contracts, die SafeMath nicht verwenden, erfordern einen höheren Überprüfungsstandard. Überprüfen Sie den Contract manuell auf die Verwendung von SafeMath.
- **Der Contract hat nur wenige Funktionen, die nicht mit Token in Beziehung stehen.** Funktionen, die nicht mit Token in Beziehung stehen, erhöhen die Wahrscheinlichkeit eines Problems im Contract. Verwenden Sie den [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um den im Contract verwendeten Code grob zu überprüfen.
- **Der Token hat nur eine Adresse.** Token mit mehreren Einstiegspunkten für Guthaben-Aktualisierungen können die interne Buchführung auf der Grundlage der Adresse stören (z. B. spiegelt `balances[token_address][msg.sender]` möglicherweise nicht das tatsächliche Guthaben wider).

## Eigentümerprivilegien {#owner-privileges}

- **Der Token ist nicht upgradefähig.** Upgradefähige Contracts können ihre Regeln im Laufe der Zeit ändern. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um festzustellen, ob der Contract upgradefähig ist.
- **Der Eigentümer hat begrenzte Minting-Fähigkeiten.** Böswillige oder kompromittierte Eigentümer können Minting-Fähigkeiten missbrauchen. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um die Minting-Fähigkeiten zu überprüfen, und ziehen Sie eine manuelle Überprüfung des Codes in Betracht.
- **Der Token ist nicht pausierbar.** Böswillige oder kompromittierte Eigentümer können Contracts blockieren, die auf pausierbaren Token basieren. Identifizieren Sie pausierbaren Code manuell.
- **Der Eigentümer kann den Contract nicht auf eine Blacklist setzen.** Böswillige oder kompromittierte Eigentümer können Contracts blockieren, die auf Token mit einer Blacklist basieren. Identifizieren Sie Blacklisting-Funktionen manuell.
- **Das Team hinter dem Token ist bekannt und kann für Missbrauch zur Verantwortung gezogen werden.** Contracts mit anonymen Entwicklungsteams oder solche, die sich in rechtlichen Schutzräumen befinden, sollten einen höheren Überprüfungsstandard erfordern.

## Token-Knappheit {#token-scarcity}

Die Überprüfung von Problemen der Token-Knappheit erfordert eine manuelle Überprüfung. Überprüfen Sie auf diese Bedingungen:

- **Kein Benutzer besitzt den größten Teil des Bestands.** Wenn einige wenige Benutzer die meisten Token besitzen, können sie den Betrieb auf der Grundlage der Token-Verteilung beeinflussen.
- **Der Gesamtbestand ist ausreichend.** Token mit einem geringen Gesamtbestand können leicht manipuliert werden.
- **Die Token befinden sich auf mehr als nur einigen wenigen Börsen.** Wenn sich alle Token auf einer einzigen Börse befinden, kann eine Kompromittierung der Börse den Contract kompromittieren, der auf dem Token basiert.
- **Benutzer verstehen die damit verbundenen Risiken von großen Geldmengen oder Flash-Loans.** Contracts, die auf dem Token-Guthaben basieren, müssen Angreifer mit großen Geldmengen oder Angriffe durch Flash-Loans sorgfältig berücksichtigen.
- **Der Token erlaubt kein Flash-Minting**. Flash-Minting kann zu erheblichen Schwankungen des Guthabens und des Gesamtbestands führen, was strenge und umfassende Überlaufprüfungen im Betrieb des Tokens erforderlich macht.
