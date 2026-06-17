---
title: Gasper
description: Maelezo ya utaratibu wa Uthibitisho wa Dau (PoS) wa Gasper.
lang: sw
---

Gasper ni muunganiko wa Casper the Friendly Finality Gadget (Casper FFG) na algoriti ya kuchagua mchepuko ya LMD-GHOST. Pamoja vipengele hivi vinaunda utaratibu wa makubaliano unaolinda Uthibitisho wa Dau (PoS) wa Ethereum. Casper ni utaratibu unaoboresha vitalu fulani kuwa "viliokamilishwa" ili waingiaji wapya kwenye mtandao wawe na uhakika kwamba wanafanya usawazishaji wa mnyororo rasmi. Algoriti ya kuchagua mchepuko inatumia kura zilizokusanywa kuhakikisha kwamba nodi zinaweza kuchagua kwa urahisi ule ulio sahihi wakati michepuo inapotokea kwenye mnyororo wa vitalu.

**Kumbuka** kwamba ufafanuzi wa asili wa Casper FFG ulisasishwa kidogo ili kujumuishwa kwenye Gasper. Kwenye ukurasa huu tunazingatia toleo lililosasishwa.

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa nyenzo hii ni muhimu kusoma ukurasa wa utangulizi kuhusu [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Jukumu la Gasper {#role-of-gasper}

Gasper inakaa juu ya mnyororo wa vitalu wa Uthibitisho wa Dau ambapo nodi hutoa Etha kama amana ya usalama ambayo inaweza kuteketezwa ikiwa ni wavivu au wasio waaminifu katika kupendekeza au kuthibitisha vitalu. Gasper ni utaratibu unaofafanua jinsi wathibitishaji wanavyopata thawabu na kuadhibiwa, kuamua ni vitalu vipi vya kukubali na kukataa, na ni mchepuo upi wa mnyororo wa vitalu wa kujenga juu yake.

## Ukamilifu ni nini? {#what-is-finality}

Ukamilifu ni sifa ya vitalu fulani ambayo inamaanisha haviwezi kutenguliwa isipokuwa kumekuwa na kushindwa muhimu kwa mwafaka na mshambuliaji ameteketeza angalau 1/3 ya jumla ya Etha iliyowekwa dhamana. Vitalu viliokamilishwa vinaweza kufikiriwa kama taarifa ambayo mnyororo wa vitalu una uhakika nayo. Kitalu lazima kipitie utaratibu wa uboreshaji wa hatua mbili ili kitalu kiweze kukamilishwa:

1. Theluthi mbili ya jumla ya Etha iliyowekwa dhamana lazima iwe imepiga kura kuunga mkono kujumuishwa kwa kitalu hicho kwenye mnyororo rasmi. Sharti hili linaboresha kitalu kuwa "kilichohalalishwa". Vitalu vilivyohalalishwa haviwezekani kutenguliwa, lakini vinaweza chini ya masharti fulani.
2. Wakati kitalu kingine kinahalalishwa juu ya kitalu kilichohalalishwa, kinaboreshwa kuwa "kiliokamilishwa". Kukamilisha kitalu ni ufungamanisho wa kujumuisha kitalu kwenye mnyororo rasmi. Hakiwezi kutenguliwa isipokuwa mshambuliaji ateketeze mamilioni ya Etha (mabilioni ya $USD).

Uboreshaji huu wa vitalu hautokei katika kila sloti. Badala yake, ni vitalu vya mpaka wa kipindi pekee vinavyoweza kuhalalishwa na kukamilishwa. Vitalu hivi vinajulikana kama "vituo vya ukaguzi". Uboreshaji unazingatia jozi za vituo vya ukaguzi. "Kiungo cha wingi mkuu" lazima kiwepo kati ya vituo viwili vya ukaguzi vinavyofuatana (yaani, theluthi mbili ya jumla ya Etha iliyowekwa dhamana ikipiga kura kwamba kituo cha ukaguzi B ni mzao sahihi wa kituo cha ukaguzi A) ili kuboresha kituo cha ukaguzi cha zamani zaidi kuwa kiliokamilishwa na kitalu cha hivi karibuni zaidi kuwa kilichohalalishwa.

Kwa sababu ukamilifu unahitaji makubaliano ya theluthi mbili kwamba kitalu ni rasmi, mshambuliaji hawezi kuunda mnyororo mbadala uliokamilishwa bila:

1. Kumiliki au kudhibiti theluthi mbili ya jumla ya Etha iliyowekwa dhamana.
2. Kuteketeza angalau theluthi moja ya jumla ya Etha iliyowekwa dhamana.

Sharti la kwanza linatokea kwa sababu theluthi mbili ya Etha iliyowekwa dhamana inahitajika ili kukamilisha mnyororo. Sharti la pili linatokea kwa sababu ikiwa theluthi mbili ya jumla ya dhamana imepiga kura kuunga mkono michepuo yote miwili, basi theluthi moja lazima iwe imepiga kura kwenye yote miwili. Kupiga kura mara mbili ni sharti la ukataji ambalo lingeathiriwa kwa kiwango cha juu zaidi, na theluthi moja ya jumla ya dhamana ingeteketekezwa. Kufikia Mei 2022, hii inahitaji mshambuliaji kuteketeza takriban dola bilioni 10 za thamani ya Etha. Algoriti inayohalalisha na kukamilisha vitalu katika Gasper ni muundo uliobadilishwa kidogo wa [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Vivutio na Ukataji {#incentives-and-slashing}

Wathibitishaji hupata thawabu kwa kupendekeza na kuthibitisha vitalu kwa uaminifu. Etha hutolewa kama thawabu na kuongezwa kwenye dhamana yao. Kwa upande mwingine, wathibitishaji ambao hawapo na wanashindwa kuchukua hatua wanapoitwa hukosa thawabu hizi na wakati mwingine hupoteza sehemu ndogo ya dhamana yao iliyopo. Hata hivyo, adhabu za kuwa nje ya mtandao ni ndogo na, katika hali nyingi, ni sawa na gharama za fursa za kukosa thawabu. Hata hivyo, baadhi ya vitendo vya mthibitishaji ni vigumu sana kufanya kwa bahati mbaya na vinaashiria nia mbaya, kama vile kupendekeza vitalu vingi kwa sloti moja, kuthibitisha vitalu vingi kwa sloti moja, au kupingana na kura za awali za kituo cha ukaguzi. Hizi ni tabia "zinazoweza kukatwa" ambazo huadhibiwa vikali zaidi—ukataji husababisha sehemu fulani ya dhamana ya mthibitishaji kuteketezwa na mthibitishaji kuondolewa kwenye mtandao wa wathibitishaji. Mchakato huu unachukua siku 36. Siku ya 1, kuna adhabu ya awali ya hadi 1 ETH. Kisha Etha ya mthibitishaji aliyekatwa inavuja polepole katika kipindi chote cha kujitoa, lakini Siku ya 18, wanapokea "adhabu ya uwiano", ambayo ni kubwa zaidi wakati wathibitishaji wengi wanapokatwa karibu wakati huo huo. Adhabu ya juu zaidi ni dhamana yote. Thawabu na adhabu hizi zimeundwa ili kuwapa motisha wathibitishaji waaminifu na kuvunja moyo mashambulizi kwenye mtandao.

### Uvujaji wa Kutotenda {#inactivity-leak}

Pamoja na usalama, Gasper pia hutoa "uhai unaowezekana". Hili ni sharti kwamba mradi theluthi mbili ya jumla ya Etha iliyowekwa dhamana inapiga kura kwa uaminifu na kufuata itifaki, mnyororo utaweza kukamilisha bila kujali shughuli nyingine yoyote (kama vile mashambulizi, masuala ya ucheleweshaji, au ukataji). Kwa maneno mengine, theluthi moja ya jumla ya Etha iliyowekwa dhamana lazima iwe imeathiriwa kwa namna fulani ili kuzuia mnyororo kukamilika. Katika Gasper, kuna mstari wa ziada wa ulinzi dhidi ya kushindwa kwa uhai, unaojulikana kama "uvujaji wa kutotenda". Utaratibu huu unawashwa wakati mnyororo umeshindwa kukamilika kwa zaidi ya vipindi vinne. Wathibitishaji ambao hawathibitishi kikamilifu mnyororo wa walio wengi dhamana yao inavujwa polepole hadi walio wengi wapate tena theluthi mbili ya jumla ya dhamana, kuhakikisha kwamba kushindwa kwa uhai ni kwa muda tu.

### Uchaguzi wa mchepuo {#fork-choice}

Ufafanuzi wa asili wa Casper FFG ulijumuisha algoriti ya kuchagua mchepuko iliyoweka sheria: `follow the chain containing the justified checkpoint that has the greatest height` ambapo urefu unafafanuliwa kama umbali mkubwa zaidi kutoka kwenye kitalu cha asili. Katika Gasper, sheria ya asili ya kuchagua mchepuko imeachwa kwa ajili ya algoriti ya kisasa zaidi inayoitwa LMD-GHOST. Ni muhimu kutambua kwamba chini ya hali ya kawaida, sheria ya kuchagua mchepuko si ya lazima - kuna mpendekezaji wa bloku mmoja kwa kila sloti, na wathibitishaji waaminifu wanaithibitisha. Ni katika hali tu za ukosefu mkubwa wa usawazishaji wa mtandao au wakati mpendekezaji wa bloku asiye mwaminifu amefanya udanganyifu ndipo algoriti ya kuchagua mchepuko inahitajika. Hata hivyo, wakati kesi hizo zinapotokea, algoriti ya kuchagua mchepuko ni ulinzi muhimu unaolinda mnyororo sahihi.

LMD-GHOST inasimama kwa "latest message-driven greedy heaviest observed sub-tree". Hii ni njia yenye maneno mengi ya kitaalamu kufafanua algoriti inayochagua mchepuo wenye uzito mkubwa zaidi uliokusanywa wa uthibitisho kama ule rasmi (greedy heaviest subtree) na kwamba ikiwa jumbe nyingi zinapokelewa kutoka kwa mthibitishaji, ni ule wa hivi karibuni tu unaozingatiwa (latest-message driven). Kabla ya kuongeza kitalu kizito zaidi kwenye mnyororo wake rasmi, kila mthibitishaji hutathmini kila kitalu akitumia sheria hii.

## Usomaji Zaidi {#further-reading}

- [Gasper: Kuunganisha GHOST na Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)