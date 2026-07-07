---
title: Tabaka la mtandao
description: Utangulizi wa tabaka la mtandao la Ethereum.
lang: sw
sidebarDepth: 2
---

[Ethereum](/) ni mtandao wa rika-kwa-rika wenye maelfu ya nodi ambazo lazima ziweze kuwasiliana zenyewe kwa zenyewe kwa kutumia itifaki zilizosanifiwa. "Tabaka la mtandao" ni mkusanyiko wa itifaki zinazoruhusu nodi hizo kutafutana na kubadilishana taarifa. Hii inajumuisha "kuvumisha" taarifa (mawasiliano ya mmoja-kwa-wengi) kwenye mtandao pamoja na kubadilishana maombi na majibu kati ya nodi mahususi (mawasiliano ya mmoja-kwa-mmoja). Kila nodi lazima ifuate sheria mahususi za mtandao ili kuhakikisha inatuma na kupokea taarifa sahihi.

Kuna sehemu mbili za programu ya kiteja (viteja vya utekelezaji na wateja wa mwafaka), kila moja ikiwa na mkusanyiko wake tofauti wa mtandao. Pamoja na kuwasiliana na nodi nyingine za Ethereum, viteja vya utekelezaji na wateja wa mwafaka lazima wawasiliane wao kwa wao. Ukurasa huu unatoa maelezo ya utangulizi ya itifaki zinazowezesha mawasiliano haya.

Viteja vya utekelezaji huvumisha miamala kwenye mtandao wa rika-kwa-rika wa tabaka la utekelezaji. Hii inahitaji mawasiliano yaliyosimbwa kwa njia fiche kati ya wenza waliothibitishwa. Wakati mthibitishaji anapochaguliwa kupendekeza kitalu, miamala kutoka kwenye kusanyiko la miamala la ndani la nodi itapitishwa kwa wateja wa mwafaka kupitia muunganisho wa ndani wa RPC, ambayo itafungashwa kwenye vitalu vya kinara. Wateja wa mwafaka kisha watavumisha vitalu vya kinara kwenye mtandao wao wa p2p. Hii inahitaji mitandao miwili tofauti ya p2p: mmoja unaounganisha viteja vya utekelezaji kwa ajili ya uvumi wa miamala na mwingine unaounganisha wateja wa mwafaka kwa ajili ya uvumi wa kitalu.

## Mahitaji ya Awali {#prerequisites}

Uelewa kiasi wa [nodi na viteja](/developers/docs/nodes-and-clients/) vya Ethereum utasaidia kuelewa ukurasa huu.

## Tabaka la Utekelezaji {#execution-layer}

Itifaki za mtandao za tabaka la utekelezaji zimegawanywa katika mikusanyiko miwili:

- mkusanyiko wa ugunduzi: umejengwa juu ya UDP na unaruhusu nodi mpya kupata wenza wa kuungana nao

- mkusanyiko wa DevP2P: unakaa juu ya TCP na kuwezesha nodi kubadilishana taarifa

Mikusanyiko yote miwili inafanya kazi sambamba. Mkusanyiko wa ugunduzi unaingiza washiriki wapya wa mtandao kwenye mtandao, na mkusanyiko wa DevP2P unawezesha mwingiliano wao.

### Ugunduzi {#discovery}

Ugunduzi ni mchakato wa kutafuta nodi nyingine kwenye mtandao. Hii inaanzishwa kwa kutumia kundi dogo la nodi za uanzishaji (nodi ambazo anwani zake [zimewekwa kwa kudumu](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) kwenye kiteja ili ziweze kupatikana mara moja na kuunganisha kiteja kwa wenza). Nodi hizi za uanzishaji zipo tu kwa ajili ya kutambulisha nodi mpya kwa kundi la wenza - hili ndilo dhumuni lao pekee, hazishiriki katika kazi za kawaida za kiteja kama vile kusawazisha mnyororo, na zinatumika tu mara ya kwanza kabisa kiteja kinapoanzishwa.

Itifaki inayotumika kwa mwingiliano wa nodi na nodi ya uanzishaji ni muundo uliobadilishwa wa [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) ambao unatumia [jedwali la heshi lililosambazwa](https://en.wikipedia.org/wiki/Distributed_hash_table) kushiriki orodha za nodi. Kila nodi ina toleo la jedwali hili lenye taarifa zinazohitajika ili kuunganishwa na wenza wake wa karibu zaidi. 'Ukaribu' huu si wa kijiografia - umbali unafafanuliwa na ufanano wa kitambulisho cha nodi. Jedwali la kila nodi husasishwa mara kwa mara kama kipengele cha usalama. Kwa mfano, katika [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), nodi za itifaki ya ugunduzi pia zina uwezo wa kutuma 'matangazo' yanayoonyesha itifaki ndogo ambazo kiteja kinasaidia, kuruhusu wenza kujadiliana kuhusu itifaki ambazo wote wanaweza kutumia kuwasiliana.

Ugunduzi unaanza na mchezo wa PING-PONG. PING-PONG iliyofanikiwa "inaunganisha" nodi mpya na nodi ya uanzishaji. Ujumbe wa awali unaoarifu nodi ya uanzishaji kuhusu uwepo wa nodi mpya inayoingia kwenye mtandao ni `PING`. `PING` hii inajumuisha taarifa zilizofanywa heshi kuhusu nodi mpya, nodi ya uanzishaji na muhuri wa muda wa kuisha. Nodi ya uanzishaji inapokea `PING` na kurudisha `PONG` yenye heshi ya `PING`. Ikiwa heshi za `PING` na `PONG` zinalingana basi muunganisho kati ya nodi mpya na nodi ya uanzishaji unathibitishwa na inasemekana "zimeungana".

Zikishaungana, nodi mpya inaweza kutuma ombi la `FIND-NEIGHBOURS` kwa nodi ya uanzishaji. Data inayorudishwa na nodi ya uanzishaji inajumuisha orodha ya wenza ambao nodi mpya inaweza kuungana nao. Ikiwa nodi hazijaungana, ombi la `FIND-NEIGHBOURS` litashindwa, hivyo nodi mpya haitaweza kuingia kwenye mtandao.

Mara tu nodi mpya inapopokea orodha ya majirani kutoka kwa nodi ya uanzishaji, inaanza mabadilishano ya PING-PONG na kila mmoja wao. PING-PONG zilizofanikiwa huunganisha nodi mpya na majirani zake, kuwezesha mabadilishano ya ujumbe.

```
anzisha kiteja --> unganisha na nodi ya uanzishaji --> ungana na nodi ya uanzishaji --> tafuta majirani --> ungana na majirani
```

Viteja vya utekelezaji kwa sasa vinatumia itifaki ya ugunduzi ya [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) na kuna juhudi zinazoendelea za kuhamia kwenye itifaki ya [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Rekodi za Nodi za Ethereum {#enr}

[Rekodi ya Nodi ya Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) ni kipengee kinachojumuisha vipengele vitatu vya msingi: sahihi (heshi ya yaliyomo kwenye rekodi iliyotengenezwa kulingana na mpango fulani wa utambulisho uliokubaliwa), nambari ya mfuatano inayofuatilia mabadiliko kwenye rekodi, na orodha holela ya jozi za ufunguo:thamani. Huu ni muundo unaostahimili mabadiliko ya baadaye unaoruhusu mabadilishano rahisi ya taarifa za utambulisho kati ya wenza wapya na ndio muundo unaopendelewa wa [anwani ya mtandao](/developers/docs/networking-layer/network-addresses) kwa nodi za Ethereum.

#### Kwa nini ugunduzi umejengwa kwenye UDP? {#why-udp}

UDP haiauni ukaguzi wowote wa makosa, kutuma tena pakiti zilizoshindwa, au kufungua na kufunga miunganisho kwa nguvu - badala yake inarusha tu mtiririko endelevu wa taarifa kwenye lengo, bila kujali kama imepokelewa kwa mafanikio. Utendaji huu mdogo pia unatafsiriwa kuwa mzigo mdogo wa ziada, na kufanya aina hii ya muunganisho kuwa wa haraka sana. Kwa ugunduzi, ambapo nodi inataka tu kujulisha uwepo wake ili kisha kuanzisha muunganisho rasmi na mwenza, UDP inatosha. Hata hivyo, kwa sehemu iliyosalia ya mkusanyiko wa mtandao, UDP haifai kwa dhumuni hilo. Mabadilishano ya taarifa kati ya nodi ni changamano kiasi na hivyo yanahitaji itifaki yenye vipengele kamili zaidi inayoweza kusaidia kutuma tena, kukagua makosa n.k. Mzigo wa ziada unaohusishwa na TCP unastahili utendaji wa ziada. Kwa hivyo, sehemu kubwa ya mkusanyiko wa P2P inafanya kazi kupitia TCP.

### DevP2P {#devp2p}

DevP2P yenyewe ni mkusanyiko mzima wa itifaki ambazo Ethereum inatekeleza ili kuanzisha na kudumisha mtandao wa rika-kwa-rika. Baada ya nodi mpya kuingia kwenye mtandao, mwingiliano wao unasimamiwa na itifaki katika mkusanyiko wa [DevP2P](https://github.com/ethereum/devp2p). Hizi zote zinakaa juu ya TCP na zinajumuisha itifaki ya usafirishaji ya RLPx, itifaki ya waya na itifaki ndogo kadhaa. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) ni itifaki inayosimamia kuanzisha, kuthibitisha na kudumisha vipindi kati ya nodi. RLPx husimba ujumbe kwa kutumia RLP (Recursive Length Prefix) ambayo ni njia inayotumia nafasi vizuri sana ya kusimba data katika muundo mdogo kwa ajili ya kutuma kati ya nodi.

Kipindi cha RLPx kati ya nodi mbili huanza na salamu ya awali ya kificho. Hii inahusisha nodi kutuma ujumbe wa uthibitisho ambao kisha unathibitishwa na mwenza. Baada ya uthibitisho kufanikiwa, mwenza hutengeneza ujumbe wa kukiri uthibitisho ili kurudisha kwa nodi iliyoanzisha. Huu ni mchakato wa kubadilishana ufunguo unaowezesha nodi kuwasiliana kwa faragha na kwa usalama. Salamu ya kificho iliyofanikiwa kisha huchochea nodi zote mbili kutumiana ujumbe wa "hello" "kwenye waya". Itifaki ya waya inaanzishwa na mabadilishano yaliyofanikiwa ya jumbe za hello.

Jumbe za hello zinajumuisha:

- toleo la itifaki
- kitambulisho cha kiteja
- lango
- kitambulisho cha nodi
- orodha ya itifaki ndogo zinazoauniwa

Hizi ni taarifa zinazohitajika kwa mwingiliano uliofanikiwa kwa sababu zinafafanua uwezo gani unashirikiwa kati ya nodi zote mbili na kusanidi mawasiliano. Kuna mchakato wa majadiliano ya itifaki ndogo ambapo orodha za itifaki ndogo zinazoauniwa na kila nodi zinalinganishwa na zile zinazofanana kwa nodi zote mbili zinaweza kutumika katika kipindi.

Pamoja na jumbe za hello, itifaki ya waya inaweza pia kutuma ujumbe wa "tenganisha" unaotoa onyo kwa mwenza kwamba muunganisho utafungwa. Itifaki ya waya pia inajumuisha jumbe za PING na PONG ambazo hutumwa mara kwa mara ili kuweka kipindi wazi. Mabadilishano ya RLPx na itifaki ya waya kwa hivyo huanzisha misingi ya mawasiliano kati ya nodi, kutoa kiunzi cha taarifa muhimu kubadilishwa kulingana na itifaki ndogo mahususi.

### Itifaki ndogo {#sub-protocols}

#### Itifaki ya waya {#wire-protocol}

Mara tu wenza wanapounganishwa, na kipindi cha RLPx kimeanzishwa, itifaki ya waya inafafanua jinsi wenza wanavyowasiliana. Hapo awali, itifaki ya waya ilifafanua kazi tatu kuu: usawazishaji wa mnyororo, usambazaji wa kitalu na mabadilishano ya miamala. Hata hivyo, mara tu Ethereum ilipobadilika kwenda kwenye Uthibitisho wa Dau (PoS), usambazaji wa kitalu na usawazishaji wa mnyororo vikawa sehemu ya tabaka la mwafaka. Mabadilishano ya miamala bado yapo chini ya mamlaka ya viteja vya utekelezaji. Mabadilishano ya miamala inarejelea kubadilishana miamala inayosubiri kati ya nodi ili wajenzi wa kitalu waweze kuchagua baadhi yao kwa ajili ya kujumuishwa kwenye kitalu kinachofuata. Taarifa za kina kuhusu kazi hizi zinapatikana [hapa](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Viteja vinavyoauni itifaki ndogo hizi huziweka wazi kupitia [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (itifaki ndogo nyepesi ya Ethereum) {#les}

Hii ni itifaki ndogo kwa ajili ya kusawazisha viteja vyepesi. Kijadi itifaki hii imekuwa ikitumika mara chache kwa sababu nodi kamili zinahitajika kuhudumia data kwa viteja vyepesi bila kupewa motisha. Tabia ya msingi ya viteja vya utekelezaji si kuhudumia data ya kiteja chepesi kupitia les. Taarifa zaidi zinapatikana katika [vipimo](https://github.com/ethereum/devp2p/blob/master/caps/les.md) vya les.

#### Snap {#snap}

[Itifaki ya snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) ni kiendelezi cha hiari kinachoruhusu wenza kubadilishana picha za hali za hivi karibuni, kuruhusu wenza kuthibitisha data ya akaunti na hifadhi bila kulazimika kupakua nodi za kati za Merkle trie.

#### Wit (itifaki ya shahidi) {#wit}

[Itifaki ya shahidi](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) ni kiendelezi cha hiari kinachowezesha mabadilishano ya mashahidi wa hali kati ya wenza, kusaidia kusawazisha viteja hadi kwenye ncha ya mnyororo.

#### Whisper {#whisper}

Whisper ilikuwa itifaki iliyolenga kutoa ujumbe salama kati ya wenza bila kuandika taarifa yoyote kwenye mnyororo wa vitalu. Ilikuwa sehemu ya itifaki ya waya ya DevP2P lakini sasa imeachwa kutumika. [Miradi mingine inayohusiana](https://wakunetwork.com/) ipo yenye malengo sawa.

## Tabaka la mwafaka {#consensus-layer}

Wateja wa mwafaka hushiriki katika mtandao tofauti wa rika-kwa-rika wenye vipimo tofauti. Wateja wa mwafaka wanahitaji kushiriki katika uvumi wa kitalu ili waweze kupokea vitalu vipya kutoka kwa wenza na kuvisambaza wakati ni zamu yao kuwa mpendekezaji wa bloku. Sawa na tabaka la utekelezaji, hii kwanza inahitaji itifaki ya ugunduzi ili nodi iweze kupata wenza na kuanzisha vipindi salama kwa ajili ya kubadilishana vitalu, uthibitisho n.k.

### Ugunduzi {#consensus-discovery}

Sawa na viteja vya utekelezaji, wateja wa mwafaka hutumia [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) kupitia UDP kwa ajili ya kutafuta wenza. Utekelezaji wa tabaka la mwafaka wa discv5 unatofautiana na ule wa viteja vya utekelezaji tu kwa kuwa unajumuisha adapta inayounganisha discv5 kwenye mkusanyiko wa [libP2P](https://libp2p.io/), na kuacha kutumia DevP2P. Vipindi vya RLPx vya tabaka la utekelezaji vimeachwa kutumika kwa kupendelea salamu ya njia salama ya kelele ya libP2P.

### ENR {#consensus-enr}

ENR kwa nodi za mwafaka inajumuisha ufunguo wa umma wa nodi, anwani ya IP, lango za UDP na TCP na nyanja mbili mahususi za mwafaka: uwanja wa biti wa mtandao mdogo wa uthibitisho na ufunguo wa `eth2`. Ya kwanza inafanya iwe rahisi kwa nodi kupata wenza wanaoshiriki katika mitandao midogo mahususi ya uvumi wa uthibitisho. Ufunguo wa `eth2` una taarifa kuhusu toleo gani la mchepuo wa Ethereum ambalo nodi inatumia, kuhakikisha wenza wanaunganishwa kwenye Ethereum sahihi.

### libP2P {#libp2p}

Mkusanyiko wa libP2P unaauni mawasiliano yote baada ya ugunduzi. Viteja vinaweza kupiga na kusikiliza kwenye IPv4 na/au IPv6 kama ilivyofafanuliwa katika ENR yao. Itifaki kwenye tabaka la libP2P zinaweza kugawanywa katika vikoa vya uvumi na maombi/majibu (req/resp).

### Uvumi {#gossip}

Kikoa cha uvumi kinajumuisha taarifa zote ambazo lazima zisambae kwa haraka kwenye mtandao wote. Hii inajumuisha vitalu vya kinara, ushahidi, uthibitisho, kutoka na ukataji. Hii inapitishwa kwa kutumia libP2P gossipsub v1 na inategemea data fafanuzi mbalimbali kuhifadhiwa ndani ya kila nodi, ikiwa ni pamoja na ukubwa wa juu wa mizigo ya uvumi ya kupokea na kutuma. Taarifa za kina kuhusu kikoa cha uvumi zinapatikana [hapa](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Ombi-jibu {#request-response}

Kikoa cha ombi-jibu kina itifaki kwa ajili ya viteja kuomba taarifa mahususi kutoka kwa wenza wao. Mifano inajumuisha kuomba vitalu vya kinara mahususi vinavyolingana na heshi fulani za mzizi au ndani ya masafa ya nafasi. Majibu kila wakati hurudishwa kama baiti zilizosimbwa za SSZ zilizobanwa kwa snappy.

## Kwa nini mteja wa mwafaka anapendelea SSZ kuliko RLP? {#ssz-vs-rlp}

SSZ inasimama kwa usanjari rahisi. Inatumia ofseti zisizobadilika ambazo hufanya iwe rahisi kusimbua sehemu binafsi za ujumbe uliosimbwa bila kulazimika kusimbua muundo mzima, jambo ambalo ni muhimu sana kwa mteja wa mwafaka kwani inaweza kuchukua kwa ufanisi vipande mahususi vya taarifa kutoka kwenye jumbe zilizosimbwa. Pia imeundwa mahususi kuunganishwa na itifaki za Merkle, na faida zinazohusiana za ufanisi kwa Merkleization. Kwa kuwa heshi zote katika tabaka la mwafaka ni mizizi ya Merkle, hii inaongeza uboreshaji mkubwa. SSZ pia inahakikisha uwakilishi wa kipekee wa thamani.

## Kuunganisha viteja vya utekelezaji na wateja wa mwafaka {#connecting-clients}

Wateja wa mwafaka na viteja vya utekelezaji vyote vinafanya kazi sambamba. Vinahitaji kuunganishwa ili mteja wa mwafaka aweze kutoa maagizo kwa kiteja cha utekelezaji, na kiteja cha utekelezaji kiweze kupitisha vifurushi vya miamala kwa mteja wa mwafaka ili kujumuisha kwenye vitalu vya kinara. Mawasiliano kati ya viteja hivi viwili yanaweza kufikiwa kwa kutumia muunganisho wa ndani wa RPC. API inayojulikana kama ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) inafafanua maagizo yanayotumwa kati ya viteja hivi viwili. Kwa kuwa viteja vyote viwili vinakaa nyuma ya utambulisho mmoja wa mtandao, vinashiriki ENR (rekodi ya nodi ya Ethereum) ambayo ina ufunguo tofauti kwa kila kiteja (ufunguo wa Eth1 na ufunguo wa Eth2).

Muhtasari wa mtiririko wa udhibiti umeonyeshwa hapa chini, na mkusanyiko husika wa mtandao kwenye mabano.

### Wakati mteja wa mwafaka si mzalishaji wa kitalu: {#when-consensus-client-is-not-block-producer}

- Mteja wa mwafaka anapokea kitalu kupitia itifaki ya uvumi wa kitalu (p2p ya mwafaka)
- Mteja wa mwafaka anathibitisha kitalu mapema, yaani, anahakikisha kimefika kutoka kwa mtumaji halali na data fafanuzi sahihi
- Miamala katika kitalu inatumwa kwenye tabaka la utekelezaji kama mzigo wa utekelezaji (muunganisho wa ndani wa RPC)
- Tabaka la utekelezaji linatekeleza miamala na kuthibitisha hali katika kichwa cha kizuizi (yaani, hukagua heshi zinalingana)
- Tabaka la utekelezaji linapitisha data ya uthibitisho kurudi kwenye tabaka la mwafaka, kitalu sasa kinachukuliwa kuwa kimethibitishwa (muunganisho wa ndani wa RPC)
- Tabaka la mwafaka linaongeza kitalu kwenye kichwa cha mnyororo wa vitalu wake na kukithibitisha, kusambaza uthibitisho kwenye mtandao (p2p ya mwafaka)

### Wakati mteja wa mwafaka ni mzalishaji wa kitalu: {#when-consensus-client-is-block-producer}

- Mteja wa mwafaka anapokea taarifa kwamba yeye ndiye mzalishaji wa kitalu anayefuata (p2p ya mwafaka)
- Tabaka la mwafaka linaita mbinu ya `create block` katika kiteja cha utekelezaji (RPC ya ndani)
- Tabaka la utekelezaji linafikia mempool ya miamala ambayo imejazwa na itifaki ya uvumi wa miamala (p2p ya utekelezaji)
- Kiteja cha utekelezaji kinafungasha miamala kwenye kitalu, kutekeleza miamala na kutengeneza heshi ya kitalu
- Mteja wa mwafaka anachukua miamala na heshi ya kitalu kutoka kwa kiteja cha utekelezaji na kuziongeza kwenye kitalu cha kinara (RPC ya ndani)
- Mteja wa mwafaka anasambaza kitalu kupitia itifaki ya uvumi wa kitalu (p2p ya mwafaka)
- Viteja vingine vinapokea kitalu kilichopendekezwa kupitia itifaki ya uvumi wa kitalu na kuthibitisha kama ilivyoelezwa hapo juu (p2p ya mwafaka)

Mara tu kitalu kinapothibitishwa na wathibitishaji wa kutosha kinaongezwa kwenye kichwa cha mnyororo, kuhalalishwa na hatimaye kukamilishwa.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Mchoro wa tabaka la mtandao kwa wateja wa mwafaka na viteja vya utekelezaji, kutoka [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Usomaji Zaidi {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Vipimo vya mtandao vya tabaka la mwafaka](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[kademlia hadi discv5](https://vac.dev/kademlia-to-discv5)
[karatasi ya kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[utangulizi wa p2p ya Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[uhusiano wa Eth1/Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[video ya maelezo ya muungano na kiteja cha Eth2](https://www.youtube.com/watch?v=zNIrIninMgg)