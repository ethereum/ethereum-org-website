---
title: Togra blocála
description: Míniú ar an gcaoi a moltar bloic i Ethereum cruthúnais.
lang: ga
---

Is iad na bloic aonaid bhunúsacha an blocshlabhra. Is aonaid scoite faisnéise iad bloic a aistrítear idir nóid, a chomhaontaítear agus a chuirtear le bunachar sonraí gach nóid. Míníonn an leathanach seo conas a tháirgtear iad.

## Réamhriachtanais {#prerequisites}

Tá moladh bloic mar chuid den phrótacal cruthúnais. Chun cabhrú leis an leathanach seo a thuiscint, molaimid duit léamh faoi [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/) agus [bloc-ailtireacht](/developers/docs/blocks/).

## Cé a tháirgeann bloic? {#who-produces-blocks}

Molann cuntais bhailíochtóra bloic. Déanann oibreoirí nód a dhéanann bogearraí bailíochtóra a bhainistiú mar chuid dá gcliant reatha agus comhdhearcaidh agus tá 32 ETH ar a laghad taiscthe isteach acu sa chonradh taisce. Mar sin féin, ní bhíonn gach bailíochtóir freagrach ach ó am go ham as bloc a mholadh. Tomhaiseann Ethereum am i sliotáin agus sna réanna. Dhá shoicind déag atá i ngach sliotán, agus is ionann 32 sliotán (6.4 nóiméad) agus ré. Is deis é gach sliotán le bloc nua a chur ar Ethereum.

### Roghnú randamach {#random-selection}

Roghnaítear bailíochtóir amháin go randamach chun bloc a mholadh i ngach sliotán. Níl a leithéid de rud ann agus fíor-randamacht i mblocshlabhra mar dá nginfeadh gach nód uimhreacha randamacha dáiríre, ní fhéadfaidís teacht ar chomhdhearcadh. Ina áit sin, is é an aidhm atá ann próiseas roghnúcháin an bhailíochtóra a dhéanamh dothuartha. Baintear an randamacht amach ar Ethereum ag baint úsáide as algartam ar a dtugtar RANDAO a mheascann hais ón moltóir bloc le síol a fhaigheann gach bloc cothrom le dáta. Úsáidtear an luach seo chun bailíochtóir ar leith a roghnú ón tacar iomlán bailíochtóirí. Socraítear roghnú an bhailíochtóra dhá ré roimh ré mar bhealach chun cosaint a thabhairt ar chineálacha áirithe ionramhála síolta.

Cé go gcuireann bailíochtóirí le RANDAO i ngach sliotán, ní dhéantar an luach RANDAO domhanda a nuashonrú ach uair amháin in aghaidh na ré. Chun innéacs an chéad mholtóra bloc eile a ríomh, déantar luach RANDAO a mheascadh leis an uimhir sliotán chun luach uathúil a thabhairt do gach sliotán. Ní `1/N` amháin an dóchúlacht go roghnófar bailíochtóir aonair (mar a bhfuil `N` = bailíochtóirí gníomhacha iomlána). Ina áit sin, déantar é a ualú ag cothromaíocht éifeachtach ETH gach bailíochtóra. Is é 32 ETH an iarmhéid uasta éifeachtach (ciallaíonn sé seo go dtugann `iarmhéid< < 32 ETH` meáchan níos ísle ná `iarmhéid == 32 ETH`, ach ní thugann `iarmhéid> > 32 ETH` meáchan níos airde ná `iarmhéid == 32 ETH`).

Ní roghnaítear ach aon mholtóir bloc amháin i ngach sliotán. Faoi ghnáthchoinníollacha, cruthaíonn agus scaoileann táirgeoir bhloic amháin bloc amháin ina sliotán tiomnaithe. Is cion in-slaiseáilte é dhá bhloc a chruthú don sliotán céanna, ar a dtugtar "coibhéis" go minic.

## Conas a chruthaítear an bloc? {#how-is-a-block-created}

Táthar ag súil go ndéanfaidh an moltóir bloc rabhchán sínithe a chraoladh a thógann ar an gceann is déanaí den slabhra de réir dearcadh a n-algartam rogha forc féin a reáchtáiltear go háitiúil. Cuireann an t-algartam rogha forc i bhfeidhm aon fianuithe ciúáilte atá fágtha ón sliotán roimhe seo, ansin aimsítear an bloc a bhfuil an meáchan carntha is mó de na fianuithe ina stair. Is é an bloc sin tuismitheoir an bhloc nua a chruthaigh an moltóir.

Cruthaíonn an moltóir bloc trí shonraí a bhailiú óna bhunachar sonraí áitiúil féin agus amharc ar an slabhra. Taispeántar a bhfuil sa bhloc sa ghearrthóg thíos:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Glacann an réimse `randao_reveal` luach randamach infhíoraithe a chruthaíonn an moltóir bloc tríd an uimhir ré reatha a shíniú. Is vóta é `eth1_data` ar son tuairim an mholtóir bloc ar an gconradh taisce, lena n-áirítear fréamh na taisce Merkle trie agus líon iomlán na dtaiscí a chumasaíonn taiscí nua a fhíorú. Is réimse roghnach é `graffiti` is féidir a úsáid chun teachtaireacht a chur leis an mbloc. Is réimsí iad `proposer_slashings` agus `attester_slashings` ina bhfuil cruthúnas go ndearna bailíochtóirí áirithe cionta in-slaiseáilte de réir thuairim an mholtóra ar an slabhra. Is liosta é `taiscí` de thaiscí bailíochtóirí nua a bhfuil an moltóir ar an eolas fúthu, agus is liosta é `voluntary_exits` de bhailitheoirí ar mian leo imeacht ar chuala moltóir an bhloic fúthu ar an líonra béadáin ciseal comhdhearcaidh. Is veicteoir é an `sync_aggregate` a thaispeánann cé na bailíochtóirí a sannadh do choiste sioncronaithe roimhe seo (fothacar de bhailíochtóirí a fhreastalaíonn ar shonraí cliant éadrom) agus a ghlac páirt i síniú sonraí.

Leis an `execution_payload` is féidir faisnéis faoi idirbhearta a chur ar aghaidh idir na cliaint reatha agus comhdhearcaidh. Is é atá sa `execution_payload` ná bloc de shonraí feidhmithe a neadaítear laistigh de bhloc rabhcháin. Léiríonn na réimsí laistigh den `execution_payload` struchtúr na mbloc atá leagtha amach sa pháipéar buí Ethereum, ach amháin nach bhfuil aon ommers ann agus go bhfuil `prev_randao` ann in ionad `difficulty`. Tá rochtain ag an gcliant reatha ar chomhthiomsú áitiúil idirbheart ar chuala sé fúthu ar a líonra béadáin féin. Déantar na hidirbhearta seo a rith go háitiúil chun triail staide nuashonraithe a ghiniúint ar a dtugtar iarstaid. Tá na hidirbhearta san áireamh sa `execution_payload` mar liosta ar a dtugtar `idirbhearta` agus soláthraítear an iarstaid sa réimse `state-root`.

Bailítear na sonraí seo go léir i mbloc rabhcháin, sínítear iad, agus craoltar iad chuig piaraí an mholtóra bloc, a fhorleagann ar aghaidh chuig a bpiaraí, etc.

Léigh tuilleadh faoin [anatamaíocht na mbloc](/developers/docs/blocks).

## Cad a tharlaíonn don bhloc? {#what-happens-to-blocks}

Cuirtear an bloc le bunachar sonraí áitiúil an mholtóra bloc agus craoltar é chuig piaraí thar líonra béadáin ciseal comhdhearcaidh. Nuair a fhaigheann bailíochtóir an bloc, fíoraíonn sé na sonraí taobh istigh de, lena n-áirítear a sheiceáil go bhfuil an tuismitheoir ceart ag an mbloc, go gcomhfhreagraíonn sé don sliotán ceart, gurb é an t-innéacs tairgeora an ceann a bhfuiltear ag súil leis, go bhfuil an nochtadh RANDAO bailí agus go bhfuil an tairgeoir ní slashed. Tá an `execution_payload` díchuachta, agus déanann cliant reatha an bhailíochtóra na hidirbhearta ar an liosta arís chun an t-athrú staide atá beartaithe a sheiceáil. Ag glacadh leis go n-éiríonn leis an mbloc sna seiceálacha seo go léir, cuireann gach bailíochtóir an bloc lena slabhra canónach féin. Tosaíonn an próiseas ansin arís sa chéad sliotán eile.

## Luaíocht bhoic {#block-rewards}

Faigheann an moltóir bloc íocaíocht as a gcuid oibre. Tá `base_reward` ann a ríomhtar mar fheidhm de líon na mbailíochtóirí gníomhacha agus a n-iarmhéideanna éifeachtacha. Faigheann an moltóir bloc ansin codán de `base_reward` do gach fianú bailí atá sa bhloc; dá fhianaíonn bailíochtóirí an bhloic, is ea is mó luach saothair an mholtóra bloc. Tá luach saothair ann freisin do bhailíochtóirí tuairiscithe ar chóir iad a shlaiseáil, cothrom le `1/512 * iarmhéid éifeachtúil` do gach bailíochtóir slaiseáilte.

[Tuilleadh faoi luaíochtaí agus pionóis](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Tuilleadh léitheoireachta {#further-reading}

- [Réamhrá le bloic](/developers/docs/blocks/)
- [Réamhrá ar chruthúnas-gill](/developers/docs/consensus-mechanisms/pos/)
- [Sonraíochtaí comhdhearcadh Ethereum](https://github.com/ethereum/consensus-specs)
- [Réamhrá le Gasper](/developers/docs/consensus-mechanisms/pos/)
- [Uasghrádú Ethereum](https://eth2book.info/)
