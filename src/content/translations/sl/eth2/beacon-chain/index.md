---
title: Oddajniška veriga
description: Preberite več o oddajniški verigi – prvi večji nadgradnji Eth2 za Ethereum.
lang: sl
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "Oddajniška veriga ne spreminja ničesar glede Ethereuma, ki ga uporabljamo danes.",
    "Usklajevala bo omrežje.",
    "V ekosistem Ethereum uvaja dokaz o deležu.",
    'Oddajniško verigo morda poznate pod imenom "faza 0", ki se uporablja v tehničnih načrtih.',
  ]
---

<UpgradeStatus isShipped date="Odpremljeno!">
    Oddajniška veriga je začela delovati 1. decembra ob 12.00 UTC. Če želite več informacij, <a href="https://beaconscan.com/">raziščite podatke</a>. Če želite pomagati potrjevati verigo, lahko <a href="/eth2/staking/">zastavite svoj ETH</a>.
</UpgradeStatus>

## Kakšen je namen oddajniške verige? {#what-does-the-beacon-chain-do}

Oddajniška veriga bo izvajala in usklajevala razširjeno omrežje [drobcev](/eth2/shard-chains/) in [zastavljavcev](/eth2/staking/). Vendar ne bo podobna današnjemu [glavnem omrežju Ethereum](/glossary/#mainnet). Ne more obdelovati računov ali pametnih pogodb.

Vloga oddajniške verige se bo sčasoma spremenila, vendar je temeljni sestavni del [varnega, trajnostnega in nadgradljivega Ethereuma, ki ga želimo razviti](/eth2/vision/).

## Lastnosti oddajniške verige {#beacon-chain-features}

### Predstavljamo zastavljanje {#introducing-staking}

Oddajniška veriga bo v Ethereum uvedla [dokaz o deležu](/developers/docs/consensus-mechanisms/pos/). To bo nov način, na katerega boste lahko zaščitili Ethereum. Na to lahko lahko gledate kot na javno dobro, s katerim bo Ethereum v boljšem stanju, hkrati pa boste zaslužili še več ETH. V praksi bo to pomenilo, da boste zastavili ETH za aktiviranje programske opreme, ki jo uporabljajo validatorji. Kot validator boste obdelovali transakcije in ustvarjali nove bloke v verigi.

Zastavljanje in delovanje kot validator sta lažja kot [rudarjenje](/developers/docs/mining/) (to je način, s katerim je omrežje trenutno zaščiteno). Upamo, da bo Ethereum s tem dolgoročno postal bolj varen. Več ko ljudi sodeluje v omrežju, bolj decentralizirano in varno pred napadi bo postalo.

<InfoBanner emoji=":money_bag:">
Če vas zanima, da bi postali validator in pomagali zaščititi oddajniško verigo, <a href="/eth2/staking/">preberite več o zastavljanju</a>.
</InfoBanner>

To je tudi pomembna sprememba za drugo nadgradnjo Eth2: [razdrobljene verige](/eth2/shard-chains/).

### Priprava na razdrobljene verige {#setting-up-for-shard-chains}

Razdrobljene verige bodo druga nadgradnja Eth2. Povečale bodo zmogljivost omrežja in izboljšale hitrost transakcij z razširjanjem omrežja na 64 verig blokov. Oddajniška veriga je prvi pomemben korak k uvedbi razdrobljenih verig, saj za varno delovanje potrebujejo zastavljanje.

Sčasoma bo oddajniška veriga odgovorna tudi za naključno dodeljevanje zastavljavcev, ki bodo potrjevali razdrobljene verige. To je ključno, da se zastavljavcem oteži skrivno sodelovanje in prevzemanje nadzora nad drobcem. V bistvu pomeni, da so njihove možnosti za to [manjše od 1 na bilijon](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Nadgradnje Eth2 so vse delno medsebojno povezane. Povzemimo torej, kako oddajniška veriga vpliva na druge nadgradnje.

### Glavno omrežje in oddajniška veriga {#mainnet-and-beacon-chain}

Oddajniška veriga bo najprej obstajala ločeno od glavnega omrežja Ethereum, ki ga uporabljamo danes. Vendar bosta sčasoma povezana. Načrt je »spojiti« glavno omrežje s sistemom dokaza o deležu, ki ga nadzoruje in usklajuje oddajniška veriga.

<ButtonLink to="/eth2/merge/">Spojitev</ButtonLink>

### Drobci in oddajniška veriga {#shards-and-beacon-chain}

Razdrobljene verige lahko v ekosistem Ethereum varno vstopijo samo, ko je vključen mehanizem za doseganje soglasja z dokazom o deležu. Oddajniška veriga bo uvedla zastavljanje in tlakovala pot za nadgradnjo razdrobljenih verig, ki prihaja.

<ButtonLink to="/eth2/shard-chains/">Razdrobljene verige</ButtonLink>

<Divider />

## Interakcija z oddajniško verigo {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
