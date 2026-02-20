---
title: Maswali Yanayoulizwa Mara kwa Mara ya Cancun-Deneb (Dencun)
description: Maswali yanayoulizwa mara kwa mara kuhusu uboreshaji wa mtandao wa Cancun-Deneb (Dencun)
lang: sw
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) ni sasisha wa mtandao wa Ethereum, unaowasha Proto-Danksharding (EIP-4844). Uboreshaji huu unaleta data ya muda inayojulikana kama blobs kwa ajili ya hifadhi ya bei nafuu ya 'unda-mpya' (unda-mpya) za tabaka la 2 (L2).

Aina mpya ya muamala inawawezesha watoa huduma wa unda-mpya kuhifadhi data kwa gharama nafuu zaidi katika kile kinachojulikana kama "blobs." 'Blobs' zinahakikishiwa kupatikana kwenye mtandao kwa takriban siku 18 (kwa usahihi zaidi, 'epochs' 4096). Baada ya kipindi hiki, 'blobs' huondolewa kwenye mtandao, lakini programu bado zinaweza kuthibitisha uhalali wa data zao kwa kutumia ithibati.

Hii inapunguza kwa kiasi kikubwa gharama za unda-mpya, inapunguza ukuaji wa chaini, na inasaidia kuhudumia watumiaji wengi zaidi huku ikidumisha usalama na seti ya waendeshaji nodi iliyogatuliwa.

## Ni lini tunatarajia unda-mpya zionyeshe ada za chini kutokana na Proto-Danksharding? {#when}

- Sasisha huu uliwashwa kwenye 'epoch' ya 269568, tarehe 13-Machi-2024 saa 13:55 (UTC)
- Watoa huduma wote wakuu wa 'unda-mpya', kama vile Arbitrum au Optimism, wameashiria kwamba 'blobs' zitaungwa mkono mara tu baada ya uboreshaji.
- Muda wa usaidizi kwa kila 'unda-mpya' unaweza kutofautiana, kwani kila mtoa huduma lazima asasishwe mifumo yake ili kunufaika na nafasi mpya ya 'blob'.

## Je, ETH inawezaje kubadilishwa baada ya 'hard fork'? {#scam-alert}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Kufuatia uboreshaji wa Dencun wa Ethereum, hakuna haja ya kubadilisha au kuboresha ETH yako. Salio la akaunti yako litabaki kama lilivyo, na ETH unayomiliki sasa itaendelea kupatikana katika hali yake ya sasa baada ya 'hard fork'.
- **Jihadhari na Ulaghai!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kuboresha" ETH yako anajaribu kukuibia.** Hakuna unachohitaji kufanya kuhusiana na uboreshaji huu.
  Rasilimali zako hazitaathirika kabisa. Kumbuka, kuwa na taarifa ndiyo njia bora ya kujilinda dhidi ya ulaghai.

[Zaidi kuhusu kutambua na kuepuka ulaghai](/security/)

## Uboreshaji wa mtandao wa Dencun unatatua tatizo gani? {#network-impact}

Dencun kimsingi inashughulikia uwezo wa kupanuka (kuhudumia watumiaji wengi na miamala mingi zaidi) kwa ada nafuu, huku ikidumisha ugatuzi wa mtandao.

Jamii ya Ethereum imekuwa ikichukua mbinu inayozingatia unda-mpya katika ukuaji wake, ambayo inaweka unda-mpya za tabaka la 2 kama njia kuu ya kuwahudumia watumiaji wengi zaidi kwa usalama.

Mitandao ya unda-mpya hushughulikia uchakataji (au "utekelezaji") wa miamala kando na Mtandao Mkuu (Mainnet) na kisha huchapisha ithibati ya kriptografia na/au data ya muamala iliyobanwa na kuirudisha kwenye Mtandao Mkuu kwa ajili ya utunzaji wa kumbukumbu. Kuhifadhi ithibati hizi kuna gharama (kwa njia ya 'gesi'), ambayo, kabla ya Proto-Danksharding, ililazimika kuhifadhiwa milele na waendeshaji wote wa nodi za mtandao, na kuifanya kuwa kazi ya gharama kubwa.

Kuanzishwa kwa Proto-Danksharding katika uboreshaji wa Dencun kunaongeza hifadhi ya data ya bei nafuu kwa ithibati hizi. Hii inahitaji waendeshaji wa nodi kuhifadhi data hii kwa takriban siku 18 tu, ambapo baada ya hapo data inaweza kuondolewa kwa usalama ili kuzuia upanuzi wa mahitaji ya maunzi.  Kwa sababu unda-mpya kwa kawaida huwa na muda wa kutoa fedha wa siku 7, mfumo wao wa usalama haubadiliki mradi tu 'blobs' zinapatikana kwenye L1 kwa muda huu. Dirisha la uondoaji la siku 18 linatoa muda wa ziada wa kutosha kwa kipindi hiki.

[Zaidi kuhusu kupanua uwezo wa Ethereum](/roadmap/scaling/)

## Data ya zamani ya 'blob' inapatikanaje? {#historical-access}

Wakati nodi za kawaida za Ethereum zitahifadhi daima hali ya sasa ya mtandao, data ya kihistoria ya 'blob' inaweza kuondolewa takriban siku 18 baada ya kuanzishwa kwake. Kabla ya kuondoa data hii, Ethereum inahakikisha kuwa imepatikana kwa washiriki wote wa mtandao, ikitoa muda kwa ajili ya:

- Wahusika wenye nia kupakua na kuhifadhi data.
- Kukamilika kwa vipindi vyote vya changamoto vya unda-mpya.
- Kukamilishwa kwa miamala ya unda-mpya.

Data ya kihistoria ya 'blob' inaweza kuhitajika kwa sababu mbalimbali na inaweza kuhifadhiwa na kupatikana kwa kutumia itifaki kadhaa zilizogatuliwa:

- **Itifaki za upangaji za wahusika wengine**, kama vile The Graph, huhifadhi data hii kupitia mtandao uliogatuliwa wa waendeshaji nodi wanaohamasishwa na mifumo ya kiuchumi ya kripto.
- **BitTorrent** ni itifaki iliyogatuliwa ambapo watu wa kujitolea wanaweza kushikilia na kusambaza data hii kwa wengine.
- **[Mtandao wa lango la Ethereum](/developers/docs/networking-layer/portal-network/)** unalenga kutoa ufikiaji wa data yote ya Ethereum kupitia mtandao uliogatuliwa wa waendeshaji nodi kwa kusambaza data miongoni mwa washiriki sawa na BitTorrent.
- **Watumiaji binafsi** daima wako huru kuhifadhi nakala zao za data yoyote wanayotaka kwa ajili ya marejeleo ya kihistoria.
- **Watoa huduma wa unda-mpya** wanahamasishwa kuhifadhi data hii ili kuboresha uzoefu wa mtumiaji wa unda-mpya zao.
- **Vichunguzi vya bloku** kwa kawaida huendesha nodi za kumbukumbu zinazopanga na kuhifadhi taarifa hizi zote kwa marejeleo rahisi ya kihistoria, yanayopatikana kwa watumiaji kupitia kiolesura cha wavuti.

Ni muhimu kutambua kwamba urejeshaji wa hali ya kihistoria unafanya kazi kwa mfumo wa uaminifu wa **1-kati-ya-N**. Hii inamaanisha unahitaji data kutoka kwa chanzo kimoja tu cha kuaminika ili kuthibitisha usahihi wake kwa kutumia hali ya sasa ya mtandao.

## Sasisha hii inachangiaje katika mkakati mpana wa maendeleo ya Ethereum? {#roadmap-impact}

Proto-Danksharding inaandaa jukwaa la utekelezaji kamili wa [Danksharding].(/roadmap/danksharding/). Danksharding imebuniwa kusambaza ghala la data ya unda-mpya kwa waendeshaji wa nodi, ili kila mwendeshaji ahitaji kushughulikia sehemu ndogo tu ya data yote. Usambazaji huu utaongeza idadi ya 'blobs' za data kwa kila bloku, jambo ambalo ni muhimu kwa kupanua uwezo wa Ethereum ili kuhudumia watumiaji na miamala mingi zaidi.

Uwezo huu wa kupanuka ni muhimu ili [kuhudumia mabilioni ya watumiaji kwenye Ethereum](/roadmap/scaling/) kwa ada nafuu na programu za hali ya juu zaidi, huku ukidumisha mtandao uliogatuliwa. Bila mabadiliko haya, mahitaji ya maunzi kwa waendeshaji nodi yangeongezeka, na kusababisha hitaji la vifaa vya gharama kubwa zaidi. Hii inaweza kuwaondoa waendeshaji wadogo sokoni, na kusababisha udhibiti wa mtandao kujilimbikizia kwa waendeshaji wachache wakubwa, jambo ambalo lingeenda kinyume na kanuni ya ugatuzi.

## Je, uboreshaji huu unaathiri wateja wote wa makubaliano na wathibitishaji wa Ethereum? {#client-impact}

Ndio, Proto-Danksharding (EIP-4844) inahitaji masasisho kwa wateja wa utekelezaji na wateja wa makubaliano. Wateja wote wakuu wa Ethereum wametoa matoleo yanayounga mkono uboreshaji huo. Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya uboreshaji, waendeshaji nodi lazima wahakikishe kuwa wanatumia toleo la mteja linaloungwa mkono. Kumbuka kwamba taarifa kuhusu matoleo ya wateja hubadilika kulingana na wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi. [Angalia maelezo kuhusu matoleo ya wateja yanayoungwa mkono.](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Wateja wa makubaliano hushughulikia programu ya Mthibitishaji, ambayo yote imesasishwa ili kuendana na uboreshaji huo.

## Cancun-Deneb (Dencun) inaathirije mitandao ya majaribio ya Ethereum? {#testnet-impact}

- Devnets, Sepolia na Holesky zote zimefanyiwa uboreshaji wa Dencun na zina Proto-Danksharding inayofanya kazi kikamilifu.
- Waendelezaji wa unda-mpya wanaweza kutumia mitandao hii kwa majaribio ya EIP-4844.
- Watumiaji wengi hawataathirika kabisa na mabadiliko haya kwa kila mtandao wa majaribio.

## Je, miamala yote kwenye L2 sasa itatumia nafasi ya muda ya 'blob', au utaweza kuchagua? {#calldata-vs-blobs}

Miamala ya unda-mpya kwenye Tabaka la 2 (L2) la Ethereum ina fursa ya kutumia aina mbili za hifadhi ya data: nafasi ya muda ya 'blob' au 'calldata' ya kudumu ya mkataba janja. Nafasi ya 'blob' ni chaguo la kiuchumi, inayotoa hifadhi ya muda kwa gharama ya chini. Inahakikisha upatikanaji wa data kwa vipindi vyote muhimu vya changamoto. Kwa upande mwingine, 'calldata' ya mkataba janja inatoa hifadhi ya kudumu lakini ni ya gharama kubwa zaidi.

Uamuzi kati ya kutumia nafasi ya 'blob' au 'calldata' hufanywa hasa na watoa huduma wa 'unda-mpya'. Wanafanya uamuzi huu kulingana na mahitaji ya sasa ya nafasi ya 'blob'. Ikiwa nafasi ya 'blob' ina mahitaji makubwa, unda-mpya zinaweza kuchagua 'calldata' ili kuhakikisha data inachapishwa kwa wakati unaofaa.

Ingawa kinadharia inawezekana kwa watumiaji kuchagua aina wanayopendelea ya hifadhi, watoa huduma wa unda-mpya ndio kwa kawaida husimamia chaguo hili. Kutoa fursa hii kwa watumiaji kungeongeza ugumu, hasa katika kuunganisha miamala kwa gharama nafuu. Kwa maelezo maalum kuhusu chaguo hili, watumiaji wanapaswa kurejelea nyaraka zinazotolewa na watoa huduma binafsi wa unda-mpya.

## Je, 4844 itapunguza gesi ya L1? {#l1-fee-impact}

Si kwa kiasi kikubwa. Soko jipya la gesi linaanzishwa kwa ajili ya nafasi ya 'blob' pekee, kwa matumizi ya watoa huduma wa 'unda-mpya'. Ingawa ada kwenye L1 zinaweza kupunguzwa kwa kuhamishia data ya unda-mpya kwenye 'blobs', sasisha hii inalenga hasa upunguzaji wa ada za L2. Upunguzaji wa ada kwenye L1 (Mainnet) unaweza kutokea kama athari ya pili kwa kiwango kidogo.

- Upunguzaji wa gesi ya L1 utalingana na jinsi watoa huduma wa 'unda-mpya' watakavyotumia data ya 'blob'.
- 'Gas' ya L1 inawezekana itaendelea kuwa na ushindani kutokana na shughuli zisizohusiana na 'unda-mpya'.
- Unda-mpya zinazotumia nafasi ya 'blob' zitadai 'gas' kidogo ya L1, na kusaidia kushusha ada za 'gas' za L1 kwa muda mfupi.
- Nafasi ya 'blob' bado ni chache, kwa hivyo ikiwa 'blobs' ndani ya bloku zimejaa, basi 'unda-mpya' zinaweza kulazimika kuchapisha data zao kama data ya kudumu kwa muda, jambo ambalo lingeongeza bei za gesi za L1 na L2.

## Je, hii itapunguza ada kwenye blockchain zingine za tabaka la 1 za EVM? {#alt-l1-fee-impact}

Hapana. Manufaa ya Proto-Danksharding ni maalum kwa unda-mpya za tabaka la 2 za Ethereum zinazohifadhi ithibati zao kwenye tabaka la 1 (Mainnet).

Kuwa na uwezo wa kufanya kazi na Mashine Pepe ya Ethereum (EVM) pekee haimaanishi kuwa mtandao utaona manufaa yoyote kutoka kwa uboreshaji huu. Mitandao inayofanya kazi kwa kujitegemea kutoka kwa Ethereum (iwe inaendana na EVM au la) haihifadhi data yake kwenye Ethereum na haitaona manufaa yoyote kutoka kwa uboreshaji huu.

[Zaidi kuhusu unda-mpya za tabaka la 2](/layer-2/)

## Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Kufungua Uongezwaji wa Ethereum, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 na Domothy — Bankless_

## Masomo zaidi {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Miamala ya shard blob (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Tangazo la Mtandao Mkuu wa Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _blogu ya Msingi wa Ethereum_
- [Mwongozo wa Msafiri kwa Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Maswali Yanayoulizwa Mara kwa Mara ya Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Maelezo ya Kina ya EIP-4844: Kiini cha Usasishaji wa Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Sasisho la AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
