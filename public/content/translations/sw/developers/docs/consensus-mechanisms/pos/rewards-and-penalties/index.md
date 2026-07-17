---
title: Tuzo na adhabu za Uthibitisho wa Hisa
description: Jifunze kuhusu vivutio vya ndani ya itifaki katika Ethereum ya uthibitisho wa hisa.
lang: sw
---

[Ethereum](/) inalindwa kwa kutumia sarafu-fiche yake asili, Etha (ETH). Waendeshaji wa nodi wanaotaka kushiriki katika kuthibitisha vitalu na kutambua kichwa cha mnyororo, huweka Etha kwenye [mkataba wa amana](/staking/deposit-contract/) kwenye Ethereum. Kisha wanalipwa kwa Etha ili kuendesha programu ya mthibitishaji inayokagua uhalali wa vitalu vipya vinavyopokelewa kupitia mtandao wa rika-kwa-rika na kutumia algoriti ya uchaguzi wa mchepuo kutambua kichwa cha mnyororo.

Kuna majukumu mawili ya msingi kwa mthibitishaji: 1) kukagua vitalu vipya na "kutoa uthibitisho" kwavyo ikiwa ni halali, 2) kupendekeza vitalu vipya anapochaguliwa bila mpangilio maalum kutoka kwenye kundi zima la wathibitishaji. Ikiwa mthibitishaji atashindwa kufanya mojawapo ya kazi hizi anapoulizwa, anakosa malipo ya Etha. Wathibitishaji pia wakati mwingine hupewa jukumu la ujumuishaji wa sahihi na kushiriki katika kamati za usawazishaji.

Pia kuna baadhi ya vitendo ambavyo ni vigumu sana kufanya kwa bahati mbaya na huashiria nia mbaya, kama vile kupendekeza vitalu vingi kwa sloti moja au kutoa uthibitisho kwa vitalu vingi kwa sloti moja. Hizi ni tabia "zinazoweza kusababisha ukataji" ambazo husababisha mthibitishaji kuchomewa kiasi fulani cha Etha (hadi ETH 1) kabla ya mthibitishaji kuondolewa kwenye mtandao, jambo ambalo huchukua siku 36. Etha ya mthibitishaji aliyekatwa hupungua polepole katika kipindi chote cha kujitoa, lakini Siku ya 18 wanapokea "adhabu ya uwiano" ambayo inakuwa kubwa zaidi wakati wathibitishaji wengi wanapokatwa karibu na wakati huo huo. Muundo wa vivutio wa utaratibu wa makubaliano kwa hivyo hulipa kwa uaminifu na kuwaadhibu watendaji wabaya.

Tuzo na adhabu zote hutumika mara moja kwa kila kipindi.

Soma zaidi kwa maelezo ya kina...

## Tuzo na adhabu {#rewards}

### Tuzo {#rewards-2}

Wathibitishaji hupokea tuzo wanapopiga kura zinazoendana na wingi wa wathibitishaji wengine, wanapopendekeza vitalu, na wanaposhiriki katika kamati za usawazishaji. Thamani ya tuzo katika kila kipindi hukokotolewa kutoka kwenye `base_reward`. Hiki ni kipimo cha msingi ambacho tuzo nyingine hukokotolewa kutoka kwacho. `base_reward` inawakilisha wastani wa tuzo inayopokelewa na mthibitishaji chini ya hali bora kwa kila kipindi. Hii inakokotolewa kutoka kwenye salio tendaji la mthibitishaji na jumla ya idadi ya wathibitishaji wanaofanya kazi kama ifuatavyo:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

ambapo `base_reward_factor` ni 64, `base_rewards_per_epoch` ni 4 na `sum(active balance)` ni jumla ya Etha iliyowekwa dhamana kwa wathibitishaji wote wanaofanya kazi.

Hii inamaanisha tuzo ya msingi inawiana na salio tendaji la mthibitishaji na inawiana kinyume na idadi ya wathibitishaji kwenye mtandao. Kadiri wathibitishaji wanavyokuwa wengi, ndivyo utoaji wa jumla unavyokuwa mkubwa (kama `sqrt(N)` lakini `base_reward` inakuwa ndogo kwa kila mthibitishaji (kama `1/sqrt(N)`). Sababu hizi huathiri APR kwa nodi ya uwekaji dhamana. Soma mantiki ya hili katika [madokezo ya Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Jumla ya tuzo kisha inakokotolewa kama jumla ya vipengele vitano ambavyo kila kimoja kina uzito unaoamua ni kiasi gani kila kipengele kinaongeza kwenye jumla ya tuzo. Vipengele hivyo ni:

```
1. kura ya chanzo: mthibitishaji amepiga kura kwa wakati kwa kituo sahihi cha ukaguzi cha chanzo
2. kura ya lengo: mthibitishaji amepiga kura kwa wakati kwa kituo sahihi cha ukaguzi cha lengo
3. kura ya kichwa: mthibitishaji amepiga kura kwa wakati kwa kitalu sahihi cha kichwa
4. tuzo ya kamati ya usawazishaji: mthibitishaji ameshiriki katika kamati ya usawazishaji
5. tuzo ya mpendekezaji: mthibitishaji amependekeza kitalu katika sloti sahihi
```

Uzito wa kila kipengele ni kama ifuatavyo:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Uzito huu unajumlishwa kuwa 64. Tuzo inakokotolewa kama jumla ya uzito unaotumika ikigawanywa kwa 64. Mthibitishaji ambaye amepiga kura za chanzo, lengo na kichwa kwa wakati, akapendekeza kitalu na kushiriki katika kamati ya usawazishaji anaweza kupokea `64/64 * base_reward == base_reward`. Hata hivyo, mthibitishaji kwa kawaida si mpendekezaji wa bloku, kwa hivyo tuzo yao ya juu zaidi ni `64-8 /64 * base_reward == 7/8 * base_reward`. Wathibitishaji ambao si wapendekezaji wa bloku wala hawapo kwenye kamati ya usawazishaji wanaweza kupokea `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Tuzo ya ziada inaongezwa ili kuhamasisha uthibitisho wa haraka. Hii ni `inclusion_delay_reward`. Hii ina thamani sawa na `base_reward` ikizidishwa na `1/delay` ambapo `delay` ni idadi ya sloti zinazotenganisha pendekezo la kitalu na uthibitisho. Kwa mfano, ikiwa uthibitisho unawasilishwa ndani ya sloti moja ya pendekezo la kitalu, mtoa uthibitisho anapokea `base_reward * 1/1 == base_reward`. Ikiwa uthibitisho utafika katika sloti inayofuata, mtoa uthibitisho anapokea `base_reward * 1/2` na kadhalika.

Wapendekezaji wa bloku hupokea `8 / 64 * base_reward` kwa **kila uthibitisho halali** uliojumuishwa kwenye kitalu, kwa hivyo thamani halisi ya tuzo inaongezeka kulingana na idadi ya wathibitishaji wanaotoa uthibitisho. Wapendekezaji wa bloku wanaweza pia kuongeza tuzo yao kwa kujumuisha ushahidi wa utovu wa nidhamu wa wathibitishaji wengine katika kitalu chao kilichopendekezwa. Tuzo hizi ni "vivutio" vinavyohamasisha uaminifu wa mthibitishaji. Mpendekezaji wa bloku anayejumuisha ukataji atatuzwa kwa `slashed_validators_effective_balance / 512`.

### Adhabu {#penalties}

Kufikia sasa tumezingatia wathibitishaji wenye tabia nzuri kabisa, lakini vipi kuhusu wathibitishaji ambao hawapigi kura za kichwa, chanzo na lengo kwa wakati au wanafanya hivyo polepole?

Adhabu za kukosa kura za lengo na chanzo ni sawa na tuzo ambazo mtoa uthibitisho angepokea kama angeziwasilisha. Hii inamaanisha kwamba badala ya tuzo kuongezwa kwenye salio lao, thamani sawa na hiyo inaondolewa kwenye salio lao. Hakuna adhabu kwa kukosa kura ya kichwa (yaani, kura za kichwa hutuzwa tu, haziadhibiwi kamwe). Hakuna adhabu inayohusishwa na `inclusion_delay` - tuzo haitaongezwa tu kwenye salio la mthibitishaji. Pia hakuna adhabu kwa kushindwa kupendekeza kitalu.

Soma zaidi kuhusu tuzo na adhabu katika [vipimo vya mwafaka](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Tuzo na adhabu zilirekebishwa katika uboreshaji wa Bellatrix - mtazame Danny Ryan na Vitalik wakijadili hili katika [video hii ya Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Ukataji {#slashing}

Ukataji ni hatua kali zaidi inayosababisha kuondolewa kwa nguvu kwa mthibitishaji kutoka kwenye mtandao na upotevu unaohusiana wa Etha yao iliyowekwa dhamana. Kuna njia tatu ambazo mthibitishaji anaweza kukatwa, zote zikimaanisha pendekezo au uthibitisho usio wa uaminifu wa vitalu:

- Kwa kupendekeza na kusaini vitalu viwili tofauti kwa sloti moja
- Kwa kutoa uthibitisho kwa kitalu ambacho "kinazunguka" kingine (kwa ufanisi kubadilisha historia)
- Kwa "kupiga kura mara mbili" kwa kutoa uthibitisho kwa wagombea wawili kwa kitalu kimoja

Ikiwa vitendo hivi vitagunduliwa, mthibitishaji anakatwa. Hii inamaanisha kuwa 0.0078125 inachomwa mara moja kwa mthibitishaji wa ETH 32 (ikipimwa kwa mstari na salio tendaji), kisha kipindi cha kuondolewa cha siku 36 kinaanza. Wakati wa kipindi hiki cha kuondolewa, dhamana ya mthibitishaji hupungua polepole. Katika hatua ya kati (Siku ya 18) adhabu ya ziada inatumika ambayo ukubwa wake unaongezeka kulingana na jumla ya Etha iliyowekwa dhamana ya wathibitishaji wote waliokatwa katika siku 36 kabla ya tukio la ukataji. Hii inamaanisha kuwa wakati wathibitishaji wengi wanapokatwa, ukubwa wa ukataji unaongezeka. Ukataji wa juu zaidi ni salio tendaji kamili la wathibitishaji wote waliokatwa (yaani, ikiwa kuna wathibitishaji wengi wanaokatwa wanaweza kupoteza dhamana yao yote). Kwa upande mwingine, tukio moja, la pekee la ukataji huchoma tu sehemu ndogo ya dhamana ya mthibitishaji. Adhabu hii ya hatua ya kati ambayo inaongezeka kulingana na idadi ya wathibitishaji waliokatwa inaitwa "adhabu ya uwiano".

## Uvujaji wa kutotenda {#inactivity-leak}

Ikiwa tabaka la mwafaka limepita zaidi ya vipindi vinne bila kukamilisha, itifaki ya dharura inayoitwa "uvujaji wa kutotenda" inawashwa. Lengo kuu la uvujaji wa kutotenda ni kuunda mazingira yanayohitajika kwa mnyororo kurejesha ukamilifu. Kama ilivyoelezwa hapo juu, ukamilifu unahitaji wingi wa 2/3 ya jumla ya Etha iliyowekwa dhamana kukubaliana juu ya vituo vya ukaguzi vya chanzo na lengo. Ikiwa wathibitishaji wanaowakilisha zaidi ya 1/3 ya wathibitishaji wote wataingia nje ya mtandao au kushindwa kuwasilisha uthibitisho sahihi basi haiwezekani kwa wingi mkuu wa 2/3 kukamilisha vituo vya ukaguzi. Uvujaji wa kutotenda huruhusu dhamana ya wathibitishaji wasiotenda kupungua polepole hadi wadhibiti chini ya 1/3 ya jumla ya dhamana, na kuruhusu wathibitishaji wanaofanya kazi waliosalia kukamilisha mnyororo. Hata kama kundi la wathibitishaji wasiotenda ni kubwa kiasi gani, wathibitishaji wanaofanya kazi waliosalia hatimaye watadhibiti >2/3 ya dhamana. Upotevu wa dhamana ni kivutio kikubwa kwa wathibitishaji wasiotenda kuanza kufanya kazi tena haraka iwezekanavyo! Hali ya uvujaji wa kutotenda ilikumbana kwenye mtandao wa majaribio wa Medalla wakati < 66% ya wathibitishaji wanaofanya kazi waliweza kufikia mwafaka juu ya kichwa cha sasa cha mnyororo wa vitalu. Uvujaji wa kutotenda uliwashwa na ukamilifu ulipatikana tena hatimaye!

Muundo wa tuzo, adhabu na ukataji wa utaratibu wa makubaliano unahamasisha wathibitishaji binafsi kuwa na tabia sahihi. Hata hivyo, kutokana na chaguzi hizi za muundo huibuka mfumo ambao unahamasisha sana usambazaji sawa wa wathibitishaji katika wateja wengi, na unapaswa kuvunja moyo sana utawala wa mteja mmoja.

## Usomaji zaidi {#further-reading}

- [Kuboresha Ethereum: Tabaka la vivutio](https://eth2book.info/altair/part2/incentives)
- [Vivutio katika itifaki mseto ya Casper ya Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Vipimo vilivyofafanuliwa vya Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Vidokezo vya Kuzuia Ukataji vya Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Uchambuzi wa adhabu za ukataji chini ya EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Vyanzo_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_