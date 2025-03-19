---
title: Bloic
description: Forbhreathnú ar na bloic i mblocshlabhra Ethereum - a struchtúr sonraí, cén fáth a bhfuil gá leo, agus conas a dhéantar iad.
lang: ga
---

Is baisceanna idirbhearta iad bloic le hais den bhloc roimhe seo sa slabhra. Nascann sé seo bloic le chéile (i slabhra) toisc go bhfuil haiseanna díorthaithe go cripteagrafach ó na sonraí bloc. Cuireann sé seo cosc ​​​​ar chalaois, toisc go ndéanfadh athrú amháin ar aon bhloc sa stair na bloic seo a leanas go léir a neamhbhailiú mar go n-athródh gach hashes ina dhiaidh sin agus go dtabharfadh gach duine a ritheann an blockchain faoi deara.

## Réamhriachtanais {#prerequisites}

Is ábhar an-chairdiúil do thosaitheoirí iad bloic. Ach le cabhrú leat an leathanach seo a thuiscint níos fearr, molaimid duit [Cuntais](/developers/docs/accounts/) a léamh ar dtús, [Idirbhearta](/developers/docs/transactions/), agus ár [réamhrá do Ethereum](/developers/docs/intro-to-ethereum/).

## Cén fáth bloic? {#why-blocks}

Chun a chinntiú go mbíonn staid shioncrónaithe á cothabháil ag gach rannpháirtí ar líonra Ethereum agus go n-aontaíonn siad ar stair bheacht na n-idirbhearta, déanaimid idirbhearta a bhaiscáil ina mbloic. Ciallaíonn sé seo go bhfuil na dosaenacha (nó na céadta) idirbheart tiomanta, comhaontaithe, agus sioncrónaithe ag an am céanna.

![Léaráid a thaispeánann idirbheart i mbloc is cúis le hathruithe staide](./tx-block.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Trí thiomantais a spásáil amach, tugaimid dóthain ama do rannpháirtithe an líonra teacht ar chomhthoil: cé go dtarlaíonn iarratais ar idirbhearta mórán uaireanta in aghaidh an tsoicind, ní chruthaítear agus ní dhéantar bloic ar Ethereum ach uair amháin gach dhá shoicind déag.

## Conas a oibríonn bloic {#how-blocks-work}

Chun stair na n-idirbhearta a chaomhnú, cuirtear bloic in ord docht (tá tagairt dá mháthairbhloc i ngach bloc nua a chruthaítear), agus cuirtear idirbhearta laistigh de na bloic in ord docht freisin. Ach amháin i gcásanna neamhchoitianta, ag aon am ar leith, tá gach rannpháirtí ar an líonra ar aon intinn maidir le líon beacht agus stair na mbloc, agus tá siad ag obair chun na hiarratais ar idirbhearta beo reatha a bhaisceadh isteach sa chéad bhloc eile.

Nuair a chuireann bailíochtóir roghnaithe go randamach bloc le chéile ar an líonra, iomadaítear é chuig an gcuid eile den líonra; cuireann gach nóid an bloc seo go dtí deireadh a bhlocshlabhra, agus roghnaítear bailíochtóir nua chun an chéad bhloc eile a chruthú. Tá an próiseas cruinn bloc-tionóil agus an próiseas tiomantais/comhthola sonraithe faoi láthair ag prótacal “cruthúnas-ar gheall” Ethereum.

## Prótacal cruthúnais ar gheall {#proof-of-work-protocol}

Ciallaíonn cruthúnas ar gheall an méid seo a leanas:

- Caithfidh nóid bhailíochtaithe 32 ETH a chur isteach i gconradh taisce mar chomhthaobhacht in aghaidh droch-iompar. Cabhraíonn sé seo leis an líonra a chosaint mar is dócha go scriostar cuid den bheart sin nó é go léir de bharr gníomhaíochta mímhacánta.
- I ngach sliotán (spásáilte dhá shoicind déag óna chéile) roghnaítear bailíochtóir go randamach le bheith ina mholtóir bloic. Cuachann siad idirbhearta le chéile, déanann iad a fhorghníomhú agus cinneann siad 'staid' nua. Imfhilleann siad an fhaisnéis seo i mbloc agus cuireann siad ar aghaidh chuig bailíochtóirí eile í.
- Ritheann bailíochtóirí eile a chloiseann faoin mbloc nua na hidirbhearta le cinntiú go n-aontaíonn siad leis an athrú atá beartaithe ar an stát domhanda. Ag glacadh leis go bhfuil an bloc bailí, cuireann siad é lena mbunachar sonraí féin.
- Má chloiseann bailíochtóir faoi dhá bhloc contrártha don sliotán céanna úsáideann siad a n-algartam forc-rogha chun an ceann a fhaigheann tacaíocht ón ETH geallta is mó a phiocadh.

[Tuilleadh faoi chruthúnas-gheallta](/developers/docs/consensus-mechanisms/pos)

## Cad atá i mbloc? {#block-anatomy}

Tá go leor faisnéise laistigh de bhloc. Ag an leibhéal is airde tá na réimsí seo a leanas i mbloc:

| Réimse           | Cur síos                                                  |
|:---------------- |:--------------------------------------------------------- |
| `slot`           | an sliotán lena mbaineann an bloc                         |
| `proposer_index` | ID an bhailíochtóra a mhol an bloc                        |
| `parent_root`    | hais an bhloic roimhe seo                                 |
| `state_root`     | hais fhréamh an réad staide                               |
| `body`           | réad ina bhfuil roinnt réimsí, mar atá sainmhínithe thíos |

Tá roinnt réimsí dá chuid féin sa bhloc `corp`:

| Réimse               | Cur síos                                                                |
|:-------------------- |:----------------------------------------------------------------------- |
| `randao_reveal`      | luach a úsáidtear chun an chéad mholtóir bloc eile a roghnú             |
| `eth1_data`          | faisnéis faoin gconradh taisce                                          |
| `graffiti`           | sonraí treallach a úsáidtear chun bloic a chlibeáil                     |
| `proposer_slashings` | liosta de bhailithóirí le gearradh siar                                 |
| `attester_slashings` | liosta na bhfianaitheoirí atá le gearradh                               |
| `attestations`       | liosta fianuithe i bhfabhar an bhloc reatha                             |
| `deposits`           | liosta de thaiscí nua leis an gconradh taisce                           |
| `voluntary_exits`    | liosta de bhailitheoirí atá ag fágáil an líonra                         |
| `sync_aggregate`     | fothacar de bhailíchtóirí a úsáidtear chun freastal ar chliaint éadroma |
| `execution_payload`  | idirbhearta a ritheadh ​​ón gcliant reatha                              |

Sa réimse `fianuithe` tá liosta de na fianuithe go léir sa bhloc. Tá a gcineál sonraí féin ag fianuithe ina bhfuil roinnt píosaí sonraí. Tá gach fianú:

| Réimse             | Cur síos                                                |
|:------------------ |:------------------------------------------------------- |
| `aggregation_bits` | liosta de na bailíochtóirí a ghlac páirt san fhianú seo |
| `data`             | coimeádán le foréimsí iolracha                          |
| `signature`        | síniú comhiomlán na mbailíochtóirí fianaithe go léir    |

Tá an méid seo a leanas sa réimse `sonraí` sa `fhianú`:

| Réimse              | Cur síos                                            |
|:------------------- |:--------------------------------------------------- |
| `slot`              | an sliotán lena mbaineann an fianú                  |
| `index`             | innéacsanna le haghaidh bailíochtóirí fianaithe     |
| `beacon_block_root` | hais fréimhe an bhloc Beacon ina bhfuil an réad seo |
| `foinse`            | an seicphointe deiridh a bhfuil údar leis           |
| `target`            | an bloc teorann aga is déanaí                       |

Nuair a ritear na hidirbhearta sa `execution_payload`, nuashonraítear an staid dhomhanda. Athritheann gach cliant na hidirbhearta sa `execution_payload` chun a chinntiú go dtagann an staid nua leis an staid sa réimse bloc nua `state_root`. Seo mar is féidir le cliaint a rá go bhfuil bloc nua bailí agus sábháilte le cur lena bhlocshlabhra. Is réad é an `pálasta reatha` féin a bhfuil roinnt réimsí ann. Tá `execution_payload_header` ann freisin ina bhfuil faisnéis achomair thábhachtach faoi na sonraí reatha. Tá na struchtúir sonraí seo eagraithe mar a leanas:

Tá na réimsí seo a leanas sa `execution_payload_header`:

| Réimse              | Cur síos                                                                          |
|:------------------- |:--------------------------------------------------------------------------------- |
| `parent_hash`       | hais an mháthairbhloic                                                            |
| `fee_recipient`     | seoladh cuntais chun táillí idirbhirt a íoc leis                                  |
| `state_root`        | hais fréimhe don staid dhomhanda tar éis athruithe a chur i bhfeidhm sa bhloc seo |
| `receipts_root`     | hais na bhfáltas idirbhirt trie                                                   |
| `logs_bloom`        | struchtúr sonraí ina bhfuil logaí imeachtaí                                       |
| `prev_randao`       | luach a úsáidtear i roghnú bailíochtaithe randamach                               |
| `block_number`      | uimhir an bhloic reatha                                                           |
| `gas_limit`         | uasghás a cheadaítear sa bhloc seo                                                |
| `gas_used`          | an méid iarbhír gáis a úsáidtear sa bhloc seo                                     |
| `timestamp`         | an t-am bloic                                                                     |
| `extra_data`        | sonraí breise treallach mar bhearta amha                                          |
| `base_fee_per_gas`  | luach na buntáille                                                                |
| `block_hash`        | Hais an bhloc reatha                                                              |
| `transactions_root` | hais fréimhe na n-idirbhearta sa phálasta                                         |
| `withdrawal_root`   | hais fréimhe na n-aistarraingtí sa phálasta                                       |

Tá na nithe seo a leanas sa `execution_payload` féin (tabhair faoi deara go bhfuil sé seo comhionann leis an gceanntásc ach amháin go n-áirítear ann liosta iarbhír na n-idirbhearta agus faisnéis aistarraingthe in ionad hais fréimhe na n-idirbhearta):

| Réimse             | Cur síos                                                                          |
|:------------------ |:--------------------------------------------------------------------------------- |
| `parent_hash`      | hais an mháthairbhloic                                                            |
| `fee_recipient`    | seoladh cuntais chun táillí idirbhirt a íoc leis                                  |
| `state_root`       | hais fréimhe don staid dhomhanda tar éis athruithe a chur i bhfeidhm sa bhloc seo |
| `receipts_root`    | hais na bhfáltas idirbhirt trie                                                   |
| `logs_bloom`       | struchtúr sonraí ina bhfuil logaí imeachtaí                                       |
| `prev_randao`      | luach a úsáidtear i roghnú bailíochtaithe randamach                               |
| `block_number`     | uimhir an bhloic reatha                                                           |
| `gas_limit`        | uasghás a cheadaítear sa bhloc seo                                                |
| `gas_used`         | an méid iarbhír gáis a úsáidtear sa bhloc seo                                     |
| `timestamp`        | an t-am bloic                                                                     |
| `extra_data`       | sonraí breise treallach mar bhearta amha                                          |
| `base_fee_per_gas` | luach na buntáille                                                                |
| `block_hash`       | Hais an bhloc reatha                                                              |
| `transactions`     | liosta na n-idirbhearta atá le déanamh                                            |
| `withdrawals`      | liosta de réada aistarraingthe                                                    |

Sa liosta `aistarraingtí` tá réada `aistarraingt` struchtúrtha mar a leanas:

| Réimse           | Cur síos                             |
|:---------------- |:------------------------------------ |
| `seoladh`        | seoladh cuntais a rinne aistarraingt |
| `amount`         | méid aistarraingthe                  |
| `index`          | luach innéacs aistarraingthe         |
| `validatorIndex` | luach innéacs bailíochtóra           |

## Am bloic {#block-time}

Tagraíonn am bloic don am a scarann bloic. In Ethereum, roinntear an t-am ina dhá aonad déag ar a dtugtar 'sliotáin'. I ngach sliotán roghnaítear bailíochtóir amháin chun bloc a mholadh. Ag glacadh leis go bhfuil gach bailíochtóir ar líne agus ag feidhmiú go hiomlán beidh bloc i ngach sliotán, rud a chiallaíonn gurb é 12s an t-am bloic. Ó am go chéile, áfach, d’fhéadfadh go mbeadh bailíochtóirí as líne nuair a ghlaoitear orthu bloc a mholadh, rud a chiallaíonn gur féidir le sliotáin a bheith folamh uaireanta.

Ní hionann an feidhmiú seo agus córais atá bunaithe ar chruthúnas oibre, áit a bhfuil amanna blocála dóchúlaíoch agus tiúnáilte ag deacracht mhianadóireachta sprice an phrótacail. Is sampla foirfe é [meán-am bloic](https://etherscan.io/chart/blocktime) de seo mar ar féidir an t-aistriú ó chruthúnas oibre go cruthúnas gill a bheith soiléir. tátal bunaithe ar chomhsheasmhacht an am bloic 12s nua.

## Méid bloic {#block-size}

Nóta tábhachtach deiridh is ea go bhfuil na bloic iad féin teoranta ó thaobh méide. Tá spriocmhéid de 15 milliún gáis ag gach bloc ach méadóidh nó laghdóidh méid na mbloc de réir éilimh líonra, suas go dtí an teorainn bloc de 30 milliún gáis (2x spriocmhéid bloc). Is féidir an teorainn gháis bhloc a choigeartú suas nó síos faoi fhachtóir 1/1024 ó theorainn gháis an bhloic roimhe sin. Mar thoradh air sin, is féidir le bailíochtóirí an teorainn gháis bloc a athrú trí chomhthoil. Ní mór méid iomlán an gháis a chaithfidh gach idirbheart sa bhloc a bheith níos lú ná teorainn gháis an bhloic. Tá sé seo tábhachtach toisc go gcinntíonn sé nach féidir le bloic a bheith mór go treallach. Más rud é go bhféadfadh bloic a bheith mór go treallach, ní bheadh nóid lána le níos lú feidhmíochta in ann coinneáil suas leis an líonra mar gheall ar riachtanais spáis agus luais. Dá mhéad an bloc, is mó an chumhacht ríomhaireachta a theastaíonn chun iad a phróiseáil in am don chéad sliotán eile. Is fórsa láraithe é seo, a ndéantar friotaíocht ina aghaidh trí theorainn a chur ar mhéideanna na mbloc.

## Tuilleadh léitheoireachta {#further-reading}

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Ábhair ghaolmhara {#related-topics}

- [Idirbhearta](/developers/docs/transactions/)
- [Gás](/developers/docs/gas/)
- [Cruthúnas-de-geall](/developers/docs/consensus-mechanisms/pos)
