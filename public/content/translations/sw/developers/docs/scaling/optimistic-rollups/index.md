---
title: Optimistic rollups
description: "Utangulizi wa optimistic rollups—suluhisho la kuongeza ukubwa linalotumiwa na jamii ya Ethereum."
lang: sw
---

Optimistic rollups ni itifaki za safu ya 2 (L2) zilizoundwa kuongeza kasi ya usindikaji wa safu ya msingi ya Ethereum. Hupunguza hesabu kwenye mnyororo mkuu wa Ethereum kwa kushughulikia miamala nje ya mnyororo, na hivyo kutoa maboresho makubwa katika kasi za usindikaji. Tofauti na suluhisho zingine za kuongeza ukubwa, kama vile [sidechains](/developers/docs/scaling/sidechains/), optimistic rollups hupata usalama kutoka kwa Mtandao Mkuu kwa kuchapisha matokeo ya muamala kwenye mnyororo, au [minyororo ya plasma](/developers/docs/scaling/plasma/), ambayo pia huthibitisha miamala kwenye Ethereum kwa kutumia thibitisho za ulaghai, lakini huhifadhi data ya muamala mahali pengine.

Kwa kuwa hesabu ni sehemu ya polepole na ya gharama kubwa ya kutumia Ethereum, optimistic rollups zinaweza kutoa maboresho ya hadi mara 10-100 katika kuongeza ukubwa. Optimistic rollups pia huandika miamala kwa Ethereum kama `calldata` au katika [blobs](/roadmap/danksharding/), na hivyo kupunguza gharama za gesi kwa watumiaji.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa kurasa zetu kuhusu [Uongezwaji wa Ethereum](/developers/docs/scaling/) na [safu ya 2](/layer-2/).

## Optimistic rollup ni nini? {#what-is-an-optimistic-rollup}

Optimistic rollup ni mbinu ya kuongeza ukubwa wa Ethereum ambayo inahusisha kuhamisha hesabu na hifadhi ya hali nje ya mnyororo. Optimistic rollups hutekeleza miamala nje ya Ethereum, lakini hutuma data ya muamala kwa Mtandao Mkuu kama `calldata` au katika [blobs](/roadmap/danksharding/).

Waendeshaji wa optimistic rollup hukusanya miamala mingi ya nje ya mnyororo pamoja katika makundi makubwa kabla ya kuiwasilisha kwa Ethereum. Mbinu hii huwezesha kueneza gharama zisizobadilika kwa miamala mingi katika kila kundi, na hivyo kupunguza ada kwa watumiaji wa mwisho. Optimistic rollups pia hutumia mbinu za ukandamizaji ili kupunguza kiasi cha data inayotumwa kwenye Ethereum.

Uboreshaji wa matumaini unachukuliwa kuwa "wenye matumaini" kwa sababu wanadhania kwamba miamala ya nje ya mtandao ni halali na haichapishi uthibitisho wa uhalali wa bechi za miamala zilizochapishwa kwenye mnyororo. Hii hutenganisha optimistic rollups na [zero-knowledge rollups](/developers/docs/scaling/zk-rollups) ambazo huchapisha [thibitisho za uhalali](/glossary/#validity-proof) za kriptografia kwa miamala ya nje ya mnyororo.

Badala yake, optimistic rollups hutegemea mpango wa kuthibitisha ulaghai ili kugundua visa ambapo miamala haijahesabiwa kwa usahihi. Baada ya kundi la rollup kuwasilishwa kwenye Ethereum, kuna muda maalum (unaoitwa kipindi cha changamoto) ambapo mtu yeyote anaweza kupinga matokeo ya muamala wa rollup kwa kukokotoa [thibitisho la ulaghai](/glossary/#fraud-proof).

Ikiwa thibitisho la ulaghai litafaulu, itifaki ya rollup hutekeleza tena muamala (miamala) na kusasisha hali ya rollup ipasavyo. Athari nyingine ya uthibitisho wa ulaghai uliofaulu ni kwamba mfuataji wa mpangilio anayehusika na kujumuisha muamala uliotekelezwa vibaya kwenye kizuizi hupokea adhabu.

Ikiwa kundi la makusanyoa litasalia bila kupingwa (yaani, miamala yote itatekelezwa ipasavyo) baada ya kipindi cha changamoto kuisha, itachukuliwa kuwa halali na kukubaliwa kwenye Ethereum. Wengine wanaweza kuendelea kujenga juu ya kizuizi ambacho hakijathibitishwa, lakini kwa tahadhari: matokeo ya muamala yatatenguliwa ikiwa kulingana na muamala usio sahihi uliochapishwa hapo awali.

## Je, optimistic rollups huingilianaje na Ethereum? {#optimistic-rollups-and-Ethereum}

Optimistic rollups ni [suluhisho za kuongeza ukubwa nje ya mnyororo](/developers/docs/scaling/#offchain-scaling) zilizoundwa ili kufanya kazi juu ya Ethereum. Kila optimistic rollup husimamiwa na seti ya mikataba-erevu iliyotumwa kwenye mtandao wa Ethereum. Usambazaji wenye matumaini huchakata miamala kutoka kwa mnyororo mkuu wa Ethereum, lakini miamala ya baada ya nje ya mnyororo (kwa makundi) hadi kwenye mkataba wa kukuza mtandao wa mnyororo. Kama mnyororo wa bloku wa Ethereum, rekodi hii ya muamala haibadiliki na huunda "mnyororo wa optimistic rollup."

Muundo wa optimistic rollup unajumuisha sehemu zifuatazo:

**Mikataba ya kwenye mnyororo**: Uendeshaji wa optimistic rollup unadhibitiwa na mikataba-erevu inayoendeshwa kwenye Ethereum. Hii inajumuisha mikataba inayohifadhi bloku za rollup, kufuatilia sasisho za hali kwenye rollup, na kufuatilia amana za watumiaji. Kwa maana hii, Ethereum hutumika kama safu ya msingi au "safu ya 1" kwa optimistic rollups.

**Mashine halisi ya nje ya mnyororo (VM)**: Ingawa mikataba inayosimamia itifaki ya optimistic rollup inaendeshwa kwenye Ethereum, itifaki ya rollup hufanya hesabu na hifadhi ya hali kwenye mashine nyingine halisi tofauti na [Mashine Halisi ya Ethereum](/developers/docs/evm/). Nje ya mnyrooro VM ni mahali ambapo maombi mubashara na mabadiliko ya hali yanatekelezwa; hutumika kama safu ya juu au "safu ya 2" kwa safu ya matumaini.

Kwa vile makusanyo ya matumaini yameundwa ili kuendesha programu ama zilizoandikwa au kukusanywa kwa ajili ya EVM, VM ya nje ya mnyororo hujumuisha vipimo vingi vya muundo wa EVM. Zaidi ya hayo, thibitisho za ulaghai zilizokokotwa kwenye mnyororo huuruhusu mtandao wa Ethereum kutekeleza uhalali wa mabadiliko ya hali yaliyokokotwa kwenye VM ya nje ya mnyororo.

Mipangilio yenye matumaini inafafanuliwa kuwa 'suluhisho mseto za kuongeza uwezu wa mtandao ' kwa sababu, ingawa zipo kama itifaki tofauti, sifa zao za usalama zinatokana na Ethereum. Miongoni mwa mambo mengine, Ethereum inahakikisha usahihi wa hesabu ya nje ya mnyororo ya makusanyo na upatikanaji wa data nyuma ya hesabu. Hii inafanya optimistic rollups kuwa salama zaidi kuliko itifaki za uongezaji za nje ya mnyororo (k.m., [sidechains](/developers/docs/scaling/sidechains/)) ambazo hazitegemei Ethereum kwa usalama.

Optimistic rollups hutegemea itifaki kuu ya Ethereum kwa yafuatayo:

### Upatikanaji wa data {#data-availability}

Kama ilivyoelezwa, optimistic rollups huchapisha data ya muamala kwenye Ethereum kama `calldata` au [blobs](/roadmap/danksharding/). Kwa kuwa utekelezaji wa mnyororo wa rollup unategemea miamala iliyowasilishwa, mtu yeyote anaweza kutumia taarifa hii—iliyotiwa nanga kwenye safu ya msingi ya Ethereum—kutekeleza hali ya rollup na kuthibitisha usahihi wa mabadiliko ya hali.

Upatikanaji wa data ni muhimu sana kwa sababu bila ufikiaji wa data ya hali, wapinzani hawawezi kuunda thibitisho za ulaghai ili kupinga utendakazi batili wa rollup. Huku Ethereum ikitoa upatikanaji wa data, hatari ya waendeshaji orodha kuepuka vitendo viovu (k.m., kuwasilisha vizuizi batili) hupunguzwa.

### Ukinzani dhidi ya udhibiti {#censorship-resistance}

Optimistic rollups pia hutegemea Ethereum kwa ajili ya ukinzani dhidi ya udhibiti. Katika optimistic rollup, huluki ya kati (opereta) inawajibika kwa kuchakata miamala na kuwasilisha bloku za rollup kwa Ethereum. Hii ina baadhi ya athari:

- Waendeshaji wa rollup wanaweza kudhibiti watumiaji kwa kutokuwa mtandaoni kabisa, au kwa kukataa kutoa bloku zinazojumuisha miamala fulani ndani yake.

- Waendeshaji wa makusanyo wanaweza kuzuia watumiaji kutoa pesa zilizowekwa katika mkataba wa uwasilishaji kwa kushikilia data ya majimbo muhimu kwa uthibitisho wa umiliki wa Merkle. Data ya jimbo iliyozuiliwa inaweza pia kuficha hali ya uwasilishaji kutoka kwa watumiaji na kuwazuia kuingiliana na ukusanyaji.

Mkusanyo yenye matumaini hutatua tatizo hili kwa kuwalazimisha waendeshaji kuchapisha data inayohusiana na maboresho ya jimbo kwenye Ethereum. Kuchapisha data ya rollup kwenye mnyororo kuna faida zifuatazo:

- Ikiwa opereta wa optimistic rollup ataenda nje ya mtandao au ataacha kutoa makundi ya miamala, nodi nyingine inaweza kutumia data inayopatikana ili kuzalisha upya hali ya mwisho ya rollup na kuendelea na uzalishaji wa bloku.

- Watumiaji wanaweza kutumia data ya muamala kuunda thibitisho za Merkle zinazothibitisha umiliki wa fedha na kutoa mali zao kutoka kwenye rollup.

- Watumiaji wanaweza pia kuwasilisha miamala yao kwenye L1 badala ya kwa mratibu wa mfuatano, ambapo mratibu wa mfuatano atalazimika kujumuisha muamala huo ndani ya muda maalum ili kuendelea kutoa bloku halali.

### Marekebisho {#settlement}

Jukumu lingine ambalo Ethereum inacheza katika muktadha wa optimistic rollups ni lile la safu ya suluhu. Safu ya suluhu hutia nanga mfumo mzima wa mnyororo wa bloku, huanzisha usalama, na hutoa umalizikaji wenye lengo ikiwa mzozo utatokea kwenye mnyororo mwingine (optimistic rollups katika kesi hii) unaohitaji usuluhishi.

Mtandao Mkuu wa Ethereum hutoa kitovu kwa optimistic rollups kuthibitisha thibitisho za ulaghai na kutatua mizozo. Zaidi ya hayo, miamala inayofanywa kwenye rollup inakuwa ya mwisho _baada ya_ bloku ya rollup kukubaliwa kwenye Ethereum. Mara tu muamala wa rollup unapowekwa kwenye safu ya msingi ya Ethereum, hauwezi kurejeshwa nyuma (isipokuwa katika kisa kisichowezekana kabisa cha upangaji upya wa mnyororo).

## Je, optimistic rollups hufanyaje kazi? {#how-optimistic-rollups-work}

### Utekelezaji na mkusanyiko wa miamala {#transaction-execution-and-aggregation}

Watumiaji huwasilisha miamala kwa “waendeshaji”, ambao ni nodi zinazohusika na kuchakata miamala kwenye optimistic rollup. Pia anajulikana kama “mthibitishaji” au “mkusanyaji”, mwendeshaji hukusanya miamala, hubana data ya msingi, na kuchapisha bloku kwenye Ethereum.

Ingawa mtu yeyote anaweza kuwa mthibitishaji, wathibitishaji wa optimistic rollup lazima watoe dhamana kabla ya kutoa bloku, sawa na [mfumo wa uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/). Dhamana hii inaweza kupunguzwa ikiwa mthibitishaji atachapisha bloku batili au kujenga juu ya bloku ya zamani lakini batili (hata kama bloku yake ni halali). Kwa njia hii optimistic rollups hutumia motisha za kiuchumi za kripto kuhakikisha wathibitishaji wanatenda kwa uaminifu.

Wathibitishaji wengine kwenye mnyororo wa optimistic rollup wanatarajiwa kutekeleza miamala iliyowasilishwa kwa kutumia nakala yao ya hali ya rollup. Ikiwa hali ya mwisho ya mthibitishaji ni tofauti na hali iliyopendekezwa na opereta, wanaweza kuanzisha changamoto na kukokotoa ushahidi wa ulaghai.

Baadhi ya ukusanyaji wenye matumaini yanaweza kuacha mfumo wa kiidhinishaji usio na ruhusa na kutumia "kifuatiliaji" kimoja kutekeleza mnyororo. Kama vile kihalalishaji, kiratibu huchakata miamala, hutengeneza vizuizi, na kuwasilisha miamala ya kusambaza kwa mnyororo wa L1 (Ethereum).

Mfuatano ni tofauti na mwendeshaji wa kawaida wa kusambaza kwa sababu wana udhibiti mkubwa zaidi wa upangaji wa miamala. Pia, mfuatano wa mpangilio una ufikiaji wa kipaumbele kwa mnyororo wa kusambaza na ndiyo huluki pekee iliyoidhinishwa kuwasilisha miamala kwa mkataba wa ndani ya mnyororo. Miamala kutoka kwa nodi zisizo za mpangilio au watumiaji wa kawaida hupangwa tu kwenye kisanduku pokezi tofauti hadi kipanga mpangilio kijumuishe kwenye kundi jipya.

#### Kuwasilisha bloku za rollup kwa Ethereum {#submitting-blocks-to-ethereum}

Kama ilivyotajwa, mwendeshaji wa kusanyo la matumaini hukusanya miamala ya nje ya mnyororo kwenye kundi na kuituma kwa Ethereum kwa uthibitishaji. Mchakato huu unahusisha kubana data inayohusiana na muamala na kuichapisha kwenye Ethereum kama `calldata` au kwa blobs.

`calldata` ni eneo lisiloweza kurekebishwa, lisilo la kudumu katika mkataba-erevu ambalo hufanya kazi kwa kiasi kikubwa kama [kumbukumbu](/developers/docs/smart-contracts/anatomy/#memory). Wakati `calldata` hudumu kwenye mnyororo kama sehemu ya [kumbukumbu za historia](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) za mnyororo wa bloku, haihifadhiwi kama sehemu ya hali ya Ethereum. Kwa sababu `calldata` haigusi sehemu yoyote ya hali ya Ethereum, ni nafuu zaidi kuliko hali kwa kuhifadhi data kwenye mnyororo.

Neno msingi `calldata` pia hutumiwa katika Solidity kupitisha hoja kwa kazi ya mkataba-erevu wakati wa utekelezaji. `calldata` hubainisha kazi inayoitwa wakati wa muamala na hushikilia ingizo kwa kazi hiyo katika mfumo wa mfuatano holela wa baiti.

Katika muktadha wa optimistic rollups, `calldata` hutumiwa kutuma data ya muamala iliyobanwa kwa mkataba wa kwenye mnyororo. Mtoa huduma wa kusambaza huongeza awamu mpya kwa kuita kitendaji kazi kinachohitajika katika mkataba wa kusambaza na kupitisha data iliyobanwa kama hoja za utendaji kazi. Kutumia `calldata` hupunguza ada za mtumiaji kwa kuwa gharama nyingi ambazo rollups huingia hutokana na kuhifadhi data kwenye mnyororo.

Huu ni [mfano](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) wa uwasilishaji wa kundi la rollup kuonyesha jinsi dhana hii inavyofanya kazi. Mratibu wa mfuatano alianzisha mbinu ya `appendSequencerBatch()` na kupitisha data ya muamala iliyobanwa kama ingizo kwa kutumia `calldata`.

Baadhi ya rollups sasa hutumia blobs kuchapisha makundi ya miamala kwenye Ethereum.

Blobs hazirekebishiki na si za kudumu (kama vile `calldata`) lakini hupunguzwa kutoka kwenye historia baada ya takriban siku 18. Kwa maelezo zaidi kuhusu blobs, angalia [Danksharding](/roadmap/danksharding).

### Ahadi za hali {#state-commitments}

Wakati wowote, hali ya optimistic rollup (akaunti, salio, msimbo wa mkataba, n.k.) hupangwa kama [Mti wa Merkle](/whitepaper/#merkle-trees) unaoitwa “mti wa hali”. Mzizi wa mti huu wa Merkle (mzizi wa jimbo), ambao unarejelea hali ya hivi punde ya upandaji, huharakishwa na kuhifadhiwa katika mkataba wa kuorodhesha. Kila mpito wa jimbo kwenye mnyoro huzalisha hali mpya ya kusambaza, ambayo mtoa huduma hujitolea kwa kukokotoa mzizi wa jimbo jipya.

Opereta anahitajika kuwasilisha mizizi ya zamani ya hali na mizizi mipya ya hali anapochapisha makundi. Ikiwa mzizi wa hali ya zamani unalingana na mzizi wa jimbo uliopo katika mkataba wa ndani ya mnyororo, mwisho hutupwa na kubadilishwa na mzizi wa jimbo jipya.

Opereta wa rollup pia anahitajika kuweka mzizi wa Merkle kwa kundi la muamala lenyewe. Hii inaruhusu mtu yeyote kuthibitisha ujumuishwaji wa muamala katika kundi (kwenye L1) kwa kuwasilisha [uthibitisho wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Ahadi za hali, hasa mizizi ya hali, ni muhimu kwa kuthibitisha usahihi wa mabadiliko ya hali katika optimistic rollup. Mkataba wa ugawaji hukubali mizizi ya jimbo jipya kutoka kwa waendeshaji mara tu baada ya kuchapishwa, lakini inaweza baadaye kufuta mizizi batili ya hali ili kurejesha uwasilishaji katika hali yake sahihi.

### Uthibitishaji wa ulaghai {#fraud-proving}

Kama ilivyoelezwa, optimistic rollups huruhusu mtu yeyote kuchapisha bloku bila kutoa thibitisho za uhalali. Hata hivyo, ili kuhakikisha kuwa mnyoror unasalia kuwa salama, uwasilishaji wa matumaini hubainisha muda ambao mtu yeyote anaweza kupinga mabadiliko ya jimbo. Hivyo, bloku za rollup huitwa “madai” kwani mtu yeyote anaweza kupinga uhalali wake.

Ikiwa mtu atapinga dai, basi itifaki ya rollup itaanzisha ukokotoaji wa ushahidi wa ulaghai. Kila aina ya ushahidi wa ulaghai ni wa mwingiliano—mtu lazima achapishe dai kabla ya mtu mwingine kulipinga. Tofauti iko katika raundi ngapi za mwingiliano zinahitajika ili kukokotoa ushahidi wa ulaghai.

Mifumo ya uthibitishaji wa mwingiliano wa raundi moja hurudia miamala iliyopingwa kwenye L1 ili kugundua madai batili. Itifaki ya ujumuishaji huiga utekelezaji upya wa miamala iliyobishaniwa kwenye L1 (Ethereum) kwa kutumia mkataba wa kithibitishaji, huku hali iliyokokotwa ikibainisha ni nani atashinda shindano hilo. Ikiwa dai la mpinzani kuhusu hali sahihi ya uwasilishaji ni sahihi, mwendeshaji ataadhibiwa kwa kukatwa dhamana yake.

Hata hivyo, kutekeleza tena miamala kwenye L1 ili kugundua ulaghai kunahitaji uchapishaji wa ahadi za jimbo kwa miamala ya mtu binafsi na kuongeza orodha za data lazima zichapishwe kwenye mnyororo. Kurudia miamala pia husababisha gharama kubwa za gesi. Kwa sababu hizi, uboreshaji wa matumaini unabadilika hadi uthibitishaji wa mwingiliano wa pande nyingi, ambao unafikia lengo sawa (yaani, kugundua utendakazi batili) kwa ufanisi zaidi.

#### Uthibitishaji wa mwingiliano wa raundi nyingi {#multi-round-interactive-proving}

Uthibitishaji wa mwingiliano wa pande nyingi unahusisha itifaki ya kurudi na kwenda kati ya mdai na mpinzani inayosimamiwa na mkataba wa kithibitishaji cha L1, ambao hatimaye huamua mhusika mwongo. Baada ya nodi ya L2 kupinga dai, mdai anahitajika kugawanya dai lililopingwa katika nusu mbili sawa. Kila dai la kibinafsi katika kesi hii litakuwa na hatua nyingi za ukokotoaji kama lile lingine.

Mpinzani atachagua dai gani anataka kupinga. Mchakato wa kugawanya (unaoitwa “itifaki ya sehemu mbili”) unaendelea hadi pande zote mbili zinapinga dai kuhusu hatua _moja_ ya utekelezaji. Katika hatua hii, mkataba wa L1 utatatua mzozo kwa kutathmini maagizo (na matokeo yake) ili kumkamata mhusika mdanganyifu.

Mdai anahitajika kutoa “uthibitisho wa hatua moja” unaothibitisha uhalali wa ukokotoaji wa hatua moja uliopingwa. Ikiwa mdai atashindwa kutoa uthibitisho wa hatua moja, au mthibitishaji wa L1 akiona uthibitisho huo ni batili, wanapoteza changamoto.

Baadhi ya dokezo kuhusu aina hii ya ushahidi wa ulaghai:

1. Uthibitishaji wa ulaghai wa mwingiliano wa raundi nyingi unachukuliwa kuwa na ufanisi kwa sababu unapunguza kazi ambayo mnyororo wa L1 lazima ufanye katika usuluhishi wa mizozo. Badala ya kurudia muamala mzima, mnyororo wa L1 unahitaji tu kutekeleza tena hatua moja katika utekelezaji wa rollup.

2. Itifaki za sehemu mbili hupunguza kiasi cha data iliyochapishwa kwenye mnyororo (hakuna haja ya kuchapisha ahadi za hali kwa kila muamala). Pia, miamala ya optimistic rollup haibanwi na kikomo cha gesi cha Ethereum. Kinyume chake, optimistic rollups zinazotekeleza tena miamala lazima zihakikishe muamala wa L2 una kikomo cha chini cha gesi ili kuiga utekelezaji wake ndani ya muamala mmoja wa Ethereum.

3. Sehemu ya dhamana ya mdai mwenye nia mbaya hupewa mpinzani, huku sehemu nyingine ikichomwa. Uchomaji huo huzuia kula njama miongoni mwa wathibitishaji; ikiwa wathibitishaji wawili watakula njama kuanzisha changamoto za uwongo, bado watapoteza sehemu kubwa ya hisa yote.

4. Uthibitishaji wa mwingiliano wa raundi nyingi huhitaji pande zote mbili (mdai na mpinzani) kuchukua hatua ndani ya muda maalum. Kushindwa kuchukua hatua kabla ya muda uliopangwa kuisha husababisha mhusika aliyeshindwa kupoteza changamoto.

#### Kwa nini thibitisho za ulaghai ni muhimu kwa optimistic rollups {#fraud-proof-benefits}

Thibitisho za ulaghai ni muhimu kwa sababu huwezesha _umalizikaji usio na uaminifu_ katika optimistic rollups. Umalizikaji usio na uaminifu ni ubora wa optimistic rollups unaohakikisha kwamba muamala—mradi tu ni halali—hatimaye utathibitishwa.

Nodi zenye nia mbaya zinaweza kujaribu kuchelewesha uthibitisho wa bloku halali ya rollup kwa kuanzisha changamoto za uwongo. Hata hivyo, thibitisho za ulaghai hatimaye zitathibitisha uhalali wa bloku ya rollup na kusababisha ithibitishwe.

Hii pia inahusiana na sifa nyingine ya usalama ya optimistic rollups: uhalali wa mnyororo unategemea kuwepo kwa nodi _moja_ ya uaminifu. Nodi ya uaminifu inaweza kuendeleza mnyororo kwa usahihi kwa kuchapisha madai halali au kupinga madai batili. Vyovyote iwavyo, nodi zenye nia mbaya zinazoingia kwenye mizozo na nodi ya uaminifu zitapoteza hisa zao wakati wa mchakato wa uthibitishaji wa ulaghai.

### Uwezo wa kushirikiana wa L1/L2 {#l1-l2-interoperability}

Ukusanyaji wenye matumaini imeundwa kwa ajili ya ushirikiano na Ethereum Mtandao mkuu na kuruhusu watumiaji kupitisha ujumbe na data kiholela kati ya L1 na L2. Pia zinaoana na EVM, kwa hivyo unaweza kuhamisha [mfumo mtawanyo wa kimamlaka](/developers/docs/dapps/) zilizopo kwenda optimistic rollups au kuunda mfumo mtawanyo wa kimamlaka mpya kwa kutumia zana za maendeleo za Ethereum.

#### 1. Uhamisho wa mali {#asset-movement}

##### Kuingia kwenye rollup

Ili kutumia optimistic rollup, watumiaji huweka ETH, tokeni za ERC-20, na mali zingine zinazokubalika katika mkataba wa [daraja](/developers/docs/bridges/) la rollup kwenye L1. Mkataba wa daraja utarejesha muamala hadi L2, ambapo kiasi sawa cha vipengele hutungwa na kutumwa kwa anwani iliyochaguliwa na mtumiaji kwenye orodha ya matumaini.

Miamala inayotokana na mtumiaji (kama vile amana ya L1 > L2) kwa kawaida huwekwa kwenye foleni hadi mratibu wa mfuatano atakapoziwasilisha tena kwenye mkataba wa rollup. Hata hivyo, ili kuhifadhi upinzani wa udhibiti, uwasilishaji wenye matumaini huruhusu watumiaji kuwasilisha muamala moja kwa moja kwa mkataba wa uongezaji wa mtandao ikiwa umecheleweshwa kupita muda wa juu unaoruhusiwa.

Baadhi ya optimistic rollups huchukua mbinu ya moja kwa moja zaidi kuzuia waratibu wa mfuatano kudhibiti watumiaji. Hapa, kizuizi kinafafanuliwa na miamala yote iliyowasilishwa kwa mkataba wa L1 tangu kizuizi cha awali (k.m., amana) pamoja na miamala iliyochakatwa kwenye mnyororo wa usambazaji. Ikiwa mfuatano utapuuza shughuli ya L1, itachapisha (inawezekana) mzizi wa hali mbaya; kwa hivyo, wafuataji ufuatano hawawezi kuchelewesha jumbe zinazozalishwa na mtumiaji mara tu zitakapowekwa kwenye L1.

##### Kutoka kwenye rollup

Kutoa pesa kutoka kwa optimistic rollup kwenda Ethereum ni ngumu zaidi kutokana na mpango wa uthibitishaji wa ulaghai. Ikiwa mtumiaji ataanzisha muamala wa L2 > L1 ili kutoa fedha zilizowekwa kwenye L1, lazima asubiri hadi kipindi cha changamoto—kinachodumu takriban siku saba—kiishe. Hata hivyo, mchakato wa kutoa pesa wenyewe ni rahisi.

Baada ya ombi la uondoaji kuanzishwa kwenye utayarishaji wa L2, muamala hujumuishwa kwenye kundi linalofuata, huku mali za mtumiaji kwenye uwekaji zikiteketezwa. Pindi kundi linapochapishwa kwenye Ethereum, mtumiaji anaweza kukokotoa uthibitisho wa Merkle unaothibitisha kujumuishwa kwa muamala wao wa kuondoka kwenye kizuizi. Kisha ni suala la kusubiri kupitia kipindi cha kuchelewa ili kukamilisha shughuli kwenye L1 na kutoa fedha kwa Mtandao mkuu.

Ili kuepuka kusubiri wiki moja kabla ya kutoa fedha kwenda Ethereum, watumiaji wa optimistic rollup wanaweza kutumia **mtoa huduma wa ukwasi** (LP). Mtoa huduma wa ukwasi huchukua umiliki wa uondoaji unaosubiri wa L2 na humlipa mtumiaji kwenye L1 (kwa kubadilishana na ada).

Watoa huduma za ukwasi wanaweza kuangalia uhalali wa ombi la mtumiaji la kujiondoa (kwa kutekeleza mnyororo wenyewe) kabla ya kutoa pesa. Kwa njia hii wanakuwa na uhakika kwamba muamala utathibitishwa hatimaye (yaani, umalizikaji usio na uaminifu).

#### 2. Upatanifu wa EVM {#evm-compatibility}

Kwa wasanidi programu, faida ya optimistic rollups ni utangamano wao—au, bora zaidi, usawa—na [Mashine Halisi ya Ethereum (EVM)](/developers/docs/evm/). Rollups zinazoendana na EVM zinatii masharti katika [Karatasi ya Njano ya Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) na kuunga mkono EVM katika kiwango cha bytecode.

Utangamano wa EVM katika optimistic rollups una faida zifuatazo:

i. Wasanifu programu wanaweza kuhamisha mkataba mahiri zilizopo kwenye Ethereum hadi kwa minyororo ya kusambaza yenye matumaini bila kulazimika kurekebisha misingi ya msimbo kwa upana. Hii inaweza kuokoa muda wa timu za maendeleo wakati wa kupeleka mikataba-erevu ya Ethereum kwenye L2.

ii. Wasanidi programu na timu za mradi zinazotumia optimistic rollups wanaweza kutumia miundombinu ya Ethereum. Hii inajumuisha lugha za programu, maktaba za msimbo, zana za majaribio, programu za wateja, miundombinu ya upelekaji, na kadhalika.

Kutumia zana zilizopo ni muhimu kwa sababu zana hizi zimekaguliwa kwa kina, zimerekebishwa, na kuboreshwa kwa miaka mingi. Pia huondoa hitaji la wasanidi wa Ethereum kujifunza jinsi ya kujenga na rundo jipya kabisa la maendeleo.

#### 3. Wito wa mkataba wa minyororo-tofauti {#cross-chain-contract-calls}

Watumiaji (akaunti zinazomilikiwa na kampuni ya nje) huingiliana na mikataba ya L2 kwa kuwasilisha muamala kwa mkataba wa kusajili au kuwa na mfuatano au kithibitishaji kuwafanyia hivyo. Machapisho yenye matumaini pia huruhusu akaunti za mikataba kwenye Ethereum kuingiliana na mikataba ya L2 kwa kutumia mikataba ya kuweka madaraja kutuma ujumbe na kupitisha data kati ya L1 na L2. Hii inamaanisha kuwa unaweza kupanga mkataba wa L1 kwenye Ethereum mtandao mkuu ili kuomba utendaji kazi wa mikataba kwenye uwasilishaji wa matumaini wa L2.

Wito wa mkataba wa minyororo-tofauti hufanyika bila mpangilio maalum—ikimaanisha wito huanzishwa kwanza, kisha hutekelezwa baadaye. Hii ni tofauti na wito kati ya mikataba miwili kwenye Ethereum, ambapo wito hutoa matokeo mara moja.

Mfano wa wito wa mkataba wa minyororo-tofauti ni uwekaji wa tokeni ulioelezewa hapo awali. Mkataba kwenye L1 huondoa tokeni za mtumiaji na kutuma ujumbe kwa mkataba wa L2 uliooanishwa ili kutengeneza kiasi sawa cha tokeni kwenye ukusanyaji.

Kwa vile wito wa ujumbe wa minyororo-tofauti husababisha utekelezaji wa mkataba, mtumaji kwa kawaida huhitajika kulipia [gharama za gesi](/developers/docs/gas/) kwa ajili ya ukokotoaji. Inashauriwa kuweka kikomo cha juu cha gesi ili kuzuia muamala ushindwe kwenye mnyororo lengwa. Hali ya kuweka daraja la ishara ni mfano mzuri; ikiwa upande wa L1 wa shughuli (kuweka ishara) hufanya kazi, lakini upande wa L2 (kutengeneza ishara mpya) hushindwa kutokana na gharama ya muamala ya chini, amana inakuwa isiyoweza kurejeshwa.

Hatimaye, tunapaswa kutambua kwamba wito wa ujumbe wa L2 > L1 kati ya mikataba unahitaji kuzingatia ucheleweshaji (wito wa L1 > L2 kwa kawaida hutekelezwa baada ya dakika chache). Hii ni kwa sababu ujumbe uliotumwa kwa Mtandao Mkuu kutoka kwa optimistic rollup hauwezi kutekelezwa hadi dirisha la changamoto liishe.

## Ada za optimistic rollup hufanyaje kazi? {#how-do-optimistic-rollup-fees-work}

Optimistic rollups hutumia mpango wa ada ya gesi, sawa na Ethereum, kuashiria ni kiasi gani watumiaji hulipa kwa kila muamala. Ada zinazotozwa kwenye optimistic rollups hutegemea vipengele vifuatavyo:

1. **Uandishi wa hali**: Optimistic rollups huchapisha data ya muamala na vichwa vya bloku (vinavyojumuisha hashi ya kichwa cha bloku iliyopita, mzizi wa hali, mzizi wa kundi) kwa Ethereum kama `blob`, au "binary large object". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) ilianzisha suluhisho la gharama nafuu la kujumuisha data kwenye mnyororo. `blob` ni sehemu mpya ya muamala ambayo inaruhusu rollups kuchapisha data ya mabadiliko ya hali iliyobanwa kwa Ethereum L1. Tofauti na `calldata`, ambayo hubaki kwenye mnyororo kabisa, blobs ni za muda mfupi na zinaweza kupunguzwa kutoka kwa wateja baada ya [epochs 4096](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (takriban siku 18). Kwa kutumia blobs kuchapisha makundi ya miamala iliyobanwa, optimistic rollups zinaweza kupunguza kwa kiasi kikubwa gharama ya kuandika miamala kwenye L1.

2. **Gesi ya blob iliyotumika**: Miamala inayobeba blob hutumia utaratibu wa ada unaobadilika sawa na ule ulioletwa na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Ada ya gesi kwa miamala ya aina-3 inazingatia ada ya msingi ya blobs, ambayo huamuliwa na mtandao kulingana na mahitaji ya nafasi ya blob na matumizi ya nafasi ya blob ya muamala unaotumwa.

3. **Ada za opereta wa L2**: Hiki ni kiasi kinacholipwa kwa nodi za rollup kama fidia kwa gharama za ukokotoaji zinazotumika katika kuchakata miamala, sawa na ada za gesi kwenye Ethereum. Nodi za rollup hutoza ada za chini za muamala kwa kuwa L2s zina uwezo wa juu wa uchakataji na hazikabiliwi na msongamano wa mtandao unaowalazimisha wathibitishaji kwenye Ethereum kutoa kipaumbele kwa miamala yenye ada za juu.

Optimistic rollups hutumia mifumo kadhaa kupunguza ada kwa watumiaji, ikiwa ni pamoja na kuweka miamala katika makundi na kubana `calldata` ili kupunguza gharama za uchapishaji wa data. Unaweza kuangalia [kifuatiliaji cha ada za L2](https://l2fees.info/) kwa muhtasari wa wakati halisi wa gharama ya kutumia optimistic rollups zinazotegemea Ethereum.

## Je, optimistic rollups huongezaje ukubwa wa Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Kama ilivyoelezwa, optimistic rollups huchapisha data ya muamala iliyobanwa kwenye Ethereum ili kuhakikisha upatikanaji wa data. Uwezo wa kubana data iliyochapishwa kwenye mnyororo ni muhimu ili kuongeza upitishaji kwenye Ethereum kwa kutumia optimistic rollups.

Mnyororo mkuu wa Ethereum huweka vikomo vya kiasi cha data ambacho bloku zinaweza kushikilia, kinachopimwa kwa vitengo vya gesi ([ukubwa wa wastani wa bloku](/developers/docs/blocks/#block-size) ni gesi milioni 15). Ingawa hii inazuia kiasi cha gesi ambacho kila muamala unaweza kutumia, inamaanisha pia tunaweza kuongeza miamala inayochakatwa kwa kila bloku kwa kupunguza data inayohusiana na muamala—na hivyo kuboresha moja kwa moja uongezaji.

Optimistic rollups hutumia mbinu kadhaa kufikia ubanaji wa data ya muamala na kuboresha viwango vya TPS. Kwa mfano, [makala](https://vitalik.eth.limo/general/2021/01/05/rollup.html) hii inalinganisha data ambayo muamala wa msingi wa mtumiaji (kutuma ether) huzalisha kwenye Mtandao Mkuu dhidi ya kiasi cha data ambacho muamala huo huo huzalisha kwenye rollup:

| Kigezo      | Ethereum (L1)                     | Rollup (L2)       |
| ----------- | ---------------------------------------------------- | ------------------------------------ |
| Nonce       | ~3                                   | 0                                    |
| Bei ya gesi | ~8                                   | 0-0.5                |
| Gesi        | 3                                                    | 0-0.5                |
| Kwa         | 21                                                   | 4                                    |
| Thamani     | 9                                                    | ~3                   |
| Sahihi      | ~68 (2 + 33 + 33) | ~0.5 |
| Kutoka      | 0 (imerejeshwa kutoka kwa sig)    | 4                                    |
| **Jumla**   | **~baiti 112**                       | **~baiti 12**        |

Kufanya hesabu zisizo sahihi kwenye takwimu hizi kunaweza kusaidia kuonyesha uboreshaji wa uwezo wa kupanuka unaotolewa na uwasilishaji wa matumaini:

1. Ukubwa unaolengwa kwa kila bloku ni gesi milioni 15 na inagharimu gesi 16 kuthibitisha baiti moja ya data. Kugawa ukubwa wa wastani wa bloku kwa gesi 16 (15,000,000/16) kunaonyesha kuwa bloku ya wastani inaweza kushikilia **baiti 937,500 za data**.
2. Ikiwa muamala wa msingi wa rollup unatumia baiti 12, basi bloku ya wastani ya Ethereum inaweza kuchakata **miamala 78,125 ya rollup** (937,500/12) au **makundi 39 ya rollup** (ikiwa kila kundi lina wastani wa miamala 2,000).
3. Ikiwa bloku mpya inazalishwa kwenye Ethereum kila sekunde 15, basi kasi ya uchakataji ya rollup ingekuwa takriban **miamala 5,208 kwa sekunde**. Hii inafanywa kwa kugawa idadi ya miamala ya msingi ya rollup ambayo bloku ya Ethereum inaweza kushikilia (**78,125**) kwa wastani wa muda wa bloku (**sekunde 15**).

Huu ni makadirio ya matumaini, kwa kuzingatia kwamba miamala ya optimistic rollup haiwezi kujumuisha bloku nzima kwenye Ethereum. Hata hivyo, inaweza kutoa wazo potofu la ni kiasi gani cha faida za scalability ambazo matoleo yenye matumaini yanaweza kumudu watumiaji wa Ethereum (utekelezaji wa sasa unatoa hadi TPS 2,000).

Kuanzishwa kwa [ugawanyaji wa data](/roadmap/danksharding/) kwenye Ethereum kunatarajiwa kuboresha uongezaji katika optimistic rollups. Kwa sababu miamala ya rollup lazima ishiriki nafasi ya bloku na miamala mingine isiyo ya rollup, uwezo wao wa uchakataji umewekewa mipaka na upitishaji wa data kwenye mnyororo mkuu wa Ethereum. Danksharding itaongeza nafasi inayopatikana kwa minyororo ya L2 kuchapisha data kwa kila bloku, kwa kutumia hifadhi ya "blob" ya bei nafuu, isiyo ya kudumu badala ya `CALLDATA` ya gharama kubwa, ya kudumu.

### Faida na hasara za optimistic rollups {#optimistic-rollups-pros-and-cons}

| Faida                                                                                                                                                                                                     | Hasara                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hutoa maboresho makubwa katika uongezaji bila kuathiri usalama au hali ya kutokuwa na uaminifu.                                                                                           | Ucheleweshaji katika umalizikaji wa muamala kutokana na changamoto zinazowezekana za ulaghai.                                                                         |
| Data ya muamala huhifadhiwa kwenye mnyororo wa safu ya 1, na kuboresha uwazi, usalama, ukinzani dhidi ya udhibiti, na ugatuzi.                                                            | Waendeshaji wa rollup wa kati (waratibu wa mfuatano) wanaweza kuathiri mpangilio wa miamala.                                                       |
| Uthibitishaji wa ulaghai huhakikisha umalizikaji usio na uaminifu na huruhusu walio wachache waaminifu kulinda mnyororo.                                                                  | Ikiwa hakuna nodi za uaminifu, opereta mwenye nia mbaya anaweza kuiba fedha kwa kuchapisha bloku batili na ahadi za hali.                                             |
| Kukokotoa thibitisho za ulaghai kuko wazi kwa nodi ya kawaida ya L2, tofauti na thibitisho za uhalali (zinazotumika katika ZK-rollups) ambazo zinahitaji vifaa maalum. | Mfumo wa usalama unategemea angalau nodi moja ya uaminifu inayotekeleza miamala ya rollup na kuwasilisha thibitisho za ulaghai ili kupinga mabadiliko batili ya hali. |
| Rollups hunufaika na "uhai usio na uaminifu" (mtu yeyote anaweza kulazimisha mnyororo kuendelea kwa kutekeleza miamala na kuchapisha madai)                                            | Watumiaji lazima wasubiri kipindi cha changamoto cha wiki moja kiishe kabla ya kutoa fedha kurudi Ethereum.                                                           |
| Optimistic rollups hutegemea motisha za kiuchumi za kripto zilizoundwa vizuri ili kuongeza usalama kwenye mnyororo.                                                                       | Rollups lazima zichapishe data zote za muamala kwenye mnyororo, jambo ambalo linaweza kuongeza gharama.                                                               |
| Utangamano na EVM na Solidity huruhusu wasanidi programu kuhamisha mikataba-erevu asilia ya Ethereum kwenda kwa rollups au kutumia zana zilizopo kuunda mfumo mtawanyo wa kimamlaka mpya. |                                                                                                                                                                                       |

### Maelezo ya kuona ya optimistic rollups {#optimistic-video}

Wewe ni mwanafunzi wa kuona zaidi? Tazama Finematics ikielezea optimistic rollups:

<YouTube id="7pWxCklcNsU" start="263" />

## Masomo zaidi kuhusu optimistic rollups

- [Jinsi optimistic rollups zinavyofanya kazi (Mwongozo Kamili)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Rollup ya Mnyororo wa Bloku ni Nini? Utangulizi wa Kiufundi](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Mwongozo Muhimu wa Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Mwongozo wa Vitendo wa Rollups za Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Hali ya Thibitisho za Ulaghai katika L2s za Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Je, Rollup ya Optimism inafanyaje kazi kweli?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Uchambuzi wa Kina wa OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Mashine Halisi ya Matumaini ni Nini?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
