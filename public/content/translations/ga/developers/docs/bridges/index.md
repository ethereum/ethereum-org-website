---
title: Droichid
description: Forbhreathnú ar traschóiriú d'fhorbróirí
lang: ga
---

Le méadú ar bhlocshlabhraí L1 agus réitigh [scálú](/developers/docs/scaling/) L2, mar aon le líon na bhfeidhmchlár díláraithe atá ag dul i méid de shíor ag dul trasna slabhraí, tá an gá le cumarsáid agus gluaiseacht sócmhainní thar slabhraí ina chuid riachtanach de bhonneagar an ghréasáin anois. Tá cineálacha éagsúla droichid ann chun é seo a dhéanamh indéanta.

## Gá le droichid {#need-for-bridges}

Tá droichid ann chun líonraí blocshlabhra a nascadh. Cumasaíonn siad nascacht agus idir-inoibritheacht idir blocshlabhraí.

Maireann blocshlabhraí i dtimpeallachtaí aonraithe, rud a chiallaíonn nach bhfuil aon bhealach blocshlabhraí chun trádáil agus cumarsáid a dhéanamh le blocshlabhraí eile go nádúrtha. Mar thoradh air sin, cé go bhféadfadh gníomhaíocht shuntasach agus nuálaíocht a bheith ann laistigh d’éiceachóras, bíonn sé teoranta ag an easpa nascachta agus idir-inoibritheachta le héiceachórais eile.

Cuireann droichid bealach ar fáil do thimpeallachtaí scoite blocshlabhra chun nascadh lena chéile. Bunaítear bealach iompair idir blocshlabhraí leo inar féidir comharthaí, teachtaireachtaí, sonraí treallacha, agus fiú glaonna [conradh cliste](/developers/docs/smart-contracts/) a aistriú ó shlabhra amháin go slabhra eile.

## Buntáistí droichid {#benefits-of-bridges}

Go simplí, díghlasáileann droichid cásanna úsáide iomadúla trí ligean do líonraí blocshlabhra sonraí a mhalartú agus sócmhainní a bhogadh eatarthu.

Tá láidreachtaí uathúla, laigí, agus cur chuige maidir le hiarratais tógála ag blocshlabhra (cosúil le luas, tréchur, costas, etc.). Cuidíonn droichid le forbairt an éiceachórais chriptithe foriomlán trí blocshlabhraí a chumasú chun nuálaíochtaí a chéile a ghiaráil.

I gcás forbróirí, cumasaíonn droichid na nithe seo a leanas:

- aon sonraí, faisnéis agus sócmhainní a aistriú thar slabhraí.
- gnéithe nua a dhíghlasáil agus cásanna úsáide do phrótacail de réir mar a leathnaíonn droichid an spás deartha le haghaidh cad is féidir le prótacail a thairiscint. Mar shampla, is féidir le prótacal le haghaidh feirmeoireachta toraidh a imscaradh ar dtús ar Ethereum Príomhlíonra linnte leachtachta a thairiscint thar na slabhraí uile atá comhoiriúnach le EVM.
- an deis chun láidreachtaí na mblocshlabhra éagsúla a ghiaráil. Mar shampla, is féidir le forbróirí leas a bhaint as na táillí níos ísle a thairgeann na réitigh L2 éagsúla trína n-dapps a imscaradh thar rolladh suas, agus taobh-shlabhraí agus úsáideoirí droichead trasna orthu.
- comhoibriú i measc forbróirí ó éiceachórais blocshlabhra éagsúla chun táirgí nua a thógáil.
- ag mealladh úsáideoirí agus pobail ó éiceachórais éagsúla chuig a gcuid dapps.

## Conas a oibríonn droichid? {#how-do-bridges-work}

Cé go bhfuil go leor [cineálacha de dhearaí droichead](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/) ann, seasann trí bhealach chun aistriú tras-shlabhra na sócmhainní a éascú:

- **Glas agus bualadh –** Cuir sócmhainní faoi ghlas ar an slabhra foinse agus sócmhainní buailte ar an slabhra sprice.
- **Dó agus buail –** Dóigh sócmhainní ar an slabhra foinse agus sócmhainní buailte ar an slabhra cinn scríbe.
- **Babhtálacha adamhacha –** Babhtáil sócmhainní ar an slabhra foinse le haghaidh sócmhainní ar an slabhra cinn scríbe le páirtí eile.

## Cineálacha droichid {#bridge-types}

De ghnáth is féidir droichid a rangú i gceann de na buicéid seo a leanas:

- **Droichid dhúchasacha –** De ghnáth tógtar na droichid seo chun leachtacht a bhrú ar bhlocshlabhra ar leith, rud a fhágann go mbeidh sé níos éasca d’úsáideoirí cistí a aistriú chuig an éiceachóras. Mar shampla, tógtar an [Droichead Arbitrum](https://bridge.arbitrum.io/) le go mbeidh sé áisiúil d’úsáideoirí droichead a dhéanamh ó Ethereum Príomhlíonra go Arbitrum. Áirítear ar dhroichid eile dá leithéid Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), etc.
- **Droichid bhailíochtóra nó oracal -** Braitheann na droichid seo ar thacar bailíochtaithe seachtrach nó oracail chun aistrithe tras-slabhra a bhailíochtú. Samplaí: Multichain agus Across.
- **Teachtaireacht ghinearálta a théann thar dhroichid –** Is féidir leis na droichid seo sócmhainní, chomh maith le teachtaireachtaí agus sonraí treallacha a aistriú thar slabhraí. Samplaí: Axelar, LayerZero, agus Nomad.
- **Líonraí leachtachta –** Díríonn na droichid seo go príomha ar shócmhainní a aistriú ó shlabhra amháin go slabhra eile trí bhabhtálacha adamhach. Go ginearálta, ní thacaíonn siad le seoladh teachtaireachta tras-slabhra. Samplaí: Connext agus Hop.

## Comhbhabhtáil le breithniú {#trade-offs}

Le droichid, níl aon réitigh foirfe ann. Ina ionad sin, ní dhéantar ach comhbhabhtáil chun cuspóir a chomhlíonadh. Is féidir le forbróirí agus úsáideoirí droichid a mheas bunaithe ar na fachtóirí seo a leanas:

- **Slándáil –** Cé a fhíoraíonn an córas? De ghnáth ní bhíonn na droichid atá daingnithe ag bailíochtaithe seachtracha chomh slán ná na droichid atá daingnithe go háitiúil nó ó dhúchas ag bailíochtóirí na blocshlabhra.
- **Áisiúlacht –** Cé chomh fada a thógann sé idirbheart a chur i gcrích, agus cé mhéad idirbheart a bhí ar úsáideoir a shíniú? Maidir le forbróir, cé chomh fada agus a thógann sé droichead a chomhtháthú, agus cé chomh casta atá an próiseas?
- ** Nascacht –** Cad iad na slabhraí cinn scríbe éagsúla is féidir le droichead a nascadh (i.e., rolladh suas, slabhraí taoibh, blocshlabhraí ciseal 1 eile, etc.), agus cé chomh deacair is atá sé blocshlabhra nua a chomhtháthú?
- **In ann sonraí níos casta a rith –** An féidir le droichead aistriú teachtaireachtaí agus sonraí treallacha níos casta thar slabhraí a chumasú, nó an dtacaíonn sé le haistrithe sócmhainní tras-slabhra amháin?
- **Éifeachtacht costais –** Cé mhéad a chosnaíonn sé sócmhainní a aistriú thar slabhraí trí dhroichead? Go hiondúil, gearrann droichid táille sheasta nó athraitheach ag brath ar chostais gháis agus leachtacht bealaí sonracha. Tá sé ríthábhachtach freisin costas-éifeachtacht droichid a mheas bunaithe ar an gcaipiteal a theastaíonn chun a shlándáil a chinntiú.

Ar leibhéal ard, is féidir droichid a chatagóiriú mar iontaofa agus neamh-iontaofa.

- **Iontaofa –** Fíoraítear droichid iontaofa go seachtrach. Úsáideann siad sraith sheachtrach fíoraitheoirí (Cónaidhm le córais ríomha il-sig, il-pháirtí, líonra oracal) chun sonraí a sheoladh thar slabhraí. Mar thoradh air sin, is féidir leo nascacht iontach a thairiscint agus teachtaireacht iomlán ghinearálaithe a chumasú trasna slabhraí. Is gnách go bhfeidhmíonn siad go maith chomh maith le luas agus cost-éifeachtúlacht. Baineann costas slándála leis seo, toisc go gcaithfidh úsáideoirí brath ar shlándáil an droichid.
- **Neamhiontaofa –** Braitheann na droichid seo ar na blocshlabhraí a nascann siad agus a mbailíochtóirí chun teachtaireachtaí agus comharthaí a aistriú. Tá siad 'neamhiontaofa' toisc nach gcuireann siad boinn tuisceana iontaobhais nua (i dteannta leis na blocshlabhraí). Mar thoradh air sin, meastar go bhfuil droichid neamhiontaofa níos sláine ná droichid iontaofa.

Chun droichid neamhiontaofa a mheas bunaithe ar fhachtóirí eile, ní mór dúinn iad a bhriseadh síos ina dteachtaireachtaí ginearálaithe a théann thar dhroichid agus líonraí leachtachta.

- **Teachtaireachtaí ginearálaithe ag dul thar dhroichid –** tá slándáil na ndroichead seo ar fheabhas, mar atá a gcumas sonraí níos casta a aistriú thar slabhraí. De ghnáth, tá siad go maith freisin le cost-éifeachtúlacht. Mar sin féin, baineann costas nascachta leis na láidreachtaí seo go ginearálta do dhroichid cliant éadrom (ex: IBC) agus míbhuntáistí luais le haghaidh droichead dóchasacha (ex: Nomad) a úsáideann cruthúnais chalaoise.
- **Líonraí leachtachta –** Úsáideann na droichid seo babhtálacha adamhacha chun sócmhainní a aistriú agus is córais arna bhfíorú go háitiúil iad (i.e., úsáideann siad bailíochtóirí na mblocshlabhraí bunúsacha chun idirbhearta a fhíorú). Mar thoradh air sin, tá siad ar fheabhas ó thaobh slándála agus luais. Ina theannta sin, meastar go bhfuil siad sách cost-éifeachtach agus go dtugann siad nascacht mhaith. Mar sin féin, is é an príomhlaige ná a n-éagumas chun sonraí níos casta a chur ar aghaidh - toisc nach dtacaíonn siad le teachtaireacht tras-slabhra a sheoladh.

## Riosca le droichid {#risk-with-bridges}

Droichid ba chúis leis na trí [haiceanna is mó in DeFi](https://rekt.news/leaderboard/) agus tá siad fós i dtús forbartha. Baineann na rioscaí seo a leanas le húsáid droichead ar bith:

- ** Riosca conartha cliste -** Cé gur éirigh le go leor droichead iniúchtaí a rith, ní gá ach locht amháin i gconradh cliste chun sócmhainní a bheith nochta do haiceanna (m.sh: [Droichead Poll Péiste Solana](https://rekt.news/wormhole-rekt/)).
- **Rioscaí córasacha airgeadais** – Úsáideann go leor droichead sócmhainní fillte chun leaganacha canónacha den bhunsócmhainn a bhreacadh ar shlabhra nua. Nochtann sé seo an t-éiceachóras do riosca sistéamach, mar tá dúshaothrú leaganacha fillte de chomharthaí feicthe againn.
- ** Riosca contrapháirtí -** Úsáideann roinnt droichead dearadh iontaofa a éilíonn ar úsáideoirí brath ar an toimhde nach ndéanfaidh bailíochtóirí i gclaonpháirt le chéile chun cistí úsáideoirí a ghoid. Mar gur gá go mbeadh muinín ag úsáideoirí as na gníomhaithe tríú páirtí seo, nochtfar iad do rioscaí ar nós tarraingt rugaí, cinsireacht agus gníomhaíochtaí mailíseacha eile.
- **Saincheisteanna oscailte –** Ós rud é go bhfuil droichid i dtús forbartha, tá go leor ceisteanna gan freagra a bhaineann le conas a fheidhmeoidh droichid i gcoinníollacha margaidh éagsúla, amhail amanna plódaithe líonra agus le linn imeachtaí gan choinne ar nós ionsaithe ar leibhéal líonra nó aisiompuithe stáit. Tá rioscaí áirithe ag baint leis an éiginnteacht seo, agus ní fios cé chomh mór agus atá siad fós.

## Conas is féidir le dapps droichid a úsáid? {#how-can-dapps-use-bridges}

Seo roinnt feidhmchlár praiticiúla ar féidir le forbróirí a mheas maidir le droichid agus a dtras-slabhra dapp a thógáil:

### Comhtháthú droichid {#integrating-bridges}

D’fhorbróirí, tá go leor bealaí ann chun tacaíocht a chur leis do dhroichid:

1. **Do dhroichead féin a thógáil –** Níl sé éasca droichead slán iontaofa a thógáil, go háirithe má ghlacann tú bealach le muinín íosta. Ina theannta sin, teastaíonn blianta taithí agus saineolas teicniúil a bhaineann le staidéir inscálaitheachta agus idir-inoibritheachta leis. Ina theannta sin, theastódh foireann phraiticiúil chun droichead a chothabháil agus dóthain leachtachta a mhealladh chun é a dhéanamh indéanta.

2. **Ag taispeáint roghanna éagsúla droichid –** Éilíonn go leor [dapps](/developers/docs/dapps/) ar úsáideoirí a gcomhartha dúchais a bheith acu chun idirghníomhú leo. Chun gur féidir le húsáideoirí rochtain a fháil ar a gcuid comharthaí, cuireann siad roghanna éagsúla droichead ar fáil ar a láithreán gréasáin. Mar sin féin, is réiteach tapa é an modh seo ar an bhfadhb mar go dtógann sé an t-úsáideoir ar shiúl ón gcomhéadan dapp agus fós éilíonn sé orthu idirghníomhú le dapps agus droichid eile. Eispéireas bordála deacair é seo agus scóip mhéadaithe ann chun botúin a dhéanamh.

3. **Droichead a chomhtháthú –** Ní éilíonn an réiteach seo ar an dapp úsáideoirí a sheoladh chuig an droichead seachtrach agus comhéadain DEX. Ligeann sé do dapps feabhas a chur ar eispéireas bordála an úsáideora. Mar sin féin, tá teorainneacha leis an gcur chuige seo:

   - Bíonn measúnú agus cothabháil droichid deacair agus tógann sé am.
   - Cruthaíonn roghnú droichead amháin pointe amháin teipe agus spleáchais.
   - Tá an dapp teoranta ag cumais an droichid.
   - Seans nach leor droichid leo féin. D'fhéadfadh go mbeadh DEXanna ag teastáil ó dapps chun níos mó feidhmiúlachta a thairiscint mar bhabhtálacha tras-slabhra.

4. **Ildhroichid a chomhtháthú –** Réitíonn an réiteach seo go leor fadhbanna a bhaineann le droichead amháin a chomhtháthú. Mar sin féin, tá srianta ag baint leis freisin, toisc go n-ídíonn comhtháthú droichid iolracha acmhainní agus go gcruthaítear forchostais theicniúla agus chumarsáide d'fhorbróirí - an acmhainn is gann in criptea.

5. ** Comhbhailitheoir droichead a chomhtháthú –** Rogha eile le haghaidh dapps is ea réiteach comhiomlánaithe droichead a chomhtháthú a thugann rochtain dóibh ar dhroichid iolracha. Faigheann comhbhailitheoirí droichid buanna na droichid ar fad le hoidhreacht agus mar sin níl siad teoranta ag cumais aon droichid amháin. Go háirithe, is gnách go gcothabhálann na comhbhailitheoirí droichead na comhtháthú droichid, rud a shábhálann an dapp ón deacracht a bhaineann le fanacht ar bharr na ngnéithe teicniúla agus oibríochtúla de chomhtháthú droichead.

É sin ráite, tá a lochtanna féin ar comh-bhailitheoirí droichead freisin. Mar shampla, cé gur féidir leo níos mó roghanna droichid a thairiscint, is gnách go mbíonn i bhfad níos mó droichid ar fáil ar an margadh seachas iad siúd a thairgtear ar ardán an chomhbhailitheora. Ina theannta sin, díreach cosúil le droichid, tá comhbhailitheoirí droichead nochta freisin do rioscaí conartha cliste agus teicneolaíochta (conarthaí níos cliste = rioscaí níos mó).

Má thugann dapp faoi dhroichead nó comhbhailitheoir a chomhtháthú, tá roghanna éagsúla ann bunaithe ar cé chomh domhain is atá an comhtháthú le bheith. Mar shampla, mura bhfuil ann ach comhtháthú tosaigh chun eispéireas bordála an úsáideora a fheabhsú, dhéanfadh dapp an ghiuirléid a chomhtháthú. Mar sin féin, má tá an comhtháthú chun iniúchadh a dhéanamh ar straitéisí tras-slabhra níos doimhne cosúil le geallchur, feirmeoireacht toraidh, etc., comhtháthaíonn an dapp an SDK nó API.

### Dapp a imscaradh ar shlabhraí iolracha {#deploying-a-dapp-on-multiple-chains}

Chun dapp a imscaradh ar shlabhraí iolracha, is féidir le forbróirí úsáid a bhaint as ardáin forbartha mar [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. De ghnáth, tagann na hardáin seo le forlíontáin in-chomhdhéanta a chuireann ar chumas dapps dul trasna slabhra. Mar shampla, is féidir le forbróirí úsáid a bhaint as seachfhreastalaí imlonnaithe cinntitheach arna thairiscint ag an [breiseán hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Samplaí:

- [Conas dapps tras-slabhra a thógáil](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Margadh Tras-slabhra NFT a Thógáil](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Dapps NFT tras-slabhra a thógáil](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monatóireacht a dhéanamh ar ghníomhaíocht chonartha thar shlabhraí {#monitoring-contract-activity-across-chains}

Chun monatóireacht a dhéanamh ar ghníomhaíocht conartha thar slabhraí, is féidir le forbróirí úsáid a bhaint as fo-ghraif agus ardáin fhorbróra cosúil le Tenderly chun conarthaí cliste a bhreathnú i bhfíor-am. Tá uirlisí ag ardáin den sórt sin freisin a thairgeann feidhmiúlacht monatóireachta sonraí níos fearr le haghaidh gníomhaíochtaí tras-slabhra, amhail seiceáil le haghaidh [imeachtaí arna hastú ag conarthaí](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Uirlisí

- [An Graf](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Tuilleadh léitheoireachta {#further-reading}
- [Droichid Blocshlabhra](/bridges/) – ethereum.org
- [Creat Riosca Droichead L2Beat](https://l2beat.com/bridges/summary)
- [Droichid Blocshlabhra: Ag Tógáil Líonraí Líonraí Criptea](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 Meán Fómhair, 2021 - Dmitriy Berenzon
- [An Trilemma Idir-inoibritheachta](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 Deireadh Fómhair, 2021 - Arjun Bhuptani
- [Braislí: Cé chomh Iontaofa & Droichid Íoslaghdaithe a Mhúnann an Tírdhreach Ilshlabhra](https://blog.celestia.org/clusters/) - 4 Deireadh Fómhair, 2021 - Mustafa Al-Bassam
- [LI.FI: Le Droichid, is Speictream é Iontaobhas](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 Aibreán, 2022 - Arjun Chand
- [Staid na Réitigh Idir-inoibritheachta Rollup](https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 Meitheamh, 2024 - Alex Hook
- [ Leas a bhaint as Slándáil Roinnte Chun Idir-inoibritheacht Thrasshlabhra Slán: Coistí Stáit Lagrange Agus Thall](https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 Meitheamh, 2024 - Emmanuel Awosika

Ina theannta sin, seo roinnt cur i láthair léargasach ó [James Prestwich](https://twitter.com/_prestwich) ar féidir leo cabhrú le tuiscint níos doimhne ar dhroichid a fhorbairt:

- [Droichid a Thógáil, Gan Gairdíní Múrtha](https://youtu.be/ZQJWMiX4hT0)
- [Droichid a Bhriseadh](https://youtu.be/b0mC-ZqN8Oo)
- [Cén fáth a bhfuil na Droichid ag Dó](https://youtu.be/c7cm2kd20j8)
