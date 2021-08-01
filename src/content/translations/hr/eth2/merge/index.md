---
title: Spajanje glavne mreže s nadogradnjom Eth2
description: Saznajte više o spajanju – pridruživanje glavne mreže Ethereum Proof of Stake sustavu koji koordinira Beacon Chain.
lang: hr
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "Na kraju će se trenutačna glavna mreža Ethereum „spojiti” s ostatkom nadogradnji Eth2.",
    "Spajanje će sjediniti glavnu mrežu „Eth1” s nadogradnjom Eth2 Beacon Chain i sustavom razdjeljivanja.",
    "Ovo će označiti kraj procesa Proof of Work za Ethereum i prijelaz na Proof of Stake.",
    "To vam može biti poznato kao „faza 1.5” na tehničkim planovima.",
  ]
---

<UpgradeStatus date="~2021/22">
    Ova nadogradnja uslijedit će nakon dolaska lanaca djelića. Ali to je trenutak u kojem se <a href="/eth2/vision/"> vizija nadogradnje Eth2 </a> u potpunosti ostvaruje – veća nadogradivost, sigurnost i održivost uz ulaganja koja podržavaju cijelu mrežu.
</UpgradeStatus>

## Što je spajanje? {#what-is-the-docking}

Važno je imati na umu da se u početku ostale nadogradnje Eth2 isporučuju odvojeno od [ glavne mreže ](/glossary/#mainnet) – lanca kojim se koristimo danas. Glavna mreža Ethereum i dalje biti osigurana pomoću mehanizma [Proof of Work ](/developers/docs/consensus-mechanisms/pow/), čak i dok [Beacon Chain](/eth2/beacon-chain/) i njegovi [lanci djelića](/eth2/shard-chains/) rade paralelno pomoću mehanizma [ Proof of Stake](/developers/docs/consensus-mechanisms/pos/). Spajanje je kad se ova dva sustava sjedine.

Zamislite da je Ethereum svemirski brod koji nije baš spreman za međuzvjezdano putovanje. Zajednica je s nadogradnjom Beacon chain i lancima djelića izgradila novi motor i očvrsnuti trup. Kad dođe vrijeme, trenutačni brod pristat će uz novi sustav i oni će postati jedno, spremni za ozbiljne svjetlosne godine i zauzimanje svemira.

## Spajanje s glavnom mrežom {#docking-mainnet}

Kad bude spremna, glavna mreža Ethereum spojit će se s nadogradnjom Beacon Chain, postajući vlastiti djelić koji upotrebljava Proof of Stake umjesto [ Proof of Work ](/developers/docs/consensus-mechanisms/pow/).

Glavna mreža omogućit će pokretanje pametnih ugovora u sustav Proof of Stake, i cijelu povijest i trenutačno stanje mreže Ethereum, kako bi se osigurao prijelaz bez problema za sve vlasnike i korisnike ETH-a.


<!-- ### Improving Mainnet

Before Mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Nakon spajanja {#after-the-docking}

To će označiti kraj mehanizma Proof of Work za Ethereum i početak održivijeg, ekološki prihvatljivijeg Ethereuma. U tom će trenutku Ethereum imati opseg, sigurnost i održivost koju istiće u svojoj [ viziji Eth2 ](/eth2/vision/).

## Odnos između nadogradnji {#relationship-between-upgrades}

Sve su nadogradnje Eth2 donekle međusobno povezane. Pa, sagledajmo kakav odnos spajanje ima s ostalim nadogradnjama.

### Sjedinjenje i Beacon Chain {#docking-and-beacon-chain}

Nakon spajanja, bit će dodijeljeni učesnici koji će provjeriti valjanost mreže Ethereum. Baš kao i s lancima djelića. [ Rudarenje ](/developers/docs/consensus-mechanisms/pow/mining/) više neće biti potrebno, pa će rudari svoju zaradu vjerojatno uložiti u učešća u novom sustavu Proof of Stake.<ButtonLink to="/eth2/beacon-chain/">Beacon Chain</ButtonLink>

### Spajanje i lanci djelića {#docking-and-shard-chains}

Kad glavna mreža postane djelić, uspješna implementacija lanaca djelića bit će presudna za ovu nadogradnju. Vjerojatno će tranzicija igrati važnu ulogu u pomaganju zajednici da odluči hoće li pokrenuti drugu nadogradnju na metodu razdjeljivanja. Ova će nadogradnja kreirati druge djeliće poput glavne mreže: oni će moći obrađivati transakcije i pametne ugovore, a ne samo pružati više podataka.<ButtonLink to="/eth2/shard-chains/">Lanci djelića</ButtonLink>
