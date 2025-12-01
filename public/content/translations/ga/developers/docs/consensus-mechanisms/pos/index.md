---
title: Cruthúnas-gill (PoS)
description: Míniú ar an bprótacal comhdhearcadh cruthúnas-gill agus a ról in Ethereum.
lang: ga
---

Tá cruthúnas-gill i gceist (PoS) mar bhonn le [meicníocht chomhdhearcaidh](/developers/docs/consensus-mechanisms/) Ethereum. Chuir Ethereum a mheicníocht cruthúnas-gill ar siúl in 2022 toisc go bhfuil sé níos sláine, go n-ídíonn sé níos lú fuinnimh, agus níos fearr chun réitigh nua scálaithe a chur i bhfeidhm i gcomparáid leis an gceann roimhe seo [cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow).

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar [meicníochtaí comhdhearcaidh](/developers/docs/consensus-mechanisms/) ar dtús.

## Cad is cruthúnas-gill ann (PoS)? {#what-is-pos}

Is bealach é cruthúnas-gill lena chruthú gur chuir bailíochtóirí rud éigin luachmhar isteach sa líonra ar féidir é a scriosadh má ghníomhaíonn siad go mímhacánta. I gcruthúnas-gill Ethereum, cuireann bailíochtóirí caipiteal i bhfoirm ETH isteach i gconradh cliste ar Ethereum. Tá an bailíochtóir freagrach ansin as a sheiceáil go bhfuil bloic nua a iomadaítear thar an líonra bailí agus go gcruthaítear agus go iomadaítear bloic nua iad féin ó am go chéile. Má dhéanann siad iarracht calaois a dhéanamh ar an líonra (mar shampla trí bhlocanna iolracha a mholadh nuair ba chóir dóibh ceann a sheoladh nó fianuithe contrártha a sheoladh), is féidir cuid dá ETH geallta nó iad go léir a scrios.

## Bailitheoirí {#validators}

Chun páirt a ghlacadh mar bhaiíochtóir, ní mór d'úsáideoir 32 ETH a thaisceadh sa chonradh taisce agus trí phíosa bogearraí ar leith a reáchtáil: cliant reatha, cliant comhdhearcaidh agus cliant bailíochtóra. Nuair a thaisceann siad a ETH, téann an t-úsáideoir isteach i scuaine gníomhachtaithe a chuireann teorainn le ráta na mbailíochtóirí nua a théann isteach sa líonra. Nuair a bheidh siad gníomhachtaithe, faigheann bailíochtóirí bloic nua ó phiaraí ar líonra Ethereum. Déantar na hidirbhearta a sheachadtar sa bhloc a ath-rith chun a sheiceáil go bhfuil na hathruithe atá beartaithe ar staid Ethereum bailí, agus déantar an síniú bloc a sheiceáil. Ansin cuireann an bailíochtóir vóta (ar a dtugtar fianú) i bhfabhar an bhloc sin ar fud an líonra.

Faoin gcruthúnas-oibre, is í deacracht na mianadóireachta a chinneann uainiú na mbloc, ach faoin gcruthúnas-gill, tá an luas socraithe. Roinntear an t-am i cruthúnas-gill Ethereum i sliotáin (12 soicind) agus réanna (32 sliotán). Roghnaítear bailíochtóir amháin go randamach le bheith ina mholtóir bloic i ngach sliotán. Tá an bailíochtóir seo freagrach as bloc nua a chruthú agus as é a sheoladh chuig nóid eile ar an líonra. Chomh maith leis sin i ngach sliotán, roghnaítear coiste bailíochtóirí go randamach, agus úsáidtear a vótaí chun bailíocht an bhloic atá á mholadh a chinneadh. Tá sé tábhachtach an bailíochtóir a cuireadh ar bun a roinnt ar choistí chun an t-ualach líonra a choinneáil inbhainistithe. Roinneann coistí an tacar bailíochtóirí ionas go bhfianaítear gach bailíochtóir gníomhach i ngach tréimhse, ach ní i ngach sliotán.

## Conas a Ritear Idirbheart in Ethereum PoS {#transaction-execution-ethereum-pos}

Tugann an méid seo a leanas míniú ceann go ceann ar conas a dhéantar idirbheart a rith i cruthúnas-gill Ethereum.

1. Cruthaíonn agus síníonn úsáideoir [idirbheart](/developers/docs/transactions/) lena eochair phríobháideach. De ghnáth láimhseálann sparán nó leabharlann é seo mar [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) srl ach faoin gcochall tá iarratas á dhéanamh ag an úsáideoir chun nód a úsáideann an Ethereum [JSON-RPC API](/developers/docs/apis/json-rpc/). Sainmhíníonn an t-úsáideoir an méid gáis atá siad sásta a íoc mar leid do bhailíochtóir chun iad a spreagadh chun an t-idirbheart a áireamh i mbloc. Íoctar na [leideanna](/developers/docs/gas/#priority-fee) leis an bhailíochtóir agus dóitear an [ táille boinn](/developers/docs/gas/#base-fee).
2. Cuirtear an t-idirbheart faoi bhráid cliant reatha Ethereum [cliant reatha](/developers/docs/nodes-and-clients/#execution-client) a fhíoraíonn a bhailíocht. Ciallaíonn sé seo a chinntiú go bhfuil go leor ETH ag an seoltóir chun an t-idirbheart a chomhlíonadh agus go bhfuil sé sínithe acu leis an eochair cheart.
3. Má tá an t-idirbheart bailí, cuireann an cliant reatha é leis an mempool áitiúil (liosta na n-idirbheart ar feitheamh) agus craolann sé ciseal reatha freisin chuig nóid eile thar an líonra béadáin. Nuair a chloiseann nóid eile faoin idirbheart cuireann siad lena mempool áitiúil é freisin. Seans go staonfaidh úsáideoirí ardleibhéil óna n-idirbheart a chraoladh agus ina ionad sin é a chur ar aghaidh chuig tógálaithe bloc speisialaithe ar nós [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Ligeann sé seo dóibh na hidirbhearta a eagrú sna bloic atá le teacht ar mhaithe le brabús uasta ([MEV](/developers/docs/mev/#mev-extraction)).
4. Tá an moltóir bloic don sliotán reatha ar cheann de na nóid bhailíochtóirí ar an líonra tar éis dó a bheith roghnaithe go randamach roimhe seo le RANDAO. Tá an nód seo freagrach as an chéad bhloc eile a thógáil agus a chraoladh le cur leis an mblocshlabhra Ethereum agus an staid dhomhanda a nuashonrú. Tá an nód comhdhéanta de thrí chuid: cliant reatha, cliant comhdhearcaidh agus cliant bailíochtóra. Déanann an cliant reatha idirbhearta ón mempool áitiúil a bheartú go “pálasta reatha” agus déanann sé iad a rith go háitiúil chun athrú staide a ghiniúint. Cuirtear an t-eolas seo ar aghaidh chuig an gcliant comhdhearcaidh áit a bhfuil an pálasta reatha fillte mar chuid de "bhloic rabhcháin" ina bhfuil faisnéis freisin faoi luaíochtaí, pionóis, slaiseanna, fianuithe srl. a chuireann ar chumas an líonra aontú ar sheicheamh na mbloc ag ceann. an tslabhra. Déantar cur síos níos mine ar an gcumarsáid idir na cliaint reatha agus comhdhearcaidh i [Ceangail na gCliant Comhdhearcaidh agus Reatha](/developers/docs/networking-layer/#connecting-clients).
5. Faigheann nóid eile an bloc nua rabhchán ar an gciseal comhdhearcaidh trí líonra béadáin. Cuireann siad ar aghaidh chuig a gcliant reatha é nuair a dhéantar na hidirbhearta a athrith go háitiúil lena chinntiú go bhfuil an t-athrú staide atá beartaithe bailí. Deimhníonn an cliant bailíochtóra ansin go bhfuil an bloc bailí agus gurb é an chéad bhloc eile é ina dhearcadh ar an slabhra (rud a chiallaíonn go dtógann sé ar an slabhra leis an meáchan is mó fianuithe mar atá sainmhínithe sna [rialacha rogha forc](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Cuirtear an bloc leis an mbunachar sonraí áitiúil i ngach nód a fhianaíonn dó.
6. Is féidir an t-idirbheart a mheas mar "críochnaithe" má tá sé tagtha chun bheith ina chuid de shlabhra a bhfuil "nasc sár-mhóraimh" idir dhá sheicphointí. Tarlaíonn seicphointí ag tús gach ré agus tá siad ann chun cuntas a thabhairt ar an bhfíric nach bhfianaíonn ach fo-thacar de bhailíochtóirí gníomhacha i ngach sliotán, ach go bhfianaíonn gach bailíochtóir gníomhach thar gach ré. Mar sin, ní féidir ‘nasc sár-mhóraimh’ a léiriú ach idir a ré (seo nuair a aontaíonn 66% den ETH iomlán atá i ngeall ar an líonra ar dhá sheicphointí).

Is féidir tuilleadh sonraí maidir le críochnaitheacht a fháil thíos.

## Críochnúlacht {#finality}

Tá "críochnaitheacht" ag idirbheart i líonraí dáilte nuair a bhíonn sé mar chuid de bhloc nach féidir a athrú gan líon mór ETH a dhó. Maidir le Ethereum cruthúnas-gill, déantar é seo a bhainistiú ag baint úsáide as bloic "seicphointe". Is seicphointe é an chéad bhloc i ngach ré. Vótálann bailíochtóirí do phéire seicphointí a mheasann siad a bheith bailí. Má mheallann péire seicphointí vótaí a sheasann do dhá thrian ar a laghad den ETH iomlán atá i gceist, déantar na seicphointí a uasghrádú. Bíonn an ceann is déanaí den dá (sprioc) comhfhadaithe ansin. Tá an ceann is luaithe den dá cheann comhfhadaithe cheana toisc gurbh é an "sprioc" a bhí ann sa ré roimhe sin. Anois tá sé uasghrádaithe go "críochnaithe".

Chun bloc críochnaithe a thabhairt ar ais, bheadh ionsaitheoir tiomanta d'aon trian ar a laghad den soláthar iomlán ETH atá i gceist a chailleadh. Mínítear an chúis bheacht leis seo sa [blogphost de chuid Fhondúireacht Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality/) seo. Ós rud é go dteastaíonn tromlach dhá thrian le haghaidh críochnaitheacht, d'fhéadfadh ionsaitheoir cosc ​​a chur ar an líonra críochnaitheacht a bhaint amach trí vótáil le trian den ghealltanas iomlán. Tá meicníocht ann chun é seo a chosaint: an [sceitheadh ​​​​díomhaointis](https://eth2book.info/bellatrix/part2/incentives/inactivity). Gníomhaíonn sé seo nuair a theipeann ar an slabhra a thabhairt chun críche ar feadh níos mó ná ceithre ré. Fágann an sceitheadh ​​​​díomhaointis an ETH geallta ó bhailíochtóirí a vótáil i gcoinne an tromlaigh, rud a ligeann don tromlach dhá thrian a fháil ar ais agus an slabhra a thabhairt chun críche.

## Slándáil criptea-eacnamaíoch {#crypto-economic-security}

Is gealltanas é bailíochtóir a rith. Táthar ag súil go gcoimeádfaidh an bailíochtóir crua-earraí agus nascacht leordhóthanach chun páirt a ghlacadh i mbailíochtú bloc agus i dtogra. Mar chúiteamh, íoctar an bailíochtóir in ETH (méadaíonn a n-iarmhéid geallta). Ar an láimh eile, osclaíonn rannpháirtíocht mar bhailíochtóir bealaí nua freisin d'úsáideoirí chun ionsaí a dhéanamh ar an líonra ar mhaithe le gnóthachan pearsanta nó sabaitéireacht. Chun é seo a chosc, cailleann bailíochtóirí luach saothair ETH má theipeann orthu a bheith rannpháirteach nuair a iarrtar orthu, agus is féidir a ngeallta reatha a scrios má iompraíonn siad go mímhacánta. Is féidir a mheas go bhfuil dhá iompraíocht phríomha mímhacánta: bloic iolracha a mholadh i sliotán amháin (coibhéiseach) agus fianuithe contrártha a chur isteach.

Braitheann an méid ETH a shlaiseálfar ar cé mhéad bailíochtóirí atá á slaiseáil thart ar an am céanna freisin. ["pionós comhghaoil"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) a thugtar air seo, agus féadfaidh sé a bheith beag (~1% geallchur le haghaidh bailíochtóir amháin a laghdaíodh ina n-aonar) nó d'fhéadfadh sé 100% de sciar an bhailíochtóra a scriosadh (ollteagmhas slaiseála). Déantar é a fhorchur leath bealaigh trí thréimhse scoir éigin a thosaíonn le pionós láithreach (suas le 1 ETH) ar Lá 1, an pionós comhghaoil ​​ar Lá 18, agus ar deireadh, díshealbhú ón líonra ar Lá 36. Faigheann siad mionphionóis fianaithe gach lá toisc go bhfuil siad i láthair ar an líonra ach gan vótaí a chur isteach. Ciallaíonn sé seo go léir go mbeadh ionsaí comhordaithe an-chostasach don ionsaitheoir.

## Rogha foirc {#fork-choice}

Nuair a fheidhmíonn an líonra go barrmhaith agus go hionraic, níl ach bloc nua amháin ag ceann an tslabhra, agus fianaíonn gach bailíochtóir é. Mar sin féin, is féidir le tuairimí éagsúla a bheith ag bailíochtóirí tuairimí ar cheann an tslabhra mar gheall ar aga folaigh líonra nó toisc go bhfuil coibhéis ag moltóir bloic. Dá bhrí sin, éilíonn cliaint chomhdhearcaidh algartam chun cinneadh a dhéanamh ar an gceann is fearr leo. Tugtar [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) ar an algartam a úsáidtear in Ethereum cruthúnas-gill, agus oibríonn sé tríd an bhforc a bhfuil na fianuithe is mó ina stair.

## Cruthúnas-gill agus slándáil {#pos-and-security}

Tá bagairt [ionsaí 51%](https://www.investopedia.com/terms/1/51-attack.asp) fós ann ar an gcruthúnas-gill mar atá ar an gcruthúnas-oibre, ach tá sé níos baolaí fós do na hionsaitheoirí. Bheadh ​​51% den ETH geallta ag teastáil ó ionsaitheoir. Ansin d’fhéadfaidís a gcuid fianuithe féin a úsáid lena chinntiú gurbh é an forc ab fhearr leo an ceann a raibh na fianuithe ba charntha acu. Is é 'meáchan' na bhfianuithe carntha ná an méid a úsáideann cliaint chomhdhearcaidh chun an slabhra ceart a chinneadh, agus mar sin bheadh ​​an t-ionsaitheoir seo in ann forc canónach a dhéanamh dá fhorc féin. Mar sin féin, is é neart cruthúnas-gill i gcomparáid le cruthúnas-oibre ná go bhfuil solúbthacht ag an bpobal chun frith-ionsaí a dhéanamh. Mar shampla, d'fhéadfadh na bailíochtóirí macánta cinneadh a dhéanamh leanúint ar aghaidh ag tógáil ar an slabhra mionlaigh agus neamhaird a dhéanamh ar fhorc an ionsaitheora agus iad ag spreagadh aipeanna, malartuithe agus linnte chun an rud céanna a dhéanamh. D'fhéadfadh siad cinneadh a dhéanamh freisin an t-ionsaitheoir a bhaint den líonra go héigeantach agus a chuid geallta ETH a scriosadh. Is cosaintí láidre eacnamaíocha iad seo in aghaidh ionsaí 51%.

Thar ionsaithe 51%, d’fhéadfadh drochghníomhaithe tabhairt faoi chineálacha eile gníomhaíochtaí mailíseacha, mar shampla:

- ionsaithe fadraoin (cé go neodraíonn an ghiuirléid críochnaitheacht an veicteoir ionsaithe seo)
- 'atheagrú' gearr-raoin (cé go maolaítear é seo trí threisiú a dhéanamh ar spriocdhátaí fianaithe agus treisithe ag moltóirí)
- ionsaithe preabadh agus cothromaithe (arna mhaolú freisin le treisiú tairgeoirí, agus níor léiríodh na hionsaithe seo ach amháin faoi choinníollacha gréasáin idéalacha)
- ionsaithe maidhme (neodraithe ag riail na halgartaim rogha forc gan ach an teachtaireacht is déanaí a bhreithniú)

Tríd is tríd, tá sé léirithe go bhfuil cruthúnas-gill, mar a chuirtear i bhfeidhm é ar Ethereum, níos sláine ó thaobh na heacnamaíochta de ná cruthúnas-oibre.

## Buntáistí agus míbhuntáistí {#pros-and-cons}

| Buntáistí                                                                                                                                                                                                                                                     | Míbhuntáistí                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Is fusa do dhaoine aonair páirt a ghlacadh i ndaingniú an líonra, agus dílárú á chur chun cinn le geallchur. is féidir nód bailíochtóra a rith ar ghnáth-ríomhaire glúine. Ligeann linnte cruachta d'úsáideoirí geallchur a dhéanamh gan 32 ETH a bheith acu. | Tá cruthúnas-gill níos óige agus níos lú tástáil chatha déanta air i gcomparáid le cruthúnas-oibre     |
| Tá geallchur níos díláraithe. Ní feidhm le barainneacht scála ar an mbealach céanna is a bhíonn siad le mianadóireacht cruthúnas-oibre.                                                                                                                       | Tá sé níos casta cruthúnas-gill ar gheallchur a chur i bhfeidhm ná cruthúnas-oibre                     |
| Cuireann cruthúnas-gill slándáil criptea-eacnamaíoch níos fearr ar fáil ná cruthúnas-oibre                                                                                                                                                                    | Ní mór d'úsáideoirí trí phíosa bogearraí a reáchtáil chun páirt a ghlacadh i gcruthúnas-gill Ethereum. |
| Teastaíonn níos lú eisiúint ETH nua chun rannpháirtithe líonra a dhreasú                                                                                                                                                                                      |                                                                                                        |

### Comparáid le cruthúnas-oibre {#comparison-to-proof-of-work}

Bhain Ethereum úsáid as cruthúnas-oibre ar dtús ach d’aistrigh sé go cruthúnas-gill i Meán Fómhair 2022. Tugann PoS roinnt buntáistí thar cruthúnas-oibre, mar shampla:

- éifeachtúlacht fuinnimh níos fearr – ní gá go leor fuinnimh a úsáid ar ríomhanna cruthúnas-oibre
- bacainní níos ísle ar iontráil, ceanglais laghdaithe crua-earraí – ní gá go mbeadh crua-earraí den scoth ann chun seans a bheith ann bloic nua a chruthú
- riosca lárnaithe laghdaithe – ba cheart go mbeadh níos mó nóid ag daingniú an líonra mar thoradh ar an gcruthúnas-gill
- mar gheall ar an gceanglas ísealfhuinnimh is gá níos lú eisithe ETH chun rannpháirtíocht a spreagadh
- déanann pionóis eacnamaíocha as mí-iompar ionsaithe stíle 51% níos costasaí d’ionsaitheoir i gcomparáid le cruthúnas-oibre
- féadfaidh an pobal dul i muinín téarnamh sóisialta slabhra macánta dá ndéanfaí ionsaí 51% chun na cosaintí cripte-eacnamaíochta a shárú.

## Tuilleadh léitheoireachta {#further-reading}

- [Ceisteanna Coitianta Cruthúnas-Gilll](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Cad é Cruthúnas-Gill](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ ConsenSys_
- [Cad é Cruthúnas-Gill Agus Cén Fáth go bhfuil sé Tábhachtach](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Cén Fáth Cruthúnas Gill(Samhain 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _ Vitalik Buterin_
- [Cruthúnas-Gill: An Dóigh ar Fhoghlaim Mé Grá a Thabhairt do Shuibiachtúlacht Lag](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Ionsaí agus cosaint cruthúnas-gill Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [ Cruthúnas-Gill ar Fhealsúnacht Dearaidh](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Físeán: Míníonn Vitalik buterin cruthúnas-gill do Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Ábhair ghaolmhara {#related-topics}

- [Cruthúnas-ar-obair](/developers/docs/consensus-mechanisms/pow/)
- [Cruthúnas-údaráis](/developers/docs/consensus-mechanisms/poa/)
