---
title: Ethereum níos sláine
description: Is é Ethereum an t-ardán conartha cliste is sláine agus díláraithe atá ann. Mar sin féin, tá feabhsuithe fós ar féidir a dhéanamh ionas go bhfanfaidh Ethereum athléimneach d'aon leibhéal ionsaí i bhfad amach anseo.
lang: ga
image: /images/roadmap/roadmap-security.png
alt: "Treochlár Ethereum"
template: roadmap
---

Is ardán [cliste-chonradh](/glossary/#smart-contract) é **Ethereum cheana féin** slán, díláraithe. Mar sin féin, tá feabhsuithe fós ar féidir a dhéanamh ionas go bhfanann Ethereum athléimneach do gach cineál ionsaí i bhfad amach anseo. Ina measc seo tá mionathruithe ar an mbealach a ndéileálann [cliaint Ethereum](/glossary/#consensus-client) le [bloic](/glossary/#block) san iomaíocht, chomh maith. mar a mhéadaíonn an luas a mheasann an líonra a bheith ["críochnaithe"](/developers/docs/consensus-mechanisms/pos/#finality) (rud a chiallaíonn nach féidir iad a athrú gan fíor-eacnamaíocht caillteanas do ionsaitheoir).

Tá feabhsuithe ann freisin a fhágann go bhfuil idirbhearta cinsireachta i bhfad níos deacra trí mholtóirí bloc a dhéanamh dall ar ábhar iarbhír a gcuid bloic, agus bealaí nua chun a aithint nuair a bhíonn cliant ag cinsireacht. Le chéile déanfar na feabhsuithe seo a uasghrádú ar an bprótacal [cruthúnas-gheallta](/glossary/#pos) ionas go mbeidh muinín láithreach ag úsáideoirí - ó dhaoine aonair go corparáidí - ina gcuid apps, sonraí agus sócmhainní ar Ethereum.

## Aistarraingtí geallchuir {#staking-withdrawals}

Thosaigh an t-uasghrádú ó [cruthúnas-oibre](/glossary/#pow) go cruthúnais-gheallta le ceannródaithe Ethereum ag “geall” a ETH i gconradh taisce. Úsáidtear an ETH sin chun an líonra a chosaint. Rinneadh an dara nuashonrú an 12 Aibreán 2023 chun an ETH geallta a tharraingt siar. Ó shin i leith is féidir le bailíochtaithe ETH a ghlacadh nó a tharraingt siar faoi shaoirse.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Léigh faoi aistarraingtí</ButtonLink>

## Ag cosaint in aghaidh ionsaithe {#defending-against-attacks}

Tá feabhsuithe ar féidir a dhéanamh ar phrótacal cruthúnais-gheallta Ethereum. Tugtar [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) ar cheann amháin - rud níos sláine [forc](/glossary/#fork) -rogha algartaim a dhéanann cineálacha áirithe ionsaithe níos deacra.

Dá laghdófaí an t-am a thógann Ethereum chun bloic a [a thabhairt chun críche](/glossary/#finality) chuirfí eispéireas úsáideora níos fearr ar fáil agus chuirfeadh sé cosc ​​ar ionsaithe “atheagrúcháin” sofaisticiúla nuair a dhéanann ionsaitheoirí iarracht bloic nua a athshuíomh chun brabús nó cinsireacht a bhaint as. idirbhearta áirithe. [**Críochacht sliotán aonair (SSF)**](/roadmap/single-slot-finality/) is **bealaí chun an mhoill ar chríochnú a laghdú**. Faoi láthair tá luach 15 nóiméad de bhlocanna ann a bhféadfadh ionsaitheoir a chur ina luí go teoiriciúil ar bhailitheoirí eile athchumrú a dhéanamh. Le SSF, tá 0 ann. Baineann úsáideoirí, ó dhaoine aonair go aipeanna agus malartuithe, leas as dearbhú tapa nach gcuirfear a n-idirbheart ar ais, agus baineann an líonra tairbhe as trí rang iomlán ionsaithe a dhúnadh.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Léigh faoi críochnaitheacht sliotán amháin</ButtonLink>

## Ag cosaint in aghaidh na cinsireachta {#defending-against-censorship}

Cuireann dílárú cosc ​​ar dhaoine aonair nó grúpaí beaga [bhailíochtóirí](/glossary/#validator) barraíocht tionchair a bheith acu. Is féidir le teicneolaíochtaí nua geallta cabhrú lena chinntiú go bhfanann bailíochtaithe Ethereum chomh díláraithe agus is féidir agus iad á gcosaint freisin i gcoinne teipeanna crua-earraí, bogearraí agus líonra. Áirítear leis seo bogearraí a roinneann freagrachtaí bailíochtaithe thar roinnt [nóid](/glossary/#node). **teicneolaíocht bhailíochtaithe dáilte (DVT)** a thugtar air seo. Spreagtar [Comhthiomsuithe Geallta](/glossary/#staking-pool) chun DVT a úsáid toisc go ligeann sé do ríomhairí iolracha a bheith rannpháirteach i gcomhbhailíochtú, ag cur iomarcaíochta agus lamháltais lochtanna leis. Roinneann sé eochracha bailíochtaithe freisin thar roinnt córas, seachas oibreoirí aonair a bheith ag rith il-bhailíochtóirí. Déanann sé seo níos deacra é d’oibreoirí mímhacánta ionsaithe ar Ethereum a chomhordú. Ar an iomlán, is é an smaoineamh atá ann buntáistí slándála a fháil trí bhailitheoirí a rith mar _pobail_ seachas mar dhaoine aonair.

<ButtonLink variant="outline-color" href="/staking/dvt/">Léigh faoi theicneolaíocht bhailitheoir dáilte</ButtonLink>

Cuirfidh cur i bhfeidhm **deighilt tairgeoir-tógálaí (PBS)** feabhas mór ar chosaintí ionsuite Ethereum in aghaidh na cinsireachta. Ceadaíonn PBS bailíochtóir amháin bloc a chruthú agus ceann eile chun é a chraoladh ar fud líonra Ethereum. Cinntíonn sé seo go roinntear na gnóthachain ó halgartaim tógála blocála gairmiúla a uasmhéadaítear ar bhrabús ar bhealach níos cothroime ar fud an líonra, **cosc a chur ar pháirtithe leasmhara díriú** leis na geallsealbhóirí institiúideacha is fearr le himeacht ama. Faigheann an moltóir bloc an bloc is brabúsaí a thairgeann margadh tógálaithe bloc dóibh a roghnú. Chun cinsireacht a dhéanamh, is minic a bheadh ​​ar mholtóir bloc a roghnú bloc níos lú brabúsaí, rud a bheadh ​​**neamhréasúnach ó thaobh na heacnamaíochta de agus a bheadh ​​soiléir don chuid eile de na bailíochtaithe** ar an líonra.

Tá breiseáin ionchasacha ann do PBS, cosúil le hidirbhearta criptithe agus liostaí cuimsithe, a d'fhéadfadh feabhas breise a chur ar fhriotaíocht chinsireachta Ethereum. Déanann siad seo an tógálaí bloc agus an moltóir dall ar na hidirbhearta iarbhír atá san áireamh ina mbloic.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Léigh faoi scaradh idir moltóirí agus tógálaí</ButtonLink>

## Comhbhailitheoirí a chosaint {#protecting-validators}

Is féidir go bhféadfadh ionsaitheoir sofaisticiúla bailíochtaithe atá le teacht a aithint agus iad a spamáil chun cosc ​​​​a chur orthu bloic a mholadh; tugtar ionsaí **séanadh seirbhíse (DoS)** air seo. Cosnóidh cur i bhfeidhm [**toghchán rúnda ceannaire (SLE)**](/roadmap/secret-leader-election) ar ionsaí den chineál seo trí bhloc a chosc moltóirí ó bheith eolach roimh ré. Feidhmíonn sé seo trí shraith gealltanas cripteagrafach a ionadaíonn bloc-thogróirí a shuffadh go leanúnach agus a n-ord a úsáid chun a chinneadh cé acu bailíochtóir a roghnaítear sa chaoi is nach bhfuil a n-ordú ar eolas ag na bailíochtóirí ach amháin roimh ré.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Léigh faoi thoghchán ceannaire rúnda</ButtonLink>

## Dul chun cinn reatha {#current-progress}

**Tá uasghráduithe slándála ar an treochlár i gcéimeanna ardtaighde**, ach ní mheastar go gcuirfear i bhfeidhm iad go ceann tamaill. Is iad na chéad chéimeanna eile maidir le cumasc radhairc, PBS, SSF agus SLE ná sonraíocht a thabhairt chun críche agus tús a chur le tógáil fréamhshamhlacha.
