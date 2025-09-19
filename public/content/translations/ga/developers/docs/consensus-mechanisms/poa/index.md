---
title: Cruthúnas-údaráis (PoA)
description: Míniú ar an bprótacal comhdhearcadh cruthúnas-údaráis agus a ról in éiceachóras bhlocshlabhra.
lang: ga
---

Is algartam comhdhearcadh bunaithe ar chlú é **Cruthúnas-údaráis (PoA)** ar leagan modhnaithe é de [cruthúnas-gill] (/developers/docs/consensus-mechanisms/pos/). Úsáidtear é ag slabhraí príobháideacha, líonta tástála agus líonraí forbartha áitiúla den chuid is mó. Is algartam comhdhearcaidh bunaithe ar chlú é PoA a éilíonn muinín a bheith ann as sraith sínitheoirí údaraithe chun bloic a tháirgeadh, in ionad meicníocht gheall-bhunaithe i PoS.

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús ar [idirbhearta](/developers/docs/transactions/), [bloic](/developers/docs/blocks/), agus [meicníochtaí comhaontaithe](/developers/docs/consensus-mechanisms/).

## Cad is cruthúnas-údaráis (PoA) ann? {#what-is-poa}

Is leagan modhnaithe de **[cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/) (PoS)** é Cruthúnas-údaráis\*\* ar algartam comhdhearcaidh atá bunaithe ar chlú seachas ar mheicníocht gheall-bhunaithe i PoS. Tugadh an téarma isteach den chéad uair i 2017 ag Gavin Wood, agus tá slabhraí príobháideacha, testnets agus líonraí forbartha áitiúla den chuid is mó ag baint úsáide as an algartam comhdhearcaidh seo, toisc go sáraíonn sé an gá atá le hacmhainní ardchaighdeáin mar a dhéanann PoW, agus sáraíonn sé saincheisteanna inscálaitheacht PoS trí fho-thacar beag de nóid a bheith ann chun an blocshlabhra a stóráil agus bloic a tháirgeadh.

Éilíonn cruthúnas-údaráis muinín a bheith agat as tacar sínitheoirí údaraithe atá socraithe sa [ghineas bloic](/glossary/#genesis-block). I bhformhór na bhfeidhmithe atá ann faoi láthair, coimeádann gach sínitheoir údaraithe an chumhacht agus na pribhléidí comhionanna agus comhdhearcadh an tslabhra á chinneadh. Is é an smaoineamh atá taobh thiar de gheallchur clú ná go bhfuil aithne ag gach duine ar gach bailíochtóir údaraithe trí rudaí cosúil le aithne a chur ar do chustaiméir (KYC), nó trí eagraíocht aitheanta a bheith mar aon bhailíochtóir amháin - ar an mbealach seo má dhéanann bailíochtóir aon rud mícheart, bíonn a chéannacht ar eolas.

Is iomaí feidhmiú de PoA atá ann, ach is é \*\* clique\*\* an feidhmiú caighdeánach Ethereum, a fheidhmíonn [EIP-225] (https://eips.ethereum.org/EIPS/eip-225). Tá Clique cairdiúil don fhorbróir agus tá caighdeán éasca le feidhmiú aige, ag tacú le gach cineál sioncronaithe cliant. I measc na bhfeidhmithe eile tá [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) agus [Aura](https://openethereum.github.io/Chain-specification).

## Conas a oibríonn sé {#how-it-works}

In PoA, roghnaítear sraith sínitheoirí údaraithe chun bloic nua a chruthú. Roghnaítear na sínitheoirí bunaithe ar a gcáil, agus ní cheadaítear ach do na sínitheoirí amháin bloic nua a chruthú. Roghnaítear na sínitheoirí ar bhealach comh-agach, agus tá cead ag gach sínitheoir bloc a chruthú i bhfráma ama ar leith. Tá an t-am cruthaithe bloc socraithe, agus caithfidh na sínitheoirí bloc a chruthú laistigh den fhráma ama sin.

Ní rud cainníochtaithe é an cháil sa chomhthéacs seo ach is é cáil na gcorparáidí aitheanta ar nós Microsoft agus Google é, mar sin níl an bealach chun na sínitheoirí iontaofa a roghnú algartamach ach gnáthghníomh daonna é _iontaobh_ nuair a chruthaíonn aonáin, mar shampla Microsoft, líonra PoA príobháideach idir na céadta nó na mílte gnólachtaí nuathionscanta agus an ról féin mar aon sínitheoir iontaofa leis an bhféidearthacht sínitheoirí aitheanta eile ar nós Google a chur leis amach anseo, bheadh ​​muinín ag gnólachtaí tosaithe, gan amhras, as Microsoft gníomhú ar bhealach macánta an t-am ar fad agus an líonra a úsáid. Réitíonn sé seo an gá atá le líonraí beaga/príobháideacha éagsúla a tógadh ar son críocha éagsúla chun iad a choinneáil díláraithe agus ag feidhmiú, chomh maith leis an ngá atá le mianadóirí, a ídíonn go leor cumhachta agus acmhainní. Úsáideann roinnt líonraí príobháideacha an caighdeán PoA mar VeChain, agus déanann cuid acu é a mhodhnú mar Binance a úsáideann [PoSA] ( https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) atá ina leagan modhnaithe saincheaptha de PoA agus PoS.

Is iad na sínitheoirí féin a dhéanann an próiseas vótála. Vótálann gach sínitheoir chun sínitheoir a chur leis nó a bhaint as a bhloc nuair a chruthaíonn siad bloc nua. Déanann na nóid na vótaí a áireamh, agus cuirtear nó baintear na sínitheoirí de réir mar a shroicheann na vótaí tairseach áirithe `SIGNER_LIMIT`.

D’fhéadfadh go mbeadh cás ann ina dtarlaíonn foirc bheaga, braitheann deacracht bhloic ar cibé acu an raibh an bloc sínithe ar a seal nó as a seal. Tá deacracht 2 ag bloic “ar a seal”, agus tá deacracht ag bloic “as seal” 1. I gcás forc beaga, is é an slabhra ina bhfuil an chuid is mó de na sínitheoirí as séalú bloic “ar a seal” an deacracht agus an bua is mó.

## Veicteoirí ionsaí {#attack-vectors}

### Sínitheoirí mailíseacha {#malicious-signers}

D’fhéadfaí úsáideoir mailíseach a chur le liosta na sínitheoirí, nó d’fhéadfadh go gcuirfí eochair/meaisín sínithe i mbaol. I gcás den sórt sin ní mór don phrótacal a bheith in ann é féin a chosaint ar atheagrú agus ar thurscar. Is é an réiteach atá beartaithe ná, nuair a thugtar liosta de N sínitheoirí údaraithe, nach mbeidh aon sínitheoir ach ábalta 1 bhloc as gach K a bhreacadh. Cinntíonn sé seo go mbeidh na bailíochtóirí atá fágtha in ann an t-úsáideoir mailíseach a vótáil amach.

### Cinsireacht {#censorship-attack}

Veicteoir ionsaithe suimiúil eile is ea má dhéanann sínitheoir (nó grúpa sínitheoirí) iarracht cinsireacht ar bhloic a vótálann iad a bhaint den liosta údaraithe. Chun oibriú thart air seo, tá an mhinicíocht buailte a cheadaítear do na sínitheoirí teoranta do 1 as N/2. Cinntíonn sé seo go gcaithfidh sínitheoirí mailíseacha 51% ar a laghad de na cuntais sínithe a rialú, agus ag an bpointe sin is foinse nua fírinne don slabhra iad.

### Turscar {#spam-attack}

Veicteoir ionsaithe beag eile is ea sínitheoirí mailíseacha ag instealladh tograí vótála nua taobh istigh de gach bloc a bhualann siad. Ós rud é go gcaithfidh nóid na vótaí go léir a áireamh chun an liosta iarbhír de shínitheoirí údaraithe a chruthú, ní mór dóibh na vótaí go léir a thaifeadadh le himeacht ama. Gan teorainn a chur leis an bhfuinneog vótála, d’fhéadfadh sé seo fás go mall, gan teorainn fós. Is é an réiteach ná fuinneog _gluaiste_ de bhloic W a shuiteáil agus meastar na vótaí a bheith sean dá éis. _D'fhéadfadh 1-2 ré a bheith i bhfuinneog réasúnta._

### Bloic chomhthráthacha {#concurrent-blocks}

I líonra PoA, Nuair a bhíonn N sínitheoirí údaraithe ann, tá cead ag gach sínitheoir 1 bhloc a bhreacadh as K, rud a chiallaíonn go gceadaítear do bhailíochtóirí N-K+1 bualadh ag aon phointe ama ar leith. Chun na bailíochtóirí seo a chosc ó rásaíocht le haghaidh bloic, ba cheart do gach sínitheoir "fritháireamh" beag randamach a chur leis an am a scaoileann sé bloc nua. Cé go gcinntíonn an próiseas seo go bhfuil foirc bheaga annamh, is féidir le foirc ócáideacha tarlú fós, díreach cosúil le mainnet. Má aimsítear go bhfuil sínitheoir ag mí-úsáid a chumhacht agus ag cruthú anoird, is féidir leis na sínitheoirí eile iad a vótáil amach.

Más rud é, mar shampla, go bhfuil 10 sínitheoir údaraithe ann agus go gceadaítear do gach sínitheoir 1 bhloc as 20 a chruthú, ansin is féidir le 11 bailíochtóir bloic a chruthú ag aon am ar leith. Chun iad a chosc ó rásaíocht chun bloic a chruthú, cuireann gach sínitheoir "fritháireamh" randamach beag leis an am a scaoileann siad bloc nua. Laghdaíonn sé seo tarlú na bhforc beaga ach fós ceadaíonn sé foirc ó am go chéile, mar atá le feiceáil ar an Mainnet Ethereum. Má bhaineann sínitheoir mí-úsáid as a údarás agus má chruthaíonn sé anord, is féidir é a vótáil amach as an líonra.

## Buntáistí agus míbhuntáistí {#pros-and-cons}

| Buntáistí                                                                                                                                                                          | Míbhuntáistí                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Níos inscálaithe ná meicníochtaí coitianta eile ar nós PoS agus PoW, toisc go bhfuil sé bunaithe ar líon teoranta sínitheoirí bloc                                                 | Is iondúil gur líon measartha beag nóid bhailíochtaithe a bhíonn ag líonraí PoA. Fágann sé sin go bhfuil líonra PoA níos láraithe.       |
| Tá blocshlabhraí PoA thar a bheith saor le rith agus le cothabháil                                                                                                                 | De ghnáth ní féidir le gnáthdhuine a bheith ina shínitheoir údaraithe, toisc go n-éilíonn an blocshlabhra aonáin a bhfuil a gcáil seanbhunaithe.         |
| Deimhnítear na hidirbhearta go han-tapa mar go bhféadfadh sé níos lú ná 1 soicind a bhaint amach toisc nach dteastaíonn ach líon teoranta sínitheoirí chun bloic nua a bhailíochtú | D’fhéadfadh sínitheoirí mailíseacha idirbhearta sa líonra a atheagrú, iad a chaitheamh faoi dhó, cinsireacht a dhéanamh, tá na hionsaithe sin maolaithe ach fós indéanta |

## Tuilleadh léitheoireachta {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Caighdeán Clique_
- [Staidéar ar Chruthúnas-Údaráis(https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Cad is Cruthúnas Údaráis ann](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Míniú ar Cruthúnas Údaráis (https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA i mblocshlabhra](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique mínithe](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA dímholta, sonraíocht Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, feidhmiú eile PoA](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### An foghlaimeoir amhairc den chuid is mó tú? {#visual-learner}

Breathnaigh ar mhíniú amhairc ar cruthúnas-údaráis:

<YouTube id="Mj10HSEM5_8" />

## Ábhair ghaolmhara {#related-topics}

- [Cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow/)
- [Cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/)
