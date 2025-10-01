---
title: Neamhstáit, dul in éag stáit agus dul in éag staire
description: Míniú ar dhul in éag staire agus Ethereum gan stát
lang: ga
---

# Neamhstáit, dul in éag stáit agus dul in éag staire {#statelessness}

Tá an cumas nóid Ethereum a rith ar chrua-earraí measartha ríthábhachtach don fíordhílárú. Tá sé seo amhlaidh mar go dtugann reáchtáil nód an cumas d'úsáideoirí faisnéis a fhíorú trí sheiceálacha cripteagrafacha a dhéanamh go neamhspleách seachas muinín a chur i dtríú páirtí chun sonraí a sholáthar dóibh. Trí nód a rith ligeann d’úsáideoirí idirbhearta a chur isteach go díreach chuig líonra piara-go-piara Ethereum seachas a bheith i muinín idirghabhálaí. Ní féidir dílárú mura bhfuil na buntáistí seo ar fáil ach d’úsáideoirí a bhfuil crua-earraí costasacha acu. Ina áit sin, ba cheart go mbeadh nóid in ann rith le riachtanais phróiseála agus chuimhne an-bheag ionas gur féidir leo rith ar fhóin phóca, ar mhicriríomhairí nó ar ríomhaire baile go formhothaithe.

Sa lá atá inniu ann, is é riachtanais spáis diosca ard an príomh-bhacainn a chuireann cosc ​​​​ar rochtain uilíoch ar nóid. Tá sé seo go príomha mar gheall ar an ngá atá le giotaí móra de shonraí stáit Ethereum a stóráil. Tá faisnéis ríthábhachtach sna sonraí stáit seo a theastaíonn chun bloic agus idirbhearta nua a phróiseáil i gceart. Agus é seo á scríobh, moltar SSD tapa 2TB chun nód iomlán Ethereum a rith. I gcás nód nach ndéanann aon sonraí níos sine a bhearradh, fásann an riachtanas stórála ag thart ar 14GB sa tseachtain, agus tá nóid chartlainne a stórálann na sonraí go léir ón mbunus ag druidim le 12 TB (ag am scríofa, i mí Feabhra 2023).

Is féidir tiomántáin chrua níos saoire a úsáid chun sonraí níos sine a stóráil ach tá siad sin ró-mhall chun coimeád suas leis na bloic isteach. Níl i gcoinneáil na samhlacha stórála reatha do chliaint agus stóráil sonraí á dhéanamh níos saoire agus níos éasca le stóráil ach réiteach sealadach agus páirteach ar an bhfadhb toisc go bhfuil fás stáit Ethereum 'gan teorainn', rud a chiallaíonn go mbeidh riachtanais stórála ag síormhéadú, agus beidh gá le feabhsuithe teicneolaíochta i gcónaí le coinneáil suas le fás stáit leanúnach. Ina áit sin, ní mór do chliaint bealaí nua a aimsiú chun bloic agus idirbhearta a fhíorú nach bhfuil ag brath ar shonraí a chuardach ó bhunachair shonraí áitiúla.

## Stóráil nóid a laghdú {#reducing-storage-for-nodes}

Tá bealaí éagsúla ann chun an méid sonraí a chaithfidh gach nód a stóráil a laghdú, agus éilíonn gach ceann acu croíphrótacal Ethereum a nuashonrú go pointe difriúil:

- **Stair éaga**: cumasaigh nóid sonraí stáit atá níos sine ná bloic X a chaitheamh amach, ach ní athraíonn sé an chaoi a láimhseálann cliant Ethereum sonraí stáit.
- **Stáit in éag**: lig do shonraí stáit nach n-úsáidtear go minic a bheith neamhghníomhach. Is féidir le cliaint neamhaird a dhéanamh ar shonraí neamhghníomhacha go dtí go ndéantar iad a aiséirí.
- **Gan stát lag**: ní theastaíonn rochtain ar shonraí stáit iomlána ach ó tháirgeoirí bloc, is féidir le nóid eile bloic a fhíorú gan bhunachar sonraí stáit áitiúil.
- **Gan stát láidir**: ní gá rochtain a bheith ag nóid ar bith ar na sonraí stáit iomlána.

## Sonraí in éag {#data-expiry}

### Stair in éag {#history-expiry}

Tagraíonn éag staire do chliaint ag baint sonraí níos sine nach dócha go mbeidh gá leo, ionas nach stórálann siad ach méid bheag sonraí stairiúla, ag ligean uaidh sonraí níos sine nuair a thagann sonraí nua isteach. Tá dhá chúis ann go dteastaíonn sonraí stairiúla ó chliaint: sioncronú agus freastal ar iarratais ar shonraí. Ar dtús, bhí ar chliaint sioncronú a dhéanamh ón mbloc bunúsas, ag deimhniú go raibh gach bloc seicheamhach i gceart an bealach ar fad go dtí ceann an tslabhra. Sa lá atá inniu ann, úsáideann cliaint "seicphointí suibiachtúlachta lag" chun a mbealach a bhrú go dtí ceann an tslabhra. Is pointí tosaithe iontaofa iad na seicphointí seo, cosúil le bloc bunúsach a bheith gar don lá atá inniu ann seachas do thús Ethereum. Ciallaíonn sé seo gur féidir le cliaint an fhaisnéis go léir a scaoileadh chuig an seicphointe suibiachtúlachta lag is déanaí gan an cumas sioncronaithe le ceann an tslabhra a chailleadh. Freastalaíonn cliaint ar iarratais faoi láthair (a thagann trí JSON-RPC) ar shonraí stairiúla trí iad a ghabháil óna mbunachair shonraí áitiúla. Mar sin féin, agus an stair imithe in éag ní bheidh sé seo indéanta má tá na sonraí iarrtha bearrtha. Is gá roinnt réitigh nuálacha le freastal ar na sonraí stairiúla seo.

Rogha amháin is ea go n-iarrann cliaint sonraí stairiúla ó chomhghleacaithe a úsáideann réiteach ar nós an Líonra Tairseach. Is líonra piara-le-piara atá i mbun forbartha ar an Líonra Tairsigh chun freastal ar shonraí stairiúla ina stórálann gach nód píosa beag de stair Ethereum ionas go bhfuil an stair iomlán scaipthe ar fud an líonra. Déantar iarratais a sheirbheáil trí phiaraí a stórálann na sonraí ábhartha agus iad a iarraidh uathu. Mar mhalairt air sin, ós rud é go ginearálta gur aipeanna a éilíonn rochtain ar shonraí stairiúla, is féidir leo a bheith freagrach as iad a stóráil. D'fhéadfadh go mbeadh go leor gníomhaithe soilíosacha sa spás Ethereum a bheadh ​​sásta cartlanna stairiúla a choinneáil. D'fhéadfadh sé a bheith ina DAO a chastar suas chun stóráil sonraí stairiúla a bhainistiú, nó go hidéalach beidh sé ina mheascán de na roghanna seo go léir. D'fhéadfadh na soláthraithe seo na sonraí a sheirbheáil ar go leor bealaí, mar shampla ar torrent, FTP, Filecoin nó IPFS.

Tá éag staire beagán conspóideach mar go dtí seo tá infhaighteacht aon sonraí stairiúla ráthaithe go hintuigthe i gcónaí ag Ethereum. Bhí sioncronú iomlán ó genesis indéanta i gcónaí mar chaighdeán, fiú má bhraitheann sé ar roinnt sonraí níos sine a atógáil ó roghabhlúirí. Bogann éag staire an fhreagracht as an ráthaíocht seo a sholáthar lasmuigh de chroíphrótacal Ethereum. D’fhéadfadh rioscaí cinsireachta nua a thabhairt isteach dá bharr sin más eagraíochtaí láraithe iad a rachaidh i ngleic le sonraí stairiúla a sholáthar.

Níl EIP-4444 réidh le seoladh fós, ach tá sé faoi chaibidil go gníomhach. Is díol spéise é nach dúshláin theicniúla is mó a bhaineann le EIP-4444, ach bainistíocht phobail. Chun é seo a sheoladh, tá tacaíocht an phobail ag teastáil agus beidh tiomantais chomh maith le comhaontú de dhíth chun sonraí stairiúla a stóráil agus sonraí stairiúla a sheirbheáil ón aonáin iontaofa.

Ní dhéantar aon athrú bunúsach ar an chaoi a láimhseálann nóid Ethereum sonraí stáit, ní athraíonn sé ach an dóigh a dhéantar rochtain ar shonraí stairiúla.

### Éag stáit {#state-expiry}

Tagraíonn éag stáit do stát a bhaint de nóid aonair mura bhfuarthas rochtain air le déanaí. Tá go leor bealaí ann chun é seo a chur i bhfeidhm, lena n-áirítear:

- **Éag le cíos**: "cíos" a ghearradh ar chuntais agus iad a chur in éag nuair a shroicheann a gcíos náid
- **Éag le ham**: cuntais a dhéanamh neamhghníomhach mura bhfuil léamh/scríobh ar bith chuig an gcuntas sin le tamall anuas

D’fhéadfadh éag trí chíos a bheith ina chíos díreach a ghearrtar ar chuntais chun iad a choinneáil sa bhunachar sonraí stáit gníomhach. D’fhéadfadh éag de réir ama a tarlú trí chomhaireamh síos ón idirghníomhaíocht cuntais dheireanach, nó d’fhéadfadh éag tréimhsiúil gach cuntas a bheith a bheith i gceist. D’fhéadfadh meicníochtaí a bheith ann freisin a chomhcheanglaíonn gnéithe de na samhlacha bunaithe ar am agus ar chíos araon, mar shampla go bhfanann cuntais aonair sa stát gníomhach má íocann siad táille bheag éigin roimh éag ambhunaithe. Le héag stáit tá sé tábhachtach a thabhairt faoi deara nach bhfuil an staid neamhghníomhach ** scriosta**, ní dhéantar é a stóráil ach ar leithligh ón stát gníomhach. Is féidir an stát neamhghníomhach a aiséirí isteach sa stát gníomhach.

Is dócha gurb é an bealach a n-oibreodh sé seo ná crann stáit a bheith ann ar feadh tréimhsí ama ar leith (b'fhéidir ~1 bhliain). Aon uair a thosaíonn tréimhse nua, tosaítear crann staide úr iomlán. Ní féidir ach an crann staide reatha a mhodhnú, tá gach ceann eile do-athraithe. Níltear ag súil ach go gcoimeádfaidh nóid Ethereum an crann staide reatha agus an chéad cheann eile is déanaí. Éilíonn sé seo bealach chun seoladh a stampáil leis an tréimhse ina bhfuil sé. Tá [roinnt bealaí féideartha](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) chun é seo a dhéanamh, ach éilíonn na príomhbhealaí an rogha [seoltaí a fhadú](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) chun freastal ar an bhfaisnéis bhreise agus an buntáiste breise a bheith leis go bhfuil seoltaí níos faide i bhfad níos sláine. Tugtar [síneadh spáis seoltaí ar an mír treochlár a dhéanann é seo.](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Mar an gcéanna le héag na staire, faoi éag stáit baintear an fhreagracht as seanshonraí stáit a stóráil ó úsáideoirí aonair agus brú ar aonáin eile ar nós soláthraithe láraithe, baill soilíosacha den phobal nó réitigh díláraithe níos todhchaíochta amhail an Líonra Tairsigh.

Tá éag stáit fós sa chéim taighde agus níl sé réidh le seoladh fós. D’fhéadfadh éag stáit tarlú níos déanaí ná cliaint gan stát agus éag staire mar go mbíonn mórmhéid na stát inbhainistithe go héasca ag formhór na mbailiíochtóirí de bharr na n-uasghráduithe sin.

## Gan stát {#statelessness}

Ní ainm oiriúnach e easpa staide mar ní chiallaíonn sé go gcuirtear deireadh leis an gcoincheap "staid", ach baineann sé le hathruithe ar an gcaoi a láimhseálann nóid Ethereum sonraí stáit. Tá dhá leagan den easpa staide ann: easpa staide agus easpa staide láidir. Cuireann easpa staide lag ar chumas an chuid is mó de na nóid dul go heaspa staide trí fhreagracht as stóráil stáit a chur ar roinnt bheag acu. Cuireann easpa staide láidir deireadh go hiomlán leis an ngá atá le nód ar bith chun sonraí iomlána an stáit a stóráil. Tugann easpa staide lag agus láidir araon na buntáistí seo a leanas do ghnáthbhailíochtóirí:

- sioncronú beagnach láithreach
- cumas chun bloic as-ord a bhailíochtú
- nóid in ann rith le riachtanais chrua-earraí an-íseal (m.sh. ar ghutháin)
- is féidir le nóid rith ar bharr tiomántáin chrua saora toisc nach bhfuil léamh/scríobh diosca ag teastáil
- comhoiriúnach le huasghráduithe sa todhchaí ar cripteagrafaíocht Ethereum

### Easpa Staide Lag {#weak-statelessness}

Is éard atá i gceist le heaspa staide lag athruithe ar an mbealach a fhíoraíonn nóid Ethereum athruithe staide, ach ní dhíbríonn sé an gá atá le stóráil staide i ngach nóid ar an líonra go hiomlán. Ina áit sin, cuireann easpa staide lag an fhreagracht as stóráil staide ar mholtóirí bloic, agus fíoraíonn gach nóid eile ar an líonra bloic gan na sonraí staide iomlána a stóráil.

**I gcás easpa staide lag, teastaíonn rochtain ar shonraí staide iomlána chun bloic a mholadh ach ní gá aon sonraí staide chun bloic a fhíorú**

Chun go dtarlódh sé seo, ní mór [Crainn Verkle](/roadmap/verkle-trees/) a bheith curtha i bhfeidhm cheana féin i gcliant Ethereum. Is struchtúr sonraí athsholáthair iad crainn Verkle chun sonraí staide Ethereum a stóráil a cheadaíonn "finnéithe" beaga le méid sheasta ar na sonraí a chur ar aghaidh idir piaraí agus a úsáidtear chun bloic a fhíorú in ionad bloic a fhíorú i gcoinne bunachair shonraí áitiúla. Teastaíonn [deighilt idir na tógálaí agus an moltóir](/roadmap/pbs/) freisin toisc go gceadaíonn sé seo do thógálaithe bloc a bheith ina nóid speisialaithe le crua-earraí níos cumhachtaí, agus is iad sin na cinn a dteastaíonn rochtain uathu ar shonraí iomlána na staide.

<ExpandableCard title="Cén fáth a bhfuil sé ceart go leor brath ar níos lú moltóirí bloc?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Braitheann easpa staide ar thógálaithe bloc a bheith ag cothabháíl cóip de na sonraí staide iomlána ionas gur féidir leo finnéithe a ghiniúint chun an bloc a fhíorú. Ní gá rochtain a bheith ag nóid eile ar shonraí na staide, tá an fhaisnéis go léir is gá chun an bloc a fhíorú ar fáil san fhinné. Cruthaíonn sé seo cás ina bhfuil sé costasach bloc a mholadh, ach go bhfuil fíorú an bhloic saor, rud a thugann le tuiscint go reáchtálfaidh níos lú oibreoirí nód molta bloc. Mar sin féin, níl dílárú na moltóirí bloc ríthábhachtach chomh fada agus is féidir leis an oiread rannpháirtithe agus is féidir a fhíorú go neamhspleách go bhfuil na bloic atá molta acu bailí.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Léigh tuilleadh ar nótaí Dankrad</ButtonLink>
</ExpandableCard>

Úsáideann moltóirí bloc na sonraí staide chun "finnéithe" a chruthú - an tacar íosta sonraí a chruthaíonn luachanna na staide atá á hathrú ag idirbhearta bloc. Ní shealbhaíonn bailíochtóií eile an staid, ní stórálann siad ach fréamh na staide (hais den staid iomlán). Faigheann siad bloc agus finné agus úsáideann siad iad chun a fhréamh staide a nuashonrú. Déanann sé seo nód bailíochtaithe thar a bheith éadrom.

Tá an easpa staide ag dul chun cinn sa taighde, ach braitheann sé ar scaradh idir moltóirí agus tógálaithe agus Crainn Verkle a bheith curtha i bhfeidhm ionas gur féidir finnéithe beaga a chur ar aghaidh idir piaraí. Ciallaíonn sé seo gur dócha go bhfuil easpa staide lag cúpla bliain ar shiúl ó Ethereum Mainnet.

### Easpa staide láidir {#strong-statelessness}

Cuireann easpa staide láidir deireadh leis an ngá atá le nód ar bith chun sonraí staide a stóráil. Ina áit sin, seoltar idirbhearta le finnéithe ar féidir le táirgeoirí bloc a chomhiomlánú. Tá na táirgeoirí bloc freagrach ansin as an staid sin amháin a stóráil a theastaíonn chun finnéithe a ghiniúint le haghaidh cuntas ábhartha. Aistrítear an fhreagracht stáit beagnach go hiomlán chuig úsáideoirí, mar go seolann siad finnéithe agus 'liostaí rochtana' le dearbhú cé na cuntais agus na heochracha stórála a bhfuil siad ag idirghníomhú leo. Cumasaíonn sé seo nóid thar a bheith éadrom, ach tá comhbhabhtáil ann lena n-áirítear go mbíonn sé níos deacra idirbhearta a dhéanamh le conarthaí cliste.

Tá easpa staide láidir imscrúdaithe ag taighdeoirí ach níltear ag súil faoi láthair go mbeidh sé mar chuid de threochlár Ethereum - is dóichí gur leor easpa staide lag do riachtanais scálaithe Ethereum.

## Dul chun cinn reatha {#current-progress}

Tá easpa stáit lag, éag staire agus éag stáit ar fad ag an gcéim taighde agus táthar ag súil go gcuirfear i gcrích iad i gceann roinnt blianta. Níl aon ráthaíocht ann go gcuirfear na moltaí seo ar fad i bhfeidhm, mar shampla, má chuirtear éag stáit i bhfeidhm ar dtús b’fhéidir nach mbeidh gá le héag staire a chur i bhfeidhm freisin. Tá míreanna treochláir eile ann freisin, mar [Verkle Trees](/roadmap/verkle-trees) agus [deighilt idir an tairgeoir agus an moltóir](/roadmap/pbs) nach mór a chríochnú ar dtús.

## Tuilleadh léitheoireachta {#further-reading}

- [Easpa staide Vitalik AMA](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teoiric ar bhainistíochta méid staide](https://hackmd.io/@vbuterin/state_size_management)
- [Aiséirí-coimhlint-teorainn stáit íoslaghdaithe](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Cosáin chuig easpa staide agus éag staide](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Sonraíocht EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes ar EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Cén fáth go bhfuil sé chomh tábhachtach dul go heaspa staide](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Nótaí coincheap bunaidh an chliaint le heaspa staide](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Tuilleadh faoi dhul in éag stáit](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Níos mó fós faoi éag stáit](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
