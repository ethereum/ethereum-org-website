---
title: "EIP-7805: Orodha za ujumuishaji zinazolazimishwa na chaguo la mchepuo (FOCIL)"
description: "Watafiti wa Ethereum Thomas Thiery na Julian Ma wanapitia EIP-7805 (FOCIL), ambayo inatumia orodha za ujumuishaji za ndani zilizokusanywa ili kuhakikisha kuwa miamala halali haiwezi kudhibitiwa na wajenga kizuizi."
lang: sw
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Sehemu ya 141 ya **PEEPanEIP** na Ethereum Cat Herders. Mwenyeji Pooja Ranjan anajumuika na **Thomas Thiery** na **Julian Ma**, watafiti katika Kikundi cha Motisha Imara katika Taasisi ya Ethereum na waandishi wenza wa [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), kuelezea Orodha za Ujumuishaji zinazolazimishwa na Chaguo la Mchepuo (FOCIL): kwa nini Ethereum inahitaji ukinzani wa udhibiti katika kiwango cha itifaki, jinsi utaratibu unavyofanya kazi, na hatua ya utekelezaji ilipofikia.

*Nakala hii ni toleo linalofikika la [nakala asili ya video](https://www.youtube.com/watch?v=cUGyLx-mf6I) iliyochapishwa na Ethereum Cat Herders. Imehaririwa kidogo ili isomeke kwa urahisi.*

### Utangulizi (0:35) {#introduction-035}

**Pooja Ranjan:** Hujambo na karibu kwenye PEEPanEIP, kipindi cha pekee ambapo tunachunguza kwa kina Mapendekezo ya Kuboresha Ethereum na kuchunguza athari zake kwenye mfumo ikolojia. Hii ni sehemu ya 141, inayoletwa kwenu na Ethereum Cat Herders. Mimi ni mwenyeji wako, Pooja Ranjan, na leo tunazungumzia EIP-7805, Orodha za Ujumuishaji zinazolazimishwa na Chaguo la Mchepuo.

Iliyoandikwa mnamo Novemba 2024, EIP-7805 ni pendekezo la msingi la mkondo wa viwango ambalo kwa sasa lipo katika hali ya rasimu. Pendekezo hili linalenga kuruhusu kamati ya wathibitishaji kulazimisha kujumuisha seti ya miamala katika kila kitalu. Imeandikwa kwa ushirikiano na Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann, na Jihoon Song, pendekezo hili liko katika mjadala unaoendelea kwa ajili ya uboreshaji wa siku zijazo.

Katika sehemu hii, tutachunguza maelezo ya EIP-7805, athari zake, na athari zake zinazowezekana kwenye mfumo ikolojia wa Ethereum. Ili kuzungumza zaidi kuhusu pendekezo hili, tumeungana na Thomas Thiery na Julian Ma. Karibuni kwenye PEEPanEIP.

**Thomas Thiery:** Asante kwa kutualika.

**Julian Ma:** Ndiyo, asante sana kwa kutualika.

**Pooja Ranjan:** Tuna furaha kujifunza kuhusu muhtasari wa pendekezo hili, lilipofikia leo, na ni hivi karibuni kiasi gani tunaweza kuliona kwenye Mtandao Mkuu wa Ethereum. Lakini kabla hatujaanza, jamii yetu inapenda kuwafahamu watafiti na wasanidi walio nyuma ya kazi hii. Je, mnaweza kushiriki kidogo kujihusu, mradi mnaohusika nao kwa sasa, na safari yenu ndani ya mfumo ikolojia wa Ethereum?

### Utambulisho wa wageni (2:14) {#guest-introductions-214}

**Julian Ma:** Sawa, ninaweza kuanza. Mimi ni Julian, mtafiti katika Kikundi cha Vivutio Imara (Robust Incentives Group), kama tu Thomas, katika Taasisi ya Ethereum. Kikundi cha Vivutio Imara kinahusika na uchumi wa itifaki kwa mapana sana. Baadhi yetu tumekuwa tukiangalia mifumo ya ada ya muamala, kama EIP-1559, na wengine wamekuwa wakiangalia mashambulizi ya tabaka la mwafaka, hasa yale yanayochochewa na vivutio vya kiuchumi.

Kwa upande wangu, nilianza na mafunzo kwa vitendo nikiangalia vitokanavyo na ada ya msingi, na baada ya hapo nilijiunga kufanya kazi muda wote. Nimekuwa nikifanya kazi zaidi kwenye utengano wa mpendekezaji na mjengaji (PBS) na mada zinazohusiana na MEV, na sasa ninaangazia orodha za ujumuishaji kupitia FOCIL na EIP hii, na ninatarajia utengano wa mthibitishaji na mpendekezaji. Ningesema ninafurahishwa zaidi na kuleta utafiti katika uzalishaji kupitia mchakato huu wa kuanza na kazi ya kinadharia zaidi na kuileta kuelekea kwenye EIP ambayo inatarajiwa kupendekezwa na kutekelezwa ndani ya Ethereum.

**Thomas Thiery:** Mimi ni Thomas. Pia ninafanya kazi katika Taasisi ya Ethereum kwenye Kikundi cha Vivutio Imara, nikifanya utafiti. Asili yangu hasa ni Shahada ya Uzamivu (PhD) katika sayansi ya mfumo wa neva, ambayo ilikuwa tofauti sana. Lakini nilipata udadisi kuhusu minyororo ya vitalu na mifumo iliyosambazwa, nilitaka kujaribu kitu tofauti kidogo, na nikajiunga na kampuni ya data za kripto inayoitwa Dune. Nilikaa huko kwa muda, lakini kisha nikakumbuka kufanya utafiti, na nilibahatika kuweza kujiunga na EF na Kikundi cha Vivutio Imara, ambacho kimekuwa kizuri sana hadi sasa.

Nimefanya kazi kwenye mada zinazofanana. MEV ilikuwa kubwa sana nilipojiunga. Cha kufurahisha, machapisho yangu ya kwanza kabisa ya utafiti yalikuwa madogo sana, lakini yalihusu ucheleweshaji wa ujumuishaji na upinzani dhidi ya udhibiti. Sikuzama sana ndani yake hadi hivi karibuni. Kwa miezi sita hadi mwaka mmoja uliopita nimekuwa nikijihusisha zaidi na upande wa upinzani dhidi ya udhibiti na ujumuishaji. Imekuwa nzuri sana kuweza kuanza na mawazo ya utafiti, kuboresha mawazo ya awali ambayo yalikuwa ya kuvutia sana lakini hayakujumuisha baadhi ya maelezo ambayo tutazungumzia, kuja na pendekezo, na sasa kuwa na utekelezaji na mitandao ya wasanidi ambayo watu wengi niliowasiliana nao wanafikiri itakuwa nyongeza nzuri kwa Ethereum.

**Pooja Ranjan:** Asante kwa kushiriki. Kila mara inatia moyo kujifunza asili ya wasanidi. Inavutia kuona kwamba wanatoka katika nyanja tofauti na hatimaye kuchangia kwenye mfumo ikolojia wa Ethereum. Ninaelewa tuna wasilisho hapa leo. Kwa hivyo bila kupoteza wakati, hebu tuangalie.

### Wasilisho: malengo ya FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Sawa kabisa, asante sana. Ningependa kuanza na wasilisho fupi kuhusu jinsi EIP-7805, au FOCIL, inavyofanya kazi na kwa nini hasa tunataka kuifanya. Inakusudiwa kuanzisha mazungumzo, kwa hivyo haitakuwa ya kina sana, ili kuacha nafasi ya majadiliano baadaye.

Lengo kuu la FOCIL ni kuongeza kutoegemea upande wowote kwa kuaminika kwa Ethereum. FOCIL inafanya hivyo kwa kuondoa ukiritimba wa ujumuishaji ambao kwa sasa mpendekezaji mmoja au mjenga kizuizi anao ndani ya sloti. Badala yake, FOCIL inaruhusu wathibitishaji wengi kuchangia katika kujenga kitalu kwa kujumuisha miamala katika kila kitalu.

Lengo la kiwango cha juu ni kufuata sifa tunayoiita kutoegemea upande wowote kwa mnyororo, ambayo inamaanisha muamala wowote unaosubiri unaolipa ada unapaswa kujumuishwa ikiwa unapatikana na ikiwa kuna nafasi ya kuujumuisha mnyororoni. Tunaamini kwamba ikiwa sifa hii itatimizwa vya kutosha, basi tunaongeza kutoegemea upande wowote kwa kuaminika kwa Ethereum.

### Kwa nini tunahitaji FOCIL, na kwa nini sasa? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Kwa nini tunahitaji kitu kama hiki? Kwa sasa karibu wathibitishaji wote hukabidhi ujenzi wa kitalu kwa MEV-Boost, ambalo ni soko la nje ya itifaki ambapo wajenzi hushindania haki za ujenzi wa kitalu. Katika soko hili kuna taasisi mbili tu zinazotawala kweli, na hii inamaanisha kuwa 90% ya vitalu hujengwa na taasisi mbili tu.

Tunaona hapa kwamba Ethereum haiwezi tena kupata kutoegemea upande wowote kwa kuaminika kutoka kwenye ujenzi wa kitalu wa ndani. Iliwahi kufanya hivyo. Ilianza kwa kuwa na wapendekezaji walioko kote ulimwenguni, kila mmoja akijenga vitalu vyake ndani kwa ndani, ikimaanisha kuwa miamala yote ilijumuishwa. Lakini sasa kwa kuwa ujenzi wa kitalu unakabidhiwa kwa taasisi hizi za kisasa, hii haitoshi tena. Kwa hivyo ni muhimu kutekeleza hatua thabiti zaidi za kupinga udhibiti, na FOCIL ndiyo njia inayojulikana zaidi ya kufanya hivyo.

Kwa nini tutekeleze FOCIL sasa? Unaweza kufikiri kwamba wajenzi hawadhibiti sana sasa, lakini wanaweza kuanza kudhibiti wakati wowote, iwe kwa sababu za udhibiti wa kisheria au sababu za kiuchumi. Na udhibiti wa kiuchumi hakika ni jambo ambalo halipaswi kueleweka vibaya. Pia ni vizuri kuanzisha FOCIL wakati kuna udhibiti mdogo, kwa sababu hapo unaiingiza kama msingi na kama chaguo-msingi. Wathibitishaji wote hutengeneza orodha za ujumuishaji bila kujali mamlaka yao ya kisheria au motisha za kiuchumi, na inasababisha kuyumba kidogo kwa soko. Wakati ambapo kama ungeanzisha FOCIL wakati wajenzi wote wanadhibiti, labda ingekuwa ngumu zaidi.

Kisha, mikusanyiko ya msingi inazidi kuwa maarufu siku hizi, na itabeba mzigo kwenye ujenzi wa kitalu wa Ethereum. Ikiwa tunataka kutoa mpangilio ambao Ethereum inao, ni muhimu kuwa na kutoegemea upande wowote kwa kuaminika hapa kupitia FOCIL.

Na uwezekano ni kwamba FOCIL inaweza kusaidia katika kuongeza uwezo, kulingana na nani unamuuliza. Leo Ethereum bado inapata ukinzani wake wa udhibiti kutoka kwenye ujenzi wa kitalu wa ndani. Ikiwa Ethereum inaweza kupata ukinzani wa udhibiti kutoka kwingineko, kwa mfano kupitia FOCIL, basi labda tunaweza kuongeza matarajio tuliyonayo kwa wajenga kizuizi na kuruhusu, kwa mfano, mablobu zaidi. Lakini uwezekano ni kwamba hili linaweza kufanywa bila FOCIL pia. Kwa hivyo, FOCIL imependekezwa kutekelezwa katika Fusaka.

### Jinsi FOCIL inavyofanya kazi (8:10) {#how-focil-works-810}

**Julian Ma:** Sasa nitakuelekeza jinsi FOCIL inavyofanya kazi. Tutaanza na mambo ya msingi na kwenda hatua kwa hatua hadi tuwe na utaratibu kamili, na kisha tuchunguze jinsi utaratibu huu kamili unavyokidhi sifa tunazotaka.

Wazo la msingi la orodha ya ujumuishaji, ambalo limependekezwa na Mike Neuder hapo awali pia, ni kwamba kuna orodha ya miamala inayodhibiti kitalu kwa namna fulani. Kwa hivyo kuna, kwa mfano, orodha ya ujumuishaji inayojumuisha miamala A na B, imesainiwa na mtu anayetambuliwa na itifaki, na kisha miamala hii lazima ijumuishwe kwenye kitalu fulani. FOCIL haibadilishi hili. Inajenga juu yake, na inahusu zaidi nani anaunda orodha hii na jinsi orodha hii inavyotekelezwa.

Kwa hivyo, nani anaunda orodha hii? Hii ni hatua ya kwanza ya jinsi itifaki ya FOCIL inavyofanya kazi. Kila sloti, wathibitishaji 16 huchaguliwa kama wajumbe wa kamati ya orodha ya ujumuishaji. Kila mmoja wa wajumbe hawa wa kamati huangalia mempool na kuunda orodha yao wenyewe ya ujumuishaji. Orodha ya ujumuishaji inapaswa kuwa karibu kilobaiti 8, au takriban miamala 20 ya wastani, ikimaanisha jumla ya miamala 320 ya wastani.

Hatua ya pili ni kusambaza orodha hizi za ujumuishaji. Wajumbe wa kamati ya orodha ya ujumuishaji husambaza orodha zao za ujumuishaji kwenye mada ya jumla, na hawazijumuishi kwenye kitalu wenyewe. Lazima wafanye hivyo kabla ya sekunde ya 9 ya sloti, ambapo washuhudiaji hufunga mtazamo wao wa orodha za ujumuishaji za ndani. Kama tutakavyoona katika hatua inayofuata, washuhudiaji ndio wanaotekeleza orodha hizi za ujumuishaji, kama jina linavyopendekeza: orodha za ujumuishaji zinazotekelezwa na chaguo la mchepuo. Wanafunga mtazamo wao wa orodha zipi za ujumuishaji watakazozitekeleza katika sekunde ya 9, na hii inazuia mashambulizi ya mtazamo uliogawanyika. Mzalishaji wa kitalu bado ana sekunde chache za ziada za kuangalia orodha za ujumuishaji na kuhakikisha kuwa haathiriwi vibaya kwa kukosa orodha yoyote ya ujumuishaji, kwa hivyo mzalishaji wa kitalu hana hatari katika mazingira haya.

Kisha tunaelekea kwenye hatua ya mwisho, ambayo ni utekelezaji. Kama nilivyosema, utekelezaji unafanywa kupitia chaguo la mchepuo. Washuhudiaji watapiga kura kwa ajili ya kitalu tu ikiwa kinakidhi sharti la orodha ya ujumuishaji. Wanafanya hivyo kwa kuangalia orodha za ujumuishaji zilizotumwa kwenye mada ya jumla, kutengeneza orodha iliyojumuishwa ya miamala ambayo walikuwa wameiona katika orodha hizi za ujumuishaji, na kisha kuangalia ikiwa miamala hii yote iko kwenye kitalu. Ikiwa ukaguzi huu utafaulu, wanapiga kura kwa ajili ya kitalu. Inaweza pia kuwa kwamba sio miamala yote kutoka kwenye orodha za ujumuishaji iko kwenye kitalu, lakini kitalu kimejaa. Katika hali hiyo, washuhudiaji pia hupiga kura kwa ajili ya kitalu. Kwa hivyo isipokuwa kitalu hakina miamala na hakijajaa, washuhudiaji hupiga kura kwa ajili ya kitalu.

Kujumuisha utaratibu kamili: katika kila sloti, wajumbe 16 wa kamati huchaguliwa kama wajumbe wa kamati ya orodha ya ujumuishaji. Wanaangalia mempool na kuunda vitu vya orodha ya ujumuishaji ambavyo wanasambaza kwenye mada ya jumla kabla ya muda wa mwisho, katika kesi hii sekunde ya 9. Mjenzi huangalia orodha hizi za ujumuishaji na kujumuisha miamala yote aliyoiona kwenye kitalu chake. Washuhudiaji kisha huangalia ikiwa miamala yote waliyokuwa wameiona kabla ya sekunde ya 9 katika orodha za ujumuishaji iko kweli kwenye kitalu. Ikiwa ukaguzi huu utafaulu, wanapiga kura kwa ajili ya kitalu, na tunaendelea kwenye sloti inayofuata, ambapo mpangilio huo huo unafanyika tena.

### IL Boost na kutokusongamana (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Moja ya wasiwasi mkubwa kuhusu orodha za ujumuishaji, uliotolewa kwa EIP iliyopita kutoka kwa Mike na wakati wa usanidi baada ya hapo, ni "IL Boost," au kutokusongamana. Inarejelea ukweli kwamba wapendekezaji wa orodha ya ujumuishaji wanaweza kutaka kuuza haki zao za kujenga orodha ya ujumuishaji. Ni wasiwasi wenye mantiki sana, kwa sababu tunaona hili likitokea kwenye ujenzi wa kitalu: kuuza haki hii husababisha soko lililowekwa kati la wajenzi wa kisasa.

Tunatoa hoja kwamba FOCIL ni imara dhidi ya masoko haya yanayofanana na MEV-Boost, au IL Boost kama yanavyojulikana kwa kawaida, kwa sababu ya sifa zifuatazo. FOCIL haitoi hakikisho la mpangilio wowote wa miamala. Bila kujali unaweka wapi muamala wako katika orodha yako ya ujumuishaji, utapangwa kwa njia yoyote ambayo mjenga kizuizi anaona inafaa. Ikiwa, kwa mfano, utajumuisha muamala wa arbitrage kwenye orodha, kuna uwezekano mdogo sana kwamba mjenzi ataweka muamala wako wa arbitrage juu ya kitalu ili utekeleze arbitrage hiyo. Badala yake, mjenzi huenda akafanya hivyo yeye mwenyewe.

Zaidi ya hayo, mtiririko wa oda za faragha hauwezekani. Orodha hizi za ujumuishaji husambazwa kwenye mada ya kimataifa, kwa hivyo miamala yako inakuwa wazi kabla mjenzi hajajenga kitalu. Haiwezekani kuwa na mtiririko wa oda za faragha kuingia kwenye kitalu kupitia orodha ya ujumuishaji.

Tatu, kuna wapendekezaji wengi wa orodha ya ujumuishaji kwa kila sloti. Hata kama kungekuwa na kitu cha thamani cha kuuza, wanakamati wote 16 wa orodha ya ujumuishaji wana uwezekano sawa wa kuunda orodha hii ya ujumuishaji, kwa hivyo ushindani kati ya wapendekezaji hao wa orodha ya ujumuishaji ungeshusha thamani hadi sifuri.

Na mwishowe, orodha hizi za ujumuishaji huundwa sekunde 3 kabla mzalishaji wa kitalu hajachukua hatua. Kuna sekunde 3 za taarifa za ziada, ambazo kwa kawaida ni muhimu sana kwa aina za miamala ya MEV, zinazofika baada ya orodha ya ujumuishaji kuthibitishwa na kabla mzalishaji wa kitalu hajachukua hatua, ikimaanisha kuna faida ndogo sana ya taarifa. Kwa kweli, kuna hasara ya taarifa kwa wale wanaojaribu kutumia orodha za ujumuishaji kama chombo cha MEV.

Kwa sababu ya sababu hizi, tunaamini kwamba hakuna mpendekezaji binafsi wa orodha ya ujumuishaji aliye na nguvu ya kujumuisha, kupanga, au kutenga, ambayo ndiyo tafsiri ya msingi ya MEV. Kwa hivyo orodha za ujumuishaji hazipaswi kuathiriwa na MEV.

### Muhtasari wa wasilisho (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Kwa kufupisha wasilisho hili la haraka: FOCIL inaruhusu wathibitishaji wengi kuchangia katika ujenzi wa kitalu, kuzuia ukiritimba wa ujumuishaji wa mpendekezaji mmoja na kuongeza kutoegemea upande wowote kwa kuaminika kwa Ethereum. Tunaamini kuwa ni muhimu kutekeleza FOCIL sasa kwa sababu kwa sasa kuna wajenzi wawili tu wakuu ambao wanaweza kuanza kudhibiti wakati wowote, na hii inaweza kuwa kwa sababu za kiuchumi ambazo wanaweza kufaidika nazo. Ujenzi wa kitalu unaweza kubeba mzigo mkubwa zaidi kwa sababu mikusanyiko ya msingi itataka kutumia sifa za upangaji mfuatano za Ethereum. FOCIL itazinduliwa kwa urahisi zaidi wakati kuna pande chache zinazodhibiti: kwanza, kwa sababu inamaanisha kuwa ni chaguo-msingi kwa wathibitishaji kuunda orodha za ujumuishaji, na pili, kwa sababu inamaanisha kuwa kuna ukosefu mdogo wa utulivu wa soko kati ya wajenzi wanaodhibiti na wajenzi wasiodhibiti. Na hatimaye, FOCIL inaweza kusaidia katika kuongeza uwezo, ambalo labda ni somo ambalo tunaweza kulichambua kwa kina zaidi.

Asante kwa muda wa kutoa wasilisho hili dogo. Nilitaka tu kuonyesha msimbo wa QR, ambao unaelekeza kwenye EIP, kwa watu wanaovutiwa.

**Pooja Ranjan:** Asante sana kwa wasilisho hili la haraka na muhtasari wa pendekezo.

### Maswali na Majibu: EIP-7805 inatofautiana vipi na EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Ningependa kuanza sehemu ya Maswali na Majibu kwa swali la kwanza kabisa, kuhusu pendekezo la awali ambalo pia lilitajwa kwenye wasilisho lako: pendekezo la 7547, orodha za ujumuishaji, na Mike Neuder. Nataka kuelewa tofauti ya msingi kati ya pendekezo hilo na FOCIL tuliyonayo kwenye 7805. Uligusia kwa kiasi fulani kwenye wasilisho lako kuhusu IL Boost na hali ya kutoweza kusongamana. Je, ungependa labda kuelezea zaidi kidogo kuhusu hilo?

**Julian Ma:** Labda Thomas ndiye anayefaa zaidi kujibu jinsi 7805 inavyotofautiana na 7547, lakini naweza kusema kidogo kuhusu hilo. Kwanza kabisa, FOCIL ni kwa ajili ya sloti hiyohiyo, wakati 7547 ilikuwa kwa ajili ya sloti inayofuata. Sifa ya sloti hiyohiyo inafanya baadhi ya mambo kuwa rahisi, kwa sababu inamaanisha orodha ya ujumuishaji hailazimiki kuhifadhiwa mnyororoni.

Kuhusiana na sifa ya kutoweza kusongamana, hii inavutia sana na ni ya kipekee. Ndani ya 7547, ambalo lilikuwa pendekezo zuri ambalo pendekezo letu linajengwa juu yake, orodha ya ujumuishaji inaongezwa bila masharti chini ya kitalu na inatengenezwa na mtu mmoja. Hii ina sifa chache tofauti na yetu. Kwanza kabisa, miamala imepangwa. Inaweza kuwa kwamba katika siku zijazo ni muhimu sana kuwa na usuluhishi wa chini ya kitalu, na kwa kweli baadhi ya tafiti za Thomas zimeangazia kwamba hili linaweza kuwa eneo lenye thamani. Kuwa na haki ya kujenga orodha ya ujumuishaji inamaanisha kuwa wewe ndiye mtu wa mwisho kuchukua hatua kwenye kitalu, na kwa baadhi ya matukio hii inaweza kuwa na thamani. Pili, inatengenezwa na mtu mmoja tu, kwa hivyo hakuna athari hii ya ushindani miongoni mwa wanakamati wa orodha ya ujumuishaji. Kamati ya mtu mmoja ina haki kamili ya kujumuisha miamala chini ya kitalu, jambo ambalo linaweza kuifanya iwe na thamani zaidi pia. Tatu, kuna sifa hii ya kutokuwa na masharti, ambayo inamaanisha kwamba bila kujali kile mzalishaji wa kitalu anachofanya, muamala wako utajumuishwa mnyororoni hata hivyo. Kwa hivyo ina dhamana chache za ziada, zaidi ya kiwango cha chini kinachohitajika kwa ujumuishaji, ambazo zinaweza kuifanya iwe na thamani kwa kiasi fulani.

**Thomas Thiery:** Tofauti kubwa pia ni idadi ya wapendekezaji wa orodha ya ujumuishaji tulionao. Katika pendekezo la awali, kulikuwa na utaratibu ambapo mpendekezaji wa sloti n anatengeneza orodha ya ujumuishaji ambayo mpendekezaji wa sloti n+1 anahitaji kuitekeleza. Mambo mawili makubwa hapa: kwanza, kuna ucheleweshaji wa sloti moja, kwa hivyo miamala katika orodha ya ujumuishaji inapaswa kujumuishwa tu katika sloti inayofuata na mpendekezaji anayefuata. Na kuna mpendekezaji mmoja tu ambaye kwa kweli anatengeneza orodha ya ujumuishaji. Kwa FOCIL tunao 16. Inaleta tofauti kubwa, kwa sababu sasa tunahitaji tu mmoja kati ya wanakamati 16 wa IL kuwa mwaminifu ili utaratibu mzima ufanye kazi kama ilivyokusudiwa. Inazidisha nafasi zako za kuwa na utaratibu mzuri unaostahimili udhibiti, wakati hapo awali ulitegemea upande mmoja.

Na kisha maelezo zaidi ya kiufundi: kulikuwa na baadhi ya kutokubaliana na udhanifu wa akaunti, na ilikuwa vigumu kushughulikia kura kinzani ya IL, ikimaanisha mtu anayetuma orodha mbili tofauti za ujumuishaji. Kura kinzani ya kitalu ni jambo linalojulikana na linaadhibiwa na itifaki, lakini kwa kuwa kila kitu kilienda mnyororoni katika pendekezo la awali, ilibidi pia ushughulikie matukio ya kipekee yasiyo ya kawaida, na haikuwa rahisi sana kuyashughulikia. Kwa FOCIL, orodha za ujumuishaji haziendi mnyororoni. Zinatangazwa tu kupitia mtandao wa tabaka la mwafaka la P2P. Ni ya kiufundi kidogo, lakini inaleta tofauti kubwa katika kushughulikia matukio haya ya kipekee yanayosababishwa na udhanifu wa akaunti, au mashambulizi ambapo unagawanya mtandao katika mitazamo miwili kwa kura kinzani ya IL.

**Pooja Ranjan:** Asante sana. Kwa watu ambao wangependa kujifunza zaidi kuhusu pendekezo la 7547, tunayo sehemu iliyorekodiwa na Mike Neuder, sehemu ya 130 ya PEEPanEIP, ambayo inatoa muhtasari wa kiwango cha juu. Siku zote napenda kuona mapendekezo yanayoshindana, kwa sababu najua hiyo ni kwa ajili ya kuboresha mfumo ikolojia na mnyororo. Naona kwenye soga kuna maswali machache. Labda ningependa kumkaribisha Kataya ashiriki swali lake.

### Je, mpendekezaji anapaswa kujumuisha orodha zote 16? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Habari, asante. Swali langu lilikuwa: je, mpendekezaji wa bloku anapata orodha 16 za ujumuishaji, kila moja kutoka kwa mjumbe mmoja wa kamati, na je, anapaswa kujumuisha miamala yote kutoka kwenye orodha hizi?

**Thomas Thiery:** Ndio, ndivyo hivyo. Unachukua muungano wa miamala yote katika orodha zote, kwa upande wetu orodha 16. Unaweza kuwa na mwingiliano, bila shaka, kwa hivyo unachukua muungano na kuondoa zinazojirudia, lakini ndio, miamala yote katika orodha zote inahitaji kujumuishwa kwenye kitalu ili kionekane halali na wathibitishaji.

**Pooja Ranjan:** Swali linalofuata kwenye soga ni la Justin. Justin, ungependa kusoma swali lako kwa wageni?

### Miamala ya faragha ya mempool katika orodha za ujumuishaji (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Nimekuwa nikiuliza maswali mengi sana. Nilitaka kuuliza nini kinazuia kuweka muamala kutoka kwenye mempool ya faragha kwenye orodha ya ujumuishaji, na nadhani hilo lilijibiwa vizuri. Inaonekana kwamba hiyo ni sawa kabisa, ukizingatia kwamba mjenzi kimsingi atazipanga vyovyote anavyoona inafaa, na muamala wako unakuwa wa umma unapotoka kwenye orodha ya ujumuishaji (IL) pia. Kwa hivyo nadhani hiyo inaeleweka. Asante.

**Thomas Thiery:** Hilo lilikuwa ni jambo moja la kuzingatia, kama Julian alivyotaja. Kwa kweli hatukutaka FOCIL na orodha za ujumuishaji zitumike kwa kujumuisha miamala ya MEV, mtiririko wa maagizo ya faragha, au uthibitisho wa awali, kwa sababu hatimaye kile tunachotaka ni upinzani dhidi ya udhibiti, na ni rahisi sana kwa utaratibu kuwa chombo cha kujumuisha miamala yenye thamani ikiwa hauko mwangalifu. Ukweli kwamba unapojumuisha muamala wako katika orodha ya ujumuishaji unakuwa wa umma moja kwa moja, kila mtu anaweza kuuona, hauna uhakika wa mpangilio, na unaweza kujumuishwa na mjenzi popote katika kitalu inaufanya usiwe unafaa sana kwa miamala yenye thamani.

Kwa hivyo ama una muamala wa umma, na unaweza tu kuuwasilisha kwenye mempool ya umma ili ujumuishwe katika orodha ya ujumuishaji, au una miamala ya faragha yenye thamani, na kisha usingepitia FOCIL, kwa sababu kuna njia bora zaidi za kufanya hivyo. Ungewasiliana na mjenzi moja kwa moja na kuutuma kupitia njia za faragha.

**Pooja Ranjan:** Asante kwa kushiriki. Naona swali linalofuata ni la Ladislaus.

### FOCIL na kuongeza uwezo (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Habari zenu. Hii inarejelea hoja mliyoileta kuhusu FOCIL na kuongeza uwezo. Nimeona baadhi ya mijadala hivi karibuni, kama sote tulivyoona, kuhusu kuongeza uwezo wa Ethereum, na kama mlivyotaja kwa usahihi, kuna kikwazo hiki cha wajenzi wachache huko nje. Binafsi napenda kuichukulia FOCIL kama inayowezesha upya ujenzi wa ndani, na ninaiona kama hitaji la lazima kuingizwa kwenye itifaki kabla ya kuongeza mahitaji ya kipimo data, au mahitaji ya nodi kwa ujumla. Labda mnaweza kufafanua jinsi mnavyofikiria kuhusu hili, na pia njia nyingine zinazowezekana za kuongeza uwezo, labda bila FOCIL, kama mlivyotaja.

**Julian Ma:** Asante kwa swali. Kwanza kabisa, hoja ya kuongeza uwezo kupitia FOCIL. Kwa sasa 90% ya wathibitishaji wanatafuta huduma za nje za ujenzi wa kitalu kupitia MEV-Boost, na taasisi hizi za kisasa ni wazi zina kipimo data kikubwa zaidi kuliko mahitaji ya chini ya vifaa. Zinaweza, kwa mfano, kujumuisha mablobu zaidi kwenye vitalu vyao bila kusababisha matatizo yoyote. Jambo la kufurahisha, hata hivyo, ni kwamba Ethereum inategemea ujenzi wa kitalu wa ndani kwa ajili ya kutoegemea upande wowote kwa kuaminika, au upinzani dhidi ya udhibiti, kwa sababu taasisi hizi mbili za kisasa si zile ambazo upinzani dhidi ya udhibiti wa Ethereum unaweza kujengwa juu yake.

Hivyo itifaki ya Ethereum lazima bado iundwe ili iwezekane kufanya ujenzi wa kitalu wa ndani, na kwa kweli tunaiunda ili isiwe isiyo na faida ikilinganishwa na MEV-Boost. Hili lipo katika muundo wa Ethereum, lakini kiutendaji, bila shaka, MEV-Boost ina faida kubwa zaidi: kwanza kwa sababu wajenga vizuizi hawa wa kisasa wana kanuni zinazohusika zaidi, na pili kwa sababu wana mtiririko mkubwa zaidi wa maagizo ya faragha. Kulikuwa na utafiti uliofanywa na Data Always hivi karibuni ukionyesha kuwa vitalu vya MEV-Boost vina miamala mingi zaidi. Hiyo pekee inasababisha faida zaidi.

Bado, itifaki imeundwa ili kusiwe na nguvu kutoka ndani ya sheria za itifaki zinazomfanya mthibitishaji mmoja apate faida ndogo kuliko mwingine. Ikiwa tunataka kuweka sheria hiyo, basi FOCIL ni muhimu, kwa sababu hapo wajenga vizuizi wa ndani wanaweza kuchangia kwenye orodha za ujumuishaji na hivyo kudumisha upinzani dhidi ya udhibiti. Tungeweza, hata hivyo, pia kuondoa sheria hii na kimsingi kusema kwamba wajenga vizuizi wa ndani wanaweza kujumuisha idadi fulani ya mablobu, lakini wajenga vizuizi wa kisasa zaidi wangeweza kujumuisha mablobu zaidi, kwa kiasi ambacho wajenga vizuizi wa ndani wasingeweza kushughulikia mzigo huo wakati wanaunda kitalu wenyewe. Hivyo ikiwa tunataka kuweka sheria kwamba kiwango cha juu kimewekwa kulingana na mahitaji ya chini ya vifaa, basi tunahitaji FOCIL. Ikiwa tuko sawa na kulegeza sheria hiyo, basi kuna uwezekano hatuhitaji FOCIL kwa ajili ya kuongeza uwezo.

**Thomas Thiery:** Inafanana sana, nadhani, lakini sasa hivi kwenye Ethereum tuko katika nafasi ya ajabu, kwa sababu tunategemea wajenzi wa kisasa kujenga vitalu vingi, lakini hao si wazuri kwa upinzani dhidi ya udhibiti, kwa sababu ni pande mbili tu. Wakiamua kudhibiti miamala au baadhi ya anwani kwa sababu yoyote ile, basi kimsingi hatuna upinzani dhidi ya udhibiti au hali ya kutohitaji ruhusa, ambayo pia ni muhimu sana. Inamaanisha wanaweza kudhibiti au kuzuia wahusika wowote wanaowataka wasishiriki mnyororoni, jambo ambalo ni baya sana.

Na sifa za upinzani dhidi ya udhibiti tunazoweka si za kushangaza, sivyo? Kwa kuwa vitalu vingi vinajengwa na wajenzi hawa wawili, kimsingi unahitaji kusubiri hadi mjenga kizuizi mmoja wa ndani achaguliwe na apendekeze kitalu kinachojumuisha miamala hii yote ambayo kwa kawaida inadhibitiwa, jambo ambalo si zuri. Inamaanisha watumiaji hawa watahitaji kusubiri vitalu 10, 12, sijui, vitalu vingi hadi miamala yao iingizwe mnyororoni.

Hivyo tunataka kweli kuweka waweka dhamana wa nyumbani na wajenga vizuizi wa ndani, kwa sababu wao ndio wanaohifadhi upinzani dhidi ya udhibiti. Wakati huo huo, leo, hata kuwatumia si kuzuri sana, kwa sababu bado inabidi usubiri muda mrefu ili muamala wako ujumuishwe ikiwa unadhibitiwa na wajenzi hao wawili. Ukiwa na FOCIL, unahamia kwenye ulimwengu ambapo washiriki wanaohakikisha upinzani dhidi ya udhibiti, wajumbe wa kamati ya orodha ya ujumuishaji kwa upande wetu, wanaweza kuwa tofauti na watu wanaojenga vitalu. Nadhani inafungua mazingira ya kuvutia sana, kwa sababu sasa hatulazimiki kumtegemea mshiriki yuleyule kujenga vitalu vyenye thamani na kuchangia kwenye upinzani dhidi ya udhibiti. FOCIL pia inaweza kuchukuliwa kama hatua ya kwanza katika mwelekeo huo muhimu, kwa sababu una majukumu mawili tofauti sana, na leo tunaziomba nodi zilezile za wathibitishaji kufanya yote mawili, jambo ambalo lina mvutano mkubwa.

**Pooja Ranjan:** Asante sana. Nadhani swali linalofuata ni la Luis.

### Vigezo vya kuchagua miamala (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Nilijiunga dakika chache baada ya kuanza, lakini inaonekana kwangu kama hii inagatua uchaguzi wa miamala katika mtandao kwa ujumla. Hiyo ni nzuri sana kwa maoni yangu; inapambana dhidi ya MEV na udhibiti. Na hakika ninapenda sehemu ya kuwa na watoa ushahidi kufanya kazi hii, kwa sababu katika siku zijazo watakuwa na mahitaji madogo ya vifaa kuliko wajenzi, hata zaidi na ubilahali na wateja wa ubilahali. Kwa kuwa utaweza kuendesha hii kwa vifaa vya chini sana, inafanya mambo kuwa yaliyogatuliwa sana. Nadhani changamoto kuu hapa ni kufafanua vigezo vya uchaguzi wa miamala wa hizi orodha za ujumuishaji, iwe unatumia ada za kipaumbele au idadi ya mablobu; kuna vigeugeu vingi sana. Je, mmefikia seti ya vigezo ambavyo mnafikiria kuvitekeleza?

**Thomas Thiery:** Hilo ni swali zuri sana. Limegawanyika sehemu mbili. La kwanza ni muhimu sana, kuhusu kujaribu kuwatenganisha watoa ushahidi na watu wanaojenga au kupendekeza kitalu. Huo ndio msingi mzima wa utafiti wa utengano wa mtoa ushahidi na mpendekezaji (APS); Julian amefanya kazi kubwa sana kuhusu hili. Tunaiita kutenganisha majukumu, ili yalingane kwa karibu zaidi na majukumu ya itifaki. Niliandika chapisho, ambalo nimeshiriki hivi punde, kuhusu utengano unaowezekana, ambao uko wazi sana, na ningependa kupata maoni zaidi kutoka kwa watu. Katika chapisho hili ninafanya utengano kati ya watoa ushahidi, wajumuishaji, ambao sasa ni wanakamati wa IL, na wapendekezaji wa utekelezaji, au wajenzi. Nadhani hayo ni majukumu tofauti kimsingi, na labda tunapaswa kuwa na dhima tofauti kwao.

Kisha, kwa kanuni ya ujumuishaji, ni swali zuri sana. Tulifikiria sana kuhusu hilo, na nadhani tulifikia mambo mawili. La kwanza ni kwamba tunataka utofauti wa kanuni. Hatutaki kanuni moja tu, kwa mfano kupanga kwa kushuka kwa ada za kipaumbele kwa wateja wote, kwa sababu hapo unaweza kufanya ujanja na kujaribu kupanga upya mempool ili miamala yako tu ijumuishe kwenye ILs. Lakini ikiwa una utofauti wa kanuni, ikiwa ni pamoja na kanuni moja ambayo pia inazingatia muda ambao muamala umekuwa ukisubiri kwenye mempool, na wateja tofauti wanatekeleza kanuni tofauti, zote zikiwa na mwelekeo sawa, hasa kuhusu ada za kipaumbele na muda wa kusubiri kwenye mempool, basi inakuwa ngumu sana kufanyia ujanja, na inafanya itifaki kuwa imara zaidi. Pia ni njia nzuri, nadhani, kuchukua faida ya utofauti wa wateja tulio nao kwenye Ethereum leo, na kuruhusu wateja kufanya chaguzi zenye msimamo. Tuna kanuni akilini, lakini tunafikiri wateja wanaweza pia kuchagua kanuni bora kwao. Ilimradi sio kila mtu ana kanuni sawa kabisa iliyopangwa kwa ada za kipaumbele, tutakuwa sawa.

**Luis Pinto:** Sawa, kwa hivyo pia mnasambaza vigezo hivi, mkiwaruhusu wale wanaojenga orodha za ujumuishaji kuwa na vigezo vyao wenyewe. Au hii itakuwa sehemu ya itifaki?

**Julian Ma:** Kanuni ya ujumuishaji haitakuwa sehemu ya itifaki. Kwanza kabisa, ni ngumu sana kutekeleza, na pili, kwa kweli ni bora kutotekeleza chochote. Ikiwa tutawaruhusu wanakamati kuamua wenyewe, au kuruhusu timu za wateja kutenda kwa niaba yao, jinsi wanavyojumuisha miamala, basi tunaunda uimara fulani katika mtandao. Watu wenye mapendeleo tofauti watajumuisha kwa njia tofauti, ambayo inamaanisha ni ngumu zaidi kushambulia mfumo.

**Luis Pinto:** Sawa, asante.

### Utangamano na EIP-7702, ePBS, na PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Asante sana. Kama ninavyoelewa, pendekezo hili tayari limependekezwa kwa ajili ya uboreshaji baada ya Pectra, Fusaka. Na kwa kuwa Fusaka inaweza au isiweze kujumuisha baadhi ya EIP zingine ambazo zinaendelea, ninajiuliza ni nini hali ya utangamano wa FOCIL kuhusiana na mapendekezo kama vile 7702, ambayo ni kwa ajili ya udhanifu wa akaunti, ePBS, na PeerDAS.

**Thomas Thiery:** Swali zuri. Tulikuwa na faida kidogo hapa kwa sababu ya historia ya orodha za ujumuishaji. Kama tulivyotaja, 7547 ilifikiriwa kujumuishwa na kisha ikakataliwa kwa sababu ya kutotangamana. Kwa hivyo tulikuwa waangalifu sana kuhusu kutatua hayo kabla ya kutoa pendekezo jipya, kwa sababu tulijua watu wangeiangalia kwa maswali yale yale, jambo ambalo linaeleweka.

Tuna uhakika sana, kwa sababu pia tulizungumza na timu za udhanifu wa akaunti, na tulizungumza sana na Potuz na Terence. Terence amekuwa akitusaidia kikamilifu, na amekuwa akifanya kazi kwenye ePBS na FOCIL, kwa hivyo ilikuwa rahisi sana kwetu kuangalia kama hiyo inatangamana pia. Sidhani kabisa kama kuna kutotangamana na EIP zingine zozote. Kwa ePBS, unapaswa kuwa mwangalifu na mpangilio wa muda, kwa sababu unatenganisha mzigo wa utekelezaji kutoka kwenye kitalu cha mwafaka, kwa hivyo mpangilio wote wa muda wa sloti unabadilika, na sasa pia unaongeza uundaji wa ILs ambazo zinahitaji kufanywa kabla ya mzigo kupendekezwa. Kwa hivyo unahitaji kuwa mwangalifu kuhusu mpangilio wa muda, lakini kama ninakumbuka vizuri, kutoka mara ya mwisho tulipozungumza kuhusu hilo na Potuz na Terence, hakukuwa na kutotangamana kukuu hata kidogo. Nadhani tuko vizuri linapokuja suala la utangamano.

**Pooja Ranjan:** Ni vizuri kujua hilo. Niliona Jihoon pia alishiriki HackMD, ambayo tutaiongeza kwenye rasilimali, kwa watu ambao wangependa kujifunza zaidi kuhusu utangamano na ePBS haswa. Na ndiyo, ninakumbuka kutoka kwenye mazungumzo ya mwisho na Mike, nadhani pendekezo halikujumuishwa kwa sababu ya kutotangamana kwa udhanifu wa akaunti. Kwa hivyo ni vizuri kujua kwamba hili tayari limeshughulikiwa.

### FOCIL na MEV ya sloti nyingi (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Nilikuwa nikipitia nyaraka na maelezo yaliyoongezwa kwenye tovuti ya FOCIL, meetfocil.eth.limo, na kujifunza kuhusu neno linaloitwa MEV ya sloti nyingi. Julian pia alitaja kwamba MEV-Boost kwa ujumla inaleta faida, licha ya nia na juhudi zinazofanywa na wasanidi kuiweka katika kiwango sawa. Nashangaa jinsi FOCIL itakavyozuia hili.

**Julian Ma:** Asante kwa swali lako. Kwanza, wacha niseme kitu kuhusu FOCIL na MEV, na kisha tunaweza kuendelea na MEV ya sloti nyingi. FOCIL haizuii MEV lazima, na hii ni kwa sababu hasa tunataka kutenganisha sehemu za MEV na sehemu za ujumuishaji. Kwa mtazamo wetu ni muhimu kufanya hivyo, kwa sababu vinginevyo utakuwa na masoko ya aina ya IL Boost yakijitokeza. Kwa mantiki hiyo, ikiwa orodha ya ujumuishaji ingeweza kuzuia kiasi cha MEV kinachoweza kutolewa, basi kujenga orodha ya ujumuishaji kunakuwa na thamani sana, na watu wangeanzisha masoko kuizunguka. Muundo wetu upo kweli kutoa hakikisho la chini la ujumuishaji, ikimaanisha kuwa si jambo la thamani sana kuwa mwanachama wa kamati ya orodha ya ujumuishaji, na wapo 16 kati yao, ikimaanisha kuwa hakuna soko la wazalishaji wa kisasa.

Kisha, tukiendelea na MEV ya sloti nyingi: FOCIL inapunguza baadhi ya matatizo, lakini haitatui yote kikamilifu. Hii ni tena kwa sababu ya kutokubaliana huku kati ya kutoa upinzani dhidi ya udhibiti na suluhisho kwa MEV. Kile ambacho FOCIL inafanya ni kuruhusu muamala wowote kujumuishwa mradi tu unalipa ada, jambo ambalo linasuluhisha MEV ya sloti nyingi kwa kiasi fulani. MEV ya sloti nyingi hapa ni pale ambapo upande mmoja unaweza kutoa MEV zaidi ikiwa unadhibiti vitalu viwili mfululizo.

FOCIL inapunguza baadhi ya matatizo kwa sababu inakuruhusu kuingiza muamala wako. Kwa mfano, ikiwa unahitaji kuingiza muamala wa kufilisi deni baya kwenye nafasi fulani mahali fulani, unaweza kufanya hivyo hata kama mpendekezaji anajaribu kukudhibiti na angetoa MEV kutoka kwako katika kitalu kinachofuata.

Kwa nini haisuluhishi matatizo yote ni kwa sababu ya uteuzi hasi (adverse selection), sifa ya kiuchumi ambapo mtu mmoja ana taarifa zaidi kuliko mwingine. Mfano mmoja wa MEV ya sloti nyingi ungekuwa kutoa faida ya ubadilishaji (arbitrage) kwenye vitalu viwili, ambapo mjenga kizuizi hatoi faida ya ubadilishaji katika kitalu cha kwanza na anafanya hivyo katika kitalu cha pili. Kuna baadhi ya matokeo ya kinadharia yanayoonyesha kuwa hii inaweza kuwa na faida zaidi kwa mjenga kizuizi kuliko kutoa faida ya ubadilishaji katika sloti zote mbili. Unaweza kufikiri kwamba FOCIL inasaidia hapa, kwa sababu wafanyabiashara wa ubadilishaji kimsingi wangeweza kujumuisha muamala wao katika orodha ya ujumuishaji na hivyo kulazimisha aina fulani ya ubadilishaji kutokea. Ingawa hii ndivyo ilivyo, haiendani na motisha kwa wafanyabiashara wa ubadilishaji kuwasilisha muamala wao kwa FOCIL, kwa sababu bado kuna sekunde 3 kati ya muamala wao kuwasilishwa na mjenga kizuizi kuweza kuchukua hatua. Ikiwa unajaribu kufanya ubadilishaji na bei inabadilika kila wakati kwenye soko fulani la nje, hutaki kujitolea sekunde 3 mapema, kwa sababu una taarifa chache sana kuliko mjenga kizuizi, ambaye anachukua hatua baada yako. Uteuzi hasi unajitokeza kwa sababu mjenzi ana taarifa zaidi: atakuruhusu ushinde ikiwa ni mbaya kwako, ikiwa bei kwenye soko la nje imeenda kinyume nawe katika hizo sekunde tatu za ziada, na atajiruhusu ashinde ikiwa ni bora kwake kushinda.

Kwa hivyo FOCIL inasuluhisha sehemu za MEV ya sloti nyingi ambapo miamala haikumbani na uteuzi hasi. Kwa miamala ambapo kuna uteuzi hasi, ni ngumu kidogo zaidi, lakini inapunguza tatizo kwa kiasi fulani. Kimsingi, inafanya mambo kuwa bora zaidi kuliko yalivyo sasa, lakini bado kuna kazi kidogo ya kufanya.

**Pooja Ranjan:** Vizuri sana, asante sana kwa kushiriki hilo. Ninaelewa kuna utafiti mwingi unaoendelea kushughulikia suala la MEV, kwa hivyo ni vizuri kujua kwamba angalau kimsingi itasaidia zaidi kuliko hali ya sasa.

### Mabadilishano na changamoto (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Nina swali moja kuhusiana na kile Thomas alichotaja hapo awali kuhusu kura kinzani za IL. Niliona kuwa katika sehemu ya mazingatio ya usalama ya pendekezo, kuna mambo kadhaa yaliyotajwa, kama vile uhai wa mwafaka, kura kinzani za IL, na ujenzi wa mzigo wa utekelezaji. Ungechukulia nini kama mabadilishano makubwa zaidi, au jambo ambalo linaweza kuhitaji utafiti zaidi na linaweza kuzuia pendekezo hili kuingia katika uboreshaji unaofuata kama lilivyo?

**Thomas Thiery:** Kusema kweli, nadhani sehemu ya mazingatio ya usalama ilikuwa zaidi njia ya kuonyesha kwamba tumefikiria na kushughulikia wasiwasi kuhusu usalama. Ni zaidi ya kuwa na maswali wazi kuhusu mambo ya usalama ambayo hatuyajui. Sidhani kama kuna vizuizi vikubwa au matatizo katika suala la mazingatio ya usalama.

Kwa mabadilishano: ukichukua mtazamo finyu sana, ni kweli kwamba FOCIL inaongeza baadhi ya majukumu kwa wathibitishaji, wote wanapopaswa kupendekeza orodha ya ujumuishaji, na kwa washuhudiaji, wanapopaswa kuangalia sharti moja zaidi ili kuhakikisha kitalu ni halali kulingana na orodha za ujumuishaji. Pia inaongeza jukumu dogo kwa mpendekezaji, kwa sababu sasa inahitaji kuhakikisha mzigo wake wa utekelezaji unajumuisha miamala katika IL. Kwangu mimi, hayo ndiyo mabadilishano pekee, na majukumu hayo si mazito au tata. Mjumbe wa kamati ya IL anafuatilia tu mempool ya umma na kujumuisha miamala katika orodha wanayotuma. Haihitaji aina yoyote ya ujuzi au utata, jambo ambalo nadhani ni zuri. Kwa upande mwingine, kama tulivyosema, inaweza kufungua maboresho makubwa ya kuongeza ukubwa na utengano bora kati ya washiriki na majukumu ndani ya itifaki.

Ninaweza kuwa na upendeleo, lakini sioni mabadilishano makubwa. Nadhani inageuza mambo juu chini linapokuja suala la upinzani wa udhibiti. Sasa unahitaji tu kimsingi 15% ya mtandao kuwa waaminifu kwa miamala yote, ikiwa ni pamoja na ile inayoweza kudhibitiwa na wajenzi, kujumuishwa katika kitalu kinachofuata, ambalo ni uboreshaji mkubwa sana. Sidhani kama unabadilishana mambo mengi hapo, kusema kweli.

**Pooja Ranjan:** Ni vizuri kujua hilo. Katika mapendekezo mengi tunaona kwamba sehemu ya mazingatio ya usalama haina taarifa yoyote au ina taarifa kidogo sana, kwa hivyo ni vizuri kujua utafiti umefanywa kwenye sehemu hiyo na tunafahamu mazingatio ya usalama yanayowezekana. Nimefurahi kujua si kizuizi au changamoto inayowezekana kwa utekelezaji na kupitishwa katika siku zijazo.

### Taratibu za ada ya muamala kwa orodha za ujumuishaji (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Nina swali kuhusu baadhi ya maswali wazi niliyoyapata kwenye tovuti yenyewe, kuhusu utaratibu wa ada ya muamala. Ninashangaa kama kuna sasisho lolote, au kama ungependa kushiriki zaidi kuhusu njia bora ya kutoza ada na kusambaza ada hizi kwa ajili ya kujumuishwa kwenye orodha ya ujumuishaji.

**Thomas Thiery:** Tuna ruzuku inayoendelea ambayo inaangazia hili haswa na taratibu za motisha ili kutoa tuzo kwa wajumbe wa kamati ya IL. Sio rahisi. Ni jambo gumu, na haijalishi unalishughulikia vipi, haya pia ni mabadiliko makubwa sana. Kubadilisha ada kwenye Ethereum, iwe unabadilisha ada, unaongeza, au unaongeza utoaji mpya, haya yote ni mabadiliko makubwa yanayohitaji uzingatiaji na uangalifu mkubwa. Lakini inachunguzwa, na mawazo kuhusu kusambaza ada kwa, kwa mfano, wajumbe wa kamati wanaojumuisha muamala yanaonekana kama mawazo mazuri. Ina aina ya sifa tunazotaka, kwa sababu tunataka kutoa tuzo kwa watu kwa kujumuisha miamala ambayo wengine wanaweza wasitake kuijumuisha. Kwa hivyo tunafikiria kwa kina sana kuhusu hili, na tuna ruzuku inayoendelea.

Pia kuna swali la kama tunataka kutoa ada kwa wajumbe wa kamati ya IL kabisa, kwa sababu ni vigumu sana kutoa tuzo kwa washiriki wadogo waliosambazwa kote ulimwenguni. Hutaki mashambulizi ya Sybil, na hutaki washiriki wakubwa wenye dhamana nyingi kuwafunika wajumbe wa kamati ya IL. Unazuiaje hilo? Hilo ni gumu sana. Kwa hivyo una mambo mengi ya kuzingatia katika usanifu.

Moja ya mitazamo niliyokuwa nayo hivi karibuni ni: vipi kama tukiongeza baadhi ya vipengele vizuri kwenye FOCIL, kama vile faragha, ili usiweze kujua hasa ni nani aliyependekeza orodha fulani ya miamala? Unajua alikuwa mtu aliyechaguliwa haswa kama mjumbe wa kamati ya IL, lakini hujui haswa ni nani aliyependekeza orodha ipi, kwa hivyo huwezi kuhusisha wajumbe wa kamati ya IL na seti ya miamala katika IL zao. Ikiwa tunaweza kuwa na hilo, na kuruhusu jukumu la kamati ya IL liwe la hiari, basi labda tungekuwa na washiriki waaminifu katika itifaki, wakitegemea tabia ya kujitolea, na labda hatungehitaji kuweka utaratibu wa ada kabisa. Huo ni mtazamo wa hivi karibuni sana, wenye maoni binafsi, na unachunguzwa sana hivi sasa. Haya yote ni majadiliano ya "mustakabali wa FOCIL"; hayapaswi kujumuishwa katika EIP ya sasa.

**Julian Ma:** Kuongezea tu juu ya hilo, sehemu hiyo ya mwisho pia ni muhimu sana: EIP-7805 haijumuishi utaratibu wowote wa ada ya muamala, ili kuifanya iwe rahisi kutekeleza. Kimsingi ni njia ndogo zaidi inayowezekana ambayo tunaweza kutoa sifa za upinzani dhidi ya udhibiti, lakini inapanulika sana. Tunaangalia hilo. Thomas amefanya kazi kubwa akiangalia ada tofauti za muamala kwa wajumuishaji na kwa wapendekezaji. Kisha, kama Thomas alivyotaja, tuna ruzuku inayoendelea na mtafiti mzuri katika Nethermind ambaye anaangalia kuunda utaratibu wa ada ya muamala kwa ajili ya FOCIL, na hii inatia matumaini sana. Na hatimaye, kumekuwa na kazi kwenye utaratibu wa ada ya muamala kwa toleo la FOCIL linaloitwa AUCIL, muundo wa orodha ya ujumuishaji unaotegemea mnada uliopendekezwa na Sarisht Wadhwa, Fan Zhang, na Kartik Nayak pamoja na baadhi ya waandishi wa FOCIL, ambao unaangalia njia za kuwapa motisha wajumbe wa kamati ya orodha ya ujumuishaji.

Kuhusu hoja ya Luis ya awali, kutoa motisha kunahusu sana jinsi orodha za ujumuishaji zinavyoundwa. Inamaanisha itifaki inataka kutoa mtazamo fulani wa jinsi wajumbe wa kamati ya orodha ya ujumuishaji wanapaswa kujiendesha. Kawaida kile ambacho hii inamaanisha ni kwamba inataka washiriki fulani kufanya mambo tofauti. Kwa mfano, inaweza kupanga wajumbe wa kamati na kuwapa miamala fulani kupitia usawa unaohusiana, ili bado kuwa na tabia tofauti kati ya wajumbe wa kamati. Kwa hivyo sio sehemu ya pendekezo la sasa, lakini hakika tunaliangalia, na linaendana na uwezo wa FOCIL wa kupanuliwa.

**Pooja Ranjan:** Oh, hiyo inavutia. Kwa hivyo tunapaswa kutarajia baadhi ya mapendekezo ya ziada katika siku zijazo ili kuboresha vipengele vya sasa vya FOCIL.

### Ukubwa wa orodha ya ujumuishaji (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Nina swali lingine. Sina uhakika kama inapaswa kuwa sehemu ya pendekezo la sasa, lakini nina hamu ya kuelewa ikiwa kuna sasisho lolote kuhusu ukubwa wa IL. Orodha za ujumuishaji lazima ziwe na kikomo cha ukubwa ili kuzuia matumizi makubwa ya kipimo data. Je, tuna utafiti wowote zaidi au masasisho kuhusu jinsi ukubwa bora wa orodha ya ujumuishaji unavyoweza kuamuliwa?

**Thomas Thiery:** Tuna ukubwa uliowekwa sasa katika maelezo ya kiufundi, na umekuwepo kwa muda: kilobaiti 8. Tuliweka katika kilobaiti kwa sababu kile ambacho FOCIL na IL hutumia hasa ni kipimo data, na ndivyo ilivyo. Ukichukua ukubwa wa kati wa muamala, tunapata takriban miamala 40 kwa kila IL, na ikiwa miamala yote ni ya kipekee, hiyo ni takriban miamala 640 inayoweza kuunganishwa pamoja katika wajumbe wote 16 wa kamati.

Sijui kama kuna utafiti mwingi sana wa kufanywa kuhusu ukubwa kamili ulio bora. Kile tulichochagua: 16 mara kilobaiti 8 kimsingi ni ukubwa wa blobu, kwa hivyo si kiasi kikubwa sana cha kipimo data kikiunganishwa. Na kwa kuwa muunganiko wa miamala katika IL zote ni mkubwa kuliko kitalu, sidhani kama tutakumbana na matatizo hapo.

Kwa siku zijazo, unaweza kuongeza ukubwa wa IL, lakini pia unaweza kufikiria kuongeza idadi ya wajumbe wa kamati ya IL. Hiyo inakuruhusu kuwa na nafasi zaidi za kupata mjumbe mmoja mwaminifu wa kamati ya IL ikiwa sehemu kubwa ya mtandao itaamua kuanza kudhibiti. Kwa hivyo hilo pia ni jambo tunaloweza kufanya. Kwa sasa, inaonekana kama 16 itakuwa sawa kabisa na inatosha, lakini hakika unaweza kubadilisha vigezo hivi katika siku zijazo ikiwa udhibiti utazidi sana, au ikiwa tunahitaji kuchukua hatua zaidi.

### Vipimo vya kufuatilia upokeaji (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Swali la kufuatilia hapa: je, una vipimo vyovyote akilini ambavyo tunaweza kuvifuatilia ili kuelewa upokeaji au mafanikio ya pendekezo hili?

**Julian Ma:** Hilo ni swali zuri sana. Acha nijibu haraka kisha nimkabidhi Thomas kijiti. Baadhi ya vipimo rahisi ni idadi ya orodha za ujumuishaji zinazopendekezwa ambazo si tupu. Na unaweza kufikiria dashibodi, kama mfululizo wa ".pics" kutoka kwa Toni Wahrstätter, ambapo labda kuna maelezo zaidi, yakipa kipimo fulani cha ubora orodha hizi za ujumuishaji. Kimsingi, hata hivyo, mtu mmoja tu kwa kila sloti anahitaji kuunda orodha sahihi ya ujumuishaji ili kutoa ukinzani dhidi ya udhibiti.

Nadhani ni jambo muhimu sana kwamba ni muhimu kutekeleza FOCIL hivi karibuni, kwa sababu sasa tuko katika hali hii ya kipekee ambapo wajenga vizuizi hawadhibiti sana na wathibitishaji hawadhibiti sana. Ningesema hali hii ni tete sana. Hadi sasa, wajenga vizuizi wamekuwa wakidhibiti kwa muda mrefu, na ikiwa tutatambulisha FOCIL sasa, tuna uwezekano wa kuifanya iwe chaguo-msingi kwamba wathibitishaji hawa wote wanaipokea na kuunda orodha za ujumuishaji zenye maana. Kwa sababu wajenga vizuizi hawadhibiti, hakuna kuyumba kwa soko kunakoundwa hapa. Ikiwa tutasubiri hadi kuwe na udhibiti miongoni mwa wajenzi, basi itakuwa vigumu zaidi kutambulisha FOCIL, na ningefikiria vipimo vyote ambavyo vingetumika kupima upokeaji vingekuwa vibaya zaidi.

**Thomas Thiery:** Kipimo kimoja muhimu cha kuangalia pia ni ucheleweshaji wa ujumuishaji kwa miamala ya mempool ya umma. Unachukua miamala yote inayosubiri kwenye mempool ya umma na unaona jinsi inavyojumuishwa haraka. Ikiwa FOCIL inafanya kazi, yote itajumuishwa kwenye kitalu kinachofuata. Ikiwa haitajumuishwa, hiyo inamaanisha idadi kubwa ya wathibitishaji inadhibiti. Kwa hivyo kipimo kingine tunachoweza kuangalia ni nani anayedhibiti, na ni asilimia ngapi ya mtandao inadhibiti. Tutakuwa na dashibodi na vipimo vilivyo wazi sana vya kufuatilia hili, kwa sababu kimsingi ndicho FOCIL inapaswa kufanya. Ikiwa miamala ya umma haijumuishwi kwenye kitalu kinachofuata, hiyo inamaanisha sehemu kubwa sana ya mtandao kwa kweli inadhibiti miamala hii.

**Pooja Ranjan:** Inavutia sana. Kwa hivyo labda ni jambo kwa watafiti: orodha inayowezekana ya matamanio kwa ajili ya maboresho, kwamba dashibodi na wafuatiliaji wa vipimo vinapaswa kushirikiwa na wasanidi kwa ajili ya pendekezo wakati wowote linapojumuishwa kwenye boresho la mtandao.

### Hali ya utekelezaji wa mteja (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Kama Julian alivyotaja, pendekezo hili linaweza kuhitaji kutekelezwa haraka iwezekanavyo. Nina hamu ya kuelewa tumefikia wapi kwenye utekelezaji wa mteja, kwa sababu ninakumbuka katika simu iliyopita ya mtandao wa majaribio Paritosh alitaja kuongeza usaidizi fulani na mitandao ya wasanidi. Kwa hivyo tumefikia wapi kuhusu hilo?

**Thomas Thiery:** Tunaendelea vizuri sana. Kwanza kabisa, imekuwa nzuri sana kuona jinsi watu walivyochukua jukumu la utekelezaji wa FOCIL, kwa sababu mimi si msanidi, mimi ni mtafiti. Nimekuwa nikifanya kazi na wasanidi tangu mwanzo, lakini mimi siye ninayetekeleza mambo kwenye wateja.

Wale walioongoza hili, watatu kati yao: tuna Terence kutoka Prysm, na Jihoon, ambaye amekuwa akimsaidia Terence sana kwenye Prysm lakini pia amefanya kazi kwenye Geth. Kwa hivyo sasa tuna mtandao wa wasanidi unaofanya kazi kwa Prysm na Geth, jambo ambalo ni zuri, na kuna majaribio mengi yanayoendelea. Sasa pia tunajaribu kufanya FOCIL ionyeshwe na kuonekana kwenye kichunguzi cha Dora. Kisha una Jacob, ambaye amefanya kazi kwenye Lighthouse na Reth, na ninajua baadhi ya juhudi bado zinaendelea huko. Lodestar imekuwa ikifanya kazi sana hivi karibuni; ninafikiri wako karibu sana kuwa na mtandao wa wasanidi unaofanya kazi. Tulipata habari kutoka Nethermind leo kwamba wana mfano wa awali, jambo ambalo ni zuri sana. Ninahisi kama ninasahau baadhi yao... Nimbus inajiunga pia, anasema Jihoon. Hiyo ni nzuri sana.

Kwa ujumla, tunapata mitandao ya wasanidi zaidi na zaidi iliyo tayari na inayofanya kazi, mitandao ya wasanidi ya ndani, na michanganyiko zaidi na zaidi kati ya wateja wa utekelezaji na tabaka la mwafaka. Kumekuwa na maendeleo mazuri sana, na ni vizuri kuona, kwa sababu sote tunajua wasanidi wana shughuli nyingi sasa huku Pectra ikija, na tayari wanafanyia kazi PeerDAS na mambo mengine. Imekuwa nzuri sana kuona jinsi watu kwenye Ethereum kwa ujumla wanavyojali sana kuhusu upinzani dhidi ya udhibiti. Timu nyingi ambazo sikuwa nimeziomba moja kwa moja zilijiunga tu na juhudi hizi na sasa zinafanyia kazi mitandao ya wasanidi na majaribio.

**Pooja Ranjan:** Asante kwa kushiriki hilo. Ninatarajia kufuatilia sasisho kwenye mitandao ya wasanidi. Sina uhakika kutakuwa na matoleo mangapi ya mtandao huu wa wasanidi, lakini nina furaha kuona ukija. Ninaona Justin ana swali hapa. Justin, tafadhali endelea.

### FOCIL katika Fusaka au Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Sawa, jifunge mkanda kwa hili. Ulitoa hoja nzuri sana kwamba wakati mzuri wa kushughulikia udhibiti ni kabla udhibiti haujatokea, sivyo? Hivyo basi: FOCIL katika Fusaka, au inaweza kusubiri hadi Glamsterdam? Na ni ipi ninayopaswa kuitetea kama msanidi?

**Thomas Thiery:** Tumefungua PR, na iliunganishwa, huku FOCIL ikipendekezwa kwa Fusaka. Tunadhani inapaswa kuingia kwenye Fusaka. Sehemu ya sababu ni kwamba baadhi ya wateja tayari wameanza kuifanyia kazi, na hawajakumbana na vikwazo vingi sana. Sio kama mapendekezo mengine ambayo ni magumu zaidi kutekeleza na yanahusisha kazi nyingi zaidi. Na pia haina ubishi sana. Sidhani kama kuna mtu yeyote anayepinga upinzani dhidi ya udhibiti, na kila mtu kwa namna fulani anakubali inahitaji kujumuishwa haraka iwezekanavyo. Kwa hivyo ningechagua Fusaka.

Sijui kama inaweza kusubiri au la. Mapendekezo na masasisho yanaweza kusubiri kila wakati. Ninataka tu kuepuka ulimwengu ambao si rahisi kutekeleza mabadiliko haya. Mambo yanaweza kubadilika haraka sana. Kama tulivyoona, ilienda kinyume: miezi michache iliyopita, mmoja wa wajenzi wakuu aliacha kudhibiti ghafla tu. Tuliuliza kwa nini, na ilikuwa kama, "ndio, tuliamua tu kutofanya hivyo." Ilikuwa nzuri katika hali hiyo, kwa sababu ilikuwa upande mzuri, lakini inaweza kubadilika kabisa, na kisha tunaweza kuwa na wajenzi wawili wakidhibiti baadhi ya miamala, na tungerudi mahali pabaya sana.

Jambo lingine ninalotaka kutaja, kwa sababu nadhani ni muhimu: ikiwa tunaelekea kwenye baadhi ya mambo tuliyozungumzia, kama APS, ambapo unaweza kutenganisha mshuhudiaji na mpendekezaji kwa baadhi ya miundo tuliyofanyia kazi, tunahitaji kuwa na FOCIL kabla ya hapo, na tunahitaji kujua FOCIL inafanya kazi. Tunahitaji FOCIL kwenye Mtandao Mkuu kwa miezi sita, mwaka mmoja, ili kuwa na uhakika kweli inatimiza madhumuni yake, ambayo ni kudumisha na kuboresha sifa za upinzani dhidi ya udhibiti za Ethereum. Kwa hivyo uharaka mwingine, angalau kwangu, ni kwamba ikiwa tunataka kuwakinga washuhudiaji dhidi ya michezo ya muda na baadhi ya masuala mengine tunayotaka kufikia na APS, tunahitaji FOCIL iingie haraka iwezekanavyo.

**Pooja Ranjan:** Inasikitisha kuona wakati mwingine mapendekezo hayachaguliwi kwa sasisho lijalo au la karibu zaidi, lakini ni mapendekezo machache tu yanayoweza kujumuishwa katika sasisho moja. Ninathamini sana kazi yote ngumu inayofanywa nyuma ya uwasilishaji wa pendekezo, utayari wa pendekezo, pamoja na majaribio yanayofanyika. Kwa hivyo asante sana kwa kazi yote mnayofanya kwa mfumo wa ikolojia wa Ethereum.

### Maswali ya haraka (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Kabla hatujamaliza, tuna mzunguko mfupi wa maswali ya haraka. Sharti pekee ni kwamba jibu linapaswa kuwa neno moja au sentensi moja, na tutajaribu kufanya hivyo kwa kutumia kipima muda, labda sekunde 30 kila mmoja. Ikiwa uko tayari, hebu tuendelee na kuanza na Julian. Ni tatizo gani gumu zaidi katika utafiti wa mnyororo wa vitalu kwa sasa?

**Julian Ma:** Sitakuwa wa mzaha sana, kwa hivyo nitajibu kwa uzito. Ningesema tatizo gumu zaidi ni mustakabali wa uwekaji dhamana: mustakabali wa uwekaji dhamana unamaanisha nini, ni majukumu gani ambayo watoa huduma wanatoa, jinsi wanavyolipwa kwa hilo, na jinsi wanavyohusiana wao kwa wao.

**Pooja Ranjan:** Ni matumizi gani ya mnyororo wa vitalu ambayo hayajachunguzwa vya kutosha?

**Julian Ma:** Ningesema FOCIL.

**Pooja Ranjan:** Ni hatari gani kubwa zaidi ya kiusalama kwa Ethereum leo?

**Julian Ma:** Kwa uaminifu ningesema ukinzani dhidi ya udhibiti ni muhimu sana hapa, kwa sababu ya mambo kama MEV ya vitalu vingi ambayo inaweza kuleta hatari kubwa za kiusalama, kwa mfano kwa L2s.

**Pooja Ranjan:** Je, MEV inapaswa kupunguzwa, kukumbatiwa, au kitu katikati ya hayo?

**Julian Ma:** Nakubaliana kwa kiasi kikubwa na mtazamo wa Flashbots hapa, kwamba inapaswa kuwekwa kidemokrasia, ikimaanisha kwamba inapaswa kuongezwa pale inapohitajika, na kupunguzwa katika tabaka la programu.

**Pooja Ranjan:** Je, ugatuzi kila wakati una thamani ya hasara zinazoambatana nao?

**Julian Ma:** Kawaida una thamani ya hasara zinazoambatana nao.

**Pooja Ranjan:** Ni ubunifu gani mkubwa zaidi ambao Ethereum imeleta ulimwenguni?

**Julian Ma:** Hapa ningependa kunukuu mazungumzo ya Mike Neuder kutoka Devcon kuhusu haki za mali za kidijitali. Ningesema haki za mali za kidijitali zinazokinza udhibiti ambazo kwa kweli zinabadilisha ulimwengu.

**Pooja Ranjan:** Asante sana, umejibu vizuri sana. Maswali yangu yanayofuata ni kwa ajili ya Thomas. Hivyo, kama Ethereum isingekuwepo, ungekuwa unafanyia kazi mnyororo wa vitalu upi?

**Thomas Thiery:** Nadhani nitakuwa wa mzaha sana, na Julian ameniharibia kidogo kwa sababu nilifikiri angefanya vivyo hivyo. Mnyororo wa vitalu ungekuwa FOCIL.

**Pooja Ranjan:** Ni matumizi gani ya mnyororo wa vitalu yaliyopigiwa debe kupita kiasi?

**Thomas Thiery:** Hakuna matumizi yoyote yanayofaa kupigiwa debe bila FOCIL.

**Pooja Ranjan:** Ni jambo gani moja ambalo Ethereum inahitaji kuboresha haraka iwezekanavyo?

**Thomas Thiery:** Ukinzani dhidi ya udhibiti, kwa kutumia FOCIL.

**Pooja Ranjan:** Neno moja la kuelezea ugatuzi?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Je, unafikiri Ethereum itasuluhisha kikamilifu suala la uwezo wa kupanuka?

**Thomas Thiery:** Ethereum yenye FOCIL, ndiyo.

**Pooja Ranjan:** Upanuzi wa tabaka la 1 (l1) au upanuzi wa tabaka la 2 (l2), upi unashinda?

**Thomas Thiery:** Matabaka yasiyo na kikomo, yote yakiwa na FOCIL.

**Pooja Ranjan:** Umefanya vizuri sana, asante sana, Thomas. Asante kwa kujibu maswali haya yote. Tunapomalizia, ningependa kukupa fursa hii: ikiwa una ujumbe wowote kwa jamii kuhusu pendekezo hili, au kwa jamii ya Ethereum kwa ujumla.

### Ujumbe kwa jamii (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Kwa kweli, hilo ni jambo muhimu sana, kwa sababu tuna mijadala inayoendelea wakati wote, na yote ipo wazi kwa umma kwenye Discord. Kulikuwa na msukumo mwanzoni wa kuweka kila kitu wazi kwa umma, na kwa kweli watu wanafanya hivyo, kwa hivyo nina furaha sana. Unaweza kufuatilia mijadala na maendeleo kwenye Discord ya umma ya Eth R&D, kwenye chaneli ya inclusion-list. Hapo ndipo kimsingi kila kitu kinafanyika hivi sasa. Kisha unaweza kuwasiliana nasi kwenye Twitter, Telegram, popote pale. Jisikie huru.

Kadiri tunavyozungumza na watu wengi na kuwashirikisha, ndivyo muundo utakuwa bora zaidi na utekelezaji utakuwa mzuri zaidi. Kwa hivyo ikiwa unaweza kusaidia kwa njia yoyote, wasiliana nasi na tutafurahi kusaidia pande zote, hata upande wa utafiti. Inafaa zaidi, nadhani, kwetu kufanya kazi na watu wanaotaka kufanyia kazi mustakabali wa FOCIL. Tulitaja faragha, tulitaja mifumo ya ada ya muamala, na pia tutaangazia sana FOCIL kwa ajili ya mablobu. Mambo haya yote yanahitaji watu na juhudi za utafiti. Ikiwa una nia, wasiliana nasi. Asante sana kwa kutualika, na asante kwa kazi yote unayofanya kwa ajili ya Ethereum pia.

**Julian Ma:** Kuongezea tu hapo, natumai tumewafanya baadhi ya watu wawe na shauku kuhusu FOCIL. Ikiwa una shauku, tafadhali tujulishe. Na ikiwa kuna baadhi ya maswali ambayo bado unayo, tutafurahi kuyajibu, na tunatumai tunaweza kukushawishi kuwa FOCIL ndiyo njia sahihi ya kufuata. Asante sana. Ilikuwa furaha kweli kuwa hapa, na asante kwa kuandaa kikao hiki. Na pia asante kwa kila mtu kwa kuhudhuria, bila shaka.

### Maneno ya kufunga (59:52) {#closing-words-5952}

**Pooja Ranjan:** Asante. Tumefika mwisho. Shukrani za dhati kwa Thomas na Julian kwa kujiunga nasi leo na kushiriki ufahamu wao kuhusu EIP-7805. Asante kwa washiriki wote; maswali yenu yanatia moyo na kuelimisha. Asante kwa kufuatilia. Ikiwa umefurahia mazungumzo haya, hakikisha unapenda, unajiandikisha, na kushiriki kipindi hiki na wapenzi wenzako wa Ethereum. Tutawaletea EIP zaidi na maendeleo ya utafiti kwenye PEEPanEIP. Hadi wakati mwingine, endelea kunguruma kwa maarifa na kuvinjari Ethereum pamoja na Ethereum Cat Herders. Nakutakia mwendelezo mwema wa siku.