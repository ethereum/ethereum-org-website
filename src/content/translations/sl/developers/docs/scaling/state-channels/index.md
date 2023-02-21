---
title: Kanali stanja
description: Uvod v kanale stanja kot rešitev za razširljivost, ki jo trenutno uporablja skupnost Ethereum.
lang: sl
incomplete: true
sidebarDepth: 3
---

Kanali stanja sodelujočim omogočajo, da izvajajo transakcije izven verige `x`-krat, medtem ko na omrežju Ethereum oddajo le dve transakciji. To omogoča izjemno visoko pretočnost.

## Predpogoji {#prerequisites}

Dobro morate razumeti vse temeljne teme in zelo dobro razumeti [razširljivosti Ethereum](/developers/docs/scaling/). Implementacija rešitev za razširljivost, kot so kanali, je napredno področje, saj tehnologija v praksi še ni dovolj testirana ter se še naprej raziskuje in razvija.

## Kanali {#channels}

Sodelujoči morajo zakleniti del stanja Ethereum, recimo polog ETH, v večpodpisno pogodbo. Večpodpisna pogodba je vrsta pogodbe, ki za izvedbo zahteva podpisnike (torej soglasje) več ključev.

Ta način zaklepanja stanja predstavlja prvo transakcijo in odpre kanal. Sodelujoči lahko nato izvajajo transakcije izven verige hitro in prosto. Ko je transakcija zaključena, je na verigo oddana končna transakcija, kar odklene stanje.

**Uporabni za**:

- veliko posodobitev stanja,
- veliko vnaprej znanih sodelujočih,
- vedno dostopne sodelujoče.

Trenutno obstajata dve vrsti kanalov: kanali stanja in plačilni kanali.

## Kanali stanja {#state-channels}

Kanale stanja je morda najbolje razložiti s primerom, kot je igra križcev in krožcev:

1. Na glavni verigi Ethereum ustvarite večpodpisno pametno pogodbo "sodnika", ki razume pravila igre križcev in krožcev ter lahko identificira Alico in Boba kot dva igralca v naši igri. Ta pogodba hrani nagrade 1 ETH.

2. Nato Alica in Bob začneta z igro in s tem odpreta kanal stanja. Vsaka poteza ustvari transakcijo izven verige, ki vsebuje "enkratno vrednost", ki preprosto pomeni, da lahko pozneje vedno določimo vrstni red izvedenih potez.

3. Ob zmagi se kanal zapre s predložitvijo končnega stanja (torej seznama transakcij) pogodbi sodnika in plača le provizijo za eno transakcijo. Sodnik zagotovi, da sta to "končno stanje" podpisala oba sodelujoča, in počaka določen čas, da zagotovi, da nihče ne more legitimno izzvati rezultata, ter nato Alici izplača 1 ETH nagrade.

## Plačilni kanali {#payment-channels}

Poenostavljeni kanali stanja, ki se ukvarjajo le s plačili (torej prenosi ETH). Prenose med dvema sodelujočima izven verige omogočajo, dokler neto vsota njunih prenosov ne preseže položenih žetonov.

## Prednosti in slabosti {#channels-pros-and-cons}

| Prednosti                                                                     | Slabosti                                                                                                                                                        |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Takojšen dvig/poravnava na glavnem omrežju (če obe stranki kanala sodelujeta) | Čas in strošek vzpostavitve in poravnave kanala – ne najboljša za občasne enkratne transakcije med arbitrarnimi uporabniki.                                     |
| Mogoča je izjemno visoka pretočnost                                           | Obstaja potreba po periodičnem opazovanju omrežja (zahteva živahnosti) ali delegiranju te odgovornosti nekomu drugemu za zagotavljanje varnosti vaših sredstev. |
| Najnižji strošek na transakcijo – dobro za tokove mikroplačil                 | Sredstva je treba zakleniti v odprte plačilne kanale                                                                                                            |
|                                                                               | Ne podpira odprtega sodelovanja                                                                                                                                 |

## Uporaba kanalov stanja {#use-state-channels}

Več projektov zagotavlja implementacije kanalov stanj, ki jih lahko integrirate v svoje dappe:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Nadaljnje branje {#further-reading}

**Kanali stanja**

- [EthHub o kanalih stanja](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Smiselnost Ethereumovih rešitev za razširljivost s plastjo 2: kanali stanja, Plasma in Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12. februar 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 – Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Plačilni kanali**

- [EthHub o plačilnih kanalih](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Poznate vir iz skupnosti, ki vam je pomagal? Uredite to stran in ga dodajte!_
