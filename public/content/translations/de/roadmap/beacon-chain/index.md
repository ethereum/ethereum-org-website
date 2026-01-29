---
title: Die Beacon-Chain
description: "Informieren Sie sich über die Beacon Chain – das Upgrade, mit dem Proof-of-Stake für Ethereum eingeführt wurde"
lang: de
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: "Mit der Bacon Chain wurde Proof-of-Stake in das Ethereum-Ökosystem eingeführt."
summaryPoint2: "Sie wurde im September 2022 mit der ursprünglichen Proof-of-Work-Blockchain von Ethereum vereinigt."
summaryPoint3: "Mit der Beacon Chain wurde die Konsenslogik und das Block-Gossip-Protokoll eingeführt, die heute für die Sicherheit von Ethereum sorgen."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Die Beacon Chain wurde am 1. Dezember 2020 eingeführt und formalisierte mit dem „The Merge“-Upgrade am 15. September 2022 Proof-of-Stake als Konsensmechanismus von Ethereum.
</UpgradeStatus>

## Was ist die Beacon Chain? {#what-is-the-beacon-chain}

Die Beacon Chain ist der Name der ursprünglichen Proof-of-Stake (Anteilsnachweis) Blockchain, die im Jahr 2020 eingeführt wurde. Sie wurde geschaffen, um sicherzustellen, dass die Proof-of-Stake Konsenslogik sicher und nachhaltig ist, bevor sie auf dem Ethereum Mainnet eingeführt wurde. Sie wurde daher neben dem ursprünglichen Proof-of-Work Konsens für Ethereum betrieben. Die Beacon Chain bestand aus 'leeren' Blöcken. Die Umstellung von Proof-of-Work (Arbeitsnachweis) auf den Proof-of-Stake (Anteilsnachweis) Mechanismus auf Ethereum erforderte jedoch, dass die Beacon Chain angewiesen wurde, Transaktionsdaten von Ausführungsklienten anzunehmen, sie zu Blockbündeln zusammenzuführen und sie dann mithilfe eines auf dem Proof-of-Stake-Mechanismus basierenden Konsensverfahrens in eine Blockchain zu organisieren. Zur gleichen Zeit haben die ursprünglichen Ethereum Clients ihr Mining, die Blockausbreitung und die Konsenslogik abgeschaltet und alles an die Beacon Chain übergeben. Dieses Ereignis war als [The Merge](/roadmap/merge/) bekannt. Nachdem das Merge (Fusion)-Ereignis erfolgreich abgeschlossen war, existierten keine zwei Blockchains mehr. Stattdessen existierte nur noch ein Proof-of-Stake Ethereum, für das nun pro Knoten zwei verschiedene Klienten erforderlich waren. Die Beacon Chain ist nun die Konsensus-Ebene, ein Peer-to-Peer-Netzwerk von Konsens-Clients, das für den Block-Tratsch und die Konsensus-Logik zuständig ist, während die ursprünglichen Clients die Ausführungs-Ebene bilden, die für den Tratsch und die Ausführung von Transaktionen sowie die Verwaltung des Ethereum-Status verantwortlich ist. Die beiden Schichten können über die Engine-API miteinander kommunizieren.

## Welche Funktion hat die Beacon Chain? {#what-does-the-beacon-chain-do}
Die Beacon Chain ist die Bezeichnung für ein Hauptbuch von Konten, das das Netzwerk der Ethereum-[Staker](/staking/) betrieb und koordinierte, bevor diese Staker mit der Validierung echter Ethereum-Blöcke begannen. Es werden jedoch keine Transaktionen verarbeitet oder Smart-Contract-Interaktionen abgewickelt, da dies in der Ausführungs-Ebene geschieht.
Die Beacon Chain ist verantwortlich für Dinge wie die Handhabung von Blöcken und Bescheinigungen, die Ausführung des Fork-Choice-Algorithmus und die Verwaltung von Belohnungen und Strafen.
Lesen Sie mehr auf unserer [Seite zur Node-Architektur](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Auswirkungen der Beacon Chain {#beacon-chain-features}

### Einführung von Staking {#introducing-staking}

Die Beacon Chain hat [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) bei Ethereum eingeführt. Dieser Mechanismus sichert Ethereum und sorgt dafür, dass die Validatoren dabei ETH verdienen. In der Praxis bedeutet dies ETH einzusetzen, um die Validierungssoftware zu aktivieren. Als Staker führen Sie die Software aus die in der Chain neue Blöcke erstellt und validiert.

Staking erfüllt einen ähnlichen Zweck wie früher das [Mining](/developers/docs/consensus-mechanisms/pow/mining/), unterscheidet sich aber in vielerlei Hinsicht. Mining erforderte hohe Voraufwendungen in Form von mächtiger Hardware und hohem Energieverbrauch. Dies führte zu Skaleneffekten und förderte Zentralisierung. Mining sah auch keine Verpflichtung vor Vermögenswerte, als Sicherheiten zu sperren. Das Protokoll hatte dadurch weniger Möglichkeiten feindselige Akteure nach einer Attacke zu bestrafen.

Der Wechsel zu Proof-of-Stake machte Ethereum wesentlich sicherer und dezentralisierte im Vergleich zu Proof-of-Work. Je mehr Menschen sich am Netzwerk beteiligen, desto dezentralisierter und sicherer wird es vor Angriffen.

<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Wenn Sie daran interessiert sind, ein Validator zu werden und bei der Sicherung von Ethereum zu helfen, [erfahren Sie mehr über Staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Vorbereitung für das Sharding {#setting-up-for-sharding}

Seit die Beacon Chain mit dem ursprünglichen Ethereum Mainnet zusammengeführt wurde, hat die Ethereum Community damit begonnen das Netzwerk zu skalieren.

Proof-of-Stake bietet den Vorteil, dass es zu jeder Zeit eine Registry aller zugelassener Blockproduzenten, die ETH eingesetzt haben, besitzt. Diese Registry bereitet den Weg teilen und herrschen anzuwenden, aber verlässlich spezifische Verantwortungen im Netzwerk zu teilen.

Diese Verantwortung steht im Gegensatz zu Proof-of-Work, wo Miner keine Verantwortung gegenüber dem Netzwerk haben und jederzeit, ohne Auswirkungen, ihr Mining beenden und ihre Node-Software permanent abschalten konnten. Es gibt auch keine Registry bekannter Blockvorschläger und keinen verlässlichen Weg Verantwortung sicher im Netzwerk zu teilen.

[Mehr zum Sharding](/roadmap/danksharding/)

## Beziehung zwischen Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades sind alle in gewisser Weise miteinander verbunden. Zusammenfassend wirkt sich die Beacon Chain auf weitere Upgrades wie folgt aus:

### Beacon Chain und The Merge {#merge-and-beacon-chain}

Zunächst existierte die Beacon Chain getrennt vom Ethereum Mainnet. Sie wurden im Jahre 2022 zusammengeführt.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Sharding kann nur sicher in das Ethereum Ökosystem eingeführt werden, wenn ein Proof-of-Stake Konsensmechanismus aktiv ist. Die Beacon Chain, welche mit Mainnet zusammengeführt wurde, führte das Staking ein. Dieses ebnet den Weg für Sharding, was wiederum bei einer besseren Skalierung von Ethereum hilft.

<ButtonLink href="/roadmap/danksharding/">
  Shard-Chains
</ButtonLink>

## Weiterführende Informationen

- [Mehr zur Node-Architektur](/developers/docs/nodes-and-clients/node-architecture)
- [Mehr zu Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)
