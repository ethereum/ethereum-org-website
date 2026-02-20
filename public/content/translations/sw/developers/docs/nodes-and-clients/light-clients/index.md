---
title: Wateja wepesi
description: Utangulizi wa wateja wepesi wa Ethereum.
lang: sw
---

Kuendesha nodi kamili ndiyo njia isiyo na uaminifu zaidi, ya faragha, iliyogatuliwa na sugu ya udhibiti ya kuingiliana na Ethereum. Ukiwa na nodi kamili unahifadhi nakala yako mwenyewe ya mnyororo wa bloku ambayo unaweza kuiuliza papo hapo na unapata ufikiaji wa moja kwa moja kwa mtandao rika-kwa-rika wa Ethereum. Hata hivyo, kuendesha nodi kamili kunahitaji kiasi kikubwa cha kumbukumbu, ghala na CPU. Hii inamaanisha haiwezekani kwa kila mtu kuendesha nodi yake mwenyewe. Kuna suluhisho kadhaa kwa hili kwenye ramani ya barabara ya Ethereum, ikiwa ni pamoja na statelessness, lakini ziko miaka kadhaa kabla ya kutekelezwa. Jibu la muda mfupi ni kubadilishana baadhi ya faida za kuendesha nodi kamili kwa maboresho makubwa ya utendaji ambayo huruhusu nodi kufanya kazi na mahitaji ya chini sana ya maunzi. Nodi zinazofanya biashara hii zinajulikana kama nodi nyepesi.

## Mteja mwepesi ni nini {#what-is-a-light-client}

Nodi nyepesi ni nodi inayoendesha programu ya mteja mwepesi. Badala ya kuhifadhi nakala za ndani za data ya mnyororo wa bloku na kuthibitisha mabadiliko yote kwa kujitegemea, huomba data muhimu kutoka kwa mtoa huduma fulani badala yake. Mtoa huduma anaweza kuwa muunganisho wa moja kwa moja kwa nodi kamili au kupitia seva fulani ya RPC iliyowekwa katikati. Data kisha inathibitishwa na nodi nyepesi, ikiruhusu kwenda sambamba na kichwa cha mnyororo. Nodi nyepesi huchakata tu vichwa vya bloku, ikipakua mara chache tu yaliyomo halisi ya bloku. Nodi zinaweza kutofautiana katika wepesi wao, kulingana na mchanganyiko wa programu za mteja mwepesi na kamili wanazoendesha. Kwa mfano, usanidi mwepesi zaidi itakuwa ni kuendesha mteja mwepesi wa utekelezaji na mteja mwepesi wa makubaliano. Pia kuna uwezekano kwamba nodi nyingi zitachagua kuendesha wateja wepesi wa makubaliano na wateja kamili wa utekelezaji, au kinyume chake.

## Wateja wepesi hufanyaje kazi? {#how-do-light-clients-work}

Wakati Ethereum ilipoanza kutumia utaratibu wa makubaliano unaotegemea uthibitisho wa hisa, miundombinu mipya ilianzishwa mahususi kusaidia wateja wepesi. Njia inavyofanya kazi ni kwa kuchagua bila mpangilio kikundi kidogo cha wathibitishaji 512 kila baada ya siku 1.1 kufanya kazi kama **kamati ya kusawazisha**. Kamati ya kusawazisha hutia saini kichwa cha bloku za hivi karibuni. Kila kichwa cha bloku kina saini iliyokusanywa ya wathibitishaji katika kamati ya kusawazisha na "bitfield" inayoonyesha ni wathibitishaji gani waliotia saini na ni wapi hawakutia saini. Kila kichwa pia kinajumuisha orodha ya wathibitishaji wanaotarajiwa kushiriki katika kutia saini bloku inayofuata. Hii inamaanisha mteja mwepesi anaweza kuona haraka kwamba kamati ya kusawazisha imetia saini data wanayopokea, na pia wanaweza kuangalia kuwa kamati ya kusawazisha ni ya kweli kwa kulinganisha ile wanayopokea na ile waliyoambiwa kutarajia katika bloku iliyotangulia. Kwa njia hii, mteja mwepesi anaweza kuendelea kusasisha maarifa yake ya bloku ya hivi karibuni ya Ethereum bila kupakua bloku yenyewe, bali kichwa tu ambacho kina habari za muhtasari.

Kwenye safu ya utekelezaji hakuna maelezo mahususi kwa mteja mwepesi wa utekelezaji. Wigo wa mteja mwepesi wa utekelezaji unaweza kutofautiana kutoka "hali nyepesi" ya mteja kamili wa utekelezaji ambayo ina utendakazi wote wa EVM na mtandao wa nodi kamili lakini inathibitisha tu vichwa vya bloku, bila kupakua data inayohusiana, au inaweza kuwa mteja aliyepunguzwa zaidi ambaye anategemea sana kupeleka maombi kwa mtoa huduma wa RPC ili kuingiliana na Ethereum.

## Kwa nini wateja wepesi ni muhimu? {#why-are-light-clients-important}

Wateja wepesi ni muhimu kwa sababu wanawaruhusu watumiaji kuthibitisha data inayoingia badala ya kuamini kwa upofu kwamba mtoa data wao ni sahihi na mwaminifu, huku wakitumia sehemu ndogo tu ya rasilimali za kikokotozi ya nodi kamili. Data wanayopokea wateja wepesi inaweza kukaguliwa dhidi ya vichwa vya bloku ambavyo wanajua vimetiwa saini na angalau 2/3 ya seti nasibu ya wathibitishaji 512 wa Ethereum. Huu ni ushahidi dhabiti sana kwamba data ni sahihi.

Mteja mwepesi hutumia tu kiasi kidogo sana cha nguvu ya kompyuta, kumbukumbu na ghala kwa hivyo inaweza kuendeshwa kwenye simu ya mkononi, iliyopachikwa kwenye programu au kama sehemu ya kivinjari. Wateja wepesi ni njia ya kufanya ufikiaji uliopunguzwa uaminifu kwa Ethereum kuwa rahisi kama vile kumwamini mtoa huduma wa tatu.

Hebu tuchukue mfano rahisi. Fikiria unataka kuangalia salio la akaunti yako. Ili kufanya hivi inabidi utume ombi kwa nodi ya Ethereum. Nodi hiyo itaangalia nakala yake ya ndani ya hali ya Ethereum kwa salio lako na kukurejeshea. Ikiwa huna ufikiaji wa moja kwa moja kwa nodi, kuna waendeshaji wa kati wanaotoa data hii kama huduma. Unaweza kuwatumia ombi, wanaangalia nodi yao, na kukutumia matokeo. Tatizo la hili ni kwamba inabidi umwamini mtoa huduma kukupa taarifa sahihi. Huwezi kujua kweli habari ni sahihi ikiwa huwezi kujithibitishia mwenyewe.

Mteja mwepesi hushughulikia suala hili. Bado unaomba data kutoka kwa mtoa huduma wa nje, lakini unapopokea data inakuja na uthibitisho ambao nodi yako nyepesi inaweza kuangalia dhidi ya habari iliyopokea kwenye kichwa cha bloku. Hii inamaanisha Ethereum inathibitisha usahihi wa data yako badala ya mwendeshaji fulani anayeaminika.

## Ni ubunifu gani ambao wateja wepesi huwezesha? {#what-innovations-do-light-clients-enable}

Faida kuu ya wateja wepesi ni kuwezesha watu wengi zaidi kufikia Ethereum kwa kujitegemea na mahitaji madogo ya maunzi na utegemezi mdogo kwa wahusika wengine. Hii ni nzuri kwa watumiaji kwa sababu wanaweza kuthibitisha data zao wenyewe na ni nzuri kwa mtandao kwa sababu inaongeza idadi na utofauti wa nodi zinazothibitisha mnyororo.

Uwezo wa kuendesha nodi za Ethereum kwenye vifaa vyenye ghala, kumbukumbu na nguvu ndogo sana za usindikaji ni moja ya maeneo makuu ya uvumbuzi yaliyofunguliwa na wateja wepesi. Ambapo leo nodi za Ethereum zinahitaji rasilimali nyingi za kompyuta, wateja wepesi wanaweza kupachikwa kwenye vivinjari, kuendeshwa kwenye simu za mkononi na labda hata vifaa vidogo zaidi kama vile saa janja. Hii inamaanisha mikoba ya Ethereum yenye wateja waliopachikwa inaweza kufanya kazi kwenye simu ya mkononi. Hii inamaanisha mikoba ya simu inaweza kugatuliwa zaidi kwani haitalazimika kuamini watoa huduma wa data wa kati kwa data zao.

Upanuzi wa hii ni kuwezesha vifaa vya **intaneti ya vitu (IoT)**. Mteja mwepesi anaweza kutumika kuthibitisha haraka umiliki wa salio la tokeni au NFT, na dhamana zote za usalama zinazotolewa na kamati za kusawazisha, na hivyo kusababisha hatua fulani kwenye mtandao wa IoT. Fikiria [huduma ya kukodisha baiskeli](https://youtu.be/ZHNrAXf3RDE?t=929) inayotumia programu iliyo na mteja mwepesi aliyejengewa ndani ili kuthibitisha haraka kwamba unamiliki NFT ya huduma ya kukodisha na ikithibitika, inafungua baiskeli ili uondoke nayo!

Unda-mpya za Ethereum pia zitanufaika na wateja wepesi. Moja ya matatizo makubwa kwa unda-mpya imekuwa ni udukuzi unaolenga madaraja yanayoruhusu fedha kuhamishwa kutoka Mtandao Mkuu wa Ethereum hadi kwenye unda-mpya. Udhaifu mmoja ni oracles ambazo unda-mpya hutumia kugundua kwamba mtumiaji ameweka amana kwenye daraja. Ikiwa oracle inatoa data mbaya, inaweza kuidanganya unda-mpya kufikiria kulikuwa na amana kwenye daraja na kutoa fedha kimakosa. Mteja mwepesi aliyepachikwa kwenye unda-mpya anaweza kutumika kulinda dhidi ya oracles zilizoharibiwa kwa sababu amana kwenye daraja inaweza kuja na uthibitisho unaoweza kuthibitishwa na unda-mpya kabla ya kutoa tokeni zozote. Dhana hiyo hiyo inaweza pia kutumika kwa madaraja mengine ya kati ya minyororo.

Wateja wepesi wanaweza pia kutumika kusasisha mikoba ya Ethereum. Badala ya kuamini data inayotolewa na mtoa huduma wa RPC, mkoba wako unaweza kuthibitisha moja kwa moja data unayopewa kwa kutumia mteja mwepesi aliyejengewa ndani. Hii itaongeza usalama kwenye mkoba wako. Ikiwa mtoa huduma wako wa RPC hakuwa mwaminifu na akakupa data isiyo sahihi, mteja mwepesi aliyejengewa ndani anaweza kukuambia!

## Hali ya sasa ni ipi ya maendeleo ya wateja wepesi? {#current-state-of-development}

Kuna wateja kadhaa wepesi wanaoendelezwa, ikiwa ni pamoja na wateja wepesi wa utekelezaji, makubaliano na mchanganyiko wa wateja wepesi wa utekelezaji/makubaliano. Hizi ni tekelezo za wateja wepesi tunazozijua wakati wa kuandika ukurasa huu:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): mteja mwepesi wa makubaliano katika TypeScript
- [Helios](https://github.com/a16z/helios): mteja mwepesi wa mchanganyiko wa utekelezaji na makubaliano katika Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): hali nyepesi ya mteja wa utekelezaji (katika maendeleo) katika Go
- [Nimbus](https://nimbus.guide/el-light-client.html): mteja mwepesi wa makubaliano katika Nim

Kwa ufahamu wetu hakuna kati ya hizi inayoonekana kuwa tayari kwa uzalishaji bado.

Pia kuna kazi nyingi inayofanywa kuboresha njia ambazo wateja wepesi wanaweza kufikia data ya Ethereum. Hivi sasa, wateja wepesi wanategemea maombi ya RPC kwa nodi kamili kwa kutumia mtindo wa mteja/seva, lakini katika siku zijazo data inaweza kuombwa kwa njia iliyogatuliwa zaidi kwa kutumia mtandao maalum kama vile [Mtandao wa Portal](https://www.ethportal.net/) ambao unaweza kutoa data kwa wateja wepesi kwa kutumia itifaki ya uvumi rika-kwa-rika.

Vipengele vingine vya [ramani ya barabara](/roadmap/) kama vile [miti ya Verkle](/roadmap/verkle-trees/) na [statelessness](/roadmap/statelessness/) hatimaye vitaleta dhamana za usalama za wateja wepesi kuwa sawa na zile za wateja kamili.

## Masomo zaidi {#further-reading}

- [Zsolt Felfodhi kuhusu wateja wepesi wa Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling kuhusu mtandao wa wateja wepesi](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling kuhusu wateja wepesi baada ya Muungano](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Barabara ndefu kuelekea wateja wepesi wanaofanya kazi](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
