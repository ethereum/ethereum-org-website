---
title: Cainéil Staide
description: Réamhrá ar chainéil staide agus cainéil íocaíochta mar réiteach scálaithe a úsáideann pobal Ethereum faoi láthair.
lang: ga
sidebarDepth: 3
---

Ligeann cainéil staide do rannpháirtithe idirbheartaíocht a dhéanamh go sábháilte as slabhra agus idirghníomhú le Ethereum Príomhlíonra a íoslaghdú. Is féidir le piaraí cainéil líon treallach idirbheart as slabhra a dhéanamh agus gan ach dhá idirbheart ar slabhra a chur isteach chun an cainéal a oscailt agus a dhúnadh. Ceadaíonn sé seo tréchur idirbhearta thar a bheith ard agus bíonn costais níos ísle ar úsáideoirí dá bharr.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh ár leathanaigh ar [Scálú Ethereum](/developers/docs/scaling/) agus [ciseal 2](/layer-2/) léite agus tuigthe agat.

## Cad iad cainéil? {#what-are-channels}

Tá dúshláin inscálaithe ann do bhlocshlabhra poiblí, mar shampla Ethereum, mar gheall ar a n-ailtireacht dháilte: ní mór do gach nóid idirbhearta ar slabhra a dhéanamh. Caithfidh nóid a bheith in ann líon na n-idirbheart i mbloc a láimhseáil le crua-earraí measartha, rud a chuireann teorainn ar thréchur an idirbhirt chun an líonra a choinneáil díláraithe. Réitíonn cainéil Bhlocshlabhraí an fhadhb seo trí ligean d'úsáideoirí idirghníomhú as slabhra agus iad fós ag brath ar shlándáil an phríomhshlabhra le haghaidh socrú deiridh.

Is prótacail simplí idir piaraí iad cainéil a cheadaíonn do dhá pháirtí go leor idirbheart a dhéanamh eatarthu féin gan ach na torthaí deiridh a phostáil chuig an mblocshlabhra. Úsáideann an cainéal cripteagrafaíocht chun a léiriú go bhfuil na sonraí achoimre a ghineann siad i ndáiríre mar thoradh ar shraith bhailí d’idirbhearta idirmheánacha. Cinntíonn conradh cliste ["multisig"](/developers/docs/smart-contracts/#multisig) go bhfuil na hidirbhearta sínithe ag na páirtithe cearta.

Le cainéil, déanann páirtithe leasmhara athruithe staide a rith agus a bhailíochtú, rud a íoslaghdaíonn an ríomh ar chiseal forghníomhaithe Ethereum. Laghdaíonn sé seo an brú tráchta ar Ethereum agus méadaíonn sé luasanna próiseála idirbheart d’úsáideoirí.

Tá gach cainéal á bhainistiú ag [conradh multisig cliste] (/developers/docs/smart-contracts/#multisig) a ritheann ar Ethereum. Chun cainéal a oscailt, imscarfaidh rannpháirtithe an conradh cainéal ar slabhra agus cuireann siad cistí isteach ann. Síníonn an dá pháirtí le chéile nuashonrú staide chun staid an chainéil a thúsú, agus ina dhiaidh sin is féidir leo idirbheartaíocht a dhéanamh go tapa agus go saor as slabhra.

Chun an cainéal a dhúnadh, cuireann na rannpháirtithe isteach ar staid chomhaontaithe deiridh an chainéil ar slabhra. Ina dhiaidh sin, dáileann an conradh cliste na cistí faoi ghlas de réir iarmhéid gach rannpháirtí i staid dheiridh an chainéil.

Tá cainéil piara-le-piara thar a bheith úsáideach do chásanna inar mian le roinnt rannpháirtithe réamhshainithe idirbheartaíocht a dhéanamh ar ardmhinicíocht gan tabhú forchostais infheicthe. Tagann cainéil bhlocshlabhra faoi dhá chatagóir: **cainéil íocaíochta** agus **cainéil staide**.

## Cainéil íocaíochta {#payment-channels}

Is fearr cur síos ar chainéal íocaíochta mar “mórleabhar dhá threo” arna chothabháil ag beirt úsáideoir i dteannta a chéile. Is é iarmhéid tosaigh an mhórleabhair suim na dtaiscí atá faoi ghlas sa chonradh ar slabhra le linn na céime oscailte cainéal. Is féidir aistrithe cainéal íocaíochta a dhéanamh ar an toirt agus gan baint ag an blocshlabhra iarbhír féin, ach amháin i gcás cruthú ar slabhra aon-uaire tosaigh agus dúnadh an chainéil faoi dheireadh.

Éilíonn nuashonruithe ar iarmhéid an mhórleabhair (i.e., staid an chainéil íocaíochta) ceadú gach páirtí sa chainéal. Meastar go bhfuil nuashonrú cainéil, sínithe ag gach rannpháirtí cainéil, tugtha chun críche, cosúil le hidirbheart ar Ethereum.

Bhí cainéil íocaíochta i measc na réitigh scálaithe is luaithe a dearadh chun gníomhaíocht ar slabhra chostasach idirghníomhaíochtaí simplí úsáideora a íoslaghdú (m.sh. aistrithe ETH, babhtálacha adamhacha, micrea-íocaíochtaí). Is féidir le rannpháirtithe cainéil méid neamhtheoranta d’idirbhearta láithreacha gan táille a dhéanamh idir a chéile fad is nach sáraíonn suim ghlan a n-aistrithe na comharthaí taiscthe.

## Cainéil staide {#state-channels}

Seachas tacú le híocaíochtaí as slabhra, ní raibh cainéil íocaíochta úsáideach chun loighic ghinearálta aistrithe staide a láimhseáil. Cruthaíodh cainéil staide chun an fhadhb seo a réiteach agus chun cainéil a dhéanamh úsáideach chun ríomh ginearálta a scálú.

Tá go leor i gcoiteann fós ag cainéil staide agus cainéil íocaíochta. Mar shampla, idirghníomhaíonn úsáideoirí trí theachtaireachtaí sínithe go cripteagrafach (idirbhearta) a mhalartú, nach mór do rannpháirtithe an chainéil eile a shíniú freisin. Mura bhfuil nuashonrú staide molta sínithe ag na rannpháirtithe go léir, meastar é a bheith neamhbhailí.

Mar sin féin, chomh maith le hiarmhéideanna an úsáideora a choinneáil, rianaíonn an cainéal staid reatha stórais an chonartha (i.e., luachanna athróg conartha).

Mar sin is féidir conradh cliste a rith as slabhra idir dhá úsáideoir. Sa chás seo, ní theastaíonn ach ceadú na bpiaraí a chruthaigh an cainéal le haghaidh nuashonruithe ar staid inmheánach an chonartha chliste.

Cé go réitíonn sé seo an fhadhb inscálaithe a luadh níos luaithe, tá impleachtaí aige do shlándáil. Ar Ethereum, déantar bailíocht aistrithe staide a fhorghníomhú ag prótacal comhdhearcadh an líonra. Fágann sin go bhfuil sé dodhéanta nuashonrú neamhbhailí a mholadh do staid an chonartha chliste nó forghníomhú conartha cliste a athrú.

Níl na ráthaíochtaí slándála céanna ag cainéil staide. Go pointe áirithe, is leagan beag de Mainnet é cainéal staide. Agus líon teoranta rannpháirtithe ag cur rialacha i bhfeidhm, méadaítear an fhéidearthacht go ndéanfaí iompar mailíseach (m.sh. nuashonruithe staide neamhbhailí a mholadh). Díorthaíonn cainéil staide a slándáil ó chóras eadrána díospóide atá bunaithe ar [cruthúnais calaoise](/gluais/#fraud-proof).

## Conas a oibríonn cainéil staide {#how-state-channels-work}

Go bunúsach, is ionann gníomhaíocht i gcainéal staide agus seisiún idirghníomhaíochtaí a bhaineann le húsáideoirí agus córas blocshlabhra. Déanann úsáideoirí cumarsáid den chuid is mó lena chéile as slabhra agus ní idirghníomhaíonn siad ach leis an mblocshlabhra bunúsach chun an cainéal a oscailt, an cainéal a dhúnadh, nó díospóidí féideartha idir rannpháirtithe a réiteach.

Imlíníonn an chuid seo a leanas sreabhadh oibre bunúsach cainéal staide:

### An cainéil a oscailt {#opening-the-channel}

Chun cainéal a oscailt ní mór do rannpháirtithe cistí a ghealladh do chonradh cliste ar Príomhlíonra. Feidhmíonn an taisce mar tháb fíorúil freisin, agus mar sin is féidir le gníomhaithe rannpháirteacha idirbheartaíocht a dhéanamh go héasca gan gá le híocaíochtaí a shocrú láithreach. Go dtí go mbíonn an cainéal críochnaithe ar slabhra ní shocraíonn páirtithe a chéile agus a dhéanann siad an méid atá fágtha dá dtáb a aistarraingt.

Feidhmíonn an taisce seo mar bhanna freisin chun iompar macánta a ráthú ó gach rannpháirtí. Má fhaightear taisceoirí ciontach i ngníomhartha mailíseacha le linn na céime réitithe díospóide, gearrann an conradh a n-éarlais.

Ní mór do phiaraí cainéil staid thosaigh a shíniú, a aontaíonn siad go léir air. Feidhmíonn sé seo mar bhunús an chainéil staide, ina dhiaidh sin is féidir le húsáideoirí tosú ar idirbhearta.

### An cainéal a úsáid {#using-the-channel}

Tar éis staid an chainéil a thúsú, idirghníomhaíonn piaraí trí idirbhearta a shíniú agus iad a sheoladh chuig a chéile le faomhadh. Cuireann rannpháirtithe tús le nuashonruithe staide leis na hidirbhearta seo agus síníonn siad nuashonruithe staide ó dhaoine eile. Cuimsíonn gach idirbheart na nithe seo a leanas:

- **Nonce**, a fheidhmíonn mar aitheantas uathúil le haghaidh idirbhearta agus a chuireann cosc ​​ar ionsaithe athimeartha. Sainaithníonn sé freisin an t-ord inar tharla nuashonruithe staide (rud atá tábhachtach maidir le réiteach díospóide)

- Sean-staid an chainéil

- Staid nua an chainéil

- An t-idirbheart a spreagann an t-aistriú staide (m.sh., cuireann Alice 5 ETH chuig Bob)

Ní chraoltar nuashonruithe stáit sa chainéal ar slabhra mar a tharlaíonn de ghnáth nuair a idirghníomhaíonn úsáideoirí ar Mainnet, a ailíníonn le sprioc na gcainéal staide chun lorg ar slabhra a íoslaghdú. Chomh fada agus a aontaíonn na rannpháirtithe ar nuashonruithe staide, tá siad chomh críochnaitheach le hidirbheart Ethereum. Ní gá do rannpháirtithe brath ar chomhdhearcadh Mainnet ach amháin má thagann díospóid chun cinn.

### Cainéal a dhúnadh {#closing-the-channel}

Chun cainéal staide a dhúnadh ní mór staid dheiridh, aontaithe an chainéil a chur isteach sa chonradh cliste ar slabhra. Áirítear ar na sonraí a ndéantar tagairt dóibh sa nuashonrú staide líon gluaiseachtaí gach rannpháirtí agus liosta na n-idirbheart ceadaithe.

Tar éis a fhíorú go bhfuil an nuashonrú staide bailí (i.e., tá sé sínithe ag gach páirtí) críochnaíonn an conradh cliste an cainéal agus dáileann sé na cistí faoi ghlas de réir thoradh an chainéil. Cuirtear íocaíochtaí a dhéantar as slabhra i bhfeidhm ar staid Ethereum agus faigheann gach rannpháirtí a gcuid eile de na cistí faoi ghlas.

Léiríonn an cás a luadh thuas cad a tharlaíonn sa chás sona. Uaireanta, b'fhéidir nach mbeidh úsáideoirí in ann teacht ar chomhaontú agus an cainéal a thabhairt chun críche (an cás brónach). D’fhéadfadh aon cheann díobh seo a leanas a bheith fíor faoin gcás:

- Téann rannpháirtithe as líne agus ní mholann siad aistrithe staide

- Diúltaíonn rannpháirtithe nuashonruithe bailí staide a chomhshíniú

- Déanann na rannpháirtithe iarracht an cainéal a thabhairt chun críche trí nuashonrú sean-staide a mholadh don chonradh ar slabhra

- Molann rannpháirtithe aistrithe staide neamhbhailí do dhaoine eile le síniú

Aon uair a chliseann ar chomhdhearcadh idir gníomhaithe rannpháirteacha i gcainéal, is é an rogha dheireanach ná brath ar chomhdhearcadh Mainnet chun staid bhailí deiridh an chainéil a fhorfheidhmiú. Sa chás seo, éilíonn dúnadh an chainéal staide díospóidí a shocrú ar slabhra.

### Díospóidí a réiteach {#settling-disputes}

De ghnáth, comhaontaíonn páirtithe i gcainéal an cainéal a dhúnadh roimh ré agus an t-aistriú staide deiridh a chomhshíniú, agus cuireann siad isteach sa chonradh cliste é. Nuair a bheidh an nuashonrú ceadaithe ar slabhra, cuirtear deireadh le rith an chonartha cliste as slabhra agus scoireann rannpháirtithe an cainéal lena gcuid airgid.

Mar sin féin, is féidir le páirtí amháin iarratas ar slabhra a chur isteach chun deireadh a chur le rith an chonartha cliste agus an cainéal a thabhairt chun críche - gan fanacht le ceadú a gcomhghleacaí. Má tharlaíonn aon cheann de na cásanna briste comhdhearcaidh a luadh níos luaithe, féadfaidh ceachtar páirtí an conradh ar slabhra a spreagadh chun an cainéal a dhúnadh agus cistí a dháileadh. Soláthraíonn sé seo **iontaofacht**, ag cinntiú gur féidir le páirtithe macánta a gcuid taiscí a fhágáil ag pointe ar bith, beag beann ar ghníomhartha an pháirtí eile.

Chun scor ón gcainéil a phróiseáil, ní mór don úsáideoir an nuashonrú staide bailí deiridh den fheidhmchlár a chur isteach sa chonradh ar slabhra. Más féidir é seo a dhearbhú (i.e., tá síniú gach páirtí air), ansin déantar cistí a athdháileadh ina bhfabhar.

Tá moill, áfach, maidir le hiarratais scoir aon-úsáideoir a rith. Má tá an t-iarratas chun an cainéal a thabhairt i gcrích faofa d'aon toil, ansin déantar an t-idirbheart scoir ar slabhra a rith láithreach.

Tagann an mhoill i bhfeidhm maidir le scoir aon-úsáideora mar gheall ar fhéidearthacht gníomhartha calaoiseacha. Mar shampla, féadfaidh rannpháirtí cainéil iarracht a dhéanamh an cainéal a thabhairt chun críche ar Ethereum trí nuashonrú staide níos sine a chur isteach ar slabhra.

Mar fhrithbheart, cuireann cainéil staide ar chumas úsáideoirí macánta dúshlán a thabhairt do nuashonruithe staide neamhbhailí trí staid bhailí is déanaí an chainéil ar slabhra a chur isteach. Deartar cainéil staide ionas go n-iompaíonn nuashonruithe staid níos nuaí, comhaontaithe, nuashonruithe staid níos sine.

Chomh luath agus a spreagann piaraí an córas réitigh díospóide ar slabhra, ceanglaítear ar an bpáirtí eile freagairt laistigh de theorainn ama (ar a dtugtar an fhuinneog dúshláin). Ligeann sé seo d’úsáideoirí dúshlán a thabhairt don idirbheart scoir, go háirithe má tá an páirtí eile ag cur uasdátú seanda i bhfeidhm.

Cibé cás, bíonn ráthaíochtaí críochnaitheachta láidre ag úsáideoirí cainéil i gcónaí: má shínigh na comhaltaí go léir an t-aistriú staide ina seilbh agus gurb é an nuashonrú is déanaí é, ansin tá sé chomh críochnaitheach le hidirbheart rialta ar slabhra. Caithfidh siad fós dúshlán a thabhairt don pháirtí eile ar slabhra, ach is é an t-aon toradh a d'fhéadfadh a bheith ann ná an staid bhailí deiridh, atá acu, a thabhairt chun críche.

### Conas a idirghníomhaíonn cainéil staide le Ethereum? {#how-do-state-channels-interact-with-ethereum}

Cé go bhfuil siad ann mar phrótacail as slabhra, tá comhpháirt ar slabhra ag cainéil staide: an conradh cliste a imscartar ar Ethereum agus an cainéal á oscailt. Rialaíonn an conradh seo na sócmhainní a thaisctear sa chainéal, fíoraíonn sé nuashonruithe staide, agus eadránaíonn sé díospóidí idir rannpháirtithe.

Ní fhoilsíonn cainéil staide sonraí idirbhirt ná gealltanais staide chuig Mainnet, murab ionann agus réitigh scálaithe [ciseal 2](/ciseal-2/). Mar sin féin, tá siad níos nasctha le Mainnet ná, abair, [taobhshlabhraí](/developers/docs/scaling/sidechains/), rud a fhágann go bhfuil siad beagán níos sábháilte.

Braitheann cainéil staide ar phríomhphrótacal Ethereum le haghaidh na nithe seo a leanas:

#### 1. Beocht {#liveness}

Tá an conradh ar slabhra a imscartar nuair a bhíonn an cainéal á oscailt freagrach as feidhmiúlacht an chainéil. Má tá an conradh ag rith ar Ethereum, ansin tá an cainéal ar fáil i gcónaí le húsáid. Os a choinne sin, is féidir le taobhshlabhra teip i gcónaí, fiú má tá Mainnet ag feidhmiú, ag cur cistí úsáideoirí i mbaol.

#### 2. Slándáil {#security}

Go pointe áirithe, bíonn cainéil staide ag brath ar Ethereum chun slándáil a sholáthar agus úsáideoirí a chosaint ó phiaraí mailíseacha. Mar atá pléite in ailt níos déanaí, úsáideann cainéil meicníocht chruthúnas calaoise a ligeann d’úsáideoirí dúshlán a thabhairt d’iarrachtaí an cainéal a thabhairt chun críche le nuashonrú neamhbhailí nó sean.

Sa chás seo, soláthraíonn an páirtí macánta staid bhailí is déanaí an chainéil mar chruthúnas calaoise don chonradh ar slabhra lena fhíorú. Cuireann cruthúnais chalaoise ar chumas páirtithe nach bhfuil muinín acu as a chéile idirbhearta as slabhra a dhéanamh gan a gcuid cistí a chur i mbaol sa phróiseas.

#### 3. Chríochnaitheacht {#finality}

Meastar go bhfuil nuashonruithe staide arna síniú le chéile ag úsáideoirí cainéal chomh maith le hidirbhearta ar slabhra. Mar sin féin, ní bhaineann gach gníomhaíocht in-chainéil fíor-chríochnaitheacht amach ach amháin nuair a dhúntar an cainéal ar Ethereum.

Sa chás dóchasach, is féidir leis an dá pháirtí comhoibriú agus an nuashonrú staide deiridh a shíniú agus ar slabhra a chur isteach chun an cainéal a dhúnadh, ansin déantar na cistí a dháileadh de réir staid dheiridh an chainéil. Sa chás doirbh, nuair a dhéanann duine iarracht caimiléireacht trí nuashonrú staid míchearta a phostáil ar slabhra, ní thugtar a n-idirbheart chun críche go dtí go dtéann an fhuinneog dúshláin thart.

## Cainéil staide fíorúla {#virtual-state-channels}

Is éard a bheadh ​​i gceist le cur i bhfeidhm saonta cainéal staide conradh nua a imscaradh nuair is mian le beirt úsáideoir feidhmchlár a rith ar slabhra. Ní hamháin go bhfuil sé seo indéanta, ach diúltaíonn sé cost-éifeachtúlacht na gcainéal staide (is féidir go dtiocfaidh méadú tapa ar chostais idirbheartaíochta ar slabhra).

Chun an fhadhb seo a réiteach, cruthaíodh "cainéil fhíorúla". Murab ionann agus cainéil rialta a éilíonn idirbhearta ar slabhra a oscailt agus a fhoirceannadh, is féidir cainéal fíorúil a oscailt, a fhorghníomhú, agus a thabhairt chun críche gan idirghníomhú leis an bpríomhshlabhra. Is féidir fiú díospóidí a réiteach as slabhra ag baint úsáide as an modh seo.

Braitheann an córas seo ar "chainéil mhórleabhair" mar a thugtar orthu, atá maoinithe ar slabhra a bheith ann. Is féidir cainéil fhíorúla idir dhá pháirtí a thógáil ar bharr an chainéil mhórleabhair atá ann cheana féin, agus úinéir(í) an chainéil mhórleabhair ag feidhmiú mar idirghabhálaí.

Idirghníomhaíonn úsáideoirí i ngach cainéal fíorúil trí ásc chonartha nua, agus tá an cainéal mórleabhair in ann tacú le hiliomad cásanna conartha. Tá níos mó ná staid stóras conartha amháin i staid an chainéil mhórleabhair freisin, rud a cheadaíonn feidhmiú comhthreomhar as slabhra idir úsáideoirí éagsúla.

Díreach cosúil le cainéil rialta, malartaíonn úsáideoirí nuashonruithe staide chun an meaisín staide a chur chun cinn. Mura dtagann díospóid chun cinn, ní gá dul i dteagmháil leis an idirghabhálaí ach amháin nuair a bhíonn an cainéal á oscailt nó á fhoirceannadh.

### Cainéil íocaíochta fhíorúla {#virtual-payment-channels}

Feidhmíonn cainéil íocaíochta fhíorúla as an smaoineamh céanna le cainéil fhíorúla staide: is féidir le rannpháirtithe atá ceangailte leis an líonra céanna teachtaireachtaí a sheoladh gan gá le cainéal nua ar slabhra a oscailt. I gcainéil fhíorúla íocaíochta, seoltar aistrithe luacha trí idirghabhálaí amháin nó níos mó, le ráthaíochtaí nach féidir ach leis an bhfaighteoir beartaithe cistí aistrithe a fháil.

## Feidhmchláir chainéil staide {#applications-of-state-channels}

### Íocaíochtaí {#payments}

Prótacail shimplí a bhí sna cainéil bhlocshlabhra luatha a cheadaigh do bheirt rannpháirtí aistrithe tapa ar tháillí íseal a dhéanamh as slabhra gan a bheith orthu táillí arda idirbhirt a íoc ar Mainnet. Sa lá atá inniu ann, tá cainéil íocaíochta fós úsáideach d'iarratais atá deartha chun éitear agus comharthaí a mhalartú agus a thaisceadh.

Tá na buntáistí seo a leanas ag íocaíochtaí bunaithe ar chainéil:

1. \*\*Tréchur \*\*: Níl baint ag méid na n-idirbheart ar slabhra in aghaidh an chainéil le tréchur Ethereum, atá faoi thionchar ag fachtóirí éagsúla, go háirithe méid na mbloc agus am bloc. Trí idirbhearta as slabhra a rith, is féidir le cainéil bhlocshlabhra tréchur níos airde a bhaint amach.

2. **Príobháideacht**: Toisc go bhfuil na cainéil as slabhra, ní dhéantar sonraí na n-idirghníomhaíochtaí idir rannpháirtithe a thaifeadadh ar blocshlabhra poiblí Ethereum. Ní bhíonn ar úsáideoirí cainéal ach idirghníomhú ar slabhra ach nuair a bhíonn siad ag maoiniú agus ag dúnadh cainéil nó ag réiteach díospóidí. Mar sin, tá cainéil úsáideach do dhaoine aonair a dteastaíonn níos mó idirbhearta príobháideacha uathu.

3. \*\* Aga folaigh\*\*: Is féidir idirbhearta as slabhra a dhéantar idir rannpháirtithe an chainéil a shocrú láithreach, má chomhoibríonn an dá pháirtí, rud a laghdóidh moilleanna. I gcodarsnacht leis sin, chun idirbheart a sheoladh ar Mainnet ní mór fanacht le nóid chun an t-idirbheart a phróiseáil, bloc nua a tháirgeadh leis an idirbheart, agus teacht ar chomhdhearcadh. Seans go mbeidh ar úsáideoirí fanacht le tuilleadh dearbhuithe bloc sula mbreithnítear idirbheart a tugadh chun críche.

4. **Costas**: Tá cainéil staide\* thar a bheith úsáideach i gcásanna ina malartóidh tacar rannpháirtithe go leor nuashonruithe staide thar thréimhse fhada. Is iad na costais amháin a thabhaítear ná conradh cliste an chainéil staide a oscailt agus a dhúnadh; beidh gach athrú staide idir oscailt agus dúnadh an chainéil níos saoire ná an ceann deireanach toisc go ndéantar an costas socraíochta a dháileadh dá réir.

Má chuirtear cainéil staide i bhfeidhm ar réitigh ciseal 2, amhail [uas-scáluithe] (/forbróirí/doiciméid/scála/#rollups), d’fhéadfaí iad a dhéanamh níos tarraingtí fós le haghaidh íocaíochtaí. Cé go dtugann cainéil íocaíochtaí saora, d’fhéadfadh na costais a bhaineann le bunú an chonartha ar slabhra ar Mainnet le linn na céime tosaigh a bheith costasach - go háirithe nuair a thagann ardú ar tháillí gáis. Tairgeann uas-scálú atá bunaithe ar Ethereum [táillí idirbheartaíochta níos ísle](https://l2fees.info/) agus féadann siad forchostas a laghdú do rannpháirtithe cainéil trí tháillí socraithe a laghdú.

### Micrea-idirbhearta {#microtransactions}

Is íocaíochtaí ar luach íseal iad micrea-idirbhearta (m.sh., níos ísle ná codán de dhollair) nach féidir le gnólachtaí a phróiseáil gan caillteanais a thabhú. Ní mór do na haonáin seo soláthraithe seirbhíse íocaíochta a íoc, rud nach féidir leo a dhéanamh má tá an corrlach ar íocaíochtaí custaiméirí ró-íseal le brabús a dhéanamh.

Réitíonn bealaí íocaíochta an fhadhb seo tríd an bhforchostas a bhaineann le micrea-idirbhearta a laghdú. Mar shampla, is féidir le Soláthraí Seirbhíse Idirlín (ISP) cainéal íocaíochta a oscailt le custaiméir, rud a ligeann dóibh íocaíochtaí beaga a shruthú gach uair a úsáideann siad an tseirbhís.

Taobh amuigh den chostas a bhaineann leis an gcainéal a oscailt agus a dhúnadh, ní thabhaíonn rannpháirtithe costais bhreise ar mhicrea-idirbhearta (gan táillí gáis). Is cás é seo a dhéanann buntáiste do chách ós rud é go bhfuil níos mó solúbthachta ag custaiméirí maidir leis an méid a íocann siad as seirbhísí agus nach gcaillfidh gnólachtaí amach ar mhicrea-idirbhearta brabúsacha.

### Feidhmchláir dhíláraithe {#decentralized-applications}

Cosúil le cainéil íocaíochta, is féidir le cainéil staide íocaíochtaí coinníollacha a dhéanamh de réir staid dheiridh an mheaisín staide. Is féidir le cainéil staide tacú le loighic aistrithe staide treallach freisin, rud a fhágann go bhfuil siad úsáideach chun aipeanna cineálacha a rith as slabhra.

Is minic go mbíonn cainéil staide teoranta d’iarratais shimplí atá bunaithe ar shealanna, mar go ndéanann sé seo níos éasca cistí atá tiomanta don chonradh ar slabhra a bhainistiú. Chomh maith leis sin, le líon teoranta páirtithe ag nuashonrú staid an iarratais as slabhra ag eatraimh, tá sé sách simplí iompar mímhacánta a phionósú.

Braitheann éifeachtacht iarratais cainéal staide freisin ar a dhearadh. Mar shampla, d'fhéadfadh forbróir an conradh cainéal aip a imscaradh uair amháin agus ligean d'imreoirí eile an aip a athúsáid gan dul ar slabhra. Sa chás seo, feidhmíonn an aip chainéal tosaigh mar chainéal mórleabhair a thacaíonn le hil-chainéil fhíorúla, gach ceann acu ag rith sampla nua as slabhra conradh cliste an aip.

Cás úsáide féideartha d’fheidhmchláir chainéil staide is ea cluichí simplí dhá imreoir, ina ndáiltear cistí bunaithe ar thoradh an chluiche. Is é an buntáiste atá leis seo ná nach gcaithfidh imreoirí muinín a chur ina chéile (dílárú) agus rialaíonn an conradh ar slabhra, ní imreoirí, leithdháileadh cistí agus réiteach díospóidí (dílárú).

I measc na gcásanna úsáide féideartha eile le haghaidh aipeanna cainéal staide tá úinéireacht ainm ENS, mórleabhair NFT, agus go leor eile.

### Aistrithe adamhacha {#atomic-transfers}

Bhí cainéil luathíocaíochta teoranta d'aistrithe idir dhá pháirtí, rud a chuir srian lena n-in-úsáidteacht. Mar sin féin, thug bunú na gcainéil fhíorúla deis do dhaoine aonair aistrithe a dhéanamh trí idirghabhálaithe (i.e., ilchainéil p2p) gan a bheith orthu cainéal nua a oscailt.

Tugtar “aistrithe multi-hop” orthu go coitianta, tá íocaíochtaí ródaithe adamhach (i.e., éiríonn le gach cuid den idirbheart nó teipeann sé ar fad). Úsáideann aistrithe adamhacha [Haiseanna Conarthaí Glais Ama(HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) chun a chinntiú nach scaoiltear an íocaíocht ach amháin má chomhlíontar coinníollacha áirithe, rud a laghdaíonn an riosca contrapháirtí.

## Míbhuntáistí a bhaineann le cainéil staide a úsáid {#drawbacks-of-state-channels}

### Toimhdí beochta {#liveness-assumptions}

Chun éifeachtúlacht a chinntiú, cuireann cainéil staide teorainneacha ama ar chumas rannpháirtithe na gcainéal freagairt a thabhairt ar dhíospóidí. Glacann an riail seo leis go mbeidh piaraí ar líne i gcónaí chun monatóireacht a dhéanamh ar ghníomhaíocht cainéal agus chun dúshláin a chonspóid nuair is gá.

I ndáiríre, is féidir le húsáideoirí dul as líne ar chúiseanna nach bhfuil smacht acu orthu (m.sh. nasc idirlín lag, teip mheicniúil, srl.). Má théann úsáideoir macánta as líne, is féidir le piaraí mailíseacha leas a bhaint as an scéal trí sheanstaideanna idirmheánacha a chur i láthair an chonartha breithneora agus na cistí geallta a ghoid.

Úsáideann roinnt cainéal “túir fhaire”—aonáin atá freagrach as féachaint ar imeachtaí díospóide ar slabhra thar ceann daoine eile agus as na bearta riachtanacha a dhéanamh, amhail foláireamh a thabhairt do pháirtithe lena mbaineann. Mar sin féin, féadfaidh sé seo cur leis na costais a bhaineann le cainéal staide a úsáid.

### Neamh-infhaighteacht sonraí {#data-unavailability}

Mar a míníodh níos luaithe, ní mór an staid bhailí is déanaí den chainéil staide a chur i láthair chun díospóid neamhbhailí a chomhrac. Seo riail eile atá bunaithe ar thoimhde - go bhfuil rochtain ag úsáideoirí ar an staid is déanaí ar an gcainéal.

Cé go bhfuil sé réasúnta a bheith ag súil le húsáideoirí cainéil cóipeanna de staid iarratais as slabhra a stóráil, d'fhéadfadh na sonraí seo a bheith caillte mar gheall ar earráid nó teip mheicniúil. Mura bhfuil na sonraí cúltacaithe ag an úsáideoir, ní féidir leo ach a bheith ag súil nach gcuirfidh an páirtí eile iarratas scoir neamhbhailí i gcrích trí úsáid a bhaint as seanaistrithe staide atá ina sheilbh.

Ní chaithfidh úsáideoirí Ethereum déileáil leis an bhfadhb seo ós rud é go gcuireann an líonra rialacha i bhfeidhm maidir le hinfhaighteacht sonraí. Stóráiltear agus iomadaítear sonraí idirbhirt ag gach nód agus bíonn siad ar fáil d’úsáideoirí le híoslódáil más gá agus nuair is gá.

### Saincheisteanna leachtachta {#liquidity-issues}

Chun cainéal blocshlabhra a bhunú, ní mór do rannpháirtithe cistí a ghlasáil i gconradh cliste ar slabhra ar feadh saolré an chainéil. Laghdaíonn sé seo leachtacht úsáideoirí cainéal agus cuireann sé srian freisin ar chainéil dóibh siúd atá in acmhainn cistí a choinneáil faoi ghlas ar Mainnet.

Mar sin féin, is féidir le cainéil mhórleabhair - arna n-oibriú ag soláthraí seirbhíse as slabhra (OSP) - saincheisteanna leachtachta a laghdú d'úsáideoirí. Is féidir le beirt phiaraí atá ceangailte le cainéal mórleabhair cainéal fíorúil a chruthú, ar féidir leo a oscailt agus a thabhairt chun críche go hiomlán as slabhra, am ar bith is mian leo.

D’fhéadfadh soláthraithe seirbhísí as slabhra cainéil a oscailt le piaraí iolracha freisin, rud a fhágann go bhfuil siad úsáideach chun íocaíochtaí a ródú. Ár ndóigh, ní mór d’úsáideoirí táillí a íoc le OSPanna ar son a gcuid seirbhísí, rud a d’fhéadfadh a bheith neamh-inmhianaithe do roinnt daoine.

### Ionsaithe 'griefing' {#griefing-attacks}

Is gné choitianta de chórais cruthúnas calaoise iad ionsaithe 'griefing'. Ní théann ionsaí 'griefing' chun leasa an ionsaitheora go díreach ach cruthaíonn sé brón (i.e., dochar) don íospartach, agus mar sin an t-ainm.

Is féidir le cruthúnas calaoise ionsaithe 'griefing' a fhulaingt toisc go gcaithfidh an páirtí macánta freagra a thabhairt ar gach díospóid, fiú díospóidí neamhbhailí, nó caillfidh siad a gcuid cistí. Is féidir le rannpháirtí mailíseach cinneadh a dhéanamh arís agus arís eile aistrithe seanstaide a phostáil ar slabhra, rud a chuireann iallach ar an bpáirtí macánta freagra a thabhairt leis an staid bhailí. Féadann costas na n-idirbheart ar slabhra méadú go tapa, rud a fhágann go gcaillfidh páirtithe macánta amach sa phróiseas.

### Tacair rannpháirtí réamhshainithe {#predefined-participant-sets}

De réir dearaidh, fanann líon na rannpháirtithe a chuimsíonn cainéal staide seasta ar feadh a shaolré. Is é an fáth atá leis seo ná go gcuirfeadh nuashonrú an tacair rannpháirtí castacht le hoibriú an chainéil, go háirithe agus an cainéal á mhaoiniú, nó díospóidí á réiteach. Bheadh ​​gníomhaíocht bhreise ar slabhra de dhíth freisin chun rannpháirtithe a chur leis nó a bhaint, rud a mhéadódh forchostais d’úsáideoirí.

Cé go n-éascaíonn sé seo an réasúnú faoi chainéil staide, cuireann sé teorainn le húsáidí dearaí cainéal d'fhorbróirí feidhmchlár. Míníonn sé seo go páirteach cén fáth ar laghdaíodh cainéil staide i bhfabhar réitigh scálaithe eile, ar nós uas-scáluithe.

### Próiseáil idirbheart comhthreomhar {#parallel-transaction-processing}

Seolann rannpháirtithe sa chainéal stáit nuashonruithe stáit ar a seal, agus is é sin an fáth go n-oibríonn siad is fearr le haghaidh “feidhmchláir bunaithe ar chasadh” (m.sh., cluiche fichille dhá imreoir). Cuireann sé seo deireadh leis an ngá atá le nuashonruithe staide comhuaineacha a láimhseáil agus laghdaítear an obair a chaithfidh an conradh ar slabhra a dhéanamh chun pionós a ghearradh ar phostáluithe nua nuashonraithe atá as dáta. Mar sin féin, is taobh-éifeacht den dearadh seo go bhfuil idirbhearta ag brath ar a chéile, ag méadú aga folaigh agus ag laghdú ar an taithí úsáideora iomlán.

Réitíonn roinnt cainéil staide an fhadhb seo trí dhearadh “lán-dhéphléacsacha” a úsáid a scarann ​​an staid as slabhra ina dhá staid “shimplí” aontreocha, rud a cheadaíonn nuashonruithe comhthráthacha staide. Feabhsaíonn dearaí den sórt sin tréchur as slabhra agus laghdaítear moilleanna idirbheartaíochta.

## Úsáid cainéil staide {#use-state-channels}

Soláthraíonn tionscadail iolracha feidhmiúcháin de chainéil staide ar féidir leat iad a chomhtháthú le do dapps:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Tuilleadh léitheoireachta {#further-reading}

**Cainéil staide**

- [Ciall a bhaint as Réitigh Scálú Ciseal 2 Ethereum: Cainéil Staide, Plasma, agus Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Feabhra 2018_
- [Cainéil Staide - míniú](https://www.jeffcoleman.ca/state-channels/) 6 Samhain, 2015 - Jeff Coleman_
- [Bunús na gCainéal Staide](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Cainéil Staide Blocshlabhra: Staid den Scoth](https://ieeexplore.ieee.org/document/9627997)

_An bhfuil eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis é!_
