---
title: Gasper
description: Maelezo ya utaratibu wa Gasper wa uthibitisho-wa-hisa.
lang: sw
---

Gasper ni mchanganyiko wa Casper the Friendly Finality Gadget (Casper-FFG) na kanuni ya kuchagua uma ya LMD-GHOST. Kwa pamoja, vipengele hivi huunda utaratibu wa makubaliano unaolinda uthibitisho-wa-hisa wa Ethereum. Casper ni utaratibu unaoboresha bloku fulani kuwa "zilizokamilishwa" ili washiriki wapya kwenye mtandao wawe na uhakika kwamba wanasawazisha mnyororo mkuu. Kanuni ya kuchagua uma hutumia kura zilizokusanywa kuhakikisha nodi zinaweza kuchagua kwa urahisi ile sahihi wakati nyuma zinapotokea kwenye mnyororo wa bloku.

**Kumbuka** kwamba ufafanuzi wa awali wa Casper-FFG ulisasishwa kidogo ili ujumuishwe katika Gasper. Kwenye ukurasa huu tunazingatia toleo lililosasishwa.

## Masharti

Ili kuelewa nyenzo hii ni muhimu kusoma ukurasa wa utangulizi kuhusu [uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos/).

## Jukumu la Gasper {#role-of-gasper}

Gasper ipo juu ya mnyororo wa bloku wa uthibitisho-wa-hisa ambapo nodi hutoa ether kama amana ya usalama ambayo inaweza kuharibiwa ikiwa ni wazembe au wadanganyifu katika kupendekeza au kuthibitisha bloku. Gasper ni utaratibu unaofafanua jinsi wathibitishaji wanavyopata zawadi na kuadhibiwa, kuamua ni bloku zipi za kukubali na kukataa, na ni uma upi wa mnyororo wa bloku wa kujenga juu yake.

## Mwisho ni nini? {#what-is-finality}

Mwisho ni sifa ya bloku fulani ambayo inamaanisha haziwezi kurejeshwa isipokuwa kumekuwa na hitilafu kubwa ya makubaliano na mshambulizi ameharibu angalau 1/3 ya jumla ya ether iliyohusishwa. Bloku zilizokamilishwa zinaweza kufikiriwa kama taarifa ambayo mnyororo wa bloku una uhakika nayo. Bloku lazima ipitie utaratibu wa uboreshaji wa hatua mbili ili bloku ikamilishwe:

1. Theluthi mbili ya jumla ya ether iliyohusishwa lazima iwe imepiga kura kuunga mkono ujumuishwaji wa bloku hiyo katika mnyororo mkuu. Hali hii inaboresha bloku kuwa "iliyohalalishwa". Bloku zilizohalalishwa haziwezekani kurejeshwa, lakini zinaweza kurejeshwa chini ya hali fulani.
2. Wakati bloku nyingine inapohalalishwa juu ya bloku iliyohalalishwa, inaboreshwa kuwa "iliyokamilishwa". Kukamilisha bloku ni ahadi ya kujumuisha bloku hiyo katika mnyororo mkuu. Haiwezi kurejeshwa isipokuwa mshambulizi aharibu mamilioni ya ether (mabilioni ya $USD).

Maboresho haya ya bloku hayatokei katika kila slot. Badala yake, ni bloku za mpaka wa kipindi pekee zinazoweza kuhalalishwa na kukamilishwa. Bloku hizi zinajulikana kama "vituo vya ukaguzi". Uboreshaji huzingatia jozi za vituo vya ukaguzi. "Kiungo cha walio wengi zaidi" lazima kiwepo kati ya vituo viwili vya ukaguzi vinavyofuatana (yaani, theluthi mbili ya jumla ya ether iliyohusishwa ikipiga kura kwamba kituo cha ukaguzi B ndicho kizazi sahihi cha kituo cha ukaguzi A) ili kuboresha kituo cha ukaguzi cha zamani zaidi kuwa kilichokamilishwa na bloku ya hivi karibuni zaidi kuwa iliyohalalishwa.

Kwa sababu mwisho unahitaji makubaliano ya theluthi mbili kwamba bloku ni ya kikanuni, mshambulizi hawezi kabisa kuunda mnyororo mbadala uliokamilishwa bila:

1. Kumiliki au kuchezea theluthi mbili ya jumla ya ether iliyohusishwa.
2. Kuharibu angalau theluthi moja ya jumla ya ether iliyohusishwa.

Hali ya kwanza inatokea kwa sababu theluthi mbili ya ether iliyohusishwa inahitajika kukamilisha mnyororo. Hali ya pili inatokea kwa sababu ikiwa theluthi mbili ya hisa yote imepiga kura kuunga mkono nyuma zote mbili, basi theluthi moja lazima iwe imepiga kura kwa zote mbili. Kupiga kura mara mbili ni hali ya "slashing" ambayo ingeadhibiwa vikali zaidi, na theluthi moja ya hisa yote ingeharibiwa. Kufikia Mei 2022, hii inahitaji mshambulizi kuchoma takriban ether yenye thamani ya dola bilioni 10. Kanuni inayohalalisha na kukamilisha bloku katika Gasper ni aina iliyobadilishwa kidogo ya [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Vivutio na Slashing {#incentives-and-slashing}

Wathibitishaji hupata zawadi kwa kupendekeza na kuthibitisha bloku kwa uaminifu. Ether hutolewa kama zawadi na kuongezwa kwenye hisa yao. Kwa upande mwingine, wathibitishaji ambao hawapo na wanashindwa kutenda wanapoitwa hukosa zawadi hizi na wakati mwingine hupoteza sehemu ndogo ya hisa yao iliyopo. Hata hivyo, adhabu za kutokuwa mtandaoni ni ndogo na, katika visa vingi, ni sawa na gharama za fursa za kukosa zawadi. Hata hivyo, baadhi ya vitendo vya wathibitishaji ni vigumu sana kufanya kwa bahati mbaya na huashiria nia mbaya, kama vile kupendekeza bloku nyingi kwa slot moja, kuthibitisha bloku nyingi kwa slot moja, au kupingana na kura za awali za kituo cha ukaguzi. Hizi ni tabia "zinazoweza kupigwa slashing" ambazo huadhibiwa vikali zaidi—slashing husababisha sehemu ya hisa ya mthibitishaji kuharibiwa na mthibitishaji kuondolewa kwenye mtandao wa wathibitishaji. Mchakato huu huchukua siku 36. Siku ya 1, kuna adhabu ya awali ya hadi ETH 1. Kisha ether ya mthibitishaji aliyepigwa slashing hupungua polepole katika kipindi cha kutoka, lakini Siku ya 18, wanapokea "adhabu ya uwiano", ambayo ni kubwa zaidi wakati wathibitishaji wengi wanapigwa slashing kwa wakati mmoja. Adhabu ya juu zaidi ni hisa nzima. Zawadi na adhabu hizi zimeundwa kuwahamasisha wathibitishaji waaminifu na kuzuia mashambulizi kwenye mtandao.

### Uvujaji wa Kutofanya Kazi {#inactivity-leak}

Pamoja na usalama, Gasper pia hutoa "uhai unaowezekana". Hii ndiyo hali ambayo maadamu theluthi mbili ya jumla ya ether iliyohusishwa inapiga kura kwa uaminifu na kufuata itifaki, mnyororo utaweza kukamilika bila kujali shughuli nyingine yoyote (kama vile mashambulizi, masuala ya kusubiri, au slashing). Kwa maneno mengine, theluthi moja ya jumla ya ether iliyohusishwa lazima iathiriwe kwa namna fulani ili kuzuia mnyororo kukamilika. Katika Gasper, kuna mstari wa ziada wa ulinzi dhidi ya kushindwa kwa uhai, unaojulikana kama "uvujaji wa kutofanya kazi". Utaratibu huu huwashwa mnyororo unaposhindwa kukamilika kwa zaidi ya vipindi vinne. Wathibitishaji ambao hawathibitishi kikamilifu mnyororo wa wengi hisa yao hupunguzwa polepole hadi wengi wapate tena theluthi mbili ya hisa yote, kuhakikisha kwamba kushindwa kwa uhai ni kwa muda tu.

### Uchaguzi wa uma {#fork-choice}

Ufafanuzi wa awali wa Casper-FFG ulijumuisha kanuni ya kuchagua uma iliyoweka sheria: `fuata mnyororo ulio na kituo cha ukaguzi kilichohalalishwa chenye urefu mrefu zaidi` ambapo urefu unafafanuliwa kama umbali mrefu zaidi kutoka kwa bloku ya mwanzo. Katika Gasper, sheria ya awali ya kuchagua uma imeachwa kwa ajili ya kanuni ya hali ya juu zaidi iitwayo LMD-GHOST. Ni muhimu kutambua kwamba chini ya hali za kawaida, sheria ya kuchagua uma si ya lazima - kuna mpendekezaji mmoja wa bloku kwa kila slot, na wathibitishaji waaminifu wanathibitisha. Ni katika visa vya kutokuwa na usawazishaji mkubwa wa mtandao tu au wakati mpendekezaji wa bloku asiye mwaminifu ametoa taarifa za kupotosha ndipo kanuni ya kuchagua uma inahitajika. Hata hivyo, visa hivyo vinapotokea, kanuni ya kuchagua uma ni ulinzi muhimu unaolinda mnyororo sahihi.

LMD-GHOST inasimama kwa ajili ya "mti mdogo mzito zaidi uliozingatiwa unaoendeshwa na ujumbe wa hivi karibuni". Hii ni njia yenye jargon nyingi ya kufafanua kanuni inayochagua uma wenye uzito mwingi zaidi wa uthibitisho kama ule wa kikanuni (mti mdogo mzito zaidi wenye tamaa) na kwamba ikiwa ujumbe mwingi unapokelewa kutoka kwa mthibitishaji, ni ule wa hivi karibuni tu unaozingatiwa (unaoendeshwa na ujumbe wa hivi karibuni). Kabla ya kuongeza bloku nzito zaidi kwenye mnyororo wake mkuu, kila mthibitishaji hutathmini kila bloku kwa kutumia sheria hii.

## Masomo zaidi {#further-reading}

- [Gasper: Kuunganisha GHOST na Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
