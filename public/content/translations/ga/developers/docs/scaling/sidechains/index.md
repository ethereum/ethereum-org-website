---
title: Taobhshlabhraí
description: Réamhrá ar taobhshlabhraí mar réiteach scálaithe atá in úsáid faoi láthair ag pobal Ethereum.
lang: ga
sidebarDepth: 3
---

Is blocshlabhra ar leith é taobhshlabhra a ritheann neamhspleách ar Ethereum agus atá ceangailte le Ethereum Príomhlíonra trí dhroichead dhá bhealach. Féadann paraiméadair bhloc ar leith agus [algartaim chomhdhearcaidh](/developers/docs/consensus-mechanisms/) a bheith ag taobhshlabhraí, a dearadh go minic chun idirbhearta a phróiseáil go héifeachtúil. Is éard atá i gceist le húsáid taobhshlabhra ná comhbhabhtáil, áfach, ós rud é nach n-oidhríonn siad airíonna slándála Ethereum. Murab ionann agus [réitigh scálaithe ciseal 2](/layer-2/), ní phostálann taobhshlabhraí athruithe staide agus sonraí idirbhirt ar ais chuig Ethereum Mainnet.

Géilleann taobhshlabhraí méid áirithe díláraithe nó slándála freisin chun tréchur ard a bhaint amach ([ inscálaitheacht trilemma](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Tá Ethereum tiomanta, áfach, do scálú a dhéanamh gan cur isteach ar dhílárú agus slándáil mar atá leagtha amach ina [ráiteas físe](/roadmap/vision/) le haghaidh uasghráduithe.

## Conas a oibríonn taobhshlabhraí? {#how-do-sidechains-work}

Is blocshlabhraí neamhspleácha iad taobhshlabhraí, le stair éagsúil, léarscáileanna forbartha agus gnéithe dearaidh. Cé go bhféadfadh taobhshlabhra roinnt cosúlachtaí ar leibhéal an dromchla a roinnt le Ethereum, tá roinnt gnéithe sainiúla aige.

### Algartaim chomhdhearcaidh {#consensus-algorithms}

Ceann de na cáilíochtaí a dhéanann taobhshlabhraí uathúil (i.e., difriúil ó Ethereum) is ea an t-algartam comhdhearcaidh a úsáidtear. Ní bhíonn taobhshlabhraí ag brath ar Ethereum le haghaidh comhdhearcaidh agus is féidir leo prótacail chomhdhearcaidh eile a roghnú a oireann dá gcuid riachtanas. I measc roinnt samplaí d'algartaim chomhdhearcaidh a úsáidtear ar taobhshlabhraí tá:

- [Cruthúnas-údaráis](/developers/docs/consensus-mechanisms/poa/)
- [Cruthúnas-gill tramligthe](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Lamháltas lochtanna Biosántach](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Cosúil le Ethereum, tá nóid bailíochtaithe ag taobhshlabhraí a fhíoraíonn agus a phróiseálann idirbhearta, a tháirgeann bloic, agus a stórálann staid an blocshlabhra. Tá bailíochtóirí freagrach freisin as comhdhearcadh a choinneáil ar fud an líonra agus as é a dhaingniú in aghaidh ionsaithe mailíseacha.

#### Paraiméadair bhloc {#block-parameters}

Cuireann Ethereum teorainneacha ar [bloc-amanna](/developers/docs/blocks/#block-time) (i.e., an t-am a thógann sé bloic nua a tháirgeadh) agus [méid na mbloc](/developers/docs/blocks/#block-size) (i.e., an méid sonraí atá in aghaidh an bhloic ainmnithe i ngás). Os a choinne sin, is minic a ghlacann taobhshlabhraí paraiméadair éagsúla, mar shampla amanna bloic níos tapúla agus teorainneacha gáis níos airde, chun tréchur ard, idirbhearta tapa, agus táillí íseal a bhaint amach.

Cé go bhfuil roinnt buntáistí ag baint leis seo, tá impleachtaí ríthábhachtacha aige do dhílárú agus slándáil líonra. Méadaíonn paraiméadair bhloc, cosúil le hamanna bloc tapa agus méideanna móra bloc, an deacracht a bhaineann le nód iomlán a rith - rud a fhágann go bhfuil roinnt "sár nóid" freagrach as an slabhra a dhaingniú. I gcás den sórt sin, méadaítear an fhéidearthacht go mbeidh claonpháirteachas ag an bhailíochtóir nó go ndéanfaí an slabhra a thabhairt ar láimh go mailíseach.

Chun blocshlabhra a scálú gan dochar a dhéanamh don dílárú, ní mór reáchtáil nóid a bheith oscailte do gach duine - níl gá ag páirtithe le crua-earraí speisialaithe. Sin é an fáth go bhfuil iarrachtaí ar bun lena chinntiú gur féidir le gach duine [nód iomlán a rith](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) ar líonra Ethereum.

### Comhoiriúnacht EVM {#evm-compatibility}

Tá roinnt taobhshlabhraí comhoiriúnach le EVM agus tá siad in ann conarthaí a forbraíodh don [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm/) a rith. Tacaíonn taobhshlabhraí atá comhoiriúnach le EVM le conarthaí cliste [scríofa i Solidity](/developers/docs/smart-contracts/languages/), chomh maith le teangacha conartha cliste eile EVM, rud a chiallaíonn go n-oibreoidh conarthaí cliste scríofa do Ethereum Mainnet ar thaobhshlabhraí atá comhoiriúnach le EVM freisin.

Ciallaíonn sé seo más mian leat do [dapp](/developers/docs/dapps/) a úsáid ar thaobhshlabhra, níl le déanamh ach do [chonradh cliste](/developers/docs/smart-contracts/) a imscaradh chuig an taobhshlabhra seo. Breathnaíonn sé, mothaíonn, agus gníomhaíonn sé díreach cosúil le Mainnet - scríobhann tú conarthaí i Solidity, agus idirghníomhaíonn tú leis an slabhra tríd na taobhshlabhraí RPC.

Toisc go bhfuil taobhshlabhraí comhoiriúnach le EVM, meastar gur [réiteach scálaithe](/developers/docs/scaling/) úsáideach iad le haghaidh dapps dúchasacha Ethereum. Le do dapp ar thaobhshlabhra, is féidir le húsáideoirí taitneamh a bhaint as táillí gáis níos ísle agus idirbhearta níos tapúla, go háirithe má tá brú tráchta ar Mainnet.

Mar sin féin, mar a míníodh roimhe seo, tá comhbhabhtáil shuntasach i gceist le húsáid taobhshlabhra. Tá gach taobhshlabhra freagrach as a shlándáil féin agus ní fhaigheann sé oidhreacht maoine slándála Ethereum. Méadaíonn sé seo an fhéidearthacht iompar mailíseach a d’fhéadfadh dul i bhfeidhm ar d’úsáideoirí nó a gcuid cistí a chur i mbaol.

### Gluaiseacht sócmhainní {#asset-movement}

Chun gur féidir le blocshlabhra ar leith a bheith ina thaobhshlabhra go Ethereum Mainnet ní mór dó an cumas chun aistriú sócmhainní ó agus go Ethereum Mainnet a éascú. Baintear an idir-inoibritheacht seo amach le Ethereum le droichead blocshlabhra. Úsáideann [Droichid](/bridges/) conarthaí cliste arna n-imscaradh ar Ethereum Mainnet agus taobhshlabhra chun idirlinne cistí eatarthu a rialú.

Cé go gcabhraíonn droichid le húsáideoirí cistí a aistriú idir Ethereum agus an taobhshlabhra, ní bhogtar na sócmhainní go fisiciúil thar an dá slabhraí. Ina áit sin, úsáidtear meicníochtaí lena mbaineann bualadh agus dó de ghnáth chun luach a aistriú thar slabhraí. Tuilleadh faoi [conas a oibríonn droichid](/developers/docs/bridges/#how-do-bridges-work).

## Buntáistí agus míbhuntáistí taobhshlabhraí {#pros-and-cons-of-sidechains}

| Buntáistí                                                                                                                                                | Míbhuntáistí                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tá an teicneolaíocht atá mar bhonn agus mar thaca ag taobhshlabhraí seanbhunaithe agus baineann sí leas as taighde fairsing agus feabhsuithe sa dearadh. | Géilleann taobhshlabhraí méid éigin díláraithe agus easpa muiníne ar mhaithe le hinscálaitheacht.                                                      |
| Tacaíonn taobhshlabhraí le ríomh ginearálta agus cuireann siad comhoiriúnacht EVM ar fáil (is féidir leo dapps Ethereum-dúchais a reáchtáil).            | Úsáideann taobhshlabhra meicníocht chomhdhearcaidh ar leith agus ní bhaineann sé leas as ráthaíochtaí slándála Ethereum.                               |
| Úsáideann taobhshlabhraí samhlacha comhdhearcaidh éagsúla chun idirbhearta a phróiseáil go héifeachtach agus táillí idirbheart a ísliú d'úsáideoirí.     | Teastaíonn boinn tuisceana iontaobhais níos airde ó thaobhshlabhraí (m.sh., is féidir le bailíochtóirí taobhshlabhraí mailíseacha calaois a dhéanamh). |
| Ceadaíonn taobhshlabhraí atá comhoiriúnach le EVM do dapps a n-éiceachóras a leathnú.                                                                    |                                                                                                                                                        |

### Úsáid Taobhshlabhraí {#use-sidechains}

Soláthraíonn tionscadail iolracha feidhmiúcháin taobhshlabhraí ar féidir leat a chomhtháthú i do dapps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Slabhra Gnosis (xDai roimhe seo)](https://www.gnosischain.com/)
- [Líonra Loom](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Tuilleadh léitheoireachta {#further-reading}

- [Dapps Ethereum a scálú trí Thaobhshlabhraí](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _ 8 Feabhra, 2018 - Georgios Konstantopoulos_

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
