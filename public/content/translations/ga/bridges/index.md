---
title: Réamhrá ar dhroichid bhlocshlabhra
description: Ceadaíonn Droichid úsáideoirí a gcuid cistí a bhogadh thar bhlocshlabhraí éagsúla
lang: ga
---

# Droichid Bhlocshlabhra {#prerequisites}

_Tá Web3 tagtha chun cinn ina éiceachóras de bhlocshlabhraí L1 agus réitigh scálaithe L2, gach ceann acu deartha le cumais uathúla agus comhbhabhtálacha. De réir mar a mhéadaíonn líon na bprótacal blocshlabhra, is amhlaidh a thagann méadú ar an éileamh ar shócmhainní a aistriú thar shlabhraí. Chun an t-éileamh seo a chomhlíonadh, tá droichid de dhíth orainn._

<Divider />

## Cad is droichid ann? {#what-are-bridges}

Oibríonn droichid bhlocshlabhra díreach cosúil leis na droichid atá ar eolas againn sa domhan fisiceach. Díreach mar a nascann droichead fisiceach dhá shuíomh fisiceach, nascann droichead blocshlabhra dhá éiceachóras blocshlabhra. **Éascaíonn droichid cumarsáid idir blocshlabhraí trí fhaisnéis agus sócmhainní a aistriú**.

Déanaimis machnamh ar shampla:

Is as SAM thú agus tá turas chun na hEorpa á phleanáil agat. Tá USD agat, ach teastaíonn EUR uait le caitheamh. Chun do USD a mhalartú le haghaidh EUR is féidir leat malartú airgeadra a úsáid ar tháille bheag.

Ach, cad a dhéanfaidh tú más mian leat malartú comhchosúil a dhéanamh chun [blocshlabhra](/glossary/#blockchain) eile a úsáid? Deirimis gur mhaith leat [ETH](/glossary/#ether) a mhalartú ar Ethereum Mainnet le haghaidh ETH ar [Arbitrum](https://arbitrum.io/). Cosúil leis an malartú airgeadra a rinneamar le haghaidh EUR, ní mór dúinn meicníocht chun ár gcuid ETH a bhogadh ó Ethereum go Arbitrum. Déanann droichid idirbheart den sórt sin is féidir. Sa chás seo, [Tá droichead dúchais ag Arbitrum](https://bridge.arbitrum.io/) a fhéadfaidh ETH a aistriú ó Mainnet go Arbitrum.

## Cén fáth a bhfuil droichid de dhíth orainn? {#why-do-we-need-bridges}

Tá a gcuid teorainneacha ag gach blocshlabhra. Chun go n-éireodh le Ethereum scála agus coinneáil suas leis an éileamh, bhí [rollaithe](/glossary/#rollups) ag teastáil uaidh. De rogha air sin, déantar L1anna cosúil le Solana agus Avalanche a dhearadh ar bhealach difriúil chun tréchur níos airde a chumasú ach ar chostas an díláraithe.

Mar sin féin, forbraítear gach blocshlabhra i dtimpeallachtaí iargúlta agus tá rialacha éagsúla agus meicníochtaí [comhdhearcaidh](/glossary/#consensus) acu. Ciallaíonn sé sin nach féidir leo cumarsáid dhúchasach a dhéanamh, agus ní féidir le comharthaí gluaiseacht faoi shaoirse idir blocshlabhraí.

Tá droichid ann chun blocshlabhra a nascadh, rud a ligeann d’aistriú faisnéise agus comharthaí eatarthu.

**Le droichead cumasaítear**:

- aistriú tras-shlabhra sócmhainní agus faisnéise.
- [daipeanna](/glossary/#dapp) chun rochtain a fháil ar láidreachtaí na mblocshlabhraí éagsúla – ar an gcaoi sin feabhsaítear a gcumas (mar go bhfuil níos mó spáis dearaidh ag prótacail anois don nuálaíocht).
- úsáideoirí chun rochtain a fháil ar ardáin nua agus na buntáistí a bhaineann le slabhraí éagsúla a ghiaráil.
- forbróirí ó éiceachórais blocshlabhraí éagsúla chun comhoibriú agus ardáin nua a thógáil do na húsáideoirí.

[Conas comharthaí a aistriú go ciseal 2](/guides/how-to-use-a-bridge/)

<Divider />

## Cásanna úsáide droichid {#bridge-use-cases}

Seo a leanas roinnt cásanna inar féidir leat droichead a úsáid:

### Táillí idirbheartaíochta níos ísle {#transaction-fees}

Cuir is gcás go bhfuil ETH agat ar Ethereum Mainnet ach ba mhaith leat táillí idirbheart níos saoire chun daipeanna éagsúla a iniúchadh. Trí do chuid ETH a aistriú ón Mainnet go dtí rollaí Ethereum L2, is féidir leat tairbhe a bhaint as táillí idirbhirt níos ísle.

### Daipeanna ar bhlocshlabhraí eile {#dapps-other-chains}

Má tá Aave á úsáid agat ar Ethereum Príomhlíonra chun USDT a sholáthar ach tá an ráta úis a fhéadfaidh tú a fháil chun USDT a sholáthar ag baint úsáide as Aave ar Polygon níos airde.

### Déan iniúchadh ar éiceachórais blocshlabhra {#explore-ecosystems}

Má tá ETH agat ar Ethereum Mainnet agus ba mhaith leat alt L1 a iniúchadh chun triail a bhaint as a gcuid daipeanna dúchais. Is féidir leat droichead a úsáid chun do chuid ETH a aistriú ó Ethereum Mainnet go dtí alt L1.

### Sócmhainní dúchasacha crypto a bheith agat {#own-native}

Deirimis gur mhaith leat Bitcoin dúchais (BTC) a bheith agat, ach níl cistí agat ach ar Ethereum Mainnet. Chun nochtadh do BTC a fháil ar Ethereum, is féidir leat Bitcoin Fillte (WBTC) a cheannach. Mar sin féin, is comhartha [ERC-20](/glossary/#erc-20) é WBTC ó dhúchas do líonra Ethereum, rud a chiallaíonn gur leagan Ethereum de Bitcoin é agus ní an tsócmhainn bhunaidh ar bhlocshlabhra Bitcoin. Chun BTC dúchais a bheith agat, bheadh ​​ort do shócmhainní a aistriú ó Ethereum go Bitcoin trí dhroichead a úsáid. Leis sin déanfar droichead do do chuid WBTC agus déanfar é a thiontú ina BTC dúchais. Mar mhalairt air sin, b'fhéidir gur leat BTC agus gur mhaith leat é a úsáid i bprótacail Ethereum [DeFi](/glossary/#defi). Bheadh ​​gá leis an mbealach eile a nascadh, ó BTC go WBTC ar féidir a úsáid ansin mar shócmhainn ar Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Is féidir leat gach rud thuas a dhéanamh freisin trí úsáid a bhaint as <a href="/get-eth/">malartán láraithe</a>. Mar sin féin, mura bhfuil do chistí ar mhalartú cheana féin, bheadh ​​ilchéimeanna i gceist leis, agus is dócha go mbeadh tú níos fearr as droichead a úsáid.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Cineálacha droichead {#types-of-bridge}

Tá go leor cineálacha dearaí agus castachtaí ag droichid. Go ginearálta, bíonn dhá chatagóir ag droichid: droichid iontaofa agus gan iontaoibh.

| Droichid Iontaofa                                                                                                                                       | Droichid Gan Iontaoibh                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Braitheann droichid iontaofa ar aonán lárnach nó ar chóras lárnach dá n-oibríochtaí.                                                                    | Feidhmíonn droichid gan iontaoibh trí chonarthaí cliste agus halgartaim a úsáid.                                                              |
| Tá boinn tuisceana iontaoibhe acu maidir le cúram cistí agus slándáil an droichid. Braitheann úsáideoirí den chuid is mó ar cháil an oibreora droichid. | Tá siad iontaofa, i.e., tá slándáil an droichid mar an gcéanna le slándáil an bhunshlabhra.                                                   |
| Ní mór d'úsáideoirí smacht a ghéileadh ar a gcuid sócmhainní crypto.                                                                                    | Trí [chonarthaí cliste](/glossary/#smart-contract), cuireann droichid neamhiontaofa ar chumas úsáideoirí fanacht i gceannas ar a gcuid cistí. |

Go hachomair, is féidir linn a rá go bhfuil boinn tuisceana iontaobhais ag droichid iontaofa, ach go ndéantar iontaoibh a íoslaghdú ar dhroichid neamhiontaofa agus nach ndéanann siad boinn tuisceana iontaoibhe nua thar na cinn de na fearainn bhunúsacha. Seo mar is féidir cur síos a dhéanamh ar na téarmaí seo:

- **Gan iontaibh**: a bhfuil an t-urrús comhionann leis na fearainn bhunúsacha. Mar atá tuairiscithe ag [Arjun Bhuptani san alt seo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Boinn tuisceana iontaobhais:** dul ar shiúl ó shlándáil na bhfearann ​​foluiteacha trí fhíoraitheoirí seachtracha a chur leis an gcóras, rud a fhágann nach bhfuil sé chomh slán go cripteacnamúil.

Chun tuiscint níos fearr a fháil ar na príomhdhifríochtaí idir an dá chur chuige, glacaimis sampla:

Samhlaigh go bhfuil tú ag seicphointe slándála an aerfoirt. Tá dhá chineál seicphointí ann:

1. Seicphointí Láimhe — á n-oibriú ag oifigigh a sheiceálann de láimh sonraí uile do thicéad agus aitheantais sula dtugann siad an pas bordála duit.
2. Féinchlárú - á oibriú ag meaisín ina gcuireann tú sonraí do eitilte isteach agus ina bhfaigheann tú an pas bordála má dhéantar gach rud a sheiceáil.

Tá seicphointe láimhe cosúil le samhail iontaofa mar go mbraitheann sé ar thríú páirtí, i.e., na hoifigigh, dá oibríochtaí. Mar úsáideoir, tá muinín agat as na hoifigigh chun na cinntí cearta a dhéanamh agus do chuid faisnéise príobháideacha a úsáid i gceart.

Tá an fhéinsheiceáil isteach cosúil le samhail gan iontaoibh toisc go mbaineann sé ról an oibreora agus úsáideann sé teicneolaíocht dá oibríochtaí. Fanann úsáideoirí i gcónaí i gceannas ar a gcuid sonraí agus ní gá dóibh muinín a bheith acu as tríú páirtí lena bhfaisnéis phríobháideach.

Glacann go leor réiteach tógála droichid samhlacha idir an dá fhoirceann seo le leibhéil éagsúla d’iontaofacht.

<Divider />

## Bain úsáid as droichead {#use-bridge}

Trí dhroichid a úsáid is féidir leat do chuid sócmhainní a bhogadh thar bhlocshlabhraí éagsúla. Seo roinnt acmhainní a chabhróidh leat droichid a aimsiú agus a úsáid:

- **[Achoimre ar Dhroichid L2BEAT](https://l2beat.com/bridges/summary) & [Anailís Riosca ar Dhroichid L2BEAT](https://l2beat.com/bridges/risk)**: Achoimre chuimsitheach ar dhroichid éagsúla, lena n-áirítear sonraí ar sciar den mhargadh, cineál droichid, agus slabhraí cinn scríbe. Tá anailís riosca ag L2BEAT freisin maidir le droichid, ag cabhrú le húsáideoirí cinntí eolasacha a dhéanamh agus iad ag roghnú droichead.
- **[Achoimre ar Dhroichead DefiLlama](https://defillama.com/bridges/Ethereum)**: Achoimre ar mhéideanna droichead thar líonraí Ethereum.

<Divider />

## Riosca a bhaineann le húsáid droichid {#bridge-risk}

Tá droichid sna céimeanna luathfhorbartha. Is dócha nach bhfuil an dearadh droichid is fearr aimsithe fós. Tá riosca ag baint le hidirghníomhú le droichead ar bith:

- ** Riosca Cliste Conartha -** an riosca go mbeidh fabht sa chód a d'fhéadfadh cistí úsáideora a chailliúint
- ** Riosca Teicneolaíochta -** d'fhéadfadh teip bogearraí, cód bugaí, earráid dhaonna, turscar agus ionsaithe mailíseacha cur isteach ar oibríochtaí úsáideoirí

Ina theannta sin, ós rud é go gcuireann droichid iontaofa le boinn tuisceana iontaobhais, tá rioscaí breise ag baint leo amhail:

- ** Riosca Cinsireachta —** go teoiriciúil is féidir le hoibreoirí droichead stop a chur le húsáideoirí a gcuid sócmhainní a aistriú tríd an droichead
- ** Riosca Coimeádta —** is féidir le hoibreoirí droichid a chlaonpháirteachas chun cistí na n-úsáideoirí a ghoid

Tá cistí úsáideora i mbaol:

- má tá fabht sa chonradh cliste
- má dhéanann an t-úsáideoir earráid
- má tá an castachtaí bunúsach haiceáilte
- má tá rún mailíseach ag oibritheoirí an droichid maidir le droichead iontaofa
- má dhéantar haiceáil ar an droichead

Haic amháin a rinneadh le déanaí ná droichead Wormhole  ag Solana, [inar goideadh 120k wETH ($325 milliún USD) le linn na haiceála](https://rekt.news/wormhole-rekt/). Bhain droichid le go leor de na [haiceanna is fearr i mblocshlabhraí](https://rekt.news/leaderboard/).

Tá droichid ríthábhachtach chun úsáideoirí a chur ar bord ar Ethereum L2anna, agus fiú d'úsáideoirí atá ag iarraidh éiceachórais éagsúla a iniúchadh. Mar sin féin, i bhfianaise na rioscaí a bhaineann le hidirghníomhú le droichid, ní mór d'úsáideoirí na comhbhabhtálacha atá á ndéanamh ag na droichid a thuiscint. Seo roinnt [straitéisí slándála trasshlabhra](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Tuilleadh léitheoireachta {#further-reading}
- [EIP-5164: Forghníomhú Trasshlabhra](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _ 18 Meitheamh, 2022 - Brendan Asselstine_
- [Creat Riosca L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _ 5 Iúil, 2022 - Bartek Kiepuszewski_
- [ "Cén fáth go mbeidh an todhchaí ilshlabhra, ach ní bheidh sé tras-shlabhra." ](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _Eanáir 8, 2022 - Vitalik Buterin_
- [Feabhas a chur ar Shlándáil Roinnte Chun Idir-inoibritheacht Slán Trasshlabhra: Coistí Stáit Lagrange Agus Thall](https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _ 12 Meitheamh, 2024 - Emmanuel Awosika_
- [Staid na Réitigh Idir-inoibritheachta Rolla suas](https://research.2077.xyz/the-state-of-rollup-interoperability) - _ 20 Meitheamh, 2024 - Alex Hook_

