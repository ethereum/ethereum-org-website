---
title: Chaneli za Hali
description: Utangulizi wa chaneli za hali na chaneli za malipo kama suluhisho la kuongeza viwango linalotumiwa kwa sasa na jamii ya Ethereum.
lang: sw
sidebarDepth: 3
---

Chaneli za hali huruhusu washiriki kufanya miamala kwa usalama nje ya mnyororo huku wakiweka mwingiliano na Mtandao Mkuu wa [Ethereum](/) kwa kiwango cha chini. Wenza wa chaneli wanaweza kufanya idadi yoyote ya miamala nje ya mnyororo huku wakiwasilisha miamala miwili tu mnyororoni kufungua na kufunga chaneli. Hii inaruhusu uwezo wa upitishaji wa miamala wa juu sana na kusababisha gharama nafuu kwa watumiaji.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa kurasa zetu kuhusu [kuongeza viwango vya Ethereum](/developers/docs/scaling/) na [tabaka la 2 (l2)](/layer-2/).

## Chaneli ni nini? {#what-are-channels}

Minyororo ya vitalu ya umma, kama vile Ethereum, inakabiliwa na changamoto za kuongeza viwango kutokana na usanifu wao uliosambazwa: miamala mnyororoni lazima itekelezwe na nodi zote. Nodi zinapaswa kuwa na uwezo wa kushughulikia kiasi cha miamala katika kitalu kwa kutumia maunzi ya kawaida, kuweka kikomo kwenye uwezo wa upitishaji wa miamala ili kuweka mtandao uliogatuliwa. Chaneli za mnyororo wa vitalu hutatua tatizo hili kwa kuruhusu watumiaji kuingiliana nje ya mnyororo huku bado wakitegemea usalama wa mnyororo mkuu kwa ukamilishaji wa mwisho.

Chaneli ni itifaki rahisi za rika-kwa-rika zinazoruhusu pande mbili kufanya miamala mingi kati yao na kisha kuchapisha tu matokeo ya mwisho kwenye mnyororo wa vitalu. Chaneli hutumia kriptografia kuonyesha kwamba data ya muhtasari wanayozalisha ni kweli matokeo ya seti halali ya miamala ya kati. Mkataba mahiri wa ["saini-nyingi"](/developers/docs/smart-contracts/#multisig) huhakikisha miamala inasainiwa na pande sahihi.

Kwa chaneli, mabadiliko ya hali hutekelezwa na kuthibitishwa na pande zinazohusika, kupunguza ukokotoaji kwenye tabaka la utekelezaji la Ethereum. Hii hupunguza msongamano kwenye Ethereum na pia huongeza kasi ya uchakataji wa miamala kwa watumiaji.

Kila chaneli inasimamiwa na [mkataba mahiri wa saini-nyingi](/developers/docs/smart-contracts/#multisig) unaoendeshwa kwenye Ethereum. Ili kufungua chaneli, washiriki husambaza mkataba wa chaneli mnyororoni na kuweka fedha ndani yake. Pande zote mbili kwa pamoja husaini sasisho la hali ili kuanzisha hali ya chaneli, baada ya hapo wanaweza kufanya miamala haraka na kwa uhuru nje ya mnyororo.

Ili kufunga chaneli, washiriki huwasilisha hali ya mwisho iliyokubaliwa ya chaneli mnyororoni. Baadaye, mkataba mahiri husambaza fedha zilizofungwa kulingana na salio la kila mshiriki katika hali ya mwisho ya chaneli.

Chaneli za rika-kwa-rika ni muhimu sana kwa hali ambapo baadhi ya washiriki waliotambuliwa awali wanataka kufanya miamala kwa masafa ya juu bila kupata gharama za ziada zinazoonekana. Chaneli za mnyororo wa vitalu ziko chini ya makundi mawili: **chaneli za malipo** na **chaneli za hali**.

## Chaneli za malipo {#payment-channels}

Chaneli ya malipo inaelezewa vyema kama "leja ya njia mbili" inayodumishwa kwa pamoja na watumiaji wawili. Salio la awali la leja ni jumla ya amana zilizofungwa kwenye mkataba mnyororoni wakati wa awamu ya kufungua chaneli. Uhamishaji wa chaneli ya malipo unaweza kufanywa papo hapo na bila ushiriki wa mnyororo wa vitalu wenyewe, isipokuwa kwa uundaji wa awali wa mara moja mnyororoni na kufungwa kwa mwisho kwa chaneli.

Masasisho ya salio la leja (yaani, hali ya chaneli ya malipo) yanahitaji idhini ya pande zote katika chaneli. Sasisho la chaneli, lililosainiwa na washiriki wote wa chaneli, linachukuliwa kuwa liliokamilishwa, sawa na muamala kwenye Ethereum.

Chaneli za malipo zilikuwa miongoni mwa suluhisho za awali za kuongeza viwango zilizoundwa kupunguza shughuli za gharama kubwa mnyororoni za mwingiliano rahisi wa watumiaji (k.m., uhamishaji wa ETH, ubadilishanaji wa atomiki, malipo madogo). Washiriki wa chaneli wanaweza kufanya kiasi kisicho na kikomo cha miamala ya papo hapo, isiyo na ada kati yao mradi tu jumla halisi ya uhamishaji wao haizidi tokeni zilizowekwa.

## Chaneli za hali {#state-channels}

Mbali na kusaidia malipo nje ya mnyororo, chaneli za malipo hazijathibitika kuwa na manufaa kwa kushughulikia mantiki ya jumla ya mpito wa hali. Chaneli za hali ziliundwa kutatua tatizo hili na kufanya chaneli kuwa na manufaa kwa kuongeza viwango vya ukokotoaji wa madhumuni ya jumla.

Chaneli za hali bado zina mambo mengi yanayofanana na chaneli za malipo. Kwa mfano, watumiaji huingiliana kwa kubadilishana ujumbe uliosainiwa kwa kriptografia (miamala), ambao washiriki wengine wa chaneli lazima pia wasaini. Ikiwa sasisho la hali lililopendekezwa halijasainiwa na washiriki wote, linachukuliwa kuwa batili.

Hata hivyo, pamoja na kushikilia salio la mtumiaji, chaneli pia hufuatilia hali ya sasa ya hifadhi ya mkataba (yaani, thamani za vigezo vya mkataba).

Hii inafanya iwezekane kutekeleza mkataba mahiri nje ya mnyororo kati ya watumiaji wawili. Katika hali hii, masasisho ya hali ya ndani ya mkataba mahiri yanahitaji tu idhini ya wenza waliounda chaneli.

Ingawa hii inatatua tatizo la kuongeza viwango lililoelezwa hapo awali, ina athari kwa usalama. Kwenye Ethereum, uhalali wa mabadiliko ya hali unatekelezwa na itifaki ya mwafaka ya mtandao. Hii inafanya iwezekane kupendekeza sasisho batili kwa hali ya mkataba mahiri au kubadilisha utekelezaji wa mkataba mahiri.

Chaneli za hali hazina dhamana sawa za usalama. Kwa kiasi fulani, chaneli ya hali ni toleo dogo la Mtandao Mkuu. Kwa kuwa na seti ndogo ya washiriki wanaotekeleza sheria, uwezekano wa tabia mbaya (k.m., kupendekeza masasisho batili ya hali) huongezeka. Chaneli za hali hupata usalama wao kutoka kwa mfumo wa usuluhishi wa migogoro unaotegemea [ushahidi wa udanganyifu](/glossary/#fraud-proof).

## Jinsi chaneli za hali zinavyofanya kazi {#how-state-channels-work}

Kimsingi, shughuli katika chaneli ya hali ni kipindi cha mwingiliano kinachohusisha watumiaji na mfumo wa mnyororo wa vitalu. Watumiaji mara nyingi huwasiliana wao kwa wao nje ya mnyororo na huingiliana tu na mnyororo wa vitalu wa msingi kufungua chaneli, kufunga chaneli, au kusuluhisha migogoro inayoweza kutokea kati ya washiriki.

Sehemu ifuatayo inaelezea mtiririko wa msingi wa kazi wa chaneli ya hali:

### Kufungua chaneli {#opening-the-channel}

Kufungua chaneli kunahitaji washiriki kuweka fedha kwenye mkataba mahiri kwenye Mtandao Mkuu. Amana pia hufanya kazi kama kichupo pepe, hivyo wahusika wanaoshiriki wanaweza kufanya miamala kwa uhuru bila kuhitaji kukamilisha malipo mara moja. Ni pale tu chaneli inapokamilishwa mnyororoni ndipo pande zote hukamilishana na kutoa kile kilichosalia kwenye kichupo chao.

Amana hii pia hutumika kama dhamana ya kuhakikisha tabia ya uaminifu kutoka kwa kila mshiriki. Ikiwa waweka amana watapatikana na hatia ya vitendo viovu wakati wa awamu ya utatuzi wa migogoro, mkataba hupunguza amana yao.

Wenza wa chaneli lazima wasaini hali ya awali, ambayo wote wanakubaliana. Hii hutumika kama mwanzo wa chaneli ya hali, baada ya hapo watumiaji wanaweza kuanza kufanya miamala.

### Kutumia chaneli {#using-the-channel}

Baada ya kuanzisha hali ya chaneli, wenza huingiliana kwa kusaini miamala na kutumiana kwa idhini. Washiriki huanzisha masasisho ya hali kwa miamala hii na kusaini masasisho ya hali kutoka kwa wengine. Kila muamala unajumuisha yafuatayo:

- **Nonsi**, ambayo hufanya kazi kama kitambulisho cha kipekee cha miamala na kuzuia mashambulizi ya kurudia. Pia hutambua mpangilio ambao masasisho ya hali yalitokea (ambayo ni muhimu kwa utatuzi wa migogoro)

- Hali ya zamani ya chaneli

- Hali mpya ya chaneli

- Muamala unaosababisha mpito wa hali (k.m., Alice anamtumia Bob 5 ETH)

Masasisho ya hali katika chaneli hayatangazwi mnyororoni kama ilivyo kawaida wakati watumiaji wanaingiliana kwenye Mtandao Mkuu, ambayo inaendana na lengo la chaneli za hali la kupunguza alama mnyororoni. Mradi tu washiriki wanakubaliana juu ya masasisho ya hali, yanakuwa ya mwisho kama muamala wa Ethereum. Washiriki wanahitaji tu kutegemea mwafaka wa Mtandao Mkuu ikiwa mgogoro utatokea.

### Kufunga chaneli {#closing-the-channel}

Kufunga chaneli ya hali kunahitaji kuwasilisha hali ya mwisho, iliyokubaliwa ya chaneli kwenye mkataba mahiri mnyororoni. Maelezo yaliyorejelewa katika sasisho la hali yanajumuisha idadi ya hatua za kila mshiriki na orodha ya miamala iliyoidhinishwa.

Baada ya kuthibitisha kuwa sasisho la hali ni halali (yaani, limesainiwa na pande zote) mkataba mahiri hukamilisha chaneli na kusambaza fedha zilizofungwa kulingana na matokeo ya chaneli. Malipo yaliyofanywa nje ya mnyororo yanatumika kwa hali ya Ethereum na kila mshiriki hupokea sehemu yake iliyosalia ya fedha zilizofungwa.

Hali iliyoelezwa hapo juu inawakilisha kile kinachotokea katika hali nzuri. Wakati mwingine, watumiaji wanaweza kushindwa kufikia makubaliano na kukamilisha chaneli (hali mbaya). Yoyote kati ya yafuatayo yanaweza kuwa kweli kuhusu hali hiyo:

- Washiriki huenda nje ya mtandao na kushindwa kupendekeza mabadiliko ya hali

- Washiriki wanakataa kusaini kwa pamoja masasisho halali ya hali

- Washiriki wanajaribu kukamilisha chaneli kwa kupendekeza sasisho la hali ya zamani kwenye mkataba mnyororoni

- Washiriki wanapendekeza mabadiliko batili ya hali ili wengine wasaini

Kila wakati mwafaka unapovunjika kati ya wahusika wanaoshiriki katika chaneli, chaguo la mwisho ni kutegemea mwafaka wa Mtandao Mkuu kutekeleza hali ya mwisho, halali ya chaneli. Katika kesi hii, kufunga chaneli ya hali kunahitaji kusuluhisha migogoro mnyororoni.

### Kusuluhisha migogoro {#settling-disputes}

Kwa kawaida, pande katika chaneli hukubaliana kufunga chaneli mapema na kusaini kwa pamoja mpito wa mwisho wa hali, ambao wanauwasilisha kwenye mkataba mahiri. Mara tu sasisho linapoidhinishwa mnyororoni, utekelezaji wa mkataba mahiri nje ya mnyororo huisha na washiriki hujitoa kwenye chaneli na pesa zao.

Hata hivyo, upande mmoja unaweza kuwasilisha ombi mnyororoni la kumaliza utekelezaji wa mkataba mahiri na kukamilisha chaneli—bila kusubiri idhini ya mwenza wao. Ikiwa yoyote kati ya hali za kuvunja mwafaka zilizoelezwa hapo awali zitatokea, upande wowote unaweza kuanzisha mkataba mnyororoni kufunga chaneli na kusambaza fedha. Hii hutoa **hali ya kutohitaji kuamini**, kuhakikisha kwamba pande waaminifu wanaweza kujitoa na amana zao wakati wowote, bila kujali vitendo vya upande mwingine.

Ili kuchakata kujitoa kwenye chaneli, mtumiaji lazima awasilishe sasisho la mwisho halali la hali ya programu kwenye mkataba mnyororoni. Ikiwa hii itathibitishwa (yaani, ina saini ya pande zote), basi fedha zinasambazwa tena kwa faida yao.

Hata hivyo, kuna ucheleweshaji katika kutekeleza maombi ya kujitoa ya mtumiaji mmoja. Ikiwa ombi la kuhitimisha chaneli liliidhinishwa kwa kauli moja, basi muamala wa kujitoa mnyororoni unatekelezwa mara moja.

Ucheleweshaji hutokea katika kujitoa kwa mtumiaji mmoja kutokana na uwezekano wa vitendo vya udanganyifu. Kwa mfano, mshiriki wa chaneli anaweza kujaribu kukamilisha chaneli kwenye Ethereum kwa kuwasilisha sasisho la hali ya zamani mnyororoni.

Kama hatua ya kupinga, chaneli za hali huruhusu watumiaji waaminifu kupinga masasisho batili ya hali kwa kuwasilisha hali ya hivi punde, halali ya chaneli mnyororoni. Chaneli za hali zimeundwa kwa njia ambayo masasisho mapya ya hali yaliyokubaliwa yanashinda masasisho ya hali ya zamani.

Mara tu mwenza anapoanzisha mfumo wa utatuzi wa migogoro mnyororoni, upande mwingine unahitajika kujibu ndani ya kikomo cha muda (kinachoitwa dirisha la changamoto). Hii inaruhusu watumiaji kupinga muamala wa kujitoa, hasa ikiwa upande mwingine unatumia sasisho lililopitwa na wakati.

Vyovyote itakavyokuwa, watumiaji wa chaneli daima wana dhamana dhabiti za ukamilifu: ikiwa mpito wa hali walio nao ulisainiwa na wanachama wote na ndio sasisho la hivi punde, basi una ukamilifu sawa na muamala wa kawaida mnyororoni. Bado wanapaswa kupinga upande mwingine mnyororoni, lakini matokeo pekee yanayowezekana ni kukamilisha hali ya mwisho halali, ambayo wanashikilia.

### Je, chaneli za hali zinaingilianaje na Ethereum? {#how-do-state-channels-interact-with-ethereum}

Ingawa zipo kama itifaki za nje ya mnyororo, chaneli za hali zina sehemu mnyororoni: mkataba mahiri uliosambazwa kwenye Ethereum wakati wa kufungua chaneli. Mkataba huu unadhibiti mali zilizowekwa kwenye chaneli, huthibitisha masasisho ya hali, na kusuluhisha migogoro kati ya washiriki.

Chaneli za hali hazichapishi data ya muamala au ahadi za hali kwenye Mtandao Mkuu, tofauti na suluhisho za kuongeza viwango za [tabaka la 2 (l2)](/layer-2/). Hata hivyo, zimeunganishwa zaidi na Mtandao Mkuu kuliko, tuseme, [minyororo ya kando](/developers/docs/scaling/sidechains/), na kuzifanya kuwa salama kiasi.

Chaneli za hali zinategemea itifaki kuu ya Ethereum kwa yafuatayo:

#### 1. Upatikanaji {#liveness}

Mkataba mnyororoni uliosambazwa wakati wa kufungua chaneli unawajibika kwa utendaji wa chaneli. Ikiwa mkataba unaendeshwa kwenye Ethereum, basi chaneli inapatikana kila wakati kwa matumizi. Kinyume chake, mnyororo wa kando unaweza kushindwa kila wakati, hata kama Mtandao Mkuu unafanya kazi, na kuweka fedha za watumiaji hatarini.

#### 2. Usalama {#security}

Kwa kiasi fulani, chaneli za hali zinategemea Ethereum kutoa usalama na kulinda watumiaji dhidi ya wenza waovu. Kama ilivyojadiliwa katika sehemu za baadaye, chaneli hutumia utaratibu wa ushahidi wa udanganyifu unaoruhusu watumiaji kupinga majaribio ya kukamilisha chaneli kwa sasisho batili au lililopitwa na wakati.

Katika kesi hii, upande mwaminifu hutoa hali ya hivi punde halali ya chaneli kama ushahidi wa udanganyifu kwenye mkataba mnyororoni kwa uthibitisho. Ushahidi wa udanganyifu huwezesha pande zisizoaminiana kufanya miamala nje ya mnyororo bila kuhatarisha fedha zao katika mchakato huo.

#### 3. Ukamilifu {#finality}

Masasisho ya hali yaliyosainiwa kwa pamoja na watumiaji wa chaneli yanachukuliwa kuwa mazuri kama miamala mnyororoni. Bado, shughuli zote ndani ya chaneli hufikia ukamilifu wa kweli tu wakati chaneli inafungwa kwenye Ethereum.

Katika hali ya matumaini, pande zote mbili zinaweza kushirikiana na kusaini sasisho la mwisho la hali na kuwasilisha mnyororoni kufunga chaneli, baada ya hapo fedha zinasambazwa kulingana na hali ya mwisho ya chaneli. Katika hali ya kukata tamaa, ambapo mtu anajaribu kudanganya kwa kuchapisha sasisho lisilo sahihi la hali mnyororoni, muamala wao haukamilishwi hadi dirisha la changamoto lipite.

## Chaneli pepe za hali {#virtual-state-channels}

Utekelezaji wa kimsingi wa chaneli ya hali ungekuwa kusambaza mkataba mpya wakati watumiaji wawili wanataka kutekeleza programu nje ya mnyororo. Hii sio tu haiwezekani, lakini pia inakanusha ufanisi wa gharama wa chaneli za hali (gharama za miamala mnyororoni zinaweza kuongezeka haraka).

Ili kutatua tatizo hili, "chaneli pepe" ziliundwa. Tofauti na chaneli za kawaida zinazohitaji miamala mnyororoni kufungua na kusitisha, chaneli pepe inaweza kufunguliwa, kutekelezwa, na kukamilishwa bila kuingiliana na mnyororo mkuu. Inawezekana hata kusuluhisha migogoro nje ya mnyororo kwa kutumia njia hii.

Mfumo huu unategemea uwepo wa kile kinachoitwa "chaneli za leja", ambazo zimefadhiliwa mnyororoni. Chaneli pepe kati ya pande mbili zinaweza kujengwa juu ya chaneli ya leja iliyopo, huku mmiliki (wamiliki) wa chaneli ya leja akitumika kama mpatanishi.

Watumiaji katika kila chaneli pepe huingiliana kupitia mfano mpya wa mkataba, huku chaneli ya leja ikiwa na uwezo wa kusaidia mifano mingi ya mkataba. Hali ya chaneli ya leja pia ina zaidi ya hali moja ya hifadhi ya mkataba, ikiruhusu utekelezaji sambamba wa programu nje ya mnyororo kati ya watumiaji tofauti.

Kama tu chaneli za kawaida, watumiaji hubadilishana masasisho ya hali ili kuendeleza mashine ya hali. Isipokuwa mgogoro utokee, mpatanishi anahitaji tu kuwasiliana naye wakati wa kufungua au kusitisha chaneli.

### Chaneli pepe za malipo {#virtual-payment-channels}

Chaneli pepe za malipo hufanya kazi kwa wazo sawa na chaneli pepe za hali: washiriki waliounganishwa kwenye mtandao mmoja wanaweza kupitisha ujumbe bila kuhitaji kufungua chaneli mpya mnyororoni. Katika chaneli pepe za malipo, uhamishaji wa thamani hupitishwa kupitia mpatanishi mmoja au zaidi, na dhamana kwamba mpokeaji aliyekusudiwa pekee ndiye anayeweza kupokea fedha zilizohamishwa.

## Matumizi ya chaneli za hali {#applications-of-state-channels}

### Malipo {#payments}

Chaneli za awali za mnyororo wa vitalu zilikuwa itifaki rahisi zilizoruhusu washiriki wawili kufanya uhamishaji wa haraka, wa ada ya chini nje ya mnyororo bila kulazimika kulipa ada kubwa za miamala kwenye Mtandao Mkuu. Leo, chaneli za malipo bado ni muhimu kwa programu zilizoundwa kwa ajili ya ubadilishanaji na amana za Etha na tokeni.

Malipo yanayotegemea chaneli yana faida zifuatazo:

1. **Uwezo wa upitishaji**: Kiasi cha miamala nje ya mnyororo kwa kila chaneli hakijaunganishwa na uwezo wa upitishaji wa Ethereum, ambao unaathiriwa na mambo mbalimbali, hasa ukubwa wa kitalu na muda wa kitalu. Kwa kutekeleza miamala nje ya mnyororo, chaneli za mnyororo wa vitalu zinaweza kufikia uwezo wa upitishaji wa juu zaidi.

2. **Faragha**: Kwa sababu chaneli zipo nje ya mnyororo, maelezo ya mwingiliano kati ya washiriki hayarekodiwi kwenye mnyororo wa vitalu wa umma wa Ethereum. Watumiaji wa chaneli wanahitaji tu kuingiliana mnyororoni wakati wa kufadhili na kufunga chaneli au kusuluhisha migogoro. Hivyo, chaneli ni muhimu kwa watu binafsi wanaotaka miamala ya faragha zaidi.

3. **Ucheleweshaji**: Miamala nje ya mnyororo inayofanywa kati ya washiriki wa chaneli inaweza kukamilishwa papo hapo, ikiwa pande zote mbili zitashirikiana, na kupunguza ucheleweshaji. Kinyume chake, kutuma muamala kwenye Mtandao Mkuu kunahitaji kusubiri nodi kuchakata muamala, kuzalisha kitalu kipya na muamala, na kufikia mwafaka. Watumiaji wanaweza pia kuhitaji kusubiri uthibitisho zaidi wa kitalu kabla ya kuchukulia muamala kuwa uliokamilishwa.

4. **Gharama**: Chaneli za hali ni muhimu sana katika hali ambapo seti ya washiriki watabadilishana masasisho mengi ya hali kwa muda mrefu. Gharama pekee zinazopatikana ni kufungua na kufunga mkataba mahiri wa chaneli ya hali; kila mabadiliko ya hali kati ya kufungua na kufunga chaneli yatakuwa nafuu kuliko ya mwisho kwani gharama ya ukamilishaji inasambazwa ipasavyo.

Kutekeleza chaneli za hali kwenye suluhisho za tabaka la 2 (l2), kama vile [mikusanyiko](/developers/docs/scaling/#rollups), kunaweza kuzifanya zivutie zaidi kwa malipo. Ingawa chaneli hutoa malipo ya bei nafuu, gharama za kuanzisha mkataba mnyororoni kwenye Mtandao Mkuu wakati wa awamu ya kufungua zinaweza kuwa ghali—hasa wakati ada za gesi zinapopanda. Mikusanyiko inayotegemea Ethereum hutoa [ada za chini za miamala](https://l2fees.info/) na inaweza kupunguza gharama za ziada kwa washiriki wa chaneli kwa kupunguza ada za usanidi.

### Miamala midogo {#microtransactions}

Miamala midogo ni malipo ya thamani ya chini (k.m., chini ya sehemu ya dola) ambayo biashara haziwezi kuchakata bila kupata hasara. Mashirika haya lazima yalipe watoa huduma za malipo, jambo ambalo hawawezi kufanya ikiwa faida kwenye malipo ya wateja ni ndogo sana kupata faida.

Chaneli za malipo hutatua tatizo hili kwa kupunguza gharama za ziada zinazohusiana na miamala midogo. Kwa mfano, Mtoa Huduma za Mtandao (ISP) anaweza kufungua chaneli ya malipo na mteja, na kuwaruhusu kutiririsha malipo madogo kila wakati wanapotumia huduma.

Zaidi ya gharama ya kufungua na kufunga chaneli, washiriki hawapati gharama zaidi kwenye miamala midogo (hakuna ada za gesi). Hii ni hali ya kushinda na kushinda kwani wateja wana unyumbufu zaidi katika kiasi wanacholipa kwa huduma na biashara hazipotezi miamala midogo yenye faida.

### Programu tumizi zilizogatuliwa {#decentralized-applications}

Kama chaneli za malipo, chaneli za hali zinaweza kufanya malipo ya masharti kulingana na hali za mwisho za mashine ya hali. Chaneli za hali pia zinaweza kusaidia mantiki ya mpito wa hali kiholela, na kuzifanya kuwa muhimu kwa kutekeleza programu za jumla nje ya mnyororo.

Chaneli za hali mara nyingi hupunguzwa kwa programu rahisi za zamu, kwani hii inafanya iwe rahisi kusimamia fedha zilizowekwa kwenye mkataba mnyororoni. Pia, kwa idadi ndogo ya pande zinazosasisha hali ya programu nje ya mnyororo kwa vipindi, kuadhibu tabia isiyo ya uaminifu ni rahisi kiasi.

Ufanisi wa programu ya chaneli ya hali pia unategemea muundo wake. Kwa mfano, msanidi programu anaweza kusambaza mkataba wa chaneli ya programu mnyororoni mara moja na kuruhusu wachezaji wengine kutumia tena programu bila kulazimika kwenda mnyororoni. Katika kesi hii, chaneli ya awali ya programu hutumika kama chaneli ya leja inayosaidia chaneli pepe nyingi, kila moja ikiendesha mfano mpya wa mkataba mahiri wa programu nje ya mnyororo.

Kesi inayowezekana ya matumizi ya programu za chaneli ya hali ni michezo rahisi ya wachezaji wawili, ambapo fedha zinasambazwa kulingana na matokeo ya mchezo. Faida hapa ni kwamba wachezaji hawapaswi kuaminiana (hali ya kutohitaji kuamini) na mkataba mnyororoni, sio wachezaji, unadhibiti ugawaji wa fedha na usuluhishi wa migogoro (ugatuzi).

Kesi nyingine zinazowezekana za matumizi ya programu za chaneli ya hali ni pamoja na umiliki wa jina la ENS, leja za NFT, na mengine mengi.

### Uhamishaji wa atomiki {#atomic-transfers}

Chaneli za awali za malipo zilizuiliwa kwa uhamishaji kati ya pande mbili, na kupunguza matumizi yao. Hata hivyo, kuanzishwa kwa chaneli pepe kuliruhusu watu binafsi kupitisha uhamishaji kupitia wapatanishi (yaani, chaneli nyingi za rika-kwa-rika) bila kulazimika kufungua chaneli mpya mnyororoni.

Kwa kawaida huelezewa kama "uhamishaji wa kuruka mara nyingi", malipo yaliyopitishwa ni ya atomiki (yaani, ama sehemu zote za muamala zinafanikiwa au inashindwa kabisa). Uhamishaji wa atomiki hutumia [Mikataba ya Kufunga Muda Iliyosimbwa (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) kuhakikisha malipo yanatolewa tu ikiwa masharti fulani yametimizwa, na hivyo kupunguza hatari ya upande mwingine.

## Hasara za kutumia chaneli za hali {#drawbacks-of-state-channels}

### Mawazo ya upatikanaji {#liveness-assumptions}

Ili kuhakikisha ufanisi, chaneli za hali huweka mipaka ya muda juu ya uwezo wa washiriki wa chaneli kujibu migogoro. Sheria hii inachukulia kwamba wenza watakuwa mtandaoni kila wakati kufuatilia shughuli za chaneli na kupinga changamoto inapobidi.

Kwa kweli, watumiaji wanaweza kwenda nje ya mtandao kwa sababu zilizo nje ya uwezo wao (k.m., muunganisho mbaya wa mtandao, hitilafu ya kimitambo, n.k.). Ikiwa mtumiaji mwaminifu ataenda nje ya mtandao, mwenza mwovu anaweza kutumia hali hiyo kwa kuwasilisha hali za kati za zamani kwenye mkataba wa msuluhishi na kuiba fedha zilizowekwa.

Baadhi ya chaneli hutumia "minara ya ulinzi"—mashirika yanayowajibika kutazama matukio ya migogoro mnyororoni kwa niaba ya wengine na kuchukua hatua zinazohitajika, kama vile kuarifu pande zinazohusika. Hata hivyo, hii inaweza kuongeza gharama za kutumia chaneli ya hali.

### Kutopatikana kwa data {#data-unavailability}

Kama ilivyoelezwa hapo awali, kupinga mgogoro batili kunahitaji kuwasilisha hali ya hivi punde, halali ya chaneli ya hali. Hii ni sheria nyingine inayotegemea dhana—kwamba watumiaji wana ufikiaji wa hali ya hivi punde ya chaneli.

Ingawa kutarajia watumiaji wa chaneli kuhifadhi nakala za hali ya programu nje ya mnyororo ni jambo la busara, data hii inaweza kupotea kutokana na hitilafu au hitilafu ya kimitambo. Ikiwa mtumiaji hana nakala rudufu ya data, anaweza tu kutumaini kwamba upande mwingine haukamilishi ombi batili la kujitoa kwa kutumia mabadiliko ya hali ya zamani waliyo nayo.

Watumiaji wa Ethereum hawapaswi kushughulika na tatizo hili kwani mtandao unatekeleza sheria juu ya upatikanaji wa data. Data ya muamala inahifadhiwa na kuenezwa na nodi zote na inapatikana kwa watumiaji kupakua ikiwa na wakati inahitajika.

### Masuala ya ukwasi {#liquidity-issues}

Ili kuanzisha chaneli ya mnyororo wa vitalu, washiriki wanahitaji kufunga fedha katika mkataba mahiri mnyororoni kwa mzunguko wa maisha wa chaneli. Hii inapunguza ukwasi wa watumiaji wa chaneli na pia inazuia chaneli kwa wale wanaoweza kumudu kuweka fedha zimefungwa kwenye Mtandao Mkuu.

Hata hivyo, chaneli za leja—zinazoendeshwa na mtoa huduma wa nje ya mnyororo (OSP)—zinaweza kupunguza masuala ya ukwasi kwa watumiaji. Wenza wawili waliounganishwa kwenye chaneli ya leja wanaweza kuunda chaneli pepe, ambayo wanaweza kufungua na kukamilisha kabisa nje ya mnyororo, wakati wowote wanaotaka.

Watoa huduma wa nje ya mnyororo wanaweza pia kufungua chaneli na wenza wengi, na kuzifanya kuwa muhimu kwa kupitisha malipo. Bila shaka, watumiaji lazima walipe ada kwa OSP kwa huduma zao, jambo ambalo linaweza kuwa lisilofaa kwa baadhi.

### Mashambulizi ya kusumbua {#griefing-attacks}

Mashambulizi ya kusumbua ni kipengele cha kawaida cha mifumo inayotegemea ushahidi wa udanganyifu. Shambulio la kusumbua halimnufaishi mshambuliaji moja kwa moja lakini husababisha usumbufu (yaani, madhara) kwa mwathiriwa, hivyo jina lake.

Uthibitishaji wa udanganyifu unakabiliwa na mashambulizi ya kusumbua kwa sababu upande mwaminifu lazima ujibu kila mgogoro, hata ule batili, au kuhatarisha kupoteza fedha zao. Mshiriki mwovu anaweza kuamua kuchapisha mara kwa mara mabadiliko ya hali yaliyopitwa na wakati mnyororoni, na kulazimisha upande mwaminifu kujibu kwa hali halali. Gharama ya miamala hiyo mnyororoni inaweza kuongezeka haraka, na kusababisha pande waaminifu kupoteza katika mchakato huo.

### Seti za washiriki zilizotambuliwa awali {#predefined-participant-sets}

Kwa muundo, idadi ya washiriki wanaounda chaneli ya hali inabaki thabiti katika maisha yake yote. Hii ni kwa sababu kusasisha seti ya washiriki kungetatiza utendaji wa chaneli, hasa wakati wa kufadhili chaneli, au kusuluhisha migogoro. Kuongeza au kuondoa washiriki pia kungehitaji shughuli za ziada mnyororoni, ambayo huongeza gharama za ziada kwa watumiaji.

Ingawa hii inafanya chaneli za hali kuwa rahisi kuelewa, inapunguza manufaa ya miundo ya chaneli kwa wasanidi programu. Hii inaelezea kwa kiasi fulani kwa nini chaneli za hali zimeachwa kwa ajili ya suluhisho nyingine za kuongeza viwango, kama vile mikusanyiko.

### Uchakataji sambamba wa miamala {#parallel-transaction-processing}

Washiriki katika chaneli ya hali hutuma masasisho ya hali kwa zamu, ndiyo maana hufanya kazi vizuri zaidi kwa "programu za zamu" (k.m., mchezo wa chess wa wachezaji wawili). Hii huondoa hitaji la kushughulikia masasisho ya hali ya wakati mmoja na kupunguza kazi ambayo mkataba mnyororoni lazima ufanye ili kuadhibu wachapishaji wa masasisho yaliyopitwa na wakati. Hata hivyo, athari ya muundo huu ni kwamba miamala inategemeana, na kuongeza ucheleweshaji na kupunguza uzoefu wa jumla wa mtumiaji.

Baadhi ya chaneli za hali hutatua tatizo hili kwa kutumia muundo wa "full-duplex" unaotenganisha hali ya nje ya mnyororo katika hali mbili za "simplex" za mwelekeo mmoja, kuruhusu masasisho ya hali ya wakati mmoja. Miundo kama hiyo inaboresha uwezo wa upitishaji nje ya mnyororo na kupunguza ucheleweshaji wa miamala.

## Tumia chaneli za hali {#use-state-channels}

Miradi mingi hutoa utekelezaji wa chaneli za hali ambazo unaweza kuunganisha kwenye programu tumizi zilizogatuliwa (dapp) zako:

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Usomaji zaidi {#further-reading}

**Chaneli za hali**

- [Kuelewa Suluhisho za Kuongeza Viwango za Tabaka la 2 la Ethereum: Chaneli za Hali, Plasma, na Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [Chaneli za Hali - maelezo](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Misingi ya Chaneli za Hali](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Chaneli za Hali za Mnyororo wa Vitalu: Hali ya Sanaa](https://ieeexplore.ieee.org/document/9627997)

_Je, unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_