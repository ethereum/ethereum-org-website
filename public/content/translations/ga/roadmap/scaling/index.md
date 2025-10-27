---
title: Scálú Ethereum
description: Rollups batch transactions together offchain, reducing costs for the user. Mar sin féin, tá an chaoi a n-úsáideann rolladh sonraí faoi láthair ró-chostasach, rud a chuireann srian le cé chomh saor agus is féidir idirbhearta a bheith. Réitíonn Proto-Danksharding é seo.
lang: ga
image: /images/roadmap/roadmap-transactions.png
alt: "Treochlár Ethereum"
template: roadmap
---

Déantar Ethereum a scála ag baint úsáide as [ciseal 2s](/layer-2/#rollups) (ar a dtugtar rollups freisin), a dhéanann idirbhearta a bhaisc le chéile agus a sheolann an t-aschur chuig Ethereum. Cé go bhfuil rolladh suas le hocht n-uaire níos saoire ná Ethereum Mainnet, is féidir rolladh suas a bharrfheabhsú tuilleadh chun costais a laghdú d'úsáideoirí deiridh. Braitheann Rollups freisin ar roinnt comhpháirteanna láraithe gur féidir le forbróirí a bhaint de réir mar a aibíonn na rollóirí.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Costais idirbhirt
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Tá rolladh an lae inniu <strong>~5-20x</strong> níos saoire ná ciseal 1 Ethereum</li>
    <li>Is gearr go laghdóidh ZK-rollups táillí faoi <strong>~40-100x</strong></li>
    <li>Soláthróidh athruithe atá le teacht ar Ethereum <strong>~100-1000x</strong> eile de scálaithe</li>
    <li style={{ marginBottom: 0 }}>Ba cheart go mbainfeadh úsáideoirí leas as idirbhearta <strong>a chosnaíonn níos lú ná $0.001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Sonraí a dhéanamh níos saoire {#making-data-cheaper}

Bailíonn Rollups líon mór na n-idirbheart, déanann siad iad a fhorghníomhú agus na torthaí a chur faoi bhráid Ethereum. Gineann sé seo go leor sonraí nach mór a bheith ar fáil go hoscailte ionas gur féidir le duine ar bith na hidirbhearta a fhorghníomhú dóibh féin agus a fhíorú go raibh an t-oibreoir rolladh macánta. Má aimsíonn duine neamhréireacht, féadfaidh siad ceist a ardú.

### Proto-Danksharding {#proto-danksharding}

Go stairiúil, stóráiltear sonraí Rollup ar Ethereum go buan, rud atá costasach. Tá níos mó ná 90% den chostas idirbhirt a íocann úsáideoirí ar rolladh dlite mar gheall ar an stóráil sonraí seo. Chun costais idirbhirt a laghdú, is féidir linn na sonraí a aistriú isteach i stóras sealadach nua 'blob'. Tá Blobaí níos saoire toisc nach bhfuil siad buan; scriostar iad ó Ethereum nuair nach mbíonn gá leo a thuilleadh. Tagann sé mar fhreagracht ar na daoine a dteastaíonn sé uathu sonraí rollta a stóráil go fadtéarmach, mar oibreoirí rolladh suas, malartuithe, seirbhísí innéacsaithe etc. Is cuid d'uasghrádú ar a dtugtar "Proto-Danksharding" é idirbhearta blob a chur le Ethereum.

Le Proto-Danksharding, is féidir go leor blobaí a chur le bloic Ethereum. Cumasaíonn sé seo scála suntasach eile (>100x) suas le tréchur Ethereum agus laghdú ar chostais idirbheartaíochta.

### Danksharding {#danksharding}

Tá an dara céim de leathnú sonraí blob casta toisc go bhfuil modhanna nua ag teastáil chun sonraí rollta suas a sheiceáil ar fáil ar an líonra agus braitheann sé ar [bhailíochtóirí](/glossary/#validator) a [bloc](/glossary/#block) bhfreagrachtaí tograí tógála agus blocála a scaradh óna chéile. Éilíonn sé freisin bealach chun a chruthú ar bhealach cripteagrafach go bhfuil fo-thacairí beaga de shonraí blob fíoraithe ag bailíochtaithe.

Tugtar ["Danksharding"](/roadmap/danksharding/) ar an dara céim seo. **Is dócha nach gcuirfear i bhfeidhm go hiomlán é go ceann na mblianta**. Tá Danksharding ag brath ar fhorbairtí eile mar [blocthógáil agus blocthograí a scaradh](/roadmap/pbs) agus dearaí líonra nua a chuireann ar chumas an líonra a dhearbhú go héifeachtach go bhfuil sonraí ar fáil trí shampláil randamach a dhéanamh ar chúpla cilibheart ag an am céanna, ar a dtugtar [sampláil infhaighteachta sonraí (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Tuilleadh faoi Danksharding</ButtonLink>

## Rollups a dhílárú {#decentralizing-rollups}

Tá [Rolluithe](/layer-2) ag scáláil Ethereum cheana féin. Cuireann [éiceachóras saibhir de thionscadail rollta suas](https://l2beat.com/scaling/tvl) ar chumas úsáideoirí idirbheartaíocht a dhéanamh go tapa agus go saor, le raon ráthaíochtaí slándála. Mar sin féin, cuireadh tús le rolluithe ag baint úsáide as seicheamhóirí láraithe (ríomhairí a dhéanann próiseáil agus comhiomlánú an idirbhirt go léir sula gcuirtear faoi bhráid Ethereum iad). Tá sé seo i mbaol cinsireachta, toisc gur féidir na hoibreoirí seicheamháin a cheadú, a bhreabú nó a chur i gcontúirt ar bhealach eile. Ag an am céanna, [tá difríochtaí idir rolluithe](https://l2beat.com) maidir leis an mbealach a bhailíochtaíonn siad na sonraí a thagann isteach. Is é an bealach is fearr le "cruthaitheoirí" [cruthúnais calaoise](/glossary/#fraud-proof) nó cruthúnais bhailíochta a chur isteach, ach níl gach rolladh suas ann fós. Úsáideann fiú na rollups sin a úsáideann cruthúnais bailíochta/calaoise líon beag de na cruthaitheoirí aitheanta. Dá bhrí sin, is é an chéad chéim ríthábhachtach eile maidir le scálú Ethereum ná freagracht as seicheamhóirí agus cruthaitheoirí a reáchtáil chun dáileadh ar níos mó daoine.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Tuilleadh faoi rolluithe</ButtonLink>

## Dul chun cinn reatha {#current-progress}

Ba é Proto-Danksharding an chéad cheann de na míreanna treochláir seo a cuireadh i bhfeidhm mar chuid d’uasghrádú líonra Cancun-Deneb ("Dencun") i mí an Mhárta 2024. **Is dócha nach mbeidh Full Danksharding i bhfeidhm go ceann roinnt blianta**, mar go mbraitheann sé ar go leor míreanna eile den treochlár a bheith críochnaithe ar dtús. Is dócha gur próiseas céimnitheach a bheidh ann an bonneagar rollta a dhílárú - tá go leor rolladh éagsúla ann atá ag tógáil córais atá beagán difriúil agus díláróidh siad go hiomlán ag rátaí éagsúla.

[Tuilleadh faoi uasghrádú líonra Dencun](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
