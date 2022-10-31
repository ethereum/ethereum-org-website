---
title: Ethereums Energieverbrauch
description: Grundlegende Informationen, um den generellen Energieverbrauch von Ethereum verstehen zu können
lang: de
---

# Ethereums Energieverbrauch {#introduction}

Die derzeitigen Energiekosten von Ethereum durch den [Proof-of-Work](/developers/docs/consensus-mechanisms/#proof-of-work) sind zu hoch und nicht nachhaltig. Lösungen für den Energieverbrauch zu finden, ohne Einbußen bei Sicherheit und Dezentralisierung, ist eine große technische Herausforderung und steht seit Jahren im Mittelpunkt unserer Forschung und Entwicklung. Sehen wir uns nun genauer an, warum der Aufbau von Ethereum mit einer so starken Umweltbelastung einher ging und inwiefern das bevorstehende Netzwerk-Upgrade zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) eine erhebliche Veränderung bringen wird.

## Energie schützt das Netzwerk {#energy-secures-the-network}

Transaktionen werden in der Ethereum-Blockchain von [Minern](/developers/docs/consensus-mechanisms/pow/mining) validiert. Miner bündeln Transaktionen zu geordneten Blöcken und fügen sie der Ethereum-Blockchain hinzu. Die neuen Blöcke werden zu allen anderen Knotenbetreibern übertragen. Die Knotenbetreiber führen die Transaktionen selbständig aus, um sicher zu stellen, dass die Transaktionen alle gültig sind. Jede Unehrlichkeit wird als Inkonsistenz zwischen den verschiedenen Knoten angezeigt. Ehrliche Blöcke werden der Blockchain hinzugefügt und werden ein unveränderlicher Teil des Verlaufs.

Damit Miner neue Blöcke hinzufügen können, muss das Mining etwas kosten. Zudem braucht es eine gewisse Unvorhersehbarkeit, über welchen Knoten der nächste Block hinzugefügt wird. Diese Bedingungen werden durch die Auferlegung eines Arbeitsnachweises, einen sogenannten Proof-of-Work (PoW), erfüllt. Um einen Block an Transaktionen einreichen zu können, muss ein Miner ein willkürliches Rechenrätsel schneller lösen als alle anderen Miner. Bei Lösung des Rätsels entsteht ein Wettbewerb zwischen Minern und es entstehen Kosten in Form von Energieausgaben. Für einen erfolgreichen Betrug der Blockchain müsste ein unehrlicher Miner konstant das Proof-of-Work-Rennen gewinnen – und was wäre sehr unwahrscheinlich und unerschwinglich teuer.

Ethereum setzt schon seit Anfang an auf den Proof-of-Work. Der Wechsel vom Proof-of-Work zum Proof-of-Stake war schon immer ein ganz elementares Ziel von Ethereum. Allerdings ist die Entwicklung eines Proof-of-Stake-Systems, in dem es keine Einbußen bei den wesentlichen Prinzipien von Sicherheit und Dezentralisierung gibt, nicht gerade einfach. Es erforderte viel Forschungsarbeit und zahlreiche Durchbrüche in der Kryptographie, Kryptowirtschaft und in der Gestaltung von Mechanismen, um zu dem Punkt zu gelangen, an dem ein Übergang möglich ist.

## Energieverbrauch beim Proof-of-Work {#proof-of-work}

Der Proof-of-Work ist eine solide Möglichkeit, um das Netzwerk zu sichern und ehrliche Änderungen an der Blockchain durchzusetzen. Doch es gibt auch Nachteile. Da für das Mining in einem Block das Lösen eines willkürlichen Rechenrätsels erforderlich ist, können Miner mit leistungsfähiger Hardware ihre Erfolgschancen erhöhen. Diese Aussicht zieht ein Wettrüsten nach sich, bei dem Miner zunehmend Mining-Geräte mit extrem hohem Energiebedarf erwerben. Ethereums Proof-of-Work-Protokoll hat aktuell einen jährlichen Gesamtstromverbrauch, der ungefähr dem von Finnland entspricht<sup>[^1]</sup>, und einen Co2-Fußabdruck ähnlich der Schweiz<sup>[^1]</sup>.

## Proof-of-Stake {#proof-of-stake}

Eine grünere Zukunft für Ethereum wird bereits gearbeitet, in Form einer [** Proof-of-Stake (PoS)**-Blockchain](/upgrades/beacon-chain/). Mit [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) wird das Lösen willkürlicher Rechenrätsel überflüssig. Der Verzicht auf Rechenrätsel verringert den Energieverbrauch, der zur Sicherung des Netzwerkes erforderlich ist. Miner werden durch Validatoren ersetzt, die die gleiche Funktion erfüllen. Der Unterschied ist, dass ihr Vermögen nicht in Form von Rechenarbeit im Voraus aufgewandt, sondern ETH als Sicherheit gegen unehrliches Verhalten eingesetzt wird. Falls der Validator „faul“ ist (offline, wenn er seine Pflicht als Validator erfüllen soll), fängt das eingesetzte ETH langsam zu verschwinden an. Zudem wird nachweislich unehrliches Verhalten härter bestraft, indem das eingesetzte ETH drastisch gekürzt (Slashing) wird. Das fördert eine aktive und ehrliche Beteiligung an der Sicherung des Netzwerks.

Ähnlich wie beim Proof-of-Work, müsste eine böswillige Entität mindestens 51 % des insesamt im Netzwerk eingesetzten ETH kontrollieren, um eine [51-%-Attacke](/glossary/#51-attack) durchzuführen. Im Proof-of-Work-System beträgt der potenzielle Verlust eines gescheiterten Angriffs die verlorene Rechenkraft. Im Proof-of-Stake-System hingegen ist das die gesamte Menge an ETH, die als Sicherheit verwendet wurde. Diese abschreckende Struktur ermöglicht, Netzwerksicherheit über das Proof-of-Stake-System zu erreichen, während gleichzeitig Energie gespart wird, die ansonsten für willkürliche Berechnungen verschwendet wird. Ausführliche Erklärungen zur Netzwerksicherheit des Proof-of-Stake-Systems finden Sie [hier](/developers/docs/consensus-mechanisms/pos/) und [hier](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## Die Zusammenführung {#the-merge}

Es gibt eine funktionale Proof-of-Stake-Chain names [Beacon Chain](/upgrades/beacon-chain/), die seit Dezember 2020 läuft und die Durchführbarkeit des Proof-of-Stake-Systems demonstriert. Die Zusammenführung, auch „Merge“ genannt, bezeichnet den Zeitpunkt, an dem Ethereum das Proof-of-Work-System hinter sich lässt und das Proof-of-Stake-System vollständig übernimmt. Die Zusammenführung wird voraussichtlich im 3. und 4. Quartal 2022 erfolgen. [Mehr zur Zusammenführung](/upgrades/merge/).

## Energieverbrauch beim Proof-of-Stake {#proof-of-stake-energy}

Die Beacon Chain fördert nicht nur das Vertrauen in das Proof-of-Stake-System, sondern ermöglicht auch Schätzungen zum Energieverbrauch von Ethereum nach der Zusammenführung. Einer [aktuellen Schätzung](https://blog.ethereum.org/2021/05/18/country-power-no-more/) zufolge könnte die Zusammenführung zum Proof-of-Stake-System zu einer Verringerung von Ethereums Energieverbrauch um 99,95 % führen. Damit wäre das Proof-of-Stake-System ungefähr 2000-mal energieeffizienter als das Proof-of-Work-System. Der Energieverbrauch von Ethereum wird dann ungefähr dem Energieverbrauch eines normalen Computers für jeden Knoten im Netzwerk entsprechen.

![Bild](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>Schätzungen des PoW-Energieverbrauchs pro Transaktion basieren auf Daten von <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">Mai 2021</a>. Zum Zeitpunkt der Abfassung nannte die gleiche Quelle einen Wert von bis zu <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 kWh</a>.</i></small></p>

Vergleichen wir diese Zahlen mit einem Zahlungsanbieter wie Visa. 100.000 Visa-Transaktionen verbrauchen 149 kWh Energie<sup>[^2]</sup>. Angenommen, Sharding wäre bereits implementiert. Dann würde Ethereums aktuelle Transaktionsgeschwindigkeit (15 Transaktionen pro Sekunde) um das 64-Fache (Anzahl der Shards, also Stücke) erhöht. Nicht berücksichtigt ist hierbei zusätzliche Optimierungsmöglichkeiten durch Rollups. Eine realistische Transaktionsgeschwindigkeit nach der Zusammenführung für Ethereum, das auf Sharding setzt, mit Rollups liegt zwischen [25.000 - 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) Transaktionen pro Sekunde. Anhand dieser Informationen können wir den maximalen und minimalen Energieverbrauch pro 100.000 Transaktionen berechnen.

- 25.000 Transaktionen pro Sekunde
- `100.000 / 25.000 = 4` Sekunden um 100.000 Transaktionen zu verarbeiten

Wir können auch Ethereums Energieverbrauch pro Sekunde abschätzen. In einer konservativen Schätzung sichern aktuell 10.000 aktive Validatoren das Netzwerk ab (Die Beacon Chain hat momentan über [250.000 Validatoren](https://beaconscan.com/), doch mehrere Validatoren können denselben Knoten betreiben. Derzeit gibt es ungefähr 3.000-4.000 Knoten, also sind 10.000 Validatoren (einer pro Knoten) eine eher konservative Schätzung):

`1,44 kWh täglicher Verbrauch * 10.000 Netzwerkknoten = 14.400 kWh` pro Tag. Ein Tag hat 86.400 Sekunden, also `14.400 / 86.400 = 0,1667 kWh` pro Sekunde.

Das multiplizieren wir mit der Zeit, die es braucht, um 100.000 Transaktionen zu verarbeiten: `0,1667 * 4 = 0,667 kWh`.

Das ist nur ungefähr 0,4 % des Energieverbrauchs von Visa für die gleiche Anzahl an Transaktionen, oder eine Verringerung der Energiekosten um einen Faktor von ~225 im Vergleich zu Ethereums aktuellem Energieverbrauch für das Proof-of-Work-Netzwerk.

Wiederholen wir nun die Berechnung mit der maximmalen Anzahl an Transaktionen pro Sekunde, landen wir bei einer Zahl von 0,1667 kWh pro Sekunde. Das entspricht ungefährt 0,1 % des Energieverbrauchs von Visa und ist immer noch eine Verringerung um das fast 894-Fache.

_Hinweis: Es ist nicht ganz richtig, basierend auf der Anzahl der Transaktionen zu vergleichen, da Ethereums Energieverbrauch zeitbasiert ist. Ethereum verbraucht während einer Minute immer gleich viel Energie, unabhängig davon, ob 1 oder 1.000 Transaktionen durchgeführt werden._

_Hier müssen wir auch bedenken, dass Ethereum nicht nur auf einfache Finanztransaktionen beschränkt ist, sondern auch eine komplette Plattform für Smart Contracts und dezentrale Anwendungen ist._

## Ein grüneres Ethereum {#green-ethereum}

Da der Energieverbrauch bei Ethereum bis dato immens war, wurde aufseiten der Experten viel Zeit und Know-how investiert, um das energieintensive Block-Validierungs-System energieeffizienter zu gestalten. Um [Bankless](http://podcast.banklesshq.com/) zu zitieren, der beste Weg, um den Energieverbrauch des Proof-of-Work-Systems zu verringern, ist ganz einfach, das Proof-of-Work-System abzuschalten. Und diesen Weg geht Ethereum.

<InfoBanner emoji=":evergreen_tree:">
  Wenn Sie der Meinung sind, dass diese Statistiken fehlerhaft oder zu ungenau sind, kommunizieren Sie diese Bedenken bitte oder wenden Sie sich an die PR-Abteilung. Es handelt sich um Schätzungen des Teams von Ethereum.org, das öffentlich zugängliche Informationen und die aktuelle Ethereum-Roadmap nutzt. Diese Aussagen stellen kein offizieles Versprechen der Ethereum Foundation dar. 
</InfoBanner>

## Weiterführende Informationen {#further-reading}

- [Der Strombedarf eines Landes, nicht mehr](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18. Mai 2021_
- [Ethereums Energieverbrauch](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereums Emissionen: eine Bottom-Up-Schätzung](https://kylemcdonald.github.io/ethereum-emissions/) – Kyle McDonald
- [Ethereums Energieverbrauchindex](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) – _[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Verwandte Themen {#related-topics}

- [Ethereums Vision](/upgrades/vision/)
- [Die Beacon Chain](/upgrades/beacon-chain)
- [Die Zusammenführung](/upgrades/merge/)
- [Sharding](/upgrades/beacon-chain/)

### Fußnoten und Quellen {#footnotes-and-sources}

#### 1. Ethereum – Proof of Work und Energieverbrauch {#fn-1}

[Energieverbrauch pro Land Ethereum (Jährlicher TWh)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Energieverbrauch von Visa {#fn-2}

[Der Durchschnittsverbrauch des Bitcoin-Netzwerks pro Transaktion im Vergleich zum Visa-Netzwerk. Stand 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Visa-Finanzbericht 4. Quartal 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
