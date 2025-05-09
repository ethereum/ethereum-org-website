---
title: In-chumthacht Conartha Cliste
description:
lang: ga
incomplete: true
---

## Réamhrá gearr {#a-brief-introduction}

Tá conarthaí cliste poiblí ar Ethereum agus is féidir smaoineamh orthu mar API oscailte. Ní gá duit do chonradh cliste féin a scríobh le bheith i d'fhorbróir dapp, ní gá duit ach fios a bheith agat conas idirghníomhú leo. Mar shampla, is féidir leat conarthaí cliste reatha [Uniswap](https://uniswap.exchange/swap), malartú díláraithe, a úsáid chun an loighic babhtála comharthaí ar fad i d’aip a láimhseáil – ní gá tosú ón tús. Féach ar chuid dá [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) agus [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) gconarthaí.

## Cad is In-chumthacht ann? {#what-is-composability}

Is éard is in-chumthacht ann ná comhpháirteanna ar leith a chur le chéile chun córais nua nó aschuir nua a chruthú. Agus bogearraí á bhforbairt, ciallaíonn in-chumthacht gur féidir le forbróirí comhpháirteanna bogearraí atá ann cheana a athúsáid chun feidhmchláir nua a thógáil. Bealach maith le hin-chumthacht a thuiscint is ea smaoineamh ar ghnéithe in-chumtha mar bhloic Lego. Is féidir gach bríce Lego a chomhcheangal le ceann eile, rud a ligeann duit struchtúir chasta a thógáil trí bhrící Lego éagsúla a chomhcheangal.

In Ethereum, is Lego de shaghas éigin é gach conradh cliste - is féidir leat conarthaí cliste ó thionscadail eile a úsáid mar bhloic thógála do do thionscadal. Ciallaíonn sé seo nach gá duit am a chaitheamh ag athchruthú an rotha nó ag tógáil ón tús.

## Conas a oibríonn in-chumthacht? {#how-does-composability-work}

Tá conarthaí cliste Ethereum cosúil le API poiblí, ionas gur féidir le duine ar bith idirghníomhú leis an gconradh nó iad a chomhtháthú i dapps le haghaidh feidhmiúlacht bhreise. Go ginearálta oibríonn in-chumthacht conartha cliste as trí phrionsabal: modúlacht, neamhspleáchas, agus infhaighteacht:

**1. Modúlacht**: Seo cumas na gcomhpháirteanna aonair tasc ar leith a dhéanamh. In Ethereum, tá cás úsáide ar leith ag gach conradh cliste (mar a léirítear i sampla Uniswap).

**2. Neamhspleáchas**: Ní mór go mbeadh comhpháirteanna in-chomhdhéanta in ann oibriú go neamhspleách. Tá gach conradh cliste in Ethereum féin-fhorghníomhaithe agus is féidir feidhmiú gan a bheith ag brath ar chodanna eile den chóras.

**3. Infhaighteacht**: Ní féidir le forbróirí glaoch ar chonarthaí seachtracha nó leabharlanna bogearraí a chomhtháthú le feidhmchláir mura bhfuil na cinn ar fáil go poiblí. Trí dhearadh, is foinse oscailte iad conarthaí cliste; is féidir le duine ar bith conradh cliste a ghlaoch nó forc bunachar cód a dhéanamh.

## Buntáistí in-chumthachta {#benefits-of-composability}

### Timthriall forbartha níos giorra {#shorter-development-cycle}

Laghdaíonn in-chumthacht an obair atá le déanamh ag forbróirí agus [dapps](/dapps/#what-are-dapps) á gcruthú. [Mar a deir Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Ciallaíonn foinse oscailte go gcaithfear gach fadhb a réiteach uair amháin."

Má tá conradh cliste ann a réitíonn fadhb amháin, is féidir le forbróirí eile é a athúsáid, ionas nach mbeidh orthu an fhadhb chéanna a réiteach. Ar an mbealach seo, is féidir le forbróirí leabharlanna bogearraí atá ann cheana féin a ghlacadh agus feidhmiúlacht bhreise a chur leis chun dapps nua a chruthú.

### Nuálaíocht níos mó {#greater-innovation}

Spreagann in-chumasacht nuálaíocht agus turgnamh toisc go bhfuil cead ag forbróirí cód foinse oscailte a athúsáid, a mhodhnú, a dhúbailt nó a chomhtháthú chun torthaí inmhianaithe a chruthú. Mar thoradh air sin, caitheann foirne forbartha níos lú ama ar fheidhmiúlacht bhunúsach agus is féidir leo níos mó ama a thabhairt do thástáil gnéithe nua.

### Taithí úsáideora níos fearr {#better-user-experience}

Feabhsaíonn idir-inoibritheacht idir comhpháirteanna den éiceachóras Ethereum taithí an úsáideora. Is féidir le húsáideoirí rochtain a fháil ar fheidhmiúlacht níos fearr nuair a chomhtháthaíonn dapps conarthaí cliste seachtracha ná mar atá in éiceachóras ilroinnte nach féidir le feidhmchláir cumarsáid a dhéanamh ann.

Úsáidfimid sampla ó thrádáil arbatráiste chun buntáistí idir-inoibritheachta a léiriú:

Má tá comhartha ag trádáil níos airde ar `mhalartán A` ná ar`mhalartán B`, is féidir leat leas a bhaint as an difríocht praghais chun brabús a dhéanamh. Ní féidir leat é sin a dhéanamh, áfach, ach amháin má tá go leor caipitil agat chun an t-idirbheart a mhaoiniú (i.e. an chomhartha a cheannach ó `mhalartán B` agus é a dhíol ar `mhalartán A`).

I gcás nach bhfuil go leor airgid agat chun an trádáil a chlúdach, d'fhéadfadh iasacht splaince a bheith oiriúnach. Tá [Iasachtaí splaince](/defi/#flash-loans) thar a bheith teicniúil, ach is é an bun-smaoineamh gur féidir leat sócmhainní a fháil ar iasacht (gan comhthaobhacht) agus iad a thabhairt ar ais laistigh de _idirbheart amháin_.

Ag dul ar ais chuig ár sampla tosaigh, is féidir le trádálaí arbatráiste iasacht mhór splaince a thógáil amach, comharthaí a cheannach ó `mhalartán B`, iad a dhíol ar `mhalartán A`, an caipiteal + ús a íoc ar ais, agus an brabús a choinneáil, laistigh den idirbheart céanna. Éilíonn an loighic chasta seo glaonna a chomhcheangal le conarthaí iolracha, rud nach bhféadfaí a dhéanamh dá mbeadh easpa idir-inoibritheachta i gconarthaí cliste.

## Samplaí den in-chumascacht in Ethereum {#composability-in-ethereum}

### Babhtálacha comharthaí {#token-swaps}

Má chruthaíonn tú dapp a éilíonn go n-íocfar idirbhearta in ETH, is féidir leat ligean d'úsáideoirí íoc i gcomharthaí ERC-20 eile trí loighic babhtála comharthaí a chomhtháthú. Tiontóidh an cód comhartha an úsáideora go ETH go huathoibríoch sula ndéanfaidh an conradh an fheidhm a dtugtar air a fhorghníomhú.

### Rialachas {#governance}

Is féidir leis a bheith costasach agus am-íditheach córais rialachais shaincheaptha a thógáil le haghaidh [DAO](/dao/). Ina áit sin, d'fhéadfá foireann uirlisí rialachais foinse oscailte a úsáid, mar [Aragon Client](https://client.aragon.org/), chun do DAO a bhrú chun creat rialachais a chruthú go tapa.

### Bainistíocht aitheantais {#identity-management}

In ionad córas fíordheimhnithe saincheaptha a thógáil nó a bheith ag brath ar sholáthraithe láraithe, is féidir leat uirlisí aitheantais díláraithe (DID) a chomhtháthú chun fíordheimhniú a bhainistiú d'úsáideoirí. Sampla is ea [SpruceID](https://www.spruceid.com/), foireann uirlisí foinse oscailte a thairgeann feidhmiúlacht "Sínigh isteach le Ethereum" a ligeann d'úsáideoirí féiniúlachtaí a fhíordheimhniú le sparán Ethereum.

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Cuir tús le forbairt d’éadanas dapp le create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _- Forbhreathnú ar conas create-eth-app a úsáid chun aipeanna a chruthú a bhfuil conarthaí cliste móréilimh orthu amach sa bhosca._

## Tuilleadh léitheoireachta {#further-reading}

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

- [Is ionann in-chumascacht agus Nuálaíocht](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Cén fáth a bhfuil In-chumascacht tábhachtach Do Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Cad is In-chumascacht ann?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
