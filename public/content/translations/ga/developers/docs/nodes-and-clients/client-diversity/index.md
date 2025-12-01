---
title: Éagsúlacht cliant
description: Míniú ardleibhéil ar an tábhacht a bhaineann le héagsúlacht cliant Ethereum.
lang: ga
sidebarDepth: 2
---

Tá iompar nód Ethereum á rialú ag na bogearraí cliant a ritheann sé. Tá roinnt cliant Ethereum ag leibhéal táirgthe, gach ceann acu arna bhforbairt agus arna chothabháil i dteangacha éagsúla ag foirne ar leith. Tógtar na cliaint de réir sonraíocht choiteann a chinntíonn go ndéanann na cliaint cumarsáid gan uaim lena chéile agus go bhfuil an fheidhmiúlacht chéanna acu agus a sholáthraíonn taithí úsáideora coibhéiseach. I láthair na huaire, áfach, níl dáileadh na gcliant thar nóid cothrom go leor chun an daingniú líonra seo a bhaint amach dá lán-acmhainneacht. Go hidéalach, roinntear úsáideoirí a bheag nó a mhór idir na cliaint éagsúla chun an oiread éagsúlacht cliant agus is féidir a thabhairt chuig an líonra.

## Réamhriachtanais {#prerequisites}

Mura dtuigeann tú cheana féin cad is nóid agus cliaint ann, seiceáil amach [nóid agus cliaint](/developers/docs/nodes-and-clients/). Sainmhínítear sraitheanna [Rith](/glossary/#execution-layer) agus [comhdhearcadh](/glossary/#consensus-layer) sa ghluais.

## Cén fáth a bhfuil cliaint iolracha ann? {#why-multiple-clients}

Tá cliaint iolracha, a forbraíodh go neamhspleách agus a chothabháiltear go neamhspleách ann toisc go ndéanann éagsúlacht cliant an líonra níos athléimní i leith ionsaithe agus fabhtanna. Is neart uathúil de chuid Ethereum é cliaint iolracha - braitheann blocshlabhraí eile ar dho-earráideacht cliant amháin. Mar sin féin, ní leor go simplí cliaint iolracha a bheith ar fáil, caithfidh an pobal glacadh leo agus na nóid ghníomhacha iomlána a dháileadh go measartha cothrom trasna orthu.

## Cén fáth a bhfuil éagsúlacht cliant tábhachtach? {#client-diversity-importance}

Tá sé ríthábhachtach do shláinte líonra díláraithe go mbeadh go leor cliant forbartha agus á gcothabháil go neamhspleách. Déanaimis iniúchadh ar na fáthanna.

### Fabhtanna {#bugs}

Is lú an riosca don líonra é fabht i gcliant aonair a dhéanann ionadú do mhionlach de nóid Ethereum. Le dáileadh measartha cothrom na nód thar go leor cliant, is beag an dóchúlacht go mbeidh formhór na gcliant ag fulaingt ó shaincheist chomhroinnte, agus mar thoradh air sin, tá an líonra níos láidre.

### Athléimneacht in aghaidh ionsaithe {#resilience}

Tairgeann éagsúlacht cliant athléimneacht in aghaidh ionsaithe freisin. Mar shampla, ní dócha go n-éireoidh le hionsaí a [mheallan cliant ar leith](https://twitter.com/vdWijden/status/1437712249926393858) trí chleas go brainse ar leith den slabhra toisc go bhfuil cliaint eile ann: ní dócha go bhféadfaí é a dhúshaothrú ar an mbealach céanna agus tá an slabhra canónach fós neamhthruaillithe. Méadaíonn éagsúlacht íseal cliant an riosca a bhaineann le haiceáil ar an gcliant ceannasach. Tá sé cruthaithe cheana féin gur cosaint thábhachtach í éagsúlacht na gcliant in aghaidh ionsaithe mailíseacha ar an líonra, mar shampla d’fhéadfaí ionsaí séanadh seirbhíse Shanghai in 2016 a dhéanamh toisc go raibh ionsaitheoirí in ann an cliant ceannasach (Geth) a mhealladh chun oibríocht mhall i/o a rith na mílte uair in aghaidh an bhloic. Toisc go raibh cliaint eile ar líne freisin nach raibh an leochaileacht á roinnt acu, bhí Ethereum in ann seasamh in aghaidh an ionsaí agus leanúint ar aghaidh ag oibriú agus an leochaileacht i Geth socraithe.

### Críochnaitheacht chruthúnais gill {#finality}

D'fhéadfadh fabht i gcliant comhdhearcaidh le níos mó ná 33% de na nóid Ethereum cosc ​​a chur ar an gciseal comhdhearcaidh ó thabhairt chun críche, rud a chiallaíonn nach bhféadfadh úsáideoirí a bheith muiníneach nach ndéanfaí idirbhearta a chur ar ais nó a athrú ag pointe éigin. Bheadh ​​​​sé seo an-deacair do go leor de na haipeanna a tógadh ar bharr Ethereum, go háirithe DeFi.

<Emoji text="🚨" className="me-4" /> Níos measa fós, d’fhéadfadh fabht chriticiúil i gcliant le tromlach dhá thrian a bheith ina chúis leis an slabhra <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">deighilt agus bailchríoch go mícheart</a>, rud a fhágann go dtéann foireann mhór bhailíochtóirí i bhfostú ar slabhra neamhbhailí. Más mian leo dul isteach arís sa slabhra ceart, beidh na bailíochtóirí seo i ngleic le slaiseáil nó le tarraingt siar agus athghníomhú deonach atá mall agus costasach. Méid scálaí slaiseála le líon na nóid inchurtha le tromlach dhá thrian slaiseáilte uasta (32 ETH).

Cé gur cásanna neamhdhóchúla iad seo, is féidir le héiceachóras Ethereum a riosca a mhaolú trí dháileadh na gcliant thar na nóid ghníomhacha a chothromú. Go hidéalach, ní bhainfeadh aon chliant comhdhearcadh amach sciar 33% de na nóid iomlána.

### Freagracht roinnte {#responsibility}

Tá costas daonna ag baint le cliant tromlaigh a bheith ann freisin. Cuireann sé an iomarca brú agus freagrachta ar fhoireann bheag forbartha. Dá laghad an éagsúlacht cliant, is ea is mó an t-ualach freagrachta ar na forbróirí atá ag cothabháil an chliaint tromlaigh. Is maith an rud do shláinte líonra nód Ethereum agus a líonra daoine an fhreagracht seo a scaipeadh thar fhoirne iolracha.

## Éagsúlacht cliant reatha {#current-client-diversity}

![Píchairt a thaispeánann éagsúlacht cliant](./client-diversity.png) _Sonraí léaráide ó [ethernodes.org](https://ethernodes.org) agus [ clientdiversity.org](https://clientdiversity.org/)_

Léiríonn an dá phíchairt thuas pictiúir den éagsúlacht cliant atá ann faoi láthair maidir le sraitheanna reatha agus comhdhearcaidh (tráth scríofa na tuarascála seo i mí Eanáir 2022). Is é [Geth](https://geth.ethereum.org/) an an ciseal reatha is ceannasaí, le [Open Ethereum ](https://openethereum.github.io/) i bhfad ar a chúl sa dara háit, [Erigon](https://github.com/ledgerwatch/erigon) sa tríú háit agus [Nethermind](https://nethermind.io/) sa cheathrú háit, le cliaint eile níos lú ná 1 % den líonra. Níl an cliant is coitianta a úsáidtear ar an tsraith chomhdhearcaidh - [Prysm](https://prysmaticlabs.com/#projects) - chomh ceannasach le Geth ach fós seasann sé os cionn 60% den líonra. Tá [Lighthouse](https://lighthouse.sigmaprime.io/) agus [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) le chéile cothrom le ~20% agus ~14% faoi seach, agus is annamh a úsáidtear cliaint eile.

Fuarthas sonraí na sraithe reatha ó [Ethernodes](https://ethernodes.org) an 23 Eanáir-2022. Fuarthas sonraí do chliaint chomhdhearcaidh ó [Michael Sproul](https://github.com/sigp/blockprint). Tá sé níos deacra sonraí cliant comhdhearcaidh a fháil toisc nach mbíonn rianta gan athbhrí ag cliaint an tsraith chomhdhearcaidh ar féidir iad a úsáid chun iad a aithint. Gineadh na sonraí trí úsáid a bhaint as algartam aicmithe a chuireann mearbhall uaireanta ar roinnt de na cliaint mhionlaigh (féach [anseo](https://twitter.com/sproulM_/status/1440512518242197516) le haghaidh tuilleadh sonraí). Sa léaráid thuas, caitear leis na haicmithe débhríocha seo le lipéad ceachtar/nó (m.sh. Nimbus/Teku). Mar sin féin, is léir go bhfuil an chuid is mó den líonra ag rith Prysm. Is léargas iad na sonraí thar thacar seasta bloc (sa chás seo bloic Beacon i sliotáin 2048001 go 2164916) agus uaireanta tá ceannas Prysm níos airde, níos mó ná 68%. In ainneoin nach bhfuil iontu ach pictiúir, tugann na luachanna sa léaráid tuiscint ghinearálta ar staid reatha éagsúlacht na gcliant.

Tá sonraí nuashonraithe ar éagsúlacht na gcliant don tsraith chomhdhearcaidh ar fáil anois ag [clientdiversity.org](https://clientdiversity.org/).

## Ciseal reatha {#execution-layer}

Go dtí seo, díríodh an comhrá ar éagsúlacht na gcliant go príomha ar an tsraith chomhdhearcaidh. Mar sin féin, is ionann cliant reatha [Geth](https://geth.ethereum.org) agus thart ar 85% de na nóid go léir faoi láthair. Tá fadhb ag baint leis an gcéatadán seo ar na cúiseanna céanna agus a bhaineann le cliaint chomhdhearcaidh. Mar shampla, de bharr fabht in Geth a chuireann isteach ar láimhseáil idirbhearta nó a thógann pálasta reatha d'fhéadfadh cliaint chomhdhearcaidh idirbhearta fabhtacha nó lochtacha a dhéanamh. Mar sin, bheadh ​​​​Ethereum níos sláintiúla le dáileadh níos cothroime de chliaint reatha, go hidéalach gan aon chliant a sheasann do níos mó ná 33% den líonra.

## Bain úsáid as cliant mionlaigh {#use-minority-client}

Chun aghaidh a thabhairt ar éagsúlacht cliant, ní mór do níos mó ná úsáideoirí aonair cliaint mhionlaigh a roghnú - tá gá le linnte bailíochtóra agus institiúidí cosúil leis na dapps agus na malartuithe móra chun cliaint a athrú freisin. Mar sin féin, is féidir le gach úsáideoir a gcuid féin a dhéanamh chun an éagothroime reatha a cheartú agus úsáid na mbogearraí Ethereum go léir atá ar fáil a normalú. Tar éis The Merge, beidh ar gach oibreoir nód cliant reatha agus cliant comhdhearcaidh a reáchtáil. Cabhróidh roghnú teaglaim de na cliaint a mholtar thíos le héagsúlacht cliant a mhéadú.

### Cliaint fhorghníomhú {#execution-clients}

[Besu](https://www.hyperledger.org/use/besu)

[Nethermind](https://downloads.nethermind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[Go-Ethereum](https://geth.ethereum.org/)

[Reth](https://reth.rs/)

### Cliaint comhdhearcadh {#consensus-clients}

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Lodestar](https://github.com/ChainSafe/lodestar)

[Prysm](https://docs.prylabs.network/docs/getting-started)

[Grandine](https://docs.grandine.io/)

Is féidir le húsáideoirí teicniúla cabhrú leis an bpróiseas seo a luathú trí níos mó ranganna teagaisc agus doiciméadúcháin a scríobh do chliaint mhionlaigh agus a gcomhghleacaithe nód-oibriúcháin a spreagadh le dul ar imirce ó na cliaint cheannasacha. Tá treoracha maidir le haistriú go cliant comhdhearcadh mionlaigh ar fáil ar [clientdiversity.org](https://clientdiversity.org/).

## Deais éagsúlacht cliant {#client-diversity-dashboards}

Tugann roinnt deaiseanna staitisticí fíor-ama ar éagsúlacht cliant maidir leis an gciseal reatha agus comhdhearcaidh.

**Ciseal comhdhearcaidh:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Ciseal reatha:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Tuilleadh léitheoireachta {#further-reading}

- [Éagsúlacht cliant ar chiseal chomhdhearcaidh Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Rith an cliant tromlaigh ar do phriacal féin!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 Márta 2022_
- [Tábhacht éagsúlacht na gcliant](https://our.status.im/the-importance-of-client-diversity/)
- [Liosta de sheirbhísí nód Ethereum](https://ethereumnodes.com/)
- ["Cúig Fháth" den fhadhb éagsúlachta cliant](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Éagsúlacht Ethereum agus Conas Réiteach a dhéanamh Dó (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Ábhair ghaolmhara {#related-topics}

- [Rith nód Ethereum](/run-a-node/)
- [Nóid agus cliaint](/developers/docs/nodes-and-clients/)
