---
title: "Checkliste für die Token-Integration"
description: Eine Checkliste mit Dingen, die bei der Interaktion mit Tokens zu beachten sind
author: "Trailofbits"
lang: de
tags: ["Solidity", "Smart Contracts", "Sicherheit", "Tokens"]
skill: intermediate
breadcrumb: Token-Integration
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Befolgen Sie diese Checkliste, wenn Sie mit beliebigen Tokens interagieren. Stellen Sie sicher, dass Sie die mit jedem Punkt verbundenen Risiken verstehen, und begründen Sie alle Ausnahmen von diesen Regeln.

Der Einfachheit halber können alle Slither-[Dienstprogramme](https://github.com/crytic/slither#tools) direkt auf einer Token-Adresse ausgeführt werden, wie zum Beispiel:

[Tutorial zur Verwendung von Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Das Abrufen von verifiziertem Quellcode von Etherscan erfordert einen [Etherscan-API-Schlüssel](https://docs.etherscan.io/set-up-your-api-key) (ein kostenloser Schlüssel reicht aus). Übergeben Sie ihn mit `--etherscan-apikey` oder setzen Sie die Umgebungsvariable `ETHERSCAN_API_KEY`, die Slither ebenfalls liest:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Ohne einen Schlüssel schlägt der Befehl mit einem `Invalid etherscan API Key`-Fehler fehl.

Um dieser Checkliste zu folgen, sollten Sie diese Ausgabe von Slither für den Token haben:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # erfordert Konfiguration und die Verwendung von Echidna
```

## Allgemeine Überlegungen {#general-considerations}

- **Der Vertrag hat eine Sicherheitsüberprüfung.** Vermeiden Sie die Interaktion mit Verträgen, denen eine Sicherheitsüberprüfung fehlt. Überprüfen Sie die Dauer der Bewertung (auch bekannt als „Arbeitsaufwand“), den Ruf der Sicherheitsfirma sowie die Anzahl und den Schweregrad der Ergebnisse.
- **Sie haben die Entwickler kontaktiert.** Möglicherweise müssen Sie deren Team auf einen Vorfall aufmerksam machen. Suchen Sie nach geeigneten Kontakten unter [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Sie haben eine Sicherheits-Mailingliste für kritische Ankündigungen.** Deren Team sollte Benutzer (wie Sie!) informieren, wenn kritische Probleme gefunden werden oder wenn Upgrades stattfinden.

## ERC-Konformität {#erc-conformity}

Slither enthält ein Dienstprogramm, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), das die Konformität eines Tokens mit vielen verwandten ERC-Standards überprüft. Verwenden Sie slither-check-erc, um Folgendes zu überprüfen:

- **Transfer und transferFrom geben einen Boolean zurück.** Einige Tokens geben bei diesen Funktionen keinen Boolean zurück. Infolgedessen könnten ihre Aufrufe im Vertrag fehlschlagen.
- **Die Funktionen name, decimals und symbol sind vorhanden, falls sie verwendet werden.** Diese Funktionen sind im ERC-20-Standard optional und möglicherweise nicht vorhanden.
- **Decimals gibt einen uint8 zurück.** Einige Tokens geben fälschlicherweise einen uint256 zurück. Wenn dies der Fall ist, stellen Sie sicher, dass der zurückgegebene Wert unter 255 liegt.
- **Der Token mindert die bekannte [ERC-20-Race-Condition](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Der ERC-20-Standard weist eine bekannte ERC-20-Race-Condition auf, die gemindert werden muss, um zu verhindern, dass Angreifer Tokens stehlen.
- **Der Token ist kein ERC-777-Token und hat keinen externen Funktionsaufruf in transfer und transferFrom.** Externe Aufrufe in den Transfer-Funktionen können zu Reentrancy-Schwachstellen führen.

Slither enthält ein Dienstprogramm, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), das Unit-Tests und Sicherheitseigenschaften generiert, die viele häufige ERC-Fehler aufdecken können. Verwenden Sie slither-prop, um Folgendes zu überprüfen:

- **Der Vertrag besteht alle Unit-Tests und Sicherheitseigenschaften von slither-prop.** Führen Sie die generierten Unit-Tests aus und überprüfen Sie dann die Eigenschaften mit [Echidna](https://github.com/crytic/echidna).

Schließlich gibt es bestimmte Eigenschaften, die automatisch schwer zu identifizieren sind. Überprüfen Sie diese Bedingungen manuell:

- **Transfer und transferFrom sollten keine Gebühr erheben.** Deflationäre Tokens können zu unerwartetem Verhalten führen.
- **Mögliche Zinsen, die durch den Token verdient werden, werden berücksichtigt.** Einige Tokens schütten Zinsen an Token-Inhaber aus. Diese Zinsen könnten im Vertrag gefangen sein, wenn sie nicht berücksichtigt werden.

## Vertragszusammensetzung {#contract-composition}

- **Der Vertrag vermeidet unnötige Komplexität.** Der Token sollte ein einfacher Vertrag sein; ein Token mit komplexem Code erfordert einen höheren Überprüfungsstandard. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) von Slither, um komplexen Code zu identifizieren.
- **Der Vertrag verwendet geprüfte Arithmetik.** Solidity 0.8 und neuer machen bei Überlauf und Unterlauf standardmäßig rückgängig; ältere Verträge benötigen SafeMath für denselben Schutz. Verträge, die mit älteren Versionen ohne SafeMath kompiliert wurden oder die `unchecked`-Blöcke verwenden, erfordern einen höheren Überprüfungsstandard. Überprüfen Sie die Arithmetik manuell, insbesondere innerhalb von `unchecked`-Blöcken und Inline-Assembly.
- **Der Vertrag hat nur wenige nicht-tokenbezogene Funktionen.** Nicht-tokenbezogene Funktionen erhöhen die Wahrscheinlichkeit eines Problems im Vertrag. Verwenden Sie den [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) von Slither, um den im Vertrag verwendeten Code umfassend zu überprüfen.
- **Der Token hat nur eine Adresse.** Tokens mit mehreren Einstiegspunkten für Kontostandsaktualisierungen können die interne Buchführung basierend auf der Adresse stören (z. B. spiegelt `balances[token_address][msg.sender]` möglicherweise nicht den tatsächlichen Kontostand wider).

## Eigentümerprivilegien {#owner-privileges}

- **Der Token ist nicht aktualisierbar (upgradeable).** Aktualisierbare Verträge könnten ihre Regeln im Laufe der Zeit ändern. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) von Slither, um festzustellen, ob der Vertrag aktualisierbar ist.
- **Der Eigentümer hat eingeschränkte Fähigkeiten zum Prägen.** Böswillige oder kompromittierte Eigentümer können die Fähigkeiten zum Prägen missbrauchen. Verwenden Sie den [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) von Slither, um die Fähigkeiten zum Prägen zu überprüfen, und ziehen Sie in Betracht, den Code manuell zu überprüfen.
- **Der Token ist nicht pausierbar.** Böswillige oder kompromittierte Eigentümer können Verträge, die auf pausierbare Tokens angewiesen sind, in eine Falle locken. Identifizieren Sie pausierbaren Code manuell.
- **Der Eigentümer kann den Vertrag nicht auf eine Blacklist setzen.** Böswillige oder kompromittierte Eigentümer können Verträge, die auf Tokens mit einer Blacklist angewiesen sind, in eine Falle locken. Identifizieren Sie Blacklisting-Funktionen manuell.
- **Das Team hinter dem Token ist bekannt und kann für Missbrauch zur Verantwortung gezogen werden.** Verträge mit anonymen Entwicklungsteams oder solche, die sich in rechtlichen Grauzonen befinden, sollten einen höheren Überprüfungsstandard erfordern.

## Token-Knappheit {#token-scarcity}

Die Überprüfung auf Probleme mit der Token-Knappheit erfordert eine manuelle Überprüfung. Prüfen Sie auf diese Bedingungen:

- **Kein Benutzer besitzt den Großteil des Angebots.** Wenn einige wenige Benutzer die meisten Tokens besitzen, können sie Operationen basierend auf der Verteilung des Tokens beeinflussen.
- **Das Gesamtangebot ist ausreichend.** Tokens mit einem geringen Gesamtangebot können leicht manipuliert werden.
- **Die Tokens befinden sich auf mehr als nur ein paar Börsen.** Wenn sich alle Tokens auf einer einzigen Börse befinden, kann eine Kompromittierung der Börse den Vertrag gefährden, der auf den Token angewiesen ist.
- **Benutzer verstehen die damit verbundenen Risiken von großen Geldmitteln oder Flash Loans.** Verträge, die auf den Token-Kontostand angewiesen sind, müssen Angreifer mit großen Geldmitteln oder Angriffe durch Flash Loans sorgfältig berücksichtigen.
- **Der Token erlaubt kein Flash-Prägen**. Flash-Prägen kann zu erheblichen Schwankungen im Kontostand und im Gesamtangebot führen, was strenge und umfassende Überlauf-Prüfungen beim Betrieb des Tokens erforderlich macht.
## Bekannte nicht-standardmäßige ERC-20-Tokens {#known-non-standard-erc20-tokens}

Protokolle, die die Integration mit beliebigen Tokens ermöglichen, müssen darauf achten, bestimmte bekannte nicht-standardmäßige ERC-20-Tokens ordnungsgemäß zu handhaben. Konsultieren Sie die [Liste der nicht-standardmäßigen Tokens](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) für bekannte Tokens, die zusätzliche Risiken bergen.

## ERC-721-Tokens {#erc721-tokens}

### ERC-721-Konformitätsprüfungen {#erc721-conformity-checks}

Das Verhalten bestimmter Verträge kann von der ursprünglichen ERC-Spezifikation abweichen. Überprüfen Sie die folgenden Bedingungen manuell:

- **Transfers von Tokens an die 0x0-Adresse werden rückgängig gemacht.** Einige Tokens erlauben Transfers an 0x0 und betrachten an diese Adresse gesendete Tokens als verbrannt; der ERC-721-Standard verlangt jedoch, dass solche Transfers rückgängig gemacht werden.
- **`safeTransferFrom`-Funktionen sind mit der korrekten Signatur implementiert.** Einige Token-Verträge implementieren diese Funktionen nicht. Der Transfer von NFTs an einen dieser Verträge kann zu einem Verlust von Vermögenswerten führen.
- **Die Funktionen `name`, `decimals` und `symbol` sind vorhanden, falls sie verwendet werden.** Diese Funktionen sind im ERC-721-Standard optional und möglicherweise nicht vorhanden.
- **Falls verwendet, gibt `decimals` einen `uint8(0)` zurück.** Andere Werte sind ungültig.
- **Die Funktionen `name` und `symbol` können einen leeren String zurückgeben.** Dieses Verhalten ist durch den Standard erlaubt.
- **Die Funktion `ownerOf` wird rückgängig gemacht, wenn die `tokenId` ungültig ist oder sich auf einen Token bezieht, der bereits verbrannt wurde.** Die Funktion kann nicht 0x0 zurückgeben. Dieses Verhalten wird vom Standard verlangt, aber möglicherweise nicht immer korrekt implementiert.
- **Ein Transfer eines NFTs löscht dessen Freigaben.** Dies wird vom Standard verlangt.
- **Die Token-ID eines NFTs kann während seiner Lebensdauer nicht geändert werden.** Dies wird vom Standard verlangt.

### Häufige Risiken des ERC-721-Standards {#common-risks-of-the-erc721-standard}

Mindern Sie die mit ERC-721-Verträgen verbundenen Risiken, indem Sie eine manuelle Überprüfung der folgenden Bedingungen durchführen:

- **Der `onERC721Received`-Callback wird berücksichtigt.** Externe Aufrufe in den Transfer-Funktionen können zu Reentrancy-Schwachstellen führen, insbesondere wenn der Callback nicht explizit ist (z. B. bei [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)-Aufrufen).
- **Wenn ein NFT geprägt wird, wird es sicher an einen Smart Contract transferiert.** Wenn eine Funktion zum Prägen existiert, sollte sie sich ähnlich wie `safeTransferFrom` verhalten und das Prägen neuer Tokens an einen Smart Contract ordnungsgemäß handhaben, um den Verlust von Vermögenswerten zu verhindern.
- **Das Verbrennen eines Tokens löscht dessen Freigaben.** Wenn eine Funktion zum Verbrennen existiert, sollte sie die vorherigen Freigaben des Tokens löschen.
