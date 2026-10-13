---
title: "Mkusanyiko wa faragha wa Ethereum: usomaji wa kibinafsi, mtandao, na uvujaji uliofichwa"
description: "Andy Guzman anaeleza jinsi data fafanuzi inavyovuja wakati mikoba inasoma data kutoka kwenye Ethereum, na jinsi usomaji wa kibinafsi wa ramani ya faragha na utafiti wa mtandao unavyoziba uvujaji wa safu ya ufikiaji."
lang: sw
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Mkusanyiko wa Faragha wa Ethereum"
---

Mazungumzo na **Andy Guzman**, kiongozi wa timu ya Wasimamizi wa Faragha wa Ethereum (PSE) katika Taasisi ya Ethereum, kwenye EthBoulder 2026. Anafichua upofu mkubwa katika faragha ya Ethereum: hata watumiaji ambao hawajawahi kusaini muamala huvujisha data za kina za kitabia kupitia maswali ya kila siku. Anatambulisha mkusanyiko wa faragha wa Ethereum, unaojumuisha usomaji wa kibinafsi (PIR), faragha ya trafiki (uelekezaji wa kitunguu na mixnets), na kazi ya utendaji kama vile miti ya jozi iliyounganishwa na hali inayoweza kuthibitishwa na ZK.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=tvAqDJXCBaA) iliyochapishwa na EthBoulder. Imehaririwa kidogo ili isomeke kwa urahisi.*

### Barua ya kubuni ya mtoa huduma wa RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Hamujaambo nyote, mimi ni Andy, na nilitaka kutambulisha mada ambayo haijadiliwi mara kwa mara katika mfumo wa ikolojia wa Ethereum na ni muhimu sana. Kama ambavyo huenda mmeona kutoka kwenye slaidi na utangulizi, inahusiana na faragha, na jinsi tunavyokosa ulinzi wa kutosha bila hata kutambua.

Hebu nianze na barua ambayo mtu alikuandikia.

"Mpendwa mtumiaji wa thamani, asante kwa maswali 847 uliyofanya mwezi huu. Tulifurahia sana kukufahamu. Tunajua kwamba unashikilia ETH kwenye mikoba mitatu tofauti. Tunajua kwamba uliangalia bei ya ETH mara 94 Jumanne iliyopita. Ilikuwa siku ngumu sana kwa kila mtu, kwa hivyo hatukuhukumu. Pia uliangalia bei ya BTC, jambo ambalo linavutia, kwa sababu hushikilii Bitcoin yoyote. Je, unafikiria kuwekeza kwenye vitu tofauti? Hilo litabaki kati yetu, na bila shaka washirika wetu wa uchanganuzi. Pia unafuatilia kwa karibu mabwawa mawili ya Uniswap, na uliangalia kiwango chako cha afya cha Aave mara 14 wiki iliyopita. Huenda ukataka kupumzika, au kuongeza tu dhamana. Siku ya Alhamisi uliiangalia mara tatu ndani ya dakika 12, na ulikuwa na wasiwasi sana. Uliangalia majina manne tofauti ya ENS, kwa hivyo ama unaanzisha mradi mpya au una tatizo la utambulisho. Na huwa unakaa kimya kati ya saa 5 usiku na saa 1 asubuhi saa za Mountain."

### Jinsi unavyovujisha data bila kusaini miamala (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Kwa hivyo tuna uhakika kabisa kwamba unaishi Boulder, au karibu. Hujawahi kusaini muamala hata mmoja kupitia kwetu. Hukuhitaji kufanya hivyo. Udadisi wako ulituambia kila kitu. Kwa upendo, mtoa huduma wako wa RPC."

Bila shaka hii ni barua ya kubuni, lakini inaelezea jambo ambalo kwa kweli tunavujisha kila siku. Hata kama hufanyi muamala hata mmoja au kitendo chochote mnyororoni, kimsingi unaiambia kila kitu kampuni yoyote ya uchanganuzi ambayo ingependa kupata data hiyo na tabia zako.

### Uandishi wa kibinafsi dhidi ya usomaji wa kibinafsi (2:07) {#private-writes-vs-private-reads-207}

Kwa hivyo ni nini hasa kinaendelea sasa hivi katika ulimwengu wa faragha? Naona kwamba tunaweka msisitizo mkubwa kwenye faragha mnyororoni, au kile ambacho sisi katika PSE tunakiita uandishi wa kibinafsi: vitendo vyote unavyofanya mnyororoni. Na inaleta maana, sivyo? Vitendo hivyo hurekodiwa milele na kusambazwa kote ulimwenguni, kwa hivyo inaleta maana kutovujisha anwani yako kwa kitendo mahususi. Pia tunaweka msisitizo mkubwa kwenye zana: vyanzo vya data, uthibitisho, DSLs, na lugha tunazoweza kutumia kuwapa wasanidi programu zana zaidi za kueleza na kujenga programu imara zaidi zenye faragha zaidi mnyororoni.

Lakini nataka kutoa hoja katika wasilisho hili kwamba hatuweki umakini na juhudi za kutosha katika nyanja hizi zingine: kile tunachokiita usomaji wa kibinafsi, kwa sababu kila unapouliza data kutoka kwenye mnyororo wa vitalu unavujisha taarifa nyingi, na mtandao wa kibinafsi, kwa sababu hata kabla ya chochote kufika mnyororoni, trafiki yako yote inavuja.

Ili kuingia kiufundi zaidi kidogo: miito yote ya RPC, kama vile eth_getBalance, eth_call, na eth_getLogs, ni maombi katika maandishi wazi ambayo huenda kwa watoa huduma wa RPC na kuhusishwa na IP yako.

### Kwa nini shughuli nyingi huongeza hatari ya kuwekwa kwenye wasifu (3:20) {#why-more-activity-increases-profiling-risk-320}

Kwa taarifa hizi, inakuwa rahisi sana kuweka watu kwenye wasifu, kuwagawa, na kuunda mifumo ya tabia. Na hii inaweza kutumika dhidi yako. Kama unavyoweza kufikiria, taarifa ni nguvu, na kadiri watu wanavyokuwa na taarifa nyingi kukuhusu na tabia yako, ndivyo wanavyokuwa na nguvu zaidi juu yako.

Watu wengi hawatambui hili. Watu wengi watasema, sawa, vizuri, haijalishi sana kwa sababu hii sio taarifa muhimu. Au wanaweza kufikiri: kadiri kunavyokuwa na shughuli nyingi, ndivyo nitakavyolindwa zaidi. Hili si kweli kabisa, na ni kinyume na matarajio. Kwa vitendo mnyororoni, popote palipo na seti ya kutojulikana, inasaidia: kadiri watumiaji wanavyokuwa wengi, ndivyo faragha inavyokuwa kubwa, na inakuwa rahisi zaidi kujichanganya. Lakini kwa usomaji ni kinyume chake, kwa sababu maswali hayawezi kubadilishana. Kadiri unavyosambaza shughuli nyingi, kadiri unavyochukua hatua nyingi, ndivyo uso wa uhusiano unavyokuwa mpana na inakuwa rahisi zaidi kujenga wasifu wa vitendo vyako.

Kwa hivyo kila kunapokuwa na wazimu wa fedha zilizogatuliwa (DeFi) au wazimu wa NFT, watu wanakuwa wazembe zaidi. Usalama wa Uendeshaji (OpSec), bila shaka, hutupwa nje ya dirisha, na inakuwa rahisi sana kuwafichua watu kulingana na mifumo ya shughuli ambayo watu wengi huingia.

### Kutambulisha mkusanyiko wa faragha wa Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Nataka kuanza na mandhari: tunapaswa kushambulia wapi, nini kinahitajika, na nani anafanya nini. Mazungumzo haya yataingia kwenye mada za kiufundi zaidi na baadhi ya dhana za kiwango cha juu, ili kila mtu aweze kupata thamani fulani kutoka kwayo.

Nataka kuwasilisha kile ninachokiita mkusanyiko wa faragha wa Ethereum, au safu za mkusanyiko wa faragha wa Ethereum, na nadhani hii ni muhimu kufikiria. Ikiwa kweli tunataka faragha, hatuhitaji tu faragha mnyororoni; tunahitaji pia faragha katika safu hizi zote za mkusanyiko, sawa na mzunguko wa maisha wa muamala, au muundo wa OSI na safu zake za teknolojia. Ningetoa hoja kwamba tunaweza kuunda kiwango, au aina fulani ya utambuzi wa mfumo mzima wa ikolojia, kwamba safu hizi zipo. Labda hii sio fomu ya mwisho, lakini nadhani inaweza kusemwa kuwa tayari ni muhimu.

### Safu kwa safu: unapovujisha (5:41) {#layer-by-layer-where-you-leak-541}

Juu kabisa ni safu ya programu tumizi. Kila unapotembelea tovuti, bila shaka, unavujisha kile unachotembelea, na watu wanaweza kuanza kuweka wasifu: seti ya kutojulikana, vitambulisho, kuunganisha IP yako na kile unachotembelea, hata kama hufanyi chochote.

Inayofuata ni safu ya mkoba. Kila unapochukua hatua, huvujishi tu taarifa kwenye safu ya programu tumizi bali pia kwenye lango. Mikoba sasa hivi ni tata sana, inaunganishwa na mifumo na huduma nyingine nyingi, na unavujisha taarifa nyingi zaidi kuliko unavyofikiria. Hata kama utafungua tu mkoba wako na ukauliza bei ya ETH au salio lako, unavujisha kila kitu.

Kisha una lango: RPCs, proksi, na wapitishaji. Unavujisha data fafanuzi zaidi tena. Kisha kile ambacho watu wangefikiria kama kipengele cha mnyororoni, ambacho ni wakati wowote mambo yanapoulizwa kwenye EVM, kama vile hali au mifumo ya utekelezaji. Kwa mfano, kuuliza salio la kitu, au hali ya mkataba mahiri. Na hatimaye mwafaka, ambapo wathibitishaji wote wapo. Kulingana na kama unaandika mnyororoni au unasoma mnyororoni, unaweza pia kugusa mempool.

Na kuna wima nyingine, ambayo ndiyo tunayoiita mtandao, ambayo ni ya kuvuka, ikikata safu hizi zote. Kwa mfano: sasa hivi unatembelea tovuti na seva inajua IP yako. Lakini vipi ikiwa ungetembelea tovuti hiyo kupitia Tor au mtandao mwingine usiojulikana? Ungejua anwani ya IP ya tovuti, lakini hawangejua yako. Na vipi ikiwa tovuti hiyo inapangishwa katika nchi ambayo hivi karibuni ilianza kudhibiti mambo yote ya kripto? Tovuti hiyo na kampuni pia wangetaka kuficha IP yao, na wangetaka kuficha kikoa chao nyuma ya kikoa cha kitunguu.

Hizo ndizo aina za mambo yanayoleta maana: tunahitaji kwenda safu kwa safu, kuimarisha kila kitu, kuchambua kupitia lenzi ya mshambuliaji msumbufu sana anayetaka kudhibiti kila kitu. Hata kama hatutafanya hivyo, na tukasema tunaishi katika hali nzuri ya kutosha, taarifa hizi zinarekodiwa sasa na zitapangishwa milele na watu wengi ambao hata huwajui, makampuni ambayo yanaanza kuuza data yako. Hatimaye, katika miaka mitano, mtu anaweza kupiga marufuku kripto na kusema, "mtu yeyote aliyetumia Uniswap katika miaka mitano iliyopita, mimi ni Mamlaka ya Mapato, nitaanza kubisha hodi na kukuweka jela," au chochote kile. Matukio haya ya kutisha yanatokea katika nchi tofauti duniani kote sasa hivi.

### Usomaji wa kibinafsi na mtandao wa kibinafsi (8:24) {#private-reads-and-private-networking-824}

Sawa, kwa hivyo tuna mkusanyiko wa faragha wa Ethereum. Tunapaswa kuzingatia wapi? Katika wasilisho hili nataka kuzungumzia maeneo haya mawili. Usomaji wa kibinafsi: kila unapofikia hali kutoka mnyororoni, unagusa safu hizi zote, kuanzia kwenye programu tumizi, tuseme nataka kuuliza bei ya ETH, hadi kwenye mkoba, kwenye lango, kwenye nodi inayoendesha Ethereum na EVM, na kisha kurudi. Kimsingi mtoa huduma wa RPC au kiunda faharisi. Na mtandao wa kibinafsi, ambayo ni vitendo vyote vinavyotokea kwenye safu ya mtandao. Hiki ndicho tunachotaka kukiimarisha.

### Nguzo tatu: data, trafiki, utendaji (9:05) {#three-pillars-data-traffic-performance-905}

Kuna nguzo tatu ambazo nadhani ni muhimu kwetu kufanikisha hili. Tunataka kuficha na kufanya data yenyewe iwe ya kibinafsi. Tunataka kuficha na kufanya trafiki yenyewe iwe ya kibinafsi. Na kisha tunataka kuifanya iwe na utendaji mzuri, muhimu, ya vitendo, na ya bei nafuu. Hii inafupisha taarifa nyingi kuhusu mambo yanayoendelea katika mfumo wa ikolojia, lakini nadhani ni muhimu kuchora picha ya hali ilivyo na kutambua pointi za kujiinua ambapo tunaweza kuharakisha.

### Kuficha data: kutoka proksi hadi PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Kwa hivyo, data. Ni nini tunachotaka kulinda? Tunataka kuficha taarifa gani unazouliza seva hizi, na tunataka kuficha mifumo ya jinsi unavyofikia data hii. Sio tu maudhui bali pia mifumo.

Kuna viwango tofauti vya mbinu. Ya kwanza ni hakuna: unavujisha tu kila kitu. Kila unapounganisha mkoba wako, unafunga anwani yako ya IP kwenye mkataba unaouliza, kwa eth_getBalance mahususi kwa anwani mahususi, na ndivyo hivyo. Hata kama unatumia itifaki ya faragha, tuseme Tornado Cash, na unataka kuuliza hali ya mti wa Merkle, itabidi upakue mti mzima, jambo ambalo halina utendaji mzuri sana, au uvujishe ni njia na majani yapi unayouliza, na kupunguza seti ya kutojulikana kwako. Kwa hivyo hata kutumia itifaki imara ya faragha kama Tornado Cash haitoshi ikiwa hulindi mtandao wako na mifumo yako ya ufikiaji wa data.

Kiwango kinachofuata ni aina fulani ya proksi au wapitishaji: mashine nyingi ambazo hazijui ombi linatoka wapi na hatimaye hurejesha data. Hiyo sio ya vitendo sana, na sio bila hitaji la uaminifu sana.

Kisha una TEEs, ambazo ni hatua mbele, na hapa ndipo baadhi ya timu na makampuni yanatoa huduma. Nadhani hii ni hatua nzuri mbele lakini haitoshi, tena kwa sababu gharama ya kushambulia na kuharibu TEEs inashuka sana. Kwa baadhi ya matukio muhimu ya matumizi hii haitoshi; kwa mengi ya kila siku inaweza kuwa.

Kuna timu nyingine zinazofanya kazi kwenye OMAPs, mifumo ya ufikiaji wa ramani isiyotambulika, na ORAM, RAM Isiyotambulika. Hizi ni mbinu zinazofanana ambazo zinajaribu kuficha ni sehemu gani za seti ya data unazojaribu kufikia. Badala ya kusema "Nataka salio kutoka kwenye anwani hii ya ETH," unafikia vitu tofauti kwa nasibu, kwa hivyo seva haijui.

Na ningetoa hoja kwamba mwisho wa haya utakuwa PIR, urejeshaji wa taarifa za kibinafsi, ambayo inamaanisha seva haijui unachouliza na haijifunzi chochote kukihusu.

### Urejeshaji wa Taarifa za Kibinafsi umefafanuliwa (12:03) {#private-information-retrieval-explained-1203}

Urejeshaji wa taarifa za kibinafsi ni mbinu yenye nguvu sana katika kriptografia, na itatumika sana. Kuna aina mbili: faharisi ya PIR, ambayo unaweza kutumia ikiwa una data iliyopangwa chini ya faharisi, na neno kuu la PIR, ambapo, kama jina linavyosema, unauliza kwa neno kuu. Ni vigumu sana kuwa na mpango mmoja unaofanya kazi kwa kila kitu.

Hali ya Ethereum ni kubwa na inatofautiana sana. Kumbukumbu, nilikuwa najifunza jana, ni za kuongezwa tu, lakini muundo wa akaunti ni tofauti: baadhi ya hali husasishwa mara kwa mara, baadhi hazisasishwi. Kulingana na jinsi unavyoikata na kuigawa, unaweza kuwa na megabaiti, gigabaiti, au terabaiti za data, zenye mifumo tofauti sana ya ufikiaji.

### Usanifu wa PIR wa mawakala wengi (12:48) {#a-multi-agent-pir-architecture-1248}

Pendekezo tunalofanyia kazi ndani ya PSE, na hapa nitazungumza kidhana na kisha kuhusu miradi mahususi tunayofanya katika PSE na mambo mengine ninayoyaona katika mfumo wa ikolojia, ni usanifu wa mawakala wengi. Hakuna mpango mmoja ulio kamili kwa hali yote ya Ethereum. Lakini ikiwa tunaweza kukata hali ya Ethereum kwa aina au kwa mfumo wa ufikiaji, tunaweza kupata mipango mizuri sana kwa kila mmoja wao.

Vipi ikiwa tuna huduma inayoendesha usanifu huu wa mawakala wengi, na kulingana na aina ya maswali na mahali yanapoweza kupatikana katika hali ya Ethereum, inaendesha mpango mmoja au mwingine? Hiyo tayari inatufikisha karibu sana na kitu kinachowezekana, chenye uwezo wa uzalishaji, na kinachoweza kutolewa kwa mfumo wa ikolojia. Hii itahitaji kitu kama API iliyounganishwa, ili mikoba, viunda faharisi, watumiaji, na wasanidi wa programu tumizi iliyogatuliwa (dapp) wasihitaji kuwa na wasiwasi kuhusu mpango gani unatumiwa na jinsi ya kuuita. Unakuwa tu na API ya kawaida, na mtu mwingine anakuwa na wasiwasi kuhusu maelezo ya utekelezaji.

Tayari tunafanya hivi na kutekeleza mipango miwili tofauti. Tutafungua ruzuku, na tunajaribu kuratibu watu zaidi katika mfumo wa ikolojia ili kukabiliana na baadhi ya haya na kuona ni yapi yanahitajika zaidi kwa Ethereum.

Hapa kuna nambari chache kuhusu mipango tofauti ya PIR: viwango vya upitishaji, gharama za mawasiliano, na kadhalika. Ni ngumu, kwa sababu programu tofauti zina mifumo tofauti ya ufikiaji. Baadhi hufikia risiti nyingi, baadhi hutaka kufikia hali zaidi, kama Rotki, na baadhi hufikia miamala zaidi, kama Helios. Hakuna suluhisho moja kamilifu, na kuna uwezekano mkubwa usanifu mchanganyiko utasaidia. Pia tunafanya utaratibu wa maarifa, kwa hivyo ikiwa hii inakuvutia, tunaweza kuishiriki. Na hapa kuna baadhi tu ya timu zinazofanya kazi katika maeneo haya. Nisamehe ikiwa wewe ni sehemu ya timu na sikukujumuisha; ikiwa mtu ataona rekodi na hayupo, tafadhali nijulishe na ninaweza kuanza kukuongeza.

### Kuficha trafiki: uelekezaji wa kitunguu na Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Tumeshughulikia data. Kundi jingine kubwa ni trafiki. Tunafichaje trafiki, na tunataka kuficha nini? Kwa maneno rahisi sana, tunataka kuficha IP za mteja na seva kutoka kwa kila mmoja, na kutoka kwa ulimwengu wote ambao unaweza kuwa unachungulia trafiki. Tuna mbinu tofauti: huduma za kitunguu, mixnets, VPNs, DC-nets, na kunaweza kuwa na uainishaji mwingine. Nitazungumzia tu mbili za kwanza.

Mbinu za uelekezaji wa kitunguu husimba kwa safu, na trafiki husimbuliwa kwa safu pia. Watu walio katikati hawawezi kamwe kujua asili, baadhi hawawezi kamwe kujua mwisho, na baadhi hawajifunzi chochote; wanafanya tu kama vielekezi.

Ufupisho ni: vipi ikiwa trafiki yote ya mfumo wa ikolojia wa Ethereum ingeweza kuelekezwa kupitia mtandao wa Tor, kwa kusema? Kuna chaguzi nyingine pia. Tungesaidia kulinda IP ya mtumaji: simu yako au kompyuta yako ndogo isingevuja unapokuwa unatuma miamala au kuomba taarifa. Na bila shaka tungemlinda pia mpokeaji, seva. Fikiria kwamba nchini Iran, China, Korea Kaskazini, au Venezuela, mtu anajaribu kupangisha itifaki ya fedha zilizogatuliwa (DeFi) au huduma na inadhibitiwa na nchi yao. Hili ni chaguo ambalo linaweza kulinda maisha yao. Inakwepa udhibiti na pia inaficha trafiki kutoka kwa ISPs, watoa huduma za intaneti, ambao sote tunajua wanadukuliwa na mashirika ya kijasusi yanayochungulia kila kitu.

Lengo ni kuwa na mbadala wa moja kwa moja: SDK, ili mikoba, wasanidi wa programu tumizi iliyogatuliwa (dapp), na watoa huduma za miundombinu wasihitaji kuwa na wasiwasi kuhusu maelezo ya utekelezaji. Wanajua tu kwamba wakitumia SDK hii, trafiki inafanywa kuwa ya kitunguu, inasimbwa, na kuimarishwa.

Kuna timu nataka kuipongeza, timu ya Brume Wallet, ambao walianzisha Echalote, utekelezaji wa chanzo wazi wa Tor kwa wavuti. Hii ipo sasa hivi: kuna wateja wa Tor, lakini wameandikwa kwa C, na wanahitaji kuendeshwa kwenye kivinjari maalum. Vipi ikiwa nataka kuongeza hii kwenye MetaMask, au kwenye mkoba wa Kohaku, au kwa Ambire, Rabby, na wengine wote? Tunahitaji SDK za JavaScript, na ndicho Echalote ilichoanzisha.

Kisha, Mradi wa Tor una utekelezaji mpya unaotengenezwa unaoitwa Arti, kizazi kijacho cha mteja wao. Lakini tunahitaji Arti iliyopachikwa. Arti inategemea Rust, na inahitaji kukusanywa kuwa WASM ili iweze kuendeshwa kwenye kivinjari chako, ili uweze kuiingiza kwa urahisi sana. Kimsingi tuna ushirikiano na timu ya Tor: simu kila wiki, na baadhi ya miradi na ushirikiano pamoja.

### Mixnets kwa Ethereum (18:16) {#mixnets-for-ethereum-1816}

Kwa upande wa mixnet, nataka kupongeza timu kadhaa zinazokaribia hili: timu ya Nym; HOPR, pia mojawapo ya za kwanza; VPNs kama Gnosis VPN; na nyingine kadhaa ambazo zilikuwa mpya kwangu, kama Anyone Protocol, na nadhani mtu kutoka timu hiyo anapaswa kuwa hapa Denver, pamoja na nyingine mpya. Kuna timu nyingi zinazofanya kazi kwenye mixnets, VPNs, na mbinu nyingine.

Tunataka kuona: vipi ikiwa tutaunda mixnet iliyojengwa kwa madhumuni maalum kwa Ethereum, ambapo tunaweza kuelekeza trafiki ya RPC? Mixnets zina dhamana imara, lakini zinaongeza ucheleweshaji mwingi. Kwa baadhi ya matukio ya matumizi hiyo ni sawa: haijalishi ikiwa inachukua muda mrefu kidogo, mradi tu una faragha. Lakini kwa mambo kama fedha zilizogatuliwa (DeFi) na biashara, kuna uwezekano mdogo sana hizi zitapitishwa ikiwa zitaongeza ucheleweshaji. Kwa hivyo, ni kasi gani ya juu zaidi tunaweza kuendesha na dhamana za juu zaidi za faragha? Tena, pongezi kwa baadhi ya timu hizi, na ikiwa mtu anafanya kazi katika maeneo haya na sijakuongeza, ningependa kuzungumza.

### Utendaji: miti ya jozi iliyounganishwa na uongezaji kasi wa GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Jambo la mwisho ninalotaka kuzungumzia, nguzo ya tatu ya kufanya hili kuwa kweli, ni utendaji. Tunataka mambo haya yaende haraka na kwa bei nafuu. Nina kanuni: mambo haya hayatapitishwa ikiwa gharama ni kubwa kuliko faida. Gharama inamaanisha uzoefu wa mtumiaji, muda, na juhudi kwa mtumiaji, lakini pia gharama kwa wasanidi programu na miundombinu: je, hii ni ghali sana kuendesha? Tunahitaji kupunguza gharama kadiri tuwezavyo, na kuna mipango miwili ya kiwango cha juu ninayoweza kuzungumzia.

Moja ni UBT. Kulingana na jinsi unavyohusika katika EIPs za itifaki, huenda umesikia kuhusu hili. Sasa hivi tuna Trie ya Merkle Patricia, ambayo ni muhimu, lakini si muhimu sana kwa ZK na aina nyingine za kriptografia. Kuna pendekezo, EIP-7864, la kuhamia si kwenye Miti ya Verkle bali kwenye miti ya jozi iliyounganishwa. Hii ni bora zaidi kwa kuuliza hali na kisha kufanya shughuli za kriptografia kama ZK juu yake.

Tuna mradi unaofanya UBT inayoweza kuthibitishwa: unaongeza gari la kando kwa mteja yeyote wa Ethereum, ambaye, badala ya kuendesha hifadhidata ya MPT, ana hifadhidata ya hali ya UBT, na kisha unathibitisha kwamba mabadiliko haya kutoka MPT hadi UBT ni halali kwa kutumia zkVM. Hii tayari ina nguvu sana. Pindi tutakapofanikiwa kufanya hivi, wateja wepesi wangeweza kuitumia kuongeza utendaji wao, na mambo kama PIR yangeweza kwenda haraka zaidi.

Kipengele kingine ni uongezaji kasi wa GPU. Tunaweza kuendesha mambo haya haraka zaidi ikiwa tutaboresha viwango vya chini vya mkusanyiko: GPU ni mojawapo, au uongezaji kasi wa CPU pia. Mambo haya huenda yataendeshwa kwenye seva, si kwenye simu, kwa hivyo pia ni muhimu sana kuanza kuchunguza jinsi tunavyoweza kuunda maktaba hizi za kiwango cha chini ili ziende haraka zaidi.

Kufanya muhtasari hadi sasa: tuna safu hizi tano, na tunataka kushughulikia matukio haya ya matumizi. Kuna nguzo tatu: data, trafiki, na utendaji. Kwa data tuna proksi, TEEs, ORAMs, OMAPs, na PIR. Kwa trafiki tuna mixnets, uelekezaji wa kitunguu, na nyinginezo. Kwa utendaji tuna UBT na uongezaji kasi wa GPU. Ikiwa unataka kusoma zaidi, angalau kuhusu michango ambayo PSE inatoa, unaweza kwenda kwenye pse.dev/research.

### Kupima mafanikio (22:15) {#measuring-success-2215}

Kwa hivyo mafanikio ni nini, na tunawezaje kuyapima? Tukirudi kwenye safu hizi: ikiwa nataka kuweza kudai kwamba Ethereum ni mnyororo wa kibinafsi zaidi, mwisho ni nini? Ningehitaji kujisikia vizuri kwamba safu hizi zote zimeimarishwa sana. Ningepimaje? Ningetarajia tovuti zaidi na sehemu za mbele za programu tumizi iliyogatuliwa (dapp) kupangishwa nyuma ya vikoa vya kitunguu. Ningependa mikoba itumie uelekezaji usiojulikana kiasili, na lango, watoa huduma wa RPC, na viunda faharisi pia. Na ningepima asilimia.

Swali ni: kati ya sehemu za mbele za mfumo wa ikolojia wa Ethereum wa sasa, ni ngapi zinapangishwa nyuma ya kikoa cha kitunguu? Ningesema chache sana, 1% ikiwa zipo. Ili nijisikie vizuri na kusema tumefanya hivyo, labda tungehitaji zaidi ya 80% katika safu hizi zote. Ni mikoba mingapi sasa hivi inaelekeza trafiki kupitia mbinu za uelekezaji usiojulikana? Michache sana. Sawa na watoa huduma wa RPC: je, watoa huduma hawa wanatoa PIR? Hapana. Kwa hivyo kwangu, kudai mafanikio inamaanisha wahusika katika safu hizi zote wanapitisha aina hizi za teknolojia, angalau 80% ya timu, trafiki, au maswali.

### Ulinganisho wa nodi ya kitunguu ya Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

Hili ni jambo moja ambalo tunaweza kuionea wivu Bitcoin. Kwa ukosoaji wote wanaopata, hii ni picha kutoka Novemba mwaka jana: 64% ya nodi zao kamili zinazofikika zimefichwa nyuma ya vikoa vya kitunguu.

Je, tunaweza kufanya wenyewe? Hii ni faragha ya kiwango cha chini, kiwango cha mwafaka, lakini je, tunaweza kusema kwamba nodi zetu kamili na nodi za wathibitishaji ziko nyuma ya mtandao wa kitunguu au mixnets? Hakika nadhani tunapaswa, na labda tuko chini ya 1%. Tuna changamoto nyingine ambazo hawana: tunaendesha haraka zaidi, na mwafaka wetu ni tofauti. Lakini ningependa kuwa na dashibodi kama hii na kusema zaidi ya 80% ya mikoba imepitisha aina hizi za teknolojia, na watoa huduma wa RPC, wavinjari, sehemu za mbele, visawazisha mizigo, na SDKs pia. Ningependa orodha hii ikue.

### Kulinganisha Ethereum na Monero na Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Nilichukua uhuru, jana usiku na usiku uliotangulia, kuanza kuona jinsi, kupitia lenzi hii ya safu, mfumo wa ikolojia wa Ethereum unavyolinganishwa na mambo kama Solana, Bitcoin, Zcash, na Monero. Mambo ya njano ni mbinu za hiari, na nadhani tuko vizuri sana hapo. Mambo ya bluu ni mapendekezo, baadhi yakiwa mapendekezo ya itifaki. Mambo ya kijani yanatekelezwa kwenye safu ya itifaki.

Kwa sababu ya historia yetu ya miaka 10 ya kuwa mnyororo wa umma, nadhani itakuwa vigumu kuwafikia Monero na Zcash katika kufanya faragha iwe ya asili. Lakini nadhani tunaweza kufanya kazi nzuri sana katika kupata upitishaji wa hiari, na kushawishi kitamaduni na kijamii timu na watumiaji kupitisha zaidi mbinu hizi. Bitcoin na Solana wana changamoto zao wenyewe, na nadhani watakuwa nyuma zaidi, angalau kwenye mambo haya ya faragha.

### Changamoto: mfumo wa ikolojia unaoweza kupangwa wa kibinafsi zaidi (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Lengo langu, na lengo ninalotaka kuweka akilini mwako, ni kwa Ethereum kuwa mfumo wa ikolojia wa kibinafsi zaidi, bila ruhusa, bila hitaji la uaminifu, na unaoweza kupangwa duniani. Tuna minyororo mingine ya malipo ya kibinafsi, na hiyo ni nzuri, ni mizuri sana, lakini nadhani watakuwa na kazi ngumu zaidi ya kuwa inayoweza kupangwa na kuunda mfumo wa ikolojia ambao tumeunda.

Changamoto yangu kwako, na bila shaka kwangu na timu yangu, ni kuwa, kati ya mifumo ya ikolojia inayoweza kupangwa, ile isiyohitaji ruhusa zaidi, bila hitaji la uaminifu, na ya kibinafsi zaidi. Hatuwezi tu kuzingatia vipengele vya mnyororoni. Tunahitaji kuzingatia safu hizi zote.

Kwa hivyo ikiwa unafanya kazi kwenye usomaji wa kibinafsi, mtandao, utekelezaji wa PIR, uongezaji kasi wa GPU, miundo ya data, UBT, miundombinu, au wathibitishaji, ningependa kuzungumza nawe baadaye. Asante sana. Ethereum ni kwa ajili ya faragha.