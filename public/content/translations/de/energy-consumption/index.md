---
title: Ethereums Energieverbrauch
description: "Die grundlegenden Informationen, die Sie benötigen, um den Energieverbrauch von Ethereum zu verstehen."
lang: de
---

# Ethereums Energieaufwand {#proof-of-stake-energy}

[Ethereum](/) ist eine grüne Blockchain. Ethereums [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)-Konsensmechanismus verwendet ETH anstelle von [Energie, um das Netzwerk zu sichern](/developers/docs/consensus-mechanisms/pow). Ethereums Energieverbrauch beträgt im gesamten globalen Netzwerk ungefähr [\~0,0026 TWh/Jahr](https://carbon-ratings.com/eth-report-2022).

Die Schätzung des Energieverbrauchs für Ethereum stammt aus einer Studie des [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Sie erstellten Bottom-up-Schätzungen des Stromverbrauchs und des CO2-Fußabdrucks des Ethereum-Netzwerks ([siehe Bericht](https://carbon-ratings.com/eth-report-2022)). Sie maßen den Stromverbrauch verschiedener Blockchain-Knoten mit unterschiedlichen Hardware- und Anwendungssoftware-Konfigurationen. Die geschätzten **2.601 MWh** (0,0026 TWh) für den jährlichen Stromverbrauch des Netzwerks entsprechen jährlichen CO2-Emissionen von **870 Tonnen CO2e** unter Anwendung regionalspezifischer CO2-Intensitätsfaktoren. Dieser Wert ändert sich, wenn Blockchain-Knoten dem Netzwerk beitreten oder es verlassen – Sie können dies anhand eines gleitenden 7-Tage-Durchschnitts des [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) verfolgen (beachten Sie, dass dort eine leicht abweichende Methode für die Schätzungen verwendet wird – Details dazu finden Sie auf deren Website).

Um den Energieverbrauch von Ethereum in einen Kontext zu setzen, können wir die auf das Jahr hochgerechneten Schätzungen mit einigen anderen Produkten und Branchen vergleichen. Dies hilft uns besser zu verstehen, ob die Schätzung für Ethereum hoch oder niedrig ist.

<EnergyConsumptionChart />

Das obige Diagramm zeigt den geschätzten Energieverbrauch in TWh/Jahr für Ethereum im Vergleich zu verschiedenen anderen Produkten und Branchen. Die bereitgestellten Schätzungen stammen aus öffentlich zugänglichen Informationen, die im Juli 2023 abgerufen wurden, wobei Links zu den Quellen in der folgenden Tabelle verfügbar sind.

|                     | Jährlicher Energieverbrauch (TWh) | Vergleich zu PoS-Ethereum |                                                                                      Quelle                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Globale Rechenzentren |                 190                 |          73.000x           |                                    [Quelle](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [Quelle](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Goldbergbau         |                 131                 |          50.000x           |                                                                 [Quelle](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming in den USA\* |                 34                  |          13.000x           |                 [Quelle](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW-Ethereum        |                 21                  |           8.100x           |                                                                    [Quelle](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [Quelle](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [Quelle](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [Quelle](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [Quelle](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS-Ethereum**    |             **0,0026**              |           **1x**           |                                                               [Quelle](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Schließt Endbenutzergeräte wie PCs, Laptops und Spielkonsolen ein.

Genaue Schätzungen für den Energieverbrauch zu erhalten, ist kompliziert, insbesondere wenn das Gemessene eine komplexe Lieferkette oder Bereitstellungsdetails aufweist, die seine Effizienz beeinflussen. Beispielsweise variieren die Schätzungen des Energieverbrauchs für Netflix und Google je nachdem, ob sie nur die Energie umfassen, die zur Aufrechterhaltung ihrer Systeme und zur Bereitstellung von Inhalten für Benutzer verwendet wird (_direkter Aufwand_), oder ob sie den Aufwand einbeziehen, der für die Produktion von Inhalten, den Betrieb von Unternehmensbüros, Werbung usw. erforderlich ist (_indirekter Aufwand_). Der indirekte Aufwand könnte auch die Energie umfassen, die erforderlich ist, um Inhalte auf Endbenutzergeräten wie Fernsehern, Computern und Mobiltelefonen zu konsumieren.

Die obigen Schätzungen sind keine perfekten Vergleiche. Die Menge des berücksichtigten indirekten Aufwands variiert je nach Quelle und schließt selten die Energie von Endbenutzergeräten ein. Jede zugrunde liegende Quelle enthält weitere Details darüber, was gemessen wird.

Die obige Tabelle und das Diagramm enthalten auch Vergleiche mit Bitcoin und Proof-of-Work-Ethereum. Es ist wichtig zu beachten, dass der Energieverbrauch von Proof-of-Work-Netzwerken nicht statisch ist und sich von Tag zu Tag ändert. Schätzungen können auch zwischen den Quellen stark variieren. Das Thema zieht nuancierte [Debatten](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nach sich, nicht nur über die Menge der verbrauchten Energie, sondern auch über die Quellen dieser Energie und die damit verbundene Ethik. Der Energieverbrauch lässt sich nicht unbedingt genau auf den ökologischen Fußabdruck übertragen, da verschiedene Projekte unterschiedliche Energiequellen nutzen könnten, einschließlich eines geringeren oder größeren Anteils an erneuerbaren Energien. Beispielsweise gibt der [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) an, dass der Bedarf des Bitcoin-Netzwerks theoretisch durch das Abfackeln von Gas oder durch Strom gedeckt werden könnte, der andernfalls bei der Übertragung und Verteilung verloren ginge. Ethereums Weg zur Nachhaltigkeit bestand darin, den energiehungrigen Teil des Netzwerks durch eine grüne Alternative zu ersetzen.

Sie können Schätzungen zum Energieverbrauch und zu den CO2-Emissionen für viele Branchen auf der [Website des Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) durchsuchen.

## Schätzungen pro Transaktion {#per-transaction-estimates}

Viele Artikel schätzen den Energieaufwand „pro Transaktion“ für Blockchains. Dies kann irreführend sein, da die Energie, die erforderlich ist, um einen Block vorzuschlagen und zu validieren, unabhängig von der Anzahl der darin enthaltenen Transaktionen ist. Eine Energieaufwandseinheit pro Transaktion impliziert, dass weniger Transaktionen zu einem geringeren Energieaufwand führen würden und umgekehrt, was nicht der Fall ist. Außerdem reagieren Schätzungen pro Transaktion sehr empfindlich darauf, wie der Transaktionsdurchsatz einer Blockchain definiert ist, und eine Anpassung dieser Definition kann manipuliert werden, um den Wert größer oder kleiner erscheinen zu lassen.

Auf Ethereum beispielsweise ist der Transaktionsdurchsatz nicht nur der der Basisebene – er ist auch die Summe des Transaktionsdurchsatzes all seiner „[Ebene 2](/layer-2/)“-Rollups. Ebene 2 werden im Allgemeinen nicht in Berechnungen einbezogen, aber die Berücksichtigung der zusätzlichen Energie, die von Sequencern verbraucht wird (gering), und der Anzahl der von ihnen verarbeiteten Transaktionen (groß), würde die Schätzungen pro Transaktion wahrscheinlich drastisch reduzieren. Dies ist ein Grund, warum Vergleiche des Energieverbrauchs pro Transaktion über Plattformen hinweg irreführend sein können.

## Ethereums CO2-Schuld {#carbon-debt}

Ethereums Energieaufwand ist sehr gering, aber das war nicht immer der Fall. Ethereum verwendete ursprünglich Proof-of-Work, was weitaus höhere Umweltkosten verursachte als der aktuelle Proof-of-Stake-Mechanismus.

Von Anfang an plante Ethereum die Implementierung eines auf Proof-of-Stake basierenden Konsensmechanismus, aber dies ohne Einbußen bei Sicherheit und Dezentralisierung zu tun, erforderte jahrelange fokussierte Forschung und Entwicklung. Daher wurde ein Proof-of-Work-Mechanismus verwendet, um das Netzwerk zu starten. Proof-of-Work erfordert, dass Miner ihre Computerhardware verwenden, um einen Wert zu berechnen, wobei Energie verbraucht wird.

![Vergleich des Energieverbrauchs von Ethereum vor und nach dem Merge, wobei der Eiffelturm (330 Meter hoch) auf der linken Seite den hohen Energieverbrauch vor dem Merge symbolisiert und eine kleine 4 cm große Lego-Figur auf der rechten Seite die dramatische Reduzierung des Energieverbrauchs nach dem Merge darstellt](energy_consumption_pre_post_merge.png)

Das CCRI schätzt, dass der Merge den auf das Jahr hochgerechneten Stromverbrauch von Ethereum um mehr als **99,988 %** reduziert hat. Ebenso wurde der CO2-Fußabdruck von Ethereum um etwa **99,992 %** (von 11.016.000 auf 870 Tonnen CO2e) verringert. Um dies ins rechte Licht zu rücken: Die Reduzierung der Emissionen ist vergleichbar mit dem Übergang von der Höhe des Eiffelturms zu einer kleinen Plastikspielfigur, wie in der obigen Abbildung dargestellt. Infolgedessen sind die Umweltkosten für die Sicherung des Netzwerks drastisch gesunken. Gleichzeitig geht man davon aus, dass sich die Sicherheit des Netzwerks verbessert hat.

## Eine grüne Anwendungsebene {#green-applications}

Während der Energieverbrauch von Ethereum sehr gering ist, gibt es auch eine beträchtliche, wachsende und hochaktive Community für [**Regenerative Finance (ReFi)**](/refi/), die auf Ethereum aufbaut. ReFi-Anwendungen nutzen DeFi-Komponenten, um Finanzanwendungen zu entwickeln, die positive externe Effekte zugunsten der Umwelt haben. ReFi ist Teil einer breiteren ["Solarpunk"](https://en.wikipedia.org/wiki/Solarpunk)-Bewegung, die eng mit Ethereum verbunden ist und darauf abzielt, technologischen Fortschritt und Umweltschutz miteinander zu verbinden. Die dezentralisierte, erlaubnisfreie und zusammensetzbare Natur von Ethereum macht es zur idealen Basisebene für die ReFi- und Solarpunk-Communities.

Web3-native Finanzierungsplattformen für öffentliche Güter wie [Gitcoin](https://gitcoin.co) führen Klima-Runden durch, um umweltbewusstes Bauen auf der Anwendungsebene von Ethereum zu fördern. Durch die Entwicklung dieser Initiativen (und anderer, z. B. [DeSci](/desci/)) wird Ethereum zu einer ökologisch und sozial nettopositiven Technologie.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Wenn Sie der Meinung sind, dass diese Seite genauer gestaltet werden kann, erstellen Sie bitte ein Issue oder einen PR. Die Statistiken auf dieser Seite sind Schätzungen, die auf öffentlich zugänglichen Daten basieren – sie stellen keine offizielle Erklärung oder ein Versprechen des ethereum.org-Teams oder der Ethereum Foundation dar.
</AlertDescription>
</AlertContent>
</Alert>

## Weiterführende Literatur {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Bericht des Weißen Hauses über Proof-of-Work-Blockchains](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) – _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) – _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network](https://carbon-ratings.com/eth-report-2022) – _CCRI_
- [Ethereums Energieverbrauch](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Verwandte Themen {#related-topics}

- [Die Beacon Chain](/roadmap/beacon-chain)
- [Der Merge](/roadmap/merge/)