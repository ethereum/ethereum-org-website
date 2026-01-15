---
title: Infhaighteacht sonraí
description: Forbhreathnú ar fhadhbanna agus réitigh a bhaineann le hinfhaighteacht sonraí i Ethereum
lang: ga
---

Is uasmhéid coitianta é "Ná cuir muinín, fíoraigh" in Ethereum. Is é an smaoineamh gur féidir le do nód a fhíorú go neamhspleách go bhfuil an fhaisnéis a fhaigheann sé ceart trí na hidirbhearta go léir sna bloic a fhaigheann siad ó phiaraí a rith le cinntiú go bhfuil na hathruithe atá beartaithe ag teacht go beacht leis na cinn a ríomhtar go neamhspleách ag an nód. Ciallaíonn sé seo nach gcaithfidh nóid muinín a bheith acu go bhfuil seoltóirí an bhloic macánta. Ní féidir é seo a dhéanamh má tá sonraí in easnamh.

Tagraíonn **infhaighteacht sonraí** don mhuinín atá ag úsáideoir go bhfuil na sonraí atá riachtanach chun bloc a fhíorú ar fáil i ndáiríre do gach rannpháirtí líonra. Le haghaidh nóid iomlána ar Ethereum ciseal 1 tá sé seo sách simplí; íoslódálann an nód iomlán cóip de na sonraí go léir i ngach bloc - tá na sonraí _le bheith_ ar fáil ionas gur féidir iad a íoslódáil. Dhiúltófaí bloc le sonraí in easnamh seachas é a chur leis an blocshlabhra. Is é seo "infhaighteacht sonraí ar slabhra" agus is gné de bhlocshlabhra monailiotach é. Ní féidir nóid iomlána a mhealladh chun glacadh le hidirbhearta neamhbhailí toisc go n-íoslódálann siad agus go ndéanann siad gach idirbheart dóibh féin. Mar sin féin, le haghaidh blocshlabhraí modúlacha, rollaí suas ciseal 2 agus cliaint éadroma, tá an tírdhreach infhaighteachta sonraí níos casta, rud a éilíonn roinnt nósanna imeachta fíoraithe níos sofaisticiúla.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh tuiscint mhaith agat ar [bunphrionsabail bhlocshlabhra](/developers/docs/intro-to-ethereum/), go háirithe [meicníochtaí comhdhearcaidh](/developers/docs/consensus-mechanisms/). Glacann an leathanach seo leis freisin go bhfuil an léitheoir eolach ar [bloic](/developers/docs/blocks/), [idirbhearta](/developers/docs/transactions/), [nóid](/developers/docs/nodes-and-clients/), [réitigh scálaithe](/developers/docs/scaling/), agus ábhair ábhartha eile.

## An fhadhb infhaighteachta sonraí {#the-data-availability-problem}

Is í an fhadhb infhaighteachta sonraí an gá atá le cruthú don líonra iomlán go léiríonn an fhoirm achomair de roinnt sonraí idirbhirt atá á gcur leis an mblocshlabhra sraith idirbheart bailí i ndáiríre, ach é sin a dhéanamh gan a cheangal ar gach nóid na sonraí go léir a íoslódáil. Tá na sonraí iomlána idirbhirt riachtanach chun bloic a fhíorú go neamhspleách, ach tá sé ina bhac ar scálú a cheangal ar na nóid go léir na sonraí idirbhirt go léir a íoslódáil. Tá sé mar aidhm ag réitigh ar fhadhb infhaighteacht sonraí ráthaíochtaí leordhóthanacha a sholáthar go bhfuil na sonraí iomlána idirbhirt ar fáil le fíorú do rannpháirtithe líonra nach n-íoslódálann agus nach stórálann na sonraí dóibh féin.

Is samplaí tábhachtacha de rannpháirtithe líonra iad [Nóid solais](/developers/docs/nodes-and-clients/light-clients) agus [rolladh ciseal 2](/developers/docs/scaling) a dteastaíonn dearbhuithe láidre maidir le hinfhaighteacht sonraí uathu ach nach féidir leo sonraí idirbhirt a íoslódáil agus a phróiseáil dóibh féin. Is éard atá i gceist le híoslódáil sonraí idirbhirt a sheachaint ná na nóid éadroma a chuireann ar chumas na n-rollta a bheith ina réitigh scálaithe éifeachtacha.

Is ábhar cúraim ríthábhachtach é infhaighteacht sonraí freisin do chliaint Ethereum ["gan staid"](/roadmap/statelessness) nach gá sonraí staide a íoslódáil agus a stóráil chun bloic a fhíorú. Ní mór do na cliaint gan staid a bheith cinnte go bhfuil na sonraí ar fáil _áit éigin_ agus go bhfuil siad próiseáilte i gceart.

## Réitigh infhaighteachta sonraí {#data-availability-solutions}

### Sampláil infhaighteachta sonraí (DAS) {#data-availability-sampling}

Is bealach é Sampláil Infhaighteachta Sonraí (DAS) lenar féidir leis an líonra a sheiceáil go bhfuil sonraí ar fáil gan an iomarca brú a chur ar aon nód aonair. Íoslódálann gach nód (lena n-áirítear nóid neamh gheall) fo-thacar beag roghnaithe go randamach de na sonraí iomlána. Nuair a dhéantar na samplaí a íoslódáil go rathúil, deimhnítear le muinín ard go bhfuil na sonraí go léir ar fáil. Braitheann sé seo ar chódú scriosta sonraí, a leathnaíonn tacar sonraí ar leith le faisnéis iomarcach (déantar é seo le feidhm ar a dtugtar _iltéarmach_ a fheistiú ar na sonraí agus an t-iltéarmach sin a mheas ag pointí breise). Ceadaíonn sé seo na sonraí bunaidh a aisghabháil ó na sonraí iomarcacha nuair is gá. Iarmhairt ar chruthú na sonraí seo ná mura bhfuil _aon cheann_ de na sonraí bunaidh ar fáil, go mbeidh _leath_ de na sonraí méadaithe in easnamh! Is féidir méid na samplaí sonraí a íoslódálann gach nód a choigeartú ionas go mbíonn _rí-_ dhóchúil go mbeidh ar a laghad ceann amháin de na blúirí sonraí arna sampláil ag gach cliant _má_ tá níos lú ná leath na sonraí ar fáil i ndáiríre.

Úsáidfear DAS chun a chinntiú go gcuirfidh oibreoirí rollta suas a gcuid sonraí idirbheart ar fáil tar éis [Full Danksharding](/roadmap/danksharding/#what-is-danksharding) a bheith curtha i bhfeidhm. Déanfaidh nóid Ethereum sampla randamach de na sonraí idirbhirt a sholáthraítear i mblobaí ag baint úsáide as an scéim iomarcaíochta atá mínithe thuas chun a chinntiú go bhfuil na sonraí go léir ann. D'fhéadfaí an teicníc chéanna a úsáid freisin chun a chinntiú go bhfuil táirgeoirí bloc ag cur a gcuid sonraí go léir ar fáil chun cliaint éadroma a shlánú. Ar an gcaoi chéanna, faoi [dheighilt idir an tairgeoir agus an tógálaí](/roadmap/pbs), ní bheadh ​​ag teastáil ach ar an tógálaí bloc iomlán a phróiseáil - dhéanfadh bailíochtóirí eile úsáid a bhaint as sampláil infhaighteachta sonraí a fhíorú.

### Coistí infhaighteachta sonraí {#data-availability-committees}

Is páirtithe iontaofa iad Coistí Infhaighteachta Sonraí (DACanna) a sholáthraíonn, nó a dheimhníonn, infhaighteacht sonraí. Is féidir DACanna a úsáid in ionad, [nó i gcomhcheangal le](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Braitheann na ráthaíochtaí slándála a thagann le coistí ar an socrú sonrach. Úsáideann Ethereum fo-thacair de bhailitheoirí arna sampláil go randamach chun infhaighteacht sonraí le haghaidh nóid solais a fhianú, mar shampla.

Úsáideann roinnt validium DACanna freisin. Is sraith nóid iontaofa é an DAC a stórálann cóipeanna de shonraí as líne. Ceanglaítear ar an DAC na sonraí a chur ar fáil i gcás díospóide. Foilsíonn baill an DAC fianuithe ar slabhra freisin chun a chruthú go bhfuil na sonraí sin ar fáil go deimhin. Cuirtear córas bailíochtaithe cruthúnas-gill (PoS) in ionad DACanna áirithe. Anseo, is féidir le duine ar bith a bheith ina bhailíochtóir agus sonraí a stóráil as slabhra. Mar sin féin, ní mór dóibh “banna” a sholáthar, a thaiscítear i gconradh cliste. I gcás iompar mailíseach, mar shampla sonraí a choinneáil siar ón mbailíochtóir, is féidir an banna a laghdú. Tá coistí infhaighteachta sonraí cruthúnas-gill i bhfad níos sláine ná na DACanna rialta toisc go spreagann siad iompar macánta go díreach.

## Infhaighteacht sonraí agus nóid éadroma {#data-availability-and-light-nodes}

Ní mór do [Nóid éadroma](/developers/docs/nodes-and-clients/light-clients) cruinneas na gceanntásc bloc a fhaigheann siad a bhailíochtú gan na sonraí bloc a íoslódáil. Is é laige na héadroime seo nach féidir léi na gceannteidil bloc a fhíorú go neamhspleách trí idirbhearta a ath-rith go háitiúil mar a dhéanann nóid iomlána.

Tá muinín ag nóid solais Ethereum as tacair randamacha de 512 bhailitheoir atá sannta do _choiste sioncronaithe_. Feidhmíonn an coiste sioncronaithe mar DAC a thugann le fios do chliaint go bhfuil na sonraí sa cheanntásc ceart ag baint úsáide as síniú cripteagrafaíoch. Gach lá, déanann an coiste sioncronaithe athnuachan. Cuireann gach ceanntásc bloc nóid éadroma ar an eolas faoina mbeidh bailíochtóirí ag súil leis_gcéad bhloc eile_ a shíniú, mar sin ní féidir iad a mhealladh le muinín a bheith acu as grúpa mailíseach a ligeann orthu gurb é an fíorchoiste sioncronaithe é.

Cad a tharlóidh, áfach, má éiríonn le _ionsaitheoir_ ceanntásc bloc mailíseach a chur ar aghaidh chuig cliaint agus a chur ina luí orthu gur shínigh coiste sioncronaithe macánta é? Sa chás sin, d'fhéadfadh an t-ionsaitheoir idirbhearta neamhbhailí a áireamh agus go nglacfadh an cliant éadrom go dall orthu, toisc nach ndéanann siad seiceáil neamhspleách ar na hathruithe stáit go léir atá achoimrithe sa cheanntásc bloc. Chun é seo a chosaint, d'fhéadfadh an cliant éadrom cruthúnais calaoise a úsáid.

Is é an chaoi a n-oibríonn na cruthúnais chalaoise seo ná go bhféadfadh nód iomlán, ar fheiceáil aistriú staide neamhbhailí á phlé ar fud an líonra, píosa beag sonraí a ghiniúint go tapa a thaispeánfadh nach bhféadfadh aistriú staide atá beartaithe eascairt ó shraith áirithe idirbheart agus na sonraí sin a chraoladh chuig piaraí. D'fhéadfadh nóid éadroma na cruthúnais calaoise sin a phiocadh suas agus iad a úsáid chun deireadh a chur le droch-cheanntáisc na mbloc, ag cinntiú go bhfanann siad ar an slabhra macánta céanna leis na nóid iomlána.

Braitheann sé seo ar rochtain a bheith ag nóid iomlána ar shonraí iomlána idirbhirt. Bheadh ​​​​ionsaitheoir a chraolann ceanntásc droch-bhloic agus a mhainníonn freisin na sonraí idirbhirt a chur ar fáil in ann nóid iomlána a chosc ó chruthúnas calaoise a ghiniúint. B'fhéidir go mbeadh na nóid iomlána in ann rabhadh a thabhairt faoi dhroch-bhloc, ach níorbh fhéidir leo tacú lena rabhadh le cruthúnas, mar níor cuireadh na sonraí ar fáil chun an cruthúnas a ghiniúint uaidh!

Is é DAS an réiteach ar an bhfadhb infhaighteachta sonraí seo. Íoslódálann nóid éadroma sleachta randamacha an-bheaga de na sonraí staide iomlána agus úsáideann siad na samplaí chun a fhíorú go bhfuil an tacar sonraí iomlán ar fáil. Is féidir an dóchúlacht iarbhír a bhaineann le hinfhaighteacht sonraí iomlána a ghlacadh go mícheart tar éis N smután randamach a íoslódáil a ríomh ([ i gcás 100 smután is é an seans ná 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), i.e., dóchúlacht dhochreidte beagnach).

Fiú sa chás seo, d'fhéadfadh sé nach dtabharfadh cliaint a dhéanann iarratais sonraí randamacha ionsaithe a choinníonn siar cúpla beart faoi deara. Ceartaítear é seo le códú scriosta trí phíosaí beaga sonraí atá in easnamh a athchruthú chun athruithe staide atá beartaithe a sheiceáil. D'fhéadfaí cruthúnas calaoise a chruthú ansin ag baint úsáide as na sonraí atógtha, rud a chuirfeadh cosc ​​ar nóid éadroma glacadh le droch-cheanntáisc.

**Nóta:** Níl DAS agus cruthúnais chalaoise curtha i bhfeidhm go fóill do chliaint éadroma Ethereum cruthúnais, ach tá siad ar an treochlár, is dócha gur cruthúnais ZK-SNARK atá bunaithe orthu. Braitheann cliaint éadroma an lae inniu ar fhoirm DAC: deimhníonn siad céannachtaí an choiste sioncronaithe agus ansin cuireann siad muinín sna ceanntáisc bhloic shínithe a fhaigheann siad.

## Infhaighteacht sonraí agus rolladh suas ciseal 2 {#data-availability-and-layer-2-rollups}

[ Réitigh scálaithe Sraith 2](/layer-2/), amhail [rollups](/glossary/#rollups), laghdaítear costais idirbheartaíochta agus méadaítear tréchur Ethereum trí idirbhearta a phróiseáil as slabhra. Déantar idirbhearta rollta a chomhbhrú agus a phostáil ar Ethereum i mbaisceanna. Is ionann baisceanna agus na mílte idirbheart aonair as slabhra in idirbheart amháin ar Ethereum. Laghdaíonn sé seo brú tráchta ar an mbunchiseal agus laghdaítear táillí d’úsáideoirí.

Mar sin féin, ní féidir muinín a chur sna hidirbhearta 'achomair' a phostáiltear chuig Ethereum más féidir an t-athrú staide atá beartaithe a fhíorú agus a dhearbhú go neamhspleách mar thoradh ar na hidirbhearta aonair as slabhra go léir a chur i bhfeidhm. Mura gcuireann oibreoirí rolladh suas na sonraí idirbhirt ar fáil don fhíorú seo, d'fhéadfadh siad sonraí míchearta a sheoladh chuig Ethereum.

Postálann [Rollaí dóchasacha](/developers/docs/scaling/optimistic-rollups/) sonraí idirbheart comhbhrúite chuig Ethereum agus fanann ar feadh roinnt ama (7 lá go hiondúil) chun ligean d’fhíoraitheoirí neamhspleácha na sonraí a sheiceáil. Má aithníonn aon duine fadhb, is féidir leo cruthúnas calaoise a ghiniúint agus é a úsáid chun dúshlán a thabhairt don rolladh suas. Chuirfeadh sé seo faoi deara an slabhra a rolladh siar agus an bloc neamhbhailí a fhágáil ar lár. Ní féidir é seo a dhéanamh ach amháin má tá sonraí ar fáil. Faoi láthair, tá dhá bhealach ann a chuireann rolladh suas dóchasach sonraí idirbhirt chuig L1. Cuireann roinnt rolluithe sonraí ar fáil go buan mar `CALLDATA` a mhaireann go buan ar slabhra. Le cur i bhfeidhm EIP-4844, cuireann roinnt rollaí suas a gcuid sonraí idirbheart chuig stóráil blobaí níos saoire ina ionad sin. Ní stóráil bhuan é seo. Caithfidh fíoraitheoirí neamhspleácha na blobaí a fhiosrú agus a ndúshlán a ardú laistigh de ~18 lá sula scriostar na sonraí ó Ethereum ciseal-1. Ní ráthaítear infhaighteacht sonraí ach ag prótacal Ethereum don fhuinneog ghearr sheasta sin. Tar éis sin, bíonn aonáin eile in éiceachóras Ethereum freagrach as. Is féidir le haon nód infhaighteacht sonraí a fhíorú trí úsáid a bhaint as DAS, i.e., trí shamplaí beaga randamacha de shonraí blobaí a íoslódáil.

Ní gá do [Rollú suas nialais-eolas (ZK)](/developers/docs/scaling/zk-rollups) sonraí idirbhirt a phostáil ós rud é go ráthaíonn [cruthúnais bailíochta nialais-eolais](/glossary/#zk-proof) cruinneas na n-aistrithe staide. Mar sin féin, tá infhaighteacht sonraí fós ina cheist toisc nach féidir linn feidhmiúlacht an rollú suas ZK (nó idirghníomhú leis) a ráthú gan rochtain ar a shonraí staide. Mar shampla, ní bheidh a n-iarmhéideanna ar eolas ag úsáideoirí má choinníonn oibreoir sonraí siar faoi staid an rollta suas. Chomh maith leis sin, ní féidir leo nuashonruithe staide a dhéanamh ag baint úsáide as faisnéis atá i mbloc atá curtha leis go nua.

## Infhaighteacht sonraí vs. inghnóthaitheacht sonraí {#data-availability-vs-data-retrievability}

Ní hionann infhaighteacht sonraí agus inghnóthaitheacht sonraí. Is éard atá in infhaighteacht sonraí ná dearbhú go bhfuil nóid iomlána in ann an tsraith iomlán idirbheart a bhaineann le bloc ar leith a rochtain agus a fhíorú. Ní gá go leanann sé go bhfuil na sonraí inrochtana go deo.

Is éard is in-aisghabháil sonraí ann cumas na nóid chun _faisnéis stairiúil_ a aisghabháil ón blocshlabhra. Níl na sonraí stairiúla seo ag teastáil chun bloic nua a fhíorú, níl sé ag teastáil ach chun nóid iomlána a shioncronú ón mbloc ginis nó chun freastal ar iarratais stairiúla ar leith.

Baineann croíphrótacal Ethereum go príomha le hinfhaighteacht sonraí, ní le hin-aisghabháil sonraí. Is féidir le daonra beag nóid chartlainne arna rith ag tríú páirtithe in-aisghabháil sonraí a sholáthar, nó is féidir í a dháileadh ar fud an líonra trí úsáid a bhaint as stór comhaid díláraithe amhail an [Tairseach Líonra](https://www.ethportal.net/).

## Tuilleadh léitheoireachta {#further-reading}

- [Céard é Infhaighteacht Sonraí?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Cad is Infhaighteacht Sonraí ann?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [Buneolas faoi sheiceáil infhaighteacht sonraí](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Míniú ar an togra bearrtha + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Nóta ar infhaighteacht sonraí agus códú scriosta](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Coistí infhaighteachta sonraí.](https://medium.com/starkware/data-availability-e5564c416424)
- [Coistí infhaighteachta sonraí cruthúnas-geallta.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Réitigh ar an bhfadhb in-aisghabhála sonraí](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Infhaighteacht Sonraí Nó: Mar a fhoghlaim Rolluithe Suas Conas Gan a Bheith Buartha agus Grá a Thabhairt do Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Costas Sonraí Glaonna a Mhéadú](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
