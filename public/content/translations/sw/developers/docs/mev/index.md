---
title: Thamani ya juu inayoweza kutolewa (MEV)
description: Utangulizi wa thamani ya juu inayoweza kutolewa (MEV)
lang: sw
---

Thamani ya juu inayoweza kutolewa (MEV) inarejelea thamani ya juu zaidi inayoweza kutolewa kutoka kwa uzalishaji wa kitalu zaidi ya tuzo ya bloku ya kawaida na ada ya gesi kwa kujumuisha, kuondoa, na kubadilisha mpangilio wa miamala katika kitalu.

## Thamani ya juu inayoweza kutolewa {#maximal-extractable-value}

Thamani ya juu inayoweza kutolewa ilitumika kwanza katika muktadha wa [Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow/), na mwanzoni ilijulikana kama "thamani inayoweza kutolewa na mchimbaji". Hii ni kwa sababu katika Uthibitisho wa Kazi, wachimbaji hudhibiti ujumuishaji, uondoaji, na upangaji wa miamala. Hata hivyo, tangu mpito kwenda kwenye Uthibitisho wa Dau (PoS) kupitia [Unganisho](/roadmap/merge) wathibitishaji wamekuwa na jukumu la kazi hizi, na uchimbaji sio tena sehemu ya itifaki ya [Ethereum](/). Mbinu za kutoa thamani bado zipo, kwa hivyo neno "Thamani ya juu inayoweza kutolewa" sasa linatumika badala yake.

## Mahitaji ya awali {#prerequisites}

Hakikisha unafahamu [miamala](/developers/docs/transactions/), [vitalu](/developers/docs/blocks/), [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos) na [gesi](/developers/docs/gas/). Kufahamu [programu tumizi zilizogatuliwa (dapps)](/apps/) na [fedha zilizogatuliwa (DeFi)](/defi/) kunasaidia pia.

## Utoaji wa MEV {#mev-extraction}

Kinadharia MEV hujilimbikiza kabisa kwa wathibitishaji kwa sababu wao ndio upande pekee unaoweza kuhakikisha utekelezaji wa fursa ya MEV yenye faida. Katika vitendo, hata hivyo, sehemu kubwa ya MEV hutolewa na washiriki huru wa mtandao wanaojulikana kama "watafutaji." Watafutaji huendesha algoriti changamano kwenye data ya mnyororo wa vitalu ili kugundua fursa za MEV zenye faida na wana roboti za kuwasilisha kiotomatiki miamala hiyo yenye faida kwenye mtandao.

Wathibitishaji hupata sehemu ya kiasi kamili cha MEV hata hivyo kwa sababu watafutaji wako tayari kulipa ada ya gesi ya juu (ambayo huenda kwa mthibitishaji) badala ya uwezekano mkubwa wa kujumuishwa kwa miamala yao yenye faida katika kitalu. Kwa kudhani watafutaji wana mantiki ya kiuchumi, ada ya gesi ambayo mtafutaji yuko tayari kulipa itakuwa kiasi cha hadi 100% ya MEV ya mtafutaji (kwa sababu ikiwa ada ya gesi ingekuwa kubwa zaidi, mtafutaji angepoteza pesa).

Pamoja na hayo, kwa baadhi ya fursa za MEV zenye ushindani mkubwa, kama vile [usuluhishi wa DEX](#mev-examples-dex-arbitrage), watafutaji wanaweza kulazimika kulipa 90% au hata zaidi ya mapato yao yote ya MEV katika ada ya gesi kwa mthibitishaji kwa sababu watu wengi wanataka kuendesha biashara sawa ya usuluhishi yenye faida. Hii ni kwa sababu njia pekee ya kuhakikisha kuwa muamala wao wa usuluhishi unaendeshwa ni ikiwa watawasilisha muamala na bei ya gesi ya juu zaidi.

### Uchezaji gofu wa gesi (Gas golfing) {#mev-extraction-gas-golfing}

Mabadiliko haya yamefanya kuwa mzuri katika "uchezaji gofu wa gesi" — kupanga miamala ili itumie kiasi kidogo cha gesi — kuwa faida ya ushindani, kwa sababu inaruhusu watafutaji kuweka bei ya gesi ya juu huku wakiweka ada ya gesi yao yote kuwa thabiti (kwa kuwa ada ya gesi = bei ya gesi \* gesi iliyotumika).

Mbinu chache zinazojulikana za uchezaji gofu wa gesi ni pamoja na: kutumia anwani zinazoanza na msururu mrefu wa sufuri (k.m., [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) kwa kuwa zinachukua nafasi ndogo (na hivyo gesi) kuhifadhi; na kuacha salio dogo la tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/) katika mikataba, kwa kuwa inagharimu gesi zaidi kuanzisha sloti ya hifadhi (ikiwa salio ni 0) kuliko kusasisha sloti ya hifadhi. Kutafuta mbinu zaidi za kupunguza matumizi ya gesi ni eneo amilifu la utafiti miongoni mwa watafutaji.

### Waendeshaji wa mbele wa jumla (Generalized frontrunners) {#mev-extraction-generalized-frontrunners}

Badala ya kupanga algoriti changamano ili kugundua fursa za MEV zenye faida, baadhi ya watafutaji huendesha waendeshaji wa mbele wa jumla. Waendeshaji wa mbele wa jumla ni roboti zinazotazama mempool ili kugundua miamala yenye faida. Mwendeshaji wa mbele atanakili msimbo wa muamala unaoweza kuwa na faida, kubadilisha anwani na anwani ya mwendeshaji wa mbele, na kuendesha muamala ndani ya nchi ili kuangalia mara mbili kwamba muamala uliorekebishwa unaleta faida kwa anwani ya mwendeshaji wa mbele. Ikiwa muamala una faida kweli, mwendeshaji wa mbele atawasilisha muamala uliorekebishwa na anwani iliyobadilishwa na bei ya gesi ya juu, "akiendesha mbele" muamala wa asili na kupata MEV ya mtafutaji wa asili.

### Flashbots {#mev-extraction-flashbots}

Flashbots ni mradi huru ambao hupanua viteja vya utekelezaji na huduma inayoruhusu watafutaji kuwasilisha miamala ya MEV kwa wathibitishaji bila kuifichua kwa mempool ya umma. Hii inazuia miamala kuendeshwa mbele na waendeshaji wa mbele wa jumla.

## Mifano ya MEV {#mev-examples}

MEV huibuka kwenye mnyororo wa vitalu kwa njia chache.

### Usuluhishi wa DEX {#mev-examples-dex-arbitrage}

Usuluhishi wa [Soko la ubadilishanaji lililogatuliwa](/glossary/#dex) (DEX) ni fursa rahisi na inayojulikana zaidi ya MEV. Kama matokeo, pia ni yenye ushindani zaidi.

Inafanya kazi hivi: ikiwa DEX mbili zinatoa tokeni kwa bei mbili tofauti, mtu anaweza kununua tokeni kwenye DEX yenye bei ya chini na kuiuza kwenye DEX yenye bei ya juu katika muamala mmoja, wa atomiki. Shukrani kwa mitambo ya mnyororo wa vitalu, huu ni usuluhishi wa kweli, usio na hatari.

[Huu hapa ni mfano](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) wa muamala wa usuluhishi wenye faida ambapo mtafutaji alibadilisha 1,000 ETH kuwa 1,045 ETH kwa kuchukua faida ya bei tofauti ya jozi ya ETH/DAI kwenye Uniswap dhidi ya Sushiswap.

### Ufilisishaji {#mev-examples-liquidations}

Ufilisishaji wa itifaki ya ukopeshaji unawasilisha fursa nyingine inayojulikana ya MEV.

Itifaki za ukopeshaji kama Maker na Aave zinahitaji watumiaji kuweka dhamana fulani (k.m., ETH). Dhamana hii iliyowekwa kisha inatumika kukopesha watumiaji wengine.

Watumiaji wanaweza kisha kukopa rasilimali na tokeni kutoka kwa wengine kulingana na kile wanachohitaji (k.m., unaweza kukopa MKR ikiwa unataka kupiga kura katika pendekezo la utawala la MakerDAO) hadi asilimia fulani ya dhamana yao iliyowekwa. Kwa mfano, ikiwa kiasi cha ukopaji ni cha juu cha 30%, mtumiaji anayeweka 100 DAI kwenye itifaki anaweza kukopa hadi thamani ya 30 DAI ya rasilimali nyingine. Itifaki huamua asilimia kamili ya nguvu ya ukopaji.

Kadiri thamani ya dhamana ya mkopaji inavyobadilika, ndivyo pia nguvu yao ya ukopaji. Ikiwa, kutokana na mabadiliko ya soko, thamani ya rasilimali zilizokopwa inazidi tuseme, 30% ya thamani ya dhamana yao (tena, asilimia kamili imedhamiriwa na itifaki), itifaki kwa kawaida inaruhusu mtu yeyote kufilisisha dhamana, na kuwalipa wakopeshaji mara moja (hii ni sawa na jinsi [wito wa kiasi (margin calls)](https://www.investopedia.com/terms/m/margincall.asp) unavyofanya kazi katika fedha za jadi). Ikiwa imefilisishwa, mkopaji kwa kawaida anapaswa kulipa ada kubwa ya ufilisishaji, ambayo baadhi yake huenda kwa mfilisishaji — ambapo fursa ya MEV inaingia.

Watafutaji hushindana kuchanganua data ya mnyororo wa vitalu haraka iwezekanavyo ili kubaini ni wakopaji gani wanaweza kufilisishwa na kuwa wa kwanza kuwasilisha muamala wa ufilisishaji na kukusanya ada ya ufilisishaji kwa ajili yao wenyewe.

### Biashara ya Sandwichi {#mev-examples-sandwich-trading}

Biashara ya Sandwichi ni njia nyingine ya kawaida ya utoaji wa MEV.

Ili kufanya sandwichi, mtafutaji atatazama mempool kwa biashara kubwa za DEX. Kwa mfano, tuseme mtu anataka kununua 10,000 UNI kwa DAI kwenye Uniswap. Biashara ya ukubwa huu itakuwa na athari ya maana kwenye jozi ya UNI/DAI, na uwezekano wa kupandisha bei ya UNI kwa kiasi kikubwa ikilinganishwa na DAI.

Mtafutaji anaweza kuhesabu takriban athari ya bei ya biashara hii kubwa kwenye jozi ya UNI/DAI na kutekeleza agizo bora la ununuzi mara moja _kabla_ ya biashara kubwa, kununua UNI kwa bei nafuu, kisha kutekeleza agizo la kuuza mara moja _baada_ ya biashara kubwa, kuiuza kwa bei ya juu iliyosababishwa na agizo kubwa.

Kufanya sandwichi, hata hivyo, ni hatari zaidi kwani sio ya atomiki (tofauti na usuluhishi wa DEX, kama ilivyoelezwa hapo juu) na inakabiliwa na [shambulio la salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV ya NFT {#mev-examples-nfts}

MEV katika nafasi ya NFT ni jambo linaloibuka, na sio lazima liwe na faida.

Hata hivyo, kwa kuwa miamala ya NFT hufanyika kwenye mnyororo wa vitalu sawa unaoshirikiwa na miamala mingine yote ya Ethereum, watafutaji wanaweza kutumia mbinu sawa na zile zinazotumiwa katika fursa za jadi za MEV katika soko la NFT pia.

Kwa mfano, ikiwa kuna utoaji maarufu wa NFT na mtafutaji anataka NFT fulani au seti ya NFT, wanaweza kupanga muamala kiasi kwamba wao ni wa kwanza kwenye mstari kununua NFT, au wanaweza kununua seti nzima ya NFT katika muamala mmoja. Au ikiwa NFT [imeorodheshwa kimakosa kwa bei ya chini](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), mtafutaji anaweza kuwaendesha mbele wanunuzi wengine na kuinyakua kwa bei nafuu.

Mfano mmoja maarufu wa MEV ya NFT ulitokea wakati mtafutaji alitumia dola milioni 7 [kununua](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) kila Cryptopunk kwenye bei ya chini. Mtafiti wa mnyororo wa vitalu [alieleza kwenye Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) jinsi mnunuzi alivyofanya kazi na mtoa huduma wa MEV ili kuweka ununuzi wao siri.

### Mkia mrefu (The long tail) {#mev-examples-long-tail}

Usuluhishi wa DEX, ufilisishaji, na biashara ya sandwichi zote ni fursa za MEV zinazojulikana sana na haziwezekani kuwa na faida kwa watafutaji wapya. Hata hivyo, kuna mkia mrefu wa fursa za MEV zisizojulikana sana (MEV ya NFT bila shaka ni fursa mojawapo).

Watafutaji ambao ndio wanaanza wanaweza kupata mafanikio zaidi kwa kutafuta MEV katika mkia huu mrefu zaidi. [Ubao wa kazi wa MEV](https://github.com/flashbots/mev-job-board) wa Flashbots unaorodhesha baadhi ya fursa zinazoibuka.

## Athari za MEV {#effects-of-mev}

MEV sio mbaya yote — kuna matokeo chanya na hasi kwa MEV kwenye Ethereum.

### Mazuri {#effects-of-mev-the-good}

Miradi mingi ya fedha zilizogatuliwa (DeFi) inategemea watendaji wenye mantiki ya kiuchumi ili kuhakikisha manufaa na uthabiti wa itifaki zao. Kwa mfano, usuluhishi wa DEX unahakikisha kwamba watumiaji wanapata bei bora na sahihi zaidi kwa tokeni zao, na itifaki za ukopeshaji zinategemea ufilisishaji wa haraka wakati wakopaji wanapoanguka chini ya uwiano wa dhamana ili kuhakikisha wakopeshaji wanalipwa.

Bila watafutaji wenye mantiki wanaotafuta na kurekebisha ukosefu wa ufanisi wa kiuchumi na kuchukua faida ya motisha za kiuchumi za itifaki, itifaki za DeFi na programu tumizi zilizogatuliwa (dapps) kwa ujumla haziwezi kuwa imara kama zilivyo leo.

### Mabaya {#effects-of-mev-the-bad}

Katika tabaka la programu tumizi, baadhi ya aina za MEV, kama biashara ya sandwichi, husababisha uzoefu mbaya zaidi kwa watumiaji. Watumiaji ambao wamefanywa sandwichi wanakabiliwa na tofauti ya utekelezaji iliyoongezeka na utekelezaji mbaya zaidi kwenye biashara zao.

Katika tabaka la mtandao, waendeshaji wa mbele wa jumla na minada ya bei ya gesi wanayojihusisha nayo mara nyingi (wakati waendeshaji wa mbele wawili au zaidi wanashindana ili muamala wao ujumuishwe katika kitalu kinachofuata kwa kupandisha bei ya gesi ya miamala yao wenyewe hatua kwa hatua) husababisha msongamano wa mtandao na bei ya gesi ya juu kwa kila mtu mwingine anayejaribu kuendesha miamala ya kawaida.

Zaidi ya kile kinachotokea _ndani_ ya vitalu, MEV inaweza kuwa na athari mbaya _kati_ ya vitalu. Ikiwa MEV inayopatikana katika kitalu inazidi kwa kiasi kikubwa tuzo ya bloku ya kawaida, wathibitishaji wanaweza kuhamasishwa kufanya upangaji upya wa vitalu na kujinyakulia MEV wenyewe, na kusababisha upangaji upya wa mnyororo wa vitalu na ukosefu wa uthabiti wa mwafaka.

Uwezekano huu wa upangaji upya wa mnyororo wa vitalu [umechunguzwa hapo awali kwenye mnyororo wa vitalu wa Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Kadiri tuzo ya bloku ya Bitcoin inavyopungua nusu na ada za muamala zinaunda sehemu kubwa zaidi ya tuzo ya bloku, hali hujitokeza ambapo inakuwa na mantiki ya kiuchumi kwa wachimbaji kuacha tuzo ya kitalu kinachofuata na badala yake kuchimba upya vitalu vilivyopita vyenye ada kubwa zaidi. Pamoja na ukuaji wa MEV, aina hiyo hiyo ya hali inaweza kutokea katika Ethereum, na kutishia uadilifu wa mnyororo wa vitalu.

## Hali ya MEV {#state-of-mev}

Utoaji wa MEV uliongezeka sana mwanzoni mwa 2021, na kusababisha bei ya gesi ya juu sana katika miezi michache ya kwanza ya mwaka. Kuibuka kwa upeanaji wa MEV wa Flashbots kumepunguza ufanisi wa waendeshaji wa mbele wa jumla na kumechukua minada ya bei ya gesi nje ya mnyororo, na kupunguza bei ya gesi kwa watumiaji wa kawaida.

Ingawa watafutaji wengi bado wanapata pesa nzuri kutoka kwa MEV, kadiri fursa zinavyojulikana zaidi na watafutaji wengi zaidi wanashindana kwa fursa sawa, wathibitishaji watakamata mapato zaidi na zaidi ya jumla ya MEV (kwa sababu aina sawa ya minada ya gesi kama ilivyoelezwa hapo awali pia hutokea katika Flashbots, ingawa kwa faragha, na wathibitishaji watakamata mapato ya gesi yanayotokana). MEV pia sio ya kipekee kwa Ethereum, na kadiri fursa zinavyokuwa na ushindani zaidi kwenye Ethereum, watafutaji wanahamia kwenye minyororo ya vitalu mbadala kama Binance Smart Chain, ambapo fursa sawa za MEV kama zile za Ethereum zipo na ushindani mdogo.

Kwa upande mwingine, mpito kutoka Uthibitisho wa Kazi kwenda Uthibitisho wa Dau na juhudi zinazoendelea za kuongeza ukubwa wa Ethereum kwa kutumia mikusanyiko yote hubadilisha mazingira ya MEV kwa njia ambazo bado hazijulikani wazi. Bado haijulikani vizuri jinsi kuwa na wapendekezaji wa bloku waliohakikishwa wanaojulikana mapema kidogo kunabadilisha mienendo ya utoaji wa MEV ikilinganishwa na mtindo wa uwezekano katika Uthibitisho wa Kazi au jinsi hii itavurugwa wakati [uchaguzi wa kiongozi mmoja wa siri (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) na [teknolojia ya kithibitishaji kilichosambazwa (DVT)](/staking/dvt/) itatekelezwa. Vile vile, inabakia kuonekana ni fursa gani za MEV zipo wakati shughuli nyingi za watumiaji zinahamishwa kutoka Ethereum na kwenda kwenye mikusanyiko yake ya tabaka la 2 (l2) na vipande.

## MEV katika Uthibitisho wa Dau (PoS) wa Ethereum {#mev-in-ethereum-proof-of-stake}

Kama ilivyoelezwa, MEV ina athari mbaya kwa uzoefu wa jumla wa mtumiaji na usalama wa tabaka la mwafaka. Lakini mpito wa Ethereum kwenda kwenye mwafaka wa Uthibitisho wa Dau (ulioitwa "Unganisho") unaweza kuanzisha hatari mpya zinazohusiana na MEV:

### Uwekaji kati wa mthibitishaji {#validator-centralization}

Katika Ethereum ya baada ya Unganisho, wathibitishaji (baada ya kuweka amana za usalama za 32 ETH) hufikia mwafaka juu ya uhalali wa vitalu vilivyoongezwa kwenye Mnyororo wa Beacon. Kwa kuwa 32 ETH inaweza kuwa nje ya uwezo wa wengi, [kujiunga na bwawa la uwekaji dhamana](/staking/pools/) inaweza kuwa chaguo linalowezekana zaidi. Hata hivyo, usambazaji mzuri wa [waweka dhamana wa pekee](/staking/solo/) ni bora, kwani hupunguza uwekaji kati wa wathibitishaji na kuboresha usalama wa Ethereum.

Hata hivyo, utoaji wa MEV unaaminika kuwa na uwezo wa kuharakisha uwekaji kati wa mthibitishaji. Hii ni kwa kiasi fulani kwa sababu, wakati wathibitishaji [wanapata mapato kidogo kwa kupendekeza vitalu](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) kuliko wachimbaji walivyofanya hapo awali, utoaji wa MEV [umeathiri sana mapato ya mthibitishaji](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) tangu [Unganisho](/roadmap/merge/).

Mabwawa makubwa ya uwekaji dhamana huenda yatakuwa na rasilimali zaidi za kuwekeza katika uboreshaji unaohitajika ili kukamata fursa za MEV. Kadiri mabwawa haya yanavyotoa MEV zaidi, ndivyo yanavyokuwa na rasilimali zaidi za kuboresha uwezo wao wa kutoa MEV (na kuongeza mapato ya jumla), kimsingi yakitengeneza [uchumi wa kiwango](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Wakiwa na rasilimali chache walizonazo, waweka dhamana wa pekee wanaweza kushindwa kufaidika na fursa za MEV. Hii inaweza kuongeza shinikizo kwa wathibitishaji huru kujiunga na mabwawa yenye nguvu ya uwekaji dhamana ili kuongeza mapato yao, na kupunguza ugatuzi katika Ethereum.

### Mempool zenye ruhusa {#permissioned-mempools}

Kujibu mashambulizi ya sandwichi na kuendesha mbele, wafanyabiashara wanaweza kuanza kufanya mikataba nje ya mnyororo na wathibitishaji kwa faragha ya muamala. Badala ya kutuma muamala unaowezekana wa MEV kwenye mempool ya umma, mfanyabiashara anautuma moja kwa moja kwa mthibitishaji, ambaye anaujumuisha katika kitalu na kugawana faida na mfanyabiashara.

"Mabwawa ya giza" ni toleo kubwa zaidi la mpangilio huu na hufanya kazi kama mempool zenye ruhusa, za ufikiaji pekee zilizo wazi kwa watumiaji walio tayari kulipa ada fulani. Mwenendo huu ungepunguza hali ya kutohitaji ruhusa na hali ya kutohitaji kuamini ya Ethereum na uwezekano wa kubadilisha mnyororo wa vitalu kuwa utaratibu wa "lipa-ili-ucheze" unaompendelea mzabuni wa juu zaidi.

Mempool zenye ruhusa pia zingeharakisha hatari za uwekaji kati zilizoelezwa katika sehemu iliyopita. Mabwawa makubwa yanayoendesha wathibitishaji wengi huenda yatafaidika kwa kutoa faragha ya muamala kwa wafanyabiashara na watumiaji, na kuongeza mapato yao ya MEV.

Kupambana na matatizo haya yanayohusiana na MEV katika Ethereum ya baada ya Unganisho ni eneo kuu la utafiti. Hadi sasa, suluhisho mbili zilizopendekezwa kupunguza athari mbaya za MEV kwenye ugatuzi na usalama wa Ethereum baada ya Unganisho ni [**utengano wa mpendekezaji na mjengaji (PBS)**](/roadmap/pbs/) na [**API ya Mjengaji**](https://github.com/ethereum/builder-specs).

### Utengano wa mpendekezaji na mjengaji {#proposer-builder-separation}

Katika Uthibitisho wa Kazi na Uthibitisho wa Dau, nodi inayojenga kitalu huipendekeza kwa kuongezwa kwenye mnyororo kwa nodi zingine zinazoshiriki katika mwafaka. Kitalu kipya kinakuwa sehemu ya mnyororo wa kisheria baada ya mchimbaji mwingine kujenga juu yake (katika PoW) au kinapokea uthibitisho kutoka kwa wengi wa wathibitishaji (katika PoS).

Mchanganyiko wa majukumu ya mzalishaji wa kitalu na mpendekezaji wa bloku ndio unaoanzisha matatizo mengi yanayohusiana na MEV yaliyoelezwa hapo awali. Kwa mfano, nodi za mwafaka zinahamasishwa kuanzisha upangaji upya wa mnyororo katika [mashambulizi ya majambazi wa wakati](https://www.mev.wiki/attack-examples/time-bandit-attack) ili kuongeza mapato ya MEV.

[Utengano wa mpendekezaji na mjengaji](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) umeundwa ili kupunguza athari za MEV, hasa katika tabaka la mwafaka. Kipengele kikuu cha PBS ni utengano wa sheria za mzalishaji wa kitalu na mpendekezaji wa bloku. Wathibitishaji bado wana jukumu la kupendekeza na kupiga kura kwenye vitalu, lakini darasa jipya la vyombo maalum, vinavyoitwa **wajenga kizuizi**, wanapewa jukumu la kupanga miamala na kujenga vitalu.

Chini ya PBS, mjenga kizuizi huunda kifurushi cha muamala na kuweka zabuni ya kujumuishwa kwake katika kitalu cha Mnyororo wa Beacon (kama "mzigo wa utekelezaji"). Mthibitishaji aliyechaguliwa kupendekeza kitalu kinachofuata kisha huangalia zabuni tofauti na kuchagua kifurushi chenye ada ya juu zaidi. PBS kimsingi huunda soko la mnada, ambapo wajenzi hujadiliana na wathibitishaji wanaouza nafasi ya kitalu.

Miundo ya sasa ya PBS inatumia [mpango wa kufichua-kujitolea](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) ambapo wajenzi huchapisha tu ufungamanisho wa kificho kwa yaliyomo kwenye kitalu (kichwa cha kizuizi) pamoja na zabuni zao. Baada ya kukubali zabuni iliyoshinda, mpendekezaji huunda pendekezo la kitalu lililosainiwa ambalo linajumuisha kichwa cha kizuizi. Mjenga kizuizi anatarajiwa kuchapisha mwili kamili wa kitalu baada ya kuona pendekezo la kitalu lililosainiwa, na lazima pia ipokee uthibitisho wa kutosha kutoka kwa wathibitishaji kabla ya kukamilishwa.

#### Je, utengano wa mpendekezaji na mjengaji hupunguza vipi athari za MEV? {#how-does-pbs-curb-mev-impact}

Utengano wa mpendekezaji na mjengaji ndani ya itifaki hupunguza athari za MEV kwenye mwafaka kwa kuondoa utoaji wa MEV kutoka kwa uwezo wa wathibitishaji. Badala yake, wajenga kizuizi wanaoendesha maunzi maalum watakamata fursa za MEV kwenda mbele.

Hii haiondoi wathibitishaji kabisa kutoka kwa mapato yanayohusiana na MEV, hata hivyo, kwani wajenzi lazima watoe zabuni ya juu ili vitalu vyao vikubaliwe na wathibitishaji. Hata hivyo, huku wathibitishaji hawazingatii tena moja kwa moja kuboresha mapato ya MEV, tishio la mashambulizi ya majambazi wa wakati hupungua.

Utengano wa mpendekezaji na mjengaji pia hupunguza hatari za uwekaji kati za MEV. Kwa mfano, matumizi ya mpango wa kufichua-kujitolea huondoa hitaji la wajenzi kuamini wathibitishaji kutokuiba fursa ya MEV au kuifichua kwa wajenzi wengine. Hii inapunguza kizuizi kwa waweka dhamana wa pekee kufaidika na MEV, vinginevyo, wajenzi wangeelekea kupendelea mabwawa makubwa yenye sifa nje ya mnyororo na kufanya mikataba nje ya mnyororo nao.

Vile vile, wathibitishaji hawapaswi kuamini wajenzi kutozuia miili ya kitalu au kuchapisha vitalu batili kwa sababu malipo hayana masharti. Ada ya mthibitishaji bado inachakatwa hata kama kitalu kilichopendekezwa hakipatikani au kutangazwa kuwa batili na wathibitishaji wengine. Katika kesi ya mwisho, kitalu kinatupwa tu, na kumlazimisha mjenga kizuizi kupoteza ada zote za muamala na mapato ya MEV.

### API ya Mjengaji {#builder-api}

Ingawa utengano wa mpendekezaji na mjengaji unaahidi kupunguza athari za utoaji wa MEV, kuitekeleza kunahitaji mabadiliko kwenye itifaki ya mwafaka. Hasa, sheria ya [chaguo la mchepuo](/developers/docs/consensus-mechanisms/pos/#fork-choice) kwenye Mnyororo wa Beacon itahitaji kusasishwa. [API ya Mjengaji](https://github.com/ethereum/builder-specs) ni suluhisho la muda linalolenga kutoa utekelezaji wa kazi wa utengano wa mpendekezaji na mjengaji, ingawa na dhana za uaminifu za juu zaidi.

API ya Mjengaji ni toleo lililorekebishwa la [API ya Injini](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) inayotumiwa na viteja vya tabaka la mwafaka kuomba mizigo ya utekelezaji kutoka kwa viteja vya tabaka la utekelezaji. Kama ilivyoainishwa katika [vipimo vya mthibitishaji mwaminifu](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), wathibitishaji waliochaguliwa kwa majukumu ya kupendekeza kitalu huomba kifurushi cha muamala kutoka kwa kiteja cha utekelezaji kilichounganishwa, ambacho wanajumuisha katika kitalu kilichopendekezwa cha Mnyororo wa Beacon.

API ya Mjengaji pia hufanya kazi kama programu ya kati kati ya wathibitishaji na viteja vya tabaka la utekelezaji; lakini ni tofauti kwa sababu inaruhusu wathibitishaji kwenye Mnyororo wa Beacon kupata vitalu kutoka kwa vyombo vya nje (badala ya kujenga kitalu ndani ya nchi kwa kutumia kiteja cha utekelezaji).

Hapa chini kuna muhtasari wa jinsi API ya Mjengaji inavyofanya kazi:

1. API ya Mjengaji huunganisha mthibitishaji kwenye mtandao wa wajenga kizuizi wanaoendesha viteja vya tabaka la utekelezaji. Kama ilivyo katika PBS, wajenzi ni vyama maalum vinavyowekeza katika ujenzi wa kitalu unaohitaji rasilimali nyingi na kutumia mikakati tofauti ili kuongeza mapato yanayopatikana kutoka kwa MEV + vidokezo vya kipaumbele.

2. Mthibitishaji (anayeendesha kiteja cha tabaka la mwafaka) huomba mizigo ya utekelezaji pamoja na zabuni kutoka kwa mtandao wa wajenzi. Zabuni kutoka kwa wajenzi zitakuwa na kichwa cha mzigo wa utekelezaji—ufungamanisho wa kificho kwa yaliyomo kwenye mzigo—na ada ya kulipwa kwa mthibitishaji.

3. Mthibitishaji hukagua zabuni zinazoingia na kuchagua mzigo wa utekelezaji wenye ada ya juu zaidi. Kwa kutumia API ya Mjengaji, mthibitishaji huunda pendekezo la kitalu cha Beacon "lililopofushwa" ambalo linajumuisha tu sahihi yao na kichwa cha mzigo wa utekelezaji na kulituma kwa mjengaji.

4. Mjengaji anayeendesha API ya Mjengaji anatarajiwa kujibu na mzigo kamili wa utekelezaji baada ya kuona pendekezo la kitalu lililopofushwa. Hii inaruhusu mthibitishaji kuunda kitalu cha Beacon "kilichosainiwa", ambacho wanakisambaza katika mtandao wote.

5. Mthibitishaji anayetumia API ya Mjengaji bado anatarajiwa kujenga kitalu ndani ya nchi endapo mjenga kizuizi atashindwa kujibu haraka, ili wasikose tuzo za pendekezo la kitalu. Hata hivyo, mthibitishaji hawezi kuunda kitalu kingine kwa kutumia miamala iliyofichuliwa sasa au seti nyingine, kwani itakuwa sawa na _kufanya udanganyifu_ (kusaini vitalu viwili ndani ya sloti sawa), ambalo ni kosa linaloweza kukatwa.

Mfano wa utekelezaji wa API ya Mjengaji ni [MEV-Boost](https://github.com/flashbots/mev-boost), uboreshaji wa [utaratibu wa mnada wa Flashbots](https://docs.flashbots.net/flashbots-auction/overview) ulioundwa ili kuzuia athari mbaya za nje za MEV kwenye Ethereum. Mnada wa Flashbots unaruhusu wathibitishaji katika Uthibitisho wa Dau kutoa kazi ya kujenga vitalu vyenye faida kwa vyama maalum vinavyoitwa **watafutaji**.
![A diagram showing the MEV flow in detail](./mev.png)

Watafutaji hutafuta fursa za MEV zenye faida kubwa na kutuma vifurushi vya muamala kwa wapendekezaji wa bloku pamoja na [zabuni ya bei iliyofungwa](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) kwa ajili ya kujumuishwa katika kitalu. Mthibitishaji anayeendesha mev-geth, toleo lililochepushwa la kiteja cha go-ethereum (Geth) anapaswa tu kuchagua kifurushi chenye faida zaidi na kukijumuisha kama sehemu ya kitalu kipya. Ili kulinda wapendekezaji wa bloku (wathibitishaji) dhidi ya barua taka na miamala batili, vifurushi vya muamala hupitia kwa **wapeanaji** kwa uthibitisho kabla ya kufika kwa mpendekezaji.

MEV-Boost inahifadhi utendaji sawa wa mnada wa asili wa Flashbots, ingawa na vipengele vipya vilivyoundwa kwa ajili ya kubadili kwa Ethereum kwenda kwenye Uthibitisho wa Dau. Watafutaji bado wanapata miamala ya MEV yenye faida kwa ajili ya kujumuishwa katika vitalu, lakini darasa jipya la vyama maalum, vinavyoitwa **wajenzi**, wana jukumu la kujumuisha miamala na vifurushi katika vitalu. Mjengaji anakubali zabuni za bei zilizofungwa kutoka kwa watafutaji na kuendesha uboreshaji ili kupata mpangilio wenye faida zaidi.

Mpeanaji bado ana jukumu la kuthibitisha vifurushi vya muamala kabla ya kuvipitisha kwa mpendekezaji. Hata hivyo, MEV-Boost inaleta **escrows** zinazohusika na kutoa [upatikanaji wa data](/developers/docs/data-availability/) kwa kuhifadhi miili ya kitalu iliyotumwa na wajenzi na vichwa vya kizuizi vilivyotumwa na wathibitishaji. Hapa, mthibitishaji aliyeunganishwa na upeanaji huomba mizigo ya utekelezaji inayopatikana na kutumia algoriti ya upangaji ya MEV-Boost kuchagua kichwa cha mzigo chenye zabuni ya juu zaidi + vidokezo vya MEV.

#### Je, API ya Mjengaji hupunguza vipi athari za MEV? {#how-does-builder-api-curb-mev-impact}

Faida kuu ya API ya Mjengaji ni uwezo wake wa kuweka kidemokrasia ufikiaji wa fursa za MEV. Kutumia mipango ya kufichua-kujitolea huondoa dhana za uaminifu na kupunguza vizuizi vya kuingia kwa wathibitishaji wanaotafuta kufaidika na MEV. Hii inapaswa kupunguza shinikizo kwa waweka dhamana wa pekee kuungana na mabwawa makubwa ya uwekaji dhamana ili kuongeza faida za MEV.

Utekelezaji ulioenea wa API ya Mjengaji utahimiza ushindani mkubwa kati ya wajenga kizuizi, ambayo huongeza upinzani wa udhibiti. Wakati wathibitishaji wanakagua zabuni kutoka kwa wajenzi wengi, mjengaji anayekusudia kudhibiti muamala mmoja au zaidi wa mtumiaji lazima azidi zabuni za wajenzi wengine wote wasiodhibiti ili kufanikiwa. Hii inaongeza sana gharama ya kudhibiti watumiaji na inakatisha tamaa mazoezi hayo.

Baadhi ya miradi, kama vile MEV-Boost, hutumia API ya Mjengaji kama sehemu ya muundo wa jumla ulioundwa kutoa faragha ya muamala kwa vyama fulani, kama vile wafanyabiashara wanaojaribu kuepuka mashambulizi ya kuendesha mbele/sandwichi. Hili linafikiwa kwa kutoa njia ya mawasiliano ya faragha kati ya watumiaji na wajenga kizuizi. Tofauti na mempool zenye ruhusa zilizoelezwa hapo awali, mbinu hii ina faida kwa sababu zifuatazo:

1. Kuwepo kwa wajenzi wengi kwenye soko hufanya udhibiti usiwezekane, jambo ambalo linanufaisha watumiaji. Kinyume chake, kuwepo kwa mabwawa ya giza yaliyowekwa kati na yanayotegemea uaminifu kungejikita nguvu mikononi mwa wajenga kizuizi wachache na kuongeza uwezekano wa kudhibiti.

2. Programu ya API ya Mjengaji ni ya chanzo wazi, ambayo inaruhusu mtu yeyote kutoa huduma za mjenga kizuizi. Hii inamaanisha watumiaji hawalazimishwi kutumia mjenga kizuizi yeyote maalum na inaboresha kutoegemea upande wowote na hali ya kutohitaji ruhusa ya Ethereum. Zaidi ya hayo, wafanyabiashara wanaotafuta MEV hawatachangia kwa bahati mbaya katika uwekaji kati kwa kutumia njia za muamala za faragha.

## Rasilimali zinazohusiana {#related-resources}

- [Nyaraka za Flashbots](https://docs.flashbots.net/)
- [GitHub ya Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Kifuatiliaji chenye takwimu za wakati halisi za wapeanaji wa MEV-Boost na wajenga kizuizi_

## Usomaji zaidi {#further-reading}

- [Thamani Inayoweza Kutolewa na Mchimbaji (MEV) ni Nini?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV na Mimi](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum ni Msitu wa Giza](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Kutoroka Msitu wa Giza](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Kuendesha Mbele Mgogoro wa MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Nyuzi za MEV za @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Usanifu wa Flashbots ulio tayari kwa Unganisho](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV-Boost ni Nini](https://www.alchemy.com/overviews/mev-boost)
- [Kwa nini uendeshe mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Mwongozo wa Wasafiri kwa Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)