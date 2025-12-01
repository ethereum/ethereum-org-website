---
title: Validium
description: Réamhrá ar Validium mar réiteach scálaithe atá in úsáid faoi láthair ag pobal Ethereum.
lang: ga
sidebarDepth: 3
---

Is réiteach scáluithe é validium [a thugann réiteach ar scálú](/developers/docs/scaling/) a chuirtear i bhfeidhm le cruthúnais bailíochta cosúil le [ZK-rollups](/developers/docs/scaling/zk-rollups/), ach ní stórálann sé sonraí idirbhearta ar Ethereum Mainnet. Cé go dtugtar comhbhabhtálacha isteach le hinfhaighteacht sonraí as slabhra, d’fhéadfadh feabhsuithe ollmhóra a bheith mar thoradh ar inscálaithe (is féidir le validiums [~9,000 idirbheart, nó níos mó, in aghaidh an tsoicind](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263) a phróiseáil).

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh ár leathanach ar [scálú Ethereum](/developers/docs/scaling/) agus [ciseal 2](/layer-2) léite agus tuigthe agat.

## Cad is validium ann? {#what-is-validium}

Is réitigh scálaithe iad Validiums a úsáideann infhaighteacht sonraí as slabhra agus ríomh atá deartha chun tréchur a fheabhsú trí idirbhearta a phróiseáil as Ethereum Mainnet. Cosúil le huascálú dífhianaise (ZK-rollups), foilsíonn validiums [cruthúnais dífhianaise](/glossary/#zk-proof) chun idirbhearta as slabhra ar Ethereum a fhíorú. Coisceann sé seo aistrithe staide neamhbhailí agus feabhsaíonn sé ráthaíochtaí slándála slabhra validium.

Is féidir leis na "cruthúnais bailíochta" seo teacht i bhfoirm ZK-SNARKanna (Argóint Faisnéise Gonta Neamh-Idirghníomhach Dífhianaise) nó ZK-STARKanna (Argóint Faisnéise Trédhearcach Inscálaithe Dífhianaise). Tuilleadh faoi [chruthúnais dhífhianaise](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Tá cistí a bhaineann le húsáideoirí validium á rialú ag conradh cliste ar Ethereum. Tairgeann Validiums aistarraingtí beagnach láithreach, cosúil le ZK-rollups; a luaithe a bheidh an cruthúnas bailíochta d’iarratas aistarraingthe fíoraithe ar Mainnet, is féidir le húsáideoirí cistí a tharraingt siar trí [Cruthúnas Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) a sholáthar. Déanann cruthúnas Merkle bailíochtú ar áireamh idirbheart aistarraingthe an úsáideora i mbaisc idirbheart fíoraithe, rud a ligeann don chonradh ar slabhra an aistarraingt a phróiseáil.

Mar sin féin, is féidir le cistí úsáideoirí validium a bheith reoite agus a gcuid aistarraingtí a bheith srianta. Féadfaidh sé seo tarlú má choinníonn bainisteoirí infhaighteachta sonraí ar as slabhra validium sonraí staide as slabhra siar ó úsáideoirí. Gan rochtain ar shonraí idirbhirt, ní féidir le húsáideoirí an cruthúnas Merkle a ríomh a theastaíonn chun úinéireacht cistí a chruthú agus aistarraingtí a dhéanamh.

Is í seo an phríomhdhifríocht idir validium agus ZK-rollups – a shuíomh ar speictream infhaighteacht sonraí. Tá cur chuige difriúil ag an dá réiteach maidir le stóras sonraí, agus impleachtaí aige dá réir do shlándáil agus d’iontaofacht.

## Conas a idirghníomhaíonn validiums le Ethereum? {#how-do-validiums-interact-with-ethereum}

Is prótacail scálaithe iad Validiums a tógadh ar bharr an tslabhra Ethereum atá ann cheana féin. Cé go ndéanann sé idirbhearta as slabhra, déantar slabhra validium a riar trí bhailiúchán conarthaí cliste a imscartar ar Mainnet lena n-áirítear:

1. **Conradh fíoraitheora**: Fíoraíonn an conradh fíoraitheora bailíocht na gcruthúnas a chuir an t-oibreoir validium isteach agus nuashonruithe staide á dhéanamh aige. Áirítear leis sin cruthúnais bailíochta a dheimhníonn cruinneas na n-idirbheart as slabhra agus cruthúnais infhaighteachta sonraí lena bhfíoraítear go bhfuil sonraí idirbhirt as slabhra ann.

2. **Príomhchonradh**: Stórálann an príomhchonradh gealltanais staide (fréamhacha Merkle) arna gcur isteach ag táirgeoirí bloc agus nuashonraítear staid na bailíochta nuair a fhíoraítear cruthúnas bailíochta ar slabhra. Próiseálann an conradh seo taiscí chuig slabhra validium agus aistarraingtí uaidh freisin.

Braitheann Validiums freisin ar an bpríomhshlabhra Ethereum le haghaidh na nithe seo a leanas:

### Réiteach {#settlement}

Ní féidir idirbhearta a dhéantar ar validium a dhearbhú go hiomlán go dtí go bhfíoróidh an mháthairshlabhra a mbailíocht. Ní mór gach gnó a dhéantar ar validium a shocrú ar Mainnet faoi dheireadh. Soláthraíonn an Ethereum blocshlabhra "ráthaíochtaí socraíochta" freisin d'úsáideoirí validium, rud a chiallaíonn nach féidir idirbhearta slabhra a aisiompú nó a athrú nuair a bhíonn siad tiomanta do shlabhra.

### Slándáil {#security}

Ráthaíonn Ethereum, ag gníomhú mar chiseal socraíochta, bailíocht aistrithe staide ar validium. Déantar idirbhearta as slabhra a ritear ar an slabhra validium a fhíorú trí chonradh cliste ar bhunchiseal Ethereum.

Má mheasann conradh an fhíoraitheora ar slabhra an cruthúnas a bheith neamhbhailí, diúltaítear do na hidirbhearta. Ciallaíonn sé seo go gcaithfidh oibreoirí na coinníollacha bailíochta arna bhforfheidhmiú ag prótacal Ethereum a shásamh sula ndéantar staid an validium a nuashonrú.

## Conas a oibríonn validium? {#how-does-validium-work}

### Idirbhearta {#transactions}

Cuireann úsáideoirí idirbhearta faoi bhráid an oibreora, nód atá freagrach as idirbhearta a rith ar an slabhra validium. D’fhéadfadh roinnt validium oibreoir aonair a úsáid chun an slabhra a rith, nó brath ar mheicníocht [cruthúnas-gill (PoS)](/developers/docs/consensus-mechanisms/pos/) le haghaidh oibreoirí rothlacha.

Comhiomlánaíonn an t-oibreoir idirbhearta ina bhaisc agus cuireann sé iad chuig ciorcad cruthaithe lena chruthú. Glacann an ciorcad cruthúnais leis an mbaisc idirbhirt (agus sonraí ábhartha eile) mar ionchuir agus aschuir cruthúnas bailíochta a fhíoraíonn gur comhlíonadh na hoibríochtaí i gceart.

### Gealltanais staide {#state-commitments}

Tá staid an validium haiseáilte mar chrann Merkle leis an fhréamh atá stóráilte sa phríomhchonradh ar Ethereum. Feidhmíonn fréamh Merkle, ar a dtugtar an fhréamh staide freisin, mar ghealltanas cripteagrafach do staid reatha na gcuntas agus na n-iarmhéideanna ar an validium.

Chun nuashonrú staide a dhéanamh, ní mór don oibreoir fréamh staide nua a ríomh (tar éis idirbhearta a fhorghníomhú) agus é a chur isteach sa chonradh slabhra. Má fhíoraítear an cruthúnas bailíochta, glacfar leis an staid atá beartaithe agus aistríonn an validium go dtí an fréamh staide nua.

### Éarlaisí agus aistarraingtí {#deposits-and-withdrawals}

Bogann úsáideoirí cistí ó Ethereum go validium trí ETH (nó aon chomhartha ERC-comhoiriúnach) a thaisceadh sa chonradh slabhra. Déanann an conradh an t-imeacht taisce a athsheoladh chuig an validium as slabhra, áit a gcuirtear méid atá comhionann lena thaisce chun sochair do sheoladh an úsáideora. Áiríonn an t-oibreoir an t-idirbheart taisce seo i mbaisc nua freisin.

Chun cistí a aistriú ar ais go Mainnet, tionscnaíonn úsáideoir validium idirbheart aistarraingthe agus cuireann sé faoi bhráid an oibreora a bhailíochtaíonn an t-iarratas ar astarraingt agus a áiríonn i mbaisc é. Scriostar sócmhainní an úsáideora ar an slabhra validium freisin sular féidir leo imeacht ón gcóras. Nuair a bheidh an cruthúnas bailíochta a bhaineann leis an bhaisc fíoraithe, is féidir leis an úsáideoir glaoch ar an bpríomhchonradh chun an chuid eile dá éarlais tosaigh a aistarraingt.

Mar mheicníocht frith-chinsireachta, ceadaíonn an prótacal validium d'úsáideoirí tarraingt siar go díreach ón gconradh validium gan dul tríd an oibreoir. Sa chás seo, ní mór d'úsáideoirí cruthúnas Merkle a sholáthar don chonradh fíoraitheora a thaispeánann cuimsiú an chuntais sa bhfréamh staide. Má ghlactar leis an gcruthúnas, is féidir leis an úsáideoir glaoch ar fheidhm aistarraingthe an phríomhchonartha chun a gcuid cistí a scor ón validium.

### Taisceadh baisce {#batch-submission}

Tar éis baisc idirbheart a chur i gcrích, cuireann an t-oibreoir an cruthúnas bailíochta gaolmhar isteach chuig an gconradh fíoraitheora agus molann sé fréamh staide nua don phríomhchonradh. Má tá an cruthúnas bailí, déanann an príomhchonradh staid an validium a nuashonrú agus torthaí na n-idirbheart sa bhaisc a thabhairt chun críche.

Murab ionann agus ZK-rollup, níl sé de cheangal ar tháirgeoirí bloc ar validium sonraí idirbhirt a fhoilsiú maidir le baisceanna idirbheart (bloc ceanntásca amháin). Fágann sé seo gur prótacal scálúcháin as-slabhra é validium, i gcomparáid le prótacail scálúcháin "hibrideacha" (i.e., [sraith 2](/layer-2/)) a fhoilsíonn sonraí stádais ar phríomhshlabhra Ethereum ag baint úsáide as sonraí blob, `calldata`, nó meascán den dá rud.

### Infhaighteacht sonraí {#data-availability}

Mar a luadh, úsáideann validiums múnla infhaighteachta sonraí as slabhra, ina stórálann oibreoirí na sonraí idirbhirt go léir ó Ethereum Mainnet. Feabhsaíonn lorg sonraí íseal ar slabhra Validium inscálaitheacht (níl an tréchur teoranta ag cumas próiseála sonraí Ethereum) agus laghdaíonn sé táillí úsáideoirí (tá costas foilsiú sonraí ar slabhra níos ísle).

Tá fadhb ag baint le hinfhaighteacht sonraí as slabhra, áfach: b'fhéidir nach mbeidh na sonraí riachtanacha chun cruthúnais Merkle a chruthú nó a fhíorú ar fáil. Ciallaíonn sé sin go bhféadfadh sé nach mbeadh úsáideoirí in ann cistí a aistarraingt ón gconradh ar slabhra más rud é go ngníomhaíonn oibreoirí go mailíseach.

Déanann réitigh bailí éagsúla iarracht an fhadhb seo a réiteach trí stóras sonraí staide a dhílárú. Is éard atá i gceist leis seo iallach a chur ar tháirgeoirí bloc na sonraí bunúsacha a sheoladh chuig "bainisteoirí infhaighteachta sonraí" atá freagrach as sonraí as slabhra a stóráil agus iad a chur ar fáil d'úsáideoirí ar iarratas.

Deimhníonn bainisteoirí infhaighteachta sonraí i validium an infhaighteacht sonraí le haghaidh idirbhearta as slabhra trí gach baisc validium a shíniú. Is éard atá sna sínithe seo ná cineál "cruthúnas infhaighteachta" a sheiceálann an fíoraitheoir ar slabhra an chonartha sula gceadaítear nuashonruithe staide.

Tá difríocht idir validiums ina gcur chuige maidir le hinfhaighteacht sonraí a bhainistiú. Bíonn cuid acu ag brath ar pháirtithe iontaofa chun sonraí stáit a stóráil, agus úsáideann daoine eile bailíochtaithe a shanntar go randamach don tasc.

#### Coiste Infhaighteachta Sonraí (DAC) {#data-availability-committee}

Chun infhaighteacht sonraí as slabhra a ráthú, ceapann roinnt réitigh bhailíochta grúpa aonán iontaofa, ar a dtugtar coiste infhaighteachta sonraí (DAC) chun cóipeanna den staid a stóráil agus cruthúnas ar infhaighteacht sonraí a sholáthar. Tá sé níos fusa DACanna a chur i bhfeidhm agus teastaíonn níos lú comhordaithe ós rud é go bhfuil an bhallraíocht íseal.

Mar sin féin, ní mór d’úsáideoirí muinín a chur in DAC chun na sonraí a chur ar fáil nuair is gá (m.sh., chun cruthúnais Merkle a ghiniúint). D’fhéadfadh go mbeadh baill de choistí infhaighteachta sonraí [curtha i gcontúirt ag gníomhaí mailíseach](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) atá in ann sonraí an tslabhra a choinneáil siar ansin.

[Tuilleadh eolais faoi choistí infhaighteachta sonraí in validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Infhaighteacht sonraí nasctha {#bonded-data-availability}

Éilíonn validiums eile ar rannpháirtithe a bhfuil sé de chúram orthu sonraí as líne a stóráil (i.e., glasáil) comharthaí a gheallchur i gconradh cliste sula nglacfaidh siad lena róil. Feidhmíonn an geall seo mar “bhanna” chun iompar macánta a ráthú i measc bainisteoirí infhaighteachta sonraí agus laghdaítear boinn tuisceana iontaobhais. Má theipeann ar na rannpháirtithe seo infhaighteacht sonraí a chruthú, gearrtar an banna.

I scéim banna-infhaighteachta sonraí, is féidir aon duine a shannadh chun sonraí as slabhra a choinneáil a luaithe a sholáthraíonn siad an geall riachtanach. Leathnaíonn sé seo an linn de bhainisteoirí incháilithe um infhaighteacht sonraí, ag laghdú an lárnaithe a théann i bhfeidhm ar choistí infhaighteachta sonraí (DACanna). Níos tábhachtaí fós, braitheann an cur chuige seo ar dhreasachtaí cripteacnamaíocha chun gníomhaíocht mhailíseach a chosc, atá i bhfad níos sláine ná páirtithe iontaofa a cheapadh chun sonraí as líne a shlánú sa validium.

[Tuilleadh maidir le hinfhaighteacht sonraí bannaithe i validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Toilithe agus validium {#volitions-and-validium}

Tá go leor buntáistí ag baint le Validiums ach baineann laigí leo (go háirithe, infhaighteacht sonraí). Ach, mar atá i gcás go leor réitigh scálaithe, tá validiums feiliúnach do chásanna úsáide ar leith - agus is é sin an fáth ar cruthaíodh toilithe.

Comhcheanglaíonn toilithe slabhra ZK-rollup agus validium agus ligeann siad d’úsáideoirí aistriú idir an dá réiteach scálaithe. Le toilithe, is féidir le húsáideoirí leas a bhaint as infhaighteacht sonraí as slabhra validium le haghaidh idirbhearta áirithe, agus a bheith saor ag an am céanna aistriú chuig réiteach infhaighteachta sonraí ar slabhra (ZK-rollup) más gá. Tugann sé seo go bunúsach an tsaoirse d'úsáideoirí comhbhabhtálacha a roghnú de réir a gcúinsí uathúla.

B’fhéidir gurbh fhearr le malartán díláraithe (DEX) bonneagar inscálaithe agus príobháideach validium a úsáid le haghaidh trádálacha ardluacha. Féadfaidh sé úsáid a bhaint as ZK-rollup freisin d'úsáideoirí a dteastaíonn ráthaíochtaí slándála níos airde agus easpa muiníne ZK-rollup uathu.

## Comhoiriúnacht validiums agus EVM {#validiums-and-evm-compatibility}

Cosúil le ZK-rollups, tá validiums níos oiriúnaí d’fheidhmchláir shimplí den chuid is mó, mar bhabhtálacha comharthaí agus íocaíochtaí. Tá sé deacair tacú le ríomh ginearálta agus le rith conarthaí cliste i measc na validium, i bhfianaise na bhforchostas suntasacha a bhaineann le treoracha [EVM](/developers/docs/evm/) a chruthú i gciorcad cruthúnais dífhianaise.

Déanann roinnt tionscadal validium iarracht an fhadhb seo a sheachaint trí theangacha atá comhoiriúnach le EVM (m.sh., Solidity, Vyper) a thiomsú chun beartchód saincheaptha a chruthú atá optamaithe don chruthúnas éifeachtach. Míbhuntáiste a bhaineann leis an gcur chuige seo ná go mb’fhéidir nach dtacóidh VManna nua atá neamhdhíobhálach don dífhianaise le opcodes tábhachtacha EVM, agus go gcaithfidh forbróirí scríobh go díreach sa teanga ardleibhéil ar mhaithe le taithí optamach. Cruthaíonn sé seo níos mó fadhbanna fós: cuireann sé iallach ar fhorbróirí dapps a thógáil le cruach forbartha iomlán nua agus briseann sé comhoiriúnacht le bonneagar reatha Ethereum.

Tá roinnt foirne, áfach, ag iarraidh barrfheabhsú a dhéanamh ar cóid oibríochta EVM atá ann cheana féin le haghaidh ciorcaid a chruthaíonn ZK. Mar thoradh air seo forbrófar Meaisín Fíorúil Ethereum ar dhífhianaise (zkEVM), VM-comhoiriúnach le EVM a tháirgeann cruthúnais chun cruinneas cur i gcrích an chláir a fhíorú. Le zkEVM, is féidir le slabhraí bailíochta conarthaí cliste a rith as slabhra agus cruthúnais bailíochta a chur isteach chun ríomh as slabhra a fhíorú (gan gá é a ath-rith) ar Ethereum.

[Tuilleadh faoi zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Conas a scálaíonn validiums Ethereum? {#scaling-ethereum-with-validiums}

### 1. Stóras sonraí as slabhra {#offchain-data-storage}

Déanann tionscadail scálaithe Chiseal 2, amhail uas-scáluithe dóchasacha agus ZK-rollups, trádáil ar inscálaitheacht gan teorainn na bprótacal scálaithe as slabhra íon (m.sh., [Plasma](/developers/docs/scaling/plasma/)) ar mhaithe le slándáil trí roinnt sonraí idirbhirt a fhoilsiú ar L1. Ach ciallaíonn sé seo go bhfuil airíonna inscálaitheachta uas-scáluithe teoranta ag bandaleithead sonraí ar Ethereum Mainnet ([sceardadh sonraí](/roadmap/danksharding/) a mholtar le feabhas a chur ar acmhainn stóras sonraí Ethereum ar an gcúis seo).

Baineann Validiums inscálaitheacht amach trí na sonraí idirbhirt go léir a choinneáil as slabhra agus ní iarchuireann siad ach gealltanais staide (agus cruthúnais bhailíochta) nuair a bhíonn nuashonruithe staide á seoladh chuig an bpríomhshlabhra Ethereum. Mar sin féin, tugann cruthúnais bhailíochta ráthaíochtaí slándála níos airde do validiums ná réitigh scálaithe íona eile, lena n-áirítear Plasma agus [taobhshlabhraí](/developers/docs/scaling/sidechains/). Trí laghdú a dhéanamh ar an méid sonraí a chaithfidh Ethereum a phróiseáil sula ndéantar idirbhearta slabhra a bhailíochtú, cuireann dearaí vailidium go mór leis an tréchur ar Príomhlíonra.

### 2. Cruthúnas athchúrsach {#recursive-proofs}

Is cruthúnas bailíochta é cruthúnas athchúrsach a fhíoraíonn bailíocht cruthúnais eile. Gintear na "cruthúnas de cruthúnais" seo trí chruthúnas iolrach a chomhiomlánú go hathchúrsach go dtí go gcruthaítear cruthúnas deiridh amháin a fhíoraíonn gach cruthúnais roimhe seo. Scálaíonn cruthúnas athchúrsach luasanna próiseála blocshlabhra trí líon na n-idirbheart is féidir a fhíorú de réir cruthúnais bhailíochta a mhéadú.

De ghnáth, déanann gach cruthúnas bailíochta a chuireann an t-oibreoir validium faoi bhráid Ethereum lena fhíorú bailíochtú sláine aon bhloic amháin. De bhrí gur féidir cruthúnas athchúrsach amháin a úsáid chun bailíocht roinnt bloc validium a dheimhniú ag an am céanna - is féidir é seo a dhéanamh toisc gur féidir leis an gciorcad cruthúnais roinnt cruthúnais bloic a chomhiomlánú go hathchúrsach in aon chruthúnas deiridh amháin. Má ghlacann an conradh fíoraithe ar slabhra an cruthúnas athchúrsach, déantar na bloic bhunúsacha go léir a thabhairt chun críche láithreach.

## Buntáistí agus míbhuntáistí validium {#pros-and-cons-of-validium}

| Buntáistí                                                                                                                                                           | Míbhuntáistí                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Forfheidhmíonn cruthúnais bhailíochta sláine na n-idirbheart as slabhra agus coisceann siad ​​ar oibreoirí nuashonruithe staid neamhbhailí a thabhairt chun críche. | Teastaíonn crua-earraí speisialta chun cruthúnais bhailíochta a tháirgeadh, rud a chruthaíonn riosca láraithe.                                                                                |
| Méadaíonn sé éifeachtúlacht chaipitil d'úsáideoirí (gan aon mhoill maidir le cistí a aistarraingt go Ethereum)                                                      | Tacaíocht theoranta do ríomhaireacht ghinearálta/conarthaí cliste; sainteangacha a theastaíonn le forbairt.                                                                                   |
| Gan a bheith i mbaol ionsaithe eacnamaíocha áirithe a bhíonn os comhair córais atá bunaithe ar chalaois i bhfeidhmchláir ardluacha.                                 | Cumhacht ard ríomhaireachta ag teastáil chun cruthúnais ZK a ghiniúint; nach bhfuil éifeachtach ó thaobh costais d'fheidhmchláir tréchur íseal.                                               |
| Laghdaíonn sé táillí gáis d'úsáideoirí trí gan sonraí glaonna a phostáil chuig Ethereum Príomhlíonra.                                                               | Am críochnaitheachta suibiachtúla níos moille (10-30 nóiméad chun cruthúnas ZK a ghiniúint) ach níos tapúla go dtí críochnaitheacht iomlán toisc nach bhfuil aon mhoill ama díospóide ann.    |
| Oiriúnach do chásanna úsáide sonracha, cosúil le cearrbhachas trádála nó blocshlabhra a thugann tosaíocht do phríobháideacht agus inscálaitheacht na n-idirbheart.  | Is féidir cosc ​​a chur ar úsáideoirí cistí a aistarraingt ós rud é go gceanglaíonn giniúint cruthúnais Merkle ar úinéireacht go mbeadh sonraí as slabhra ar fáil i gcónaí.                   |
| Soláthraíonn infhaighteacht sonraí as slabhra leibhéil níos airde tréchur agus méadaíonn sé scálaitheacht.                                                          | Braitheann samhail slándála ar thoimhdí iontaobhais agus dreasachtaí cripteacnamaíocha, murab ionann agus ZK-rollups, a bhíonn ag brath go hiomlán ar mheicníochtaí slándála cripteagrafacha. |

### Úsáid Validium/Toilithe {#use-validium-and-volitions}

Soláthraíonn tionscadail iolracha feidhmiúcháin validium agus toilithe is féidir leat a chomhtháthú le do dapps:

**StarkWare StarkEx** - _Is réiteach inscálaithechta Ethereum Sraith 2 (L2) é StarkEx atá bunaithe ar chruthúnais bhailíochta. Is féidir leis oibriú i modhanna ZK-Rollup nó Validium infhaighteacht sonraí._

- [Doiciméadúchán](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Suíomh Gréasáin](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _Is prótacal scálaithe Sraith 2 é zkPorter a théann i ngleic le hinfhaighteacht sonraí le cur chuige hibrideach a chomhcheanglaíonn smaointe zkRollup agus sceardadh. Is féidir leis tacú go treallach le go leor scearda, agus a bheartas infhaighteachta sonraí féin ag gach ceann acu._

- [Blag](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Doiciméadúchán](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Suíomh Gréasáin](https://zksync.io/)

## Tuilleadh léitheoireachta {#further-reading}

- [Bailíocht agus an Chiseal 2 Dó-faoi-Dhó — Eagrán Uimh. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Toiliú agus an speictream Infhaighteachta Sonraí atá ag Teacht Chun Cinn](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Uas-scáluithe, Validiums, agus Toilithe: Foghlaim Faoi na Réitigh Scálú Ethereum is Teo](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [An Treoir Phraiticiúil maidir le hUas-Scáluithe Ethereum](https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
