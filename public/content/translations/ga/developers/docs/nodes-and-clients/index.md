---
title: Nóid agus cliaint
description: Forbhreathnú ar nóid Ethereum agus bogearraí cliant, móide conas nód a shocrú agus cén fáth ar chóir duit é a dhéanamh.
lang: ga
sidebarDepth: 2
---

Is líonra dáilte ríomhairí é Ethereum (ar a dtugtar nóid) a ritheann bogearraí ar féidir leo bloic agus sonraí idirbhirt a fhíorú. Ní mór na bogearraí a rith ar do ríomhaire chun nód Ethereum a dhéanamh de. Tá dhá phíosa bogearraí ar leith (ar a dtugtar 'cliaint') ag teastáil chun nód a dhéanamh.

## Réamhriachtanais {#prerequisites}

Ba cheart go dtuigfeá coincheap líonra piara le piaraí agus [bunghnéithe an EVM](/developers/docs/evm/) sula dtéann tú i ngleic níos doimhne leis agus do chás féin de chliant Ethereum a rith. Féach ar ár [réamhrá le haghaidh Ethereum](/developers/docs/intro-to-ethereum/).

Mura bhfuil cur amach agat ar nóid, molaimid ár réamhrá atá éasca le húsáid a sheiceáil ar [nód Ethereum a rith](/run-a-node).

## Cad iad nóid agus cliaint? {#what-are-nodes-and-clients}

Is éard atá i "nód" aon chás de bhogearraí cliant Ethereum atá ceangailte le ríomhairí eile a ritheann bogearraí Ethereum freisin, rud a chruthaíonn líonra. Is éard is cliant ann ná Ethereum a chur i bhfeidhm trína bhfíoraítear sonraí i gcoinne rialacha an phrótacail agus a choimeádann an líonra slán. Caithfidh nód dhá chliaint a rith: cliant comhthola agus cliant forghníomhaithe.

- Éisteann an cliant forghníomhaithe (ar a dtugtar an tInneall Forghníomhaithe, cliant EL nó cliant Eth1 roimhe seo) le hidirbhearta nua a chraoltar sa líonra, déanann sé iad a fhorghníomhú in EVM, agus coinníonn sé an stát agus an bunachar sonraí is déanaí de shonraí reatha Ethereum ar fad.
- Cuireann an cliant comhthoil (ar a dtugtar an Beacon Node, cliant CL nó cliant Eth2 roimhe seo) an t-algartam comhdhearcaidh cruthúnais i bhfeidhm, lena gcuirtear ar chumas an líonra comhaontú a bhaint amach bunaithe ar shonraí bailíochtaithe ón gcliant forghníomhaithe. Tá tríú píosa bogearraí ann freisin, ar a dtugtar 'bailíochtóir' ar féidir a chur leis an gcliant comhdhearcaidh, rud a ligeann do nód a bheith rannpháirteach chun an líonra a dhaingniú.

Oibríonn na cliaint seo le chéile chun súil a choinneáil ar cheann shlabhra Ethereum agus chun ligean d'úsáideoirí idirghníomhú le líonra Ethereum. Tugtar [castacht imchochlaithe](https://vitalik.eth.limo/general/2022/02/28/complexity.html) ar an dearadh modúlach ina bhfuil iliomad bogearraí ag obair le chéile. D'fhág an cur chuige sin é níos fusa [An Cumasc](/roadmap/merge) a rith gan uaim, déanann sé bogearraí cliant níos éasca a chothabháil agus a fhorbairt, agus cumasaíonn sé cliaint aonair a athúsáid, mar shampla, in [éiceachóras chiseal 2](/layer-2/).

![Forghníomhú mar aon le cliaint chomhthola](./eth1eth2client.png) Léaráid shimplithe de chliant forghníomhaithe agus comhdhearcadh cúpláilte.

### Éagsúlacht cliant {#client-diversity}

Tá [cliaint forghníomhaithe](/developers/docs/nodes-and-clients/#execution-clients) agus [cliaint chomhthola](/developers/docs/nodes-and-clients/#consensus-clients) ann i dteangacha éagsúla ríomhchlárúcháin arna bhforbairt ag foirne éagsúla.

Is féidir le feidhmiúcháin iolracha cliant an líonra a neartú trína spleáchas ar bhunachar cód amháin a laghdú. Is é an sprioc idéalach ná éagsúlacht a bhaint amach gan aon chliant a bheith i gceannas ar an líonra, rud a chuirfeadh deireadh le pointe aonair teipe. Tugann éagsúlacht na dteangacha cuireadh freisin do phobal forbróra níos leithne agus ligeann sé dóibh comhtháthú a chruthú ina rogha teanga.

Foghlaim tuilleadh faoi [éagsúlacht cliant](/developers/docs/nodes-and-clients/client-diversity/).

Is é an rud atá i gcoiteann ag na feidhmiúcháin sin ná go leanann siad go léir aon sonraíocht amháin. Leis na sonraíochtaí sin sonraítear an chaoi a bhfeidhmíonn líonra Ethereum agus blocshlabhra. Sainmhínítear gach mionsonra teicniúil agus is féidir sonraíochtaí a fháil amhail:

- Ar dtús, [Páipéar Buí Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Sonraíochtaí forghníomhaithe](https://github.com/ethereum/execution-specs/)
- [Sonraíochtaí comhdhearcaidh](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) arna gcur i bhfeidhm sna [huasghráduithe líonra](/ethereum-forks/)

### Nóid rianaithe sa líonra {#network-overview}

Tairgeann rianairí iolracha forbhreathnú fíor-ama ar nóid i líonra Ethereum. Tabhair faoi deara, mar gheall ar nádúr na ngréasán díláraithe, ní féidir leis na ransaitheoirí sin ach radharc teoranta den líonra a sholáthar agus go bhféadfadh siad torthaí éagsúla a thuairisciú.

- [Léarscáil na nód](https://etherscan.io/nodetracker) le Etherscan
- [Ethernodes](https://ethernodes.org/) le Bitfly
- [Nodewatch](https://www.nodewatch.io/) le Chainsafe, nóid comhaontaithe
- [Monitoreth](https://monitoreth.io/) - le MigaLabs, Uirlis dháilte um monatóireacht líonra

## Cineálacha nód {#node-types}

Más mian leat [do nód féin a rith](/developers/docs/nodes-and-clients/run-a-node/), ba cheart duit a thuiscint go bhfuil cineálacha éagsúla nód ann a ídíonn sonraí ar bhealaí difriúla. Go deimhin, is féidir le cliaint trí chineál éagsúla nóid a rith, mar atá: solas, iomlán agus cartlann. Tá roghanna ann freisin maidir le straitéisí sioncronaithe éagsúla trína gcumasaítear am sioncronaithe níos tapúla. Baineann sioncrónú le cé chomh tapa agus is féidir leis an bhfaisnéis is déanaí a fháil ar staid Ethereum.

### Nód iomlán {#full-node}

Déanann nóid iomlána bailíochtú bloc-ar-bhloc ar an mblocshlabhra, lena n-áirítear corp an bhloic agus na sonraí stáit a íoslódáil agus a fhíorú do gach bloc. Tá aicmí éagsúla nód iomlán ann - tosaíonn cuid acu ón mbloc geineasas agus fíoraíonn siad gach bloc amháin i stair iomlán an blocshlabhra. Tosaíonn daoine eile a bhfíorú ag bloc níos déanaí a bhfuil muinín acu as a bheith bailí (m.sh. ‘snap sync’ Geth). Beag beann ar an áit a dtosaítear an fíorú, ní choinníonn nóid iomlána ach cóip áitiúil de shonraí réasúnta nua (go hiondúil na 128 bloc is déanaí), rud a ligfear do scriosadh sonraí níos sine chun spás diosca a shábháil. Is féidir sonraí níos sine a athghiniúint nuair is gá.

- Stóráiltear sonraí blocshlabhra iomlána (cé go ndéantar é seo a ghearradh go tréimhsiúil ionas nach stórálann nód iomlán na sonraí stáit go léir siar go geineasas)
- Glacann sé páirt i mbailíochtú bloc, fíoraíonn sé gach bloc agus stát.
- Is féidir gach stát a aisghabháil ó stóráil áitiúil nó a ghiniúint ó 'ghrianghraif' le nód iomlán.
- Freastalaíonn sé ar an líonra agus soláthraíonn sé sonraí ach iad a iarraidh.

### Nód cartlainne {#archive-node}

Is nóid iomlána iad nóid chartlainne trína bhfíoraítear gach bloc ón tús agus nach scriostar aon cheann de na sonraí a íoslódáladh riamh.

- Stórálann sé gach rud a choinnítear sa nód iomlán agus tógann sé cartlann de stáit stairiúla. Tá sé ag teastáil más mian leat rud éigin cosúil le hiarmhéid cuntais ar bhloc #4,000,000 a cheistiú, nó do chuid idirbhearta féin a thástáil go simplí agus go hiontaofa gan mianadóireacht a dhéanamh orthu trí úsáid a bhaint as rianú.
- Léiríonn na sonraí sin aonaid teiribheart, rud a fhágann nach bhfuil nóid chartlainne chomh tarraingteach d’úsáideoirí meánacha ach a d’fhéadfadh a bheith áisiúil do sheirbhísí cosúil le blocthaiscéalaithe, díoltóirí sparán, agus anailísíocht slabhra.

Má dhéantar cliaint a shioncronú i modh ar bith seachas sa mhodh cartlainne, déanfar sonraí blocshlabhra prúnáilte díobh. Is é is ciall leis sin nach bhfuil aon chartlann de gach stát stairiúil ach tá an nód iomlán in ann iad a thógáil ar éileamh.

Foghlaim tuilleadh faoi [Nóid chartlainne](/developers/docs/nodes-and-clients/archive-nodes).

### Nód éadrom {#light-node}

In ionad gach bloc a íoslódáil, ní dhéanann nóid solais ach ceanntáisc bloc a íoslódáil. Tá faisnéis achomair sna ceanntáisc sin faoi ábhar na mbloc. Iarrtar aon fhaisnéis eile a theastaíonn ón nód solais ó nód iomlán. Ina dhiaidh sin is féidir leis an nód solais na sonraí a fhaigheann siad a fhíorú go neamhspleách i gcoinne na bhfréamhacha stáit sna ceanntáisc bloc. Cuireann nóid solais ar chumas úsáideoirí páirt a ghlacadh i líonra Ethereum gan na crua-earraí cumhachtacha nó an bandaleithead ard a theastaíonn chun nóid iomlána a rith. Faoi dheireadh, d’fhéadfadh nóid solais rith ar fhóin phóca nó ar ghléasanna leabaithe. Ní ghlacann na nóid solais páirt i gcomhthoil (.i. ní féidir leo a bheith ina mianadóirí/na mbailitheoirí), ach is féidir leo rochtain a fháil ar blocshlabhra Ethereum leis an bhfeidhmiúlacht chéanna agus leis na ráthaíochtaí slándála mar a gheobhadh nód iomlán.

Is réimse forbartha gníomhach é cliaint éadroma do Ethereum agus táimid ag súil le cliaint éadroma nua a fheiceáil don tsraith chomhthola agus don chiseal forghníomhaithe go luath. Tá bealaí féideartha ann freisin chun sonraí cliant éadroma a sholáthar ar an [líonra cúlchainte](https://www.ethportal.net/). Buntáiste is ea sin toisc go bhféadfadh an líonra cúlchainte tacú le líonra de nóid solais gan nóid iomlána a bheith ag teastáil chun freastal ar iarratais.

Ní thacaíonn Ethereum le daonra mór de nóid solais fós, ach tá tacaíocht nód solais ina réimse a bhfuiltear ag súil go bhforbrófar é go tapa go luath amach anseo. Go háirithe, tá cliaint amhail [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) agus [LodeStar](https://lodestar.chainsafe.io/) dírithe go mór ar nóid solais faoi láthair.

## Cén fáth ar chóir dom nód Ethereum a rith? {#why-should-i-run-an-ethereum-node}

Trí nód a rith, is féidir leat Ethereum a úsáid go díreach, go muiníneach agus go príobháideach agus tú ag tacú leis an líonra trína choinneáil níos láidre agus níos díláraithe.

### Sochair duit {#benefits-to-you}

Trí do nód féin a rith, is féidir leat Ethereum a úsáid ar bhealach príobháideach, féin-leordhóthanach agus gan bheith ag brath ar mhuinín a chur i ndaoine eile. Ní gá duit muinín a bheith agat as an líonra mar is féidir leat na sonraí a fhíorú as do stuaim féin le do chliant. Is mantra blocshlabhra coitianta é "Ná habair é, fíoraigh é".

- Trí do nód leis féin fíoraítear na hidirbhearta agus na bloic go léir i gcoinne rialacha comhthola. Ciallaíonn sé sin nach gá duit brath ar aon nóid eile sa líonra ná muinín iomlán a bheith agat astu.
- Is féidir leat sparán Ethereum a úsáid le do nód féin. Is féidir leat daipeanna a úsáid ar bhealach níos sláine agus níos príobháidí mar ní bheidh ort do sheoltaí ná do chuid iarmhéideanna a sceitheadh ​​chuig idirghabhálaithe. Is féidir gach rud a sheiceáil le do chliant féin. Le [MetaMask](https://metamask.io), [Frame](https://frame.sh/) agus [go leor sparán eile](/wallets/find-wallet/) tairgtear RPC-allmhairiú, trína ligtear dóibh do nód a úsáid.
- Is féidir leat seirbhísí eile a bhraitheann ar shonraí ó Ethereum a rith agus féin-óstáil a dhéanamh orthu. Mar shampla, d'fhéadfaí gurb é a bheadh ann ná bailitheoir Shlabhra Beacon, bogearraí cosúil le ciseal 2, bonneagar, taiscéalaithe bloc, próiseálaithe íocaíochta, srl.
- Is féidir leat do chuid [críochphointí RPC](/developers/docs/apis/json-rpc/) saincheaptha féin a sholáthar. D’fhéadfá fiú na críochphointí sin a thairiscint go poiblí don phobal chun cabhrú leo soláthróirí móra láraithe a sheachaint.
- Is féidir leat ceangal le do nód trí úsáid a bhaint as **Cumarsáid Idirphróisis (IPC)** nó an nód a athscríobh chun do ríomhchlár a luchtú mar bhreiseán. Deonaíonn sé sin aga folaigh íseal, rud a chabhraíonn go leor, m.sh. nuair a bhíonn go leor sonraí á bpróiseáil agus leabharlanna Web3 i úsáid nó nuair is gá duit d’idirbhearta a athsholáthar chomh tapa agus is féidir (.i. rith tosaigh).
- Is féidir leat ETH a ghlacadh go díreach chun an líonra a dhaingniú agus luaíochtaí a thuilleamh. Féach ar [gheallchur aonair](/staking/solo/) le tosú.

![Conas rochtain a fháil ar Ethereum trí d'iarratas agus trí nóid](./nodes.png)

### Buntáistí líonra {#network-benefits}

Tá sraith nód éagsúil tábhachtach do shláinte, do shlándáil agus d'athléimneacht oibriúcháin Ethereum.

- Le nóid iomlána forfheidhmítear na rialacha comhaontaithe, ionas nach féidir iad a mhealladh chun glacadh le bloic nach leanann na rialacha comhaontaithe sin. Leis sin soláthraítear slándáil bhreise sa líonra mar dá mba nóid éadroma na nóid go léir, nach ndéanann fíorú iomlán, d'fhéadfadh bailíochtóirí ionsaí a dhéanamh ar an líonra.
- I gcás ionsaí a sháraíonn cosaintí cripte-eacnamaíocha an [chruthúnais geallchuir](/developers/docs/consensus-mechanisms/pos/#what-is-pos), is féidir téarnamh sóisialta a dhéanamh le nóid iomlána a roghnaíonn an slabhra macánta a leanúint.
- Mar thoradh ar níos mó nóid a bheith sa líonra, tá líonra níos éagsúla agus níos láidre ann, arb é sin sprioc dheiridh an díláraithe, trína n‑éascófar córas iontaofa atá frithsheasmhach in éadan na cinsireachta.
- Trí nóid iomlána soláthraítear rochtain ar shonraí blocshlabhra do chliaint éadroma atá ag brath ar a leithéid. Ar nóid solais ní stóráiltear an blocshlabhra iomlán, ina ionad sin, fíoraítear sonraí trí na [fréamhacha stáit sna ceanntáisc bloc](/developers/docs/blocks/#block-anatomy). Is féidir leo tuilleadh eolais a iarraidh ó nóid iomlána má theastaíonn sé uathu.

Má ritheann tú nód iomlán, baineann líonra iomlán Ethereum leas as, fiú mura ritheann tú bailíochtóir.

## Do nód féin a rith {#running-your-own-node}

Spéis agat i rith do chliant Ethereum féin?

Le haghaidh réamhrá atá áisiúil do thosaitheoirí, tabhair cuairt ar ár leathanach [rith nód](/run-a-node) chun tuilleadh a fhoghlaim.

Más úsáideoir níos teicniúla thú, léim isteach sna sonraí agus sna roghanna breise maidir leis an gcaoi chun [do nód féin a thionscnamh](/developers/docs/nodes-and-clients/run-a-node/).

## Roghanna eile {#alternatives}

D’fhéadfadh costas ama agus acmhainní a bheith ort agus do nód féin a chur ar bun ach ní gá duit do chás féin a rith i gcónaí. Sa chás sin, is féidir leat soláthraí API tríú páirtí a úsáid. Le haghaidh forbhreathnú ar úsáid na seirbhísí seo, féach ar [nóid mar sheirbhís](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Má ritheann duine éigin nód Ethereum le API poiblí i do phobal, is féidir leat do sparán a dhíriú ar nód pobail trí Custom RPC agus níos mó príobháideachta a fháil ná le tríú páirtí iontaofa randamach éigin.

Ar an láimh eile, má ritheann tú cliant, is féidir leat é a roinnt le do chairde óna bhféadfadh an cliant a bheith ag teastáil.

## Cliaint fhorghníomhú {#execution-clients}

Coinníonn pobal Ethereum cliaint forghníomhaithe foinse oscailte iolracha (ar a dtugtaí 'cliaint Eth1', nó díreach 'cliaint Ethereum'), arna bhforbairt ag foirne éagsúla trí theangacha cláir éagsúla a úsáid. Leis sin déantar an líonra níos láidre agus níos [ilghnéithí](/developers/docs/nodes-and-clients/client-diversity/). Is é an sprioc idéalach ná éagsúlacht a bhaint amach gan aon chliant a bheith i gceannas chun pointe ar bith teipe a laghdú.

Sa tábla seo déantar achoimre ar na cliaint éagsúla. Éiríonn le gach ceann acu [tástálacha cliant](https://github.com/ethereum/tests) agus coinnítear iad go gníomhach chun fanacht cothrom le dáta le huasghráduithe líonra.

| Cliant                                                                    | Teanga     | Córais oibriúcháin    | Líonraí                   | Straitéisí sioncronaithe                                     | Bearradh stáit      |
| ------------------------------------------------------------------------- | ---------- | --------------------- | ------------------------- | ------------------------------------------------------------ | ------------------- |
| [Geth](https://geth.ethereum.org/)                                        | Téigh      | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync), [Iomlán](#full-sync)                     | Cartlann, prúnáilte |
| [Nethermind](https://www.nethermind.io/)                                  | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync) (gan riar), Go tapa, [Iomlán](#full-sync) | Cartlann, prúnáilte |
| [Besu](https://besu.hyperledger.org/en/stable/)                           | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync), [Go tapa](#fast-sync), [Lán](#full-sync) | Cartlann, prúnáilte |
| [Erigon](https://github.com/ledgerwatch/erigon)                           | Téigh      | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Iomlán](#full-sync)                                         | Cartlann, prúnáilte |
| [Reth](https://reth.rs/)                                                  | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Iomlán](#full-sync)                                         | Cartlann, prúnáilte |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(béite)_ | TypeScript | Linux, Windows, macOS | Sepolia, Holesky          | [Iomlán](#full-sync)                                         | Prúnáilte           |

Le haghaidh tuilleadh faisnéise ar líonraí a dtacaítear leo, léigh tuilleadh faoi [líonraí Ethereum](/developers/docs/networks/).

Tá cásanna úsáide agus buntáistí uathúla ag gach cliant, mar sin ba cheart duit ceann a roghnú bunaithe ar do chuid sainroghanna féin. Tríd an éagsúlacht ligtear d'fheidhmiúcháin díriú ar ghnéithe éagsúla agus ar lucht féachana úsáideoirí. B'fhéidir gur mhaith leat cliant a roghnú bunaithe ar ghnéithe, ar thacaíocht, ar theanga ríomhchlárúcháin nó ar cheadúnais.

### Besu {#besu}

Is éard atá Hyperledger Besu ná cliant Ethereum de ghrád fiontair le haghaidh líonraí poiblí agus ceadaithe. Ritheann sé gnéithe Mainnet Ethereum go léir, ó rianú go GraphQL, tá monatóireacht fhairsing aige agus tacaíonn ConsenSys leis, ar bhealaí pobail oscailte agus trí CLSanna tráchtála le haghaidh fiontar. Tá sé scríofa in Java agus tá ceadúnas Apache 2.0 aige.

Tabharfaidh [doiciméadúchán](https://besu.hyperledger.org/en/stable/) treoir duit trí na sonraí go léir maidir leis na gnéithe agus leis na socruithe a bhaineann leis.

### Erigon {#erigon}

Thosaigh Erigon, ar a dtugtaí Turbo-Geth roimhe seo, mar fhorc de Go Ethereum atá dírithe ar éifeachtúlacht luais agus spáis diosca. Is feidhmiú iomlán ath-ailtireachta é Erigon ar Ethereum, atá scríofa faoi láthair in Go ach tá feidhmiúcháin á bhforbairt i dteangacha eile. Is é sprioc Erigon ná cur i bhfeidhm níos tapúla, níos modúlaí agus níos optamaithe a sholáthar do Ethereum. Is féidir leis sioncrónú nód cartlainne iomlán a dhéanamh trí úsáid a bhaint as thart ar 2TB de spás diosca, laistigh de 3 lá.

### Go Ethereum {#geth}

Tá Go Ethereum (Geth go hachomair) ar cheann de na forfheidhmithe bunaidh de phrótacal Ethereum. Faoi láthair, is é an cliant is forleithne é ar mó an bonn úsáideora agus an éagsúlacht uirlisí aige le haghaidh úsáideoirí agus forbróirí. Tá sé scríofa in Go, ar bhonn foinse iomlán oscailte agus ceadúnaithe faoin GNU LGPL v3.

Foghlaim tuilleadh faoi Geth ina [dhoiciméadúchán](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Is feidhmiú Ethereum é Nethermind a cruthaíodh leis an gcruach teicniúil C# .NET, atá ceadúnaithe le LGPL-3.0, ag rith ar gach ardán mór lena n-áirítear ARM. Cuireann sé feidhmíocht den scoth le:

- meaisín fíorúil optamaithe
- rochtain stáit
- líonrú agus gnéithe saibhir cosúil le deais Prometheus/Grafana, tacaíocht do logáil fiontair seq, rianú JSON-RPC agus breiseáin anailísíochta.

Tá [doiciméid mhionsonraithe](https://docs.nethermind.io), tacaíocht láidir forbartha, pobal ar líne agus tacaíocht 24/7 ar fáil d'úsáideoirí préimhe ag Nethermind freisin.

### Reth {#reth}

Is ionann Reth (nod do Rust Ethereum) agus feidhmiú nód iomlán Ethereum atá dírithe ar a bheith éasca le húsáid, an-modúil, tapa agus éifeachtach. Tógtha agus tiomáinte ag Paradigm Reth ar dtús, tá sé ceadúnaithe faoi cheadúnais Apache agus MIT.

Tá Reth réidh le táirgeadh, agus oiriúnach le húsáid i dtimpeallachtaí misean-criticiúla ar nós seirbhísí geallchuir nó ard-aga fónaimh. Feidhmíonn sé go maith i gcásanna úsáide ina bhfuil ardfheidhmíocht le corrlaigh mhóra ag teastáil, mar shampla gníomhaíochtaí RPC, MEV, innéacsú, insamhaltaí, agus P2P.

Foghlaim tuilleadh ar [Reth Book](https://reth.rs/), nó ar an [Reth GitHub repo](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Forbairt ar bun {#execution-in-development}

Tá na cliaint seo fós i gcéimeanna luatha forbartha agus ní mholtar iad fós le húsáid táirgeachta.

#### EthereumJS {#ethereumjs}

Tá Cliant Reatha EthereumJS (EthereumJS) scríofa i TypeScript agus tá sé comhdhéanta de roinnt pacáistí, lena n-áirítear croí-bhuin Ethereum arna léiriú ag na haicmeí Bloc, Idirbheart, agus Merkle-Patricia Trie agus comhpháirteanna lárnacha cliant lena n-áirítear cur i bhfeidhm Meaisín Fíorúil Ethereum (EVM), aicme blocshlabhra, agus cruach líonraithe DevP2P.

Faigh tuilleadh eolais faoi ach an [doiciméadúchán](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) a léamh

## Cliaint comhdhearcadh {#consensus-clients}

Tá go leor cliant comhdhearcaidh (cliaint 'Eth2' mar a tugadh orthu roimhe seo) ag tacú leis na [uasghráduithe comhdhearcaidh](/roadmap/beacon-chain/). Tá siad freagrach as gach loighic a bhaineann le comhdhearcadh lena n-áirítear an t-algartam forc-rogha, fianuithe a phróiseáil agus bainistiú a dhéanamh ar luach saothair agus pionóis [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos).

| Cliant                                                        | Teanga     | Córais oibriúcháin    | Líonraí                                                       |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Holesky, Pyrmont, Sepolia agus níos mó          |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Holesky, Seplia agus níos mó                    |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Holesky, Seplia agus níos mó                    |
| [Prysm](https://prysm.offchainlabs.com/docs/)   | Téigh      | Linux, Windows, macOS | Beacon Slabhra, Gnosis, Holesky, Pyrmont, Seplia agus níos mó |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Slabhra, Gnosis, Holesky, Seplia agus níos mó          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Beacon Chain, Holesky, Seplia agus níos mó                    |

### Lighthouse {#lighthouse}

Is feidhmiú cliant comhdhearcaidh é Lighthouse atá scríofa i Rust faoi cheadúnas Apache-2.0. Tá sé á chothabháil ag Sigma Prime agus tá sé cobhsaí agus réidh le táirgeadh ó bunaíodh Beacon Chain. Tá fiontair éagsúla, linnte gill agus daoine aonair ag brath air. Tá sé mar aidhm aige a bheith slán, feidhmiúil agus idir-inoibritheach i raon leathan timpeallachtaí, ó ríomhairí pearsanta deisce go dtí imscaradh sofaisticiúla uathoibrithe.

Is féidir doiciméadú a fháil i [Leabhar Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Is éard atá i Lodestar ná feidhmiú cliant comhdhearcaidh atá réidh le táirgeadh atá scríofa i Typescript faoin gceadúnas LGPL-3.0. Tá sé á chothabháil ag ChainSafe Systems agus is é an ceann is nuaí de na cliaint chomhaontaithe le haghaidh páirtithe leasmhara aonair, forbróirí agus taighdeoirí. Tá Lodestar comhdhéanta de nód rabhcáin agus cliant bailíochtóra faoi thiomáint ag feidhmiú JavaScript de phrótacail Ethereum. Tá sé mar aidhm ag Lodestar feabhas a chur ar inúsáidteacht Ethereum le cliaint éadroma, inrochtaineacht a leathnú do ghrúpa níos mó forbróirí agus cur le héagsúlacht éiceachórais a thuilleadh.

Is féidir tuilleadh eolais a fháil ar ár [ suíomh Gréasáin Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Is cur i bhfeidhm cliant comhdhearcaidh é Nimbus atá scríofa i Nim faoin gceadúnas Apache-2.0. Is cliant é atá réidh le táirgeadh agus é in úsáid ag geallsealbhóirí aonair agus ag linnte geallta. Tá Nimbus deartha le haghaidh éifeachtúlacht acmhainní, rud a fhágann go bhfuil sé éasca é a reáchtáil ar fheistí srianta ó thaobh acmhainní agus ar bhonneagar fiontair chomh héasca céanna, gan cur isteach ar chobhsaíocht ná ar fheidhmíocht luach saothair. Ciallaíonn lorg acmhainne níos éadroime go mbíonn lamháil sábháilteachta níos mó ag an gcliant nuair a bhíonn an líonra faoi strus.

Foghlaim tuilleadh in [doiciméid Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Is cliant comhdhearcaidh foinse oscailte lán-tréithe é Prysm atá scríofa in Go faoin gceadúnas GPL-3.0. Tá UI roghnach webapp aige agus tugann sé tosaíocht d’eispéireas úsáideora, do dhoiciméadú agus do chumraíocht d’úsáideoirí geall sa bhaile agus d’úsáideoirí institiúideacha.

Tabhair cuairt ar [Prysm docs](https://prysm.offchainlabs.com/docs/) chun tuilleadh a fhoghlaim.

### Teku {#teku}

Tá Teku ar cheann de chliaint bhunaidh ghiniúint an tSlabhra Rabhcáin. In éineacht leis na gnáthspriocanna (slándáil, stóinseacht, cobhsaíocht, inúsáidteacht, feidhmíocht), tá sé mar aidhm ag Teku go sonrach cloí go hiomlán leis na caighdeáin éagsúla cliant comhaontaithe.

Tairgeann Teku roghanna imlonnaithe an-solúbtha. Is féidir an nód rabhcáin agus an cliant bailíochtóra a rith le chéile mar phróiseas aonair, atá thar a bheith áisiúil do lucht gill aonair, nó is féidir nóid a rith ar leithligh le haghaidh oibríochtaí geallchuir sofaisticiúla. Ina theannta sin, tá Teku go hiomlán idir-inoibritheach le [Web3Signer](https://github.com/ConsenSys/web3signer/) chun eochair-shlándáil agus cosaint slaise a shíniú.

Tá Teku scríofa i Java agus tá ceadúnas Apache 2.0 aige. Tá sé forbartha ag an bhfoireann Prótacail ag ConsenSys atá freagrach freisin as Besu agus Web3Signer. Foghlaim tuilleadh i [Teku docs](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Is cur i bhfeidhm cliant comhdhearcadh é Grandine, scríofa i Rust faoin gceadúnas GPL-3.0. Tá sé á chothabháil ag Foireann Grandine Core agus tá sé tapa, ardfheidhmíoch agus éadrom. Oireann sé do raon leathan geallsealbhóirí, idir geallsealbhóirí aonair a ritheann ar ghléasanna íseal-acmhainne mar Raspberry Pi go geallshealbhóirí institiúideacha móra a bhfuil na mílte bailíochtóirí á rith acu.

Tá doiciméadacht le fáil sa [Grandine Book](https://docs.grandine.io/)

## Modhanna an tsioncrónaithe {#sync-modes}

Chun sonraí reatha an líonra a leanúint agus a fhíorú, ní mór don chliant Ethereum sioncrónú leis an stát líonra is déanaí. Déantar é seo trí shonraí ó phiaraí a íoslódáil, a n-ionracas a fhíorú go cripteagrafach, agus bunachar sonraí blocshlabhra áitiúil a thógáil.

Léiríonn modhanna sioncrónaithe cuir chuige éagsúla don phróiseas seo le comhbhabhtálacha éagsúla. Athraíonn na cliaint freisin i bhfeidhmiú na n-halgartam sioncronaithe. Déan tagairt i gcónaí do dhoiciméadú oifigiúil do chliant roghnaithe le haghaidh sonraí maidir le feidhmiú.

### Modhanna sioncronaithe ciseal forghníomhaithe {#execution-layer-sync-modes}

Féadfar an ciseal reatha a reáchtáil ar mhodhanna éagsúla chun freastal ar chásanna úsáide difriúla, ó staid dhomhanda an bhlocshlabhra a athrith go dtí sioncronú le barr an tslabhra ó sheicphointe iontaofa amháin.

#### Sioncronú iomlán {#full-sync}

Íoslódálann sioncronú iomlán na bloic go léir (lena n-áirítear ceanntásca agus bloc-chomhlachtaí) agus athghintear staid an bhlocshlabhra go hincriminteach trí gach bloc ó geineasas a fhorghníomhú.

- Laghdaíonn sé muinín agus cuireann sé an t-slándáil is airde ar fáil trí gach idirbheart a fhíorú.
- Le méadú ar líon na n-idirbheart, féadfaidh sé laethanta go seachtainí a ghlacadh chun gach idirbheart a phróiseáil.

Déanann [nóid chartlainne](#archive-node) sioncronú iomlán chun stair iomlán na n-athruithe staide a rinne gach idirbheart i ngach bloc a chruthú (agus a choinneáil).

#### Sioncronú tapa {#fast-sync}

Cosúil le sioncronú iomlán, íoslódálann sioncronú tapa gach bloc (lena n-áirítear ceanntásca, idirbhearta agus admhálacha). Mar sin féin, in ionad na hidirbhearta stairiúla a athphróiseáil, braitheann sioncronú tapa ar na fáltais go dtí go sroicheann sé ceann le déanaí, nuair a aistríonn sé go bloic allmhairithe agus próiseála chun nód iomlán a sholáthar.

- Straitéis sioncronaithe tapa.
- Laghdaíonn sé éileamh próiseála i bhfabhar úsáid bandaleithead.

#### Sioncrónú tobann {#snap-sync}

Fíoraíonn sioncronaithe snap an slabhra bloc-ar-bhloc freisin. Mar sin féin, in ionad tosú ag an mbloc ginis, tosaíonn sioncronú Léim ag seicphointe 'muiníneach' níos déanaí a bhfuil aithne air a bheith mar chuid den fhíor-blocshlabhra. Sábhálann an nód seicphointí tréimhsiúla agus sonraí níos sine ná aois áirithe á scriosadh. Úsáidtear na pictiúir seo chun sonraí staide a athghiniúint de réir mar is gá, seachas iad a stóráil go deo.

- An straitéis sioncronaithe is tapúla, réamhshocraithe faoi láthair in Ethereum Mainnet.
- Sábhálann sé go leor úsáid dioscaí agus bandaleithead líonra gan an tslándáil a íobairt.

[Tuilleadh faoin sioncronú tobann](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Sioncronú éadrom {#light-sync}

Íoslódálann mód cliant éadrom gach ceanntásc bloic, sonraí bloic, agus fíoraíonn sé cuid acu go randamach. Ní shioncronaítear ach barr an tslabhra ón seicphointe iontaofa.

- Ní fhaigheann sé ach an staid is déanaí agus é ag brath ar iontaoibh i bhforbróirí agus meicníocht chomhthoil.
- Cliant réidh le húsáid le staid reatha an líonra i gcúpla nóiméad.

**NB** Ní oibríonn an sioncronú éadrom fós le Ethereum cruthúnais-gill - ba cheart leaganacha nua de shioncronú solais a sheoladh go luath!

[Níos mó faoi chliaint éadroma](/developers/docs/nodes-and-clients/light-clients/)

### Modhanna sioncronaithe ciseal comhdhearcaidh {#consensus-layer-sync-modes}

#### Sioncronú dóchasach {#optimistic-sync}

Is straitéis shioncronaithe iar-chumasc é sioncronú dóchasach atá deartha le bheith ag luí le rogha glactha agus comhoiriúnach go siarghabhálach, rud a ligeann do nóid reatha sioncrónú trí mhodhanna seanbhunaithe. Is féidir leis an inneall reatha _go dóchasach_ bloic rabhcháin a allmhairiú gan iad a fhíorú go hiomlán, an ceann is déanaí a aimsiú, agus ansin tosú ar an slabhra a shioncronú leis na modhanna thuas. Ansin, tar éis don chliant reatha breith suas, cuirfidh sé an cliant comhdhearcadh ar an eolas faoi bhailíocht na n-idirbheart sa Slabhra Rabhcáin.

[Tuilleadh faoin sioncronú dóchasach](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Sioncronú seicphointe {#checkpoint-sync}

Cruthaíonn sioncrónú seicphointe, ar a dtugtar sioncronú suibiachtúlachta lag freisin, eispéireas úsáideora níos fearr chun Nód Rabhcháin a shioncronú. Tá sé bunaithe ar thoimhdí [suibiachtúlacht lag](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) a chuireann ar chumas an Slabhra Rabhcáin a shioncronú ó sheicphointe suibiachtúlachta lag le déanaí seachas géineas. Déanann sioncronaithe seicphointe an t-am sioncronaithe tosaigh i bhfad níos tapúla le boinn tuisceana iontaoibhe cosúil leis an sioncronú ó [ghineas](/glossary/#genesis-block).

Go praiticiúil, ciallaíonn sé seo go nascann do nód le cianfhreastalaí chun staid chríochnaithe le déanaí a íoslódáil agus leanann sé ag fíorú sonraí ón bpointe sin. Tá muinín ag an tríú pháirtí a sholáthraíonn na sonraí agus ba cheart iad a phiocadh go cúramach.

Tuilleadh faoi [sioncronú seicphointe](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Tuilleadh léitheoireachta {#further-reading}

- [Ethereum 101 - Cuid 2 - Nóid a Thuiscint](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Feabhra 2019_
- [Rith Nóid Iomlána Ethereum: Treoir do Dhaoine ar Bheagán Spreagadh ](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Samhain 2019_

## Ábhair ghaolmhara {#related-topics}

- [Bloic](/developers/docs/blocks/)
- [Líonraí](/developers/docs/networks/)

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Déan nód bailíochta as do Raspberry Pi 4 trí chárta MicroSD a splancadh – Treoir suiteála](/developers/tutorials/run-node-raspberry-pi/) _ – Splancaigh do Raspberry Pi 4, plugáil isteach cábla ethernet, ceangail an diosca SSD agus las an gléas le nód iomlán Ethereum a dhéanamh den Raspberry Pi 4 a ritheann an ciseal forghníomhaithe (Mainnet) agus / nó an ciseal comhtdhearcaidh (Beacon Chain / validator)._
