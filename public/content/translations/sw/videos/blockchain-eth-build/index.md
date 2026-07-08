---
title: "Mnyororo wa vitalu — ETH.BUILD"
description: "Onyesho la jinsi uchimbaji wa mnyororo wa vitalu unavyofanya kazi, ikijumuisha jinsi vitalu vinavyounganishwa pamoja, jinsi Uthibitisho wa Kazi (PoW) unavyolinda minyororo ya vitalu, na nini hutokea wakati mtu anajaribu kuchezea data."
lang: sw
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Mnyororo wa vitalu (ETH.BUILD)"
---

Mafunzo na **Austin Griffith** yanayoonyesha jinsi uchimbaji wa mnyororo wa vitalu unavyofanya kazi kwa kutumia zana ya programu ya kuona ya ETH.BUILD. Austin anaangazia mwafaka wa Uthibitisho wa Kazi (PoW), uunganishaji wa vitalu, ugumu wa uchimbaji, tuzo ya bloku, na kutobadilika kwa mnyororo.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) iliyochapishwa na Austin Griffith. Imehaririwa kidogo ili isomeke vizuri.*

#### Tatizo la uratibu (0:00) {#the-problem-of-coordination-000}

Habari za asubuhi, Ijumaa njema ya Bowtie! ETH.BUILD hii inaangazia mnyororo wa vitalu — kitu kizuri sana. Tuko kwenye boti hii ya kuchekesha, tai yetu ya Bitcoin kwa ajili yake. Twende kazi.

Kwa hivyo katika mtaala hadi sasa, tumepitia jozi za ufunguo, heshi, na leja. Kile tulichogundua ni kwamba ikiwa tunataka kufanya miamala ya thamani huku na huko kwenye mtandao uliosambazwa — sio uliowekwa kati — tunaishia kuwa na matatizo ya uratibu. Tunaishia kuwa na suala hili ambapo hatuwezi kupata mwafaka kati ya pande tofauti kwa sababu wote wanapokea miamala tofauti kwa nyakati tofauti. Kuna njia nyingi tofauti za kutatua hili, lakini hakuna hata moja iliyokuwa nzuri hadi Uthibitisho wa Kazi (PoW) ulipokuja.

Tulishughulikia majenerali wa Byzantine kama mada ya kando, na kile tulichojifunza hapo ni kwamba majenerali walihitaji kuthibitisha kuwa walikuwa na jeshi walipotuma ujumbe kwenye mtandao usio salama. Kisha upande unaopokea ungeweza kujua kwamba mtu huyo alikuwa kweli jenerali aliye na jeshi ambalo lingeshambulia, na wangeweza kuratibu.

#### Vitalu na nonsi (1:04) {#blocks-and-the-nonce-104}

Kwa hivyo na leja hii, tunaingiza miamala kutoka kwenye mtandao. Badala ya kuwa na kila mtumiaji binafsi kuthibitisha kazi yake, tutaweka Uthibitisho wa Kazi (PoW) kwenye kitalu cha miamala na kumruhusu mchimbaji afanyie kazi hilo.

Tunaleta kitalu kinachoshikilia miamala — chochote kinachokuja kwenye mtandao, tunakipakia kwenye kitalu hiki. Ikiwa tutaangalia muundo wa kitalu hiki, pia kina nonsi. Nonsi hiyo inaturuhusu kurekebisha heshi. Ikiwa tutachukua kitalu hiki chote, kukiweka katika muundo wa maandishi, na kukiheshi, tunapata heshi. Kadiri miamala inavyobadilika, heshi hiyo inabadilika, lakini pia tunapobadilisha nonsi, heshi inabadilika pia.

Tunafanya kazi fulani hapa — tuna seti ya miamala ya nasibu, na tunabadilisha nonsi hadi heshi iwe na sifuri inayoongoza. Ikiwa ulitazama mada ya kando kuhusu majenerali wa Byzantine, tulichagua sifuri hii inayoongoza kama kiasi cha kazi cha kuthibitisha. Kwa hivyo nonsi inapitia kila nambari — moja, mbili, tatu, nne — na tunapopata sifuri inayoongoza, tunasema: hicho ni kitalu halali.

#### Uthibitisho wa Kazi (PoW) kwa vitendo (3:00) {#proof-of-work-in-action-300}

Ikiwa tutachukua kitalu kilichochimbwa, kutoa heshi, na kuiweka kwenye kazi ya heshi, tunaweza kuthibitisha kuwa ina sifuri inayoongoza — tunaweza kuthibitisha kuwa kitalu hiki kimefanyiwa kazi.

Kazi ya heshi inagharimu CPU, ambayo ni rasilimali yenye ukomo. Tunaweka nguvu zetu zote za CPU kujaribu kupata heshi yenye sifuri zinazoongoza. Mara tu tunapofanya hivyo, tunakuwa na kitalu halali — kitalu kimsingi kinakuwa kimekamilika na hakiwezi kubadilishwa. Miamala yoyote iliyokuwa hapo wakati huo iko kwenye kitalu hiki sasa, na kila mtu anakiheshimu, na tunaweza kuendelea na kitalu kinachofuata.

#### Kuunganisha vitalu pamoja (3:56) {#chaining-blocks-together-356}

Hapa kuna mbinu: tunachukua kitalu cha zamani na kukiunganisha na kitalu kipya. Ikiwa tutaangalia muundo, kitalu kipya hakina miamala na kina nonsi tupu, lakini kina mzazi aliye na miamala. Kitalu kilichotangulia kitakuwa sehemu ya kitalu kinachofuata, kwa hivyo tutakuwa na mnyororo mzima.

Tunaweka miamala ya hivi punde kutoka kwenye kusanyiko la miamala na kufanya kazi ya kutafuta nonsi. Kitalu namba mbili kinachimbwa — tulihitaji nonsi ya kumi ili kufanya miamala hii iwe halali. Kisha tunafanya kitu kile kile: kuunganisha kitalu cha zamani, kuleta kipya, kuweka miamala yoyote ya hivi punde, na kukifanyia kazi tena. Baada ya majaribio ya kutosha tulipata nonsi ya kitalu cha tatu. Kitalu cha nne — mchakato ule ule, na tunaendelea mbele.

#### Ugumu wa uchimbaji (5:02) {#mining-difficulty-502}

Hii ni rahisi sana — tunaweza kupata kitalu halali haraka sana, na tunataka iwe ngumu zaidi. Nitaongeza ugumu hadi mbili. Tunaunganisha kitalu cha tano, kuleta miamala ya hivi punde, na kuweka kihesabu kiendelee. Sasa tunachimba — tukitumia nguvu yetu ya CPU yenye ukomo kutupa heshi za nasibu kwenye hii hadi tupate heshi yenye sifuri mbili zinazoongoza, kwa sababu ugumu umeongezwa. Hiyo itachukua muda kidogo.

Sasa tuna mnyororo wa vitalu huu wa vitalu vitano. Vitalu hivyo vinashikilia miamala na kila kimoja kinarejelea kile kilichotangulia. Kila kitalu kilichukua kiasi fulani cha kazi kuzalishwa, na kiasi cha kazi kinadhibitiwa na ugumu.

#### Mchimbaji (6:46) {#the-miner-646}

Hebu tuangalie mchimbaji ni nini. Katika tatizo la majenerali wa Byzantine, jenerali aliyetaka "kushambulia alfajiri" alihitaji wanajeshi. Kinachoendelea ndani ya kila mwanajeshi ndicho hasa tunachofanya hapa na mchimbaji wetu — tunachukua ujumbe na nonsi na kuitupa kwenye kazi ya heshi haraka iwezekanavyo, tukijaribu kupata hizo sifuri zinazoongoza. Sifuri zinazoongoza ni kitu tulichokubaliana sote — hii ni kazi ya kutosha kuthibitisha kuwa wewe ni mwanajeshi, au kwamba unaweza kupigana vita.

Ngoja nilete mchimbaji na nifanye hili haraka kidogo. Mchimbaji atafanya kitu kile kile kwa vitalu vyetu — anachukua miamala inayoingia kutoka kwenye kusanyiko la miamala, kuiingiza kwenye kitalu, na kuifanyia kazi hadi apate heshi halali.

Mchimbaji ana ufanisi zaidi kidogo. Analenga zaidi kwenye uchimbaji. Anatupa heshi kwa nasibu — ndicho hasa mchimbaji wetu alikuwa akifanya hapo awali, kimefichwa tu. Tunaweza kuiona ikiendelea nyuma, ikifanya kazi kwenye heshi. Imeipata — kitalu cha sita kimechimbwa.

#### Matumizi mara mbili na usambazaji wa mtandao (10:00) {#double-spends-and-network-propagation-1000}

Sasa tulizungumza kuhusu suala hili la matumizi mara mbili, na hata suala hili la usambazaji wa mtandao. Tunapokuwa na leja na mtandao uliosambazwa na mtu anatuma muamala, unawafikia watu tofauti kwa nyakati tofauti. Kwa hivyo, tunaweza kuwa na wachimbaji wawili huko nje kwenye mtandao ambao wote wanachimba kitalu kwa wakati mmoja, na wana miamala tofauti ndani yake.

Kila kimoja ni halali wakati huo — wote walifanya Uthibitisho wa Kazi (PoW), wote wana sifuri zinazoongoza. Lakini haviwezi vyote kuwa rasmi. Haviwezi vyote kuwa ukweli. Kwa hivyo tunahitaji njia ya mtandao kufikia mwafaka kuhusu upi ni mnyororo halisi.

#### Wachimbaji wengi na mwafaka (12:27) {#multiple-miners-and-consensus-1227}

Ngoja nichukue kitalu hiki na kukiweka hapa. Ninachotaka ni wachimbaji wawili tofauti wanaofanya kazi kwenye tatizo lile lile, wakisikiliza kusanyiko la miamala lile lile na kuja na vitalu kwa kujitegemea. Tuna wachimbaji wawili: Mallory na Mike. Nimeongeza ugumu hadi tatu, na wote wanafanya kazi ya kutafuta heshi yenye sifuri tatu zinazoongoza.

Kwa hivyo Mallory alipata kitalu kwanza! Vizuri. Sasa nini kinatokea — kwa sababu tuko kwenye mtandao uliosambazwa, Mike anaweza hata asijue kuhusu kitalu cha Mallory bado. Anaweza kuwa bado anafanyia kazi toleo lake mwenyewe. Na sasa Mike amepata kimoja pia. Kwa hivyo tuna njia mbili halali.

Ikiwa wewe ni mwenza mmoja kwenye mtandao na unaona kitalu cha Mallory kwanza, unafikiri hicho ndicho kitalu kikuu. Kisha baadaye kitalu cha Mike kinafika. Unaviweka vyote viwili endapo kimoja wapo kitakuwa mnyororo mrefu zaidi. Na sheria ni: fuata mnyororo mrefu zaidi ulio halali.

#### Coinbase na tuzo ya bloku (15:33) {#coinbase-and-block-rewards-1533}

Wakati mchimbaji anachimba kitalu, tunasema: hapa kuna miamala yote tunayotaka, hapa kuna nonsi, hapa kuna mzazi — lakini pia tutasema huyu ndiye mtu aliyechimba kitalu hicho. Inaitwa coinbase — nadhani kuna kampuni inayoitwa hivyo sasa, lakini ni tofauti. Tutaiita tu "mchimbaji." Kwa hivyo vitalu vyetu sasa vinahitaji uwanja wa mchimbaji.

Kwa hivyo Mike amepata kitalu, na Mike pia atapata thamani ya kumi kutokana na hili. Tunahitaji kuwapa motisha wachimbaji kufanya kazi hii yote, sivyo? Wanatumia pesa kununua mitambo hii ili kimsingi kufanya mtandao uwe salama. Wachimbaji hawa wanatumia pesa kulinda mtandao kwa nguvu zao zote za heshi — na wachimbaji wote kwa pamoja, labda makumi ya maelfu. Wanalipa pesa nzuri kujenga mitambo inayofanya kazi kwenye heshi hizi, na ili kuwapa motisha tunawapa mgao unaoitwa tuzo ya bloku ya kila kitalu wanachochimba.

#### Tuzo ya bloku na motisha (16:52) {#block-rewards-and-incentives-1652}

Kwa hivyo katika toleo hili la kitalu, Mallory ana dola kumi, lakini katika toleo hili Mike ana dola kumi. Kila mmoja wa wachezaji hawa wawili anapewa motisha ya kuendelea na mnyororo wake mwenyewe, na mtandao uliosalia unahitaji kupata mwafaka. Kimsingi inategemea nani ana mnyororo mrefu zaidi ulio halali.

Mike ataweka kitalu chake kama mzazi na kuanza kufanyia kazi kitalu kinachofuata. Mallory atafanya kitu kile kile. Na inategemea nani mwingine kwenye mtandao anachagua upande wa nani. Kwa kuwa hatutaki kuwaadhibu watu wenye mitandao mibaya, nina uhakika kabisa kwamba katika Ethereum tunalipa vitalu vya mjomba (uncle blocks) — vitalu halali ambavyo havikuweza kuingia kwenye mnyororo mrefu zaidi — kwa sababu bado vinasaidia kulinda mtandao.

Tulikuwa na tatizo hili la uratibu na mwafaka, na tulilitatua kwa kuweka kiasi hiki cha kazi ambacho kinapaswa kuhusishwa ili kufanya miamala iwe halali. Mallory alifanya kazi hii yote ya uheshiji na uheshiji na uheshiji ili kupata sifuri tatu zinazoongoza za heshi ya miamala hii yote na kitalu kilichotangulia.

#### Kuuliza mnyororo wa vitalu (18:30) {#querying-the-blockchain-1830}

Tunaweza kuwasiliana na mnyororo wowote ulio mrefu zaidi. Mike hajafika saba bado, kwa hivyo tunaweza kuona urefu bado ni sita hapa. Na tunaweza kufanya mambo kama kuuliza salio la watu. Kwa hivyo tunabonyeza salio — tunapata nini? Tano ishirini na nne. Kwa hivyo Heidi amekuwa na 524 au chochote ambacho ni tokeni asili ya mnyororo huu. Tunaweza kuona nonsi yake, tunaweza kufanya kila kitu ambacho tungeweza kufanya na leja, lakini sasa tunapanga vitalu na vitalu hivyo vinashikilia miamala.

Tumeondoa kazi kutoka kwa watumiaji, ambao wanatuma pesa tu, kwenda kwa wachimbaji, na tumewapa motisha kwa kuwapa tuzo ya bloku hii. Pia kutakuwa na kiasi kidogo ambacho kila mtu analipa kwa kila muamala, lakini tutafikia hilo katika kipindi cha baadaye. Hatutaki kuzungumzia gesi sasa hivi, lakini inasaidia kujua kwamba kuna motisha sio tu ya kuchimba kitalu, bali kuchimba kitalu kamili chenye miamala mingi. Lakini hiyo ni motisha ndogo — tutafikia hilo hatimaye.

#### Kutobadilika kwa mnyororo (19:51) {#chain-immutability-1951}

Kadiri vitalu vinavyochimbwa, vinazidi kuwa salama zaidi. Ngoja nikuonyeshe ninachomaanisha. Kwa hivyo Mike alichimba kitalu, Mallory alikuwa hapa akifanya onyesho na hakuweza kuchimba kitalu. Kwa hivyo sasa mnyororo wa Mike utakuwa mrefu zaidi, na utaenda kwenye mtandao mzima. Kila mtu atauona na kusema: sawa, mnyororo huu una vitalu saba, vyote ni halali — huu ndio tutakaoufuata. Unaweza kupata michepuo migumu (hard forks), michepuo yenye utata, ambapo sheria tunazocheza nazo zitabadilika na makundi tofauti ya watu wanataka kufuata minyororo tofauti. Mambo mazuri.

Sawa hatimaye, ikiwa tutarudi kwenye kitalu cha tatu na kubadilisha kitu — kubadilisha maelezo yoyote madogo — nitaingia hapa. Kuna muamala fulani kwa Frank. Tuseme badala ya Frank tunambadilisha kuwa Eve. Sasa tazama kinachotokea ninapobonyeza sawa: angalia hiyo. Nilibadilisha kipande kidogo sana cha kitalu cha tatu na ghafla mnyororo mzima unaporomoka. Sio halali tena. Ikiwa ningetangaza hilo kwenye mtandao, watu wangenicheka na kunifukuza.

Huwezi kubadilisha chochote mara tu kitalu kinapochimbwa isipokuwa urudi nyuma na kuchimba tena vitu vinavyobadilika. Kimsingi ningelazimika kuunganisha mchimbaji tena hapa na kujaribu kuwa na nguvu ya kutosha kumfikia Mike hadi huku akiwa na vitalu saba. Ingekuwa ngumu sana, sana. Kadiri kitalu kinavyokuwa chini zaidi, ndivyo inavyokuwa ngumu zaidi kurudi. Ukweli kwamba kitalu hiki cha tatu hapa ambapo Carlos alituma 84 kwa Bob — Bob anaweza kuwa salama kabisa akijua kwamba, vitalu vingi chini, pesa hizo zipo kwa uhakika. Hakuna njia kutakuwa na mchepuo wenye utata hapa — niko imara. Hicho ndicho tunachokiita ukamilifu.

#### Muhtasari (22:00) {#summary-2200}

Badala ya kuwa na leja na suala hili la mwafaka, tunatumia Uthibitisho wa Kazi (PoW) kufanya kazi kwenye heshi ili kuhalalisha kitalu — na "halali" inamaanisha idadi ya nasibu ya sifuri zinazoongoza. Bado tutakumbana na matatizo tunapojenga mnyororo wa vitalu, ambapo vitalu vilivyochimbwa vinaweza kufika katika maeneo tofauti kwa nyakati tofauti. Kwa hivyo tuna kanuni zaidi ya mwafaka inayosema: fuata mnyororo mrefu zaidi ulio halali na unaofuata seti ya sheria unayotaka kushiriki.

Sawa, Ijumaa njema ya Bowtie! Huo ulikuwa mnyororo wa vitalu kwenye ETH.BUILD. Nitahifadhi hii na kuiweka hapo ili uweze kubonyeza "pakia" na kuwa na mnyororo wa kucheza nao. Ijumaa njema!