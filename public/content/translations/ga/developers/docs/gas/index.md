---
title: Gás agus táillí
metaTitle: "Gás Ethereum agus táillí: forbhreathnú teicniúil"
description:
lang: ga
---

Tá gás riachtanach don líonra Ethereum. Is é an breosla a ligeann dó oibriú, ar an mbealach céanna a theastaíonn gásailín le carr a rith.

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh faoi [idirbhearta](/developers/docs/transactions/) agus an [EVM](/developers/docs/evm/).

## Cad is gás ann? {#what-is-gas}

Tagraíonn gás don aonad a thomhaiseann an méid iarracht ríomhaireachtúil a theastaíonn chun oibríochtaí sonracha a fhorghníomhú ar líonra Ethereum.

Ós rud é go n-éilíonn gach idirbheart Ethereum acmhainní ríomhaireachtúla le feidhmiú, ní mór íoc as na hacmhainní sin le cinntiú nach bhfuil Ethereum i mbaol turscair agus nach féidir é a bheith greamaithe i lúba ríomhaireachtúla éigríochta. Déantar íocaíocht ar ríomh i bhfoirm táille gáis.

Is é an táille gáis ná **an méid gáis a úsáidtear chun oibríocht éigin a dhéanamh, arna iolrú faoin gcostas in aghaidh an aonaid gháis**. Íoctar an táille is cuma má éiríonn le hidirbheart nó má theipeann air.

![Léaráid a thaispeánann cá bhfuil gás de dhíth in oibríochtaí EVM](./gas.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Ní mór táillí gáis a íoc in airgeadra dúchais Ethereum, éitear (ETH). De ghnáth luaitear praghsanna gáis i gwei, ar ainmníocht ETH é. Tá gach gwei cothrom le billiúnú ETH (0.000000001 ETH nó 10<sup>-9</sup> ETH).

Mar shampla, in ionad a rá go gcosnaíonn do ghás 0.000000001 éitear, is féidir leat a rá go gcosnaíonn do ghás 1 gwei.

Is crapadh é an focal 'gwei' ar 'giga-wei', rud a chiallaíonn 'billiún wei'. Tá gwei amháin cothrom le billiún wei. Is é an Wei féin (ainmnithe i ndiaidh [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), cruthaitheoir [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) an t-aonad is lú de ETH.

## Conas a ríomhtar táillí gáis? {#how-are-gas-fees-calculated}

Féadfaidh tú an méid gáis atá tú sásta a íoc a shocrú nuair a chuireann tú idirbheart faoi bhráid. Trí mhéid áirithe gáis a thairiscint, tá tú ag tairiscint go gcuirfear d’idirbheart san áireamh sa chéad bhloc eile. Má dtairgeann tú ró-bheagán, is lú an seans go roghnóidh bailíochtóirí d’idirbheart lena chur san áireamh, rud a chiallaíonn go bhféadfaí d’idirbheart a rith go déanach nó nach rithfear ar chor ar bith é. Má thairgeann tú an iomarca, d'fhéadfá roinnt ETH a chur amú. Mar sin, conas is féidir leat a rá cé mhéad atá le híoc?

Tá an gás iomlán a íocann tú roinnte ina dhá chomhpháirt: an `buntáille` agus an `táille tosaíochta` (leid).

Socraíonn an prótacal an `buntáille` - caithfidh tú an méid seo ar a laghad a íoc le go measfar go bhfuil d’idirbheart bailí. Is éard atá sa `táille tosaíochta` ná leid a chuireann tú leis an mbuntáille chun d’idirbheart a dhéanamh tarraingteach do bhailíochtóirí ionas go roghnaíonn siad é le cur san áireamh sa chéad bhloc eile.

Tá idirbheart nach n-íocann ach an `buntáille` bailí go teicniúil ach ní dócha go n-áireofar é toisc nach dtugann sé aon dreasacht do bhailíochtóirí é a roghnú thar aon idirbheart eile. Cinneann an úsáid líonra ag an am a sheolann tú d'idirbheart an táille 'ceart' `tosaíochta` - b'fhéidir go mbeidh ort do tháille `tosaíochta` a shocrú níos airde má tá a lán éilimh ann, ach nuair a bhíonn níos lú éilimh ann is féidir leat níos lú a íoc.

Mar shampla, abair go gcaithfidh Jordan 1 ETH a íoc le Taylor. Le haghaidh aistriú ETH 21,000 éilítear aonad gáis, agus is é 10 gwei an bonntáille. Áiríonn Jordan barr de 2 gwei.

Bheadh ​​an táille iomlán cothrom anois le:

`aonaid gháis a úsáideadh * (buntáille + táille tosaíochta)`

nuair is luach é an `buntáille` atá socraithe ag an bprótacal agus gur luach é an `táille tosaíochta` a shocraíonn an t-úsáideoir mar leid don bhailíochtóir.

i.e. `21,000* (10+2) = 252,000 gwei` (0.000252 ETH).

Nuair a sheolann Jordáin an t-airgead, asbhainfear 1.000252 ETH ó chuntas Jordan. Cuirfear 1.0000 ETH chun sochair Taylor. Faigheann an bailíochtóir an barr 0.000042 ETH. Dóitear an `buntáille` de 0.00021 ETH.

### Buntáille {#base-fee}

Tá buntáille ag gach bloc a fheidhmíonn mar phraghas cúltaca. Le bheith incháilithe lena áireamh i mbloc caithfidh an praghas tairgthe in aghaidh an gháis a bheith comhionann ar a laghad leis an mbuntáille. Ríomhtar an buntáille go neamhspleách ar an mbloc reatha agus ina ionad sin déantar é a chinneadh ag na bloic os a chomhair - rud a fhágann go bhfuil táillí idirbhirt níos intuartha d'úsáideoirí. Nuair a chruthaítear an bloc déantar an **buntáille seo a "dhó"**, rud a bhaineann den gcúrsaíocht é.

Ríomhtar an buntáille trí fhoirmle a dhéanann comparáid idir méid an bhloic roimhe seo (méid an gháis a úsáidtear le haghaidh na n-idirbheart go léir) agus an spriocmhéid. Méadóidh an buntáille d'uasmhéid 12.5% ​​in aghaidh an bhloc má sháraítear an spriocmhéid bloc. Mar gheall ar an bhfás easpónantúil seo níl sé inmharthana ó thaobh an gheilleagair de go bhfanfaidh méid na mbloc ard go deo.

| Bloc-uimhir | Gás san áireamh | Méadú Táille | Buntáille Reatha |
| ----------- | ---------------:| ------------:| ----------------:|
| 1           |             15M |           0% |         100 gwei |
| 2           |             30M |           0% |         100 gwei |
| 3           |             30M |        12.5% |       112.5 gwei |
| 4           |             30M |        12.5% |       126.6 gwei |
| 5           |             30M |        12.5% |       142.4 gwei |
| 6           |             30M |        12.5% |       160.2 gwei |
| 7           |             30M |        12.5% |       180.2 gwei |
| 8           |             30M |        12.5% |       202.7 gwei |

De réir an tábla thuas - chun idirbheart a chruthú ar bhloc uimhir 9, cuirfidh sparán in iúl don úsáideoir go cinnte gurb é an **buntáille uasta** atá le cur leis an gcéad bhloc eile `buntáille reatha * 112.5%` nó `202.7 gwei * 112.5% ​​= 228.1 gwei`.

Tá sé tábhachtach freisin a thabhairt faoi deara nach bhfuil sé dóchúil go bhfeicfimid borrtha fada de bhloic iomlána mar gheall ar an luas a mhéadaíonn an buntáille roimh bhloc iomlán.

| Bloc-uimhir | Gás san áireamh | Méadú Táille | Buntáille Reatha |
| ----------- | ---------------:| ------------:| ----------------:|
| 30          |             30M |        12.5% |      2705.6 gwei |
| ...         |             ... |        12.5% |              ... |
| 50          |             30M |        12.5% |     28531.3 gwei |
| ...         |             ... |        12.5% |              ... |
| 100         |             30M |        12.5% |  10302608.6 gwei |

### Táille tosaíochta (bairr) {#priority-fee}

Tugann an táille tosaíochta (barr) dreasacht do bhailíochtóirí idirbheart a áireamh sa bhloc. Gan bairr, bheadh ​​sé inmharthana go heacnamaíoch do bhailitheoirí bloic fholmha a mhianadóireacht, mar go bhfaighidís an luach saothair bloic céanna. Tugann séisíní beaga dreasacht íosta do bhailiíochtóirí idirbheart a áireamh. Chun go ndéanfaí idirbhearta a fheidhmiú mar thosaíocht ar idirbheart eile sa bhloc céanna, is féidir séisín níos airde a chur leis mar iarracht le tairiscint níos airde a dhéanamh ná na hidirbhearta iomaíocha.

### Táille uasta {#maxfee}

Chun idirbheart a fhorghníomhú ar an líonra, is féidir le húsáideoirí uasteorainn a shonrú a bhfuil siad sásta íoc as a n-idirbheart a fhorghníomhú. `maxFeePerGas` a thugtar ar an bparaiméadar roghnach seo. Chun idirbheart a chur i gcrích, ní mór an táille uasta a bheith níos airde ná suim na buntáille agus an barr. Aisíoctar leis an seoltóir idirbhirt an difríocht idir an táille uasta agus suim na buntáille agus an bhairr.

### Méid bloic {#block-size}

Tá spriocmhéid de 15 milliún gáis ag gach bloc, ach méadóidh nó laghdóidh méid na mbloc de réir éileamh an ghréasáin, suas go dtí an teorainn bloc de 30 milliún gáis (2x an spriocmhéid bloc). Baineann an prótacal méid cothromaíochta de 15 milliún ar an meán amach tríd an bpróiseas _tâtonnement_. Ciallaíonn sé seo má tá an méid bloic níos mó ná an méid bloc sprice, méadóidh an prótacal an buntáille don bhloc seo a leanann é. Ar an gcaoi chéanna, laghdóidh an prótacal an buntáille má tá an méid bloc níos lú ná an spriocmhéid bloic. Tá an méid a choigeartaítear an buntáille comhréireach le cé chomh fada agus atá an méid bloic reatha ón sprioc. [Tuilleadh maidir le bloic](/developers/docs/blocks/).

### Táillí gáis á ríomh go praiticiúil {#calculating-fees-in-practice}

Is féidir leat a rá go follasach cé mhéad atá tú sásta a íoc chun d’idirbheart a chur i gcrích. Mar sin féin, socróidh an chuid is mó de na soláthraithe sparán táille idirbhirt mholta go huathoibríoch (buntáille + táille tosaíochta molta) chun méid na castachta a chuirtear ar a n-úsáideoirí a laghdú.

## Cén fáth a bhfuil táillí gáis ann? {#why-do-gas-fees-exist}

I mbeagán focal, cabhraíonn táillí gáis le líonra Ethereum a choinneáil slán. Trí tháille a éileamh ar gach ríomh a dhéantar ar an líonra, cuirimid cosc ​​ar dhroch-aisteoirí an líonra a thurscar. D'fhonn lúba gan teorainn trí thaisme nó naimhdeach nó cur amú ríomhaireachtúil eile sa chód a sheachaint, ní mór do gach idirbheart teorainn a shocrú maidir le cé mhéad céimeanna ríomhaireachtúla um rith an chóid is féidir leis a úsáid. Is é "gás" an bunaonad ríomhaireachtúil.

Cé go bhfuil teorainn san áireamh in idirbheart, cuirtear aon ghás nach n-úsáidtear in idirbheart ar ais chuig an úsáideoir (i.e. aischuirtear `uas-táille - (buntáille + leid)`).

![Léaráid a thaispeánann conas a dhéantar gás neamhúsáidte a aisíoc](../transactions/gas-tx.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cad é an teorainn gháis? {#what-is-gas-limit}

Tagraíonn an teorainn gháis don mhéid uasta gáis atá tú sásta a thomhailt ar idirbheart. Tá níos mó oibre ríomhaireachta ag teastáil le haghaidh idirbhearta níos casta a bhaineann le [conarthaí cliste](/developers/docs/smart-contracts/), mar sin teastaíonn teorainn gháis níos airde uathu ná íocaíocht shimplí. Éilíonn aistriú caighdeánach ETH teorainn gháis de 21,000 aonad gáis.

Mar shampla, má chuireann tú teorainn gháis de 50,000 ar aistriú ETH simplí, ídíonn an EVM 21,000, agus gheobhaidh tú an 29,000 eile ar ais. Mar sin féin, má shonraíonn tú ró-bheagán gáis, mar shampla, teorainn gháis 20,000 le haghaidh aistriú ETH simplí, teipfidh an t-idirbheart le linn na céime bailíochtaithe. Diúltófar é sula n-áireofar é i mbloc, agus ní dhéanfar aon ghás a chaitheamh. Ar an láimh eile, má ritheann idirbheart as gás le linn a fhorghníomhaithe (m.sh., úsáideann conradh cliste an gás go léir leath bealaigh), déanfaidh an EVM aon athruithe a chur ar ais, ach déanfar an gás go léir a soláthraíodh a chaitheamh fós don obair a dhéantar.

## Cén fáth gur féidir le táillí gáis a bheith chomh hard sin? {#why-can-gas-fees-get-so-high}

Tá táillí gáis arda ann mar gheall ar an tóir atá ar Ethereum. Má tá an iomarca éilimh ann, ní mór d'úsáideoirí méideanna séisín níos airde a thairiscint chun iarracht a dhéanamh cosc ​​a chur ar idirbhearta úsáideoirí eile. Is féidir le séisín níos airde é a dhéanamh níos dóchúla go dtiocfaidh d'idirbheart isteach sa chéad bhloc eile. Chomh maith leis sin, d'fhéadfadh go mbeadh go leor oibríochtaí á ndéanamh ag aipeanna conartha cliste níos casta chun tacú lena bhfeidhmeanna, rud a fhágann go n-ídíonn siad go leor gáis.

## Tionscnaimh chun costais gháis a laghdú {#initiatives-to-reduce-gas-costs}

Ba cheart go dtabharfadh [uasghráduithe inscálaitheachta Ethereum](/roadmap/) aghaidh ar chuid de na saincheisteanna táillí gáis, rud a chuirfidh ar chumas an ardáin na mílte idirbheart in aghaidh an tsoicind a phróiseáil agus scála domhanda a dhéanamh.

Is tionscnamh príomhúil é scálú Sraith 2 chun costais gháis, taithí úsáideora agus inscálaitheacht a fheabhsú go mór. [Tuilleadh maidir le scálú ciseal 2](/developers/docs/scaling/#layer-2-scaling).

## Monatóireacht a dhéanamh ar tháillí gáis {#monitoring-gas-fees}

Más mian leat monatóireacht a dhéanamh ar phraghsanna gáis, ionas gur féidir leat do ETH a sheoladh níos saoire, is féidir leat go leor uirlisí éagsúla a úsáid mar:

- [Etherscan](https://etherscan.io/gastracker) _Meastachán ar phraghas an gháis idirbhirt_
- [Rianóir Gáis ETH](https://www.ethgastracker.com/) _Déan monatóireacht agus rianú ar phraghsanna gáis Ethereum, agus L2 chun táillí idirbhirt a laghdú agus airgead a shábháil_
- [ Meastóir Gáis Blocknative ETH](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _ Meastachán gáis Iarmhír Chrome a thacaíonn le hidirbhearta oidhreachta de Chineál 0 agus le hidirbhearta Cineál 2 EIP-1559._
- [Áireamh Táillí Gáis Cryptoneur](https://www.cryptoneur.xyz/gas-fees-calculator) _Ríomh táillí gáis i d'airgeadra áitiúil le haghaidh cineálacha difriúla idirbhirt ar Mainnet, Arbitrum, agus Polygon._

## Uirlisí gaolmhara {#related-tools}

- [Ardán Gáis Blocknative](https://www.blocknative.com/gas) _ API Meastacháin Gáis arna chumhachtú ag ardán sonraí mempool domhanda Blocknative_

## Tuilleadh léitheoireachta {#further-reading}

- [Gás Ethereum Mínithe](https://defiprime.com/gas)
- [Ídiú gáis do Chonarthaí Cliste a laghdú](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Cruthúnas Geallta in aghaidh Cruthúnas Oibre](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Straitéisí Optamaithe Gáis d'Fhorbróirí](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559 doiciméad](https://eips.ethereum.org/EIPS/eip-1559).
- [Acmhainní EIP-1559 Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Meicníochtaí a Scaradh ó Méimeanna](https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
