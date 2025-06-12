---
title: Fíorú foirmiúil conarthaí cliste
description: Forbhreathnú ar fhíorú fhoirmiúil do chonarthaí cliste Ethereum
lang: ga
---

Is féidir le [Conarthaí cliste](/developers/docs/smart-contracts/) feidhmchláir dhíláraithe, iontaofa agus láidre a chruthú a thugann isteach cásanna úsáide nua agus a dhíghlasálann luach d’úsáideoirí. Toisc go láimhseálann conarthaí cliste méideanna móra luacha, tá an tslándáil ríthábhachtach d'fhorbróirí.

Tá fíorú foirmiúil ar cheann de na teicníochtaí molta chun [slándáil conarthaí cliste](/developers/docs/smart-contracts/security/) a fheabhsú. Fíorú foirmiúil, a úsáideann [modhanna foirmiúla](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) chun ríomhchláir a shonrú, a dhearadh, agus a fhíorú, á n-úsáid le blianta fada chun cruinneas na gcóras crua-earraí agus bogearraí criticiúla a chinntiú.

Nuair a chuirtear i bhfeidhm é i gconarthaí cliste, féadann fíorú foirmiúil a chruthú go gcomhlíonann loighic ghnó an chonartha sonraíocht réamhshainithe. I gcomparáid le modhanna eile chun cruinneas an chóid conartha a mheas, mar shampla tástáil, tugann fíorú foirmiúil ráthaíochtaí níos láidre go bhfuil conradh cliste ceart go feidhmiúil.

## Cad is fíorú foirmiúil ann? {#what-is-formal-verification}

Tagraíonn fíorú foirmiúil don phróiseas chun cruinneas an chórais a mheas maidir le sonraíocht fhoirmiúil. I dtéarmaí níos simplí, cuireann fíorú foirmiúil ar ár gcumas seiceáil an sásaíonn iompar córais roinnt riachtanas (i.e. déanann sé an méid a theastaíonn uainn).

Déantar cur síos ar iompraíochtaí ionchasacha an chórais (conradh cliste sa chás seo) trí úsáid a bhaint as samhaltú foirmiúil, agus cuireann teangacha sonraíochta ar chumas airíonna foirmiúla a chruthú. Is féidir le teicníochtaí fíoraithe foirmiúla a fhíorú ansin go gcomhlíonann feidhmiú an chonartha a shonraíocht agus go bhfaightear cruthúnas matamaitice maidir le cruinneas an chonartha. Nuair a shásaíonn conradh a shonraíocht, déantar cur síos air mar “ceart ó thaobh feidhme”, “ceart de réir dearadh”, nó “ceart trí thógáil”.

### Cad is samhail fhoirmiúil ann? {#what-is-a-formal-model}

Sa ríomheolaíocht, is cur síos matamaiticiúil ar phróiseas ríomhaireachtúil é [samhail fhoirmiúil](https://en.wikipedia.org/wiki/Model_of_computation). Déantar cláir a achoimriú i bhfeidhmeanna matamaitice (cothromóidí), agus déanann an tsamhail cur síos ar an gcaoi a ríomhtar aschuir i bhfeidhmeanna nuair a thugtar ionchur.

Soláthraíonn samhlacha foirmiúla leibhéal asbhainte lenar féidir anailís a dhéanamh ar iompraíocht cláir. Toisc samhlacha foirmiúla a bheith ann is féidir _sonraíocht fhoirmiúil_ a chruthú, a chuireann síos ar airíonna inmhianaithe na samhla atá i gceist.

Úsáidtear teicnící éagsúla chun conarthaí cliste a shamhaltú le haghaidh fíorú foirmiúil. Mar shampla, úsáidtear roinnt samhlacha chun réasúnaíocht a dhéanamh faoi iompar ardleibhéil conradh cliste. Cuireann na teicníochtaí samhaltaithe seo dearcadh bosca dubh i bhfeidhm ar chonarthaí cliste, ag féachaint orthu mar chórais a ghlacann le hionchuir agus a dhéanann ríomh bunaithe ar na hionchuir sin.

Díríonn samhlacha ardleibhéil ar an gcaidreamh idir conarthaí cliste agus gníomhairí seachtracha, amhail cuntais faoi úinéireacht eachtrach (EOAanna), cuntais chonarthaí, agus an timpeallacht bhlocshlabhra. Tá samhlacha den sórt sin úsáideach chun airíonna a shainiú a shonraíonn conas ba cheart conradh a iompar mar fhreagra ar idirghníomhaíochtaí áirithe úsáideoirí.

Os a choinne sin, díríonn samhlacha foirmiúla eile ar iompar íseal-leibhéil conradh cliste. Cé gur féidir le samhlacha ardleibhéil cuidiú le réasúnú faoi fheidhmiúlacht conartha, d'fhéadfadh go dteipfidh orthu sonraí a fháil faoi oibriú inmheánach an fheidhmithe. Cuireann samhlacha íseal-leibhéil amharc bosca bán i bhfeidhm ar anailís ríomhchlár agus braitheann siad ar léirithe ar leibhéal níos ísle d’fheidhmchláir chliste chonarthaí, amhail rianta clár agus [>sreabhghraif rialaithe](https://en.wikipedia.org/wiki/Control-flow_graph), le réasún a thabhairt faoi na hairíonna a bhaineann le conradh a chur i gcrích.

Meastar samhlacha íseal-leibhéil a bheith oiriúnach ós rud é gurb ionann iad agus forghníomhú iarbhír conartha cliste i dtimpeallacht forghníomhaithe Ethereum (i.e. an [EVM](/developers/docs/evm/)). Tá teicnící samhaltaithe íseal-leibhéil thar a bheith úsáideach chun airíonna criticiúla sábháilteachta a bhunú i gconarthaí cliste agus chun leochaileachtaí féideartha a bhrath.

### Cad is sonraíocht fhoirmiúil ann? {#what-is-a-formal-specification}

Níl i sonraíocht ach ceanglas teicniúil nach mór do chóras áirithe a shásamh. Sa ríomhchlárú, léiríonn sonraíochtaí smaointe ginearálta faoi fheidhmiú cláir (i.e. cad ba cheart don chlár a dhéanamh).

I gcomhthéacs conarthaí cliste, tagraíonn sonraíochtaí foirmiúla do _airíonna_ — tuairiscí foirmiúla ar na ceanglais nach mór do chonradh a chomhlíonadh. Déantar cur síos ar réadmhaoin dá leithéid mar “athraithigh” agus is ionann iad agus dearbhuithe loighciúla faoi fhorghníomhú conartha nach mór a bheith fíor faoi gach imthosca féideartha, gan aon eisceachtaí.

Mar sin, is féidir linn smaoineamh ar shonraíocht fhoirmiúil mar bhailiúchán ráiteas scríofa i dteanga fhoirmiúil a chuireann síos ar an rith atá beartaithe do chonradh cliste. Clúdaíonn sonraíochtaí airíonna an chonartha agus sainíonn siad conas ba cheart don chonradh oibriú i gcúinsí éagsúla. Is é cuspóir an fhíoraithe fhoirmiúil ná a chinneadh an bhfuil na hairíonna seo (do-athraitheacha) ag conradh cliste agus nach sáraítear na hairíonna sin le linn a fhorghníomhaithe.

Tá sonraíochtaí foirmiúla ríthábhachtach chun conarthaí cliste a chur i bhfeidhm go slán. Is féidir go sárófaí airíonna i gconarthaí a dteipeann orthu athróga a chur i bhfeidhm le linn iad a rith, d’fhéadfaí dochar a dhéanamh dá bhfeidhmiúlacht a bheadh ina gcúis le dúshaothrú mailíseach.

## Cineálacha sonraíochtaí foirmiúla le haghaidh conarthaí cliste {#formal-specifications-for-smart-contracts}

Cumasaíonn sonraíochtaí foirmiúla réasúnú matamaitice maidir le cirte rith an chláir. Mar is amhlaidh le samhlacha foirmiúla, is féidir le sonraíochtaí foirmiúla tréithe ardleibhéil nó iompraíocht íseal-leibhéil cur chun feidhme conartha a ghabháil.

Díorthaítear sonraíochtaí foirmiúla trí úsáid a bhaint as gnéithe de [loighic an chláir](https://en.wikipedia.org/wiki/Logic_programming), a cheadaíonn réasúnú foirmiúil faoi airíonna cláir. Tá rialacha foirmiúla ag loighic chláir a chuireann in iúl (i dteanga mhatamaiticiúil) an t-iompraíocht a bhfuiltear ag súil leis i gclár. Baintear úsáid as loighic éagsúla ríomhchlár chun sonraíochtaí foirmiúla a chruthú, lena n-áirítear [loighic inrochtaineachta](https://en.wikipedia.org/wiki/Reachability_problem), [loighic ama](https://en.wikipedia.org/wiki/Temporal_logic), agus [loighic Hoare ](https://en.wikipedia.org/wiki/Hoare_logic).

Is féidir sonraíochtaí foirmiúla do chonarthaí cliste a rangú go ginearálta mar shonraíochtaí **ardleibhéil** nó **leibhéal íseal**. Is cuma cén catagóir lena mbaineann sonraíocht, ní mór di cur síos leordhóthanach gan athbhrí a dhéanamh ar airí an chórais atá faoi anailís.

### Sonraíochtaí ardleibhéil {#high-level-specifications}

Mar a thugann an t-ainm le tuiscint, cuireann sonraíocht ardleibhéil (ar a dtugtar "sonraíocht mhúnla-dhírithe") síos ar iompar ardleibhéil clár. Múnlaíonn sonraíochtaí ardleibhéil conradh cliste mar [meaisín stáit chríochnaithe](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), ar féidir leis aistriú idir staid trí fheidhmiú oibríochtaí, le loighic ama a úsáidtear chun airíonna foirmiúla a shainiú don tsamhail FSM.

Is "rialacha iad [loighic ama](https://en.wikipedia.org/wiki/Temporal_logic) chun réasúnú a dhéanamh faoi thairiscintí atá cáilithe i dtéarmaí ama (m.sh., "Bíonn _ocras orm_ i gcónaí" nó "Beidh _ocras orm faoi dheireadh")."_. Nuair a chuirtear i bhfeidhm é ar an bhfíorú fhoirmiúil, úsáidtear loighic ama chun dearbhuithe a lua faoi iompar ceart na gcóras atá múnlaithe mar mheaisíní staide. Go sonrach, déanann loighic ama cur síos ar na staideanna inar féidir conradh cliste a bheith sa todhchaí agus conas a aistríonn sé idir staideanna.

De ghnáth bíonn dhá airí ríthábhachtacha ama ag baint le conarthaí cliste: **sábháilteacht** agus **beocht**. Léiríonn airíonna sábháilteachta an smaoineamh “nach dtarlaíonn aon rud dona riamh” agus de ghnáth cuireann siad inathraitheacht in iúl. Féadfaidh maoin sábháilteachta ceanglais ghinearálta bogearraí a shainiú, amhail saoirse ó [leamhsháinn](https://www.techtarget.com/whatis/definition/deadlock), nó airíonna sainráite fearainn le haghaidh conarthaí ( m.sh., malairtí ar rialú rochtana ar fheidhmeanna, luachanna inghlactha na n-athróg staide, nó coinníollacha maidir le haistrithe comharthaí).

Tóg mar shampla an ceanglas sábháilteachta seo a chlúdaíonn na coinníollacha chun an `aistrigh()` nó an `aistrighÓ()` a úsáid i gconarthaí comharthaí ERC-20: _ “Ní bhíonn iarmhéid an tseoltóra riamh níos ísle ná an méid éarlaisí atá le seoladh.”_. Is féidir an cur síos teanga nádúrtha seo ar dho-athraitheacht chonartha a aistriú go sonraíocht fhoirmiúil (matamaiticiúil), ar féidir a sheiceáil go docht le haghaidh bailíochta.

Dearbhaíonn airíonna beochta go dtarlaíonn “rud éigin go maith sa deireadh” agus baineann siad le cumas conartha dul ar aghaidh trí staideanna éagsúla. Sampla den airí beocht is ea “leachtacht”, a thagraíonn do chumas conartha a chuid iarmhéideanna a aistriú chuig úsáideoirí ar iarratas. Má sháraítear an t-airí seo, ní bheadh ​​úsáideoirí in ann sócmhainní atá stóráilte sa chonradh a aistarraingt, mar a tharla leis an [Teagmhas sparán paireacht](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Sonraíochtaí íseal-leibhéil {#low-level-specifications}

Glacann sonraíochtaí ardleibhéil mar phointe tosaigh samhail chríochta de chonradh agus sainíonn siad airíonna inmhianaithe an tsamhail seo. I gcodarsnacht leis sin, is minic a léiríonn sonraíochtaí íseal-leibhéil (ar a dtugtar "sonraíochtaí atá dírithe ar airí") cláir (conarthaí cliste) mar chórais a chuimsíonn bailiúchán feidhmeanna matamaitice agus a chuireann síos ar iompar ceart na gcóras sin.

I dtéarmaí níos simplí, déanann sonraíochtaí íseal-leibhéil anailís ar _rianta cláir_ agus déanann siad iarracht airíonna conartha cliste a shainiú thar na rianta seo. Tagraíonn rianta do sheichimh rith feidhme a athraíonn staid conartha cliste; mar sin, cuidíonn sonraíochtaí íseal-leibhéil le ceanglais a shonrú maidir le forghníomhú inmheánach conartha.

Is féidir sonraíochtaí foirmiúla íseal-leibhéil a thabhairt mar airíonna de stíl Hoare nó mar athróga ar chosáin reatha.

### Airíonna i stíl Hoare {#hoare-style-properties}

Soláthraíonn [Loighic Hoare](https://en.wikipedia.org/wiki/Hoare_logic) sraith rialacha foirmiúla chun réasúnú a dhéanamh maidir le cruinneas clár, lena n-áirítear conarthaí cliste. Tá airí i stíl Hoare léirithe ag triar Hoare `{P}c{Q}`, áit a bhfuil `c` ina chlár agus `P` agus `Q` ina réamhchoinníollacha agus iarchoinníollacha ar staid an `c` (i.e., an clár), ar a tugtar go foirmiúil _réamhchoinníollacha_ agus _iarchoinníollacha_, faoi seach.

Is réamhchoinníoll é preideacáid a chuireann síos ar na coinníollacha a theastaíonn chun feidhm a rith i gceart; ní mór d'úsáideoirí a ghlaonn isteach sa chonradh an ceanglas seo a chomhlíonadh. Is éard is iarchoinníoll ann ná preideacáid a chuireann síos ar an gcoinníoll a bhunaíonn feidhm má dhéantar é a rith i gceart; is féidir le húsáideoirí a bheith ag súil go mbeidh an coinníoll seo fíor tar éis dóibh glaoch isteach sa bhfeidhm. Is preideacáid í _athróg_ i loighic Hoare a chaomhnaítear trí fheidhm a rith (i.e. ní athraíonn sé).

Is féidir le sonraíochtaí i stíl hoare ráthaíocht a thabhairt do _páirtchruinneas_ nó _cruinneas iomlán_. Tá cur i bhfeidhm feidhm chonartha "ceart go páirteach" má bhíonn an réamhchoinníoll fíor sula gcuirtear an fheidhm i gcrích, agus má chuirtear deireadh leis an rith, tá an iarchoinníoll fíor freisin. Faightear cruthúnas ar chruinneas iomlán má bhíonn réamhchoinníoll fíor sula ritear an fheidhm, ráthaítear go dtiocfaidh deireadh leis an rith agus nuair a dhéantar amhlaidh, beidh an t-iarchoinníoll fíor.

Tá sé deacair cruthúnas ar chruinneas iomlán a fháil mar go bhféadfaí moill a chur ar roinnt reatha sula bhfoirceanntar iad, nó nach gcríochnóidh siad ar chor ar bith. É sin ráite, is ceist inphléite é an bhfuil rith críochnaithe ós rud é go gcuireann meicníocht gáis Ethereum cosc ​​ar lúbanna cláir éigríochta (cuirtear deireadh leis an rith go rathúil nó críochnaíonn sé mar gheall ar earráid ‘as-ghás’).

Beidh réamhchoinníollacha, iarchoinníollacha, agus malairtí sainithe ag sonraíochtaí conartha cliste a chruthófar le loighic Hoare chun feidhmeanna agus lúbanna i gconradh a rith. Áiríonn réamhchoinníollacha go minic go bhféadfaí ionchuir earráideacha a dhéanamh ar fheidhm, agus déanann iarchoinníollacha cur síos ar an bhfreagairt ionchasach ar ionchuir den sórt sin (m.sh. eisceacht shonrach a chaitheamh). Ar an gcaoi seo tá airíonna i stíl Hoare éifeachtach chun a chinntiú go bhfuil cur i bhfeidhm conartha i gceart.

Úsáideann go leor creataí foirmiúla fíoraithe sonraíochtaí ar stíl Hoare chun cruinneas séimeantach fheidhmeanna a chruthú. Is féidir freisin airíonna ar stíl Hoare (mar dhearbhuithe) a chur go díreach le cód conartha trí úsáid a bhaint as na ráitis `require` agus `assert` i Solidity.

Cuireann ráitis `require` réamhchoinníoll nó malairtí in iúl agus is minic a úsáidtear iad chun ionchuir úsáideora a bhailíochtú, agus gabhann `dearbh ` coinníoll poist atá riachtanach ar mhaithe le sábháilteacht. Mar shampla, is féidir rialú rochtana cuí ar fheidhmeanna (sampla d’airíonna sábháilteachta) a bhaint amach trí úsáid a bhaint as `require` mar sheiceáil réamhchoinníoll ar chéannacht an chuntais ghlaoigh. Mar an gcéanna, is féidir malairtí ar luachanna incheadaithe na n-athróg stáit i gconradh (m.sh., líon iomlán na ndearbhuithe atá i gcúrsaíocht) a chosaint ó shárú trí úsáid a bhaint as `dearbhú` chun staid an chonartha tar éis rith feidhme a dhearbhú.

### Airíonna rian-leibhéil {#trace-level-properties}

Déanann sonraíochtaí rian-bhunaithe cur síos ar oibríochtaí a aistríonn conradh idir staideanna éagsúla agus na gaolmhaireachtaí idir na hoibríochtaí sin. Mar a míníodh níos luaithe, is éard atá i rianta ná seichimh oibríochtaí a athraíonn staid chonartha ar bhealach ar leith.

Braitheann an cur chuige seo ar shamhail de chonarthaí cliste mar chórais aistrithe stáit le roinnt stát réamhshainithe (arna gcur síos ag athróga stáit) mar aon le sraith aistrithe réamhshainithe (arna gcur síos ag feidhmeanna conartha). Ina theannta sin, tá [sreabhghraf rialaithe](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), ar léiriú grafach é ar a sreabhadh forghníomhaithe an chláir, in úsáid go minic chun cur síos a dhéanamh ar shéimeantaic oibriúcháin conartha. Anseo, léirítear gach rian mar chonair ar an sreabhghraf rialaithe.

Go príomha, úsáidtear sonraíochtaí rianleibhéil chun réasúnú a dhéanamh ar phatrúin reatha inmheánach i gconarthaí cliste. Trí shonraíochtaí rianleibhéil a chruthú, dearbhaímid na cosáin reatha inghlactha (i.e. aistrithe staide) le haghaidh conradh cliste. Trí úsáid a bhaint as teicníochtaí, mar rith siombalach, is féidir linn a fhíorú go foirmiúil nach leanann an rith cosán nach bhfuil sainithe sa tsamhail fhoirmiúil.

Úsáidimis sampla de chonradh [DAO](/dao/) a bhfuil roinnt feidhmeanna inrochtana ag an bpobal aige chun cur síos a dhéanamh ar airíonna rianleibhéil. Anseo, glacaimid leis go gceadaíonn an conradh DAO d'úsáideoirí na hoibríochtaí seo a leanas a dhéanamh:

- Cistí a thaisceadh

- Vóta ar thogra tar éis cistí a thaisceadh

- Aisíocaíocht a éileamh mura vótálann siad ar thogra

Mar shampla, bheadh _"ní féidir le húsáideoirí nach dtaisceann cistí vótáil ar thogra"_ nó _"Ba cheart go mbeadh úsáideoirí nach vótálann ar mholadh in ann aisíocaíocht a éileamh i gcónaí” ina n-airíonna rianleibhéil._. Dearbhaíonn an dá airí na sraitheanna feidhmithe roghnaithe (ní féidir vótáil _roimh_ chistí a thaisceadh agus aisíocaíocht a éileamh _tar éis vótáil_ ar thogra).

## Teicnící chun conarthaí cliste a fhíorú go foirmiúil {#formal-verification-techniques}

### Seiceáil samhlacha {#model-checking}

Teicníc fíoraithe foirmiúil is ea seiceáil samhaltån ina seiceálann algartam múnla foirmiúil de chonradh cliste i gcomparáid lena sonraíocht. I seiceáil samhlacha is minic a léirítear conarthaí cliste mar chórais aistrithe staide, agus sainítear airíonna ar staid chonarthacha incheadaithe ag baint úsáide as loighic ama.

Éilíonn seiceáil samhaltån léiriú teibí matamaitice de chóras a chruthú (i.e., conradh) agus airíonna an chórais seo a chur in iúl le foirmlí atá fréamhaithe i [loighic thairisceana](https://www.baeldung.com/cs/propositional-logic). Simplíonn sé seo tasc an algartam seiceála samhaltån, is é sin a chruthú go sásaíonn samhaltán matamaiticiúil foirmle loighciúil ar leith.

Úsáidtear seiceáil samhla i bhfíorú foirmiúil go príomha chun airíonna ama a mheas a chuireann síos ar iompar conartha le himeacht ama. I measc na n-airíonna sealadacha do chonarthaí cliste tá _sábháilteacht_ agus _beocht_, a mhínigh muid níos luaithe.

Mar shampla, airí slándála a bhaineann le rialú rochtana (m.sh., _Ní féidir ach le húinéir an chonartha glaoch ar `féinscrios`_) a scríobh i loighic fhoirmiúil. Ina dhiaidh sin, is féidir leis an algartam seiceála samhaltån a fhíorú an sásaíonn an conradh an tsonraíocht fhoirmiúil seo.

Baineann seiceáil samhlacha úsáid as taiscéalaíocht staid spáis, mar a thógtar gach staid ionchasach de chonradh cliste agus iarracht á dhéanamh teacht ar stáit insroichte as a dtagann sáruithe airíonna. Mar sin féin, is féidir líon éigríochta staideanna a bheith mar thoradh air seo (ar a dtugtar an "fadhb pléascadh staideanna"), dá bhrí sin bíonn seiceálaithe samhaltån ag brath ar theicnící astarraingthe chun anailís éifeachtach a dhéanamh ar chonarthaí cliste.

### Promhadh Teoirim {#theorem-proving}

Is modh é cruthú teoirim chun réasúnaíocht mhatamaiticiúil a dhéanamh maidir le cruinneas clár, lena n-áirítear conarthaí cliste. Baineann sé le samhaltán chóras conartha agus a shonraíochtaí a athrú go foirmlí matamaitice (ráitis loighce).

Is é an cuspóir atá le teoirim a phromhadh ná coibhéis loighciúil idir na ráitis seo a fhíorú. Is ionann “coibhéis loighciúil” (ar a dtugtar “dé-impleachtaí loighciúla” freisin) agus cineál coibhneasa idir dhá ráiteas sa chaoi is go bhfuil an chéad ráiteas fíor _má tá_ an dara ráiteas fíor, agus sa chás sin amháin.

Tá an gaol riachtanach (coibhéis loighciúil) idir ráitis faoi shamhail an chonartha agus a chuid airíonna ceaptha mar ráiteas inchruthaithe (ar a dtugtar teoirim). Trí úsáid a bhaint as córas foirmiúil tátail, is féidir le promhadóir uathoibrithe na teoirime bailíocht na teoirime a fhíorú. I bhfocail eile, is féidir le promhadóir teoirim a chruthú go cinntitheach go dtagann samhail conartha cliste go beacht lena sonraíochtaí.

Cé go ndéanann samhlacha seiceála samhaltán conarthaí mar chórais aistrithe le staideanna críochta, is féidir le cruthú teoirim anailís ar chórais staid éigríochta a láimhseáil. Mar sin féin, ciallaíonn sé seo nach féidir le promhadóir uathoibrithe teoirim a fhios i gcónaí an bhfuil fadhb loighce "inchinnte" nó nach bhfuil.

Mar thoradh air sin, is minic a bhíonn cúnamh daonna ag teastáil chun an cruthaitheoir teoirim a threorú chun cruthúnais cruinnis a fháil. Mar gheall ar iarracht dhaonna i bpromhadh teoirim tá sé níos costasaí é a úsáid ná seiceáil múnla, atá uathoibrithe go hiomlán.

### Forghníomhú siombalach {#symbolic-execution}

Is modh é rith siombalach chun conradh cliste a anailísiú trí fheidhmeanna a rith ag úsáid _luachanna siombalacha_ (m.sh., `x > 5`) in ionad _luachanna nithiúla_ (m.sh., `x == 5`). Mar theicníc fhíoraithe fhoirmiúil, baintear úsáid as rith siombalach chun réasúnaíocht fhoirmiúil a dhéanamh faoi airíonna rianleibhéil i gcód conartha.

Léiríonn rith siombalach rian reatha mar fhoirmle mhatamaitice thar luachanna ionchuir siombalacha, ar a dtugtar _cosán preideacáide_ chomh maith. Úsáidtear [réiteoir SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) chun seiceáil an bhfuil preideacáid chonaire "sásúil" (i.e., tá luach ann a shásaíonn an foirmle). Má tá cosán leochaileach insásaithe, ginfidh an réiteoir SMT luach nithiúil a spreagfaidh rith stiúrtha i dtreo an chosáin sin.

Abair go nglacann feidhm conartha chliste mar ionchur luach `uint` (`x`) agus go bhfilleann sé nuair a bhíonn `x` níos mó ná `5` agus níos lú ná `10` freisin. Chun luach a aimsiú le haghaidh `x` a spreagann an earráid trí úsáid a bhaint as gnáthnós imeachta tástála, bheadh ​​gá le dul tríd na mórán cásanna tástála (nó níos mó) gan dearbhú a fháil go bhfuarthas ionchur chun earráidí a spreagadh.

Os a choinne sin, dhéanfadh uirlis shiombail reatha an fheidhm leis an luach siombalach: `X > 5 ∧ X < 10` (i.e., tá `x` níos mó ná 5 AGUS tá `x` níos lú ná 10). Thabharfaí an preideacáid conaire comhfhreagrach `x = X > 5 ∧ X < 10` ansin do réiteoir SMT lena réiteach. Má shásaíonn luach ar leith an fhoirmle `x = X > 5 ∧ X < 10`, ríomhfaidh an réiteoir SMT é—mar shampla, d’fhéadfadh an réiteoir `7` a tháirgeadh mar luach ar `x`.

Toisc go mbraitheann rith siombalach ar ionchuir i gclár, agus go bhféadfadh an tsraith ionchuir chun gach staid insroichte a iniúchadh a bheith éigríochta, is cineál tástála é fós. Mar a léirítear sa sampla, áfach, tá rith siombalach níos éifeachtaí ná tástáil rialta chun ionchuir a aimsiú a spreagann sáruithe airí.

Ina theannta sin, is lú deimhneacht bhréagacha a tháirgeann rith siombalach ná teicnící eile atá bunaithe ar airí (m.sh. doiléiriú) a ghineann ionchuir chuig feidhm go randamach. Má spreagtar staid earráide le linn reatha siombalach, is féidir luach nithiúil a ghiniúint a spreagann an earráid agus an fhadhb a atáirgeadh.

Is féidir le rith siombalach roinnt cruthúnas matamaitice ar chruinneas a sholáthar freisin. Smaoinigh ar an sampla seo a leanas d’fheidhm chonartha le cosaint róshreafa:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Ba ghá do rian reatha a mbíonn ró-shreabhadh slánuimhir mar thoradh air chun an fhoirmle a shásamh: `z = x + y AND (z >= x) AND (z=>y) AND (z < x OR z < y)` Ní dócha go réiteofar a leithéid de fhoirmle, mar sin is cruthúnas matamaitice é nach dtéann an fheidhm `safe_add` róshreabhadh.

### Cén fáth fíorú foirmiúil a úsáid le haghaidh conarthaí cliste? {#benefits-of-formal-verification}

#### Gá le hiontaofacht {#need-for-reliability}

Baintear úsáid as fíorú foirmiúil chun cruinneas na gcóras atá ríthábhachtach ó thaobh sábháilteachta de a mheas a mbeadh iarmhairtí mhillteach ann dá dteipfeadh orthu, amhail bás, gortú nó scrios airgeadais. Is feidhmchláir ardluacha iad conarthaí cliste a rialaíonn méideanna ollmhóra luacha, agus d’fhéadfadh[ caillteanais do-aisghabhála a bheith mar thoradh ar earráidí simplí sa dearadh.](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Má dhéantar conradh a fhíorú go foirmiúil roimh imscaradh, áfach, is féidir ráthaíochtaí a mhéadú go gcomhlíonfaidh sé mar a bhíothas ag súil leis nuair a bheidh sé ag rith ar an mblocshlabhra.

Is cáilíocht an-inmhianaithe í an iontaofacht in aon chonradh cliste, go háirithe toisc go mbíonn cód a imscartar i Meaisín Fíorúil Ethereum (EVM) do-athraithe go hiondúil. Toisc nach bhfuil uasghráduithe iar-seolta inrochtana go héasca, is gá fíorú foirmiúil a dhéanamh le hiontaofacht na gconarthaí a ráthú. Is féidir le fíorú foirmiúil saincheisteanna deacra a bhrath, amhail foshreafaí slánuimhreacha agus ró-shreabhadh, athiontráil, agus droch-uasmhéadú gáis, rud a d'fhéadfadh sleamhnú ó iniúchóirí agus tástálaithe anuas.

#### Cruthaigh cruinneas feidhme {#prove-functional-correctness}

Is é tástáil cláir an modh is coitianta chun a chruthú go sásaíonn conradh cliste roinnt riachtanas. Is éard atá i gceist leis seo conradh a rith le sampla de na sonraí a bhfuiltear ag súil lena láimhseáil agus a iompraíocht a anailísiú. Má thugann an conradh na torthaí a bhfuiltear ag súil leo ar na sonraí samplacha ar ais, ansin beidh cruthúnas oibiachtúil ag na forbróirí ar a chruinneas.

Ní féidir leis an gcur chuige seo, áfach, rith ceart a chruthú do luachanna ionchuir nach cuid den sampla iad. Mar sin, d’fhéadfadh go gcabhródh tástáil conartha le fabhtanna a aimsiú (i.e. má theipeann ar roinnt cosán cóid na torthaí inmhianaithe a thabhairt ar ais le linn an reatha), ach **ní féidir leis an easpa fabhtanna** a chruthú go cinntitheach.

Os a choinne sin, is féidir le fíorú foirmiúil a chruthú go foirmiúil go sásaíonn conradh cliste ceanglais maidir le raon éigríochta reatha _gan_ an conradh a rith ar chor ar bith. Éilíonn sé seo sonraíocht fhoirmiúil a chruthú a dhéanann cur síos beacht ar iompraíochtaí conartha cearta agus samhail fhoirmiúil (matamaiticiúil) de chóras an chonartha a fhorbairt. Ansin is féidir linn nós imeachta promhála foirmiúil a leanúint chun comhsheasmhacht idir samhail an chonartha agus a shonraíocht a sheiceáil.

Le fíorú foirmiúil, is tairiscint mhatamaiticiúil í an cheist maidir le fíorú an sásaíonn loighic ghnó an chonartha na ceanglais is féidir a chruthú nó a bhréagnú. Trí thairiscint a chruthú go foirmiúil, is féidir linn líon éigríochta de chásanna tástála a fhíorú le líon críochta céimeanna. Ar an mbealach seo tá ionchais níos fearr ag fíorú foirmiúil chun a chruthú go bhfuil conradh ceart ó thaobh feidhme maidir le sonraíocht.

#### Spriocanna fíoraithe idéalacha {#ideal-verification-targets}

Déanann sprioc fíoraithe cur síos ar an gcóras atá le fíorú go foirmiúil. Is fearr fíorú foirmiúil a úsáid i “gcórais leabaithe” (píosaí beaga simplí bogearraí atá mar chuid de chóras níos mó). Tá siad oiriúnach freisin d'fhearainn speisialaithe ar bheagán rialacha, mar go mbíonn sé níos éasca leis seo uirlisí a mhodhnú chun airíonna a bhaineann go sonrach leis an bhfearann ​​​​a fhíorú.

Comhlíonann conarthaí cliste - go pointe áirithe ar a laghad - an dá riachtanas. Mar shampla, de bharr méid beag conarthaí Ethereum is féidir iad a fhíorú go foirmiúil. Ar an gcaoi chéanna, leanann an EVM rialacha simplí, rud a fhágann go bhfuil sé níos éasca airíonna shéimeantacha a shonrú agus a fhíorú do chláir a ritheann san EVM.

### Timthriall forbartha níos tapúla {#faster-development-cycle}

Go ginearálta bíonn teicnící fíoraithe foirmiúla, amhail seiceáil sábháilte agus rith siombalach, níos éifeachtaí ná anailís rialta ar chód conartha cliste (a dhéantar le linn tástála nó iniúchta). Tá sé seo amhlaidh toisc go mbraitheann fíorú foirmiúil ar luachanna siombalacha chun dearbhuithe a thástáil ("Cad a tharlóidh má dhéanann úsáideoir iarracht éitear _n_ a tharraingt siar?") murab ionann agus tástáil ina n-úsáidtear luachanna nithiúla ("Cad a tharlóidh má dhéanann úsáideoir iarracht 5 éitear a tharraingt siar?").

Is féidir le hathróga ionchuir siombalacha aicmí iolracha de luachanna nithiúla a chumhdach, agus mar sin geallann cineálacha cur chuige fíoraithe foirmiúla breis clúdach cóid laistigh d’fhráma ama níos giorra. Nuair a úsáidtear é go héifeachtach, is féidir le fíorú foirmiúil an timthriall forbartha d'fhorbróirí a luathú.

Feabhsaíonn fíorú foirmiúil freisin an próiseas chun iarratais dhíláraithe (dapps) a thógáil trí earráidí costasacha deartha a laghdú. Chun conarthaí a uasghrádú (nuair is féidir) chun leochaileachtaí a réiteach, tá gá le hathscríobh forleathan ar bhunachair chóid agus ní mór iarracht bhreise a dhéanamh ar fhorbairt. Is féidir le fíorú foirmiúil go leor earráidí a bhrath i bhfeidhmiú conartha a d’fhéadfadh sleamhnú thar thástálaithe agus iniúchóirí agus a thugann neart deiseanna chun na saincheisteanna sin a réiteach sula n-imscartar conradh.

## Míbhuntáistí a bhaineann le fíorú foirmiúil {#drawbacks-of-formal-verification}

### Costas saothair láimhe {#cost-of-manual-labor}

Teastaíonn obair láimhe nach beag de dhíth ar fhíorú foirmiúil, go háirithe fíorú leath-uathoibríoch ina dtreoraíonn duine an promhadóir chun cruthúnais cruinnis a fháil. Ina theannta sin, is gníomhaíocht chasta é sonraíocht fhoirmiúil a chruthú a éilíonn ardscileanna.

Mar gheall ar na fachtóirí seo (iarracht agus scil) tá fíorú foirmiúil níos éilithí agus níos costasaí i gcomparáid leis na gnáth-mhodhanna chun cruinneas conarthaí a mheas, mar thástáil agus iniúchtaí. Mar sin féin, tá sé praiticiúil an costas a bhaineann le hiniúchadh fíoraithe iomlán a íoc, i bhfianaise chostas na n-earráidí i gcur i bhfeidhm conarthaí cliste.

### Bréagdhiúltaigh {#false-negatives}

Ní féidir le fíorú foirmiúil ach a sheiceáil an bhfuil rith an chonartha cliste ag teacht leis an tsonraíocht fhoirmiúil. Mar sin, tá sé tábhachtach a chinntiú go gcuireann an tsonraíocht síos i gceart ar na hiompraíochtaí a bhfuiltear ag súil leo i gconradh cliste.

Mura scríobhtar sonraíochtaí go dona, ní féidir leis an iniúchadh foirmiúil fíoraithe sáruithe ar airíonna — a léiríonn rith leochaileach - a bhraith. Sa chás seo, d’fhéadfadh forbróir glacadh leis go hearráideach go bhfuil an conradh saor ó fhabht.

### Saincheisteanna feidhmíochta {#performance-issues}

Baineann saincheisteanna feidhmíochta áirithe le fíorú foirmiúil. Mar shampla, is féidir le fadhbanna pléasctha staide agus cosáin a thagann chun cinn le linn seiceáil samhaltán agus seiceáil siombalach, faoi seach, tionchar a imirt ar nósanna imeachta fíoraithe. Chomh maith leis sin, is minic a úsáideann uirlisí fíoraithe foirmiúla réitigh SMT agus réiteoirí srianta eile ina mbunchiseal, agus bíonn na réiteoirí seo ag brath ar nósanna imeachta dianríomhaireachta.

Chomh maith leis sin, ní bhíonn sé indéanta i gcónaí d’fhíoraitheoirí cláir a chinneadh an féidir nó nach féidir airí (a gcuirtear síos air mar fhoirmle loighciúil) a shásamh (an "[ fhadhb inchinntitheachta](https://en.wikipedia.org/wiki/Decision_problem)") toisc go mb'fhéidir nach dtiocfaidh deireadh le ríomhchlár choíche. Mar sin, d'fhéadfadh sé a bheith dodhéanta roinnt airíonna a chruthú do chonradh fiú má tá sé sainithe go maith.

## Uirlisí fíoraithe foirmiúla le haghaidh conarthaí cliste Ethereum {#formal-verification-tools}

### Teangacha sonraíochta chun sonraíochtaí foirmiúla a chruthú {#specification-languages}

**Act**: _*Ceadaíonn Act sonrú nuashonruithe stórála, coinníollacha réamhphoist/postála agus do-athraithigh chonartha. Tá cúil phrofála ag a suite uirlisí freisin atá in ann go leor airíonna a chruthú trí Coq, réiteoirí SMT, nó hevm.**

- [GitHub](https://github.com/ethereum/act)
- [Doiciméadúchán](https://ethereum.github.io/act/)

**Scribble** - _* Athraíonn Scribble nótaí cód sa teanga sonraíochta Scribble go dearbhuithe nithiúla a sheiceálann an tsonraíocht.**

- [Doiciméadúchán](https://docs.scribble.codes/)

**Dafny** - _*Is teanga ríomhchlárúcháin atá réidh le haghaidh fíorú í Dafny a bhraitheann ar ardleibhéal nótaí le réasúnú a dhéanamh agus cruinneas an chóid a chruthú.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Fíoraitheoirí clár chun cruinneas a sheiceáil {#program-verifiers}

**Certora Prover** - _Uirlis fíoraithe fhoirmiúil uathoibríoch é Certora Prover chun cruinneas cóid a sheiceáil i gconarthaí cliste. Scríobhtar na sonraíochtaí i CVL (Teanga Fhíoraithe Certora), agus braitear sáruithe maoine trí úsáid a bhaint as anailís statach agus réiteach srianta._

- [Suíomh Gréasáin](https://www.certora.com/)
- [Doiciméadúchán](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*Is seiceálaí SMTC Solidity é seiceálaí samhlaltán ionsuite bunaithe ar SMT ( Satisfiability Modulo Teoiricí) agus réiteach Corn. Deimhníonn sé má mheaitseálann cód foinse an chonartha na sonraíochtaí le linn tiomsaithe agus seiceálann sé go statach an bhfuil sáruithe le haghaidh airíonna sábháilteachta.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*Is leagan leathnaithe é solc-verify den tiomsaitheoir Solidity atá in ann fíorú foirmiúil uathoibrithe a dhéanamh ar chód Solidity trí úsáid a bhaint as nótaí agus fíorú clár modúlach.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*Is séimeantaic fhoirmiúil é KEVM den Mheaisín Fíorúil Ethereum (EVM) scríofa i gcreat K. Tá KEVM inrite agus is féidir leis dearbhuithe áirithe a bhaineann le hairí a chruthú trí úsáid a bhaint as loighic inrochtaineachta.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Doiciméadúchán](https://jellopaper.org/)

### Creataí loighciúla chun teoirim a phromhadh {#theorem-provers}

**Isabelle** - _Is cúntóir cruthúnais é Isabelle/HOL a cheadaíonn foirmlí matamaitice a chur in iúl i dteanga fhoirmiúil agus a sholáthraíonn uirlisí chun iad sin a chruthú foirmlí. Is í an phríomhfheidhm cruthúnais mhatamaiticiúla agus go háirithe fíorú foirmiúil, lena n-áirítear cruinneas crua-earraí nó bogearraí ríomhaireachta a chruthú agus airíonna teangacha agus prótacail ríomhaireachta a chruthú._

- [GitHub](https://github.com/isabelle-prover)
- [Doiciméadúchán](https://isabelle.in.tum.de/documentation.html)

**Coq** - _ Is promhadóir teoirim idirghníomhach é Coq a ligeann duit ríomhchláir a shainiú trí úsáid a bhaint as teoirimí agus cruthúnais cruinis meaisín-seiceáilte a ghiniúint go hidirghníomhach._

- [GitHub](https://github.com/coq/coq)
- [Doiciméadúchán](https://coq.github.io/doc/v8.13/refman/index.html)

### Uirlisí reatha siombalacha chun patrúin leochaileacha i gconarthaí cliste a bhrath {#symbolic-execution-tools}

**Manticore** - _*Uirlis chun anailís a dhéanamh ar bheartchód EVM bunaithe ar fheidhmiú siombalach*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Doiciméadúchán](https://github.com/trailofbits/manticore/wiki)

**hevm** - _* Is inneall reatha siombalach é hevm agus seiceálaí coibhéise le haghaidh beartchód EVM.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Uirlis shiombalach chun leochaileachtaí i gconarthaí cliste Ethereum a bhrath_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Doiciméadúchán](https://mythril-classic.readthedocs.io/en/develop/)

## Tuilleadh léitheoireachta {#further-reading}

- [Conas a Oibríonn Fíorú Foirmiúil Conarthaí Cliste](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Conas is féidir le Fíorú Foirmiúil Conarthaí Cliste Gan Cháim a Chinntiú](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Forbhreathnú ar Thionscadail Fíoraithe Foirmiúla san Éiceachóras Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Fíorú Foirmiúil Deireadh le Deireadh ar Chonradh Cliste Taisce Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [An Conradh Cliste is Coitianta ar Domhan a Fhíorú go foirmiúil](https://www.zellic.io/blog/formal-verification-weth)
- [Seiceálaí SMT agus Fíorú Foirmiúil](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
