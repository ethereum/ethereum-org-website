---
title: Cruthúnas-oibre (PoW)
description: Míniú ar an bprótacal comhdhearcaidh cruthúnas-oibre agus a ról i Ethereum.
lang: ga
---

Thosaigh líonra Ethereum trí leas a bhaint as meicníocht chomhdhearcaidh a raibh **[Cruthúnas-oibre (PoW)](/developers/docs/consensus-mechanisms/pow)** i gceist leis. Cheadaigh sé seo do nóid líonra Ethereum aontú ar staid na faisnéise go léir a taifeadadh ar an mblocshlabhra Ethereum agus chuir sé cosc ​​ar chineálacha áirithe ionsaithe eacnamaíocha. Ach mhúch Ethereum cruthúnas-oibre in 2022 agus thosaigh sé ag úsáid [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos) ina ionad sin.

<Alert variant="update">
<AlertEmoji text=":wave:" />
<AlertContent>
<AlertDescription>
    Tá an cruthúnas-oibre imithe i léig anois. Ní úsáideann Ethereum cruthúnas-oibre a thuilleadh mar chuid dá mheicníocht chomhdhearcaidh. Ina áit sin, úsáideann sé cruthúnas-gill. Léigh tuilleadh ar [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/) agus [geallchur](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar [idirbhearta](/developers/docs/transactions/) ar dtús, [bloic](/developers/docs/blocks/) a>, agus [meicníochtaí comhdhearcaidh](/developers/docs/consensus-mechanisms/).

## Cad é Cruthúnas-oibre (PoW)? {#what-is-pow}

Is é comhdhearcadh Nakamoto, a úsáideann cruthúnas-oibre, an mheicníocht a cheadaigh uair amháin don líonra díláraithe Ethereum teacht ar chomhdhearcadh (i.e., gach nód ar aon dearcadh) ar rudaí mar iarmhéideanna cuntais agus ord na n-idirbheart. Chuir sé seo cosc ​​​​ar úsáideoirí "caitheamh dúbailte" a dhéanamh ar a gcuid bonn a agus chinntigh sé go raibh sé thar a bheith deacair slabhra Ethereum a ionsaí nó a ionramháil. Tagann na hairíonna slándála seo anois ó cruthúnas-gill ag baint úsáide as an meicníocht chomhthoil ar a dtugtar [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Cruthúnas-oibre agus mianadóireacht {#pow-and-mining}

Is é cruthúnas-oibre an t-algartam bunúsach a leagann síos an deacracht agus na rialacha don obair a dhéanann mianadóirí ar bhlocshlabhra cruthúnas-oibre. Is í an mhianadóireacht féin an "obair". Is é an gníomh é bloic bhailí a chur leis an slabhra. Tá sé seo tábhachtach mar go gcabhraíonn fad an slabhra leis an líonra forc ceart an blocshlabhra a leanúint. Dá mhéad "oibre" a dhéantar, is amhlaidh is faide an slabhra, agus dá airde an uimhir bhloic, is amhlaidh is cinnte gur féidir leis an líonra a bheith maidir le staid reatha na rudaí.

[Níos mó ar mhianadóireacht](/developers/docs/consensus-mechanisms/pow/mining/)

## Conas a d'oibrigh cruthúnas-oibre Ethereum? {#how-it-works}

Déantar idirbhearta Ethereum a phróiseáil i mbloic. I gcruthúnas-oibre Ethereum atá dímheasta anois, bhí na nithe seo a leanas i ngach mbloc:

- deacracht bloic - mar shampla: 3,324,092,183,262,715
- mixHash - mar shampla: ` 0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – mar shampla: `0xd3ee432b4fb3d26b`

Bhain na sonraí bloc seo go díreach le cruthúnas-oibre.

### An obair i cruthúnas-oibre {#the-work}

D'éiligh an prótacal cruthúnas-oibre, Ethash, ar mhianadóirí dul trí rás dian trialach agus earráide chun an nonce a aimsiú le haghaidh bloic. Ní fhéadfaí ach bloic le nonce bailí a chur leis an slabhra.

Ag deifriú chun bloc a chruthú, chuir mianadóir tacar sonraí arís agus arís eile, nach bhféadfaí a fháil ach tríd an slabhra iomlán a íoslódáil agus a rith (mar a dhéanann mianadóir), trí fheidhm mhatamaitice. Baineadh úsáid as an tacar sonraí chun mixHash a ghiniúint faoi bhun sprice atá de réir deacracht an bhloic. Is trí thriail agus earráid is fearr é seo a dhéanamh.

Chinn an deacracht an sprioc don hais. Dá ísle an sprioc, is lú an tacar haiseanna bailí. Nuair a gineadh é, bhí sé seo thar a bheith éasca do mhianadóirí agus do chliaint eile é seo a fhíorú. Fiú dá n-athródh idirbheart amháin, bheadh ​​an hais go hiomlán difriúil, ag comharthaíocht calaoise.

Is furasta calaois a aimsiú le haiseáil. Ach bhí cruthúnas-oibre mar phróiseas ina bhac mór freisin ar ionsaí a dhéanamh ar an slabhra.

### Cruthúnas-oibre agus slándáil {#security}

Tugadh spreagadh do mhianadóirí an obair seo a dhéanamh ar phríomhshlabhra Ethereum. Ba bheag dreasacht a bhí ann d’fhothacar mianadóirí a slabhra féin a thosú—baineann sé an bonn den chóras. Tá blocshlabhraí ag brath ar staid amháin a bheith acu mar fhoinse fírinne.

Ba é cuspóir chruthúnas-oibre an slabhra a leathnú. Bhí an slabhra is faide inchreidte mar shlabhra bailí toisc go raibh an obair is mó ríomhaireachtúla déanta chun é a ghiniúint. Laistigh de chóras PoW Ethereum, bhí sé beagnach dodhéanta bloic nua a chruthú a scriosann idirbhearta, a chruthaíonn cinn fhalsa, nó a dhéanann cothabháil ar an dara slabhra. Sin toisc go mbeadh gá ag mianadóir mailíseach an bloc a réiteach i gcónaí níos tapúla ná gach duine eile.

Chun bloic go seasta atá mailíseach ach fós bailí, bheadh ​​níos mó ná 51% de chumhacht mianadóireachta an líonra ag teastáil ó mhianadóir mailíseach chun gach duine eile a shárú. Éilíonn an méid sin "oibre" go leor cumhachta ríomhaireachta costasach agus d'fhéadfadh an fuinneamh a chaitear fiú a bheith níos airde ná na gnóthachain a rinneadh in ionsaí.

### Eacnamaíocht chruthúnas-oibre {#economics}

Bhí cruthúnas-oibre freagrach freisin as airgeadra nua a eisiúint isteach sa chóras agus as mianadóirí a spreagadh chun an obair a dhéanamh.

Ón [uasghrádú Constantinople](/ethereum-forks/#constantinople), bronnadh dhá ETH úrnua agus cuid de na táillí idirbhirt ar na mianadóirí ar éirigh leo bloc a chruthú. Rinne bloic Ommer cúiteamh 1.75 ETH freisin. Ba bloic bhailí iad bloic Ommer a chruthaigh mianadóir beagnach ag an am céanna agus a chruthaigh mianadóir eile an bloc canónach, a cinneadh ar deireadh thiar ag cibé slabhra a tógadh sa mhullach ar an gcéad cheann. Tharla bloic Ommer de ghnáth mar gheall ar aga folaigh líonra.

## Críochnúlacht {#finality}

Tá "críochnaitheacht" ag idirbheart ar Ethereum nuair atá sé mar chuid de bhloc nach féidir a athrú.

Toisc gur oibrigh mianadóirí ar bhealach díláraithe, d'fhéadfaí dhá bhloc bhailí a mhianadóireacht ag an am céanna. Cruthaíonn sé seo forc sealadach. Faoi dheireadh, rinneadh slabhra glactha de cheann de na slabhraí seo tar éis mianadóireacht a dhéanamh ar na bloic ina dhiaidh sin agus iad a chur leis, rud a fhágann go bhfuil sé níos faide.

Chun rudaí a dhéanamh níos casta fós, d’fhéadfadh sé nach mbeadh idirbhearta a diúltaíodh ar an bhforc sealadach curtha san áireamh sa slabhra glactha. Ciallaíonn sé seo go bhféadfaí é a aisiompú. Mar sin tagraíonn críochnaitheacht don am ar cheart duit fanacht sula mbreithneoidh tú idirbheart do-aisiompaithe. Faoin chruthúnas-oibre Ethereum roimhe seo, dá mhéad bloc a baineadh de bhreis ar bhloc ar leith `N`, ba mhó an mhuinín a bhí ann gur éirigh le hidirbhearta `N` agus nach bhféadfaí iad a fhilleadh. Anois, le cruthúnas-gill, is airí follasach seachas dóchúlach é airí bhloic.

## Úsáid fuinnimh chruthúnas-oibre {#energy}

Cáineadh mór ar cruthúnas-oibre is ea an méid aschuir fuinnimh a theastaíonn chun an líonra a choinneáil sábháilte. Chun slándáil agus dílárú a chothabháil, chaith Ethereum ar chruthúnas-oibre an-chuid fuinnimh. Go gairid sular aistrigh siad go cruthúnais, bhí mianadóirí Ethereum ag caitheamh le chéile thart ar 70 TWh/bl (thart ar an oiread céanna le Poblacht na Seice - de réir [digiconomist](https://digiconomist.net/) ar an 18-Iúil-2022).

## Buntáistí agus míbhuntáistí {#pros-and-cons}

| Buntáistí                                                                                                                                                                                                                          | Míbhuntáistí                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tá cruthúnas-oibre neodrach. Níl ETH ag teastáil uait le tosú agus ligeann luach saothair bloc duit dul ó 0ETH go iarmhéid dhearfach. Le [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/) teastaíonn ETH uait ar dtús. | Úsáideann cruthúnas-oibre an oiread sin fuinnimh go bhfuil sé olc don chomhshaol.                                                                                                            |
| Meicníocht chomhdhearcaidh thriail sheanbhunaithe is ea cruthúnas-oibre a choinnigh Bitcoin agus Ethereum slán agus díláraithe le blianta fada anuas.                                                                              | Más mian leat tabhairt faoin mhianadóireacht, beidh trealamh chomh speisialaithe sin uait gur gá infheistíocht mhór le tosú.                                                                 |
| I gcomparáid le cruthúnas-gill tá sé sách éasca a chur i bhfeidhm.                                                                                                                                                                 | Mar gheall ar an ríomh méadaithe atá ag teastáil, d’fhéadfadh go mbeadh tionchar ag na linnte mianadóireachta ar an gcluiche mianadóireachta, rud a fhágfadh rioscaí láraithe agus slándála. |

## I gcomparáid le cruthúnas-gill {#compared-to-pos}

Ag leibhéal ard, tá an sprioc dheireanach chéanna ag cruthúnas-gill agus atá ag cruthúnas-oibre: cuidiú leis an líonra díláraithe teacht ar chomhdhearcadh go slán. Ach tá roinnt difríochtaí ann i bpróiseas agus pearsanra:

- Athraíonn cruthúnas-gill an tábhacht a bhaineann le cumhacht ríomhaireachtúil le haghaidh ETH geallta.
- Glacann bailíochtóirí ionad na mianadóirí mar chruthúnas-gill. Cuireann bailíochtóirí a ETH i ngeall chun an cumas bloic nua a chruthú a ghníomhachtú.
- Ní théann bailíochtóirí san iomaíocht chun bloic a chruthú, ina ionad sin is go randamach a roghnaíonn algartam iad.
- Tá críochnúlacht níos soiléire: ag seicphointí áirithe, má aontaíonn 2/3 bhailíochtóir ar staid an bhloic meastar é a bheith críochnaitheach. Ní mór do bhailíochtóirí a ngeall ar fad a ghealladh air seo, mar sin má dhéanann siad iarracht claonpháirteachas níos déanaí, caillfidh siad a ngeall ar fad.

[Tuilleadh faoi chruthúnas-gheallta](/developers/docs/consensus-mechanisms/pos/)

## An foghlaimeoir amhairc den chuid is mó tú? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Further Reading {#further-reading}

- [Ionsaí tromlaigh](https://en.bitcoin.it/wiki/Majority_attack)
- [Ar chríochnúlacht socraíochta](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Físeáin {#videos}

- [Míniú teicniúil ar phrótacail cruthúnas-oibre](https://youtu.be/9V1bipPkCTU)

## Ábhair Ghaolmhara {#related-topics}

- [Mianadóireacht](/developers/docs/consensus-mechanisms/pow/mining/)
- [Cruthúnas-de-geall](/developers/docs/consensus-mechanisms/pos/)
- [Cruthúnas-údaráis](/developers/docs/consensus-mechanisms/poa/)
