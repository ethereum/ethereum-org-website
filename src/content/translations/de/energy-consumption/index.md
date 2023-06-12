---
title: Der Energieverbrauch von Ethereum
description: Grundlegende Informationen, um den generellen Energieverbrauch von Ethereum verstehen zu können
lang: de
---

# Der Energieverbrauch von Ethereum {#proof-of-stake-energy}

Ethereum ist eine grüne Blockchain. Ein [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) Konsensmechanismus wird benutzt, bei dem ETH anstelle von [Energie verwendet wird, um das Netzwerk zu sichern](/developers/docs/consensus-mechanisms/pow). Dieser Mechanismus nutzt lediglich [~0,0026 TWh/yr](https://carbon-ratings.com/eth-report-2022) über das gesamte Netzwerk.

Das [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) hat eine Gesamtschätzung des Stromverbrauchs und CO2-Fußabdrucks des Ethereum-Netzwerks durchgeführt ([siehe Ergebnisse](https://carbon-ratings.com/eth-report-2022)). Dabei wurde der Stromverbrauch verschiedener Nodes mit verschiedenen Hardware- und Client-Software-Konfigurationen gemessen. Dies führte zu einer Schätzung von **2.601 MWh** (0,0026 TWh) für den jährlichen Stromverbrauch des Netzes zum Zeitpunkt der Analyse (September 2022). Das entspricht jährlichen CO2-Emissionen von **870 Tonnen CO2e** unter Berücksichtigung regionaler spezifischer Faktoren der CO2-Intensität.

<EnergyConsumptionChart />

Die obige Abbildung zeigt den geschätzten jährlichen Energieverbrauch verschiedener Branchen in TWh/a (abgerufen im Juni 2022). Hinweis: Die Schätzungen, die in der Grafik dargestellt sind, stammen aus öffentlich zugänglichen Quellen, die im nachfolgenden Text verlinkt sind. Das CEBCI bezieht sich auf den Cambridge Bitcoin Electricity Consumption Index. Die Werte dienen zur Veranschaulichung und stellen keine offizielle Schätzung, Zusage oder Vorhersage dar.

Um den zuvor genannten Energieverbrauch in Kontext zu setzen, können wir ihn mit den Jahresschätzungen anderer Branchen vergleichen – so lässt sich der Wert 0,0026 TWh besser beurteilen. Die Daten sind im obigen Balkendiagramm zusammengefasst. Weitere Informationen finden Sie in der folgenden Tabelle:

|                       | Jährlicher Energieverbrauch (TWh) | Vergleich mit PoS-Ethereum | Quelle                                                                                                                                            |
| :-------------------- | :-------------------------------: | :------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Goldabbau             |                240                |          92.000x           | [Quelle](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html)                             |
| Goldabbau             |                130                |          50.000x           | [quelle](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| Bitcoin               |                130                |          50.000x           | [quelle](https://digiconomist.net/bitcoin-energy-consumption)                                                                                     |
| Bitcoin               |                100                |          38.000x           | [quelle](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| YouTube               |                244                |          94.000 x          | [quelle](https://thefactsource.com/how-much-electricity-does-youtube-use/)                                                                        |
| Globale Rechenzentren |                200                |          78.000x           | [quelle](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                       |
| Netflix               |               0,45                |            175x            | [quelle](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf)                  |
| Netflix               |                94                 |          36.000x           | [quelle](https://theshiftproject.org/en/article/unsustainable-use-online-video/)                                                                  |
| PayPal                |               0,26                |            100x            | [quelle](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                       |
| Gaming in den USA     |                34                 |          13.000x           | [quelle](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) |
| PoW-Ethereum          |                78                 |          30.000x           | [quelle](https://digiconomist.net/ethereum-energy-consumption)                                                                                    |
| PoS-Ethereum          |              0,0026               |             1x             | [quelle](https://carbon-ratings.com/eth-report-2022)                                                                                              |

Es gibt Schätzungen, für die der Energieverbrauch von YouTube nach Kanälen und individuellen Videos aufgeteilt wird. [Diese Schätzungen](https://thefactsource.com/how-much-electricity-does-YouTube-use/) implizieren, dass YouTube mit Gangnam Style 2019 175-mal mehr Energie verbraucht hat als Ethereums Proof-of-Stake in einem Jahr benötigt.

Es ist nicht einfach, genaue Schätzungen für den Energieverbrauch zu erhalten, insbesondere da komplexe Lieferketten und Bereitstellungsdetails gemessen werden müssen, die sich auf die Messeffizienz auswirken. Zum Beispiel haben wir eine obere und untere Schätzung für Goldabbau eingeschlossen, die sich um ungefähr 90 TWh unterscheiden. Schätzungen des Energieverbrauchs von Netflix unterscheiden sich je nach Quelle stark. Ihre eigenen selbst gemeldeten Schätzungen sind etwa 20-mal kleiner als eine unabhängige Schätzung – es gibt eine Diskussion über die Gründe dafür bei [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Ähnlich wird YouTube auf einen Energieverbrauch von [244 TWh/Jahr](https://thefactsource.com/how-much-electricity-does-youtube-use/) geschätzt, obwohl der Energieverbrauch stark vom Typ des Geräts abhängt, auf dem Videos gestreamt werden, und der Energieeffizienz der zugrunde liegenden Infrastruktur wie Datenzentren – geeignete Werte für diese Parameter sind schwer zu schätzen, so dass es erhebliche Unsicherheiten gibt.

Das obige Diagramm enthält auch Vergleiche zu Bitcoin und Ethereum, als es Proof-of-Work verwendete. Schätzungen des Energieverbrauchs von Bitcoin variieren stark zwischen den Quellen und es ist ein Thema, zu dem es viele nuancierte [Debatten](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) gibt, nicht nur über das Energievolumen, das verbraucht wird, sondern auch über die Quellen dieser Energie und die damit verbundenen ethischen Fragen.

Viele Artikel schätzen den "pro Transaktion" verbrauchten Energieaufwand für Blockchains. Dies kann irreführend sein, da die Energie, die erforderlich ist, um einen Block vorzuschlagen und zu validieren, unabhängig von der Anzahl der Transaktionen darin ist. Ein auf Transaktionseinheiten basiertes Maß für die Energieausgaben impliziert, dass weniger Transaktionen zu einem geringeren Energiebedarf führen und umgekehrt mehr Transaktionen zu einem höheren Energieverbrauch. Das ist aber nicht der Fall. Auch sind Schätzungen pro Transaktion sehr empfindlich für die Definition des Transaktionsdurchsatzes einer Blockchain und die Anpassung dieser Definition bietet Raum für Manipulationen, um den Wert größer oder kleiner darzustellen.

Zum Beispiel bezieht sich die Transaktionsleistung bei Ethereum nicht nur auf die Basisschicht – sie ist auch die Summe der Transaktionsleistung aller "[Layer 2](/layer-2/)"-Rollups. Layer 2 werden in der Regel nicht in die Berechnungen miteinbezogen, aber die Berücksichtigung des zusätzlichen Energieverbrauchs durch Sequencer (gering) und der Anzahl der von ihnen verarbeiteten Transaktionen (hoch) würde wahrscheinlich die Schätzungen pro Transaktion drastisch reduzieren. Das ist ein Grund, warum Vergleiche des Energieverbrauchs pro Transaktion über verschiedene Plattformen hinweg irreführend sein können.

## Der CO2-Fußabdruck von Ethereum {#carbon-debt}

Der Energieverbrauch von Ethereum ist sehr gering, doch das war nicht immer so. Ethereum verwendete ursprünglich Proof-of-Work, dessen Umweltauswirkungen viel größer waren als beim aktuellen Proof-of-Stake-Mechanismus.

Von Anfang an hatte Ethereum den Plan, einen auf Proof-of-Stake basierenden Konsensmechanismus umzusetzen, allerdings ohne die Sicherheit und Dezentralität zu opfern. Das erforderte Jahre intensiver Forschung und Entwicklung. Zu Beginn des Netzwerks kam daher ein Proof-of-Work-Mechanismus zum Einsatz. Proof-of-Work erfordert, dass Miner ihre Computerhardware verwenden, um einen Wert zu berechnen. Dabei wurde Energie verbraucht. Während des Höhepunkts des Krypto-Bullen-Markts im Februar 2022 betrug der Spitzenwert des gesamten Energieverbrauchs von Ethereum 94 TWh/a. Kurz vor dem Wechsel zu Proof-of-Stake betrug der Energieverbrauch etwa [78 TWh/Jahr](https://digiconomist.net/ethereum-energy-consumption). Das ist vergleichbar mit dem von Usbekistan, mit einer CO2-Emission, die der von Aserbaidschan entspricht (33 MT/Jahr).

![Vergleich des Energieverbrauchs von Ethereum vor und nach der Zusammenführung. Auf der linken Seite befindet sich der Eiffelturm mit 330 m Höhe und rechts eine Plastikfigur mit 4 cm Höhe, durch eine Lupe betrachtet.](energy_consumption_pre_post_merge.png)

Das CCRI hat den Einfluss des Übergangs von Ethereum von Proof-of-Work zu Proof-of-Stake untersucht. Der jährliche Stromverbrauch wurde um mehr als **99,988 %** reduziert. Ebenso wurde Ethereums CO2-Fußabdruck um etwa **99,992 %** verringert (von 11.016.000 auf 870 Tonnen CO2). Metaphorisch dargestellt entspricht dasies einer Reduzierung der Emissionen von der Höhe des Eiffelturms zu einer kleinen Plastikfigur, wie in der obigen Abbildung gezeigt. Die Umweltbelastung zur Sicherung des Netzwerks wird daher drastisch verringert. Gleichzeitig wird angenommen, dass die Sicherheit des Netzwerks gestiegen ist.

## Eine grüne Anwendungsebene {#green-applications}

Während Ethereums Energieverbrauch sehr niedrig ist, gibt es auch eine beträchtlich wachsende und sehr aktive Gruppe für **regeneratives Finanzwesen (ReFi)**, das auf Ethereum aufbaut. ReFi-Anwendungen verwenden DeFi-Komponenten, um Finanzanwendungen zu erstellen, die positive externe Effekte auf die Umwelt haben. ReFi ist Teil einer größeren ["Solarpunk"](https://en.wikipedia.org/wiki/Solarpunk)-Bewegung, die eng mit Ethereum abgestimmt und darauf ausgerichtet ist, technologischen Fortschritt und Umweltverantwortung miteinander zu verbinden. Die dezentralisierte, berechtigungslose und kombinierbare Natur von Ethereum macht es zur idealen Basisschicht für die ReFi- und Solarpunk-Community.

Native Web3-Finanzierungsplattformen für öffentliche Güter wie [Gitcoin](https://gitcoin.co) führen Klimarunden durch, um ein umweltbewusstes Bauen auf der Anwendungsschicht von Ethereum zu fördern. Durch die Entwicklung dieser Initiativen (und anderen, z. B. [DeSci](/desci/)) wird Ethereum zu einer umwelt- und sozialverträglichen Technologie.

<InfoBanner emoji=":evergreen_tree:">
  Wenn Sie denken, dass diese Seite präziser gestaltet werden kann, erstellen Sie bitte eine Anfrage oder einen Beitrag. Die Statistiken auf dieser Seite sind Schätzungen auf der Grundlage öffentlich verfügbarer Daten. Sie stellen keine offizielle Aussage oder Versprechen des ethereum.org-Teams oder der Ethereum Foundation dar. 
</InfoBanner>

## Weiterführende Informationen {#further-reading}

- [Bericht des Weißen Hauses zu Blockchains mit Proof-of-Work](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Der Energieverbrauch von Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum-Emissionen: Eine Bottom-up Schätzung](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Energieverbrauch-Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Die Zusammenführung - Auswirkungen auf den Stromverbrauch und den CO2-Footprint des Ethereum-Netzwerks](https://carbon-ratings.com/eth-report-2022) - _CCRI_

## Verwandte Themen {#related-topics}

- [Die Vision von Ethereum](/roadmap/vision/)
- [Die Beacon Chain](/roadmap/beacon-chain)
- [Der Zusammenschluss](/roadmap/merge/)
