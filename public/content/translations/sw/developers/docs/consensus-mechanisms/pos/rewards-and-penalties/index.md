---
title: Tuzo na adhabu za uthibitisho wa hisa
description: Jifunze kuhusu motisha katika itifaki katika uthibitisho wa hisa Ethereum.
lang: sw
---

Ethereum imehifadhiwa kwa kutumia sarafu yake ya asili, ether (ETH). Waendeshaji wa nodi wanaotaka kushiriki katika kuthibitisha bloku na kutambua kiongozi wa mnyororo, huweka ether kwenye [mkataba wa amana](/staking/deposit-contract/) kwenye Ethereum. Wao ni kisha kulipwa katika ether kuendesha programu ya kuthibitisha kwamba kuangalia uhalali wa vitalu mpya kupokea juu ya wenzao kwa wenzao Mtandao na kutumia uma-uchaguzi algorithm kutambua kichwa cha mnyororo.

Kuna majukumu mawili ya msingi kwa uthibitisho: 1) kuangalia vitalu mpya na " kuthibitisha " kwao kama wao ni halali, 2) kupendekeza vitalu mpya wakati waliochaguliwa kwa nasibu kutoka kwa jumla uthibitisho pool. Kama uthibitisho kushindwa kufanya yoyote ya kazi hizi wakati aliuliza wao kukosa nje juu ya malipo ether. Uthibitisho pia ni wakati mwingine kazi na saini mkusanyiko na kushiriki katika kamati sync.

Pia kuna baadhi ya vitendo ambayo ni vigumu sana kufanya kwa bahati mbaya na kuashiria baadhi ya nia mbaya, kama vile kupendekeza vitalu mbalimbali kwa ajili ya yanayopangwa sawa au kuthibitisha vitalu mbalimbali kwa ajili ya yanayopangwa sawa. Hizi ni "slashable" tabia ambayo kusababisha uthibitisho kuwa baadhi ya kiasi cha ether (hadi 1 ETH) kuchomwa moto kabla ya uthibitisho ni kuondolewa kutoka Mtandao, ambayo inachukua siku 36. Slashed uthibitisho ether polepole eneza mbali katika kipindi kutoka, lakini siku ya 18 wao kupokea " uhusiano adhabu " ambayo ni kubwa wakati uthibitisho zaidi ni slashed karibu wakati huo huo. Kwa hiyo, utaratibu wa makubaliano kulipia unyoovu na kuwaadhibu wahusika wabaya.

Tuzo zote na adhabu ni kutumika mara moja kwa kila enzi.

Endelea kusoma ili upate habari zaidi...

## Zawadi na adhabu {#rewards}

### Zawadi {#rewards}

Uthibitishaji wanapokea tuzo wanapofanya kura ambazo kuambatana na wengi wa uthibitisho wengine, wanapopendekeza vitalu, na wanaposhiriki katika kamati za usawazishaji. Thamani ya zawadi katika kila epoch hukokotolewa kutoka kwa `base_reward`. Hii ni kitengo msingi kwamba tuzo nyingine ni mahesabu kutoka. `base_reward` inawakilisha zawadi ya wastani inayopokelewa na mthibitishaji chini ya hali bora kwa kila epoch. Hii ni mahesabu kutoka kwa usawa wa kweli wa uthibitisho na idadi ya jumla ya validators hai kama ifuatavyo:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

ambapo `base_reward_factor` ni 64, `base_rewards_per_epoch` ni 4 na `sum(active balance)` ni jumla ya ether iliyowekezwa kwa wathibitishaji wote wanaofanya kazi.

Hii ina maana malipo ya msingi ni sawa na usawa wa kweli wa uthibitisho na kwa usawa wa idadi ya validators kwenye mtandao. Kadiri wathibitishaji wanavyoongezeka, ndivyo utoaji wa jumla unavyoongezeka (kama `sqrt(N)`) lakini `base_reward` kwa kila mthibitishaji huwa ndogo zaidi (kama `1/sqrt(N)`). Sababu hizi ushawishi APR kwa nodi kuunganisha. Soma sababu ya hili katika [maelezo ya Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Tuzo ya jumla ni kisha mahesabu kama jumla ya vipengele tano kwamba kila mmoja na uzito kwamba huamua kiasi gani kila sehemu anaongeza kwa tuzo ya jumla. Vipengele ni:

```
1. kura ya chanzo: mthibitishaji amepiga kura kwa wakati kwa kituo sahihi cha ukaguzi cha chanzo
2. kura ya lengo: mthibitishaji amepiga kura kwa wakati kwa kituo sahihi cha ukaguzi cha lengo
3. kura ya kiongozi: mthibitishaji amepiga kura kwa wakati kwa bloku sahihi ya kiongozi
4. zawadi ya kamati ya usawazishaji: mthibitishaji ameshiriki katika kamati ya usawazishaji
5. zawadi ya mpendekezaji: mthibitishaji amependekeza bloku katika nafasi (slot) sahihi
```

Uzito kwa kila sehemu ni kama ifuatavyo:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Vipimo hivi vinajumlisha 64. Thawabu ni mahesabu kama jumla ya uzito husika kugawanywa na 64. Mthibitishaji ambaye amepiga kura za chanzo, lengo na kiongozi kwa wakati, amependekeza bloku na kushiriki katika kamati ya usawazishaji anaweza kupokea `64/64 * base_reward == base_reward`. Hata hivyo, mthibitishaji kwa kawaida si mpendekezaji wa bloku, kwa hivyo zawadi yake ya juu zaidi ni `64-8 /64 * base_reward == 7/8 * base_reward`. Wathibitishaji ambao si wapendekezaji wa bloku wala hawako katika kamati ya usawazishaji wanaweza kupokea `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Tuzo ya ziada imeongezwa ili kuhamasisha uthibitisho wa haraka. Hii ndiyo `inclusion_delay_reward`. Hii ina thamani sawa na `base_reward` ikizidishwa na `1/delay` ambapo `delay` ni idadi ya nafasi (slots) zinazotenganisha pendekezo la bloku na uthibitisho. Kwa mfano, ikiwa uthibitisho utawasilishwa ndani ya nafasi (slot) moja ya pendekezo la bloku, mtoa uthibitisho anapokea `base_reward * 1/1 == base_reward`. Ikiwa uthibitisho utafika katika nafasi (slot) inayofuata, mtoa uthibitisho atapokea `base_reward * 1/2` na kuendelea.

Wapendekezaji wa bloku hupokea `8 / 64 * base_reward` kwa **kila uthibitisho halali** uliojumuishwa kwenye bloku, kwa hivyo thamani halisi ya zawadi huongezeka kulingana na idadi ya wathibitishaji wanaotoa uthibitisho. Waombaji wa kuzuia wanaweza pia kuongeza tuzo yao kwa kujumuisha ushahidi wa tabia mbaya na wathibitishaji wengine katika kizuizi chao kilichopendekezwa. Tuzo hizi ni "karoti" ambazo kuhimiza uthibitisho uaminifu. Mpendekezaji wa bloku anayejumuisha upunguzaji (slashing) atazawadiwa kwa `slashed_validators_effective_balance / 512`.

### Adhabu {#penalties}

Hadi sasa tumezingatia validators kikamilifu vizuri-alitenda, lakini nini kuhusu validators kwamba hawana kufanya kichwa cha wakati, chanzo na lengo kura au kufanya hivyo polepole?

Adhabu kwa kukosa lengo na chanzo kura ni sawa na tuzo attestor ingekuwa kupokea kama wao kuwasilishwa yao. Hii ina maana kwamba badala ya kuwa na tuzo aliongeza kwa mizani yao, wana thamani sawa kuondolewa kutoka mizani yao. Hakuna adhabu kwa kukosa kura ya kiongozi (yaani, kura za kiongozi huzawadiwa tu, haziadhibiwi kamwe). Hakuna adhabu inayohusiana na `inclusion_delay` - zawadi haitaongezwa tu kwenye salio la mthibitishaji. Pia hakuna adhabu kwa kushindwa kupendekeza kizuizi.

Soma zaidi kuhusu zawadi na adhabu katika [vipimo vya makubaliano](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Zawadi na adhabu zilirekebishwa katika sasisho la Bellatrix - tazama Danny Ryan na Vitalik wakijadili hili katika [video hii ya Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Upunguzaji (Slashing) {#slashing}

Slashing ni hatua kali zaidi ambayo husababisha kuondolewa kwa nguvu ya validator kutoka mtandao na kupoteza kuhusiana na ether yao kuunganisha. Kuna njia tatu uthibitisho inaweza kuwa slashed, ambayo yote kiasi cha pendekezo uaminifu au uthibitisho wa vitalu:

- Kwa kupendekeza na kusaini vitalu mbili tofauti kwa nafasi hiyo hiyo
- Kwa kuthibitisha bodi kwamba "inazunguka" mwingine (kwa ufanisi kubadilisha historia)
- Kwa "kupiga kura mara mbili" kwa kuthibitisha kwa wagombea wawili kwa ajili ya bodi moja

Kama vitendo hivi ni aligundua, uthibitisho ni slashed. Hii ina maana kwamba 0.0078125 ni mara moja kuchomwa moto kwa 32 ETH uthibitisho (imeongezeka linearly na usawa hai), kisha 36 siku kuondolewa kipindi huanza. Wakati wa kipindi hicho cha kuondolewa, mti wa mtahini unapoteza damu polepole. Katika hatua ya katikati (Siku ya 18) adhabu ya ziada inatumika ambayo ukubwa wake hupanda na jumla ya ether iliyowekwa ya wathibitishaji wote waliokatwa katika siku 36 kabla ya tukio la kukata. Hii ina maana kwamba wakati validators zaidi ni slashed, ukubwa wa slash kuongezeka. Upunguzaji wa juu zaidi ni salio kamili la ufanisi la wathibitishaji wote waliopunguzwa (yaani, ikiwa kuna wathibitishaji wengi wanaopunguzwa, wanaweza kupoteza hisa zao zote). Kwa upande mwingine, moja, imejitenga kukata tukio tu huungua sehemu ndogo ya hisa ya uthibitisho ya. Hii adhabu ya katikati ambayo viwango na idadi ya validators slashed inaitwa "adhabu uwiano".

## Uvujaji kutokana na kutofanya kazi {#inactivity-leak}

Ikiwa safu ya makubaliano imepita zaidi ya enzi nne bila kukamilisha, itifaki ya dharura inayoitwa "kuvuja kwa kutofanya kazi" huamilishwa. Lengo la mwisho la uvujaji wa kutokuwa na shughuli ni kuunda hali zinazohitajika kwa mlolongo kurejesha mwisho. Kama ilivyoelezwa hapo juu, mwisho inahitaji 2/3 wengi wa ether jumla iliyofungwa kukubaliana juu ya chanzo na lengo vituo vya uchunguzi. Ikiwa wathibitishaji wanaowakilisha zaidi ya 1/3 ya jumla ya wathibitishaji wanaenda nje ya Mtandao au wanashindwa kuwasilisha uthibitisho sahihi basi haiwezekani kwa idadi kubwa ya 2/3 kukamilisha vituo vya ukaguzi. Uvujaji wa kutokuwa na shughuli huruhusu hisa inayomilikiwa na wathibitishaji wasiofanya kazi kutokwa na damu hatua kwa hatua hadi watakapodhibiti chini ya 1/3 ya hisa nzima, ikiruhusu wathibitishaji waliobaki watendaji kukamilisha mnyororo. Hata hivyo kubwa pool ya uthibitisho wasiofanya kazi, thibithisha kazi iliyobaki hatimaye kudhibiti >2/3 ya hisa. Kupoteza hisa ni motisha kubwa kwa uthibitisho wasiofanya kazi kuamsha tena haraka iwezekanavyo! Hali ya uvujaji wa shughuli haikutokea kwenye mtandao wa majaribio wa Medalla wakati < 66% ya wathibitishaji wanaofanya kazi waliweza kufikia makubaliano juu ya mkuu wa sasa wa blockchain. Uvujaji wa kutofanya kazi ulianzishwa na hatimaye utimizo ulipatikana!

Tuzo, adhabu na kukata muundo wa utaratibu wa makubaliano inahimiza wathibitishaji wa mtu binafsi kutenda kwa usahihi. Hata hivyo, kutoka uchaguzi huu wa kubuni inatokana na mfumo kwamba nguvu motisha usambazaji sawa wa uthibitisho katika wateja wengi, na lazima nguvu disincentivize moja-mteja kutawala.

## Masomo zaidi {#further-reading}

- [Kuboresha Ethereum: Safu ya motisha](https://eth2book.info/altair/part2/incentives)
- [Motisha katika itifaki mseto ya Casper ya Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Vipimo vilivyofafanuliwa vya Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Vidokezo vya Kuzuia Upunguzaji (Slashing) kwenye Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Uchambuzi wa adhabu za upunguzaji (slashing) chini ya EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Vyanzo_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
