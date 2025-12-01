---
title: Cad é Éitear Timfhillte (WETH)
description: Cur i láthair ar éitear timfhillte (WETH) - rapar atá comhoiriúnach le ERC20 le haghaidh éitear (ETH).
lang: ga
---

# Éitear timfhillte (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Ceangail do sparán chun ETH a fhilleadh nó a dhífhilleadh ar aon slabhra ag [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Is é ether (ETH) príomh-airgeadra Ethereum. Úsáidtear é chun críocha éagsúla cosúil le cruachadh, mar airgeadra, agus le híoc as táillí gáis le haghaidh ríomha. **Is foirm uasghrádaithe ETH é WETH le feidhmiúlacht bhreise a theastaíonn ó go leor feidhmchlár agus [ERC-20 comharthaí](/glossary/#erc-20)**, ar cineálacha eile sócmhainní digiteacha iad ar Ethereum. Chun oibriú leis na comharthaí seo, ní mór do ETH na rialacha céanna a dhéanann siad, ar a dtugtar an caighdeán ERC-20 a leanúint.

Chun an bhearna seo a líonadh, cruthaíodh ETH timfhillte (WETH). **Is conradh cliste é ETH timfhillte a ligeann duit aon mhéid ETH a chur isteach sa chonradh agus an méid céanna a fháil i WETH buailte** a chloíonn le caighdeán dearbhán ERC-20. Is léiriú é WETH ar ETH a ligeann duit idirghníomhú leis mar chomhartha ERC-20, ní mar an tsócmhainn dhúchasach ETH. Beidh ETH dúchasach fós ag teastáil uait chun íoc as táillí gáis, mar sin déan cinnte go sábhálfaidh tú roinnt agus tú ag taisceadh.

Is féidir leat WETH a dhífhilleadh le haghaidh ETH trí úsáid a bhaint as conradh cliste WETH. Is féidir leat aon mhéid WETH a fhuascailt leis an gconradh cliste WETH, agus gheobhaidh tú an méid céanna in ETH. Déantar an WETH a taisceadh a dhó ansin agus a bhaint as an soláthar imshruthaithe WETH.

**Tá thart ar ~3% den soláthar ETH atá i gcúrsaíocht faoi ghlas sa chonradh chomhartha WETH** rud a fhágann go bhfuil sé ar cheann de na [conarthaí cliste](/glossary/#smart-contract) is mó a úsáitear. Tá tábhacht ar leith ag baint le WETH nuair a bhíonn úsáideoirí ag idirghníomhú le feidhmchláir in airgeadas díláraithe (DeFi).

## Cén fáth a gcaithfimid ETH a thimfhilleadh mar ERC-20? {#why-do-we-need-to-wrap-eth}

Sainmhíníonn [ERC-20] (/developers/docs/standards/tokens/erc-20/) comhéadan caighdeánach le haghaidh comharthaí inaistrithe, ionas gur féidir le duine ar bith comharthaí a chruthú a idirghníomhaíonn gan uaim le feidhmchláir agus comharthaí a úsáideann an caighdeán seo in éiceachóras Ethereum. Ós rud é go raibh **ETH ann roimh an gcaighdeán ERC-20**, ní chloíonn ETH leis an tsonraíocht seo. Mar gheall air seo **ní féidir leat** ETH a mhalartú go héasca ar chomharthaí ERC-20 eile nó **ETH a úsáid in aipeanna ag baint úsáide as an gcaighdeán ERC-20**. Tugann timfhilleadh ETH deis duit na rudaí seo a leanas a dhéanamh:

- \*\* ETH a mhalartú le haghaidh comharthaí ERC-20\*\*: Ní féidir leat ETH a mhalartú go díreach le haghaidh comharthaí ERC-20 eile. Is léiriú é WETH ar éitear a chloíonn le caighdeán comharthaí idirmhalartacha ERC-20 agus is féidir é a mhalartú le comharthaí ERC-20 eile.

- \*\* Úsáid ETH i dapps \*\*: Toisc nach bhfuil ETH comhoiriúnach le ERC20, bheadh ​​ar fhorbróirí comhéadain ar leith a chruthú (ceann amháin le haghaidh ETH agus ceann eile le haghaidh comharthaí ERC-20) i dapps. Nuair a dhéantar ETH a thimfhilleadh, baintear an chonstaic seo agus cuireann sé ar chumas forbróirí ETH agus comharthaí eile a láimhseáil laistigh den dapp céanna. Úsáideann go leor feidhmchlár díláraithe airgeadais an caighdeán seo, agus cruthaíonn siad margaí chun na comharthaí sin a mhalartú.

## Éitear timfhillte (WETH) vs éitear (ETH): Cad é an difríocht? {#weth-vs-eth-differences}

|             | **Éitear (ETH)**                                                                                                                                                                                                                                                                   | **Éitear timfhillte (WETH)**                                                                                                                                                                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Soláthar    | Tá soláthar ETH á bhainistiú ag prótacal Ethereum. Láimhseálann bailíochtóirí Ethereum [eisiúint] (/treochlár / cumasc / eisiúint) ETH agus iad ag próiseáil idirbhearta agus ag cruthú bloic. | Is comhartha ERC-20 é WETH a bhfuil a sholáthar á bhainistiú ag conradh cliste. Eisíonn an conradh aonaid nua WETH tar éis dó taiscí ETH a fháil ó úsáideoirí, nó déantar aonaid WETH a dhó nuair is mian le húsáideoir WETH a fhuascailt le haghaidh ETH. |
| Úinéireacht | Is é prótacal Ethereum a bhainistíonn úinéireacht trí iarmhéid do chuntais.                                                                                                                                                                                                           | Tá úinéireacht WETH á bhainistiú ag conradh cliste chomhartha WETH, arna urrú ag prótacal Ethereum.                                                                                                                                                                        |
| Gás         | Is é Éitear (ETH) an t-aonad íocaíochta a nglactar leis le haghaidh ríomha ar líonra Ethereum. Tá táillí gáis ainmnithe in gwei (aonad éitear).                                                                                 | Ní thacaítear ó dhúchas le gás a íoc le comharthaí WETH.                                                                                                                                                                                                                   |

## Ceisteanna coitianta {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Íocann tú táillí gáis chun ETH a thimfhilleadh nó a dhífhilleadh trí leas a bhaint as an gconradh WETH.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Meastar go ginearálta go bhfuil WETH slán mar go bhfuil sé bunaithe ar chonradh cliste simplí a bhfuil tástáil catha air. Tá conradh WETH fíoraithe go foirmiúil freisin, arb é an caighdeán slándála is airde do chonarthaí cliste ar Ethereum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Chomh maith le [feidhmiú canónta WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) a thuairiscítear ar an leathanach seo, tá leaganacha eile san fhiántas. D’fhéadfadh gur comharthaí saincheaptha iad seo a chruthaigh forbróirí feidhmchlár nó leaganacha a eisíodh ar bhlocshlabhraí eile, agus d’fhéadfadh go mbeidís ag feidhmiú ar bhealach difriúil nó go bhfuil airíonna slándála éagsúla acu. **Seiceáil an t-eolas comharthaí faoi dhó i gcónaí ionas go mbeidh a fhios agat den rith WETH a bhfuil tú ag idirghníomhú leis.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Tuilleadh léitheoireachta {#further-reading}

- [Cad é WETH?](https://weth.tkn.eth.limo/)
- [Faisnéis faoi chomharthaí WETH ar Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Fíorú Foirmiúil WETH](https://zellic.io/blog/formal-verification-weth)
