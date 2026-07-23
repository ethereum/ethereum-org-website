---
title: Spotřeba energie Etherea
metaTitle: Spotřeba energie Etherea
description: Základní informace, které potřebujete k pochopení spotřeby energie Etherea.
lang: cs
---

[Ethereum](/) je ekologický blockchain. [Mechanismus konsensu důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos) Etherea využívá k [zabezpečení sítě](/developers/docs/consensus-mechanisms/pow) ETH namísto energie. Spotřeba energie Etherea je přibližně [~0,0026 TWh/rok](https://carbon-ratings.com/eth-report-2022) v rámci celé globální sítě.

Odhad spotřeby energie pro Ethereum pochází ze studie [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Vytvořili odhady spotřeby elektřiny a uhlíkové stopy sítě Ethereum zdola nahoru ([viz zpráva](https://carbon-ratings.com/eth-report-2022)). Měřili spotřebu elektřiny různých uzlů s různými konfiguracemi hardwaru a klientského softwaru. Odhadovaných **2 601 MWh** (0,0026 TWh) roční spotřeby elektřiny sítě odpovídá ročním emisím uhlíku ve výši **870 tun CO2e** při použití regionálně specifických faktorů uhlíkové náročnosti. Tato hodnota se mění s tím, jak uzly vstupují do sítě a opouštějí ji – můžete ji sledovat pomocí klouzavého 7denního průměru odhadu z [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (upozorňujeme, že pro své odhady používají mírně odlišnou metodu – podrobnosti jsou k dispozici na jejich webu).

Abychom zasadili spotřebu energie Etherea do kontextu, můžeme porovnat anualizované odhady pro některé další produkty a odvětví. To nám pomůže lépe pochopit, zda je odhad pro Ethereum vysoký nebo nízký.

<EnergyConsumptionChart />

Výše uvedený graf zobrazuje odhadovanou spotřebu energie v TWh/rok pro Ethereum v porovnání s několika dalšími produkty a odvětvími. Poskytnuté odhady pocházejí z veřejně dostupných informací získaných v červenci 2023, přičemž odkazy na zdroje jsou k dispozici v tabulce níže.

|                     | Anualizovaná spotřeba energie (TWh) | Porovnání s PoS Ethereem |                                                                                      Zdroj                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Globální datová centra |                 190                 |          73 000x           |                                    [zdroj](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53 000x           |                                                                 [zdroj](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Těžba zlata         |                 131                 |          50 000x           |                                                                 [zdroj](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Hraní her v USA\*   |                 34                  |          13 000x           |                 [zdroj](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum        |                 21                  |           8 100x           |                                                                    [zdroj](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7 300x           |                                           [zdroj](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [zdroj](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [zdroj](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [zdroj](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS Ethereum**    |             **0,0026**              |           **1x**           |                                                               [zdroj](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Zahrnuje zařízení koncových uživatelů, jako jsou PC, notebooky a herní konzole.

Získat přesné odhady spotřeby energie je složité, zejména když to, co se měří, má složitý dodavatelský řetězec nebo detaily nasazení, které ovlivňují jeho efektivitu. Například odhady spotřeby energie pro Netflix a Google se liší v závislosti na tom, zda zahrnují pouze energii použitou k údržbě jejich systémů a doručování obsahu uživatelům (_přímé výdaje_), nebo zda zahrnují výdaje potřebné k produkci obsahu, provozu firemních kanceláří, reklamě atd. (_nepřímé výdaje_). Nepřímé výdaje by mohly zahrnovat také energii potřebnou ke konzumaci obsahu na zařízeních koncových uživatelů, jako jsou televize, počítače a mobilní telefony.

Výše uvedené odhady nejsou dokonalým srovnáním. Množství nepřímých výdajů, které se započítává, se liší podle zdroje a zřídka zahrnuje energii ze zařízení koncových uživatelů. Každý podkladový zdroj obsahuje více podrobností o tom, co se měří.

Výše uvedená tabulka a graf zahrnují také srovnání s Bitcoinem a Ethereem na bázi důkazu prací (PoW). Je důležité si uvědomit, že spotřeba energie sítí s důkazem prací není statická a mění se ze dne na den. Odhady se také mohou mezi zdroji značně lišit. Toto téma přitahuje nuancovanou [debatu](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), a to nejen o množství spotřebované energie, ale také o zdrojích této energie a související etice. Spotřeba energie nemusí nutně přesně odpovídat ekologické stopě, protože různé projekty mohou využívat různé zdroje energie, včetně menšího či většího podílu obnovitelných zdrojů. Například [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) naznačuje, že poptávka sítě Bitcoin by teoreticky mohla být pokryta spalováním plynu nebo elektřinou, která by se jinak ztratila při přenosu a distribuci. Cestou Etherea k udržitelnosti bylo nahradit energeticky náročnou část sítě ekologickou alternativou.

Odhady spotřeby energie a emisí uhlíku pro mnoho odvětví si můžete prohlédnout na [stránkách Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Odhady na transakci {#per-transaction-estimates}

Mnoho článků odhaduje spotřebu energie blockchainů „na transakci“. To může být zavádějící, protože energie potřebná k navržení a ověření bloku je nezávislá na počtu transakcí v něm obsažených. Jednotka spotřeby energie na transakci naznačuje, že méně transakcí by vedlo k menší spotřebě energie a naopak, což není pravda. Odhady na transakci jsou také velmi citlivé na to, jak je definována propustnost transakcí blockchainu, a úpravou této definice lze manipulovat tak, aby se hodnota zdála větší nebo menší.

Například na Ethereu není propustnost transakcí pouze propustností základní vrstvy – je to také součet propustnosti transakcí všech jeho rollupů na „[vrstvě 2 (l2)](/layer-2/)“. Vrstvy 2 se do výpočtů obecně nezahrnují, ale zohlednění dodatečné energie spotřebované sekvencery (malé množství) a počtu transakcí, které zpracovávají (velké množství), by pravděpodobně drasticky snížilo odhady na transakci. To je jeden z důvodů, proč může být srovnání spotřeby energie na transakci napříč platformami zavádějící.

## Uhlíkový dluh Etherea {#carbon-debt}

Spotřeba energie Etherea je velmi nízká, ale nebylo tomu tak vždy. Ethereum původně používalo důkaz prací (PoW), který měl mnohem vyšší ekologické náklady než současný mechanismus důkazu podílem (PoS).

Od samého začátku Ethereum plánovalo implementovat mechanismus konsensu založený na důkazu podílem, ale učinit tak bez obětování bezpečnosti a decentralizace si vyžádalo roky soustředěného výzkumu a vývoje. Proto byl k nastartování sítě použit mechanismus důkazu prací. Důkaz prací vyžaduje, aby těžaři používali svůj výpočetní hardware k výpočtu hodnoty, přičemž v tomto procesu spotřebovávají energii.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI odhaduje, že Merge snížil anualizovanou spotřebu elektřiny Etherea o více než **99,988 %**. Podobně se uhlíková stopa Etherea snížila o přibližně **99,992 %** (z 11 016 000 na 870 tun CO2e). Abychom to uvedli do perspektivy, snížení emisí je jako přechod z výšky Eiffelovy věže na malou plastovou figurku, jak je znázorněno na obrázku výše. V důsledku toho se drasticky snížily ekologické náklady na zabezpečení sítě. Zároveň se má za to, že se bezpečnost sítě zlepšila.

## Ekologická aplikační vrstva {#green-applications}

Zatímco spotřeba energie Etherea je velmi nízká, na Ethereu také staví podstatná, rostoucí a vysoce aktivní komunita [**regenerativních financí (ReFi)**](/refi/). Aplikace ReFi využívají komponenty decentralizovaných financí (DeFi) k budování finančních aplikací, které mají pozitivní externality prospěšné pro životní prostředí. ReFi je součástí širšího hnutí [„solarpunk“](https://en.wikipedia.org/wiki/Solarpunk), které je úzce spjato s Ethereem a jehož cílem je propojit technologický pokrok a péči o životní prostředí. Decentralizovaná, nevyžadující povolení a komponovatelná povaha Etherea z něj činí ideální základní vrstvu pro komunity ReFi a solarpunk.

Platformy pro financování veřejných statků nativní pro Web3, jako je [Gitcoin](https://gitcoin.co), pořádají klimatická kola, aby stimulovaly ekologicky uvědomělé budování na aplikační vrstvě Etherea. Prostřednictvím rozvoje těchto iniciativ (a dalších, např. [decentralizované vědy (DeSci)](/desci/)) se Ethereum stává ekologicky a sociálně čistě pozitivní technologií.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Pokud si myslíte, že by tato stránka mohla být přesnější, vytvořte prosím issue nebo PR. Statistiky na této stránce jsou odhady založené na veřejně dostupných datech – nepředstavují oficiální prohlášení ani slib týmu ethereum.org nebo Nadace Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Další čtení {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Zpráva Bílého domu o blockchainech s důkazem prací](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emise Etherea: Odhad zdola nahoru](https://kylemcdonald.github.io/ethereum-emissions/) – _Kyle McDonald_
- [Index spotřeby energie Etherea](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) – _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Merge – Důsledky pro spotřebu elektřiny a uhlíkovou stopu sítě Ethereum](https://carbon-ratings.com/eth-report-2022) – _CCRI_
- [Spotřeba energie Etherea](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Související témata {#related-topics}

- [Beacon chain](/roadmap/beacon-chain)
- [Merge](/roadmap/merge/)