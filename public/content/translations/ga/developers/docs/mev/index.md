---
title: Uasluach inbhainte (MEV)
description: Réamheolas ar an uasluach inbhainte (MEV)
lang: ga
---

Tagraíonn uasluach inbhainte (MEV) don luach uasta is féidir a bhaint as táirgeadh bloc de bhreis ar an luach saothair caighdeánach bloc agus táillí gáis trí ordú na n-idirbheart i mbloc a áireamh, a eisiamh agus a athrú.

## Uasluach inbhainte {#maximal-extractable-value}

Cuireadh uasluach inbhainte i bhfeidhm ar dtús i gcomhthéacs [cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow/), agus tagraíodh dó ar dtús mar "luach in-eastósctha mianadóra". Tá sé seo amhlaidh toisc go rialaíonn mianadóirí cuimsiú, eisiamh agus ordú idirbheart i cruthúnas-oibre. Ó tharla an t-aistriú go cruthú–geallta tríd [An Cumasc](/roadmap/merge) tá bailíochtóirí freagrach as na róil seo, áfach, agus níl an mhianadóireacht mar chuid de phrótacal Ethereum a thuilleadh. Tá na modhanna eastósctha luacha ann fós, áfach, mar sin úsáidtear an téarma "Uasluach inbhainte" anois ina ionad.

## Réamhriachtanais {#prerequisites}

Bí cinnte go bhfuil tú eolach ar [idirbhearta](/developers/docs/transactions/), [bhloic](/developers/docs/blocks/), [cruthúnas-geallta](/developers/docs/consensus-mechanisms/pos) agus [gás](/developers/docs/gas/). Tá cur amach ar [dapps](/apps/) agus [DeFi](/defi/) cabhrach freisin.

## Eastóscadh MEV {#mev-extraction}

Go teoiriciúil fabhraíonn MEV go hiomlán do bhailíochtóirí toisc gurb iad an t-aon pháirtí atá in ann a ráthú go gcuirfear deis bhrabúsach MEV i gcrích. Go praiticiúil, áfach, is rannpháirtithe neamhspleácha líonra dá ngairtear "cuardaitheoirí" cuid mhór de MEV. Reáchtálann cuardaitheoirí algartaim chasta ar shonraí blocshlabhra chun deiseanna brabúsacha MEV a bhrath agus tá róbónna acu chun na hidirbhearta brabúsacha sin a chur isteach sa líonra go huathoibríoch.

Faigheann bailíochtóirí cuid den MEV iomlán mar sin féin toisc go bhfuil cuardaitheoirí sásta táillí arda gáis a íoc (a théann chuig an bhailíochtóir) mar mhalairt ar an dóchúlacht níos airde go n-áireofar a n-idirbheart brabúsach i mbloc. Ag glacadh leis go bhfuil na cuardaitheoirí réasúnach ó thaobh na heacnamaíochta de, beidh an táille gháis a bheidh an cuardaitheoir sásta a íoc suas le 100% de MEV an chuardaitheora (mar dá mbeadh an táille gháis níos airde, chaillfeadh an cuardaitheoir airgead).

Leis sin, i gcás roinnt deiseanna MEV atá thar a bheith iomaíoch, mar [arbatráiste DEX](#mev-examples-dex-arbitrage), d’fhéadfadh go mbeadh ar chuardaitheoirí 90% nó fiú níos mó dá n-ioncam MEV iomlán i dtáillí gáis a íoc leis an bhailíochtóirr toisc go bhfuil an oiread sin daoine ag iarraidh an trádáil arbatráiste brabúsach chéanna a reáchtáil. Is é an fáth atá leis seo ná gurb é an t-aon bhealach chun a chinntiú go ritheann a n-idirbheart arbatráiste ná má chuireann siad isteach an t-idirbheart a bhfuil an praghas gáis is airde aige.

### Gailf gáis {#mev-extraction-gas-golfing}

D’fhág an dinimic seo go bhfuil cumas i “ngailfáil gháis” — idirbhearta ríomhchláraithe ionas go n-úsáideann siad an méid is lú gáis — ina bhuntáiste iomaíoch, toisc go gceadaíonn sé do chuardaitheoirí praghas gáis níos airde a shocrú agus a dtáillí gáis iomlán a choinneáil seasmhach (ó tháillí gáis = praghas gáis \* gás a úsáidtear).

I measc na dteicnící aitheanta galfála gáis tá: seoltaí a úsáid a thosaíonn le teaghrán fada nialas (m.sh. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) ós rud é go nglacann siad níos lú spáis (agus dá bhrí sin gás) lena stóráil; agus iarmhéideanna beaga [ERC-20](/developers/docs/standards/tokens/erc-20/) a fhágáil i gconarthaí, ós rud é go gcosnaíonn sé níos mó gáis chun sliotán stórais a thúsú (más é 0 an t-iarmhéid) ná chun sliotán stórais a nuashonrú. Tá taighde á dhéanamh go gníomhach ag lucht cuardaigh le tuilleadh teicníochtaí a aimsiú chun úsáid gáis a laghdú.

### Reathaithe tosaigh ginearálaithe {#mev-extraction-generalized-frontrunners}

Seachas algartaim chasta a ríomhchlárú chun deiseanna brabúsacha MEV a bhrath, reáchtálann roinnt cuardaitheoirí reathaithe tosaigh ginearálaithe. Is róbónna iad reathaithe tosaigh ginearálaithe a bhreathnaíonn ar an mempool chun idirbhearta brabúsacha a bhrath. Déanfaidh an reathaí tosaigh cód an idirbhirt a d'fhéadfadh a bheith brabúsach a chóipeáil, cuirfidh seoladh an reathaí tosaigh in ionad seoltaí, agus reáchtálfaidh sé an t-idirbheart go háitiúil chun a sheiceáil faoi dhó go bhfuil brabús mar thoradh ar an idirbheart modhnaithe chuig seoladh an reathaí tosaigh. Má tá an t-idirbheart brabúsach go deimhin, cuirfidh an reathaí tosaigh isteach an t-idirbheart modhnaithe leis an seoladh athsholáthraithe agus praghas gáis níos airde, "ag rith chun tosaigh" leis an idirbheart bunaidh agus ag fáil MEV an chuardaitheora bunaidh.

### Flashbots {#mev-extraction-flashbots}

Is tionscadal neamhspleách é Flashbots a leathnaíonn cliaint reatha le seirbhís a ligeann do chuardaitheoirí idirbhearta MEV a chur faoi bhráid bhailitheoirí gan iad a nochtadh don mempool poiblí. Cuireann sé seo cosc ​​ar rith tosaigh ar idirbhearta ag reathaithe tosaigh ginearálaithe.

## Samplaí MEV {#mev-examples}

Tagann MEV chun cinn ar an blocshlabhra ar chúpla bealach.

### Arbatráiste DEX {#mev-examples-dex-arbitrage}

Is í an arbatráiste [Malartú díláraithe](/glossary/#dex) (DEX) an deis MEV is simplí agus is cáiliúla. Mar thoradh air sin, is é an ceann is iomaíche é freisin.

Feidhmíonn sé mar seo: má tá dhá DEX ag tairiscint chomhartha ar dhá phraghas dhifriúla, is féidir le duine an comhartha a cheannach ar an DEX ar phraghas níos ísle agus é a dhíol ar an DEX ar phraghas níos airde in aon idirbheart adamhach amháin. A bhuí le meicnic an blocshlabhra, is arbatráiste fíor, gan riosca é seo.

[Seo sampla](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) d’idirbheart brabúsach arbatráiste nuair a d’iompaigh cuardaitheoir 1,000 ETH go 1,045 ETH trí leas a bhaint as praghsáil dhifriúil ar an bpéire ETH/DAI ar Uniswap vs Sushiswap.

### Leachtuithe {#mev-examples-liquidations}

Tugann leachtuithe prótacail iasachtaithe deis MEV aitheanta eile.

Éilíonn prótacail iasachta cosúil le Maker agus Aave ar úsáideoirí roinnt comhthaobhachta a thaisceadh (m.sh. ETH). Úsáidtear an chomhthaobhacht taiscthe seo ansin chun iasachtaí a thabhairt d'úsáideoirí eile.

Is féidir le húsáideoirí sócmhainní agus comharthaí a fháil ar iasacht ó dhaoine eile ansin ag brath ar a bhfuil de dhíth orthu (m.sh. d’fhéadfá MKR a fháil ar iasacht más mian leat vótáil i dtogra rialachais MakerDAO) suas go céatadán áirithe dá gcomhthaobhacht taiscthe. Mar shampla, más é uasmhéid na hiasachta 30%, féadfaidh úsáideoir a thaisceann 100 DAI sa phrótacal suas le 30 DAI de shócmhainn eile a fháil ar iasacht. Cinneann an prótacal an céatadán cumhachta iasachtaithe beacht.

De réir mar a athraíonn luach comhthaobhachta iasachtaí, is amhlaidh a athraíonn a chumhacht iasachtaithe freisin. Más rud é, de bharr luaineachtaí sa mhargadh, go sáraíonn luach na sócmhainní a fuarthas ar iasacht, abair, 30% de luach a gcomhthaobhachta (arís, is é an prótacal a chinneann an céatadán beacht), ceadaíonn an prótacal de ghnáth d’aon duine an chomhthaobhacht a leachtú, ag íoc na n-iasachtóirí ar an toirt (tá sé seo cosúil leis an gcaoi a n-oibríonn [glaonna ar éarlais](https://www.investopedia.com/terms/m/margincall.asp) san airgeadas traidisiúnta). Má dhéantar é a leachtú, is gnách go mbíonn ar an iasachtaí táille mhór leachtaithe a íoc, agus téann cuid de chuig an leachtaitheoir - agus is é sin an áit a dtagann an deis MEV isteach.

Bíonn cuardaitheoirí in iomaíocht le sonraí blocshlabhra a pharsáil chomh tapa agus is féidir chun a chinneadh cé na hiasachtaithe is féidir a leachtú agus a bheith ar an gcéad duine a chuirfidh idirbheart leachtaithe isteach agus an táille leachtaithe a bhailiú dóibh féin.

### Trádála ceapaire {#mev-examples-sandwich-trading}

Is modh coitianta eile d'eastóscadh MEV é trádála ceapaire.

Le ceapaire a dhéanamh, beidh cuardaitheoir ag faire ar an mempool do thrádálacha móra DEX. Mar shampla, is dócha go bhfuil duine ag iarraidh 10,000 UNI a cheannach le DAI ar Uniswap. Beidh tionchar bríoch ag trádáil den mhéid seo ar an bpéire UNI/DAI, agus d’fhéadfadh go n-ardódh sé go mór praghas an UNI i gcomparáid le DAI.

Is féidir le cuardaitheoir éifeacht praghais na trádála móire seo ar an bpéire UNI/DAI a ríomh agus ordú ceannaigh optamach a rith láithreach _ roimh_ an trádáil mhór, ag ceannach UNI go saor, ansin ordú díola a rith láithreach _tar éis_ na trádála móire, é a dhíol ar an bpraghas níos airde s thiomsaigh an t-ordú mór.

Tá baol níos mó ag baint le ceapaire, áfach, toisc nach bhfuil sé adamhach (murab ionann agus arbatráiste DEX, mar a thuairiscítear thuas) agus go bhfuil seans maith ann go ndéanfar[ionsaí salmonella](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

Is feiniméan atá ag teacht chun cinn é MEV sa spás NFT, agus ní gá go mbeadh sé brabúsach.

Mar sin féin, ós rud é go dtarlaíonn idirbhearta NFT ar an blocshlabhra céanna arna roinnt ag gach idirbheart Ethereum eile, is féidir le cuardaitheoirí teicnící comhchosúla a úsáid agus iad siúd a úsáidtear i ndeiseanna traidisiúnta MEV sa mhargadh NFT freisin.

Mar shampla, má thiteann NFT coitianta agus má tá NFTanna ag teastáil ó chuardaitheoir nó sraith NFTanna áirithe, is féidir leis idirbheart a ríomhchlárú ionas gurb iad féin an chéad duine a cheannaíonn an NFT, nó is féidir leis an tsraith iomlán NFTanna a cheannach in aon idirbheart amháin. Nó má liostaítear NFT ar phraghas íseal de thaisme [, féadfaidh cuardaitheoir dul chun tosaigh ar cheannaitheoirí eile agus é a ghabháil ar phraghas saor](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent).

Tharla sampla suntasach amháin de NFT MEV nuair a chaith cuardaitheoir $7 milliún ar [gach Cryptopunk a cheannach ](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5)ar an bpraghas ba ísle. Mhínigh taighdeoir blocshlabhra [ar Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) conas a d’oibrigh an ceannaitheoir le soláthraí MEV chun a gceannach a choinneáil faoi rún.

### An t-eireaball fada {#mev-examples-long-tail}

Deiseanna MEV an-aitheanta is ea arbatráiste DEX, leachtuithe agus trádáil ceapairí agus ní dócha go mbeidh siad brabúsach do chuardaitheoirí nua. Mar sin féin, tá eireaball fada deiseanna MEV nach bhfuil mórán aithne orthu (d'fhéadfaí a mhaíomh gur deis amháin den sórt sin é NFT MEV).

Seans go mbeidh cuardaitheoirí atá díreach ag tosú amach in ann níos mó ratha a fháil ach cuardach a dhéanamh ar MEV san eireaball níos faide seo. Liostaíonn [clár poist MEV](https://github.com/flashbots/mev-job-board) de chuid Flashbot roinnt deiseanna atá ag teacht chun cinn.

## Éifeachtaí MEV {#effects-of-mev}

Níl MEV olc ar fad - tá iarmhairtí dearfacha agus diúltacha ag MEV ar Ethereum.

### An mhaith {#effects-of-mev-the-good}

Bíonn go leor tionscadal DeFi ag brath ar ghníomhaithe atá réasúnach go heacnamaíoch chun úsáideacht agus cobhsaíocht a bprótacal a chinntiú. Mar shampla, cinntíonn arbatráiste DEX go bhfaigheann úsáideoirí na praghsanna is fearr agus is cirte dá gcuid comharthaí, agus bíonn prótacail iasachtaithe ag brath ar leachtuithe gasta nuair a thiteann iasachtaithe faoi na cóimheasa comhthaobhachta chun a chinntiú go n-íoctar iasachtóirí ar ais.

Gan cuardaitheoirí réasúnacha atá ag lorg agus ag socrú neamhéifeachtachtaí eacnamaíocha agus ag baint leasa as dreasachtaí eacnamaíocha na bprótacal, d'fhéadfadh sé nach mbeadh prótacail DeFi agus dapps i gcoitinne chomh láidir agus atá siad inniu.

### An t-olc {#effects-of-mev-the-bad}

Ag an gciseal feidhmchlár, bíonn taithí níos measa ag úsáideoirí ar chineálacha áirithe MEV, cosúil le trádálacha ceapaire. Bíonn níos mó sciorrtha ar úsáideoirí atá faoi cheangal agus rith níos measa ar a dtrádáil.

Ag an gciseal líonra, is minic a bhíonn brú tráchta líonra agus praghsanna arda gáis mar thoradh ar reathaithe tosaigh ginearálaithe agus na ceantanna praghsanna gáis a mbíonn siad ag gabháil dóibh (nuair a bhíonn beirt reathaí tosaigh nó níos mó in iomaíocht lena n-idirbheart a áireamh sa chéad bhloc eile trí phraghas gáis a n-idirbheart féin a ardú de réir a chéile).

Thar a bhfuil ag tarlú _laistigh_ de bhlocanna, is féidir le MEV éifeachtaí díobhálacha a bheith aige _idir_ bloic. Má sháraíonn an MEV atá ar fáil i mbloc go suntasach an luach saothair caighdeánach bloc, féadfar bailíochtóirí a dhreasú chun bloic a atheagrú agus an MEV a ghabháil dóibh féin, rud a fhágann atheagrú blocshlabhra agus éagobhsaíocht chomhdhearcaidh.

Rinneadh iniúchadh ar an bhféidearthacht seo maidir le hatheagrú blocshlabhra [roimhe seo ar an Bitcoin blocshlabhra](https://dl.acm.org/doi/10.1145/2976749.2978408). Ós rud é go bhfuil leath luach saothair Bitcoin agus táillí idirbhirt mar chuid níos mó agus níos mó den luach saothair bloc, tagann cásanna chun cinn nuair a bhíonn sé réasúnach go heacnamaíoch do mhianadóirí luach saothair an chéad bhloic eile a thabhairt suas agus ina ionad sin bloic a chur i gcuimhne le táillí níos airde. Le fás MEV, d'fhéadfadh an cineál céanna cásanna tarlú i Ethereum, ag bagairt sláine an blocshlabhra.

## Staid MEV {#state-of-mev}

Tháinig borradh faoin eastóscadh MEV go luath in 2021, rud a d’fhág go raibh praghsanna gáis thar a bheith ard sa chéad chúpla mí den bhliain. Mar gheall ar theacht chun cinn sealaíochta MEV Flashbots tá laghdú tagtha ar éifeachtacht na reathaithe tosaigh ginearálaithe agus tá ceantanna praghais gáis tógtha as slabhra, ag ísliú praghsanna gáis do ghnáthúsáideoirí.

Cé go bhfuil go leor cuardaitheoirí fós ag déanamh airgid mhaith as MEV, de réir mar a aithnítear níos mó deiseanna agus go mbíonn níos mó cuardaitheoirí in iomaíocht le haghaidh an deis chéanna, gheobhaidh bailíochtóirí ioncam iomlán MEV níos mó agus níos mó (toisc go dtarlaíonn an cineál céanna ceantanna gáis mar a luadh thuas in Flashbots freisin, cé gur go príobháideach iad, agus gabhfaidh bailíochtóirí an t-ioncam gáis dá bharr). Níl MEV uathúil do Ethereum freisin, agus de réir mar a bhíonn níos mó iomaíocht deiseanna ar Ethereum, tá cuardaitheoirí ag bogadh go blocshlabhraí malartacha cosúil le Binance Smart Chain, áit a bhfuil deiseanna MEV cosúil leo siúd ar Ethereum le níos lú iomaíochta.

Ar an láimh eile, athraíonn an t-aistriú ó chruthúnas-oibre go cruthúnas-geallta agus an iarracht leanúnach chun scála Ethereum ag baint úsáide as rolladh suas uile an tírdhreach MEV ar bhealaí atá fós beagán doiléir. Ní fios go forleathan fós conas a athraítear dinimic an eastósctha MEV i gcomparáid leis an tsamhail dóchúlachta i gcruthúnas-oibre nó conas a chuirfear isteach air seo nuair a fheidhmítear [toghchán ceannaire rúnda amháin](https://ethresear.ch/t/secret-non-single-leader-election/11789) agus[teicneolaíocht bhailíochtaithe dáilte](/staking/dvt/). Mar an gcéanna, tá sé fós le feiceáil cad iad na deiseanna MEV atá ann nuair a dhéantar an chuid is mó de ghníomhaíocht úsáideoirí a aistriú ó Ethereum agus ar a rolladh suas agus a sceardanna ciseal 2.

## MEV i gCruthúnas-geallta (PoS) Ethereum {#mev-in-ethereum-proof-of-stake}

Mar atá mínithe, tá impleachtaí diúltacha ag MEV ar thaithí iomlán an úsáideora agus ar shlándáil ciseal comhthoil. Ach d’fhéadfadh rioscaí nua a bhaineann le MEV eascairt as aistriú Ethereum go comhdhearcadh cruthúnas-geallta (ar a dtugtar “An Cumasc”):

### Lárú bailíochtóirí {#validator-centralization}

In Ethereum iar-Cumaisc, tagann bailíochtóirí (tar éis taiscí slándála 32 ETH a dhéanamh) ar chomhdhearcadh maidir le bailíocht na mbloc a chuirtear leis an Slabhra Beacon. Ós rud é go bhféadfadh 32 ETH a bheith thar acmhainn ag go leor, d'fhéadfadh sé gur rogha níos indéanta é [dul isteach i linn gheallchuir](/staking/pools/). Mar sin féin, tá dáileadh sláintiúil [geallta aonair](/staking/solo/) oiriúnach, toisc go maolaíonn sé lárú na mbailíochtóirí agus go bhfeabhsaítear slándáil Ethereum.

Mar sin féin, creidtear go bhfuil eastóscadh MEV in ann lárú bailíochtóirí a luathú. Tá sé seo amhlaidh i bpáirt toisc, mar de réir mar a thuillleann bailíochtórí [níos lú ar bhlocanna molta](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) ná mar a rinne mianadóirí roimhe seo, go bhfuil tionchar mór ag eastóscadh MEV [ar thuillimh bhailíochtóra](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) ó tharla[An Cumasc](/roadmap/merge/).

Is dócha go mbeidh níos mó acmhainní ag linnte geallchuir chun infheistíocht a dhéanamh san optamú a bheadh riachtanach chun deiseanna MEV a ghabháil. Dá mhéad MEV a bhaintear as na linnte seo, is ea is mó acmhainní a bheidh acu chun a gcumas MEV-eastósctha a fheabhsú (agus ioncam iomlán a mhéadú), go bunúsach ag cruthú [eacnamaíochtaí scála](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Agus níos lú acmhainní ar fáil dóibh, d’fhéadfadh sé nach mbeadh geallsealbhóirí aonair in ann brabús a bhaint as deiseanna MEV. D’fhéadfadh sé seo cur leis an mbrú ar bhailíochtóirí neamhspleácha dul isteach i linnte gealltchuir chumhachtacha chun a dtuilleamh a mhéadú, rud a laghdódh dílárú in Ethereum.

### Mempools ceadaithe {#permissioned-mempools}

Mar fhreagra ar ionsaithe ceapaire agus tosaigh, féadfaidh trádálaithe tosú ar mhargaí as slabhra a dhéanamh le bailíochtóirí ar mhaithe le phríobháideachas idirbhirt. In ionad idirbheart féideartha MEV a sheoladh chuig an mempool poiblí, cuireann an trádálaí é go díreach chuig an mbailíochtóir, a chuimsíonn é i bloc agus a scoilteann brabúis leis an trádálaí.

Leagan níos mó den socrú seo is ea “linnte dorcha” agus feidhmíonn siad mar mempools nó linnte cheadaithe, rochtain-amháin atá oscailte d'úsáideoirí atá sásta táillí áirithe a íoc. Laghdódh an treocht seo neamhcheadaitheacht agus easpa muiníne Ethereum agus d’fhéadfadh sé an blocshlabhra a athrú go meicníocht “íoc le himirt” atá i bhfabhar an tairgeora is airde.

Chuirfeadh mempools ceadaithe dlús leis na rioscaí láraithe a bhfuil cur síos orthu sa roinn roimhe seo. Is dócha go mbainfidh linnte móra a bhfuil bailíochtóirí iolracha acu leas as príobháideacht idirbheart a thairiscint do thrádálaithe agus úsáideoirí, rud a mhéadóidh a n-ioncam MEV.

Is croíréimse taighde é dul i ngleic leis na fadhbanna seo a bhaineann le MEV in Ethereum iar-Chumaisc. Go dtí seo, is iad an dá réiteach atá molta chun tionchar diúltach MEV ar dhílárú agus slándáil Ethereum a laghdú tar éis an Chomhcheangail ná [**Deighilt Togra-Tógálaí (PBS)**](/roadmap/pbs/) agus an[**API Tógálaí**](https://github.com/ethereum/builder-specs).

### Scaradh Togra-Tógálaí {#proposer-builder-separation}

Sa dá cruthúnas-oibre agus cruthúnas-de-geallta, molann nód a thógann bloc é le cur leis an slabhra le nóid eile atá rannpháirteach sa chomhdhearcadh. Déantar cuid den slabhra canónach as bloc nua tar éis do mhianadóir eile tógáil ar a bharr (in PoW) nó faigheann sé fianuithe ó thromlach na mbailíochtóirí (in PoS).

Is é an meascán de róil táirgeoirí bloc agus moltóirí bloc a chruthaíonn an chuid is mó de na fadhbanna a bhaineann le MEV a thuairiscítear roimhe seo. Mar shampla, spreagtar nóid chomhdhearcaidh chun atheagrú slabhra a spreagadh in [ionsaithe meirleach ama](https://www.mev.wiki/attack-examples/time-bandit-attack) chun tuilleamh MEV a uasmhéadú.

[Tá Scaradh Togra-Tógálaí](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) deartha chun tionchar MEV a mhaolú, go háirithe ag an sraith comhdhearcaidh. Is é príomhghné PBS ná rialacha maidir le táirgeoirí bloc agus tairgeoirí bloc a scaradh. Tá bailíochtóirí fós freagrach as bloic a mholadh agus as vótáil, ach tá sé de chúram ar aicme nua sain-aonáin, ar a dtugtar **tógálaithe bloc**, idirbhearta agus bloic thógála a ordú.

Faoi PBS, cruthaíonn tógálaí bloic beart idirbhirt agus cuireann sé tairiscint chun é a áireamh i mbloc Slabhra Rabhcháin (mar an “pálasta reatha”). Seiceálann an bailíochtóir a roghnaíodh chun an chéad bhloc eile a mholadh na tairiscintí éagsúla agus roghnaíonn sé an beart leis an táille is airde. Go bunúsach cruthaíonn PBS margadh ceant, áit a ndéanann tógálaithe idirbheartaíocht le bailíochtóirí a dhíolann blocspás.

Úsáideann dearaí reatha PBS scéim [feidhmigh-nocht scéim](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) ina bhfoilsíonn tógálaithe gealltanas cripteagrafach d’inneachar an bhloic (ceanntásc bloc) mar aon lena dtairiscintí. Tar éis dó glacadh leis an tairiscint bhuaiteach, cruthaíonn an moltóir togra bloc sínithe a chuimsíonn an ceanntásc bloc. Táthar ag súil go bhfoilseoidh tógálaí na mbloc corp iomlán an bhloic tar éis dó an moladh bloc sínithe a fheiceáil, agus caithfidh sé go leor [fianuithe](/glossary/#attestation) a fháil ó bhailíochtórí freisin sula dtabharfar chun críche é.

#### Conas a mhaolaíonn scaradh idir mholtóirí agus tógálaí tionchar MEV? {#how-does-pbs-curb-mev-impact}

Laghdaíonn scaradh tairgeoir-tógálaí in-phrótacal éifeacht MEV ar chomhdhearcadh trí eastóscadh MEV a bhaint ó chuspóirí bailíochtóirí. Ina áit sin, gabhfaidh tógálaithe bloc a ritheann crua-earraí speisialaithe deiseanna MEV amach anseo.

Ní fhágann sé seo bailíochtóirí go hiomlán as an ioncam a bhaineann le MEV, áfach, toisc go gcaithfidh tógálaithe tairiscint ard a dhéanamh chun go nglacfaidh bailíochtóirí lena gcuid bloc. Mar sin féin, toisc nach bhfuil na bailíochtóirí dírithe go díreach ar ioncam MEV a bharrfheabhsú, laghdaítear bagairt na n-ionsaithe ropairí ama.

Laghdaítear rioscaí láraithe MEV freisin le scaradh idir mholtóirí agus tógálaí. Mar shampla, má úsáidtear scéim choitianta um nochtadh gealltanais, ní gá go mbeadh muinín ag tógálaithe as bailíochtóirí gan an deis MEV a ghoid nó gan é a nochtadh do thógálaithe eile. Íslíonn sé seo an bac atá ar gheallsealbhóirí aonair leas a bhaint as MEV, murach sin, bheadh ​​treocht ag tógálaithe i bhfabhar linnte móra a bhfuil iomrá as slabhra orthu agus ag déanamh margaí as slabhra leo.

Ar an gcaoi chéanna, ní gá do bhailíochtóirí muinín a bheith acu as tógálaithe gan bloc-chomhlachtaí a choinneáil siar nó bloic neamhbhailí a fhoilsiú toisc go bhfuil íocaíocht neamhchoinníollach. Próiseálann táille an bhailíochtóra fós fiú mura bhfuil an bloc molta ar fáil nó má dhearbhaíonn bailíochtóirí eile é a bheith neamhbhailí. Sa chás deiridh sin, caitear an bloc i leataobh go simplí, rud a chuireann iallach ar an tógálaí bloc gach táille idirbhirt agus ioncam MEV a chailleadh.

### Tógálaí API {#builder-api}

Cé go ngeallann scaradh idir moltóirí agus tógálaí go laghdófar éifeachtaí eastóscadh MEV, chun é a chur i bhfeidhm éilíonn sé athruithe ar an bprótacal comhdhearcaidh. Go sonrach, ba ghá an riail [rogha foirc](/developers/docs/consensus-mechanisms/pos/#fork-choice) ar an Slabhra Rabhcháin a nuashonrú. Is réiteach sealadach é an [ API Tógálaí](https://github.com/ethereum/builder-specs) atá dírithe ar fheidhmiú oibre deighilte idir moltóirí agus tógálaí a sholáthar, cé go bhfuil boinn tuisceana níos airde ag baint leis.

Is leagan modhnaithe é an Builder API den [Inneall API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) a úsáideann cliaint chiseal comhdhearcaidh chun ualaí reatha a iarraidh ó chliaint na sraithe reatha. Mar atá leagtha amach sa [sonraíocht bhailíochtóra macánta](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), iarrann bailíochtóirí a roghnaítear le haghaidh bloc a bheartaíonn dualgais beart idirbheart ó chliant reatha nasctha, a áiríonn siad sa bhloc Beacon Slabhra molta.

Feidhmíonn an Tógálaí API freisin mar earraí lár idir bailíochtóirí agus cliaint ciseal reatha; ach tá sé difriúil toisc go gceadaíonn sé do bhailíochtóirí ar an Slabhra Beacon bloic a fhoinsiú ó aonáin sheachtracha (in ionad bloc a thógáil go háitiúil ag baint úsáide as cliant reatha).

Seo thíos forbhreathnú ar conas a oibríonn an API Tógálaí:

1. Ceanglaíonn API Tógálaí an bailíochtóir le líonra de thógálaithe bloc a ritheann cliaint ciseal reatha. Cosúil le PBS, is páirtithe speisialaithe iad tógálaithe a infheistíonn i blocthógáil atá dian ar acmhainní agus a úsáideann straitéisí éagsúla chun ioncam a thuilltear ó leideanna tosaíochta MEV + a uasmhéadú.

2. Iarrann bailíochtóir (a ritheann cliant sraithe comhdhearcaidh) ualaí reatha mar aon le tairiscintí ón líonra tógálaithe. Áireofar i dtairiscintí ó thógálaithe an ceanntásc pálasta reatha—tiomantas cripteagrafach maidir le hinneachar an phálasta —agus táille le híoc leis an mbailíochtóir.

3. Déanann an bailíochtóir athbhreithniú ar na tairiscintí isteach agus roghnaíonn sé an pálasta reatha leis an táille is airde. Ag baint úsáide as an Tógálaí API, cruthaíonn an bailíochtóir togra bloc Beacon "dallta" nach n-áirítear ach a shíniú agus an ceanntásc pálasta reatha agus cuireann sé chuig an tógálaí é.

4. Táthar ag súil go bhfreagróidh an tógálaí atá ag rith an Tógálaí API leis an ualach iomlán reatha nuair a fheiceann sé an togra bloc dall. Ligeann sé seo don bhailíochtóir bloc Beacon "sínithe" a chruthú, a iomadaíonn siad ar fud an líonra.

5. Táthar ag súil fós go dtógfaidh bailíochtóir a úsáideann an Tógálaí API bloc go háitiúil ar eagla go dteipeann ar an tógálaí bloc freagra a thabhairt go pras, ionas nach gcaillfidh siad luach saothair bloc-togra. Mar sin féin, ní féidir leis an mbailíochtóir bloc eile a chruthú ag baint úsáide as na hidirbhearta atá nochta anois nó as sraith eile, mar gurb ionann é agus _coibhneas_ (ag síniú dhá bhloc laistigh den sliotán céanna), atá ina chion slaisitheach.

Sampla de chur i bhfeidhm API Tógálaí is ea [MEV Boost](https://github.com/flashbots/mev-boost), feabhsú ar an [ meicníocht ceant Flashbots](https://docs.flashbots.net/Flashbots-auction/overview/) atá deartha chun srian a chur le seachtrachtaí diúltacha MEV. Ligeann ceant Flashbots do bhailíochtóirí atá i mbun cruthúnais ar obair thógála bloic bhrabúsacha a sheachfhoinsiú chuig páirtithe speisialaithe ar a dtugtar **cuardaitheoirí**. ![Léaráid a thaispeánann an sreabhadh MEV go mion](./mev.png)

Bíonn cuardaitheoirí ag faire amach do dheiseanna brabúsacha MEV agus seolann siad cuacha idirbheart chun bac a chur ar mholtóirí mar aon le [tairiscint phraghas séalaithe](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) le cur san áireamh sa bhloc. Ní gá don bhailíochtóir atá ag rith mev-geth, ach leagan foirc den chliant go-ethereum (Geth) ach an beart leis an mbrabús is mó a roghnú agus é a áireamh mar chuid den bhloc nua. Chun bloc-thogróirí (bailíochtóirí) a chosaint ó thurscar agus ó idirbhearta neamhbhailí, téann beartáin idirbheart trí **athsheoltóirí** le haghaidh bailíochtaithe sula dtagann siad chuig an moltóir.

Coinníonn MEV Boost na hoibreacha céanna leis an gcéad cheant Flashbots, cé go bhfuil gnéithe nua deartha le haghaidh aistriú Ethereum go cruthúnas-geallta. Aimsíonn cuardaitheoirí idirbhearta brabúsacha MEV fós le cur san áireamh i mbloic, ach tá aicme nua sain-pháirtithe, ar a dtugtar **tógálaithe**, freagrach as idirbhearta agus cuacha a chomhiomlánú ina mbloic. Glacann tógálaí le tairiscintí ar phraghas séalaithe ó chuardaitheoirí agus reáchtálann sé optamuithe chun an t-ordú is brabúsaí a fháil.

Tá an t-athsheoltóir fós freagrach as cuacha idirbhirt a bhailíochtú sula gcuirtear ar aghaidh chuig an moltóir iad. Mar sin féin, tugann MEV Boost isteach **eascró** atá freagrach as [infhaighteacht sonraí](/developers/docs/data-availability/) a sholáthar trí bhloc-chomhlachtaí arna seoladh ag tógálaithe agus ceanntásca bloc arna seoladh ag bailíochtóirí a stóráil. Anseo, iarrann bailíochtóir atá ceangailte le sealaíochta na hualaí pálasta reatha atá ar fáil agus úsáideann sé algartam ordaithe MEV Boost chun an ceanntásc pálasta a roghnú leis an tairiscint is airde + leideanna MEV.

#### Conas a mhaolaíonn an Builder API tionchar MEV? {#how-does-builder-api-curb-mev-impact}

Is é an buntáiste lárnach a bhaineann leis an API Tógálaí ná an cumas atá aige rochtain ar dheiseanna MEV a dhaonlathú. Trí úsáid a bhaint as scéimeanna gealltanais, cuirtear deireadh le boinn tuisceana iontaobhais agus laghdaítear bacainní iontrála do bhailíochtóirí atá ag iarraidh leas a bhaint as MEV. Ba cheart go laghdódh sé seo an brú ar lucht geallchuir aonair comhtháthú le linnte geallchuir mhóra d’fhonn brabús MEV a mhéadú.

Spreagfaidh cur i bhfeidhm forleathan an API Tógálaí iomaíocht níos mó i measc tógálaithe bloc, rud a mhéadaíonn friotaíocht na cinsireachta. De réir mar a dhéanann bailíochtóirí athbhreithniú ar thairiscintí ó thógálaithe iolracha, caithfidh tógálaí a bhfuil sé ar intinn aige cinsireacht a dhéanamh ar idirbheart úsáideora amháin nó níos mó chun cosc ​​a chur ar gach tógálaí neamhchinsireachta eile chun a bheith rathúil. Méadaíonn sé seo go mór an costas a bhaineann le cinsireacht a dhéanamh ar úsáideoirí agus cuireann sé in aghaidh an chleachtais.

Úsáideann roinnt tionscadal, mar MEV Boost, an API Tógálaí mar chuid de struchtúr foriomlán atá deartha chun príobháideacht idirbheart a sholáthar do pháirtithe áirithe, mar thrádálaithe atá ag iarraidh ionsaithe tosaigh/ceapairí a sheachaint. Baintear é seo amach trí chainéal cumarsáide príobháideach a sholáthar idir úsáideoirí agus tógálaithe bloc. Murab ionann agus na mempools ceadaithe a thuairiscítear níos luaithe, tá an cur chuige seo tairbheach ar na cúiseanna seo a leanas:

1. Toisc go bhfuil il-thógálaithe ar an margadh níl sé praiticiúil an chinsireacht a dhéanamh, rud a théann chun sochair d'úsáideoirí. I gcodarsnacht leis sin, dá mbeadh linnte dorcha láraithe agus bunaithe ar iontaobhas ann, bhaileofaí cumhacht i lámha beagán tógálaithe bloc agus mhéadódh sé an fhéidearthacht cinsireachta.

2. Is foinse oscailte é bogearraí API Tógálaí, a ligeann do dhuine ar bith seirbhísí bloc-thógálaí a thairiscint. Ciallaíonn sé seo nach gcuirtear iallach ar úsáideoirí aon tógálaí bloc ar leith a úsáid agus feabhsaíonn sé neodracht agus neamhcheadaitheacht Ethereum. Ina theannta sin, ní chuirfidh trádálaithe atá ag lorg MEV leis an lárú trí úsáid a bhaint as bealaí idirbhearta príobháideacha.

## Acmhainní gaolmhara {#related-resources}

- [Doiciméid Flashbots](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) - _Deais agus taiscéalaí idirbheart beo le haghaidh idirbhearta MEV_
- [mevboost.org](https://www.mevboost.org/) - _Rianaire le staidreamh fíor-ama le haghaidh athsheachadáin MEV-Boost agus blocthógálaithe_

## Tuilleadh léitheoireachta {#further-reading}

- [Cad is Luach Inbhainte Mianóra (MEV) ann?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV agus Mise](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Is Foraois Dhorcha é Ethereum](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Éalú ó bhForaois Dhorcha](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Ag tabhairt aghaidh ar an nGéarchéim MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Snáitheanna MEV @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Ailtireacht Flashbots Cumasc-réidh](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Cad é MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Cén fáth mev-boost a reáchtáil?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Treoir an tSíobaire don Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
