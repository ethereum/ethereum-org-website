---
title: Beacon chain
description: Jifunze juu ya Mnyororo Kioleza - Kisasisho kilichoanzishwa na Ethereum ya uthibitisho-wa-hisa.
lang: sw
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Mnyororo Kioleza ulianzisha uthibitisho-wa-hisa kwa mfumo wa ikolojia wa Ethereum.
summaryPoint2: Uliunganishwa na mnyororo asilia wa uthibitishaji-wa-kazi wa Ethereum mnamo Septemba 2022.
summaryPoint3: Mnyororo Kioleza ulianzisha mantiki ya makubaliano na itifaki ya uvumi wa bloku ambayo sasa inalinda Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Mnyororo Kioleza ulizinduliwa mnamo Desemba 1, 2020, na kurasimisha uthibitisho-wa-hisa kama utaratibu wa makubaliano wa Ethereum kwa sasisho la Muungano mnamo Septemba 15, 2022.
</UpgradeStatus>

## Mnyororo Kioleza ni nini? {#what-is-the-beacon-chain}

Mnyororo Kioleza ni jina la mnyororo wa bloku asilia wa uthibitisho-wa-hisa uliyozinduliwa mnamo 2020. Uliundwa ili kuhakikisha mantiki ya makubaliano ya uthibitisho-wa-hisa ilikuwa thabiti na endelevu kabla ya kuiwezesha kwenye Mtandao Mkuu wa Ethereum. Kwa hivyo, uliendeshwa sambamba na Ethereum asilia ya uthibitishaji-wa-kazi. Mnyororo Kioleza ulikuwa mnyororo wa bloku 'tupu', lakini kuzima uthibitishaji-wa-kazi na kuwasha uthibitisho-wa-hisa kwenye Ethereum kulihitaji kuuelekeza Mnyororo Kioleza kukubali data za miamala kutoka kwa programu za utekelezaji, kuzikusanya katika bloku na kisha kuzipanga kuwa mnyororo wa bloku kwa kutumia utaratibu wa makubaliano unaotegemea uthibitisho-wa-hisa. Wakati huo huo, wateja asilia wa Ethereum walizima uchimbaji wao, uenezaji wa bloku na mantiki ya makubaliano, na kukabidhi yote hayo kwa Mnyororo Kioleza. Tukio hili lilijulikana kama [Muungano](/roadmap/merge/). Mara tu Muungano ulipotokea, hakukuwa tena na minyororo miwili ya bloku. Badala yake, kulikuwa na Ethereum moja tu ya uthibitisho-wa-hisa, ambayo sasa inahitaji wateja wawili tofauti kwa kila nodi. Mnyororo Kioleza sasa ni safu ya makubaliano, mtandao wa rika-kwa-rika wa wateja wa makubaliano ambao hushughulikia uvumi wa bloku na mantiki ya makubaliano, huku wateja asilia wakiunda safu ya utekelezaji, ambayo inawajibika kwa uvumi na utekelezaji wa miamala, na kudhibiti hali ya Ethereum. Safu hizi mbili zinaweza kuwasiliana kwa kutumia Engine API.

## Myororo wa Kioleza ni nini? {#what-does-the-beacon-chain-do}

Mnyororo Kioleza ni jina lililopewa leja ya akaunti iliyoendesha na kuratibu mtandao wa [waweka hisa](/staking/) wa Ethereum kabla ya waweka hisa hao kuanza kuthibitisha bloku halisi za Ethereum. Hata hivyo, haichakati miamala wala kushughulikia mwingiliano wa mikataba-erevu kwa sababu hilo linafanywa katika safu ya utekelezaji.
Mnyororo Kioleza unawajibika kwa mambo kama vile kushughulikia bloku na uthibitishaji, kuendesha algoriti ya kuchagua uma, na kudhibiti zawadi na adhabu.
Soma zaidi kwenye [ukurasa wetu wa usanifu wa nodi](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Athari za Mnyororo Kioleza {#beacon-chain-features}

### Utangulizi wa kusimamisha {#introducing-staking}

Mnyororo Kioleza ulianzisha [uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos/) kwa Ethereum. Hii huiweka Ethereum salama na huwapatia wathibitishaji ETH zaidi katika mchakato huo. Kiutendaji, kusimamisha kunahusisha kusimamisha ETH ili kuwezesha programu ya mthibitishaji. Kama mweka hisa, unaendesha programu ambayo huunda na kuthibitisha bloku mpya katika mnyororo.

Kusimamisha hutumikia madhumuni sawa na yale ambayo [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/) ulivyokuwa ukitumika, lakini ni tofauti kwa njia nyingi. Uchimbaji ulihitaji matumizi makubwa ya awali katika mfumo wa maunzi yenye nguvu na matumizi ya nishati, na kusababisha uchumi wa kiwango, na kukuza umilikaji wa kati. Uchimbaji pia haukuja na hitaji lolote la kufungia mali kama dhamana, na kupunguza uwezo wa itifaki kuwaadhibu wahusika wabaya baada ya shambulio.

Mpito kuelekea uthibitisho-wa-hisa uliifanya Ethereum kuwa salama zaidi na yenye ugatuaji mkubwa ikilinganishwa na uthibitishaji-wa-kazi. Kadiri watu wengi wanavyoshiriki katika mtandao, ndivyo unavyozidi kuwa na ugatuaji na salama dhidi ya mashambulizi.

<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Ikiwa una nia ya kuwa mthibitishaji na kusaidia kulinda Ethereum, [jifunze zaidi kuhusu kusimamisha](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Kuweka mipangilio kwa ajili ya ugawanyaji {#setting-up-for-sharding}

Tangu Mnyororo Kioleza ulipoungana na Mtandao Mkuu asilia wa Ethereum, jumuiya ya Ethereum ilianza kutafuta njia za kuongeza ukubwa wa mtandao.

Uthibitisho-wa-hisa una faida ya kuwa na sajili ya wazalishaji wote wa bloku walioidhinishwa wakati wowote, kila mmoja akiwa na ETH kama hisa. Sajili hii inaandaa jukwaa la uwezo wa kugawanya na kutawala lakini kwa uhakika inagawanya majukumu maalum ya mtandao.

Wajibu huu ni kinyume na uthibitishaji-wa-kazi, ambapo wachimbaji hawana wajibu kwa mtandao na wanaweza kuacha uchimbaji na kuzima programu zao za nodi kabisa papo hapo bila matokeo yoyote. Pia hakuna sajili ya wapendekezaji wa bloku wanaojulikana na hakuna njia ya kuaminika ya kugawanya majukumu ya mtandao kwa usalama.

[Zaidi kuhusu ugawanyaji](/roadmap/danksharding/)

## Uhusiano kati ya masasisho {#relationship-between-upgrades}

Visasisho vyote vya Eth2 vinahusiana kwa kiasi fulani. Basi hebu tukumbushe jinsi mnyororo wa Beacon(Kioleza) unavyoathiri visasisho vingine.

### Mnyororo Kioleza na Muungano {#merge-and-beacon-chain}

Hapo awali, Mnyororo Kioleza ulikuwepo kando na Mtandao Mkuu wa Ethereum, lakini viliunganishwa mnamo 2022.

<ButtonLink href="/roadmap/merge/">
  Muungano
</ButtonLink>

### Vigawe na Mnyororo Kioleza {#shards-and-beacon-chain}

Ugawanyaji unaweza kuingia kwa usalama tu katika mfumo wa ikolojia wa Ethereum kukiwa na utaratibu wa makubaliano wa uthibitisho-wa-hisa. Mnyororo Kioleza ulianzisha kusimamisha, ambayo 'iliunganishwa' na Mtandao Mkuu, na kuandaa njia kwa ajili ya ugawanyaji kusaidia kuongeza zaidi ukubwa wa Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Minyororo ya Vigawe
</ButtonLink>

## Masomo Zaidi

- [Zaidi kuhusu usanifu wa nodi](/developers/docs/nodes-and-clients/node-architecture)
- [Zaidi kuhusu uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos)
