---
title: Uas-scáluithe dóchasacha
description: Réamheolas ar uas-scáluithe dóchasacha - réiteach scálaithe a úsáideann pobal Ethereum.
lang: ga
---

Is prótacail ciseal 2 (L2) iad uas-scáluithe dóchasacha atá deartha chun tréchur bhunchiseal Ethereum a leathnú. Laghdaíonn siad ríomh ar phríomh-shlabhra Ethereum trí idirbhearta a phróiseáil as slabhra, ag tairiscint feabhsuithe suntasacha ar luasanna próiseála. Murab ionann agus réitigh scálaithe eile, mar [ taobhshlabhraí](/developers/docs/scaling/sidechains/), díorthaíonn uas-scáluithe dóchasacha slándáil ó Príomhlíonra trí thorthaí idirbheart a fhoilsiú ar slabhra, nó [ slabhraí plasma](/developers/docs/scaling/plasma/), a fhíoraíonn idirbhearta sonraí idirbheart Ethereum le cruthúnais calaoise freisin.

Toisc gurb é an ríomh an chuid mhall, chostasach d'úsáid Ethereum, is féidir le huas-scáluithe dóchasacha feabhsuithe suas le 10-100x in inscálaitheacht a thairiscint. Scríobhann uas-scáluithe dóchasacha idirbhearta chuig Ethereum mar `calldata` nó i [blobaí](/roadmap/danksharding/), rud a laghdaíonn costais gháis d'úsáideoirí.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh ár leathanaigh ar [Scálú Ethereum](/developers/docs/scaling/) agus [ciseal 2](/layer-2/) léite agus tuigthe agat.

## Cad is uas-scálú dóchasach ann? {#what-is-an-optimistic-rollup}

Is ionann uas-scálú dóchasach agus cur chuige maidir le scálú Ethereum a bhaineann le ríomh agus stóras staide a bhogadh as slabhra. Ritheann uas-scáluithe dóchasacha idirbhearta lasmuigh de Ethereum, ach postálann siad sonraí idirbhirt chuig Príomhlíonra mar `calldata` nó i [blobaí](/roadmap/danksharding/).

Déanann oibreoirí uas-scáluithe dóchasacha il-idirbheart as slabhra a chumhdach le chéile i mbaisceanna móra sula gcuirtear faoi bhráid Ethereum iad. Leis an gcur chuige seo is féidir costais sheasta a leathadh thar idirbhearta iolracha i ngach baisc, ag laghdú táillí d’úsáideoirí deiridh. Úsáideann uas-scáluithe dóchasacha freisin teicnící comhbhrú chun méid na sonraí a phostáiltear ar Ethereum a laghdú.

Meastar go bhfuil uas-scáluithe dóchasacha “dóchasach” toisc go nglacann siad leis go bhfuil idirbhearta seachshlabhra bailí agus nach bhfoilsíonn siad cruthúnais bailíochta do bhaisceanna idirbheart a phostáiltear ar slabhra. Scarann ​​sé seo uas-scáluithe dóchasacha ó [uas-scálú eolas-nialais](/developers/docs/scaling/zk-rollups) a fhoilsíonn [cruthúnais bhailíochta](/glossary/#validity-proof) le haghaidh idirbhearta as slabhra.

Ina ionad sin, braitheann uas-scáluithe dóchasacha ar scéim chun calaois a chruthú chun cásanna a bhrath nach ndéantar idirbhearta a ríomh i gceart. Tar éis baisc uas-scáluithe a chur isteach ar Ethereum, tá tréimhse ama ann (ar a dtugtar tréimhse dhúshláin) inar féidir le duine ar bith dúshlán a thabhairt do thorthaí idirbheart uas-scálaithe trí [chruthúnas calaoise](/glossary/#fraud-proof) a ríomh.

Má éiríonn leis an gcruthúnas calaoise, déanann an prótacal uas-scálú an idirbhirt (na n-idirbhearta) a ath-rith agus déanann sé staid an uascálaithe a nuashonrú dá réir. Is é an éifeacht eile a bhaineann le cruthú calaoise rathúil ná go gcuirtear pionós ar an seicheamhóir atá freagrach as an idirbheart a rinneadh go mícheart a áireamh i mbloc.

Mura dtugtar dúshlán don bhaisc uas-scálaithe (i.e., déantar gach idirbheart i gceart) tar éis don tréimhse dúshláin dul in éag, meastar é a bheith bailí agus glactha ar Ethereum. Féadfaidh daoine eile leanúint ar aghaidh ag tógáil ar bhloc uas-scálaithe neamhdheimhnithe, ach le caveat: déanfar torthaí idirbheart a aisiompú má tá siad bunaithe ar idirbheart a rinneadh go mícheart a foilsíodh roimhe seo.

## Conas a idirghníomhaíonn uas-scáluithe dóchasacha le Ethereum? {#optimistic-rollups-and-Ethereum}

Tá uas-scáluithe dóchasacha ina [réitigh scálaithe as slabhra](/developers/docs/scaling/#offchain-scaling) tógtha chun oibriú ar bharr Ethereum. Déantar gach uas-scálú dóchasach a bhainistiú trí shraith conarthaí cliste a imscartar ar líonra Ethereum. Próiseálann uascáluithe dóchasacha idirbhearta as an bpríomhshlabhra Ethereum, ach postálann siad idirbhearta as slabhra (i mbaisceanna) chuig conradh uas-scálaithe ar slabhra. Cosúil leis an blocshlabhra Ethereum, tá an taifead idirbheart seo do-athraithe agus is "slabhra uas-scálaithe dóchasach" é.

Cuimsíonn ailtireacht uas-scálú dóchasach na codanna seo a leanas:

**Conarthaí ar slabhra**: Tá feidhmiú an uas-scálú dóchasach á rialú ag conarthaí cliste a ritheann ar Ethereum. Áirítear leis seo conarthaí a stórálann bloic uas-scáluithe, a dhéanann monatóireacht ar nuashonruithe staide ar an uascálú, agus a rianaíonn taiscí úsáideoirí. Sa chiall seo, feidhmíonn Ethereum mar an ciseal bonn nó "ciseal 1" le haghaidh uas-scáluithe dóchasacha.

**Meaisín fíorúil as slabhra (VM)**: Cé go bhfuil conarthaí a bhainistíonn an prótacal uas-scálaithe dóchasach á rith ar Ethereum, déanann an prótacal uasc-scálaithe ríomh agus stóráil staide ar mheaisín fíorúil eile ar leith ón [Meaisín Fíorúil Ethereum](/developers/docs/evm/). Is i slabhra VM a chónaíonn feidhmchláir agus ina ritear athruithe staide; feidhmíonn sé mar chiseal uachtarach nó "ciseal 2" le haghaidh uas-scálú dóchasach.

Toisc go bhfuil uas-scáluithe dóchasacha deartha chun cláir a rith atá scríofa nó tiomsaithe don EVM, cuimsíonn an as slabhra VM go leor sonraíochtaí dearaidh EVM. Ina theannta sin, ceadaíonn cruthúnais calaoise a ríomhtar ar slabhra do líonra Ethereum bailíocht na n-athruithe staide a ríomhtar sa VM as slabhra a fhorfheidhmiú.

Déantar cur síos ar uas-scáluithe dóchasacha mar 'réitigh scálaithe hibrideacha' mar, cé go bhfuil siad ann mar phrótacail ar leithligh, díorthaítear a n-airíonna slándála ó Ethereum. I measc rudaí eile, ráthaíonn Ethereum cruinneas ríomh as slabhra uas-scáluithe agus infhaighteacht na sonraí taobh thiar den ríomh. Déanann sé seo uas-scáluithe dóchasacha níos sláine ná prótacail scálaithe as slabhra íon (m.sh., [ taobh-shlabhraí taobh](/developers/docs/scaling/sidechains/)) nach bhfuil ag brath ar Ethereum le haghaidh slándála.

Braitheann uas-scáluithe dóchasacha ar phríomh-phrótacal Ethereum do na nithe seo a leanas:

### Infhaighteacht sonraí {#data-availability}

Mar a luadh, cuireann uas-scáluithe dóchasacha sonraí idirbhirt chuig Ethereum mar `calldata` nó [blobaí](/roadmap/danksharding/). Ós rud é go bhfuil forghníomhú an tslabhra uas-scálaithe bunaithe ar idirbhearta a cuireadh isteach, is féidir le duine ar bith an fhaisnéis seo a úsáid - atá daingnithe ar an ciseal bunúsach Ethereum - chun staid an uas-scálaithe a rith agus chun cruinneas na n-aistrithe staide a fhíorú.

Tá [Infhaighteacht sonraí](/developers/docs/data-availability/) ríthábhachtach mar gan rochtain ar shonraí staide, ní féidir le lucht dúshláin cruthúnais calaoise a thógáil chun oibríochtaí uas-scálaithe neamhbhailí a cheistiú. Agus infhaighteacht sonraí á gcur ar fáil ag Ethereum, laghdaítear an baol go n-éireoidh le hoibreoirí uas-scáluithe gníomhartha mailíseacha (m.sh. bloic neamhbhailí a chur isteach) a dhéanamh.

### Friotaíocht chinsireachta {#censorship-resistance}

Braitheann uas-scáluithe dóchasacha freisin ar Ethereum le cur in aghaidh na cinsireachta. In uas-scálú dóchasach tá aonán láraithe (an t-oibreoir) freagrach as idirbhearta a phróiseáil agus as bloic uascálaithe a chur isteach chuig Ethereum. Tá roinnt impleachtaí aige seo:

- Is féidir le hoibreoirí uas-scálaithe úsáideoirí a chinsireacht trí dhul as líne go hiomlán, nó trí bhloic a dhiúltú a chuimsíonn idirbhearta áirithe iontu.

- Is féidir le hoibreoirí uas-scálaithe úsáideoirí a chosc ó chistí atá i dtaisce sa chonradh uas-scálaithe a aistarraingt trí shonraí staide atá riachtanach chun cruthúnais úinéireachta Merkle a choinneáil siar. Nuair a choinnítear siar sonraí staide is féidir staid an uas-scálaithe a cheilt ó úsáideoirí agus iad a chosc ó idirghníomhú leis an uas-scálú.

Réitíonn uas-scáluithe dóchasacha an fhadhb seo trí iallach a chur ar oibreoirí sonraí a bhaineann le nuashonruithe staide a fhoilsiú ar Ethereum. Tá na buntáistí seo a leanas ag baint le sonraí uas-scálaithe a fhoilsiú ar slabhra:

- Má théann oibritheoir uas-scáluithe dóchasacha as líne nó má stopann sé táirgeadh bhaisceanna idirbheart, is féidir le nód eile sonraí atá ar fáil a úsáid chun staid dheireanach an uas-scálaithe a atáirgeadh agus leanúint ar aghaidh le táirgeadh bloc.

- Is féidir le húsáideoirí sonraí idirbhirt a úsáid chun cruthúnais Merkle a chruthú a chruthaíonn úinéireacht cistí agus a gcuid sócmhainní a tharraingt siar ón uas-scálú.

- Is féidir le húsáideoirí a n-idirbhearta a chur isteach ar L1 freisin seachas chuig an seicheamhóir, agus sa chás sin caithfidh an seicheamhóir an t-idirbheart a chur san áireamh laistigh de theorainn ama áirithe chun leanúint de bhloic bhailí a tháirgeadh.

### Réiteach {#settlement}

Ról eile a imríonn Ethereum i gcomhthéacs uas-scáluithe dóchasacha is ea an ciseal socraíochta. Is crann taca é ciseal socraíochta don éiceachóras blocshlabhra ar fad, bunaíonn sé slándáil, agus soláthraíonn sé críochnaitheacht oibiachtúil má tharlaíonn díospóid ar shlabhra eile (uas-scáluithe dóchasacha sa chás seo) a éilíonn eadráin.

Soláthraíonn Ethereum Mainnet mol le haghaidh uas-scáluithe dóchasacha chun cruthúnais calaoise a fhíorú agus díospóidí a réiteach. Ina theannta sin, níl na hidirbhearta a dhéantar ar an uas-scálú críochnaitheach ach amháin _tar éis_ glacadh leis an mbloc uas-scálaithe ar Ethereum. Nuair a bheidh idirbheart uas-scálaithe tiomanta do chiseal bonn Ethereum, ní féidir é a rollú siar (ach amháin i gcás atheagrú caolseansúil slabhra).

## Conas a oibríonn uas-scáluithe dóchasacha? {#how-optimistic-rollups-work}

### Idirbheart a rith agus a chomhiomlánú {#transaction-execution-and-aggregation}

Cuireann úsáideoirí idirbhearta faoi bhráid “oibreoirí”, ar nóid iad atá freagrach as idirbhearta a phróiseáil ar an uas-scálú dóchasach. Déanann an t-oibreoir idirbhearta, a dtugtar “bailíochtóir” nó “comhbhailitheoir” freisin air, idirbhearta a chomhiomlánú, na sonraí bunúsacha a chomhbhrú, agus an bloc a fhoilsiú ar Ethereum.

Cé gur féidir le duine ar bith a bheith ina bhailitheoir, ní mór do bhailitheoirí uas-scáluithe dóchasacha banna a sholáthar sula ndéantar bloic a tháirgeadh, cosúil le [córas cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/). Is féidir an banna seo a chiorrú má phostálann an bailíochtóir bloc neamhbhailí nó má thógann sé bloc sean ach neamhbhailí (fiú má tá a bhloc bailí). Ar an mbealach seo, úsáideann uas-scálú dóchasach dreasachtaí cripte-eacnamaíochta chun a chinntiú go ngníomhaíonn bailíochtóirí go hionraic.

Táthar ag súil go ndéanfaidh bailíochtóirí eile ar an slabhra uas-scálú dóchasach na hidirbhearta a cuireadh isteach a rith ag baint úsáide as a gcóip féin de staid an uas-scálaithe. Má tá staid deiridh an bhailíochtóra difriúil ó staid bheartaithe an oibreora, féadfaidh sé tús a chur le dúshlán agus cruthúnas calaoise a ríomh.

Féadfaidh roinnt uas-scáluithe dóchasacha córas bailíochtaithe gan chead a sheachligean agus “seicheamhóir” amháin a úsáid chun an slabhra a rith. Cosúil le bailíochtóir, déanann an seicheamhóir idirbhearta a phróiseáil, táirgeann sé uas-scálú, agus cuireann sé idirbhearta uas-scálaithe chuig an slabhra L1 (Ethereum).

Tá an seicheamhóir difriúil ó oibritheoir uas-scálaithe rialta toisc go bhfuil níos mó smachta acu ar ordú na n-idirbheart. Chomh maith leis sin, tá rochtain tosaíochta ag an seicheamhóir ar an slabhra uas-scáluithe agus is é an t-aon aonán atá údaraithe chun idirbhearta a chur isteach sa chonradh ar slabhra. Ní dhéantar ach idirbhearta ó nóid neamhsheichimh nó ó úsáideoirí rialta a chur i scuaine i mbosca isteach ar leith go dtí go n-áiríonn an seicheamhóir iad i mbaisc nua.

#### Bloic uas-scáluithe a chur isteach chuig Ethereum {#submitting-blocks-to-ethereum}

Mar a luadh, déanann oibreoir uas-scáluithe dóchasacha idirbhearta lasmuigh den slabhra a bhailiú i mbaisc agus seolann sé í chuig Ethereum le haghaidh nótaireachta. Is éard atá i gceist leis an bpróiseas seo ná sonraí a bhaineann le hidirbhearta a chomhbhrú agus é a fhoilsiú ar Ethereum mar `calldata` nó i blobaí.

Is réimse neamh-inathraithe, neamhsheasmhach é `calldata` i gconradh cliste a iompraíonn go príomha mar [chuimhne](/developers/docs/smart-contracts/anatomy/#memory). Cé go leanann `calldata` ar slabhra mar chuid de [logaí staire](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) an blocshlabhra, ní stóráiltear é mar chuid de staid Ethereum. Toisc nach mbaineann `calldata` le haon chuid de staid Ethereum, tá sé níos saoire ná an staid chun sonraí a stóráil ar slabhra.

Úsáidtear an eochairfhocal `calldata` freisin i Solidity chun argóintí a chur ar aghaidh chuig feidhm chonartha cliste ag am forghníomhaithe. Aithníonn `calldata` an fheidhm atá á glaoch le linn idirbheart agus coinníonn sé ionchuir don fheidhm i bhfoirm seicheamh beart treallach.

I gcomhthéacs uas-scáluithe dóchasacha, úsáidtear `calldata` chun sonraí idirbheart comhbhrúite a sheoladh chuig an gconradh ar slabhra. Cuireann an t-oibreoir uas-scáluithe baisc nua leis trí ghlaoch ar an bhfeidhm riachtanach sa chonradh uas-scálaithe agus na sonraí comhbhrúite a rith mar argóintí feidhme. Laghdaítear táillí úsáideoirí trí úsáid a bhaint as `calldata` ós rud é go dtagann formhór na gcostas a thabhaíonn uas-scáluithe as sonraí a stóráil ar slabhra.

Seo [sampla](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) de chur faoi bhráid bhaisc uas-scálaithe a léiríonn oibriú an choincheapa seo. D'úsáid an seicheamhóir an modh `appendSequencerBatch()` agus chuir sé na sonraí idirbhirt chomhbhrúite mar ionchuir ag úsáid `calldata`.

Úsáideann roinnt uas-scáluithe blobaí anois chun baisceanna idirbheart a phostáil chuig Ethereum.

Tá blobanna neamh-inathraithe agus neamhsheasmhach (cosúil le `sonraí glaonna`) ach prúnáiltear iad ón stair tar éis ~18 lá. Le haghaidh tuilleadh eolais ar bhloic, féach [Danksharding](/roadmap/danksharding).

### Gealltanais staide {#state-commitments}

Ag am ar bith, eagraítear an staid uas-scálú dóchasach (cuntais, iarmhéideanna, cód conartha, etc.) mar [crann Merkle](/whitepaper/#merkle-trees) ar a dtugtar “crann staide”. Déantar fréamh an chrainn Merkle seo (fréamh staide), a thagraíonn don staid is déanaí den uas-scálú, a haiseáil agus a stóráil sa chonradh uas-scálaithe. Táirgeann gach trasdul stáit ar an slabhra staid rollup nua, a bhfuil oibreoir tiomanta dó trí fhréamh staide nua a ríomh.

Éilítear ar an oibreoir fréamhacha sean-staide agus fréamhacha staide nua araon a chur isteach nuair a bhíonn baisceanna á bpostáil. Má mheaitseálann an seanfhréamh staide an fhréamh staide atá ann cheana féin sa chonradh ar slabhra, cuirtear an dara ceann i leataobh agus cuirtear an fhréamh staide nua ina ionad.

Ceanglaítear ar an oibreoir uas-scáluithe freisin fréamh Merkle a ghealladh don bhaisc idirbheart féin. Ligeann sé seo do dhuine ar bith cuimsiú idirbheart sa bhaisc (ar L1) a chruthú trí [Merkle proof](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) a chur i láthair.

Tá gá le gealltanais staide, go háirithe fréamhacha staide, chun cruinneas na n-athruithe staide in uas-scálú dóchasach a chruthú. Glacann an conradh uas-scálaithe fréamhacha staide nua ó oibreoirí díreach tar éis iad a phostáil, ach féadann sé fréamhacha staide neamhbhailí a scriosadh níos déanaí chun an t-uas-scálú a chur ar ais go dtí a staid cheart.

### Fíorú calaoise {#fraud-proving}

Mar a mhínítear, ligeann uas-scáluithe dóchasacha do dhuine ar bith bloic a fhoilsiú gan cruthúnais bhailíochta a sholáthar. Mar sin féin, chun a chinntiú go bhfanann an slabhra slán, sonraíonn rollups dóchasach tréimhse ama inar féidir le duine ar bith agóid a dhéanamh faoi aistriú stáit. Mar sin, tugtar “dearbhuithe” ar bhlocanna uas-scálaithe mar is féidir le haon duine a mbailíocht a dhíospóid.

Má dhéanann duine agóid in aghaidh dearbhaithe, ansin cuirfidh an prótacal uas-scálaithe tús leis an ríomh cruthúnas calaoise. Tá gach cineál cruthúnais calaoise idirghníomhach - ní mór do dhuine dearbhú a phostáil sula bhféadfaidh duine eile dúshlán a thabhairt dó. Is é an difríocht ná cé mhéad babhta idirghníomhaíochta a theastaíonn chun an fíorú calaoise a ríomh.

Déanann scéimeanna um chruthú idirghníomhach aon-bhabhta idirbhearta faoi dhíospóid a athimirt ar L1 chun dearbhuithe neamhbhailí a bhrath. Déanann an prótacal uas-scálaithe aithris ar ath-rith an idirbhirt faoi dhíospóid ar L1 (Ethereum) ag baint úsáide as conradh fíoraitheora, agus is é bunchloch an stáit ríofa a chinneann cé a bhuaigh an dúshlán. Má tá éileamh an iomaitheoir faoi staid cheart an uas-scálaithe i gceart, gearrtar pionós ar an oibreoir trína bhanna a ghearradh.

Mar sin féin, chun idirbhearta a ath-rith ar L1 chun calaois a bhrath ní mór gealltanais staide a fhoilsiú maidir le hidirbhearta aonair agus méadaítear ar na sonraí is gá do na huas-scáluithe a fhoilsiú ar slabhra. Tabhaítear costais shuntasacha gáis freisin le hidirbhearta athimeartha. Ar na cúiseanna seo, tá uas-scáluithe dóchasacha ag aistriú go cruthú idirghníomhach il-bhabhta, a bhaineann an cuspóir céanna amach (i.e., oibríochtaí rollup neamhbhailí a bhrath) le níos mó éifeachtúlachta.

#### Cruthú idirghníomhach il-bhabhta {#multi-round-interactive-proving}

Is éard atá i gceist le cruthú idirghníomhach ilbhabhta ná prótacal anonn is anall idir an té atá agóid agus an t-iomaitheoir arna mhaoirsiú ag conradh fíoraitheora L1, a chinneann an páirtí bréag ar deireadh. Tar éis dúshlán nód L2 a thabhairt do dhearbhú, ní mór don éilitheoir an dearbhú faoi dhíospóid a roinnt ina dhá leath chothroma. Beidh a oiread céimeanna ríomha i ngach dearbhú aonair sa chás seo agus a bheidh sna cinn eile.

Roghnóidh an t-iomaitheoir ansin cén dearbhú atá sé ag iarraidh a dhúshlán a thabhairt. Leanann an próiseas roinnte (ar a dtugtar “prótacal déroinnte”) ar aghaidh go dtí go bhfuil an dá pháirtí ag aighneas dearbhú faoi chéim reatha _singil_. Ag an bpointe seo, réiteofar an díospóid le conradh L1 tríd an treoir (agus a thoradh) a mheas chun an páirtí calaoiseach a ghabháil.

Ceanglaítear ar an dearbhóir “cruthúnas aon-chéime” a sholáthar a fhíoraíonn bailíocht na ríomha aon-chéime atá faoi dhíospóid. Má theipeann ar an dearbhóir an cruthúnas aon-chéime a sholáthar, nó má mheasann an fíoraitheoir L1 an cruthúnas a bheith neamhbhailí, caillfidh sé an dúshlán.

Roinnt nótaí faoin gcineál seo cruthúnais calaoise:

1. Meastar go gcruthaítear calaois idirghníomhach il-bhabhta éifeachtach toisc go laghdaítear an obair a chaithfidh an slabhra L1 a dhéanamh in eadráin díospóide. In ionad an t-idirbheart iomlán a athimirt, ní gá don slabhra L1 ach céim amháin a ath-fhorghníomhú i gcur i gcrích an uas-scálaithe.

2. Laghdaíonn prótacail déroinnte an méid sonraí a phostáiltear ar slabhra (ní gá gealltanais staide a fhoilsiú do gach idirbheart). Chomh maith leis sin, ní chuireann teorainn gháis Ethereum srian ar idirbhearta uas-scáluithe dóchasacha. Os a choinne sin, ní mór do uas-scáluithe dóchasacha a ath-ritheann idirbhearta a chinntiú go bhfuil teorainn gháis níos ísle ag idirbheart L2 chun aithris a dhéanamh ar a rith laistigh d'idirbheart Ethereum amháin.

3. Bronntar cuid de bhanna an éilitheora mailísigh ar an iomaitheoir, agus dóitear an chuid eile. Coisceann an dó claonpháirteachas i measc bailíochtóirí; má thagann beirt bhailíochtóirí le chéile chun dúshláin bhréagacha a thionscnamh, forghéillfidh siad fós cuid mhór den gheall iomlán.

4. Éilíonn cruthú idirghníomhach ilbhabhta go ndéanfadh an dá pháirtí (an dearbhóir agus an t-iomaitheoir) gluaiseachtaí laistigh den fhuinneog ama sonraithe. Mura ngníomhaítear roimh éag an spriocdháta forghéillfidh an páirtí is cúis mhainneachtana an dúshlán.

#### Cén fáth a bhfuil cruthúnais calaoise tábhachtach do uas-scáluithe dóchasacha {#fraud-proof-benefits}

Tá fíorú calaoise tábhachtach toisc go n-éascaíonn siad _críochnaitheacht iontaofa_ in uas-scáluithe dóchasacha. Is cáilíocht in uas-scáluithe dóchasacha é críochnaitheacht gan iontaoibh a ráthaíonn go ndeimhneofar idirbheart - chomh fada agus a bheidh sé bailí - ar deireadh thiar.

Is féidir le nóid mhailíseacha iarracht a dhéanamh moill a chur ar dheimhniú bloc uas-scáluithe bailí trí dhúshláin bhréagacha a thosú. Mar sin féin, cruthóidh cruthúnais chalaoise bailíocht an bhloic uas-scáluithe agus déanfar é a dhearbhú.

Baineann sé seo freisin le airí slándála eile a bhaineann le huas-scáluithe dóchasacha: braitheann bailíocht an tslabhra ar nód macánta _aon_ a bheith ann. Is féidir leis an nód macánta an slabhra a chur chun cinn i gceart trí dhearbhuithe bailí a phostáil nó trí dhíospóid a dhéanamh ar dhearbhuithe neamhbhailí. Cibé an cás, caillfidh nóid mailíseach a théann i ndíospóidí leis an nód macánta a ngeallta le linn an phróisis chruthú calaoise.

### Idir-inoibritheacht L1/L2 {#l1-l2-interoperability}

Tá uas-scáluithe dóchasacha deartha le haghaidh idir-inoibritheachta le Ethereum Príomhlíonra agus ligeann siad d'úsáideoirí teachtaireachtaí agus sonraí treallacha a chur ar aghaidh idir L1 agus L2. Tá siad comhoiriúnach freisin leis an EVM, ionas gur féidir leat [dapps](/developers/docs/dapps/) atá ann cheana a phortáil chuig uas-scáluithe dóchasacha nó dapps nua a chruthú le huirlisí forbartha Ethereum.

#### 1. Gluaiseacht sócmhainní {#asset-movement}

##### Ag dul isteach san uas-scálú

Chun uas-scálú dóchasach a úsáid, cuireann úsáideoirí ETH, comharthaí ERC-20, agus sócmhainní glactha eile i dtaisce i gconradh [droichead](/developers/docs/bridges/) an rollups ar L1. Déanfaidh an conradh droichid an t-idirbheart a athsheoladh chuig L2, áit a ndéanfar méid choibhéiseach sócmhainní a bhualadh agus a sheoladh chuig an seoladh roghnaithe ag an úsáideoir ar an uas-scálú dóchasach.

De ghnáth cuirtear idirbhearta a ghintear le húsáideoirí (cosúil le taisce L1> L2) i scuaine go dtí go ndéanann an seicheamhóir iad a chur isteach arís sa chonradh uas-scálaithe. Mar sin féin, chun an fhriotaíocht chinsireachta a chaomhnú, cuireann uas-scáluithe dóchasacha ar chumas úsáideoirí idirbheart a chur isteach go díreach chuig an gconradh uas-scálaithe ar slabhra má cuireadh moill air thar an uastréimhse a cheadaítear.

Glacann roinnt uas-scáluithe dóchasacha cur chuige níos simplí chun seicheamhóirí a chosc ó úsáideoirí a chinsireacht. Anseo, sainmhínítear bloc leis na hidirbhearta go léir a cuireadh isteach sa chonradh L1 ón mbloc roimhe seo (m.sh., taiscí) de bhreis ar na hidirbhearta a phróiseáiltear ar an slabhra uas-scálaithe. Má dhéanann seicheamhóir neamhaird ar idirbheart L1, foilseoidh sé an fhréamh staide mícheart (inchruthaithe); mar sin, ní féidir le seicheamhóirí moill a chur ar theachtaireachtaí a ghintear ón úsáideoir nuair a phostáiltear iad ar L1.

##### Scor ón uas-scálú

Tá sé níos deacra tarraingt siar ó uas-scálú dóchasach go Ethereum mar gheall ar an scéim chun calaois a chruthú. Má chuireann úsáideoir tús le hidirbheart L2 > L1 chun cistí ar eascró ar L1 a aistarraingt, ní mór dóibh fanacht go dtí go rachaidh an tréimhse dúshláin — a mhaireann thart ar seacht lá — thart. Mar sin féin, tá an próiseas aistarraingthe féin sách simplí.

Tar éis an t-iarratas aistarraingthe a thionscnamh ar an uas-scálú L2, cuirtear an t-idirbheart san áireamh sa chéad bhaisc eile, agus dóitear sócmhainní an úsáideora ar an uas-scálú. Nuair a bheidh an bhaisc foilsithe ar Ethereum, is féidir leis an úsáideoir cruthúnas Merkle a ríomh lena bhfíoraítear cuimsiú a n-idirbheart scoir sa bhloc. Níl le déanamh ansin ach fanacht tríd an tréimhse moille chun an t-idirbheart ar L1 a thabhairt chun críche agus cistí a tharraingt siar go Mainnet.

Ionas nach gá fanacht seachtain roimh airgead a aistarraingt chuig Ethereum, is féidir le húsáideoirí uas-scálú dóchasach **soláthraí leachtachta** (LP) a fhostú. Glacann soláthraí leachtachta úinéireacht ar aistarraingt L2 atá ar feitheamh agus íocann sé an t-úsáideoir ar L1 (mar mhalairt ar tháille).

Is féidir le soláthraithe leachtachta bailíocht iarratas aistarraingthe an úsáideora a sheiceáil (tríd an slabhra a rith iad féin) sula scaoiltear cistí. Ar an mbealach seo tá dearbhuithe acu go ndeimhneofar an t-idirbheart sa deireadh (i.e., críochnaitheacht gan iontaoibh).

#### 2. Comhoiriúnacht EVM {#evm-compatibility}

I gcás forbróirí, is é an buntáiste a bhaineann le huas-scáluithe dóchasacha ná a gcomhoiriúnacht - nó, níos fearr fós, a gcoibhéis - le [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm/). Comhlíonann rollup EVM-comhoiriúnach na sonraíochtaí i [bPáipéar Buí Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) agus tacaíonn siad leis an EVM ag leibhéal an bheartchóid.

Tá na buntáistí seo a leanas ag baint le comhoiriúnacht EVM in uas-scáluithe dóchasacha:

i. Is féidir le forbróirí conarthaí cliste atá ann cheana féin a aistriú ar Ethereum chuig slabhraí uas-scáluithe dóchasacha gan é a bheith riachtanach dóibh bunachair chóid a mhodhnú go forleathan. Is féidir leis seo am foirne forbartha a shábháil agus conarthaí cliste Ethereum á n-imscaradh ar L2.

ii. Is féidir le forbróirí agus foirne tionscadail a úsáideann uas=scáluithe dóchasacha leas a bhaint as bonneagar Ethereum. Áirítear leis seo teangacha ríomhchlárúcháin, leabharlanna cód, uirlisí tástála, bogearraí cliant, bonneagar imlonnaithe, agus mar sin de.

Tá sé tábhachtach an uirlis atá ann cheana a úsáid mar go ndearnadh iniúchadh forleathan ar na huirlisí seo, rinneadh iad a dhífhabhtú agus a fheabhsú thar na blianta. Cuireann sé deireadh freisin leis an ngá atá le forbróirí Ethereum a fháil amach conas tógáil le stoic forbartha go hiomlán nua.

#### 3. Glaonna conartha tras-slabhra {#cross-chain-contract-calls}

Idirghníomhaíonn úsáideoirí (cuntais faoi úinéireacht sheachtrach) le conarthaí L2 trí idirbheart a chur isteach sa chonradh uas-scálaithe nó trí sheicheamhóir nó bailíochtóir é a dhéanamh ar a son. Ligeann uas-scáluithe dóchasacha freisin do chuntais chonartha ar Ethereum idirghníomhú le conarthaí L2 le conarthaí idirlinne chun teachtaireachtaí a sheoladh agus sonraí a chur ar aghaidh idir L1 agus L2. Ciallaíonn sé seo gur féidir leat conradh L1 a ríomh ar Ethereum Príomhlíonra chun feidhmeanna a bhaineann le conarthaí a agairt ar uas-scálú dóchasach L2.

Tarlaíonn glaonna conartha trasshlabhra go neamh-shioncrónach - rud a chiallaíonn go gcuirtear tús leis an nglao ar dtús, agus go ndéantar é níos déanaí. Tá sé seo difriúil ó ghlaonna idir an dá chonradh ar Ethereum, áit a dtáirgeann an glao torthaí láithreach.

Sampla de ghlao conradh trasshlabhra is ea an éarlais chomharthaíochta a thuairiscítear níos luaithe. Cuireann conradh ar L1 comharthaí an úsáideora in eascró agus seolann sé teachtaireacht chuig conradh péireáilte L2 chun an méid céanna comharthaí a bhreacadh ar an uas-scálú.

Ós rud é go n-eascraíonn rith conradh as glaonna teachtaireachtaí tras-shlabhra, is gnách go gceanglaítear ar an seoltóir [costais gháis](/developers/docs/gas/) a chlúdach le haghaidh ríomha. Tá sé inmholta teorainn ard gáis a shocrú chun an t-idirbheart a chosc ó theip ar an sprioc-shlabhra. Is sampla maith é an droichead comharthaí; má oibríonn taobh L1 an idirbhirt (na comharthaí a thaisceadh), ach go dteipeann ar an taobh L2 (comhartha comharthaí nua) mar gheall ar ghás íseal, ní féidir an taisce a aisghabháil.

Ar deireadh, ba cheart dúinn a thabhairt faoi deara go bhfuil glaonna teachtaireachta L2> L1 idir conarthaí (Déantar glaonna L1 > L2 go hiondúil tar éis roinnt nóiméad). Tá sé seo amhlaidh toisc nach féidir teachtaireachtaí a sheoltar chuig Mainnet ón uas-scálú dóchasach a chur i gcrích go dtí go dtéann an fhuinneog dúshláin in éag.

## Conas a oibríonn táillí uas-scálú dóchasach? {#how-do-optimistic-rollup-fees-work}

Úsáideann uas-scáluithe dóchasacha scéim táillí gáis, cosúil le Ethereum, chun an méid a íocann úsáideoirí in aghaidh an idirbhirt a chur in iúl. Braitheann na táillí a ghearrtar ar uas-scáluithe dóchasacha ar na comhpháirteanna seo a leanas:

1. **Scríobh staide**: Foilsíonn uas-scáluithe dóchasacha sonraí idirbhirt agus ceanntásca bloc (ina bhfuil an hais ceanntásc roimhe seo, an fhréamh staide an fhréamh baisc) chuig Ethereum mar `bhlob`, nó mar "réad mór dénártha". Thug [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) isteach réiteach cost-éifeachtach chun sonraí ar slabhra a áireamh. Is réimse idirbheart nua é `blob` a ligeann do uas-scáluithe sonraí aistrithe staide chomhbhrúite a phostáil chuig Ethereum L1. Murab ionann agus `sonraí glaonna`, a fhanann ar shlabhra go buan, tá blobanna gearrthéarmach agus is féidir iad a phrúnáil ó chliaint tar éis [4096 tréimhs](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (thart ar 18 lá). Trí úsáid a bhaint as blobaí chun baisceanna d'idirbhearta comhbhrúite a phostáil, féadann uas-scáluithe dóchasacha an costas a bhaineann le hidirbhearta a scríobh go L1 a laghdú go suntasach.

2. **Blob gáis úsáidte**: Úsáidtear meicníocht táillí dinimiciúil le hidirbhearta iompróra blobaí cosúil leis an gceann a tugadh isteach ag [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Cuireann an táille gháis le haghaidh idirbheart cineál-3 san áireamh an buntáille le haghaidh blobaí, a chinneann an líonra bunaithe ar éileamh blob-spáis agus úsáid blob-spás an idirbhirt atá á sheoladh.

3. **Táillí oibritheora L2**: Seo é an méid a íoctar leis na nóid uas-scáluithe mar chúiteamh ar chostais ríomhaireachtúla a thabhaítear in idirbhearta próiseála, cosúil le táillí gáis ar Ethereum. Gearrann nóid rollup táillí idirbhirt níos ísle ós rud é go bhfuil cumais phróiseála níos airde ag L2anna agus nach bhfuil siad ag tabhairt aghaidh ar na plódú líonra a chuireann iallach ar bhailíochtóirí ar Ethereum tosaíocht a thabhairt d'idirbhearta a bhfuil táillí níos airde orthu.

Cuireann uas-scáluithe dóchasacha roinnt meicníochtaí i bhfeidhm chun táillí a laghdú d’úsáideoirí, lena n-áirítear idirbhearta a bhaisceadh agus `calldata` a chomhbhrú chun costais fhoilsithe sonraí a laghdú. Is féidir leat an [Rianaire Táille L2](https://l2fees.info/) a sheiceáil le haghaidh forbhreathnú fíor-ama ar an méid a chosnaíonn sé uas-scáluithe dóchasacha bunaithe ar Ethereum a úsáid.

## Conas Ethereum a scálú le huas-scáluithe dóchasacha? {#scaling-ethereum-with-optimistic-rollups}

Mar a mhínítear, foilsíonn uas-scáluithe dóchasacha sonraí idirbheart comhbhrúite ar Ethereum chun infhaighteacht sonraí a ráthú. Tá an cumas chun sonraí a fhoilsítear ar slabhra a chomhbhrú ríthábhachtach chun tréchur a scálú ar Ethereum le huas-scáluithe dóchasacha.

Cuireann príomhshlabhra Ethereum teorainneacha ar an méid is féidir le bloic sonraí a choinneáil, ainmnithe in aonaid gháis (is é an [meánmhéid bloc](/developers/docs/blocks/#block-size) ná 15 milliún gás). Cé go gcuireann sé seo srian ar an méid gáis is féidir le gach idirbheart a úsáid, ciallaíonn sé freisin gur féidir linn idirbhearta próiseáilte in aghaidh an bhloc a mhéadú trí shonraí a bhaineann le hidirbhearta a laghdú – inscálaithe a fheabhsú go díreach.

Úsáideann uas-scáluithe dóchasacha roinnt teicnící chun comhbhrú sonraí idirbhirt a bhaint amach agus chun rátaí TPS a fheabhsú. Mar shampla, déanann an t- [alt](https://vitalik.eth.limo/general/2021/01/05/rollup.html) comparáid idir na sonraí a ghineann idirbheart úsáideora bunúsach (éitear seolta) ar Príomhlíonra vs cé mhéad sonraí a ghineann an t-idirbheart céanna ar uas-scálú:

| Paraiméadar  | Ethereum (L1)      | Uas-scálú (L2) |
| ------------ | ------------------ | -------------- |
| Nonce        | ~3                 | 0              |
| Praghas gáis | ~8                 | 0-0.5          |
| Gás          | 3                  | 0-0.5          |
| Chuig        | 21                 | 4              |
| Luach        | 9                  | ~3             |
| Síniú        | ~68 (2 + 33 + 33)  | ~0.5           |
| Ó            | 0 (aisghafa ó sig) | 4              |
| **Iomlán**   | **~112 beart**     | **~12 beart**  |

Má dhéantar roinnt ríomhanna garbha ar na figiúirí seo is féidir cabhrú leis na feabhsuithe inscálaithe a léiríonn uas-scálú dóchasach:

1. Is é an spriocmhéid do gach bloc ná 15 milliún gás agus cosnaíonn sé 16 gás chun beart amháin sonraí a fhíorú. Trí mheánmhéid na mbloc a roinnt ar 16 ghás (15,000,000/16) is féidir leis an meánbhloc **937,500 beart sonraí** a choinneáil.
2. Má úsáideann bun-idirbheart uas-scálaithe 12 beart, ansin is féidir leis an meán-bhloc Ethereum ** 78,125 idirbheart uas-scálaithe** (937,5000/12) nó **39 mbaisceanna uas-scálaithe** a phróiseáil (má tá 2,000 idirbheart ar an meán ag gach baisc).
3. Má tháirgtear bloc nua ar Ethereum gach 15 soicind, is ionann luasanna próiseála an uas-scálaithe agus thart ar **5,208 idirbheart in aghaidh an tsoicind**. Déantar é seo trí líon na mbun-idirbheart uas-scálaithe is féidir le bloc Ethereum (**78,125**) a choinneáil ar an meán-am bloc (**15 soicind**).

Is meastachán measartha dóchasach é seo, ós rud é nach féidir le hidirbhearta uas-scáluithe dóchasacha bloc iomlán ar Ethereum a áireamh. Mar sin féin, féadann sé tuairim gharbh a thabhairt ar cé mhéad gnóthachain inscálaithe is féidir a thabhairt d’úsáideoirí Ethereum le rollups dóchasach (tairgeann feidhmiúcháin reatha suas le 2,000 TPS).

Táthar ag súil go bhfeabhsóidh tabhairt isteach [sceardadh sonraí](/roadmap/danksharding/) ar Ethereum inscálaitheacht in uas-scáluithe dóchasacha. Toisc go gcaithfidh idirbhearta uas-scáluithe blocspás a roinnt le hidirbhearta neamh-uas-scáluithe eile, tá a gcumas próiseála teoranta ag tréchur sonraí ar phríomhshlabhra Ethereum. Méadóidh Danksharding an spás atá ar fáil do shlabhraí L2 chun sonraí a fhoilsiú in aghaidh an bhloic, ag baint úsáide as stóras “blob” níos saoire neamh-bhuana in ionad `CALLDATA` costasach, buan.

### Buntáistí agus míbhuntáistí a bhaineann le huas-scáluithe dóchasacha {#optimistic-rollups-pros-and-cons}

| Buntáistí                                                                                                                                                                                                 | Míbhuntáistí                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cuireann sé feabhsuithe ollmhóra ar inscálaitheacht ar fáil gan slándáil nó easpa muiníne a íobairt.                                                                                                      | Moill ar chríochnaitheacht idirbheart mar gheall ar dhúshláin fhéideartha calaoise.                                                                                                             |
| Stóráiltear sonraí idirbhirt ar an slabhra ciseal 1, chun trédhearcacht, slándáil, friotaíocht cinsireachta agus dílárú a fheabhsú.                                                                       | Is féidir le hoibreoirí uas-scáluithe láraithe (seicheamhóirí) tionchar a imirt ar ordú idirbhearta.                                                                                            |
| Ráthaíonn cruthú calaoise críochnúlacht neamhiontaofa agus ligeann sé do mhionlaigh macánta an slabhra a dhaingniú.                                                                                       | Mura bhfuil nóid macánta ann is féidir le hoibreoir mailíseach cistí a ghoid trí bhloic neamhbhailí agus gealltanais staide a phostáil.                                                         |
| Tá cruthúnais chalaoise ríomhaireachta oscailte do nód L2 rialta, murab ionann agus cruthúnais bailíochta (a úsáidtear i ZK-rollups) a dteastaíonn crua-earraí speisialta uathu.                          | Braitheann an tsamhail slándála ar nód macánta amháin ar a laghad a dhéanann idirbhearta rollup agus cruthúnais chalaoise a chur isteach chun agóid a dhéanamh ar aistrithe staide neamhbhailí. |
| Baineann uas-scáluithe leas as "beo iontaofa" (is féidir le duine ar bith iallach a chur ar an slabhra dul ar aghaidh trí idirbhearta a dhéanamh agus dearbhuithe a phostáil)                             | Ní mór d'úsáideoirí fanacht leis an tréimhse dhúshlán seachtaine dul in éag sula n-aistarraingítear cistí ar ais go Ethereum.                                                                   |
| Braitheann uas-scáluithe dóchasacha ar dhreasachtaí cripte-eacnamaíocha dea-dheartha chun slándáil an tslabhra a mhéadú.                                                                                  | Caithfidh Uas-scáluithe na sonraí idirbheart go léir a phostáil ar slabhra, rud a d'fhéadfadh costais a mhéadú.                                                                                 |
| Ceadaíonn comhoiriúnacht le EVM agus Solidity d'fhorbróirí conarthaí cliste dúchasacha Ethereum a phortáil chuig uas-scáluithe nó úsáid a bhaint as uirlisí atá ann cheana féin chun dapps nua a chruthú. |                                                                                                                                                                                                 |

### Míniú amhairc ar uas-scáluithe dóchasacha {#optimistic-video}

An foghlaimeoir amhairc den chuid is mó tú? Féach ar Finematics ag míniú uas-scáluithe dóchasacha:

<YouTube id="7pWxCklcNsU" start="263" />

## Tuilleadh léitheoireachta ar uas-scáluithe dóchasacha

- [Conas a oibríonn uas-scáluithe dóchasacha (An Treoir Iomlán)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Cad is Uas-Scálú Blocshlabhra ann? Réamhrá Teicniúil](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [An Treoir Riachtanach maidir le Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Treoir Phraiticiúil Maidir le hUas-scáluithe Ethereum](https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Staid na gCruthúnas Calaoise In Ethereum L2s](https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Conas a oibríonn Uas-Scálú Optimism i ndáiríre?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [Tumadh Domhain OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Cad é an Meaisín Fíorúil Dóchasach?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
