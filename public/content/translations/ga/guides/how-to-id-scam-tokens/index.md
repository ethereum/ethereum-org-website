---
title: Conas comharthaí caimiléireachta a aithint
description: Tuiscint a fháil ar dearbháin chaimiléireachta, conas a chuireann siad i gcéill go bhfuil siad fíor, agus conas iad a sheachaint.
lang: ga
---

# Conas comharthaí caimiléireachta a aithint {#identify-scam-tokens}

Ceann de na húsáidí is coitianta le haghaidh Ethereum ná go gcruthaíonn grúpa dearbhán intrádála, mar a n-airgeadra féin, d'fhéadfá a rá. De ghnáth leanann na dearbháin seo cur chuige aitheanta, [ERC-20](/developers/docs/standards/tokens/erc-20/). Mar sin féin, áit ar bith ina bhfuil cásanna úsáide dlisteanacha a thugann luach, tá coirpigh ann freisin a dhéanann iarracht an luach sin a ghoid dóibh féin.

Tá dhá bhealach ann inar dócha go gcuirfidh siad tú amú:

- **Ag díol comhartha camscéimeanna**, b'fhéidir gur cosúil leis an chomhartha dlisteanach atá tú ag iarraidh a cheannach, ach go n-eisíonn na scamadóirí iad agus nach fiú aon rud é.
- **Ag cur feall ort droch-idirbhearta a shíniú**, de ghnáth trí tú a threorú chuig a gcomhéadan úsáideora féin. B’fhéidir go ndéanfaidh siad iarracht tú a mhealladh chun liúntas as do chuid dearbháin ERC-20 a thabhairt dá gconarthaí, ag nochtadh faisnéise íogair a thugann rochtain dóibh ar do shócmhainní, etc. D'fhéadfadh na comhéadain úsáideora seo a bheith gar-foirfe clón de láithreáin macánta, ach le cleasanna i bhfolach.

Chun a léiriú cad is dearbháin chaimiléireachta ann, agus conas iad a aithint, féachfaimid ar shampla amháin: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Déanann an comhartha seo iarracht cuma dhlisteanach [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Cad é ARB?"
contentPreview=''>

Is eagraíocht í Arbitrum a fhorbraíonn agus a bhainistíonn [rollups optimistic](/developers/docs/scaling/optimistic-rollups/). Ar dtús, eagraíodh Arbitrum mar chuideachta bhrabús, ach ansin ghlac céimeanna chun dílárú. Mar chuid den phróiseas sin, d’eisigh siad [comhartha rialachais] intrádála (/dao/#token-based-membership).

</ExpandableCard>

<ExpandableCard
title="Cén fáth a dtugtar wARB ar an chomhartha scam?"
contentPreview=''>

Tá coinbhinsiún ann in Ethereum, nuair nach bhfuil sócmhainn comhlíontach ERC-20 cruthaímid leagan "fillte" di leis an ainm ag tosú le "w". Mar sin, mar shampla, tá wBTC againn le haghaidh bitcoin agus <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH le haghaidh éitear </a>.

Ní dhéanann sé ciall leagan fillte de chomhartha ERC-20 a chruthú atá ar Ethereum cheana féin, ach bíonn scamóirí ag brath ar chuma dlisteanachta seachas an réaltacht bhunúsach.

</ExpandableCard>

## Conas a oibríonn comharthaí scam? {#how-do-scam-tokens-work}

Is é dílárú bun agus barr Ethereum. Ciallaíonn sé seo nach bhfuil aon údarás lárnach ann a fhéadfaidh do shócmhainní a choigistiú nó cosc ​​a chur ort conradh cliste a imscaradh. Ach ciallaíonn sé freisin gur féidir le scamóirí aon chonradh cliste is mian leo a imscaradh.

<ExpandableCard
title="Cad is conarthaí cliste ann?"
contentPreview=''>

Is iad na cláir a ritheann ar bharr blocshlabhra Ethereum na [conarthaí cliste](/developers/docs/smart-contracts/). Cuirtear gach dearbhán ERC-20, mar shampla, i bhfeidhm mar chonradh cliste.

</ExpandableCard>

Go sonrach, d'imscar Arbitrum conradh a úsáideann an tsiombail `ARB`. Ach ní chuireann sé sin bac ar dhaoine eile conradh a imscaradh a úsáideann an tsiombail chéanna, nó ceann cosúil leis. Is é an té a scríobhann an conradh a shocróidh cad a dhéanfaidh an conradh.

## Chun cuma dhlisteanach a chur in iúl {#appearing-legitimate}

Tá roinnt cleasanna ann a dhéanann cruthaitheoirí comharthaí scam chun a bheith dlisteanach.

- **Ainm dlisteanach agus siombail**. Mar a luadh cheana, is féidir an tsiombail agus an t-ainm céanna a bheith ag conarthaí ERC-20 agus atá ag conarthaí ERC-20 eile. Ní féidir leat brath ar na réimsí sin le haghaidh slándála.

- **Úinéirí dlisteanacha**. Is minic a scaoiltear iarmhéideanna dhearbháin chaimiléireachta chuig seoltaí ar féidir a bheith ag súil leo a bheith ina sealbhóirí dlisteanacha den fhíordhearbhán.

  Mar shampla, breathnaímis ar `wARB` arís. [Tá thart ar 16% de na dearbháin](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) i seilbh ag seoladh a bhfuil an clib phoiblí air[Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Is _ní_ seoladh bréige é seo, i ndáiríre is é an seoladh a rinne an fíorchonradh ARB [a imscaradh ar Ethereum mainnet](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Toisc gur cuid de stóráil chonartha ERC-20 iarmhéid seoladh ERC-20, is féidir a shonrú sa chonradh gur cuma cad is mian le forbróir an chonartha. Is féidir freisin le conradh aistrithe a thoirmeasc ionas nach mbeidh na húsáideoirí dlisteanacha in ann fáil réidh leis na dearbháin chaimiléireachta sin.

- **Aistrithe dlisteanacha**. _Ní íocfadh úinéirí dlisteanacha dearbhán caimiléireachta a aistriú chuig daoine eile, mar sin má tá aistrithe ann caithfidh sé a bheith dlisteanach, ceart?_ ** Mícheart**. Táirgeann an conradh ERC-20 imeachtaí `Aistriú`. Is féidir le scamóir an conradh a scríobh go héasca ar bhealach a dhéanfaidh na gníomhartha sin a tháirgeadh.

## Láithreáin ghréasáin calaoiseacha {#websites}

Is féidir le scamóirí láithreáin ghréasáin an-láidir a chruthú freisin, uaireanta clónna beacht de shuíomhanna barántúla le comhéadain úsáideora comhionanna, ach le cleasa caolchúiseacha. I measc na samplaí a d’fhéadfadh a bheith ann tá naisc sheachtracha a bhfuil cuma dhlisteanach orthu an t-úsáideoir a sheoladh chuig suíomh calaoiseacha sheachtrach, nó treoracha míchearta a thugann treoir don úsáideoir a gcuid eochracha a nochtadh nó cistí a sheoladh chuig seoladh ionsaitheora.

Is é an cleachtas is fearr chun é seo a sheachaint ná URL na suíomhanna a dtugann tú cuairt orthu a sheiceáil go cúramach, agus seoltaí do shuíomhanna barántúla aitheanta a shábháil i do leabharmharcanna. Ansin, is féidir leat rochtain a fháil ar an bhfíorshuíomh trí do leabharmharcanna gan earráidí litrithe a dhéanamh de thaisme nó a bheith ag brath ar naisc sheachtracha.

## Conas is féidir leat tú féin a chosaint? {#protect-yourself}

1. **Seiceáil seoladh an chonartha**. Tagann comharthaí dlisteanacha ó eagraíochtaí dlisteanacha, agus is féidir leat na seoltaí conartha a fheiceáil ar shuíomh Gréasáin na heagraíochta. Mar shampla, [le haghaidh `ARB` is féidir leat na seoltaí dlisteanacha a fheiceáil anseo](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Tá leachtacht ag fíorchomharthaí**. Rogha eile is ea féachaint ar mhéid na linne leachtachta ar [Uniswap](https://uniswap.org/), ceann de na prótacail babhtála dearbháin is coitianta. Feidhmíonn an prótacal seo ag baint úsáide as linnte leachtachta, ina dtaisceann infheisteoirí a gcuid comharthaí le súil le haisíoc ó tháillí trádála.

De ghnáth bíonn linnte leachtachta bídeacha ag dearbháin chaimiléireachta, más ann dóibh, toisc nach bhfuil na scamóirí ag iarraidh sócmhainní réadacha a chur i mbaol. Mar shampla, tá tuairim is milliún dollar i gcomhthiomsú Uniswap `ARB`/`ETH` ([féach anseo le haghaidh an luach suas chun dáta](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) agus níl aon dul chun cinn a cheannach nó a dhíol méid beag chun an praghas a athrú:

![Comhartha dlisteanach a cheannach](./uniswap-real.png)

Ach nuair a dhéanann tú iarracht an chomhartha camscéim `wARB` a cheannach, d’athródh fiú ceannach beag bídeach níos mó ná 90% ar an bpraghas:

![Comhartha scam a cheannach](./uniswap-scam.png)

Seo píosa eile fianaise a thaispeánann dúinn nach dócha gur comhartha dlisteanach é `wARB`.

3. **Féach in Etherscan**. Tá go leor dearbháin chaimiléireachta aitheanta agus tuairiscithe ag an bpobal cheana féin. Tá comharthaí dá leithéid [marcáilte in Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Cé nach foinse údaráis fírinne é Etherscan (mar gheall ar nádúr na líonraí díchentralaithe nach féidir foinse údaráis a bheith ann le haghaidh dlisteanachta), is dócha gur calaois iad comharthaí a shainaithnítear mar chalaoisí ag Etherscan.

   ![Comhartha scam in Etherscan](./etherscan-scam.png)

## Conclúid {#conclusion}

Chomh fada agus a bhfuil luach ar fud an domhain, beidh scamóirí ann a dhéanann iarracht é a ghoid dóibh féin, agus i ndomhan díláraithe níl aon duine chun tú a chosaint ach amháin tú féin. Tá súil agam go gcuimhneoidh tú na pointí seo chun na comharthaí dlisteanacha ó na chalaoisí a insint:

- Is ionann comharthaí calaoise agus comharthaí dlisteanacha; is féidir leo an t-ainm céanna, an tsiombail chéanna, srl., a úsáid.
- Ní féidir le comharthaí calaoise _an seoladh conartha céanna a úsáid_.
- Is í an fhoinse is fearr chun seoladh an dearbháin dhlisteanach a aimsiú ná an eagraíocht ar léi an dearbháin.
- Mura n-éiríonn leat sin a dhéanamh, is féidir leat feidhmchláir iontaofa, coitianta ar nós [Uniswap](https://app.uniswap.org/#/swap) agus [Blockscout](https://eth.blockscout.com/) a úsáid.
