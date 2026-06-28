---
title: "Zaidi ya itifaki ya Ethereum: utengano wa mpendekezaji na mjengaji"
description: "Wasilisho kuhusu utengano wa mpendekezaji na mjengaji (PBS), muundo unaotenganisha majukumu ya ujenzi wa kitalu na upendekezaji wa kitalu katika Ethereum."
lang: sw
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Ufafanuzi wa PBS"
---

Wasilisho haya linaeleza jinsi uzalishaji wa kitalu wa Ethereum ulivyobadilika kutoka muundo rahisi hadi mnyororo wa usambazaji wa kisasa unaohusisha wathibitishaji, wajenzi, watafutaji, na relays. Barnabé Monnot kutoka Taasisi ya Ethereum anaeleza kwa nini utengano wa mpendekezaji na mjengaji upo, jinsi relays za MEV-Boost zinavyopatanisha uhusiano kati ya wapendekezaji na wajenzi, na ni suluhisho gani za ndani ya itifaki zinazochunguzwa ili kupunguza utegemezi wa uaminifu na kuboresha upinzani dhidi ya udhibiti, usambazaji wa MEV, na ugatuzi wa mthibitishaji.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=u8XvkTrjITs) iliyochapishwa na CBER Forum. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Utangulizi (0:00) {#introduction-000}

Jina langu ni Barnabé Monnot. Nitazungumza kidogo kuhusu kile kinachotokea nje ya itifaki, na hasa dhana ya utengano wa mpendekezaji na mjengaji na jinsi inavyoendeshwa na relays na miundombinu mingi iliyo nje ya mnyororo.

Ninapenda kufikiria itifaki kama kitu cha kufikirika ambacho kina nguvu fulani. Moja ya nguvu ambayo itifaki inayo ni uwezo wa kutoa haki kwa washiriki fulani. Tumeona katika mazungumzo yaliyopita kwamba itifaki inawapa wathibitishaji uwezo wa kutekeleza majukumu ya mwafaka, lakini sio jambo pekee wanalofanya — pia tunapaswa kujaza vitalu na miamala. Tunaita hayo majukumu ya utekelezaji, na hilo ndilo ninalotaka kulizingatia katika mazungumzo haya.

#### Kwa nini wathibitishaji hutumia wajenzi (0:46) {#why-validators-use-builders-046}

Kinachovutia ni kwamba ingawa itifaki ndiyo inayoanzisha haki hizi na kuwapa wathibitishaji, kile tunachokiona katika uhalisia ni kwamba wathibitishaji wengi huchagua kutotumia haki hiyo wenyewe. Wanachagua kumpa mtu mwingine haki hiyo ili aitekeleze kwa niaba yao. Na huyo "mtu mwingine" tunamjua katika Ethereum kama wajenzi.

Kwa hivyo tunachokiona ni kwamba ingawa wathibitishaji wanaendelea kufanya majukumu haya ya mwafaka wenyewe, wanaamua kupitisha majukumu ya utekelezaji kwa wajenzi. Kwa kweli ni soko kubwa sana. Leo takriban 90% ya vitalu hujengwa na wajenzi wa nje, na hali imekuwa hivyo tangu takriban Desemba 2022 — miezi mitatu baada ya Unganisho. Malipo ya wastani kutoka kwa mjenzi kwenda kwa mthibitishaji ni takriban $120 kwa kila kitalu. Kuna dola milioni moja zinazolipwa kila siku, na kila sekunde 12 kuna uwezekano wa soko hili kufikia aina fulani ya makubaliano kati ya mpendekezaji mmoja na mjenzi mmoja.

Leo nataka kujadili kwa nini wathibitishaji hutumia wajenzi, uhusiano huo unatoka wapi — nitaanzisha kidogo kuhusu MEV na watafutaji njiani — kisha nitakuambia jinsi uhusiano huu unavyopatanishwa, na nitazungumza kuhusu relays zilizopo leo na suluhisho za ndani ya itifaki tunazofikiria. Pia nataka kupanua mtazamo kidogo, kwa sababu ni rahisi kuona picha hizi na kufikiria "oh hii inatisha sana, vipi kuhusu ugatuzi?" Nataka kukupa hisia kwamba hizi ni mabadilishano yanayofanywa, lakini kwa maoni yangu yanafanywa katika mwelekeo sahihi.

#### Muundo rahisi na MEV (3:04) {#the-naive-model-and-mev-304}

Unaweza kufikiria muundo rahisi wa uzalishaji wa kitalu ambapo mthibitishaji anachaguliwa kulingana na mchakato wa uteuzi wa kiongozi, na wanapaswa kutengeneza kitalu kilicho na orodha ya miamala kutoka kwenye mempool. Katika muundo rahisi zaidi, unakuwa na pande mbili tu — mthibitishaji anayesikiliza mempool, na inapofika zamu yao ya kutengeneza kitalu, wanachukua miamala inayolipa ada nyingi zaidi na kuiweka, kwa kawaida wakitumia kanuni za ujazaji ambazo si za kisasa sana.

Kile ambacho kimeonekana kwa kiasi kikubwa katika miaka mitano iliyopita ni kwamba hii inampa mzalishaji nguvu nyingi — hasa nguvu ya kuona mwisho. Wanaona kile watumiaji wanachotaka kufanya, kwa mfano wanaona kwamba mtumiaji anataka kufanya badilishano la kitu, na wanaweza kutumia taarifa hiyo kujipatia faida wenyewe.

Katika hali nzuri zaidi faida hii inatokana na utendaji wa asili wa soko kama vile usuluhishi. Katika hali mbaya zaidi inaweza kutoka moja kwa moja mfukoni mwa mtumiaji, kama ilivyo katika mashambulizi ya sandwich. Kwa mfano, mtumiaji anaweka oda ya badilishano la tokeni A dhidi ya tokeni B kwenye soko fulani kama Uniswap. Muamala huo utaunda ukosefu wa usawa wa bei na soko lingine lililowekwa kwenye mnyororo huo huo. Mzalishaji anaweza kuona muamala unaosubiri na kuingiza muamala wao wenyewe unaofanya badilishano katika mwelekeo mwingine kwenye soko tofauti, akijipatia faida ya usuluhishi njiani.

Hii inampa mzalishaji nguvu nyingi sana na inafanya nafasi ya kuwa mzalishaji wa kitalu kuwa ya thamani kubwa. Upendeleo huu wa mzalishaji ni kitu ambacho sasa tunakiita **thamani ya juu inayoweza kutolewa (maximal extractable value - MEV)**.

#### Jukumu la watafutaji (5:43) {#the-role-of-searchers-543}

Katika uhalisia, wazalishaji wanaweza wasijue thamani ilipo. Unaweza kuwa na wazalishaji wa kitalu wasio na ujuzi sana — kama ilivyotajwa, mtu yeyote anaweza kuwa mthibitishaji mradi tu ana mtaji wa kutosha na ana uwezo wa kuendesha nodi. Katika uhalisia, naweza nisijue jinsi ya kufanya usuluhishi au chochote kuhusu masoko ya kifedha. Kile ningetaka ni mtu aniambie fursa hizi ziko wapi — soko la watu wanaoshindana kuniambia jambo bora la kufanya kama mzalishaji wa kitalu.

Mashirika haya ambayo ni mazuri sana katika kupata fursa, tunayaita **watafutaji**. Wanaibua fursa kwa mzalishaji wa kitalu. Mtafutaji anaweza kuona mtumiaji akifanya badilishano, iwe kupitia mempool ya umma au kupitia mabwawa ya giza au njia za kibinafsi, na kisha kuwasiliana na mthibitishaji: "Kuna badilishano linafanyika — ukijaza badilishano hili pamoja na usuluhishi huu katika kifurushi cha miamala ya atomiki na kujumuisha kifurushi hiki, basi unaweza kupata pesa kutokana na usuluhishi." Utakuwa na watafutaji wengi wanaoshindana kumshawishi mzalishaji wa kitalu.

Muundo huu unafanya kazi vizuri katika uhalisia ikiwa mtafutaji anamwamini mzalishaji kuweka kifurushi kuwa cha atomiki. Huenda umesikia hivi karibuni kuhusu shambulio kwenye Ethereum ambalo liligharimu dola milioni 25 kwa kundi la washambuliaji wa sandwich — chanzo kikuu kilikuwa kwamba mshambuliaji alifanikiwa kuvunja uatomiki wa vifurushi, akipokea yaliyomo na kujaribu kuyapanga upya na kuyarekebisha. Hiyo ni sifa muhimu sana ambayo inashikilia tu mradi mzalishaji anaweza kuaminika kutovunja uatomiki huu.

#### Kwa nini tunahitaji wajenzi (8:16) {#why-we-need-builders-816}

Unafanya nini ikiwa mzalishaji haaminiki? Baada ya Unganisho katika Ethereum, tuna waweka dhamana wa pekee — takriban 6% ya mtandao — ambao hatuwajui. Watafutaji hawatataka kutuma vifurushi kwa wapendekezaji hawa wa kitalu kwa sababu ni hatari kidogo.

Kwa hivyo muundo uliofikiwa ni: badala ya kuwa na watafutaji wanaowasilisha vifurushi ambavyo mzalishaji anavijumuisha kwenye kitalu chao, tutakutengenezea kitalu kizima. Kwa njia hiyo unaweza tu kutia saini kitalu bila kujua — huhitaji kujua kilichomo ndani, unaamini kwamba mjenzi anakupa kitalu kizuri.

Sasa una mnyororo huu wa kina zaidi: mthibitishaji upande mmoja, mtumiaji upande mwingine, na katikati mnyororo huu wote wa wapatanishi ambao unaendelea kuwa mzito zaidi kadiri muda unavyosonga. Mjenzi anafanya sehemu ya utekelezaji huku mthibitishaji akifanya mwafaka.

#### Jinsi relays za MEV-Boost zinavyofanya kazi (13:01) {#how-mev-boost-relays-work-1301}

Tuseme wewe ni mpendekezaji na unataka kuingia katika soko hili. Huduma hii ya uzalishaji wa kitalu ni tatizo la kawaida la ubadilishanaji wa haki — pande mbili zinazojaribu kufikia makubaliano lakini haziaminiani. Fasihi ya kawaida inakuambia kwamba huwezi kufanya ubadilishanaji wa haki bila mtu wa tatu anayeaminika.

Kile tunachotumia leo kama mtu wa tatu anayeaminika ni kile tunachokiita **relay** — relay ya MEV-Boost. MEV-Boost ni jina la itifaki inayopatanisha mwingiliano kati ya wajenzi na wathibitishaji. Relay inakaa katikati ili kuhakikisha kwamba makubaliano yanafikiwa kutoka pande zote mbili.

Relay ina majukumu kadhaa. Kwanza, inahitaji kuthibitisha mzigo wa mjenzi — relay inaona wazi kitalu ambacho mjenzi anatengeneza na inaweza kuangalia kwamba ni halali na kinaweza kupendekezwa kwa mtandao. Kuna tofauti inayoitwa relay yenye matumaini, ambapo relay haiangalii uhalali mara moja lakini inamwomba mjenzi dhamana endapo kitalu kitakuwa batili hatimaye.

Pili, wajenzi wanatoa zabuni wakijaribu kushindana ili kuwa mjenzi aliyechaguliwa na mthibitishaji. Relay inafanya kazi kama msambazaji wa zabuni, ikituma zabuni kwa mthibitishaji. Kisha katika hatua ya mwisho, mara tu mthibitishaji anapochagua moja ya zabuni kutoka kwa relay — na mthibitishaji anaweza kuunganishwa na relays nyingi kadiri anavyotaka — wanaitia saini, bado bila kujua yaliyomo kwenye kitalu ni nini, na kutuma tena zabuni iliyotiwa saini kwa relay. Kwa kuzingatia zabuni hii iliyotiwa saini, relay inaweza kutoa kitalu kwa mtandao.

Uchumi wa relays ni mgumu. Baadhi ni za bure, kama vile bidhaa za umma. Nyingine zimeunda mifumo ya mapato — relay ya Ultrasound, kwa mfano, ina "marekebisho ya zabuni" ambapo wanachukua tofauti kati ya zabuni bora na ya pili bora kama mapato.

#### Uaminifu na relay (17:01) {#trust-and-the-relay-1701}

Relay ni mtu wa tatu anayeaminika katika mfumo. Tuseme relay inatoa kitalu batili — watu wataiona mara moja kwa sababu imetiwa saini, na watakata muunganisho haraka sana kutoka kwa relay hiyo. Unaweza hata kusambaza aina fulani ya uthibitisho wa hitilafu. Ndani ya vitalu vitano, ikiwa relay haifanyi vizuri, watu wataacha kuiamini na kukata muunganisho tu.

Kwa hivyo inategemea uaminifu, lakini kwa dhana kwamba inaweza kubadilishwa haraka kiasi. Relays si wathibitishaji — si lazima wawe na dhamana na si lazima wawe na uhusiano wowote na Ethereum. Wanaweza kuwa watu tunaowajua na kuwapenda leo, lakini kesho anaweza kuwa mtu yeyote.

#### Kuingiza PBS katika itifaki (20:01) {#enshrining-pbs-in-the-protocol-2001}

Tunajaribu kuondoa hadhi ya relay kama mtu wa tatu anayeaminika. Tuna mtu wa tatu anayeaminika ambaye tunampenda katika Ethereum — na ni Ethereum yenyewe. Unaweza kubuni suluhisho za ndani ya itifaki ambazo zinajaribu kimsingi kuingiza jukumu la relay na kufanya utegemezi kwake kuwa wa hiari.

Sasa hivi, itifaki ya Ethereum inaona sehemu ya kile wathibitishaji wanachofanya lakini ni kipofu kabisa kwa mtandao wa wajenzi. Tunajaribu kuisukuma ili itifaki ya Ethereum iwe mtu wa tatu anayeaminika katika mwingiliano kati ya mpendekezaji na mjenzi — kwa maana hiyo, hatuhitaji kutegemea relay tena.

#### Kuwekea mipaka wajenzi, kukuza ugatuzi (22:05) {#constraining-builders-amplifying-decentralization-2205}

Picha kubwa ni muhimu. Katika kila tabaka inaonekana kuna michezo tofauti inayoendelea na wachezaji tofauti wakichukua pesa kutoka kwa kila mmoja — je, hii ni fedha za jadi tena? Nataka kutoa hoja kwamba mabadilishano haya hayatoki mahali pabaya. Yanajaribu kuegemea kwenye sifa za mifumo hii ambazo tunafikiri ni muhimu kuzipanua na kuzifanya ziwe na manufaa zaidi.

Vitalik alizungumza kuhusu ukosefu wa usawa wa kimsingi wa huduma ambazo mnyororo wa vitalu unaweza kutoa. Mwafaka unahitaji kundi kubwa sana lililogatuliwa la watu wanaofuatilia. Lakini baadhi ya huduma kwa kweli zinahitaji mtu mmoja kufanya kazi vizuri na kwa kila mtu mwingine kuthibitisha kwamba kazi ilifanywa vizuri. Tunahitaji mjenzi mmoja tu kutengeneza kitalu, na kisha kila mtu anaweza kuthibitisha kuwa ni halali.

Leo kuna wajenzi watatu wakuu waziwazi: Beaver Build, Titan, na rsync Builder. Je, hiyo ni hali nzuri ya mambo? Sio kweli — tunaweza kufanya vizuri zaidi. Lakini je, ni kweli kufikiria tutakuwa na wajenzi wengi kama wathibitishaji? Pengine hapana.

Kile tunachotaka hasa ni tabaka hili jembamba la wathibitishaji kuweka mipaka na kutumia ukweli kwamba kuna pande zenye nguvu kubwa katikati ambazo zinaweza kufanya kazi ambazo hazihitaji dhana za wengi waaminifu.

Baadhi ya mawazo ya kuwekea mipaka wajenzi:

- **Orodha za ujumuishaji** — ambapo mthibitishaji anamwambia mjenzi "unapaswa kujumuisha miamala hii kwenye kitalu chako"
- **Ujenzi wa kitalu kwa kiasi** — kuvunja kitalu kizima ili mjenzi asiwe na ukiritimba juu ya nafasi yote
- **Kupunguza utegemezi wa watu wa tatu** — kuingiza jukumu la relay katika itifaki

Ili kukuza ugatuzi wa mthibitishaji:

- **Utengano wa mshuhudiaji na mpendekezaji** — badala ya kumfanya mthibitishaji kuwa mzalishaji wa kitalu kwa chaguo-msingi, kuchagua kundi tofauti la watu kuwa wazalishaji wa kitalu na kutenganisha majukumu
- **Taratibu zilizoboreshwa za uwekaji dhamana** — uwekaji dhamana katika Ethereum ni wa kimsingi kidogo leo na unaweza kuboreshwa

#### Maswali na kufunga (27:03) {#questions-and-closing-2703}

Swali kutoka kwa watazamaji: katika ulimwengu wa fedha za jadi, muda wa ukamilishaji unapunguzwa kutoka siku mbili hadi siku moja. Je, kupunguza muda wa ukamilishaji kutoka sekunde 12 hadi muda mfupi zaidi kutashughulikia baadhi ya matatizo ya utangulizaji muamala?

Watu wanazungumza kuhusu hili — wanaliita **uthibitisho wa awali (pre-confirmations)**. Wazo ni kwamba unatuma muamala wako na mtu anakuambia "umeingia, kwa bei hii, kwenye hali hiyo." Jambo ni kwamba, huwezi kukamilisha haraka kuliko itifaki inavyoendeshwa. Huwezi kupata ukamilishaji wa ukamilifu haraka kuliko dakika 12. Huwezi kwenda haraka kuliko muda wa kitalu.

Kufupisha muda wa kitalu ni kugumu kwa sababu tunataka kuweka tabaka la mthibitishaji kuwa lililogatuliwa iwezekanavyo, na kulifupisha kunaongeza tu mahitaji ya vifaa.