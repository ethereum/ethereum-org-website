---
title: Scálú
description: Réamhrá ar na roghanna scálaithe éagsúla atá á bhforbairt faoi láthair ag pobal Ethereum.
lang: ga
sidebarDepth: 3
---

## Forbhreathnú scálaithe {#scaling-overview}

De réir mar a mhéadaigh líon na ndaoine a úsáideann Ethereum, tá teorainneacha áirithe cumais bainte amach ag an mblocshlabhra. D'ardaigh sé seo an costas a bhaineann le húsáid an líonra, rud a chruthaigh an gá atá le "réitigh scálaithe." Tá taighde á dhéanamh ar an iliomad réiteach, tá siad á dtástáil agus á gcur i bhfeidhm i gcineálacha cur chuige éagsúla chun spriocanna comhchosúla a bhaint amach.

Is é príomhsprioc na hinscálaitheachta luas an idirbhirt (críochnaitheacht níos tapúla) agus tréchur idirbheart a mhéadú (líon níos airde idirbheart in aghaidh an tsoicind) gan dílárú ná slándáil a íobairt (tuilleadh ar an [fís Ethereum](/roadmap/vision/)). Ar blocshlabhra Ethereum ciseal 1, bíonn idirbhearta níos moille agus [praghsanna gáis](/developers/docs/gas/) neamh-inmharthana mar thoradh ar éileamh ard. Tá méadú ar acmhainn an líonra i dtéarmaí luais agus tréchur bunúsach ó thaobh le glacadh bríoch agus uilíoch Ethereum.

Cé go bhfuil luas agus tréchur tábhachtach, tá sé ríthábhachtach go bhfanfaidh réitigh scálaithe a chumasaíonn na spriocanna seo díláraithe agus slán. Tá sé ríthábhachtach an bhacainn íseal ar iontráil a choinneáil d'oibreoirí nód chun cosc ​​a chur ar dhul chun cinn i dtreo cumhachta ríomhaireachta láraithe agus neamhchinnte.

Go coincheapúil déanaimid scálú a chatagóiriú ar dtús mar scálú ar slabhra nó mar scálú as slabhra.

## Réamhriachtanais {#prerequisites}

Ba chóir go mbeadh tuiscint mhaith agat ar na hábhair bhunúsacha go léir. Cuirtear feidhmiú réitigh scálaithe chun cinn toisc nach bhfuil an oiread sin tástála catha déanta ar an teicneolaíocht, agus go leantar ag déanamh taighde agus forbartha uirthi.

## Scálú ar slabhra {#onchain-scaling}

Teastaíonn athruithe ar phrótacal Ethereum (ciseal 1 [Príomhlíonra](/glossary/#mainnet)) le haghaidh scálaithe ar slabhra. Ar feadh i bhfad, bhíothas ag súil leis an mblocshlabhra a sceardadh chun Ethereum a scálú. Is éard a bhí i gceist leis seo ná an blocshlabhra a roinnt ina phíosaí scoite (scearda) le bheith fíoraithe ag fo-thacair de bhailíochtóirí. Mar sin féin, is é an príomhtheicníc scálaithe an scálú de réir uas-scáluithe ciseal-2. Tacaítear leis seo trí fhoirm nua sonraí níos saoire a chur leis atá ceangailte le bloic Ethereum atá deartha go speisialta chun uas-scáluithe a dhéanamh saor d'úsáideoirí.

### Sceardadh {#sharding}

Is é atá i gceist le sceardadh ná an próiseas chun bunachar sonraí a scoilteadh. Bheadh ​​​​fothacair de bhailíochtóirí freagrach as scearda aonair seachas súil a choinneáil ar Ethereum go léir. Bhí sceardadh ar [threochlár](/roadmap/) Ethereum le fada, agus bhí sé beartaithe tráth a sheoladh roimh An Cumasc go cruthúnas-gill. Mar sin féin, mar gheall ar fhorbairt mhear [uas-scálú ciseal 2](#layer-2-scaling) agus aireagáin [Danksharding](/roadmap/danksharding) (blobaí de shonraí uas-scáluithe a chur le bloic Ethereum is féidir le bailíochtóirí a fhíorú go han-éifeachtach) tá pobal Ethereum i bhfabhar scáluithe uas-scálú-lárnaithe seahcas scálú le sceardadh. Cabhróidh sé seo freisin le loighic chomhdhearcadh Ethereum a choinneáil níos simplí.

## Scálú as slabhra {#offchain-scaling}

Cuirtear réitigh as slabhra i bhfeidhm ar leithligh ó chiseal 1 Mainnet - ní éilíonn siad aon athruithe ar an bprótacal Ethereum atá ann cheana féin. Faigheann roinnt réitigh, ar a dtugtar réitigh "ciseal 2", a slándáil go díreach ó chomhdhearcadh ciseal 1 Ethereum, mar shampla[rollups dóchasach](/developers/docs/scaling/optimistic-rollups/), [uas-scáluithe dífhianaise](/developers/docs/scaling/zk-rollups/) nó [cainéil staidel](/developers/docs/scaling/state-channels/). Is éard atá i gceist le réitigh eile ná slabhraí nua a chruthú i bhfoirmeacha éagsúla a fhaigheann a gcuid slándála ar leithligh ó Mainnet, mar [taobhshlabhraí](#sidechains), [validiums](#validium), nó [slabhraí plasma](#plasma). Déanann na réitigh seo cumarsáid le Mainnet ach díorthaítear a slándáil ar bhealach difriúil chun spriocanna éagsúla a bhaint amach.

### Scálú sraith 2 {#layer-2-scaling}

Faigheann an chatagóir seo de réitigh as slabhra a slándáil ó Mainnet Ethereum.

Is téarma comhchoiteann é Ciseal 2 le haghaidh réitigh atá deartha chun cabhrú le d’iarratas a scálú trí idirbhearta a láimhseáil ón Mainnet Ethereum (ciseal 1) agus leas a bhaint as samhail láidir slándála díláraithe Mainnet. Fulaingíonn luas an idirbhirt nuair a bhíonn an líonra gnóthach, rud a fhágann go mbíonn taithí an úsáideora lag do chineálacha áirithe dapps. Agus de réir mar a éiríonn an líonra níos gnóthaí, méadaíonn praghsanna gáis de réir mar a bhíonn sé mar aidhm ag seoltóirí idirbheart dul i muinín a chéile. Is féidir leis seo cur go mór le costas úsáide Ethereum.

Tá an chuid is mó de réitigh ciseal 2 dírithe ar fhreastalaí nó braisle fhreastalaithe, agus féadfar tagairt a dhéanamh do gach ceann díobh mar nód, bailíochtóir, oibreoir, seicheamhóir, táirgeoir bloc, nó téarma comhchosúil. Ag brath ar an bhfeidhmiú, féadfaidh na daoine aonair, na gnólachtaí nó na haonáin a úsáideann iad, nó oibreoir 3ú páirtí, nó grúpa mór daoine aonair (cosúil le Mainnet) na nóid ciseal 2 seo a reáchtáil. Go ginearálta, cuirtear idirbhearta isteach chuig na nóid ciseal 2 seo in ionad iad a chur isteach go díreach chuig ciseal 1 (Príomhlíonra). I gcás roinnt réitigh, déanann cás ciseal 2 iad a bhaisceadh ina ngrúpaí sula gcuirtear ar ancaire iad go dtí ciseal 1, agus ina dhiaidh sin déantar iad a dhaingniú le ciseal 1 agus ní féidir iad a athrú. Athraíonn na sonraí faoin gcaoi a ndéantar é seo go mór idir teicneolaíochtaí agus feidhmiúcháin ciseal 2 éagsúla.

D’fhéadfadh cás sonrach ciseal 2 a bheith oscailte agus roinnte ag go leor feidhmchlár, nó féadfar é a imscaradh ag tionscadal amháin agus é tiomnaithe do thacú lena n-iarratas amháin.

#### Cén fáth a bhfuil ciseal 2 ag teastáil? {#why-is-layer-2-needed}

- Feabhsaíonn idirbhearta méadaithe in aghaidh an tsoicind an taithí úsáideora go mór, agus laghdaítear brú tráchta líonra ar Mainnet Ethereum.
- Déantar idirbhearta a uas-scálú in idirbheart amháin chuig Mainnet Ethereum, ag laghdú táillí gáis d'úsáideoirí agus ag déanamh Ethereum níos cuimsithí agus níos inrochtana do dhaoine i ngach áit.
- Níor cheart go mbeadh dílárú ná slándáil thíos leis mar gheall ar aon nuashonruithe ar inscálaitheacht - tógann ciseal 2 ar bharr Ethereum.
- Tá líonraí ciseal 2 a bhaineann go sonrach le feidhmchláir ann a thugann a gcuid éifeachtúlachtaí féin agus iad ag obair le sócmhainní ar scála.

[Tuilleadh maidir le ciseal 2](/layer-2/).

#### Uas-scáluithe {#rollups}

Déanann Uas-scáluithe rith idirbheart lasmuigh de chiseal 1 agus ansin postáiltear na sonraí chuig ciseal 1 áit a bhfuil comhdhearcadh bainte amach. Toisc go bhfuil sonraí idirbhirt san áireamh i mbloic ciseal 1, ceadaíonn sé seo uas-scáluithe a áirithiú le slándáil dhúchasach Ethereum.

Tá dhá chineál uas-scáluithe ann le samhlacha slándála éagsúla:

- **Uas-scáluithe dóchasacha**: glacann sé leis go bhfuil idirbhearta bailí de réir réamhshocraithe agus nach ndéanann sé ach ríomh a rith, trí [**chruthúnas calaoise**](/glossary/#fraud-proof), i gcás dúshláin. [Tuilleadh faoi uas-scáluithe dóchasacha](/developers/docs/scaling/optimistic-rollups/).
- **Uas-scáluithe dífhianaise**: ritheann sé an ríomh as slabhra agus cuireann sé [**cruthúnas bailíochta**](/glossary/#validity-proof) isteach sa slabhra. [Tuilleadh maidir le huas-scáluithe dífhianaise](/developers/docs/scaling/zk-rollups/).

#### Cainéil stáit {#channels}

Úsáideann bealaí staide conarthaí multisig chun a chur ar chumas rannpháirtithe idirbheartaíocht a dhéanamh go tapa agus go héasca as slabhra, ansin críochnaitheacht a shocrú le Mainnet. Laghdaíonn sé seo brú tráchta líonra, táillí agus moilleanna. Is iad an dá chineál cainéal faoi láthair ná bealaí staide agus bealaí íocaíochta.

Foghlaim tuilleadh faoi [chainéil staide](/developers/docs/scaling/state-channels/).

### Taobhshlabhraí {#sidechains}

Is blocshlabhra neamhspleách EVM-comhoiriúnach é taobhshlabhraí a ritheann go comhthreomhar le Príomhlíonra. Tá siad seo comhoiriúnach le Ethereum trí dhroichid dhá bhealach agus ritheann siad faoina rialacha roghnaithe féin maidir le paraiméadair chomhthola agus bloic.

Foghlaim tuilleadh faoi [Taobhshlabhraí](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Is blocshlabhra ar leith é slabhra plasma atá daingnithe le príomhshlabhra Ethereum agus a úsáideann cruthúnais calaoise (cosúil le [uas-scáluithe dóchasacha](/developers/docs/scaling/optimistic-rollups/)) chun eadráin a dhéanamh ar dhíospóidí.

Foghlaim tuilleadh faoi [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Úsáideann slabhra Validium cruthúnais bailíochta cosúil le huas-scáluithe dífhianaise ach ní stóráiltear sonraí ar phríomhshlabhra 1 Ethereum. D’fhéadfadh 10k idirbheart in aghaidh an tsoicind in aghaidh an tslabhra Validium a bheith mar thoradh air seo agus is féidir slabhraí iolracha a rith ag an am céanna.

Foghlaim tuilleadh faoi [Validium](/developers/docs/scaling/validium/).

## Cén fáth a bhfuil an oiread sin réitigh scálaithe ag teastáil? {#why-do-we-need-these}

- Is féidir le réitigh iolracha cuidiú leis an bplódú foriomlán ar aon chuid amháin den líonra a laghdú agus pointí aonair teipe a chosc.
- Is mó an t-iomlán ná suim a chuid páirteanna. Is féidir le réitigh éagsúla a bheith ann agus oibriú le chéile, rud a cheadaíonn éifeacht easpónantúil ar luas agus ar thréchur idirbhirt sa todhchaí.
- Ní éilíonn gach réiteach úsáid a bhaint as algartam comhdhearcadh Ethereum go díreach, agus is féidir le roghanna eile tairbhí a thairiscint a bheadh ​​deacair a fháil murach sin.
- Ní leor aon réiteach scálaithe amháin chun [fís Ethereum](/roadmap/vision/) a chomhlíonadh.

## An foghlaimeoir amhairc den chuid is mó tú? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Tabhair faoi deara go n-úsáideann an míniú san fhíseán an téarma "Ciseal 2" chun tagairt a dhéanamh do gach réiteach scálaithe as slabhra, agus idirdhealú á dhéanamh againn ar "Ciseal 2" mar réiteach as slabhra a fhaigheann a shlándáil trí chomhdhearcadh Mainnet ciseal 1._

<YouTube id="7pWxCklcNsU" />

## Tuilleadh léitheoireachta {#further-reading}

- [Treochlár uas-scálú-lárnach Ethereum](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Anailísíocht chothrom le dáta ar réitigh scálaithe Chiseal 2 do Ethereum](https://www.l2beat.com/)
- [Measúnú ar Réitigh Scála Ethereum ciseal 2: Creat Comparáide](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Treoir Neamhiomlán ar Uas-scáluithe](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups faoi thiomáint Ethereum: Buailteoirí Domhanda](https://hackmd.io/@canti/rkUT0BD8K)
- [Uas-scáluithe dóchasacha vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Inscálaitheacht Bhlocshlabhra Dhífhianaise](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Cén fáth gurb é rollups + scearda sonraí an t-aon réiteach inbhuanaithe le haghaidh inscálaitheacht ard](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Cén cineál Sraith 3 a bhfuil ciall leis?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Infhaighteacht Sonraí Nó: Mar a fhoghlaim Rolluithe Suas Conas Gan a Bheith Buartha agus Grá a Thabhairt do Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [An Treoir Phraiticiúil maidir le hUas-Scáluithe Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
