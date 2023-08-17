---
title: Plasma verige
description: Uvod v plasma verige kot rešitev za razširljivost, ki jo trenutno uporablja skupnost Ethereum.
lang: sl
incomplete: true
sidebarDepth: 3
---

Plasma veriga je ločena blokovna veriga, ki je zasidrana na glavno verigo Ethereum in uporablja dokazila o prevarah (kot [optimistični zvitki](/developers/docs/scaling/optimistic-rollups/)) za reševanje sporov. Te verige se včasih naslavlja kot "otroške" verige, saj so v bistvu manjše kopije glavne verige Ethereum. Drevesa Merkle omogočajo ustvarjanje brezmejnih skladov teh verig, ki lahko delajo za razbremenitev pasovne širine starševskih verig (vključno z glavnim omrežjem). Te svojo varnost izpeljejo prek [odporov na prevare](/glossary/#fraud-proof) in vsaka otroška veriga ima svoj lasten mehanizem za potrjevanje blokov.

## Predpogoji {#prerequisites}

Dobro morate razumeti vse temeljne teme in zelo dobro razumeti [razširljivosti Ethereum](/developers/docs/scaling/). Implementacija rešitev za razširljivost, kot je Validium, je napredno področje, saj tehnologija v praksi še ni dovolj testirana ter se še naprej raziskuje in razvija.

## Prednosti in slabosti {#pros-and-cons}

| Prednosti                                                                                                                                | Slabosti                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visoka pretočnost, nizki stroški na transakcijo.                                                                                         | Ne podpira splošnega računanja. Prek temeljne logike so podprti le osnovni prenosi žetonov, menjave in nekaj drugih tipov transakcij.                               |
| Dobro za transakcije med arbitrarnimi uporabniki (brez dodatnih stroškov na uporabniški par, če sta oba vzpostavljena na plasma verigi). | Obstaja potreba po periodičnem opazovanju omrežja (zahteva živahnosti) ali delegiranju te odgovornosti nekomu drugemu za zagotavljanje varnosti vaših sredstev.     |
|                                                                                                                                          | Za shranjevanje podatkov in serviranje teh na zahtevo se zanaša na enega ali več operaterjev.                                                                       |
|                                                                                                                                          | Za omogočanje izzivov so dvigi zamaknjeni za nekaj dni. Za zamenljiva sredstva se to lahko omili s ponudniki likvidnosti, vendar pri tem obstaja kapitalni strošek. |

### Uporaba Plasme {#use-plasma}

Več projektov zagotavlja implementacije Plasme, ki jo lahko integrirate v svoje dappe:

- [Omrežje OMG](https://omg.network/)
- [Polygon](https://polygon.technology/) (prej omrežje Matic)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Nadaljnje branje {#further-reading}

- [Učenje Plasme](https://www.learnplasma.org/en/)

_Poznate vir iz skupnosti, ki vam je pomagal? Uredite to stran in ga dodajte!_
