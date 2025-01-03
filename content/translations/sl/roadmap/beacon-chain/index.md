---
title: Oddajniška veriga
description: Več informacij o oddajniški verigi – nadgradnji, s katero je bil uveden Ethereum z dokazom o deležu.
lang: sl
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoint1: Oddajniška veriga je v Ethereumovo okolje vpeljala dokaz o deležu.
summaryPoint2: Z izvirno Ethereumovo verigo, ki je uporabljala dokaz o delu, je bila spojena septembra 2022.
summaryPoint3: Oddajniška veriga je vpeljala protokol z logiko za doseganje soglasja in blokiranja lažnih govoric, ki zdaj ščiti Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Oddajniška veriga je začela delovati 1. decembra 2020 in je formalizirala dokaz o deležu kot Ethereumov mehanizem za doseganje soglasja ob spojitvi 15. septembra 2022.
</UpgradeStatus>

## Kaj je bila oddajniška veriga? {#what-is-the-beacon-chain}

Oddajniška veriga se je imenovala izvirna veriga blokov z mehanizmom dokaza o deležu, ki je začela delovati leta 2020. Ustvarili smo jo, da bi preverili, ali je mehanizem za doseganje soglasja z dokazom o deležu ustrezen in vzdržen, preden bi ga omogočili v glavnem Ethereumovem omrežju. Zaradi tega je delovala vzporedno z izvirnim Ethereumovim omrežjem z dokazom o delu. Za izklop mehanizma z dokazom o delu in vklop mehanizma z dokazom o deležu v Ethereumovem omrežju smo morali oddajniški verigi ukazati, da sprejema transakcije z izvirne Ethereumove verige, združiti te transakcije v bloke in jih razvrstiti v verigo blokov z mehanizmom za doseganje soglasja z dokazom o deležu. V istem trenutku so izvirni Ethereumovi odjemalci prenehali z rudarjenjem, posredovanjem blokov in logiko za doseganje soglasja ter jih predali oddajniški verigi. Ta dogodek se imenuje [spojitev](/roadmap/merge/). Ko je prišlo do spojitve, ni bilo več dveh verig blokov. Obstajala je le še ena Ethereumova veriga z dokazom o deležu.

## Kaj je naredila oddajniška veriga? {#what-does-the-beacon-chain-do}

Z oddajniško verigo je bila poimenovana glavna knjiga računov, s katero se je usmerjalo in koordiniralo omrežje Ethereumovih [zastavljavcev](/staking/), preden so ti začeli preverjati resnične Ethereumove transakcije. Ni obdelovala transakcij ali upravljala interakcij s pametnimi pogodbami.

Uvedla je mehanizem za doseganje soglasja (ali "plast soglasja"), ki je zamenjalo Ethereumovo rudarjenje po mehanizmu z dokazom o delu, in tako prinesla številne izboljšave.

Oddajniška veriga je bila temeljni del [varnega, okolju prijaznega in prilagodljivega Ethereuma, kot ga poznamo danes](/roadmap/vision/).

## Vpliv oddajniške verige {#beacon-chain-features}

### Vpeljava zastavljanja {#introducing-staking}

Oddajniška veriga je v Ethereum vpeljala mehanizem [dokaza o deležu](/developers/docs/consensus-mechanisms/pos/). Ta ščiti Ethereum in omogoča validatorjem, da v postopku zaslužijo več ETH. V praksi to pomeni, da je treba za aktiviranje programske opreme za validacijo zastaviti ETH. Kot zastavljavec poganjate programsko opremo, ki ustvarja in validira nove bloke v verigi.

Zastavljanje deluje podobno, kot je prej [rudarjenje](/developers/docs/consensus-mechanisms/pow/mining/), vendar je drugačno. Rudarjenje je zahtevalo veliko predhodno investicijo v obliki zmogljive strojne opreme in porabe energije. Posledici sta bili ekonomija obsega in spodbujanje centralizacije. Rudarjenje prav tako ni vključevalo zahteve po zamrznitvi sredstev kot jamstva, kar je omejevalo možnosti prokotola, da kaznuje storilce po napadu.

S prehodom na mehanizem dokaza o deležu je Ethereum postal občutno varnejši in bolj decentraliziran v primerjavi z mehanizmom dokaza o delu. Več ljudi kot sodeluje v omrežju, bolj decentralizirano in varno pred napadi postane.

<InfoBanner emoji=":money_bag:">
  Če želite postati validator in pomagati pri zaščiti Ethereuma, <a href="/staking/">preberite več o zastavljanju</a>.
</InfoBanner>

### Priprava na razdrobitev {#setting-up-for-sharding}

Odkar se je oddajniška veriga spojila z izvirnim Ethereumovim omrežjem, si Ethereumova skupnost prizadeva razširiti omrežje.

Mehanizem dokaza o deležu ima to prednost, da ima v vsakem trenutku register vseh odobrenih ustvarjalcev blokov in njihove zastavljene deleže ETH. Ta register omogoča postopek deljenja in vladanja, s katerim zanesljivo razdeli določene odgovornosti v omrežju.

Ta odgovornost je drugačna kot mehanizem dokaza o delu, kjer rudarji niso odgovorni omrežju. Tako lahko kadarkoli in brez posledic trajno prenehajo z rudarjenjem in izklopijo programsko opremo vozlišča. Pri tem mehanizmu prav tako ni registra znanih ustvarjalcev blokov niti zanesljivega načina za varno razdelitev odgovornosti v omrežju.

[Več o razdrobitvi](/roadmap/danksharding/)

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Vse nadgradnje Ethereuma so med seboj delno povezane. Povzemimo torej, kako oddajniška veriga vpliva na druge nadgradnje.

### Oddajniška veriga in spojitev {#merge-and-beacon-chain}

Oddajniška veriga je najprej delovala neodvisno od Ethereumovega glavnega omrežja, vendar sta se leta 2022 spojila.

<ButtonLink href="/roadmap/merge/">
  Spojitev
</ButtonLink>

### Drobci in oddajniška veriga {#shards-and-beacon-chain}

Razdrobitev je mogoče v Ethereumovo okolje varno uvesti le, ko je vpeljan mehanizem za doseganje soglasja z dokazom o deležu. Oddajniška veriga je vpeljala zastavljanje, ki se je "spojilo" z glavnim omrežem in tlakovalo pot razdrobitvi, ki bo pomagala pri širitvi Ethereumovega omrežja.

<ButtonLink href="/roadmap/danksharding/">
  Razdrobljene verige
</ButtonLink>

## Dodatno branje

- [Več o prihodnjih nadgradnjah Ethereuma](/roadmap/vision)
- [Več o dokazu o deležu](/developers/docs/consensus-mechanisms/pos)
