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

Benutzer interagieren mit Ethereum durch **["externe Konten" ("externally owned accounts" = EOAs)](/glossary/#eoa)**. Dies ist die einzige Möglichkeit, eine Transaktion zu senden oder einen Smart Contract auszuführen. Das schränkt jedoch die Möglichkeiten der Nutzer ein, mit Ethereum zu interagieren. So ist es zum Beispiel schwierig, Transaktionen zu bündeln. Außerdem müssen Nutzer immer etwas ETH bereithalten, um Gas-Kosten zu decken.

Account-Abstraktion ist eine Möglichkeit, diese Probleme zu lösen. Sie ermöglicht es den Benutzern, flexibel mehr Sicherheit und bessere Benutzererfahrungen in ihre Konten zu programmieren. Dies kann durch [das Upgrade von EOAs](https://eips.ethereum.org/EIPS/eip-3074) geschehen, so dass sie durch Smart Contracts gesteuert werden können, oder durch das [Upgrade von Smart Contracts selbst,](https://eips.ethereum.org/EIPS/eip-2938) sodass sie Transaktionen initiieren können. Beide Optionen erfordern Änderungen am Ethereum-Protokoll. Es gibt auch einen dritten Weg, der die Hinzufügung eines [zweiten, separaten Transaktionssystems](https://eips.ethereum.org/EIPS/eip-4337) vorsieht, das parallel zum bestehenden Protokoll läuft. Unabhängig vom gewählten Weg ist das Ergebnis der Zugang zu Ethereum über Smart-Contract-Wallets, entweder nativ als Teil des bestehenden Protokolls unterstützt oder über ein zusätzliches Transaktionsnetzwerk.

Smart-Contract-Wallets bieten dem Nutzer viele Vorteile, darunter:

- definieren Sie Ihre eigenen flexiblen Sicherheitsregeln
- stellen Sie Ihr Konto wieder her, wenn Sie die Schlüssel verlieren
- teilen Sie Ihre Kontosicherheit über vertrauenswürdige Geräte oder Personen
- zahlen Sie das Gas für jemand anderen auf Ethereum, oder lassen Sie jemand anderes Ihr Gas bezahlen
- fassen Sie Transaktionen zusammen (z.B. Genehmigen und Ausführen eines Tauschgeschäfts in einem Schritt)
- mehr Möglichkeiten für Dapp- und Wallet-Entwickler, um Innovationen im Bereich der Nutzererfahrungen zu schaffen

Diese Vorteile werden heute nicht nativ unterstützt, weil nur extern verwaltete Konten ([EOAs](/glossary/#eoa)) Transaktionen starten können. EOAs sind einfach öffentlich-private Schlüsselpaare. Sie funktionieren folgendermaßen:

- wenn Sie den privaten Schlüssel haben, können Sie _alles_ innerhalb der Regeln der Ethereum Virtual Machine (EVM) tun
- wenn Sie den privaten Schlüssel nicht haben, können Sie _nichts_ tun.

Wenn Sie Ihre Schlüssel verlieren, können sie nicht wiederhergestellt werden, und gestohlene Schlüssel geben Dieben sofortigen Zugang zu allen Geldmitteln auf einem Konto.

Smart Contract Wallets sind die Lösung für diese Probleme, aber heute sind sie schwer zu programmieren, weil letztendlich jede von ihnen implementierte Logik in eine Reihe von EOA-Transaktionen übersetzt werden muss, bevor sie von Ethereum verarbeitet werden können. Die Kontenabstraktion ermöglicht es Smart Contracts, selbst Transaktionen zu initiieren, sodass jede gewünschte Logik des Benutzers direkt in die Smart Contract Wallet programmiert und auf Ethereum ausgeführt werden kann.

Letztendlich verbessert die Kontenabstraktion die Unterstützung für Smart Contract Wallets, macht sie einfacher zu bauen und sicherer in der Anwendung. Schließlich ermöglicht die Kontenabstraktion den Nutzern, alle Vorteile von Ethereum zu genießen, ohne die zugrundeliegende Technologie kennen oder beachten zu müssen.

## Jenseits von Seed-Phrasen {#beyond-seed-phrases}

Die heutigen Konten sind durch private Schlüssel gesichert, die aus Seed-Phrasen berechnet werden. Jede Person, die Zugang zu einer Seed-Phrase hat, kann leicht den privaten Schlüssel entdecken, der ein Konto schützt, und Zugang zu allen von ihm geschützten Vermögenswerten erhalten. Wenn ein privater Schlüssel und eine Seed-Phrase verloren gehen, können sie nie wiederhergestellt werden und die von ihnen kontrollierten Vermögenswerte sind für immer eingefroren. Die Sicherung dieser Seed-Phrasen ist selbst für Experten umständlich und das Phishing von Seed-Phrasen ist eine der häufigsten Betrugsmethoden bei Nutzern.

Die Kontenabstraktion wird dieses Problem lösen, indem sie ein Smart Contract verwendet, um Vermögenswerte zu halten und Transaktionen zu autorisieren. Diese Smart Contracts können dann mit benutzerdefinierter Logik versehen werden, um sie so sicher wie möglich und an den Benutzer angepasst zu machen. Letztendlich verwenden Sie immer noch private Schlüssel, um den Zugang zu Ihrem Konto zu kontrollieren, aber mit Sicherheitsnetzen, die sie einfacher und sicherer zu verwalten machen.

Zum Beispiel können Backup-Schlüssel zu einer Wallet hinzugefügt werden, sodass, wenn Sie Ihren Hauptschlüssel verlieren oder versehentlich offenlegen, er durch einen neuen, sicheren Schlüssel ersetzt werden kann, mit Erlaubnis von den Backup-Schlüsseln. Möglicherweise sichern Sie jeden dieser Schlüssel auf unterschiedliche Weise oder verteilen sie auf vertrauenswürdige Verwalter. Das macht es für einen Dieb viel schwieriger, die volle Kontrolle über Ihre Geldmittel zu erlangen. Ebenso können Sie Regeln zur Wallet hinzufügen, um die Auswirkungen zu verringern, falls Ihr Hauptschlüssel kompromittiert wird. So können Sie beispielsweise zulassen, dass Transaktionen mit geringem Wert durch eine einzige Signatur verifiziert werden, wohingegen Transaktionen mit höherem Wert von mehreren authentifizierten Unterzeichnern genehmigt werden müssen. Es gibt noch andere Möglichkeiten, wie Smart-Contract-Wallets Ihnen dabei helfen können, Diebe abzuwehren. Eine Erlaubnisliste kann z. B. zur Blockierung jeder Transaktion verwendet werden, wenn diese nicht an eine vertrauenswürdige Adresse geht oder durch mehrere Ihrer vorab genehmigten Schlüssel verifiziert wurde.

### Beispiele für Sicherheitslogik, die in eine Smart Contract Wallet eingebaut werden kann:

- **Multisig-Autorisierung**: Sie können Autorisierungsdaten über mehrere vertrauenswürdige Personen oder Geräte verteilen. Dann kann der Vertrag so konfiguriert werden, dass Transaktionen über einem bestimmten vordefinierten Wert die Autorisierung von einem bestimmten Anteil (z.B. 3/5) der vertrauenswürdigen Parteien erfordern. Zum Beispiel könnten Transaktionen mit hohem Wert die Zustimmung sowohl von einem mobilen Gerät als auch von einer Hardware-Wallet erfordern, oder Signaturen von Konten, die an vertrauenswürdige Familienmitglieder verteilt wurden.
- **Kontosperrung**: Wenn ein Gerät verloren geht oder kompromittiert wird, kann das Konto von einem anderen autorisierten Gerät aus gesperrt werden, um die Vermögenswerte des Benutzers zu schützen.
- **Kontowiederherstellung**: Haben Sie ein Gerät verloren oder ein Passwort vergessen? Im aktuellen Paradigma könnte dies bedeuten, dass Ihre Vermögenswerte für immer eingefroren werden könnten. Mit einer Smart-Contract-Wallet können Sie eine Positivliste von Konten einrichten, mit der sich Geräte autorisieren und der Zugang zurücksetzen lassen.
- **Transaktionslimits festlegen**: Legen Sie tägliche Obergrenzen dafür fest, wie viel Wert innerhalb eines Tages/einer Woche/eines Monats von dem Konto überwiesen werden kann. Das bedeutet, wenn ein Angreifer Zugang zu Ihrem Konto erlangt, kann er nicht alles auf einmal abziehen und Sie haben die Möglichkeit, den Zugang zu sperren und zurückzusetzen.
- **Erstellen Sie Positivlisten**: Erlauben Sie nur Transaktionen an bestimmte Adressen, von denen Sie wissen, dass sie sicher sind. Das bedeutet, dass _selbst wenn_ Ihr privater Schlüssel gestohlen wurde, der Angreifer Geldmittel nur an Zielkonten auf Ihrer Liste senden könnte. Für eine Änderung an diesen Positivlisten wären mehrere Signaturen erforderlich, sodass ein Angreifer ohne Zugang zu mehreren Ihrer Sicherungsschlüssel seine eigene Adresse nicht in die Liste mit aufnehmen könnte.

## Bessere Nutzererfahrung {#better-user-experience}

Die Account-Abstraktion ermöglicht eine **bessere Gesamtbenutzererfahrung** sowie eine **verbesserte Sicherheit**, da sie auf Protokollebene Unterstützung für Smart-Contract-Wallets hinzufügt. Der wichtigste Grund dafür ist, dass es den Entwicklern von Smart Contracts, Wallets und Anwendungen viel mehr Freiheit geben wird, auf die Benutzererfahrung in Weisen zu innovieren, die wir möglicherweise noch nicht vorhersehen können. Einige offensichtliche Verbesserungen, die mit der Account-Abstraktion einhergehen werden, beinhalten das Bündeln von Transaktionen für Geschwindigkeit und Effizienz. So sollte sich beispielsweise ein einfacher Tausch mit nur einem Mausklick ausführen lassen. Heute müssen allerdings mehrere Transaktionen unterzeichnet werden, um das Ausgeben einzelner Token zu genehmigen, bevor der Tausch durchgeführt wird. Die Account-Abstraktion beseitigt diese Reibung, indem sie das Bündeln von Transaktionen ermöglicht. Darüber hinaus könnte die gebündelte Transaktion genau den richtigen Wert an Tokens genehmigen, der für jede Transaktion erforderlich ist, und dann die Genehmigungen nach Abschluss der Transaktion widerrufen, was zusätzliche Sicherheit bietet.

Das Gasmanagement wird durch die Account-Abstraktion ebenfalls stark verbessert. Nicht nur können Anwendungen anbieten, die Gasgebühren ihrer Nutzer zu übernehmen, sondern Gasgebühren können auch in Tokens, die nicht ETH sind, bezahlt werden. Dies befreit Nutzer davon, ein ETH-Guthaben zur Finanzierung von Transaktionen halten zu müssen. Dies würde funktionieren, indem die Tokens des Benutzers innerhalb des Vertrags gegen ETH getauscht und dann das ETH zur Bezahlung von Gas verwendet wird.

<ExpandableCard title="Wie kann Kontenabstraktion bei Gas helfen?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Das Gasmanagement ist eine der Hauptreibungspunkte für Nutzer von Ethereum, hauptsächlich weil ETH das einzige Asset ist, das zur Bezahlung von Transaktionen verwendet werden kann. Stellen Sie sich vor, Sie haben eine Wallet mit einem USDC-Guthaben, aber keinem ETH. Sie können diese USDC-Tokens nicht verschieben oder tauschen, weil Sie kein Gas bezahlen können. Sie können die USDC auch nicht gegen ETH tauschen, weil auch das Gas kostet. Sie müssten mehr ETH von einer Börse oder einer anderen Adresse an Ihr Konto senden, um das Problem zu lösen. Mit Smart-Contract-Wallets können Sie stattdessen einfach Gas in USDC bezahlen und so Ihr Konto freischalten. Sie müssen nicht mehr in all Ihren Konten ein ETH-Guthaben halten.

Die Account-Abstraktion ermöglicht es auch den Dapp-Entwicklern, kreativ mit dem Gasmanagement umzugehen. Zum Beispiel könnten Sie anfangen, Ihrer bevorzugten DEX jeden Monat eine feste Gebühr für unbegrenzte Transaktionen zu zahlen. Dapps könnten anbieten, alle Ihre Gasgebühren als Belohnung für die Nutzung ihrer Plattform zu übernehmen, oder als Angebot zur Kundenakquise. Es wird für Entwickler deutlich einfacher, Neuerungen im Bereich des Gasmanagements zu entwickeln, wenn Smart-Contract-Wallets auf Protokollebene unterstützt werden.

</ExpandableCard>

Vertrauenswürdige Sitzungen könnten ebenfalls die Benutzererfahrungen grundlegend verändern, insbesondere bei Anwendungen wie Spielen, bei denen in kurzer Zeit eine große Anzahl kleiner Transaktionen genehmigt werden muss. Das individuelle Genehmigen jeder Transaktion würde das Spielerlebnis stören, doch eine ständige Genehmigung birgt Risiken. Eine Smart-Contract-Wallet könnte bestimmte Transaktionen für eine festgelegte Zeit, bis zu einem bestimmten Wert oder nur an bestimmte Adressen genehmigen.

Es ist auch interessant zu überlegen, wie sich Käufe mit der Account-Abstraktion ändern könnten. Heute muss jede Transaktion aus einer Wallet, die vorab mit einer ausreichenden Menge des korrekten Tokens ausgestattet ist, genehmigt und ausgeführt werden. Mit der Account-Abstraktion könnte die Erfahrung eher wie das bekannte Online-Shopping sein, bei dem ein Benutzer einen "Warenkorb" mit Artikeln füllen und einmal klicken könnte, um alles auf einmal zu kaufen. Die dafür benötigte Logik würde vom Vertrag und nicht vom Benutzer gehandhabt.

Das sind nur einige Beispiele dafür, wie Benutzererfahrungen durch die Account-Abstraktion verbessert werden könnten, aber es gibt noch viele weitere, die wir uns noch nicht vorstellen können. Die Account-Abstraktion befreit Entwickler von den Beschränkungen der heutigen EOAs, ermöglicht es ihnen, die guten Aspekte von Web2 in Web3 zu bringen, ohne die Selbstverwahrung zu opfern, und kreativ an innovativen neuen Benutzererfahrungen zu arbeiten.

## Wie wird die Account-Abstraktion umgesetzt? {#how-will-aa-be-implemented}

Smart-Contract-Wallets existieren heute bereits, sind aber schwer zu implementieren, weil die EVM sie nicht unterstützt. Stattdessen verlassen sie sich darauf, relativ komplexe Code um Standard-Ethereum-Transaktionen zu wickeln. Ethereum kann dies ändern, indem es Smart Contracts erlaubt, Transaktionen zu initiieren und die notwendige Logik in Ethereum Smart Contracts statt off-chain zu behandeln. Das Einbringen von Logik in Smart Contracts erhöht auch die Dezentralisierung von Ethereum, da es die Notwendigkeit von "Relayern", die von Wallet-Entwicklern betrieben werden, um Nachrichten, die vom Benutzer signiert wurden, in reguläre Ethereum-Transaktionen zu übersetzen, beseitigt.

<ExpandableCard title="EIP-2771: Kontenabstraktion durch Meta-Transaktionen" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 führt das Konzept der Meta-Transaktionen ein, das es Dritten erlaubt, die Gas-Kosten eines Benutzers zu übernehmen, ohne Änderungen am Ethereum-Protokoll vorzunehmen. Die Idee ist, dass Transaktionen, die von einem Benutzer signiert wurden, an einen `Forwarder`-Vertrag gesendet werden. Der Weiterleiter ist eine vertrauenswürdige Entität, die überprüft, ob Transaktionen gültig sind, bevor sie sie an ein Gas-Relais weiterleitet. Dies geschieht off-chain und vermeidet die Notwendigkeit, Gas zu zahlen. Das Gas-Relais leitet die Transaktion an einen `Recipient`-Vertrag weiter und zahlt das notwendige Gas, um die Transaktion auf Ethereum ausführbar zu machen. Die Transaktion wird ausgeführt, wenn der `Forwarder` vom `Recipient` bekannt und vertraut ist. Dieses Modell macht es Entwicklern einfach, gaslose Transaktionen für Benutzer zu implementieren.

</ExpandableCard>

<ExpandableCard title="EIP-4337: Kontenabstraktion ohne Änderung des Ethereum-Protokolls" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337 ist der erste Schritt in Richtung nativer Smart-Contract-Wallet-Unterstützung auf dezentralisierte Weise, <em>ohne dass Änderungen am Ethereum-Protokoll erforderlich sind</em>. Anstatt die Konsensschicht zu modifizieren, um Smart-Contract-Wallets zu unterstützen, wird ein neues System getrennt vom normalen Transaktions-Gossip-Protokoll hinzugefügt. Dieses übergeordnete System ist um ein neues Objekt namens <code>UserOperation</code> herum aufgebaut, das die Aktionen eines Benutzers mit den entsprechenden Signaturen zusammenpackt. Diese <code>UserOperation</code>-Objekte werden dann in einen speziellen Mempool übertragen, wo Validatoren sie in einer "bundle" (gebündelten) Transaktion sammeln können. Die gebündelte Transaktion stellt eine Abfolge vieler einzelner <code>UserOperations</code> dar, kann wie eine normale Transaktion in Ethereum-Blöcke eingefügt werden und würde von Validierern mit einem ähnlichen Gebühren-maximierenden Auswahlmodell erfasst.

Die Art und Weise, wie Wallets funktionieren, würde sich auch unter EIP-4337 ändern. Anstatt in jedem Wallet eine gemeinsame, aber komplexe Sicherheitslogik zu implementieren, würden diese Funktionen in einen globalen Wallet contract ausgelagert, der als &quot;Einstiegspunkt&quot; bezeichnet wird. Dies würde Operationen wie das Bezahlen von Gebühren und das Ausführen von EVM-Code behandeln, sodass sich Wallet-Entwickler auf die Bereitstellung hervorragender Benutzererfahrungen konzentrieren können.

<strong>Hinweis</strong>: Der Einstiegs-Contract EIP 4337 wurde am 1. März 2023 auf dem Ethereum Mainnet deployt. Du kannst den Vertrag auf <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a> einsehen.

</ExpandableCard>

<ExpandableCard title="EIP-2938: Änderung des Ethereum-Protokolls zur Unterstützung der Kontenabstraktion" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> zielt darauf ab, das Ethereum-Protokoll um einen neuen Transaktionstyps zu ergänzen, <code>AA_TX_TYPE,</code> der drei Felder enthält: <code>nonce</code>, <code>target</code> und <code>data</code>, wobei die <code>nonce</code> ein Transaktions-Zähler ist, <code>target</code> die Einstiegs-Contract-Adresse und <code>data</code> der EVM bytecode. Um diese Transaktionen auszuführen, müssen dem EVM zwei neue Befehle (so genannte Opcodes) hinzugefügt werden: <code>NONCE</code> and <code>PAYGAS</code>. Der Opcode <code>NONCE</code> zeichnet die Transaktionssequenz auf und <code>PAYGAS</code> berechnet und entnimmt das zur Durchführung der Transaktion erforderliche Gas aus dem Vertragssaldo. Diese neuen Funktionen ermöglichen es Ethereum, Smart Contract Wallets nativ zu unterstützen, da die notwendige Infrastruktur in das Ethereum-Protokoll integriert ist.

Beachten Sie, dass EIP-2938 derzeit nicht aktiv ist. Die Community bevorzugt momentan EIP-4337, da es keine Änderungen am Protokoll erfordert.

</ExpandableCard>

<ExpandableCard title="EIP-3074: Upgrade von extern kontrollierten Konten für die Kontenabstraktion" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> zielt darauf ab, Ethereums externally owned accounts (EOAs) zu aktualisieren, indem es ihnen erlaubt, die Kontrolle an einen Smart Contract zu delegieren. Dies bedeutet, dass Transaktionen, die von einem von außen kontrollierten Konto ausgehen, durch die Logik eines Smart Contracts genehmigt werden könnten. Dies würde Funktionen wie Gas-Sponsoring und gebündelte Transaktionen ermöglichen. Damit dies funktioniert, müssen der EVM zwei neue Opcodes hinzugefügt werden: <code>AUTH</code> and <code>AUTHCALL</code>. Mit EIP-3074 werden die Vorteile einer Smart-Contract-Wallet verfügbar gemacht <em>ohne einen Smart Contract zu benötigen.</em> Stattdessen wickelt eine bestimmte Art von zustandslosem, vertrauenslosen, nicht aktualisierbarem Vertrag, der sogenannte "Invoker", die Transaktionen ab.

Beachte, dass EIP-3074 derzeit nicht aktiv ist. Die Community bevorzugt momentan EIP-4337, da es keine Änderungen am Protokoll erfordert.

</ExpandableCard>

## Aktueller Fortschritt {#current-progress}

Smart-Contract-Wallets sind bereits verfügbar, aber es sind noch weitere Verbesserungen erforderlich, um sie so dezentralisiert und erlaubnislos wie möglich zu gestalten. EIP-4337 ist ein ausgereifter Vorschlag, der keine Änderungen am Ethereum-Protokoll erfordert, daher könnte dieser möglicherweise schnell umgesetzt werden. Upgrades, die das Ethereum-Protokoll verändern, sind jedoch derzeit nicht in aktiver Entwicklung, daher könnte die Umsetzung dieser Änderungen deutlich länger dauern. Es ist auch möglich, dass die Kontenabstraktion durch EIP-4337 so gut gelingt, dass keine Protokolländerungen jemals erforderlich sind.

## Weiterführende Informationen {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Diskussionsrunde zur Kontenabstraktion von der Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Warum Kontenabstraktion ein Game-Changer für Dapps ist" von der Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Kontenabstraktion ELI5" von der Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Vitaliks Notizen zur "Road to Account Abstraction"](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitaliks Blogpost über Social-Recovery-Wallets](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Notizen zu EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Dokumentation zu EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Notizen zu EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Dokumentation zu EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentation zu EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- ["Grundlagen der Kontenabstraktion" -- Was ist Kontenabstraktion Teil I](https://www.alchemy.com/blog/account-abstraction)
