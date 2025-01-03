---
title: Validium
description: Uvod v Validium kot rešitev za razširljivost, ki jo trenutno uporablja skupnost Ethereum.
lang: sl
incomplete: true
sidebarDepth: 3
---

Uporablja dokaze o veljavnosti, kot so [ZK-zvitki](/developers/docs/scaling/zk-rollups/), vendar podatki niso shranjeni na glavni plasti 1 verige Ethereum. To lahko pripelje do 10 000 transakcij na sekundo na verigo Validium, prav tako pa lahko vzporedno deluje več verig.

## Predpogoji {#prerequisites}

Dobro morate razumeti vse temeljne teme in zelo dobro razumeti [razširljivosti Ethereum](/developers/docs/scaling/). Implementacija rešitev za razširljivost, kot je Validium, je napredno področje, saj tehnologija v praksi še ni dovolj testirana ter se še naprej raziskuje in razvija.

## Prednosti in slabosti {#pros-and-cons}

| Prednosti                                                                                                                                       | Slabosti                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brez zamud pri dvigih (brez latence za transakcije na in med verigami); posledično odlična kapitalska učinkovitost.                             | Omejena podpora za splošno računanje/pametne pogodbe; potrebni so specializirani jeziki.                                                                               |
| Ni ranljiv za določene ekonomske napade, s katerimi se soočajo sistemi, ki temeljijo na varnosti pred napadi pri aplikacijah visokih vrednosti. | Za generiranje ZK-dokazov je potrebna visoka količina računske moči; ni stroškovno učinkovito za aplikacije z nizko pretočnostjo.                                      |
|                                                                                                                                                 | Počasnejši čas subjektivne dokončnosti (od 10 do 30 minut za generiranje ZK-dokaza) (vendar hitrejši čas do polne dokončnosti, saj ni časovnega zamika zaradi sporov). |
|                                                                                                                                                 | Generiranje dokaza zahteva, da so podatki izven verige vedno dostopni.                                                                                                 |

### Uporaba Validiuma {#use-validium}

Več projektov zagotavlja implementacije Validiuma, ki jih lahko integrirate v svoje dappe:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Nadaljnje branje {#further-reading}

- [Validium in Plast 2 dve-krat-dve — izdaja št. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Poznate vir iz skupnosti, ki vam je pomagal? Uredite to stran in ga dodajte!_
