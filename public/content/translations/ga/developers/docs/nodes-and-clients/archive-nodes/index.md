---
title: Nód Cartlainne Ethereum
description: Forbhreathnú ar nóid chartlainne
lang: ga
sidebarDepth: 2
---

Is éard atá i nód cartlainne ná sampla de chliant Ethereum atá cumraithe chun cartlann a thógáil de gach stát stairiúil. Is uirlis úsáideach é do chásanna úsáide áirithe ach d’fhéadfaí go mbeadh sé níos deacra é a rith ná nód iomlán.

## Réamhriachtanais {#prerequisites}

Ba cheart go dtuigfeá coincheap [nóid Ethereum](/developers/docs/nodes-and-clients/), [a ailtireacht](/developers/docs/nodes-and-clients/node-architecture/), [straitéisí sioncronaithe](/developers/docs/nodes-and-clients/#sync-modes), cleachtais [reatha](/developers/docs/nodes-and-clients/run-a-node/) agus [a n‑úsáide](/developers/docs/apis/json-rpc/).

## Cad is nód cartlainne ann

Chun an tábhacht a bhaineann le nód cartlainne a thuiscint, déanaimis an coincheap "stát" a shoiléiriú Is féidir cur síos a dhéanamh ar Ethereum mar _mheaisín stáit atá bunaithe ar idirbheart_. Is éard atá ann cuntais agus feidhmchláir a dhéanann idirbhearta trína n‑athraíonn siad a staid féin. Stóráiltear na sonraí domhanda le faisnéis faoi gach cuntas agus conradh i mbunachar sonraí trie ar a dtugtar stát. Déanann an cliant ciseal forghníomhaithe (EL) é sin a láimhseáil agus áirítear leis:

- Iarmhéideanna cuntais agus neamhní
- Cód conartha agus stóráil
- Sonraí a bhaineann le comhdhearcadh, m.sh. Conradh Taisce Geallchuir

Chun idirghníomhú leis an líonra, bloic nua a fhíorú agus a tháirgeadh, ní mór do chliaint Ethereum coimeád suas leis na hathruithe is déanaí (barr an tslabhra) agus, dá bhrí sin, leis an staid reatha. Fíoraíonn cliant sraithe forghníomhaithe atá cumraithe mar nód iomlán agus leanann sé an staid is déanaí den líonra ach ní dhéanann sé ach taisceadh ar an gcúpla stát atá caite, m.sh. an stát a bhaineann leis na 128 bloc dheireanacha, ionas gur féidir leis atheagruithe slabhra a láimhseáil agus rochtain tapa a sholáthar ar shonraí le déanaí. Is é an stát le déanaí ná an méid a theastaíonn ó gach cliant chun idirbhearta isteach a fhíorú agus an líonra a úsáid.

Is féidir an stát a shamhlú mar ghrianghraf líonra ar feadh scaithimhín de bhloc ar leith agus is féidir an chartlann a shamhlú mar athsheoladh staire.

Is féidir stáit stairiúla a ghearradh go sábháilte toisc nach bhfuil gá leo chun go n‑oibreodh an líonra agus go mbeadh sé iomarcach gan úsáid ag an gcliant na sonraí go léir atá as dáta a choinneáil. Go héifeachtach caitear amach stáit a bhí ann roimh bhloc éigin le déanaí (m.sh. 128 bloc roimh an gcloigeann). Ní choinníonn nóid iomlána ach sonraí stairiúla blocshlabhra (bloic agus idirbhearta) agus ó am go ham pictiúir stairiúla is féidir leo a úsáid chun stáit níos sine a athghiniúint ar iarratas. Déanann siad é seo trí idirbhearta san am atá caite a ath-fhorghníomhú san EVM, ar féidir leo a bheith éilitheach ó thaobh ríomha de nuair a bhíonn an staid inmhianaithe i bhfad ón radharc is gaire.

Mar sin féin, ciallaíonn sé sin go n‑ídítear cuid mhór ríomha trí staid stairiúil rochtain ar nód iomlán. B'fhéidir go mbeadh ar an gcliant gach idirbheart san am atá caite a dhéanamh agus staid stairiúil amháin a ríomh ón ngéineas. Le nóid chartlainne réitítear é sin, ní hamháin trí na stáit is déanaí a stóráil ach trí gach stát stairiúil a stóráil a cruthaíodh tar éis gach bloc. Go bunúsach déanann sé comhbhabhtáil le riachtanas spás diosca níos mó.

Tá sé tábhachtach a thabhairt faoi deara nach mbraitheann an líonra ar nóid chartlainne chun na sonraí stairiúla go léir a choinneáil agus a sholáthar. Mar a luadh thuas, is féidir gach stát eatramhach stairiúil a dhíorthú ar nód iomlán. Stóráiltear na hidirbhearta ag aon nód iomlán (níos lú ná 400G faoi láthair) agus is féidir iad a athimirt chun an chartlann iomlán a thógáil.

### Cásanna úsáide

Ní gá rochtain ar stáit stairiúla a úsáid go rialta le húsáid Ethereum cosúil le hidirbhearta a sheoladh, conarthaí a úsáid, comhdhearcadh a fhíorú, srl. Ní bhíonn nód cartlainne ag teastáil ó úsáideoirí chun gnáth-idirghníomhú leis an líonra.

Is é an príomhbhuntáiste a bhaineann le cartlann an stáit ná rochtain thapa ar fhiosrúcháin faoi stáit stairiúla. Mar shampla, thabharfadh nód cartlainne torthaí go pras amhail:

- _Cad é iarmhéid chuntas ETH 0x1337... ar bhloc 15537393?_
- _Cad é an t-iarmhéid de chomhartha 0x i gconradh 0x ag bloc 1920000?_

Mar a mhínítear thuas, theastódh ó nód iomlán na sonraí seo a ghiniúint trí fhorghníomhú EVM a úsáideann an LAP, rud a thógann am. Faigheann nóid chartlainne rochtain orthu ar an diosca agus dáileann siad freagraí láithreach. Is gné úsáideach é sin le haghaidh codanna áirithe den bhonneagar, mar shampla:

- Is maith le soláthraithe seirbhíse blocthaiscéalaithe
- Taighdeoirí
- Anailísí slándála
- Forbróirí Dapp
- Iniúchadh agus comhlíonadh

Tá [seirbhísí ](/developers/docs/nodes-and-clients/nodes-as-a-service/)éagsúla saor in aisce ann trína gceadaítear rochtain ar shonraí stairiúla freisin. Toisc go bhfuil sé níos déine nód cartlainne a rith, tá an rochtain seo teoranta den chuid is mó agus ní oibríonn sé ach le haghaidh rochtain ócáideach. Má theastaíonn rochtain leanúnach ar shonraí stairiúla ó do thionscadal, ba cheart duit smaoineamh ar cheann a rith as do stuaim féin.

## Feidhmithe agus úsáid

Is ionann nód cartlainne sa chomhthéacs seo agus sonraí a fhreastalaíonn ar chliaint ar chiseal forghníomhaithe atá os comhair úsáideoirí agus iad ag láimhseáil bhunachar sonraí an stáit agus ag soláthar chríochphointí JSON-RPC. Féadfaidh roghanna cumraíochta, am sioncronaithe agus méid an bhunachair sonraí a bheith éagsúil de réir na gcliant. Le haghaidh sonraí, féach le do thoil ar na doiciméid a chuir do chliant ar fáil.

Sula dtosaíonn tú ar do nód cartlainne féin, foghlaim faoi na difríochtaí idir na cliaint agus go háirithe na [riachtanais chrua-earraí](/developers/docs/nodes-and-clients/run-a-node/#requirements). Níl formhór na gcliant optamaithe don ghné seo agus teastaíonn níos mó ná 12TB de spás óna gcartlann. I gcodarsnacht leis sin, is féidir le feidhmiúcháin mar Erigon na sonraí céanna a stóráil faoi 3TB, rud a fhágann gurb iad an bealach is éifeachtaí chun nód cartlainne a rith.

## Cleachtais mholta

Seachas [moltaí ginearálta chun nód a rith](/developers/docs/nodes-and-clients/run-a-node/), d'fhéadfadh nód cartlainne a bheith níos déine maidir le crua-earraí agus cothabháil. Agus [príomhghnéithe](https://github.com/ledgerwatch/erigon#key-features) á gcur san áireamh, is é an cur chuige is praiticiúla ná cur i bhfeidhm cliant [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Crua-earraí

Bí cinnte i gcónaí go bhfíoraíonn tú na riachtanais crua-earraí le haghaidh modh áirithe i gcáipéisíocht an chliaint. Is é an riachtanas is mó le haghaidh nóid cartlainne é an spás diosca. Ag brath ar an gcliant, athraíonn sé ó 3TB go 12TB. Fiú má mheastar HDD a bheith ina réiteach níos fearr ar mhéideanna móra sonraí, beidh tiomántáin SSD ag teastáil chun é a shioncronú agus ceann an tslabhra a nuashonrú i gcónaí. Tá tiomántáin [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) maith go leor ach ba cheart go mbeadh sé ar cháilíocht iontaofa, [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences) ar a laghad. Is féidir dioscaí a fheistiú ar ríomhaire deisce nó ar fhreastalaí le go leor sliotán. Tá feistí tiomnaithe den sórt sin go hiontach chun nód aga fónaimh aird a rith. Is féidir go cinnte é a rith ar ríomhaire glúine ach beidh costas breise ag baint leis an iniomparthacht.

Ní mór na sonraí go léir a chur in aon imleabhar amháin, mar sin ní mór dioscaí a cheangal, m.sh. le [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) nó LVM. B'fhéidir gurbh fhiú smaoineamh ar [ZFS](https://en.wikipedia.org/wiki/ZFS) a úsáid mar go dtacaíonn sé le "Copy-on-write" trína gcinntítear go scríobhtar sonraí i gceart chuig an diosca gan aon earráidí bunúsacha.

Chun tuilleadh cobhsaíochta agus slándála a fháil chun éillitheacht bhunachair sonraí de thaisme a chosc, go háirithe i socrú gairmiúil, smaoinigh ar [chuimhne ECC](https://en.wikipedia.org/wiki/ECC_memory) a úsáid má thacaíonn do chóras leis. Moltar go ginearálta go mbeadh an méid RAM mar an gcéanna le nód iomlán ach is féidir le níos mó RAM cabhrú leis an sioncrónú a bhrostú.

Le linn sioncronaithe tosaigh, déanfaidh cliaint i mód cartlainne gach idirbheart ón gcéad lá riamh. Tá luas forghníomhaithe teoranta den chuid is mó ag an LAP, mar sin is féidir le LAP níos tapúla cabhrú leis an am sioncronaithe tosaigh. Ar ríomhaire meántomhaltóra, féadfaidh an sioncronú tosaigh suas le mí a thógáil.

## Tuilleadh léitheoireachta {#further-reading}

- [Ethereum Full Nód vs Nód Cartlainne](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Meán Fómhair 2022_
- [Do Nód Cartlainne Ethereum Féin a Thógáil](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Lúnasa 2021_
- [Conas Erigon, RPC Erigon agus TrueBlocks (scrape agus API) a shocrú mar sheirbhísí](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, nuashonraithe i mí Mheán Fómhair 2022_

## Ábhair ghaolmhara {#related-topics}

- [Nóid agus cliaint](/developers/docs/nodes-and-clients/)
- [Nód a rith](/developers/docs/nodes-and-clients/run-a-node/)
