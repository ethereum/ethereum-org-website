---
title: Utaratibu wa makubaliano
description: Ufafanuzi wa itifaki za makubaliano katika mifumo iliyosambazwa na jukumu wanalocheza katika Ethereum.
lang: sw
---

Neno 'utaratibu wa makubaliano' mara nyingi hutumika kwa mazungumzo kurejelea 'uthibitisho-wa-stake', 'uthibitisho-wa-kazi' au 'uthibitisho-wa-mamlaka'. Hata hivyo, hivi ni vipengele tu katika utaratibu wa makubaliano unaolinda dhidi ya [mashambulizi ya Sybil](/glossary/#sybil-attack). Mbinu za Makubaliano ni mkusanyiko kamili wa mawazo, itifaki na motisha zinazowezesha seti iliyosambazwa ya nodi kukubaliana juu ya hali ya kiambajengo.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri, tunapendekeza kwanza usome [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Makubaliano ni nini? {#what-is-consensus}

Kwa makubaliano, tunamaanisha kuwa makubaliano ya jumla yamefikiwa. Fikiria kikundi cha watu wanaoenda kwenye sinema. Ikiwa hakuna kutokubaliana juu ya uchaguzi uliopendekezwa wa filamu, basi makubaliano yanapatikana. Ikiwa kuna kutokubaliana, kikundi lazima kiwe na njia ya kuamua ni filamu gani itaonyeshwa. Katika hali mbaya, kikundi hatimaye kitagawanyika.

Kuhusiana na kiambajengo cha Ethereum, mchakato huo umewekwa rasmi, na kufikia makubaliano ina maana kwamba angalau 66% ya nodi kwenye mtandao hukubaliana juu ya hali ya kimataifa ya mtandao.

## Utaratibu wa makubaliano ni nini? {#what-is-a-consensus-mechanism}

Neno utaratibu wa makubaliano hurejelea rundo zima la itifaki, motisha na mawazo ambayo huruhusu mtandao wa nodi kukubaliana juu ya hali ya kiambajengo.

Ethereum hutumia utaratibu wa makubaliano wa uthibitisho wa stake unaopata usalama wake wa kiuchumi wa kripto kutoka kwa seti ya zawadi na adhabu zinazotumika kwa mtaji uliofungwa na wahusika. Muundo huu wa motisha huwahimiza washikadau binafsi kutumia vithibitishaji waaminifu, huwaadhibu wale wasiofanya hivyo, na huleta gharama ya juu sana kushambulia mtandao.

Kisha, kuna itifaki ambayo inasimamia jinsi wathibitishaji waaminifu wanachaguliwa ili kupendekeza au kuthibitisha vitalu, mchakato wa shughuli na kupiga kura kwa maoni yao ya mkuu wa mnyororo. Katika hali nadra ambapo vitalu vingi viko katika nafasi sawa karibu na kichwa cha mnyororo, kuna utaratibu wa kuchagua uma unaochagua vitalu vinavyounda mnyororo 'mzito zaidi', unaopimwa kwa idadi ya viidhinishi vilivyopiga kura kwa vitalu vilivyopimwa kwa salio lao la etha lililowekwa kigingi.

Baadhi ya dhana ni muhimu kwa maafikiano ambayo hayajafafanuliwa kwa uwazi katika msimbo, kama vile usalama wa ziada unaotolewa na uratibu wa kijamii wa nje ya bendi kama njia ya mwisho ya ulinzi dhidi ya mashambulizi kwenye mtandao.

Vipengele hivi kwa pamoja huunda utaratibu wa makubaliano.

## Aina za taratibu za makubaliano {#types-of-consensus-mechanisms}

### Kulingana na Uthibitisho wa kazi {#proof-of-work}

Kama Bitcoin, Ethereum hapo awali ilitumia itifaki ya makubaliano inayotegemea **uthibitisho wa kazi (PoW)**.

#### Uundaji wa Bloku {#pow-block-creation}

Wachimbaji madini hushindana kuunda vitalu vipya vilivyojazwa na miamala iliyochakatwa. Mshindi hushiriki kitalu kipya na mtandao wengine na hupata ETH mpya iliyotengenezwa hivi karibuni. Mbio hizo hushinda kwa kompyuta ambayo ina uwezo wa kutatua fumbo la hesabu haraka sana. Hii hutoa kiunga cha kriptografia kati ya kitalu cha sasa na kitalu kilichotangulia. Kutatua fumbo hili ni kazi katika "uthibitisho wa kazi". Mnyororo wa canonical kisha huamuliwa na sheria ya kuchagua uma ambayo huchagua seti ya vitalu ambavyo vimekuwa na kazi kubwa zaidi ya kuzichimba.

#### Usalama {#pow-security}

Mtandao umewekwa salama kwa kuwa utahitaji 51% ya nguvu ya kompyuta ya mtandao ili kulaghai mnyororo. Hii ingehitaji uwekezaji mkubwa kama huu katika vifaa na nishati; una uwezekano wa kutumia zaidi ya unayoweza kupata.

Maelezo zaidi kuhusu [uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)

### Kulingana na Uthibitisho wa Rehani {#proof-of-stake}

Ethereum sasa inatumia itifaki ya makubaliano inayotegemea **uthibitisho wa rehani (PoS)**.

#### Uundaji wa Bloku {#pos-block-creation}

Kidhibiti cha kuunda kitalu. Kithibitishaji kimoja kimechaguliwa kwa nasibu katika kila nafasi kuwa mpendekezaji wa kitalu. Mteja wao wa makubaliano anaomba fungu la miamala na malipo ya utekelezaji kutoka kwa mteja wao wa utekelezaji waliooanishwa. Wanafunga hii kwa data ya makubaliano ili kuunda kitalu, ambayo hutuma kwa nodi nyingine kwenye mtandao wa Ethereum. Uzalishaji huu wa kitalu hutuzwa katika ETH. Katika hali nadra wakati vitalu vingi vinavyowezekana vipo kwa nafasi moja, au nodi husikia juu ya vitalu kwa nyakati tofauti, algorithm ya uchaguzi wa uma huchagua kitalu kinachounda mnyororo wenye uzito mkubwa wa uthibitisho (ambapo uzani ni idadi ya wathibitishaji wanaothibitisha kupunguzwa kwa usawa wao wa ETH).

#### Usalama {#pos-security}

Mfumo wa uthibitisho wa dau ni salama kwa njia ya kripto-kiuchumi kwa sababu mvamizi anayejaribu kuchukua udhibiti wa mnyororo lazima aharibu kiasi kikubwa cha ETH. Mfumo wa zawadi huwapa motisha washikadau binafsi kuwa waaminifu, na adhabu huwakatisha tamaa wadau kutokana na kutenda kwa nia mbaya.

Maelezo zaidi kuhusu [uthibitisho wa rehani](/developers/docs/consensus-mechanisms/pos/)

### Mwongozo wa picha {#types-of-consensus-video}

Tazama zaidi kuhusu aina tofauti za mbinu za makubaliano zinazotumika kwenye Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Ukinzani wa Sybil na uteuzi wa mnyororo {#sybil-chain}

Uthibitisho wa kazi na uthibitisho wa stake pekee sio itifaki ya makubaliano, lakini mara nyingi hurejelewa kama hivyo kwa urahisi. Kwa kweli ni mifumo ya upinzani ya Sybil na wateuzi wa waandishi vitalu; wao ni njia ya kuamua nani ni mwandishi wa vitalu hivi karibuni. Sehemu nyingine muhimu ni algorithm ya uteuzi wa mnyororo (aka chaguo la uma) ambayo huwezesha nodi kuchukua kitalu kimoja kilicho sahihi kwenye kichwa cha mnyororo katika hali ambapo vitalu vingi vipo katika nafasi sawa.

**Ukinzani wa Sybil** hupima jinsi itifaki inavyokabiliana na shambulio la Sybil. Upinzani wa aina hii ya shambulio ni muhimu kwa kiambajengo cha mfumo mtawanyo na kuwawezesha wachimbaji na wathibitishaji kutuzwa kwa usawa kulingana na rasilimali iliyowekwa. Kuanzishwa kwa ishara hizi ni kiini cha kiambajengo ambacho itafunguliwa na kulipwa na mtumiaji kutoka kwa mtumiaji kulingana na kiasi cha fedha kilichowekwa. Ulinzi huu ni kikwazo cha kiuchumi kwa mashambulizi ya Sybil.

**Kanuni ya uteuzi wa mnyororo** hutumika kuamua ni mnyororo upi ndio "sahihi". Bitcoin hutumia sheria ya "mnyororo mrefu zaidi", ambayo inamaanisha kuwa kiambajengo chochote nikirefu zaidi itakuwa ile ambayo nodi zingine zitakubali kuwa halali na kufanya kazi nayo. Kwa minyororo ya uthibitisho wa kazi, msururu mrefu zaidi hubainishwa na ugumu wa jumla wa uthibitisho wa kazi. Ethereum ilitumia sheria ndefu zaidi ya mnyororo; hata hivyo, kwa kuwa sasa Ethereum inaendeshwa kwa uthibitisho wa stake ilipitisha algorithm iliyosasishwa ya kuchagua uma ambayo inapima 'uzito' wa mnyororo. Uzito ni jumla iliyokusanywa ya kura za kiidhinishaji, zinazopimwa kwa stake ya wadhibiti vilivyowekwa kigingi.

Ethereum hutumia utaratibu wa makubaliano unaojulikana kama [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) unaochanganya [Uthibitisho wa Rehani wa Casper FFG](https://arxiv.org/abs/1710.09437) na [kanuni ya uteuzi wa uma ya GHOST](https://arxiv.org/abs/2003.03052).

## Masomo zaidi {#further-reading}

- [Algorithm ya Makubaliano ya Mnyororo wa Bloku ni Nini?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Makubaliano ya Nakamoto ni nini? Mwongozo Kamili kwa Wanaoanza](https://blockonomi.com/nakamoto-consensus/)
- [Casper Inafanyaje Kazi?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Kuhusu Usalama na Utendaji wa Minyororo ya Bloku ya Uthibitisho wa Kazi](https://eprint.iacr.org/2016/555.pdf)
- [Kosa la Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)
- [Uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/)
- [Uthibitisho wa rehani](/developers/docs/consensus-mechanisms/pos/)
- [Uthibitisho wa Mamlaka](/developers/docs/consensus-mechanisms/poa/)
