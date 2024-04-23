---
title: Az Ethereum energiafogyasztása
description: Alapvető információk az Ethereum energiafogyasztásának megértéséhez.
lang: hu
---

# Az Ethereum energiafogyasztása {#proof-of-stake-energy}

Az Ethereum egy környezetbarát blokklánc. Az Ethereum [proof-of-stake](/developers/docs/consensus-mechanisms/pos) konszenzus mechanizmusa ETH-t használ [az energia helyett, hogy biztosítsa a hálózatot](/developers/docs/consensus-mechanisms/pow). Az Ethereum energiafogyasztása [~0,0026 TWh/év](https://carbon-ratings.com/eth-report-2022) a teljes globális hálózaton.

Az Ethereum energiafogyasztásának becsült adata egy [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) tanulmányból származik. Ez egy lentről felfelé építkező becslés az Ethereum-hálózat áramfogyasztásáról és karbonlábnyomáról ([nézze meg a reportot](https://carbon-ratings.com/eth-report-2022)). A különféle csomópontok áramfogyasztását mérték, melyek különböző hardverekkel és kliensszoftverekkel működnek. A becsült **2601 MWh** (0,0026 TWh), mint a hálózat teljes éves áramfogyasztása, megfelel **870 tonna CO2e** szén-dioxid kibocsátásnak, regionális tényezőket figyelembe véve. Ez az érték változik, ahogy a csomópontok belépnek a hálózatra és kilépnek a hálózatról – Ön is ellenőrizheti egy gördülő 7 napos átlagbecsléssel: [Cambridge-blokklánchálózat fenntarthatósági indexe](https://ccaf.io/cbnsi/ethereum) (a módszer kicsit más, nézze meg a részleteket az oldalukon).

Az Ethereum energiafogyasztását összevethetjük más termékek és iparágak éves becsléseivel, hogy kontextusban lássuk azt. Így jobban megértjük, hogy Ethereum fogyasztása magas vagy alacsony.

<EnergyConsumptionChart />

Az ábra az Ethereum becsült fogyasztását mutatja TWh/év formájában, más termékekkel és iparágakkal összevetve. A becslések nyilvános adatokból származnak 2023. júliusából, a forrásokat megtalálja a táblázat alatt.

|                             | Éves energiafogyasztás (TWh) | Összevetve a PoS Ethereummal |                                                                                      Forrás                                                                                       |
|:--------------------------- |:----------------------------:|:----------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Globális adatközpontok      |             190              |           73 000x            |                                    [forrás](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                     |             149              |           53 000x            |                                                                 [forrás](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Aranybányászat              |             131              |           50 000x            |                                                                 [forrás](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Számítógépes játékok (USA)* |              34              |           13 000x            |                 [forrás](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum                |              21              |            8100x             |                                                                    [forrás](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                      |              19              |            7300x             |                                           [forrás](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                     |            0,457             |             176x             | [forrás](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                      |             0,26             |             100x             |                                  [forrás](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                      |             0,02             |              8x              |                               [forrás](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**            |          **0,0026**          |            **1x**            |                                                               [forrás](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Beleértve a felhasználói eszközök fogyasztását, mint asztali számítógépek, laptopok és játékkonzolok.

Bonyolult pontos becsléseket készíteni az energiafogyasztásról, főleg ha a vizsgált entitás összetett ellátási lánccal bír, ami befolyásolja a hatékonyságát. A Netflix és a Google esetében például a fogyasztás becslése attól függően változik, hogy a rendszer fenntartását és a tartalomnak a felhasználóhoz való eljutását nézik (_közvetlen fogyasztás_), vagy beleveszik azt is, amit a tartalom előállítása, irodák fenntartása, reklámozás stb. jelent (_közvetett fogyasztás_). A közvetett fogyasztásba az is beleszámíthat, hogy mennyi energiát vesz igénybe elfogyasztani a kínált tartalma a felhasználó oldalán, a tévék, számítógépek és mobilok használata során.

A fenti becslések nem tökéletes összehasonlítások. A közvetett fogyasztás mennyisége, amivel számolnak, különbözik a források szerint és ritkán tartalmazza a felhasználók eszközeit is. Minden mögöttes információforrás több részletet közöl arról, hogy pontosan mit mérnek.

Az összehasonlítás a Bitcoint és a proof-of-work Ethereumot feltünteti. Fontos megérteni, hogy a proof-of-work hálózatok fogyasztása nem statikus, és napról napra változik. A becslések nagy mértékben eltérhetnek a források szerint is. A téma árnyalt [vitát](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) generál, nemcsak a felhasznált energia mennyiségéről, hanem annak forrásáról és etikájáról is. Az energiafogyasztás nem feltétlenül pontosan kapcsolódik a környezeti hatásokhoz, mert különböző projektek különféle energiaforrásokat használnak, beleértve a kisebb vagy nagyobb arányú megújuló forrásokat is. Például a [Cambridge Bitcoin elektromosáram-fogyasztási index](https://ccaf.io/cbnsi/cbeci/comparisons) azt mutatja, hogy a Bitcoin hálózati igénye elméletileg kielégíthető lenne abból a gázból vagy áramból, ami a szállítás során amúgy is elveszne. Az Ethereum a fenntarthatóság miatt cserélte le a rendszer energiaéhes részét egy környezetbarát alternatívára.

Számtalan iparág energiafogyasztását és szén-dioxid-kibocsátását megtekintheti a [Cambridge-blokklánchálózat fenntarthatósági index oldalán](https://ccaf.io/cbnsi/ethereum).

## Tranzakciónkénti becslés {#per-transaction-estimates}

Számos cikk tranzakciónkénti becslésről beszél a blokkláncok esetén. Ez félrevezető, mert a blokkjavaslat és validálás független a benne található tranzakciók számától. A tranzakciónkénti felhasználás azt jelentené, hogy kevesebb tranzakció kevesebb energiát fogyaszt és fordítva, de ez nem igaz. Emellett a tranzakciónkénti becslés érzékeny arra, hogy a blokklánc tranzakcióátvitelét hogyan definiálják, amelynek megcsavarásával látszólag nagyobb vagy kisebb érték jön ki.

Az Ethereumon például a tranzakcióátvitel nemcsak az alapréteget tartalmazza, hanem a [második blokkláncréteg (L2)](/layer-2/) összevont tranzakcióit is. Az L2 általában nincs benne a kalkulációkban, de ha hozzávennénk a szekvenszer általi fogyasztást (kevés) és a kezelt tranzakciókat (sok), akkor jelentősen lecsökkenne a tranzakciónkénti becslés. Ez az egyik oka annak, hogy a platformok tranzakciónkénti energiafogyasztásának összehasonlítása félrevezető lehet.

## Az Ethereum karbonadóssága {#carbon-debt}

Az Ethereum energiafelhasználása igen alacsony, de nem mindig volt így. Az Ethereum eredetileg a proof-of-work mechanizmust használta, ami nagyobb környezeti költségekkel járt, mint a jelenlegi proof-of-stake.

Az Ethereum eleve a proof-of-stake-alapú konszenzusmechanizmust tervezte, anélkül hogy feláldozná a biztonságot vagy a decentralizáltságot, ezért többéves fókuszált kutatás és fejlesztés kellett hozzá. Emiatt a hálózat felállításához a proof-of-work mechanizmusra volt szükség. Ennél a bányászok a számítógépeiket használják az érték kiszámolására, energiát fogyasztva eközben.

![Az Ethereum energiafogyasztásának összehasonlítása a Beolvadás előtt és után, ahol az Eiffel torony (330 méter magas) a bal oldalon jelenti a korábbi állapotot, vagyis a nagy energiafogyasztást, a jelentős csökkenést pedig a 4 cm-es LEGO-figura képviseli](energy_consumption_pre_post_merge.png)

A CCRI becslése szerint a Beolvadás több mint **99,988%-kal** lecsökkentette az Ethereum éves áramfogyasztását. Ugyanígy az Ethereum karbonlábnyoma is csökkent **99,992%-kal** (11 016 000 tonna helyett 870 tonna CO2e lett). Ez a változás olyan, mint az Eiffel torony magaságáról egy kis bábu méretére csökkent fogyasztás, ahogy az ábra illusztrálja. Ennek következtében a hálózat biztosításának környezeti költsége drasztikusan lecsökkent. A hálózat biztonsága pedig növekedett.

## Környezetbarát alkalmazási réteg {#green-applications}

Miközben az Ethereum energiafogyasztása nagyon alacsony, egy jelentős, fejlődő és igen aktív [**regeneratív pénzügyi (ReFi)**](/refi/) közösség épült a hálózaton. A ReFi alkalmazások a decentralizált pénzügyek (DeFi) komponenseit használják, hogy olyan pénzügyi alkalmazásokat építsenek, amelyek pozitív externáliákat teremtenek. A ReFi része egy kiterjedtebb[„solarpunk”](https://en.wikipedia.org/wiki/Solarpunk) mozgalomnak, ami szorosan kötődik az Ethereumhoz, és a technológiai fejlődést a környezetről való gondoskodással párosítja. Az Ethereum decentralizált, engedélymentes és egymásra építhető jellege miatt ideális alap a ReFi és a solarpunk közösségeknek.

A web3 közjó-finanszírozási platformjai, mint a [Gitcoin](https://gitcoin.co) klímaköröket működtetnek, hogy elősegítsék az Ethereum alkalmazási rétegének környezettudatos építését. Ezen kezdeményezések (és mások, mint a [decentralizált tudomány / DeSci](/desci/)) kialakulása által az Ethereum egy környezeti és közösségi szempontból pozitív technológia.

<InfoBanner emoji=":evergreen_tree:">
  Ha szeretne az oldallal kapcsolatban fejlesztést javasolni, akkor naplózzon egy kérést (issue) vagy PR-t. A statisztikák nyilvánosan elérhető adatokból készült becslések, nem hivatalos állítások vagy ígéretek az ethereum.org csapat vagy az Ethereum Alapítvány részéről.
</InfoBanner>

## További olvasnivaló {#further-reading}

- [Cambridge-blokklánchálózat fenntarthatósági indexe](https://ccaf.io/cbnsi/ethereum)
- [Fehérházi jelentése a proof-of-work alapú blokkláncokról](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum-kibocsátás: egy alulról építkező becslés](https://kylemcdonald.github.io/ethereum-emissions/) – _Kyle McDonald_
- [Ethereum energiafelhasználási index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) – _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Az egyesítés (The Merge) – az Ethereum-hálózat áramfogyasztására és karbonlábnyomára gyakorolt hatása](https://carbon-ratings.com/eth-report-2022) – _CCRI_
- [Az Ethereum energiafogyasztása](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Kapcsolódó témák {#related-topics}

- [Az Ethereum jövőképe](/roadmap/vision/)
- [A Beacon Chain](/roadmap/beacon-chain)
- [Az egyesítés](/roadmap/merge/)
