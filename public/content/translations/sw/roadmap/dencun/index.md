---
title: Cancun-Deneb (Dencun)
metaTitle: Maswali Yanayoulizwa Mara kwa Mara kuhusu Cancun-Deneb (Dencun)
description: Maswali yanayoulizwa mara kwa mara kuhusu sasisho la mtandao la Cancun-Deneb (Dencun)
lang: sw
---

Cancun-Deneb (Dencun) ni sasisho la mtandao wa Ethereum, ambalo huwezesha **Proto-Danksharding (EIP-4844)**, na kuanzisha **mablobu** ya data ya muda kwa ajili ya hifadhi ya bei nafuu ya rollup ya [tabaka la 2 (l2)](/glossary/#layer-2).

Aina mpya ya muamala huwezesha watoa huduma wa rollup kuhifadhi data kwa gharama nafuu zaidi katika kile kinachojulikana kama "mablobu." Mablobu yanahakikishiwa kupatikana kwenye mtandao kwa takriban siku 18 (kwa usahihi zaidi, [vipindi](/glossary/#epoch) 4096). Baada ya kipindi hiki, mablobu huondolewa kwenye mtandao, lakini programu bado zinaweza kuthibitisha uhalali wa data zake kwa kutumia uthibitisho. 

Hili hupunguza kwa kiasi kikubwa gharama za mikusanyiko, hudhibiti ukuaji wa mnyororo, na husaidia kusaidia watumiaji wengi zaidi huku likidumisha usalama na kundi lililogatuliwa la waendeshaji wa nodi.

## Ni lini tunatarajia mikusanyiko kuonyesha ada za chini kutokana na Proto-Danksharding? {#when}

- Sasisho hili liliwezeshwa katika kipindi cha 269568, mnamo **13-Mac-2024 saa 13:55 Mchana (UTC)**
- Watoa huduma wote wakuu wa rollup, kama vile Arbitrum au Optimism, wameashiria kuwa mablobu yatatumika mara tu baada ya sasisho
- Ratiba ya usaidizi wa kila rollup inaweza kutofautiana, kwa kuwa kila mtoa huduma lazima asasishe mifumo yake ili kunufaika na nafasi mpya ya blobu

## Je, ETH inawezaje kubadilishwa baada ya mchepuo mgumu? {#scam-alert}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Kufuatia sasisho la Dencun la Ethereum, hakuna haja ya kubadilisha au kusasisha ETH yako. Salio la akaunti yako litasalia vile vile, na ETH unayomiliki kwa sasa itaendelea kufikiwa katika muundo wake uliopo baada ya mchepuo mgumu.
- **Jihadhari na Matapeli!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kusasisha" ETH yako anajaribu kukutapeli.** Hakuna unachohitaji kufanya kuhusiana na sasisho hili. Mali zako zitasalia bila kuathiriwa kabisa. Kumbuka, kuwa na taarifa ni ulinzi bora dhidi ya matapeli.

[Zaidi kuhusu kutambua na kuepuka matapeli](/security/)

## Je, sasisho la mtandao la Dencun linatatua tatizo gani? {#network-impact}

Dencun kimsingi inashughulikia **uwezo wa kuongezeka** (kushughulikia watumiaji wengi zaidi na miamala mingi zaidi) kwa **ada nafuu**, huku **ikidumisha ugatuzi** wa mtandao.

Jamii ya Ethereum imekuwa ikichukua mbinu ya "kuzingatia rollup" kwa ukuaji wake, ambayo inaweka mikusanyiko ya tabaka la 2 (l2) kama njia kuu ya kusaidia watumiaji wengi zaidi kwa usalama.

Mitandao ya rollup hushughulikia _uchakataji_ (au "utekelezaji") wa miamala tofauti na Mtandao Mkuu na kisha kuchapisha uthibitisho wa kificho na/au data iliyobanwa ya muamala ya matokeo kurudi kwenye Mtandao Mkuu kwa ajili ya utunzaji wa kumbukumbu. Kuhifadhi uthibitisho huu hubeba gharama (kwa njia ya [gesi](/glossary/#gas)), ambayo, kabla ya Proto-Danksharding, ilibidi ihifadhiwe kabisa na waendeshaji wote wa nodi za mtandao, na kuifanya kuwa kazi ya gharama kubwa.

Kuanzishwa kwa Proto-Danksharding katika sasisho la Dencun kunaongeza hifadhi ya data ya bei nafuu kwa uthibitisho huu kwa kuhitaji tu waendeshaji wa nodi kuhifadhi data hii kwa takriban siku 18, baada ya hapo data inaweza kuondolewa kwa usalama ili kuzuia upanuzi wa mahitaji ya maunzi. Kwa sababu mikusanyiko kwa kawaida huwa na kipindi cha utoaji cha siku 7, muundo wao wa usalama haubadiliki mradi tu mablobu yanapatikana kwenye tabaka la 1 (l1) kwa muda huu. Dirisha la uondoaji la siku 18 hutoa kinga kubwa kwa kipindi hiki.

[Zaidi kuhusu kuongeza uwezo wa Ethereum](/roadmap/scaling/)

## Je, data ya zamani ya blobu inafikiwaje? {#historical-access}

Ingawa nodi za kawaida za Ethereum zitashikilia _hali ya sasa_ ya mtandao kila wakati, data ya kihistoria ya blobu inaweza kutupwa takriban siku 18 baada ya kuanzishwa kwake. Kabla ya kutupa data hii, Ethereum inahakikisha kuwa imepatikana kwa washiriki wote wa mtandao, ikiruhusu muda wa:

- Wahusika wanaovutiwa kupakua na kuhifadhi data.
- Kukamilika kwa vipindi vyote vya changamoto vya rollup.
- Kukamilishwa kwa miamala ya rollup.

Data ya _kihistoria_ ya blobu inaweza kuhitajika kwa sababu mbalimbali na inaweza kuhifadhiwa na kufikiwa kwa kutumia itifaki kadhaa zilizogatuliwa:

- **Itifaki za faharisi za wahusika wengine**, kama vile The Graph, huhifadhi data hii kupitia mtandao uliogatuliwa wa waendeshaji wa nodi wanaohamasishwa na mifumo ya kiuchumi ya kripto.
- **BitTorrent** ni itifaki iliyogatuliwa ambapo watu wa kujitolea wanaweza kushikilia na kusambaza data hii kwa wengine.
- **[Potal Netwoki ya Ethereum](/developers/docs/networking-layer/portal-network/)** inalenga kutoa ufikiaji wa data zote za Ethereum kupitia mtandao uliogatuliwa wa waendeshaji wa nodi kwa kusambaza data miongoni mwa washiriki sawa na BitTorrent.
- **Watumiaji binafsi** wako huru kila wakati kuhifadhi nakala zao wenyewe za data yoyote wanayotaka kwa marejeleo ya kihistoria.
- **Watoa huduma wa rollup** wanahamasishwa kuhifadhi data hii ili kuboresha matumizi ya mtumiaji wa rollup yao.
- **Wachunguzi wa kitalu** kwa kawaida huendesha nodi za kumbukumbu ambazo huweka faharisi na kuhifadhi taarifa hizi zote kwa marejeleo rahisi ya kihistoria, zinazofikiwa na watumiaji kupitia kiolesura cha wavuti.

Ni muhimu kutambua kwamba kurejesha hali ya kihistoria hufanya kazi kwenye **muundo wa uaminifu wa 1-kati-ya-N**. Hii inamaanisha kuwa unahitaji tu data kutoka kwa _chanzo kimoja cha kuaminika_ ili kuthibitisha usahihi wake kwa kutumia hali ya sasa ya mtandao.

## Je, sasisho hili linachangia vipi katika ramani pana ya njia ya Ethereum? {#roadmap-impact}

Proto-Danksharding huweka msingi wa utekelezaji kamili wa [danksharding](/roadmap/danksharding/). Danksharding imeundwa kusambaza hifadhi ya data ya rollup kwa waendeshaji wa nodi, kwa hivyo kila mwendeshaji anahitaji tu kushughulikia sehemu ndogo ya data yote. Usambazaji huu utaongeza idadi ya mablobu ya data kwa kila kitalu, ambayo ni muhimu kwa kuongeza uwezo wa Ethereum kushughulikia watumiaji na miamala mingi zaidi.

Uwezo huu wa kuongezeka ni muhimu katika [kusaidia mabilioni ya watumiaji kwenye Ethereum](/roadmap/scaling/) kwa ada nafuu na programu za hali ya juu zaidi, huku ukidumisha mtandao uliogatuliwa. Bila mabadiliko haya, mahitaji ya maunzi kwa waendeshaji wa nodi yangeongezeka, na kusababisha hitaji la vifaa vya gharama kubwa zaidi. Hili linaweza kuwatoa waendeshaji wadogo, na kusababisha mkusanyiko wa udhibiti wa mtandao miongoni mwa waendeshaji wachache wakubwa, jambo ambalo lingeenda kinyume na kanuni ya ugatuzi.

## Je, sasisho hili linaathiri wateja wote wa mwafaka na mthibitishaji wa Ethereum? {#client-impact}

Ndiyo, Proto-Danksharding (EIP-4844) inahitaji masasisho kwa wateja wa utekelezaji na wateja wa mwafaka. Wateja wote wakuu wa Ethereum wametoa matoleo yanayounga mkono sasisho. Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya sasisho, waendeshaji wa nodi lazima wahakikishe kuwa wanaendesha toleo la mteja linalotumika. Kumbuka kwamba taarifa kuhusu matoleo ya mteja inategemea wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi. [Tazama maelezo kuhusu matoleo ya mteja yanayotumika](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Wateja wa mwafaka hushughulikia programu ya _Mthibitishaji_, ambayo yote imesasishwa ili kushughulikia sasisho.

## Je, Cancun-Deneb (Dencun) inaathiri vipi mitandao ya majaribio ya Ethereum? {#testnet-impact}

- Devnets, Sepolia na Holesky zote zimepitia sasisho la Dencun na zina Proto-Danksharding inayofanya kazi kikamilifu
- Wasanidi wa rollup wanaweza kutumia mitandao hii kwa majaribio ya EIP-4844
- Watumiaji wengi hawataathiriwa kabisa na mabadiliko haya kwa kila mtandao wa majaribio

## Je, miamala yote kwenye tabaka la 2 (l2) sasa itatumia nafasi ya muda ya blobu, au utaweza kuchagua? {#calldata-vs-blobs}

Miamala ya rollup kwenye tabaka la 2 (l2) la Ethereum ina chaguo la kutumia aina mbili za hifadhi ya data: nafasi ya muda ya blobu au data za mwito za kudumu za mkataba mahiri. Nafasi ya blobu ni chaguo la kiuchumi, kutoa hifadhi ya muda kwa gharama ya chini. Inahakikisha upatikanaji wa data kwa vipindi vyote muhimu vya changamoto. Kwa upande mwingine, data za mwito za mkataba mahiri hutoa hifadhi ya kudumu lakini ni ghali zaidi.

Uamuzi kati ya kutumia nafasi ya blobu au data za mwito kimsingi hufanywa na watoa huduma wa rollup. Wanaweka uamuzi huu kwenye mahitaji ya sasa ya nafasi ya blobu. Ikiwa nafasi ya blobu inahitajika sana, mikusanyiko inaweza kuchagua data za mwito ili kuhakikisha data inachapishwa kwa wakati.

Ingawa kinadharia inawezekana kwa watumiaji kuchagua aina ya hifadhi wanayopendelea, watoa huduma wa rollup kwa kawaida husimamia chaguo hili. Kutoa chaguo hili kwa watumiaji kungeongeza utata, hasa katika miamala ya kuunganisha ya gharama nafuu. Kwa maelezo mahususi kuhusu chaguo hili, watumiaji wanapaswa kurejelea nyaraka zinazotolewa na watoa huduma binafsi wa rollup.

## Je, 4844 itapunguza gesi ya tabaka la 1 (l1)? {#l1-fee-impact}

Sio kwa kiasi kikubwa. Soko jipya la gesi linaanzishwa pekee kwa nafasi ya blobu, kwa matumizi ya watoa huduma wa rollup. _Ingawa ada kwenye tabaka la 1 (l1) zinaweza kupunguzwa kwa kuhamisha data ya rollup kwenye mablobu, sasisho hili kimsingi linalenga kupunguza ada za tabaka la 2 (l2). Kupunguzwa kwa ada kwenye tabaka la 1 (l1) (Mtandao Mkuu) kunaweza kutokea kama athari ya daraja la pili kwa kiwango kidogo._

- Kupunguzwa kwa gesi ya tabaka la 1 (l1) kutalingana na upitishaji/matumizi ya data ya blobu na watoa huduma wa rollup
- Gesi ya tabaka la 1 (l1) ina uwezekano wa kusalia yenye ushindani kutokana na shughuli zisizohusiana na rollup
- Mikusanyiko inayopitisha matumizi ya nafasi ya blobu itahitaji gesi kidogo ya tabaka la 1 (l1), kusaidia kusukuma ada za gesi za tabaka la 1 (l1) chini katika muda mfupi
- Nafasi ya blobu bado ina kikomo, kwa hivyo ikiwa mablobu ndani ya kitalu yamejaa/kujazwa, basi mikusanyiko inaweza kuhitajika kuchapisha data zao kama data ya kudumu kwa wakati huo, jambo ambalo lingepandisha bei za gesi za tabaka la 1 (l1) na tabaka la 2 (l2) juu

## Je, hili litapunguza ada kwenye misururu mingine ya vizuizi ya tabaka la 1 (l1) ya EVM? {#alt-l1-fee-impact}

Hapana. Faida za Proto-Danksharding ni mahususi kwa mikusanyiko ya tabaka la 2 (l2) ya Ethereum ambayo huhifadhi uthibitisho wao kwenye tabaka la 1 (l1) (Mtandao Mkuu).

Kuwa tu sambamba na Mashine Pepe ya Ethereum (EVM) haimaanishi kwamba mtandao utaona faida yoyote kutokana na sasisho hili. Mitandao inayofanya kazi kwa kujitegemea na Ethereum (iwe inaoana na EVM au la) haihifadhi data zao kwenye Ethereum na haitaona faida yoyote kutokana na sasisho hili.

[Zaidi kuhusu mikusanyiko ya tabaka la 2 (l2)](/layer-2/)

## Je, unapendelea kujifunza kwa kuona? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Kufungua Uongezaji Uwezo wa Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 na Domothy — Bankless_

## Usomaji zaidi {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Miamala ya blobu ya shadi (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Tangazo la Mtandao Mkuu la Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blogu ya Ethereum Foundation_
- [Mwongozo wa Hitchhiker kwa Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Maswali Yanayoulizwa Mara kwa Mara kuhusu Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Maelezo ya Kina ya EIP-4844: Msingi wa Sasisho la Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Sasisho la AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_