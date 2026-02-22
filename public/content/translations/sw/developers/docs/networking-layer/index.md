---
title: Safu ya mtandao
description: Utangulizi wa safu ya mtandao wa Ethereum.
lang: sw
sidebarDepth: 2
---

Ethereum ni mtandao wa rika-kwa-rika wenye maelfu ya nodi ambazo lazima ziweze kuwasiliana kwa kutumia itifaki sanifu. "Safu ya mtandao" ni mrundiko wa itifaki zinazoruhusu nodi hizo kupatana na kubadilishana habari. Hii inajumuisha kusambaza habari kwa njia ya "gossiping" (mawasiliano ya mmoja-kwa-wengi) kwenye mtandao pamoja na kubadilishana maombi na majibu kati ya nodi maalum (mawasiliano ya mmoja-kwa-mmoja). Kila nodi lazima ifuate sheria maalum za mtandao ili kuhakikisha inatuma na kupokea habari sahihi.

Kuna sehemu mbili za programu ya mteja (wateja wa utekelezaji na wateja wa makubaliano), kila moja ikiwa na mrundiko wake tofauti wa mtandao. Pamoja na kuwasiliana na nodi zingine za Ethereum, wateja wa utekelezaji na wateja wa makubaliano wanapaswa kuwasiliana wao kwa wao. Ukurasa huu unatoa maelezo ya utangulizi ya itifaki zinazowezesha mawasiliano haya.

Wateja wa utekelezaji husambaza miamala kwa njia ya uvumi kwenye mtandao wa rika-kwa-rika wa safu ya utekelezaji. Hii inahitaji mawasiliano yaliyosimbwa kwa njia fiche kati ya rika zilizothibitishwa. Mthibitishaji anapochaguliwa kupendekeza bloku, miamala kutoka kwenye bwawa la miamala la ndani la nodi itapitishwa kwa wateja wa makubaliano kupitia muunganisho wa RPC wa ndani, ambayo itawekwa kwenye bloku za Beacon. Wateja wa makubaliano kisha watasambaza bloku za Beacon kwa njia ya uvumi kwenye mtandao wao wa p2p. Hii inahitaji mitandao miwili tofauti ya p2p: mmoja unaounganisha wateja wa utekelezaji kwa ajili ya usambazaji wa uvumi wa miamala na mwingine unaounganisha wateja wa makubaliano kwa ajili ya usambazaji wa uvumi wa bloku.

## Mahitaji ya awali {#prerequisites}

Ujuzi fulani kuhusu [nodi na wateja](/developers/docs/nodes-and-clients/) wa Ethereum utasaidia katika kuelewa ukurasa huu.

## Safu ya Utekelezaji {#execution-layer}

Itifaki za mtandao za safu ya utekelezaji zimegawanywa katika mirundiko miwili:

- mrundiko wa ugunduzi: umejengwa juu ya UDP na unaruhusu nodi mpya kupata rika za kuunganisha nazo

- mrundiko wa DevP2P: unakaa juu ya TCP na huwezesha nodi kubadilishana habari

Mirundiko yote miwili hufanya kazi sambamba. Mrundiko wa ugunduzi huleta washiriki wapya kwenye mtandao, na mrundiko wa DevP2P huwezesha mwingiliano wao.

### Ugunduzi {#discovery}

Ugunduzi ni mchakato wa kupata nodi zingine kwenye mtandao. Hii huanzishwa kwa kutumia seti ndogo ya 'bootnodes' (nodi ambazo anwani zake [zimewekwa kwa msimbo mgumu](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) kwenye mteja ili ziweze kupatikana mara moja na kuunganisha mteja na rika). Hizi 'bootnodes' zipo tu kwa ajili ya kutambulisha nodi mpya kwa seti ya rika - hili ndilo kusudi lao pekee, hazishiriki katika kazi za kawaida za mteja kama kusawazisha mnyororo, na zinatumika tu mara ya kwanza kabisa mteja anapoanzishwa.

Itifaki inayotumika kwa mwingiliano wa nodi-bootnode ni toleo lililobadilishwa la [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) ambalo hutumia [jedwali la hashi lililosambazwa](https://en.wikipedia.org/wiki/Distributed_hash_table) kushiriki orodha za nodi. Kila nodi ina toleo la jedwali hili lenye habari inayohitajika kuungana na rika zake za karibu. Huu 'ukaribu' si wa kijiografia - umbali unafafanuliwa na mfanano wa kitambulisho cha nodi. Jedwali la kila nodi huburudishwa mara kwa mara kama kipengele cha usalama. Kwa mfano, katika itifaki ya ugunduzi ya [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), nodi pia zinaweza kutuma 'matangazo' yanayoonyesha itifaki-ndogo ambazo mteja anaunga mkono, na hivyo kuruhusu rika kujadiliana kuhusu itifaki ambazo zote zinaweza kutumia kuwasiliana.

Ugunduzi huanza na mchezo wa PING-PONG. PING-PONG yenye mafanikio "huunganisha" nodi mpya na bootnode. Ujumbe wa kwanza unaoarifu bootnode juu ya kuwepo kwa nodi mpya inayoingia kwenye mtandao ni `PING`. `PING` hii inajumuisha habari iliyohashiwa kuhusu nodi mpya, bootnode na muhuri wa muda wa kuisha. Bootnode hupokea `PING` na kurudisha `PONG` iliyo na hashi ya `PING`. Ikiwa hashi za `PING` na `PONG` zikifanana basi muunganisho kati ya nodi mpya na bootnode unathibitishwa na husemekana kuwa "zimeunganishwa".

Mara baada ya kuunganishwa, nodi mpya inaweza kutuma ombi la `FIND-NEIGHBOURS` kwa bootnode. Data inayorudishwa na bootnode inajumuisha orodha ya rika ambazo nodi mpya inaweza kuunganisha nazo. Ikiwa nodi hazijaunganishwa, ombi la `FIND-NEIGHBOURS` litashindwa, kwa hivyo nodi mpya haitaweza kuingia kwenye mtandao.

Mara tu nodi mpya inapopokea orodha ya majirani kutoka kwa bootnode, huanza ubadilishanaji wa PING-PONG na kila mmoja wao. PING-PONG zenye mafanikio huunganisha nodi mpya na majirani zake, na kuwezesha ubadilishanaji wa ujumbe.

```
anza mteja --> unganisha kwenye bootnode --> unganisha na bootnode --> tafuta majirani --> unganisha na majirani
```

Wateja wa utekelezaji kwa sasa wanatumia itifaki ya ugunduzi ya [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) na kuna juhudi zinazoendelea za kuhamia kwenye itifaki ya [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Rekodi za Nodi za Ethereum {#enr}

[Rekodi ya Nodi ya Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) ni kitu chenye vipengele vitatu vya msingi: saini (hashi ya yaliyomo kwenye rekodi iliyotengenezwa kulingana na mpango fulani wa utambulisho uliokubaliwa), nambari ya mfuatano inayofuatilia mabadiliko kwenye rekodi, na orodha isiyo na mpangilio ya jozi za ufunguo:thamani. Hii ni fomati isiyopitwa na wakati inayoruhusu ubadilishanaji rahisi wa habari za utambulisho kati ya rika mpya na ndiyo fomati inayopendelewa ya [anwani ya mtandao](/developers/docs/networking-layer/network-addresses) kwa nodi za Ethereum.

#### Kwa nini ugunduzi umejengwa juu ya UDP? {#why-udp}

UDP haiungi mkono ukaguzi wowote wa makosa, kutuma tena pakiti zilizoshindwa, au kufungua na kufunga miunganisho kiotomatiki - badala yake inatuma tu mtiririko endelevu wa habari kwa lengo, bila kujali kama imepokelewa kwa mafanikio. Utendaji huu mdogo pia unamaanisha gharama ndogo, na kufanya aina hii ya muunganisho kuwa wa haraka sana. Kwa ugunduzi, ambapo nodi inataka tu kujulisha uwepo wake ili kuanzisha muunganisho rasmi na rika, UDP inatosha. Hata hivyo, kwa sehemu iliyobaki ya mrundiko wa mtandao, UDP haifai kwa madhumuni hayo. Ubadilishanaji wa habari kati ya nodi ni mgumu sana na kwa hiyo unahitaji itifaki iliyo na vipengele kamili inayoweza kuunga mkono utumaji upya, ukaguzi wa makosa n.k. Gharama ya ziada inayohusishwa na TCP inastahili utendaji wa ziada. Kwa hiyo, sehemu kubwa ya mrundiko wa P2P hufanya kazi juu ya TCP.

### DevP2P {#devp2p}

DevP2P yenyewe ni mrundiko mzima wa itifaki ambazo Ethereum hutekeleza kuanzisha na kudumisha mtandao wa rika-kwa-rika. Baada ya nodi mpya kuingia kwenye mtandao, mwingiliano wao unasimamiwa na itifaki katika mrundiko wa [DevP2P](https://github.com/ethereum/devp2p). Hizi zote ziko juu ya TCP na zinajumuisha itifaki ya usafirishaji ya RLPx, itifaki ya waya na itifaki-ndogo kadhaa. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) ni itifaki inayosimamia uanzishaji, uthibitishaji na udumishaji wa vipindi kati ya nodi. RLPx husimba ujumbe kwa kutumia RLP (Recursive Length Prefix) ambayo ni njia yenye ufanisi mkubwa wa nafasi ya kusimba data katika muundo mdogo kwa ajili ya kutuma kati ya nodi.

Kipindi cha RLPx kati ya nodi mbili huanza na mpeano wa mikono wa awali wa kikriptografia. Hii inahusisha nodi kutuma ujumbe wa uthibitisho ambao kisha huthibitishwa na rika. Baada ya uthibitisho wenye mafanikio, rika hutengeneza ujumbe wa uthibitisho-wa-kukubali kurudisha kwa nodi iliyoanzisha. Huu ni mchakato wa kubadilishana funguo unaowezesha nodi kuwasiliana kwa faragha na kwa usalama. Mpeano wa mikono wa kikriptografia wenye mafanikio kisha huchochea nodi zote mbili kutuma ujumbe wa "hello" kwa kila mmoja "kwenye waya". Itifaki ya waya huanzishwa na ubadilishanaji wenye mafanikio wa ujumbe wa hello.

Ujumbe wa hello una:

- toleo la itifaki
- kitambulisho cha mteja
- bandari
- kitambulisho cha nodi
- orodha ya itifaki-ndogo zinazotumika

Hii ni habari inayohitajika kwa mwingiliano wenye mafanikio kwa sababu inafafanua uwezo gani unashirikiwa kati ya nodi zote mbili na inasanidi mawasiliano. Kuna mchakato wa majadiliano ya itifaki-ndogo ambapo orodha za itifaki-ndogo zinazotumika na kila nodi zinalinganishwa na zile ambazo ni za kawaida kwa nodi zote mbili zinaweza kutumika katika kipindi.

Pamoja na ujumbe wa hello, itifaki ya waya inaweza pia kutuma ujumbe wa "kukata muunganisho" unaotoa onyo kwa rika kwamba muunganisho utafungwa. Itifaki ya waya pia inajumuisha ujumbe wa PING na PONG ambao hutumwa mara kwa mara ili kuweka kipindi wazi. Kwa hivyo, ubadilishanaji wa itifaki za RLPx na waya huweka misingi ya mawasiliano kati ya nodi, na kutoa jukwaa la habari muhimu kubadilishwa kulingana na itifaki-ndogo maalum.

### Itifaki-ndogo {#sub-protocols}

#### Itifaki ya waya {#wire-protocol}

Mara tu rika zinapounganishwa, na kipindi cha RLPx kimeanzishwa, itifaki ya waya inafafanua jinsi rika zinavyowasiliana. Hapo awali, itifaki ya waya ilifafanua kazi tatu kuu: usawazishaji wa mnyororo, uenezaji wa bloku na ubadilishanaji wa miamala. Hata hivyo, mara tu Ethereum ilipohamia kwenye uthibitisho wa hisa, uenezaji wa bloku na usawazishaji wa mnyororo ukawa sehemu ya safu ya makubaliano. Ubadilishanaji wa miamala bado uko chini ya mamlaka ya wateja wa utekelezaji. Ubadilishanaji wa miamala unamaanisha kubadilishana miamala inayosubiri kati ya nodi ili wajenzi wa bloku waweze kuchagua baadhi yao kwa ajili ya kujumuishwa katika bloku inayofuata. Taarifa za kina kuhusu kazi hizi zinapatikana [hapa](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Wateja wanaounga mkono itifaki-ndogo hizi huzionesha kupitia [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (itifaki-ndogo nyepesi ya Ethereum) {#les}

Hii ni itifaki ndogo kwa ajili ya kusawazisha wateja wepesi. Kijadi itifaki hii haijatumiwa sana kwa sababu nodi kamili zinahitajika kutoa data kwa wateja wepesi bila kupewa motisha. Tabia chaguomsingi ya wateja wa utekelezaji si kutoa data ya wateja wepesi kupitia les. Taarifa zaidi zinapatikana katika [vipimo](https://github.com/ethereum/devp2p/blob/master/caps/les.md) vya les.

#### Snap {#snap}

Itifaki ya [snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) ni kiendelezi cha hiari kinachoruhusu rika kubadilishana picha za hali za hivi karibuni, kuruhusu rika kuthibitisha data ya akaunti na ghala bila kulazimika kupakua nodi za kati za Merkle trie.

#### Wit (itifaki ya shahidi) {#wit}

[Itifaki ya shahidi](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) ni kiendelezi cha hiari kinachowezesha ubadilishanaji wa mashahidi wa hali kati ya rika, kusaidia kusawazisha wateja hadi ncha ya mnyororo.

#### Whisper {#whisper}

Whisper ilikuwa itifaki iliyolenga kutoa ujumbe salama kati ya rika bila kuandika habari yoyote kwenye mnyororo wa bloku. Ilikuwa sehemu ya itifaki ya waya ya DevP2P lakini sasa imepitwa na wakati. [Miradi mingine inayohusiana](https://wakunetwork.com/) ipo yenye malengo sawa.

## Safu ya makubaliano {#consensus-layer}

Wateja wa makubaliano hushiriki katika mtandao tofauti wa rika-kwa-rika wenye vipimo tofauti. Wateja wa makubaliano wanahitaji kushiriki katika usambazaji wa bloku kwa njia ya uvumi ili waweze kupokea bloku mpya kutoka kwa rika na kuzitangaza inapokuwa zamu yao ya kuwa wapendekezaji wa bloku. Sawa na safu ya utekelezaji, hii kwanza inahitaji itifaki ya ugunduzi ili nodi iweze kupata rika na kuanzisha vipindi salama vya kubadilishana bloku, uthibitisho n.k.

### Ugunduzi {#consensus-discovery}

Sawa na wateja wa utekelezaji, wateja wa makubaliano hutumia [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) juu ya UDP kwa ajili ya kupata rika. Utekelezaji wa safu ya makubaliano ya discv5 unatofautiana na ule wa wateja wa utekelezaji tu kwa kuwa inajumuisha adapta inayounganisha discv5 kwenye mrundiko wa [libP2P](https://libp2p.io/), na kuacha kutumia DevP2P. Vipindi vya RLPx vya safu ya utekelezaji vimepitwa na wakati na badala yake kunatumiwa mpeano wa mikono wa kituo salama cha kelele cha libP2P.

### ENRs {#consensus-enr}

ENR ya nodi za makubaliano inajumuisha ufunguo wa umma wa nodi, anwani ya IP, bandari za UDP na TCP na sehemu mbili maalum za makubaliano: uwanja wa biti wa mtandao-mdogo wa uthibitisho na ufunguo wa `eth2`. Ya kwanza hurahisisha nodi kupata rika zinazoshiriki katika mitandao-midogo maalum ya usambazaji wa uthibitisho kwa njia ya uvumi. Ufunguo wa `eth2` una habari kuhusu toleo gani la uma la Ethereum ambalo nodi inatumia, kuhakikisha rika zinaunganisha na Ethereum sahihi.

### libP2P {#libp2p}

Mrundiko wa libP2P unaunga mkono mawasiliano yote baada ya ugunduzi. Wateja wanaweza kupiga na kusikiliza kwenye IPv4 na/au IPv6 kama ilivyofafanuliwa katika ENR zao. Itifaki kwenye safu ya libP2P zinaweza kugawanywa katika vikoa vya uvumi na req/resp.

### Uvumi {#gossip}

Kikoa cha uvumi kinajumuisha habari zote ambazo zinapaswa kuenea haraka kote kwenye mtandao. Hii inajumuisha bloku za beacon, thibitisho, uthibitisho, kutoka na adhabu. Hii inapitishwa kwa kutumia libP2P gossipsub v1 na inategemea metadata mbalimbali kuhifadhiwa ndani ya kila nodi, ikiwa ni pamoja na ukubwa wa juu wa mizigo ya uvumi kupokea na kusambaza. Taarifa za kina kuhusu kikoa cha uvumi zinapatikana [hapa](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Ombi-jibu {#request-response}

Kikoa cha ombi-jibu kina itifaki kwa ajili ya wateja wanaoomba taarifa maalum kutoka kwa rika zao. Mifano inajumuisha kuomba bloku maalum za Beacon zinazolingana na hashi fulani za mizizi au ndani ya safu ya nafasi. Majibu yanarudishwa kila wakati kama baiti zilizosimbwa za SSZ na kubanwa na snappy.

## Kwa nini mteja wa makubaliano anapendelea SSZ badala ya RLP? {#ssz-vs-rlp}

SSZ inasimama kwa ajili ya serialisheni rahisi. Inatumia viwianishi visivyobadilika vinavyorahisisha kusimbua sehemu binafsi za ujumbe uliosimbwa bila kulazimika kusimbua muundo mzima, jambo ambalo ni muhimu sana kwa mteja wa makubaliano kwani inaweza kuchukua kwa ufanisi vipande maalum vya habari kutoka kwa ujumbe uliosimbwa. Pia imeundwa mahususi kuunganishwa na itifaki za Merkle, na faida zinazohusiana na ufanisi kwa umerkeleshaji. Kwa kuwa hashi zote katika safu ya makubaliano ni mizizi ya Merkle, hii inaongeza uboreshaji mkubwa. SSZ pia inahakikisha uwakilishi wa kipekee wa thamani.

## Kuunganisha wateja wa utekelezaji na makubaliano {#connecting-clients}

Wateja wote wa makubaliano na utekelezaji hufanya kazi sambamba. Wanahitaji kuunganishwa ili mteja wa makubaliano aweze kutoa maelekezo kwa mteja wa utekelezaji, na mteja wa utekelezaji aweze kupitisha vifurushi vya miamala kwa mteja wa makubaliano ili kujumuisha katika bloku za Beacon. Mawasiliano kati ya wateja hao wawili yanaweza kufikiwa kwa kutumia muunganisho wa RPC wa ndani. API inayojulikana kama ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) inafafanua maelekezo yanayotumwa kati ya wateja hao wawili. Kwa kuwa wateja wote wawili wako nyuma ya utambulisho mmoja wa mtandao, wanashiriki ENR (rekodi ya nodi ya Ethereum) ambayo ina ufunguo tofauti kwa kila mteja (ufunguo wa eth1 na ufunguo wa eth2).

Muhtasari wa mtiririko wa udhibiti umeonyeshwa hapa chini, na mrundiko husika wa mtandao ukiwa kwenye mabano.

### Wakati mteja wa makubaliano si mzalishaji wa bloku: {#when-consensus-client-is-not-block-producer}

- Mteja wa makubaliano hupokea bloku kupitia itifaki ya uvumi wa bloku (consensus p2p)
- Mteja wa makubaliano anathibitisha awali bloku, yaani, anahakikisha imefika kutoka kwa mtumaji halali na metadata sahihi
- Miamala katika bloku inatumwa kwa safu ya utekelezaji kama mzigo wa utekelezaji (muunganisho wa RPC wa ndani)
- Safu ya utekelezaji inatekeleza miamala na kuthibitisha hali katika kichwa cha bloku (yaani, inakagua kama hashi zinalingana)
- Safu ya utekelezaji inarudisha data ya uthibitishaji kwenye safu ya makubaliano, bloku sasa inachukuliwa kuwa imethibitishwa (muunganisho wa RPC wa ndani)
- Safu ya makubaliano inaongeza bloku kwenye kichwa cha mnyororo wake wa bloku na kuithibitisha, ikitangaza uthibitisho huo kwenye mtandao (consensus p2p)

### Wakati mteja wa makubaliano ni mzalishaji wa bloku: {#when-consensus-client-is-block-producer}

- Mteja wa makubaliano hupokea taarifa kwamba ndiye mzalishaji wa bloku anayefuata (consensus p2p)
- Safu ya makubaliano huita mbinu ya `create block` katika mteja wa utekelezaji (RPC ya ndani)
- Safu ya utekelezaji hufikia mempool ya miamala ambayo imejaa kwa kutumia itifaki ya uvumi wa miamala (execution p2p)
- Mteja wa utekelezaji huweka miamala kwenye bloku, hutekeleza miamala na kutengeneza hashi ya bloku
- Mteja wa makubaliano huchukua miamala na hashi ya bloku kutoka kwa mteja wa utekelezaji na kuziongeza kwenye bloku ya beacon (RPC ya ndani)
- Mteja wa makubaliano hutangaza bloku kupitia itifaki ya uvumi wa bloku (consensus p2p)
- Wateja wengine hupokea bloku iliyopendekezwa kupitia itifaki ya uvumi wa bloku na kuthibitisha kama ilivyoelezwa hapo juu (consensus p2p)

Mara tu bloku inapothibitishwa na wathibitishaji wa kutosha, inaongezwa kwenye kichwa cha mnyororo, inahalalishwa na hatimaye kukamilishwa.

![](cons_client_net_layer.png)
![](exe_client_net_layer.png)

Mchoro wa safu ya mtandao kwa wateja wa makubaliano na utekelezaji, kutoka [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Masomo zaidi {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Vipimo vya mtandao vya safu ya makubaliano](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)
[kademlia hadi discv5](https://vac.dev/kademlia-to-discv5)
[karatasi ya kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[utangulizi wa Ethereum p2p](https://p2p.paris/en/talks/intro-ethereum-networking/)
[uhusiano wa eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[video ya maelezo ya muungano na mteja wa eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
