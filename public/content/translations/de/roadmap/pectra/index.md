---
title: Prag-Electra (Pectra)
description: "Erfahre mehr über das Pectra-Protokoll-Upgrade"
lang: de
---

# Pectra {#pectra}

Das Pectra-Netzwerk-Upgrade folgte auf [Dencun](/roadmap/dencun/) und brachte Änderungen sowohl an der Ausführungsebene als auch an der Konsens-Ebene von Ethereum. Der verkürzte Name Pectra ist eine Kombination aus Prag und Electra, den jeweiligen Namen für die Spezifikationsänderungen der Ausführungs- und der Konsens-Ebene. Zusammen bringen diese Änderungen eine Reihe von Verbesserungen für Ethereum-Nutzer, Entwickler und Validatoren.

Dieses Upgrade wurde erfolgreich im Ethereum-Mainnet bei Epoche `364032` am **7. Mai 2025 um 10:05 (UTC)** aktiviert.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Das Pectra-Upgrade ist nur ein einziger Schritt in den langfristigen Entwicklungszielen von Ethereum. Erfahre mehr über die [Protokoll-Roadmap](/roadmap/) und [frühere Upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Verbesserungen in Pectra {#new-improvements}

Pectra bringt die größte Anzahl an [EIPs](https://eips.ethereum.org/) aller bisherigen Upgrades mit sich! Es gibt viele kleinere Änderungen, aber auch einige wichtige neue Funktionen. Die vollständige Liste der Änderungen und technischen Details findet sich in den einzelnen enthaltenen EIPs.

### EOA-Konto-Code {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) stellt einen wichtigen Schritt in Richtung einer weitreichenden [Kontoabstraktion](/roadmap/account-abstraction/) dar. Mit dieser Funktion können Nutzer ihre Adresse ([EOA](/glossary/#eoa)) so einstellen, dass sie um einen Smart Contract erweitert wird. Der EIP führt einen neuen Transaktionstyp mit einer spezifischen Funktion ein: Adressinhabern wird es ermöglicht, eine Autorisierung zu unterzeichnen, die ihre Adresse so einstellt, dass sie einen ausgewählten Smart Contract nachahmt.

Mit diesem EIP können sich Nutzer für programmierbare Wallets entscheiden, die neue Funktionen wie Transaktionsbündelung, gaslose Transaktionen und benutzerdefinierten Asset-Zugriff für alternative Wiederherstellungsschemata ermöglichen. Dieser hybride Ansatz kombiniert die Einfachheit von EOAs mit der Programmierbarkeit von vertragsbasierten Konten.

Eine ausführlichere Beschreibung von 7702 findest du [hier](/roadmap/pectra/7702/)

### Erhöhung des maximalen effektiven Guthabens {#7251}

Das aktuelle effektive Guthaben des Validators beträgt genau 32 ETH. Das ist der minimal notwendige Betrag, um am Konsens teilzunehmen, aber gleichzeitig das Maximum, das ein einzelner Validator staken kann.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) erhöht das maximal mögliche effektive Guthaben auf 2048 ETH, was bedeutet, dass ein einzelner Validator nun zwischen 32 und 2048 ETH staken kann. Anstatt Vielfache von 32 zu staken, können Staker nun einen beliebigen ETH-Betrag zum Staken wählen und erhalten Belohnungen für jeden ETH über dem Minimum. Wenn zum Beispiel das Guthaben eines Validators mit seinen Belohnungen auf 33 ETH anwächst, wird der zusätzliche 1 ETH ebenfalls als Teil des effektiven Guthabens betrachtet und erhält Belohnungen.

Aber der Vorteil eines besseren Belohnungssystems für Validatoren ist nur ein Teil dieser Verbesserung. [Staker](/staking/), die mehrere Validatoren betreiben, können diese nun zu einem einzigen zusammenfassen, was den Betrieb erleichtert und den Netzwerk-Overhead reduziert. Da jeder Validator in der Beacon Chain in jeder Epoche eine Signatur einreicht, wachsen die Bandbreitenanforderungen mit mehr Validatoren und einer großen Anzahl zu verbreitender Signaturen. Die Zusammenfassung von Validatoren wird das Netzwerk entlasten und neue Skalierungsoptionen eröffnen, während die gleiche wirtschaftliche Sicherheit erhalten bleibt.

Eine ausführlichere Beschreibung von maxEB findest du [hier](/roadmap/pectra/maxeb/)

### Erhöhung des Blob-Durchsatzes {#7691}

Blobs bieten [Datenverfügbarkeit](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) für L2s. Sie wurden im [vorherigen Netzwerk-Upgrade](/roadmap/dencun/) eingeführt.

Derzeit zielt das Netzwerk auf durchschnittlich 3 Blobs pro Block mit einem Maximum von 6 Blobs ab. Mit [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) wird die durchschnittliche Blob-Anzahl auf 6 erhöht, mit einem Maximum von 9 pro Block, was zu einer erhöhten Kapazität für Ethereum-Rollups führt. Dieses EIP hilft, die Lücke zu überbrücken, bis [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) noch höhere Blob-Anzahlen ermöglicht.

### Erhöhung der Calldata-Kosten {#7623}

Vor der Einführung von [Blobs im Dencun-Upgrade](/roadmap/danksharding) verwendeten L2s [Calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata), um ihre Daten in Ethereum zu speichern. Sowohl Blobs als auch Calldata beeinflussen die Bandbreitennutzung von Ethereum. Während die meisten Blöcke nur eine minimale Menge an Calldata verwenden, können datenintensive Blöcke, die auch viele Blobs enthalten, schädlich für das P2P-Netzwerk von Ethereum sein.

Um dieses Problem zu beheben, erhöht [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) die Preise für Calldata, aber nur für datenintensive Transaktionen. Dies begrenzt die Blockgröße im schlimmsten Fall, bietet einen Anreiz für L2s, nur Blobs zu verwenden, und lässt über 99 % der Transaktionen unberührt.

### Auslösbare Exits der Ausführungsebene {#7002}

Derzeit ist das Verlassen eines Validators und das [Abheben von gestakten ETH](/staking/withdrawals/) ein Vorgang der Konsens-Ebene, der einen aktiven Validator-Schlüssel erfordert, denselben BLS-Schlüssel, den der Validator zur Erfüllung aktiver Aufgaben wie Attestierungen verwendet. Die „Withdrawal Credentials“ sind ein separater Cold Key, der den ausgetretenen Stake empfängt, aber den Austritt nicht auslösen kann. Die einzige Möglichkeit für Staker, auszusteigen, besteht darin, eine spezielle Nachricht an das Beacon-Chain-Netzwerk zu senden, die mit dem aktiven Validator-Schlüssel signiert ist. Dies ist in Szenarien einschränkend, in denen die „Withdrawal Credentials“ und der Validator-Schlüssel von verschiedenen Entitäten gehalten werden oder wenn der Validator-Schlüssel verloren geht.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) führt einen neuen Vertrag ein, der verwendet werden kann, um den Austritt unter Verwendung der „Withdrawal Credentials“ der Ausführungsebene auszulösen. Staker können ihren Validator verlassen, indem sie eine Funktion in diesem speziellen Vertrag aufrufen, ohne dass sie ihren Validator-Signierschlüssel benötigen oder überhaupt auf die Beacon Chain zugreifen müssen. Wichtig ist, dass die Aktivierung von Validator-Abhebungen on-chain Staking-Protokolle mit reduzierten Vertrauensannahmen gegenüber Node-Betreibern ermöglicht.

### Validator-Einzahlungen on-chain {#6110}

Validator-Einzahlungen werden derzeit durch das [eth1data-Polling](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) verarbeitet, einer Funktion auf der Beacon Chain, die Daten von der Ausführungsebene abruft. Es handelt sich um eine Art technische Schuld aus der Zeit vor The Merge, als die Beacon Chain ein separates Netzwerk war und sich mit Proof-of-Work-Re-Orgs befassen musste.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) ist eine neue Methode zur Übermittlung von Einzahlungen von der Ausführungs- an die Konsens-Ebene, die eine sofortige Verarbeitung mit geringerer Implementierungskomplexität ermöglicht. Es ist eine sicherere Art, Einzahlungen zu handhaben, die für das vereinte Ethereum nativ ist. Es hilft auch, das Protokoll zukunftssicher zu machen, da es keine historischen Einzahlungen zum Bootstrapping der Node benötigt, was für den Ablauf der Historie notwendig ist.

### Precompile für BLS12-381 {#2537}

Precompiles sind ein spezieller Satz von Smart Contracts, die direkt in die Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) integriert sind. Im Gegensatz zu regulären Verträgen werden Precompiles nicht von Nutzern bereitgestellt, sondern sind Teil der Client-Implementierung selbst und in deren nativer Sprache geschrieben (z. B. Go, Java, etc., nicht Solidity). Precompiles dienen für weit verbreitete und standardisierte Funktionen wie kryptografische Operationen. Smart-Contract-Entwickler können Precompiles wie einen regulären Vertrag aufrufen, aber mit mehr Sicherheit und Effizienz.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) fügt neue Precompiles für Kurvenoperationen über [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) hinzu. Diese elliptische Kurve ist dank ihrer praktischen Eigenschaften in Kryptowährungs-Ökosystemen weit verbreitet. Genauer gesagt wurde sie von der Konsens-Ebene von Ethereum übernommen, wo sie von Validatoren verwendet wird.

Der neue Precompile gibt jedem Entwickler die Möglichkeit, kryptografische Operationen mit dieser Kurve einfach, effizient und sicher durchzuführen, zum Beispiel die Überprüfung von Signaturen. On-Chain-Anwendungen, die von dieser Kurve abhängen, können gas-effizienter und sicherer werden, indem sie sich auf einen Precompile anstatt auf einen benutzerdefinierten Vertrag verlassen. Dies gilt hauptsächlich für Anwendungen, die über Validatoren innerhalb der EVM nachdenken möchten, z. B. Staking-Pools, [Restaking](/restaking/), Light Clients, kettenübergreifende Brücken, aber auch Zero-Knowledge.

### Bereitstellung historischer Block-Hashes aus dem State {#2935}

Die EVM stellt derzeit den `BLOCKHASH`-Opcode zur Verfügung, der es Vertragsentwicklern ermöglicht, den Hash eines Blocks direkt in der Ausführungsebene abzurufen. Dies ist jedoch nur auf die letzten 256 Blöcke beschränkt und könnte in Zukunft für zustandslose Clients problematisch werden.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) erstellt einen neuen Systemvertrag, der die letzten 8192 Block-Hashes als Storage-Slots bereitstellen kann. Dies trägt dazu bei, das Protokoll für eine zustandslose Ausführung zukunftssicher zu machen, und wird effizienter, wenn Verkle-Tries übernommen werden. Abgesehen davon können Rollups jedoch sofort davon profitieren, da sie den Vertrag direkt mit einem längeren historischen Fenster abfragen können.

### Verschieben des Komitee-Index außerhalb der Attestierung {#7549}

Der Konsens der Beacon Chain basiert darauf, dass Validatoren ihre Stimmen für den neuesten Block und die finalisierte Epoche abgeben. Die Attestierung enthält 3 Elemente, von denen 2 Stimmen und das dritte der Wert des Komitee-Index ist.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) verschiebt diesen Index aus der signierten Attestierungsnachricht heraus, was die Überprüfung und Aggregation von Konsens-Stimmen erleichtert. Dies ermöglicht mehr Effizienz in jedem Konsens-Client und kann erhebliche Leistungsverbesserungen für Zero-Knowledge-Schaltungen zum Beweis des Ethereum-Konsens bringen.

### Blob-Zeitplan zu EL-Konfigurationsdateien hinzufügen {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) ist eine einfache Änderung, die ein neues Feld zur Client-Konfiguration der Ausführungsebene hinzufügt. Es konfiguriert die Anzahl der Blöcke und ermöglicht die dynamische Einstellung der Ziel- und Maximalanzahl von Blobs pro Block sowie die Anpassung der Blob-Gebühr. Mit einer direkt definierten Konfiguration können Clients die Komplexität des Austauschs dieser Informationen über die Engine-API vermeiden.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Um mehr darüber zu erfahren, wie Pectra dich speziell als Ethereum-Nutzer, Entwickler oder Validator betrifft, schau in die <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra-FAQ</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Betrifft dieses Upgrade alle Ethereum-Nodes und -Validatoren? {#client-impact}

Ja, das Pectra-Upgrade erfordert Updates sowohl für [Ausführungs-Clients als auch für Konsens-Clients](/developers/docs/nodes-and-clients/). Alle wichtigen Ethereum-Clients werden Versionen veröffentlichen, die den als hochprioritär eingestuften Hard Fork unterstützen. Um nach dem Upgrade die Synchronisation mit dem Ethereum-Netzwerk aufrechtzuerhalten, müssen die Knotenbetreiber sicherstellen, dass die von ihnen eingesetzte Client-Version unterstützt wird. Beachten Sie, dass die Informationen zu Client-Versionen zeitkritisch sind, und Benutzer sollten die neuesten Updates konsultieren, um die die aktuellsten Details zu erfahren.

## Wie können ETH nach der harten Abspaltung umgewandelt werden? {#scam-alert}

- **Keine Aktion für deine ETH erforderlich**: Nach dem Ethereum-Pectra-Upgrade ist es nicht notwendig, deine ETH umzuwandeln oder zu aktualisieren. Ihre Kontoguthaben bleiben unverändert und die ETH, die Sie derzeit besitzen, bleiben auch nach der harten Abspaltung in der bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Es gibt nichts, was Sie in Bezug auf dieses Upgrade tun müssen. Ihre Assets bleiben davon völlig unberührt. Denken Sie daran: Informiert zu sein ist der beste Schutz vor Betrug.

[Mehr zur Erkennung und Vermeidung von Betrug](/security/)

## Eher der visuelle Lernende? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Was beinhaltet das Pectra-Upgrade? – Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Ethereum-Pectra-Upgrade: Was Staker wissen müssen – Blockdaemon_

## Weiterführende Lektüre {#further-reading}

- [Ethereum-Roadmap](/roadmap/)
- [Pectra-FAQ](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf-Infoseite](https://pectra.wtf)
- [Wie Pectra die Erfahrung für Staker verbessert](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP7702-Infoseite](https://eip7702.io/)
- [Pectra-Devnets](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
