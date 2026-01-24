---
title: Ethereums Energieverbrauch
description: "Grundlegende Informationen, um den generellen Energieverbrauch von Ethereum verstehen zu können"
lang: de
---

# Ethereums Energieverbrauch {#proof-of-stake-energy}

Ethereum ist eine grüne Blockchain. Ethereums [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)-Konsensmechanismus verwendet ETH anstelle von [Energie, um das Netzwerk zu sichern](/developers/docs/consensus-mechanisms/pow). Der Energieverbrauch von Ethereum beträgt ungefähr [~0,0026 TWh/Jahr](https://carbon-ratings.com/eth-report-2022) im gesamten globalen Netzwerk.

Die Schätzung des Energieverbrauchs für Ethereum stammt aus einer [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com)-Studie. Sie erstellten Bottom-up-Schätzungen des Stromverbrauchs und des CO2-Fußabdrucks des Ethereum-Netzwerks ([siehe den Bericht](https://carbon-ratings.com/eth-report-2022)). Dabei wurde der Stromverbrauch verschiedener Nodes mit unterschiedlichen Hardware- und Client-Software-Konfigurationen gemessen. Die geschätzten **2.601 MWh** (0,0026 TWh) für den jährlichen Stromverbrauch des Netzwerks entsprechen unter Anwendung regionsspezifischer Kohlenstoffintensitätsfaktoren jährlichen Kohlenstoffemissionen von **870 Tonnen CO2e**. Dieser Wert ändert sich, wenn Nodes das Netzwerk betreten und verlassen – Sie können ihn mit einer rollierenden 7-Tage-Durchschnittsschätzung des [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) verfolgen (beachten Sie, dass hier eine etwas andere Schätzmethode verwendet wird – Details finden Sie auf der Website).

Um den Energieverbrauch von Ethereum zu kontextualisieren, können wir jährliche Schätzungen für einige andere Produkte und Branchen vergleichen. Dies hilft dabei zu verstehen, ob die Schätzungen für Ethereum hoch oder niedrig sind.

<EnergyConsumptionChart />

Das obige Diagramm zeigt den geschätzten Energieverbrauch in TWh/Jahr für Ethereum im Vergleich zu einigen anderen Produkten und Branchen. Die bereitgestellten Schätzungen stammen aus öffentlich zugänglichen Informationen, die im Juli 2023 abgerufen wurden, mit Links zu den Quellen in der Tabelle unten.

|                       | Jährlicher Energieverbrauch (TWh) |  Vergleich mit PoS-Ethereum |                                                                                       Quelle                                                                                      |
| :-------------------- | :--------------------------------------------------: | :-------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Globale Rechenzentren |                          190                         | 73.000-fach |                                    [Quelle](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin               |                          149                         | 53.000-fach |                                                                 [Quelle](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Goldabbau             |                          131                         | 50.000-fach |                                                                 [Quelle](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming in den USA\*   |                          34                          | 13.000-fach |                 [Quelle](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW-Ethereum          |                          21                          |  8.100-fach |                                                                     [Quelle](https://ccaf.io/cbnsi/ethereum/1)                                                                    |
| Google                |                          19                          |  7.300-fach |                                           [Quelle](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix               |                         0,457                        |           176-fach          | [Quelle](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                |                         0,26                         |           100-fach          |                                  [Quelle](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-\(1\).pdf)                                 |
| AirBnB                |                         0,02                         |            8-fach           |                              [Quelle](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-\(Final\).pdf)                              |
| **PoS-Ethereum**      |                      **0,0026**                      |            **1x**           |                                                                [Quelle](https://carbon-ratings.com/eth-report-2022)                                                               |

\* Umfasst Endbenutzergeräte wie PCs, Laptops und Spielkonsolen.

Genauere Schätzungen für den Energieverbrauch zu erhalten, ist kompliziert, besonders wenn das, was gemessen wird, eine komplexe Lieferkette oder komplexe Bereitstellungsdetails hat, die die Effizienz beeinflussen. Zum Beispiel variieren die Schätzungen des Energieverbrauchs für Netflix und Google je nachdem, ob sie nur den Energieaufwand berücksichtigen, der für den Betrieb der Systeme und die Bereitstellung von Inhalten für die Benutzer erforderlich ist (_direkter Aufwand_) oder ob sie auch den Aufwand einbeziehen, der für die Erstellung von Inhalten, den Betrieb von Unternehmensbüros, Werbung usw. erforderlich ist (_indirekter Aufwand_). Zum indirekten Aufwand könnte auch die Energie gehören, die erforderlich ist, um Inhalte auf Endbenutzergeräten wie Fernsehern, Computern und Mobiltelefonen zu konsumieren.

Die obigen Schätzungen sind keine perfekten Vergleiche. Die Menge des indirekten Aufwands, der berücksichtigt wird, variiert je nach Quelle und umfasst selten die Energie von Endbenutzergeräten. Jede zugrunde liegende Quelle enthält nähere Angaben zu dem, was gemessen wird.

Die Tabelle und das Diagramm oben enthalten auch Vergleiche mit Bitcoin und Proof-of-Work-Ethereum. Es ist wichtig, zu beachten, dass der Energieverbrauch von Proof-of-Work-Netzwerken nicht statisch ist und sich von Tag zu Tag ändert. Schätzungen zwischen Quellen können auch sehr stark variieren. Das Thema stößt eine nuancierte [Debatte](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) an, nicht nur über die Menge der verbrauchten Energie, sondern auch über die Quellen dieser Energie und die damit verbundene Ethik. Der Energieverbrauch hat nicht zwangsläufig eine unmittelbare Verknüpfung mit dem Umwelteinfluss, da verschiedene Projekte unterschiedliche Energiequellen verwenden können – auch einen geringeren bzw. größeren Anteil erneuerbarer Energien. So gibt beispielsweise der [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) an, dass der Bedarf des Bitcoin-Netzwerks theoretisch durch Gasabfackelung oder durch Elektrizität, die ansonsten bei der Übertragung und Verteilung verloren gehen würde, gedeckt werden könnte. Ethereums Kurs auf Nachhaltigkeit bestand darin, den energiehungrigen Teil des Netzwerks durch eine umweltfreundliche Alternative zu ersetzen.

Auf der Website des [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) können Sie Schätzungen zum Energieverbrauch und zu den CO2-Emissionen für viele Branchen einsehen.

## Schätzungen pro Transaktion {#per-transaction-estimates}

Viele Artikel schätzen den „pro Transaktion“ verbrauchten Energieaufwand für Blockchains. Das kann irreführend sein, da die Energie, die erforderlich ist, um einen Block vorzuschlagen und zu validieren, unabhängig von der Anzahl der Transaktionen darin ist. Eine Einheit des Energieauswands pro Transaktion impliziert, dass weniger Transaktionen zu einem geringeren Energieaufwand führen und umgekehrt – was nicht der Fall ist. Außerdem reagieren Schätzungen pro Transaktion sehr empfindlich auf die Definition des Transaktionsdurchsatzes einer Blockchain, und die Anpassung dieser Definition bietet Raum für Manipulationen, um den Wert größer oder kleiner darzustellen.

Bei Ethereum ist beispielsweise der Transaktionsdurchsatz nicht nur der der Basisschicht, sondern auch die Summe des Transaktionsdurchsatzes aller seiner „[Layer-2](/layer-2/)“-Rollups. Ebene 2 wird in der Regel nicht in Berechnungen miteinbezogen, aber die Berücksichtigung des zusätzlichen Energieverbrauchs durch Sequencer (gering) und der Anzahl der von ihnen verarbeiteten Transaktionen (hoch) würde wahrscheinlich die Schätzungen pro Transaktion drastisch reduzieren. Das ist einer der Gründe, weshalb Vergleiche des Energieverbrauchs pro Transaktion über verschiedene Plattformen hinweg irreführend sein können.

## Ethereums Kohlenstoffschuld {#carbon-debt}

Der Energieaufwand von Ethereum ist sehr gering, doch das war nicht immer so. Ethereum verwendete ursprünglich Proof-of-Work, dessen Umweltauswirkungen viel größer waren als beim aktuellen Proof-of-Stake-Mechanismus.

Von Anfang an hatte Ethereum den Plan, einen auf Proof-of-Stake basierenden Konsensmechanismus zu implementieren, doch die Umsetzung ohne Abstriche bei Sicherheit und Dezentralisierung erforderte Jahre intensiver Forschung und Entwicklung. Um das Netzwerks zum Laufen zu bringen, kam daher ein Proof-of-Work-Mechanismus zum Einsatz. Proof-of-Work erfordert, dass Miner ihre Computerhardware verwenden, um einen Wert zu berechnen. Dabei wird Energie aufgewendet.

![Ein Vergleich von Ethereums Energieverbrauch vor und nach der Zusammenführung – mithilfe des Eiffelturms (330 Meter hoch) auf der linken Seite, der den hohen Energieverbrauch vor der Zusammenführung symbolisiert, und einer kleinen 4-cm-Lego-Figur auf der rechten Seite, die die drastische Reduktion des Energieverbrauchs nach der Zusammenführung darstellt](energy_consumption_pre_post_merge.png)

CCRI schätzt, dass die Zusammenführung den annualisierten Stromverbrauch von Ethereum um mehr als **99,988 %** reduziert hat. Ebenso wurde der CO2-Fußabdruck von Ethereum um etwa **99,992 %** (von 11.016.000 auf 870 Tonnen CO2e) verringert. Zur Veranschaulichung: Die Reduktion der Emissionen entspricht etwa dem Unterschied in der Höhe des Eiffelturms und der einer kleinen Spielfigur aus Plastik, wie in der Abbildung oben dargestellt. Folglich wurden die Umweltkosten zur Sicherung des Netzwerks drastisch reduziert. Gleichzeitig wird wird davon ausgegangen, dass die Sicherheit des Netzwerks verbessert wurde.

## Eine grüne Anwendungsschicht {#green-applications}

Obwohl der Energieverbrauch von Ethereum sehr gering ist, gibt es auch eine große, wachsende und sehr aktive [**regenerative Finanz-Community (ReFi)**](/refi/), die auf Ethereum aufbaut. ReFi-Anwendungen verwenden DeFi-Komponenten, um Finanzanwendungen zu erstellen, die positive externe Effekte auf die Umwelt haben. ReFi ist Teil einer größeren [„Solarpunk“](https://en.wikipedia.org/wiki/Solarpunk)-Bewegung, die eng mit Ethereum verbunden ist und darauf abzielt, technologischen Fortschritt und Umweltverantwortung zu koppeln. Der dezentralisierte, berechtigungslose und zusammensetzbare Charakter von Ethereum macht es zur idealen Basisebene für die ReFi- und Solarpunk-Community.

Web3-native Finanzierungsplattformen für öffentliche Güter wie [Gitcoin](https://gitcoin.co) führen Klimarunden durch, um umweltbewusstes Entwickeln auf der Anwendungsschicht von Ethereum zu fördern. Durch die Entwicklung dieser und anderer Initiativen (z. B. [DeSci](/desci/)) wird Ethereum zu einer Technologie, die ökologisch und sozial einen positiven Nettobeitrag leistet.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Wenn Sie denken, dass diese Seite präziser gestaltet werden kann, erstellen Sie bitte eine Anfrage oder einen Beitrag. Die Statistiken auf dieser Seite sind Schätzungen auf der Grundlage öffentlich verfügbarer Daten. Sie stellen keine offizielle Aussage oder Versprechen des ethereum.org-Teams oder der Ethereum Foundation dar.
</AlertDescription>
</AlertContent>
</Alert>

## Weiterführende Lektüre {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Bericht des Weißen Hauses über Proof-of-Work-Blockchains](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum-Emissionen: Eine Bottom-up-Schätzung](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Die Zusammenführung – Auswirkungen auf den Stromverbrauch und den CO2-Fußabdruck des Ethereum-Netzwerks](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Ethereums Energieverbrauch](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Verwandte Themen {#related-topics}

- [Die Beacon Chain](/roadmap/beacon-chain)
- [Die Zusammenführung](/roadmap/merge/)
