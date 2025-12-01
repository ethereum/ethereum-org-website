---
title: Prague-Electra (Pectra)
description: Foghlaim faoin uasghrádú ar phrótacal Pectra
lang: ga
---

# Pectra {#pectra}

Lean uasghrádú líonra Pectra [Dencun](/roadmap/dencun/) agus rinne sé athruithe ar shraith reatha agus chomhdhearcaidh Ethereum araon. Is meascán de Prág agus Electra an t-ainm giorraithe Pectra, arb iad na hainmneacha faoi seach iad do na hathruithe sonraíochta ar an tsraith reatha agus chomhdhearcaidh. Le chéile, tugann na hathruithe seo roinnt feabhsuithe d'úsáideoirí, d'fhorbróirí agus do bhailíochtóirí Ethereum.

Cuireadh an uasghrádú seo i ngníomh go rathúil ar phríomhlíonra Ethereum ag ep `364032`, ar **07-Bealtaine-2025 ag 10:05 (UTC)**.

<InfoBanner>
Níl in uasghrádú Pectra ach céim amháin i spriocanna forbartha fadtéarmacha Ethereum. Foghlaim tuilleadh faoin [treochlár prótacail](/roadmap/) agus [uasghráduithe roimhe seo](/history/).
</InfoBanner>

## Feabhsuithe i Pectra {#new-improvements}

Tugann Pectra an líon is mó [EIPanna](https://eips.ethereum.org/) i gcomparáid le haon uasghráduithe roimhe seo! Tá go leor athruithe beaga ann ach tá roinnt gnéithe nua suntasacha ann freisin. Is féidir an liosta iomlán de na hathruithe agus na sonraí teicniúla a fháil sna EIPanna aonair atá san áireamh.

### Cód cuntais EOA {#7702}

Is céim mhór i dtreo [teibíocht chuntais](/roadmap/account-abstraction/) fhorleathan é [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702). Leis an ngné seo, is féidir le húsáideoirí a seoladh ([EOA](/gluais/#eoa)) a shocrú le go síneofar é le conradh cliste. Tugann an EIP isteach cineál nua idirbhirt le feidhm shonrach - chun ligean d’úinéirí seoltaí údarú a shíniú a shocraíonn a seoladh chun conradh cliste roghnaithe a aithris.

Leis an EIP seo, is féidir le húsáideoirí liostáil i sparán in-ríomhchláraithe a cheadaíonn gnéithe nua cosúil le pacáil idirbheart, idirbhearta gan ghás agus rochtain sócmhainní saincheaptha le haghaidh scéimeanna aisghabhála malartacha. Comhcheanglaíonn an cur chuige hibrideach seo simplíocht na EOAanna le hin-ríomhchláraitheacht cuntas bunaithe ar chonradh.

Léigh tuilleadh eolais faoi 7702 [anseo](/roadmap/pectra/7702/)

### Méadaigh an t-iarmhéid éifeachtach uasta {#7251}

Is é 32 ETH an t-iarmhéid éifeachtach reatha atá ag an mbailíochtóir. Is é an méid íosta is gá chun páirt a ghlacadh sa chomhdhearcadh ach ag an am céanna an t-uasmhéid is féidir le bailíochtóir aonair a ghealladh.

Ardaíonn [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) an t-iarmhéid éifeachtach uasta is féidir go 2048 ETH, rud a chiallaíonn gur féidir le bailíochtóir aonair geall a chur anois idir 32 agus 2048 ETH. In ionad iolraithe de 32, is féidir le geallsealbhóirí anois méid treallach ETH a roghnú le geallchur agus luaíochtaí a fháil ar gach 1 ETH os cionn an íosmhéid. Mar shampla, má fhásann iarmhéid bailíochtóra lena luaíochtaí go 33 ETH, meastar gur cuid den iarmhéid éifeachtach an 1 ETH breise agus faigheann sé luaíochtaí.

Ach níl ach cuid den fheabhsú seo i sochar córas luach saothair níos fearr do bhailíochtóirí. Is féidir le [Geallchuradóirí](/staking/) atá ag rith il-bhailíochtóirí iad a chomhiomlánú anois in aon cheann amháin, rud a chuireann ar chumas oibriú níos éasca agus a laghdaíonn forchostais líonra. Ós rud é go gcuireann gach bailíochtóir i Slabhra Beacon síniú isteach i ngach ré, fásann na riachtanais bandaleithead le níos mó bailíochtóirí agus líon mór sínithe le scaipeadh. Bainfidh bailíochtóirí comhiomlánaithe an t-ualach den líonra agus osclóidh siad roghanna scálúcháin nua agus an tslándáil eacnamaíoch chéanna á coinneáil.

Léigh tuilleadh eolais faoi maxEB [anseo](/roadmap/pectra/maxeb/)

### Méadú ar thréchur bloba {#7691}

Soláthraíonn blobaí [infhaighteacht sonraí](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) do L2anna. Tugadh isteach iad san [uasghrádú líonra roimhe seo](/roadmap/dencun/).

Faoi láthair, díríonn an líonra ar 3 bhloba ar an meán in aghaidh an bhloic agus uasmhéid de 6 bhloba. Le [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), méadófar an meánlíon blobaí go 6, le huasmhéid de 9 in aghaidh an bhloic, rud a fhágann go méadófar an cumas le haghaidh uasrolluithe Ethereum. Cuidíonn an EIP seo leis an mbearna a líonadh go dtí go gcumasaíonn [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) comhaireamh blobaí níos airde fós.

### Méadaigh costas sonraí glaonna {#7623}

Roimh thiomsú [blobaí in uasghrádú Dencun](/roadmap/danksharding), bhí L2anna ag baint úsáide as [glao-shonraí](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) chun a gcuid sonraí a stóráil in Ethereum. Bíonn tionchar ag blobaí agus glao-shonraí araon ar úsáid bandaleithead Ethereum. Cé nach n-úsáideann formhór na mbloc ach méid íosta glao-shonraí, is féidir le bloic atá trom ar shonraí agus ina bhfuil go leor blobaí freisin a bheith díobhálach do líonra p2p Ethereum.

Chun aghaidh a thabhairt air seo, méadaíonn [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) praghsáil ghlao-shonraí, ach amháin i gcás idirbhearta a bhfuil mórán sonraí iontu. Cuireann sé seo teorainn leis an méid bloic is measa, tugann sé dreasacht do L2anna gan ach blobaí a úsáid agus fágann sé nach ndéantar difear do bhreis is 99% de na hidirbhearta.

### Scoir in-truiceartha ciseal reatha {#7002}

Faoi láthair, is oibríocht shraith chomhdhearcaidh í bailíochtóir a fhágáil agus [ETH geallta a tharraingt siar](/staking/withdrawals/) a éilíonn eochair bhailíochtóra ghníomhach, an eochair BLS chéanna a úsáideann an bailíochtóir chun dualgais ghníomhacha cosúil le dearbhuithe a dhéanamh. Is eochair fhuar ar leithligh í dintiúir aistarraingthe a fhaigheann an geall scoir ach nach féidir léi an scoir a spreagadh. Is é an t-aon bhealach le himeacht ag geallsealbhóirí ná teachtaireacht speisialta a sheoladh chuig líonra Slabhra Beacon atá sínithe ag baint úsáide as an eochair bailíochtóra ghníomhach. Tá sé seo teoranta i gcásanna ina bhfuil na dintiúir aistarraingthe agus an eochair bhailíochtóra i seilbh aonáin éagsúil nó nuair a chailltear an eochair bhailíochtóra.

Tugann [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) conradh nua isteach ar féidir é a úsáid chun an scoir a spreagadh ag baint úsáide as dintiúir aistarraingthe an tsraith reatha. Beidh geallsealbhóirí in ann a mbailíochtóir a fhágáil trí fheidhm a ghlaoch sa chonradh speisialta seo gan aon ghá le heochair shínithe a mbailíochtóra ná rochtain ar Slabhra Beacon ar chor ar bith. Rud tábhachtach, má chumasaítear aistarraingtí bailíochtóra ar an slabhra, is féidir prótacail gheallchur a chur ar fáil le toimhdí muiníne laghdaithe thar oibreoirí nóid.

### Taiscí bailíochtóra ar an slabhra {#6110}

Déantar taiscí bailíochtóra a phróiseáil faoi láthair le [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) ar feidhm í ar an Slabhra Beacon a bhailíonn sonraí ón tsraith reatha. Is cineál fiachais theicniúil é ón am roimh The Merge nuair a bhí Slabhra Beacon ina líonra ar leithligh agus nuair a b'éigean dó aird a thabhairt ar ath-eagrú cruthúnais oibre.

Is bealach nua é [EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) chun taiscí a sheachadadh ón gciseal reatha go dtí an ciseal comhdhearcaidh, rud a cheadaíonn próiseáil láithreach le níos lú castachta cur i bhfeidhm. Is bealach níos sláine é chun taiscí dúchasacha d'Ethereum cumaiscthe a láimhseáil. Cuidíonn sé freisin leis an bprótacal a ullmhú don todhchaí mar nach bhfuil taiscí stairiúla ag teastáil chun an nód a thosú, rud atá riachtanach le go n-éagfaidh an stair.

### Réamh-thiomsú le haghaidh BLS12-381 {#2537}

Is sraith speisialta conarthaí cliste iad réamh-thiomsuithe atá tógtha go díreach isteach sa Mheaisín Fíorúil Ethereum ([EVM](/developers/docs/evm/)). Murab ionann agus conarthaí rialta, ní imscarann ​​úsáideoirí réamh-thiomsú ach is cuid d'fheidhmiú an chliaint féin iad, scríofa ina theanga dhúchais (m.sh. Go, Java, srl., ní Solidity). Feidhmíonn réamh-thiomsú le haghaidh feidhmeanna caighdeánaithe a úsáidtear go forleathan amhail oibríochtaí cripteagrafaíochta. Is féidir le forbróirí conarthaí cliste glaoch ar réamh-thiomsúcháin mar chonradh rialta ach le níos mó slándála agus éifeachtúlachta.

Cuireann [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) réamh-thiomsúcháin nua le haghaidh oibríochtaí cuar thar [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Úsáideadh an cuar éilipseach seo go forleathan in éiceachórais chripteairgeadra a bhuíochas dá airíonna praiticiúla. Go sonrach, tá sé glactha ag ciseal comhdhearcaidh Ethereum, áit a n-úsáideann bailíochtóirí é.

Cuireann an réamh-thiomsú nua an cumas ar fáil do gach forbróir oibríochtaí cripteagrafaíochta a dhéanamh go héasca, go héifeachtúil agus go slán ag baint úsáide as an gcuar seo, mar shampla, sínithe a fhíorú. Is féidir le feidhmchláir ar slabhra a bhraitheann ar an gcuar seo a bheith níos éifeachtaí ó thaobh gáis de agus níos sláine ag brath ar réamh-thiomsú seachas ar chonradh saincheaptha éigin. Baineann sé seo go príomha le feidhmchláir ar mian leo réasúnú a dhéanamh faoi bhailíochtóirí laistigh den EVM, e.g. linnte geallchur, ath-gheallchur, cliaint éadroma, droichid ach freisin eolas nialasach.

### Freastal haiseanna bloc stairiúla ó staid {#2935}

Faoi láthair, soláthraíonn an EVM cód oibríochta `BLOCKHASH` a chuireann ar chumas forbróirí conarthaí hais bloic a aisghabháil go díreach sa chiseal reatha. Mar sin féin, níl sé seo teoranta ach do na 256 bloc deireanacha agus d'fhéadfadh sé a bheith ina fhadhb do chliaint gan staid amach anseo.

Cruthaíonn [EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) conradh córais nua ar féidir leis na 8192 haise bloc dheireanacha a úsáid mar shliotáin stórála. Cuidíonn sé seo leis an bprótacal a ullmhú don todhchaí le haghaidh rith gan staid agus éiríonn sé níos éifeachtaí nuair a ghlactar le triail verkle. Mar sin féin, seachas seo, is féidir le huasrolluithe leas a bhaint as seo láithreach, toisc gur féidir leo fiosrú a dhéanamh ar an gconradh go díreach le fuinneog stairiúil níos faide.

### Bog innéacs an choiste lasmuigh den Deimhniú {#7549}

Tá comhdhearcadh Slabhra Beacon bunaithe ar bhailíochtóirí ag caitheamh a vótaí don bhloc is déanaí agus don ré chríochnaithe. Tá 3 ghné san fhianú, 2 acu vótaí agus an tríú ceann luach innéacs an choiste.

Bogann [EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) an t-innéacs seo lasmuigh den teachtaireacht dearbhaithe sínithe, rud a fhágann go bhfuil sé níos éasca vótaí comhdhearcaidh a fhíorú agus a chomhiomlánú. Cuirfidh sé seo níos mó éifeachtúlachta ar chumas gach cliant comhthola agus is féidir leis feabhsuithe suntasacha feidhmíochta a thabhairt do chiorcaid nialasacha eolais chun comhdhearcadhl Ethereum a chruthú.

### Cuir sceideal blobaí le comhaid chumraíochta EL {#7840}

Is athrú simplí é [EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) a chuireann réimse nua le cumraíocht chliaint an tsraith reatha. Cumraíonn sé líon na mbloc, rud a chuireann ar chumas socruithe dinimiciúla a bheith ann maidir le sprioc agus uasmhéid líon na mblobaí in aghaidh an bhloic chomh maith le coigeartú táille na mblobaí. Le cumraíocht atá sainmhínithe go díreach, is féidir le cliaint castacht mhalartú na faisnéise seo a sheachaint trí API an Innill.

<InfoBanner>
Chun tuilleadh eolais a fháil faoin tionchar a bhíonn ag Pectra ort go sonrach mar úsáideoir, forbróir nó bailíochtóir Ethereum, féach ar <a href="https://epf.wiki/#/wiki/pectra-faq">Ceisteanna Coitianta Pectra</a>.
</InfoBanner>

## An mbíonn tionchar ag an uasghrádú seo ar gach nód agus bailíochtóir Ethereum? {#client-impact}

Sea, éilíonn uasghrádú Pectra nuashonruithe ar [chliaint reatha agus chliaint chomhdhearcaidh](/developers/docs/nodes-and-clients/) araon. Scaoilfidh gach príomhchliant Ethereum leaganacha a thacaíonn leis an bhforc crua atá marcáilte mar thosaíocht ard. Chun sioncrónú a choinneáil le hiar-uasghrádú líonra Ethereum, ní mór d'oibreoirí nód a chinntiú go bhfuil leagan cliant tacaithe á rith acu. Tabhair faoi deara go bhfuil an fhaisnéis faoi eisiúintí cliant íogair ó thaobh ama de, agus ba cheart d'úsáideoirí tagairt a dhéanamh do na nuashonruithe is déanaí le haghaidh na sonraí is déanaí.

## Conas is féidir ETH a thiontú tar éis an gabhal crua? {#scam-alert}

- **Níl aon ghníomh ag teastáil le haghaidh d’ETH**: Tar éis uasghrádú Ethereum Pectra, níl aon ghá le d’ETH a thiontú ná a uasghrádú. Fanfaidh iarmhéid do chuntais mar a chéile, agus beidh an ETH atá agat faoi láthair fós inrochtana ina fhoirm láithreach tar éis an ghabhail chrua.
- **Bí ar an airdeall ar Camscéimeanna!** <Emoji text="⚠️" /> \*\* tá aon duine a thugann treoir duit do ETH a "uasghrádú" i mbun scéiméireachta.\*\* Níl aon rud le déanamh agat maidir leis an uasghrádú seo. Ní dhéanfar aon difear do do shócmhainní. Cuimhnigh, is é fanacht ar an eolas an chosaint is fearr i gcoinne camscéimeanna.

[Tuilleadh maidir le camscéimeanna a aithint agus a sheachaint](/slándáil/)

## An foghlaimeoir amhairc den chuid is mó tú? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Cad atá san áireamh san uasghrádú ar Pectra? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Uasghrádú Ethereum Pectra: Cad is Gá a Bheith ar Eolas agat faoi Ghreamáin — Blockdaemon_

## Tuilleadh léitheoireachta {#further-reading}

- [Treochlár Ethereum](/roadmap/)
- [Ceisteanna Coitianta Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Leathanach eolais Pectra.wtf](https://pectra.wtf)
- [Conas a fheabhsaíonn Pectra taithí na ngeallchuradóirí](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Leathanach eolais EIP7702](https://eip7702.io/)
- [Forbróirí Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
