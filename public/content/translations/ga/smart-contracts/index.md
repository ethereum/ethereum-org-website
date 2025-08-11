---
title: Conarthaí cliste
metaTitle: "Conarthaí cliste: Cad atá iontú agus céard iad na buntáistí"
description: Réamhrá neamhtheicniúil ar chonarthaí cliste
lang: ga
---

# Inteoir maidir le conarthaí cliste {#introduction-to-smart-contracts}

<div className="mt-4">
<ListenToPlayer slug="/smart-contracts/" />
</div>

Is iad conarthaí cliste na bloic tógála bhunúsacha de chiseal fheidhmchláir Ethereum. Is ríomhchláir iad atá stóráilte ar an [mblocshlabhra](/glossary/#blockchain) a leanann an loighic "más fíor sin, déan seo" agus ráthaítear go bhforghníomhóidh siad de réir na rialacha atá sainithe ina gcód, rud nach féidir a athrú i ndiaidh a chruthaithe.

Chum Nick Szabo an téarma "conradh cliste". I 1994, scríobh sé [réamhrá ar an gcoincheap](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), agus i 1996 scríobh sé [iniúchadh ar cad is féidir le conarthaí cliste a dhéanamh](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Shamhlaigh Szabo margadh digiteach ina gcuireann próisis uathoibríocha, [slán go cripteagrafach](/glossary/#cryptography) ar chumas idirbhearta agus feidhmeanna gnó tarlú gan idirghabhálaithe iontaofa. Chuir conarthaí cliste ar Ethereum an fhís seo i bhfeidhm.

Míníonn Watch Finematics conarthaí cliste:

<YouTube id="pWGLtjG-F5c" />

## Iontaobhas i gconarthaí traidisiúnta {#trust-and-contracts}

Ceann de na fadhbanna is mó a bhaineann le conradh traidisiúnta ná an gá atá le daoine aonair a gcuireann daoine eile muinín iontu leanúint ar aghaidh le torthaí an chonartha.

Seo sampla:

Tá rás rothar ar siúl ag Alice agus Bob. Deirimis go ngeallann Alice $10 do Bob go mbeidh an bua aici sa rás. Tá Bob muiníneach gurb é féin a bheidh mar bhuaiteoir agus aontaíonn sé leis an ngeall. Sa deireadh, críochnaíonn Alice an rás go maith chun tosaigh ar Bob agus níl aon amhras ach gurb ise an buaiteoir. Ach diúltaíonn Bob a íoc as an ngeall, agus deir sé go ndearna Alice caimiléireacht air.

Léiríonn an sampla amaideach seo an fhadhb le haon chomhaontú neamhchliste. Fiú má shásaítear coinníollacha an chomhaontaithe (i.e. is tusa buaiteoir an rása), ní mór duit muinín a bheith agat as duine eile fós chun an comhaontú a chomhlíonadh (i.e. íocaíocht a dhéanamh ar an ngeall).

## Meaisín díola digiteach {#vending-machine}

Meafar simplí do chonradh cliste is ea meaisín díola, a oibríonn beagán cosúil le conradh cliste - tá aschuir réamhchinnte mar thoradh ar ionchuir shonracha.

- Roghnaíonn tú táirge
- Taispeánann an meaisín díola an praghas
- Íocann tú an praghas
- Fíoraíonn an meaisín díola gur íoc tú an méid ceart
- Tugann an meaisín díola d'earra duit

Ní dhéanfaidh an meaisín díola an táirge atá uait a dháileadh ach amháin tar éis na ceanglais go léir a chomhlíonadh. Mura roghnaíonn tú táirge nó mura gcuireann tú isteach go leor airgid, ní thabharfaidh an meaisín díola amach do tháirge.

## Forghníomhú uathoibríoch {#automation}

Is é an príomhbhuntáiste a bhaineann le conradh cliste ná go ndéanann sé cód gan athbhrí a fhorghníomhú go cinntitheach nuair a chomhlíontar coinníollacha áirithe. Ní gá fanacht leis an duine an toradh a léirmhíniú nó a idirbheartú. Cuireann sé sin deireadh leis an ngá atá le hidirghabhálaithe iontaofa.

Mar shampla, d'fhéadfá conradh cliste a scríobh a shealbhaíonn cistí in Escrow do leanbh, rud a ligeann dóibh cistí a aistarraingt tar éis dáta ar leith. Má dhéanann siad iarracht tarraingt siar roimh an dáta sin, ní fhorghníomhófar an conradh cliste. Nó d’fhéadfá conradh a scríobh a thugann leagan digiteach de theideal an chairr duit go huathoibríoch nuair a íocann tú an déileálaí.

## Torthaí intuartha {#predictability}

Tá conarthaí traidisiúnta débhríoch toisc go mbraitheann siad ar dhaoine chun iad a léirmhíniú agus a chur i bhfeidhm. Mar shampla, d’fhéadfadh beirt bhreithiúna léirmhíniú difriúil a dhéanamh ar chonradh, rud a d’fhéadfadh cinntí neamh‑chomhsheasmhacha agus torthaí éagothroma a bheith mar thoradh air. Cuireann conarthaí cliste deireadh leis an bhféidearthacht sin. Ina áit sin, déantar conarthaí cliste a fhorghníomhú go beacht bunaithe ar na coinníollacha atá scríofa laistigh de chód an chonartha. Ciallaíonn an cruinneas seo, i bhfianaise na gcúinsí céanna, go mbeidh an toradh céanna ag an gconradh cliste.

## Taifead poiblí {#public-record}

Tá conarthaí cliste úsáideach le haghaidh iniúchtaí agus rianaithe. Ós rud é go bhfuil conarthaí cliste Ethereum ar bhlocshlabhra poiblí, is féidir le duine ar bith aistrithe sócmhainní agus faisnéis ghaolmhar eile a rianú láithreach. Mar shampla, is féidir leat seiceáil le feiceáil gur sheol duine éigin airgead chuig do sheoladh.

## Cosaint phríobháideachta {#privacy-protection}

Le conarthaí cliste tugtar cosaint do do phríobháideachas freisin. Ós rud é gur líonra a bhfuil ainm cleite aige é Ethereum (tá d’idirbhearta ceangailte go poiblí le seoladh cripteagrafach uathúil, ní le do chéannacht), is féidir leat do phríobháideachas a chosaint ó bhreathnóirí.

## Téarmaí infheicthe {#visible-terms}

Ar deireadh, cosúil le conarthaí traidisiúnta, is féidir leat a sheiceáil cad atá i gconradh cliste sula síníonn tú é (nó idirghníomhú leis ar shlí eile). Cinntíonn trédhearcacht chonartha chliste gur féidir le duine ar bith grinnscrúdú a dhéanamh air.

## I gconartha cliste úsáidtear cásanna {#use-cases}

Go bunúsach is féidir le conarthaí cliste aon rud is féidir le cláir ríomhaire a dhéanamh.

Is féidir leo ríomhanna a dhéanamh, airgeadra a chruthú, sonraí a stóráil, [NFTanna](/glossary/#nft) a bhualadh, cumarsáid a sheoladh agus fiú grafaic a ghiniúint. Seo a leanas roinnt samplaí fíor-choitianta den saol:

- [Stablecoins](/stablecoins/)
- [Sócmhainní digiteacha uathúla a chruthú agus a dháileadh](/nft/)
- [Malartán airgeadra oscailte uathoibríoch](/get-eth/#dex)
- [Cluichíocht dhíláraithe](/apps/?category=gaming#explore)
- [Polasaí árachais a íocann amach go huathoibríoch](https://etherisc.com/)
- [Caighdeán a ligeann do dhaoine airgeadraí saincheaptha, idir-inoibritheacha a chruthú](/developers/docs/standards/tokens/)

## Tuilleadh léitheoireachta {#further-reading}

- [Conas a Athróidh Conarthaí Cliste an Domhan](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Conarthaí cliste le haghaidh forbróirí](/developers/docs/smart-contracts/)
- [Foghlaim conas conarthaí cliste a scríobh](/developers/learning-tools/)
- [Ardscileanna Ethereum - Cad is Conradh Cliste ann?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
