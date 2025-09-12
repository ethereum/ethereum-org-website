---
title: Nóid mar sheirbhís
description: Forbhreathnú ar leibhéal iontrála ar sheirbhísí nód, na buntáistí agus na míbhuntáistí, agus na soláthraithe móréilimh.
lang: ga
sidebarDepth: 2
---

## Réamhrá {#Introduction}

D'fhéadfadh sé a bheith dúshlánach do [nód Ethereum féin](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) a rith, go háirithe agus tú ag tosú amach nó ag scálú go tapa. Tá [líon seirbhísí](#popular-node-services) ann a ritheann bonneagair nóid optamaithe duit, ionas gur féidir leat díriú ar d'fheidhmchlár nó do tháirge a fhorbairt ina ionad sin. Míneoimid conas a oibríonn seirbhísí nóid, na buntáistí agus na míbhuntáistí a bhaineann lena n-úsáid agus liostáilimid soláthraithe má tá suim agat tosú.

## Réamhriachtanais {#prerequisites}

Mura bhfuil tuiscint agat cheana féin ar cad is nóid agus cliaint ann, seiceáil amach [Nóid agus cliaint](/developers/docs/nodes-and-clients/).

## Gealltóirí {#stakoooooooooooooors}

Caithfidh gealltóirí aonair a mbonneagar féin a rith seachas a bheith ag brath ar sholáthraithe tríú páirtí. Ciallaíonn sé seo cliant reatha a rith mar aon le cliant comhdhearcaidh. Roimh [An Cumasc](/roadmap/merge), bhíothas in ann cliant comhdhearcaidh amháin a rith agus soláthraí láraithe a úsáid le haghaidh sonraí reatha; ní féidir é seo a dhéanamh a thuilleadh - caithfidh geallsealbhóir aonair an dá chliaint a rith. Mar sin féin, tá seirbhísí ar fáil chun an próiseas seo a éascú.

[Léigh tuilleadh faoi nód a rith](/developers/docs/nodes-and-clients/run-a-node/).

Is le haghaidh nóid nach nóid geallchuir iad na seirbhísí a gcuirtear síos orthu ar an leathanach seo.

## Conas a oibríonn seirbhísí nód? {#how-do-node-services-work}

Reáchtálann soláthraithe seirbhíse nód cliaint nód dáilte duit sa chúlra, ionas nach gá duitse.

De ghnáth soláthraíonn na seirbhísí seo eochair API ar féidir leat a úsáid chun scríobh chuig an blocshlabhra agus léamh uaidh. Áirítear leo go minic rochtain ar [Ethereum testnets](/developers/docs/networks/#ethereum-testnets) chomh maith le Mainnet.

Tairgeann roinnt seirbhísí do nód tiomnaithe féin duit a bhainistíonn siad duit, agus úsáideann seirbhísí eile cothromóirí ualaigh chun gníomhaíocht a dháileadh thar nóid.

Tá sé thar a bheith éasca beagnach gach seirbhís nóid a chomhtháthú, lena n-áirítear athruithe aon líne amháin i do chód chun do nód féin-óstach a mhalartú, nó fiú aistriú idir na seirbhísí iad féin.

Go minic rithfidh seirbhísí nód raon de [cliaint nód](/developers/docs/nodes-and-clients/#execution-clients) agus [cineálacha](/developers/docs/nodes-and-clients/#node-types), rud a ligeann duit rochtain a fháil ar nóid iomlána agus ar nóid chartlainne chomh maith le modhanna atá sainiúil don chliant in aon API amháin.

Tá sé tábhachtach a thabhairt faoi deara nach stórálann agus nár cheart do sheirbhísí nód d’eochracha príobháideacha nó d’fhaisnéis a stóráil.

## Cad iad na buntáistí a bhaineann le seirbhís nód a úsáid? {#benefits-of-using-a-node-service}

Is é an buntáiste is mó a bhaineann le seirbhís nód a úsáid ná nach gá duit am innealtóireachta a chaitheamh ag cothabháil agus ag bainistiú nóid tú féin. Ligeann sé seo duit díriú ar do tháirge a thógáil seachas a bheith buartha faoi chothabháil bonneagair.

Is féidir leis a bheith costasach do chuid nóid féin a rith ó stóráil go bandaleithead go ham luachmhar innealtóireachta. Is féidir leis a bheith costasach do chuid nóid féin a rith ó stóráil go bandaleithead go ham luachmhar innealtóireachta.

## Cad iad na míbhuntáistí a bhaineann le Seirbhís Nód a úsáid? {#cons-of-using-a-node-service}

Trí sheirbhís nód a úsáid tá gné bhonneagair do tháirge á lárú agat. Ar an ábhar sin, b’fhéidir gurbh fhearr le tionscadail a thugann an tábhacht is mó don dílárú nóid fhéin-óstála seachas foinsiú allamuigh chuig tríú páirtí.

Léigh tuilleadh faoi na [sochair a bhaineann le do nód féin a rith](/developers/docs/nodes-and-clients/#benefits-to-you).

## Seirbhísí nód coitianta {#popular-node-services}

Seo liosta de chuid de na soláthraithe nód Ethereum is mó tóir, ná bíodh leisce ort aon cheann atá in easnamh a chur leis! Cuireann gach seirbhís nód buntáistí agus gnéithe éagsúla ar fáil chomh maith le sraitheanna saor in aisce nó íoctha, ba cheart duit fiosrú a dhéanamh ar na cinn is fearr a oireann do do riachtanais sula ndéanann tú cinneadh.

- [**Alchemy**](https://alchemy.com/)
  - [Doiciméid](https://docs.alchemyapi.io/)
  - Gnéithe
    - An tsraith saor in aisce is mó le 300M aonad ríofa in aghaidh na míosa (~ 30M iarratas getLatestBlock)
    - Tacaíocht ilslabhra do Polygon, Starknet, Optimism, Arbitrum
    - Cumhacht ~70% den mhéid is mó dapps Ethereum agus DeFi
    - Foláirimh fíor-ama ar an ngréasán trí Alchemy Notify
    - Tacaíocht aicme is fearr agus iontaofacht / cobhsaíocht
    - API NFT Alchemy
    - Deais le Request Explorer, Mempool Watcher, agus Cumadóir
    - Rochtain sconna testnet comhtháite
    - Pobal tógálaí Discord Gníomhach le 18k úsáideoirí

- [**An Nód Sin go léir**](https://allthatnode.com/)
  - [Doiciméid](https://docs.allthatnode.com/)
  - Gnéithe
    - 50,000 iarratas in aghaidh an lae le sraith saor in aisce
    - Tacaíocht do níos mó ná 40 prótacal
    - Tacaítear le JSON-RPC (EVM, Tendermint), REST, agus APIs Websocket
    - Rochtain neamhtheoranta ar shonraí cartlainne
    - Tacaíocht theicniúil 24/7 agus 99.9% thar aga fónaimh
    - Sconna ar fáil ar ilslabhraí
    - Rochtain críochphointe gan teorainn le líon gan teorainn eochracha API
    - Tacaítear le Trace/Debug API
    - Nuashonruithe uathoibrithe

- [**Blocshlabhra Bainistithe Amazon**](https://aws.amazon.com/managed-blockchain/)
  - [Doiciméid](https://aws.amazon.com/managed-blockchain/resources/)
  - Gnéithe
    - Nóid Ethereum faoi bhainistiú iomlán
    - Ar fáil i sé réigiún
    - JSON-RPC thar HTTP agus WebSockets slán
    - Tacaíonn 3 slabhraí
    - CLS, Tacaíocht AWS 24/7
    - Go-ethereum agus Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Doiciméid](https://docs.ankr.com/)
  - Gnéithe
    - Prótacal Ankr - rochtain oscailte ar chríochphointí API RPC Poiblí le haghaidh 8+ slabhraí
    - Cothromú ualaigh agus monatóireacht ar shláinte nód le haghaidh geata tapa iontaofa chuig an nód is gaire atá ar fáil
    - Sraith préimhe a chumasaíonn críochphointe WSS agus teorainn an ráta gan chaidhp
    - Nód iomlán aon-clic agus imscaradh nód bailíochtóra le haghaidh 40+ slabhraí
    - Scálú mar a théann tú
    - Uirlisí anailísíochta
    - Deais
    - Críochphointí RPC, HTTPS agus WSS
    - Tacaíocht dhíreach

- [**Blast**](https://blastapi.io/)
  - [Doiciméid](https://docs.blastapi.io/)
  - Gnéithe
    - Tacaíocht RPC agus WSS
    - Óstáil nód il-réigiúin
    - Bonneagar díláraithe
    - API Poiblí
    - Plean tiomnaithe saor in aisce
    - Tacaíocht ilshlabhra (17+ blocshlabhra)
    - Nóid Chartlainne
    - Tacaíocht Discord 24/7
    - Monatóireacht 24/7 agus foláirimh
    - SLA foriomlán 99.9%
    - Íoc le criptea-airgeadra

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Doiciméid](https://ubiquity.docs.blockdaemon.com/)
  - Sochair
    - Deais
    - Per bhonn nód
    - Anailísíocht

- [**BlockPI**](https://blockpi.io/)
  - [Doiciméid](https://docs.blockpi.io/)
  - Gnéithe
    - Struchtúr nód láidir & dáilte
    - Suas le 40 críochphointe HTTPS agus WSS
    - Pacáiste clárúcháin saor in aisce agus pacáiste míosúil
    - Modh rian + Tacaíocht sonraí Cartlainne
    - Pacáistí suas le bailíocht 90 lá
    - Plean saincheaptha agus íocaíocht íoc mar a úsáidtear
    - Íoc le criptea-airgeadra
    - Tacaíocht dhíreach & Tacaíocht theicniúil

- [**Bonn slabhra**](https://www.chainbase.com/)
  - [Doiciméid](https://docs.chainbase.com)
  - Gnéithe
    - Seirbhís RPC atá ar fáil go réidh, an-tapa agus inscálaithe
    - Tacaíocht ilshlabhra
    - Taraifí saor in aisce,
    - Deais atá éasca le húsáid
    - Soláthraíonn sé seirbhísí sonraí blocshlabhra lasmuigh de RPC

- [**Chainstack**](https://chainstack.com/)
  - [Doiciméid](https://docs.chainstack.com/)
  - Gnéithe
    - Nótaí comhroinnte in aisce
    - Nóid chartlainne chomhroinnte
    - Tacaíocht GraphQL
    - Críochphointí RPC agus WSS
    - Nóid iomlána agus chartlainne tiomnaithe
    - Am sioncronaithe tapa le haghaidh imlonnaithe tiomnaithe
    - Beir leat do néal
    - Praghsanna íoc in aghaidh na huaire
    - Tacaíocht dhíreach 24/7

- [**DRPC**](https://drpc.org/)
  - [Doiciméid](https://docs.drpc.org/)
  - Gnéithe
    - Nóid RPC díláraithe
    - 15+ Soláthraí Nód
    - Nód-chothromú
    - Aonaid ríomha neamhtheoranta in aghaidh na míosa ar an tsraith shaor
    - Fíorú sonraí
    - Críochphointí saincheaptha
    - Críochphointí HTTP agus WSS
    - Eochracha neamhtheoranta (sraith saor in aisce agus íoctha)
    - Roghanna cúltaca solúbtha
    - [Críochphointe Poiblí](https://eth.drpc.org)
    - Nótaí cartlann comhroinnte in aisce

- [**GetBlock**](https://getblock.io/)
  - [Doiciméid](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Gnéithe
    - Rochtain ar 40+ nóid blocshlabhra
    - 40K iarratas laethúil saor in aisce
    - Líon neamhtheoranta eochracha API
    - Luas ceangail ard ag 1GB/soic
    - Lorg+Cartlann
    - Anailísíocht fhorbartha
    - Nuashonruithe uathoibrithe
    - Tacaíocht theicniúil

- [**InfStones**](https://infstones.com/)
  - Gnéithe
    - Rogha sraith saor in aisce,
    - Scálú mar a théann tú
    - Anailísíocht
    - Deais
    - Críochphointí uathúla API
    - Nóid iomlána tiomnaithe
    - Am sioncronaithe tapa le haghaidh imlonnaithe tiomnaithe
    - Tacaíocht dhíreach 24/7
    - Rochtain ar 50+ nóid blocshlabhra

- [**Infura**](https://infura.io/)
  - [Doiciméid](https://infura.io/docs)
  - Gnéithe
    - Rogha sraith saor in aisce,
    - Scálú mar a théann tú
    - Sonraí cartlainne íoctha
    - Tacaíocht Dhíreach
    - Deais

- [**Kaleido**](https://kaleido.io/)
  - [Doiciméid](https://docs.kaleido.io/)
  - Gnéithe
    - Sraith tosaitheora saor in aisce
    - Imscaradh nód Ethereum aon-chlic
    - Cliaint agus halgartaim inoiriúnaithe (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ API riaracháin agus seirbhíse
    - Comhéadan RESTful le haghaidh aighneacht idirbheart Ethereum (le tacaíocht Apache Kafka)
    - Sruthanna amach le haghaidh seachadadh imeachtaí (le tacaíocht Apache Kafka)
    - Bailiúchán domhain de sheirbhísí “as slabhra” agus coimhdeacha (m.sh. iompar teachtaireachta déthaobhach criptithe)
    - Clárú líonra simplí le rialachas agus rialú rochtana rólbhunaithe
    - Bainistíocht úsáideora shofaisticiúil do riarthóirí agus úsáideoirí deiridh araon
    - Bonneagar ard-inscálaithe, athléimneach, de ghrád fiontair
    - Bainistíocht eochair phríobháideach Cloud HSM
    - Teaghránú Ethereum Mainnet
    - ISO 27k agus SOC 2, deimhnithe Cineál 2
    - Cumraíocht dinimiciúil ama rite (m.sh. comhtháthú néil a chur leis, pointí iontrála nód a athrú, srl.)
    - Tacaíocht d'eagrúcháin imlonnaithe il-scamall, il-réigiúin agus hibrideacha
    - Praghsanna simplí bunaithe ar SaaS in aghaidh na huaire
    - SLAanna agus tacaíocht 24x7

- [**Líonra Lava**](https://www.lavanet.xyz/)
  - [Doiciméid](https://docs.lavanet.xyz/)
  - Gnéithe
    - Testnet úsáid saor in aisce
    - Iomarcaíocht Díláraithe le haghaidh Aga fónaimh Ard
    - Foinse oscailte
    - SDK go hiomlán díláraithe
    - Comhtháthú Ethers.js
    - Comhéadan Bainistíochta Tionscadal iomasach
    - Sláine Sonraí Bunaithe ar Chomhdhearcadh
    - Tacaíocht Il-shlabhra

- [**Moralis**](https://moralis.io/)
  - [Doiciméid](https://docs.moralis.io/)
  - Gnéithe
    - Nótaí comhroinnte in aisce
    - Nótaí cartlann comhroinnte in aisce
    - Dírithe ar phríobháideachas (gan aon pholasaí logaí)
    - Tacaíocht tras-slabhra
    - Scálú mar a théann tú
    - Deais
    - SDK Uathúil Ethereum
    - Críochphointí uathúla API
    - Tacaíocht dhíreach, theicniúil

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Doiciméid](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Gnéithe
    - Seirbhísí API RPC iontaofa, tapa agus inscálaithe
    - API feabhsaithe d'fhorbróirí Web3
    - Tacaíocht ilshlabhra
    - Tosaigh in aisce

- [**NOWNodes**](https://nownodes.io/)
  - [Doiciméid](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Gnéithe
    - Rochtain ar 50+ nóid blocshlabhra
    - Eochair API in aisce
    - Taiscéalaithe Bloc
    - Am Freagartha API ⩽ 1 soic
    - Foireann Tacaíochta 24/7
    - Bainisteoir Cuntas Pearsanta
    - Nóid chomhroinnte, chartlainne, chúltaca agus tiomnaithe

- [**Líonra póca**](https://www.pokt.network/)
  - [Doiciméid](https://docs.pokt.network/home/)
  - Gnéithe
    - Prótacal RPC agus Ionad Margaidh díláraithe
    - 1M Iarratas in aghaidh an Lae ar an Sraith In Aisce (in aghaidh an chríochphointe, uasmhéid 2)
    - [Críochphointí Poiblí](https://docs.pokt.network/developers/public-endpoints)
    - Clár Réamh-Gheall+ (má tá níos mó ná 1M iarratas uait in aghaidh an lae)
    - 15+ Blocshlabhraí Tacaithe
    - 6400+ Nóid ag tuilleamh POKT le haghaidh feidhmchlár freastail
    - Nód Cartlainne, Nód Cartlainne w/ Rianú, & Tacaíocht Nód Testnet
    - Éagsúlacht Cliant Nód Ethereum Mainnet
    - Gan Aon Phointe Teip amháin
    - Am Neamhfhónaimh: Náid
    - Comharthaí-namaíocht Neas-Náid Chostas-Éifeachtach (geall POKT uair amháin le haghaidh bandaleithead líonra)
    - Gan aon chostais bháite míosúla, déan sócmhainn as do bhonneagar
    - Comhardú Ualaigh ionsuite sa Phrótacal
    - Scálú gan teorainn ar líon na n-iarratas in aghaidh an lae agus nóid in aghaidh na huaire de réir mar a théann tú ar aghaidh
    - An rogha is príobháidí, friotaíoch ar chinsireacht
    - Tacaíocht fhorbróra láimhe
    - [ Tairseach Pocket](https://bit.ly/ETHorg_POKTportal) deais agus anailísíocht

- [**QuickNode**](https://www.quicknode.com)
  - [Doiciméid](https://www.quicknode.com/docs/)
  - Gnéithe
    - Tacaíocht theicniúil 24/7 & Pobal forbróirí Discord
    - Líonra geochothromaithe, il-scamall/miotail, aga folaigh íseal
    - Tacaíocht ilslabhra (Optimism, Arbitrum, Polagán + 11 cinn eile)
    - Lár-sraitheanna do luas & cobhsaíocht (ródú glaonna, taisce, innéacsú)
    - Monatóireacht ar Chonarthaí Cliste trí Webooks
    - Deais iomasach, sraith anailíse, cumadóir RPC
    - Ard ghnéithe slándála (JWT, mascadh, geal-liostú)
    - API sonraí agus anailísíochta NFT
    - [SOC2 Deimhnithe](https://www.quicknode.com/security)
    - Oiriúnach d'Fhorbróirí Fiontair

- [**Rivet**](https://rivet.cloud/)
  - [Doiciméid](https://rivet.readthedocs.io/en/latest/)
  - Gnéithe
    - Rogha sraith saor in aisce,
    - Scálú mar a théann tú

- [**SenseiNode**](https://senseinode.com)
  - [Doiciméid](https://docs.senseinode.com/)
  - Gnéithe
    - Nóid Tiomnaithe agus Chomhroinnte
    - Deais
    - Óstáil AWS ar sholáthraithe óstála iolracha thar láithreacha éagsúla i Meiriceá Laidineach
    - Cliaint Prysm agus Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Doiciméid](https://docs.settlemint.com/)
  - Gnéithe
    - Triail saor in aisce
    - Scálú mar a théann tú
    - Tacaíocht GraphQL
    - Críochphointí RPC agus WSS
    - Nóid iomlána tiomnaithe
    - Beir leat do néal
    - Uirlisí anailísíochta
    - Deais
    - Praghsanna íoc in aghaidh na huaire
    - Tacaíocht dhíreach

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Doiciméid](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Gnéithe
    - Sraith saor in aisce lena n-áirítear 25 milliún Aonad Tairisceana in aghaidh na míosa
    - Rochtain ar shonraí stairiúla saor in aisce,
    - Suas le 8x ualaí oibre trom inléite níos tapúla
    - Rochtain léite comhsheasmhach 100%
    - Críochphointí JSON-RPC
    - Tógálaí iarratais RPC bunaithe ar Chomhéadain agus réamhamharc iarratais
    - Comhtháite go docht le huirlisí forbartha, dífhabhtaithe agus tástála Tenderly
    - Insamhaltaí idirbhirt
    - Anailísíocht úsáide agus scagadh
    - Bainistíocht eochair rochtana éasca
    - Tacaíocht thiomnaithe innealtóireachta trí chomhrá, ríomhphost, agus Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Doiciméid](https://services.tokenview.io/docs?type=nodeService)
  - Gnéithe
    - Tacaíocht theicniúil 24/7 & Pobal Dev Telegram
    - Tacaíocht Ilslabhra (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Tá críochphointí RPC agus WSS ar fáil le húsáid
    - Rochtain neamhtheoranta ar shonraí cartlainne API
    - Deais le Request Explorer agus Mempool Watcher
    - Tugann API sonraí NFT agus Webhook fógra
    - Íoc i gCriptea-airgeadra
    - Tacaíocht sheachtrach do riachtanais iompair bhreise

- [**Watchdata**](https://watchdata.io/)
  - [Doiciméid](https://docs.watchdata.io/)
  - Gnéithe
    - Iontaofacht sonraí
    - Ceangal gan bhriseadh gan aon aga neamhfhónaimh
    - Uathoibriú próisis
    - Taraifí saor in aisce,
    - Teorainneacha arda a oireann d'aon úsáideoir
    - Tacaíocht do nóid éagsúla
    - Scálú acmhainní
    - Luasanna próiseála ard

- [**ZMOK**](https://zmok.io/)
  - [Doiciméid](https://docs.zmok.io/)
  - Gnéithe
    - Rith tosaigh mar sheirbhís
    - Mempool idirbhearta domhanda le modhanna cuardaigh/scagtha
    - Táille TX neamhtheoranta agus Gás gan teorainn le haghaidh idirbhearta a sheoladh
    - An fháil bhloc nua agus an léamh blocshlabhra is tapúla
    - An praghas is fearr in aghaidh ráthaíocht glao API

- [**Zeeve**](https://www.zeeve.io/)
  - [Doiciméid](https://www.zeeve.io/docs/)
  - Gnéithe
    - Ardán uathoibrithe gan chóid de ghrád fiontair a sholáthraíonn imscaradh, monatóireacht agus bainistiú nóid agus líonraí Blocshlabhra
    - 30+ Prótacal Tacaithe & Comhtháthú, agus tuilleadh a chur leis
    - Seirbhísí bonneagair breisluacha web3 amhail stóráil díláraithe, céannacht dhíláraithe agus APIanna sonraí Blocshlabhra Mórleabhar le haghaidh cásanna úsáide sa saol fíor
    - Cinntíonn tacaíocht 24/7 agus monatóireacht réamhghníomhach sláinte na nóid an t-am ar fad.
    - Tugann críochphointí RPC rochtain fhíordheimhnithe ar APInna, bainistíocht gan strus le painéal iomasach agus anailísíocht.
    - Soláthraíonn sé an dá néal bainistithe agus tabharfaidh tú do roghanna néil féin le roghnú astu agus tacaíonn sé le gach mórsholáthraí néil mar AWS, Azure, Google Cloud, Digital Ocean agus ar-áitreabh.
    - Bainimid úsáid as ródú cliste chun an nód is gaire do d'úsáideoir a bhualadh gach uair


## Tuilleadh léitheoireachta {#further-reading}

- [Liosta de sheirbhísí nód Ethereum](https://ethereumnodes.com/)

## Ábhair ghaolmhara {#related-topics}

- [Nóid agus cliaint](/developers/docs/nodes-and-clients/)

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Tús a chur le forbairt Ethereum ag baint úsáide as Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Treoir maidir le hidirbhearta a sheoladh le web3 agus Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
