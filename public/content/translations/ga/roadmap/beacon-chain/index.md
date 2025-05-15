---
title: An Slabhra Beacon
description: Foghlaim faoin Beacon Slabhra - an t-uasghrádú a thug isteach cruthúnais Ethereum.
lang: ga
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Thug an Slabhra Beacon cruthúnas-de-geall ar an éiceachóras Ethereum.
summaryPoint2: Cumascadh é le slabhra cruthúnais oibre bunaidh Ethereum i Meán Fómhair 2022.
summaryPoint3: Thug an Beacon Chain isteach an loighic chomhthoil agus an prótacal gossip bloc a dhaingníonn Ethereum anois.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Seoladh an Beacon Chain an 1 Nollaig, 2020, agus rinne sé cruthúnas foirmiúil mar mheicníocht chomhdhearcadh Ethereum le huasghrádú The Merge an 15 Meán Fómhair, 2022.
</UpgradeStatus>

## Cad é an Slabhra Beacon? {#what-is-the-beacon-chain}

Is é an Beacon Chain an t-ainm atá ar an mbloc slabhra cruthúnais bunaidh a seoladh in 2020. Cruthaíodh é chun a chinntiú go raibh an loighic comhdhearcadh cruthúnas-de-geallta slán agus inbhuanaithe sula dtabharfaí rochtain ar Ethereum Mainnet dó. Dá bhrí sin, rith sé taobh le cruthúnas-bunaidh-oibre Ethereum. . Slabhra de bhloic 'folamh' a bhí sa Beacon Chain, ach d'éiligh an Slabhra Beacon glacadh le sonraí idirbhirt ó chliaint forghníomhaithe, iad a bheartú i mbloic agus ansin iad a eagrú. iad isteach i blockchain ag baint úsáide as meicníocht comhdhearcadh cruthúnas-de-geallta. Ag an nóiméad céanna, d'éirigh le cliaint Ethereum bunaidh as a gcuid mianadóireachta, iomadú bloc agus loighic chomhdhearcadh, ag tabhairt an méid sin ar fad do Shlabhra Beacon. Tugadh [The Merge](/roadmap/merge/) ar an imeacht seo. Chomh luath agus a tharla The Merge, ní raibh dhá bhlocshlabhra ann a thuilleadh. Ina áit sin, ní raibh ach cruthúnais-gheallta amháin Ethereum, a éilíonn anois dhá chliaint éagsúla in aghaidh an nóid. Is é an Slabhra Beacon an ciseal comhthoil anois, líonra piaraí le piaraí de chliaint chomhthoil a láimhseálann gossip bloc agus loighic comhdhearcadh, agus is iad na cliaint bhunaidh a fhoirmíonn an ciseal forghníomhaithe, atá freagrach as gossiping agus idirbhearta a fhorghníomhú, agus bainistíocht a dhéanamh ar staid Ethereum. Is féidir leis an dá shraith cumarsáid a dhéanamh lena chéile ag baint úsáide as an Inneall API.

## Cad a dhéanann an Slabhra Beacon? {#what-does-the-beacon-chain-do}

Is é an Beacon Chain an t-ainm a thugtar ar mhórleabhar cuntas a rinne agus a chomhordaigh líonra Ethereum [gealltóirí](/staking/) sular thosaigh na geallsealbhóirí sin ag bailíochtú bloic Ethereum fíor. Ní phróiseálann sé idirbhearta ná ní láimhseálann sé idirghníomhaíochtaí conartha cliste toisc go bhfuil sé sin á dhéanamh sa chiseal forghníomhaithe. Tá an Slabhra Beacon freagrach as rudaí cosúil le láimhseáil bloc agus fianú, ag rith an algartam rogha forc, agus luach saothair agus pionóis a bhainistiú. Léigh tuilleadh ar ár [leathanach ailtireachta nód](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Tionchar Slabhra Beacon {#beacon-chain-features}

### Ag tabhairt isteach geallta {#introducing-staking}

Thug an Slabhra Beacon  [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) isteach chuig Ethereum. Coinníonn sé seo Ethereum slán agus tuilleann bailíochtaithe níos mó ETH sa phróiseas. Go praiticiúil, is éard atá i gceist le gealltóireacht ná ETH a dhéanamh chun bogearraí bailíochtaithe a ghníomhachtú. Mar ghealltóir, ritheann tú na bogearraí a chruthaíonn agus a bhailíochtaíonn bloic nua sa slabhra.

Feidhmíonn gealladh an cuspóir céanna agus a bhíodh ag [mianadóireacht](/developers/docs/consensus-mechanisms/pow/mining/), ach tá sé difriúil ar go leor bealaí. Bhíodh caiteachas mór roimh ré ag teastáil ón mianadóireacht i bhfoirm crua-earraí cumhachtacha agus tomhaltas fuinnimh, rud a d'fhág go raibh barainneachtaí scála ann, agus go gcuirfí lárú chun cinn. Níor tháinig an mhianadóireacht freisin le haon cheanglas sócmhainní a ghlasáil mar chomhthaobhacht, rud a chuir srian le cumas an phrótacail pionós a ghearradh ar dhrochghníomhaithe tar éis ionsaí.

Mar gheall ar an aistriú go cruthúnais-gheallta bhí Ethereum i bhfad níos sláine agus díláraithe i gcomparáid le cruthúnais oibre. Dá mhéad daoine a ghlacann páirt sa líonra, is amhlaidh is díláraithe agus sábháilte ó ionsaithe a éiríonn sé.

Agus is comhpháirt bhunúsach do [cruthúnas-gheallta a úsáid mar mheicníocht chomhthoiliúil don Ethereum slán, neamhdhíobhálach don timpeallacht agus inscálaithe atá againn anois](/roadmap/vision/).

<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Más spéis leat a bheith i do bhailíochtóir agus cabhrú le Ethereum a shlánú, <a href="/staking/">foghlaim tuilleadh faoi ghealltóireacht</a>.
</AlertDescription>
</AlertContent>
</Alert>

### Socrú le haghaidh roinnte {#setting-up-for-sharding}

Ós rud é gur chumasc an Slabhra Beacon leis an Ethereum Mainnet bunaidh, thosaigh pobal Ethereum ag iarraidh an líonra a roinnt.

Tá sé de bhuntáiste ag baint le cruthúnas-gheallta go bhfuil clár de gach táirgeoir bloc ceadaithe ag aon am ar leith, gach ceann acu le ETH i gceist. Socraíonn an chlárlann seo an chéim chun an cumas a roinnt agus a shárú ach roinntear freagrachtaí sonracha líonra go hiontaofa.

Tá an fhreagracht seo i gcodarsnacht le cruthúnais-oibre, áit nach bhfuil aon oibleagáid ar an líonra mianadóirí agus go bhféadfadh siad stop a chur le mianadóireacht agus a gcuid bogearraí nód a mhúchadh go buan ar an toirt gan iarmhairt. Níl aon chlárlann de mholtóirí bloc aitheanta ann freisin agus níl aon bhealach iontaofa ann chun freagrachtaí líonra a roinnt go sábháilte.

[Tuilleadh faoi roinnt](/roadmap/danksharding/)

## Gaol idir uasghrádú {#relationship-between-upgrades}

Tá na huasghráduithe Ethereum go léir idirghaolmhar. Mar sin déanaimis achoimre ar conas a théann an Slabhra Beacon i bhfeidhm ar na huasghráduithe eile.

### Slabhra Beacon agus The Merge {#merge-and-beacon-chain}

Ar dtús, bhí An Slabhra Beacon ann ar leithligh ó Ethereum Mainnet, ach rinneadh iad a chumasc in 2022.

<ButtonLink href="/roadmap/merge/">
  An Comhoiriúnú
</ButtonLink>

### Shards agus an Slabhra Beacon {#shards-and-beacon-chain}

Ní féidir le roinntear dul isteach go sábháilte ar éiceachóras Ethereum ach amháin le meicníocht comhdhearcadh cruthúnais-gheallta i bhfeidhm. Thug an Slabhra Beacon isteach roinnt, a 'cumaisc' le Mainnet, ag réiteach an bhealaigh le haghaidh roinnte chun cabhrú le Ethereum a roinnt níos mó.

<ButtonLink href="/roadmap/danksharding/">
  Slabhraí roinnte
</ButtonLink>

## Further Reading

- [Tuilleadh faoi uasghrádú Ethereum sa todhchaí](/roadmap/vision)
- [Tuilleadh faoi ailtireacht nód](/developers/docs/nodes-and-clients/node-architecture)
- [Níos mó faoi cruthúnas-gheallta](/developers/docs/consensus-mechanisms/pos)
