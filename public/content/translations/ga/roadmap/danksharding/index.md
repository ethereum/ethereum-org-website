---
title: Danksharding
description: Foghlaim faoi Proto-Danksharding agus Danksharding - dhá uasghrádú seicheamhach le haghaidh Ethereum a scálú.
lang: ga
summaryPoints:
  - Is uasghrádú ilchéime é Danksharding chun inscálaitheacht agus cumas Ethereum a fheabhsú.
  - Cuireann an chéad chéim, Proto-Danksharding, Blobaí sonraí le bloic
  - Cuireann blobaí sonraí bealach níos saoire ar fáil le rolladh suas sonraí a phostáil chuig Ethereum agus is féidir na costais sin a chur ar aghaidh chuig úsáideoirí i bhfoirm táillí idirbhirt níos ísle.
  - Níos déanaí, leathnóidh Danksharding iomlán an fhreagracht as blobaí sonraí a fhíorú thar fho-thacair nóid, ag scálú Ethereum go níos mó ná 100,000 idirbheart in aghaidh an tsoicind.
---

# Danksharding {#danksharding}

Is le **Danksharding** a dhéanfar bhlocshlabhra inscálaithe fíor den Ethereum, ach tá roinnt uasghráduithe prótacail ag teastáil chun é sin a bhaint amach. Is céim idirmheánach é **Proto-Danksharding** feadh na slí. Tá sé mar aidhm ag an dá cheann idirbhearta ar Chiseal 2 a dhéanamh chomh saor agus is féidir d’úsáideoirí agus ba cheart dóibh Ethereum a scála go 100,000 idirbheart in aghaidh an tsoicind.

## Cad is Proto-Danksharding ann? {#what-is-protodanksharding}

Is bealach é Proto-Danksharding, ar a dtugtar [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) freisin, le haghaidh [rollups](/layer-2/#rollups) chun sonraí níos saoire a chur le bloic. Tagann an t-ainm ón dá thaighdeoir a mhol an smaoineamh: Protolambda agus Dankrad Feist. Go stairiúil, bhí teorainn le rolladh suas maidir le cé chomh saor is féidir leo idirbhearta úsáideora a dhéanamh toisc go bpostálann siad a n-idirbheart i `CALLDATA`.

Tá sé seo costasach toisc go bhfuil sé próiseáilte ag gach nóid Ethereum agus tá sé beo ar shlabhra go deo, cé nach bhfuil gá na sonraí do rollaí suas ach ar feadh tréimhse ghearr. Tugann Proto-Danksharding isteach bllobaí sonraí ar féidir iad a sheoladh agus a cheangal le bloic. Níl rochtain ag an EVM ar na sonraí sna blobaí seo agus scriostar iad go huathoibríoch tar éis tréimhse ama socraithe (socraithe go 4096 ré ag am scríofa, nó thart ar 18 lá). Ciallaíonn sé seo gur féidir le rollaí suas a gcuid sonraí a sheoladh i bhfad níos saoire agus an coigilteas a chur ar aghaidh chuig úsáideoirí deiridh i bhfoirm idirbhearta níos saoire.

<ExpandableCard title="Cén fáth a ndéanann blobaí rolladh suas níos saoire?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Is bealach é rollaí suas chun Ethereum a scáláil trí idirbhearta a bhaisceadh as slabhra agus ansin na torthaí a phostáil chuig Ethereum. Go bunúsach tá rolladh suas comhdhéanta de dhá chuid: seiceáil sonraí agus forghníomhú. Is iad na sonraí seicheamh iomlán na n-idirbheart atá á phróiseáil ag rolladh suas chun an t-athrú stáit atá á phostáil chuig Ethereum a tháirgeadh. Is éard atá sa tseiceáil forghníomhaithe athfhorghníomhú na n-idirbheart sin ag gníomhaí macánta éigin ("promhadóir") chun a chinntiú go bhfuil an t-athrú stáit atá beartaithe i gceart. Chun an tseiceáil forghníomhaithe a dhéanamh, caithfidh na sonraí idirbhirt a bheith ar fáil ar feadh fada go leor le gur féidir le duine ar bith iad a íoslódáil agus a sheiceáil. Ciallaíonn sé seo gur féidir leis an promhadóir aon iompar mímhacánta a dhéanann an seicheamhóir rolladh suas a aithint agus dúshlán a thabhairt dó. Mar sin féin, ní gá go mbeadh sé ar fáil go deo.

</ExpandableCard>

<ExpandableCard title="Cén fáth a bhfuil sé ceart go leor sonraí blob a scriosadh?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Postálann Rollups gealltanais dá gcuid sonraí idirbheart ar slabhra agus cuireann siad na sonraí iarbhír ar fáil i blobaí sonraí freisin. Ciallaíonn sé seo gur féidir le promhadóirí a sheiceáil go bhfuil na gealltanais bailí nó dúshlán a thabhairt do shonraí a cheapann siad atá mícheart. Ag leibhéal an nóid, coinnítear blobaí sonraí sa chliant comhthola. Deimhníonn na cliaint chomhthola go bhfuil na sonraí feicthe acu agus go ndearnadh iad a fhorleathadh timpeall an líonra. Dá gcoimeádfaí na sonraí go deo, bheadh ​​na cliaint seo ata agus bheadh riachtanais crua-earraí móra ann le nóid a rith. Ina áit sin, prúnáiltear na sonraí go huathoibríoch ón nód gach 18 lá. Léiríonn fianuithe comhdhearcadh na gcliant go raibh dóthain deis ag na cruthaitheoirí na sonraí a fhíorú. Is féidir le hoibreoirí rollup, úsáideoirí nó daoine eile na sonraí iarbhír a stóráil as slabhra.

</ExpandableCard>

### Conas a dhéantar sonraí blob a fhíorú? {#how-are-blobs-verified}

Postálann Rollaí suas na hidirbhearta a dhéanann siad i mblobaí sonraí. Postálann siad "tiomantas" do na sonraí freisin. Déanann siad é seo trí fheidhm iltéarmach a fheistiú ar na sonraí. Is féidir an fheidhm seo a mheas ansin ag pointí éagsúla. Mar shampla, má shainímid feidhm thar a bheith simplí `f(x) = 2x-1` ansin is féidir linn an fheidhm seo a mheas le haghaidh `x = 1`, `x = 2`, `x = 3` ag tabhairt na dtorthaí `1, 3, 5`. Cuireann promhadóir an fheidhm chéanna i bhfeidhm ar na sonraí agus déanann sé meastóireacht orthu ag na pointí céanna. Má athraítear na sonraí bunaidh, ní bheidh an fheidhm comhionann, agus mar sin ní dhéantar meastóireacht ar na luachanna ag gach pointe ach an oiread. I ndáiríre, tá an tiomantas agus an cruthúnas níos casta toisc go bhfuil siad imfhillte i bhfeidhmeanna cripteagrafacha.

### Cad é KZG? {#what-is-kzg}

Seasann KZG do Kate-Zaverucha-Goldberg - ainmneacha na dtrí [údar bunaidh](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) de scéim a laghdaíonn blob sonraí síos go dtí ["tiomantas" cripteagrafach](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) beag. Ní mór blob na sonraí a chuirtear isteach trí rolladh suas a fhíorú lena chinntiú nach bhfuil mí-iompair sa rolladh suas. Is éard atá i gceist leis seo ná go ndéanann cruthaitheoir na hidirbhearta sa bhlob arís le seiceáil go raibh an tiomantas bailí. Tá sé seo go coincheapúil mar an gcéanna leis an mbealach a sheiceálann cliaint fhorghníomhaithe bailíocht idirbhearta Ethereum ar chiseal 1 ag baint úsáide as cruthúnais Merkle. Promhadh eile is ea KZG a oireann cothromóid iltéarmach do na sonraí. Déanann an tiomantas meastóireacht ar an iltéarmach ag pointí rúnda sonraí áirithe. D’oirfeadh an promhadóir an t-iltéarmach céanna ar na sonraí agus dhéanfadh measúnú air ag na luachanna céanna, ag seiceáil gurb ionann an toradh. Is bealach é seo chun na sonraí a fhíorú atá comhoiriúnach le teicnící nialais-eolais a úsáideann roinnt rolladh agus ar deireadh thiar codanna eile den phrótacal Ethereum.

### Cad a bhí i Searmanas KZG? {#what-is-a-kzg-ceremony}

Bhí an searmanas KZG ina bhealach do go leor daoine ó ar fud an phobail Ethereum teaghrán rúnda randamach uimhreacha a ghiniúint ar féidir a úsáid chun roinnt sonraí a fhíorú. Tá sé an-tábhachtach nach mbeadh an teaghrán uimhreacha seo ar eolas agus nach féidir le duine ar bith é a athchruthú. Chun é seo a chinntiú, fuair gach duine a ghlac páirt sa searmanas teaghrán ón rannpháirtí roimhe seo. Ansin chruthaigh siad roinnt luachanna randamacha nua (m.sh. trí ligean dá mbrabhsálaí gluaiseacht na luiche a thomhas) agus é a mheascadh leis an luach roimhe sin. Chuir siad an luach ar aghaidh chuig an gcéad rannpháirtí eile ansin agus scrios siad as a n-inneall áitiúil é. Chomh fada agus a rinne duine amháin sa searmanas é seo go hionraic, ní bheidh an luach deiridh ar eolas ag ionsaitheoir.

Bhí searmanas EIP-4844 KZG oscailte don phobal agus ghlac na mílte duine páirt chun a eantrópacht (randamach) féin a chur leis. San iomlán bhí breis agus 140,000 ionchur, rud a fhágann gurb é an searmanas is mó dá leithéid ar domhan. Le go mbainfí an bonn den searmanas, bheadh ​​ar 100% de na rannpháirtithe sin a bheith gníomhach mímhacánta. Ó thaobh na rannpháirtithe de, má tá a fhios acu go raibh siad macánta, ní gá muinín a chur ar aon duine eile mar go bhfuil a fhios acu gur bhain siad amach an searmanas (shásaigh siad ina n-aonar riachtanas an rannpháirtí macánta 1-as-N).

<ExpandableCard title="Cén uimhir randamach ón searmanas KZG a úsáidtear dó?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Nuair a phostálann rollup sonraí i blob, soláthraíonn siad "tiomantas" go bpostálann siad ar slabhra. Tá an gealltanas seo mar thoradh ar oiriúnacht iltéarmach do na sonraí a mheas ag pointí áirithe. Sainmhínítear na pointí seo leis na huimhreacha randamacha a ghintear sa searmanas KZG. Is féidir le cruthaitheoirí ansin an ilchineálach a mheas ag na pointí céanna chun na sonraí a fhíorú - má thagann siad ar na luachanna céanna tá na sonraí ceart.

</ExpandableCard>

<ExpandableCard title="Cén fáth a gcaithfidh sonraí randamacha KZG fanacht faoi rún?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Más eol do dhuine na láithreacha randamacha a úsáideadh don tiomantas, is furasta dóibh iltéarmach nua a ghiniúint a oireann do na pointí sonracha sin (i.e. “imbhualadh”). Ciallaíonn sé seo go bhféadfadh siad sonraí a chur leis nó a bhaint den bhlob agus fós cruthúnas bailí a sholáthar. Chun é seo a chosc, in ionad na láithreacha rúnda iarbhír a thabhairt do na cruthaitheoirí, faigheann siad na láithreacha atá imfhillte i "mbosca dubh" cripteagrafach ag baint úsáide as cuair éilipseacha. Déanann siad seo na luachanna a scrobhadh go héifeachtach ar bhealach nach féidir na bunluachanna a aisiompú, ach le roinnt cruthaitheoirí agus fíoraitheoirí ailgéabar cliste fós is féidir leo iltéarmaí a mheas ag na pointí a léiríonn siad.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Ní leanann Danksharding ná Proto-Danksharding an tsamhail thraidisiúnta "sharding" a bhfuil sé mar aidhm aige an blocshlabhra a roinnt ina ilchodanna. Níl slabhraí shard mar chuid den treochlár a thuilleadh. Ina áit sin, úsáideann Danksharding sampláil sonraí dáilte ar fud blobaí chun Ethereum a scálú. Tá sé seo i bhfad níos simplí a chur i bhfeidhm. Tagraítear don tsamhail seo uaireanta mar “scriosadh sonraí”.
</InfoBanner>

## Cad is Danksharding ann? {#what-is-danksharding}

Is é Danksharding réadú iomlán an scálaithe rollta a thosaigh le Proto-Danksharding. Tabharfaidh Danksharding méideanna ollmhóra spáis ar Ethereum le haghaidh rollaí suas chun a gcuid sonraí idirbheart comhbhrúite a dhumpáil. Ciallaíonn sé seo go mbeidh Ethereum in ann tacú leis na céadta rollaí suas aonair gan stró agus na milliúin idirbheart in aghaidh an tsoicind a thabhairt i gcrích.

Oibríonn sé seo trí na blobaí atá ceangailte le bloic a leathnú ó shé (6) i Proto-Danksharding, go 64 i Danksharding iomlán. Is nuashonruithe iad an chuid eile de na hathruithe atá ag teastáil ar an mbealach a fheidhmíonn cliaint chomhthola le cur ar a gcumas na blobaí móra nua a láimhseáil. Tá roinnt de na hathruithe sin ar an treochlár cheana féin ar son críocha eile atá neamhspleách ar Danksharding. Mar shampla, éilíonn Danksharding go gcuirfí scaradh tairgeoir-tógálaí i bhfeidhm. Uasghrádú é seo a scarann ​​na tascanna a bhaineann le bloic a thógáil agus bloic a mholadh thar bhailitheoirí éagsúla. Ar an gcaoi chéanna, tá gá le sampláil infhaighteachta sonraí le haghaidh Danksharding, ach tá sé ag teastáil freisin chun cliaint an-éadrom a fhorbairt nach stórálann mórán sonraí stairiúla ("cliaint gan stát").

<ExpandableCard title="Cén fáth a dteastaíonn scaradh idir moltóirí agus tógálaí ó Danksharding?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Teastaíonn deighilt idir an tairgeoir agus an tógálaí chun cosc ​​a chur ar bhailitheoirí aonair tiomantais agus cruthúnais costasacha a ghiniúint le haghaidh 32MB de shonraí blobaí. Chuirfeadh sé seo an iomarca brú ar na geallsealbhóirí baile agus d’éileodh sé orthu infheistíocht a dhéanamh i gcrua-earraí níos cumhachtaí, rud a ghortódh an dílárú. Ina áit sin, glacann tógálaithe bloc speisialaithe freagracht as an obair ríomhaireachtúil daor seo. Ansin, cuireann siad a gcuid bloic ar fáil mholtóirí bloic le craoladh. Roghnaíonn an moltóir an bloc is brabúsaí de na bloic. Is féidir le duine ar bith blobaí a fhíorú go saor agus go mear, agus mar sin is féidir le gnáthbhailíochtóir ar bith a dheimhniú go bhfuil na tógálaithe bloic ag feidhmiú go hionraic. Ceadaíonn sé seo na blobaí móra a phróiseáil gan dílárú a íobairt. D'fhéadfaí tógálaithe bloc a chleachtaíonn mí-iompair a dhíbirt as an líonra agus a ghearradh amach - rachaidh daoine eile isteach ina n-áit toisc gur gníomhaíocht bhrabúsach é blocthógáil.

</ExpandableCard>

<ExpandableCard title="Cén fáth a dteastaíonn sampláil infhaighteachta sonraí ó Danksharding?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Tá gá le sampláil infhaighteachta sonraí le go bhféadfaidh bailíochtaithe sonraí blobaí a fhíorú go tapa agus go héifeachtach. Trí úsáid a bhaint as sampláil infhaighteachta sonraí, is féidir leis na bailíochtaithe a bheith an-chinnte go raibh na sonraí blobaí ar fáil agus go ndearnadh iad i gceart. Ní féidir le gach bailíochtóir ach cúpla pointe sonraí a shampláil go randamach agus cruthúnas a chruthú, rud a chiallaíonn nach gcaithfidh aon bhailitheoir an blob iomlán a sheiceáil. Má tá aon sonraí in easnamh, aithneofar go tapa é agus diúltófar don bhlob.

</ExpandableCard>

### Dul chun cinn reatha {#current-progress}

Tá Full Danksharding roinnt blianta ar shiúl. Idir an dá linn, tá an searmanas KZG tugtha chun críche le breis agus 140,000 cion, agus tá an [EIP](https://eips.ethereum.org/EIPS/eip-4844) le haghaidh Proto-Danksharding tagtha in aibíocht. Tá an togra seo curtha chun feidhme go hiomlán i ngach líontán tástála, agus chuaigh sé beo ar Mainnet le huasghrádú líonra Cancun-Deneb ("Dencun") i mí an Mhárta 2024.

### Tuilleadh léitheoireachta {#further-reading}

- [Nótaí Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Nótaí Dankrad ar Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Pléann Dankrad, Proto agus Vitalik Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Searmanas KZG](https://ceremony.ethereum.org/)
- [Labhraíonn Devcon Carl Beekhuizen ar shocruithe iontaofa](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Tuilleadh ar shampláil infhaighteachta sonraí le haghaidh blobaí](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist ar thiomantais agus cruthúnais KZG](https://youtu.be/8L2C6RDMV9Q)
- [Tiomantais iltéarmacha KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
