---
title: Taratibu za makubaliano
description: Maelezo ya itifaki za mwafaka katika mifumo iliyosambazwa na jukumu lake katika Ethereum.
lang: sw
authors: ["Patrick Collins"]
---

Neno 'utaratibu wa makubaliano' mara nyingi hutumika kwa mazungumzo kurejelea itifaki za 'Uthibitisho wa Dau (PoS)', 'Uthibitisho wa Kazi (PoW)' au 'uthibitisho wa mamlaka (PoA)'. Hata hivyo, hivi ni vipengele tu katika taratibu za makubaliano ambavyo hulinda dhidi ya [mashambulio ya Sybil](/glossary/#sybil-attack). Taratibu za makubaliano ni mkusanyiko kamili wa mawazo, itifaki na motisha zinazowezesha kundi lililosambazwa la nodi kukubaliana juu ya hali ya mnyororo wa vitalu.

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Mwafaka ni nini? {#what-is-consensus}

Kwa mwafaka, tunamaanisha kwamba makubaliano ya jumla yamefikiwa. Fikiria kundi la watu wanaokwenda kwenye jumba la sinema. Ikiwa hakuna kutokubaliana juu ya chaguo lililopendekezwa la filamu, basi mwafaka unafikiwa. Ikiwa kuna kutokubaliana, kundi lazima liwe na njia ya kuamua ni filamu gani ya kutazama. Katika hali mbaya, kundi hatimaye litagawanyika.

Kuhusiana na mnyororo wa vitalu wa [Ethereum](/), mchakato huo umerasimishwa, na kufikia mwafaka inamaanisha kuwa angalau 66% ya nodi kwenye mtandao zinakubaliana juu ya hali ya kimataifa ya mtandao.

## Utaratibu wa makubaliano ni nini? {#what-is-a-consensus-mechanism}

Neno utaratibu wa makubaliano linarejelea mkusanyiko mzima wa itifaki, motisha na mawazo yanayoruhusu mtandao wa nodi kukubaliana juu ya hali ya mnyororo wa vitalu.

Ethereum hutumia utaratibu wa makubaliano unaotegemea Uthibitisho wa Dau (PoS) ambao hupata usalama wake wa kiuchumi wa kripto kutoka kwa seti ya tuzo na adhabu zinazotumika kwa mtaji uliofungwa na waweka dhamana. Muundo huu wa motisha unahimiza waweka dhamana binafsi kuendesha wathibitishaji waaminifu, kuwaadhibu wale ambao hawafanyi hivyo, na kuunda gharama kubwa sana ya kushambulia mtandao.

Kisha, kuna itifaki inayosimamia jinsi wathibitishaji waaminifu wanavyochaguliwa ili kupendekeza au kuthibitisha vitalu, kuchakata miamala na kupiga kura kwa mtazamo wao wa kichwa cha mnyororo. Katika hali nadra ambapo vitalu vingi viko katika nafasi sawa karibu na kichwa cha mnyororo, kuna utaratibu wa kuchagua mchepuko ambao huchagua vitalu vinavyounda mnyororo 'mzito zaidi', unaopimwa na idadi ya wathibitishaji waliopiga kura kwa vitalu hivyo vilivyopimwa kwa uzito wa salio lao la Etha waliloweka dhamana.

Baadhi ya dhana ni muhimu kwa mwafaka ambazo hazijafafanuliwa wazi katika msimbo, kama vile usalama wa ziada unaotolewa na uratibu wa kijamii unaowezekana nje ya mtandao kama njia ya mwisho ya ulinzi dhidi ya mashambulio kwenye mtandao.

Vipengele hivi kwa pamoja huunda utaratibu wa makubaliano.

## Aina za taratibu za makubaliano {#types-of-consensus-mechanisms}

### Kulingana na Uthibitisho wa Kazi {#proof-of-work}

Kama Bitcoin, Ethereum iliwahi kutumia itifaki ya mwafaka inayotegemea **Uthibitisho wa Kazi (PoW)**.

#### Uundaji wa kitalu {#pow-block-creation}

Wachimbaji hushindana kuunda vitalu vipya vilivyojazwa na miamala iliyochakatwa. Mshindi hushiriki kitalu kipya na mtandao uliosalia na kupata ETH mpya iliyotengenezwa. Mbio hizo hushindwa na kompyuta ambayo ina uwezo wa kutatua fumbo la hisabati kwa haraka zaidi. Hii inazalisha kiungo cha kriptografia kati ya kitalu cha sasa na kitalu kilichotangulia. Kutatua fumbo hili ndiyo kazi katika "Uthibitisho wa Kazi". Mnyororo wa kisheria kisha huamuliwa na sheria ya kuchagua mchepuko ambayo huchagua seti ya vitalu ambavyo vimefanyiwa kazi nyingi zaidi ili kuvichimba.

#### Usalama {#pow-security}

Mtandao huwekwa salama na ukweli kwamba utahitaji 51% ya nguvu ya kompyuta ya mtandao ili kulaghai mnyororo. Hii itahitaji uwekezaji mkubwa kama huo katika vifaa na nishati; una uwezekano wa kutumia zaidi ya utakavyopata.

Zaidi kuhusu [Uthibitisho wa Kazi](/developers/docs/consensus-mechanisms/pow/)

### Kulingana na Uthibitisho wa Dau {#proof-of-stake}

Ethereum sasa inatumia itifaki ya mwafaka inayotegemea **Uthibitisho wa Dau (PoS)**.

#### Uundaji wa kitalu {#pos-block-creation}

Wathibitishaji huunda vitalu. Mthibitishaji mmoja huchaguliwa kwa nasibu katika kila sloti kuwa mpendekezaji wa bloku. Mteja wa mwafaka wao huomba kifurushi cha miamala kama 'mzigo wa utekelezaji' kutoka kwa kiteja chao cha utekelezaji kilichooanishwa. Wanafunga hii katika data ya mwafaka ili kuunda kitalu, ambacho wanatuma kwa nodi zingine kwenye mtandao wa Ethereum. Uzalishaji huu wa kitalu hutuzwa kwa ETH. Katika hali nadra wakati vitalu vingi vinavyowezekana vipo kwa sloti moja, au nodi zinasikia kuhusu vitalu kwa nyakati tofauti, algoriti ya kuchagua mchepuko huchagua kitalu kinachounda mnyororo wenye uzito mkubwa zaidi wa uthibitisho (ambapo uzito ni idadi ya wathibitishaji wanaothibitisha iliyopimwa na salio lao la ETH).

#### Usalama {#pos-security}

Mfumo wa Uthibitisho wa Dau ni salama kiuchumi wa kripto kwa sababu mshambuliaji anayejaribu kuchukua udhibiti wa mnyororo lazima aharibu kiasi kikubwa cha ETH. Mfumo wa tuzo huhamasisha waweka dhamana binafsi kuishi kwa uaminifu, na adhabu huwavunja moyo waweka dhamana kutenda kwa nia mbaya.

Zaidi kuhusu [Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/)

### Mwongozo wa kuona {#types-of-consensus-video}

Tazama zaidi kuhusu aina tofauti za taratibu za makubaliano zinazotumika kwenye Ethereum:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Upinzani wa Sybil na uteuzi wa mnyororo {#sybil-chain}

Uthibitisho wa Kazi na Uthibitisho wa Dau pekee sio itifaki za mwafaka, lakini mara nyingi hurejelewa hivyo kwa urahisi. Kwa kweli ni taratibu za upinzani wa Sybil na wateuzi wa mwandishi wa kitalu; ni njia ya kuamua nani ni mwandishi wa kitalu cha hivi punde. Kipengele kingine muhimu ni algoriti ya uteuzi wa mnyororo (inayojulikana pia kama chaguo la mchepuko) inayowezesha nodi kuchagua kitalu kimoja sahihi kwenye kichwa cha mnyororo katika hali ambapo vitalu vingi vipo katika nafasi sawa.

**Upinzani wa Sybil** hupima jinsi itifaki inavyofanya dhidi ya shambulio la Sybil. Upinzani dhidi ya aina hii ya shambulio ni muhimu kwa mnyororo wa vitalu uliogatuliwa na huwezesha wachimbaji na wathibitishaji kutuzwa kwa usawa kulingana na rasilimali zilizowekwa. Uthibitisho wa Kazi na Uthibitisho wa Dau hulinda dhidi ya hili kwa kuwafanya watumiaji kutumia nishati nyingi au kuweka dhamana nyingi. Ulinzi huu ni kizuizi cha kiuchumi kwa mashambulio ya Sybil.

**Sheria ya uteuzi wa mnyororo** hutumika kuamua ni mnyororo upi ni mnyororo "sahihi". Bitcoin hutumia sheria ya "mnyororo mrefu zaidi", ambayo inamaanisha kuwa mnyororo wa vitalu wowote ulio mrefu zaidi utakuwa ule ambao nodi zingine zinaukubali kama halali na kufanya kazi nao. Kwa minyororo ya Uthibitisho wa Kazi, mnyororo mrefu zaidi huamuliwa na ugumu wa jumla wa Uthibitisho wa Kazi wa mnyororo. Ethereum ilikuwa ikitumia sheria ya mnyororo mrefu zaidi pia; hata hivyo, sasa kwa kuwa Ethereum inaendeshwa kwenye Uthibitisho wa Dau ilipitisha algoriti ya kuchagua mchepuko iliyosasishwa ambayo hupima 'uzito' wa mnyororo. Uzito ni jumla iliyokusanywa ya kura za mthibitishaji, iliyopimwa na salio la etha iliyowekwa dhamana na mthibitishaji.

Ethereum hutumia utaratibu wa makubaliano unaojulikana kama [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) ambao unachanganya [Uthibitisho wa Dau wa Casper FFG](https://arxiv.org/abs/1710.09437) na [sheria ya kuchagua mchepuko ya GHOST](https://arxiv.org/abs/2003.03052).

## Usomaji zaidi {#further-reading}

- [Algoriti ya Mwafaka wa Mnyororo wa Vitalu ni Nini?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Mwafaka wa Nakamoto ni Nini? Mwongozo Kamili wa Wanaoanza](https://blockonomi.com/nakamoto-consensus/)
- [Casper Inafanyaje Kazi?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Kuhusu Usalama na Utendaji wa Minyororo ya Vitalu ya Uthibitisho wa Kazi](https://eprint.iacr.org/2016/555.pdf)
- [Kosa la Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Uthibitisho wa Kazi](/developers/docs/consensus-mechanisms/pow/)
- [Uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/)
- [Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/)
- [Uthibitisho wa mamlaka](/developers/docs/consensus-mechanisms/poa/)