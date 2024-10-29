---
title: Optimistični zvitki
description: Uvod v optimistične zvitke
lang: sl
---

## Predpogoji {#prerequisites}

Dobro morate razumeti vse temeljne teme in zelo dobro razumeti [razširljivosti Ethereum](/developers/docs/scaling/). Implementacija rešitev za razširljivost kot so zvitki je napredno področje, saj tehnologija v praksi še ni dovolj testirana in se še naprej raziskuje ter razvijana.

Iščete vire, ki so bolj primerni za začetnike? Oglejte si naš [uvod v plast 2](/layer-2/).

## Optimistični zvitki {#optimistic-rollups}

Optimistični zvitki so vzporedno z glavno verigo Ethereum na plasti 2. Lahko ponudijo izboljšave pri razširljivosti, saj privzeto ne izvajajo nobenega računanja. Namesto tega, po transakciji, predlagajo novo stanje glavnemu omrežju ali "notarsko overijo" transakcijo.

Pri optimističnih zvitkih so transakcije zapisane na glavno verigo Ethereum kot `calldata`, kar jih še bolj optimizira s tem, da zniža ceno goriva.

Glede na to, da je računanje počasen in drag del uporabe Ethereuma, lahko optimistični zvitki ponudijo do 10- do 100-kratne izboljšave v razširljivosti transakcij. Ta številka se bo še bolj povečala s predstavitvijo [razdrobljenih verig](/roadmap/danksharding), saj bo v primeru, da je transakcija izpodbijana, na voljo več podatkov.

### Izpodbijanje transakcij {#disputing-transactions}

Optimistični zvitki transakcij ne računajo, tako da obstaja potreba po mehanizmu za zagotavljanje legitimnosti in negoljufivosti transakcij. Tukaj nastopijo odpori na prevare. Če nekdo opazi goljufivo transakcijo, bo zvitek izvedel odpor na prevare in računanje transakcije z uporabo razpoložljivih podatkov stanja. To pomeni, da bi za potrditev transakcije lahko čakali dalj časa kot pri ZK-zvitku, saj se transakcijo lahko izpodbija.

![Diagram, ki prikazuje dogajanje med tem, ko se zgodi zlonamerna transakcija v optimističnem zvitku na Ethereumu](./optimistic-rollups.png)

Gorivo, potrebno za izvedbo računanja odpora za prevare, je enakomerno povrnjeno. Ben Jones iz Optimisma opisuje uporabljen sistem povezovanja:

"_Kdorkoli, ki bi lahko izvedel dejanje, ki bi ga vi morali dokazati kot goljufivo, da bi zavarovali svoja sredstva, od vas zahteva, da zagotovite zavezo. V bistvu vzamete nekaj ETH in ga zaklenete ter rečete 'Hej, obljubim, da bom govoril resnico ...' Če ne govorim resnice in je prevara dokazana, bo ta denar razrezan. Ne le, da je nekaj tega denarja razrezanega, ampak ga bo nekaj tudi porabljenega za plačilo goriva, ki so ga ljudje porabili za izvedbo odpora na prevare._"

Torej lahko vidite spodbude: sodelujoči so kaznovani za izvajanje prevar in kompenzirani za dokazovanje prevar.

### Prednosti in slabosti {#optimistic-pros-and-cons}

| Prednosti                                                                                                                                  | Slabosti                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Karkoli lahko naredite na Ethereumovi plasti 1, lahko naredite z optimističnimi zvitki, glede na to, da so kompatibilni z EVM in Solidity. | Dolgi čakalni časi za transakcije na verigi zaradi potencialnih izpodbijanj prevar. |
| Vsi podatki o transakcijah so shranjeni na plasti 1 verige, kar pomeni, da so varne in decentralizirane.                                   | Operater lahko vpliva na razvrščanje transakcij.                                    |

### Vizualna razlaga optimističnih zvitkov {#optimistic-video}

Oglejte si, kako Finematics razložijo optimistične zvitke:

<YouTube id="7pWxCklcNsU" start="263" />

**Gradivo za branje o optimističnih zvitkih**

- [Ključni vodnik za Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Kako zares deluje zvitek Optimizma?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [Globoki vpogled v OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
