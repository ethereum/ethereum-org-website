---
title: Mnyororo wa Beacon
description: Jifunze kuhusu Mnyororo wa Beacon - sasisho lililoanzisha Uthibitisho wa Dau kwenye Ethereum.
lang: sw
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "Mnyororo wa Beacon ulianzisha Uthibitisho wa Dau (PoS) kwenye mfumo wa ikolojia wa Ethereum."
  - "Uliunganishwa na mnyororo wa asili wa Uthibitisho wa Kazi wa Ethereum mnamo Septemba 2022."
  - "Mnyororo wa Beacon ulianzisha mantiki ya mwafaka na itifaki ya usambazaji wa kitalu ambayo sasa inalinda Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Mnyororo wa Beacon ulizinduliwa mnamo Desemba 1, 2020, na kurasimisha Uthibitisho wa Dau (PoS) kama utaratibu wa makubaliano wa Ethereum kupitia sasisho la Unganisho mnamo Septemba 15, 2022.
</UpgradeStatus>

## Mnyororo wa Beacon ni nini? {#what-is-the-beacon-chain}

Mnyororo wa Beacon ni jina la mnyororo wa vitalu wa asili wa Uthibitisho wa Dau (PoS) uliozinduliwa mwaka 2020. Uliundwa ili kuhakikisha mantiki ya mwafaka ya Uthibitisho wa Dau ilikuwa thabiti na endelevu kabla ya kuiwezesha kwenye Mtandao Mkuu wa [Ethereum](/). Kwa hivyo, ulifanya kazi sambamba na Ethereum ya asili ya Uthibitisho wa Kazi (PoW). Mnyororo wa Beacon ulikuwa mnyororo wa vitalu 'vitupu', lakini kuzima Uthibitisho wa Kazi na kuwasha Uthibitisho wa Dau kwenye Ethereum kulihitaji kuuelekeza Mnyororo wa Beacon kukubali data ya muamala kutoka kwa wateja wa tabaka la utekelezaji, kuikusanya kwenye vitalu na kisha kuipanga kwenye mnyororo wa vitalu kwa kutumia utaratibu wa makubaliano unaotegemea Uthibitisho wa Dau. Wakati huo huo, wateja wa asili wa Ethereum walizima uchimbaji wao, usambazaji wa kitalu na mantiki ya mwafaka, na kukabidhi yote hayo kwa Mnyororo wa Beacon. Tukio hili lilijulikana kama [Unganisho](/roadmap/merge/). Baada ya Unganisho kutokea, hakukuwa tena na minyororo miwili ya vitalu. Badala yake, kulikuwa na Ethereum moja tu ya Uthibitisho wa Dau, ambayo sasa inahitaji wateja wawili tofauti kwa kila nodi. Mnyororo wa Beacon sasa ni tabaka la mwafaka, mtandao wa rika-kwa-rika wa wateja wa mwafaka unaoshughulikia usambazaji wa kitalu na mantiki ya mwafaka, huku wateja wa asili wakiunda tabaka la utekelezaji, ambalo linawajibika kwa kusambaza na kutekeleza miamala, na kusimamia hali ya Ethereum. Matabaka haya mawili yanaweza kuwasiliana kwa kutumia Engine API.

## Mnyororo wa Beacon unafanya nini? {#what-does-the-beacon-chain-do}

Mnyororo wa Beacon ni jina lililopewa leja ya akaunti iliyoendesha na kuratibu mtandao wa [waweka dhamana](/staking/) wa Ethereum kabla ya waweka dhamana hao kuanza kuthibitisha vitalu halisi vya Ethereum. Hata hivyo, hauchakati miamala au kushughulikia mwingiliano wa mkataba mahiri kwa sababu hilo linafanywa katika tabaka la utekelezaji.
Mnyororo wa Beacon unawajibika kwa mambo kama vile kushughulikia kitalu na uthibitisho, kuendesha algoriti ya kuchagua mchepuko, na kusimamia zawadi na adhabu.
Soma zaidi kwenye [ukurasa wetu wa usanifu wa nodi](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Athari za Mnyororo wa Beacon {#beacon-chain-features}

### Kuanzisha uwekaji dhamana {#introducing-staking}

Mnyororo wa Beacon ulianzisha [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/) kwenye Ethereum. Hii huweka Ethereum salama na kuwapatia wathibitishaji ETH zaidi katika mchakato huo. Katika uhalisia, uwekaji dhamana unahusisha kuweka dhamana ya ETH ili kuwezesha programu ya mthibitishaji. Kama mweka dhamana, unaendesha programu inayounda na kuthibitisha vitalu vipya kwenye mnyororo.

Uwekaji dhamana unatumika kwa madhumuni sawa na yale ambayo [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/) ulikuwa ukiyafanya, lakini ni tofauti kwa njia nyingi. Uchimbaji ulihitaji matumizi makubwa ya awali kwa njia ya vifaa vyenye nguvu na matumizi ya nishati, na kusababisha unafuu wa gharama kutokana na ukubwa, na kukuza uwekaji kati. Uchimbaji pia haukuja na hitaji lolote la kufungia rasilimali kama dhamana, na hivyo kupunguza uwezo wa itifaki wa kuwaadhibu watendaji wabaya baada ya shambulio.

Mabadiliko kuelekea kwenye Uthibitisho wa Dau yaliifanya Ethereum kuwa salama zaidi na iliyogatuliwa ikilinganishwa na Uthibitisho wa Kazi. Kadiri watu wengi wanavyoshiriki kwenye mtandao, ndivyo unavyozidi kuwa uliogatuliwa na salama dhidi ya mashambulizi.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Ikiwa una nia ya kuwa mthibitishaji na kusaidia kulinda Ethereum, [jifunze zaidi kuhusu uwekaji dhamana](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Kujiandaa kwa ajili ya shadi {#setting-up-for-sharding}

Tangu Mnyororo wa Beacon ulipounganishwa na Mtandao Mkuu wa asili wa Ethereum, jamii ya Ethereum ilianza kuangalia jinsi ya kuongeza uwezo wa mtandao.

Uthibitisho wa Dau una faida ya kuwa na sajili ya wazalishaji wote wa kitalu walioidhinishwa wakati wowote, kila mmoja akiwa na ETH iliyowekwa dhamana. Sajili hii inaweka msingi wa uwezo wa kugawanya na kutawala lakini kwa kutegemewa kugawanya majukumu maalum ya mtandao.

Jukumu hili ni tofauti na Uthibitisho wa Kazi, ambapo wachimbaji hawana wajibu kwa mtandao na wangeweza kuacha kuchimba na kuzima programu zao za nodi moja kwa moja kwa muda mfupi bila madhara yoyote. Pia hakuna sajili ya wapendekezaji wa kitalu wanaojulikana na hakuna njia ya kutegemewa ya kugawanya majukumu ya mtandao kwa usalama.

[Zaidi kuhusu shadi](/roadmap/danksharding/)

## Uhusiano kati ya masasisho {#relationship-between-upgrades}

Masasisho yote ya Ethereum yanahusiana kwa kiasi fulani. Kwa hivyo hebu tujikumbushe jinsi Mnyororo wa Beacon unavyoathiri masasisho mengine.

### Mnyororo wa Beacon na Unganisho {#merge-and-beacon-chain}

Mwanzoni, Mnyororo wa Beacon ulikuwepo kando na Mtandao Mkuu wa Ethereum, lakini iliunganishwa mwaka wa 2022.

<ButtonLink href="/roadmap/merge/">
  Unganisho
</ButtonLink>

### Shadi na Mnyororo wa Beacon {#shards-and-beacon-chain}

Shadi inaweza tu kuingia kwa usalama kwenye mfumo wa ikolojia wa Ethereum kukiwa na utaratibu wa makubaliano wa Uthibitisho wa Dau. Mnyororo wa Beacon ulianzisha uwekaji dhamana, ambao 'uliunganishwa' na Mtandao Mkuu, na kufungua njia kwa shadi kusaidia zaidi kuongeza uwezo wa Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Minyororo ya shadi
</ButtonLink>

## Kusoma zaidi {#further-reading}

- [Zaidi kuhusu usanifu wa nodi](/developers/docs/nodes-and-clients/node-architecture)
- [Zaidi kuhusu Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos)