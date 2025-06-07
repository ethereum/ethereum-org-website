---
title: Slabhraí plasma
description: Réamhrá ar shlabhraí plasma mar réiteach scálaithe atá in úsáid faoi láthair ag pobal Ethereum.
lang: ga
incomplete: true
sidebarDepth: 3
---

Is blocshlabhra ar leith é slabhra Plasma atá fréamhaithe in Ethereum Mainnet ach a ritheann idirbhearta as slabhra lena mheicníocht féin le haghaidh bailíochtú bloc. Uaireanta tugtar slabhraí "mic" ar shlabhraí plasma, go bunúsach cóipeanna níos lú den Ethereum Mainnet. Úsáideann slabhraí plasma [cruthúnais calaoise](/glossary/#fraud-proof) (cosúil le [uas-scáluithe dóchasacha](/developers/docs/scaling/optimistic-rollups/)) chun díospóidí a eadránú.

Le crainn Merkle is féidir cruach gan teorainn de na slabhraí seo a chruthú ar féidir leo oibriú chun bandaleithead a dhíluchtú ó slabhraí máthar (lena n-áirítear Ethereum Mainnet). Mar sin féin, cé go bhfaigheann na slabhraí seo roinnt slándála ó Ethereum (trí chruthúnas calaoise), bíonn tionchar ag teorainneacha dearaidh ar a slándáil agus a n-éifeachtúlacht.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh tuiscint mhaith agat ar na hábhair bhunúsacha go léir agus tuiscint ardleibhéil ar [scálú Ethereum](/developers/docs/scaling/).

## Cad is Plasma ann?

Is creat é Plasma chun inscálaitheacht a fheabhsú i mblocshlabhraí poiblí cosúil le Ethereum. Mar a thuairiscítear sa [Pháipéar Bán Plasma](http://plasma.io/plasma.pdf) bunaidh, tógtar slabhraí Plasma ar bharr na mbloc slabhra eile (ar a dtugtar "fréamhshlabhra"). Síneann gach "slabhra mic" ón slabhra fréimhe agus déantar é a bhainistiú go ginearálta trí chonradh cliste a imscartar ar an máthairshlabhra.

Feidhmíonn an conradh Plasma, i measc nithe eile, mar [dhroichead](/developers/docs/bridges/) a ligeann d'úsáideoirí sócmhainní a aistriú idir Ethereum Mainnet agus an slabhra plasma. Cé go bhfágann sé seo go bhfuil siad cosúil le [ taobhshlabhraí](/developers/docs/scaling/sidechains/), baineann slabhraí plasma leas - ar a laghad, go pointe áirithe - as slándáil Ethereum Mainnet. Tá sé seo éagosúil le taobhshlabhraí atá freagrach as a gcuid slándála amháin.

## Conas a oibríonn Plasma?

Is iad na comhpháirteanna bunúsacha den chreat Plasma:

### Ríomh as slabhra {#offchain-computation}

Tá luas próiseála reatha Ethereum teoranta do ~ 15-20 idirbheart in aghaidh an tsoicind, a laghdaíonn féidearthacht ghearrthéarmach an scálaithe chun níos mó úsáideoirí a láimhseáil. Tá an fhadhb seo ann go príomha toisc go n-éilíonn [meicníocht comhaontú](/developers/docs/consensus-mechanisms/)l Ethereum go leor nóid piara-go-piara chun gach nuashonrú ar staid an bhlocshlabhra a fhíorú.

Cé go bhfuil gá le meicníocht chomhaontú Ethereum maidir le slándáil, ní fhéadfaidh sé a bheith i bhfeidhm ar gach cás úsáide. Mar shampla, b'fhéidir nach mbeadh a cuid íocaíochtaí laethúla ag teastáil ó Alice le Bob ar son cupán caife arna fhíorú ag líonra iomlán Ethereum ós rud é go bhfuil roinnt muiníne idir an dá pháirtí.

Is dóigh le Plasma nach gá do Ethereum Mainnet gach idirbheart a fhíorú. Ina áit sin, is féidir linn idirbhearta a phróiseáil as Mainnet, rud a fhágann nach mbeidh orainn gach idirbheart a bhailíochtú.

Tá gá le ríomh lasmuigh den slabhra toisc gur féidir le slabhraí Plasma barrfheabhsú a dhéanamh ar luas agus costas. Mar shampla, d’fhéadfadh slabhra Plasma “oibreoir” amháin a úsáid chun ordú agus bainistiú idirbheart a dhéanamh, agus is minic a dhéantar mar sin é. Le haonán amháin ag fíorú idirbhearta, tá amanna próiseála ar slabhra plasma níos tapúla ná Ethereum Mainnet.

### Gealltanais staide {#state-commitments}

Cé go ritheann Plasma idirbhearta as slabhra, socraítear iad ar phríomhshlabhra reatha Ethereum - murach sin, ní féidir le slabhraí Plasma leas a bhaint as ráthaíochtaí slándála Ethereum. Ach trí idirbhearta slabhra a thabhairt chun críche gan staid an tslabhra plasma a bheith ar an eolas, bhrisfí an tsamhail slándála agus cheadódh sé iomadú idirbheart neamhbhailí. Sin é an fáth go gceanglaítear ar an oibreoir, an t-aonán atá freagrach as bloic a tháirgeadh ar an slabhra plasma, "tiomantais staide" a fhoilsiú ar Ethereum go tréimhsiúil.

Teicníc chripteagrafach chun gealltanas a thabhairt do luach nó do ráiteas gan é a nochtadh do pháirtí eile is ea [scéim ghealltanais](https://en.wikipedia.org/wiki/Commitment_scheme). Tá tiomantais "ceangailteach" sa chiall nach féidir leat an luach nó an ráiteas a athrú nuair a bheidh tú tiomanta dó. Is éard atá i dtiomantais staide i Plasma ná "Fréamhacha Merkle" (díorthaithe ó [Merkle tree](/whitepaper/#merkle-trees)) a sheolann an t-oibreoir ag eatraimh chuig an gconradh Plasma ar an slabhra Ethereum.

Is bunchodanna cripteagrafacha iad fréamhacha Merkle a chuireann ar chumas comhbhrúite mhéideanna móra faisnéise. D'fhéadfadh fréamh Merkle (ar a dtugtar "blocfhréamh" sa chás seo) na hidirbhearta go léir i mbloc a léiriú. Le fréamhacha Merkle freisin bíonn sé níos éasca a fhíorú go bhfuil píosa beag sonraí mar chuid de thacar sonraí níos mó. Mar shampla, is féidir le húsáideoir [Cruthúnas Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) a tháirgeadh chun cuimsiú idirbheart i mbloc ar leith a chruthú.

Tá fréamhacha Merkle tábhachtach chun faisnéis a sholáthar do Ethereum faoin staid as slabhra. Is féidir leat smaoineamh ar fhréamhacha Merkle mar "phointí sábháil": tá an t-oibreoir ag rá, "Is é seo staid an tslabhra Plasma ag x pointe in am, agus is é seo an fhréamh Merkle mar chruthúnas." Tá an t-oibreoir tiomanta do _staid reatha_ an tslabhra plasma le fréamh Merkle, agus is é sin an fáth a dtugtar "tiomantas staide" air.

### Iontrálacha agus scoir {#entries-and-exits}

Chun go mbainfidh úsáideoirí Ethereum leas as Plasma, ní mór meicníocht a bheith ann chun cistí a aistriú idir slabhraí Mainnet agus plasma. Ní féidir linn éitear a sheoladh go treallach chuig seoladh ar an slabhra plasma, - tá na slabhraí seo neamh-chomhoiriúnach, mar sin theipfeadh ar an idirbheart nó chaillfí cistí dá bharr.

Úsáideann Plasma conradh máistir a ritheann ar Ethereum chun iontrálacha agus scoir úsáideoirí a phróiseáil. Tá an conradh máistir seo freagrach freisin as tiomantais staide a rianú (a míníodh níos luaithe) agus as iompar mímhacánta a phionósú trí chruthúnas calaoise (tuilleadh air seo níos déanaí).

#### Iontráil sa slabhra plasma {#entering-the-plasma-chain}

Chun iontráil sa slabhra plasma, beidh ar Alice (an t-úsáideoir) ETH nó aon chomhartha ERC-20 a thaisceadh sa chonradh plasma. Déanann an t-oibreoir plasma, a bhreathnaíonn ar thaiscí conartha, méid atá comhionann le héarlais tosaigh Alice a athchruthú agus scaoileann sé chuig a seoladh ar an slabhra plasma é. Éilítear ar Alice a fhianú go bhfuair sí na cistí ar an slabhra mic agus is féidir léi na cistí sin a úsáid le haghaidh idirbhearta.

#### Scor ón slabhra plasma {#exiting-the-plasma-chain}

Tá sé níos casta scor ón slabhra plasma ná dul isteach ann ar chúiseanna éagsúla. Is é an ceann is mó, cé go bhfuil faisnéis ag Ethereum faoi staid an tslabhra plasma, ní féidir leis a fhíorú an bhfuil an fhaisnéis fíor nó nach bhfuil. D'fhéadfadh úsáideoir mailíseach dearbhú mícheart a dhéanamh ("Tá 1000 ETH agam") agus fáil réidh le cruthúnais falsa a sholáthar chun tacú leis an éileamh.

Chun aistarraingtí mailíseacha a chosc, tugtar isteach “tréimhse dhúshláin”. Le linn na tréimhse dúshláin (seachtain de ghnáth), is féidir le duine ar bith agóid a dhéanamh i gcoinne iarratas aistarraingthe trí úsáid a bhaint as cruthúnas calaoise. Má éiríonn leis an dúshlán, diúltaítear don iarratas ar aistarraingt.

Mar sin féin, is gnách go mbíonn úsáideoirí macánta agus go ndéanann siad éilimh chearta faoi na cistí ar leo iad. Sa chás seo, cuirfidh Alice tús le hiarratas ar aistarraingt ar fhréamhshlabhra (Ethereum) trí idirbheart a chur isteach sa chonradh plasma.

Ní mór di cruthúnas Merkle a sholáthar freisin ag fíorú go raibh idirbheart a chruthaigh a cistí ar an slabhra Plasma san áireamh i mbloc. Tá sé seo riachtanach le haghaidh atriallta Plasma, ar nós [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), a úsáideann [Samhail Idirbheart Neamhchaite (UT)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Seasann cinn eile, ar nós [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), do chistí mar [chomharthaí neamh-idirmhalartacha](/developers/docs/standards/tokens/erc-721/) in ionad UTXOs. Éilíonn aistarraingt, sa chás seo, cruthúnas ar úinéireacht chomharthaí ar an slabhra Plasma. Déantar é seo tríd an dá idirbheart is déanaí a bhaineann leis an chomhartha a chur isteach agus cruthúnas Merkle a sholáthar lena bhfíoraítear cuimsiú na n-idirbheart sin i mbloc.

Ní mór don úsáideoir banna a chur leis an iarratas ar aistarraingt mar ráthaíocht ar iompar macánta. Má chruthaíonn iomaitheoir go bhfuil iarratas Alice ar aistarraingt neamhbhailí, gearrtar a banna, agus téann cuid de chuig an iomaitheoir mar luach saothair.

Má théann an tréimhse dúshláin in éag gan cruthúnas calaoise a sholáthar do dhuine ar bith, meastar go bhfuil iarratas Alice ar aistarraingt bailí, rud a ligeann di taiscí a aisghabháil ón gconradh Plasma ar Ethereum.

### Eadránú díospóide {#dispute-arbitration}

Cosúil le haon bhlocshlabhra, tá meicníocht ag teastáil ó shlabhraí plasma chun sláine na n-idirbheart a fhorghníomhú i gcás go ngníomhóidh rannpháirtithe go mailíseach (m.sh. cistí a chaitear faoi dhó). Chuige sin, úsáideann slabhraí plasma cruthúnais calaoise chun díospóidí a bhaineann le bailíocht aistrithe staide a eadránú agus pionós a ghearradh ar dhrochiompar. Úsáidtear cruthúnais chalaoise mar mheicníocht trína ndéanann slabhra leanaí Plasma gearán a chomhdú chuig a máthairshlabhra nó chuig an slabhra fréimhe.

Níl i gcruthúnas calaoise ach éileamh go bhfuil aistriú staide ar leith neamhbhailí. Sampla is ea má dhéanann úsáideoir (Alice) iarracht na cistí céanna a chaitheamh faoi dhó. B'fhéidir gur chaith sí an UTXO in idirbheart le Bob agus gur mhaith leis an UTXO céanna (atá anois ag Bob) a chaitheamh in idirbheart eile.

Chun an aistarraingt a chosc, soláthróidh Bob cruthúnas calaoise le fianaise gur chaith Alice an UTXO sin in idirbheart roimhe seo agus cruthúnas Merkle ar chuimsiú an idirbhirt i mbloc. Oibríonn an próiseas céanna i Plasma Cash - bheadh ​​ar Bob cruthúnas a sholáthar gur aistrigh Alice na comharthaí a bhfuil sí ag iarraidh a aistarraingt níos luaithe.

Má éiríonn le dúshlán Bob, cuirtear iarratas Alice a aistarraingt ar ceal. Mar sin féin, braitheann an cur chuige seo ar chumas Bob féachaint ar an slabhra le haghaidh iarratais ar aistarraingt. Má tá Bob as líne, is féidir le Alice an aistarraingt mhailíseach a phróiseáil a luaithe a théann an tréimhse dúshláin i léig.

## An fhadhb sluascoir i plasma {#the-mass-exit-problem-in-plasma}

Tarlaíonn an fhadhb sluascoir nuair a dhéanann líon mór úsáideoirí iarracht aistarraingt as slabhra plasma ag an am céanna. Baineann an fáth a bhfuil an fhadhb seo le ceann de na fadhbanna is mó atá ag Plasma: **neamh-infhaighteacht sonraí**.

Is éard atá in infhaighteacht sonraí ná an cumas a fhíorú gur foilsíodh an fhaisnéis le haghaidh bloic mholta i ndáiríre ar an líonra blocshlabhra. Níl bloc "ar fáil" má fhoilsíonn an táirgeoir an bloc féin ach go gcoinníonn sé siar na sonraí a úsáidtear chun an bloc a chruthú.

Ní mór bloic a bheith ar fáil má tá nóid le bheith in ann an bloc a íoslódáil agus bailíocht na n-idirbheart a fhíorú. Cinntíonn blocshlabhraí infhaighteacht sonraí trí iallach a chur ar tháirgeoirí bloc gach sonra idirbhirt a phostáil ar slabhra.

Cuidíonn infhaighteacht sonraí freisin le prótacail scálaithe slabhra a dhaingniú atá tógtha ar bhunchiseal Ethereum. Trí iallach a chur ar oibreoirí ar na slabhraí seo sonraí idirbheart a fhoilsiú ar Ethereum, is féidir le duine ar bith dúshlán a thabhairt do bhloic neamhbhailí trí chruthúnas calaoise a thógáil a thagraíonn do staid cheart an tslabhra.

Stórálann slabhraí plasma sonraí idirbhirt leis an oibreoir go príomha agus **ní fhoilsíonn siad aon sonraí ar Mainnet ** (i.e. seachas gealltanais stáit tréimhsiúla). Ciallaíonn sé seo go gcaithfidh úsáideoirí brath ar an oibreoir chun sonraí bloc a sholáthar más gá dóibh cruthúnais chalaoise a chruthú a thabharfadh dúshlán d'idirbhearta neamhbhailí. Má oibríonn an córas seo, is féidir le húsáideoirí i gcónaí úsáid a bhaint as cruthúnais calaoise chun cistí a fháil.

Tosaíonn an fhadhb nuair is é an t-oibreoir, ní hamháin aon úsáideoir, an páirtí atá ag gníomhú go mailíseach. Toisc gurb é an t-oibreoir amháin atá i gceannas ar an mblocshlabhra, tá níos mó dreasachta acu aistrithe staide neamhbhailí a chur chun cinn ar scála níos mó, mar shampla cistí a ghoid a bhaineann le húsáideoirí an slabhra plasma.

Sa chás seo, ag baint úsáide as an gcóras calaois-cruthúnas clasaiceach ní oibríonn sé. D'fhéadfadh an t-oibreoir idirbheart neamhbhailí a dhéanamh go héasca ag aistriú cistí Alice agus Bob chuig a sparán agus na sonraí riachtanacha chun an cruthúnas calaoise a chruthú a cheilt. Tá sé seo indéanta toisc nach gá don oibreoir sonraí a chur ar fáil d'úsáideoirí nó Mainnet.

Mar sin, is é an réiteach is dóchasaí ná iarracht a dhéanamh ar "shluascor" úsáideoirí ón slabhra plasma. Moillíonn an sluascor plean an oibreora mailísigh chun cistí a ghoid agus tugann sé cosaint áirithe d’úsáideoirí. Ordaítear iarratais ar aistarraingt bunaithe ar an uair a cruthaíodh gach UTXO (nó comhartha), rud a choisceann ​​​​oibreoirí mailíseacha ó theacht roimh úsáideoirí macánta.

Mar sin féin, tá bealach fós ag teastáil uainn chun bailíocht na n-iarratas ar tharraingt siar a fhíorú le linn ollscoir - chun caimiléirí faille a chosc ó airgead a dhéanamh as an gcíor thuathail a leanfadh próiseáil na scor neamhbhailí. Is é an réiteach simplí: a éileamh ar úsáideoirí an **staid dheireanach sa slabhra** a phostáil chun scor as a gcuid airgid.

Ach tá fadhbanna fós ag an gcur chuige seo. Mar shampla, más gá do gach úsáideoir ar shlabhra plasma scor (a d'fhéadfadh tarlú i gcás oibreora mailísigh), ní mór staid bhailí iomlán an tslabhra plasma a dhumpáil láithreach ar bhunchiseal Ethereum. Le méid treallach na slabhraí plasma (tréchur ard = níos mó sonraí) agus srianta ar luasanna próiseála Ethereum, ní réiteach idéalach é seo.

Cé go bhfuil cuma an-mhaith ar chluichí scoir go teoiriciúil, is dócha go spreagfaidh sluascor fíor-saoil brú tráchta ar fud an líonra ar Ethereum féin. Seachas dochar a dhéanamh d'fheidhmiúlacht Ethereum, ciallaíonn sluascor nach bhfuil comhordaithe go maith go bhféadfadh sé nach mbeidh úsáideoirí in ann cistí a aistarraingt sula ndéanann an t-oibreoir gach cuntas ar an slabhra plasma a dhraenáil.

## Buntáistí agus míbhuntáistí plasma {#pros-and-cons-of-plasma}

| Buntáistí                                                                                                                                                                                                                                                                            | Míbhuntáistí                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tairgeann tréchur ard agus costas íseal in aghaidh an idirbhirt.                                                                                                                                                                                                                     | Ní thacaíonn sé le ríomh ginearálta (ní féidir conarthaí cliste a rith). Ní thacaítear ach le haistrithe comharthaí bunúsacha, le babhtálacha agus le roinnt cineálacha idirbheart eile trí loighic réamhaithrise. |
| Go maith d’idirbhearta idir úsáideoirí treallacha (gan forchostas in aghaidh an phéire úsáideora má tá an dá cheann bunaithe ar an slabhra plasma)                                                                                                                                   | Is gá féachaint go tréimhsiúil ar an líonra (riachtanas beochta) nó an fhreagracht seo a tharmligean chuig duine éigin eile chun slándáil do chistí a chinntiú.                                                    |
| Is féidir slabhraí plasma a oiriúnú do chásanna úsáide sonracha nach mbaineann leis an bpríomhshlabhra. Is féidir le duine ar bith, lena n-áirítear gnólachtaí, conarthaí cliste Plasma a shaincheapadh chun bonneagar inscálaithe a sholáthar a oibríonn i gcomhthéacsanna éagsúla. | Ag brath ar oibreoir amháin nó níos mó chun sonraí a stóráil agus a sheirbheáil ar iarratas.                                                                                                                       |
| Laghdaíonn sé an t-ualach ar Ethereum Mainnet trí ríomhaireacht agus stóras a bhogadh as slabhra.                                                                                                                                                                                    | Cuirtear moill roinnt laethanta ar aistarraingtí chun dúshláin a cheadú. I gcás sócmhainní idirmhalartacha, is féidir le soláthraithe leachtachta é seo a mhaolú, ach tá costas caipitil gaolmhar i gceist.        |
|                                                                                                                                                                                                                                                                                      | Má dhéanann an iomarca úsáideoirí iarracht scor ag an am céanna, d'fhéadfadh go mbeadh brú tráchta ar Ethereum Mainnet.                                                                                            |

## Prótacail scálaithe plasma vs ciseal 2 {#plasma-vs-layer-2}

Cé gur measadh Plasma tráth mar réiteach scálaithe úsáideach do Ethereum, éiríodh as i bhfabhar prótacail scálaithe [ ciseal 2 (L2)](/layer-2/). Leigheasann réitigh scálaithe L2 roinnt fadhbanna Plasma:

### Éifeachtacht {#efficiency}

Gineann [Uas-scálú Dífhianaise](/developers/docs/scaling/zk-rollups) cruthúnais cripteagrafacha ar bhailíocht gach baisc idirbheart a phróiseáiltear as slabhra. Coisceann sé seo úsáideoirí (agus na hoibreoirí) ó aistrithe stáit neamhbhailí a chur chun cinn, rud a chuireann deireadh leis an ngá atá le tréimhsí dúshláin agus le cluichí scoir. Ciallaíonn sé freisin nach gcaithfidh úsáideoirí féachaint ar an slabhra go tréimhsiúil chun a gcuid cistí a dhaingniú.

### Tacaíocht do chonarthaí cliste {#support-for-smart-contracts}

Fadhb eile leis an gcreat plasma is ea [an t-éagumas chun tacú le cur i gcrích conarthaí cliste Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Mar thoradh air sin, tógadh an chuid is mó d'fheidhmiú Plasma le haghaidh íocaíochtaí simplí nó malartú comharthaí ERC-20.

Os a choinne sin, tá uas-scáluithe dóchasachacomhoiriúnach le [Meaisín Fíorúil Ethereum](/developers/docs/evm/) agus is féidir leo [conarthaí cliste](/developers/docs/smart-contracts/) Ethereum a rith ó dhúchas, rud a fhágann gur réiteach úsáideach agus _slán_ iad le haghaidh scálú[feidhmchláir dhíláraithe](/developers/docs/dapps/). Mar an gcéanna, tá pleananna ar bun chun [chur i bhfeidhm gan eolas ar an EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) a chruthú a cheadódh do ZK-rollups loighic threallach a phróiseáil agus conarthaí cliste a dhéanamh.

### Neamh-infhaighteacht sonraí {#data-unavailability}

Mar a míníodh níos luaithe, tá fadhb infhaighteachta sonraí ag plasma. Dá gcuirfeadh oibreoir mailíseach aistriú neamhbhailí ar an slabhra plasma chun cinn, ní bheadh ​​úsáideoirí in ann agóid a dhéanamh ina choinne toisc gur féidir leis an oibreoir na sonraí is gá chun an cruthúnas calaoise a chruthú a choinneáil siar. Réitíonn uas-scáluithe an fhadhb seo trí iallach a chur ar oibreoirí sonraí idirbheart a phostáil ar Ethereum, rud a ligeann do dhuine ar bith staid an tslabhra a fhíorú agus cruthúnais calaoise a chruthú más gá.

### Fadhb an tsluascoir {#mass-exit-problem}

Réitíonn ZK-rollups agus uas-scáluithe dóchasacha fadhb scoir Plasma ar bhealaí éagsúla. Mar shampla, braitheann ZK-rollup ar mheicníochtaí cripteagrafacha a chinntíonn nach féidir le hoibreoirí cistí úsáideoirí a ghoid in aon chás.

Ar an gcaoi chéanna, cuireann uas-scáluithe dóchasacha tréimhse moille ar aistarraingtí inar féidir le haon duine dúshlán a thionscnamh agus iarratais mhailíseacha aistarraingthe a chosc. Cé go bhfuil sé seo cosúil le Plasma, is é an difríocht ná go bhfuil rochtain ag fíoraitheoirí ar shonraí a theastaíonn chun cruthúnais calaoise a chruthú. Mar sin, ní gá d'úsáideoirí uas-scálaithe dul i mbun éalú mire, "is-túisce-amach" go Ethereum Mainnet.

## Cén difríocht atá idir Plasma agus taobhshlabhraí agus sceardadh? {#plasma-sidechains-sharding}

Tá plasma, taobhshlabhraí, agus sceardadh sách cosúil toisc go nascann siad go léir le Ethereum Mainnet ar bhealach éigin. Mar sin féin, athraíonn leibhéal agus neart na nasc seo, rud a chuireann isteach ar airíonna slándála gach réiteach scálaithe.

### Plasma vs taobhshlabhraí {#plasma-vs-sidechains}

Is blocshlabhra a oibrítear go neamhspleách é [taobhshlabhraí](/developers/docs/scaling/sidechains/) atá nasctha le Ethereum Mainnet trí dhroichead dhá bhealach. Ligeann [Droichid](/bridges/) d’úsáideoirí comharthaí a mhalartú idir an dá bhlocshlabhra chun oibriú ar an taobhshlabhra, ag laghdú brú tráchta ar Ethereum Mainnet agus ag feabhsú inscálaithe. Úsáideann taobhshlabhraí meicníocht chomhthola ar leith agus de ghnáth bíonn siad i bhfad níos lú ná Ethereum Mainnet. Mar thoradh air sin, tá riosca méadaithe i gceist le sócmhainní a nascadh leis na slabhraí sin; i bhfianaise an easpa ráthaíochtaí slándála a fuarthas le hoidhreacht Ethereum Mainnet sa mhúnla taobhshlabhra, tá riosca ag úsáideoirí go gcaillfear cistí in ionsaí ar an taobhshlabhra.

Os a choinne sin, díorthaíonn slabhraí plasma a slándáil ó Mainnet. Is léir mar sin go bhfuil siad níos sláine ná taobhshlabhraí. Is féidir le prótacail chomhdhearcadh éagsúla a bheith ag an dá taobhshlabhraí agus slabhraí plasma, ach is é an difríocht ná go bhfoilsíonn slabhraí plasma fréamhacha Merkle do gach bloc ar Ethereum Mainnet. Is píosaí beaga faisnéise iad fréamhacha bloc is féidir linn a úsáid chun faisnéis a fhíorú faoi idirbhearta a tharlaíonn ar shlabhra plasma. Má tharlaíonn ionsaí ar slabhra plasma, is féidir le húsáideoirí a gcuid cistí a aistarraingt go sábháilte go Mainnet leis na cruthúnais chuí.

### Plasma vs Sceardadh {#plasma-vs-sharding}

Foilsíonn slabhraí plasma agus slabhraí sceard araon cruthúnais cripteagrafacha chuig Ethereum Mainnet. Mar sin féin, tá airíonna slándála éagsúla ag an dá cheann.

Tiomnaíonn slabhraí Shard "ceanntásca comhthiomsaithe" do Mainnet ina bhfuil faisnéis mhionsonraithe faoi gach sceard sonraí. Déanann Nóid ar Mainnet bailíocht scearda sonraí a fhíorú agus a fhorghníomhú, ag laghdú an fhéidearthacht aistrithe sceard neamhbhailí agus ag cosaint an líonra ar ghníomhaíocht mhailíseach.

Tá plasma difriúil toisc nach bhfaigheann Mainnet ach faisnéis íosta faoi staid slabhraí leanaí. Ciallaíonn sé seo nach féidir le Mainnet idirbhearta a dhéantar ar shlabhraí mic a fhíorú go héifeachtach, rud a fhágann nach bhfuil siad chomh slán sin.

**Tabhair faoi deara** nach bhfuil sceardadh an bhlocshlabhra Ethereum ar an treochlár a thuilleadh. Tá scálú trí uas-scáluithe agus [Danksharding](/roadmap/danksharding) tagtha ina ionad.

### Úsáid Plasma {#use-plasma}

Soláthraíonn tionscadail iolracha feidhmiúcháin Plasma ar féidir leat a chomhtháthú i do dapps:

- [Polygon](https://polygon.technology/) (Matic Network roimhe seo)

## Tuilleadh léitheoireachta {#further-reading}

- [Foghlaim Plasma](https://www.learnplasma.org/en/)
- [Meabhrúchán tapa ar cad a chiallaíonn "slándáil chomhroinnte" agus cén fáth a bhfuil sé chomh tábhachtach sin](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Taobhshlabhraí vs Plasma vs Sceardadh](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Plasma a Thuiscint, Cuid 1: Na Bunghnéithe](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Beatha agus Bás Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
