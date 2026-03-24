---
title: Prague-Electra (Pectra)
description: "Erfahren Sie mehr über das Pectra-Protokoll-Upgrade"
lang: de
---

# Pectra {#pectra}

Das Pectra-Netzwerk-Upgrade folgte auf [Dencun](/roadmap/dencun/) und brachte Änderungen sowohl auf der Ausführungsebene als auch auf der Konsensebene von Ethereum. Der verkürzte Name Pectra ist eine Kombination aus Prague und Electra, den jeweiligen Namen für die Spezifikationsänderungen der Ausführungs- und Konsensebene. Zusammen bringen diese Änderungen eine Reihe von Verbesserungen für [Ethereum](/)-Nutzer, Entwickler und Validatoren.

Dieses Upgrade wurde erfolgreich im Ethereum-Mainnet in der Epoche `364032` am **07. Mai 2025 um 10:05 Uhr (UTC)** aktiviert.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Das Pectra-Upgrade ist nur ein einzelner Schritt in den langfristigen Entwicklungszielen von Ethereum. Erfahren Sie mehr über [die Protokoll-Roadmap](/roadmap/) und [frühere Upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Verbesserungen in Pectra {#new-improvements}

Pectra bringt die größte Anzahl an [EIPs](https://eips.ethereum.org/) aller bisherigen Upgrades mit sich! Es gibt viele kleinere Änderungen, aber auch einige bedeutende neue Funktionen. Die vollständige Liste der Änderungen und technischen Details finden Sie in den einzelnen enthaltenen EIPs.

### EOA-Kontocode {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) stellt einen wichtigen Schritt in Richtung einer weitreichenden [Kontoabstraktion](/roadmap/account-abstraction/) dar. Mit dieser Funktion können Nutzer ihre Adresse ([Extern verwaltetes Konto (EOA)](/glossary/#eoa)) so einstellen, dass sie um einen Smart Contract erweitert wird. Der EIP führt eine neue Art von Transaktion mit einer spezifischen Funktion ein – er ermöglicht es Adressinhabern, eine Autorisierung zu signieren, die ihre Adresse so einstellt, dass sie einen ausgewählten Smart Contract nachahmt. 

Mit diesem EIP können sich Nutzer für programmierbare Wallets entscheiden, die neue Funktionen wie Transaktionsbündelung, gasfreie Transaktionen und benutzerdefinierten Asset-Zugriff für alternative Wiederherstellungsschemata ermöglichen. Dieser hybride Ansatz kombiniert die Einfachheit von EOAs mit der Programmierbarkeit von vertragsbasierten Konten. 

Lesen Sie [hier](/roadmap/pectra/7702/) eine detailliertere Analyse zu 7702.

### Erhöhung des maximalen effektiven Guthabens {#7251}

Das aktuelle effektive Guthaben des Validators beträgt genau 32 ETH. Es ist der erforderliche Mindestbetrag, um am Konsens teilzunehmen, aber gleichzeitig das Maximum, das ein einzelner Validator als Einsatz (Stake) hinterlegen kann.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) erhöht das maximal mögliche effektive Guthaben auf 2048 ETH, was bedeutet, dass ein einzelner Validator nun zwischen 32 und 2048 ETH staken kann. Anstelle von Vielfachen von 32 können Staker nun einen beliebigen ETH-Betrag für das Staking wählen und erhalten Belohnungen für jeden 1 ETH über dem Minimum. Wenn beispielsweise das Guthaben eines Validators durch seine Belohnungen auf 33 ETH anwächst, wird der zusätzliche 1 ETH ebenfalls als Teil des effektiven Guthabens betrachtet und erhält Belohnungen.

Aber der Vorteil eines besseren Belohnungssystems für Validatoren ist nur ein Teil dieser Verbesserung. [Staker](/staking/), die mehrere Validatoren betreiben, können diese nun zu einem einzigen zusammenfassen, was den Betrieb erleichtert und den Netzwerk-Overhead reduziert. Da jeder Validator in der Beacon Chain in jeder Epoche eine Signatur einreicht, steigen die Bandbreitenanforderungen mit mehr Validatoren und einer großen Anzahl von zu verbreitenden Signaturen. Die Aggregation von Validatoren wird das Netzwerk entlasten und neue Skalierungsoptionen eröffnen, während die gleiche wirtschaftliche Sicherheit erhalten bleibt.

Lesen Sie [hier](/roadmap/pectra/maxeb/) eine detailliertere Analyse zu maxEB.

### Erhöhung des Blob-Durchsatzes {#7691}

Blobs bieten [Datenverfügbarkeit](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) für L2s. Sie wurden im [vorherigen Netzwerk-Upgrade](/roadmap/dencun/) eingeführt. 

Derzeit zielt das Netzwerk auf durchschnittlich 3 Blobs pro Block mit einem Maximum von 6 Blobs ab. Mit [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) wird die durchschnittliche Blob-Anzahl auf 6 erhöht, mit einem Maximum von 9 pro Block, was zu einer erhöhten Kapazität für Ethereum-Rollups führt. Dieser EIP hilft, die Lücke zu überbrücken, bis [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) noch höhere Blob-Anzahlen ermöglicht.

### Erhöhung der Calldata-Kosten {#7623}

Vor der Einführung von [Blobs im Dencun-Upgrade](/roadmap/danksharding) nutzten L2s [Calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata), um ihre Daten in Ethereum zu speichern. Sowohl Blobs als auch Calldata wirken sich auf die Bandbreitennutzung von Ethereum aus. Während die meisten Blöcke nur eine minimale Menge an Calldata verwenden, können datenintensive Blöcke, die auch viele Blobs enthalten, schädlich für das P2P-Netzwerk von Ethereum sein. 

Um dies zu beheben, erhöht [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) die Calldata-Preise, jedoch nur für datenintensive Transaktionen. Dies begrenzt die Blockgröße im schlimmsten Fall, bietet einen Anreiz für L2s, nur Blobs zu verwenden, und lässt über 99 % der Transaktionen unberührt.

### Über die Ausführungsebene auslösbare Exits {#7002}

Derzeit ist das Beenden eines Validators und das [Abheben von gestakten ETH](/staking/withdrawals/) eine Operation auf der Konsensebene, die einen aktiven Validator-Schlüssel erfordert – denselben BLS-Schlüssel, der vom Validator verwendet wird, um aktive Aufgaben wie Bestätigungen auszuführen. Abhebungsberechtigungen (Withdrawal Credentials) sind ein separater Cold-Key, der den abgehobenen Einsatz empfängt, aber den Exit nicht auslösen kann. Die einzige Möglichkeit für Staker, einen Exit durchzuführen, besteht darin, eine spezielle Nachricht an das Beacon Chain-Netzwerk zu senden, die mit dem aktiven Validator-Schlüssel signiert ist. Dies ist einschränkend in Szenarien, in denen die Abhebungsberechtigungen und der Validator-Schlüssel von verschiedenen Entitäten gehalten werden oder wenn der Validator-Schlüssel verloren geht.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) führt einen neuen Vertrag ein, der verwendet werden kann, um den Exit mithilfe von Abhebungsberechtigungen der Ausführungsebene auszulösen. Staker werden in der Lage sein, ihren Validator zu beenden, indem sie eine Funktion in diesem speziellen Vertrag aufrufen, ohne dass sie ihren Validator-Signaturschlüssel oder überhaupt Zugang zur Beacon Chain benötigen. Wichtig ist, dass die Ermöglichung von Validator-Abhebungen auf der Blockchain Staking-Protokolle mit reduzierten Vertrauensannahmen gegenüber den Betreibern von Blockchain-Knoten ermöglicht.

### Validator-Einzahlungen auf der Blockchain {#6110}

Validator-Einzahlungen werden derzeit durch [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) verarbeitet, was eine Funktion auf der Beacon Chain ist, die Daten von der Ausführungsebene abruft. Es ist eine Art technische Schuld aus der Zeit vor dem Merge, als die Beacon Chain ein separates Netzwerk war und sich mit Proof-of-Work-Reorganisationen befassen musste. 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) ist ein neuer Weg, um Einzahlungen von der Ausführungs- an die Konsensebene zu übermitteln, was eine sofortige Verarbeitung mit geringerer Implementierungskomplexität ermöglicht. Es ist eine sicherere Methode zur Handhabung von Einzahlungen, die nativ für das zusammengeführte Ethereum ist. Es hilft auch, das Protokoll zukunftssicher zu machen, da es keine historischen Einzahlungen erfordert, um den Blockchain-Knoten zu starten, was für den Ablauf der Historie notwendig ist.

### Precompile für BLS12-381 {#2537}

Precompiles sind eine spezielle Gruppe von Smart Contracts, die direkt in die Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) integriert sind. Im Gegensatz zu regulären Verträgen werden Precompiles nicht von Nutzern bereitgestellt, sondern sind Teil der Client-Implementierung selbst und in deren nativer Sprache geschrieben (z. B. Go, Java usw., nicht Solidity). Precompiles dienen für weit verbreitete und standardisierte Funktionen wie kryptografische Operationen. Smart Contract-Entwickler können Precompiles wie einen regulären Vertrag aufrufen, jedoch mit mehr Sicherheit und Effizienz.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) fügt neue Precompiles für Kurvenoperationen über [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) hinzu. Diese elliptische Kurve wurde dank ihrer praktischen Eigenschaften in Kryptowährungs-Ökosystemen weit verbreitet. Genauer gesagt wurde sie von der Konsensebene von Ethereum übernommen, wo sie von Validatoren verwendet wird.

Das neue Precompile fügt für jeden Entwickler die Möglichkeit hinzu, kryptografische Operationen mit dieser Kurve einfach, effizient und sicher durchzuführen, beispielsweise das Verifizieren von Signaturen. Anwendungen auf der Blockchain, die von dieser Kurve abhängen, können gas-effizienter und sicherer werden, indem sie sich auf ein Precompile anstelle eines benutzerdefinierten Vertrags verlassen. Dies gilt hauptsächlich für Anwendungen, die innerhalb der EVM über Validatoren nachdenken wollen, z. B. Staking-Pools, [Restaking](/restaking/), Light Clients, kettenübergreifende Brücken, aber auch Zero-Knowledge.

### Bereitstellung historischer Block-Hashes aus dem Zustand {#2935}

Die EVM bietet derzeit den `BLOCKHASH`-Opcode, der es Vertragsentwicklern ermöglicht, den Hash eines Blocks direkt in der Ausführungsebene abzurufen. Dies ist jedoch auf die letzten 256 Blöcke beschränkt und könnte in Zukunft für zustandslose Clients problematisch werden.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) erstellt einen neuen Systemvertrag, der die letzten 8192 Block-Hashes als Speicherplätze bereitstellen kann. Dies hilft, das Protokoll für die zustandslose Ausführung zukunftssicher zu machen, und wird effizienter, wenn Verkle-Tries übernommen werden. Abgesehen davon können Rollups jedoch sofort davon profitieren, da sie den Vertrag direkt mit einem längeren historischen Fenster abfragen können.

### Verschiebung des Komitee-Index außerhalb der Bestätigung {#7549}

Der Konsens der Beacon Chain basiert darauf, dass Validatoren ihre Stimmen für den neuesten Block und die finalisierte Epoche abgeben. Die Bestätigung umfasst 3 Elemente, von denen 2 Stimmen sind und das dritte der Wert des Komitee-Index ist.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) verschiebt diesen Index außerhalb der signierten Bestätigungsnachricht, was es einfacher macht, Konsensstimmen zu verifizieren und zu aggregieren. Dies wird mehr Effizienz in jedem Konsens-Client ermöglichen und kann signifikante Leistungsverbesserungen für Zero-Knowledge-Schaltkreise zum Nachweis des Ethereum-Konsenses bringen.

### Hinzufügen des Blob-Zeitplans zu EL-Konfigurationsdateien {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) ist eine einfache Änderung, die der Konfiguration des Ausführungs-Clients ein neues Feld hinzufügt. Es konfiguriert die Anzahl der Blöcke und ermöglicht eine dynamische Einstellung für Ziel- und maximale Blob-Anzahlen pro Block sowie die Anpassung der Blob-Gebühr. Mit einer direkt definierten Konfiguration können Clients die Komplexität des Austauschs dieser Informationen über die Engine-API vermeiden.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Um mehr darüber zu erfahren, wie sich Pectra speziell auf Sie als Ethereum-Nutzer, Entwickler oder Validator auswirkt, werfen Sie einen Blick in die <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra-FAQ</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Betrifft dieses Upgrade alle Ethereum-Blockchain-Knoten und Validatoren? {#client-impact}

Ja, das Pectra-Upgrade erfordert Updates sowohl für [Ausführungs-Clients als auch für Konsens-Clients](/developers/docs/nodes-and-clients/). Alle wichtigen Ethereum-Clients werden Versionen veröffentlichen, die den Hard Fork unterstützen und als hohe Priorität markiert sind. Um die Synchronisation mit dem Ethereum-Netzwerk nach dem Upgrade aufrechtzuerhalten, müssen Betreiber von Blockchain-Knoten sicherstellen, dass sie eine unterstützte Client-Version ausführen. Beachten Sie, dass die Informationen zu Client-Veröffentlichungen zeitkritisch sind und Nutzer sich für die aktuellsten Details auf die neuesten Updates beziehen sollten.

## Wie können ETH nach dem Hard Fork konvertiert werden? {#scam-alert}

- **Keine Aktion für Ihre ETH erforderlich**: Nach dem Ethereum-Pectra-Upgrade besteht keine Notwendigkeit, Ihre ETH zu konvertieren oder zu aktualisieren. Ihre Kontostände bleiben gleich, und die ETH, die Sie derzeit halten, bleiben nach dem Hard Fork in ihrer bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Sie müssen im Zusammenhang mit diesem Upgrade nichts tun. Ihre Vermögenswerte bleiben völlig unberührt. Denken Sie daran, dass es die beste Verteidigung gegen Betrug ist, informiert zu bleiben.

[Mehr zum Erkennen und Vermeiden von Betrug](/security/)

## Lernen Sie lieber visuell? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_What’s Going Into the Pectra Upgrade? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Ethereum Pectra Upgrade: What Stakers Need to Know — Blockdaemon_

## Weiterführende Literatur {#further-reading}

- [Ethereum-Roadmap](/roadmap/)
- [Pectra-FAQ](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf-Infoseite](https://pectra.wtf)
- [Wie Pectra die Staker-Erfahrung verbessert](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP7702-Infoseite](https://eip7702.io/)
- [Pectra-Devnets](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)