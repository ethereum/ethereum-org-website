---
title: Thamani inayoweza kutolewa (MEV)
description: Utangulizi wa thamani inayoweza kutolewa (MEV)
lang: sw
---

Thamani ya juu ambayo inaweza kutolewa (MEV) inarejelea thamani ya juu zaidi inayoweza kutolewa kutoka kwa uzalishaji wa vizuizi zaidi ya zawadi ya kawaida ya kizuizi na ada za gesi kwa kujumuisha, kutojumuisha, na kubadilisha mpangilio wa miamala katika kizuizi.

## Thamani ya juu ambayo inaweza kutolewa {#maximal-extractable-value}

Thamani ya juu ambayo inaweza kutolewa ilitumika kwa mara ya kwanza katika muktadha wa [uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow/), na awali ilijulikana kama "thamani inayoweza kutolewa na mchimbaji". Hii ni kwa sababu katika uthibitishaji-wa-kazi, wachimbaji hudhibiti ujumuishaji, utengaji, na upangaji wa miamala. Hata hivyo, tangu kipindi cha mpito hadi uthibitisho-wa-dau kupitia [Muungano](/roadmap/merge) wathibitishaji wamekuwa na jukumu la majukumu haya, na uchimbaji si sehemu ya itifaki ya Ethereum tena. Mbinu za utoaji wa thamani bado zipo, ingawa, kwa hivyo neno "Thamani ya juu ambayo inaweza kutolewa" sasa linatumika badala yake.

## Mahitaji ya awali {#prerequisites}

Hakikisha unafahamu [miamala](/developers/docs/transactions/), [vizuizi](/developers/docs/blocks/), [uthibitisho-wa-dau](/developers/docs/consensus-mechanisms/pos) na [gesi](/developers/docs/gas/). Ufahamu wa [mfumo mtawanyo wa kimamlaka](/apps/) na [DeFi](/defi/) pia ni muhimu.

## Utoaji wa MEV {#mev-extraction}

Kinadharia, MEV huenda kabisa kwa wathibitishaji kwa sababu wao ndio upande pekee unaoweza kuhakikisha utekelezaji wa fursa ya MEV yenye faida. Katika vitendo, hata hivyo, sehemu kubwa ya MEV inatolewa na washiriki huru wa mtandao wanaojulikana kama "watafutaji." Watafutaji huendesha algoriti changamano kwenye data ya mnyororo wa vizuizi ili kugundua fursa za MEV zenye faida na wana boti za kuwasilisha kiotomatiki miamala hiyo yenye faida kwenye mtandao.

Wathibitishaji hupata sehemu ya kiasi kamili cha MEV kwa vyovyote vile kwa sababu watafutaji wako tayari kulipa ada za juu za gesi (zinazokwenda kwa mthibitishaji) badala ya uwezekano mkubwa wa kujumuishwa kwa miamala yao yenye faida katika kizuizi. Kwa kudhania watafutaji wana busara kiuchumi, ada ya gesi ambayo mtafutaji yuko tayari kulipa itakuwa kiasi cha hadi 100% ya MEV ya mtafutaji (kwa sababu ikiwa ada ya gesi ingekuwa kubwa zaidi, mtafutaji angepoteza pesa).

Pamoja na hayo, kwa baadhi ya fursa za MEV zenye ushindani mkubwa, kama vile [usuluhishi wa DEX](#mev-examples-dex-arbitrage), watafutaji wanaweza kulazimika kulipa 90% au hata zaidi ya mapato yao yote ya MEV katika ada za gesi kwa mthibitishaji kwa sababu watu wengi sana wanataka kuendesha biashara sawa ya usuluhishi yenye faida. Hii ni kwa sababu njia pekee ya kuhakikisha kuwa muamala wao wa usuluhishi unafanyika ni ikiwa watawasilisha muamala huo na bei ya juu zaidi ya gesi.

### Gofu ya gesi {#mev-extraction-gas-golfing}

Mwenendo huu umefanya kuwa mzuri katika "gofu ya gesi" — kupanga miamala ili itumie kiasi kidogo zaidi cha gesi — faida ya ushindani, kwa sababu inaruhusu watafutaji kuweka bei ya juu ya gesi huku wakiweka ada zao zote za gesi kuwa za kudumu (kwa kuwa ada za gesi = bei ya gesi \* gesi iliyotumika).

Mbinu chache zinazojulikana za gofu ya gesi ni pamoja na: kutumia anwani zinazoanza na msururu mrefu wa sufuri (k.m., [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) kwa kuwa zinachukua nafasi ndogo (na hivyo gesi) kuhifadhi; na kuacha salio dogo la tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/) katika mikataba, kwa kuwa inagharimu gesi nyingi zaidi kuanzisha nafasi ya kuhifadhi (ikiwa salio ni 0) kuliko kusasisha nafasi ya kuhifadhi. Kutafuta mbinu zaidi za kupunguza matumizi ya gesi ni eneo tendaji la utafiti miongoni mwa watafutaji.

### Waendeshaji wa mbele wa jumla {#mev-extraction-generalized-frontrunners}

Badala ya kupanga algoriti changamano ili kugundua fursa za MEV zenye faida, baadhi ya watafutaji huendesha waendeshaji wa mbele wa jumla. Waendeshaji wa mbele wa jumla ni boti zinazotazama mempool ili kugundua miamala yenye faida. Mwendeshaji wa mbele atanakili msimbo wa muamala unaoweza kuwa na faida, atabadilisha anwani na anwani ya mwendeshaji wa mbele, na kuendesha muamala huo ndani ya nchi ili kuhakikisha mara mbili kuwa muamala uliobadilishwa unasababisha faida kwa anwani ya mwendeshaji wa mbele. Ikiwa muamala una faida kweli, mwendeshaji wa mbele atawasilisha muamala uliobadilishwa na anwani iliyobadilishwa na bei ya juu ya gesi, "akiendesha mbele" muamala wa asili na kupata MEV ya mtafutaji wa asili.

### Flashbots {#mev-extraction-flashbots}

Flashbots ni mradi huru unaopanua wateja wa utekelezaji kwa huduma inayoruhusu watafutaji kuwasilisha miamala ya MEV kwa wathibitishaji bila kuifichua kwa mempool ya umma. Hii inazuia miamala kuendeshwa mbele na waendeshaji wa mbele wa jumla.

## Mifano ya MEV {#mev-examples}

MEV hujitokeza kwenye mnyororo wa vizuizi kwa njia chache.

### Usuluhishi wa DEX {#mev-examples-dex-arbitrage}

Usuluhishi wa [Badilishano lililogatuliwa](/glossary/#dex) (DEX) ni fursa rahisi na inayojulikana zaidi ya MEV. Kutokana na hilo, pia ndiyo yenye ushindani mkubwa zaidi.

Inafanya kazi kama hivi: ikiwa DEX mbili zinatoa tokeni kwa bei mbili tofauti, mtu anaweza kununua tokeni kwenye DEX ya bei ya chini na kuiuza kwenye DEX ya bei ya juu katika muamala mmoja, wa atomiki. Shukrani kwa mbinu za mnyororo wa vizuizi, huu ni usuluhishi wa kweli, usio na hatari.

[Huu ni mfano](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) wa muamala wa usuluhishi wenye faida ambapo mtafutaji aligeuza ETH 1,000 kuwa ETH 1,045 kwa kutumia fursa ya bei tofauti za jozi ya ETH/DAI kwenye Uniswap dhidi ya Sushiswap.

### Ufilisi {#mev-examples-liquidations}

Ufilisi wa itifaki ya kukopesha unatoa fursa nyingine inayojulikana ya MEV.

Itifaki za kukopesha kama Maker na Aave zinahitaji watumiaji kuweka dhamana fulani (k.m., ETH). Dhamana hii iliyowekwa kisha hutumiwa kuwakopesha watumiaji wengine.

Watumiaji wanaweza kisha kukopa mali na tokeni kutoka kwa wengine kulingana na kile wanachohitaji (k.m., unaweza kukopa MKR ikiwa unataka kupiga kura katika pendekezo la utawala la MakerDAO) hadi asilimia fulani ya dhamana yao iliyowekwa. Kwa mfano, ikiwa kiasi cha kukopa ni cha juu cha 30%, mtumiaji anayeweka DAI 100 kwenye itifaki anaweza kukopa hadi thamani ya DAI 30 ya mali nyingine. Itifaki huamua asilimia kamili ya uwezo wa kukopa.

Kadiri thamani ya dhamana ya mkopaji inavyobadilika, ndivyo uwezo wake wa kukopa unavyobadilika pia. Ikiwa, kutokana na mabadiliko ya soko, thamani ya mali zilizokopwa inazidi, tuseme, 30% ya thamani ya dhamana yao (tena, asilimia kamili huamuliwa na itifaki), itifaki kwa kawaida inaruhusu mtu yeyote kufilisi dhamana, na kuwalipa wakopeshaji papo hapo (hii ni sawa na jinsi [simu za kando](https://www.investopedia.com/terms/m/margincall.asp) zinavyofanya kazi katika fedha za jadi). Ikifilisiwa, mkopaji kwa kawaida hulazimika kulipa ada kubwa ya ufilisi, ambayo baadhi yake huenda kwa mfilisi — hapa ndipo fursa ya MEV inapoingia.

Watafutaji hushindana kuchanganua data ya mnyororo wa vizuizi haraka iwezekanavyo ili kubaini ni wakopaji gani wanaweza kufilisiwa na kuwa wa kwanza kuwasilisha muamala wa ufilisi na kujikusanyia ada ya ufilisi.

### Biashara ya sandwich {#mev-examples-sandwich-trading}

Biashara ya sandwich ni njia nyingine ya kawaida ya utoaji wa MEV.

Ili kufanya biashara ya sandwich, mtafutaji atatazama mempool kwa biashara kubwa za DEX. Kwa mfano, tuseme mtu anataka kununua UNI 10,000 kwa DAI kwenye Uniswap. Biashara ya ukubwa huu itakuwa na athari kubwa kwa jozi ya UNI/DAI, na uwezekano wa kuongeza bei ya UNI kwa kiasi kikubwa ikilinganishwa na DAI.

Mtafutaji anaweza kukokotoa takriban athari ya bei ya biashara hii kubwa kwenye jozi ya UNI/DAI na kutekeleza agizo bora la ununuzi mara moja _kabla_ ya biashara kubwa, akinunua UNI kwa bei nafuu, kisha atekeleze agizo la kuuza mara moja _baada_ ya biashara kubwa, akiuza kwa bei ya juu iliyosababishwa na agizo kubwa.

Biashara ya sandwich, hata hivyo, ina hatari zaidi kwani si ya atomiki (tofauti na usuluhishi wa DEX, kama ilivyoelezwa hapo juu) na inaweza kushambuliwa na [shambulio la salmonella](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

MEV katika nafasi ya NFT ni jambo linaloibuka, na si lazima liwe na faida.

Hata hivyo, kwa kuwa miamala ya NFT hufanyika kwenye mnyororo wa vizuizi uleule unaoshirikiwa na miamala mingine yote ya Ethereum, watafutaji wanaweza kutumia mbinu sawa na zile zinazotumiwa katika fursa za jadi za MEV katika soko la NFT pia.

Kwa mfano, ikiwa kuna toleo maarufu la NFT na mtafutaji anataka NFT fulani au seti ya NFT, anaweza kupanga muamala ili awe wa kwanza kwenye mstari wa kununua NFT, au anaweza kununua seti nzima ya NFT katika muamala mmoja. Au ikiwa NFT [imeorodheshwa kimakosa kwa bei ya chini](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), mtafutaji anaweza kuwatangulia wanunuzi wengine na kuinyakua kwa bei nafuu.

Mfano mmoja maarufu wa NFT MEV ulitokea wakati mtafutaji alitumia dola milioni 7 [kununua](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) kila Cryptopunk moja kwa bei ya chini kabisa. Mtafiti wa mnyororo wa vizuizi [alielezea kwenye Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) jinsi mnunuzi alivyofanya kazi na mtoa huduma wa MEV kuweka ununuzi wao kuwa siri.

### Mkia mrefu {#mev-examples-long-tail}

Usuluhishi wa DEX, ufilisi, na biashara ya sandwich zote ni fursa zinazojulikana sana za MEV na hakuna uwezekano wa kuwa na faida kwa watafutaji wapya. Hata hivyo, kuna mkia mrefu wa fursa za MEV zisizojulikana sana (NFT MEV bila shaka ni fursa mojawapo).

Watafutaji ambao wanaanza wanaweza kupata mafanikio zaidi kwa kutafuta MEV katika mkia huu mrefu. Ubao wa kazi wa [MEV wa Flashbot](https://github.com/flashbots/mev-job-board) unaorodhesha baadhi ya fursa zinazoibuka.

## Athari za MEV {#effects-of-mev}

MEV sio mbaya kabisa - kuna matokeo chanya na hasi kwa MEV kwenye Ethereum.

### Mema {#effects-of-mev-the-good}

Miradi mingi ya DeFi inategemea watendaji wenye busara kiuchumi ili kuhakikisha manufaa na uthabiti wa itifaki zao. Kwa mfano, usuluhishi wa DEX huhakikisha kuwa watumiaji wanapata bei bora na sahihi zaidi kwa tokeni zao, na itifaki za kukopesha hutegemea ufilisi wa haraka wakati wakopaji wanaposhuka chini ya uwiano wa dhamana ili kuhakikisha wakopeshaji wanalipwa.

Bila watafutaji wenye busara wanaotafuta na kurekebisha mapungufu ya kiuchumi na kutumia fursa za motisha za kiuchumi za itifaki, itifaki za DeFi na mfumo mtawanyo wa kimamlaka kwa ujumla huenda zisiwe imara kama zilivyo leo.

### Mabaya {#effects-of-mev-the-bad}

Katika safu ya matumizi, baadhi ya aina za MEV, kama vile biashara ya sandwich, husababisha uzoefu mbaya kabisa kwa watumiaji. Watumiaji ambao wamefanyiwa biashara ya sandwich wanakabiliwa na ongezeko la slippage na utekelezaji mbaya zaidi wa biashara zao.

Katika safu ya mtandao, waendeshaji wa mbele wa jumla na minada ya bei za gesi wanayoshiriki mara kwa mara (wakati waendeshaji wa mbele wawili au zaidi wanaposhindana ili muamala wao ujumuishwe katika kizuizi kinachofuata kwa kuongeza bei ya gesi ya miamala yao wenyewe) husababisha msongamano wa mtandao na bei za juu za gesi kwa kila mtu mwingine anayejaribu kufanya miamala ya kawaida.

Zaidi ya kile kinachotokea _ndani_ ya vizuizi, MEV inaweza kuwa na athari mbaya _kati_ ya vizuizi. Ikiwa MEV inayopatikana katika kizuizi inazidi kwa kiasi kikubwa zawadi ya kawaida ya kizuizi, wathibitishaji wanaweza kushawishika kupanga upya vizuizi na kunasa MEV kwa ajili yao wenyewe, na kusababisha upangaji upya wa mnyororo wa vizuizi na kukosekana kwa uthabiti wa makubaliano.

Uwezekano huu wa upangaji upya wa mnyororo wa vizuizi [umewahi kuchunguzwa hapo awali kwenye mnyororo wa vizuizi wa Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Kadiri zawadi ya kizuizi cha Bitcoin inapopungua kwa nusu na ada za muamala zinavyochukua sehemu kubwa na kubwa zaidi ya zawadi ya kizuizi, hali hutokea ambapo inakuwa na busara kiuchumi kwa wachimbaji kuacha zawadi ya kizuizi kinachofuata na badala yake kuchimba tena vizuizi vya zamani vyenye ada za juu. Pamoja na ukuaji wa MEV, hali ya aina hiyo inaweza kutokea katika Ethereum, na kutishia uadilifu wa mnyororo wa vizuizi.

## Hali ya MEV {#state-of-mev}

Utoaji wa MEV uliongezeka mwanzoni mwa 2021, na kusababisha bei za juu sana za gesi katika miezi michache ya kwanza ya mwaka. Kuibuka kwa relay ya MEV ya Flashbots kumepunguza ufanisi wa waendeshaji wa mbele wa jumla na kumepeleka minada ya bei za gesi nje ya mnyororo, na kupunguza bei za gesi kwa watumiaji wa kawaida.

Wakati watafutaji wengi bado wanapata pesa nzuri kutoka kwa MEV, kadri fursa zinavyojulikana zaidi na watafutaji zaidi na zaidi wanaposhindana kwa fursa sawa, wathibitishaji watanasa mapato mengi zaidi ya jumla ya MEV (kwa sababu aina sawa ya minada ya gesi kama ilivyoelezwa hapo awali pia hutokea katika Flashbots, ingawa kwa faragha, na wathibitishaji watanasa mapato ya gesi yanayotokana). MEV pia si ya kipekee kwa Ethereum, na kadri fursa zinavyokuwa na ushindani zaidi kwenye Ethereum, watafutaji wanahamia kwenye minyororo mbadala ya vizuizi kama Binance Smart Chain, ambapo fursa sawa za MEV na zile za Ethereum zipo na ushindani mdogo.

Kwa upande mwingine, mpito kutoka uthibitishaji-wa-kazi hadi uthibitisho-wa-dau na juhudi zinazoendelea za kuongeza Ethereum kwa kutumia unda-mpya zote zinabadilisha mazingira ya MEV kwa njia ambazo bado hazijawa wazi. Bado haijajulikana vizuri jinsi kuwa na wapendekezaji wa vizuizi waliohakikishwa wanaojulikana mapema kidogo kunavyobadilisha mienendo ya utoaji wa MEV ikilinganishwa na mfumo wa uwezekano katika uthibitishaji-wa-kazi au jinsi hii itakavyovurugwa wakati [uchaguzi wa kiongozi mmoja wa siri](https://ethresear.ch/t/secret-non-single-leader-election/11789) na [teknolojia ya wathibitishaji waliosambazwa](/staking/dvt/) zitakapotekelezwa. Vile vile, bado haijajulikana ni fursa gani za MEV zipo wakati shughuli nyingi za watumiaji zinapohamishwa kutoka Ethereum na kwenda kwenye safu zake za 2 za unda-mpya na shards.

## MEV katika Uthibitisho-wa-Dau wa Ethereum (PoS) {#mev-in-ethereum-proof-of-stake}

Kama ilivyoelezwa, MEV ina athari mbaya kwa uzoefu wa jumla wa mtumiaji na usalama wa safu ya makubaliano. Lakini mpito wa Ethereum kwenda kwa makubaliano ya uthibitisho-wa-dau (unaofahamika kama "Muungano") unaweza kuleta hatari mpya zinazohusiana na MEV:

### Uwekaji kati wa wathibitishaji {#validator-centralization}

Katika Ethereum ya baada ya Muungano, wathibitishaji (baada ya kuweka amana za usalama za ETH 32) hufikia makubaliano juu ya uhalali wa vizuizi vilivyoongezwa kwenye Mnyororo Kioleza. Kwa kuwa ETH 32 inaweza kuwa nje ya uwezo wa wengi, [kujiunga na bwawa la kuweka hisa](/staking/pools/) kunaweza kuwa chaguo linalowezekana zaidi. Hata hivyo, usambazaji mzuri wa [waweka hisa wa pekee](/staking/solo/) ni bora, kwani unapunguza uwekaji kati wa wathibitishaji na kuboresha usalama wa Ethereum.

Hata hivyo, utoaji wa MEV unaaminika kuwa na uwezo wa kuharakisha uwekaji kati wa wathibitishaji. Hii ni kwa sababu, kwa vile wathibitishaji [wanapata mapato kidogo kwa kupendekeza vizuizi](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) kuliko wachimbaji hapo awali, utoaji wa MEV umeathiri sana [mapato ya wathibitishaji](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) tangu [Muungano](/roadmap/merge/).

Mabwawa makubwa ya kuweka hisa yanaweza kuwa na rasilimali zaidi za kuwekeza katika uboreshaji unaohitajika ili kunasa fursa za MEV. Kadiri MEV inavyotolewa na mabwawa haya, ndivyo rasilimali wanazokuwa nazo za kuboresha uwezo wao wa kutoa MEV (na kuongeza mapato ya jumla) zinavyoongezeka, na hivyo kuunda [uchumi wa kiwango](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Kwa kuwa na rasilimali chache, waweka hisa wa pekee wanaweza kushindwa kufaidika na fursa za MEV. Hii inaweza kuongeza shinikizo kwa wathibitishaji huru kujiunga na mabwawa yenye nguvu ya kuweka hisa ili kuongeza mapato yao, na kupunguza ugatuaji katika Ethereum.

### Mempool zinazohitaji ruhusa {#permissioned-mempools}

Kujibu mashambulizi ya sandwich na ya mbele, wafanyabiashara wanaweza kuanza kufanya mikataba nje ya mnyororo na wathibitishaji kwa ajili ya faragha ya miamala. Badala ya kutuma muamala unaoweza kuwa na MEV kwa mempool ya umma, mfanyabiashara anautuma moja kwa moja kwa mthibitishaji, ambaye anaujumuisha katika kizuizi na kugawana faida na mfanyabiashara.

“Mabwawa ya giza” ni toleo kubwa la mpangilio huu na hufanya kazi kama mempool zinazohitaji ruhusa, za ufikiaji pekee zilizo wazi kwa watumiaji walio tayari kulipa ada fulani. Mwenendo huu ungepunguza hali ya Ethereum ya kutohitaji ruhusa na kutokuwa na uaminifu na uwezekano wa kubadilisha mnyororo wa vizuizi kuwa utaratibu wa “lipa-ili-ucheze” unaopendelea mzabuni wa juu zaidi.

Mempool zinazohitaji ruhusa pia zingeharakisha hatari za uwekaji kati zilizoelezwa katika sehemu iliyopita. Mabwawa makubwa yanayoendesha wathibitishaji wengi yanaweza kufaidika kutokana na kutoa faragha ya miamala kwa wafanyabiashara na watumiaji, na kuongeza mapato yao ya MEV.

Kupambana na matatizo haya yanayohusiana na MEV katika Ethereum ya baada ya Muungano ni eneo la msingi la utafiti. Hadi sasa, suluhisho mbili zilizopendekezwa ili kupunguza athari mbaya za MEV kwenye ugatuaji na usalama wa Ethereum baada ya Muungano ni [**Mgawanyo wa Mpendekezaji na Mjenzi (PBS)**](/roadmap/pbs/) na [**API ya Mjenzi**](https://github.com/ethereum/builder-specs).

### Mgawanyo wa Mpendekezaji na Mjenzi {#proposer-builder-separation}

Katika uthibitishaji-wa-kazi na uthibitisho-wa-dau, nodi inayojenga kizuizi inakipendekeza kwa ajili ya kuongezwa kwenye mnyororo kwa nodi nyingine zinazoshiriki katika makubaliano. Kizuizi kipya kinakuwa sehemu ya mnyororo wa kanuni baada ya mchimbaji mwingine kujenga juu yake (katika PoW) au kinapokea uthibitisho kutoka kwa wathibitishaji wengi (katika PoS).

Mchanganyiko wa majukumu ya mzalishaji wa kizuizi na mpendekezaji wa kizuizi ndio unaoleta matatizo mengi yanayohusiana na MEV yaliyoelezwa hapo awali. Kwa mfano, nodi za makubaliano zinashawishika kuanzisha upangaji upya wa mnyororo katika [mashambulizi ya wezi wa wakati](https://www.mev.wiki/attack-examples/time-bandit-attack) ili kuongeza mapato ya MEV.

[Mgawanyo wa mpendekezaji na mjenzi](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) umeundwa ili kupunguza athari za MEV, hasa katika safu ya makubaliano. Kipengele kikuu cha PBS ni mgawanyo wa sheria za mzalishaji wa kizuizi na mpendekezaji wa kizuizi. Wathibitishaji bado wanawajibika kupendekeza na kupiga kura kwenye vizuizi, lakini darasa jipya la vyombo maalum, vinavyoitwa **wajenzi wa vizuizi**, wanapewa jukumu la kupanga miamala na kujenga vizuizi.

Chini ya PBS, mjenzi wa kizuizi huunda kifurushi cha miamala na kuweka zabuni kwa ajili ya kujumuishwa kwake katika kizuizi cha Mnyororo Kioleza (kama “mzigo wa utekelezaji”). Mthibitishaji aliyechaguliwa kupendekeza kizuizi kinachofuata kisha anachunguza zabuni tofauti na kuchagua kifurushi chenye ada ya juu zaidi. PBS kimsingi inaunda soko la mnada, ambapo wajenzi wanajadiliana na wathibitishaji wanaouza nafasi ya vizuizi.

Miundo ya sasa ya PBS inatumia [mpango wa ahadi-funua](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) ambapo wajenzi wanachapisha tu ahadi ya kriptografia kwa yaliyomo kwenye kizuizi (kichwa cha kizuizi) pamoja na zabuni zao. Baada ya kukubali zabuni iliyoshinda, mpendekezaji anaunda pendekezo la kizuizi lililosainiwa ambalo linajumuisha kichwa cha kizuizi. Mjenzi wa kizuizi anatarajiwa kuchapisha mwili kamili wa kizuizi baada ya kuona pendekezo la kizuizi lililosainiwa, na ni lazima pia apokee [uthibitisho](/glossary/#attestation) wa kutosha kutoka kwa wathibitishaji kabla ya kukamilishwa.

#### Je, mgawanyo wa mpendekezaji na mjenzi unapunguzaje athari za MEV? {#how-does-pbs-curb-mev-impact}

Mgawanyo wa mpendekezaji na mjenzi ndani ya itifaki unapunguza athari za MEV kwenye makubaliano kwa kuondoa utoaji wa MEV kutoka kwa mamlaka ya wathibitishaji. Badala yake, wajenzi wa vizuizi wanaoendesha vifaa maalum watanasa fursa za MEV mbele.

Hii haiwatengi wathibitishaji kabisa kutoka kwa mapato yanayohusiana na MEV, ingawa, kwani wajenzi lazima watoe zabuni za juu ili vizuizi vyao vikubaliwe na wathibitishaji. Hata hivyo, kwa kuwa wathibitishaji hawajikiti tena moja kwa moja katika kuboresha mapato ya MEV, tishio la mashambulizi ya wezi wa wakati linapungua.

Mgawanyo wa mpendekezaji na mjenzi pia unapunguza hatari za uwekaji kati wa MEV. Kwa mfano, matumizi ya mpango wa ahadi-funua huondoa hitaji la wajenzi kuwaamini wathibitishaji wasiibe fursa ya MEV au kuifichua kwa wajenzi wengine. Hii inapunguza kizuizi kwa waweka hisa wa pekee kufaidika na MEV, vinginevyo, wajenzi wangeelekea kupendelea mabwawa makubwa yenye sifa nje ya mnyororo na kufanya mikataba nje ya mnyororo nao.

Vile vile, wathibitishaji hawana haja ya kuwaamini wajenzi wasizuie miili ya vizuizi au kuchapisha vizuizi batili kwa sababu malipo hayana masharti. Ada ya mthibitishaji bado inachakatwa hata kama kizuizi kilichopendekezwa hakipatikani au kinatangazwa kuwa batili na wathibitishaji wengine. Katika kesi ya mwisho, kizuizi kinatupiliwa mbali, na kumlazimisha mjenzi wa kizuizi kupoteza ada zote za muamala na mapato ya MEV.

### API ya Mjenzi {#builder-api}

Wakati mgawanyo wa mpendekezaji na mjenzi unapoahidi kupunguza athari za utoaji wa MEV, utekelezaji wake unahitaji mabadiliko kwenye itifaki ya makubaliano. Hasa, sheria ya [uchaguzi wa uma](/developers/docs/consensus-mechanisms/pos/#fork-choice) kwenye Mnyororo Kioleza ingehitaji kusasishwa. [API ya Mjenzi](https://github.com/ethereum/builder-specs) ni suluhisho la muda linalolenga kutoa utekelezaji wa kazi wa mgawanyo wa mpendekezaji na mjenzi, ingawa na dhana za juu za uaminifu.

API ya Mjenzi ni toleo lililobadilishwa la [API ya Injini](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) linalotumiwa na wateja wa safu ya makubaliano kuomba mizigo ya utekelezaji kutoka kwa wateja wa safu ya utekelezaji. Kama ilivyoainishwa katika [vipimo vya mthibitishaji mwaminifu](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), wathibitishaji waliochaguliwa kwa majukumu ya kupendekeza vizuizi huomba kifurushi cha miamala kutoka kwa mteja wa utekelezaji aliyeunganishwa, ambacho wanakijumuisha katika kizuizi cha Mnyororo Kioleza kilichopendekezwa.

API ya Mjenzi pia hufanya kazi kama programu ya kati kati ya wathibitishaji na wateja wa safu ya utekelezaji; lakini ni tofauti kwa sababu inaruhusu wathibitishaji kwenye Mnyororo Kioleza kupata vizuizi kutoka kwa vyombo vya nje (badala ya kujenga kizuizi ndani ya nchi kwa kutumia mteja wa utekelezaji).

Hapa chini kuna muhtasari wa jinsi API ya Mjenzi inavyofanya kazi:

1. API ya Mjenzi inaunganisha mthibitishaji na mtandao wa wajenzi wa vizuizi wanaoendesha wateja wa safu ya utekelezaji. Kama ilivyo katika PBS, wajenzi ni wahusika maalum wanaowekeza katika ujenzi wa vizuizi unaohitaji rasilimali nyingi na hutumia mikakati tofauti ili kuongeza mapato yanayopatikana kutoka kwa MEV + vidokezo vya kipaumbele.

2. Mthibitishaji (anayeendesha mteja wa safu ya makubaliano) anaomba mizigo ya utekelezaji pamoja na zabuni kutoka kwa mtandao wa wajenzi. Zabuni kutoka kwa wajenzi zitakuwa na kichwa cha mzigo wa utekelezaji—ahadi ya kriptografia kwa yaliyomo kwenye mzigo—na ada ya kulipwa kwa mthibitishaji.

3. Mthibitishaji anapitia zabuni zinazoingia na kuchagua mzigo wa utekelezaji wenye ada ya juu zaidi. Kwa kutumia API ya Mjenzi, mthibitishaji anaunda pendekezo la kizuizi cha Beacon "lililofichwa" ambalo linajumuisha tu saini yake na kichwa cha mzigo wa utekelezaji na kulituma kwa mjenzi.

4. Mjenzi anayeendesha API ya Mjenzi anatarajiwa kujibu na mzigo kamili wa utekelezaji baada ya kuona pendekezo la kizuizi lililofichwa. Hii inaruhusu mthibitishaji kuunda kizuizi cha Beacon "kilichosainiwa", ambacho wanakisambaza kote kwenye mtandao.

5. Mthibitishaji anayetumia API ya Mjenzi bado anatarajiwa kujenga kizuizi ndani ya nchi ikiwa mjenzi wa kizuizi atashindwa kujibu haraka, ili wasikose zawadi za pendekezo la kizuizi. Hata hivyo, mthibitishaji hawezi kuunda kizuizi kingine kwa kutumia miamala iliyofunuliwa sasa au seti nyingine, kwani ingekuwa sawa na _usawazishaji_ (kusaini vizuizi viwili ndani ya nafasi moja), ambalo ni kosa linaloweza kuadhibiwa.

Mfano wa utekelezaji wa API ya Mjenzi ni [MEV Boost](https://github.com/flashbots/mev-boost), uboreshaji wa [utaratibu wa mnada wa Flashbots](https://docs.flashbots.net/Flashbots-auction/overview) ulioundwa ili kuzuia athari mbaya za nje za MEV kwenye Ethereum. Mnada wa Flashbots unaruhusu wathibitishaji katika uthibitisho-wa-dau kukabidhi kazi ya kujenga vizuizi vyenye faida kwa wahusika maalum wanaoitwa **watafutaji**.
![Mchoro unaoonyesha mtiririko wa MEV kwa undani](./mev.png)

Watafutaji hutafuta fursa za MEV zenye faida na kutuma vifurushi vya miamala kwa wapendekezaji wa vizuizi pamoja na [zabuni ya bei iliyofungwa](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) kwa ajili ya kujumuishwa katika kizuizi. Mthibitishaji anayeendesha mev-geth, toleo la uma la mteja wa go-ethereum (Geth) anahitaji tu kuchagua kifurushi chenye faida zaidi na kukijumuisha kama sehemu ya kizuizi kipya. Ili kuwalinda wapendekezaji wa vizuizi (wathibitishaji) dhidi ya barua taka na miamala batili, vifurushi vya miamala hupitia **warudishaji** kwa ajili ya uthibitisho kabla ya kufika kwa mpendekezaji.

MEV Boost inabaki na utendaji sawa wa mnada wa asili wa Flashbots, ingawa na vipengele vipya vilivyoundwa kwa ajili ya kubadili kwa Ethereum kwenda kwenye uthibitisho-wa-dau. Watafutaji bado wanapata miamala ya MEV yenye faida kwa ajili ya kujumuishwa katika vizuizi, lakini darasa jipya la wahusika maalum, wanaoitwa **wajenzi**, wanawajibika kukusanya miamala na vifurushi katika vizuizi. Mjenzi anakubali zabuni za bei zilizofungwa kutoka kwa watafutaji na anaendesha uboreshaji ili kupata mpangilio wenye faida zaidi.

Mrudishaji bado anawajibika kuthibitisha vifurushi vya miamala kabla ya kuvipitisha kwa mpendekezaji. Hata hivyo, MEV Boost inaleta **eskro** zinazowajibika kutoa [upatikanaji wa data](/developers/docs/data-availability/) kwa kuhifadhi miili ya vizuizi iliyotumwa na wajenzi na vichwa vya vizuizi vilivyotumwa na wathibitishaji. Hapa, mthibitishaji aliyeunganishwa na relay anauliza mizigo ya utekelezaji inayopatikana na anatumia algoriti ya upangaji ya MEV Boost kuchagua kichwa cha mzigo chenye zabuni ya juu zaidi + vidokezo vya MEV.

#### Je, API ya Mjenzi inapunguzaje athari za MEV? {#how-does-builder-api-curb-mev-impact}

Faida kuu ya API ya Mjenzi ni uwezo wake wa kuweka demokrasia katika upatikanaji wa fursa za MEV. Kutumia mipango ya ahadi-funua huondoa dhana za uaminifu na kupunguza vizuizi vya kuingia kwa wathibitishaji wanaotafuta kufaidika na MEV. Hii inapaswa kupunguza shinikizo kwa waweka hisa wa pekee kuungana na mabwawa makubwa ya kuweka hisa ili kuongeza faida za MEV.

Utekelezaji ulioenea wa API ya Mjenzi utahimiza ushindani mkubwa zaidi kati ya wajenzi wa vizuizi, ambao unaongeza upinzani dhidi ya udhibiti. Wakati wathibitishaji wanapopitia zabuni kutoka kwa wajenzi wengi, mjenzi anayekusudia kudhibiti miamala ya mtumiaji mmoja au zaidi lazima atoe zabuni ya juu kuliko wajenzi wengine wote wasiodhibiti ili kufanikiwa. Hii inaongeza kwa kiasi kikubwa gharama ya kudhibiti watumiaji na inakatisha tamaa mazoea hayo.

Baadhi ya miradi, kama vile MEV Boost, inatumia API ya Mjenzi kama sehemu ya muundo wa jumla ulioundwa kutoa faragha ya miamala kwa wahusika fulani, kama vile wafanyabiashara wanaojaribu kuepuka mashambulizi ya mbele/sandwich. Hii inafanikiwa kwa kutoa njia ya mawasiliano ya faragha kati ya watumiaji na wajenzi wa vizuizi. Tofauti na mempool zinazohitaji ruhusa zilizoelezwa hapo awali, mbinu hii ni ya manufaa kwa sababu zifuatazo:

1. Uwepo wa wajenzi wengi sokoni hufanya udhibiti usiwezekane, jambo ambalo linawanufaisha watumiaji. Kinyume chake, uwepo wa mabwawa ya giza yaliyowekwa kati na yanayotegemea uaminifu ungekusanya nguvu mikononi mwa wajenzi wachache wa vizuizi na kuongeza uwezekano wa udhibiti.

2. Programu ya API ya Mjenzi ni ya chanzo-wazi, ambayo inaruhusu mtu yeyote kutoa huduma za ujenzi wa vizuizi. Hii inamaanisha watumiaji hawalazimishwi kutumia mjenzi yeyote wa vizuizi na inaboresha kutopendelea na kutohitaji ruhusa kwa Ethereum. Zaidi ya hayo, wafanyabiashara wanaotafuta MEV hawachangii uwekaji kati bila kukusudia kwa kutumia njia za miamala za faragha.

## Rasilimali zinazohusiana {#related-resources}

- [Nyaraka za Flashbots](https://docs.flashbots.net/)
- [GitHub ya Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Kifuatiliaji chenye takwimu za wakati halisi za relay za MEV-Boost na wajenzi wa vizuizi_

## Masomo zaidi {#further-reading}

- [Thamani Inayoweza Kutolewa na Mchimbaji (MEV) ni Nini?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV na Mimi](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum ni Msitu Mweusi](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Kutoroka Msitu Mweusi](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Kuendesha Mbele Mgogoro wa MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Nyaraka za MEV za @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Usanifu wa Flashbots Tayari kwa Muungano](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV Boost ni Nini](https://www.alchemy.com/overviews/mev-boost)
- [Kwa nini uendeshe mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Mwongozo wa Msafiri kwa Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
