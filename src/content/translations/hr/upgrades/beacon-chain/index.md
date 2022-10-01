---
title: Beacon Chain
description: Saznajte više o nadogradnji Beacon Chain – prvoj velikoj nadogradnji Eth2 za Ethereum.
lang: hr
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: Beacon Chain ne mijenja ništa o Ethereumu kojim se koristimo danas.
summaryPoint2: Koordinirat će mrežu.
summaryPoint3: On predstavlja proof-of-stake u Ethereumovom ekosustavu.
summaryPoint4: To možete prepoznati kao „Fazu 0” na tehničkom planu.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    Beacon Chain poslan je 1. prosinca u podne (UTC). Za više informacija <a href="https://beaconscan.com/">proučite podatke</a>. Ako želite pomoći u validaciji lanca, možete <a href="/staking/"> uložiti svoj ETH </a>.
</UpgradeStatus>

## Što radi Beacon Chain? {#what-does-the-beacon-chain-do}

Beacon Chain će dirigirati ili uskladiti proširenu mrežu [ djelića](/upgrades/sharding/) i [učesnika](/staking/). Ali neće biti kao današnja [glavna mreža Ethereum](/glossary/#mainnet). Ne podržava račune ili pametne ugovore.

Beacon Chain će tijekom vremena mijenjati ulogu, međutim to je temeljna komponenta za [siguran, održiv i nadogradiv Ethereum na kojem radimo](/upgrades/vision/).

## Beacon Chain – značajke {#beacon-chain-features}

### Osnove ulaganja {#introducing-staking}

Beacon Chain će predstaviti [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) Ethereumu. Ovo je novi način da pomognete održati Ethereum sigurnim. Shvatite to kao javno dobro koje će Ethereum učiniti zdravijim i zaraditi vam više ETH-a u procesu. U praksi, to će uključiti vaše ulaganje ETH-a kako biste aktivirali softver za validaciju. Kao validator, obrađivat ćete transakcije i stvarati nove blokove u lancu.

Ulagati i postati validator, jednostavnije je od [rudarenja](/developers/docs/mining/) (kako je mreža trenutačno zaštićena). Postoji nada da će to dugoročno pomoći da Ethereum bude sigurniji. Što više ljudi sudjeluje u mreži, to će ona biti decentraliziranija i sigurnija od napada.

<InfoBanner emoji=":money_bag:">
Ako ste zainteresirani za validiranje i pomoć u osiguranju za Beacon Chain, <a href="/staking/"> saznajte više o sudjelovanju</a>.
</InfoBanner>

Ovo je također važna promjena za drugu nadogradnju Eth2: [lanci djelića](/upgrades/sharding/).

### Postavljanje lanaca djelića {#setting-up-for-shard-chains}

Lanci djelića bit će druga nadogradnja Eth2. Povećat će kapacitet mreže i poboljšati brzinu transakcija proširenjem mreže na 64 blok-lanca. Beacon Chain je važan prvi korak u uvođenju lanaca djelića, jer im je za siguran rad potreban ulog.

Na kraju će i Beacon Chain biti odgovoran za nasumično dodjeljivanje učesnika za validaciju lanaca djelića. To je ključno za otežavanje učesnicima da budu u dosluhu i da preotmu djelić. Dakle, to znači da im je šansa [ manja od 1 u trilijun](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Odnos između nadogradnji {#relationship-between-upgrades}

Sve nadogradnje Eth2 donekle su međusobno povezane. Dakle, ponovimo ukratko kako Beacon Chain utječe na ostale nadogradnje.

### Glavna mreža i Beacon Chain {#mainnet-and-beacon-chain}

Beacon Chain će u početku postojati odvojeno od glavne mreže Ethereum mreže kojom se koristimo danas. Ali će na kraju će biti povezani. Plan je spojiti glavnu mrežu u sustav proof-of-stake koji kontrolira i koordinira Beacon Chain.

<ButtonLink to="/upgrades/merge/">Spajanje</ButtonLink>

### Djelići i Beacon Chain {#shards-and-beacon-chain}

Lanci djelića mogu sigurno ući u Ethereumov ekosustav samo ako je uspostavljen mehanizam konsenzusa proof-of-stake. Beacon Chain predstavit će ulaganje, radeći put za nadogradnju lanca djelića.

<ButtonLink to="/upgrades/sharding/">Lanci djelića</ButtonLink>

<Divider />

## Beacon Chain – interakcija {#interact-with-beacon-chain}

<BeaconChainActions />
