---
title: Njia za Hali
description: Utangulizi wa njia za hali na njia za malipo kama suluhisho la uongezwaji linalotumiwa sasa na jumuiya ya Ethereum.
lang: sw
sidebarDepth: 3
---

Njia za hali huruhusu washiriki kufanya miamala kwa usalama nje ya mnyororo huku wakiweka maingiliano na Mtandao Mkuu wa Ethereum kwa kiwango cha chini kabisa. Rika wa njia wanaweza kufanya idadi yoyote ya miamala ya nje ya mnyororo huku wakiwasilisha miamala miwili tu kwenye mnyororo ili kufungua na kufunga njia. Hii inaruhusu upitishaji wa juu sana wa miamala na husababisha gharama za chini kwa watumiaji.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa kurasa zetu kuhusu [Uongezwaji wa Ethereum](/developers/docs/scaling/) na [safu ya 2](/layer-2/).

## Njia ni nini? {#what-are-channels}

Minyororo ya bloku ya umma, kama vile Ethereum, hukumbana na changamoto za uongezwaji kutokana na usanifu wake uliosambazwa: miamala ya kwenye mnyororo lazima itekelezwe na nodi zote. Nodi zinapaswa kuwa na uwezo wa kushughulikia idadi ya miamala katika bloku kwa kutumia vifaa vya kawaida, na kuweka kikomo kwenye upitishaji wa miamala ili kuweka mtandao uliogatuliwa. Njia za mnyororo wa bloku hutatua tatizo hili kwa kuruhusu watumiaji kuingiliana nje ya mnyororo huku wakitegemea usalama wa mnyororo mkuu kwa suluhu ya mwisho.

Njia ni itifaki rahisi za rika-kwa-rika zinazoruhusu pande mbili kufanya miamala mingi kati yao na kisha kutuma tu matokeo ya mwisho kwenye mnyororo wa bloku. Njia hutumia kriptografia kuonyesha kuwa data ya muhtasari wanayotengeneza ni matokeo ya kweli ya seti halali ya miamala ya kati. Mkataba-erevu wa ["multisig"](/developers/docs/smart-contracts/#multisig) huhakikisha kuwa miamala inatiwa saini na pande sahihi.

Kwa kutumia njia, mabadiliko ya hali hutekelezwa na kuthibitishwa na pande zinazohusika, na hivyo kupunguza hesabu kwenye safu ya utekelezaji ya Ethereum. Hii hupunguza msongamano kwenye Ethereum na pia huongeza kasi ya uchakataji wa miamala kwa watumiaji.

Kila njia inasimamiwa na [mkataba-erevu wa multisig](/developers/docs/smart-contracts/#multisig) inayofanya kazi kwenye Ethereum. Ili kufungua njia, washiriki hupeleka mkataba wa njia kwenye mnyororo na kuweka fedha ndani yake. Pande zote mbili kwa pamoja hutia saini sasisho la hali ili kuanzisha hali ya njia, baada ya hapo wanaweza kufanya miamala haraka na kwa uhuru nje ya mnyororo.

Ili kufunga njia, washiriki huwasilisha hali ya mwisho iliyokubaliwa ya njia kwenye mnyororo. Baadaye, mkataba-erevu hugawanya fedha zilizofungwa kulingana na salio la kila mshiriki katika hali ya mwisho ya njia.

Njia za rika-kwa-rika ni muhimu sana kwa hali ambapo baadhi ya washiriki waliobainishwa mapema wanataka kufanya miamala kwa marudio ya juu bila kupata gharama za ziada zinazoonekana. Njia za mnyororo wa bloku ziko chini ya kategoria mbili: **njia za malipo** na **njia za hali**.

## Njia za malipo {#payment-channels}

Njia ya malipo inaelezewa vyema kama "leja ya pande mbili" inayodumishwa kwa pamoja na watumiaji wawili. Salio la awali la leja ni jumla ya amana zilizofungwa katika mkataba wa kwenye mnyororo wakati wa awamu ya ufunguzi wa njia. Uhamisho wa njia ya malipo unaweza kufanywa papo hapo na bila kuhusisha mnyororo halisi wa bloku, isipokuwa kwa uundaji wa awali wa mara moja kwenye mnyororo na hatimaye kufungwa kwa njia.

Masasisho ya salio la leja (yaani, hali ya njia ya malipo) yanahitaji idhini ya pande zote katika njia. Sasisho la njia, lililotiwa saini na washiriki wote wa njia, linachukuliwa kuwa la mwisho, kama vile muamala kwenye Ethereum.

Njia za malipo zilikuwa miongoni mwa suluhisho za awali za kuongeza ukubwa zilizoundwa ili kupunguza shughuli za gharama kubwa za kwenye mnyororo za maingiliano rahisi ya watumiaji (k.m., uhamisho wa ETH, ubadilishanaji wa atomiki, malipo madogo). Washiriki wa njia wanaweza kufanya idadi isiyo na kikomo ya miamala ya papo hapo, isiyo na ada kati yao mradi tu jumla ya uhamisho wao haizidi tokeni zilizowekwa.

## Njia za hali {#state-channels}

Mbali na kusaidia malipo ya nje ya mnyororo, njia za malipo hazijathibitishwa kuwa muhimu kwa kushughulikia mantiki ya jumla ya mpito wa hali. Njia za hali ziliundwa kutatua tatizo hili na kufanya njia ziwe muhimu kwa ajili ya kuongeza ukubwa wa hesabu za madhumuni ya jumla.

Njia za hali bado zina mambo mengi yanayofanana na njia za malipo. Kwa mfano, watumiaji huingiliana kwa kubadilishana ujumbe uliotiwa saini kwa njia ya kriptografia (miamala), ambao washiriki wengine wa njia lazima pia watie saini. Ikiwa sasisho la hali lililopendekezwa halijatiwa saini na washiriki wote, linachukuliwa kuwa batili.

Hata hivyo, pamoja na kushikilia salio la watumiaji, njia pia hufuatilia hali ya sasa ya ghala la mkataba (yaani, thamani za vigezo vya mkataba).

Hii inafanya iwezekane kutekeleza mkataba-erevu nje ya mnyororo kati ya watumiaji wawili. Katika hali hii, masasisho ya hali ya ndani ya mkataba-erevu yanahitaji tu idhini ya rika walioanzisha njia.

Ingawa hii inatatua tatizo la uongezaji ukubwa lililoelezwa awali, ina athari kwa usalama. Kwenye Ethereum, uhalali wa mabadiliko ya hali unatekelezwa na itifaki ya makubaliano ya mtandao. Hii inafanya iwezekane kupendekeza sasisho batili kwa hali ya mkataba-erevu au kubadilisha utekelezaji wa mkataba-erevu.

Njia za hali hazina hakikisho sawa la usalama. Kwa kiasi fulani, njia ya hali ni toleo dogo la Mtandao Mkuu. Kwa seti ndogo ya washiriki wanaotekeleza sheria, uwezekano wa tabia hasidi (k.m., kupendekeza masasisho ya hali batili) huongezeka. Njia za hali hupata usalama wao kutoka kwa mfumo wa usuluhishi wa mizozo unaotegemea [ushahidi wa ulaghai](/glossary/#fraud-proof).

## Jinsi njia za hali zinavyofanya kazi {#how-state-channels-work}

Kimsingi, shughuli katika njia ya hali ni kipindi cha maingiliano yanayohusisha watumiaji na mfumo wa mnyororo wa bloku. Watumiaji huwasiliana zaidi nje ya mnyororo na huingiliana tu na mnyororo wa bloku uliopo chini ili kufungua njia, kufunga njia, au kusuluhisha mizozo inayoweza kutokea kati ya washiriki.

Sehemu ifuatayo inaelezea mtiririko wa kazi wa msingi wa njia ya hali:

### Kufungua njia {#opening-the-channel}

Kufungua njia kunahitaji washiriki kuweka fedha kwenye mkataba-erevu kwenye Mtandao Mkuu. Amana pia hufanya kazi kama kichupo halisi, kwa hivyo washiriki wanaoshiriki wanaweza kufanya miamala kwa uhuru bila kuhitaji kulipia malipo mara moja. Ni pale tu njia inapokamilishwa kwenye mnyororo ndipo pande zote hulipana na kutoa kile kilichobaki kwenye kichupo chao.

Amana hii pia hutumika kama dhamana ya kuhakikisha tabia ya uaminifu kutoka kwa kila mshiriki. Ikiwa wawekaji amana watapatikana na hatia ya vitendo hasidi wakati wa awamu ya utatuzi wa mizozo, mkataba huchukua amana zao.

Rika wa njia lazima watie saini hali ya awali, ambayo wote wanakubaliana nayo. Hii hutumika kama chanzo cha njia ya hali, baada ya hapo watumiaji wanaweza kuanza kufanya miamala.

### Kutumia njia {#using-the-channel}

Baada ya kuanzisha hali ya njia, rika huingiliana kwa kutia saini miamala na kuituma kwa wengine kwa idhini. Washiriki huanzisha masasisho ya hali na miamala hii na kutia saini masasisho ya hali kutoka kwa wengine. Kila muamala unajumuisha yafuatayo:

- **Nonce**, ambayo hufanya kazi kama kitambulisho cha kipekee kwa miamala na kuzuia mashambulizi ya kurudia. Pia inabainisha mpangilio ambao masasisho ya hali yalitokea (ambayo ni muhimu kwa utatuzi wa mizozo)

- Hali ya zamani ya njia

- Hali mpya ya njia

- Muamala unaosababisha mpito wa hali (k.m., Alice anamtumia Bob ETH 5)

Masasisho ya hali katika njia hayatangazwi kwenye mnyororo kama ilivyo kawaida wakati watumiaji wanapoingiliana kwenye Mtandao Mkuu, jambo ambalo linaendana na lengo la njia za hali la kupunguza alama ya kwenye mnyororo. Muda wote washiriki wanapokubaliana juu ya masasisho ya hali, huwa ya mwisho kama muamala wa Ethereum. Washiriki wanahitaji tu kutegemea makubaliano ya Mtandao Mkuu ikiwa mzozo utatokea.

### Kufunga njia {#closing-the-channel}

Kufunga njia ya hali kunahitaji kuwasilisha hali ya mwisho, iliyokubaliwa ya njia kwenye mkataba-erevu wa kwenye mnyororo. Maelezo yaliyorejelewa katika sasisho la hali ni pamoja na idadi ya hatua za kila mshiriki na orodha ya miamala iliyoidhinishwa.

Baada ya kuthibitisha kuwa sasisho la hali ni halali (yaani, limetiwa saini na pande zote), mkataba-erevu hukamilisha njia na kugawanya fedha zilizofungwa kulingana na matokeo ya njia. Malipo yaliyofanywa nje ya mnyororo yanatumika kwa hali ya Ethereum na kila mshiriki anapokea sehemu yake iliyobaki ya fedha zilizofungwa.

Hali iliyoelezwa hapo juu inawakilisha kile kinachotokea katika kisa cha furaha. Wakati mwingine, watumiaji wanaweza kushindwa kufikia makubaliano na kukamilisha njia (kisa cha huzuni). Yoyote kati ya yafuatayo yanaweza kuwa kweli kuhusu hali hiyo:

- Washiriki wanatoka mtandaoni na kushindwa kupendekeza mabadiliko ya hali

- Washiriki wanakataa kutia saini pamoja masasisho halali ya hali

- Washiriki wanajaribu kukamilisha njia kwa kupendekeza sasisho la hali ya zamani kwenye mkataba wa kwenye mnyororo

- Washiriki wanapendekeza mabadiliko batili ya hali kwa wengine kutia saini

Wakati wowote makubaliano yanapovunjika kati ya washiriki katika njia, chaguo la mwisho ni kutegemea makubaliano ya Mtandao Mkuu ili kutekeleza hali ya mwisho, halali ya njia. Katika kesi hii, kufunga njia ya hali kunahitaji kutatua mizozo kwenye mnyororo.

### Kutatua mizozo {#settling-disputes}

Kwa kawaida, pande zote katika njia hukubaliana kufunga njia mapema na kutia saini pamoja mpito wa hali ya mwisho, ambao wanauwasilisha kwenye mkataba-erevu. Mara tu sasisho linapoidhinishwa kwenye mnyororo, utekelezaji wa mkataba-erevu wa nje ya mnyororo unaisha na washiriki wanatoka kwenye njia na pesa zao.

Hata hivyo, upande mmoja unaweza kuwasilisha ombi kwenye mnyororo ili kumaliza utekelezaji wa mkataba-erevu na kukamilisha njia—bila kusubiri idhini ya mwenzake. Ikiwa hali yoyote ya kuvunja makubaliano iliyoelezwa awali itatokea, upande wowote unaweza kuanzisha mkataba wa kwenye mnyororo ili kufunga njia na kugawanya fedha. Hii hutoa **kutokuaminiana**, kuhakikisha kuwa pande zaaminifu zinaweza kutoa amana zao wakati wowote, bila kujali matendo ya upande mwingine.

Ili kushughulikia utokaji wa njia, mtumiaji lazima awasilishe sasisho la mwisho la hali halali ya mfumo uliotawanywa kwenye mkataba wa kwenye mnyororo. Ikiwa hii itakaguliwa (yaani, ina saini ya pande zote), basi fedha zinagawanywa tena kwa niaba yao.

Kuna, hata hivyo, ucheleweshaji katika kutekeleza maombi ya kutoka kwa mtumiaji mmoja. Ikiwa ombi la kuhitimisha njia liliidhinishwa kwa kauli moja, basi muamala wa kutoka kwenye mnyororo unatekelezwa mara moja.

Ucheleweshaji hutokea katika utokaji wa mtumiaji mmoja kutokana na uwezekano wa vitendo vya ulaghai. Kwa mfano, mshiriki wa njia anaweza kujaribu kukamilisha njia kwenye Ethereum kwa kuwasilisha sasisho la hali la zamani kwenye mnyororo.

Kama hatua ya kukabiliana, njia za hali huruhusu watumiaji waaminifu kupinga masasisho batili ya hali kwa kuwasilisha hali ya hivi karibuni, halali ya njia kwenye mnyororo. Njia za hali zimeundwa kiasi kwamba masasisho mapya zaidi, yaliyokubaliwa ya hali hupita masasisho ya hali ya zamani.

Mara tu rika anapoanzisha mfumo wa utatuzi wa mizozo kwenye mnyororo, upande mwingine unahitajika kujibu ndani ya muda uliopangwa (unaoitwa dirisha la changamoto). Hii inaruhusu watumiaji kupinga muamala wa kutoka, hasa ikiwa upande mwingine unatumia sasisho la zamani.

Vyovyote iwavyo, watumiaji wa njia daima wana hakikisho thabiti la mwisho: ikiwa mpito wa hali walio nao ulitiwa saini na wanachama wote na ndio sasisho la hivi karibuni zaidi, basi lina mwisho sawa na muamala wa kawaida wa kwenye mnyororo. Bado wanapaswa kumpinga mpinzani mwingine kwenye mnyororo, lakini matokeo pekee yanayowezekana ni kukamilisha hali ya mwisho halali, ambayo wanayo.

### Njia za hali huingilianaje na Ethereum? {#how-do-state-channels-interact-with-ethereum}

Ingawa zipo kama itifaki za nje ya mnyororo, njia za hali zina sehemu ya kwenye mnyororo: mkataba-erevu uliowekwa kwenye Ethereum wakati wa kufungua njia. Mkataba huu unadhibiti mali zilizowekwa kwenye njia, unathibitisha masasisho ya hali, na unasuluhisha mizozo kati ya washiriki.

Njia za hali hazichapishi data ya muamala au ahadi za hali kwenye Mtandao Mkuu, tofauti na suluhisho za kuongeza ukubwa za [safu ya 2](/layer-2/). Hata hivyo, zimeunganishwa zaidi na Mtandao Mkuu kuliko, tuseme, [sidechains](/developers/docs/scaling/sidechains/), na kuzifanya kuwa salama kwa kiasi fulani.

Njia za hali zinategemea itifaki kuu ya Ethereum kwa yafuatayo:

#### 1. Uhai {#liveness}

Mkataba wa kwenye mnyororo unaotumika wakati wa kufungua njia unahusika na utendaji wa njia. Ikiwa mkataba unafanya kazi kwenye Ethereum, basi njia inapatikana kila wakati kwa matumizi. Kinyume chake, sidechain inaweza kushindwa kufanya kazi wakati wowote, hata kama Mtandao Mkuu unafanya kazi, na kuweka fedha za mtumiaji hatarini.

#### 2. Usalama {#security}

Kwa kiasi fulani, njia za hali hutegemea Ethereum kutoa usalama na kuwalinda watumiaji dhidi ya rika hasidi. Kama ilivyojadiliwa katika sehemu za baadaye, njia hutumia utaratibu wa ushahidi wa ulaghai unaoruhusu watumiaji kupinga majaribio ya kukamilisha njia na sasisho batili au la zamani.

Katika kesi hii, upande mwaminifu hutoa hali ya hivi karibuni halali ya njia kama ushahidi wa ulaghai kwa mkataba wa kwenye mnyororo kwa ajili ya uthibitisho. Ushahidi wa ulaghai huwezesha pande zisizoaminiana kufanya miamala nje ya mnyororo bila kuhatarisha fedha zao katika mchakato huo.

#### 3. Mwisho {#finality}

Masasisho ya hali yaliyotiwa saini kwa pamoja na watumiaji wa njia yanachukuliwa kuwa mazuri kama miamala ya kwenye mnyororo. Bado, shughuli zote za ndani ya njia hufikia tu mwisho wa kweli wakati njia inapofungwa kwenye Ethereum.

Katika kesi ya matumaini, pande zote mbili zinaweza kushirikiana na kutia saini sasisho la hali ya mwisho na kuwasilisha kwenye mnyororo ili kufunga njia, baada ya hapo fedha zinagawanywa kulingana na hali ya mwisho ya njia. Katika kisa cha kukata tamaa, ambapo mtu anajaribu kudanganya kwa kuchapisha sasisho la hali lisilo sahihi kwenye mnyororo, muamala wao haukamilishwi hadi dirisha la changamoto litakapopita.

## Njia za hali halisi {#virtual-state-channels}

Utekelezaji wa kimsingi wa njia ya hali itakuwa ni kupeleka mkataba mpya wakati watumiaji wawili wanataka kutekeleza mfumo uliotawanywa nje ya mnyororo. Hii sio tu haiwezekani, lakini pia inabatilisha ufanisi wa gharama wa njia za hali (gharama za muamala wa kwenye mnyororo zinaweza kuongezeka haraka).

Ili kutatua tatizo hili, "njia halisi" ziliundwa. Tofauti na njia za kawaida zinazohitaji miamala ya kwenye mnyororo ili kufungua na kumaliza, njia halisi inaweza kufunguliwa, kutekelezwa, na kukamilishwa bila kuingiliana na mnyororo mkuu. Inawezekana hata kutatua mizozo nje ya mnyororo kwa kutumia njia hii.

Mfumo huu unategemea kuwepo kwa kinachoitwa "njia za leja", ambazo zimewekewa fedha kwenye mnyororo. Njia halisi kati ya pande mbili zinaweza kujengwa juu ya njia ya leja iliyopo, huku mmiliki (wamiliki) wa njia ya leja wakitumika kama mpatanishi.

Watumiaji katika kila njia halisi huingiliana kupitia mfano mpya wa mkataba, huku njia ya leja ikiwa na uwezo wa kusaidia mifano mingi ya mkataba. Hali ya njia ya leja pia ina zaidi ya hali moja ya ghala la mkataba, na kuruhusu utekelezaji sambamba wa mifumo iliyotawanywa tofauti nje ya mnyororo kati ya watumiaji tofauti.

Kama tu njia za kawaida, watumiaji hubadilishana masasisho ya hali ili kuendeleza mashine ya hali. Isipokuwa mzozo utatokea, mpatanishi anahitaji tu kuwasiliana naye wakati wa kufungua au kumaliza njia.

### Njia halisi za malipo {#virtual-payment-channels}

Njia halisi za malipo hufanya kazi kwa wazo sawa na njia halisi za hali: washiriki waliounganishwa kwenye mtandao mmoja wanaweza kupitisha ujumbe bila kuhitaji kufungua njia mpya kwenye mnyororo. Katika njia halisi za malipo, uhamisho wa thamani huelekezwa kupitia mpatanishi mmoja au zaidi, na hakikisho kwamba ni mpokeaji aliyekusudiwa pekee anayeweza kupokea fedha zilizohamishwa.

## Matumizi ya njia za hali {#applications-of-state-channels}

### Malipo {#payments}

Njia za awali za mnyororo wa bloku zilikuwa itifaki rahisi zilizoruhusu washiriki wawili kufanya uhamisho wa haraka, wa ada ya chini nje ya mnyororo bila kulipa ada za juu za muamala kwenye Mtandao Mkuu. Leo, njia za malipo bado ni muhimu kwa mifumo iliyotawanywa iliyoundwa kwa ajili ya kubadilishana na kuweka ether na tokeni.

Malipo yanayotegemea njia yana faida zifuatazo:

1. **Upitishaji**: Kiasi cha miamala ya nje ya mnyororo kwa kila njia hakihusiani na upitishaji wa Ethereum, ambao huathiriwa na mambo mbalimbali, hasa ukubwa wa bloku na muda wa bloku. Kwa kutekeleza miamala nje ya mnyororo, njia za mnyororo wa bloku zinaweza kufikia upitishaji wa juu zaidi.

2. **Faragha**: Kwa sababu njia zipo nje ya mnyororo, maelezo ya maingiliano kati ya washiriki hayarekodiwi kwenye mnyororo wa bloku wa umma wa Ethereum. Watumiaji wa njia wanahitaji tu kuingiliana kwenye mnyororo wakati wa kuweka fedha na kufunga njia au kutatua mizozo. Hivyo, njia ni muhimu kwa watu wanaotaka miamala ya faragha zaidi.

3. **Ucheleweshaji**: Miamala ya nje ya mnyororo inayofanywa kati ya washiriki wa njia inaweza kusuluhishwa papo hapo, ikiwa pande zote mbili zitashirikiana, na hivyo kupunguza ucheleweshaji. Kinyume chake, kutuma muamala kwenye Mtandao Mkuu kunahitaji kusubiri nodi zichakate muamala, zitoe bloku mpya na muamala, na kufikia makubaliano. Watumiaji wanaweza pia kuhitaji kusubiri uthibitisho zaidi wa bloku kabla ya kuzingatia muamala kuwa wa mwisho.

4. **Gharama**: Njia za hali ni muhimu sana katika hali ambapo seti ya washiriki watabadilishana masasisho mengi ya hali kwa kipindi kirefu. Gharama pekee zinazotozwa ni kufungua na kufunga mkataba-erevu wa njia ya hali; kila mabadiliko ya hali kati ya kufungua na kufunga njia yatakuwa ya bei nafuu kuliko ya mwisho kwani gharama ya suluhu inasambazwa ipasavyo.

Kutekeleza njia za hali kwenye suluhisho za safu ya 2, kama vile [unda-mpya](/developers/docs/scaling/#rollups), kunaweza kuzifanya zivutie zaidi kwa malipo. Ingawa njia hutoa malipo ya bei nafuu, gharama za kuanzisha mkataba wa kwenye mnyororo kwenye Mtandao Mkuu wakati wa awamu ya ufunguzi zinaweza kuwa ghali—hasa wakati ada za gesi zinapopanda. Unda-mpya zinazotegemea Ethereum hutoa [ada za chini za muamala](https://l2fees.info/) na zinaweza kupunguza gharama za ziada kwa washiriki wa njia kwa kupunguza ada za usanidi.

### Miamala midogo {#microtransactions}

Miamala midogo ni malipo ya thamani ya chini (k.m., chini ya sehemu ya dola) ambayo biashara haziwezi kushughulikia bila kupata hasara. Vyombo hivi lazima vilipe watoa huduma za malipo, jambo ambalo hawawezi kufanya ikiwa faida kwenye malipo ya wateja ni ndogo sana kupata faida.

Njia za malipo hutatua tatizo hili kwa kupunguza gharama za ziada zinazohusiana na miamala midogo. Kwa mfano, Mtoa Huduma za Mtandao (ISP) anaweza kufungua njia ya malipo na mteja, na kuwaruhusu kutiririsha malipo madogo kila wanapotumia huduma.

Zaidi ya gharama ya kufungua na kufunga njia, washiriki hawapati gharama zaidi kwenye miamala midogo (hakuna ada za gesi). Hii ni hali ya kushinda-kushinda kwani wateja wana unyumbufu zaidi katika jinsi wanavyolipia huduma na biashara hazipotezi miamala midogo yenye faida.

### Mifumo iliyotawanywa {#decentralized-applications}

Kama njia za malipo, njia za hali zinaweza kufanya malipo ya masharti kulingana na hali za mwisho za mashine ya hali. Njia za hali zinaweza pia kusaidia mantiki ya mpito ya hali holela, na kuzifanya kuwa muhimu kwa kutekeleza programu za jumla nje ya mnyororo.

Njia za hali mara nyingi huwekewa mipaka kwa programu rahisi za zamu, kwani hii inafanya iwe rahisi kudhibiti fedha zilizowekwa kwenye mkataba wa kwenye mnyororo. Pia, kwa idadi ndogo ya pande zinazosasisha hali ya mfumo uliotawanywa wa nje ya mnyororo kwa vipindi, kuadhibu tabia isiyo ya uaminifu ni rahisi kiasi.

Ufanisi wa mfumo uliotawanywa wa njia ya hali pia unategemea muundo wake. Kwa mfano, msanidi programu anaweza kupeleka mkataba wa njia ya programu kwenye mnyororo mara moja na kuruhusu wachezaji wengine kutumia tena programu bila kulazimika kwenda kwenye mnyororo. Katika kesi hii, njia ya awali ya programu hutumika kama njia ya leja inayosaidia njia nyingi halisi, kila moja ikiendesha mfano mpya wa mkataba-erevu wa programu nje ya mnyororo.

Kesi inayowezekana ya matumizi ya mifumo iliyotawanywa ya njia za hali ni michezo rahisi ya wachezaji wawili, ambapo fedha zinagawanywa kulingana na matokeo ya mchezo. Faida hapa ni kwamba wachezaji hawana haja ya kuaminiana (kutokuaminiana) na mkataba wa kwenye mnyororo, sio wachezaji, ndio unaodhibiti ugawaji wa fedha na utatuzi wa mizozo (ugatuaji).

Kesi zingine zinazowezekana za matumizi ya programu za njia za hali ni pamoja na umiliki wa jina la ENS, leja za NFT, na mengi zaidi.

### Uhamisho wa atomiki {#atomic-transfers}

Njia za malipo za awali ziliwekewa mipaka kwa uhamisho kati ya pande mbili, na hivyo kupunguza utumiaji wao. Hata hivyo, kuanzishwa kwa njia halisi kuliruhusu watu binafsi kuelekeza uhamisho kupitia wapatanishi (yaani, njia nyingi za p2p) bila kulazimika kufungua njia mpya kwenye mnyororo.

Yanayoelezewa kwa kawaida kama "uhamisho wa hatua nyingi", malipo yaliyoelekezwa ni ya atomiki (yaani, sehemu zote za muamala hufaulu au inashindwa kabisa). Uhamisho wa atomiki hutumia [Mikataba ya Kufunga Muda kwa Hashi (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) kuhakikisha malipo yanatolewa tu ikiwa masharti fulani yametimizwa, na hivyo kupunguza hatari ya upande mwingine.

## Hasara za kutumia njia za hali {#drawbacks-of-state-channels}

### Dhana za uhai {#liveness-assumptions}

Ili kuhakikisha ufanisi, njia za hali huweka mipaka ya muda juu ya uwezo wa washiriki wa njia kujibu mizozo. Sheria hii inadhani kuwa rika watakuwa mtandaoni kila wakati ili kufuatilia shughuli za njia na kupinga changamoto inapobidi.

Kwa kweli, watumiaji wanaweza kutoka mtandaoni kwa sababu zisizo za hiari yao (k.m., muunganisho duni wa intaneti, hitilafu ya kiufundi, n.k.). Ikiwa mtumiaji mwaminifu atatoka mtandaoni, rika hasidi anaweza kutumia hali hiyo kwa kuwasilisha hali za zamani za kati kwenye mkataba wa msuluhishi na kuiba fedha zilizowekwa.

Baadhi ya njia hutumia "walinzi wa mnara"—vyombo vinavyohusika na kutazama matukio ya mizozo ya kwenye mnyororo kwa niaba ya wengine na kuchukua hatua muhimu, kama vile kuwatahadharisha wahusika. Hata hivyo, hii inaweza kuongeza gharama za kutumia njia ya hali.

### Kutopatikana kwa data {#data-unavailability}

Kama ilivyoelezwa awali, kupinga mzozo batili kunahitaji kuwasilisha hali ya hivi karibuni, halali ya njia ya hali. Hii ni sheria nyingine inayotegemea dhana—kwamba watumiaji wana ufikiaji wa hali ya hivi karibuni ya njia.

Ingawa kutarajia watumiaji wa njia kuhifadhi nakala za hali ya mfumo uliotawanywa wa nje ya mnyororo ni jambo la busara, data hii inaweza kupotea kutokana na kosa au hitilafu ya kiufundi. Ikiwa mtumiaji hana nakala ya data, anaweza tu kutumaini kwamba upande mwingine hautakamilisha ombi batili la kutoka kwa kutumia mabadiliko ya hali ya zamani yaliyo mikononi mwake.

Watumiaji wa Ethereum hawana haja ya kukabiliana na tatizo hili kwani mtandao unatekeleza sheria za upatikanaji wa data. Data ya muamala huhifadhiwa na kusambazwa na nodi zote na inapatikana kwa watumiaji kupakua ikiwa na inapobidi.

### Masuala ya ukwasi {#liquidity-issues}

Ili kuanzisha njia ya mnyororo wa bloku, washiriki wanahitaji kufunga fedha katika mkataba-erevu wa kwenye mnyororo kwa ajili ya mzunguko wa maisha wa njia. Hii inapunguza ukwasi wa watumiaji wa njia na pia inazuia njia kwa wale tu wanaoweza kumudu kuweka fedha zilizofungwa kwenye Mtandao Mkuu.

Hata hivyo, njia za leja—zinazoendeshwa na mtoa huduma wa nje ya mnyororo (OSP)—zinaweza kupunguza masuala ya ukwasi kwa watumiaji. Rika wawili waliounganishwa na njia ya leja wanaweza kuunda njia halisi, ambayo wanaweza kuifungua na kuikamilisha kabisa nje ya mnyororo, wakati wowote wanapotaka.

Watoa huduma wa nje ya mnyororo wanaweza pia kufungua njia na rika wengi, na kuwafanya kuwa muhimu kwa kuelekeza malipo. Bila shaka, watumiaji lazima walipe ada kwa OSP kwa huduma zao, jambo ambalo linaweza kuwa lisilopendeza kwa wengine.

### Mashambulizi ya kukera {#griefing-attacks}

Mashambulizi ya kukera ni kipengele cha kawaida cha mifumo inayotegemea ushahidi wa ulaghai. Shambulio la kukera halimnufaishi moja kwa moja mshambuliaji lakini linasababisha kero (yaani, madhara) kwa mwathiriwa, ndiyo maana ya jina hilo.

Uthibitishaji wa ulaghai huathiriwa na mashambulizi ya kukera kwa sababu upande mwaminifu lazima ujibu kila mzozo, hata yale batili, au kuhatarisha kupoteza fedha zao. Mshiriki hasidi anaweza kuamua kurudia kuchapisha mabadiliko ya hali ya zamani kwenye mnyororo, na kumlazimisha upande mwaminifu kujibu na hali halali. Gharama za miamala hiyo ya kwenye mnyororo inaweza kuongezeka haraka, na kusababisha pande zaaminifu kupoteza katika mchakato huo.

### Seti za washiriki zilizobainishwa mapema {#predefined-participant-sets}

Kwa muundo, idadi ya washiriki wanaounda njia ya hali hubaki sawa katika maisha yake yote. Hii ni kwa sababu kusasisha seti ya washiriki kungechanganya utendaji wa njia, hasa wakati wa kuweka fedha kwenye njia, au kutatua mizozo. Kuongeza au kuondoa washiriki pia kungehitaji shughuli za ziada kwenye mnyororo, jambo ambalo huongeza gharama za ziada kwa watumiaji.

Ingawa hii inafanya njia za hali kuwa rahisi kufikiria, inapunguza manufaa ya miundo ya njia kwa wasanidi programu. Hii inaelezea kwa kiasi kwa nini njia za hali zimeachwa na kupendelewa suluhisho zingine za kuongeza ukubwa, kama vile unda-mpya.

### Uchakataji wa miamala sambamba {#parallel-transaction-processing}

Washiriki katika njia ya hali hutuma masasisho ya hali kwa zamu, ndiyo maana zinafanya kazi vizuri zaidi kwa "mifumo iliyotawanywa ya zamu" (k.m., mchezo wa chess wa wachezaji wawili). Hii huondoa hitaji la kushughulikia masasisho ya hali ya wakati mmoja na inapunguza kazi ambayo mkataba wa kwenye mnyororo unapaswa kufanya ili kuwaadhibu wachapishaji wa sasisho la zamani. Hata hivyo, athari ya upande ya muundo huu ni kwamba miamala inategemeana, na kuongeza ucheleweshaji na kupunguza uzoefu wa jumla wa mtumiaji.

Baadhi ya njia za hali hutatua tatizo hili kwa kutumia muundo wa "duplex kamili" unaogawanya hali ya nje ya mnyororo katika hali mbili za "simplex" za mwelekeo mmoja, na kuruhusu masasisho ya hali ya wakati mmoja. Miundo kama hiyo inaboresha upitishaji wa nje ya mnyororo na inapunguza ucheleweshaji wa miamala.

## Tumia njia za hali {#use-state-channels}

Miradi mingi hutoa utekelezaji wa njia za hali ambazo unaweza kuunganisha kwenye mifumo yako mtawanyo ya kimamlaka:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Masomo zaidi {#further-reading}

**Ugavi na Utoaji wa Eth {#eth-supply-and-issuance}**

- [Kuelewa Masuluhisho ya Uongezwaji ya Safu ya 2 ya Ethereum: Njia za Hali, Plasma, na Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [Njia za Hali - maelezo](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Misingi ya Njia za Hali](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Njia za Hali za Mnyororo wa Bloku: Hali ya Sanaa](https://ieeexplore.ieee.org/document/9627997)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
