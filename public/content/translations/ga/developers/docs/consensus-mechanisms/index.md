---
title: Meicníochtaí comhthola
description: Míniú ar phrótacail chomhdhearcaidh i gcórais dáilte agus an ról a imríonn siad in Ethereum.
lang: ga
---

Is minic a úsáidtear an téarma ‘meicníocht chomhdhearcaidhl’ chun tagairt a dhéanamh do phrótacail ‘cruthúnas-gill’, ‘cruthúnas-ar-obair’ nó ‘cruthúnas-ar-údarás’. Mar sin féin, níl iontu seo ach comhpháirteanna i meicníochtaí comhdhearcaidh a chosnaíonn in aghaidh [ionsaithe Sybil](/glossary/#sybil-attack). Is éard atá i meicníochtaí comhdhaercaidh an chairn iomlán de smaointe, prótacail agus dreasachtaí a chuireann ar chumas tacar dáilte nóid aontú ar staid bhlocshlabhra.

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit ár [réamhrá do Ethereum](/developers/docs/intro-to-ethereum/) a léamh ar dtús.

## Cad is comhdhearcadh ann? {#what-is-consensus}

Trí chomhdhearcadh is éard atá i gceist againn ná gur thángthas ar chomhaontú ginearálta. Smaoinigh ar ghrúpa daoine ag dul go dtí an phictiúrlann. Mura bhfuil aon easaontas ann maidir le rogha scannán atá beartaithe, baintear amach comhdhearcadh. Má bhíonn easaontas ann, ní mór go mbeadh acmhainn ag an ngrúpa cinneadh a dhéanamh maidir leis an scannán atá le feiceáil. I gcásanna tromchúiseacha, scoiltfidh an grúpa sa deireadh.

Maidir le blocshlabhra Ethereum, tá an próiseas foirmiúil, agus nuair a bhaintear comhdhearcadh amach ciallaíonn sé go n-aontaíonn ar a laghad 66% de na nóid ar an líonra ar staid domhanda an líonra.

## Cad is meicníocht chomhdhearcaidh ann? {#what-is-a-consensus-mechanism}

Tagraíonn an téarma meicníocht chomhtdhearcaidh don chairn iomlán de phrótacail, de dhreasachtaí agus de smaointe a ligeann do líonra nóid aontú ar staid bhlocshlabhra.

Úsáideann Ethereum meicníocht chomhdhearcaidh cruthúnas-gill a fhaigheann a shlándáil cripte-eacnamaíoch ó shraith luach saothair agus pionós a chuirtear i bhfeidhm ar chaipiteal atá faoi ghlas ag geallsealbhóirí. Spreagann an struchtúr dreasachta seo páirtithe leasmhara aonair chun bailíochtaithe macánta a oibriú, cuireann sé pionós orthu siúd nach ndéanann, agus cruthaíonn sé costas an-ard chun ionsaí a dhéanamh ar an líonra.

Ansin, tá prótacal ann a rialaíonn an chaoi a roghnaítear bailíochtaithe macánta chun bloic a mholadh nó a bhailíochtú, idirbhearta a phróiseáil agus vótáil ar son a dtuairimí ar cheann an tslabhra. Sna cásanna neamhchoitianta ina bhfuil bloic iolracha sa suíomh céanna in aice le ceann an tslabhra, tá meicníocht forc-rogha ann a roghnaíonn bloic a chomhdhéanann an slabhra ‘is troime’, arna thomhas de réir líon na mbailitheoirí a vótáil do na bloic ualaithe. de réir a n-iarmhéid éitear i gceist.

Tá tábhacht ag baint le roinnt coincheapa le comhdhearcadh nach bhfuil sainmhínithe go sainráite sa chód, amhail an tslándáil bhreise a thairgeann comhordú sóisialta féideartha lasmuigh den bhanda mar líne dheireanach cosanta in aghaidh ionsaithe ar an líonra.

Cruthaíonn na comhpháirteanna seo le chéile an mheicníocht chomhthoil.

## Cineálacha meicníochtaí comhdhearcaidh {#types-of-consensus-mechanisms}

### Cruthúnas-oibre bunaithe {#proof-of-work}

Cosúil le Bitcoin, d'úsáid Ethereum prótacal comhdhearcaidh bunaithe ar **cruthúnas-oibre (PoW)** uair amháin.

#### Cruthú bloic {#pow-block-creation}

Bíonn mianadóirí san iomaíocht chun bloic nua a chruthú a líonadh le hidirbhearta próiseáilte. Roinneann an buaiteoir an bloc nua leis an gcuid eile den líonra agus tuilleann sé roinnt ETH úrnua. Tá an rás buaite ag an ríomhaire atá in ann bhfreagra matamaitice a réiteach is tapúla. Táirgeann sé seo an nasc cripteagrafach idir an bloc reatha agus an bloc a chuaigh roimhe seo. Réitíonn an bhfreagra seo an obair i "cruthúnas-oibre". Socraítear an slabhra canónach ansin le riail forc-rogha a roghnaíonn an tacar bloic is mó a rinneadh chun iad a mhianadóireacht.

#### Slándáil {#pow-security}

Coinnítear an líonra slán toisc go mbeadh 51% de chumhacht ríomhaireachta an líonra ag teastáil uait chun calaois a dhéanamh ar an slabhra. Theastódh infheistíochtaí ollmhóra den sórt sin i dtrealamh agus i bhfuinneamh chuige seo; is dócha go gcaithfeá níos mó ná mar a gheobhfá.

Tuilleadh faoi [cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow/)

### Cruthúnas-gill bunaithe {#proof-of-stake}

Úsáideann Ethereum anois prótacal comhaontaithe atá bunaithe ar **cruthúnas-gill (PoS)**.

#### Cruthú bloic {#pos-block-creation}

Cruthaíonn bailíochtóirí bloic. Roghnaítear bailíochtóir amháin go randamach i ngach sliotán le bheith ina mholtóir bloc. Iarrann a gcliant comhdhearcaidh beart idirbheart mar 'ualach pálasta reatha' óna gcliant reatha péireáilte. Filleann siad é seo i sonraí comhdhearcaidh chun bloc a fhoirmiú, le seoladh chuig nóid eile ar líonra Ethereum. Tugtar luach saothair don táirgeadh bloc seo in ETH. I gcásanna neamhchoitianta nuair a bhíonn bloic iolracha féideartha ann do shliotán amháin, nó nuair a chloiseann nóid faoi bhloic ag amanna éagsúla, roghnaíonn an t-algartam rogha forc an bloc a fhoirmíonn an slabhra leis an meáchan is mó fianuithe (i gcás ina ndéantar an meáchan a fhianaíonn líon na mbailitheoirí de réir scála a n-iarmhéid ETH).

#### Slándáil {#pos-security}

Tá córas cruthúnas-gill slán cripte-eacnamaíoch toisc go gcaithfidh ionsaitheoir atá ag iarraidh smacht a fháil ar an slabhra méid ollmhór ETH a mhilleadh. Spreagann córas luach saothair gealltóirí aonair chun iad féin a iompar go hionraic, agus cuireann pionóis gealltóirí ó ghníomhú go mailíseach.

Tuilleadh faoi [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/)

### Treoir amhairc {#types-of-consensus-video}

Breathnaigh níos mó ar na cineálacha éagsúla meicníochtaí comhdhearcaidh a úsáidtear ar Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Friotaíocht Sybil & roghnú slabhra {#sybil-chain}

Ní prótacail chomhdhearcaidh iad cruthúnas-oibre agus cruthúnas-gill amháin, ach is minic a thagraítear dóibh amhlaidh ar mhaithe le simplíocht. Is meicníochtaí friotaíochta Sybil agus roghnóirí bloc-údar iad; is bealach iad chun cinneadh a dhéanamh cé hé údar an bhloic is déanaí. Comhpháirt thábhachtach eile is ea an t-algartam roghnúcháin slabhra (nó forc rogha) a chuireann ar chumas nóid bloc ceart amháin a phiocadh ag ceann an tslabhra i gcásanna ina bhfuil bloic iolracha sa suíomh céanna.

Tomhaiseann **friotaíocht Sybil** conas a éiríonn le prótacal in aghaidh ionsaí Sybil. Tá frithsheasmhacht in aghaidh ionsaí den chineál seo riachtanach le haghaidh blocshlabhra díláraithe agus cuireann sé ar chumas mianadóirí agus bailíochtóirí a luach saothair go cothrom a fháil bunaithe ar acmhainní a chuirtear isteach. Cosnaíonn cruthúnas-oibre agus cruthúnas-gill ina choinne seo trí chur ar úsáideoirí a lán fuinnimh a chaitheamh nó a lán comhthaobhachta a chur suas. Is bac eacnamaíoch iad na cosaintí seo ar ionsaithe Sybil.

Úsáidtear **riail roghnúcháin slabhraí** chun a chinneadh cé acu slabhra an slabhra "ceart". Úsáideann Bitcoin an riail "slabhra is faide", rud a chiallaíonn go mbeidh cibé blocshlabhra is faide an ceann a nglacfaidh an chuid eile de na nóid leis mar bhailí agus go n-oibreoidh siad leis. Maidir le slabhraí cruthúnas-oibre, déantar an slabhra is faide a chinneadh ag deacracht cruthúnas-oibre carnach iomlán an tslabhra. Bhain Ethereum úsáid as an riail slabhra is faide freisin; ach anois go bhfuil Ethereum ag feidhmiú ar cruthúnas-gill, ghlac sé algartam forc-rogha nuashonraithe a thomhaiseann 'meáchan' an tslabhra. Is é an t-ualú suim carntha na vótaí bailíochtaithe, arna ualú ag iarmhéideanna geallta-éitear an bhailíochtóra.

Úsáideann Ethereum meicníocht chomhdhearcaidh ar a dtugtar [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) a chomhcheanglaíonn [Casper FFG cruthúnas-gill](https://arxiv.org/abs/1710.09437) leis an [riail rogha forc-GHOST](https://arxiv.org/abs/2003.03052).

## Tuilleadh léitheoireachta {#further-reading}

- [Cad is Algartam Comhdhearcadh Blocshlabhra ann?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Cad é Comhdhearcadh Nakamoto? Treoir iomlán do thosaitheoirí](https://blockonomi.com/nakamoto-consensus/)
- [Conas a oibríonn Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Ar Shlándáil agus Feidhmíocht Blocshlabhraí Cruthúnas Oibre](https://eprint.iacr.org/2016/555.pdf)
- [Locht Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Ábhair ghaolmhara {#related-topics}

- [Cruthúnas-ar-obair](/developers/docs/consensus-mechanisms/pow/)
- [Mianadóireacht](/developers/docs/consensus-mechanisms/pow/mining/)
- [Cruthúnas-de-geall](/developers/docs/consensus-mechanisms/pos/)
- [Cruthúnas-údaráis](/developers/docs/consensus-mechanisms/poa/)
