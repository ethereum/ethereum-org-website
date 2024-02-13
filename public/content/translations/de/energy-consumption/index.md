---
title: Der Energieverbrauch von Ethereum
description: Grundlegende Informationen, um den generellen Energieverbrauch von Ethereum verstehen zu können
lang: de
---

# Der Energieverbrauch von Ethereum {#proof-of-stake-energy}

Ethereum ist eine grüne Blockchain. Ethereum's [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) Konsensmechanismus verwendet ETH anstelle von [Energie, um das Netzwerk zu sichern](/developers/docs/consensus-mechanisms/pow). Der Energieverbrauch von Ethereum beträgt ungefähr [~0,0026 TWh pro Jahr](https://carbon-ratings.com/eth-report-2022) im gesamten weltweiten Netzwerk.

Der geschätzte Energieverbrauch von Ethereum stammt aus einer Studie des [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Dieses hat eine Gesamtschätzung des Stromverbrauchs und Co2-Fußabdrucks des Ethereum-Netzwerks durchgeführt ([siehe Ergebnisse](https://carbon-ratings.com/eth-report-2022)). Dabei wurde der Stromverbrauch verschiedener Nodes mit unterschiedlichen Hardware- und Client-Software-Konfigurationen gemessen. Die für den jährlichen Stromverbrauch des Netzwerkes geschätzten **2,601 MWh** (0,0026 TWh) entsprechen jährlichen Kohlenstoff-Emissionen von **870 Tonnen CO2**, wobei für jede Region spezifische Faktoren bezüglich der Intensität von Emission angewendet wurden. Die für den jährlichen Stromverbrauch des Netzwerkes geschätzten **2,601 MWh** (0,0026 TWh) entsprechen jährlichen Kohlenstoff-Emissionen von **870 Tonnen CO2**, wobei für jede Region spezifische Faktoren bezüglich der Intensität von Emission angewendet wurden.

Um den Energieverbrauch von Ethereum in Kontext zu setzen, kann man jährliche Schätzungen des Energieverbrauchs anderer Branchen miteinander vergleichen. Dies hilft dabei zu verstehen, ob die Schätzungen für Ethereum hoch oder niedrig sind.

<EnergyConsumptionChart />

Das oben dargestellte Diagramm zeigt den geschätzten jährlichen Energieverbrauch in TWh/Jahr für Ethereum, verglichen mit diversen anderen Industrien. Die gezeigten Schätzungen stammen von öffentlich zugänglichen Informationen, abgerufen im Mai 2023, mit Links zu den in der folgenden Tabelle verfügbaren Quellen:

|                       | Jährlicher Energieverbrauch (TWh) | Vergleich mit PoS-Ethereum | Quelle                                                                                                                                                                            |
| :-------------------- | :-------------------------------: | :------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Globale Rechenzentren |                200                |          77.000x           | [Quelle](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| Goldabbau             |                131                |          50.000x           | [quelle](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin               |                131                |          50.000x           | [quelle](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| PoW-Ethereum          |                78                 |          30.000x           | [quelle](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| Youtube (unmittelbar) |                12                 |           4.600x           | [quelle](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| Gaming in den USA     |                34                 |          13.000x           | [quelle](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix               |               0,451               |            173x            | [quelle](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                |               0,26                |            100x            | [quelle](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                |               0,02                |             8x             | [quelle](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| PoS-Ethereum          |              0,0026               |             1x             | [quelle](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

Es ist kompliziert, genaue Schätzungen für den Energieverbrauch zu erstellen, vor allem wenn das Gemessene über eine komplexe Lieferkette oder Einsatzdetails verfügt, die ihre Effizienz beeinflussen. Nehmen wir Netflix oder YouTube als Beispiel. Schätzungen über ihren Energieverbrauch hängen davon ab, ob sie nur die Energie enthalten, die zur Wartung ihrer Systeme verwendet wird und den Nutzern Inhalte liefern (_direkte Ausgaben_) oder ob sie die für die Erstellung von Inhalten erforderlichen Ausgaben enthalten Unternehmensbüros, Werbung, etc. betreiben (_indirekte Ausgaben_). Indirekte Nutzung kann auch die Energie beinhalten, die benötigt wird, um Inhalte auf Endgeräten wie Fernseher, Computer und Mobiltelefone zu schauen, die wiederum davon abhängen, welche Geräte verwendet werden.

Es gibt eine Diskussion zu diesem Problem auf [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). In der Tabelle oben, enthält der von Netflix selbst gemeldete Wert, die _direkte_ und _indirekte_ Nutzung. YouTube bietet nur eine Schätzung der eigenen _direkten_ Energiekosten, die sich auf [12 TWh/jh](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf) belaufen.

Die Tabelle und das Diagramm oben enthalten auch Vergleiche mit Bitcoin und Proof-of-work Ethereum. Es ist wichtig zu beachten, dass der Energieverbrauch von Proof-of-Work-Netzen nicht statisch ist - er kann sich tagtäglich verändern. Der verwendete Wert für Proof-of-Work Ethereum entspricht dem Wert kurz vor der Zusammenführung "[The Merge](/roadmap/merge/)" zu Proof-of-Stake, wie von [Digiconomist](https://digiconomist.net/ethereum-energy-consumption) vorhergesagt. Andere Quellen, wie der [Cambridge Blockchain Network Sustainability Index (Cambridge Blockchain-Netzwerk Nachhaltigkeitsindex)](https://ccaf.io/cbnsi/ethereum/1), schätzen den Energieverbrauch als wesentlich niedriger ein (näher an 20 TWh/Jahr). Die Schätzungen für den Energieverbrauch von Bitcoin variieren ebenfalls stark zwischen den verschiedenen Quellen, und es ist ein Thema, das eine Menge nuancierter [Diskussionen](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nicht nur über die Menge der verbrauchten Energie, sondern auch über die Energiequellen und die damit verbundenen ethischen Aspekte. Der Energieverbrauch lässt sich nicht unbedingt genau mit dem ökologischen Fußabdruck vergleichen, da verschiedene Projekte unterschiedliche Energiequellen nutzen können, z. B. einen kleineren oder größeren Anteil an erneuerbaren Energien. So zeigt zum Beispiel der [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) (Cambridge Bitcoin-Stromverbrauchs-Index), dass der Bedarf des Bitcoin-Netzwerks theoretisch durch Gas-Abfackelung oder Elektrizität gedeckt werden könnte, die sonst bei der Übertragung und Verteilung verloren ginge. Ethereums Kurs zur Nachhaltigkeit bestand darin, den energiehungrigen Teil des Netzwerks durch eine umweltfreundliche Alternative zu ersetzen.

Auf der Website des [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (Cambridge Blockchain Network Nachhaltigkeitsindex) können Sie Schätzungen des Energieverbrauchs und der Kohlenstoffemissionen für viele Branchen einsehen.

## Schätzungen pro Transaktion {#per-transaction-estimates}

Viele Artikel schätzen den "pro Transaktion" verbrauchten Energieaufwand für Blockchains. Dies kann irreführend sein, da die Energie, die erforderlich ist, um einen Block vorzuschlagen und zu validieren, unabhängig von der Anzahl der Transaktionen darin ist. Ein auf Transaktionseinheiten basiertes Maß für die Energieausgaben impliziert, dass weniger Transaktionen zu einem geringeren Energiebedarf führen und umgekehrt mehr Transaktionen zu einem höheren Energieverbrauch. Das ist aber nicht der Fall. Auch sind Schätzungen pro Transaktion sehr empfindlich für die Definition des Transaktionsdurchsatzes einer Blockchain und die Anpassung dieser Definition bietet Raum für Manipulationen, um den Wert größer oder kleiner darzustellen.

Zum Beispiel bezieht sich die Transaktionsleistung bei Ethereum nicht nur auf die Basisschicht – sie ist auch die Summe der Transaktionsleistung aller "[Layer 2](/layer-2/)"-Rollups. Layer 2 werden in der Regel nicht in die Berechnungen miteinbezogen, aber die Berücksichtigung des zusätzlichen Energieverbrauchs durch Sequencer (gering) und der Anzahl der von ihnen verarbeiteten Transaktionen (hoch) würde wahrscheinlich die Schätzungen pro Transaktion drastisch reduzieren. Das ist ein Grund, warum Vergleiche des Energieverbrauchs pro Transaktion über verschiedene Plattformen hinweg irreführend sein können.

## Der CO2-Fußabdruck von Ethereum {#carbon-debt}

Der Energieverbrauch von Ethereum ist sehr gering, doch das war nicht immer so. Ethereum verwendete ursprünglich Proof-of-Work, dessen Umweltauswirkungen viel größer waren als beim aktuellen Proof-of-Stake-Mechanismus.

Von Anfang an hatte Ethereum den Plan, einen auf Proof-of-Stake basierenden Konsensmechanismus umzusetzen, allerdings ohne die Sicherheit und Dezentralität zu opfern. Das erforderte Jahre intensiver Forschung und Entwicklung. Zu Beginn des Netzwerks wurde daher ein Proof-of-Work Mechanismus verwendet. Proof-of-Work erfordert, dass Miner ihre Computerhardware verwenden, um einen Wert zu berechnen. Dabei wurde Energie verbraucht.

![Ein Vergleich von Ethereum's Energieverbrauch vor und nach dem Wechsel auf Proof-of-Work, wobei der Eiffelturm (330 Meter hoch) auf der linken Seite den hohen Energieverbrauch vor der Zusammenführung symbolisiert, und eine kleine 4 cm große Lego Figur auf der rechten Seite die dramatische Reduktion des Energieverbrauchs nach dem Merge repräsentiert,](energy_consumption_pre_post_merge.png)

schätzt das CCRI, dass der Wechsel auf Proof-of-Stake Ethereum's jährlichen Stromverbrauch um mehr als **99,988 %** reduziert hat. Ebenso wurde Ethereums CO2-Fußabdruck um etwa **99,992 %** verringert (von 11.016.000 auf 870 Tonnen CO2). Um dies in Relation zu setzen, die Reduktion der Emissionen entspricht etwa einem Wechsel vom Eiffel Turm zu einer kleinen Spielfigur aus Plastik, wie in der Abbildung oben dargestellt. Daraus resultiert, dass die Kosten für die Umwelt verursacht durch die Sicherung des Netzwerks drastisch reduziert wurden. Gleichzeitig wird angenommen, dass die Sicherheit des Netzwerks dabei verbessert wurde.

## Eine grüne Anwendungsebene {#green-applications}

Während der Energieverbrauch von Ethereum sehr niedrig ist, gibt es auch eine beträchtliche, wachsende und sehr aktive [**Regenerative Finanzen (ReFi)**](/refi/) Gemeinschaft gegründet auf Ethereum. ReFi-Anwendungen verwenden DeFi-Komponenten, um Finanzanwendungen zu erstellen, die positive externe Effekte auf die Umwelt haben. ReFi ist Teil einer größeren ["Solarpunk"](https://en.wikipedia.org/wiki/Solarpunk)-Bewegung, die eng mit Ethereum abgestimmt und darauf ausgerichtet ist, technologischen Fortschritt und Umweltverantwortung miteinander zu verbinden. Die dezentralisierte, berechtigungslose und kombinierbare Natur von Ethereum macht es zur idealen Basisschicht für die ReFi- und Solarpunk-Community.

Native Web3-Finanzierungsplattformen für öffentliche Güter wie [Gitcoin](https://gitcoin.co) führen Klimarunden durch, um ein umweltbewusstes Bauen auf der Anwendungsschicht von Ethereum zu fördern. Durch die Entwicklung dieser Initiativen (und anderen, z. B. [DeSci](/desci/)) wird Ethereum zu einer umwelt- und sozialverträglichen Technologie.

<InfoBanner emoji=":evergreen_tree:">
  Wenn Sie denken, dass diese Seite präziser gestaltet werden kann, erstellen Sie bitte eine Anfrage oder einen Beitrag. Die Statistiken auf dieser Seite sind Schätzungen auf der Grundlage öffentlich verfügbarer Daten. Sie stellen keine offizielle Aussage oder Versprechen des ethereum.org-Teams oder der Ethereum Foundation dar.
</InfoBanner>

## Weiterführende Informationen {#further-reading}

- [Cambridge Blockchain Network Nachhaltigkeitsindex](https://ccaf.io/cbnsi/ethereum)
- [Bericht des Weißen Hauses zu Blockchains mit Proof-of-Work](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum-Emissionen: Eine Bottom-up-Schätzung](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Index des Energieverbrauchs](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Die Zusammenführung - Auswirkungen auf den Stromverbrauch und den CO2-Footprint des Ethereum-Netzwerks](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Der Energieverbrauch von Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Verwandte Themen {#related-topics}

- [Die Vision von Ethereum](/roadmap/vision/)
- [Die Beacon Chain](/roadmap/beacon-chain)
- [Der Zusammenschluss](/roadmap/merge/)
