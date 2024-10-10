---
title: Spotreba energie Etherea
description: Základné informácie na porozumenie, koľko energie spotrebúva Ethereum.
lang: sk
---

# Energetické náklady Etherea {#proof-of-stake-energy}

Ethereum je „zelený“ blockchain. Mechanizmus konsenzu [proof-of-stake](/developers/docs/consensus-mechanisms/pos) Etherea používa ETH miesto [energie na zabezpečenie siete](/developers/docs/consensus-mechanisms/pow). Spotreba energie Etherea je v celej globálnej sieti približne [~0,0026 TWh/rok](https://carbon-ratings.com/eth-report-2022).

Odhad spotreby energie pre Ethereum pochádza zo štúdie [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Tá obsahovala celkové odhady spotreby elektriny a uhlíkové stopy siete Ethereum ([pozri správa](https://carbon-ratings.com/eth-report-2022)). Merali spotrebu elektriny rôznych uzlov s rôznymi konfiguráciami hardvéru a softvéru. Odhadovaných **2,601 MWh** (0,0026 TWh) na ročnú spotrebu elektriny siete zodpovedá ročným emisiám uhlíka **870 ton CO2e** pri použití regionálnych faktorov intenzity uhlíka. Táto hodnota sa mení, keď sa uzly pripoja alebo odpoja od siete – môžete ju sledovať pomocou kĺzavého sedemdňového priemerného odhadu podľa [Cambridge Blockchain network Sustainability indexu](https://ccaf.io/cbnsi/ethereum) (všimnite si, že pre svoje odhady používajú trochu inú metódu – podrobnosti sú k dispozícii na ich webe).

Aby sme uviedli spotrebu energie Etherea do kontextu, môžeme porovnať ročné odhady pre niektoré ďalšie priemyselné odvetvia. To nám pomôže lepšie pochopiť, či je odhad pre Ethereum vysoký alebo nízky.

<EnergyConsumptionChart />

Vyššie uvedený graf zobrazuje odhadovanú ročnú spotrebu energie v TWh/rok pre Ethereum v porovnaní s niekoľkými inými odvetviami. Uvedené odhady pochádzajú z verejne dostupných informácií, ktoré boli sprístupnené v máji 2023, odkazy na použité zdroje sú dostupné v nižšie uvedenej tabuľke.

|                        | Ročná spotreba energie (TWh) | Porovnanie s Ethereum PoS |                                                                                      Zdroj                                                                                       |
|:---------------------- |:----------------------------:|:-------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Globálne dátové centrá |             190              |          73,000x          |                                    [zdroj](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                |             149              |          53,000x          |                                                                 [zdroj](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Ťažba zlata            |             131              |          50,000x          |                                                                 [zdroj](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming v USA\*       |              34              |          13,000x          |                 [zdroj](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum           |              21              |          8,100x           |                                                                    [zdroj](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                 |              19              |          7,300x           |                                           [zdroj](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                |            0,457             |           176x            | [zdroj](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                 |             0,26             |           100x            |                                  [zdroj](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                 |             0,02             |            8x             |                               [zdroj](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**       |          **0,0026**          |          **1x**           |                                                               [zdroj](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Zahŕňa zariadenia koncových používateľov, napríklad počítače, notebooky a herné konzoly.

Je zložité získať presné odhady spotreby energie, obzvlášť keď tu existuje zložitý dodávateľský reťazec alebo detaily nasadenia, ktoré ovplyvňujú účinnosť. Napríklad odhady spotreby energie spoločnosťou Netflix a Google sa líšia v závislosti od toho, či zahŕňajú iba energiu spotrebovanú na údržbu ich systémov a poskytovanie obsahu používateľom (_priame výdavky_), alebo či zahŕňajú aj výdavky potrebné na produkciu obsahu, prevádzku firemných kancelárií, reklamu atď. (_nepriame výdavky_). Nepriame výdavky môžu zahŕňať aj energiu potrebnú na spotrebu obsahu na zariadeniach koncových používateľov, ako sú televízory, počítače a mobilné telefóny.

Tieto vyššie uvedené odhady nie sú dokonalým porovnaním. Výška nepriamych výdavkov, ktoré sa započítavajú, sa líši podľa zdroja a zriedkakedy zahŕňa energiu zo zariadení koncových užívateľov. Každý podkladový zdroj obsahuje podrobnejšie informácie o tom, čo sa meria.

Tabuľka a graf vyššie tiež obsahujú porovnanie s Bitcoinom a proof-of-work Ethereom. Je dôležité si uvedomiť, že spotreba energie v proof-of-work sieťach nie je statická a mení sa zo dňa na deň. Odhady sa môžu medzi jednotlivými zdrojmi značne líšiť. Táto téma priťahuje rôznorodé [debaty,](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nielen o množstve spotrebovanej energie, ale aj o jej zdrojoch a súvisiacich etických otázkach. Spotreba energie nemusí nevyhnutne presne zodpovedať ekologickej stope, pretože rôzne projekty môžu využívať rôzne zdroje energie, vrátane menšieho či väčšieho podielu obnoviteľných zdrojov. Napríklad [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) ukazuje, že dopyt po sieti Bitcoin by teoreticky mohol byť napájaný spaľovaním plynu alebo elektrinou, ktorá by sa inak stratila pri prenose a distribúcii. Cesta Etherea k udržateľnosti spočívala v nahradení energeticky náročnej časti siete zelenou alternatívou.

Na stránke [Cambridge Blockchain Network Sustainability indexu](https://ccaf.io/cbnsi/ethereum) si môžete prezrieť odhady spotreby energie a uhlíkových emisií pre množstvo priemyselných odvetví.

## Odhady spotreby jednotlivých transakcií {#per-transaction-estimates}

Mnoho článkov odhaduje výdavky energie „na transakciu“ pre rôzne blockchainy. To môže byť zavádzajúce, pretože energia potrebná na navrhnutie a validáciu bloku je nezávislá na počte transakcií v ňom. Jednotka energetického výdaja na transakciu znamená, že menší počet transakcií by viedol k menšiemu energetickému výdavku a naopak, čo nie je pravda. Odhady na jednotlivé transakcie sú tiež veľmi citlivé na to, ako je definovaná priepustnosť transakcií blockchainu, a vyladenie tejto definície možno ovplyvniť tak, aby sa hodnota zdala väčšia alebo menšia.

Napríklad u Etherea nie je transakčná priepustnosť iba priepustnosťou základnej vrstvy – je to tiež súčet transakčnej priepustnosti všetkých jej rollupov na „[vrstve 2](/layer-2/)“. 2. vrstva väčšinou nie je zahrnutá do výpočtov, ale zohľadnenie energie dodatočne spotrebovanej sekvencery (malá) a počtu transakcií, ktoré spracovávajú (veľká), by pravdepodobne drasticky znížilo odhady spotreby energie na transakciu. To je jedným z dôvodov, prečo môže byť porovnanie spotreby energie na transakcii naprieč platformami zavádzajúce.

## Uhlíkový dlh Etherea {#carbon-debt}

Energetický výdaj Etherea je veľmi nízky, ale nie vždy to tak bolo. Ethereum pôvodne používalo machanizmus proof-of-work, ktorý mal oveľa vyššie ekologické náklady ako súčasný proof-of-stake.

Od samého začiatku Ethereum plánovalo implementovať mechanizmus konsenzu založený na proof-of-stake, ale dosiahnutie tohto cieľa bez zníženia bezpečnosti a decentralizácie si vyžiadalo roky sústredeného výskumu a vývoja. Preto bol na spustenie siete použitý mechanizmus proof-of-work. Ten vyžaduje, aby ťažiari na výpočet hodnoty použili svoj hardvér, a tým spotrebovali energiu.

![Porovnanie spotreby energie Etherea pred a po zlúčení s použitím Eiffelovky (330 metrov vysokej) naľavo, ktorá predstavuje vysokú spotrebu energie pred zlúčením, a malé 4 cm vysoké figúrky Lego napravo, ktorá predstavuje dramatické zníženie spotreby energie po zlúčení](energy_consumption_pre_post_merge.png)

CCRI odhaduje, že Zlúčenie znížilo ročnú spotrebu elektriny Etherea o viac ako **99,988 %**. Podobne sa uhlíková stopa Etherea znížila o približne **99,992 %** (z 11 016 000 na 870 ton CO2e). Pre lepšiu predstavu sa dá povedať, že zníženie emisií je ako znížiť výšku Eiffelovky na výšku malej plastovej figúrky, ako je znázornené na obrázku vyššie. V dôsledku toho sa významne znižujú ekologické náklady na zabezpečenie siete. Zároveň sa predpokladá, že sa zlepšilo zabezpečenie siete.

## Zelená vrstva aplikácií {#green-applications}

Zatiaľ čo spotreba energie Etherea je veľmi nízka, na Ethereu sa buduje aj značná, rastúca a veľmi aktívna komunita [**obnoviteľného financovania (ReFi)**](/refi/). Aplikácie ReFi využívajú komponenty DeFi na vytváranie finančných aplikácií, ktoré majú pozitívne externality prospievajúce životnému prostrediu. ReFi je súčasťou širšieho [„solarpunkového“](https://en.wikipedia.org/wiki/Solarpunk) hnutia, ktoré je úzko späté s Ethereom a ktorého cieľom je prepojiť technologický pokrok so starostlivosťou o životné prostredie. Ethereum je decentralizované, bez vstupných bariér a pripravené na budovanie projektov, čo z neho robí ideálnu základnú vrstvu pre komunity ReFi a solarpunk.

Natívne platformy pre financovanie verejných statkov fungujúcich na princípoch Web3, ako je [Gitcoin](https://gitcoin.co) majú aj okruhy zamerané na ochranu klímy, vďaka čomu stimulujú ekologicky uvedomelý rozvoj na aplikačnej vrstve Etherea. Prostredníctvom rozvoja týchto iniciatív (a ďalších, napr. [DeSci](/desci/)), sa Ethereum stáva environmentálne a sociálne pozitívnou technológiou.

<InfoBanner emoji=":evergreen_tree:">
  Pokiaľ si myslíte, že by táto stránka mohla byť presnejšia, upozornite nás na to alebo použite PR. Štatistiky na tejto stránke sú odhady založené na verejne dostupných dátach – nepredstavujú oficiálne vyhlásenie alebo prísľub tímu ethereum.org alebo nadácie Ethereum.
</InfoBanner>

## Ďalšie zdroje informácií {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Správa Bieleho domu o proof-of-work blockchainoch](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisie Etherea: súhrnný odhad](https://kylemcdonald.github.io/ethereum-emissions/) – _Kyle McDonald_
- [Index spotreby energie Ethera](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) – _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Zlúčenie – vplyvy na spotrebu elektriny a uhlíkovú stopu siete Ethereum](https://carbon-ratings.com/eth-report-2022) – _CCRI_
- [Spotreba energie Etherea](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Related topics {#related-topics}

- [Vízia Etherea](/roadmap/vision/)
- [Reťazec Beacon](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)
