---
title: Spotřeba energie Etherea
description: Základní informace k porozumění, kolik energie spotřebovává Ethereum.
lang: cs
---

# Energetické náklady Etherea {#proof-of-stake-energy}

Ethereum je "zelený" blockchain. Mechanismus konsenzu [proof-of-stake](/developers/docs/consensus-mechanisms/pos) Etherea používá ETH místo [ energie k zabezpečení sítě](/developers/docs/consensus-mechanisms/pow). Spotřeba energie Etherea je v celé globální síti přibližně [~0,0026 TWh/rok](https://carbon-ratings.com/eth-report-2022).

Odhad spotřeby energie pro Ethereum pochází ze studie [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Ta obsahovala celkové odhady spotřeby elektřiny a uhlíkové stopy sítě Ethereum ([viz zpráva](https://carbon-ratings.com/eth-report-2022)). Měřili spotřebu elektřiny různých síťových uzlů s různými konfiguracemi hardwaru a softwaru. Odhadovaných **2,601 MWh** (0.0026 TWh) pro roční spotřebu elektřiny sítě odpovídá ročním emisím uhlíku **870 tun CO2e** při použití regionálních faktorů intenzity uhlíku. Tato hodnota se mění, když se síťové uzly připojí nebo odpojí od sítě – můžete ji sledovat pomocí klouzavého sedmidenního průměrného odhadu podle [Cambridge Blockchain network Sustainability indexu](https://ccaf.io/cbnsi/ethereum) (všimněte si, že pro své odhady používají trochu jinou metodu – podrobnosti jsou k dispozici na jejich webu).

Abychom uvedli spotřebu energie Etherea do kontextu, můžeme porovnat roční odhady pro některá další průmyslová odvětví. To nám pomůže lépe pochopit, zda je odhad pro Ethereum vysoký nebo nízký.

<EnergyConsumptionChart />

Výše uvedený graf zobrazuje odhadovanou roční spotřebu energie v TWh/rok pro Ethereum ve srovnání s několika jinými odvětvími. Uvedené odhady pocházejí z veřejně dostupných informací, které byly zpřístupněny v květnu 2023, odkazy na použité zdroje jsou dostupné v níže uvedené tabulce.

|                        | Anualizovaná spotřeba energie (TWh) | Porovnání s Ethereum PoS |                                                                                      Zdroj                                                                                       |
|:---------------------- |:-----------------------------------:|:------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Globální datová centra |                 190                 |         73,000x          |                                    [zdroj](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                |                 149                 |         53,000x          |                                                                 [zdroj](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Těžba zlata            |                 131                 |         50 000x          |                                                                 [zdroj](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming v USA\*       |                 34                  |         13 000x          |                 [zdroj](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum           |                 21                  |          8,100x          |                                                                    [zdroj](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                 |                 19                  |          7,300x          |                                           [zdroj](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                |                0,457                |           176x           | [zdroj](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                 |                0,26                 |           100x           |                                  [zdroj](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                 |                0,02                 |            8x            |                               [zdroj](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**       |             **0,0026**              |          **1x**          |                                                               [zdroj](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Zahrnuje zařízení koncových uživatelů jako jsou třeba počítače, notebooky a herní konzole.

Je složité získat přesné odhady spotřeby energie, obzvláště když zde existuje složitý dodavatelský řetězec nebo detaily nasazení, které ovlivňují účinnost. Například odhady spotřeby energie společností Netflix a Google se liší v závislosti na tom, zda zahrnují pouze energii spotřebovanou na údržbu jejich systémů a poskytování obsahu uživatelům (_přímé výdaje_), nebo zda zahrnují i výdaje potřebné na produkci obsahu, provoz firemních kanceláří, reklamu atd. (_nepřímé výdaje_). Nepřímé výdaje mohou zahrnovat také energii potřebnou ke spotřebě obsahu na zařízeních koncových uživatelů, jako jsou televizory, počítače a mobilní telefony.

Tyto výše uvedené odhady nejsou dokonalým srovnáním. Výše nepřímých výdajů, které se započítávají, se liší podle zdroje a zřídkakdy zahrnuje energii ze zařízení koncových uživatelů. Každý podkladový zdroj obsahuje podrobnější informace o tom, co se měří.

Tabulka a graf výše také obsahují srovnání s Bitcoinem a proof-of-work Ethereem. Je důležité si uvědomit, že spotřeba energie v proof-of-work sítích není statická a mění se ze dne na den. Odhady se mohou mezi jednotlivými zdroji značně lišit. Toto téma přitahuje různorodé [debaty](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), nejen o množství spotřebované energie, ale také o jejích zdrojích a souvisejících etických otázkách. Spotřeba energie nemusí nutně přesně odpovídat ekologické stopě, protože různé projekty mohou využívat různé zdroje energie, včetně menšího či většího podílu obnovitelných zdrojů. Například [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) ukazuje, že poptávka po síti Bitcoin by teoreticky mohla být napájena spalováním plynu nebo elektřinou, která by se jinak ztratila při přenosu a distribuci. Cesta Etherea k udržitelnosti spočívala v nahrazení energeticky náročné části sítě zelenou alternativou.

Na [stránce Cambridge Blockchain Network Sustainability indexu](https://ccaf.io/cbnsi/ethereum) si můžete prohlédnout odhady spotřeby energie a uhlíkových emisí pro spoustu průmyslových odvětví.

## Odhady spotřeby jednotlivých transakcí {#per-transaction-estimates}

Několik článků odhaduje výdaje energie „na transakci“ pro různé blockchainy. To může být zavádějící, protože energie potřebná k navržení a validaci bloku je nezávislá na počtu transakcí v něm. Jednotka energetického výdaje na transakci znamená, že menší počet transakcí by vedl k menšímu energetickému výdaji a naopak, což není pravda. Odhady na jednotlivé transakce jsou také velmi citlivé na to, jak je definována propustnost transakcí blockchainu, a vyladění této definice lze ovlivnit tak, aby se hodnota zdála větší nebo menší.

Například u Etherea není transakční propustnost pouze propustností základní vrstvy - je to také součet transakční propustnosti všech jejích rollupů na "[vrstvě 2](/layer-2/)". 2. vrstva vetšinou není zahrnuta do výpočtů, ale zohlednění energie dodatečně spotřebované sekvencery (malá) a počtu transakcí, které zpracovávají (velká), by pravděpodobně drasticky snížilo odhady spotřeby energie na transakci. To je jedním z důvodů, proč může být srovnání spotřeby energie na transakci napříč platformami zavádějící.

## Uhlíkový dluh Etherea {#carbon-debt}

Energetický výdej Etherea je velmi nízký, ale ne vždy tomu tak bylo. Ethereum původně používalo machanismus proof-of-work, který měl mnohem vyšší ekologické náklady než současný proof-of-stake.

Od samého začátku Ethereum plánovalo implementovat mechanismus konsensu založený na proof-of-stake, ale aby to bylo možné uskutečnit bez snížení bezpečnosti a decentralizace, si vyžádalo roky soustředěného výzkumu a vývoje. Proto byl ke spuštění sítě použit mechanismus proof-of-work. Ten vyžaduje, aby těžaři k výpočtu hodnoty použili svůj hardware, a tím spotřebovali energii.

![Porovnání spotřeby energie Etherea před a po mergi s použitím Eiffelovky (330 metrů vysoké) nalevo, která představuje vysokou spotřebu energie před mergem, a malé 4 cm vysoké figurky Lego napravo, která představuje dramatické snížení spotřeby energie po mergi](energy_consumption_pre_post_merge.png)

CCRI odhaduje, že Sloučení snížilo roční spotřebu elektřiny Etherea o více než **99,988 %**. Podobně se uhlíková stopa Etherea snížila o přibližně **99,992 %** (z 11 016 000 na 870 tun CO2e). Pro lepší představu se dá říci, že, snížení emisí je jako snížit výšku Eiffelovky na výšku malé plastové figurky, jak je znázorněno na obrázku výše. V důsledku toho se významně snižují ekologické náklady na zabezpečení sítě. Zároveň se předpokládá, že se zlepšilo zabezpečení sítě.

## Zelená vrstva aplikací {#green-applications}

Zatímco spotřeba energie Etherea je velmi nízká, existuje také významné, rostoucí a vysoce aktivní budování komunity [**regenerativního financování (ReFi)**](/refi/) na Ethereu. Aplikace ReFi využívají komponenty DeFi k vytváření finančních aplikací, které mají pozitivní externality prospívající životnímu prostředí. ReFi je součástí širšího ["solarpunkového"](https://en.wikipedia.org/wiki/Solarpunk) hnutí, které je úzce spjato s Ethereem a jehož cílem je propojit technologický pokrok s péčí o životní prostředí. Ethereum je decentralizované, bez vstupních bariér a připravené pro budování projektů, což z něj dělá ideální základní vrstvu pro komunity ReFi a Solarpunk.

Nativní platformy pro financování veřejných statků fungujících na principech web3, jako je [Gitcoin](https://gitcoin.co) mají i kola zaměřená na ochranu klimatu, díky čemuž stimulují ekologicky uvědomělý rozvoj na aplikační vrstvě Etherea. Prostřednictvím rozvoje těchto iniciativ (a dalších, např. [DeSci](/desci/)), se Ethereum stává environmentálně a sociálně pozitivní technologií.

<InfoBanner emoji=":evergreen_tree:">
  Pokud si myslíte, že by tato stránka mohla být přesnější, založze prosím issue nebo PR. Statistiky na této stránce jsou odhady založené na veřejně dostupných datech – nepředstavují oficiální prohlášení nebo příslib týmu ethereum.org nebo Ethereum Foundation.
</InfoBanner>

## Další informace {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Zpráva Bílého domu o proof-of-work blockchainech](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emise Etherea: Souhrnný odhad](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Merge - Dopady na spotřebu elektřiny a uhlíkovou stopu sítě Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Spotřeba energie Etherea](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Související témata {#related-topics}

- [Vize Etherea](/roadmap/vision/)
- [Beacon chain](/roadmap/beacon-chain)
- [Sloučení](/roadmap/merge/)
