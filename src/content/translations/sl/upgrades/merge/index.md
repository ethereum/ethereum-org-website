---
title: Spojitev
description: Preberite več o spojitvi – ko se bo glavno omrežje Ethereum pridružilo sistemu z dokazom o deležu, ki ga bo usklajevala oddajniška veriga.
lang: sl
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Sčasoma se bo trenutno glavno Ethereum omrežje "spojilo" s sistemom dokaza o deležu oddajniške verige.
summaryPoint2: To bo za Ethereum pomenilo konec sistema z dokazom o delu in popoln prehod na sistem dokaza o deležu.
summaryPoint3: Prehod je načrtovan pred uvedbo razdrobljenih verig.
summaryPoint4: Predhodno smo jo omenjali kot "priklop".
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Ta nadgradnja predstavlja uraden preklop na sistem soglasja z dokazom o deležu. Tako bomo odpravili potrebo po energetsko potratnem rudarjenju. Resnično vznemirljiv korak proti realizaciji <a href="/upgrades/vision/">Eth2 vizije</a> – več nadgradljivosti, varnosti in trajnosti.
</UpgradeStatus>

## Kaj je spojitev? {#what-is-the-docking}

Pomembno si je zapomniti, da na začetku [oddajniška veriga](/upgrades/beacon-chain/) deluje ločeno od [glavnega omrežja](/glossary/#mainnet) - verige, ki jo uporabljamo danes. Glavno omrežje Ethereum je še vedno zaščiteno z [dokazom o delu](/developers/docs/consensus-mechanisms/pow/), čeprav oddajniška veriga vzporedno deluje z uporabo [dokaza o deležu](/developers/docs/consensus-mechanisms/pos/). Spojitev predstavlja trenutek, ko se ta dva sistema končno združita.

Predstavljajte si, da je Ethereum vesoljska ladja, ki še ni povsem pripravljena na medzvezdno potovanje. Z oddajniško verigo je skupnost pripravila nov motor in bolj utrjen trup. Ko bo nastopil načrtovan trenutek, se bo trenutna ladja priklopila na ta nov sistem. Tako se bosta združila v eno ladjo, ki bo pripravljena, da prepotuje veliko svetlobnih let in zavzame vesolje.

## Spojitev z glavnim omrežjem {#docking-mainnet}

Ko bo vse pripravljeno, se bo glavno omrežje Ethereum spojilo z oddajniško verigo in postalo samostojen drobec, ki uporablja dokaz o deležu namesto [dokaza o delu](/developers/docs/consensus-mechanisms/pow/).

Glavno omrežje bo zagotavljalo možnost izvajanja pametnih pogodb v sistemu z dokazom o deležu ter tudi celotno zgodovino in trenutno stanje Ethereuma, kar bo zagotovilo brezhiben prehod za vse imetnike in uporabnike ETH.

## Po spojitvi {#after-the-merge}

To bo za Ethereum predstavljalo konec dokaza o delu in začetek obdobja bolj trajnostnega in okolju prijaznega Ethereuma. Na tej točki bo Ethereum korak bližje dosegu polnega obsega, varnosti in trajnosti, kot je predstavljeno v [Eth2 viziji](/upgrades/vision/).

Pomembno je omeniti, da je cilj spojitve preprostost z namenom pospešitve prehoda z dokaza o delu na dokaz o deležu. Razvijalci svoj trud usmerjajo v prehod in zmanjševanje dodatnih funkcij, ki bi lahko dodatno odložile dosego tega cilja.

**To pomeni, da bo moralo nekaj funkcij kot je možnost dviga zastavljenega ETH počakati, da se najprej zaključi spojitev.** Načrt po spojitvi vključuje nadgradnjo imenovano "čistka", ki bo namenjena tem funkcijam. Pričakuje se, da bo izvedena kmalu po zaključku spojitve.

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Nadgradnje Eth2 so vse delno medsebojno povezane. Torej povzemimo, kako spojitev vpliva na ostale nadgradnje.

### Spojitev in oddajniška veriga {#docking-and-beacon-chain}

Ko pride do spojitve, bodo zastavljalci zadolženi za potrjevanje glavnega omrežja Ethereum. [Rudarjenje](/developers/docs/consensus-mechanisms/pow/mining/) ne bo več potrebno, tako da bodo rudarji svoje zaslužke verjetno vložili v zastavljanje v novem sistemu z dokazom o deležu.

<ButtonLink to="/upgrades/beacon-chain/">Oddajniška veriga</ButtonLink>

### Spojitev in čistka po spojitvi {#merge-and-post-merge-cleanup}

Takoj po spojitvi nekatere funkcije kot je dvig zastavljenega ETH še ne bodo podprte. Te funkcionalnosti so načrtovane za nadgradnjo, ki bo sledila kmalu po spojitvi.

Bodite na tekočem z [blogom EF raziskave in razvoj](https://blog.ethereum.org/category/research-and-development/). Vsi bolj radovedni si lahko več pogledate v predstavitvi [Kaj se zgodi po spojitvi](https://youtu.be/7ggwLccuN5s?t=101), ki jo je Vitalik predstavil na dogodku ETHGlobal aprila 2021.

### Spojitev in razdrobljene verige {#docking-and-shard-chains}

Začetni načrt je delo na razdrobljenih verigah predvideval pred spojitvijo – da bi naslovili nadgradljivost. Z razcvetom [ rešitev za nadgradljivost na podlagi tehnologije 2. plasti](/developers/docs/scaling/#layer-2-scaling), se je prioriteta preusmerila na menjavo dokaza o delu za dokaz o deležu prek spojitve.

Skupnost bo sprotno ocenjevala potencialno potrebo po več krogih razdrobljenih verig, da bi lahko omogočili neskončno nadgradljivost.

<ButtonLink to="/upgrades/sharding/">Razdrobljene verige</ButtonLink>
