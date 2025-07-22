---
title: Zvitki brez znanja
description: Uvod v zvitke brez znanja
lang: sl
---

## Predpogoji {#prerequisites}

Dobro morate razumeti vse temeljne teme in zelo dobro razumeti [razširljivosti Ethereum](/developers/docs/scaling/). Implementacija rešitev za razširljivost kot so zvitki je napredno področje, saj tehnologija v praksi še ni dovolj testirana in se še naprej raziskuje ter razvijana.

Iščete vire, ki so bolj primerni za začetnike? Oglejte si naš [uvod v plast 2](/layer-2/).

## Zvitki brez znanja {#zk-rollups}

**Zvitki brez znanja (ZK-zvitki)** združijo (oz. "zvijejo") stotine prenosov izven verige in ustvarijo kriptografski dokaz. Ti dokazi lahko nastanejo v obliki SNARK-ov (jedrnat neinteraktiven argument znanja) ali STARK-ov (razširljiv transparenten argument znanja). SNARK-i in STARK-i so znani kot dokazi o veljavnosti in se objavijo na plast 1.

Pametna pogodba ZK-zvitka vzdržuje stanje vseh prenosov na plasti 2 in to stanje je lahko posodobljeno le z dokazom o veljavnosti. To pomeni, da ZK-zvitki potrebujejo le dokaz o veljavnosti namesto vseh podatkov o transakciji. Z ZK-zvitkom je validacija bloka hitrejša in cenejša, saj je vključenih manj podatkov.

Pri ZK-zvitku ni zamud pri premikanju sredstev s plasti 2 na plast 1, saj je dokaz o veljavnosti, sprejet s strani pogodbe ZK-zvitka, sredstva že potrdil.

Glede na to, da so na plasti 2, so lahko ZK-zvitki optimizirani za nadaljnje zmanjšanje velikosti transakcij. Na primer, račun raje kot naslov predstavlja indeks, ki zmanjša transakcije z 32 na le 4 bajte. Transakcije so prav tako zapisane na Ethereum kot `calldata`, kar zmanjša gorivo.

### Prednosti in slabosti {#zk-pros-and-cons}

| Prednosti                                                                                                                   | Slabosti                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Hitrejši čas dokončnosti, glede na to da je stanje takoj potrjeno, ko so dokazi poslani na glavno verigo.                   | Nekateri nimajo podpore EVM.                                                                           |
| Niso ranljivi za ekonomske napade, za katere so lahko občutljivi [Optimistični zvitki](#optimistic-pros-and-cons).          | Dokazi o veljavnosti so intenzivni za računanje – ni vredno za aplikacije z malo aktivnosti na verigi. |
| Varni in decentralizirani, glede na to, da so podatki, potrebni za ponovno pridobitev stanja, shranjeni na plasti 1 verige. | Operater lahko vpliva na razvrščanje transakcij                                                        |

### Vizualna razlaga ZK-zvitkov {#zk-video}

Oglejte si, kako pri Finematics razložijo ZK-zvitke:

<YouTube id="7pWxCklcNsU" start="406" />

**Materiali za branje o ZK-zvitkih**

- [Kaj so zvitki brez znanja?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
